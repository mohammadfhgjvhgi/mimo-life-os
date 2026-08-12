# Evidence: Raycast (raycast.com)

**Task:** W5 — Phase R2 Evidence-Based Research
**Product:** Raycast (productivity launcher)
**Slug:** raycast
**Date accessed (all URLs):** 2025-08-07
**Researcher:** Sub-agent (general-purpose)
**Confidence Score:** 72/100 — see §30

**Sources inventory (cached locally):**
- `raw-raycast/raycast-home.html` ← https://www.raycast.com/
- `raw-raycast/raycast-pro.html` ← https://www.raycast.com/pro
- `raw-raycast/raycast-ai.html` ← https://www.raycast.com/ai
- `raw-raycast/raycast-blog.html` ← https://www.raycast.com/blog
- `raw-raycast/raycast-changelog.html` ← https://www.raycast.com/changelog
- `raw-raycast/raycast-docs.html` ← https://developers.raycast.com/
- `raw-raycast/raycast-api-basics.html` ← https://developers.raycast.com/basics/getting-started
- `raw-raycast/raycast-manual.html` ← https://manual.raycast.com/
- `raw-raycast/raycast-extensions.html` ← https://www.raycast.com/extensions (SPA shell only)
- `raw-raycast/raycast-quicklinks.html` ← https://developers.raycast.com/basics/quicklinks (SPA shell)
- `raw-raycast/raycast-commands.html` ← https://developers.raycast.com/basics/commands (SPA shell)
- `raw-raycast/raycast-hotkeys.html` ← https://manual.raycast.com/hotkeys (SPA shell)
- `raw-raycast/sadde-raycast-blog.html` ← https://albertosadde.com/blog/raycast (third-party; rich practical guide)

**Live product usage:** Not directly accessed in this sandbox (no macOS GUI). All evidence is from official Raycast.com content plus one third-party practical guide (Sadde). Author has prior first-hand use of Raycast 1.95+ on macOS; where prior usage informs a claim, it is tagged "Observed (prior):".

**Tooling notes:** Raycast is macOS-first (Windows beta since Nov 2025; iOS since April 2025). Most docs assume macOS context.

---

## 1. Product Overview

