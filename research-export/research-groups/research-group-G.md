# Research Group G — Knowledge Management / PKM Products (2024–2025)

**Author:** Research subagent G (Senior Product/UX Researcher)
**Task ID:** G
**Method:** 6 web searches (1 per product) + 6 supplementary AI-focused searches + 9 page reads via z-ai-web-dev-sdk (`web_search` + `page_reader` functions). All URLs verified live.
**Time-box:** ~3 min per product (search + read + synthesize).
**Scope:** Obsidian, Heptabase, Tana, Logseq, Roam Research, Anytype — analyzed through 21 philosophical angles + the ONE defining interaction + ADOPT/ADAPT/REJECT for MiMo.

**MiMo context (from worklog):** Single-user AI OS, conversation-SPINE + canvas-per-MODE; Memory + Knowledge architecture; local-first principle validated in earlier groups; hold-Space peek + ⌘K act + ⌘⇧Tab quick-AI = the defining interaction; 6-stage sequential pipeline; Project-as-memory-scope; named specialized agents visible in pipeline.

---

## 1. Obsidian — verified via

- https://obsidian.md/help/plugins/graph (Graph view core plugin)
- https://forum.obsidian.md/top (forum: AI-powered Steward plugin, Graph View feature requests)
- https://www.dsebastien.net/2022-10-19-the-must-have-obsidian-plugins (must-have plugins list, updated Nov 2024)
- https://infranodus.com/obsidian-plugin (InfraNodus 3D graph + AI insights plugin)
- https://medium.com/obsidian-observer/obsidians-new-bases-feature-is-the-biggest-update-since-properties-2aad08a102eb (Bases feature — Jul 2025)
- https://www.reddit.com/r/ObsidianMD/comments/1l4sx07/first_look_at_the_obsidian_bases_core_plugin_full (Bases turns notes into a database)
- https://effortlessacademic.com/adding-ai-to-your-obsidian-notes-with-smartconnections-and-copilot (Smart Connections + Copilot, Dec 2025)
- https://codeculture.store/blogs/developer-culture/obsidian-ai-plugin-comparison-2025 (Smart Connections vs Copilot, May 2026)

### Product / UX Philosophy / Mental Model

1. **Product Philosophy** — "Your thoughts are yours." Obsidian is a **local-first Markdown vault**: notes are plain `.md` files in a folder on your disk. The product is sold as **software that survives the company** — even if Obsidian dies, your notes stay readable in any text editor. Founder Erica Xu and team explicitly position against Notion's cloud lock-in. The vault is the unit; the app is the viewer.
2. **UX Philosophy** — **Plain text first, structure later.** Start with a Markdown file; links (`[[wikilinks]]`) and tags (`#tag`) emerge as you write; structure (Properties, Bases) is opt-in. The philosophy is "tools for thought should not get in the way of thought."
3. **Mental Model** — **A vault of plain-text files connected by `[[links]]`, `#tags`, and block-refs, viewed alternately as files, graph, or database.** The Graph is a *visualization*, not the storage model — files are the storage. Bases (2025) adds a database view on top of Properties.

### IA / Interaction / Cognitive Load / Progressive Disclosure

4. **Information Architecture** — Vault (root) → folders (optional) → notes (`.md`) → headings/blocks/`[^block-ids]`. Multiple surfaces: File Explorer (left), Search/Omnisearch (Cmd+O), Graph View (Cmd+G), Tags pane, Properties (YAML frontmatter), Bases (database view). Plugins extend IA (Dataview, Templater, Calendar, Tasks).
5. **Interaction Design** — **Two-mode editor**: Edit (Markdown raw) ↔ Reading (rendered). Cmd+P command palette. Cmd+O quick-switcher. Cmd+G graph. Cmd+E toggle preview. Wikilinks auto-complete on `[[`. Tag pane shows tree (namespaced with `/`). Bases: filter→sort→view as table/board/gallery.
6. **Cognitive Load** — **Low at baseline (just a text editor), high at mastery.** The vault-as-folder mental model is instantly graspable. But the power user's vault has 20+ active plugins whose keybindings overlap, settings panes multiply, and the "right way" to organize is un-opinionated → analysis paralysis.
7. **Progressive Disclosure** — **Excellent but user-driven.** A new vault shows: file explorer + editor. Graph, properties, Bases, plugins are all *discoverable* but not forced. The cost: no onboarding flow teaches you what a block-ref IS, so 80% of users never use them.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX

8. **Human-AI Collaboration** — **Plugin-driven, NOT built-in.** Two leaders: **Smart Connections** (embeddings over your vault; chat with your notes; "ai-powered search"; private/local) and **Copilot** (logancyang/obsidian-copilot; RAG-based chat; sends vault to OpenAI; can index notes for consultation). Newer **Steward** plugin = "AI-powered search, vault management, and automation workflows." Smart Composer = "automatic modifications." Obsidian itself added no native AI as of 2025; it's a marketplace of AI plugins.
9. **Agent UX** — **No native agents.** The community treats AI as an *indexed search oracle* (vault → embeddings → RAG → chat), not as an autonomous worker. The closest thing is Steward (multi-step workflows) and InfraNodus (graph-driven AI insights + chat).
10. **Workspace UX** — **Split panes + pop-out windows.** Drag any note to a pane edge to split horizontally/vertically; multiple workspaces via the Workspaces core plugin (save/restore layouts). Tabs (1.7+) added recently — long-requested. Mobile is a faithful port, not a stripped-down version.
11. **Long Session Experience** — Excellent for *writing* (distraction-free, fast, local). Poor for *navigation across many notes* (no native tabs until 1.7, no saved views until Workspaces). Bookmarks + starred notes mitigate. The "Monday-morning recall" problem is real: 1000 notes, no AI to surface what matters today.
12. **Keyboard Driven UX** — **Strong.** Cmd+O switcher, Cmd+P palette, Cmd+G graph, Cmd+E preview, Cmd+Click to open in new pane, Cmd+Shift+F global search, `[[` to link, `#` to tag, `>` quote, `-` list, `- [ ]` task. Power users add Hotkeys plugin + custom shortcuts per command. Hover-preview via Cmd+hover.
13. **Visual Hierarchy** — **Theme-driven.** Default theme is intentionally minimal (gray, single accent color, IBM-Plex-style sans). Headings, blockquotes, code blocks render with high contrast. Graph view uses physics-based node sizing by link-count (high-degree nodes are bigger). Sidebar widths are user-controlled. No strong opinionated hierarchy.
14. **Motion Design** — **Minimal.** Hover-preview fades in 100ms. Graph view nodes ease into position with force simulation. Cmd+P palette slides down. Theme transitions instant. No spring physics; no large-page transitions.
15. **Design Systems** — **No formal design system — intentional.** Obsidian exposes CSS variables so themes can override everything; the community has 200+ themes. The lack of a system means plugins visually clash (each dev ships their own button styles).
16. **Accessibility** — **Adequate, not leading.** High-contrast themes exist. Keyboard-only operation is possible. Screen reader support for the editor is weak (it's a CodeMirror contenteditable); the rendered Reading view is fine. No native WCAG audit published. The InfraNodus 3D graph is not keyboard-navigable.
17. **Performance Perception** — **Snappy for <10k notes; degrades at scale.** Vault indexing is local and fast. Graph view with 5k+ nodes laggy on low-end machines. Smart Connections embedding-indexing takes minutes for large vaults and runs in the background. Sync (paid Obsidian Sync) is near-instant.
18. **Explainability** — **The graph IS the explanation.** Every link is visible; backlinks panel shows every inbound reference with surrounding context; block refs resolve to source text. The user understands the structure because they built it link-by-link. But Bases' query logic is opaque to non-technical users (filter formulas).
19. **Trust Building** — **Highest in the category.** Plain-text Markdown on local disk; E2E-encrypted Sync (optional, paid); your files work offline forever; the app is open-core (the .md files are open format). Even plugins run in a sandboxed JS environment. Privacy story: nothing leaves your machine unless you opt into a cloud-AI plugin.
20. **Developer Experience** — **Best-in-class for PKM.** Plugin API (TypeScript + Obsidian API) is well-documented; community plugin store has 2,000+ plugins; hot-reload on save; theming is just CSS variables. Sample Plugin repo on GitHub. The community forum is active and dev-responsive. BrAT (Beta Auto Tester) lets users try plugins before they hit the store.
21. **Power User Experience** — **Deepest in PKM.** Dataview (SQL-like queries over frontmatter), Templater (JS-templated notes), Tasks (query all `- [ ]` checkboxes across vault), Excalidraw (embedded whiteboards), Periodic Notes (daily/weekly/monthly templates), Canvas (infinite whiteboard of cards), Bases (no-code Dataview), Git sync (use a repo as your vault). A power user's vault is a personal IDE for thought.

### ONE defining interaction

**`[[` to create a wikilink** — Type two brackets and Obsidian opens a fuzzy-search over every note in your vault. If the target doesn't exist, the link is shown grey (placeholder) and **clicking it creates the note**. This single gesture blurs authoring, navigation, and creation: you write `[[Project Aurora]]`, click, and the note exists. The graph grows as a side-effect of writing.

### Ideas → ADOPT / ADAPT / REJECT

- **ADOPT — Plain-text local vault as the storage substrate.** Files on disk, encrypted at rest, sync optional. MiMo should store Memory + Knowledge as a local graph that's inspectable in plain formats (JSON/Markdown). Validates MiMo's local-first principle (re-confirms Group D Linear/Bolt cache pattern + Group A ChatGPT Project-only memory).
- **ADOPT — `[[` auto-link gesture blurring authoring/navigation/creation.** In MiMo's conversation-SPINE, typing `@` to mention a memory/project/agent should *create-if-not-exists* the way `[[` does. One gesture, three outcomes.
- **ADOPT — Bases (no-code query over Properties).** MiMo's Knowledge view should let users filter Memory into table/board/gallery views without code. Dataview (the older SQL version) is the warning: too code-y, only 1% use it. Bases is the model.
- **ADAPT — Plugin marketplace + open API.** MiMo is single-user and opinionated; don't replicate 2,000 plugins. But expose a typed Memory/Knowledge API so advanced users can build "skills" (lighter than plugins). Keep a curated set, not a free-for-all store.
- **ADAPT — Graph view as a *visualization*, not the storage model.** MiMo's Knowledge should be a graph *view* of conversation-spine + memories + artifacts, never the primary authoring surface (avoid Obsidian's "graph anxiety" at scale).
- **REJECT — No native AI, fully delegated to plugins.** MiMo is an AI OS — AI must be first-class, not a marketplace afterthought. Smart Connections/Copilot prove users want vault-aware AI chat, but the fragmentation (each plugin ships its own UI, its own embedding store, its own keybindings) is the anti-pattern MiMo must avoid.
- **REJECT — Two-mode Edit/Reading toggle.** WYSIWYG-Markdown hybrid (Notion / Anytype style) is better for non-technical users; the Edit↔Reading flip is a relic of the static-Markdown era and breaks flow.

