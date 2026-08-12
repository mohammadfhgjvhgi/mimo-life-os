# MiMo — Memory Architecture
### Phase: Foundation From The Ground Up — ARCH-B (Doc 2 of 6)

**Status:** ARCHITECTURE. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Scope:** How MiMo stores, retrieves, decays, merges, conflicts-resolves, deletes, and exposes user memory. Memory must never silently become an uncontrolled second database of truth.
**Source of truth:** Product Bible Part 5 (Memory Architecture), Part 22 (Security), Part 4.6 (Context Transparency). `MiMo_Current_System_Audit.md` §3.2, §3.3. `src/core/memory/MemoryEngine.ts`.

---

## 0. Label Legend

- `[CURRENT]` — what exists today in `src/core/memory/`.
- `[TARGET]` — what this architecture specifies.
- `[MIGRATION]` — how to get from CURRENT to TARGET.
- `[FACT]` — verifiable from code.
- `[INFERENCE]` — architect's reasoned conclusion.
- `[UNKNOWN]` — open question.

---

## 1. The Core Principle

> **Memory is the user's, not MiMo's.** MiMo writes to it, reads from it, and derives from it — but never silently. Every memory is owned, inspectable, editable, and deletable by the user. [PRODUCT INVARIANT — Bible Part 5.10, 5.12]

Memory is **NOT** a second database of truth. It is a **belief ledger** — a record of what MiMo believes about the user, with confidence that decays, provenance that is always shown, and the user always in control.

---

## 2. Memory vs Knowledge vs Context vs Source

These MUST NOT collapse into one vague "AI knowledge" concept.

| Term | Definition | Mutability | Owner | Decay | Example |
|---|---|---|---|---|---|
| **Memory** | Stored belief about a fact/preference/event/skill/goal/relation. Raw, item-level. | User can edit/delete. MiMo can write (with provenance). | User | Yes (per-type halflife) | "Owner prefers Arabic." |
| **Knowledge** | Derived entity graph — typed, related, evidence-backed. Consolidated FROM memory. | MiMo maintains (via consolidation engine). User can inspect + correct. | MiMo (derived) | Yes (entity confidence) | Entity "Arabic" linked to entity "Owner" via `prefers_language`. |
| **Context** | The assembled set of memory + knowledge + history + files used for ONE turn. Immutable once built. | None (immutable snapshot). | MiMo (per turn) | N/A (snapshot) | The ContextObject for turn N. |
| **Source** | Where a memory/knowledge claim came from. | None (provenance is immutable fact). | Reality | None | "Conversation 12, turn 4, agent:planner." |

[FACT — Bible Part 6.1 establishes Memory ≠ Knowledge. This doc extends to define Context ≠ Source.]

**Rule:** Memory is *input*. Knowledge is *derived graph*. Context is *snapshot*. Source is *evidence*. Mixing them collapses accountability.

---

## 3. Memory Types [TARGET — Bible Part 5.1]

| Type | Purpose | Example | Halflife | Default confidence |
|---|---|---|---|---|
| `fact` | Verified information | "Owner's name: محمد عادل" | ∞ (identity) / 90d (general) | 0.9 (identity) / 0.7 (general) |
| `preference` | User preferences | "Prefers working late at night" | 180d | 0.7 |
| `event` | Life/work events | "Started MiMo Aug 2026" | 90d | 0.7 |
| `relation` | Typed links between memories | "Arduino relates to Gulf goal" | 90d | 0.6 |
| `skill` | Proficiency with confidence | "Arduino — 85%" | 365d | 0.5 + 0.05/evidence |
| `goal` | Active goal with priority | "Work in Gulf after graduation" | 180d | 0.7 |

### 3.1 Extended Types (Target)

The Bible specifies 6 types. Architecture adds 3 to cover operational needs:

| Type | Purpose | Example | Halflife | Why |
|---|---|---|---|---|
| `inferred` | Belief MiMo derived but did not verify | "User seems stressed (late-night typing)" | 30d | Low confidence, short decay. Must be confirmed to become `fact`. |
| `temporary` | Single-session scratch (not promoted) | "User just typed a correction" | session | Cleared on conversation end. |
| `episodic` | Sequence of events with order | "Last 5 conversations about project X" | 90d | Enables "what did we discuss" queries. |

