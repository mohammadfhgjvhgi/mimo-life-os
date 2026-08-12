# MiMo — Architecture Dependencies
### Phase: Foundation From The Ground Up — ARCH-E
### Owner: Senior Systems Architect

**Status:** BINDING. This document defines the layering rules for the MiMo codebase. Any import that violates this graph is a bug. CI (Phase 0 of roadmap) must enforce it.

**Source documents:** `MiMo_Product_Bible.md` (Part 25, Part 27), `architecture/MiMo_Current_System_Audit.md` (§2, §12, §13).

**Epistemic labels:** [CURRENT] · [TARGET] · [MIGRATION] · [FACT] · [INFERENCE] · [UNKNOWN].

---

## 1. The dependency graph (canonical layering)

Dependencies flow **downward only**. A lower layer must never import from a higher layer. Lateral imports inside a layer are allowed only when explicitly noted.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  L0  Foundation                                                             │
│      types, errors, logger, events (interfaces only)                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L1  Data                                                                   │
│      Prisma client, SQLite, FTS5 virtual tables, filesystem adapters        │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L2  Domain                                                                 │
│      Memory, Knowledge, Context, Artifacts, Tasks, Agents, Tools, Models    │
│      (engines that own canonical state + invariants)                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L3  Events                                                                 │
│      EventBus (in-memory pub/sub) + persistent AuditEvent log              │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L4  Services                                                               │
│      WorkflowEngine, Orchestrator, Validator, Reasoner, Planner            │
│      (compose L2 engines + emit L3 events)                                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L5  AI                                                                     │
│      Model Router, Provider Adapters (ZAIModel, OpenAI, Ollama…),          │
│      ZAIModel, LocalModel, StreamingPipeline                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L6  Agents                                                                 │
│      Planner, Researcher, Builder, Reviewer, Verifier, Sub-agents          │
│      (call L4 services + L5 AI + L2 tools via L4 Orchestrator)              │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L7  Runtime                                                                │
│      Sandbox (Pyodide / CSP iframe / gVisor), Execution, Recovery,         │
│      TrustLedger, PermissionsGate                                           │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L8  Application                                                            │
│      API routes (app/api/*), Workspace API aggregation, streaming endpoints │
│      (thin: build context → call Core → return result; wrap in safe())     │
└─────────────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│  L9  Frontend                                                               │
│      MiMoOS shell (components/mimo), shadcn/ui primitives, Zustand stores,  │
│      hooks, panels, ExecutionTrace, AgentDock, ArtifactDock                │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Legend:** ↓ = "depends on." A lower layer must not import a higher layer. A higher layer may import any lower layer (and lateral imports inside a layer are permitted only when explicitly allowed in §5 below).

---

## 2. Per-layer composition

### L0 — Foundation

**Modules:** `core/types.ts`, `core/errors.ts`, `core/logger.ts`, `core/events/EventBus.ts` (interface + in-memory impl).

**Depends on:** Nothing. (Pure TypeScript, zero npm imports except `zod` for schema validation if reused across layers — see §6 external.)

**Depended-on-by:** Everything.

**Notes:**
- [CURRENT] `core/types.ts` (268 lines), `core/errors.ts`, `core/logger.ts`, `core/events/EventBus.ts` exist (Audit §1.2, §13).
- [TARGET] `EventBus` interface moves here; the persistent `AuditEvent` write happens in L3 (D3 — write-then-notify).
- This layer must remain **stable**. Any change to `types.ts` ripples everywhere.

### L1 — Data

**Modules:** `lib/db.ts` (Prisma client singleton), `prisma/schema.prisma`, FTS5 virtual tables, filesystem adapters.

**Depends on:** L0 (types for IDs, errors for DB errors, logger).

**Depended-on-by:** L2, L3, L7 (filesystem).

**Notes:**
- [CURRENT] Prisma client exists; schema is boilerplate (Audit §3.1).
- [TARGET] Full domain schema (Project, Conversation, Message, Memory, Knowledge, Artifact, Task, Agent, Execution, AuditEvent, TrustLedger) — Phase 1 of roadmap.
- [TARGET] FTS5 virtual tables synced via Prisma write-through middleware (D23).
- [TARGET] SQLCipher at-rest encryption (D2 — Phase 1 validation).

### L2 — Domain

**Modules:** `core/memory/MemoryEngine.ts`, `core/knowledge/KnowledgeEngine.ts`, `core/context/ContextBuilder.ts`, `core/artifacts/ArtifactStore.ts`, `core/tasks/TaskStore.ts`, `core/agents/AgentState.ts`, `core/registry/*` (Tool, Agent, Model, Capability registries), `core/prompts/PromptEngine.ts`.

**Depends on:** L0, L1.

**Depended-on-by:** L3 (EventBus subscribers), L4 (services compose these), L8 (workspace API aggregates these).

**Notes:**
- [CURRENT] `MemoryEngine` is in-RAM (Audit §3.2) — MUST move to L1 Prisma (D22).
- [CURRENT] `ContextBuilder` exists (Audit §1.4).
- [TARGET] KnowledgeEngine, ArtifactStore, TaskStore, AgentState — Phase 2/7/12 of roadmap.
- [TARGET] PromptEngine v2 (modular layer composition) — Bible Part 7.2 — Phase 8.
- Lateral imports INSIDE L2: a domain engine may import another domain engine ONLY through its public interface. Example: `ContextBuilder` calls `MemoryEngine.recall()` — fine. `MemoryEngine` does NOT call `ContextBuilder` — that would be a downward-only violation reversed.

### L3 — Events

**Modules:** `core/events/EventBus.ts` (impl with persistence), `core/events/AuditLog.ts`, replay API.

**Depends on:** L0 (interfaces, types), L1 (Prisma AuditEvent table).

**Depended-on-by:** L4 (services publish), L6 (agents publish), L7 (runtime publishes sandbox events), L8 (workspace API subscribes for live updates), L9 (ExecutionTrace subscribes).

**Notes:**
- [CURRENT] `EventBus` is `Map<string, Set<EventHandler>>` — pure in-memory (Audit §3.2).
- [TARGET] Hybrid: in-memory pub/sub + persistent AuditEvent write (D3).
- [TARGET] `EventBus.replay(filter)` for crash recovery + dev panel.

### L4 — Services

**Modules:** `core/workflow/WorkflowEngine.ts`, `core/orchestrator/Orchestrator.ts`, `core/validator/Validator.ts`, `core/reasoner/Reasoner.ts`, `core/planner/Planner.ts`, `core/executive/*` (CompressionEngine, RecoveryEngine).

**Depends on:** L0, L2, L3, L5 (AI calls via Model Router).

**Depended-on-by:** L6 (agents are spawned by Orchestrator), L8 (API routes call WorkflowEngine).

**Notes:**
- [CURRENT] WorkflowEngine, Orchestrator, Validator, Reasoner, Planner all exist (Audit §1.4, §13).
- [CURRENT] Reasoner is rule-based (Audit §4.4) — TARGET: optional model-based reasoning behind feature flag (Phase 8).
- [TARGET] 6-stage pipeline (add `Done` stage) — D5.

### L5 — AI

**Modules:** `core/models/ZAIModel.ts`, `core/models/OpenAIModel.ts` (future), `core/models/OllamaModel.ts` (future), `core/models/LocalModel.ts` (future), `core/capabilities/ImageAdapter.ts` + impls, `core/capabilities/SearchAdapter.ts` + impls, `core/capabilities/EmbeddingsAdapter.ts` (future), `core/capabilities/VisionAdapter.ts` (future), Model Router.

**Depends on:** L0 (types, errors), L3 (publishes `model.token`, `model.complete` events), external SDKs (`z-ai-web-dev-sdk`, `openai`, etc. — server-only).

**Depended-on-by:** L4 (services call AI), L6 (agents use models).

**Notes:**
- [CURRENT] Only ZAIModel + SearchProvider adapters exist (Audit §4.1).
- [CURRENT] `z-ai-web-dev-sdk` imported directly in `/api/image` + `/api/search` — **FORBIDDEN** (see §4).
- [TARGET] Model Router (cheap/fast/deep/vision/local) — Bible Part 7.1 — Phase 8.
- [TARGET] Real streaming via `ReadableStream` from adapter — Phase 8.

### L6 — Agents

**Modules:** `core/agents/PlannerAgent.ts`, `core/agents/ResearcherAgent.ts`, `core/agents/BuilderAgent.ts`, `core/agents/ReviewerAgent.ts`, `core/agents/VerifierAgent.ts`, `core/agents/SubAgent.ts` (factory), `core/agents/registry.ts`.

**Depends on:** L0, L2 (tools, memory, knowledge), L3 (publish agent events), L4 (call WorkflowEngine / Orchestrator), L5 (call models via Router).

**Depended-on-by:** L4 (Orchestrator spawns agents), L8 (workspace API exposes agent state).

**Notes:**
- [CURRENT] 4 agents exist: Planner, Researcher, Memory, Writer (Audit §1.2). TARGET: 5 named agents per Bible Part 8.1 (Planner, Researcher, Builder, Reviewer, Verifier).
- [TARGET] Sub-agents (Claude Code pattern) — Phase 9.
- [TARGET] Hierarchical delegation (OpenHands pattern) — Phase 9.

### L7 — Runtime

**Modules:** `core/runtime/Sandbox.ts` (Pyodide, CSP iframe, gVisor dispatch), `core/runtime/Execution.ts` (tool execution), `core/runtime/Recovery.ts`, `core/runtime/TrustLedger.ts`, `core/runtime/PermissionsGate.ts`, `core/runtime/Checkpoints.ts`.

**Depends on:** L0, L1 (filesystem), L2 (tool registry), L3 (publishes runtime events).

**Depended-on-by:** L4 (Orchestrator invokes Execution), L6 (Builder/Verifier agents use Sandbox), L8 (workspace API exposes runtime state).

**Notes:**
- [CURRENT] No sandbox, no permissions, no trust ledger (Audit §9.2, §9.6).
- [TARGET] TrustLedger + PermissionsGate — Phase 9/10.
- [TARGET] Sandbox — Phase 11.
- [TARGET] Recovery + Checkpoints (state-edit-and-continue) — Phase 9.

### L8 — Application

**Modules:** `app/api/chat/route.ts`, `app/api/image/route.ts`, `app/api/search/route.ts`, `app/api/mimo/workspace/route.ts`, `app/api/mimo/stream/route.ts` (future SSE), `app/page.tsx`, `app/layout.tsx`, `app/globals.css`.

**Depends on:** L0 (types), L4 (services), L2 (engines, via `core/index.ts`), L3 (events for live workspace updates), L5 (capabilities, via `core/index.ts`).

**Must NOT depend on:** L1 directly (go through L2 engines), L6/L7 internals (use L4 services), external provider SDKs (use L5 adapters).

**Notes:**
- [CURRENT] Routes are thin but 2 bypass Core (Audit §2 issue #1, §6.1) — **FORBIDDEN** (see §4).
- [TARGET] Streaming endpoints — Phase 14.
- [TARGET] Defensive `safe()` wrapper on every route — Bible Part 25.3.

### L9 — Frontend

**Modules:** `components/mimo/*` (MiMoOS shell + panels), `components/ui/*` (shadcn/ui), `components/nova/*` (reused chat stack — ChatView, Composer, MessageItem, Markdown, CommandPalette, VoiceMode, ImageGenModal, SettingsModal, Toasts, icons), `lib/nova/store.ts` (TARGET: split into `lib/stores/*` per D21), `lib/nova/useChat.ts`, `lib/nova/datetime.ts`, `hooks/*`.

**Depends on:** L0 (types — minimal, via API responses), L8 (API routes only — NEVER L1–L7 directly).

**Must NOT depend on:** L1–L7 directly, any provider SDK, Prisma client.

**Notes:**
- [CURRENT] Frontend correctly goes through `/api/*` routes (Audit §5.3 — good).
- [CURRENT] Monolithic store (Audit §5.2) — TARGET: split per D21 — Phase 15.
- [CURRENT] Dead code in `components/nova/` (Audit §5.1, §15) — Phase 16 cleanup.

---

## 3. Circular dependencies

A circular dependency = two modules that import each other (directly or transitively). The linter (Phase 0) must catch and forbid these.

### 3.1 [CURRENT] Circular-ish risk: `core/types` ← `events` ← `core/*` ← `core/index`

**Source:** Audit §2 implicit in dependency graph + §1.2 (`core/index.ts` re-exports everything).

**Pattern:**
- `core/types.ts` exports types used by `events/EventBus.ts`.
- `events/EventBus.ts` is imported by `core/memory`, `core/orchestrator`, `core/agents`, etc.
- `core/index.ts` re-exports all of the above.
- Some files under `core/*` import from `core/index` (convenience) — creating a cycle: `core/index → core/X → core/index`.

**Severity:** MEDIUM. It does not break the build today because TypeScript resolves it via hoisting, but it makes refactoring painful (touching one file triggers re-resolution of the whole Core).

**[MIGRATION] Fix (Phase 0):**
1. Add `eslint-plugin-import` + `eslint-plugin-import-no-cycle` rule.
2. Audit `core/index.ts` consumers; replace `from '@/core'` with `from '@/core/<engine>'` (deep imports are allowed inside L0–L8; only L9 is restricted to `@/core` public surface).
3. `core/types.ts` and `core/events/EventBus.ts` must remain leaf nodes (no imports from `core/*`).

### 3.2 [CURRENT] `lib/nova/store.ts` ↔ `lib/nova/constants.ts` ↔ `/api/mimo/workspace`

**Source:** Audit §2 issue #3, §12 debt #16.

**Pattern:**
- `lib/nova/store.ts` imports `INITIAL_MEMORIES` + `INITIAL_TASKS` from `lib/nova/constants.ts` (UI-side seed data).
- `/api/mimo/workspace` ALSO seeds memories (Core-side).
- Two sources of truth.

**Severity:** MEDIUM. Data inconsistency risk.

**[MIGRATION] Fix (Phase 1 + 6):**
1. Delete `INITIAL_MEMORIES` + `INITIAL_TASKS` from `lib/nova/constants.ts` (Phase 0 cleanup).
2. Seed initial memories in a Prisma migration seed script (Phase 1).
3. UI reads memories only from `/api/mimo/workspace` (which reads from Prisma via MemoryEngine — Phase 6).

### 3.3 [TARGET] Watchlist: Services ↔ AI ↔ Agents

**Risk:** Orchestrator (L4) calls Model Router (L5) → Model Router calls... Orchestrator? Only if the router itself runs an agent loop. **Prevention:** Model Router is a pure dispatch function (input → adapter → output); it never calls back into L4 or L6. Enforce via lint rule: `core/models/*` cannot import from `core/{orchestrator,planner,reasoner,validator,workflow,agents}/*`.

### 3.4 [TARGET] Watchlist: Agents ↔ Services

**Risk:** Agent (L6) calls Orchestrator (L4) which spawns Agent (L6). This is not circular at the module level (it's runtime recursion), but it can become a cycle if Agent imports Orchestrator's types and Orchestrator imports Agent's types.

**Prevention:**
- Both depend on a shared `core/agents/types.ts` (in L0/L2 boundary).
- Orchestrator imports concrete agent classes via the AgentRegistry (L2), not directly.
- Lint rule: `core/orchestrator/*` may not import from `core/agents/{Planner,Researcher,Builder,Reviewer,Verifier}Agent.ts` directly — only via `core/agents/registry.ts`.

---

## 4. Forbidden dependencies

These imports MUST NOT exist. CI lint rule (Phase 0) forbids them.

### 4.1 Provider SDKs outside adapter layer

**Rule:** `z-ai-web-dev-sdk`, `openai`, `@anthropic-ai/sdk`, `ollama`, or any AI provider SDK may be imported ONLY inside `core/models/*Adapter.ts` or `core/capabilities/*Adapter.ts` (L5).

**[CURRENT violation]** (Audit §2 issue #1, §4.1):
- `src/app/api/image/route.ts` — direct `import ... from 'z-ai-web-dev-sdk'` ❌
- `src/app/api/search/route.ts` — direct `import ... from 'z-ai-web-dev-sdk'` ❌

**[MIGRATION] Fix (Phase 4):** Route both through `core/capabilities/{image,search}` adapters.

**Lint rule:**
```js
// eslint-plugin:no-restricted-imports
"no-restricted-imports": ["error", {
  paths: [{
    name: "z-ai-web-dev-sdk",
    message: "Import only inside core/models/* or core/capabilities/*. See D4."
  }],
  patterns: [{
    group: ["openai", "@anthropic-ai/sdk", "ollama"],
    message: "Provider SDKs only inside core/models/* or core/capabilities/*. See D4."
  }]
}]
```
With an `overrides` block exempting `src/core/{models,capabilities}/**`.

### 4.2 Core engines imported by Frontend

**Rule:** `components/**` and `app/**` (except `app/api/**`) may import from `@/core` (the public surface) only — NEVER from `@/core/<engine>/<file>`.

**[CURRENT]** No violation observed (Audit §5.3 — UI goes through API routes). Locked in by lint rule.

### 4.3 Prisma client imported by Frontend

**Rule:** `lib/db.ts` (Prisma client) may be imported ONLY inside `core/**` and `app/api/**`. Frontend (`components/**`, non-API `app/**`) must never import `lib/db`.

**Reason:** Prisma client is server-side (Bible Part 27.1 — server-only). A client-side import would bundle Prisma + SQLite native module into the browser bundle.

### 4.4 `'use server'` (Server Actions) anywhere

**Rule:** Zero matches for `'use server'` in the codebase. (D25 — API-only.)

**[CURRENT]** Zero matches (Audit §5.3). Locked in.

### 4.5 Frontend `<Link>` to other routes

**Rule:** No `next/link` `<Link>` to any route other than `/`. (Bible Part 27.3 rule 5, Invariant 15.) Everything is a tab/panel/overlay.

### 4.6 `console.log` / `console.error` in production code

**Rule:** Use `core/logger.ts` only. (Bible Invariant 27.) Lint rule: `no-console: error` with override allowed inside `core/logger.ts` itself.

**[CURRENT violation]** ESLint has `no-console: off` (Audit §10.2). Must be flipped in Phase 0.

### 4.7 `any` types

**Rule:** Zero `any` types. Use `unknown` + type guards. (Bible Invariant 26.) TS config: `noImplicitAny: true` (Audit §12 debt #2 — currently false).

---

## 5. Optional dependencies

These imports are allowed but discouraged. Use only when the simpler path is insufficient.

### 5.1 TanStack Query (server state cache)

**Allowed in:** `components/**`, `hooks/**`.

**When to use:** For server state that benefits from caching + invalidation (e.g. workspace data, memory lists). For most data, use the aggregated `/api/mimo/workspace` poll (Bible Part 27.5).

**[CURRENT]** Installed but not confirmed in use (Audit §18 unknown #3). Investigation in Phase 0.

### 5.2 `react-hook-form` + `zod`

**Allowed in:** `components/**` (forms only — Settings, Composer if needed).

**When to use:** Complex forms (Settings). Not for the Composer (which is a single text input — useState suffices).

### 5.3 `@mdxeditor/editor`

**Allowed in:** `components/mimo/panels/ArtifactViewer` (markdown artifact editing).

**When to use:** Markdown artifact WYSIWYG editing (Bible Part 11.4).

### 5.4 `dnd-kit`

**Allowed in:** `components/mimo/WorkspaceTabs` (tab reordering).

**When to use:** Drag-to-reorder tabs. Not for anything else (Bible Part 27.4 — no over-engineering).

### 5.5 `recharts`

**Allowed in:** `components/mimo/panels/PersonalDashboard` (charts only).

**When to use:** Personal dashboard visualizations. Lazy-loaded (Bible Part 26.5).

### 5.6 `recharts`, `react-resizable-panels`, `vaul`, `sonner`, `cmdk`

**Allowed in:** specific components (shadcn/ui ecosystem). Each must be justified by a Bible requirement, not added speculatively.

---

## 6. External dependencies

External = anything from `node_modules`. These are categorized by risk.

### 6.1 [HIGH RISK] Provider SDKs (AI)

| Package | Where used | Risk |
|---|---|---|
| `z-ai-web-dev-sdk` | `core/models/ZAIModel.ts`, `core/capabilities/search/SearchProvider.ts` (CORRECT) + `app/api/image/route.ts`, `app/api/search/route.ts` (WRONG — Phase 4 fix) | Provider lock-in if interface leaks; security boundary. |

**Mitigation:** D4 (adapter layer); D24 (contract tests); D7 (keychain).

### 6.2 [HIGH RISK] Native module bindings

| Package | Where used | Risk |
|---|---|---|
| `@prisma/client` + `prisma` (SQLite engine) | `lib/db.ts`, `prisma/*` | Native binary; bundler must exclude from client. |
| `better-sqlite3` (if used directly — NOT today) | n/a | Only via Prisma. |

**Mitigation:** Lint rule 4.3 (no Prisma in client). Webpack/Turbopack config excludes `@prisma/client` from client bundle.

### 6.3 [MEDIUM RISK] Heavy UI dependencies

| Package | Risk |
|---|---|
| `@mdxeditor/editor` | Large bundle; lazy-load only. |
| `react-syntax-highlighter` | Large (includes all language grammars by default); use light build. |
| `recharts` | Large; lazy-load. |
| `framer-motion` | Core motion library; non-negotiable (Bible Part 27.1). |

**Mitigation:** Phase 16 lazy-load audit (Bible Part 26.5).

### 6.4 [LOW RISK] Stable, well-maintained

| Package | Notes |
|---|---|
| `next` 16 | Framework — non-negotiable. |
| `react` / `react-dom` | Bundled with Next. |
| `zustand` | State (D8). |
| `tailwindcss` 4 | Styling (Bible Part 27.1). |
| `shadcn/ui` (not a package — generated components) | UI primitives. |
| `lucide-react` | Icons. |
| `zod` | Schema validation (Bible Part 27.1). |
| `react-markdown` | Markdown rendering. |
| `cmdk` | Command palette primitive. |
| `sonner` | Toasts (Bible Part 28 — Snackbar confirmations). |
| `vaul` | Drawer. |
| `react-resizable-panels` | Panel resizing. |
| `dnd-kit` | Tab reorder. |
| `react-hook-form` | Forms. |

### 6.5 [TO REMOVE] Dead / unused dependencies

| Package | Why | Phase |
|---|---|---|
| `next-auth` 4.24.11 | Installed, not configured, not used (Audit §9.1, §1.1). D7 mandates removal. | Phase 0 |

### 6.6 [FUTURE] Dependencies for TARGET features

| Package | Purpose | Phase |
|---|---|---|
| `pyodide` (CDN load) | Python artifact runtime (D11) | Phase 11 |
| MCP client SDK | Plugin protocol (D10) | Phase 10 |
| `better-sqlite3` (optional) | If SQLCipher integration needs raw access | Phase 1 validation |
| Local LLM runtime (e.g. `ollama` via HTTP, or `@xenova/transformers` for in-process) | Local model support (Bible Part 7.1) | Phase 8 |
| `idb-keyval` (optional) | Client-side ephemeral cache (not canonical state) | Phase 15 if needed |

---

## 7. High-risk dependencies (focus list)

These are the dependencies most likely to cause production incidents or migration pain. Each has an explicit risk + mitigation.

### 7.1 Prisma + SQLite (single point of failure)

**Risk:** All canonical state lives in one SQLite file (`db/custom.db`). If the file corrupts, MiMo loses everything (conversations, memory, knowledge, artifacts, audit log).

**Mitigation:**
- Daily local backup (Bible Part 22.12 — Phase 12 deliverable).
- WAL mode + checkpoint on clean shutdown.
- Migration tests (Phase 1 acceptance).
- Owner can export to JSON + Markdown (Bible Part 22.10 — Phase 12 deliverable).

### 7.2 z-ai-web-dev-sdk (single AI provider today)

**Risk:** ZAI is the only registered provider (Audit §4.1). If ZAI service degrades or the SDK has a breaking change, MiMo cannot answer.

**Mitigation:**
- D4 (adapter layer) — adding a second provider is mechanical (one new adapter file + registry registration).
- Phase 8 deliverable: at least one fallback adapter (local model or OpenAI-compatible).
- Contract tests (D24) catch breaking SDK changes.

### 7.3 Next.js App Router (framework lock-in)

**Risk:** Next.js 16 App Router is relatively new; breaking changes possible in major versions.

**Mitigation:**
- D1 — framework is swappable at the `app/` layer (Core + components are framework-agnostic).
- Pin Next.js minor version; upgrade deliberately, not via `bun update`.

### 7.4 Framer Motion (motion system dependency)

**Risk:** Framer Motion 12 has had API churn between major versions.

**Mitigation:**
- Bible Part 17 — motion tokens (D20) abstract over Framer. Components use tokens, not raw Framer APIs.
- Pin major version.

### 7.5 shadcn/ui (component generation, not a package)

**Risk:** shadcn/ui copies components into the repo (not an npm dep). Updates are manual.

**Mitigation:**
- Audit §13 — KEEP full set; documented as owned components.
- Phase 16 — visual audit confirms all components conform to MiMo tokens.

### 7.6 SQLite FTS5 (extension availability)

**Risk:** FTS5 is compiled into most SQLite distributions but not all. Prisma's bundled SQLite may or may not include FTS5.

**Mitigation:**
- Phase 13 deliverable: verify FTS5 availability via `PRAGMA compile_options;` query.
- Fallback: a `LIKE`-based search adapter (slower but works) if FTS5 unavailable.

### 7.7 MCP server processes (future)

**Risk:** MCP servers run as separate local processes; if one crashes, its tools are unavailable.

**Mitigation:**
- Phase 10 deliverable: MCP client monitors server health; auto-restart on crash.
- Owner-visible status in DeveloperPanel.

---

## 8. Dependency-direction summary (cheat sheet)

| Layer | May import from | May NOT import from |
|---|---|---|
| L0 Foundation | (nothing) | everything |
| L1 Data | L0 | L2+ |
| L2 Domain | L0, L1, L2 (lateral via interface) | L3+ |
| L3 Events | L0, L1 | L2 (only via EventBus subscribers registered at boot), L4+ |
| L4 Services | L0, L2, L3, L5 | L6, L7, L8, L9 |
| L5 AI | L0, L3, external SDKs | L2 (except via L4), L4, L6, L7, L8, L9 |
| L6 Agents | L0, L2 (tools, memory), L3, L4 (Orchestrator via registry), L5 | L7, L8, L9 |
| L7 Runtime | L0, L1, L2, L3 | L4 (only via L6 calling L7), L8, L9 |
| L8 Application | L0, L2 (via `@/core`), L3, L4, L5 (via `@/core`) | L1 (direct), L6/L7 internals, L9 |
| L9 Frontend | L0 (types only), L8 (API routes only) | L1–L7 directly, provider SDKs |

---

## 9. Validation (Phase 0 deliverable)

The dependency graph is enforced by **lint rules + a custom import-boundary check**:

1. **`eslint-plugin-import` + `no-cycle`** — catches circular imports (§3).
2. **`eslint-plugin-no-restricted-imports`** — catches forbidden imports (§4).
3. **Custom `scripts/check-layering.ts`** — walks `src/`, checks every import against the §8 cheat sheet. Runs in CI (Phase 0).
4. **`bun run lint` passes clean** with strict config (Audit §10.2 — currently disabled to near-nothing).

Acceptance: zero violations after Phase 0. Every subsequent PR must keep zero.

---

## 10. Migration order (links to Roadmap)

The dependency graph defines the **build order** for the roadmap. Each phase adds one layer (or refactors an existing one) without breaking the layering:

| Roadmap Phase | Layer touched | What changes |
|---|---|---|
| 0 Foundation | L0, L8, L9 | Fix dev server, strict TS, strict lint, clean dead code. |
| 1 Persistence | L1 | Add Prisma domain schema + persistent MemoryEngine + AuditEvent table. |
| 2 Domain | L2 | Add Memory, Knowledge, Context, Artifact, Task, Agent domain models. |
| 3 Events | L3 | Persistent EventBus + audit trail. |
| 4 APIs | L8 | Route /api/image + /api/search through Core adapters + contract tests. |
| 5 Context Engine | L2 (ContextBuilder) | Deterministic policy, token budgeting, compression. |
| 6 Memory Engine | L2 (MemoryEngine) | Provenance, decay, contradiction, inspection/correction/deletion. |
| 7 Knowledge Engine | L2 (KnowledgeEngine) | Entities, relationships, graph, citations, retrieval. |
| 8 AI Runtime | L5 | Model routing, streaming, tool calling, fallback, local models. |
| 9 Agent Runtime | L6, L7 | Permissions, pause/resume, checkpoints, recovery, audit trail. |
| 10 Tools | L2 (tools), L7 (permissions) | Unified contract, permissions, risk levels, timeouts, cancellation. |
| 11 Sandbox | L7 | Artifact runtime, code execution isolation. |
| 12 Artifacts | L2 (ArtifactStore) | Storage, versioning, provenance, sharing, rollback. |
| 13 Search | L1 (FTS5), L2 (search) | FTS5, unified search, ranking, filters. |
| 14 Application | L8 | Workspace API aggregation, streaming APIs. |
| 15 UI Architecture | L9 | Split Zustand store, state boundaries, real data wiring. |
| 16 UI Implementation | L9 | MiMo OS shell refinement, panels, ExecutionTrace real events. |

---

**End of MiMo Architecture Dependencies.** Layering is binding. Violations are bugs. Migration order is fixed by the layering (lower layers ship before higher layers).