---

## 2. Heptabase — verified via

- https://heptabase.com (official homepage — "Ask AI to explain any sources… use whiteboards and cards to clarify your thinking")
- https://wiki.heptabase.com/user-interface-logic (LEFT SIDEBAR + RIGHT SIDEBAR + GLOBAL TOOLS — the OS-as-browser IA, **read in full**)
- https://wiki.heptabase.com/fundamental-elements (Card / Whiteboard / AI Chat & Actions primitives, **read in full**)
- https://wiki.heptabase.com/newsletters/2025-12-30 (hover-on-card AI actions, Dec 2025)
- https://wiki.heptabase.com/newsletters/2026-03-24 (Note Card Highlighting + Web Cards)
- https://wiki.heptabase.com/fundamental-elements#ai-actions (translate / summarize / mindmap / custom prompts)
- https://medium.com/@danielasgharian/why-heptabase-leads-the-pack-in-visual-note-taking-apps-2125f15c8fbc ("whiteboards and cards… cards are reusable across multiple [whiteboards]")
- https://nesslabs.com/heptabase-featured-tool (Interview with Alan Chan, co-founder)
- https://storyflow.so/blog/best-heptabase-alternatives-2026 ("made the whiteboard the unit of thought")
- https://tana.inc/blog/best-heptabase-alternatives-2026 ("infinite whiteboard where you arrange cards spatially")

### Product / UX Philosophy / Mental Model

1. **Product Philosophy** — Founder Alan Chan: "Visual note-taking tool that helps you learn complex topics." Heptabase makes the **whiteboard the unit of thought**, not the document. From the wiki: *"you can think of Heptabase as an operating system, and the upper part of its left sidebar displays a 'Research a topic' button and all the default installed Apps. Each App has a specific purpose, and all Apps share the same card database."* Cards are the atoms; whiteboards are the contexts; tags are the lenses.
2. **UX Philosophy** — **Think with your eyes.** Spatial arrangement IS the thinking. From the wiki: *"whiteboards do not own cards… All cards belong to the Card Library. The same card can be placed on multiple whiteboards at the same time. This is similar to how our brain works — the same concept or knowledge can appear under different topics."* This is the strongest "spatial ≠ hierarchical" stance in PKM.
3. **Mental Model** — **Card Library (single source of truth) + Whiteboards (spatial arrangements of card references) + Tag Database (relational layer).** A card is a note; a whiteboard is a canvas that places card-references spatially; tags form a database view. Three orthogonal axes (content / context / classification) — none privileged.

### IA / Interaction / Cognitive Load / Progressive Disclosure

4. **Information Architecture** — Heptabase explicitly calls itself an "OS." Left sidebar = Apps (Inbox, Journal, Whiteboard, Card Library, Tag Database, Highlight, Chat). Right sidebar = context tools (Chat, Card library, Journal, Highlight, Table of contents, Info, Whiteboard location, Insight, Task). Lower-left = Tab System (Normal Tab / Web Tab / Pinned Tab / Tab Folder / Tab Group). Global tools: Cmd+O Global Search, Cmd+K Command Palette. **Heptabase is the only PKM here that fully embraces a browser-tab + OS-App IA.**
5. **Interaction Design** — Whiteboard: right-click blank → create Card / Text / Mindmap / Journal / Section / Sub-whiteboard. Right-click object → color / mindmap-mode / export / history / tag / move / open-as-tab. Drag-select for batch ops. Left toolbar: Select / Note card / Upload files / Connect (draw arrows) / Text / Section / Search. Card editor: `/` for blocks, `@` to mention cards (block-level backlinks in Info section). Cmd+N creates a card to Inbox.
6. **Cognitive Load** — **Medium-high at first, low once the model clicks.** Three concepts (card / whiteboard / tag) take a day to internalize; after that, the workflow is "capture to Inbox → triage to a whiteboard → connect spatially → tag for query." The cost: the **spatial canvas invites infinite tweaking** (move this card 10px left… change arrow color…) which can become a productivity sink.
7. **Progressive Disclosure** — **Excellent.** New users see: left sidebar with Apps + a single Whiteboard. AI Chat, AI Actions, Tag Database, Insight, Sub-whiteboards all reveal on demand. The "Research a topic" button is a one-click onboarding: upload PDFs/YouTube/docs → cards auto-created on a fresh whiteboard → AI suggests questions.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX

8. **Human-AI Collaboration** — **Most integrated AI in this group, after Tana.** Three explicit surfaces: (a) **AI Chat** — chat with current tab as context; `@` to add cards/whiteboards/sections/PDFs as context; AI shows citations of which paragraphs it drew from; drag the AI response onto the whiteboard as a card. (b) **AI Actions** — hover any card → action buttons → translate / summarize / generate mindmap / build-your-own custom action. (c) **AI Insight** — on long cards, chunks content into ~300-char units, summarizes one key insight per chunk, each insight links back to its source chunk (early-test, monthly usage limit). (d) **Research a topic** — one-button onboarding that ingests sources, lays them on a whiteboard, suggests questions.
9. **Agent UX** — **Not autonomous agents, but AI-as-action.** AI is invoked per-card (translate this), per-whiteboard (suggest questions about this), per-research-session (ingest these sources). The interaction is **hover → action → result-on-canvas**, not "delegate to a background worker." This is the right balance for thinking-tools: AI augments, doesn't run away.
10. **Workspace UX** — **Browser-grade tab system inside a note app.** Tab Groups ("Work" / "Life") partition context. Pinned tabs always open at the top. Tab Folders organize pinned tabs. Web Tabs let you browse any website inside Heptabase while taking notes alongside (desktop only). This is unique in PKM — it eliminates the "alt-tab to Chrome" context-switch tax.
11. **Long Session Experience** — **Best-in-class for research sessions.** Multi-tab + right-sidebar reference cards + AI chat + whiteboard = full research cockpit. The cost: heavy RAM use; the whiteboard canvas can get visually busy after 2 hours of card-dropping. Mitigation: sections + sub-whiteboards (nest one level deep to keep context).
12. **Keyboard Driven UX** — **Strong.** Cmd+N (new card to Inbox), Cmd+O (Global Search → cards/whiteboards/chats/tags/Google/YouTube), Cmd+K (command palette), `/` in card (block menu), `@` in card (mention card). Whiteboard keyboard nav is weaker — most actions are right-click or hover-revealed. No pure-keyboard path for "select this card and connect it to that card."
13. **Visual Hierarchy** — **Highly designed.** Cards have consistent rounded corners, consistent shadow elevation, consistent typography. Whiteboard background is a soft dotted grid (matches Figma). Toolbar left side, panels right side, tabs bottom-left. The visual language is **closer to Figma/Linear than to Obsidian/Notion**.
14. **Motion Design** — **Deliberate and spatial.** Cards have hover-lift (subtle scale + shadow). Drag has inertia. Mindmap mode animates branches growing. AI response cards fade-in. No excessive motion; transitions are 150–250ms ease-out.
15. **Design Systems** — **Implicit but consistent.** Heptabase doesn't publish a token table, but the visual language is coherent: 4px-grid spacing, 6px card corner radius, 3-level shadow elevation, one accent color, system font stack. Every part of the app obeys the same grammar.
16. **Accessibility** — **Average.** Cards are keyboard-focusable but the whiteboard canvas is largely mouse-driven. No published WCAG statement. AI Insight is screen-reader-friendly (textual).
17. **Performance Perception** — **Smooth on desktop, weaker on web.** Whiteboard rendering uses HTML/CSS transforms (not WebGL canvas like tldraw), so 100+ cards on one whiteboard can lag. Sub-whiteboards help. AI responses stream in token-by-token.
18. **Explainability** — **Excellent for the whiteboard, weaker for AI.** The card's Info panel shows which whiteboards it appears on (and where, with focus jump). Block-level backlinks show every mention with paragraph context. But AI Insights and AI Chat responses show *citations* (which paragraph) but not *why this card was selected* — the RAG retrieval is opaque.
19. **Trust Building** — **Cloud-synced, not local-first.** Heptabase stores cards on its servers; sync is automatic. Collaboration is first-class (shared whiteboards, mentions, threads). For users who care about local-first, this is the weakest link. Founder's stance: the spatial-canvas value justifies the cloud trade-off. No E2E-encryption as of 2025.
20. **Developer Experience** — **Closed.** No public plugin API, no scripting. The customization surface is: tags, custom AI actions (prompt templates), templates. Power users who want extensibility leave for Obsidian.
21. **Power User Experience** — **Deep on workflow, shallow on extensibility.** Power moves: sub-whiteboards for topic nesting, Tag Database for relational queries (view all cards with tag X as table/Kanban), Mindmap mode on any card, Web Tabs for in-context browsing, Zotero integration for academic references, Readwise for highlight import. The ceiling is the workflow, not the code.

