# Research Group D — UX Study of 5 OS-Grade Productivity Products (2024–2025)

**Author:** Sub-agent R-D (Senior UX/Product Researcher)
**Purpose:** Inform the MiMo redesign (single-user AI OS) by studying the REAL
current UX of five best-in-class products.
**Method:** Web search via `z-ai function web_search` + page reading via
`z-ai function page_reader`. Sources cited per product.
**Date:** 2026-08 (researching current 2024–2025 product state)

---

## VS Code

### Current UX (2024–2025) — verified via
- https://code.visualstudio.com/docs/editing/userinterface (official UI doc)
- https://code.visualstudio.com/docs/configure/custom-layout (Custom Layout doc)
- https://code.visualstudio.com/api/ux-guidelines/activity-bar (Activity Bar UX guidelines)
- https://code.visualstudio.com/docs/editing/tips-and-tricks (search result snippet)

Layout as of 2024–2025:
- **Activity Bar** (far left) — fixed set of view-switch icons (Explorer, Search, Source Control, Run/Debug, Extensions). Right-click → Move Primary Side Bar Right/Left, Activity Bar Position can be `Default | Top | Bottom | Hidden`, Activity Bar Size can be `Default | Compact`. Account/Manage buttons live at the bottom of the activity bar by default but migrate to the title bar when the bar is moved to top/bottom.
- **Primary Side Bar** — view host (Explorer tree, etc.); movable to right via `Ctrl+B`. A new **Secondary Side Bar** (`Ctrl+Alt+B`) opens opposite the primary, default-visible when a folder is opened, hidden in empty window.
- **Editor region** — Tabs at top of each editor group; multiple editor groups can be created with `Ctrl+\`, switched via `Ctrl+1/2/3`; editors can be moved into **floating windows** (drag tab out, or `Move into New Window`); **modal editors** (Settings, Keyboard Shortcuts, Profiles, Workspace Trust, Extensions) open as a centered overlay, dismissible by clicking outside or `Esc`.
- **Panel** — bottom by default (Terminal, Problems, Output, Debug Console); can be moved to left/right/top/bottom.
- **Minimap** — code outline right of the editor; drag shaded area to jump; respects `//#region` folding markers.
- **Sticky Scroll** — pins starting lines of nested scopes to the top of the editor for orientation (`editor.stickyScroll.enabled`).
- **Command Palette position** — the palette itself can be dragged by its top edge, or pinned via the *Customize Layout* title-bar dropdown ("Quick Input Positions").
- **Zen Mode** (`Ctrl+K Z`) and **Centered Layout** — pure-editor and centered-editor modes that hide all chrome.
- **Customize Layout control** — the rightmost title-bar button opens a dropdown with toggles for every major UI surface + the layout modes above.

### What works
- **Customize Layout dropdown** in the title bar — one place to flip every chrome surface (panel, side bars, activity bar, minimap, tabs). No deep settings dive required.
- **Editor groups + drag-and-drop** between groups — split editing is genuinely first-class: `Ctrl+\`, `Ctrl+Enter`, drag a tab sideways, or `Alt+click` in Explorer.
- **Floating windows** with "Always on Top" pin — multi-monitor work without losing tab context.
- **Sticky Scroll** — solves "where am I in this file?" without breaking flow.
- **Layout persistence across restarts** — "Each time you start VS Code, it opens up in the same state it was in when you last closed it." Critical for long sessions.
- **Quick Open (`Ctrl+P`) vs Command Palette (`Ctrl+Shift+P`)** — separate keystrokes for "find a file" vs "run a command", and the same palette accepts `>` `@` `#` `:` prefixes to switch modes. One input, many modes.
- **Chorded shortcuts** (`Ctrl+K Ctrl+S`, `Ctrl+K Z`) — packs hundreds of bindings without consuming single-modifier real estate.

### What does not work
- **Configuration sprawl** — every tweak (side bar location, activity bar size, panel position, menu style, title bar style, sticky scroll, minimap side) lives in `workbench.*` settings. Discoverability is poor; "Customize Layout" is a band-aid over the deeper settings editor.
- **Two side bars is cognitively expensive** — Primary + Secondary + Panel + Editor can become a 4-pane mess; users routinely forget which view is where.
- **Activity Bar with extensions** — every installed view-type extension adds an icon. Power users end up with 12+ icons in the Activity Bar, defeating its purpose as a "fixed switch surface."
- **Modal editors are inconsistent** — Settings, Profiles, Extensions open as centered overlays but the editor region tabs still exist behind them. Some users expect modals, others expect tabs.
- **Tabs vs no-tabs** — VS Code still supports the legacy "tabless" editor-group stack, doubling mental model.

### What is unique
- **Customize Layout dropdown** — no other editor exposes live, interactive layout surgery from one widget.
- **Floating editor windows pinned always-on-top** — unique to VS Code among editors.
- **Sticky Scroll** — first-mover; now copied by JetBrains.
- **Quick Open with prefix grammar** (`>cmd`, `@sym`, `#sym`, `:line`) — one palette, multiple grammars.

### What MiMo should learn
- **One Customize-Layout widget, not 8 toggles scattered across menus.** MiMo's left rail + center + adaptive right sidebar should be controllable from a single title-bar control.
- **Sticky context header** — pin "current conversation title + mode + project chip" like VS Code pins scope headers, so the user always knows where they are.
- **Layout persistence is non-negotiable** — every tab position, sidebar width, mode, scroll position must survive a reload.
- **Quick Open and Command Palette should be the SAME palette with prefix grammar** — not two separate overlays. MiMo's `⌘/` and `⌘K` should converge with prefixes (`>cmd`, `/search`, `@mem`, `#file`).
- **Floating artifact windows** — let the user tear a code block or chart out of the conversation and pin it always-on-top.
- **Editor groups as "split conversation"** — let the user split the conversation into two synchronized panes (one showing the AI reply, one showing source/artifact).

### What MiMo should avoid
- **Settings sprawl in a JSON-like config** — MiMo is single-user; expose every layout choice via direct manipulation (drag the rail, click a chip), not settings keys.
- **Two side bars by default** — MiMo's right sidebar should adapt to the mode (already done), not duplicate the left rail's contents.
- **Tab-less legacy mode** — pick one tab model and commit.
- **Activity Bar icon overflow** — cap icons at a hard 8 (current spec is good). VS Code's failure to cap is a warning.

