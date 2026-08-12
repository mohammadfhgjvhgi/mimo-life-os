# MiMo — State Architecture

**Phase:** Foundation From The Ground Up — ARCH-D / Doc 2 of 5
**Status:** ARCHITECTURE SPECIFICATION. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible (Parts 4, 5, 6, 8, 10, 12, 13, 21, 27) + MiMo_Current_System_Audit (§5.2, §8).
**Scope:** State ownership only — what state exists, who owns it, where it lives, who reads/writes it. **No implementation.** For frontend state SLICES (UI / Workspace / Conversation / Session / Execution / Cache), see MiMo_Frontend_Architecture.md §14.
**Governing principle:** **No duplicated source of truth.** Every piece of state has exactly one owner. All other readers subscribe or derive.

---

## 0. Executive Summary

State in MiMo is partitioned by **lifetime** (how long it lives) and **authority** (who is the source of truth). Three competing state systems exist today:

| System | Today | Should be |
|---|---|---|
| Database (Prisma/SQLite) | Demo `User`+`Post` boilerplate — NOT MiMo domain models | The source of truth for all persistent domain state (Project, Conversation, Message, Memory, Knowledge, Artifact, Task, Agent, Execution, AuditLog) |
| Server in-memory (Core) | `MemoryEngine` (`Map<string,StoredEntry>`), `EventBus` (`Map<string,Set<Handler>>`), registries (`Map`s) — **NOT persisted** | Process-local caches + read models; **never the source of truth** for persistent data — only for ephemeral session state, locks, and live event subscriptions |
| Client in-memory (Zustand) | ONE monolithic `lib/nova/store.ts` (354 lines) mixing theme, view, sidebar, conversations, input, loading, mode, model, deepThink, webSearch, palette, settings, voice, imgGen, tasks, mems, toasts, devMode, rightOpen, tabs, activeTabId, currentProject, contextMode | 5 slices: UI, Workspace, Session, Execution, plus TanStack Query cache for server state. Local component `useState` for ephemeral UI. IndexedDB for layout persistence. |

