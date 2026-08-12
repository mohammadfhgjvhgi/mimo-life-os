# Google Gemini — Evidence-First Product Research

**Product:** Google Gemini (Gemini Apps, gemini.google.com, mobile apps, Gemini in Chrome, on smartwatch)
**Task ID:** W1b
**Phase:** R2 — Evidence-Based
**Author:** Senior Product Researcher (general-purpose sub agent)
**Date compiled:** 2026-08-07
**Method:** All claims cited with `[Source: <URL>, accessed 2026-08-07]`. Cached raw HTML in `research/evidence/raw-gemini/`, clean text in `research/evidence/raw-gemini/text/`. web_search returned persistent HTTP 429 (rate-limited) across both first attempt and 30-second retry; per task instructions, fell back to `curl -sL -A "Mozilla/5.0..."` on known official URLs (blog.google/products/gemini, deepmind.google/technologies/gemini, support.google.com/gemini/answer/*). gemini.google.com itself is a JS-rendered SPA that returns a Google "Error 404" on the `/overview/` path; the Help Center (`support.google.com/gemini`) is statically served and was the most reliable source. Interactive use (sign-in to gemini.google.com) was NOT possible in the sandbox.

---

## 1. Product Overview

Gemini is Google's consumer-facing family of AI assistants, served through (a) the Gemini web app at `gemini.google.com`, (b) the Gemini mobile app on Android and iOS, (c) Gemini in Chrome, and (d) Gemini on smartwatches. The product is positioned as Google's "best family of AI models on your device" with capabilities spanning writing, brainstorming, learning, summarization of Gmail/Drive, image generation, voice/photo/camera input, and on Android, "Hey Google" hands-free activation. [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]

The DeepMind technology page markets Gemini as the flagship foundation model with sibling products: Gemini Omni ("Create anything from anything"), Nano Banana (image editing), Gemini Audio, plus specialized models Veo (video), Imagen (images), Lyria (audio), Genie 3 (world models), Gemini Robotics, and Gemma (open weights). [Source: https://deepmind.google/technologies/gemini/, accessed 2026-08-07]

The official Google blog news listing for "Gemini" shows the latest marketing beats: "Gemini App" (e.g., "Find out what's new in the Gemini app in July's Gemini Drop", "Gemini Spark now integrates with Chrome", "Gemini for macOS adds new natural language capabilities"), "Gemini Models" ("How Gemini Flash agents are helping a Michigan dairy farmer", "Introducing Gemini 3.6 Flash, 3.5 Flash-Lite, and 3.5 Flash Cyber"), and "Gemini Features" (Pixel Drop, Android Gemini Intelligence). [Source: https://blog.google/products/gemini/, accessed 2026-08-07]

**Observed (sandbox-level):** `gemini.google.com` itself cannot be visited without a signed-in Google session; the public surface is the Help Center and the DeepMind/blog marketing pages.

## 2. Product Philosophy

The Help Center frames Gemini explicitly as an assistant that "supercharge[s] your ideas" through "direct access to Google's best family of AI models on your device", and emphasizes multi-modal input (type, talk, photo, camera) and Google ecosystem integration (Maps, Flights, Gmail, Drive, Photos). [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]

Personalization is treated as a first-class product pillar ("Get personalization in Gemini Apps based on: the memory of your past Gemini chats, your content and activity in certain Google apps you connect to Gemini, your preferences, like instructions on how you want Gemini to respond"). [Source: https://support.google.com/gemini/answer/16598623, accessed 2026-08-07]

The product differentiates itself from "single-LLM-in-a-textbox" competitors by treating Google's services stack (Workspace, Photos, Maps, Flights, Home, Android device actions) as first-class agent context — see Section 10. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

## 3. Core Mental Model

Two overlapping mental models coexist:

- **Chat as the default surface** — text box at the bottom of `gemini.google.com`; user types a question or prompt; Gemini responds with streaming text. [Observed in multiple help articles that consistently start with "go to gemini.google.com" → "in the text box" → "click Submit". Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

- **Mode-pickers layered onto the chat box** — the same text box gains an "Add Files" picker that exposes Deep Research, Canvas, file upload, image upload, and the "@app" mention syntax to invoke Connected Apps. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07 — "Below the text box at the bottom, click Add Files Canvas"; Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07 — "In the text box, click Add Files Deep Research"; Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07 — "To specify an app for Gemini to use, enter @ and select the app".]

The mental model is therefore: **"single chat surface, switchable modes"** — in contrast to products like ChatGPT where Canvas and Deep Research are separate entry points.

## 4. User Journey

Documented Deep Research journey (most explicit journey artifact available):

1. On computer, go to `gemini.google.com`. 
2. In the text box, click "Add Files → Deep Research". 
3. (Optional) Upload files or image via "Add Files → Files".
4. (Optional) Click "Sources" and select Gmail, Drive, NotebookLM notebooks, etc. Google Search is default and can be deselected.
5. Enter question/prompt in the text box.
6. Click Submit → "Gemini will create a research plan for your topic."
7. (Optional) "Edit plan" before generating.
8. Click "Start research".
9. Wait. "It usually takes about 5-10 minutes to generate the report since Gemini analyzes many sources. For more complex reports, it may take longer."
10. "When your report is ready, click Open."
11. While waiting, "you can leave the chat. When it's ready, Gemini will notify you: in the web app: next to the chat thread; in the mobile app: as a notification on your device." [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

Canvas journey is similar (text box → "Add Files → Canvas" → enter prompt → Submit → Canvas panel opens on the right). [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

Gem journey diverges: click "Open Sidebar" → "Gems" → "New Gem" → enter name + instructions → (optional) add Knowledge files → "Save" → Gem appears in web app, mobile app, and Google Workspace side panel. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

## 5. Navigation

The persistent left-hand **Sidebar** is the dominant navigation: "Click Open Sidebar" is the documented entry point to Gems, recent chats, and Settings & help. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

The Sidebar surfaces **Recent** chats (where Deep Research reports live — "Under 'Recent,' find your research chat") and a dedicated **Gems** section that lists "My Gems" created by the user plus premade Gems. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

A **Canvas panel** appears on the right when a Canvas session is active — housing Code view, console, Show recent changes, Select & ask, Add Gemini features, Share & export, Create Audio Overview, Create (visualization). [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

Settings are reached via "Settings & help" at the bottom — submenus include **Personal Intelligence** (Memory, Connected Apps) and **Gems**. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

On mobile, navigation is via the hamburger Menu at top, and feature availability differs from web (some features "not yet available in the Gemini mobile app"). [Source: https://support.google.com/gemini/answer/15236321, accessed 2026-08-07]

## 6. Workspace

The **Canvas** workspace is the primary "artifact surface" — a side panel where users "collaborate with Gemini in Canvas to create or edit a doc, app, slides, or code. You can also turn your creation into an Audio Overview, quiz, or other format." Canvas supports direct text editing, prompt-box editing, code editing, and a console. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

Specifically Canvas supports: (a) **Docs** — direct edit + "Suggest edits" + Change length/tone + LaTeX + version history (Previous Version / Next Version); (b) **Apps & code** — Code view, Show console, Show recent changes, Select & ask, Add Gemini features (text/image generation); (c) **Audio Overview** generation; (d) **Visualization** ("Create a custom visualization based on the report, enter the description as a prompt"). [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

Deep Research produces a **report document** that lives in the Canvas panel with Share & export options: "Share Canvas", "Export to Docs", "Copy Contents". [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The workspace is therefore a **right-side dockable Canvas panel**, not a separate full-page document editor — it coexists with the chat on the left.

## 7. Conversation

Streaming responses are documented for Deep Research outputs and chat replies ("support real-time streaming" is implied by Canvas flow). The Deep Research model offers two reasoning modes: "Thinking" (available to all users) and "Pro" (Google AI Pro / Ultra plans). "Google AI Pro and Google AI Ultra users can generate reports using Pro for even higher quality. All users can use Thinking for their reports." [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The conversation pane shows notifications inline ("next to the chat thread with your completed report" when a Deep Research job completes). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

Voice conversation is supported through **Gemini Live** — referenced in limitations ("For now, Gems can't be used with Gemini Live", "In a text chat, you can ask Gemini to reference a past Gemini Live conversation"). [Source: https://support.google.com/gemini/answer/15236321, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]

## 8. Agent Experience

**Gems** are the consumer-facing agent feature: "customized versions of Gemini that help you tackle repetitive tasks or get deep expertise in new areas. When you chat with a Gem, Gemini will tailor responses to save time on repeat goals and guidelines." [Source: https://support.google.com/gemini/answer/15236321, accessed 2026-08-07]

A Gem consists of: a name, free-text instructions, optional Knowledge (uploaded files, Drive files, or NotebookLM notebooks), and an optional "Use Gemini to re-write instructions" enhancement. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

Gems propagate across surfaces — "When you create a Gem in the Gemini web app, it will appear in the Gemini mobile app and the Gemini side panel in Google Workspace." [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

Experimental Gems exist ("try out early-stage Gemini features through Gems and share feedback"). [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

Gems are **single-agent** (one custom Gemini per Gem) — there is no documented multi-agent orchestration surface in the consumer app. The "agent" framing here is closer to "saved persona/prompt-template-with-knowledge" than to autonomous task agents.

Gemini Spark is the consumer-facing agentic layer that takes actions in connected apps — "Use Gemini Spark to manage your tasks & workflows in Gemini Apps", "Find & manage your Gemini Spark tasks", "Create & manage schedules for tasks in Gemini Spark", "Connect & manage custom apps for Gemini Spark". [Source: extracted from https://support.google.com/gemini/ support_home page listing, accessed 2026-08-07; raw at research/evidence/raw-gemini/support_home.html]

## 9. Memory

Memory is a tiered system:

- **Chat history** — "Recent" in the Sidebar; required for retrieving Deep Research reports ("You can only find past research reports if your Keep Activity setting is on"). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

- **Long-term Memory (personal)** — "Get personalization with memory of your past Gemini chats. With this feature, Gemini can learn from your chats to understand more about you and your world." Available only to users 18+ signed in with a personal Google Account, requires Keep Activity ON, and is **not** available in Gems or Live chats. Toggle: Settings & help → Personal Intelligence → Memory. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]

- **Verifiable introspection** — "To check if Gemini used your past chats, just ask Gemini, 'Did you use any info from past chats?'" [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]

- **Deletion/correction** — "Delete all chats with this info from Gemini Apps Activity" or correct inline ("Correct Gemini directly in your chat"). [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]

- **Connected-app-derived memory** — separate channel: "personalized Gemini experiences based on your data in certain Google apps when you connect them to Gemini Apps." [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

## 10. Knowledge

Two distinct knowledge mechanisms:

**(a) Connected Apps** — Gemini can connect to Gmail, Google Drive, Google Calendar, YouTube Music, Spotify, Google Photos, Samsung Gallery, WhatsApp (Android), Google Home, GitHub repositories ("Import a GitHub repository & ask about it in the Gemini web app"). Invoked with `@app` mention syntax in the text box. Requires Keep Activity ON; some apps are Android-only. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

**(b) Per-Gem Knowledge upload** — when creating a Gem, under "Knowledge" the user can "Add files" from device or Google Drive (most recent version is used, reflects live changes) or "More uploads → Notebooks" (NotebookLM notebooks). User can also "Disable knowledge citations" to suppress file references. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

**(c) Deep Research sources** — user picks per-session sources: Google Search (default), Gmail, Drive, NotebookLM notebooks, uploaded files. Google Search can be deselected. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

Gemini "automatically uses public information from certain Google services" even when Connected Apps is off — a notable passive-knowledge channel. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

## 11. Search

Google Search is the default in-conversation grounding source for Deep Research ("By default, Gemini includes Google Search as a source for your research"). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The Help Center does not document a discrete "search the web from chat" button separate from Deep Research — search appears to be invoked implicitly by Gemini (similar to ChatGPT's browse vs. Gemini's always-on grounding). Documentation says only that Google Search can be deselected as a Deep Research source. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

Web search is bundled into Deep Research as a multi-source planning workflow rather than a separate one-shot retrieval action — see Section 12.

## 12. Execution

**Deep Research is Gemini's flagship "long execution" surface** — and the docs reveal a transparent, multi-stage agent loop:

- Plan: "Gemini will create a research plan for your topic."
- Human-in-the-loop checkpoint: "To update the research plan before you create a report, click Edit plan."
- Execute: "Click Start research."
- Duration: "It usually takes about 5-10 minutes to generate the report since Gemini analyzes many sources. For more complex reports, it may take longer."
- Async continuation: "While you wait for the report, you can leave the chat. When it's ready, Gemini will notify you." (web app: chat thread; mobile: device notification, including on lock screen). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The user-visible "live thoughts" experience is implied by the Edit plan checkpoint — the user sees the plan Gemini generated before execution begins, providing an explicit transparency moment.

Deep Research also supports **visuals** — "With a Google AI Ultra plan, Deep Research reports can include animations and visuals. These visuals help illustrate complex data and research findings, and make reports more comprehensive and easier to understand. Visuals are included directly in the report and can include: Charts, Diagrams, Interactive simulators." (Note: "For now, this feature isn't available if you include any Google Workspace services, like Gmail and Drive, as a source.") [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

Limits are explicit: "Daily research requests", "Number of research requests you can run at the same time". Pro/Ultra users get higher limits; near-limit a notification tells the user how many remain. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

## 13. Artifacts

Three primary artifact types:

- **Deep Research report** — long-form report with citations, optional visuals (charts, diagrams, interactive simulators on Ultra), exportable to Google Docs ("Export to Docs"), shareable as a Canvas link, copyable as text. Also generates Audio Overview. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

- **Canvas doc/app/slides/code** — editable artifacts with Code view, console, version history; can be shared, exported, or turned into Audio Overview/quiz/other formats. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

- **Generated media** — videos, images, music, avatars, Audio Overviews, illustrated storybooks, quizzes, flashcards (from the Help Center sidebar listing). [Source: extracted from https://support.google.com/gemini/ support home navigation listing, accessed 2026-08-07]

Gems are also a quasi-artifact — they are saved, shareable ("Share a Gem from Gemini Apps" is a documented action), and propagate across surfaces. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

## 14. Keyboard UX

The Help Center mentions a few keyboard-driven affordances: pressing Enter to submit a prompt ("In the text box, enter a prompt for how you want the text to be updated. Press Enter."), and "Select & ask" via cursor selection. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

No comprehensive keyboard shortcut documentation was found in the pages retrieved — Gemini's Help Center does not appear to publish a global keyboard shortcut reference like VS Code or Cursor. This is an evidence gap: **not** documented in official Help Center pages fetched; observed absence.

The mobile experience uses system keyboard and voice ("type, talk, or use a photo to chat"; "Hey Google" + Voice Match for hands-free). [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]

## 15. Motion

Not directly documented in the Help Center articles retrieved. The Deep Research "Open" interaction (click Open when ready) and the notification badge "next to the chat thread" imply some form of in-app state transition animation, but the Help Center does not document specific motion details. [Evidence gap — official Help Center is functional-documentation-only.]

Visuals in Deep Research reports can include "Interactive simulators" — implying motion is supported inside reports themselves, not just in the chrome. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

## 16. Animation

Same as Motion: not documented in the Help Center. The presence of "animations and visuals" in Ultra-tier Deep Research reports is the one explicit animation surface documented ("charts, diagrams, interactive simulators"). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

## 17. Visual Hierarchy

Documented UI hierarchy (inferred from Help Center step-by-step instructions):

1. **Top bar**: Menu (hamburger) when chats are hidden; profile/account at top right.
2. **Left sidebar**: Recent chats + Gems + Settings & help (revealed by "Open Sidebar" click).
3. **Center**: chat thread, with streaming responses.
4. **Bottom**: text box with "Add Files" picker (Deep Research, Canvas, Files, Sources), @-mention hint for Connected Apps, and Submit.
5. **Right Canvas panel** (when active): Code view, console, Select & ask, Add Gemini features, Share & export, Create (visualization), Create Audio Overview. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

The hierarchy is "chat center stage, Canvas as side panel, modes embedded in the input box" — which creates the "progressive disclosure via mode-picker" pattern discussed in Section 18.

## 18. Progressive Disclosure

Gemini's primary progressive disclosure failure mode is the **mode + model + source conflation in the same text box**:

- "Add Files" exposes: Files upload, Image upload, **Deep Research**, **Canvas** — four very different feature modes behind one button. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]
- "Sources" (within Deep Research) exposes Google Search, Gmail, Drive, NotebookLM — collapsing source selection into the same input surface. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- "Pro" vs "Thinking" model selection for Deep Research is reached via "Learn how to switch between models" — a secondary flow. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- "@app" mention syntax adds Connected Apps into the prompt box, making app invocation implicit. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

This is a textbook **overload example**: one text box, four orthogonal toggles (mode, source, model, connected app). New users cannot infer from the surface what each affordance does. The Help Center repeatedly uses phrases like "If you've never made a Gem before, first click Settings and help → Gems" to bridge the discoverability gap. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

## 19. Accessibility

Accessibility is partially documented:

- Sign-in required for nearly every feature — a barrier for users without Google accounts. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]
- Age gating: "Be 18 or over" for Memory and Deep Research; "13 (or the applicable age in your country) or over" for Gems; "supervised accounts" have reduced feature sets. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/15236321, accessed 2026-08-07]
- Work/school accounts: many personalization features are explicitly unavailable ("This feature isn't available when you sign in to a work, school, or supervised Google Account"). [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]
- Language availability: Help Center offers 50+ languages; mobile "Hey Google" unavailable in 11 languages (Bulgarian, Croatian, Estonian, Finnish, Greek, Hebrew, Hungarian, Latvian, Lithuanian, Romanian, Serbian, Slovak, Slovenian, Ukrainian). [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]
- Dark Mode is toggle-able ("Enable Dark Mode" appears at page footer of Help Center pages). [Observed: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]
- No explicit screen-reader, keyboard-only, or ARIA documentation was found in the pages retrieved — **evidence gap**.

## 20. Performance Perception

Deep Research explicitly manages latency expectations: "It usually takes about 5-10 minutes to generate the report since Gemini analyzes many sources. For more complex reports, it may take longer." Async notification pattern (web badge + mobile notification) reframes waiting time as "leave the chat, come back when ready". [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The Edit Plan checkpoint before Start Research provides a **stop-and-think moment** — the user gets to validate Gemini's understanding before it commits to multi-minute execution. This is a strong performance-perception pattern: long executions are made tolerable by (a) plan preview, (b) async notification, (c) explicit time estimate. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

No comparable latency-management guidance exists for ordinary chat replies in the Help Center pages retrieved — **evidence gap**.

## 21. Trust

Trust signals documented:

- Explicit safety boundary per feature ("Canvas safety & security in Gemini Apps" is a dedicated Help article, answer ID 16419134, listed in https://support.google.com/gemini/ home). [Source: https://support.google.com/gemini/ support home navigation listing, accessed 2026-08-07]
- **Memory introspection**: "Did you use any info from past chats?" — a documented, user-invocable audit prompt. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]
- **Memory deletion**: "Delete or correct something Gemini knows about you" via Gemini Apps Activity. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]
- **Keep Activity toggle** as a master control — many features only work when it's ON. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
- **Disclaimers** are explicit: "Don't rely on Gemini's responses as medical, legal, financial, or other professional advice. Responses from Gemini don't represent Google's views, and should not be attributed to Google." [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]
- **Gem policy enforcement**: "Gemini Apps may remove Gems when our systems detect a possible violation of Google's Terms of Service." [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

## 22. Explainability

Deep Research's **Edit Plan checkpoint** is the single strongest explainability affordance: before Gemini commits to a multi-minute browsing/analysis run, it shows the user the plan it generated, which the user can edit. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The "Open" final report reveals sources and citations — "Disable knowledge citations" is an opt-out toggle for Gems, implying citations are on by default. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

The "Thinking" model variant for Deep Research is a user-selectable reasoning mode ("All users can use Thinking for their reports"). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

The Help Center does NOT document a per-message "show reasoning" toggle like Anthropic's Extended Thinking visibility or GLM-4.7's Turn-Level Thinking — explainability is concentrated at the Deep Research artifact level, not at every chat turn. **Evidence gap**: no documentation of live reasoning transparency in standard chat turns.

## 23. Long Session Experience

Long sessions are explicitly designed for Deep Research: user can leave the chat, get notified later, and the report persists under "Recent". [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

Canvas changes are auto-saved ("Changes in Canvas are auto-saved") and versioned ("Previous Version" / "Next Version" controls), supporting long editing sessions. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

Gems persist across web/mobile/Workspace side panel — useful for repeatable workflows over time. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]

Limit-based fatigue is mitigated by explicit feedback ("If you're close to your limit, Gemini Apps notifies you how many research requests are left for the day"). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]

## 24. Power User Features

- **Gems** with Knowledge uploads (device files, Drive files, NotebookLM notebooks), Disable knowledge citations toggle, "Use Gemini to re-write instructions", Experimental Gems, share Gem and share conversation. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]
- **Deep Research** with per-session source selection (Google Search, Gmail, Drive, NotebookLM, uploaded files), Edit Plan checkpoint, Pro vs Thinking model toggle, Ultra-tier visuals (charts/diagrams/interactive simulators), Audio Overview, Visualization, Export to Docs, Share Canvas. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- **Canvas** with Code view, console, Show recent changes, Select & ask, Add Gemini features (text/image generation), Change length, Change tone, LaTeX, version history. [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]
- **Connected Apps** with `@app` mention syntax, per-app connect/disconnect, GitHub repository import. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
- **Memory** with introspection prompt ("Did you use any info from past chats?") and deletion/correction. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]
- **Gemini Spark** (consumer agent for tasks/workflows/schedules/skills; integrates with Chrome and custom apps). [Source: extracted from https://support.google.com/gemini/ support home navigation listing, accessed 2026-08-07]

## 25. Developer Experience

The Google Help Center is consumer-only; the developer surface is the Gemini API on Google AI Studio / Google Cloud Vertex AI — **not directly retrieved in this evidence pass**. Web-search retry after 30s continued to return HTTP 429, and known developer URLs (ai.google.dev, cloud.google.com/vertex-ai) were not in the priority URL list for this task.

The DeepMind page does surface a "Gemini for Science", "Experimental Tools", "Science Skills" track, suggesting an active developer/researcher engagement program. [Source: https://deepmind.google/technologies/gemini/, accessed 2026-08-07]

The Help Center's "Coding Plan" analog does not exist for Gemini — there is no equivalent to GLM's Coding Plan tier. **Evidence gap**: developer experience (API surface, SDKs, pricing tiers) not directly captured.

## 26. Biggest Strengths

1. **Deep Research's Edit Plan checkpoint** — explicit transparency moment before multi-minute execution. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
2. **Async notification pattern** (web badge + mobile lock-screen notification) — turns "5-10 minute waits" into acceptable background work. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
3. **Connected Apps `@app` syntax** — frictionless per-message app invocation without leaving the chat. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
4. **Cross-surface Gem propagation** — a Gem created in web appears in mobile and Workspace side panel automatically. [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]
5. **Tiered visuals** (charts/diagrams/interactive simulators) for Ultra-tier Deep Research reports — artifact richness above text. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
6. **Memory introspection** ("Did you use any info from past chats?") — explicit user audit affordance rare among competitors. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]
7. **Google ecosystem leverage** — Gmail/Drive/Calendar/Photos/Maps/Flights/Home are first-class agent context. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]

## 27. Biggest Weaknesses

1. **Mode + model + source conflation in the text box** — Deep Research, Canvas, Files upload, Sources, @-app mentions, and model switching all hang off the same input surface, creating an "overload example" of progressive disclosure failure. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
2. **Feature fragmentation across account types** — Memory, Gems with Knowledge, Connected Apps, and Deep Research personalization all have different account/age/Keep-Activity requirements, making the matrix hard to predict. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/15236321, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
3. **Per-message reasoning transparency is undocumented** — no "show thinking" toggle for standard chat turns (only Deep Research's "Thinking" model and Edit Plan checkpoint). [Evidence gap from Help Center pages retrieved]
4. **Mobile feature parity gaps** — "Some features are not yet available in the Gemini mobile app", "Gems can't be used with Gemini Live". [Source: https://support.google.com/gemini/answer/15236321, accessed 2026-08-07]
5. **Workspace-source exclusion** for Ultra visuals — "For now, this feature isn't available if you include any Google Workspace services, like Gmail and Drive, as a source." This pits Gemini's best feature (Workspace integration) against its most premium feature (Ultra visuals). [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
6. **Public SPA returns 404** for `/overview/` path — `gemini.google.com/overview/` returns Google's "Error 404 (Not Found)" page when fetched without an authenticated session. [Observed: 1,652-byte HTML response at https://gemini.google.com/overview/ on 2026-08-07; raw cached at research/evidence/raw-gemini/gemini_google_overview.html]
7. **Google Assistant overlap on Android** — Gemini inherits Google Assistant's "Hey Google" + Voice Match plumbing, and Google Assistant must "fulfill your requests" for some legacy features. Feature overlap creates a "which assistant am I talking to?" ambiguity. [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Edit Plan checkpoint pattern** — show the user the agent's plan before committing to long execution; allow user edits. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- **Async notification design** — let users leave the chat; surface completion as a thread badge (web) or OS notification (mobile) with lock-screen support. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- **`@app` mention syntax** for invoking tools/connectors inline without breaking chat flow. [Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
- **Cross-surface propagation** of saved agents/personas (web → mobile → side panel). [Source: https://support.google.com/gemini/answer/15146780, accessed 2026-08-07]
- **Memory introspection prompt** ("Did you use any info from past chats?") as a trust affordance. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07]
- **Limit-feedback loop** — notify user when near daily/simultaneous request cap, with explicit "X remaining" count. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- **Auto-save + version history** for workspace artifacts (Canvas "Previous Version" / "Next Version"). [Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]

## 29. What should MiMo reject?

- **Mode+model+source conflation in the text box** — do not bury Deep Research, Canvas, file upload, source selection, and model selection behind one "Add Files" button. Surface primary modes as distinct, visible affordances. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/16047321, accessed 2026-08-07]
- **Account-type feature fragmentation** — avoid a 3×3 matrix of (account type × age × Keep Activity) gating the same feature set. [Source: https://support.google.com/gemini/answer/16598469, accessed 2026-08-07; Source: https://support.google.com/gemini/answer/13695044, accessed 2026-08-07]
- **Workspace-vs-visuals exclusion** — do not pit "use your data" against "get richer artifacts"; the two should compose. [Source: https://support.google.com/gemini/answer/15719111, accessed 2026-08-07]
- **Dual-assistant ambiguity** — do not co-locate two assistants (Gemini + Google Assistant) where one shadows the other for unspecified legacy features. [Source: https://support.google.com/gemini/answer/14579631, accessed 2026-08-07]
- **SPA-only public surface** — do not return a 404 for the canonical `/overview/` URL when unauthenticated; provide a public marketing page that explains the product. [Observed: https://gemini.google.com/overview/ on 2026-08-07]

## 30. Confidence Score (0-100)

**Confidence: 70/100**

Reasoning:

- (+) 8 primary Help Center articles from `support.google.com/gemini/answer/*` were statically served and fully extracted (7,000–14,000 chars each of clean body text). Every section 5–24 has a primary citation from these.
- (+) 2 marketing pages (blog.google/products/gemini listing, deepmind.google/technologies/gemini) corroborate product scope.
- (+) All claims cited with URL + access date 2026-08-07.
- (−) **Interactive use was NOT possible** — sandbox cannot sign into a Google Account, so onboarding, empty states, sidebar interactions, Canvas panel animations, error states, and motion were not directly observed. The Help Center documents *what users should do*, not necessarily *what they see*.
- (−) **web_search returned HTTP 429** on both initial attempt and 30-second retry across all 6 planned queries — no search-result diversification was possible. Source corpus is the priority URL list from the task prompt plus Help Center articles discovered by scraping the support home page.
- (−) **Developer experience (Gemini API, Google AI Studio, Vertex AI)** is undocumented in this evidence pass.
- (−) **Per-message reasoning transparency** is an evidence gap — Help Center does not document a "show thinking" toggle for standard chat turns, but I cannot rule out its existence in the actual product UI without interactive access.
- (−) **Motion and Animation** (Sections 15, 16) are largely undocumented in Help Center — claims about UI motion are inferred, not observed.
- (−) Help Center articles are dated ©2026 Google, suggesting they are current, but specific feature rollout dates are not always present.
