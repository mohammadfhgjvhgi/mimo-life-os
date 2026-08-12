# Deep Philosophical Analysis — 21 Dimensions

**Task ID:** J
**Agent:** Senior Product Philosopher / UX Theorist
**Subject:** Deep cross-cutting analysis of 21 philosophical dimensions across the 25+ products studied in research-groups A–E, plus 7 newly-studied products (Heptabase, Anytype, Microsoft Fluid Framework, Granola, Helix, Reflect, Zed, DeepSeek-R1).
**Method:** Re-read cross-product synthesis sections of `research-group-{A..E}.md` + MiMo_Design_Specification.md Parts 1–6, then ran 8 `web_search` invocations on new products (snippets rich enough; `page_reader` rate-limited). Synthesized across everything.
**MiMo identity recap (the yardstick for every decision):** single-user AI Operating System; owner = developer + operator + user; conversation-spine + canvas-per-mode; daily multi-hour use; desktop-first + mobile-companion; keyboard home; ≤ 8 rail icons; one accent; one AI surface.

---

## 1. Product Philosophy

**Means:** the irreducible thesis a product defends against feature creep — what the product *is*, not what it *does*. In an AI OS this means the stance on whether AI is a tool (you use it), a collaborator (you work with it), or an environment (you live inside it).

**Best exemplar: Cursor — "the editor IS the AI canvas."** Cursor held a single thesis (editor-first, AI embedded in the editor surface) across 3 major versions and resisted the chat-product gravity every other coding tool fell into. Don Syme's Copilot Workspace retrospective independently validates this: chat-only lost. Cursor wins because its philosophy is *defensible* (a single sentence, three years, no wavering). Source: research-group-B.md §Cursor + Don Syme retrospective.

**Worst anti-pattern: v0 — identity confusion.** v0's perpetual question "is this a design tool or a code tool?" is the clearest philosophical failure. Removing Design Mode in Jan 2026 then re-adding it is the *symptom* of a product with no spine. Source: research-group-C.md.

**MiMo principle (fixed rule):** the product's thesis is "an Operating System for one person's intellectual life — conversation is the spine, canvas adapts per mode, workflow is alive, keyboard is home." No feature may ship that contradicts this thesis. Any single mode (code, research, image) that begins to define the product is a regression.

**MiMo decision + reason:** Ship the 4-primitive synthesis (conversation-spine + canvas-per-mode + living-workflow + OS-grade keyboard) and write the thesis into `MIMO.md` so every contributor reads it. Reason: a thesis that isn't written down is unenforceable; Cursor's discipline came from the founders' shared mental model, MiMo must externalize it.

**Adopt / Adapt / Reject:**
- Adopt: Cursor's single-thesis discipline (one defensible sentence).
- Adapt: Manus's "alive computer" thesis — MiMo is not a browser agent but the *alive* feeling applies (ExecutionTrace).
- Reject: Notion's "block-first compositional" thesis — too generic; MiMo's compositional unit is the *conversation turn*, not the block.
- Reject: ChatGPT's "everything for everyone" thesis — produces 8 overlapping AI surfaces (anti-pattern #5 in the spec).

---

## 2. UX Philosophy

**Means:** how the UI treats the user — as a tourist (guided, hand-held, dumbed-down), a driver (controls visible, direct manipulation), or a virtuoso (keyboard home, peek-before-commit, opinionated). For an AI OS owned by one power user, only the virtuoso stance is coherent.

**Best exemplar: Linear — "keyboard-first, opinionated, fast."** Linear's hold-`Space`-to-peek is the single most copied UX idea of 2024–2025. The philosophy is "respect the user's flow state by never forcing commitment" — peek, release, decide. Source: research-group-D.md §Linear.

**Worst anti-pattern: GitHub Copilot Workspace — "structured pipeline that feels laboured."** Don Syme's own regret: "we didn't embrace chat as both the output of the coding agent and the place to give guidance." The UX was *over-structured* — spec/plan/code as separate stages — making the user feel they were filling out forms rather than collaborating. Source: research-group-B.md.

**MiMo principle (fixed rule):** the user is a virtuoso. Every primary action is reachable in ≤ 2 modifiers. Peek before commit. Act without menus. Transform without toolbars. The default chrome is calm (conversation + adaptive sidebar) and the user opts INTO complexity, never out of it.

**MiMo decision + reason:** Three signature interactions form the UX philosophy — Hold-`Space` peek (Linear), `⌘K` command palette with prefix grammar (VS Code + Arc), `⌘⇧Tab` Quick AI on selection (Raycast). Reason: each solves a specific problem — peek eliminates commitment cost, command palette eliminates menu-hunting, Quick AI makes "transform this text" a verb instead of a destination.

**Adopt / Adapt / Reject:**
- Adopt: Linear's peek-before-commit posture.
- Adopt: Raycast's "AI as a verb on selection" — MiMo's conversation IS the AI surface; quick-AI-on-selection is the verb form.
- Reject: Apple's "tourist" iOS push-stack + bottom-tab model — wrong for a power-user desktop OS.
- Reject: Notion's "block as the universal primitive" — MiMo's primitive is the conversation turn.

---

## 3. Mental Models

**Means:** the internal model the user forms of how the system works. A good mental model is single, consistent, and predictive — the user can guess what a new feature does because it fits the model. Bad products make users hold multiple incompatible models simultaneously.

**Best exemplar: Cursor — "editor IS the AI canvas."** One model: edits happen in the editor, AI proposes diffs there, you accept/reject there. No second "chat output" model. Compare to Continue.dev which forces users to hold *three* models (sidebar chat + inline editor + manual context attach) — fragmentation. Source: research-group-B.md.

**New angle: Helix — "selection → action" (Kakoune-derived).** Helix gets rid of verb-then-noun operators (`dd` for delete-line) in favor of noun-then-verb (`xd` — select line, then delete). One consistent model: every command first establishes a selection, then applies an action. This is the cleanest single mental model in any editor studied. Source: helix-editor.com/docs/usage.html.

**Worst anti-pattern: Notion's 8 AI surfaces.** AI block + AI property + AI Autofill + AI Q&A + AI Writer + AI Connector + Notion Agents + AI Summary — users cannot form a single predictive model. They must learn 8 overlapping mental models to use the product. Source: research-group-D.md §Notion.

**MiMo principle (fixed rule):** the user holds exactly ONE mental model — "conversation is the spine; everything else slides in as a tab/overlay/sidebar." Any feature that requires a second mental model is a regression. Slash blocks (`/`) re-run on input change, but they live *inside* the conversation, not as a parallel surface.

**MiMo decision + reason:** Conversation-spine + canvas-per-mode + living-workflow inline. Reason: Helix's selection-first discipline proves that *one* consistent model beats *many* overlapping models even when each individual one is good. MiMo's conversation is the equivalent of Helix's "selection" — every action starts there.

**Adopt / Adapt / Reject:**
- Adopt: Helix's "one consistent model, applied orthogonally" discipline.
- Adapt: Cursor's "editor IS the AI canvas" → MiMo's "conversation IS the AI surface, canvas adapts per mode."
- Reject: Notion's multi-surface AI mental model (8 overlapping AI features).

---

## 4. Information Architecture

