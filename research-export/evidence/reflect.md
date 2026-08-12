# Reflect — Evidence File (W9)

**Task:** W9 — Phase R2 Evidence-Based. Collected by general-purpose sub agent.
**Date accessed (all sources):** 2026-08-07.
**Method:** Direct curl of official pages at `reflect.app/` (home, blog, changelog) and Reflect blog post detail pages (including the Jul 14, 2026 "Reflect Open" announcement). The legacy `notes.reflect.app` subdomain is unreachable (DNS fail) — Reflect's canonical docs surface is the in-app "Academy" (`reflect.academy`), which is video-first and not crawlable as text; this file therefore relies on the marketing site + blog + changelog for product-feature evidence.

> ⚠️ **Important methodology note.** Reflect does not ship a public, crawlable docs site (no `docs.reflect.app` — that path returns 404). The product's "Academy" (`reflect.academy`) is video-first. The richest canonical crawlable text sources for Reflect are: (a) the marketing home page (10K chars of stripped text), (b) the public changelog (28K chars covering every feature shipped since launch), and (c) Reflect's blog post detail pages. These three sources collectively give an unusually complete picture of Reflect's feature evolution. In-product UI behaviour (empty states, onboarding tour, animation, accessibility) is *not* sourceable from public Reflect URLs and is explicitly flagged where claimed.

---

## 1. Product Overview

