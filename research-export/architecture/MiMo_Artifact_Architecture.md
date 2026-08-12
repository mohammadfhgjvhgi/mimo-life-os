# MiMo — Artifact Architecture

**Task ID:** ARCH-C / Doc 2 of 7
**Phase:** Foundation From The Ground Up
**Status:** ARCHITECTURE (no implementation). Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible Part 11 (Artifact System), Part 2.8 (Artifact Definition), Part 10.5 (Per-hunk accept/reject), Part 22.8 (Sandboxing), Part 25 (Plugin/API). Current System Audit §1.3 (ArtifactDock UI exists), §3.6 (no artifact storage).
**Scope:** Artifacts as first-class objects — identity, types, lifecycle, runtime, versioning, provenance, integration with the rest of MiMo.

> **Architectural rule.** An Artifact is not a chat attachment and not a file on disk. It is a **first-class, versioned, addressable, runtime-attached object** with provenance. Bible Part 11.1 is authoritative. This document specifies the storage, identity, runtime, and integration model that the Bible leaves to architecture.

---

## 1. Why artifacts exist

[FACT] Bible Part 11.1: an Artifact is "a first-class object (not a chat attachment)." The owner must be able to:
- Open it as a tab (Bible Part 13.3 spawnable tabs).
- Run it (code) or render it (markdown, image, diagram).
- See its history (version thumbnails — Bible Part 11.4).
- Know where it came from (provenance — Bible Part 11.6).
- Fork / export / share / delete it (Bible Part 11.7, Part 11.9).

[CURRENT] Audit §1.3 + §3.6 confirm: there is an `ArtifactDock` UI component and an `ArtifactViewer` panel, but **no artifact storage, no versioning, no runtime, no provenance**. The dock is a UI shell pointing at nothing.

---

## 2. Artifact identity

### 2.1 Stable ID

Every artifact has a **stable, opaque, URL-safe ID**.

```ts
type ArtifactId = string;   // format: "art_<ulid>", 26 chars, time-sortable
```

- **ULID** (not UUID v4) for time-sortability without a separate index. [INFERENCE — better than UUID for audit + history.]
- Prefix `art_` for namespace disambiguation in logs and the audit table.
- ID is **immutable**. Renaming the artifact changes `title`, not `id`.

### 2.2 Compound identity

```ts
type ArtifactIdentity = {
  id: ArtifactId;
  projectId: string;        // Bible Part 2.5 — artifacts are project-scoped
  conversationId: string;   // Bible Part 11.6 — provenance to a turn
  turnId: string;            // the specific turn that produced it
  forkedFrom?: ArtifactId;   // if this artifact is a fork (Part 11.3, Part 24.8)
};
```

- An artifact is **owned by exactly one Project** and **born in exactly one Conversation turn**. [PRODUCT DECISION — Bible Part 11.8: "belongs to project; project-scoped."]
- An artifact may be **referenced** by other conversations (via `@artifact` mention), but ownership does not move. [INFERENCE — keeps one source of truth.]

### 2.3 Reference

An `ArtifactRef` is the lightweight pointer used in conversation messages, memory, knowledge, and search results:

```ts
type ArtifactRef = {
  id: ArtifactId;
  version: number;     // pinned to a version (Part §4)
  title: string;       // denormalized for list rendering without join
  type: ArtifactType;
};
```

References are **versioned**. If you mention an artifact at v3 and it later becomes v5, your mention stays at v3 unless explicitly updated. [PRODUCT DECISION — Bible Invariant 5: "No destructive action without recovery."]

---

## 3. Artifact types

Bible Part 11.2 fixes the type list. We adopt it verbatim and assign each type an editor, a runtime class (cross-reference Runtime Architecture §1), and a versioning strategy:

| Type | Editor | Runtime class | Versioning | Per-hunk accept? |
|---|---|---|---|---|
| `code` | Monaco-style | C1 (iframe) or C2 (Pyodide) | git-style diff | YES (Bible Part 10.5) |
| `markdown` | WYSIWYG + raw | rendered markdown | version thumbnails | no (full-content diff) |
| `image` | viewer + params | n/a (static asset) | version thumbnails | n/a |
| `diagram` | SVG/Mermaid editor | rendered | version thumbnails | no |
| `research` | structured doc | rendered | version thumbnails | no |
| `plan` | approvable artifact (Bible Part 10.4) | rendered | version thumbnails | no |
| `architecture` | diagram editor | rendered | version thumbnails | no |
| `presentation` | slide editor | rendered | version thumbnails | no |
| `database-schema` | schema editor | rendered | version thumbnails | no |
| `wireframe` | canvas editor | rendered | version thumbnails | no |
| `flowchart` | flow editor | rendered | version thumbnails | no |
| `spreadsheet` | cell editor | rendered | version thumbnails | no |

