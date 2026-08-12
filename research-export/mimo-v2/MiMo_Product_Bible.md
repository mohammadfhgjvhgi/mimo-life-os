# MiMo — Product Bible
### The definitive product reference. Highest authority before implementation.

**Status:** FINAL. The single source of truth. Implementation must be a direct translation. No reinvention during coding. Any gap found during implementation requires amending this document first, then code follows.

**Format:** Markdown. One file. Complete.

**Source of truth basis:** This Bible is the direct translation of the closed Research Phase (R2 + FINAL CLOSURE). Reference files:
- `research/MASTER_RESEARCH_MATRIX.md` — 54 products + 16 academic + 16 patterns with honest evidence grades (A/B/C/D)
- `research/RESEARCH_GAP_CLOSURE.md` — 12 CLOSED, 18 ACCEPTED LIMITATION, 0 BLOCKERS
- `research/MiMo_FINAL_EVIDENCE_MAP.md` — 35 major decisions mapped to evidence, avg 86.5% confidence
- `research/MiMo_RESEARCH_READINESS.md` — READY / ACCEPTED LIMITATIONS / BLOCKERS declaration
- `research/evidence/<product>.md` — 54 product files, 30 sections each, every claim cited
- `research/academic/<topic>.md` — 16 HCI foundations
- `research/patterns/<pattern>.md` — 16 UX pattern syntheses

**Epistemic discipline:** Throughout this document, every claim is labeled:
- **[FACT]** — verified, documented, observable.
- **[EVIDENCE Grade A/B/C/D]** — sourced from research (A=official docs/direct observation; B=official blog/changelog; C=reliable secondary; D=community/anecdotal).
- **[INFERENCE]** — reasoned from evidence but not directly verified.
- **[PRODUCT DECISION]** — a binding choice made by MiMo, grounded in evidence.
- **[VALIDATION REQUIREMENT]** — must be verified during implementation; not yet confirmed.

No decision rests on D-grade evidence alone. Where evidence is insufficient, it is stated plainly.

---

## Table of Contents

PART 1: Product Identity · PART 2: Mental Model · PART 3: Information Architecture · PART 4: Context Architecture · PART 5: Memory Architecture · PART 6: Knowledge Architecture · PART 7: AI Architecture · PART 8: Agent Architecture · PART 9: Human↔AI Collaboration · PART 10: Execution/Runtime UX · PART 11: Artifact System · PART 12: Conversation Model · PART 13: Workspace Model · PART 14: Search · PART 15: Command System · PART 16: Visual/UX System · PART 17: Motion System · PART 18: Responsive System · PART 19: Accessibility · PART 20: Performance Perception · PART 21: Trust/Explainability · PART 22: Security/Privacy · PART 23: Offline/Online · PART 24: Error/Recovery · PART 25: Plugin/API Architecture · PART 26: Scalability/Evolution · PART 27: Frontend Engineering Rules · PART 28: Always Visible/Conditional/Hidden · PART 29: Product Invariants · PART 30: Design Decisions Log · PART 31: Evidence Map · PART 32: Open Risks · PART 33: Final Product Contract

---

# PART 1 — PRODUCT IDENTITY

## 1.1 Vision

> **MiMo is the operating system for one person's intellectual life.**

A single-user, conversation-spine AI Operating System that the owner uses daily for years — to think, to build, to research, to remember, to plan, to create. It is not a website, not a dashboard, not a SaaS, not a chatbot. It is the permanent surface where one person's intellectual work happens, with an AI collaborator that knows them, their projects, their memory, their knowledge, their habits — and grows with them over years.

**In one sentence:** *The conversation is the operating system; everything else slides in to support it.*

**In three words:** *Calm. Alive. Mine.*
- **Calm** — default state is one conversation on a clean surface. No dashboards. No KPI grids. No clutter. Complexity appears only when needed and recedes when done.
- **Alive** — when the AI works, the user feels it through real runtime motion inline: browsing, reading, writing, calling tools, producing diffs. Never a spinner. Never fake.
- **Mine** — local-first, end-to-end encrypted, no counters, no deprecations. The system structurally cannot betray the owner. Every memory shows source + timestamp + delete.

## 1.2 Mission

> **Make one person measurably more capable over years of daily use, without ever making them feel like they're operating software.**

The mission is not "build a beautiful UI." The mission is: after one year of daily use, the owner's MiMo knows them deeply (Personal Model), remembers everything they've worked on (Memory), has built a knowledge graph of their intellectual life (Knowledge), and can collaborate on any new task with the context of everything that came before — all from one permanent surface that never makes them context-switch.

### Mission success criteria (measurable, over 12 months of daily use)

1. **95% of daily work happens on ONE screen** (conversation + adaptive canvas). No page navigation for primary work. [INFERENCE — grounded in cross-product analysis; not empirically validated. VALIDATION REQUIREMENT: user testing in implementation.]
2. **Zero data loss** — every conversation, memory, knowledge entity, artifact survives every reload, crash, device switch.
3. **The system knows the owner** — asking "what are my skills?" returns a real answer from the knowledge graph, not a guess.
4. **The system feels fast** — ⌘K opens in <80ms, first AI token in <1s on cached context, ≥50fps on 1000+ message conversations.
5. **The system feels alive** — the user sees the AI thinking through real runtime motion, never a spinner.
6. **The system feels mine** — local-first, E2E, no counters, no deprecations; the owner trusts it structurally.

## 1.3 Product Thesis

> **MiMo is an Operating System, not an application.**

This thesis defends against feature creep. Every product decision must answer: *does this make MiMo more of an operating system, or less?*

- An OS has a **permanent surface** (the conversation spine). Applications have screens you navigate between.
- An OS has a **shell** (rail + top bar + tabs + overlays). Applications have pages.
- An OS has a **kernel** (the Core intelligence pipeline). Applications have API calls.
- An OS has a **file system** (artifacts + memory + knowledge). Applications have a database.
- An OS has a **daemon** (background agents + scheduled routines). Applications have cron jobs at best.
- An OS **adapts** to the current task (canvas-per-mode). Applications force the task into their fixed shape.

## 1.4 Product Philosophy

### The irreducible thesis
MiMo is a conversation-spine AI OS for one power user. The conversation is permanent; the canvas adapts; the workflow is alive; complexity is disclosed progressively; the keyboard is home.

### The five product principles [PRODUCT DECISIONS — each grounded below]

1. **Conversation permanence** — the conversation never closes, never gets replaced, never scrolls away behind a dashboard. It is tab #1, pinned, forever.
   - *Problem solved:* losing the user's thread when they switch context.
   - *Evidence:* Don Syme's Copilot Workspace regret — "didn't embrace chat as both output and place to give guidance" [EVIDENCE Grade B — evidence/copilot-workspace.md §27, corroborated via HN + engineering blogs]. Cursor wins by being editor-first but loses conversational flow for non-code [EVIDENCE Grade A — evidence/cursor.md §2].
   - *Alternatives rejected:* editor-first (loses conversation), chat-first (loses canvas), agent-first (approval fatigue).

2. **Canvas adaptivity** — the center surface becomes whatever the current mode needs (code editor, live preview, source pane, image canvas, terminal, writing surface) — but the conversation stays underneath as the spine.
   - *Problem solved:* one surface, many modes — avoids page navigation.
   - *Evidence:* no product studied combines conversation-as-permanent-spine + canvas-as-adaptive-per-mode [EVIDENCE Grade B — cross-product analysis of 54 products].

3. **Alive workflow** — the user feels the AI thinking through real runtime motion inline (browsing, reading, writing, tool calls, diffs) — never a spinner, never fake.
   - *Problem solved:* spinners feel dead; users don't trust what they can't see.
   - *Evidence:* Manus live computer pane [Grade A — evidence/manus.md §8], Bolt HMR [Grade A — evidence/bolt.md §12], Gemini Deep Research live thoughts [Grade A — evidence/gemini.md §12], Cursor per-file diffs [Grade A — evidence/cursor.md §13]. Anti-pattern: v0 static "waiting" [Grade B — evidence/v0.md §12], GLM no viz, ChatGPT spinner.
   - *HCI grounding:* Nielsen heuristic 1 (visibility of system status) [Grade A — academic/jakob-nielsen.md].

4. **Progressive disclosure** — complexity appears only when needed. Default state is calm: conversation + one adaptive sidebar. Developer tools, runtime metrics, agent internals are hidden unless explicitly enabled.
   - *Problem solved:* cognitive overload is the silent killer.
   - *Evidence:* Notion 8 AI surfaces [Grade A — evidence/notion.md §8], Lovable 7 containers [Grade A — evidence/lovable.md §6], v0 8 containers [Grade A — evidence/v0.md §6] all caused overload. Linear ONE issue list = premium feel [Grade A — evidence/linear.md §5].
   - *HCI grounding:* CLT [Grade A — academic/cognitive-load-theory.md], PD [Grade A — academic/progressive-disclosure.md], Miller 7±2 [Grade A — academic/millers-law.md], Hick's Law [Grade A — academic/hicks-law.md].

5. **Keyboard as home** — every primary action is reachable from the keyboard in ≤ 2 modifiers. Peek before commit. Act without menus. Transform without toolbars.
   - *Problem solved:* power users don't leave the home row; mouse-only = friction.
   - *Evidence:* Linear single-key + hold-Space [Grade A — evidence/linear.md §14], Raycast `⌘⇧Tab` Quick AI [Grade A — evidence/raycast.md §14], VS Code prefix grammar [Grade A — evidence/vscode.md §14], Helix selection-first [Grade A — evidence/helix.md §14].
   - *HCI grounding:* Fitts's Law [Grade A — academic/fitts-law.md], Hick's Law [Grade A — academic/hicks-law.md], Raskin quasimodes [Grade B — academic/jef-raskin.md].

## 1.5 Design Philosophy

> **Apple's calm deference + Material's token rigor + Fluent's prescriptive component-depth mapping — minus each system's signature excess.**

[EVIDENCE Grade A — research-group-E.md + research-group-I.md]

- No over-glass (Apple excess — Liquid Glass everywhere becomes noise).
- No wallpaper-derived color, no bottom tab bars, no FAB (Material excess).
- No per-product brand colors, no enterprise chrome, no Segoe-only (Fluent excess).
- ONE accent, role-based, auto-flips per theme, user-pickable seed.
- Calm material depth — 1px hairlines + tonal separation for 90% of UI; shadows reserved for true floating layers.
- Multi-hour-use-optimized: prefer tonal separation over shadows; inline status over toasts.

### Restraint IS the product (Geist contribution)
[EVIDENCE Grade A — research-group-I.md §Geist] Vercel Geist: no second accent, no display weight above 600, no gradient miniaturization. Restraint isn't a constraint — it's the value proposition. MiMo adopts: pick ONE primary color, ONE accent (gradient at hero scale only), ONE display weight cap (800), ONE signature radius (12px cards / 16px modals). Document the *absence* of alternatives.

### Craft wins over scale (Linear contribution)
[EVIDENCE Grade A — evidence/linear.md §2] Karri Saarinen: "We started with quality. Reduce scope to increase quality." For MiMo (single-user OS), this is the only viable product strategy: ship fewer features at higher craft.

### Motion is a token, not a polish layer
[EVIDENCE Grade A — research-group-I.md] Primer, Atlassian, Linear all treat motion as a first-class Foundation. MiMo adopts: motion-as-token, not motion-as-afterthought.

### Trust is architectural, not UX
[EVIDENCE Grade A — academic/trust-in-ai.md + evidence/anytype.md §21 + evidence/granola.md §21 + evidence/bolt.md §21 + evidence/linear.md §21] Anytype/Granola/Bolt/Linear build trust through *what they structurally cannot do*. ChatGPT Canvas sunset + Genspark failed-task-still-charges broke trust through *what they did*. MiMo's trust is local-first + E2E + no-counters + no-deprecations architecturally, BEFORE per-hunk-accept/reject + source/timestamp/delete interactionally.

## 1.6 Core Principles (fixed rules, not suggestions)

| # | Principle | Reason |
|---|---|---|
| 1 | Conversation permanence | The spine is the OS; losing it loses the user's thread |
| 2 | Canvas adaptivity | One surface, many modes — avoids page navigation |
| 3 | Alive workflow | Spinners feel dead; real motion feels alive |
| 4 | Progressive disclosure | Cognitive overload is the silent killer |
| 5 | Keyboard as home | Power users don't leave the home row |
| 6 | Local-first | Render from cache, sync in background; "no spinners because nothing to wait for" |
| 7 | One AI surface | The conversation; compositional — not 8 overlapping features |
| 8 | Per-step accountability | Accept/reject on staged diffs; no 100% overwrites |
| 9 | No counters | Never impose credit/quota |
| 10 | Layout persistence | Every tab, width, scroll, mode, cursor survives |
| 11 | One model per dimension | Enforced at architecture level |
| 12 | Calm depth | Tonal separation + hairlines; shadows for floating only |

## 1.7 Product Identity

### What MiMo IS
- A Personal AI Operating System for one power user.
- Conversation-spine + canvas-per-mode.
- Local-first, E2E, no-counters, no-deprecations.
- Desktop-first with mobile companion.
- Keyboard-home.
- 8 adaptive workspace modes.
- One container (Project) + one branch (Fork) + one AI surface (Conversation).

### What MiMo IS NOT (the rejection list — with reasons)

- **Not a ChatGPT clone.** ChatGPT is chat-first + artifact-decoration; MiMo's conversation is the spine, the canvas is adaptive. ChatGPT sunsets working features (Canvas in GPT-5) — MiMo structurally never deprecates. ChatGPT has opaque memory — MiMo shows source + timestamp + delete on every memory. [EVIDENCE Grade A — evidence/chatgpt.md §13, §9, §21]

- **Not a Claude clone.** Claude is chat-first + Artifacts side panel; MiMo's artifact is a first-class tab-able runtime, not a side decoration. Claude is region-locked; MiMo is local-first (works anywhere). Claude has 4 overlapping surfaces (chat/Project/Artifact/Claude Code); MiMo has ONE AI surface. [EVIDENCE Grade A — evidence/claude.md §13, §21]

- **Not a Cursor clone.** Cursor is editor-first (chat is sidebar, not spine); MiMo's conversation is the spine. Cursor is code-only; MiMo is multi-mode (chat/research/code/writing/run/image/automation/data). Cursor silently removed @Docs (trust erosion); MiMo structurally never deprecates. Cursor has no auto-memory; MiMo auto-extracts + consolidates. [EVIDENCE Grade A — evidence/cursor.md §2, §9, §27]

- **Not a Manus clone.** Manus is agent-first + computer-pane (conversation is parallel, not spine); MiMo's conversation is the spine. Manus has per-command approval fatigue; MiMo uses per-task-type trust. Manus parallel execution confuses users; MiMo is sequential by default. [EVIDENCE Grade A — evidence/manus.md §2, §8, §27]

- **Not a Notion clone.** Notion is block-first (no spine); MiMo's conversation is the spine. Notion has 8 overlapping AI surfaces (block/property/Autofill/Q&A/Writer/Connector/Agents/Summary); MiMo has ONE AI surface. Notion has long-page lag (drops below 50fps on 1000+ blocks); MiMo virtualizes. [EVIDENCE Grade A — evidence/notion.md §5, §8, §20]

- **Not an Obsidian/Personal Knowledge Base.** PKM products are knowledge-first (no AI spine); MiMo's conversation is the spine. PKM requires user-maintained graphs; MiMo auto-derives knowledge from memory. Obsidian has NO first-party AI (deliberate); MiMo's AI is the spine. [EVIDENCE Grade A — evidence/obsidian.md §2, §8]

- **Not an AI chatbot.** Chatbots are conversation-only (no canvas); MiMo has canvas-per-mode. Chatbots have no memory/knowledge/personal model; MiMo has all three. Chatbots have no project/agent/artifact system; MiMo has all three.

### Why MiMo must be a standalone product
[EVIDENCE Grade B — cross-product analysis] No product studied combines: conversation-as-permanent-spine + canvas-as-adaptive-per-mode + local-first + E2E + no-counters + no-deprecations + 8 modes + one-container + one-branch + one-AI-surface + personal-model + knowledge-graph + daemon-mode. MiMo's recombination is unique. Each existing product chose one or two of these; none chose the combination. Therefore MiMo must exist as a standalone product, not a feature of another.

## 1.8 Target User

**The owner.** One person. Both:
- the developer (builds/maintains MiMo),
- the operator (uses MiMo daily),
- the end user (the only user).

Profile:
- Technical (developer or technical professional).
- Uses MiMo daily for multi-hour sessions.
- Values craft, focus, and long-term investment.
- Works in Arabic + English (RTL primary).
- Wants a system that grows with them over years.
- Cares about privacy (local-first + E2E).
- Power user (keyboard-first, command palette native).

## 1.9 Power-User Model

The owner is NOT a novice. They expect:
- Single-key shortcuts for daily actions (Linear `C/M/A/R/S` pattern).
- Hold-to-peek without commitment (Linear Space pattern).
- Quick AI on selection (Raycast `⌘⇧Tab` pattern).
- Prefix grammar in command palette (VS Code `>/@/#` pattern).
- Per-hunk accept/reject on diffs (Cursor pattern).
- State-edit-and-continue on long tasks (LangGraph pattern).
- Developer Mode for runtime introspection (Chrome DevTools pattern).
- Layout persistence across reloads (VS Code pattern).

## 1.10 Primary Jobs-to-be-Done

1. **Think out loud** — use the conversation as a thinking surface; MiMo remembers and connects.
2. **Build software** — code mode: write code with AI pair-programming, per-hunk accept/reject.
3. **Research deeply** — research mode: web search with inline citations, source grounding.
4. **Write** — writing mode: draft documents with AI assistance.
5. **Plan** — run mode: build plans, track goals, visualize timelines.
6. **Generate images** — image mode: AI image generation.
7. **Automate** — automation mode: background tasks, scheduled routines.
8. **Analyze data** — data mode: query data, visualize results.
9. **Remember everything** — memory auto-extracts; knowledge graph grows.
10. **Never lose context** — layout persistence, project scoping, conversation permanence.

## 1.11 Long-Term Purpose

After 5 years of daily use:
- MiMo knows the owner's complete intellectual history (memory + knowledge graph).
- The Personal Model is rich (skills with proficiency, goals with progress, habits, relationships).
- Projects accumulate with their own accent, scoped memory, MIMO.md, layout.
- The daemon runs scheduled routines (morning briefings, weekly reviews, file tidy-ups).
- The owner trusts MiMo structurally (local-first, E2E, no counters, no deprecations).
- MiMo feels like an extension of the owner's mind, not a tool they operate.

---

# PART 2 — MENTAL MODEL

## 2.1 The MiMo Metaphor

> **MiMo is a senior collaborator who never forgets.**

Not a tool (you use a tool). Not an intern (you direct an intern). Not a chatbot (you chat with a chatbot). A **senior collaborator**: you have a permanent conversation with them; they know your projects, your skills, your history, your preferences; they adapt to whatever you're working on; they show their work; they let you correct them per-step; they never forget; they never betray your trust.

This metaphor is deliberately *neutral* (not "teammate" like Devin, not "pair" like Aider, not "junior" like Sweep, not "tool" like Claude Code, not "Swiss-army" like Cody). [EVIDENCE Grade A/B — evidence/devin.md §3, evidence/aider.md §3, evidence/claude-code.md §3] The owner decides the collaboration depth per task: sometimes MiMo is a quiet assistant (chat mode), sometimes a researcher (research mode), sometimes a pair programmer (code mode), sometimes an executor (run mode).

## 2.2 The Mental Model Flow

```
User
 → Intent (what they want)
 → Context (what MiMo knows)
 → AI (the reasoning engine)
 → Agent (the executor, when needed)
 → Plan (approvable, when needed)
 → Execution (visible runtime motion)
 → Artifact (first-class output)
 → Memory (auto-extracted)
 → Knowledge (derived from memory)
 → Result (inline in conversation)
```

**Invariant:** The result returns inline in the conversation. The conversation never closes. Memory and knowledge accumulate in the background. The cycle repeats.

## 2.3 Primary Object Hierarchy

**[PRODUCT DECISION]** MiMo has exactly ONE primary object: the **Conversation**. Everything else orbits it.

| Object | Definition | Lifecycle | Scope | Visibility |
|---|---|---|---|---|
| **Conversation** | The permanent spine. Tab #1, pinned. Never closes. | App-lifetime | Global (within active project) | Always visible |
| **Project** | The ONLY container. One per long-running effort. | User-defined | Owns conversations (forks), artifacts, files, memory (scoped), knowledge, agents, settings | Visible via project chip + accent |
| **Fork** | The ONLY branch primitive. Branches a conversation from a turn. | Until closed | Belongs to parent project | Appears as new conversation tab |
| **Task** | A unit of agent work. Has lifecycle (planning→executing→validating→done). | Task-scoped | Belongs to conversation + project | Visible in ExecutionTrace + AgentDock |
| **Artifact** | A first-class output (code/markdown/image/diagram/research/plan). | Until deleted | Belongs to project | Opens as tab; auto-appears in ArtifactDock |
| **Agent** | A named role (Planner/Researcher/Builder/Reviewer/Verifier). | During task execution | Belongs to task | Visible in AgentDock when working |
| **Memory** | A stored fact/preference/skill/goal/event. | Until deleted (with decay) | Project-scoped or global | Visible in Memory tab + right sidebar |
| **Knowledge Entity** | A derived entity (skill/goal/person/project) with confidence + evidence. | Until archived | Project-scoped or global | Visible in Knowledge tab + right sidebar |
| **Context** | The assembled state (conversation + memory + knowledge + project + files + tools). | Per-turn | Per-conversation-turn | Visible via ExecutionTrace Context stage |
| **File** | A virtual FS entry scoped to a project. | Until deleted | Project-scoped | Visible in Files tab |
| **Workspace** | The entire OS (single instance, single user). | App-lifetime | Global | Always visible (the shell) |

**Rule:** No competing mental models. Project is the ONLY container. Fork is the ONLY branch. Conversation is the ONLY AI surface. [EVIDENCE Grade A — evidence/lovable.md §6, evidence/v0.md §6, evidence/notion.md §8: cognitive overload = multiple overlapping models]

## 2.4 Workspace Definition

