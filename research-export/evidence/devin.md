# Devin (Cognition AI) — Evidence File (Task W8c, Phase R2)

> Evidence-based research product file. Every claim cited with `[Source: <URL>, accessed 2026-08-07]`. HN/3rd-party commentary cited separately. No synthesis, no MiMo design.

---

## 1. Product Overview

Devin is Cognition AI's **autonomous AI software engineer**, delivered primarily as a cloud web app at `app.devin.ai`, with additional surfaces: **Devin Desktop**, **Devin CLI** (`cli.devin.ai`), **Devin Review**, and integrations into Slack/Microsoft Teams/GitHub/GitLab/Jira/Linear. Devin runs in a sandboxed compute environment with a shell, code editor, and browser, and produces Pull Requests as its primary artifact. [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07] [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07]

Cognition is now part of a broader suite: Devin Cloud, Devin Desktop, Devin CLI, Devin Review, Devin Windows VM, plus Cognition for Government and Federal (FedRAMP Class D High In-Process). Cognition also acquired Windsurf (the IDE/editor) — see HN thread 44563324 (502 points). [Source: https://cognition.ai/, accessed 2026-08-07] [Source: https://news.ycombinator.com/item?id=44563324, accessed 2026-08-07]

Pricing (per Devin 2.0 blog, April 2025): "a flexible new plan starting at $20" for individuals; teams plan is $500/month (per HN GA thread comment). Enterprise and Federal plans exist. [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07] [Source: https://news.ycombinator.com/item?id=42379285, accessed 2026-08-07]

## 2. Product Philosophy

Cognition explicitly frames Devin as a **teammate**, not a tool. The launch blog (March 2024) opens: "Devin is a tireless, skilled teammate, equally ready to build alongside you or independently complete tasks for you to review." [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07]

Cognition's stated mission: "We are an applied AI lab focused on reasoning. We're building AI teammates with capabilities far beyond today's existing AI tools. By solving reasoning, we can unlock new possibilities in a wide range of disciplines—code is just the beginning." [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07]

The mental anchor is "delegate whole tasks to a colleague who reports back" — Devin "reports on its progress in real time, accepts feedback, and works together with you through design choices as needed." [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07]

## 3. Core Mental Model

The core mental model is **async delegation to a remote teammate** who works in their own sandboxed cloud VM with shell + IDE + browser, opens a Pull Request when done, and may need occasional nudges. [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]

Three primitives compose the loop:
1. **Scope** with Ask Devin (codebase Q&A) and DeepWiki (auto-generated docs).
2. **Delegate** via the web app, Slack `@Devin`, Teams, Jira/Linear ticket assignment, the Devin CLI `/handoff`, or the Devin API.
3. **Review** the resulting PR via Devin Review (smart diff organization, bug catcher, security scanning) or via standard GitHub/GitLab PR review. [Source: https://docs.devin.ai/work-with-devin/ask-devin.md, accessed 2026-08-07] [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07] [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07]

A rule-of-thumb stated by Cognition: "As a rule of thumb, if you can do it in three hours, Devin can most likely do it." [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]

## 4. User Journey

The recommended onboarding workflow:

1. Sign up at `app.devin.ai` (Individual or Teams plan).
2. Connect a git provider (GitHub, GitLab, Bitbucket, Azure DevOps, or self-hosted SCM).
3. **Index a repository** to enable DeepWiki and Ask Devin.
4. Optional: connect Slack/Teams so you can `@Devin` from a thread.
5. Optional: install the Devin CLI locally for terminal-driven sessions and `/handoff` to cloud.
6. Delegate a task: write a clear prompt with success criteria, or assign a Linear/Jira ticket, or `@Devin` in Slack.
7. Watch Devin's progress in the web app: planning → shell commands → IDE edits → browser tests.
8. Review the resulting PR (or use Devin Review for smart-diff organization).
9. Approve / request changes / merge — Devin is "subject to the exact same branch protections and SDLC policies as any human engineer." [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07] [Source: https://docs.devin.ai/get-started/first-run.md, accessed 2026-08-07] [Source: https://docs.devin.ai/essential-guidelines/sdlc-integration.md, accessed 2026-08-07]

The most successful workflows per the docs: "Tagging Devin on a Slack or Teams thread about a bug you're discussing with coworkers" / "Delegating a more complex task via the web application and taking over in Devin's IDE once it gives you a good first draft" / "Running Devin for Terminal in your local environment for quick fixes ... then using `/handoff` to send longer tasks to cloud Devin" / "Carving out tasks from your todo list at the start of your day and returning to draft PRs waiting for review." [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]

## 5. Navigation

Navigation is split across surfaces:
- **Web app at app.devin.ai** — sessions list, Ask Devin, Devin Review, Knowledge, Integrations, Settings.
- **Devin CLI** — local commands, slash commands, `/handoff` to cloud.
- **Slack/Teams** — `@Devin` triggers; inline keywords (`!ask`, `!deep`, `mute`, `unmute`, `sleep`, `archive`, `EXIT`, `!dana`, `!fast`).
- **PR-comment triggers** — comment `/devin review` on any GitHub PR in a connected repo to invoke Devin Review. [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07] [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]

In-session navigation: **Progress tab** unifies shell + IDE + browser into one timeline; click any progress step to see the shell commands, code edits, and browser activity at that point. [Source: https://docs.devin.ai/work-with-devin/devin-session-tools.md, accessed 2026-08-07]

Devin CLI ships a `Commands & Flags` reference and `Keyboard Shortcuts` doc; the CLI imports settings from Cursor, Windsurf, Claude Code, GitHub Copilot, OpenCode, VS Code, and Zed. [Source: https://docs.devin.ai/cli/reference/keyboard-shortcuts.md, accessed 2026-08-07] [Source: https://docs.devin.ai/cli/reference/configuration/read-config-from.md, accessed 2026-08-07]

## 6. Workspace

The Devin workspace is **the web app** by default, with the embedded IDE visible alongside the session transcript. From the docs: "In Devin's Workspace, you'll find developer tools that Devin will use to complete your task." Three cards: **Shell** ("Devin's terminal, where you can watch commands being executed and view output logs"), **IDE** ("Devin's embedded code editor equipped with all the IDE tools and shortcuts you're familiar with"), **Browser** ("Watch Devin browse through documentation, test web applications it builds ... You can jump in to help Devin navigate through browsing tasks via the Interactive Browser"). [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]

Devin runs in a **sandboxed cloud VM** with a full Linux desktop (or Windows) — Devin's Computer Use feature gives it "direct access to a graphical desktop environment with a mouse and keyboard ... Devin sees the screen as a 1024×768 pixel display and can perform actions like clicking, typing, scrolling, dragging, and taking screenshots." [Source: https://docs.devin.ai/work-with-devin/computer-use.md, accessed 2026-08-07]

Other surfaces: **Devin Desktop** (native desktop app, with Agent Command Center, terminal, Cascade agent, code completion, AI commit messages); **Devin CLI** (local terminal agent); **Devin in Windsurf** (the Windsurf IDE plugin after the acquisition); **Devin in JetBrains** (via ACP — Agent Client Protocol); **Devin in Zed, Xcode** (via ACP). [Source: https://docs.devin.ai/cli/acp/jetbrains.md, accessed 2026-08-07] [Source: https://docs.devin.ai/cli/acp/zed.md, accessed 2026-08-07] [Source: https://docs.devin.ai/cli/acp/xcode.md, accessed 2026-08-07]

## 7. Conversation

Conversation model: **async, thread-based, multi-channel**.
- In the web app: a single session has a chat transcript and a parallel Progress tab.
- In Slack: "@Devin in any channel. ... Devin will respond in-thread to your session. Now, you can communicate back and forth as you would in the regular chat interface." [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]
- Inline Slack keywords modify conversation flow: `!ask` (quick codebase answer, no full agent), `!deep` (deeper research), `mute`/`unmute`, `(aside)`/`!aside` (Devin ignores), `sleep`, `archive`, `EXIT`, `!dana` (Data Analyst agent), `!fast` (Fast Mode). [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]

Devin's chat is **agent-active** — it asks the user questions mid-session when it needs guidance. The "Interactive Planning" feature (Devin 2.0) makes this explicit: "Devin 2.0 proactively researches your codebase and develops a detailed plan. Each time you start a session, Devin responds in seconds with relevant files, findings, and a preliminary plan. You can modify the plan ... before letting Devin work autonomously." [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]

Slash commands in chat: `/plan`, `/review`, `/test`, `/think-hard`, `/implement`, plus custom org-level slash commands. [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]

## 8. Agent Experience

Devin is **async, multi-session, parallelizable**:
- "Spin up multiple parallel Devins, each equipped with its own interactive, cloud-based IDE. This means you can easily multitask, tackling numerous tasks concurrently and stepping in to steer when needed." [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Managed Devins**: "Devin can break down large tasks and delegate them to a team of managed Devin sessions, each running in its own isolated VM. The coordinator session scopes the work, monitors progress, resolves conflicts, and compiles results." [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
- Coordinator capabilities: spin up child sessions, message them, monitor ACU (Agent Compute Unit) consumption, sleep/terminate, schedule messages to itself. [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
- **Computer Use**: Devin has full desktop control (mouse, keyboard, screenshots, any GUI app). [Source: https://docs.devin.ai/work-with-devin/computer-use.md, accessed 2026-08-07]
- **Testing & video recordings**: "Devin tests your changes end-to-end and sends you video recordings as proof." [Source: https://docs.devin.ai/work-with-devin/testing-and-recordings.md, accessed 2026-08-07]
- **Handoff from CLI to cloud**: "Hand off a task from the Devin CLI to a cloud Devin session with `/handoff`" — also from Claude Code, Codex, or any coding agent. [Source: https://docs.devin.ai/work-with-devin/devin-handoff.md, accessed 2026-08-07]

Devin's strengths (per docs): parallel task backlog, code migrations (JS→TS, Angular 16→18, monorepo→submodule, COBOL modernization, SAS→PySpark, NoSQL→SQL, Java upgrades), bug repro/fix, app testing, internal tools, customer-engineering integrations. [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07] [Source: https://docs.devin.ai/use-cases/index.md, accessed 2026-08-07]

Nubank case study: Nubank used Devin to refactor a multi-million-line ETL monolith into submodules, achieving "12x efficiency improvement in terms of engineering hours saved, and over 20x cost savings" and "8x engineering time efficiency gain." [Source: https://cognition.ai/devin, accessed 2026-08-07]

## 9. Memory

Devin's memory is split between **per-session state** and **org-wide knowledge**:

- **Session state**: each session has its own VM, shell history, IDE state, and chat transcript. Shell command history is browsable — "View every command Devin has executed during the session" with output preview, copy, and "Time navigation: Jump to different points in the session by clicking on commands." [Source: https://docs.devin.ai/work-with-devin/devin-session-tools.md, accessed 2026-08-07]
- **AGENTS.md**: declarative per-repo instructions ("Provide always-on instructions and context that guide the agent in every session"). [Source: https://docs.devin.ai/cli/extensibility/rules.md, accessed 2026-08-07]
- **Knowledge base** (org-level): "Deduplicate, consolidate, or create new knowledge entries from your codebase" — managed via the API (`/v1/knowledge/*`, `/v3/notes/*`) or the web app. Knowledge entries are folder-structured. [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07] [Source: https://docs.devin.ai/llms.txt, accessed 2026-08-07]
- **DeepWiki**: auto-generated wiki per repo, "architecture diagrams, documentation, links to sources, and more for all your repos" — automatically re-indexed every couple hours. [Source: https://docs.devin.ai/work-with-devin/deepwiki.md, accessed 2026-08-07] [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Playbooks**: "Turn successful sessions into reusable playbooks, or refine existing ones based on feedback." [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
- **Cascade Memories & Rules** (Devin Desktop / Windsurf): "global rules, workspace rules, and system-level rules for enterprise." [Source: https://docs.devin.ai/windsurf/plugins/cascade/memories.md, accessed 2026-08-07]

## 10. Knowledge

Knowledge ingestion surfaces:
- **Ask Devin** ("Use Ask Devin to ask questions about your codebase, plan tasks, and generate high-context sessions"). Repo is "automatically indexed so Devin can understand and reason about your code." Ask Devin uses "advanced code search capabilities to produce detailed, accurate, and well-cited answers grounded in your codebase." [Source: https://docs.devin.ai/work-with-devin/ask-devin.md, accessed 2026-08-07]
- **DeepWiki** provides conversational documentation for repositories. Available via web, MCP server, and API. [Source: https://docs.devin.ai/work-with-devin/deepwiki.md, accessed 2026-08-07] [Source: https://docs.devin.ai/work-with-devin/deepwiki-mcp.md, accessed 2026-08-07]
- **Devin Search** (introduced in Devin 2.0): "an agentic tool designed to explore and understand your codebases. Devin Search enables you to ask questions directly about your codebase, and quickly get detailed answers with cited code. For more advanced queries that require extensive exploration, turn on Deep Mode." [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **MCP Marketplace**: "Connect Devin to Datadog, Sentry, databases, Figma, Notion, Stripe, and hundreds of other tools via the MCP Marketplace." [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07] [Source: https://docs.devin.ai/work-with-devin/mcp.md, accessed 2026-08-07]
- **Knowledge entries / notes** (programmable via API v1 and v3). [Source: https://docs.devin.ai/llms.txt, accessed 2026-08-07]

## 11. Search

Search surfaces:
- **Ask Devin** with advanced code search (cited answers, grounded in indexed repo).
- **DeepWiki** for architecture-level exploration.
- **Devin Search** with Deep Mode for "extensive exploration." [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Web search** (Devin can browse the web inside its sandboxed browser — visible in the Browser tab). [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]
- **Devin Outposts** for indexing repositories on customer infrastructure (Bulk Index Repositories API — "Index multiple repositories (up to 100) for use in Devin sessions"). [Source: https://docs.devin.ai/cloud/outposts/overview.md, accessed 2026-08-07]
- **Linear / Jira integration**: "Assign Jira tickets to Devin and turn them into PRs" / "Assign Linear tickets to Devin and turn them into PRs." [Source: https://docs.devin.ai/integrations/jira.md, accessed 2026-08-07] [Source: https://docs.devin.ai/integrations/linear.md, accessed 2026-08-07]

## 12. Execution

Execution is **plan → execute → review**, with explicit checkpoints:

1. **Plan**: Interactive Planning (Devin 2.0+) — Devin "proactively researches your codebase and develops a detailed plan" with "relevant files, findings, and a preliminary plan" — modifiable by the user before execution. [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
2. **Execute**: Devin uses shell + IDE + browser in its sandboxed VM, optionally Computer Use for GUI automation. It can run tests, deploy apps (the launch blog shows Devin deploying to Netlify), and self-debug. [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07]
3. **Review**: Devin opens a Pull Request (or a stacked series of PRs for large changes — see §13). Optionally, **Devin Review** runs on the PR for smart-diff organization and bug/security scanning. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
4. **Auto-Fix**: "Enable Devin Review with Auto-Fix so Devin automatically responds to code review comments, fixes flagged bugs, and iterates on CI failures — without you needing to be in the loop. The result: PRs that are ready to merge by the time you look at them." [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07]
5. **Handoff**: between Devin CLI → cloud Devin, or from Claude Code / Codex / any coding agent. [Source: https://docs.devin.ai/work-with-devin/devin-handoff.md, accessed 2026-08-07]

Devin is **subject to existing branch protections**: "Human engineers review PRs created by Devin before choosing whether to merge the code changes." [Source: https://docs.devin.ai/essential-guidelines/sdlc-integration.md, accessed 2026-08-07]

## 13. Artifacts

Primary artifacts: **Pull Requests** on GitHub/GitLab/Bitbucket/Azure DevOps. [Source: https://docs.devin.ai/essential-guidelines/sdlc-integration.md, accessed 2026-08-07]

- **Stacked PRs**: for large changes, "Devin can split it into a **stack**: an ordered series of pull requests that make up one piece of work and land together, bottom-up." Built on GitHub's native stacked PR API; "a stack is a first-class GitHub object — not a convention held together by branch naming." Conflict resolution is automatic. [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07]
- **AI Commit Messages** (Devin Desktop): "Generate meaningful git commit messages automatically with AI by analyzing your code changes with a single click." [Source: https://docs.devin.ai/desktop/ai-commit-message.md, accessed 2026-08-07]
- **Session transcripts**: every shell command, IDE edit, and browser action is logged and browsable from the Progress tab.
- **Video recordings**: Devin "sends you video recordings as proof" of testing. [Source: https://docs.devin.ai/work-with-devin/testing-and-recordings.md, accessed 2026-08-07]
- **Devin Review reports**: smart-diff organization, bug catcher with confidence levels, security scanning with CWE classification, codebase-aware chat. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **DeepWiki wikis**: auto-generated documentation per repo. [Source: https://docs.devin.ai/work-with-devin/deepwiki.md, accessed 2026-08-07]

## 14. Keyboard UX

- **Devin CLI** has a dedicated Keyboard Shortcuts doc. [Source: https://docs.devin.ai/cli/reference/keyboard-shortcuts.md, accessed 2026-08-07]
- **Devin IDE** (in web app): "all the IDE tools and shortcuts you're familiar with" — Devin 2.0 explicitly calls out "Cmd+I and Cmd+K" for touching up changes and refining code. [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Devin Desktop (Windsurf)**: full keymap; "Open Settings ⌘, (Mac) / Ctrl, (Windows/Linux)" pattern. [Source: https://docs.devin.ai/desktop/cascade/cascade.md, accessed 2026-08-07]
- **Slack**: keyboard-free; `@Devin` mention + inline keywords. [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]
- **In-chat slash commands**: `/plan`, `/review`, `/test`, `/think-hard`, `/implement` with dropdown menu when typing `/`. [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]
- **Devin CLI Terminal Compatibility** doc lists supported terminals for best experience. [Source: https://docs.devin.ai/cli/reference/terminal-compatibility.md, accessed 2026-08-07]

## 15. Motion

- The **Progress tab** is the motion surface: a vertical timeline of steps; clicking any step reveals shell commands, IDE edits, and browser actions at that point in time. Shell commands that are greyed out are "commands run at a future point in time in the session" — enabling forward/backward time navigation. [Source: https://docs.devin.ai/work-with-devin/devin-session-tools.md, accessed 2026-08-07]
- The web app layout has a left sidebar (sessions, Ask Devin, Knowledge, Integrations, Settings) and a main panel that switches between Chat / Progress / Shell / IDE / Browser tabs.
- **Agent Command Center** (Devin Desktop): "Manage all of your Devin Desktop agents — local and cloud — from a single Kanban-style view inside Devin Desktop." [Source: https://docs.devin.ai/desktop/agent-command-center.md, accessed 2026-08-07]

## 16. Animation

- Sessions display **streaming progress steps** as Devin works (planning → shell → IDE → browser).
- **GIF/video previews** in docs show progress animations (e.g. `devin-progress-tab.gif`, `devin-progress-shell-recording.gif`). [Source: https://docs.devin.ai/work-with-devin/devin-session-tools.md, accessed 2026-08-07]
- Slash command chips animate from text-input chips to expanded prompt templates when clicked. [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]
- Sessions include video recordings of testing (visible proof artifacts). [Source: https://docs.devin.ai/work-with-devin/testing-and-recordings.md, accessed 2026-08-07]

No specific animation/transition documentation found; claims about animation are descriptive inference from GIF/video artifacts embedded in docs.

## 17. Visual Hierarchy

- Sidebar (primary nav) → main panel (session) → tabs (Chat / Progress / Shell / IDE / Browser).
- **Progress tab** uses step cards with timestamps; shell/IDE/browser are sub-views reachable from each step. [Source: https://docs.devin.ai/work-with-devin/devin-session-tools.md, accessed 2026-08-07]
- **Devin Review** uses a two-column layout (smart-diff organization on left, codebase-aware chat on right); bug/security findings are labelled by confidence/severity. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- Slash command chips use distinct color (`rgba(59, 130, 246, 0.2)` blue tint, monospace font, rounded). [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]
- Card-based feature layouts use icon + title + description pattern (e.g. `<Card title="..." icon="...">`). [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]

## 18. Progressive Disclosure

Disclosure is layered:
- **Default**: a session is a chat box + progress steps; advanced tools (Computer Use, Managed Devins, Security Swarm, DeepWiki MCP, Playbooks) are not surfaced unless invoked.
- **Slash commands**: typing `/` reveals a dropdown menu; commands expand into prompt templates on selection. [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]
- **Explore Advanced Capabilities page** in the Devin home provides "ready-made prompt templates for common workflows" — Managed Devins, Playbooks, Knowledge, Schedules. [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
- **Devin CLI**: only essential commands surfaced by default; full reference is a separate doc page (`/cli/reference/commands.md`). [Source: https://docs.devin.ai/cli/essential-commands.md, accessed 2026-08-07]
- **Pricing transparency** is a separate page; team plan vs individual plan vs enterprise vs federal are progressively disclosed.

## 19. Accessibility

Devin's docs do not surface a dedicated accessibility statement. Indirect evidence:
- Slash commands provide a keyboard-only path to common actions (no mouse required). [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]
- **Devin CLI** has a Terminal Compatibility doc — "Supported terminals and recommendations for the best Devin CLI experience" — partial concession to varied terminal capabilities. [Source: https://docs.devin.ai/cli/reference/terminal-compatibility.md, accessed 2026-08-07]
- The docs site itself has ⌘K search ("Search... ⌘K") and "Skip to main content" link. [Source: https://docs.devin.ai/, accessed 2026-08-07]
- A "Devin Ask Assistant" is offered in the docs UI. [Source: https://docs.devin.ai/, accessed 2026-08-07]
- **Computer Use** for GUI navigation implies Devin itself can interact with accessibility trees via OS-level input, but this is for Devin's benefit, not the user's accessibility.

No WCAG conformance statement found in retrieved docs. This is a gap. [Source: docs.devin.ai/llms.txt index, accessed 2026-08-07 — no accessibility page listed]

## 20. Performance Perception

Devin is **multi-minute-to-multi-hour** async; perceived performance is managed by:
- **Interactive Planning**: "Devin responds in seconds with relevant files, findings, and a preliminary plan" — gives immediate feedback before the long execution begins. [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Progress steps streaming**: each step appears as it completes, so the user sees momentum rather than a single long wait.
- **Parallel Devins**: "Spin up multiple parallel Devins, each equipped with its own interactive, cloud-based IDE. This means you can easily multitask, tackling numerous tasks concurrently." [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Notifications** via Slack/Teams in-thread responses; PRs show up as draft PRs waiting for review.
- **Scheduled Sessions**: "Set up daily or weekly sessions to triage Sentry errors, update dependencies, generate reports, or any other repeatable work" — pushes work to off-hours. [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07]
- **Fast Mode** (`!fast` in Slack) "to start the session in Fast Mode for quicker responses on simpler tasks." [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]
- **Handoff** from local Devin CLI to cloud Devin for tasks too long for local. [Source: https://docs.devin.ai/work-with-devin/devin-handoff.md, accessed 2026-08-07]
- **ACU (Agent Compute Unit) metering**: "Get Session Daily Consumption ... Get daily ACU consumption for a specific session" — usage is visible per session. [Source: https://docs.devin.ai/llms.txt, accessed 2026-08-07]

HN commenter (Devin GA thread): "i use this every day and a lot of the magic is in the workflow and agent layer — claude 3.5 can generate a snippet of code for you but it isn't going to open a browser, read api docs, actually make calls to the api, debug, run the code and make sure it builds and works, etc." [Source: https://news.ycombinator.com/item?id=42379307, accessed 2026-08-07]

Nubank engineer: "Devin isn't really like Copilot; it's more like an assistant to which you can assign a project. ... for those particular use cases it's like having a superpower." [Source: https://news.ycombinator.com/item?id=42379596, accessed 2026-08-07]

## 21. Trust

Trust mechanisms:
- **Pull Requests as the trust boundary** — Devin's output is always a PR subject to existing branch protections. "Devin is subject to the exact same branch protections and SDLC policies as any human engineer." [Source: https://docs.devin.ai/essential-guidelines/sdlc-integration.md, accessed 2026-08-07]
- **Devin Review** as a structured pre-merge check: bug catcher (labelled by confidence), security scanning (CWE classification), smart-diff organization. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Auto-Fix** automates review iteration but the human still merges. [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07]
- **Video recordings as proof**: Devin sends recordings of its end-to-end testing. [Source: https://docs.devin.ai/work-with-devin/testing-and-recordings.md, accessed 2026-08-07]
- **Progress tab transparency**: every shell command is logged and browsable. [Source: https://docs.devin.ai/work-with-devin/devin-session-tools.md, accessed 2026-08-07]
- **Security posture**: "Security at Cognition" doc, SOC 2, FedRAMP High In-Process (federal), Customer Managed Keys (AWS KMS), AI Guardrails (prompt-injection screening), Attribution Filtering (block Devin-generated code matching public repos). [Source: https://docs.devin.ai/admin/security.md, accessed 2026-08-07] [Source: https://docs.devin.ai/enterprise/features/ai-guardrails.md, accessed 2026-08-07] [Source: https://docs.devin.ai/enterprise/features/attribution-filtering.md, accessed 2026-08-07]
- **DeepWiki**'s cited answers (architecture diagrams with source links) provide provenance. [Source: https://docs.devin.ai/work-with-devin/deepwiki.md, accessed 2026-08-07]

## 22. Explainability

Explainability surfaces:
- **Plan step**: Devin announces its plan before executing (Interactive Planning). [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **Progress steps**: each step is a discrete log entry with shell command, code edit, or browser action attached.
- **Devin Review explanations**: "precise explanations" for each diff hunk, "Checks for bugs and labels them by confidence level." [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Cited answers** in Ask Devin and DeepWiki (links to source files / line ranges). [Source: https://docs.devin.ai/work-with-devin/ask-devin.md, accessed 2026-08-07]
- **Bug catcher confidence levels**: "Severe bugs require immediate attention." [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **CWE classification** for security findings. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Session Insights** ("Session Insights" in the llms.txt index) — analyze why a session succeeded/failed. [Source: https://docs.devin.ai/llms.txt, accessed 2026-08-07]

## 23. Long Session Experience

- **Parallel Devins** let you keep many sessions open without context-loss; the Kanban-style Agent Command Center (Devin Desktop) tracks all of them. [Source: https://docs.devin.ai/desktop/agent-command-center.md, accessed 2026-08-07]
- **ACU consumption tracking** per session and per organization. [Source: https://docs.devin.ai/admin/billing/usage.md, accessed 2026-08-07]
- **Sleep / wake**: `sleep` Slack keyword pauses a session; any message wakes it. [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]
- **Scheduled Sessions** for recurring work. [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07]
- **Stacked PRs** manage very large changes reviewably. [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07]
- **Playbooks** capture learnings from successful sessions for reuse. [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
- **Auto-triage** and **Automations** (per the navigation tree: "Automations / Auto-triage / Scheduled Sessions / Deployments / Autofix"). [Source: https://docs.devin.ai/, accessed 2026-08-07]

## 24. Power User Features

- **Slack integration**: `@Devin` in any channel, in-thread responses, inline keyword grammar (`!ask`, `!deep`, `mute`, `unmute`, `(aside)`, `sleep`, `archive`, `EXIT`, `!dana`, `!fast`). [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]
- **Devin CLI** with `/handoff` to cloud; imports settings from Cursor/Windsurf/Claude Code/Copilot/OpenCode/VS Code/Zed. [Source: https://docs.devin.ai/cli/reference/configuration/read-config-from.md, accessed 2026-08-07]
- **Devin API** (v1, v2, v3) for programmatic session orchestration, knowledge CRUD, PR reviews, schedules. [Source: https://docs.devin.ai/api-reference/overview.md, accessed 2026-08-07]
- **Managed Devins**: parallel orchestration of N child sessions, each in its own VM. [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
- **Stacked PRs**: GitHub-native stack API. [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07]
- **Devin Review**: devinreview.com URL shortcut — "For any GitHub.com PR link, replace `github.com` with `devinreview.com` in the URL." CLI: `npx devin-review {pr-url}`. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Devin Review is free** for public PRs (no account needed) — strategic acquisition play. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Computer Use** on Linux + Windows desktops (1024×768 view). [Source: https://docs.devin.ai/work-with-devin/computer-use.md, accessed 2026-08-07]
- **DeepWiki MCP** server for programmatic codebase Q&A. [Source: https://docs.devin.ai/work-with-devin/deepwiki-mcp.md, accessed 2026-08-07]
- **Custom slash commands** at the org level — e.g. `/deploy` with team's deployment checklist. [Source: https://docs.devin.ai/work-with-devin/slash-commands.md, accessed 2026-08-07]
- **Playbooks**, **Scheduled Sessions**, **Auto-triage**, **Autofix**, **Security Swarm** ("Find, triage, and remediate security vulnerabilities across your repositories"). [Source: https://docs.devin.ai/work-with-devin/security-swarm.md, accessed 2026-08-07]
- **Adaptive model router**: "Adaptive is Cognition's intelligent model router that automatically selects the best AI model for each task." [Source: https://docs.devin.ai/cli/adaptive.md, accessed 2026-08-07]
- **MCP Marketplace** (plugins) — also extensible via Devin CLI plugins (`/cli/extensibility/plugins/overview.md`). [Source: https://docs.devin.ai/cli/extensibility/plugins/overview.md, accessed 2026-08-07]
- **Devin Outposts** for self-hosted sessions on customer infrastructure. [Source: https://docs.devin.ai/cloud/outposts/overview.md, accessed 2026-08-07]
- **AGENTS.md** and Rules for always-on instructions. [Source: https://docs.devin.ai/cli/extensibility/rules.md, accessed 2026-08-07]
- **Skills** (reusable prompts and workflows) and **Hooks** (lifecycle event handlers) in Devin CLI. [Source: https://docs.devin.ai/cli/extensibility/skills/overview.md, accessed 2026-08-07] [Source: https://docs.devin.ai/cli/extensibility/hooks/overview.md, accessed 2026-08-07]
- **Subagents** in Devin CLI. [Source: https://docs.devin.ai/cli/subagents.md, accessed 2026-08-07]
- **AI Guardrails** (prompt-injection screening) and **Attribution Filtering** (block Devin output matching public repos). [Source: https://docs.devin.ai/enterprise/features/ai-guardrails.md, accessed 2026-08-07]

## 25. Developer Experience

- **Devin API** (REST, v1/v2/v3) for programmatic access: sessions, knowledge, PR reviews, schedules, consumption metrics, code scans, attachments. [Source: https://docs.devin.ai/api-reference/overview.md, accessed 2026-08-07]
- **Python SDK** (federal deployments reference one for ACU analytics and group management). [Source: https://docs.devin.ai/federal/api/python-sdk.md, accessed 2026-08-07]
- **Devin CLI** is a local agent with deep Cloud integration; subagents, hooks, MCP, skills, plugins. [Source: https://docs.devin.ai/cli/index.md, accessed 2026-08-07]
- **Devin MCP server** (official) for private and public repos — usable from any MCP-compatible client. [Source: https://docs.devin.ai/work-with-devin/devin-mcp.md, accessed 2026-08-07]
- **MCP Marketplace** for third-party integrations (Datadog, Sentry, Figma, Notion, Stripe, etc.). [Source: https://docs.devin.ai/work-with-devin/mcp.md, accessed 2026-08-07]
- **Plugins** (org-governed, installable from a team marketplace). [Source: https://docs.devin.ai/cli/extensibility/plugins/overview.md, accessed 2026-08-07]
- **SDKs / integrations**: GitHub, GitLab, Bitbucket, Azure DevOps, Jira, Linear, Slack, Microsoft Teams; GitHub PR Templates; Self-hosted SCM & Artifacts. [Source: https://docs.devin.ai/integrations/overview.md, accessed 2026-08-07]
- **OpenAPI specs** published at v1-openapi.yaml, v2-openapi.yaml, v3-openapi.yaml. [Source: https://docs.devin.ai/llms.txt, accessed 2026-08-07]
- **Migration guide** for API v1/v2 → current. [Source: https://docs.devin.ai/api-reference/getting-started/migration-guide.md, accessed 2026-08-07]
- **Active release cadence**: Cognition blog shows releases every few days in 2026 — SWE-1.7, Fable 5, Devin 2.2, Devin Desktop, AI Productivity Guarantee, Devin in Windsurf, FedRAMP. [Source: https://cognition.ai/blog, accessed 2026-08-07]
- **AI Productivity Guarantee** (June 2026 blog): "AI should earn its keep" — Cognition offers a money-back guarantee if Devin doesn't deliver measurable productivity. [Source: https://cognition.ai/blog/ai-productivity, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Mature async teammate workflow**. Slack/Teams/Jira/Linear + PR output is a familiar engineering pattern; no new mental model required. [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07] [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]
2. **Parallelism at scale**. Managed Devins + parallel cloud sessions + ACU metering make large-batch migrations tractable. Nubank case study: 12x engineering hours saved on a multi-million-line ETL refactor with 1,000+ engineers originally planned. [Source: https://cognition.ai/devin, accessed 2026-08-07] [Source: https://docs.devin.ai/work-with-devin/advanced-capabilities.md, accessed 2026-08-07]
3. **Devin Review is genuinely differentiated**. Smart-diff organization, bug catcher with confidence labels, CWE-classified security scanning, codebase-aware chat with cited answers, GitHub PR actions (merge/close/draft/auto-merge) without leaving the page. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
4. **Stacked PRs as first-class GitHub objects** — Devin auto-splits large changes, auto-resolves conflicts, lands bottom-up. [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07]
5. **Computer Use** — full desktop control (mouse, keyboard, GUI apps, screenshots) on Linux + Windows. Lets Devin test web/desktop apps the way a human would. [Source: https://docs.devin.ai/work-with-devin/computer-use.md, accessed 2026-08-07]
6. **Enterprise-grade security & compliance**. FedRAMP Class D High In-Process, SOC 2, Customer Managed Keys (AWS KMS), AI Guardrails, Attribution Filtering, OIDC/SAML/Okta/Entra SSO, SCIM, IP Access Lists. [Source: https://docs.devin.ai/admin/security.md, accessed 2026-08-07] [Source: https://docs.devin.ai/enterprise/security-access/security/customer-managed-keys.md, accessed 2026-08-07]
7. **Open API surface & SDKs**. Three API versions, OpenAPI specs published, Python SDK, MCP server. [Source: https://docs.devin.ai/api-reference/overview.md, accessed 2026-08-07]
8. **Free Devin Review for public PRs** (no account required) is a smart distribution/acquisition play. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
9. **HN-positive power user anecdotes** — "I've been really impressed with Devin. IMO it's the best tool for AI generating features if you know what you're looking for, have patterns to follow, etc. I suspect the context they build about your project helps a ton." [Source: https://news.ycombinator.com/item?id=46712069, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Brand toxicity documented on HN**. "The Devin name/branding is so toxic that nobody will try their current product offerings, so the hollowed out shell of a respected company is actually fine for their needs." [Source: https://news.ycombinator.com/item?id=44563635, accessed 2026-08-07] Also: "kind of funny that no one seems to know them by name, only by the infamously panned reception of their main product." [Source: https://news.ycombinator.com/item?id=44563977, accessed 2026-08-07] And the Devin Review thread: "'Devin' has negative brand value." [Source: https://news.ycombinator.com/item?id=46712096, accessed 2026-08-07]
2. **Skepticism of "AI software engineer" marketing claim**. The original March 2024 launch demo claimed SWE-bench resolution of 13.86% (vs 1.96% prior SOTA) — but the demo was unassisted while all comparison models were assisted, and Cognition themselves noted "Devin was evaluated on a random 25% subset of the dataset." [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07] HN comment on Devin GA: "Is there any evidence this works better than Claude 3.5?" [Source: https://news.ycombinator.com/item?id=42379264, accessed 2026-08-07]
3. **Streamer-discovered vulnerability live on air (Oct 2024)**. "Streamer discovers major vulnerability in Cognition's Devin live on air" (8 points HN). HN comment: "This situation is both embarrassing and difficult to excuse given the severity. It's especially puzzling since they've been testing this for about a year. Something of this nature should have been caught and feels amateurish." [Source: https://news.ycombinator.com/item?id=42404132, accessed 2026-08-07] [Source: https://news.ycombinator.com/item?id=42404760, accessed 2026-08-07]
4. **"Two turkeys don't make an eagle" sentiment** around the Windsurf acquisition — concern that combining two struggling products doesn't fix either. [Source: https://news.ycombinator.com/item?id=44563657, accessed 2026-08-07]
5. **Cost concern from HN**. "$500/month for whole teams. I get why that is the pricing, but doesn't work for me to try it in side projects." [Source: https://news.ycombinator.com/item?id=42379285, accessed 2026-08-07] (Note: Devin 2.0 introduced a $20/mo individual tier.) [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
6. **AI-review-of-AI slop concern**. "AI reviewing AI does lead to a cycle of ouroboros slop." Cognition staffer response: "Devin Review is actually more of a UI for you to read code easier, not like other code review tools that try to do all the reviewing themselves." — admitting the tool is closer to a UI than a reviewer. [Source: https://news.ycombinator.com/item?id=46712120, accessed 2026-08-07] [Source: https://news.ycombinator.com/item?id=46712183, accessed 2026-08-07]
7. **Induced-demand concern for PRs**. "I can foresee a future of induced demand, where by making PRs 'easier' to review, you will end up with way more PRs to review." [Source: https://news.ycombinator.com/item?id=46712034, accessed 2026-08-07]
8. **Limited Git provider support for Stacked PRs** — "Stacked PRs are supported for **GitHub.com repositories only**. GitHub Enterprise Server, GitLab, and other providers do not have a stacked PR API." [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07]
9. **Bitbucket and Azure DevOps** lack support for bug catcher, codebase-aware chat, code changes from chat in Devin Review. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
10. **Accuracy / reliability not directly measurable from public artifacts**. No public benchmark scores on SWE-bench since the original 13.86% claim. The docs themselves admit: "In some cases Devin may not function exactly as referenced, or documentation may be out of date." [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]
11. **Heavyweight infrastructure cost**. Sandboxed cloud VMs with full desktop, browser, IDE — ACU metering is opaque to public docs; only enterprise customers see the numbers. Federal ACU caps doc suggests internal rate limits are a real concern. [Source: https://docs.devin.ai/federal/acu-limits.md, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Async teammate mental model is the right shape for senior engineers** — Slack/Teams/Jira/Linear are existing channels; delegate-and-review beats pair-coding for batch work. [Source: https://docs.devin.ai/get-started/devin-intro.md, accessed 2026-08-07]
- **Interactive Planning as immediate-feedback gesture**. Devin 2.0 responds in seconds with files/findings/preliminary plan before the long execute begins — a clever latency-hiding pattern. [Source: https://cognition.ai/blog/devin-2, accessed 2026-08-07]
- **PR-as-trust-boundary** mirrors Aider's git-as-trust-boundary — both products land AI work as reviewable artifacts subject to existing branch protections. [Source: https://docs.devin.ai/essential-guidelines/sdlc-integration.md, accessed 2026-08-07]
- **Stacked PRs** for large changes is a thoughtful, GitHub-native mechanism — auto-resolving conflicts bottom-up. [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07]
- **Smart-diff organization** in Devin Review (group related edits, detect copy/move) materially improves reviewability of agent-generated PRs. [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Video recordings as proof** of end-to-end testing — tangible trust artifact, not just a claim. [Source: https://docs.devin.ai/work-with-devin/testing-and-recordings.md, accessed 2026-08-07]
- **Inline Slack keyword grammar** (`!ask`, `!deep`, `mute`, `sleep`, `archive`, `EXIT`, `!dana`, `!fast`) is a memorable micro-syntax for ambient control without leaving chat. [Source: https://docs.devin.ai/integrations/slack.md, accessed 2026-08-07]
- **Handoff pattern**: local CLI for quick fixes, `/handoff` to cloud for long tasks. Lets the user stay in flow locally while delegating the heavy work. [Source: https://docs.devin.ai/work-with-devin/devin-handoff.md, accessed 2026-08-07]
- **Auto-Fix on review comments** closes the loop: AI fixes its own flagged bugs and iterates on CI failures. [Source: https://docs.devin.ai/essential-guidelines/when-to-use-devin.md, accessed 2026-08-07]
- **Adaptive model router** abstracts model choice away from the user ("automatically selects the best AI model for each task"). [Source: https://docs.devin.ai/cli/adaptive.md, accessed 2026-08-07]
- **AI Productivity Guarantee** (June 2026) — financial-skin-in-the-game positioning for enterprise trust. [Source: https://cognition.ai/blog/ai-productivity, accessed 2026-08-07]
- **MCP Marketplace + plugins + skills + hooks** as the extensibility ladder — third parties can extend Devin without forking. [Source: https://docs.devin.ai/cli/extensibility/index.md, accessed 2026-08-07]

## 29. What should MiMo reject?

- **"First AI software engineer" hype-marketing** that outran the actual capability. The original 13.86% SWE-bench claim was on a 25% subset, unassisted vs assisted baselines; HN reacted with sustained skepticism and the Devin name acquired "negative brand value." [Source: https://cognition.ai/blog/introducing-devin, accessed 2026-08-07] [Source: https://news.ycombinator.com/item?id=46712096, accessed 2026-08-07]
- **Opaque pricing** — $500/mo teams tier scared off individual users on launch; only Devin 2.0's $20 tier partially recovered this. MiMo should publish transparent pricing from day one. [Source: https://news.ycombinator.com/item?id=42379285, accessed 2026-08-07]
- **AI-reviewing-AI-as-final-judge**. HN commenter is right: "under no circumstances should we allow AI to be the final judge of whether something should be merged into trunk." Devin Review staff themselves walked this back to "more of a UI for you to read code easier." [Source: https://news.ycombinator.com/item?id=46712015, accessed 2026-08-07] [Source: https://news.ycombinator.com/item?id=46712183, accessed 2026-08-07]
- **Induced PR demand** without commensurate review capacity — making PRs "easier" doesn't help if review throughput doesn't scale. [Source: https://news.ycombinator.com/item?id=46712034, accessed 2026-08-07]
- **Heavyweight sandboxed cloud VM** as the only execution substrate — ACU metering and per-session VMs impose real cost; MiMo should consider lighter-weight execution modes for simple tasks. [Source: https://docs.devin.ai/admin/billing/usage.md, accessed 2026-08-07]
- **Limited Git provider support** for headline features (Stacked PRs GitHub.com only; Bitbucket/Azure DevOps partial Devin Review) — MiMo should design provider-agnostic abstractions from day one. [Source: https://docs.devin.ai/work-with-devin/stacked-prs.md, accessed 2026-08-07] [Source: https://docs.devin.ai/work-with-devin/devin-review.md, accessed 2026-08-07]
- **Multiple overlapping surface names** (Devin Cloud, Devin Desktop, Devin CLI, Devin Review, Devin Windows VM, Devin in Windsurf, Devin in JetBrains, Devin in Zed, Devin in Xcode, Cognition for Government) — brand fragmentation that confuses buyers. MiMo should pick one product name and stick to it. [Source: https://cognition.ai/, accessed 2026-08-07]
- **No public benchmark since launch** — accuracy is unverifiable from outside; trust rests on case studies. MiMo should publish ongoing benchmark numbers.

## 30. Confidence Score

**Devin: 82/100**.

Reasoning: I read 18 canonical Devin docs (devin-intro, first-run, instructing, when-to-use, sdlc, good-vs-bad, devin-review, slash-commands, stacked-prs, ask-devin, deepwiki, computer-use, devin-session-tools, advanced-capabilities, slack-integration, integrations-overview, devin-handoff, security-swarm) plus the cognition.ai blog introducing-devin (March 2024) and devin-2 (April 2025). I also pulled four HN threads (Devin GA 155 pts, Devin Review 36 pts, Cognition-acquires-Windsurf 502 pts, Streamer-vuln 8 pts) and the YC launch story list to corroborate sentiment. The 18-point gap is for: (a) no direct product trial — Devin is a paid cloud product and I did not authenticate, so claims about animation, exact layout, and runtime behavior are doc-grounded, not directly observed; (b) accuracy / actual-task-success-rate is unverifiable — Cognition has not published SWE-bench numbers since the March 2024 13.86% claim, and HN sentiment is split; (c) "Matt Duggan" specifically referenced in the task brief could not be located via HN Algolia search (zero hits for "Matt Duggan Devin"); I substituted with broader HN-sourced accuracy/brand concerns from multiple top-rated threads — the *substance* of the concern (Devin accuracy problems) is well-evidenced from those threads, but I could not attribute it to the specific named source.

[Sources: 18 docs from docs.devin.ai/*.md, all accessed 2026-08-07; 2 cognition.ai blog posts; 4 HN threads; cognition.ai/devin case study page; docs.devin.ai/llms.txt index, accessed 2026-08-07]