[INFERENCE — these extensions follow Claude Code's auto-memory model and Granola's episodic capture. Not in Bible; flagged for review.]

### 3.2 [CURRENT] Deficiency

[CURRENT] `MemoryType = 'fact' | 'preference' | 'event' | 'relation' | 'skill' | 'goal'` — only the 6 Bible types. No `inferred`, `temporary`, `episodic`. [FACT — `src/core/types.ts:49`]

---

## 4. Memory Scopes [TARGET — Bible Part 5.3]

| Scope | Definition | Visibility | Persistence |
|---|---|---|---|
| `project-only` | Scoped to a project. Hard toggle. No bleed. | Only when project active. | SQLite table `Memory.scope = 'project' AND projectId = X` |
| `global` (a.k.a. Shared OS) | Cross-project facts (identity, global prefs). | All projects. | SQLite table `Memory.scope = 'global'` |
| `folder-as-context` | Temporary; resolved per turn. | Per turn only. | Not persisted; ephemeral. |
| `session` | Per conversation, cleared on close. | Per conversation. | SQLite, deleted on conversation close. |

### 4.1 [CURRENT] Deficiency

[CURRENT] No scope field. All memories are global (in RAM). No project association. [FACT]

---

## 5. Temporary Memory [TARGET]

- Lives for the duration of a conversation or task.
- Used for working state (e.g. "user mentioned a filename 3 turns ago, may need it again").
- Auto-promoted to `fact` or `event` only if the user explicitly confirms OR the consolidation engine detects repeated evidence (3+ mentions).
- Auto-deleted on conversation close.

Stored in DB table `Memory.temporary = true` with `expiresAt` timestamp.

---

## 6. Memory Confidence

### 6.1 How confidence is calculated [TARGET]

```
baseConfidence = initialByType[type]                  // §3 table
+ evidenceBonus                                       // +0.05 per evidence item, max +0.3
+ userConfirmationBonus                                // +0.2 if user has confirmed
- contradictionPenalty                                // -0.3 per active contradiction
- stalePenalty                                        // (1 - freshness) × typeSensitivity
```

`typeSensitivity`: `fact` = 1.0 (very stale-sensitive), `skill` = 0.5, `preference` = 0.7.

### 6.2 Confidence Decay [TARGET — Bible Part 5.6]

```
decayedConfidence = baseConfidence × exp(-age / halflife)
```

Re-verification (new evidence, user re-confirm, edit) **resets the clock** AND bumps base confidence by +0.1 (capped at 1.0).

### 6.3 [CURRENT] Deficiency

[CURRENT] `MemoryEntry.relevance` is computed at recall time (substring match: 1.0, 0.5, or 0). No confidence field. No decay. No re-verification. [FACT — `MemoryEngine.ts:151-163`]

---

## 7. Provenance [TARGET — Bible Part 5.4]

Every memory item MUST carry:

```typescript
interface MemoryProvenance {
  origin: 'user' | 'agent' | 'tool' | 'auto-extracted' | 'system';
  originId: string;          // conversation_id / agent_id / tool_id
  capturedAt: number;        // when written
  evidence: Evidence[];       // supporting observations
  trustLevel: 'confirmed' | 'verified' | 'inferred' | 'unconfirmed';
}

interface Evidence {
  type: 'message' | 'tool_output' | 'agent_reasoning' | 'user_action' | 'external_source';
  refId: string;             // pointer to source row (e.g. message_id, tool_call_id)
  excerpt: string;           // short quoted excerpt
  capturedAt: number;
}
```

### 7.1 [CURRENT] Deficiency

[CURRENT] `MemoryEntry` has `createdAt` only. No `origin`, no `originId`, no `evidence`, no `trustLevel`. [FACT]

---

## 8. Timestamps [TARGET]

Every memory has:
- `createdAt` — when first written.
- `updatedAt` — when last modified (edit or new evidence).
- `lastVerifiedAt` — when user last confirmed (or system re-verified).
- `lastRecalledAt` — when last surfaced in context (for frequency analysis).
- `expiresAt` — for temporary memories (null otherwise).

### 8.1 [CURRENT] Deficiency

[CURRENT] Only `createdAt`. [FACT]

---

## 9. Decay + Staleness Prevention [TARGET — Bible Part 5.6]