The Workspace = the entire OS (single instance, single user). It contains Projects. It is NOT a container that competes with Project — it is the top-level scope.

## 2.5 Project Definition

A Project is the ONLY first-class container. One per long-running effort. Each project has:
- Accent color (user-pickable, tints rail + active tab — Arc per-Space pattern).
- `MIMO.md` grounding file (AGENTS.md convergence — Cursor/Codex/Claude Code/Windsurf).
- Scoped memory (hard toggle — ChatGPT Aug 2025 Project-only memory).
- Scoped knowledge entities.
- Scoped files (virtual FS).
- Scoped agents (per-project state + scope).
- Layout persistence (tabs, widths, scroll, mode, cursor — VS Code pattern).
- Per-project settings (default model, sandbox mode, approval policy).

## 2.6 Conversation Definition

The Conversation is the permanent spine:
- Pinned tab #1, cannot be closed.
- Continues across projects, modes, sessions (opening a project scopes, doesn't close).
- Streams (first token < 1s on cached context).
- Inline ExecutionTrace (real runtime motion per stage).
- Inline artifacts (generated artifacts appear as cards; click → tab).
- Inline agent messages (agent contributions render inline).
- Slash blocks (`/` at cursor — Notion pattern).
- Forkable (any turn can fork).
- Virtualized (1000+ messages ≥ 50fps).

## 2.7 Task Definition

A Task is a unit of agent work within a conversation:
- Lifecycle: planning → executing → validating → done (or error → recovery).
- Has an approvable plan (for code/UI tasks — Replit/Lovable pattern).
- Shows real runtime motion per stage.
- Per-step accept/reject on diffs (for code — Cursor pattern).
- State-edit-and-continue (LangGraph pattern).
- One-keystroke rewind (Aider/Claude Code pattern).

## 2.8 Artifact Definition

An Artifact is a first-class output (not a chat attachment):
- Types: code, markdown, image, diagram, research, plan, architecture, presentation, database-schema, wireframe, flowchart, spreadsheet.
- Opens as a tab (conversation stays underneath).
- ArtifactViewer is a runtime (gVisor-style sandbox + Pyodide/WASM for Python + CSP-locked iframe for React — Claude Artifacts pattern, CORRECTED from R1's Pyodide-only claim).
- WYSIWYG (AST-based direct manipulation, no LLM cost — Lovable Visual Edits + v0 Design Mode pattern).
- Versioned (hover thumbnails — Lovable Edit History pattern).
- Share URL (Claude `claude.site/public/artifacts/<uuid>` pattern).
- Provenance (which conversation/agent/prompt/model produced it — Tabnine pattern).

## 2.9 Agent Definition

An Agent is a named role within a task:
- Named roles: Planner, Researcher, Builder, Reviewer, Verifier.
- Hidden when idle (no static cards).
- Visible when working (living-workflow pipeline stepper).
- Per-agent model routing + per-agent scope (Cursor pattern).
- Per-task-type trust (not per-instance — Codex/Manus anti-pattern avoidance).
- Sub-agents (Claude Code pattern).
- Hierarchical delegation (OpenHands TaskToolSet pattern).

## 2.10 Memory Definition

Memory is a stored item (explicit or auto-extracted):
- Types: fact, preference, event, relation, skill, goal.
- Two-layer: explicit saved + implicit reference (ChatGPT pattern).
- Project-scoped (hard toggle) + global.
- Every item: source + timestamp + type + confidence + delete.
- Auto-extraction + consolidation + evolution.
- Confidence decay per type (skill=1yr, interest=180d, project=90d, memory=90d).
- Block-level addressing (stable IDs — Roam/Logseq/Tana pattern).

## 2.11 Knowledge Definition

Knowledge ≠ Memory. Knowledge is derived from memory via the consolidation engine:
- Entity types: identity, skill, interest, project, goal, person, memory, decision.
- Typed relationships (evidence-backed).
- Confidence decay per type.
- Semantic retrieval (5-factor scoring: relevance 0.35 + importance 0.20 + confidence 0.20 + freshness 0.10 + proximity 0.15).
- Per-claim source-to-quote citation (NotebookLM gold standard).
- Linked + unlinked references (Roam pattern).

## 2.12 Context Definition

Context is the assembled state for a turn:
- Conversation history (scoped to project, compressed if needed).
- Recalled memory (semantic retrieval).
- Project scope (files, MIMO.md, settings).
- Folder-as-context (if specified — Gemini Drive pattern).
- Previous step outputs (orchestrator passes depOutputs).
- Assembled by ContextBuilder (does NOT build prompts — that's PromptEngine's job).

---

# PART 3 — INFORMATION ARCHITECTURE

## 3.1 Navigation Hierarchy

```
MiMo OS (Workspace — single instance, single user)
├── Left Rail (≤ 8 icons, icon-only, collapsible via ⌘⇧L)
│   ├── Home (→ conversation tab)
│   ├── Projects (→ project switcher overlay, ⌘P)
│   ├── Files (→ files tab)
│   ├── Knowledge (→ knowledge tab)
│   ├── Memory (→ memory tab)
│   ├── Search (→ universal search overlay, ⌘/)
│   ├── Account (popover: theme / dev mode / settings)
│   └── Developer (conditional — only when devMode on, ⌘⇧D)
│
├── Top Bar (44px)
│   ├── Command trigger (⌘K)
│   ├── Current-Project chip (click → project switcher)
│   ├── Mode selector (8 modes: chat/research/code/writing/run/image/automation/data)
│   ├── Workspace Tabs (pinned conversation + spawnable)
│   └── Right cluster (search + sidebar toggle)
│
├── Center (active tab content — conversation is pinned #1)
│
├── Right Sidebar (adaptive — swaps by mode, resizable 260–440px, collapsible ⌘B)
│
└── Overlays (zero navigation — all are panels/drawers/modals)
    ├── Universal Search (⌘/)
    ├── Command Palette (⌘K)
    ├── Quick AI on selection (⌘⇧Tab)
    ├── Hold-Space peek (anywhere)
    ├── Project Switcher (⌘P)
    ├── Settings
    ├── Voice / Image Gen
    └── Developer Panel (only when devMode on)
```

**Rule:** The rail never exceeds 8 icons. The top bar never shows runtime metrics unless devMode. Tabs are the only multi-tasking surface. Everything else is an overlay. [EVIDENCE Grade A — academic/millers-law.md, academic/hicks-law.md, evidence/linear.md §5, evidence/vscode.md §5]

## 3.2 Object Ownership + Lifecycle

| Object | Parent | Children | Ownership | Lifecycle | Scope | Visibility |
|---|---|---|---|---|---|---|
| Workspace | (top) | Projects | App | App-lifetime | Global | Always |
| Project | Workspace | Conversations (forks), Artifacts, Files, Memory (scoped), Knowledge (scoped), Agents, Settings | User | User-defined | Owns everything below | Visible via chip+accent |
| Conversation | Project | Tasks, Messages, Inline Artifacts | User | App-lifetime (pinned) | Global within project | Always (pinned tab #1) |
| Fork | Conversation (parent) | (none — leaf) | User | Until closed | Belongs to parent project | New conversation tab |
| Task | Conversation | Agent runs, Tool calls | System | Task-scoped | Within conversation | ExecutionTrace + AgentDock |
| Artifact | Project | (versions) | User/Agent | Until deleted | Project | Tab + ArtifactDock |
| Agent | Task | (sub-agents) | System | During task | Within task | AgentDock when working |
| Memory | Project or Global | (relations) | System/User | Until deleted (with decay) | Project or Global | Memory tab + sidebar |
| Knowledge Entity | Project or Global | (relationships) | System | Until archived | Project or Global | Knowledge tab + sidebar |
| File | Project | (none) | User | Until deleted | Project | Files tab |
| Context | (per-turn) | (none — ephemeral) | System | Per-turn | Per-conversation-turn | ExecutionTrace Context |

## 3.3 Container Discipline [PRODUCT INVARIANT]

- **ONE container:** Project. No Workspace/Repl/Remix/Branch/Template/Skill sprawl. [EVIDENCE Grade A — evidence/lovable.md §6 (7 containers = overload), evidence/v0.md §6 (8 containers = overload)]
- **ONE branch primitive:** Fork. No Remix/Version/Branch/Template. [EVIDENCE Grade A — same]
- **ONE AI surface:** Conversation. No 8 overlapping AI features. [EVIDENCE Grade A — evidence/notion.md §8 (8 AI surfaces = overload)]
- **ONE tab strip:** Top bar.
- **ONE sidebar:** Right adaptive sidebar.
- **ONE rail:** Left rail (≤8 icons).
- **ONE overlay per function:** No duplicate overlays.
- **ONE motion tier system, ONE elevation system, ONE keyboard grammar, ONE explainability layer.** [EVIDENCE Grade A — academic/cognitive-load-theory.md: one model per dimension enforced at architecture level]

---

# PART 4 — CONTEXT ARCHITECTURE

## 4.1 Context Layers

MiMo separates context into 10 layers. Each has explicit rules for when it enters the AI's scope.

| Layer | What it is | Enters automatically? | Enters on demand? | Never enters? |
|---|---|---|---|---|
| **User Context** | Identity, preferences, language, timezone, energy pattern | ✓ (from Personal Model) | — | — |
| **Conversation Context** | Current + recent conversation history | ✓ (scoped to project) | `/clear`, `/compact` to manage | Cross-project conversations |
| **Project Context** | Active project's MIMO.md, settings, accent, scope | ✓ (on project switch) | — | Other projects' context |
| **Task Context** | Current task's plan, stage, previous step outputs | ✓ (during task) | — | Other tasks' state |
| **Agent Context** | Current agent's role, scope, model, accumulated state | ✓ (during agent work) | — | Other agents' state |
| **Memory Context** | Recalled memories (semantic retrieval) | ✓ (top N relevant) | `/forget <id>`, memory tab edit | Unrelated memories |
| **Knowledge Context** | Retrieved knowledge entities | ✓ (top N relevant) | — | Unrelated entities |
| **File Context** | Files in scope (folder-as-context if specified) | ✓ (if folder specified) | `@file` mention | Out-of-scope files |
| **Tool Context** | Available tools, their schemas, their permissions | ✓ (registered tools) | — | Disallowed tools |
| **Runtime Context** | Time, device, network state, devMode | ✓ | — | — |

## 4.2 Context Assembly

The **ContextBuilder** assembles the ContextObject from all layers. It does NOT build prompts — that's the PromptEngine's job.

```typescript
interface ContextObject {
  conversation: { id; history: ConversationTurn[] };
  task: { current: string; mode: PromptMode; description: string };
  user: { model: UserModel; preferences };
  memory: { recalled: MemoryEntry[]; relevant: RetrievalResult[] };
  knowledge: { entities: Entity[]; userModel: UserModel; retrieved: RetrievalResult[] };
  executive: { goals: Goal[]; topGoal; priorities; constraints; opportunities; ltm };
  environment: { project; files; recentEdits; time; timezone };
  sources: { web: SearchResult[]; local: Entity[] };
}
```

## 4.3 Context Hygiene Primitives [PRODUCT DECISION]

Explicit commands (Codex pattern):
- `/clear` — clear conversation context window (keeps memory).
- `/compact` — compress conversation to summary + key facts (lossless for facts, lossy for verbosity).
- `/forget <id>` — delete a specific memory.
- `/scope <project>` — switch project scope.
- `/folder <path>` — set folder-as-context (Gemini Drive pattern).

## 4.4 Per-Step Context

Each agent step sees:
- Conversation history (scoped to project, compressed if needed).
- Recalled memory (semantic retrieval).
- Project scope (files, MIMO.md, settings).
- Folder-as-context (if specified).
- Previous step outputs (orchestrator passes `depOutputs`).

## 4.5 Context Compression

When context exceeds budget, the CompressionEngine compresses:
- Original → compressed (ratio tracked).
- Removed messages logged.
- Lossless for key facts, lossy for verbosity.
- Visible in DeveloperPanel (when devMode on).

## 4.6 Context Transparency [PRODUCT INVARIANT]

**The user always knows what the AI is using.** [EVIDENCE Grade A — academic/explainable-ai.md, academic/human-ai-interaction.md Amershi G1 "make clear what the system can do"]

- ExecutionTrace Context stage shows: memory recalled, knowledge retrieved, files in scope, tools available.
- Every AI answer cites its sources (NotebookLM per-claim pattern).
- The user can edit context: `/clear`, `/compact`, `/forget`, `/scope`, `/folder`.
- The user can inspect context: DeveloperPanel → Context tab (when devMode on).

**Invariant:** No AI output without context transparency when external knowledge is used. [PRODUCT INVARIANT — see Part 29]

## 4.7 Context Overload Prevention

- **One model per dimension** (Part 2.3) — prevents competing contexts.
- **Project scoping** (hard toggle) — prevents cross-project bleed.
- **Semantic retrieval** (top N, not all) — prevents flooding.
- **Compression** (when over budget) — prevents token limit errors.
- **Progressive disclosure** (sidebar shows 1-3 panels, not all) — prevents visual overload.

---

# PART 5 — MEMORY ARCHITECTURE

## 5.1 Memory Types [PRODUCT DECISION]

| Type | Purpose | Example | Decay Halflife |
|---|---|---|---|
| fact | Verified information | "Owner's name: محمد عادل طلب" | ∞ (identity) / 90d (general) |
| preference | User preferences | "Prefers working late at night" | 180d |
| event | Life/work events | "Started MiMo Life OS Aug 2026" | 90d |
| relation | Typed links between memories | "Arduino relates to Gulf career goal" | 90d |
| skill | Proficiency with confidence | "Arduino — 85%" | 1 year |
| goal | Active goal with priority | "Work in Gulf after graduation" | 180d |

[EVIDENCE Grade A — evidence/chatgpt.md §9 (two-layer model), evidence/claude.md §9 (persistent memory Sep 2025), evidence/claude-code.md §9 (auto-memory), evidence/codex.md §9 (AGENTS.md 32KiB), evidence/obsidian.md §9 (file-over-app)]

## 5.2 Explicit vs Implicit Memory

- **Explicit saved memories** — facts, preferences, skills, goals the owner deliberately saves (or MiMo auto-extracts with owner confirmation).
- **Implicit history-reference** — the conversation history itself, recalled by relevance.

[PRODUCT DECISION — ChatGPT two-layer pattern adopted]

## 5.3 Memory Scopes

- **Project-only memory** — scoped to a project, hard toggle. No bleed between projects. [EVIDENCE Grade A — evidence/chatgpt.md §9: ChatGPT Aug 2025 Project-only memory]
- **Shared OS memory** — cross-project facts (owner's name, identity, global preferences).
- **Folder-as-context** — point at a directory, ask, get a sourced answer. [EVIDENCE Grade A — evidence/gemini.md §10: Gemini Drive pattern]

## 5.4 Every Memory Item Shows [PRODUCT INVARIANT]

- **Source** — which conversation turn / agent / tool produced it.
- **Timestamp** — when stored.
- **Type** — fact / preference / event / relation / skill / goal.
- **Confidence** — decayed over time per type halflife.
- **Delete button** — one click.

[EVIDENCE Grade A — evidence/chatgpt.md §27: ChatGPT opacity (5 states, no clear source) = anti-pattern. MiMo solves this.]

## 5.5 Auto-Extraction + Consolidation + Evolution

- **Auto-extraction** — facts/preferences/skills auto-extracted during conversation, shown in Memory tab with type filters. Owner confirms or rejects. [EVIDENCE Grade A — evidence/claude-code.md §9: Claude Code auto-memory (Claude-authored — UNIQUE)]
- **Consolidation** — topic mentions counted; when threshold reached (3 interest / 6 skill / 4 project), a knowledge entity is created/updated.
- **Evolution** — interest → skill (5 evidence) → expert (12 evidence + property). Visible in Knowledge tab.

## 5.6 Confidence Decay [PRODUCT DECISION]

Per-type halflife (Claude Code + Knowledge layer pattern):
- identity: ∞ (never decays)
- skill: 1 year (skills persist but rust)
- interest: 180 days (interests shift)
- project: 90 days (projects end)
- memory: 90 days (memories fade)
- goal: 180 days (goals evolve)

`decayedConfidence = base × exp(-age / halflife)`. Re-verification (new evidence) resets the clock + bumps confidence.

## 5.7 Block-Level Addressing [PRODUCT DECISION]

Every memory entry has a stable ID. Memories can be block-referenced (`((mem_id))`) in conversations. [EVIDENCE Grade A — evidence/roam.md §9, evidence/logseq.md §9, evidence/tana.md §9, evidence/heptabase.md §9: Roam invented, Logseq cloned, Tana supertag-extended, Heptabase card-extended — deepest PKM pattern]

## 5.8 Memory Primitives

- **Type** — fact / preference / event / relation / skill / goal.
- **Metadata** — arbitrary key-value (proficiency, priority, deadline, category).
- **Relations** — typed links between memories (`fromId`, `toId`, `relation`).
- **Confidence decay** — per-type halflife.

## 5.9 No-Code Query + Code Escape-Hatch

- **95% of users:** no-code query layer in Memory tab (type filters, search, date range, confidence threshold).
- **5% of users:** Datalog/SQL escape-hatch for complex queries (in DeveloperPanel).

[EVIDENCE Grade A — evidence/obsidian.md §10 (Bases + Dataview split), evidence/logseq.md §10 (Datalog)]

## 5.10 Local-First + E2E [PRODUCT INVARIANT]

- Memory stored locally (SQLite via Prisma).
- E2E encryption for any cloud sync (opt-in, off by default).
- Owner's data never leaves the machine without explicit consent.
- **Architectural trust** — MiMo structurally cannot betray the owner's memory.

[EVIDENCE Grade A — evidence/anytype.md §21 (E2E + local-first), evidence/granola.md §21 (no bots join calls), academic/trust-in-ai.md]

## 5.11 Preventing False Memory → "Fact"

[PRODUCT INVARIANT] MiMo prevents false memory from becoming "fact" via:
1. **Provenance** — every memory shows source (conversation/agent/tool).
2. **Confidence decay** — old memories fade unless re-verified.
3. **Owner confirmation** — auto-extracted memories require owner confirmation before becoming "saved" (explicit layer).
4. **Deletion** — one-click delete on every memory.
5. **Classify** — memories classified as fact / inference / opinion (Knowledge policies). Only high-confidence + high-evidence become "fact."
6. **`/* check-token */` hallucination-guard** — speculative/uncertain content marked for human review (Primer pattern). [EVIDENCE Grade A — research-group-I.md §Primer]

## 5.12 User Memory Controls

The user can:
- **See** all memories (Memory tab + right sidebar).
- **Understand source** (every memory shows source + timestamp).
- **Edit** any memory (inline edit in Memory tab).
- **Delete** any memory (one-click delete).
- **Prevent saving** (`/forget <id>`, or "don't save this" toggle per conversation).
- **Scope** (project-only vs global toggle).

---

# PART 6 — KNOWLEDGE ARCHITECTURE

## 6.1 Memory ≠ Knowledge [PRODUCT DECISION]

- **Memory** = stored items (facts, preferences, events, skills, goals). Raw data.
- **Knowledge** = derived entities (typed, related, evidence-backed, confidence-decayed). Structured understanding.

Memory is the input; Knowledge is the derived graph. The owner never maintains the graph; MiMo does (via the consolidation engine).

[EVIDENCE Grade A — evidence/notebooklm.md §10 (source-grounded knowledge), evidence/obsidian.md §10 (graph view), evidence/tana.md §10 (supertags), evidence/anytype.md §10 (typed relations)]

## 6.2 Knowledge Sources

- **Memory** (auto-derived via consolidation).
- **Files** (project files, when referenced).
- **Documents** (uploaded docs, when ingested).
- **Notes** (conversation-derived).
- **Web research** (research-mode sources, with citations).
- **Projects** (project-scoped entities).
- **External sources** (MCP tools, when invoked).

## 6.3 Knowledge Entity Model

```typescript
interface Entity {
  id: string;              // stable, deterministic (ent:type:slug)
  type: EntityType;        // identity | skill | interest | project | goal | person | memory | decision
  name: string;
  aliases: string[];
  properties: Record<string, unknown>;
  evidence: Evidence[];   // sources that support this entity
  confidence: number;      // 0..1, decayed over time
  status: 'active' | 'merged' | 'archived';
  changes: EntityChange[]; // history of property updates
  createdAt: number;
  updatedAt: number;
}
```

## 6.4 Relationships (typed, evidence-backed)

```typescript
interface Relationship {
  fromId: string;
  toId: string;
  type: string;            // 'has_skill' | 'works_on' | 'related_to' | ...
  evidence: Evidence;      // why this relationship exists
}
```

## 6.5 Knowledge Graph

- In-memory entity + relationship store.
- Indexed by type, name (lowercase), alias (lowercase).
- Emits events on add/update/link.
- Merge preserves history.
- `discoverRelations` (co-occurrence).

## 6.6 Knowledge Policies (classification)

- **Fact** — identity or high-weight user_statement.
- **Temporary** — single low-weight observation.
- **Inference** — half+ inference evidence.
- **Opinion** — default.

Policy determines retention + display + decay behavior.

## 6.7 Consolidation Engine

`observe()` counts topic mentions; when threshold reached (3 interest / 6 skill / 4 project), creates/upgrades Entity + links to user. `classifySubject()` heuristic (skill/project/goal/interest).

## 6.8 Evolution Engine

`checkEvolution()` upgrades interest → skill (5 evidence) → expert (12 evidence + property). Emits EVOLUTION_DETECTED.

## 6.9 Retrieval: When to Use What [PRODUCT DECISION]

| Retrieval type | When used | Evidence |
|---|---|---|
| **Direct retrieval** | Exact match (entity by ID, file by path) | O(1) lookup |
| **Semantic retrieval** | "What do I know about X?" — top N relevant entities | 5-factor scoring (relevance 0.35 + importance 0.20 + confidence 0.20 + freshness 0.10 + proximity 0.15) |
| **Graph retrieval** | "What's related to X?" — traverse relationships | `retrieveRelated()` via graph traversal |
| **Hybrid retrieval** | Complex queries — combine semantic + graph | Default for research-mode answers |

## 6.10 RAG vs GraphRAG [PRODUCT DECISION]

- **RAG** (Retrieval-Augmented Generation) — semantic retrieval of memory chunks + conversation history. Used for chat-mode answers.
- **GraphRAG** — graph traversal of knowledge entities + relationships. Used for research-mode answers + knowledge-grounded explanations.
- **Hybrid** — default for complex queries. Combine RAG (memory) + GraphRAG (knowledge) + direct (files).

[EVIDENCE Grade A — evidence/notebooklm.md §10 (source grounding), evidence/perplexity.md §10 (citations), evidence/heptabase.md §22 (per-paragraph citations)]

## 6.11 Citations + Source Tracing + Evidence [PRODUCT INVARIANT]

- **Per-claim source-to-quote citation** (NotebookLM gold standard). [EVIDENCE Grade A — evidence/notebooklm.md §10]
- **Inline numbered citations** (Perplexity `[1]` pattern). [EVIDENCE Grade A — evidence/perplexity.md §10]
- **Per-paragraph AI citations** (Heptabase pattern). [EVIDENCE Grade A — evidence/heptabase.md §22]
- Every knowledge retrieval returns an `Explanation`: summary, sources, confidence, knowledge class, evidence count, last verified, reasoning.

## 6.12 User Model (aggregated)

The UserModel aggregates the graph into:
- Identity (name, languages, location)
- Skills (with proficiency)
- Interests
- Projects
- Goals
- Relations
- Strengths + weaknesses
- Life goals

Cached, invalidated on graph change. Consumed by the ContextBuilder.

## 6.13 Knowledge Browser (tab)

The Knowledge tab is a visual explorer:
- Entity grid with proficiency bars.
- Type filters (skill / goal / fact / preference / event / project / person).
- Search.
- Click → entity detail (evidence, changes, relationships, confidence history).
- Graph view (clickable, type-colored map — Anytype pattern).

## 6.14 Linked + Unlinked References [PRODUCT DECISION]

Every entity shows:
- **Linked references** — explicit relationships.
- **Unlinked references** — implicit mentions in memories/conversations.

This turns implicit edges into explicit graph edges over time (Roam's accumulating-value pattern).

---

# PART 7 — AI ARCHITECTURE

## 7.1 Model Routing [PRODUCT DECISION]

MiMo is NOT locked to one model. Per-task model routing (Cursor pattern):
- **cheap/fast** — for tests, simple lookups, formatting.
- **deep** — for research, complex reasoning, code generation.
- **vision** — for image analysis, UI screenshots.
- **local** — for offline / privacy-sensitive (Aider `--oss` / Codex `--oss` pattern).

The owner can pick the model per query (Perplexity/GLM per-query model picker pattern). Default is the project's default model.

[EVIDENCE Grade A — evidence/cursor.md §8 (per-agent model routing), evidence/perplexity.md §25 (per-query picker), evidence/glm.md §22 (turn-level toggle), evidence/aider.md §25 (any model), evidence/codex.md §25 (--oss local)]

## 7.2 Prompt Strategy

**PromptEngine v2** (modular layer composition). Builds `ModelMessage[]` in fixed order:
1. **System** — MiMo identity + capabilities + current mode.
2. **Developer** — mode-specific instructions (chat / research / code / writing / run / image / automation / data).
3. **Memory** — recalled memories (with type + confidence).
4. **Knowledge** — retrieved entities (with confidence + class) + user model (skills, interests, projects).
5. **Executive** — goals, constraints, opportunities, LTM inferences, executive decision.
6. **History** — conversation turns (scoped to project, compressed if needed).
7. **Extra** — extra context (folder-as-context, previous step outputs).
8. **Safety** — content policy + output format.
9. **User** — the current user input.

Each layer is optional + composable. The PromptEngine NEVER calls the model — it only builds messages.

## 7.3 Prompt Modes

| UI Mode | Core PromptMode | Layer emphasis |
|---|---|---|
| chat | answer | memory + knowledge + user model |
| research | research | web sources + knowledge + citations |
| code / arduino / automation / data | code | folder-as-context + skills + agents |
| writing / run / image | answer | executive goals + plan |

## 7.4 Toggleable Reasoning Per-Prompt [PRODUCT DECISION]

The owner can toggle "deep reasoning" per prompt (GLM-4.7 turn-level Thinking pattern). When on, the model exposes its chain-of-thought (DeepSeek-R1 pattern) in the ExecutionTrace. When off, fast direct answer.

[EVIDENCE Grade A — evidence/glm.md §22, evidence/deepseek.md §22]

## 7.5 Output Styles (Claude Code pattern)

The owner toggles output style:
- **Do it** — execute the task.
- **Teach me** — explain the task + the approach.
- **Collaborate** — propose, discuss, then execute.

## 7.6 MIMO.md (AGENTS.md convergence)

Each project reads `MIMO.md` at workflow start — project-specific instructions, conventions, constraints. Generalizes the existing `MIMO_PRODUCT_SPEC.md` + `MIMO_ENGINEERING_SPEC.md` to per-project.

[EVIDENCE Grade A — evidence/cursor.md §9 (.cursorrules), evidence/codex.md §9 (AGENTS.md 32KiB), evidence/claude-code.md §9 (CLAUDE.md 5-tier), evidence/windsurf.md §9 (.windsurfrules)]

## 7.7 Context Builder

The ContextBuilder assembles the ContextObject (Part 4.2) from all engines. It does NOT build prompts — that's the PromptEngine's job. Separation of concerns.

## 7.8 Tool Selection

The Reasoner decides which tools to invoke based on:
- User intent (research → web_search; code → file_read/file_write/terminal; memory → memory_recall/memory_store).
- Project scope (allowed tools per project).
- Agent capabilities (registered agents' requiredTools).

Tools are registered in the ToolRegistry (idempotent). Lookups never throw on miss — return undefined.

## 7.9 Planning

The PlannerAgent detects intent + builds a Plan (steps + dependencies). For code/UI tasks, the plan surfaces as an approvable artifact BEFORE execution (Replit/Lovable pattern). For simple tasks, no plan is surfaced (Don Syme regret avoidance — don't over-structure).

## 7.10 Reasoning Depth

- **Simple** (chat mode) — single-step direct answer. No plan surfaced.
- **Multi-step** (run/code/research modes) — plan + execute + validate. Plan surfaced if code/UI.
- **Deep** (toggled) — exposed chain-of-thought in ExecutionTrace.

## 7.11 Verification

The Validator is the final gate (mandatory). Every response passes through:
- **Completeness** — non-empty, min length, short-answer warning.
- **Error check** — surfaces run failures as graceful user message.
- **Format check** — detects unclosed code fences.
- **Sanitisation** — trim, collapse 3+ newlines, strip trailing whitespace.
- **Exception guard** — never throws, always returns a report.
- Emits `response.ready` + `error.occurred` events.

No bypass paths. The `/api/chat` route does ONLY: buildContext → runWorkflow → return `validation.sanitisedAnswer`.

## 7.12 Retry + Recovery + Output Validation

- **Retry** — on transient failure (network, model timeout), automatic retry with backoff (max 3).
- **Recovery** — on hard failure, the RecoveryEngine suggests recovery strategies (retry / alternative / skip+continue / abort+rollback).
- **Output validation** — the Validator gates every output. Hallucination-guard: speculative content marked with `/* check-token */` (Primer pattern).

## 7.13 Agent Selection

The Orchestrator selects agents based on:
- Task type (research → ResearchAgent; code → WriterAgent with code mode; memory → MemoryAgent).
- Required capabilities (agentRegistry.withCapability).
- Project scope (per-project agent state).

## 7.14 Model Evolution [PRODUCT INVARIANT]

MiMo is NOT locked to one model. The ModelRegistry supports multiple models (default: ZAI model). New models can be registered at runtime. The owner can switch models per query or per project. This ensures MiMo evolves as models improve.

---

# PART 8 — AGENT ARCHITECTURE

## 8.1 Agent Types [PRODUCT DECISION]

Named roles (Genspark pattern, bounded to 6-stage pipeline — not 9+ parallel agents):

| Agent | Role | Stage | Tools |
|---|---|---|---|
| **Planner** | Detects intent, builds the plan | Context + Reason | memory_recall, memory_store |
| **Researcher** | Web research, source gathering | Execute (research mode) | web_search |
| **Builder** | Writes code, runs commands | Execute (code/build mode) | file_read, file_write, terminal |
| **Reviewer** | Checks completeness, errors, format | Validate | (analysis only) |
| **Verifier** | Runs tests, validates diffs | Validate (code mode) | terminal, file_read |

The owner sees these names in the AgentDock when expanded.

## 8.2 Agent Lifecycle

```
idle (hidden) → planning (if code/UI) → executing → validating → done
                                                     ↓
                                                  error → recovery → retry/abort
```

- **Idle:** invisible (no static cards — Manus/ChatGPT anti-pattern).
- **Planning:** plan surfaced as approvable artifact (for code/UI).
- **Executing:** visible in AgentDock (living-workflow pipeline stepper).
- **Validating:** Validator runs.
- **Done:** dock slides away; result inline in conversation.
- **Error:** inline + actionable + explainable (Part 24).

## 8.3 Agent Creation + Spawning

- Agents are registered in the AgentRegistry at kernel boot (idempotent).
- Spawning = the Orchestrator invokes an agent for a task step.
- Sub-agents (Claude Code pattern): the orchestrator can spawn a subagent for an isolated sub-task. Each subagent has its own scope + model + state, visible in the AgentDock as a nested entry.

## 8.4 Agent Delegation

Hierarchical delegation (OpenHands TaskToolSet pattern — formerly AgentDelegateAction):
- A parent agent can delegate a sub-task to a specialized subagent.
- The delegation is visible in the AgentDock.
- The subagent's result is reviewed by the parent before being surfaced.

[EVIDENCE Grade A — evidence/openhands.md §8]

## 8.5 Agent Communication

Agents collaborate through the **SharedWorkspace** (MAS layer):
- Each agent contributes evidence to a shared workspace.
- The QualityLayer does peer review + critique + verification + consensus.
- Visible to the owner as inline agent messages with citations.
- EventBus emits `agent.started`, `agent.completed`, `agent.failed` events.

[EVIDENCE Grade A — evidence/openhands.md §8 (event-stream 12 types), evidence/dust.md §8 (Temporal durability + per-agent observability)]

## 8.6 Agent Permissions [PRODUCT DECISION]

Per-agent model routing + per-agent scope (Cursor primitive):
- **Model** — cheap/fast for tests, deep for research, vision for images.
- **Scope** — read-only / src/ / docs/ / full-workspace.
- **Sandbox mode** — read-only / workspace-write / danger (Codex pattern).
- **Approval policy** — untrusted / on-request / never (Codex pattern).

Exposed in DeveloperPanel (when devMode on) + in plan-approval gate (for code/UI).

[EVIDENCE Grade A — evidence/cursor.md §8, evidence/codex.md §8 (3 sandbox × 4 approval modes), evidence/claude-code.md §8 (6 permission modes + hooks)]

## 8.7 Per-Task-Type Trust [PRODUCT INVARIANT]

MiMo learns trust **per task type**, not per instance. When the owner approves "run tests" three times, MiMo offers "Always allow this kind for this project." This avoids Codex/Manus's approval-prompt storms (the #1 complaint in both).

The trust ledger is per-project + per-task-type + per-scope, visible and editable in Settings.

[EVIDENCE Grade A — evidence/codex.md §27 (approval storms = #1 complaint), evidence/manus.md §27 (per-command approval fatigue), academic/trust-in-ai.md (calibrated trust)]

## 8.8 Single Agent vs Multi-Agent [PRODUCT DECISION]

**Default: Single-agent sequential pipeline.** [EVIDENCE Grade A — evidence/glm.md §8 (Z.ai defends single-agent-with-search-loop over multi-agent decomposition for context fidelity), evidence/manus.md §27 (parallel execution confuses users)]

**Multi-agent only when:**
1. There's a clear reason (e.g., research + coding simultaneously, where each has independent scope).
2. Each parallel agent has per-agent visibility in the AgentDock.
3. The owner can see all branches.

**Rule:** Never introduce parallel agents without per-agent visibility. [PRODUCT INVARIANT]

## 8.9 Agent Runtime

- **Subagents** — orchestrator spawns for isolated sub-tasks (Claude Code pattern).
- **Hooks** — after-edit hooks (auto-run tests, auto-format, auto-lint) configurable per-project (Claude Code pattern).
- **Background tasks** — long-running agent work continues while owner does other things; progress visible in conversation spine (Codex Cloud Agent pattern, adapted to local).

## 8.10 Agent Cancellation + Retry + Failure + Recovery

- **Cancellation** — owner can cancel any running agent (`Esc` or AgentDock cancel button). Agent stops at the next safe point.
- **Retry** — on transient failure, automatic retry with backoff (max 3).
- **Failure** — on hard failure, agent pauses (not crashes). Error shown inline (actionable). Owner can retry, edit, or abort.
- **Recovery** — RecoveryEngine suggests strategies. State-edit-and-continue (LangGraph pattern).

## 8.11 Agent Observability

- **AgentDock** (when working) — pipeline stepper, stage progress, agent name, last event, confidence, health.
- **DeveloperPanel** (when devMode on) — full agent registry, per-agent state, event stream, tool invocations, latency.
- **Audit log** — every agent action logged (what, when, by which agent, with what scope/model, approved or auto). Visible in DeveloperPanel Events tab.

## 8.12 Real-Time Partnership [PRODUCT DECISION]

The agent sees user edits and proactively offers consistency fixes (Windsurf rename-detection pattern — genuinely distinctive, no other product does it well):
- EventBus emits `user.edited` events.
- Relevant agent subscribes.
- Offers (never auto-applies) consistency fixes inline in the conversation.

[EVIDENCE Grade A — evidence/windsurf.md §8]

---

# PART 9 — HUMAN ↔ AI COLLABORATION

## 9.1 AI Autonomy Levels [PRODUCT DECISION]

| Level | Name | AI acts without asking? | Example |
|---|---|---|---|
| 0 | Suggest | No — proposes, waits for approval | "I suggest renaming this function. Apply?" |
| 1 | Assist | No — prepares, owner triggers | "I drafted the reply. Send?" |
| 2 | Act with confirmation | No — acts, asks to confirm | "I ran the tests. 2 failed. See results?" |
| 3 | Act + notify | Yes — acts, notifies after | "I auto-formatted the file. Undo?" |
| 4 | Autonomous | Yes — acts, no notification | Scheduled daemon task (e.g., tidy files) |

**Default per task type:** set via trust ledger (Part 8.7). Owner can override per task.

[EVIDENCE Grade A — academic/human-ai-interaction.md (Amershi G14 "scale from low to high autonomy")]

## 9.2 Approval Points [PRODUCT DECISION]

Mandatory approval before:
- **Destructive actions** (delete files, overwrite code, send external requests).
- **Code/UI execution** (plan approval gate — Replit/Lovable pattern).
- **First-time tool use** (per task type — until trust earned).
- **External network** (web requests, API calls — unless pre-approved).

No approval needed for:
- Read-only operations (memory recall, file read, search).
- Trusted task types (after 3 approvals — "Always allow this kind").
- Background daemon tasks (pre-approved by owner at scheduling time).

## 9.3 Human-in-the-Loop (HITL) vs Human-on-the-Loop (HOTL)

- **HITL** (default for code/UI): AI prepares, human approves before execution.
- **HOTL** (for background daemon tasks): AI acts, human reviews after.

[EVIDENCE Grade A — academic/human-ai-interaction.md]

## 9.4 User Override

- **Plan editing** — owner can edit the plan before approving (Replit pattern).
- **Execution control** — pause, resume, cancel, retry, undo, rollback.
- **State-edit-and-continue** — owner can edit the agent's state mid-task (LangGraph pattern).
- **One-keystroke rewind** — `Esc Esc` (Claude Code pattern) to undo the last agent action.
- **Auto-commit + revert** — Aider pattern (every agent edit is a git commit; revert is one command).

## 9.5 When MiMo Must Ask the User

1. **Destructive action** (delete, overwrite, external send).
2. **First-time tool use** (per task type).
3. **Ambiguous intent** (clarifying questions — Perplexity/Replit pattern).
4. **Plan for code/UI** (approvable artifact — Replit/Lovable pattern).
5. **Long-running task** (> 30s — plan approval).
6. **Out-of-scope action** (agent wants to access files outside project scope).
7. **Cost-sensitive action** (long research, many tool calls — confirm budget).
8. **Trust not yet earned** (per-task-type trust ledger).

## 9.6 When MiMo Acts Without Asking

1. **Read-only operations** (memory recall, file read, search).
2. **Trusted task types** (after 3 approvals).
3. **Background daemon tasks** (pre-approved at scheduling).
4. **Auto-extraction** (memory consolidation — shown in Memory tab, owner confirms).
5. **Recovery from transient failure** (retry with backoff, max 3).
6. **Compression** (context over budget — lossless for facts).

## 9.7 Pause / Resume / Cancel / Retry / Undo / Rollback

| Action | Trigger | Behavior |
|---|---|---|
| Pause | Owner clicks pause / `Esc` | Agent stops at next safe point; state preserved |
| Resume | Owner clicks resume | Agent continues from paused state |
| Cancel | Owner clicks cancel | Agent stops; partial results kept; state archived |
| Retry | Owner clicks retry (after error) | Restart from last checkpoint (not from scratch) |
| Undo | `Esc Esc` (Claude Code) | Rewind last agent action |
| Rollback | Owner clicks rollback | Revert to pre-task state (Aider auto-commit pattern) |

## 9.8 Confirmation Fatigue Prevention [PRODUCT INVARIANT]

- **Per-task-type trust** (not per-instance) — Part 8.7.
- **"Always allow this kind"** after 3 approvals.
- **No approval storms** (Codex/Manus anti-pattern).
- **Trust ledger** visible + editable in Settings.
- **Sandbox modes** (read-only / workspace-write / danger) reduce approval need.

---

# PART 10 — EXECUTION / RUNTIME UX

## 10.1 The User Must FEEL the AI Thinking [PRODUCT INVARIANT]

This is the single biggest 2025-2026 differentiator. [EVIDENCE Grade A — research-group-J.md §Cross-cutting insight #3: "Alive" requires real runtime motion, never spinners. Manus live browser + Bolt HMR + Gemini live thoughts + Cursor per-file diffs feel alive; v0 static + GLM no viz + ChatGPT spinner feel dead.]

## 10.2 Inline ExecutionTrace [PRODUCT DECISION]

`ExecutionTrace` renders INSIDE the streaming AI message (not in a separate dock):
- **Stage stepper:** Context → Reason → Plan → Execute → Validate → Done.
- **Real motion per stage:**
  - Context → shows memory + knowledge + history being assembled.
  - Reason → shows intent detection + complexity.
  - Plan → shows the plan being built (approvable for code/UI).
  - Execute → shows real terminal output, browser screenshots, file diffs, tool calls.
  - Validate → shows the validation report.
  - Done → the result appears inline.
- **Rotating brain icon** + "MiMo يعمل" label.
- **Animated:** stages light up sequentially with spring physics.

## 10.3 Never Fake [PRODUCT INVARIANT]

The ExecutionTrace is connected to the real Core pipeline. Stages reflect actual pipeline progress, not a timer. If slow, the trace shows it (no fake speedup). If error, the trace shows the error inline.

## 10.4 Approvable Plans

For code/UI tasks, the plan surfaces as an approvable artifact BEFORE execution:
- Plan renders inline (not in a separate panel — Don Syme regret avoidance).
- Owner can edit the plan before approving.
- Owner can reject and ask for a new one.
- Once approved, execution proceeds with per-step visibility.

[EVIDENCE Grade A — evidence/replit.md §12 (plan-approval gate), evidence/lovable.md §9 (.lovable/plan.md)]

## 10.5 Per-Step Accept/Reject [PRODUCT DECISION]

For code artifacts, staged diffs with per-hunk accept/reject (Cursor pattern — the single biggest regression-risk reducer):
- Each hunk shows the diff.
- Accept → applies the hunk.
- Reject → skips the hunk.
- "Accept all" / "Reject all" shortcuts.
- No 100% diff overwrites (Continue.dev anti-pattern).

[EVIDENCE Grade A — evidence/cursor.md §13, evidence/continue.md §27 (100% overwrites = anti-pattern)]

## 10.6 Live Runtime Pane (devMode only)

When devMode on, a live "Computer" pane (Manus pattern) shows:
- The actual browser the agent is using (screenshots).
- The actual terminal output.
- The actual file diffs per stage.

This is the deepest execution visualization — but only for developers. When devMode off, the inline ExecutionTrace suffices.

[EVIDENCE Grade A — evidence/manus.md §8 (live Computer pane)]

## 10.7 Execution Without Cognitive Overload [PRODUCT DECISION]

- **Inline by default** (not a separate dock — Don Syme regret).
- **Stage stepper** (6 stages, not 20 — Genspark 9+ agents = overload).
- **Real motion, not noise** (Manus live browser = alive; v0 spinner = dead).
- **Collapsible** (owner can collapse ExecutionTrace if they trust the task).
- **No approval storms** (per-task-type trust — Part 8.7).
- **No 100% overwrites** (per-hunk accept/reject — Part 10.5).

## 10.8 Task State Machine

```
empty → composing → sending → streaming → [ExecutionTrace inline] → finalizing → done
                                                                     ↓
                                                                  error → retry/recovery
```

Every state is visible. Every transition is < 100ms (Linear cause-and-effect threshold). Errors are inline and actionable, never modal.

## 10.9 Long-Running Task Supervision

- **Approvable plan** before execution (Part 9.5).
- **Visible progress** (ExecutionTrace + weighted progress bar + ETA when estimable).
- **Background execution** (owner can switch tabs/modes/projects; progress in conversation spine).
- **No blocking modals** (long tasks never block conversation).
- **Failure recovery** (pause, edit state, resume — LangGraph pattern).
- **Time-travel debugging** (step back, inspect past state, replay from node — LangGraph, devMode only).

---

# PART 11 — ARTIFACT SYSTEM

## 11.1 Artifact Definition [PRODUCT DECISION]

An Artifact is a first-class object (not a chat attachment). Each artifact has:
- Stable ID.
- Type (code / markdown / image / diagram / research / plan / architecture / presentation / database-schema / wireframe / flowchart / spreadsheet).
- Title.
- Content (or src for images).
- Versioning (hover thumbnails of prior versions).
- Provenance (which conversation turn / agent produced it).
- Sandbox state (for runnable artifacts).

## 11.2 Artifact Types

| Type | Editor | Runtime | Versioning |
|---|---|---|---|
| code | Monaco-style | Pyodide/WASM (Python) + CSP-locked iframe (React/HTML) — gVisor-style sandbox | git-style diff |
| markdown | WYSIWYG + raw | rendered markdown | version thumbnails |
| image | viewer + params | n/a | version thumbnails |
| diagram | SVG/Mermaid editor | rendered | version thumbnails |
| research | structured doc | rendered | version thumbnails |
| plan | approvable artifact | rendered | version thumbnails |
| architecture | diagram editor | rendered | version thumbnails |
| presentation | slide editor | rendered | version thumbnails |
| database-schema | schema editor | rendered | version thumbnails |
| wireframe | canvas editor | rendered | version thumbnails |
| flowchart | flow editor | rendered | version thumbnails |
| spreadsheet | cell editor | rendered | version thumbnails |

## 11.3 Artifact Lifecycle

```
generated inline (card in conversation)
  → appears in ArtifactDock (right edge)
  → opens as tab (click)
  → editable in ArtifactViewer (runtime for code, WYSIWYG for docs)
  → versioned (hover thumbnails)
  → forkable (creates a new artifact tab)
  → exportable (download / share via URL)
```

## 11.4 ArtifactViewer [PRODUCT DECISION]

- **Code artifacts:** Pyodide/WASM sandbox for Python; CSP-locked iframe for React/HTML. Real runtime, not a preview (Claude Artifacts pattern — CORRECTED: gVisor containers, not Pyodide-only as R1 claimed).
- **Markdown artifacts:** rendered markdown + edit mode (WYSIWYG).
- **Image artifacts:** image viewer + generation parameters.
- **Diagram artifacts:** rendered SVG/Mermaid.
- **Per-hunk accept/reject:** for code artifacts generated by agents, staged diffs with per-hunk accept/reject (Cursor pattern).
- **WYSIWYG:** deterministic AST-based direct manipulation over previews, no LLM cost (Lovable Visual Edits + v0 Design Mode pattern).
- **Versioning:** hover thumbnails of prior versions (Lovable Edit History pattern).

[EVIDENCE Grade A — evidence/claude.md §13 (gVisor VERIFIED), evidence/cursor.md §13 (per-hunk), evidence/lovable.md §13 (Visual Edits), evidence/v0.md §13 (Design Mode ACTIVE — corrected), evidence/lovable.md §13 (Edit History)]

## 11.5 Artifact Dock

- Right-edge vertical strip.
- Appears ONLY when artifacts exist.
- Click the strip → expands to a panel showing all artifacts.
- Click an artifact → opens as a tab.
- Streaming artifacts show a "● live" indicator.

## 11.6 Artifact Provenance [PRODUCT INVARIANT]

Every artifact shows:
- Which conversation turn produced it.
- Which agent produced it.
- The prompt that generated it.
- The model used.
- The timestamp.

[EVIDENCE Grade A — evidence/tabnine.md (provenance + attribution pattern)]

## 11.7 Shareable URLs [PRODUCT DECISION]

Artifacts can be shared via URL (`/artifact/<uuid>`) — instant hand-off from chat to shareable artifact (Claude `claude.site/public/artifacts/<uuid>` pattern). Shared artifacts are read-only snapshots.

[EVIDENCE Grade A — evidence/claude.md §13 (share URL VERIFIED)]

## 11.8 Artifact Relationship

- **To conversation:** generated inline as card; opens as tab; conversation stays underneath.
- **To project:** belongs to project; project-scoped.
- **To task:** produced by a task; provenance tracked.

## 11.9 Partial Accept + Rollback

- **Partial accept:** per-hunk accept/reject (Part 10.5). Owner can accept some hunks, reject others.
- **Rollback:** revert to pre-artifact state (Aider auto-commit pattern). Every artifact edit is a version; rollback is one click.

---

# PART 12 — CONVERSATION MODEL

## 12.1 Conversation Lifecycle

- **Created:** on app first-run (seeded) or via `C` (new conversation).
- **Pinned:** tab #1, cannot be closed.
- **Continues:** across projects (opening a project scopes, doesn't close), modes, sessions.
- **Forks:** any turn can fork (creates a new conversation tab).
- **Archived:** owner can archive (not delete — data loss prevention).
- **Searched:** Universal Search finds within conversations.

## 12.2 Threads + Branches

- **Threads:** a conversation is a single thread (no sub-threads — keeps one model).
- **Branches:** Fork is the ONLY branch primitive (Part 2.3). A fork creates a new conversation tab with the forked turn as root.

## 12.3 Context Management

- `/clear` — clear context window (keeps memory).
- `/compact` — compress to summary + key facts.
- `/forget <id>` — delete a memory.
- `/scope <project>` — switch project scope.
- `/folder <path>` — set folder-as-context.

## 12.4 Attachments + Artifacts + Tasks + Execution + Memory + Search

- **Attachments:** files attached to a message (via `@file` mention or drag-drop).
- **Artifacts:** generated inline as cards; click → tab.
- **Tasks:** ExecutionTrace inline; AgentDock when working.
- **Execution:** inline (Part 10).
- **Memory:** auto-extracted; shown in right sidebar + Memory tab.
- **Search:** Universal Search (`⌘/`) searches conversations.

## 12.5 Long Conversations [PRODUCT DECISION]

- **Virtualization:** message list virtualized (windowing); 1000+ messages ≥ 50fps.
- **Context compaction:** when over budget, CompressionEngine compresses (lossless for facts, lossy for verbosity). [EVIDENCE Grade A — evidence/claude.md §9 (context compaction Nov 24 2025)]
- **Summarization:** `/compact` produces summary + key facts.
- **Fork:** on "long chat detected" (v0 pattern), offer fork.

## 12.6 Conversation Replay

- **Time-travel** (devMode only — LangGraph pattern): step back through the conversation, inspect past state, replay from any turn.
- **Replay** (devMode only): re-run from a past turn with edited context.

---

# PART 13 — WORKSPACE MODEL

## 13.1 Workspace

The Workspace = the entire OS (single instance, single user). Contains Projects. NOT a container competing with Project — it's the top-level scope.

## 13.2 Projects

One per long-running effort. Each project has: accent, MIMO.md, scoped memory, scoped knowledge, scoped files, scoped agents, layout persistence, per-project settings (Part 2.5).

## 13.3 Tabs [PRODUCT DECISION]

- **Pinned:** conversation tab #1. Cannot be closed. Accent dot indicator.
- **Spawnable:** artifacts, files, memory, knowledge, projects, dashboard. Each opens as a new tab.
- **Ephemeral:** research/draft tabs auto-archive after 7 days disuse. Recoverable via Universal Search (Arc Today pattern).
- **`Alt+1..9`:** switch tabs by number.
- **`⌘W`:** close active tab (except pinned conversation).
- **`⌘T`:** new tab (tab-type picker).
- **Layout persistence:** every tab, width, scroll survives reload (VS Code pattern).

[EVIDENCE Grade A — evidence/arc.md §6 (Pinned/Today + auto-archive), evidence/vscode.md §6 (layout persistence), evidence/linear.md §5 (single-issue-list), evidence/claude.md §13 (Artifacts as tab-able)]

## 13.4 Panels + Windows + Split Views

- **Panels:** left rail, top bar, center, right sidebar, AgentDock (floating), ArtifactDock (right edge).
- **Windows:** v1 is single-window. Multi-window deferred to v2 (Part 26).
- **Split views:** deferred to v2. v1 is single-tab-focus. [PRODUCT DECISION — split views add a second model (which tab is primary?) and cognitive load. Ship v1 single-focus first.]

## 13.5 Focus Mode

- **Focus mode:** hides right sidebar + rail (via `⌘⇧L` + `⌘B`). Only conversation + composer visible.
- **Zen mode:** full-screen conversation (no chrome). Via `⌘⇧Z` (future).

## 13.6 Multi-Tasking

- **Tabs** (primary multi-tasking surface).
- **Background tasks** (long-running agent work continues while owner switches tabs).
- **Overlays** (`⌘K`, `⌘/`, `⌘P`) — summoned without leaving conversation.

## 13.7 Recent Work + Persistent State

- **Recent work:** "Recent" section in project switcher (last 5 projects).
- **Persistent state:** every tab, width, scroll, mode, cursor survives reload (VS Code pattern).
- **Auto-save:** conversations, memory, artifacts, layout all auto-save.

## 13.8 Long-Session Suitability [PRODUCT INVARIANT]

The system is suitable for multi-hour daily use:
- **Calm depth** (tonal separation, not shadow-heavy — Part 16).
- **Virtualization** (no scroll jank on 1000+ messages).
- **Local-first** (no network in critical path — Linear pattern).
- **No notification spam** (inline status, Snackbar only for confirmations).
- **No credit counters** (never impose limits).
- **Layout persistence** (return to exactly where you were).

---

# PART 14 — SEARCH

## 14.1 Unified Search [PRODUCT DECISION]

ONE search (not separate search pages). `⌘/` opens Universal Search — ONE input that searches everything:
- Conversations (client-side, fuzzy).
- Memory (via `/api/mimo/workspace?q=`).
- Knowledge entities (via the same API).
- Files (virtual FS).
- Artifacts.
- Commands (quick actions).
- Projects.
- Agents.

[EVIDENCE Grade A — evidence/vscode.md §11 (prefix grammar), evidence/arc.md §11 (command bar), evidence/notion.md §11 (search), evidence/linear.md §11 (local MobX pool), evidence/raycast.md §11 (ONE launcher)]

## 14.2 Local-First [PRODUCT DECISION]

- Renders from local cache.
- Background sync.
- < 80ms first open.
- No loading state (Linear's "no spinners because nothing to wait for").

[EVIDENCE Grade A — evidence/linear.md §11, §20]

## 14.3 Fuzzy Filter

- Filters as you type.
- Results grouped by kind (conversation / memory / knowledge / file / artifact / command / project / agent).
- Each result shows: icon, title, subtitle, kind badge.
- `↑↓` to navigate, `↵` to select, `Esc` to close.

## 14.4 Prefix Grammar [PRODUCT DECISION]

In the Command Palette (`⌘K`):
- `>cmd` — commands.
- `/search` — search.
- `@mem` — memory.
- `#file` — files.
- `!ai` — quick AI.

ONE input with prefix grammar — NOT separate ⌘K + ⌘/ (research finding: 5 products converged on this).

[EVIDENCE Grade A — evidence/vscode.md §11, evidence/arc.md §11, evidence/notion.md §11]

## 14.5 Ranking + Scope + Filters

- **Ranking:** by relevance (fuzzy score) + recency + frequency.
- **Scope:** current project by default; `⌘⇧/` for global.
- **Filters:** by kind (via prefix grammar).

## 14.6 Search Everywhere

Search accessible from:
- `⌘/` — Universal Search.
- `⌘K` — Command Palette (with prefix grammar).
- Rail Search icon.
- Top bar Search icon.

All open the same overlay.

---

# PART 15 — COMMAND SYSTEM

## 15.1 Command Palette [PRODUCT DECISION]

`⌘K` opens ONE palette with prefix grammar (Part 14.4). Opens in < 80ms. Fuzzy filter as you type. Cursor in input on open. `Esc` closes.

## 15.2 Keyboard Language [PRODUCT DECISION]

| Shortcut | Action |
|---|---|
| `⌘K` | Command Palette (prefix grammar) |
| `⌘/` | Universal Search |
| `⌘B` | Toggle right sidebar |
| `⌘P` | Project switcher |
| `⌘T` | New tab |
| `⌘W` | Close tab (not pinned conversation) |
| `⌘⇧L` | Toggle left rail collapse |
| `⌘⇧D` | Toggle Developer Mode |
| `⌘⇧Tab` | Quick AI on selected text (Raycast killer feature) |
| `Alt+1..9` | Switch to tab N |
| `Space` (hold) | Peek at hovered sidebar item (Linear pattern) |
| `/` (in conversation) | Slash block menu (Notion pattern) |
| `C` | New conversation (single-key, Linear) |
| `M` | Open Memory tab |
| `A` | Open Agents / Agent dock |
| `R` | Switch to Research mode |
| `S` | Open Settings |
| `Enter` | Send message |
| `⇧Enter` | Newline in composer |
| `Esc` | Close any overlay |
| `Esc Esc` | Rewind last agent action (Claude Code pattern) |

**Cap: 2 modifiers max.** No 3-modifier hotkeys (Raycast anti-pattern).

[EVIDENCE Grade A — evidence/linear.md §14, evidence/raycast.md §14, evidence/vscode.md §14, evidence/helix.md §14, evidence/notion.md §14, evidence/claude-code.md §14]

## 15.3 The ONE Defining Interaction [PRODUCT DECISION]

**Hold `Space` to peek + `⌘K` to act + `⌘⇧Tab` for Quick AI on selection.**

Combines Linear's peek, Raycast's quick-AI, VS Code's prefix grammar, Notion's slash, Arc's command-as-tab-creation into one coherent keyboard language — without copying any.

## 15.4 Single-Key Daily-5 (Linear pattern)

`C` (new conversation), `M` (memory), `A` (agents), `R` (research mode), `S` (settings). Visible as learning aids in the Command Palette.

## 15.5 Quick AI on Selection [PRODUCT DECISION]

`⌘⇧Tab` on selected text → AI verb on the selection (rewrite, explain, translate, summarize, expand). This makes AI a *verb* on the current selection, not a destination. Raycast's `⌘⇧Tab` Quick AI — the killer feature for an AI OS.

[EVIDENCE Grade A — evidence/raycast.md §14]

## 15.6 Hold-Space Peek (Linear pattern)

Hold `Space` on any sidebar item → preview in 100ms; release → dismiss in 80ms. Zero commitment. Applies to conversations, memory entries, agents, projects.

[EVIDENCE Grade A — evidence/linear.md §14]

## 15.7 Slash Blocks (Notion pattern)

`/` at cursor in conversation opens slash menu for AI blocks:
- `/summarize` — re-summarizes on input change.
- `/translate` — translates.
- `/diagram` — generates a diagram.
- `/plan` — generates a plan.

[EVIDENCE Grade A — evidence/notion.md §14]

## 15.8 Global vs Context Commands

- **Global:** `⌘K`, `⌘/`, `⌘P`, `⌘T`, `⌘W`, `⌘B`, `⌘⇧L`, `⌘⇧D`, `Alt+1..9`, `C`, `M`, `S`.
- **Context:** `R` (mode switch), `A` (agents, when active), `/` (slash, in conversation), `⌘⇧Tab` (Quick AI, on selection), `Esc Esc` (rewind, when agent ran).

---

# PART 16 — VISUAL / UX SYSTEM

## 16.1 Visual Hierarchy

| Element | Contrast | Elevation |
|---|---|---|
| Conversation messages | highest (text-primary on bg) | 0 |
| Sidebar panels | medium (text-secondary on bg2) | 1 |
| Rail icons | low (text-secondary), brighten on hover/active | 0 |
| Overlays | modal scrim 32% + blur(6px) | 4 |
| Accent | one user-pickable per project, used sparingly | — |

**Where the eye goes first:** the conversation. Always. The only full-height, full-width region in default state.

## 16.2 Layout Grid

**4px base unit.** Scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48. [EVIDENCE Grade A — research-group-E.md: Material + Fluent convergence]

| Region | Dimension |
|---|---|
| Left rail | 56px (icon-only) |
| Top bar | 44px height |
| Right sidebar | 320px default, 260–440px resizable |
| Conversation max-width | 820px (centered) |
| Composer max-width | 820px |
| Tab height | 34px |
| Rail icon button | 36×36px |
| Top bar button | 30×30px |
| Card radius | 12px |
| Modal radius | 16px |
| Popover radius | 13px |
| Badge radius | 20px |
| Progress radius | 99px |

## 16.3 Spacing Tokens

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

## 16.4 Typography

**Single system-font stack:** `-apple-system, 'Segoe UI', 'Roboto', system-ui, sans-serif`.
**Mono stack:** `'SF Mono', 'Cascadia Code', 'JetBrains Mono', 'Courier New', monospace`.
**Arabic:** IBM Plex Sans Arabic loaded alongside system stack. Numerals stay Latin (ltr) inside RTL flow.

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

**Weight-for-hierarchy:** 400 / 500 / 600 / 700 / 800. Cap at 800 (Geist restraint — no 900).

## 16.5 Color Semantics [PRODUCT DECISION]

Token-first, semantic, role-based. ONE user-pickable accent seed. Auto-derived light/dark/high-contrast schemes.

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

**Paired foregrounds** (WCAG AA guaranteed): `on-primary`, `on-surface`, `on-success`, `on-warning`, `on-danger`, `on-info`.

[EVIDENCE Grade A — research-group-E.md: Apple + Material + Fluent convergence on token-first semantic role-based]

## 16.6 Per-Project Accent [PRODUCT DECISION]

Each project has one accent seed. Switching projects shifts the accent (200ms emphasized slide). Tints rail + active tab + inline accents.

[EVIDENCE Grade B — evidence/arc.md §5 (per-Space accent)]

## 16.7 Iconography

- **One variable-weight icon family** (Material Symbols style). Weight axis matches type weight.
- **Outline default; filled for selected state.**
- **Sizes:** 16 (inline) · 20 (buttons) · 24 (rail) · 32 (hero).
- **Inherit component color.**
- **Stroke weight:** 1.5px at 16px, 2px at 20px+ (optical alignment).
- **No emojis as functional icons** (emojis OK for notification severity only: ✅⚠️❌ℹ️).

## 16.8 Density

- **Default:** comfortable (12px padding, 16px gaps).
- **Compact** (future): 8px padding, 12px gaps. Via Settings.
- **Spacious** (future): 16px padding, 20px gaps. Via Settings.

## 16.9 Surfaces + Borders + Elevation

**5 elevation levels by intent** (Part 16.10). Calm material depth — 1px hairlines + tonal separation for 90% of UI; shadows reserved for true floating layers.

## 16.10 Elevation Model [PRODUCT DECISION]

| Level | Token | Use | Implementation |
|---|---|---|---|
| 0 | `base` | default surfaces | flat, no shadow |
| 1 | `hairline` | cards, panels | 1px solid border-hairline |
| 2 | `container` | nested surfaces | tonal-step background (bg3 on bg2) |
| 3 | `floating` | popovers, dock, dropdowns | shadow8 + hairline |
| 4 | `modal` | modals, overlays | shadow64 + scrim 32% black + blur(6px) |

**Never invent a 6th level.** Shadows reserved for levels 3–4 only. 90% of UI uses levels 0–2.

[EVIDENCE Grade A — research-group-E.md: Material 6 levels + Fluent 6 shadow tokens converge]

## 16.11 Focus States

- 2px accent outline + 2px offset.
- Always visible on keyboard nav.
- Never removed.

## 16.12 Empty States

- Calm (no clutter).
- One icon + one headline + one hint.
- Actionable (e.g., "Start a conversation" button).

## 16.13 Loading States

- **Inline ExecutionTrace** (not spinner) for AI work.
- **Skeleton** (gray placeholder) for data loading.
- **Optimistic UI** for instant actions (Part 20).
- **Progress bar** for long tasks.

---

# PART 17 — MOTION SYSTEM

## 17.1 Motion Philosophy [PRODUCT DECISION]

Motion serves **orientation + feedback + continuity** — NOT decoration.

[EVIDENCE Grade A — research-group-I.md: Primer/Atlassian/Linear treat motion as first-class Foundation]

## 17.2 Timing

**5 tiers (all under 500ms):**

| Tier | Duration | Use |
|---|---|---|
| instant | 0ms | summoned surfaces enter (Linear's signature) |
| micro | 100ms | hover, focus, state toggle |
| short | 200ms | panel expand, tab switch, stage light-up |
| medium | 300ms | popover, dock slide |
| long | 500ms (hard ceiling) | modal open, page transition |

[EVIDENCE Grade A — research-group-I.md: Primer 100/200/300/500, Linear 0/100/250/350, Stripe 500 ceiling. Linear `--speed-*` tokens INFERRED — ACCEPTED LIMITATION]

## 17.3 Easing

| Curve | Value | Use |
|---|---|---|
| emphasized | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` | default for expressive motion (Material) |
| standard | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | generic |
| spring | `{ stiffness: 280, damping: 26 }` | direct manipulation (drag, dock slide) |
| linear | never | (except progress bars) |

## 17.4 Asymmetric Timing (Linear differentiator)

- **Enter instantly** (0ms) — every summoned surface appears immediately.
- **Exit gradually** (150ms fade-out) — dismissals are graceful.

[EVIDENCE Grade B — evidence/linear.md §16 (inferred from community references)]

## 17.5 Transition Patterns (Fluent's 4)

1. **Enter/Exit** — fade + slight y (8px). For overlays, messages.
2. **Elevation** — shadow + scale (0.96→1). For popovers, dock.
3. **Top-level fade** — opacity only. For tab content swap.
4. **Container transform** — morph a card into a panel. For artifact open.

## 17.6 Micro-Interactions

- Hover: background change (100ms).
- Focus: ring appear (100ms).
- Click: scale 0.98 (50ms).
- Toggle: state change (100ms).

## 17.7 Runtime Motion (ExecutionTrace)

- Stages light up sequentially (spring physics).
- Rotating brain icon (1s linear repeat).
- "● live" indicator for streaming artifacts.

## 17.8 State Transitions

- Tab switch: top-level fade (200ms).
- Project switch: accent color shift + horizontal slide (200ms emphasized).
- Mode switch: sidebar content swap (200ms).
- Modal open: scale 0.96→1 + fade (300ms emphasized).
- Modal close: scale 1→0.96 + fade (150ms).

## 17.9 Reduced Motion [PRODUCT INVARIANT]

`prefers-reduced-motion: reduce` → disable all non-essential motion. ExecutionTrace announces via ARIA live region so screen-reader users get "AI is working" without motion.

[EVIDENCE Grade A — research-group-I.md: Primer MUST rule for reduced-motion]

## 17.10 Motion Rules (MUST / NEVER)

**MUST:**
- Animate only composited properties (`transform`, `opacity`); sometimes paint-triggering (`background-color`, `border-color`).
- Motion must reference origin (scale out of trigger, slide from toggle).
- `prefers-reduced-motion: reduce` → disable non-essential motion; ARIA live region for ExecutionTrace.
- Every transition < 500ms.

**NEVER:**
- Animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
- Exceed 500ms.
- Decorative-only motion.
- Infinite loops without user control.
- Motion as sole information channel (always pair with text/ARIA).

[EVIDENCE Grade A — research-group-I.md: Stripe + Linear + Primer convergence]

---

# PART 18 — RESPONSIVE SYSTEM

## 18.1 Size-Class Model [PRODUCT DECISION]

Apple's Compact / Regular size-class model (not just CSS breakpoints):

| Size class | Width | Behavior |
|---|---|---|
| Desktop (Regular) | ≥ 1024px | Full layout: rail + top bar + center + right sidebar + dock |
| Tablet (Regular compact) | 768–1023px | Right sidebar becomes a drawer (toggle); rail stays; tabs stay |
| Mobile (Compact) | < 768px | Rail collapses to 5-icon bottom bar; right sidebar = full-screen drawer; tabs = horizontal scroll; composer = bottom sticky |

[EVIDENCE Grade A — research-group-E.md §Apple: size-class/trait model over CSS breakpoints]

## 18.2 Desktop (primary surface)

Full layout. Rail + top bar + center + right sidebar + dock. This is the primary surface for multi-hour work.

## 18.3 Tablet

- Right sidebar becomes a drawer (toggle).
- Rail stays (icons-only).
- Tabs stay (horizontal scroll if needed).
- Composer stays at bottom.

## 18.4 Mobile (companion) [PRODUCT DECISION]

Mobile is a **companion**, not the primary surface. [EVIDENCE Grade A — evidence/v0.md §36 (iOS app for review), evidence/manus.md §36 (phone-dispatched tasks)]

Mobile is for:
- Reviewing agent work.
- Approving plans.
- Reading conversations.
- Quick searches.

NOT for:
- Full code editing.
- Long artifact creation.
- Multi-tab workspace work.

**Mobile behavior:**
- Rail collapses to 5-icon bottom bar (Home / Search / Memory / Notifications / Account).
- Right sidebar = full-screen drawer (swipe from right).
- Tabs = horizontal scroll (max 5 visible).
- Composer = bottom sticky (fixed).
- Mode selector = horizontal scroll (icons only).

## 18.5 What is Shown / Hidden / Merged / Modal / Nav

| Element | Desktop | Tablet | Mobile |
|---|---|---|---|
| Left rail | Full (icons) | Full (icons) | Bottom bar (5 icons) |
| Right sidebar | Visible | Drawer (toggle) | Full-screen drawer |
| Top bar | Full | Full | Compact (project chip + tabs only) |
| Tabs | Full | Full (scroll if needed) | Horizontal scroll (max 5) |
| Composer | Bottom | Bottom | Bottom sticky |
| AgentDock | Floating bottom | Floating bottom | Hidden (notifications only) |
| ArtifactDock | Right edge | Hidden (in tabs) | Hidden (in tabs) |
| DeveloperPanel | Floating | Hidden | Hidden |
| Mode selector | Full (8 modes) | Icons only | Icons only (scroll) |

## 18.6 Touch Targets

44px minimum (Apple's rule — more generous than Material's 48dp).

[EVIDENCE Grade A — research-group-E.md §Apple, academic/fitts-law.md]

## 18.7 No Bottom Tab Bars / FAB on Desktop [PRODUCT DECISION]

Desktop-first. No Material bottom tab bars. No FAB. These are mobile-only patterns.

---

# PART 19 — ACCESSIBILITY

## 19.1 Keyboard Accessibility [PRODUCT INVARIANT]

- Every action reachable in ≤ 2 modifiers.
- Tab order is logical.
- Escape closes overlays.
- Focus is trapped in modals.
- `Esc Esc` rewinds last agent action (Claude Code pattern).

## 19.2 Focus Management

- 2px accent outline + 2px offset. Always visible on keyboard nav. Never removed.
- Focus restoration: when an overlay closes, focus returns to the trigger.
- Focus trap: modals trap focus (Tab cycles within modal).

## 19.3 Screen Readers

- ARIA live regions announce "AI is working" + stage transitions.
- Every icon has `aria-label`.
- Every overlay has `role="dialog"` + focus trap.
- Every form input has a label.

## 19.4 ARIA

- `role="dialog"` for modals/overlays.
- `role="tablist"` + `role="tab"` + `aria-selected` for tabs.
- `role="status"` + `aria-live="polite"` for ExecutionTrace.
- `role="alert"` for errors.
- `aria-label` on all icon buttons.

## 19.5 Contrast

WCAG AA guaranteed via paired foreground tokens. Every background has a paired foreground with guaranteed AA contrast.

[VALIDATION REQUIREMENT — axe-core testing in implementation. Not yet verified.]

## 19.6 Reduced Motion [PRODUCT INVARIANT]

`prefers-reduced-motion: reduce` → disable all non-essential motion. ExecutionTrace announces via ARIA live region.

[EVIDENCE Grade A — research-group-I.md §Primer MUST rule]

## 19.7 Touch Targets

44px minimum (Apple). [VALIDATION REQUIREMENT — verify in implementation]

## 19.8 Zoom + Text Scaling

- Type roles rescale together (Apple Dynamic Type pattern).
- Zoom to 200% supported.
- Reflow at 400% (no horizontal scroll).

[VALIDATION REQUIREMENT — not yet tested]

## 19.9 Dynamic Content Announcements

- Streaming AI: ARIA live region announces stage transitions.
- New messages: announced politely.
- Errors: announced assertively.
- Background task completion: announced politely.

## 19.10 Cognitive Accessibility

- Calm default (no clutter).
- Progressive disclosure (complexity on demand).
- One model per dimension (no competing mental models).
- Clear empty states (icon + headline + hint).
- Actionable errors (retry/alternative).

[EVIDENCE Grade A — academic/cognitive-load-theory.md]

## 19.11 Validation Requirements (not yet verified)

- axe-core audit on all pages.
- NVDA/VoiceOver testing.
- Motor accessibility (switch control).
- Color blindness (actual palette testing).
- Seizure safety (photosensitive patterns).
- High-contrast theme testing.

**These are VALIDATION REQUIREMENTS for implementation, not verified claims.**

---

# PART 20 — PERFORMANCE PERCEPTION

## 20.1 Local-First [PRODUCT DECISION]

[EVIDENCE Grade A — evidence/linear.md §20: IndexedDB + MobX + sync engine → "no spinners because nothing to wait for"]

- Workspace data cached locally (SQLite via Prisma).
- Rendered from cache.
- Synced via WebSocket in background (when cloud sync on).
- No network in critical path.

## 20.2 Performance Targets [PRODUCT DECISION]

| Metric | Target |
|---|---|
| Cold-launch first paint | < 2s |
| Command palette first open | < 80ms |
| Hold-Space peek | < 100ms |
| Project switch | < 200ms |
| First AI token (cached context) | < 1s |
| Conversation scroll (1000+ messages) | ≥ 50fps |
| Modal editor blocks main editor | NEVER |

[VALIDATION REQUIREMENT — no quantitative benchmarks measured in research. Targets grounded in Linear/Stripe/Primer docs.]

## 20.3 Cause-and-Effect Threshold (Linear)

Durations < 100ms feel like responses; ≥ 100ms feel like delays. Hard rule: any reaction that should feel immediate must be < 100ms.

[EVIDENCE Grade B — evidence/linear.md §20]

## 20.4 Animate Only Composited Properties

`transform` / `opacity` (GPU-composited). Sometimes `background-color` / `border-color` (paint-triggering OK). NEVER `width` / `height` / `top` / `left` / `margin` / `padding` (layout-triggering).

[EVIDENCE Grade A — research-group-I.md: Stripe + Linear + Primer convergence]

## 20.5 Loading States

- **Inline ExecutionTrace** (not spinner) for AI work.
- **Skeleton** (gray placeholder) for data loading.
- **Optimistic UI** for instant actions.
- **Progress bar** for long tasks (weighted, with ETA when estimable).

## 20.6 Streaming

- Chat streamed (word-by-word typing effect).
- Agent work streamed (ExecutionTrace updates live).
- Artifacts streamed (content appears as generated).

## 20.7 Optimistic UI

- Send message → immediately appears (don't wait for server).
- Toggle → immediately changes (revert on error).
- Delete → immediately removes (undo on toast).

## 20.8 Skeletons

- Gray placeholder for loading data (conversation list, memory list, knowledge grid).
- Same shape as final content.
- Subtle pulse animation (1.5s, reduced-motion respected).

## 20.9 Progressive Rendering

- Conversation renders from local cache first.
- Memory renders from local cache first.
- Network sync updates in background.
- No blocking on network.

## 20.10 Background Work

- Long-running agent tasks continue in background.
- Progress visible in conversation spine (subtle indicator).
- Notification when done (Snackbar, not modal).

## 20.11 Caching

- UserModel cached, invalidated on graph change.
- Knowledge retrieval cached per query (TTL 6s).
- Workspace API response cached (6s).
- Conversation rendered from local store; streaming appends.

## 20.12 Offline Behavior

- Works fully offline (conversation, memory, knowledge, artifacts, agent pipeline).
- Web search + cloud model + cloud sync require internet.
- Graceful degradation (Part 23).

## 20.13 Runtime Feedback

- ExecutionTrace shows real runtime motion (terminal output, browser screenshots, file diffs).
- No spinners for AI work (Part 10).
- Progress bars for long tasks.
- ETA when estimable.

---

# PART 21 — TRUST / EXPLAINABILITY

## 21.1 Trust is Architectural [PRODUCT INVARIANT]

[EVIDENCE Grade A — academic/trust-in-ai.md + evidence/anytype.md §21 + evidence/granola.md §21 + evidence/bolt.md §21 + evidence/linear.md §21]

Trust is built through **what MiMo structurally cannot do**, not through trust-building UI features:
- **Local-first** — data never leaves the machine without explicit consent.
- **E2E encryption** — any cloud sync is E2E (opt-in, off by default).
- **No counters** — no credit/quota systems.
- **No deprecations** — working features never removed mid-redesign.

**Architectural trust FIRST; interactional trust SECOND.** This is the single biggest discovery from research.

## 21.2 Interactional Trust (necessary but insufficient)

On top of architectural trust:
- **Per-hunk accept/reject** on code diffs (Cursor pattern).
- **Source + timestamp + delete** on every memory (ChatGPT opacity fix).
- **Per-task-type trust** — "Always allow this kind" (Manus anti-pattern avoidance).
- **Approvable plans** before execution (Replit/Lovable pattern).
- **Inline citations** (Perplexity/Heptabase pattern).
- **Provenance** on every artifact (Tabnine pattern).

## 21.3 What AI Knows / Inferred / Did / Changed

| Question | Answer Source | Visibility |
|---|---|---|
| What does AI know? | Memory tab + Knowledge tab + Context (ExecutionTrace Context stage) | Always visible |
| What did AI infer? | Knowledge policies (fact / inference / opinion) + `/* check-token */` markers | Visible per entity |
| What did AI do? | Audit log (DeveloperPanel Events) + ExecutionTrace | Always visible (inline) |
| What did AI change? | Per-hunk diff (code) + version history (artifacts) | Always visible |
| Why did AI choose this action? | Decision explainer (executive layer) + exposed chain-of-thought (when deep reasoning on) | Visible on demand |
| Source? | Per-claim citation (NotebookLM pattern) | Inline |
| Evidence? | Knowledge entity evidence array | Visible per entity |
| Confidence? | Confidence score (0-1, decayed) | Visible per memory/entity |
| Tool execution? | ExecutionTrace Execute stage + audit log | Visible inline + DeveloperPanel |
| Permission? | Trust ledger (per-project + per-task-type + per-scope) | Visible in Settings |
| Audit trail? | EventBus events (logged) | DeveloperPanel Events tab |

## 21.4 Explainability Model [PRODUCT DECISION]

- **Per-claim source-to-quote citation** (NotebookLM gold standard). [EVIDENCE Grade A — evidence/notebooklm.md §10]
- **Per-paragraph AI citations** (Heptabase pattern). [EVIDENCE Grade A — evidence/heptabase.md §22]
- **Inline numbered citations** (Perplexity `[1]` pattern). [EVIDENCE Grade A — evidence/perplexity.md §10]
- **Exposed chain-of-thought** when "deep reasoning" toggled (DeepSeek-R1 + GLM-4.7 pattern). [EVIDENCE Grade A — evidence/deepseek.md §22, evidence/glm.md §22]
- **Decision explainer** (executive layer): reason + evidence + confidence + tradeoffs + alternatives + chosen strategy + summary. Visible in DeveloperPanel (devMode) + summarized inline.
- **`/* check-token */` hallucination-guard** (Primer pattern): every agent output marks speculative/uncertain content with a `check` annotation for human review. [EVIDENCE Grade A — research-group-I.md §Primer]

## 21.5 Trust Calibration [PRODUCT INVARIANT]

[EVIDENCE Grade A — academic/trust-in-ai.md: calibrated trust, not over-trust]

- MiMo never claims 100% confidence.
- Confidence scores shown (0-1, decayed).
- Uncertain content marked (`/* check-token */`).
- Owner can always override/correct.
- Per-task-type trust (not blanket).

## 21.6 Sources: NotebookLM + Apple PCC + Anytype + Codex + OpenHands + LangGraph (combined, not copied)

| Source | Pattern adopted | Not copied |
|---|---|---|
| NotebookLM | Per-claim source-to-quote citation | Source-only limitation (MiMo has persistent memory) |
| Apple PCC | Architectural trust (stateless + non-targetable + verifiable) | Cloud-only (MiMo is local-first) |
| Anytype | E2E + local-first | Typed-object graph (too steep for MiMo's flat Project model) |
| Codex | Named sandbox modes + named approval policies | Per-instance approval (MiMo uses per-task-type) |
| OpenHands | Event-stream as system substrate | Terminal-default UI (MiMo visualizes) |
| LangGraph | State-edit-and-continue + time-travel | Complexity (MiMo hides in devMode) |

---

# PART 22 — SECURITY / PRIVACY

## 22.1 Local-First [PRODUCT INVARIANT]

- Data stored locally (SQLite via Prisma).
- Never leaves the machine without explicit consent.
- Owner's data is structurally private.

[EVIDENCE Grade A — evidence/anytype.md §21, evidence/bolt.md §21, evidence/linear.md §21]

## 22.2 Encryption

- **At rest:** SQLite database encrypted (SQLCipher or equivalent).
- **In transit:** TLS for any API calls.
- **E2E for cloud sync:** opt-in, off by default. Server cannot read owner's data.

## 22.3 Secrets + API Keys

- **Secrets stored:** in OS keychain (macOS Keychain / Windows Credential Manager / Linux Secret Service).
- **API keys:** never in code; never in plaintext; always in keychain.
- **.env files:** for dev only; never in production.

## 22.4 Tool Permissions [PRODUCT DECISION]

- **Named sandbox modes** (Codex pattern): read-only / workspace-write / danger.
- **Named approval policies** (Codex pattern): untrusted / on-request / never.
- **Per-tool permissions:** each tool declares required permissions.
- **Per-project scope:** tools scoped to project files by default.

## 22.5 File Permissions

- Agent can only access files in project scope (unless explicitly granted).
- Folder-as-context requires explicit `@folder` mention.
- No access to system files, dotfiles, or outside-project paths without explicit consent.

## 22.6 Agent Permissions

- Per-agent scope (read-only / src/ / docs/ / full-workspace).
- Per-agent model routing (cheap/fast / deep / vision / local).
- Per-task-type trust ledger (visible + editable in Settings).
- Sub-agents inherit parent scope (cannot escalate).

## 22.7 Network Permissions

- Agent network access requires approval (unless pre-approved task type).
- Web requests logged (URL + timestamp + agent).
- External API calls require approval + API key (from keychain).

## 22.8 Sandboxing

- **Code execution:** gVisor-style sandbox (Claude Artifacts pattern) + Pyodide/WASM (Python) + CSP-locked iframe (React/HTML).
- **Agent runtime:** isolated process (where possible).
- **No remote code execution:** extensions are local; MCP servers run locally.

## 22.9 Audit Logs [PRODUCT INVARIANT]

Every agent action logged:
- What was done.
- When.
- By which agent.
- With what scope/model.
- Approved or auto.
- Result (success/failure).

Visible in DeveloperPanel Events tab. Never deleted (append-only).

[EVIDENCE Grade A — evidence/openhands.md §8 (append-only event-stream), evidence/dust.md §8 (per-agent observability)]

## 22.10 Data Export

- **Full export:** all conversations, memory, knowledge, artifacts, settings → JSON + Markdown.
- **One click:** Settings → Export.
- **Portable:** owner can take their data anywhere.

## 22.11 Data Deletion

- **Delete memory:** one-click (Memory tab).
- **Delete conversation:** archive first (30-day grace), then permanent delete.
- **Delete project:** archive first (30-day grace), then permanent delete.
- **Delete account / all data:** Settings → Delete Everything (requires confirmation + 7-day grace).

## 22.12 Backup

- **Auto-backup:** local backup daily (to a configurable path).
- **Cloud backup:** opt-in, E2E encrypted.
- **Restore:** one-click from backup.

## 22.13 Recovery

- **Crash recovery:** auto-restore last state on next launch.
- **Data corruption:** restore from backup.
- **Device loss:** restore from cloud backup (if enabled) on new device.

## 22.14 No Telemetry [PRODUCT INVARIANT]

- No usage tracking.
- No error reporting (unless owner opts in).
- No analytics.
- No phone home.

---

# PART 23 — OFFLINE / ONLINE

## 23.1 Offline-First [PRODUCT DECISION]

MiMo works fully offline. The conversation, memory, knowledge, artifacts, and agent pipeline all work without internet. Only web search + image generation + cloud model require internet.

[EVIDENCE Grade A — evidence/anytype.md §21 (local-first P2P), evidence/bolt.md §12 (local WebContainer), evidence/aider.md §25 (local LLM), evidence/codex.md §25 (--oss local)]

## 23.2 What Works Offline

- Conversation (with local model).
- Memory (local SQLite).
- Knowledge (local graph).
- Artifacts (local runtime).
- Agent pipeline (with local model).
- Search (local cache).
- All keyboard shortcuts.
- All workspace operations.

## 23.3 What Requires Online

- Web search (research mode).
- Cloud model (if selected).
- Cloud sync (if enabled).
- Image generation (if cloud model).

## 23.4 Graceful Degradation

- **Web search unavailable:** agent says so, continues without (uses local knowledge).
- **Cloud model unavailable:** fall back to local model (if configured) or queue.
- **Cloud sync unavailable:** queue changes, sync when online.
- **Image gen unavailable:** queue or fall back to local model.

## 23.5 Connection Indicator

A subtle indicator (top bar, only when offline) shows "offline" — not a modal, not a banner. Owner can continue working.

## 23.6 Local Model Support [PRODUCT DECISION]

MiMo supports local models (via Ollama or similar) for fully offline operation. Configured in Settings. Agent falls back to local when cloud unavailable.

[EVIDENCE Grade A — evidence/aider.md §25 (any model), evidence/codex.md §25 (--oss)]

## 23.7 Failure Behavior

### Internet disconnect
- Connection indicator appears.
- In-flight requests fail gracefully (retry on reconnect).
- Local operations continue.

### API failure
- Retry with backoff (max 3).
- Fall back to alternative model (if configured).
- Queue if no alternative.

### Quota exhaustion
- **No quotas** (MiMo has no credit system — Part 1.6 principle 9).
- If using external API with quotas, fall back to local model.

### Model failure
- Retry with backoff.
- Fall back to alternative model.
- Show error inline (actionable).

### Tool failure
- Agent continues without (if non-critical).
- Or retries (if transient).
- Or aborts (if critical) with recovery suggestion.

### Agent failure
- Pause (not crash).
- Error shown inline (actionable).
- Owner can retry, edit, or abort.
- RecoveryEngine suggests strategies.

---

# PART 24 — ERROR / RECOVERY

## 24.1 Error Taxonomy [PRODUCT DECISION]

| Error type | Cause | Display | Recovery |
|---|---|---|---|
| Network error | No connection / timeout | Inline error card | Retry button |
| Model failure | Model returned error / timeout | Inline error card | Retry / switch model |
| Tool failure | Tool execution failed | Inline in ExecutionTrace | Continue without / retry |
| Agent failure | Agent crashed / looped | Inline in AgentDock | Retry / abort |
| Validation failure | Validator rejected output | Inline in conversation | Fix + retry |
| Data error | Corrupt data / missing file | Inline error card | Restore from backup |
| Permission error | Action not allowed | Inline error card | Request permission / change scope |
| Crash | App crash | Recovery screen | Restore last state |

## 24.2 No Silent Failures [PRODUCT INVARIANT]

Every error is:
- **Inline** in the conversation (not a modal).
- **Actionable** (retry button, alternative suggestion).
- **Explainable** (what went wrong, why, how to fix).

[EVIDENCE Grade A — academic/jakob-nielsen.md heuristic 9 (error recovery), academic/human-ai-interaction.md Amershi G7 (efficiently recover from errors)]

## 24.3 User-Facing Errors

- **Human-readable** (not stack traces).
- **Actionable** (what can the owner do?).
- **Scoped** (which step failed?).
- **Recoverable** (retry / alternative).

## 24.4 Retry + Resume + Rollback + Recovery + Safe State + User Intervention

| Action | Trigger | Behavior |
|---|---|---|
| Retry | Owner clicks retry (after error) | Restart from last checkpoint (not from scratch) |
| Resume | Owner clicks resume (after pause) | Continue from paused state |
| Rollback | Owner clicks rollback | Revert to pre-task state (Aider auto-commit pattern) |
| Recovery | RecoveryEngine suggests | Retry / alternative / skip+continue / abort+rollback |
| Safe state | On crash | Auto-restore last state on next launch |
| User intervention | Owner pauses + edits state | State-edit-and-continue (LangGraph pattern) |

## 24.5 One-Keystroke Rewind [PRODUCT DECISION — STRENGTHENED per Amershi G7]

`Esc Esc` (Claude Code pattern) rewinds the last agent action. Combined with Aider's auto-commit + revert pattern (every agent edit is a git commit; revert is one command).

[EVIDENCE Grade A — evidence/claude-code.md §14, evidence/aider.md §12, academic/human-ai-interaction.md Amershi G7, academic/ben-shneiderman.md rule 6 (easy reversal)]

## 24.6 State-Edit-and-Continue [PRODUCT DECISION]

Owner can:
- Pause the task at any stage.
- Edit the state (e.g., correct a wrong assumption).
- Resume from the edited state.

LangGraph's killer DX feature — non-negotiable for any agent running > 2 min.

[EVIDENCE Grade A — evidence/langgraph-studio.md §24]

## 24.7 Time-Travel Debugging (devMode only)

Owner can:
- Step back through the pipeline.
- Inspect any past state.
- Replay from any node.

[EVIDENCE Grade A — evidence/langgraph-studio.md §24]

## 24.8 Fork as Recovery

If the owner wants to explore an alternative without losing the current thread, they fork the conversation. The original continues; the fork explores.

[EVIDENCE Grade A — evidence/v0.md §13 (Fork)]

## 24.9 No Modal Error Blocks [PRODUCT INVARIANT]

Errors NEVER block the main editor region (VS Code Settings anti-pattern). Always inline, always dismissable.

---

# PART 25 — PLUGIN / API ARCHITECTURE

## 25.1 Plugin Model [PRODUCT DECISION]

- **MCP integration** (Tana + GitHub + Claude Code + Amie + Superhuman pattern). [EVIDENCE Grade A — evidence/tana.md §25, evidence/github-spark.md §25, evidence/claude-code.md §25, evidence/amie.md §25, evidence/superhuman.md §25]
- **Custom tools via MCP.**
- **Custom agents via MCP.**
- **`@`-mention in chat** to invoke (GitHub pattern).

## 25.2 Tool Model

- Tools registered in ToolRegistry (idempotent).
- Each tool declares: id, name, description, category, inputSchema, outputSchema, permissions, execute().
- Lookups never throw on miss — return undefined.

## 25.3 API Model [PRODUCT INVARIANT]

- **One public API surface:** `@/core/index.ts` is the ONLY entry point. Anything not exported is internal.
- **No bypass paths:** no route may bypass the Context → Reason → Plan → Execute → Validate → Response pipeline.
- **Streaming:** chat + agent + artifacts all streamed.
- **Idempotent kernel boot:** `mimoKernel.boot()` safe to call multiple times.
- **Defensive APIs:** every Core API function wrapped in `safe()` (try/catch) at the API route layer.

## 25.4 API Routes

| Route | Purpose |
|---|---|
| `/api/chat` | streaming chat through full Core pipeline |
| `/api/image` | image generation |
| `/api/search` | web search |
| `/api/mimo/workspace` | aggregated workspace data (one poll for sidebar) |
| `/api/axp/*` | AXP routes (sessions, agents, artifacts, timeline, inspector, etc.) |

## 25.5 Extension Lifecycle

- **Install:** via MCP server URL or local path.
- **Register:** tool/agent registers with registry.
- **Invoke:** via `@`-mention in chat or automatically by agent.
- **Observe:** every invocation logged (audit trail).
- **Disable:** per-project or globally.
- **Uninstall:** remove from registry.

## 25.6 Permissions

- Extensions declare required permissions.
- Owner approves on first use.
- Per-project scope.
- No remote code execution (all local).

## 25.7 Versioning + Compatibility

- MCP protocol versioned.
- Tool/agent schemas versioned.
- Backward-compatible (old extensions work with new MiMo).
- Forward-compatible (new extensions declare minimum MiMo version).

## 25.8 Sandboxing

- Extensions run locally (no remote code execution).
- MCP servers run in separate process.
- No access to MiMo internals (only via public API).

## 25.9 Slash Blocks as Plugins (Notion pattern)

`/` slash blocks are the user-facing plugin primitive:
- `/summarize`, `/translate`, `/diagram`, `/plan` (built-in).
- Custom slash blocks (owner-defined).
- Each is a composable AI block that re-runs on input change.

## 25.10 Hooks as Plugins (Claude Code pattern)

After-edit hooks:
- Auto-run tests.
- Auto-format.
- Auto-lint.
- Configurable per-project.

## 25.11 Personal Extension Registry [PRODUCT DECISION]

No public marketplace. The owner's extensions are personal. Curated skills (not plugin-marketplace fragmentation — Obsidian anti-pattern).

## 25.12 Future Marketplace

If MiMo ever adds a marketplace (v2+):
- Curated (not open flood).
- Reviewed (security + quality).
- Signed (verified publisher).
- Permissions explicit.

---

# PART 26 — SCALABILITY / EVOLUTION

## 26.1 Single-User Scale [PRODUCT DECISION]

MiMo is single-user. Scalability means:
- 10,000+ conversations without lag.
- 10,000+ memory entries without slow search.
- 1,000+ knowledge entities without graph lag.
- 1,000+ message conversations without scroll jank.

## 26.2 Virtualization

- Message list virtualized (windowing).
- Memory browser virtualized.
- Knowledge entity grid virtualized.
- Only visible items + buffer rendered.

[EVIDENCE Grade A — evidence/notion.md §27 (long-page lag = anti-pattern), evidence/zed.md §15 (GPU rendering 120fps)]

## 26.3 Indexed Retrieval

- Memory: indexed by type + full-text search.
- Knowledge: indexed by type + name + alias.
- Conversations: indexed by title + full-text search.
- Files: indexed by name.

## 26.4 Caching

- UserModel cached, invalidated on graph change.
- Knowledge retrieval cached per query (TTL 6s).
- Workspace API response cached (6s).
- Conversation rendered from local store; streaming appends.

## 26.5 Lazy Loading

- Overlays lazy-loaded.
- Tab browsers lazy-loaded.
- Heavy components (charts, graphs) lazy-loaded.

## 26.6 Background Sync

- Workspace API polls in background (6s).
- AXP APIs poll in background (3–5s).
- UI renders from cache, never blocks on network.

## 26.7 Database + Memory + Knowledge + Agents + Models + Plugins + APIs + UI + Schema + Migrations

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

## 26.8 Technical Debt Prevention [PRODUCT INVARIANT]

- **One model per dimension** (Part 2.3) — prevents competing models.
- **Vocabulary lock** (Part 1.4) — no terminology churn.
- **No deprecations** (Part 1.6 principle 9) — working features never removed.
- **Token-first** (Part 16) — no raw values in components.
- **Component-based** (Part 27) — reusable, testable.
- **API boundaries** (Part 25.3) — clear separation.
- **Lint + type check** (Part 27) — automated gates.
- **Refactoring** (Part 49 Evolution Strategy) — ~20 prototype iterations per feature (Claude Code pattern).

## 26.9 GPU Rendering (v2 aspiration)

- Zed's Rust + Vulkan GPU rendering eliminates long-session jank.
- Today: web tech suffices for ≤ 50fps on 1000+ messages.
- v2: consider GPU rendering if web tech hits limits.
- Reject GPU-only (Zed's exclusionary requirement).

[EVIDENCE Grade A — evidence/zed.md §15]

## 26.10 Visual GUI Agent (future)

- Z.ai CogAgent aspiration: MiMo can see and operate its own UI.
- The agent can click buttons, fill forms, navigate — autonomously.
- This is the path from "chat product" to "AI OS."

[EVIDENCE Grade B — evidence/glm.md §24 (CogAgent)]

## 26.11 Daemon Mode (v2)

- Scheduled agent runs on local files without prompting.
- Morning briefings.
- Weekly reviews.
- File tidy-ups.
- Restraint builds trust (Granola ambient-agent pattern).

[EVIDENCE Grade A — evidence/manus.md §24 (Scheduled Tasks + Projects-that-Learn), evidence/granola.md §8 (ambient-agent)]

## 26.12 Mobile Companion (v2)

- Phone companion for review-and-approve.
- NOT for full work.
- v0/Manus pattern — agent runs on desktop, owner reviews from phone.

## 26.13 Multi-Window (v2)

- v1 is single-window-focus.
- v2: multi-window / multi-monitor support.
- Deferred because it adds a second model (which window is primary?).

---

# PART 27 — FRONTEND ENGINEERING RULES

## 27.1 Tech Stack (non-negotiable)

- **Framework:** Next.js 16 with App Router.
- **Language:** TypeScript 5 (strict).
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York).
- **State:** Zustand (client) + TanStack Query (server, when needed).
- **Animations:** Framer Motion.
- **Database:** Prisma ORM (SQLite).
- **AI:** z-ai-web-dev-sdk (backend only — NEVER client-side).

## 27.2 Architecture Layers

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes (server)
│   ├── page.tsx           # the ONLY route (/)
│   ├── layout.tsx
│   └── globals.css        # design tokens
├── components/
│   ├── ui/                # shadcn/ui primitives
│   ├── nova/              # reused chat stack (ChatView, Composer, etc.)
│   └── mimo/              # MiMo OS shell
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
│       └── panels/
├── core/                  # the intelligence pipeline (server-only)
│   ├── kernel/
│   ├── context/
│   ├── reasoner/
│   ├── planner/
│   ├── orchestrator/
│   ├── validator/
│   ├── memory/
│   ├── knowledge/
│   ├── executive/
│   ├── agents/
│   ├── tools/
│   ├── events/
│   └── index.ts           # the ONLY public API surface
└── lib/
    ├── nova/              # UI store, types, constants, api, hooks
    └── db.ts              # Prisma client
```

## 27.3 Rules [PRODUCT INVARIANT]

1. **`src/app/page.tsx` is the ONLY route.** No other pages. Everything is a tab/panel/overlay.
2. **`src/core/index.ts` is the ONLY Core entry point.** UI never imports Core engines directly.
3. **z-ai-web-dev-sdk is backend-only.** Never in client components.
4. **`'use client'` / `'use server'`** directives on all components/routes.
5. **No `<Link>` to other routes.** Only the rail/tabs/overlays.
6. **Rail ≤ 8 icons.** Enforced in code (array cap).
7. **Top bar runtime pills only when devMode.** Conditional render.
8. **No KPI grids / stat cards in the default sidebar.** Calm panels only.
9. **One model per dimension.** Enforced in code review.
10. **Every transition < 500ms.** Enforced via Framer Motion props.
11. **Animate only composited properties.** No layout-triggering animations.
12. **`prefers-reduced-motion` respected.** ARIA live regions for ExecutionTrace.
13. **44px tap targets.** Enforced via component sizes.
14. **WCAG AA contrast.** Guaranteed via paired foreground tokens.
15. **No 3-modifier hotkeys.** Cap at 2 modifiers.
16. **No credit/quota counters.** Never.
17. **No deprecations mid-redesign.** Keep parallel versions live.
18. **Layout persistence.** Every tab, width, scroll, mode survives reload.
19. **No silent failures.** Every error inline + actionable + explainable.
20. **No mock data.** Everything consumes real Core APIs.

## 27.4 Component Standards

- **shadcn/ui** for primitives (Button, Card, Dialog, etc.). Don't rebuild.
- **Lucide icons** via shadcn/ui. Don't mix icon families.
- **Framer Motion** for all animations. No CSS transitions for complex motion.
- **Tailwind 4** for styling. Use semantic tokens (`bg-background`, `text-foreground`), not raw values.
- **Zustand** for client state. One store (`@/lib/nova/store.ts`). No prop drilling.

## 27.5 State Management

- **Client state:** Zustand (one store, selectors, no prop drilling).
- **Server state:** TanStack Query (when needed; for most data, use the aggregated `/api/mimo/workspace` poll).
- **Form state:** local component state (useState) or react-hook-form for complex forms.
- **URL state:** none (single route; no URL params except `XTransformPort` for gateway).

## 27.6 API Boundaries

- UI → API routes → Core public API → Core engines.
- UI never imports Core engines.
- API routes are thin (build context, call Core, return result).
- Core engines never import from `app/` or `components/`.

## 27.7 Data Fetching

- **Polling:** `/api/mimo/workspace` (6s), AXP routes (3-5s).
- **Streaming:** `/api/chat` (server-side chunking).
- **Optimistic UI:** for instant actions (send message, toggle).
- **Cache:** Zustand store (client) + Prisma (server).

## 27.8 Error Boundaries

- React Error Boundaries at the route level + panel level.
- Errors caught → inline error card (not modal).
- Never crash the whole app.

## 27.9 Accessibility Implementation

- Semantic HTML (`main`, `header`, `nav`, `section`, `article`).
- ARIA roles + labels (Part 19.4).
- Focus management (Part 19.2).
- Keyboard nav (Part 19.1).
- Reduced motion (Part 19.6).
- axe-core testing in CI (Part 19.11 — VALIDATION REQUIREMENT).

## 27.10 Testing

- No test code (per project rules — owner validates manually via Agent Browser).
- Lint + type check are the automated gates.
- Agent Browser golden-path verification after every feature.

## 27.11 Performance

- Code splitting (overlays, browsers lazy-loaded).
- Virtualization (message list, memory, knowledge).
- Memoization (Markdown per message, panels, selectors).
- No network in critical path.
- Performance budget (Part 20.2).

## 27.12 Naming Conventions

- **Files:** PascalCase for components (`MiMoOS.tsx`), camelCase for utilities (`hooks.ts`).
- **Components:** PascalCase (`MiMoOS`, `LeftRail`).
- **Hooks:** camelCase prefixed with `use` (`useWorkspace`, `useChat`).
- **Types:** PascalCase (`WorkspaceTab`, `ContextMode`).
- **Tokens:** kebab-case (`accent-brand`, `surface-container`).
- **CSS classes:** kebab-case (via Tailwind).

## 27.13 Folder Structure

(See Part 27.2 — strict hierarchy. No flat dumps.)

## 27.14 Design Tokens

- All tokens in `globals.css` as CSS custom properties.
- Tailwind 4 maps to tokens (`bg-background` → `var(--background)`).
- No raw values in components.
- Token naming: `[prefix].[namespace].[pattern].[variant].[property].[scale]` (Primer structure).

## 27.15 Component Composition

- Small, single-purpose components.
- Compose into larger components.
- Props typed (TypeScript interfaces).
- No `any` types (use `unknown` + type guard).
- shadcn/ui for primitives; compose into MiMo-specific components.

## 27.16 Hallucination-Guard Rule (Primer AI-era DX innovation)

If the agent suggests a token name not found in the spec, suffix it with `/* check-token */`. This forces the AI to flag its own uncertainty. MiMo — being itself an AI OS — adopts this as a universal rule: every agent output marks speculative/uncertain content with a `check` annotation for human review.

[EVIDENCE Grade A — research-group-I.md §Primer]

## 27.17 Lint + Type Check

- `bun run lint` must pass clean before commit.
- TypeScript strict mode.
- No `any` types.
- No unused imports.
- No `console.log` in production (use Core logger).

---

# PART 28 — ALWAYS VISIBLE / CONDITIONAL / HIDDEN

## 28.1 Always Visible

| Element | Reason |
|---|---|
| Conversation (pinned tab #1) | The spine; losing it loses the thread |
| Left rail (6 nav + account) | Permanent navigation |
| Top bar (command + project chip + mode selector + tabs + toggles) | Current context |
| Composer (when on conversation tab) | Primary input |
| Current-mode indicator (sidebar header) | Adaptive context |
| Current-project chip (top bar) | Scope |

## 28.2 Always Hidden

| Element | Reason |
|---|---|
| Runtime metrics (kernel, CPU, memory, queue, latency, providers) | Cognitive overload unless devMode |
| Agent internals | Noise unless agent working |
| Developer tools | Unless devMode |
| Settings JSON | Direct manipulation only |
| System notifications (toasts) | Inline ExecutionTrace for conversation; Snackbar only for confirmations |
| Credit/quota counters | Never (single-user local-first) |
| Onboarding wizards | Never (calm deference; usable in 0 seconds) |
| Dashboard | Never homepage; only on-demand tab |

## 28.3 Conditional

| Element | Appears when | Disappears when | Trigger | Reason |
|---|---|---|---|---|
| Right sidebar | default visible | `⌘B` toggles, or close button | Toggle | Calm default; owner controls |
| AgentDock | `store.loading` is true (AI working) | AI done | Loading state | Hide when idle (no static cards) |
| ArtifactDock | artifacts exist | no artifacts | Artifacts exist | Hide when empty |
| UniversalSearch | `⌘/` pressed | `Esc` / selection | Keyboard | On-demand |
| CommandPalette | `⌘K` pressed | `Esc` / selection | Keyboard | On-demand |
| QuickAI | `⌘⇧Tab` on selection | `Esc` / selection | Keyboard + selection | On-demand |
| Peek | hold `Space` on item | release `Space` | Hold key | Zero commitment |
| ProjectSwitcher | `⌘P` / project chip click | `Esc` / selection | Keyboard / click | On-demand |
| Settings | `S` / account popover | `Esc` / close | Keyboard / click | On-demand |
| Voice | composer button | `Esc` / close | Click | On-demand |
| ImageGen | composer button | `Esc` / close | Click | On-demand |
| DeveloperPanel | devMode on + rail icon click | `Esc` / close / devMode off | devMode + click | Hidden unless devMode |
| Runtime pills (top bar) | devMode on | devMode off | devMode | Hidden unless devMode |
| Developer rail icon | devMode on | devMode off | devMode | Hidden unless devMode |
| Snackbar | transient confirmation | 2.6s auto-dismiss | System confirmation | Confirmations only |
| Error inline | error occurs | owner dismisses / retries | Error | Always actionable |
| Connection indicator | offline | online | Network state | Only when offline |

## 28.4 Why Each Element Appears (or Doesn't)

- **Conversation:** always visible because it's the spine.
- **Rail:** always visible because permanent navigation — but ≤ 8 icons.
- **Top bar:** always visible because it holds current context.
- **AgentDock:** only when working because static agent cards create cognitive noise.
- **ArtifactDock:** only when artifacts exist because empty dock is noise.
- **Overlays:** on-demand because contextual — always-on overlays = second surface.
- **DeveloperPanel:** hidden unless devMode because runtime metrics are for developers, not primary experience.
- **Dashboard:** on-demand tab because dashboards are NOT the homepage.

---

# PART 29 — PRODUCT INVARIANTS

**Rules that cannot be broken during development.**

1. **No duplicate mental models.** One container (Project), one branch (Fork), one AI surface (Conversation). [EVIDENCE Grade A — CLT]
2. **No UI clutter without reason.** Rail ≤ 8 icons. Calm default. Progressive disclosure.
3. **No autonomous action without permission model.** Per-task-type trust. Named sandbox modes. Named approval policies.
4. **No memory without provenance.** Every memory: source + timestamp + type + confidence + delete.
5. **No destructive action without recovery.** Per-hunk accept/reject. One-keystroke rewind. Auto-commit + revert. Rollback.
6. **No long-running task without observable state.** ExecutionTrace inline. AgentDock. Weighted progress. ETA. State-edit-and-continue.
7. **No AI output without context/evidence when external knowledge is used.** Per-claim citations. `/* check-token */` hallucination-guard.
8. **No silent failures.** Every error: inline + actionable + explainable.
9. **No credit/quota counters.** Never. Single-user local-first.
10. **No deprecations mid-redesign.** Working features never removed. Parallel versions live during transitions.
11. **No 3-modifier hotkeys.** Cap at 2 modifiers.
12. **No layout-triggering animations.** Only composited properties.
13. **No `prefers-reduced-motion` ignored.** ARIA live regions for ExecutionTrace.
14. **No raw color values in components.** Token-first semantic.
15. **No `<Link>` to other routes.** Single route. Everything is tab/panel/overlay.
16. **No bypass of the Core pipeline.** `/api/chat` does ONLY: buildContext → runWorkflow → return validation.sanitisedAnswer.
17. **No z-ai-web-dev-sdk in client components.** Backend-only.
18. **No mock data.** Everything consumes real Core APIs.
19. **No telemetry.** No usage tracking, no error reporting (unless opt-in), no analytics.
20. **No 100% diff overwrites.** Per-hunk accept/reject always.
21. **No parallel agents without per-agent visibility.** Sequential default.
22. **No per-instance approval storms.** Per-task-type trust.
23. **No spinner for AI work.** Inline ExecutionTrace with real runtime motion.
24. **No modal error blocks.** Inline, always dismissable.
25. **No terminology churn.** Vocabulary locked pre-launch.
26. **No `any` types.** Use `unknown` + type guard.
27. **No `console.log` in production.** Use Core logger.
28. **No second sidebar.** ONE right adaptive sidebar.
29. **No second command palette.** ONE palette with prefix grammar.
30. **No second elevation system.** 5 levels by intent.
31. **No second motion tier system.** 5 tiers (instant/micro/short/medium/long).
32. **No second keyboard grammar.** ONE grammar (prefix + hold-Space + single-key).
33. **No second explainability layer.** ONE (citations + exposed reasoning + decision explainer + hallucination-guard).
34. **Architectural trust first.** Local-first + E2E + no-counters + no-deprecations before interactional trust.
35. **One model per dimension.** Enforced at architecture level. Anywhere a second model tempts, the answer is no.

---

# PART 30 — DESIGN DECISIONS LOG

For each major decision: Decision / Problem / Evidence / Alternatives / Rejected / Reason / UX impact / Architecture impact / Scalability impact / Risk / Validation method.

## DD-01: Conversation-spine + canvas-per-mode

- **Decision:** Conversation is permanent spine; center canvas adapts per mode.
- **Problem:** No product combines conversation-as-permanent-spine + canvas-as-adaptive-per-mode.
- **Evidence:** Don Syme's regret [Grade B], Cursor editor-first [Grade A], ChatGPT/Claude chat-first [Grade A], Manus agent-first [Grade A]. No product combines these [Grade B — cross-product analysis].
- **Alternatives:** Editor-first (Cursor), chat-first (ChatGPT/Claude), agent-first (Manus), block-first (Notion), workspace-first (Lovable/v0), command-first (Linear/Raycast).
- **Rejected:** Each loses either conversational flow or working surface.
- **Reason:** Conversation-spine + canvas-per-mode is the unique recombination that solves both.
- **UX impact:** 95% of work on one screen. No context switching.
- **Architecture impact:** Conversation pinned tab #1; canvas swaps per mode; one source of truth (mode).
- **Scalability impact:** New modes add canvas types without changing spine.
- **Risk:** Central thesis rests on inference (no product validates the combination). MITIGATION: user testing in implementation.
- **Validation method:** Agent Browser golden-path (send message → switch mode → canvas adapts → conversation stays).

## DD-02: One container (Project) + one branch (Fork)

- **Decision:** Project is the ONLY container. Fork is the ONLY branch.
- **Problem:** Container sprawl (Lovable 7, v0 8) causes cognitive overload.
- **Evidence:** Lovable 7 containers [Grade A], v0 8 containers [Grade A], Notion 8 AI surfaces [Grade A], Linear 1 container [Grade A], CLT [Grade A].
- **Alternatives:** Multiple containers (Lovable/v0), no containers.
- **Rejected:** Overload / no organization.
- **Reason:** One model per dimension enforced at architecture.
- **UX impact:** Owner thinks in Projects, nothing else.
- **Architecture impact:** One container type; one branch primitive.
- **Scalability impact:** New artifact types fit inside Project without new containers.
- **Risk:** May be too coarse for complex structures. MITIGATION: Fork + per-project settings.
- **Validation method:** User testing (can owner organize work with only Project + Fork?).

## DD-03: One AI surface (Conversation)

- **Decision:** Conversation is the ONLY AI surface.
- **Problem:** Notion's 8 AI surfaces cause cognitive overload.
- **Evidence:** Notion 8 AI surfaces [Grade A].
- **Alternatives:** Multiple AI surfaces (Notion).
- **Rejected:** Overload.
- **Reason:** One AI surface, compositional.
- **UX impact:** Owner interacts with ONE AI.
- **Architecture impact:** All AI features compose into conversation.
- **Scalability impact:** New AI capabilities = conversation modes, not new surfaces.
- **Risk:** Some tasks (bulk operations) may need a second surface. MITIGATION: command palette + slash blocks.
- **Validation method:** User testing (can all tasks be done via conversation?).

## DD-04: Rail ≤ 8 icons

- **Decision:** 6 nav + 1 account + conditional dev (≤8).
- **Problem:** Cognitive overload from too many nav items.
- **Evidence:** Miller 7±2 [Grade A], Hick's Law [Grade A], Linear [Grade A], Arc congestion [Grade B], Notion 30+ [Grade A], VS Code 2-sidebar trap [Grade A].
- **Alternatives:** 12+ icons (Notion), no rail, 2 sidebars (VS Code).
- **Rejected:** Overload / too steep / trap.
- **Reason:** Miller + Hick + Linear.
- **UX impact:** Calm rail; fast finding.
- **Architecture impact:** Rail array capped at 8.
- **Scalability impact:** New features go into tabs/overlays, not rail.
- **Risk:** Cowan's 4±1 suggests 4-6 may be better. MITIGATION: 6+1=7 is within both ranges.
- **Validation method:** Card-sort test; user finds each nav item in <2s.

## DD-05: Inline ExecutionTrace (not separate dock)

- **Decision:** ExecutionTrace renders inside the streaming AI message.
- **Problem:** Separate dock loses inline flow (Don Syme's regret); spinner feels dead.
- **Evidence:** Don Syme [Grade B], Manus live runtime [Grade A], v0 static [Grade B], Nielsen heuristic 1 [Grade A], Shneiderman rule 4 [Grade A].
- **Alternatives:** Separate dock, spinner, no viz.
- **Rejected:** Loses flow / dead / no trust.
- **Reason:** Inline + real motion = alive + flow.
- **UX impact:** Owner feels AI thinking, in conversation.
- **Architecture impact:** ExecutionTrace component rendered inside MessageItem.
- **Scalability impact:** New stages add to trace.
- **Risk:** May clutter long conversations. MITIGATION: collapsible.
- **Validation method:** Agent Browser (send message → trace appears inline → result streams).

## DD-06: Living-workflow AgentDock (not static cards)

- **Decision:** Horizontal pipeline stepper, not static cards.
- **Problem:** Static cards = noise (Manus/ChatGPT).
- **Evidence:** Manus static cards [Grade A], Cursor per-hunk [Grade A], OpenHands event-stream [Grade A], LangGraph animated graph [Grade A].
- **Alternatives:** Static cards, no viz.
- **Rejected:** Noise / dead.
- **Reason:** Pipeline stepper shows workflow as alive.
- **UX impact:** Owner sees progress, not static list.
- **Architecture impact:** AgentDock component with stage state.
- **Scalability impact:** New stages add to stepper.
- **Risk:** None significant.
- **Validation method:** Agent Browser (agent works → dock appears → stages light up).

## DD-07: Per-hunk accept/reject

- **Decision:** Per-hunk accept/reject on staged code diffs.
- **Problem:** 100% overwrites (Continue.dev) cause regressions.
- **Evidence:** Cursor per-hunk [Grade A — "single biggest regression-risk reducer"], Continue 100% overwrites [Grade A — anti-pattern].
- **Alternatives:** 100% overwrites, accept-all/reject-all only, no accept/reject.
- **Rejected:** Regression risk / too coarse / no trust.
- **Reason:** Per-hunk = biggest regression reducer.
- **UX impact:** Owner controls every change.
- **Architecture impact:** Diff rendering + accept/reject state.
- **Scalability impact:** Per-hunk scales to large files.
- **Risk:** None significant.
- **Validation method:** Agent Browser (agent edits code → diff shown → accept/reject per hunk).

## DD-08: Per-task-type trust (not per-instance)

- **Decision:** Per-task-type trust ledger.
- **Problem:** Per-instance approval storms (Codex/Manus).
- **Evidence:** Codex approval storms [Grade A — #1 complaint], Manus per-command fatigue [Grade A], Claude Code 6 modes [Grade A], Amershi G14 [Grade A], Trust in AI calibrated trust [Grade A].
- **Alternatives:** Per-instance, blanket trust, no approval.
- **Rejected:** Fatigue / unsafe / no trust.
- **Reason:** Per-task-type = no fatigue + safe.
- **UX impact:** Approve once per type, then no interruptions.
- **Architecture impact:** Trust ledger (per-project + per-task-type + per-scope).
- **Scalability impact:** Scales to many task types.
- **Risk:** May be too coarse/fine. MITIGATION: owner-editable.
- **Validation method:** User testing (3 approvals → "Always allow" offered → no more prompts).

## DD-09: Local-first + E2E

- **Decision:** Local-first; E2E for opt-in cloud sync.
- **Problem:** Trust is architectural.
- **Evidence:** Anytype E2E [Grade A], Granola no-bot [Grade A], Bolt local [Grade A], Linear local-cache [Grade A], Trust in AI [Grade A].
- **Alternatives:** Cloud-first, hybrid sync.
- **Rejected:** Trust risk + latency / complexity.
- **Reason:** Architectural trust.
- **UX impact:** Fast + trustworthy.
- **Architecture impact:** SQLite + Prisma; E2E sync opt-in.
- **Scalability impact:** Local SQLite scales to 10k+ entries.
- **Risk:** Cloud sync complexity. MITIGATION: opt-in, off by default.
- **Validation method:** Offline test (disconnect internet → all local features work).

## DD-10: No credit/quota counters

- **Decision:** Never.
- **Problem:** Counters punish long sessions.
- **Evidence:** Genspark [Grade B], Lovable [Grade A], v0 [Grade A].
- **Alternatives:** Credit counter, soft quota, unlimited cloud.
- **Rejected:** Punishes long sessions / anxiety / trust risk.
- **Reason:** Single-user local-first — counters nonsensical.
- **UX impact:** Work without artificial limits.
- **Architecture impact:** No counter system.
- **Scalability impact:** Local resources are only limit.
- **Risk:** None.
- **Validation method:** No counter UI anywhere.

## DD-11: One command palette with prefix grammar

- **Decision:** `⌘K` ONE palette with `>/@/#/!` prefix grammar.
- **Problem:** Multiple search surfaces = overload.
- **Evidence:** VS Code [Grade A], Arc [Grade B], Notion [Grade A], Linear [Grade A], Raycast [Grade A] converged.
- **Alternatives:** Two separate overlays.
- **Rejected:** Adds second model.
- **Reason:** 5 products converged on ONE.
- **UX impact:** Owner learns ONE grammar.
- **Architecture impact:** One palette component with prefix parser.
- **Scalability impact:** New prefixes add to grammar.
- **Risk:** None significant.
- **Validation method:** Agent Browser (`⌘K` → `>cmd` / `/search` / `@mem` / `#file` / `!ai` all work).

## DD-12: Hold-Space peek + ⌘⇧Tab Quick AI + single-key daily-5

- **Decision:** The ONE defining interaction.
- **Problem:** Power users need keyboard velocity.
- **Evidence:** Linear hold-Space [Grade A], Raycast Quick AI [Grade A], VS Code prefix [Grade A], Notion slash [Grade A], Helix selection-first [Grade A], Fitts [Grade A], Hick [Grade A], Raskin quasimodes [Grade B].
- **Alternatives:** Modifier-based peek, separate Quick AI panel.
- **Rejected:** Less universal / loses killer feature.
- **Reason:** Combines best of 5 products without copying.
- **UX impact:** Peek + act + transform without menus.
- **Architecture impact:** Global keyboard handler; peek overlay; Quick AI popover.
- **Scalability impact:** Peek applies to any sidebar item; Quick AI to any selection.
- **Risk:** Space conflicts with scroll. MITIGATION: hold-Space only when hovering sidebar item.
- **Validation method:** Agent Browser (hold-Space on conversation → peek; `⌘⇧Tab` on selection → Quick AI).

## DD-13: 5-level elevation by intent

- **Decision:** base / hairline / container / floating / modal.
- **Problem:** Material 6 + Fluent 6 = too many.
- **Evidence:** Material [Grade A], Fluent [Grade A], Apple calm [Grade A].
- **Alternatives:** Material 6, no elevation.
- **Rejected:** Too many / loses depth.
- **Reason:** Calm depth (5 levels cover all use cases).
- **UX impact:** Calm; shadows meaningful.
- **Architecture impact:** 5 token sets.
- **Scalability impact:** No 6th needed.
- **Risk:** None significant.
- **Validation method:** Visual audit (all surfaces use correct level).

## DD-14: 9 type roles on single system-font stack

- **Decision:** Display → Caption2 on `-apple-system, Segoe UI, Roboto, system-ui`.
- **Problem:** px values not accessible; multi-font inconsistent.
- **Evidence:** Apple Dynamic Type [Grade A], Material 5-role×3-size [Grade A], Fluent ramp [Grade A].
- **Alternatives:** px values, multiple fonts, Roboto-only.
- **Rejected:** Not accessible / inconsistent / not native.
- **Reason:** Convergence.
- **UX impact:** Consistent, native, accessible.
- **Architecture impact:** 9 type tokens.
- **Scalability impact:** New roles follow same scale.
- **Risk:** None significant.
- **Validation method:** Visual audit (all text uses correct role).

## DD-15: 4px base spacing scale

- **Decision:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48.
- **Problem:** Arbitrary spacing inconsistent.
- **Evidence:** Material + Fluent convergence [Grade A].
- **Alternatives:** Arbitrary, 8px only.
- **Rejected:** Inconsistent / too coarse.
- **Reason:** 8pt grid.
- **UX impact:** Consistent rhythm.
- **Architecture impact:** 9 spacing tokens.
- **Scalability impact:** All components use same scale.
- **Risk:** None significant.
- **Validation method:** Visual audit.

## DD-16: Material duration tiers + Emphasized bezier + springs

- **Decision:** 5 tiers (0/100/200/300/500); Emphasized `cubic-bezier(0.05, 0.7, 0.1, 1.0)`; springs for direct manipulation.
- **Problem:** Material defaults too slow; iOS springs alone insufficient.
- **Evidence:** Primer [Grade A], Linear [Grade B — inferred], Stripe [Grade A], Material [Grade A].
- **Alternatives:** Material defaults, iOS springs only, no motion.
- **Rejected:** Too slow / insufficient / loses state communication.
- **Reason:** Convergence below Material/iOS defaults.
- **UX impact:** Fast + alive.
- **Architecture impact:** 5 motion tokens + spring config.
- **Scalability impact:** All transitions use same tiers.
- **Risk:** Linear tokens inferred. ACCEPTED LIMITATION.
- **Validation method:** Agent Browser (transition timing feels right).

## DD-17: 44px tap targets + WCAG AA + reduced-motion + ARIA

- **Decision:** 44px (Apple); WCAG AA; reduced-motion; ARIA live regions.
- **Problem:** Accessibility.
- **Evidence:** Apple 44pt [Grade A], Fitts's Law [Grade A], Primer MUST [Grade A], VS Code ⌥F1 [Grade A], Apple 5 a11y features [Grade A], Nielsen [Grade A].
- **Alternatives:** Material 48dp, no reduced-motion, motion-only.
- **Rejected:** Less generous / a11y failure / excludes screen readers.
- **Reason:** Apple more generous; Primer MUST; Atlassian first-class.
- **UX impact:** Accessible to all.
- **Architecture impact:** 44px component sizes; paired foreground tokens; ARIA roles; reduced-motion theme.
- **Scalability impact:** Accessibility baked in.
- **Risk:** No axe-core testing yet. VALIDATION REQUIREMENT.
- **Validation method:** axe-core audit + NVDA/VoiceOver testing in implementation.

## DD-18: Layout persistence

- **Decision:** Every tab, width, scroll, mode, cursor survives reload.
- **Problem:** Reload loses owner's place.
- **Evidence:** VS Code [Grade A].
- **Alternatives:** Reset on reload, partial persistence.
- **Rejected:** Loses place / jarring.
- **Reason:** VS Code discipline.
- **UX impact:** Return to exactly where you were.
- **Architecture impact:** Persisted state (localStorage).
- **Scalability impact:** Small JSON.
- **Risk:** None significant.
- **Validation method:** Reload test (state survives).

## DD-19: No onboarding wizard

- **Decision:** Never.
- **Problem:** Friction.
- **Evidence:** Apple calm deference [Grade A], Roam too steep [Grade B].
- **Alternatives:** Multi-step wizard, Roam no-onboarding.
- **Rejected:** Friction / too steep.
- **Reason:** Calm deference; usable in 0 seconds.
- **UX impact:** Start working immediately.
- **Architecture impact:** No onboarding flow.
- **Scalability impact:** No flow to maintain.
- **Risk:** New/returning users may struggle. MITIGATION: empty states + hints + command palette discoverability.
- **Validation method:** First-run test (owner can start in <30s).

## DD-20: No deprecations mid-redesign

- **Decision:** Never.
- **Problem:** Trust erosion.
- **Evidence:** ChatGPT Canvas sunset [Grade A], v0 Premium plan sunset [Grade A].
- **Alternatives:** Deprecate + migrate, big-bang.
- **Rejected:** Erodes trust / breaks flows.
- **Reason:** Architectural trust.
- **UX impact:** Owner's investment sacred.
- **Architecture impact:** Parallel versions during transitions.
- **Scalability impact:** Temporary dual-maintenance.
- **Risk:** None significant.
- **Validation method:** No deprecation without 6-month notice + migration path.

## DD-21: Vocabulary lock

- **Decision:** Pre-launch vocabulary locked.
- **Problem:** Terminology churn breaks mental model.
- **Evidence:** Anytype Sets→Queries [Grade A — user revolt].
- **Alternatives:** Evolve terminology.
- **Rejected:** Breaks investment.
- **Reason:** Stability.
- **UX impact:** Learn once.
- **Architecture impact:** Stable docs.
- **Scalability impact:** No migration.
- **Risk:** None significant.
- **Validation method:** Vocabulary frozen in this Bible.

## DD-22: One model per dimension

- **Decision:** Every dimension has ONE model.
- **Problem:** Cognitive overload = multiple overlapping models.
- **Evidence:** Premium products (Linear, Raycast, Cursor, Apple, Helix) = one model [Grade A]; overload products (Notion, Lovable, v0, Codex, Genspark) = multiple [Grade A]; CLT [Grade A].
- **Alternatives:** Multiple models per dimension, user-configurable.
- **Rejected:** Overload / config = cognitive load.
- **Reason:** Enforce one model at architecture.
- **UX impact:** Coherent.
- **Architecture impact:** Code review enforces.
- **Scalability impact:** Extend existing model, not add second.
- **Risk:** None significant.
- **Validation method:** Code review checklist.

## DD-23: Sequential pipeline (not parallel default)

- **Decision:** 6-stage sequential pipeline; parallel only with per-agent visibility.
- **Problem:** Parallel confuses users.
- **Evidence:** Z.ai defends single-agent [Grade A], Manus parallel confusion [Grade A].
- **Alternatives:** Parallel default, no parallelism.
- **Rejected:** Confusion / limits capability.
- **Reason:** Sequential clear; parallel opt-in + visible.
- **UX impact:** Linear workflow.
- **Architecture impact:** Sequential orchestrator.
- **Scalability impact:** Parallelism = opt-in extension.
- **Risk:** None significant.
- **Validation method:** User testing (can owner follow sequential workflow?).

## DD-24: Approvable plans before execution (code/UI)

- **Decision:** Plan as approvable artifact for code/UI tasks.
- **Problem:** Wasted runs on misunderstanding.
- **Evidence:** Replit plan gate [Grade A], Lovable `.lovable/plan.md` [Grade A].
- **Alternatives:** Auto-execute, separate panel.
- **Rejected:** Wasted runs / Don Syme regret.
- **Reason:** Approvable + inline.
- **UX impact:** Approve before AI acts.
- **Architecture impact:** Plan artifact type + approval state.
- **Scalability impact:** Scales to any task type.
- **Risk:** None significant.
- **Validation method:** Agent Browser (code task → plan appears → approve → execute).

## DD-25: Real-time partnership (Windsurf pattern)

- **Decision:** Agent sees user edits, proactively offers consistency fixes.
- **Problem:** No product does this well; distinctive.
- **Evidence:** Windsurf rename detection [Grade A].
- **Alternatives:** No real-time awareness, auto-apply.
- **Rejected:** Misses partnership / no trust.
- **Reason:** Genuinely distinctive.
- **UX impact:** Agent as partner.
- **Architecture impact:** EventBus `user.edited` events; agent subscription.
- **Scalability impact:** Per-agent subscriptions.
- **Risk:** False positives. MITIGATION: offer (never auto-apply).
- **Validation method:** User testing (rename function → agent offers to update references).

## DD-26: State-edit-and-continue (LangGraph pattern)

- **Decision:** Owner can pause, edit state, resume.
- **Problem:** Long runs unrecoverable without intervention.
- **Evidence:** LangGraph [Grade A], AutoGPT no-intervention [Grade A — cautionary tale].
- **Alternatives:** No intervention, abort + restart.
- **Rejected:** Unrecoverable / loses progress.
- **Reason:** LangGraph killer DX.
- **UX impact:** Owner controls long tasks.
- **Architecture impact:** State persisted at every stage.
- **Scalability impact:** Resume is cheap.
- **Risk:** None significant.
- **Validation method:** Agent Browser (long task → pause → edit → resume).

## DD-27: Daemon mode (Manus + Granola pattern)

- **Decision:** Scheduled agent runs on local files.
- **Problem:** AI as chat → AI as OS.
- **Evidence:** Manus Scheduled Tasks [Grade A], Granola ambient-agent [Grade A].
- **Alternatives:** No daemon, always-on agents.
- **Rejected:** Limits OS-ness / noise + trust.
- **Reason:** Daemon = OS pattern; restraint builds trust.
- **UX impact:** MiMo works while owner away.
- **Architecture impact:** Background scheduler.
- **Scalability impact:** Scheduled tasks.
- **Risk:** Feels invasive. MITIGATION: opt-in, visible, cancelable.
- **Validation method:** User testing (schedule task → runs at time → notification).

## DD-28: Architectural trust first

- **Decision:** Local-first + E2E + no-counters + no-deprecations BEFORE interactional.
- **Problem:** Interactional trust insufficient (ChatGPT has features but lost trust).
- **Evidence:** Anytype/Granola/Bolt/Linear [Grade A], ChatGPT/Genspark trust erosion [Grade A], Trust in AI [Grade A].
- **Alternatives:** Interactional only.
- **Rejected:** Insufficient.
- **Reason:** Trust = what you structurally cannot do.
- **UX impact:** Structural trust.
- **Architecture impact:** Local-first + E2E + no-counters + no-deprecations.
- **Scalability impact:** Architectural commitments hard to change (intentional).
- **Risk:** None significant.
- **Validation method:** Audit (no cloud-first, no counters, no deprecations).

## DD-29: Per-claim source-to-quote citation (NotebookLM gold standard)

- **Decision:** Every knowledge-grounded claim cites source-to-quote.
- **Problem:** Explainability gap is universal (Apple/MS/Dust/GitHub under-deliver).
- **Evidence:** NotebookLM [Grade A — gold standard], Heptabase [Grade A], Perplexity [Grade A], XAI [Grade A].
- **Alternatives:** No citations, inline only.
- **Rejected:** No trust / less rigorous.
- **Reason:** MiMo's moat = explainability.
- **UX impact:** Owner trusts grounded answers.
- **Architecture impact:** Citation system + source storage.
- **Scalability impact:** Scales to any source type.
- **Risk:** None significant.
- **Validation method:** Agent Browser (research answer → every claim has citation → click → source).

## DD-30: `/* check-token */` hallucination-guard (Primer pattern)

- **Decision:** Every agent output marks speculative/uncertain content.
- **Problem:** AI uncertainty uncommunicated.
- **Evidence:** Primer [Grade A].
- **Alternatives:** No marking.
- **Rejected:** Owner doesn't know what's uncertain.
- **Reason:** AI-era DX innovation.
- **UX impact:** Owner reviews uncertain content.
- **Architecture impact:** Annotation system in agent output.
- **Scalability impact:** Universal rule.
- **Risk:** None significant.
- **Validation method:** Agent Browser (uncertain output → `check` marker visible).

(30 decisions logged. All grounded in A/B-grade evidence. No decision rests on D-grade alone.)

---

# PART 31 — EVIDENCE MAP

| Decision | Evidence Grade | Confidence | Source | Research finding | Decision influenced |
|---|---|---|---|---|---|
| Product Philosophy | A/B | 85% | evidence/copilot-workspace.md §27, evidence/cursor.md §2, evidence/manus.md §2 | Don Syme regret + Cursor editor-first + Manus agent-first | Conversation-spine + canvas-per-mode |
| Mental Model | A/B | 80% | evidence/devin.md §3, evidence/aider.md §3, academic/human-ai-interaction.md | Mental models diverge; neutral adaptable | Senior collaborator |
| Conversation | A/B | 88% | evidence/copilot-workspace.md §27, evidence/cursor.md §2, evidence/v0.md §12, academic/jakob-nielsen.md, academic/ben-shneiderman.md | Don Syme + alive vs dead + visibility + closure | Permanent spine + inline ExecutionTrace |
| Workspace (one container) | A | 90% | evidence/lovable.md §6, evidence/v0.md §6, evidence/notion.md §8, evidence/linear.md §5, academic/cognitive-load-theory.md | Container sprawl = overload; one = premium | One container + one branch |
| Navigation (rail ≤8) | A | 88% | academic/millers-law.md, academic/hicks-law.md, evidence/linear.md §5, evidence/arc.md §5, evidence/notion.md §5, evidence/vscode.md §5 | Miller 7±2 + Hick + Linear | Rail ≤8 |
| Projects | A | 90% | evidence/arc.md §5, evidence/cursor.md §9, evidence/codex.md §9, evidence/claude-code.md §9, evidence/windsurf.md §9, evidence/chatgpt.md §9, evidence/vscode.md §6 | Arc accent + AGENTS.md convergence + ChatGPT project-scope + VS Code persistence | Per-project accent + MIMO.md + scoped memory + layout persistence |
| Tabs | A/B | 85% | evidence/arc.md §6, evidence/vscode.md §6, evidence/linear.md §5, evidence/claude.md §13 | Arc Pinned/Today + VS Code persistence + Claude tab-able | Pinned + spawnable + ephemeral |
| Agents (living workflow) | A | 88% | evidence/manus.md §8, evidence/cursor.md §8, evidence/openhands.md §8, evidence/langgraph-studio.md §8, evidence/glm.md §8, evidence/manus.md §27, evidence/genspark.md §27 | Manus static = noise; Cursor per-hunk; OpenHands event-stream; Z.ai defends sequential; Manus parallel confuses | Pipeline stepper + sequential default |
| Agent Autonomy | A | 90% | evidence/codex.md §27, evidence/manus.md §27, evidence/claude-code.md §8, evidence/codex.md §8, academic/human-ai-interaction.md, academic/trust-in-ai.md | Codex/Manus approval storms; Claude Code 6 modes; Amershi G14; calibrated trust | Per-task-type trust |
| Execution (inline + per-hunk) | A | 92% | evidence/gemini.md §12, evidence/manus.md §12, evidence/cursor.md §13, evidence/continue.md §27, evidence/langgraph-studio.md §24, evidence/replit.md §12, evidence/v0.md §12 | Gemini live thoughts; Manus live; Cursor per-hunk; Continue 100% = anti-pattern; LangGraph state-edit; Replit plan gate; v0 static = dead | Inline ExecutionTrace + per-hunk accept/reject |
| Artifacts | A | 88% | evidence/claude.md §13, evidence/chatgpt.md §13, evidence/cursor.md §13, evidence/lovable.md §13, evidence/v0.md §13, evidence/lovable.md §13, evidence/replit.md §13 | Claude gVisor (corrected); ChatGPT Canvas sunset; Cursor per-hunk; Lovable Visual Edits + Edit History; v0 Design Mode (corrected); Replit replay | First-class tab-able runtime objects |
| Memory | A | 90% | evidence/chatgpt.md §9, evidence/chatgpt.md §27, evidence/claude.md §9, evidence/claude-code.md §9, evidence/codex.md §9, evidence/obsidian.md §9 | ChatGPT two-layer + opacity; Claude persistent Sep 2025; Claude Code auto-memory; Codex AGENTS.md; Obsidian local-first | Two-layer + project-scoped + source/timestamp/delete |
| Knowledge | A | 88% | evidence/notebooklm.md §10, evidence/heptabase.md §22, evidence/tana.md §10, evidence/perplexity.md §10, evidence/obsidian.md §10, evidence/roam.md §10, academic/explainable-ai.md | NotebookLM gold standard; Heptabase per-paragraph; Tana graph-grounded; Perplexity inline; Obsidian graph; Roam linked/unlinked | Derived from memory + per-claim citations |
| Personal Model | A | 82% | evidence/reflect.md §9, evidence/chatgpt.md §9, evidence/apple-intelligence.md §9, evidence/anytype.md §10, academic/human-ai-interaction.md | Reflect accumulating; ChatGPT Memory; Apple Memory; Anytype typed graph; Amershi G3 | Living digital twin |
| Search | A | 88% | evidence/vscode.md §11, evidence/arc.md §11, evidence/notion.md §11, evidence/linear.md §11, evidence/raycast.md §11, academic/hicks-law.md, academic/information-scent.md, academic/recognition-vs-recall.md | 5 products converged on ONE palette; Hick; Information Scent; Recognition > Recall | One Universal Search + prefix grammar |
| Command System | A | 88% | (same as Search) + evidence/raycast.md §14, evidence/linear.md §14, evidence/notion.md §14, evidence/helix.md §14, academic/fitts-law.md, academic/jef-raskin.md | Raycast Quick AI; Linear hold-Space; Notion slash; Helix selection-first; Fitts; Raskin quasimodes | ONE palette + prefix grammar + hold-Space + ⌘⇧Tab + single-key |
| Context System | A | 88% | evidence/chatgpt.md §18, evidence/gemini.md §18, evidence/linear.md §5, academic/cognitive-load-theory.md | ChatGPT/Gemini conflation = overload; Linear one model; CLT | One source of truth (mode) |
| Trust (architectural first) | A | 92% | evidence/anytype.md §21, evidence/granola.md §21, evidence/bolt.md §21, evidence/linear.md §21, evidence/chatgpt.md §21, evidence/genspark.md §21, evidence/apple-intelligence.md §21, academic/trust-in-ai.md | Anytype/Granola/Bolt/Linear = architectural; ChatGPT/Genspark = erosion; Apple PCC; Trust in AI | Architectural first + interactional second |
| Explainability | A | 90% | evidence/notebooklm.md §22, evidence/heptabase.md §22, evidence/perplexity.md §22, evidence/deepseek.md §22, evidence/glm.md §22, evidence/langgraph-studio.md §22, research-group-I.md §Primer, academic/explainable-ai.md | NotebookLM gold standard; Heptabase per-paragraph; Perplexity inline; DeepSeek-R1 exposed CoT; GLM-4.7 toggle; LangGraph state; Primer hallucination-guard; XAI | Per-claim citations + exposed reasoning + decision explainer + hallucination-guard |
| Errors | A | 85% | evidence/continue.md §27, academic/jakob-nielsen.md, academic/ben-shneiderman.md, academic/human-ai-interaction.md, evidence/claude-code.md §14, evidence/aider.md §12 | Continue silent failures; Nielsen heuristic 9; Shneiderman rule 5; Amershi G7; Claude Code Esc Esc; Aider auto-commit | Inline + actionable + explainable + one-keystroke rewind (STRENGTHENED) |
| Recovery | A | 88% | evidence/claude-code.md §14, evidence/aider.md §12, evidence/langgraph-studio.md §24, evidence/cursor.md §13, evidence/v0.md §13, academic/ben-shneiderman.md | Claude Code rewind; Aider revert; LangGraph state-edit + time-travel; Cursor Checkpoints; v0 Fork; Shneiderman rule 6 | Rewind + state-edit-and-continue + Fork |
| Notifications | A | 85% | evidence/apple-intelligence.md §15, research-group-E.md, academic/jakob-nielsen.md | Apple no-toast; Material Snackbar; Fluent Message-bar; Nielsen visibility | Inline for conversation + Snackbar for system |
| Long-Running Tasks | A | 88% | evidence/replit.md §12, evidence/lovable.md §9, evidence/manus.md §12, evidence/langgraph-studio.md §24, evidence/dust.md §24, evidence/granola.md §8, academic/human-ai-interaction.md | Replit plan gate; Lovable plan.md; Manus pause/resume + Scheduled Tasks; LangGraph state-edit + time-travel; Dust triggers; Granola ambient; Amershi G14 | Approvable plans + visible progress + background + recovery |
| Keyboard | A | 90% | evidence/linear.md §14, evidence/raycast.md §14, evidence/vscode.md §14, evidence/helix.md §14, evidence/notion.md §14, evidence/claude-code.md §14, academic/fitts-law.md, academic/hicks-law.md, academic/jef-raskin.md, academic/recognition-vs-recall.md | Linear hold-Space + single-key; Raycast Quick AI; VS Code prefix; Helix selection-first; Notion slash; Claude Code Esc Esc; Fitts; Hick; Raskin; Recognition > Recall | Hold-Space + ⌘K + ⌘⇧Tab + single-key + 2-modifier cap |
| Accessibility | A/B | 80% | research-group-E.md, academic/fitts-law.md, patterns/accessibility.md, evidence/vscode.md §19, evidence/apple-intelligence.md §19, academic/jakob-nielsen.md | Apple 44pt; Fitts; WCAG AA; Primer MUST; VS Code ⌥F1; Apple 5 a11y; Nielsen | WCAG AA + 44px + reduced-motion + ARIA (VALIDATION REQUIRED) |
| Performance | A/B | 85% | evidence/linear.md §20, evidence/linear.md §11, evidence/bolt.md §20, research-group-I.md | Linear local-cache; Linear ⌘K local; Bolt local; Linear cause-and-effect; Stripe 500ms; Primer tiers | Local-first + <80ms + <1s + ≥50fps (VALIDATION REQUIRED) |
| Privacy / Security | A | 90% | evidence/anytype.md §21, evidence/bolt.md §21, evidence/codex.md §21, evidence/claude-code.md §8, evidence/apple-intelligence.md §21, evidence/genspark.md §21, academic/trust-in-ai.md | Anytype E2E; Bolt local; Codex OS-sandbox; Claude Code 6 modes; Apple PCC; Genspark anti-pattern; Trust in AI | Local-first + E2E + no-counters + named sandbox modes + audit log |
| Offline / Online | A | 82% | evidence/anytype.md §21, evidence/bolt.md §12, evidence/aider.md §25, evidence/codex.md §25 | Anytype local; Bolt WebContainer; Aider local LLM; Codex --oss | Offline-first + graceful degradation + local model |
| Agent Collaboration | A | 85% | evidence/openhands.md §8, evidence/claude-code.md §8, evidence/dust.md §8, evidence/langgraph-studio.md §24, evidence/manus.md §27 | OpenHands event-stream + TaskToolSet; Claude Code subagents; Dust Temporal + observability; LangGraph Fork + replay; Manus sequential | SharedWorkspace + event-stream + QualityLayer + sub-agents + hierarchical delegation |
| Developer Mode | A | 85% | evidence/apple-intelligence.md §18, evidence/ms-copilot.md §18, evidence/linear.md §18, evidence/v0.md §27, evidence/bolt.md §14, academic/progressive-disclosure.md | Apple 3-layer PD; MS 3-layer + governance; Linear "simple first"; v0 "no terminal" complaint; Bolt terminal; PD principle | Hidden by default + floating panel + always one shortcut away |
| Extensibility / Plugins | A | 82% | evidence/github-spark.md §11, evidence/tana.md §25, evidence/amie.md §25, evidence/superhuman.md §25, evidence/claude-code.md §8, evidence/notion.md §14, evidence/obsidian.md §27 | GitHub @-mention; Tana MCP; Amie MCP; Superhuman MCP; Claude Code hooks; Notion slash; Obsidian fragmentation anti-pattern | MCP + slash blocks + hooks + personal registry |
| API Philosophy | A | 85% | evidence/langgraph-studio.md §25, evidence/codex.md §25, evidence/openhands.md §25, evidence/notebooklm.md §25, evidence/perplexity.md §25, research-group-I.md §Stripe | LangGraph SDK; Codex SDK + GitHub Action; OpenHands API; NotebookLM API; Perplexity per-token; Stripe DX | One public surface + no bypass + streaming + idempotent boot + defensive |
| Scalability | A | 82% | evidence/linear.md §20, evidence/notion.md §27, evidence/zed.md §15, evidence/vscode.md §20 | Linear IndexedDB; Notion long-page lag; Zed GPU; VS Code lazy | Virtualization + indexed retrieval + caching + lazy loading + background sync |
| Motion | A/B | 82% | research-group-I.md, evidence/linear.md §16 (inferred), academic/progressive-disclosure.md | Primer 100/200/300/500; Linear 0/100/250/350 (inferred); Stripe 500; Material Emphasized; Linear instant-enter/150-exit (inferred); Primer MUST/NEVER; reduced-motion | 5 tiers + Emphasized + asymmetric + springs + composited only (Linear tokens inferred — ACCEPTED LIMITATION) |
| Visual Language | A | 88% | research-group-E.md, research-group-I.md, evidence/arc.md §5, academic/fitts-law.md, academic/millers-law.md, academic/jakob-nielsen.md | Apple calm; Material rigor; Fluent depth; Geist restraint; Arc accent; Fitts; Miller; Nielsen minimalist | Calm depth + one accent + 5-level elevation + 9 type roles + 4px spacing |

**Average confidence: 86.5%. No decision rests on D-grade evidence alone. Decisions with low-confidence evidence (Motion 82% — Linear inferred; Accessibility 80% — no axe-core; Personal Model 82%; Offline 82%; Scalability 82%; Extensibility 82%) are flagged as ACCEPTED LIMITATIONS or VALIDATION REQUIREMENTS.**

---

# PART 32 — OPEN RISKS

| # | Risk | Why unresolved | Impact | Validation required | Owner | Priority |
|---|---|---|---|---|---|---|
| 1 | Central thesis (conversation-spine + canvas-per-mode) rests on inference | No product validates the combination; no user testing | If wrong, entire product is wrong | User testing in implementation | Owner | HIGH |
| 2 | No live UX observation for 45/50 products | Sandbox cannot access Cloudflare-gated SPAs | Motion/timing/a11y details unverified | Playwright/headless browser in implementation | Owner | MEDIUM |
| 3 | Linear `--speed-*` motion tokens inferred | Cloudflare-blocked blog | Motion spec may not match Linear's exact values | Playwright extraction of linear.app/blog | Owner | LOW |
| 4 | No accessibility testing | No axe-core/VPAT/screen-reader | A11y claims unverified | axe-core audit + NVDA/VoiceOver in implementation | Owner | HIGH |
| 5 | No performance benchmarks | Not measured | Performance targets unvalidated | Lighthouse/Chrome DevTools in implementation | Owner | MEDIUM |
| 6 | Alan Cooper + Jef Raskin books not accessed | Out of print | Persona/quasimode principles secondary-sourced | Library/archive.org access (optional) | Owner | LOW |
| 7 | Don Syme retrospective primary source not located | Not found via curl | Insight is secondary-sourced | Direct outreach / X-archive (optional) | Owner | LOW |
| 8 | No user testing of patterns | Not conducted | Pattern syntheses not validated | User testing in implementation | Owner | HIGH |
| 9 | No video research | None watched | Motion/interaction details unobserved | Watch key demos (optional) | Owner | LOW |
| 10 | Cowan's 4±1 challenges Miller's 7±2 | Academic debate | Rail icon limit may be 4-6 not 7-8 | User testing (card-sort) | Owner | LOW |
| 11 | Multi-window / multi-monitor not researched | Deferred to v2 | Power users may need multi-window | v2 research cycle | Owner | LOW (v2) |
| 12 | Voice-first not deeply researched | Deferred | VoiceMode may be under-built | v2 research cycle | Owner | LOW (v2) |
| 13 | Mobile companion not deeply researched | Deferred | Mobile may be under-built | v2 research cycle | Owner | LOW (v2) |
| 14 | No long-session empirical data | Inferred from docs | Long-session risks unvalidated | Long-session user testing in implementation | Owner | MEDIUM |
| 15 | Daemon mode may feel invasive | Not validated with owner | Owner may not want autonomous background work | Owner sign-off before implementing daemon | Owner | MEDIUM |
| 16 | Per-task-type trust may be too coarse/fine | Not empirically tested | May cause friction or be unsafe | User testing in implementation | Owner | MEDIUM |

**No risk is a BLOCKER.** All are either ACCEPTED LIMITATIONS (will validate in implementation) or deferred to v2 or LOW priority. The 3 HIGH-priority risks (1, 4, 8) will be addressed in implementation via user testing + axe-core + golden-path verification.

---

# PART 33 — FINAL PRODUCT CONTRACT

## MiMo Product Contract

### What is MiMo?
MiMo is a Personal AI Operating System for one power user. It is a conversation-spine system with an adaptive canvas that becomes code editor, live preview, source pane, image canvas, terminal, or writing surface depending on the current mode. It has a Core intelligence pipeline (Context → Reason → Plan → Execute → Validate → Done), a Memory engine (two-layer, project-scoped, source/timestamp/delete), a Knowledge graph (derived from memory, per-claim citations), a Personal Model (living digital twin), an Agent system (living-workflow pipeline, per-task-type trust), and a Developer Mode (hidden by default, floating panel).

### For whom?
For one person: the owner. Who is simultaneously the developer, the operator, and the end user. Technical, uses MiMo daily for multi-hour sessions, values craft + focus + long-term investment, works in Arabic + English, wants a system that grows with them over years.

### Why?
Because no product studied combines: conversation-as-permanent-spine + canvas-as-adaptive-per-mode + local-first + E2E + no-counters + no-deprecations + 8 modes + one-container + one-branch + one-AI-surface + personal-model + knowledge-graph + daemon-mode. Each existing product chose one or two; none chose the combination. MiMo exists to be that combination — an OS for one person's intellectual life, not a chatbot, dashboard, or single-mode dev tool.

### How does it work?
- **Conversation** is pinned tab #1, never replaced. Everything orbits it.
- **Canvas** adapts per mode (8 modes). Conversation stays underneath as spine.
- **ExecutionTrace** renders inline in the streaming AI message with real runtime motion (not spinners).
- **AgentDock** appears only when agents work; pipeline stepper, not static cards.
- **Artifacts** are first-class tab-able runtime objects (gVisor-style sandbox).
- **Memory** is two-layer, project-scoped, every item shows source + timestamp + delete.
- **Knowledge** is derived from memory, per-claim source-to-quote citation (NotebookLM gold standard).
- **Trust** is architectural first (local-first + E2E + no-counters + no-deprecations) + interactional second (per-hunk accept/reject, per-task-type trust).
- **Keyboard** is home: hold-Space peek + ⌘K prefix grammar + ⌘⇧Tab Quick AI + single-key daily-5.
- **Developer Mode** is hidden by default; floating panel when on.
- **Local-first**: works offline; cloud sync opt-in + E2E.

### What are its rules? (Product Invariants)
1. No duplicate mental models (one container, one branch, one AI surface).
2. No UI clutter without reason (rail ≤8, calm default, progressive disclosure).
3. No autonomous action without permission model (per-task-type trust, named sandbox modes).
4. No memory without provenance (source + timestamp + delete).
5. No destructive action without recovery (per-hunk accept/reject, rewind, rollback).
6. No long-running task without observable state (ExecutionTrace, AgentDock, progress).
7. No AI output without context/evidence when external knowledge used (citations, hallucination-guard).
8. No silent failures (inline + actionable + explainable errors).
9. No credit/quota counters (never).
10. No deprecations mid-redesign (working features never removed).
11. No 3-modifier hotkeys (cap at 2).
12. No layout-triggering animations (composited only).
13. No `prefers-reduced-motion` ignored (ARIA live regions).
14. No raw color values in components (token-first).
15. No `<Link>` to other routes (single route, everything is tab/panel/overlay).
16. No bypass of the Core pipeline.
17. No z-ai-web-dev-sdk in client (backend-only).
18. No mock data (real Core APIs only).
19. No telemetry (no tracking unless opt-in).
20. No 100% diff overwrites (per-hunk always).
21. No parallel agents without per-agent visibility (sequential default).
22. No per-instance approval storms (per-task-type trust).
23. No spinner for AI work (inline ExecutionTrace, real runtime motion).
24. No modal error blocks (inline, dismissable).
25. No terminology churn (vocabulary locked).
26. No `any` types (TypeScript strict).
27. No `console.log` in production (Core logger).
28. No second sidebar (ONE right adaptive).
29. No second command palette (ONE with prefix grammar).
30. No second elevation/motion/keyboard/explainability system (one per dimension).
31. Architectural trust first (local-first + E2E + no-counters + no-deprecations).
32. One model per dimension (enforced at architecture).
33. Craft over scale (ship fewer features at higher craft).

### What cannot be changed?
- The 5 product principles (conversation permanence, canvas adaptivity, alive workflow, progressive disclosure, keyboard as home).
- The product invariants (1-33 above).
- The vocabulary (locked pre-launch).
- The architecture layers (UI → API → Core).
- The 6-stage pipeline (Context → Reason → Plan → Execute → Validate → Done).
- The one-container (Project) + one-branch (Fork) + one-AI-surface (Conversation) model.

### What can be evolved?
- New modes (canvas types).
- New artifact types.
- New memory types.
- New knowledge entity types.
- New agents (registered at kernel boot).
- New models (ModelRegistry supports multiple).
- New plugins (MCP).
- New hooks.
- New slash blocks.
- Daemon mode (v2).
- Multi-window (v2).
- Mobile companion (v2).
- GPU rendering (v2 aspiration).
- Visual GUI agent (future).

### Final statement
This Bible is the single source of truth. Implementation must be a direct translation. No reinvention during coding. No inventing layouts in code. Any gap found during implementation requires amending this document first, then code follows.

The goal is not a beautiful UI. The goal is a product that can be used daily for years, where the owner feels every detail is deliberate and has a reason to exist.

---

**END OF MiMo PRODUCT BIBLE.**

**Status: COMPLETE.**

**Ready for implementation.**
