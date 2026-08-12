# MiMo — Current System Audit
### Phase: Foundation From The Ground Up — Step 1

**Status:** REALITY AUDIT. Distinguishes [CURRENT PROJECT REALITY] / [FACT] / [INFERENCE] / [UNKNOWN].
**Date:** This session.
**Method:** Direct inspection of repository files, config, source, and live server state.

---

## 1. Current Architecture

### 1.1 Framework + Stack [CURRENT PROJECT REALITY]

- **Framework:** Next.js 16.1.1 with App Router, Turbopack, `output: "standalone"`.
- **Language:** TypeScript 5, `target: ES2017`, `strict: true` BUT `noImplicitAny: false` (weakens strictness).
- **Build config:** `next.config.ts` has `typescript: { ignoreBuildErrors: true }` and `reactStrictMode: false` — **TypeScript build errors are silently ignored**. This is significant technical debt: type errors won't block builds.
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York style) + Framer Motion 12 + lucide-react.
- **State:** Zustand (client) + TanStack Query 5 (server-state, installed but not confirmed in use).
- **Database:** Prisma 6.11 + SQLite (`db/custom.db`). Schema has only `User` + `Post` (boilerplate demo models — **NOT MiMo domain models**).
- **AI:** z-ai-web-dev-sdk 0.0.18 (server-only, wrapped behind `ZAIModel` adapter).
- **Auth:** next-auth 4.24.11 installed but **NOT configured or used** (no auth API routes, no session handling).
- **Forms:** react-hook-form + zod 4.
- **Markdown:** react-markdown + react-syntax-highlighter.
- **Other:** recharts, react-resizable-panels, sonner (toasts), vaul (drawer), cmdk (command palette), dnd-kit (drag-drop), @mdxeditor/editor.

### 1.2 Source Organization [CURRENT PROJECT REALITY]

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── route.ts       # boilerplate "Hello world" (dead code)
│   │   ├── chat/route.ts  # main chat (streaming, via Core pipeline)
│   │   ├── image/route.ts # image gen (direct ZAI call — NOT through Core)
│   │   ├── search/route.ts# web search (direct ZAI call — NOT through Core)
│   │   └── mimo/workspace/route.ts # aggregated workspace data
│   ├── globals.css        # design tokens (258 lines, but dev.log shows stale 1092-line error)
│   ├── layout.tsx
│   └── page.tsx           # renders MiMoOS shell
├── components/
│   ├── ui/                # shadcn/ui primitives (full set)
│   ├── nova/              # ORIGINAL chat UI (20 files — ChatView, Composer, Sidebar, Topbar, etc.)
│   └── mimo/              # NEW MiMo OS shell (10 files + panels/)
│       ├── MiMoOS.tsx
│       ├── LeftRail.tsx
│       ├── WorkspaceTabs.tsx
│       ├── ContextSidebar.tsx
│       ├── AgentDock.tsx
│       ├── ArtifactDock.tsx
│       ├── UniversalSearch.tsx
│       ├── DeveloperPanel.tsx
│       ├── ExecutionTrace.tsx
│       ├── hooks.ts
│       └── panels/        # TabContent, PersonalDashboard, MemoryBrowser, etc.
├── core/                  # the intelligence pipeline (15 dirs + 3 root files)
│   ├── kernel/            # boot, feature flags
│   ├── context/           # ContextBuilder
│   ├── reasoner/          # Reasoner (rule-based)
│   ├── planner/           # Planner (façade over PlannerAgent)
│   ├── orchestrator/      # Orchestrator (executes Plans)
│   ├── validator/         # Validator (final gate)
│   ├── workflow/          # WorkflowEngine (runWorkflow)
│   ├── memory/            # MemoryEngine (in-memory RAM, NOT persisted)
│   ├── models/             # ZAIModel adapter (ONLY provider)
│   ├── agents/             # 4 agents: Planner, Researcher, Memory, Writer
│   ├── tools/              # 3 tools: WebSearch, MemoryRecall, MemoryStore
│   ├── registry/           # Tool/Agent/Model registries
│   ├── events/             # EventBus (in-memory pub/sub)
│   ├── search/             # SearchProvider (ZAI adapter)
│   ├── prompts/            # PromptEngine
│   ├── types.ts            # 268 lines of canonical types
│   ├── errors.ts           # MiMoError hierarchy
│   ├── logger.ts           # createLogger
│   └── index.ts            # public API surface (40 exports)
├── hooks/                 # use-mobile.ts, use-toast.ts
└── lib/
    ├── db.ts              # Prisma client singleton
    └── nova/              # UI store (Zustand), types, constants, api, useChat, datetime
