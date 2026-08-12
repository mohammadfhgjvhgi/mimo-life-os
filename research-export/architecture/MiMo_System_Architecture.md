# MiMo — System Architecture (MASTER Synthesis)

**Phase:** Foundation From The Ground Up — ARCH-D / Doc 5 of 5 (MASTER)
**Status:** ARCHITECTURE SPECIFICATION. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible (all 33 parts) + MiMo_Current_System_Audit + 4 companion architecture documents:
- `MiMo_Frontend_Architecture.md` (ARCH-D / Doc 1)
- `MiMo_State_Architecture.md` (ARCH-D / Doc 2)
- `MiMo_Testing_Architecture.md` (ARCH-D / Doc 3)
- `MiMo_Performance_Architecture.md` (ARCH-D / Doc 4)

**Scope:** Master technical architecture — synthesis of the entire system. **No implementation.** References companion docs rather than duplicating.
**Governing principle:** **Build for 10 years but do NOT over-engineer speculative futures.** Design stable interfaces. The frontend is a CONSUMER of domain capabilities, NOT the domain layer.

---

## 0. Executive Architecture

**[CURRENT]** MiMo is a **functional prototype with significant architectural debt** (Audit §Summary). It has:
- A real, well-structured Core intelligence pipeline (Context→Reason→Plan→Execute→Validate) — KEEP + REFACTOR.
- A Product-Bible-aligned MiMo OS shell — KEEP + REFACTOR.
- **No persistence** (everything in RAM; Prisma schema is demo boilerplate).
- **No security** (no auth, no permissions, no sandbox).
- **No tests** (linter disabled to near-nothing).
- **No virtualization, no caching, no background jobs, no SSE.**
- **Provider coupling** (2 routes bypass Core adapters).
- **Dead code** (60% of `components/nova/`).
- **Broken dev server** (HTTP 500, stale cache).
- **18 conflicts with the Product Bible.**

**[TARGET]** MiMo is a **single-user AI Operating System** — local-first, conversation-spine + canvas-per-mode, with:
- A persistent domain model (Prisma/SQLite) backing all state.
- A Core intelligence pipeline (Context→Reason→Plan→Execute→Validate→Done) exposed via typed API.
- A thin API gateway (Next.js routes) that NEVER bypasses Core.
- A frontend (MiMoOS shell) that CONSUMES Core capabilities — 5 state slices, virtualized lists, real streaming, SSE live updates, optimistic UI, layout persistence.
- Architectural safety: type check, lint, adapter contract tests, schema tests, security invariants, axe-core a11y — all mandatory pre-commit gates.
- Manual verification (Agent Browser golden paths) as the primary behavioral gate.
- Performance budgets met: cold-launch <2s, ⌘K <80ms, hold-Space <100ms, project switch <200ms, first token <1s, 1000+ messages ≥50fps.

**[MIGRATION]** Incremental, ~50 phases across the 4 companion docs. Highest-risk: Prisma domain schema (data model decision), Zustand split (component selectors), SSE infrastructure, real `ZAIModel.stream()` (untested), re-enabling strict mode (surfaces existing errors).

---

## 1. Executive Architecture (recap)

See §0. MiMo is one Next.js 16 app, one route, one shell (MiMoOS), one Core pipeline, one database (Prisma/SQLite), one event bus, one audit log. The frontend consumes Core; Core owns the domain; the database persists truth.

**One sentence:** MiMo is a single-user, local-first AI Operating System where a permanent Conversation spine + an adaptive per-mode Canvas + a Core intelligence pipeline (Context→Reason→Plan→Execute→Validate→Done) produce an AI-native workspace that feels instant, alive, and trustworthy.

---

## 2. System Boundaries

### 2.1 External boundaries [TARGET]

| Boundary | Direction | Mechanism |
|---|---|---|
| User ↔ MiMo | Bidirectional | Browser (single route `/`) |
| MiMo ↔ AI provider (ZAI) | Outbound | `z-ai-web-dev-sdk` (server-only, behind `ZAIModel` adapter) |
| MiMo ↔ Web (search) | Outbound | `z-ai-web-dev-sdk` (server-only, behind `SearchProvider` adapter) |
| MiMo ↔ filesystem | Bidirectional | Prisma (SQLite at `db/custom.db`); future: file artifact storage |
| MiMo ↔ cloud sync (v2) | Bidirectional | TBD (E2E encrypted; opt-in; off by default) |
| MiMo ↔ mobile companion (v2) | Outbound | TBD (review-and-approve only) |

### 2.2 Internal boundaries [TARGET]

| Boundary | Rule |
|---|---|
| UI ↔ API | UI calls API routes; never imports Core engines directly. Only `@/core` (public re-export) types may cross. |
| API ↔ Core | API routes are thin: build context, call Core, return result. Core engines never import from `app/` or `components/`. |
| Core ↔ SDK | `z-ai-web-dev-sdk` only imported in `core/models/ZAIModel.ts`, `core/search/SearchProvider.ts`, `core/capabilities/image.ts` (to be created). |
| Core ↔ DB | Core engines call Prisma via `lib/db.ts`. Prisma client is server-only. |
| Client state ↔ Server state | Zustand for client-only state; TanStack Query for server-state mirror. No overlap. |

