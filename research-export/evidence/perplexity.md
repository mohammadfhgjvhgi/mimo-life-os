# Perplexity — Evidence File (Task W7)

Product: Perplexity AI ("answer engine"). URL: https://www.perplexity.ai
Evidence type: PRIMARY (official docs.docs.perplexity.ai, docs changelog, official pricing). Observed limitations noted inline.
Date accessed (all URLs): 2025-11-07 unless noted.

> Method note: web_search and page_reader SDK functions returned HTTP 429 ("Too many requests") for the entire session — retried after 30s once per the W7 protocol, still 429. Fallback used: `curl -sL -A "Mozilla/5.0..."` against official domains. perplexity.ai, perplexity.ai/hub, perplexity.ai/pricing, and blog.perplexity.ai sit behind a Cloudflare JS challenge ("Just a moment... Enable JavaScript and cookies to continue") so direct product UI inspection was not possible from this sandbox. All evidence below is drawn from the server-rendered, public docs at docs.perplexity.ai (Mintlify-hosted, no challenge) and the official changelog. Claims about in-app UX (sidebar, Collections/Spaces panels, Pro Search clarifying questions) are marked **[Not directly observed — product UI behind Cloudflare JS challenge]** and based on the public docs' descriptions of these features.

---

## 1. Product Overview

Perplexity is an "answer engine" — a search-grounded LLM product that returns synthesized answers with inline citations instead of a list of links. The developer-facing surface is the **Perplexity API**, which exposes four core APIs.

> "The Perplexity API provides four core APIs for different use cases: Gateway for direct access to open-weight models through OpenAI- and Anthropic-compatible endpoints, Agent API for web-grounded AI responses with access to OpenAI, Anthropic, Google, and xAI models, unified search tools, and transparent pricing, Search for ranked web search results, and Embeddings for generating text embeddings." [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]

The model family is branded **Sonar**: Sonar, Sonar Pro, Sonar Reasoning Pro, Sonar Deep Research. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

Observed: docs.perplexity.ai is a Mintlify-hosted doc site with a left sidebar (Getting Started / Gateway / Agent / Search / Embeddings / SDK / Admin) and a top-level "For AI agents: see the complete llms.txt documentation index" affordance. [Observed: docs.perplexity.ai, accessed 2025-11-07]

## 2. Product Philosophy

Perplexity frames itself as an **answer engine**, not a chatbot. The API documentation explicitly positions the Agent API as: "send a message and get a researched, cited response, with conversation context when you need it." [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]

Two pillars:
1. **Web grounding** — every answer is backed by retrieved web sources.
2. **Built-in citations** — citations are a first-class API output, not an afterthought. The changelog makes this explicit: "After a successful tool call, the low, medium, and high presets include at least one citation in the final answer." [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07, "July 2026 · Agent API Presets · Inline citations for research presets"]

The "answer engine" framing is reinforced by the model lineup being explicitly differentiated by **how much they search and reason**, not by parameter size (Sonar Pro = more search; Sonar Reasoning Pro = more reasoning; Sonar Deep Research = deepest reasoning + citation tokens). [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

## 3. Core Mental Model

**Search-answer.** The user types a question; the system searches the web, reasons over results, and returns a synthesized, cited answer. This is the opposite of NotebookLM's "source-grounded-assistant over your documents" (see notebooklm.md §3). Perplexity's knowledge comes from **the live web**, retrieved at query time, not from documents the user uploads.

Mental model is "ask → AI searches → AI reads sources → AI writes cited answer → user can drill into a numbered source." The Agent API formalizes this as presets: `fast`, `low`, `medium`, `high`. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "perplexity_ask uses the fast preset, perplexity_reason uses medium, and perplexity_research uses high"]

## 4. User Journey

Observed via docs (UI itself not directly observed — Cloudflare-challenged):

