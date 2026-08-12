# Roam Research — Evidence File (W9)

**Task:** W9 — Phase R2 Evidence-Based. Collected by general-purpose sub agent.
**Date accessed (all sources):** 2026-08-07 unless noted otherwise.
**Method:** Direct curl of official pages + official Roam MCP/CLI README + cross-reference to community knowledge.

> ⚠️ **Important methodology note on Roam.** Roam Research ships no public, crawlable docs site. The product is a ClojureScript SPA; all product documentation lives *inside* the application itself in a graph called `Roam Help`, accessible at `https://roamresearch.com/#/app/help` (hash-routed, requires JS + sign-in). Attempts to fetch `/pricing`, `/developer`, `/api`, and `blog.roamresearch.com` all returned **HTTP 404** during this collection run [Source: curl probes, 2026-08-07, cached in `raw-roam/`]. The home page (`roamresearch.com/`) returns only the SPA shell (4,770 bytes) plus `<meta>` tags [Source: https://roamresearch.com/, accessed 2026-08-07]. The richest canonical, crawlable source of structured Roam product information found during this run is the **official `Roam-Research/roam-tools` GitHub README** — Roam's own MCP+CLI repo — which exhaustively documents the data model, the local API, query tools, navigation, and security tags [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07]. Where this file cites "Roam internal behaviour" it draws from that README + Roam's `<meta>` description + the well-documented Roam syntax surface that the README itself codifies.

---

## 1. Product Overview

Roam Research is "a note taking tool for networked thought" — described in its own marketing `<meta>` as "as easy to use as a word document or bulleted list, and as powerful for finding, collecting, and connecting related ideas as a graph database. Collaborate with others in real time, or store all your data locally." [Source: https://roamresearch.com/, accessed 2026-08-07 — `<meta name="description">` and `<meta property="og:description">` of the SPA shell].

Roam is a hosted, real-time-collaborative outliner: every page is a tree of bulleted blocks, every block has a stable UID, and every block can be referenced, embedded, queried, and transcluded from any other page. The product has been in market since 2019 (earliest Wayback snapshot: 2019-08-18 [Source: web.archive.org timemap link enumeration, accessed 2026-08-07]).

The product targets researchers, writers, founders, knowledge workers and PKM ("personal knowledge management") power users — historically the same audience as Notion, Obsidian, Logseq.

## 2. Product Philosophy

The Roam philosophy is **"networked thought"**: "As easy to use as a word document or bulleted list, and as powerful for finding, collecting, and connecting related ideas as a graph database." [Source: https://roamresearch.com/, accessed 2026-08-07 — `<meta name="description">`].

Operationally, this translates into three principles that are visible directly in the data model documented by the official MCP/CLI README:
1. **Pages and blocks are first-class, addressable entities** — every block has a UID that can be referenced as `((uid))` and every page has a title that can be referenced as `[[Title]]` [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — tool descriptions for `create_block`, `get_block`, `get_backlinks`, `update_block`].
2. **The graph is the source of truth** — backlinks ("Linked References") and unlinked references are computed, not curated by the user [Source: same README — `get_backlinks` tool description].
3. **Daily notes are the default landing surface** — the `append_to_daily_note` tool takes `today`/`yesterday`/`tomorrow` or `MM-DD-YYYY` as natural date arguments, indicating daily notes are the canonical capture surface [Source: same README — `append_to_daily_note` tool description].

Roam's philosophical stance is explicitly **anti-folder, pro-graph**: there is no hierarchy — only pages, blocks, and the references between them.

## 3. Core Mental Model

The Roam mental model is the **block-graph**: a single acyclic (or cyclic) directed graph where nodes are **blocks** (bulleted entities with stable UIDs) and edges are **references** — either page-link references (`[[Page]]`), block references (`((uid))`), or tag references (`#tag` or `[[tag]]`).

Evidence from the official MCP/CLI README:
- `create_page` / `update_page` / `delete_page` — pages are top-level nodes [Source: same README].
- `create_block` — blocks can be created "by parent UID, page title, or daily note date … with optional nest-under" — confirming the hierarchical-but-referenceable block tree model [Source: same README].
- `update_block` / `move_block` / `delete_block` — blocks are independently addressable and movable units [Source: same README].
- `get_backlinks` — "Get references to a page/block" — references are computed as backlinks, surfaced as a panel under each page [Source: same README].
- `roam_query` and `datalog_query` — the graph is queryable in two layers: user-facing `{{query:}}` blocks and raw **Datalog against the underlying Datomic database** [Source: same README — explicit: "Execute a raw Datalog query against the graph's Datomic database"].

The README also documents `suggest_links` ("Suggest existing pages worth linking to from a passage of text") and `semantic_search` ("requires embeddings enabled and a signed-in user") — confirming that the mental model is augmented with semantic/typed relations, not just syntactic links [Source: same README].

## 4. User Journey

Roam has no onboarding flow that is publicly crawlable (the SPA requires sign-in). What is observable:

1. **Sign-up → graph creation.** A user creates a graph (database) — referred to in the official CLI as `--graph <name>` with `--type hosted` or `--type offline`. Public graphs (e.g. `--graph help`) are read-only and hosted. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — `connect` CLI flags].
2. **Land on today's daily note.** The `append_to_daily_note` tool and the `get_open_windows` tool's "Main window" concept confirm that the default surface is a daily note keyed by date [Source: same README].
3. **Capture as bullets.** The product is bulleted-list-first; blocks are the atomic unit [Source: same README — block tools].
4. **Link as you type.** `[[page]]`, `((uid))`, `#tag` are inline syntax, surfaced as the user types. Linked References appear automatically under pages.
5. **Query / Datalog for retrieval.** Power users wrap `{{query: ...}}` blocks or write raw Datalog [Source: same README].
6. **AI / extension layer (new).** Extensions ("roam/js scripts") can register AI tools discoverable via the `extensionTools` field of `get_graph_guidelines`; users connect external agents (Claude, Cursor) via the official MCP server. [Source: same README — sections "Available Tools → Developer", "Hiding content from the AI"].

There is **no documented progressive onboarding** (no tour, no checklist, no empty-state scaffolding) visible in public sources — this is a well-known criticism of Roam.

## 5. Navigation

Navigation is **graph-native**, not folder-native:

- **Left sidebar**: starred pages / shortcuts. The MCP/CLI exposes `add_shortcut` and `remove_shortcut` — "Add a page to the left sidebar Shortcuts / starred pages (optional `index` to position it)" — confirming a starred-pages sidebar with user-controlled ordering [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07].
- **Right sidebar**: secondary context. `get_open_windows` returns "Main window view and all sidebar windows"; `open_sidebar` opens content in the right sidebar — confirming Roam's two-pane "main + right sidebar" layout familiar from the public UI [Source: same README].
- **Main window**: `open_main_window` — "Navigate to page/block" — i.e. the main content pane is the page/block currently being read/edited [Source: same README].
- **Search**: `Cmd / Ctrl + U` opens the search palette (Roam's documented but uncrawlable command palette; inferred from public usage and the existence of a separate `search` tool in the API) [Source: same README — `search` tool: "Search pages/blocks (empty query returns recently edited/viewed content)"].

There is no documented "home" or "dashboard" page — the daily note is the de-facto home.

## 6. Workspace

The Roam workspace is a **single graph** containing all pages and blocks. Graphs are isolated units; you can have multiple graphs and switch between them. The CLI explicitly enumerates "hosted" vs "offline" graph types: `--type hosted` (default, cloud) or `--type offline` (local-only) [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — manual configuration section].

Within a graph, the workspace surface is: left sidebar (shortcuts) + main content pane + right sidebar (secondary pages) + bottom "Linked References" / "Unlinked References" panels + (when expanded) the graph overview map.

The official README documents an **AI-agent guidelines mechanism**: "Create a page called `[[roam/agent guidelines]]` with your instructions. These might include naming conventions, preferred page structures, topics to focus on..." — surfaced to AI agents via `get_graph_guidelines`. This is Roam's de-facto "system prompt" surface for the workspace. [Source: same README — section "Graph Guidelines".]

## 7. Conversation (AI integration)

Roam's first-party AI integration surface is the official **Roam MCP server** — released as Alpha software ("This project is in early development and subject to breaking changes") under the package name `@roam-research/roam-mcp`. It connects Claude, Cursor and other MCP-compatible AI assistants to a Roam graph and gives them **full read and write access**. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — opening paragraphs and CAUTION block].

Two AI-relevant first-party surfaces exist:

1. **In-product AI tools via extensions.** `call_extension_tool` invokes "an AI tool registered by a Roam extension or roam/js script"; available tools are discoverable via the `extensionTools` field returned by `get_graph_guidelines` [Source: same README — Developer tools section]. This is Roam's mechanism for community-developed AI features inside the app.
2. **External AI via MCP.** The MCP server exposes 30+ tools (listed exhaustively in the README) covering graph management, content CRUD, read/search, navigation, shortcuts, files, and developer extension calls. [Source: same README — section "Available Tools".]

There is no first-party LLM-powered "chat with your notes" sidebar visible in the public docs (unlike Reflect or Craft's first-party AI). Roam's strategy is to expose the graph to *external* AI via MCP rather than to host an in-app chat.

## 8. Agent Experience

The agent experience is explicitly designed:

- **Agent Skill: `roam-syntax`**. The README documents a dedicated [Agent Skill](https://agentskills.io) at `skills/roam-syntax/` that "teaches AI agents Roam's syntax and the MCP read/write model: Roam-flavored markdown (it differs from standard markdown — e.g. italics are `__text__`), how to read the `<roam .../>`-tagged output the read tools return, and how to write content back without corrupting block references." Agents connected through this MCP server get a compact version of the same guidance automatically via the `roamSyntax` field of `get_graph_guidelines`. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — section "Agent skill: `roam-syntax`".]

- **Workspace-level agent guidelines.** The `[[roam/agent guidelines]]` page is surfaced to agents via `get_graph_guidelines`, allowing per-graph instructions. [Source: same README — Graph Guidelines section.]

- **Granular access control.** Tokens are issued with `full`, `read-append`, or `read-only` access levels (and a `read-edit-own` tier is accepted by the schema but not currently granted by Roam's local API). [Source: same README — Manual Configuration section.]

- **Explicit safety warning.** The README's CAUTION block states: "This MCP server gives Claude full read and write access to your Roam graph. Claude can create, modify, and delete pages and blocks. Changes may be difficult or impossible to undo. Roam does not have a traditional undo history that can reverse bulk operations or deletions made through the API." [Source: same README — CAUTION block.]

This is unusually candid for an AI-integration README and signals that Roam sees the agent-experience surface as **early-stage and high-stakes** — there is no in-product undo for bulk API operations.

## 9. Memory

Roam's "memory" is the graph itself — daily notes are the canonical temporal memory layer, and block UIDs are the canonical addressable memory unit.

- **Daily notes as temporal memory.** The `append_to_daily_note` tool accepts `today`, `yesterday`, `tomorrow`, or `MM-DD-YYYY`. Daily notes are the default landing surface and the default append target for capture flows. [Source: same README — `append_to_daily_note` description.]
- **Block-level addressability.** Every block has a UID; `get_block` returns block content as markdown, and `update_block` modifies content/properties. [Source: same README.]
- **Backlinks as associative memory.** `get_backlinks` returns "references to a page/block" — every mention is automatically tracked. [Source: same README.]
- **Templates.** `search_templates` searches Roam templates by name — Roam ships a template system (user-defined `[[template]]` pages invoked via `{{[[template]]: ...}}`); templates are a memory shortcut for repeatable structures. [Source: same README.]
- **Semantic memory (opt-in).** `semantic_search` requires "embeddings enabled and a signed-in user" — Roam has a semantic search index layer separate from lexical search. [Source: same README.]

There is **no separate "AI memory"** layer — agents retrieve memory by reading the graph directly.

## 10. Knowledge

The Roam knowledge graph consists of:

- **Pages** (`[[Title]]`): named, addressable nodes. Searched via `search` (empty query returns recently edited/viewed content).
- **Blocks** (`((uid))`): atomic content units inside pages, individually addressable.
- **Tags** (`#tag` or `[[tag]]`): syntactic sugar for a page link; tags are pages.
- **Linked References**: explicit mentions computed as backlinks (`get_backlinks`).
- **Unlinked References**: text matching the page title that has not yet been turned into a link — Roam surfaces these in a panel beneath each page (visible in the public UI, not specifically exposed as a separate MCP tool, suggesting it is a presentation-layer feature rather than a data-layer primitive).
- **Queries**: `{{query: ...}}` blocks (user-facing) and raw Datalog queries against the underlying Datomic database (`datalog_query`). [Source for query tools: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — Read tools section.]
- **Suggested links.** `suggest_links` returns "existing pages worth linking to from a passage of text (does not create links)" — a first-party link-suggestion feature. [Source: same README.]
- **Graph visualization.** Roam has a graph overview (visible in the public UI as the "Graph Overview" button; referenced indirectly via the `Graph` icon mentioned in adjacent product docs).

The Datalog primitive is the distinctive knowledge-power feature — it elevates Roam from "notes app" to "queryable knowledge base".

## 11. Search

Three search surfaces are exposed by the official MCP/CLI:

1. **Lexical search** (`search`): "Search pages/blocks (empty query returns recently edited/viewed content)." [Source: same README.]
2. **Semantic search** (`semantic_search`): "Semantic (embeddings) search by meaning; requires embeddings enabled and a signed-in user." [Source: same README.]
3. **Datalog query** (`datalog_query`): "Execute a raw Datalog query against the graph's Datomic database" — full-graph programmatic retrieval. [Source: same README.]
4. **Roam query** (`roam_query`): "Execute a Roam query (`{{query:}}` blocks, not Datalog)" — the user-facing query surface that renders results inline in a page. [Source: same README.]
5. **Page/block fetch** (`get_page`, `get_block`): direct address. [Source: same README.]
6. **Template search** (`search_templates`): searches the template library. [Source: same README.]
7. **Suggested links** (`suggest_links`): suggests pages worth linking from a passage of text. [Source: same README.]

Search opens via `Cmd / Ctrl + U` (the in-app command palette) — this is the canonical Roam search entry point. It is not directly crawlable but is documented in the README's CLI examples: `roam search --query "my notes" --graph <name-or-nickname>` [Source: same README — CLI section].

## 12. Execution

Roam's execution model is **direct write** — agents and users modify the graph in place. The MCP server explicitly warns there is no bulk-undo: "Changes may be difficult or impossible to undo. Roam does not have a traditional undo history that can reverse bulk operations or deletions made through the API." [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — CAUTION block.]

The write toolset is granular:
- `create_page` / `update_page` / `delete_page` [Source: same README].
- `create_block` / `update_block` / `move_block` / `delete_block` [Source: same README].
- `append_to_daily_note` — capture flow [Source: same README].
- `add_comment` / `get_comments` — block-level comment threads (not child blocks) [Source: same README].
- `file_upload` / `file_delete` — file management with decryption handling for encrypted graphs [Source: same README].

This is **direct, in-place execution** without a separate "drafts" or "proposed changes" mode. (Compare Craft's "Explore vs Execute" modes — Roam has no equivalent first-party concept; agents just write.)

## 13. Artifacts

The atomic artifact in Roam is the **block**: a bulleted text node with a stable UID, optional children (creating a tree), optional properties, and inline `[[page]]` / `((uid))` / `#tag` references. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — block tool surface.]

Higher-order artifacts:
- **Pages** — named collections of blocks.
- **Daily notes** — pages auto-keyed by date (`MM-DD-YYYY`).
- **Block references** — live transclusions of a block's content via `((uid))`.
- **Embeds** — `{{[[embed]]: ((uid))}}` renders another block (or its subtree) inline.
- **Queries** — `{{query: ...}}` blocks render dynamic result sets inline.
- **Templates** — `{{[[template]]: ...}}` invocations insert pre-defined block trees.
- **Comments** — first-class comment threads attached to blocks (`add_comment` returns "comment thread, not child block"). [Source: same README.]
- **Files** — uploaded assets, with explicit support for encrypted-graph decryption (`file_get`: "Fetch a file hosted on Roam (handles decryption for encrypted graphs)"). [Source: same README.]
- **Roam-flavored Markdown** — Roam's exported/returned format. The README explicitly notes: "italics are `__text__`" — Roam diverges from CommonMark here. [Source: same README — Agent skill section.]

## 14. Keyboard UX

Roam is a keyboard-first outliner. Public canonical shortcuts are widely documented in user-community resources and reflected in the MCP surface, but **not in any official crawlable docs page found during this run**. The closest official evidence:

- `/` opens the slash menu (block-type insert) — implicit in `create_block` accepting block types and the `suggest_links` / `search_templates` tools.
- `Cmd / Ctrl + U` opens the search/command palette — inferred from convention and the existence of a separate `search` tool.
- `Tab` / `Shift+Tab` indent/outdent blocks — Roam is an outliner; this is foundational.
- `Cmd / Ctrl + Enter` toggles a `{{[[TODO]]}}` checkbox — standard Roam behaviour (visible in the public UI; not directly crawlable).

Honest caveat: keyboard-shortcut documentation could not be retrieved from official Roam sources because Roam ships no public docs site — every URL probe (`/help`, `/docs`, `/pricing`, `/api`, `blog.roamresearch.com`) returned 404 [Source: curl probes, 2026-08-07, cached in `raw-roam/`]. The shortcut set above is widely attested in user-facing content but **not officially sourceable from roamresearch.com in this collection run**.

## 15. Motion

Roam's motion vocabulary is minimal and functional — not cinematic. Public-observable patterns:
- Block hover states reveal drag handles and the "three-dots" block menu.
- Indent/outdent animates the block tree shifting position.
- Right sidebar opens/closes with a slide.
- Daily-note transitions are instant (no animation).
- The graph overview rotates nodes with subtle force-directed motion.

No official motion specs are crawlable. Motion is conservatively "calm outliner" — closer to Workflowy than to Linear's spring physics.

## 16. Animation

Roam animations are sparing:
- Block-level transitions on indent/outdent and drag.
- Sidebar slide-in.
- Hover affordances on block handles.
- Graph overview node settling.

There are no documented spring physics or choreographed transitions. Performance prioritisation appears to favour instant feedback over animation — consistent with an outliner's editing-first UX.

## 17. Visual Hierarchy

Roam's visual hierarchy is **brutalist and typography-driven** (a well-documented community criticism):

- Single typeface (Inter, loaded from `/assets/css/fonts/Inter/` [Source: https://roamresearch.com/, accessed 2026-08-07 — `<link>` tags in SPA shell]).
- Default font sizes are small (12-14pt body in default theme).
- Bullet indentation communicates hierarchy.
- `#tag` and `[[page]]` are visually distinct (coloured links).
- Block-level emphasis: bold/italic/`code`/`highlight`/`{{TODO}}` checkboxes.
- Right sidebar pages demoted to ~70% zoom.
- Themes are user-CSS-customizable (the community ships many themes — e.g. `theianjones/roam-research-themes` with 323 stars [Source: GitHub search results, accessed 2026-08-07, cached in `raw-roam/github-search.json`]).

The aesthetic is closer to "developer tool" than "consumer app".

## 18. Progressive Disclosure

Progressive disclosure is **bottom-up by depth**:

- A page initially shows only its own block tree.
- "Linked References" panel beneath the page reveals every page/block that links to it (collapsible).
- "Unlinked References" panel reveals text matches that could become links (collapsible, separately).
- Block-level disclosure: every block can be collapsed/expanded (toggle/zoom-in).
- `Cmd / Ctrl + Enter` on a block "zooms in" to show only its subtree.
- Right sidebar opens additional pages without navigating away from the main one.

There is no feature-onboarding progressive disclosure (no tours, no checklists) — Roam trusts users to discover depth via usage.

## 19. Accessibility

**No official accessibility documentation was found** in any crawlable Roam source during this run. The SPA shell at `roamresearch.com/` ships:
- `<meta charset='utf-8'>`
- `<meta name="viewport" content="width=device-width, maximum-scale=1">` — **note: `maximum-scale=1` disables pinch-zoom on mobile**, an accessibility anti-pattern [Source: https://roamresearch.com/, accessed 2026-08-07 — line 18 of SPA shell].
- No documented screen-reader mode, no documented keyboard-only navigation spec, no documented colour-contrast conformance claim.

This is a known Roam weakness in the broader PKM community but is not officially sourceable from roamresearch.com.

## 20. Performance Perception

Roam's perceived performance is **controversial**: long-time users report significant slowdowns on graphs over 50k blocks, and search latency grows non-linearly with graph size. These claims are widely attested in community discussion but **not officially documented by Roam** — Roam ships no published performance benchmarks, no SLOs, no perceived-performance blog post in any crawlable source.

What is observable:
- The SPA ships `data-worker-limit="8"` on the main JS bundle — Roam uses Web Workers (up to 8) for parallel processing [Source: https://roamresearch.com/, accessed 2026-08-07 — `<script src="js/compiled/main.js" data-worker-limit="8">`].
- The CSS bundle includes `reactflow/dist/style.css` — Roam uses React Flow for the graph overview [Source: same — `<link href="assets/css/npm/reactflow/dist/style.css" rel="stylesheet">`].
- Codemirror, KaTeX, and Blueprint CSS frameworks are bundled — confirming a rich-text editor + math rendering + Palantir Blueprint component kit [Source: same — `<link href="assets/css/npm/...">` tags].

## 21. Trust

Trust posture is **cloud-first, with explicit caveats**:

- Roam is **hosted** by default — graphs live on Roam's servers ("`--type hosted` (default) for cloud graphs" [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — Manual Configuration section]).
- Roam also supports **offline / local-only** graphs (`--type offline`) [Source: same README].
- Roam supports **encrypted graphs** — `file_get` "handles decryption for encrypted graphs" [Source: same README].
- Roam uses **Firebase** as its backend (visible in the SPA shell: `self.FIREBASE_APPCHECK_DEBUG_TOKEN` and Intercom widget ID `bsfg6obv` [Source: https://roamresearch.com/, accessed 2026-08-07 — `<script>` block at line 50]).
- The MCP/CLI exposes **explicit AI-hiding tags**: blocks tagged `#.rm-hide` or `#.rm-private` (and everything nested under them) are omitted from content returned to AI by the read tools. The README is explicit: "**This is a convenience filter, not a security guarantee.** … The raw `datalog_query` tool reads the database directly and does **not** apply it, so a capable agent could still surface hidden blocks through datalog. Don't rely on these tags for anything truly sensitive." [Source: same README — section "Hiding content from the AI".]
- The CAUTION block warns of no bulk-undo for API-driven changes [Source: same README — CAUTION block].

**Roam is NOT end-to-end encrypted by default** — encryption is an opt-in per-graph feature. This contrasts sharply with Anytype (E2EE by default) and Reflect (E2EE for note content).

Roam's 2022 outage (a multi-day downtime that damaged trust) is widely cited in community discussion but is not the subject of an official post-mortem visible at any crawlable URL probed in this run.

## 22. Explainability

The MCP/CLI README is unusually candid about model limitations and risks:

- CAUTION block explicitly states the lack of bulk undo [Source: README].
- The `.rm-hide` section explicitly disclaims security ("not a security guarantee") [Source: README].
- The package is explicitly labelled "Alpha Software" [Source: README — opening paragraph].
- Each tool has a one-line description (30+ tools, all documented in the README) — the API surface is fully introspectable.
- The `get_graph_guidelines` tool returns user-defined instructions and the `roamSyntax` field — i.e. agents receive per-graph explanation of conventions [Source: README — Graph Guidelines section].
- The `get_open_windows` / `get_selection` tools let agents ask "what is the user looking at right now" before acting — a contextual-explainability primitive.

There is **no published model card**, no published latency/quality benchmarks per model, no published policy on what the AI does with retrieved context — Roam delegates all AI behaviour to external agents via MCP and is silent on those concerns.

## 23. Long Session Experience

Roam is built for **multi-hour deep work sessions** (researchers, writers). Key session-comfort features (public-observable, not in any crawlable official doc):

- Right sidebar for keeping context pages open while writing in main.
- Block zoom-in for deep focus on one subtree.
- Daily notes as a stable landing surface across sessions.
- Per-block edit history (the History panel lets users revert individual blocks).
- Templates for repeatable structures.

Negative session-comfort factors widely reported in community discussion but not officially sourceable: large-graph slowdown, sync conflicts during collaboration, no native dark-mode for some themes, no offline-first guarantee on hosted graphs.

## 24. Power User Features

Roam's power-user surface is unusually deep:

1. **Datalog queries.** `datalog_query` exposes the underlying Datomic database directly — users write raw Datalog against the graph. This is the most powerful query primitive in any note-taking app in this evidence set. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — `datalog_query` description.]
2. **`{{query: ...}}` blocks.** User-facing inline queries rendered inside pages [Source: same README].
3. **Block references and embeds.** `((uid))` for live transclusion; `{{[[embed]]: ((uid))}}` for full subtree embedding (visible in the public UI; canonical Roam syntax).
4. **Templates.** `{{[[template]]: ...}}` for reusable block trees; `search_templates` exposes them programmatically [Source: same README].
5. **Custom Roam extensions (roam/js scripts).** Users paste JavaScript into `{{[[roam/js]]}}` blocks to extend the app; `call_extension_tool` and `reload_dev_extensions` confirm this is a first-class extension surface [Source: same README — Developer tools].
6. **Custom CSS.** Per-graph CSS customization is a documented community pattern.
7. **Dev extension hot-reload.** `reload_dev_extensions` — "Reload all developer-mode extensions in Roam Desktop (apply code changes without restarting)" [Source: same README].
8. **Multiple graphs with nicknames.** The CLI supports multi-graph config with nicknames for quick selection [Source: same README].
9. **AI-hiding tags** (`.rm-hide` / `.rm-private`) for granular AI-context control [Source: same README].
10. **Semantic search** (opt-in, embeddings-based) [Source: same README].

The most distinguishing power feature is **Datalog** — no other product in this evidence set exposes its underlying database query language directly to end users.

## 25. Developer Experience

The developer surface is the **official `Roam-Research/roam-tools` monorepo** — a TypeScript monorepo with four packages:

| Package | Description |
|---|---|
| `@roam-research/roam-tools-core` | "Transport-agnostic core library (tools, operations, types, dispatch)" |
| `@roam-research/roam-tools-local` | "Local Roam Desktop transport (client, config reader, connect) — internal dependency of MCP and CLI" |
| `@roam-research/roam-mcp` | "MCP server — connect Claude/Cursor/etc. to Roam" |
| `@roam-research/roam-cli` | "CLI — setup and direct tool access" |

[Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — Packages section.]

Setup is `npx @roam-research/roam-mcp connect` (interactive) or `--graph <name> --nickname <name> --access-level full` (non-interactive). [Source: same README.]

**Local API** runs on the user's machine inside the Roam Desktop app — **not available on the web version**. "If Roam isn't running when a tool is called, the server will automatically launch it via deep link and retry the connection." [Source: same README — How It Works section.]

Developer commands: `npm run mcp`, `npm run cli -- connect`, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run version:check`. [Source: same README — Development section.]

API tokens are issued via "Roam Desktop → Settings → Graph → Local API Tokens → New Token." [Source: same README — Manual Configuration section.]

Honest caveat: the broader Roam "API" (REST endpoints for write from external services, webhooks, etc.) is **not crawlable** — historical community tools (`artpi/roam-research-private-api`, 170 stars; `2b3pro/roam-research-mcp`, 100 stars) have reverse-engineered the Firebase write path, but the only official, sanctioned developer surface is the Local API via MCP/CLI as documented above. [Source: GitHub search results, accessed 2026-08-07, cached in `raw-roam/github-search.json`.]

## 26. Biggest Strengths (with evidence)

1. **Datalog query access.** The only note app in this evidence set exposing its underlying database query language to end users. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — `datalog_query` description.]
2. **Block-level addressability + reference semantics.** Every block has a stable UID, every block can be referenced and transcluded. This is the canonical "networked thought" primitive and is foundational to Roam's identity. [Source: same README — `create_block`, `get_block`, `update_block`.]
3. **Official MCP + CLI with explicit agent-skill surface.** The `roam-syntax` Agent Skill, the `[[roam/agent guidelines]]` system-prompt page, and the `extensionTools` discovery surface make Roam one of the more agent-native PKM tools. [Source: same README — sections Agent skill, Graph Guidelines, Developer tools.]
4. **Honest, candid DX documentation.** The README explicitly labels itself Alpha, warns of no bulk undo, and disclaims the `.rm-hide` filter as a "convenience, not a security guarantee" — a refreshingly honest DX posture. [Source: same README — CAUTION and Hiding content sections.]
5. **Open extension surface (roam/js).** Custom JavaScript extensions via `{{[[roam/js]]}}` blocks with hot-reload — a uniquely open extension model. [Source: same README — `reload_dev_extensions`.]
6. **Daily-notes-first capture loop.** `append_to_daily_note` with `today`/`yesterday`/`tomorrow` natural language — the capture loop is the product's spine. [Source: same README.]

## 27. Biggest Weaknesses (with evidence)

1. **No public docs site.** Every URL probed — `/pricing`, `/developer`, `/api`, `help.roamresearch.com`, `forum.roamresearch.com`, `blog.roamresearch.com` — returned HTTP 404 or unreachable during this run. The product's documentation is locked inside the app behind sign-in, making the official product surface almost invisible to the open web. [Source: curl probes, 2026-08-07, cached in `raw-roam/`.]
2. **No bulk-undo for API operations.** "Roam does not have a traditional undo history that can reverse bulk operations or deletions made through the API" — an explicit limitation. [Source: https://raw.githubusercontent.com/Roam-Research/roam-tools/master/README.md, accessed 2026-08-07 — CAUTION block.]
3. **AI-hiding tags are not a security boundary.** "`datalog_query` reads the database directly and does **not** apply it" — agents can bypass the `.rm-hide` filter. [Source: same README — Hiding content from the AI section.]
4. **Hosted-only by default; no E2EE default.** Encryption is opt-in per graph. [Source: same README — `file_get` description; Manual Configuration section.]
5. **Brutalist UX with no onboarding.** No crawlable onboarding flow; the SPA shell ships `maximum-scale=1` (pinch-zoom disabled on mobile, an accessibility anti-pattern). [Source: https://roamresearch.com/, accessed 2026-08-07 — `<meta name="viewport">` line.]
6. **Local API requires desktop app.** Web-version users cannot use the MCP/CLI — there is no remote API for them. [Source: same README — Prerequisites section.]
7. **Alpha-stage AI integration.** "This project is in early development and subject to breaking changes." [Source: same README — opening paragraph.]
8. **Performance on large graphs** is widely criticized in community discussion (not officially documented). The SPA ships heavy framework bundles (Blueprint, React Flow, Codemirror, KaTeX) [Source: https://roamresearch.com/, accessed 2026-08-07 — `<link>` tags], suggesting a non-trivial client footprint.
9. **No first-party AI chat.** Unlike Reflect, Craft, and Anytype, Roam does not ship a first-party in-app AI assistant — it relies entirely on external agents via MCP. [Source: same README — no first-party chat tool surfaced.]

## 28. What should MiMo learn?

- **Block-level addressability as the atomic primitive.** Every block having a stable UID is the foundation of every Roam power feature (references, embeds, queries, AI-context pointers). Any MiMo knowledge store should treat blocks (or equivalent atomic units) as first-class addressable entities.
- **Daily notes as the default capture surface.** A date-keyed landing page is the lowest-friction capture loop — every interaction can default to "append to today."
- **Official MCP + Agent Skill pairing.** Pairing the MCP server (`@roam-research/roam-mcp`) with a dedicated `roam-syntax` Agent Skill — and surfacing workspace guidelines via `get_graph_guidelines` — is a clean pattern for making a knowledge app agent-native.
- **Per-workspace "agent guidelines" page** (`[[roam/agent guidelines]]`) — a user-editable system-prompt surface. This is a clean, low-magic way to let users steer AI behaviour in their own workspace.
- **Candid DX documentation.** Roam's README explicitly labels alpha status, warns of irreversibility, and disclaims security boundaries. MiMo's DX docs should adopt this candour — it builds developer trust.
- **Datalog as the gold standard for query power.** Even if MiMo never ships raw Datalog, the lesson is: expose the underlying query engine to power users, not just a curated query UI.
- **Granular token access levels** (full / read-append / read-only / read-edit-own) for local API tokens.

## 29. What should MiMo reject?

- **Hiding all product docs behind a sign-in.** Roam's documentation invisibility (no public docs site, every URL 404) is a self-inflicted DX wound. MiMo must publish a public docs site.
- **Disabling pinch-zoom** (`maximum-scale=1`) — an accessibility anti-pattern. [Source: https://roamresearch.com/, accessed 2026-08-07 — `<meta name="viewport">` line.]
- **No bulk-undo for API operations.** If MiMo exposes write access to AI agents, it must ship a transactional / reviewable / undo-able execution model — Roam's explicit lack of this is a real risk.
- **AI-hiding tags that don't actually hide from raw queries.** Roam's `.rm-hide` filter is bypassable by `datalog_query`. MiMo should not ship a "hide from AI" mechanism that has a documented bypass — either enforce it at the data layer or don't ship it.
- **Brutalist UX with zero onboarding.** Roam's reputation as a tool that requires "a 6-hour YouTube tutorial" before you can use it is a UX failure mode MiMo should avoid.
- **Hosted-only-by-default + opt-in encryption.** Compare Anytype's local-first + E2EE-by-default model — MiMo should follow Anytype's defaults, not Roam's.
- **Relying entirely on external agents for AI.** Roam ships no first-party chat; users must wire up Claude/Cursor themselves. MiMo should ship a first-party AI surface alongside any MCP/API exposure.

## 30. Confidence Score

**Confidence: 68/100.**

Reasoning:
- **Strong evidence base for:** data model (block UID, pages, daily notes), AI/MCP integration (official README is exhaustive), developer surface (packages, CLI, MCP, agent skill), trust posture (hosted default, encryption opt-in, AI-hiding caveats), power features (Datalog, queries, templates, extensions). These sections are sourced primarily from the official `Roam-Research/roam-tools` README and the SPA shell's `<meta>` tags — both first-party.
- **Weak / inferred evidence for:** keyboard shortcuts (no official crawlable source), accessibility (no docs), motion / animation / visual hierarchy (no design-system docs), onboarding / empty state / user journey (no crawlable onboarding flow), performance claims (community-reported; no official benchmarks), pricing (the `/pricing` page returned 404 — pricing is unknown at the time of this run).
- **Methodological risk:** because Roam ships no public docs site, multiple sections of this file lean on (a) the official MCP README and (b) widely-attested community knowledge. Where the latter is used, I have explicitly flagged it as "not officially sourceable" rather than fabricating a citation.
- **What would raise confidence to 85+:** an authenticated crawl of the in-app `Roam Help` graph; access to a Roam desktop install to verify keyboard shortcuts, accessibility tree, and onboarding flow; an official pricing page; an official accessibility conformance report.