**[CURRENT]** Boundary violations: `/api/image` + `/api/search` import `z-ai-web-dev-sdk` directly (Audit §4.1). [FACT]

---

## 3. Layer Model [TARGET]

```
┌──────────────────────────────────────────────┐
│  Presentation Layer (Client)                 │
│  - MiMoOS shell, panels, overlays             │
│  - Zustand (UI + Workspace + Session + Exec) │
│  - TanStack Query (cache)                    │
│  - IndexedDB (layout persistence)            │
└────────────────┬─────────────────────────────┘
                 │ HTTP / SSE / ReadableStream
┌────────────────▼─────────────────────────────┐
│  API Gateway Layer (Server, thin)            │
│  - Next.js API routes (server-only)          │
│  - Typed request/response (zod)              │
│  - Never bypasses Core                       │
└────────────────┬─────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────┐
│  Core Domain Layer (Server)                  │
│  - Kernel, Context, Reasoner, Planner,       │
│    Orchestrator, Validator, Workflow          │
│  - Memory, Knowledge, Executive, Agents,     │
│    Tools, Events                             │
│  - Public API: src/core/index.ts ONLY        │
└────────────────┬─────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────┐
│  Adapter Layer (Server)                      │
│  - ZAIModel (chat/stream)                    │
│  - SearchProvider (web search)               │
│  - ImageAdapter (image gen — to be created)  │
│  - (future) LocalModel, OpenAI, Anthropic    │
└────────────────┬─────────────────────────────┘
                 │
┌────────────────▼─────────────────────────────┐
│  Persistence Layer (Server)                  │
│  - Prisma ORM                                │
│  - SQLite (db/custom.db)                     │
│  - (future) SQLCipher encryption at rest     │
└──────────────────────────────────────────────┘
```

**[CURRENT]** Layer model is partially correct (Audit §1.2): Core is well-structured; API routes are mostly thin; but `/api/image` + `/api/search` skip the Adapter Layer (direct SDK import). [FACT]

---

## 4. Module Model [TARGET]

### 4.1 Core Modules [TARGET]

| Module | Responsibility | Status |
|---|---|---|
| `core/kernel` | Boot, feature flags | KEEP |
| `core/context` | ContextBuilder (10 layers per Part 4) | KEEP + EXTEND |
| `core/reasoner` | Intent classification + reasoning depth | KEEP + UPGRADE (model-based behind flag) |
| `core/planner` | Plan generation (façade over PlannerAgent) | KEEP |
| `core/orchestrator` | Execute Plans | KEEP |
| `core/validator` | Final gate (output validation) | KEEP + EXTEND (per-hunk accept) |
| `core/workflow` | runWorkflow orchestration | KEEP |
| `core/memory` | MemoryEngine (persistent, indexed) | REPLACE (Prisma-backed) |
| `core/knowledge` | KnowledgeEngine + graph + RAG | NEW (not implemented) |
| `core/executive` | Decision explainer | NEW (not implemented) |
| `core/agents` | AgentRegistry + AgentService | KEEP + EXTEND (permissions, persistence) |
| `core/tools` | ToolRegistry + tools | KEEP + EXTEND (FileWrite, CodeExec, sandbox) |
| `core/events` | EventBus (persisted to AuditLog) | KEEP + EXTEND |
| `core/registry` | Tool/Agent/Model/Prompt registries | KEEP |
| `core/models` | ZAIModel adapter + ModelRegistry | KEEP + EXTEND (model routing) |
| `core/search` | SearchProvider adapter | KEEP |
| `core/prompts` | PromptEngine | KEEP + EXTEND (prompt modes, MIMO.md) |
| `core/capabilities/image` | ImageAdapter | NEW (replace direct SDK in /api/image) |
| `core/sandbox` | Code execution sandbox | NEW (v1.5 or v2) |
| `core/audit` | AuditLog writer | NEW |
| `core/cache` | LRU + TTL cache layer | NEW |

### 4.2 Frontend Modules [TARGET]

See MiMo_Frontend_Architecture.md §17 (folder structure). Key modules: MiMoOS, WorkspaceKernel, LeftRail, TopBar, WorkspaceTabs, ContextSidebar, AgentDock, ArtifactDock, CanvasHost, panels/, boundaries/, overlays/.

### 4.3 Shared Modules [TARGET]

| Module | Lives in | Used by |
|---|---|---|
| `src/core/types.ts` | Core | Core + UI (types only — UI imports types, not implementations) |
| `src/core/errors.ts` | Core | Core + API + UI (error display) |
| `src/core/logger.ts` | Core | Core + API |
| `src/lib/utils.ts` | UI | UI |

---

## 5. Dependency Graph [TARGET]