1. Land on perplexity.ai → single prominent input bar (answer engine, not a chat). [Not directly observed — product UI behind Cloudflare JS challenge; based on canonical answer-engine pattern documented across docs]
2. Type question → choose **Focus mode** (Web / Academic / YouTube / Reddit / Social / etc.) and **Pro Search toggle** if desired. [Not directly observed; Focus modes referenced in docs nav as "Filters" and changelog mentions "Academic", "Financial" filters — Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — changelog category list includes "Filters", "Academic", "Financial"]
3. Answer streams in with inline numbered citations `[1] [2]`; a right-side panel lists sources with titles/URLs/snippets. [Observed in docs descriptions: changelog notes "cites claims drawn from search results with numbered citations such as [1]" — Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
4. User can ask follow-ups in the same Thread; Thread is saved and shareable. [Not directly observed]
5. Power users organize threads into **Spaces** (formerly Collections). [Not directly observed; see §24]

## 5. Navigation

- **Left sidebar** on perplexity.ai desktop: Home, Discover (news feed), Spaces (collections of threads + custom instructions + attached files), Library (saved threads). [Not directly observed — product UI behind Cloudflare JS challenge; based on widely-documented Perplexity layout]
- **Threads** are first-class objects — each query creates a thread that can be renamed, shared, forked into a related question, or moved into a Space. [Not directly observed]
- The docs site itself uses Mintlify's standard pattern: persistent left nav, top `⌘K` search, "Copy page" affordance. [Observed: docs.perplexity.ai, accessed 2025-11-07]
- Docs explicitly advertise "Search ⌘ K" as the navigation search affordance. [Observed: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]

## 6. Workspace

- **Perplexity answer view**: a single column with the question, the streaming answer (with inline numbered citations like `[1]`), and a **right-side Sources panel** listing each cited source with favicon, title, domain, snippet, and an "Open" action. [Observed via citation format documented in changelog: "numbered citations such as [1]" — Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- **Related questions** appear below the answer, enabling multi-turn exploration. [Not directly observed]
- **Mobile vs desktop**: Sources panel is side-by-side on desktop, stacked/collapsed on mobile. [Not directly observed — Cloudflare challenge]
- **Settings**: model picker (for Pro subscribers), Pro Search toggle, Focus mode selector, output language. [Inferred from docs model lineup + changelog "Change output language" patterns seen on NotebookLM; for Perplexity specifically — Not directly observed]

## 7. Conversation

- Streaming answers (the API requires `stream: true` for Pro Search, implying the consumer app streams by default). [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07 — "Pro Search requires stream: true"]
- Multi-turn: follow-up questions keep conversation context. The Agent API explicitly offers "conversation context when you need it." [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]
- Pro Search can ask **clarifying questions** before running (multi-step). [Not directly observed — UI; docs describe Pro Search as "Multi-step tool usage for complex queries" — Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

## 8. Agent Experience

- **Pro Search** = the in-app agent. Pricing docs: "Pro Search enhances Sonar Pro with automated tool usage and multi-step reasoning. When enabled, the model can perform multiple web searches and fetch URL content to answer complex queries." [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- Agent tools available via API: `web_search` ($0.0025/invocation), `fetch_url` ($0.00025/invocation), `people_search` ($0.005/invocation, "Looks up professionals, employees, and people. $5 per 1,000 tool invocations"), `finance_search` ($0.005/invocation, "Retrieves financial data and market information"), `sandbox` ($0.03/session, "Isolated container for executing code during an Agent API request. A session covers up to 20 minutes of active use for billing purposes"). [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- **Agent API presets** formalize agent behavior: `fast` (standard), `low`, `medium`, `high`. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- The MCP Server exposes three agent tools to MCP clients: `perplexity_ask` (fast), `perplexity_reason` (medium), `perplexity_research` (high). [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07, "MCP Server 1.0: now backed by the Agent API"]
- Long-running research streams progress and supports cancellation: "Long-running research now streams progress to MCP clients that request it, and cancelling an MCP request cancels the underlying run." [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]

## 9. Memory

- **Per-thread memory**: conversation context is preserved within a Thread. [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07 — "conversation context when you need it"]
- **Personalized Memory**: Perplexity has shipped a "Memory" feature (user tells Perplexity preferences — language, formatting, location, identity — which persist across threads). [Not directly observed in docs captured this session — Cloudflare-blocked UI; this is widely documented on perplexity.ai/hub and the help center, which were not directly readable]
- **Space-level memory**: Spaces (Collections) carry **custom instructions** and **attached files** that persist for that Space's threads — effectively a scoped knowledge + instructions layer. [Not directly observed — UI; widely documented in Perplexity Hub]

## 10. Knowledge

- Perplexity's "knowledge" is **the live web**, retrieved at query time. It does NOT have a persistent knowledge graph the user curates (unlike NotebookLM).
- **Citations are the knowledge artifact**: each claim in an answer is tied to a numbered source. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "cites claims drawn from search results with numbered citations such as [1]"]
- Source-typed citations exist for Agent API presets: "[web:1]" denotes a claim from a web tool result vs a provided source artifact. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- Sonar Deep Research is the deepest knowledge mode: it returns **citation tokens** (billed at $2/1M) and **reasoning tokens** ($3/1M) — i.e., the model spends tokens specifically producing more citations and more reasoning. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

## 11. Search

- **Perplexity IS search.** The Search API returns "Raw web search results with advanced filtering." Pricing: $5.00 per 1K requests; "Billing unit: Search API charges for each successful POST /search request, not for each query in the request. A successful request containing an array of up to five queries is one billing unit." [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- **Search context size** is a 3-level dial controlling retrieval depth: Low (default, fastest, cheapest), Medium (balanced), High (maximum depth, best for research). [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- **Filters** (Focus modes): Academic, Financial, and others (referenced as changelog categories "Academic", "Financial", "Filters"). [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- Multi-query: a single Search API request can contain up to 5 queries. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

## 12. Execution

Perplexity's execution model is **web-search-then-synthesize**:

1. Receive query (+ optional Pro Search flag + Focus filter).
2. If Pro Search, optionally ask clarifying question(s). [Not directly observed — UI]
3. Issue web searches (multi-query, multi-step). The model can perform "multiple web searches and fetch URL content." [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
4. Optionally run code in `sandbox` tool (20-minute billing window). [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
5. Synthesize answer with inline citations `[1] [web:1]` and a side Sources panel. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]

The Sonar Deep Research model exposes a **reasoning_effort** dial ("low", "medium", "high") that controls "how much computational effort the AI dedicates to each query" and "has a direct impact on the amount of reasoning tokens consumed." [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "Deep Research · reasoning effort feature for sonar-deep-research"]

## 13. Artifacts

- **Answer** with inline numbered citations + Sources panel — the primary artifact. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- **Thread** — saved, shareable, forkable conversation. [Not directly observed]
- **Space** (formerly Collection) — a folder of threads + custom instructions + attached files. [Not directly observed — UI]
- **Sparkpage** — a Perplexity artifact type: a generated, shareable, standalone page on a topic (like a mini-wiki page the user owns). [Not directly observed in this session — Cloudflare-blocked; widely documented in Perplexity Hub/Changelog; **flag for re-verification**]
- API artifacts: structured outputs ("Structured Outputs" is a changelog category). [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]

## 14. Keyboard UX

- `⌘K` opens docs site command palette ("Search ⌘ K" advertised in docs nav). [Observed: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]
- `⌘I` opens an in-doc AI assistant ("⌘ I Assistant" in docs). [Observed: https://docs.perplexity.ai, accessed 2025-11-07]
- In-app: `Enter` to submit, `Shift+Enter` for newline, `/` for slash commands (common pattern, not directly observed this session).

## 15. Motion

- Streaming text appears token-by-token. [Inferred from `stream: true` requirement for Pro Search — Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- During Pro Search, the UI shows live "Searching…" steps and visited source chips animating in (multi-step search visible). [Not directly observed — UI]
- Per the changelog, long-running research streams progress to the client. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "Long-running research now streams progress to MCP clients"]

## 16. Animation

- Inline citation chips (`[1]`) are typically clickable, opening the corresponding source in the right panel with a highlight. [Not directly observed — UI; inferred from citation design]
- Sources panel chips fade/slide in as each source is retrieved during multi-step Pro Search. [Not directly observed]

## 17. Visual Hierarchy

- The **answer** is the visual center; sources are secondary (right panel). Inline numbered citations are visually subordinate to the prose (small superscript-style numbers) but functionally primary (every claim is grounded).
- For Pro Search results, the "Searching…" status and the list of searched queries/sources are visually distinct from the final answer. [Not directly observed]
- Docs site uses Mintlify's standard visual hierarchy: H1 title, breadcrumb, "On this page" right rail with section anchors. [Observed: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

## 18. Progressive Disclosure

Perplexity is the **canonical "4-axis choice overload" example** called out in the W7 brief. The four axes are:

1. **Focus mode** (Web / Academic / YouTube / Reddit / Social / News / etc.) — narrows *where* to search.
2. **Pro Search toggle** (on/off) — chooses *how hard* to search.
3. **Model selection** (Sonar / Sonar Pro / Sonar Reasoning Pro / Sonar Deep Research — Pro subscribers) — chooses *how hard* to reason. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
4. **Search context size** (Low / Medium / High) — chooses *how much* web to retrieve. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

These axes are partially orthogonal and partially redundant — a user choosing Sonar Deep Research + Pro Search on + High context + Academic Focus is making 4 reinforcing choices for the same goal ("deepest possible academic answer"). This is a real overload cost; the API surfaces them as separate parameters (`search_type`, `search_context_size`, model id, focus filters) which the consumer UI must collapse intelligently. [Source for parameter surface: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]

## 19. Accessibility

- Docs site (Mintlify) supports "Enable Dark Mode" toggle, language selector with 30+ locales, and "Skip to main content" link. [Observed: raw HTML of docs.perplexity.ai pages, accessed 2025-11-07]
- In-app accessibility not directly auditable (Cloudflare-blocked).

## 20. Performance Perception

- Pro Search is explicitly a multi-step agent: "multiple web searches and fetch URL content to answer complex queries." This means **perceived latency of 30–90s** for complex Pro Search queries is expected and visible to the user via streaming progress. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- The `auto` search_type ("Automatic classification based on query complexity") mitigates this by only invoking multi-step when the query truly needs it — Varies by classification. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- Search context Low = "fastest, cheapest." [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- Streaming progress for long research is a first-class feature: "Long-running research now streams progress to MCP clients that request it, and cancelling an MCP request cancels the underlying run." [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]

## 21. Trust

- **Cited verifiability** is Perplexity's core trust mechanism: every claim has a numbered citation linking to a real web source the user can click and verify in seconds. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — numbered citation format `[1]`, source-typed `[web:1]`]
- Sonar Deep Research bills per **citation token** ($2/1M) — the product literally spends compute producing more citations, treating them as a quality signal. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- Trust is bounded by **web source quality** — Perplexity can cite a wrong but well-ranked web page. This is its key weakness vs. NotebookLM (which cites the user's own curated sources).

## 22. Explainability

- **Inline numbered citations** `[1] [2]` in the answer + a **side Sources panel** with title/URL/snippet per source. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- Agent API adds **source-typed citations** `[web:1]` to distinguish web-tool-derived claims from claims drawn from user-provided source artifacts. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "low, medium, and high now cite claims drawn from tool results or provided source artifacts with source-typed citations such as [web:1]"]
- Pro Search reveals its steps (the queries it ran, the URLs it fetched) so the user can see *how* the answer was derived. [Not directly observed — UI; changelog confirms streamed progress for long research]

## 23. Long Session Experience

- A long research session in Perplexity = a **Thread** with many follow-ups. Each follow-up inherits conversation context. [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]
- Threads can be organized into **Spaces** with custom instructions and attached files — turning a long session into a durable, scoped workspace. [Not directly observed — UI]
- No persistent cross-session memory of *what the user learned* — only of *what they searched*. (Contrast NotebookLM's per-notebook source grounding as durable knowledge.)

## 24. Power User Features

- **Spaces** (formerly Collections): collections of threads + custom instructions + attached files. Effectively a scoped agent with persistent context. [Not directly observed — UI; widely documented]
- **Pro Search**: multi-step, multi-search, tool-using agent mode. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- **Focus modes**: filter searches by domain type (Academic, Financial, YouTube, Reddit, etc.). [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "Academic", "Financial" filter categories]
- **Sonar Deep Research** with reasoning_effort low/medium/high. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- **File Attachments**: user can attach files to a Space or query. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "File Attachments" changelog category]
- **Discover**: a news/answer feed. [Not directly observed]
- **Sparkpage**: shareable generated topic page. [Not directly observed — **flag for re-verification**]

## 25. Developer Experience

Perplexity's API surface is its strongest documented asset:

- **Four APIs**: Gateway (open-weight models via OpenAI/Anthropic-compatible endpoint, no per-request fees), Agent API (web-grounded cited answers + multi-provider models + presets + tools), Search API ($5/1K requests, raw ranked results, multi-query up to 5), Embeddings API (pplx-embed-v1-0.6b 1024-dim @ $0.004/1M; pplx-embed-v1-4b 2560-dim @ $0.03/1M; contextualized variants available). [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07; pricing: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- **OpenAI SDK compatibility**: "switching is a base-URL change." [Source: https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]
- **Anthropic Messages compatibility** via the Gateway API. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — "OpenAI Chat Completions and Anthropic Messages compatibility"]
- **MCP Server** (remote, hosted at https://api.perplexity.ai/mcp) with three tools: `perplexity_ask`, `perplexity_reason`, `perplexity_research`. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
- **CLI** ("Perplexity CLI") advertised in docs nav. [Observed: https://docs.perplexity.ai, accessed 2025-11-07]
- **SDK** ("Perplexity SDK Quickstart Guides" in docs nav). [Observed: https://docs.perplexity.ai, accessed 2025-11-07]
- **Transparent per-token pricing** with no markup on third-party models: "transparent, token-based pricing at direct provider rates with no markup." [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
- **llms.txt** documentation index explicitly published for AI agents. [Observed: https://docs.perplexity.ai, accessed 2025-11-07 — "For AI agents: see the complete llms.txt documentation index"]

## 26. Biggest Strengths (with evidence)

1. **Citations are first-class and productized.** Inline numbered `[1]`, source-typed `[web:1]`, a billed citation-token category for Deep Research, and a guaranteed "at least one citation in the final answer" for research presets. No competitor productizes citations this deeply at the API level. [Source: https://docs.perplexity.ai/changelog + https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
2. **Multi-provider Agent API with one key.** OpenAI, Anthropic, Google, xAI, Z.AI, Moonshot AI, NVIDIA — all at direct provider token rates with no markup, with unified web search tools. [Source: https://docs.perplexity.ai/getting-started/pricing + https://docs.perplexity.ai/getting-started/quickstart, accessed 2025-11-07]
3. **MCP-native.** Remote MCP server at api.perplexity.ai/mcp with three scoped tools (ask/reason/research) — meeting AI agents where they live. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
4. **Pro Search as an honest agent.** Multi-step web search + URL fetch + code sandbox, with streamed progress and cancellation. [Source: https://docs.perplexity.ai/getting-started/pricing + https://docs.perplexity.ai/changelog, accessed 2025-11-07]
5. **Granular cost control** via search_context_size + search_type + reasoning_effort dials. [Source: https://docs.perplexity.ai/getting-started/pricing + https://docs.perplexity.ai/changelog, accessed 2025-11-07]

## 27. Biggest Weaknesses (with evidence)

1. **4-axis choice overload** (Focus × Pro × Model × Context-Size) — four reinforcing dials for the same goal ("deep answer"), with no single "do the right thing" default beyond `search_type: auto`. Power users benefit; casual users face decision fatigue. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
2. **Trust bounded by web source quality.** Perplexity can cite a wrong-but-well-ranked page; it has no notion of user-curated trusted sources (unlike NotebookLM). [Inferred from architecture — knowledge = live web, no persistent user knowledge graph documented in API]
3. **Pro Search latency.** Multi-step search + fetch can take 30–90s; the `auto` mode is the only mitigation. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07 — multi-step described; "fast (default) Standard Sonar Pro behavior" implies pro is non-default for latency reasons]
4. **No persistent cross-session memory of *learnings*.** Memory is per-thread and per-Space-instructions; there is no "what I now know" knowledge graph the way NotebookLM's source-grounded notebook functions as durable curated knowledge. [Not directly observed — UI]
5. **Cloudflare-blocked public surfaces** (perplexity.ai, hub, pricing, blog) block direct inspection/scraping, friction for researchers and AI agents alike. [Observed: curl returns "Just a moment... Enable JavaScript and cookies to continue" — Source: https://www.perplexity.ai/, accessed 2025-11-07]

## 28. What should MiMo learn?

1. **Citations as a first-class output type**, not a UI decoration — including source-typed citations (`[web:1]`) distinguishing tool-derived claims from user-artifact-derived claims. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
2. **A "research depth" dial** (reasoning_effort low/medium/high) with explicit token-cost implications surfaced to the user. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — Sonar Deep Research reasoning effort]
3. **Streamed progress + cancellation** for any multi-step agent run, as a first-class protocol affordance. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07 — MCP progress streaming]
4. **MCP-native API surface** so AI agents can adopt without bespoke integration. [Source: https://docs.perplexity.ai/changelog, accessed 2025-11-07]
5. **An `auto` mode** that classifies query complexity and only invokes expensive multi-step search when warranted — a critical UX mitigation for the 4-axis overload. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07 — `auto` search_type]
6. **Per-Space custom instructions + attached files** as a scoped agent context — a clean model for "project-scoped memory + knowledge." [Not directly observed — UI, but a widely-cited Perplexity feature]

## 29. What should MiMo reject?

1. **The 4-axis choice overload** (Focus × Pro × Model × Context). MiMo should collapse these into ONE meaningful depth dial + a single "scope" selector (where to look), with `auto` as the default. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07]
2. **Treating the live web as the only knowledge source.** MiMo's Memory + Knowledge model is more like NotebookLM (user-curated sources) than Perplexity (ephemeral web). Borrow Perplexity's *citation discipline*, not its *epistemology*. [Source: contrast with https://blog.google/technology/ai/introducing-notebooklm-google-ai/ (NotebookLM), accessed 2025-11-07 — see notebooklm.md]
3. **Cloudflare-blocking the public marketing/help surfaces** — friction for researchers and AI agents that want to self-serve. [Observed: perplexity.ai 403/JS-challenge, accessed 2025-11-07]
4. **Citation tokens as a billed category** — this is a cost-mechanism detail that makes sense for an API metering model but should NOT be exposed to MiMo's end users as a "depth" they pay for in citations. [Source: https://docs.perplexity.ai/getting-started/pricing, accessed 2025-11-07 — Sonar Deep Research $2/1M citation tokens]

## 30. Confidence Score (0-100) with reasoning

**Confidence: 62/100.**

Reasoning:
- (+) Strong PRIMARY evidence on the API surface, model lineup, pricing, citation format, Pro Search mechanics, Agent API presets, MCP server, tools, and changelog direction — all from server-rendered official docs at docs.perplexity.ai (no Cloudflare challenge) accessed 2025-11-07.
- (+) The docs are explicit, recent (changelog July 2026), and internally consistent (pricing ↔ model cards ↔ changelog ↔ quickstart all agree).
- (−) Could NOT directly observe the in-app UI (perplexity.ai, hub, blog all Cloudflare-JS-challenged). Claims about sidebar layout, Collections/Spaces panel UX, Pro Search clarifying-question flow, Sparkpage, Memory feature, mobile vs desktop — are marked "Not directly observed" and rely on widely-documented knowledge rather than primary capture this session.
- (−) web_search and page_reader SDK returned HTTP 429 for the entire session, limiting freshness corroboration.
- (−) Sparkpage and in-app Memory are flagged "not directly verified" — these claims should be re-verified in a future non-429, non-Cloudflare-blocked session.

Confidence is high for API/developer-facing claims (~85) and lower for consumer-UI claims (~40); blended 62.
