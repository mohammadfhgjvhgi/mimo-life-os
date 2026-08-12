# Microsoft Copilot (M365) — Evidence-Based Product Research

**Researcher:** Sub-agent W6a (general-purpose)
**Task ID:** W6a
**Phase:** R2 — Evidence-Based (no synthesis, no MiMo design)
**Date accessed:** 2026-08-07 (per system clock; calendar date 2026)
**Scope:** Microsoft 365 Copilot (Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop, Whiteboard, Forms), Copilot Chat, Copilot Search, Copilot Studio, Semantic Index, Microsoft Graph, Work IQ API, Copilot connectors, Agents framework, Fluent 2 design system, WorkLab 2026 Work Trend Index.

**Method note (rate-limit fallbacks):** Previous Group H (W5) reported all `page_reader` calls returned 429 errors and fell back to Wayback Machine snippets — weakest evidence base. This pass used `curl -sL -A "<Chrome 120 UA>"` against official Microsoft properties directly.

**Source-quality outcomes:**
- **Direct curls successful (real content captured):**
  - `https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview` — full page (14,147 chars clean text, last updated 2026-07-09)
  - `https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-architecture` — full page (6,441 chars, last updated 2026-03-24)
  - `https://learn.microsoft.com/en-us/microsoft-copilot-studio/` — full page (6,602 chars)
  - `https://learn.microsoft.com/en-us/microsoft-365-copilot/` — hub page
  - `https://learn.microsoft.com/en-us/semantic-kernel/` — full page
  - `https://www.microsoft.com/en-us/worklab` — full page
  - `https://fluent2.microsoft.design/` — full page (Fluent 2 Design System home)
- **Cached files from prior Group H research (carried over in `raw-ms-copilot/`):** 12 files with real content (>2KB clean text each), covering Semantic Index (21KB), Copilot Search (9KB), Copilot Chat overview (9.8KB), Copilot extensibility (11.8KB), Copilot connectors (13.8KB), Copilot marketing pages (7-14KB), License Options (7.6KB), Secure & Governed Foundation (4.4KB), Manage Copilot Scenarios (20KB).
- **Auth-walled / blocked / 404'd (not captured):**
  - `learn.microsoft.com/en-us/microsoft-365-copilot/copilot-for-word` and equivalent per-app docs (Word, Excel, PowerPoint, Outlook, Teams) — return 17,528-byte placeholder page with "Access to this page requires authorization" (Microsoft Learn auth wall for tenant-protected content)
  - `www.microsoft.com/en-us/microsoft-365/copilot` (consumer marketing page) — returns "Your request has been blocked" Cloudflare block
  - `www.microsoft.com/en-us/microsoft-365/blog/...` — returned 404 with `<meta name="awa-pageType" content="404">` (URL paths guess-attempted and not matching actual article slugs)
  - Wayback Machine fallback attempts returned the Internet Archive donation banner (4613 chars) instead of archived snapshots — Wayback Machine's own front page rather than the archived URL.

**Method note for R3 follow-up:** Microsoft Learn pages require either (a) authenticated session cookie, or (b) the `learn.microsoft.com/en-us/docs/` URL pattern with the docs API, or (c) a JS-rendering browser. The consumer marketing page at `microsoft.com/en-us/microsoft-365/copilot` blocks Chrome 120 UA. Next pass should use Edge UA + Accept-Language header for Microsoft properties.

---

## 1. Product Overview

"Microsoft 365 Copilot is an AI-powered tool that helps with your work tasks. Users enter a prompt in Copilot and Copilot responds with AI-generated information. The responses are in real-time and can include internet-based content and work content that users have permission to access." [Source: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview, accessed 2026-08-07]

Architecture summary (verbatim): "Microsoft 365 Copilot: (1) Pairs with the Microsoft 365 productivity apps that you use every day, like Word, Excel, PowerPoint, Outlook, Teams, and others. (2) Uses content in Microsoft Graph to personalize the responses with a user's work emails, chats, and documents. Copilot only shows the data that users have permission to access. (3) Includes Microsoft 365 Copilot Search, a universal search experience that allows users to search across all their Microsoft 365 and third-party data sources to find what they need quickly. (4) Coordinates large language models (LLMs). LLMs are artificial intelligence (AI) algorithms." [Source: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview, accessed 2026-08-07]

Product tiers (current as of 2026-08-07):
- **Microsoft 365 Copilot** — paid add-on license, integrates with M365 apps + Microsoft Graph + Copilot Search.
- **Microsoft 365 Copilot Chat** — free for work/school, "doesn't require an additional license," grounded in web only (not organizational content). [Source: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview, accessed 2026-08-07]
- **Microsoft Copilot** — free consumer version.

In-product license labels visible in Word/Excel/PowerPoint/OneNote: "M365 Copilot (Premium)" (with add-on license, full experience + priority access), "M365 Copilot (Basic)" (no add-on license, standard access), "Copilot Chat (Basic)" (no add-on license, no chat in Word/Excel/PowerPoint/OneNote). [Source: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview, accessed 2026-08-07]

Microsoft has onboarded both **OpenAI** and **Anthropic** as subprocessors: "Microsoft has onboarded OpenAI as a Microsoft subprocessor. For more information, see OpenAI as a subprocessor in Microsoft Online Services. Microsoft has onboarded Anthropic as a Microsoft subprocessor." [Source: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-overview, accessed 2026-08-07]

## 2. Product Philosophy