**Means:** how content is organized — the container hierarchy, the navigation, the addressability of every object. For an AI OS this is decisive: too many container types (Workspace / Project / Remix / Branch / Fork / Template / Skill) collapse the user's ability to find anything.

**Best exemplar: Linear — single-issue-list + clean sidebar.** Linear's IA is: Team → Project → Issue, with Initiatives/Cycles as cross-cutting views (not containers). Nothing else. The rail never exceeds a handful of icons. Source: research-group-D.md §Linear.

**New angle: Anytype — local-first P2P, CRDT-based AnySync protocol, "spaces" (graph-based), objects + relations (semantic, not folders).** Anytype replaces the folder hierarchy with a typed-object graph: every note is an object with a Type, every link is a typed Relation, every Space is a graph. This is the cleanest "no-folder" IA studied. Source: anytype.io + HN Show HN thread (38794733).

**Worst anti-pattern: Lovable's 7 container concepts** (Workspace + Project + Remix + Branch + Fork + Template + Skill) and **v0's 8** (Preview + Code + Design + History + Fork + Version + Git + Templates). Both fail because the user cannot predict which container a new artifact will live in. Source: research-group-C.md.

**MiMo principle (fixed rule):** Project is the ONLY container. Fork is the ONLY branch primitive. The rail NEVER exceeds 8 icons. Memory + Knowledge + Files + Agents are *facets* of a Project, not separate top-level containers. No "Workspace / Repl / Remix / Template" — those are anti-patterns Lovable/v0 paid for.

**MiMo decision + reason:** Single Project container with conversation lineage + forks + artifacts + scoped memory + derived knowledge. Reason: container-sprawl is the silent killer of long-session UX; Anytype's typed-object graph is intellectually appealing but adds a Type/Relation taxonomy the user would have to learn — MiMo keeps it flat.

**Adopt / Adapt / Reject:**
- Adopt: Linear's rail discipline (≤ 8 icons).
- Adapt: ChatGPT's Project-as-memory-scope (scoped memory with hard toggle) — MiMo adds shared OS-memory as a sibling.
- Reject: Anytype's typed-object graph — too steep a learning curve for the single-user daily driver.
- Reject: Arc's sidebar-doing-everything (bookmarks + tabs + folders + spaces) — explicitly forbidden by spec.

---

## 5. Interaction Design

**Means:** the moment-to-moment grammar of input and output — what happens when you press a key, drag an object, accept an AI proposal. For an AI OS the critical interaction is *approval granularity*: per-instance (Codex storms), per-task-type (Manus learned trust), or per-hunk (Cursor Composer).

**Best exemplar: Cursor Composer — per-file accept/reject on staged diffs.** Documented as "the single biggest reduction in AI-induced regression risk" across all 7 coding agents studied. The interaction is: AI proposes a multi-file diff; user accepts/rejects per file or per hunk; rejected hunks don't pollute the workspace. Source: research-group-B.md §Cursor.

**Worst anti-pattern: Codex — approval-prompt storms.** Codex's biggest user complaint is approval fatigue — every command requires explicit approval with no "always allow this kind" path. Per-instance approval is the wrong granularity for an agent that runs 50 commands per task. Source: research-group-B.md §Codex.

**MiMo principle (fixed rule):** Per-task-type trust, never per-instance. Every approval prompt must offer "Always allow this kind" as a one-click path. For artifacts (code, docs), per-hunk accept/reject is mandatory — never 100% diff overwrites (Continue's anti-pattern).

**MiMo decision + reason:** Three approval granularities — (a) for tool execution, per-task-type trust ("Always allow `file.read` in this project"); (b) for artifact edits, per-hunk accept/reject; (c) for high-risk operations (file.delete, network egress), per-instance with named sandbox modes (Codex pattern: read-only / workspace-write / danger). Reason: each granularity solves a specific failure mode — task-type stops storms, hunk-level stops regressions, per-instance stops catastrophic actions.

**Adopt / Adapt / Reject:**
- Adopt: Cursor's per-file/per-hunk accept-reject (mandatory for artifact edits).
- Adopt: Codex's named sandbox modes (read-only / workspace-write / danger).
- Adapt: Manus's "always allow this kind" → MiMo's per-task-type trust with audit log.
- Reject: Continue's 100% diff overwrite — the single biggest regression-risk interaction.

---

## 6. Cognitive Load

**Means:** the amount of working memory the user must spend to operate the product. In an AI OS this is the silent killer — every additional surface, dropdown, mode-picker, or counter is a tax on the user's concentration. The Don Syme retrospective names this directly: "laboured UX makes inefficient use of the developer's concentration."

**Best exemplar: Raycast — cognitive load = 1.** The entire product is one command palette. No sidebar, no dashboard, no second surface. The user's working memory holds one thing: "what do I want to do right now." Premium feel rated 5/5, cognitive load rated 1/5. Source: research-group-D.md §Raycast.

**Worst anti-pattern: Notion — 8 AI surfaces + dense pages + slow render.** Notion's cognitive load is rated 4/5 because the user must always be choosing *which* AI to use (Q&A vs Writer vs Autofill vs Summary vs Agents) and *where* they are (sub-page → sub-page → database → view). Source: research-group-D.md §Notion.

**MiMo principle (fixed rule):** ONE AI surface — the conversation. Every other AI capability (memory extraction, knowledge derivation, agent steps, tool calls) is rendered *inside* the conversation stream, never as a parallel UI. Hide choices behind good defaults; never surface them all.

**MiMo decision + reason:** Default chrome = conversation + one adaptive sidebar. DeveloperPanel/ExecutionTrace-runtime/runtime metrics hidden unless explicitly enabled. Reason: the spec's anti-pattern list names "dashboards / KPI grids / always-visible CPU graphs" as forbidden; cognitive-load reduction is the *only* way to sustain daily multi-hour use.

**Adopt / Adapt / Reject:**
- Adopt: Raycast's one-surface discipline (MiMo's conversation IS the one surface).
- Adopt: Linear's hide-everything-defaults (no dashboards).
- Reject: Notion's "AI everywhere as a feature" — explicitly forbidden.
- Reject: VS Code's "two sidebars both showing navigation" trap (Primary + Secondary).

---

## 7. Progressive Disclosure

**Means:** the discipline of revealing complexity only when needed. Good progressive disclosure: the default state is calm, the user can predict what's behind each disclosure, and dismissed complexity stays dismissed. Bad progressive disclosure: lazy initialization that *feels* like disclosure but is actually a broken widget.

**Best exemplar: Apple HIG — material layer above content; controls recede.** Apple's three principles (Clarity, Deference, Depth) operationalize progressive disclosure: chrome is a *functional layer above content*, not the foreground. Controls recede when content is the focus. Source: research-group-E.md §Apple HIG.

**New angle: Heptabase — whiteboards + cards, zoom-level disclosure.** Heptabase's disclosure is spatial: a card shows a title at zoom-out, summary at mid-zoom, full content at zoom-in. AI chat can use the whiteboard as context — disclosure through spatial position, not collapsible panels. Source: heptabase.com + Medium article.

**Worst anti-pattern: Continue.dev — sidebar-disappears-for-years + 5–10s lazy init.** Continue's sidebar would vanish across updates (issue #1312, May 2024 → May 2026 still open), and the inline editor had 5–10s lazy-initialization lag on first use. This *looks* like progressive disclosure but is actually broken disclosure — the user expects something, gets nothing. Source: research-group-B.md §Continue.

