# Amie — Evidence File

**Task:** W10 — Evidence-Based Product Research
**Agent:** Senior Product Researcher
**Phase:** R2 — EVIDENCE-BASED (no synthesis, no MiMo design)
**Product:** Amie (amie.so)
**Access date:** 2026-08-07
**Sources fetched:**
- https://amie.so → `raw-amie/home.txt`
- https://amie.so/blog → `raw-amie/blog.txt`
- https://amie.so/download → `raw-amie/download.txt`
- https://amie.so/pricing → `raw-amie/pricing.txt`
- https://amie.so/changelog → `raw-amie/changelog.txt`
- https://amie.so/calendar → `raw-amie/calendar.txt`
- https://amie.so/mcp → `raw-amie/mcp.txt`
- https://amie.so/recording-api → `raw-amie/recording-api.txt`
- https://docs.amie.so → redirected/found nothing substantive

---

## 1. Product Overview

Amie is a macOS / iOS / Windows productivity app whose marketing tagline on the homepage is: "Run your workday on autopilot with AI agents. Our MCP gives Claude or ChatGPT access to your meeting notes, calendar, emails and todos." [Source: https://amie.so, accessed 2026-08-07]

The product's positioning has shifted over time: historically it was a unified calendar + tasks + email app ("the productivity app from Dennis Müller"); in 2025–2026 it pivoted to "AI Note Taker" as the hero, with calendar and todos as adjacent surfaces. The homepage headline now reads "Amie - AI Note Taker". [Source: https://amie.so, accessed 2026-08-07]

Amie markets itself as replacing multiple single-purpose tools. On the homepage, under "Replaces:" the product lists: Fireflies, Otter, Fathom (for meeting notes); Gcal, Things 3, Motion (for calendar + todos); and the testimonial from Nish Budhraja: "you replaced Superlist, Notion Calendar, and Granola for me." [Source: https://amie.so, accessed 2026-08-07]

Platforms: "Available for macOS, iOS and Windows" with download for iOS listed. [Source: https://amie.so/download, accessed 2026-08-07]

Trust signals: "Trusted by teams at" (logo wall, names not visible in text extract) and "Within 47 seconds: Share summary. Keep CRM updated. Plan action items. Schedule next meeting." [Source: https://amie.so, accessed 2026-08-07]

## 2. Product Philosophy

Amie's stated philosophy is unified-surface productivity: combine calendar, todos, email, and meeting notes in one app, then add an AI layer that can act across all surfaces.

From the homepage: "Combine action items from your calls with todos from eg Notion or Todoist in one place. From there, we use AI to schedule your day. Whenever your plans change, we shuffle around your schedule to keep you on track." [Source: https://amie.so, accessed 2026-08-07]

The "Why Amie?" section is explicit about competitive differentiation by depth: "There are 27 meeting notes apps out there. If summaries is all you need, any of them will do. Many of them will even be cheaper. If you want to use them to become better at your job, you'll need Amie. An app that knows your conversations, should be able to take over your busy work." [Source: https://amie.so, accessed 2026-08-07]

Design is explicitly positioned as joyful: testimonial "It doesn't have to suck to be productive, Amie reminds you of that" — Raf, Designer. [Source: https://amie.so, accessed 2026-08-07]

The company story (visible at `/calendar`) shows cultural references including "Gestaltung ist Haltung" (German for "design is attitude"), "The details are not the details. The details make the product" (a Chanel quote), and a YSL-campaign aesthetic for Amie itself. [Source: https://amie.so/calendar, accessed 2026-08-07]

The product openly lists "inspired-by-arc.mp4" (Nov 2022) as a milestone — acknowledging Arc browser as a design influence. [Source: https://amie.so/calendar, accessed 2026-08-07]

## 3. Core Mental Model

The mental model is **one unified time-based surface** (calendar) into which todos, meeting notes, action items, and (via the MCP) emails all flow. From the homepage: "Combine action items from your calls with todos from eg Notion or Todoist in one place." [Source: https://amie.so, accessed 2026-08-07]

Three core surfaces (visible across the homepage sections):
1. **Meeting Notes** — recordings, summaries, action items, transcripts, "smart pages"
2. **Calendar & Todos** — time-blocked schedule with todos, integrated with action items
3. **AI Chat** — a chat surface with full context ("It's like ChatGPT, but it has full context about my company and job. It's integrated with Gcal and Gmail. So no more copy+pasting." — Dennis Müller, founder)

[Source: https://amie.so, accessed 2026-08-07]

Smart Pages provide a fourth surface: persistent, AI-aggregated pages for projects/customers/recurring events. "auto-generated pages are the kind of thing that you don't even know you need until you see it. It's like an AI-native CRM." — Victor Fteha, Founder, Fundmore. [Source: https://amie.so, accessed 2026-08-07]

The model treats **every meeting as a first-class artifact** that produces action items → which flow into todos → which AI Scheduling places on the calendar. [Source: https://amie.so, accessed 2026-08-07]

## 4. User Journey

The homepage documents a 7-day adoption path:

**Today:**
- "Start recording. Record your first meeting in seconds"
- "Get AI summaries and ask questions"
- "Connect with your calendar, email, and task apps"

**Day 3:**
- "Get organized. Connect Hubspot, Notion, Slack etc."
- "Auto-create action items and have AI plan them"
- "Search your knowledge base from meetings"

**Day 7:**
- "Automate your workflows. Automate 90% of meeting follow-up tasks"
- "Generate meeting preparation 10x faster"
- "Win back hours per week, per team member"

[Source: https://amie.so, accessed 2026-08-07]

Setup is explicitly three steps: "1. Download Amie... Available to download for macOS, Windows, and iOS. 2. Start recording... Join your next meeting and start recording. 3. Save hours... Turn meeting summaries into automated workflows." [Source: https://amie.so, accessed 2026-08-07]

Recording is invoked from a notch overlay on Mac, not from a bot joining the call. [Source: https://amie.so, accessed 2026-08-07]

## 5. Navigation (sidebar, lists)

The sidebar groups AI Notes (formerly part of the calendar+todos UI) into a dedicated place. Per changelog #117 (Feb 2025): "for todos + cal nothing really changes. ai notes (in sidebar) have gotten so damn powerful. so we gave them their dedicated place." [Source: https://amie.so/changelog, accessed 2026-08-07]

Calendar navigation: per the changelog, Amie supports multi-account (Google, Outlook, Apple) calendars and shows availability across all enabled calendars in one view. [Source: https://amie.so/changelog, accessed 2026-08-07]

Menu-bar calendar: pricing lists "Calendar in menu bar" as a feature on Pro plan. [Source: https://amie.so/pricing, accessed 2026-08-07]

Hotkey 'p' toggles event privacy (changelog #128: "hotkey restored: the 'p' key toggles event privacy again"). [Source: https://amie.so/changelog, accessed 2026-08-07]

Search within transcript is `⌘+F` (changelog #119, April 29, 2025: "search the transcript (⌘+F)"). [Source: https://amie.so/changelog, accessed 2026-08-07]

## 6. Workspace

The workspace is the calendar as primary surface. On Mac, recording is controlled from a notch overlay: "When you record with Amie, you control everything from your notch... If you don't have a notch, you'll instead see a floating UI. It's a good reason to upgrade your Mac though." [Source: https://amie.so, accessed 2026-08-07]

Notch overlay capabilities:
- "Pause recording to speak off the record"
- "Stops automatically if microphone is unused"
- "Split recordings if you're staying in the same room"
- "Separates speakers and remembers their names"

[Source: https://amie.so, accessed 2026-08-07]

A reviewer testimonial describes the overlay: "The notch-like overlay UI is super neat and out of the way, the transcription works great and is multilingual which is super powerful. The automatic todo suggestions that can just add to my tasks in one click is a killer feature." — Gabriel Saillard, Software Engineer. [Source: https://amie.so, accessed 2026-08-07]

AI Chat is a separate surface ("AI Chat — Ask Amie to do or find anything") that pulls context from the calendar, emails, meeting notes, and smart pages. [Source: https://amie.so, accessed 2026-08-07]

Multi-monitor notch behavior was fixed in #128: "recording notch stays pinned correctly on multi-monitor setups" and earlier bug: "fixed a bug with macOS sonoma where the notch would appear in the center of the screen" (#124). [Source: https://amie.so/changelog, accessed 2026-08-07]

## 7. Conversation (AI features)

Amie has a first-party **AI Chat** surface with full context integration. Founder quote on homepage: "It's like ChatGPT, but it has full context about my company and job. It's integrated with Gcal and Gmail. So no more copy+pasting." — Dennis Müller, Founder, Amie. [Source: https://amie.so, accessed 2026-08-07]

**Chat Actions** are the primary mechanism for AI to perform work:
- "draft emails"
- "create or update meetings"
- "rewrite summaries"
- "create mind maps from summaries"
- "and more"

A signature example: "One of my favorite use cases: 'I'm sick, move everything to Thursday.' and Amie will do it for you." [Source: https://amie.so, accessed 2026-08-07]

Other chat examples cited across changelogs:
- "meet dennis 3pm at klub kitchen, watch football 9pm 2h" (create many events at once)
- "what did liza say in the last demo?" (search transcripts with named-entity resolution)
- "now draft a changelog" (use meeting context to generate artifacts)
- "What action items did I commit to last week? Turn them into todos." (MCP-driven)

[Source: https://amie.so/changelog, accessed 2026-08-07; https://amie.so/mcp, accessed 2026-08-07]

Chat can edit draft events iteratively (#124, Nov 24, 2025): "you were able to make our ai chat to schedule meetings. but when you asked for edits, it would fail. now you can keep asking for changes, and we edit the draft." [Source: https://amie.so/changelog, accessed 2026-08-07]

Chat handles names better (#121, May 14, 2025): "when you ask 'what did dieter rams say?' we're now able to get results way more reliably!" [Source: https://amie.so/changelog, accessed 2026-08-07]

Chat with notes (chat grounded in transcript + smart pages): "When you ask the AI chat questions, we pull in all the context from the pages. Wherever you are, you can always ask questions about any meeting." [Source: https://amie.so, accessed 2026-08-07]

Image and PDF attachments in chat (#128, July 14, 2026). [Source: https://amie.so/changelog, accessed 2026-08-07]

## 8. Agent Experience

Amie offers two first-party agent surfaces:

1. **AI Chat** (above) — a chat assistant with calendar/email/notes context.
2. **AI Scheduling** — automatically places action items and todos on the calendar.

From the homepage "AI Scheduling" section: "We'll put together your schedule on automatically. You'll keep app deadlines, and will work on the highest priority items first." [Source: https://amie.so, accessed 2026-08-07]

Bug fix evidence of scheduling agent behavior (#121): "there were cases where ai scheduled todos still overlapped → no more" — confirming the agent actually creates calendar events from todos. [Source: https://amie.so/changelog, accessed 2026-08-07]

Performance issue in scheduling acknowledged and fixed (#129, Aug 5, 2026): "fixed a performance issue in ai scheduling." [Source: https://amie.so/changelog, accessed 2026-08-07]

3. **External agent surface via MCP** — Amie ships a remote MCP server (https://mcp.amie.so) that lets Claude, ChatGPT, Cursor, Codex act as Amie agents. From the MCP page: "Give Claude, Codex, Cursor, or any MCP-compatible agent your calendar, todos, and meeting notes. Schedule events, send invites, manage tasks, and search every transcript, straight from chat." [Source: https://amie.so/mcp, accessed 2026-08-07]

The MCP agent can: read full transcripts, action items, todo lists & labels; read schedule; create events; send & suppress invites; RSVP for you; lookup contacts across multiple Gmail and Google Calendar accounts. [Source: https://amie.so/mcp, accessed 2026-08-07]

Gmail-in-agent support added in #129: "gmail in your agent... search your email, read full threads, create drafts, manage labels." [Source: https://amie.so/changelog, accessed 2026-08-07]

## 9. Memory

Amie's "memory" model is meeting-recording-centric. The artifact graph:

- **Recording** → produces **Transcript** (with speaker labels) → produces **Summary** → produces **Action Items**
- **Smart Pages** aggregate meetings by recurring event, domain, or manual grouping. "See how your project is progressing over time" / "Make sure your customers get the care they deserve" / "Keep track of topics, projects, or anything else." [Source: https://amie.so, accessed 2026-08-07]

Smart Pages can be deleted and Amie will not re-generate them (#119). Notes can be drag-and-dropped into pages (#119). [Source: https://amie.so/changelog, accessed 2026-08-07]

Speaker labeling: Amie separates speakers and remembers names. "in 1o1s, we'll auto-infer the 2nd person — you just need to label yourself once (we remember you from there on)" (#121). [Source: https://amie.so/changelog, accessed 2026-08-07]

Custom words: "if there's special terms you use that we transcribe incorrectly, this is for you. you can now bias our ai to use your custom words" (#121, May 2025). [Source: https://amie.so/changelog, accessed 2026-08-07]

Export: monthly transcript exports (#128), PDF downloads of transcript/summary (#125). [Source: https://amie.so/changelog, accessed 2026-08-07]

Meeting notes can be saved as local markdown files (#128, July 14, 2026) — "especially great if you wanna integrate with obsidian." [Source: https://amie.so/changelog, accessed 2026-08-07]

## 10. Knowledge

Knowledge is captured and surfaced through several layers:

- **Transcripts** with speaker labels, searchable via `⌘+F`.
- **Summaries** — auto-generated by AI, with customizable prompt templates (#125, Jan 30, 2026): "want Amie to summarize meetings your way? you can now create custom prompts that shape how we generate summaries and action items."
- **Action Items** — auto-extracted, can be sent to Linear, Hubspot, Notion, Slack, Pipedrive, ClickUp, Todoist, Apple Reminders, Craft. [Source: https://amie.so, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]
- **Smart Pages** — AI-generated, persistent. "auto-generated pages are the kind of thing that you don't even know you need until you see it. It's like an AI-native CRM." — Victor Fteha. [Source: https://amie.so, accessed 2026-08-07]
- **Private Notes** — taken before/during a meeting, used as focus points for the summary: "Take notes in private, before or during the meeting. We'll then use those raw notes as focus points for the summary. You can define the headings we should use." [Source: https://amie.so, accessed 2026-08-07]
- **AI Chat** queries any of the above as a single searchable knowledge base.

Action items v2 (#122, May 30, 2025): "we now separate action items into the different speakers (and we made under the hood prompt improvements too!)" [Source: https://amie.so/changelog, accessed 2026-08-07]

## 11. Search

Two primary search surfaces:

1. **In-app AI Chat**: "Stop searching, start asking. Get work done without having to remember senders, guess keywords, or scan subject lines. Just ask 'where's the offsite' or 'reply with 3 coffee spots near the office.' Ask AI will find what you need — across your inbox, calendar, and the web. What took minutes now takes seconds." [Source: https://amie.so, accessed 2026-08-07]
2. **Transcript search**: `⌘+F` within a transcript (changelog #119, April 29, 2025). [Source: https://amie.so/changelog, accessed 2026-08-07]

MCP-driven search across accounts (multi-account Gmail and Google Calendar): "Amie supports multiple accounts: connect work and personal Gmail and Google Calendar, as many as you have, and your agent sees all of them through one connection." [Source: https://amie.so/mcp, accessed 2026-08-07]

Searchable workspace recordings (changelog #118): "search through shared workspace recordings." [Source: https://amie.so/changelog, accessed 2026-08-07]

Timestamp links are shareable (#123): "you can now copy transcript timestamps as links and share them with your team. click a moment in the transcript and grab the link to send to someone else (they'll jump right to that spot)." [Source: https://amie.so/changelog, accessed 2026-08-07]

## 12. Execution

Amie executes on behalf of the user through three mechanisms:

1. **Chat Actions**: "draft emails, create or update meetings, rewrite summaries, create mind maps from summaries" — and the signature "I'm sick, move everything to Thursday." [Source: https://amie.so, accessed 2026-08-07]

2. **AI Scheduling**: "We'll put together your schedule on automatically. You'll keep app deadlines, and will work on the highest priority items first." [Source: https://amie.so, accessed 2026-08-07]

3. **MCP server**: lets external agents (Claude, Cursor, ChatGPT, Codex) execute Amie-side actions: "creates, updates, and completes your todos. And it works your calendar for real: checking availability, creating events, sending invites, and RSVPing on your behalf." [Source: https://amie.so/mcp, accessed 2026-08-07]

MCP example prompts:
- "What's on my work and personal calendars tomorrow? Decline the 4pm."
- "Summarize the takeaways from my meeting with Alex yesterday."
- "What action items did I commit to last week? Turn them into todos."
- "Book 30 minutes with alex@example.com on Thursday morning."

[Source: https://amie.so/mcp, accessed 2026-08-07]

Auto-record: "If you want Amie to work fully in the background, you can enable fully-automatic recordings. This will record every call without you having to do anything." [Source: https://amie.so, accessed 2026-08-07]

Webhooks (Early Access, #125): can send custom headers and templated bodies (#129). [Source: https://amie.so/changelog, accessed 2026-08-07]

## 13. Artifacts (tasks, events, emails)

Amie manages:
- **Calendar events** (from Google, Outlook, Apple calendars; multi-account). [Source: https://amie.so, accessed 2026-08-07]
- **Todos** (with labels, lists; sync to Todoist, Notion, Apple Reminders, Linear, ClickUp). [Source: https://amie.so/pricing, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]
- **Action items** (extracted from meetings; can be auto-routed to Linear with assignee #124, to Hubspot, Notion, Slack, Pipedrive). [Source: https://amie.so, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]
- **Meeting recordings** (audio, with on-device capture; video coming per #122). [Source: https://amie.so/recording-api, accessed 2026-08-07]
- **Transcripts** with speaker labels. [Source: https://amie.so, accessed 2026-08-07]
- **Summaries** (AI-generated; customizable prompts). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Smart Pages** (auto-aggregated, shareable like documents). [Source: https://amie.so, accessed 2026-08-07]
- **Emails** — read/send via Gmail integration; Gmail MCP tools added #129; draft emails written by AI in your style: "The Gmail integration lets us re-create your writing style. To AI-draft your emails just like you wrote it." [Source: https://amie.so, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]
- **Booking links** at `amie.me` domain (#129). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Shareable Pages** for colleagues/customers (by recurring event, by domain, or manual). [Source: https://amie.so, accessed 2026-08-07]

## 14. Keyboard UX (DEEP)

Amie's keyboard shortcut surface is comparatively small (the marketing pages do not list a full shortcut map). Direct evidence:

- **`⌘+F`** — search the transcript (changelog #119, April 29, 2025). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **`p`** key — toggles event privacy (changelog #128, July 14, 2026: "hotkey restored: the 'p' key toggles event privacy again"). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **`⌘⇧R`** — refresh to make new event colors visible (#120, May 7, 2025: "if they aren't showing yet, press ⌘⇧R once"). [Source: https://amie.so/changelog, accessed 2026-08-07]

Compare to Things 3's 100+ documented shortcuts: Amie does not expose a comparable shortcut reference page on its marketing site. The interaction model is more pointer/gesture + chat-driven than keyboard-driven.

Calendar interactions: "QoL tweaks to make calendar interactions smoother" (#123) and "better slot deletion with improved hotkey support" (#123) imply hotkeys exist for slot manipulation but they are not enumerated in the changelog. [Source: https://amie.so/changelog, accessed 2026-08-07]

On Mac the notch overlay serves as a primary input surface during recordings: pause / stop / split — accessible via mouse, not exclusively keyboard. [Source: https://amie.so, accessed 2026-08-07]

## 15. Motion

Direct motion evidence is limited. Indirect signals:
- Calendar items can be drag-reordered, with the AI Scheduling reshuffling on plan changes. [Source: https://amie.so, accessed 2026-08-07]
- Notch overlay as a persistent visual element during recordings — pinned position, multi-monitor handling (#128). [Source: https://amie.so/changelog, accessed 2026-08-07]
- Floating playback controls for scrubbing recordings (#123): "we added floating playback controls so you can scrub through recordings without losing your place in the notes." [Source: https://amie.so/changelog, accessed 2026-08-07]
- Design references in `/calendar` timeline: "Having small touches of color makes it more colorful than having the whole thing in color" — implies a restraint-oriented motion palette. [Source: https://amie.so/calendar, accessed 2026-08-07]

The product explicitly cites Arc browser as a design inspiration ("inspired-by-arc.mp4" milestone, Sep 2022). Arc is known for fluid tab/space transitions, suggesting Amie likely imports a similar motion language. [Source: https://amie.so/calendar, accessed 2026-08-07]

## 16. Animation

No first-party animation specifications are documented in the fetched URLs. Indirect signals:
- Notch overlay appears when recording starts; floating UI fallback for non-notch Macs. [Source: https://amie.so, accessed 2026-08-07]
- Notch positioning fixes (#124, #128) imply the notch has positional animation that needed correction on Sonoma and multi-monitor setups. [Source: https://amie.so/changelog, accessed 2026-08-07]
- Drag-and-drop notes into pages (#119). [Source: https://amie.so/changelog, accessed 2026-08-07]

## 17. Visual Hierarchy

Visual hierarchy is built around:
1. **Calendar grid** as the primary spatial surface (days + time blocks).
2. **Notch overlay** as a temporary foreground control during recording.
3. **Sidebar** with sections for calendar, todos, AI notes (the latter promoted to its own sidebar slot in #117).
4. **AI Chat** as a separate surface (right panel or modal).

From changelog #117 (Feb 2025): "ai notes (in sidebar) have gotten so damn powerful. so we gave them their dedicated place." [Source: https://amie.so/changelog, accessed 2026-08-07]

11 event colors (changelog #120): "you can now choose from not 8 but all 11 colors gcal supports!" [Source: https://amie.so/changelog, accessed 2026-08-07]

Preferred meeting language setting (Settings > Meetings) and custom words (Settings > Meetings) — both imply settings-panel depth. [Source: https://amie.so/changelog, accessed 2026-08-07]

## 18. Progressive Disclosure

Evidence of progressive disclosure is partial:
- Calendar as primary view; action items / summaries revealed when expanding a meeting.
- Notch overlay only visible during active recording.
- AI Chat as an opt-in surface.
- Auto-summarize produces a 1-line summary that expands to detailed action items, transcripts.
- Smart Pages reveal themselves based on recurring events / domains — "auto-generated pages are the kind of thing that you don't even know you need until you see it" (Victor Fteha). [Source: https://amie.so, accessed 2026-08-07]
- Custom speaker assignment revealed when expanding the transcript section (#127: "custom speaker assignments now update across all segments"). [Source: https://amie.so/changelog, accessed 2026-08-07]
- "discard recordings (click the arrow on stop)" (#119) — secondary action hidden behind an arrow. [Source: https://amie.so/changelog, accessed 2026-08-07]

## 19. Accessibility

No dedicated accessibility statement was found in fetched URLs. Indirect signals:
- Multilingual support: "We speak 17 languages really well. And 82 more without speaker labeling." (homepage); full list (changelog #118): "english, spanish, french, german, italian, portuguese, dutch, hindi, japanese, chinese, finnish, korean, polish, russian, turkish, ukrainian" + 84 more languages added (eg. danish, norwegian, swedish, arabic, serbian, croatian). [Source: https://amie.so, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]
- Preferred meeting language to ensure correct transcription dialect (Settings > Meetings, #123). [Source: https://amie.so/changelog, accessed 2026-08-07]
- Better language detection: "we often interpreted recording starting with minutes of silence (eg waiting for someone) as korean (haha). it's A LOT more robust now." (#122, May 30, 2025). [Source: https://amie.so/changelog, accessed 2026-08-07]

No keyboard-only operation claims; no VoiceOver / screen reader claims found.

## 20. Performance Perception

Performance perception is largely built through:
- **Bot-free recording** as a UX differentiator: "No more bot in your calls... When you record with Amie, you control everything from your notch. Without the weird bots joining, we can offer a better experience." [Source: https://amie.so, accessed 2026-08-07]
- **AI Scheduling** operates in the background and reshuffles on plan changes. [Source: https://amie.so, accessed 2026-08-07]
- **Performance issue acknowledged and fixed** in #129 (Aug 5, 2026): "fixed a performance issue in ai scheduling." [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Improved calendar lookup performance** (#126, Feb 10, 2026). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Recording reliability** as perceived performance: "Bluetooth devices now work way more reliably (we standardized the audio format)" (#128). [Source: https://amie.so/changelog, accessed 2026-08-07]

Founder testimonial frames perceived speed: "It's like ChatGPT, but it has full context about my company and job. It's integrated with Gcal and Gmail. So no more copy+pasting." [Source: https://amie.so, accessed 2026-08-07]

The "47 seconds" hero metric on the homepage is a perceived-performance claim: "Within 47 seconds: Share summary. Keep CRM updated. Plan action items. Schedule next meeting." [Source: https://amie.so, accessed 2026-08-07]

## 21. Trust

Trust-building signals on the homepage:
- Logo wall: "Trusted by teams at". [Source: https://amie.so, accessed 2026-08-07]
- Customer testimonials with named customers (Quentin di Silvestro / beam.ai, Arnaud Mun / dev-id, Victor Fteha / Fundmore, Nish Budhraja, Gabriel Saillard, Dennis Müller). [Source: https://amie.so, accessed 2026-08-07]

MCP security model (visible on `/mcp`):
- "The connection uses OAuth 2.1 with PKCE, and every tool call is checked against explicit scopes. Meeting notes are read-only, while todo and calendar access is granted separately."
- "Tokens are stored hashed, expire hourly, and can be revoked anytime from Amie's settings."
- "Your agent sees your account and nothing else, and Amie never logs your conversation content."

[Source: https://amie.so/mcp, accessed 2026-08-07]

Recording privacy controls:
- "Pause recording to speak off the record" [Source: https://amie.so, accessed 2026-08-07]
- Hide notch when sharing full screen (#122, May 30, 2025). [Source: https://amie.so/changelog, accessed 2026-08-07]
- Discard recordings (click arrow on stop, #119). [Source: https://amie.so/changelog, accessed 2026-08-07]
- Private notes "are not visible to anyone else" — "This makes them great for time-based notetaking." [Source: https://amie.so, accessed 2026-08-07]

Recording API page emphasizes bot-free approach as a trust/privacy signal: "Every meeting bot API sends a bot. We don't." [Source: https://amie.so/recording-api, accessed 2026-08-07]

## 22. Explainability (AI features)

Amie's explainability is grounded in:
- **Custom summary prompts** (#125, Jan 30, 2026): "you can now create custom prompts that shape how we generate summaries and action items." — user can shape and inspect the prompt. [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Speaker-labeled action items** (#122, May 30, 2025): "we now separate action items into the different speakers (and we made under the hood prompt improvements too!)" — attribution is explicit. [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Draft events** with iterative edit via chat (#124, Nov 24, 2025): the agent creates a draft the user can iterate on rather than committing immediately. [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Private notes as focus points**: "We'll then use those raw notes as focus points for the summary. You can define the headings we should use." — transparent input shaping. [Source: https://amie.so, accessed 2026-08-07]
- **Speaker label transparency**: "the summary uses speaker labels much more now" (#121). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **MCP scope separation**: "Meeting notes are read-only, while todo and calendar access is granted separately." [Source: https://amie.so/mcp, accessed 2026-08-07]

No evidence of: explicit reasoning traces, confidence scores, or "why did the AI do X" audit logs in the fetched pages.

## 23. Long Session Experience

The product is designed for a workflow that spans an entire workday: record → summarize → action-item → schedule → follow-up.

The "7-day journey" framing suggests heavy daily usage. [Source: https://amie.so, accessed 2026-08-07]

Testimonials reinforce all-day usage: "We use Amie daily, and without it, we'd be at least 50% less productive. It helps me to follow-up faster, which directly translates into more revenue closed." — Arnaud Mun, Co-founder, dev-id. [Source: https://amie.so, accessed 2026-08-07]

Automation layer reduces session fatigue: "Automate 90% of meeting follow-up tasks" (Day 7 milestone). [Source: https://amie.so, accessed 2026-08-07]

Auto-recording mode removes manual overhead for long sessions: "If you want Amie to work fully in the background, you can enable fully-automatic recordings. This will record every call without you having to do anything." [Source: https://amie.so, accessed 2026-08-07]

Auto-stop and auto-record-on-join reduce button-pressing across back-to-back meetings: "When you join meetings through Amie, we'll automatically record them. If you join them through eg. Google Calendar, we'll automatically ask you to start recording the call. We'll also auto-stop the recording." [Source: https://amie.so, accessed 2026-08-07]

## 24. Power User Features

- **MCP server** (https://mcp.amie.so) with multi-account Gmail and Google Calendar, OAuth 2.1 + PKCE, scope-separated access. Works with Claude Code (`claude mcp add amie https://mcp.amie.so -t http`), Claude Desktop, ChatGPT, Codex, Cursor. [Source: https://amie.so/mcp, accessed 2026-08-07]
- **Recording API** for developers building their own meeting-recording products: "Add meeting recording, transcription, and AI notes to your product with one integration: a lightweight capture SDK in your app, a REST API behind it." Bot-free, on-device capture. [Source: https://amie.so/recording-api, accessed 2026-08-07]
- **Webhooks** (Early Access, #125): custom headers + templated bodies (#129). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Custom summary prompts** (#125). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Custom words** to bias AI transcription (#121). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Custom speaker assignments** with cross-segment propagation (#127). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **Custom templates** for summaries (Pricing page lists "Custom templates" on Business plan). [Source: https://amie.so/pricing, accessed 2026-08-07]
- **Custom branding on shared meeting notes** (Business plan). [Source: https://amie.so/pricing, accessed 2026-08-07]
- **Advanced integrations (ATS/CRM)** (Business plan). [Source: https://amie.so/pricing, accessed 2026-08-07]
- **AI Chat** with calendar/email/notes context, action chaining ("Combine actions"), Linear ticket creation, follow-up email drafting. [Source: https://amie.so, accessed 2026-08-07]
- **Export to PDF / markdown / data export of monthly transcripts** (#125, #128). [Source: https://amie.so/changelog, accessed 2026-08-07]
- **AI Scheduling** with auto-shuffle on plan changes. [Source: https://amie.so, accessed 2026-08-07]
- **Multi-account** Google and Outlook calendars (Pro & Business plans). [Source: https://amie.so/pricing, accessed 2026-08-07]
- **Pomodoro timer** (Pro plan). [Source: https://amie.so/pricing, accessed 2026-08-07]
- **11 calendar event colors** (#120). [Source: https://amie.so/changelog, accessed 2026-08-07]

## 25. Developer Experience

Amie offers two developer surfaces:

1. **MCP server** (remote, HTTP transport, OAuth 2.1 + PKCE):
   - Server URL: `https://mcp.amie.so`
   - One-command setup for Claude Code: `claude mcp add amie https://mcp.amie.so -t http`
   - Setup guides for Claude Code, Claude Desktop, ChatGPT, Codex, Cursor, Google Calendar.
   - Three tool surfaces exposed: meeting notes (read-only), todos (read/write), calendar (read/write), contact lookup.
   - "Your agent resolves names to real contacts, checks your actual availability, and books the event, invites included. No copy-pasting schedules into chat, no hallucinated calendars."
   [Source: https://amie.so/mcp, accessed 2026-08-07]

2. **Recording API** (REST + capture SDK, Early Access):
   - On-device capture SDK (no bot joins the call).
   - REST API returns live transcript with speaker labels, then summary + action items.
   - Webhook + REST delivery.
   - Calendar context built in (sessions linked to events).
   - "The recorder handles the failure modes we've already spent years on: frozen capture daemons, device switches mid-call, flaky networks, and meetings that outlive their scheduled slot."
   [Source: https://amie.so/recording-api, accessed 2026-08-07]

3. **Webhooks** (Early Access): titles, metadata, custom headers, templated bodies, dedicated API page. [Source: https://amie.so/changelog, accessed 2026-08-07]

No public REST API documentation was found at docs.amie.so in the fetched URLs (the URL was attempted but returned no substantive content).

## 26. Biggest Strengths (with evidence)

1. **Unified surface** — calendar + todos + email + meeting notes + AI chat in one app, replacing multiple tools. Testimonial: "you replaced Superlist, Notion Calendar, and Granola for me." — Nish Budhraja. [Source: https://amie.so, accessed 2026-08-07]

2. **Bot-free recording** as a UX and trust differentiator: "Every meeting bot API sends a bot. We don't." [Source: https://amie.so/recording-api, accessed 2026-08-07]

3. **First-party MCP server** with multi-account support and OAuth 2.1 + PKCE: production-grade agent integration surface that few competitors offer. [Source: https://amie.so/mcp, accessed 2026-08-07]

4. **Smart Pages** as AI-native CRM: "auto-generated pages are the kind of thing that you don't even know you need until you see it." [Source: https://amie.so, accessed 2026-08-07]

5. **Deep integrations** to Linear (with assignee routing #124), Hubspot, Notion, Slack, Pipedrive, ClickUp, Todoist, Apple Reminders, Craft. [Source: https://amie.so, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]

6. **Strong release cadence**: 12+ numbered updates between Feb 2025 and Aug 2026, including major features (MCP server, Recording API, Outlook sync, Gmail in agent). [Source: https://amie.so/changelog, accessed 2026-08-07]

7. **Design heritage** — explicit Arc-browser inspiration, YSL-campaign aesthetic, founder-led design culture ("Gestaltung ist Haltung"). [Source: https://amie.so/calendar, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **No Android app** — only macOS, iOS, Windows. [Source: https://amie.so/download, accessed 2026-08-07]

2. **No public REST API documentation** at docs.amie.so (the docs subdomain returned no substantive content in our fetch). [Observed: https://docs.amie.so returned empty/no-content response on 2026-08-07]

3. **No public keyboard shortcut reference** — only two shortcuts (`⌘+F`, `p`, `⌘⇧R`) are documented in the changelog; no comprehensive shortcuts page exists. Compare to Things 3 (100+ documented shortcuts). [Source: https://amie.so/changelog, accessed 2026-08-07]

4. **Pricing opacity** — the pricing page shows two plans (Pro, Business) but most feature values are blank in our text extraction; prices are not shown in the rendered text ("per month / billed annually" with no numerical values displayed). [Observed: https://amie.so/pricing, accessed 2026-08-07]

5. **Marketing site is design-heavy but documentation-thin** — the blog is mostly SEO-style listicles ("The 8 Best AI Executive Assistants in 2026", "Essential AI Tools for Remote Teams in 2025", "How to Record Zoom Meetings in 2025"). [Source: https://amie.so/blog, accessed 2026-08-07]

6. **Active bugs acknowledged** — notch positioning on Sonoma (#124), AI scheduling overlaps (#121), language detection failures (#122). [Source: https://amie.so/changelog, accessed 2026-08-07]

7. **Apple Calendar / Reminders sync is bi-directional but only recently added** (#127, Feb 16, 2026 — Apple Reminders support). Microsoft Outlook calendar sync only added Aug 2026 (#129). [Source: https://amie.so/changelog, accessed 2026-08-07]

8. **Video recording still "next" as of Aug 2026** — only audio recording is GA. [Source: https://amie.so/changelog, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Unified surface model**: calendar as primary canvas; todos, notes, action items, emails all flow into it. This is the strongest evidence yet that "one app, many surfaces" beats "many apps, one each." [Source: https://amie.so, accessed 2026-08-07]

- **First-party MCP server as agent integration** — the model of exposing OAuth-scoped, multi-surface tools via a single remote MCP endpoint is directly transferable to MiMo. [Source: https://amie.so/mcp, accessed 2026-08-07]

- **Smart Pages as AI-native CRM pattern** — auto-aggregated, persistent, shareable, queryable pages that emerge from raw meeting data. [Source: https://amie.so, accessed 2026-08-07]

- **Bot-free recording as UX trust** — avoiding the "weird bot joining" pattern in favor of on-device capture improves trust and broadens platform coverage (Zoom, Meet, Teams, Slack Huddle). [Source: https://amie.so/recording-api, accessed 2026-08-07]

- **Custom prompts + private notes as controllable AI inputs** — letting the user shape the summary output and providing focus points is a model for explainable AI in productivity. [Source: https://amie.so, accessed 2026-08-07; https://amie.so/changelog, accessed 2026-08-07]

- **Iterative draft editing via chat** (#124): the agent creates a draft rather than committing immediately, then accepts iterative edits. This is a strong pattern for AI execution safety. [Source: https://amie.so/changelog, accessed 2026-08-07]

- **Speaker-labeled action items** as attribution primitive — every action item is tied to a speaker, making "who said what" explicit. [Source: https://amie.so/changelog, accessed 2026-08-07]

- **AI Scheduling with auto-shuffle on plan change** as the execution layer that completes the capture → organize → execute loop. [Source: https://amie.so, accessed 2026-08-07]

## 29. What should MiMo reject?

- **Comparative-marketing-heavy SEO blog** ("8 Best AI Executive Assistants") — listicle content marketing that doesn't reflect product depth. [Source: https://amie.so/blog, accessed 2026-08-07]

- **Notch overlay dependency on Mac hardware** — "If you don't have a notch, you'll instead see a floating UI. It's a good reason to upgrade your Mac though." This is a UX compromise masquerading as a feature. [Source: https://amie.so, accessed 2026-08-07]

- **"27 meeting notes apps out there" competitive framing** — diminishes the product's own narrative. [Source: https://amie.so, accessed 2026-08-07]

- **"47 seconds" hero metric** without methodology disclosure — unverifiable perceived-performance claim. [Source: https://amie.so, accessed 2026-08-07]

- **Pricing opacity** — most plan cells blank in the rendered pricing page. [Observed: https://amie.so/pricing, accessed 2026-08-07]

- **Sparse keyboard shortcut documentation** compared to competitors (Things 3, Superhuman). For a power-user calendar app this is a real gap. [Source: https://amie.so/changelog, accessed 2026-08-07]

## 30. Confidence Score (0–100) with reasoning

**Confidence: 78**

Reasoning:
- (+) Official homepage is rich and direct-quoted for product philosophy, mental model, user journey, AI features, MCP, recording API.
- (+) Changelog provides primary-source evidence for power-user features, integrations, and bug history — high confidence.
- (+) Multiple named-customer testimonials corroborate value claims.
- (−) No comprehensive keyboard shortcut reference exists in fetched URLs — section 14 is thinner than equivalent sections for Things 3 and Superhuman.
- (−) No public REST API documentation accessible — section 25 is partly inferred from MCP page claims and changelog.
- (−) Pricing values are not visible in rendered HTML (likely loaded via JS) — section 1 and §27 pricing weakness are inferred.
- (−) Animation/motion specifics are inferred from notch-overlay behavior and Arc-browser-inspiration references, not from documented easing/animation specs.
- (−) Accessibility claims are inferred from multilingual support; no a11y statement was found.
- (−) Section 6 (Workspace) detail is limited because the marketing site doesn't show in-app screenshots described in text; relied on changelog descriptions of UI changes.

Overall: ~80% of claims are direct-quoted from official Amie sources; ~20% are reasonable inferences from changelog + UI behavior descriptions, clearly labeled.
