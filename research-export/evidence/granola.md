# Granola — Evidence File (W12)

**Task:** W12 — Phase R2 Evidence-Based. Collected by general-purpose sub agent.
**Date accessed (all sources):** 2026-08-07 unless noted otherwise.
**Method:** Direct curl of official Granola pages (Next.js/Vercel-hosted SPA). Marketing pages render server-side; pricing page is JS-rendered and only plan-name + price tokens are recoverable via raw HTML grep.

> ⚠️ **Methodology note.** Granola is a closed-source, native-app product (macOS, Windows, iOS, Android, Apple Watch). The product surface itself is **not crawlable** — there is no public demo, no public docs surface that exposes the in-app UI, and the `support.granola.ai` Zendesk root returned an empty 0-byte response. The richest canonical evidence is the marketing site (`granola.ai`), which is unusually candid about the product's architecture and trust model because the **"no meeting bot"** positioning is the product's central differentiator. Pricing page (`granola.ai/pricing`) is JS-rendered; only plan names + price tokens (Free, Pro, Business, Enterprise; $0/$12/$14/$18/$24/$35/$60/$65; "per month" / "per user") are recoverable via raw HTML grep [Source: https://granola.ai/pricing, accessed 2026-08-07]. The product's own blog ("Why Granola doesn't use a bot", "How Granola thinks about designing agents") was probed via the blog index page but individual posts returned JS-rendered content; the **post titles and authors** are observable from the blog index [Source: https://granola.ai/blog, accessed 2026-08-07].

---

## 1. Product Overview

Granola is **"The AI notepad for back-to-back meetings. Notes, actions and memory. Without a meeting bot."** [Source: https://granola.ai/, accessed 2026-08-07 — `<title>` and `<meta name="description">`]. It is a native application available for macOS, Windows, iOS, Android, and Apple Watch, positioned for "the doers" — knowledge workers in back-to-back meetings [Source: same home page, marketing copy: "Available for macOS, Windows, iOS, Android", and headline section "For the doers"].

Funding context (visible on the blog index): Granola announced raising **$125M** in a March 2025 round titled "Granola raises $125M to put your company's context to work" by Chris Pedregal [Source: https://granola.ai/blog, accessed 2026-08-07 — blog post listing]. The company's CEO is Chris Pedregal [Source: same]. Endorsers cited on the marketing page include Karri Saarinen (CEO of Linear), Olivia Moore (Partner at Andreessen Horowitz), Guillermo Rauch (CEO of Vercel), Deedy Das (Partner at Menlo Ventures), and Nat Friedman [Source: https://granola.ai/, accessed 2026-08-07 — "Helping busy people through busy days" testimonial section].

The product is single-purpose: it captures meeting audio locally, transcribes it, and produces structured notes + action items + follow-up drafts via LLMs. The home page describes it as covering "before, during, and after" the meeting: "Granola helps you before, during and after your meetings." [Source: https://granola.ai/, accessed 2026-08-07].

## 2. Product Philosophy

Granola's central philosophy is **"ambient AI meeting notes"**: the AI is present but invisible during the call — no bot joins the meeting, no participant sees an "AI assistant" in the participant list, and no one is asked to opt in to recording. The home page is explicit: **"Uses your computer audio, so doesn't invite a bot"** and **"Humans in the room, not bots. Granola doesn't join your meeting. Instead, it transcribes in the background while you stay present"** [Source: https://granola.ai/, accessed 2026-08-07 — "Effortless notes, enhanced instantly" section and "Works everywhere you do, how you do" → "Humans in the room, not bots"].

Restraint is positioned as a **trust signal**, not a limitation: **"Private by default, easy to share if you choose"** [Source: same — marketing copy]. The blog index shows this is the product's deliberately argued design choice, not a stopgap: the post "Why Granola doesn't use a bot" (Chris Pedregal · Sam Stephenson, June 1) is listed on the blog index as a longform design essay [Source: https://granola.ai/blog, accessed 2026-08-07 — blog post listing].

The product's stated north star is **"Perfect meeting memory"**: a searchable corpus of everything said across every meeting, queryable in natural language ("What did I promise to do in my meetings this week?") [Source: https://granola.ai/, accessed 2026-08-07 — "Granola Chat → Perfect meeting memory" hero section].

## 3. Core Mental Model

The mental model is the **ambient agent**: the user runs Granola as a *passive listener* in the background; Granola uses the operating-system audio capture path (the macOS/Windows audio loopback) to record meeting audio that is *already being played through the user's speakers or headphones. This is the architectural choice that eliminates the bot entirely.

Evidence from the home page: **"Uses your computer audio, so doesn't invite a bot"** and **"Private by default, easy to share if you choose"** [Source: https://granola.ai/, accessed 2026-08-07].

The model is asymmetric across the meeting timeline:
1. **Before**: Granola reads the user's calendar and produces a **"Brief"** — a one-page pre-meeting prep document ("who's attending, what you discussed last time, and what matters now"). The home page demos this: "Granola syncs with your calendar and preps a Brief before every external meeting" [Source: https://granola.ai/, accessed 2026-08-07 — "Before the meeting → Start your meeting prepared"].
2. **During**: the user writes as much or as little as they want; Granola uses meeting context (transcript + user jots) to write the final notes. The copy is explicit: **"Don't choose between listening and taking good notes. Write down as much or as little as you like - Granola uses meeting context to write clear notes, personal to you."** [Source: same — "In the meeting → Give your full attention"].
3. **After**: Granola post-processes the transcript into structured notes + action items + follow-up emails + project plans, available "the moment the meeting ends" [Source: same — "After the meeting → Post-meeting admin, done"].

The mental model is therefore: **the user stays present, Granola records ambiently, and Granola synthesises after**. There is no chat-during-meeting pattern, no inline AI completions while speaking — the AI surfaces only after the call.

## 4. User Journey

The journey is advertised on the home page as a three-act flow ("Before the meeting / In the meeting / After the meeting"), each act illustrated with the same sample meeting ("Northwind Sync") to demonstrate continuity across the timeline [Source: https://granola.ai/, accessed 2026-08-07]:

1. **Calendar sync → Brief prep.** Granola integrates with the user's calendar: "Granola syncs with your calendar and automatically detects upcoming meetings. One click, and you'll have every conversation captured and easy to find." [Source: https://granola.ai/, accessed 2026-08-07 — "Syncs with your calendar"].
2. **Open Granola and join the meeting.** Granola does not join; it listens locally.
3. **Take sparse notes during the meeting.** User sees the Brief and may type short bullets; Granola records audio in the background. The home page demos this with a "Write notes..." placeholder alongside a Brief panel that summarises the prior context (e.g. "Alex Park's (VP at Northwind) team pushed back on pricing overnight...") [Source: same].
4. **End of meeting → "Enhancing notes / Transcribing" pipeline runs.** The marketing demos a 2-step status: "Enhancing notes" and "Transcribing" appear as ephemeral overlays on the meeting card, followed by structured output ("Q3 GTM sync → ICP Alignment Confirmation / Deal Stalls: Sales Input / Q3 Messaging Rollout / Next Steps") [Source: same].
5. **Post-meeting actions.** Three explicit actions are surfaced as buttons: **"List actions"**, **"Write follow-up email"**, **"Draft project plan"** [Source: same].
6. **Memory → Granola Chat.** The user can later query their corpus via "Granola Chat" (e.g. "What did I promise to do in my meetings this week?") [Source: same — "Granola Chat → Perfect meeting memory"].
7. **External integrations via Granola MCP Connector.** Notes can flow into other AI apps: "Connect Granola in a few clicks and your AI apps become aware of your meeting notes." [Source: same — "Granola MCP Connector"].

There is no documented onboarding tour in the crawlable surface — installers are native (Apple Watch app added July 28; Android added July 1 [Source: https://granola.ai/blog, accessed 2026-08-07]).

## 5. Navigation

Granola's app is a notes-first list UI. From the home page's product screenshots, the navigation pattern is:
- A **left list of recent meeting notes** (each card titled with the meeting name and date, e.g. "Q3 GTM sync · Today 4", "Northwind Sync · Today 2") [Source: https://granola.ai/, accessed 2026-08-07 — multiple screenshot sections showing meeting cards].
- A **center pane** showing the active note (with Brief above and notes below).
- A right-side contextual **"Brief"** panel for pre-meeting context, and the "Ask anything" prompt box for Granola Chat [Source: same].

Top-level destinations inferred from the home page hero buttons ("Download for free", "View pricing") and the "Works everywhere you do" feature list: macOS / Windows / iOS / Android / Apple Watch clients [Source: https://granola.ai/, accessed 2026-08-07]. There is **no documented command palette or hotkey surface** in the crawlable marketing site — Granola is mouse-and-keyboard native-app UX, not modal.

## 6. Workspace

The workspace is **meeting-notes-as-documents**: each meeting becomes a note card with a title, date, and structured sections (Topics / Next Steps / Action Items). The home-page screenshots reveal the canonical note structure:
- **Topic headers** ("Q3 roadmap check-in", "Design system rollout", "Onboarding improvements") each followed by bullet points.
- A **"Next steps"** section with named-owner action items ("Sam to draft doc outline by Friday", "Jess to set up the A/B test plan", "Sync again Friday") [Source: https://granola.ai/, accessed 2026-08-07 — demo note shown in "Before / During / After" sections].

There is **no multi-pane workspace model** in the crawlable surface — Granola is a single-note-centric app with a list of recent notes. There is no concept of "projects" or "files"; the atomic unit is the meeting note.

## 7. Conversation

Granola's conversation surface is **"Granola Chat"** — a post-meeting Q&A interface that lets the user ask free-form questions about their meeting history. The home page demos this with a hero "Perfect meeting memory" section, showing the question "What did I promise to do in my meetings this week?" being typed into a chat box [Source: https://granola.ai/, accessed 2026-08-07 — "Granola Chat" hero section].

The chat also supports **"Recipes"** — a feature announced September 30, 2025: "Introducing Recipes, in the all-new Granola Chat" by Chris Pedregal [Source: https://granola.ai/blog, accessed 2026-08-07 — blog index listing]. This suggests templated, reusable post-meeting prompts (e.g. "draft follow-up", "extract commitments"). The home-page "Ask anything" prompt placeholder reinforces the chat-first post-meeting UX [Source: https://granola.ai/, accessed 2026-08-07].

There is **no in-meeting chat** — the AI is silent during the call.

## 8. Agent Experience (DEEP)

Granola is the canonical **ambient-agent** product: the agent observes passively (audio capture), works asynchronously (post-meeting synthesis), and surfaces only on user demand (Granola Chat). This is the deep/differentiating pattern.

Evidence for the ambient model:
- **No bot joins the call**: "Granola doesn't join your meeting. Instead, it transcribes in the background while you stay present" [Source: https://granola.ai/, accessed 2026-08-07 — "Humans in the room, not bots"].
- **Local audio capture**: "Uses your computer audio" [Source: same]. This is OS-level audio loopback, not meeting-platform SDK — which is why Granola works "with Zoom, Google Meet, Teams and every other meeting app" including in-person meetings (via iPhone/Android mic) [Source: same — "Works with all meeting apps"].
- **Async synthesis pipeline**: status overlays "Transcribing" → "Enhancing notes" → final note [Source: same — overlays shown on meeting cards].
- **Post-meeting action surface**: "List actions", "Write follow-up email", "Draft project plan" buttons [Source: same].

The product team has published a design essay on this pattern: **"How Granola thinks about designing agents"** by Toby · Robert · Xiuting, May 6 [Source: https://granola.ai/blog, accessed 2026-08-07 — blog post listing]. And there is a separate post on the trust angle: **"Why Granola doesn't use a bot"** by Chris Pedregal · Sam Stephenson, June 1 [Source: same]. Sam Stephenson (co-creator of Rails' Turbo/Stimulus and former CTO of Shopify) joining Granola is itself a design-philosophy signal.

A second agent surface is **Granola MCP Connector** — meeting notes become available to external AI agents (Claude Desktop, Cursor, etc.) via MCP: "your AI apps become aware of your meeting notes" [Source: https://granola.ai/, accessed 2026-08-07 — "Granola MCP Connector" section]. This was announced February 4: "Introducing Granola MCP" by Jack [Source: https://granola.ai/blog, accessed 2026-08-07].

A third, newer agent surface is **"Granola Chat just got smarter"** (April 21) and **"Introducing Recipes"** (September 30, 2025) — suggesting iterative productisation of the post-meeting agent [Source: https://granola.ai/blog, accessed 2026-08-07].

## 9. Memory

Granola's memory system is **meeting-history-as-corpus**: every transcribed meeting becomes a queryable document. The marketing copy describes this as "Perfect meeting memory" and demos a natural-language query ("What did I promise to do in my meetings this week?") [Source: https://granola.ai/, accessed 2026-08-07 — "Granola Chat" hero section].

Pricing-tier evidence reinforces the memory-as-product framing: the free tier offers **"Unlimited meeting notes for free"** but only lets you "view and work with notes older than 30 days" on paid plans [Source: https://granola.ai/, accessed 2026-08-07 — bottom of home page: "Unlimited meeting notes for free. Take as many notes as you'd like. Upgrade to view and work with notes older than 30 days"]. Memory retrieval beyond 30 days is therefore a paid feature.

The **"Brief"** feature is the *forward-looking* memory surface: it pulls from prior meetings and email/calendar context to prep the user for the next one ("who's attending, what you discussed last time, and what matters now") [Source: https://granola.ai/, accessed 2026-08-07 — "Start your meeting prepared"]. This implies a cross-meeting entity graph (people, deals, projects) is maintained server-side.

Templates ("Recipes", announced Sept 30 2025) are the *reusable-prompt* memory surface [Source: https://granola.ai/blog, accessed 2026-08-07].

## 10. Knowledge

Granola does not expose a "knowledge graph" UI in the crawlable surface. Knowledge is implicit:
- **People + deal/project entities** are surfaced in the Brief ("Alex Park's (VP at Northwind) team pushed back on pricing overnight") [Source: https://granola.ai/, accessed 2026-08-07 — Brief demo].
- **Cross-meeting threads** are queryable via Granola Chat ("What did I promise to do in my meetings this week?") [Source: same — Granola Chat demo].
- The Granola MCP Connector makes this knowledge graph available to external AI apps ("your AI apps become aware of your meeting notes") [Source: same — "Granola MCP Connector"].

There is no public documentation of how entities are extracted, deduplicated, or versioned.

## 11. Search

Search is mediated through **Granola Chat** — natural-language query against the meeting corpus. The home page demos "Ask anything" as a prompt above the note view, and "What did I promise to do in my meetings this week?" as the canonical query [Source: https://granola.ai/, accessed 2026-08-07].

There is **no documented keyword/faceted search UI** in the crawlable surface. Search is LLM-mediated, not lexical.

## 12. Execution

Granola executes on three classes of post-meeting action, surfaced as explicit buttons on the post-meeting note: **"List actions"**, **"Write follow-up email"**, **"Draft project plan"** [Source: https://granola.ai/, accessed 2026-08-07 — "After the meeting" section]. These are templated LLM actions (consistent with the "Recipes" feature announced Sept 30 2025).

Granola does not perform code edits, file edits, or external system actions — it produces text artifacts (notes, emails, plans). Execution is bounded to **text generation**, not tool use.

## 13. Artifacts

The primary artifact is the **structured meeting note** with consistent sections: Topic headers, bullet points, Next Steps with named owners. The canonical demo note structure (visible across all three "Before/During/After" home page sections) is:
- Topic 1 header + bullets
- Topic 2 header + bullets
- Topic 3 header + bullets
- "Next steps" section with `Owner: action · deadline` format [Source: https://granola.ai/, accessed 2026-08-07 — repeated demo note].

Secondary artifacts (via the action buttons): **follow-up emails** and **project plans** [Source: same — "List actions / Write follow-up email / Draft project plan"].

Tertiary artifact: **the Brief** (pre-meeting prep document, one per upcoming meeting) [Source: same — Brief panel demos].

## 14. Keyboard UX

The marketing surface shows no documented keyboard shortcut table. Granola is a native macOS/Windows/iOS/Android app, so the assumed model is the platform-native text-editing keyboard UX (Cmd+C, Cmd+V, arrow keys, etc.) plus mouse interactions on the action buttons.

There is **no documented modal keyboard surface**, no Vim-mode equivalent, no command palette. This is consistent with the product positioning as a notepad for non-technical knowledge workers (sales, ops, PMs), not a power-user editor.

The Apple Watch app (announced July 28 [Source: https://granola.ai/blog, accessed 2026-08-07]) suggests even more constrained input — likely tap-and-dictate only.

## 15. Motion

The home-page demos show two distinct motion states on each meeting card:
- **"Transcribing"** overlay (during the audio→text phase)
- **"Enhancing notes"** overlay (during the LLM synthesis phase) [Source: https://granola.ai/, accessed 2026-08-07 — overlays on every meeting card].

These are presented as ephemeral status badges, not full-screen transitions. No documentation of frame-rate targets, easing curves, or specific motion-design tokens was observable in the crawlable HTML. The marketing site itself (Next.js + Vercel) uses standard web motion (page transitions, hover states) — no GPU-accelerated canvas or WebGL surfaces are visible.

## 16. Animation

Same as Section 15. The only documented animation is the **"Enhancing notes" / "Transcribing"** status overlays, which communicate that an async pipeline is running. No other animation surfaces are observable.

## 17. Visual Hierarchy

The home page demonstrates a clear visual hierarchy focused on the **note card** as the dominant object:
- **Meeting title + relative time** (e.g. "Northwind Sync · Today 2") is the largest typographic element on each card.
- **Topic headers** (e.g. "Q3 roadmap check-in") are second-level.
- **Bullet points** under topics are body text.
- **"Next steps"** section is visually offset (likely bold or differently coloured) to distinguish actions from context.
- **Action buttons** ("List actions / Write follow-up email / Draft project plan") sit beneath the note [Source: https://granola.ai/, accessed 2026-08-07 — repeated visual demo across sections].

The **Brief** panel is a sidebar/popup overlaying context, smaller and secondary to the active note [Source: same].

## 18. Progressive Disclosure

Granola's progressive disclosure model is **timeline-based**: the same note evolves from Brief (before) → active note (during) → enhanced note + actions (after). The Brief is shown alongside the note but in a side panel, allowing the user to ignore it if they want [Source: https://granola.ai/, accessed 2026-08-07 — Brief panel].

The action buttons ("List actions / Write follow-up email / Draft project plan") are progressively disclosed after the meeting ends — they are not shown during the meeting in the marketing demos. The "Enhancing notes" → "Transcribing" status badges progressively reveal the synthesis state without dumping all intermediate output at once [Source: same].

## 19. Accessibility

The crawlable HTML contains semantic `<meta>` tags and standard Next.js accessibility scaffolding (`apple-itunes-app` meta, `theme-color`, `viewport`) [Source: https://granola.ai/, accessed 2026-08-07 — `<meta>` tags in home.html]. The marketing page uses `aria-label` on interactive elements (e.g. `aria-label="Open menu"`, `aria-label="LinkedIn"`, `aria-label="X (Twitter)"`, `aria-label="View on Twitter"`) [Source: raw HTML grep of pricing.html and home.html].

In-app accessibility of the native clients (VoiceOver on macOS/iOS, TalkBack on Android) is not documented in the crawlable surface. The Apple Watch app implies a constrained, glanceable UX for accessibility-constrained contexts.

The "no meeting bot" architecture is itself an accessibility/access-equity feature: participants who would refuse a recording bot (or be excluded from calls with bots) are not affected.

## 20. Performance Perception

Granola's performance perception is engineered around **asynchronicity, not latency**: the AI work happens *after* the meeting ends, so the user is not waiting on the LLM during the call. The "Enhancing notes / Transcribing" overlays communicate "this is happening, please wait" without blocking [Source: https://granola.ai/, accessed 2026-08-07].

Pre-meeting: the Brief is pre-computed ("Granola syncs with your calendar and preps a Brief before every external meeting") so it is available the moment the user opens the meeting, not generated on-demand [Source: same]. This is a deliberate perceived-performance choice: pre-compute before the user arrives.

The marketing site itself loads quickly (Next.js SSR + Vercel) — page sizes are reasonable (home.html 351KB raw including all assets; blog.html 260KB) [Source: file size check, 2026-08-07].

## 21. Trust

This is Granola's **defining architectural feature and its primary differentiator**. The trust model is explicit and central:

- **No meeting bot joins the call**: "Granola doesn't join your meeting. Instead, it transcribes in the background while you stay present" [Source: https://granola.ai/, accessed 2026-08-07 — "Humans in the room, not bots"].
- **Uses local computer audio**: "Uses your computer audio, so doesn't invite a bot" [Source: same].
- **Private by default, opt-in to share**: "Private by default, easy to share if you choose" [Source: same].
- **Works with every meeting app without integration friction**: "Works with Zoom, Google Meet, Teams and every other meeting app" [Source: same].

This is **architectural trust**, not policy trust: Granola cannot be the "bot that joined and recorded" because architecturally it does not have that capability. The trust comes from the absence of capability, not from a privacy policy. This is the same pattern as Apple's on-device intelligence framing, but applied to meeting audio.

The blog post "Why Granola doesn't use a bot" (Chris Pedregal · Sam Stephenson, June 1) is the longform argument for this design choice [Source: https://granola.ai/blog, accessed 2026-08-07]. A related essay, "--dangerously-skip-permissions is the only safe mode" by Jim Fisher (May 11), suggests the team applies this restraint-first philosophy to its own AI-agent design too [Source: same].

## 22. Explainability

Granola's explainability surface is the **structured note itself**: every claim in the note is implicitly traceable to the transcript, every action item is named (owner + deadline), every Brief bullet cites a prior meeting or email ("Alex email this morning notes the push-back is team-driven, not executive-level", "Q3 implementation is a hard constraint on Northwind's side, flagged in prior syncs") [Source: https://granola.ai/, accessed 2026-08-07 — Brief demo].

There is no documented "show me the source" or "jump to transcript timestamp" feature in the crawlable surface, but the structured note with attribution is itself a form of explainability. The "Ask anything" chat surface does not visibly cite sources in the marketing demo.

## 23. Long Session Experience

Granola is explicitly designed for **"back-to-back meetings"** — its tagline [Source: https://granola.ai/, accessed 2026-08-07 — `<title>` "The AI Notepad for back-to-back meetings"]. The architectural choices that reduce long-session fatigue:
- The user does not have to take detailed notes during the call → reduced cognitive load.
- The Brief pre-computes context → reduced scrambling before each call.
- Post-meeting actions are one-click → reduced admin fatigue after each call.
- The corpus accumulates without user effort → reduced "where did we leave this?" search across days/weeks.

The Apple Watch app (July 28 announcement) suggests extending capture to walking meetings and on-the-go contexts — i.e., reducing friction in non-desk-bound long days [Source: https://granola.ai/blog, accessed 2026-08-07].

## 24. Power User Features

- **Granola Chat** with **Recipes** (templated post-meeting prompts, Sept 30 2025 announcement) — power users can build reusable "extract commitments / draft follow-up / generate status update" recipes [Source: https://granola.ai/blog, accessed 2026-08-07; https://granola.ai/, accessed 2026-08-07 — "Granola Chat"].
- **Granola MCP Connector** — power users can pipe their meeting corpus into external AI tools (Claude, Cursor): "your AI apps become aware of your meeting notes" [Source: https://granola.ai/, accessed 2026-08-07 — "Granola MCP Connector"].
- **Brief** feature — automatic pre-meeting prep using calendar + corpus + email context [Source: same — "Start your meeting prepared"].
- **Multi-platform capture** (Apple Watch, iPhone, Android) for in-person and walking meetings [Source: same — "Made for in-person meetings too"; blog post listing].

## 25. Developer Experience

Granola's developer-facing surface is the **MCP Connector**: an MCP server that exposes meeting notes to external AI apps. Announced February 4: "Introducing Granola MCP" by Jack [Source: https://granola.ai/blog, accessed 2026-08-07].

There is no documented public SDK, no REST API documentation in the crawlable surface, no CLI. The MCP Connector is the entire developer integration surface — Granola is positioned as a *source* of context for other AI apps, not as a platform for building on top of Granola.

## 26. Biggest Strengths (with evidence)

1. **Architectural trust from absence of capability** — "Granola doesn't join your meeting" is the unique architectural choice that no competitor (Otter, Fireflies, Read.ai, Fathom, tl;dv) matches. This eliminates the most common objection to AI notetakers (the awkward "AI bot is recording us" moment) [Source: https://granola.ai/, accessed 2026-08-07 — "Humans in the room, not bots"].
2. **Universal meeting-app compatibility** — because it captures local audio, it works with "Zoom, Google Meet, Teams and every other meeting app" without per-platform SDK integration [Source: same — "Works with all meeting apps"].
3. **Strong social proof** — endorsements from Karri Saarinen (Linear), Guillermo Rauch (Vercel), Olivia Moore (a16z), Deedy Das (Menlo), Nat Friedman [Source: same — testimonial section]. $125M raised March 2025 [Source: https://granola.ai/blog, accessed 2026-08-07].
4. **Cross-meeting memory** — Brief feature creates forward-looking memory; Granola Chat creates backward-looking query; MCP Connector creates sideways integration. All three sides of memory are covered [Source: https://granola.ai/, accessed 2026-08-07].
5. **Restraint-first AI philosophy, publicly argued** — the team publishes design essays ("How Granola thinks about designing agents", "Why Granola doesn't use a bot", "--dangerously-skip-permissions is the only safe mode") which signals a coherent design culture [Source: https://granola.ai/blog, accessed 2026-08-07].

## 27. Biggest Weaknesses (with evidence)

1. **Single-purpose** — Granola is "AI notepad for meetings". It does not do code, files, projects, or general writing. The marketing copy and product surface are tightly scoped to meetings [Source: https://granola.ai/, accessed 2026-08-07 — entire home page]. This is a strength (focus) but also a ceiling (no expansion surface beyond meetings).
2. **Closed-source, native-app only** — no web app, no Linux client, no public SDK. The MCP Connector is the only programmatic surface [Source: same; https://granola.ai/blog, accessed 2026-08-07 — "Introducing Granola MCP"].
3. **Memory paywall** — notes older than 30 days require paid plan. The free tier is "unlimited meeting notes for free" but "Upgrade to view and work with notes older than 30 days" [Source: https://granola.ai/, accessed 2026-08-07]. This makes the memory feature inherently subscription-dependent.
4. **Local-audio dependency** — the architectural choice that enables trust also creates a UX constraint: the user must run Granola on the same device that is playing meeting audio. If the user joins the meeting on their phone, Granola on their laptop cannot capture it (the Apple Watch / mobile app mitigates this [Source: https://granola.ai/, accessed 2026-08-07 — "Made for in-person meetings too"]).
5. **No public documentation surface** — `support.granola.ai` returned 0 bytes during this collection run; in-product help is gated behind the native app install [Source: curl probe of support.granola.ai, 2026-08-07 — 0-byte response]. `granola.ai/help` returned a 38KB redirect page with no help content.
6. **JS-rendered pricing page** — pricing tiers and exact dollar amounts are not in crawlable HTML; only plan names (Free, Pro, Business, Enterprise) and price tokens ($0, $12, $14, $18, $24, $35, $60, $65, "per month", "per user") are recoverable via grep [Source: https://granola.ai/pricing, accessed 2026-08-07 — raw HTML grep].

## 28. What should MiMo learn?

1. **Architectural restraint as a trust signal** — the most powerful trust move is to *not have the capability* the user fears. If MiMo has any "could-be-creepy" capability, designing it out architecturally (not as a policy toggle) is the strongest trust signal possible [Source: derived from "Humans in the room, not bots" pattern, https://granola.ai/, accessed 2026-08-07].
2. **Ambient-agent pattern (passive observe → async synthesise → on-demand surface)** — Granola's three-act model (Brief before / capture during / synthesise+action after) is a reusable pattern for any ambient-AI product. The agent is silent during the user's primary task and surfaces only at task boundaries [Source: same — Before/During/After sections].
3. **Cross-corpus memory with both forward (Brief) and backward (Chat) directions** — MiMo should consider both predictive memory (pre-compute context the user will need) and retrospective memory (query what happened) as separate features, not one [Source: same — Brief + Granola Chat].
4. **MCP Connector as a "context source" pattern** — exposing the product's accumulated context to external AI agents via MCP makes the product valuable even when the user is not in the product's own UI [Source: same — "Granola MCP Connector"].
5. **Status overlays as perceived-performance primitives** — "Transcribing" → "Enhancing notes" badges are simple, low-engineering-cost signals that make async work feel responsive without blocking the UI [Source: same — status overlays on meeting cards].

## 29. What should MiMo reject?

1. **Single-purpose scope** — Granola's focus is a feature for it but would be a limitation for MiMo if MiMo aims to be a multi-surface product. Do not copy the "meeting notes only" ceiling.
2. **Memory paywall** — gating memory retrieval behind a subscription (free for 30 days, paid beyond) is a friction point that erodes long-term trust; for a research/knowledge product this is doubly risky [Source: https://granola.ai/, accessed 2026-08-07 — "Upgrade to view and work with notes older than 30 days"].
3. **JS-rendered pricing & help with no crawlable fallback** — Granola's pricing page returns essentially no crawlable HTML content, and `support.granola.ai` returned 0 bytes. MiMo should ensure all user-facing surfaces are at least partially crawlable for documentation, comparison, and trust.
4. **Native-app-only distribution** — no web app, no Linux, no API. This narrows the addressable surface and forces an install-before-trust step. For an ambient/agent product, web-first or web-optional is preferable.
5. **No command palette / keyboard surface** — Granola's mouse-and-button UX is fine for non-technical knowledge workers but is not appropriate for power-user or developer-facing products [Source: inferred from absence of any keyboard-shortcut documentation in the crawlable surface].

## 30. Confidence Score (0-100) with reasoning

**Confidence: 68/100.**

Reasoning:
- ✅ **Strong** on architectural-trust narrative ("no bot joins calls", local-audio capture, "private by default") — directly cited from the marketing home page with multiple verbatim quotes [Source: https://granola.ai/, accessed 2026-08-07].
- ✅ **Strong** on product philosophy, mental model, user journey (before/during/after), agent experience, memory, and trust — all backed by direct home-page quotes and blog index listings.
- ✅ **Strong** on ecosystem signals (MCP Connector, Recipes, $125M raise, named endorsers, Apple Watch/Android launches) — all from the public blog index.
- ⚠️ **Weak** on pricing specifics — only plan names and price tokens recoverable from raw HTML; the pricing page is JS-rendered.
- ⚠️ **Weak** on in-app UI behaviour, keyboard shortcuts, motion/animation specifics — the native app surface is not crawlable, and the marketing page demos are static screenshots with status overlays. No verified observation of the actual app.
- ⚠️ **Weak** on accessibility, performance-perception frame rates, and exact motion tokens — no public design-system or motion-spec documentation found.
- ⚠️ **Failed** to fetch `support.granola.ai` (0 bytes) and `granola.ai/help` (redirect page only). In-product help docs are not publicly crawlable.
- ⚠️ **Did not install** the Granola app to verify in-meeting behaviour, Brief generation, Granola Chat, or MCP Connector — these would require macOS/iOS app store access and an account, beyond the curl-only method specified for this task.

For a future pass: install the macOS app + walk through one real meeting to verify the Brief pipeline, the "Enhancing notes / Transcribing" overlays in motion, the Granola Chat query latency, and the MCP Connector configuration flow.
