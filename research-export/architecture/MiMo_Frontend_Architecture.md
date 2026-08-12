# MiMo — Frontend Architecture

**Phase:** Foundation From The Ground Up — ARCH-D / Doc 1 of 5
**Status:** ARCHITECTURE SPECIFICATION. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible (Parts 3, 13, 14, 15, 16, 17, 18, 19, 27, 28) + MiMo_Current_System_Audit (§5).
**Scope:** Frontend only — application shell, navigation, panels, tabs, canvas, conversation, artifacts, command system, state boundaries, server/client boundary, data fetching, streaming, errors, loading, accessibility. **No UI code. No implementation.**
**Governing principle:** **The frontend is a CONSUMER of domain capabilities — it is NOT the domain layer.** Frontend renders state produced by Core; it does not own memories, knowledge, plans, agents, tools, or artifacts.

---

## 0. Executive Summary

The frontend is a single-route Next.js 16 App Router application (`src/app/page.tsx`). It renders one shell — `MiMoOS` — which is a desktop-OS-style surface: LeftRail (≤8 icons), TopBar, WorkspaceTabs (pinned + spawnable + ephemeral), a per-mode Canvas (center), a single adaptive right Sidebar (ContextSidebar), and floating docks (AgentDock, ArtifactDock). All AI surface is the Conversation (pinned tab #1). All AI actions are reachable via one keyboard grammar (⌘K palette with prefix grammar + hold-Space peek + ⌘⇧Tab Quick AI + single-key daily-5).

The frontend owns presentation, interaction, and ephemeral UI state. It does NOT own: memory truth (Core's MemoryEngine does), knowledge truth (Core's KnowledgeEngine does), conversation truth (Core's ConversationService + Prisma do), agent truth (Core's AgentRegistry does), artifact truth (Core's ArtifactService does). The frontend reflects these via server-state subscriptions (TanStack Query + Server-Sent Events).

**[CURRENT]** Today's frontend is **half-aligned**:
- The shell (`components/mimo/`) matches Product Bible Part 13 layout. [FACT — verified by Audit §1.3]
- A competing dead shell (`components/nova/NovaApp.tsx`) still exists but is not rendered. [FACT — Audit §5.1]
- State is ONE monolithic Zustand store (`lib/nova/store.ts`, 354 lines) mixing theme, view, sidebar, conversations, input, loading, mode, model, deepThink, webSearch, palette, settings, voice, imgGen, tasks, mems, toasts, devMode, rightOpen, tabs, activeTabId, currentProject, contextMode. [FACT — Audit §5.2]
- `/api/image` and `/api/search` import `z-ai-web-dev-sdk` directly, bypassing the Core adapter pattern. [FACT — Audit §1.2, §4.1]
- Two competing "initial memories" sources: `lib/nova/constants.ts` (UI) and `/api/mimo/workspace` (Core). [FACT — Audit §2 issue #3]
- No virtualization, no code splitting, no caching. [FACT — Audit §11]
- Dev server currently broken (HTTP 500, stale cache). [FACT — Audit §1.5]
- TanStack Query installed but no `QueryClient` provider found. [INFERENCE — Audit §18 #3, unverified]

**[TARGET]** The frontend is split into five state slices (UI, Workspace, Conversation, Session, Cache), consumes Core capabilities via a thin API gateway, renders from a local cache, virtualizes every long list, lazy-loads every overlay, and respects WCAG AA + reduced-motion throughout.

**[MIGRATION]** Incremental: keep `lib/nova/store.ts` as a façade delegating to the new slices during transition (Audit migration risk #3); delete dead `components/nova/` views (grep-verified first); route `/api/image` and `/api/search` through Core adapters preserving interface; add `QueryClient` provider in `layout.tsx`.

---

## 1. Application Shell — MiMoOS

### 1.1 Shell Definition [TARGET]

`MiMoOS` is the **single root component** rendered by `src/app/page.tsx`. It is the only route in the system (Product Bible Part 27.3 rule #1, Part 29 invariant #15). It composes:

| Region | Component | Role | Reference |
|---|---|---|---|
| LeftRail | `LeftRail` | ≤8 icons: 6 nav + 1 account + 1 conditional dev | Part 13.4, Part 27.3 rule #6, Part 29 invariant #2 |
| TopBar | `TopBar` | Project chip + mode selector + tabs + runtime pills (devMode only) | Part 13.4, Part 28.1 |
| WorkspaceTabs | `WorkspaceTabs` | Pinned conversation tab #1 + spawnable tabs + ephemeral tabs | Part 13.3 |
| Canvas (center) | `CanvasHost` | Per-mode surface: chat, research, code, write, build, learn, plan, analyze | Part 13.4, Part 2.3 |
| ContextSidebar (right) | `ContextSidebar` | ONE adaptive sidebar; content depends on active mode + selection | Part 13.4, Part 29 invariant #28 |
| AgentDock | `AgentDock` | Floating horizontal pipeline stepper; visible only when `loading` (agent working) | Part 13.4, Part 28.3 |
| ArtifactDock | `ArtifactDock` | Right-edge artifact list; visible only when artifacts exist | Part 13.4, Part 28.3 |
| Overlays | (see §7) | UniversalSearch, CommandPalette, QuickAI, ProjectSwitcher, Settings, Voice, ImageGen, DeveloperPanel | Part 15, Part 28.3 |

**[CURRENT]** `components/mimo/MiMoOS.tsx` exists and matches this composition. [FACT — Audit §1.3] **It is correct in shape; what it consumes is wrong** (monolithic store, mock data, two seed sources).

### 1.2 Workspace Kernel [TARGET]

The shell owns a **WorkspaceKernel** — a thin client-side orchestration that:
1. Boots the layout (restores tabs, widths, scroll, mode, cursor from `LayoutPersistence` — see §10.2).
2. Resolves the active project (`currentProject`).
3. Resolves the active tab (`activeTabId`).
4. Resolves the active mode (canvas mode).
5. Wires keyboard handlers (see §8).
6. Subscribes to Core event stream (see §9.2).
7. Hosts error boundaries at the route + panel level (see §11).

The WorkspaceKernel is **presentation only**. It has no domain logic. It dispatches user intents to the API gateway (§6) and reflects the response back into the appropriate state slice (§State Architecture).

### 1.3 Server/Client Boundary [TARGET]

| Concern | Location |
|---|---|
| `'use client'` | All shell components, panels, overlays, hooks, store |
| `'use server'` | API routes only (no Server Actions in v1 — Product Bible Part 25 allows API-only) |
| `z-ai-web-dev-sdk` | Server-only — never imported in `components/`, `hooks/`, or `lib/nova/` |
| Prisma client | Server-only — accessed via `lib/db.ts`, never in client code |
| Core engines | Server-only — UI imports only `@/core` public API surface and only the type re-exports |

**[CURRENT]** The SDK is correctly kept server-side (Audit §5.3). [FACT] The boundary is mostly right; the violations are `/api/image` and `/api/search` bypassing Core (Audit §4.1).

**[MIGRATION]** Add an ESLint rule banning `import.*z-ai-web-dev-sdk` in any path under `src/components/`, `src/hooks/`, `src/lib/nova/`. Add a second rule banning `import.*from ['"]@/core/(?!index)` from `src/components/` and `src/hooks/` (only the public re-export is allowed).

---

## 2. Navigation — LeftRail + TopBar + Tabs

### 2.1 LeftRail [TARGET]

- **Cap:** 8 icons. 6 navigation + 1 account + 1 conditional dev (devMode only). Enforced by `NavItems` array constant + runtime assertion.
- **Nav items:** Home (conversation spine), Memory, Knowledge, Files, Agents, Settings. (Exact set TBD by UX spec — [UNKNOWN until Part 13 + Part 28 reconciliation].)
- **Account icon:** always last; opens account popover.
- **Dev icon:** only rendered when `devMode === true`; toggles DeveloperPanel.
- **Behavior:** single-key daily-5 (`C`, `M`, `A`, `R`, `S`) act on rail focus targets; `Alt+1..9` switches tabs not rail items.
- **Collapse:** `⌘⇧L` collapses rail to icon-only slim rail (does not hide entirely in v1; hide entirely is v2).
- **Peek:** hold `Space` over any rail item → preview pane appears in < 100ms (Part 15.6); release → dismiss in < 80ms.

**[CURRENT]** `components/mimo/LeftRail.tsx` exists. [FACT] Cap enforcement: [UNKNOWN — not verified].

### 2.2 TopBar [TARGET]

- **Composition:** Project chip (left) + mode selector (center-left) + tabs strip (center) + runtime pills (right, devMode only) + search icon (right).
- **Project chip:** opens ProjectSwitcher overlay (`⌘P` or click). Shows recent 5 projects + create new.
- **Mode selector:** 8 modes (chat, research, code, write, build, learn, plan, analyze). Icon-only on tablet, scroll on mobile.
- **Tabs strip:** horizontal; pinned conversation has accent dot; spawnable tabs have close button; `Alt+1..9` jumps.
- **Runtime pills:** model + latency + token estimate + queue depth — ONLY when devMode. Hidden otherwise (Part 28.2).
- **No KPI grids / stat cards** in the default TopBar (Part 27.3 rule #8, Part 29 invariant #9). Runtime pills are devMode-only diagnostic, not product KPI.

**[CURRENT]** `components/mimo/WorkspaceTabs.tsx` exists; a separate `Topbar.tsx` exists in `components/nova/` but is dead. [FACT — Audit §5.1] **The TopBar role is currently split across `WorkspaceTabs` + (dead) `Topbar` — should be unified into one TopBar component in `components/mimo/`.**

### 2.3 Tabs [TARGET]

Three tab classes (Part 13.3):

| Class | Example | Closeable | Pinned indicator | Auto-archive |
|---|---|---|---|---|
| Pinned | Conversation tab #1 | NO | Accent dot | Never |
| Spawnable | Artifact, File, Memory, Knowledge, Project, Dashboard | YES (⌘W) | — | Never |
| Ephemeral | Research draft, scratch tab | YES | — | After 7 days disuse (Arc Today pattern) |

- **Layout persistence:** every tab, width, scroll, mode survives reload (Part 13.3, Part 27.3 rule #18, Part 29 invariant). Stored in `LayoutPersistence` (IndexedDB-backed).
- **`⌘T`:** opens tab-type picker.
- **`⌘W`:** closes active tab (except pinned conversation).
- **`Alt+1..9`:** switches to tab N.
- **Tab kind enum** is the single source of truth for what renders in the Canvas (see §5).

**[CURRENT]** `WorkspaceTab` type exists in `lib/nova/store.ts` (line 30) with `kind: WorkspaceTabKind`. [FACT] Ephemeral auto-archive and layout persistence: NOT implemented. [FACT — Audit §11.5, §11.6]

### 2.4 Adaptive Right Sidebar (ContextSidebar) [TARGET]

ONE right sidebar (Part 29 invariant #28). Its content adapts to:
1. **Active mode** — chat mode shows context layers + active tools; research mode shows sources + citations; code mode shows file tree + outline; write mode shows outline + style; build mode shows execution trace + logs; learn mode shows notes + glossary; plan mode shows plan tree + tasks; analyze mode shows chart config + dataset.
2. **Selection** — when an artifact/entity/memory is selected, sidebar shows its detail panel.
3. **Toggle** — `⌘B` toggles; close button dismisses; width persists per mode.
4. **Adaptive width** — draggable; min 280px, max 480px; persists.

**[CURRENT]** `components/mimo/ContextSidebar.tsx` exists. [FACT] Adaptive behavior: [PARTIAL — components/mimo/panels/* exist per-mode, but mode→panel mapping is not verified as complete].

---

## 3. Workspace Kernel — Boot Sequence [TARGET]

```
1. page.tsx renders MiMoOS ('use client')
2. MiMoOS mounts WorkspaceKernel
3. WorkspaceKernel reads LayoutPersistence (IndexedDB) → restores tabs/widths/scroll/mode
4. WorkspaceKernel resolves currentProject (default: last-used or 'default')
5. WorkspaceKernel subscribes to /api/mimo/workspace (TanStack Query, 6s) → seeds cache
6. WorkspaceKernel subscribes to /api/events (SSE) → live updates
7. WorkspaceKernel registers keyboard handlers (see §8)
8. WorkspaceKernel renders shell regions (LeftRail, TopBar, Tabs, Canvas, Sidebar, Docks, Overlays)
9. WorkspaceKernel hosts RouteErrorBoundary (catches shell-level errors)
```

**[CURRENT]** Boot is implicit in `MiMoOS.tsx` constructor logic. [FACT — needs explicit WorkspaceKernel abstraction] **No IndexedDB layout persistence today.** [FACT]

---

## 4. Panels [TARGET]

A panel is a self-contained view that can appear in:
- The Canvas (when its tab is active),
- The right Sidebar (as adaptive content),
- An overlay (when summoned),
- The AgentDock / ArtifactDock (as a dock card).

Panel registry maps `WorkspaceTabKind` → Panel component. The registry is the **only** place tab-kind → component mapping is defined. This prevents the duplicate mental model risk (Part 29 invariant #1).

```
PanelRegistry: {
  conversation  → ConversationPanel,
  artifact      → ArtifactPanel (delegates by artifactType),
  memory        → MemoryBrowserPanel,
  knowledge     → KnowledgeBrowserPanel,
  file          → FilesBrowserPanel,
  project       → ProjectWorkspacePanel,
  dashboard     → PersonalDashboardPanel,
}
```

**[CURRENT]** `components/mimo/panels/` has TabContent, PersonalDashboard, MemoryBrowser, KnowledgeBrowser, FilesBrowser, ProjectWorkspace, MiniPanels. [FACT — Audit §1.2] Mapping logic: [UNKNOWN — likely in TabContent.tsx; not verified as a single registry].

---

## 5. Canvas — Per-Mode Surface [TARGET]

The Canvas is the center region. It swaps per **mode** (not per tab — the tab selects the data, the mode selects the surface). The conversation tab is always in chat mode; artifact tabs are always in artifact mode; but a conversation can be in research/code/write/learn/plan/analyze mode (which changes the canvas + sidebar composition).

| Mode | Canvas | Conversation | Sidebar |
|---|---|---|---|
| chat | ConversationPanel (full chat) | Always present (pinned) | Context layers + active tools |
| research | ConversationPanel + ResearchSpine | Present | Sources + citations |
| code | ConversationPanel + CodeArtifactViewer | Present | File tree + outline |
| write | ConversationPanel + DocumentEditor | Present | Outline + style |
| build | ConversationPanel + ExecutionTrace inline | Present | Build log + diff hunks |
| learn | ConversationPanel + NotebookPanel | Present | Notes + glossary |
| plan | ConversationPanel + PlanTree | Present | Tasks + dependencies |
| analyze | ConversationPanel + ChartPanel | Present | Dataset + chart config |

**Per Part 13.4, v1 is single-tab-focus.** Split views are v2 (adds second model of "which tab is primary"). [PRODUCT DECISION]

**[CURRENT]** The conversation spine + canvas-per-mode architecture is correct in shape (Audit §1.3). The 8-mode decomposition: [UNKNOWN — current `contextMode` is `ChatMode` only per store.ts line 40; the 8 modes are not yet modeled].

---

## 6. Server/Client Boundary — API Gateway [TARGET]

The frontend talks to Core exclusively through a thin **API gateway** of typed routes:

| Route | Purpose | Stream? | Through Core? |
|---|---|---|---|
| `POST /api/chat` | Send message → run pipeline → stream response | YES (SSE/ReadableStream) | YES (runWorkflow) |
| `GET /api/mimo/workspace` | Aggregated workspace state snapshot | NO (polled 6s) | YES (memoryEngine, registries, events) |
| `GET /api/events` | Live event stream (ExecutionTrace updates, agent state, task completion) | YES (SSE) | YES (EventBus) |
| `GET /api/conversations` | Conversation list | NO | YES (ConversationService) |
| `GET /api/conversations/:id` | Single conversation with messages | NO | YES |
| `GET /api/memory?q=` | Memory search | NO | YES (MemoryEngine.query) |
| `GET /api/knowledge?q=` | Knowledge entity search | NO | YES (KnowledgeEngine.query) |
| `GET /api/artifacts/:id` | Artifact metadata + content | NO | YES |
| `POST /api/image` | Image generation | NO | YES (Core image capability) |
| `POST /api/search` | Web search | NO | YES (SearchProvider) |
| `POST /api/agent/:id/:action` | Approve/reject/cancel agent action | NO | YES (AgentService) |
| `POST /api/artifact/:id/accept` | Per-hunk accept/reject | NO | YES (ArtifactService) |

**Rules:**
1. UI → API routes → Core public API (`@/core/index.ts`) → Core engines. (Part 27.6)
2. UI never imports Core engines directly.
3. API routes are thin: build context, call Core, return result.
4. Core engines never import from `app/` or `components/`.
5. Every route returns a typed response (zod-validated).
6. Errors return `{ error: { code, message, retryable, traceId } }` — never raw strings.

**[CURRENT]** `/api/image` and `/api/search` bypass Core. [FACT — Audit §1.2, §4.1] **[MIGRATION]** Wrap both behind Core adapters (`core/capabilities/image`, `core/capabilities/search`). The existing `SearchProvider` is the right pattern; mirror it for image.

**[CURRENT]** `/api/events` SSE route does NOT exist. [FACT — Audit §6.3] Polling every 6s is the only live-update mechanism. **[MIGRATION]** Add `/api/events` SSE route in v1 — required for live ExecutionTrace (Part 10) and AgentDock updates (Part 8.12).

---

## 7. Conversation + Artifact Surfaces

### 7.1 Conversation Panel [TARGET]

The conversation is the **pinned tab #1** and the only AI surface (Part 29 invariant — DD-03). Composition:
- **MessageList** (virtualized — see Performance Architecture)
- **MessageItem** (with ExecutionTrace inline — Part 10.2, DD-05)
- **Composer** (input + mode toggles + attach + voice + image buttons)
- **SlashMenu** (`/` at cursor opens slash blocks — Part 15.7)
- **QuickAI** (selected text → `⌘⇧Tab` → verb menu — Part 15.5)
- **Citations** (inline numbered `[1]` — Part 21.4)

**[CURRENT]** `components/nova/ChatView.tsx`, `Composer.tsx`, `MessageItem.tsx`, `Markdown.tsx` are reused by `components/mimo/`. [FACT — Audit §5.1] These are KEEP (Audit §13). ExecutionTrace component exists but uses simulated timers, not real pipeline events. [FACT — Audit §17 conflict #7, PARTIAL]

### 7.2 Artifact Surfaces [TARGET]

Artifacts are first-class tab-able runtime objects (Part 11, Part 29 invariant). Each artifact has:
- A **type** (document, code, image, chart, diagram, table, plan, dataset — Part 11.2)
- An **ArtifactViewer** (renders the type — Part 11.4)
- A **dock card** (in ArtifactDock when minimized)
- A **provenance chain** (source, version, parent — Part 11.6)
- A **lifecycle** (draft → staged → accepted → archived — Part 11.3)
- **Per-hunk accept/reject** on code diffs (Part 11.9, DD-07)
- A **shareable URL** (Part 11.7 — v2 for external share; v1 for internal link)

**[CURRENT]** `components/mimo/ArtifactDock.tsx` + `components/mimo/panels/ArtifactViewer.tsx` exist. [FACT — Audit §1.2] No versioning, no per-hunk accept/reject, no provenance chain. [FACT — Audit §17 conflict #9, PARTIAL]

### 7.3 AgentDock [TARGET]

Floating horizontal pipeline stepper showing the active agent's pipeline stages (Context → Reason → Plan → Execute → Validate → Done). Visible only when `loading === true` (agent working). Hidden when idle — no static agent cards (Part 28.3, DD-06).

**[CURRENT]** `components/mimo/AgentDock.tsx` exists. [FACT] Pipeline stages: 5 (not 6 — missing `Done`). [FACT — Audit §1.4] Simulated timers, not real events. [FACT — Audit §17 conflict #7]

---

## 8. Command System [TARGET]

The keyboard language (Part 15.2):

| Shortcut | Action | Open Target |
|---|---|---|
| `⌘K` | Command Palette (prefix grammar: `>cmd`, `/search`, `@mem`, `#file`, `!ai`) | CommandPalette overlay |
| `⌘/` | Universal Search (one input, all kinds) | UniversalSearch overlay |
| `⌘⇧Tab` | Quick AI on selection (rewrite/explain/translate/summarize/expand) | QuickAI overlay |
| hold `Space` | Peek at hovered rail/sidebar item | Peek overlay |
| `⌘P` | Project switcher | ProjectSwitcher overlay |
| `⌘T` | New tab (tab-type picker) | TabTypePicker overlay |
| `⌘W` | Close tab (not pinned) | — |
| `⌘B` | Toggle right sidebar | — |
| `⌘⇧L` | Toggle left rail collapse | — |
| `⌘⇧D` | Toggle devMode | — |
| `Alt+1..9` | Switch to tab N | — |
| `C` | New conversation (single-key) | — |
| `M` | Open Memory tab | — |
| `A` | Open Agents / AgentDock | — |
| `R` | Switch to Research mode | — |
| `S` | Open Settings | — |
| `/` (in composer) | Slash block menu | SlashMenu inline |
| `Esc` | Close any overlay | — |
| `Esc Esc` | Rewind last agent action | — |

**Rules:**
1. Cap at 2 modifiers max. No 3-modifier hotkeys (Part 27.3 rule #15, Part 29 invariant #11).
2. Single keyboard grammar (Part 29 invariant #32).
3. ONE palette with prefix grammar — NOT separate ⌘K + ⌘/ (research finding, Part 14.4). ⌘K and ⌘/ open the same overlay with different default prefixes.

**[CURRENT]** `components/nova/CommandPalette.tsx` exists and is reused. [FACT — Audit §5.1] Prefix grammar: [PARTIAL — Audit §17 conflict #11]. QuickAI / hold-Space / `Esc Esc` rewind: NOT implemented. [FACT — Audit §17]

### 8.1 CommandRegistry [TARGET]

A single `CommandRegistry` (in `lib/mimo/commands.ts`) registers all commands with their:
- `id`, `label`, `icon`, `shortcut`, `category` (global / context), `handler`, `visible` predicate.

The CommandPalette and all single-key shortcuts read from this registry. No shortcut is hard-coded in a component. This is the **only** source of truth for keyboard bindings.

**[CURRENT]** No registry. Shortcuts are likely scattered across components. [INFERENCE — needs verification]

---

## 9. Data Fetching + Caching + Streaming

### 9.1 Data Fetching Strategy [TARGET]

| Data | Mechanism | Cache | Invalidation |
|---|---|---|---|
| Workspace snapshot (memories, agents, tools, recent activity) | TanStack Query `useQuery(['workspace'])`, 6s refetch | 6s TTL | On event stream invalidation |
| Conversation list | TanStack Query `useQuery(['conversations'])` | staleTime 60s | On conversation create/delete |
| Single conversation messages | TanStack Query `useQuery(['conversation', id])` | staleTime ∞ (immutable append-only) | On message append (event stream) |
| Memory search results | TanStack Query `useQuery(['memory', q])` | staleTime 6s | On memory create/update |
| Knowledge entity search | TanStack Query `useQuery(['knowledge', q])` | staleTime 6s | On knowledge graph change |
| Artifact content | TanStack Query `useQuery(['artifact', id])` | staleTime ∞ (immutable; versioned) | On artifact version bump |
| Agent state | SSE event stream → store update | n/a | n/a |

**Principle:** Local-first (Part 20.1, Part 29 invariant #34). The cache is the **read model**; the server is the **write model**. UI reads from cache, never blocks on network.

### 9.2 Event Stream (SSE) [TARGET]

`GET /api/events` returns a Server-Sent Events stream subscribed to Core's EventBus. Events:
- `pipeline.stage` (Context→Reason→Plan→Execute→Validate→Done)
- `agent.state` (idle / planning / executing / awaiting_approval / done / failed)
- `task.completed` (background task finished)
- `memory.created` / `memory.updated` / `memory.decayed`
- `knowledge.entity_added` / `knowledge.relation_added`
- `artifact.versioned`
- `conversation.message_appended`

Each event carries a `traceId` for cross-referencing with the audit log (Part 21.3).

The frontend's `useEventStream()` hook subscribes and dispatches to the relevant TanStack Query cache invalidator + Zustand store slice.

**[CURRENT]** No SSE. [FACT — Audit §6.3] Client polls every 6s — wasteful and latent. [FACT — Audit §11.2]

### 9.3 Streaming — Chat [TARGET]

`POST /api/chat` returns a `ReadableStream` of:
1. `pipeline.stage` events (ExecutionTrace updates)
2. `token` chunks (real model streaming via `ZAIModel.stream()`)
3. `tool_call` events (when agent invokes a tool)
4. `tool_result` events (when tool returns)
5. `validation` events (Validator gates)
6. `done` event with final sanitized answer

The frontend `useChat()` hook (currently in `lib/nova/useChat.ts` — KEEP, Audit §13) consumes this stream and:
- Appends pipeline.stage events to the active message's ExecutionTrace.
- Appends token chunks to the streaming message body.
- Shows tool_call / tool_result inline.
- On `done`, persists the final message to the conversation cache.

**[CURRENT]** `/api/chat` calls `runWorkflow()` (non-streaming) then re-chunks the final answer word-by-word with `setTimeout`. [FACT — Audit §4.2] **This is fake streaming — it adds artificial latency and is not alive.** [MIGRATION] Switch to `ZAIModel.stream()` end-to-end. Audit Unknown #2 flags that `ZAIModel.stream()` is untested.

### 9.4 Optimistic Updates [TARGET]

Per Part 20.7. Optimistic UI for instant actions:
- **Send message:** append to conversation immediately; revert on error.
- **Toggle (deepThink, webSearch, sidebar, devMode):** flip immediately; revert on error.
- **Delete (memory, conversation, artifact):** remove immediately; show undo toast (2.6s); revert on undo.
- **Approve/reject hunk:** apply immediately; revert on error.

Implementation: TanStack Query `useMutation` with `onMutate` (optimistic write) + `onError` (rollback) + `onSettled` (invalidate).

**[CURRENT]** No optimistic UI. [FACT — Audit §11] Optimistic UI is part of the migration.

### 9.5 Caching Rules [TARGET]

- **Workspace API response:** 6s TTL (Part 26.4). Invalidation on event stream.
- **Knowledge retrieval:** 6s TTL per query (Part 26.4).
- **UserModel:** cached, invalidated on graph change (Part 26.4).
- **Conversation messages:** immutable append-only; infinite staleTime.
- **Artifact content:** immutable per version; infinite staleTime; new version = new query key.
- **No cache for:** auth state (single-user local-first, no auth in v1 — Audit §9.1).

---

## 10. Layout Persistence + Recent Work [TARGET]

### 10.1 Recent Work [TARGET]

"Recent" section in ProjectSwitcher shows last 5 projects (Part 13.7). Backed by `ProjectService.listRecent()` in Core.

### 10.2 Layout Persistence [TARGET]

Every tab, width, scroll, mode, cursor survives reload (Part 13.7, Part 27.3 rule #18, Part 29 invariant). Stored client-side in IndexedDB (via `idb-keyval` or similar — single dependency). Schema:

```
LayoutRecord: {
  version: 1,
  activeProjectId: string,
  activeTabId: string,
  tabs: [{ id, kind, title, payload, width, scrollX, scrollY }],
  mode: ChatMode,
  rightOpen: boolean,
  rightWidth: number,
  railCollapsed: boolean,
  cursor: { conversationId, messageId, charOffset }
}
```

Saved on: tab open/close, width drag end, scroll debounced (250ms), mode switch, project switch. Restored on boot (WorkspaceKernel step 3).

**[CURRENT]** No layout persistence. [FACT — Audit §11] Hard refresh loses everything.

---

## 11. Error Boundaries [TARGET]

Per Part 27.8:
1. **RouteErrorBoundary** wraps `MiMoOS`. Catches shell-level errors. Falls back to a calm error screen with "Reload" + "Open DeveloperPanel" + "Send diagnostic to Core logger" buttons. Never crashes the whole app.
2. **PanelErrorBoundary** wraps each Canvas panel + each Sidebar panel. Catches panel-level errors. Falls back to an inline error card with retry.
3. **MessageErrorBoundary** wraps each MessageItem. Catches rendering errors (e.g., malformed markdown). Falls back to raw text.
4. **StreamErrorBoundary** wraps the streaming chat. On stream error, shows retry button + keeps partial response.

**Rules (Part 29 invariant #8, #24):**
- No silent failures. Every error is inline + actionable + explainable.
- No modal error blocks. Always dismissable inline.
- Errors carry `traceId` for cross-referencing with audit log.
- Errors never crash the whole app.

**[CURRENT]** No error boundaries. [INFERENCE — needs verification; not mentioned in Audit §5] **[MIGRATION]** Add three boundary components in `components/mimo/boundaries/`.

---

## 12. Loading States [TARGET]

Per Part 20.5:
1. **Inline ExecutionTrace** for AI work (not spinner — Part 29 invariant #23). Shows pipeline stages progressing with real runtime motion.
2. **Skeleton** (gray placeholder, same shape as final content, 1.5s pulse, reduced-motion respected) for data loading. Used for conversation list, memory list, knowledge grid.
3. **Optimistic UI** for instant actions (§9.4).
4. **Progress bar** (weighted, with ETA when estimable) for long tasks.
5. **No spinner** for AI work (Part 29 invariant #23).

**[CURRENT]** Skeleton: [UNKNOWN — not verified]. ExecutionTrace: simulated timers. [FACT — Audit §17 conflict #7]

---

## 13. Accessibility Architecture [TARGET]

Per Part 19 + Part 27.9:

### 13.1 Keyboard [TARGET]
- Every action reachable in ≤ 2 modifiers (Part 19.1, Part 29 invariant #11).
- Tab order is logical.
- `Esc` closes overlays.
- Focus trapped in modals (Tab cycles within).
- `Esc Esc` rewinds last agent action.

### 13.2 Focus Management [TARGET]
- 2px accent outline + 2px offset. Always visible on keyboard nav. Never removed.
- Focus restoration: when overlay closes, focus returns to trigger.
- Focus trap: modals trap focus.

### 13.3 ARIA [TARGET]
| Region | Role | Live region |
|---|---|---|
| Overlays (CommandPalette, UniversalSearch, Settings) | `role="dialog"` + `aria-modal="true"` + focus trap | — |
| WorkspaceTabs | `role="tablist"` + `role="tab"` + `aria-selected` | — |
| ExecutionTrace | `role="status"` + `aria-live="polite"` | Yes |
| Errors | `role="alert"` + `aria-live="assertive"` | Yes |
| Streaming message | `aria-live="polite"` | Yes |
| Icon buttons | `aria-label` always | — |
| Form inputs | label always | — |

### 13.4 Contrast [TARGET]
- WCAG AA guaranteed via paired foreground tokens (Part 16.5, Part 19.5, Part 27.3 rule #14).
- Every background has a paired foreground with guaranteed AA contrast.
- [VALIDATION REQUIREMENT — axe-core in CI (Part 19.11). Not yet verified.]

### 13.5 Reduced Motion [TARGET]
- `prefers-reduced-motion: reduce` → disable all non-essential motion (Part 19.6, Part 29 invariant #13).
- ExecutionTrace announces stage transitions via ARIA live region (not animation).
- Framer Motion `useReducedMotion()` hook drives conditional animation.

### 13.6 Touch Targets [TARGET]
- 44px minimum (Apple rule — Part 18.6, Part 19.7, Part 27.3 rule #13).

### 13.7 Zoom + Reflow [TARGET]
- Zoom to 200% supported.
- Reflow at 400% (no horizontal scroll) (Part 19.8).

### 13.8 Cognitive [TARGET]
- Calm default (no clutter).
- Progressive disclosure.
- One model per dimension.
- Clear empty states (icon + headline + hint).
- Actionable errors.

**[CURRENT]** shadcn/ui provides baseline ARIA. [FACT — Audit §5.4] No axe-core, no ARIA audit, no VPAT. [FACT — Audit §5.4, §10.2] **[MIGRATION]** Add `@axe-core/playwright` (or `jest-axe` for unit level) in testing pipeline. See Testing Architecture.

---

## 14. Frontend State Boundaries (summary — full spec in MiMo_State_Architecture.md) [TARGET]

The frontend owns **five state slices**, NOT one monolithic store:

| Slice | Owner | Concerns | Persistence |
|---|---|---|---|
| UIState | Zustand `useUIStore` | theme, sidebar open, rightOpen, rightWidth, railCollapsed, devMode, overlay open/close, palette query | IndexedDB (layout) |
| WorkspaceState | Zustand `useWorkspaceStore` | tabs, activeTabId, currentProject, mode | IndexedDB (layout) |
| ConversationState | TanStack Query | conversations list, active conversation messages, streaming message | Core (source of truth) |
| SessionState | Zustand `useSessionStore` | active model, deepThink, webSearch, context mode, composer input | In-memory (ephemeral) |
| CacheState | TanStack Query cache | workspace snapshot, memory search, knowledge search, artifacts | In-memory (TTL) |

Plus **ExecutionState** (agent pipeline stages, task progress) — derived from SSE event stream, held in Zustand `useExecutionStore`.

**Rule (Part 29 invariant #1, #35):** one model per dimension. No slice owns another slice's data. No duplicated source of truth.

**[CURRENT]** ONE monolithic `lib/nova/store.ts` (354 lines) mixes all of the above. [FACT — Audit §5.2, §8] **[MIGRATION]** Split into 5 slices; keep `lib/nova/store.ts` as a re-export façade during transition (Audit migration risk #3).

---

## 15. Code Splitting + Lazy Loading [TARGET]

Per Part 27.11 + Part 26.5:
1. **Overlays lazy-loaded** (`next/dynamic` with `{ ssr: false }`): CommandPalette, UniversalSearch, QuickAI, ProjectSwitcher, Settings, Voice, ImageGen, DeveloperPanel.
2. **Tab browsers lazy-loaded:** MemoryBrowser, KnowledgeBrowser, FilesBrowser, PersonalDashboard.
3. **Heavy components lazy-loaded:** charts (recharts), graph visualizations, code editor (@mdxeditor), diff viewer.
4. **Markdown rendering** memoized per message (React.memo + content hash).
5. **Conversation messages** virtualized (windowing) — see Performance Architecture.

**[CURRENT]** No code splitting. [FACT — Audit §11.5] All components eagerly loaded.

---

## 16. Server Components vs Client Components [TARGET]

The shell is a Client Component (`'use client'`) because it owns interactive state. But the route `page.tsx` itself is a Server Component that:
1. Reads session/project context from cookies (v2 — auth not in v1).
2. Pre-fetches the workspace snapshot server-side (pass as initial TanStack Query cache).
3. Renders `<MiMoOS initialWorkspace={data} />`.

This gives first-paint < 2s (Part 20.2) with no client-side fetch waterfall.

**[CURRENT]** `page.tsx` is `'use client'` implicitly. [INFERENCE — needs verification] **[MIGRATION]** Move `page.tsx` to Server Component; pass initial data as prop.

---

## 17. Folder Structure (Frontend-only) [TARGET]

```
src/
├── app/
│   ├── api/                   # API routes (server-only, thin gateway)
│   │   ├── chat/route.ts
│   │   ├── events/route.ts    # SSE event stream
│   │   ├── conversations/
│   │   ├── memory/
│   │   ├── knowledge/
│   │   ├── artifacts/
│   │   ├── image/route.ts     # routes through Core
│   │   ├── search/route.ts    # routes through Core
│   │   ├── agent/[id]/[action]/route.ts
│   │   └── mimo/workspace/route.ts
│   ├── layout.tsx             # Server Component; QueryClientProvider; ThemeProvider; Toaster
│   ├── page.tsx               # Server Component; pre-fetch + render MiMoOS
│   └── globals.css            # design tokens (only)
├── components/
│   ├── ui/                    # shadcn/ui primitives (KEEP)
│   ├── mimo/                  # MiMo OS shell (KEEP + REFACTOR)
│   │   ├── MiMoOS.tsx
│   │   ├── WorkspaceKernel.tsx
│   │   ├── LeftRail.tsx
│   │   ├── TopBar.tsx         # NEW (unify WorkspaceTabs + dead Topbar)
│   │   ├── WorkspaceTabs.tsx
│   │   ├── ContextSidebar.tsx
│   │   ├── AgentDock.tsx
│   │   ├── ArtifactDock.tsx
│   │   ├── CanvasHost.tsx     # NEW (mode → panel dispatch)
│   │   ├── UniversalSearch.tsx
│   │   ├── CommandPalette.tsx  # MOVE from nova/ to mimo/
│   │   ├── DeveloperPanel.tsx
│   │   ├── ExecutionTrace.tsx
│   │   ├── boundaries/        # NEW: RouteErrorBoundary, PanelErrorBoundary, MessageErrorBoundary
│   │   ├── panels/            # KEEP — per-mode panels
│   │   └── hooks.ts
│   └── chat/                  # MOVE reused nova components here
│       ├── ChatView.tsx
│       ├── Composer.tsx
│       ├── MessageItem.tsx
│       ├── Markdown.tsx
│       ├── SlashMenu.tsx
│       └── QuickAI.tsx
├── hooks/
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   ├── use-event-stream.ts    # NEW
│   ├── use-chat.ts            # MOVE from lib/nova/
│   └── use-keyboard.ts        # NEW — single keyboard handler
└── lib/
    ├── db.ts
    ├── mimo/                  # RENAME lib/nova/ → lib/mimo/
    │   ├── api.ts             # typed API client
    │   ├── types.ts
    │   ├── constants.ts       # NO seed data (remove INITIAL_MEMORIES)
    │   ├── datetime.ts
    │   ├── commands.ts        # NEW — CommandRegistry
    │   ├── stores/            # NEW — state slices
    │   │   ├── ui-store.ts
    │   │   ├── workspace-store.ts
    │   │   ├── session-store.ts
    │   │   ├── execution-store.ts
    │   │   └── index.ts       # re-export façade (for transition)
    │   └── query-client.ts    # NEW — TanStack QueryClient + default options
    └── utils.ts
```

**[CURRENT]** `components/nova/` is mostly dead (60% per Audit §5.1). `lib/nova/` is the active lib. Naming is inconsistent (nova is the dead brand; mimo is the live brand).

**[MIGRATION]** Phase 1: delete dead `nova/` views (NovaApp, Sidebar, Topbar, AnalyticsView, TasksView, MemoryView, AgentsView, PromptsView, CanvasView, ArtifactsPanel) — grep-verify no imports first (Audit migration risk #6). Phase 2: move reused nova components (`ChatView`, `Composer`, `MessageItem`, `Markdown`, `CommandPalette`, `VoiceMode`, `ImageGenModal`, `SettingsModal`, `Toasts`, `icons`) to `components/chat/` or `components/mimo/`. Phase 3: rename `lib/nova/` → `lib/mimo/`. Phase 4: split monolithic store into slices.

---

## 18. Component Standards [TARGET]

Per Part 27.4, Part 27.15:
- **shadcn/ui** for primitives — do not rebuild.
- **Lucide icons** via shadcn/ui — do not mix icon families.
- **Framer Motion** for all animations — no CSS transitions for complex motion.
- **Tailwind 4** for styling — semantic tokens (`bg-background`, `text-foreground`) only — no raw values (Part 27.3 rule #14, Part 29 invariant #14).
- **Zustand** for client state — sliced (§14) — selectors only, no prop drilling.
- **TanStack Query** for server state.
- **react-hook-form** for complex forms (Settings, etc.).
- **local `useState`** for ephemeral component-local state (hover, drag-in-progress, transient input focus).

**Props typed (TypeScript interfaces). No `any` types (Part 27.3, Part 29 invariant #26).** Use `unknown` + type guard.

**[CURRENT]** `eslint.config.mjs` disables `no-explicit-any` and `no-unused-vars`. [FACT — Audit §10.2] `tsconfig.json` has `noImplicitAny: false`. [FACT — Audit §1.1] `next.config.ts` has `ignoreBuildErrors: true`. [FACT — Audit §1.1] **[MIGRATION]** Re-enable progressively (Audit migration risk #5).

---

## 19. Server/Client Data Flow — End-to-End Example [TARGET]

User sends a message in chat mode:

```
1. User types in Composer → SessionStore.input updates
2. User presses Enter → Composer dispatches sendMessage(text, mode, attachments)
3. Optimistic: ConversationStore appends user message immediately
4. API call: POST /api/chat with { text, mode, conversationId, projectId }
5. /api/chat:
   a. builds Core context (buildContext)
   b. calls runWorkflow(context)
   c. returns ReadableStream
6. Frontend useChat() consumes stream:
   a. pipeline.stage → ExecutionStore updates → ExecutionTrace renders inline
   b. token → streaming message body appends
   c. tool_call → ExecutionTrace shows tool invocation
   d. tool_result → ExecutionTrace shows result
   e. validation → ExecutionTrace shows validation
   f. done → ConversationStore commits final message
7. Background: Core's MemoryEngine may extract memories → SSE event stream → MemoryStore cache invalidated → next memory query reflects new memories
```

**[CURRENT]** Steps 1-4 happen but /api/chat doesn't stream real tokens (re-chunks final answer — Audit §4.2). Steps 6b-6d are simulated. [FACT] Step 7 does not happen (no event stream — Audit §6.3).

---

## 20. Unknowns [UNKNOWN]

| # | Unknown | Why it matters |
|---|---|---|
| 1 | Is the `contextMode` field intended to be the 8-mode enum, or just chat-mode? | store.ts line 40 types it as `ChatMode` only — needs to become the 8-mode enum. |
| 2 | Does the existing ExecutionTrace component have a real or simulated event source? | Audit says simulated timers — needs runtime verification. |
| 3 | Is the WorkspaceTabs close button accessible? | Not verified — axe-core needed. |
| 4 | What is the exact set of 6 nav rail items? | Bible Part 28.1 says "6 nav + account" but exact items are TBD by UX spec. |
| 5 | Does `components/mimo/panels/TabContent.tsx` already serve as the PanelRegistry? | Need to read its source. |
| 6 | Will `next/dynamic` lazy loading interact correctly with Framer Motion's `AnimatePresence` for overlay mount/unmount? | Common pitfall — needs implementation test. |
| 7 | Does the current `useChat` hook support SSE consumption, or only ReadableStream text? | Audit doesn't specify — needs reading `lib/nova/useChat.ts`. |
| 8 | Is there a hydration mismatch risk with server-fetched initial workspace + client-side optimistic updates? | Standard Next.js pitfall — needs test. |
| 9 | What is the layout persistence store — IndexedDB direct, idb-keyval, or Zustand persist middleware? | Decision needed — see State Architecture. |
| 10 | Does the conversation message list currently render markdown server-side or client-side? | Hydration + perf implication — needs verification. |

---

## 21. Migration Plan (Frontend)

| Phase | Action | Risk | Audit ref |
|---|---|---|---|
| F1 | Restore dev server (`rm -rf .next` + restart) | Low | §1.5, §16 #19 |
| F2 | Delete dead `components/nova/` views (grep-verify first) | Medium (build breaks if imports exist) | §5.1, §15 |
| F3 | Move reused nova components to `components/chat/` or `components/mimo/` | Low | §5.1 |
| F4 | Rename `lib/nova/` → `lib/mimo/` | Low (alias-imports during transition) | §5.2 |
| F5 | Add `QueryClientProvider` in `layout.tsx` | Low | §18 #3 |
| F6 | Wrap `/api/image` + `/api/search` behind Core adapters | Medium (behavioral change) | §4.1, §16 #4 |
| F7 | Split monolithic Zustand store into 5 slices + façade | Medium (component selectors) | §5.2, §16 #6 |
| F8 | Remove `INITIAL_MEMORIES` from `lib/nova/constants.ts`; source from Core only | Low | §2 issue #3, §16 #16 |
| F9 | Add `/api/events` SSE route + `useEventStream()` hook | Medium (new infra) | §6.3 |
| F10 | Switch `/api/chat` from fake re-chunking to real `ZAIModel.stream()` | Medium (untested method — Audit Unknown #2) | §4.2 |
| F11 | Add error boundaries (Route / Panel / Message / Stream) | Low | §11 |
| F12 | Add layout persistence (IndexedDB) | Medium (new dependency) | §11 |
| F13 | Add CommandRegistry + rewire keyboard handlers | Low | §8 |
| F14 | Add virtualization to message list (and memory/knowledge browsers) | Medium (UX tuning) | §11.1, §14 |
| F15 | Add code splitting (overlays, browsers, heavy components) | Low | §11.5 |
| F16 | Re-enable TS strict + lint rules progressively | High (many existing errors) | §1.1, §10.2, §16 #1-3 |
| F17 | Add axe-core a11y test pipeline | Medium (new tooling) | §5.4 |
| F18 | Move `page.tsx` to Server Component + pre-fetch initial workspace | Medium (hydration) | §16 |

---

## 22. Summary

The frontend is **architecturally aligned in shape, not in substance**. The shell composition matches the Product Bible; what's wrong is the wiring: a monolithic store, two competing codebases (nova dead, mimo live), Core-bypassing routes, no real streaming, no event stream, no virtualization, no caching, no error boundaries, no a11y verification, and a broken dev server.

The TARGET architecture preserves the shell shape but:
1. Splits state into 5 slices (State Architecture doc).
2. Routes all data through a thin typed API gateway to Core.
3. Replaces polling with SSE for live updates.
4. Replaces fake streaming with real `ZAIModel.stream()`.
5. Virtualizes every long list (Performance Architecture doc).
6. Lazy-loads every overlay and heavy component.
7. Adds 3 layers of error boundaries.
8. Adds layout persistence via IndexedDB.
9. Adds axe-core a11y verification (Testing Architecture doc).
10. Cleans up dead code and naming inconsistency.

**The frontend never becomes the domain layer.** Every memory, knowledge entity, conversation, artifact, agent, tool, and plan lives in Core. The frontend is a consumer.

---

**End of MiMo_Frontend_Architecture.md.**