### 9.1 The decay job

A scheduled job runs daily (Bible Part 26 — background work):
1. For each memory, compute `decayedConfidence` per §6.2.
2. If `decayedConfidence < 0.2 AND age > 2 × halflife`, mark `status = 'stale'`.
3. Stale memories are excluded from default recall (only surface if user explicitly queries for them).
4. If `decayedConfidence < 0.05 AND age > 4 × halflife`, propose deletion in Memory tab review queue.

### 9.2 Why staleness matters

> Without decay, stale information dominates. The user's preferences change. Skills rust. Goals evolve. A memory that is 2 years old is not equal to one from yesterday. [INFERENCE — Bible Part 5.6 makes this explicit.]

### 9.3 [CURRENT] Deficiency

[CURRENT] No decay. Memories are permanent until manually deleted. The current `INITIAL_MEMORIES` constants will persist forever. [FACT]

---

## 10. Contradiction Detection

### 10.1 How contradictions are detected [TARGET]

Two memories contradict if:
- Same `(type, subject)` pair with different `value`.
- One memory is `NOT <claim>` and another is `<claim>`.
- Same entity referenced with different `value` (e.g. skill level 0.85 vs 0.40).

### 10.2 How conflicts are handled [TARGET — deterministic, not model-judged]

| Rule | Example |
|---|---|
| User-confirmed > agent-inferred | User said "Arabic" overrides agent's "English" inference. |
| Newer > older (provenance equal) | Today's preference overrides last week's. |
| Higher-trust source > lower | `user` > `tool-verified` > `agent-inferred` > `auto-extracted` |
| Higher-evidence-count > lower | Skill with 12 evidence wins over skill with 2. |
| Unresolved → flag, don't auto-resolve | Two user-confirmed facts that contradict → clarification question to user (Bible Part 9.5). |

When a contradiction is resolved, the loser is marked `status = 'superseded'` (not deleted — provenance preserved). The winner's `evidence` array absorbs the loser's evidence (with citation).

### 10.3 [CURRENT] Deficiency

[CURRENT] No contradiction detection. Two contradictory memories can coexist silently. [FACT]

---

## 11. Merging [TARGET]

### 11.1 Merge vs Supersede

- **Supersede** — old memory marked `superseded`, kept for history. New memory is canonical.
- **Merge** — two memories about the same subject combined into one, with evidence from both.

### 11.2 Merge triggers

- Consolidation engine detects 3+ memories about same `(type, subject)`.
- User explicitly invokes "merge these."
- Auto-merge proposed by background job (reviewed before applied).

### 11.3 Merge algorithm

1. Take the higher-trust memory as the base.
2. Append evidence from the other.
3. Set `updatedAt = now`, `lastVerifiedAt = now`.
4. Compute new confidence per §6.1 with combined evidence.
5. Mark merged-from memories as `superseded` with `supersededBy = <base_id>`.

### 11.4 Merge never deletes

The merged-from memories remain in the DB with `status = 'superseded'`. This preserves full provenance. The user can always un-merge.

### 11.5 [CURRENT] Deficiency

[CURRENT] No merge. `MemoryEngine.relate()` exists but does not merge or supersede. [FACT]

---

## 12. Deletion [TARGET — Bible Part 5.12, 22.11]

### 12.1 Three deletion modes

| Mode | What happens | Reversible? |
|---|---|---|
| `soft_delete` | Memory marked `status = 'deleted'`, hidden from recall. | Yes — restore within 30 days. |
| `archive` | Memory moved to archive table. Excluded from recall. | Yes — restore from archive. |
| `purge` | Memory row deleted from DB + audit log entry written. | No (irreversible). |

### 12.2 Deletion is guaranteed when:

- User clicks "delete" in Memory tab → `soft_delete`.
- After 30 days of `soft_delete` → auto-purge (background job).
- User invokes "purge now" → immediate `purge`.
- User invokes "Delete Everything" (Bible Part 22.11) → all memories `purge` after 7-day grace.

### 12.3 Deletion cascade

When a memory is purged:
- All `MemoryRelation` rows referencing it are deleted.
- All `Evidence` rows referencing it are deleted.
- The audit log entry recording the deletion is **kept** (audit is append-only).
- Knowledge entities that depended solely on this memory have their confidence recomputed; if it drops below 0.1, they are marked `status = 'orphaned'` and surfaced for review.