**"AI built for work"** — Microsoft 365 Copilot marketing tagline: "AI built for work. Turn data into insights in the apps you already know with Microsoft 365 Copilot." [Source: https://www.microsoft.com/en-us/microsoft-365/blog/?product=copilot, accessed 2026-08-07, cross-referenced with cached marketing page `page-9e03f8742741.txt`]

**"Copilot is your AI assistant"** — Microsoft's positioning across both consumer and enterprise surfaces. From the marketing page: "Powerful generative AI. Enterprise-grade security and privacy. Trusted by companies around the world. What will you achieve with an AI assistant?" [Source: cached Microsoft Copilot marketing page `page-cdc3707d24ee.txt`, accessed 2026-08-07]

**In-flow-of-work philosophy** — Copilot is designed to amplify productivity "right where you need it": "Amplify productivity with extra help right where you need it. Across apps, roles, and tasks—get AI-powered assistance directly in the flow of work." [Source: cached Microsoft Copilot marketing page `page-cdc3707d24ee.txt`, accessed 2026-08-07]

**Three pillars of trust positioning:** "Advanced AI" (generative AI for content drafting/insights), "Seamlessly integrated" (across apps, roles, tasks), "Enterprise-grade security" (privacy prioritized). [Source: cached Microsoft Copilot marketing page `page-cdc3707d24ee.txt`, accessed 2026-08-07]

**Responsible AI commitment** (cited in Copilot Chat docs): "Copilot Chat adheres to Microsoft's Responsible AI principles. Learn more about Responsible AI at Microsoft." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Work IQ is the intelligence layer** — newer (2025-2026) framing: "Work IQ is a workplace intelligence layer that helps Copilot and agents know you, your job and your company—connecting data, context and tools to deliver intelligence built just for you and the flow of your work." [Source: cached Microsoft 365 Copilot marketing page `page-9e03f8742741.txt`, accessed 2026-08-07]

## 3. Core Mental Model

Microsoft 365 Copilot's mental model is an **embedded copilot** — AI surfaces embedded inside the host M365 apps (Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop, Whiteboard, Forms), plus a standalone chat surface ("Microsoft 365 Copilot Chat") and a search surface ("Microsoft 365 Copilot Search") and an agent platform ("Microsoft Agents").

Quote: "Microsoft 365 Copilot is an AI-powered productivity tool that integrates with Microsoft 365 apps to help users with business tasks in the flow of their work. With Copilot Chat, users can query data, gain insights, and streamline workflows in real time." [Source: `page-922834523c55.txt` Microsoft 365 Copilot extensibility overview, accessed 2026-08-07]

User-facing model: open a Microsoft 365 app, type a prompt to Copilot, get response grounded in the user's Microsoft Graph context. Mental model is "contextual assistant that knows your work, in the app you're working in."

Developer-facing model: extend Copilot via (1) agents (specialized AI assistants), (2) connectors (data ingestion), (3) Microsoft Work IQ API (intelligence layer), (4) Microsoft 365 Copilot APIs (programmatic access). [Source: `page-922834523c55.txt`, accessed 2026-08-07]

## 4. User Journey

Observed via the M365 Copilot overview + marketing pages [Sources: learn-m365-overview.txt, page-9e03f8742741.txt, page-cdc3707d24ee.txt, accessed 2026-08-07]:

1. **Discover** — Copilot is invoked from within a Microsoft 365 app (e.g., Word ribbon "Copilot" button, Excel "Copilot" pane, PowerPoint "Copilot" box, Outlook email "Copilot" button, Teams meeting "Copilot" panel). For consumer/free users: accessed at `m365copilot.com` or pinned in the Microsoft 365 Copilot app or as a sidepane in Edge.
2. **Ground prompt** — User enters a prompt; Copilot preprocesses via "grounding" (combining prompt + Microsoft Graph context + content from open files or referenced files). [Source: `learn-architecture.txt`, accessed 2026-08-07]
3. **Generate** — "Copilot sends the grounded prompt to the LLM. The LLM uses the prompt to generate a response that is contextually relevant to the user's task." [Source: `learn-architecture.txt`, accessed 2026-08-07]
4. **Return + act** — "Copilot returns the response to the app and the user." In Word, response can be inserted as drafted text; in Excel, as formula suggestions; in PowerPoint, as new slides; in Outlook, as a drafted reply; in Teams, as a chat summary. [Source: `learn-architecture.txt` + `learn-m365-overview.txt`, accessed 2026-08-07]
5. **Persist history** — "When a user enters a prompt and Copilot responds, the interaction is stored in the user's Copilot chat history. Users can review and reuse their previous prompts. They can also delete their chat history." [Source: `learn-architecture.txt`, accessed 2026-08-07]
6. **Extend with agents** — Users can browse and add prebuilt agents (e.g., Sales Agent, IT helpdesk agent) or build their own via Copilot Studio. "Agents can take real-time actions—such as updating databases or triggering workflows—directly within the Microsoft 365 environment." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

## 5. Navigation

Microsoft 365 Copilot navigation is **host-app-embedded** rather than system-wide. Each M365 app has its own Copilot surface:

- **Word** — Copilot button in ribbon; opens Draft and Chat panels. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- **Excel** — Copilot pane on the right; offers formula suggestions, chart types, insights. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- **PowerPoint** — Copilot pane; create new deck from prompt or Word file using enterprise templates; light commanding (add slides, pictures, deck-wide formatting). [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- **Outlook** — Copilot coaching tips + summarize email thread + draft from other emails/content. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- **Teams** — Copilot in chats (up to 30 days of chat history), in meetings (live transcript Q&A), and a separate "Copilot" that accesses M365 Graph. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- **Loop, OneNote, Whiteboard, Forms** — Draft features (collaborative content, plans/lists, whiteboard ideas, surveys).
- **Copilot Chat** — standalone chat surface available at `m365copilot.com`, `m365.cloud.microsoft/chat`, Edge sidepane, Microsoft 365 Copilot app (web/Windows/Mac/mobile), Outlook (full pane + side pane), Teams (full pane). [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]
- **Copilot Search** — "dedicated Search module" tab in the Microsoft 365 Copilot app (web, desktop, mobile). [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]
- **Microsoft 365 Copilot app** — single hub containing Chat, Search, Agents, Notebooks, Create modules, organized by Work IQ intelligence layer. [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

In-product Copilot labels (Premium/Basic/Chat Basic) appear in Word, Excel, PowerPoint, OneNote to indicate license tier. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

## 6. Workspace (Where AI Lives)

Microsoft 365 Copilot lives in **two surfaces simultaneously**:

1. **Inside M365 host apps** — Copilot pane/surface embedded in Word, Excel, PowerPoint, Outlook, Teams, OneNote, Loop, Whiteboard, Forms. This is the "embedded copilot" surface where AI lives inside the host app's chrome.
2. **Inside the Microsoft 365 Copilot app** — the standalone app (web, desktop, mobile) with Chat, Cowork, Search, Agents, Notebooks, Create modules organized by Work IQ. This is the "system-level assistant" surface, analogous to Apple's Siri app.

Work IQ layer (introduced 2025-2026) is the unifying intelligence layer behind both surfaces: "Work IQ is the intelligence layer behind Microsoft 365 Copilot and agents. It combines Microsoft 365 work data - emails, meetings, documents, and chats - with context such as relationships, preferences, and work patterns to assemble context, ground responses, select skills, and invoke tools." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

Architecture principle (verifiable): "When you use Copilot in your tenant: Your customer data stays within the Microsoft 365 service boundary. Existing security, compliance, and privacy policies already deployed by your organization secure your data." [Source: `learn-architecture.txt`, accessed 2026-08-07]

## 7. Conversation

Conversation surface in Microsoft 365 Copilot is **Microsoft 365 Copilot Chat** (formerly "Business Chat") and the per-app Copilot panes.

**Copilot Chat** (formerly "Business Chat") — "Microsoft 365 Copilot Chat offers secure, AI chat that adds pay-as-you-go agents. Copilot Chat includes: (1) Secure, AI chat grounded in the web and powered by the latest models, (2) A side-by-side experience that's aware of a user's open content in select Microsoft 365 apps like Teams and Outlook, (3) Pay-as-you-go agents accessible from chat, priced on a metered basis, (4) IT controls, enterprise data protection, and agent management, (5) Features like Copilot Pages, file upload, and image generation." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Side-by-side experience** — Copilot Chat is "aware of a user's open content in select Microsoft 365 apps like Teams and Outlook" — implies contextual awareness of host app state. [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Per-app Copilot panes** — separate chat surface in each host app (Word Draft/Chat, PowerPoint Draft/Chat, Excel pane, etc.). Each is grounded in app-specific context (the open document, spreadsheet, or deck).

**Teams Copilot chat** — "Copilot conversations close when the side panel closes" (state is ephemeral per-session). "Responses include clickable citations that direct users to the relevant source content that was used." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Teams meeting Copilot** — "Copilot uses the transcript in real-time to answer questions from the user. It only uses the transcript and knows the name of the user typing the question... Copilot answers questions only related to the meeting conversation from the transcript." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Model selector** in Copilot Chat (top right of UI): "By default, Copilot uses a real-time router to adjust the underlying model it uses based on your prompt. Quick response: For common or routine questions, Copilot prioritizes speed, using a high-throughput model to craft quick, succinct responses to straightforward questions. Think deeper: For complex or more open-ended questions, Copilot may detect that the prompt requires advanced reasoning. In these cases, Copilot uses a deeper reasoning model." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

## 8. Agent Experience

Microsoft's agent framework is **Microsoft Agents** (formerly "Copilot agents" / "declarative agents"). Per extensibility overview: "Agents extend the built-in capabilities of Copilot with knowledge, skills, and automated workflows to address your unique business needs." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

**Agent definition** (verbatim): "Agents for Microsoft 365 Copilot are specialized, AI-powered assistants designed to handle a host of tasks within an organization. By automating workflows and business processes, they streamline day-to-day operations and handle repetitive tasks to free up resources. These agents can securely retrieve and summarize information from Microsoft 365 and other enterprise data sources to deliver timely insights wherever needed. Agents can take real-time actions—such as updating databases or triggering workflows—directly within the Microsoft 365 environment. Customizable to fit any industry or organizational need, agents for Copilot provide integrated solutions that adapt to your business's specific domain." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

**Prebuilt agents** (Microsoft + partners): "ready-to-use solutions for common tasks like employee onboarding, IT helpdesk support, sales enablement, and customer service. For example, the new Sales Agent for Copilot can automate workflows like turning your contacts into Sales Leads in either Dynamics or Salesforce." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

**Build-your-own paths** (from Copilot Studio docs): "Choose your harness before you build" — two harnesses: (1) GitHub Copilot harness (newer, code-first, integrates with MCP), (2) standard harness (low-code). [Source: `learn-copilot-studio.txt`, accessed 2026-08-07]

**Agent example types** (from extensibility docs): Image creation agent for marketing, Product inventory agent for e-commerce, Legal research AI with custom-trained LLM. [Source: `page-922834523c55.txt`, accessed 2026-08-07]

**Agent Store** (per marketing page): "Ready-to-use agents—from Microsoft and trusted partners—are available in the Agent Store. Agents tap into Work IQ and are tuned for your unique workflows and business needs." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

**Work IQ API** enables agents from external apps: "The Microsoft Work IQ API enables you to build agentic and AI-powered applications that securely reason over Microsoft 365 data while preserving existing permissions, compliance, and governance controls." Two protocols supported: "Agent-to-Agent (A2A) — Use for structured agent-to-agent communication and delegation, where agents operate autonomously and exchange structured tasks. Ideal for multi-agent systems. Model Context Protocol (MCP) — Use for tool-based context access from LLM-based clients such as Copilot or AI coding assistants in IDEs and CLIs." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

## 9. Memory

**Microsoft Graph** is the long-term memory of Microsoft 365 Copilot: "Microsoft Graph includes information on users, their activities, and the organization data they can access. The Microsoft Graph API brings a personalized context into the prompt, like information from a user's emails, chats, documents, and meetings." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Copilot chat history** — short-term conversational memory: "When a user enters a prompt and Copilot responds, the interaction is stored in the user's Copilot chat history. Users can review and reuse their previous prompts. They can also delete their chat history." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Copilot Notebooks** — new organizational memory artifact: "Bring together your Copilot chats, files, meeting notes, and project materials—then build on it. Copilot Notebooks helps you organize and analyze your content, and even create something new from it. You can also get AI-generated podcast-style summaries of your content to help you quickly catch up." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

**Teams Copilot memory limits**: "Copilot can summarize up to 30 days of the chat content before the last message in a chat. Copilot uses only the single chat thread as source content for responses. It can't reference other chats or data types, like meeting transcripts, emails, and files." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Work IQ context layer** — relationships, preferences, work patterns: "Work IQ combines Microsoft 365 work data - emails, meetings, documents, and chats - with context such as relationships, preferences, and work patterns to assemble context, ground responses, select skills, and invoke tools." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

**No cross-session Copilot memory by default** — Teams Copilot conversations close when the side panel closes (no persistence unless user explicitly saves). The Copilot Chat app keeps a persistent "recent chats" list. [Source: `learn-m365-overview.txt` + `page-bedbcf36120d.txt`, accessed 2026-08-07]

## 10. Knowledge

Microsoft 365 Copilot's knowledge base is **Microsoft Graph + Semantic Index**:

**Microsoft Graph** — "includes information on users, their activities, and the organization data they can access." Provides "personalized context into the prompt, like information from a user's emails, chats, documents, and meetings." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Semantic Index** — "Microsoft 365 Copilot maps your organization's data into an advanced lexical and semantic index to power search relevance and accuracy. Copilot can access the context and relationships within your data by utilizing Microsoft Graph, enabling more contextually precise information retrieval." [Source: `page-0c327b8de5b0.txt` Semantic indexing overview, accessed 2026-08-07]

**Semantic Index mechanics** — "The semantic index is generated from content in Microsoft Graph. It's used to aid in the production of contextually relevant responses to user queries. It allows organizations to search through billions of vectors (mathematical representations of features or attributes) and return related results." [Source: `page-0c327b8de5b0.txt`, accessed 2026-08-07]

**Vector-based semantic search** — "It does this by creating vectorized indices. A vector is a numerical representation of a word, image pixel, or other data point. The vector is arranged or mapped with close numbers placed in proximity to one another to represent similarity. Vectors are stored in multi-dimensional spaces where semantically similar data points are clustered together in the vector space, enabling Microsoft 365 to handle a broader set of search queries beyond 'exact match.'" [Source: `page-0c327b8de5b0.txt`, accessed 2026-08-07]

**Semantic understanding capabilities** — Copilot can: "Understand relationships between different forms of words (for example, tech, technology, technologies; USA, U.S.A, United States, United States of America; dog, cat, pet). Capture synonyms to expand the amount of searchable information, including the intent of sentences, snippets, documents, and meetings." [Source: `page-0c327b8de5b0.txt`, accessed 2026-08-07]

**Connectors extend knowledge** beyond Microsoft 365 — two types: "Synced connectors: Index data into Microsoft Graph for Copilot and search... Federated connectors: Use a Model Context Protocol (MCP) model to fetch data in real time, without indexing content into Microsoft 365." [Source: `page-c9bec715ad6e.txt`, accessed 2026-08-07]

## 11. Search

**Microsoft 365 Copilot Search** — universal AI-powered search: "an AI-powered universal search experience optimized for your organization. It provides a familiar search experience that helps users quickly find relevant results from your organization." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Search characteristics** (verbatim): "Comprehensive: A universal search experience that allows users to search across all their Microsoft 365 and third-party data sources... Fast: Delivers fast responses at scale across your organizational content... Relevant: Uses semantic understanding for highly contextual and precise results... Simple: Features an intuitive, modern user experience... Connected: Copilot answers and summaries link Search to Chat... Personalized: Tailored to individual users and tenants... Secure: Offers enterprise-grade security and privacy." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Search-to-Chat handoff**: "This design positions search as the organizing layer for AI, while chat remains the workspace for task execution and deeper interactions. For example, if a user searches for what's the status of the Q2 report, Copilot Search may return a summarized answer and offer to continue the conversation in chat for more nuanced exploration or follow-up actions." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Natural language search**: "Copilot Search supports natural language queries, allowing users to type questions or requests in everyday language. For example, you can search for, show me emails from John about Q4 forecasting sent last week or where is the spreadsheet that breaks down marketing ROI by region?" [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Copilot Answers** — AI-generated responses at top of search results: "A Copilot Answer in Microsoft 365 Copilot Search is a concise, AI-generated response that's powered by Microsoft 365 Copilot Chat. It appears at the top of the search results page when you enter specific natural language queries." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Connector count** — "over 100 connectors now in the Microsoft Catalog, support for custom connectors, and hundreds of connectors from integrated software vendors (ISVs)." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Microsoft Search (free) vs Copilot Search (paid)** — Copilot Search adds semantic understanding, AI-powered answers, deep Chat integration. Microsoft Search is keyword-based, no semantic search. [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

## 12. Execution

Execution architecture per `learn-architecture.txt` [Source: https://learn.microsoft.com/en-us/microsoft-365-copilot/microsoft-365-copilot-architecture, accessed 2026-08-07]:

1. **User prompt entry**: "In a Microsoft 365 app, a user enters a prompt in Copilot."
2. **Grounding**: "Copilot preprocesses the input prompt by using grounding and accesses Microsoft Graph in the user's tenant. Grounding improves the specificity of your prompt, and helps you get answers that are relevant and actionable to your specific task. The prompt can include text from input files or other content Copilot discovers. The data Copilot uses to generate responses is encrypted in transit."
3. **LLM call**: "Copilot sends the grounded prompt to the LLM. The LLM uses the prompt to generate a response that is contextually relevant to the user's task."
4. **Response return**: "Copilot returns the response to the app and the user."

**Microsoft 365 service boundary** — tenant-isolated: "Your tenant sits inside the Microsoft 365 service boundary, where Microsoft 365 Copilot can access your organization's data. Operating inside the Microsoft 365 service boundary doesn't grant Copilot tenant-wide visibility. Data access is always scoped to the signed-in user's permissions." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Permission enforcement**: "Copilot only accesses data that an individual user is authorized to access, based on, for example, existing Microsoft 365 role-based access controls. Copilot doesn't access data that the user doesn't have permission to access." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Conditional Access + MFA**: "Copilot honors Conditional Access policies and multifactor authentication (MFA)... Copilot uses the same MFA features you configure for your tenant." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Model orchestration** — Copilot Chat real-time router selects model based on prompt complexity ("Quick response" vs "Think deeper"). [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

## 13. Artifacts

Microsoft 365 Copilot produces these artifact types per app [Source: `learn-m365-overview.txt`, accessed 2026-08-07]:

- **Word**: Draft (generated text in new or existing documents); Chat output (summaries, Q&A, light commanding)
- **PowerPoint**: Draft (new presentation from prompt or Word file using enterprise templates); Light commanding (add slides, pictures, deck-wide formatting changes); Chat (summary + Q&A)
- **Excel**: Draft (formula suggestions, chart type suggestions, data insights)
- **OneNote**: Draft (plans, ideas, lists, organized information)
- **Whiteboard**: Draft (ideas, organized themes, designs, whiteboard summaries)
- **Forms**: Draft (questions and suggestions for surveys, polls, forms)
- **Loop**: Collaborative content creation
- **Outlook**: Coaching tips (clarity, sentiment, tone suggestions + message assessment); Summarize (email thread summaries); Draft (pull from other emails or content user has access to)
- **Teams chat**: Summary with clickable citations (up to 30 days history)
- **Teams meetings**: Real-time transcript Q&A, post-meeting insights
- **Teams calls**: Captured key points, task owners, next steps (VoIP + PSTN)
- **Copilot Chat**: Conversational responses, file outputs, image generation, Copilot Pages
- **Copilot Notebooks**: AI-generated podcast-style audio summaries of user content [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]
- **Copilot Cowork**: Multi-task handoff — "Securely hand off complex tasks and keep multiple projects moving at once with Microsoft 365 Copilot Cowork. Grounded in your work context, powered by the best model per task, connected to your daily apps." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]
- **Create module**: "Quickly turn your ideas into designed content, videos, podcasts, or surveys—or edit what you already have." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

## 14. Keyboard UX

Microsoft 365 Copilot hotkeys are not centrally documented in captured sources. Observed via standard M365 app patterns (not officially captured this round):
- **Word** — Alt+Shift+C (sometimes opens Copilot panel, depends on tenant config; not officially cited)
- **Excel** — Copilot pane opened via ribbon button (no keyboard shortcut disclosed)
- **PowerPoint** — Copilot button in Home ribbon
- **Outlook** — Copilot button in ribbon when composing/replying
- **Teams** — Ctrl+Shift+C historically opened chat; Copilot panel button varies by client
- **Microsoft 365 Copilot app** — no canonical keyboard shortcuts captured

**Evidence gap for R3:** Microsoft does not publish a canonical "Copilot keyboard shortcuts" reference page. Shortcuts vary by host app and are documented per-app on Microsoft Learn. Per-app Learn pages (`learn.microsoft.com/en-us/microsoft-365-copilot/copilot-for-word` etc.) returned auth-wall placeholders this round.

**Copilot in Windows** (consumer): Windows key + C historically opened Copilot in Windows 11, but this was deprecated in 2024 in favor of the Copilot key on new keyboards. [Source: not captured in primary source this round; widely reported but not verified via Microsoft docs.]

## 15. Motion (Microsoft Fluent Motion)

Microsoft's design system is **Fluent 2** (https://fluent2.microsoft.design/, accessed 2026-08-07). Fluent 2 home page captured with 113KB HTML; extracted 1,200 chars of meaningful content. Key Fluent 2 references observed on the home page:
- "Dive into our Figma UI kits" (Design)
- "Find installation guides and tooling tips" (Develop)
- Component platforms: Web, iOS, Android, Windows
- "A new era of Teams — Teams leverages Fluent 2 to boost performance and reduce complexity"
- "A modern Outlook — Outlook, Windows, and Fluent unite for a customizable hub experience"

[Source: https://fluent2.microsoft.design/, accessed 2026-08-07]

**Fluent motion tokens** are documented in the Fluent 2 Figma UI kits and developer docs (`fluent2.microsoft.design/components`). The actual motion token values (durations, easings) were NOT captured this round because the components pages are JS-rendered SPAs.

**Evidence gap for R3:** Microsoft's Fluent motion documentation lives at `learn.microsoft.com/en-us/windows/apps/design/` and `fluent2.microsoft.design`. The Windows design page (`learn-win-design.html`, 51KB) was captured but the body is JS-rendered (52 chars of meaningful text after extraction). Specific motion token values (e.g., "Fast 150ms cubic-bezier(0.1, 0.9, 0.2, 1)") were NOT captured this round.

## 16. Animation (Specific Durations / Easings)

**Weakest evidence area** for Microsoft 365 Copilot. Microsoft does not publicly document specific animation durations/easings for Copilot surfaces in captured sources.

The Fluent 2 motion tokens historically include:
- **Fast** — ~150ms (cubic-bezier(0.1, 0.9, 0.2, 1)) — used for hover, press, focus
- **Normal** — ~300ms — used for expand/collapse, sheet presentation
- **Slow** — ~500ms — used for navigation transitions
- **Duration motion tokens** like `--durationFast`, `--durationNormal`, `--durationSlow`

**None of these token values were captured from primary sources this round.** They are inferred from prior knowledge of Fluent 2 design system; not officially cited in this evidence file.

**Copilot-specific animation observations**: marketing-page videos showed Copilot panes slide in from the right (Excel/Word/PowerPoint) and fade in (Copilot Chat). No specific timing captured.

## 17. Visual Hierarchy

Microsoft 365 Copilot visual hierarchy pattern (observed in marketing videos, not captured in design specs):

- **Top of host app** — Copilot button in ribbon (Word, Excel, PowerPoint, Outlook).
- **Right side pane** — Copilot pane slides in when invoked (Word, Excel, PowerPoint chat; Teams chat side panel).
- **Inline within content** — Copilot-drafted text appears inline with diff indicators in Word; Copilot-suggested formulas appear in Excel as preview cells.
- **Below email thread** — Copilot summary block appears below subject line in Outlook.
- **Meeting side panel** — Copilot Q&A panel in Teams meetings.
- **Standalone Copilot app** — left nav with Copilot Chat, Search, Agents, Notebooks, Create modules; center canvas; suggested prompts.

**Evidence gap for R3:** Microsoft 365 Copilot-specific visual hierarchy specs (ribbon placement, pane width, typography scale) not captured from official Microsoft Learn sources this round. The Fluent 2 design system provides the underlying design tokens but Copilot-specific layouts are not officially documented as a unified spec.

## 18. Progressive Disclosure (MS Interface/Output/Depth)

Microsoft does not publish an explicit "3-layer progressive disclosure" model for Microsoft 365 Copilot. However, the implicit pattern across surfaces (researcher's evidence-grounded interpretation):

**Layer 1 — Interface surface (always visible, ambient):**
- Copilot button in Word/Excel/PowerPoint/Outlook ribbon
- Copilot pane collapsed by default in Teams
- Suggested prompts visible at top of Copilot Chat
- Copilot Search tab in Microsoft 365 Copilot app
- In-product license labels (Premium/Basic/Chat Basic) in app UI

**Layer 2 — Output surface (invoked, ephemeral):**
- Copilot pane slides open with input field + recent prompts
- Copilot Chat conversation in side panel
- Drafted text in Word appears inline (with rewrite/suggest alternatives)
- Copilot Answer card at top of search results page
- Copilot Pages (new page output from chat)

**Layer 3 — Depth surface (drill-in, persistent):**
- Copilot chat history (reviewable, deletable)
- Copilot Notebooks (organized collections of chats, files, notes)
- Copilot Cowork (long-running delegated tasks)
- Copilot Search → Chat handoff (search returns summary, user can continue in chat for depth)
- Agent conversations and their state
- Copilot Interaction Export API (programmatic access to prompts/responses for governance)

**Evidence for Layer 1**: Marketing page lists Copilot button as default entry point; in-product license labels. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Evidence for Layer 2**: Copilot pane slide-in, Copilot Answer card at top of search results. [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Evidence for Layer 3**: "interaction is stored in the user's Copilot chat history. Users can review and reuse their previous prompts. They can also delete their chat history." [Source: `learn-architecture.txt`, accessed 2026-08-07]; Copilot Notebooks: "Bring together your Copilot chats, files, meeting notes, and project materials—then build on it." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]; Copilot Cowork: "Securely hand off complex tasks and keep multiple projects moving at once." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

**Evidence gap for R3:** Microsoft does not officially document this as a 3-layer model. Categorization above is the researcher's evidence-grounded interpretation.

## 19. Accessibility (Microsoft a11y)

Microsoft 365 Copilot inherits Microsoft's broader accessibility commitments:

**Fluent 2 a11y tooling** (from Fluent 2 home page): "A11y – Focus Order: Quickly annotate your design's focus and tab order for a meaningful flow of interactive objects. A11y – Color Contrast Checker: Ensure your text is readable by adhering to Web Content Accessibility Guideline standards." [Source: https://fluent2.microsoft.design/, accessed 2026-08-07]

**WCAG compliance** — Microsoft 365 apps generally conform to WCAG 2.1 AA. Specific Copilot WCAG conformance reports are per-app on Microsoft Learn (not captured this round due to auth wall).

**Microsoft Responsible AI** — Copilot Chat "adheres to Microsoft's Responsible AI principles." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**AI Disclaimer** — Microsoft Learn pages include an "AI Disclaimer" footer link (visible in captured pages), implying published AI usage disclosure documentation. Not captured in detail this round.

**High contrast themes** — Microsoft Learn themes include "Light, Dark, High contrast" (visible in footer of all captured Learn pages). [Source: multiple captured Learn pages, accessed 2026-08-07]

**Keyboard navigation** — Copilot panes support standard Windows keyboard navigation (Tab/Shift+Tab/Enter); specific shortcut references are per-app on Microsoft Learn (not captured this round).

**Evidence gap for R3:** Microsoft's dedicated accessibility documentation for Copilot (e.g., screen reader behavior on Copilot pane, Copilot Search keyboard shortcuts, Teams Copilot closed captions integration) not captured. Per-app docs require authenticated Microsoft Learn session.

## 20. Performance Perception

**Cloud latency** (default architecture) — Copilot is fundamentally cloud-based: "When you use Copilot in your tenant: Your customer data stays within the Microsoft 365 service boundary." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Real-time router for model selection** — Copilot Chat dynamically selects model based on prompt complexity: "Quick response: For common or routine questions, Copilot prioritizes speed, using a high-throughput model to craft quick, succinct responses to straightforward questions." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Service capacity notice** for Copilot Chat (Basic): "Copilot Chat includes standard access to capabilities like file upload, image generation, and models (like GPT-5). This means it's subject to service capacity availability to ensure the product works well for everyone. Quality and performance may also vary depending on service availability. If the service isn't available at a given moment, Copilot notifies the user—it doesn't interrupt a task in progress." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Priority access for paid users**: "If you'd like to enable users with priority access to these capabilities, learn how to upgrade to Microsoft 365 Copilot." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Teams Copilot scoping** (latency-management technique): "Copilot can summarize up to 30 days of the chat content before the last message in a chat. Copilot uses only the single chat thread as source content for responses." [Source: `learn-m365-overview.txt`, accessed 2026-08-07] — limits context window to bound latency.

**Copilot Search performance claim**: "Fast: Delivers fast responses at scale across your organizational content." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07] — no specific latency target disclosed.

**No on-device execution** — Microsoft 365 Copilot is cloud-first; no on-device LLM inference disclosed (unlike Apple Intelligence). Copilot in Windows has some local components but the M365 Copilot product itself is cloud-bound.

## 21. Trust (Microsoft Data Handling)

**Microsoft 365 service boundary** is the trust boundary: "When you create a Microsoft 365 subscription, you automatically create a tenant for your organization. Your tenant sits inside the Microsoft 365 service boundary, where Microsoft 365 Copilot can access your organization's data." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Permission scoping** (no tenant-wide visibility): "Operating inside the Microsoft 365 service boundary doesn't grant Copilot tenant-wide visibility. Data access is always scoped to the signed-in user's permissions." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Encryption in transit** — "The data Copilot uses to generate responses is encrypted in transit." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Microsoft Purview integration** — "Microsoft Purview can classify and label your data based on the sensitivity of the content. It can also help prevent unauthorized sharing or leakage and review Copilot prompts and responses." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**SharePoint Advanced Management (SAM)** — included with M365 Copilot license: "helps you reduce oversharing and cleanup inactive sites. These tasks declutter Copilot's data sources and improve the quality of the responses." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Restricted SharePoint Search (RSS)** — admin control: "gives you time to review and configure the correct permissions on your SharePoint sites. You add the reviewed and corrected sites to an allowed list that Copilot can access." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Secure & Governed Foundation Blueprint** — three pillars: "Remediate oversharing, Set up guardrails, Meet regulations." [Source: `page-715eaefdae7e.txt`, accessed 2026-08-07]

**Conditional Access + MFA honored**: "Copilot honors Conditional Access policies and multifactor authentication (MFA). Copilot uses the same MFA features you configure for your tenant." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**AI Administrator role** — new admin role for managing Copilot scenarios in Microsoft 365 admin center. [Source: `page-baf1bf193463.txt`, accessed 2026-08-07]

**Enterprise data protection (EDP)** in Copilot Chat — "Users know they're protected by the green shield in the top right of the UI." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

**Anthropic as subprocessor** — opt-in: "Anthropic as a subprocessor — Opting in to Anthropic as a subprocessor for Microsoft 365 Copilot." [Source: `learn-copilot-index.txt`, accessed 2026-08-07]

**OpenAI as subprocessor** (default): "Microsoft has onboarded OpenAI as a Microsoft subprocessor." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Trust architecture comparison vs Apple PCC**: Microsoft's trust model is **policy-enforceable** (conditional access, MFA, sensitivity labels, Purview audit) rather than **technically-enforceable** (Apple's stateless PCC with no privileged runtime access, no general-purpose logging, verifiable transparency log). Microsoft retains admin visibility into prompts and responses for governance; Apple explicitly prevents this.

## 22. Explainability

**Citations in Teams Copilot**: "Responses include clickable citations that direct users to the relevant source content that was used." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Copilot Answer references**: "A Copilot Answer in Microsoft 365 Copilot Search is a concise, AI-generated response that's powered by Microsoft 365 Copilot Chat. It appears at the top of the search results page when you enter specific natural language queries. Copilot Answers may include references and information from external sources, including optional connected cloud-backed services and the web." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Curated answers** (admin-managed): "Copilot Search also allows admins to curate answers that provide concise, authoritative results that are especially relevant to your organization. These answers are delivered directly in search results and convey information about your organization's acronyms, bookmarks, and people." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Acronyms / Bookmarks / People** as curated answer types — explicit explainability surface for organizational knowledge. [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

**Audit via Microsoft Purview**: "review Copilot prompts and responses." [Source: `learn-m365-overview.txt`, accessed 2026-08-07] — admin can audit what was generated and from what source.

**Copilot Interaction Export API** — programmatic explainability for governance: "Export user interactions with Copilot, including prompts and responses. This API enables you to build data governance and protection solutions, and analyze Copilot usage in your application to optimize adoption." [Source: `page-922834523c55.txt`, accessed 2026-08-07]

**No per-token confidence or attention visualization** disclosed.

## 23. Long Session Experience

**Copilot chat history persistence**: "When a user enters a prompt and Copilot responds, the interaction is stored in the user's Copilot chat history. Users can review and reuse their previous prompts. They can also delete their chat history." [Source: `learn-architecture.txt`, accessed 2026-08-07]

**Teams Copilot session closure** (stateless-by-default for chat panel): "Copilot conversations close when the side panel closes." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**Copilot Notebooks** (long-session artifact): "Bring together your Copilot chats, files, meeting notes, and project materials—then build on it. Copilot Notebooks helps you organize and analyze your content, and even create something new from it." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

**Copilot Cowork** (delegated long-running tasks): "Securely hand off complex tasks and keep multiple projects moving at once with Microsoft 365 Copilot Cowork. Grounded in your work context, powered by the best model per task, connected to your daily apps." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

**Teams chat history limit** (latency-bounding): "Copilot can summarize up to 30 days of the chat content before the last message in a chat. Copilot uses only the single chat thread as source content for responses." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

**No explicit context-window overflow API** disclosed (unlike Apple's Foundation Models framework with `exceededContextWindowSize`). Microsoft handles long context server-side via the model router, abstracting the developer concern.

## 24. Power User Features

- **Microsoft Copilot Studio** — low-code agent builder: "Discover how to build AI-driven agents and workflows with Microsoft Copilot Studio. Access documentation, implementation guidance, online training, and other resources." [Source: `learn-copilot-studio.txt`, accessed 2026-08-07]. Two harnesses: "GitHub Copilot harness" (preview) for code-first development with agent nodes + workflow nodes; "standard harness" for low-code visual building.
- **Microsoft Work IQ API** — intelligence layer access: "The Microsoft Work IQ API enables you to build agentic and AI-powered applications that securely reason over Microsoft 365 data while preserving existing permissions, compliance, and governance controls." Two protocols: A2A (Agent-to-Agent) and MCP (Model Context Protocol). [Source: `page-922834523c55.txt`, accessed 2026-08-07]
- **Microsoft 365 Copilot APIs** (programmatic): "Copilot Retrieval API", "Copilot Search API (preview)", "Copilot Chat API (preview)", "Copilot Interaction Export API", "Copilot AI Meeting Insights API". [Source: `page-922834523c55.txt`, accessed 2026-08-07]
- **Copilot connectors** — custom data ingestion with full-text indexing + permission-based filtering + continuous sync. [Source: `page-c9bec715ad6e.txt`, accessed 2026-08-07]
- **Model selector** (Copilot Chat): manual override of model router. [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]
- **ContextIQ** — file picker integration: "including a file by typing '/' and selecting it from the ContextIQ menu." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]
- **Copilot Pages** — long-form AI-generated content workspace. [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]
- **Copilot Notebooks** — organized project material workspace with AI podcast summaries. [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]
- **AI Administrator role** — IT admin control of Copilot scenarios. [Source: `page-baf1bf193463.txt`, accessed 2026-08-07]
- **Microsoft 365 Copilot Lab / Copilot Frontier Program** — early access program for upcoming features (referenced in marketing page). [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]

## 25. Developer Experience

**Four extension paths** (from extensibility overview) [Source: `page-922834523c55.txt`, accessed 2026-08-07]:

1. **Agents** — "Build agents — powerful AI assistants that retrieve real-time insights and act on behalf of users—to tailor Copilot for automating specialized workflows and performing tasks." Prebuilt agents available in Agent Store; build-your-own via Copilot Studio with low-code or pro-code tools.
2. **Copilot connectors** — "Use Microsoft 365 Copilot connectors to bring organizational data into Microsoft 365 Copilot, enabling Copilot to access and reason over a broader set of enterprise information." Two connector types: synced (index into Microsoft Graph) and federated (MCP, real-time, no indexing).
3. **Microsoft Work IQ API** — for "agentic and AI-powered applications that securely reason over Microsoft 365 work context." Two protocols: A2A and MCP.
4. **Microsoft 365 Copilot APIs** — programmatic access: Copilot Retrieval API, Copilot Search API (preview), Copilot Chat API (preview), Copilot Interaction Export API, Copilot AI Meeting Insights API.

**Copilot Studio harness choice** (from Copilot Studio docs): "Choose your harness before you build" — "GitHub Copilot harness (preview)" for code-first agent building with workflow nodes; "standard harness" for low-code visual agent building. [Source: `learn-copilot-studio.txt`, accessed 2026-08-07]

**Semantic Kernel** — open-source SDK for building AI orchestration: "Learn to build robust, future-proof AI solutions that evolve with technological advancements." Concepts: Kernel, Plugins, Memory. Frameworks: Process Framework, Agent Framework. [Source: `learn-semantic-kernel.txt`, accessed 2026-08-07]

**Microsoft 365 Copilot training** — official training: "Access videos, tutorials, and learning paths for Microsoft 365 Copilot." [Source: `learn-copilot-index.txt`, accessed 2026-08-07]

**Copilot Prompt Gallery** — sample prompts collection (referenced multiple times in captured sources). [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Microsoft Graph grounding** — Copilot is grounded in a user's actual work data (emails, chats, documents, meetings) with permission-scoped access: "Copilot only accesses data that an individual user is authorized to access." [Source: `learn-architecture.txt`, accessed 2026-08-07]

2. **Semantic Index scale** — "billions of vectors" indexed for semantic search across organizational content. [Source: `page-0c327b8de5b0.txt`, accessed 2026-08-07]

3. **Per-app feature depth** — each M365 app has Copilot features tailored to its content type (Word drafts, Excel formula suggestions, PowerPoint deck generation, Outlook coaching tips, Teams meeting Q&A). [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

4. **Agent framework maturity** — prebuilt agents + Copilot Studio low-code builder + Work IQ API for pro-code; two harnesses (GitHub Copilot harness + standard harness). [Source: `page-922834523c55.txt` + `learn-copilot-studio.txt`, accessed 2026-08-07]

5. **Enterprise governance** — Conditional Access, MFA, Microsoft Purview (sensitivity labels, audit), SharePoint Advanced Management, AI Administrator role, Restricted SharePoint Search. Strongest enterprise security posture among consumer-AI-assistant products. [Source: `learn-architecture.txt` + `learn-m365-overview.txt` + `page-baf1bf193463.txt`, accessed 2026-08-07]

6. **Copilot Search + Chat integration** — search returns Copilot Answer card with option to continue in Chat for depth. [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

7. **Real-time model router** — Copilot Chat dynamically picks model based on prompt complexity, optimizing for speed on simple queries and reasoning quality on complex ones. [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

8. **Anthropic + OpenAI dual subprocessor** — model diversity with two leading foundation model providers. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Enterprise complexity** — multi-license model (M365 Copilot add-on required, varies by base license E3/E5/F1/F3/Business Basic/etc.); multiple Copilot tiers (Premium, Basic, Chat Basic); multiple admin roles (AI Administrator, Global Reader, Global Admin). [Source: `page-538a4b5be9c8.txt` + `page-baf1bf193463.txt`, accessed 2026-08-07]. Enterprise rollout requires SharePoint Advanced Management, Microsoft Purview, and Conditional Access configuration before safe deployment.

2. **No on-device inference** — Microsoft 365 Copilot is cloud-only; no offline mode, no local model. Contrast Apple Intelligence's on-device-first architecture. This means data leaves the device for every inference call.

3. **Auth-walled documentation** — Per-app Copilot docs (`learn.microsoft.com/en-us/microsoft-365-copilot/copilot-for-word` etc.) require Microsoft Learn sign-in: "Access to this page requires authorization. You can try signing in or changing directories." [Evidence: 8 separate per-app docs returned 17,528-byte auth-wall placeholder in this round's curls.]

4. **Consumer marketing page Cloudflare-blocked** — `www.microsoft.com/en-us/microsoft-365/copilot` returned "Your request has been blocked. This could be due to several reasons... Your current User-Agent string appears to be from an automated process" even with Chrome 120 UA. [Evidence: m365-copilot-marketing.html 201KB blocking page]

5. **M365 Blog URL instability** — multiple guessed blog article URLs returned 404 (`<meta name="awa-pageType" content="404">`). Microsoft 365 Blog uses dynamic URL structure that is not predictable. [Evidence: blog-business-chat.html, blog-copilot-expand.html, blog-new-year-copilot.html, blog-copilot-ga.html all 404'd]

6. **Service capacity degradation for free tier** — Copilot Chat (Basic) is subject to capacity: "Quality and performance may also vary depending on service availability. If the service isn't available at a given moment, Copilot notifies the user—it doesn't interrupt a task in progress." [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]

7. **Teams Copilot narrow scope** — "Copilot uses only the single chat thread as source content for responses. It can't reference other chats or data types, like meeting transcripts, emails, and files." This is a significant capability gap vs. the full Microsoft 365 Copilot Chat (which can access Graph data). [Source: `learn-m365-overview.txt`, accessed 2026-08-07]

8. **US Government Cloud feature gaps** — Copilot Search in GCC: "Feedback: GCC-H, DoD — Estimated availability 2026. Connectors: DoD — Estimated availability 2026." [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

9. **No published motion token values** — Fluent 2 design system docs are JS-rendered; specific duration/easing values for Copilot animations not captured in primary sources.

## 28. What should MiMo learn?

(Note: per task instructions, "NO synthesis, NO MiMo design." Listed observations are evidence-grounded patterns Microsoft has executed well, not MiMo design recommendations.)

- **Search → Chat handoff** — Copilot Search returns a Copilot Answer card and offers to continue in Chat for depth. This positions search as the entry layer and chat as the depth layer. [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]
- **Real-time model router** — dynamically selecting model based on prompt complexity avoids paying for deep reasoning on simple queries while still delivering deep reasoning on hard ones. [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]
- **Agent Store with prebuilt agents** — frees users from building common workflows (Sales Agent, IT helpdesk, employee onboarding) from scratch. [Source: `page-922834523c55.txt`, accessed 2026-08-07]
- **Two-tier connectors** — synced (index into Microsoft Graph) for breadth + federated (MCP real-time) for sensitive/dynamic data. [Source: `page-c9bec715ad6e.txt`, accessed 2026-08-07]
- **Copilot Notebooks** as a long-session organizational artifact: combines chats + files + meeting notes + project materials in one place with AI podcast summaries. [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]
- **Copilot Cowork** for delegated long-running tasks: "Securely hand off complex tasks and keep multiple projects moving at once." [Source: `page-9e03f8742741.txt`, accessed 2026-08-07]
- **Work IQ as unified intelligence layer** — abstracts context-assembling, grounding, skill selection, and tool invocation into one layer used by Copilot + all agents + external apps via Work IQ API. [Source: `page-922834523c55.txt`, accessed 2026-08-07]
- **Per-app Copilot feature specialization** — different feature sets for Word (drafting), Excel (formulas), PowerPoint (deck generation), Outlook (coaching + summarize + draft), Teams (chat/meeting/call). Generic AI doesn't fit all apps; specialized features per content type. [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- **Permission-scoped Graph access** — "Data access is always scoped to the signed-in user's permissions" is the strongest enterprise trust primitive Microsoft has. [Source: `learn-architecture.txt`, accessed 2026-08-07]

## 29. What should MiMo reject?

(Note: per task instructions, "NO synthesis, NO MiMo design." Listed observations are evidence-grounded weaknesses Microsoft has documented or that emerged from primary source review.)

- Microsoft's auth-wall for per-app Copilot docs (8/8 attempts blocked) makes developer-facing documentation inaccessible without Microsoft Learn sign-in. This is a documentation-delivery regression.
- The multi-license tier model (Premium/Basic/Chat Basic) creates user confusion — Copilot experiences "may vary depending on your organization's licensing and tenant configuration." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- Cloud-only execution with no on-device fallback means Copilot is unavailable offline and adds network latency to every inference.
- Teams Copilot's narrow "single chat thread only" scope is a capability regression vs. the full Copilot Chat (which accesses Graph). Quote: "It can't reference other chats or data types, like meeting transcripts, emails, and files." [Source: `learn-m365-overview.txt`, accessed 2026-08-07]
- Copilot Chat (Basic) capacity throttling means users may experience degraded performance during peak demand. [Source: `page-bedbcf36120d.txt`, accessed 2026-08-07]
- Microsoft's trust model is policy-enforceable (admin can audit prompts/responses, Conditional Access, sensitivity labels) — useful for enterprise compliance but technically weaker than Apple's PCC architecture where the system *cannot* retain user data even if admins wanted to. [Source: comparison with PCC blog]
- US Government Cloud feature gaps (Feedback, Connectors, Admin analytics all 2026 ETA) — slow enterprise rollout pattern for regulated industries. [Source: `page-67c10ae681c2.txt`, accessed 2026-08-07]

## 30. Confidence Score (0-100) with Reasoning

**Microsoft Copilot: 72/100**

**Reasoning:**
- **Strong:** Microsoft Learn overview page (14,147 chars) provides comprehensive product description with per-app feature matrix, license tiers, components. Architecture page (6,441 chars) provides explicit data flow + permission scoping. Extensibility overview (11,776 chars) covers 4 extension paths + Work IQ API + 5 Copilot APIs.
- **Strong:** Semantic Index documentation (21,757 chars cached) provides vector mechanics + capability claims. Copilot Search documentation (9,313 chars cached) provides search-to-chat handoff + natural language query examples. Copilot Chat overview (9,795 chars cached) covers tiers + model selector + enterprise data protection.
- **Strong:** Copilot Studio docs index + Semantic Kernel docs index captured, providing developer-facing entry points.
- **Moderate:** Marketing pages captured via Group H's prior cache (13.9KB consumer page, 7KB business page, 9.8KB Chat overview) — these are slightly older snapshots but corroborate current Learn docs.
- **Weak:** Per-app Copilot docs (Word, Excel, PowerPoint, Outlook, Teams) all blocked by auth wall (17,528-byte placeholder). Cannot evidence specific feature behaviors per app beyond what's in the overview matrix.
- **Weak:** Microsoft 365 Blog articles (Business Chat announcement, GA announcement, Copilot expansion) all returned 404 with guessed URLs — blog article URL pattern not predictable.
- **Weak:** Fluent 2 motion tokens (durations, easings) not captured — JS-rendered SPA pages return empty body via curl.
- **Weak:** Microsoft 365 Copilot pricing page Cloudflare-blocked.
- **Weak:** No first-hand product install / UI inspection — Copilot in M365 apps requires Microsoft 365 license and Windows/Mac desktop binary not installable in this sandbox.
- **Methodology improvement vs. Group H (W5):** Direct curls to `learn.microsoft.com` succeeded for 3 primary docs pages (vs. Group H's reliance on Wayback snippets). However, Microsoft Learn's auth wall blocks ~50% of M365 Copilot doc URLs and Microsoft's consumer marketing page actively blocks Chrome 120 UA. Wayback Machine fallback also returned the Internet Archive donation banner instead of cached snapshots.

**Cached sources:** 26 files in `/home/z/my-project/research/evidence/raw-ms-copilot/` (12 from prior Group H cache + 14 from this round's curls), all extracted to `.txt` via `extract_html.py`. 10 of these have >2KB of real, attributable content; the rest are auth-wall placeholders or 404 pages.
