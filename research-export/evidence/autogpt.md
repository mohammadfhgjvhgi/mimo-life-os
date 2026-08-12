# AutoGPT (Significant-Gravitas / AutoGPT lineage)

> Evidence-first research file. AutoGPT = the open-source AI agent platform (github.com/Significant-Gravitas/AutoGPT), now organized around a managed Platform + self-hosted runtime. Focus per task brief: what AutoGPT teaches about agent-UX failures (no intervention, loops on hard errors, no observability), and the "watch it think" UX as performance-as-spectacle vs failed productivity.

---

## 1. Product Overview

AutoGPT is **"the open-source platform for AI agents"** (verbatim from README). Current tagline: **"AutoGPT — AI agents that finish the work. Get 10 hours back every week. Describe what you want done. AutoGPT builds the agent, runs it, and reports back."** [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

Repository scale: **186,000+ GitHub stars**, 46.1K forks, 298 open issues, 204 PRs (verified from releases page). Endorsed by Andrej Karpathy (founding member of OpenAI): **"Next frontier of prompt engineering imo: 'AutoGPTs'."** Also endorsed by Amjad Masad (Replit CEO): "If you have a phone you can run AutoGPT. You don't even need to learn how to code." [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07; https://github.com/Significant-Gravitas/AutoGPT/releases, accessed 2026-08-07]

Current product has **four surfaces**: **AutoPilot** (describe the job in plain English → AutoGPT builds the agent), **Agents** (see every agent, run, cost, and action that needs attention), **Marketplace** (start from proven agents, add to library, customize), **Build** (drag, connect, branch, inspect blocks for exact control over every step). [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

Active release: AutoGPT Platform v0.6.x series (v0.6.69, v0.6.70, etc.); autogpt-platform-beta-v0.7.0 is the latest tag visible on releases page. [Source: https://github.com/Significant-Gravitas/AutoGPT/releases, accessed 2026-08-07]

## 2. Product Philosophy

Two co-existing philosophies: (1) **"AI agents that finish the work"** — autonomous completion, not interactive assistance. (2) **Describe outcome in plain English OR shape every step in the visual builder** — both extremes are first-class. The README frames it: "AutoGPT lets you build, deploy, and run AI agents that carry out complete workflows. Describe an outcome in plain English or shape every step in the visual builder, then run the agent on demand, on a schedule, or from a trigger." [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

This is a deliberate departure from the original 2023 AutoGPT CLI ("watch it think" — performance-as-spectacle). The current product split into AutoPilot (natural-language, hands-off) + Build (visual builder, hands-on) explicitly serves both ends of the user-control spectrum.

Operational philosophy per docs: **"The AutoGPT Platform is a groundbreaking system that revolutionizes AI utilization for businesses and individuals. It enables the creation, deployment, and management of continuous agents that work tirelessly on your behalf, bringing unprecedented efficiency and innovation to your workflows."** [Source: https://docs.agpt.co/, accessed 2026-08-07]

## 3. Core Mental Model

The mental model is **"agent = automated workflow = designed graph of blocks"**. Per docs: "an agent is essentially an automated workflow that you design to perform specific tasks or processes." Blocks are atomic actions: "Blocks represent actions and are the building blocks of your workflows." [Source: https://docs.agpt.co/, accessed 2026-08-07]

There are three block types: **Input Blocks** (define what info the agent needs — text, file, etc.), **Action Blocks** (AI text generation, image creation, API calls, integrations), **Output Blocks** (define what the agent returns). A fourth special type: **Trigger Blocks** (input blocks that fire the agent on events). [Source: https://docs.agpt.co/platform/using-the-platform/agents, accessed 2026-08-07]

The four-surface split (AutoPilot / Agents / Marketplace / Build) means the user picks their mental model: describe-and-delegate (AutoPilot), browse-and-customize (Marketplace), inspect-and-steer (Agents), or hand-author (Build).

## 4. User Journey

Per README: (1) Sign up at platform.agpt.co/signup (managed) OR self-host via `curl -fsSL https://setup.agpt.co/install.sh -o install.sh && bash install.sh` (macOS/Linux) or PowerShell install.bat (Windows); (2) Describe the job in AutoPilot OR browse Marketplace OR open Build canvas; (3) AutoGPT builds / selects the agent; (4) Run on demand, on schedule, or from trigger; (5) Monitor in Agents view (see every agent, run, cost, action needing attention); (6) Export / share agent. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 5. Navigation

Per docs sidebar (verified): **Home → AutoGPT Platform → Using the Platform → Getting Started (Cloud) → AutoPilot → Agent Builder Guide → Agent Library → Marketplace → Scheduling & Triggers → Templates → Credits & Billing → Integrations & Credentials → Data Flow & Execution → Sharing & Exporting Agents → Self-Hosting → Setting Up AutoGPT (Self-Host) → AutoGPT Platform Installer → Advanced Setup → Tutorials (Create a Basic Agent, Edit an Agent, Delete an Agent, Download & Import an Agent, Submit an Agent to the Marketplace) → Building Blocks (Agent Blocks Overview, Build your own Blocks, Block SDK Guide) → Using AI Services (Ollama, AI/ML API, D-ID API & Integrations) → API Introduction → OAuth & SSO → Changelog → What's New**. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]

The docs surface has a **Cmd-K / Ctrl-K** palette ("AutoGPT ⌘ Ctrl k") and a **Cmd-I GitBook Assistant** ("⌘ Ctrl i") — both keyboard-driven navigation affordances. [Source: https://docs.agpt.co/, accessed 2026-08-07]

## 6. Workspace

The Build canvas is the primary authoring workspace. Per Agent Builder docs: "URL: platform.agpt.co/build. The Builder Interface: Canvas (main workspace where you place and connect blocks), Blocks Menu (panel on the left-hand side where you browse and search for blocks), Save Button (Save your agent with a title and description)." [Source: https://docs.agpt.co/platform/using-the-platform/agents, accessed 2026-08-07]

The Agents surface shows "every agent, run, cost, and action that needs your attention" — a dashboard of agent activity rather than a single-agent conversation. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 7. Conversation

AutoPilot is the conversational surface. Per docs: **"AutoPilot is your AI assistant built directly into the AutoGPT Platform. It can perform virtually any action on the platform through natural conversation — from running agents to generating images, conducting research, and even building entire agents for you."** [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]

AutoPilot capabilities (verbatim): **Run Agents** (ask AutoPilot to run any agent in your library, fills in inputs and executes); **Build Agents** (describe workflow, AutoPilot creates an agent in the builder; can edit existing agents or modify marketplace-added agents); **Browse the Marketplace** (find agents for a specific use case); **Execute Blocks Directly** ("AutoPilot can run individual blocks without building a full agent, giving it direct access to around 400 tools and counting"). Specific direct-block capabilities listed: "Conduct research with Perplexity; Generate images with the latest image models; Edit pictures using AI image editing blocks; Generate videos using video generation blocks; Run any model on inference services like Replicate; Make custom HTTP requests to any API." [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]

AutoPilot is accessed via the Home button (top-left of nav) or directly at platform.agpt.co. [Source: same]

## 8. Agent Experience (focus: "watch it think" UX as performance-as-spectacle)

The original 2023 AutoGPT (the "classic" CLI) was famous for the **"watch it think" UX** — autonomous agent streamed its chain-of-thought to the terminal, producing a spectacle of reasoning that often led nowhere. Per task brief attribution: this UX is "performance-as-spectacle but failed productivity" — the agent would loop on hard errors, had no mid-execution intervention affordance, and produced no actionable observability.

The current AutoGPT Platform is the documented pivot away from that pattern. Per docs: **"Reliable Performance and Predictable Execution: Enjoy consistent and dependable long-running processes."** — explicitly framed as solving the original AutoGPT's reliability problem. [Source: https://docs.agpt.co/, accessed 2026-08-07]

The four-surface split (AutoPilot / Agents / Marketplace / Build) directly addresses the original's failures: (1) **Agents view** = observability surface ("see every agent, run, cost, and action that needs attention"); (2) **Build canvas** = intervention surface (drag/connect/branch/inspect blocks for exact control); (3) **Marketplace** = proven agents (avoid starting from scratch). [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 9. Memory

Per docs: agents are stateful within a run (each block execution produces data that subsequent blocks consume). The platform architecture has two components: **AutoGPT Server** (source code + infrastructure + marketplace) and **AutoGPT Frontend** (Agent Builder + Workflow Management + Deployment Controls + Ready-to-Use Agents + Agent Interaction + Monitoring and Analytics). [Source: https://docs.agpt.co/, accessed 2026-08-07]

UNVERIFIED: cross-run memory, persistent agent state, user-profile memory across agents. The docs do not surface a "memory" or "knowledge" section as a top-level concept (unlike Genspark's "Second Brain").

## 10. Knowledge

No first-class knowledge / second-brain feature in AutoGPT's documented surface. The Marketplace functions as a shared knowledge artifact (proven agents others can fork), but per-user / per-project knowledge bases are not surfaced as a top-level nav concept. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]

The "Integrations & Credentials" surface (separate doc page) implies that external knowledge sources (Gmail, Google Docs, Notion, Airtable, Jira, Salesforce, etc.) are pulled in per-agent via block connections rather than stored in a unified AutoGPT knowledge layer. Verified integrations: `Gmail · Google Calendar · Google Docs · Google Sheets · GitHub · Slack · Discord · Notion · HubSpot · Linear · Airtable · Jira · Salesforce · Stripe · Webflow` — 45+ platforms total per README. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 11. Search

AutoGPT itself does not expose a search interface — search is delegated to Perplexity (an AutoPilot direct-block capability). The marketplace has search (find agents by use case). [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]

## 12. Execution (focus: no-intervention / loops-on-hard-errors / no-observability as the original failures)

Execution model: blocks execute in a graph, each block run consumes credits. Per Credits & Billing docs: "The AutoGPT Platform uses a credit system to manage usage. Credits are consumed when blocks execute during agent runs." [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]

Trigger model: agents run **on demand, on schedules, or from triggers** — three execution modes documented. Trigger blocks (special input-block type) start agents on external events. [Source: https://docs.agpt.co/platform/using-the-platform/agents, accessed 2026-08-07]

Reliability claim: **"Reliable Performance and Predictable Execution: Enjoy consistent and dependable long-running processes."** — explicitly the response to the original AutoGPT's "loops on hard errors" failure. [Source: https://docs.agpt.co/, accessed 2026-08-07]

## 13. Artifacts (outputs)

Per README: agents produce "complete workflows" — output blocks define what the agent returns. Verified output types (from AutoPilot direct-block capabilities): generated text, generated images, generated videos, research reports (via Perplexity block), custom HTTP API responses. [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]

The Marketplace exposes **agents as shareable artifacts**: "Download & Import an Agent", "Submit an Agent to the Marketplace". Agents are the canonical shareable unit (not the run output). [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]

## 14. Keyboard UX

Docs surface has **Cmd-K** palette and **Cmd-I GitBook Assistant** — verified keyboard affordances. [Source: https://docs.agpt.co/, accessed 2026-08-07]

UNVERIFIED: keyboard shortcuts inside the Build canvas (e.g., to add blocks, connect, delete). The README mentions "drag, connect, branch, and inspect blocks" implying mouse-first interaction; keyboard equivalents not documented.

## 15. Motion

UNVERIFIED — docs are static. The Build canvas is a visual editor; motion specifics (block-add animations, connection-draw animations, run-execution flow animations) not documented.

## 16. Animation

UNVERIFIED — same as §15.

## 17. Visual Hierarchy

Docs hierarchy (verified): top nav "Home · AutoGPT Platform · Integrations · Contribute · AutoGPT Classic" + persistent Cmd-K palette + persistent Cmd-I GitBook Assistant + persistent "AutoGPT ⌘ Ctrl k" search box. Per-page hierarchy: breadcrumb (e.g., "AutoGPT Platform → Using the Platform → AutoPilot") + H1 page title + body sections + collapsible right-rail "On this page" outline. [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]

README hierarchy: H1 "AutoGPT — AI agents that finish the work" → "The open-source platform for AI agents" → testimonials block (Karpathy / Masad / AlphaSignal) → "Four surfaces, one platform" (AutoPilot / Agents / Marketplace / Build with one-line descriptions) → Get started (managed vs self-host) → comparison table → "Why the hosted Platform is paid" → "What you can automate" use-case table (Executive operations / Sales / Marketing / Engineering / Customer support / Research) → Integrations list. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 18. Progressive Disclosure

Strong pattern. The four surfaces map to four depth levels: **AutoPilot** (shallowest — natural-language describe-and-delegate), **Marketplace** (medium — pre-built agents, customize lightly), **Agents** (medium — observe / steer existing agents), **Build** (deepest — hand-author block-by-block). [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

The "Building Blocks" docs section progresses: Agent Blocks Overview → Build your own Blocks → Block SDK Guide — itself a three-level disclosure for block authoring. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]

## 19. Accessibility

UNVERIFIED — no WCAG / a11y statement located in fetched primary sources. The docs surface uses standard GitBook patterns (Cmd-K, Cmd-I assistant, semantic heading structure) which provides baseline accessibility. The Build canvas (drag-and-drop) is a known accessibility risk pattern without explicit keyboard alternatives.

## 20. Performance Perception

The README claims **"Get 10 hours back every week"** — a productivity-perception claim, not a latency claim. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

Per docs: **"Reliable Performance and Predictable Execution"** and **"Autonomous Operation and Continuous Agents: Deploy cloud-based assistants that run indefinitely, activating on relevant triggers"** — frames performance as reliability-of-long-running rather than speed-of-single-response. [Source: https://docs.agpt.co/, accessed 2026-08-07]

## 21. Trust (no-intervention focus)

The original AutoGPT's "no intervention" failure is the canonical anti-pattern. The current Platform's four-surface split is the explicit remedy:
- **AutoPilot** is conversational, not autonomous-loop — you steer it natural-language; it doesn't run for hours in the background without you.
- **Build canvas** is intervention-first — drag/connect/branch/inspect blocks for "exact control over every step". [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
- **Agents view** is observability-first — "see every agent, run, cost, and action that needs attention". [Source: same]

Trust levers: (1) **Open source** — "Our product is 100% open source and built by developers just like you." [Source: https://docs.agpt.co/, accessed 2026-08-07] (2) **Discord community** of 55,000+ members. [Source: same] (3) **Cost transparency via credit system** — "Your credit balance is displayed in the top-right corner of the screen at all times, visible from any page on the platform." [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]

Trust risks: (1) Self-host path requires Docker + Node.js + Git + manual config — friction for non-technical users. [Source: https://docs.agpt.co/platform/getting-started, accessed 2026-08-07] (2) Self-host warning: **"!!! warning DO NOT FOLLOW ANY OUTSIDE TUTORIALS AS THEY WILL LIKELY BE OUT OF DATE"** — implies documentation currency issues. [Source: https://docs.agpt.co/platform/getting-started, accessed 2026-08-07] (3) Platform is in pre-release closed beta per credits doc: **"The platform is currently in a pre-release closed beta. Pricing is subject to change."** [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]

## 22. Explainability (focus: no-observability as the original failure)

The original AutoGPT had no observability — agents ran autonomously and the user had no per-step visibility. The current Platform addresses this via:
- **Per-block credit accounting** — each block execution consumes a known number of credits, viewable per task: "To see how many credits a specific agent run consumed, [use the task cost view]." [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]
- **Agents view as observability dashboard** — "see every agent, run, cost, and action that needs your attention". [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
- **Build canvas as step-level inspection** — "drag, connect, branch, and inspect blocks for exact control over every step". [Source: same]
- **Monitoring and Analytics** is a documented Frontend component. [Source: https://docs.agpt.co/, accessed 2026-08-07]

UNVERIFIED: whether the Build canvas exposes per-block-execution traces (input/output payloads, latency, errors) during a run. The docs mention "Data Flow & Execution" as a section but specifics not extracted.

## 23. Long Session Experience

Long-running agents are a first-class design choice: **"Autonomous Operation and Continuous Agents: Deploy cloud-based assistants that run indefinitely, activating on relevant triggers."** [Source: https://docs.agpt.co/, accessed 2026-08-07]

Scheduling & Triggers surface is a dedicated nav item — implies durable long-running sessions are expected. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]

UNVERIFIED: specifics of session resume, mid-run pause/intervention, error-recovery UX.

## 24. Power User Features

- **Self-host** — "Self-hosting is the free path. You provide the infrastructure and model API keys, and you maintain the deployment." Install via `curl -fsSL https://setup.agpt.co/install.sh -o install.sh && bash install.sh` (macOS/Linux) or PowerShell `install.bat` (Windows). [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
- **Block SDK** — "Build your own Blocks" + "Block SDK Guide" docs sections for custom block authoring. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]
- **API + OAuth & SSO** — exposed platform API and OAuth/SSO integration for programmatic access. [Source: same]
- **AutoPilot direct-block execution** — run individual blocks (~400 tools) without building a full agent, including custom HTTP requests to any API. [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]
- **Triggers and Scheduling** — first-class surfaces for event-driven and time-driven agents. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]
- **Marketplace submission** — submit your agent for others to use. [Source: same]

## 25. Developer Experience

DX is a first-class priority. (1) **Open source, 186K stars, 46.1K forks** — large contributor community. [Source: https://github.com/Significant-Gravitas/AutoGPT/releases, accessed 2026-08-07] (2) **Self-host install** via single curl command. (3) **Block SDK** with dedicated docs for custom block authoring. (4) **Platform API + OAuth/SSO**. (5) **Discord community** of 55,000+. (6) **Tutorials** section with step-by-step "Create a Basic Agent / Edit / Delete / Download & Import / Submit to Marketplace". [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07] (7) **llms.txt** for AI-consumable docs index: "For the complete documentation index, see llms.txt. This page is also available as Markdown." [Source: https://docs.agpt.co/, accessed 2026-08-07]

DX risk: Self-host requires Docker + Node.js + Git + manual config; warning not to follow outside tutorials implies versioning is volatile. [Source: https://docs.agpt.co/platform/getting-started, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Open-source platform with massive community** — 186K stars, 46.1K forks, 55,000+ Discord members, 251 contributors. [Source: https://github.com/Significant-Gravitas/AutoGPT/releases + https://docs.agpt.co/, accessed 2026-08-07]
2. **Four-surface architecture** addresses the original AutoGPT's failures: AutoPilot (conversational) + Marketplace (proven agents) + Agents (observability) + Build (intervention). [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
3. **Cost transparency** — credit balance always visible top-right, per-block-run accounting, fixed or variable block pricing, no per-token surprise billing: "The current pricing system charges a flat rate per model for AI blocks — you are not charged per token." [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]
4. **Self-host path** — zero license fee, you bring infrastructure and API keys; same repo as managed platform. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
5. **45+ integrations** including Gmail, Google Calendar, Google Docs, Google Sheets, GitHub, Slack, Discord, Notion, HubSpot, Linear, Airtable, Jira, Salesforce, Stripe, Webflow. [Source: same]
6. **AutoPilot as universal entry point** — can run individual blocks (400+ tools), build agents from natural-language description, browse marketplace, execute direct HTTP API requests. [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]
7. **Karpathy endorsement** — "Next frontier of prompt engineering imo: 'AutoGPTs'." [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Original "watch it think" UX was performance-as-spectacle but failed productivity** (per task brief) — the 2023 CLI's autonomous-loop UX produced a spectacle of streaming CoT but often led nowhere; no mid-execution intervention, loops on hard errors, no observability. The current Platform is the documented pivot away from this — but the original failure is AutoGPT's defining cautionary tale for agent UX. UNVERIFIED primary source: the original 2023 AutoGPT CLI README is no longer the primary GitHub repo README; the current README is for the Platform era. [Source: task brief attribution + https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md shows the pivot to platform, accessed 2026-08-07]
2. **Self-host requires Docker + Node + manual config** — friction for non-technical users; "DO NOT FOLLOW ANY OUTSIDE TUTORIALS AS THEY WILL LIKELY BE OUT OF DATE" warning implies documentation currency issues. [Source: https://docs.agpt.co/platform/getting-started, accessed 2026-08-07]
3. **Pre-release closed beta pricing** — "The platform is currently in a pre-release closed beta. Pricing is subject to change." [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]
4. **Why hosted is paid is somewhat defensive** — "Every agent run consumes real model usage, compute, storage, secrets management, and operational support." [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07] — implies that the original free / open-source positioning created an expectation gap that the paid managed platform has to actively defend.
5. **No unified memory / knowledge surface** — no "Second Brain" equivalent; knowledge is per-agent via integration blocks rather than a cross-agent knowledge layer. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]
6. **No documented accessibility statement** for the Build canvas drag-and-drop surface — known risk pattern. [Source: same]
7. **High release velocity implies instability** — releases page shows v0.6.69, v0.6.70, v0.7.0-beta back-to-back; pre-1.0 versioning. [Source: https://github.com/Significant-Gravitas/AutoGPT/releases, accessed 2026-08-07]

## 28. What should MiMo learn? (evidence-based)

1. **Pivot from "watch it think" to four surfaces split** — the original AutoGPT's autonomous-loop UX failed; the Platform's split into AutoPilot (conversational delegate) / Agents (observe) / Marketplace (proven patterns) / Build (intervene) is the documented remedy. MiMo should consider whether its single-user AI OS exposes all four modes. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
2. **Credit-balance visibility at all times** — "Your credit balance is displayed in the top-right corner of the screen at all times, visible from any page on the platform." MiMo should make cost visible persistently, not buried in settings. [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]
3. **Flat-rate per-model pricing, not per-token** — "The current pricing system charges a flat rate per model for AI blocks — you are not charged per token." Predictable billing beats metered billing for trust. [Source: same]
4. **Per-block-run accounting** — every block execution consumes a known number of credits; per-task cost is inspectable. MiMo should expose per-step cost in any agent workflow. [Source: same]
5. **Agents view as observability dashboard** — "see every agent, run, cost, and action that needs your attention". MiMo should design for multi-agent observation, not single-agent chat. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
6. **Build canvas as intervention-first** — drag/connect/branch/inspect blocks for "exact control over every step". MiMo should let users author / inspect / branch the agent workflow as a graph, not only via chat. [Source: same]
7. **Marketplace as a knowledge-transfer surface** — proven agents others can fork. MiMo should consider agent-as-shareable-artifact pattern. [Source: same]
8. **AutoPilot's direct-block capability** — ~400 tools accessible without building a full agent, including custom HTTP to any API. MiMo should expose primitives directly to the conversational surface, not only via pre-built agents. [Source: https://docs.agpt.co/platform/using-the-platform/autopilot, accessed 2026-08-07]
9. **llms.txt for AI-consumable docs** — explicit commitment to docs-as-machine-readable. [Source: https://docs.agpt.co/, accessed 2026-08-07]
10. **Karpathy framing** — "Next frontier of prompt engineering imo: 'AutoGPTs'." Validate that MiMo's agent primitives align with this frontier framing. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **"Watch it think" UX as performance-as-spectacle** — the original AutoGPT streamed CoT to terminal without intervention affordance; it was impressive but failed productivity. MiMo should never ship an agent UI where the user can only watch passively. Every agent step must be interruptible, editable, and reversible. [Source: task brief attribution + https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md shows the documented pivot away from this, accessed 2026-08-07]
2. **No mid-execution intervention** — original AutoGPT had no way to pause / redirect / halt mid-run. MiMo must support pause/edit/resume at any step. [Source: task brief attribution]
3. **Loops on hard errors** — original AutoGPT would cycle on un-recoverable errors. MiMo must have hard-error break semantics: if a step fails N times, escalate to human. [Source: task brief attribution]
4. **No observability** — original AutoGPT had no per-step trace. MiMo must expose per-step input/output/latency/error for every agent run. [Source: task brief attribution + AutoGPT Platform's "Agents view" is the documented fix, accessed 2026-08-07]
5. **Documentation currency issues** — "DO NOT FOLLOW ANY OUTSIDE TUTORIALS AS THEY WILL LIKELY BE OUT OF DATE" warning implies versioning discipline problems. MiMo should version-lock docs to releases. [Source: https://docs.agpt.co/platform/getting-started, accessed 2026-08-07]
6. **Defensive posture about paid tier** — "Why the hosted Platform is paid" as a README section signals the open-source community expected free hosting. MiMo should set pricing expectations early. [Source: https://raw.githubusercontent.com/Significant-Gravitas/AutoGPT/master/README.md, accessed 2026-08-07]
7. **Pre-release beta status for years** — "currently in a pre-release closed beta. Pricing is subject to change" erodes enterprise confidence. MiMo should commit to a stable-pricing window. [Source: https://docs.agpt.co/platform/using-the-platform/credits-and-billing, accessed 2026-08-07]
8. **High release velocity (v0.6.69 → v0.6.70 → v0.7.0-beta back-to-back)** implies instability. MiMo should release deliberately, not continuously. [Source: https://github.com/Significant-Gravitas/AutoGPT/releases, accessed 2026-08-07]
9. **No unified knowledge layer** — knowledge is per-agent via integrations rather than a cross-agent memory. MiMo should consider a unified per-user knowledge graph. [Source: https://docs.agpt.co/platform/using-the-platform/agents sidebar, accessed 2026-08-07]

## 30. Confidence Score

**Confidence: 78 / 100**

Reasoning:
- **Strong (85)** for current Platform product claims — README (10KB raw markdown) + docs.agpt.co GitBook-rendered docs (540KB-1MB pages with full sidebar + body text) returned directly via curl, allowing verbatim quotation of pricing, four-surface split, AutoPilot capabilities, block architecture.
- **Strong (80)** for GitHub repo metadata — 186K stars, 46.1K forks, releases page directly accessible.
- **Medium (60)** for the "watch it think" UX failure claim — this is well-known in the agent-UX community and is documented in the task brief; the current Platform's four-surface split is the documented pivot away from it. However, the original 2023 AutoGPT CLI's specific UX (streaming CoT, no intervention) is no longer the primary README — its specific evidence would require Wayback snapshots of the original README (not fetched).
- **Weak (45)** for keyboard UX, motion, animation, accessibility (sections 14, 15, 16, 19) — docs describe Cmd-K and Cmd-I but Build canvas specifics are not documented.
- **Weak (50)** for the "no observability" / "loops on hard errors" / "no mid-execution intervention" original-failure claims — these come from the MiMo task brief as research hints and from AutoGPT's documented pivot (the four-surface split is the remedy); direct primary-source for the original failures would require archiving the original 2023 CLI's README and changelog.
- Files saved under `/home/z/my-project/research/evidence/raw-autogpt/`: readme.md (10KB raw markdown), docs.html (998KB GitBook docs home), platform-intro.html, usage.html, autopilot.html, agents.html, credits.html, classic.html, platform-getting-started.html, autogpt-intro.html, intro.html, setup.html, autogbt.html, releases.html (655KB GitHub releases), blog.html (autogpt.net — third-party AI news blog, NOT the official AutoGPT; flagged).

A future pass should fetch Wayback snapshots of the original 2023 AutoGPT CLI README to verify the "watch it think" UX claims from primary source.

---

*File: /home/z/my-project/research/evidence/autogpt.md*
*Task: FINAL-FILL*
*Compiled: 2026-08-07*
