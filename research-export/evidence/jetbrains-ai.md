# JetBrains AI Assistant — Evidence File

**Task ID:** W11 (Phase R2 — EVIDENCE-BASED)
**Researcher:** Senior Product Researcher (MiMo)
**Date accessed:** 2026-08-07
**Evidence base:** Raw HTML/TXT in `/home/z/my-project/research/evidence/raw-jetbrains-ai/` (help-ai-home.html [IntelliJ IDEA 2026.2 Help: AI Assistant in JetBrains IDEs], ai-cat.html [blog.jetbrains.com/category/ai], context.html [Introducing JetBrains Context article, June 2026], codex-default.html [Introducing a Recommended Agent article, June 2026], junie.html, ai-blog.html, ai-home.html [JS-rendered, partial]).
**Method:** Direct `curl` of official URLs (jetbrains.com/ai/, jetbrains.com/help/idea/ai-assistant.html, blog.jetbrains.com/ai/, blog.jetbrains.com/ai/2026/06/introducing-jetbrains-context-repository-intelligence-for-coding-agents/, blog.jetbrains.com/ai/2026/06/codex-is-now-the-recommended-agent-in-jetbrains-ai/), text extraction via `extract_text.py`. The jetbrains.com/ai/ marketing landing is JS-rendered (only `<title>` and Optimizely scripts extracted); product substance is sourced from the IntelliJ IDEA Help page and JetBrains Blog AI category.

> **Critical evidence note on UX tradition:** JetBrains AI Assistant is a plugin for JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm, Rider, GoLand, PhpStorm, RubyMine, RustRover, CLion, DataGrip). It is **not** a VS Code-style extension — it lives inside the JetBrains IDE UX tradition (tool windows, intention actions, Project view, Editor tabs, Run configurations). The Help page explicitly states: "The AI Assistant plugin is not bundled and is not enabled in IntelliJ IDEA by default." Users must install the plugin + acquire a JetBrains AI Service license + explicitly consent to JetBrains AI Terms of Service. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

---

## 1. Product Overview

