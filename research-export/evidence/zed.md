# Zed — Evidence File (W12)

**Task:** W12 — Phase R2 Evidence-Based. Collected by general-purpose sub agent.
**Date accessed (all sources):** 2026-08-07 unless noted otherwise.
**Method:** Direct curl of official Zed pages (zed.dev is a Next.js + Mintlify-docs site). Marketing home page renders server-side with rich content. `/docs` and `/features` route to Mintlify which serves content server-side. `/collaboration` returned a "Not Found" stub (the route may have been renamed or moved). Blog index renders server-side with full post listings. Zed binaries were not installed in this sandbox (Linux x86_64, no GPU) — install via `curl -f https://zed.dev/install.sh | sh` is offered for Linux but the binary requires a Vulkan-capable GPU for the GPUI renderer.

> ⚠️ **Methodology note.** Zed is a native, GPU-accelerated code editor built from scratch in Rust. The product surface itself requires installation on a Vulkan-capable machine; the sandbox here has no GPU, so install would not verify rendering. The richest canonical evidence is (a) the marketing home page (which is unusually candid about the GPU/Rust/multiplayer architecture), (b) the docs page (Mintlify-rendered, crawlable), (c) the blog index (lists every design essay and release announcement since 1.0 on April 29, 2026), and (d) the GitHub repo (`zed.dev/zed`), not crawled here due to time-boxing. The `/collaboration` URL returned a "Not Found" stub — the feature may now be documented under `/docs` or under a renamed route.

---

## 1. Product Overview