Reflect is "a beautifully minimalist note-taking app designed to mirror the way you think. Now with a native AI integration." [Source: https://reflect.app/, accessed 2026-08-07 — `<meta name="description">` of the SPA shell, cached at `raw-reflect/home.html`].

Reflect is built by "Reflect App, LLC" — an "indie team dotted across the globe. Our mission is to improve the way people think by making a jolly good note-taking app." [Source: same — About section in stripped home text, cached at `raw-reflect/home.txt`.]

Pricing: "$10 /month (billed annually)" — single plan, single price. "We like keeping things simple. One plan one price." [Source: same — Pricing section.] 14-day free trial [Source: same — "Start your 14-day trial".]

On July 14, 2026, Reflect announced **Reflect Open** — "a local-first, open-source app built on plain Markdown files. The beta is available today." This is a ground-up rebuild distinct from the existing Reflect app: "Reflect Open is a new app, not an update to the existing one. … The existing Reflect app is staying." [Source: https://reflect.app/blog/reflect-open, accessed 2026-08-07 — stripped text cached at `raw-reflect/blog-reflect-open.txt`.]

This evidence file covers **both** the existing Reflect app (the majority of sections) and Reflect Open (where it differs significantly).

## 2. Product Philosophy

Reflect's philosophy is **"Think better with Reflect"** — described in the marketing copy as building "a second brain that you can reference anytime." [Source: https://reflect.app/, accessed 2026-08-07 — stripped home text.]

The product is built around four philosophical commitments visible in the marketing + changelog:

1. **Mirror the way your mind works** via backlinks: "Mirror the way your mind works by associating notes through backlinks. Reflect builds you a second brain that you can reference anytime." [Source: same.]
2. **Frictionless capture**: "Record your ideas and to-do's easily, so you never miss a thing." [Source: same.]
3. **Privacy through E2EE**: "End-to-end encryption. Only you can access your notes." [Source: same.] The changelog confirms: "The contents of your notes are end-to-end encrypted. No one else can read them (not even us)." [Source: https://reflect.app/changelog, accessed 2026-08-07 — stripped text cached at `raw-reflect/changelog.txt`.]
4. **Minimalism and speed**: "Our goal with the editor is to make it fast and invisible. Its power should blend into the background. If we do our job right you should enter a state of flow while using it." [Source: changelog.txt — Reflect 2 section.]

With Reflect Open, the philosophy explicitly evolves to **"local-first, open-source, AI-native, plain Markdown files"**: "your graph is simply a folder of markdown files. … There is no Reflect account or Reflect-hosted notes database. We don't run product analytics." [Source: reflect-open.txt — "Your notes are the database" section.]

## 3. Core Mental Model

The Reflect mental model is the **backlinked daily note**:

- **Daily notes are the canonical landing surface.** Every day is a page; the app opens to today's daily note ("When you open the mobile app, it will take you right to your Daily Note for that day" [Source: changelog.txt — "New mobile app design" section]).
- **Notes are bullets with backlinks.** Backlinks create the graph: "Backlink your notes to make everything easily searchable." [Source: home.txt.]
- **Tags are first-class** ("Readwise tags now come in as backlinks" [Source: changelog.txt — "What else is new in May?" section.]) — tags function as page references, like Roam.
- **Brain view** visualizes the graph: "Our Brain tab is both a fun way to visualize all your notes and a useful way of explaining 'what the hell is a graph database is and why are you spending so much time on it' to your partner." [Source: changelog.txt — Reflect 2 section.]
- **AI as intellectual thought partner**: "Reflect uses GPT-4 and Whisper from OpenAI to improve your writing, organize your thoughts, and act as your intellectual thought partner." [Source: home.txt — AI section.]

The model is Roam-like (daily notes + backlinks + tags-as-pages) with AI integrated at the editor level rather than as a separate chat surface. It is simpler than Anytype's typed-Object model and less block-atomic than Roam.

In Reflect Open the model simplifies further: "your graph is simply a folder of markdown files: Daily notes are Markdown files under `daily/`. Other notes are Markdown files under `notes/`. Images and attachments are ordinary files under `assets/`." [Source: reflect-open.txt — "Your notes are the database" section.]

## 4. User Journey

1. **Sign up → 14-day trial** ("Start your 14-day trial" [Source: home.txt.])
2. **Receive a recovery kit** automatically on signup: "Reflect also now has recovery kits automatically download upon signup – making encryption much less scary. If you've already signed up, you can download your own recovery kit in your graph settings." [Source: changelog.txt — "Whisper on mobile and password recovery kits" section.]
3. **Land on today's daily note** — the default surface ("When you open the mobile app, it will take you right to your Daily Note for that day" [Source: changelog.txt — "New mobile app design" section.]).
4. **Capture as bullets** with backlinks (`[[Note]]`), tags (`#tag`), and tasks (`- [ ]`).
5. **Pull up the AI palette** with `cmd + j` (Mac) / `ctrl + j` (Windows) — "Pull up the AI palette at anytime by pressing 'cmd j' (or 'control j' on Windows). You can also edit existing text by highlighting it and using the same keyboard shortcut, or selecting the magic wand in the text-selection menu." [Source: changelog.txt — "Reflect AI integration" section.]
6. **Voice capture** via Whisper transcription — tap the microphone icon to record a message that gets transcribed and appended to today's daily note [Source: changelog.txt — "Enhanced search and Whisper integration" section.]
7. **Connect integrations** — Readwise (Kindle/article highlights), Chrome extension (web clips), Google Calendar / Outlook (meetings), Zapier [Source: home.txt — Integrations section.]
8. **Search and "chat with your notes"** — `Cmd + K` opens search; AI Chat lets you ask questions across your notes [Source: changelog.txt — "Advanced Search and AI Chat" section.]
9. **(New, Reflect Open)** — install the Mac app, optionally connect iPhone via iCloud Drive, add your own OpenAI/Anthropic/Google/OpenRouter API key [Source: reflect-open.txt — "How does AI work?" FAQ section.]

There is no documented onboarding tour or empty-state scaffolding in any crawlable Reflect source.

## 5. Navigation

- **Daily Notes** — the default landing surface, calendar-keyed. "A cleaner Daily Notes page that clearly shows what day you're on." [Source: changelog.txt — "New mobile app design" section.]
- **Back/Forward buttons** — added across desktop, web, and iPad: "Added forward and back buttons on the desktop, web and iPad apps." [Source: changelog.txt — "Other updates and improvements" section.]
- **Split-pane view** — edit/view two notes at once: "you can now edit and view two notes at the same time. To activate split-pane, try clicking a backlink while holding down the command key (or control if you're on Windows). … Highlight a backlink (using the arrow keys) and then press command+enter." [Source: changelog.txt — "Split pane view" section.]
- **Search palette** — `Cmd + K`: "Give it a whirl with cmd+k" [Source: changelog.txt — "Enhanced search" section.]
- **Brain view** — graph visualization, color-coded by tag, with filters [Source: changelog.txt — Reflect 2 "Brainier Brain" section.]
- **Sidebar with sections** — "Simplified side-bars with more descriptive labels" [Source: changelog.txt — "Re-design of web and desktop apps" section.]
- **Random note**: "We have added 'Go to a random note' to the cmd+k search menu." [Source: changelog.txt — "Tasks and more!" section.] (A delightful serendipity feature.)
- **Deep links** (mobile): "deep links, which allow you to open specific pages or notes within Reflect, directly from external applications." [Source: changelog.txt — "Encrypted assets, lock screen activity, deep-links and more" section.]
- **Keyboard shortcut to copy URL**: `⌥ ⌘ L` (option + cmd + L) — "Copy the link to any note you are on by using the keyboard shortcut ⌥ ⌘ (option + cmd + L)." [Source: changelog.txt — "Custom prompt editor and more" section.]

There is no documented "home" or "dashboard" page — the daily note is the home.

## 6. Workspace

The Reflect workspace is a **graph** (one graph per user account by default; multiple graphs supported: "For those of you who like creating multiple graphs we have added a little color setting so you can easily see which area you're in." [Source: changelog.txt — Reflect 2 — Design facelift section.]).

In the existing app:
- Graph settings are at `Settings → Graph` (where the Local API tokens, export options, and recovery kit live).
- The workspace surface is: left sidebar (sections: Daily Notes, Notes, Tasks, Brain) + main content pane + (when active) the AI palette + incoming backlinks panel beneath each note.
- Sync engine: YJS — "we have rewritten our sync engine to use YJS, the gold-standard in the space. What this means in practice is that your offline changes will be merged in a more intelligent manner." [Source: changelog.txt — Reflect 2 — History browser and sync section.]
- History browser: "This is like a time-machine for your notes. You can view all of your changes to a note and revert to any point in time." [Source: same.]

In Reflect Open:
- The workspace is **a folder of Markdown files**: "your graph is simply a folder of markdown files" [Source: reflect-open.txt.]
- Sync via iCloud Drive or GitHub: "Use iCloud for straightforward Mac-to-iPhone sync, or connect GitHub for versioned backup and sync through a repository you own." [Source: same — What's in the Mac beta section.]
- No Reflect account: "There is no Reflect account or Reflect-hosted notes database. We don't run product analytics." [Source: same.]

## 7. Conversation (AI integration)

Reflect has the **deepest first-party AI integration** of any product in this evidence set:

- **AI Palette** — `Cmd + J` opens a prompt palette; pre-built prompts ("Transcribe voice notes with human-level accuracy. Generate article outlines from your scattered thoughts. List key takeaways and action items from your meeting notes. Fix grammar, spelling, and improve your writing. Save your own custom prompts.") [Source: home.txt — AI section.]
- **GPT-4 (now GPT-4o, Sonnet 3.7, Gemini)** — Reflect has cycled through models: GPT-3.5 → GPT-4 → GPT-4o → Claude Sonnet 3.7 → Gemini (for chat with notes, citing 2M token context). [Sources: changelog.txt — "GPT-4o added", "Massive speed bump, Sonnet 3.7", "In-line transcriber and Gemini for AI chat" sections.]
- **Custom prompts** — "you can view the prompts our team has pre-built. You can then clone, edit and save your own custom prompts to quickly call up in the future." [Source: changelog.txt — "GPT-4 + custom AI prompts" section.] Plus a dedicated "Prompt Templates" preferences tab as of July 2025: "Inside your preferences, we've added a new tab for Prompt Templates. From here you can create, copy, edit and delete any of your custom AI prompt templates." [Source: changelog.txt — "Custom prompt editor and more" section.]
- **AI chat with notes** — "you can now 'chat' with your search results using GPT-4. This is convenient for quickly summarizing a collection of notes, or for example, reflecting on what you've written the last week." [Source: changelog.txt — "Advanced Search and AI Chat" section.] On mobile since "AI on mobile" update: "you can access Reflect's AI palette editor through our mobile iPhone app. … Tap on the ✨ icon in the menu, Select the prompt you'd like to run." [Source: changelog.txt — "AI on mobile, iCal integration" section.]
- **AI-generated backlinks** — "Add backlinks using AI: Highlight a selection of text within a note, or highlight the entire note by using cmd + a. Pull up the AI palette editor using cmd + j or by clicking on the magic stars icon in the editor menu. Select the prompt titled 'Decorate my writing with backlinks'. Replace the text, and your backlinks will be added!" [Source: changelog.txt — "Add backlinks using AI" section.]
- **Similar notes** — "client-side embedding to build up a semantic index of your notes. By every note, you'll see 'similar notes' that have semantically similar content." [Source: changelog.txt — "Advanced Search and AI Chat" section.]
- **AI summaries for saved links** (Sep 23, 2025): "When you save a link, whether through the Chrome extension or from your phone, Reflect will automatically generate a short AI summary of the page." Summaries feed into semantic search. [Source: changelog.txt — "🔗 AI link summaries" section.]
- **In-line voice transcriber** — "press the Option key twice or Option + Space and start speaking. … The transcription will happen in real-time as you speak." [Source: changelog.txt — "In-line transcriber and Gemini for AI chat" section.]
- **OCR for images and PDFs** — "the text contained in images and PDFs now shows up in the search results." [Source: changelog.txt — "Image and PDF OCR Text" section.]
- **MCP server** (Mar 10, 2026): "Reflect notes now has an MCP server to access and search your notes directly from within Claude and Codex." Plus an expanded April 2026 update: "We've expanded MCP functionality to let you edit your notes through these coding agents as well." [Sources: https://reflect.app/blog/mcp-support-for-coding-agents, accessed 2026-08-07 — stripped text cached at `raw-reflect/blog-mcp-support-for-coding-agents.txt`; and https://reflect.app/blog/edit-notes-with-coding-agents, accessed 2026-08-07 — stripped text cached at `raw-reflect/blog-edit-notes-with-coding-agents.txt`.]
- **Reflect Open AI** — bring your own key: "AI uses your own OpenAI, Anthropic, Google, or OpenRouter key. Transcription uses your chosen provider. … Notes marked private are blocked from being sent to AI or other services that read note content." [Source: reflect-open.txt — "Your notes are the database" section.]

This is a **multi-model, multi-modal** AI surface (text, voice, image, PDF, code) — broader than any other product in this evidence set.

## 8. Agent Experience

- **MCP server** — coding agents (Claude, Codex) can read and edit notes directly: "your coding agent will be able to access and retrieve any information in your notes." [Source: blog-mcp-support-for-coding-agents.txt.] Since April 2026, also write: "We've expanded MCP functionality to let you edit your notes through these coding agents as well. This new functionality unlocks a ton of new workflows if you use coding agents." [Source: blog-edit-notes-with-coding-agents.txt.]
- **Reflect API** — public, append-focused: "We've publicly released our API, which supports appending data to your notes, returning a list of the links you've bookmarked, and a few other things." Also supports "Creating tasks through the API (use +)." [Sources: changelog.txt — "Reflect API" and "Tasks update and custom protocols" sections.] Setup info lives on Reflect Academy: "You can find information on how to access the API, the available endpoints and more on our Academy Page." [Source: same.]
- **Reflect Open CLI**: "A command-line interface. Commands such as `reflect today`, `reflect search`, and `reflect show` let scripts and agents read your notes without scraping the app." [Source: reflect-open.txt — What's in the Mac beta section.]
- **Custom protocols** — Reflect registers custom URL schemes (e.g. `things://`) and supports deep-linking in/out [Source: changelog.txt — "Tasks update and custom protocols" section.]
- **Zapier** integration — "Zapier append-to-daily-note API" for no-code automation [Source: changelog.txt — "Happy New Year!🎆 New API endpoints, speed and Whisper improvements" section.]
- **No documented agent-skill / sandbox model** — Reflect does not ship an equivalent to Anytype's sandboxed JS runtime. Agents access notes via MCP/API with whatever scope the API token grants; there is no documented in-product review mechanism for agent writes.

This is a less safety-thoughtful agent surface than Anytype's but more accessible to non-technical users (Zapier, Academy video walkthroughs, MCP setup guide that you can "download and upload into your preferred coding agent and it will walk you through the setup" [Source: blog-mcp-support-for-coding-agents.txt]).

## 9. Memory

- **Daily notes** — the temporal memory layer; default landing surface; auto-keyed by date.
- **Backlinks** — computed from `[[Note]]` references; surfaced as "incoming backlinks" beneath each note: "You can now check/uncheck to-do boxes from the incoming backlinks section at the bottom of a note." [Source: changelog.txt — "AI and usability improvements" section.]
- **Tags as pages** — `#tag` functions as a backlink; tags are pages.
- **Brain view** — graph visualization of the note graph [Source: changelog.txt — Reflect 2 — "Brainier Brain" section.]
- **History Browser** — full per-note revision history, revert to any point [Source: changelog.txt — Reflect 2 — "History browser and sync" section.]
- **YJS-based sync** — offline changes merge intelligently [Source: same.]
- **Semantic index (client-side embeddings)** — for "similar notes" feature [Source: changelog.txt — "Advanced Search and AI Chat" section.]
- **Encrypted assets** (as of "Encrypted assets, lock screen activity" update): "Assets you save to Reflect are now end-to-end encrypted. That means any image or file you add to a note can only be decrypted and viewed by you." [Source: changelog.txt — same section.]
- **Audio memos** with Whisper transcription appended to daily note [Source: changelog.txt — "Enhanced search and Whisper integration" section.]
- **Meeting context** — calendar-imported meetings attached to daily notes [Source: home.txt — Meetings section.]
- **Readwise integration** — highlights synced in as backlinks [Source: changelog.txt — "Readwise Integration" section.]

In Reflect Open: "Your graph is simply a folder of markdown files" + Reflect maintains "a local search index, but that index can always be rebuilt from the files." [Source: reflect-open.txt.]

## 10. Knowledge

- **Notes** — atomic markdown-ish pages.
- **Backlinks** — bidirectional page references.
- **Tags** — page-like references.
- **Tasks** — `- [ ]` checkboxes aggregated into a Tasks view: "Our tasks manager is designed to be a simple aggregation of the tasks across your notes. You can create new tasks, check-off completed ones, and schedule tasks for the future." [Source: changelog.txt — "Tasks added to iPhone app" section.]
- **Meetings** — calendar events pulled into daily notes.
- **Web snippets / Kindle highlights** — collected via Chrome extension + Readwise.
- **AI summaries** — auto-generated for saved links [Source: changelog.txt — "🔗 AI link summaries" section.]
- **OCR-extracted text** — from images and PDFs, indexed for search [Source: changelog.txt — "Image and PDF OCR Text" section.]
- **Similar notes** — semantic-graph edges computed client-side via embeddings [Source: changelog.txt — "Advanced Search and AI Chat" section.]

There is **no typed-Object model** (contrast Anytype) and **no block-level UID reference semantics** (contrast Roam). The knowledge layer is "notes + backlinks + tags + tasks" — Roam-light.

## 11. Search

- **`Cmd + K` search palette** — the primary entry point [Source: changelog.txt — "Enhanced search" section.]
- **Prefix and fuzzy matching** — "Not only did we speed things up, but we added both prefix and fuzzy matching." [Source: same.]
- **Advanced Search (desktop, Aug 2024; mobile, Aug 2025)** — filter by: "Pinned notes / Published notes / Tags / Linked To/By / Created at / Updated at / Daily Notes." [Source: changelog.txt — "Advanced Search on Mobile" section.]
- **Semantic search / Similar notes** — client-side embeddings [Source: changelog.txt — "Advanced Search and AI Chat" section.]
- **AI Chat with search results** — chat with a filtered set of notes [Source: same.]
- **AI summaries for saved links** feed into search: "summaries give Reflect's semantic search engine more context so the right link shows up when you search for it." [Source: changelog.txt — "🔗 AI link summaries" section.]
- **SQLite-backed search (rewrite)** — "rewriting the entire frontend codebase to be powered by SQLite" delivered a "massive speed bump" and persistent search results [Source: changelog.txt — "Massive speed bump, Sonnet 3.7, and PDF preview" section.]
- **Random note** in the search menu [Source: changelog.txt — "Tasks and more!" section.]

In Reflect Open: "Local search. Search note titles, contents, tags, and backlinks. Optional semantic search runs on your Mac." [Source: reflect-open.txt — What's in the Mac beta section.]

## 12. Execution

- **Direct in-place editing** for users — bullets, backlinks, tags, tasks written directly into notes.
- **AI execution via palette** — `Cmd + J` opens AI palette; user picks a prompt or writes custom; output replaces/inserts at cursor: "Replace ⌘↩" and "Insert I" and "Copy C" keyboard hints visible in the home page text [Source: home.txt — AI section.]
- **AI backlink decoration** — replaces selected text with backlinked version [Source: changelog.txt — "Add backlinks using AI" section.]
- **Agent execution via MCP** — direct read/write to notes via Claude/Codex [Source: blog-mcp-support-for-coding-agents.txt, blog-edit-notes-with-coding-agents.txt.]
- **Voice transcription** — real-time append to daily note [Source: changelog.txt — "In-line transcriber" section.]
- **History Browser for undo** — full per-note revision history revert [Source: changelog.txt — Reflect 2 — History browser section.]
- **Recovery kits on signup** for encryption safety [Source: changelog.txt — "Whisper on mobile" section.]

There is **no documented "Explore vs Execute" mode distinction** (contrast Craft) — AI replaces/inserts directly.

## 13. Artifacts

- **Notes** — atomic content units (markdown-ish, with `[[backlinks]]`, `#tags`, `- [ ]` tasks).
- **Daily notes** — date-keyed notes (the canonical landing surface).
- **Backlinks** — bidirectional references between notes.
- **Tags** — page-like references (`#tag`).
- **Tasks** — `- [ ]` checkboxes aggregated into a Tasks view.
- **Meetings** — calendar events with attendees (Google Calendar, Outlook, iCal).
- **Audio memos** — recorded + Whisper-transcribed.
- **Web snippets** — saved via Chrome extension.
- **Kindle highlights** — synced via Readwise.
- **Images & PDFs** — OCR-extracted text searchable.
- **AI summaries** — auto-generated for saved links.
- **AI conversations** — chat-with-notes sessions (synced across devices).
- **Templates** — slash-menu-insertable snippets: "They make it easy to insert commonly used snippets. … You can edit templates under Reflect's preferences. And insert using our new slash menu. Just type forward-slash, the template name, and then enter." [Source: changelog.txt — Reflect 2 — Templates section.]
- **Published notes** — public-shareable URLs ("Publishing. Share anything you write with one click." [Source: home.txt — Features section.])

In Reflect Open, artifacts simplify to: Markdown files under `daily/`, `notes/`, `assets/` directories [Source: reflect-open.txt].

## 14. Keyboard UX

Reflect is keyboard-first. Documented shortcuts:

- **`Cmd + J` / `Ctrl + J`** — open AI palette [Source: changelog.txt — "Reflect AI integration" section.]
- **`Cmd + K`** — open search palette [Source: changelog.txt — "Enhanced search" section.]
- **`Cmd + Enter`** — open backlink in split-pane (when a backlink is highlighted) [Source: changelog.txt — "Split pane view" section.]
- **`Cmd + A`** — select all (used in AI backlink-decoration flow) [Source: changelog.txt — "Add backlinks using AI" section.]
- **`Option + Up / Down`** — move list items up/down [Source: changelog.txt — "Markdown export, multiple Google calendars, and more" section.]
- **`Option + Meta + [`** — expand/collapse shortcut [Source: changelog.txt — "Desktop/Web: Minor bug-fix release" section.]
- **`Cmd + /`** — toggle the keyboard shortcuts panel [Source: same.]
- **`//` for aliasing** instead of `/` [Source: same.] — Reflect uses `//` for note aliases.
- **`⌥ ⌘ L` (Option + Cmd + L)** — copy URL of current note [Source: changelog.txt — "Custom prompt editor and more" section.]
- **`Option` twice OR `Option + Space`** (Mac), **`Alt` twice OR `Alt + Space`** (Windows) — trigger in-line voice transcriber [Source: changelog.txt — "In-line transcriber and Gemini for AI chat" section.]
- **International keyboard support** — "By default, Reflect will automatically detect what keyboard your system is set to. … click on the question mark next to your profile name in the lower left corner of the app, then click 'Keyboard shortcuts'. Here you'll be able to see what the custom shortcuts are for your language." [Source: changelog.txt — "International Keyboard Support" section.]
- **Forward/back navigation buttons** added across desktop, web, iPad [Source: changelog.txt — "Other updates and improvements" section.]

This is a rich, well-documented shortcut surface — comparable to Craft's. Reflect has localized shortcut variants per keyboard layout, which is unusual and noteworthy.

## 15. Motion

No official motion specs are documented. Observable patterns from feature descriptions:

- Bullet drag-and-drop ("you can now move and indent bullet points by dragging them" [Source: changelog.txt — "New Chrome extension" section.]).
- Sidebar slide animations.
- Brain view graph motion (color-coded, filterable).
- Mobile app swipe transitions ("A cleaner Daily Notes page that clearly shows what day you're on" [Source: changelog.txt — "New mobile app design" section.]).
- Real-time voice transcription visual feedback ("The transcription will happen in real-time as you speak." [Source: changelog.txt — "In-line transcriber" section.]).

Motion is functional, not cinematic. Reflect's editorial aesthetic is "fast and invisible" [Source: changelog.txt — Reflect 2 — Editor polishing section] — motion is subordinate to flow.

## 16. Animation

Animation vocabulary (inferred, no official spec):

- Bullet reordering drag animations.
- Sidebar slide.
- Brain view node settling.
- Real-time voice-transcription text streaming.
- AI palette dropdown opening.
- Backlink hover quick-edit menu ("You can now hover a link to see its url and a quick edit menu." [Source: changelog.txt — Reflect 2 — Editor polishing section.])
- Text-selection popup menu for formatting.

Animations are sparing. The product explicitly tries to "blend into the background" [Source: changelog.txt — Reflect 2 — Editor polishing section].

## 17. Visual Hierarchy

Reflect's visual hierarchy is **minimalist editorial**:

- Redesigned nav bar with split account/support popup menus [Source: changelog.txt — Reflect 2 — Design facelift section.]
- "A new set of icons. Re-designed dark mode. Simplified side-bars with more descriptive labels. Redesigned recorder for Whisper transcriptions." [Source: changelog.txt — "Re-design of web and desktop apps" section.]
- Daily note is the centre of attention; backlinks and incoming-links panel sit beneath the note.
- AI palette is a modal dropdown at the cursor.
- Brain view is full-screen graph visualization with tag color-coding.
- Mobile: "An updated layout for the text editing menu, complete with new icons. A cleaner Daily Notes page. … More space around text, making your notes much easier to navigate and read." [Source: changelog.txt — "New mobile app design" section.]

Visual style is "minimalist note-taking app" — closer to Bear or Apple Notes than to Notion's dense UI or Roam's brutalist UI. Twitter praise captured on the home page: "holy shit reflect app design is so good my writing and introspective ability went up 10x since i got it. was using bear/notion before but the simplicity of reflect is beautiful." [Source: home.txt — Wall of love section, tweet by @adnan_wahab_.]

## 18. Progressive Disclosure

- AI palette is summoned on demand (`Cmd + J`), not always visible.
- Brain view is a separate tab, not always visible.
- Backlinks panel sits beneath notes, collapsible.
- Slash menu (`/`) opens on demand for template insertion.
- Keyboard shortcuts panel toggled via `Cmd + /` [Source: changelog.txt — "Desktop/Web: Minor bug-fix release" section.]
- Mobile text-editing menu is contextual ("An updated layout for the text editing menu, complete with new icons" [Source: changelog.txt — "New mobile app design" section.]).
- Split-pane only activates on cmd+click of a backlink.

There is **no documented onboarding progressive disclosure** (no tour, no checklist).

## 19. Accessibility

No dedicated accessibility documentation page was found in crawlable Reflect sources. Implicit features:

- **International keyboard support** with localized shortcut variants — a real win for non-US users [Source: changelog.txt — "International Keyboard Support" section.]
- "CJK IME" fixes [Source: changelog.txt — "Offline Mode and Internationalization fixes." section.] — Reflect has done specific work for Chinese/Japanese/Korean input methods.
- "You can now create non-english tags." [Source: same.]
- Keyboard-first UX (most actions have shortcuts).
- Forward/back navigation buttons added across desktop/web/iPad [Source: changelog.txt — "Other updates" section.]
- iOS lock screen widget for voice transcriber with "Stop" button [Source: changelog.txt — "Encrypted assets, lock screen activity" section.]

No documented WCAG conformance statement, no documented screen-reader mode.

## 20. Performance Perception

Performance is a repeatedly-cited priority in the changelog:

- **SQLite rewrite (Feb 2025)**: "rewriting the entire frontend codebase to be powered by SQLite … much faster load times, and we should handle massive note collections without issue (no more reloading issues on mobile!)." [Source: changelog.txt — "Massive speed bump, Sonnet 3.7, and PDF preview" section.]
- **iPad speed boost (April 2025)**: "brought the same improvement to our iPad app. … much faster and more responsive. … able to handle massive collections of notes without any issue." [Source: changelog.txt — "Performance boost on iPad" section.]
- **Mobile memory reduction**: "a 50% memory usage improvement on the mobile app" [Source: changelog.txt — "AI and usability improvements" section.]
- **Mobile database rewrite**: "It changes how the entire app works internally, and effectively reduces the memory footprint greatly. Practically, you'll notice: Much faster startup time, No more mobile reloads if you have a large graph, … Reflect will now take up much less system resources. We're getting close to what native apps can achieve in terms of both speed and lightweightness." [Source: changelog.txt — "Massive speed increase to our mobile app" section.]
- **Improved performance for pages with many backlinks** — multiple times [Source: changelog.txt — "Tasks update and custom protocols" and "New Backlink Picker" sections.]
- **"Improve speed of first page load"** [Source: changelog.txt — "Happy New Year!" section.]
- **Persistent search results** [Source: changelog.txt — "Massive speed bump" section.]
- **Persistent audio recording saved locally before upload** to reduce risk of lost audio memos [Source: changelog.txt — "Major bug fixes" section.]

This is one of the most performance-focused changelogs in this evidence set — Reflect has done multiple full-stack rewrites to keep perceived speed high.

## 21. Trust

Reflect's trust posture is **E2EE for note content, but cloud-hosted** (until Reflect Open):

- **End-to-end encryption for note content**: "The contents of your notes are end-to-end encrypted. No one else can read them (not even us)." [Source: changelog.txt — "🔐 Encryption" section.]
- **Encrypted assets** (as of "Encrypted assets, lock screen activity" update): "Assets you save to Reflect are now end-to-end encrypted. That means any image or file you add to a note can only be decrypted and viewed by you." [Source: same.]
- **Recovery kits auto-downloaded on signup**: "Reflect also now has recovery kits automatically download upon signup – making encryption much less scary." [Source: changelog.txt — "Whisper on mobile and password recovery kits" section.]
- **Voice transcription privacy**: "we delete the audio recordings and plain text transcriptions as soon as they're processed." [Source: changelog.txt — "Enhanced search and Whisper integration" section.]
- **Cloud-hosted**: Reflect is hosted on its own infrastructure (not local-first in the existing app). YJS-based sync requires Reflect servers in the existing app.
- **API for access**: "Reflect API … supports appending data to your notes, returning a list of the links you've bookmarked" — REST API with token auth [Source: changelog.txt — "Reflect API" section.]
- **Clickjacking fix** [Source: changelog.txt — "Offline Mode and Internationalization fixes." section.] — Reflect has done explicit security hardening.

In **Reflect Open**, the trust posture changes dramatically:
- **No Reflect account / no Reflect-hosted notes database**: "There is no Reflect account or Reflect-hosted notes database. We don't run product analytics." [Source: reflect-open.txt.]
- **Plain Markdown files locally**: "your notes are ordinary files stored locally, in iCloud Drive, or in a Git repository you control." [Source: same — FAQ.]
- **Bring-your-own AI keys**: "AI uses your own OpenAI, Anthropic, Google, or OpenRouter key. … Keys are stored in the operating system's keychain and need to be configured separately on each device." [Source: same.]
- **Private notes blocked from AI**: "Notes marked private are blocked from being sent to AI or other services that read note content." [Source: same.]
- **Open-source under MIT**: "the application's source code is available under the MIT license." [Source: same — FAQ.]
- **iCloud E2EE**: "Reflect Open does not add its own end-to-end encryption layer. Instead, your notes are ordinary files stored locally, in iCloud Drive, or in a Git repository you control. However, in many countries it is possible to turn on end-to-end encryption inside of iCloud." [Source: same — FAQ.]

This is a meaningful pivot — Reflect is moving toward Anytype's trust posture (local-first, E2EE-via-iCloud, BYO-AI-keys, open-source) while keeping the existing cloud-hosted app alive for users who don't want to migrate.

## 22. Explainability

- **Honest changelog** — every feature ships with a written explanation of what changed and why; the changelog is the de-facto product-explainability surface.
- **Recovery kit on signup** — encryption is explained to the user at the moment they're most vulnerable to losing access [Source: changelog.txt — "Whisper on mobile" section.]
- **Candid migration FAQ** — Reflect Open's blog post explicitly addresses "Aren't you releasing a free competitor to your own product? Yes—to some extent. … That's the classic innovator's dilemma: protect the product and business model you have today, or embrace the thing that may eventually replace them. We think resisting that change would be a mistake." [Source: reflect-open.txt — FAQ.]
- **No model card / no AI behaviour disclosure** — Reflect does not document which models do what, how prompts are constructed, what context is sent, or what the failure modes are.
- **No documented "what the AI sees" panel** — there is no in-product UI showing what was sent to the model.
- **Reflect Open's "Private" note flag is explained** — "It prevents that note's content from being sent to AI or another service that reads note content. It does not exclude the note from iCloud or GitHub backup; otherwise the note could be silently lost when restoring your graph." [Source: reflect-open.txt — FAQ.] This is candid about a tradeoff.

## 23. Long Session Experience

- **Daily notes as anchor** — every session starts and ends on today's daily note.
- **Split-pane view** for two notes side-by-side [Source: changelog.txt — "Split pane view" section.]
- **History browser** for time-travel through edits [Source: changelog.txt — Reflect 2 — History browser section.]
- **Random note** for serendipity [Source: changelog.txt — "Tasks and more!" section.]
- **Tasks aggregation** to keep tasks from getting buried [Source: changelog.txt — "Tasks added to iPhone app" section.]
- **AI chat with notes** for reflection across sessions ("for example, reflecting on what you've written the last week" [Source: changelog.txt — "Advanced Search and AI Chat" section.])
- **Persistent search results** so a search doesn't disappear on tab switch [Source: changelog.txt — "Massive speed bump" section.]
- **Lock screen audio widget** for one-tap voice capture [Source: changelog.txt — "iOS audio memo widget" section.]
- **Improved performance for pages with many backlinks** (a known long-session friction point that has been repeatedly addressed in the changelog).

## 24. Power User Features

1. **AI palette with custom prompts** — `Cmd + J` opens palette, custom prompts saveable, prompt templates preferences tab [Sources: changelog.txt — "GPT-4 + custom AI prompts", "Custom prompt editor and more" sections.]
2. **AI Chat with notes** — ask questions across your notes [Source: changelog.txt — "Advanced Search and AI Chat" section.]
3. **Similar notes** — client-side embeddings [Source: same.]
4. **AI backlink decoration** — auto-add backlinks to a selection of text [Source: changelog.txt — "Add backlinks using AI" section.]
5. **Advanced Search** — filter by pinned/published/tags/linked/created/updated/daily [Source: changelog.txt — "Advanced Search on Mobile" section.]
6. **MCP server for coding agents** (Mar 2026) — read + write notes from Claude/Codex [Sources: blog-mcp-support-for-coding-agents.txt, blog-edit-notes-with-coding-agents.txt.]
7. **Reflect API** — append + read bookmarks + create tasks [Source: changelog.txt — "Reflect API", "Tasks update and custom protocols" sections.]
8. **Zapier integration** — no-code automation [Source: changelog.txt — "Happy New Year!" section.]
9. **Templates + slash menu** [Source: changelog.txt — Reflect 2 — Templates section.]
10. **History Browser** — per-note revision time-machine [Source: changelog.txt — Reflect 2 — History browser section.]
11. **Split-pane view** [Source: changelog.txt — "Split pane view" section.]
12. **In-line voice transcriber** — `Option+Option` or `Option+Space` [Source: changelog.txt — "In-line transcriber" section.]
13. **OCR for images and PDFs** [Source: changelog.txt — "Image and PDF OCR Text" section.]
14. **Encrypted assets** [Source: changelog.txt — "Encrypted assets" section.]
15. **Reflect Open CLI** — `reflect today`, `reflect search`, `reflect show` [Source: reflect-open.txt — What's in the Mac beta section.]
16. **Multi-model AI** — GPT-4o, Sonnet 3.7, Gemini (2M context) [Source: changelog.txt — "In-line transcriber and Gemini for AI chat" section.]
17. **Readwise, Chrome extension, Kindle highlights, Google Calendar, Outlook, iCal, Zapier** — broad integration surface [Source: home.txt — Integrations section.]

The most distinguishing power features are the **multi-modal AI surface** (voice, image, PDF, text, code) and the **Reflect Open pivot to local-first Markdown**.

## 25. Developer Experience

- **REST API** — public, append-focused, with token auth. Endpoints documented at Reflect Academy: "You can find information on how to access the API, the available endpoints and more on our Academy Page." [Source: changelog.txt — "Reflect API" section.]
- **MCP server** (Mar 2026) — for Claude and Codex; setup guide on Academy, plus "a setup guide that you can download and upload into your preferred coding agent and it will walk you through the setup." [Source: blog-mcp-support-for-coding-agents.txt.]
- **MCP for editing** (Apr 2026) — expanded MCP for write operations [Source: blog-edit-notes-with-coding-agents.txt.]
- **Reflect Open CLI** — `reflect today`, `reflect search`, `reflect show` [Source: reflect-open.txt.]
- **Open-source under MIT** (Reflect Open) — full source code on GitHub [Source: reflect-open.txt — FAQ.]
- **Custom protocols** — `things://` and other URL schemes supported [Source: changelog.txt — "Tasks update and custom protocols" section.]
- **Zapier** — no-code automation surface [Source: changelog.txt — "Happy New Year!" section.]
- **API key entry** in-product — "Enter your own API keys (either GPT-3.5 or GPT-4) to bypass the AI palette character limits" [Source: changelog.txt — "AI and usability improvements" section.] — i.e. Reflect already had BYO-AI-key support well before Reflect Open formalized it.

The DX is **less rigorous than Anytype's** (no OpenAPI spec, no documented sandbox), but **more accessible** (video walkthroughs, downloadable setup guide, MIT-licensed open source on Reflect Open).

## 26. Biggest Strengths (with evidence)

1. **Deepest first-party AI surface in the set.** AI palette (custom prompts), AI chat with notes (multi-model: GPT-4o, Sonnet 3.7, Gemini 2M), AI backlink decoration, AI summaries for saved links, similar notes (client-side embeddings), in-line voice transcriber, OCR for images+PDFs, MCP server for coding agents. [Sources: home.txt, multiple changelog sections.]
2. **Performance-first engineering culture.** Multiple full-stack rewrites for speed (SQLite, mobile database rewrite, iPad speed boost, memory reduction). [Sources: changelog.txt — "Massive speed bump", "Massive speed increase to our mobile app", "Performance boost on iPad", "AI and usability improvements" sections.]
3. **Honest encryption UX.** Recovery kits auto-download on signup; voice transcriptions deleted after processing; "not even us" framing for note content E2EE. [Sources: changelog.txt — "Whisper on mobile", "Enhanced search and Whisper", "🔐 Encryption" sections.]
4. **Internationalized keyboard support** — localized shortcut variants per keyboard layout; CJK IME fixes; non-English tags supported. [Sources: changelog.txt — "International Keyboard Support", "Offline Mode and Internationalization fixes" sections.]
5. **Pivoting to local-first + open-source (Reflect Open)** — the candour of the announcement ("Aren't you releasing a free competitor to your own product? Yes—to some extent") is exceptional. [Source: reflect-open.txt — FAQ.]
6. **Multi-modal capture** — voice (Whisper), web snippets (Chrome ext), Kindle highlights (Readwise), meetings (Calendar), images/PDFs (OCR). [Sources: home.txt — Integrations section, changelog.txt — multiple sections.]
7. **MCP server for coding agents** — Reflect was early to ship MCP (Mar 2026) and expanded it to writes (Apr 2026). [Sources: blog-mcp-support-for-coding-agents.txt, blog-edit-notes-with-coding-agents.txt.]
8. **Minimalist visual design** that users explicitly praise ("the simplicity of reflect is beautiful" [Source: home.txt — Wall of love.])
9. **Honest changelog** — every shipped feature has a written explanation; this is itself a DX/trust feature.

## 27. Biggest Weaknesses (with evidence)

1. **No public docs site.** `notes.reflect.app` is unreachable (DNS fail); `reflect.app/notes` and `reflect.app/support` both 404. The "Academy" is video-first and not crawlable as text. [Source: curl probes, 2026-08-07, cached in `raw-reflect/`.]
2. **Cloud-hosted by default (existing app)** — until Reflect Open, Reflect is a cloud-hosted SaaS with E2EE bolted on; this is weaker than Anytype's local-first posture.
3. **No typed-Object model** — Reflect is "notes + backlinks + tags" only; users who want Notion-like databases, typed properties, or queries have to look elsewhere.
4. **No block-level UID reference semantics** — Reflect does not have Roam's `((uid))` block-reference model; the atomic unit is the note, not the block.
5. **No documented agent sandbox** — agents via MCP/API have whatever scope the token grants; there is no documented in-product review mechanism for agent writes (contrast Anytype's sandboxed JS runtime).
6. **No documented accessibility conformance** — no WCAG statement, no screen-reader mode documented.
7. **No documented model card / AI behaviour disclosure** — which models do what, how prompts are constructed, what context is sent — none of this is publicly documented.
8. **Native-only on Mac/iOS** (Reflect Open) — "Windows and Android are not available yet, and we do not have release dates for them." [Source: reflect-open.txt — FAQ.] This is a significant platform gap.
9. **Subscription required for the existing app** ($10/month); the existing app's free trial is only 14 days. The Reflect Open Mac app is free, but iPhone is "free during TestFlight, but we expect to charge for it eventually." [Source: reflect-open.txt — Pricing section.]
10. **Two Reflect products in parallel** — "Reflect Open is a new app, not an update to the existing one" [Source: reflect-open.txt — opening paragraphs] — this risks confusing users about which Reflect to use.
11. **No documented onboarding** — no tour, no empty-state scaffolding visible in public sources.
12. **No first-party Linux/Android** for Reflect Open (yet).

## 28. What should MiMo learn?

- **Multi-modal AI is the table stakes.** Reflect covers voice (Whisper), text (GPT-4o/Sonnet/Gemini), image (OCR), PDF (OCR), and code (MCP). MiMo should plan for parity across all modalities.
- **AI palette over AI sidebar.** The `Cmd + J` palette that operates on the current selection is more in-flow than a sidebar chat. MiMo should consider a palette-style AI surface.
- **Custom prompts as a first-class preferences surface** — a dedicated Prompt Templates tab lets users build reusable AI workflows.
- **Client-side embeddings for "similar notes"** — semantic search without server roundtrips; privacy-preserving; works offline.
- **Recovery kit on signup.** Auto-download a recovery kit at the moment of account creation — encryption UX done right.
- **Voice transcription auto-deletion.** Delete audio + plain-text transcription as soon as processed — privacy-preserving voice capture.
- **International keyboard support with localized shortcut variants.** Critical for non-US users; rare in this category.
- **Honest changelog as the product-explainability surface.** A richly written changelog builds trust and is itself a UX/DX feature.
- **Pivoting to local-first + open-source when the market demands it** — Reflect's candid Reflect Open pivot is a model for how to evolve a SaaS product to local-first without forcing migration.
- **MCP for coding agents, with explicit read → write progression** — ship read-only first, expand to writes once users are comfortable.
- **Performance as a multi-year investment** — multiple full-stack rewrites (SQLite, mobile database) to keep perceived speed high. MiMo should treat performance as ongoing, not one-time.
- **Candid migration FAQ** — explicitly answer "are you cannibalizing yourself?" publicly.

## 29. What should MiMo reject?

- **Cloud-hosted-by-default.** Reflect is moving away from this; MiMo should start local-first.
- **No public docs site.** Reflect's docs are locked inside an uncreachable subdomain + a video-only Academy. MiMo must publish a public, crawlable docs site (with `.md` versions, à la Anytype).
- **No typed-Object model.** "Notes + backlinks" is too thin for serious knowledge work in 2026. MiMo should adopt Anytype-style typed Objects.
- **No documented accessibility conformance.** MiMo should publish a WCAG statement.
- **No documented AI behaviour / model card.** MiMo should publish which models do what, what context is sent, what the failure modes are.
- **Two parallel products** (existing Reflect + Reflect Open). MiMo should not split focus this way; pick one architecture.
- **No documented agent sandbox.** MiMo should ship a sandboxed agent runtime (à la Anytype) rather than free-form MCP writes.
- **Subscription-only existing app with 14-day trial.** Reflect's existing app's pricing model is a friction point — the Reflect Open free-Mac-app/paid-iPhone-app model is more thoughtful.
- **No first-party Linux/Android.** MiMo should ship cross-platform from day one.
- **Native-only on Mac/iOS for Reflect Open** — MiMo should plan for cross-platform parity.

## 30. Confidence Score

**Confidence: 80/100.**

Reasoning:
- **Strong evidence base for:** AI features (deeply documented across home page + multiple changelog entries), keyboard shortcuts, performance work, trust/encryption, Reflect Open pivot, integrations, MCP server, multi-modal capture. The changelog alone is 28K chars of detailed feature evolution; the Reflect Open blog post is 14K chars of candid product strategy. These are first-party and unusually rich.
- **Weaker on:** in-product UI behaviour (empty states, onboarding tour, animation, accessibility, visual hierarchy) — these are not sourceable from public Reflect URLs. Where claimed, they are inferred from feature descriptions in the changelog rather than directly observed.
- **Methodological risk:** Reflect has no public docs site. The "Academy" is video-first. So sections like 15 (Motion), 16 (Animation), 17 (Visual Hierarchy), 19 (Accessibility), 24 (Power User Features) are sourced from feature announcements rather than design-system docs. This is acceptable for an evidence file but lowers confidence vs. a product with public design-system docs (like Craft or Anytype).
- **What would raise confidence to 90+:** hands-on time with both the existing Reflect app and Reflect Open beta; access to the video Academy content; an official accessibility conformance statement; an official model card / AI behaviour disclosure.