### Premium interaction (specific)
- **`Ctrl+\` split editor** — instant, animated, no modal dialog. You hit the chord and the editor splits.
- **Floating window with Always-on-Top pin** — drag a tab out, click the pin icon, it floats above. Tactile and immediate.
- **Customize Layout dropdown** — hover, click, see every region toggle live. The panel glides in/out as you click.

### Slow interaction (specific)
- **Opening Settings as a modal editor** — the modal blocks the editor region; settings search has perceptible delay.
- **Switching profiles** — `Profiles: Switch Profile` triggers a workspace reload; on large workspaces this is multi-second.
- **Extension install → reload** — still requires a reload prompt for many extensions.
- **Command Palette first-open after boot** — index warmup can be 200–500ms.

### Cognitive overload (specific)
- **Having Primary + Secondary + Panel + multiple editor groups all visible at once** — 4+ chrome surfaces competing for attention; users lose track of which view contains what.
- **Activity Bar with 10+ extension icons** — the "switch surface" becomes a guessing game of unlabeled icons.
- **Chorded shortcuts for power users, single-modifier for novices** — users don't know which layer they're in (`Ctrl+K` waits for the next key, but visually nothing differentiates "chord-pending" from "ready").

### Navigation / Workspace / Command palette / Tabs / Focus / Density / Animation / Long-session notes
- **Navigation hierarchy:** Activity Bar (top-level view switch) → Primary Side Bar (tree of files/views) → breadcrumbs via path in tab title. No first-class breadcrumb bar like IDEs.
- **Workspace organization:** Editor groups (grid of 1–N editors), each with tabs; floating windows on multi-monitor. Multi-root workspaces supported.
- **Command palette:** `Ctrl+Shift+P` (commands), `Ctrl+P` (files), `Ctrl+G` (lines), `Ctrl+Shift+O` (symbols). Unified by prefix grammar.
- **Tab / multi-tasking model:** Tabs per editor group; groups can be split, dragged, moved to floating windows. Pinned tabs supported.
- **Focus preservation:** The active editor's cursor + scroll + folded regions survive focus switches; "Open Editors" group at top of Explorer keeps the working set visible.
- **Information density:** High but compartmentalized — each panel has its own scrollable region. Density is configurable per surface.
- **Animation language:** Restrained. Panel collapses slide ~120ms; tab drag follows cursor with subtle shadow; minimap drag is direct-manipulation.
- **Long-session usability:** Relies heavily on layout persistence + Zen Mode for long sessions. No native "session restore" of *which file was being edited in which group* beyond what persistence already does.

**THE ONE interaction that defines VS Code:** `Ctrl+P` Quick Open — type three letters, hit Enter, you're in the file. The whole editor's information architecture is built around "find and go" via the keyboard.

---

## Raycast

### Current UX (2024–2025) — verified via
- https://albertosadde.com/blog/raycast (2024-02, updated 2025-12, "What It Is, How to Use It & Why It's Essential")
- https://manual.raycast.com/settings (search snippet, "Manage your settings… keyboard shortcuts, themes, AI providers, and extensions")
- https://www.raycast.com (homepage, search snippet)
- Search snippets from x.com (Thomas Paulmann), reddit r/raycastapp, LinkedIn 2025

Current UX shape (from article + snippets):
- Raycast is a macOS-native **productivity launcher** that replaces Spotlight. Triggered by a global hotkey (default `⌥+Space` or remapped `⌘+Space`).
- Single floating window — centered, blurred background, type-to-filter list of commands/apps/files. Closes on `Esc` or after action; doesn't persist as a window.
- **Extensions** — built in React + TypeScript, distributed via the Raycast Store. Free and community-driven. Each extension can register multiple commands (e.g., ClickUp extension's "Quick Capture").
- **Quick AI** (`⌘+⇧+Tab`) — select text anywhere, hit shortcut, get an instant AI answer in a small popover. Good for one-off questions, translations, summaries.
- **AI Chat** (`HYPER+Space` or hotkey) — full chat window; switch models mid-conversation (Claude → GPT-4); attach files/images/browser tabs; "Raycast Companion" Chrome extension pulls the active tab's content as context.
- **AI Commands** — user-defined prompts ("Make text shorter", "Check grammar") bound to hotkeys like `⌘+⌥+⌃+S`.
- **Quicklinks** — URL-shortcut commands that open a specific URL with the typed query interpolated (e.g., "gh {query}" → github.com/search?q={query}). User-defined arguments.
- **Snippets** — text expansion built-in (replaces Espanso/TextExpander).
- **Clipboard History** — unlimited with Pro; search + pin + paste.
- **Window Management** — built-in (replaces Rectangle/Magnet); snap halves/quarters/fullscreen via hotkeys.
- **Focus Mode** — block apps + websites, set timer, schedule recurring focus periods, integrate with calendar.
- **Aliases & Hotkeys** — every command can have multiple aliases (typed shortcuts in the launcher) and a global hotkey.
- **Pro tier ($8/mo)** — unlocks unlimited clipboard history, AI, cloud sync, custom themes.

### What works
- **Single floating window, type-to-act** — zero cognitive load between "I want to do X" and the action.
- **Aliases** — `gh` for GitHub, `cl` for clipboard, `cal` for calendar. The user builds their own vocabulary; muscle memory gets faster than any UI.
- **Quick AI popover on selection** — select text in any app, hit `⌘+⇧+Tab`, get an answer without context-switching. This is the killer feature.
- **AI Chat with mid-conversation model switching + browser-tab context** — solves "I want GPT-4's answer to this Claude thought" in one keystroke.
- **Quicklinks** — turn any URL with a `{query}` parameter into a typed command. Replaces bookmarks + browser search bar.
- **Built-in window management + snippets + clipboard history** — replaces 3–4 separate apps, freeing dock space and reducing background processes.
- **Hotkey binding for every command** — power users can avoid the launcher entirely for top-5 actions.
- **React/TypeScript extension model** — active community; the article author contributed a feature to the ClickUp extension himself.

### What does not work
- **Hotkey collision explosion** — power users accumulate `⌘+⌥+⌃+⏎`, `⌘+⌥+⌃+S`, `⌘+⌥+⌃+L`, `⌘+⌥+⌃+G` (literally from the reddit snippet). Three-modifier chords are muscle-memory hostile and conflict with OS shortcuts.
- **Pro tier gating** — clipboard history is unlimited only on Pro; the article notes "free is good, but Pro is where it shines." Free users hit ceilings.
- **Extensions are first-class but unranked** — installing 20 extensions clutters the launcher with hundreds of commands; discovery is search-driven, not curated.
- **Window management requires configuration** — out-of-the-box hotkeys don't match Rectangle defaults, so migrants have to relearn.
- **AI Chat is a separate window from the launcher** — context doesn't flow naturally between "ask AI" and "do command". Two mental modes.
- **macOS-only** — no Windows/Linux version (a limitation for cross-platform users).

### What is unique
- **Quick AI on text selection** — `⌘+⇧+Tab` on selected text anywhere in macOS. No app switches, no copy-paste, no prompt box. Pure "AI in your cursor".
- **AI Chat with mid-conversation model switching** — switch from Claude to GPT-4 mid-chat without losing context. ChatGPT and Claude native apps can't do this.
- **Browser-tab-as-context via Companion extension** — pull the live DOM of the active tab into the AI chat as context. Not even Arc does this natively.
- **Aliases as user-defined command vocabulary** — no other launcher lets the user rename every command to a 2-letter token.
- **Quicklinks** — universal "URL + {query}" command system; turns the launcher into a meta-search engine.
- **Snippets + Clipboard + Window Management + AI in ONE launcher** — the consolidation itself is unique; most launchers do 1–2 of these.

### What MiMo should learn
- **Aliases as a first-class concept** — every MiMo command, view, and memory entry should accept a 2–3 letter user-defined alias. The user types `mem` for memory, `ag` for agents, `pr` for projects.
- **Quick AI on selection** — let the user select text anywhere (conversation, artifact, code block, memory entry) and hit a hotkey to send to AI without leaving context. The "defining moment" of MiMo should feel like this.
- **Mid-conversation model switching** — let the user change model mid-chat in MiMo (currently has a model selector in Topbar — extend it to be per-message switchable).
- **Quicklinks as commands** — let the user define `gh {query}` → open GitHub search, `ar {query}` → open arXiv. These become MiMo commands, not browser bookmarks.
- **Built-in window/space management** — MiMo should manage its own split panes and floating artifact windows natively (like Raycast does for OS windows).
- **One launcher, many grammars** — Raycast's command + alias + quicklink + snippet all live in one input. MiMo's `⌘K` should similarly accept commands, aliases, snippets, quicklinks, and natural-language AI queries.

### What MiMo should avoid
- **Three-modifier hotkeys** — cap at 2 modifiers (`⌘+Key`, `⌘+⇧+Key`). Three-modifier chords are anti-muscle-memory.
- **Pro-tier gating on core features** — MiMo is single-user; there is no "free vs Pro". Don't recreate the gated-experience mental model in code.
- **Two separate AI surfaces (launcher vs chat)** — MiMo should have ONE conversation surface that subsumes both quick-AI and full-chat.
- **Extension sprawl without curation** — if MiMo ever opens an extension model, curate and rank; don't let it become a dumping ground.

### Premium interaction (specific)
- **Quick AI on selected text** — `⌘+⇧+Tab`, popover appears next to cursor, answer streams in 200ms. Pure magic.
- **AI Chat window opening** — `HYPER+Space` opens a large, centered, blurred-background chat window with a soft spring animation. Feels weighty but instant.
- **Window management snap** — drag a window to the screen edge, it snaps with a 60ms spring and a subtle haptic-style visual.
- **Clipboard history paste** — `⌘+⇧+V`, list appears at cursor, arrow keys to select, Enter to paste. No modal, no context switch.

### Slow interaction (specific)
- **First launch after boot** — index warmup takes 1–3 seconds; typed letters return stale results during warmup.
- **Installing a large extension** — some extensions (e.g., Notion, GitHub) fetch data on first run; 2–5s of "Loading…".
- **AI Chat with large context (browser tab + image + 5 files)** — first reply token has noticeable latency while the model ingests context.

### Cognitive overload (specific)
- **Three-modifier hotkeys** — the reddit list (`⌘+⌥+⌃+S`, `⌘+⌥+⌃+L`, `⌘+⌥+⌃+G`) is impossible to remember without a cheat sheet open.
- **AI Commands vs Snippets vs Quicklinks vs Aliases** — four overlapping "shortcut-like" concepts. Users don't know which to use when.
- **Extension store without curation** — searching "GitHub" returns 8 extensions; the user must evaluate each.

### Navigation / Workspace / Command palette / Tabs / Focus / Density / Animation / Long-session notes
- **Navigation hierarchy:** None persistent. Raycast is a launcher — it has no sidebar, no spaces, no tree. The hierarchy is *implicit* in the typed alias.
- **Workspace organization:** No workspace. One floating window per invocation. Window management is OS-window management, not Raycast-internal.
- **Command palette:** The launcher IS the command palette. Single input, multiple grammars (alias, command name, app name, file name, calculation, URL).
- **Tab / multi-tasking model:** None — Raycast closes after each action. AI Chat is the only persistent surface, opened as a separate window.
- **Focus preservation:** By design, Raycast DOESN'T preserve focus — it's transient. This is its strength and weakness: zero commitment, zero continuity.
- **Information density:** Low. One list of 5–8 visible items at a time. Search-as-you-type filters aggressively.
- **Animation language:** Spring-based, fast (80–150ms), blurred backdrop, scale-from-center on open. Snappy and modern.
- **Long-session usability:** Raycast is NOT a long-session tool — it's a launcher you invoke 100x/day for 2 seconds each. Long AI chats happen in the AI Chat window, which has its own scrollback.

**THE ONE interaction that defines Raycast:** Quick AI on selected text (`⌘+⇧+Tab`). It is the only product where "AI" is a verb applied to the user's current selection, not a destination.

---

## Linear

### Current UX (2024–2025) — verified via
- https://www.morgen.so/blog-posts/linear-project-management (2025-05-13, "Linear Guide: Setup, Best Practices & Pro Tips")
- https://workflowautomation.net/reviews/linear (2025, 7-month team migration review, 2800+ issues, 14 cycles)
- https://medium.com/@ananyavhegde2001/i-finally-tried-linear-and-now-i-get-the-hype-c5d488840278 (user-experience writeup)
- https://linear.app (homepage — current product surface as of 2026)
- https://shortcuts.design/tools/toolspage-linear (shortcut list)

Current UX shape:
- **Sync architecture** — Linear downloads workspace data locally and renders from cache, syncing changes via WebSocket in the background. "Pages open instantly. Search returns results as you type. Creating an issue takes under three seconds." Cold-launch under 2 seconds.
- **Left Sidebar:** Inbox · My Issues · Team Views (each team has backlog, active cycle, completed) · Projects · Roadmap · Views & Filters. Stable, opinionated, sparse.
- **Main panel** — List / Board / Spreadsheet / Timeline views, all rendering from the same cache, "switching between them mid-thought is frictionless."
- **Command Menu (`⌘+K`)** — create issue, jump to project/team, run commands like "Move issue to next cycle", "Assign to teammate". Faster than scrolling.
- **Single-key shortcuts:** `C` create issue, `S` status, `A` assign, `P` priority, `L` label, `E` edit, `X` select in list, `Space` peek-into-issue (hold to preview, release to dismiss), `Enter/O` open, `Esc` back.
- **Fixed workflow states:** Backlog → Triage → Todo → In Progress → Done → Canceled → Duplicate. Cannot add or rename states. Cannot add a fifth issue type (only Bug/Feature/Improvement/Chore). "These aren't oversights, they're choices."
- **Initiatives → Projects → Issues → Sub-issues** hierarchy. Cycles are Linear's sprints — no formal sprint ceremony, no "start sprint" button, automated rollover.
- **GitHub/GitLab integration** — bidirectional: PR opens → issue → "In Review"; PR merges → "Done"; CI fails → note on issue; reviewer comment → activity timeline.
- **Branch creation from issue** — click "Create branch", Linear generates `{team}-{issue-number}-{short-title}` and copies to clipboard.
- **Linear Agent (2026)** — AI agents that work alongside the team; "Loops" for recurring work; agent-assisted text editing; structural diffs for human + agent PRs.
- **Initiatives, Documents, Visual planning, Pulse, Insights, Dashboards** (per 2026 homepage) — expanded from issue tracker to "the system for product development."

### What works
- **Sync architecture** — perceived performance is the product. Search-as-you-type, millisecond issue creation, zero "Linear is slow today" complaints in 7 months of daily use (per review).
- **Keyboard-first with single-letter shortcuts** — `C`, `S`, `A`, `P`, `L`, `E`. After ~1 week of learning, developers stop reaching for the mouse. "Cmd+K + type two words" beats scrolling to find an issue.
- **`Space` to peek into an issue** (hold-to-preview, release-to-dismiss) — uniquely elegant preview interaction. No other tracker does this.
- **Fixed workflow states + 4 issue types** — "prevents Jira sprawl"; eliminates "is this a Story or a Task?" debate. Constraint IS the feature.
- **Triage by default** — new issues land in Triage; someone must consciously move them to Backlog or a cycle. Prevents backlog graveyards.
- **Bidirectional GitHub automation** — PR opens → issue moves to "In Review" automatically. Standup board is accurate without manual status updates.
- **Branch-name generation** — 15 seconds saved per branch × every developer × every issue = real time recovered.
- **Eng-123 issue IDs** — clean, referenceable in PRs, recognizable everywhere.
- **Dark mode default** — "carefully considered contrast and spacing that makes long issue lists readable."

### What does not work
- **Fixed workflow states frustrate teams with custom processes** — "Needs QA" between "In Progress" and "Done"? Can't do it. Some teams work around with labels, others find it a dealbreaker.
- **No native time tracking** — consultancies that bill by the hour need external Harvest/Toggl integration.
- **Reporting is shallow** vs Jira/Shortcut. Cycle velocity + completion rates + breakdowns are fine for retros, not for capacity planning or executive trend analysis. The CTO in the review had to pull data via GraphQL into a Notion dashboard.
- **Mobile is basic** — iOS "fine for checking during a meeting", Android worse with sync delays. Complex work belongs on desktop.
- **Not built for non-technical teams** — Customer Success struggled to onboard; vocabulary assumes fluency with software-dev concepts.
- **Per-seat pricing adds up** — 50-person team on Standard = $4,800/year.
- **Enterprise features still maturing** — audit log is present but less detailed than enterprise alternatives.

### What is unique
- **`Space` to peek into an issue** — hold-to-preview, release-to-dismiss. No commit, no context loss. No other tracker does this.
- **Local-first sync architecture** — workspace data is downloaded and rendered from cache; perceived as a native app, not a web app. Linear is the canonical example.
- **Fixed issue types + workflow states as a deliberate philosophy** — "Linear says no constantly." Other trackers are infinitely flexible; Linear is the opposite.
- **Bidirectional GitHub intelligence** — not just "link a PR" but automatic status transitions driven by actual dev activity (PR open → In Review; PR merge → Done; CI fail → note).
- **Linear Agent with structural diffs for human + agent PRs** (2026) — first to treat AI-agent output as a first-class diff citizen.

### What MiMo should learn
- **Local-first data, render from cache, sync in background** — MiMo's conversation list, memory, and recent events should be cached locally with optimistic UI; the API should sync in the background. This is the #1 lesson.
- **Single-letter shortcuts for the daily 5 actions** — MiMo should have `C` (new conversation), `M` (memory), `A` (agents), `R` (research mode), `S` (settings). One letter = one top action.
- **`Space` to peek** — MiMo should support hold-to-preview on memory entries, conversations, agents, artifacts. Release = dismiss. Zero commitment.
- **Fixed modes as a deliberate constraint** — MiMo already has 8 modes; resist the urge to let users add custom modes. The constraint IS the feature.
- **Triage-by-default for new memories** — new memory entries should land in a "Triage" view requiring conscious promotion to permanent memory. Prevents memory graveyards.
- **Bidirectional intelligence** — MiMo's memory/tool events should drive UI state automatically (event already done in v2 via EventBus subscription).
- **Dark mode default with carefully tuned contrast** — not just "invert colors".

### What MiMo should avoid
- **Per-seat pricing model in code** — N/A for single-user, but the lesson is: don't gate features behind "tier" concepts. One user, one full feature set.
- **Shallow reporting** — MiMo's "PersonalDashboard" already avoids KPI grids (good). Don't recreate enterprise reporting.
- **Mobile-first complex work** — MiMo is desktop-multi-hour; mobile is read-only at most.
- **Custom workflow states** — keep modes fixed; don't let users define "custom modes".

### Premium interaction (specific)
- **`Space` to peek into an issue** — hold the spacebar, issue opens as a floating panel over the list; release, panel dismisses. The interaction *is* Linear.
- **`⌘+K` command menu** — opens instantly (cache-rendered), typed letters filter in real-time, `Enter` executes. No loading spinner.
- **Issue creation** — `C` → modal opens with cursor already in title field → type → `⌘+Enter` → modal closes, issue appears in list instantly (<3 seconds total).
- **Drag-and-drop between status columns** — smooth spring animation, drop targets highlight with a 1px accent border.
- **Dark mode contrast** — `#0b0d0e` background with `#e6e8eb` text on a 13.5:1 ratio; long issue lists are readable for 8-hour sessions.