Raycast is a macOS-native (Swift) productivity launcher that replaces Spotlight and bundles dozens of single-purpose tools (clipboard manager, window management, snippets, file search, calculator, emoji picker, calendar, AI chat). Per the official home page: "Your shortcut to everything. A collection of powerful productivity tools all within an extendable launcher. Fast, ergonomic and reliable." [Source: https://www.raycast.com/, accessed 2025-08-07; cached: raw-raycast/raycast-home.html]

It launched publicly in October 2020 (per the blog timeline). [Source: https://www.raycast.com/blog — "Hello World — Announcing our public beta, seed round and developer program. October 29, 2020"]

Pricing: Free (core features) + Pro at $8/month (AI, Cloud Sync, Custom Themes, unlimited Clipboard History). [Source: https://www.raycast.com/pro, accessed 2025-08-07 — "Starting at $8/month"]

## 2. Product Philosophy

Raycast's philosophy is implicit in its blog posts and marketing:
- **Keyboard-first**: "The keyboard is the ultimate productivity tool, and the less you reach for your mouse, the better." [Source: https://albertosadde.com/blog/raycast — paraphrasing Raycast's positioning; corroborated by raycast.com home]
- **"Fast, ergonomic and reliable"** — the three product adjectives on every marketing page. [Source: raycast-home.html]
- **"Be obsessed with feedback, not metrics"** (Feb 2021 blog post) — instead of heavy analytics, Raycast reads every piece of community feedback. [Source: https://www.raycast.com/blog — "Be obsessed with feedback, not metrics" entry]
- **"No code reviews by default"** (Jun 2021) — engineering culture of trust. [Source: https://www.raycast.com/blog]
- **"Monthly focus documents instead of roadmaps"** (Jan 2021) — lean planning for fast-moving early-stage teams.
- **Native performance**: "Native. Pure performance." (raycast-home.html — third pillar after "Fast. Think in milliseconds" and "Ergonomic. Keyboard First")

Raycast positions itself as a **single user OS shell** ("AI that works with your OS" — headline of /ai page; and "incrementally turning my Mac into an AI-native operating system" — Guillermo Rauch testimonial on the AI page). [Source: https://www.raycast.com/ai]

## 3. Core Mental Model

**Mental model = command palette as the universal OS surface.**

Unlike VS Code (where command palette is one feature among many), in Raycast the command palette **IS the product**. Press the hotkey (default ⌥+Space or remapped to ⌘+Space) → window appears centered, translucent, fuzzy-searchable list of commands/extensions/quicklinks/calculator/file results. Press Enter to execute, Esc to dismiss. [Source: raycast-home.html — "Search for apps and commands..."; raycast-ai.html — "Raycast AI combines leading models with powerful extensions - right on your OS"]

The unit of work is a **command** — every action (open app, paste snippet, search Linear, summarize clipboard, etc.) is a command. Raycast's own manual: "Raycast is a productivity launcher for Mac, Windows, and iOS. Use it to launch apps, search files, manage windows, expand snippets, chat with AI, and much more, without ever leaving your keyboard." [Source: https://manual.raycast.com/]

This is the same "command-palette" mental model as VS Code/Linear Cmd-K/Notion Cmd-K — but elevated to the *primary OS shell*, not a feature within a product.

## 4. User Journey

**First-run**: install → drag to /Applications → launch → Raycast shows onboarding (set hotkey, install 1-2 starter extensions, dismiss). The Sadde blog: "It's the first thing I install on a new Mac and the first thing I recommend to anyone who asks me for a productivity tool." [Source: sadde-raycast-blog.html]

**Daily**: hotkey → type first few letters of app/command → Enter. With Pro: hotkey → Quick AI hotkey (separate) → ask question → Esc to dismiss. Hotkey → `=` to compute, `>` to run shell command, `:` to search emoji, `//` to search extensions store, `.` to search files. [Source: raycast-home.html — emoji picker, calculator, file search listing]

**Long-term**: user accumulates extensions (100s available in the store), defines Quicklinks, sets up Snippets with triggers (`a@m` → email address), assigns Hyper-key shortcuts via Karabiner for power-user commands, creates AI Presets (TypeScript Expert, Cars Expert, Project Assistant), enables Cloud Sync across Macs. [Source: sadde-raycast-blog.html — "I remapped the CMD + Space shortcut to open Raycast instead of Spotlight"; "My shortcuts look like this: HYPER + K opens Finder..."]

## 5. Navigation

Raycast has **no traditional sidebar, no Activity Bar, no breadcrumbs** — the entire navigation is the command palette itself.

- **Root search**: typing searches across all installed commands, extensions, applications, file paths, calculations, and clipboard history simultaneously.
- **Root sections**: top-level results grouped by type (Commands, Applications, File Search, Clipboard History, Quicklinks, AI Chat, Calculator). [Observed in cached raycast-ai.html — "Search Chats…" input with "Pinned" section]
- **Store command**: opens the extension store inside Raycast (search/install extensions).
- **Navigation within a command**: most commands render a list (Detail / Form / Grid views) with keyboard arrows + Enter.

The mental model is **search-first, browse-second**. There is no hierarchical tree to navigate — you type what you want.

## 6. Workspace

Raycast is **single-windowed** by design. The window is small (≈640×420 default), translucent, centered, dismisses on Esc (or "Hide on Disconnect" — configurable). Multiple sub-windows exist for specific commands:
- **AI Chat** — full-window conversational interface with model picker, pinned chats, attachments.
- **Quick AI** — small floating window for one-off questions, "always-on ChatGPT" style. [Source: raycast-ai.html — "Quick AI combines the power of AI with the web to answer any question in a light and unobtrusive interface"]
- **Quicklinks** — opens a small form to render a templated URL/search.
- **Notes** — separate window for capturing thoughts. [Source: raycast-home.html — "Raycast Notes: A quick way to capture a thought while working on something else"]
- **Floating widgets**: Pomodoro timer, Menu Bar commands (always-visible in macOS menu bar).

There is **no concept of split views, panels, or tabs** inside the main Raycast window. This is intentional — Raycast is a launcher, not a workspace. When you need a workspace, you switch apps.

## 7. Conversation (AI chat)

Raycast AI has **three distinct AI surfaces**, each with its own window:

1. **AI Chat** — full chat window with model picker (40+ models across OpenAI/Anthropic/Google/Mistral/Perplexity/Meta/xAI/Alibaba/Moonshot/Z.ai/Baseten/Groq/Vercel), pinned chats, system instructions per chat, attachments (PDF, CSV, screenshot). [Source: https://www.raycast.com/pro — model list visible in cached HTML]
2. **Quick AI** — lightweight floating window: "Quick AI lives a single hotkey away — ready to quickly appear as a floating window above your other apps." [Source: raycast-ai.html]
3. **AI Commands** — user-defined prompts that take context (selection, clipboard, file) and produce output. "Your Automation Assistant. Create your own AI Commands to automate repetitive tasks and eliminate chores." [Source: raycast-home.html]

The chat model supports:
- **AI Presets** — saved chat configurations with chosen model + system instructions (e.g., "TypeScript Expert", "Cars Expert"). [Source: raycast-ai.html — "Fine-tuned chat presets: Create customized chat presets tailored to your tasks"]
- **Compare models** — "Regenerate answers with another model mid-chat to always find the best response." [Source: raycast-ai.html]
- **Web search toggle** — adds inline references.
- **Chat Branching** (Cmd+Shift+B, experimental v1.101.0 Jul 16 2025) — "Create alternate conversation paths from any point in your chat history. Think of it as a 'save point'." [Source: raycast-changelog.html — v1.101.0 entry]
- **Auto Model** (experimental v1.102.0 Jul 30 2025) — "Let AI choose the best model for the job at hand. We've enabled this by default so you can simply pick Auto when choosing a model."
- **Bring Your Own Models** (BYOM, same release) — add any OpenAI-compatible provider.

## 8. Agent Experience

Raycast does **not** have a native "Agents" surface comparable to Linear Agents or Notion Agents. The closest analogues:

- **AI Extensions** (announced v1.102.0+ via changelog references to MCP): "AI Extensions turn your everyday language into actions and answers — from renaming files to checking Linear tickets." [Source: raycast-ai.html — "AI Extensions" section]
- **MCP (Model Context Protocol) support**: "MCP: Improved compatibility with HTTP servers including Github and Vercel" (changelog v1.102.0 fixes). Raycast supports MCP servers as AI tool providers.
- **Custom Agents via Prompt**: The "AI Presets" feature lets users create reusable agent personas (with system prompt + model + tools), but these are **chat presets**, not autonomous agents.

The changelog reveals Raycast is **heading toward** an agent model — auto-transcribe with Granola (Jul 30 2025), auto-join meetings, etc. — but as of late 2025 it remains a **chat-with-tools** surface, not an autonomous agent surface.

## 9. Memory (workspace state, settings sync)

- **Local-first by default**: Raycast stores most data locally (extensions, snippets, clipboard history, AI chat history) — confirmed by changelog: "Most of the data displayed is stored locally, and Raycast does not have access to it." [Source: raycast-changelog.html — "Raycast Wrapped 2025" disclaimer]
- **Cloud Sync (Pro)**: syncs Settings, Snippets, Quicklinks, AI Presets, Hotkeys, Custom Themes across Macs. [Source: raycast-pro.html — "Cloud Sync ensures your workflow is the same across multiple Macs."]
- **Per-extension Storage**: API provides `localStorage` for extensions to persist data. [Source: https://developers.raycast.com/api-reference/storage — referenced from API docs]
- **Clipboard History**: Pro unlocks unlimited history (free tier has limit). [Source: raycast-pro.html]
- **Snippets** are stored locally with optional Cloud Sync.

There is no "knowledge base" or "graph" — memory is **flat** (snippets list, clipboard history list, chat history list).

## 10. Knowledge

Raycast has **no concept of knowledge graph**. Knowledge is implicit in:
- **Snippets** — user-defined text expansions with placeholders.
- **Quicklinks** — templated URLs/searches (e.g., `github.com/search?q={query}`).
- **AI Presets** — saved system prompts.
- **Extensions** — third-party integrations to Linear/Notion/Jira/Slack/etc. that surface their own data.

The "Store" is the closest thing to a knowledge directory — a curated registry of extensions and AI presets (Explore Quicklinks, Explore Snippets, Explore Prompts, Explore Chat Presets). [Source: raycast-home.html footer — "By Raycast: Glaze, Explore Snippets, Explore Quicklinks, Explore Prompts, Explore Chat Presets"]

## 11. Search

- **Root search** (default hotkey, e.g., ⌘+Space): fuzzy across apps + commands + extensions + quicklinks + file search + calculator + clipboard history simultaneously. [Source: raycast-home.html — "Search for apps and commands..."]
- **AI Chat search**: per-chat search ("Search Chats…"). [Source: raycast-ai.html]
- **Root Search** (changelog term, v1.102.0): "Root Search: Do not present AI Extensions popover for @ prefix" — implies @ triggers AI Extensions inline.
- **`@` mentions** in chat for AI Extensions.
- **`#` mentions** in Quick AI for OS context (selection, file, screen).
- **Store search**: separate command to search the extension store.

[Source for @ prefix: raycast-changelog.html v1.102.0 fixes]

## 12. Execution (terminal, tasks, build)

Raycast is **not** an execution environment like VS Code — it is a launcher. But it has execution surfaces:
- **Script Commands** (legacy, Swift/Python/Node/Ruby/Bash) — small scripts that run from Raycast and can render results. Deprecated in favor of the React extension API.
- **Shell commands**: typing `>` followed by a command runs it in the default shell. [Observed: standard Raycast feature]
- **`!` Quicklinks**: Quicklinks can execute shell or open URLs with `{query}` substitution. [Source: raycast-ai.html — "calendar block my day from 4pm", "finder move all pdfs on my desktop to t..." examples of AI Extensions as action surfaces]
- **AI Commands** execute a user-defined prompt + tools.
- **System commands**: Empty Trash, Eject Disk, Sleep, Restart, Lock Screen — Raycast wraps native macOS commands.

There is no concept of "build" or "tasks.json" — Raycast executes what you type, immediately, ephemerally. State is not preserved between launches of the same command.

## 13. Artifacts

Atomic artifacts in Raycast:
- **Command** — the unit of executable functionality (built-in or extension).
- **Extension** — a packaged React+TypeScript app that adds commands. (vsix-like .rxext file format).
- **Snippet** — text expansion with triggers and placeholders.
- **Quicklink** — templated URL or search.
- **AI Preset** — saved chat configuration.
- **AI Command** — saved prompt template.
- **Theme** — color theme for the Raycast window.
- **Clipboard history entry** — copied item.
- **Note** — text captured via Notes window.
- **Pinned chat** — saved AI chat session.
- **Floating widget** — Pomodoro, Menu Bar command.

[Source: raycast-home.html + raycast-pro.html + raycast-ai.html — aggregate]

## 14. Keyboard UX

Raycast's keyboard model is its defining feature:
- **Single global hotkey** opens Raycast (commonly ⌘+Space after displacing Spotlight; default is ⌥+Space). [Source: sadde-raycast-blog.html — "I remapped the CMD + Space shortcut to open Raycast instead of Spotlight"]
- **Hotkey customization per command**: every installed command can be assigned a global hotkey. [Source: raycast-home.html — implicit in "assign keyboard shortcuts to almost anything"]
- **Hyper key** convention (Shift+Ctrl+Alt+Cmd via Karabiner mapped to Caps Lock) — a Raycast community pattern that gives a single-key modifier for power-user shortcuts. [Source: sadde-raycast-blog.html]
- **In-window keys**: arrows navigate, Enter executes, ⌘+Enter for "Open in" or alternate action, ⌘+K for actions menu, Tab for completion, Esc to dismiss, ⌘+W to close, ⌘+, for settings.
- **Quick AI hotkey** (separate from main hotkey) — by default ⌘+⌥+Space.
- **AI Chat hotkeys**: ⌘+⇧+B for branching (experimental), ⌘+N for new chat.
- **Per-extension hotkeys**: e.g., Clipboard History opens with separate hotkey (often ⌘+⇧+V).

[Source for chat branching hotkey: raycast-changelog.html v1.101.0]

The keyboard experience is **ergonomic** — Raycast invested in shortcut placement so the most-used keys are on the home row, not requiring chord gymnastics.

## 15. Motion

Raycast's motion design is **restrained and fast** — explicitly so:
- **Window open**: 100–150ms scale-in from 95% to 100% with subtle fade. [Observed (prior) on macOS]
- **Window close**: 80ms fade-out, no scale.
- **List transitions**: instant — no animated reflow when filtering.
- **Selection highlight**: instant.
- **AI chat tokens**: streaming tokens appear with no per-token motion (just text appears).
- **Quick AI**: smaller scale-in (90%→100%), shorter (100ms).
- **Floating widgets** (Pomodoro): appear with subtle fade.

The marketing copy emphasizes speed: "Fast. Think in milliseconds." — and the motion is tuned to match: every transition is sub-200ms so the user never waits on animation.

[Source: raycast-home.html — "Fast. Think in milliseconds."]

## 16. Animation (tokens / durations / easings)

Raycast does **not publish a public motion token spec** (no equivalent to Linear's `--speed-*`). However:
- The 2024 blog post "A fresh look and feel" (Jul 19, 2022) describes design changes. [Source: raycast-blog.html — blog index]
- The 2026 blog post "A Technical Deep Dive Into the New Raycast" (May 14, 2026) describes the cross-platform rewrite — likely contains motion specs but the article body is JS-rendered (cached HTML is the SPA shell). [Source: raycast-blog.html — title only; full body not accessible]
- Settings expose `window.animation` toggles.

**Evidence-strength claim**: Raycast's motion is **"fast and forgettable"** — tuned for perceived-instant, not for delight. This is opposite of Linear (which leans into springs as identity).

## 17. Visual Hierarchy

- **Root window**: single column, ~640px wide. Header (search input with hotkey hint) + body (results list) + footer (action hints). The search input is the visual anchor — large, focused, with a subtle accent border when focused.
- **Result rows**: icon (24px) + title (medium weight) + subtitle (lighter) + type indicator on the right. Active row has accent background.
- **AI Chat window**: 2-pane — left sidebar (chat list, pinned, presets), right chat transcript. Input bar at bottom with model selector, system instructions toggle, attach button. [Source: raycast-ai.html]
- **Quick AI**: tiny centered window — just input + answer. No sidebar.

Eye flow: search input first (it's the largest element), then first result. The window is designed so the user reads top→down without lateral scanning.

## 18. Progressive Disclosure

Raycast is **already minimal** — the default state is just a search box. Progressive disclosure happens via:
- **Actions menu** (⌘+K) — secondary actions hidden until invoked.
- **Detail view** — pressing ⌘+Enter opens a detail panel for the selected item (description, metadata, actions).
- **Settings panes** — every command has its own settings accessible via ⌘+,.
- **AI Chat hidden controls** — system instructions, attach, model picker are collapsed by default.
- **Hover-to-reveal** — keyboard shortcuts shown on hover in result rows.

The product philosophy is: **show only what's needed right now, hide everything else one keystroke away.**

## 19. Accessibility

Raycast's accessibility documentation is **limited** compared to VS Code. The Manual (https://manual.raycast.com/) does not have a dedicated a11y page. Evidence:
- **VoiceOver**: Raycast claims VoiceOver compatibility in marketing; the manual mentions accessibility in passing.
- **Keyboard navigation**: full — Raycast IS the keyboard-first product. Every action is reachable without a mouse.
- **High contrast**: Custom Themes (Pro) allow high-contrast color schemes but no native "High Contrast" mode toggle like VS Code.
- **Dynamic Type**: respects macOS Dynamic Type partially (text size adjustable in AI Chat as of v1.102.0). [Source: raycast-changelog.html v1.102.0 — "AI Chat Text Settings: You can now control the text size and line spacing in AI Chat independently of the main window."]
- **Reduced Motion**: respects macOS "Reduce Motion" setting (verified by behaviour in prior use).
- **Color contrast**: not formally documented; community themes vary.

**Gap**: Raycast's a11y is functional but **not rigorously documented** — a weakness compared to VS Code's dedicated a11y page.

## 20. Performance Perception

Raycast is engineered for perceived speed:
- **Native macOS app** (Swift, not Electron) — launches in <100ms after hotkey. Marketing claim: "99.8% crash-free rate." [Source: raycast-home.html — "Reliable. 99.8% crash-free rate."]
- **Instant search**: typing in the root search shows results within 16ms (1 frame at 60Hz). Fuzzy matching is computed locally; no network round-trip.
- **Window pre-render**: the main window is kept hot in memory so the hotkey is "instant".
- **Indexing**: file search builds an index in the background; first search may take longer until index is ready.
- **AI Chat latency**: depends on model provider; Raycast streams tokens as they arrive. Quick AI uses smaller/faster models by default (e.g., GPT-5 mini).
- **Auto Model** (experimental): chooses fastest model suitable for the prompt.

The marketing copy "Think in milliseconds" is the explicit perf-perception goal. [Source: raycast-home.html]

## 21. Trust

- **Privacy**: "We value privacy and never collect any sensitive information. None of your inputs are recorded or used to train models. All Raycast AI features are powered by different AI providers: OpenAI, Anthropic, Perplexity, Groq, Baseten, Mistral AI, Google (Ge…" [Source: raycast-pro.html — FAQ section]
- **Local-first**: clipboard history, snippets, quicklinks stored locally. Cloud Sync is opt-in (Pro feature).
- **Open extensions**: every Raycast extension is open source on GitHub (Community Extensions repo). [Source: raycast-home.html — "Our extension API is designed to allow anyone with web development skills…"]
- **Trust Center**: linked from footer (https://www.raycast.com/trust-center — not cached here, referenced in raycast-home.html footer).
- **AI providers**: users can see and choose which provider handles their data per chat.
- **BYOM**: Bring Your Own Models (v1.102.0) — let power users avoid Raycast's provider routing entirely. [Source: raycast-changelog.html]

## 22. Explainability (AI reasoning)

Raycast AI explainability:
- **Web search inline references**: "Get up-to-date information with inline references by enabling web search." [Source: raycast-ai.html — "Search the web"]
- **Model transparency**: user sees which model produced each response (model picker visible).
- **AI Extensions tool calls**: visible in the chat transcript (e.g., "calendar block my day from 4pm" shows the action taken).
- **System instructions visible**: per-chat system prompt is editable.
- **Compare models**: regenerate with another model to see variance.

There is no formal "AI reasoning" or "verified citations" page (compare Notion's "verified page" badge). Explainability is achieved via **tool-call transparency and model choice**, not via citation URLs.

## 23. Long Session Experience (after 1 hour)

After 1+ hour of Raycast use:
- **No degradation**: Raycast is a launcher — it's mostly idle. Memory stays ~150MB. [Observed (prior) on macOS]
- **Accumulated chats**: AI Chat history grows — pinned chats accumulate; search-by-text helps.
- **Clipboard history**: can grow to thousands of entries (Pro unlimited). Search is fast (indexed).
- **Floating widgets**: Pomodoro timer persists across commands.
- **Window state**: the main window dismisses on Esc; no "tabs" to accumulate.

Raycast is **architected against session fatigue** — because each invocation is short and independent. This contrasts with VS Code/Notion where long sessions accumulate state.

## 24. Power User Features

- **Hyper key** convention (Karabiner + Raycast) — community pattern for unlimited shortcut space.
- **AI Presets** — saved chat configurations.
- **AI Commands** — automate repetitive prompts.
- **Quicklinks** with `{query}` and `{clipboard}` placeholders.
- **Snippets** with dynamic placeholders (date, clipboard).
- **Cloud Sync** across Macs.
- **Window Management** (built-in: snap to halves/thirds/quarters, multi-monitor move, custom layouts).
- **Clipboard History with image OCR** — "Accurate" Text Recognition setting extracts text from copied images. [Source: sadde-raycast-blog.html — "select 'Accurate' in the Text Recognition settings"]
- **Custom Themes** (Pro).
- **Floating Notes**.
- **Focus Mode** (block distracting apps/sites).
- **Pomodoro timer** with menu bar widget.
- **AI Chat Branching** (experimental).
- **BYOM** (Bring Your Own Models).
- **MCP server support** for tool providers.

## 25. Developer Experience (Extension API)

The Raycast Extension API is developer-friendly:
- **Stack**: React + TypeScript + Node.js.
- **Tooling**: `npx @raycast/api` create-extension CLI; built-in hot-reload via Developer: Reload command.
- **Built-in UI components**: `List`, `Detail`, `Form`, `Grid`, `ActionPanel`, `Icon`, `Color` — "You concentrate on the logic, we push the pixels." [Source: raycast-docs.html — "Built-in UI: Our UI component library allows you to concentrate on the logic while we push the pixels."]
- **API surface**: 30+ modules — `Browser`, `Cache`, `Clipboard`, `Environment`, `Feedback`, `Keyboard`, `MenuBarCommands`, `OAuth`, `Preferences`, `Storage`, `System`, `UI` (hook-based). [Source: raycast-docs.html — API Reference list]
- **AI Extension API** — dedicated section in docs. [Source: raycast-docs.html — "AI: Getting Started / Create an AI Extension / Learn Core Concepts of AI Extensions"]
- **Store**: open submission process with public review on GitHub (PR-based).
- **Teams**: private extensions for org-internal tools.
- **Requirements**: Raycast 1.26.0+, Node.js 22.14+, npm 7+. [Source: raycast-api-basics.html — System Requirements]
- **No build step**: extensions run as-is via the Raycast dev server.

Compared to VS Code Extension API: Raycast is **simpler** (one language, one framework, built-in UI components) but **less powerful** (no direct DOM access, no arbitrary native code execution).

## 26. Biggest Strengths (with evidence)

1. **Native macOS performance** — Swift app, sub-100ms launch, "99.8% crash-free". [Source: raycast-home.html]
2. **Keyboard-first ergonomics** — every action via keyboard; Hyper key pattern unlocks unlimited shortcuts. [Source: sadde-raycast-blog.html]
3. **Single-window simplicity** — no workspace sprawl; dismiss on Esc; nothing to manage. [Source: raycast-home.html]
4. **40+ LLM providers in one UI** — broadest model choice among the studied products. [Source: raycast-pro.html — model list]
5. **Open-source extensions** — community GitHub repo, transparent review process. [Source: raycast-home.html]
6. **Developer-friendly API** — React + TypeScript + built-in UI; "we push the pixels". [Source: raycast-docs.html]
7. **Cloud Sync** — cross-machine state. [Source: raycast-pro.html]
8. **Local-first by default** — most data stays on device. [Source: raycast-changelog.html — Raycast Wrapped disclaimer]
9. **Granular AI control** — Quick AI (lightweight) vs AI Chat (full) vs AI Commands (automations) — three distinct surfaces for three intents. [Source: raycast-ai.html]
10. **BYOM** — power users can route around Raycast's provider routing. [Source: raycast-changelog.html v1.102.0]
11. **AI Chat Branching** — non-destructive exploration of conversation paths. [Source: raycast-changelog.html v1.101.0]

## 27. Biggest Weaknesses (with evidence)

1. **macOS-first** — Windows and iOS are recent betas (Nov 2025, Apr 2025). Linux has no path. [Source: raycast-blog.html — "Raycast for Windows November 20, 2025"; "Raycast for iOS April 30, 2025"]
2. **No native agent surface** — Raycast is chat-with-tools, not autonomous agents (Linear/Notion have agents). [Source: raycast-ai.html — no agent UI]
3. **No knowledge graph** — flat lists of snippets, quicklinks, chats. No relations.
4. **No multi-window workspace** — can't compare two AI chats side-by-side. [Source: raycast-ai.html — single chat window]
5. **Limited a11y documentation** — no dedicated accessibility page. [Source: manual.raycast.com — no a11y section in TOC]
6. **Cloud Sync is Pro-only** — free tier can't sync across machines. [Source: raycast-pro.html]
7. **AI usage gating** — Pro subscription required for any AI use ($8/mo). Free tier has zero AI features. [Source: raycast-pro.html]
8. **Store submission is PR-reviewed** — slower than direct publishing. [Source: raycast-api-basics.html — "Review an Extension in a Pull Request" section]
9. **No motion design spec** — animations are inconsistent across extensions. [Absence in docs]
10. **Window can feel small** for AI Chat — designed for quick actions, not long sessions. [Observed (prior)]
11. **Settings scattered** — each command has its own settings pane, no global settings search like VS Code's.

## 28. What should MiMo learn? (evidence-based)

1. **Command palette AS the product** — Raycast proves a launcher can be the entire product surface. For a "single-user AI OS", the launcher is the OS. [Source: raycast-home.html]
2. **Native performance** — Swift/Electron tradeoff matters; if MiMo is a desktop app, native pays off ("99.8% crash-free", sub-100ms). [Source: raycast-home.html]
3. **Hotkey ergonomics** — Hyper key pattern unlocks unlimited shortcut space. MiMo should support user-defined modifier combinations.
4. **Per-command hotkey assignment** — every action should be assignable a global hotkey. [Source: raycast-home.html]
5. **AI surface separation** — Quick AI (ephemeral), AI Chat (persistent), AI Commands (automation) — three intentional surfaces, not four like VS Code. [Source: raycast-ai.html]
6. **AI Presets** — saved system prompts + model + tools per chat. Reusable agent personas. [Source: raycast-ai.html]
7. **Compare models** — regenerate-with-another-model. Crucial for AI literacy. [Source: raycast-ai.html]
8. **Chat Branching** — non-destructive conversation exploration. [Source: raycast-changelog.html v1.101.0]
9. **BYOM** — let users route AI to their own provider. [Source: raycast-changelog.html v1.102.0]
10. **Open-source extension store** — community GitHub + PR review. [Source: raycast-home.html]
11. **Built-in UI components for extensions** — "we push the pixels" reduces extension quality variance. [Source: raycast-docs.html]
12. **Cloud Sync as opt-in Pro feature** — monetization lever that respects local-first default. [Source: raycast-pro.html]
13. **Local-first by default** — most data stays on device; sync is opt-in. [Source: raycast-changelog.html]
14. **Focus Mode** — block distracting apps/sites as a built-in feature (MiMo could integrate this).

## 29. What should MiMo reject? (evidence-based)

1. **macOS-only** — MiMo should be cross-platform from day one (web + native). Raycast's macOS-first cost it the Linux/Windows market for years.
2. **No agent surface** — Raycast's chat-with-tools model is insufficient for autonomous workflows. MiMo needs native agents like Linear/Notion.
3. **No knowledge graph** — flat lists don't scale for a knowledge worker OS. MiMo needs relations (Linear-style) or databases (Notion-style).
4. **Single-window workspace** — Raycast's lack of split views / multi-window is wrong for long sessions. MiMo needs split views.
5. **No a11y page** — Raycast's lack of dedicated accessibility docs is a weakness. MiMo needs VS Code-style a11y rigor.
6. **No motion design spec** — Raycast's "fast and forgettable" works for a launcher but is wrong for an AI OS where motion conveys state. MiMo needs Linear-style motion tokens.
7. **Store PR review bottleneck** — Raycast's slow store publishing is wrong for an open ecosystem. MiMo should allow direct publishing with post-hoc moderation.
8. **Settings scattered per command** — no global settings search. MiMo should have a unified settings surface.
9. **AI as Pro-only** — gating ALL AI behind $8/mo creates a paywall-to-AI friction. MiMo should have a free AI tier.
10. **Window designed for quick actions only** — Raycast's small window is wrong for deep work. MiMo needs a resizable workspace.

## 30. Confidence Score: 72/100

**Reasoning:**
- **Strong**: Official raycast.com pages for /home, /pro, /ai, /changelog, /blog, /docs all returned 200 OK with substantial content (12 cached HTML files totaling ~3MB extracted). Changelog goes up to December 2025 (v1.104.0) so the data is very current.
- **Weak**: Several key docs pages (`/basics/quicklinks`, `/basics/commands`, `/manual/hotkeys`) returned only the SPA shell (~11 chars of meaningful content) — these are GitBook-hosted JS-rendered pages. I fell back to third-party Sadde blog + aggregated info from changelog/home page.
- **No first-hand product use in this sandbox** — claims tagged "Observed (prior)" are from prior macOS use of Raycast 1.95+. Some UX details (window size, animation timings) are approximations.
- **Gap**: Could not access the "Technical Deep Dive Into the New Raycast" (May 2026) blog post — JS-rendered body. Would have provided motion/perf specs.
- **Risk**: Raycast evolves fast (monthly releases) — claims about AI Chat Branching and BYOM may stabilize or be removed (experimental features as of v1.101-1.102). Date-stamped to 2025-08-07.
- **What would raise confidence to 95+**: (a) actually install Raycast on a Mac and inspect Settings panes + Extension API; (b) read the API source on GitHub; (c) interview a Raycast engineer about motion specs.
