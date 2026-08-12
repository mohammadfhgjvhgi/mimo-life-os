# Research Group B — Real-World UX of 7 AI Coding Tools (2024-2025)

**Task ID:** R-B
**Researcher:** Senior UX/Product Researcher sub-agent
**Purpose:** Empirical (web-verified) UX breakdown of seven AI coding tools, to inform the redesign of **MiMo** (a single-user, conversation-first AI Operating System, daily multi-hour use, owner = developer + operator + user).
**Method:** `web_search` → curated `page_reader` deep-reads (1-3 articles per product) → synthesis. All claims below are grounded in the cited URLs. Where a product has evolved quickly (Cursor 2→3, Codex CLI v0.121, Replit Agent 4, OpenHands Agent Canvas), the most recent (2025-2026) source is used.

---

## 1. Cursor (cursor.com)

### Current UX (2024-2025) — verified via
- https://www.digitalapplied.com/blog/cursor-3-deep-dive-agents-composer-review-2026
- https://www.infoq.com/news/2026/04/cursor-3-agent-first-interface
- https://www.codecademy.com/article/cursor-2-0-new-ai-model-explained
- https://www.deployhq.com/guides/cursor
- https://forum.cursor.com/t/composer-and-agent-mode/51443
- https://www.reddit.com/r/cursor/comments/1ojuy0c/tried_composer_agent_on_a_12_hour_flight_heres

Cursor is a **VS Code fork** that re-renders the editor surface around AI ("editor-grade UX, not chat-grade"). Three working surfaces shipped across v2 → v3 (May 2026):

1. **Agents panel** — a sidebar listing every active agent with status (idle / running / awaiting approval), file/task scope, and per-agent model. Spawning a new agent is two clicks; it inherits workspace context but maintains its own conversation, file working set, and tool permissions. Up to 8 agents in parallel (Cursor 2.0 baseline). **Cloud Agents** extend the same primitive to remote compute.
2. **Composer (Ctrl/Cmd+I)** — multi-file editing surface. v3's pivotal change: edits **stage as a single reviewable diff with per-file accept/reject before anything writes to disk**. Default is now "preview, then approve" (legacy "auto-apply" is still selectable but discouraged). Composer also drives the **design-driven workflow** — drop a Figma/screenshot/sketch, scaffold component code, iterate prompt-by-prompt against rendered output.
3. **Inline Cmd-K** — quick, scoped, single-spot edits inside the file you're editing.

Model routing is **per-surface and per-agent** (e.g. Composer → Claude Sonnet, test agent → GPT-5.5 fast, research agent → Gemini long-context). MCP server scoping is **per-agent**, not per-workspace.

### What works
- **Preview-then-approve as the new Composer default** — "stages all edits as a single diff with per-file accept/reject; nothing writes until you approve." The reviewer calls this the single biggest reduction in AI-induced regression risk Cursor has shipped, and notes "the cognitive load drops by an order of magnitude on anything larger than three files" compared to the old write-then-undo model.
- **Parallel agents panel with explicit per-agent scope** — research (read-only, Gemini), build (Composer-backed, Sonnet 4.6), test (test-dir scoped, GPT-5.5 fast), review (read-only, comments only). This 4-archetype split "changes the unit of work from one message to one workspace of parallel collaborators."
- **Per-agent model routing** — explicit policy (Sonnet for build, GPT-5.5 fast for tests, Gemini for research) cuts token spend without quality loss on critical paths.
- **Per-agent MCP scoping** — build agent gets filesystem MCP, planning agent gets Linear+Notion, review agent gets read-only GitHub. Auditable.
- **Design-driven Composer loop** — drops the screenshot → Figma-plugin → re-prompt cycle into a single in-Composer iteration.
- **Keyboard workflow** — Cmd+I (Composer inline), Cmd+L (chat), Cmd+K (command palette). The forum confirms: "Composer (Ctrl+I) is the mode that allows Cursor to directly edit your code. Agent mode, where Cursor will figure out what files to edit."

### What does not work
- **Multi-agent token burn** — "Teams discover the Agents panel and immediately try to run five agents in parallel. Token burn spikes, context gets confused between agents, the human can't keep up with the approval queue." Mitigation requires a hard ceiling (no more than two writing agents at once) — but that's a discipline the product doesn't enforce by default.
- **Design-driven Composer used as a page generator** — "Teams that point it at a full page get UI that ships looking AI-generated — token-inconsistent, semantically thin, missing animation polish." The tool works at component scale, fails at page scale.
- **Legacy auto-apply mode still selectable** — teams that don't switch to preview-then-approve "lose track of multi-file edits, miss regressions, and end up reverting work in batches." A footgun that ships as a setting.
- **Cognitive overhead of routing decisions** — every team must invent its own routing policy; the product surfaces per-agent context usage but offers no default policy.

### What is unique
- **Editor-grade multi-agent orchestration** — no other product lets you run four agents (research / build / test / review) in parallel, each with its own model, scope, and approval policy, all inside a familiar VS Code surface.
- **Composer's per-file accept/reject gating** as the default write path (Windsurf and others don't enforce this as a default).
- **Design-driven Composer with reference-image iteration** (Figma → component scaffolding in two minutes for the first 70%).

### What MiMo should learn
- **"Preview, then approve" should be the default write path for any non-trivial multi-step plan**, not an opt-in. The reversal (preview first, write only after accept) is a 10× cognitive-load reducer on >3-file changes.
- **Per-agent model routing is a primitive, not a setting.** MiMo's Core already has a Kernel + agentRegistry + modelRegistry; exposing per-step model choice (cheap/fast for tests, deep for research) is the right primitive.
- **Agents panel showing live status (idle / running / awaiting approval) + per-agent scope + per-agent model.** MiMo's AgentDock is already a horizontal pipeline stepper; adding a "scope badge" (read-only / src/ / docs/) per agent would match Cursor's strongest idea.
- **Per-agent context usage breakdown.** MiMo's DeveloperPanel already surfaces kernel/memory/agent counts; per-step token usage would make cost visible without leaking runtime when devMode is off.
- **Editor-native, not chat-native** — Cursor's deepest insight. The chat is a panel, not the center; the editor surface is the center.

### What MiMo should avoid
- **No hard ceilings on parallel agents.** MiMo's spec calls for a single user; running 5 parallel agents will burn a personal token budget. Cap at 2 writing agents by default, with read-only research/review agents allowed unlimited.
- **Auto-apply footgun.** MiMo should never ship a "just write everything" mode without a giant confirmation.
- **Page-scale design generation.** Don't promise "describe the page, get the page"; scope generation at component level.
- **Multi-surface UX quirks.** Codex has 4 surfaces with "four slightly different UX quirks"; MiMo is one surface — keep it that way.

### Premium interaction (specific)
- Spawning a new agent in **two clicks**, with the new agent inheriting workspace context but maintaining its own conversation, file working set, and tool permissions. The feeling of "another collaborator just joined, with a fresh mind."
- **Per-file accept/reject on a staged Composer diff** — each file gets its own green/red review block before anything writes.
- **Keyboard switching between agents as fluidly as between editor tabs.**

### Slow interaction (specific)
- **4 parallel long-context research/review agents** on Sonnet 4.6 burn token budget fast; the team has to add a routing policy in week one to control spend.
- **Design-driven Composer for full pages** produces "token-inconsistent, semantically thin" output that needs a long human polish pass.