```
page.tsx (Server Component)
  └─ MiMoOS (Client)
      ├─ WorkspaceKernel
      │   ├─ LeftRail, TopBar, WorkspaceTabs, CanvasHost,
      │   │   ContextSidebar, AgentDock, ArtifactDock
      │   ├─ Overlays (lazy-loaded)
      │   ├─ boundaries/RouteErrorBoundary
      │   ├─ hooks/use-event-stream, use-keyboard
      │   └─ lib/mimo/stores (ui, workspace, session, execution)
      ├─ TanStack QueryClientProvider
      │   └─ lib/mimo/query-client
      └─ lib/mimo/api (typed client)

API routes (Server)
  ├─ /api/chat → core.runWorkflow
  ├─ /api/events → core.events.EventBus (SSE)
  ├─ /api/conversations → core.ConversationService
  ├─ /api/memory → core.memory.MemoryEngine
  ├─ /api/knowledge → core.knowledge.KnowledgeEngine
  ├─ /api/artifacts → core.ArtifactService
  ├─ /api/image → core.capabilities.image.ImageAdapter
  ├─ /api/search → core.search.SearchProvider
  ├─ /api/agent/:id/:action → core.agents.AgentService
  └─ /api/mimo/workspace → core (aggregated snapshot)

Core (Server)
  ├─ kernel → registry → (agents, tools, models, prompts)
  ├─ workflow → reasoner, orchestrator, validator, context
  ├─ context → memory, knowledge, search
  ├─ orchestrator → registry (agents)
  ├─ agents → registry (tools)
  ├─ models/ZAIModel → z-ai-web-dev-sdk (server-only)
  ├─ search/SearchProvider → z-ai-web-dev-sdk (server-only)
  ├─ capabilities/image → z-ai-web-dev-sdk (server-only)
  ├─ events/EventBus → audit/AuditLog (DB)
  ├─ cache (LRU + TTL)
  └─ All → lib/db.ts (Prisma)

Database
  └─ Prisma → SQLite (db/custom.db)
```

**[CURRENT]** Graph is mostly right (Audit §2); violations are `/api/image` + `/api/search` bypassing Core adapters, and `lib/nova/constants.ts` `INITIAL_MEMORIES` duplicating Core seeds. [FACT]

---

## 6. Domain Model [TARGET]

**Reference:** `MiMo_Domain_Model.md` (exists — written in prior arch batch). Summary here:

Core domain entities (per Product Bible Part 2):
- **Workspace** (the OS itself — singleton, not a row)
- **Project** (the ONLY container — Part 2.5, Part 29 invariant #1)
- **Conversation** (the ONLY AI surface — Part 2.6, Part 29 invariant, DD-03)
- **Message** (with role, content, mode, attachments, artifacts, citations)
- **Task** (per Part 2.7)
- **Artifact** (first-class tab-able — Part 2.8, Part 11)
- **Agent** (per Part 2.9, Part 8)
- **Memory** (per Part 2.10, Part 5)
- **KnowledgeEntity** + **KnowledgeRelation** (per Part 2.11, Part 6)
- **Context** (per Part 2.12, Part 4 — 10 layers)
- **Fork** (the ONLY branch primitive — DD-02)
- **ExecutionTrace** (per Part 10)
- **AuditLog** (per Part 21, Part 22.9)
- **TrustPolicy** (per Part 8.6, Part 8.7)

**One model per dimension** (Part 29 invariant #1, #35). No competing containers, branches, AI surfaces, sidebars, palettes, elevation systems, motion tiers, keyboard grammars, or explainability layers.

---

## 7. Data Model [TARGET]

**Reference:** `MiMo_Data_Architecture.md` (exists — written in prior arch batch). Summary here + in MiMo_State_Architecture.md §2.1:

Prisma domain schema (replaces boilerplate `User`+`Post`):
- `Project`, `Conversation`, `Message`, `Memory`, `KnowledgeEntity`, `KnowledgeRelation`, `Artifact`, `ArtifactVersion`, `Task`, `Agent`, `ExecutionTrace`, `AuditLog`, `TrustPolicy`.

FTS5 indexes on: `Memory.content`, `KnowledgeEntity.name` + `aliases`, `Conversation.title`.

FK indexes on every `*Id` field.

**[CURRENT]** Prisma schema is demo boilerplate (`User` + `Post` only). [FACT — Audit §3.1] **[MIGRATION]** Replace with full domain schema (State Architecture S1, S2).

---

## 8. Event Model [TARGET]

**Reference:** `MiMo_Event_Architecture.md` (exists — written in prior arch batch). Summary:

EventBus (in-memory pub/sub) emits typed events. Every emit also writes to AuditLog (DB) with `{ traceId, eventType, actor, payload, createdAt }`.

Event categories:
- `pipeline.*` (stage transitions)
- `agent.*` (state changes)
- `task.*` (task lifecycle)
- `memory.*` (create/update/decay)
- `knowledge.*` (entity/relation changes)
- `artifact.*` (versioning)
- `conversation.*` (message append)

Clients subscribe via `GET /api/events` (SSE). Each event carries `traceId`.

**[CURRENT]** EventBus is in-memory pub/sub; events NOT persisted. [FACT — Audit §3.2, §9.5] **[MIGRATION]** Persist to AuditLog (State Architecture S4).

---

## 9. API Model [TARGET]

**Reference:** `MiMo_API_Architecture.md` (exists — written in prior arch batch). Summary in MiMo_Frontend_Architecture.md §6.

Routes (all server-only, all thin, all route through Core):
- `POST /api/chat` (streaming)
- `GET /api/events` (SSE)
- `GET /api/conversations`, `GET /api/conversations/:id`
- `GET /api/memory?q=`, `GET /api/knowledge?q=`
- `GET /api/artifacts/:id`, `POST /api/artifact/:id/accept`
- `POST /api/image`, `POST /api/search`
- `POST /api/agent/:id/:action`
- `GET /api/mimo/workspace`

Every route returns typed response (zod-validated). Errors return `{ error: { code, message, retryable, traceId } }`.

**[CURRENT]** 5 routes; 2 bypass Core (`/api/image`, `/api/search`). [FACT — Audit §6.1] **[MIGRATION]** Wrap behind Core adapters (Frontend F6).

---

## 10. Context Model [TARGET]

Per Product Bible Part 4 — 10 context layers:
1. System prompt
2. MIMO.md (project-scoped AGENTS.md — Part 7.6)
3. User profile (user model)
4. Active project scope
5. Active conversation (with compression — Part 4.5)
6. Active mode (canvas mode)
7. Relevant memories (recalled)
8. Relevant knowledge (retrieved)
9. Active artifacts (in scope)
10. Current input + attachments

ContextBuilder assembles these per pipeline run. Context is **transparent** (Part 4.6, Part 21.3) — visible in ExecutionTrace Context stage + DeveloperPanel.

**[CURRENT]** ContextBuilder exists but assembly of all 10 layers: [UNKNOWN — needs verification]. [INFERENCE — likely partial] Compression: NOT implemented. [FACT — Audit §4.4 implied]

---

## 11. Memory Model [TARGET]

Per Part 5:
- Types: fact, preference, event, relationship, skill, etc.
- Explicit vs implicit (Part 5.2).
- Scopes: workspace / project / conversation (Part 5.3).
- Every memory shows: source + timestamp + type + confidence + delete (Part 5.4, Part 29 invariant #4).
- Auto-extraction + consolidation + evolution (Part 5.5).
- Confidence decay (Part 5.6).
- Block-level addressing (Part 5.7).
- Local-first + E2E (Part 5.10, Part 29 invariant #34).
- False-memory prevention (Part 5.11).
- User controls (Part 5.12).

MemoryEngine: Prisma-backed, FTS5-indexed, confidence-decayed, source-tracked.

**[CURRENT]** MemoryEngine is in-memory `Map<string,StoredEntry>`. No persistence, no FTS5, no decay, no source-tracking enforced. [FACT — Audit §3.2, §3.3, §17 conflict #1]

---

## 12. Knowledge Model [TARGET]

Per Part 6:
- Memory ≠ Knowledge (Part 6.1).
- Sources: derived from memory + user-curated + RAG (Part 6.2).
- Entity model: name, type, aliases, policy, evidence (Part 6.3).
- Typed, evidence-backed relationships (Part 6.4).
- Knowledge graph (Part 6.5).
- Policies: fact / inference / opinion (Part 6.6).
- Consolidation engine (Part 6.7).
- Evolution engine (Part 6.8).
- Retrieval: RAG vs GraphRAG vs hybrid (Part 6.9, 6.10).
- Citations + source tracing (Part 6.11, Part 29 invariant — per-claim).
- User model (Part 6.12).
- Knowledge browser (Part 6.13).
- Linked + unlinked references (Part 6.14).

KnowledgeEngine: Prisma-backed, graph-indexed, FTS5-searched, policy-tagged.

**[CURRENT]** Not implemented. [FACT — Audit §3.5] `MemoryRelation` type exists but no graph engine.

---

## 13. AI Model [TARGET]

Per Part 7:
- Model routing: cheap/fast/deep/vision/local (Part 7.1).
- Prompt strategy (Part 7.2).
- Prompt modes (Part 7.3).
- Toggleable reasoning per-prompt (Part 7.4).
- Output styles (Part 7.5 — Claude Code pattern).
- MIMO.md (Part 7.6 — AGENTS.md convergence).
- Context builder (Part 7.7).
- Tool selection (Part 7.8).
- Planning (Part 7.9).
- Reasoning depth (Part 7.10).
- Verification (Part 7.11).
- Retry + recovery (Part 7.12).
- Agent selection (Part 7.13).
- Model evolution (Part 7.14).

ZAIModel adapter wraps `z-ai-web-dev-sdk`. ModelRegistry supports multiple providers (future: OpenAI, Anthropic, local Ollama). Model routing: per-task-type (cheap for trivial, deep for reasoning, vision for images, local for offline).

**[CURRENT]** Only ZAI provider. No model routing. Rule-based Reasoner (not model-based). [FACT — Audit §4.1, §4.4]

---

## 14. Agent Model [TARGET]

Per Part 8:
- Agent types (Part 8.1).
- Lifecycle (Part 8.2).
- Creation + spawning (Part 8.3).
- Delegation (Part 8.4).
- Communication (Part 8.5).
- Permissions: read-only / workspace-write / danger (Part 8.6).
- Per-task-type trust (Part 8.7, Part 29 invariant #22).
- Single vs multi-agent (Part 8.8 — sequential default).
- Runtime (Part 8.9).
- Cancellation + retry + failure + recovery (Part 8.10).
- Observability (Part 8.11).
- Real-time partnership (Part 8.12).

AgentRegistry: in-memory (rebuilt at boot). AgentService: persists snapshots to DB, emits live state via EventBus.

**[CURRENT]** 4 agents (Planner, Research, Memory, Writer). No permissions. No per-task-type trust. No persistence. [FACT — Audit §4.3, §9.2, §17 conflict #5, #6]

---

## 15. Tool Model [TARGET]

Per Part 25 (Plugin/API/Tool):
- Tool model (Part 25 — tool registry, calling protocol, versioning).
- 3 tools today: WebSearch, MemoryRecall, MemoryStore.
- Future: FileRead, FileWrite, CodeExec, BrowserControl.
- Permissions per tool (Part 8.6).
- Sandbox for CodeExec (Part 22 — sandbox TBD).

ToolRegistry: in-memory (rebuilt at boot). Tools called by agents via Orchestrator.

**[CURRENT]** 3 tools, no tool calling protocol (ResearchAgent manually invokes `web_search`), no permissions. [FACT — Audit §4.3, §9.2]

---

## 16. Runtime Model [TARGET]

Per Part 10 (Execution/Runtime UX):
- Feel AI thinking (Part 10.1, Part 29 invariant — DD-05).
- Inline ExecutionTrace (Part 10.2).
- Never fake (Part 10.3, Part 29 invariant #23).
- Approvable plans (Part 10.4).
- Per-step accept/reject (Part 10.5, DD-07).
- Live runtime pane (Part 10.6 — devMode only).
- No cognitive overload (Part 10.7).
- Task state machine (Part 10.8).
- Long-running task supervision (Part 10.9).

ExecutionTrace: inline in MessageItem. AgentDock: floating pipeline stepper. Both fed by SSE events from Core's EventBus.

**[CURRENT]** ExecutionTrace component exists but uses simulated timers. [FACT — Audit §17 conflict #7, PARTIAL]

---

## 17. Artifact Model [TARGET]

Per Part 11:
- Artifact definition (Part 11.1).
- Types: document, code, image, chart, diagram, table, plan, dataset (Part 11.2).
- Lifecycle: draft → staged → accepted → archived (Part 11.3).
- ArtifactViewer (Part 11.4).
- Artifact dock (Part 11.5).
- Provenance (Part 11.6, Part 29 invariant).
- Shareable URLs (Part 11.7 — v2 for external share).
- Artifact relationship (Part 11.8).
- Partial accept + rollback (Part 11.9, Part 29 invariant #20 — no 100% overwrites).

ArtifactService: Prisma-backed (Artifact + ArtifactVersion tables), per-hunk accept/reject, version chain.

**[CURRENT]** ArtifactDock + ArtifactViewer exist. No versioning, no per-hunk accept, no provenance. [FACT — Audit §17 conflict #9, PARTIAL]

---

## 18. Search Model [TARGET]

Per Part 14:
- Unified search (Part 14.1, Part 29 invariant #29 — ONE palette).
- Local-first (Part 14.2 — render from cache, <80ms first open).
- Fuzzy filter (Part 14.3).
- Prefix grammar (Part 14.4).
- Ranking + scope + filters (Part 14.5).
- Search everywhere (Part 14.6).

Conversations: client-side fuzzy (cached list). Memory + Knowledge: server-side FTS5 (indexed). Files: indexed by name. Commands: client-side registry.

**[CURRENT]** UniversalSearch exists; prefix grammar partial. [FACT — Audit §17 conflict #11, PARTIAL] No FTS5. [FACT — Audit §3.3]

---

## 19. Security Model [TARGET]

Per Part 22:
- Local-first (Part 22.1 — data never leaves without consent).
- Encryption at rest (Part 22.2 — SQLCipher; v2).
- Secrets/keys (Part 22.3 — keychain integration; v2).
- Tool/file/agent/network permissions (Part 22.4).
- Sandboxing (Part 22.5 — for CodeExec; v1.5 or v2).
- Audit logs (Part 22.6 — AuditLog table; v1).
- Export (Part 22.7).
- Deletion (Part 22.8).
- Backup (Part 22.9).
- Recovery (Part 22.10).
- No telemetry (Part 22.11, Part 29 invariant #19).

TrustPolicy table: per-task-type trust (Part 8.7, Part 9.2). No auth in v1 (single-user local-first — Audit §9.1, acceptable but documented).

**[CURRENT]** No auth, no authorization, no encryption, no sandbox, no audit log. [FACT — Audit §9]

---

## 20. Plugin Model [TARGET]

Per Part 25:
- Plugin model (Part 25.1).
- Tool model (Part 25.2).
- API model (Part 25.3).
- Routes (Part 25.4).
- Extension lifecycle (Part 25.5).
- Permissions (Part 25.6).
- Versioning (Part 25.7).
- Sandboxing (Part 25.8).
- Slash blocks (Part 25.9 — Notion pattern).
- Hooks (Part 25.10).
- Personal extension registry (Part 25.11 — no marketplace).
- Future marketplace (Part 25.12 — v2+).

**[CURRENT]** Not implemented. [FACT — Audit §6.2] Slash blocks: not implemented. [FACT — Audit §17]

---

## 21. Frontend Model [TARGET]

**Reference:** MiMo_Frontend_Architecture.md (full spec).

Single-route Next.js 16 App Router. One shell (MiMoOS). One AI surface (Conversation). One keyboard grammar. 5 state slices (UI, Workspace, Session, Execution, Cache). Virtualized lists, real streaming, SSE live updates, optimistic UI, layout persistence (IndexedDB), error boundaries, axe-core a11y.

The frontend is a CONSUMER of Core capabilities. It does NOT own memories, knowledge, conversations, artifacts, agents, or tools.

**[CURRENT]** Shell shape matches Bible (Audit §1.3). Monolithic Zustand store. Two competing shells (nova dead, mimo live). No virtualization, no caching, no streaming, no SSE, no error boundaries, no a11y verification, broken dev server.

---

## 22. State Model [TARGET]

**Reference:** MiMo_State_Architecture.md (full spec).

10 categories of state, 5 frontend slices, 1 database, 1 server cache, 1 IndexedDB, 1 event stream, 1 audit log. Every piece of state has exactly one owner. No duplicated source of truth.

| Owner | Owns |
|---|---|
| Database (Prisma/SQLite) | All persistent domain state |
| Core in-memory | Process-local concerns (registries, locks, in-flight contexts, SSE subscriptions, cache) |
| Server cache (LRU Map) | Derived read models |
| IndexedDB | Layout persistence + theme + recentProjects + devMode |
| Zustand `useUIStore` | Transient UI state |
| Zustand `useWorkspaceStore` | Tabs, activeTabId, currentProject, mode |
| Zustand `useSessionStore` | Composer input, active model, toggles |
| Zustand `useExecutionStore` | Live agent execution (derived from SSE) |
| TanStack Query cache | Server-state mirror |
| Local `useState` | Component-local ephemeral state |

**[CURRENT]** Monolithic `lib/nova/store.ts` (354 lines) + in-memory Core (not persisted) + Prisma demo boilerplate. Three competing systems, three duplications. [FACT — Audit §5.2, §8]

---

## 23. Testing Model [TARGET]

**Reference:** MiMo_Testing_Architecture.md (full spec).

Three tiers:
- **Tier 1 (MANDATORY, ~60s, pre-commit):** type check, lint (re-enabled rules), adapter contract tests, schema tests, security invariants, axe-core a11y, build.
- **Tier 2 (MANDATORY, manual, before release):** 14 golden paths via Agent Browser + performance budgets + offline + reduced motion.
- **Tier 3 (OPTIONAL, owner opts in):** unit, integration, API, agent, tool, e2e, regression.

Respects project rule (Part 27.10): manual Agent Browser is primary verification; Tier 1 is automated architectural gates (not "test code for behavior").

**[CURRENT]** Zero tests. Lint disabled. TS build errors ignored. [FACT — Audit §10]

---

## 24. Performance Model [TARGET]

**Reference:** MiMo_Performance_Architecture.md (full spec).

Budgets (Part 20.2): cold-launch <2s, ⌘K <80ms, hold-Space <100ms, project switch <200ms, first token <1s, 1000+ messages ≥50fps.

ACTUAL vs PERCEIVED: optimize perception first (skeletons, optimistic UI, streaming, motion), then reality (virtualization, caching, code splitting, indexed retrieval).

What's streamed: chat response, live events, artifact content. What's cached: workspace snapshot (6s), knowledge queries (6s), user model, conversation messages (∞ immutable), artifacts (∞ immutable per version). What's prefetched: recent projects, adjacent messages, hovered items. What's virtualized: message list, memory, knowledge, files, hunks, audit log, command results, search results. What's deferred: overlays, panels, heavy components (charts, editors, syntax highlight). What's async: memory extraction, knowledge consolidation, embeddings, markdown AST, syntax highlight, fuzzy index.

**[CURRENT]** No virtualization, no caching, no code splitting, fake streaming, O(n) memory scans, 6s polling, broken dev server. [FACT — Audit §11]

---

## 25. Deployment Model [TARGET]

**[CURRENT]** Single-user local-first. Dev server (broken — Audit §1.5). [FACT]

**[TARGET v1]:** `next build` → `next start` (standalone output). Owner runs locally. No cloud, no CI, no telemetry.

**[TARGET v2 — when owner opts in]:** Optional cloud sync (E2E encrypted, off by default). Optional mobile companion (review-and-approve only). Optional daemon mode (scheduled agent runs). No multi-tenant, no SaaS, no marketplace.

**Why no cloud in v1:** Product Bible Part 22 (Security/Privacy), Part 23 (Offline/Online), Part 29 invariant #34 (architectural trust first — local-first + E2E + no-counters + no-deprecations). Single-user local-first is the product identity (Part 1.7).

---

## 26. Migration Strategy

The migration from [CURRENT] to [TARGET] spans 4 companion docs, ~50 phases:

| Doc | Phases | Highest-risk phase |
|---|---|---|
| Frontend | F1-F18 | F7 (split Zustand), F9 (SSE), F10 (real streaming) |
| State | S1-S15 | S1 (Prisma domain schema), S7 (Zustand split), S10 (SSE) |
| Testing | T1-T16 | T7 (schema tests), T10-T12 (re-enable strict mode) |
| Performance | P1-P17 | P3 (virtualization), P6 (SSE), P7 (real streaming), P10 (Prisma indexes), P11 (background jobs) |

**Cross-cutting dependencies:**
- State S1 (Prisma schema) blocks Testing T7 (schema tests).
- State S10 (SSE) blocks Performance P6 (replace polling) + Frontend F9 (event stream).
- Frontend F10 (real streaming) depends on verifying `ZAIModel.stream()` works (Audit Unknown #2).
- Testing T10-T12 (re-enable strict) surfaces existing errors; do LAST after other refactors.

**Sequence (suggested):**
1. **Foundation restore:** Frontend F1 (restore dev server), Performance P1, P2 (measure).
2. **Cleanup:** Frontend F2 (delete dead nova), F3 (move reused), F4 (rename lib/nova → lib/mimo).
3. **Data foundation:** State S1 (Prisma schema), S2 (db:push), S3 (MemoryEngine persistent), S4 (AuditLog).
4. **State cleanup:** State S5 (server cache), S6 (QueryClient), S7 (split Zustand), S8 (IndexedDB), S9 (remove INITIAL_MEMORIES).
5. **Core routing:** Frontend F6 (route /api/image + /api/search through Core), State S12 (TrustPolicy).
6. **Live updates:** State S10 (SSE), Frontend F9 (useEventStream), Performance P6 (replace polling).
7. **Real streaming:** Frontend F10, Performance P7, State S11 (traceId propagation).
8. **Performance:** Performance P3 (virtualization), P4 (TanStack cache), P5 (Core cache), P8 (lazy loading), P9 (memoization), P10 (indexes), P11 (background jobs), P12 (prefetch).
9. **Polish:** Frontend F11 (error boundaries), F12 (layout persistence), F13 (CommandRegistry), F14 (virtualization), F15 (code splitting), F16 (TS strict + lint), F17 (axe-core), F18 (Server Component).
10. **Testing:** Testing T1-T9, T13 (golden paths), then T10-T12 (strict mode) LAST.

---

## 27. Evolution Strategy

Per Part 26 (Scalability/Evolution):

### 27.1 Single-User Scale [TARGET v1]
- 10,000+ conversations without lag.
- 10,000+ memory entries without slow search.
- 1,000+ knowledge entities without graph lag.
- 1,000+ message conversations without scroll jank.

### 27.2 Component Evolution [TARGET — per Part 26.7]

| Component | Evolution strategy |
|---|---|
| Database (Prisma + SQLite) | Migrations via `bun run db:push`. Schema versioned. Backward-compatible. |
| Memory | Auto-extraction + consolidation + evolution. Confidence decay. No manual migration. |
| Knowledge | Derived from memory. Graph evolves. Entities can be merged/archived. |
| Agents | New agents registered at kernel boot. Old agents remain compatible. |
| Models | ModelRegistry supports multiple. New models registered at runtime. Old models remain. |
| Plugins | MCP versioned. Backward-compatible. |
| APIs | Versioned. Backward-compatible. Deprecation requires 6-month notice. |
| UI | Component-based. Tokens (not raw values). Backward-compatible. |
| Schema | Versioned. Migrations automated. |
| Migrations | `bun run db:push`. Tested. Backward-compatible. |

### 27.3 Technical Debt Prevention [TARGET — per Part 26.8, Part 29]

- One model per dimension (prevents competing models).
- Vocabulary lock (no terminology churn).
- No deprecations mid-redesign (working features never removed; parallel versions live during transitions — Part 29 invariant #10).
- Token-first (no raw values in components).
- Component-based (reusable, testable).
- API boundaries (clear separation).
- Lint + type check (automated gates — Tier 1).
- Refactoring (~20 prototype iterations per feature — Claude Code pattern).

### 27.4 Future Aspirations (v2+) [TARGET — per Part 26.9-26.13]

- **GPU rendering** (v2 — Zed pattern; only if web tech hits limits).
- **Visual GUI agent** (future — CogAgent aspiration; agent operates its own UI).
- **Daemon mode** (v2 — scheduled agent runs, morning briefings, weekly reviews).
- **Mobile companion** (v2 — review-and-approve only).
- **Multi-window** (v2 — multi-monitor support; deferred because adds second model of "which window is primary").
- **Cloud sync** (v2 — E2E encrypted, opt-in, off by default).
- **Local model support** (v2 — Ollama integration for offline + privacy).
- **Marketplace** (v2+ — curated, reviewed, signed; not open flood).

**These are aspirations, not commitments.** Build for 10 years but do NOT over-engineer speculative futures. Design stable interfaces (Core public API, API gateway, state slices) that can absorb these without rewrite.

### 27.5 What Will NOT Be Built [TARGET — explicit non-goals]

- **Multi-tenant / SaaS** — MiMo is single-user local-first (Part 1.7).
- **Public marketplace** — personal extension registry only (Part 25.11).
- **Telemetry / analytics** — never (Part 29 invariant #19).
- **Credit / quota counters** — never (Part 29 invariant #9).
- **Bottom tab bars / FAB on desktop** — never (Part 18.7, Part 29 invariant).
- **3-modifier hotkeys** — never (Part 29 invariant #11).
- **Layout-triggering animations** — never (Part 29 invariant #12).
- **Mock data in production** — never (Part 27.3 rule #20, Part 29 invariant #18).
- **Silent failures** — never (Part 29 invariant #8).
- **Modal error blocks** — never (Part 29 invariant #24).
- **Bypass of Core pipeline** — never (Part 29 invariant #16).
- **z-ai-web-dev-sdk in client components** — never (Part 27.3 rule #3, Part 29 invariant #17).

---

## 28. Unknowns (cross-cutting) [UNKNOWN]

| # | Unknown | Why it matters |
|---|---|---|
| 1 | Does `ZAIModel.stream()` work? | Blocks Frontend F10 + Performance P7. |
| 2 | What's the actual cold-launch time? | Can't measure until dev server fixed (Frontend F1). |
| 3 | What's the actual bundle size? | Not measured (Performance P2). |
| 4 | Will `next-test-api-route-handler` work with Next 16? | Blocks Testing T6. |
| 5 | Will the owner accept Tier 1 mandatory tests given the project rule? | Testing §0 resolution: Tier 1 is "architectural gates," not "test code." |
| 6 | What's the exact 8-mode canvas enum? | store.ts line 40 types `contextMode` as `ChatMode` only. |
| 7 | Does `components/mimo/panels/TabContent.tsx` already serve as the PanelRegistry? | Needs reading. |
| 8 | Should `LayoutPersistence` be per-project or global? | State §23 #3. |
| 9 | Will Framer Motion + `next/dynamic` interact correctly for overlay mount/unmount? | Common pitfall. |
| 10 | Should optimistic writes survive reload via IndexedDB? | State §23 #10. |
| 11 | Is TanStack Query actually used today? | Audit §18 #3 — unverified. |
| 12 | Are the dead `components/nova/` views imported anywhere? | Audit §18 #4 — grep-verify before Frontend F2. |
| 13 | What's the right SSE reconnection strategy? | State §23 #7. |
| 14 | Should `pendingApprovals` survive frontend reload? | State §23 #8. |
| 15 | Will FTS5 be in Prisma's bundled SQLite? | Performance §11 #7. |

---

## 29. Summary

MiMo is a single-user, local-first AI Operating System. The [CURRENT] system is a functional prototype with significant architectural debt (no persistence, no security, no tests, no virtualization, no caching, provider coupling, dead code, broken dev server, 18 Product Bible conflicts). The [TARGET] system preserves the well-architected Core pipeline + Bible-aligned shell, and rebuilds the foundation: persistent domain model, 5 state slices, real streaming, SSE, virtualization, caching, error boundaries, a11y, layout persistence, architectural test gates.

**27 sub-architectures** defined here, each detailed in this doc or a companion:
1. Executive (§0, §1)
2. System boundaries (§2)
3. Layer model (§3)
4. Module model (§4)
5. Dependency graph (§5)
6. Domain model (§6 — ref MiMo_Domain_Model.md [TBD])
7. Data model (§7 — ref MiMo_Data_Architecture.md [TBD])
8. Event model (§8 — ref MiMo_Event_Architecture.md [TBD])
9. API model (§9 — ref MiMo_API_Architecture.md [TBD])
10. Context model (§10)
11. Memory model (§11)
12. Knowledge model (§12)
13. AI model (§13)
14. Agent model (§14)
15. Tool model (§15)
16. Runtime model (§16)
17. Artifact model (§17)
18. Search model (§18)
19. Security model (§19)
20. Plugin model (§20)
21. Frontend model (§21 — ref MiMo_Frontend_Architecture.md)
22. State model (§22 — ref MiMo_State_Architecture.md)
23. Testing model (§23 — ref MiMo_Testing_Architecture.md)
24. Performance model (§24 — ref MiMo_Performance_Architecture.md)
25. Deployment model (§25)
26. Migration strategy (§26)
27. Evolution strategy (§27)

**Companion docs referenced (exist — written in prior arch batches A/B/C):**
- `MiMo_Domain_Model.md`
- `MiMo_Data_Architecture.md`
- `MiMo_Event_Architecture.md`
- `MiMo_API_Architecture.md`
- `MiMo_Context_Architecture.md`
- `MiMo_Memory_Architecture.md`
- `MiMo_Knowledge_Architecture.md`
- `MiMo_AI_Architecture.md`
- `MiMo_Agent_Architecture.md`
- `MiMo_Tool_Architecture.md`
- `MiMo_Runtime_Architecture.md`
- `MiMo_Artifact_Architecture.md`
- `MiMo_Search_Architecture.md`
- `MiMo_Security_Architecture.md`
- `MiMo_Plugin_Architecture.md`
- `MiMo_Observability_Architecture.md`
- `MiMo_Offline_Online_Architecture.md`
- `MiMo_Architecture_Decision_Log.md`
- `MiMo_Architecture_Dependencies.md`
- `MiMo_Implementation_Roadmap.md`
- `MiMo_System_Constitution.md`

**Companion docs written in ARCH-D (this batch):**
- `MiMo_Frontend_Architecture.md`
- `MiMo_State_Architecture.md`
- `MiMo_Testing_Architecture.md`
- `MiMo_Performance_Architecture.md`
- `MiMo_System_Architecture.md` (this doc — synthesis)

**The frontend is a CONSUMER of domain capabilities — it is NOT the domain layer.** Every memory, knowledge entity, conversation, artifact, agent, tool, and plan lives in Core. The frontend renders state produced by Core; it does not own it.

**No magic.** Every claim labeled [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN]. Where the path is unclear, marked [UNKNOWN] explicitly. No invented complexity — for every choice: what problem? Is it real today? Simpler solution? Operational burden? Add later? New source of truth? More failure modes?

**Build for 10 years but do NOT over-engineer speculative futures.** Design stable interfaces (Core public API, API gateway, 5 state slices, EventBus, AuditLog). The v2 aspirations (cloud sync, mobile companion, daemon mode, GPU rendering, marketplace) are acknowledged but NOT built in v1.

---

**End of MiMo_System_Architecture.md (MASTER).**