**MiMo principle (fixed rule):** Default state is calm: conversation + adaptive sidebar. Everything else (developer tools, runtime metrics, agent internals, memory graphs) is hidden unless `devMode` is on. Pre-warm all widgets so first-use is never lazy. Layout persists across reloads (VS Code pattern) so disclosure state is stable.

**MiMo decision + reason:** Hold-`Space` peek is the universal progressive-disclosure gesture (Linear) — preview any sidebar item, release to dismiss, zero commitment. DeveloperPanel is a conditional rail icon that appears only when `devMode` is on. Reason: peek-without-commit is the only disclosure model that doesn't tax the user's working memory; dev-tools hiding is the only way to keep daily multi-hour use calm.

**Adopt / Adapt / Reject:**
- Adopt: Apple's "controls as functional layer above content" — MiMo's rail/composer are a layer, not foreground.
- Adopt: Linear's hold-`Space` peek as universal disclosure.
- Adapt: Heptabase's spatial disclosure → MiMo's "zoom-level detail on artifacts" via hover thumbnails.
- Reject: Continue's lazy-init-as-disclosure — pre-warm everything.

---

## 8. Human-AI Collaboration

**Means:** the interactional contract between user and AI — who proposes, who reviews, who commits, who learns. The spectrum: AI-as-tool (user invokes, AI returns), AI-as-copilot (AI proposes inline, user accepts), AI-as-partner (AI watches user edits and proactively offers consistency fixes), AI-as-agent (user delegates, AI executes with bounded autonomy).

**Best exemplar: Windsurf — real-time awareness of user edits.** Windsurf detects when the user renames a symbol and proactively offers to update all references. This is the deepest human-AI collaboration pattern studied — the AI isn't waiting to be invoked, it's *watching* and *offering*. Source: research-group-B.md §Windsurf.

**New angle: Heptabase — AI chat with whiteboard-as-context.** You build a visual structure (whiteboard + cards), then AI explains/takes notes *within* your structure. The user brings the spatial model; AI augments within it — collaboration where the user's intellectual structure is the substrate, not the AI's chat log. Source: Medium article on Heptabase.

**Worst anti-pattern: Continue.dev — 100% diff overwrites.** Continue's AI overwrote entire files instead of producing per-hunk diffs. This isn't collaboration; it's overwrite. The user has no review granularity. Source: research-group-B.md §Continue.

**MiMo principle (fixed rule):** The collaboration model is *partner*, not *tool* and not *agent*. The AI watches EventBus events (user edited X) and proactively offers consistency fixes (Windsurf pattern). The user always has per-hunk accept/reject (Cursor pattern). The AI never auto-commits high-risk operations (delete, network egress) without per-instance approval.

**MiMo decision + reason:** EventBus emits "user edited X" events; WriterAgent subscribes and proactively offers consistency fixes. ExecutionTrace renders inline so the user sees the AI's reasoning before any artifact is written. Reason: Windsurf's proactive consistency is the only feature in the 25 products studied that genuinely feels like partnership; the others are all tool or agent.

**Adopt / Adapt / Reject:**
- Adopt: Windsurf's rename-detection → generalized "user edited X, here's a consistency fix."
- Adopt: Cursor's per-hunk accept/reject as the review granularity.
- Adapt: Heptabase's "AI within user's structure" → MiMo's conversation-within-user's-project-scope.
- Reject: Continue's 100% overwrite — no collaboration, just overwrite.
- Reject: Manus's parallel-agent "collaboration" — parallel agents confuse users (Manus's own weakness).

---

## 9. Agent UX

**Means:** how the system shows the user what an autonomous or semi-autonomous AI process is doing — visibility, velocity, accountability, and trust calibration. For an AI OS this is the difference between feeling "alive" and feeling "stuck."

**Best exemplar: Manus — live "Computer" pane with real browser + terminal + file operations.** Manus's defining feature is a live runtime pane showing the agent's actual screen — browsing, typing, clicking, reading files. This is the "alive" feeling every other product tried and failed to capture with spinners. Source: research-group-C.md §Manus.

**Also excellent: Gemini Deep Research — live thoughts while browsing.** Gemini streams its reasoning inline as it browses sources — "I'm now looking at X, here's what I notice" — turning minutes of waiting into a watchable thinking process. Premium exemplar in research-group-A.md.

**Worst anti-pattern: v0 — static "waiting for generation."** No motion, no progress, no visibility into what the agent is doing. Feels dead. Source: research-group-C.md §v0.

**New angle: Granola — ambient agent that never enters the room.** Granola listens to your meeting audio *without a bot joining the call* and writes notes quietly in the background. Source: granola.ai + zackproser review. This is the *passive agent* pattern — agent UX without any agent UI at all.

**MiMo principle (fixed rule):** Agents are hidden when idle (no static agent cards — Genspark anti-pattern). When working, agents render as a horizontal 6-stage pipeline stepper (Context → Reason → Plan → Execute → Validate → Done) with *real runtime motion* per stage (real terminal output, real browser screenshots, real file diffs — not just stage labels lighting up). Per-task-type trust, never per-instance storms. Sequential pipeline, not parallel agents (unless per-agent visibility is added).

**MiMo decision + reason:** ExecutionTrace renders INSIDE the streaming AI message — pipeline stages animate inline with real runtime motion per stage. Each stage has a named identity (Planner / Researcher / Builder / Reviewer / Verifier). Reason: Manus's "alive" feeling is the 2025–2026 differentiator; v0's "dead waiting" is the failure mode; MiMo must be Manus, not v0.

**Adopt / Adapt / Reject:**
- Adopt: Manus's live runtime pane (browser/terminal/file ops) — MiMo's ExecutionTrace-runtime.
- Adopt: Gemini's live thoughts streaming.
- Adapt: Granola's ambient-agent pattern → MiMo's daemon mode (scheduled runs without prompting).
- Reject: Genspark's 9+ named agents + opaque credit costs — too many visible agents = chaos.
- Reject: v0's static "waiting for generation."

---

## 10. Workspace UX

**Means:** the spatial organization of surfaces — where the conversation lives, where the artifact lives, where the runtime lives, where the file tree lives, where the memory lives. For an AI OS this is the difference between "everything is one tab away" and "I lost my place."

**Best exemplar: Cursor — Workspace IS the AI canvas.** Cursor treats the workspace as the single surface — chat in a sidebar, editor in the center, diffs inline. No separate "AI output" panel. Source: research-group-B.md §Cursor.

**New angle: Zed — GPU-rendered multiplayer workspace.** Zed's workspace is a single Rust+Vulkan surface that renders at 120+ fps, supports real-time multiplayer (multiple cursors), and treats the workspace as a shared live document. Source: zed.dev + Medium article. The architectural insight: GPU rendering eliminates the jank that plagues Electron-based workspaces at long session lengths.

**Worst anti-pattern: Continue — sidebar-orphaned chat.** Continue's chat lives in a sidebar, disconnected from the editor surface where edits happen. The user's attention is split across two surfaces with no spatial continuity. Source: research-group-B.md §Continue.

