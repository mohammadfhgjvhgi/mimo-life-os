# Heptabase — Evidence-Based Research (W4)

**Product:** Heptabase (heptabase.com) — visual knowledge base + whiteboard + AI tutor
**Vendor:** Hepta Platforms, Inc.; co-founder Alan Chan (writes the public wiki "My Vision" series)
**Task ID:** W4
**Phase:** R2 — EVIDENCE-BASED
**Researcher:** sub-agent (general-purpose)
**Date:** 2025-08-07 (fetch timestamps in cache files)
**Method:** Direct curl fetch of heptabase.com, wiki.heptabase.com (Docusaurus), pricing page. z-ai web_search 429 across retries. Cached at `raw-heptabase/`.
**First-hand product use:** NOT performed (no GUI install in sandbox). All claims sourced from official site + Alan Chan's wiki/blog. UI details not visible in static HTML are marked `[Not directly accessed]`.

---

## 1. Product Overview

Heptabase is a visual knowledge-base / whiteboard product for "students, researchers, and lifelong learners." Founded by Alan Chan (and co-founder); YC-backed (S22), Kleiner Perkins, HOF Capital, Moving Capital investors.

- Tagline (official): "Master anything you learn. Do your best research with AI." [Source: https://heptabase.com/, accessed 2025-08-07]
- "Heptabase is an intelligent, visual knowledge base built for students, researchers, and lifelong learners." [Source: https://heptabase.com/, accessed 2025-08-07]
- Pricing: 7-day free trial; Pro $8.99/mo, Premium $17.99/mo (incl. AI Tutor), Premium+ $53.99/mo. Yearly saves 25%. [Source: https://heptabase.com/pricing, accessed 2025-08-07]
- Apps: Mac, Windows, Linux (AppImage), iOS, Android. Versions: GitHub releases; current 1.101.1 (from pricing page download URLs). [Source: https://heptabase.com/pricing, accessed 2025-08-07]
- "Backed by top-tier investors" + Product Hunt Top Post + Golden Kitty badges. [Source: https://heptabase.com/, accessed 2025-08-07]

## 2. Product Philosophy

Alan Chan published a 6-part "My Vision" series starting 2020-06-29 (while still in college). Vision statement:

> "Our vision is to create a world where anyone can effectively establish a **deep understanding** of anything." [Source: https://wiki.heptabase.com/, accessed 2025-08-07]

The vision is grounded in three long-term goals (chan, 2020):
1. "Short-term: To accelerate the speed of the human's intellectual and technological progress to the theoretical limit."
2. "Medium-term: To develop a humane way of integrating our mind and body with technology…"
3. "Long-term: To ensure that the order of the observable universe will not come to an end…" [Source: https://wiki.heptabase.com/the-context, accessed 2025-08-07]

The 1.0 launch (Aug 31, 2023) framing:

> "Heptabase's vision is to create a world where anyone can effectively establish a deep understanding of anything." Knowledge lifecycle = "exploring → collecting → thinking → creating → sharing"; Heptabase 1.0 targets "collecting → thinking → creating." [Source: https://wiki.heptabase.com/version-one, accessed 2025-08-07]

> "The biggest challenge modern people face in learning, researching, and problem-solving is not the lack of knowledge, but the **lack of context** to connect countless pieces of knowledge and the tools to construct and preserve these contexts." [Source: https://wiki.heptabase.com/the-roadmap, accessed 2025-08-07]

Design-driven philosophy:

> "As a design-driven company, we believe that only the best user experience can foster the deepest understanding." Principles: friendly/polished/intuitive UI; sufficient-not-excessive features; cohesive design around "a better method for learning and conducting research"; "ready-to-use 'out-of-the-box,' with a low learning curve"; strong "overall integrity." [Source: https://wiki.heptabase.com/version-one, accessed 2025-08-07]

## 3. Core Mental Model

**Whiteboard + Card + AI Chat & Actions** — three fundamental elements:
- **Card**: "your note, as well as a container for knowledge and ideas. All cards are stored in the Card Library App." Types: Note Cards, Journal Cards, Highlight Cards, PDF Cards, Video Cards, Audio Cards, Image Cards. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Whiteboard**: "your space for thinking. Consider it as an unlimited desktop for placing cards to help you learn and research the topics you care about." Key principle: "Whiteboards do not own cards. All cards belong to the Card Library. … The same card can be placed on multiple whiteboards at the same time. This is similar to how our brain works." [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **AI Chat & Actions**: "chat with the latest AI models. By adding cards, sections, whiteboards, or content like PDFs, videos, and journals to the chat context, you enable AI to respond based on the content you select." [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]

The collective: "your cards, whiteboards, and tags collectively form a 'knowledge network,' and Heptabase serves as the 'browser' for this network. Therefore, the UI logic of Heptabase is similar to a browser, rather than a traditional folder." [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]

## 4. User Journey (first-run → daily → long-term)

- **First-run**: "Start your 7-day trial" CTA on homepage. Onboarding emphasizes three use cases: (1) improve learning in topics you care about; (2) make sense of project data/literature/ideas; (3) plan and reflect on your life. [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
- **Daily**: Daily Journals feature ("Daily journals view with calendar and todos"). Web Clipper for capture. "Three ways to make sense of your fleeting thoughts in journal." [Source: https://heptabase.com/, https://wiki.heptabase.com/three-ways-to-make-sense-of-your-fleeting-thoughts-in-journal, accessed 2025-08-07]
- **Long-term**: Build a "knowledge network" — Cards library + Whiteboards (sub-whiteboards, sections, arrows). Founder's demo: "How Heptabase's founder uses Heptabase for learning." [Source: https://wiki.heptabase.com/, accessed 2025-08-07]

## 5. Navigation (file tree, graph, breadcrumbs, namespaces)

- **Left Sidebar** = "Tabs and bookmarks of the browser." [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
- **Right Sidebar** = "Plugins of the browser." [Source: same]
- **Global Tool** = "Search tool of the browser." [Source: same]
- No file tree (cards live in Card Library; whiteboards are first-class objects); navigation is browser-like. Sub-whiteboards allow nesting.
- The whiteboard toolbar (left-side): Select, Note card, Upload files, Connect (arrows), Text, Section, Search, Journal, Calendar, Mindmap, sub-whiteboard, whiteboard shortcut. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]

## 6. Workspace (panes, tabs, split views)

- Browser-like tabs in left sidebar. [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
- Right-sidebar "plugins" (right rail of context tools).
- Whiteboard is a 2D infinite canvas; multiple whiteboards can be open in tabs.
- Sub-whiteboards nest inside whiteboards (preserving context). [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]

## 7. Conversation (AI chat panel — how it integrates)

Heptabase ships first-party **AI Chat** as a core feature:
- "Ask AI to explain any sources, take notes, and organize your knowledge base for you." [Source: https://heptabase.com/, accessed 2025-08-07]
- Chat is opened in the upper-right of a whiteboard; default mode is AI Chat; selectable AI models (OpenAI, Google, Anthropic). [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- Three roles for the whiteboard in chat: (1) **Thinking tool** — drag messages onto whiteboard; (2) **Topic-based folder** — centralize chats per topic; (3) **Knowledge context** — add whole whiteboard (or selected cards/sections/PDFs/videos) to chat context. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- "Research a topic" workflow: upload PDFs / YouTube links / .docx / text / images → "Start research on a new whiteboard" → system parses PDF content and downloads YouTube transcripts → AI answers questions with **citation links to original sources pointing to specific paragraph blocks or timestamps**. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- AI Action buttons appear on hover over any card on the whiteboard; default + custom actions. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- AI Tutor: separate AI agent product (new); "An AI agent that guides you toward your goals through structured, personalized learning sessions." Pricing: Premium+ only. [Source: https://heptabase.com/, accessed 2025-08-07]

## 8. Agent Experience (Tana AI Agents, command nodes — DEEP)

Heptabase does NOT have a Tana-style "command node" agent system. Its "agent experience" is split into two surfaces:

1. **AI Chat on whiteboards** (passive conversational AI): models from OpenAI/Google/Anthropic; context = explicit user-curated selection (cards, sections, whiteboards, PDFs, videos, journals); output = messages that can be dragged onto whiteboard as cards. No autonomous multi-step execution; user drives every step. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
2. **AI Tutor** (new, May 2026 launch): "An AI agent that guides you toward your goals through structured, personalized learning sessions." Demo transcript on homepage shows a multi-turn tutor that "starts planning the lesson", "Lesson page created", "creates parts", with user (Alan) saying "I'd like to continue this course." Course-syllabus example: "History of Western Philosophy" with topics 0-6 (Course Intro → Pre-Socratics → Socrates → Plato → Aristotle → Hellenistic → Medieval), each topic has 5-12 sub-lessons. [Source: https://heptabase.com/, accessed 2025-08-07]
3. **Heptabase CLI**: "works with Claude Code, Codex, etc." — a CLI that exposes Heptabase as an MCP-like surface for coding agents. Linked repo: github.com/heptameta/heptabase-cli-skills. [Source: https://heptabase.com/, accessed 2025-08-07]
4. **AI Actions** (per-card): hover any card → AI action buttons → default or custom actions (e.g. summarize, extract). [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]

[Not directly accessed: the AI Tutor's full agentic loop, custom-actions configuration UI, and CLI commands — only the marketing surfaces were fetched.]

## 9. Memory (notes as memory, daily notes, block refs)

- **Cards** as atomic memory units stored in Card Library; reusable across whiteboards. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Block-level backlinks**: "type `@` in the card editor to mention other cards, and you can see all the block-level backlinks in the info section of the card. These interconnected cards together form a knowledge network that belongs to you." [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Daily Journals**: cards-of-type Journal with calendar view. [Source: https://heptabase.com/, accessed 2025-08-07]
- **Highlight Cards**: extracted highlights from PDFs/web via Web Clipper + Readwise integration. [Source: https://heptabase.com/, accessed 2025-08-07]

## 10. Knowledge (graph, backlinks, unlinked references, supertags, queries, Bases)

- **Bi-directional links** at block level — homepage section "Bi-Directional Links" with backlink source note + active note diagrams. [Source: https://heptabase.com/, accessed 2025-08-07]
- **Tags** + **Properties** on cards — Card Library includes "card databases with tags and properties" (Fundamentals 102 video title). [Source: https://wiki.heptabase.com/, accessed 2025-08-07]
- **Whiteboards as visual context graphs** — the spatial arrangement IS the structure; arrows express relationships; sections group objects; sub-whiteboards nest. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- No Datalog or Bases concept; queries are via "Search" tool (per-whiteboard and global). [Source: https://wiki.heptabase.com/fundamental-elements (toolbar Search tool), accessed 2025-08-07]

## 11. Search (in-vault search, query languages — Datalog, Bases, Queries)

- **Global Tool** = "Search tool of the browser" — searches the entire card library. [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
- **Per-whiteboard Search** toolbar tool — searches only the current whiteboard. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- No query language (no Datalog, no Dataview equivalent) — search is keyword-based.
- Tag-based filtering and property-based filtering exist in Card Library (Fundamentals 102 covers "card databases with tags and properties"). [Source: https://wiki.heptabase.com/, accessed 2025-08-07]

## 12. Execution (AI tool calls if any)

- AI chat can drag messages to whiteboard → cards (manual). [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- AI Actions on cards (hover → action buttons) perform single-step transforms. [Source: same]
- AI Tutor plans lessons, creates pages, generates lesson parts — appears to be a structured agent loop ("Thought completed → Start planning the lesson → Lesson progress 0/4 completed"). [Source: https://heptabase.com/, accessed 2025-08-07]
- Heptabase CLI: "works with Claude Code, Codex, etc." — coding-agent integration via MCP-like skills. [Source: https://heptabase.com/, accessed 2025-08-07]
- [Not directly accessed: does the AI autonomously file work, call external tools, or execute multi-step plans outside Tutor? The wiki only describes user-driven chat. No tool-calling API documented on fetched pages.]

## 13. Artifacts (cards, blocks, canvases, whiteboards)

- **Card** (atomic): Note, Journal, Highlight, PDF, Video, Audio, Image. All in Card Library. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Whiteboard** (spatial canvas): unlimited 2D; supports cards, text, sections, mindmaps, journals, sub-whiteboards. Cards don't belong to whiteboards — they're placed on them. Same card can be on multiple whiteboards. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Section** (grouping within whiteboard): group related objects. [Source: same]
- **Sub-whiteboard**: nested whiteboards for sub-topics. [Source: same]
- **Mindmap** mode: toggle on whiteboard objects for hierarchical visualization. [Source: same]
- **Arrows/connections**: labeled, colored, can connect to groups. [Source: same]

## 14. Keyboard UX (slash, hotkeys, command palette)

- **Slash menu**: "type `/` in the card editor to add any types of blocks you want: headings, lists, to-dos, toggles, tables, images, audio, videos, files, PDFs, code snippets, math equations, and dates." [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **@ mention**: type `@` in card editor to mention other cards (block-level backlinks). Also used in chat to add cards/sections/whiteboards as context. [Source: https://wiki.heptabase.com/fundamental-elements, https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- **Keyboard shortcuts** page exists on wiki (linked from Getting Started): `/keyboard-shortcuts`. [Source: https://wiki.heptabase.com/, accessed 2025-08-07] [Not directly accessed — page link exists but content not fetched.]
- Right-click context menus are heavily used (whiteboard objects, PDFs). [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- Left-side whiteboard toolbar: Select, Note card, Upload, Connect, Text, Section, Search, Journal, Calendar, Mindmap, sub-whiteboard, shortcut. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]

## 15. Motion (animations, transitions)

- The wiki page screenshots show "Hero Video Poster" implying an animated hero on the homepage. [Source: https://heptabase.com/, accessed 2025-08-07]
- AI Tutor demo on homepage shows multi-step transcript animations (lesson parts revealing). [Source: same]
- [Not directly accessed: actual motion design not observable in static HTML. Recommend R3 install.]

## 16. Animation (specific)

- AI Tutor session shows "Thought completed" status + "Lesson page created" + "Lesson part created" — appears to be progressive disclosure animation. [Source: https://heptabase.com/, accessed 2025-08-07]
- [Otherwise not directly accessed.]

## 17. Visual Hierarchy (where eye goes)

- The **active whiteboard** dominates center; **left sidebar** (tabs/bookmarks) is secondary; **right sidebar** (plugins) is tertiary; **Chat panel** slides in top-right of whiteboard on demand. [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
- On the whiteboard, the eye follows the spatial arrangement of cards + arrows; sections group visually. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]

## 18. Progressive Disclosure (foldable bullets, zoom-in, pane collapse)

- **Sub-whiteboards** allow zooming into sub-topics without leaving the main whiteboard context. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Card expand/collapse** via card info section (backlinks, whiteboard appearances). [Source: same]
- **Toggles** as a block type in card editor. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Mindmap mode** toggles a card's children into a mindmap view. [Source: same]
- **AI Tutor lesson progress** disclosed incrementally ("0/4 completed"). [Source: https://heptabase.com/, accessed 2025-08-07]

## 19. Accessibility (a11y)

[Not directly accessed in fetched pages. Heptabase's wiki uses Docusaurus which has reasonable a11y defaults (skip-to-main-content link present: "Skip to main content" found in HTML). No specific a11y statement found on heptabase.com or wiki. Recommend R3 follow-up to test screen-reader behaviour, keyboard-only navigation, color contrast (Flexoki-like dark theme is shown).]

## 20. Performance Perception (large vault perf)

[Not directly accessed — no benchmarks in fetched sources.] Indirect signals:
- Multi-language docs (English / 中文 / 日本語) suggesting international adoption. [Source: https://wiki.heptabase.com/, accessed 2025-08-07]
- Card Library App as the storage layer (cards are not duplicated per whiteboard) implies scalable separation of storage from view. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- Version 1.101.1 in pricing download URLs suggests rapid iteration (100+ patch releases). [Source: https://heptabase.com/pricing, accessed 2025-08-07]

## 21. Trust (local-first, sync encryption, plugin security)

- Heptabase is **cloud-first** (cards stored on Heptabase servers — not local-first like Obsidian/Logseq). Sync is implicit (web/desktop/mobile apps). [Source: https://heptabase.com/, accessed 2025-08-07]
- Privacy Policy + Terms at /privacy_policy and /terms_of_service. [Source: https://heptabase.com/pricing (footer), accessed 2025-08-07]
- No mention of E2E encryption in fetched pages (unlike Obsidian). [Source: cross-check of /, /pricing, /work-with-ai — no E2E mention]
- SOC2 / GDPR / HIPAA compliance not mentioned on heptabase.com (these were advertised for Tana). [Source: https://heptabase.com/, accessed 2025-08-07]
- AI model selection transparency: "OpenAI, Google, and Anthropic" models selectable by user. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- AI citation/provenance: AI responses include citation links to original sources pointing to specific paragraph blocks/timestamps — strong explainability primitive. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- Pricing tiers gate AI credits: Pro 100 credits/mo, Premium 1,800/mo, Premium+ 8,100/mo — usage is metered. [Source: https://heptabase.com/pricing, accessed 2025-08-07]

## 22. Explainability (AI citations — Heptabase per-paragraph citations)

**Strong, evidence-backed:**
- "AI responses will include citation links to the original sources, pointing to specific paragraph blocks or timestamps—just click to jump to the corresponding location." [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- Chat context is explicit & user-curated: "add specific cards or an entire whiteboard to the context" via `+` button or `@` mention. [Source: same]
- Right-click PDFs/videos/journals to add to chat — provenance is structural (every AI answer traces back to objects on the whiteboard). [Source: same]
- AI Action buttons only appear on hover over cards — every AI transform is grounded in a specific card. [Source: same]
- AI Tutor: shows "Thought completed" status before each action, providing step-level transparency. [Source: https://heptabase.com/, accessed 2025-08-07]

## 23. Long Session Experience (after 1hr)

[Not directly accessed.] Indirect signals:
- Visual/spatial nature of whiteboards mitigates outliner fatigue (Tana/Logseq weakness).
- AI chat is offloaded to a side panel — reduces eye strain on the main canvas.
- The "browser-like" UI pattern means users accustomed to tabs will find mental load manageable. [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
- Sub-whiteboards allow zoom-in to manage cognitive load. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]

## 24. Power User Features

- **Card databases with tags and properties** (Fundamentals 102 video). [Source: https://wiki.heptabase.com/, accessed 2025-08-07]
- **Custom AI Actions** — define your own per-card actions. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
- **PDF annotation + parsing** with OCR (Premium+ tier). [Source: https://heptabase.com/pricing, accessed 2025-08-07]
- **Readwise + Zotero integrations** for research workflows. [Source: https://heptabase.com/, accessed 2025-08-07]
- **Mindmap mode** on any whiteboard object. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **Heptabase CLI** for Claude Code / Codex integration. [Source: https://heptabase.com/, accessed 2025-08-07]
- **Sub-whiteboards + sections + arrows + groups** for hierarchical spatial organization. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
- **AI Tutor** for structured learning paths with course syllabi. [Source: https://heptabase.com/, accessed 2025-08-07]

## 25. Developer Experience

- **Heptabase CLI**: github.com/heptameta/heptabase-cli-skills — designed for coding agents (Claude Code, Codex). [Source: https://heptabase.com/, accessed 2025-08-07]
- **Public wiki** at wiki.heptabase.com (Docusaurus) — full docs, roadmap, changelog, newsletters. [Source: https://wiki.heptabase.com/, accessed 2025-08-07]
- **Public roadmap + changelog**: wiki.heptabase.com/roadmap and /changelog. [Source: same]
- No plugin API / SDK documented in fetched pages (unlike Obsidian). Extensibility is via CLI + custom AI Actions (which are user-defined, not developer-distributed).
- AMA records (Reddit Oct 2023, Nov 2024, Aug 2024) — open Q&A culture. [Source: https://wiki.heptabase.com/, accessed 2025-08-07]

## 26. Biggest Strengths (with evidence)

1. **Spatial thinking tool** — whiteboards as primary surface is differentiated vs. Obsidian/Logseq/Tana (which are document/outliner-first). Founder's "deep understanding" framing is grounded in this. [Source: https://wiki.heptabase.com/version-one, accessed 2025-08-07]
2. **Card / Whiteboard decoupling** — "Whiteboards do not own cards" enables the same card on multiple whiteboards (mirrors how the brain reuses concepts). [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
3. **Per-paragraph AI citations** — strongest explainability primitive of the 4 products. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
4. **AI Tutor (new)** — structured multi-turn agent with course syllabi + progress tracking; differentiated vs. flat chat. [Source: https://heptabase.com/, accessed 2025-08-07]
5. **CLI for coding agents** — early bet on MCP-style agent integration. [Source: https://heptabase.com/, accessed 2025-08-07]
6. **Design-driven culture** — Alan Chan's manifesto emphasizes UI polish and "out-of-the-box" low learning curve. [Source: https://wiki.heptabase.com/version-one, accessed 2025-08-07]
7. **Multi-language docs** (EN/中文/日本語). [Source: https://wiki.heptabase.com/, accessed 2025-08-07]
8. **Research-source integrations**: Readwise, Zotero, PDF OCR, YouTube transcripts, Web Clipper. [Source: https://heptabase.com/, accessed 2025-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Not local-first / not E2E encrypted** — Heptabase stores data on its servers; no E2E encryption mentioned; no SOC2/HIPAA. This is a trust gap vs. Obsidian (Cure53+Trail of Bits audits) and is in tension with the "researcher" persona (sensitive academic data). [Source: cross-check of /, /pricing, /work-with-ai; no E2E/SOC2 mention]
2. **Metered AI credits** — Pro 100 credits/mo, Premium 1,800, Premium+ 8,100. Power users will hit ceilings; "unlimited usage of basic AI chats after hitting credit limit" only at Premium+. [Source: https://heptabase.com/pricing, accessed 2025-08-07]
3. **Pricing relatively high** — $8.99/$17.99/$53.99 per month (yearly). Premium+ is $648/year. [Source: https://heptabase.com/pricing, accessed 2025-08-07]
4. **No plugin ecosystem** — extensibility is custom AI Actions (user-defined) + CLI; no third-party plugin marketplace. [Source: cross-check of fetched pages]
5. **Visual/spatial bias** — whiteboards scale poorly for very large knowledge bases; the founder's own video "Heptabase Fundamentals 102: Organizing topics with nested whiteboards and tab groups" implies users must build their own hierarchy. [Source: https://wiki.heptabase.com/, accessed 2025-08-07]
6. **No query language** — no Dataview/Bases/Datalog equivalent; users cannot programmatically retrieve slices of their knowledge base (only keyword search). [Source: cross-check of fetched pages]
7. **YC-backed with VC investors** (Kleiner Perkins, HOF, Moving Capital) — Alan Chan's vision is ambitious but the company is VC-funded, which is a different trust posture than Obsidian's 100% user-supported. [Source: https://heptabase.com/, accessed 2025-08-07]
8. **Closed-format storage** — cards live in Card Library on Heptabase servers; no documented open-format export to a portable format like Markdown/JSON Canvas (the wiki mentions export but the format is not documented as open). [Source: cross-check; export mentioned but format not specified]

## 28. What should MiMo learn? (evidence-based)

1. **Per-paragraph AI citations** — every AI answer links to specific paragraph blocks/timestamps in source material. This is the strongest explainability primitive of the four products. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
2. **Card / Whiteboard decoupling** — atomic cards stored once, placed on many whiteboards. MiMo's "card" abstraction should similarly be storage-decoupled from view. [Source: https://wiki.heptabase.com/fundamental-elements, accessed 2025-08-07]
3. **Browser-like UI** for knowledge networks — left sidebar = tabs/bookmarks, right sidebar = plugins, global tool = search. Familiar mental model, lower learning curve. [Source: https://wiki.heptabase.com/getting-started-with-heptabase, accessed 2025-08-07]
4. **AI context as explicit user curation** — `+` button + `@` mention to add cards/sections/whiteboards/PDFs/videos to chat context. User controls what the AI sees. [Source: https://wiki.heptabase.com/work-with-ai, accessed 2025-08-07]
5. **Custom AI Actions on hover** — every card exposes a hover action menu; users define their own. [Source: same]
6. **"Research a topic" workflow** — upload sources → auto-parse → AI answers with citations → click "New card" to save. This is a clean capture→understand→save loop. [Source: same]
7. **AI Tutor as structured agent** — "Thought completed" status before each action, syllabus published up-front, lesson parts created incrementally — a model for transparent multi-step agents. [Source: https://heptabase.com/, accessed 2025-08-07]
8. **Founder's "knowledge lifecycle" framing** — explore → collect → think → create → share. MiMo should map its features to phases of this lifecycle. [Source: https://wiki.heptabase.com/version-one, accessed 2025-08-07]
9. **CLI for coding-agent integration** — bet on MCP/Claude Code/Codex ecosystem as a primitive agent surface. [Source: https://heptabase.com/, accessed 2025-08-07]
10. **Vision-driven product with public wiki** — multi-year "My Vision" series provides narrative continuity that builds user trust. [Source: https://wiki.heptabase.com/the-context, accessed 2025-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **Cloud-first storage without E2E** — Heptabase stores data on its servers with no documented E2E encryption; this is a competitive disadvantage for trust-sensitive users. [Source: cross-check]
2. **Metered AI credits** — gating AI usage by monthly credits creates anxiety ("will I run out?"). MiMo should prefer rate-limited-but-unlimited or pay-as-you-go. [Source: https://heptabase.com/pricing, accessed 2025-08-07]
3. **No query language** — Heptabase users cannot retrieve "all #concept notes tagged X with field Y". MiMo should ship a query language (Bases-style or Datalog-style). [Source: cross-check]
4. **No plugin marketplace** — user-defined AI Actions only; no third-party developer distribution. MiMo should ship a plugin API if it wants ecosystem gravity. [Source: cross-check]
5. **Visual-only navigation** — whiteboards don't scale to 10k+ notes; MiMo should pair spatial views with text/query navigation. [Source: cross-check]
6. **Closed-format storage** — Card Library is proprietary. MiMo should learn from Obsidian's "file-over-app" and ship portable open formats. [Source: cross-check]

## 30. Confidence Score (0-100) with reasoning

**Score: 76/100**

**Reasoning:**
- ✅ Strong: Home, pricing, full wiki (fundamentals, work-with-ai, version-one, roadmap, context, getting-started) all directly fetched from official URLs. Alan Chan's vision is richly documented.
- ✅ Strong: AI citation primitive directly quoted ("specific paragraph blocks or timestamps").
- ✅ Strong: Card/Whiteboard/Action architecture is documented end-to-end in wiki/fundamentals.
- ❌ Weak: No first-hand product use (no install). UI micro-interactions, actual animation feel, performance under load — not observed. Reduced ~8 pts.
- ❌ Weak: AI Tutor full agent loop not documented (only demo transcript shown on homepage). Reduced ~4 pts.
- ❌ Weak: Heptabase CLI repo (github.com/heptameta/heptabase-cli-skills) not fetched — CLI command surface unknown. Reduced ~4 pts.
- ❌ Weak: Privacy/security model not detailed in fetched pages (no E2E claim verified; absence-of-claim is not claim-of-absence but worth R3 verification). Reduced ~3 pts.
- ❌ Weak: Plugin/extension model absent — confirmed by cross-check but worth verifying via support.heptabase.com. Reduced ~2 pts.
- ⚠️ Adequate: Pricing/credits clear; changelog page exists but content not deeply fetched. Reduced ~3 pts.

**Net confidence: 76/100** — sufficient for product-research synthesis on architecture, philosophy, AI integration, and pricing. Insufficient for implementation-level UI/UX micro-decisions without an actual product install.
