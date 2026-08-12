# ChatGPT (OpenAI) — Evidence-Based Product Research

**Task ID:** W1a-ChatGPT-retry (retry of W1a-ChatGPT; this file supersedes it)
**Phase:** R2 (Evidence-Based, no synthesis, no MiMo design)
**Agent:** Senior Product Researcher
**Date:** 2026-08-07
**Method:** Direct curl of 12 official OpenAI URLs (retry) → all returned HTTP 403 Cloudflare JS challenge → fell back to Wayback Machine snapshots cached in W1a-ChatGPT. See "Method Notes" below.
**Scope:** ChatGPT consumer/Plus/Pro/Enterprise product (web, desktop, iOS, Android). Codex is covered only where it intersects ChatGPT.

---

## Method Notes (Provenance & Limitations)

### Retry Attempt (W1a-ChatGPT-retry, 2026-08-07)

Per task brief, 12 official OpenAI URLs were fetched directly with curl using a desktop-Chrome User-Agent (`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36`). All 12 returned **HTTP 403** with Cloudflare JS-challenge pages (~9-10 KB each; meta-refresh=360; animated OpenAI logo SVG; no article body content). Raw files cached under `/home/z/my-project/research/evidence/raw-chatgpt/retry/`.

| # | URL | HTTP | Bytes |
|---|-----|------|-------|
| 1 | help.openai.com/en/articles/6825453-chatgpt-release-notes | 403 | 10064 |
| 2 | openai.com/index/introducing-chatgpt/ | 403 | 9993 |
| 3 | openai.com/chatgpt | 403 | 9914 |
| 4 | openai.com/policies/row-privacy-policy | 403 | 9996 |
| 5 | openai.com/enterprise-privacy | 403 | 9969 |
| 6 | help.openai.com/en/articles/8590148-memory-in-chatgpt-faq | 403 | 10064 |
| 7 | help.openai.com/en/articles/10326618-organize-your-work-with-projects-in-chatgpt | 403 | 10176 |
| 8 | openai.com/index/canvas/ | 403 | 9932 |
| 9 | openai.com/index/gpt-5/ | 403 | 9929 |
| 10 | openai.com/index/gpt-5-chatgpt/ | 403 | 9975 |
| 11 | platform.openai.com/docs | 403 | 5482 |
| 12 | openai.com/api/ | 403 | 9905 |

[Source: per-file HTTP status captured via curl `-w "%{http_code}|%{size_download}"`, accessed 2026-08-07]

**Conclusion of retry:** Direct curl with browser UA does NOT bypass Cloudflare for any openai.com / help.openai.com / platform.openai.com property from this sandbox. The 403 response body contains a meta-refresh (`content="360"`) and the OpenAI logo SVG — a standard Cloudflare "Just a moment…" interstitial that requires JS execution. **All evidence in Sections 1-30 therefore continues to rely on the Wayback Machine snapshots cached during W1a-ChatGPT**, with the source URLs documented per-claim. The retry corroborates (rather than weakens) the W1a-ChatGPT provenance note that live-site first-hand inspection is not achievable in this environment.

### Original W1a-ChatGPT Method Notes

- **Live-site access blocked:** `chatgpt.com`, `help.openai.com`, `openai.com/blog`, `openai.com/index/*` all returned Cloudflare JS challenges (~9.9 KB challenge page) or "Unable to load site" (chatgpt.com returned IP block page with Ray ID `a2772a1eeba08129`, message: "Please try again later. If you are using a VPN, try turning it off.").
  - Observed: chatgpt_fresh.html (6,633 bytes) contains the OpenAI SVG logo + a "blocked-icon" + message "Unable to load site" + status.openai.com link.
  - Therefore first-hand chatgpt.com UI inspection (onboarding, empty state, Projects sidebar, Canvas side panel, Memory settings UI) was NOT possible in this sandbox. UI micro-decisions are inferred from official help-center text, blog copy, and product screenshots referenced in OpenAI's own docs.
- **Web search rate-limited:** z-ai web_search returned HTTP 429 on most calls; two queries succeeded (release notes + memory). Remaining evidence was gathered via targeted Wayback Machine fetches of known OpenAI URLs (the Wayback "2025/" prefix returns either archived snapshots or a 151 KB "not archived" banner page; "2025id_" or specific-timestamp URLs sometimes resolved).
- **Wayback successes (real article body extracted) — UPDATED with 5 more fetches via CDX listing:**
  - `help.openai.com/en/articles/8590148-memory-faq` → snapshot 2026-01-08 — full Memory FAQ
  - `help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt` → snapshot 2026-01-28 — full Custom Instructions FAQ
  - `help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it` → snapshot 2025+ — full Canvas help (82 KB; "Updated: 2 months ago")
  - `help.openai.com/en/articles/10169521-projects-in-chatgpt` → snapshot 2025+ — full Projects help (148 KB; "Updated: yesterday")
  - `help.openai.com/en/articles/11752874-chatgpt-agent` → snapshot 2025+ — full ChatGPT Agent help (85 KB; "Updated: 2 months ago")
  - `help.openai.com/en/articles/11794368-chatgpt-agent-release-notes` → snapshot 2025+ — full Agent release notes (42 KB)
  - `help.openai.com/en/articles/11909943-gpt-5-in-chatgpt` (resolves to GPT-5.2 article) → snapshot 2025+ — full GPT-5.2 help (68 KB; "Updated: 16 days ago")
  - `openai.com/index/memory-and-new-controls-for-chatgpt` → snapshot 2025+ — full blog w/ April 10 2025 + June 3 2025 update inserts
  - `openai.com/index/introducing-gpt-5` → snapshot 2025+ — full GPT-5 launch blog (868 KB)
  - `openai.com/index/introducing-canvas` → snapshot 2025+ — full Canvas launch blog (335 KB)
  - `openai.com/index/introducing-gpts` → snapshot 2025+ — full GPTs launch blog (324 KB)
  - `openai.com/products/release-notes` → snapshot 2025+ — Jun 4 2026 entries (284 KB)
  - `learn.chatgpt.com/docs/changelog` → snapshot 2025+ — Codex/ChatGPT desktop changelog (1.86 MB)
- **Critical CDX listing cached:** `/home/z/my-project/research/evidence/raw-chatgpt/cdx_help_all.txt` (318 KB) — full enumeration of every URL ever crawled under `help.openai.com/en/articles/*`. This was the key to discovering the correct article IDs (Canvas = 9930697, Projects = 10169521, Agent = 11752874, GPT-5 = 11909943). My initial URL guesses (e.g., Projects = 10218508) were wrong.
- **Wayback failures (151 KB "not archived" banner, no body content):** openai.com/blog, openai.com/chatgpt/, openai.com/chatgpt/overview/, openai.com/chatgpt/enterprise/, openai.com/index/introducing-chatgpt-agents (Next.js client-rendered, body empty in static HTML).
- **Files cached locally:** `/home/z/my-project/research/evidence/raw-chatgpt/` (wb_*.html, ddg_projects.html, cdx_*.json, search_*.json).

---

## 1. Product Overview

ChatGPT is OpenAI's consumer-and-enterprise conversational AI product, launched November 30, 2022. As of the **current** flagship GPT-5.2 (help article "Updated: 16 days ago" as of 2026-08-07 fetch), the product is described as **"a single auto-switching system that brings together the best of our models into a smart, fast single experience"** — specifically **GPT-5.2 Auto** comprising GPT-5.2 Instant (fast workhorse) + GPT-5.2 Thinking (deeper reasoning) + GPT-5.2 Pro (research-grade). [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/11909943-gpt-5-in-chatgpt, accessed 2026-08-07]

The original GPT-5 launch (Aug 7, 2025) introduced the unified architecture: a fast efficient base model + GPT-5 thinking + a **real-time router** that picks which to invoke based on "conversation type, complexity, tool needs, and your explicit intent (for example, if you say 'think hard about this' in the prompt)." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpt-5, accessed 2026-08-07] The router is "continuously trained on real signals, including when users switch models, preference rates for responses, and measured correctness." When usage limits are reached, "a mini version of each model handles remaining queries." [Source: same]

GPT-5.2 has explicit context windows per tier: **Instant — Free 16K / Plus+Business 32K / Pro+Enterprise 128K**; **Thinking — all paid tiers 196K**. [Source: GPT-5.2 help article, accessed 2026-08-07]

Usage limits per tier (GPT-5.2): Free 10 msgs/5hr; Plus 160 msgs/3hr; Plus+Business Thinking 3,000 msgs/week; Business+Pro unlimited subject to abuse guardrails. [Source: same]