```

### 1.3 Application Shell [CURRENT PROJECT REALITY]

`src/app/page.tsx` renders `MiMoOS` from `@/components/mimo/MiMoOS`. The MiMoOS shell is: LeftRail (≤8 icons) + WorkspaceTabs (pinned conversation + spawnable) + Center (active tab) + ContextSidebar (adaptive) + AgentDock + ArtifactDock + overlays (UniversalSearch, CommandPalette, Voice, Image, Settings, Toasts, DeveloperPanel). This matches the Product Bible's Part 13 (Workspace Model) layout. [FACT — verified by reading the files]

### 1.4 Core Intelligence Pipeline [CURRENT PROJECT REALITY]

The Core has a real pipeline: `Request → ContextBuilder → Reasoner → Planner → Orchestrator → Validator → Response`. The Validator is the final gate. `/api/chat` is the ONLY chat entry point and does NOT bypass the pipeline. [FACT — verified in chat/route.ts]

**Pipeline stages (Phase 2 only — NOT the full Product Bible spec):**
- Context → Reason → Plan → Execute → Validate (5 stages, not 6 — Product Bible Part 10 specifies 6: Context→Reason→Plan→Execute→Validate→Done).

### 1.5 Current Dev Server State [CURRENT PROJECT REALITY — BROKEN]

- `curl http://localhost:3000/` returns **HTTP 500**.
- dev.log shows: `⨯ ./src/app/globals.css:1092:20 Parsing CSS source code failed` — but the actual `globals.css` file is only 258 lines. The error references a non-existent line 1092 with injected `<script>self.__next_f.push(...)` HTML content. This indicates either a stale Turbopack cache or dev.log corruption (the `tee dev.log` in the dev script captured streaming RSC payload HTML into the log file).
- **The system is currently NOT runnable.** A cache clear (`rm -rf .next`) + restart is needed to restore. [INFERENCE — not yet tested]

---

## 2. Current Dependency Graph

```
app/page.tsx
  → components/mimo/MiMoOS
    → components/mimo/LeftRail, WorkspaceTabs, ContextSidebar, AgentDock, ArtifactDock,
       UniversalSearch, DeveloperPanel, ExecutionTrace
    → components/mimo/panels/TabContent → (ChatView, PersonalDashboard, MemoryBrowser, etc.)
    → components/nova/CommandPalette, VoiceMode, ImageGenModal, SettingsModal, Toasts
    → lib/nova/store (Zustand)

app/api/chat/route.ts → core (runWorkflow, buildContext)
app/api/image/route.ts → z-ai-web-dev-sdk (DIRECT — bypasses Core) [ISSUE]
app/api/search/route.ts → z-ai-web-dev-sdk (DIRECT — bypasses Core) [ISSUE]
app/api/mimo/workspace/route.ts → core (memoryEngine, agentRegistry, toolRegistry, events)

core/
  kernel → registry → (agents, tools, models)
  workflow → reasoner, orchestrator, validator
  context → (memory, search)
  orchestrator → registry (agents)
  agents → registry (tools)
  models/ZAIModel → z-ai-web-dev-sdk (server-only)
  search/SearchProvider → z-ai-web-dev-sdk (server-only)
  All → events/EventBus, logger, types, errors
```

**Issues found:**
1. `/api/image` and `/api/search` import `z-ai-web-dev-sdk` directly — bypassing the Core's `Model` and `SearchProvider` adapters. The Product Bible Part 25 (API Architecture) forbids this: "Provider-specific logic MUST remain behind adapters."
2. The Core's `index.ts` does NOT export image or search as capabilities — they're ad-hoc API routes.
3. `lib/nova/store.ts` holds workspace tab state, but `lib/nova/constants.ts` holds `INITIAL_MEMORIES` and `INITIAL_TASKS` (seed data) that are UI-side, NOT Core-side. Two sources of truth for "initial memories" exist: `lib/nova/constants.ts` (UI) and `/api/mimo/workspace` route (Core seeds). [ISSUE — duplicated state]