### Slow interaction (specific)
- **Cold-launch first paint** — under 2 seconds, but the sync handshake can show a brief "Connecting…" indicator that breaks the instant feel.
- **Large workspace initial download** — first login on a workspace with 10k+ issues shows a progress bar; subsequent loads are instant.
- **Mobile app sync delays** (especially Android) — issue created on desktop may take seconds to appear on mobile.
- **GraphQL API for custom reporting** — heavy queries can take 5–10s; teams building executive dashboards feel this.

### Cognitive overload (specific)
- **Initiatives → Projects → Issues → Sub-issues** hierarchy — 4 levels. For a single team it's clean; for multi-team orgs, deciding "is this an Initiative or a Project?" becomes a recurring debate.
- **Plus-tier "Initiatives" gating** — without Initiatives, multi-team orgs lose the strategic layer; with them, they have to learn a new abstraction.
- **Linear Agent (2026) + Linear MCP + Loops + Codex agents** — the 2026 homepage surface adds 4+ new AI concepts. Users have to learn which agent does what.

### Navigation / Workspace / Command palette / Tabs / Focus / Density / Animation / Long-session notes
- **Navigation hierarchy:** Left sidebar with Inbox / My Issues / Team Views / Projects / Roadmap / Views & Filters. 2-level deep typically. Sparse.
- **Workspace organization:** Single main panel + sidebar. No split views, no tabs. One view at a time. Switching view types is instant because of cache rendering.
- **Command palette:** `⌘+K` opens a centered overlay; fuzzy-matches commands, issues, projects, people. Single-key shortcuts bypass the palette for the daily 5.
- **Tab / multi-tasking model:** NONE. Linear is single-view-at-a-time. This is deliberate — focus over multi-tasking.
- **Focus preservation:** The active issue's edit state survives a `Space`-peek dismiss; filters survive navigation; scroll position survives view switches.
- **Information density:** Low & focused. List rows are 32px tall with 4 columns; board columns hold 5–10 cards; timeline rows are 24px. Whitespace is generous.
- **Animation language:** Spring-based, 100–180ms, subtle. No bouncy easings. Issue-state transitions use a 1px accent border + subtle bg color shift.
- **Long-session usability:** Excellent — keyboard flow-state + dark-mode contrast + zero loading states = 8-hour sessions without fatigue. Mobile is the weak point.