### Cognitive overload (specific)
- **First-week routing-policy design.** Every team must invent which agent gets which model. The product surfaces usage but offers no default policy. "Teams that treat these as workspace-level governance decisions get a meaningfully smoother rollout than teams that let each developer figure it out individually."
- **Approval-queue pile-up** when 5 agents run at once — "the human can't keep up with the approval queue."
- **Composer with auto-apply on multi-file edits** — "you lose track of which writes were intentional and which slipped in."

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** right sidebar (chat) vs. Composer modal (multi-file) vs. inline Cmd-K. Three distinct conversation surfaces, each tuned to a different interaction scale.
- **Agent viz:** Agents panel sidebar lists every active agent with status pill (idle/running/awaiting approval), file/task scope, model badge. Each agent is switchable like a tab.
- **Execution viz:** Composer stages a single reviewable diff with per-file accept/reject. Per-agent context usage is surfaced (changelog: "Context Usage Breakdown").
- **Artifact / code diff:** per-file accept/reject blocks, integrable with feature-branch auto-creation (branch name templated from prompt, behind a feature flag).
- **Workspace:** VS Code clone — sidebar files, tabs, split editor. Familiarity is a feature.
- **Keyboard:** Cmd+I (Composer inline edit), Cmd+L (chat sidebar), Cmd+K (command palette).
- **Dev experience:** the *editor surface itself* is the AI's canvas; not a chat bolted on. "Cursor's advantage is deeper editor-native agent orchestration."
- **Long-session:** the four-archetype split (research/build/test/review) is the unit that keeps long sessions sustainable — each agent has bounded scope, the human ferries context between them.

---

## 2. Windsurf (Codeium)

### Current UX (2024-2025) — verified via
- https://aiflowreview.com/windsurf-review-2025
- https://damiandabrowski.medium.com/day-77-of-100-days-agentic-engineer-challenge-windsurf-cascade-813878ab2d32
- https://www.augmentcode.com/tools/antigravity-vs-windsurf-comparison
- https://www.autonomous.ai/ourblog/windsurf-review
- https://blog.stablediscussion.com/p/my-initial-review-of-windsurf