---

## 3. Current Data Architecture

### 3.1 Database [CURRENT PROJECT REALITY]

- **Engine:** SQLite via Prisma.
- **Schema (`prisma/schema.prisma`):** Only `User` (id, email, name) + `Post` (id, title, content, published, authorId). This is the **boilerplate Next.js+Prisma demo schema** — it has ZERO MiMo domain models (no Project, Conversation, Message, Memory, Knowledge, Artifact, Task, Agent, etc.).
- **db/custom.db:** 24KB SQLite file exists. Likely just the demo User+Post tables.
- **Migrations:** None (`prisma/migrations/` does not exist; using `db:push` which is schema-push without migration history).

### 3.2 In-Memory State [CURRENT PROJECT REALITY]

- **MemoryEngine:** `Map<string, StoredEntry>` in RAM. **NOT persisted.** All memories lost on server restart. The code comments explicitly say: "v1.0: volatile RAM store. No Prisma, no persistence across reloads."
- **EventBus:** in-memory `Map<string, Set<EventHandler>>`. Not persisted.
- **Registries:** in-memory `Map`s for tools, agents, models. Re-built on every kernel boot.
- **Zustand store (client):** conversations, messages, tasks, memories (UI-side `INITIAL_MEMORIES`), toasts, tabs, mode, theme. All client-side, lost on hard refresh.

### 3.3 Full-Text Search [UNKNOWN — NOT IMPLEMENTED]

No FTS5, no search index. The MemoryEngine does naive `String.includes()` substring matching.

### 3.4 Vector Search / Embeddings [NOT IMPLEMENTED]

No vector store. No embeddings. Retrieval is keyword-substring only.

### 3.5 Graph Relationships [NOT IMPLEMENTED]

No knowledge graph. No entity store. `MemoryRelation` type exists but is only a type — no graph engine.

### 3.6 File Storage [NOT IMPLEMENTED]

No file upload/storage system. `upload/` folder exists but unused. No artifact storage.

### 3.7 Cache [NOT IMPLEMENTED]

No cache layer. `/api/mimo/workspace` re-queries the in-memory engine every poll.

---

## 4. Current AI Architecture

### 4.1 Provider Coupling [CURRENT PROJECT REALITY — HIGH RISK]

- **`z-ai-web-dev-sdk` is imported directly in 3 places:**
  1. `src/core/models/ZAIModel.ts` (correct — behind adapter).
  2. `src/app/api/image/route.ts` (WRONG — direct import, bypasses Core).
  3. `src/app/api/search/route.ts` (WRONG — direct import, bypasses Core).
  4. `src/core/search/SearchProvider.ts` (correct — behind adapter).
- **Only ONE provider registered:** ZAI. No local model support, no OpenAI/Anthropic, no Ollama.
- **No model routing:** single default model. Product Bible Part 7 specifies per-task model routing (cheap/fast/deep/vision/local) — NOT implemented.

### 4.2 Streaming [CURRENT PROJECT REALITY]

- `/api/chat` streams via `ReadableStream` + `setTimeout` word-by-word (server-side chunking, NOT real model streaming). The ZAIModel adapter's `stream()` method exists but `/api/chat` doesn't use it — it calls `runWorkflow()` (non-streaming) then re-chunks the final answer.

### 4.3 Tool Calling [CURRENT PROJECT REALITY — MINIMAL]

- 3 tools registered: WebSearch, MemoryRecall, MemoryStore.
- No tool calling protocol (no function-calling / structured tool use). The ResearchAgent manually invokes `web_search` — the model doesn't decide tool calls.

### 4.4 Reasoning [CURRENT PROJECT REALITY — RULE-BASED]

