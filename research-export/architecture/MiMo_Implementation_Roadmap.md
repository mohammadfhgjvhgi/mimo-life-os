# MiMo — Implementation Roadmap
### Phase: Foundation From The Ground Up — ARCH-E
### Owner: Senior Systems Architect

**Status:** BINDING. This roadmap is **dependency-driven** (NOT feature-driven). Each phase ships a stable layer; the next phase builds on it. A phase cannot start until its prerequisites are met. A phase cannot be marked complete until its acceptance criteria pass.

**Source documents:**
- `MiMo_Product_Bible.md` (3,407 lines — product authority).
- `architecture/MiMo_Current_System_Audit.md` (501 lines — current reality).
- `architecture/MiMo_Architecture_Decision_Log.md` (this ARCH-E — D1–D25).
- `architecture/MiMo_Architecture_Dependencies.md` (this ARCH-E — layering rules).

**Epistemic labels:** [CURRENT] · [TARGET] · [MIGRATION] · [FACT] · [INFERENCE] · [UNKNOWN].

**Roadmap principles:**
1. **Dependency-driven.** Phase N+1 depends on Phase N's deliverables. Phases do not skip.
2. **Independently shippable.** Each phase has a coherent user-visible change (or a documented infrastructure improvement). No phase exists only to enable a future phase.
3. **No deprecations mid-redesign** (D14, Bible Invariant 10). The CURRENT path stays runnable until the TARGET path is verified.
4. **Rollback always available.** Every phase has a rollback strategy that restores the prior state.
5. **Build for 10 years, don't over-engineer speculative futures.** Stable interfaces; no speculative abstraction. (Bible Part 26.8.)
6. **Validation method specified per phase.** Most phases validate via Agent Browser golden-path + the contract-test suite from D24.

---

## Phase index

| Phase | Layer | Status | Independently shippable? |
|---|---|---|---|
| 0 Foundation | L0, L8, L9 (config only) | START HERE | YES — fixes broken dev server + lint gates |
| 1 Persistence | L1 | pending | YES — durable storage (no feature visible yet) |
| 2 Domain | L2 | pending | YES — domain models in place |
| 3 Events | L3 | pending | YES — audit trail live |
| 4 APIs | L8 | pending | YES — Core pipeline enforced everywhere |
| 5 Context Engine | L2 (ContextBuilder) | pending | YES — deterministic context per query |
| 6 Memory Engine | L2 (MemoryEngine) | pending | YES — durable memory w/ provenance |
| 7 Knowledge Engine | L2 (KnowledgeEngine) | pending | YES — derived graph from memory |
| 8 AI Runtime | L5 | pending | YES — real streaming + model routing |
| 9 Agent Runtime | L6, L7 | pending | YES — pause/resume + permissions |
| 10 Tools | L2, L7 | pending | YES — unified tool contract |
| 11 Sandbox | L7 | pending | YES — runnable code artifacts |
| 12 Artifacts | L2 | pending | YES — first-class tab-able artifacts |
| 13 Search | L1, L2 | pending | YES — universal search with FTS5 |
| 14 Application | L8 | pending | YES — workspace API aggregation |
| 15 UI Architecture | L9 | pending | YES — split Zustand stores |
| 16 UI Implementation | L9 | pending | YES — ExecutionTrace shows real events |

**Sequence:** 0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13 → 14 → 15 → 16.

Phases 5–7 are siblings under Phase 2 (Domain) — they can be done in any order, but all must precede Phase 8. Recommended order: 5 (Context) → 6 (Memory) → 7 (Knowledge) because Memory produces the data Context assembles.

Phases 10, 11, 12 are siblings under Phase 9 (Agent Runtime). Recommended order: 10 (Tools) → 11 (Sandbox) → 12 (Artifacts) — Tools + Sandbox are prerequisites for the Builder/Verifier agents that produce Artifacts.

---

## Phase 0 — Foundation

**Layer:** L0 (Foundation), L8 (Application config), L9 (Frontend cleanup).

**Goal:** Make the dev server runnable, the lint meaningful, the type system strict, and remove all known dead boilerplate. Establish the automated gates that every subsequent phase relies on.

**Prerequisites:** None. This is the start.

