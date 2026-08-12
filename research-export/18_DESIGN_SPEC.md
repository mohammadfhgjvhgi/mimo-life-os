# MiMo — Complete Design Specification
### Product Research → Synthesis → Information Architecture → Interaction Model → Visual Hierarchy → Design Spec

**Status:** PROPOSED — awaiting approval before any implementation.
**Method:** Empirical UX research of 25 AI products + 3 design systems (web-verified, 2024–2025 sources), cross-product synthesis, then original design. No copying.
**Research archive:** `/home/z/my-project/research/research-group-{A,B,C,D,E}.md` (2,639 lines total, ~250KB, ~80 verified source URLs).

---

## PART 1 — RESEARCH FOUNDATION

### 1.1 What was studied (25 products + 3 design systems)

| Group | Products |
|---|---|
| **A. Chat assistants** | ChatGPT, Claude, Google Gemini, GLM (Z.ai), Perplexity, Genspark |
| **B. AI coding agents** | Cursor, Windsurf, GitHub Copilot Workspace, OpenAI Codex, Continue.dev, Replit Agent, OpenHands |
| **C. AI builders** | Lovable, Bolt.new, v0, Manus |
| **D. Productivity / OS-grade** | VS Code, Raycast, Linear, Notion, Arc Browser |
| **E. Design systems** | Apple Human Interface Guidelines, Material Design 3, Microsoft Fluent 2 |