**Invariant A-1.** No 13th type. New artifact types require a Product Bible amendment (Bible Invariant 25 — vocabulary lock). Architecture does not invent types.

**Invariant A-2.** The `code` type is the ONLY type with per-hunk accept/reject. All others use full-content version snapshots. [Bible Part 10.5 — explicit.]

---

## 4. Versions + revisions

### 4.1 Two-axis model

MiMo distinguishes **version** (immutable snapshot) from **revision** (a branch in the edit graph):

- **Version** = a point-in-time snapshot of the artifact content. Numbered `v1, v2, v3...`. Append-only. Never mutated, never deleted (except via Part 11.9 rollback to a specific version, which creates a new version that is content-identical to the old one).
- **Revision** = a logical branch. The "main" revision is the artifact itself. A fork creates a new artifact (new `id`) — Bible Part 11.3 — NOT a new revision of the same artifact.

[PRODUCT DECISION — keeps "one model per dimension" (Bible Invariant 35). Version is the only edit-history axis. Fork is the only branch primitive.]

### 4.2 Version content storage

| Type | Storage | Why |
|---|---|---|
| `code` | Git-style diff against previous version (unified diff hunks) | Per-hunk accept/reject requires hunks (Bible Part 10.5) |
| `markdown`, `research`, `plan`, `architecture`, `presentation`, `database-schema`, `wireframe`, `flowchart`, `spreadsheet` | Full content snapshot (compressed via gzip if > 4 KB) | Simpler; diffing structured editors is brittle |
| `image` | Binary blob + params JSON | Image data is not diff-able |
| `diagram` | Source text (Mermaid / SVG XML) | Diffable as text; stored as full snapshot for simplicity |

### 4.3 Version metadata

```ts
type ArtifactVersion = {
  artifactId: ArtifactId;
  version: number;
  createdAt: number;
  createdBy: 'agent' | 'owner' | 'system';
  agentId?: string;
  modelId?: string;
  promptTurnId?: string;     // what request produced this version
  contentRef: ContentRef;     // pointer to stored content (diff or snapshot)
  contentHash: string;        // sha256 of resolved content
  parentId: number | null;   // previous version (null for v1)
  acceptedHunks?: number[];  // for code type — Part 10.5
  rejectedHunks?: number[];
};
```

### 4.4 Version retrieval

- Reading `v(n)` of a code artifact: apply diffs `v1 → v2 → ... → v(n)` in order. Cached resolved-content for current version + 3 prior.
- Reading `v(n)` of a non-code artifact: direct snapshot read.
- Hover thumbnails (Bible Part 11.4): pre-rendered PNG/SVG at 80×60px, generated on version create. [INFERENCE — render cost acceptable; lazy-generate for older versions on hover.]

### 4.5 Version limits

- Max versions per artifact: **200**. [INFERENCE — protects against runaway versioning.]
- Beyond 200: oldest auto-compacted (v1..v(180) → merged snapshot at v(180), original diffs archived). [INFERENCE]
- Soft cap notification at 150 versions ("consider forking instead of versioning").

---

## 5. Execution + runtime

### 5.1 Only `code` artifacts are executable

[PRODUCT DECISION — Bible Part 11.2 — only `code` has a runtime column. `diagram` renders but does not "execute." `spreadsheet` computes formulas but is rendered, not executed as code.]

### 5.2 Runtime dispatch

Cross-reference Runtime Architecture §4. For `code` artifacts, the RuntimeGateway dispatches based on declared language:

| Language | Runtime class | Notes |
|---|---|---|
| JavaScript / TypeScript (browser-safe) | C1 (CSP iframe) | runs in browser tab |
| HTML / CSS / SVG | C1 (CSP iframe) | direct render |
| Python | C2 (Pyodide / WASM) | in-browser |
| JavaScript / TypeScript (Node) | C4 (Node child_process + seatbelt) | requires `danger` mode or explicit approval |
| Shell | C3 (shell + seatbelt) | requires approval |
| Other (Rust, Go, etc.) | C4 via Docker opt-in | power-user only |