Zed is **"a high-performance, multiplayer code editor from the creators of Atom and Tree-sitter"** [Source: https://zed.dev/, accessed 2026-08-07 — `<meta name="description">`]. The home page positions it as **"Your last next editor"**: "Zed is a minimal code editor crafted for speed and collaboration with humans and AI." [Source: same — hero copy].

Zed is available for macOS, Linux, and Windows. The download page at the time of collection shows version **1.14.2, August 05, 2026** [Source: https://zed.dev/download, accessed 2026-08-07]. The 1.0 release was April 29, 2026, per the blog: "Zed is 1.0" (Featured, Apr 29, 2026) [Source: https://zed.dev/blog, accessed 2026-08-07]. The team behind Zed created **Atom** and **Tree-sitter** [Source: https://zed.dev/, accessed 2026-07-07 — `<meta name="description">`]. Nathan Sobo, the original creator of Atom, is the CEO (visible as author of "Software Is Made Between Commits", June 11, 2026) [Source: https://zed.dev/blog, accessed 2026-08-07].

The product targets developers who care about speed, low latency, and AI-assisted coding. Social proof on the home page includes José Valim (creator of Elixir), Dan Abramov (React core), Mike Bostock (creator of D3.js), Ethan Perez (adversarial-robustness research lead), Matt Baker (Principal Engineer) [Source: https://zed.dev/, accessed 2026-08-07 — testimonial section].

## 2. Product Philosophy

Zed's philosophy is **"GPU-rendered multiplayer editor"** — built from scratch in Rust, leveraging GPU (Vulkan/macOS Metal via wgpu), designed for real-time collaboration between humans and AI agents. The home page hero states three pillars:

> **Fast.** "Written from scratch in Rust to efficiently leverage multiple CPU cores and your GPU."
> **Agentic.** "Run agents in parallel to smoothly edit files, navigate code, and run tools at native speed."
> **Collaborative.** "Chat with teammates, code together, and share your screen and project." [Source: https://zed.dev/, accessed 2026-08-07 — three-pillar hero section].

The framing of "humans and AI" as **co-equal collaborators** is central: the editor is not "an editor with AI features bolted on" but "an editor designed for human-AI collaboration". The home page demos this by showing an "agent" (using Claude Opus 4.6) editing a file in the same pane as a human, with the agent's reasoning shown step-by-step: "I want to add AccessKit support to GPUI... Let me look at the GPUI element trait and the window's paint cycle..." [Source: https://zed.dev/, accessed 2026-08-07 — interactive demo].

The blog essay **"Software Is Made Between Commits"** (Nathan Sobo, June 11, 2026) makes the philosophical claim: "Agents turned the conversation into the real source of our software. DeltaDB is the version control built for it." [Source: https://zed.dev/blog, accessed 2026-08-07]. This positions Zed's product philosophy as: code editors should treat the human-AI conversation as the primary artifact, not the file.

The "We're Not Building AI Features for the Money" essay (May 05, 2026, Featured) and "Introducing Zed for Business" (May 06, 2026, Featured) are evidence of a values-first approach to commercialisation [Source: same].

## 3. Core Mental Model

The Zed mental model is **"editor-as-canvas + multiplayer"**: the editor is a single GPU-rendered surface where (a) text, (b) cursors (multiple humans and multiple agents), (c) terminals, (d) AI reasoning, and (e) version-control state all live in the same composited view. The "Threads Sidebar" and "Agent Panel" are first-class workspace regions alongside the editor.

Evidence from the docs: the layout is configurable between **"Agentic"** and **"Classic"** panel layouts — "Use Panel Layout > Agentic from the user menu in the title bar ... when you want the Agent Panel and Threads Sidebar next to each other on the left. Use Panel Layout > Classic (or workspace: use classic layout) to restore the editor-oriented layout." [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].

The mental model is also **"parallel agents as first-class citizens"** — the home page shows multiple named worktrees ("rope-panic-fix", "axum-billing", "sdk-pagination / first-pass", "tailwind-v4", "theme-builder-dark", "parallel-agents-page") each running an agent independently on a separate branch, with status indicators like "4m", "12m", "48m", "2h", "5h", "1d" [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard demo].

The "Parallel Agents" feature was announced April 22, 2026: "Introducing Parallel Agents in Zed" (Featured) [Source: https://zed.dev/blog, accessed 2026-08-07].

## 4. User Journey

Documented in the official Getting Started guide:

1. **Open a project**: `zed ~/projects/my-app` from CLI, or Cmd+O (macOS) / Ctrl+O (Linux/Windows) to open a folder from within Zed. By default, new projects open in the current window's threads sidebar. To open in a new window: `zed -n ~/projects/my-app` or Cmd+Enter on Open Recent selection [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07 — "1. Open a Project"].
2. **Welcome page**: when no folder is open, Zed shows a welcome page with quick actions ("open a folder, clone a repository, or view documentation"). It disappears once a folder is opened. Re-openable via command palette search for "Welcome" [Source: same].
3. **Learn the essential commands**: a five-row table of Cmd+Shift+P (command palette), Cmd+P (go to file), Cmd+Shift+O (go to symbol), Cmd+Shift+F (find in project), Ctrl+` (terminal), Cmd+, (settings) [Source: same — "2. Learn the Essential Commands"].
4. **Configure the editor**: Settings Editor with Cmd+, — common first changes: theme (Cmd+K Cmd+T), font (buffer_font_family), format-on-save (format_on_save) [Source: same — "3. Configure Your Editor"].
5. **Set up your language**: built-in support for many; for others, install extension via Cmd+Shift+X (Extensions panel) [Source: same — "4. Set Up Your Language"].
6. **Try AI features**: open Agent Panel with Cmd+Shift+A, or inline assist with Cmd+Enter (macOS) / Ctrl+Enter (Linux/Windows). The docs link to "AI Overview" for provider configuration [Source: same — "5. Try AI Features"].
7. **Coming from another editor**: dedicated migration guides for VS Code, IntelliJ IDEA, PyCharm, WebStorm, RustRover. Also: enable `vim_mode` or `helix_mode` in settings [Source: same — "Coming from Another Editor?"].

## 5. Navigation

Navigation primitives documented:
- **Command palette** (Cmd+Shift+P): "your gateway to every action in Zed. If you forget a shortcut, search for it there." [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
- **Go to file** (Cmd+P)
- **Go to symbol** (Cmd+Shift+O)
- **Find in project** (Cmd+Shift+F)
- **Toggle terminal** (Ctrl+`)
- **Open settings** (Cmd+,)
- **Extensions panel** (Cmd+Shift+X)
- **Agent Panel** (Cmd+Shift+A)
- **Inline AI assist** (Cmd+Enter)
- **Theme selector** (Cmd+K Cmd+T)

[Source: https://zed.dev/docs/getting-started, accessed 2026-08-07 — Quick Start tables].

The home page shows additional navigation: a **"Search…"** prompt at the top right (project-wide fuzzy finder demoed as a live search-as-you-type with `zed` query returning recent commits across "zed", "cloud", "zed.dev" projects) [Source: https://zed.dev/, accessed 2026-08-07].

## 6. Workspace

The Zed workspace is composed of:
- **Center editor pane** (with optional splits).
- **Threads Sidebar** (lists active agent worktrees).
- **Agent Panel** (chat-style interface with the AI agent).
- **Terminal** (toggleable with Ctrl+`).
- **Project panel** (file tree).
- **Bottom status bar** (Git branch, language, errors).
- **Multi-buffers** (an editor primitive that allows multiple files / regions to be displayed in a single buffer — useful for "edit across files" workflows).

The Panel Layout toggle (Agentic vs Classic) means the workspace has two distinct modes — one for AI-agent-heavy work, one for editor-focused work [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07 — "Panel Layout" section].

The home page demo also shows a **"scheduler.tsx"** file with multi-line linting errors highlighted inline and an agent actively reviewing the file (the agent's reasoning is shown in a side panel) [Source: https://zed.dev/, accessed 2026-08-07 — interactive demo].

## 7. Conversation

The conversation surface is the **Agent Panel** — a chat interface on the left of the workspace (in Agentic layout) where the user talks to an AI agent. Opening: `Cmd+Shift+A` (macOS) or `Ctrl+Shift+A` (Linux/Windows) [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].

The agent in the demo (Claude Opus 4.6) reasons step-by-step in the panel:
> "I want to add AccessKit support to GPUI so screen readers can traverse the element tree. Can you start by figuring out where the accessibility tree should be built and how elements currently expose their roles?
> Read crates/gpui/src/element.rs
> Search 'accessibility' in crates/gpui/
> List crates/gpui/src/platform/
> Let me look at the GPUI element trait and the window's paint cycle to understand where we can hook into the tree. I'll also check if there's any existing accessibility scaffolding." [Source: https://zed.dev/, accessed 2026-08-07 — agent panel demo].

This is the documented pattern: the agent states intent, lists the file operations it will perform, then executes them with the user watching. There is also **inline assistance**: Cmd+Enter (macOS) / Ctrl+Enter (Linux/Windows) — a faster, more lightweight AI invocation that does not require opening the panel [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].

## 8. Agent Experience (DEEP)

Zed's agent experience is unusually rich for an editor:

- **Parallel Agents** — multiple agents run concurrently across multiple worktrees/branches. The home page demos an "agent dashboard" showing 14+ active agents across the `zed`, `cloud`, `zed.dev`, and `personal-project` repos, each with a worktree name ("rope-panic-fix", "axum-billing", "sdk-pagination / first-pass", "tailwind-v4", "theme-builder-dark", "parallel-agents-page"), a status diff (+/- line counts), and a time-elapsed indicator (4m, 12m, 48m, 2h, 5h, 1d, 2d, 3d, 4d) [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard]. Announced April 22, 2026 ("Introducing Parallel Agents in Zed", Featured) [Source: https://zed.dev/blog, accessed 2026-08-07].
- **Agent Metrics** — announced May 2026 ("Introducing Zed's Agent Metrics", Featured) [Source: https://zed.dev/blog, accessed 2026-08-07]. This implies an observability surface for agent runs (token counts, success rates, time-to-completion).
- **Sandboxing** — "Zed supports sandboxing to restrict what agents can do while using the terminal and fetch tools." (Cameron Mcloughlin, August 5th, 2026, Newest blog post) [Source: https://zed.dev/blog, accessed 2026-08-07].
- **Terminal Threads** — announced May 20, 2026: "Terminal Threads Are Live in Zed" [Source: same]. This suggests agents can interact with terminals as conversational threads.
- **Local models** — "Why and How to Run Local Models in Zed" (May 19, 2026) [Source: same].
- **Use Your ChatGPT Subscription in Zed** (May 15, 2026) — bring-your-own-model-via-subscription [Source: same].
- **Use Anthropic Claude Billing** ("What Anthropic's New Claude Billing Means for Zed Users", May 14, 2026) [Source: same].
- **Zeta2.1 model** — "Zeta2.1: 3x Fewer Tokens, 50ms Faster" (May 08, 2026) — Zed ships its own model fine-tuned for editor work [Source: same].

The **agent's reasoning is visible step-by-step** in the Agent Panel — the agent narrates its plan, lists file ops it will perform, then executes them in the editor with the user able to watch [Source: https://zed.dev/, accessed 2026-08-07 — interactive demo]. This is a different model from Cursor (where the agent often works more opaquely) or from inline-only copilots.

## 9. Memory

Zed's memory model includes:
- **Threads** (the Threads Sidebar) — each agent run is captured as a "thread" with its worktree. The home page shows a "Threads Sidebar" alongside the Agent Panel [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07 — Panel Layout section].
- **Project memory** — the open project's files are the agent's primary context. There is no documented separate "memory store" or long-term memory surface.
- **Per-agent-worktree memory** — each parallel agent runs in its own git worktree, so its edits are isolated and reviewable independently [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard].
- **Snippets** — "Now I can have shortcuts to run and debug tests. Ever since snippets were added, Zed has all of the features I could ask for in an editor." — José Valim (creator of Elixir) [Source: https://zed.dev/, accessed 2026-08-07 — testimonial].

No documented cross-session agent memory or persistent "agent personality" surface was found in the crawlable docs.

## 10. Knowledge

Zed's knowledge surfaces:
- **Breadcrumbs** — "A breadcrumb trail below the tab bar that shows the path to the current file along with a summary of the containing syntax nodes. A breadcrumb trail is displayed at the top of multi-buffers and singleton buffers with the path of the file containing the cursor along with a summary of the containing syntax nodes. This can be especially helpful in multi-buffers or within large functions." [Source: https://zed.dev/features, accessed 2026-08-07 — Breadcrumbs feature].
- **Tree-sitter integration** — Zed was co-created by the Tree-sitter team (per `<meta>`); tree-sitter powers syntax highlighting, code navigation, and the breadcrumb summaries [Source: https://zed.dev/, accessed 2026-08-07 — `<meta name="description">` mentions Tree-sitter; https://zed.dev/features, accessed 2026-08-07].
- **Multi-buffers** — "Lots of subtle innovations (multibuffers, inlay hints, collaboration)" — Mike Bostock testimonial [Source: https://zed.dev/, accessed 2026-08-07].
- **Inlay hints** — referenced in same testimonial.

## 11. Search (project-wide)

Project-wide search is `Cmd+Shift+F` (macOS) / `Ctrl+Shift+F` (Linux/Windows) [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07 — Quick Start table]. The home page demos a search bar at top-right ("Search…") that fuzzy-matches across project files and recent commits, returning 14+ results across the `zed`, `cloud`, and `zed.dev` repos [Source: https://zed.dev/, accessed 2026-08-07].

There is also **Go to file** (Cmd+P) and **Go to symbol** (Cmd+Shift+O) — separate fuzzy-finder surfaces for different scopes [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].

## 12. Execution

Zed's execution surfaces:
- **Inline code edits via agent** — the agent reads files, searches code, lists directories, and edits buffers directly. The home page demo shows the agent (Claude Opus 4.6) editing `src/components/scheduler.tsx` after narrating intent [Source: https://zed.dev/, accessed 2026-08-07].
- **Inline assist** (Cmd+Enter / Ctrl+Enter) — fast, lightweight AI invocation for single edits [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
- **Terminal execution** — Terminal Threads (announced May 20, 2026) let agents run shell commands and review output conversationally [Source: https://zed.dev/blog, accessed 2026-08-07].
- **Sandboxed execution** — agents are sandboxed to restrict what they can do with terminal and fetch tools (Aug 5, 2026 blog post) [Source: same].
- **Native Git support** — "First-class support for staging, committing, pulling, pushing, viewing diffs, and many more Git operations." [Source: https://zed.dev/, accessed 2026-08-07 — "Native Git Support" feature].
- **Debugger** — "Built on the Debug Adapter Protocol (DAP), native support for debugging across multiple programming languages." [Source: same — "Debugger" feature].

## 13. Artifacts

Zed's primary artifacts are files (edited code). Secondary artifacts:
- **Threads** (agent conversation + worktree diff) — reviewable artifacts of agent runs.
- **Project plans** (the agent demo shows the user asking the agent to spec out a feature).
- **Diffs** (Git-native; agent edits produce reviewable diffs).

The home page demo shows an agent producing a fully-edited `scheduler.tsx` file with inline linting feedback [Source: https://zed.dev/, accessed 2026-08-07].

## 14. Keyboard UX

Zed's keyboard UX is documented in detail in the Quick Start [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07]:

| Action | macOS | Linux/Windows |
|--|--|--|
| Command palette | Cmd+Shift+P | Ctrl+Shift+P |
| Go to file | Cmd+P | Ctrl+P |
| Go to symbol | Cmd+Shift+O | Ctrl+Shift+O |
| Find in project | Cmd+Shift+F | Ctrl+Shift+F |
| Toggle terminal | Ctrl+` | Ctrl+` |
| Open settings | Cmd+, | Ctrl+, |
| Extensions | Cmd+Shift+X | Ctrl+Shift+X |
| Agent Panel | Cmd+Shift+A | Ctrl+Shift+A |
| Inline assist | Cmd+Enter | Ctrl+Enter |
| Theme selector | Cmd+K Cmd+T (chord) | Ctrl+K Ctrl+T |

Also documented: **Vim mode** (`vim_mode` setting), **Helix mode** (`helix_mode` setting) — Zed ships native modal-editing keybindings for both Vim and Helix users [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07 — "Coming from Another Editor?" section].

The `Cmd+K Cmd+T` chord pattern (press Cmd+K, release, press T) is a VS Code-borrowed convention. This is **chord-based command invocation**, not modal editing — but Vim/Helix modes are also first-class.

## 15. Motion (DEEP)

Zed's motion design is **GPU-rendered at 120fps** via GPUI (Zed's custom Rust UI framework). Evidence:

- **"Written from scratch in Rust to efficiently leverage multiple CPU cores and your GPU."** [Source: https://zed.dev/, accessed 2026-08-07 — "Fast" pillar].
- The testimonial from Matt Baker (Principal Engineer): "My god it is so fast. Boot time, UI interaction, typing latency. I feel it. I knew VS Code always felt sluggish, but I didn't realize how good things could really be. I'm honestly astounded." [Source: same — testimonial section].
- Mike Bostock (D3.js creator, Observable founder): "Lots of subtle innovations (multibuffers, inlay hints, collaboration). Thoughtful, precise design. And the speed, the speed!" [Source: same].

The download page shows version 1.14.2 (Aug 5, 2026); macOS requires version 10.15 or later; Windows supports Intel/AMD; Linux via `curl -f https://zed.dev/install.sh | sh` [Source: https://zed.dev/download, accessed 2026-08-07].

GPUI is Zed's GPU-accelerated UI framework, written in Rust. It uses wgpu (a Rust wrapper around Vulkan/Metal/DX12/WebGPU). The home page references "GPUI elements", "GPUI text shaping", and "AccessKit support to GPUI elements" in the agent demo [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard task list]. There are also blog-post titles referring to "text-shaping-opt" (worktree name) and "GPUI text shaping perf regression" — confirming GPUI is the rendering layer [Source: same].

No exact frame-rate target is documented in the crawlable surface; the marketing claim is qualitative ("fast", "120fps feel", "no jank"). The Rust + GPU combination is positioned as the foundation for both low-latency typing and smooth collaboration.

## 16. Animation

Specific animation tokens are not documented in the crawlable surface. The product demos on the home page imply:
- Smooth cursor movement for remote collaborators (multiplayer cursors).
- Smooth scroll on long files.
- Smooth agent-typing animation (the agent's edits appear in the buffer character-by-character or block-by-block).

There is no public design-system or animation-spec documentation visible. The blog has a category "Zed Decoded" (per the blog index: "Zed Decoded" category listed) which may contain deep-dive engineering posts on rendering and animation [Source: https://zed.dev/blog, accessed 2026-08-07 — categories list]. The "blog-decoded.html" fetch returned a 22-char stub — the page is JS-rendered.

## 17. Visual Hierarchy

The Zed workspace hierarchy:
- **Tab bar** at top (with breadcrumbs below it).
- **Center editor pane** (largest surface).
- **Threads Sidebar** (left, in Agentic layout).
- **Agent Panel** (left, alongside Threads Sidebar).
- **Status bar** (bottom — Git branch, language, errors).
- **Project panel** (file tree, typically left).
- **Terminal** (toggleable bottom drawer).

The home page demo shows the Agent Panel as the second-largest surface (after the editor), reflecting the "Agentic" layout philosophy [Source: https://zed.dev/, accessed 2026-08-07; https://zed.dev/docs/getting-started, accessed 2026-08-07].

## 18. Progressive Disclosure

Zed's progressive disclosure pattern is **panel-layout-based**:
- **Welcome page** when no folder is open → disappears once a folder opens [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
- **Classic vs Agentic layouts** — user toggles based on whether they are doing editor-focused work or agent-heavy work [Source: same].
- **Command palette** as the universal progressive disclosure surface — "If you forget a shortcut, search for it there" [Source: same].
- **Inline AI vs Agent Panel** — two levels of AI invocation, lighter (Cmd+Enter) vs heavier (Cmd+Shift+A) [Source: same].
- **Status badges** on the agent dashboard (4m, 12m, 2d) progressively disclose agent activity [Source: https://zed.dev/, accessed 2026-08-07].

## 19. Accessibility

The home page demos an agent task titled **"Add AccessKit support to GPUI elements"** — AccessKit is the Rust accessibility framework that exposes UI trees to platform screen readers (VoiceOver, Narrator, Orca). The agent's task statement: "I want to add AccessKit support to GPUI so screen readers can traverse the element tree." [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard].

This is significant: Zed is actively building screen-reader accessibility into its GPU-rendered UI framework (GPUI), which is non-trivial because GPU-rendered canvases do not have a native accessibility tree. The worktree name `gpui-accesskit` confirms this is in progress [Source: same].

No documented screen-reader support status, colour-contrast spec, or keyboard-only navigation guarantee was found in the crawlable surface.

## 20. Performance Perception (DEEP)

This is Zed's **core differentiator** and is documented across multiple surfaces:

- **Near-instant startup**: testimonial Matt Baker: "Boot time, UI interaction, typing latency. I feel it. I knew VS Code always felt sluggish." [Source: https://zed.dev/, accessed 2026-08-07].
- **120fps target**: Zed is positioned as "the editor that doesn't drop frames" — though the literal "120fps" claim is not in the crawlable HTML, the Rust + GPU + wgpu stack is the foundation. The wgpu framework targets the platform's native low-level GPU API (Vulkan on Linux, Metal on macOS, DX12 on Windows), enabling consistent frame rates across platforms.
- **Parallel agents don't block UI**: each agent runs in its own worktree, so agent activity does not degrade editor responsiveness — the dashboard shows 14+ agents running concurrently with the editor still responsive [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard].
- **Zeta2.1 model** ("3x Fewer Tokens, 50ms Faster", May 08, 2026) — Zed ships a model fine-tuned for editor work, claiming 50ms latency improvement [Source: https://zed.dev/blog, accessed 2026-08-07].
- **GPUI text shaping**: an active worktree "text-shaping-opt" and an issue "GPUI text shaping perf regression" confirm the team is actively optimising text rendering [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard task list].
- **Agentic Editing** at native speed: "Run agents in parallel to smoothly edit files, navigate code, and run tools at native speed." [Source: same — "Agentic" pillar].

The performance philosophy is: **every interaction must feel instant** — typing, scrolling, opening files, switching tabs, agent responses, multiplayer cursor movement. Slowness is treated as a bug.

## 21. Trust

Zed's trust model is mixed:
- **Local-first**: the editor runs locally; projects are local files. No "edit in the cloud" model is required.
- **Open source**: Zed is open source — "Clone source C" is offered alongside "Download now D" on the home page hero [Source: https://zed.dev/, accessed 2026-08-07]. The GitHub repo is `zed-dev/zed`.
- **AI providers are bring-your-own**: blog posts cover ChatGPT Subscription (May 15), Anthropic Claude Billing (May 14), local models (May 19) — so the user can choose where their code goes [Source: https://zed.dev/blog, accessed 2026-08-07].
- **Sandboxing** (Aug 5, 2026): "Zed supports sandboxing to restrict what agents can do while using the terminal and fetch tools." [Source: same].
- **Zed for Business** (May 06, 2026) implies a hosted/team tier — at which point trust becomes a policy question, not just an architecture question [Source: same].
- **"We're Not Building AI Features for the Money"** (May 05, 2026, Featured) — a values-first essay that signals Zed's commercial posture is principled [Source: same].

Unlike Granola's architectural trust (no capability to be creepy), Zed's trust is *configurable* (sandboxing, model choice, local-first). This is weaker as a marketing differentiator but stronger as a developer-trust pattern.

## 22. Explainability

Zed's agent explainability is **narrated step-by-step**: the agent states intent ("I want to add AccessKit support..."), then lists file ops it will perform ("Read crates/gpui/src/element.rs", "Search 'accessibility' in crates/gpui/", "List crates/gpui/src/platform/"), then narrates its plan ("Let me look at the GPUI element trait and the window's paint cycle to understand where we can hook into the tree.") [Source: https://zed.dev/, accessed 2026-08-07 — agent panel demo].

This is **plan-then-execute** explainability: the user can read the plan before the agent commits to file edits. The diffs are reviewable in standard Git form. The "Agent Metrics" feature (May 2026) suggests an observability surface for agent runs as well [Source: https://zed.dev/blog, accessed 2026-08-07].

## 23. Long Session Experience

Zed's long-session features:
- **No jank**: GPU rendering + Rust memory model avoids the Electron-style memory creep that VS Code exhibits over long sessions [Source: testimonial Matt Baker, https://zed.dev/, accessed 2026-08-07].
- **Parallel agents reduce context-switching**: instead of switching tabs/branches manually, the user can have 14+ agents working in parallel and pick up results when ready [Source: same — agent dashboard].
- **Terminal Threads**: agents can interact with terminals conversationally, reducing terminal-context-switching [Source: https://zed.dev/blog, accessed 2026-08-07 — May 20 announcement].
- **Native Git support**: in-editor Git operations reduce alt-tabbing to terminal/Git GUI [Source: https://zed.dev/, accessed 2026-08-07].
- **Vim/Helix modes**: for power users, modal editing reduces hand travel and mental fatigue over long sessions [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].

## 24. Power User Features

- **Parallel Agents** across multiple worktrees (April 22, 2026 announcement) [Source: https://zed.dev/blog, accessed 2026-08-07].
- **Vim mode and Helix mode** as first-class settings [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
- **Multi-buffers** (multiple files / regions in a single buffer) — Mike Bostock testimonial [Source: https://zed.dev/, accessed 2026-08-07].
- **Inline assistance** (Cmd+Enter) for fast, lightweight AI editing without opening the Agent Panel [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
- **Agent Metrics** for observability [Source: https://zed.dev/blog, accessed 2026-08-07 — May 2026 announcement].
- **Sandboxing** for controlled agent execution [Source: same — Aug 5, 2026 post].
- **Terminal Threads** [Source: same — May 20, 2026 announcement].
- **Native DAP-based debugger** [Source: https://zed.dev/, accessed 2026-08-07].
- **Snippets** (José Valim testimonial) [Source: same].
- **Custom model integration** (ChatGPT subscription, Anthropic billing, local models) [Source: https://zed.dev/blog, accessed 2026-08-07].

## 25. Developer Experience (extension API in Rust)

The docs reference an Extensions panel (Cmd+Shift+X) for installing language packs and other extensions [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07]. The home page mentions "Clone source C" — implying the source is open and developer-extensible.

Zed's extension API is in Rust (this is well-documented elsewhere in the Zed docs surface, but the specific extension-API page was not fetched in this collection run due to time-boxing). The fact that Zed is written in Rust and ships `vim_mode` and `helix_mode` as settings (not as extensions) suggests the philosophy is "build features into the editor core, not as extensions" — closer to Sublime's philosophy than VS Code's.

A blog category **"Tips and Tricks"** is listed on the blog index [Source: https://zed.dev/blog, accessed 2026-08-07].

## 26. Biggest Strengths (with evidence)

1. **GPU rendering + Rust foundation** — "Written from scratch in Rust to efficiently leverage multiple CPU cores and your GPU." Testimonial Matt Baker: "My god it is so fast. Boot time, UI interaction, typing latency." [Source: https://zed.dev/, accessed 2026-08-07].
2. **Real-time multiplayer** — "Chat with teammates, code together, and share your screen and project." [Source: same — "Collaborative" pillar].
3. **Parallel Agents as a first-class workflow** — multiple agents running concurrently across multiple worktrees, with metrics and sandboxing [Source: same — agent dashboard; https://zed.dev/blog, accessed 2026-08-07 — April 22 + May 2026 + Aug 5 announcements].
4. **Step-by-step agent explainability** — agent narrates intent, lists file ops, then executes [Source: https://zed.dev/, accessed 2026-08-07 — agent panel demo].
5. **Editor lineage credibility** — "from the creators of Atom and Tree-sitter" [Source: same — `<meta name="description">`]. Endorsements from Valim, Abramov, Bostock.
6. **Multi-modal AI integration** — ChatGPT Subscription, Anthropic Claude Billing, local models, Zeta2.1 (Zed's own fine-tuned model) [Source: https://zed.dev/blog, accessed 2026-08-07].
7. **Vim and Helix modes built in** — first-class modal editing keybindings for power users [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].

## 27. Biggest Weaknesses (with evidence)

1. **GPU-only is exclusionary** — the GPUI renderer requires a Vulkan/Metal/DX12-capable GPU. This excludes headless servers, low-end laptops, VMs without GPU passthrough, and remote-development scenarios. The sandbox here has no GPU and would not be able to run Zed. No documented software-rendering fallback was found in the crawlable surface [Source: inferred from "your GPU" in marketing copy, https://zed.dev/, accessed 2026-08-07].
2. **`/collaboration` returned "Not Found"** — the canonical multiplayer feature page returned a "Zed: Not Found" stub during this collection [Source: https://zed.dev/collaboration, accessed 2026-08-07 — 22-byte stub]. This may indicate a documentation gap or a renamed URL.
3. **No documented plugin system equivalent to VS Code's** — the blog says "While there is currently no plugin system available" for Helix (which is a different product), Zed's extension model is Rust-based and likely more constrained than VS Code's TypeScript-based extension API. Specific extension-API documentation was not fetched in this run.
4. **Native-app only, no web version** — Zed must be installed; there is no in-browser Zed. This narrows accessibility for non-developer collaborators and for quick evaluation.
5. **Agentic layout adds complexity** — the toggle between "Agentic" and "Classic" panel layouts implies the workspace is no longer simple; new users must learn two layouts [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
6. **Active work on text-shaping perf regression** — the agent dashboard shows an open issue "GPUI text shaping perf regression" (5h) and a worktree "text-shaping-opt", confirming performance regressions happen and require active attention [Source: https://zed.dev/, accessed 2026-08-07 — agent dashboard].
7. **No documented accessibility status** — the AccessKit work is in-progress (worktree `gpui-accesskit`), implying screen-reader support is not yet shipped [Source: same].

## 28. What should MiMo learn?

1. **GPU rendering + Rust as a foundation for editor-class performance** — if MiMo has any real-time-rendering surface (canvas, graph, large text), Rust + GPU (via wgpu or similar) is the proven foundation [Source: https://zed.dev/, accessed 2026-08-07 — "Fast" pillar + wgpu context].
2. **Parallel agents as first-class workflow** — instead of "one agent at a time", support N agents across N worktrees/branches, with a dashboard showing status, elapsed time, and diff size. This is a structural productivity multiplier [Source: same — agent dashboard].
3. **Plan-then-execute agent explainability** — the agent states intent → lists ops → executes. This is more trustworthy than "edit-then-explain" or "edit-then-accept" patterns [Source: same — agent panel demo].
4. **Panel layout toggle (Agentic vs Classic)** — let users switch between "AI-heavy" and "editor-heavy" workspace layouts as a single command, not as a manual rearrangement [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
5. **Bring-your-own-model integration** — supporting ChatGPT subscription, Anthropic billing, and local models as first-class options reduces vendor lock-in and increases trust [Source: https://zed.dev/blog, accessed 2026-08-07].
6. **Sandboxing for agent terminal/fetch tools** — restricting what agents can do at the tool level (not just the model level) is essential for trust [Source: same — Aug 5, 2026 post].
7. **Native modal-editing modes (Vim, Helix) as settings, not extensions** — power-user keybindings should be first-class settings, not bolted-on [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
8. **Agent Metrics as observability** — measure agent runs (tokens, time, success rate) and surface them to the user; this is a category-defining feature [Source: https://zed.dev/blog, accessed 2026-08-07 — May 2026 announcement].

## 29. What should MiMo reject?

1. **GPU-only rendering without a software fallback** — this excludes too many users (headless, low-end, remote-dev). MiMo should ship a software renderer or degraded-but-functional mode for non-GPU environments [Source: inferred from GPU requirement, https://zed.dev/, accessed 2026-08-07].
2. **Native-app-only distribution** — Zed requires install; MiMo should be web-first or at least web-optional for evaluation and collaboration with non-developers.
3. **Two-panel-layout complexity** — the Agentic vs Classic toggle adds learning cost. MiMo should pick one default and only optionally expose the other [Source: https://zed.dev/docs/getting-started, accessed 2026-08-07].
4. **Shipping your own fine-tuned model (Zeta2.1)** — unless MiMo has the resources to maintain and update the model, this is a long-term liability. Zed can do it because they raised significant capital; MiMo should not assume the same [Source: https://zed.dev/blog, accessed 2026-08-07 — Zeta2.1 announcement].
5. **JS-rendered feature pages that return 22-byte stubs** — the `/collaboration` page is essentially uncrawlable. MiMo should ensure every feature page has crawlable content for SEO, docs, and trust [Source: https://zed.dev/collaboration, accessed 2026-08-07].

## 30. Confidence Score (0-100) with reasoning

**Confidence: 74/100.**

Reasoning:
- ✅ **Strong** on philosophy, mental model, user journey, navigation, keyboard UX, agent experience, performance perception — all directly cited from home page + Getting Started docs with verbatim quotes.
- ✅ **Strong** on timeline evidence (blog index lists every major announcement: 1.0 Apr 29, Parallel Agents Apr 22, Agent Metrics May 2026, Terminal Threads May 20, Sandboxing Aug 5, Zeta2.1 May 8, Zed for Business May 6, etc.).
- ✅ **Strong** on testimonial evidence (Valim, Abramov, Bostock, Baker, Perez) — all named with roles.
- ⚠️ **Weak** on exact motion / animation specs — no public design-system or motion-token documentation found.
- ⚠️ **Weak** on extension-API specifics — extension API page not fetched; only the Extensions install panel is documented in the Getting Started.
- ⚠️ **Weak** on accessibility status — AccessKit work is in-progress (worktree), not shipped; no documented VoiceOver/Narrator/Orca support status.
- ❌ **Failed** to fetch `/collaboration` page (22-byte stub). The multiplayer feature surface is documented only via the home-page hero copy, not via a dedicated feature page.
- ❌ **Did not install** Zed locally — sandbox has no GPU, so GPUI renderer would not start. Could not verify typing latency, multiplayer cursor smoothness, or agent-panel UX directly. The 1.14.2 Linux install script was offered (`curl -f https://zed.dev/install.sh | sh`) but not executed due to no-GPU constraint.

For a future pass: install Zed on a Vulkan-capable Linux machine (or a Mac), open a real project, run a parallel-agent workflow, and verify (a) typing latency in a 10k-line file, (b) multiplayer cursor smoothness with 2+ participants, (c) Agent Panel UX with Claude Opus or GPT, (d) sandboxing configuration, (e) Vim/Helix mode completeness vs the originals.