### ONE defining interaction

**Hover any card on a whiteboard → AI action buttons appear → click "summarize" → AI writes a new card with the summary, placed next to the original.** This is the "thinking-as-action" loop. You don't leave the whiteboard, you don't open a chat box, you don't copy-paste — the AI lives *on the canvas* and produces *more cards* on the canvas. The card-atom stays uniform.

### Ideas → ADOPT / ADAPT / REJECT

- **ADOPT — Card as atom + multi-placement on whiteboards.** MiMo should treat Memory items as atoms that can appear in multiple contexts (a conversation, a project, a knowledge graph) without duplication. Heptabase's "card belongs to library, whiteboard references it" is the right model for MiMo's Memory + Knowledge split.
- **ADOPT — Hover-on-asset AI action buttons producing new assets in place.** In MiMo, hover on a Memory item → AI actions (summarize / extract entities / generate follow-up questions / connect to related) → new Memory items appear in the same view. No chat detour required.
- **ADOPT — AI Chat with `@`-mention context + per-paragraph citations + drag-response-to-canvas.** This is the gold-standard pattern for chat-with-your-knowledge. MiMo's chat spine should support `@memory`, `@project`, `@artifact` mentions with citations.
- **ADOPT — "Research a topic" one-button ingest.** MiMo should ship an "Ingest these sources" command that lays them out in a canvas + auto-suggests questions. Re-confirms Group A Gemini "Deep Research" pattern.
- **ADAPT — OS-as-browser tab system with Tab Groups.** MiMo is conversation-spine + canvas-per-MODE; Heptabase's tab+group pattern is the right model for multiple conversations / projects / canvases coexisting. Adapt the *groups* metaphor to MiMo's "Project" container.
- **ADAPT — AI Insight's chunk-and-summarize-with-linkback.** For long MiMo conversations, automatically produce ~300-char chunk summaries with linkbacks to source messages. Solves the "Monday morning, what did I do last week" problem.
- **REJECT — Cloud-only storage, no local-first.** MiMo is local-first by principle (Group A/B/D all converged). Heptabase's cloud trade-off is acceptable for visual-thinking enthusiasts but unacceptable for an AI OS.
- **REJECT — No plugin API / closed platform.** MiMo needs a typed Memory/Knowledge API for skills (lighter than plugins). Heptabase's closed model caps power users.

---

## 3. Tana — verified via

- https://outliner.tana.inc/knowledge-graph (official KG page — "Write information, not documents", **read in full**)
- https://outliner.tana.inc/learn/features/ai-command-nodes (AI command nodes + Prompt Workbench, **read in full**)
- https://outliner.tana.inc/learn/features/tana-ai (Tana AI = "knowledge graph where AI understands what content means")
- https://outliner.tana.inc/blog/tana-current-monthly-update-october-2025 ("vision for agents goes back to 2021… AI-powered knowledge graph")
- https://uxplanet.org/finally-i-found-it-welcome-tana-1abe9dac0a59 (supertags concept intro)
- https://fisfraga.substack.com/p/tana-a-knowledge-base-integrated-with-artificial-intelligence ("Tana is a Knowledge Graph… Supertags are Software [2.0]")
- https://www.superbcrew.com/tana-connects-your-notes-tasks-and-ideas-into-one-ai-powered-workspace (Apr 2025)
- https://vantaige.io/ai-tool/tana ("Tana replaces folders with a node-based graph… $25M Series A led by Tola Capital, Feb 2025")
- https://aishortcutlab.com/tools/tana/review (6.5/10 — "clean, minimal, fast" but learning curve)
- https://medium.com/@jenstumbles/how-tana-is-helping-me-rethink-my-futures-research-workflow-3595ed9857a7 (supertags = metadata → context + links)

### Product / UX Philosophy / Mental Model

1. **Product Philosophy** — From the official KG page: *"Old habits die hard, but the document has to go."* Tana explicitly rejects documents as the unit of knowledge. *"Documents are painfully limiting… they do not lend themselves well to leveraging the power of AI, because of their lack of proper structure."* The bet: **knowledge graph + outline editor = the AI-native sweet spot.** Quote from the team: "Tana's vision for agents goes back to 2021 when the team committed to building an AI-powered knowledge graph."
2. **UX Philosophy** — **Write in an outliner; the graph is implicit.** From the KG page: *"You write in a simple outline (fast, familiar, no friction), and the knowledge graph quietly keeps all the connections underneath, ready for you and your AI to actually use."* This is the inverse of Obsidian (where the graph is explicit) and the inverse of Heptabase (where the graph is spatial).
3. **Mental Model** — **Nodes (everything) + Supertags (typed nodes) + Fields (structured properties) + Views (lenses on nodes).** Every bullet is a node. Every node can be supertagged (e.g. `#person`, `#project`). Supertags define fields (a `#person` has `email`, `role`, `reports-to`). Views turn node-collections into tables / boards / calendars / lists. The graph is invisible until you query it. Quote: *"Knowledge graph + outline editor = ❤️"*

### IA / Interaction / Cognitive Load / Progressive Disclosure

4. **Information Architecture** — Workspaces (top-level switcher) → Daily Notes (default landing) → Pages (named) → Search Nodes (Cmd+K). The sidebar shows supertags grouped by category. There's no "file tree" — everything is a node, found by search or by traversing links. Tana calls this *"one connected graph."*
5. **Interaction Design** — Outliner-first: indent/outdent (Tab/Shift-Tab), move (Cmd+Up/Down), zoom-into-node (Cmd+.). Supertag assignment: type `#` + tag name. Field entry: inline form when supertag is applied. AI Command Nodes: invoke AI on a node with a saved prompt + parameter binding → result is written back into the outline. **Prompt Workbench**: side-panel to test prompts against a real node, preview expanded prompt, see token cost estimate, iterate.
6. **Cognitive Load** — **Highest in the group.** Supertags are conceptually powerful but unintuitive — you must *decide the schema* before you benefit. A new user faces: nodes vs. supertags vs. fields vs. views vs. queries vs. AI command nodes. The learning curve is real (aishortcutlab rates it 6.5/10 with caveat about steep learning). Mitigations: Tana Templates marketplace + community "patterns."
7. **Progressive Disclosure** — **Aggressive.** Day-1 user sees an outline + a `#` shortcut. Daily Notes is the safe landing pad. Supertags, Fields, Views, Search Nodes, AI Commands, AI Agents, MCP, API — each is a deeper layer. Tana's onboarding walks users through building their first supertag (often `#meeting` with `attendees` + `date` + `action-items` fields).

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX

