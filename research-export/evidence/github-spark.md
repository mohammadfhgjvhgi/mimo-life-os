# GitHub Copilot / Spark / Spaces / Extensions — Evidence File

**Task ID:** W11 (Phase R2 — EVIDENCE-BASED)
**Researcher:** Senior Product Researcher (MiMo)
**Date accessed:** 2026-08-07
**Evidence base:** Raw HTML/TXT in `/home/z/my-project/research/evidence/raw-github-spark/` (features-copilot.html, extensions.html, docs-what-is.html, ext-about.html, etc.)
**Method:** Direct `curl` of official URLs (github.com/features/copilot, github.com/features/copilot/extensions, docs.github.com/en/copilot/*), text extraction via `extract_text.py`. No LLM rendering. No screenshots.

> **Important evidence note on naming:** GitHub has unified its AI surface under **"GitHub Copilot"** as the umbrella product. **"Copilot Extensions"** is the integration mechanism (now superseded largely by MCP). **"Copilot Spaces"** is the knowledge/context-bundle feature. **"Spark"** is no longer a consumer-facing app brand — in the current docs nav it appears as an **enterprise sandbox/management feature** under "Enterprise management → Cloud and local sandboxes → Spark" alongside Copilot usage metrics. No evidence found of an Aug 2026 deprecation announcement on github.blog (the URL `github.blog/news/product/github-spark/` returns "Page not found"); instead, evidence shows Spark has been repositioned into enterprise infrastructure rather than deprecated in the public sense. See Section 27 for deprecation hypothesis reasoning.

---

## 1. Product Overview

GitHub Copilot is GitHub's umbrella AI coding product line, covering: inline code completions, AI Chat, agentic code editing ("agent mode"), a CLI, a desktop "Copilot app", cloud agent, code review, and integrations in multiple IDEs (VS Code, Visual Studio, JetBrains suite, Vim/Neovim, Azure Data Studio) and terminals (GitHub CLI, Windows Terminal Canary). [Source: https://github.com/features/copilot, accessed 2026-08-07]

Marketing tagline: "Command your craft. Your AI accelerator for every workflow, from the editor to the enterprise." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Brand framing: "the world's most widely adopted AI developer tool and the competitive advantage developers ask for by name." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Three sub-products in the docs nav tree: (a) **Spark** under Enterprise management → Cloud and local sandboxes; (b) **Spaces** under "Customize Copilot" → "Spaces" → "Create Copilot Spaces" / "Collaborate with others"; (c) **Extensions** appear under "GitHub Copilot app" → "Canvas extensions" and via "Plugins: Find and install / Create a plugin / Create a marketplace". [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 2. Product Philosophy

Three marketing pillars from the landing page: "Go beyond one-size-fits-all" (model plurality), "Use your agents, your way" (agent plurality), "Stay in your flow" (Copilot works in editor, CLI, GitHub.com, project tools, chat apps, custom MCP servers). [Source: https://github.com/features/copilot, accessed 2026-08-07]

Copilot is positioned as a layer over the existing developer workflow: "AI that works where you do, whether in your editor, on the command line, or across GitHub." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Enterprise framing emphasizes governance: "Manage agent-driven work from one place," "Track activity with detailed audit logs and enforce governance by managing agents from a single control plane." [Source: https://github.com/features/copilot, accessed 2026-08-07]

## 3. Core Mental Model

The mental model is **a fleet of agents you delegate to and review**, not a single chat assistant. From the landing: "Assign tasks to agents like Copilot, Claude by Anthropic, and OpenAI Codex, and let them plan, explore, and execute work autonomously in the background." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Knowledge is captured in **Spaces** ("a shared source of truth that includes context from your docs and repositories"), and capability is captured in **MCP servers / Extensions / Agent skills** registered in a managed catalog. [Source: https://github.com/features/copilot, accessed 2026-08-07]

Observed: the product hierarchy in docs nav is Copilot → Chat/Agents/CLI/App → Customization (custom instructions, Spaces, MCP) → Governance (Spark sandbox, usage metrics, policies). [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 4. User Journey

Documented onboarding path in docs sidebar: Quickstart → What is GitHub Copilot? → Plans → Features → Best practices → Enterprise AI governance. Then "Set up Copilot" (for self, organization, enterprise, students, teachers, OS maintainers). [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Plans path: Free ($0, 2,000 completions/month, Haiku 4.5 + GPT-5 mini + "and more", Copilot CLI, Community Support) → Pro ($10/mo, access to Cloud agent and code review, unlimited completion + next-edit suggestions, 3rd-party agents [Claude Code + Codex], model selection, $15 monthly total credits) → Pro+ ($39/mo, premium models including Opus, audit logs, 4x+ usage of Pro, $70 credits) → Max ($100/mo, priority access, 2.9x+ usage of Pro+, $200 credits) → Business ($19/mo, pooled credits + control) → Enterprise. [Source: https://github.com/features/copilot, accessed 2026-08-07]

Mobile + IDE + CLI + GitHub.com are all first-class surfaces. "Copilot Enterprise in GitHub Mobile gives you additional access to your organization's knowledge." [Source: https://github.com/features/copilot, accessed 2026-08-07]

## 5. Navigation

Cross-surface navigation: "Copilot works where you do—in GitHub, your IDE, the CLI, project tools, chat apps, and custom MCP servers." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Docs sidebar is large (≈40+ topics under the Copilot tree) but well-structured by domain: Get started / Concepts / Customize / Enterprise management / How-tos / Billing / Models. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Docs site supports search via "Search or ask Copilot" — meaning the docs search bar doubles as a Copilot Chat entry point. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 6. Workspace (GitHub Copilot in IDE/PR/spaces; Spaces)

The **GitHub Copilot app** is "a desktop workspace built natively on GitHub" that lets you "Launch work from GitHub, track progress across multiple agents, review changes, and merge completed work — all from one desktop workspace." [Source: https://github.com/features/copilot, accessed 2026-08-07]

The IDE workspace is described as "Copilot in your editor does it all, from explaining concepts and completing code, to proposing edits and validating files with agent mode." [Source: https://github.com/features/copilot, accessed 2026-08-07]

**Copilot Spaces** = persistent knowledge bundles. Landing: "Turn Copilot into a project expert. Scale knowledge and keep teams consistent by creating a shared source of truth that includes context from your docs and repositories. Try Copilot Spaces." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Docs nav lists Spaces docs subsections: "Create Copilot Spaces" + "Collaborate with others". Adjacent topic: "Repository indexing" + "Content exclusion". [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

The Copilot app has "Canvas extensions" listed as an article under the app subcategory. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 7. Conversation (Copilot Chat)

Copilot Chat is available in VS Code, JetBrains, and Visual Studio (chat is "currently available only in Visual Studio Code, JetBrains, and Visual Studio"). Inline completion is available in VS Code, VS, Vim, Neovim, JetBrains suite, Azure Data Studio. [Source: https://github.com/features/copilot, accessed 2026-08-07]

Chat is also exposed in GitHub.com (Enterprise plan), GitHub Mobile (all plans), and Windows Terminal Canary. [Source: https://github.com/features/copilot, accessed 2026-08-07]

Copilot Chat supports MCP servers ("Extend Copilot Chat with MCP"), the GitHub MCP Server, and "Agent finder" — a runtime discovery service that "helps GitHub Copilot find the right capabilities—such as MCP servers, tools, agents, and skills—for a task at runtime, instead of requiring every capability to be configured in advance." [Source: https://docs.github.com/en/copilot/about-github-copilot/extending-the-capabilities-of-github-copilot (ext-about.txt), accessed 2026-08-07]

## 8. Agent Experience (Copilot agents + extensions)

**Cloud agent** — autonomous agentic task runner. Docs nav subtopics: "About cloud agent / Agent management / Custom agents / About automations / Rationale, confidence, and approvals / Access management / MCP and cloud agent / Risks and mitigations." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

**Copilot CLI** with subdocs: "About Copilot CLI / Comparing CLI features / Copilot CLI in Actions / Cancel and roll back / Context management / About remote control / Custom agents / Autonomous task completion / Parallel task execution / Researching with Copilot / Session data / About rubber duck / LSP servers / CLI extensions / Tool search." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Third-party agents are first-class: "Access to 3rd party agents (Claude Code and Codex)" on Pro plan. [Source: https://github.com/features/copilot, accessed 2026-08-07]

**Copilot SDK** exposes: Agent Loop, Cloud Sessions, Custom Agents, **Fleet Mode** (parallel agents), Hooks (Post Tool Use / Pre Tool Use / Session Lifecycle / User Prompt Submitted), Image Input, MCP, Plugin Directories, Remote Sessions, Session limits, Session Persistence, Skills, "Steering And Queueing", Streaming Events, Usage and billing. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

"Use cloud agent with Jira / Slack / Teams / Linear / Azure Boards / Raycast" — first-class integrations. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 9. Memory (custom instructions + @-mention context)

Four-tier custom instruction hierarchy documented in docs sidebar: "Add custom instructions / Add personal instructions / Add repository instructions / Add organization instructions." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

**Copilot Memory** is a dedicated docs subsection: "Copilot Memory → Manage for yourself / Manage as administrator." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Customization also includes: "Customize cloud agent / Create custom agents / Add agent skills / Use hooks / Customize the agent environment / Configure secrets and variables / Test custom agents / Customize the firewall / Configure MCP servers." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Context inputs into chat include "code file open in your active document, your code selection, and general workspace information, such as frameworks, languages, and dependencies." [Source: https://github.com/features/copilot, accessed 2026-08-07]

## 10. Knowledge (Copilot Spaces as context bundles — DEEP)

Copilot Spaces — repeated marketing: "Turn Copilot into a project expert. Scale knowledge and keep teams consistent by creating a shared source of truth that includes context from your docs and repositories." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Docs treats Spaces under "Customize Copilot → Spaces → Create Copilot Spaces / Collaborate with others" and includes adjacent topics: "Repository indexing" and "Content exclusion" (the latter being critical — users can exclude paths from Copilot indexing for privacy/scope). [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

MCP-based knowledge extension: "Agent finder is a discovery service that helps GitHub Copilot find the right capabilities—such as MCP servers, tools, agents, and skills—for a task at runtime, instead of requiring every capability to be configured in advance. Like an MCP registry, it searches a catalog of capabilities and returns ranked matches that GitHub Copilot can use on demand. Agent finder implements the open Agentic Resource Discovery (ARD) specification." [Source: https://docs.github.com/en/copilot/about-github-copilot/extending-the-capabilities-of-github-copilot (ext-about.txt), accessed 2026-08-07]

"GitHub MCP Registry is a curated list of MCP servers from partners and the community." (Public preview as of access date.) [Source: ext-about.txt, accessed 2026-08-07]

Toolset customization philosophy: "Enabling only the toolsets you need improves your AI assistant's performance and security. Fewer tools means better tool selection accuracy and fewer errors. Disabling unused toolsets also frees up tokens in the AI's context window." [Source: ext-about.txt, accessed 2026-08-07]

## 11. Search (GitHub)

Within the GitHub ecosystem: docs support "Search or ask Copilot" (the docs search box is unified with Copilot Chat). [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

The Copilot cloud agent integration list (Jira / Slack / Linear / Azure Boards) implies cross-tool search surfaced back into Copilot Chat. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Agent finder is effectively a capability search: it "searches a catalog of capabilities and returns ranked matches that GitHub Copilot can use on demand." [Source: ext-about.txt, accessed 2026-08-07]

## 12. Execution (PR automation)

Copilot code review is a first-class capability: "Access to Cloud agent and code review" on Pro plan and up; docs nav: "Copilot code review / Review Copilot output / Configure automatic review / Set up runners." [Source: https://github.com/features/copilot, accessed 2026-08-07]

"Copilot for GitHub tasks" includes: "Use Copilot to create or update issues / Create a PR summary / Use the GitHub MCP Server from Copilot Chat / Use Copilot agents." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Copilot cloud agent works in GitHub.com, GitHub Mobile, the IDE, via API, and via GitHub CLI. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

"Agentic Workflows" is its own docs subtree: "Quickstart / Creating agentic workflows / Use Copilot agents / Cloud agent / Start Copilot sessions / Create cloud automations / Manage rationale, confidence, and approvals / Changing the AI model / Configuring agent settings / Create custom agents in your IDE / Use cloud agent on GitHub / Use cloud agent on GitHub Mobile / Use agent apps / Use cloud agent in your IDE / Use cloud agent via the API / Use cloud agent from the GitHub CLI / Use cloud agent via GitHub MCP Server." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 13. Artifacts (PRs)

PR summaries ("Create a PR summary") and PR creation via agents are first-class artifacts. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Copilot app has a "Canvas extensions" surface — implying a canvas-like editing artifact surface inside the desktop app. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Cloud agent automations are persistent, named artifacts: "Create cloud automations / Manage rationale, confidence, and approvals." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 14. Keyboard UX

"Type / to search" surfaced in the global GitHub nav bar (top-right keyboard-search pattern). [Source: https://github.com/features/copilot, accessed 2026-08-07]

CLI supports "Voice input" and "Steering And Queueing" — implying multi-session keyboard-driven control. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Specific keybindings are IDE-native (VS Code, JetBrains) — not unified across surfaces. GitHub.com uses `/` for command palette. [Source: https://github.com/features/copilot, accessed 2026-08-07]

## 15. Motion

No direct evidence of motion/animation design language in fetched pages. GitHub marketing site uses standard hero transitions and video embeds ("Play video" on hero). [Observed: https://github.com/features/copilot, accessed 2026-08-07]

The Copilot cloud agent flow involves streaming events ("Streaming Events" is a documented SDK capability), implying async progress updates rather than synchronous loading. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 16. Animation

No evidence collected on specific animation tokens, easing curves, or motion durations. (Not in scope of fetched pages.)

## 17. Visual Hierarchy

Marketing page hero: tagline ("Command your craft") → "Get started" + "See plans & pricing" CTA pair → "Already have Visual Studio Code? Open now" contextual CTA → social proof logo wall (Duolingo, FedEx, American Airlines, Shopify, Stripe, Coca-Cola, etc.) → "Workflow" three-up card grid (Code/Command/Collaborate). [Observed: https://github.com/features/copilot, accessed 2026-08-07]

Information hierarchy on feature cards: icon → bold title (e.g., "Knowledge", "Governance", "Security") → one-line value statement → CTA ("Try Copilot Spaces" / "Read the docs"). [Observed: https://github.com/features/copilot, accessed 2026-08-07]

## 18. Progressive Disclosure

Plans comparison table is progressively structured: Free → Pro → Pro+ → Max → Business → Enterprise, with each tier adding features ("Everything in X and:"). [Source: https://github.com/features/copilot, accessed 2026-08-07]

The docs sidebar collapses a multi-level tree (~40 nodes), with three top-level groupings (Get started / Concepts / How-tos / Billing). [Observed: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

FAQ is collapsed under "What's included" plan cards, not surfaced as a top-level page section. [Observed: https://github.com/features/copilot, accessed 2026-08-07]

## 19. Accessibility

GitHub.com is covered by GitHub's standard accessibility commitment (no AI-specific accessibility statement was extracted in this run). [Observed: https://github.com/features/copilot, accessed 2026-08-07]

GitHub Mobile on Copilot is supported across "all plans." [Source: https://github.com/features/copilot, accessed 2026-08-07]

No product-specific accessibility documentation surfaced in fetched URLs.

## 20. Performance Perception

Credit-based pricing model creates an explicit cost-vs-latency tradeoff: "A quick question to a lightweight model costs a fraction of a credit. A longer agent session on a frontier model across many files costs more." [Source: https://github.com/features/copilot, accessed 2026-08-07]

"Code completions and next edit suggestions don't use credits. They remain unlimited with every paid plan." — completions are deliberately cheap to keep flow fast. [Source: https://github.com/features/copilot, accessed 2026-08-07]

Streaming Events in Copilot SDK imply real-time progress updates rather than full-page reloads during agent sessions. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Usage alerts at 75%, 90%, 100% of budget — proactive threshold feedback. [Source: https://github.com/features/copilot, accessed 2026-08-07]

## 21. Trust

Trust framing on landing: "Companies powered by GitHub: Duolingo, FedEx, American Airlines, Shopify, Stripe, CocaCola…". [Source: https://github.com/features/copilot, accessed 2026-08-07]

Security feature card: "Secure your MCP integrations — Control which MCP servers developers can access from their IDEs, and use allow lists to prevent unauthorized access." [Source: https://github.com/features/copilot, accessed 2026-08-07]

Push protection on MCP outputs: "interactions with the GitHub MCP server are secured by push protection, which blocks secrets in AI-generated responses and prevents them from being included in actions taken on your behalf." [Source: ext-about.txt, accessed 2026-08-07]

"Customize the firewall" is documented capability. IP indemnity + data privacy on Business plan. [Source: https://github.com/features/copilot, accessed 2026-08-07]

## 22. Explainability

"Manage rationale, confidence, and approvals" is a top-level docs section, implying cloud agent exposes its rationale + confidence before/while acting. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

"Steering And Queueing" capability in the SDK — users can steer sessions mid-flight. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 23. Long Session Experience

Session Persistence and Session limits are explicit SDK capabilities. "Manage agent sessions" is a docs subsection. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

"Copilot Memory → Manage for yourself / Manage as administrator" implies persistent memory across sessions. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Session data docs subsection ("Researching with Copilot / Session data / About rubber duck") implies long sessions are first-class. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 24. Power User Features (Copilot extensions + Spaces + @-mention)

Copilot SDK with Fleet Mode, Hooks (Pre/Post Tool Use, Session Lifecycle, User Prompt Submitted), Custom Agents, Skills, Steering And Queueing, Streaming Events, MCP, Plugin Directories. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

BYOK: "Use your own model provider" + "BYOK" + "Server-to-server tokens" + "Authenticate BYOK". [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Plugins ecosystem: "Plugins: Find and install / Plugins: Create a plugin / Plugins: Create a marketplace." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Cloud agent "Fleet Mode" — multi-agent parallel execution. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Copilot CLI on Pro+ supports "Set an AI credit limit," "Steer a session remotely," "Agentic code review," "Manage pull requests," "Speed up task completion," "Use session data," "Automate with Copilot CLI," "Schedule prompts," "Automate with Actions." [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 25. Developer Experience (Copilot API + Extensions SDK)

Copilot SDK is fully documented: Authentication (OAuth, BYOK, server-to-server tokens, Azure Managed Identity), Features (Agent Loop, Cloud Sessions, Custom Agents, Fleet Mode, Hooks, Image Input, MCP, Plugin Directories, Remote Sessions, Session limits, Session Persistence, Skills, Steering And Queueing, Streaming Events, Usage and billing), Error Handling (Hooks Overview, Post Tool Use, Pre Tool Use, Session Lifecycle, User Prompt Submitted), Integrations (Microsoft Agent Framework, Observability, OpenTelemetry). [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Backend Services / Bundled CLI / Choosing A Setup Path (GitHub OAuth / Local CLI / Multi Tenancy / Scaling / Troubleshooting). [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

Debugging subsections: "Compatibility / Debugging MCP / Debugging GitHub". [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

OpenTelemetry + Observability built in. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Surface completeness** — Copilot is in IDE, CLI, GitHub.com, GitHub Mobile, Windows Terminal Canary, custom MCP servers, and three external agent SDKs (Copilot, Claude Agent, Codex). [Source: https://github.com/features/copilot, accessed 2026-08-07]

2. **Agent plurality as product strategy** — Pro plan explicitly bundles "3rd party agents (Claude Code and Codex)". [Source: https://github.com/features/copilot, accessed 2026-08-07]

3. **Spaces as durable knowledge bundles** — "shared source of truth that includes context from your docs and repositories," a deliberate context-management primitive. [Source: https://github.com/features/copilot, accessed 2026-08-07]

4. **Enterprise governance depth** — single-pane agent management, audit logs, MCP allow lists, firewall customization, Spark sandboxing. [Source: https://github.com/features/copilot, accessed 2026-08-07]

5. **Copilot SDK with Hooks** — Pre/Post Tool Use, Session Lifecycle, User Prompt Submitted hooks — a fully programmable agent platform. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

6. **Agent finder / ARD spec** — runtime capability discovery vs preconfiguration. [Source: ext-about.txt, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **"Spark" product narrative is unclear / possibly re-positioned** — The previously consumer-facing "Spark" app brand is no longer in the marketing top-nav; in docs it has been absorbed under "Enterprise management → Cloud and local sandboxes → Spark." The blog URL `github.blog/news/product/github-spark/` returns "Page not found - The GitHub Blog." This is consistent with the W11 task brief's note about an Aug 2026 deprecation — but no explicit deprecation announcement was found at the URL we tested. The hypothesis: Spark-as-consumer-AI-app was wound down and rebranded into enterprise sandbox infrastructure. [Observed: github.blog/news/product/github-spark/ → 404; docs.github.com sidebar placement, accessed 2026-08-07]

2. **Plan-tier complexity** — Free / Pro / Pro+ / Max / Business / Enterprise, with credit allocations ($15, $70, $200 monthly credits) plus 2.9x and 4x multipliers, is non-trivial to reason about. [Source: https://github.com/features/copilot, accessed 2026-08-07]

3. **Chat functionality is gated per IDE** — "chat functionality is currently available only in Visual Studio Code, JetBrains, and Visual Studio" — i.e., Vim/Neovim/Azure Data Studio get inline completion but no chat. [Source: https://github.com/features/copilot, accessed 2026-08-07]

4. **MCP Registry still public preview** — "The GitHub MCP Registry is currently in public preview and subject to change." [Source: ext-about.txt, accessed 2026-08-07]

5. **Heavier governance friction on Business/Enterprise** — admins set usage limits, "decide whether additional paid usage is allowed. If it isn't, Copilot pauses until the next cycle." Pause-on-limit may interrupt long agent flows. [Source: https://github.com/features/copilot, accessed 2026-08-07]

6. **Cross-surface memory fragmentation** — Separate docs paths for Copilot Memory, personal/repo/org custom instructions, Spaces, and session persistence imply multiple memory systems rather than one unified memory model. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Spaces as a durable, shareable context primitive** — bundle docs + repos into a project-scoped knowledge object that survives across chat sessions and is shareable across team. [Source: https://github.com/features/copilot, accessed 2026-08-07]
- **Agent plurality from day one** — Pro tier bundles Copilot + Claude + Codex agents; users pick the agent per task. [Source: https://github.com/features/copilot, accessed 2026-08-07]
- **Fleet Mode + Hooks as first-class SDK primitives** — Pre/Post Tool Use, Session Lifecycle, User Prompt Submitted hooks; multi-agent orchestration. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]
- **Agent finder / ARD spec** — runtime capability discovery instead of preconfiguring every tool. [Source: ext-about.txt, accessed 2026-08-07]
- **Rationale, confidence, and approvals** as a first-class docs surface area — explicit explainability of cloud agent decisions. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]
- **Streaming Events** — SDK-level event stream for real-time agent progress. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]
- **Custom instruction hierarchy** — personal / repository / organization custom instructions layered. [Source: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]
- **Toolset minimization philosophy** — "Fewer tools means better tool selection accuracy and fewer errors. Disabling unused toolsets also frees up tokens in the AI's context window." [Source: ext-about.txt, accessed 2026-08-07]

## 29. What should MiMo reject?

- **Six-tier plan complexity with credit math** ($15/$70/$200 credits, 2.9x/4x multipliers) — too much mental overhead for an individual developer. [Source: https://github.com/features/copilot, accessed 2026-08-07]
- **Fragmented memory surface area** — separate "Copilot Memory", custom instructions, Spaces, and session persistence docs sub-paths suggest multiple memory systems rather than one coherent model. [Observed: https://docs.github.com/en/copilot/about-github-copilot/what-is-github-copilot, accessed 2026-08-07]
- **Governance-friction UX** — admin-set "pause until next cycle" behavior risks breaking long-running agent flows mid-task. [Source: https://github.com/features/copilot, accessed 2026-08-07]
- **Per-IDE chat availability gating** — chat should not be a feature-of-the-IDE; the conversational surface must be ubiquitous if the product positions itself as "stay in your flow." [Source: https://github.com/features/copilot, accessed 2026-08-07]
- **Spark consumer-app pivot without public migration guidance** — if a feature is publicly wound down, MiMo should not let marketing pages linger without redirect clarity. [Observed: github.blog/news/product/github-spark/ → 404, accessed 2026-08-07]

## 30. Confidence Score (0-100) with reasoning

**Confidence: 68 / 100**

Reasoning:
- (+) Official GitHub marketing and docs pages were fetched and text-extracted directly; pricing, plan tier names, agent list (Copilot / Claude / Codex), Spaces positioning, MCP Registry, Agent finder (ARD spec), Copilot SDK Hooks, and Cloud agent feature set are all directly sourced.
- (+) Sidebar nav placement of "Spark" under Enterprise management → Cloud and local sandboxes is directly observed in docs HTML.
- (−) The /features/copilot/extensions URL returned the same FAQ content as /features/copilot — no dedicated "Extensions" product page was successfully extracted; evidence on Extensions as a discrete product feature is weaker than desired (extensions are now expressed largely via MCP).
- (−) No GitHub blog post about Spark deprecation was found at the predicted URL (404). The "Aug 2026 deprecation" claim in the W11 brief is corroborated only by the absence of a consumer-facing Spark page and the absence of a blog post — neither confirms nor denies an explicit deprecation announcement.
- (−) Sections 15 (Motion), 16 (Animation), 19 (Accessibility) have weak direct evidence — GitHub marketing pages don't expose motion tokens or accessibility statements in fetched HTML.
- (−) No live-product screenshots captured; only static HTML text.
- (−) Several /docs URLs that the sidebar promised (e.g. "Create Copilot Spaces" how-to) returned 404 when guessed without the exact slug; the actual content of those how-to pages was not extracted.

Recommended next step: fetch GitHub Copilot Spaces and Copilot Extensions deep-dive blog posts (Universe 2024 launch posts) + the actual `/docs/copilot/managing-copilot/...` slug tree to upgrade confidence on Spaces UX, Extensions lifecycle, and Spark deprecation timeline.