JetBrains AI Assistant brings "AI-powered coding agents and AI features directly into IntelliJ IDEA." Capabilities include built-in agents, external agent connection via ACP, MCP tool integration, model flexibility, context-aware chat, and in-editor code assistance. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Compatible with IntelliJ IDEA and "almost all other JetBrains IDEs." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Help page version observed: "IntelliJ IDEA 2026.2 Help." Page last modified "23 July 2026." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains AI brand tagline (from blog header): "Supercharge your tools with AI-powered features inside many JetBrains products." [Source: https://blog.jetbrains.com/ai/, accessed 2026-08-07]

Adjacent products in JetBrains AI portfolio (visible in blog nav): JetBrains AI, Junie (the AI coding agent by JetBrains), JetBrains for Data, Air (multi-IDE agent), Team Tools, Datalore, TeamCity, YouTrack, Qodana, Databao. [Source: https://blog.jetbrains.com/ai/, accessed 2026-08-07]

## 2. Product Philosophy

The Help page enumerates key capabilities in this order: coding agents → external agents via ACP → MCP tools → flexible setup → context-aware AI chat → in-editor code assistance. The order suggests **agents-first, then integration extensibility, then model choice, then chat, then completion** — a deliberate re-centering around agentic work rather than the historical "autocomplete + chat" framing. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Model plurality: "start with a JetBrains AI subscription, bring your own key for third-party models, authorize agents with a provider account, or run local models. You can reuse the AI subscriptions you already have." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Repository intelligence as a separate investment area — JetBrains Context launched June 2026 as "a new repository intelligence layer that helps coding agents work more efficiently and produce higher-quality results on complex codebases." [Source: https://blog.jetbrains.com/ai/2026/06/introducing-jetbrains-context-repository-intelligence-for-coding-agents/, accessed 2026-08-07]

Quote from CTO Vlad Tankov: "We've spent decades helping developers get up to speed in complex codebases. It turns out AI agents need much of the same help when they're working in an unfamiliar project." [Source: JetBrains Context blog post, accessed 2026-08-07]

## 3. Core Mental Model

The agent is framed as **a delegate you supervise**: "An agent plans the work, edits files, runs commands and tests, and reports progress, while you review, keep, or roll back the changes." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Context-aware AI Chat = "chat with a supported model and ask questions about your project. Add files, folders, symbols, or commits as context, then switch to agent mode to carry out changes across your codebase." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

In-editor code assistance: "autocomplete single lines and entire blocks of code following your coding style and naming conventions. Next edit suggestions then recommend your next edits and move you to the following place that might need a change." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

## 4. User Journey

Installation is opt-in: "AI Assistant will not be active and will not have access to your code unless you install the plugin, acquire a JetBrains AI Service license and give your explicit consent to JetBrains AI Terms of Service and JetBrains AI Acceptable Use Policy while installing the plugin." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

From June 2026, "AI users in JetBrains IDEs started in Chat mode and had to choose an agent themselves. As models became more advanced, agents became more capable and their adoption grew. We recognize that agents help users achieve more, so we recommend using an agent from the get-go. To make that experience simpler, we've selected a specific agent to be the default." Codex (with GPT-5.4 mini medium reasoning, later upgraded to GPT-5.6 Luna medium reasoning) is the recommended default. [Source: https://blog.jetbrains.com/ai/2026/06/codex-is-now-the-recommended-agent-in-jetbrains-ai/, accessed 2026-08-07]

"You can still switch to any other agent at any time." [Source: codex-default article, accessed 2026-08-07]

## 5. Navigation

JetBrains IDE navigation tradition is preserved (Project tool window, Editor tabs, tool windows, Run configurations). AI Assistant is delivered as a tool window / intention action — the AI surface sits inside the IDE's existing chrome, not as a separate app. [Observed: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Help docs categorize AI topics: AI Assistant in JetBrains IDEs → AI MCP Server (last modified 23 July 2026, observed). [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

## 6. Workspace (JetBrains AI in IDE)

The workspace is the JetBrains IDE itself. The AI Assistant surfaces within it via:
- **AI Chat tool window** — "chat with a supported model and ask questions about your project." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **Agent mode toggle** within chat ("then switch to agent mode to carry out changes across your codebase"). [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **In-editor completion** (single line + block) and **Next edit suggestions** inline. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **JetBrains Context** is a separate CLI workflow: "Install the CLI with a simple GET request. Authenticate using the CLI jbcontext login command. Your credentials will work as-is. A JetBrains AI license is needed, but no quota will be consumed by JetBrains Context. Navigate to your project folder and set up JetBrains Context for your preferred coding agent using the jbcontext setup-agent command. You might also do it globally in the user scope." [Source: JetBrains Context blog post, accessed 2026-08-07]

JetBrains Context integrates with Claude Code, Codex CLI, and Junie CLI, and can be used "from JetBrains IDEs, Air, VS Code, and other supported editors." [Source: JetBrains Context blog post, accessed 2026-08-07]

## 7. Conversation (JetBrains AI chat)

Chat mode accepts "files, folders, symbols, or commits as context" — explicitly named JetBrains IDE primitives (Project view files, symbols, VCS commits). [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Transition from chat to agent: "then switch to agent mode to carry out changes across your codebase." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Until June 2026 the AI Chat started in Chat mode; since then Codex is the recommended starting agent. [Source: codex-default article, accessed 2026-08-07]

## 8. Agent Experience (JetBrains AI agents)

Built-in agents: "Junie, Claude Agent, Codex, and GitHub Copilot." GitHub Copilot became an integrated agent in June 2026 (per blog post title "GitHub Copilot now an Integrated Agent in JetBrains IDEs"). [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07; https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

Agent behavior: "An agent plans the work, edits files, runs commands and tests, and reports progress, while you review, keep, or roll back the changes." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

External agents via ACP: "connect any agent that supports the Agent Client Protocol from a curated registry or your own configuration, without a custom integration." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

**JetBrains Air** (separate but related product): "Air now supports GitHub Copilot, OpenCode, Pi, Cline, and other ACP agents, adds Java and Kotlin IDE intelligence, and runs Windows tasks in Docker." [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

Recommended agent selection methodology: benchmarked on Java (225 tasks), C# (38 tasks), Python (90 tasks), with metrics on solve rate / cost / latency; Codex with GPT-5.4 mini medium reasoning won. [Source: codex-default article, accessed 2026-08-07]

## 9. Memory (JetBrains)

Context inputs explicitly named: "files, folders, symbols, or commits." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

In-editor completion learns: "following your coding style and naming conventions." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context persists a "semantic index" of the repository across sessions ("incrementally builds a semantic index of your repositories and provides semantic retrieval"). [Source: JetBrains Context blog post, accessed 2026-08-07]

No explicit cross-session conversation memory surfaced in fetched pages.

## 10. Knowledge (JetBrains Context repository intelligence — DEEP)

JetBrains Context = repository intelligence layer (June 2026): "It incrementally builds a semantic index of your repositories and provides semantic retrieval, helping agents access relevant repository knowledge instead of repeatedly searching and reading files." [Source: JetBrains Context blog post, accessed 2026-08-07]

Multi-repo search: "Instead of being limited to the current repository, agents can discover relevant code across your organization's codebase, including repositories that aren't checked out locally." [Source: JetBrains Context blog post, accessed 2026-08-07]

Architecture: "two main components: a backend that incrementally indexes the repo and semantic search tools that allow agents to query that data." [Source: JetBrains Context blog post, accessed 2026-08-07]

Benchmark results: "We validated JetBrains Context on 205 open-source SWE-bench tasks, 175 production-monorepo tasks, and 1,953 code-localization tasks. Across these benchmarks, JetBrains Context reduced agent turns by up to 68%, latency by up to 59%, and execution cost by up to 48%." [Source: JetBrains Context blog post, accessed 2026-08-07]

Privacy: "Your source code is not stored on JetBrains Context servers." [Source: JetBrains Context blog post, accessed 2026-08-07]

Quota: "A JetBrains AI license is needed, but no quota will be consumed by JetBrains Context." [Source: JetBrains Context blog post, accessed 2026-08-07]

CLI commands: `jbcontext login`, `jbcontext setup-agent`, `jbcontext index`, `jbcontext analyze`, `jbcontext send-feedback`. [Source: JetBrains Context blog post, accessed 2026-08-07]

## 11. Search (JetBrains)

JetBrains Context provides semantic retrieval — "agents can ask any question directly or look up related terms or concepts" via the semantic index. [Source: JetBrains Context blog post, accessed 2026-08-07]

Multi-repo search across organization's codebase, including non-checked-out repositories. [Source: JetBrains Context blog post, accessed 2026-08-07]

`jbcontext analyze` tool surfaces "cost and time savings based on your real time data." [Source: JetBrains Context blog post, accessed 2026-08-07]

## 12. Execution (JetBrains)

Agent execution: "edits files, runs commands and tests, and reports progress, while you review, keep, or roll back the changes." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

MCP exposure: "expose your IDE as an MCP server" — bidirectional MCP, not just client. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Cost-control execution policy: "Setups that would push more than 2% of users over $20/month were ruled out before we ranked candidates on quality and latency." [Source: codex-default article, accessed 2026-08-07]

## 13. Artifacts (JetBrains AI)

Code edits produced by agent mode — explicit review/keep/roll-back UX. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Next edit suggestions: "recommend your next edits and move you to the following place that might need a change." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context analytics output (via `jbcontext analyze`) is an explicit artifact for cost/time savings. [Source: JetBrains Context blog post, accessed 2026-08-07]

## 14. Keyboard UX (JetBrains IDE shortcuts)

JetBrains IDEs have well-known keyboard-first tradition (Ctrl+Shift+A for Actions, Shift+Shift for Search Everywhere, Ctrl+Alt+L for reformat, etc.). No AI-specific shortcut documentation was extracted in this run; the JetBrains AI surface inherits the IDE's keyboard shortcuts.

`jbcontext` CLI commands are shell-typed (`jbcontext login`, `jbcontext index`, `jbcontext setup-agent`). [Source: JetBrains Context blog post, accessed 2026-08-07]

## 15. Motion

JetBrains IDEs use traditional desktop-app motion (no large hero animations). Help page is documentation-formatted; no motion design surfaced. [Observed: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

## 16. Animation

JetBrains Context indexing happens in the background ("JetBrains Context will pre-index your code automatically by agent hooks, or you can do it explicitly by calling the jbcontext index command"). [Source: JetBrains Context blog post, accessed 2026-08-07]

No specific animation tokens documented in fetched pages.

## 17. Visual Hierarchy

Help page layout: H1 "AI Assistant in JetBrains IDEs" → paragraph about plugin consent → "Key capabilities include:" bulleted list with bolded capability names → cross-reference links to other docs / AI Assistant website / official AI Assistant documentation. [Observed: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains blog post layout (Context article): H1 title → author byline → lede paragraph → quote (CTO) → section H2 ("Agent Systems") → body → section H2 ("The new reality for agents") → body → H2 ("What JetBrains Context is") → body → H2 ("The proof is in the pudding") → benchmark data → H2 ("JetBrains Context early access is already included...") → step list → "Discover more" cross-links. [Observed: JetBrains Context blog post, accessed 2026-08-07]

## 18. Progressive Disclosure

Help page discloses in order: (1) plugin consent → (2) capabilities list (bulleted) → (3) deeper links to AI Assistant website and official documentation. [Observed: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context setup is progressively disclosed: CLI install → authenticate → setup agent → index → analyze. [Source: JetBrains Context blog post, accessed 2026-08-07]

Codex-default article progressively discloses: methodology → candidate configurations (Codex shortlist, Junie shortlist) → final showdown table → online A/B test → "what's next" with caveat that recommendation is non-permanent. [Observed: codex-default article, accessed 2026-08-07]

## 19. Accessibility

No JetBrains-AI-specific accessibility statement surfaced. JetBrains IDEs have a long-standing accessibility commitment (high-contrast themes, screen reader support, keyboard navigation). [Observed: general JetBrains IDE tradition, not extracted from fetched URLs.]

## 20. Performance Perception (JetBrains)

Benchmark-validated latency improvements with JetBrains Context: "reduced agent turns by up to 68%, latency by up to 59%, and execution cost by up to 48%." [Source: JetBrains Context blog post, accessed 2026-08-07]

Concrete latency numbers from Codex vs Junie benchmark: Codex (GPT-5.4-mini medium) median latency 170.40s across ecosystems; Junie (Gemini 3 Flash) median latency 147.57s. [Source: codex-default article, accessed 2026-08-07]

Concrete cost numbers: Codex median cost USD 0.1387/task; Junie median cost USD 0.1132/task; Codex cost per successful solve USD 0.4941; Junie USD 0.4337. [Source: codex-default article, accessed 2026-08-07]

## 21. Trust

Explicit consent model: "give your explicit consent to JetBrains AI Terms of Service and JetBrains AI Acceptable Use Policy while installing the plugin." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context privacy: "Your source code is not stored on JetBrains Context servers." [Source: JetBrains Context blog post, accessed 2026-08-07]

Model flexibility = trust signal: "start with a JetBrains AI subscription, bring your own key for third-party models, authorize agents with a provider account, or run local models." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-07-07]

Open benchmarks (DPAIA — Developer Productivity AI Arena repository) for reproducible evaluation. [Source: codex-default article, accessed 2026-08-07]

## 22. Explainability

Agent mode is explicitly review-based: "while you review, keep, or roll back the changes." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context `jbcontext analyze` provides transparency on cost/time savings "based on your real time data." [Source: JetBrains Context blog post, accessed 2026-08-07]

Codex-default article documents the full evaluation methodology, datasets, model configurations, and benchmark tables — high explainability of the recommendation. [Source: codex-default article, accessed 2026-08-07]

## 23. Long Session Experience

Agent execution model supports multi-step work ("plans the work, edits files, runs commands and tests, and reports progress") implying long-running sessions. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

Cost-control blog ("Our First Moves to Get AI Spend Under Control") admits: "Over the past six months at JetBrains, our AI development expenses have increased roughly 10x. When the costs started rising, of course we noticed – and realized that we simply didn't know how to control them systematically." [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07] — long sessions are a known cost problem.

JetBrains Context pre-indexing reduces per-session exploration overhead. [Source: JetBrains Context blog post, accessed 2026-08-07]

## 24. Power User Features (JetBrains AI inline + JetBrains Context)

Built-in agents + ACP external agents + BYOK + local models. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

MCP server exposure (IDE as MCP server). [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context CLI: `jbcontext login`, `jbcontext setup-agent` (per-agent), `jbcontext index`, `jbcontext analyze`, `jbcontext send-feedback` — explicit CLI power-user surface. [Source: JetBrains Context blog post, accessed 2026-08-07]

JetBrains AI for Teams and Organizations (new): "shared context, reusable agentic workflows, organization-level governance, and cost control for software production." [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

JetBrains Central CLI (organization-level platform). [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

## 25. Developer Experience (JetBrains plugin API; ACP; MCP)

ACP (Agent Client Protocol): "connect any agent that supports the Agent Client Protocol from a curated registry or your own configuration, without a custom integration." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

MCP integration: "extend agents with external tools and data sources through the Model Context Protocol, or expose your IDE as an MCP server." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

JetBrains Context CLI install: "Install the CLI with a simple GET request." [Source: JetBrains Context blog post, accessed 2026-08-07]

`jbcontext setup-agent` works for "Claude Code, Codex CLI, and Junie CLI" — cross-agent CLI integration. [Source: JetBrains Context blog post, accessed 2026-08-07]

Open Kotlin Benchmark for AI Coding Agents — JetBrains releasing "an open benchmark for evaluating AI coding agents on real-world Kotlin tasks." [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

DPAIA repository (Developer Productivity AI Arena) — JetBrains' open benchmark for evaluating AI coding tools. [Source: codex-default article, accessed 2026-08-07]

IntelliJ IDEA Goes LSP: "Java and Kotlin Intelligence Comes to VS Code, Cursor, and Agentic Flows" — JetBrains exposing their language intelligence via LSP to other editors. [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Agent plurality with ACP** — connect any ACP-compatible agent from a curated registry or your own config, plus built-in Junie / Claude Agent / Codex / GitHub Copilot. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

2. **JetBrains Context as repository intelligence layer** — benchmarked at -68% agent turns, -59% latency, -48% cost; multi-repo semantic search across non-checked-out repositories. [Source: JetBrains Context blog post, accessed 2026-08-07]

3. **Model flexibility (four paths)** — JetBrains AI subscription, BYOK, provider-account auth, local models. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

4. **IDE-as-MCP-server** — bidirectional MCP exposure (IDE exposes itself as MCP server to other tools). [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

5. **Transparent, benchmark-driven recommended agent selection** — full methodology, datasets, and metrics published (Codex selected over Junie after Java 225 / C# 38 / Python 90 task benchmark + online A/B test). [Source: codex-default article, accessed 2026-08-07]

6. **Open benchmarks (DPAIA, Kotlin Benchmark for AI Coding Agents)** — JetBrains is publishing reproducible evaluation infrastructure for the industry. [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

7. **Decades-old IDE intelligence now exposed to agents** — JetBrains' language intelligence (Java/Kotlin via LSP) becomes available to other editors (VS Code, Cursor) and agents. [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]

8. **Privacy-preserving repository indexing** — "Your source code is not stored on JetBrains Context servers." [Source: JetBrains Context blog post, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Plugin-not-bundled friction** — "The AI Assistant plugin is not bundled and is not enabled in IntelliJ IDEA by default." Users must install plugin + acquire license + consent to ToS — three explicit gates before any AI feature works. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

2. **10x cost growth admitted publicly** — "Over the past six months at JetBrains, our AI development expenses have increased roughly 10x. When the costs started rising, of course we noticed – and realized that we simply didn't know how to control them systematically." [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07] — indicates JetBrains AI was deployed without robust cost controls for ~6 months.

3. **Recommended agent solve rates are low in absolute terms** — Codex (GPT-5.4-mini medium) weighted average solve rate across Java/C#/Python = 39.9%; Junie (Gemini 3 Flash) = 39.1%. Best case Java Codex = 43.9%; worst case Python Codex = 20.2%. [Source: codex-default article, accessed 2026-08-07]

4. **Recommended agent is non-permanent / unstable** — "This isn't a permanent decision, however. As models evolve, new agents join, and our benchmark coverage grows, we'll re-evaluate the decision." Plus the article disclaimer: "As GPT5.6 has recently been released we are also running new evaluations. If this model version turns out to be better we will update the recommended agent." — recommended agent is a moving target. [Source: codex-default article, accessed 2026-08-07]

5. **JetBrains Context is early access / not GA** — "JetBrains Context is now available in early access at no additional cost with your JetBrains AI subscription." [Source: JetBrains Context blog post, accessed 2026-08-07]

6. **Fragmented AI product surface** — multiple overlapping AI products: AI Assistant (IDE plugin), Junie (agent), Air (multi-IDE agent), JetBrains Context (repo intelligence), JetBrains Central (org platform), JetBrains AI for Teams and Organizations (org governance). User mental model is unclear. [Observed: https://blog.jetbrains.com/ai/, accessed 2026-08-07]

7. **Mostly JetBrains-ecosystem-bound** — AI Assistant is fundamentally tied to JetBrains IDEs; users in VS Code / Cursor / Windsurf / Zed only get JetBrains Context (CLI) + LSP language intelligence. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

## 28. What should MiMo learn?

- **ACP (Agent Client Protocol) as agent-connectivity standard** — connect any ACP-compatible agent from curated registry or own config, "without a custom integration." [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **Repository intelligence layer as a separate, model-agnostic product** — JetBrains Context reduces agent turns -68%, latency -59%, cost -48%; multi-repo search including non-checked-out repositories. [Source: JetBrains Context blog post, accessed 2026-08-07]
- **Bidirectional MCP** — both consume MCP tools and expose the IDE/editor as an MCP server. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **Four-path model flexibility** — subscription + BYOK + provider-account + local models — meet users where their AI spend already is. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **Transparent, benchmark-driven recommended-agent selection** — publish methodology, datasets, metrics, and re-evaluate when models change. [Source: codex-default article, accessed 2026-08-07]
- **Agent as delegate with explicit review/keep/roll-back UX** — not autonomous. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **Privacy-preserving repository indexing** — "Your source code is not stored on JetBrains Context servers." [Source: JetBrains Context blog post, accessed 2026-08-07]
- **Open benchmarks for the industry (DPAIA, Kotlin Benchmark)** — ecosystem contribution that raises trust and adoption. [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]
- **Explicit per-task cost/latency/solve-rate tracking** via `jbcontext analyze` for real-time visibility. [Source: JetBrains Context blog post, accessed 2026-08-07]

## 29. What should MiMo reject?

- **Plugin-not-bundled multi-gate onboarding** — three explicit consent gates before any AI feature works is high friction for new users. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]
- **Marketing a "recommended agent" that is admitted to be non-permanent** — "This isn't a permanent decision, however" — instability of the recommended default erodes user trust in the recommendation. [Source: codex-default article, accessed 2026-08-07]
- **Fragmented AI product portfolio with overlapping surfaces** — AI Assistant + Junie + Air + JetBrains Context + JetBrains Central + JetBrains AI for Teams — too many AI product names to reason about. [Observed: https://blog.jetbrains.com/ai/, accessed 2026-08-07]
- **Deploying AI broadly before building cost controls** — JetBrains publicly admits 10x cost growth before they "knew how to control them systematically." [Source: https://blog.jetbrains.com/category/ai/, accessed 2026-08-07]
- **Low absolute solve rates dressed up as wins** — Codex 39.9% weighted solve rate is presented as the winning configuration; ~60% of tasks are not solved. [Source: codex-default article, accessed 2026-08-07]
- **IDE-only AI surface** — being fundamentally tied to JetBrains IDEs limits reach; MiMo should not be locked to one editor family. [Source: https://www.jetbrains.com/help/idea/ai-assistant.html, accessed 2026-08-07]

## 30. Confidence Score (0-100) with reasoning

**Confidence: 80 / 100**

Reasoning:
- (+) The IntelliJ IDEA 2026.2 Help page (https://www.jetbrains.com/help/idea/ai-assistant.html) was fetched directly and provides authoritative, dated (23 July 2026) product description with explicit plugin-consent model, agent list, ACP/MCP capabilities, model flexibility, and in-editor completion features.
- (+) Two detailed JetBrains blog posts (Introducing JetBrains Context, June 2026; Codex recommended agent, June 2026) provide deep, primary-source evidence on repository intelligence, benchmarks (68%/59%/48% reductions), evaluation methodology (Java 225 / C# 38 / Python 90 tasks), and concrete cost/latency/solve-rate tables.
- (+) The JetBrains blog AI category page surfaced recent articles: GitHub Copilot integration (June 2026), JetBrains Air multi-agent support, JetBrains Central, JetBrains AI for Teams and Organizations, cost-control announcement, IntelliJ IDEA LSP for VS Code/Cursor, Kotlin Benchmark for AI Coding Agents.
- (−) The jetbrains.com/ai/ marketing landing page is JS-rendered; only `<title>` extracted. Pricing, plan tiers, marketing copy hierarchy are not directly sourced.
- (−) Sections 14 (Keyboard UX), 15 (Motion), 16 (Animation), 19 (Accessibility) have weak direct evidence — no AI-specific shortcut documentation, motion tokens, or accessibility statements were extracted.
- (−) Junie product page (jetbrains.com/junie/) returned only the page title; no Junie-specific UX details captured.
- (−) No live-product screenshots captured; only static HTML text.

Recommended next step: fetch jetbrains.com/junie/ with a headless browser (Playwright) to capture Junie's agent UI; fetch jetbrains.com/ai/pricing for plan/credit structure; fetch JetBrains Central and Air product pages for org-tier capabilities.