### 5.3 Runtime state

```ts
type ArtifactRuntime = {
  artifactId: ArtifactId;
  version: number;
  status: 'idle' | 'running' | 'paused' | 'errored' | 'completed';
  executionId?: string;       // RuntimeGateway ExecutionRequest id
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  lastRunAt?: number;
  resourcesUsed?: ResourceUsage;
};
```

- Runtime state is **per-version**. Running v3 does not affect v5.
- The state is persisted (so a refresh restores the "last run" view).
- Running an artifact opens a transient runtime; closing the tab kills the runtime (but the version snapshot remains).

### 5.4 Streaming artifacts (Bible Part 11.5 — "● live")

- During generation, an artifact's content is streamed token-by-token.
- The "● live" indicator appears in the ArtifactDock while streaming.
- The version is **finalized** only when generation completes (or owner stops the stream). Partial-streamed content is NOT a version; it is a "draft state" attached to the active turn. If the owner closes mid-stream, the draft is preserved (Bible Invariant 5 — no destructive action without recovery) but does NOT become v(n+1).

---

## 6. Preview + editing

### 6.1 ArtifactViewer (Bible Part 11.4)

The viewer is the editor + runtime + diff surface. Per type:

| Type | Viewer default mode | Edit mode | Diff mode |
|---|---|---|---|
| `code` | code editor + run button | inline edit | per-hunk accept/reject (when agent-authored) |
| `markdown` | rendered | WYSIWYG toggle | full-content version diff |
| `image` | image + params panel | params only (regenerate) | version thumbnails |
| `diagram` | rendered SVG | source editor | version thumbnails |
| `research` | rendered doc | WYSIWYG | version thumbnails |
| `plan` | rendered plan + approve/reject gate | inline edit (before approval) | version thumbnails |
| `architecture` / `wireframe` / `flowchart` | rendered | diagram editor | version thumbnails |
| `presentation` | slide view | slide editor | version thumbnails |
| `database-schema` | rendered schema | schema editor | version thumbnails |
| `spreadsheet` | cell grid | cell editor | version thumbnails |

### 6.2 WYSIWYG contract (Bible Part 11.4)

- For `markdown` / `research` / `plan`: deterministic AST-based direct manipulation. No LLM in the edit loop (Lovable Visual Edits pattern — Bible Part 11.4 footnote).
- For `diagram` / `wireframe` / `flowchart`: structural editor over a typed AST.
- For `code`: Monaco-style editor (the spec says "Monaco-style" — we accept Monaco itself, vendored, no telemetry). [INFERENCE — accept Monaco; it is open-source and well-maintained.]

### 6.3 Per-hunk accept/reject (Bible Part 10.5)

Applies only to `code` artifacts authored by an agent:

1. Agent generates a candidate version `v(n+1)` as a diff against `v(n)`.
2. The diff is split into hunks (unified diff hunk boundaries).
3. Each hunk is rendered with `Accept` / `Reject` buttons.
4. Owner accepts some, rejects others → resulting version is `v(n+1)` = `v(n)` + accepted hunks.
5. Rejected hunks are stored as `rejectedHunks` on the version metadata (audit trail).
6. Shortcuts: `a` accept-all, `r` reject-all, `j/k` navigate hunks. [INFERENCE — consistent with Bible keyboard grammar.]

**Invariant A-3.** No 100% overwrites. The artifact system never accepts a full-replacement version silently. (Bible Invariant 20.)

---

## 7. Dependencies

### 7.1 Artifact → artifact

- An artifact may **import** another artifact's content by reference (e.g., a `plan` artifact references a `research` artifact).
- Dependencies form a DAG. Cycles are rejected at insert time.
- The artifact stores a `dependencies: ArtifactRef[]` list (with pinned versions — §2.3).
- If a dependency version is rolled back, dependents see a "dependency changed" warning (not auto-update — Bible Invariant 5).

### 7.2 Artifact → file (host)

- For `code` artifacts running in C3/C4 (host runtime), the artifact may declare `fileDependencies: HostFileRef[]`.
- `HostFileRef` is a path inside `projectRoot` (Bible Part 22.5 file permissions).
- Outside-`projectRoot` paths are forbidden (Runtime Architecture §6.3).

### 7.3 Artifact → memory / knowledge

- An artifact may cite memory or knowledge entities in its content (`[mem:mem_xxx]` / `[ent:ent_xxx]`).
- Citations render as inline references (Bible Part 6.11 — citations + source tracing).
- If a cited memory/entity is deleted, the citation degrades to "deleted reference" — does NOT auto-remove from the artifact (Bible Invariant 5).