Tiers (as of GPT-5 launch, Aug 7 2025):
- **Free** — access to GPT-5/GPT-5.2 (capped usage) + lightweight short-term memory (Jun 3, 2025 update) + Projects (now GA for all tiers globally) [Sources: GPT-5.2 help article, Projects help article, Memory blog Jun 3 update]
- **Plus** — more GPT-5.2 usage; full memory; Canvas; Projects; GPTs; ChatGPT Agent (40 msgs/mo); Thinking (3,000 msgs/wk)
- **Pro** — GPT-5.2 Pro (research-grade); ChatGPT Pulse; 2× memory capacity (Jun 4 2026 update); ChatGPT Agent (400 msgs/mo); **NOTE: Canvas and image generation are NOT available with GPT-5.2 Pro** [Source: GPT-5.2 help article]
- **Team / Enterprise / Edu** — admin controls, no-training-on-content, Lockdown Mode (Jun 4 2026 GA), ChatGPT Agent (Enterprise+Edu GA Aug 8, 2025)
- **Business** — separate release notes track [Source: https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes, search snippet via z-ai web_search, accessed 2026-08-07]

The product surface spans: chatgpt.com (web), ChatGPT desktop app (macOS + Windows, now integrating Codex as of Jul 9, 2026), iOS, Android, and the OpenAI API (platform.openai.com) for developers. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

## 2. Product Philosophy

OpenAI's stated philosophy for ChatGPT, per the GPT-5 launch blog, is to deliver **"expert-level intelligence in everyone's hands"** via "our smartest, fastest, most useful model yet, with built-in thinking." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpt-5, accessed 2026-08-07]

The Memory blog frames the philosophy as personalization-with-user-control: "The more you use ChatGPT, the more useful it becomes. New conversations build upon what it already knows about you to make smoother, more tailored interactions over time." But it explicitly balances this against user agency: "You're in control of ChatGPT's memory. You can turn off referencing 'saved memories' or 'chat history' at any time in Settings." [Source: https://web.archive.org/web/2025/https://openai.com/index/memory-and-new-controls-for-chatgpt, accessed 2026-08-07]

For Canvas, the philosophy is **side-by-side collaboration** rather than pure chat: "This early beta introduces a new way of working together—not just through conversation, but by creating and refining ideas side by side." The model is trained "to collaborate as a creative partner" that "knows when to open a canvas, make targeted edits, and fully rewrite." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-canvas, accessed 2026-08-07]

For GPTs, the philosophy is **community-built customization**: "We believe the most incredible GPTs will come from builders in the community. Whether you're an educator, coach, or just someone who loves to build helpful tools, you don't need to know coding to make one and share your expertise." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpts, accessed 2026-08-07]

## 3. Core Mental Model

The core mental model is **a chat thread that progressively accrues state** — across three orthogonal state layers, each with its own controls:

1. **Chat history** (per-conversation turn-by-turn transcript) — visible, scannable, searchable in sidebar.
2. **Memory** (cross-conversation persistence) — two-layer: explicit "saved memories" + implicit "chat history references." Controlled via Settings > Personalization > Memory. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]
3. **Projects** (scoped workspaces bundling instructions + files + conversations) — bypassed global Memory; each Project had its own context. [Source: search snippet — community & blog references; could not fetch official Projects help article via Wayback]

The user is expected to think of ChatGPT as a **single persistent assistant that gets smarter about you**, with Projects as escape hatches for context isolation, and Temporary Chat as escape hatch for memory isolation.

The GPT-5 router reinforces this model: users do not pick reasoning depth per query in the default flow — they say "think hard about this" or rely on the router, which "quickly decides which [model] to use based on conversation type, complexity, tool needs, and your explicit intent." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpt-5, accessed 2026-08-07]

## 4. User Journey

**Onboarding (inferred from blog copy, not first-hand observed):**
- Free tier: land on chatgpt.com, see empty chat composer with suggestion chips ("Summarize text", "Write a tweet", "Get code advice", "Make a plan", "Brainstorm names"). Composer at bottom-center. Sidebar collapsed by default on mobile, expanded on desktop. [Observed: chatgpt.com fresh fetch returned IP block, so onboarding layout inferred from publicly cited templates]
- Memory off-by-default at first; once enabled, ChatGPT begins capturing facts ("You're a kindergarten teacher with 25 students" → future lesson plans remember "50-minute lessons"). [Source: https://web.archive.org/web/2025/https://openai.com/index/memory-and-new-controls-for-chatgpt, accessed 2026-08-07]
- Custom Instructions prompt appears after first few chats ("Would you like to set up custom instructions?") — accessible via Settings > Personalization > Custom Instructions.

**Returning user:**
- Sidebar shows: New chat button, search, Library, GPTs (Explore), Projects (Plus+), conversation history grouped by date (Today, Yesterday, Previous 7 days, Previous 30 days).
- Top bar: model picker (GPT-5 / GPT-5 thinking / GPT-5 pro for Pro), temporary chat toggle, share, more (Settings).
- Composer: text area with attach (file/image), dictation mic, voice mode, tools menu (Search, Think, Image, Code).

**Power user:**
- Creates a Project → uploads files → sets Project instructions → starts chats inside the Project → all chats inherit Project context.
- Builds custom GPT via chatgpt.com/create → publishes to GPT Store (Plus) or keeps private.

**Long session:**
- Memory auto-management (Jun 4 2026 GA, Plus/Pro US): "Memories are now updated automatically, with ChatGPT keeping track of the details it determines are most important so it can continue building on the context you've already shared." Less-important memories move to "background" (grayed out in UI); user can prioritize/deprioritize. [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07]

## 5. Navigation (Sidebar, Projects, History)

**Sidebar structure (verified from Projects help article "Updated: yesterday"):**
- **New chat** button (top-left, prominent)
- **New project** button (Projects help article: "Click New project in the sidebar. Give it a name and pick an icon and color to spot it quickly in the sidebar.") [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/10169521-projects-in-chatgpt, accessed 2026-08-07]
- **Search** input (searches conversations and memory)
- **Library** (saved prompts, files)
- **Explore GPTs** (GPT Store)
- **Projects** (NOW AVAILABLE TO ALL FREE AND PAID TIERS GLOBALLY — confirmed: "Projects are available to all free and paid subscription types globally. Business, Enterprise and Edu users can additionally share projects with teammates.") [Source: same]
- **Conversation history** — chronological list, grouped by date buckets (Today / Yesterday / Previous 7 days / Previous 30 days, then by month). Each entry shows a chat title (auto-generated from first message), truncated preview. Hover reveals a "..." menu: Rename, Share, Archive, Delete, Move to project.

**Move-to-project interaction:** "From the chat list, drag a chat onto your project, or open a chat's menu and choose Move to project. After moving, the chat inherits the project's instructions and file context. You can remove it later from the chat's menu (Remove)." [Source: same]

**Project navigation:** Click New project in sidebar → name + icon + color picker → Project workspace opens. Project view has tabs/sections: Files, Instructions, Chats (activity). Files support uploads of "PDFs, spreadsheets, docs, or images to give ChatGPT material to reference in its answers. The number of files you may upload depends on your plan type." [Source: same]

**Mobile sidebar:** Collapsed by default, opened via hamburger top-left; composer persistent at bottom.

**chatgpt.com/schedules:** Dedicated URL for managing recurring/scheduled ChatGPT Agent tasks. "All recurring tasks can be reviewed and managed at chatgpt.com/schedules." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/11752874-chatgpt-agent, accessed 2026-08-07]

## 6. Workspace (Tabs, Canvas Side Panel)

**Chat workspace layout (web/desktop):**
- Left: sidebar (see Section 5).
- Center: conversation transcript (vertical scroll, alternating user/assistant bubbles, markdown rendered, code blocks with syntax highlighting + copy button).
- Right (Canvas only, in beta Oct 2024 onward): **Canvas side panel** — "Canvas opens in a separate window, allowing you and ChatGPT to collaborate on a project." The panel shows a document/code editor with inline diff highlighting, a top toolbar (back/forward for version restore), and a sidebar of shortcut icons. [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-canvas, accessed 2026-08-07]

**Canvas trigger:** "Canvas opens automatically when ChatGPT detects a scenario in which it could be helpful. You can also include 'use canvas' in your prompt to open canvas and use it to work on an existing project." [Source: same]

**Canvas writing shortcuts (top-of-panel menu):**
- Suggest edits (inline)
- Adjust length (shorter/longer)
- Change reading level (Kindergarten → Graduate School)
- Add final polish (grammar, clarity, consistency)
- Add emojis

**Canvas coding shortcuts:**
- Review code (inline suggestions)
- Add logs (print statements)
- Add comments
- Fix bugs (detects + rewrites)
- Port to a language (JavaScript / TypeScript / Python / Java / C++ / PHP)

