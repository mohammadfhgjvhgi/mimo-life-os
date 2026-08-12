# Warp (Terminal) — Evidence File

**Task ID:** W11 (Phase R2 — EVIDENCE-BASED)
**Researcher:** Senior Product Researcher (MiMo)
**Date accessed:** 2026-08-07
**Evidence base:** Raw HTML/TXT in `/home/z/my-project/research/evidence/raw-warp/` (home.html, docs.html [Getting started with Warp and Oz], docs-warp-drive.html [Warp Drive overview], docs-workflows.html [YAML Workflows], warp-agent.html, agent-cli.html, agent-kits.html, blog.html).
**Method:** Direct `curl` of official URLs (warp.dev, docs.warp.dev, warp.dev/blog, warp.dev/agent-cli, warp.dev/agents/warp-agent, warp.dev/agent-kits), text extraction via `extract_text.py`. Several marketing pages (warp.dev/features/agent-mode and /features/warp-drive) returned 404 — these features now live at /agent-cli, /agents/warp-agent, /agent-kits, and docs.warp.dev.

> **Critical evidence note on product evolution:** Warp has re-positioned from "a modern terminal" to **"The Agentic Development Environment"** (current homepage H1). Product line is now four surfaces: Warp Terminal (modern terminal for agentic coding), Warp Agent (orchestration-native coding agent built into the terminal), Warp Agent CLI (standalone CLI agent launched Aug 4, 2026 — usable in any terminal including Ghostty, iTerm2, VS Code, built-in Windows/Mac Terminals), and Oz Agent Platform (cloud agent orchestration platform / "software factory"). Warp client open-sourced under AGPL v3 on Apr 28, 2026. [Source: https://www.warp.dev/, accessed 2026-08-07; https://docs.warp.dev/, accessed 2026-08-07; https://www.warp.dev/blog, accessed 2026-08-07]

---

## 1. Product Overview

Warp homepage tagline: "Warp — The Agentic Development Environment. NEW: Warp Agent CLI, a new standalone CLI that lets you use the Warp Agent anywhere." [Source: https://www.warp.dev/, accessed 2026-08-07]

Docs framing: "Warp is an open source Agentic Development Environment that combines a modern, high-performance terminal with powerful agents to help you build, test, deploy, and debug code. Warp's agents are powered by Oz, the orchestration platform for running agents locally or in the cloud at scale." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Four products (per Warp nav): Warp Terminal, Warp Agent, Warp Agent CLI, Oz Agent Platform. [Source: https://www.warp.dev/, accessed 2026-08-07]

Customer scale: "64k" displayed in pricing area; "Join a community of 800,000 developers using Warp Agent." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

OS support: macOS 10.14+ (brew install --cask warp), Linux (.deb / .rpm / .tar.zst / AppImage, x64 + ARM64), Windows 11/10 (.exe, winget install Warp.Warp, x64 + ARM64). [Source: https://www.warp.dev/, accessed 2026-08-07]

## 2. Product Philosophy

Homepage hero: "The open platform for automating development. Infrastructure to build, measure, and interact with agents across your SDLC — so you ship more and spend less." Four-pillar philosophy banners: "CHOOSE ANY HARNESS" (OpenAI etc.), "SELF-HOST OR WARP-HOST", "CONNECT ANY TOOL", "OWN YOUR DATA — ANY INFERENCE PROVIDER — ANY MODEL." [Source: https://www.warp.dev/, accessed 2026-08-07]

CEO memo framing (June 18, 2026 blog): "We are now factory engineers, not product engineers. This is the memo I shared with the Warp team about what building Warp needs to look like. We will focus less on interactive coding and more on automating software factories, and work with other companies to help them do the same." [Source: https://www.warp.dev/blog, accessed 2026-08-07]

Warp Agent page: "Designed to adapt to your workflow. Granular control over agent permissions. Determine what files agents can read from and write to, what MCP servers they can access, and what commands they can run. Compatible with all industry standards. Warp Agent has support for AGENT.md, Skills, MCP, and all other industry standards for agents. Easy to get started. When you initialize a codebase, Warp Agent will identify any existing Claude.md or Cursor.md files to make switching seamless." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

## 3. Core Mental Model

Warp mental model = **terminal as the agent surface** + **Warp Drive as shared knowledge** + **Oz as the orchestration layer that runs agents locally or in the cloud**.

Docs: "Warp is where you work — a fast, modern terminal built for coding with agents." + "Oz is the orchestration platform for cloud agents that powers all of Warp's intelligent features. Oz is designed to coordinate agents at scale—understanding your codebase, executing tasks autonomously, and adapting to your workflows." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Same-agent-anywhere principle: "Same agent, anywhere: Whether you're working interactively in Warp or running agents in the cloud, you're using the same underlying agent capabilities. Seamless handoff: Start a task in the cloud and take over locally in Warp when you want hands-on control, without losing progress or context. Shared context: Warp Drive, Rules, and MCP servers work across both local and cloud agents, so your team's knowledge and tools are always available." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Warp Agent CLI (Aug 2026): "A coding agent for engineers who live in the terminal. A state of the art, terminal-native coding agent CLI that keeps you in flow across sessions, remote systems, debuggers, and REPLs. Now available in any terminal." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

## 4. User Journey

Install via brew/winget/curl. [Source: https://www.warp.dev/, accessed 2026-08-07]

Warp Agent CLI install: `$ curl -fsSL https://app.warp.dev/download/agent-cli | bash`. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Docs nav (docs.warp.dev): Getting started → Quickstart → Installation and setup → Coding in Warp → Customizing Warp → Migrate to Warp (from Claude Code / Cursor / Ghostty / iTerm2 / macOS Terminal / VS Code terminal / Windows Terminal) → Supported shells → Keyboard shortcuts → Terminal → Blocks → Modern text editing → Command entry → Windows and Tabs → Sessions → Terminal appearance → Settings file → Warpify → More Features → Knowledge and collaboration (Warp Drive overview, Notebooks, Workflows, Prompts, Environment Variables, AI-Integrated Objects, Warp Drive on the web, Agent Mode context) → Team management → Enterprise. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Migration from competing products is a first-class docs section — Warp explicitly supports Claude Code, Cursor, Ghostty, iTerm2, macOS Terminal, VS Code terminal, Windows Terminal migrations. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 5. Navigation

Terminal keyboard navigation: "Command Search or Workflow Search CTRL-SHIFT-R" opens the workflows/command search panel. [Source: https://docs.warp.dev/terminal/entry/yaml-workflows/, accessed 2026-08-07]

Warp Drive navigation panel toggle: "CTRL-SHIFT-\\" switches the Warp Drive side panel. [Source: https://docs.warp.dev/knowledge-and-collaboration/warp-drive-overview/, accessed 2026-08-07]

Warp Drive keyboard navigation: "Press UP / DOWN or j / k to navigate to the object you want. Press Enter to (1) execute an object, (2) open/collapse a workspace or folder, or (3) open the trash. Press CMD-ENTER [mac] / CTRL-ENTER [Windows/Linux] to open an object's context menu. Press CMD-SHIFT-( and CMD-SHIFT-) to switch focus between the terminal and Warp Drive. Press LEFT-ARROW to collapse a workspace or folder. Press RIGHT-ARROW to open a workspace or folder. Press Esc to return to Warp Drive from your trash." [Source: Warp Drive overview docs, accessed 2026-08-07]

Command Palette also exposes "Switch Focus to Left Panel" and "Switch Focus to Right Panel" commands. [Source: Warp Drive overview docs, accessed 2026-08-07]

## 6. Workspace (Warp terminal blocks; built-in code editor; Warp Drive)

Warp workspace = terminal blocks + Warp Drive panel + Code Review panel + Code editor + File Tree. [Source: https://docs.warp.dev/, accessed 2026-08-07]

"Modern terminal UX: Cursor movement, block-based navigation, multi-line editing, syntax highlighting, and rich completions. Built with Rust for high performance." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Built-in Code editor with LSP support: "File tree, code editor with LSP support, and interactive code review experience." Docs nav: "Code overview / Built-in code editor / Language Server Protocol (LSP) / File Tree (Project Explorer) / Find & replace / Code editor / Vim keybindings / Code Review panel / Git Worktrees / Feature support over SSH." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Warp Drive is the persistent knowledge/workspace layer: "When you open the Warp Drive panel, you will find a personal workspace where you can store your Workflows, Notebooks, Prompts, and Environment Variables and organize them into folders. If you are a member of a team using Warp Drive, your team's workspace will also be available in the side panel." [Source: Warp Drive overview docs, accessed 2026-08-07]

Warp Drive also accessible via web: "Warp Drive on the web" is a docs subtopic. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Warp Agent CLI workspace: built-in multiplexer — "The Warp Agent CLI directly manages pty connections similarly to tmux, unlocking more powerful agent workflows." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

## 7. Conversation (Warp Agent + Warp Agent CLI)

Warp Agent invocation: "Natively integrated into Warp. Kick off agents by typing in natural language, accepting a prompt suggestion, or typing /agent. Warp Agent comes fully bundled." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Terminal and Agent modes: "Switch between a clean terminal for commands and a dedicated conversation view for multi-turn agent workflows." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Shell-command interleaving: "Use ! to run a shell command, or let Warp detect natural language automatically. If you forget a command argument, tab completion fills in the gap." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

REPL interactive control: "Run terminal apps like sqlite and python through the agent session. Warp Agent can also control those apps. So within a REPL you can ask our agent to write queries or interactively debug code." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

## 8. Agent Experience (Warp Agent + Warp Drive + Agent Mode)

Warp Agent capabilities (per product page): "Delegate to a state of the art agent harness with multi-agent orchestration, model routing, access to all the best models, codebase indexing, and granular permission controls." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Multi-Repo Projects: "Warp Agent indexes your codebase in real time, pulls context from your Warp Drive, and works across multiple repos." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Multi-model: "Access the latest models from OpenAI, Anthropic, Google, and xAI — plus top open-source models like GLM 5.2 and DeepSeek V4 — and switch between them seamlessly with full uptime." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Long-running commands: "Warp Agent can run, monitor, and manage long-running commands like pip, REPLs, and your server logs. You can also use Warp Agent in your SSH environments." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Third-party CLI agents: "Run third-party CLI agents like Claude Code, Codex, and OpenCode with Warp's agent toolbelt — rich input, code review, notifications, and more." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Warp Agent CLI multi-agent: "Run complex multi-agent and cloud agent workflows. Automatically orchestrate tasks across local and cloud subagents, each running in inspectable sessions so you can easily monitor progress and steer actions. Push local sessions to the cloud to keep steering on the go." Plus: "Choose the right agent for each job. Delegate work to cloud agents powered by Warp Agent, Claude Code, or Codex. Monitor and steer every session from one place while each task run is powered by your favorite agent." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Cloud agent triggers: "Triggers: React to events from Slack, Linear, GitHub, or custom webhooks. Schedules: Run recurring tasks like dependency updates or dead code removal. Parallelism: Run many agents concurrently across repos or tasks. Observability: Every run is tracked, auditable, and shareable with your team." [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 9. Memory (Warp Drive learns your commands)

Warp Drive stores Workflows, Notebooks, Prompts, Environment Variables organized into folders. Personal workspace + team workspace. [Source: Warp Drive overview docs, accessed 2026-08-07]

Warp Drive offline mode: "In offline mode, some files will be read-only. You can still create and edit files while offline in your personal space. They will only be saved locally and will not be synced." [Source: Warp Drive overview docs, accessed 2026-08-07]

Session persistence across directory changes: "Sessions persist across directory changes and context switches. Change from your client directory to your server directory without losing agent context. SSH into a remote host and use the agent without installing a remote binary." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Warp Agent reads existing context files: "When you initialize a codebase, Warp Agent will identify any existing Claude.md or Cursor.md files to make switching seamless." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Codebase indexing: "Warp Agent indexes your codebase in real time, pulls context from your Warp Drive, and works across multiple repos." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Docs nav subtopic "Session restoration" implies sessions persist across app restarts. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 10. Knowledge (Warp Drive)

Warp Drive object types (per docs nav): Notebooks, Workflows, Prompts, Environment Variables, AI-Integrated Objects, Warp Drive on the web, Agent Mode context. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Warp Drive permissions model (three sharing modes): "Teams: All members of a Warp team have full access to the objects in its Drive. Direct Sharing: Objects can be shared directly with individuals by email. Link-based Sharing: You can make an object public to anyone with the link, including those without Warp accounts." [Source: Warp Drive overview docs, accessed 2026-08-07]

Permission levels: Can view / Can edit / Full access — with explicit capability matrix (read a notebook, execute a Workflow, use env vars, edit contents, create objects in folder, trash/untrash, delete permanently, modify permissions, move). [Source: Warp Drive overview docs, accessed 2026-08-07]

Permissions inherited from parent folders. "Owners and their teammates always have full access." [Source: Warp Drive overview docs, accessed 2026-08-07]

Import/export: Workflows ↔ YAML; Notebooks ↔ Markdown; Environment Variables → DOTENV (.env); Prompts → YAML (export only). [Source: Warp Drive overview docs, accessed 2026-08-07]

## 11. Search (Command Search; Workflow Search; Codebase indexing)

Command Search / Workflow Search panel: "Open the Command Search or Workflow Search CTRL-SHIFT-R panel to find Workflows. Once inside the menu, start typing in the search bar to filter the existing Workflows. (e.g. git, android, npm, etc.)" [Source: YAML Workflows docs, accessed 2026-08-07]

When a workflow is selected: "use SHIFT-TAB to cycle through the arguments." [Source: YAML Workflows docs, accessed 2026-08-07]

Tailoring search scope: "Tailor your Command Search experience by toggling off 'Show Global Workflows' in Settings > Features > Workflows. When disabled, your search will exclusively encompass YAML and Warp Drive Workflows." [Source: YAML Workflows docs, accessed 2026-08-07]

Warp Agent codebase indexing: "Warp Agent indexes your codebase in real time" — semantic search across repo content. [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

## 12. Execution (Warp terminal commands + AI)

Warp Agent CLI execution: "Drive interactive and full-screen tools" + "Run terminal apps like sqlite and python through the agent session." + "Run shell commands without breaking your flow" (`!` prefix). [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Local agents: "Run directly in the Warp app for real-time, interactive coding assistance. Write and refactor code across your codebase. Debug issues and fix errors. Run commands and interpret results. Plan and execute multi-step tasks. Local agents keep you in control. You can review changes, steer the agent mid-task, and approve actions before they execute." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Cloud agents execution: "Cloud agents run in the background on Warp's infrastructure (or your own) for automation at scale." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Granular permission controls: "Determine what files agents can read from and write to, what MCP servers they can access, and what commands they can run." [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

## 13. Artifacts (Warp blocks; Workflows; Notebooks; Agent Kits)

Blocks are the core terminal artifact: "Block basics, Block actions, Block sharing, Block find, Block filtering, Background blocks, Sticky Command Header." Docs nav subsection. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Workflows artifact (YAML format spec): name, command, tags, description, source_url, author, author_url, shells, arguments (with name, description, default_value). Workflows are "easily parameterized and searchable by name, description, or command arguments." [Source: YAML Workflows docs, accessed 2026-08-07]

Notebooks as a knowledge artifact type. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Agent Kits — pre-built deployable agent workflows: Fraud Detection Agent (Claude Sonnet 4.5), Conversion Ratio Optimization Agent (Claude Sonnet 4.5), Documentation Agent (Claude Haiku 4.5), Social Monitoring Agent (Claude Sonnet 4.5), Go-to-Market Agent (Claude Opus 4.5), Account Status Agent (Grain trigger → Notion update), POC Agent (HubSpot+Metabase → Slack), Recruiting Sourcing Agent (Claude Sonnet 4.5), Competitive Intelligence Agent (Claude Opus 4.5), Client Release Agent (Claude Sonnet 4.5). Each Kit exposes Trigger, Skill (.md file), Model. [Source: https://www.warp.dev/agent-kits, accessed 2026-08-07]

Rectangle Health case study (June 12, 2026): "Rectangle Health used Oz to build a self-improving AI teammate that takes issues from triage through merged PR. The teammate, named Rex, currently ships 35K+ lines of code per week and has written over 50% of it's own code." [Source: https://www.warp.dev/blog, accessed 2026-08-07]

## 14. Keyboard UX (Warp blocks + workflows)

Keyboard-first Warp Drive navigation: UP/DOWN or j/k to navigate, Enter to execute, CMD-ENTER (mac) / CTRL-ENTER (Win/Linux) for context menu, CMD-SHIFT-( / CMD-SHIFT-) for terminal↔Warp Drive focus, LEFT/RIGHT arrow to collapse/expand, Esc to return from trash. [Source: Warp Drive overview docs, accessed 2026-08-07]

CTRL-SHIFT-R opens Command Search / Workflow Search. [Source: YAML Workflows docs, accessed 2026-08-07]

CTRL-SHIFT-\ toggles the Warp Drive side panel. [Source: Warp Drive overview docs, accessed 2026-08-07]

SHIFT-TAB cycles through Workflow arguments. [Source: YAML Workflows docs, accessed 2026-08-07]

`!` prefix runs a shell command (vs natural language to the agent). [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Vim keybindings available for code editor + text editing. Docs nav lists "Vim keybindings" under both Modern text editing and Code editor. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 15. Motion (Warp block transitions)

Blocks are first-class motion primitives — each command+output becomes a discrete Block with its own actions, share, find, filter. [Source: https://docs.warp.dev/, accessed 2026-08-07]

"Sticky Command Header" + "Background blocks" suggest motion-design distinctions for long-running vs foreground blocks. [Source: https://docs.warp.dev/, accessed 2026-08-07]

"Pane dimming & focus" is a settings option — visual hierarchy via focus dimming. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 16. Animation

Warp marketing site shows "Livestream" video player on hero. [Observed: https://www.warp.dev/, accessed 2026-08-07]

Block transitions and pane dimming/focus imply motion design in the terminal itself, but no animation-token documentation surfaced. [Observed: https://docs.warp.dev/, accessed 2026-08-07]

## 17. Visual Hierarchy

Homepage hierarchy: nav (Products/Solutions/Resources/Company/Enterprise/Pricing + Book a demo + Get Started) → hero (tagline + Start Automating + Download Warp Terminal) → four-pillar philosophy ("CHOOSE ANY HARNESS / SELF-HOST OR WARP-HOST / CONNECT ANY TOOL / OWN YOUR DATA") → "0 K Active Developers / 0 % of the Fortune 500 / 0 K Agents Running Daily" stats strip → Livestream + Case Study + Launch Partner + Course Partner cards → testimonials (Microsoft, OpenAI, Stripe) → "Scale Across Your Team" three-card grid (Warp Terminal / Oz Agent Platform / Warp Agent) → open-source announcement block → testimonial wall (X posts) → download grid (Mac/Linux/Windows install commands). [Observed: https://www.warp.dev/, accessed 2026-08-07]

Warp Agent page: hero ("Meet Warp Agent — The state of the art coding agent built into Warp") → feature cards (Multi-Repo Projects / Multi-model / Backed by the full power of the terminal / Natively integrated into Warp / Designed to adapt to your workflow / Compatible with all industry standards / Easy to get started) → "Join a community of 800,000 developers" social proof. [Observed: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

## 18. Progressive Disclosure

Three-layer agentic surface, progressively disclosed:
1. Warp Terminal (interactive local)
2. Warp Agent CLI (terminal-native agent, available in any terminal)
3. Oz Agent Platform (cloud orchestration at scale) [Source: https://www.warp.dev/, accessed 2026-08-07]

Warp Drive permissions model is progressive: personal workspace → team workspace → direct email share → public link sharing. [Source: Warp Drive overview docs, accessed 2026-08-07]

Workflows progressively disclosed: Global Workflows (community, in Workflows repo) → Repository Workflows (.warp/workflows/) → Local Workflows ($HOME/.warp/workflows/). [Source: YAML Workflows docs, accessed 2026-08-07]

Caution note in workflows docs: "You can continue to use YAML-based workflows, but we recommend using new workflows in Warp Drive instead for a better editing experience." — features are migrating from YAML files to Warp Drive objects. [Source: YAML Workflows docs, accessed 2026-08-07]

## 19. Accessibility

Docs site has dedicated Accessibility section: "Accessibility" listed under "More Features" in docs nav. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Keyboard-first Warp Drive navigation (j/k, arrows, Enter, Esc) — strong keyboard accessibility. [Source: Warp Drive overview docs, accessed 2026-08-07]

"Audible terminal bell" + "Desktop notifications" listed as features — multi-modal accessibility affordances. [Source: https://docs.warp.dev/, accessed 2026-08-07]

"Text, fonts, & cursor" customization (per docs nav) supports visual accessibility. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 20. Performance Perception (Warp terminal latency)

Built with Rust: "Built with Rust for high performance." [Source: https://docs.warp.dev/, accessed 2026-08-07]

"Performance benchmarks" + "Terminal comparisons" are dedicated docs subtopics — Warp publishes performance data vs competing terminals. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Long-running command monitoring: "Warp Agent can run, monitor, and manage long-running commands like pip, REPLs, and your server logs." — prevents terminal-blocking. [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Background blocks + Sticky Command Header — keep foreground interactive while long jobs run. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Notification-driven completion: "I'm loving @warpdotdev. I can run multiple agents and they also show notifications when they are done. 💪" — Twitter testimonial quoted on Warp Agent page. [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

## 21. Trust

SOC 2 Certified (footer badge: "SOC 2 Certified Checking Status…"). [Source: https://www.warp.dev/, accessed 2026-08-07]

"Zero Data Retention policies with all contracted LLM providers. No customer AI data is retained, stored, or used for training." [Source: https://docs.warp.dev/, accessed 2026-08-07]

"Warp's AI features can be globally disabled in Settings > Agents > Warp Agent." — explicit kill-switch. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Open-source under AGPL v3 — code is auditable at github.com/warpdotdev/warp. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Granular agent permissions (file read/write, MCP server access, command execution). [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

At-cost inference pricing: "Inference is charged at API cost, no markup added." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

## 22. Explainability

Code Review panel: "interactive code review experience" + "Code Review panel" as a docs subtopic. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Each cloud agent run is "tracked, auditable, and shareable with your team." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Each session in Warp Agent CLI runs in "inspectable sessions so you can easily monitor progress and steer actions." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

"You can review changes, steer the agent mid-task, and approve actions before they execute." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Testimonial: "Warp CLI just caught a bug that Cursor and Claude both missed. This isn't a syntax error. A live Kubernetes API failure. drain-node was returning 415. I knew something was wrong with the endpoint. Threw it at Warp to see how it'd approach it. It grepped the repo, found working..." [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

## 23. Long Session Experience

Sessions persist across directory changes + SSH remote hosts. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

"Push local sessions to the cloud to keep steering on the go" — local-to-cloud session handoff. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

"Session restoration" is a docs subtopic under Sessions — sessions survive app restarts. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Cloud agents: "ideal for work that doesn't need your immediate attention, like PR reviews, issue triage, routine maintenance, and integration-driven workflows." [Source: https://docs.warp.dev/, accessed 2026-08-07]

Rectangle Health's "Rex" AI teammate: "ships 35K+ lines of code per week and has written over 50% of its own code." [Source: https://www.warp.dev/blog, accessed 2026-08-07]

## 24. Power User Features (Warp Agent + Warp Drive + Agent Kits + Workflows)

Warp Agent power features: multi-agent orchestration, multi-model with model routing (automatic + custom routers), codebase indexing, granular permission controls (file read/write, MCP, commands), AGENT.md/Skills/MCP/Claude.md/Cursor.md compatibility, multi-repo projects, long-running command monitoring, SSH support. [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

Warp Agent CLI power features: built-in pty multiplexer (tmux-like), interactive REPL control (sqlite, python), natural-language→shell auto-detection, `!` shell prefix, tab completion, custom model routers shareable across team, at-cost inference. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Warp Drive power features: Notebooks + Workflows + Prompts + Environment Variables + AI-Integrated Objects, three sharing modes (Teams / Direct / Link-based), inheritance-based permissions, full keyboard navigation, offline mode, web access, import/export. [Source: Warp Drive overview docs, accessed 2026-08-07]

YAML Workflows: parameterized arguments ({{var}}), per-shell scoping (zsh/bash/fish), local/repo/global scoping, public contribution via Workflows repo PR. [Source: YAML Workflows docs, accessed 2026-08-07]

Agent Kits: pre-built, deployable agent workflows with explicit Trigger + Skill + Model spec (Fraud Detection, CRO, GTM, Documentation, Social Monitoring, Account Status, POC, Recruiting Sourcing, Competitive Intelligence, Client Release). [Source: https://www.warp.dev/agent-kits, accessed 2026-08-07]

## 25. Developer Experience (Warp Drive + Workflows + Oz SDK + API)

Oz Platform docs nav: "Oz" with "Reference" (API), "API Changelog." Docs include: Quickstart, Installation, Coding in Warp, Migrate to Warp, Supported shells, Keyboard shortcuts, etc. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Warp client is open-source AGPL v3 at github.com/warpdotdev/warp with documented contribution process. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Workflows public contribution model: "You can contribute Workflows that will be made available to other Warp users by forking the Workflows repo and opening a pull request." [Source: YAML Workflows docs, accessed 2026-08-07]

Warp Agent CLI install is a single curl one-liner: `$ curl -fsSL https://app.warp.dev/download/agent-cli | bash` — minimum-friction onboarding. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

Multi-platform packaging: macOS brew cask, Linux .deb/.rpm/.tar.zst/AppImage, Windows .exe + winget — for both terminal and Warp Agent CLI. [Source: https://www.warp.dev/, accessed 2026-08-07]

Docs support `.md` appendix: "Markdown versions of each page are available by appending .md to any URL." + "For the complete documentation in markdown, see llms.txt." — LLM-friendly docs surface. [Source: https://docs.warp.dev/, accessed 2026-08-07]

Docs site has AI Q&A: "Ask a question. What do you want to know about Warp? Powered by kapa.ai." — kapa.ai-powered docs search. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Three-surface coherence (Terminal + Agent + Oz)** — "Same agent, anywhere"; "Seamless handoff: Start a task in the cloud and take over locally in Warp when you want hands-on control, without losing progress or context." [Source: https://docs.warp.dev/, accessed 2026-08-07]

2. **Blocks as the core terminal primitive** — block-based navigation, sharing, find, filtering, sticky command header, background blocks. [Source: https://docs.warp.dev/, accessed 2026-08-07]

3. **Warp Drive as durable, shareable team knowledge** — Workflows / Notebooks / Prompts / Environment Variables / AI-Integrated Objects; three sharing modes with permission matrix; full keyboard navigation; web access; offline mode. [Source: Warp Drive overview docs, accessed 2026-08-07]

4. **Open-source under AGPL v3** with public Workflows contribution repo + LLM-friendly docs (`.md` appendix, `llms.txt`). [Source: https://docs.warp.dev/, accessed 2026-08-07]

5. **At-cost inference pricing** — "Inference is charged at API cost, no markup added" + "Setups that would push more than 2% of users over $20/month were ruled out" philosophy (latter from JetBrains benchmark but Warp matches the spirit). [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

6. **Multi-model with custom routers** — frontier (OpenAI, Anthropic, Google, xAI) + open-weights (GLM 5.2, DeepSeek V4); automatic model routing + custom routers shareable across team. [Source: https://www.warp.dev/agents/warp-agent + https://www.warp.dev/agent-cli, accessed 2026-08-07]

7. **Agent Kits as packaged agent workflows** with explicit Trigger / Skill / Model — pre-built deployable starting points for non-coding teams (Fraud Detection, CRO, GTM, Documentation, Recruiting, etc.). [Source: https://www.warp.dev/agent-kits, accessed 2026-08-07]

8. **Strong keyboard UX throughout** — CTRL-SHIFT-R command search, CTRL-SHIFT-\ Warp Drive toggle, j/k navigation, SHIFT-TAB arg cycling, `!` shell prefix, vim keybindings. [Source: Warp Drive overview + YAML Workflows docs, accessed 2026-08-07]

9. **Built-in pty multiplexer in Warp Agent CLI** — manages pty connections like tmux; enables interactive REPL control + remote SSH agent use without remote binary install. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]

10. **Trust posture**: SOC 2 Certified, Zero Data Retention with LLM providers, globally disable AI in Settings, AGPL v3 source. [Source: https://docs.warp.dev/, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Marketing re-positioning creates fragmentation** — Warp has been rebranded from "modern terminal" to "Agentic Development Environment"; the original /features/agent-mode and /features/warp-drive URLs now return 404. Multiple products (Warp Terminal, Warp Agent, Warp Agent CLI, Oz Agent Platform) overlap conceptually. [Observed: 404 on /features/agent-mode + /features/warp-drive; https://www.warp.dev/, accessed 2026-08-07]

2. **GPU/perf concerns for terminal users** — Warp historically faced criticism for being GPU-accelerated and resource-heavy; current docs mention "Performance benchmarks" + "Terminal comparisons" as competitive defense (implying the criticism persists). [Observed: https://docs.warp.dev/, accessed 2026-08-07]

3. **Warp Drive one-way team share** — "It is not currently possible to move an item back from a team's workspace into a personal workspace; if you shared something inadvertently, you should copy the contents of the object to your clipboard, recreate it in your personal workspace, and then delete the object from your team workspace." Also: "It is not currently possible to drag a folder of personal Workflows into a team workspace; you will need to move objects one at a time." [Source: Warp Drive overview docs, accessed 2026-08-07]

4. **Warp Drive offline limitations** — "In offline mode, some files will be read-only." Plus offline-created files "cannot be moved into a team or deleted until you are back online." [Source: Warp Drive overview docs, accessed 2026-08-07]

5. **Prompts and Environment Variables have asymmetric import/export** — "Prompts import isn't supported at this time, but you can export to YAML"; "Environment Variables import isn't supported at this time, but you can export to DOTENV (.env)." [Source: Warp Drive overview docs, accessed 2026-08-07]

6. **YAML Workflows being deprecated in favor of Warp Drive workflows** — but both still need to be supported; "You can continue to use YAML-based workflows, but we recommend using new workflows in Warp Drive instead for a better editing experience." Two competing systems coexist. [Source: YAML Workflows docs, accessed 2026-08-07]

7. **Heavy reliance on Twitter testimonials instead of structured customer evidence** — Warp Agent page features 12+ tweets as social proof rather than named enterprise case studies (only Rectangle Health/Rex is a structured case study, June 12, 2026). [Observed: https://www.warp.dev/agents/warp-agent + https://www.warp.dev/agent-cli, accessed 2026-08-07]

8. **"Factory engineers, not product engineers" pivot is a strategic risk** — June 18, 2026 CEO memo reframes Warp's audience from individual developers to enterprises building "software factories," which may alienate the original terminal-user base. [Source: https://www.warp.dev/blog, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Blocks as the core terminal/REPL primitive** — every command+output is a discrete shareable, findable, filterable Block with sticky header + background support. [Source: https://docs.warp.dev/, accessed 2026-08-07]
- **Warp Drive as a durable team knowledge layer** with Workflows / Notebooks / Prompts / Environment Variables / AI-Integrated Objects, plus three sharing modes with permission inheritance matrix. [Source: Warp Drive overview docs, accessed 2026-08-07]
- **YAML Workflows as a portable, parameterized, machine-readable command-palette format** (with {{argument}} placeholders, per-shell scoping, public contribution via Workflows repo). [Source: YAML Workflows docs, accessed 2026-08-07]
- **Same-agent-anywhere principle** — local interactive (Terminal), CLI-anywhere (Warp Agent CLI), cloud orchestration (Oz) all use the same underlying agent + share Warp Drive context. [Source: https://docs.warp.dev/, accessed 2026-08-07]
- **Seamless local-to-cloud handoff** without losing session/context ("Push local sessions to the cloud to keep steering on the go"). [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]
- **At-cost inference pricing** ("no markup added") — competitive moat vs. credit-based competitors. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]
- **Agent Kits as pre-built agent workflow gallery** with explicit Trigger / Skill / Model spec — ready-to-deploy starting points across teams. [Source: https://www.warp.dev/agent-kits, accessed 2026-08-07]
- **Custom model routers shareable across team** — pareto-efficient multi-model routing as a team-shared artifact. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]
- **AGENT.md / Claude.md / Cursor.md compatibility** — read existing convention files for frictionless migration. [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]
- **Built-in pty multiplexer (tmux-like) inside the agent CLI** — drive interactive REPLs (sqlite, python) directly through the agent. [Source: https://www.warp.dev/agent-cli, accessed 2026-08-07]
- **LLM-friendly docs** — append `.md` to any docs URL; complete docs in `llms.txt`. [Source: https://docs.warp.dev/, accessed 2026-08-07]
- **Granular permission model** (file read/write, MCP, commands per agent) — surface-level controls for trust. [Source: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]
- **Full keyboard navigation** (j/k, Enter, arrows, CMD-ENTER context, SHIFT-TAB arg cycling) — keyboard-first product surface. [Source: Warp Drive overview + YAML Workflows docs, accessed 2026-08-07]

## 29. What should MiMo reject?

- **One-way team share with no path back from team → personal workspace** — copy-paste-delete-and-recreate workaround is unacceptable for a knowledge product. [Source: Warp Drive overview docs, accessed 2026-08-07]
- **Asymmetric import/export** — Prompts and Env Vars support export but not import, breaking round-tripping for users. [Source: Warp Drive overview docs, accessed 2026-08-07]
- **Two competing workflow systems** (YAML Workflows vs Warp Drive Workflows) — miMo should not ship two parallel artifact systems with overlapping surface area. [Source: YAML Workflows docs, accessed 2026-08-07]
- **Marketing pivot that abandons the original audience** — "factory engineers, not product engineers" risks alienating the individual developer base that made Warp successful. [Source: https://www.warp.dev/blog, accessed 2026-08-07]
- **404 churn on feature URLs** — /features/agent-mode and /features/warp-drive now return "Page not found"; bookmarks and external references break. [Observed: https://www.warp.dev/features/agent-mode + https://www.warp.dev/features/warp-drive, accessed 2026-08-07]
- **Twitter-testimonial-heavy social proof** — 12+ tweets vs 1 structured case study (Rectangle Health/Rex) is thinner evidence than enterprise customers expect. [Observed: https://www.warp.dev/agents/warp-agent, accessed 2026-08-07]

## 30. Confidence Score (0-100) with reasoning

**Confidence: 84 / 100**

Reasoning:
- (+) Homepage, docs index, Warp Drive overview docs, YAML Workflows docs, Warp Agent product page, Warp Agent CLI product page, Agent Kits gallery, and blog index were all directly fetched with substantial text extraction.
- (+) Keyboard shortcuts, permission matrix, file format specs, install commands, and product taxonomy are directly sourced (not inferred).
- (+) Dated, named blog posts provide authoritative evidence for the open-source launch (Apr 28, 2026), Agent CLI launch (Aug 4, 2026), CEO "factory engineers" memo (Jun 18, 2026), and Rectangle Health case study (Jun 12, 2026).
- (+) Direct evidence of Warp Drive's limitations (one-way team share, asymmetric import/export) and the YAML→Warp Drive migration tension.
- (−) Some marketing pages (/features/agent-mode, /features/warp-drive) return 404 — feature URLs have churned.
- (−) Sections 15 (Motion) and 16 (Animation) have weak direct evidence — no motion-token or animation-system documentation extracted.
- (−) Pricing page (warp.dev/pricing) was not fetched; plan/credit structure beyond "at-cost inference" is not documented in evidence.
- (−) No live-product screenshots captured; only static HTML text. UX motion details are inferred from docs nav structure rather than observed.

Recommended next step: fetch warp.dev/pricing + docs.warp.dev/platform/overview/ (Oz platform overview) + blog post "How Rectangle Health Built an AI Teammate" to upgrade confidence on pricing/governance and Oz cloud-agent UX details.