---

## 8. Provenance (Bible Part 11.6)

### 8.1 Mandatory provenance fields

Every artifact version carries:

| Field | Source |
|---|---|
| `conversationId` | the turn that produced it |
| `turnId` | the specific message ID |
| `agentId` | which agent (or `"owner"` if hand-created) |
| `modelId` | which model was used (if agent-produced) |
| `promptSnapshot` | the actual prompt sent to the model (truncated to 4 KB; full prompt in audit log) |
| `timestamp` | when produced |
| `acceptedHunks` / `rejectedHunks` | if code type, which hunks the owner accepted |

[Bible Part 11.6 — "Every artifact shows: which conversation turn produced it / which agent produced it / the prompt that generated it / the model used / the timestamp."]

### 8.2 Provenance rendering

- Each artifact tab footer shows: "Produced by `<agent>` in `<conversation>` turn `<n>` · `<model>` · `<timestamp>`."
- Hovering reveals the full prompt snapshot.
- The provenance is **immutable** once the version is created. Editing the artifact creates a new version with new provenance (the editor's, not the original author's).

### 8.3 Provenance vs ownership

- **Provenance** = who created this version. Immutable.
- **Ownership** = which project owns this artifact. Immutable (move = explicit migrate, creates new artifact with forkedFrom link).
- **Edit permission** = derived from project membership + the artifact's `permissions` field (§9).

---

## 9. Permissions

### 9.1 Per-artifact permission model

```ts
type ArtifactPermissions = {
  visibility: 'project' | 'shared-link' | 'exported';
  editableBy: 'owner' | 'project-members' | 'no-one';  // single-user => 'owner' always
  runtimeAllowed: boolean;       // can this artifact be executed?
  runtimeMode: 'sandboxed' | 'danger';
};
```

[INFERENCE — single-user means most fields collapse to defaults, but we keep the shape for future multi-device sync (Bible Part 22.2 E2E).]

### 9.2 Approval gates (Bible Part 9.2)

- First-time execution of a `danger`-mode artifact: mandatory approval (Part 9.5).
- First-time execution of a `sandboxed` artifact in a project: implicit approval (low risk), logged.
- Owner can disable an artifact's runtime via a single click (no modal — Bible Invariant 24).

### 9.3 Sharing (Bible Part 11.7)