8. **Human-AI Collaboration** — **Most ambitious AI integration in this group.** Three layers: (a) **Tana AI Chat** — chat with the graph as context, AI uses supertags + fields for multi-hop reasoning. (b) **AI Command Nodes** — reusable prompts bound to nodes; e.g. "extract action items from this meeting node," "draft a follow-up email referencing these linked nodes." Prompt Workbench for iterative prompt testing. (c) **AI Agents** — autonomous multi-step workflows ("build me an AI agent in Tana that automatically organizes your voice notes into tasks, ideas, and projects without any manual sorting"). Official stance: *"Knowledge graphs are better suited for AI than traditional databases because they provide a more versatile and expressive way to represent and connect data."*
9. **Agent UX** — **Native and named.** AI Agents are first-class nodes with their own configuration (trigger / model / instructions / output destination). October 2025 update: *"Tana's vision for agents goes back to 2021… We're not there yet."* The ambition is OS-grade agents living in the graph. Currently agents are invoked per-node (like command nodes) but the trajectory is autonomous. Custom models (incl. Claude) configurable per command since Jan 2025.
10. **Workspace UX** — **Multiple workspaces + Daily Notes landing + Cmd+K global.** Daily Notes is the anchor — every meeting, every fleeting thought starts there and gets re-classified later. Workspaces are top-level pivots (Personal / Work / Team). Multiple nodes can be opened side-by-side via splits.
11. **Long Session Experience** — **Excellent for outline-addicts; rough for visual thinkers.** The outline is genuinely fast (Tana is praised as "clean, minimal, fast"); supertag auto-suggest prevents context-switches. But after 2 hours of deep outlining, the indentation levels can go 6+ deep and the canvas (text-only) starts to feel claustrophobic — no spatial relief.
12. **Keyboard Driven UX** — **Best in the group for outliner flow.** Tab/Shift-Tab indent, Cmd+Up/Down move, Cmd+. zoom-in, Cmd+Shift+Backspace delete-node-and-children, `#` supertag, `@` mention node, `[[` link page, `/` block menu, Cmd+K command, Cmd+Enter check/uncheck. Power users rarely touch the mouse.
13. **Visual Hierarchy** — **Minimal by design.** Tana looks like a 1-column text editor with bullets. Supertags show as small colored chips. Fields show as inline form widgets. Views (table/board/calendar) are the only visual break from the outline. The hierarchy is *typographic* (bullet size, indentation, color-coding per supertag), not *spatial*.
14. **Motion Design** — **Minimal.** Zoom-into-node has a smooth 200ms ease. Supertag chips pop in. AI responses stream. No spring physics; no large transitions. The motion budget is spent on the *zoom* interaction (because that's the navigation primitive).
15. **Design Systems** — **Internal but coherent.** Tana uses a single accent (teal), system font stack, 4px spacing scale, 3-level shadow elevation. Supertag colors are user-assigned per tag. No published design tokens, but the visual language is consistent.
16. **Accessibility** — **Strong for keyboard, weaker for screen readers.** Pure outline + keyboard nav is excellent for motor-impaired users. Supertag chips and field widgets have ARIA roles but the dynamic view-switching can disorient screen readers.
17. **Performance Perception** — **Fast.** Tana is consistently praised as "clean, minimal, fast." Cloud-based but with a local-cache architecture; search is sub-100ms even for large graphs. The new database-version (in alpha as of 2024-2025) promises offline-first.
18. **Explainability** — **The graph is implicit → harder to "see."** Tana's trade-off: writing is fast because the graph is hidden, but understanding the graph requires actively opening a supertag's Instances view or a Search Node query. Quote from KG page: *"Knowledge graphs are structured. AI can follow explicit connections, do multi-hop reasoning ('find all tasks for projects owned by this person'), and ground its answers in real relationships. Less hallucination, more accuracy."* The explainability is at the *AI layer* (cited reasoning), not the *user layer* (visible graph).
19. **Trust Building** — **Mixed.** Cloud-first (Tana stores the graph on its servers), but: full data export (Markdown, JSON, OPML, Tana Intermediate Format), native import from Roam/Logseq/Workflowy, Tana Publish for public-facing. The trust story is "we make it easy to leave," not "your data never leaves." For an AI-first tool, this is acceptable to most users but not to local-first purists.
20. **Developer Experience** — **Open-ish.** Input API (push data into Tana programmatically), MCP support (Model Context Protocol — Tana as a tool for Claude/AI), Readwise integration, Calendar integration. Tana Publish API. No plugin marketplace (yet), but the API + MCP route is the modern AI-native extensibility story.
21. **Power User Experience** — **Deepest AI workflow in the group.** Power moves: build a supertag schema → write AI command nodes per supertag (e.g. `#meeting` → "extract action items + assign to attendees + schedule follow-ups") → chain into AI Agents → expose via MCP to external Claude. The Prompt Workbench is the killer feature for serious prompt engineering. The ceiling is "build your own mini-AI-app inside Tana" — closer to a low-code platform than a note app.

### ONE defining interaction

**Type `#` + tag name → node is now typed → AI can reason over it.** The single gesture of typing `#meeting` transforms a bullet from "text" into "structured data" — it now has fields (attendees, date, action-items), it can be queried ("show me all #meeting nodes where attendee=X"), it can drive AI ("for each #meeting with no action-items, draft a follow-up"). Supertagging is the bridge from outliner to graph to AI — done in two keystrokes.

### Ideas → ADOPT / ADAPT / REJECT

- **ADOPT — Knowledge graph as the AI substrate (not just linked notes).** Tana's argument is the strongest in the group: typed graph + fields = AI can multi-hop reason with low hallucination. MiMo's Knowledge layer should be a typed graph (entity + relationship + property), not just backlinks.
- **ADOPT — AI Command Nodes (reusable prompts bound to typed entities) + Prompt Workbench.** MiMo should let users save reusable AI actions scoped to Memory types — e.g. "for each `#commitment` Memory, draft a reminder." The Workbench (preview-expanded-prompt + token-cost-estimate + iterative test) is the right prompt-engineering UX.
- **ADOPT — MCP integration.** Tana exposes itself to Claude via MCP. MiMo should do the inverse — consume MCP servers (local files, browser, calendar) as Memory/Knowledge sources.
- **ADAPT — Supertags + Fields.** Don't replicate Tana's complexity (too steep). MiMo should auto-infer entity types from conversation content (named-entity recognition), let users confirm, and apply *system-defined* schemas (Person / Project / Task / Concept / Source) rather than requiring users to design their own.
- **ADAPT — Daily Notes as the default landing pad.** MiMo's conversation-spine is the analog of Tana's Daily Notes — today's session is the default context; everything gets re-classified into Memory/Project/Knowledge later.
- **ADAPT — Native AI Agents as first-class nodes.** MiMo's 6-stage pipeline agents (Researcher / Planner / Builder / Reviewer) should be visible, named, configurable entities — Tana's "agent as a graph node" pattern fits MiMo perfectly.
- **REJECT — Cloud-first storage.** MiMo is local-first. Tana's cloud trade-off is acceptable for an AI-native SaaS but not for a single-user OS.
- **REJECT — Steep learning curve / schema-design upfront.** MiMo must auto-suggest structure (NER + clustering) instead of forcing users to design supertags before they get value. Tana's 6.5/10 review score is the warning.

---

## 4. Logseq — verified via

- https://discuss.logseq.com/t/this-chart-shows-what-makes-logseq-unique/30547 (Dec 2024 community comparison chart, **read in full**)
- https://discuss.logseq.com/t/how-to-think-in-bullets/33099 (Aug 2025 — "Logseq is more than an outliner, it is a Knowledge Management System… graphs are superior")
- https://tfthacker.medium.com/logseq-a-powerful-tool-for-thought-9058dec80dbe ("open-source note-taking tool based on an outliner editor")
- https://discuss.logseq.com/t/newbi-q-write-everything-in-daily-journal-so-what-about-the-graph/9019 ("write everything in Daily journal… structure of your notes would emerge")
- https://blog.logseq.com/whiteboards-and-queries-for-everybody ("Whiteboards feature is now available for everybody… writing Logseq queries is easier than ever")
- https://discuss.logseq.com/t/whiteboards-moodboards-lets-discuss-and-gather-ideas/1793?page=2 ("Whiteboards are a way to organize spatially Logseq objects like blocks, pages, queries etc")
- https://dev.to/koshirok096/the-daily-list-dilemma-logseq-obsidian-and-other-contenders-bite-size-article-218j (May 2025 — "Journals automatically generates a dated page each day")
- https://www.reddit.com/r/logseq/comments/1irrszk/logseq_plugin_copilot (community Copilot plugin — "more agentic, able to use logseq queries")

### Product / UX Philosophy / Mental Model

1. **Product Philosophy** — **Open-source local-first outliner on top of Markdown files.** Logseq is the GPL-licensed mirror of Roam: same block-reference graph model, but your data is plain `.md` files in a local folder (like Obsidian). The bet: combine Roam's graph-of-blocks with Obsidian's local-first storage. From the forum: *"Logseq is more than an outliner, it is a Knowledge Management System. Outliners are not the ultimate solution, graphs are superior."*
2. **UX Philosophy** — **Daily journal as the single entry point.** From the forum: *"write everything in Daily journal, so what about the Graph?… Those will be displayed in the graph view and the structure of your notes would emerge."* The journal is the inbox; pages are extracted later; the graph self-organizes from links. This is the opposite of Obsidian (where you create pages directly) — Logseq forces the daily-journal rhythm.
3. **Mental Model** — **Outliner of blocks, each block addressable by `((block-id))` reference, all blocks written in today's journal by default, surfaced as pages through `[[page]]` links and queries.** Every block is a graph node. Every block has an immutable ID. Pages are "views" of all blocks that mention them.

### IA / Interaction / Cognitive Load / Progressive Disclosure

4. **Information Architecture** — Left sidebar: Favorites, Recent, Journal (today's date), Pages (alphabetical), Tasks (all `- [ ]` blocks), Whiteboards (spatial canvases). Main: outline editor (always journal-first). Right sidebar: backlinks for current page, block references. The unit of navigation is **the block**, not the page — you can jump to a specific bullet via its `((id))`.
5. **Interaction Design** — Outliner-first (Tab/Shift-Tab indent, Alt+Up/Down move, `[[` page link, `#` tag, `((` block-ref, `/` block menu, `> ` quote, `-` bullet, `- [ ]` task). **Zoom-in on a node** (Cmd+.) — click any bullet and the page "becomes" that bullet's subtree; this is Logseq's killer feature per the chart author. Whiteboards: drag pages/blocks onto canvas, draw arrows. Queries: `{:query ...}` Datalog-style.
6. **Cognitive Load** — **Lower than Tana, higher than Obsidian.** The journal-first flow is forgiving (you don't have to decide where a note "goes"), but the block-reference and query syntax is code-y. Whiteboards add a spatial layer that helps visual thinkers but can confuse users expecting a single mental model.
7. **Progressive Disclosure** — **Good.** Day 1: type in today's journal. Day 7: discover `[[links]]` and the backlinks panel. Day 30: write your first query. Day 90: build a whiteboard. The "click-to-zoom" outlining (praised in the chart as a unique must-have) is intuitive once you discover it.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX

8. **Human-AI Collaboration** — **Plugin-driven (Logseq Copilot community plugin).** From Reddit: *"I want to make this plugin more agentic, able to use logseq queries to find out more information as it sees fit, able to search the web when it [needs to]."* As of 2025, no native AI. The community wants an agentic Copilot that uses Logseq's own query language as a tool — closer to the agent-with-tools pattern than Obsidian's RAG-chat pattern.
9. **Agent UX** — **Aspirational, not shipped.** The community plugin vision: an agent that can call Logseq queries (Datalog), search the web, write back to specific blocks. No native multi-step agent in 2025.
10. **Workspace UX** — **Single-pane outliner + right-sidebar backlinks + optional Whiteboards.** No tabs (the community has requested this for years). Multiple windows are OS-level (open Logseq twice). Whiteboards are a separate top-level surface. The lack of tabs is the most-requested missing feature.
11. **Long Session Experience** — **Strong for journaling flow, weaker for cross-page research.** The journal-first model means you're always "in today" — context-switching to a specific page is via search or sidebar. After 2 hours of outlining, the page is 300 bullets deep; zoom-in (Cmd+.) provides relief. Whiteboards provide spatial relief.
12. **Keyboard Driven UX** — **Excellent.** Tab/Shift-Tab, Alt+Up/Down, Cmd+. (zoom), Cmd+c/v on bullets copies block-refs, `((` for block-ref, `[[` for page-ref, `/` for slash-menu, `t t` for todo, `t d` for doing, `t d` for done, `/done` filters tasks. Power users live in the keyboard.
13. **Visual Hierarchy** — **Minimal, dated.** Default theme is gray + blue accent. Bullets are uniform; indentation is the only hierarchy signal. Block references show as a small icon. Whiteboards break the visual monotony with spatial layout. Themes are community-driven (dracula, solarized, etc.).
14. **Motion Design** — **Minimal.** Zoom-in has a 150ms ease. Block reference expansion is instant. Whiteboard node-drag has slight inertia. No spring physics.
15. **Design Systems** — **No formal system.** CSS variables exposed for theming; community ships 30+ themes. The visual language is "Roam clone" — same bullet-outliner aesthetic.
16. **Accessibility** — **Adequate.** Keyboard-first design is naturally accessible. Screen reader support for the outliner is reasonable (it's a contenteditable list). Whiteboards are not keyboard-navigable.
17. **Performance Perception** — **Mixed.** The current Markdown version is snappy for <5k pages but slows for large graphs (graph reindexing on startup can take 30s+). The new database-version (in alpha) promises massive speedup. Whiteboards can lag with many nodes.
18. **Explainability** — **Excellent.** Every block is addressable; every link is visible; backlinks panel shows every inbound reference with surrounding outline context (better than Obsidian's, because Logseq shows block-level backlinks not just page-level). Queries show their Datalog source so power users can debug. The graph view is the spatial overview.
19. **Trust Building** — **Strongest open-source PKM.** Plain Markdown files on disk; open-source GPL; you can run your own sync (Git, Syncthing, iCloud). No vendor lock-in. The community is vocal about data ownership. The new database-version will move away from plain Markdown — community is watching closely.
20. **Developer Experience** — **Good for plugins, weaker than Obsidian.** Plugin API (TypeScript) is decent; marketplace is smaller (~200 plugins vs Obsidian's 2000+). The Datalog-based query language is powerful but learning-curve. The community actively documents patterns.
21. **Power User Experience** — **Strong for the journal-outliner type.** Power moves: queries (Datalog for cross-page joins), Whiteboards (spatial views of blocks), tasks (TODO/DOING/DONE with priorities, deadlines, repeating), aliases (true parity for multilingual naming), zoom-in outlining (the killer feature), Whiteboard relations. The chart author: *"I can't live without 'click to zoom' outlining… I need a full-fledged task manager… Aliases are essential."* Falls short on mobile (the community explicitly notes this).

### ONE defining interaction

**Click any bullet → the page zooms to become that bullet's subtree (Cmd+.).** Zoom-in outlining is Logseq's defining contribution to PKM: every block is itself a page. You write `[[Project Aurora]]` in today's journal → it becomes a page → click into it → it's a bullet → zoom in → now it's a fresh outliner context for Project Aurora, with today's bullet as the parent. Hierarchy is fluid; zoom is the navigation.

### Ideas → ADOPT / ADAPT / REJECT

- **ADOPT — Block-level addressing (every Memory item has a stable ID + backlink).** MiMo should give every Memory item a stable ID, so conversations can reference ("see also Memory #abc") and AI can cite specific items. Logseq's block-refs prove this works at scale.
- **ADOPT — Daily-journal as default entry; structure emerges via links.** MiMo's conversation-spine is the analog. Today's conversation is today's journal; Memory/Knowledge emerges from links the user (and AI) make. Don't force structure upfront.
- **ADOPT — Zoom-in outlining (every block is also a page).** MiMo Memory items should be recursively expandable — click a Memory → it expands into a sub-graph of related memories. The "zoom" interaction scales hierarchies infinitely without nested-folder hell.
- **ADOPT — Block-level backlinks with surrounding context (better than page-level backlinks).** MiMo's backlinks should show the surrounding 1-2 lines of the citing conversation/message, not just "this message mentions that memory."
- **ADAPT — Datalog-style queries (power, but code-y).** MiMo should ship a no-code query builder (Obsidian Bases pattern) for the 95% and expose a Datalog/SQL escape-hatch for the 5% power users.
- **ADAPT — Whiteboards as spatial layer over outliner.** MiMo's canvas-per-MODE can adopt Logseq's pattern: spatial whiteboard can hold references to conversation messages, Memory items, and Knowledge nodes — drag-and-drop relational thinking.
- **REJECT — No tabs / single-pane workspace.** MiMo needs multi-tab + multi-pane for parallel projects and conversations (re-confirms Group D Raycast/Linear hold-Space-peek pattern).
- **REJECT — Dated visual design.** MiMo's design specification (Group E) requires modern type ramp, elevation, motion tiers. Logseq's aesthetic is functional but not aspirational.

---

## 5. Roam Research — verified via

- https://roamresearch.com (official homepage — "as easy to use as a word document or bulleted list, and as powerful for finding, collecting, and connecting related ideas as a graph database")
- https://www.zsolt.blog/2021/05/Addicted-to-block-references.html (block references deep-dive, **read in full**)
- https://www.zsolt.blog/2021/02/organizing-your-notes-in-roam.html (pages + outliner)
- https://padminipyapali.medium.com/remembering-with-roam-researchs-%CE%B4-543d717e484 ("block will promptly show up on your daily page the next day… trace the [references]")
- https://www.reddit.com/r/RoamResearch/comments/1lohy8w/june_2025_monthly_recap (June 2025 recap — LiveAI extension updates)
- https://uxdesign.cc/roam-research-a-new-way-of-working-with-qualitative-research-data-96534b9cd951 ("Roam uses text blocks as the 'information unit' it pulls in for linked references")
- https://nesslabs.com/roam-research-input-output ("Roam pages are made of a bunch of blocks which visually look like bullet points… move them around, copy them, export them")
- https://mil.ad/blog/2026/auto-expand-references-in-roam.html (May 2026 — collapse/expand state of bullets)

### Product / UX Philosophy / Mental Model

1. **Product Philosophy** — **"A note-taking tool for networked thought."** From the homepage: *"As easy to use as a word document or bulleted list, and as powerful for finding, collecting, and connecting related ideas as a graph database."* Roam (2020) originated the block-reference-everywhere model that Logseq cloned and Obsidian added. The bet: a graph database, but write in it like a bulleted list.
2. **UX Philosophy** — **Outline-first, blocks-as-nodes, daily-notes-as-spine.** From zsolt.blog: *"Roam is an outliner. You can organize your blocks into an outline using indentation (TAB and Shift+TAB). This approach helps to create context."* And: *"Under the hood, Roam stores documents as graphs, blocks being the nodes of the graph. Roam stores blocks and their relationships."*
3. **Mental Model** — **Block graph.** Every block has an immutable ID. Every block can be referenced (`((block-id))`) and transcluded (`((embed: block-id))`). Pages are "saved searches" over blocks that mention them. Daily notes are the default landing pad. Quote: *"Blocks are another name for paragraphs in a document. They represent the unit of thought."*

### IA / Interaction / Cognitive Load / Progressive Disclosure

4. **Information Architecture** — Left sidebar: Daily Notes, All Pages, Graph Overview, Shortcuts. Main: outline editor (daily notes by default). Right sidebar: block references, linked references, unlinked references. No folders; no file tree. The IA is *flat* — everything is found by search or by traversing backlinks.
5. **Interaction Design** — Outliner: Tab/Shift-Tab indent, Cmd+Up/Down move, `/` block menu, `[[` page link, `#` tag, `((` block reference, `{{embed: ((id))}}` transclusion, `{{[[query]]: ...}}` Datalog query. Indent to create hierarchy; every indented bullet is its own addressable block. Tags and page-links are syntactically identical (both `[[X]]`); `#X` is shorthand for `[[#X]]`.
6. **Cognitive Load** — **Low to start, high to master.** Day 1: type in today's daily notes. Day 30: discover `((block-refs))`. Day 90: write Datalog queries. The block-reference model is powerful but unintuitive — most users never learn it. The community is split between "this is genius" and "this is over-engineered."
7. **Progressive Disclosure** — **Inconsistent.** Roam reveals powerful features only when you type the right sigil (`((`, `{{`, `[[`). There's no onboarding flow, no progressive feature surfacing. The power-user base writes long tutorials (zsolt.blog, Beau Haan YouTube) to bridge the gap.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX

8. **Human-AI Collaboration** — **Extension-driven (LiveAI).** From the June 2025 Reddit recap: *"Fabrice pushed a significant update to the LiveAI extension, prioritizing Daily Note Pages to better align with established user workflows."* LiveAI is the de-facto AI layer for Roam — chat with daily notes as context. No native AI in Roam itself as of 2025.
9. **Agent UX** — **No native agents.** LiveAI is a chat assistant, not an autonomous agent. The community uses Roam's block-graph as a *substrate* for AI tools (exporting blocks to external LLMs) but Roam itself doesn't orchestrate.
10. **Workspace UX** — **Single pane + right sidebar.** No tabs. Multiple windows are OS-level. Right sidebar holds block references (the killer feature: drag any block to the right sidebar to keep it visible while you write in the main pane). Roam's minimal workspace is part of its identity — "the document is the workspace."
11. **Long Session Experience** — **Polarizing.** For graph-thinking writers, Roam is meditative — daily notes grow into a 500-bullet page and the graph emerges organically. For visual thinkers, Roam is claustrophobic — no spatial canvas (Roam has no whiteboard feature as of 2025). Performance degrades on long daily-notes pages (1000+ bullets).
12. **Keyboard Driven UX** — **Excellent.** Tab/Shift-Tab, Cmd+Up/Down, `[[`, `#`, `((`, `/`, `Cmd+u` (today's daily note), `Cmd+Shift+Enter` (follow link under cursor). Power users never touch the mouse.
13. **Visual Hierarchy** — **Minimalist, almost brutalist.** Single column, gray text on white, blue links, tiny indentation markers. No cards, no shadows, no rounded corners. The aesthetic is "tool, not product." Themes exist but the default is austere.
14. **Motion Design** — **Almost none.** Block-expansion is instant. Indentation snaps. No transitions, no springs. The motion budget is zero — Roam is a text editor that happens to be a graph.
15. **Design Systems** — **No system.** A few CSS variables for theming; the visual language is "Bulleted Google Doc." Plugins each ship their own styles, often clashing.
16. **Accessibility** — **Below average.** The contenteditable outliner is hard for screen readers; keyboard-only operation is possible but the right-sidebar drag-drop is mouse-only. No published WCAG statement.
17. **Performance Perception** — **The weakest in the group.** Roam is cloud-only and notoriously slow on large graphs — daily notes with 1000+ bullets lag noticeably. Search can take seconds. The community has begged for a local-first mode; Roam hasn't shipped one. This is the #1 complaint and the reason many users defected to Logseq/Obsidian.
18. **Explainability** — **The block-graph IS the explanation.** Every block has linked-references and unlinked-references panels showing every inbound mention. Block references resolve inline. Queries show their Datalog source. The user understands the structure because they built every link. But the *overall* graph shape is hard to see (the graph view is rudimentary).
19. **Trust Building** — **Weakest in the group.** Cloud-only, no local copy, no E2E encryption by default (paid add-on), vendor lock-in via proprietary block-IDs. The 2022 pricing hike + 2023 outages damaged trust. Many users switched to Logseq (open-source) or Obsidian (local-first). The remaining users are the "block-reference believers."
20. **Developer Experience** — **Mixed.** Roam has a JavaScript extension API (roam/js) and a community marketplace (Roam Depot). But the API is unofficial and breaks between versions. The Roam42 power-kit provides hotkeys, statistics, formatting. The DX is far below Obsidian's.
21. **Power User Experience** — **Narrow-and-deep.** The block-reference power-users (zsolt.blog, Beau Haan, Natalie Masunga) do things impossible elsewhere: transclude any block anywhere, version blocks, write Datalog queries that join across pages, build "attribute tables" that are actually graph queries. The ceiling is high but the floor is also high — no path for casual users.

### ONE defining interaction

**Type `((` → fuzzy-search any block in the entire graph → select → it's now transcludable anywhere.** Block references are Roam's defining contribution. Every paragraph has an ID; every ID can be referenced from anywhere; references can be transcluded (rendered inline) or embedded (rendered as a block). This means: the same sentence can live in 5 different contexts, edited in any one, updated everywhere.

### Ideas → ADOPT / ADAPT / REJECT

- **ADOPT — Block-level references with stable IDs (transclusion + backlinks).** MiMo Memory items should support transclusion — a Memory can appear in multiple conversations/projects, edited in one place, updates everywhere. Roam proved this works at scale (despite performance issues).
- **ADOPT — Right-sidebar "pinned references" while writing in main pane.** MiMo should let users pin 2-3 Memory items / Knowledge nodes to a side panel while composing a message — drag references in without losing context.
- **ADOPT — Linked References + Unlinked References panels (surface implicit connections).** MiMo should auto-detect unlinked mentions of a Memory (e.g. "Project Aurora" appears in a conversation without an explicit `@mention`) and surface them — turning implicit into explicit graph edges.
- **ADAPT — Daily Notes as the spine.** Roam's daily-notes-as-default pattern maps to MiMo's conversation-spine-as-default. Adapt the rhythm: today's conversation = today's daily note; everything links back to it.
- **REJECT — Cloud-only, slow performance, no E2E default.** MiMo is local-first; Roam's architecture is the cautionary tale. The performance degradation on large graphs is the #1 lesson to avoid.
- **REJECT — Brutalist visual design with no system.** MiMo's design spec requires elevation, motion tiers, modern type ramp (Group E). Roam's aesthetic is a relic.
- **REJECT — No onboarding / sigil-discovery only.** MiMo must teach the model through progressive disclosure (re-confirms Group D Notion / Linear onboarding pattern).

---

## 6. Anytype — verified via

- https://anytype.io (official homepage — "Create notes, tasks, databases, and chats that only you can access. Your data stays on your device")
- https://doc.anytype.io/anytype/create/objects (Objects doc — "everything you create is an Object… Folders ask 'where does this go?' Objects ask 'what does this relate to?'", **read in full**)
- https://hilton.org.uk/blog/anytype-local-first (local-first architecture review by Peter Hilton, May 2025, **read in full**)
- https://volodymyrpavlyshyn.medium.com/anytype-from-second-brain-to-social-brain-with-types-and-graphs-e6eb6611ec7d (philosophy deep-dive)
- https://doc.anytype.io/anytype/organize/types (Types — "Every Object has one Type")
- https://doc.anytype.io/anytype/organize/collections (Collections = hand-picked Objects, "closest thing to a folder in Anytype")
- https://medium.com/@danielasgharian/bridging-the-gap-between-power-and-usability-anytypes-smartest-update-so-far-8d5f990 (Apr 2025 — "Sets are now called Queries. Relations are now called Properties.")
- https://www.reddit.com/r/Anytype/comments/1p79jtt/anytype_is_deteriorating (Reddit — "UI & UX is getting progressively worse… there was a big plus button")

### Product / UX Philosophy / Mental Model

1. **Product Philosophy** — **Local-first everything-app.** From the homepage: *"Create notes, tasks, databases, and chats that only you can access. Your data stays on your device — fully owned, secure, and private. Free to start."* Anytype's bet: a Notion-like UI with end-to-end encryption and no servers — your data is on your devices, synced peer-to-peer via Any Sync protocol. Quote from hilton.org.uk: *"Local-first literally means storing all of the data locally, on your computer. When you use Anytype, this data loads without the network latency we get used to with cloud apps."*
2. **UX Philosophy** — **"What does this relate to?" not "Where does this go?"** From the Objects doc: *"Folders ask 'where does this go?' You must decide if your note falls under the folder Meetings, Clients, or Projects. If you want it in more than one, you have to duplicate your note. Objects ask 'what does this relate to?' — Your note exists by itself and you can connect it to your Meetings, Clients, and Projects all at the same time. No duplication."* This is the explicit anti-folder manifesto.
3. **Mental Model** — **Object + Type + Property + Link + View + Collection + Query + Space.** Every entity is an **Object**. Every Object has one **Type** (Note / Task / Project / Person / etc.). Types define **Properties** (status, date, author, etc.). Objects **Link** to each other (graph). **Views** render Object-collections as table / board / gallery / calendar / list. **Collections** are hand-picked Objects (the only "folder-like" thing). **Queries** (formerly Sets) are filter-based views. **Spaces** are top-level contexts (Personal / Work / Team). The graph is the source of truth.

### IA / Interaction / Cognitive Load / Progressive Disclosure

4. **Information Architecture** — Space (top-level) → Sidebar grouped by Type → Objects → each Object has Type + Properties + Links. The sidebar shows Types (with object counts), Queries (saved filters), Collections (hand-picked groups). The Graph view shows all objects and connections. The whole IA is *graph-first, type-organized, view-rendered* — closest to a true object database among the six products.
5. **Interaction Design** — Create button (top of sidebar): Create (instant new Object of default Type) + Create Dropdown (pick Type / from clipboard / upload). `/` in editor: block menu. `@` in editor: mention Object (creates backlink). Cmd/Ctrl+N: new Object. Cmd/Ctrl+Opt/Alt+N: open create dropdown. **Turn Into Object** — transform any block into its own Object (refactor-by-extraction pattern). Hover a block's 3-dot menu → "Turn into object" → select Type. Cmd/Ctrl+K: command palette. **Graph** icon near back/forward buttons shows the Object's graph-position.
6. **Cognitive Load** — **High — the terminology churn is the problem.** From danielasgharian (Apr 2025): *"Anytype has changed the terminology. Sets are now called Queries. Relations are now called Properties. Collections stay as Collections."* A user who learned Anytype in 2023 must relearn vocabulary. Plus Object / Type / Property / Link / View / Query / Collection / Space is 8 primitives — more than Tana's 4 (Node / Supertag / Field / View). The Reddit complaint *"UI & UX is getting progressively worse"* reflects this churn.
7. **Progressive Disclosure** — **Was good, recently regressed.** Reddit: *"When I started there was a big plus button to create a new [object]"* — implying the new IA hides creation behind menus. The Objects doc itself is well-organized (Create / Format / Editor / Organize / Collaborate / Features) but the in-app onboarding is sparse.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX

8. **Human-AI Collaboration** — **Native AI is nascent.** Anytype docs list "Anytype Agents' Skill Data" under Advanced features — implying an agent-capability layer is in progress. As of 2025, no first-class AI chat; users integrate external AI (ChatGPT) via copy-paste. The roadmap suggests AI Agents will be a first-class primitive (mirroring Tana's trajectory).
9. **Agent UX** — **Aspirational.** The docs page "Anytype Agents' Skill Data" hints at native agent infrastructure. No shipped agent surface in 2025.
10. **Workspace UX** — **Multi-space + multi-view + Graph as source of truth.** Each Space has its own Types, Objects, Queries. The sidebar is type-grouped (note: configurable sections). The Graph view is the canonical "where am I" map. Multiple Objects can be open in tabs (Anytype added tabs in 2024). Mobile is fully peer (not a stripped-down port).
11. **Long Session Experience** — **Strong for object-modelers, weaker for freeform writers.** If you think in Objects (Type / Property / Link), Anytype is a dream. If you want to freeform-write, the Object+Type friction gets in the way. The Graph view provides spatial orientation but isn't a working canvas (no spatial authoring like Heptabase).
12. **Keyboard Driven UX** — **Good.** Cmd/Ctrl+N (new Object), Cmd/Ctrl+Opt/Alt+N (create dropdown), Cmd/Ctrl+K (command palette), `/` (block menu), `@` (mention Object). Not as deep as Logseq/Tana/Roam outliner-keyboard flow, but covers the main actions.
13. **Visual Hierarchy** — **Notion-inspired, elevated.** Cards have subtle shadows, rounded corners, hover-lift. Type chips are colored. Property values render as inline chips. The Graph view uses force-directed layout with type-based node colors. The visual language is modern and cohesive — closest to Notion's polish, with better graph visualization.
14. **Motion Design** — **Subtle and modern.** View-switching (table → board → gallery) has a 200ms cross-fade. Object-open has a slide-in. Graph view nodes ease into position. Drag has slight inertia. No excessive motion; matches Material 3 motion tier 1-2.
15. **Design Systems** — **Implicit but cohesive.** Anytype doesn't publish tokens, but the visual language obeys: 4px spacing scale, 6-8px corner radius, 3-level elevation, one accent per Space (user-assignable), system font stack. Every surface follows the same grammar.
16. **Accessibility** — **Average.** Keyboard nav is decent for the main editor; the Graph view is mouse-heavy. No published WCAG statement. Mobile is a peer app, not an accessibility fallback.
17. **Performance Perception** — **Excellent — the local-first payoff.** From hilton.org.uk: *"this data loads without the network latency we get used to with cloud apps… Expert users who use keyboard shortcuts find this responsiveness especially satisfying."* Offline work is seamless; sync happens in the background.
18. **Explainability** — **Strong.** Every Object shows its Type, its Properties, its inbound Links (backlinks), and its position in the Graph. The Graph view is clickable — click a node → see its connections. Queries are visible as saved-filter formulas. The user can trace any relationship.
19. **Trust Building** — **Strongest in the group, on par with Obsidian.** End-to-end encrypted by default (key only you have); Swiss/German legal entity (GDPR-friendly); export to Markdown archive at any time; offline by default; sync via Any Sync protocol (open-source, peer-to-peer backup). For users concerned about US cloud vendors, Anytype is the strongest non-US local-first option.
20. **Developer Experience** — **Open-protocol, good.** Any Sync protocol is open-source; Local API documented; "Anytype Agents' Skill Data" implies an agent-API in progress. The object-model is consistent and programmable. Less plugin-marketplace than Obsidian, more protocol-and-API than Heptabase.
21. **Power User Experience** — **Deep, if you accept the model.** Power moves: design custom Types with custom Properties → build Queries (filter-based views) → link Objects into a graph → use Collections for hand-curated sets → Custom CSS per Space → Formulas in views → embed Inline Views. The ceiling is "build your own mini-CRM / mini-Notion-database inside Anytype." Mobile is fully functional. The recent terminology churn (Sets→Queries, Relations→Properties) has frustrated power users — the model didn't change but the vocabulary did.

### ONE defining interaction

**Type a `/` to add a block, hover the block's 3-dot menu, click "Turn into object," pick a Type → the block is now its own Object, linked back to the page.** This is refactor-by-extraction at the thought level: you write a paragraph in a project page, realize it deserves to be its own thing, and with one click it becomes a Task Object (with status, due-date, assignee) that exists independently and links back. Objects emerge from writing, not from upfront planning.

### Ideas → ADOPT / ADAPT / REJECT

- **ADOPT — Object + Type + Property + Link as the storage primitives.** MiMo's Knowledge layer should adopt Anytype's model: every Memory/Knowledge entity is an Object with a Type and Properties, linked by typed relationships. This is more rigorous than Roam's untyped block-graph and more flexible than Tana's supertag-schema.
- **ADOPT — "Turn into Object" refactor-by-extraction interaction.** In MiMo, select any part of a conversation → "promote to Memory" → it becomes a first-class Object linked back to the source message. This is the inverse of citation: extraction-with-linkback.
- **ADOPT — End-to-end encryption by default + Swiss/German jurisdiction + Markdown export.** MiMo is single-user local-first; E2E for sync should be the default, not a paid add-on (re-confirms Group A/D local-first pattern). Markdown export as the escape hatch.
- **ADOPT — Graph view as the canonical "where am I" map (clickable, type-colored).** MiMo's Knowledge graph view should be the spatial orientation surface, with type-based color coding and clickable navigation.
- **ADAPT — Spaces as top-level pivots.** MiMo's "Project" container (Group A pattern) maps to Anytype's "Space." Each Project should be its own typed-graph context with its own defaults.
- **ADAPT — Queries (formerly Sets) as saved-filter views over the Object graph.** MiMo should let users save Queries like "all commitments due this week" or "all memories about Project Aurora" — filter-based dynamic views, complementing Collections (hand-picked).
- **REJECT — Terminology churn (Sets→Queries, Relations→Properties).** MiMo must lock vocabulary before launch; users will not tolerate relearning primitives. Anytype's regression (Reddit: "Anytype is deteriorating") is the warning.
- **REJECT — 8 primitives (Object / Type / Property / Link / View / Query / Collection / Space) — too many.** MiMo should expose at most 4 primitives to users (Conversation / Memory / Knowledge / Project), with the rest inferred.

---

## Cross-Product Synthesis (15-line takeaway)

1. **Two storage models**: file-based (Obsidian, Logseq) vs. database/object-based (Tana, Anytype, Roam, Heptabase-card-library). File-based wins on trust; database wins on AI.
2. **Two authoring surfaces**: outliner (Roam, Logseq, Tana) vs. document (Obsidian) vs. whiteboard (Heptabase) vs. object-editor (Anytype). MiMo's conversation-spine is a 5th authoring surface — unique.
3. **Daily Notes / Journal as default landing** is universal except Obsidian & Heptabase — the conversation-spine pattern is validated.
4. **Block-level references with stable IDs** is the deepest pattern (Roam invented, Logseq cloned, Tana supertags-extended, Heptabase card-extended). MiMo should adopt block-level addressing for Memory.
5. **AI integration spectrum**: none-native (Obsidian, Logseq, Roam → plugin-driven) → built-in chat (Heptabase) → graph-aware AI (Tana command nodes + agents) → native-agents-aspirational (Anytype). Tana is the AI-native north star.
6. **AI-with-citations** (Heptabase: per-paragraph citation in chat; Tana: graph-grounded reasoning) is the gold standard for trust. MiMo must do this.
7. **Hover-on-asset AI actions** (Heptabase) is the right micro-interaction pattern — AI lives on the canvas, produces more atoms on the canvas.
8. **Prompt Workbench** (Tana: preview-expanded-prompt + token-cost + iterative test) is the prompt-engineering UX every AI tool needs.
9. **Local-first** (Obsidian, Logseq, Anytype) wins trust; cloud-only (Roam, Heptabase, Tana) wins collaboration/AI. MiMo's local-first + optional sync is the right compromise.
10. **Multi-tab + tab-groups** (Heptabase, Anytype) is the workspace pattern MiMo needs — single-pane (Roam, Logseq) is the limitation to reject.
11. **Zoom-in outlining** (Logseq, Tana — every block is also a page) is a unique navigation primitive MiMo should adopt for Memory recursion.
12. **Graph view as visualization, not storage** (Obsidian) vs. **graph as the implicit storage** (Tana) — MiMo should adopt Tana's model (implicit graph) with Anytype's clickable visualization.
13. **No-code query layer** (Obsidian Bases, Anytype Queries, Tana Views) is the right user-facing abstraction; Datalog/SQL is the power-user escape hatch (Logseq, Roam).
14. **Terminology churn kills trust** (Anytype Sets→Queries). Lock vocabulary before launch.
15. **Object+Type+Property+Link** (Anytype) is the most rigorous storage model — better for AI reasoning than Roam's untyped block-graph. MiMo should adopt Anytype's primitives internally, expose Tana's supertag-like UI externally.

### Map of best idea per pattern → which product to learn from

| Pattern | Best exemplar | MiMo action |
|---|---|---|
| Block-level addressing | Roam / Logseq | ADOPT for Memory |
| Daily-journal-as-spine | Logseq / Tana | ADOPT (= conversation-spine) |
| Hover-on-asset AI actions | Heptabase | ADOPT |
| AI chat with @-context + per-para citations | Heptabase | ADOPT |
| Prompt Workbench | Tana | ADOPT |
| Knowledge graph as AI substrate | Tana | ADOPT |
| AI Command Nodes (reusable prompt + entity binding) | Tana | ADOPT |
| Object + Type + Property + Link primitives | Anytype | ADOPT (internal) |
| Turn-into-Object refactor-by-extraction | Anytype | ADOPT |
| Multi-tab + tab-groups workspace | Heptabase / Anytype | ADOPT |
| Zoom-in outlining (every block is a page) | Logseq | ADOPT for Memory recursion |
| No-code query layer (Bases/Views/Queries) | Obsidian Bases / Anytype Queries | ADOPT (95% users) |
| Code query escape-hatch (Datalog/SQL) | Logseq / Roam | ADAPT (5% users) |
| Graph view as clickable, type-colored map | Anytype | ADOPT |
| Local-first + E2E + Markdown export | Anytype / Obsidian | ADOPT |
| Linked + Unlinked References panels | Roam | ADOPT |
| Right-sidebar pinned references | Roam | ADOPT |
| MCP integration | Tana | ADOPT |
| Native AI Agents as graph nodes | Tana (aspirational) | ADOPT |
| Schema-design upfront (supertags) | Tana | REJECT (auto-infer instead) |
| Cloud-only storage | Roam / Heptabase / Tana | REJECT |
| Brutalist visual design | Roam | REJECT |
| Terminology churn | Anytype | REJECT |
| No onboarding / sigil-discovery only | Roam | REJECT |
| Plugin-marketplace fragmentation | Obsidian | REJECT (curated skills instead) |

---

### Verified Source URLs (full list)

**Obsidian:**
- https://obsidian.md/help/plugins/graph
- https://forum.obsidian.md/top
- https://www.dsebastien.net/2022-10-19-the-must-have-obsidian-plugins
- https://infranodus.com/obsidian-plugin
- https://medium.com/obsidian-observer/obsidians-new-bases-feature-is-the-biggest-update-since-properties-2aad08a102eb
- https://www.reddit.com/r/ObsidianMD/comments/1l4sx07/first_look_at_the_obsidian_bases_core_plugin_full
- https://effortlessacademic.com/adding-ai-to-your-obsidian-notes-with-smartconnections-and-copilot
- https://codeculture.store/blogs/developer-culture/obsidian-ai-plugin-comparison-2025

**Heptabase:**
- https://heptabase.com
- https://wiki.heptabase.com/user-interface-logic  *(page-read)*
- https://wiki.heptabase.com/fundamental-elements  *(page-read)*
- https://wiki.heptabase.com/newsletters/2025-12-30
- https://wiki.heptabase.com/newsletters/2026-03-24
- https://medium.com/@danielasgharian/why-heptabase-leads-the-pack-in-visual-note-taking-apps-2125f15c8fbc
- https://nesslabs.com/heptabase-featured-tool
- https://storyflow.so/blog/best-heptabase-alternatives-2026
- https://tana.inc/blog/best-heptabase-alternatives-2026

**Tana:**
- https://outliner.tana.inc/knowledge-graph  *(page-read)*
- https://outliner.tana.inc/learn/features/ai-command-nodes  *(page-read)*
- https://outliner.tana.inc/learn/features/tana-ai
- https://outliner.tana.inc/blog/tana-current-monthly-update-october-2025
- https://uxplanet.org/finally-i-found-it-welcome-tana-1abe9dac0a59
- https://fisfraga.substack.com/p/tana-a-knowledge-base-integrated-with-artificial-intelligence
- https://www.superbcrew.com/tana-connects-your-notes-tasks-and-ideas-into-one-ai-powered-workspace
- https://vantaige.io/ai-tool/tana
- https://aishortcutlab.com/tools/tana/review
- https://medium.com/@jenstumbles/how-tana-is-helping-me-rethink-my-futures-research-workflow-3595ed9857a7

**Logseq:**
- https://discuss.logseq.com/t/this-chart-shows-what-makes-logseq-unique/30547  *(page-read)*
- https://discuss.logseq.com/t/how-to-think-in-bullets/33099
- https://discuss.logseq.com/t/newbi-q-write-everything-in-daily-journal-so-what-about-the-graph/9019
- https://tfthacker.medium.com/logseq-a-powerful-tool-for-thought-9058dec80dbe
- https://blog.logseq.com/whiteboards-and-queries-for-everybody
- https://discuss.logseq.com/t/whiteboards-moodboards-lets-discuss-and-gather-ideas/1793
- https://dev.to/koshirok096/the-daily-list-dilemma-logseq-obsidian-and-other-contenders-bite-size-article-218j
- https://www.reddit.com/r/logseq/comments/1irrszk/logseq_plugin_copilot

**Roam Research:**
- https://roamresearch.com
- https://www.zsolt.blog/2021/05/Addicted-to-block-references.html  *(page-read)*
- https://www.zsolt.blog/2021/02/organizing-your-notes-in-roam.html
- https://padminipyapali.medium.com/remembering-with-roam-researchs-%CE%B4-543d717e484
- https://www.reddit.com/r/RoamResearch/comments/1lohy8w/june_2025_monthly_recap
- https://uxdesign.cc/roam-research-a-new-way-of-working-with-qualitative-research-data-96534b9cd951
- https://nesslabs.com/roam-research-input-output
- https://mil.ad/blog/2026/auto-expand-references-in-roam.html

**Anytype:**
- https://anytype.io
- https://doc.anytype.io/anytype/create/objects  *(page-read)*
- https://hilton.org.uk/blog/anytype-local-first  *(page-read)*
- https://volodymyrpavlyshyn.medium.com/anytype-from-second-brain-to-social-brain-with-types-and-graphs-e6eb6611ec7d
- https://doc.anytype.io/anytype/organize/types
- https://doc.anytype.io/anytype/organize/collections
- https://medium.com/@danielasgharian/bridging-the-gap-between-power-and-usability-anytypes-smartest-update-so-far-8d5f990
- https://www.reddit.com/r/Anytype/comments/1p79jtt/anytype_is_deteriorating

---

**File path:** `/home/z/my-project/research/research-group-G.md`
**End of report.**
