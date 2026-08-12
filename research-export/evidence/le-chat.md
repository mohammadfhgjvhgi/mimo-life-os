# Le Chat (Mistral AI) — Evidence File

**Task ID:** W11 (Phase R2 — EVIDENCE-BASED)
**Researcher:** Senior Product Researcher (MiMo)
**Date accessed:** 2026-08-07
**Evidence base:** Raw HTML/TXT in `/home/z/my-project/research/evidence/raw-le-chat/` (home.html, news.html, docs.html, vibe.html, vibe-work.html, vibe-code.html, docs-le-chat.html)
**Method:** Direct `curl` of official URLs (mistral.ai, mistral.ai/news, docs.mistral.ai, docs.mistral.ai/vibe/work, docs.mistral.ai/vibe/code, mistral.ai/le-chat), text extraction via `extract_text.py`. chat.mistral.ai returned a Cloudflare "Just a moment…" JS challenge page — not extracted.

> **Critical evidence note on naming:** As of 2026-08-07, the standalone "Le Chat" product has been **rebranded and unified as "Vibe"** (announced May 28, 2026, per Mistral news page). The mistral.ai/le-chat URL returns a 404 page ("Previous 4 0 4 Find help"). However, docs confirm: "Le Chat is now Vibe. The chat.mistral.ai URL remains the entry point and most features now live inside Work, with a few legacy ones still available in Chat." The product now has **three modes**: Chat, Work, Code. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07; https://mistral.ai/news, accessed 2026-08-07]

---

## 1. Product Overview

