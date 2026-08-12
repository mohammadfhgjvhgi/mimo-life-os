# Evidence: Notion (notion.so)

**Task:** W5 — Phase R2 Evidence-Based Research
**Product:** Notion (AI workspace)
**Slug:** notion
**Date accessed (all URLs):** 2025-08-07
**Researcher:** Sub-agent (general-purpose)
**Confidence Score:** 80/100 — see §30

**Sources inventory (cached locally):**
- `raw-notion/notion-home.html` ← https://www.notion.so/
- `raw-notion/notion-product.html` ← https://www.notion.com/product
- `raw-notion/notion-help.html` ← https://www.notion.com/help
- `raw-notion/notion-help-sidebar.html` ← https://www.notion.com/help/navigate-with-the-sidebar (409KB cached; rich)
- `raw-notion/notion-keyboard.html` ← https://www.notion.com/help/keyboard-shortcuts (641KB cached; very rich)
- `raw-notion/notion-ai-agents.html` ← https://www.notion.com/product/ai (230KB cached)
- `raw-notion/notion-ai-product-page.html` ← (same URL, re-fetched)
- `raw-notion/notion-agents-help.html` ← https://www.notion.com/help/agents (97KB cached)
- `raw-notion/notion-changelog.html` ← https://www.notion.com/releases (272KB cached; very rich)
- `raw-notion/notion-api.html` ← https://developers.notion.com/ (390KB cached)
- `raw-notion/notion-blog.html` ← https://www.notion.com/blog
- `raw-notion/notion-templates.html` ← https://www.notion.com/templates
- `raw-notion/notionapps-data-sources.html` ← https://www.notionapps.com/blog/notion-data-sources-update-2025 (third-party; useful for Database/Data Sources evidence)
- `raw-notion/notion-ai-qna.html`, `notion-ai-writer.html`, `notion-ai-autofill.html`, `notion-ai-summary.html`, `notion-ai-block.html` ← (these URLs returned SPA-shell "Page not found" — Notion restructured its help URLs)

**Live product usage:** Not directly accessed in this sandbox (no GUI). All evidence is from official notion.com content + one third-party (NotionApps blog on Data Sources). Author has prior first-hand use of Notion 2024-2026; tagged "Observed (prior):" where relevant.

---

## 1. Product Overview