Full per-product findings (works / doesn't / unique / learn / avoid / premium / slow / overload + 11 dimension notes) are in the research archive.

### 1.2 The single most important cross-product insight

Don Syme's retrospective on GitHub Copilot Workspace (the most important document read): *"We didn't embrace chat as both the output of the coding agent and the place to give guidance."* Modern vibe-coding uses *"simpler chat-log UX that feels less structured and less laboured, making more efficient use of the developer's concentration while keeping them 'in the flow.'"*

**This independently validates MiMo's conversation-first, no-dashboards premise.** But — and this is the critical nuance — Cursor wins by being **editor-first, not chat-first**. The lesson: conversation is the *spine*, the editor/preview/artifact is the *canvas*. MiMo must be **conversation-spine + canvas-per-mode**, not conversation-only.

---

## PART 2 — COMPARISON MATRIX

### 2.1 Core philosophy matrix

| Product | Primary surface | Container model | Execution viz | Artifact model | Memory model | Premium feel (0–5) | Cognitive load (0–5↑=bad) |
|---|---|---|---|---|---|---|---|
| ChatGPT | Chat | Project (scoped memory) | Minimal spinner | Canvas (being sunset) | 2-layer (saved + ref) | 3 | 4 |
| Claude | Chat + Artifact | Project | None | Artifacts (CSP sandbox) | Context-only | 4 | 2 |
| Gemini | Chat | Gems + Drive | Deep Research live thoughts | Canvas + Deep Research doc | Search history | 3 | 4 |
| GLM / Z.ai | Chat | None (single-agent) | None | Slides + frontend | Context-only | 3 | 3 |
| Perplexity | Search answer | Collections | None | Sparkpage-style | Context-only | 4 | 3 |
| Genspark | Search answer | None | None | Sparkpage | None | 2 | 5 |
| **Cursor** | Editor + Composer | Workspace | Per-file accept/reject | Staged diff | .cursorrules | 5 | 2 |
| Windsurf | Editor + Cascade | Workspace | Real-time edit awareness | Applied edits | Auto-memory | 4 | 3 |
| Copilot WS | Structured pipeline | Task | Over-structured | Plan/spec/code | None | 2 | 5 |
| Codex | Terminal chat | Repo (AGENTS.md) | Approval storm | PR | AGENTS.md | 3 | 4 |
| Continue.dev | Sidebar chat | Workspace | None | Inline diff | None | 2 | 4 |
| Replit Agent | Chat + preview | Repl | Plan approval gate | Live app | None | 4 | 2 |
| OpenHands | Agent Canvas | Workspace | Event stream | PR | None | 3 | 3 |
| Lovable | Chat + preview | Project + Remix | Streaming cards | Live app + Visual Edits | .lovable/plan.md | 4 | 4 |
| Bolt.new | Chat + preview | Project | HMR | Live app (WebContainer) | None | 4 | 2 |
| v0 | Chat + preview | Project | Implicit | Preview/Code/Design | Fork | 3 | 5 |
| Manus | Chat + computer | Session | Live browser/terminal | Files | None | 5 | 3 |
| VS Code | Editor | Workspace | None | Tabs | None | 5 | 2 |
| Raycast | Command palette | — | None | Quick AI popover | None | 5 | 1 |
| Linear | Issue list | Team | None | Issue | None | 5 | 1 |
| Notion | Document | Workspace | None | Block | Database | 4 | 4 |
| Arc | Browser tab | Space | None | Tab | None | 4 | 3 |

### 2.2 Interaction-quality matrix (the sharp findings)

| Dimension | Premium exemplar | Slow exemplar | Cognitive-overload exemplar |
|---|---|---|---|
| Highlight → rewrite on artifact | ChatGPT Canvas contextual menu | Canvas first-open latency | ChatGPT 5 memory states to choose from |
| Live execution trace | Gemini Deep Research "shows thoughts while browsing" | Deep Research end-to-end (minutes) | Gemini model dropdown conflating model + mode |
| Source verification | Perplexity citation → side panel | Pro Search clarifying Qs (30–90s) | Perplexity 4-axis choice (Focus×Pro×LLM×Thread) |
| Per-file accept/reject | Cursor Composer staged diff | Continue 100% diff overwrites | Codex 9 mode×policy combinations |
| Real-time partnership | Windsurf rename detection; Replit live preview | Codex approval-prompt storms | Cursor routing-policy design |
| Live agent runtime | Manus "Computer" pane (real browser + terminal) | v0 static "waiting for generation" | Lovable 7 container concepts |
| Command palette | VS Code prefix grammar (>,/,@,#) | Notion 8 overlapping AI surfaces | Arc sidebar doing bookmarks+tabs+folders+spaces |
| Quick AI on selection | Raycast ⌘⇧Tab on selected text | Continue inline editor 5–10s lazy init | Raycast 3-modifier hotkeys |
| Hold-to-peek | Linear Space-to-peek | — | — |
| Slash blocks | Notion `/` command | — | — |

---

## PART 3 — RECURRING PATTERNS

### 3.1 Eight recurring product philosophies

| Philosophy | Exemplars | Strength | Weakness |
|---|---|---|---|
| **Conversation-first** | ChatGPT, Claude, GLM, Codex, Replit | Universal; low floor; chat IS the output | No canvas; long artifacts get unwieldy |
| **Editor-first** | Cursor, VS Code, Continue | Editor IS the AI canvas; diffs inline | High floor; not for non-code |
| **Workspace-first** | Replit, Bolt, Lovable, v0 | Project = everything (chat + preview + files) | Container concept sprawl |
| **Agent-first** | Manus, OpenHands | Feels "alive"; visible runtime | Parallel agents confuse; approval fatigue |
| **Research-first** | Perplexity, Genspark, Gemini Deep Research | Verifiable; cited | Not a working surface; read-only |
| **Execution-first** | Copilot WS, Manus | Visible pipeline; accountability | Over-structured; laboured |
| **Command-first** | Raycast, Arc, Linear | Keyboard velocity; no chrome | Not a destination; a launcher |
| **Block-first** | Notion | Composable; AI as block type | Dense; slow on long pages |

### 3.2 Convergent patterns (do these in MiMo)

1. **Structured artifact as default output** for non-trivial tasks (5/6 chat products + all builders).
2. **Real-time execution visualization** showing live runtime motion, not spinners (Gemini, Manus, Bolt HMR).
3. **Per-file / per-step accept-reject** on staged diffs (Cursor — the single biggest regression-risk reducer).
4. **Project = scoped memory + scoped context** with hard toggle (ChatGPT Aug 2025).
5. **AGENTS.md / project grounding file** read at workflow start (Codex + Cursor + Claude Code converged).
6. **Named sandbox modes** (read-only / workspace-write / danger) + **named approval policies** (untrusted / on-request / never) — Codex.
7. **Clarifying questions before long-running tasks** (Perplexity Pro, Replit).
8. **Plan as an approvable artifact**, especially for code/UI (Replit, Lovable `.lovable/plan.md`).
9. **Conversation fork + versioned artifact thumbnails** for long sessions (v0 Fork, Lovable Edit History, Manus pause/resume).
10. **Per-agent model routing + per-agent scope** (Cursor: cheap/fast for tests, deep for research).
11. **Pyodide / WASM sandbox** in the artifact viewer — treat it as a runtime, not a preview (Claude Artifacts CSP).
12. **Inline numbered citations** as default for research tasks (Perplexity, Genspark).
13. **Toggleable reasoning per-prompt** + **per-query model picker** (GLM-4.7, Perplexity).
14. **Folder-as-context** — point at a directory, ask, get a sourced answer (Gemini Drive).
15. **One command palette with prefix grammar** `>cmd /search @mem #file !ai` (VS Code + Arc + Notion converged).
16. **Single-key shortcuts for the daily 5** (Linear `C/S/A/P/L`).
17. **Hold-to-peek** on any sidebar item (Linear `Space`).
18. **Quick AI on selected text** as a verb, not a destination (Raycast `⌘⇧Tab`).
19. **Local-first rendering from cache** + background sync (Linear — the #1 perceived-performance lesson).
20. **Pinned vs ephemeral tabs** with auto-archive + one-search recovery (Arc).
21. **Per-context accent color** tinting rail + active tab (Arc per-Space).
22. **Layout persistence** across reloads — every tab, width, scroll, mode, cursor survives (VS Code).
23. **Daemon mode** — scheduled agent runs on local files without prompting (Manus recurring routines).
24. **Token-first semantic design system** — role-based tokens, never raw values (Apple + Material + Fluent all converged).
25. **5-level elevation by intent** (base / hairline / container / floating / modal).

### 3.3 Divergent anti-patterns (avoid these in MiMo)

1. **Dashboards / KPI grids / always-visible CPU graphs** — explicitly forbidden by the spec; validated as cognitive overload.
2. **Credit / quota counters** — actively punish long sessions (Genspark, Lovable, v0). MiMo is single-user local-first: never impose counters.
3. **Per-instance approval prompts** — cause fatigue (Codex, Manus). Use per-task-type trust with "Always allow this kind."
4. **Deprecating working features mid-redesign** — ChatGPT sunsetting Canvas, v0 removing Design Mode. Keep parallel versions live during transitions.
5. **Multiple overlapping AI surfaces** — Notion has 8 (chat + Q&A + autofill + summary + agent + …). MiMo: ONE AI surface (the conversation), compositional.
6. **Sidebar trying to do bookmarks + tabs + folders + spaces at once** (Arc). Keep rail ≤ 8 icons.
7. **Settings sprawl in JSON-like config** (VS Code). Direct manipulation only.
8. **3-modifier hotkeys** (Raycast). Cap at 2 modifiers.
9. **Lazy-initialization lag** (Continue inline editor 5–10s). Pre-warm all widgets.
10. **100% diff overwrites** (Continue). Always per-hunk accept/reject.
11. **Non-clickable file references in chat** (Continue). Every reference is a tab-openable link.
12. **Cloud-repo-cloning latency** (Codex Cloud, Copilot Workspace Codespace). Stay local-first.
13. **Over-structured pipeline that frustrates flow** (Copilot Workspace — Don Syme's regret). Keep it simple chat-log UX.
14. **Container concept sprawl** — Lovable (Workspace+Project+Remix+Branch+Fork+Template+Skill = 7), v0 (Preview+Code+Design+History+Fork+Version+Git+Templates = 8). MiMo: exactly ONE container (Project) + ONE branch primitive (Fork).
15. **Identity confusion** — v0 "design tool or code tool?". MiMo's identity is clear: an Operating System, conversation-first, multi-mode. Preserve that clarity; do not let any single mode become the product.
16. **Over-glass / liquid glass excess** (Apple). Calm material depth, not glass everywhere.
17. **Wallpaper-derived color** (Material Dynamic Color). User-pickable seed, not wallpaper-coupled.
18. **Per-product brand colors / enterprise chrome** (Fluent). One accent, role-based.
19. **Bottom tab bars + FAB** (Material). Desktop-first; mobile companion only.
20. **Shallow AI features** (Arc Max). MiMo's AI is the conversation, not a sidebar convenience.

---

## PART 4 — SYNTHESIS: WHICH IDEAS TO COMBINE

### 4.1 The MiMo synthesis (no copying — only principled recombination)

MiMo combines **exactly four primitives** into one coherent product:

| Primitive | Source inspiration (not copied) | MiMo's version |
|---|---|---|
| **Conversation-spine** | ChatGPT/Claude chat + Don Syme's regret | Conversation is always pinned tab #1, never replaced; everything else slides in |
| **Canvas-per-mode** | Cursor editor-as-canvas + Manus live computer | The center adapts: code→editor, research→source-pane, build→live-preview, image→canvas |
| **Living-workflow** | Gemini live thoughts + Manus computer + Cursor staged diff | Inline ExecutionTrace shows real runtime motion per stage; per-step accept/reject |
| **OS-grade keyboard** | Linear peek + Raycast quick-AI + VS Code prefix grammar + Arc command-bar | One `⌘K` with prefix grammar + hold-`Space` peek + `⌘⇧Tab` quick-AI + single-key daily-5 |

### 4.2 What makes MiMo NOT a clone

- **Not ChatGPT**: no dashboard, no credit counter, no deprecating-working-features, scoped project memory with visible source/timestamp/delete.
- **Not Cursor**: conversation is the spine (not editor-first); canvas-per-mode (not just code); single-user OS (not a dev tool).
- **Not GLM**: not a chat product; an operating system with daemon mode, memory, knowledge, projects, artifacts.
- **Not Manus**: sequential 6-stage pipeline (not parallel agent chaos); per-task-type trust (not per-instance approval).
- **Not Notion**: ONE AI surface (the conversation), compositional — not 8 overlapping AI features.
- **Not Arc**: rail ≤ 8 icons; tabs in a separate strip — not sidebar doing bookmarks+tabs+folders+spaces.
- **Not v0**: clear identity (AI OS, conversation-first, multi-mode) — not "is this a design tool or code tool?".

### 4.3 MiMo's defining interaction (the ONE thing)

**Hold `Space` to peek + `⌘K` to act + `⌘⇧Tab` for Quick AI on selection.**

This combines Linear's peek, Raycast's quick-AI, VS Code's prefix grammar, Notion's slash, and Arc's command-as-tab-creation into one coherent keyboard language — without copying any of them.

---

## PART 5 — MIMO'S OWN PHILOSOPHY

### 5.1 The MiMo thesis

> MiMo is a **conversation-spine operating system** for one power user.
> The conversation is the spine — permanent, never replaced.
> The canvas is adaptive — it becomes whatever the current mode needs.
> The workflow is alive — every stage of AI thinking is visible inline.
> The keyboard is the primary interface — peek, act, transform, without leaving the home row.
> Everything else (memory, knowledge, projects, artifacts, agents, developer tools) orbits the conversation and slides in only when useful.

### 5.2 The five MiMo principles

1. **Conversation permanence** — the conversation never closes, never gets replaced, never scrolls away behind a dashboard. It is tab #1, pinned, forever.
2. **Canvas adaptivity** — the center surface becomes code editor, live preview, source pane, image canvas, or terminal depending on mode — but the conversation stays underneath as the spine.
3. **Alive workflow** — the user feels the AI thinking through real runtime motion inline (browsing, reading, writing, tool calls, diffs) — never a spinner, never fake.
4. **Progressive disclosure** — complexity appears only when needed. Default state is calm: conversation + one adaptive sidebar. Developer tools, runtime metrics, agent internals are hidden unless explicitly enabled.
5. **Keyboard as home** — every primary action is reachable from the keyboard in ≤ 2 modifiers. Peek before commit. Act without menus. Transform without toolbars.

### 5.3 What MiMo is NOT

- Not a dashboard. Not an admin panel. Not a SaaS CRUD app. Not a KPI tool.
- Not multi-user. Not a team product. Not a chatbot. Not a single-mode dev tool.
- Not a website. It is an operating system for one person's intellectual life.

---

## PART 6 — INFORMATION ARCHITECTURE

### 6.1 Navigation hierarchy

```
MiMo OS
├── Left Rail (≤ 8 icons, icon-only, collapsible)
│   ├── Home (→ conversation tab)
│   ├── Projects (→ project switcher overlay)
│   ├── Files (→ files tab)
│   ├── Knowledge (→ knowledge tab)
│   ├── Memory (→ memory tab)
│   ├── Search (→ universal search overlay)
│   ├── Account (popover: theme / dev mode / settings)
│   └── Developer (conditional — only when devMode on)
│
├── Top Bar
│   ├── Command trigger (⌘K)
│   ├── Current-Project chip (click → project switcher)
│   ├── Mode selector (8 modes: chat/research/code/writing/run/image/automation/data)
│   ├── Workspace Tabs (pinned conversation + spawnable)
│   └── Right cluster (search + sidebar toggle)
│
├── Center (active tab content — conversation is pinned #1)
│
├── Right Sidebar (adaptive — swaps by mode)
│
└── Overlays (zero navigation — all are panels/drawers/modals)
    ├── Universal Search (⌘/)
    ├── Command Palette (⌘K)
    ├── Quick AI on selection (⌘⇧Tab)
    ├── Hold-Space peek (anywhere)
    ├── Settings
    ├── Voice / Image Gen
    └── Developer Panel (only when devMode on)
```

**Rule:** the rail never exceeds 8 icons. The top bar never shows runtime metrics unless devMode. Tabs are the only multi-tasking surface. Everything else is an overlay.

### 6.2 Workspace hierarchy

```
Workspace = the entire OS (single instance, single user)
└── Project (first-class container — one per long-running effort)
    ├── Conversation lineage (the spine — pinned, never closes)
    ├── Forks (branch primitive — exactly ONE branch concept)
    ├── Artifacts (code/doc/image/diagram/research/plan — each opens as tab)
    ├── Files (virtual FS scoped to project)
    ├── Memory (scoped to project + shared OS memory, hard toggle)
    ├── Knowledge (entities derived from this project's conversations)
    ├── Agents (per-project agent state + scope)
    └── Settings (per-project: accent color, model, sandbox mode)
```

**Container discipline:** Project is the ONLY container. Fork is the ONLY branch primitive. No "Workspace / Repl / Remix / Branch / Template / Skill" sprawl (Lovable/v0 anti-pattern).

### 6.3 Conversation model

- **Permanence:** the conversation tab is pinned #1 and cannot be closed.
- **Streaming:** real streaming from the Core pipeline; first token < 1s on cached context.
- **Inline execution:** `ExecutionTrace` renders INSIDE the streaming AI message — pipeline stages animate inline (Context → Reason → Plan → Execute → Validate → Done) with real runtime motion per stage.
- **Inline artifacts:** generated artifacts appear inline as cards; click → opens as a tab (conversation stays underneath).
- **Inline agent messages:** agent contributions render inline in the conversation, not in a separate panel.
- **Slash blocks:** `/` at cursor opens a slash menu (Notion pattern) for AI blocks that re-run on input change.
- **Fork:** any conversation turn can be forked — creates a branch with that turn as the new root.
- **Virtualization:** conversations of 1000+ messages must not drop below 50fps.

### 6.4 Project model

- **Open:** `⌘P` or click the project chip → project switcher overlay (Arc-style grid of project cards with accent colors).
- **Accent:** each project has one user-pickable accent color that tints the rail + active tab + inline accents (Arc per-Space pattern).
- **Scope:** opening a project does NOT close the conversation. It scopes the memory + knowledge + files shown in sidebars. The conversation lineage continues.
- **Grounding:** each project reads `MIMO.md` at workflow start (Codex/Cursor/Claude Code converged pattern).
- **Persistence:** layout (tabs, widths, scroll, mode, cursor) survives across reloads (VS Code pattern).

### 6.5 Artifact model

- **First-class:** artifacts are first-class objects, not chat attachments.
- **Types:** code · markdown · image · diagram · research · plan · architecture · presentation · database-schema · wireframe · flowchart · spreadsheet.
- **Open:** each artifact opens in its own workspace tab; conversation stays underneath.
- **Runtime:** the ArtifactViewer is a runtime, not a preview — Pyodide/WASM sandbox for Python, CSP-locked iframe for React (Claude Artifacts pattern).
- **Accept/reject:** code artifacts show staged diffs with per-hunk accept/reject (Cursor pattern — the single biggest regression reducer).
- **WYSIWYG:** deterministic AST-based direct manipulation over previews, separate from stochastic LLM redesign (Lovable Visual Edits + v0 Design Mode pattern — no LLM cost).
- **Versioning:** each artifact has hover thumbnails of prior versions (Lovable Edit History pattern).
- **Dock:** generated artifacts auto-appear in a right-edge dock; click → opens as tab.

### 6.6 Agent model

- **Hidden when idle:** agents show nothing when idle. No static agent cards.
- **Living workflow when working:** agents render as a horizontal pipeline stepper that lights up stage-by-stage (Context → Reason → Plan → Execute → Validate → Done). Expandable to show which agent is on which stage + last event.
- **Named roles:** each stage has a named identity (Planner / Researcher / Builder / Reviewer / Verifier) — Genspark pattern.
- **Per-agent model + scope:** each agent step can specify model (cheap/fast vs deep) and scope (read-only / src/ / docs/) — Cursor primitive.
- **Per-task-type trust:** "Always allow this kind" instead of per-instance approval storms (Manus anti-pattern avoidance).
- **Sequential, not parallel:** the 6-stage pipeline is sequential and clear. Parallel agents only with per-agent visibility (Manus parallel-execution-confuses-users avoidance).
- **Real-time partnership:** the agent sees user edits and proactively offers consistency fixes (Windsurf rename-detection pattern — genuinely distinctive).

### 6.7 Memory model

- **Two layers** (ChatGPT pattern, fixed): explicit saved memories + implicit history-reference.
- **Every memory item shows:** source + timestamp + delete button (solves ChatGPT's opacity).
- **Scoped:** Project-only memory with hard toggle (ChatGPT Aug 2025 pattern) + shared OS memory.
- **Folder-as-context:** point at a directory, ask, get a sourced answer (Gemini Drive pattern — MiMo does this better locally).
- **Context hygiene:** explicit `/clear` and `/compact` commands (Codex pattern).
- **Auto-memory:** facts/preferences/skills auto-extracted and shown in the Memory tab with type filters.

### 6.8 Knowledge model

- **Derived from memory:** knowledge entities (skills, goals, facts, preferences, events) are derived from stored memories — not a separate input.
- **Browser:** the Knowledge tab is a visual explorer — entity grid with proficiency bars, type filters, search.
- **Per-context:** the right sidebar shows the top relevant knowledge entities for the current conversation.
- **Citations:** research-mode answers default to inline numbered citations (Perplexity + Genspark pattern).

### 6.9 Developer model

- **Hidden by default.** When OFF: kernel, runtime, scheduler, inspector, logs, metrics, tracing, memory graphs, CPU, latency, providers, queue are completely invisible — not even in the rail.
- **When ON:** a conditional rail icon appears; a floating Developer Panel opens with 5 tabs: Overview / Memory / Agents / Tools / Events — consuming real Core data (kernel boot state, memory count, agent registry, tool registry, live EventBus stream).
- **Always one shortcut away** (Bolt/v0 lesson — never gate the terminal behind a beta).
- **Like Chrome DevTools:** a separate surface that doesn't pollute the primary experience.

### 6.10 Search model

- **ONE search** (not separate search pages). `⌘/` opens Universal Search.
- **Searches everything:** conversations · memory · knowledge · projects · files · artifacts · agents · commands · settings.
- **Prefix grammar in `⌘K`** (VS Code + Arc + Notion converged): `>cmd` · `/search` · `@mem` · `#file` · `!ai`.
- **Local-first:** renders from local cache with background sync (Linear pattern — the #1 perceived-performance lesson).
- **Fuzzy:** filters as you type, < 80ms first open, no loading state.

### 6.11 Context model

- **One source of truth:** the composer `mode` drives the right sidebar, the canvas, and the agent's prompt mode — all from one state.
- **Mode → sidebar mapping:** chat→Personal, research→Research, code→Code, writing→Writing, run→Planning, image→Image, automation→Automation, data→Data.
- **Mode → canvas mapping:** chat→conversation, code→editor, research→source-pane, build→live-preview, image→canvas.
- **Per-step context:** the agent sees conversation history + recalled memory + project scope + folder-as-context (if specified).

---

## PART 7 — INTERACTION MODEL

### 7.1 How does a project open?

`⌘P` or click the project chip → project switcher overlay (Arc-style grid of project cards, each with its accent color). Selecting a project:
1. Does NOT close the conversation (it stays pinned).
2. Scopes memory + knowledge + files + agents to that project.
3. Shifts the accent color across the rail + active tab + inline accents (200ms slide).
4. Reads `MIMO.md` at workflow start.
5. Restores the saved layout (tabs, widths, scroll, mode, cursor).

### 7.2 How do tabs work?

- **Pinned conversation:** tab #1, pinned, cannot be closed (Arc Pinned pattern).
- **Spawnable tabs:** artifacts, files, memory, knowledge, projects, dashboard — each opens as a new tab.
- **Ephemeral tabs:** research/draft tabs auto-archive after disuse with one-search recovery (Arc Today pattern).
- **`Alt+1..9`:** switch tabs by number.
- **`⌘W`:** close active tab (except pinned conversation).
- **Layout persistence:** every tab, width, scroll survives reload (VS Code).

### 7.3 How do agents appear?

- **Idle:** invisible. No static cards.
- **Working:** a floating `AgentDock` slides up from the bottom — a horizontal pipeline stepper (Context → Reason → Plan → Execute → Validate → Done) that lights up stage-by-stage. Expandable to show which agent is on which stage + last event + confidence/health.
- **Done:** the dock slides away; the result is inline in the conversation.
- **Approvable:** for code/UI tasks, the plan surfaces as an approvable artifact before execution (Replit/Lovable pattern).

### 7.4 How does execution appear?

- **Inline in the conversation** — `ExecutionTrace` renders INSIDE the streaming AI message (not a separate dock). Replaces the old typing-dots placeholder.
- **Real runtime motion per stage** — not spinners (Manus/Bolt lesson). Each stage shows actual motion: browsing screenshots, terminal output, file diffs, tool calls.
- **Per-step accept/reject** — for code artifacts, staged diffs with per-hunk accept/reject (Cursor pattern).
- **Live runtime pane** — when devMode is on, a live "Computer" pane (Manus pattern) shows the actual browser/terminal the agent is using.

### 7.5 How are artifacts displayed?

- **Inline card** in the conversation when first generated.
- **Auto-appear** in the right-edge Artifact Dock (like downloads).
- **Click → opens as a tab** — conversation stays underneath.
- **Runtime** — the ArtifactViewer runs real code (Pyodide/WASM sandbox + CSP-locked iframe).
- **WYSIWYG** — deterministic AST-based direct manipulation over previews, no LLM cost (Lovable/v0 pattern).
- **Versioned** — hover thumbnails of prior versions (Lovable Edit History).

### 7.6 How does search work?

- `⌘/` → Universal Search overlay.
- One input, fuzzy filter, < 80ms first open.
- Searches conversations (client) + memory + knowledge + commands (via one aggregated API).
- `⌘K` → Command Palette with prefix grammar (`>cmd /search @mem #file !ai`).
- Local-first: renders from cache, background sync (Linear).

### 7.7 How does memory appear?

- **Right sidebar** (chat mode): recent memory entries, compact.
- **Memory tab:** full visual browser — timeline + type filters (fact/preference/event/skill/goal) + search + source/timestamp/delete per entry.
- **Inline:** when the agent recalls a memory, it cites it inline in the answer.
- **Auto-extracted:** facts/preferences/skills auto-stored during conversation, visible in the Memory tab.
- **Scoped:** project-only memory with hard toggle + shared OS memory.

### 7.8 How does knowledge appear?

- **Right sidebar** (chat mode): top relevant knowledge entities, compact.
- **Knowledge tab:** entity grid with proficiency bars, type filters, search.
- **Derived from memory** — not a separate input.
- **Citations:** research-mode answers cite knowledge entities inline.

### 7.9 How does planning work?

- **Clarifying questions** before long-running tasks (Perplexity/Replit pattern) — the Reasoner asks 1–3 visible multi-question dialogues before multi-step execution.
- **Plan as approvable artifact** — for code/UI tasks, the plan surfaces as an artifact the user approves before execution (Replit/Lovable pattern).
- **Inline in conversation** — the plan renders inline, not in a separate panel (Don Syme's regret avoidance).

### 7.10 How does the user stay focused?

- **Conversation permanence** — the spine never moves.
- **Progressive disclosure** — default state is calm: conversation + one adaptive sidebar.
- **Hidden complexity** — developer tools, runtime metrics, agent internals hidden unless enabled.
- **Hold-Space peek** — preview anything without commitment (Linear pattern).
- **Single-key daily-5** — `C` new conversation, `M` memory, `A` agents, `R` research mode, `S` settings (Linear pattern).
- **No approval storms** — per-task-type trust, not per-instance.
- **No credit counters** — never impose counters (single-user local-first).

---

## PART 8 — VISUAL HIERARCHY

### 8.1 Where should the eye go first?

The **conversation**. Always. It is the only full-height, full-width region in the default state. Everything else is either an icon rail (peripheral), a slim top bar (peripheral), or an adaptive sidebar (peripheral).

### 8.2 What should always stay visible?

1. The left rail (6–8 icons).
2. The top bar (command trigger + project chip + mode selector + tabs + search/sidebar toggles).
3. The active conversation + composer.
4. The current-mode indicator (sidebar header).

### 8.3 What should stay hidden?

1. Runtime metrics (kernel, CPU, memory, queue, latency, providers) — unless devMode.
2. Agent internals — unless an agent is actively working.
3. Developer tools — unless devMode.
4. Settings JSON — direct manipulation only.
5. System notifications (toasts) — use inline status via ExecutionTrace for conversation flow; Snackbar only for transient system confirmations.

### 8.4 What should appear only when needed?

1. The right sidebar content swaps by mode (adaptive).
2. The AgentDock appears only when agents are working.
3. The ArtifactDock appears only when artifacts exist.
4. Overlays (search, palette, settings, voice, image-gen) appear only on invocation.
5. The Developer Panel appears only when devMode is on.

### 8.5 How should complexity progressively appear?

**Layer 0 (default):** conversation + composer + left rail + adaptive sidebar. Calm.
**Layer 1 (working):** AgentDock slides up; ExecutionTrace animates inline; artifacts appear in dock.
**Layer 2 (multi-tasking):** spawnable tabs for artifacts/files/memory/knowledge.
**Layer 3 (developer):** devMode on → rail gains icon + floating Developer Panel.
**Layer 4 (peek):** hold-Space on anything → preview overlay; release → dismiss.

Each layer is opt-in. The default is the calmest possible state.

### 8.6 Visual weight rules

- **Conversation messages:** highest contrast (var(--nv-tx) on var(--nv-bg)).
- **Sidebar panels:** medium contrast (var(--nv-tx2) on var(--nv-bg2)).
- **Rail icons:** low contrast (var(--nv-tx2)), brighten on hover/active.
- **Overlays:** modal scrim 32% black + blur(6px).
- **Accent:** one user-pickable accent per project, used sparingly (active states, progress bars, brand mark).
- **Elevation:** calm — 1px hairlines + tonal-container separation for 90% of UI; shadows reserved for true floating layers (popovers, modals, dock).

---

## PART 9 — COMPLETE DESIGN SPECIFICATION

### 9.1 Design philosophy

**Apple's calm deference + Material's token rigor + Fluent's prescriptive component-depth mapping — minus each system's signature excess.**

- No over-glass (Apple excess).
- No wallpaper-derived color or bottom tab bars or FAB (Material excess).
- No per-product brand colors or enterprise chrome or Segoe-only (Fluent excess).
- One accent, role-based, auto-flips per theme, user-pickable seed.
- Calm material depth — 1px hairlines + tonal separation; shadows reserved for floating layers.
- Multi-hour-use-optimized: prefer tonal separation over shadows; inline status over toasts.

### 9.2 UX principles

1. **Conversation permanence** — never replace, never hide, never scroll away.
2. **Canvas adaptivity** — center becomes whatever the mode needs.
3. **Alive workflow** — real runtime motion, never spinners.
4. **Progressive disclosure** — calm default; complexity on demand.
5. **Keyboard as home** — ≤ 2 modifiers; peek before commit.
6. **Local-first** — render from cache, sync in background.
7. **One AI surface** — the conversation; compositional, not 8 overlapping features.
8. **Per-step accountability** — accept/reject on staged diffs; no 100% overwrites.
9. **No counters** — single-user local-first; never impose credit/quota.
10. **Layout persistence** — every tab, width, scroll, mode, cursor survives.

### 9.3 Interaction principles

- **< 80ms** command palette first open.
- **< 100ms** hold-Space peek.
- **< 200ms** project/space switch (with accent color shift).
- **< 500ms** first AI token on cached context.
- **≥ 50fps** on 1000+ message conversations.
- **≤ 2 modifiers** per hotkey.
- **Per-task-type trust** — never per-instance approval storms.
- **Per-hunk accept/reject** — never 100% diff overwrites.
- **Peek before commit** — hold-Space everywhere.
- **Prefix grammar** in the single command palette.

### 9.4 Visual principles

- **Calm depth** — tonal separation + 1px hairlines for 90% of UI; shadows for floating layers only.
- **One accent** — user-pickable seed, role-based, per-project tint.
- **Weight-for-hierarchy** — 400/500/600/700; size-for-scale.
- **Material deference** — content first, chrome recedes.
- **No decorative motion** — motion communicates state change, not delight.
- **Variable-weight icons** — optical alignment with type.

### 9.5 Spacing system

**Base unit: 4px. Scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48.** (Material + Fluent convergence.)

| Token | Value | Use |
|---|---|---|
| `space-1` | 4px | inline gaps, icon padding |
| `space-2` | 8px | tight component gaps |
| `space-3` | 12px | default component padding |
| `space-4` | 16px | card padding |
| `space-5` | 20px | section gaps |
| `space-6` | 24px | view padding |
| `space-8` | 32px | major section gaps |
| `space-10` | 40px | hero padding |
| `space-12` | 48px | page padding |

**Layout grid:**
- Left rail: 56px (icon-only).
- Top bar: 44px height.
- Right sidebar: 320px default, 260–440px resizable.
- Conversation max-width: 820px (centered).
- Composer max-width: 820px.

### 9.6 Typography

**Single system-font stack:** `-apple-system, 'Segoe UI', 'Roboto', system-ui, sans-serif` (platform-native everywhere).
**Mono stack:** `'SF Mono', 'Cascadia Code', 'JetBrains Mono', 'Courier New', monospace`.
**Weight-for-hierarchy:** 400 (body) · 500 (subhead) · 600 (label) · 700 (title) · 800 (display).

| Role | Size / Line-height | Weight | Use |
|---|---|---|---|
| Display | 56 / 64 | 800 | hero greeting |
| Title1 | 32 / 40 | 800 | page title |
| Title2 | 28 / 36 | 800 | section title |
| Title3 | 22 / 28 | 700 | card title |
| Headline | 18 / 24 | 700 | panel header |
| Body | 16 / 24 | 400 | conversation, default |
| Subhead | 14 / 20 | 500 | secondary text |
| Label | 12 / 16 | 600 | sidebar labels, buttons |
| Caption1 | 11 / 16 | 500 | metadata |
| Caption2 | 10 / 14 | 600 | badges, timestamps |

**Arabic:** IBM Plex Sans Arabic loaded alongside the system stack for proper Arabic shaping; numerals stay Latin (ltr) inside RTL flow.

### 9.7 Color system

**Token-first, semantic, role-based** (Apple + Material + Fluent converged). One user-pickable accent seed; auto-derived light/dark/high-contrast schemes; guaranteed WCAG AA via paired foregrounds.

| Token | Light | Dark | Use |
|---|---|---|---|
| `bg` | #fafafa | #09090b | app background |
| `surface` (bg2) | #ffffff | #111113 | cards, panels |
| `surface-container` (bg3) | #f4f4f5 | #1a1a1e | inputs, hover |
| `surface-high` (bg4) | #ececee | #232329 | badges, disabled |
| `text-primary` (tx) | #18181b | #fafafa | primary text |
| `text-secondary` (tx2) | #52525b | #a1a1aa | secondary text |
| `text-tertiary` (tx3) | #a1a1aa | #52525b | metadata |
| `border-hairline` (bd) | #e4e4e7 | #27272a | 1px borders |
| `accent-brand` | user seed (default #7c3aed) | same | brand, active states |
| `accent-grad` | linear-gradient(135deg, accent, accent+shift) | same | brand mark, progress |
| `success` | #22c55e | #22c55e | done, validated |
| `warning` | #f59e0b | #f59e0b | paused, warn |
| `danger` | #ef4444 | #ef4444 | error, blocked |
| `info` | #3b82f6 | #3b82f6 | citations, links |

**Per-project accent:** each Project has one accent seed that tints `accent-brand` across the rail + active tab + inline accents for that project (Arc per-Space pattern).

**Glass:** `backdrop-filter: blur(12px)` + `background: rgba(surface, .72)` — used ONLY for the top bar and floating dock, not everywhere (Apple over-glass avoidance).

### 9.8 Elevation model (5 levels by intent)

| Level | Token | Use | Implementation |
|---|---|---|---|
| 0 | `base` | default surfaces | flat, no shadow |
| 1 | `hairline` | cards, panels | 1px solid border-hairline |
| 2 | `container` | nested surfaces | tonal-step background (bg3 on bg2) |
| 3 | `floating` | popovers, dock, dropdowns | `shadow8` + hairline |
| 4 | `modal` | modals, overlays | `shadow64` + scrim 32% black + blur(6px) |

**Never invent a 6th level.** Shadows are reserved for levels 3–4 only. 90% of UI uses levels 0–2 (calm tonal separation).

### 9.9 Iconography

- **One variable-weight icon family** (Material Symbols style) whose weight axis matches type weight.
- **Outline default; filled for selected state.**
- **Sizes:** 16 (inline) · 20 (buttons) · 24 (rail) · 32 (hero).
- **Inherit component color.**
- **Stroke weight:** 1.5px at 16px, 2px at 20px+ (optical alignment).
- **No emojis as functional icons** (emojis OK for notification severity only: ✅⚠️❌ℹ️).

### 9.10 Animation language

**Material duration tiers + Emphasized cubic-bezier + spring physics for direct manipulation.**

| Tier | Duration | Use |
|---|---|---|
| short | 50–200ms | hover, focus, state toggle |
| medium | 250–400ms | panel expand, tab switch, stage light-up |
| long | 450–600ms | page transition, modal open |

**Easing:**
- `emphasized`: `cubic-bezier(0.05, 0.7, 0.1, 1.0)` — default for expressive motion (Material).
- `standard`: `cubic-bezier(0.2, 0.0, 0.0, 1.0)` — generic.
- `spring`: `{ stiffness: 280, damping: 26 }` — direct manipulation (drag, dock slide).
- `linear`: never (except progress bars).

**Transition patterns (Fluent's 4):**
1. **Enter/Exit** — fade + slight y (8px). For overlays, messages.
2. **Elevation** — shadow + scale (0.96→1). For popovers, dock.
3. **Top-level fade** — opacity only. For tab content swap.
4. **Container transform** — morph a card into a panel. For artifact open.

**Mandatory:**
- `prefers-reduced-motion: reduce` → disable all non-essential motion; ExecutionTrace announces via ARIA live region.
- No decorative motion — motion communicates state change only.
- No bounce/overshoot on system chrome (reserved for direct manipulation only).

### 9.11 Component library

Built on shadcn/ui (New York) + Tailwind 4. All components use the semantic tokens above.

| Component | Spec |
|---|---|
| **Button** | 44px tap target; 3 variants (primary=accent, secondary=surface-container, ghost=transparent); 3 sizes (sm 32px, md 40px, lg 48px) |
| **Card** | surface + hairline + 12px radius; nested = container level |
| **List item** | 44px height, hover=surface-container, active=accent@8% |
| **Sidebar panel** | surface, header 11px Label uppercase, gap-12 |
| **Tab** | 34px height, 2px bottom border active=accent, pinned=accent dot |
| **Modal** | level-4 elevation, scrim 32%, blur(6px), 16px radius |
| **Popover** | level-3 elevation, 13px radius, 200ms emphasized |
| **Toast/Snackbar** | bottom-left, 12px radius, 2.6s auto-dismiss (system confirmations only — NOT for conversation flow) |
| **Input** | surface-container bg, hairline border, 11px radius, 44px height |
| **Badge** | 9px Label, 20px radius, accent@18% bg + accent fg |
| **Progress** | 3–5px height, 99px radius, accent-grad fill |
| **Pipeline stepper** | horizontal, 26px nodes, 1.5px connectors, accent when done |
| **ExecutionTrace** | inline card, surface + hairline, 5-stage stepper, rotating brain icon |
| **AgentDock** | floating bottom center, glass bg, pipeline stepper, expandable |

### 9.12 Workspace architecture

```
┌──────────────────────────────────────────────────────────────┐
│ Top Bar (44px) — ⌘K · Project chip · Modes · Tabs · toggles │
├──────┬────────────────────────────────────────┬──────────────┤
│ Left │  CENTER (active tab)                    │ Right        │
│ Rail │  conversation is pinned tab #1          │ Sidebar      │
│ 56px │  + composer                              │ (adaptive)   │
│      │                                          │ 320px        │
│      │  ← AgentDock slides up when working →    │              │
├──────┴────────────────────────────────────────┴──────────────┤
│ Artifact Dock (right edge, only when artifacts exist)         │
└───────────────────────────────────────────────────────────────┘
+ Overlays: UniversalSearch · CommandPalette · QuickAI · Peek · Settings · Voice · ImageGen · DeveloperPanel
```

### 9.13 Adaptive layouts

**Size-class model (Apple pattern), not just CSS breakpoints:**

| Size class | Width | Behavior |
|---|---|---|
| **Desktop (Regular)** | ≥ 1024px | Full layout: rail + top bar + center + right sidebar + dock |
| **Tablet (Regular compact)** | 768–1023px | Right sidebar becomes a drawer (toggle); rail stays; tabs stay |
| **Mobile (Compact)** | < 768px | Rail collapses to 5-icon bottom bar (or hamburger); right sidebar = full-screen drawer; tabs = horizontal scroll; composer = bottom sticky |

**Mobile is a companion, not the primary surface** (v0/Manus lesson). Mobile is for review/approve, not full work.

### 9.14 Accessibility

- **Contrast:** WCAG AA guaranteed via paired foreground tokens (on-surface, on-accent, etc.).
- **Tap targets:** 44px minimum (Apple — more generous than Material's 48dp for trackpad/low-vision).
- **Focus rings:** 2px accent outline + 2px offset; always visible on keyboard nav.
- **Reduced motion:** `prefers-reduced-motion: reduce` → disable non-essential motion; ExecutionTrace uses ARIA live region.
- **Screen reader:** ARIA live regions announce "AI is working" + stage transitions; every icon has `aria-label`; every overlay has `role="dialog"` + focus trap.
- **Keyboard:** every action reachable in ≤ 2 modifiers; Tab order is logical; Escape closes overlays.
- **RTL:** full RTL support (Arabic primary); numerals stay LTR inside RTL flow.
- **High contrast:** auto-derived high-contrast scheme token.

### 9.15 Keyboard shortcuts (complete map)

| Shortcut | Action |
|---|---|
| `⌘K` | Command Palette (prefix grammar: `>cmd /search @mem #file !ai`) |
| `⌘/` | Universal Search |
| `⌘B` | Toggle right sidebar |
| `⌘P` | Project switcher |
| `⌘T` | New tab |
| `⌘W` | Close tab (not pinned conversation) |
| `⌘⇧L` | Toggle left rail collapse |
| `⌘⇧D` | Toggle Developer Mode |
| `⌘⇧Tab` | Quick AI on selected text (Raycast killer feature) |
| `Alt+1..9` | Switch to tab N |
| `Space` (hold) | Peek at hovered sidebar item (Linear) |
| `/` (in conversation) | Slash block menu (Notion) |
| `C` | New conversation (single-key, Linear) |
| `M` | Open Memory tab |
| `A` | Open Agents (when active) / Agent dock |
| `R` | Switch to Research mode |
| `S` | Open Settings |
| `Enter` | Send message |
| `⇧Enter` | Newline in composer |
| `Esc` | Close any overlay |

**Cap: 2 modifiers max.** No 3-modifier hotkeys (Raycast anti-pattern).

---

## PART 10 — APPROVAL CHECKLIST

Before implementation begins, this spec must be approved against:

- [ ] Conversation is permanently the center (pinned tab #1, never replaced).
- [ ] No dashboards, no KPI grids, no always-visible runtime metrics (unless devMode).
- [ ] Left rail ≤ 8 icons.
- [ ] ONE AI surface (the conversation), compositional.
- [ ] ONE container (Project) + ONE branch primitive (Fork).
- [ ] 8 workspace modes, each swapping the right sidebar + canvas.
- [ ] Inline ExecutionTrace with real runtime motion (not spinners).
- [ ] Living-workflow AgentDock (pipeline stepper, not static cards).
- [ ] Hidden by default: runtime, agents-when-idle, developer tools.
- [ ] Per-step accept/reject on staged diffs (no 100% overwrites).
- [ ] Per-task-type trust (no per-instance approval storms).
- [ ] No credit counters (single-user local-first).
- [ ] Token-first semantic design system (role-based, not raw).
- [ ] 5-level elevation by intent.
- [ ] 9 type roles on a single system-font stack.
- [ ] 4px base spacing scale.
- [ ] Material duration tiers + Emphasized bezier + springs.
- [ ] 44px tap targets; WCAG AA; reduced-motion; ARIA live regions.
- [ ] Full keyboard map, ≤ 2 modifiers.
- [ ] Hold-Space peek + ⌘K prefix grammar + ⌘⇧Tab quick-AI.

---

## PART 11 — IMPLEMENTATION ORDER (after approval)

1. Design tokens (spacing, type, color, elevation, motion) → `globals.css`
2. Store extension (devMode, tabs, project, peek, quick-AI)
3. Layout shell (rail + top bar + center + sidebar + dock) per spec
4. Conversation permanence + inline ExecutionTrace
5. Living-workflow AgentDock
6. Adaptive right sidebar (8 modes)
7. Universal Search (⌘/) + Command Palette prefix grammar (⌘K)
8. Hold-Space peek + Quick-AI-on-selection (⌘⇧Tab)
9. Artifact model (tab + dock + Pyodide sandbox + per-hunk accept/reject)
10. Project model (switcher + accent + MIMO.md + layout persistence)
11. Memory + Knowledge browsers
12. Developer Panel (hidden unless devMode)
13. Mobile companion (drawer + bottom bar)
14. Accessibility pass (ARIA, reduced-motion, focus, contrast)

---

**END OF SPECIFICATION.**

This document is the single source of truth. Implementation must strictly follow it. No redesigning while coding. No inventing layouts during implementation. If a gap is found during implementation, the spec is amended first, then code follows.

**Awaiting approval before any UI implementation.**