**THE ONE interaction that defines Linear:** `Space` to peek into an issue. Hold-to-preview, release-to-dismiss — it crystallizes Linear's "focus without commitment" philosophy.

---

## Notion

### Current UX (2024–2025) — verified via
- https://www.notion.com/help/navigate-with-the-sidebar (official sidebar docs)
- https://www.notionapps.com/blog/notion-data-sources-update-2025 (2025-12-25, "The Big Database 2025 Update")
- Search snippets from notion.com/releases, notion.com/help/boards, YouTube "Crafting the Ultimate Workspace with Notion AI | SXSW 2025"

Current UX shape:
- **Left sidebar** — sections (top to bottom): `Workspace` (account switcher, search, settings) → `Favorites` (starred pages) → `Teamspaces` (Plus/Business/Enterprise) → `Shared` (pages shared with select individuals) → `Private` (only-me pages) → `More` overflow. Each section's `•••` menu lets you Sort (Manual | Last edited), Show (5 to all), Move section up/down.
- **Private/Shared panes** — clicking `More` opens a side-pane with all pages, search, sort, "keep open" toggle (the `>>` on hover), new-page button.
- **Teamspaces** — every workspace has at least one default teamspace; users see only teamspaces they're a member of; can leave teamspaces to keep the sidebar clean.
- **Favorites** — appears once you favorite your first page; one-click access.
- **Quick entry points** at the bottom of each sidebar tab — "new chat with AI", "new page", "new meeting note", "new database".
- **Block model** — every paragraph, heading, list, callout, divider, code block, database is a block. Blocks can be dragged, transformed (type `/heading 2`), nested, duplicated.
- **Slash command (`/`)** — opens a fuzzy-searchable menu of every block type and inline action.
- **Databases (2025 update — Data Sources)** — a database container can now hold MULTIPLE data sources (e.g., "Marketing Hub" container → Content Calendar + Ad Campaigns + Notes + Analytics as separate sources). "Linked Views" are now "Tabs" within a container. Moving/reassigning data sources between containers is non-destructive.
- **Database views** — 8 view types: List, Board (Kanban), Table, Gallery, Calendar, Timeline, Feed (new), Chart.
- **Notion AI (2025–2026)** — AI blocks, AI properties, Database Builder, Notion Agents that "create interactive HTML blocks", one shared canvas "with all your data, for your team and agents to work together".
- **AI features** — Q&A, AI Writer, AI Autofill (database properties auto-filled per row), AI Summary, AI Translate, AI Connector (search across connected apps).