### 12.4 [CURRENT] Deficiency

[CURRENT] `MemoryEngine.forget(id)` does a hard delete from the Map. No soft delete, no archive, no audit trail, no cascade. [FACT — `MemoryEngine.ts:128-134`]

---

## 13. User Inspection [TARGET — Bible Part 5.12, 5.4]

### 13.1 What the user can see

For every memory:
- **Content** — what the memory says.
- **Type** — fact / preference / event / relation / skill / goal / inferred / temporary / episodic.
- **Source** — origin (user/agent/tool) + originId (which conversation, which agent, which tool call).
- **Timestamp** — createdAt, updatedAt, lastVerifiedAt, lastRecalledAt.
- **Confidence** — current decayed value + history chart.
- **Evidence** — list of supporting observations with excerpts.
- **Scope** — project / global / session.
- **Status** — active / superseded / stale / deleted.
- **Conflict flags** — if it has open conflicts.

### 13.2 Where the user sees it

- Memory tab in sidebar (default view).
- Per-conversation memory inspector (right sidebar).
- DeveloperPanel → Memory tab (full audit, when devMode on).

### 13.3 [CURRENT] Deficiency

[CURRENT] Memory is shown only via the seed `INITIAL_MEMORIES` constants in `lib/nova/constants.ts` (UI-side). The Core's MemoryEngine contents are not surfaced in any UI. [FACT — see Audit §2, issue 3]

---

## 14. User Correction [TARGET — Bible Part 5.12]

### 14.1 Edit

- User can edit any memory's `content`, `type`, `metadata`.
- Edit bumps `updatedAt`, sets `lastVerifiedAt = now`, raises confidence +0.1 (user re-confirmed).
- Edit creates a new `MemoryEdit` record (audit trail) with the diff.

### 14.2 Reject auto-extraction

- Auto-extracted memories are `status = 'pending_confirmation'` until the user confirms.
- User can reject → memory moves to `status = 'rejected'` (kept for feedback, excluded from recall).
- The pattern that produced the rejected extraction feeds back into the extraction prompt (negative example).

### 14.3 "Don't save this"

- Per-conversation toggle: `disable_auto_extraction = true`.
- Explicit: only applies to that conversation, not global.
- Does NOT disable user-initiated saves.

### 14.4 [CURRENT] Deficiency

[CURRENT] No edit, no reject, no toggle. [FACT]

---

## 15. Retrieval [TARGET]

### 15.1 Three retrieval modes

| Mode | When | Algorithm |
|---|---|---|
| **Direct** | Exact match (memory by ID, by `(type, subject)` pair) | O(1) lookup |
| **Semantic** | "What does MiMo know about X?" | Embedding similarity (top N by cosine) → rerank by §6.1 confidence |
| **Graph** | "What's related to memory X?" | Traverse `MemoryRelation` edges (1-2 hops) |

### 15.2 Default recall for ContextBuilder

```
recall({
  scope: currentProjectScope,
  search: taskInput,
  types: ['fact', 'preference', 'skill', 'goal', 'relation'],  // not 'inferred'/'temporary' by default
  limit: 5,
  minConfidence: 0.2,
  excludeStatus: ['superseded', 'deleted', 'rejected', 'stale', 'pending_confirmation']
})
```

### 15.3 Ranking (5-factor score, Bible Part 6.9)

```
score = 0.35 × relevance
      + 0.20 × importance
      + 0.20 × confidence   // decayed
      + 0.10 × freshness
      + 0.15 × proximity     // graph distance to current task entities
```

### 15.4 [CURRENT] Deficiency

[CURRENT] Recall does substring match (1.0 if `content.includes(search)`, else word-overlap ratio). No embeddings, no graph traversal, no 5-factor scoring. [FACT — `MemoryEngine.ts:151-163`]

---

## 16. How is Memory Created? When? Who is allowed?

### 16.1 Creation paths [TARGET]

