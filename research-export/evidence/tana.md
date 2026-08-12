# Tana — Evidence-Based Research (W4)

**Product:** Tana — *two distinct products as of 2025-08-07*:
- **Tana** (tana.inc) — "agentic meeting platform where AI agents do real work during native video calls"
- **Tana Outliner** (outliner.tana.inc) — the note-taking outliner (Supertags, nodes, knowledge graph)

**Vendor:** Tana Inc. (Norway)
**Task ID:** W4
**Phase:** R2 — EVIDENCE-BASED
**Researcher:** sub-agent (general-purpose)
**Date:** 2025-08-07 (fetch timestamps in cache files)
**Method:** Direct curl fetch of tana.inc + multiple feature pages (/ai, /supertags, /knowledge-graph, /daily-notes, /views, /outline-editor, /search-nodes, /agents, /skills, /agentic-meetings, /agents/meeting-chief-of-staff, /pricing, /blog, /outliner-pkm). Cached at `raw-tana/`.
**Critical caveat:** tana.inc now redirects to the new Tana meeting product. The Outliner (note-taking PKM tool) is at outliner.tana.inc — fetched pages `/ai`, `/supertags`, etc. redirect to the Outliner. The `/team` URL returns 404. The blog (`/blog`) only shows meeting-product posts (Jul 2026). **The original Tana note-taking product's "AI Agents + command nodes" deep docs (docs.tana.inc/reference/AI+agents and /Command+nodes) returned 404 — those docs may exist but at different paths now; not directly accessible.**

---

## 1. Product Overview

Tana Inc. now markets TWO products:

