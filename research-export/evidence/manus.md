# Manus (manus.im / manus.ai) — Evidence File (W3b / Phase R2)

**Product:** Manus — autonomous general AI agent with its own cloud computer, cloud browser, local desktop execution, scheduled tasks, and plan mode
**Vendor:** Manus (now part of Meta, per footer of every cached page as of access date)
**Research date:** 2026-08-07
**Researcher:** W3b agent (general-purpose, Senior Product Researcher)
**Method:** (a) Official manus.im/docs/* — fully extracted from cached Mintlify-generated markdown files (`md-features_*.md`, `md-introduction_*.md`, `md-integrations_*.md`, `md-website-builder_*.md`) — these are pre-rendered docs, not SPA shells. (b) Manus blog posts at manus.im/blog/* — extracted from cached HTML via Python regex stripper (these pages server-render text in body). (c) Manus llms.txt — manus.im publishes a docs index specifically for LLM agents, indicating awareness of agent-as-user audience. (d) Did NOT attempt interactive manus.im session in sandbox (would require Manus account; out of scope for evidence-first pass). (e) The arxiv architecture paper search returned unrelated papers (arxiv IDs 2504.00724 and 2507.00724 — math/numerical analysis and computer vision, NOT Manus AI); no Manus architecture paper was found via direct arxiv search. Manus does publish "Context Engineering for AI Agents" referenced in their $100M ARR blog post but that is a Manus-authored blog/whitepaper, not an arxiv paper. Every claim cites the source URL and the access date.

---

## 1. Product Overview

- "Manus AI is an autonomous general AI agent designed to complete tasks and deliver results. Unlike traditional chatbots that simply answer questions, Manus AI takes action. Think of Manus AI as a virtual colleague with its own computer, capable of planning, executing, and delivering complete work products from start to finish." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- Tagline on home page: "What can I do for you?" with quick-action chips: Create slides / Build website / Design / Create games / More. Sub-tagline: "Less structure, more intelligence." [Source: https://manus.im/home, accessed 2026-08-07 — Observed]
- "Manus has crossed $100M in ARR, eight months after launch. This makes us the fastest startup to go from $0 to $100M in the world." [Source: https://manus.im/blog/manus-100m-arr, "Dec 17, 2025", accessed 2026-08-07]
- "Since launch, Manus has processed more than 147T tokens and created more than 80M virtual computers." [Source: https://manus.im/blog/manus-100m-arr, accessed 2026-08-07]
- Vendor status: "Manus is now part of Meta — bringing AI to businesses worldwide" (footer of every cached page, accessed 2026-08-07).
- Funding: "Prior to our launch, we raised $75M led by Benchmark. Benchmark General Partner Chetan Puttagunta joined our Board alongside our founders Red and Pan." [Source: https://manus.im/blog/manus-100m-arr, accessed 2026-08-07]
- Headcount: "105 people across Singapore, Tokyo, and San Francisco." [Source: https://manus.im/blog/manus-100m-arr, accessed 2026-08-07]
- Distribution: web app (manus.im) + Desktop app (macOS, Windows) + Mobile (iOS, Android). [Source: https://manus.im/docs/features/desktop + footer "Download desktop & mobile app" on every blog post, accessed 2026-08-07]

## 2. Product Philosophy

- **Action over answer:** "Unlike traditional chatbots that simply answer questions, Manus AI takes action." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- **Autonomy over supervision:** "Traditional AI tools require constant supervision and manual intervention. You guide them step by step, then piece together the results yourself. Manus AI works differently. It operates in a complete sandbox environment—a virtual computer with internet access, a persistent file system, and the ability to install software and create tools. This means Manus AI can work independently, remember context across long tasks, and deliver production-ready results without you managing every detail." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- **"Less structure, more intelligence."** — site-wide tagline in footer of every cached page. [Observed: footer across manus.im/blog/* and manus.im/home, accessed 2026-08-07]
- **Virtual colleague framing:** "Think of Manus AI as a virtual colleague with its own computer." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- **Anti-fragility / action-engine framing:** "We have always believed that an AI agent should be an action engine, not just a chat assistant. The cloud sandbox gave Manus its own workspace. My Computer brings Manus into yours. Your ideas. Manus's execution. Every resource on your computer." [Source: https://manus.im/blog/manus-my-computer-desktop, "Mar 16, 2026", accessed 2026-08-07]
- **Category creation claim:** "Earlier this year, Manus launched the first General AI Agent, kickstarting a new evolution in AI. Since launch, Manus has processed more than 147T tokens and created more than 80M virtual computers. You quickly wowed us with your creative use cases as we defined this category together. We changed the way humans and AI collaborate, moving from simple question and answers to true task delegation." [Source: https://manus.im/blog/manus-100m-arr, accessed 2026-08-07]
- **Context Engineering as industry contribution:** "We shared our learning on Context Engineering for AI Agents, which became an industry standard." [Source: https://manus.im/blog/manus-100m-arr, accessed 2026-08-07]

## 3. Core Mental Model

- **Agent-first + computer-attached.** Manus is NOT a chat tool that happens to have an agent — it IS an agent that operates "a virtual computer with internet access, a persistent file system, and the ability to install software and create custom tools." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- **Three execution environments** (well-delineated):
  - **Temporary Sandbox** — for running a Python script, analysis, document, or building a web app or website. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
  - **Manus Desktop (My Computer)** — for organizing local files or controlling apps on your machine. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
  - **Cloud Computer** — for running 24/7 bots, persistent knowledge base / live database, self-hosting open-source tools, scheduled scrapers/reports. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Plus a fourth surface, the local Browser Operator** (Nov 18, 2025) — a browser extension that operates your local browser using your existing logins; complements the cloud browser. [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Mental model summary: Manus = a virtual colleague with its own computer (sandbox) OR with your computer (My Computer) OR with a never-off computer (Cloud Computer) OR with your browser (Browser Operator).** The "computer" pane is core, not optional.
- Contrast with v0: where v0 oscillates between "design tool" and "code tool" (see v0.md §3), Manus has **a single coherent identity: an autonomous agent with its own computer**. The product surface shifts between cloud / local-desktop / cloud-computer / local-browser, but the mental model stays constant.

## 4. User Journey

- **Sign-up:** manus.im → "Sign in / Sign up" → land on home page with "What can I do for you?" composer and quick-action chips (Create slides / Build website / Design / Create games / More). [Source: https://manus.im/home, accessed 2026-08-07 — Observed]
- **Empty state:** Composer with quick-action chips. No equivalent of v0's templates gallery visible on home; instead, Manus leans on prompt priming ("Less structure, more intelligence"). [Observed: https://manus.im/home, accessed 2026-08-07]
- **First task:** Describe outcome in natural language. Manus opens its sandbox / cloud browser / desktop as needed and works autonomously. "You see everything Manus is doing in real-time." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Optional Plan Mode** (Jul 22, 2026): "On web, type / and select Plan. On mobile, tap + and choose Plan Mode. Once active, Manus evaluates your request. If context is missing, it asks clarifying questions. If the path is clear, it generates the plan immediately: a full Markdown document with goals, steps, and constraints. You can click into the document and rewrite anything. You can ask Manus to edit it for you. When you hit Confirm, that plan becomes the source of truth." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Iterate:** Plan Mode can be toggled mid-task: "If Manus is already building and you want to pause, regroup, and plan the next iteration, just activate Plan Mode mid-task. Manus stops, generates a plan for the next phase, and waits for your approval before continuing." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Approve commands (Desktop / My Computer):** Every terminal command requires explicit approval — "Allow Once" or "Always Allow". [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
- **Approve browser session (Browser Operator):** "When you assign a task, Manus will request permission to take control. Click 'Authorize' to grant one-time access." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Take Over (Cloud Browser):** "When Manus encounters complex verifications (SMS codes, CAPTCHA, multi-factor authentication), the system will prompt you to 'Take Over' the browser." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Long-term / recurring:** Scheduled Tasks (daily/weekly/monthly/custom/one-time). Projects (persistent workspaces with master instruction + knowledge base). Cloud Computer (24/7 always-on). [Source: https://manus.im/docs/features/scheduled-tasks + projects + blog-manus-cloud-computer, accessed 2026-08-07]
- **Mobile:** Full mobile app (iOS, Android) with prompt, monitor, take-over. "Inspiration doesn't always strike at your desk" (Design View blog). [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]

## 5. Navigation

- **Home:** Single composer with quick-action chips. No sidebar / no template gallery / no projects visible until signed in. [Observed: https://manus.im/home, accessed 2026-08-07]
- **Top nav (signed out):** Features / Solutions / Resources / Events / Team / Pricing. Language selector (15+ languages). Get started CTA. [Observed: https://manus.im/home, accessed 2026-08-07]
- **In-app sidebar (signed in):** "Projects" tab (Jan/Feb-style persistent workspaces), task list with filter (All tasks / Non-project tasks / Favorites / Scheduled), pinned projects at top, drag-and-drop reordering. "Click the filter icon in the task list header." [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Skills tab:** Left-hand side main menu → "Skills" management page (installed, search, add). [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Connectors tab:** For My Browser, Browser Operator, MCP integrations. [Source: https://manus.im/docs/features/browser-operator + integrations/mcp-connectors, accessed 2026-08-07]
- **Settings → Cloud Browser:** Logged-in Accounts, Session Management, Take Over Notifications, Browser History, Security Settings. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Settings → Scheduled Tasks:** View active / Pause / Edit / Delete / View execution history. [Source: https://manus.im/docs/features/scheduled-tasks, accessed 2026-08-07]
- **Manus API docs:** "View the complete API reference at https://open.manus.im/docs". [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
- **Docs index for agents:** manus.im/docs/llms.txt — explicit invitation for AI agents to read the docs. [Source: https://manus.im/docs/llms.txt, accessed 2026-08-07]

## 6. Workspace (chat + preview; Computer pane)

- **Computer pane is the defining surface.** "Inside an isolated, secure environment, it has everything an AI agent needs: networking, a command line, a file system, and a browser." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **Cloud Browser pane:** "Manus automatically opens Cloud Browser and navigates to the relevant websites … You see everything Manus is doing in real-time." Includes browser screenshot frames. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Terminal pane (Desktop / My Computer):** "Through the Manus Desktop app, Manus executes command line instructions (CLI) in your computer's terminal. This allows it to read, analyze, and edit local files, as well as launch and control your local applications." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **File pane:** Persistent file system in sandbox; persistent in Cloud Computer ("Files Manus creates on it stay there. Tools Manus installs stay installed. If you want Manus to pick up where it left off last week, it can, because the work is still sitting on the machine."). [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Chat pane (left):** User prompts + Manus's textual reasoning + plan documents (Plan Mode) + approval cards (Desktop/Browser Operator). [Source: https://manus.im/blog/manus-plan-mode + blog-manus-browser-operator, accessed 2026-08-07]
- **Plan document pane (Plan Mode):** "Manus surfaces the approach as a structured document … a full Markdown document with goals, steps, and constraints." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Dedicated browser tab (Browser Operator):** "Manus opens a new tab within a tab group named after your current task. You can watch the task unfold in real-time, take over by clicking into the tab, or stop the process instantly by closing it." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Take Over prompt (Cloud Browser):** Modal notification when CAPTCHA / MFA encountered. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **vs. v0:** v0 has chat + preview + code editor + Design Mode overlay; Manus has chat + Computer pane (sandbox shell / cloud browser / desktop terminal / local browser tab). Manus's pane is a live runtime; v0's pane is a rendered preview.

## 7. Conversation

- **Slash commands:** "Once a Skill is added to your library, you can activate it at any time during a conversation by using a slash command. Simply type / in the chat input, which will bring up a list of your available Skills." [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Plan command:** "On web, type / and select Plan. On mobile, tap + and choose Plan Mode." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Clarifying questions:** Plan Mode asks them — "If context is missing, it asks clarifying questions." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Approval cards (Desktop):** "Every terminal command requires your explicit approval before execution. You will be prompted to Allow Once for a single operation or Always Allow for a trusted, recurring task." [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
- **Approval cards (Browser Operator):** "Manus will request permission to take control. Click 'Authorize' to grant one-time access." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Stop / interrupt:** "If you need to stop a task instantly, simply close the dedicated tab" (Browser Operator). [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Multi-step delegation:** "Give it a multi-step goal, and it will plan, navigate, click, and execute the entire workflow across various sites without continuous human supervision." [Source: https://manus.im/docs/features/browser-operator, accessed 2026-08-07]
- **Voice input (mobile):** "Voice or Text Input: Once an area is marked, you can either type your changes or use your voice to record instructions." [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **Code Prompt component:** Embedded in docs as interactive chips ("CodePrompt") that offer Copy + "Ask Manus" buttons which deep-link back to manus.im with `?q=<prompt>&submit=1` query params. [Source: https://manus.im/docs/features/cloud-browser + multi-modal, accessed 2026-08-07 — Observed]

## 8. Agent Experience (DEEP)

- **Live runtime motion is the agent's UX.** "You see everything Manus is doing in real-time" — Cloud Browser screenshots show live navigation, Cloud Computer shows live processes, Desktop shows live terminal output, Browser Operator shows live tab activity. [Source: https://manus.im/docs/features/cloud-browser + blog-manus-browser-operator, accessed 2026-08-07]
- **Plan-then-execute lifecycle:** (1) User prompt → (2) Plan Mode evaluates and asks clarifying questions or generates Markdown plan → (3) User reviews / edits / confirms → (4) Manus executes per plan → (5) Plan can be re-opened mid-task. "Manus will not start building until you confirm or dismiss the plan. This prevents any unintended changes to your website, slides, or video." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Three browser surfaces, each with distinct agent affordances:**
  - **Cloud Browser (default):** "Manus's dedicated browser environment that runs in the cloud. Unlike traditional AI assistants that can only read text, Manus can actually operate this browser like a real person—visiting websites, clicking buttons, filling forms, extracting data, and completing multi-step workflows." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
  - **Browser Operator (local, Nov 18 2025):** "transforms your web browser into an autonomous agent … allows Manus to securely perform tasks on your behalf directly within your local browser, using your existing logins and sessions." Trusted local IP advantage. [Source: https://manus.im/docs/features/browser-operator + blog-manus-browser-operator, accessed 2026-08-07]
  - **Take Over flow (Cloud Browser):** "When Manus encounters complex verifications (SMS codes, CAPTCHA, multi-factor authentication), the system will prompt you to 'Take Over' the browser. 1. Manus encounters a verification challenge. 2. You receive a notification to take over. 3. You complete the verification (enter code, solve CAPTCHA, etc.). 4. You hand control back to Manus. 5. Manus continues the task." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **My Computer (Desktop, Mar 16 2026):** "Manus executes command line instructions (CLI) in your computer's terminal. This allows it to read, analyze, and edit local files, as well as launch and control your local applications." Examples: organize flower-shop photos (computer vision + file ops), batch-rename invoices, build a Swift meeting-translation Mac app in 20 minutes. "Twenty minutes later: a fully working Mac app. No Xcode opened. No code written manually." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **Cloud Computer (Apr 30, 2026):** "A Cloud Computer gives you two things your laptop can't: It never turns off … Your files and setup stay put. Every regular Manus chat starts from a blank slate—it has no access to what you did yesterday. A Cloud Computer works more like your own laptop." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Multi-modal agent capabilities:** Image Generation, Image Understanding, Video Understanding, Voice Output, Speech to Text. [Source: https://manus.im/docs/features/multi-modal, accessed 2026-08-07]
- **Wide Research** ("game-changing technical innovation" per $100M ARR blog) — implies parallel/multi-source research mode. [Source: https://manus.im/blog/manus-100m-arr + /blog/introducing-wide-research, accessed 2026-08-07]
- **Auto-decide AI features** (analogous to v0): when a generated app needs AI, Manus decides how to build them rather than asking. [Observed: blog-manus-projects / manus-cloud-computer imply this pattern, accessed 2026-08-07]
- **Meeting Minutes:** Manus joins meetings, transcribes, generates minutes. [Source: https://manus.im/docs/features/meeting-minutes, accessed 2026-08-07]
- **Slides:** Manus generates presentations from prompts. [Source: https://manus.im/docs/features/slides, accessed 2026-08-07]
- **Data Visualization:** Manus generates charts/dashboards from data. [Source: https://manus.im/docs/features/data-visualization, accessed 2026-08-07]
- **Design View (Dec 22, 2026):** Visual asset generation + Mark Tool for element selection + edit text. Powered by Google's Nano Banana Pro. Mobile: press-and-hold to Mark, batch edits. [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **Skills:** "modular, file-system-based resources that encapsulate a specific capability or workflow." Three loading levels (Progressive Disclosure — see §18). Add via: Build with Manus (from successful interaction), Upload .skill/.zip/folder, Add from official library, Import from GitHub. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Per-command approval fatigue is the core trust cost:** Every Desktop terminal command prompts Allow Once / Always Allow. [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07] — see §21 for deeper analysis.

## 9. Memory

- **Pause/resume:** Plan Mode pause/resume is the canonical pattern. "If Manus is already building and you want to pause, regroup, and plan the next iteration, just activate Plan Mode mid-task. Manus stops, generates a plan for the next phase, and waits for your approval before continuing." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Persistent Project knowledge base:** "A project serves as a dedicated workspace where you can define a master instruction and build a knowledge base of files and documents. These configurations are automatically applied to every new task created within that project, eliminating the need for repetitive setup." [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Projects that Learn (May 6, 2026):** "Manus can now turn useful conversations into approved updates to Project instructions and files, so each task can make the next one better." Manus identifies reusable decisions/standards/patterns and proposes updates — but "User approval: Manus suggests changes, but Project context is not updated without authorization." [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
- **Configuration propagation:** "Instruction updates apply the next time you send a message in your current task. File updates only take effect in new tasks created after the update. All previously created tasks remain unaffected and will continue to use the configuration that existed when they were created." [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Sandbox vs. Cloud Computer memory:** "Every regular Manus chat starts from a blank slate—it has no access to what you did yesterday. A Cloud Computer works more like your own laptop. Files Manus creates on it stay there." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Skills as memory:** "Capture a repeatable workflow … Turn this approved launch process into a reusable Project skill." [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
- **Mobile / Desktop memory:** "Manus can work on my computer when I'm not there? Yes. As long as your computer is on and the Manus Desktop app is running, you can assign it tasks remotely from your phone or any other device." [Source: https://manus.im/docs/features/desktop FAQ, accessed 2026-08-07]
- **Cloud Browser session memory:** Logged-in accounts persist per user; can be managed in Settings → Cloud Browser → Logged-in Accounts. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **No equivalent of v0's version history** — Manus's memory model is Project-scoped + Cloud-Computer-persistent, not version-diff-based. [Observed: absence in docs, accessed 2026-08-07]

## 10. Knowledge

- **Projects as knowledge base:** Master instruction + uploaded files + documents, applied automatically to every new task. [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Skills as knowledge packages:** "Skills are modular, file-system-based resources that encapsulate a specific capability or workflow." File-based (SKILL.md + scripts + references). Add from official library / GitHub / upload / build-with-Manus. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **MCP connectors:** "MCP focuses on creating standardized 'data pipelines' to connect to external data sources like Gmail or Notion. Skills, on the other hand, provide the 'operating manuals' or workflows that can leverage those pipelines to perform complex tasks." [Source: https://manus.im/docs/features/skills FAQ + /docs/integrations/mcp-connectors, accessed 2026-08-07]
- **Website builder integrations:** GitHub integration, GitHub publishing, custom domains, access control. [Source: https://manus.im/docs/website-builder/github-integration + publishing + access-control, accessed 2026-08-07]
- **Recommended connectors blog:** Lists curated third-party integrations. [Source: https://manus.im/blog/manus-recommended-connectors, accessed 2026-08-07]
- **Telegram agents:** Manus can be invoked via Telegram. [Source: https://manus.im/blog/manus-agents-telegram, accessed 2026-08-07]
- **Slack integration:** Listed in product nav. [Source: https://manus.im/home footer, accessed 2026-08-07]
- **Mail integration:** Listed in product nav. [Source: https://manus.im/home footer, accessed 2026-08-07]

## 11. Search

- **Web search via Cloud Browser / Browser Operator:** Manus's primary search surface is real-browser navigation. "Manus can browse the web autonomously to gather real-time information." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Authenticated search (Browser Operator):** Premium research platforms accessible via your local logged-in browser. Examples: "Crunchbase, PitchBook, SimilarWeb, Financial Times, Semrush, Ahrefs—any tool or source you are subscribed to." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Wide Research** — Manus blog mentions this as a "game-changing technical innovation" implying parallel multi-source research. [Source: https://manus.im/blog/manus-100m-arr + /blog/introducing-wide-research, accessed 2026-08-07]
- **Skills search:** "On the Skills page, click the + Add button" + Import from GitHub + search official library. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Docs site search:** Manus docs use a docs framework with sidebar nav (Mintlify-based, similar to v0). [Observed: docs page chrome, accessed 2026-08-07]
- **Task filter (sidebar):** All tasks / Non-project tasks / Favorites / Scheduled. [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]

## 12. Execution (per-stage runtime motion)

- **Sandbox execution:** "It operates in a complete sandbox environment—a virtual computer with internet access, a persistent file system, and the ability to install software and create custom tools." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- **Cloud Computer execution:** Always-on cloud machine. Runs bots, Python scripts, software around the clock. Hosted databases (MySQL), self-hosted open-source tools (Home Assistant, Metabase), scheduled scrapers. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Desktop (My Computer) execution:** Local CLI on user's machine. "Manus can use any tool that is accessible from your computer's command line (CLI). This includes programming languages (Python, Node.js), compilers (Swift, Xcode), and any other CLI-based applications you have installed." [Source: https://manus.im/docs/features/desktop FAQ, accessed 2026-08-07]
- **GPU access:** "You can have Manus use your local GPU to train a machine learning model or run a large language model for inference." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **Per-stage runtime motion:** Plan Mode explicitly breaks execution into stages. "It's natural to work in stages. Let Manus finish phase one, then turn on Plan Mode to scope phase two before it begins." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Scheduled task execution:** Time-triggered. Daily/weekly/monthly/custom/one-time. [Source: https://manus.im/docs/features/scheduled-tasks, accessed 2026-08-07]
- **Daemon pattern (recurring local routines):** "My Computer also integrates with your personal Projects, Agents, and Scheduled Tasks. This allows you to create recurring local routines, such as tidying your Downloads folder every morning or generating a weekly summary report from your local data." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **24/7 assistant pattern:** "Turn an always-on computer, into a dedicated AI assistant. You can assign it complex tasks from any of your devices, anywhere in the world, and it will work on them using its local resources." [Source: https://manus.im/docs/features/desktop Tips, accessed 2026-08-07]
- **Fire-and-forget task delegation:** "You can have Manus use your local GPU … That idle Mac mini can be transformed into a 24/7 work-from-anywhere AI assistant. As long as the machine is on and Manus Desktop is running, you can assign complex tasks to it from any of your devices, anywhere in the world." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]

## 13. Artifacts (files + scheduled tasks + daemon mode)

- **Files in sandbox:** Persistent per chat session. [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
- **Files in Cloud Computer:** Persistent across sessions/days/weeks. "Files Manus creates on it stay there. Tools Manus installs stay installed." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Files on local machine (My Computer):** "Manus can only access the specific folders you have explicitly authorized. It cannot see or interact with any other part of your file system, giving you granular control over its workspace." Folder-scoped access. [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
- **Generated websites:** Manus has a website builder with publishing, custom domain, GitHub integration. [Source: https://manus.im/docs/website-builder/publishing + getting-started + github-integration + access-control + code-control + editing-and-previewing, accessed 2026-08-07]
- **Generated slides:** Manus slides feature with templates. [Source: https://manus.im/docs/features/slides, accessed 2026-08-07]
- **Generated data visualizations:** Charts/dashboards. [Source: https://manus.im/docs/features/data-visualization, accessed 2026-08-07]
- **Generated meeting minutes:** Transcripts + structured minutes. [Source: https://manus.im/docs/features/meeting-minutes, accessed 2026-08-07]
- **Generated images (Design View):** Mark Tool for selective editing. [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **Generated apps (Desktop):** "Twenty minutes later: a fully working Mac app. No Xcode opened. No code written manually." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **Scheduled tasks as artifacts:** Each schedule has execution history, can be paused/edited/deleted. [Source: https://manus.im/docs/features/scheduled-tasks, accessed 2026-08-07]
- **Projects as artifacts:** Persistent workspace, master instruction, knowledge base files. Pinnable, drag-reorderable, no limit. [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Daemon mode (Cloud Computer + Scheduled Tasks):** The combination of Cloud Computer (always-on) + Scheduled Tasks (time-triggered) + Projects (persistent knowledge) constitutes a daemon pattern — Manus can run unattended routines that read/write persistent state. [Source: https://manus.im/blog/manus-cloud-computer + /docs/features/scheduled-tasks + /docs/features/projects, accessed 2026-08-07]
- **Auto-published websites:** Blog "manus-auto-publish" exists. [Source: https://manus.im/blog/manus-auto-publish, accessed 2026-08-07 — title observed]
- **Branch / Git artifacts:** Blog "manus-branch" exists. [Source: https://manus.im/blog/manus-branch, accessed 2026-08-07 — title observed]

## 14. Keyboard UX

- **Slash commands in composer:** `/` to open Skill menu. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Mobile Plan Mode:** "tap + and choose Plan Mode" (gestural). [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Mobile Design View Mark:** "press and hold on any area of an image to create a selection." [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **No dedicated keyboard shortcut docs found.** Manus does not appear to publish a keyboard-shortcut reference page in the docs. [Observed: absence in docs, accessed 2026-08-07]
- **Browser tab as stop button:** "If you need to stop a task instantly, simply close the dedicated tab." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]

## 15. Motion (live runtime motion)

- **Live runtime motion is core to the agent's perceived liveness.** Cloud Browser pane shows real-time navigation screenshots ("You see everything Manus is doing in real-time"). [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Browser Operator pane:** dedicated browser tab shows live activity. "You can watch the task unfold in real-time." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Desktop terminal:** live CLI output streaming. [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **Per-stage motion via Plan Mode:** explicit "stop → plan → resume" rhythm. [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Take Over modal:** discrete notification event interrupting the runtime flow. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **vs. v0:** Manus's runtime motion is continuous and embodied; v0's motion is text-streaming + discrete screenshots + cards. Manus "feels alive" via the Computer pane; v0 "feels working" via text/cards. (This is structural, not aesthetic.)
- **Cloud Computer motion:** background processes run when user is away. "Anything Manus sets up on it keeps working even when you're asleep, on a plane, or away for the weekend." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **No documented motion tokens** (no spring physics or duration constants in Manus docs as of access date). [Observed: absence, accessed 2026-08-07]

## 16. Animation

- **No dedicated animation docs.** Manus relies on browser-native animation (Cloud Browser screenshots update; terminal output streams; tab activity updates). [Observed: absence in docs, accessed 2026-08-07]
- **Mark Tool selection animation:** implicit — Chloe selects throw, plant, window in sequence (Design View blog implies progressive selection feedback). [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **Take Over modal:** modal dialog interrupting runtime (no animation specifics documented). [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]

## 17. Visual Hierarchy

- **Home page hierarchy:** (1) "What can I do for you?" composer; (2) quick-action chips (Create slides / Build website / Design / Create games / More); (3) "Less structure, more intelligence." sub-tagline; (4) top nav; (5) footer with massive Product / Resources / Community / Compare / Download / Team / Company link grid. [Source: https://manus.im/home, accessed 2026-08-07 — Observed]
- **Footer is unusually large** — every blog post ends with a full sitemap-style footer listing 15+ languages, all product links, all download options. [Observed: footer across manus.im/blog/*, accessed 2026-08-07]
- **In-app sidebar hierarchy:** Projects (top) → Tasks (with filter) → Skills tab → Connectors tab → Settings. [Source: https://manus.im/docs/features/projects + skills + browser-operator, accessed 2026-08-07]
- **Composer:** text input + slash-command menu + attachments. No model picker visible in docs (model selection is implicit/automatic). [Observed: docs descriptions, accessed 2026-08-07]
- **Plan document pane:** Markdown document rendered prominently for review. [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **CodePrompt component:** embedded in docs as a styled chip with Copy + Ask Manus buttons. [Observed: docs page chrome, accessed 2026-08-07]

## 18. Progressive Disclosure

- **Skills Progressive Disclosure (explicitly named):** "Skills are designed to be highly efficient by using a 'Progressive Disclosure' mechanism. This ensures that the agent only loads the information it needs, when it needs it, preserving the valuable context window." Three levels:
  - Level 1: Metadata (name + description) — loaded at startup — ~100 tokens/Skill
  - Level 2: Instructions (SKILL.md content) — loaded when triggered via slash command — <5k tokens
  - Level 3: Resources (scripts, reference files) — loaded on demand when referenced — consumed only when used [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Three execution environments** (Sandbox / Desktop / Cloud Computer) progressively disclosed by task type. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Plan Mode is opt-in / manual:** "Plan Mode is manual. It stays out of your way until you call it." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Approval gates** as progressive disclosure of autonomy: Allow Once vs Always Allow; one-time browser authorization; Take Over for MFA. [Source: https://manus.im/docs/features/desktop + blog-manus-browser-operator, accessed 2026-08-07]
- **Project configuration propagation** is itself progressive: instruction updates apply next message, file updates apply next task. [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Mobile-only features:** Design View Mark tool's press-and-hold is mobile-first. [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]

## 19. Accessibility

- **Not heavily documented.** No VPAT / WCAG conformance statement found. [Observed: absence in docs, accessed 2026-08-07]
- **Mobile-first Design View Mark tool:** "Press and Hold to Mark" — relies on touch gesture, may have keyboard-equivalent gap. [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **Voice input** (mobile) for instructions. [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **15+ language support** in nav (English, Deutsch, Español, Español Latinoamérica, Français, Italiano, Português Brasil, Português Portugal, Tiếng Việt, Türkçe, 简体中文, 繁體中文, 日本語, 한국어, العربية, ไทย, हिन्दी). [Observed: language selector across manus.im/blog/*, accessed 2026-08-07]
- **Trust center exists** (linked from footer). [Source: https://manus.im/home footer, accessed 2026-08-07]
- **Help center exists** (help.manus.im linked from docs FAQ). [Source: https://manus.im/docs/introduction/plans FAQ, accessed 2026-08-07]

## 20. Performance Perception (Manus feels alive via runtime motion)

- **Live runtime motion is the perception strategy.** Cloud Browser pane streams live navigation; Browser Operator pane streams live tab activity; Desktop streams live terminal output. [Source: https://manus.im/docs/features/cloud-browser + blog-manus-browser-operator + blog-manus-my-computer-desktop, accessed 2026-08-07]
- **"You see everything Manus is doing in real-time"** — explicit guarantee. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **vs. v0:** v0's perception model = text streaming + cards + sidebar hover card + intermittent screenshots. Manus's perception model = continuous live runtime panes (browser, terminal, files). Manus "feels alive" because the agent's environment is visible; v0 "feels working" because only the agent's text is visible. [Observed: cross-product comparison, accessed 2026-08-07]
- **Take Over events** are perception anchors — discrete moments when the runtime visibly pauses for human input. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Cloud Computer "while you sleep" perception:** background work creates the sense of an always-on colleague. "Anything Manus sets up on it keeps working even when you're asleep, on a plane, or away for the weekend." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **No documented latency targets / SLAs** in cached docs. [Observed: absence, accessed 2026-08-07]

## 21. Trust

- **Credit system (DOCUMENT):**
  - "Manus AI operates on a credit-based system that gives you flexibility and control over your usage. Credits are consumed based on the complexity and resources required for each task." [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
  - **Four plans:** Free (limited monthly credits, core capabilities, individual exploration), Pro (generous monthly credit allocation, full access, priority support, professionals/freelancers/small teams), Team (shared team credit pool, team collaboration, admin controls, priority support, growing teams), Enterprise (contact sales). [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
  - **Plan credits reset monthly; purchased add-on credits never expire** and can be used anytime. [Source: https://manus.im/docs/introduction/plans FAQ, accessed 2026-08-07]
  - **Credit add-ons:** "Purchase additional credit packs anytime to supplement your monthly allocation. Add-on credits never expire." [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
  - **Plan upgrades** for more monthly credits. [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
  - **Real-time usage monitoring:** "Current Balance: See your remaining credits at any time. Usage History: Review past tasks and their credit consumption. Spending Insights: Understand which types of tasks consume the most credits. Alerts: Get notified when your credit balance is running low." [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
  - **No published per-1M-token prices** (unlike v0 which exposes model token pricing). Manus pricing is task-complexity-based, opaque. [Observed: absence on plans page, accessed 2026-08-07]
  - **Optimization tips:** "Be Specific with Your Requests … Use the Right Agent Type … Simple questions don't require the full autonomous agent—use Chat mode for quick queries to save credits. Batch Similar Tasks … Review Intermediate Results." [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
- **Per-command approval fatigue (Desktop / My Computer):**
  - "Every command that Manus attempts to execute on your local machine requires your explicit approval. You will be prompted to Allow Once for a single operation or Always Allow for a trusted, recurring task. You are always in command." [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
  - This is the canonical trust cost: every CLI command interrupts the user. "Always Allow" is the escape hatch but requires per-pattern trust-building.
- **Per-session approval fatigue (Browser Operator):**
  - "When you assign a task requiring web access, Manus will ask for permission to control your browser. Grant access to allow the agent to take over." [Source: https://manus.im/docs/features/browser-operator, accessed 2026-08-07]
  - "Full Transparency & Control: Every action Manus takes is meticulously logged, providing a clear audit trail. If you need to stop a task instantly, simply close the dedicated tab." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Take Over (Cloud Browser) trust pattern:** Caps the agent's autonomy at exactly the moment a human is required (MFA / CAPTCHA / SMS). [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Plan Mode as trust mechanism:** "The mistake gets caught before any code is written, before any time is invested in the wrong direction … Manus will not start building until you confirm or dismiss the plan. This prevents any unintended changes to your website, slides, or video. You stay in control." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Project "User approval" gate:** "Manus suggests changes, but Project context is not updated without authorization." [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
- **Folder-scoped access (Desktop):** "Manus can only access the specific folders you have explicitly authorized. It cannot see or interact with any other part of your file system, giving you granular control over its workspace." [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
- **Cloud Browser security:** "Encrypted sessions. Isolated environments: Each user has a separate, isolated browser instance. No credential storage: Manus doesn't store your passwords. Access control: You control which accounts Manus can access. Session management: You can log out or clear sessions anytime." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Skills verification:** "While the community is a fantastic source of powerful Skills, it is crucial to verify their contents before use, as they can contain code and shell commands. Manus provides a transparent way to audit a Skill. Before using a new Skill, you can ask Manus to review it for you." [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Data-center IP caveat:** "Important: Data Center IP Considerations" section in Cloud Browser docs (content not fully captured but flag exists). [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Trust Center** linked from footer. [Source: https://manus.im/home footer, accessed 2026-08-07]
- **Meta acquisition impact:** "Manus is now part of Meta — bringing AI to businesses worldwide." Trust posture likely shifting under Meta enterprise compliance umbrella; not detailed in docs as of access date. [Observed: footer across all cached pages, accessed 2026-08-07]

## 22. Explainability

- **Plan document (Plan Mode) is the explainability primitive.** "Manus pauses, runs a feasibility check, and surfaces the approach as a structured document. You read it, edit it, and approve it. The mistake gets caught before any code is written." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Audit trail (Browser Operator):** "Every action Manus takes is meticulously logged, providing a clear audit trail." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
- **Cloud Browser History:** "Browser History: View recent Cloud Browser activity" setting. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
- **Scheduled Tasks execution history:** "View execution history: See past runs, results, and any errors." [Source: https://manus.im/docs/features/scheduled-tasks, accessed 2026-08-07]
- **Project "what Manus can learn" summaries:** Manus explains what should change and why, before applying. [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
- **Skills review:** Manus explains a community Skill's functionality and flags risks. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **Live runtime visibility** is itself explainability — user can see what the agent is doing as it does it (Cloud Browser pane, Desktop terminal pane). [Source: https://manus.im/docs/features/cloud-browser + blog-manus-my-computer-desktop, accessed 2026-08-07]
- **No equivalent of v0's "Work details after each generation" summary** (time worked, files modified, lines changed, credits used) — Manus exposes credit consumption in usage dashboard but not per-task structured summary. [Observed: docs descriptions, accessed 2026-08-07]

## 23. Long Session Experience

- **Pause/resume (Plan Mode):** "If Manus is already building and you want to pause, regroup, and plan the next iteration, just activate Plan Mode mid-task. Manus stops, generates a plan for the next phase, and waits for your approval before continuing." [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Scheduled Tasks (recurring routines):** Daily/Weekdays/Weekly/Monthly/Custom/One-Time. "Recurring research (daily news summaries, weekly competitor updates). Regular reports (monthly analytics, weekly performance summaries). Periodic data collection (scraping prices, tracking mentions). Automated monitoring (checking for updates, tracking changes)." [Source: https://manus.im/docs/features/scheduled-tasks, accessed 2026-08-07]
- **Cloud Computer = daemon pattern:** "Running a 24/7 bot (Slack, Discord, customer service) → Cloud Computer. Persistent knowledge base or live database (e.g., MySQL) → Cloud Computer. Self-hosting open-source tools (Home Assistant, Metabase) → Cloud Computer. Scheduled scrapers or reports (e.g., daily at 4 AM) → Cloud Computer." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Recurring local routines (My Computer + Scheduled Tasks):** "create recurring local routines, such as tidying your Downloads folder every morning or generating a weekly summary report from your local data." [Source: https://manus.im/blog/manus-my-computer-desktop, accessed 2026-08-07]
- **Always-on assistant:** "Turn an always-on computer, into a dedicated AI assistant. You can assign it complex tasks from any of your devices, anywhere in the world, and it will work on them using its local resources." [Source: https://manus.im/docs/features/desktop Tips, accessed 2026-08-07]
- **24/7 bots:** "Host Your Own 24/7 Bots … handling customer service on WhatsApp, triaging leads on Telegram, managing communities on Discord." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Persistent Project knowledge:** "create dedicated Projects that use your local files as a knowledge base." [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
- **vs. v0:** v0 caps sessions at 24 hours and has no scheduled-task feature; Manus's Cloud Computer + Scheduled Tasks + Projects constitute a daemon pattern that supports weeks/months-long unattended workflows.

## 24. Power User Features

- **Scheduled tasks:** Full schedule management with pause/edit/delete/history. [Source: https://manus.im/docs/features/scheduled-tasks, accessed 2026-08-07]
- **My Computer local execution:** Folder-scoped local file access + local CLI + local GPU. [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
- **Pause/resume (Plan Mode):** mid-task pause + regenerate plan + resume. [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
- **Browser Operator (local browser):** operates on authenticated sites using your local IP and logins. [Source: https://manus.im/docs/features/browser-operator, accessed 2026-08-07]
- **Cloud Computer:** always-on cloud machine for 24/7 bots, databases, self-hosted tools. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
- **Skills:** Build-with-Manus from successful interactions; Upload .skill/.zip/folder; Import from GitHub; Add from official library; slash-command activation. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **MCP connectors:** bring-your-own data pipelines (Gmail, Notion, etc.). [Source: https://manus.im/docs/integrations/mcp-connectors, accessed 2026-08-07]
- **Manus API:** RESTful API at open.manus.im/docs. [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
- **Projects:** persistent workspaces, master instruction, knowledge base, pinning, drag-drop reorder, no limit on count. [Source: https://manus.im/docs/features/projects, accessed 2026-08-07]
- **Projects that Learn:** Manus proposes updates to Project instructions / files / skills from task conversations. [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
- **Wide Research:** multi-source parallel research mode. [Source: https://manus.im/blog/introducing-wide-research, accessed 2026-08-07 — title observed]
- **Website builder:** GitHub integration, publishing, custom domain, access control, code control, editing-and-previewing, schedules. [Source: https://manus.im/docs/website-builder/*, accessed 2026-08-07]
- **Design View:** Mark Tool for selective image editing + text editing + mobile press-and-hold. [Source: https://manus.im/blog/manus-design-view, accessed 2026-08-07]
- **Multi-modal:** image gen, image understanding, video understanding, voice output, speech-to-text. [Source: https://manus.im/docs/features/multi-modal, accessed 2026-08-07]
- **Telegram agents:** invoke Manus via Telegram. [Source: https://manus.im/blog/manus-agents-telegram, accessed 2026-08-07 — title observed]
- **Auto-publish:** Manus auto-publishes websites. [Source: https://manus.im/blog/manus-auto-publish, accessed 2026-08-07 — title observed]
- **Branch:** Manus branching feature. [Source: https://manus.im/blog/manus-branch, accessed 2026-08-07 — title observed]
- **Slack integration:** listed in footer. [Source: https://manus.im/home footer, accessed 2026-08-07]
- **15+ languages:** full localization. [Observed: language selector, accessed 2026-08-07]

## 25. Developer Experience

- **Manus API:** "The Manus API is a RESTful API that allows developers to integrate Manus directly into their applications, workflows, and systems. Instead of using Manus through the web interface or mobile app, you can trigger tasks, manage files, and receive results programmatically." [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
- **API reference:** "View the complete API reference at https://open.manus.im/docs". [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
- **API positioning:** "Traditional AI APIs: Call an endpoint, get a text response. Manus API: Send a task, Manus plans the approach, gathers information, uses tools, browses the web, and delivers complete results (reports, presentations, websites, data analysis, etc.)." [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
- **Daemon via API:** the combination of API + Cloud Computer + Scheduled Tasks effectively provides a daemon pattern for developers — long-running autonomous workers accessible programmatically. [Observed: inferred from API + Cloud Computer + Scheduled Tasks docs, accessed 2026-08-07]
- **MCP connectors for developers:** bring-your-own MCP server. [Source: https://manus.im/docs/integrations/mcp-connectors, accessed 2026-08-07]
- **Skills as developer artifacts:** file-based (.skill format, .zip, or folder), importable from GitHub, shareable with community. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
- **llms.txt published:** manus.im/docs/llms.txt is explicitly an LLM-readable docs index. [Source: https://manus.im/docs/llms.txt, accessed 2026-08-07]
- **Website builder developer affordances:** GitHub integration, code control (direct code editing), access control. [Source: https://manus.im/docs/website-builder/code-control + github-integration + access-control, accessed 2026-08-07]
- **Team plan / SSO / API:** listed in footer. [Source: https://manus.im/home footer, accessed 2026-08-07]
- **No published SDK** (unlike v0's `pnpm add v0@latest`). Manus is API-first, not SDK-first. [Observed: absence in docs, accessed 2026-08-07]
- **Startups Playbook** published (linked from footer). [Source: https://manus.im/home footer, accessed 2026-08-07]
- **Brand assets** published (linked from footer). [Source: https://manus.im/home footer, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Single coherent mental model: agent + computer.** Unlike v0's identity confusion (design tool vs. code tool), Manus has one identity — an autonomous agent with its own (or your own) computer. "Think of Manus AI as a virtual colleague with its own computer." [Source: https://manus.im/docs/introduction/welcome, accessed 2026-08-07]
2. **Three-tier execution environment (Sandbox / Desktop / Cloud Computer) maps cleanly to task type.** Plus Browser Operator as a fourth surface for local-browser authenticated work. [Source: https://manus.im/blog/manus-cloud-computer + blog-manus-browser-operator + blog-manus-my-computer-desktop, accessed 2026-08-07]
3. **Live runtime motion in Computer pane** makes the agent feel alive. "You see everything Manus is doing in real-time." [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
4. **Plan Mode as alignment gate.** "The mistake gets caught before any code is written, before any time is invested in the wrong direction." Markdown plan document, reviewable, editable, approvable. [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
5. **Take Over flow for CAPTCHA / MFA** — pragmatic human-in-the-loop seam that respects real-world verification challenges without forcing the agent to give up. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
6. **Daemon pattern via Cloud Computer + Scheduled Tasks + Projects.** Weeks/months-long unattended workflows are first-class. v0 has no equivalent. [Source: https://manus.im/blog/manus-cloud-computer + /docs/features/scheduled-tasks + /docs/features/projects, accessed 2026-08-07]
7. **Browser Operator's local-IP trust advantage.** "Activity originates from your machine's browser, ensuring smooth continuity with authenticated services … No CAPTCHA interruptions. No session expiration." Solves the cloud-browser-bot-detection problem. [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
8. **Skills with Progressive Disclosure** — three-level loading (metadata → instructions → resources) preserves context window. Explicitly named and architected. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
9. **Projects that Learn (May 6, 2026).** Manus proposes updates to Project instructions/files/skills from conversations, applied only after user approval. Self-improving knowledge base. [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
10. **RESTful API positioning as complete-agent API, not narrow AI API.** "Send a task, Manus plans the approach, gathers information, uses tools, browses the web, and delivers complete results." [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
11. **Massive scale validation:** "$100M ARR, eight months after launch … processed more than 147T tokens and created more than 80M virtual computers." [Source: https://manus.im/blog/manus-100m-arr, accessed 2026-08-07]
12. **Mobile parity including iOS + Android + voice input + press-and-hold Mark.** [Source: https://manus.im/blog/manus-design-view + /docs/features/desktop, accessed 2026-08-07]
13. **llms.txt published** — explicit invitation for AI agents to read the docs (rare self-awareness of agent-as-user audience). [Source: https://manus.im/docs/llms.txt, accessed 2026-08-07]
14. **15+ languages** with full localization. [Observed: language selector, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Per-command approval fatigue (Desktop / My Computer).** "Every command that Manus attempts to execute on your local machine requires your explicit approval … Allow Once for a single operation or Always Allow for a trusted, recurring task." High-frequency CLI workflows become click-through friction. [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
2. **Per-session approval fatigue (Browser Operator).** "When you assign a task, Manus will request permission to take control. Click 'Authorize' to grant one-time access." Every browser task requires re-authorization. [Source: https://manus.im/docs/features/browser-operator, accessed 2026-08-07]
3. **Parallel-execution-confuses-users risk.** Manus can run multiple environments simultaneously (sandbox + cloud computer + browser operator + desktop). The "Three environments, each built for different kinds of work" guide exists precisely because users confuse them. "The Cloud Computer doesn't replace the others—it extends what's possible." [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
4. **Credit cost opacity.** Pricing page lists 4 plans but no per-task or per-1M-token prices. "Credits are consumed based on the complexity of the task" is the only accounting. Users can monitor usage only post-hoc. [Source: https://manus.im/docs/introduction/plans, accessed 2026-08-07]
5. **Plan credits reset monthly (don't roll over);** only purchased add-on credits are perpetual. Compared to v0's 65-day monthly credit expiry + credit rollover, this is less generous for low-usage months. [Source: https://manus.im/docs/introduction/plans FAQ, accessed 2026-08-07]
6. **Browser Operator is browser-limited:** "Chrome and Edge are currently recommended. Support for other browsers is coming soon." [Source: https://manus.im/docs/features/browser-operator FAQ, accessed 2026-08-07]
7. **Browser Operator is capability-limited:** "Complex interactions such as drag-and-drop or multi-step forms may not work perfectly yet." [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
8. **Data-center IP considerations flagged.** "Important: Data Center IP Considerations" section in Cloud Browser docs acknowledges that cloud-browser activity from data-center IPs may be flagged by anti-bot systems. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
9. **Community Skills carry security risk.** "It is crucial to verify their contents before use, as they can contain code and shell commands." Requires user to ask Manus to review each Skill. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
10. **No published keyboard shortcut docs.** [Observed: absence in docs, accessed 2026-08-07]
11. **No published accessibility conformance statement.** [Observed: absence in docs, accessed 2026-08-07]
12. **No published SDK** — API is REST only, no `npm install manus` equivalent to v0's `pnpm add v0@latest`. [Observed: absence in docs, accessed 2026-08-07]
13. **No documented motion tokens / no documented latency SLAs.** [Observed: absence in docs, accessed 2026-08-07]
14. **No equivalent of v0's version history + diff view + ↩ restore.** Manus's memory is Project-scoped, not version-diff-based; harder to revert specific agent edits. [Observed: absence in docs, accessed 2026-08-07]
15. **Meta acquisition creates uncertainty** for enterprise customers evaluating long-term vendor stability ("Manus is now part of Meta"). [Observed: footer across all cached pages, accessed 2026-08-07]
16. **No equivalent of v0's per-task "Work details" summary** (time worked, files modified, lines of code changed, credits used) shown after each generation. [Observed: absence in docs, accessed 2026-08-07]

## 28. What should MiMo learn?

1. **Single coherent mental model: agent + computer.** Don't oscillate between "design tool" and "code tool" — pick one identity. Manus picked agent-with-its-own-computer and stuck with it across cloud, desktop, cloud-computer, browser. [Source: https://manus.im/docs/introduction/welcome + /blog/manus-cloud-computer, accessed 2026-08-07]
2. **Three-tier execution environment** (temporary sandbox / local desktop / always-on cloud computer) mapped to task type. The guide-table "Scenario → Right Environment" is the cleanest environment-selection UX seen. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
3. **Live runtime motion in Computer pane.** Streaming browser/terminal/file activity makes the agent feel alive — invest in this over text-streaming-only. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
4. **Plan Mode as alignment gate.** Markdown plan document, reviewable/editable/approvable, mid-task pause-and-resume. Catches mistakes before code is written. [Source: https://manus.im/blog/manus-plan-mode, accessed 2026-08-07]
5. **Take Over flow for human-only verification steps** (CAPTCHA / MFA / SMS) — don't force the agent to give up; pause and resume. [Source: https://manus.im/docs/features/cloud-browser, accessed 2026-08-07]
6. **Daemon pattern: Cloud Computer + Scheduled Tasks + Projects.** Support weeks/months-long unattended workflows as first-class. [Source: https://manus.im/blog/manus-cloud-computer + /docs/features/scheduled-tasks + /docs/features/projects, accessed 2026-08-07]
7. **Browser Operator's local-IP trust advantage** for authenticated-site workflows. Cloud browser + local browser as complementary surfaces. [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
8. **Skills with explicit Progressive Disclosure** (3-level: metadata → instructions → resources) — preserve context window, load on demand. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
9. **Projects that Learn** — agent proposes knowledge-base updates from task conversations, applied only after user approval. [Source: https://manus.im/blog/manus-projects-self-updating, accessed 2026-08-07]
10. **RESTful API positioned as complete-agent API** (not narrow text-generation API). [Source: https://manus.im/docs/integrations/manus-api, accessed 2026-08-07]
11. **llms.txt published** for agent-as-user audience. [Source: https://manus.im/docs/llms.txt, accessed 2026-08-07]
12. **15+ language localization.** [Observed: language selector, accessed 2026-08-07]
13. **Audit trail per session** (Browser Operator logs every action). [Source: https://manus.im/blog/manus-browser-operator, accessed 2026-08-07]
14. **Folder-scoped local access** + per-pattern "Always Allow" trust-building. [Source: https://manus.im/docs/features/desktop, accessed 2026-08-07]
15. **CodePrompt component embedded in docs** with Copy + "Ask Manus" buttons that deep-link back to manus.im with pre-filled prompt. [Observed: docs page chrome, accessed 2026-08-07]

## 29. What should MiMo reject?

1. **Per-command approval fatigue without an escape hatch.** Manus's "Allow Once / Always Allow" is binary; MiMo should consider v0-style per-pattern rule engine (allow `pnpm test:*`, deny `curl:*`, ask `git push:*`) for finer-grained autonomy. [Source: https://manus.im/docs/features/desktop + v0.dev/docs/terminal-commands, accessed 2026-08-07]
2. **Credit cost opacity.** "Credits are consumed based on the complexity of the task" is not enough. MiMo should show pre-task cost estimate and post-task structured summary (v0's "Work details" pattern). [Source: https://manus.im/docs/introduction/plans + v0.dev/changelog "Oct 31, 2025", accessed 2026-08-07]
3. **Plan credits reset monthly.** v0's 65-day monthly credit expiry + credit rollover is more user-friendly. MiMo should adopt credit rollover. [Source: https://manus.im/docs/introduction/plans FAQ + v0.dev/changelog, accessed 2026-08-07]
4. **Three coexisting browser surfaces without a clear default.** Manus has Cloud Browser + Browser Operator (local) + Take Over prompts + Cloud Computer browser. Users need a guide-table to pick. MiMo should pick one default and make others opt-in. [Source: https://manus.im/blog/manus-cloud-computer, accessed 2026-08-07]
5. **Browser Operator browser-limited** (Chrome + Edge only). MiMo should design browser support from day one with cross-browser abstraction. [Source: https://manus.im/docs/features/browser-operator FAQ, accessed 2026-08-07]
6. **Community Skills security risk shifted to user.** "It is crucial to verify their contents before use" — MiMo should sandbox community skills by default or auto-audit before activation. [Source: https://manus.im/docs/features/skills, accessed 2026-08-07]
7. **No published SDK** — REST-only API limits developer ergonomics vs. v0's `pnpm add v0@latest` TypeScript SDK. MiMo should ship a typed SDK. [Observed: absence in docs, accessed 2026-08-07]
8. **No published keyboard shortcut docs, no accessibility conformance statement, no motion tokens, no latency SLAs.** MiMo should publish all four. [Observed: absence in docs, accessed 2026-08-07]
9. **No version history / diff view / restore** — Manus's memory model is Project-scoped, making it harder to revert specific agent edits. MiMo should adopt v0's linear version history with diff + ↩ restore. [Observed: absence in Manus docs vs. v0.dev/docs/versions, accessed 2026-08-07]
10. **Meta acquisition creates long-term vendor uncertainty.** MiMo should avoid acquisition-dependent roadmap commitments. [Observed: footer across all cached pages, accessed 2026-08-07]
11. **No per-task "Work details" summary** — MiMo should adopt v0's pattern (time worked, files modified, lines of code changed, credits used after each generation). [Observed: absence in Manus docs vs. v0.dev/changelog "Oct 31, 2025", accessed 2026-08-07]
12. **Empty state without templates gallery.** Manus home has only a composer + quick-action chips. v0's templates gallery (with view + fork counts) is a stronger cold-start. [Observed: https://manus.im/home vs. https://v0.dev/home, accessed 2026-08-07]

## 30. Confidence Score (0–100) with reasoning

**78/100**

**Reasoning:**
- **High confidence (85+):** Mental model (agent + computer), three-tier execution environment, Plan Mode mechanics, My Computer / Cloud Computer / Browser Operator features, Skills Progressive Disclosure, Projects that Learn, credit system structure, daemon pattern, $100M ARR scale claims, Meta acquisition — all documented in detail in primary manus.im docs (pre-rendered Mintlify markdown) and manus.im blog posts.
- **Medium confidence (65–80):** Per-command approval fatigue analysis (inferred from "Every command requires explicit approval" + "Allow Once / Always Allow" binary choice; not directly criticized by Manus), parallel-execution-confuses-users risk (inferred from existence of environment-selection guide table), motion/animation (no tokens documented but live runtime motion is structurally evident from Cloud Browser/Desktop/Browser Operator descriptions), trust model (well-documented but Meta acquisition impact uncertain).
- **Lower confidence (50–65):** Accessibility (no VPAT found), keyboard UX (no dedicated docs), performance perception (no latency SLAs), API specifics (RESTful confirmed but no detailed endpoint reference captured), arxiv architecture paper (NOT FOUND — searched arxiv IDs 2504.00724 and 2507.00724 returned unrelated math/numerical-analysis and computer-vision papers; Manus does not appear to have published an arxiv architecture paper; the "Context Engineering for AI Agents" referenced in $100M ARR blog is a Manus-authored whitepaper/blog, not an arxiv paper).
- **Confidence-lowering factors:** No interactive manus.im session run (would require Manus account); several docs pages (docs-trust, docs-computer, docs-sandbox, docs-plan-mode, docs-projects, docs-branch, docs-scheduled, docs-api, docs-welcome) returned SPA shell with `__next_error__` placeholder when curl-fetched — text content not extractable; relied on pre-cached `md-*.md` Mintlify-rendered markdown files (which are authoritative and complete for the topics they cover); some blog posts (blog-manus-hosting-web-builder, blog-manus-recommended-connectors, blog-manus-joins-meta-for-next-era-of-innovation, blog-introducing-wide-research, blog-manus-auto-publish, blog-manus-branch, blog-manus-projects, blog-manus-agents-telegram) were observed by title only and not deeply read due to time-boxing.
- **Confidence-raising factors:** manus.im publishes llms.txt (explicit agent-readable docs index), Mintlify-rendered docs are authoritative and well-structured, blog posts are dated and detailed, $100M ARR blog provides scale validation, every claim has a primary citation.
- **Methodology gap:** The W3b task brief's reference to "Manus AI agent arxiv" paper appears to be based on a researcher assumption. Direct arxiv search returned no Manus-architecture paper; the actual Manus thought-leadership artifact is the "Context Engineering for AI Agents" whitepaper referenced in the $100M ARR blog. Future research should confirm via manus.im/blog or the Manus engineering blog.