| Path | Who/what | Confidence initial | Status initial |
|---|---|---|---|
| **User explicit save** | User clicks "remember this" / types `/remember <fact>` | 0.9 | active |
| **User confirms auto-extraction** | User accepts a pending extraction | 0.8 (raised from 0.4) | active |
| **Agent infers + writes** (with explicit approval) | Agent writes during task, approval gate shown | 0.4 | pending_confirmation |
| **Tool observation** (e.g. user opens a file many times → "user works on X") | Tool emits observation event, consolidation engine creates memory | 0.3 | pending_confirmation |
| **Auto-extraction (background)** | Conversation analyzer detects a fact claim | 0.4 | pending_confirmation |
| **Import** (from external file) | User imports a JSON/markdown | 0.6 | active |

### 16.2 Who is allowed to write?

| Role | Allowed? | Constraint |
|---|---|---|
| User | Yes | Any type, any confidence, status=active immediately. |
| Planner agent | Yes (only intent-related facts) | Must declare `agent:planner` provenance. Confidence ≤ 0.4. Status=pending_confirmation. |
| Memory agent | Yes (full access) | Confidence ≤ 0.6 (auto-extracted). Status=pending_confirmation unless user pre-confirmed. |
| Research agent | No (research outputs go to Knowledge, not Memory) | — |
| Writer agent | No (writing outputs go to Artifacts, not Memory) | — |
| Tools | Yes (observations only, never claims) | Must declare `tool:<id>` provenance. Confidence ≤ 0.3. Status=pending_confirmation. |
| Plugins (MCP) | No by default | Owner must approve memory-write capability on plugin install. |
| Background jobs | Yes (consolidation, decay) | Only modify existing, do not create new (consolidation creates via Memory agent). |

### 16.3 When

- **Per turn (synchronous)**: only if the user explicitly saves OR an agent explicitly infers with approval. Most memories are NOT created per turn.
- **Per conversation (async)**: at conversation close, the Memory agent runs auto-extraction on the full transcript.
- **Daily (background)**: consolidation engine merges + decays + flags stale.

### 16.4 [CURRENT] Deficiency

[CURRENT] Any code can call `memoryEngine.store({ type, content })`. No constraint on confidence, status, or caller. No approval gate. [FACT]

---

## 17. False Memory Prevention [TARGET — Bible Part 5.11]

Five-layer defense:

1. **Provenance** — every memory shows source. The user can immediately see "this came from agent inference, not from me."
2. **Confidence decay** — old memories fade unless re-verified. A one-off hallucination ages out.
3. **User confirmation** — auto-extracted memories require user confirmation before becoming `active`. They are `pending_confirmation` until then.
4. **Deletion** — one-click delete on every memory.
5. **Classify** — memories classified as `fact` / `inferred` / `opinion` (Bible Part 6.6 Knowledge Policies). Only high-confidence + high-evidence + user-confirmed memories become `fact`.
6. **`/* check-token */` hallucination guard** — speculative/uncertain content marked for human review (Primer pattern). Such content cannot enter context unless the user explicitly opts in.

### 17.1 What is forbidden

- Auto-extracted memory with `trustLevel = 'confirmed'` (must be `'unconfirmed'` until user verifies).
- Memory with `confidence > 0.6` that has zero `Evidence` items.
- Memory of type `fact` without at least one `user_action` evidence.
- Memory whose `origin = 'auto-extracted'` and `trustLevel = 'verified'` (auto-extraction cannot verify; only user or tool can).

### 17.2 [CURRENT] Deficiency

[CURRENT] No false memory prevention. Any code can store anything with default confidence. [FACT]

---

## 18. The Memory Engine API (Target)

```typescript
interface MemoryEngine {
  // Write
  store(input: StoreInput): MemoryEntry;                              // sync, returns frozen entry
  addEvidence(memoryId: string, evidence: Evidence): MemoryEntry;    // appends evidence, raises confidence
  confirm(memoryId: string): MemoryEntry;                            // user confirms pending → active
  reject(memoryId: string): MemoryEntry;                             // user rejects pending
  edit(memoryId: string, changes: Partial<MemoryContent>): MemoryEntry; // user edit
  
  // Read
  recall(query: MemoryQuery): readonly MemoryEntry[];                // 5-factor ranked
  get(memoryId: string): MemoryEntry | undefined;                    // direct
  related(memoryId: string, hops?: number): readonly MemoryEntry[]; // graph traverse
  
  // Relations
  relate(fromId: string, toId: string, relation: string, evidence: Evidence): void;
  relations(memoryId: string): readonly MemoryRelation[];
  
  // Conflict
  detectConflicts(memoryId?: string): Conflict[];                     // explicit, not auto
  resolveConflict(conflictId: string, resolution: Resolution): void; // user-driven
  
  // Lifecycle
  forget(memoryId: string): void;                                     // soft_delete
  archive(memoryId: string): void;                                   // archive
  purge(memoryId: string): void;                                     // hard delete
  restore(memoryId: string): MemoryEntry;                            // undo soft_delete
  
  // Background
  runDecayJob(): DecayReport;                                         // daily
  runConsolidationJob(): ConsolidationReport;                         // daily
  
  // Inspection
  size(): number;
  inspect(query: InspectQuery): MemoryInspectionResult;               // for Memory tab
}
```