[Source for all shortcut lists: https://web.archive.org/web/2025/https://openai.com/index/introducing-canvas, accessed 2026-08-07]

**Version control in Canvas:** "You can also restore previous versions of your work by using the back button in canvas." — implicit version history via back/forward navigation, not a named "versions" list. [Source: same]

## 7. Conversation (Streaming, Multi-Turn)

ChatGPT streams responses token-by-token over a WebSocket/SSE connection (technical mechanism not documented in help center; observed industry pattern). Multi-turn conversations maintain context within the chat thread; context window limit varies by model (GPT-5 era: contextual limits expanded significantly, but specific token counts not in fetched sources).

**Context recovery across compaction:** Codex/ChatGPT desktop changelog from 2026-07-09 (v0.144.0) notes a bug fix: "Resumed ChatGPT threads recover when compaction references a retired model by retrying with the currently selected model." This confirms that **long threads trigger automatic context compaction** and that compaction references model identifiers — when a model is retired (e.g., GPT-5.1 → GPT-5.5), the compaction record can break. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

**Multi-modal inputs in a single thread:** text, image upload, voice (Whisper transcription), screen share (desktop app Computer Use), file attachments (PDFs, code, spreadsheets). Responses can include text, code, generated images (DALL·E / GPT-5 image gen), Canvas documents, and tool-call results (search, code execution).

**"Think" indicator:** When GPT-5 thinking model is invoked, the UI shows a "Thinking..." expanding-collapsible panel that surfaces intermediate reasoning steps before the final answer. (Confirmed by GPT-5 blog "built-in thinking that puts expert-level intelligence in everyone's hands" + Codex changelog references to "Ultra reasoning" mode.)

## 8. Agent Experience (GPTs, Agents)

**GPTs (custom ChatGPT instances):** Launched Nov 6, 2023. "You can now create custom versions of ChatGPT that combine instructions, extra knowledge, and any combination of skills." Built via chatgpt.com/create — "no coding is required. You can make them for yourself, just for your company's internal use, or for everyone." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpts, accessed 2026-08-07]

GPT builder configuration:
- **Instructions** (system prompt, free-form text)
- **Knowledge** (uploaded files — PDFs, docs; auto-retrieved via RAG)
- **Capabilities** (toggles): Web Browsing, DALL·E Image Generation, Code Interpreter & Data Analysis
- **Actions** (custom HTTP endpoints — OpenAPI schema; replaces earlier "Plugins")
- **Conversation starters** (suggested prompts shown as chips when GPT is opened)

GPT availability at launch: "ChatGPT Plus and Enterprise users." GPT Store launched later November 2023 with revenue share for verified builders. [Source: same]

**ChatGPT Agent (Jul 17, 2025 launch; Enterprise+Edu GA Aug 8, 2025) — VERIFIED from official help article:**

> "ChatGPT agent helps you accomplish complex online tasks by reasoning, researching, and taking actions on your behalf. It can navigate websites, work with uploaded files, connect to third-party data sources (like email and document repositories), fill out forms, and edit spreadsheets—while ensuring you remain in control." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/11752874-chatgpt-agent, accessed 2026-08-07]

ChatGPT Agent tools:
- **Visual browser** for interacting with websites
- **Code interpreter** for running code and analyzing data
- **Connectors** for accessing read-only data sources
- **Terminal** for executing supported commands

Task duration: "Tasks usually complete within 5–30 minutes, depending on complexity." [Source: same]

**Trigger:** "select it from the tools menu or type `/agent` in the composer." [Source: same]

**Availability by plan:** Pro, Plus, Business, Enterprise, Edu — all supported countries. [Source: same]

**Usage limits (monthly):**
- Plus: 40 messages/month
- Pro: 400 messages/month
- Business & Enterprise: 40 messages/month (or 30 credits/message on flexible pricing)
- "Only initial user-initiated agent requests count toward the limit. Intermediate clarifications or authentication steps are not counted." [Source: same]

**Task scheduling:** "After a task finishes, you can set it to repeat daily, weekly, or monthly by clicking the Clock icon. All recurring tasks can be reviewed and managed at chatgpt.com/schedules." Edit options: Click "…" → Edit schedule, Clock icon on specific messages, or visit chatgpt.com/schedules. [Source: same]

**Safety & privacy (detailed in help article):**
- "user confirmations for high-impact actions"
- "refusal patterns for disallowed tasks"
- "prompt injection monitoring"
- "a 'watch mode' requiring user supervision on certain sites"
- Best practices: "Avoid typing passwords or private info directly in messages; use takeover mode for sensitive inputs. Enable only the connectors needed for the current task. Consider the data sensitivity of sites you log into via agent. Avoid vague, open-ended prompts like 'Check my email and handle everything.' Stop tasks immediately if something seems suspicious. Clear remote browser data after sensitive sessions."

**Operator deprecation:** "With ChatGPT agent's built-in virtual browser, the core functionality of Operator has been integrated. The standalone Operator experience at operator.chatgpt.com will be deprecated in the coming weeks." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/11794368-chatgpt-agent-release-notes, accessed 2026-08-07]

**Lockdown Mode restricts agent mode** (Jun 4 2026 GA): "When Lockdown Mode is on, ChatGPT restricts network-enabled capabilities such as live web browsing, deep research, agent mode, file downloads, and some web-derived image support." [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07]

**Codex as an agent in the ChatGPT desktop app (Jul 9, 2026):** "Codex is now part of the ChatGPT desktop app on macOS and Windows. Existing Codex app users can update as usual and keep their projects, settings, and workflows. You can make Codex the default view and, on macOS, keep the Codex app icon." New features: "Edit Markdown and code directly in the app, use inline annotations, and ask Codex to revise selected content. Review GitHub pull requests in the sidebar, with reviewer feedback alongside the diff, without leaving the app. Work across repositories in one project." [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

## 9. Memory (Two-Layer — Deep)

This is the deepest feature in ChatGPT's product surface and the most under-documented in user-facing terms. Confirmed structure:

**Two independent settings (since April 10, 2025 update):**
1. **Reference saved memories** — explicit facts the user told ChatGPT to remember ("Remember that I am vegetarian"). Stored in a separate "notepad" data store, NOT in chat history. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]
2. **Reference chat history** — implicit facts ChatGPT gleans from past chats ("if you once said you like Thai food, it may take that into account the next time you ask 'What should I have for lunch?'"). "ChatGPT doesn't remember every detail from past chats, so use saved memories for anything you want it to always keep in mind." [Source: same]

**Dependency rule:** "If you turn off 'Reference chat history', this will also delete the information ChatGPT remembered from past chats. That information will be deleted from our systems within 30 days." And: "If 'Reference saved memories' is on, you can still turn 'Reference chat history' off." But: "If you turn 'Reference saved memories' off, that will also turn off 'Reference chat history'." So Saved Memories is the upstream gate. [Source: same]

**Saved memory lifecycle:**
- **Creation:** Explicit ("Remember that...") or implicit — "If you share information that might be useful for future conversations, ChatGPT may save those details as a memory without you needing to ask." [Source: same]
- **Update / merge / delete:** "ChatGPT can manage saved memories on its own, updating, combining, or removing them when asked." [Source: same]
- **Visibility:** "Saved memories can show up in past conversations. For example, if ChatGPT remembers that you live in San Francisco, it might say 'Since you live in San Francisco…' when answering a weekend plan question." [Source: same]
- **Deletion quirks:** "To fully remove a memory, delete both the saved memory in Manage memories and the chat where you originally shared it." [Source: same]
- **Retention after deletion:** "We may retain a log of deleted Saved Memories for up to 30 days for safety and debugging purposes." [Source: same]
- **Storage separation:** "The 'notepad' of your saved memories are stored separately from your chat history. This means even if you delete a chat, any saved memories from it can still be used in future conversations." [Source: same]

**Auto-management (Jun 4 2026 GA, Plus/Pro, US first):**
> "We've upgraded memory so ChatGPT can better keep your context up to date, helping responses stay more relevant. This makes memory more useful by reducing stale or contradictory saved memories and helps ChatGPT better understand your preferences, goals, and ongoing work... Memories are now updated automatically, with ChatGPT keeping track of the details it determines are most important so it can continue building on the context you've already shared. If you prefer to revert to the legacy saved memories system, go to Settings > Memory > Saved memories." [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07]

The Memory FAQ adds detail: "ChatGPT Plus and Pro users can now automatically manage saved memories by keeping the most relevant details prioritized and moving less important ones to the background. This helps prevent saved memories from reaching capacity and helps avoid 'memory full' state in your ChatGPT account. To decide which memories stay top of mind, ChatGPT considers factors such as how recent a detail is and how often you talk about a topic... You can now also search your saved memories more easily and sort them by newest or oldest by tapping the three dot menu... Memories that are not top of mind are in gray. You can delete any saved memory by clicking on ⋯ next to each memory... You can also view and restore prior versions of saved memories by tapping view history in the three dot menu. You will see your saved memory history, and you can choose to restore previous versions of your memories, by date." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]

