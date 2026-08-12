# Research Group F — Autonomous Coding Agents (2024–2025)

**Scope:** 7 autonomous / agentic coding tools studied through 21 philosophical UX angles.
**Products:** Devin · Claude Code · Aider · Sweep.dev · Sourcegraph Cody · Amazon Q Developer · Tabnine.
**Method:** web_search (7 queries) → page_reader (11 reads, 1–2 per product). All sources cited inline.
**Audience:** MiMo Product Bible — single-user AI Operating System (conversation-spine + canvas-per-mode).
**Cross-reference:** builds on Group B (Cursor / Windsurf / Copilot WS / Codex / Continue.dev / Replit / OpenHands).

Verified source URLs (full list at bottom). Quotes are verbatim from primary articles unless marked [snippet].

---

## 1. Devin (Cognition AI) — verified via
- https://cognition.com/blog/introducing-devin (Mar 12 2024, primary)
- https://devin.ai/ (product homepage, accessed Aug 2026; product positioning has matured)
- https://en.wikipedia.org/wiki/Devin_AI (snippet only, used for context)

### Product / UX Philosophy
Devin is built around a single thesis: **"a tireless, skilled teammate, equally ready to build alongside you or independently complete tasks for you to review"** (Cognition blog). The product *believes* the user is an engineering team lead who wants to delegate whole tasks, not a coder typing line-by-line. By 2025 the positioning has hardened: "Parallel cloud agents for serious engineering teams" — multi-repo, multi-week projects, an "army of Devins." The philosophy is **trust-by-default + fleet orchestration**, not pair-programming.

UX Philosophy: **calm + async + review-gated**. The user is not expected to watch the agent type. Work is dispatched (Slack, Linear, GitHub, Datadog) and reviewed after the fact as a PR. There is no "inline ghost text" UI — Devin's interface is the *workspace* (Slack/Linear/IDE) the team already lives in.