**Deliverables:**
1. `rm -rf .next` + restart dev server → `curl http://localhost:3000/` returns 200 (Audit §1.5 + §16 risk #7).
2. `tsconfig.json`: `noImplicitAny: true`, `strict: true`, `noUnusedLocals: true`, `noUnusedParameters: true` (Audit §1.1 + §12 debt #2).
3. `next.config.ts`: `typescript: { ignoreBuildErrors: false }`, `reactStrictMode: true` (Audit §12 debt #1).
4. `eslint.config.mjs`: strict config — re-enable all rules listed in Audit §10.2 (`@typescript-eslint/no-explicit-any: error`, `no-unused-vars: error`, `no-console: error`, `react-hooks/exhaustive-deps: warn`, etc.).
5. Add `eslint-plugin-import` + `no-cycle` rule (Dependencies §3.1 + §9).
6. Add `eslint-plugin-no-restricted-imports` enforcing D4 + Invariant 17 (Dependencies §4.1).
7. Add custom `scripts/check-layering.ts` enforcing Dependencies §8 cheat sheet.
8. `package.json`: add `"test:contract": "bun run tests/contract/*"` placeholder (D24).
9. Remove `next-auth` from dependencies (D7).
10. Delete dead boilerplate (Audit §15): `src/app/api/route.ts`, `NovaApp.tsx`, dead `components/nova/*View.tsx` (Sidebar, Topbar, AnalyticsView, TasksView, MemoryView, AgentsView, PromptsView, CanvasView, ArtifactsPanel), dangling `/api/axp/*` references in `components/mimo/hooks.ts`, stray root PNGs + JSONs.
11. Archive (don't delete) stale docs: `MIMO_PRODUCT_SPEC.md`, `MIMO_ENGINEERING_SPEC.md`, `ENGINEERING_REPORT.md`, `UX_ARCHITECTURE_REPORT.md`, `MiMo_Design_Specification.md` → `architecture/archive/`.
12. Investigate Audit §18 unknowns #3 (TanStack Query usage) + #6 (next-auth usage) + #5 (`skills/` folder) — document findings in worklog.
13. Fix all surfaced TypeScript errors (incremental — fix per file, not all at once).

**Acceptance criteria:**
- `bun run dev` → `curl http://localhost:3000/` returns 200.
- `bun run lint` exits 0.
- `bun run build` exits 0 (with strict TS).
- `grep -r "z-ai-web-dev-sdk" src/app src/components` returns ZERO matches (Dependencies §4.1 — pre-Phase-4 state is 2 matches; Phase 0 may not yet fix them, but the lint rule must be in place so Phase 4 cannot regress).
- `grep -r "'use server'" src/app src/components` returns ZERO matches (D25).
- `grep -r "next-auth" package.json src/` returns ZERO matches.
- Dev server restart test: kill -9 the dev server mid-write → restart → no `globals.css:1092` error (Audit §1.5 + §18 unknown #1).

**Tests:**
- No automated tests yet (D24 — contract tests start in Phase 4).
- Manual Agent Browser golden-path: page loads, conversation sends + streams, image + search modals open.

**Migration requirements:**
- All TS errors fixed; no `// @ts-ignore` left (Bible Invariant 26).
- Dead code removed cleanly (grep for orphans before delete — Audit §16 risk #6).
- Stale docs moved to archive, not deleted.

**Rollback strategy:** If lint strictness surfaces an unrecoverable error count, create a `lint-baseline.json` (eslint `--no-error-on-unmatched-pattern` workaround) and reduce the baseline by N errors per week until zero. Do NOT disable rules; baseline the existing violations.

---

## Phase 1 — Persistence

**Layer:** L1 (Data).

**Goal:** Replace the boilerplate Prisma schema with the full MiMo domain schema + persistent MemoryEngine + AuditEvent log + WAL mode. After this phase, every byte of canonical state survives a restart.

**Prerequisites:** Phase 0 (strict TS + lint + dev server runnable).

**Deliverables:**
1. `prisma/schema.prisma` rewritten with MiMo domain models (full list — see below).
2. First real migration: `prisma migrate dev --name init_domain_schema` (Audit §3.1 — no migrations today).
3. SQLite WAL mode enabled via Prisma `datasource` config + `PRAGMA journal_mode=WAL;` on boot.
4. SQLCipher compatibility validation (D2 — [UNKNOWN]). If compatible, add a `SqlCipherAdapter` flag; if not, document as v2.
5. Persistent `MemoryEngine` (D22): `Map<string, StoredEntry>` → Prisma queries. Interface unchanged.
6. `AuditEvent` Prisma model + EventBus refactor (D3): every `publish()` writes a row before notifying subscribers.
7. DB seed script (`prisma/seed.ts`): replaces `lib/nova/constants.ts INITIAL_MEMORIES` + `INITIAL_TASKS` (Audit §3.2 dual-source-of-truth fix).
8. Delete `lib/nova/constants.ts` `INITIAL_*` exports (Dependencies §3.2 fix).
9. Daily local backup script (`scripts/backup.ts`) — Bible Part 22.12.

**Prisma schema (initial domain models):**
```prisma
model Project { id, name, accent, createdAt, updatedAt, mimoMdPath }
model Conversation { id, projectId, title, pinned, archivedAt, createdAt, updatedAt }
model Message { id, conversationId, role, content, tokens, createdAt }
model Memory { id, projectId?, type, content, source, confidence, decayedConfidence, createdAt, updatedAt, deletedAt }
model MemoryRelation { id, fromMemoryId, toMemoryId, relation }
model Entity { id, projectId?, type, name, aliases[], confidence, class, createdAt }
model EntityRelation { id, fromEntityId, toEntityId, type }
model Artifact { id, projectId, conversationId, type, title, content, version, provenance, createdAt }
model Task { id, projectId, conversationId, status, plan, startedAt, completedAt }
model AgentState { id, taskId, role, scope, model, status, state }
model Execution { id, taskId, agentId, toolId, input, output, status, startedAt, completedAt }
model AuditEvent { id, type, payload (Json), source, correlationId, causationId, timestamp }
model TrustLedger { id, projectId, taskType, scope, approvalCount, granted, grantedAt }
```

**Acceptance criteria:**
- `bun run db:migrate dev` succeeds on a fresh clone.
- Restart test: store a memory → kill server → restart → memory is present.
- Audit trail test: send a chat → `AuditEvent` table has rows for `chat.requested`, `workflow.started`, `workflow.completed`, `response.ready`.
- WAL test: read during write does not block (concurrent read while a write transaction is open).
- No `INITIAL_MEMORIES` in `lib/nova/constants.ts` (Dependencies §3.2 fix verified).
- `lib/db.ts` is imported ONLY from `core/**` + `app/api/**` (Dependencies §4.3 — verified by lint).

**Tests:**
- Contract test (D24) for MemoryEngine persistence: store → restart → recall returns it. (First contract test — establishes the pattern.)
- Contract test for EventBus persistence: publish → restart → replay returns it.

**Migration requirements:**
- Existing `db/custom.db` (24KB demo) is acceptable data loss (Audit §16 risk #1 — `--accept-data-loss`).
- All CURRENT in-RAM state (MemoryEngine, EventBus) preserved behind the same interface so callers in `app/api/*` + `core/*` don't change.

**Rollback strategy:** The persistent MemoryEngine + EventBus are behind the existing interfaces. If a critical bug appears, swap the implementation back to in-RAM `Map` (the old code is preserved in git history; a feature flag `MIMO_PERSISTENCE=memory|sqlite` could gate this during Phase 1 — Phase 3 transition). The Prisma schema is additive (new tables); rollback = drop the new tables + restore the old MemoryEngine.

---

## Phase 2 — Domain

**Layer:** L2 (Domain).

**Goal:** Establish the canonical domain engines and their public interfaces. After this phase, every domain concept in the Bible has a TypeScript interface + an in-process implementation (some backed by Prisma from Phase 1, others in-memory for now).

**Prerequisites:** Phase 1 (Prisma schema exists; MemoryEngine persistent).

**Deliverables:**
1. `core/memory/MemoryEngine.ts` — refined interface: `store(input)`, `recall(query)`, `delete(id)`, `list(filter)`, `inspect(id)`, `correct(id, patch)`. (Bible Part 5.)
2. `core/knowledge/KnowledgeEngine.ts` — interface for entity/relation CRUD + retrieval. Stub impl in Phase 2 (full impl in Phase 7).
3. `core/context/ContextBuilder.ts` — refine to assemble `ContextObject` per Bible Part 4.2. (Existing ContextBuilder refactored; full deterministic policy in Phase 5.)
4. `core/artifacts/ArtifactStore.ts` — interface for artifact CRUD + versioning. Stub impl in Phase 2 (full impl in Phase 12).
5. `core/tasks/TaskStore.ts` — interface for task lifecycle.
6. `core/agents/AgentState.ts` — interface for per-task agent state.
7. `core/registry/` — extend Tool/Agent/Model/Capability registries with typed lookup + permission metadata.
8. `core/prompts/PromptEngine.ts` — refactor to modular layer composition per Bible Part 7.2 (9 layers: System, Developer, Memory, Knowledge, Executive, History, Extra, Safety, User). (Existing PromptEngine may be partial — refactor to full.)
9. Domain types added to `core/types.ts`: `Project`, `Conversation`, `Message`, `Memory`, `MemoryRelation`, `Entity`, `EntityRelation`, `Artifact`, `Task`, `AgentState`, `Execution`, `AuditEvent`, `TrustLedger`. (Aligns with Prisma models from Phase 1.)
10. WorkflowEngine: add `Done` stage to pipeline (D5 — 6-stage pipeline).
11. Public API surface curated in `core/index.ts` (D9 — see Dependencies §2): `core.kernel`, `core.capabilities`, `core.workflow`, `core.memory`, `core.knowledge`, `core.context`, `core.events`, `core.registry`.

**Acceptance criteria:**
- Every domain engine has a TypeScript interface + at minimum a stub implementation that returns valid (if trivial) data.
- `core/index.ts` exports only the public API surface — internal symbols are not exported (verified by `scripts/check-layering.ts`).
- 6-stage pipeline: WorkflowEngine runs Context → Reason → Plan → Execute → Validate → Done; `Done` stage flushes audit events + emits `workflow.completed`.
- Every domain type in `core/types.ts` matches its Prisma model.
- Agent Browser: send a chat message → ExecutionTrace shows 6 stages lighting up (the `Done` stage visible briefly before dock slides away).

**Tests:**
- Contract tests for each domain engine's interface (D24 pattern): given input X, returns shape Y.
- `scripts/check-layering.ts` passes (Dependencies §9).

**Migration requirements:**
- Existing ContextBuilder + MemoryEngine callers in `app/api/*` continue to work (interface-compatible).
- WorkflowEngine adds the `Done` stage without breaking existing 5-stage callers (Done is idempotent — running it twice is safe).

**Rollback strategy:**
- Domain engines are additive. Rollback = remove new engines; old `core/memory`, `core/context`, `core/workflow` continue to work (they are kept in place — D14 no deprecations mid-redesign).
- The `Done` stage can be feature-flagged off (`MIMO_PIPELINE_STAGES=5|6`).

---

## Phase 3 — Events

**Layer:** L3 (Events).

**Goal:** The EventBus becomes a hybrid: in-memory pub/sub + persistent AuditEvent log. Replay API for crash recovery + DeveloperPanel.

**Prerequisites:** Phase 1 (AuditEvent Prisma model) + Phase 2 (domain types include `AuditEvent`).

**Deliverables:**
1. `core/events/EventBus.ts` refactored: `publish()` does (a) Prisma insert into AuditEvent, (b) sync notify subscribers. (D3.)
2. `core/events/replay.ts` — `replay(filter: { type?, source?, correlationId?, from?, to? })` reads AuditEvent rows and re-publishes (with `dryRun` flag for UI subscribers).
3. `core/events/AuditLog.ts` — query API for the DeveloperPanel Events tab.
4. Compaction policy (D3): keep 90 days full detail, aggregate to daily summaries after. Append-only — never delete.
5. Event type taxonomy (Bible Part 8.5 — 12 OpenHands-style types): `chat.requested`, `workflow.{started,completed,failed}`, `stage.{entered,exited}`, `agent.{started,completed,failed,cancelled}`, `tool.{invoked,completed,failed}`, `memory.{stored,recalled,forgotten}`, `response.ready`, `error.occurred`, `recovery.{suggested,applied}`.
6. EventBus subscribers must be idempotent (documented invariant).
7. High-frequency events (token streaming, stage progress) routed to a non-audited `StreamChannel` to avoid AuditEvent table bloat. (D3 — performance note.)

**Acceptance criteria:**
- Every tool invocation produces an `AuditEvent` row (Bible Part 22.9).
- Crash-recovery test: kill server mid-publish → restart → AuditEvent row is present (Prisma transaction committed before notify).
- Replay test: subscribe a counter handler; replay last 100 events → counter matches actual publishes.
- DeveloperPanel Events tab shows the audit trail (requires devMode + Phase 15 wiring; in Phase 3, can be verified via `/api/mimo/workspace?includeAudit=1`).
- Compaction: insert 1000 events with timestamps >90 days ago → run compaction → row count drops to daily summaries.

**Tests:**
- Contract test for EventBus persistence + replay.
- Idempotency test: subscribe handler that increments a counter; publish event twice → counter increments twice (not four times) after replay (subscriber must be idempotent; non-idempotent subscribers are documented as such).

**Migration requirements:**
- Existing EventBus subscribers continue to work (interface unchanged; just adds persistence).
- The `publish()` call becomes async (Prisma insert is awaitable). Every caller of `publish()` already awaits or doesn't need to (fire-and-forget is OK for audit events; the insert is awaited, the subscriber notify is sync).

**Rollback strategy:**
- Drop the AuditEvent write inside `publish()` → back to CURRENT pure in-memory bus. The AuditEvent table remains (read-only) for historical audit.

---

## Phase 4 — APIs

**Layer:** L8 (Application).

**Goal:** Every API route goes through the Core pipeline. Zero bypass paths. Contract tests for every adapter.

**Prerequisites:** Phase 2 (public API surface) + Phase 3 (events).

**Deliverables:**
1. `core/capabilities/image/ImageAdapter.ts` interface + `core/capabilities/image/ZAIImageAdapter.ts` impl. (D4.)
2. `core/capabilities/search/SearchAdapter.ts` interface; existing `core/search/SearchProvider.ts` refactored to conform.
3. `app/api/image/route.ts` refactored: remove direct `z-ai-web-dev-sdk` import; call `core.capabilities.image.generate(input)`. (Audit §2 issue #1 + Dependencies §4.1 fix.)
4. `app/api/search/route.ts` refactored: same — call `core.capabilities.search.query(input)`.
5. `app/api/*/route.ts` defensive wrapper: every Core call wrapped in `safe()` (Bible Part 25.3 — try/catch returning a structured error response).
6. Contract tests (D24): `tests/contract/ZAIModel.contract.ts`, `tests/contract/ZAIImageAdapter.contract.ts`, `tests/contract/SearchProvider.contract.ts`, `tests/contract/SearchAdapter.contract.ts`.
7. `package.json` `"test:contract"` script wired to `bun test tests/contract/`.

**Acceptance criteria:**
- `grep -r "z-ai-web-dev-sdk" src/app src/components` returns ZERO matches. (Verified by lint rule from Phase 0.)
- `grep -r "z-ai-web-dev-sdk" src/core` returns matches ONLY in `src/core/models/ZAIModel.ts`, `src/core/capabilities/image/ZAIImageAdapter.ts`, `src/core/capabilities/search/SearchProvider.ts`.
- `bun run test:contract` exits 0.
- Adapter swap test: replace ZAIImageAdapter with a mock adapter implementing the same interface → image route returns a mock image; contract test passes.
- Agent Browser: `/api/image` modal generates an image; `/api/search` modal returns results. No behavioral regression.

**Tests:**
- Contract tests (D24) — first real test suite in the repo.

**Migration requirements:**
- Adapter interface preserves the existing ZAIModel + SearchProvider behavior (no behavioral change to end users).
- The 2 API routes that bypass Core today are refactored to go through adapters; the existing UI modal call sites don't change.

**Rollback strategy:**
- If an adapter regression appears, swap the adapter impl back to direct SDK call (still wrapped in `safe()`). The route stays adapter-shaped; only the impl file reverts.
- Contract tests catch the regression before it ships.

---

## Phase 5 — Context Engine

**Layer:** L2 (ContextBuilder).

**Goal:** Deterministic context policy. The same input produces the same ContextObject. Token budgeting + compression visible in DeveloperPanel.

**Prerequisites:** Phase 2 (ContextBuilder interface) + Phase 6 ideally (MemoryEngine persistent) — but Phase 5 can ship with stub MemoryEngine and integrate later. Recommended: ship 5 after 6, but the ordering in the roadmap puts 5 first because ContextBuilder is the older existing engine.

**Deliverables:**
1. `core/context/ContextBuilder.ts` rewritten to assemble `ContextObject` per Bible Part 4.2 from all 10 layers (User, Conversation, Project, Task, Agent, Memory, Knowledge, File, Tool, Runtime).
2. Deterministic policy: same input → same ContextObject (no random sampling; top-N retrieval is rank-stable).
3. Token budgeting: `ContextBudget` per layer (configurable; defaults per Bible Part 4.5).
4. `core/executive/CompressionEngine.ts` — compresses when over budget (lossless for facts, lossy for verbosity). Original + compressed ratio logged. (Bible Part 4.5.)
5. Context transparency: ExecutionTrace Context stage shows memory recalled, knowledge retrieved, files in scope, tools available. (Bible Part 4.6.)
6. Context hygiene primitives (`/clear`, `/compact`, `/forget`, `/scope`, `/folder`) — Bible Part 4.3. Wire to slash-command parser.
7. `app/api/mimo/context` route (new) — returns the current ContextObject for the DeveloperPanel Context tab.

**Acceptance criteria:**
- Determinism test: same input twice → identical ContextObject (deep equal).
- Budget test: long conversation (1000 messages) → CompressionEngine kicks in → ratio < 1.0 logged → ExecutionTrace shows "context compressed."
- Transparency test: DeveloperPanel Context tab shows the 10 layers + their token counts.
- Hygiene test: `/clear` empties Conversation layer; `/compact` runs CompressionEngine on history; `/forget <id>` deletes a memory; `/scope <project>` switches Project layer; `/folder <path>` sets File layer.

**Tests:**
- Contract test for ContextBuilder: given fixed input, returns expected ContextObject shape.
- Compression ratio test: synthetic 10k-token conversation compresses to <5k tokens with no fact loss (assertion: every `fact`-type memory is preserved).

**Migration requirements:**
- Existing ContextBuilder callers (`runWorkflow`) continue to work; the new ContextBuilder returns a richer `ContextObject` but the existing fields are preserved.

**Rollback strategy:**
- ContextBuilder is behind `core.context.build()`. Rollback = swap to old ContextBuilder (preserved in git) until issue is resolved.

---

## Phase 6 — Memory Engine

**Layer:** L2 (MemoryEngine).

**Goal:** Full Bible Part 5 implementation: two-layer (explicit + implicit), project-scoped, every memory shows source + timestamp + type + confidence + delete, auto-extraction + consolidation, confidence decay, contradiction detection, user inspection/correction/deletion.

**Prerequisites:** Phase 1 (persistent MemoryEngine via Prisma) + Phase 2 (MemoryEngine interface).

**Deliverables:**
1. Memory types: fact, preference, event, relation, skill, goal (Bible Part 5.1) — Prisma enum.
2. Two-layer: explicit (saved) + implicit (conversation history). (Bible Part 5.2.)
3. Scopes: project-only + shared OS + folder-as-context. (Bible Part 5.3.)
4. Provenance: every memory has `source` (conversation turn / agent / tool). Enforced by Prisma schema (Phase 1).
5. Confidence decay: `decayedConfidence = base × exp(-age / halflife)` per type halflife (Bible Part 5.6). Computed on read.
6. Block-level addressing: every memory has a stable ID; `((mem_id))` reference in conversation. (Bible Part 5.7.)
7. Auto-extraction: during conversation, facts/preferences/skills auto-extracted, shown in Memory tab with type filters. Owner confirms or rejects. (Bible Part 5.5.)
8. Consolidation: topic mentions counted; thresholds (3 interest / 6 skill / 4 project) create/update knowledge entity. (Bible Part 5.5 — wires to Phase 7 KnowledgeEngine.)
9. Contradiction detection: when a new memory conflicts with an existing one, surface in Memory tab for owner resolution.
10. User controls: see all, edit, delete (one-click), prevent saving (`/forget <id>` or "don't save this" toggle per conversation), scope toggle. (Bible Part 5.12.)
11. Preventing false memory → fact: provenance + decay + owner confirmation + classify (fact/inference/opinion) + `/* check-token */` hallucination-guard. (Bible Part 5.11.)
12. No-code query layer + Datalog/SQL escape-hatch (Bible Part 5.9). Escape-hatch in DeveloperPanel.
13. Memory tab UI in `components/mimo/panels/MemoryBrowser.tsx` (already exists — refactor to consume real MemoryEngine data).

**Acceptance criteria:**
- Every memory in the DB has non-null `source` + `createdAt` + `type`.
- Restart test: extract a memory mid-conversation → restart → memory present in Memory tab.
- Decay test: insert a memory with `createdAt` 180 days ago → recall → `decayedConfidence` < `confidence`.
- Delete test: delete a memory → it's gone from recall but `deletedAt` is set (soft delete for audit).
- Auto-extraction test: send a chat containing "my name is X" → memory extracted → appears in Memory tab → owner confirms → becomes explicit memory.
- Contradiction test: insert "name = A" then chat "name = B" → contradiction surfaced.
- User control test: `/forget <id>` removes a memory; "don't save" toggle prevents extraction for that conversation.

**Tests:**
- Contract test for MemoryEngine: store → recall → delete → list (CRUD).
- Decay math test: given base + halflife + age, `decayedConfidence` matches formula.

**Migration requirements:**
- MemoryEngine interface unchanged from Phase 1/2; this phase adds behavior (auto-extraction, decay, consolidation) on top of the persistent store.

**Rollback strategy:**
- Auto-extraction is feature-flagged (`MIMO_MEMORY_AUTO_EXTRACT=true|false`). Rollback = disable flag; memories only stored manually.
- Decay is computed on read; rollback = read raw `confidence` instead of `decayedConfidence`.

---

## Phase 7 — Knowledge Engine

**Layer:** L2 (KnowledgeEngine).

**Goal:** Derived graph from memory + per-claim citations (NotebookLM gold standard). Entities, relationships, citations, retrieval.

**Prerequisites:** Phase 6 (MemoryEngine produces consolidation triggers).

**Deliverables:**
1. `core/knowledge/KnowledgeEngine.ts` full impl (stub from Phase 2 replaced).
2. Entity model per Bible Part 6.3 (id, type, name, aliases, confidence, class, evidence[]).
3. EntityRelation model (fromId, toId, type, confidence).
4. Consolidation triggers from MemoryEngine (Phase 6 deliverable #8) creating/updating entities.
5. Entity merge / archive (Bible Part 26.7).
6. Per-claim citation system: every knowledge-grounded AI answer cites source-to-quote (Bible DD-29).
7. Retrieval: top-N entities by relevance + confidence.
8. Knowledge tab UI in `components/mimo/panels/KnowledgeBrowser.tsx` (new).
9. Citation rendering in `MessageItem` (click citation → source).

**Acceptance criteria:**
- Consolidation test: 3 memories tagged "interest:arduino" → KnowledgeEngine creates an `interest` entity "arduino" with confidence = aggregated.
- Citation test: research-mode answer → every factual claim has a citation → click citation → source (memory or web result).
- Entity merge test: two entities with same name + type → merge into one; relations preserved.

**Tests:**
- Contract test for KnowledgeEngine: createEntity → relate → retrieve → merge.
- Citation contract test: research answer includes `citations[]` with non-null `sourceId` + `quote`.

**Migration requirements:**
- KnowledgeEngine is new (no CURRENT equivalent); no migration of existing data.
- MemoryEngine consolidation triggers wire in Phase 6 — Phase 7 implements the consumer.

**Rollback strategy:**
- KnowledgeEngine is additive. Rollback = disable consolidation triggers; entities table stays (read-only).

---

## Phase 8 — AI Runtime

**Layer:** L5 (AI).

**Goal:** Real model streaming, model routing (cheap/fast/deep/vision/local), tool calling protocol, fallback, local model support.

**Prerequisites:** Phase 4 (adapters + contract tests) + Phase 5 (ContextBuilder provides input).

**Deliverables:**
1. Model Router (`core/models/Router.ts`) — routes by role: cheap/fast/deep/vision/local. (Bible Part 7.1.)
2. Real streaming: `/api/chat` uses `ZAIModel.stream()` returning a `ReadableStream`; remove the word-by-word `setTimeout` fake. (Audit §4.2.)
3. Tool calling protocol: model returns structured tool calls (function-calling); Orchestrator executes them. (Audit §4.3 — currently manual.)
4. Toggleable reasoning per-prompt (Bible Part 7.4): "deep reasoning" toggle exposes chain-of-thought in ExecutionTrace (DeepSeek-R1 pattern).
5. Output styles (Bible Part 7.5): "Do it" / "Teach me" / "Collaborate."
6. Fallback adapter: at least one secondary provider registered (e.g. OpenAI-compatible or local model). (Dependencies §7.2 mitigation.)
7. Local model support: `core/models/OllamaModel.ts` or `core/models/LocalModel.ts` adapter (Aider `--oss` / Codex `--oss` pattern — Bible Part 7.1).
8. Retry + recovery (Bible Part 7.12): transient failure → retry with backoff (max 3); hard failure → RecoveryEngine suggests strategies.
9. `MIMO.md` per-project instructions (Bible Part 7.6): read at workflow start.
10. Per-query model picker (Bible Part 7.1 — Perplexity/GLM pattern): composer dropdown.
11. Contract tests for new adapters (D24): `OpenAIModel.contract.ts` or `OllamaModel.contract.ts` (whichever lands).

**Acceptance criteria:**
- Streaming test: `/api/chat` returns tokens as the model produces them (not after the full response is generated). Measure first-token latency <1s on cached context (Bible Part 1.2 success criteria #4).
- Model routing test: simple lookup → cheap model; complex reasoning → deep model; image analysis → vision model.
- Tool calling test: research prompt → model returns `web_search(query)` tool call → Orchestrator executes → result fed back → model produces final answer.
- Reasoning toggle test: toggle on → ExecutionTrace shows chain-of-thought; toggle off → fast direct answer.
- Fallback test: simulate primary provider failure → fallback adapter kicks in → no user-visible error.
- Local model test: switch to local adapter in Settings → no network calls during chat (verified by network monitor).

**Tests:**
- Contract tests for each new adapter.
- Streaming latency test (manual — Agent Browser + DevTools network tab).

**Migration requirements:**
- `/api/chat` keeps its existing interface (POST → streaming response); internal switch from fake-stream to real-stream is transparent to UI.
- Tool calling: ResearchAgent's manual `web_search` invocation is replaced by model-decided tool calls (Bible Part 7.8 — Reasoner decides tools). ResearchAgent becomes the executor, not the decider.

**Rollback strategy:**
- Real streaming is behind a feature flag (`MIMO_STREAMING=real|fake`). If real streaming regresses, swap to fake (preserved in git) until fixed.
- Model routing: default route = ZAI (current behavior); other routes are opt-in via UI toggle.

---

## Phase 9 — Agent Runtime

**Layer:** L6 (Agents), L7 (Runtime — partial: TrustLedger, PermissionsGate, Recovery, Checkpoints; Sandbox deferred to Phase 11).

**Goal:** Per-task-type trust, pause/resume, checkpoints, recovery, full audit trail. Five named agents (Planner, Researcher, Builder, Reviewer, Verifier).

**Prerequisites:** Phase 8 (AI Runtime — agents use models).

**Deliverables:**
1. Five named agents per Bible Part 8.1: Planner, Researcher, Builder, Reviewer, Verifier (replacing CURRENT Planner, Researcher, Memory, Writer — Audit §1.2).
2. `core/runtime/TrustLedger.ts` — per-project + per-task-type + per-scope trust. (D15.)
3. `core/runtime/PermissionsGate.ts` — every tool invocation checks TrustLedger + sandbox mode (read-only / workspace-write / danger — Bible Part 22.4).
4. `core/runtime/Recovery.ts` — suggests strategies on failure (retry / alternative / skip+continue / abort+rollback). (Bible Part 7.12, 8.10.)
5. `core/runtime/Checkpoints.ts` — state persisted at every stage; pause/resume + state-edit-and-continue (LangGraph pattern, Bible DD-26).
6. Agent cancellation (Bible Part 8.10): `Esc` or AgentDock cancel button; stops at next safe point.
7. Sub-agents (Claude Code pattern — Bible Part 8.3): Orchestrator spawns sub-agent for isolated sub-task; visible in AgentDock as nested entry.
8. Hierarchical delegation (OpenHands pattern — Bible Part 8.4): parent agent delegates to specialized sub-agent; result reviewed by parent.
9. Background tasks (Bible Part 8.9 — Codex Cloud Agent pattern adapted to local): long-running agent work continues while owner does other things; progress visible in conversation spine.
10. Per-agent scope (Bible Part 22.6): read-only / src/ / docs/ / full-workspace.
11. Per-agent model routing (Bible Part 22.6): cheap/fast / deep / vision / local.
12. Audit log per agent action (Bible Part 22.9 + Phase 3 AuditEvent): every action logged with agent, scope, model, approved/auto, result.

**Acceptance criteria:**
- Trust ledger test: 3 approvals of "run tests" → "Always allow?" prompt → grant → 4th invocation runs without prompt. Settings shows ledger; owner can revoke.
- Pause/resume test: long task → pause → edit state → resume → completes with edited state.
- Checkpoint test: kill server mid-task → restart → task resumes from last checkpoint (not from start).
- Sub-agent test: complex task → Orchestrator spawns Researcher sub-agent → visible as nested card in AgentDock.
- Cancellation test: cancel mid-task → stops at next safe point → no partial writes.
- Audit test: every agent action has an AuditEvent row (Phase 3 verification continued).
- Permission gate test: agent in `read-only` sandbox → `file_write` tool blocked.

**Tests:**
- Contract test for TrustLedger: 3 approvals → grant → 4th auto-approves.
- Contract test for Checkpoints: pause → resume completes.
- Contract test for PermissionsGate: blocked tool → returns structured denial.

**Migration requirements:**
- CURRENT 4 agents (Planner, Researcher, Memory, Writer) are renamed/restructured to 5 (Planner, Researcher, Builder, Reviewer, Verifier). Memory + Writer functionality moves to Memory engine (Phase 6) + Builder agent respectively. No behavioral regression — same chat produces same answer.
- TrustLedger is additive; first run = empty ledger (every tool call prompts).

**Rollback strategy:**
- Trust ledger: feature-flag (`MIMO_TRUST_LEDGER=true|false`); rollback = every tool call prompts (verbose but safe).
- Sub-agents: feature-flag; rollback = single-agent sequential (CURRENT behavior).

---

## Phase 10 — Tools

**Layer:** L2 (Tool registry + Tool contract), L7 (permissions, timeouts, cancellation).

**Goal:** Unified tool contract, permissions, risk levels, timeouts, cancellation. Built-in tools conform; MCP tools plug in.

**Prerequisites:** Phase 9 (TrustLedger + PermissionsGate).

**Deliverables:**
1. Tool contract (Bible Part 25.2): every tool declares `id, name, description, category, inputSchema, outputSchema, permissions, riskLevel, timeout, execute()`.
2. Risk levels: `low` (read-only), `medium` (write within scope), `high` (network or destructive). Bible Part 22.4.
3. Timeouts: every tool has a max execution time; default 30s; configurable per tool.
4. Cancellation: every `execute()` honors an `AbortSignal`; Orchestrator can cancel mid-execution.
5. Refactor existing 3 tools (WebSearch, MemoryRecall, MemoryStore) to the new contract.
6. Add tools for code mode (file_read, file_write, terminal) — stubbed, real impl in Phase 11 (Sandbox).
7. MCP client (`core/plugins/MCPClient.ts`): discovers local MCP servers, registers their tools/agents. (D10.)
8. MCP permission approval UI: first-use prompt per MCP tool.
9. Personal extension registry (Bible Part 25.11): no marketplace; owner's MCP servers listed in Settings.

**Acceptance criteria:**
- Tool contract test: every registered tool has all required fields.
- Risk-level test: `high`-risk tool (e.g. terminal) requires approval first time; `low`-risk (e.g. memory_recall) does not.
- Timeout test: a tool that takes >30s is aborted; AuditEvent row marks `status=timeout`.
- Cancellation test: cancel mid-tool-execution → tool stops; no partial side effects (verified by transactional tool design — `execute()` rolls back on abort).
- MCP test: start a local MCP server exposing one tool → MiMo discovers it → owner approves → tool invoked from chat via `@tool_name`.

**Tests:**
- Contract test for Tool contract (every tool passes the schema).
- Contract test for MCPClient: discover → register → invoke.

**Migration requirements:**
- Existing 3 tools refactored to new contract; callers (ResearchAgent) updated to pass `AbortSignal` + handle `timeout` / `cancelled` results.

**Rollback strategy:**
- New tool contract is additive (old shape is a subset). Rollback = accept old-shape tools (no `riskLevel` = `low`; no `timeout` = 30s default).

---

## Phase 11 — Sandbox

**Layer:** L7 (Sandbox).

**Goal:** Artifact runtime — runnable code artifacts in isolated sandboxes (Pyodide for Python, CSP iframe for web).

**Prerequisites:** Phase 10 (tools, including file_read/file_write/terminal stubs which now become sandbox-backed).

**Deliverables:**
1. `core/runtime/Sandbox.ts` — dispatcher: given an artifact type, route to the correct sandbox.
2. Pyodide integration (D11) for Python artifacts: load Pyodide (CDN), execute code, return stdout/stderr.
3. CSP-locked iframe for React/HTML artifacts (D11): strict CSP (no `unsafe-inline`, no remote scripts except whitelisted CDNs).
4. Network egress blocked by default; per-artifact opt-in (Bible Part 22.7).
5. Filesystem isolation: sandboxed code cannot access `db/custom.db`, `.env`, or anything outside the artifact's working directory.
6. Tool implementations (`file_read`, `file_write`, `terminal`) routed through Sandbox for code-mode agents.
7. Real runtime visible in ArtifactViewer (Bible Part 11.4) — not a static preview.

**Acceptance criteria:**
- Python artifact test: `print("hello")` runs in Pyodide → output appears in ArtifactViewer.
- React artifact test: `<button onClick=...>` runs in CSP iframe → click works; iframe cannot access `parent.document` (verified by attempting `parent.document.cookie` → returns undefined / blocked).
- Network test: sandboxed `fetch('https://example.com')` blocked unless artifact has `network: true` permission.
- Filesystem test: sandboxed code attempting `fs.readFile('../../.env')` → blocked.
- Code-mode agent test: Builder agent runs `file_write` in sandbox → file written to artifact working dir, not MiMo root.

**Tests:**
- Sandbox contract test: given code + type, returns expected stdout/stderr shape.
- CSP test: iframe's CSP header enforces (verified via DevTools Network tab).

**Migration requirements:**
- No CURRENT sandbox; this is new. The 3 built-in tools (`file_read/write/terminal`) move from stubs (Phase 10) to sandbox-backed (Phase 11).

**Rollback strategy:**
- Sandbox is per-artifact-type. Rollback per type = disable that sandbox (e.g. disable Pyodide → Python artifacts show "Python runtime disabled" message; no crash).

---

## Phase 12 — Artifacts

**Layer:** L2 (ArtifactStore).

**Goal:** First-class tab-able artifacts with storage, versioning, provenance, sharing, rollback. (Bible Part 11.)

**Prerequisites:** Phase 11 (Sandbox for runnable artifacts) + Phase 3 (AuditEvent for provenance).

**Deliverables:**
1. `core/artifacts/ArtifactStore.ts` full impl (stub from Phase 2 replaced).
2. Artifact types per Bible Part 11.2 (code, markdown, image, diagram, research, plan, architecture, presentation, database-schema, wireframe, flowchart, spreadsheet).
3. Versioning (Bible Part 11.4): hover thumbnails of prior versions (Lovable Edit History pattern).
4. Provenance (Bible Part 11.6): every artifact shows conversation turn, agent, prompt, model, timestamp.
5. ArtifactViewer runtime per type (Phase 11 sandboxes for code; rendered for markdown/image/etc.).
6. Per-hunk accept/reject for code artifacts (Bible Part 11.4 + 11.9 + DD-07): staged diffs with per-hunk accept/reject.
7. Shareable URLs (Bible Part 11.7): `/artifact/<uuid>` read-only snapshot.
8. Rollback (Bible Part 11.9): revert to pre-artifact state (Aider auto-commit pattern).
9. ArtifactDock UI (existing — refactor to consume real ArtifactStore).
10. Artifact tab integration in WorkspaceTabs.
11. Data export (Bible Part 22.10): one-click export all artifacts to JSON + Markdown.

**Acceptance criteria:**
- Versioning test: edit an artifact 5 times → hover thumbnail shows 5 versions → click version 3 → loads.
- Provenance test: artifact produced by Researcher agent in conversation X → provenance shows agent + conversation + prompt + model + timestamp.
- Per-hunk test: agent edits code → diff shown with 3 hunks → accept hunk 1 + 3, reject hunk 2 → file has hunks 1 + 3 only.
- Share URL test: generate share URL → open in incognito → artifact loads read-only.
- Rollback test: rollback artifact to pre-edit state → file matches pre-edit version.

**Tests:**
- Contract test for ArtifactStore: create → version → rollback → export.
- Per-hunk contract test: diff → accept/reject per hunk → final state matches.

**Migration requirements:**
- No CURRENT artifact store; this is new.

**Rollback strategy:**
- Artifacts are additive. Rollback = disable artifact generation (chat returns text only); existing artifacts stay (read-only).

---

## Phase 13 — Search

**Layer:** L1 (FTS5), L2 (search service).

**Goal:** FTS5-backed universal search with ranking + filters. (Bible Part 14, Part 26.3, D23.)

**Prerequisites:** Phase 1 (Prisma) + Phase 6 (Memory) + Phase 7 (Knowledge) + Phase 12 (Artifacts — for searchable content).

**Deliverables:**
1. FTS5 virtual tables: `memories_fts`, `conversations_fts`, `messages_fts`, `entities_fts`, `artifacts_fts`. (D23.)
2. Sync mechanism: Prisma middleware or explicit write-through in each engine keeps FTS5 tables in sync.
3. `core/search/SearchService.ts` — unified search across all FTS5 tables, returns ranked results.
4. Ranking via FTS5 `bm25()`.
5. Filters: by type (memory/conversation/message/entity/artifact), by project, by date range, by confidence threshold.
6. UniversalSearch UI (existing — refactor to consume real SearchService).
7. Prefix grammar (D18): `>` commands, `/` slash blocks, `@` mentions, `#` files, `!` Quick AI.
8. Single command palette unification (D18): merge `components/nova/CommandPalette` + `components/mimo/UniversalSearch` into one component with prefix parser.

**Acceptance criteria:**
- Scale test: 10k memories + 1k conversations + 1k entities seeded → search "arduino" returns in <50ms.
- Ranking test: search "arduino project" → results ordered by bm25 relevance.
- Sync test: write a memory → search returns it within the same transaction.
- Prefix test: `⌘K` → `>cmd` returns commands; `/search` returns search; `@mem` returns mentions; `#file` returns files; `!ai` returns Quick AI.
- Single palette test: only ONE palette component rendered (no duplicate palettes).

**Tests:**
- Contract test for SearchService: query → ranked results shape.
- FTS5 availability test: `PRAGMA compile_options;` includes FTS5 (Dependencies §7.6).

**Migration requirements:**
- UniversalSearch + CommandPalette existing UI merged; old components removed after new one verified (D14 — keep old until new verified).

**Rollback strategy:**
- FTS5 tables can be dropped; SearchService falls back to `LIKE`-based search (slower, no ranking). Feature flag (`MIMO_SEARCH=fts5|like`).

---

## Phase 14 — Application

**Layer:** L8 (Application).

**Goal:** Workspace API aggregation, streaming APIs. The application layer is thin, defensive, and complete.

**Prerequisites:** Phases 2–13 (all underlying layers shipped).

**Deliverables:**
1. `/api/mimo/workspace` route refactored: returns a single aggregated response (conversations, memories, tasks, agents, artifacts, audit events). Cached 6s (Bible Part 26.4). Avoids N polls.
2. `/api/mimo/stream` SSE endpoint: pushes live updates (new message, memory stored, agent started, artifact produced) to the client. Replaces the 6s poll where possible.
3. Every route wrapped in `safe()` (Bible Part 25.3 — Phase 4 started; Phase 14 completes for all routes).
4. Route documentation: every route's input/output schema documented in `app/api/README.md` (new).
5. Idempotent kernel boot: `mimoKernel.boot()` safe to call multiple times (Bible Part 25.3). Verified via test.
6. `/api/mimo/export` route: one-click data export (Bible Part 22.10).
7. `/api/mimo/backup` route: trigger daily backup (Bible Part 22.12).

**Acceptance criteria:**
- Workspace API test: single GET returns all sidebar data; cached for 6s (second GET within 6s returns cached).
- SSE test: subscribe → trigger an event (send a chat) → SSE pushes the event within 100ms.
- Kernel boot test: call `boot()` 10 times in a row → no errors, no duplicate registrations.
- Export test: `/api/mimo/export` returns a ZIP with JSON + Markdown for all conversations + memories + knowledge + artifacts.

**Tests:**
- Contract test for workspace API shape.
- Idempotent boot test.

**Migration requirements:**
- Existing `/api/mimo/workspace` route extended; response shape is backward-compatible (new fields added, none removed).
- Polling clients continue to work; SSE is opt-in (client can choose).

**Rollback strategy:**
- SSE endpoint can be disabled; clients fall back to polling.
- Workspace API cache can be disabled (cache=0); always-fresh queries.

---

## Phase 15 — UI Architecture

**Layer:** L9 (Frontend).

**Goal:** Split Zustand store (D21). Real data wiring (no `INITIAL_MEMORIES` or other client-side seeds). State boundaries clear.

**Prerequisites:** Phase 14 (workspace API provides real data) + Phase 4 (contract tests ensure adapter stability).

**Deliverables:**
1. Split `lib/nova/store.ts` into `lib/stores/{ui,conversation,workspace,mode,developer}Store.ts`. (D21.)
2. Keep `lib/nova/store.ts` as a temporary façade re-exporting from the new stores during transition (Audit §16 risk #3 mitigation).
3. Migrate every component to import from the new stores.
4. Delete the façade once all consumers migrated.
5. Real data wiring: every component reads from API routes (not client-side seeds).
6. Layout persistence (Bible Part 27.3 rule 18 + DD-18): every tab, width, scroll, mode, cursor survives reload. Persisted via `localStorage` (or Prisma-backed `UserSetting` table — TBD).
7. React Error Boundaries at the route + panel level (Bible Part 27.8).
8. Selectors for memoization (Bible Part 27.11): every store exposes typed selectors.
9. Code splitting: overlays lazy-loaded (Bible Part 26.5).
10. Virtualization: message list + memory browser + knowledge entity grid (Bible Part 26.2).
11. axe-core audit (Bible Part 19.11 — D19 validation): zero violations.

**Acceptance criteria:**
- React DevTools shows 5 stores, not 1.
- Selector isolation test: subscribing to `uiStore.paletteOpen` does not re-render when `conversationStore.messages` updates.
- Layout persistence test: reload page → tabs, widths, scroll positions restored.
- Error boundary test: a panel throwing → caught by boundary → inline error card → other panels keep working.
- Code-splitting test: initial bundle <500KB (lazy-loaded overlays not in initial bundle).
- Virtualization test: 1000-message conversation → ≥50fps scroll (Bible Part 12.5 + Part 20.4).
- axe-core test: zero violations on the main shell.

**Tests:**
- Manual: Agent Browser golden-path through every panel.
- axe-core: automated audit in CI.

**Migration requirements:**
- Incremental store split: migrate one consumer at a time; keep façade alive until all migrated (D14 — no deprecations mid-redesign).
- Existing components continue to work via the façade.

**Rollback strategy:**
- Each new store is independent; rollback per store = re-route through the façade.

---

## Phase 16 — UI Implementation

**Layer:** L9 (Frontend).

**Goal:** MiMo OS shell refinement. ExecutionTrace shows real runtime events. Panels consume real data. Polish: motion, accessibility, keyboard.

**Prerequisites:** Phase 15 (UI architecture) + all underlying layers (1–14).

**Deliverables:**
1. ExecutionTrace refactor: consume real AuditEvent stream (Phase 3) — no more simulated timers (Audit §17 conflict #7).
2. AgentDock refactor: consume real agent state (Phase 9) — no more static cards.
3. ArtifactDock refactor: consume real ArtifactStore (Phase 12).
4. UniversalSearch refactor: consume real SearchService (Phase 13) — complete prefix grammar.
5. CommandPalette unified with UniversalSearch (D18, Phase 13 deliverable #8 completed here in UI).
6. Keyboard handler global: hold-Space peek, `⌘⇧Tab` Quick AI, `⌘K` palette, `⌘P` project switcher, single-key daily-5 (Bible Part 15, DD-12).
7. Motion token audit (D20): every transition uses one of the 5 tiers; remove non-conforming animations.
8. Tap target audit (D19): every interactive element ≥44×44px.
9. Reduced-motion theme (D19): `prefers-reduced-motion` respected; ARIA live regions for ExecutionTrace.
10. DeveloperPanel refactor: consume real AuditLog (Phase 3) + Context tab (Phase 5) + Agent registry (Phase 9) + Events tab.
11. Settings refactor: TrustLedger editor (Phase 9) + model picker (Phase 8) + MCP server registry (Phase 10) + keychain integration (Bible Part 22.3).
12. Toast/Snackbar system (Bible Part 28): inline for conversation; Snackbar for system confirmations only.
13. Empty states + hints (D12): no onboarding wizard; first-run = empty conversation with prompt.
14. Performance budget verification (Bible Part 20.2): ⌘K <80ms, first AI token <1s, ≥50fps on 1000+ messages.

**Acceptance criteria:**
- ExecutionTrace test: send a chat → trace shows real stages from AuditEvent stream → no simulated timers.
- AgentDock test: agent works → dock appears with real agent state → done → slides away.
- Keyboard test: hold-Space on conversation → peek; `⌘⇧Tab` on selection → Quick AI; `⌘K` → palette; `⌘P` → project switcher.
- Motion test: every transition ≤500ms; no layout-triggering animations (Chrome DevTools Performance tab).
- Tap target test: every button ≥44×44px (verified by axe-core + manual measurement).
- Performance budget test: ⌘K opens <80ms (measure); first AI token <1s on cached context; ≥50fps on 1000-message conversation scroll.
- First-run test: fresh DB → owner sends a message in <30s (D12).

**Tests:**
- Manual: Agent Browser golden-path full MiMo OS shell tour.
- axe-core: zero violations.
- Lighthouse/Chrome DevTools performance audit.

**Migration requirements:**
- This phase refactors existing components; behaviors preserved (D14).
- The reused `components/nova/*` chat stack (ChatView, Composer, MessageItem, Markdown) is preserved; the MiMo OS shell wraps them.

**Rollback strategy:**
- ExecutionTrace can fall back to simulated timers if real-event streaming regresses (feature flag `MIMO_EXECUTION_TRACE=real|simulated`).
- Each UI refactor is per-component; rollback per component.

---

## Cross-phase invariants (apply to ALL phases)

1. **No deprecations mid-redesign (D14).** The CURRENT path stays runnable until the TARGET path is verified via Agent Browser.
2. **No bypass of Core pipeline (Invariant 16).** Every phase that adds a route must route through Core.
3. **No `z-ai-web-dev-sdk` in client (Invariant 17).** Verified by lint rule from Phase 0.
4. **No `any` types (Invariant 26).** Verified by `tsc --noImplicitAny` from Phase 0.
5. **No `console.log` in production (Invariant 27).** Verified by lint from Phase 0.
6. **No silent failures (Invariant 8).** Every error inline + actionable + explainable.
7. **Every phase has a rollback strategy** (above).
8. **Every phase is independently shippable** (above).
9. **Every phase validates via Agent Browser golden-path + contract tests where applicable (D24).**

---

## Open questions / [UNKNOWN] / [VALIDATION REQUIREMENT]

| # | Question | Resolution phase |
|---|---|---|
| 1 | Does Prisma 6 + SQLCipher work cleanly together? (D2) | Phase 1 validation |
| 2 | Does `ZAIModel.stream()` actually stream real tokens? (Audit §4.2) | Phase 8 |
| 3 | Is TanStack Query actually used today? (Audit §18 unknown #3) | Phase 0 investigation |
| 4 | What's in `skills/`? (Audit §18 unknown #5) | Phase 0 investigation |
| 5 | Will FTS5 be available in Prisma's bundled SQLite? (Dependencies §7.6) | Phase 13 validation |
| 6 | Is axe-core feasible in CI without a full e2e framework? (D19) | Phase 15 |
| 7 | Is gVisor/E2B/Firecracker microVM needed for shell artifacts in v1, or v2? (D11) | Phase 11 — v2 likely |
| 8 | Will the owner accept daemon mode (scheduled background agents)? (Bible Part 26.11, Risk #15) | v2 — deferred per Bible |

---

## Migration order summary

```
Phase 0 (Foundation: dev server, strict TS, lint, cleanup)
   │
   ▼
Phase 1 (Persistence: Prisma domain schema, persistent MemoryEngine, AuditEvent)
   │
   ▼
Phase 2 (Domain: Memory/Knowledge/Context/Artifact/Task/Agent domain models)
   │
   ▼
Phase 3 (Events: persistent EventBus + audit trail + replay)
   │
   ▼
Phase 4 (APIs: route /api/image + /api/search through Core + contract tests)
   │
   ▼
   ├── Phase 5 (Context Engine)
   ├── Phase 6 (Memory Engine) → Phase 7 (Knowledge Engine)
   │
   ▼
Phase 8 (AI Runtime: model routing + real streaming + tool calling)
   │
   ▼
   ├── Phase 9 (Agent Runtime: permissions, pause/resume, checkpoints)
   │      │
   │      ▼
   │   Phase 10 (Tools) → Phase 11 (Sandbox) → Phase 12 (Artifacts)
   │
   ▼
Phase 13 (Search: FTS5 + unified search)
   │
   ▼
Phase 14 (Application: workspace API aggregation + SSE)
   │
   ▼
Phase 15 (UI Architecture: split Zustand stores)
   │
   ▼
Phase 16 (UI Implementation: MiMo OS shell refinement + ExecutionTrace real events)
```

**Estimated sequencing:** Phases 0–4 are foundation; Phases 5–8 are engine build-out; Phases 9–12 are runtime + artifacts; Phases 13–14 are aggregation; Phases 15–16 are UI. No timeline estimates — single owner, daily multi-hour sessions, ship when acceptance criteria pass.

---

**End of MiMo Implementation Roadmap.** 17 phases (0–16). Dependency-driven. Each phase independently shippable with rollback. Aligned with Bible + Audit + Decision Log + Dependencies graph.