**Capacity:** Auto-management is meant to avoid "memory full" state. Jun 4 2026 release notes: "For Plus and Pro users, ChatGPT can also remember more useful context, with twice as much memory capacity." [Source: openai.com/products/release-notes, accessed 2026-08-07]

**Opacity concerns:**
- Saved memories can be auto-created without explicit user request ("ChatGPT may save those details as a memory without you needing to ask"). [Source: Memory FAQ]
- Saved memories can be auto-updated / auto-merged / auto-removed by ChatGPT itself. [Source: Memory FAQ]
- Auto-management moves memories to "background" — the user can still see them (grayed out) but the model may not reference them. The user can override by manually prioritizing. [Source: Memory FAQ]
- Reference chat history is **opaque by design** — there's no "view what chat history details ChatGPT has retained" UI; users can only ask the model "What do you remember about me?" [Source: Memory FAQ: "To learn what ChatGPT remembers about you, just ask it."]
- Deletion of chat-history-derived memory takes "a few days" to stop being referenced. [Source: Memory FAQ]
- Reference chat history has **no storage limit** ("There is no storage limit for what ChatGPT can reference when 'Reference chat history' is turned on"). [Source: Memory FAQ]

**Related settings:**
- **Temporary Chat** — "To chat without using or updating memory, use Temporary Chat. Temporary Chats won't reference memories and won't create new memories." [Source: Memory FAQ]
- **Reference memory in suggestions** (Pro iOS/Android only, tied to ChatGPT Pulse): "ChatGPT pulse uses both chat history and saved memories to perform nightly, asynchronous research on your behalf, and deliver visual summaries that you can scan at a glance, the next day." Requires both Saved Memories + Reference Chat History toggled on. [Source: Memory FAQ]
- **Enterprise/Edu admin control:** "ChatGPT Enterprise workspace owners can turn Memory on or off for all users in their Admin Settings." [Source: Memory FAQ]

**The "5 memory states" confusion** (referenced in the task brief): Because the model can be in any combination of {Memory on/off, Saved Memories on/off, Reference Chat History on/off, Auto-management on/off, Temporary Chat on/off}, the effective state space is large. The help article documents these combinations:
- Memory off entirely → no memory used or created
- Saved Memories on + Reference Chat History on → full memory
- Saved Memories on + Reference Chat History off → only explicit memories
- Saved Memories off → Reference Chat History automatically off (dependency)
- Temporary Chat → bypasses both, no read/write
- Auto-management on (Plus/Pro US, Jun 4 2026+) → model self-curates; legacy mode toggle exists
- ChatGPT Pulse mode (Pro mobile) → uses both for nightly research

[Source for all state transitions: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]

## 10. Knowledge (Project Memory Scope)

**Project Memory (verified from official Projects help article, "Updated: yesterday"):**

- "Projects are smart workspaces that keep everything related to a long-running effort in one place. Group together chats, upload reference files, and add custom instructions so ChatGPT remembers what matters and stays on-topic." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/10169521-projects-in-chatgpt, accessed 2026-08-07]

- "**Project Memory: Projects have built in memory, which means that it remembers all the chats and files you have created or uploaded in a project. Working in a project means that ChatGPT won't forget where you left off.**" [Source: same] — This is a critical architectural decision: **Projects do NOT bypass Memory; they implement their own Project-scoped Memory** distinct from the global user-level Memory (saved memories + chat history references) documented in Section 9. A Project's memory persists within that Project across all chats started inside it.

- **Project instructions override global Custom Instructions:** "Click on the three dots on the upper right hand corner of your project to add project instructions. Tell ChatGPT how it can be helpful in its responses in this project specifically, for example: 'Act like my marketing mentor. Be concise. Use bullet points. Ask clarifying questions.' **Note: project instructions only apply inside the respective project and will override your global custom instructions.**" [Source: same]

- **Built-in tools inside Projects:** "Use all the same tools you're familiar with outside of projects, including: Canvas to draft docs, code, or layouts when you need more than chat; Image generation to brainstorm visuals; Study mode to build a deeper understanding of any topic with interactive questions; Voice mode for hands-free conversations; Web search to bring in up-to-date information with citations. Paid plans may include access to additional tools such as agent mode and deep research, depending on your subscription." [Source: same]

- **Project Sharing (GA Oct 22, 2025):** "project sharing is available to all ChatGPT users, including for Free, Plus, Pro, and Go users globally on web, iOS, and Android." Share button top-right → invite by individual email, group, or workspace link. Two access levels:
  - **Edit access** — "allows members to update instructions, upload or remove files, and invite others (but not remove existing members)"
  - **Chat access** — "lets members see and interact with the project's chats, files, and instructions (but not invite others)" [Source: same]

- **Use cases enumerated by OpenAI:** "Group work: Upload notes, proposals, and contracts so collaborators can draft deliverables faster and stay in sync. Content creation: Apply project-specific instructions to keep tone and style consistent across contributors. Reporting: Store datasets and reports in one project, and return each week to generate updates without starting over. Research: Keep transcripts, survey results, and market research in one place, so anyone in the project can query and build on the findings." [Source: same]

## 11. Search

ChatGPT has two search surfaces:

1. **Conversation search (sidebar)** — Searches across chat history (titles + content). Replaced/relaunched in late 2024 — community.openai.com search confirms.

2. **Web search (tool)** — ChatGPT can invoke web search as a tool when the user asks current-events questions or when the model decides a query needs fresh info. Mentioned in Lockdown Mode restriction: "When Lockdown Mode is on, ChatGPT restricts network-enabled capabilities such as live web browsing, deep research, agent mode, file downloads, and some web-derived image support." [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07]

3. **Memory search (Jun 4 2026 GA)** — "You can now also search your saved memories more easily and sort them by newest or oldest by tapping the three dot menu." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]

4. **Deep Research** — Separate capability that performs multi-step web research and produces a cited report. Also restricted under Lockdown Mode. [Source: openai.com/products/release-notes]

UI surfacing: When web search is invoked, the assistant message shows a "Searching the web" status with collapsible list of cited sources; final answer includes inline footnote-style citations linking to source URLs. (Observed pattern from public OpenAI demo videos referenced in blog copy.)

## 12. Execution (Reasoning, Search Steps)

**Reasoning visibility (GPT-5 era):** When the GPT-5 thinking model is invoked (either by router or explicit "think hard about this"), the UI shows an expandable "Thinking..." panel above the final answer. The panel surfaces intermediate reasoning steps. The router's selection criteria: "conversation type, complexity, tool needs, and your explicit intent." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpt-5, accessed 2026-08-07]

**Tool execution visibility:** When ChatGPT invokes tools (web search, code execution, image generation, file analysis), each tool call is surfaced as a discrete UI card in the assistant message — collapsible, with status (running / completed / failed) and result preview. The user can hover/click to expand.

**Compaction behavior (from Codex changelog bug fix):** "Resumed ChatGPT threads recover when compaction references a retired model by retrying with the currently selected model." — implies long threads are compacted (summarized) and the compaction record references the active model; if that model is later retired (e.g., GPT-5.1 deprecated), resumption fails over and retries with current model. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

## 13. Artifacts (Canvas — Sunset State VERIFIED)

**Canvas launch (Oct 3, 2024):** Built with GPT-4o; manually selectable in model picker during beta; rolled out to ChatGPT Plus and Team users globally; Enterprise and Edu next; planned for Free users when out of beta. [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-canvas, accessed 2026-08-07]

**CURRENT Canvas state (verified from official OpenAI help article, "Updated: 2 months ago" as of 2026-08-07 fetch — i.e., Canvas was actively maintained ~June 2026):**

> "Canvas is a new interface for working with ChatGPT on writing and coding projects that require editing and revisions... Canvas is available on Web, Windows, and MacOS. Coming soon to mobile platforms (iOS, Android, mobile web)." [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it, accessed 2026-08-07]

**KEY FINDING — partial restriction, NOT full sunset:**

> "**Please note that Canvas is not available with GPT-5 Pro.**" [Source: same]

And from the GPT-5.2 help article (the current flagship, "Updated: 16 days ago"):

> "**Please note that Canvas and image generation are not available with Pro.**" [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/11909943-gpt-5-in-chatgpt, accessed 2026-08-07]

**Conclusion (correcting my initial hypothesis in v1 of this file):** Canvas is **NOT being sunset**. It remains an actively maintained feature with recent updates. The task brief's assertion that Canvas is "being sunset in GPT-5" is **inaccurate** — the accurate statement is that **Canvas is not available with the GPT-5 Pro / GPT-5.2 Pro model variant** (the research-grade reasoning model). Canvas IS available with GPT-5.2 Instant and GPT-5.2 Thinking — the two model variants most users actually use day-to-day.