**MiMo principle (fixed rule):** The conversation tab is pinned #1 and cannot be closed. The canvas adapts per mode (code editor / live preview / source pane / image canvas / terminal). Artifacts open as their own tabs *alongside* the conversation, not replacing it. The right sidebar is adaptive (swaps by mode). Layout persists across reloads (every tab, width, scroll, mode, cursor survives).

**MiMo decision + reason:** Pinned conversation + adaptive canvas + adaptive right sidebar + spawnable artifact tabs. Reason: Cursor's "workspace IS the canvas" thesis is the right model, but Cursor is code-only; MiMo generalizes to all 8 modes. The conversation stays *underneath* the canvas as the spine — never replaced, never scrolled away.

**Adopt / Adapt / Reject:**
- Adopt: Cursor's "workspace IS the canvas" — generalized across 8 modes.
- Adopt: VS Code's layout persistence (every state survives reload).
- Adapt: Zed's GPU rendering aspiration → MiMo should track this for v2 (today web tech is sufficient for ≤ 50fps on 1000+ messages).
- Reject: Continue's sidebar-orphaned chat surface.
- Reject: Lovable's 7 container concepts (Workspace/Project/Remix/Branch/Fork/Template/Skill).

---

## 11. Long Session Experience

**Means:** how the product holds up across 4+ hours of continuous daily use — does it accumulate value (memory, knowledge, refined defaults) or accumulate friction (counters, approval storms, jank, scroll lag)? For an AI OS owned by one user multi-hour daily, this is the make-or-break dimension.

**Best exemplar: Cursor — 4-archetype bounded scope + `.cursorrules` persistence + per-file accept/reject.** Cursor's bounded scope (research/build/test/review) prevents the agent from drifting into adjacent territory mid-session, and `.cursorrules` persists preferences across sessions. Source: research-group-B.md §Cursor.

**New angle: Reflect — backlinks-based second brain that accumulates value.** Reflect's model: every note links to others via backlinks, suggested-backlinks are one-click, AI generates titles/summaries. The longer you use it, the more valuable the note graph becomes. Source: reflect.app + stephenjzeoli Medium. This is the *accumulative* long-session pattern — value compounds with use.

**Worst anti-pattern: Genspark — 200 credits = 3–4 hours, then hard stop.** Genspark's credit quota actively *punishes* long sessions — failed tasks still charge, no rollover, unpredictable costs. The user is anxious about budget, not focused on work. Source: research-group-A.md §Genspark.

**MiMo principle (fixed rule):** NEVER impose counters or quotas — MiMo is single-user local-first, the user can always keep working. Long sessions are sustained by three things: (a) bounded agent scope (per-step scope: read-only / src/ / docs/), (b) explicit context hygiene (`/clear`, `/compact` commands — Codex pattern), (c) accumulating memory + knowledge that compound value (ChatGPT two-layer memory + Reflect backlinks pattern).