### Mental Model
**Teammate / "AI software engineer"** (literal product name). Not "intern" (which Sweep uses), not "pair" (which Aider/Copilot use). The teammate framing is reinforced by org-chart integration: "Assign Devin tickets directly in Linear, or add a Devin label" — Devin shows up where humans show up.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: Work is organized by *channels of delegation* (Slack, Linear tickets, GitHub PRs, the Devin web app) rather than by project. Devin is essentially headless — the user's existing tools are the IA.
- **Interaction Design (primary loop)**: write ticket → tag Devin → bot acknowledges + posts plan → draft PR appears → comment to revise → merge. The "primary loop" happens *outside* Devin's own UI, in GitHub/Linear/Slack.
- **Cognitive Load**: shifted from "watch agent work" to "write good tickets + review PRs". Load is front-loaded in issue-writing and back-loaded in PR review. Mid-flight load is near zero (it's async).
- **Progressive Disclosure**: Plan → draft PR → diff view → review. Two layers of approval gates (plan comment, PR merge) before work touches main.

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: the user leads at the *task-assignment* step; Devin leads during *execution*; user reviews at PR.
- **Agent visualization**: Real-time progress reports via chat ("reports on its progress in real time, accepts feedback, and works together with you through design choices as needed"). Has shell + editor + browser inside a sandboxed compute environment — "everything a human would need to do their work". Later Devin Review product surfaces "intelligently organize code diffs for review" + "Visual QA with full browser and desktop use".
- **Workspace UX**: Devin's own web app shows the sandbox (shell/editor/browser) live; but the day-to-day UX happens in the team's Slack/Linear/GitHub. Multi-window by design.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: Devin is *designed* for multi-week, multi-repo projects ("Devin gets better over time by reading past session trajectories"). Reviewer fatigue is the long-session risk; mitigated by DeepWiki auto-docs ("Comprehensive visibility into systems your team hasn't built").
- **Keyboard Driven**: Not a primary axis — Devin's surface is chat/PR, which is keyboard-driven by Slack/GitHub convention, but Devin itself doesn't optimize for keyboard.
- **Visual Hierarchy**: in PRs — summary first, then file diffs, then conversation. In web app — sandbox panes (shell/editor/browser) with the agent's narration on top.
- **Motion Design**: Agent's live actions in the sandbox are the motion — typing in shell, browser scrolls, code edits — framed as "watching a teammate's screen".
- **Design System**: Marketing site uses clean tech-startup aesthetic; product inherits Linear/Slack/GitHub chrome.
- **Accessibility**: Low priority relative to enterprise workflow.
- **Performance Perception**: Because work is async, "latency" is measured in *task completion time* (10s of minutes per sub-task per Nubank case), not keystroke latency. Speed is communicated via progress comments, not spinner animations.
- **Explainability**: "Complete audibility at each step" — every Devin action is logged in the session; DeepWiki auto-generates system diagrams for legacy codebases.
- **Trust Building**: Human-in-the-loop is the *only* trust mechanism — Devin never merges its own PR. Trust is built through fine-tuning benchmarks ("doubling of task completion scores after fine-tuning, 4x improvement in task speed") and through compounding reliability ("started to avoid rabbit holes more often").
- **DX specifics**: Tag-based invocation in Linear ("add a Devin label"), Slack @-mention routing, GitHub PR-reviewer-style feedback loop, Devin API + Devin Automations for fully headless operation.
- **Power UX**: Fleet of Devins in parallel, custom fine-tuned Devins per codebase, headless Devin via API, scheduled chores, E2E testing, browser-task automation.

### ONE defining interaction
**Tag @Devin in a Linear ticket, walk away, and come back to a draft PR with a plan + diffs + visual QA.** The defining interaction is *asynchronous delegation through an existing team channel* — Devin's "UI" is the Linear ticket itself.

### What problem did each idea SOLVE?
- **Async delegation surface** solves "I don't want to watch an agent type for 40 minutes" — work continues while the user does something else.
- **Fleet / parallel Devins** solves "the migration is 100,000 data classes × 1,000 engineers" — pure scale.
- **Fine-tuning per codebase** solves the generic-model accuracy problem on bespoke legacy code (COBOL/.NET/Talend ETL).
- **DeepWiki** solves "the team that built this is gone" — institutional memory transfer.
- **Human-only merge** solves "I cannot trust an AI to ship without review" — gate-keeping.

### Ideas → ADOPT / ADAPT / REJECT
1. **Async delegation via ticket/mention → ADAPT**. MiMo is single-user, so no Linear/Slack routing — but the *pattern* of "dispatch task → walk away → return to review" maps perfectly to MiMo's Project/Agent pipeline. The Agent Dock should let owner dispatch a long-running task to a background agent and get notified when done.
2. **Sandboxed shell+editor+browser live pane → ADOPT**. Maps 1:1 to MiMo's ExecutionTrace + Artifact-as-runtime pattern (already validated by Claude Artifacts/Pyodide in Group A). Devin confirms it.
3. **"Army of Devins" parallel fleet → REJECT for default, ADAPT for power mode**. MiMo is single-user, daily multi-hour — the owner rarely needs 50 parallel agents. But a *bounded* parallel fleet (2–4 agents for a multi-file refactor) is worth keeping as a power-user escape valve.
4. **Fine-tuning per codebase → REJECT**. MiMo is a personal OS, not an enterprise product. The owner's "fine-tuning" is memory + project-context, not model fine-tuning.
5. **DeepWiki auto-docs → ADOPT**. For any project MiMo manages, auto-generate a living "Project Memory" doc with diagrams. Aligns with MiMo's Project-as-memory-scope pattern from Group A.
6. **Human-only merge gate → ADOPT**. MiMo should never auto-apply code changes without explicit accept; aligns with Cursor's per-file accept/reject (Group B #5).
7. **"Teammate" mental model + Linear/Slack as surface → REJECT**. MiMo is one owner; "teammate" framing breaks the personal-OS identity. Use "agent" or "assistant" instead.

---

## 2. Claude Code (Anthropic) — verified via
- https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously (Sep 29 2025)
- https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built (Sep 23 2025 — Gergely Orosz deep-dive with founding engineers Boris Cherny, Sid Bidasaria, PM Cat Wu)

### Product / UX Philosophy
Claude Code is built on a radical principle: **"We want people to feel the model as raw as possible"** (Boris Cherny). The team deletes UI scaffolding with every model release: *"with the 4.0 models, we deleted around half the system prompt because we no longer needed it"*. The product *believes* the model is the product; UI should get out of the way. Quote: *"a lot of coding products, they get in the way of the model; they add scaffolding... so that the model running in those tools feels like it's hobbling on one foot."*

UX Philosophy: **terminal-native, keyboard-driven, minimal-chrome, "raw model"**. The Anthropic news post (Sep 29 2025) explicitly introduces "terminal UX updates" alongside a VS Code extension — but the terminal remains the canonical surface. Cat Wu's framing: it's for engineers who *prefer* terminals.

### Mental Model
**Tool** — not a teammate, not a pair, not an intern. Claude Code's own team describes it as *"just a lightweight shell on top of the Claude model"* — a control surface, not a colleague. Boris: the model "Defines the UI, and exposes hooks for the model to modify it. Exposes tools for the models to use... then gets out of the way."

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: The conversation *is* the IA. Slash-commands (/model, /rewind, /todo), prompt history (Ctrl+R), and the workspace's filesystem are the only navigational structures. No sidebar, no tabs — just the REPL.
- **Interaction Design (primary loop)**: type instruction → Claude proposes file edit → seek permission → user grants once / grants always / rejects → Claude edits locally. Permission gate is the rhythm.
- **Cognitive Load**: Surprisingly low *per keystroke* but high *per session* — the user must read diffs in-terminal and remember which file is being changed. Boris's todo-list prototypes (see #3 below) were an attempt to lower this.
- **Progressive Disclosure**: Permission prompts surface only when Claude needs to act. Subagents/hook/background-tasks are invisible until invoked.

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: User leads (issues commands), Claude executes within a permissions envelope. Permission system is the *most complex part of Claude Code* per Boris.
- **Agent UX**: Todo list rendered inline near the spinner, Ctrl+T toggles full list. Subagent spawns shown inline. The terminal *is* the canvas — there is no separate "agent view".
- **Workspace UX**: Single REPL pane. New VS Code extension (Sep 2025 beta) adds a "dedicated sidebar panel with inline diffs" — a richer graphical alternative for IDE users. Two surfaces, one product.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: 1 hour — comfortable; Ctrl+R history + todos keep context. 1 day — risk of context drift; **Checkpoints** (Sep 2025) solve this: "automatically saves your code state before each change, and you can instantly rewind by tapping Esc twice or using the /rewind command" — restores code, conversation, or both. This is THE long-session feature.
- **Keyboard Driven UX**: Every primary action is keyboard: Ctrl+R (prompt history), Ctrl+T (todos), Esc Esc (rewind), /command (slash grammar). Boris: "intuitive arrow key selection that needed no explanation".
- **Visual Hierarchy**: Spinner+todo at the cursor; permission prompt when action needed; tool calls render inline as bold headings; recent tool call result truncated. Eye goes to the spinner first.
- **Motion Design**: Pragmatic Engineer article describes ~20 prototype iterations on the todo list — including animated "drawer" slide-in (prototype #5/#6) that was abandoned. Final motion is minimal: spinner rotation, fade-in tool calls. Motion is *informational* (status) not *decorative*.
- **Design System**: Built on **TypeScript + React + Ink + Yoga + Bun** (terminal React rendering). 90% of Claude Code is written by Claude Code itself. The "design system" is Ink components in the terminal.
- **Accessibility**: Terminal-based — inherits terminal accessibility (screen-reader-friendly plain text, high contrast, no JS). Strong base.
- **Performance Perception**: Runs locally (no virtualization) — *"the team decided to go with a version that runs locally because: simplicity!"* Local = fast file ops. ~5 internal releases/engineer/day = rapid iteration perception.
- **Explainability**: Todo list is the explanation. Each todo is a step. Subagent spawn is named (e.g., "spinning up a backend API while the main agent builds the frontend").
- **Trust Building**: Permission system + Checkpoints + the "Learning" output style ("a collaborative style where Claude asks you to do small tasks yourself"). Trust is built by *stopping* the user before irreversible action and by *rewind* being one keystroke away.
- **DX specifics**: npm install -g @anthropic-ai/claude-code. Hooks (custom shell commands), MCP support, output styles (Explanatory / Learning / custom), settings.json multi-tier (per-project / per-user / per-company, shareable with team).
- **Power UX**: Subagents (parallel development workflows), hooks (auto-run tests after edits), background tasks (long-running dev servers), Claude Agent SDK for custom agents, /rewind to checkpoint, custom output styles, MCP server integration.

### ONE defining interaction
**Type an instruction in terminal → Claude proposes file change → permission prompt → "y" → Claude edits → Esc Esc if you want to rewind.** The defining interaction is the *permission-gated terminal loop* with rewind as the safety valve.

### What problem did each idea SOLVE?
- **"Raw model" minimal-chrome** solves "the IDE fights the model" — Claude sees the filesystem, reads imports, recurses, and answers without UI scaffolding blocking it.
- **Checkpoints + Esc Esc rewind** solves "I delegated too much and now I'm scared" — instant rollback to any prior state.
- **Permission system (once/always/reject)** solves "I trust the model but I don't trust it THAT much" — granular opt-in.
- **Ink + Yoga React-in-terminal** solves "how do you build a beautiful TUI fast" — React declarativity in a terminal canvas.
- **Learning output style** solves "junior devs need to learn, not just receive code" — Claude assigns small tasks back to the user.
- **Settings.json multi-tier (project/user/company)** solves "team-wide safe defaults" — share whitelisted commands.

### Ideas → ADOPT / ADAPT / REJECT
1. **"Raw model" minimal-chrome philosophy → ADOPT**. MiMo's conversation-spine IS the raw-model philosophy. Don't scaffold the model into a wizard; let it speak directly. Group A's GLM/Z.ai finding ("single-agent-with-search-loop over multi-agent decomposition") aligns.
2. **Checkpoints + Esc Esc rewind → ADOPT**. Critical for MiMo long sessions. Owner should be able to rewind conversation *and* workspace state to any prior checkpoint with one keystroke. Add to MiMo Design Spec as a first-class primitive.
3. **Permission gate (once/always/reject + static analysis) → ADOPT**. MiMo's agent should never delete/overwrite without explicit grant; static-analysis pre-check ("is this command already whitelisted in settings?") is brilliant and cheap.
4. **Multi-tier settings (project/user/"company") → ADAPT**. For MiMo single-user: project-tier + global-tier (no company-tier needed). Per-project settings.json is exactly MiMo's Project-as-config pattern.
5. **Output styles (Explanatory / Learning / custom) → ADOPT**. Excellent for MiMo — owner toggles between "just do it" vs "teach me" vs "collaborate". Maps to MiMo's per-prompt reasoning toggle from Group A.
6. **Ink + Yoga React-in-terminal stack → REJECT** (for MiMo). MiMo is a desktop/web OS, not a TUI. But the *principle* — "pick the stack the model is best at" — applies. Choose React/Next because Claude/GPT-4 are strongest at TypeScript+React.
7. **Subagents (parallel frontend/backend) → ADAPT**. MiMo's pipeline can spawn a subagent for an isolated sub-task (e.g., "write tests while I continue"). Bounded parallelism, not unbounded fleet.
8. **Hooks (auto-run tests after edits) → ADOPT**. MiMo should let owner attach shell hooks to lifecycle events (post-edit, pre-commit, on-error). Plugin-ready.
9. **Todo list as primary explainability surface → ADOPT**. MiMo's ExecutionTrace panel should render as a live todo list — Prototype #7-#9 ("always show above the input, truncate at 5, 'and 4 more'") is the right answer.
10. **~20 prototype iterations per feature → ADOPT (process)**. The MiMo team should adopt rapid-prototyping-with-the-agent as a build method.

---

## 3. Aider — verified via
- https://aider.chat/ (product homepage, primary)
- Search snippets: openreplay.com (Nov 18 2025), Medium user journey, codegen.com 2026 review

### Product / UX Philosophy
Aider's homepage tagline is the philosophy: **"AI pair programming in your terminal."** It *believes* the user is an existing-project owner who wants a tight, git-centric edit loop with any LLM they choose. Three numbers dominate the homepage: 44K GitHub stars · 6.8M installs · 15B tokens/week — Aider positions itself as the **open-source, model-agnostic, git-native** alternative to closed coding tools.

UX Philosophy: **terminal-native, keyboard-driven, transparent (git is the audit log), zero-magic**. Aider auto-commits with "sensible commit messages" — the git history IS the explanation. Calm, not dense. The user owns the loop.

### Mental Model
**Pair programmer** (literal product description). Not an intern (Sweep) or teammate (Devin). A peer who edits alongside you and you both watch the diff. The git integration is the contract — every Aider change is a commit, every commit is reviewable, every review is `git revert`.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: Repository = workspace. Chat is the only other pane. Files appear/disappear in git diff. **Repo-tree map** ("Aider makes a map of your entire codebase") is a secondary IA for navigation.
- **Interaction Design (primary loop)**: `aider` in repo → type request in chat → Aider edits files → Aider auto-commits → `git diff` to review → `git revert` if wrong. Voice-to-code and image-paste are alternate inputs.
- **Cognitive Load**: Low — only two surfaces (chat + git diff). No settings panels, no project hierarchy, no dashboards. The cost is mental tracking of which file Aider touched, mitigated by atomic commits.
- **Progressive Disclosure**: Chat → file changes → commit message → git log. Default view is minimal; power features (/commands, in-IDE mode, web chat bridge) reveal on demand.

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: User leads (issues requests); Aider proposes edits; user reviews via git.
- **Agent UX**: No live agent-streaming UI like Devin's sandbox. The agent's "work" surfaces as a commit. Linting + tests run automatically post-edit ("Automatically lint and test your code every time aider makes changes. Aider can fix problems detected by your linters and test suites.")
- **Workspace UX**: Terminal split — chat left, git diff right (or in-IDE via /end-vim-mode / VS Code extension). "In your IDE: ask for changes by adding comments to your code and aider will get to work" — code-comment-as-prompt is a unique interaction.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: git log + atomic commits make long sessions trivially resumable. Each commit is a save point. Singularity benchmark (88%) measures "how often a session produces the right code without intervention".
- **Keyboard Driven UX**: Pure terminal — every action is keyboard. In-IDE mode lets you write `#` comments that Aider picks up.
- **Visual Hierarchy**: Chat input dominates; tool calls render inline; git diff is the result. Spinner while LLM thinks.
- **Motion Design**: Minimal — terminal. Spinner + streaming token output is the only motion.
- **Design System**: Python CLI tool; no formal design system. Rich-text terminal formatting (colors, panels).
- **Accessibility**: Terminal-based = inherits terminal accessibility. Voice-to-code ("Speak with aider about your code!") is itself an accessibility feature.
- **Performance Perception**: Feels instant for short edits. Long refactors stream tokens visibly. Auto-commit feels snappy.
- **Explainability**: Git is the explanation. Every change has a commit message Aider wrote. `git log --oneline` is the audit trail.
- **Trust Building**: Atomic commits + `git revert` = unlimited undo. Local LLM support (DeepSeek, local Ollama) = no data leaves the box. Open-source Apache 2.0 = inspectable.
- **DX specifics**: `pip install aider-install && aider-install`. Model-agnostic (Claude 3.7, DeepSeek R1, o1, o3-mini, GPT-4o, local). /commands for in-IDE. Browser-paste bridge for web-chat LLMs.
- **Power UX**: 100+ languages, repo-tree map, voice-to-code, image+webpage context, custom prompts, /commands, configurable per-LLM, browser bridge.

### ONE defining interaction
**Type a request → Aider edits files and immediately commits with a generated message → you `git diff` to review → `git revert HEAD` to undo.** The defining interaction is **git-as-undo** — every agent action is atomic, reviewable, revertible.

### What problem did each idea SOLVE?
- **Auto-commit per edit** solves "I made 50 changes and don't know what broke" — every change is a checkpoint.
- **Repo-tree map** solves "LLM context window can't see the whole repo" — Aider builds a hierarchical map.
- **Model-agnostic** solves "vendor lock-in" — bring any LLM, even local.
- **Voice-to-code** solves "hands-busy / accessibility / mobile coding" — speak the change.
- **Browser bridge** solves "I only have a ChatGPT subscription, not an API key" — copy/paste hand-off.
- **In-IDE comment-as-prompt** solves "context-switching between editor and chat" — write `#` in code, Aider sees it.

### Ideas → ADOPT / ADAPT / REJECT
1. **Git-as-undo (atomic commits per edit) → ADOPT**. MiMo's Project workspace should auto-snapshot every agent action with a generated message, and `git revert`-equivalent should be one keystroke. Aligns with Claude Code's Checkpoints pattern — same idea, git-native implementation.
2. **Repo-tree map for context → ADOPT**. MiMo's Project should maintain an auto-built map of the entire codebase as memory/context. Cheap to build, high LLM-quality payoff.
3. **Model-agnostic → ADOPT**. MiMo should let owner plug in any LLM (already does via ZAI SDK + config). Critical for personal OS.
4. **Voice-to-code → ADOPT**. Already in MiMo scope (Group D Accessibility). Aider validates the use case.
5. **Browser-bridge for web-chat LLMs → REJECT**. MiMo has its own API access; no need for hand-off.
6. **In-IDE comment-as-prompt (`#` in code) → ADAPT**. For MiMo, "select text in any canvas + ⌘⇧Tab = quick AI on selection" (already in MiMo spec from Group D) is the generalization. Comment-as-prompt is the code-canvas specific instance — keep it.
7. **Pure terminal surface → REJECT** (for MiMo). MiMo is a desktop/web OS with canvas-per-mode; terminal-only breaks the identity. But Aider's *minimalism* is a north star — every chrome element must earn its place.
8. **Apache 2.0 open-source → N/A**. MiMo is a personal project, not distributed; principle is "inspectable agent behavior", which MiMo should honor via open ExecutionTrace.

---

## 4. Sweep.dev — verified via
- https://skywork.ai/skypage/en/sweep-ai-development-guide/1976898964182593536 (Oct 14 2025 — deep dive)
- Search snippets: github.com/sweepai, sweep.dev, TechCrunch, skywork feature comparison

### Product / UX Philosophy
Sweep is positioned as **"an AI agent designed to function like a junior developer on your team"** (skywork deep-dive). The product *believes* the user is a senior dev who wants to offload repetitive "software chores" — bug fixes, refactors, docs — to a junior who writes the PR for review. Founders William Zeng and Kevin Lu built it from frustration at Roblox: "developers were losing hundreds of hours per week on mundane tasks". 

UX Philosophy: **issue-to-PR async, with codebase-wide context**. The user doesn't watch Sweep work in real time — they write a GitHub issue, Sweep reads the entire repo (AST + vector search), writes code, and submits a PR. **The issue tracker IS the UX.**

### Mental Model
**Junior developer** (literal). Distinct from Devin's "teammate" (peer-level) and Aider's "pair programmer" (equal). Junior = needs clear instructions, writes drafts for senior review. Skywork article: "you ask it to 'fix this bug' or 'refactor this module'... it then independently plans and executes the changes, culminating in a pull request."

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: GitHub issues = task list. Sweep bot's plan comment = task breakdown. Draft PR = work product. JetBrains plugin = in-IDE autocomplete.
- **Interaction Design (primary loop)**: write issue → @sweep-ai mention → bot comments with plan → draft PR appears → comment to revise → merge. Two-path setup: GitHub App (agentic) + JetBrains plugin (autocomplete).
- **Cognitive Load**: front-loaded in issue-writing ("the key is to write the issue as if you're instructing a human junior developer"); mid-flight zero (async); back-loaded in PR review.
- **Progressive Disclosure**: issue title → issue body → bot plan comment → PR draft → diff → file changes. Three approval gates (issue creation, plan acknowledgement, PR merge).

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: User leads at issue-authoring; Sweep leads during execution; user reviews PR.
- **Agent UX**: Sweep's "work" is visible as (1) the plan comment on the issue, (2) the draft PR with summary + diffs. No live sandbox view like Devin. The agent is *headless from the user's IDE*.
- **Workspace UX**: Two surfaces — GitHub (issue/PR) and JetBrains IDE plugin. Plugin provides "Next-Edit Autocomplete" + "Sweep: Edit Selection" right-click action.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: Built for *repeated* small delegations, not a single long session. The PR-review loop is the unit of work.
- **Keyboard Driven UX**: Inherits GitHub/IDE shortcuts. No Sweep-specific keyboard layer.
- **Visual Hierarchy**: In PR — summary first, file list, diff. In IDE — autocomplete popup, right-click menu.
- **Motion Design**: Bot comment appears; PR appears; autocomplete popup fades in. Minimal motion.
- **Design System**: Inherits GitHub + JetBrains chrome.
- **Accessibility**: Inherits GitHub/IDE accessibility.
- **Performance Perception**: "Within a minute, Sweep's bot commented on the issue, acknowledging the task and outlining its plan" — sub-minute plan feedback. PR generation in minutes.
- **Explainability**: Plan comment before PR = the explanation. AST + vector search = "codebase-wide context" is the *claim* of correctness.
- **Trust Building**: Human-in-loop PR review mandatory; "Sweep does not train its core models on customer code". PR format is familiar (looks like a human junior's PR).
- **DX specifics**: GitHub App install (one click), JetBrains plugin (marketplace), @sweep-ai mention, natural-language issue body, PR-comment-based feedback loop.
- **Power UX**: Custom prompts, multi-file refactors, "Next-Edit Autocomplete" predicts next *intent* across files (e.g., after editing a function, suggests updating its test in another file).

### ONE defining interaction
**Write a GitHub issue with "Sweep: ..." prefix → Sweep bot comments with a plan within a minute → draft PR with summary and diffs appears → comment to revise or merge.** The defining interaction is **issue-as-task-delegation** — natural-language issue becomes a complete PR.

### What problem did each idea SOLVE?
- **Issue-to-PR async** solves "I have 50 small bugs in backlog" — bulk delegation.
- **AST + vector search engine** solves "the LLM can't see the whole repo" — codebase-wide context via retrieval.
- **"Next-Edit Autocomplete"** solves "after I edit function X, I have to remember to update test X" — predictive cross-file intent.
- **JetBrains focus** solves "Copilot/Cursor are VS Code-only" — JetBrains ecosystem loyalty.
- **Plan-before-PR comment** solves "I don't trust the AI to start coding without seeing its plan first".
- **No customer-code training** solves "enterprise won't adopt if code leaks" — privacy guarantee.

### Ideas → ADOPT / ADAPT / REJECT
1. **Plan-before-execute comment → ADOPT**. MiMo's agent should post a plan (like Claude Code's todos but as a chat message) BEFORE writing code, letting owner approve/edit the plan. Reduces wasted work.
2. **AST + vector codebase search → ADOPT**. MiMo's Project should maintain an AST-indexed + embedding-indexed code map for retrieval. Critical for code-mode accuracy.
3. **"Next-Edit Autocomplete" predictive cross-file → ADAPT**. For MiMo's code-mode canvas, after editing function X, surface a peek suggesting "update test_x in test_file.py? y/n". Bounded, optional.
4. **Issue-as-task-delegation → ADAPT**. MiMo's analog: a "Task" in MiMo = a GitHub-issue-like object the owner writes once and the agent owns end-to-end. Maps to MiMo's Project task list.
5. **PR-comment-based revision loop → ADOPT**. MiMo's review/revision should be conversational ("change this back", "use try/except instead") — same loop Claude Code already uses.
6. **Junior-developer mental model → REJECT**. MiMo is single-user; "junior" implies a hierarchy the owner doesn't need. Use "agent" instead.
7. **JetBrains-only focus → REJECT**. MiMo is its own canvas, not a plugin.
8. **No-customer-code-training guarantee → ADOPT** (as principle). MiMo is local-first; nothing leaves the box. State this explicitly.

---

## 5. Sourcegraph Cody — verified via
- https://sourcegraph.com/blog/anatomy-of-a-coding-assistant (Jun 18 2024 — Yk Sugi)
- https://sourcegraph.com/blog/cody-better-faster-stronger (Feb 15 2024 — Ado Kukic)

### Product / UX Philosophy
Sourcegraph's own articulation: **"context is king"**. The product *believes* that what makes a coding assistant good is not the model but the *context fetched* around the user's query. The blog title "The anatomy of a coding assistant" reveals the philosophy: this is engineering, not magic.

UX Philosophy: **"product of products"** — Cody is explicitly framed as multiple sub-products (autocomplete, chat, commands, test-gen, code-edit) with **different mental models and different requirements per sub-product**. Quote: "for autocomplete, speed is key... for chat, accuracy and the quality of the responses may be more important." This is a *modality-aware* philosophy, not a single-mode assistant.

### Mental Model
**Tool with multiple modes**. Not a single teammate — a Swiss-army knife. The user shifts between modes (autocomplete while typing; chat for questions; command for one-click tasks; edit-selection for refactors).

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: 3 surfaces — autocomplete (inline ghost text), chat (sidebar panel), commands (palette). @-mention for explicit file/symbol context (@filename, @#symbol).
- **Interaction Design (primary loop)**:
  - Autocomplete: type → ghost text appears → Tab to accept.
  - Chat: Opt+L → ask question → Cody fetches context → answer with citations.
  - Commands: Opt+K palette → run generate-tests, explain, fix, etc.
- **Cognitive Load**: Low per mode — each surface has clear affordance. Risk = mode-confusion ("which surface for which task?").
- **Progressive Disclosure**: Autocomplete is invisible until triggered; chat history preserved; commands palette only on demand.

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: User leads; Cody suggests/answers; user accepts/rejects. No autonomous PRs (Cody is *assistant*, not *agent* — until AMP, the new agentic successor noted in snippets).
- **Agent UX**: Cody's "work" surfaces as ghost text, chat message, or applied edit. *Always cited*: "Cody always cites its sources. This means that you as the developer can inspect the context that was used to generate the response and easily navigate to the relevant code."
- **Workspace UX**: VS Code / JetBrains sidebar. Chat panel + autocomplete popup + command palette. @-mention chips for context. "Enhanced context visibility" feature shows what's being included.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: Chat history persists; multi-repo context (Enterprise) lets you ask about APIs in other repos without leaving editor.
- **Keyboard Driven UX**: Opt+L new chat, Cmd+K revise previous, Cmd+/ new chat in panel, Opt+K command palette, Opt+C legacy palette, Tab accept autocomplete.
- **Visual Hierarchy**: Autocomplete popup ghost-text inline (eye drawn to cursor); chat panel right sidebar (eye drawn on demand); command palette center-modal.
- **Motion Design**: Ghost text fade-in, palette modal slide-down. Minimal, functional.
- **Design System**: Built on VS Code / JetBrains design systems; Cody-specific tokens for chat bubbles, citation chips.
- **Accessibility**: Inherits VS Code/JetBrains a11y. Screen-reader-friendly chat panel.
- **Performance Perception**: "Autocompletions are now 24.1% faster for single line completions, and 24.9% faster for multi-line completions". Autocomplete uses **Jaccard similarity** (fast classical retrieval, no embeddings) — pure latency optimization.
- **Explainability**: Every chat answer cites source files; "enhanced context visibility" panel shows what was fetched. Reciprocal Rank Fusion explained in blog = transparent engineering.
- **Trust Building**: OpenCtx protocol (open source) for external context. Multi-repo context with admin-scoped access. Sourcegraph's pre-existing code-search reputation transfers trust.
- **DX specifics**: @filename / @#symbol syntax, Custom Commands (reusable prompts), multi-LLM switch (Claude, GPT-4, Mixtral, Ollama local), Ollama for air-gapped, Generate Unit Tests auto-creates test file in right location.
- **Power UX**: Custom commands, multi-LLM, Ollama local inference, multi-repo context, OpenCtx protocol for any source (Slack, Notion, Linear), legacy + new command palette.

### ONE defining interaction
**Type a question in chat (Opt+L) → Cody fetches context from your whole codebase + multi-repo + OpenCtx sources → answer with clickable source citations.** The defining interaction is **cited, multi-source-context chat** — every answer is inspectable.

### What problem did each idea SOLVE?
- **"Product of products"** solves "one-size-fits-all assistant fails at latency vs accuracy tradeoff" — each surface tuned for its requirement.
- **Jaccard similarity for autocomplete** solves "embeddings too slow for keystroke-latency" — fast classical retrieval.
- **Reciprocal Rank Fusion** solves "multiple retrieval methods disagree" — combine rankings, not scores.
- **@filename / @#symbol syntax** solves "user wants explicit control over context" — manual override.
- **Multi-repo context (Enterprise)** solves "the API lives in another repo" — cross-repo Q&A.
- **OpenCtx protocol** solves "context lives in Slack/Notion/Linear, not just code" — open standard.
- **Citation always** solves "I don't trust AI-generated code without seeing the source" — inspectable provenance.

### Ideas → ADOPT / ADAPT / REJECT
1. **"Context is king" + "product of products" → ADOPT**. MiMo's canvas-per-mode IS the "product of products" philosophy — each mode tuned for its task. Double-down.
2. **Jaccard + RRF for fast retrieval → ADOPT (where speed-critical)**. For MiMo's command palette / file search, use classical retrieval, not embeddings. Embeddings for semantic, Jaccard for keystroke-latency.
3. **@filename / @#symbol explicit context syntax → ADOPT**. MiMo already has the @ prefix grammar (Group D); formalize @filename and @#symbol as first-class.
4. **Citation always + "enhanced context visibility" panel → ADOPT**. MiMo's agent replies should always cite sources (file:line, memory-id, web-url); a "Context" peek should show what was used. Critical for trust.
5. **Multi-LLM switch per query → ADOPT**. MiMo already supports 6 models; per-query model selection (not just per-session) is the next step.
6. **OpenCtx-style protocol for external sources → ADAPT**. MiMo's "connected apps" panel (Group D) should expose a uniform @-mention protocol for any external source.
7. **Multi-repo context → REJECT (default), ADAPT (power)**. MiMo is single-user with multiple projects; "multi-project context" is the analog — usually opt-in, not default (overload risk).
8. **"Assistant, not agent" stance → REJECT**. Cody explicitly avoided autonomy; MiMo needs bounded autonomy for the canvas-per-mode vision. But Cody's *citation discipline* should carry over.
9. **Generate Unit Tests auto-creates file in right location → ADOPT**. MiMo's code-mode should auto-route generated artifacts (tests, docs, configs) to correct paths based on language conventions.

---

## 6. Amazon Q Developer (formerly CodeWhisperer) — verified via
- https://aws.amazon.com/q/developer (product homepage)
- https://aws.amazon.com/blogs/devops/april-2025-amazon-q-developer (May 1 2025 — month-in-review)

### Product / UX Philosophy
Amazon Q Developer is positioned as **"the most capable generative AI–powered assistant for software development"** with a deliberate **everywhere-the-developer-is** strategy: IDE (JetBrains/VS Code/Visual Studio/Eclipse), CLI, AWS Console, Microsoft Teams, Slack, GitHub.com, GitLab Duo. The product *believes* the developer already lives in many surfaces and the assistant should meet them there — not require a new surface.

UX Philosophy: **multi-surface, IDE-native, AWS-anchored, enterprise-grade**. Quote (April 2025 blog): "Conversation persistence, search, and export — Amazon Q Developer now gives you more control over your conversation history... preserved between sessions, letting you pick up where you left off." Calm-by-continuity.

### Mental Model
**Assistant distributed across surfaces**. Not a single teammate — a *presence* that follows the developer from IDE to console to chat app. The user's mental model is "Q is wherever I am."

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: Surface-specific (IDE sidebar / CLI REPL / AWS Console panel / Slack DM / GitHub action). Conversation persists across sessions; exportable as markdown.
- **Interaction Design (primary loop)**:
  - IDE: inline code suggestions + inline chat + vulnerability scan.
  - CLI: autocompletions + natural-language-to-bash.
  - Console: Q panel for AWS architecture help.
  - Teams/Slack: DM for ops events troubleshooting.
- **Cognitive Load**: Low per surface but high across surfaces (context doesn't always transfer). "Context control enhancements" (April 2025) — add classes/functions/global vars, 100k char context — addresses this.
- **Progressive Disclosure**: Inline suggestion → chat → agentic task (multi-step). Agentic experience "intelligently perform tasks on your behalf by automatically reading and writing files, generating code diffs, and running shell commands, while incorporating your feedback and providing real-time updates."

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: User leads; Q assists or (in agentic mode) executes with feedback loop.
- **Agent UX**: Agentic mode shows "real-time updates" as it reads/writes files, generates diffs, runs commands. Real-time feedback loop is the surface.
- **Workspace UX**: Multi-surface by design. IDE plugins inherit IDE chrome. CLI is REPL. Console panel inherits AWS Console. No single "Q workspace" — Q is a guest in each host.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: Conversation persistence + search + markdown export (April 2025) = strong long-session support. Pick up where left off.
- **Keyboard Driven UX**: Inherits IDE/CLI shortcuts. No Q-specific keyboard layer.
- **Visual Hierarchy**: Inline suggestion ghost text; chat panel right sidebar; agentic task progress as chat message stream.
- **Motion Design**: Ghost text fade-in; chat message stream; agentic task spinner. Functional.
- **Design System**: Inherits each host's design system (AWS Console, JetBrains, VS Code, Slack). Q has its own brand mark and chat bubble style.
- **Accessibility**: Inherits host a11y. Expanded language support (April 2025) for non-English speakers = inclusivity focus.
- **Performance Perception**: "Speeds up a variety of development tasks. Based on an internal study." Specific metrics quoted: 30% dev-time reduction (nnamnu), 31.2% productivity (Eviden), highest acceptance rate (BT Group). Performance = productivity claims, not latency numbers.
- **Explainability**: Agentic mode provides "real-time updates along the way" — narration as explanation. Context-control panel shows what's included.
- **Trust Building**: Enterprise-grade IAM, "Your content is yours" (Pro tier not used for service improvement), AWS Identity Center integration. Trust via *enterprise compliance*, not user-facing transparency.
- **DX specifics**: 50 agentic chat interactions/month free tier. GitLab Duo with Amazon Q (GA April 2025). MCP support in CLI (April 30 2025). Customization per company codebase (C# C++ Python Java JS TS, plus Dart Go Kotlin PHP Ruby Rust Scala Bash PowerShell CloudFormation Terraform by April 30).
- **Power UX**: MCP integration, custom codebase customization (per-language), Java 8→17 upgrade agent, .NET Windows→Linux porting agent, SWE-Bench Verified 66% (top ranking).

### ONE defining interaction
**Highlight any text in your IDE or AWS Console → press inline-chat shortcut → Q edits in place using your repo + AWS context → review diff inline.** The defining interaction is **surface-anchored inline edit** — Q meets you in the surface you're already in.

### What problem did each idea SOLVE?
- **Multi-surface presence** solves "developer context-switches between IDE, CLI, Console, Slack 50x/day" — Q follows them.
- **Conversation persistence + search + export** solves "I lost that chat from yesterday" — continuity.
- **Context control (files, folders, classes, functions, globals; 100k chars)** solves "Q suggests things that don't fit my codebase" — explicit context.
- **Customization per company codebase** solves "generic model doesn't know our internal libraries" — fine-tuning-lite.
- **Java upgrade + .NET porting agents** solves "legacy modernization is expensive" — automated transformations.
- **MCP support** solves "every tool has its own context protocol" — standardization.
- **Inline chat in Eclipse (April 2025 preview)** solves "Eclipse users felt left behind by VS Code-only Copilot" — parity.

### Ideas → ADOPT / ADAPT / REJECT
1. **Conversation persistence + search + markdown export → ADOPT**. MiMo conversations must persist, be searchable, and exportable. Critical for long-session continuity.
2. **Context control panel (files/folders/classes/functions/globals; 100k chars) → ADAPT**. MiMo's Project should let owner pin specific files/symbols as context; the size budget (100k chars) is a useful concrete number to design around.
3. **Multi-surface "presence" → REJECT**. MiMo is a single OS surface; the owner doesn't need Q in Slack too. But the *principle* — "MiMo follows you into every canvas" — is already MiMo's canvas-per-mode design.
4. **Per-codebase customization (Java/.NET legacy agents) → REJECT**. MiMo is personal, not enterprise modernization. Skip.
5. **MCP support → ADOPT**. MiMo should expose MCP as a first-class integration protocol for external tools (similar to OpenCtx).
6. **Agentic mode with real-time updates → ADOPT**. MiMo's ExecutionTrace already does this (Group A Gemini Deep Research pattern). Q confirms the pattern.
7. **Trust via enterprise compliance (IAM, "your content is yours") → ADAPT (principle)**. MiMo should state "your data never leaves your machine" prominently — local-first as trust signal, not enterprise IAM.
8. **Expanded language support for non-English → ADOPT**. MiMo already supports RTL Arabic (Group D); extend to multi-language chat (Group A GLM/Z.ai finding).
9. **Productivity claims as primary metric → REJECT**. MiMo should not lead with "30% faster" — lead with experience quality. Productivity is a side effect.

---

## 7. Tabnine — verified via
- https://www.tabnine.com/ (product homepage)
- Search snippets: Wikipedia (Jacob Jackson, 2018 origin), Gartner Peer Insights, GitHub codota/TabNine

### Product / UX Philosophy
Tabnine is the **original** AI coding assistant (Jacob Jackson, 2018 — predates Copilot). The 2025 homepage hardens the positioning: **"The Missing Layer in Enterprise AI: Context"** + **"Total Enterprise Control"** + **"Total code privacy & zero data retention"**. The product *believes* enterprises cannot adopt AI coding without (a) context about their own architecture and (b) deployment control (SaaS, on-prem, air-gapped). Philosophy = **enterprise-grade context + privacy + control**.

UX Philosophy: **autocomplete-first, IDE-native, privacy-forward**. Customer quote on homepage: "The (too big) latency was the main reason why we did not choose SourceGraph Cody... we chose Tabnine as it had better results and significantly lower latency." UX = latency-obsessed.

### Mental Model
**Coding partner that learns your style**. Homepage quote: "Tabnine is one of my favorite coding partners." Not teammate, not junior, not pair — *partner*. The "Enterprise Context Engine" (2025) extends this to: AI as a governed, context-aware teammate that "codes the way your enterprise works."

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **IA**: IDE plugin (autocomplete popup + chat panel + agentic workflows + CLI). Tabnine Context Engine is a separate IA layer — "maps dependencies, architecture, and workflows."
- **Interaction Design (primary loop)**: type code → Tab autocomplete (single-line, multi-line); chat for Q&A; agents for SDLC stages (planning, code creation, testing, docs).
- **Cognitive Load**: Low for autocomplete (one keystroke). Higher for Context Engine (enterprise admin configures architecture mapping).
- **Progressive Disclosure**: Autocomplete popup → chat panel → agentic workflow (multi-step). Context Engine surfaces "system-level understanding" only when needed.

### Human-AI Collaboration / Agent UX / Workspace UX
- **Who leads**: User leads; Tabnine suggests; user accepts (90% single-line acceptance per CI&T case).
- **Agent UX**: Autocomplete is invisible until typed; chat panel right sidebar; agentic workflows shown as multi-step progress. "AI agents for every stage of the SDLC, from planning and code creation to testing and documentation."
- **Workspace UX**: IDE plugin. Tabnine widget dashboard shows "how much of my code was generated by Tabnine" (Kevin Tuuri quote) — a productivity-confidence surface.

### Long Session / Keyboard / Visual Hierarchy / Motion / Design System / Accessibility / Performance / Explainability / Trust / DX / Power UX
- **Long Session**: Autocomplete + chat + agentic workflows. Learning "your coding style, variable naming, and architectural patterns over time" (G2 review) — personalization compounds.
- **Keyboard Driven UX**: Tab to accept autocomplete; inherits IDE shortcuts for chat.
- **Visual Hierarchy**: Autocomplete popup at cursor (eye drawn to next-token); chat panel right sidebar; widget dashboard optional.
- **Motion Design**: Autocomplete popup fade-in/slide. Minimal.
- **Design System**: IDE-inherited chrome; Tabnine purple/teal brand.
- **Accessibility**: Inherits IDE a11y.
- **Performance Perception**: Homepage emphasizes latency: "better results and significantly lower latency" than Cody (customer quote). 90% acceptance rate = feels-right suggestions.
- **Explainability**: Context Engine explains: "maps dependencies, architecture, and workflows to deliver more relevant and accurate code suggestions." Provenance & Attribution feature (2025) for IP compliance.
- **Trust Building**: "Total code privacy & zero data retention" · deploy "SaaS, on-prem, or fully air-gapped" · "no data leaves your infrastructure" · Provenance & Attribution for copyright compliance. Trust via *architectural guarantees*, not UX transparency.
- **DX specifics**: Multi-IDE (JetBrains, VS Code, Visual Studio, Eclipse, Visual Studio Code, Vim, NeoVim, VS Code Insiders), multi-model (developer choice), per-language support, agents per SDLC stage.
- **Power UX**: Context Engine (org intelligence), per-language fine-tuning, on-prem/air-gapped deployment, Provenance & Attribution, CLI agents, "AI control plane" with centralized visibility + policy enforcement.

### ONE defining interaction
**Type code → Tab to accept Tabnine's autocomplete suggestion that has learned your project's patterns and conventions.** The defining interaction is **learned-style autocomplete** — the Tab key as the trust contract.

### What problem did each idea SOLVE?
- **Latency-obsessed autocomplete** solves "Cody is too slow for keystroke-by-keystroke" — pure speed.
- **Enterprise Context Engine** solves "generic AI doesn't know our architecture" — system-level understanding.
- **Multi-deployment (SaaS / on-prem / air-gapped)** solves "regulated industries can't use cloud AI" — Zero Trust compliance.
- **Provenance & Attribution** solves "did this code infringe a copyright?" — IP legal risk.
- **Learning coding style over time** solves "Copilot feels generic" — personalization.
- **AI control plane** solves "we can't audit what 500 developers are doing with AI" — centralized governance.

### Ideas → ADOPT / ADAPT / REJECT
1. **Latency-obsessed autocomplete → ADOPT**. MiMo's code-mode autocomplete must be sub-200ms or it doesn't ship. Tabnine's Jaccard-style classical retrieval (cf. Cody) is the architecture.
2. **Learning coding style over time → ADOPT**. MiMo's memory engine should learn owner's naming/architecture patterns per-Project. Personalization is the moat.
3. **Provenance & Attribution → ADOPT (principle)**. MiMo should track which lines were AI-generated vs human-edited, with model + prompt provenance. Important for the owner to know what's "theirs" vs "AI's".
4. **Enterprise Context Engine → REJECT (enterprise framing)**, **ADAPT (personal version)**. MiMo's "Context Engine" = Project Memory + repo map + agent's accumulated learnings. Same idea, single-user scope.
5. **Multi-deployment (SaaS/on-prem/air-gapped) → ADOPT**. MiMo should run fully local-first by default; cloud sync is opt-in. Local-first = MiMo identity (Group D Linear/Bolt/Manus pattern).
6. **AI control plane (centralized visibility + policy) → REJECT (enterprise)**. MiMo is single-user; no "control plane" needed. But *self-audit* (what did the agent do this week?) is the personal equivalent — adopt as a "weekly agent activity report" view.
7. **Widget dashboard showing "% AI-generated" → ADAPT (carefully)**. Could be motivating for owner ("Tab Tab Tab and I've got my code") but risks productivity-anxiety. Make it opt-in, in the Developer panel.
8. **Multi-IDE support → REJECT**. MiMo is its own canvas. Don't try to be a plugin everywhere.

---

# Cross-Product Takeaway (15 lines)

1. **Mental models diverge sharply**: Devin = teammate, Aider = pair, Sweep = junior, Claude Code = tool, Cody = Swiss-army knife, Q Dev = distributed presence, Tabnine = partner. MiMo should pick **"agent"** — neutral, scalable, fits single-user OS.
2. **Two dominant interaction archetypes**: (a) **async delegation via ticket** (Devin, Sweep) — dispatch + walk away + review PR; (b) **live permission-gated loop** (Claude Code, Aider) — type → approve → edit → undo. MiMo needs BOTH, switchable per task.
3. **"Raw model" minimal-chrome (Claude Code) vs "product of products" modal-awareness (Cody)**: MiMo should adopt Claude Code's minimalism for the conversation-spine, but Cody's modal-tuning per canvas. Both are right at different layers.
4. **Checkpoints / rewind / atomic commits / git-as-undo** — appears in Claude Code (Esc Esc), Aider (auto-commit), Devin (PR review). Universal pattern. MiMo MUST have one-keystroke workspace+conversation rewind.
5. **Citation + source transparency** (Cody "always cites", Claude Code Learning style, Q Dev context control panel) is the universal trust mechanism. MiMo's agent replies must cite sources (file:line, memory-id, web-url).
6. **Plan-before-execute** (Sweep plan comment, Claude Code todos, Devin real-time progress reports) — the agent should post a plan and let owner approve/edit before coding.
7. **Context-as-product** is universal: Cody embeddings + RRF, Sweep AST + vector, Aider repo-tree map, Q Dev context control, Tabnine Context Engine. MiMo needs an explicit Context Engine = Project Memory + repo map + retrieval.
8. **Permission gating (Claude Code once/always/reject + static analysis)** is the gold standard for autonomous action safety. MiMo should never delete/overwrite without grant; pre-check settings.json whitelist.
9. **Latency still wins** — Tabnine's whole pitch is "we're faster than Cody." MiMo's autocomplete must be sub-200ms; use classical retrieval (Jaccard/RRF) where keystroke-latency matters, embeddings only for semantic search.
10. **Subagents + hooks + background tasks** (Claude Code) — the trifecta for bounded autonomy. MiMo should spawn a subagent for isolated sub-tasks, auto-run tests after edits, keep dev-server running in background.
11. **Output styles / modes** (Claude Code Explanatory/Learning/custom) — owner toggles between "do it" / "teach me" / "collaborate". Maps to MiMo's per-prompt reasoning toggle (GLM pattern, Group A).
12. **Local-first as trust signal** — Aider (local LLMs), Tabnine (air-gapped), Claude Code (no virtualization, runs locally). MiMo is local-first; state "your data never leaves your machine" prominently.
13. **Productivity-percentage dashboards** (Tabnine "% AI-generated", Q Dev "30% faster") — risky. MiMo should NOT lead with productivity metrics; lead with experience quality. Optional Developer-panel metric only.
14. **~20 prototype iterations per feature** (Claude Code) — adopt as MiMo's build process. The agent accelerates prototyping 5–10x; use it.
15. **Multi-surface strategy** (Q Dev in IDE+CLI+Console+Slack+GitHub) is enterprise-grade; MiMo is single-surface-by-design (canvas-per-mode). The *principle* (MiMo follows you into every canvas) is already MiMo's identity. Don't dilute it by adding Slack/GitHub integrations as primary surfaces.

---

## Verified Source URLs

1. https://cognition.com/blog/introducing-devin (Devin, primary, Mar 12 2024)
2. https://devin.ai/ (Devin product homepage, accessed Aug 2026)
3. https://en.wikipedia.org/wiki/Devin_AI (Devin context)
4. https://www.anthropic.com/news/enabling-claude-code-to-work-more-autonomously (Claude Code, Sep 29 2025)
5. https://newsletter.pragmaticengineer.com/p/how-claude-code-is-built (Claude Code deep-dive, Sep 23 2025)
6. https://www.latent.space/p/claude-code (Claude Code Latent.Space podcast, May 7 2025 — snippet only)
7. https://aider.chat/ (Aider homepage)
8. https://blog.openreplay.com/getting-started-aider-ai-coding-terminal (Aider getting started, Nov 18 2025 — snippet)
9. https://codegen.com/ai-tools/aider (Aider review 2026 — snippet)
10. https://skywork.ai/skypage/en/sweep-ai-development-guide/1976898964182593536 (Sweep deep dive, Oct 14 2025)
11. https://sweep.dev/ (Sweep homepage)
12. https://github.com/sweepai/sweep (Sweep GitHub)
13. https://sourcegraph.com/blog/anatomy-of-a-coding-assistant (Cody, Jun 18 2024)
14. https://sourcegraph.com/blog/cody-better-faster-stronger (Cody, Feb 15 2024)
15. https://aws.amazon.com/q/developer (Q Developer homepage)
16. https://aws.amazon.com/q/developer/build (Q Developer agentic build)
17. https://aws.amazon.com/blogs/devops/april-2025-amazon-q-developer (Q Developer April 2025 recap, May 1 2025)
18. https://www.tabnine.com/ (Tabnine homepage)
19. https://en.wikipedia.org/wiki/Tabnine (Tabnine history — snippet)
20. https://www.gartner.com/reviews/product/tabnine (Tabnine Gartner — snippet)

**Research method**: 7 parallel `web_search` invocations (one per product) → 11 `page_reader` invocations on best URLs. All page reads succeeded. HTML stripped to text via Python; concrete quotes extracted verbatim.