The interface is **identical** to the current one in shape (store, recall, get, relate, forget) — a persistent backend can drop in without breaking callers. [FACT — `MemoryEngine.ts` comment: "The interface is designed so a persistent backend can drop in later without changing callers."]

---

## 19. Persistence Schema [TARGET]

```prisma
model Memory {
  id              String   @id @default(cuid())
  type            String   // fact | preference | event | relation | skill | goal | inferred | temporary | episodic
  content         String
  metadata        Json
  scope           String   // project | global | session
  projectId       String?
  conversationId  String?
  status          String   // active | pending_confirmation | superseded | stale | deleted | rejected | archived | orphaned
  trustLevel      String   // confirmed | verified | inferred | unconfirmed
  baseConfidence  Float
  decayedConfidence Float
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  lastVerifiedAt  DateTime?
  lastRecalledAt  DateTime?
  expiresAt       DateTime?
  supersededById  String?
  
  provenance      Json     // { origin, originId, capturedAt }
  evidence        Evidence[]
  relations       MemoryRelation[]
  edits           MemoryEdit[]
  
  @@index([type, status])
  @@index([scope, projectId])
  @@index([status, decayedConfidence])
  @@index([conversationId])
}

model MemoryRelation {
  id          String  @id @default(cuid())
  fromId      String
  toId        String
  relation    String
  evidence    Json
  createdAt   DateTime @default(now())
  
  from        Memory  @relation("from", fields: [fromId], references: [id])
  to          Memory  @relation("to", fields: [toId], references: [id])
  
  @@index([fromId])
  @@index([toId])
}

model Evidence {
  id          String  @id @default(cuid())
  memoryId    String
  type        String  // message | tool_output | agent_reasoning | user_action | external_source
  refId       String
  excerpt     String
  capturedAt  DateTime @default(now())
  
  memory      Memory  @relation(fields: [memoryId], references: [id])
  
  @@index([memoryId])
  @@index([type, refId])
}

model MemoryEdit {
  id          String  @id @default(cuid())
  memoryId    String
  changes     Json
  editedBy    String  // user | agent_id
  editedAt    DateTime @default(now())
  
  memory      Memory  @relation(fields: [memoryId], references: [id])
}

model MemoryConflict {
  id          String  @id @default(cuid())
  memoryAId   String
  memoryBId   String
  reason      String
  status      String  // open | resolved | ignored
  resolution  Json?
  detectedAt  DateTime @default(now())
  resolvedAt  DateTime?
}
```

[INFERENCE — schema reflects every TARGET requirement. Should be reviewed against Prisma best practices + SQLite limits (single-row size, JSON column perf).]

---

## 20. Migration Path [MIGRATION]

### Phase 1 — Persistence
- Define Prisma schema per §19.
- Replace `MemoryEngine`'s in-RAM Map with Prisma-backed implementation (same interface).
- Run `prisma db push --accept-data-loss` (Audit §16 — acceptable; existing data is seeds).
- Add `Memory.scope`, `Memory.projectId`, `Memory.conversationId`.

### Phase 2 — Provenance + Confidence
- Add `provenance`, `evidence`, `trustLevel`, `baseConfidence`, `decayedConfidence` fields.
- Backfill: every existing memory gets `provenance = { origin: 'system', originId: 'seed', capturedAt: <createdAt> }`.
- Implement `addEvidence`, `confirm`, `reject`.

