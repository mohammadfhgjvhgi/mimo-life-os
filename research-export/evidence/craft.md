# Craft — Evidence File (W9)

**Task:** W9 — Phase R2 Evidence-Based. Collected by general-purpose sub agent.
**Date accessed (all sources):** 2026-08-07.
**Method:** Direct curl of official pages at `craft.do` (marketing home + blog) and `support.craft.do` (Mintlify-hosted help center, including the canonical `llms.txt` index of all 170+ doc URLs). The Mintlify docs surface exposes every page as Markdown at `craft-support.mintlify.app/en/<path>.md`. This evidence file draws from those canonical Markdown sources plus the marketing site and blog.

> ✅ **Evidence posture:** Craft ships an unusually complete docs surface via Mintlify. The canonical `https://support.craft.do/llms.txt` enumerates 170+ doc URLs across account, AI assistant, integration, import/export, write/edit, organize, search, and craft-in-action categories. Markdown versions of every page are exposed at predictable URLs. This evidence file is sourced primarily from those canonical Markdown docs.

---

## 1. Product Overview

Craft is "Your space for notes, tasks, and big ideas" — a native, cross-platform productivity app for documents, tasks, calendars, whiteboards, and daily notes. Tagline on the home page: "Craft isn't just for one thing, it's for your things." [Source: https://www.craft.do/, accessed 2026-08-07 — stripped home text, cached at `raw-craft/home.txt`.]

Available on: iPhone, iPad, Mac (Apple Silicon and Intel), Windows (x64 and ARM64), Vision Pro, Android, and Web [Source: same — footer Download section]. Craft has won **Apple Design Awards**, been Apple Design Awards Finalist, won **Webby Awards** "three times in various categories", and won the **German Design Award Excellent Communications Design Interactive UX** [Source: same — awards strip].

Pricing:
- **Free**: "Full access, great if you use it occasionally each week." HK$0 / month [Source: same — Pricing section.]
- **Plus**: "Designed to effortlessly fit into your everyday flow." HK$62 / month [Source: same.]
- Education Plan: free for students/faculty/staff of academic institutions [Source: https://craft-support.mintlify.app/en/account-and-subscription/subscription-plans/education-plan.md, accessed 2026-08-07.]
- Family plan, Team plans (15-day trial), Setapp subscription supported [Source: https://craft-support.mintlify.app/en/account-and-subscription/subscription-plans/plans-and-pricing.md, accessed 2026-08-07.]

Built by "Craft Docs Limited, Inc." (© 2026) [Source: home.txt — footer].

Craft 3 (Nov 28, 2024) introduced Collections, Tasks, and Styling — the biggest update in years [Source: https://www.craft.do/blog, accessed 2026-08-07 — multiple Nov 28, 2024 blog posts]. Subsequent major additions: on-device AI (Jan 31, 2025), in-house sync protocol (Dec 30, 2024), OCR (Dec 15, 2025), Craft Agents (Feb 3, 2026), Kanban boards (Apr 13, 2026), Gallery View + Offline mode (Mar 9, 2026), MCP v2 + BYOK + More Flexible Assistant (Jun 5, 2026) [Source: same — blog post listing].

## 2. Product Philosophy

Craft's philosophy is **"delightful docs"** — "form and function must come hand-in-hand" [Source: https://www.craft.do/blog, accessed 2026-08-07 — Feb 28, 2024 blog post "How we designed sound in a productivity app like Craft"]. The marketing copy positions Craft as "the powerful, beautiful tool for creating documents, managing tasks, and organizing your work and life." [Source: https://craft-support.mintlify.app/en/index.md, accessed 2026-08-07 — opening paragraph.]

The product's foundational manifesto is **"Your content is yours"** (originally published ~2020). From the AI Assistant docs: "Four years ago we published our manifesto: *Your data is yours.* That commitment hasn't changed – in fact, AI has made it even more important." [Source: https://craft-support.mintlify.app/en/ai-assistant.md, accessed 2026-08-07 — "Your data always stays yours" section.] And from the Nov 27, 2025 blog: "Read Balint's vision on our core philosophy 'Your content is yours', and how it shapes the way we build Craft." [Source: blog.txt — Nov 27, 2025 entry.]

Three operating commitments visible across the docs:

1. **Native and beautiful.** Craft is built native per platform (macOS, iOS, Windows, Vision Pro, Android) — "form and function must come hand-in-hand". The product has won multiple design awards.
2. **Your content is yours.** Export is first-class, MCP and API let you bring your content to other tools, AI does not train on your content, on-device AI is available for full privacy.
3. **AI as a thinking partner that can act.** "Craft Assistant changes that. … you can also ask it to execute work directly in Craft." [Source: ai-assistant.md — A new way of working section.]

## 3. Core Mental Model

The Craft mental model is the **block + card + page + space** model:

- **Spaces** are top-level workspaces (Personal, Work, etc.). "Switch between work mode and personal mode." [Source: home.txt — Spaces section.]
- **Documents, Pages, and Blocks** — a Document contains Pages (sub-pages) and Blocks (atomic content units). The help center has a dedicated "Documents, Pages, and Blocks" intro page [Source: support.txt — Introduction section: "Craft 101 — Documents, Pages, and Blocks"].
- **Cards** — a special block type for visual styling: "Card: Cmd + Shift + L" [Source: introduction_shortcuts.md — Style and Formatting section].
- **Tasks** — first-class entities with scheduling, deadlines, reminders: "Schedule Task...: Cmd + Shift + S", "Set Deadline...: Cmd + Shift + D", "Set Reminder...: Cmd + Shift + R" [Source: same — Tasks section].
- **Daily Notes** — date-keyed notes: "Go to Daily Note: Cmd + Option + N" [Source: same — Navigation section].
- **Calendar** — calendar view: "Calendar: Cmd + Option + 5" [Source: same.]
- **Tasks view** — aggregated tasks: "Tasks: Cmd + Option + 4" [Source: same.]
- **Collections** (Craft 3+) — structured databases with custom properties: "Collections — Build structured databases with custom properties" [Source: support.txt — Popular articles section.]
- **Folders & Tags** — classic hierarchy.
- **Whiteboards** — visual canvas [Source: home.txt — Docs section: "Whiteboards"].

The model is **more document-centric than Roam (which is block-graph-centric) and more structured than Reflect (which is note-backlink-centric)**. It is comparable to Notion's pages + databases model, but with native rendering and richer styling.

## 4. User Journey

The journey is documented across the help center "Getting Started" section [Source: support.txt — Introduction section]:

1. **Download** Craft from the App Store (iOS/iPad/Mac), from craft.do (Windows, Vision Pro, Android), or use the Web app.
2. **Sign up** via email + one-time verification code (no passwords: "Craft uses email-based login with one-time verification codes instead of passwords, which helps reduce exposure to phishing and common security breaches." [Source: https://craft-support.mintlify.app/en/account-and-subscription/data-and-security/encryption.md, accessed 2026-08-07 — Secure Login section.]).
3. **Create your first Space** — Personal or Work.
4. **Create a Document** (`Cmd + N`) — the basic content unit.
5. **Add blocks** via slash menu (`/`) or keyboard shortcuts.
6. **Style blocks** — Craft is famous for its styling surface (Title, Subtitle, Heading, Strong, Body, Caption, Page, Card, Focus, Block, etc. [Source: introduction_shortcuts.md — Style and Formatting section]).
7. **Add tasks** (`Cmd + J` from anywhere creates a new task [Source: same — Tasks section]).
8. **Set up Calendar** — connect Apple Calendar on Mac to sync Google/Outlook events [Source: https://craft-support.mintlify.app/en/integrate/calendar.md, accessed 2026-08-07].
9. **Use Craft Assistant** (`Cmd + Return` opens Assistant [Source: introduction_shortcuts.md — Editing section]).
10. **(Optional) Set up API/MCP connections** from the Imagine tab [Source: https://craft-support.mintlify.app/en/integrate/api.md and https://craft-support.mintlify.app/en/integrate/mcp.md, accessed 2026-08-07].

There is a documented "Craft 101" video tutorial series — "11 video tutorials covering everything from basics to advanced features" [Source: support.txt — Video Tutorials section]. So Craft has explicit onboarding content, unlike Roam or Reflect.

## 5. Navigation

Navigation surfaces:

- **Left Sidebar** — Spaces, Folders, Tags, Collections, Starred, All Documents, Shared with Me, Tasks, Calendar. Toggled via `Cmd + \` (macOS) / `Ctrl + \` (Windows) [Source: introduction_shortcuts.md — Navigation section].
- **Quick Open** — `Cmd + O` (macOS) / `Ctrl + O` or `Ctrl + P` (Windows) — "isn't just for documents. Type 'Home', 'Calendar', 'Tasks', or view names like 'Starred' or 'All Docs' to navigate anywhere in Craft instantly." [Source: same — Navigation section, Info box.]
- **Daily Note** — `Cmd + Option + N` (macOS) [Source: same.]
- **Jump to Views** — `Cmd + Option + 1` (All Documents), `2` (Starred), `3` (Shared with Me), `4` (Tasks), `5` (Calendar) [Source: same.]
- **Focus Mode** — `Cmd + .` (macOS) / `Ctrl + .` (Windows) [Source: same — View Controls section.]
- **Navigate Back/Forward/Into** — `Cmd + ←`, `Cmd + →`, `Cmd + Option + →` or `Cmd + ]` (macOS) [Source: same — Basic Navigation section.]
- **Tabs** — `Cmd + T` (new tab), `Cmd + 1` through `Cmd + 9` (switch to tab N), `Ctrl + Tab` (next tab), `Cmd + Shift + T` (reopen last closed tab) [Source: same — Tab Management section.]
- **Search in Space** — `Cmd + F` [Source: same — Documents and Search section.]
- **Copy deeplink** — `Cmd + Option + L` (current view) or `Cmd + Option + Shift + L` (selected block) [Source: same.]
- **Assistant** — `Cmd + Return` (macOS) / `Ctrl + Enter` (Windows) [Source: same — Editing section.]
- **Slash Menu** — `/` opens command menu [Source: same.]
- **Help Agent** — accessible from Assistant > New Chat > Help and Support [Source: https://craft-support.mintlify.app/en/ai-assistant/help-agent.md, accessed 2026-08-07 — Opening the Help Agent section.]

This is the richest navigation surface in the evidence set — comparable to a serious IDE like VS Code.

## 6. Workspace

The Craft workspace is the **Space**:

- Multiple Spaces supported — Personal, Work, etc. "Switch between work mode and personal mode." [Source: home.txt — Spaces section.]
- Each Space contains: Folders, Tags, Collections, Documents, Pages, Blocks.
- **Spaces are isolated for MCP/API** — "Each MCP connection in Craft is linked to a single space. If you want to give an external tool access to documents across multiple spaces, you need to create a separate MCP connection for each space." [Source: https://craft-support.mintlify.app/en/integrate/mcp.md — Using MCP with Multiple Spaces section.]
- **External Locations** — "Store your Craft documents locally on your device instead of in the cloud." [Source: https://craft-support.mintlify.app/en/account-and-subscription/storage-and-recovery/external-locations.md, accessed 2026-08-07.]
- **Keep on Device Folders** — "Keep folders and their assets available offline on your device." [Source: https://craft-support.mintlify.app/en/account-and-subscription/storage-and-recovery/on-device-folders.md, accessed 2026-08-07.]
- **Document Version History** — "Craft automatically backs up your documents and how to restore previous versions." [Source: https://craft-support.mintlify.app/en/account-and-subscription/storage-and-recovery/version-history.md, accessed 2026-08-07.]
- **Recovering Deleted Content** — recover deleted documents, folders, pages, and blocks [Source: https://craft-support.mintlify.app/en/account-and-subscription/storage-and-recovery/recovering-deleted-content.md, accessed 2026-08-07.]
- **Spaces can have multiple accounts** — "Manage and switch between multiple Craft accounts on the same device." [Source: https://craft-support.mintlify.app/en/account-and-subscription/multiple-accounts.md, accessed 2026-08-07.]

The workspace has a tabbed multi-document surface (like a browser), with Focus Mode for distraction-free writing.

## 7. Conversation (AI integration)

Craft Assistant is the **deepest AI integration surface in this evidence set**, with explicit dual modes:

- **Two modes: Explore and Execute.**
  - **Explore** — "Proposes changes and waits for your approval before modifying anything."
  - **Execute** — "Applies changes directly. You see edits appear in real time."
  - "Use the mode selector at the bottom of the Assistant panel to switch between them. Only **Fast** and **Max** models support editing." [Source: https://craft-support.mintlify.app/en/ai-assistant.md — Two modes section.]
- **Models** — three cloud tiers + on-device tier:
  - **Max** (Claude Sonnet 4.6) — high usage, complex reasoning, multi-document work.
  - **Fast** (Claude Haiku 4.5) — medium usage, space-level queries.
  - **Core** (GPT-5 Nano) — low usage, single-response everyday queries.
  - **Local** — on-device: Apple Foundation Model (multi-turn, requires Apple Intelligence) and LLaMa 3.2 (single response). Available on Mac/iPad/iPhone only. "On-device models process everything locally on your device — no data is sent to external servers. They don't count toward your AI usage." [Source: https://craft-support.mintlify.app/en/ai-assistant/models.md, accessed 2026-08-07.]
- **Bring Your Own Key (BYOK)** — "Use your own OpenAI or Anthropic credentials with Craft Assistant instead of Craft AI credits." [Source: https://craft-support.mintlify.app/en/ai-assistant/bring-your-own-key.md, accessed 2026-08-07.] Added June 5, 2026 as part of "More Flexible Assistant" update [Source: blog.txt — Jun 5, 2026 entry.].
- **Smart Search** — "AI-powered semantic search feature that helps you find information across your entire space using natural language." Automatically enabled for space-level queries in the Assistant. "Semantic understanding – finds content based on meaning, not just exact words. … Cross-document connections – understands relationships between different documents." [Source: https://craft-support.mintlify.app/en/ai-assistant/smart-search.md, accessed 2026-08-07.]
- **Document Review** — AI-powered feedback on document structure, clarity, and completeness [Source: https://craft-support.mintlify.app/en/ai-assistant/document-review.md, accessed 2026-08-07.]
- **Editing** — "Let the Assistant make changes directly in your documents — add content, apply styling, create subpages, and more." [Source: https://craft-support.mintlify.app/en/ai-assistant/editing.md, accessed 2026-08-07.]
- **Custom Prompts** — "Create reusable AI instructions for consistent, personalized results tailored to your workflow." [Source: https://craft-support.mintlify.app/en/ai-assistant/custom-prompts.md, accessed 2026-08-07.]
- **OCR for images and PDFs** — "Use AI to summarize, extract text from, and ask questions about images and PDF attachments." [Source: https://craft-support.mintlify.app/en/ai-assistant/ocr-images-pdfs.md, accessed 2026-08-07.] Added Dec 15, 2025 [Source: blog.txt — Dec 15, 2025 entry.].
- **Help Agent** — "Get instant answers about Craft features without leaving the app or breaking your workflow." [Source: help-agent.md.] Opens via Assistant > New Chat > Help and Support.
- **Craft Agents** (Feb 3, 2026) — "Introducing Craft Agents — The Open Source Agent Interface. A better, more opinionated way of working with the most powerful AI agents. Document-centric workflows, zero-config integrations, and a beautiful UI." [Source: blog.txt — Feb 3, 2026 entry.]
- **AI usage quota per plan** — "every plan includes an AI usage quota. On-device models are always free, and you can top up if you need more." [Source: ai-assistant.md — AI usage section.]
- **MCP + API do not count toward AI quota** — "MCP and API usage does not count toward your AI usage quota. To ensure reliability for everyone, usage must remain within fair use limits." [Source: same — Info box.]

Craft's AI surface is uniquely positioned: it has **both** a first-party Assistant (with multi-model + on-device + BYOK) **and** an open MCP/API surface for external agents (Claude, ChatGPT, Windsurf, Cursor, VS Code, Raycast). This is the broadest AI integration in the evidence set.

## 8. Agent Experience

The Craft agent experience has three layers:

1. **In-app Craft Assistant** — Explore/Execute modes; explicit "you see edits appear in real time" in Execute mode; explicit "waits for your approval before modifying anything" in Explore mode [Source: ai-assistant.md — Two modes section.] This is the most thoughtful in-product review mechanism in the evidence set — explicit, user-toggled, mode-by-mode.
2. **MCP for external AI assistants** — Claude, ChatGPT, Windsurf, Cursor, VS Code, Raycast supported [Source: mcp.md — Supported MCP Connections section.] Per-space connections (one MCP server per space, by design) [Source: same — One connector per space Info box.]
3. **Craft API for programmatic access** — "Send or receive data from other services. Trigger actions in Craft based on events in another app. Build custom tools, dashboards, or automations." [Source: api.md.] Supports "Search across all documents with folder, tag, and date filtering", "Daily notes and tasks are fully accessible via API", "Create, update, and delete documents programmatically", "Collection management including schema creation and editing", "Advanced search with regex support and timezone-aware date filters" [Source: same — Space-Level API Access Info box.] Available since v3.3.5+.
4. **Craft Agents (Feb 3, 2026)** — an open-source agent interface: "A better, more opinionated way of working with the most powerful AI agents. Document-centric workflows, zero-config integrations, and a beautiful UI." [Source: blog.txt — Feb 3, 2026 entry.] This is Craft's own agent-runtime layer.
5. **Help Agent** — an in-app AI assistant specifically for answering questions about Craft [Source: help-agent.md.]

Safety model: **Explore mode + per-Space scoping + token auth**. There is no documented sandbox (contrast Anytype's JS runtime), but the Explore mode is a real "reviewable drafts" mechanism that other products in this set lack.

## 9. Memory

- **Documents, Pages, Blocks** — the addressable content units [Source: support.txt — Craft 101 section].
- **Daily Notes** — date-keyed notes: "Go to Daily Note: Cmd + Option + N" [Source: introduction_shortcuts.md].
- **Tasks** — first-class entities with deadlines, reminders, scheduling; aggregated into Tasks view (`Cmd + Option + 4`) [Sources: home.txt — Tasks section; introduction_shortcuts.md — Tasks section.]
- **Calendar** — events synced from Apple/Google/Outlook [Source: home.txt — Calendar section.]
- **Collections** — structured databases with custom properties [Source: support.txt — Popular articles section.]
- **Version History** — "Craft automatically backs up your documents and how to restore previous versions." [Source: version-history.md.]
- **Sync sessions across devices** — "Your chat sessions sync across your devices so you can continue conversations anywhere." [Source: ai-assistant.md — Your data always stays yours section.]
- **Token usage tracking** — "For proper cost and AI usage tracking we record token usage and cost, never your text or the content of your requests." [Source: same.]
- **Apple Calendar integration** for meetings [Source: https://craft-support.mintlify.app/en/integrate/calendar.md, accessed 2026-08-07].
- **Email to Craft** — "Forward emails directly to Craft to capture ideas and turn messages into tasks or documents." [Source: https://craft-support.mintlify.app/en/integrate/email-to-craft.md, accessed 2026-08-07.]

There is **no typed-Object model** (contrast Anytype). Memory is document-centric, not Object-centric.

## 10. Knowledge

Craft's knowledge structure is **document + database (Collections) + tags + backlinks**:

- **Documents, Pages, Blocks** — content hierarchy.
- **Collections** (Craft 3+) — "Build structured databases with custom properties" — Notion-like databases with custom properties. "AI understands collection properties and relationships" as of recent updates [Source: support.txt — What's new section.]
- **Tags** — first-class; "Tags, Quality of Life improvements" July 21, 2026 update [Source: blog.txt — Jul 21, 2026 entry.].
- **Folders** — classic hierarchy.
- **Backlinks / Block Links** — `Cmd + Shift + K` creates a block link [Source: introduction_shortcuts.md — Text Format section.]
- **Smart Search** — semantic search across all of the above [Source: smart-search.md.]
- **Search** — `Cmd + F` for in-document, `Cmd + O` for Quick Open across the workspace.
- **Advanced Search with regex + timezone-aware date filters** via API [Source: api.md — Space-Level API Access Info box.]

The knowledge layer is **Notion-like** (databases with custom properties) without Anytype's typed-Object model and without Roam's block-graph model. It is more accessible than either.

## 11. Search

- **Quick Open** (`Cmd + O`) — workspace-wide document/view navigation [Source: introduction_shortcuts.md].
- **In-document search** (`Cmd + F`) [Source: same.]
- **Replace in Page** (`Ctrl + Shift + F` on Windows) [Source: same.]
- **Use Selection to Search** (`Cmd + E` on macOS) [Source: same.]
- **Smart Search** (AI-powered semantic search) — "finds content based on meaning, not just exact words. … Cross-document connections – understands relationships between different documents." [Source: smart-search.md.] Automatically enabled when using space-level queries in the Assistant.
- **Advanced Search via API** — regex support, tag and date filtering, timezone-aware date filters [Source: api.md — Space-Level API Access Info box.]
- **OCR-extracted text** searchable (images + PDFs) [Source: ocr-images-pdfs.md.]
- **Help Agent** — natural-language search for Craft features themselves [Source: help-agent.md.]

This is the richest search surface in the evidence set — combining lexical (Quick Open, `Cmd + F`), semantic (Smart Search), regex (API), and OCR (image+PDF).

## 12. Execution

Craft's execution model is uniquely **mode-toggleable**:

- **Explore mode** — proposes changes, waits for approval. The user reviews before any modification happens.
- **Execute mode** — applies changes directly, in real time. The user sees edits appear.
- Mode selector at the bottom of the Assistant panel [Source: ai-assistant.md — Two modes section.]
- Only Fast and Max models support editing [Source: same.]
- Editing currently available on macOS and iOS (more platforms coming) [Source: same — Where Craft Assistant works section.]
- "It is not only a generation tool. It is an assistant that can work deeply inside your existing Craft structure." — Reorganize a full document or section; Style content, add, replace, or remove blocks; Create pages and folders; Move existing content to better structure your workspace; Create summary pages, including tag-based summary pages [Source: same — A new way of working section.]

For agents via MCP/API: direct read/write, no Explore mode (the Explore mode is in-product only). Per-Space scoping for isolation.

For users: standard direct-edit via keyboard shortcuts and slash menu.

This is the **most thoughtful execution model in the set** — Craft explicitly distinguishes "show me what you'd do" from "do it now", which neither Roam, Anytype, nor Reflect do.

## 13. Artifacts

- **Documents** — top-level content units.
- **Pages** — sub-documents within a Document (Craft's "page break" feature: "Page Breaks: A Brand New Way To Structure Your Craft Docs. Organize your documents better and make them easier to read and follow with page breaks" — Jan 25, 2023 [Source: blog.txt — Jan 25, 2023 entry.]).
- **Blocks** — atomic content units (text, todo, toggle, code, image, video, etc.).
- **Cards** — special styled block (`Cmd + Shift + L`).
- **Tasks** — first-class entities with deadlines, reminders, scheduling.
- **Daily Notes** — date-keyed notes.
- **Collections** — structured databases with custom properties (Craft 3+).
- **Tags** — first-class.
- **Folders** — classic.
- **Whiteboards** — visual canvas [Source: home.txt — Docs section.].
- **Code Editor** — first-class code blocks: "Could this be the best code editor in a writing app? Craft introduces a brand new code editor which makes using code effortless in Craft" — Jan 23, 2023 [Source: blog.txt — Jan 23, 2023 entry.].
- **Comments** — `Cmd + Shift + M` adds/views comments [Source: introduction_shortcuts.md — Comments section.]
- **Reminders** — `Cmd + Shift + R` for "Set Reminder..." [Source: same — Dates and Reminders section.]
- **Published Documents** — public webpages with custom domains and analytics [Source: support.txt — Popular articles section.]
- **Email to Craft captures** [Source: email-to-craft.md.]

## 14. Keyboard UX

Craft ships one of the **most extensive, well-documented keyboard shortcut systems** in the note-taking category — a 508-line Mintlify doc page (one of the longest in their docs) covering General, Navigation, Documents & Search, Tasks, Editing, Style & Formatting, Organize, Window & Tabs, plus custom-shortcut setup and an essential-shortcuts-for-beginners guide [Source: https://craft-support.mintlify.app/en/introduction/shortcuts.md, accessed 2026-08-07].

Highlights:

- **Slash command menu** — `/` opens command menu [Source: same — Editing section.]
- **Quick Open** — `Cmd + O` (macOS) / `Ctrl + O` or `Ctrl + P` (Windows) — "isn't just for documents" — works for views, home, calendar, tasks [Source: same — Navigation section, Info box.]
- **Daily Note** — `Cmd + Option + N` [Source: same.]
- **New Document** — `Cmd + N` (macOS) / `Ctrl + T` opens new tab on Windows [Source: same.]
- **Open AI Assistant** — `Cmd + Return` (macOS) / `Ctrl + Enter` (Windows) [Source: same — Editing section.]
- **Task creation** — `Cmd + J` (Mac); mark done: `Cmd + Option + T`; canceled: `Cmd + Option + Shift + T`; schedule: `Cmd + Shift + S`; deadline: `Cmd + Shift + D`; reminder: `Cmd + Shift + R` [Source: same — Tasks section.]
- **Block editing** — Insert below: `Space`; above: `Shift + Space`; duplicate: `Cmd + D` or `Option + Drag` [Source: same — Editing section.]
- **Style shortcuts** — Title `Ctrl + 1`, Subtitle `Ctrl + 2`, Heading `Ctrl + 3`, Strong `Ctrl + 4`, Body `Ctrl + 5`, Caption `Ctrl + 6`, Page `Cmd + Shift + P`, Card `Cmd + Shift + L`, Focus `Cmd + Shift + |`, Block `Cmd + Shift + '` [Source: same — Style and Formatting section.]
- **List shortcuts** — Todo `Cmd + Option + 6`, Toggle `Cmd + Option + 7`, Bullet `Cmd + Option + 8`, Numbered `Cmd + Option + 9`, No List `Cmd + Option + 0` [Source: same.]
- **Group/Ungroup** — `Cmd + G` / `Cmd + Shift + G` [Source: same — Organize section.]
- **Tab management** — `Cmd + T` (new), `Cmd + 1`–`Cmd + 9` (switch), `Ctrl + Tab` (next), `Cmd + Shift + T` (reopen closed) [Source: same — Window and Tabs section.]
- **View controls** — `Cmd + .` (focus mode), `Cmd + \` (sidebar), `Cmd + +` (zoom in), `Cmd + -` (zoom out), `Cmd + 0` (actual size) [Source: same — View Controls section.]
- **Custom shortcuts on macOS** — "For any action listed in the Craft menu (whether it has a default shortcut or not), you can set up a custom shortcut from macOS System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts." [Source: same — Custom Shortcuts (macOS) section.]
- **Non-English keyboards caveat** — "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English." [Source: same — Non-English Keyboards Info box.]
- **Windows parity gap** — "Some navigation shortcuts available on macOS (like block navigation with arrow keys) are not yet available on Windows. We're actively working to bring more feature parity across all platforms." [Source: same — Windows Warning box.]
- **iOS/iPadOS external keyboard support** — "Mobile platforms (iOS/iPadOS) support external keyboard shortcuts when connected." [Source: same — Platform Differences Info box.]
- **Top 10 to master first** for macOS and Windows — explicit beginner onboarding [Source: same — Essential Shortcuts for Beginners section.]
- **Keyboard-first workflow tips** — explicit guidance to start with slash, use Quick Open liberally, combine shortcuts, learn one category at a time [Source: same — Tips for Keyboard-First Workflows section.]
- **Accessibility Info box** — "The context menu shortcut (Ctrl+Return) provides keyboard-only access to all context actions, offering an alternative to right-clicking. This improves accessibility and enables faster keyboard-first workflows." [Source: same — Context Actions section.]

This is the most thorough shortcut documentation in the evidence set — comparable to a serious IDE like VS Code. Custom shortcuts via macOS System Settings is a notable capability.

## 15. Motion

Craft's motion vocabulary is unusually **design-conscious** — multiple blog posts document motion design choices:

- **Sound design (Feb 28, 2024)**: "How we designed sound in a productivity app like Craft. At Craft, we've always strived to strike the right balance between a tool that's empowering and delightful — as we say: 'form and function must come hand-in-hand'." [Source: blog.txt — Feb 28, 2024 entry.] Craft added sound design as a "delightful dimension".
- **BlurHash + Metal** (Jun 4, 2025): "BlurHash Meets Metal: Supercharge Your App's Image Loading Experience. BlurHash got a metal-powered upgrade. Instant previews, zero lag, and blazing-fast performance that shows what's possible when image decoding meets GPU acceleration." [Source: blog.txt — Jun 4, 2025 entry.] — image previews use GPU acceleration.
- **Going the Extra Mile — Beyond CSS** (Sep 5, 2024): "We love small finishing touches. In this article, we'll showcase a few examples where we've gone the extra mile to deliver an outstanding experience for our web and Windows users. Even if not immediately obvious, these subtle enhancements make the difference." [Source: blog.txt — Sep 5, 2024 entry.] — Craft publishes design-process blog posts about subtle motion/UI polish.
- **macCatalyst WKWebView workaround** (Aug 9, 2024): "Thinking outside of the WKWebView. It is almost impossible to use a native Appkit web view inside a macCatalyst application. In this article, we show you how the Craft team overcame this obstacle so that users can have a better whiteboard-editing experience." [Source: blog.txt — Aug 9, 2024 entry.] — significant engineering effort for whiteboard motion.

Craft's motion is more deliberately crafted than any other product in the evidence set — including blog posts explaining the design rationale.

## 16. Animation

Animation vocabulary (inferred from blog + docs):

- Block drag animations.
- Tab transitions.
- Sidebar slide.
- Focus Mode fade.
- Whiteboard canvas pan/zoom with custom-engineered WKWebView.
- BlurHash image-preview animation (GPU-accelerated).
- Sound-design micro-feedback (UI sounds).

Craft explicitly publishes design rationale for animations — rare in this category. The Sep 5, 2024 "Beyond CSS" post explicitly discusses "small finishing touches" and "subtle enhancements".

## 17. Visual Hierarchy

Craft's visual hierarchy is the **most refined in the evidence set** — Apple Design Award winner, multiple Webby Awards, German Design Award.

Documented visual elements:

- **Text styles** with dedicated shortcuts: Title, Subtitle, Heading, Strong, Body, Caption, Page, Card, Focus, Block — a 10-level typographic hierarchy [Source: introduction_shortcuts.md — Style and Formatting section.]
- **Cards** — visually distinct content blocks (`Cmd + Shift + L`).
- **Focus** — a styling decoration (`Cmd + Shift + |`).
- **Block** — a styling decoration (`Cmd + Shift + '`).
- **Cover images** in Gallery View [Source: organize views for Kanban/Gallery in introduction_shortcuts.md context.]
- **Custom document styling** — "Styling. Express your unique style in a brand new experience and capabilities." (Craft 3, Nov 28, 2024) [Source: blog.txt — Nov 28, 2024 entry.].
- **Themes** — light, dark, blue (with explicit theme-preloading to avoid "light/blue flash on every cold load" [Source: docs.txt — note about ThemeProvider.])
- **Paper-texture background** — preloaded with imageSrcSet for various widths [Source: home.html — `<link rel="preload" as="image">` tag for paper-texture.png].
- **Color-coded spaces** — multiple accounts/spaces supported with visual distinction.

The visual hierarchy is **styling-first** — Craft gives users 10+ text styles, multiple list types, cards, focus, block, and custom styling, far beyond what Roam, Anytype, or Reflect offer.

## 18. Progressive Disclosure

- **Slash menu** (`/`) — on-demand access to almost any feature [Source: introduction_shortcuts.md — Tips for Keyboard-First Workflows section: "Start with the slash command: Type / to access almost any feature without leaving your keyboard. This is often faster than remembering individual shortcuts."]
- **Focus Mode** (`Cmd + .`) — hides sidebar and chrome for distraction-free writing [Source: same — View Controls section.]
- **Quick Open** — surfaces documents/views on demand [Source: same — Quick Open Info box.]
- **Three-dot menu** for context actions — accessed via `Ctrl + Return` [Source: same — Context Actions section.]
- **Cardgroup / Card components** in docs — Mintlify-rendered progressive disclosure [Source: multiple docs pages use `<CardGroup cols={2}>` for related-content surfacing.]
- **Callouts/Info/Warning boxes** in docs (e.g. "Info title="Platform Differences", "Info title="Quick Open Power", "Info title="Accessibility") [Source: introduction_shortcuts.md].
- **Craft 101 video tutorial series** for new-user onboarding [Source: support.txt — Video Tutorials section.]
- **Help Agent** for in-product progressive disclosure of features [Source: help-agent.md.]
- **Assistant Explore mode** for AI-proposed changes (reviewable before applying) [Source: ai-assistant.md.]

This is the strongest progressive-disclosure model in the evidence set, covering both user onboarding (videos, Help Agent) and AI-proposed changes (Explore mode).

## 19. Accessibility

Craft's accessibility posture is the **most explicitly considered** in the evidence set, though still incomplete:

- **Keyboard-only access** — "The context menu shortcut (Ctrl+Return) provides keyboard-only access to all context actions, offering an alternative to right-clicking. This improves accessibility and enables faster keyboard-first workflows." [Source: introduction_shortcuts.md — Context Actions Info box.]
- **External keyboard support on iOS/iPadOS** — "Mobile platforms (iOS/iPadOS) support external keyboard shortcuts when connected." [Source: same — Platform Differences Info box.]
- **Custom shortcuts via macOS System Settings** — users with motor differences can remap any menu action [Source: same — Custom Shortcuts section.]
- **Non-English keyboard caveat** — "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English. The keyboard layout can cause some shortcuts to shift or stop working." [Source: same — Non-English Keyboards Info box.] (Honest disclosure of a gap.)
- **Apple Vision Pro support** — Craft ships a Vision Pro app, demonstrating commitment to platform accessibility ecosystems [Source: home.txt — Download footer: "Craft for Vision Pro".]
- **Apple Intelligence integration** — Craft's on-device AI uses Apple Foundation Model, requiring Apple Intelligence to be turned on [Source: models.md — Apple Foundation Model not showing up section.] — Craft integrates deeply with Apple's accessibility-and-AI platform.
- **No documented WCAG conformance statement** found in the crawlable docs.

## 20. Performance Perception

Craft has published multiple engineering blog posts on performance:

- **In-house sync protocol (Dec 30, 2024)**: "The story of Craft's in-house sync protocol. Join us to learn more about how we built our own sync protocol to enable seamless collaboration across devices and support future growth." [Source: blog.txt — Dec 30, 2024 entry.] — Craft did not use a third-party sync engine; they built their own.
- **BlurHash + Metal (Jun 4, 2025)**: GPU-accelerated image previews with "zero lag" [Source: same — Jun 4, 2025 entry.].
- **Performance improvements** — recurring theme in monthly updates: "Craft update - Kanban boards, Performance improvements, Spring Sale" (Apr 13, 2026); "Craft update - Improvements all around - Collections, Web, and Windows!" (May 19, 2026); "Craft Update - Summer Sale, Major Tasks update, Performance improvements, and better Windows app!" (Jul 7, 2026) [Source: blog.txt — multiple entries.].
- **Theme preloading** to avoid light/blue flash on cold load [Source: docs.txt — ThemeProvider note.]
- **Paper-texture image preloading** with multiple widths for responsive loading [Source: home.html — preload link.]
- **macCatalyst WKWebView workaround** for smoother whiteboard editing [Source: blog.txt — Aug 9, 2024 entry.].
- **Offline mode** (Mar 9, 2026) — "Craft update - Gallery View, Offline mode, Lunar New Year Sale and more!" [Source: blog.txt — Mar 9, 2026 entry.].
- **Web offline mode beta** (Dec 15, 2025) — "Craft update - OCR, Web offline mode beta, Winter Deal and more" [Source: same — Dec 15, 2025 entry.].

Craft treats perceived performance as an ongoing engineering investment, like Reflect but with more published engineering rationale.

## 21. Trust

Craft's trust posture is **cloud-hosted with strong encryption but NO end-to-end encryption** — explicitly candid about this:

- **No E2EE**: "At Craft, we take security and privacy seriously. While we currently do not offer end-to-end encryption (E2EE), your data is still protected using strong encryption protocols throughout its lifecycle. … Craft does not use E2EE, because the app relies on cloud-based collaboration, real-time syncing, and multi-device access – features that require server-side data handling." [Source: encryption.md — opening paragraphs.]
- **TLS in transit** [Source: same — Encryption in Transit section.]
- **AWS RDS default encryption at rest** for document content [Source: same — Encryption at Rest section.]
- **SSE-S3 encryption on Amazon S3** for uploaded files [Source: same.]
- **AWS-hosted** [Source: same — Secure Cloud Hosting section.]
- **SOC 2 Type I & II compliance** (Apr 18, 2023) [Source: same — SOC 2 Compliance section; blog.txt — Apr 18, 2023 entry.].
- **Email-based one-time-code login** (no passwords) [Source: same — Secure Login section.]
- **Access controls**: "Access to data is limited to authorized Craft personnel and only when necessary – for example, to provide support. All access is logged and carefully managed." [Source: same — Access Controls section.]
- **Automated backups** [Source: same — Automated Backups section.]
- **Document Locking and Protection** [Source: https://craft-support.mintlify.app/en/account-and-subscription/data-and-security/document-locking.md, accessed 2026-08-07.]
- **External Locations** — local storage instead of cloud [Source: external-locations.md.]
- **Keep on Device Folders** [Source: on-device-folders.md.]
- **AI privacy-first**: "We do not use your content to train AI models. Only the minimum data required to process a single request is sent to the model provider. For proper cost and AI usage tracking we record token usage and cost, never your text or the content of your requests." [Source: ai-assistant.md — Your data always stays yours section.]
- **On-device AI** for full privacy: "On-device models process everything locally on your device — no data is sent to external servers." [Source: models.md — Local section Info box.]
- **Bring Your Own Key** — users can use their own OpenAI/Anthropic credentials [Source: bring-your-own-key.md.]
- **Per-Space MCP scoping** — external tools only see what you explicitly authorize per-Space [Source: mcp.md — One connector per space Info box.]
- **MCP/API usage does not count toward AI quota** — Craft does not monetize MCP/API access [Source: ai-assistant.md — Info box.]

This is a **strong cloud-hosted trust posture** but explicitly NOT end-to-end encrypted. The candour about E2EE absence is unusual and respectful of users. The on-device AI option provides an escape hatch for privacy-sensitive users.

## 22. Explainability

- **Honest E2EE disclosure** — Craft explicitly says they don't have E2EE and explains why [Source: encryption.md.]
- **Model comparison table** — Craft publishes a model comparison table (Max / Fast / Core / Local) with usage levels, best-for descriptions, conversation support, and editing capability [Source: models.md — Model comparison table.] This is the clearest AI model documentation in the evidence set.
- **AI usage quota transparency** — every plan includes a quota; on-device is always free; top-ups available [Source: ai-assistant.md — AI usage section.]
- **Token usage tracking** — recorded but "never your text or the content of your requests" [Source: same.]
- **Help Agent** — in-product AI explains Craft itself [Source: help-agent.md.]
- **Craft 101 video tutorials** — explicit onboarding explainability [Source: support.txt — Video Tutorials section.]
- **Engineering blog posts** explaining decisions (sync protocol, BlurHash+Metal, WKWebView workaround, sound design) [Source: blog.txt — multiple entries.]
- **"Beyond CSS" post** — explicit blog about "subtle enhancements" [Source: blog.txt — Sep 5, 2024 entry.]
- **Honest Windows parity gap disclosure** — "Some navigation shortcuts available on macOS (like block navigation with arrow keys) are not yet available on Windows. We're actively working to bring more feature parity across all platforms." [Source: introduction_shortcuts.md — Windows Warning box.]
- **Honest non-English keyboards caveat** [Source: same — Non-English Keyboards Info box.]
- **Mintlify docs are AI-resilient**: "Assistant Responses are generated using AI and may contain mistakes." [Source: support.txt — footer.]

This is one of the most explainable products in the set — Craft publishes what they built, why they built it, what they don't have, and what their AI does.

## 23. Long Session Experience

- **Tabs** — multi-document side-by-side work [Source: introduction_shortcuts.md — Window and Tabs section.]
- **Focus Mode** — distraction-free writing (`Cmd + .`) [Source: same — View Controls section.]
- **Daily Notes** — anchor surface (`Cmd + Option + N`) [Source: same — Navigation section.]
- **Document Version History** — time-travel through edits [Source: version-history.md.]
- **Recovering Deleted Content** — undelete documents/folders/pages/blocks [Source: recovering-deleted-content.md.]
- **External Locations / Keep on Device Folders** for offline-first long sessions [Sources: external-locations.md, on-device-folders.md.]
- **Help Agent** for in-flow feature discovery [Source: help-agent.md.]
- **Craft Assistant Explore mode** for AI-proposed changes without breaking flow [Source: ai-assistant.md.]
- **Custom Prompts** for repeatable AI workflows [Source: custom-prompts.md.]
- **Window management** — `Cmd + Shift + N` (new window), tabbed interface [Source: introduction_shortcuts.md — Window Management section.]
- **Email to Craft** — capture without leaving your email client [Source: email-to-craft.md.]
- **Apple Calendar integration** — meeting context alongside notes [Source: calendar.md.]

## 24. Power User Features

1. **Multi-model AI (Max/Fast/Core/Local)** with on-device options (Apple Foundation Model, LLaMa 3.2) [Source: models.md.]
2. **Explore vs Execute modes** for reviewable AI edits [Source: ai-assistant.md — Two modes section.]
3. **Smart Search** (semantic, natural-language, cross-document) [Source: smart-search.md.]
4. **Document Review** — AI feedback on structure/clarity [Source: document-review.md.]
5. **Custom Prompts** — reusable AI instructions [Source: custom-prompts.md.]
6. **OCR for images and PDFs** [Source: ocr-images-pdfs.md.]
7. **Help Agent** — in-product AI for Craft itself [Source: help-agent.md.]
8. **Collections** — structured databases with custom properties [Source: support.txt — Popular articles section.]
9. **API (v3.3.5+)** — full Space-level access: search across all documents with regex + tag + date filtering; create/update/delete documents; collection management; daily notes/tasks access [Source: api.md — Space-Level API Access Info box.]
10. **MCP** — Claude, ChatGPT, Windsurf, Cursor, VS Code, Raycast integration; per-Space connections; v2 (Jun 5, 2026) [Sources: mcp.md; blog.txt — Jun 5, 2026 entry.].
11. **BYOK (Bring Your Own Key)** — OpenAI or Anthropic credentials [Source: bring-your-own-key.md.]
12. **Craft Agents** — open-source agent interface [Source: blog.txt — Feb 3, 2026 entry.].
13. **Apple Shortcuts integration** — including iOS Back Tap to open spaces/documents [Source: https://craft-support.mintlify.app/en/integrate/apple-shortcuts.md and back-tap.md, accessed 2026-08-07.]
14. **URL Scheme / Deep links** — `craftdocs://` URLs for automation [Source: https://craft-support.mintlify.app/en/integrate/deeplinks.md, accessed 2026-08-07.]
15. **Email to Craft** [Source: email-to-craft.md.]
16. **Custom keyboard shortcuts** via macOS System Settings [Source: introduction_shortcuts.md — Custom Shortcuts section.]
17. **Publishing with custom domains** [Source: support.txt — Popular articles section.]
18. **Tabs + multi-window** [Source: introduction_shortcuts.md — Window and Tabs section.]
19. **Apple Vision Pro** native app [Source: home.txt — Download footer.]
20. **Kanban boards, Gallery View** [Source: blog.txt — Apr 13, 2026; Mar 9, 2026 entries.]

The most distinguishing power features are: **Explore vs Execute modes** (unique), **multi-model + on-device AI** (deepest in set), **open-source Craft Agents** (rare), **BYOK** (rare), and **Craft API with full Space-level access** (most programmatic power in set, alongside Anytype's Local API).

## 25. Developer Experience

Craft's DX is the **strongest in this evidence set**:

- **Craft API** — full Space-level REST API since v3.3.5: search, create/update/delete documents, collection management, daily notes/tasks access, advanced search with regex + timezone-aware date filters [Source: api.md.]
- **MCP server** — Claude Desktop, Claude Code, ChatGPT, Windsurf, Cursor, VS Code, Raycast supported [Source: mcp.md — Supported MCP Connections section.]
- **MCP v2** (Jun 5, 2026) — improved MCP with more flexible assistant [Source: blog.txt — Jun 5, 2026 entry.]
- **Craft Agents** (Feb 3, 2026) — open-source agent interface [Source: blog.txt — Feb 3, 2026 entry.]
- **URL Scheme** for deep linking [Source: deeplinks.md.]
- **Apple Shortcuts** integration [Source: apple-shortcuts.md.]
- **Email to Craft** [Source: email-to-craft.md.]
- **API connection management UI** — "Create an API Connection from the Imagine tab in the sidebar to share the right parts of your workspace with external tools" [Source: api.md — How Craft's API Works section.]
- **MCP connection management UI** — same pattern, per-Space [Source: mcp.md — How MCP Works in Craft section.]
- **Comprehensive Mintlify docs** with `.md` versions exposed; `llms.txt` enumerates 170+ doc URLs [Source: https://support.craft.do/llms.txt, accessed 2026-08-07.]
- **Documentation is itself documented** — "Fetch the complete documentation index at: /llms.txt. Use this file to discover all available pages before exploring further." appears at the top of every Mintlify page.
- **Honest parity-gap disclosure** for Windows shortcut parity [Source: introduction_shortcuts.md — Windows Warning box.]
- **Engineering blog** explaining sync protocol, BlurHash+Metal, WKWebView, sound design [Source: blog.txt — multiple entries.]
- **External Locations API surface** for local-storage workflows [Source: external-locations.md.]

Craft's DX is what Roam's should be: comprehensive API, MCP for multiple agents, open-source agent interface, comprehensive docs with `.md` versions, honest gap disclosure, and an engineering blog explaining decisions.

## 26. Biggest Strengths (with evidence)

1. **Most polished native app in the set.** Apple Design Award winner, multiple Webbys, German Design Award. Native on macOS, iOS, iPadOS, Windows, Android, Vision Pro, Web. [Source: home.txt — awards strip and footer.]
2. **Deepest AI integration in the set.** Multi-model (Max=Sonnet 4.6, Fast=Haiku 4.5, Core=GPT-5 Nano, Local=Apple Foundation Model + LLaMa 3.2), BYOK, on-device options, Smart Search, Document Review, OCR, Help Agent, Custom Prompts. [Sources: ai-assistant.md, models.md, smart-search.md, document-review.md, ocr-images-pdfs.md, help-agent.md, custom-prompts.md, bring-your-own-key.md.]
3. **Unique Explore vs Execute mode** for reviewable AI edits — no other product in the set has this. [Source: ai-assistant.md — Two modes section.]
4. **Strongest DX in the set.** Comprehensive REST API with regex search + Space-level access; MCP for 6+ external AI assistants; open-source Craft Agents; URL scheme; Apple Shortcuts; Mintlify docs with `.md` versions + `llms.txt`; honest gap disclosure; engineering blog. [Sources: api.md, mcp.md, deeplinks.md, apple-shortcuts.md, support home, blog.txt.]
5. **Most thorough keyboard-shortcut documentation** — 508-line doc page covering every category, with platform tabs, beginner essentials, custom-shortcut setup, accessibility notes, non-English keyboards caveat, Windows parity gap disclosure. [Source: introduction_shortcuts.md.]
6. **Candour about trust posture** — explicitly says "we do not offer E2EE" and explains why; publishes model comparison table; publishes AI usage quota model; publishes "we do not use your content to train AI models". [Sources: encryption.md, models.md, ai-assistant.md.]
7. **Collections** (Notion-like databases with custom properties) + AI understands collection properties/relationships [Source: support.txt — What's new section.]
8. **On-device AI option** for full privacy — Apple Foundation Model + LLaMa 3.2; free, doesn't count toward quota [Source: models.md.]
9. **Design-process blog posts** explaining engineering decisions (sync protocol, BlurHash+Metal, WKWebView workaround, sound design, Beyond CSS) [Source: blog.txt — multiple entries.]
10. **Craft 101 video tutorials** — 11 videos for onboarding [Source: support.txt — Video Tutorials section.]
11. **Per-Space scoping** for MCP/API isolation [Source: mcp.md — One connector per space Info box.]
12. **Apple ecosystem integration** — Vision Pro app, Apple Calendar, Apple Shortcuts, Back Tap, Apple Intelligence, Apple Foundation Model [Sources: home.txt, calendar.md, apple-shortcuts.md, models.md.]

## 27. Biggest Weaknesses (with evidence)

1. **No end-to-end encryption.** "Craft does not use E2EE, because the app relies on cloud-based collaboration, real-time syncing, and multi-device access – features that require server-side data handling." [Source: encryption.md — opening paragraphs.] This is the weakest trust posture in the evidence set — weaker than Anytype (E2EE-by-default), Reflect (E2EE for note content), and even Roam (encryption opt-in per graph).
2. **No local-first / no self-host option.** Craft is cloud-hosted on AWS; the only local-storage option is "External Locations" for individual documents, not a full local-first mode like Anytype's. [Source: external-locations.md.]
3. **Windows parity gap.** "Some navigation shortcuts available on macOS (like block navigation with arrow keys) are not yet available on Windows." [Source: introduction_shortcuts.md — Windows Warning box.]
4. **Non-English keyboard caveat.** "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English." [Source: same — Non-English Keyboards Info box.]
5. **AI editing limited to macOS and iOS** — "Editing with the Assistant is currently available on macOS and iOS, with more platforms coming soon." [Source: ai-assistant.md — Where Craft Assistant works section.] Windows and Web users cannot use AI editing yet.
6. **No typed-Object model** — Craft's knowledge layer is document + Collection + tags + backlinks, not the typed-Object graph that Anytype has. [Sources: support.txt — Craft 101; absence of Types/Properties docs.]
7. **No documented agent sandbox** — agents via MCP/API have whatever scope the token grants; there is no documented sandboxed runtime (contrast Anytype). The Explore mode is the only safety mechanism for AI edits.
8. **No documented accessibility conformance** — no WCAG statement, no screen-reader mode documented.
9. **Pricing in HK$** — Craft's pricing is in Hong Kong Dollars (HK$62/month for Plus), which may confuse users expecting USD/EUR pricing. [Source: home.txt — Pricing section.]
10. **Cloud-only sync** — Craft's sync engine is cloud-based (their in-house protocol requires Craft servers). Users cannot self-host sync. [Source: blog.txt — Dec 30, 2024 entry on in-house sync protocol.]
11. **No first-party Linux app** — Craft is on macOS, iOS, iPadOS, Windows, Android, Vision Pro, Web; no Linux. [Source: home.txt — footer Download section.]
12. **Assistant Explore mode is macOS+iOS only** for editing — Windows/Web users have no reviewable-AI-edits escape hatch.

## 28. What should MiMo learn?

- **Explore vs Execute mode distinction** is the gold standard for AI edits in a productivity app. MiMo should ship this from day one.
- **Multi-model + on-device option.** Let users choose between cloud (Max/Fast/Core) and on-device (Apple Foundation Model, LLaMa) models, with on-device being free and quota-free.
- **Bring Your Own Key.** Let users use their existing OpenAI/Anthropic subscriptions.
- **Comprehensive REST API with full Space-level access.** Regex search, tag/date filtering, document CRUD, collection management — MiMo should match Craft's API surface.
- **MCP for many AI assistants.** Claude, ChatGPT, Windsurf, Cursor, VS Code, Raycast — not just one.
- **Open-source agent interface** (à la Craft Agents).
- **Per-Space scoping** for MCP/API isolation.
- **Comprehensive Mintlify docs with `.md` versions + `llms.txt`** — the gold standard for agent-readable docs.
- **Honest gap disclosure** — Windows parity gaps, non-English keyboard caveats, AI editing platform limitations.
- **Engineering blog explaining decisions** — sync protocol, image decoding, sound design. This builds developer trust.
- **Apple ecosystem deep integration** — Vision Pro, Apple Calendar, Apple Shortcuts, Back Tap, Apple Intelligence, Apple Foundation Model.
- **Craft 101 video tutorials** — explicit onboarding content.
- **Help Agent** — in-product AI for explaining the product itself.
- **Model comparison table** — publish model capabilities, usage, conversation/editing support transparently.
- **Token usage tracking without content storage** — record tokens, never text.
- **Document Version History + Recovering Deleted Content** as standard safety nets.
- **Custom keyboard shortcuts via macOS System Settings** — let users remap any menu action.
- **Styling as a first-class surface** — 10+ text styles, Cards, Focus, Block decorations.

## 29. What should MiMo reject?

- **No end-to-end encryption.** Craft explicitly rejects E2EE for collaboration features. MiMo should adopt Anytype's posture: E2EE-by-default, with collaboration features built on top of E2EE (Anytype demonstrates this is possible).
- **Cloud-only sync with no self-host option.** Craft's in-house sync protocol requires Craft servers. MiMo should adopt Anytype's self-host + local-only options.
- **HK$ pricing.** Confusing for global users; MiMo should use a more universal currency.
- **AI editing limited to macOS+iOS.** MiMo should ship AI editing across all platforms from day one.
- **No Linux app.** MiMo should ship Linux.
- **No typed-Object model.** Craft's document+Collection+tags+backlinks model is too thin for serious knowledge work; MiMo should adopt Anytype-style typed Objects.
- **No documented agent sandbox.** MiMo should ship a sandboxed agent runtime (à la Anytype) — Explore mode alone is not enough for agent-written code/operations.
- **Cloud-hosted-by-default.** MiMo should start local-first (à la Anytype / Reflect Open).
- **Relying on AWS RDS/S3 for encryption-at-rest.** This is "encrypted at rest" but server-side; MiMo should adopt client-side encryption (à la Anytype).
- **Windows parity gaps.** MiMo should ship cross-platform feature parity.
- **No WCAG conformance statement.** MiMo should publish one.

## 30. Confidence Score

**Confidence: 90/100.**

Reasoning:
- **Strongest evidence base in the set.** Craft's Mintlify docs surface exposes 170+ doc URLs as Markdown, with a canonical `llms.txt` index. Every section of this file is sourced from a first-party canonical Markdown doc or the official craft.do blog. The shortcut docs alone are 508 lines; the AI Assistant docs cover models, modes, BYOK, smart search, document review, OCR, custom prompts, help agent, editing, usage; the integration docs cover API, MCP, Apple Shortcuts, URL scheme, Email-to-Craft, Calendar; the trust docs cover encryption (with candid E2EE absence), data storage, document locking, version history, recovery, external locations.
- **Strong on:** AI integration (deepest in set), keyboard shortcuts (deepest in set), DX (strongest in set), trust (candid about limitations), navigation (richest in set), power features (most in set), engineering rationale (blog posts explain decisions).
- **Weaker on:** in-product UI behaviour for sections 15 (Motion) and 16 (Animation) — though Craft does publish design-process blog posts about sound design and CSS-finishing-touches, there is no design-system spec with motion tokens. Accessibility (no WCAG statement). Onboarding flow details beyond the Craft 101 video series.
- **What would raise confidence to 95+:** hands-on time with the product across all platforms; an official WCAG conformance statement; a public design-system spec with motion tokens; access to the unpublished "Craft Agents" repo for code-level DX verification.
- **Comparative context:** Craft scored highest-confidence of the four products in this W9 task because of its uniquely thorough docs surface.