- Reasoner is rule-based (keyword matching for intent detection). NOT model-based reasoning. Comments say: "In v1.0 the Reasoner is rule-based. Later it can delegate to a Model."
- No toggleable reasoning per-prompt (Product Bible Part 7.4 — NOT implemented).
- No exposed chain-of-thought (Product Bible Part 21.4 — NOT implemented).

---

## 5. Current Frontend Architecture

### 5.1 Two Competing UI Shells [CURRENT PROJECT REALITY — ARCHITECTURAL DEBT]

- `components/nova/` — the ORIGINAL "Nova AI v5.0" shell (20 files: Sidebar, Topbar, ChatView, Composer, MessageItem, AnalyticsView, TasksView, MemoryView, AgentsView, PromptsView, CanvasView, ArtifactsPanel, CommandPalette, VoiceMode, ImageGenModal, SettingsModal, Toasts, icons, charts). **`NovaApp.tsx` exists but is NOT rendered** (page.tsx renders `MiMoOS`).
- `components/mimo/` — the NEW MiMo OS shell (10 files + panels/). **This is what's actually rendered.**
- **Issue:** `components/nova/` is mostly dead code. Only `ChatView`, `Composer`, `MessageItem`, `Markdown`, `CommandPalette`, `VoiceMode`, `ImageGenModal`, `SettingsModal`, `Toasts`, `icons` are reused by `components/mimo/`. The rest (Sidebar, Topbar, AnalyticsView, TasksView, MemoryView, AgentsView, PromptsView, CanvasView, ArtifactsPanel, NovaApp) are dead.
- `lib/nova/store.ts` is still named "nova" but serves the MiMo OS shell. Naming inconsistency.

### 5.2 State Management [CURRENT PROJECT REALITY]

- ONE Zustand store (`lib/nova/store.ts`, 354 lines) holds: theme, view, sidebar, conversations, input, loading, mode, model, deepThink, webSearch, palette, settings, voice, imgGen, tasks, mems, toasts, + new MiMo OS fields (devMode, rightOpen, tabs, activeTabId, currentProject, contextMode). **Monolithic — mixes UI state, conversation state, workspace state, and mode state in one store.**

### 5.3 Server/Client Boundary [CURRENT PROJECT REALITY]

- `z-ai-web-dev-sdk` is correctly kept server-side (only in `core/` + API routes). [GOOD]
- No server actions used (Product Bible Part 25 allows API-only — this is consistent).
- Client components fetch via `/api/*` routes. [GOOD]

### 5.4 Accessibility [UNKNOWN — NOT VERIFIED]

- No axe-core, no ARIA audit, no VPAT. shadcn/ui provides baseline ARIA. Not tested.

---

## 6. Current Backend Architecture

### 6.1 API Routes [CURRENT PROJECT REALITY]

| Route | Status | Through Core? |
|---|---|---|
| `GET /api` | Dead boilerplate | No |
| `POST /api/chat` | Working (streams) | YES (runWorkflow) |
| `POST /api/image` | Working | NO (direct ZAI) [ISSUE] |
| `POST /api/search` | Working | NO (direct ZAI) [ISSUE] |
| `GET /api/mimo/workspace` | Working | YES (memoryEngine, registries, events) |

### 6.2 Background Jobs / Workers / Queues [NOT IMPLEMENTED]

- No job queue, no workers, no background tasks. `mini-services/` folder is empty (.gitkeep only).
- Product Bible Part 8 (Agent Runtime — background tasks) + Part 10 (Long-Running Tasks) — NOT implemented.

### 6.3 WebSockets / SSE [NOT IMPLEMENTED]

- No WebSocket, no SSE. Client polls `/api/mimo/workspace` every 6s + AXP routes every 3-5s. (Note: AXP routes referenced in `components/mimo/hooks.ts` but `src/app/api/axp/` does NOT exist in the current project — this is a dangling reference from a prior sandbox state that was reset.)

---

## 7. Current Storage Architecture

- **SQLite:** `db/custom.db` (24KB). Demo schema only (User + Post).
- **Filesystem:** `upload/` (unused), `download/` (README only).
- **No artifact storage, no blob storage, no media storage.**
- **No backups.**

---

## 8. Current State Architecture