### Phase 3 — Conflict Detection + Merge
- Implement `detectConflicts` (background job + on-store trigger).
- Implement merge algorithm per §11.
- Add `MemoryConflict` table.

### Phase 4 — Decay
- Add `lastVerifiedAt`, `expiresAt`.
- Implement daily decay job.
- Add `status = 'stale'` transition.

### Phase 5 — Deletion Safety
- Implement `soft_delete` (default for `/forget`).
- Implement 30-day auto-purge.
- Implement audit trail for every delete.
- Implement cascade (relations, evidence, knowledge entities).

### Phase 6 — Inspection UI
- Wire Memory tab to Core's `inspect()` API.
- Remove `INITIAL_MEMORIES` from `lib/nova/constants.ts` (Audit issue 16).

### Phase 7 — Auto-Extraction
- Implement Memory agent's auto-extraction (background, on conversation close).
- All extractions `status = 'pending_confirmation'` until user confirms.

Each phase is independently shippable. Phase 1 unblocks everything.

---

## 21. Trust Boundaries for Memory

| Boundary | What crosses | Enforced by |
|---|---|---|
| Agent → Memory | Write request | MemoryEngine (validates caller, caps confidence per §16.2) |
| Tool → Memory | Observation write | MemoryEngine (observation only, no claims) |
| Plugin → Memory | Write attempt | MemoryEngine (refuses unless plugin has `memory:write` capability, user-approved at install) |
| Background job → Memory | Decay / consolidation | MemoryEngine (jobs cannot create new memories, only modify existing) |
| User → Memory | Edit / delete | UI → API → MemoryEngine (always allowed, always audited) |
| Memory → Context | Recall result | ContextBuilder (re-ranks per `MiMo_Context_Architecture.md` §4.2) |
| Memory → Knowledge | Consolidation | ConsolidationEngine (only creates Knowledge entities from `active` memories) |
| Memory → UI | Inspection | API route (scoped by user; single-user but still typed boundary) |

---

## 22. Open Questions [UNKNOWN]

| # | Question | Why it matters | Investigation |
|---|---|---|---|
| 1 | Should `episodic` memories be stored separately (event log) or in the same `Memory` table? | Affects query performance | Profile after 10k memories |
| 2 | Embedding model: local (sentence-transformers) or API? | Latency vs cost vs privacy | Test both once embeddings land |
| 3 | Should auto-extraction be on by default or opt-in? | Privacy + surprise factor | User research |
| 4 | How to handle memory of sensitive content (passwords, secrets) accidentally stored? | Security risk | Add pattern-based detection + refuse-to-store + warn |
| 5 | Should the user see "MiMo wants to remember X" prompts inline in chat? | UX tradeoff — fatigue vs transparency | Test in user research |
| 6 | What's the SQLite row-size limit for `metadata` JSON? | Schema constraint | Test with Prisma + SQLite |

---

## 23. Non-Goals

- Knowledge graph internals (see `MiMo_Knowledge_Architecture.md`).
- Context assembly (see `MiMo_Context_Architecture.md`).
- AI model used for auto-extraction (see `MiMo_AI_Architecture.md`).
- Memory tab UI rendering.

---

## 24. Summary

[CURRENT]: `MemoryEngine` is an in-RAM `Map<string, StoredEntry>`. Not persisted. Substring recall (1.0 / 0.5 / 0 score). No confidence, no decay, no provenance, no scope, no conflicts, no merge, no edit, no inspect UI wiring. The interface IS designed for a drop-in persistent backend. 6 memory types, no inferred/temporary/episodic.

[TARGET]: 9 memory types (6 Bible + 3 operational). 4 scopes (project / global / folder / session). Provenance on every memory. Decay with per-type halflife. 5-layer false-memory prevention. Three deletion modes (soft / archive / purge). Conflict detection with deterministic resolution rules. Merge that preserves history. User inspection, correction, and "don't save" controls. SQLite-backed via Prisma. Memory agent auto-extracts (pending confirmation) on conversation close.

[MIGRATION]: 7 phases. Persistence first (unblocks everything). Provenance → Conflicts → Decay → Deletion safety → Inspection UI → Auto-extraction.

**Invariant:** Memory is the user's, not MiMo's. MiMo writes with provenance. The user edits with audit. Deletion is guaranteed. Stale information decays. False memory is structurally prevented from becoming "fact."