Windsurf (Codeium's IDE) centers on **Cascade** — a persistent agentic panel that opens on the **right side** via `Cmd/Ctrl+L` or the Cascade icon. Cascade is described as a "flow of changes over code" — it tracks the project across files, understands dependencies, executes multi-step plans, runs terminal commands, does web search, accepts image uploads, and remembers context via an auto-generated memory system plus user-defined rules.

Key surfaces:
- **Chat mode** (conversational, no writes)
- **Write mode** (Cascade edits code)
- **Cascade flow** — the visualization of how an agentic change ripples across files
- **Terminal command suggestion integration** — Cascade suggests relevant terminal commands inline based on the work context
- **Web search + image upload** inside Cascade
- **Memory system** — auto-generates memories of useful contexts; user-defined rules to scope assistance
- Multi-file editing with cross-file reference awareness ("change a variable name → Cascade offers to rename other instances")

### What works
- **Right-side panel placement** — Cascade "appears on the right side of the editor, making it easily accessible without disrupting my coding flow." Lends itself to long sessions without covering the editor.
- **Multi-file contextual awareness** — "Cascade understands the relationships between different parts of the codebase. I can make coherent edits across multiple files without the usual headaches of manual tracking."
- **Real-time awareness of user actions** — "if I change a variable name, Cascade automatically detects this and offers to rename other instances, maintaining consistency throughout the codebase." Feels "like a partnership with the AI."
- **Integrated terminal command suggestions** — context-aware suggestions reduce time spent searching for the right command.
- **Memory + rules** — auto-generated memories + user-defined rules tailor the AI to the project.
- **Cleaner UI than Cursor** — multiple reviewers describe it as "Apple-like," "calmer, less cluttered," "more purposeful."
- **Project-wide code context: 9/10**, **IDE integration and UI: 8.5/10** (hands-on review).

### What does not work
- **Cascade agent learning curve** — "new users may find it confusing at first. You'll need a few days before you trust it for large changes or team-wide actions."
- **Hallucinations on large refactors** — "Like most AI helpers, Windsurf can drift off track especially when you ask for sweeping changes. It sometimes predicts relationships that aren't real."
- **Credits run out fast** — "The Flow Action credits ran out very quickly, and the Cascade Base uses the Llama model… I wasn't sure how to manage docs and memory, so that might be why I ran out of premium credits so fast."
- **Unpolished accessibility** — high-contrast mode is editor-only, not workspace-wide; keyboard nav for power users lacks tailoring.
- **Struggles on convoluted legacy code** — "I hit bumps with its Cascade agent on convoluted legacy code."

### What is unique
- **Cascade as a *flow* visualization** — Windsurf explicitly brands the agentic change as a "cascade" of edits rippling across files; the UI shows the flow of changes, not just a final diff.
- **Real-time awareness of in-progress edits** — the agent watches you type/rename and proactively offers consistency fixes (rename propagation, dependency updates).
- **Integrated terminal command suggestions** based on context (no other product does this as a first-class interaction).
- **Auto-generated memory system** for project context (vs. Cursor's per-agent scoping, vs. Copilot Workspace's lack of memory).
- **Chat ↔ Write mode toggle** — explicit separation of "discuss" vs. "act," a clarity primitive other tools blur.

### What MiMo should learn
- **Right-side panel placement for the agent.** MiMo's ContextSidebar is already right-side; Cascade confirms that's the right place for the agent (not left rail, not center modal).
- **Real-time awareness of user actions** is the missing primitive. MiMo's Core could emit "user edited X" events; the WriterAgent could watch and proactively offer consistency fixes. (MiMo's EventBus already supports this pattern.)
- **Memory + rules as a first-class system** — MiMo already has MemoryEngine; Windsurf's auto-generated memories (no manual entry) is the right pattern.
- **Chat ↔ Write mode toggle** — MiMo has 8 modes; making "discuss vs. act" an explicit, top-level toggle (like ChatGPT's "Ask vs. Write" but in the IDE context) is clearer than the current implicit mode.
- **Cascade flow visualization** — show the chain "edit A → causes edit B → causes test C to update." MiMo's ExecutionTrace is currently linear pipeline; extending it to show *file-level ripple effects* would be distinctive.
- **Integrated terminal command suggestions** based on conversation context.

### What MiMo should avoid
- **Credits running out mid-flow.** A single-user OS shouldn't meter usage mid-task; if budget is hit, queue rather than kill.
- **Auto-generated memory quality** — Windsurf's auto-memory can pile up stale entries. MiMo's MemoryEngine already has `forget`; use it.
- **Cascade learning curve** — make the flow visible early (don't hide it under dev mode); users need to see the agent's reasoning trace to build trust.

### Premium interaction (specific)
- **Cascade detecting a variable rename in real time and offering to propagate across files** — the AI as a partner watching your hands.
- **Terminal command suggestions inline** based on the work in progress — no context switch to a separate terminal lookup.
- **Switching chat↔write mode** with a single toggle, keeping the same context.

### Slow interaction (specific)
- **Cascade on tangled legacy code** — the agent loops and re-attempts.
- **Credit exhaustion mid-cascade** — kills the flow mid-task and forces a downgrade to Llama/Base.
- **First-run trust-building** — "a few days before you trust it for large changes."

### Cognitive overload (specific)
- **The Cascade flow itself** — when a single change ripples across many files, the visualization grows quickly; new users get confused before they trust it.
- **Memory management** — auto-generated memories can grow unbounded; users don't know which are stale.
- **Mode-switching between chat and write** without losing context — handled OK but takes practice.

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** right-side Cascade panel (toggleable chat vs. write modes).
- **Agent viz:** the Cascade flow — a chain of dependent edits shown as a flow diagram.
- **Execution viz:** terminal command suggestions inline; web search results surfaced in Cascade; image uploads accepted.
- **Artifact / code diff:** applied directly to files (no per-file accept gate by default — unlike Cursor's preview-then-approve).
- **Workspace:** VS Code fork, plugin-compatible with VS Code and JetBrains.
- **Keyboard:** Cmd/Ctrl+L opens Cascade.
- **Dev experience:** "calmer, less cluttered" than Cursor; project-wide awareness is the strongest card.
- **Long-session:** memory + rules let the agent stay tailored across hours; credit exhaustion is the long-session killer.

---

## 3. GitHub Copilot Workspace

### Current UX (2024-2025) — verified via
- https://github.blog/news-insights/product-news/github-copilot-workspace
- https://dsyme.net/2025/01/25/copilot-workspace-and-the-birth-of-task-oriented-programming
- https://githubnext.com/projects/copilot-workspace
- https://github.com/githubnext/copilot-workspace-user-manual/blob/main/known-issues.md
- https://news.ycombinator.com/item?id=40200081
- https://matduggan.com/reviewing-github-copilot-workspaces

**Status:** Sunset May 30, 2025. Don Syme (the original designer) wrote a candid retrospective in January 2025. The ideas lived on in VS Code Agent Mode, GitHub Spark, and Copilot Coding Agent.

Copilot Workspace was a **web-based** task-centric dev environment with a fixed pipeline: **Task → Specification → Plan → Code**. Every step was editable. It started from a GitHub Issue (or repo), used agentic exploration (sparse-cloning a slice of the repo, no indexing required), aimed to deliver first spec/plan in <30s, and ran code in an ephemeral GitHub Codespace. Mobile-compatible.

### What works
- **Task → Spec → Plan → Code pathway as the explicit mental model.** Don Syme calls it "the world's first implementation of human-guided, task-oriented software development."
- **Editable artifacts at every stage** — plan, spec, and code all editable before proceeding. "You retain all of the autonomy, while Copilot Workspace lifts your cognitive strain."
- **Agentic exploration of enormous repos without indexing** — sparse-clones a slice, relies on high-powered models to interpret what they see. "Much superior" in evals at the time.
- **Sub-30-second time to first spec/plan** — a deliberate product target that forced engineering trade-offs.
- **Mobile-compatible** — "designed to be used from any device."
- **Sharable workspace via link** — teammates can view and try iterations.

### What does not work (per the original designer's own retrospective)
- **No solid code-validation story.** Web-based editor → server can't build/test → relied on ephemeral Codespace → "relatively slow to start (unless prebuilds were configured), and not solid enough to always assume it was there." → "we never integrated the build feedback into the core AI logic for spec, plan and code." The crucial build/repair loops were never wired in. The pipeline ended at "Code" with no real AI iteration.
- **Did not embrace chat as both the output channel and the guidance channel.** "We were too reluctant to embrace chat-to-code… modern vibe coding systems use much simpler chat-log UX that feels less structured and less laboured, making more efficient use of the developer's concentration while keeping them 'in the flow'."
- **Over-emphasis on GitHub Issues as the task source.** "Issues are often low-quality task specifications, requiring some elaboration and negotiation."
- **External review consensus (Hacker News, Matt Duggan):** "failed to complete a simple task, performing worse than expected at every step. It didn't follow conventions… not unlike sending a requirements document to a very Junior developer that sometimes surprises you."
- **Slow first experience** — even with the 30s target, agentic exploration + sparse-clone latency was real.

### What is unique
- **The Task → Spec → Plan → Code pathway as the explicit, named product spine** (Windsurf Cascade, Cursor Composer, Replit Agent 4 all incorporated pieces, but Copilot Workspace invented it).
- **Starting from a GitHub Issue** as the task origin (no other tool makes this the default entry point).
- **Sparse-cloning a slice of a repo without indexing** for agentic exploration of massive codebases.
- **Editable plan as a first-class artifact** (Cursor's Composer diff is at the code level; Copilot Workspace's editable plan is at the spec/plan level above the code).
- **Mobile-compatible** for a full dev environment (rare; most AI IDEs are desktop-only).

### What MiMo should learn
- **The Task → Spec → Plan → Code pathway is the right spine.** MiMo's Core already implements reason → plan → execute → validate; making this *visible and editable at every stage* (not just the final answer) is Copilot Workspace's strongest idea. MiMo's ExecutionTrace shows the pipeline live; extending it to let the user **edit the plan mid-flight** is the lesson.
- **Agentic exploration without indexing** for enormous context — relevant when MiMo grows to handle large codebases/personal knowledge.
- **Sharable workspace link** for collaboration (less relevant to single-user MiMo, but the link-as-snapshot pattern is useful for "share this conversation").
- **Editable intermediate artifacts** (spec, plan) — MiMo should expose these as first-class objects, not as transient pipeline output.

### What MiMo should avoid
- **Web-only without solid local execution.** The Codespace dependency killed the build/repair loop. MiMo runs locally and already executes; keep build feedback in the core AI loop (the Validator is the right primitive; ensure it has access to real test/build outputs, not just text validation).
- **Reluctance to embrace chat-to-code.** Don Syme's biggest regret. MiMo is conversation-first by design; it must not avoid surfacing artifacts (spec, plan, code) inside the conversation. The chat IS the place to show spec and plan, not a separate panel.
- **Over-structured, laboured UX.** "Modern vibe coding systems use much simpler chat-log UX that feels less structured and less laboured." MiMo's spec says "conversation-first, no dashboards" — this is the right instinct; don't reintroduce structured panels for spec/plan if a chat rendering suffices.
- **Issues as a task source.** For MiMo (single-user), the task source is the user's own message; don't impose external ticketing structure.
- **No build feedback in the AI loop.** This was the fatal flaw.

### Premium interaction (specific)
- **Watching the agent produce spec → plan → code in a sequential, editable flow**, with each step visible and tweakable before proceeding.
- **Sparse-cloning a repo slice in <30s** to deliver first spec/plan on enormous codebases — felt like magic.
- **Mobile-compatible dev environment** with editable plan/code.

### Slow interaction (specific)
- **Ephemeral Codespace startup** — the build/repair loop's Achilles heel.
- **First spec/plan delivery** was sub-30s by design, but real-world reviews reported longer.
- **Agentic exploration of large repos** could loop.

### Cognitive overload (specific)
- **The full Task→Spec→Plan→Code pipeline shown all at once** felt structured but laboured. "Less efficient use of the developer's concentration while keeping them in the flow" vs. modern chat-log UX.
- **Editing the plan** was over-invested in (lots of UX controls); in practice, modern systems use simpler chat-log UX.

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** not chat-first — task-centric, with the task at the top and spec/plan/code as stacked editable sections.
- **Agent viz:** Copilot-powered agents (plural) handling brainstorm/plan/build/test/run — not deeply visualized in the UX, mostly implicit.
- **Execution viz:** run code directly in Copilot Workspace, or jump into underlying Codespace.
- **Artifact / code diff:** editable code blocks; the spec and plan are themselves editable artifacts.
- **Workspace:** web-based; mobile-compatible; full IDE via Codespace underneath.
- **Keyboard:** not the primary modality (web context).
- **Dev experience:** strongest on the *ideation → plan* phases (brainstorm, plan, build, test, run in natural language); weakest on build/repair (no solid code-validation loop).
- **Long-session:** the structured pipeline was meant to keep long sessions organized; in practice the over-structuring added friction.

---

## 4. OpenAI Codex (Codex CLI / Cloud / IDE / App)

### Current UX (2024-2025) — verified via
- https://www.augmentcode.com/learn/openai-codex-cli-terminal-agent
- https://glorypraise.hashnode.dev/codex-a-developer-s-honest-guide-to-openai-s-coding-agent
- https://www.taskade.com/blog/openai-codex-history
- https://www.builder.io/blog/codex-vs-claude-code

Codex (relaunched April 2025) is **an agent, not a model** (the old 2021 Codex model was deprecated in 2023). Four surfaces share a `config.toml` + `AGENTS.md` configuration:
1. **Codex CLI** — terminal-native agent (Rust, 94.9% of codebase, Apache-2.0, 75.6K stars, v0.121, 428 contributors, 709 releases as of April 2026). Install via `npm i -g @openai/codex`, `brew install --cask codex`, or direct binary.
2. **Codex IDE extension** — VS Code, Cursor, Windsurf. Opens as a sidebar panel; Agent mode by default (read files, run commands, write changes).
3. **Codex Cloud / Web** — at chatgpt.com/codex, or by tagging `@codex` in a GitHub PR. Cloud clones your repo into OpenAI-hosted isolation, runs the task, proposes changes for review.
4. **Codex App** — macOS desktop app.

Approval modes (the core UX):
- **Read-only** — Codex can look but not touch.
- **Workspace-write** (default for version-controlled folders) — edit files in workspace + run routine local commands; blocks network access and out-of-workspace writes unless explicitly allowed.
- **Danger full-access** — no sandbox, no limits.
- Approval policies: `untrusted` (prompts most things), `on-request` (default — risky actions only), `never`.
- `--full-auto` flag = workspace-write + on-request approvals (the sweet spot).
- Mid-session `/permissions` switches modes without restart.

Sandboxing: Seatbelt (macOS), Landlock (Linux), AppContainer (Windows). Bubblewrap + Docker devcontainer on Linux.

### What works
- **Terminal-native, no IDE required.** "Type `codex` to start, which is about as low a barrier as you can get." Lives where terminal-first developers already work (tmux, SSH, CI).
- **Sandboxing as a first-class design choice, not a feature.** "Default 'workspace-write' mode lets it read files anywhere, edit inside your project, and run routine commands, but blocks network access and writes outside your workspace unless you explicitly opt in. That's a stronger default posture than most coding agents."
- **Four surfaces sharing one config.** "config.toml + AGENTS.md… so your setup travels between them. You can start a task in the cloud and continue it locally, or vice versa. No other current agent has this much surface area with shared configuration."
- **GitHub PR integration via @codex** — "Tagging @codex in a GitHub pull request comment is a documented feature - the agent picks up the task from the PR context, runs in an isolated cloud environment, and opens commits for review."
- **MCP servers with parallel tool calls** — `supports_parallel_tool_calls` flag cuts wall time nearly in half (58s serial vs. 31s parallel in tested scenarios).
- **AGENTS.md as the project grounding file** — read at the start of every session; the highest-leverage thing you can do.
- **Apache 2.0 + auditable client.** "Security-sensitive organisations can audit the client."
- **Approval-mode flexibility** — `--full-auto`, mid-session `/permissions`, config defaults, and command-line overrides give granular control.

### What does not work
- **The sandbox and approval system can fight you.** "The most common complaint… approval prompts trigger inconsistently; the same command approved once will prompt again later in the same session. Commands that should run after explicit approval sometimes still inherit restricted network policies and fail." Multiple open issues across CLI and VS Code extension.
- **Hallucinated packages and APIs.** "Codex will occasionally confidently import a package that doesn't exist, call a function with the wrong signature, or suggest a library that was deprecated years ago."
- **Windows support is experimental.** OpenAI itself recommends WSL2.
- **Codex Cloud ships your code to OpenAI.** "By architecture, Codex Cloud clones your repository into an isolated OpenAI-hosted environment." Not OK for strict compliance / data-residency / IP-sensitive code.
- **The name "Codex" is confusing** — there have been two completely different things called Codex (2021 model, 2025 agent).
- **Four surfaces, four slightly different UX quirks.** "CLI, IDE extension, cloud, and desktop app share a brain but behave differently in small ways, for example, slash commands vary slightly, approval flows differ, and bugs fixed on one surface can linger on another."
- **Rate limits on ChatGPT plans** (Plus hits limits on heavy daily use; Pro more generous).
- **Approval fatigue** — `untrusted` policy prompts for most things.

### What is unique
- **Four sharing-config surfaces (CLI / IDE / cloud / desktop)** — no other current agent has this much surface area with shared configuration.
- **`@codex` GitHub PR mention** as the task origin — a genuine workflow shift for PR-driven teams.
- **AGENTS.md as a project grounding file** (since cloned by others, e.g., Cursor's `.cursorrules`, Claude Code's `CLAUDE.md`).
- **MCP servers with parallel tool calls** — the explicit `supports_parallel_tool_calls` flag is operationally measurable.
- **Apache-2.0 Rust CLI** — auditable, forkable, no vendor lock-in on the client side.
- **Sandboxing by default with three modes + three policies** — most fine-grained approval model in the space.

### What MiMo should learn
- **AGENTS.md / project grounding file is a must.** MiMo should have a `MIMO.md` (or `.mimo/rules`) read at the start of every workflow; MiMo's existing `MIMO_PRODUCT_SPEC.md` and `MIMO_ENGINEERING_SPEC.md` already serve this role for the project — generalize it.
- **Sandboxing as a default with named modes** — Read-only / Workspace-write / Danger — is the right mental model. MiMo's Core could expose these as workflow-level permissions (the Reasoner already decides execute/clarify/reject; adding a "scope" field per step is natural).
- **Per-step approval policy** (`on-request` vs `untrusted`) is the right granularity — not "approve everything" vs "approve nothing."
- **Mid-session `/permissions` switch without restart.** MiMo should allow runtime permission changes without resetting the conversation.
- **Sharing config across surfaces** (less relevant to single-surface MiMo, but the principle of one-source-of-truth config is sound).
- **PR/issue-as-task-origin** is conceptually powerful: MiMo's "task" object could similarly be tagged from anywhere (a memory entry, a file, a search result).

### What MiMo should avoid
- **Inconsistent approval prompts.** Codex's most-flagged flaw: "the same command approved once will prompt again later in the same session." MiMo must remember approvals within a session.
- **Four surfaces with divergent UX quirks.** MiMo is one surface; never split the brain.
- **Hallucinated packages** — MiMo's Validator should flag unfamiliar package references.
- **Approval fatigue.** `untrusted` is too noisy; default to `on-request`.
- **Cloud-clones-your-code** model — not applicable to MiMo (single-user, local-first), but the lesson is: keep the user's data in the user's hands.

### Premium interaction (specific)
- **Type `codex` in any terminal** (or `codex --full-auto "run the test suite and fix failures"`) and the agent starts with sandbox + approval policy set.
- **`@codex` mention in a GitHub PR comment** → agent picks up the task, runs in isolated cloud, opens commits for review.
- **Mid-session `/permissions` to switch from read-only to workspace-write** without restart.
- **`/clear` and `/compact` to reset context when switching tasks** — explicit context hygiene primitives.

### Slow interaction (specific)
- **Approval-prompt storms** when the policy is too strict.
- **Cloud surface cloning a large repo** into OpenAI-hosted isolation.
- **Serial MCP tool calls** before the parallel flag (58s vs 31s — 47% slower).

### Cognitive overload (specific)
- **Choosing between three approval modes × three approval policies** = 9 combinations. New users struggle.
- **Four surfaces with quirks** — "if you use more than one surface, expect a short learning curve for each."
- **Config.toml tuning** — "Budget time to tune your config.toml before you trust it on complex workflows."

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** CLI = a TUI chat in the terminal; IDE = sidebar panel; cloud = web chat; desktop = native chat.
- **Agent viz:** minimal — Codex reads the repo, builds a mental model, reports back. No multi-agent panel like Cursor.
- **Execution viz:** `apply_patch` tool generates patches; user reviews diffs in terminal. For cloud, proposed changes appear as commits for review.
- **Artifact / code diff:** diff in terminal (CLI), proposed commits (cloud), inline edits (IDE).
- **Workspace:** the user's existing editor or terminal; Codex doesn't bring its own IDE.
- **Keyboard:** terminal-native; IDE shortcuts follow the host editor.
- **Dev experience:** strongest for terminal-first / headless / CI workflows; sandbox + MCP parallelism is the killer combo.
- **Long-session:** `/clear` and `/compact` are the explicit primitives for context hygiene; AGENTS.md re-read at session start keeps grounding stable.

---

## 5. Continue.dev

### Current UX (2024-2025) — verified via
- https://docs.continue.dev/ide-extensions/quick-start
- https://dev.to/maximsaplin/continuedev-the-swiss-army-knife-that-sometimes-fails-to-cut-4gg3
- https://github.com/continuedev/continue/issues/1312
- https://continue.dev (acquired by Cursor)

Continue is an **open-source VS Code + JetBrains extension** with five core features: **Autocomplete, Edit, Chat, Agent, Plan**. Sidebar chat (movable to right), inline edit via `Cmd/Ctrl+I`, autocomplete via `Tab`. Model-agnostic (local, remote, open-source, commercial — separate tabs for "Models" and "Providers"). Supports MCP servers, rules, prompts, context providers, codebase indexing via embeddings.

**Acquired by Cursor** (per continue.dev landing page, late 2025/2026): "Continue has been acquired by Cursor. Our mission has always been to ensure developers are amplified, not automated, pioneering open-source coding agent."

### What works
- **Five-mode clarity** — Autocomplete / Edit / Chat / Agent / Plan, each with a clear job. The docs' quick-start walks through each with a practical exercise.
- **100% local option** — "Continue does not need to include a third party and can keep your LLM calls between the IDE and LLM API endpoint. This means that with Continue you can: use locally deployed models (e.g., via LM Studio) OR use the model hosted in your secure environment ensuring no data travels outside the predefined perimeter." (vs. Cursor, which makes LLM calls from their backend even if you bring your own model.)
- **Apache 2.0 + open source** — free for commercial use; "It took 10-20 minutes to clone their repo and get it running."
- **Transparent prompts** — "you can see the exact prompt that was sent to the LLM" in the Output pane (try doing that in Cursor or Copilot).
- **Model + Provider separation** — "many, many options for models: local, remote, open-source, commercial, OpenAI and non-OpenAI, large-slow for chat, small-fast for in-editor autocompletion (pressing TAB)."
- **Multi-IDE support** — VS Code and JetBrains (rare).
- **Plan Mode** explicitly separate from Agent Mode — lets you ask the agent to plan before writing.

### What does not work
- **Inline editor UX (`Cmd/Ctrl+I`) is widely panned.** Specific complaints:
  - "5-10 seconds to show upon first use → it's frustrating to call the inline editor and get nothing. There seems to be some bug with Continue lazy initialisation. If you open Continue chat the editor it is quick to show up."
  - "The UI/UX is horrible, it shows VSCode's prompt at the top of the window."
  - "Sometimes (1 in 20 times) fails to provide pluggable code - i.e. if the model returns several blocks of code with text around it - not the case for Cursor, never saw inline edits failing like that."
  - "The editor is also kinda ugly, hard to see small 'accept'/'reject' → Cursor is a clear winner here."
  - "The generated diff tends to be 100% change of the selected code, yet the actual changes do not get isolated."
- **No clickable file references in chat** — "if a file is mentioned in the output you can't click it and get the file opened in IDE." A basic affordance missing.
- **Manual file context** — "I always have to manually added the currently open file to the context. I select a code snippet, do CMD+L keyboard shortcut to bring this snippet into chat windows and don't have the whole file added to the context. Why not have it automatically added just as with other assistants?"
- **Bugs:** indexing broken on macOS; "+ Add more context providers" pop-up does nothing; Internet retrieval provider broken (can't ask the assistant to read a URL).
- **Sidebar disappears** — the GitHub issue #1312 documents an ongoing (May 2024 → May 2026) problem where moving Continue to the right side and then closing it leaves no clear way to bring it back except `Ctrl+Alt+L`. Multiple users confirm still broken as of Feb/May 2026.
- **Coding quality is mediocre** — "the way Continue is built is both its strength and its weakness… the way Continue just throws at the LLM the piece of surrounding code that fits into the context and asks it nicely to insert a piece of code… does not work well." Many users pair Continue with Aider for actual coding.
- **Stability** — "sometimes unstable and quirky."
- **Provider tabs confusing** — "the overall concept of Models and Providers (2 separate tabs in the UI) is somewhat confusion, when adding a model I was not sure what was the difference."

### What is unique
- **100% local LLM option with no third-party calls.** Cursor calls backends even with your own model; Continue does not. This is a genuine privacy differentiator.
- **Transparent prompts in the Output pane.** No other major tool lets you see the exact prompt sent.
- **Apache 2.0 + open-source extension** that runs in your existing VS Code/JetBrains (no fork).
- **Model + Provider separation** as explicit UI tabs (confusing to some, but the principle is sound).
- **Plan Mode as a first-class peer to Agent Mode** (Cursor has plan-vs-execute but less explicit; Continue names them as siblings).
- **Multi-IDE support** (VS Code + JetBrains) — most others are VS Code-only.

### What MiMo should learn
- **Five-mode clarity (Autocomplete / Edit / Chat / Agent / Plan)** is a clean mental model. MiMo's 8 modes (chat/research/code/writing/run/image/automation/data) are mode-rich; the lesson is to make each mode's job crisply distinct and the switching obvious.
- **Plan Mode as a sibling, not a sub-mode.** MiMo's Core already has a Planner; surfacing "plan first" as an explicit user-selectable mode (not a pipeline-internal step) is a Continue idea worth adopting.
- **Transparent prompts** — MiMo's DeveloperPanel could expose the exact prompt sent (the PromptEngine already builds it in fixed order; showing it in dev mode builds trust).
- **Local-first / privacy-first stance** — MiMo already runs locally and uses the ZAI adapter; the "no third-party calls" principle is sound and matches MiMo's single-user OS positioning.
- **Multi-IDE possibility** — less relevant to MiMo (single surface), but the principle of "meet the user where they are" matters.

### What MiMo should avoid
- **Sidebar disappearing / unclear recovery** — the multi-year GitHub issue #1312 is a cautionary tale. MiMo must have a bulletproof "bring it back" affordance (a global keyboard shortcut that always works, plus a menu item).
- **Lazy-initialization lag** on inline UI — Continue's inline editor takes 5-10s on first use. MiMo must pre-warm the ExecutionTrace and any inline widgets.
- **Non-clickable file references in chat** — basic affordance; MiMo's Markdown renderer already handles this; ensure file paths in AI responses are clickable.
- **Forcing manual context attachment** — auto-include the currently open file/tab when the user sends a message.
- **100% diff overwrites** — Continue replaces the entire selection even when only a small part changed. MiMo's diff rendering should isolate the actual change.
- **Confusing "Models vs. Providers" separation** — abstract this away behind a single "model picker" unless the user opts into advanced config.
- **Broken providers shipped** — Continue shipped providers that didn't work ("Internet retrieval provider is broken"). MiMo should never ship a tool that doesn't work; if a tool is experimental, label it clearly.

### Premium interaction (specific)
- **Tab to accept autocomplete** with small/fast local model (Codestral is mentioned as incredible when paired with Continue).
- **Seeing the exact prompt in the Output pane** — transparency builds trust.
- **`Cmd/Ctrl+I` inline edit** when it works (when not laggy) — scoped, fast, no context switch.

### Slow interaction (specific)
- **`Cmd/Ctrl+I` first-use 5-10s lag** due to lazy initialization.
- **Sidebar recovery** when it disappears — users hunt for the shortcut.

### Cognitive overload (specific)
- **Models vs. Providers tab confusion** — new users don't know which to use.
- **Manual context attachment** — the user must remember to add files to chat.
- **Hidden sidebar recovery** — "I wouldn't have known that unless I came to this issues page."

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** sidebar chat (movable to right; recovery via `Ctrl+Alt+L`).
- **Agent viz:** minimal — no parallel-agent panel; Agent mode is the chat model + tools.
- **Execution viz:** transparent prompts in Output pane; otherwise minimal.
- **Artifact / code diff:** inline `Cmd/Ctrl+I` shows accept/reject, but reviewers find it ugly and sometimes fails to isolate changes.
- **Workspace:** your existing VS Code or JetBrains — Continue is a guest, not a host.
- **Keyboard:** `Cmd/Ctrl+I` (Edit), `Cmd/Ctrl+L` (Chat / add selection), `Tab` (accept autocomplete).
- **Dev experience:** strongest as a transparent, open, local-first tinkering platform; weakest as a polished daily-driver coder (pair with Aider).
- **Long-session:** the chat is decent; the agent is not; the inline editor has rough edges.

---

## 6. Replit AI Agent

### Current UX (2024-2025) — verified via
- https://www.mindstudio.ai/blog/what-is-replit-agent-4
- https://refine.dev/blog/replit-ai-agent
- https://replit.com/blog/2025-replit-in-review
- https://replit.com/products/agent

Replit Agent 4 (released 2025) is an **autonomous AI development system built into the Replit cloud IDE.** It collapses ideation → design → build → review into one browser-based workspace. Unlike Cursor/Windsurf (IDE augmentations) or Copilot Workspace (sunset), Replit is a **full project environment**: hosting, databases, runtime, deployment are all built in.

Pipeline:
1. **Ideation phase** — agent asks clarifying questions and produces a plan before writing any code.
2. **Design phase** — for UI-heavy apps, generates visual mockups/wireframe-style previews; user approves before coding.
3. **Build phase** — parallel subagents handle database schema/backend, API routes, frontend components simultaneously; orchestrating agent coordinates, resolves conflicts, assembles.
4. **Review phase** — live web-based preview runs in-browser; user tests functionality; describes issues in plain English; agent fixes and redeploys.

Pricing: Replit Core ~$25/month with $25 compute credits (~100 Agent checkpoints); deployment costs separate.

### What works
- **Ideation → Design → Build → Review as one continuous pipeline** in a single browser tab — "Editor, preview, AI agents, deploy — all in one tab. Nothing to install."
- **Clarifying questions before coding** — "This back-and-forth surfaces ambiguities before they become bugs. It's closer to how a developer would actually scope a project than to the older 'generate code from this sentence' approach."
- **Visual planning step before code** — "catches misaligned expectations early (you wanted a sidebar, it planned a tab bar)… gives non-technical stakeholders something to react to… lets you redirect the build before significant code exists."
- **Explicit approval gate at the design phase** — "Once you review the design plan, you explicitly approve it before the agent starts coding. This approval step is deliberate — it creates a checkpoint where you're in control of what gets built."
- **Parallel subagents** — one for DB/backend, one for API routes, one for frontend components. "The orchestrating agent coordinates these threads, resolves conflicts, and assembles the pieces."
- **Live in-browser preview** with no local setup — test immediately, describe issues in plain English, agent fixes and redeploys. Minutes-per-iteration for simple apps.
- **Full-stack built-in** — "infrastructure layer — hosting, databases, runtime environments — is already built in. You're not just getting code generation; you're getting the full stack to run what gets built."
- **Deployment options** — Reserved VM, Autoscale (chosen by Agent), Static Pages, Scheduled Jobs.

### What does not work
- **Struggles with complex business logic** — "If your app requires nuanced rules, multi-step calculations, or domain-specific behavior, the agent will often get close but not quite right."
- **Large existing codebases** — "Agent 4 works best on fresh projects. Importing an existing, large codebase and asking it to make significant changes can produce unpredictable results."
- **Debugging hard errors** — "When the app breaks in a non-obvious way — a race condition, an edge case in third-party API behavior — the agent can loop on fixes. Sometimes you need a human developer to diagnose."
- **Long-running / background tasks** — "Apps that need scheduled jobs, background processing, or complex server-side logic require more setup than the agent handles automatically."
- **Cost at scale** — "Replit's deployment costs for production apps can add up. Agent 4 is best for prototyping and internal tools rather than high-traffic consumer apps."
- **Reddit UI feedback:** "Replit changed their UI… impossible to have 2 tabs and then move to 1. UX feels pushed too fast. Having 2-3 panel screen is barely [usable]." Suggests panel management is fragile.
- **Earlier agents were linear** — Agent 4 fixed this with parallel subagents, but the linear legacy shows in some flows.

### What is unique
- **Browser-based full-stack environment** — hosting, DB, runtime, deployment built in. No other tool in this list is also your hosting platform.
- **Visual design phase before coding** — wireframe-style preview that you approve before code is written. Copilot Workspace had editable plan; Replit has visual mockup.
- **Parallel subagents with an explicit orchestrator** — different from Cursor's parallel agents (which the user spawns); Replit spawns them automatically and orchestrates.
- **In-browser live preview + plain-English feedback loop** — "describe the fix in a follow-up message → Agent revises and redeploys." Minutes per iteration for simple apps.
- **Agent-chosen deployment** — the agent picks Autoscale for most apps.
- **Image generation inside the IDE** (added August 2025) — generate icons/placeholders without leaving the editor.

### What MiMo should learn
- **Clarifying questions before action** — Replit's ideation phase. MiMo's Reasoner already decides clarify/execute/reject; making the clarify step a *visible, multi-question dialogue* (not just a single follow-up) is the lesson.
- **Visual planning step before code** — for code-mode tasks, MiMo could render a wireframe/plan before the WriterAgent starts. The plan is already produced by PlannerAgent; surfacing it visually (for code/UI tasks) is the Replit idea.
- **Explicit approval gate between plan and execution.** MiMo's spec calls for "inline execution"; but Replit shows that an approval gate at the design/plan boundary is valuable for non-trivial builds.
- **Parallel subagents with an orchestrator** — MiMo's orchestrator already executes Plans respecting step dependencies; Replit shows parallel subagents (DB / API / frontend) coordinated by an orchestrator is a real pattern for complex tasks.
- **Live preview + plain-English feedback** — for code/run modes, an in-MiMo preview pane with "describe the fix" is a powerful loop.
- **Checkpoint-based budgeting** — "$25 compute credits (~100 Agent checkpoints)." MiMo (single-user) should consider a soft checkpoint counter to make cost visible without metering painfully.

### What MiMo should avoid
- **Panel fragility** — Replit's UI change drew Reddit complaints about tab/panel management. MiMo's tabs and panels must be robust to resize/move/close.
- **Looping on hard errors** — Replit's agent "can loop on fixes" for race conditions / edge cases. MiMo's Validator already caps this; keep the cap.
- **Linear legacy in some flows** — Replit 4 fixed this, but the lesson is: parallel-by-default, not parallel-as-an-option.
- **High deployment costs at scale** — less relevant to MiMo (single-user), but the principle of "don't make running things expensive" matters.

### Premium interaction (specific)
- **Describe an app → agent asks clarifying questions → produces a visual mockup → you approve → parallel subagents build → live preview in-browser → plain-English fixes → redeploy in minutes.** The full ideation-to-running-app loop is unique.
- **Approval gate at the design phase** — you see what's about to be built before any code is written.
- **Parallel subagents** building DB, API, and frontend simultaneously with an orchestrator assembling.

### Slow interaction (specific)
- **Agent looping on hard errors** (race conditions, edge cases in third-party APIs).
- **Complex business logic** — "often gets close but not quite right," requires careful guidance or direct code edits.
- **Importing existing large codebases** — "unpredictable results."

### Cognitive overload (specific)
- **Multiple parallel subagents building simultaneously** — for non-technical users, it's magical; for technical users, watching DB / API / frontend agents work concurrently can be hard to track.
- **Panel/tab management** — Reddit users complained about UI changes that made multi-panel work fragile.
- **Choosing among 4 deployment options** — Reserved VM vs Autoscale vs Static vs Scheduled.

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** the agent is the entry point — you start by describing what you want, and the agent drives the IDE.
- **Agent viz:** parallel subagents (DB / API / frontend) + orchestrator; not deeply visualized but conceptually clear.
- **Execution viz:** live in-browser preview; describe-fix-redeploy loop.
- **Artifact / code diff:** code is written across files; preview is the primary artifact (not the diff).
- **Workspace:** Replit's cloud IDE — editor, preview, AI agents, deploy, all in one tab.
- **Keyboard:** not the primary modality (browser-based, mouse-driven).
- **Dev experience:** strongest for prototyping and internal tools; weakest for complex existing codebases and production-scale.
- **Long-session:** the ideation→design→build→review loop is meant to keep long sessions bounded; in practice, hard-error loops break the flow.

---

## 7. OpenHands (formerly OpenDevin)

### Current UX (2024-2025) — verified via
- https://www.openhands.dev
- https://github.com/OpenHands/openhands
- https://www.emergentmind.com/topics/openhands-agent-framework
- https://arxiv.org/html/2511.03690v1 (OpenHands SDK paper)
- https://www.reddit.com/r/AI_Agents/comments/1sntvev/is_openhands_opendevin_still_the_move_in_2026

OpenHands is the **open-source, model-agnostic platform for cloud coding agents** (MIT licensed, 81K+ GitHub stars, 188+ contributors, raised $18.8M). Renamed from OpenDevin. The flagship product is **Agent Canvas** — a self-hosted desktop app (`npm install -g @openhands/agent-canvas`) that runs the open-source OpenHands agent out-of-the-box, but can also use Claude Code, Codex, Gemini, or any ACP-compatible agent across local, remote, and cloud backends.

Architecture (per the SDK paper):
- **Event-stream abstraction** — perception–action loop; each agent reads history of environment events and produces the next atomic action.
- **Sandboxed Linux OS** — each session in a Docker container, torn down post-session.
- **Jupyter Kernel Environment** — stateful Python execution.
- **Browser Agent API** — BrowserGym interface for browser automation.
- **Multi-Agent Delegation Interface** — hierarchical agents can delegate subtasks.
- **AgentSkills Library** — modular Python utilities (file I/O, search, parsing).
- **AgentHub** — registry of agent templates (CodeActAgent, BrowserAgent, Micro-agents).

Agent Canvas surfaces:
- Conversations (multiple parallel agents running)
- Automations (templates: Slack @openhands mentions, Linear issue classification, GitHub PR review, incident retrospective, security remediation, CI failure fix)
- Backend switching (local / Docker / VM / cloud / enterprise) without losing focus
- Integration with Slack, GitHub, Linear, Notion, 70+ tools
- SSO, RBAC, audit logs, budget controls, sandboxed execution in VPC

### What works
- **"Not another chat interface. Actual autonomous problem solving that ships to production."** The community quote captures the positioning — OpenHands is for *agentic SDLC*, not pair-programming.
- **Open a GitHub issue → AI figures it out → writes tests → pushes a PR.** "Magical" workflow; OpenHands autonomously fixes 87% of bug tickets same-day (per customer quote).
- **Multiple backend switching from one frontend** — "you can run the backend in multiple different environments, and switch between them from the same Agent Canvas frontend. E.g. you can share an Agent Server with your team for agents doing code review and dependency updates, then have your personal agents running on your laptop."
- **Open source + model-agnostic + self-hosted** — "your code never leaves your control."
- **Large Codebase SDK** — "maps dependencies across the system and orchestrates changes in the correct order, allowing multiple agents to safely work in parallel without conflicts."
- **Automation templates** — pick a template (Slack mention, Linear issue, PR review, incident, security, CI failure), connect tools, agent runs on schedule or webhook.
- **Multi-agent delegation** — `AgentDelegateAction` lets agents hand off subtasks to specialists (browser agent for web tasks, code agent for coding).
- **Deterministic testing framework** — mocks LLM completions for reproducible agent runs.
- **MIT licensed, 188+ contributors, 81K+ stars** — community-validated.

### What does not work
- **Setup complexity.** "OpenHands requires more setup" than alternatives (Reddit). It's a platform, not an extension — installing and configuring backends/sandboxes is non-trivial for casual users.
- **Agent Canvas is recent** — renamed from "OpenHands" desktop to "OpenHands Agent Canvas" in late 2025 (commit #16353); UI is still polishing.
- **Bug reports** (commits like "preserve MCP credentials during Canvas mutations" #16144, "preserve Canvas analytics identity" #1839) suggest edge cases in the Canvas UX.
- **Less polished than Cursor/Windsurf for interactive IDE work** — community quote: "I love using autonomous agents like @allhands_ai OpenHands for 80% of the work (esp. backend), and then an interactive IDE like @windsurf or @zeddotdev for debugging, refinement, and UI work." OpenHands is the autonomous backend; you still need an interactive IDE for the rest.
- **"Idiot intern that literally knows all the book stuff"** — a community description that cuts both ways: powerful but requires supervision.
- **Theme/UI gaps** — "Is there a theme setting for web ui?" (Reddit question) suggests UI polish lags.

### What is unique
- **Agent Canvas as a multi-agent "developer control center"** that runs OpenHands, Claude Code, Codex, Gemini, or any ACP-compatible agent across local/remote/cloud backends. No other product is agent-agnostic at this level.
- **Backend switching from one frontend** without losing focus — share a team Agent Server, then flip to your laptop's local agents.
- **Automation templates** for Slack / Linear / GitHub / PagerDuty-triggered agents (not just PR-as-task like Codex).
- **Event-stream abstraction as the core architecture** — perception-action loop, agent reads history, produces next action. Clean, auditable.
- **Multi-agent delegation via `AgentDelegateAction`** — hierarchical agents with a standardized vocabulary.
- **Large Codebase SDK** for dependency-aware parallel agents on legacy codebases.
- **MIT + 188 contributors + 81K stars** — the most credible open-source platform in the space.

### What MiMo should learn
- **Event-stream architecture is the right primitive.** MiMo's EventBus already implements this pattern (pub/sub, typed events, handler errors isolated). OpenHands confirms it's the correct foundation for an agent platform.
- **Multi-agent delegation** — MiMo's orchestrator already executes Plans respecting step dependencies; OpenHands's `AgentDelegateAction` (hand off subtasks to specialists) is a pattern MiMo's agents could adopt more explicitly.
- **Backend switching without losing focus** — less relevant to single-user MiMo, but the principle of "the agent's state survives backend changes" matters for long sessions.
- **Automation templates triggered by external events** (Slack, GitHub, Linear, PagerDuty). MiMo (single-user) could similarly trigger workflows from memory entries, file changes, or scheduled events — a "personal automations" surface.
- **Large Codebase SDK pattern** — map dependencies, orchestrate changes in correct order, allow parallel agents without conflicts. Relevant when MiMo grows to handle large personal knowledge bases.
- **Sandboxed execution per session** (Docker container, torn down post-session) — a strong isolation primitive MiMo's `run` mode could adopt.
- **Self-hosted, data-never-leaves** — matches MiMo's single-user, local-first positioning.

### What MiMo should avoid
- **Setup complexity.** OpenHands requires real setup; MiMo's spec calls for "no dashboards, conversation-first" — keep the install and the daily-use path trivial.
- **Splitting autonomous backend vs. interactive IDE.** OpenHands users *pair it with Windsurf/Zed for interactive work*. MiMo should be both in one surface — conversation-first for interactive, agent-driven for autonomous — not require a second tool.
- **UI polish gaps.** OpenHands's Canvas is still polishing (theme settings, MCP credential preservation, analytics identity). MiMo must nail UI polish from day one.
- **"Idiot intern" framing** — powerful but unsupervised agents erode trust. MiMo's Validator + inline ExecutionTrace are the right guardrails; keep them.

### Premium interaction (specific)
- **Open a GitHub issue → OpenHands autonomously fixes it → writes tests → pushes a PR — same-day, 87% success rate.** The "magical" autonomous workflow.
- **Switching between local laptop agents and a shared team Agent Server** without losing the conversation.
- **Tagging @openhands in Slack** → agent opens a conversation with the message context, replies when finished.
- **Multi-agent delegation** — a coding agent hands off a web-search subtask to a browser agent automatically.

### Slow interaction (specific)
- **Setup** — installing and configuring backends/sandboxes.
- **Large codebase mapping** — the Large Codebase SDK maps dependencies, but it's not instant.
- **Agent loops on hard bugs** — sometimes a human developer is faster.

### Cognitive overload (specific)
- **Multiple backends** (local / Docker / VM / cloud / enterprise) and choosing between them.
- **Multiple agents running in parallel** across different backends — tracking which agent is where doing what.
- **Automation template selection** — 6+ templates, each with its own configuration.

### Conversation / Agent viz / Execution / Artifacts / Workspace / Keyboard / Dev experience / Long-session notes
- **Conversation panel:** Agent Canvas home with multiple conversations (one per agent run).
- **Agent viz:** parallel agents visible; multi-agent delegation via `AgentDelegateAction`; not as visually rich as Cursor's Agents panel.
- **Execution viz:** sandboxed Docker containers, Jupyter kernel, browser agent API; full auditability.
- **Artifact / code diff:** agents open PRs with proposed changes; review happens in GitHub.
- **Workspace:** Agent Canvas desktop app (Electron); connects to multiple backends.
- **Keyboard:** not the primary modality (mouse-driven desktop app).
- **Dev experience:** strongest for autonomous backend work and CI/CD-triggered agents; weakest for interactive refinement (pair with an IDE).
- **Long-session:** the event-stream abstraction + sandboxed sessions keep state clean; backend switching preserves the conversation.

---

## Cross-Product Synthesis (most important takeaways for MiMo)

1. **Conversation-first is right, but Cursor wins by being editor-first, not chat-first.** MiMo's bet on conversation-first is validated by Replit's ideation-chat and Codex's terminal-native chat; but Cursor's "editor surface IS the AI canvas" is the deepest insight. MiMo should make the conversation the *spine* and the editor/preview the *canvas*, not the other way around.

2. **Preview-then-approve is the new bar.** Cursor's per-file accept/reject on a staged Composer diff is "the single biggest reduction in AI-induced regression risk." Copilot Workspace's fatal flaw was *no build feedback in the AI loop*. MiMo's Validator must gate writes, and the ExecutionTrace must show diffs *before* they commit. Don Syme's retrospective on Copilot Workspace is the most important document read here.

3. **Per-agent model routing + per-agent scope is the Cursor primitive to copy.** MiMo's Core already has agentRegistry + modelRegistry + toolRegistry; expose per-step model choice (cheap/fast for tests, deep for research) and per-step scope (read-only / src/ / docs/).

4. **AGENTS.md / project grounding file is universal.** Codex (AGENTS.md), Cursor (.cursorrules), Claude Code (CLAUDE.md) all converged on this. MiMo should have `MIMO.md` read at workflow start. MiMo already has `MIMO_PRODUCT_SPEC.md` and `MIMO_ENGINEERING_SPEC.md` — generalize.

5. **Sandboxing with named modes (Read-only / Workspace-write / Danger) + named policies (untrusted / on-request / never) is Codex's cleanest idea.** MiMo's Reasoner already decides execute/clarify/reject; adding a "scope" + "approval policy" per step is natural.

6. **Windsurf's real-time awareness of user edits** (rename propagation, dependency tracking) is the missing primitive across the field. MiMo's EventBus could emit "user edited X" events; the WriterAgent could proactively offer consistency fixes. This is genuinely distinctive — no other product does it well.

7. **Replit's clarifying-questions-before-coding + visual plan approval gate** is the strongest ideation UX. MiMo's Reasoner already decides clarify/execute; making clarify a *visible multi-question dialogue* and surfacing the plan as an *approvable artifact* (especially for code/UI tasks) is the Replit lesson.

8. **OpenHands's event-stream architecture mirrors MiMo's EventBus.** MiMo's design is validated. OpenHands's `AgentDelegateAction` (hierarchical agent delegation) is a pattern MiMo's orchestrator could adopt more explicitly.

9. **Continue.dev's failures are a warning list.** Sidebar-disappears-for-years, inline-editor-lag, non-clickable-file-references, manual-context-attachment, 100%-diff-overwrites, broken-providers-shipped, confusing-models-vs-providers — MiMo must avoid every one. The "100% local, transparent prompts, Plan mode as sibling" positives are worth adopting.

10. **Cognitive overload is the silent killer.** Cursor (routing-policy design), Codex (9 mode×policy combinations, 4 surfaces), Replit (parallel subagents), Copilot Workspace (over-structured pipeline), Continue (Models vs Providers) — every product has a cognitive-overload tax. MiMo's spec ("no dashboards, ≤8 rail icons, hidden runtime unless dev mode") is the right defense; the lesson is to *hide choices behind good defaults*, not surface them all.

11. **Premium interactions cluster around three patterns:**
    - *Frictionless spawn* (Cursor: 2-click new agent; Codex: type `codex`)
    - *Per-file accept/reject* on a staged diff (Cursor's strongest)
    - *Real-time partnership* (Windsurf: detects your renames; Replit: live preview + plain-English fixes; OpenHands: GitHub issue → PR autonomously)
    MiMo should aim for all three: frictionless workflow kickoff, per-step accept/reject on artifacts, and a real-time partnership feel via the inline ExecutionTrace + memory.

12. **Long-session sustainability comes from three things:**
    - *Bounded agent scope* (Cursor's 4-archetype split: research/build/test/review)
    - *Explicit context hygiene primitives* (Codex's `/clear` and `/compact`)
    - *Memory + rules that persist across sessions* (Windsurf's auto-memory; Codex's AGENTS.md)
    MiMo's MemoryEngine + MIMO.md + per-step scoping already cover this; make context-hygiene commands (`/clear`, `/compact`) explicit.

13. **Slow interactions cluster around four patterns:**
    - *Approval-prompt storms* (Codex's biggest complaint)
    - *Lazy-initialization lag* (Continue's inline editor 5-10s first use)
    - *Agent loops on hard errors* (Replit, OpenHands)
    - *Cloud-repo-cloning latency* (Codex Cloud, Copilot Workspace's Codespace)
    MiMo must pre-warm widgets, remember approvals within a session, cap agent loops (Validator already does), and stay local.

14. **The biggest single UX lesson across all seven:** **Don Syme's regret that Copilot Workspace "didn't embrace chat as both the output of the coding agent and the place to give guidance."** Modern vibe-coding systems use "simpler chat-log UX that feels less structured and less laboured, making more efficient use of the developer's concentration while keeping them 'in the flow'." This *exactly* validates MiMo's conversation-first, no-dashboards spec. Don't reintroduce structured panels for spec/plan/code if a chat rendering suffices — but DO surface the spec/plan/code as artifacts *inside* the chat.

---

## Sources index (all URLs read or searched)

**Cursor**
- https://www.digitalapplied.com/blog/cursor-3-deep-dive-agents-composer-review-2026 (deep-read)
- https://www.infoq.com/news/2026/04/cursor-3-agent-first-interface
- https://www.codecademy.com/article/cursor-2-0-new-ai-model-explained (returned error page — used search snippet + Cursor1)
- https://www.deployhq.com/guides/cursor
- https://forum.cursor.com/t/composer-and-agent-mode/51443
- https://www.reddit.com/r/cursor/comments/1ojuy0c/tried_composer_agent_on_a_12_hour_flight_heres

**Windsurf**
- https://aiflowreview.com/windsurf-review-2025 (deep-read)
- https://damiandabrowski.medium.com/day-77-of-100-days-agentic-engineer-challenge-windsurf-cascade-813878ab2d32 (deep-read)
- https://www.augmentcode.com/tools/antigravity-vs-windsurf-comparison
- https://www.autonomous.ai/ourblog/windsurf-review
- https://blog.stablediscussion.com/p/my-initial-review-of-windsurf

**GitHub Copilot Workspace**
- https://github.blog/news-insights/product-news/github-copilot-workspace (deep-read)
- https://dsyme.net/2025/01/25/copilot-workspace-and-the-birth-of-task-oriented-programming (deep-read — Don Syme retrospective, gold)
- https://githubnext.com/projects/copilot-workspace
- https://github.com/githubnext/copilot-workspace-user-manual/blob/main/known-issues.md
- https://news.ycombinator.com/item?id=40200081
- https://matduggan.com/reviewing-github-copilot-workspaces

**OpenAI Codex (CLI / Cloud / IDE / App)**
- https://www.augmentcode.com/learn/openai-codex-cli-terminal-agent (deep-read)
- https://glorypraise.hashnode.dev/codex-a-developer-s-honest-guide-to-openai-s-coding-agent (deep-read)
- https://www.taskade.com/blog/openai-codex-history
- https://www.builder.io/blog/codex-vs-claude-code

**Continue.dev**
- https://docs.continue.dev/ide-extensions/quick-start (deep-read)
- https://dev.to/maximsaplin/continuedev-the-swiss-army-knife-that-sometimes-fails-to-cut-4gg3 (deep-read)
- https://github.com/continuedev/continue/issues/1312 (deep-read — sidebar-recovery thread, May 2024 → May 2026)
- https://continue.dev (acquired-by-Cursor notice)

**Replit AI Agent**
- https://www.mindstudio.ai/blog/what-is-replit-agent-4 (deep-read)
- https://refine.dev/blog/replit-ai-agent (deep-read)
- https://replit.com/blog/2025-replit-in-review
- https://replit.com/products/agent

**OpenHands (OpenDevin)**
- https://www.openhands.dev (deep-read)
- https://github.com/OpenHands/openhands (deep-read)
- https://www.emergentmind.com/topics/openhands-agent-framework (deep-read)
- https://arxiv.org/html/2511.03690v1 (SDK paper, referenced)
- https://www.reddit.com/r/AI_Agents/comments/1sntvev/is_openhands_opendevin_still_the_move_in_2026