- `/artifact/<id>` URL → renders a **read-only snapshot** of the current version.
- Shared artifacts are stored as a separate `SharedArtifactSnapshot` row (immutable copy with the artifact's `id`, `version`, content).
- The original artifact can continue evolving; the shared snapshot does not.
- Sharing requires opt-in (Bible Part 22.1 — "never leaves the machine without explicit consent"). The act of sharing is logged in the audit trail.

---

## 10. Export + sharing + rollback + deletion

### 10.1 Export

Per type:

| Type | Export formats |
|---|---|
| `code` | `.py` / `.js` / `.ts` / `.sh` / `.html` / raw text + a sidecar `provenance.json` |
| `markdown` / `research` / `plan` / `architecture` | `.md` + `.json` (structured) |
| `image` | `.png` / `.svg` + `params.json` |
| `diagram` | `.svg` / `.mmd` (Mermaid source) |
| `presentation` | `.pptx` (via reveal.js → pptx export) [INFERENCE] |
| `database-schema` | `.sql` (DDL) + `.json` (schema AST) |
| `wireframe` / `flowchart` | `.svg` + `.json` |
| `spreadsheet` | `.csv` / `.xlsx` [INFERENCE] |

Export is one click from the artifact tab. Exported bundle is a `.zip` with content + `provenance.json` + `manifest.json`.

### 10.2 Sharing (cross-ref §9.3)

### 10.3 Rollback (Bible Part 11.9)

- "Rollback to v(n)" creates v(n+1) with content-identical to v(n). Old versions remain.
- Aider auto-commit pattern (Bible Part 9.4): every artifact edit is a version. Rollback = restore a prior version as the new HEAD.

### 10.4 Deletion (Bible Part 22.11)

- Delete a single version: forbidden (would break audit chain). Instead, **hide** a version (still queryable in audit; not visible in thumbnail list).
- Delete the artifact:
  - Phase 1: archive (grace 30 days, recoverable).
  - Phase 2: permanent delete (content removed; provenance + content hash retained in audit log).
- "Delete everything" (Bible Part 22.11): settings → confirm → 7-day grace → wipe.

---

## 11. Integration

### 11.1 Conversation (Bible Part 12.4)

- Artifacts appear **inline as cards** in the conversation message that produced them.
- Clicking the card opens the artifact as a tab (Bible Part 13.3).
- The conversation stays underneath (Bible Part 11.8).
- Multiple artifacts in one turn: rendered as a horizontal card strip.

### 11.2 Projects

- Artifacts are project-scoped (Bible Part 11.8). Switching projects filters the ArtifactDock.
- Cross-project artifact references require explicit `@artifact` mention with project prefix (`@<project>/<artifact>`).

### 11.3 Agents (Bible Part 8.5 SharedWorkspace)

- Agents contribute artifacts to a shared workspace.
- The orchestrator records `agentId` on each produced artifact version.
- An agent may **read** another agent's artifact via `ArtifactRef` (with version pinning).

### 11.4 Memory (Bible Part 5)

- An artifact can be **promoted to memory** ("remember this artifact"). Creates a memory entry of type `artifact_ref` with the `ArtifactRef`.
- An artifact can be **auto-extracted** from a conversation turn (memory consolidation — Bible Part 5.5).

### 11.5 Knowledge (Bible Part 6)

- An artifact can be **promoted to knowledge entity** ("extract entities from this research artifact"). Creates knowledge entities with `sourceArtifact: ArtifactRef`.
- Knowledge graph edges can cite an artifact as evidence.

### 11.6 Execution (Bible Part 10)

- The ExecutionTrace's Execute stage shows artifact generation in real time (Bible Part 10.2).
- Per-hunk accept/reject appears in the ExecutionTrace for `code` artifacts (Bible Part 10.5).

### 11.7 Search (Bible Part 14)

- Artifacts are searchable in Universal Search by title, type, content (FTS5 for text types), and provenance.
- See Search Architecture doc for indexing strategy.

### 11.8 Audit (Bible Part 22.9)

- Every artifact lifecycle event (`artifact.created`, `artifact.version.added`, `artifact.run.started`, `artifact.run.completed`, `artifact.shared`, `artifact.deleted`) emits an audit event.
- See Observability Architecture doc §5.

---

## 12. Storage model [TARGET]

### 12.1 Schema (Prisma — SQLite)

```prisma
model Artifact {
  id              String   @id              // "art_<ulid>"
  projectId       String
  conversationId String
  turnId          String
  forkedFromId    String?
  type            ArtifactType
  title           String
  currentVersion  Int
  permissions     String   // JSON
  visibility      ArtifactVisibility  // project | shared-link | exported
  createdAt       DateTime
  updatedAt       DateTime
  archivedAt      DateTime?

  versions        ArtifactVersion[]
  @@index([projectId, updatedAt])
  @@index([conversationId])
}

model ArtifactVersion {
  id              String   @id             // "artv_<ulid>"
  artifactId      String
  version         Int
  parentId        String?                  // previous ArtifactVersion id
  createdBy       ArtifactAuthor          // agent | owner | system
  agentId         String?
  modelId         String?
  promptTurnId    String?
  contentRef      String                   // pointer to content blob
  contentHash     String
  acceptedHunks   String?                  // JSON array
  rejectedHunks   String?                  // JSON array
  createdAt       DateTime

  artifact        Artifact @relation(fields: [artifactId], references: [id])
  @@index([artifactId, version])
}

model ArtifactContent {
  id              String   @id              // contentRef
  storage         ContentStorage           // inline | file | gzip
  inlineText      String?                  // for < 4 KB
  filePath        String?                  // for > 4 KB, in mimo-data/artifacts/
  gzipBlob        Bytes?
  contentHash     String
  createdAt       DateTime
}
```

[INFERENCE] SQLite is fine for metadata + small content; large content (> 4 KB) is stored on disk under `mimo-data/artifacts/<artifactId>/<version>.{ext}.gz`. Content-addressed by hash for dedup.

### 12.2 [CURRENT]

[CURRENT] No Prisma models for artifacts. Audit §3.1 confirms Prisma schema is the boilerplate `User` + `Post` only. The `upload/` folder exists but is unused (Audit §3.6).

---

## 13. [CURRENT] vs [TARGET] vs [MIGRATION]

### 13.1 [CURRENT]

- `ArtifactDock.tsx` + `ArtifactViewer.tsx` exist as UI shells. [FACT — Audit §1.3]
- No artifact Prisma models. [FACT — Audit §3.1]
- No versioning, no runtime, no provenance. [FACT — Audit §3.6]
- The dock is fed from `lib/nova/store.ts` UI state, not from a persistence layer. [FACT — Audit §5.2]
- No per-hunk accept/reject, no diff rendering, no WYSIWYG. [FACT]

### 13.2 [TARGET]

- First-class artifact domain: `Artifact`, `ArtifactVersion`, `ArtifactContent` tables. [§12]
- 12 artifact types matching Bible Part 11.2. [§3]
- Versioning: git-diff for code, full snapshots for others. [§4]
- Runtime dispatch via RuntimeGateway for `code` type only. [§5]
- ArtifactViewer with per-type editor + WYSIWYG for docs. [§6]
- Per-hunk accept/reject for code artifacts. [§6.3]
- Provenance on every version. [§8]
- Project-scoped, conversation-born, forkable, exportable, shareable. [§2, §9, §10]
- Full audit event stream. [§11.8]

### 13.3 [MIGRATION]

| Phase | What | Depends on |
|---|---|---|
| A1 | Prisma schema for `Artifact` / `ArtifactVersion` / `ArtifactContent`. | — |
| A2 | Core `ArtifactStore` API: `create`, `getVersion`, `addVersion`, `listByProject`. | A1 |
| A3 | `ArtifactViewer` for `markdown` (rendered + WYSIWYG). First non-code type. | A2 |
| A4 | `ArtifactViewer` for `code` (Monaco editor, no runtime yet). | A2 |
| A5 | Wire `ArtifactDock` to `ArtifactStore` (replaces UI-only state). | A2 |
| A6 | Add `image` type (viewer + params). | A2 |
| A7 | Add per-hunk accept/reject for `code` artifacts (Bible Part 10.5). | A4 |
| A8 | Add `diagram` / `flowchart` (Mermaid render). | A2 |
| A9 | Wire `code` runtime through RuntimeGateway (cross-ref Runtime Arch M2/M3). | Runtime M2/M3 |
| A10 | Add provenance rendering + audit events. | A2, Observability M8 |
| A11 | Add export + share-URL. | A2 |
| A12 | Add archive + 30-day grace + permanent delete. | A2 |
| A13 | Add `plan` artifact with approval gate (cross-ref with Planner). | A2 |
| A14 | Add remaining types (`research`, `architecture`, `presentation`, `database-schema`, `wireframe`, `spreadsheet`). | A2 |

A1–A7 are required for v1 release. A8+ can ship progressively.

---

## 14. Open questions / [UNKNOWN]

| # | Unknown | Resolution |
|---|---|---|
| 1 | Will Monaco editor bundle bloat the client (> 2 MB)? | Lazy-load Monaco only in `code` artifact viewer; not in main bundle. |
| 2 | How to render `spreadsheet` cells with formulas (eval-safe)? | Use a restricted formula engine (e.g., `formulajs` vendored); no `eval`. [INFERENCE] |
| 3 | How to share an artifact URL when MiMo is single-user local-first? | Local HTTP server with a temporary share token; or export-to-file for true offline sharing. [UNKNOWN — needs UX decision.] |
| 4 | Per-hunk accept/reject for non-unified diff formats (e.g., LSP-based structural diffs)? | v1 ships unified-diff hunks only. Structural diffs deferred. [INFERENCE] |
| 5 | Streaming artifact draft-state persistence — full or last-N-tokens? | Last-N-tokens (configurable, default 8 KB). [INFERENCE] |
| 6 | Image artifact regeneration — same seed or new? | Same seed by default (deterministic); owner can re-roll. [INFERENCE] |

---

## 15. Invariants (this document)

- **A-1.** Exactly 12 artifact types. No 13th without Bible amendment.
- **A-2.** Per-hunk accept/reject is for `code` only.
- **A-3.** No silent 100% overwrites. Ever.
- **A-4.** Every version has full provenance (turn, agent, model, prompt, timestamp).
- **A-5.** Artifact ownership is project-scoped and immutable.
- **A-6.** References are version-pinned.
- **A-7.** Delete = archive + grace + permanent; never destructive without recovery (Bible Invariant 5).
- **A-8.** Only `code` artifacts execute. Other types render.
- **A-9.** Every artifact lifecycle event is audited.

---

**End of MiMo Artifact Architecture.**