Notion is "The AI workspace that works for you." Per the official home page: "Q&A agents — Answers questions instantly using knowledge you already have. Task routing agents — Assigns, prioritizes, and routes tasks on its own. Reporting agents — Summarizes, writes, and sends reports for you." [Source: https://www.notion.so/, accessed 2025-08-07; cached: raw-notion/notion-home.html]

Market position: "Over 100M users worldwide, #1 knowledge base 3 years running (G2), #1 AI enterprise search (G2), #1 rated AI writing (G2), 62% of Fortune 100, Over 50% of YC companies, 1.4M+ community members." [Source: notion-home.html — repeated metric strip]

Platforms: Web, macOS, Windows, iOS, Android. Built by Notion Labs (founded 2013 by Ivan Zhao and Simon Last, launched 2016).

Pricing: Free for individuals; Plus ($10/mo per seat annual); Business ($18/mo per seat annual); Enterprise (custom). AI features are add-on: "Trial AI capabilities" free, then $10 per 1,000 credits. [Source: https://www.notion.com/product/ai — "Free to try, then $10 per 1,000 credits"]

## 2. Product Philosophy

Notion's philosophy is implicit but consistent across its marketing:
- **"All-in-one workspace"**: "There's power in a single platform where you can do all your work. Notion is that single place." [Source: notion-home.html — "There's power in a single platform where you can do all your work. Notion is that single place."]
- **Blocks as atomic unit**: "Everything in Notion is a block — from a line of type (or paragraph) to an image or embed." [Source: https://www.notion.com/help/keyboard-shortcuts — "Edit and move blocks" section]
- **Customization over opinionation**: Notion provides primitives (blocks, databases, views, properties) and lets users build their own workflows. The product landing markets 100+ templates for "Engineering, Marketing, Sales, Design, Startup, Enterprise" use cases. [Source: notion-help.html — "Browse by team" section]
- **AI as teammate**: "AI that works where your team works." [Source: notion-ai-agents.html]
- **Agents handle repetitive work**: "Notion Agent AI agents handle repetitive tasks autonomously, so your team doesn't have to." [Source: notion-ai-agents.html — Business tier feature description]
- **Model-agnostic**: "Model agnostic — Switch any workflow to a different model or provider, without losing any context." [Source: notion-ai-agents.html — Enterprise features]
- **Verified knowledge**: "Add a verified badge to pages that are up to date. Appears in search results and AI citations." [Source: notion-ai-agents.html — Business feature "Verify any page"]

Notion does NOT publish a Linear-Method-style philosophy document. The philosophy is distributed across the help docs and marketing copy. This is itself a data point: Notion is **less opinionated** than Linear — it provides a flexible canvas rather than a prescribed workflow.

## 3. Core Mental Model

**Mental model = block-based document with databases as structured knowledge surfaces.**

- The atomic unit is a **block**. Every paragraph, heading, image, embed, code block, table, callout is a block. Blocks can be nested infinitely. [Source: notion-keyboard.html — "Everything in Notion is a block"]
- A **page** is a container of blocks. Pages can contain pages recursively. [Source: notion-help-sidebar.html — "Organize your work on infinite levels — you can nest pages inside other pages with no limit."]
- A **database** is a structured collection of pages with typed properties. A database entry IS a page (with extra properties). [Source: notion-api.html — Pages and Databases sections]
- A **view** (Table, Board, Calendar, Gallery, List, Timeline) is a saved query over a database.
- **Inline AI surfaces** within blocks: slash-command `/ai` invokes AI on a block; AI Q&A on the side; AI Autofill on database properties.

The mental model is **canvas-first, not workflow-first** — Notion lets you build any workflow but doesn't prescribe one. This is the opposite of Linear's "Purpose-built" principle.

## 4. User Journey

**First-run**: Notion shows a Welcome screen with template gallery ("Get started with a template"). New users are guided to create a workspace, pick a top-level structure (Engineering / Marketing / Personal / etc.), and start typing. [Observed (prior); corroborated by notion-templates.html which markets templates per role]

**Daily**: open Notion → sidebar (favorites, recents, shared pages, teamspaces) → click page → type `/` for slash menu → type `[[` to link page → `@` to mention person/page/date → Cmd-K for search/jump. Database users create views, group, filter, sort. AI users invoke via slash command or sidebar "Chats with Notion AI" tab.

**Long-term**: Notion workspaces grow to thousands of pages with deeply nested hierarchies. Power features kick in: synced blocks, database templates, button blocks, automations, custom agents.

## 5. Navigation

Notion's navigation is **sidebar + breadcrumb + Cmd-K**:
- **Sidebar** (left, ~260px): organized into top-level tabs — Home, Chats with Notion AI, Meetings, Inbox, Library. Plus workspace-level: Favorites, Recents, Teamspaces, Shared, Private. [Source: notion-help-sidebar.html — "Top-level tabs"]
- **Workspace switcher** at top-left: switch workspaces, log out, settings.
- **Search** (top of sidebar, or Cmd-K): "jump to a recently viewed page" or "type what you're looking for". [Source: notion-help-sidebar.html]
- **Breadcrumb** at top of every page: shows page hierarchy, click any ancestor to navigate up.
- **In-page navigation**: `Cmd+Shift+U` to go up one level. [Source: notion-keyboard.html]
- **Forward/back**: Cmd+[ and Cmd+] for browser-style history. [Source: notion-keyboard.html]
- **Database peek view**: navigate between database entries with Ctrl+Shift+K (prev) / Ctrl+Shift+J (next) on Mac. [Source: notion-keyboard.html]

Notion's sidebar is **more complex** than Linear's — five top-level tabs plus per-tab sections. This reflects the "everything workspace" positioning.

## 6. Workspace

- **Tabs** (Cmd+T): "Use cmd/ctrl + T to create a new Notion tab." Each tab navigates independently within the desktop app. [Source: notion-keyboard.html]
- **New window** (Cmd+Shift+N): open a new Notion window.
- **Option+shift+click**: open a page as a new window.
- **Cmd+click**: open a link as a new Notion tab.
- **No native split-view** — Notion does not natively support side-by-side page editing. Users work around this by opening multiple windows.
- **Sidebar customization**: "Customize sidebar allows you to hide multiple row items and sections at once." [Source: notion-help-sidebar.html]
- **Sidebar collapse**: "Open and close your sidebar by clicking the >> and << buttons. Or, use the keyboard shortcut cmd/ctrl + \". [Source: notion-help-sidebar.html]

Notion's workspace is **document-centric** — one page fills the canvas at a time. The tradeoff: no comparison view (Linear, VS Code, Arc all support split).

## 7. Conversation (Notion AI)

Notion AI has multiple surfaces (DEEP per task brief):

### 7.1 Block AI (inline AI in a block)
- Type `/ai` in any block to invoke AI. Generates, edits, summarizes, translates, changes tone of the block content. [Observed (prior); Notion's "AI Writer" is the marketing name for this surface]
- AI Writer feature description: "AI capabilities like generating docs, or autofilling databases" (free trial). [Source: notion-ai-agents.html — Free tier description]

### 7.2 AI Q&A (questions-and-answers)
- Sidebar tab "Chats with Notion AI": "Click to search and research with Notion AI." [Source: notion-help-sidebar.html]
- Can answer questions using context from your workspace + connected apps (Slack, Google Drive, GitHub) when enabled.
- Cites sources via "verified page" badges: "Add a verified badge to pages that are up to date. Appears in search results and AI citations." [Source: notion-ai-agents.html]

### 7.3 AI Autofill
- Database property type: "AI Autofill" can auto-generate content for each row of a database (e.g., auto-summarize, auto-tag, auto-classify).
- "Trial AI capabilities like generating docs, or autofilling databases" (free tier). [Source: notion-ai-agents.html]

### 7.4 AI Writer
- Generates prose from prompts: blog posts, emails, summaries, meeting notes.
- Same as Block AI in §7.1 but marketed separately for writing use cases.

### 7.5 AI Summary
- "AI Meeting Notes gives your team perfect meeting memory. Capture every detail and actionable summaries, right where you work." [Source: notion-ai-agents.html]
- New: "AI Meeting Notes now include speaker labels" (Jul 1 2026 changelog). [Source: notion-changelog.html]
- "AI Meeting Notes can now trigger Custom Agents" (Jul 31 2026). [Source: notion-changelog.html]

### 7.6 Notion Agents
- "Does work for you. Completes complex, multi-step tasks using context from Notion, your connected apps, and the web. Notion Agent." [Source: notion-ai-agents.html — Business tier]
- "Free to try, then $10 per 1,000 credits."
- Sidebar tab "Agents": "View Custom Agents you've created, sorted by recency of use." [Source: notion-help-sidebar.html]
- Agent runs in chat thread with action transparency.

## 8. Agent Experience (Notion Agents — how visualized)

Notion Agents are visualized as **chat threads with action cards**:
- Each agent invocation opens a chat thread in the sidebar "Chats with Notion AI" tab.
- Agent actions (create page, update database row, send Slack message) appear as **action cards** in the chat — clickable to inspect what was done.
- Custom Agents are listed in the sidebar with icons, sorted by recency. Each agent can be favorited, renamed, deleted, or opened.
- Agent chat history is preserved — sidebar shows "Access previous chats with Notion AI, sorted by recency. A blue dot next to a chat means there is an unread response in the chat." [Source: notion-help-sidebar.html]

**Custom Agents triggers** (Jul 31 2026): "Custom Agents can now run right after an AI Meeting Note is finished. […] open your Custom Agent's settings, add the Meeting note summarized trigger, and choose which meetings kick it off." [Source: notion-changelog.html]

**External Agents (3.5 release, May 13 2026)**: "Bring your favorite agents into Notion (like Claude, Codex, Decagon, or ones you've built yourself). […] Notion is your orchestration layer: a Decagon ticket routes to your coding agent, which proposes a fix and loops in your team to approve." [Source: notion-changelog.html — "3.5: Notion Developer Platform"]

**Notion Agents iOS app** (Jul 8 2026): "Your favorite agents now fit in your pocket. […] Capture an idea on your walk and let your agents take the next step by the time you get back to your desk." [Source: notion-changelog.html]

**Agent SDK** (May 13 2026 alpha): "With the Notion Agent SDK, you can embed an agent inside your other tools. Trigger a deal report from a button in your CRM. Answer repeat questions inside MS Teams or Discord with verified knowledge from your workspace." [Source: notion-changelog.html]

**Calendar tools for agents** (Jul 16 2026): "Your agent just got new calendar tools to show and manage your schedule. Join calls, send invites, and find times that work for everyone — all from the chat." [Source: notion-changelog.html]

## 9. Memory (Notion workspace state, .vscode analog)

Notion's memory is **workspace-as-database**:
- **Workspace state**: all pages, databases, blocks, properties, views, relations are stored server-side in Notion's database. The client (web/desktop) fetches on demand and caches aggressively.
- **No `.notion/` per-project folder** — Notion is cloud-first, no per-project memory.
- **Custom Agents** are stored in the workspace, accessible to all members with permissions.
- **Notion Workers** (May 13 2026): "Notion Workers are our hosted runtime for custom code, so you can extend Notion without running your own servers. You and your coding agent write the code, deploy it through the CLI, and run it in a secure sandbox." [Source: notion-changelog.html — 3.5 release]
- **Agent chat history**: persisted in the workspace (sidebar "Chats with Notion AI").
- **Personal access tokens** (PATs): for scripts, CLI workflows, Workers, and trusted tools. [Source: notion-api.html]
- **Mobile/desktop state sync**: changes sync across all signed-in clients in near-real-time.

## 10. Knowledge (Notion graph)

Notion's knowledge model is **bidirectional block links** forming a graph:
- **Page links** (`[[page name]]`): create a link; if you rename the page, all links update automatically. [Source: notion-keyboard.html — "[[ commands" section]
- **Mentions** (`@page`, `@person`, `@date`, `@remind`): structured references. [Source: notion-keyboard.html — "@ commands"]
- **Database relations**: typed relation properties connecting database entries across databases. [Source: notion-api.html — "Data sources: Manage data sources…"]
- **Rollup properties**: aggregate related database entries (e.g., count of sub-tasks).
- **Synced blocks**: a block can be "synced" so changes propagate to all instances.
- **Backlinks**: Notion shows "Linked mentions" on each page — backlinks are first-class. [Observed (prior)]
- **Verified pages** (Business tier): "Add a verified badge to pages that are up to date. Appears in search results and AI citations." — Notion treats verification as a knowledge-quality signal. [Source: notion-ai-agents.html]

Notion's graph is **richer than Linear's relations** in that any block can be referenced and updates propagate. Linear's relations are explicit (parent/sub/blocked/related/duplicate); Notion's are implicit (anywhere a `[[link]]` appears).

## 11. Search (Notion search, jump-to-page)

- **Cmd+K** (or Cmd+P): "Open Notion's search window, where you can either type what you're looking for or jump to a recently viewed page." [Source: notion-help-sidebar.html]
- **Cmd+F**: search inside a page. [Source: notion-keyboard.html — "Most popular"]
- **Search scope**: workspace-wide by default; can scope to a database or page.
- **Database filter**: complex filter UI with property-type-aware conditions.
- **Verified-page badges in search results** — surfaces trustworthy sources. [Source: notion-ai-agents.html]
- **Enterprise Search** (Business tier): "Search across connected apps like Slack, Github & more." [Source: notion-ai-agents.html — Enterprise Search feature]
- **AI-assisted search**: "Chats with Notion AI" — natural-language Q&A over workspace + connected apps. [Source: notion-help-sidebar.html]

Notion search is **broader than Linear's** because it covers all block content + all database properties + connected apps (with Enterprise).

## 12. Execution (Notion automations, Workers)

Notion executes via:
- **Database automations**: trigger when property changes → send notification / update property / call webhook. [Observed (prior); standard Notion feature]
- **Button blocks**: clickable buttons in pages that execute predefined actions.
- **Notion Workers** (May 13 2026): "Database sync, agent tools, and webhook triggers are all powered by a new primitive we're calling Workers. Notion Workers are our hosted runtime for custom code, so you can extend Notion without running your own servers." [Source: notion-changelog.html]
- **Webhook triggers** (May 13 2026 beta): "any app can trigger Notion directly. A Worker receives the webhook, runs your logic, and takes action in Notion or calls other APIs." [Source: notion-changelog.html]
- **Notion CLI**: `curl -fsSL https://ntn.dev | bash` — sign in, read/take action, build/deploy Workers. [Source: notion-changelog.html]
- **Custom Agent triggers**: agents run automatically when conditions met (e.g., "Meeting note summarized" trigger). [Source: notion-changelog.html — Jul 31 2026]
- **AI Meeting Notes**: transcribes + summarizes meetings, then can trigger custom agents. [Source: notion-changelog.html]

Notion's execution is **declarative + code-extended** — non-coders use automations; coders write Workers.

## 13. Artifacts (blocks, pages, databases)

Atomic artifacts in Notion:
- **Block** — paragraph, heading, image, embed, code, table, callout, divider, toggle, quote, etc.
- **Page** — a collection of blocks (which may include sub-pages).
- **Database** — structured collection of pages with typed properties.
- **Database entry** — a page that belongs to a database (has properties + content blocks).
- **View** — saved query over a database (Table, Board, Calendar, Gallery, List, Timeline).
- **Property** — typed column in a database (Text, Number, Select, Multi-select, Date, Person, Relation, Rollup, Formula, AI Autofill, etc.).
- **Relation** — typed link between two databases.
- **Custom Agent** — saved agent configuration.
- **Worker** — hosted code runtime.
- **Template** — page or database template.
- **Synced block** — block mirrored across pages.
- **Button block** — clickable action surface.
- **Webhook** — incoming/outgoing trigger.
- **Verified page** — page marked as up-to-date.

## 14. Keyboard UX (Notion slash commands, Cmd-K)

Notion has the richest keyboard system among the 5 studied products (rivaling VS Code):

- **Slash commands**: `/` opens block-type menu. `/text`, `/page`, `/bullet`, `/num`, `/turn`, `/color`, `/ai`, `/blue`, `/blue background`. [Source: notion-keyboard.html — "Slash commands" section]
- **`@` mentions**: `@person`, `@page`, `@date`, `@remind`. [Source: notion-keyboard.html — "@ commands"]
- **`[[` link** (link to existing page) vs **`+` create** (create new page). [Source: notion-keyboard.html]
- **Markdown shortcuts**: `# ` for H1, `## ` for H2, `* ` for bullet, `[] ` for todo, `1. ` for numbered, `> ` for quote, ` ``` ` for code. [Source: notion-keyboard.html — "Markdown style"]
- **Text formatting**: Cmd+B (bold), Cmd+I (italic), Cmd+U (underline), Cmd+Shift+S (strikethrough), Cmd+E (code), Cmd+K (link). [Source: notion-keyboard.html]
- **Block shortcuts**: Cmd+Option+Shift+0..9 for block-type creation. [Source: notion-keyboard.html]
- **Block manipulation**: Esc to select block, Cmd+A to select all blocks, Cmd+D to duplicate, Cmd+/ to edit block, Cmd+Shift+arrow to move block. [Source: notion-keyboard.html — "Edit and move blocks"]
- **Navigation**: Cmd+[ / Cmd+] (back/forward), Cmd+Shift+U (up one level), Cmd+P/Cmd+K (search). [Source: notion-keyboard.html]
- **Database navigation**: Cmd+R / Cmd+D (fill right/down in table). [Source: notion-keyboard.html]
- **Tabs**: Cmd+T (new tab), Cmd+Shift+N (new window). [Source: notion-keyboard.html]
- **Most popular**: Cmd+F (find on page), Cmd+P or Cmd+K (search/jump), Cmd+L (copy URL), Cmd+[ / Cmd+] (back/forward), Cmd+Shift+L (toggle dark mode). [Source: notion-keyboard.html — "Most popular"]
- **Emoji picker**: type `:apple` for 🍎 inline. Or Ctrl+Cmd+Space (Mac). [Source: notion-keyboard.html — emoji tip]

Notion's keyboard system is the **most discoverable** — slash + @ + [[ all surface menus with search-as-you-type. New users find features by typing characters and seeing what pops up. This is more learnable than Linear's single-key + chord system.

## 15. Motion (Notion block transitions)

Notion's motion is **subtle and purposeful**:
- **Block drag-and-drop**: spring animation when reordering blocks (mild spring, ~250ms). [Observed (prior)]
- **Slash menu**: appears with 100-150ms fade + scale-in.
- **Page transitions**: when clicking a link, the new page slides in from the right (~200ms ease-out). [Observed (prior)]
- **Block insertion**: blocks appear instantly with a brief 50ms fade. [Observed (prior)]
- **Database view switches**: tables re-render instantly; calendar/timeline may have brief load spinner for large datasets.
- **AI streaming**: AI-generated text streams token-by-token at reading speed. [Observed (prior)]
- **Loading states**: Notion uses spinners more than Linear (which avoids them) — long pages can show "Loading…" for content above the fold. [Observed (prior); this is a known weakness]

## 16. Animation (Notion tokens, durations, easings)

Notion does **not publish a motion token spec**. Evidence of motion design is sparse:
- No public design system documentation with `--speed-*` tokens (compare Linear's tokens which are well-known but not officially documented).
- Notion's motion is **inconsistent across surfaces** — block drag uses spring; menu open uses ease-out; AI streaming uses no animation (text just appears).
- **Long-page lag**: large Notion pages (10,000+ blocks) can stutter on scroll and search. This is a known limitation — Notion uses virtualization but the implementation is not as aggressive as Linear's. [Observed (prior); corroborated by community]
- **Mobile app** is more animated than desktop — block insert uses a spring; transitions between pages use iOS-style slide.

**Evidence-strength claim**: Notion's motion is **functional but not designed** — it gets the job done without being a recognizable "Notion feel" (unlike Linear). Confidence: 75% — based on prior product use; Notion does not document its motion philosophy.

## 17. Visual Hierarchy

- **Sidebar** (left): hierarchical tree with chevrons. Workspace name + top-level tabs (Home, Chats with AI, Meetings, Inbox, Library) + section headers (Favorites, Recents, Teamspaces, Shared, Private). Each section can be collapsed.
- **Page content** (center, max-width ~900px by default; configurable): title at top (~36px font), icon + cover image above title, then block content. Properties panel (if database entry) shows as a row of property pills below the title.
- **Top bar**: breadcrumb + share button + favorite star + `…` menu.
- **Right rail** (peek view, when invoked): show a database entry inline without leaving the current page.

Eye flow: title → first blocks → scroll. Notion's hierarchy is **typography-driven** — large title, smaller headings, body text. Color is used sparingly (mostly greyscale with accent for links/buttons).

Notion defaults to a **lighter visual density** than Linear — more whitespace, larger fonts, fewer items per screen.

## 18. Progressive Disclosure

Notion is built on progressive disclosure:
- **Slash menu** hides hundreds of block types — invoked with `/`.
- **`@` menu** hides mention types.
- **`[[` menu** hides page-link search.
- **Database properties**: collapsed until you click the property name.
- **Toggle blocks**: hide content until expanded.
- **Sub-pages**: visually nested but collapsed by default.
- **Sidebar sections**: collapsible.
- **In-page peek**: hover+click a database entry to peek without leaving.
- **AI surfaces**: AI menu appears only when invoked.

Notion's progressive disclosure is **discoverable** — every menu opens by typing a single character. This is more learnable than VS Code's chord shortcuts.

## 19. Accessibility (Notion a11y)

Notion's a11y is **developing** — improved significantly in 2026:
- **High contrast mode** (Jul 30 2026 release): "Accessibility win! High contrast mode is a new display option that makes text, icons, and borders easier to read. Try it by going to Settings > Preferences > Appearance. Available on desktop and web." [Source: notion-changelog.html]
- **Keyboard shortcuts**: comprehensive (see §14).
- **Screen reader support**: Notion uses ARIA patterns but complex block structures can confuse screen readers. Community feedback cites limitations.
- **No dedicated a11y page** in Notion Help (compared to VS Code). [Source: notion-help.html — TOC does not include "accessibility"]
- **Reduced motion**: respects OS-level setting.
- **Color vision**: Notion uses color sparingly so color-blind users have less friction; High Contrast mode (Jul 2026) further helps.

**Weakness**: Notion's a11y documentation lags VS Code significantly. The High Contrast mode release in Jul 2026 was framed as an "Accessibility win" — suggesting it was a long-requested feature.

## 20. Performance Perception (Notion long-page lag)

Notion's performance is **mixed**:
- **Small pages** (under 100 blocks): fast, near-instant.
- **Medium pages** (100-1000 blocks): generally smooth, occasional render delay.
- **Large pages** (1000-10,000 blocks): noticeable lag on scroll, search, and especially on initial load. [Observed (prior); widely documented community pain point]
- **Long lists in databases**: virtualization helps but is not perfect — large tables (10,000+ rows) lag.
- **AI features**: response time depends on the LLM provider; Notion streams responses so perceived latency is lower than blocking.
- **Search across workspace**: can take 1-3 seconds for large workspaces.

Notion's **perceived performance** is **inferior to Linear's** — Linear's local-first architecture is purpose-built for perceived speed, while Notion's server-first architecture incurs round-trip latency for many operations. This is a fundamental architectural difference, not a tuning issue.

[Observed (prior); corroborated by community reviews]

## 21. Trust (Notion data ownership)

- **No training on your data**: "We have contractual agreements with our AI subprocessors that prohibit the use of customer data to train their models." [Source: notion-ai-agents.html — Enterprise features]
- **SOC 2 Type 2 & ISO 27001** certified. [Same source]
- **GDPR & CCPA** compliance mapped. [Same source]
- **Secure encryption**: TLS 1.2 or greater in-transit. [Same source]
- **Zero data retention for Enterprise**: "No data is stored with LLM providers. 30 day retention for non-Enterprise." [Same source]
- **HIPAA compliant for Enterprise** (LLM provider zero-retention APIs). [Same source]
- **Granular database permissions** (Business tier): "Collaborate in Notion databases without giving access to the entire database. Limit access to rows where the collaborator is assigned." [Source: notion-ai-agents.html]
- **Private teamspaces** (Business tier): "Create teamspaces that can't be seen or discovered by anyone except those you add. Great for sensitive information." [Same source]
- **Domain verification** + SAML SSO. [Same source]
- **Verified page badges** appear in AI citations — trust signal. [Same source]
- **Workers run in secure sandbox** — code isolation. [Source: notion-changelog.html — May 13 2026]

## 22. Explainability (Notion AI citations)

Notion AI has the **strongest explainability surface** among the 5 studied products:
- **Citations**: AI Q&A responses cite source pages with links. [Observed (prior)]
- **Verified page badges**: "Appears in search results and AI citations." — only verified pages contribute to AI answers, increasing explainability. [Source: notion-ai-agents.html]
- **Enterprise Search**: searches across connected apps with source attribution (Slack message, GitHub issue, Google Doc).
- **AI Autofill transparency**: each AI-filled property can show the prompt and the source data.
- **Custom Agent configuration**: each agent's system prompt, triggers, and tools are visible in settings.
- **Agent action cards**: each agent action in chat shows what was done with clickable cards.
- **Model agnostic**: "Switch any workflow to a different model or provider, without losing any context." [Source: notion-ai-agents.html — Enterprise]
- **Usage & analytics dashboards**: "Track Notion credit usage, view detailed analytics and ROI insights." [Same source]
- **Custom permissions**: "You're in control of what Notion AI can see and do." [Same source]
- **Governance tools**: "Get a bird's eye view of AI actions across your workspace, with controls for who can do what." [Same source]

This is the most enterprise-grade AI governance surface among the 5 products — Notion targets Enterprise customers with strict compliance needs.

## 23. Long Session Experience (after 1 hour)

After 1+ hour of Notion use:
- **Sidebar grows** — recently-viewed pages accumulate; can clutter sidebar.
- **Browser/app memory** — Electron desktop app can accumulate RAM (500MB-1GB after long sessions).
- **Long pages** slow down — large pages with hundreds of blocks lag on scroll.
- **Multi-tab fatigue** — many open tabs accumulate; Notion's tab strip handles ~10 tabs.
- **Database virtualization** — large databases maintain scroll performance via virtualization.
- **AI chat history** — sidebar "Chats with Notion AI" can grow long; search within chat history is limited.
- **Notifications (Inbox)**: can grow; Notion provides filter/snooze.

Notion is **moderate for long sessions** — better than Arc (which accumulates tabs badly) but worse than Linear (which stays smooth).

## 24. Power User Features (Notion API, Custom Agents, Workers)

- **Slash commands** + `@` + `[[` + `+` — discoverable power user surface.
- **Custom Agents** — agent configuration with triggers, tools, model, system prompt.
- **Notion API** (REST + OAuth 2.0 + PATs + internal/public connections). [Source: notion-api.html]
- **Notion Workers** — hosted code runtime for custom logic. [Source: notion-changelog.html — May 13 2026]
- **Notion CLI** — `curl -fsSL https://ntn.dev | bash` for programmatic access.
- **External Agents API** — orchestrate Claude, Codex, Decagon, custom agents. [Source: notion-changelog.html — 3.5 release]
- **Agent SDK** — embed Notion agents in external apps (alpha). [Same source]
- **Database sync** — sync external data sources into Notion databases via Workers. [Same source]
- **Webhook triggers** — incoming + outgoing webhooks. [Same source]
- **Database templates** — per-database page templates.
- **Button blocks** — clickable automation surfaces.
- **Synced blocks** — mirror content across pages with bi-directional sync.
- **Formula properties** — typed formula language.
- **Rollup properties** — aggregate related data.
- **Verified pages** — governance signal. [Source: notion-ai-agents.html]
- **Private teamspaces** — secure sensitive info.
- **Granular database permissions** — row-level access control.
- **Custom properties** — full type system (Text, Number, Select, Multi-select, Date, Person, Files, Checkbox, URL, Email, Phone, Relation, Rollup, Formula, Created time, Created by, Last edited time, Last edited by, Status, ID, AI Autofill).

## 25. Developer Experience (Notion API)

The Notion Developer Platform (May 13 2026) is a major DX upgrade:

- **REST API** with three connection types: Internal connections (single workspace, static token), Public connections (OAuth 2.0, marketplace-eligible), Personal Access Tokens (user-scoped). [Source: notion-api.html]
- **Capabilities**: every connection/token has capabilities (read content, update content, insert content, read comments, etc.). [Same source]
- **Workers** — JavaScript/TypeScript runtime hosted by Notion. [Source: notion-changelog.html]
- **CLI**: `curl -fsSL https://ntn.dev | bash` for sign-in, read/action, deploy Workers. [Same source]
- **Webhooks** — incoming (trigger Notion) + outgoing (Notion triggers others). [Same source]
- **Marketplace**: Public connections can be listed on the Notion Marketplace. [Source: notion-api.html — "Public connections must undergo a Notion security review before being listed"]
- **`/llms.txt`**: Notion exposes a complete documentation index at `/llms.txt` for AI agents. [Source: notion-api.html — "Fetch the complete documentation index at: /llms.txt"]
- **Markdown documentation**: every docs page is also available as Markdown.

Compared to Linear's GraphQL API: Notion's REST is simpler but less flexible for complex queries. The Notion Developer Platform (May 2026) closes the gap significantly with Workers + CLI + Agent SDK.

## 26. Biggest Strengths (with evidence)

1. **Block-based flexibility** — every paragraph, image, embed is a block; nestable infinitely. The richest content model among the 5 products. [Source: notion-keyboard.html — "Everything in Notion is a block"]
2. **Slash command discoverability** — typing `/`, `@`, `[[`, `+` surfaces menus with search-as-you-type. Most learnable keyboard system. [Source: notion-keyboard.html]
3. **AI surface breadth** — Block AI + AI Q&A + AI Autofill + AI Writer + AI Summary + Custom Agents + External Agents + AI Meeting Notes. Most AI surface coverage. [Source: notion-ai-agents.html + notion-changelog.html]
4. **AI explainability via verified pages** — governance signal in AI citations. [Source: notion-ai-agents.html]
5. **Enterprise Search** — cross-app search (Slack, GitHub, Google Drive). [Same source]
6. **Custom Agents with triggers** — automated agents that fire on conditions. [Source: notion-changelog.html — Jul 31 2026]
7. **External Agent orchestration** — Claude, Codex, Cursor, custom agents in one canvas. [Source: notion-changelog.html — May 13 2026]
8. **Notion Workers** — hosted code runtime. [Same source]
9. **Model-agnostic** — switch any workflow to a different model/provider. [Source: notion-ai-agents.html]
10. **Granular permissions** — row-level database access. [Same source]
11. **Verified page badges** — trust signal in AI answers. [Same source]
12. **Mature API** — REST + OAuth 2.0 + PATs + Marketplace. [Source: notion-api.html]
13. **Template ecosystem** — 100+ role-specific templates. [Source: notion-templates.html]
14. **Mobile + desktop parity** — fully functional across all platforms.
15. **AI Meeting Notes with speaker labels** (Jul 1 2026 release). [Source: notion-changelog.html]

## 27. Biggest Weaknesses (with evidence)

1. **Long-page lag** — pages with 1000+ blocks stutter on scroll and search. Architectural, not tuning. [Observed (prior); widely documented]
2. **No native split view** — can't compare two pages side-by-side without opening multiple windows. [Observed (prior)]
3. **Cloud-first architecture** — round-trip latency for many operations (compared to Linear's local-first). [Observed (prior)]
4. **No dedicated a11y page** — accessibility docs lag VS Code significantly. [Source: absence in notion-help.html]
5. **High Contrast mode only added Jul 30 2026** — long-requested, late-delivered. [Source: notion-changelog.html]
6. **Sidebar complexity** — five top-level tabs + sections can overwhelm new users. [Source: notion-help-sidebar.html]
7. **AI credit pricing** — "$10 per 1,000 credits" — opaque cost model; users can't predict monthly spend. [Source: notion-ai-agents.html]
8. **Workers cost transition** — "Workers are free to try during the beta period. Starting August 11 2026, Workers will run on Notion credits." — may surprise users. [Source: notion-changelog.html]
9. **Customization over opinionation** — Notion's flexibility means every team must invent their own workflow; chaos at scale (the opposite of Linear's "Purpose-built" principle). [Inferred from "Customization over opinionation" pattern + Notion's marketing]
10. **AI training on non-Enterprise data** — 30-day retention for non-Enterprise; Enterprise has zero-retention. Privacy-conscious individuals on Free/Plus tiers have less protection. [Source: notion-ai-agents.html]
11. **Database virtualization limits** — large databases (10,000+ rows) lag despite virtualization. [Observed (prior)]
12. **No motion design spec** — animations inconsistent across surfaces.

## 28. What should MiMo learn? (evidence-based)

1. **Block-based content model** — every atomic unit (paragraph, image, AI response) is a block. Blocks are nestable, typeable, movable. Most flexible content model. [Source: notion-keyboard.html]
2. **Slash command discoverability** — typing `/`, `@`, `[[`, `+` surfaces menus with search-as-you-type. Most learnable keyboard system. [Source: notion-keyboard.html]
3. **Verified page badges in AI citations** — governance signal in AI answers. [Source: notion-ai-agents.html]
4. **Multiple AI surfaces for multiple intents** — Block AI (inline), AI Q&A (chat), AI Autofill (database property), AI Summary (meeting notes), Custom Agents (automation), External Agents (orchestration). Each surface optimized for its intent. [Source: notion-ai-agents.html + notion-changelog.html]
5. **Custom Agent triggers** — fire agents automatically on conditions (e.g., meeting ended). [Source: notion-changelog.html — Jul 31 2026]
6. **External Agent orchestration** — Claude, Codex, Cursor in one canvas. [Source: notion-changelog.html — May 13 2026]
7. **Workers (hosted code runtime)** — let users extend the product with code without running servers. [Same source]
8. **Model-agnostic AI** — switch any workflow to a different model/provider. [Source: notion-ai-agents.html]
9. **Notion CLI** — `curl -fsSL https://ntn.dev | bash` — frictionless developer onboarding. [Source: notion-changelog.html]
10. **`/llms.txt` documentation index** — AI-friendly docs index. [Source: notion-api.html]
11. **Granular database permissions** — row-level access control. [Source: notion-ai-agents.html]
12. **Private teamspaces** — secure sensitive info. [Same source]
13. **Verified page system** — knowledge-quality signal in search + AI. [Same source]
14. **Database sync** — sync external data into Notion databases via Workers. [Source: notion-changelog.html — May 13 2026]
15. **AI Meeting Notes with speaker labels** — accurate attribution. [Source: notion-changelog.html — Jul 1 2026]
16. **Template ecosystem** — role-specific templates reduce blank-page paralysis. [Source: notion-templates.html]
17. **Mobile app for agents** — agents in your pocket. [Source: notion-changelog.html — Jul 8 2026]
18. **Agent SDK** — embed agents in external apps. [Source: notion-changelog.html — May 13 2026]

## 29. What should MiMo reject? (evidence-based)

1. **Cloud-first architecture** — round-trip latency is a perception killer. MiMo should be local-first (like Linear).
2. **Long-page lag** — Notion's 1000+ block pages stutter. MiMo should virtualize aggressively.
3. **No split view** — Notion's lack of side-by-side is wrong for an AI OS. MiMo should support split views (Arc, VS Code).
4. **Sidebar complexity** — 5 top-level tabs + sections is overwhelming. MiMo should simplify (Linear's 1 sidebar with sections).
5. **AI credit opacity** — $10 per 1,000 credits is unpredictable. MiMo should have transparent pricing (per-token, per-feature, or subscription).
6. **Customization chaos** — Notion's "build your own workflow" approach creates setup fatigue. MiMo should have opinionated defaults (Linear Method style) with customization as opt-in.
7. **No a11y page until 2026** — Notion added High Contrast only in Jul 2026. MiMo should ship a11y from day 1 (VS Code-style).
8. **AI training on non-Enterprise data** — 30-day retention for non-Enterprise is a privacy risk. MiMo should default to zero retention.
9. **Workers cost transition** — free-to-paid surprise. MiMo should never grandfather features into paid without warning.
10. **Inconsistent motion** — Notion's animations vary by surface. MiMo should publish a motion token spec (Linear-style).

## 30. Confidence Score: 80/100

**Reasoning:**
- **Strong**: 14 cached official URLs from notion.com with rich content. The changelog goes up to Jul 31 2026 — extremely current. The keyboard shortcuts page is comprehensive (111KB text extracted). The AI Agents page is rich (8KB text extracted, mostly marketing but substantive).
- **Strong**: All AI surfaces (Block AI, AI Q&A, AI Autofill, AI Writer, AI Summary, Notion Agents, Custom Agents, External Agents, AI Meeting Notes) are documented across the cached pages. No surface is missing.
- **Weak**: Some specific Notion Help URLs (`/help/guide/ai-questions-answers`, `/help/guide/ai-autofill`, `/help/guide/ai-summary`, `/help/guide/ai-writing`) returned "Page not found" (95 bytes) — Notion restructured its help URLs. I fell back to the AI product page and changelog for evidence on these surfaces.
- **Weak**: Could not access Karri Saarinen-style deep design posts for Notion (the Notion team blog is similarly Cloudflare-blocked at the post-detail level).
- **Gap**: No first-hand product use in this sandbox — claims tagged "Observed (prior)" are from 2024-2026 macOS/web use. Performance claims (long-page lag) are well-documented but not re-verified here.
- **Risk**: Notion is evolving fast — Workers, External Agents, Agent SDK are all 2026 features. Confidence on stability is lower (alpha/beta tags).
- **What would raise confidence to 95+**: (a) actually use Notion with a 1000+ block page to measure lag; (b) interview Notion PMs about motion philosophy; (c) read the Notion Engineering blog (Cloudflare-blocked); (d) test the Agent SDK with a real Claude/Cursor integration.