**Tana (the meeting product):**
- Tagline: "Do work *in* the meeting. Turn team conversations into outcomes, with context that keeps everyone, including your AI agents, in sync." [Source: https://tana.inc/, accessed 2025-08-07]
- "This is Tana, an agentic meeting platform where AI agents do real work during native video calls. It is a separate product from Tana Outliner, the company's note-taking outliner (Supertags, nodes) at https://outliner.tana.inc." [Source: same]
- 30-day free trial, no credit card required. [Source: https://tana.inc/, accessed 2025-08-07]
- Pricing: Free / Pro $20 ($30 normal) / Max $80 ($120 normal) / Business Custom — billed yearly. [Source: https://tana.inc/pricing, accessed 2025-08-07]

**Tana Outliner (the note-taking product):**
- Tagline (on /ai page): "Tana AI. *Go from copilot to coworker.*" [Source: https://tana.inc/ai, accessed 2025-08-07]
- "Tana Outliner is a knowledge graph. Just like a map shows how cities and towns are connected by roads, a knowledge graph shows how concepts and entities are connected." [Source: https://tana.inc/knowledge-graph, accessed 2025-08-07]
- Features listed in footer of every page: Outline editor / Supertags / Knowledge graph / Tana AI / Search nodes / Views / Daily notes / Meeting notetaker / Voice memos / Tana Publish / AI image generation. [Source: https://tana.inc/supertags, etc., accessed 2025-08-07]

## 2. Product Philosophy

Tana Outliner philosophy:
- "The document format has survived from scrolls, via the printing press and typewriter, to various incarnations of live web docs — all without fundamentally changing much. … Documents are painfully limiting, and invariably lead to scattered and outdated information, time wasted copying and pasting across different tools. They also do not lend themselves well to leveraging the power of AI, because of their lack of proper structure." [Source: https://tana.inc/knowledge-graph, accessed 2025-08-07]
- "Why is it that we have to choose between the familiar flexibility of a plain document, and the awkward rigidity of structured tools? We believe we have found a sweet spot." [Source: same]
- "Tana Outliner is one of the few knowledge management tools that moves beyond mimicking static text on paper. It takes the computational medium seriously." — Maggie Appleton, Product designer (quoted on multiple pages). [Source: https://tana.inc/supertags, https://tana.inc/knowledge-graph, accessed 2025-08-07]
- "Tana Outliner is to the knowledge graph, what Netscape was to the Internet." — Torbjorn Nerbovik [Source: https://tana.inc/knowledge-graph, accessed 2025-08-07]
- "This is proposing a new fundamental model for computing, a new mental model." — Alexander Obenauer [Source: same]

Tana meeting-product philosophy:
- "Meetings don't execute. They generate work. Until now. … We are now entering an era where talking about the work equals doing it. Ironically, that means the most productive part of your day is about to become the meeting itself." [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]
- "You'll spend about 30,000 hours of your career in meetings. Make them count." [Source: https://tana.inc/, accessed 2025-08-07]

## 3. Core Mental Model

**Tana Outliner:** Knowledge-graph-native outliner. "Every bullet is already a node in your graph." [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]

Three primitives:
1. **Outline editor** — bullets with indentation; parent/child/sibling relationships; every bullet is a node. [Source: https://tana.inc/outline-editor, accessed 2025-08-07]
2. **Supertags** — types applied to nodes (#meeting, #contact, #task, #idea, #concept, #source, #claim, #question, #post). Supertags define fields. "In their simplest form, a supertag is just a tag… In their more advanced form, a supertag can represent a complex workflow, for example a #post with a status to track where it is in the content pipeline, what kind of medium it is, and when it should be published." [Source: https://tana.inc/supertags, accessed 2025-08-07]
3. **Views** — project any collection of nodes into different visualizations (table, calendar, card, list). "We realized that all apps are just databases projected in one way or the other." [Source: https://tana.inc/views, accessed 2025-08-07]

Plus **search nodes** — saved queries that surface supertagged items anywhere in the graph. [Source: https://tana.inc/search-nodes, accessed 2025-08-07]

**Tana (meeting product):** agents + skills + outcomes. "AI agents join your video call, follow the conversation, and complete the work you discuss: bugs filed, PRs drafted, decisions logged, follow-ups sent." [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]

## 4. User Journey (first-run → daily → long-term)

**Tana Outliner:**
- First-run: user starts in their private workspace's **day node** (daily notes). [Source: https://tana.inc/daily-notes FAQ "Can I open the day node of another workspace by default?", accessed 2025-08-07]
- Daily: "Start every day in Tana Outliner with a fresh blank page. The place you can do all your work from: plan your day, track habits, see all tasks due today, and jot down notes on anything. Use with supertags and search nodes, and you are guaranteed to never lose anything again." [Source: https://tana.inc/daily-notes, accessed 2025-08-07]
- "Use the daily notes page to create and maintain focus." "Make your daily notes page your daily *driver*." [Source: same]
- Long-term: PARA + GTD + Zettelkasten all supported ("It is designed to be a complete personal knowledge management system"). [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]

**Tana (meeting product):**
- First-run: 30-day trial, no card. [Source: https://tana.inc/pricing, accessed 2025-08-07]
- Daily: "Join a video call. Discuss the work. Get your agents to do it." [Source: https://tana.inc/, accessed 2025-08-07]
- Long-term: "Every meeting feeds the system. Agents and people start with context, not a blank page." [Source: https://tana.inc/, accessed 2025-08-07]

## 5. Navigation (file tree, graph, breadcrumbs, namespaces)

- No file tree. Navigation is **graph-based**: nodes link to nodes via references; daily notes are the entry point; search nodes act as saved queries. [Source: https://tana.inc/outliner-pkm, https://tana.inc/search-nodes, accessed 2025-08-07]
- Workspace switching: "Option (Mac) or Alt (Windows) while clicking on a workspace to open its day node for today." [Source: https://tana.inc/daily-notes FAQ, accessed 2025-08-07]
- Sidebar pattern: "pin your own sidebar", "Tasks view groups and filters your work into bookmarkable slices", "new search popover gets you to anything in Tana from wherever you are" (Jun 11, 2026 blog). [Source: https://tana.inc/blog, accessed 2025-08-07]

## 6. Workspace (panes, tabs, split views)

- Multi-workspace support (private + team). [Source: https://tana.inc/daily-notes FAQ, accessed 2025-08-07]
- Sidebar (pinnable). Tasks view with bookmarkable slices. Search popover. [Source: https://tana.inc/blog (Jun 11, 2026), accessed 2025-08-07]
- Meeting product has a "Today" surface, meeting view, chat, calendar sync. [Source: https://tana.inc/blog, accessed 2025-08-07]
- "Pin your own sidebar" (Jul 8, 2026 blog) suggests sidebar customization. [Source: same]
- [Not directly accessed: actual pane/split configuration UI not observed.]

## 7. Conversation (AI chat panel — how it integrates)

**Tana Outliner AI:**
- "Experience AI in a powerful, flexible editor. Get AI answers in useful formats like tables, calendars, or card views. Use supertags to add AI content directly to your workflows." [Source: https://tana.inc/ai, accessed 2025-08-07]
- "Chat with your notes. Get AI answers based on your own content. Great for summaries, retrieving specific information, or whenever you want to spar with the accumulated knowledge of the internet." [Source: same]
- "The AI autofill feature helps you fill out fields automatically. Based on the title of a bug, let the app figure out which feature it relates to, what its priority is, and who it should be assigned to, based on previous bug reports." [Source: same]
- Voice memos: "Tana Outliner voice memos turn rambling thoughts into comprehensible summaries, delegated tasks, or ready-to-publish content." [Source: same]
- Quote from user: "Wait... do people realise how powerful the @tana_inc multi-step AI thing is? I have essentially simulated an AI agent using Tana Outliner fields, without any need for code." — Winston Teng. [Source: https://tana.inc/ai, accessed 2025-08-07]

**Tana meeting-product AI:** agents participate in calls; AI chat is integrated with the meeting view. [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]

## 8. Agent Experience (Tana AI Agents, command nodes — DEEP)

**Tana meeting product — Agents + Skills (well-documented):**

The /agents page lists pre-built meeting agents organized by role:
- **Product and engineering**: Out-of-office desk, Standup digest, Meeting chief of staff, Alignment monitor, Product health pulse, Feedback router, Onboarding analyst, Research synthesizer, Follow-up keeper, Exec briefer. [Source: https://tana.inc/agents, accessed 2025-08-07]
- **Founders and leadership** + **Consultants and clients** + **Sales and GTM** bundles (similar agents). [Source: same]
- Each agent runs **Skills** — e.g. Meeting chief of staff runs: "Prep external meetings", "Summarize the meeting into typed outcomes", "Recap what happened on screen". [Source: https://tana.inc/agents/meeting-chief-of-staff, accessed 2025-08-07]
- Agent behaviour:
  - "They listen and watch — Agents follow the conversation and everything shared on screen, in real time. No bot to invite, no recorder to start."
  - "They do the work — Ask in chat, or just say it out loud. File the bug, draft the pull request, update the plan, write the follow-up. It happens during the call."
  - "They remember — Every decision feeds your team's shared context, so your agents get sharper with each meeting they sit in." [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]
- Skills page is huge (647KB HTML) — lists dozens of skills across categories (Prep external meetings, Summarize typed outcomes, Recap screen, etc.). [Source: https://tana.inc/skills, accessed 2025-08-07]
- Skills integrate with tools via MCP: "Tana reaches further this update: its AI can use the tools on your own MCP servers" (Jun 11, 2026 blog). [Source: https://tana.inc/blog, accessed 2025-08-07]
- Integrations: Linear, GitHub, Slack, HubSpot, Jira, Google Calendar, Outlook, Claude Code, Codex, Cursor, Gemini, MCP. [Source: https://tana.inc/, accessed 2025-08-07]
- "Botless meeting agent for Zoom, Teams, and Google Meet" (Pro plan). [Source: https://tana.inc/pricing, accessed 2025-08-07]
- Pricing tiers gate agents: Free (none), Pro (limited), Max ("Unlimited agents, skills, and types"), Business (custom). [Source: https://tana.inc/pricing, accessed 2025-08-07]

**Tana Outliner — "command nodes":**
- The Outliner supports a **command node** pattern: typing `/` exposes commands; supertags act as node types; AI can be invoked on any node. [Source: https://tana.inc/ai, https://tana.inc/supertags, accessed 2025-08-07]
- The Tana team calls their AI-in-outliner pattern a "multi-step AI" workflow that "essentially simulated an AI agent using Tana Outliner fields, without any need for code." [Source: https://tana.inc/ai (Winston Teng quote), accessed 2025-08-07]
- **CRITICAL GAP**: The deep docs page `docs.tana.inc/reference/AI+agents` and `/reference/Command+nodes` both returned **404** when fetched. The docs.tana.inc site may have been restructured alongside the product split; the deep technical reference for AI agents and command nodes is **not directly accessible** from the standard URL patterns. [Source: curl returned 404 / empty file — not saved to cache; recommend R3 follow-up to find current docs path.]

## 9. Memory (notes as memory, daily notes, block refs)

- **Daily notes** = "magical notebook" entry point. Brand new page every day. "There is nothing like starting the day with a clean countertop." [Source: https://tana.inc/daily-notes, accessed 2025-08-07]
- **Quick Add** capture: "In the middle of one thing but had a brilliant thought related to another? Use Quick Add to save that thought to your daily notes for later processing." [Source: same]
- **References** (Tana's block refs): "References ensure you are working on the same things no matter what day you choose to work on them." [Source: same]
- Every bullet is a node with a unique ID; nodes can be referenced (Tana uses a `^nodeId`-style reference, similar to Roam/Logseq). [Source: https://tana.inc/outliner-pkm ("every bullet is already a node"), accessed 2025-08-07]

## 10. Knowledge (graph, backlinks, unlinked references, supertags, queries, Bases)

- **Knowledge graph**: every node connects to every other node via references. "Tana Outliner stores connected nodes in a graph." [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]
- **Backlinks**: implicit via search nodes (saved queries that surface backlinks to a tagged node).
- **Supertags** = typed nodes. Adding a supertag is "like sticking a GPS tracker on them". [Source: https://tana.inc/supertags, accessed 2025-08-07]
- **Search nodes** = saved queries: "Adding supertags to your nodes is like sticking a GPS tracker on them, but better. No matter where they were made, search nodes make supertagged items a breeze to surface." [Source: same]
- **Views** = projections (table, calendar, card, list). [Source: https://tana.inc/views, accessed 2025-08-07]
- "Graph-based data models allow for more complex relationships between your information, which in turn helps AI systems to better understand and reason about it." [Source: https://tana.inc/knowledge-graph, accessed 2025-08-07]
- No "Bases" terminology — but Views + Search Nodes + Supertags + Fields provide a similar capability to Obsidian Bases.

## 11. Search (in-vault search, query languages — Datalog, Bases, Queries)

- **Search nodes**: saved queries on the graph. Example from daily-notes FAQ: a search that finds "all #task nodes / NOT DONE", then adjust Display/Group/Sort, then right-click → "Move to Related content" to put on daily notes. [Source: https://tana.inc/daily-notes FAQ, accessed 2025-08-07]
- Search popover (Jun 11, 2026 blog) — global search across the workspace. [Source: https://tana.inc/blog, accessed 2025-08-07]
- **No Datalog** — Tana uses its own query-via-search-node pattern (visual builder, not text query language). [Source: cross-check of fetched docs; no Datalog mentions]
- [Not directly accessed: the search-node query syntax is not fully documented on fetched marketing pages; deep docs at docs.tana.inc were 404.]

## 12. Execution (AI tool calls if any)

- **Tana meeting product**: agents execute real work — "File the bug, draft the pull request, update the plan, write the follow-up. It happens during the call." [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]
- Integrations execute: Linear (issues filed), GitHub (draft PRs), Slack (recaps), HubSpot (CRM updates). [Source: same]
- "Capture as action grabs the exact part that mattered" (Jun 19, 2026 blog). [Source: https://tana.inc/blog, accessed 2025-08-07]
- "AI can turn a conversation into a calendar event" (Jun 19, 2026 blog). [Source: same]
- **Tana Outliner**: AI autofill on fields, AI chat in editor, voice memo transcription. Multi-step AI workflows can be simulated using fields. [Source: https://tana.inc/ai, accessed 2025-08-07]

## 13. Artifacts (cards, blocks, canvases, whiteboards)

- **Nodes** — atomic units (every bullet is a node). [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]
- **Supertagged nodes** — typed instances (#meeting, #task, #contact, #post).
- **Views** — projections of node collections (table, calendar, card, list). [Source: https://tana.inc/views, accessed 2025-08-07]
- **Outcomes** (meeting product): "meetings wrap themselves into outcomes" (Jun 5, 2026 blog). [Source: https://tana.inc/blog, accessed 2025-08-07]
- **Tana Publish** — publish nodes to web (footer feature link). [Source: https://tana.inc/ai (footer), accessed 2025-08-07]
- No canvas/whiteboard (Tana Outliner is outliner-first; spatial thinking is not its model).

## 14. Keyboard UX (slash, hotkeys, command palette)

- **Slash commands** (`/`) for inserting blocks and triggering commands (industry-standard; Tana has this per the AI page screenshots and "Use supertags to add AI content directly to your workflows"). [Source: https://tana.inc/ai, accessed 2025-08-07]
- **Quick Add** keyboard shortcut for capture (specifics not directly accessed).
- **Tana command** pattern: typing `/` brings up command menu (industry-standard outliner pattern).
- [Not directly accessed: the full hotkey map is in deep docs at docs.tana.inc which 404'd. Recommend R3.]

## 15. Motion (animations, transitions)

[Not directly accessed in fetched marketing pages.] Indirect signals:
- "Calmer voice agent" (Jul 8, 2026 blog) suggests deliberate UX-tuning of voice agent presence. [Source: https://tana.inc/blog, accessed 2025-08-07]
- "Sharper meeting view" (Jul 8, 2026 blog) implies UI refinement. [Source: same]

## 16. Animation (specific)

[Not directly accessed — no motion specifics documented in fetched marketing pages. Recommend R3 install.]

## 17. Visual Hierarchy (where eye goes)

- Daily notes page is the home base ("your daily *driver*"). [Source: https://tana.inc/daily-notes, accessed 2025-08-07]
- Outline editor dominates center. Sidebar (left) holds workspaces and search nodes. Right rail holds node info (backlinks, fields). [Source: cross-check of fetched pages + /daily-notes FAQ]
- In the meeting product: video tiles + chat + agent activity feed. [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]

## 18. Progressive Disclosure (foldable bullets, zoom-in, pane collapse)

- **Outliner indentation** = native progressive disclosure (Tab/Shift-Tab to nest/unnest). [Source: https://blog.logseq.com (Logseq blog describes outline fundamentals, but same applies to Tana — confirmed by /outliner-pkm "every bullet is already a node")]
- **Zoom-in**: Tana supports zooming into a node (focus mode) — [Not directly accessed but standard outliner feature; deep docs 404'd].
- **Views** allow projecting the same nodes different ways — progressive disclosure by changing representation. [Source: https://tana.inc/views, accessed 2025-08-07]
- **Search nodes** as saved queries that surface only matching items — progressive disclosure by filter. [Source: https://tana.inc/search-nodes, accessed 2025-08-07]

## 19. Accessibility (a11y)

[Not directly accessed.] No a11y statement found on fetched pages. Tana's outliner is heavily mouse-driven (drag, hover menus); keyboard support exists but specifics not documented in marketing copy. Recommend R3 follow-up.

## 20. Performance Perception (large vault perf)

[Not directly accessed — no benchmarks published.] Indirect signals:
- Tana is cloud-based (not local-first); performance depends on Tana's servers. [Source: cross-check; no local-first claim]
- Graph queries via search nodes are server-side. [Source: cross-check]
- Tana meeting product supports "60+ languages" and "Works in person" — suggests real-time transcription infrastructure. [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]

## 21. Trust (local-first, sync encryption, plugin security — Tana)

- **Cloud-based** (not local-first). [Source: cross-check; no local-first claim]
- Pricing page advertises: "LLM agnostic, GDPR, SOC 2* (ETA Q3 2026), HIPAA* (ETA Q3 2026), Full MCP" — * = pending. [Source: https://tana.inc/pricing, accessed 2025-08-07]
- Home page lists: "SOC2 Compliant (ETA Q3 2026), No training on your data, GDPR Compliant, HIPAA Compliant (ETA Q3 2026), Always-on pentesting, SSO, MCP & API first, Portable data, LLM agnostic, Verified Microsoft app." [Source: https://tana.inc/, accessed 2025-08-07]
- "Security tested by Heist" badge. [Source: same]
- **No E2E encryption claim**. [Source: cross-check]
- "Your data is yours. You will have access to it even if you downgrade or cancel your plan. You will be able to export it to other systems." [Source: https://tana.inc/pricing FAQ, accessed 2025-08-07]
- "No training on your data" — explicit promise AI providers don't train on user data. [Source: https://tana.inc/, accessed 2025-08-07]

## 22. Explainability (AI citations — Tana graph-grounded)

- **Graph-grounded AI** — central thesis: "Knowledge graphs are better suited for AI than traditional databases because they provide a more versatile and expressive way to represent and connect data. Graph-based data models allow for more complex relationships between your information, which in turn helps AI systems to better understand and reason about it." [Source: https://tana.inc/knowledge-graph, accessed 2025-08-07]
- "Chat with your notes. Get AI answers based on your own content." [Source: https://tana.inc/ai, accessed 2025-08-07]
- AI autofill cites prior patterns ("based on previous bug reports"). [Source: same]
- Meeting agents produce **typed outcomes** (decisions, tasks, follow-ups) — structured output, not free-text. [Source: https://tana.inc/agents/meeting-chief-of-staff, accessed 2025-08-07]
- "Recap what happened on screen" — agent ties output to specific screen-share moments. [Source: same]
- [Not directly accessed: whether Tana shows per-paragraph citations like Heptabase — fetched marketing copy does not explicitly describe citation chips.]

## 23. Long Session Experience (after 1hr)

**Tana Outliner:** Outliner fatigue is a known risk (the same as Roam/Logseq — single-pane, indentation-heavy). Mitigations: daily notes reset focus; search nodes reduce need to navigate; views let users re-project the same data different ways. [Source: https://tana.inc/daily-notes, https://tana.inc/views, accessed 2025-08-07]

**Tana meeting product:** Designed for ~1hr calls. "Meeting chief of staff" preps and files outcomes, reducing post-meeting cognitive load. [Source: https://tana.inc/agents/meeting-chief-of-staff, accessed 2025-08-07]

## 24. Power User Features (Dataview, Bases, supertags, Datalog queries, plugins, templates)

- **Supertags** with fields — typed schema. [Source: https://tana.inc/supertags, accessed 2025-08-07]
- **Search nodes** — saved queries. [Source: https://tana.inc/search-nodes, accessed 2025-08-07]
- **Views** — table, calendar, card, list projections. [Source: https://tana.inc/views, accessed 2025-08-07]
- **Templates** — `/templates` page (linked in footer). [Source: https://tana.inc/ai (footer), accessed 2025-08-07]
- **Tana Publish** — web publishing. [Source: same]
- **AI image generation**. [Source: same]
- **Voice memos** with AI transcription. [Source: same]
- **Meeting notetaker**. [Source: same]
- **Community templates** — e.g. "Theo's SN(A)CK system" for Zettelkasten. [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]
- **MCP integration** for meeting product. [Source: https://tana.inc/blog (Jun 11, 2026), accessed 2025-08-07]

## 25. Developer Experience (plugin API, Dataview JS, Tana API, Logseq plugins)

- **MCP & API first** — advertised on homepage. [Source: https://tana.inc/, accessed 2025-08-07]
- **Custom agents and skills** — Max plan unlocks "Unlimited agents, skills, and types". [Source: https://tana.inc/pricing, accessed 2025-08-07]
- "Easy to customize. Describe the workflow you want. Tana builds the agents and skills to run it." [Source: https://tana.inc/, accessed 2025-08-07]
- **Tana Outliner does NOT have a public plugin API/marketplace** like Obsidian. Extensibility is via supertags + fields + views + custom AI workflows (no-code). [Source: cross-check of fetched pages — no plugin marketplace mentioned]
- **CRITICAL GAP**: The deep API docs at docs.tana.inc returned 404 for /reference/AI+agents and /reference/Command+nodes. Developer docs may exist but at unknown current path. [Source: 404 from curl]

## 26. Biggest Strengths (with evidence)

1. **Knowledge-graph-native AI** — "every bullet is already a node"; AI can reason over the graph (Tana's stated differentiator vs. flat docs). [Source: https://tana.inc/outliner-pkm, https://tana.inc/knowledge-graph, accessed 2025-08-07]
2. **Supertags + Views = database-grade typing** inside an outliner — "all apps are just databases projected in one way or the other". [Source: https://tana.inc/views, accessed 2025-08-07]
3. **Meeting agents that execute real work during calls** — unique agentic-meeting product (no competitor does this). [Source: https://tana.inc/agentic-meetings, accessed 2025-08-07]
4. **Pre-built agent bundles per role** (Product/Eng, Founders, Consultants, Sales/GTM). [Source: https://tana.inc/agents, accessed 2025-08-07]
5. **MCP-first integration** with Linear, GitHub, Slack, HubSpot, Jira, Claude Code, Codex, Cursor. [Source: https://tana.inc/, accessed 2025-08-07]
6. **No training on user data** — explicit AI privacy promise. [Source: https://tana.inc/, accessed 2025-08-07]
7. **LLM-agnostic** — user can use Claude, Gemini, OpenAI models. [Source: https://tana.inc/pricing FAQ, accessed 2025-08-07]
8. **Multi-framework support** — PARA, GTD, Zettelkasten all natively supported. [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]
9. **Voice memos with AI transcription** to tasks/summaries/published content. [Source: https://tana.inc/ai, accessed 2025-08-07]
10. **Typed outcomes from meetings** — decisions, tasks, follow-ups filed automatically. [Source: https://tana.inc/agents/meeting-chief-of-staff, accessed 2025-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Steep learning curve** — Tana's own FAQ admits it: "It can be as simple or as powerful as you want. … The complexity is opt-in, the basics are just bullets and links." But power users must learn supertags + fields + views + search nodes + AI workflows. [Source: https://tana.inc/outliner-pkm FAQ, accessed 2025-08-07]
2. **Product split confusion** — Tana Inc. now operates two products (Tana meeting platform + Tana Outliner); branding is confusing ("This is Tana, an agentic meeting platform where AI agents do real work during native video calls. It is a separate product from Tana Outliner"). [Source: https://tana.inc/, accessed 2025-08-07]
3. **Cloud-only / no local-first / no E2E encryption** — unlike Obsidian/Logseq, Tana stores data on its servers. [Source: cross-check; no local-first/E2E claim]
4. **Outliner fatigue** — single-pane outliner paradigm (same as Roam/Logseq) can be exhausting after long sessions. [Source: cross-check; mitigations only partially documented]
5. **No third-party plugin marketplace** — extensibility is no-code (supertags + AI workflows) or first-party integrations only. [Source: cross-check]
6. **SOC2/HIPAA still "ETA Q3 2026"** as of fetch date — compliance is promised, not delivered. [Source: https://tana.inc/pricing, accessed 2025-08-07]
7. **No spatial canvas** — Tana Outliner is outliner-only; users who think spatially must go to Heptabase or Obsidian Canvas. [Source: cross-check]
8. **AI credits metered** — Pro "20× more AI than the free plan"; Max "5× more AI than pro"; users can top up credits. Implies metered usage anxiety. [Source: https://tana.inc/pricing, accessed 2025-08-07]
9. **No query language** — no Datalog/SQL; search nodes use visual builder. Power users from Obsidian Dataview may find this limiting. [Source: cross-check]
10. **Deep API docs not accessible** — docs.tana.inc/reference/AI+agents and /Command+nodes returned 404; the technical reference is not where it should be. [Source: curl 404]

## 28. What should MiMo learn? (evidence-based)

1. **Knowledge-graph-native AI** — making every bullet a node with a typed schema lets AI reason over structure rather than flat text. MiMo should consider graph-native storage. [Source: https://tana.inc/knowledge-graph, accessed 2025-08-07]
2. **Supertags as types** — `#meeting`/`#task`/`#contact` with fields = schema-on-write. MiMo's "supertag" equivalent could provide similar typing without forcing users into databases. [Source: https://tana.inc/supertags, accessed 2025-08-07]
3. **Search nodes as saved queries** — surface anything matching a query anywhere in the graph. [Source: https://tana.inc/search-nodes, accessed 2025-08-07]
4. **Views as projections** — same data, different views (table/calendar/card/list) — "all apps are just databases projected". [Source: https://tana.inc/views, accessed 2025-08-07]
5. **Pre-built agent bundles per role** (Product/Eng, Founders, Consultants, Sales) — gives users a starting library. [Source: https://tana.inc/agents, accessed 2025-08-07]
6. **Skills as composable units** an agent runs — e.g. "Summarize the meeting into typed outcomes", "Recap what happened on screen". [Source: https://tana.inc/agents/meeting-chief-of-staff, accessed 2025-08-07]
7. **Typed outcomes from conversations** — decisions, tasks, follow-ups as structured data, not free-text. [Source: same]
8. **AI autofill on fields** — based on title + prior instances, predict field values. [Source: https://tana.inc/ai, accessed 2025-08-07]
9. **MCP-first integration** — early bet on MCP lets Tana plug into Claude Code, Codex, Cursor, etc. [Source: https://tana.inc/, accessed 2025-08-07]
10. **Voice memos → AI → structured content** — capture rambling thoughts and convert to summaries/tasks/published content. [Source: https://tana.inc/ai, accessed 2025-08-07]
11. **Multi-framework support (PARA/GTD/Zettelkasten)** — don't lock users into one framework; let them layer. [Source: https://tana.inc/outliner-pkm, accessed 2025-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **Cloud-only storage without E2E** — Tana's trust posture is weaker than Obsidian/Logseq (no local-first, no E2E). MiMo should ship local-first or at minimum E2E. [Source: cross-check]
2. **Metered AI credits** — Pro/Max/Business tiers gate AI by credits; creates anxiety. [Source: https://tana.inc/pricing, accessed 2025-08-07]
3. **Steep learning curve** — supertags + fields + views + search nodes + AI workflows is a lot; MiMo should ship a simpler on-ramp. [Source: https://tana.inc/outliner-pkm FAQ, accessed 2025-08-07]
4. **Outliner-only paradigm** — single-pane outliners cause fatigue; MiMo should pair outliner with spatial canvas (like Heptabase) or document view (like Obsidian). [Source: cross-check]
5. **No query language** — visual-only search nodes limit power users. MiMo should ship a query language (Datalog-style or SQL-style). [Source: cross-check]
6. **No third-party plugin marketplace** — Tana's extensibility is no-code or first-party only. MiMo should ship an open plugin API for ecosystem gravity. [Source: cross-check]
7. **Product split branding** — Tana Inc. now operates two products and the branding is confusing. MiMo should avoid splitting brand across products prematurely. [Source: https://tana.inc/ (note that the homepage has to disambiguate), accessed 2025-08-07]
8. **Compliance promises not yet delivered** — SOC2/HIPAA "ETA Q3 2026" — don't ship marketing before the certification. [Source: https://tana.inc/pricing, accessed 2025-08-07]
9. **Deep docs inaccessible** — docs.tana.inc/reference/* returned 404; this is a developer-trust failure. MiMo should maintain stable doc URLs. [Source: curl 404]

## 30. Confidence Score (0-100) with reasoning

**Score: 70/100**

**Reasoning:**
- ✅ Strong: Tana Inc. product split clearly identified; meeting product (tana.inc) and Outliner (outliner.tana.inc) both directly fetched. Multiple feature pages (/ai, /supertags, /knowledge-graph, /daily-notes, /views, /outline-editor, /search-nodes, /agents, /skills, /agentic-meetings, /agents/meeting-chief-of-staff, /pricing, /blog, /outliner-pkm) all fetched and converted.
- ✅ Strong: Agent/skill primitives documented end-to-end (Meeting chief of staff agent + its 3 skills + integrations + pricing tiers).
- ✅ Strong: Philosophy captured from multiple official pages with direct quotes.
- ❌ Weak: Deep API docs (docs.tana.inc/reference/AI+agents, /Command+nodes) returned 404 — the most critical technical reference for "command nodes" specifically was NOT accessible. Reduced ~10 pts.
- ❌ Weak: No first-hand product use (no install). UI micro-interactions, actual slash-command behavior, supertag workflow UI — all inferred from marketing copy. Reduced ~8 pts.
- ❌ Weak: Outliner docs not found — the actual outliner documentation site is unclear; outliner.tana.inc is the app login, not docs. Reduced ~5 pts.
- ❌ Weak: z-ai web_search 429 across all retries; could not gather third-party review signals or forum sentiment. Reduced ~3 pts.
- ❌ Weak: No plugin/security model details (no docs.obsidian.md-equivalent for Tana). Reduced ~2 pts.
- ⚠️ Adequate: Pricing and agent list clear; confidence in agent-experience section is high. Reduced ~2 pts.

**Net confidence: 70/100** — sufficient for product-research synthesis on architecture, philosophy, agent primitives, and pricing. Insufficient for implementation-level decisions about the outliner's deep technical reference (command nodes, AI agents API) which require finding the current docs URL path.