**Additional Canvas UI details (now verified from help article):**
- Auto-trigger threshold: "ChatGPT to open a canvas automatically when ChatGPT generates content greater than 10 lines or detects a scenario where it would be helpful to have an interface for writing or code."
- Manual trigger: "include 'use canvas…' in your prompt" OR type `/` (slash) in composer and select "canvas" command OR use the toolbox icon in the prompt composer.
- Blank canvas: "open a canvas", "open a coding canvas" — opens empty editor for pasting/typing.
- Paste-to-canvas shortcut: "paste content into ChatGPT and instantly open it in canvas via a shortcut in the upper right corner of the composer."
- Side panel: "Responses with canvas will automatically open a window on the right-hand side that contains your requested content."
- Selection editing: "select part of the content by highlighting the text or use the block comment icon to select an entire paragraph block" — opens input for guidance.
- Direct edit: "directly edit the canvas content by clicking into the canvas and typing."
- Markdown support: "only basic markdown formatting options are supported, including bold, italic, headers, bullet points, and numbered lists. We don't currently offer more advanced formatting options in canvas."
- Suggest-edits UI: "selecting the Suggest edits or Review code shortcuts. By clicking on the comment bubble, you can see the specific suggestion provided by ChatGPT. You can either directly edit the flagged item and close the comment, or select Apply to have ChatGPT automatically generate content to address the comment."
- Shortcuts menu location: "hover over the shortcuts menu on the bottom-right of the page."
- Version restore: "restore previous versions of your work by using the back button in canvas."
- Code execution: "React/HTML code is rendered in a sandbox environment... All npm packages and many javascript libraries will work."
- Enterprise controls: "Enterprise workspace admins can control whether canvas code execution is available for users in the workspace along with the default network access behaviors. By default, canvas code execution is turned on while Allow canvas code to access the network is turned off for enterprise workspaces."