**[CURRENT]** All three systems coexist with overlapping ownership (Audit §8, §16 #6, #16). **[TARGET]** Each piece of state has exactly one owner; all others subscribe or derive.

**Three critical duplications in [CURRENT]:**
1. **Initial memories** — `lib/nova/constants.ts` defines `INITIAL_MEMORIES` (UI-side) AND `/api/mimo/workspace` seeds memories from Core. Two sources. [FACT — Audit §2 issue #3, §16 #16]
2. **Tab/workspace state** — `lib/nova/store.ts` holds `tabs`, `activeTabId`, `currentProject` (UI-side) AND these should be persisted as LayoutPersistence (no persistence today — Audit §11).
3. **Conversations** — `lib/nova/store.ts` holds `convs`, `activeId` (UI-side) AND `/api/chat` round-trips conversations through Core's `WorkflowEngine` (which doesn't persist them — they're held in the Zustand store and lost on hard refresh). [FACT — Audit §3.2]

---

## 1. State Categories (canonical)

Eight categories of state exist in MiMo. Each has one owner.

| # | Category | Lifetime | Authority | Owner | Examples |
|---|---|---|---|---|---|
| 1 | **Server state (persistent)** | Permanent | Source of truth | Database (Prisma/SQLite) | Project, Conversation, Message, Memory, KnowledgeEntity, KnowledgeRelation, Artifact, ArtifactVersion, Task, Agent, ExecutionTrace, AuditLog |
| 2 | **Server state (ephemeral / runtime)** | Process lifetime | Source of truth (for that process) | Core in-memory ( registries, locks, sessions ) | AgentRegistry contents, ModelRegistry contents, ToolRegistry contents, EventBus subscriptions, active agent sessions, in-flight workflow contexts, locks |
| 3 | **Server cache** | TTL (e.g. 6s) | Derived | Core cache layer (TBD — see §6) | Workspace snapshot, knowledge query results, user model |
| 4 | **Client state (workspace-persistent)** | Permanent (per device) | Source of truth (per device) | IndexedDB | LayoutPersistence (tabs, widths, scroll, mode, cursor), theme, recently used projects |
| 5 | **Client state (session)** | Session | Source of truth (session) | Zustand `useSessionStore` | active model, deepThink, webSearch, contextMode, composer input (draft) |
| 6 | **Client state (UI ephemeral)** | Transient | Source of truth (transient) | Zustand `useUIStore` + local `useState` | overlay open/close, palette query, hover states, drag-in-progress, focus state |
| 7 | **Client cache (server-state mirror)** | TTL | Derived | TanStack Query cache | conversations list, conversation messages, memory search results, knowledge search results, artifact content, workspace snapshot |
| 8 | **Execution state (live)** | Live (during agent work) | Derived from SSE | Zustand `useExecutionStore` | pipeline stage, agent state, task progress, streaming message |

**Plus:**
| 9 | **Agent state** | Sub-type of #2 + #8 | Source of truth (per agent) | Core's AgentService (persistent snapshot) + EventBus (live updates) | agent status, plan, current step, trust level, sandbox mode, approval policy |
| 10 | **Cache state** | Cross-cutting (sub-type of #3 + #7) | Derived | Server cache layer + TanStack Query | invalidated/revalidating flags, TTL timestamps, optimistic pending writes |

**Total: 10 categories. No category owns another's data. No duplicated truth.**

---

## 2. State Owners — Where Each Piece of State Lives

### 2.1 Database (Server, Persistent) [TARGET]

Source of truth for all persistent domain state. Prisma + SQLite (Part 22.2: target SQLCipher encryption at rest — v2). Schema (to be defined in MiMo_Data_Architecture.md):

```
Project          { id, name, accent, mimoMd, createdAt, updatedAt, archivedAt? }
Conversation     { id, projectId, title, createdAt, updatedAt, forkedFromId? }
Message          { id, conversationId, parentId?, role, content, mode, attachments, artifacts, citations, createdAt }
Memory           { id, projectId?, scope, type, content, source, confidence, createdAt, updatedAt, decayedAt? }
KnowledgeEntity  { id, projectId?, name, type, aliases, policy, evidence[], createdAt }
KnowledgeRelation{ id, fromId, toId, type, evidence, confidence, createdAt }
Artifact         { id, projectId?, type, title, status, createdAt, updatedAt }
ArtifactVersion  { id, artifactId, version, content, diff, parentVersionId?, createdAt }
Task             { id, projectId?, conversationId?, title, status, assigneeAgentId?, createdAt, updatedAt }
Agent            { id, type, name, status, trustLevel, sandboxMode, createdAt }
ExecutionTrace   { id, taskId?, agentId?, conversationId?, stages[], startedAt, completedAt? }
AuditLog         { id, traceId, eventType, actor, payload, createdAt }
```

**[CURRENT]** Prisma schema has only `User` + `Post` (boilerplate demo). [FACT — Audit §3.1] No domain models. **[MIGRATION]** Replace schema with full MiMo domain schema. `bun run db:push --accept-data-loss` is acceptable (demo data is boilerplate — Audit migration risk #1).

### 2.2 Core In-Memory (Server, Runtime) [TARGET]

Process-local. NOT the source of truth for persistent data — only for:
- **Registries** (AgentRegistry, ModelRegistry, ToolRegistry, PromptRegistry): contents are static-ish; rebuilt on kernel boot from code (`registry.register(...)` calls). The list of available agents/tools/models lives in code, not DB. Per-instance state (e.g. an agent's current task) lives in DB (ExecutionTrace) + EventBus (live).
- **EventBus** (in-memory `Map<string,Set<Handler>>`): ephemeral pub/sub for live events. Persists events to AuditLog (DB) on emit. Subscriptions are ephemeral.
- **In-flight workflow contexts**: during a `runWorkflow()` call, the context object (assembled by ContextBuilder) is in-memory. Persisted snapshots (ExecutionTrace, generated memories, generated artifacts) are written to DB at stage boundaries.
- **Locks**: per-conversation write locks (prevents two concurrent sends to same conversation). Ephemeral.
- **SSE subscriptions**: client connections subscribed to EventBus. Ephemeral.

**Rules:**
1. Anything in Core in-memory that the user expects to survive a restart MUST also be written to DB.
2. Core in-memory is a **write-through cache**, not a primary store.
3. Registries are seeded at kernel boot from code; they do NOT need DB persistence (code is the source).

**[CURRENT]** `MemoryEngine` is `Map<string,StoredEntry>` in RAM — NOT persisted. All memories lost on restart. [FACT — Audit §3.2, §16 #8] **[MIGRATION]** Replace with Prisma-backed MemoryEngine preserving the same interface. Old in-memory memories are seeded (not user-created), so loss is acceptable (Audit migration risk #2).

### 2.3 Server Cache Layer [TARGET]

Derived read models for performance (Part 26.4, Part 20.11):
- **Workspace snapshot cache** (6s TTL) — `/api/mimo/workspace` returns cached snapshot; invalidated on event stream events (`memory.created`, `knowledge.entity_added`, etc.).
- **Knowledge query cache** (6s TTL per query) — `KnowledgeEngine.query(q)` returns cached; invalidated on `knowledge.entity_added` / `knowledge.relation_added`.
- **UserModel cache** — invalidated on graph change.
- **Embedding cache** — per-query (TBD by RAG strategy — see MiMo_Knowledge_Architecture [TBD]).

Implementation: in-memory `Map<key, { value, expiresAt }>` in Core, OR Redis (v2 — overkill for single-user local-first v1). v1: in-process LRU Map.

**[CURRENT]** No cache layer. `/api/mimo/workspace` re-queries every poll. [FACT — Audit §3.7, §11.6]

### 2.4 Client Workspace-Persistent State [TARGET]

Lives in IndexedDB (via `idb-keyval` — single dependency, ~1KB). Owned by the client. Source of truth per-device.

- **LayoutPersistence** — tabs, widths, scroll positions, mode, cursor. (Part 13.7, Part 27.3 rule #18, Part 29 invariant)
- **theme** — light/dark/system.
- **recentlyUsedProjects** — last 5 project IDs.
- **devMode** — boolean.
- **keyboardHintDismissed** — boolean (one-time onboarding hint).

**Why IndexedDB not Zustand-persist?** IndexedDB survives browser restarts; localStorage is too small for scroll positions + per-message cursor data. Zustand `persist` middleware wraps IndexedDB via `idb-keyval` storage adapter.

**[CURRENT]** No layout persistence. Hard refresh loses everything. [FACT — Audit §11]

### 2.5 Client Session State [TARGET]

Zustand `useSessionStore`. Per-session (browser tab). Lost on tab close.

- `activeModel: ModelId` — currently selected model.
- `deepThink: boolean` — toggleable reasoning per-prompt (Part 7.4).
- `webSearch: boolean` — web search enabled for next send.
- `contextMode: Mode` — current canvas mode (chat / research / code / write / build / learn / plan / analyze).
- `composerInput: string` — draft input (per active conversation; cleared on send).
- `composerAttachments: Attachment[]` — draft attachments.

**Why session not persistent?** These are ephemeral "what am I about to do" choices. Persisting them across reloads would surprise the user (stale deepThink toggle).

**[CURRENT]** All of these are in the monolithic `lib/nova/store.ts`. [FACT — Audit §5.2]

### 2.6 Client UI Ephemeral State [TARGET]

Zustand `useUIStore` + local `useState`. Transient (sub-second to seconds).

**In `useUIStore`:**
- `theme: ThemeMode`
- `rightOpen: boolean`
- `rightWidth: number`
- `railCollapsed: boolean`
- `devMode: boolean`
- `overlay: { palette: boolean, universalSearch: boolean, quickAI: boolean, projectSwitcher: boolean, settings: boolean, voice: boolean, imageGen: boolean, developerPanel: boolean }`
- `paletteQuery: string`
- `commandRegistryVersion: number` (bumped when commands change)

**In local `useState` (component-local):**
- Hover states
- Drag-in-progress
- Focus state (for components that need to coordinate focus internally)
- Transient input value (e.g., a search input before debouncing to the store)

**Rule:** if a state is only read by one component, it stays in that component's `useState`. Only cross-component state goes to `useUIStore`.

**[CURRENT]** All of these are in the monolithic store. [FACT — Audit §5.2]

### 2.7 Client Cache (Server-State Mirror) [TARGET]

TanStack Query cache. Derived from server. NOT a source of truth.

Query keys:
- `['workspace']` — workspace snapshot (6s refetch).
- `['conversations']` — conversation list (staleTime 60s).
- `['conversation', id]` — single conversation with messages (staleTime ∞ — immutable append-only).
- `['conversation', id, 'messages']` — alternative decomposition if conversation metadata is separate from messages.
- `['memory', query]` — memory search results (staleTime 6s).
- `['knowledge', query]` — knowledge search results (staleTime 6s).
- `['artifact', id]` — artifact metadata + content (staleTime ∞ — immutable per version; new version = new key).
- `['artifact', id, 'versions']` — version history.
- `['agent', id]` — agent state (for AgentDock; superseded by SSE for live updates).

**Invalidation:** on SSE event:
- `memory.created` → invalidate `['workspace']`, `['memory', query]` (all queries).
- `knowledge.entity_added` → invalidate `['workspace']`, `['knowledge', query]`.
- `conversation.message_appended` → invalidate `['conversation', id]` (or append to cache directly).
- `artifact.versioned` → invalidate `['artifact', id, 'versions']` (NOT `['artifact', id]` — old version is still valid).

**[CURRENT]** TanStack Query installed but no `QueryClient` provider found. [INFERENCE — Audit §18 #3, unverified]

### 2.8 Execution State (Live) [TARGET]

Zustand `useExecutionStore`. Derived from SSE event stream. Lives only during active agent work.

- `activeExecutions: Map<executionId, { agentId, taskId, conversationId, stages: Stage[], currentStage, startedAt }>`
- `streamingMessages: Map<messageId, { content, partial, trace }>`
- `taskProgress: Map<taskId, { progress, eta }>`
- `pendingApprovals: Approval[]` (from `agent.state` events with `state: 'awaiting_approval'`)

**[CURRENT]** `loading` boolean in monolithic store. ExecutionTrace component uses simulated timers, not real events. [FACT — Audit §17 conflict #7]

### 2.9 Agent State [TARGET]

Agent state is split:
- **Persistent snapshot** (DB — `Agent` table): agent ID, type, trust level, sandbox mode, last status. Used for cold-start display.
- **Live state** (SSE event stream → `useExecutionStore`): current step, current plan, current tool call. Used for AgentDock.
- **Persistent execution history** (DB — `ExecutionTrace` table): every execution recorded with stages, started/completed timestamps. Used for audit + replay.

**Three readers, three different views, all derived from the same source (DB + event stream).** No duplication — the DB is the source of truth for snapshots, the event stream is the source of truth for live updates, and the AgentDock subscribes to the event stream.

**[CURRENT]** Agents are in registries (in-memory). No DB persistence. No event stream for agent state. [FACT — Audit §6.3, §3.2]

### 2.10 Cache State (Cross-cutting) [TARGET]

Both server cache (#3) and client cache (#7) need:
- TTL timestamps.
- Invalidation flags (`isStale`, `isFetching`, `isInvalidated`).
- Optimistic pending writes (`optimisticData`, `isPending`, `isError`).

TanStack Query handles all of this on the client. The server cache layer (Core) implements its own small LRU + TTL.

---

## 3. State Boundaries — What Goes Where (decision matrix)

For each piece of state, exactly one row applies.

| State | Owner | Read by | Written by | Persistence |
|---|---|---|---|---|
| Project list | DB (`Project` table) | UI (TanStack Query), Core | API routes (create/update), Core (archival) | DB |
| Active project ID | IndexedDB (LayoutPersistence) | UI | UI (ProjectSwitcher selection) | IndexedDB |
| Conversation list | DB (`Conversation` table) | UI (TanStack Query) | API routes (create), Core (rename/delete) | DB |
| Active conversation ID | IndexedDB (LayoutPersistence) | UI | UI (tab switch) | IndexedDB |
| Conversation messages | DB (`Message` table) | UI (TanStack Query) | API routes (POST /api/chat appends), Core (runWorkflow) | DB |
| Streaming message body | `useExecutionStore` (live) | UI (MessageItem during stream) | SSE event stream | In-memory (transient); committed to DB on `done` |
| Memory entries | DB (`Memory` table) | UI (TanStack Query), Core (ContextBuilder) | Core (MemoryEngine.store), API routes (user delete) | DB |
| Memory search results | TanStack Query (client cache) + Core cache (server) | UI | SSE invalidation | TTL 6s |
| Knowledge entities | DB (`KnowledgeEntity` table) | UI (TanStack Query), Core (ContextBuilder) | Core (KnowledgeEngine.add), API routes (user merge/archive) | DB |
| Knowledge graph relations | DB (`KnowledgeRelation` table) | UI (TanStack Query), Core (ContextBuilder, GraphRAG) | Core | DB |
| Artifacts | DB (`Artifact` + `ArtifactVersion` tables) | UI (TanStack Query) | Core (ArtifactService), API routes (per-hunk accept) | DB |
| Artifact content (specific version) | DB | UI (TanStack Query, immutable per version) | Core (ArtifactService.version) | DB |
| Tasks | DB (`Task` table) | UI (TanStack Query) | Core (TaskService), API routes (user edit) | DB |
| Agents (registry) | Code (registered at boot) | Core (Orchestrator) | Code | Code |
| Agent instances (per-task) | DB (`Agent` + `ExecutionTrace` tables) | UI (TanStack Query), Core | Core (AgentService.spawn) | DB |
| Active agent execution | SSE event stream → `useExecutionStore` | UI (AgentDock, ExecutionTrace) | Core (EventBus emit) | In-memory (transient); DB snapshot at stage boundaries |
| Audit log | DB (`AuditLog` table) | Core (EventBus subscribers), UI (DeveloperPanel Events) | Core (every EventBus emit writes a row) | DB |
| Theme | IndexedDB → `useUIStore` (hydrate on boot) | UI | UI (Settings) | IndexedDB |
| Tabs (open, order, widths) | IndexedDB (LayoutPersistence) → `useWorkspaceStore` (hydrate on boot) | UI | UI (WorkspaceKernel) | IndexedDB |
| Active tab ID | IndexedDB → `useWorkspaceStore` | UI | UI | IndexedDB |
| Mode (canvas) | IndexedDB → `useWorkspaceStore` | UI | UI | IndexedDB |
| Composer input | `useSessionStore` (in-memory) | UI (Composer) | UI (Composer) | In-memory (cleared on send) |
| Active model | `useSessionStore` | UI (Composer model menu) | UI | In-memory |
| deepThink / webSearch toggles | `useSessionStore` | UI (Composer) | UI | In-memory |
| Overlay open/close | `useUIStore` | UI | UI (keyboard handlers, click handlers) | In-memory |
| Hover state | local `useState` in the hovered component | UI (single component) | UI | In-memory |
| Loading state | `useExecutionStore` (derived from `activeExecutions.size > 0`) | UI | SSE event stream | Derived |
| Toasts | local component state in `<Toaster />` (sonner) | UI | UI (any component via `toast()`) | In-memory (auto-dismiss 2.6s) |
| Pipeline stage | SSE event stream → `useExecutionStore.activeExecutions[id].currentStage` | UI (ExecutionTrace inline) | Core (EventBus emit at stage transitions) | DB snapshot (AuditLog) |

**Every row has exactly one owner. No state is in two places.**

---

## 4. The Five Frontend State Slices (recap — full spec in Frontend Architecture §14)

| Slice | Owner | Lifetime | Persistence | Read by |
|---|---|---|---|---|
| `useUIStore` (UIState) | Zustand | Transient | IndexedDB subset (theme, rightOpen, rightWidth, railCollapsed, devMode) | All shell regions |
| `useWorkspaceStore` (WorkspaceState) | Zustand | Session (per browser tab) | IndexedDB (tabs, activeTabId, currentProject, mode) | TopBar, WorkspaceTabs, CanvasHost, ContextSidebar |
| `useSessionStore` (SessionState) | Zustand | Session | In-memory (ephemeral) | Composer, ChatView |
| `useExecutionStore` (ExecutionState) | Zustand | Live (during agent work) | In-memory (derived from SSE) | AgentDock, ExecutionTrace, MessageItem |
| TanStack Query cache (CacheState + ConversationState) | TanStack Query | TTL | In-memory | All data-driven panels |

**Plus:** local `useState` for ephemeral component-local state.

**[CURRENT]** ONE monolithic `lib/nova/store.ts` (354 lines) holds ALL of the above + data fields (`convs`, `mems`, `tasks`, `toasts`, `artifact`). [FACT — Audit §5.2]

---

## 5. Server State — What's in the DB vs Core In-Memory

### 5.1 DB is the Source of Truth for Persistent Domain State [TARGET]

```
Project, Conversation, Message, Memory, KnowledgeEntity, KnowledgeRelation,
Artifact, ArtifactVersion, Task, Agent, ExecutionTrace, AuditLog
```

All CRUD goes through Prisma. Core engines call Prisma via `lib/db.ts`. API routes call Core engines; they do NOT call Prisma directly (single layer of indirection — Core owns the data model).

### 5.2 Core In-Memory is for Process-Local Concerns [TARGET]

```
- AgentRegistry (rebuilt at boot from code)
- ModelRegistry (rebuilt at boot from code)
- ToolRegistry (rebuilt at boot from code)
- PromptRegistry (rebuilt at boot from code)
- EventBus subscriptions (ephemeral)
- In-flight workflow contexts (during a runWorkflow call)
- SSE client connections (ephemeral)
- Locks (per-conversation write lock, per-agent spawn lock)
- Cache layer (TTL Map)
```

**NOT in Core in-memory:**
- Memory entries (DB).
- Knowledge graph (DB).
- Conversations (DB).
- Artifacts (DB).
- Agent state (DB snapshot + EventBus live).
- Audit log (DB).

**[CURRENT]** `MemoryEngine` holds memories in RAM. [FACT — Audit §3.2] **[MIGRATION]** MemoryEngine becomes a thin wrapper over Prisma `Memory` table; interface unchanged (Audit migration risk #2).

### 5.3 Server Cache Layer [TARGET]

In-process LRU Map in Core. Each cached value has:
- `key: string`
- `value: unknown`
- `expiresAt: number` (epoch ms)
- `invalidatableBy: EventType[]` (event types that invalidate this key)

`EventBus` on emit checks if the event type invalidates any cached keys; if so, evicts.

**[CURRENT]** No server cache. [FACT — Audit §3.7]

---

## 6. Client State — What's in Zustand vs TanStack Query vs IndexedDB vs useState

### 6.1 Zustand (UI + Workspace + Session + Execution) [TARGET]

Holds UI-ephemeral + workspace-persistent + session + execution state. Four SEPARATE stores (no monolithic store). Each store has its own selectors.

**Why separate stores?**
1. Each store has its own lifecycle (UI ephemeral vs workspace persistent vs session vs execution).
2. Selectors don't re-render unrelated components.
3. Persistence strategy differs (UI: IndexedDB subset, Workspace: IndexedDB, Session: none, Execution: none).
4. Easier to test in isolation.

### 6.2 TanStack Query (Cache) [TARGET]

Holds derived server-state. Read-only from the UI's perspective (writes go through `useMutation` → API → Core → DB → SSE invalidation).

### 6.3 IndexedDB (Persistent Client State) [TARGET]

LayoutPersistence + theme + recentProjects + devMode + keyboardHintDismissed. Hydrated into Zustand on boot via `idb-keyval.get()` + Zustand `persist` middleware.

### 6.4 Local `useState` (Ephemeral Component State) [TARGET]

Hover, drag-in-progress, transient input value (before debouncing), focus coordination. Never lifted to a store unless cross-component.

---

## 7. Agent State — Detailed Model [TARGET]

Per Part 8 (Agent Architecture) + Part 10 (Execution/Runtime UX):

### 7.1 Agent State Lifecycle [TARGET]

```
idle → spawned → planning → planning_complete →
       awaiting_approval → executing →
       (tool_call → tool_result)* →
       validating → validation_complete →
       awaiting_approval (final) →
       done | failed | cancelled | paused
```

States:
- `idle`: agent exists but no active task.
- `spawned`: just created; loading context.
- `planning`: PlannerAgent generating a Plan.
- `planning_complete`: Plan ready; if approval required, awaiting.
- `awaiting_approval`: user must approve before next stage.
- `executing`: Orchestrator running plan steps.
- `tool_call`: agent invoking a tool.
- `tool_result`: tool returned.
- `validating`: Validator running.
- `validation_complete`: Validator done; if approval required, awaiting.
- `done`: finished successfully; result persisted.
- `failed`: failed; error persisted; recoverable via retry.
- `cancelled`: user cancelled.
- `paused`: user paused; resumable.

### 7.2 Where Each Agent State Field Lives [TARGET]

| Field | Lives in | Why |
|---|---|---|
| `agentId`, `type`, `name`, `trustLevel`, `sandboxMode` | DB (`Agent` table) | Persistent configuration |
| `currentStatus` | DB (snapshot) + EventBus (live) | Cold-start (DB) + live updates (EventBus) |
| `currentPlan` | DB (`ExecutionTrace.stages`) | Audit + replay |
| `currentStep` | EventBus (live) → `useExecutionStore` | Live only; persisted at stage boundary |
| `currentToolCall` | EventBus (live) → `useExecutionStore` | Live only; persisted at stage boundary |
| `executionHistory` | DB (`ExecutionTrace` rows) | Audit |
| `approvals` (pending + history) | DB (`AuditLog` for past) + EventBus (live for pending) | Audit + live |

### 7.3 Approval State [TARGET]

Per Part 9 (HITL/HOTL):
- **Per-task-type trust ledger** (DB — `TrustPolicy` table): "Always allow web_search in research mode", "Always require approval for code edits", etc. Set once per task type; never asked per-instance (Part 29 invariant #22).
- **Pending approvals** (EventBus live → `useExecutionStore.pendingApprovals`): when an agent enters `awaiting_approval` state, an `Approval` is pushed to the frontend. User acts (approve / reject / always-allow / cancel). Action dispatched via `POST /api/agent/:id/:action`.
- **Past approvals** (DB — `AuditLog`): every approval decision logged with traceId, actor, decision, reason.

---

## 8. Workspace State — Detailed Model [TARGET]

### 8.1 Workspace [TARGET]

The Workspace = the entire OS (single instance, single user). Not a "container" — it's the top-level scope (Part 13.1). NOT persisted as a row; it's implicit. The workspace holds projects.

### 8.2 Project [TARGET]

DB row (`Project` table). Fields: `id`, `name`, `accent`, `mimoMd` (project-scoped AGENTS.md), `createdAt`, `updatedAt`, `archivedAt?`.

Active project is held in `useWorkspaceStore.currentProjectId` (IndexedDB-persistent).

### 8.3 Tabs [TARGET]

Held in `useWorkspaceStore.tabs` (IndexedDB-persistent). Each tab:
- `id: string` (UUID)
- `kind: WorkspaceTabKind` ('conversation' | 'artifact' | 'memory' | 'knowledge' | 'file' | 'project' | 'dashboard')
- `title: string`
- `pinned?: boolean` (only conversation tab #1)
- `ephemeral?: boolean` (auto-archive after 7 days disuse)
- `payload?: unknown` (kind-specific: artifactId, conversationId, etc.)
- `width?: number` (if split — v2)
- `scrollX, scrollY: number`
- `lastUsedAt: number` (for ephemeral auto-archive)

`activeTabId` is also in `useWorkspaceStore` (IndexedDB-persistent).

### 8.4 Mode (Canvas Mode) [TARGET]

`useWorkspaceStore.mode: Mode` where `Mode = 'chat' | 'research' | 'code' | 'write' | 'build' | 'learn' | 'plan' | 'analyze'`. IndexedDB-persistent.

**[CURRENT]** `contextMode: ChatMode` in store.ts line 40 — only one mode modeled. [FACT] **[MIGRATION]** Expand to 8-mode enum.

### 8.5 Layout (Widths, Scroll, Cursor) [TARGET]

Per-tab widths + scroll positions + cursor (for conversation: `{conversationId, messageId, charOffset}`). IndexedDB-persistent. Saved on drag-end / scroll-debounce (250ms) / mode-switch / tab-switch.

---

## 9. Cache State — Detailed Model [TARGET]

### 9.1 Server Cache [TARGET]

In-process LRU Map in Core:
- `workspaceSnapshot` (6s TTL) — invalidated on `memory.*`, `knowledge.*`, `agent.*`, `task.completed` events.
- `knowledgeQuery:{query}` (6s TTL) — invalidated on `knowledge.*` events.
- `userModel` (no TTL; invalidated on `knowledge.*` events).
- `embedding:{text}` (TBD — by RAG strategy).

### 9.2 Client Cache (TanStack Query) [TARGET]

Query keys (see §2.7). Default options:
- `refetchOnWindowFocus: false` (single-user local-first — no need).
- `refetchOnReconnect: true`.
- `retry: 1` (don't hammer on failure).
- `staleTime` per query (see §2.7).

### 9.3 Optimistic Pending Writes [TARGET]

`useMutation` with `onMutate` writes optimistic value to cache; `onError` rolls back; `onSettled` invalidates. UI reads from cache; sees optimistic value immediately.

Pending state (`isPending`, `isError`, `isSuccess`) is exposed via `useMutation` return — UI renders loading/error inline (not full overlay).

---

## 10. Session State — Detailed Model [TARGET]

`useSessionStore` (in-memory, per browser tab):

```typescript
{
  activeModel: ModelId,
  deepThink: boolean,
  webSearch: boolean,
  mode: Mode,                    // canvas mode (also in workspace for persistence; this is the working copy)
  composerInput: string,         // draft
  composerAttachments: Attachment[],
  composerSlashCommand: string | null,
  lastSentAt: number | null,
}
```

**Why in-memory?** These are "what am I about to do" choices. If the user reloads, they expect a fresh composer, not a stale draft with a forgotten deepThink toggle.

**[CURRENT]** All in monolithic store. [FACT — Audit §5.2]

---

## 11. UI State — Detailed Model [TARGET]

`useUIStore` (transient; subset IndexedDB-persistent):

```typescript
{
  theme: ThemeMode,                              // IndexedDB-persistent
  rightOpen: boolean,                            // IndexedDB-persistent
  rightWidth: number,                            // IndexedDB-persistent
  railCollapsed: boolean,                        // IndexedDB-persistent
  devMode: boolean,                              // IndexedDB-persistent
  overlay: {
    palette: boolean,
    universalSearch: boolean,
    quickAI: boolean,
    projectSwitcher: boolean,
    settings: boolean,
    voice: boolean,
    imageGen: boolean,
    developerPanel: boolean,
  },                                             // in-memory
  paletteQuery: string,                          // in-memory
  commandRegistryVersion: number,                // in-memory
  keyboardHintVisible: boolean,                  // in-memory (one-time)
}
```

**Only one overlay can be open at a time.** Opening one closes others. (Exception: DeveloperPanel can co-exist with another overlay because it's a diagnostic tool, not a modal.)

---

## 12. Execution State — Detailed Model [TARGET]

`useExecutionStore` (live, derived from SSE):

```typescript
{
  activeExecutions: Map<ExecutionId, {
    agentId: string,
    taskId: string | null,
    conversationId: string,
    messageId: string,           // streaming message ID
    stages: Stage[],             // [{ name, status, startedAt, completedAt? }]
    currentStage: string,
    startedAt: number,
  }>,
  streamingMessages: Map<MessageId, {
    content: string,
    partial: boolean,
    trace: TraceEvent[],
  }>,
  taskProgress: Map<TaskId, { progress: number, eta: number | null }>,
  pendingApprovals: Approval[],
}
```

**Derived value:** `loading: boolean = activeExecutions.size > 0`. Used by AgentDock visibility (Part 28.3 — AgentDock visible only when `loading`).

**[CURRENT]** `loading: boolean` in monolithic store. No live execution tracking. ExecutionTrace uses simulated timers. [FACT — Audit §17 conflict #7]

---

## 13. Server/Client Boundary — Who Writes What [TARGET]

| State | Written by (server) | Written by (client) |
|---|---|---|
| Project | Core (create/archive) | UI → API (rename, change accent) |
| Conversation | Core (fork) | UI → API (create, rename, delete) |
| Message | Core (runWorkflow appends AI messages) | UI → API (POST /api/chat appends user messages) |
| Memory | Core (MemoryEngine.store during workflow) | UI → API (user delete, user edit) |
| KnowledgeEntity | Core (KnowledgeEngine.add during workflow) | UI → API (user merge, archive) |
| Artifact | Core (ArtifactService.version during workflow) | UI → API (per-hunk accept) |
| Task | Core (TaskService during workflow) | UI → API (user edit) |
| Agent | Core (AgentService.spawn) | UI → API (cancel, retry) |
| AuditLog | Core (EventBus emit auto-writes) | n/a (never directly written by UI) |
| LayoutPersistence | n/a | UI (WorkspaceKernel) |
| Theme | n/a | UI (Settings) |
| Composer input | n/a | UI (Composer) |
| Overlay state | n/a | UI (keyboard / click handlers) |
| Pipeline stage | Core (EventBus emit at stage transitions) | n/a (read-only on client) |

**UI never writes to Core in-memory directly.** UI → API → Core → DB. Core in-memory is write-through cache for DB.

---

## 14. State Hydration + Boot Sequence [TARGET]

```
1. Server Component (page.tsx):
   - reads cookies for last-project-id (v2 — auth not in v1)
   - pre-fetches workspace snapshot via Core (server-side)
   - pre-fetches conversation list
   - renders <MiMoOS initialWorkspace={data} initialConversations={list} />

2. Client (MiMoOS mount):
   - hydrates TanStack Query cache with `initialWorkspace` + `initialConversations`
   - hydrates Zustand `useUIStore` + `useWorkspaceStore` from IndexedDB
   - WorkspaceKernel boots (see Frontend Architecture §3)
   - subscribes to /api/events SSE
   - registers keyboard handlers
   - renders shell regions
```

**[CURRENT]** No hydration strategy. Client fetches on mount → waterfall. [INFERENCE]

---

## 15. State Invalidation Rules [TARGET]

| Event | Invalidates |
|---|---|
| `memory.created` | `['workspace']`, `['memory', *]` |
| `memory.updated` | `['workspace']`, `['memory', *]`, `['conversation', memory.conversationId]` (if memory source is a message) |
| `memory.decayed` | `['workspace']`, `['memory', *]` |
| `knowledge.entity_added` | `['workspace']`, `['knowledge', *]`, `userModel` |
| `knowledge.relation_added` | `['workspace']`, `['knowledge', *]`, `userModel` |
| `artifact.versioned` | `['artifact', id, 'versions']` (NOT `['artifact', id]` — old version still valid) |
| `conversation.message_appended` | append to `['conversation', id]` cache directly (no refetch) |
| `task.completed` | `['workspace']`, `['conversation', task.conversationId]` |
| `pipeline.stage` | `useExecutionStore.activeExecutions[executionId].currentStage` |
| `agent.state` | if `awaiting_approval`: push to `useExecutionStore.pendingApprovals`; if `done`/`failed`/`cancelled`: remove from `activeExecutions` |

---

## 16. Optimistic Updates — Detailed [TARGET]

Per Part 20.7:

| Action | Optimistic write | Rollback on error |
|---|---|---|
| Send message | Append user message to `['conversation', id]` cache | Remove appended message; show error toast with retry |
| Toggle deepThink / webSearch | Flip in `useSessionStore` immediately | Flip back; show error toast |
| Toggle right sidebar | Flip in `useUIStore` immediately | Flip back |
| Delete memory | Remove from `['memory', query]` + `['workspace']` caches | Restore; show undo toast (2.6s) |
| Delete conversation | Remove from `['conversations']` cache | Restore; show undo toast |
| Per-hunk accept | Apply hunk to `['artifact', id]` cache; bump version | Revert hunk; show error |
| Approve agent action | Update `pendingApprovals` immediately | Restore; show error |
| Cancel agent | Mark `activeExecutions[id].cancelling = true` | Remove mark; show error |

---

## 17. Concurrency + Consistency [TARGET]

- **Single-user local-first** — no concurrent users. No multi-writer consistency issues at the user level.
- **Per-conversation write lock** (Core in-memory) — prevents two concurrent `POST /api/chat` for the same conversation from interleaving messages.
- **Per-agent spawn lock** (Core in-memory) — prevents spawning the same agent twice for the same task.
- **Optimistic UI** — UI writes optimistically; server reconciles. On conflict (rare — single user), server wins; UI rolls back.
- **No transactions needed** — SQLite is single-process; Prisma wraps each operation in a transaction.

---

## 18. Audit Log + Trace IDs [TARGET]

Every state-changing operation has a `traceId` (UUID v4). The traceId:
1. Generated by the API route on request.
2. Passed to Core (runWorkflow, MemoryEngine.store, etc.).
3. Emitted with every EventBus event.
4. Written to `AuditLog` row with `{ traceId, eventType, actor, payload, createdAt }`.
5. Returned to the client in the API response.
6. Used by the client to correlate optimistic writes with server confirmations.
7. Used by the DeveloperPanel Events tab to filter.

**[CURRENT]** EventBus emits events but they're not persisted. No audit trail. [FACT — Audit §9.5]

---

## 19. Memory Decay + Background State Changes [TARGET]

Memory has confidence decay (Part 5.6). Decay is a background job that:
1. Periodically (e.g., daily) scans `Memory` table for entries with `decayedAt IS NULL AND updatedAt < now - 30 days`.
2. Reduces `confidence` by a factor.
3. Emits `memory.decayed` events.
4. If `confidence < threshold`, marks `decayedAt = now`.

This is a **background state change** — the user didn't initiate it. The frontend sees `memory.decayed` events via SSE and invalidates caches.

**[CURRENT]** No background jobs. [FACT — Audit §6.2] Decay not implemented. [FACT — Audit §17 conflict #1, partial — MemoryEngine doesn't persist]

---

## 20. Knowledge Consolidation + Evolution [TARGET]

Knowledge graph evolves (Part 6.7, 6.8). The ConsolidationEngine + EvolutionEngine run periodically:
1. Merge duplicate entities (same name + alias).
2. Promote high-confidence inferred facts to "fact" policy.
3. Archive low-confidence stale entities.
4. Emit `knowledge.entity_merged`, `knowledge.entity_promoted`, `knowledge.entity_archived` events.

Frontend invalidates `['knowledge', *]` + `userModel` on these events.

**[CURRENT]** Not implemented. [FACT — Audit §3.5]

---

## 21. State Migration Plan

| Phase | Action | Risk | Audit ref |
|---|---|---|---|
| S1 | Define Prisma domain schema (Project, Conversation, Message, Memory, KnowledgeEntity, KnowledgeRelation, Artifact, ArtifactVersion, Task, Agent, ExecutionTrace, AuditLog, TrustPolicy) | High (data model decision — see MiMo_Data_Architecture [TBD]) | §3.1, §16 #7 |
| S2 | `bun run db:push --accept-data-loss` (replaces demo User+Post) | Low (demo data is boilerplate) | §16 migration risk #1 |
| S3 | Replace in-memory MemoryEngine with Prisma-backed; preserve interface | Medium (existing in-memory memories lost — acceptable, seeded) | §16 #8, migration risk #2 |
| S4 | Persist EventBus events to AuditLog (DB) on emit | Low | §9.5, §16 #9 |
| S5 | Add server cache layer (LRU + TTL + event-driven invalidation) | Medium (new infra) | §3.7 |
| S6 | Add `QueryClientProvider` in `layout.tsx` + define query keys + invalidation rules | Low | §18 #3 |
| S7 | Split monolithic `lib/nova/store.ts` into 4 Zustand stores + façade | Medium (component selectors) | §5.2, §16 #6 |
| S8 | Add IndexedDB layout persistence (idb-keyval + Zustand persist middleware) | Medium (new dependency) | §11 |
| S9 | Remove `INITIAL_MEMORIES` from `lib/nova/constants.ts`; source from Core only | Low | §2 issue #3, §16 #16 |
| S10 | Add `/api/events` SSE route + `useEventStream()` hook + `useExecutionStore` | Medium (new infra) | §6.3 |
| S11 | Add `traceId` propagation through API → Core → EventBus → AuditLog → client | Medium (cross-cutting) | §9.5 |
| S12 | Add TrustPolicy table + per-task-type trust ledger | Medium (policy decision) | §9.2, §17 conflict #5, #6 |
| S13 | Add background job runner (for memory decay, knowledge consolidation) | Medium (new infra) | §6.2 |
| S14 | Add per-conversation + per-agent locks in Core | Low | §17 |
| S15 | Expand `contextMode` from `ChatMode` to 8-mode enum | Low | store.ts line 40 |

---

## 22. Anti-Patterns to Avoid [TARGET — forbidden]

1. **Duplicated source of truth** — never have the same state in two places (e.g., `INITIAL_MEMORIES` in both `constants.ts` and Core seeds). [Part 29 invariant #1, #35]
2. **Client writes to Core in-memory directly** — UI must go through API.
3. **Core engines import from `app/` or `components/`** — Core is server-only; UI is client.
4. **Server state in Zustand** — Zustand is for client-only state. Server state belongs in TanStack Query cache.
5. **Persistent state in `useState`** — `useState` is per-component-instance, lost on unmount.
6. **In-memory state in DB** — ephemeral state (locks, in-flight contexts) should stay in Core in-memory.
7. **Two monolithic stores** — split by lifecycle + concern; don't recreate the monolith.
8. **Cross-store direct reads** — stores communicate via events/queries, not direct imports.
9. **Optimistic writes without rollback** — every optimistic write must have an `onError` rollback.
10. **Silent failures** — every state change has observable effect (UI update, audit log, error).

---

## 23. Unknowns [UNKNOWN]

| # | Unknown | Why it matters |
|---|---|---|
| 1 | Should `Message.content` be a single string or a structured AST (for citations, code blocks, attachments)? | Affects schema, streaming protocol, rendering. |
| 2 | Should `Memory.source` be a foreign key to `Message` or a denormalized `{ conversationId, messageId }`? | Affects join cost vs. update cost. |
| 3 | Should `LayoutPersistence` be per-project or global? | Per-project means switching projects restores project-specific layout; global means one layout across projects. Bible Part 13.7 says "every tab, width, scroll, mode, cursor survives reload" — ambiguous. |
| 4 | Does TanStack Query's default `gcTime` (5 min) conflict with long-running sessions? | Probably not — but verify. |
| 5 | Should `useExecutionStore` hold streaming message content (which can be long) or should it delegate to TanStack Query cache? | Memory pressure for long streams. |
| 6 | Should theme be persisted per-device or per-project (Part 16.6 — per-project accent)? | Accent is per-project; theme (light/dark) is per-device. |
| 7 | What's the right SSE reconnection strategy (exponential backoff)? | Standard pattern; needs explicit config. |
| 8 | Should `pendingApprovals` survive a frontend reload? | If yes, they need to be re-fetched from DB on boot. |
| 9 | Does the audit log need rotation/archival policy? | For single-user local-first, probably not in v1. |
| 10 | Should optimistic writes be persisted to IndexedDB (so they survive reload even if the server hasn't confirmed)? | Bible Part 27.3 rule #18 — "Layout persistence. Every tab, width, scroll, mode, cursor survives reload" — implies yes for layout, but what about pending messages? |

---

## 24. Summary

State in MiMo [TARGET] has **10 categories**, **5 frontend slices**, **1 database**, **1 server cache**, **1 IndexedDB**, **1 event stream**, and **1 audit log**. Every piece of state has exactly one owner. Owners:

| Owner | Owns |
|---|---|
| Database (Prisma/SQLite) | All persistent domain state |
| Core in-memory | Process-local concerns (registries, locks, in-flight contexts, SSE subscriptions, cache layer) |
| Server cache (LRU Map) | Derived read models (workspace snapshot, knowledge queries, user model) |
| IndexedDB | Layout persistence + theme + recentProjects + devMode |
| Zustand `useUIStore` | Transient UI state (overlays, palette query) |
| Zustand `useWorkspaceStore` | Tabs, activeTabId, currentProject, mode |
| Zustand `useSessionStore` | Composer input, active model, toggles |
| Zustand `useExecutionStore` | Live agent execution state (derived from SSE) |
| TanStack Query cache | Server-state mirror (conversations, memory search, knowledge search, artifacts) |
| Local `useState` | Component-local ephemeral state (hover, drag, focus) |

**No duplicated source of truth.** Every reader subscribes or derives.

**[CURRENT]** Has three competing systems: monolithic Zustand (354 lines), in-memory Core (MemoryEngine, EventBus, registries — not persisted), and Prisma demo boilerplate (User+Post only). Three duplications: initial memories, tab state, conversations.

**[MIGRATION]** 15 phases (§21) to reach TARGET. Highest-risk: S1 (Prisma domain schema — data model decision), S7 (Zustand split — component selectors), S10 (SSE infrastructure).

---

**End of MiMo_State_Architecture.md.**