(Covered in §5.2 — monolithic Zustand store + in-memory Core state. No server cache, no client cache strategy, no optimistic UI framework.)

---

## 9. Current Security Posture

### 9.1 [HIGH RISK] — No Authentication

- next-auth installed but NOT configured. No session, no user identity. The `User` Prisma model exists but is unused.
- **Anyone who can reach the dev server has full access.** (Acceptable for single-user local-first, but must be documented as a known limitation.)

### 9.2 [HIGH RISK] — No Authorization / Permission System

- No tool permissions, no agent scope, no sandbox modes. Any tool can do anything.
- Product Bible Part 22 (Security) + Part 8.6 (Agent Permissions: read-only/workspace-write/danger) — NOT implemented.
- WebSearchTool makes external network requests with NO permission gate.

### 9.3 [MEDIUM RISK] — No Encryption at Rest

- SQLite database is plaintext. No SQLCipher.
- Product Bible Part 22.2 — NOT implemented.

### 9.4 [MEDIUM RISK] — No Secret Management

- `.env` contains only `DATABASE_URL`. No API keys in env (ZAI SDK doesn't require one in this env). No keychain integration.

### 9.5 [LOW RISK] — No Audit Log

- EventBus emits events but they're not persisted. No audit trail.
- Product Bible Part 22.9 — NOT implemented.

### 9.6 [LOW RISK] — No Sandboxing

- No code execution sandbox. No artifact runtime. Product Bible Part 13 (Artifact Architecture) — NOT implemented.

---

## 10. Current Testing Posture

### 10.1 [HIGH RISK] — No Tests

- `tests/` folder contains only shell scripts for Python runtime containers (not MiMo tests).
- No unit tests, no integration tests, no contract tests, no e2e tests.
- `package.json` has no `test` script.
- Verification is manual via Agent Browser (per project rules). No automated test gates beyond `bun run lint`.

### 10.2 Lint Configuration [CURRENT PROJECT REALITY — VERY PERMISSIVE]

`eslint.config.mjs` disables nearly every rule:
- `@typescript-eslint/no-explicit-any`: off
- `@typescript-eslint/no-unused-vars`: off
- `@typescript-eslint/no-non-null-assertion`: off
- `react-hooks/exhaustive-deps`: off
- `prefer-const`: off
- `no-unused-vars`: off
- `no-console`: off
- `no-debugger`: off
- + 15 more rules off.

**The linter provides almost no protection.** It will pass almost anything. This is significant technical debt.

---

## 11. Current Performance Risks

1. **No virtualization.** Conversation message list renders all messages. Will drop below 50fps at 1000+ messages. Product Bible Part 20.4 (≥50fps on 1000+ messages) — NOT met.
2. **Polling every 6s.** `/api/mimo/workspace` polled every 6s. No WebSocket. Wasteful + latent.
3. **No memoization strategy.** Markdown re-renders per message not confirmed memoized.
4. **In-memory MemoryEngine scans all entries on recall.** O(n) per query. Will degrade at 10k+ memories.
5. **No code splitting.** All components eagerly loaded. Large initial bundle.
6. **No cache.** Workspace API re-queries every poll.
7. **Dev server currently broken** (HTTP 500 — stale cache). [CURRENT PROJECT REALITY]

---

## 12. Technical Debt

| # | Debt item | Severity | Reason |
|---|---|---|---|
| 1 | `next.config.ts` ignores TypeScript build errors | HIGH | Type safety bypassed; bugs ship silently |
| 2 | `tsconfig.json` allows `noImplicitAny: false` | MEDIUM | Weakens strict mode |
| 3 | `eslint.config.mjs` disables ~25 rules | HIGH | Linter provides no protection |
| 4 | `/api/image` + `/api/search` bypass Core adapters | MEDIUM | Provider coupling; Product Bible conflict |
| 5 | `components/nova/` 60% dead code | MEDIUM | Confusing; maintenance burden |
| 6 | `lib/nova/store.ts` monolithic (354 lines, mixes concerns) | MEDIUM | Hard to maintain; no boundaries |
| 7 | Prisma schema is demo boilerplate (User+Post) | HIGH | No domain models; everything in RAM |
| 8 | MemoryEngine in RAM (not persisted) | HIGH | Data loss on restart |
| 9 | EventBus in RAM (not persisted) | MEDIUM | No audit trail |
| 10 | No authentication | MEDIUM | Acceptable for local-first, but undocumented |
| 11 | No authorization / permission system | HIGH | Any tool can do anything |
| 12 | No sandboxing for code/artifact execution | HIGH | Unsafe |
| 13 | No tests | HIGH | No automated verification |
| 14 | No virtualization | MEDIUM | Performance cliff at scale |
| 15 | No caching | LOW | Wasteful polling |
| 16 | `lib/nova/constants.ts` `INITIAL_MEMORIES` + `/api/mimo/workspace` seeds = two sources of truth | MEDIUM | Data inconsistency risk |
| 17 | Dangling AXP API references (`/api/axp/*` in hooks.ts but no routes exist) | LOW | Dead imports |
| 18 | Root folder has 15 stray PNG screenshots + 9 stray JSON files | LOW | Clutter |
| 19 | Dev server currently broken (HTTP 500) | HIGH | System not runnable |
| 20 | `MIMO_PRODUCT_SPEC.md` + `MIMO_ENGINEERING_SPEC.md` + `ENGINEERING_REPORT.md` + `UX_ARCHITECTURE_REPORT.md` + `MiMo_Design_Specification.md` are STALE (pre-Product Bible) | MEDIUM | Conflicting sources of truth |

---

## 13. Reusable Assets

| Asset | Status | Reason to keep |
|---|---|---|
| `src/core/` pipeline (kernel, context, reasoner, planner, orchestrator, validator, workflow, memory, events, registry, prompts, types, errors, logger) | KEEP + REFACTOR | Real, well-architected; needs persistence + domain models + permissions, not rewrite |
| `src/core/models/ZAIModel.ts` adapter | KEEP | Correct pattern (single import point for SDK); needs companion adapters for other providers |
| `src/core/search/SearchProvider.ts` | KEEP | Correct adapter pattern |
| `src/core/registry/` (Tool/Agent/Model registries) | KEEP | Idempotent, typed, clean |
| `src/core/events/EventBus.ts` | KEEP + EXTEND | Clean pub/sub; needs persistence (event log) |
| `src/components/ui/` (shadcn/ui full set) | KEEP | Reusable primitives |
| `src/components/nova/ChatView, Composer, MessageItem, Markdown, CommandPalette, VoiceMode, ImageGenModal, SettingsModal, Toasts, icons` | KEEP (reuse in mimo shell) | Already reused; good code |
| `src/components/mimo/` shell (MiMoOS, LeftRail, WorkspaceTabs, ContextSidebar, AgentDock, ArtifactDock, UniversalSearch, DeveloperPanel, ExecutionTrace) | KEEP + REFACTOR | Matches Product Bible; needs state-split + real data wiring |
| `src/lib/nova/store.ts` | REFACTOR (split into focused stores) | Monolithic; needs boundary |
| `src/lib/nova/useChat.ts` | KEEP | Clean streaming hook |
| `src/lib/nova/datetime.ts` | KEEP | Deterministic timestamps (hydration fix) |
| Prisma + SQLite | KEEP (engine) | Correct choice for local-first |
| Tailwind 4 + Framer Motion + Zustand + TanStack Query | KEEP | Matches Product Bible stack |

---

## 14. Replace Candidates

| Asset | Replace with | Reason |
|---|---|---|
| Prisma schema (User+Post) | Full MiMo domain schema (Project, Conversation, Message, Memory, Knowledge, Artifact, Task, Agent, Execution, etc.) | Demo boilerplate; no domain models |
| In-memory MemoryEngine | Persistent MemoryEngine (Prisma-backed) with same interface | Data loss on restart |
| `/api/image` direct ZAI import | `core/capabilities/image` adapter behind Core | Provider coupling |
| `/api/search` direct ZAI import | `core/capabilities/search` adapter (already exists as SearchProvider — route should use it) | Provider coupling |
| Rule-based Reasoner | Model-based Reasoner (optional, behind feature flag) | Limited intent detection |
| Word-by-word fake streaming in `/api/chat` | Real model streaming via ZAIModel.stream() | Fake latency; not alive |
| Monolithic Zustand store | Split: UI store + Conversation store + Workspace store + Mode store | Boundary violations |
| `eslint.config.mjs` (permissive) | Strict config (re-enable rules progressively) | No protection |
| `next.config.ts` `ignoreBuildErrors: true` | `false` (fix type errors instead) | Type safety bypassed |

---

## 15. Delete Candidates

| Asset | Reason |
|---|---|
| `src/app/api/route.ts` (Hello world) | Dead boilerplate |
| `src/components/nova/NovaApp.tsx` | Not rendered (replaced by MiMoOS) |
| `src/components/nova/Sidebar.tsx, Topbar.tsx` | Not rendered (replaced by LeftRail, WorkspaceTabs) |
| `src/components/nova/AnalyticsView, TasksView, MemoryView, AgentsView, PromptsView, CanvasView, ArtifactsPanel` | Not rendered (replaced by mimo panels) |
| `src/app/api/axp/*` references in `components/mimo/hooks.ts` | Routes don't exist (dangling) |
| Root stray PNGs (15 files: nova-*.png) | Clutter |
| Root stray JSONs (9 files: *_search.json, *_h.json) | Clutter (should be in research/) |
| `MIMO_PRODUCT_SPEC.md`, `MIMO_ENGINEERING_SPEC.md`, `ENGINEERING_REPORT.md`, `UX_ARCHITECTURE_REPORT.md`, `MiMo_Design_Specification.md` | STALE — superseded by MiMo_Product_Bible.md. Archive, don't delete. |
| `examples/websocket/` | Not used by MiMo (was a scaffold demo) |
| `tests/*.sh` (Python runtime) | Not MiMo tests |

---

## 16. Migration Risks

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | Adding Prisma domain schema requires `db:push --accept-data-loss` | Loss of demo User+Post data (acceptable — it's boilerplate) | None needed |
| 2 | Migrating in-memory MemoryEngine to Prisma-backed | Existing in-memory memories lost | Acceptable (they're seeded, not user-created) |
| 3 | Splitting Zustand store may break component selectors | UI regressions | Incremental; keep old store as façade during transition |
| 4 | Routing `/api/image` + `/api/search` through Core | Behavioral change | Adapter preserves interface |
| 5 | Re-enabling TypeScript strict + lint rules | Many existing errors surface | Fix progressively, not all at once |
| 6 | Removing dead `components/nova/` views | If anything imports them, build breaks | grep for imports first |
| 7 | Dev server broken (HTTP 500) | Cannot verify changes | `rm -rf .next` + restart first |

---

## 17. Product Bible Conflicts

| # | Product Bible requirement | Current state | Conflict |
|---|---|---|---|
| 1 | Part 5: Memory persisted, source/timestamp/delete | In-memory, no source, no persistence | CONFLICT |
| 2 | Part 6: Knowledge graph, entities, relationships, citations | NOT implemented (only MemoryRelation type) | CONFLICT |
| 3 | Part 7: Model routing (cheap/fast/deep/vision/local) | Single default model | CONFLICT |
| 4 | Part 7.4: Toggleable reasoning per-prompt | Rule-based reasoner only | CONFLICT |
| 5 | Part 8: Agent permissions (read-only/workspace-write/danger) | No permissions | CONFLICT |
| 6 | Part 8.7: Per-task-type trust ledger | Not implemented | CONFLICT |
| 7 | Part 10: Inline ExecutionTrace with real runtime motion | ExecutionTrace component exists but uses simulated timers, not real pipeline events | PARTIAL |
| 8 | Part 10.5: Per-hunk accept/reject on code diffs | Not implemented | CONFLICT |
| 9 | Part 11: Artifacts as first-class tab-able runtime objects | ArtifactDock exists but no ArtifactViewer runtime, no versioning | PARTIAL |
| 10 | Part 12: Conversation virtualization (1000+ msgs ≥50fps) | No virtualization | CONFLICT |
| 11 | Part 14: One Universal Search + prefix grammar | UniversalSearch exists; prefix grammar partial | PARTIAL |
| 12 | Part 22: Local-first + E2E + no-counters + audit log | Local-first (yes); E2E (no); counters (none); audit log (no) | PARTIAL |
| 13 | Part 24: Error recovery, one-keystroke rewind, state-edit-and-continue | Not implemented | CONFLICT |
| 14 | Part 25: API — no bypass of Core pipeline | `/api/image` + `/api/search` bypass Core | CONFLICT |
| 15 | Part 27: `noImplicitAny: false` → should be `true`; `ignoreBuildErrors: true` → should be `false` | Both misconfigured | CONFLICT |
| 16 | Part 29 (Invariant 16): No bypass of Core pipeline | 2 routes bypass | CONFLICT |
| 17 | Part 29 (Invariant 26): No `any` types | `noImplicitAny: false` allows them | CONFLICT |
| 18 | Part 29 (Invariant 27): No `console.log` in production | `no-console: off` in eslint | CONFLICT |

---

## 18. Unknowns Requiring Investigation

| # | Unknown | Why | Investigation needed |
|---|---|---|---|
| 1 | Why does dev.log show globals.css:1092 when file is 258 lines? | Stale Turbopack cache or log corruption | `rm -rf .next` + restart + verify |
| 2 | Does the ZAIModel.stream() method actually work? | Never tested (chat route doesn't use it) | Test streaming end-to-end |
| 3 | Is TanStack Query actually used? | Installed but no `QueryClient` provider found in layout.tsx | grep for `useQuery` / `QueryClient` |
| 4 | Are the `components/nova/` dead views imported anywhere? | If so, removing breaks build | grep imports |
| 5 | What's in `skills/` (71 entries)? | Not inspected | ls + assess relevance |
| 6 | Is `next-auth` configured anywhere? | No auth API routes found | grep for `next-auth` usage |
| 7 | Does the existing `/api/mimo/workspace` seeding conflict with `lib/nova/constants.ts` INITIAL_MEMORIES? | Two seed sources | Reconcile |
| 8 | What's the actual bundle size? | Not measured | `next build` + analyze |

---

## Summary

The current project is a **functional prototype with significant architectural debt**. It has a real, well-structured Core intelligence pipeline (Context→Reason→Plan→Execute→Validate) and a Product-Bible-aligned MiMo OS shell. But it has:

- **No persistence** (everything in RAM; Prisma schema is demo boilerplate).
- **No security** (no auth, no permissions, no sandbox).
- **No tests** (linter disabled to near-nothing).
- **No virtualization, no caching, no background jobs.**
- **Provider coupling** (2 routes bypass Core adapters).
- **Dead code** (60% of `components/nova/`).
- **Broken dev server** (HTTP 500, stale cache).
- **18 conflicts with the Product Bible.**

The foundation is NOT ready to carry the full MiMo vision. It needs the architecture phase (this document + 26 others) before implementation can proceed responsibly.

**Classification of current subsystems:**

| Subsystem | Status |
|---|---|
| Core pipeline (kernel→context→reasoner→planner→orchestrator→validator→workflow) | KEEP + REFACTOR (add persistence, permissions, streaming) |
| Core adapters (ZAIModel, SearchProvider) | KEEP (correct pattern) |
| Core registries + EventBus | KEEP + EXTEND (add persistence) |
| MiMo OS shell (components/mimo/) | KEEP + REFACTOR (split state, real data) |
| Reused nova components (ChatView, Composer, etc.) | KEEP |
| Dead nova components (NovaApp, Sidebar, Topbar, *View) | REMOVE |
| Prisma schema | REPLACE (full domain schema) |
| In-memory MemoryEngine | REPLACE (Prisma-backed) |
| `/api/image` + `/api/search` direct ZAI imports | REPLACE (route through Core adapters) |
| Monolithic Zustand store | REFACTOR (split) |
| eslint + tsconfig (permissive) | REPLACE (strict) |
| next.config.ts (ignoreBuildErrors) | REPLACE (fix errors, enforce) |
| Dead boilerplate (api/route.ts, AXP refs, stray files) | REMOVE |
| Stale docs (5 pre-Bible markdown files) | ARCHIVE |