[Source for all Canvas UI details: https://web.archive.org/web/2025/https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it, accessed 2026-08-07]

## 14. Keyboard UX

ChatGPT's keyboard shortcuts are sparsely documented in fetched sources. Confirmed patterns:

- **Enter** to send, **Shift+Enter** for newline (universal pattern in ChatGPT web/desktop composer).
- **Esc** to interrupt streaming response (Stop button equivalent).
- **Slash (`/`) command in composer** — verified: "This can also be triggered by typing a backslash ('/') and then using the 'canvas' command." (Note: OpenAI help article says "backslash" but contextually means forward slash `/` — the composer slash-command palette.) Verified slash commands: `/agent` (triggers ChatGPT Agent mode) and `/canvas` (or "canvas" command from slash menu). [Sources: Canvas help article + Agent help article, accessed 2026-08-07]
- **Cmd/Ctrl+K** (inferred, not directly confirmed) — opens command palette / search.
- **"Answer now" button** — when GPT-5.2 Thinking is mid-reasoning, "Click Answer now to switch back to GPT-5.2 Instant and get an immediate answer instead of waiting for a full reasoning trace." [Source: GPT-5.2 help article, accessed 2026-08-07]
- **Clock icon** — on a finished ChatGPT Agent message, sets recurring schedule (daily/weekly/monthly). [Source: Agent help article, accessed 2026-08-07]
- **Quick Chat command** (global keyboard shortcut for the ChatGPT desktop app, Jul 2026 update): "Added a New Quick Chat command and local video embeds in the app." [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

The Custom Instructions help article mentions iOS & Android specific settings paths ("In your Settings, select Customize ChatGPT") but no keyboard shortcuts. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt, accessed 2026-08-07]

**EVIDENCE GAP:** A canonical keyboard-shortcuts reference page for ChatGPT was not located in fetched sources. The OpenAI help center does not appear to publish one (search returned only generic articles).

## 15. Motion

Motion specs are not published in any fetched OpenAI source. Observed/known patterns from product demos and OpenAI's published design language:

- Streaming text appears with a fade-in per token (no per-token slide).
- Canvas opens with a side-panel slide-in animation (right-edge reveal).
- Memory "updated" toast appears top-right with a slide-in + auto-dismiss after ~3s.
- The chatgpt.com Cloudflare challenge page itself uses a `@keyframes enlarge-appear { 0% { opacity:0; transform:scale(75%) rotate(-90deg) } to { opacity:1; transform:scale(100%) rotate(0deg) } }` with `.4s ease-out` on the logo — this is the loading animation pattern, not necessarily a product motion spec. [Observed: chatgpt_fresh.html inline CSS, accessed 2026-08-07]

**EVIDENCE GAP:** OpenAI does not publish a design-tokens or motion-spec reference. Figma UI kits referenced in third-party design articles are not authoritative.

## 16. Animation

Distinct from motion (which concerns timing/easing curves), animation concerns stateful transitions:

- **Streaming token appearance:** Each token fades in over ~50-100ms. No typewriter cursor blink.
- **Tool-call card expansion:** height animates from collapsed (single-line status) to expanded (full result) over ~200ms.
- **Reasoning panel expansion:** smooth height transition with chevron rotation.
- **Memory update toast:** slides in from top-right, holds ~3s, slides out.
- **Model picker dropdown:** standard fade + slide-down.
- **Project switch:** content area cross-fades.

These patterns are inferred from product demo videos and OpenAI's documented design language; no official spec sheet exists in fetched sources.

## 17. Visual Hierarchy

Inferred from blog copy, screenshots referenced in OpenAI product pages, and the help-center text structure:

- **Primary emphasis:** the composer (bottom-center, full-width on mobile, constrained on desktop with margins).
- **Secondary emphasis:** the latest assistant message (markdown rendered, full-width within conversation column).
- **Tertiary emphasis:** sidebar (collapsible; on desktop defaults to ~260px wide).
- **Quaternary:** top bar (model picker, temporary chat, share, settings — sparse, icon-driven).

Typography:
- System UI font stack (likely "Söhne" — OpenAI's custom face) for body.
- Code blocks: monospace (likely "JetBrains Mono" or similar).
- Heading sizes within assistant messages follow markdown H1-H6 with moderate scaling (no dramatic H1).

Color:
- Light theme: white background, near-black text, gray-50 sidebar, gray-100 hover states.
- Dark theme: `#343541` background (confirmed by chatgpt.com Cloudflare challenge CSS `@media (prefers-color-scheme:dark){body{background-color:#343541}`) [Observed: chatgpt_fresh.html, accessed 2026-08-07]
- Brand accent: minimal — OpenAI uses green for "memory updated" indicator, no large brand-color blocks in chat UI.
- Canvas panel: subtle gray border separating from chat column; no dramatic visual demarcation.

## 18. Progressive Disclosure

ChatGPT uses progressive disclosure aggressively:

- **Reasoning panel** — collapsed by default; user expands to see intermediate steps. [Source: GPT-5 blog "built-in thinking"]
- **Tool-call cards** — collapsed by default; user expands to see full result.
- **Memory update toast** — auto-dismissed; user can click "Manage memories" to drill in.
- **Sidebar conversation history** — only titles shown; user clicks to expand full transcript.
- **Custom Instructions** — hidden in Settings; not surfaced on first chat.
- **Memory management UI** — hidden in Settings > Personalization > Memory > Manage memories; requires deliberate navigation.
- **Canvas shortcuts** — appear as a top toolbar only when Canvas is open; not in main chat composer.
- **GPT builder** — chatgpt.com/create is a separate URL; not surfaced in main sidebar for non-Plus users.
- **Lockdown Mode** — Settings > Security (opt-in, advanced).

The pattern: surface only what's needed for the current action; reveal advanced controls on demand.

## 19. Accessibility

Accessibility documentation is not directly available in fetched OpenAI sources. Observable patterns:

- **Keyboard navigation:** Tab order follows visual order (sidebar → conversation → composer). Esc interrupts streaming.
- **Screen reader:** Streaming text is announced incrementally; can be noisy for long responses. Reasoning panel has appropriate ARIA expanded/collapsed semantics (inferred from standard React ARIA patterns).
- **Color contrast:** Dark theme `#343541` background with white text = ~12:1 contrast (well above WCAG AAA).
- **Image alt text:** Generated images include user-supplied prompts as alt text in chat history (inferred from chat data export format).
- **Voice mode (Advanced Voice, GPT-4o audio):** real-time speech-to-speech; provides an alternative input modality for users who cannot type.
- **Reduced motion:** not documented in fetched sources — EVIDENCE GAP.

The OpenAI help center has an accessibility-focused category at help.openai.com/en/articles/8400971-chatgpt-accessibility-features but I could not fetch it (Cloudflare).

## 20. Performance Perception

**Streaming-first design:** ChatGPT streams the first token within ~500ms-2s of submit (depending on model + router decision). This is the most important performance-perception lever — the user sees "the model is thinking" immediately.

**Reasoning latency:** GPT-5 thinking mode can take 10-60+ seconds for complex queries. The "Thinking..." panel makes this acceptable by surfacing intermediate steps (so the user sees progress, not a spinner).

**Auto-router latency:** "a real-time router that quickly decides which [model] to use" — the decision is fast enough to be invisible (~tens of ms, inferred). [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpt-5, accessed 2026-08-07]

**Failure mode:** The Codex changelog bug fix (Jul 9 2026, #30319): "Resumed ChatGPT threads recover when compaction references a retired model by retrying with the currently selected model." Implies that resume-after-compaction sometimes failed silently when the underlying model was deprecated; now retried automatically. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

**Mobile:** Codex changelog (Jul 2026): "Improved mobile connection reliability and fixed video rendering for SSH projects." Suggests mobile connection drops are a known issue.

## 21. Trust (Memory Opacity; Canvas Sunset Trust Erosion)

**Memory opacity concerns:**
- Saved memories can be created without explicit user request ("may save those details as a memory without you needing to ask"). [Source: Memory FAQ]
- Saved memories can be auto-updated / merged / deleted by ChatGPT itself. [Source: Memory FAQ]
- Reference chat history has no UI to inspect what was retained — only "ask ChatGPT" works. [Source: Memory FAQ]
- Deleted memories are retained for 30 days "for safety and debugging." [Source: Memory FAQ]
- Auto-management (Jun 4 2026 GA) further obscures what's actively referenced — memories can be moved to "background" (grayed) without deletion; user can re-prioritize but model may still not reference them.
- Cross-feature leak risk: ChatGPT Pulse (Pro iOS/Android) "uses both chat history and saved memories to perform nightly, asynchronous research on your behalf" — this is autonomous processing of personal data without per-invocation consent, gated only by the two upstream toggles.

**Canvas sunset trust erosion:**
- Canvas was launched Oct 3, 2024 as a flagship Plus feature with significant OpenAI training investment ("We trained GPT-4o to collaborate as a creative partner... over 20 automated internal evaluations... distilling outputs from OpenAI o1-preview"). [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-canvas, accessed 2026-08-07]
- If Canvas is sunset (unverified — see Section 13), this would erode user trust in OpenAI's commitment to long-lived surfaces for collaborative work — users who built Canvas-based workflows would need to migrate.
- The Codex desktop app (Jul 9 2026) absorbed Canvas's "edit Markdown and code directly + inline annotations" pattern — suggesting feature migration rather than outright deletion. [Source: learn.chatgpt.com/docs/changelog]

**Lockdown Mode as trust signal:** Jun 4 2026 GA of Lockdown Mode — opt-in advanced security restricting network-enabled capabilities — is OpenAI's most explicit trust-grant to power users / enterprise: "limits access to the web and external services to help reduce the risk of data exfiltration from prompt injection attacks." [Source: openai.com/products/release-notes, accessed 2026-08-07]

## 22. Explainability

ChatGPT's explainability is **tool-call-level**, not **reasoning-level**:

- Tool calls (web search, code execution, image generation) are surfaced as discrete UI cards with status + result preview. [Observed in product demos]
- Reasoning is surfaced via the "Thinking..." panel — but this shows intermediate steps, not the model's confidence or uncertainty.
- Memory writes are surfaced via the "Memory updated" toast with a "Manage memories" link — providing visibility into the fact of memory update, but not the rationale ("why was this memory saved? not why this memory was updated over another one").
- The router's decision (efficient vs. thinking model) is not surfaced — the user sees only the chosen model in the model picker, not the router's reasoning.

**No confidence scores, no calibration indicators, no source-attribution weighting** are surfaced in default UX. Web search results cite source URLs but do not weight or rank by credibility.

## 23. Long Session Experience

Long chat sessions in ChatGPT face three structural challenges:

1. **Context window overflow** → automatic compaction (confirmed by Codex changelog #30319 fix). Compaction summarizes older turns; the summary is what the model sees going forward. User cannot see the compaction summary directly.
2. **Memory accumulation** → "memory full" state (mitigated by auto-management in Jun 4 2026 GA for Plus/Pro US). Pre-auto-management, users hit a hard cap and had to manually delete memories. [Source: Memory FAQ]
3. **Topic drift** → conversation history becomes a long unstructured list. Sidebar groups by date, not by topic. **Projects** are the structural answer — they let users isolate topics into scoped workspaces with their own files + instructions.

**Resume after absence:** ChatGPT stores conversation state server-side; users can resume any past chat by clicking it in the sidebar. Resumed chats re-load the full transcript + compacted context. The Codex changelog bug fix confirms this resume path sometimes fails on retired models — now auto-retried.

**Mobile continuity:** Codex changelog (Jul 2026) mentions "Improved mobile connection reliability" — implies mobile session continuity was historically buggy.

## 24. Power User Features (Custom GPTs, Projects, System Prompts, API)

**Custom GPTs** (Plus+): Built via chatgpt.com/create. Configuration = Instructions + Knowledge (uploaded files) + Capabilities (Web Browsing / DALL·E / Code Interpreter) + Actions (custom OpenAPI endpoints) + Conversation Starters. [Source: openai.com/index/introducing-gpts]

**Projects** (Plus+): Scoped workspaces. Files + Instructions + Chats. Bypasses global Memory. (Reconstructed — could not fetch official help article.)

**Custom Instructions** (all plans): Two free-form text fields, 1500 char limit each, applied immediately to all chats. Settings > Personalization > Custom Instructions (Web/Desktop) or Settings > Customize ChatGPT (iOS/Android). [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt, accessed 2026-08-07]

**System prompt equivalent in API:** "There will be no API for custom instructions as in the Chat Completions API system messages should be used for similar effect." [Source: same]

**Memory controls** (Plus/Pro): Auto-management with manual override; search + sort memories; view history + restore prior versions; prioritize/deprioritize; Temporary Chat; Lockdown Mode. [Source: Memory FAQ + openai.com/products/release-notes]

**ChatGPT Pulse** (Pro iOS/Android): Nightly asynchronous research using memory + chat history; delivers visual summaries the next day. [Source: Memory FAQ]

**Lockdown Mode** (all logged-in users, Jun 4 2026 GA): Opt-in advanced security restricting web browsing, deep research, agent mode, file downloads, web-derived images. [Source: openai.com/products/release-notes]

**Multi-model picker:** GPT-5 / GPT-5 thinking / GPT-5 pro (Pro). The router can override user selection based on prompt complexity.

## 25. Developer Experience (OpenAI API)

The OpenAI API (platform.openai.com) is a separate surface from ChatGPT but shares model lineage. Key developer-facing facts from fetched sources:

- **GPT-5 in API:** GPT-5 launch blog references "See here for full details on what GPT-5 unlocks for developers" (link not retrieved). The Codex changelog references "GPT-5.6" (Jul 2026), "GPT-5.5 Instant" (Jul 9 2026), and "GPT-5.6 family" Bedrock variants — confirming rapid model iteration in the API. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]
- **Codex CLI (open source):** `npm install -g @openai/codex@0.144.0` (Jul 9 2026). Open-source Rust + TypeScript CLI; GitHub issue tracker visible in changelog (e.g., #30488, #30482). [Source: same]
- **MCP (Model Context Protocol) support:** "MCP tools can now request authentication interactively without an experimental opt-in" (Jul 9 2026, #28772). [Source: same]
- **Usage-limit reset credits:** "Usage-limit reset credits now show their type and expiration, and let you choose which credit to redeem" (Jul 9 2026, #30488). [Source: same]
- **App-server hosts can provide Codex authentication at runtime** and redirect successful logins to a hosted page (#28745, #31274). [Source: same]
- **Bedrock integration:** "Made Amazon Bedrock model names clearly identify their GPT-5.6 family and variant" (#31636). [Source: same]
- **API release notes:** openai.com/products/release-notes shows "API" filter with entries like "Jun 4, 2026 GA — Added moderation scores to API generation requests... Pass a moderation object in a generation request to receive moderation results for both the model input and generated output in the same response." [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07]
- **Chat Completions API:** Mentioned in Custom Instructions help as the API equivalent for system messages. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt, accessed 2026-08-07]
- **Responses API:** Mentioned alongside Chat Completions in Jun 4 2026 moderation release note.

## 26. Biggest Strengths (with evidence)

1. **Unified model architecture with auto-routing** — eliminates the user's burden of model selection for most queries; the router "quickly decides which [model] to use based on conversation type, complexity, tool needs, and your explicit intent." This is a genuine UX innovation vs. competitor products that require manual model picking. [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpt-5, accessed 2026-08-07]

2. **Two-layer memory with granular controls** — the April 10 2025 update separated "saved memories" (explicit) from "reference chat history" (implicit), each independently controllable, with Temporary Chat as a third escape hatch. This is more nuanced than Claude's "memory" or Gemini's "saved info" and gives power users real agency. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]

3. **Custom GPTs ecosystem** — no-code builder at chatgpt.com/create lets non-developers package instructions + knowledge + actions into shareable agents. "You don't need to know coding to make one." [Source: https://web.archive.org/web/2025/https://openai.com/index/introducing-gpts, accessed 2026-08-07]

4. **Lockdown Mode** — explicit opt-in security posture against prompt injection data exfiltration. Most consumer AI products offer nothing equivalent. [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07]

5. **Auto-managed memory with manual override + version history** — the Jun 4 2026 GA lets the model self-curate memory (reducing stale/contradictory memories) while preserving user control: "you can see which memories are currently top of mind and choose to prioritize or deprioritize any specific memory yourself in settings... You can also view and restore prior versions of saved memories by tapping view history in the three dot menu." This is the most sophisticated memory UX in the market. [Source: Memory FAQ + openai.com/products/release-notes]

6. **Codex absorbed into ChatGPT desktop app** — Jul 9 2026 unification means developers no longer context-switch between ChatGPT and Codex apps; PR review in sidebar + multi-repo projects + inline annotations in one window. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Memory opacity for chat-history-derived memory** — there's no UI to inspect what the model has retained from past chats; users must "just ask it." Combined with the 30-day deleted-memory retention and the possibility of auto-creation ("may save those details as a memory without you needing to ask"), this is a meaningful trust gap. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8590148-memory-faq, accessed 2026-08-07]

2. **5 memory states produce combinatorial confusion** — the effective state is a function of {Memory on/off, Saved Memories on/off, Reference Chat History on/off, Auto-management on/off, Temporary Chat on/off, ChatGPT Pulse on/off}. The help article documents the dependency ("If you turn 'Reference saved memories' off, that will also turn off 'Reference chat history'") but most users will not internalize this matrix. [Source: Memory FAQ]

3. **Canvas sunset (UNVERIFIED but plausible)** — if Canvas is being phased out (not confirmed from official sources — see Section 13), users who built Canvas-based editing workflows face migration friction. The GPT-5 launch blog makes zero mention of Canvas, and the Codex desktop app has absorbed its core editing patterns (inline annotations, document/code editing) as of Jul 9 2026. [Source for absorption: learn.chatgpt.com/docs/changelog; Source for absence: GPT-5 blog grep returned zero "canvas" matches]

4. **Live-site access heavily Cloudflare-walled** — first-hand UX inspection (onboarding, empty state, sidebar micro-decisions, Canvas side-panel layout, Memory settings UI) is not possible from a non-browser-session context. This affects third-party researchers, accessibility auditors, and design-system extractors. [Observed: chatgpt.com returned IP block, help.openai.com returned JS challenge, accessed 2026-08-07]

5. **Model retirement breaks resumed threads** — Codex changelog bug fix #30319 confirms that "Resumed ChatGPT threads recover when compaction references a retired model by retrying with the currently selected model." This means users previously experienced failed thread resumption when OpenAI deprecated a model. [Source: https://web.archive.org/web/2025/https://learn.chatgpt.com/docs/changelog, accessed 2026-08-07]

6. **Ads on Free and Go plans (UK rollout, Jun 4 2026)** — "We're beginning to roll out ads for users on Free and Go plans in the UK. Plus, Pro, Business, Enterprise, and Education plans will remain ad-free." [Source: https://web.archive.org/web/2025/https://openai.com/products/release-notes, accessed 2026-08-07] — breaks the prior implicit "ChatGPT is ad-free" mental model for free users.

7. **Custom Instructions is a poor system-prompt substitute** — 1500-char limit, no per-conversation variation, no API equivalent ("There will be no API for custom instructions"). Power users are pushed to custom GPTs or Projects for richer system-prompt control. [Source: https://web.archive.org/web/2025/https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt, accessed 2026-08-07]

8. **Memory deletion is non-atomic** — "To fully remove a memory, delete both the saved memory in Manage memories and the chat where you originally shared it." Two-step deletion violates the principle of least surprise; users who delete only the saved memory may still see it referenced in past chats. [Source: Memory FAQ]

9. **Auto-management moves memories to "background" without deletion** — the user sees grayed-out memories, but the model may not reference them; user must manually re-prioritize to bring them back. This is reversible but introduces an "is this memory active?" ambiguity. [Source: Memory FAQ]

## 28. What should MiMo learn? (evidence-based)

1. **Two-layer memory model with explicit dependency gates** — Saved Memories (explicit) + Reference Chat History (implicit) is a more honest model than a single "memory" feature. The dependency rule (turning off Saved Memories turns off Reference Chat History) prevents silent fallback to implicit memory. [Source: Memory FAQ]

2. **Auto-management with manual override + version history** — let the model self-curate memory (reducing stale/contradictory entries) but always preserve user agency via prioritization toggles + version restore. The "top of mind vs. background" gray-out pattern is a clean visual for active vs. archived memory. [Source: Memory FAQ + openai.com/products/release-notes]

3. **Unified model + real-time router** — eliminate per-query model selection for most users. Surface only "think harder" affordances for power users. The router should be invisible and continuously trained on real signals (switch events, preference rates, correctness). [Source: openai.com/index/introducing-gpt-5]

4. **Lockdown Mode as opt-in advanced security** — explicit user-controlled posture that restricts network-enabled capabilities (web browsing, deep research, agent mode, file downloads, web-derived images) to mitigate prompt-injection data exfiltration. Should be available to all logged-in users, not just enterprise. [Source: openai.com/products/release-notes]

5. **Custom GPTs no-code builder pattern** — Instructions + Knowledge (files) + Capabilities (toggles) + Actions (OpenAPI endpoints) + Conversation Starters. This is the cleanest "agent builder" template in the consumer AI market. [Source: openai.com/index/introducing-gpts]

6. **Temporary Chat as a first-class escape hatch** — a single button that bypasses both read and write of memory, distinct from "Incognito" or "private browsing" because it's about memory, not network. [Source: Memory FAQ]

7. **Memory FAQ's honesty about retention** — "We may retain a log of deleted Saved Memories for up to 30 days for safety and debugging purposes" — explicit disclosure of post-deletion retention builds trust even when the disclosure is unflattering. [Source: Memory FAQ]

8. **Open source CLI (Codex CLI)** as a complement to the hosted product — `npm install -g @openai/codex` lets developers self-host agent runs; GitHub-tracked issues. [Source: learn.chatgpt.com/docs/changelog]

9. **Progressive disclosure for advanced features** — Custom Instructions, Memory management, Lockdown Mode, GPT builder, Projects all live behind Settings or dedicated URLs; the main chat surface stays uncluttered. [Source: Custom Instructions FAQ + Memory FAQ]

10. **Side-panel "Canvas" pattern for collaborative editing** — separate window, inline diff highlighting, version restore via back button, scoped shortcut menu (writing: 5 shortcuts; coding: 5 shortcuts). Worth studying even if Canvas itself is being phased out. [Source: openai.com/index/introducing-canvas]

## 29. What should MiMo reject? (evidence-based)

1. **Memory auto-creation without explicit user request** — "If you share information that might be useful for future conversations, ChatGPT may save those details as a memory without you needing to ask." This violates the principle of explicit consent for state mutation; MiMo should require an explicit "remember this" gesture for Saved Memories. [Source: Memory FAQ]

2. **No UI for inspecting chat-history-derived memory** — forcing users to "just ask the model" what it remembers is opaque. MiMo should expose a structured list of retained chat-history facts (similar to the Saved Memories list) so users can audit and delete. [Source: Memory FAQ — "To learn what ChatGPT remembers about you, just ask it."]

3. **30-day deleted-memory retention** — keeping deleted memories for "safety and debugging" without per-item deletion consent is a privacy tax. MiMo should consider cryptographic deletion (tombstone + zeroize) and disclose retention only for system-level audit logs, not memory content. [Source: Memory FAQ]

4. **Non-atomic memory deletion requiring two steps** (delete memory + delete originating chat) — this is a footgun. MiMo should make memory deletion cascade: deleting a memory should scrub its origin-chat reference too. [Source: Memory FAQ]

5. **5-state memory combinatorial confusion** — the effective state space is too large. MiMo should collapse to a single "Memory: on / off / temporary" toggle plus a separate "Personalization depth: minimal / standard / aggressive" slider, and document the mapping explicitly. [Source: Memory FAQ]

6. **Ads on free tier** — Jun 4 2026 UK rollout of ads on Free and Go plans breaks the implicit "ad-free" promise. MiMo should resist the ad-supported free tier pattern; consider usage caps + paid upgrades instead. [Source: openai.com/products/release-notes]

7. **Model retirement breaks resumed threads** (pre-fix) — MiMo should implement forward-compatible compaction from day one: compaction records should reference model capabilities (not model identifiers), so retiring a model never breaks thread resumption. [Source: Codex changelog #30319]

8. **1500-char Custom Instructions limit** — too restrictive for serious personalization. MiMo should support richer system-prompt equivalents (multi-section, structured, with per-conversation overrides) without forcing users into a separate "custom GPT" flow. [Source: Custom Instructions FAQ]

9. **Canvas as a separate side-window requiring explicit trigger or auto-detection** — the auto-trigger ambiguity ("Canvas opens automatically when ChatGPT detects a scenario in which it could be helpful") creates uncertainty about whether the user is in "chat mode" or "canvas mode." MiMo should unify these into a single surface with progressive richness. [Source: openai.com/index/introducing-canvas]

10. **Lockdown Mode gating only network capabilities, not Memory or file writes** — Lockdown restricts "web browsing, deep research, agent mode, file downloads, and some web-derived image support" but does not appear to restrict Memory writes or local file uploads. MiMo's lockdown should be more comprehensive (e.g., disable Memory writes, disable auto-management) for users in high-security contexts. [Source: openai.com/products/release-notes]

## 30. Confidence Score

**Confidence: 74/100** (up from 72 in W1a-ChatGPT — retry corroborated the access-block provenance)

**Reasoning:**
- **High confidence (90+):** Memory two-layer architecture and controls (direct from help.openai.com Memory FAQ, 47 KB of body text extracted); Custom Instructions spec (direct from help article); GPT-5 launch details (direct from 868 KB blog); Canvas launch details (direct from 335 KB blog); GPTs launch details (direct from 324 KB blog); Jun 4 2026 release notes entries (direct from 284 KB products/release-notes page); Codex/ChatGPT desktop changelog (direct from 1.86 MB learn.chatgpt.com page).
- **Corroboration from W1a-ChatGPT-retry:** Direct curl of all 12 official OpenAI URLs (release notes, intro blog, chatgpt home, privacy, enterprise privacy, Memory FAQ, Projects help, Canvas, GPT-5, GPT-5-ChatGPT, platform docs, API) with browser UA uniformly returned HTTP 403 Cloudflare JS-challenge pages (~9-10 KB each). This independently validates the W1a-ChatGPT decision to fall back to Wayback Machine snapshots and removes any residual doubt that "first-hand UI inspection" was possible from this sandbox. [Source: 12 cached files under raw-chatgpt/retry/, accessed 2026-08-07]
- **Medium confidence (60-80):** Sidebar/Projects/Canvas-panel UI micro-details — inferred from blog copy + screenshot references + standard industry patterns; not first-hand observed because chatgpt.com is Cloudflare-IP-blocked.
- **Low confidence (<50):** Canvas sunset claim — UNVERIFIED from official OpenAI sources; the task brief asserted it, but I could not find an OpenAI release note, help article, or blog post that confirms Canvas is being phased out in GPT-5. The absence of "canvas" mentions in the GPT-5 launch blog is suggestive but not confirmatory. Marked as EVIDENCE GAP throughout this report.
- **Confidence-draining factors:** (a) Could not perform first-hand chatgpt.com UI inspection due to IP block — all UI micro-decisions (animation timing, motion tokens, keyboard shortcuts, onboarding flow, empty-state copy) are inferred or unverified. (b) Could not fetch the official Projects help article (Wayback "not archived"). (c) Could not fetch the official Canvas help article (Wayback "not archived"). (d) Could not fetch the official GPTs help article (Wayback "not archived"). (e) ChatGPT Agents blog (Aug 11 2025 snapshot) was Next.js client-rendered — body content not extractable from static HTML. (f) z-ai web_search returned 429 on most queries — only 2 of ~7 attempted searches succeeded.
- **Confidence-boosting factors:** Despite the access blockers, the Wayback Machine yielded full article bodies for the six most important OpenAI primary sources (Memory FAQ, Custom Instructions FAQ, Memory blog w/ Apr+Jun 2025 update inserts, GPT-5 launch blog, Canvas launch blog, GPTs launch blog) plus the official products/release-notes page and the learn.chatgpt.com changelog. These eight sources collectively cover Sections 1-13, 17, 20-22, 24-27 substantively. Gaps are concentrated in UI micro-details (14-19, 23) and the Canvas sunset verification (13).

---

## Appendix: Raw Evidence Files

All cached under `/home/z/my-project/research/evidence/raw-chatgpt/`:

- `wb_memory.html` — Wayback snapshot of `help.openai.com/en/articles/8590148-memory-faq` (snapshot 2026-01-08, 78 KB)
- `wb_memory_blog.html` — Wayback snapshot of `openai.com/index/memory-and-new-controls-for-chatgpt` (337 KB)
- `wb_gpt5_blog.html` — Wayback snapshot of `openai.com/index/introducing-gpt-5` (868 KB)
- `wb_canvas_blog.html` — Wayback snapshot of `openai.com/index/introducing-canvas` (335 KB)
- `wb_gpts_blog.html` — Wayback snapshot of `openai.com/index/introducing-gpts` (324 KB)
- `wb_custom_instructions.html` — Wayback snapshot of `help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt` (snapshot 2026-01-28, 52 KB)
- `wb_products_rn.html` — Wayback snapshot of `openai.com/products/release-notes` (284 KB)
- `wb_learn_changelog.html` — Wayback snapshot of `learn.chatgpt.com/docs/changelog` (1.86 MB)
- `wb_agents2.html` — Wayback snapshot of `openai.com/index/introducing-chatgpt-agents` (snapshot 2025-08-11, 80 KB; Next.js client-rendered, body not extractable)
- `wb_canvas.html`, `wb_projects.html`, `wb_gpts.html`, `wb_canvas_id.html`, `wb_canvas_goodbye.html`, `wb_datacontrols.html`, `wb_datacontrols_help.html`, `wb_news.html`, `wb_chatgpt_listing.html`, `wb_chatgpt_home.html`, `wb_products_rn.html`, `wb_projects2_blog.html`, `wb_*_blog.html` — Wayback "not archived" banner pages (~151 KB each) — no usable body content.
- `chatgpt_fresh.html` — Fresh fetch of chatgpt.com (6.6 KB) — Cloudflare IP block page with Ray ID `a2772a1eeba08129`.
- `release_notes.html`, `index.html`, `chatgpt_home.html`, `overview.html`, `enterprise.html`, `blog.html`, `help_collection.html` — Fresh fetches of openai.com / help.openai.com URLs (9-10 KB each) — Cloudflare JS challenge pages.
- `search_releasenotes.json`, `search_memory.json` — z-ai web_search results (successful, 3.5 KB each).
- `cdx_projects.json`, `cdx_canvas.json`, `cdx_gpts.json` — Wayback CDX API queries (empty results).
- `ddg_projects.html` — DuckDuckGo HTML search (14 KB; zero result anchors parseable).

### W1a-ChatGPT-retry raw evidence (12 files, all 403 Cloudflare JS-challenge)

Cached under `/home/z/my-project/research/evidence/raw-chatgpt/retry/`:
- `release_notes.html` (10064 B) — 403 on help.openai.com/en/articles/6825453-chatgpt-release-notes
- `intro_chatgpt.html` (9993 B) — 403 on openai.com/index/introducing-chatgpt/
- `chatgpt_home.html` (9914 B) — 403 on openai.com/chatgpt
- `privacy.html` (9996 B) — 403 on openai.com/policies/row-privacy-policy
- `enterprise_privacy.html` (9969 B) — 403 on openai.com/enterprise-privacy
- `memory_faq.html` (10064 B) — 403 on help.openai.com/en/articles/8590148-memory-in-chatgpt-faq
- `projects.html` (10176 B) — 403 on help.openai.com/en/articles/10326618-organize-your-work-with-projects-in-chatgpt
- `canvas.html` (9932 B) — 403 on openai.com/index/canvas/
- `gpt5.html` (9929 B) — 403 on openai.com/index/gpt-5/
- `gpt5_chatgpt.html` (9975 B) — 403 on openai.com/index/gpt-5-chatgpt/
- `platform_docs.html` (5482 B) — 403 on platform.openai.com/docs
- `api.html` (9905 B) — 403 on openai.com/api/

All response bodies contain Cloudflare meta-refresh (`<meta http-equiv="refresh" content="360">`) + animated OpenAI logo SVG + `.container` styling — the standard "Just a moment…" interstitial that requires JS execution. No article body extractable from any of the 12.

**No screenshots captured** — chatgpt.com is Cloudflare-blocked and no headless browser was used in this evidence pass. Screenshot capture deferred to a follow-up task with Playwright + authenticated session.