Mistral AI's consumer/developer chat product — originally launched as "Le Chat" (a ChatGPT-style assistant) and now unified under the **Vibe** brand as a "unified agent for productivity and coding tasks, built for professional use and available across web, mobile, your code editor, and your terminal." [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Three modes after rebrand:
- **Work** — multi-stage professional tasks across apps and tools (research, drafts, summaries, scheduled runs)
- **Code** — development in terminal, VS Code, or remote cloud sessions
- **Chat** — quick turn-based conversations; legacy Le Chat features (Agents, Think mode, Deep Research, Code Interpreter, Memories) [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Mistral homepage tagline: "Frontier AI. In your hands. We help organizations build tailored AI systems to solve the world's hardest problems." [Source: https://mistral.ai/, accessed 2026-08-07]

Parent product line: Mistral AI sells four products — Studio (developer console + Mistral API), Forge (train/custom models), Vibe (the unified agent, formerly Le Chat), Vibe for Code (CLI/IDE agents), and Compute (training + inference infrastructure). [Source: https://mistral.ai/, accessed 2026-08-07]

## 2. Product Philosophy

Vibe positioning per docs: "you stay in control. Vibe asks for approval before sensitive actions, shows every tool call, and lets you steer or stop at any point." [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Three mode design reflects task-shape matching: "each shaped for a different kind of task" (Work / Code / Chat), with "Across every mode, you interact with Vibe the same way: same Mistral models, same patterns, same control." [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Mistral AI broader philosophy: open-weights frontier models (Mistral Small 4 — Apache 2.0; Voxtral Mini — Apache 2.0; Voxtral TTS — CC BY-NC 4.0; Mistral Medium 3.5 — Modified MIT; OCR 4 — Premier). [Source: https://docs.mistral.ai/, accessed 2026-08-07]

## 3. Core Mental Model

Documented workflow: "A typical Vibe workflow looks like this: You describe the outcome you want in natural language. Vibe gathers context from your prompt, attached files, connected tools, or the web. Vibe plans and acts: it breaks the task into steps, calls the right tools, and shows its progress in real time. You review and reuse: outputs are inspectable, editable, and reusable across sessions." [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

The mental model is outcome-first ("describe the outcome you want"), not prompt-first — Vibe takes responsibility for gathering context and decomposing steps. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Inputs/sources of context for Work: "Connectors (email, calendar, Slack, Notion, GitHub, Google Drive, SharePoint), Libraries (curated document collections already uploaded and indexed), Skills (repeatable methods/checklists/templates), Files and Canvas, Web search and Open URL." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 4. User Journey

Mode picker is the entry decision: "Open Vibe › Work. If the sidebar is closed, click the drawer icon or press Cmd+Shift+B on macOS or Ctrl+Shift+B on Windows and Linux. In the sidebar, select Work from the mode selector." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

"Vibe remembers the last tab you selected. If Chat or Code opens by default, select Work in the sidebar before starting the task." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Tip: "Not sure which mode to use? See Choose Chat, Work, or Code." — a dedicated mode-selection guide exists. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Mobile: "Download Vibe for iOS or Android to use Work and Chat on the go." [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

## 5. Navigation

Docs nav: Vibe → Overview / Choose Chat, Work, or Code / Work / Chat / Code / Studio (Overview, Conversations, Agents, Connectors, Libraries, Document AI, Search Toolkit, Audio, Workflows, Moderation & Guardrailing, Batch Processing, RAG & Embeddings, Regional Inference). [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Top-level Mistral nav: Products / Solutions / Research / Developers / Blog / Customers / Company. [Source: https://mistral.ai/, accessed 2026-08-07]

Mistral product menu lists: Studio, Forge, Vibe, Vibe for Code, Compute. [Source: https://mistral.ai/, accessed 2026-08-07]

## 6. Workspace (Vibe Chat canvas; Work Files/Canvas; Vibe Code IDE)

Vibe Work workspace = prompt box + sidebar (mode selector) + "right-hand panel" todos display. "For longer tasks, Work displays a live todos panel in the right-hand panel as it works, and may ask you follow-up questions when your prompt is ambiguous. It also shows progress, tool calls, and intermediate outputs while it works." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Canvas and Files are first-class: "Files and Canvas: upload documents, spreadsheets, presentations, PDFs, or images for Work to read, summarize, extract, or turn into reviewable outputs." Review flow: "Review generated content in Canvas or files." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code workspace: "Run Vibe Code against a local checkout via the CLI or the VS Code extension, or against a GitHub repository in a remote sandbox via Vibe Code Web." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

## 7. Conversation (Vibe Chat; Work; Vibe Code)

Chat mode (legacy Le Chat): "quick turn-based conversations" + "legacy features such as Agents, Think mode, Code Interpreter, Deep Research, or Memories." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Work mode = conversational task delegation: "Work reasons through the request, breaks it into smaller steps, and calls tools when needed." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code = agentic coding in conversation: "With read/write access to your filesystem, a shell, and a configurable set of tools, it can read files, run commands, write code, and open pull requests on your behalf, under your supervision." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

## 8. Agent Experience (Vibe Work / Vibe Code agents)

Vibe Work is described as an agent, not a chatbot: "Work is Vibe's productivity mode for delegating complex, multi-step tasks across your apps and tools. Describe the outcome you want in natural language: Work gathers context, breaks the task into steps, calls the right tools, and asks for approval before sensitive actions." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Stop button = visible stop control ("the black square") for redirect mid-task. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code: "Vibe Code surfaces its plan, requests approval before sensitive actions (shell commands, file writes, pull requests), and can be interrupted at any step." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

Studio side also exposes "Agents" and "Conversations" as discrete primitives in docs nav. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Announced May 22, 2026: "Remote agents in Vibe. Powered by Mistral Medium 3.5" + "remote coding agents in Vibe, plus new Work mode in Le Chat for complex tasks." [Source: https://mistral.ai/news, accessed 2026-08-07]

## 9. Memory (Le Chat Memories → Vibe Memories)

Memories is a legacy Le Chat feature retained in Chat mode. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Studio also exposes "Conversations" as a top-level concept implying persistence. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Vibe Work "remembers the last tab you selected" (UI state memory). [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Custom instructions: "Set custom instructions" is a docs subtopic under Vibe Work. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 10. Knowledge (Vibe Work Connectors, Libraries, Skills)

Three knowledge primitives explicitly documented:
- **Connectors** — "connect tools such as email, calendar, Slack, Notion, GitHub, Google Drive, or SharePoint so Work can use approved external data." Work can also "ask you to connect or authenticate a missing tool during a task." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]
- **Libraries** — "use curated document collections that are already uploaded and indexed." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]
- **Skills** — "apply repeatable methods, checklists, or templates to a task." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Studio has a separate article "Your Prompts and Skills need a system of record" (July 9, 2026) — "Studio gives AI prompts & skills a system of record—versioned, owned, and traceable." [Source: https://mistral.ai/news, accessed 2026-08-07]

Vibe Work docs page lists "Search the web" and "Open URL" as separate capabilities — public web + explicit-URL reads as first-class. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 11. Search (Vibe Work web search; Studio; Toolkit)

Vibe Work: "Web search and Open URL: use public information or ask Work to read a specific web page." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Mistral announced May 28, 2026: "Introducing Search Toolkit — Production search pipelines, anywhere." [Source: https://mistral.ai/news, accessed 2026-08-07]

Studio exposes "Search Toolkit" as a separate capability area in docs nav. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

## 12. Execution (Vibe Work tool calls; Vibe Code shell + PRs)

Work execution model: "Work shows progress and asks for confirmation before sensitive actions." Sensitive action examples explicitly listed: "sending email, posting messages, creating calendar events, deleting issues, or changing data in external tools." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code execution: "read files, run commands, write code, and open pull requests on your behalf, under your supervision." Approval gates: "shell commands, file writes, pull requests." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

Workflows are first-class: "Workflows for work that runs the business" (April 27, 2026 announcement, public preview). [Source: https://mistral.ai/news, accessed 2026-08-07]

Schedule tasks is a docs subtopic under Vibe Work. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 13. Artifacts (Vibe Canvas; Files; Vibe Code PRs)

Vibe Work generates Canvas content + files: "Review generated content in Canvas or files." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Work produces "Group tasks with Projects" — projects as an organizing artifact. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code opens pull requests as the canonical delivery artifact. [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

Image generation is a Work capability: "Generate images" listed in docs subtopics. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Voice mode is a Work capability: "Use Voice mode" listed in docs subtopics. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 14. Keyboard UX

Sidebar toggle: "press Cmd+Shift+B on macOS or Ctrl+Shift+B on Windows and Linux" to open sidebar. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Search shortcut across docs: "⌘K" (displayed in docs nav as "Search docs ⌘K"). [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Stop task = "the stop button (the black square)" — explicit visual + function description. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 15. Motion

Vibe Work "shows progress, tool calls, and intermediate outputs while it works" — i.e., streaming, not blocking. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

"todos as they appear to see what Work is doing" — incremental todo list animation as work progresses. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 16. Animation

No specific motion/animation tokens surfaced in fetched pages. Docs describe live todo panel updating in real time. [Observed: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 17. Visual Hierarchy

Vibe Work layout: sidebar (mode selector + tabs) on left, main task area in center, "right-hand panel" for live todos. Three-zone layout. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Mistral homepage hierarchy: hero tagline "Frontier AI. In your hands." → "We help organizations build tailored AI systems..." → Featured news cards (Robostral Navigate, Mistral OCR 4, Vibe gets to work) → Industry customer logos (HSBC, ASML, CMA CGM, Austrian sector). [Observed: https://mistral.ai/, accessed 2026-08-07]

Mistral latest models shown as cards with: model name, license (Apache 2.0 / Modified MIT / CC BY-NC 4.0 / Premier), description, version number (e.g., "v 26.04" for Mistral Medium 3.5). [Source: https://docs.mistral.ai/, accessed 2026-08-07]

## 18. Progressive Disclosure

Mode selector as top-level decision ("Choose Chat, Work, or Code") — the user picks the surface before seeing task options. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

Work only reveals additional Connectors / Skills / Libraries when needed: "Work can ask you to connect or authenticate a missing tool during a task." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code surfaces plan first, then asks for approval per sensitive action — approval gates are progressive. [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

## 19. Accessibility

No explicit accessibility statement surfaced on fetched Mistral pages. Docs site offers keyboard shortcut (⌘K search, Cmd+Shift+B sidebar toggle). [Observed: https://docs.mistral.ai/, accessed 2026-08-07]

## 20. Performance Perception

Vibe Work streaming + live todos panel create perceived progress during long tasks. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

"Stop button (the black square)" gives immediate interrupt affordance. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Remote agents in Vibe (May 22, 2026) + Vibe Code Web (remote sandbox) imply non-blocking async execution. [Source: https://mistral.ai/news, accessed 2026-08-07]

## 21. Trust

Vibe Work: "You stay in control: Work shows progress and asks for confirmation before sensitive actions." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

"Organization settings can also affect which tools are available." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code: "You stay in the loop." Plus: "Behavior is configurable per agent and per environment, see Safety, approvals, and permissions." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

Studio "Connect the dots: Build with built-in and custom MCPs in Studio" (May 22, 2026) — "Connect enterprise data to your AI applications with reusable connectors, direct tool calling, and human-in-the-loop approval controls." [Source: https://mistral.ai/news, accessed 2026-08-07]

Customer logos (HSBC, ASML, CMA CGM) imply enterprise trust signal. [Source: https://mistral.ai/, accessed 2026-08-07]

## 22. Explainability

Vibe Work: "Watch the todos as they appear to see what Work is doing." Plus: "It also shows progress, tool calls, and intermediate outputs while it works." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code: "Vibe Code surfaces its plan, requests approval before sensitive actions." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

Checkpoints listed: "Watch the todos as they appear to see what Work is doing. Approve or deny sensitive actions when prompted. Stop the task with the stop button (the black square) if Work goes the wrong direction. Redirect with a follow-up message if Work chooses the wrong source or approach." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 23. Long Session Experience

Vibe Work: "Treat Work outputs as drafts until you review them. Before you use or share the result: Read the final summary. Review generated content in Canvas or files. Check facts, tables, dates, names, owners, and source references. Verify extracted information against the original file or source when accuracy matters. Ask Work to revise the output if the audience, tone, structure, or facts are wrong. Approve, edit, share, or reuse the result only after review." [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

"Make repeated work easier" — Work supports making repeated work easier via Skills. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

"Schedule tasks" + "Group tasks with Projects" imply long-horizon organization. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 24. Power User Features (Vibe Work canvas; Vibe Code CLI; Skills)

Vibe Work power features: Files and Canvas, Connectors (email/calendar/Slack/Notion/GitHub/Drive/SharePoint), Libraries, Skills, Web search, Open URL, Schedule tasks, Projects, Generate images, Voice mode. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

Vibe Code power features: three execution surfaces (CLI, VS Code extension, Vibe Code Web), remote sandbox sessions, BYO filesystem + shell + tools, opens PRs. [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

Studio has full API: Conversations, Agents, Connectors, Libraries, Document AI, Search Toolkit, Audio, Workflows, Moderation & Guardrailing, Batch Processing, RAG & Embeddings, Regional Inference. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Vibe Work "Set custom instructions" for persistent personalization. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

## 25. Developer Experience (Mistral API; Studio; Forge)

Three-product platform: Vibe (agent), Studio (developer console + Mistral API: keys, Playground, evaluations, agents, SDKs), Admin (orgs, billing, SSO, Workspaces, access policies). [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Quickstarts ("most take 15 minutes or less") include: Run your first Vibe Work task, Analyze a dataset, Create your first Skill, Install the Vibe CLI, Scaffold a project with Vibe Code, Activate Studio + generate API key, Test a model in the API playground, Create a reusable Prompt. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

SDK Clients + API Reference + Cookbooks surfaced. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

Studio article (July 9, 2026): "Studio gives AI prompts & skills a system of record—versioned, owned, and traceable." [Source: https://mistral.ai/news, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Clean three-mode task-shape model (Chat / Work / Code)** — explicit mental model reduction. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

2. **Explicit, listable approval gates** — Work documents "sending email, posting messages, creating calendar events, deleting issues, or changing data in external tools" as sensitive actions requiring confirmation. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

3. **Live progress + todos + tool calls + intermediate outputs visible during execution** — high explainability for long tasks. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

4. **Skills as repeatable methods** + Studio as a "system of record" for prompts/skills (versioned, owned, traceable). [Source: https://mistral.ai/news, accessed 2026-08-07]

5. **Three execution surfaces for Vibe Code** (CLI / VS Code extension / Vibe Code Web remote sandbox) — covers local + remote workflows. [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

6. **Open-weights model strategy** (Mistral Small 4 = Apache 2.0, Voxtral Mini = Apache 2.0) — appeals to enterprises needing self-hosted inference. [Source: https://docs.mistral.ai/, accessed 2026-08-07]

7. **Open Connector / MCP support** — "Build with built-in and custom MCPs in Studio." [Source: https://mistral.ai/news, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Le Chat brand discontinuity** — mistral.ai/le-chat returns a 404 page ("Previous 4 0 4 Find help"), and the brand was subsumed into Vibe. The migration is documented ("Le Chat is now Vibe") but the public URL surface was broken — direct evidence of incomplete redirect handling. [Source: https://mistral.ai/le-chat, accessed 2026-08-07; https://docs.mistral.ai/vibe/, accessed 2026-08-07]

2. **chat.mistral.ai is Cloudflare-protected** — returns "Just a moment…" JS challenge to non-browser user agents, making it hostile to programmatic access and SDK-based tooling. [Observed: https://chat.mistral.ai, accessed 2026-08-07]

3. **Mode ambiguity for users** — "Not sure which mode to use? See Choose Chat, Work, or Code" implies the three-mode split creates a decision cost the user must pay up front. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

4. **Legacy features retained as-is in Chat** — "legacy Le Chat features (Agents, Think mode, Deep Research, Code Interpreter, Memories)" are not unified with Work/Code; the product has a parallel legacy surface. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]

5. **Ecosystem smaller than US frontier competitors** — Mistral's home page features customer logos (HSBC, ASML, CMA CGM, BMW, Austrian sector) but no comparable developer-tool ecosystem to GitHub's MCP Registry + Agent Finder. [Observed: https://mistral.ai/, accessed 2026-08-07]

6. **Vibe Code Web is remote-sandbox only for GitHub repositories** — not arbitrary local repos. "Run Vibe Code against a local checkout via the CLI or the VS Code extension, or against a GitHub repository in a remote sandbox via Vibe Code Web." [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

7. **Workflows only public preview** (April 27, 2026). [Source: https://mistral.ai/news, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Three-mode task-shape split (Chat / Work / Code)** as a way to keep conversational simplicity for quick exchanges while exposing an agentic surface (Work) and a code-execution surface (Code). [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]
- **Explicit, enumerated sensitive-action approval list** — name the actions that always require confirmation. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]
- **Live right-hand todos panel** + tool-call display + intermediate outputs — strong long-task explainability pattern. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]
- **Skills as first-class reusable method** + Studio as a "system of record" (versioned/owned/traceable) for prompts and skills. [Source: https://mistral.ai/news, accessed 2026-08-07]
- **"You stay in control" framing as product principle**, with explicit "steer or stop at any point" affordance. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]
- **Three execution surfaces for code agent** — CLI / IDE extension / remote sandbox web. [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]
- **Mobile app pairing for the productivity agent** — Vibe for iOS/Android supports Work + Chat on the go. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]

## 29. What should MiMo reject?

- **Mode-picker decision tax** — requiring users to choose Chat/Work/Code up front adds cognitive load; MiMo should infer the right shape from the prompt. [Source: https://docs.mistral.ai/vibe/, accessed 2026-08-07]
- **Breaking the brand URL surface on rename** — leaving /le-chat as a 404 ("Previous 4 0 4 Find help") rather than a redirect damages SEO and bookmark trust. [Observed: https://mistral.ai/le-chat, accessed 2026-08-07]
- **Cloudflare JS challenge on chat.mistral.ai** — hostile to programmatic/SDK access. [Observed: https://chat.mistral.ai, accessed 2026-08-07]
- **Parallel legacy surface ("legacy Le Chat features: Agents, Think mode, Deep Research, Code Interpreter, Memories")** — unifying two product shapes into one mode with legacy carve-out creates UX fragmentation. [Source: https://docs.mistral.ai/vibe/work/, accessed 2026-08-07]
- **Vibe Code Web locked to GitHub repos** — arbitrary limitation for a code agent that should support any Git host. [Source: https://docs.mistral.ai/vibe/code/, accessed 2026-08-07]

## 30. Confidence Score (0-100) with reasoning

**Confidence: 72 / 100**

Reasoning:
- (+) Vibe overview docs page, Vibe Work docs page, and Vibe Code docs page were directly fetched and contain rich, unambiguous feature descriptions (mode picker, sidebar shortcut Cmd+Shift+B, sensitive-action approval list, three code surfaces, Skills/Connectors/Libraries primitives).
- (+) Mistral news page (https://mistral.ai/news) was fetched and provided dated, authoritative announcements: Vibe launch (May 28, 2026), Remote agents + Work mode (May 22, 2026), Workflows public preview (April 27, 2026), Studio prompts/skills system of record (July 9, 2026), Shieldstral (Aug 4, 2026).
- (+) Direct evidence for the Le Chat → Vibe rebrand: docs explicitly state "Le Chat is now Vibe."
- (−) chat.mistral.ai itself was not extractable (Cloudflare JS challenge) — conversational UX details (actual chat UI, prompt input design, in-chat artifacts) are inferred from docs, not observed in product.
- (−) mistral.ai/le-chat returns 404 — this is informative (rebrand is real) but means no direct legacy product surface was captured.
- (−) Sections 15 (Motion), 16 (Animation), 19 (Accessibility) have weak direct evidence; no Mistral accessibility statement or motion-design documentation was extracted.
- (−) Pricing page (mistral.ai/pricing) was not fetched — plan/credit structure for Vibe is not documented in evidence.

Recommended next step: fetch mistral.ai/pricing + docs.mistral.ai/admin + docs.mistral.ai/studio/agents to upgrade confidence on admin/governance surface and conversational UX details.