**MiMo decision + reason:** No credit counters anywhere. Conversation fork + versioned artifact thumbnails for graceful degradation on long chats (v0 Fork pattern). `MIMO.md` grounding file read at workflow start (Codex + Cursor + Claude Code converged). Memory + knowledge derive from accumulated conversations. Reason: the spec explicitly forbids counters (anti-pattern #2); the only sustainable long-session model is *accumulating value*, not *budgeting scarcity*.

**Adopt / Adapt / Reject:**
- Adopt: Cursor's bounded scope + AGENTS.md grounding.
- Adopt: Codex's `/clear` and `/compact` context hygiene commands.
- Adopt: v0's Fork button on long-chat-detected (graceful degradation).
- Adapt: Reflect's backlinks-as-accumulating-value → MiMo's Knowledge entities derived from memory.
- Reject: Genspark's credit counter — never impose.
- Reject: v0's forced-fork modal (interrupting flow) — fork should be opt-in.

---

## 12. Keyboard Driven UX

**Means:** the keyboard as primary interface — every action reachable from home row, peek before commit, transform without toolbars. For an AI OS owned by a power user, the keyboard isn't an accessibility feature; it's the *primary interaction grammar*.

**Best exemplar: Linear (hold-`Space` peek + single-key daily-5: C/S/A/P/L) + Raycast (`⌘⇧Tab` Quick AI on selection).** Linear and Raycast together define the keyboard-UX gold standard for non-code products. Source: research-group-D.md.

**New angle: Helix — selection-first modal editing.** Helix (Kakoune-derived) replaces verb-then-noun (`dd` = delete-line) with noun-then-verb (`xd` = select-line then delete). Every command first establishes a selection, then applies an action. Orthogonal, consistent, composable. Source: helix-editor.com/docs/usage.html + lobste.rs discussion.

**Worst anti-pattern: Raycast 3-modifier hotkeys.** Raycast's power-user shortcuts sometimes require three modifiers (`⌘⌥⇧X`), which is biomechanically hostile and cognitively taxing. Source: research-group-D.md §Raycast.

**MiMo principle (fixed rule):** Every primary action is reachable from the keyboard in ≤ 2 modifiers. Hold-`Space` peek (Linear). `⌘K` command palette with prefix grammar (`>cmd /search @mem #file !ai` — VS Code + Arc + Notion converged). `⌘⇧Tab` Quick AI on selection (Raycast). Single-key daily-5 (`C` new conversation, `M` memory, `A` agents, `R` research mode, `S` settings — Linear pattern).

**MiMo decision + reason:** One coherent keyboard language combining Linear peek + Raycast quick-AI + VS Code prefix grammar + Notion slash + Arc command-bar. Reason: this is the spec's "ONE defining interaction" — Hold-`Space` peek + `⌘K` act + `⌘⇧Tab` Quick AI. No product studied combines all five; MiMo's keyboard language is the differentiator.

**Adopt / Adapt / Reject:**
- Adopt: Linear's hold-`Space` peek universally (any sidebar item).
- Adopt: Raycast's `⌘⇧Tab` Quick AI on selection — the killer feature for an AI OS.
- Adopt: VS Code's prefix grammar for the command palette.
- Adopt: Notion's `/` slash command for in-conversation blocks.
- Adapt: Helix's selection-first principle → MiMo's "select text → ⌘⇧Tab → AI verb" — selection before action.
- Reject: Raycast's 3-modifier hotkeys (cap at 2).
- Reject: VS Code's JSON settings config (direct manipulation only).

---

## 13. Visual Hierarchy

**Means:** how the eye is guided — what's foreground, what's background, what competes for attention, what recedes. For an AI OS with conversation + canvas + sidebar + agent trace + artifacts + memory, the visual hierarchy is the difference between focus and chaos.

**Best exemplar: Apple HIG — Clarity, Deference, Depth.** Three principles, applied consistently: legible (Clarity), chrome recedes to serve content (Deference), layers convey hierarchy (Depth). Liquid Glass (2025) extends this: controls are a "distinct functional layer above content." Source: research-group-E.md §Apple HIG.

**Worst anti-pattern: Notion — dense, slow on long pages.** Notion's visual hierarchy collapses on long pages because every block has equal visual weight and the page itself is unvirtualized. The user cannot skim. Source: research-group-D.md §Notion.

**MiMo principle (fixed rule):** Calm material depth, not shadow stacks. Translucency + hairlines, not Material's 6-elevation shadows. 5 elevation levels by intent (base / hairline / container / floating / modal). Type carries hierarchy by weight (400/500/600/700), not by family. One accent color. Whitespace does the hierarchy work so chrome can recede.

**MiMo decision + reason:** Apple's calm material depth + Material's token rigor — role-based tokens (`surface-message`, `text-primary`, `accent-brand`, `border-hairline`), 5 elevation levels, single user-pickable accent seed per Project. Reason: Apple's "controls as functional layer above content" matches MiMo's conversation-as-spine thesis; Material's token system gives free light/dark/contrast theming; Fluent's prescriptive component-depth mapping prevents ad-hoc elevation.

**Adopt / Adapt / Reject:**
- Adopt: Apple's "controls as functional layer above content."
- Adopt: Material's role-based tokens + 5-level elevation by intent.
- Adopt: Fluent's prescriptive component-to-elevation mapping.
- Reject: Apple's full Liquid Glass (GPU-expensive, tiring in multi-hour sessions; reserve for rare delight moments).
- Reject: Material's wallpaper-derived Dynamic Color (couples to OS wallpaper).
- Reject: Fluent's per-product brand colors (MiMo has one accent, period).

---

## 14. Motion Design

**Means:** the temporal layer — how state changes are communicated through duration, easing, and physics. For an AI OS this is decisive because the agent's *thinking* happens over seconds-to-minutes; motion is the only way to make that legible.

**Best exemplar: Material Design 3 — duration tiers + Emphasized bezier + spring physics.** Material publishes a numeric motion system: short (50–200ms) / medium (250–400ms) / long (450–600ms), Emphasized cubic-bezier `(0.05, 0.7, 0.1, 1.0)` for expressive motion, spring physics for direct manipulation. Source: research-group-E.md §Material.

**Worst anti-pattern: Apple Liquid Glass reactive specular highlights.** Beautiful in marketing, GPU-expensive and vestibular-triggering in long sessions. MiMo is for daily multi-hour use — this motion pattern fails the long-session test. Source: research-group-E.md §Apple HIG.

**MiMo principle (fixed rule):** Material's tier system (short/medium/long) + Emphasized bezier + springs for direct manipulation + Fluent's 4 transition patterns (Enter/Exit, Elevation, Top-level fade, Container transform). Reduce-motion toggle mandatory (collapses to crossfades). Never animate static content. The ExecutionTrace animates inline per stage — real motion, not decorative motion.

**MiMo decision + Reason:** Motion communicates *state change*, never decorates. The 6-stage pipeline stepper lights up sequentially with real runtime motion per stage. Hold-`Space` peek opens in 100ms with spring physics; release dismisses in 80ms. `⌘K` opens in < 80ms. Reason: motion is the only way to make a 30-second agent run legible; the wrong motion (Liquid Glass specular) makes it hostile.

**Adopt / Adapt / Reject:**
- Adopt: Material's duration tiers + Emphasized bezier + springs.
- Adopt: Fluent's 4 transition patterns for component-level motion.
- Adopt: Apple's "motion communicates state change, never decorates" principle.
- Reject: Apple's Liquid Glass reactive specular highlights — long-session-hostile.
- Reject: Arc's over-animated tab transitions — showy, not informative.

---

## 15. Design Systems

**Means:** the substrate that makes a product's visual language coherent and evolvable — tokens, components, elevation, type ramp, color roles, motion tiers. For an AI OS this is the engineering discipline that prevents the visual language from fragmenting across 8 modes.

**Best exemplar: All three systems converged** — token-first, role-based, 5–6 elevation levels, named type roles, semantic color tokens that auto-flip per theme. The convergence across Apple + Material + Fluent is itself the finding. Source: research-group-E.md cross-system synthesis.

**New angle: Microsoft Fluid Framework — atomic collaborative components as the substrate.** Fluid Framework 2.0's SharedTree provides distributed data structures (DDS) with atomic move operations and advanced merge semantics — collaborative data structures as the *system substrate*, not just visual components. Source: infoq.com Fluid Framework 2.0 Beta article + devblogs.microsoft.com.

**Worst anti-pattern: Fluent's enterprise chrome + per-product brand colors.** Fluent inherits Microsoft's enterprise visual baggage (heavy chrome, brand-per-product colors) that MiMo must reject. Source: research-group-E.md §Fluent.

**MiMo principle (fixed rule):** Token-first, role-based. Tokens defined by *role/intent* (`surface-message`, `text-primary`, `accent-brand`, `border-hairline`), never by raw value. 5 elevation levels by intent (base / hairline / container / floating / modal). 9 named type roles (Display, Title1/2/3, Headline, Body, Subhead, Caption1/2) that rescale. Single system-font stack. One user-pickable accent seed per Project.

**MiMo decision + reason:** The numeric backbone — 4px spacing scale (4/8/12/16/20/24/32/40/48), 9-role type ramp (Display 56/64 → Caption2 11/16), 5 elevation levels, Material motion tiers, role-based color tokens with paired on-* foregrounds, 44px tap target minimum, one variable-weight icon family. Reason: convergence across Apple + Material + Fluent is empirical evidence that this is the correct substrate; deviation in any of these has been paid for by every system that tried.

**Adopt / Adapt / Reject:**
- Adopt: Apple's semantic adaptive color approach.
- Adopt: Material's global→alias→component token architecture + surface-container ramp.
- Adopt: Fluent's prescriptive component-to-elevation mapping.
- Adapt: Fluid Framework's SharedTree → MiMo's EventBus + MemoryEngine as the *data substrate* (not visual, but architectural analog).
- Reject: Fluent's enterprise chrome and per-product brand colors.
- Reject: Material's wallpaper-derived Dynamic Color (user-pickable seed, not wallpaper-coupled).

---

## 16. Accessibility

**Means:** the discipline of making the product usable by people with diverse abilities — and the spillover benefit that accessibility features (large tap targets, reduce-motion, high-contrast, VoiceOver) make the product *better for everyone*, especially in long sessions.

**Best exemplar: Apple HIG — 44×44pt tap target, Dynamic Type, semantic colors auto-adapt, Reduce Motion first-class.** Apple treats accessibility as a trait environment the UI must respect, not a separate mode. Source: research-group-E.md §Apple HIG.

**Worst anti-pattern: Liquid Glass's adaptive contrast failures.** Liquid Glass looks great in marketing but its adaptive contrast can fail on unpredictable content (user code, arbitrary web) — the vibrancy-dependent contrast is not guaranteed. Source: research-group-E.md §Apple HIG "What MiMo should avoid."

**New angle: Zed's GPU requirement as exclusionary failure.** Zed requires a Vulkan-compatible GPU; users on machines without one get "awful performance" (zed-industries/zed discussion #17212). This is an *accessibility failure* through hardware gating — a high-performance editor that excludes low-end hardware users. Source: zed.dev + GitHub discussion.

**MiMo principle (fixed rule):** 44px minimum tap target (Apple's rule, even on desktop — helps trackpad/low-vision). Dynamic Type rescales the whole type system. Semantic colors auto-adapt to Increase Contrast. Reduce Motion is a first-class trait — collapses non-essential motion to crossfades. Paired `on-*` foregrounds guarantee WCAG AA contrast regardless of content behind. A fallback solid surface is required when content behind translucency is unpredictable.

**MiMo decision + reason:** Accessibility is a trait environment (Apple's model) — every component must declare its traits (label, hint, role) and respect Reduce Motion / Increase Contrast / Differentiate Without Color. Reason: long multi-hour sessions *are* an accessibility context — eye strain, RSI, vestibular triggers all apply; designing for accessibility is designing for sustained use.

**Adopt / Adapt / Reject:**
- Adopt: Apple's 44×44pt tap target (slightly more generous than Material's 48dp — better for trackpad/low-vision).
- Adopt: Dynamic Type (named styles, not px) — accessibility scaling "comes for free."
- Adopt: Reduce Motion as first-class trait.
- Reject: Zed's GPU-only rendering (exclusionary; MiMo must run on commodity hardware).
- Reject: Liquid Glass's vibrancy-dependent contrast (unpredictable content fails).

---

## 17. Performance Perception

**Means:** how fast the product *feels*, which is decoupled from how fast it *is*. Perceived performance is governed by: first paint, first token, first interaction, scroll fps, and the absence of jank. For an AI OS this is the difference between "this is my daily driver" and "I'll use it tomorrow."

**Best exemplar: Linear — local-cache-render + background sync.** Linear renders from local cache first, syncs in the background, never blocks the user on network. This is the #1 perceived-performance lesson across all 25 products studied. Source: research-group-D.md §Linear.

**Also excellent: Zed — GPU rendering (Vulkan), Rust, instant startup, near-instant file loading.** Zed's architectural bet on GPU rendering delivers 2× startup speed and 16× memory efficiency vs VS Code (per tech-insider.org comparison). Source: zed.dev + Medium article.

**New angle: Bolt.new's WebContainer — no cold start.** Bolt's runtime is in-browser, no cold start. Local-first execution beats cloud sandboxes for perceived latency. Source: research-group-C.md §Bolt.

**Worst anti-pattern: Continue — lazy-init 5–10s on first use + sidebar-disappears-for-years.** Continue's first-use lag and chronic instability destroyed perceived performance. Source: research-group-B.md §Continue.

**MiMo principle (fixed rule):** Local-first rendering from cache (Linear). Pre-warm all widgets so first-use is never lazy (Continue anti-pattern). First token < 1s on cached context. `⌘K` opens in < 80ms. Hold-`Space` peek in 100ms. 50fps minimum on 1000+ message conversations (virtualize aggressively). Local execution by default; cloud only as fallback.

**MiMo decision + reason:** Local-cache-render + background sync for conversation list, memory, recent events. EventBus emits "user edited X" events synchronously so the UI updates before network round-trip. Reason: Linear's local-first rendering is the single most-copied perceived-performance lesson of 2024–2025; MiMo cannot ship without it.

**Adopt / Adapt / Reject:**
- Adopt: Linear's local-cache-render + background sync (the #1 lesson).
- Adopt: Bolt's no-cold-start pattern (local runtime by default).
- Track: Zed's GPU rendering for v2 (today web tech is sufficient but Zed is the aspiration).
- Reject: Continue's lazy-init pattern (pre-warm everything).
- Reject: Codex Cloud's cloud-repo-cloning latency (stay local-first).

---

## 18. Explainability

**Means:** the user's ability to understand *why* the AI did what it did — not as a post-hoc rationalization, but as a real-time legibility of the reasoning process. For an AI OS that takes autonomous actions, explainability is the precondition for trust.

**Best exemplar: Gemini Deep Research — live thoughts while browsing + Perplexity in-line numbered citations + Cursor per-file diffs.** Three different explainability modes: (a) live thought-stream during execution, (b) cited sources in the output, (c) per-file diffs as the explanation of changes. Together they cover process, provenance, and impact. Sources: research-group-A.md §Gemini + §Perplexity + research-group-B.md §Cursor.

**New angle: DeepSeek-R1 — chain-of-thought exposed in the UI (Jan 2025).** DeepSeek-R1's release made the chain-of-thought *visible* in the chat UI — the user sees the model's reasoning steps, not just the answer. This is model-level explainability made into a UX feature. Source: Medium article + HN thread.

**Worst anti-pattern: Genspark — opaque credit system + no execution viz.** Genspark charges credits for tasks without showing what the agent did or why. Source: research-group-A.md §Genspark. Also v0's implicit "waiting for generation" — no explanation of what's happening.

**MiMo principle (fixed rule):** Three explainability layers, all mandatory: (a) ExecutionTrace renders inline with real runtime motion per stage (Gemini + Manus pattern); (b) research-mode answers default to inline numbered citations (Perplexity + Genspark pattern); (c) code artifacts show per-hunk diffs as the explanation of changes (Cursor pattern). Toggleable reasoning per-prompt (GLM-4.7 pattern) lets the user choose fast/deep on each turn.

**MiMo decision + reason:** Every AI action produces a visible ExecutionTrace; every research answer produces citations; every artifact edit produces a diff. The user can always answer "why did it do that?" within 1 click. Reason: trust requires legibility; DeepSeek-R1's exposed chain-of-thought proves users *want* to see reasoning, not just answers.

**Adopt / Adapt / Reject:**
- Adopt: Gemini's live thoughts streaming (ExecutionTrace).
- Adopt: Perplexity's inline numbered citations (research mode default).
- Adopt: Cursor's per-file diffs (artifact edit explanation).
- Adapt: DeepSeek-R1's exposed chain-of-thought → MiMo's toggleable reasoning per-prompt (GLM-4.7 already proved the toggle pattern).
- Reject: Genspark's opaque credit system + no execution viz.
- Reject: v0's implicit "waiting for generation."

---

## 19. Trust Building

**Means:** the cumulative process by which the user comes to rely on the system — through transparency (I can see what it knows), control (I can change what it does), accountability (it admits when it's wrong), and stability (it doesn't break what works). For an AI OS, trust is the *substrate* of long sessions — without it, every action feels like a gamble.

**Best exemplar: Cursor (per-file accept/reject = control) + ChatGPT memory-with-delete = transparency + Codex named sandbox modes = accountability.** Three different trust mechanisms: control through approval granularity, transparency through visible memory + delete, accountability through named scopes. Sources: research-group-B.md §Cursor + research-group-A.md §ChatGPT + research-group-B.md §Codex.

**New angle: Anytype — E2E encryption + local-first = trust through architecture.** Anytype's trust model is *architectural* — data is local-first, end-to-end encrypted, syncs P2P via the AnySync protocol (CRDT-based). The user doesn't have to *trust the company* because the company structurally *cannot read the data*. Source: anytype.io + HN Show HN thread.

**New angle: Granola — no bots join calls = trust through restraint.** Granola's key trust signal is what it *doesn't* do: it never sends a bot to your meeting, just listens to your local audio. The restraint itself builds trust. Source: granola.ai + overtheanthill.substack.com.

**Worst anti-pattern: ChatGPT sunsetting Canvas in GPT-5.** The market leader deprecated a working artifact surface, eroding user trust that any feature they invest in will persist. Source: research-group-A.md §ChatGPT. Also Genspark's failed-task-still-charges — broken accountability.

**MiMo principle (fixed rule):** Trust is built through (a) architectural local-first + E2E encryption (Anytype pattern — the company structurally cannot read user data), (b) every memory item shows source + timestamp + delete button (solves ChatGPT's opacity), (c) never deprecate working features (ChatGPT Canvas anti-pattern — keep parallel versions live during transitions), (d) per-task-type trust with "Always allow this kind" (Manus anti-pattern avoidance), (e) failed tasks never charge anything (Genspark anti-pattern — single-user local-first, no counters).

**MiMo decision + reason:** Local-first storage; every AI action has a visible ExecutionTrace; every memory item has source/timestamp/delete; per-task-type trust with audit log; failed tasks have zero cost. Reason: trust is the substrate of daily multi-hour use; without architectural trust (Anytype) + transparency (ChatGPT-with-delete) + control (Cursor per-hunk) + stability (no-deprecating-working-features) + restraint (Granola no-bots), the user cannot sustain the relationship.

**Adopt / Adapt / Reject:**
- Adopt: Anytype's architectural local-first + E2E encryption.
- Adopt: Granola's restraint pattern (do less, visibly).
- Adopt: Cursor's per-hunk accept/reject (control).
- Adopt: ChatGPT's memory-with-delete (transparency) — MiMo adds source + timestamp to every item.
- Reject: ChatGPT's sunsetting-Canvas pattern (never deprecate working features mid-redesign).
- Reject: Genspark's failed-task-still-charges (no counters at all).

---

## 20. Developer Experience

**Means:** the experience of *building with and on* the system — for MiMo this means both (a) how the developer-user operates the system (debugging, inspecting, profiling AI runs) and (b) how a developer would extend the system (plugins, tools, agents). For an AI OS owned by a developer, this is non-negotiable.

**Best exemplar: Codex — terminal-native chat + AGENTS.md grounding + named sandbox modes.** Codex's terminal-native interface means the developer never leaves their environment. `AGENTS.md` is read at workflow start as the project grounding file. Named sandbox modes (read-only / workspace-write / danger) + named approval policies (untrusted / on-request / never) give precise control. Source: research-group-B.md §Codex.

**Also excellent: Cursor (`.cursorrules` + Composer) + Continue (Plan mode as sibling, 100% local, transparent prompts).** Cursor's `.cursorrules` and Continue's Plan-mode-as-sibling are both DX wins. Source: research-group-B.md.

**New angle: Zed — GPU rendering as developer pleasure.** Zed's GPU rendering isn't just performance — it's a DX feature. The editor *feels* good to type in, which compounds across a developer's career. Source: zed.dev + Medium article.

**New angle: Fluid Framework — distributed data structures as the developer substrate.** Fluid Framework 2.0's SharedTree gives developers building collaborative apps a DDS substrate with atomic move operations — the architectural analog for MiMo's EventBus + MemoryEngine. Source: infoq.com Fluid Framework 2.0 Beta article.

**Worst anti-pattern: Continue sidebar-disappears-for-years + Copilot Workspace no build feedback in AI loop.** Continue's chronic instability (sidebar vanishes across updates, issue #1312 open May 2024 → May 2026) is a DX failure because developers cannot trust the tool to be there. Copilot Workspace's fatal flaw was no build feedback in the AI loop. Sources: research-group-B.md §Continue + §Copilot Workspace.

**MiMo principle (fixed rule):** DeveloperPanel is always one shortcut away, never hidden behind a beta gate or stripped in transitions. `MIMO.md` (generalization of AGENTS.md + .cursorrules + CLAUDE.md) is read at workflow start. Per-step model choice (cheap/fast for tests, deep for research) and per-step scope (read-only / src/ / docs/) are exposed. The EventBus stream is visible in the DeveloperPanel. A build/validate step is mandatory in the AI loop — no ship-without-build.

**MiMo decision + reason:** `devMode` toggle reveals a conditional rail icon; clicking opens a floating DeveloperPanel with 5 tabs (Overview / Memory / Agents / Tools / Events) consuming real Core data. MIMO.md generalizes the AGENTS.md pattern. Per-step model + scope (Cursor primitive). Validator gates writes (Copilot Workspace lesson). Reason: Codex + Cursor + Claude Code converged on AGENTS.md for a reason; MiMo must generalize; the DeveloperPanel must never be hidden because hiding it broke Continue and v0.

**Adopt / Adapt / Reject:**
- Adopt: Codex's terminal-native + AGENTS.md → MiMo's `MIMO.md` grounding file.
- Adopt: Codex's named sandbox modes (read-only / workspace-write / danger).
- Adopt: Cursor's per-step model + scope routing.
- Adapt: Fluid Framework's SharedTree → MiMo's EventBus + MemoryEngine as the developer-visible substrate.
- Reject: Continue's sidebar-disappears-for-years (stability is non-negotiable).
- Reject: Copilot Workspace's no-build-in-loop pattern (Validator mandatory).

---

## 21. Power User Experience

**Means:** how the product serves the user who has mastered it — the velocity ceiling, the escape valves, the customizability without sprawl. For an AI OS owned by one developer-operator-user, the power-user experience IS the experience; there is no casual tier to fall back to.

**Best exemplar: Helix (selection-first modal editing, orthogonal + consistent) + Raycast (command-first velocity, one palette) + Linear (single-key daily-5 + hold-`Space` peek).** Three different power-user models: Helix's modal selection-first, Raycast's command-first, Linear's keyboard-peek. Each achieves velocity through a single coherent model applied orthogonally. Sources: helix-editor.com + research-group-D.md.

**New angle: Anytype — typed-object + relation graph for power users.** Anytype's power-user model is *semantic* — every object has a Type, every link is a typed Relation, every Space is a graph. Power users construct their own ontology. Source: anytype.io + volodymyrpavlyshyn Medium.

**Worst anti-pattern: Linear's fixed workflow states frustrate power users.** Linear's opinionated workflow (Todo → In Progress → Done) is great for the median user but frustrates power users who want custom states. Linear's solution (labels, custom views) is the right escape valve — keep modes fixed but expose escape hatches. Source: research-group-D.md §Linear.

**Also bad: VS Code JSON settings sprawl.** VS Code's power-user surface is `settings.json` — direct manipulation is lost, discoverability is zero, the user must memorize keys. Source: research-group-D.md §VS Code.

**MiMo principle (fixed rule):** Keyboard is home (≤ 2 modifiers per primary action). Modes are fixed (8 modes: chat/research/code/writing/run/image/automation/data) but escape valves exist (labels, custom views, per-project accent + model + sandbox). `devMode` toggle reveals the full DeveloperPanel. Per-step model choice (cheap vs deep) and per-step scope (read-only / src/ / docs/) are exposed. The conversation can be forked at any turn (single branch primitive). Power is *compositional* (combine the 4 primitives), not *configurational* (memorize JSON keys).

**MiMo decision + reason:** Power = composition of the 4 primitives (conversation-spine + canvas-per-mode + living-workflow + OS-grade keyboard). The power user composes Hold-`Space` peek + `⌘K` prefix grammar + `⌘⇧Tab` Quick AI + per-step model/scope + conversation fork + devMode toggle into a personal workflow. No JSON config; direct manipulation only. Reason: Helix's selection-first discipline proves that one consistent model applied orthogonally beats configurational sprawl; VS Code's JSON is the cautionary tale.

**Adopt / Adapt / Reject:**
- Adopt: Helix's "one model applied orthogonally" discipline.
- Adopt: Linear's fixed-modes + escape-valves pattern (labels, custom views).
- Adopt: Raycast's command-first velocity (one palette, prefix grammar).
- Adapt: Anytype's typed-object graph → MiMo's per-project Knowledge entities (typed: skill/goal/fact/preference/event).
- Reject: VS Code's JSON settings sprawl (direct manipulation only).
- Reject: Linear's per-seat pricing / tier gating (N/A for single-user, but don't recreate gated mental models).

---

## Cross-cutting insights

**1. The "one consistent model applied orthogonally" principle is the deepest finding.** Helix's selection-first discipline (every command: noun → verb), Linear's keyboard discipline (one palette, ≤ 8 rail icons), Raycast's one-surface discipline, Cursor's editor-is-the-canvas discipline, Apple's three-principles discipline — every product rated premium 5/5 has *one* model applied *orthogonally*. Every product rated cognitive-load 4–5/5 has *multiple overlapping models* (Notion's 8 AI surfaces, Lovable's 7 containers, v0's 8 containers, Copilot Workspace's over-structured pipeline). MiMo's spec already commits to this (one container = Project, one branch = Fork, one AI surface = conversation) — but the insight is that this principle *generalizes across all 21 dimensions*: one motion tier system, one elevation system, one keyboard grammar, one explainability layer. Anywhere MiMo is tempted to introduce a *second* model (a second AI surface, a second branch primitive, a second elevation system, a second motion tier), the answer is no.

**2. Trust is *architectural*, not UX.** Anytype's E2E encryption, Granola's no-bots-join-calls, Bolt's local WebContainer, Linear's local-cache-render — these products build trust through *what they structurally cannot do*, not through trust-building UI features. ChatGPT sunsetting Canvas and Genspark's failed-task-still-charges broke trust through *what they did*, despite having trust-building features (memory page, credit display). The implication for MiMo: trust must be *architectural* (local-first, E2E encryption, no counters, no deprecations) before it is *interactional* (per-hunk accept/reject, source/timestamp/delete on memory). The interactional trust features are necessary but insufficient — they cannot rescue a product whose architecture betrays the user.

**3. The "alive" feeling requires real runtime motion, never spinners.** Manus's live browser + Bolt's HMR + Gemini's live thoughts + Cursor's per-file diffs + Lovable's streaming action cards — all create aliveness through *real motion in the agent's actual runtime*. v0's static "waiting for generation," GLM's no execution viz, ChatGPT's minimal spinner — all feel dead. The principle generalizes: an AI OS is alive only when the user can *see the agent doing something* — browsing, reading, writing, calling tools, producing diffs. MiMo's ExecutionTrace must show actual runtime output (real terminal, real browser, real file diffs), not just stage labels lighting up. This is the single biggest 2025–2026 differentiator across all 25+ products studied.

**4. Cognitive overload is the silent killer — and it's always caused by "feature accretion without model reconciliation."** Notion (8 AI surfaces), Lovable (7 containers), v0 (8 containers), Codex (9 mode×policy combinations), Genspark (9+ named agents + opaque credits), Continue (Models vs Providers), ChatGPT (5 memory states), Perplexity (4-axis choice) — every cognitive-overload exemplar shares the same root cause: the team added features without reconciling them against the product's single mental model. The defense is not "design better" — it is *enforce a single model at the architecture level*. MiMo's spec already does this (one container, one branch, one AI surface) but the insight is that *every dimension needs its own single-model discipline*: one motion tier system, one elevation system, one keyboard grammar, one explainability layer. The discipline must be enforced at the architecture level, not at the design level.

**5. The "conversation-spine + canvas-per-mode" thesis is the unique combination no product has shipped.** Cursor is editor-first + chat-sidebar (chat is not the spine). ChatGPT/Claude/GLM are chat-first + artifact-decoration (artifact is not the canvas, just a card). Manus is agent-first + computer-pane (computer is the canvas but conversation is parallel, not spine). Notion is block-first (no spine). v0/Lovable are workspace-first (no spine). Linear/Raycast are command-first (no canvas). *No product studied combines conversation-as-permanent-spine + canvas-as-adaptive-per-mode*. MiMo's spec is the unique recombination — and the depth-analysis confirms it solves a real gap: every product that tried one-or-the-other lost either the conversational flow (Cursor, Manus) or the working surface (ChatGPT, Claude). MiMo's bet is that combining both is what makes it an OS rather than a tool.

---

## New products studied

- **Heptabase** — whiteboard + cards as the spatial substrate; AI chat uses the whiteboard as context. *Takeaway:* spatial disclosure is a real pattern; AI-within-user's-structure is a distinct collaboration model. (Adopt for artifact hover thumbnails; reject as primary surface — MiMo's spine is conversation, not whiteboard.)
- **Anytype** — local-first P2P, CRDT-based AnySync protocol, E2E encrypted, typed-object + relation graph. *Takeaway:* trust is architectural (E2E + local-first); typed-object graphs are intellectually appealing but too steep for MiMo's flat Project model. (Adopt local-first + E2E as architectural trust; reject typed-object graph.)
- **Microsoft Fluid Framework 2.0** — SharedTree distributed data structures with atomic move operations and advanced merge semantics. *Takeaway:* the architectural analog for MiMo's EventBus + MemoryEngine is a DDS substrate; collaborative data structures as the *system substrate* is the right mental model for MiMo's data layer. (Adopt as architectural inspiration for EventBus + MemoryEngine; not a UI feature.)
- **Granola** — ambient AI meeting notes; no bot joins the call, just listens to local audio. *Takeaway:* the *passive agent* pattern (no agent UI, just background work) maps to MiMo's daemon mode (scheduled runs without prompting). Restraint builds trust. (Adopt the ambient-agent pattern for MiMo's daemon mode; adopt the restraint principle.)
- **Helix** — selection-first modal editing (Kakoune-derived); noun → verb instead of verb → noun; orthogonal + consistent. *Takeaway:* one consistent model applied orthogonally beats many overlapping models. (Adopt the discipline; adapt selection-first to MiMo's `⌘⇧Tab` Quick AI: select text → AI verb.)
- **Reflect** — backlinks-based second brain; suggested-backlinks one-click; AI for titles/summaries. *Takeaway:* accumulating value (the longer you use it, the more valuable the graph) is the long-session pattern. (Adapt backlinks-as-accumulating-value → MiMo's Knowledge entities derived from memory.)
- **Zed** — Rust + Vulkan GPU rendering, real-time multiplayer, near-instant startup. *Takeaway:* GPU rendering eliminates long-session jank; but Zed's GPU requirement is exclusionary. (Track for v2; today web tech is sufficient for ≤ 50fps on 1000+ messages; reject the GPU-only exclusion.)
- **DeepSeek-R1 / V3.1** — open-weight reasoning model with chain-of-thought exposed in the UI (Jan 2025); V3.1 (Aug 2025) added multi-step reasoning improvements. *Takeaway:* model-level explainability (visible chain-of-thought) is a UX feature users want. (Adapt exposed chain-of-thought → MiMo's toggleable reasoning per-prompt, GLM-4.7 pattern.)

---

**File written:** `/home/z/my-project/research/research-group-J.md`
**Method:** Re-read cross-product synthesis of `research-group-{A..E}.md` + `MiMo_Design_Specification.md` Parts 1–6; ran 8 `web_search` invocations on new products (page_reader rate-limited; snippets rich enough for architectural/interactional analysis). 7 new products + 1 model release studied in addition to the 25+3 from prior research.
**No code changes; pure research.**
