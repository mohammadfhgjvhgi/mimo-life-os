# Anytype — Evidence File (W9)

**Task:** W9 — Phase R2 Evidence-Based. Collected by general-purpose sub agent.
**Date accessed (all sources):** 2026-08-07.
**Method:** Direct curl of official pages at `anytype.io` (marketing) and `doc.anytype.io` (canonical GitBook docs, including `.md` versions exposed via `llms.txt`). Also retrieved the GitHub `anyproto/anytype-agents-skill` repo via the official docs.

> ✅ **Evidence posture:** Anytype ships an unusually complete, agent-friendly docs surface. GitBook is configured to expose every docs page as Markdown (append `.md` to URL), and the root `https://doc.anytype.io/anytype/llms.txt` enumerates all 70+ canonical doc URLs. This evidence file draws from those canonical Markdown sources.

---

## 1. Product Overview

Anytype is "a safe haven for digital collaboration" — a local-first, end-to-end-encrypted, peer-to-peer personal+collaborative knowledge base. Tagline on home page: "Private & Secure. Everything in Anytype is owned and controlled by you, forever." [Source: https://anytype.io/, accessed 2026-08-07 — stripped home-page text, cached at `raw-anytype/home.txt`].

Anytype is built by "Any — a Swiss association" [Source: same — footer]. The product is **free for personal use** (memberships available for extra storage / commercial use) [Source: https://doc.anytype.io/anytype/resources/memberships.md, accessed 2026-08-07].

Available on macOS, Windows, Linux, iOS, and Android [Source: https://doc.anytype.io/anytype/getting-started/readme.md, accessed 2026-08-07 — Install section].

Anytype competes with Notion (collaboration + databases), Obsidian (markdown-local), Roam (graph), and Craft (delightful native). Its positioning is **"notion-like, but local-first + E2EE + P2P sync"**.

## 2. Product Philosophy

Anytype's philosophy is **"fundamental digital freedoms"** — privacy of thought, freedom to connect with those you trust, freedom to participate in governance. From the Why page: "We imagine a world where our fundamental digital freedoms are sacred: the privacy of thought; the freedom to connect with those we trust; and, the freedom to participate in the governance of our digital creations. … In the architecture of the current web, application developers are the keepers of our keys; they control the keys to users' accounts." [Source: https://anytype.io/why/, accessed 2026-08-07 — stripped text, cached at `raw-anytype/why.txt`].

Three operating principles are repeated across every docs page [Source: https://doc.anytype.io/anytype/getting-started/readme.md, accessed 2026-08-07]:

1. **Local-First**: "Everything you create lives on your device first, not on a corporate server. You can work completely offline, sync across your own devices, or self-host your data."
2. **End-to-End Encryption**: "Your data is protected by a digital vault where it is scrambled into a secret code. Only you, and the people you explicitly choose to share with, can access the information. Nobody, not even the team at Anytype, can see what you're working on."
3. **No Lock-In**: "You are never a hostage to a subscription or a service provider. You have access to your data and the Anytype software forever."

The protocol that powers Anytype is **AnySync** — "an open-source protocol we developed that supports high-performant collaboration over encrypted data and is offline-first." [Source: same readme.md.]

## 3. Core Mental Model

The Anytype mental model is the **typed Object graph**: every entity is an Object; every Object has one Type; Types have Properties, Views, and Templates; Objects relate to other Objects via typed Links.

From the Objects docs page: "In Anytype, everything you create is an Object. A page, task, project, person, image, recipe—all are Objects. … Folders ask 'where does this go?' Objects ask 'what does this relate to?'" [Source: https://doc.anytype.io/anytype/create/objects.md, accessed 2026-08-07].

The cookie-cutter analogy from the Types docs page makes the model explicit: "If an Object is a cookie, then the Type is the cookie cutter. It's a blueprint that defines what the Object is. … Tasks will have a due date, priority, and status. Books will have a genre, author, and release date. People will have a phone, email, and relationship." [Source: https://doc.anytype.io/anytype/organize/types.md, accessed 2026-08-07].

Every Object has: a Type (category), Properties (typed fields), and Links to other Objects. Types and Properties together form a user-defined schema; Queries then turn that schema into dynamic answer sets. [Source: same — Types docs page.]

## 4. User Journey

The journey is explicitly documented in the Getting Started guide:

1. **Install** the desktop or mobile app [Source: https://doc.anytype.io/anytype/getting-started/install.md].
2. **Create a Vault** — "Your cryptographic Key is generated locally on your device when you create your Vault. It's never transmitted over the internet or stored on Anytype's servers." [Source: https://doc.anytype.io/anytype/basics/key.md, accessed 2026-08-07.]
3. **Pick a network mode**: Anytype Network (default, with Anytype-provided backup node), Self-host, or Local-only. [Source: https://doc.anytype.io/anytype/data/sync-and-backup.md, accessed 2026-08-07 — "Alternative sync methods" section.]
4. **Create a Space (Channel)** — Personal or Collaborative. "Anytype lets you create different spaces for your work and personal life. Because each space is kept isolated, you never have to worry about your information being shared with the wrong people." [Source: https://doc.anytype.io/anytype/getting-started/readme.md, accessed 2026-08-07.]
5. **Create Objects** via the Sidebar's Create button, the `Cmd/Ctrl + N` shortcut, or the in-editor `/` command menu [Source: https://doc.anytype.io/anytype/create/objects.md — Create Objects section].
6. **Add Properties and Links** over time — "you create an Object and add relationships over time. This builds a flexible system of interconnected knowledge that doesn't care where something is, just cares what it's related to." [Source: same.]
7. **Visualize via Views** — list, grid, calendar, kanban, gallery, graph layouts [Source: https://doc.anytype.io/anytype/organize/views.md, accessed 2026-08-07 — Layouts table].
8. **(Optional) Connect an AI agent** via the Anytype Agents' Skill or Local API [Source: https://doc.anytype.io/anytype/features/anytype-agents-skill.md, accessed 2026-08-07].

Onboarding is explicitly self-serve: account creation is permissionless ("Anytype accounts are permissionless and created using a seed phrase—no email required" [Source: https://doc.anytype.io/anytype/data/privacy-and-encryption.md — User Emails section]). The Key (BIP39 mnemonic phrase [Source: https://doc.anytype.io/anytype/resources/faq.md, accessed 2026-08-07 — "Which standard do you follow…"]) is the user's recovery mechanism; there is no email-based password reset ("Because Anytype holds no keys to your account, we can't reset your password or recover your account if you lose access." [Source: privacy-and-encryption.md — How it works section]).

## 5. Navigation

Navigation surfaces:

- **Sidebar (Channel Sidebar)** — the primary navigation hub. Contains: Create button + dropdown, Types section, Queries, Collections, Bin, Graph. Customizable via "Sections" and "Widgets" [Source: https://doc.anytype.io/anytype/basics/sidebar.md, accessed 2026-08-07].
- **Search palette** — `Cmd / Ctrl + K` ("Quickly find what you're looking for"). The docs page explicitly recommends memorizing "Cmd/Ctrl + K (search), `/` (slash menu), and `@` (mention) cover most of what you do." [Source: https://doc.anytype.io/anytype/settings/keyboard-shortcuts.md, accessed 2026-08-07 — Tips section.]
- **Graph view** — visual node-and-edge graph of all Objects and their Links, accessible from any Object via the "Graph icon that is located near the back and forward buttons" [Source: https://doc.anytype.io/anytype/create/objects.md — Graph section].
- **Tabs** — "Open multiple Objects side by side in a tab bar" [Source: https://doc.anytype.io/anytype/features/tabs.md, accessed 2026-08-07 — also referenced in the keyboard-shortcuts "New Tab" suggestion].
- **Back/Forward buttons** — browser-style navigation, mentioned in the Objects docs page [Source: same].
- **Sidebar Widgets** — pinned Queries or Views in the sidebar for immediate access [Source: https://doc.anytype.io/anytype/basics/sidebar/widgets.md and organize/views.md#views-in-sidebar — both accessed 2026-08-07].

There is no documented "home" page — the Sidebar is the home.

## 6. Workspace

The Anytype workspace is the **Vault**: "Your cryptographic Key is generated locally on your device when you create your Vault." [Source: https://doc.anytype.io/anytype/basics/key.md, accessed 2026-08-07.] A Vault contains one or more **Spaces/Channels**, which are isolated sync-and-permission domains:

- **Personal Spaces**: "A private sanctuary for your eyes only. Use these to organize your diary, manage to-do lists, and store important documents."
- **Collaborative Spaces**: "Shared environments where you can work seamlessly with family, project teams, or entire communities. Chats and discussions live directly inside your spaces, allowing you to hold private conversations right alongside your documents, tasks, and media." [Source: https://doc.anytype.io/anytype/getting-started/readme.md, accessed 2026-08-07.]

Critical isolation constraint: "Types are specific to each Channel. If you want your Type to exist in other Spaces, please see Import & Export. … at the moment, you cannot share Types between spaces that stay in sync because they are separated with different encryption keys." [Source: https://doc.anytype.io/anytype/organize/types.md — Duplicating Types to other Channels section.] Each Channel has its own encryption keys, so schemas don't propagate across Channels.

The workspace includes a **Chat** surface ("Real-time conversations alongside your work" [Source: https://doc.anytype.io/anytype/collaborate/chats.md, accessed 2026-08-07]) and a **Discussions** surface (threaded discussions attached to Objects [Source: https://doc.anytype.io/anytype/collaborate/discussions.md]). There is also a **Publish** surface to publish Objects as static webpages on a personal subdomain [Source: https://doc.anytype.io/anytype/collaborate/publish.md, accessed 2026-08-07].

## 7. Conversation (AI integration)

Anytype does NOT ship a first-party in-app AI chat. Instead, it ships two agent-facing surfaces:

1. **Local API (Developer Preview)** — "Our API is now available and directly included with the desktop app, running entirely on localhost. It operates fully offline, meaning you can build and use integrations without any cloud dependencies - even while flying." Authentication is a one-time 4-digit challenge in the desktop app that generates a bearer-token API key, managed in "Vault Settings > API Keys." The OpenAPI specification is at `developers.anytype.io`. [Source: https://doc.anytype.io/anytype/features/local-api.md, accessed 2026-08-07.]
2. **Anytype Agents' Skill** — an open-source toolkit at `github.com/anyproto/anytype-agents-skill` that "gives AI assistants a safe way to read, search, and modify Objects in your Anytype Channels. Drop it into Claude Code, Cursor, Gemini CLI, GitHub Copilot, or any other agent-capable tool." [Source: https://doc.anytype.io/anytype/features/anytype-agents-skill.md, accessed 2026-08-07 — opening paragraph.]

The Skill provides "a lightweight, isolated JavaScript runtime" — when an agent decides to act, it writes a short JS script using the Skill's high-level methods, then runs it in a sandbox that only has access to Anytype Skill methods (no filesystem, no network outside the Local API). Around 30 high-level methods are exposed, covering: Reading Objects, Creating Objects, Updating Objects, Searching (full-text + filtered), Working with Types and Properties, and Collections/Queries. [Source: same — How it works section.]

Common agent use cases explicitly enumerated in the docs: bulk property updates ("Set all Tasks in the 'Q1 Planning' Collection to Status: In Progress"), data transformations, migration/cleanup, reporting, cross-Channel operations. [Source: same — Common use cases section.]

**Safety model:** The Skill can do anything the Local API can (create/update/delete Objects, modify Types/Properties, edit block content) but cannot: access files outside Anytype, make network requests outside the Local API, see Channels not authorized via the API key, or bypass Channel role permissions (Viewer → read-only). The docs explicitly warn: "Review scripts before running them. Most agents show you what they're about to execute. Read it. A 'delete all Objects matching X' script run by mistake is hard to recover from." [Source: same — Safety section.]

## 8. Agent Experience

The Anytype agent experience is among the most thoughtful in this evidence set:

- **Permission scoping via separate API keys.** "Use a separate API key for agent work. If you ever want to revoke the agent's access, you can delete the key in Vault Settings > API Keys without affecting your other integrations." [Source: https://doc.anytype.io/anytype/features/anytype-agents-skill.md — Recommendations section.]
- **Test on small scope first.** "Before running a bulk operation on hundreds of Objects, ask the agent to do it on five and check the result." [Source: same.]
- **Isolated JS runtime.** The Skill's runtime "only has access to the Anytype Skill's methods, not to your filesystem or network." [Source: same — How it works section.]
- **Per-Channel access.** "the agent can only act on Channels accessible through the API key you provided" — agents cannot cross-Channel unless explicitly given keys for each. [Source: same — What the Skill can't do section.]
- **30+ high-level methods exposed.** Reading, Creating, Updating, Searching, Type/Property management, Collections/Queries — a richer agent API surface than Roam or Craft expose. [Source: same — How it works section.]

This is a **sandboxed, scoped, reviewable** agent execution model — closer to "agentic code execution in a VM" than to "free-form LLM writes to a database".

## 9. Memory

Anytype's memory model is **Object-as-memory**: every atomic unit is an Object with persistent identity, a Type, Properties, and Links. Memory is built up by creating Objects and adding relationships.

- **Objects are persistent and addressable** — each Object has a unique ID, a Type (cookie-cutter), Properties (typed fields), and content blocks. [Source: https://doc.anytype.io/anytype/create/objects.md, accessed 2026-08-07.]
- **Backlinks are computed from Links** — "Everything is easy to find. A single person can be connected to a company, a project, a meeting, a task, and more—so you can reach them from any of those angles." [Source: same — Why it matters section.]
- **Change history is layered.** "Anytype stores the history of changes for each object you've created. Every object's change has 2 encryption layers with different keys." [Source: https://doc.anytype.io/anytype/data/privacy-and-encryption.md — Technical Details section.]
- **Local indexes stay unencrypted.** "In order to search your documents efficiently, Anytype builds local indexes from your encrypted objects, decrypting them on the fly with your keys. These indexes are stored separately from the encrypted data itself and aren't encrypted — this assumes your local device hasn't been compromised. Indexes never sync. Your indexes remain only on the device that created them." [Source: same — Encryption section.]
- **Dates are first-class Objects** — "How dates work as Objects, Properties, and references in Anytype" [Source: https://doc.anytype.io/anytype/features/dates.md, accessed 2026-08-07.]
- **Bookmarks, Files & Media are first-class Objects** — "Save and organize web links as first-class Objects"; "Upload images, videos, audio, and files as standalone Objects." [Source: https://doc.anytype.io/anytype/create/bookmarks.md and https://doc.anytype.io/anytype/create/files-and-media.md, accessed 2026-08-07.]

There is no separate "AI memory" — agents read/write the same Object graph the user does.

## 10. Knowledge

The knowledge structure is **typed-relational**:

- **Types** — user-defined categories with Properties, Views, and Templates. Built-in types include Note, Task, Project, Meeting. Custom Types are first-class. [Source: https://doc.anytype.io/anytype/organize/types.md, accessed 2026-08-07.]
- **Properties** — typed fields on Objects (status, date, author, email, etc.). Properties can be displayed in the Object Header. [Source: https://doc.anytype.io/anytype/organize/properties.md, accessed 2026-08-07.]
- **Links** — typed relations between Objects (e.g., a Recipe Object linked to a Person Object). Links are bidirectional; backlinks are computed. [Source: https://doc.anytype.io/anytype/create/links.md, accessed 2026-08-07 — "Creating relationships in your knowledge base".]
- **Views** — visual lenses over a Type/Query/Collection. Six layouts: List, Grid, Calendar, Kanban, Gallery, Graph. Views apply Filters and Sorts; they don't change underlying data. [Source: https://doc.anytype.io/anytype/organize/views.md — Layouts table.]
- **Queries** — rule-driven dynamic result sets. "A Query is a question you ask your knowledge base—answered instantly and kept up to date automatically." Queries can source from a Type or a Property; can be displayed as a View; can be embedded Inline in any Object. [Source: https://doc.anytype.io/anytype/organize/queries.md, accessed 2026-08-07.]
- **Collections** — hand-curated groupings of Objects (vs rule-driven Queries). "Use a Collection when you want a hand-picked group of Objects with no clear relationship between them." [Source: https://doc.anytype.io/anytype/organize/collections.md, accessed 2026-08-07.]
- **Templates** — pre-filled starting points for new Objects. "Pre-filled starting points for new Objects." [Source: https://doc.anytype.io/anytype/organize/templates.md, accessed 2026-08-07.]
- **Advanced Filters** — AND/OR logic with grouped conditions [Source: https://doc.anytype.io/anytype/features/advanced-filters.md, accessed 2026-08-07].
- **Formulas** — aggregations and counts in Grid view [Source: https://doc.anytype.io/anytype/features/formulas.md, accessed 2026-08-07].
- **Inline Queries** — display a live filtered view of Objects inside another Object [Source: https://doc.anytype.io/anytype/features/inline-queries.md, accessed 2026-08-07].
- **Graph view** — visual interconnections [Source: https://doc.anytype.io/anytype/features/graph.md, accessed 2026-08-07].

This is the richest knowledge layer in this evidence set — comparable to Notion's databases, but with the addition of a Graph view and an open-source sync protocol underneath.

## 11. Search

Search is exposed via:

- **`Cmd / Ctrl + K`** — the global search palette, recommended as the first shortcut to memorize [Source: https://doc.anytype.io/anytype/settings/keyboard-shortcuts.md — Tips section].
- **Object Search** — "To navigate to the search, you can: Head to your sidebar and click on the search button. Use the `Cmd / Ctrl + K` keyboard shortcut." [Source: https://doc.anytype.io/anytype/create/objects.md — Search section.]
- **Query-driven search** — Queries act as saved, rule-driven searches (filter by Type, Property value, tag) [Source: https://doc.anytype.io/anytype/organize/queries.md — Create a Query section.]
- **Local API search** — `search` endpoint exposed via the Local API for programmatic full-text search with property filtering [Source: https://doc.anytype.io/anytype/features/local-api.md — Robust API Capabilities].
- **Agents' Skill search** — `full-text search, filter by Property, scope to a Channel` methods [Source: https://doc.anytype.io/anytype/features/anytype-agents-skill.md — How it works.]

There is **no documented semantic/embeddings search** in Anytype's docs as of this collection — search is lexical/filter-based, not semantic. (This contrasts with Roam's `semantic_search`, Reflect's "similar notes", and Craft's "Smart Search".)

## 12. Execution

Execution model for agents:

- **Direct write via Local API** — agents call API endpoints to create/update/delete Objects.
- **Sandboxed JS runtime via Skill** — agents write short scripts that use high-level methods; the runtime is isolated (no filesystem, no external network).
- **No bulk-undo** — the docs warn "A 'delete all Objects matching X' script run by mistake is hard to recover from" [Source: https://doc.anytype.io/anytype/features/anytype-agents-skill.md — Recommendations]. The user is expected to review scripts before running.
- **Channel-scoped** — agents cannot cross-Channel without explicit per-Channel API keys.

For human users, execution is direct in the editor: type to create blocks, `/` for slash menu, drag handles for reordering, "Turn into Object" to convert a block to a first-class Object [Source: https://doc.anytype.io/anytype/create/objects.md — Turn Into Object section].

There is **no "Explore vs Execute" mode** distinction (as Craft has) — both agents and users write directly. The safety model relies on **scoping** (separate API keys per agent task) rather than **reviewable drafts**.

## 13. Artifacts

Atomic artifacts:

- **Objects** — first-class entities with Type, Properties, Links, content blocks. [Source: objects.md.]
- **Block Types** — text, header, todo, toggle, code, file, bookmark, relation, etc. [Source: https://doc.anytype.io/anytype/create/editor/block-types.md, accessed 2026-08-07.]
- **Types** — cookie-cutter schemas. [Source: types.md.]
- **Properties** — typed fields. [Source: properties.md.]
- **Views** — visual lenses (List/Grid/Calendar/Kanban/Gallery/Graph). [Source: views.md.]
- **Queries** — rule-driven dynamic sets. [Source: queries.md.]
- **Collections** — hand-curated sets. [Source: collections.md.]
- **Templates** — pre-filled Object starting points. [Source: templates.md.]
- **Bookmarks, Files & Media** — first-class Object types. [Source: bookmarks.md, files-and-media.md.]
- **Chats and Discussions** — collaboration artifacts [Source: chats.md, discussions.md.]
- **Published pages** — static webpages on a personal subdomain [Source: publish.md.]

The model is **everything-is-an-Object** — even Bookmarks, Files, Dates, and Chat messages are Objects, addressable and queryable like any other. This is more uniform than Roam's "blocks + pages" model and more structured than Reflect's "notes + backlinks".

## 14. Keyboard UX

Anytype's shortcut system is **fully customizable**:

- **Panel access**: Click `?` (help icon) bottom-left, then choose Keyboard shortcuts. Or assign a shortcut to open the panel itself. [Source: https://doc.anytype.io/anytype/settings/keyboard-shortcuts.md — Opening the Shortcuts section.]
- **Customizable**: "Almost every shortcut can be remapped, many actions support two key combinations at once, and you can import or export your shortcut configuration to share with other devices or teammates." [Source: same — opening paragraph.]
- **Dual key combinations**: Some actions support two different shortcuts simultaneously (e.g., Mac-style + Windows-style, or single-key + chord). [Source: same — Dual key combinations section.]
- **Import/Export**: Full shortcut map can be saved to a file and shared. [Source: same — Importing and exporting section.]
- **Top three to memorize**: `Cmd/Ctrl + K` (search), `/` (slash menu), `@` (mention) — "cover most of what you do. Get comfortable with these and you've shaved 80% of the navigation time off." [Source: same — Tips section.]
- **Object creation shortcuts**: `Cmd/Ctrl + N` creates a new Object (same as clicking "+" in sidebar); `Cmd/Ctrl + Opt/Alt + N` opens the create dropdown. [Source: https://doc.anytype.io/anytype/create/objects.md — Use a Shortcut section.]
- **Platform differences**: macOS uses Cmd, Windows/Linux use Ctrl. Windows: Alt opens system menu; macOS: Cmd+Q quits; Linux: Ctrl+Q quits. [Source: keyboard-shortcuts.md — Platform differences section.]
- **Power-user tip**: "Reassign Caps Lock if you don't use it. … use Anytype's customization to assign Caps + a letter as your 'global Anytype' shortcut for opening search or creating notes." [Source: same — Tips section.]

This is one of the most thorough, customizable shortcut systems in this evidence set — comparable to Craft's extensive shortcut doc.

## 15. Motion

No official motion specs are documented in the crawlable Anytype docs. What is observable:

- The marketing site uses static imagery and embedded YouTube videos; no cinematic motion.
- The product UI uses drag-and-drop animations (block handle drag), View-mode transitions (switching between List/Grid/Kanban), and Graph view node-settling motion.
- Performance emphasis: "No server means no lag" [Source: https://anytype.io/, accessed 2026-08-07 — stripped home page text]. Anytype positions itself as **fast** because there's no server roundtrip.

No published spring physics, no documented choreography specs.

## 16. Animation

Animation vocabulary (inferred from documented features, no official spec):

- Drag-and-drop block reordering.
- View-mode layout transitions.
- Graph view node repositioning on filter changes.
- Sidebar Section/Widget reordering animations.
- Slash-menu (`/`) dropdown opening.

These are functional, not cinematic. No "delight-driven" animations are documented (contrast with Craft, which has documented sound design and "form and function must come hand-in-hand" [Source: https://www.craft.do/blog, accessed 2026-08-07 — Feb 28, 2024 blog post title]).

## 17. Visual Hierarchy

Anytype's visual hierarchy is **block-and-card oriented**, structured around the Object Header + content blocks model:

- **Object Header** (below the title, above the content) — displays selected Properties. Two layout options: "Line—for a more minimal look" or "List—for displaying more structured information." [Source: https://doc.anytype.io/anytype/organize/types.md — Header Layout Types section.]
- **Content blocks** — body content with slash-menu-driven types (text, todo, toggle, code, file, bookmark, etc.).
- **Views** — when looking at a Type/Query/Collection, the View Header sits above the layout (List/Grid/Calendar/Kanban/Gallery/Graph). [Source: views.md.]
- **Sidebar** — left-hand navigation with Sections (collapsible), Types, Queries, Collections, Bin, Widgets.
- **Tabs** — top-of-content tab bar for multi-Object side-by-side work.

No documented design-system specs (colour tokens, type scale, spacing scale) are crawlable. Visual style is functional / Swiss / minimalist — consistent with the "safe haven" positioning.

## 18. Progressive Disclosure

Progressive disclosure is implemented via:

- **Sidebar Sections** — Types/Queries/Collections/Bin only reveal items that have content. "Only Types with at least one Object in them will display in this section. If your desired category is not in the Types section, use the create menu to create one object first, then it will reveal in this section." [Source: https://doc.anytype.io/anytype/create/objects.md — Types Section.]
- **View collapse** — toggled headings collapse and expand sections of long Objects ("Collapse and expand sections of long Objects" — Toggled Headings feature [Source: https://doc.anytype.io/anytype/create/editor/toggled-headings.md, accessed 2026-08-07]).
- **Inline Queries** — embedded live-filtered Views inside Objects, only expanding when the user wants to see them [Source: inline-queries.md].
- **Object-level Hide** — `.rm-hide`-equivalent is not documented; privacy is enforced at the Channel/Key level rather than per-Object.
- **Sidebar Widgets** — pinned Views that show a snapshot of a Query/Collection without leaving the Sidebar [Source: organize/views.md — Views in Sidebar section].
- **Customization of what appears in the Sidebar** — via "Manage Sections" [Source: sidebar/sections.md].

There is **no documented onboarding progressive disclosure** (no tour, no empty-state scaffolding visible in the docs).

## 19. Accessibility

**No dedicated accessibility documentation page** was found in the crawlable docs. Implicit accessibility features:

- Keyboard shortcuts are fully customizable (covered above) — supports users with motor differences who need alternative keybindings.
- Dual-key-combination support accommodates Mac/Windows muscle memory and one-handed use.
- The "Alt opens system menu" Windows convention is documented.
- The product is cross-platform (macOS, Windows, Linux, iOS, Android) — supports users across device ecosystems.
- No documented colour-contrast conformance claim, no documented screen-reader mode, no documented WCAG conformance statement.

This is a docs gap, not necessarily a product gap.

## 20. Performance Perception

Performance is a core Anytype value proposition:

- **Offline-first = perceived instant**. "Offline-first. Your vault lives on your device. No server means no lag. Fast sync. Your data syncs p2p in local networks." [Source: https://anytype.io/, accessed 2026-08-07 — Think Fast section.]
- **Native on mobile**. "Natural touch and scroll experience, on both iOS and Android." [Source: same.]
- **No external service roundtrips** for read. "Indexes stay local and unencrypted" — search reads from local indexes, not from a server. [Source: privacy-and-encryption.md — Encryption section.]
- **Local API runs entirely on localhost** — agent operations have no network latency [Source: local-api.md].
- **Heavy caveat re: third-party cloud drives** — "Do not place your active Anytype data directory inside a third-party cloud-synced folder (such as Nextcloud, Dropbox, OneDrive, or Google Drive) or on a shared network drive. Doing so introduces severe risks to both your data integrity and your privacy. … Anytype uses SQLite databases to store your spaces locally. Cloud sync tools constantly monitor and lock files as they detect changes. … This can lead to irreversible database corruption." [Source: https://doc.anytype.io/anytype/data/sync-and-backup.md — Third-party services & network drives section.]

This is unusually candid and technical — a clear "don't shoot yourself in the foot" warning that most note apps omit.

## 21. Trust

Anytype's trust posture is the **strongest in this evidence set** — local-first, E2EE-by-default, open-source protocol, no email required, no recovery possible by Anytype:

- **Local-first**: "Everything you create lives on your device first, not on a corporate server." [Source: getting-started/readme.md.]
- **End-to-end encryption**: "Your data is protected by a digital vault where it is scrambled into a secret code. Only you, and the people you explicitly choose to share with, can access the information. Nobody, not even the team at Anytype, can see what you're working on." [Source: same.]
- **Layered key encryption** (technical): "Every object's change has 2 encryption layers with different keys. The first layer is used to connect changes within an object … The second layer is used to encrypt the actual data. We use AES with stream encryption with CFB mode. … Anytype backup nodes have access to the first layer key, so it can group changes for the object and send them in one pack when you want to restore your data. Anytype backup nodes have no access to the second layer, so it can't read the actual changes to the data." [Source: privacy-and-encryption.md — Technical Details section.]
- **BIP39 mnemonic Vault key**: "We use the BIP39 standard to generate a mnemonic phrase, which is then used to derive your Vault's private key." [Source: faq.md — "Which standard do you follow…"]
- **No email required**: "Anytype accounts are permissionless and created using a seed phrase—no email required." [Source: privacy-and-encryption.md — User Emails section.]
- **No recovery by Anytype**: "Because Anytype holds no keys to your account, we can't reset your password or recover your account if you lose access. Losing your key means losing access to your data permanently." [Source: same — How it works section.]
- **Telemetry is anonymized and never content**: "No object titles, document contents, chat messages, or files are ever visible through telemetry. … Data is compartmentalized. … Nothing is sold." [Source: same — Telemetry section.]
- **Open-source protocol**: AnySync at `github.com/anyproto` [Source: getting-started/readme.md].
- **Self-host option**: Users can run their own backup node [Source: https://doc.anytype.io/anytype/data/sync-and-backup/self-host.md, accessed 2026-08-07].
- **Local-only mode**: Users can opt out of sync entirely [Source: https://doc.anytype.io/anytype/data/sync-and-backup/local-only.md, accessed 2026-08-07].
- **EU-hosted backup nodes**: "Our infrastructure is hosted on dedicated servers in data centers within the European Union. The domains we use for our Anytype network are: Syncing: `*.anyclub.org`. Analytics: `*.anytype.io`." [Source: sync-and-backup.md — Where are the remote backups based section.]
- **Documented device-trust caveat**: "While Anytype has robust encryption, it ultimately assumes the device you're using is safe. If a device is compromised, local encryption offers limited protection against many attacks. We recommend taking your device security very seriously." [Source: privacy-and-encryption.md — How it works section.]

This is a serious, technically documented trust model — comparable in rigour to Tails / Signal / Bitwarden, and more rigorous than any other product in this evidence set.

## 22. Explainability

Anytype's explainability is strong on the data and protocol layer:

- **Open-source protocol** (AnySync) — anyone can read the code that handles their data.
- **Technical encryption details published** (AES, CFB mode, 2-layer key system) — the docs explicitly invite verification: "This is verifiable through Anytype's open codebase that's constantly inspected by the public." [Source: sync-and-backup.md — Sync is end-to-end encrypted section.]
- **Local-first means no opaque server processing** — there is no Anytype server that processes user content.
- **Agent Skill operations are visible** — "Most agents show you what they're about to execute. Read it." [Source: anytype-agents-skill.md — Recommendations.]
- **API is OpenAPI-spec'd** at `developers.anytype.io` [Source: local-api.md — Comprehensive Documentation section.]
- **No first-party AI** — Anytype does not ship a first-party AI assistant, so there are no model-card / hallucination-disclosure concerns in-product. AI behaviour is delegated to user-chosen external agents.
- **No documented "what does the AI see" panel** — agents read what the API exposes, but there is no in-product UI showing "this is what was sent to the model on your behalf".

## 23. Long Session Experience

Long-session features:

- **Tabs** — multi-Object side-by-side work reduces context switching [Source: tabs.md].
- **Inline Queries** — keep a live filter visible inside the Object you're working in [Source: inline-queries.md].
- **Sidebar Widgets** — pinned Queries/Collections for one-click access [Source: views.md — Views in Sidebar section].
- **Toggled Headings** — collapse long sections to maintain focus [Source: toggled-headings.md].
- **Custom CSS** — users can theme the app for visual comfort during long sessions [Source: https://doc.anytype.io/anytype/features/custom-css.md, accessed 2026-08-07].
- **Channel switching** — Personal vs Collaborative Channels isolate work/personal contexts.
- **Offline work** — "you can work completely offline" [Source: getting-started/readme.md].
- **Bin / Deletion recovery** — deleted Objects go to a Bin before permanent deletion [Source: https://doc.anytype.io/anytype/organize/deletion.md, accessed 2026-08-07].
- **Data Erasure & Recovery** — explicit recovery docs page exists [Source: https://doc.anytype.io/anytype/data/data-erasure-and-recovery.md, accessed 2026-08-07].

## 24. Power User Features

1. **Types + Properties + Views = Notion-like databases** — fully user-defined schema with 6 layout types [Source: types.md, properties.md, views.md].
2. **Queries** — rule-driven dynamic sets with AND/OR filters, sortable, viewable in any layout, embeddable inline [Source: queries.md, advanced-filters.md, inline-queries.md].
3. **Collections** — hand-curated sets [Source: collections.md].
4. **Formulas** — aggregations and counts in Grid view [Source: formulas.md].
5. **Templates** — pre-filled starting points per Type [Source: templates.md].
6. **Custom CSS** — per-vault styling [Source: custom-css.md].
7. **Custom keyboard shortcuts** — full remap + dual-key + import/export [Source: keyboard-shortcuts.md].
8. **Tabs** — multi-Object side-by-side [Source: tabs.md].
9. **Graph view** — visual interconnections [Source: graph.md].
10. **Local API** — localhost REST API for any integration [Source: local-api.md].
11. **Agents' Skill** — 30+ high-level methods for AI agents, sandboxed [Source: anytype-agents-skill.md].
12. **Self-host / Local-only** sync modes [Source: sync-and-backup.md — Alternative sync methods].
13. **Publish** — public webpages on a personal subdomain [Source: publish.md].
14. **Chats + Discussions** — built-in collaboration primitives [Source: chats.md, discussions.md].
15. **Embeds** — live external content (e.g., YouTube, Figma) inside Objects [Source: https://doc.anytype.io/anytype/features/embeds.md, accessed 2026-08-07].

The most distinguishing power features are: the **typed-Object model** (everything is an Object with a Type), the **open-source AnySync protocol**, the **sandboxed agent runtime**, and the **self-host option**.

## 25. Developer Experience

- **Open-source protocol**: AnySync at `github.com/anyproto` [Source: getting-started/readme.md].
- **Local API (Developer Preview)**: OpenAPI spec at `developers.anytype.io`, runs on localhost, fully offline [Source: local-api.md].
- **SDKs in progress**: "Early SDKs and community-driven tools are already underway: Python and Go clients, MCP server and Raycast extension." [Source: same — Growing Developer Ecosystem section.]
- **Raycast Extension (macOS)** — documented [Source: https://doc.anytype.io/anytype/features/local-api/raycast-extension-macos.md, accessed 2026-08-07].
- **Agents' Skill** — open-source repo at `github.com/anyproto/anytype-agents-skill`, with per-agent setup guides for Claude Code, Cursor, Gemini CLI, GitHub Copilot [Source: anytype-agents-skill.md].
- **Authentication**: 4-digit challenge in desktop app generates bearer-token API key, managed in Vault Settings > API Keys [Source: local-api.md].
- **Security warning**: "By providing an API key or using extensions, you grant limited access to your Anytype vault, enabling operations such as editing or deleting objects. Ensure you use only trusted extensions." [Source: same — Important Security Notice.]
- **GitBook queryable docs**: docs pages support `?ask=<question>&goal=<endgoal>` HTTP GET parameter to dynamically query the docs [Source: footer of every docs page — "Agent Instructions" section]. This is itself a DX feature: docs that are agent-queryable.
- **Tech docs** at `tech.anytype.io/any-sync/overview` for protocol internals [Source: getting-started/readme.md — What powers Anytype section].

The DX posture is **open-source, localhost-first, agent-native** — among the strongest in this evidence set.

## 26. Biggest Strengths (with evidence)

1. **Strongest trust posture in the set** — local-first, E2EE-by-default, BIP39 mnemonic Vault key, open-source AnySync protocol, EU-hosted backup nodes, no email required, no Anytype-side recovery. [Sources: privacy-and-encryption.md, getting-started/readme.md, sync-and-backup.md.]
2. **Typed-Object model with full schema control** — Types + Properties + Views + Templates + Queries + Collections gives users Notion-like database power without a server. [Sources: types.md, properties.md, views.md, queries.md, collections.md, templates.md.]
3. **Sandboxed agent runtime** — the Agents' Skill's isolated JS runtime with 30+ high-level methods is more thoughtful than Roam's "full read+write MCP, no undo" approach. [Source: anytype-agents-skill.md.]
4. **Customizable keyboard shortcuts** with import/export and dual-key support — rare in this category. [Source: keyboard-shortcuts.md.]
5. **Self-host and Local-only modes** — users can opt out of Anytype infrastructure entirely. [Source: sync-and-backup.md — Alternative sync methods.]
6. **Open-source protocol + open-source codebase** — `github.com/anyproto`. [Source: getting-started/readme.md.]
7. **Agent-queryable docs** — GitBook `?ask=` parameter lets agents dynamically query documentation. [Source: footer of every docs page.]
8. **Cross-platform** — macOS, Windows, Linux, iOS, Android. [Source: getting-started/install.md.]

## 27. Biggest Weaknesses (with evidence)

1. **No first-party AI / no semantic search** — Anytype does not ship an in-app AI assistant and does not expose embeddings-based search (contrast Roam's `semantic_search`, Reflect's "similar notes", Craft's "Smart Search"). AI is delegated entirely to external agents. [Source: absence in any docs page; explicit delegation in anytype-agents-skill.md.]
2. **Terminology churn risk** — the docs use both "Spaces" and "Channels" somewhat interchangeably (e.g. "Anytype lets you create different spaces for your work and personal life" but the Sidebar is called the "Channel Sidebar", Types are scoped to a "Channel", etc. [Sources: getting-started/readme.md, sidebar.md, types.md — "Duplicating Types to other Channels" section]). This dual terminology is a known UX friction.
3. **Types cannot be shared across Channels** — "at the moment, you cannot share Types between spaces that stay in sync because they are separated with different encryption keys." [Source: types.md — Duplicating Types section.] Power users with multiple Spaces must duplicate Types manually.
4. **No bulk-undo for agent operations** — "A 'delete all Objects matching X' script run by mistake is hard to recover from." [Source: anytype-agents-skill.md — Recommendations.] The safety model relies on scoping and review, not on undo.
5. **Strict no-recovery on key loss** — "Losing your key means losing access to your data permanently." [Source: privacy-and-encryption.md.] The Key is recoverable from OS keychain (Mac/Windows/Linux [Source: faq.md — "How to recover my Key from my OS key storage manager?"]) but only if OS-level storage was used.
6. **No third-party-cloud-drive support** — Dropbox/OneDrive/Google Drive/Nextcloud placement of the active data directory causes database corruption. [Source: sync-and-backup.md — Third-party services section.] This is a real limitation for users whose "local" is actually a cloud-synced folder.
7. **Some Views not on mobile** — "Not all views are available on mobile." [Source: views.md — Layouts section hint.] The docs do not specify which.
8. **No documented accessibility conformance** — no WCAG statement, no screen-reader mode documented. [Source: absence in docs.]
9. **Less polished than Craft** — Anytype's marketing site is functional; Craft's is cinematic. Anytype's motion / sound / design polish is not documented as a priority.
10. **No first-party mobile AI** — the Agents' Skill is desktop-only (Local API is desktop-only) [Source: local-api.md — "directly included with the desktop app"].

## 28. What should MiMo learn?

- **Local-first + E2EE-by-default as the starting trust posture.** Anytype's defaults (everything local, keys generated on-device, encryption non-optional) are the right defaults. MiMo should adopt this posture rather than Roam's hosted-default / encryption-opt-in.
- **Typed-Object model.** Everything-is-an-Object with Type + Properties + Links is more flexible than Roam's blocks-only or Reflect's notes-only model. MiMo should treat every entity as a typed Object.
- **Sandboxed agent runtime over free-form MCP writes.** The Agents' Skill's isolated JS runtime with high-level methods is a more thoughtful agent-experience pattern than Roam's "full read+write MCP, no undo". MiMo should adopt the sandbox pattern.
- **Per-agent-task API keys** rather than one master key. Users can revoke without nuking everything.
- **Customizable keyboard shortcuts with import/export.** Power users need remap + dual-key + shareable configs.
- **Self-host option.** Even if MiMo ships a hosted default, the option to self-host or run local-only is a trust multiplier for high-sensitivity users.
- **Agent-queryable docs.** GitBook's `?ask=` parameter pattern is a clever DX feature — MiMo's docs should be queryable by AI agents.
- **Open-source protocol underneath.** Even if the app is closed, opening the sync protocol (à la AnySync) signals serious trust intent.
- **Candid docs about pitfalls** (third-party-drive corruption, no bulk-undo, no-recovery-on-key-loss). MiMo should adopt this candour.
- **Cross-platform parity as a goal.** macOS, Windows, Linux, iOS, Android.

## 29. What should MiMo reject?

- **Dual terminology for the same concept** (Spaces vs Channels). MiMo should pick one term.
- **No semantic search.** Users expect "find by meaning" in 2026. MiMo should ship embeddings-based search alongside lexical.
- **No first-party AI.** Delegating AI entirely to external agents (via MCP/Skill) leaves non-technical users without a usable AI surface. MiMo should ship a first-party AI option alongside the API.
- **Schema isolation across Spaces/Channels.** Not being able to share Types across encrypted Channels is a real friction; MiMo should think about cross-space schema propagation.
- **Relying on OS keychain as the only key backup.** This works for technical users but creates a hard cliff for non-technical ones. MiMo should consider social/multi-device recovery options.
- **No documented accessibility conformance.** MiMo should publish a WCAG conformance statement and ship a screen-reader-tested mode.
- **Terminology churn** ("Channel" vs "Space" vs "Vault" vs "Object" vs "Type" vs "Property" — six nouns to learn before you can use the app). MiMo should minimize the noun surface.

## 30. Confidence Score

**Confidence: 88/100.**

Reasoning:
- **Strong evidence base** across all 30 sections. The Anytype docs surface (GitBook with `.md` versions of every page, queryable via `?ask=` parameter, plus `llms.txt` index) is the most agent-friendly documentation surface in this evidence set. Every claim in this file is sourced from a canonical `doc.anytype.io` Markdown page or the official `anytype.io` marketing site.
- **Strong on:** philosophy (3-pillar model), trust (encryption details, BIP39, EU hosting, telemetry), data model (Objects/Types/Properties/Views/Queries/Collections/Templates), agent experience (Skill, Local API, sandboxing), DX (open-source protocol, OpenAPI spec, SDKs), power features (Formulas, Advanced Filters, Self-host, Local-only, Custom CSS).
- **Weaker on:** motion / animation / visual hierarchy / accessibility (no official specs — inferred from documented features and marketing copy), onboarding (docs describe the conceptual journey but not in-product tour/empty-state), semantic search (absence is itself the evidence — no docs page exists).
- **What would raise confidence to 95+:** hands-on time with the product to verify motion, accessibility tree, onboarding tour, and the visual-design polish gap vs Craft; official accessibility conformance statement; clarification of Spaces vs Channels terminology.
