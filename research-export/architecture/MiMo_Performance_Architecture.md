# MiMo — Performance Architecture

**Phase:** Foundation From The Ground Up — ARCH-D / Doc 4 of 5
**Status:** ARCHITECTURE SPECIFICATION. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible (Parts 20, 26, 27 §27.11) + MiMo_Current_System_Audit (§11).
**Scope:** Performance only — budgets, what's streamed/cached/prefetched/virtualized/deferred/async, ACTUAL vs PERCEIVED performance, measurement.
**Governing principle:** **Performance is perceived.** A 50ms action that looks like a 500ms action is broken. A 500ms action that looks like a 50ms action is fine. Optimize perception first, then reality.

---

## 0. Executive Summary

**[CURRENT]** Performance is **not measured and not met**:
- No virtualization (conversation message list renders all messages). [FACT — Audit §11.1]
- No caching (workspace API re-queries every 6s poll). [FACT — Audit §11.6]
- No code splitting (all components eagerly loaded). [FACT — Audit §11.5]
- In-memory MemoryEngine does O(n) scans on recall. [FACT — Audit §11.4]
- Polling every 6s (no SSE / WebSocket). [FACT — Audit §11.2]
- Fake streaming (server re-chunks final answer word-by-word with setTimeout). [FACT — Audit §4.2]
- No memoization strategy. [FACT — Audit §11.3]
- Dev server currently broken (HTTP 500, stale cache). [FACT — Audit §1.5, §11.7]
- No bundle size measurement. [FACT — Audit §18 #8]

**[TARGET]** Performance budgets (Part 20.2):

| Metric | Target | Current |
|---|---|---|
| Cold-launch first paint | < 2s | [UNKNOWN — not measured; dev server broken] |
| ⌘K command palette first open | < 80ms | [UNKNOWN — not measured] |
| Hold-Space peek | < 100ms | NOT IMPLEMENTED |
| Project switch | < 200ms | [UNKNOWN — no project switcher yet] |
| First AI token (cached context) | < 1s | FAKE STREAMING (re-chunks final) |
| Conversation scroll (1000+ messages) | ≥ 50fps | WILL FAIL (no virtualization) |
| Modal editor blocks main editor | NEVER | N/A (no editor) |

**[TARGET]** Distinction between ACTUAL performance (what the system does) and PERCEIVED performance (what the user feels):
- **ACTUAL:** cold-launch time, server response time, query latency, bundle size, memory usage.
- **PERCEIVED:** loading states (skeletons, optimistic UI, progressive rendering), streaming, animations, motion timing, cause-and-effect threshold (Linear — < 100ms feels immediate, ≥ 100ms feels delayed — Part 20.3).

Optimize PERCEIVED first (skeletons, optimistic UI, streaming, motion). Then ACTUAL (virtualization, caching, code splitting, indexed retrieval).

---

## 1. Performance Budgets (detailed)

### 1.1 Startup Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| Cold-launch first paint (FCP) | < 2s | Server Component pre-fetches workspace snapshot; client hydrates with data; no client-side fetch waterfall |
| Time to interactive (TTI) | < 3s | Code splitting (overlays + browsers + heavy components lazy-loaded) |
| Bundle size (initial JS) | < 300KB gzipped | Code splitting; tree-shake; dynamic imports for overlays |
| Bundle size (initial CSS) | < 50KB gzipped | Tailwind 4 purge; only used tokens |
| Hydration time | < 500ms | Minimize client JS; Server Components for static content |

**[CURRENT]** No measurement. [FACT — Audit §18 #8] **[MIGRATION]** Add `next build` + `@next/bundle-analyzer`. Track in CI (Tier 3 optional).

### 1.2 Navigation Budget (Tab Switch, Project Switch, Mode Switch) [TARGET]

| Action | Target | Strategy |
|---|---|---|
| Tab switch (`Alt+1..9`) | < 16ms (one frame at 60fps) | Pre-render active + adjacent tabs; swap visibility via CSS |
| Project switch (`⌘P` → select) | < 200ms | Pre-fetch top 5 recent projects on shell mount; switch = swap active + invalidate workspace cache |
| Mode switch (canvas swap) | < 100ms | Pre-render mode-specific panels lazily on first use; cache in memory after |
| Right sidebar toggle (`⌘B`) | < 16ms | CSS visibility swap; no re-mount |
| Rail collapse (`⌘⇧L`) | < 100ms | Animate width via `transform` (not `width`); see §3.4 |

**[CURRENT]** No measurement. Tab switch likely fast (in-memory); project switch N/A (no switcher); mode switch N/A (only chat mode). [INFERENCE]

### 1.3 Search Budget [TARGET]

| Action | Target | Strategy |
|---|---|---|
| ⌘K Command Palette first open | < 80ms | Lazy-load palette component on first `⌘K`; subsequent opens instant; render from local command registry |
| ⌘/ Universal Search first open | < 80ms | Same as ⌘K |
| Search query (client-side, conversations) | < 16ms (per keystroke) | Debounce 50ms; fuzzy filter on cached conversation list; render top 50 results |
| Search query (server-side, memory) | < 200ms | Indexed FTS5 on Memory.content; cache 6s per query |
| Search query (server-side, knowledge) | < 200ms | Indexed FTS5 on KnowledgeEntity.name + aliases; cache 6s per query |
| Hold-Space peek | < 100ms | Pre-fetch rail item content on hover (debounce 50ms); render in overlay on Space hold |
| Prefix grammar filter | < 16ms | Client-side filter on command registry; no server round-trip |

**[CURRENT]** UniversalSearch component exists. [FACT — Audit §1.2] Prefix grammar: PARTIAL. [FACT — Audit §17 conflict #11] Hold-Space peek: NOT IMPLEMENTED. [FACT — Audit §17]

### 1.4 Conversation Rendering Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| First message render (from cache) | < 50ms | Render from TanStack Query cache; no server round-trip |
| Scroll (1000+ messages) | ≥ 50fps | Virtualize message list (windowing — only visible + buffer rendered); see §3.1 |
| New message append | < 16ms | Append to virtualized list; do not re-render entire list |
| Streaming token append | < 16ms per token | Append to single MessageItem; do not re-render list |
| Markdown render (per message) | < 5ms | Memoize per message (React.memo + content hash); cache rendered AST |
| Citations render | < 16ms | Inline; no separate render pass |
| ExecutionTrace render (per stage) | < 16ms | Append to trace; do not re-render message body |
| Code block syntax highlight | < 16ms per block | Lazy-highlight off main thread (web worker if needed); or `react-syntax-highlighter`'s Prism build |

**[CURRENT]** No virtualization. [FACT — Audit §11.1] Will drop below 50fps at 1000+ messages. [FACT — Audit §17 conflict #10] Markdown memoization: not confirmed. [FACT — Audit §11.3]

### 1.5 Streaming Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| First token (TTFT) | < 1s (cached context) | Real model streaming via `ZAIModel.stream()`; no fake re-chunking |
| Token throughput | ≥ 30 tokens/sec | Depends on ZAI SDK; measure + verify |
| Stream frame budget | 60fps (16ms per frame) | Batch token appends per frame (don't re-render per token); use `requestAnimationFrame` |
| Pipeline stage transition render | < 16ms | Append to ExecutionTrace; do not re-render message body |
| Stream cancellation latency | < 100ms | AbortController on `Esc` / `⌘W` |

**[CURRENT]** Fake streaming — server calls `runWorkflow()` (non-streaming) then re-chunks final answer with `setTimeout`. [FACT — Audit §4.2] This adds artificial latency AND is not alive (Part 10.1, Part 29 invariant #23). **[MIGRATION]** Switch to real `ZAIModel.stream()`. Audit Unknown #2: stream method is untested — verify first.

### 1.6 Artifact Opening Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| Artifact tab open | < 100ms | Lazy-load ArtifactViewer by type; cache rendered artifact in TanStack Query (immutable per version) |
| Artifact version switch | < 50ms | Pre-fetch adjacent versions on artifact open |
| Per-hunk diff render | < 16ms per hunk | Virtualize hunk list for large diffs; lazy-highlight |
| Code artifact render (10k lines) | < 200ms | Virtualize code lines (Monaco-style windowing) |
| Image artifact render | < 100ms | Lazy-load image; progressive if possible |
| Chart artifact render | < 200ms | Lazy-load recharts; cache rendered chart by data hash |

**[CURRENT]** ArtifactDock + ArtifactViewer exist. [FACT — Audit §1.2] No versioning, no per-hunk accept/reject. [FACT — Audit §17 conflict #9, PARTIAL]

### 1.7 Agent Execution Updates Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| AgentDock stage transition render | < 16ms | SSE event → ExecutionStore update → AgentDock re-renders single stage indicator |
| ExecutionTrace stage render | < 16ms | Append stage; do not re-render prior stages |
| Tool call render | < 16ms | Inline in ExecutionTrace |
| Tool result render | < 16ms | Inline in ExecutionTrace |
| Pending approval render | < 16ms | Push to ExecutionStore.pendingApprovals; AgentDock shows badge |
| Agent cancel latency | < 100ms | AbortController + agent.cancel() |

**[CURRENT]** No SSE. [FACT — Audit §6.3] ExecutionTrace uses simulated timers. [FACT — Audit §17 conflict #7] **[MIGRATION]** Add `/api/events` SSE + real EventBus emit at stage transitions.

### 1.8 Memory Retrieval Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| Memory recall (during context assembly) | < 200ms | Indexed FTS5 on Memory.content + Memory.type; ranked by relevance + recency + confidence |
| Memory search (user query) | < 200ms | Indexed FTS5; cache 6s per query |
| Memory store (during workflow) | < 50ms | Prisma insert; in-memory cache invalidate |
| Memory decay (background job) | < 5s for 10k memories | Batch update; runs daily |

**[CURRENT]** MemoryEngine does O(n) substring scans. [FACT — Audit §11.4] No FTS5. [FACT — Audit §3.3] No persistence. [FACT — Audit §3.2] **Will degrade at 10k+ memories.** [FACT — Audit §17 conflict #1]

### 1.9 Knowledge Retrieval Budget [TARGET]

| Sub-metric | Target | Strategy |
|---|---|---|
| Knowledge entity search | < 200ms | Indexed FTS5 on KnowledgeEntity.name + aliases; cache 6s per query |
| Knowledge graph traversal (1-hop) | < 50ms | Indexed FK on KnowledgeRelation.fromId + toId |
| Knowledge graph traversal (n-hop) | < 500ms | Recursive CTE in SQLite; cache per query |
| Knowledge consolidation (background) | < 30s for 1k entities | Batch job; runs nightly |
| GraphRAG retrieval (during context assembly) | < 500ms | Subgraph extraction + ranking |

**[CURRENT]** No knowledge graph. [FACT — Audit §3.5] `MemoryRelation` type exists but is only a type. [FACT — Audit §3.5] **[MIGRATION]** Implement KnowledgeEngine + graph tables + indexes.

---

## 2. ACTUAL vs PERCEIVED Performance [TARGET]

### 2.1 Definitions

- **ACTUAL performance:** what the system does. Measured in ms, KB, fps, requests/sec. Objective.
- **PERCEIVED performance:** what the user feels. Measured in "did it feel instant?" / "did it feel alive?" / "did it feel stuck?" Subjective.

**Rule (Part 20.3, Linear cause-and-effect):** durations < 100ms feel like responses; ≥ 100ms feel like delays. Hard rule: any reaction that should feel immediate must be < 100ms.

### 2.2 Strategy: PERCEIVED First

If ACTUAL is slow (e.g., 500ms server response), make it FEEL fast:
1. **Optimistic UI** — show the action immediately; reconcile on response.
2. **Skeleton** — show gray placeholder same shape as final content.
3. **Streaming** — show partial content as it arrives.
4. **Progressive rendering** — render from cache first; update in background.
5. **Progress bar** — show weighted progress with ETA.
6. **Inline ExecutionTrace** — show pipeline stages progressing (not spinner).

### 2.3 Examples

| Action | ACTUAL | PERCEIVED strategy | PERCEIVED result |
|---|---|---|---|
| Send message | 50ms (optimistic append) + 1000ms (TTFT) + stream | Optimistic append + inline ExecutionTrace (Context → Reason → Plan → Execute → Validate → Done) | Feels instant + alive |
| Open Memory tab | 200ms (FTS5 query) | Skeleton (gray placeholders) + progressive render from cache | Feels < 100ms |
| Switch project | 200ms (invalidate + refetch workspace) | Pre-fetched recent projects; swap instantly; background invalidate | Feels instant |
| Hold-Space peek | 50ms (hover pre-fetch) + render on Space hold | Pre-fetch on hover; render on hold | Feels < 100ms |
| Generate artifact | 5-30s (model generation) | Streaming content + weighted progress bar + ETA | Feels alive (not stuck) |
| Recall memory | 200ms (FTS5 + ranking) | Inline in ExecutionTrace "Memory: recalled 3 of 1247" | Feels instant |

---

## 3. What Can Be Streamed / Cached / Prefetched / Virtualized / Deferred / Async

### 3.1 Virtualization [TARGET — MANDATORY]

| List | Strategy | Why |
|---|---|---|
| Conversation message list | Windowing (e.g., `react-virtuoso` or `@tanstack/react-virtual`) — render only visible + 5-buffer; total scroll height maintained | 1000+ messages ≥ 50fps (Part 20.2) |
| Memory browser list | Windowing | 10k+ memories without lag (Part 26.1) |
| Knowledge entity grid | Windowing | 1k+ entities without lag (Part 26.1) |
| Files browser tree | Windowing (if flat) OR lazy-expand (if hierarchical) | TBD by Files architecture |
| Artifact hunk list (for per-hunk accept) | Windowing | Large diffs (10k+ lines) |
| Audit log (DeveloperPanel Events) | Windowing | Long-running sessions produce many events |
| Command palette results | Windowing (top 50 visible, rest virtualized) | Large command registries |
| Universal search results | Windowing (top 50 visible per kind) | Large result sets |

**[CURRENT]** None. [FACT — Audit §11.1] **[MIGRATION]** Add `@tanstack/react-virtual` (already in TanStack ecosystem — consistent with TanStack Query).

### 3.2 Caching [TARGET — MANDATORY]

| Cache | Layer | TTL | Invalidation |
|---|---|---|---|
| Workspace snapshot | Server (Core LRU) + Client (TanStack Query) | 6s | SSE event (`memory.*`, `knowledge.*`, `agent.*`, `task.*`) |
| Knowledge query results | Server (Core LRU) | 6s per query | SSE event (`knowledge.*`) |
| UserModel | Server (Core LRU) | No TTL | SSE event (`knowledge.*`) |
| Conversation messages | Client (TanStack Query) | staleTime ∞ (immutable append-only) | Append on SSE event |
| Artifact content | Client (TanStack Query) | staleTime ∞ (immutable per version) | New version = new query key |
| Memory search results | Client (TanStack Query) | 6s | SSE event (`memory.*`) |
| Conversation list | Client (TanStack Query) | 60s | On create/delete |
| Rendered markdown AST | Client (in-memory Map) | Per session | Content hash invalidation |
| Embedding (future RAG) | Server (Core LRU) | TBD | On text change |

**[CURRENT]** No cache. [FACT — Audit §11.6] **[MIGRATION]** Add Core LRU + TanStack Query cache (see State Architecture §6).

### 3.3 Prefetching [TARGET]

| Prefetch | When | What |
|---|---|---|
| Recent 5 projects | Shell mount | Project metadata (id, name, accent) |
| Adjacent conversation messages | Active conversation mount | Previous + next conversation messages |
| Top memory results | Active conversation mount | Last 50 memories for active project (for Memory browser quick open) |
| Top knowledge entities | Active conversation mount | Last 50 knowledge entities for active project |
| Hovered rail item content | Hover (debounced 50ms) | Item detail (for hold-Space peek) |
| Adjacent artifact versions | Artifact open | Previous + next version metadata |
| Command palette index | Shell mount | Full CommandRegistry (small — < 100 commands) |

**[CURRENT]** None. [FACT — Audit §11.6] **[MIGRATION]** Add `prefetch` queries in TanStack Query.

### 3.4 Streaming [TARGET]

| Stream | Mechanism | Content |
|---|---|---|
| Chat response | `ReadableStream` from `POST /api/chat` | `pipeline.stage` → `token` → `tool_call` → `tool_result` → `validation` → `done` events |
| Live events | SSE from `GET /api/events` | `pipeline.stage`, `agent.state`, `task.completed`, `memory.*`, `knowledge.*`, `artifact.versioned`, `conversation.message_appended` |
| Artifact content (during generation) | `ReadableStream` from `POST /api/artifact/generate` | `token` → `done` events |
| Agent updates | SSE (same as live events, filtered by agentId) | `agent.state`, `tool_call`, `tool_result`, `pipeline.stage` |

**[CURRENT]** Fake streaming (re-chunks final answer). [FACT — Audit §4.2] No SSE. [FACT — Audit §6.3] **[MIGRATION]** Real `ZAIModel.stream()` + SSE route.

### 3.5 Deferred / Lazy Loading [TARGET]

| Component | When loaded |
|---|---|
| CommandPalette overlay | On first `⌘K` press |
| UniversalSearch overlay | On first `⌘/` press |
| QuickAI overlay | On first `⌘⇧Tab` press |
| ProjectSwitcher overlay | On first `⌘P` press |
| Settings overlay | On first `S` press |
| Voice overlay | On first voice button click |
| ImageGen overlay | On first image button click |
| DeveloperPanel overlay | On first devMode + rail icon click |
| MemoryBrowser panel | On first Memory tab open |
| KnowledgeBrowser panel | On first Knowledge tab open |
| FilesBrowser panel | On first Files tab open |
| PersonalDashboard panel | On first Dashboard tab open |
| recharts (chart library) | On first chart artifact render |
| @mdxeditor/editor | On first code/write mode |
| diff viewer | On first per-hunk accept render |
| react-syntax-highlighter (Prism build) | On first markdown render with code block |

**Mechanism:** `next/dynamic` with `{ ssr: false }` for overlays; `React.lazy` for panels.

**[CURRENT]** No code splitting. [FACT — Audit §11.5] All components eagerly loaded.

### 3.6 Computed Asynchronously [TARGET]

| Computation | Where | When |
|---|---|---|
| Memory extraction (from conversation) | Core (MemoryAgent) | After message stream done (background) |
| Knowledge entity extraction | Core (KnowledgeEngine) | After memory stored (background) |
| Knowledge graph consolidation | Core (ConsolidationEngine) | Nightly batch |
| Knowledge graph evolution | Core (EvolutionEngine) | Nightly batch |
| Memory decay | Core (MemoryEngine.decay) | Daily batch |
| Embeddings (for RAG) | Core (EmbeddingEngine) | On memory store (async) |
| Markdown AST render | Web Worker | On message render (if heavy) |
| Code syntax highlight | Web Worker | On code block render (if heavy) |
| Fuzzy search index | Client | On conversation list change (debounced) |

**[CURRENT]** None async — all synchronous in-memory. [FACT — Audit §11.4] **[MIGRATION]** Background jobs require a job runner (TBD — simple `setInterval` in dev server process for v1; proper worker in v2).

---

## 4. Animation Performance [TARGET]

### 4.1 Animate Only Composited Properties [MANDATORY]

Per Part 20.4, Part 27.3 rule #11, Part 29 invariant #12:

- **Animate:** `transform`, `opacity` (GPU-composited — no layout trigger).
- **Sometimes OK:** `background-color`, `border-color` (paint-triggering OK for small areas).
- **NEVER animate:** `width`, `height`, `top`, `left`, `margin`, `padding` (layout-triggering — causes reflow).

**Framer Motion** uses `transform` + `opacity` by default — correct choice. Verify no custom animations use layout properties.

### 4.2 Motion Timing [TARGET]

Per Part 17.2, Part 27.3 rule #10:
- Every transition < 500ms.
- 5 motion tiers: instant (0ms) / micro (50-100ms) / short (100-200ms) / medium (200-400ms) / long (400-500ms).
- Use the shortest tier that conveys the change.

### 4.3 Reduced Motion [MANDATORY]

Per Part 19.6, Part 29 invariant #13:
- `prefers-reduced-motion: reduce` → disable all non-essential motion.
- ExecutionTrace announces via ARIA live region (not animation).
- Framer Motion `useReducedMotion()` hook drives conditional animation.

### 4.4 Frame Budget [TARGET]

- 60fps target = 16ms per frame.
- Leave 6ms for browser housekeeping → 10ms budget for JS + render.
- If a frame exceeds 16ms, drop to 30fps (33ms budget) rather than jank.

---

## 5. Bundle Size Budget [TARGET]

| Asset | Target | Strategy |
|---|---|---|
| Initial JS (gzipped) | < 300KB | Code splitting; tree-shake; dynamic imports |
| Initial CSS (gzipped) | < 50KB | Tailwind 4 purge |
| Initial HTML | < 50KB | Server-rendered shell |
| Total initial load | < 400KB | Sum of above |
| Per-overlay lazy chunk | < 50KB | Dynamic import |
| Per-panel lazy chunk | < 100KB | Dynamic import |
| recharts | < 100KB | Lazy on first chart |
| @mdxeditor/editor | < 200KB | Lazy on first editor use |
| react-syntax-highlighter (Prism) | < 50KB | Lazy on first code block |

**[CURRENT]** No measurement. [FACT — Audit §18 #8] **[MIGRATION]** Add `@next/bundle-analyzer` + report in CI.

---

## 6. Memory Usage Budget [TARGET]

| Concern | Budget | Strategy |
|---|---|---|
| Conversation messages in memory (active conversation) | < 50MB (1000 messages × 50KB avg) | Virtualize; only visible + buffer in DOM |
| TanStack Query cache | < 100MB | LRU eviction (`gcTime: 5min`); stale queries evicted |
| Streaming message body | < 1MB per message | Stream to DOM; don't accumulate in state |
| ExecutionTrace events | < 1MB per execution | Cap at 100 events; older ones persisted to DB |
| Memory search results | < 5MB per query | Cap at 50 results; virtualize |
| Knowledge search results | < 5MB per query | Cap at 50 results; virtualize |
| Audit log (DeveloperPanel) | < 10MB | Virtualize; cap visible at 1000 events |

---

## 7. Network Budget [TARGET]

| Concern | Strategy |
|---|---|
| Polling | Replace `/api/mimo/workspace` 6s poll with SSE subscription (eliminates poll); keep poll as fallback if SSE fails |
| Streaming | Use `ReadableStream` (not WebSocket — simpler; one-directional is enough) |
| SSE | One connection per client; multiplex all events |
| Pre-fetch | Pre-fetch recent 5 projects + active conversation messages on shell mount |
| Background sync | Memory extraction + knowledge consolidation run on server (not client) |
| Offline | Workspace snapshot cached client-side; works offline; syncs on reconnect |

**[CURRENT]** 6s polling. [FACT — Audit §11.2] Wasteful — every 6s, even if no changes.

---

## 8. Measurement Strategy [TARGET]

### 8.1 Continuous Measurement (Tier 1 — automated)

- `next build` reports bundle size.
- `@next/bundle-analyzer` visualizes bundle composition.
- Vitest benchmarks for Core engine methods (memory recall, knowledge search, context assembly).
- Lighthouse CI (Tier 3 optional) for LCP, FID, CLS.

### 8.2 Manual Measurement (Tier 2 — Agent Browser)

- Chrome DevTools Performance tab — record scroll / stream / mode switch; verify ≥ 50fps.
- Chrome DevTools Network tab — verify no polling; verify SSE active.
- Chrome DevTools Memory tab — verify no leak over 1-hour session.
- Agent Browser golden path timing (Part 20.2 targets).

### 8.3 Metrics to Track

| Metric | Tool | Frequency |
|---|---|---|
| Cold-launch FCP | Lighthouse / manual | Every release |
| Bundle size | `next build` | Every commit |
| ⌘K open time | Manual (Agent Browser) | Every release |
| Hold-Space peek | Manual (Agent Browser) | Every release |
| Project switch | Manual (Agent Browser) | Every release |
| First token (TTFT) | Manual (Agent Browser) | Every release |
| 1000+ messages fps | Manual (Chrome DevTools) | Every release |
| Memory recall latency | Vitest benchmark | Every commit |
| Knowledge search latency | Vitest benchmark | Every commit |
| Context assembly latency | Vitest benchmark | Every commit |

---

## 9. Performance Pitfalls to Avoid [TARGET — forbidden]

1. **Layout-thrashing animations** — animating `width`, `height`, `top`, `left`, `margin`, `padding` causes reflow. Use `transform` + `opacity`.
2. **Synchronous O(n) scans on every keystroke** — debounce 50ms; index; cache.
3. **Re-rendering entire list on append** — use virtualization; append only.
4. **Polling when streaming is available** — SSE > polling.
5. **Fake streaming** (re-chunking final answer) — use real model streaming.
6. **Eager loading all components** — code split; lazy-load.
7. **No memoization** — `React.memo` for MessageItem, Markdown render, panel components.
8. **No virtualization for long lists** — message list, memory, knowledge, files.
9. **Spinners for AI work** — inline ExecutionTrace (Part 29 invariant #23).
10. **Blocking main thread on heavy computation** — use Web Workers (markdown AST, syntax highlight, fuzzy search index).
11. **Unbounded memory growth** — LRU eviction on caches; cap visible items.
12. **No pre-fetching** — pre-fetch recent projects, adjacent messages, hovered items.
13. **Synchronous DB queries in request path** — index everything; cache; async.
14. **No skeleton states** — show gray placeholders, not blank.
15. **No optimistic UI** — show action immediately; reconcile on response.

---

## 10. Performance Migration Plan

| Phase | Action | Risk | Audit ref |
|---|---|---|---|
| P1 | Restore dev server (`rm -rf .next` + restart) | Low | §1.5, §11.7 |
| P2 | Add `@next/bundle-analyzer` + measure current bundle | Low | §18 #8 |
| P3 | Add `@tanstack/react-virtual` + virtualize conversation message list | Medium (UX tuning) | §11.1, §17 conflict #10 |
| P4 | Add `@tanstack/react-query` cache with proper keys + invalidation | Low | §11.6, §18 #3 |
| P5 | Add Core server cache layer (LRU + TTL) | Medium | §3.7 |
| P6 | Replace `/api/mimo/workspace` 6s poll with SSE (`/api/events`) | Medium (new infra) | §6.3, §11.2 |
| P7 | Switch `/api/chat` from fake re-chunking to real `ZAIModel.stream()` | Medium (untested method) | §4.2, Unknown #2 |
| P8 | Add `next/dynamic` lazy loading for overlays + panels + heavy components | Low | §11.5 |
| P9 | Add `React.memo` for MessageItem, Markdown, panel components | Low | §11.3 |
| P10 | Add Prisma indexes (FTS5 on Memory.content, KnowledgeEntity.name; FK indexes) | Medium (schema change) | §3.3, §3.5 |
| P11 | Add background job runner (for memory decay, knowledge consolidation) | Medium (new infra) | §6.2 |
| P12 | Add pre-fetching (recent projects, adjacent messages, hovered items) | Low | §11.6 |
| P13 | Add `requestAnimationFrame` batching for streaming token appends | Low | §1.5 |
| P14 | Add Web Worker for markdown AST + syntax highlight (if profiling shows need) | Medium | §1.4 |
| P15 | Move `page.tsx` to Server Component + pre-fetch initial workspace | Medium (hydration) | Frontend §16 |
| P16 | Add Lighthouse CI (Tier 3 optional) for LCP / FID / CLS tracking | Low | §18 #8 |
| P17 | Add Vitest benchmarks for Core engine methods | Low | §11.4 |

---

## 11. Unknowns [UNKNOWN]

| # | Unknown | Why it matters |
|---|---|---|
| 1 | What's the actual cold-launch time today? | Dev server is broken (Audit §1.5) — can't measure until fixed. |
| 2 | What's the actual bundle size? | Not measured (Audit §18 #8). |
| 3 | Does `ZAIModel.stream()` actually work? | Untested (Audit Unknown #2). Need to verify before P7. |
| 4 | What's the actual TTFT for the ZAI SDK? | Need to measure end-to-end. |
| 5 | Will `@tanstack/react-virtual` work with the existing ChatView component? | Need to refactor ChatView's message list to virtualize. |
| 6 | Will SSE work behind corporate proxies / VPNs? | Standard SSE doesn't always; may need long-poll fallback. |
| 7 | Will FTS5 be available in the SQLite build Prisma ships? | Standard SQLite has FTS5 since 3.9.0; Prisma's bundled SQLite should have it. Verify. |
| 8 | How much memory does a 1000-message conversation actually use? | Need to measure with Chrome DevTools. |
| 9 | Will the Web Worker for markdown add more overhead than it saves? | Need to profile. |
| 10 | What's the right TTL for the workspace cache (6s vs 3s vs 10s)? | 6s per Part 20.11 — but verify with usage. |
| 11 | Should we use `react-virtuoso` (more features, larger) or `@tanstack/react-virtual` (smaller, more manual)? | TanStack is consistent with TanStack Query; prefer it unless virtuoso's features are needed. |
| 12 | Will the existing Framer Motion animations use only `transform` + `opacity`? | Need to audit existing motion components. |

---

## 12. Summary

**[CURRENT]** Performance is unmeasured and largely unmet. No virtualization, no caching, no code splitting, fake streaming, O(n) memory scans, 6s polling, broken dev server.

**[TARGET]** Performance budgets for every critical action (startup, navigation, search, conversation, streaming, artifact, agent, memory, knowledge). Distinct ACTUAL vs PERCEIVED performance — optimize perception first (skeletons, optimistic UI, streaming, motion), then reality (virtualization, caching, code splitting, indexed retrieval).

**Key targets (Part 20.2):**
- Cold-launch < 2s.
- ⌘K < 80ms.
- Hold-Space < 100ms.
- Project switch < 200ms.
- First token < 1s.
- 1000+ messages ≥ 50fps.

**[MIGRATION]** 17 phases (§10). Highest-risk: P3 (virtualization — UX tuning), P6 (SSE — new infra), P7 (real streaming — untested method), P10 (Prisma indexes — schema change), P11 (background jobs — new infra).

The performance architecture is **consumer-driven**: the frontend renders from cache, streams real tokens, virtualizes long lists, lazy-loads heavy components, and shows skeletons + optimistic UI for perceived speed. The Core indexes memory + knowledge, caches query results, and runs background jobs for decay + consolidation.

---

**End of MiMo_Performance_Architecture.md.**