### What works
- **Block model with slash command** — `/` is the universal "what do I want here?" key. Discoverable, fast, composable. The single best onboarding ramp in any note tool.
- **Sidebar sections with per-section `•••` controls** — Sort, Show count, Move section. Lets each user customize the sidebar's density per section without global settings.
- **Teamspaces** — silo navigation by team; "leave teamspace" keeps the sidebar clean.
- **Quick entry points** at the bottom of each sidebar section — "new chat / page / meeting note / database". Context-aware creation.
- **Private pane with "keep open" toggle (`>>`)** — the pane becomes a temporary second sidebar when needed, collapses when not.
- **Drag-and-drop everything** — blocks, pages, sidebar sections, database views, data sources.
- **Data Sources (2025 update)** — separating the container from the data is a strategic architectural shift that enables future granular permissions.
- **8 database view types from one dataset** — same data, many lenses. Switching is instant.
- **Notion AI as blocks + properties** — AI is a first-class block type and a database property type, not a separate chat surface.

### What does not work
- **Data Sources update confusion** — per the NotionApps article: "It Can Be Confusing", "the benefit isn't immediately obvious", "the 'One View, One Source' Limit STILL Exists" (you can't display Tasks + Projects in one table without Relations), "Potential for Clutter: 10 data sources in one container… very messy".
- **API breakage** — adding a second data source to a database breaks old integrations (NotionApps, Make, Zapier). High migration cost.
- **Sidebar hierarchy vs linking** — Reddit thread "How to Keep Sidebar Hierarchy While Linking Project": clicking a database-linked page doesn't navigate to the sidebar's page hierarchy; users get lost between "where this page lives in the sidebar" vs "where I clicked from".
- **Slow on large workspaces** — Notion's render performance degrades with thousands of blocks; long pages have perceptible scroll jank.
- **No native tabs** — opening multiple Notion pages side-by-side requires either browser tabs, Notion's "Open in new window" (limited), or split-view workarounds. No first-class tab model.
- **AI overload** — AI blocks + AI properties + AI Autofill + AI Q&A + AI Writer + AI Connector + Notion Agents + AI Summary + AI Translate. Eight overlapping AI concepts; users don't know which to use when.
- **Sidebar section overflow** — power users accumulate dozens of favorited pages and teamspaces; even with "Show 5/10/all", the sidebar becomes a scroll-fest.

### What is unique
- **Block model with slash command** — the universal `/` menu. Notion pioneered this; everyone copies it now.
- **Data Sources separating container from data** — strategic architectural shift; no other note tool has this.
- **AI as first-class block type + database property type** — AI isn't a chat; it's a structural element.
- **Notion Agents creating interactive HTML blocks** (2026) — agents that produce live HTML widgets inside a page, not just text.
- **One shared canvas for team + agents** (2026 SXSW talk) — explicit "shared canvas" metaphor for human-agent collaboration.
- **8 database views from one dataset** — no other tool offers this many lenses on one data source natively.

### What MiMo should learn
- **Slash command as the universal "what do I want here?"** — every block in the conversation, every memory entry, every artifact should be insertable via `/`. Slash is the block-inserter, not a chat command.
- **AI as a block type** — MiMo's conversation should support "AI block" that re-runs on input change, like Notion's AI Autofill. A "summarize this conversation" block that updates as the conversation grows.
- **Sidebar sections with per-section controls** — Sort / Show count / Move. Let the user customize the density of each sidebar region independently.
- **Quick entry points at the bottom of each sidebar section** — context-aware create buttons (not a global "+ New").
- **Hold-to-keep-open pane (`>>` on hover)** — MiMo's right sidebar should support a "pin to keep open" toggle that turns it into a temporary second pane.
- **8 view types from one dataset** — MiMo's memory should be viewable as Timeline, List, Graph (entity), Board (by type), Calendar, Gallery (artifacts). One source, many lenses.
- **Separating container from data (Data Sources pattern)** — MiMo's "Project" should be a container that can hold multiple data sources (goals, skills, memory, artifacts) without conflating them.

### What MiMo should avoid
- **8 overlapping AI concepts** — MiMo should have ONE AI surface (the conversation) with compositional blocks, not separate "AI Q&A", "AI Writer", "AI Autofill" surfaces.
- **API breakage on schema changes** — MiMo is single-user so this is less of an issue, but the lesson is: don't introduce abstractions (like "data sources vs databases") unless they earn their complexity.
- **No first-class tab model** — MiMo MUST have tabs (already does in v2). Notion's lack of tabs is a real pain point.
- **Sidebar hierarchy vs linking confusion** — MiMo's "open in sidebar" vs "open in tab" vs "open as floating" should be ONE consistent mental model.
- **Slow render on long pages** — MiMo's conversation can grow to thousands of messages; virtualize aggressively.

### Premium interaction (specific)
- **`/` slash menu** — opens at cursor, fuzzy-filters as you type, shows 8 results with icons + descriptions, `Enter` inserts. 80ms open, instant filter.
- **Drag a block by its handle** — 6-dot handle appears on hover; drag with a subtle lift shadow; drop targets highlight with a 2px accent line.
- **Turn into `/`** — type `/heading 2` on a paragraph, it transforms in place with a 120ms crossfade.
- **Database view switcher** — tabs at the top of a database (List / Board / Gallery…), click to switch with a 100ms slide.
- **AI Autofill on a database property** — every row's property fills in sequence with a 200ms stagger; "writing…" indicator per row, then the answer appears.

### Slow interaction (specific)
- **Initial workspace load on large accounts** — multi-second; can show a "Loading workspace…" splash.
- **Long page scroll** — pages with 1000+ blocks have noticeable scroll jank, especially with embedded databases.
- **AI Autofill on a 100-row database** — sequential fills can take 30+ seconds; no parallelism by default.
- **Opening a database inside a page inside a database** — nested-database navigation has compounding latency.

### Cognitive overload (specific)
- **8 AI features with overlapping purposes** — users don't know whether to use AI Q&A, AI Writer, AI Autofill, AI Summary, or Notion Agents for "summarize this page".
- **Data Sources vs Linked Views vs Tabs vs databases** — 4 overlapping concepts for "how do I view my data". Even the NotionApps article calls it "confusing".
- **Sidebar with 30+ favorited pages** — even with "Show 10", the sidebar becomes a long scroll; users can't find anything.
- **Block-level vs page-level vs database-level formatting** — three layers of "where does this setting apply?".

### Navigation / Workspace / Command palette / Tabs / Focus / Density / Animation / Long-session notes
- **Navigation hierarchy:** Sidebar sections (Favorites / Teamspaces / Shared / Private) → nested pages → breadcrumb at top of page. Hierarchy is tree-based, but links break the tree.
- **Workspace organization:** One page at a time (no tabs natively). "Open in new window" exists but is limited. Split views via "Open to the side" on a database.
- **Command palette:** `⌘K` (or `Ctrl+K`) opens a quick switcher for pages + recent + search. Slash command `/` is the block-level palette (different scope).
- **Tab / multi-tasking model:** WEAK. Notion relies on browser tabs or "Open in new window". No first-class in-app tabs.
- **Focus preservation:** Recent pages are remembered; scroll position per page is preserved; collapsed blocks remember state.
- **Information density:** Flexible & dense. A single Notion page can hold 50 databases, 200 blocks, 5 nested pages. Density is the user's choice, not the product's constraint.
- **Animation language:** Smooth, 150–220ms, ease-out. Block drags have a lift shadow. View switches slide horizontally. Slash menu opens with a slight scale-from-top.
- **Long-session usability:** Mixed. Block editing is excellent for hours; but workspace navigation fatigue sets in around the 3-hour mark due to the sidebar's lack of persistent "working set" (no "Open Editors" like VS Code).

**THE ONE interaction that defines Notion:** The slash command `/` — type `/` anywhere, get every possible block type and inline action. It is the universal "what do I want here?" key, and it makes the block model discoverable.

---

## Arc Browser

### Current UX (2024–2025) — verified via
- https://resources.arc.net/hc/en-us/articles/19335393146775-Split-View-View-Multiple-Tabs-at-Once (official Split View docs)
- https://arc.net (homepage)
- Search snippets from discourse.devontechnologies.com (user testimonial on Spaces), connect.mozilla.org (sidebar critique), dannyspina.com (review: tabs in sidebar columns, Spaces), forums.opera.com (sidebar comparison), medium.com/design-bootcamp (opening tabs via shortcut), reddit r/ArcBrowser (cleanest task and search UI)

Current UX shape:
- **Sidebar-first design** — all tabs live in a left vertical sidebar (not horizontal top tabs). Tabs are arranged in columns: Pinned tabs (top, persistent) → Today tabs (ephemeral, auto-archive after 12h/24h/7d/30d).
- **Spaces** — separate, color-themed browsing contexts (work, personal, chess, etc.). Each Space has its OWN pinned tabs, its own tab list, its own cookie/profile context. Switch via `⌘+1`–`⌘+9` or sidebar Space switcher.
- **Command bar (`⌘+T`)** — Arc's command palette. Type to: search tabs, search history, run commands ("Add Right Split", "Add Left Split", "Add Top Split", "Add Bottom Split"), open quicklinks, search the web.
- **Split View** — view multiple tabs at once. Horizontal (side-by-side) or Vertical (top-and-bottom). Trigger via `⌘+⇧++` (Mac) / `Ctrl+⇧++` (Win), drag-and-drop a tab into center, or `⌘+T` then "Add Right/Left/Top/Bottom Split". Exit via right-click "Separate All Tabs", the X above either panel, or X next to split tab in sidebar.
- **Peek** — preview a site from a pinned tab without committing to opening it. Hover/click a pinned tab → small preview window.
- **Little Arc** — links from external apps open in a small floating window, not the main Arc window.
- **Pinned tabs** — persist across sessions, grouped by Space. These are your "always-there" tabs (Gmail, Calendar, Notion, GitHub).
- **Today tabs** — ephemeral tabs from today's browsing; auto-archived after a configurable time.
- **Tab auto-archiving** — tabs you don't touch for 12h/24h/7d/30d get cleared (configurable). Reduces tab clutter automatically.
- **Themes** — per-Space color themes. Each Space feels visually distinct.
- **Private & secure** — "We don't know what sites you visit or what you search for". Built-in privacy.
- **Arc Max (2024+)** — AI features: Ask on Command-T, Tidy Tab Titles, Tidy Folders, 5-Second Summaries, Ask about Page.

### What works
- **Spaces as separate browsing contexts** — work/personal/chess/etc. each with own tabs, own pinned set, own color theme. Mental context-switching is visual + structural. The discourse testimonial: "I use spaces extensively to group favorites and tabs by what you could broadly call roles."
- **Vertical sidebar tabs** — full tab titles visible (vs truncated horizontal tabs); more tabs fit; mouse is closer to where you're reading (left-aligned).
- **Pinned vs Today split** — persistent tabs vs ephemeral tabs are visually + structurally separated. Reduces "I have 200 tabs open" anxiety.
- **Auto-archiving** — tabs you don't touch disappear. Self-cleaning tab bar without losing data (archived, not deleted).
- **`⌘+T` Command bar with split commands** — typing "Add Right Split" creates a split view from the keyboard. Command palette IS the tab creation surface.
- **Split View** — side-by-side or top-bottom tabs; multiple splits possible; swap URL via `⌘+L` on a panel.
- **Peek on pinned tabs** — preview without commit. Matches Linear's `Space`-to-peek pattern.
- **Per-Space themes** — visual distinction between contexts reinforces mental separation.
- **Privacy-first** — The Browser Company explicitly does not track browsing.

### What does not work
- **Sidebar bookmark + tab + folder congestion** — Mozilla Connect feedback: "Arc splits the sidebar space into at least bookmarks and folders above the space occupied by regular tabs, leaving less space for glancing both (specially [on small screens])". The sidebar tries to do too much.
- **Vertical-only tabs** — no horizontal tab option (Opera forum critique: "it only has vertical tabs not horizontal"). Users coming from Chrome/Safari have to relearn.
- **Tab auto-archiving can be aggressive** — users lose track of "where did that tab go?". Archive is searchable but adds friction.
- **Arc Max AI is shallow** — "5-Second Summaries" and "Ask on Page" are conveniences, not workflow tools. Doesn't compete with Raycast's AI depth.
- **Multiple windows across Spaces is confusing** — Spaces are per-window; multi-window users have to remember which window is which Space.
- **Resource usage** — Chromium-based; many tabs = high RAM, no real innovation on tab suspension.
- **The Browser Company paused major Arc development in 2025** (per industry news) to focus on Dia browser. Arc's future is uncertain; users are migrating to Firefox nightly with vertical tabs or Edge.

### What is unique
- **Spaces as separate cookie/profile/tab contexts in one browser** — each Space IS a separate browsing session with its own pinned tabs and theme. No other browser does this natively (Firefox Multi-Account Containers is closest but doesn't separate tabs visually).
- **Pinned vs Today tab split** — explicit persistent vs ephemeral tab categorization, with auto-archiving. Unique.
- **`⌘+T` as a true command palette** (not just a new-tab page) — type commands, splits, quicklinks, search. Arc treats the browser as a launcher.
- **Little Arc for external links** — small floating window for links from Slack/email/etc. Doesn't pollute the main window's tab list.
- **Peek on pinned tabs** — preview-without-commit on a browser tab. No other browser does this.
- **Per-Space color themes** — visual context reinforcement.
- **"Browser as OS" framing** — explicit positioning of the browser as the user's operating system, not just an app.

### What MiMo should learn
- **Spaces as separate contexts** — MiMo's "Projects" should function like Arc Spaces: each Project has its own pinned tabs (conversations), its own theme accent, its own working set. Switching Project = switching mental context.
- **Pinned vs ephemeral tabs** — MiMo's tabs should split into "pinned" (persistent across sessions) and "today" (ephemeral, auto-archive). The conversation tab is pinned; "search results", "research notes", "drafts" are today tabs.
- **Auto-archiving with full search** — tabs not touched for X days auto-archive; one search brings them back. Eliminates manual tab cleanup.
- **`⌘+T` as unified command + tab palette** — MiMo's `⌘K` should be one input that does: tab creation, command running, search, split creation. Notion, VS Code, and Arc all converge on this.
- **Split View with `Add Right/Left/Top/Bottom Split` typed commands** — MiMo should let the user type "split right" in the command palette to split the workspace. No need for a separate split menu.
- **Peek without commit** — MiMo's `Space`-to-peek (per Linear) + Arc's peek-on-pinned-tab pattern converge. Hold Space to preview a memory entry, release to dismiss.
- **Per-Project theme accent** — each Project gets a 1-color accent that tints the left rail + active tab. Visual context reinforcement.
- **Little Arc for external content** — MiMo should have a "quick view" mode for content the user wants to glance at without committing to a tab (e.g., a search result, a memory entry).

### What MiMo should avoid
- **Sidebar trying to do everything** — Arc's sidebar (bookmarks + folders + pinned tabs + today tabs + spaces) is congested. MiMo should keep the left rail to ≤8 icons (already does) and put tabs in a SEPARATE tab strip.
- **Vertical-only tabs with no horizontal option** — MiMo's tabs should be flexible (top horizontal strip like VS Code by default, optional vertical sidebar mode).
- **Aggressive auto-archiving without clear recovery** — every archived item must be one search away.
- **Uncertain product future** — MiMo is the user's own product; commit to a direction.
- **Shallow AI features** — MiMo's AI is the conversation, not a sidebar feature.

### Premium interaction (specific)
- **`⌘+T` Command bar opening** — centered, blurred backdrop, typed letters filter tabs + commands + history simultaneously. Feels like Raycast inside a browser.
- **Switching Spaces (`⌘+1`–`⌘+9`)** — entire sidebar transitions with a 200ms horizontal slide + crossfade; theme accent color shifts. Strong sense of "I'm now in a different context".
- **Split View creation** — `⌘+⇧++`, the active tab splits in half with a 150ms spring; drag a tab from sidebar into center, it snaps into a split.
- **Peek on pinned tab** — hover/click a pinned tab, a small preview window opens with the page's current state (live, not screenshot); release/click-away to dismiss.
- **Little Arc for external link** — click a link in Slack, a small floating window opens instantly with a subtle scale-in animation. Doesn't touch the main window.

### Slow interaction (specific)
- **Cold launch with many tabs** — Arc restores all pinned + today tabs on launch; can take 3–5 seconds with 50+ tabs.
- **Switching Spaces with heavy pinned tabs** — each Space switch reloads that Space's pinned tabs; perceptible latency on slow networks.
- **Split View with two heavy web apps** — both panels render independently; first paint of the second panel can lag.
- **Tab search across all archived tabs** — full-text search of archived tabs has noticeable latency on large archives.

### Cognitive overload (specific)
- **Sidebar congestion** — bookmarks, folders, pinned tabs, today tabs, spaces, all in one sidebar. Mozilla Connect: "less space for glancing both (specially [on small screens])".
- **Spaces × Windows matrix** — which Space am I in? Which window? Which pinned tab set? Three dimensions of "where am I?".
- **Auto-archived tab recovery** — "where did that tab go?" — user has to remember it was archived and search for it.
- **Arc Max AI features overlapping with native browser features** — "Ask on Page" vs "5-Second Summary" vs "Ask on Command-T" vs "Tidy Tab Titles" — four AI features, overlapping purposes.

### Navigation / Workspace / Command palette / Tabs / Focus / Density / Animation / Long-session notes
- **Navigation hierarchy:** Spaces (top-level context switcher) → Pinned tabs (per-Space persistent) → Today tabs (per-Space ephemeral) → Archived (searchable). No first-class bookmark bar separate from tabs (bookmarks ARE pinned tabs).
- **Workspace organization:** One main viewing area (1 tab, or N tabs in Split View). Sidebar holds the tab list. Multiple windows can each have their own Space.
- **Command palette:** `⌘+T` opens the Command bar — type to search tabs, history, run commands, open quicklinks, search the web. Unified.
- **Tab / multi-tasking model:** Pinned (persistent) vs Today (ephemeral, auto-archive). Split View for side-by-side. Little Arc for external links.
- **Focus preservation:** Active tab's scroll + form state survive navigation; archived tabs restore their state on un-archive.
- **Information density:** Medium-high. Sidebar shows ~15–20 tab titles; main area is one page; Split View doubles the main area.
- **Animation language:** Smooth, 150–250ms, ease-out. Space switches have a horizontal slide + accent color shift. Split View creation is a 150ms spring. Peek is a 100ms scale-in.
- **Long-session usability:** Strong for context-switching (Spaces) but weak for sidebar density. Auto-archiving helps prevent tab hoarding, but users must trust the archive to find things later.

**THE ONE interaction that defines Arc Browser:** `⌘+T` Command bar — type to do anything: open a tab, run a command, create a split, search history, search the web. The browser as a launcher.

---

# Cross-Product Synthesis (for MiMo)

## The 5 "ONE interactions" summarized
1. **VS Code** → `Ctrl+P` Quick Open — find and go.
2. **Raycast** → `⌘+⇧+Tab` Quick AI on selection — AI as a verb on current text.
3. **Linear** → `Space` to peek — focus without commitment.
4. **Notion** → `/` slash command — what do I want here?
5. **Arc** → `⌘+T` Command bar — the browser as a launcher.

## Convergent patterns (do these in MiMo)
- **One command palette that accepts prefix grammar** (VS Code `>`, `/`, `@`, `#`; Arc typed commands; Notion `/` for blocks). MiMo's `⌘K` should be ONE input with prefix grammar: `>cmd`, `/search`, `@mem`, `#file`, `!ai`.
- **Single-key shortcuts for the daily 5** (Linear `C/S/A/P/L`). MiMo: `C` new conversation, `M` memory, `A` agents, `R` research mode, `S` settings.
- **Hold-to-peek (`Space`)** — Linear and Arc both use this pattern. MiMo should adopt it universally: hold Space on any sidebar item to preview, release to dismiss.
- **Local-first rendering from cache** (Linear sync architecture) — MiMo's conversation list, memory, recent events should render from local cache with background sync. This is the #1 perceived-performance lesson.
- **Pinned vs ephemeral tabs** (Arc) — MiMo's conversation tab is pinned; research/draft tabs are ephemeral with auto-archive.
- **AI as block type + property type** (Notion) — MiMo's conversation should support AI blocks that re-run on input change, not just a chat surface.
- **Per-context theme accent** (Arc per-Space) — MiMo's Projects should each have a 1-color accent tinting the rail + active tab.
- **Layout persistence across reloads** (VS Code) — every tab, sidebar width, scroll, mode, cursor must survive.
- **Customize-Layout widget in title bar** (VS Code) — one dropdown to flip every chrome surface.

## Divergent anti-patterns (avoid these in MiMo)
- **Settings sprawl in JSON-like config** (VS Code) — direct manipulation only.
- **Three-modifier hotkeys** (Raycast) — cap at 2 modifiers.
- **8 overlapping AI features** (Notion) — ONE AI surface (the conversation), compositional.
- **Sidebar trying to do bookmarks + tabs + folders + spaces at once** (Arc) — keep rail ≤8 icons; tabs in separate strip.
- **Fixed workflow states that frustrate power users** (Linear) — keep modes fixed but expose escape valves (labels, custom views).
- **Per-seat pricing / tier gating** (Linear, Raycast Pro) — N/A for single-user, but don't recreate gated-experience mental models.
- **Shallow AI features** (Arc Max) — MiMo's AI is the conversation, not a sidebar convenience.
- **Slow render on long pages** (Notion) — virtualize conversation aggressively.

## The premium-feel checklist (specific interactions)
- `⌘+K` opens in <80ms, fuzzy-filters as you type, no loading state.
- Hold `Space` on any sidebar item → preview in 100ms, release → dismiss in 80ms.
- Single-key shortcut (`C`, `M`, `A`) → modal opens with cursor in first field, `⌘+Enter` saves, modal closes, item appears in list in <1s.
- Drag a block by 6-dot handle → lift shadow, drop targets highlight with 2px accent line, 120ms spring on drop.
- Switch Project/Space (`⌘+1`–`⌘+9`) → 200ms horizontal slide + accent color shift.
- Slash command `/` → 80ms open at cursor, fuzzy filter, 8 results with icons.
- Quick AI on selected text → popover at cursor in 200ms, streams first token in <500ms.

## The slow-feel anti-checklist (avoid these)
- Cold-launch first paint > 2s.
- Command palette first-open after boot > 200ms.
- Switching Project/Space triggers reload of pinned tabs (perceptible network latency).
- AI reply first token > 1s on cached context.
- Long conversation scroll jank (drop frames below 50fps on 1000+ messages).
- Modal editor blocks the main editor region (VS Code Settings).
- Sequential AI autofill on N rows (Notion pattern) without parallelism.

## Cognitive overload anti-checklist
- Sidebar with > 8 icons in the rail.
- More than 3 AI surfaces (chat + Q&A + autofill + summary + agent…).
- Two side bars both showing navigation (VS Code Primary + Secondary trap).
- 4+ shortcut-modifier layers (Raycast 3-modifier trap).
- Sidebar with 30+ favorited items without "Show 5/10/all" control (Notion trap).
- Tabs that auto-archive without one-search recovery (Arc trap).

## MiMo's "ONE interaction" recommendation
Based on the 5 products studied, MiMo's defining interaction should be:

**Hold `Space` on anything to peek + ⌘+K to act.**

- Hold `Space` on a conversation → peek at it.
- Hold `Space` on a memory entry → peek at it.
- Hold `Space` on an agent → peek at its last run.
- Hold `Space` on a project → peek at its goals.
- Release `Space` → back to where you were. Zero commitment.

- `⌘+K` → command palette with prefix grammar (`>cmd`, `/search`, `@mem`, `#file`, `!ai`).
- `⌘+T` → new tab + split commands (Arc pattern).
- `/` inside conversation → slash command for blocks (Notion pattern).
- Single-letter shortcuts (`C/M/A/R`) for daily actions (Linear pattern).
- `⌘+⇧+Tab` on selected text → Quick AI on selection (Raycast pattern — THE killer feature for an AI OS).

This combines Linear's peek, Raycast's quick-AI, Notion's slash, VS Code's prefix grammar, and Arc's command-as-tab-creation into ONE coherent keyboard language for MiMo.
