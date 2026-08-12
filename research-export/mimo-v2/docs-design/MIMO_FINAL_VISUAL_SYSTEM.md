# MiMo — Final Visual System

> The implemented visual language. Evidence-based from VLM audit + browser verification.

---

## VLM Grade: A-

> "A beautiful, functional chat interface. Better than generic clones. Has a clear Design Language."

### What works
- **Conversation is the hero** — full viewport, centered, no chrome competing
- **Composer is integrated** — no floating card, anchored bottom, contextual controls
- **Calm depth** — deep warm-dark background, subtle elevation for surfaces
- **RTL-native** — right-aligned user messages, left-aligned AI, correct flow
- **One accent** — violet, used consistently (logo, send button, active states)
- **Action buttons hidden until hover** — reduces visual noise
- **Typing indicator** — calm dots, not fake reasoning panel

### What was fixed from the audit
1. **"Floating card syndrome"** → FIXED: composer uses tonal elevation, no hard border
2. **"Empty middle dead zone"** → FIXED: conversation flows directly into composer
3. **"Input box too prominent"** → FIXED: subtle surface, not a highlighted box
4. **"Sidebar clutter"** → FIXED: action buttons hidden until hover
5. **"Giant avatars"** → FIXED: small 28px "M" mark instead of 36px image avatar
6. **"Generic SaaS border"** → FIXED: no hard border on messages, tonal separation

---

## Design System (implemented)

### Color
- Background: `--m-bg` (warm neutral, #fafaf9 light / #0c0a09 dark)
- Surface: `--m-surface` (cards, composer, sidebar)
- Raised: `--m-raised` (hover, user message background)
- Text: `--m-text` (primary), `--m-text-2` (secondary), `--m-text-3` (muted)
- Border: `--m-border` (hairline, rarely used — prefer tonal separation)
- Accent: `--m-accent` (violet — ONE, used sparingly)
- AI states: thinking, retrieving, executing, success, warning, error

### Typography
- IBM Plex Sans Arabic (Arabic primary)
- Scale: 24px (heading), 15px (body), 14px (controls), 12px (meta), 10.5px (hint)
- Weights: 400 (body), 500 (controls), 600 (headings)

### Spacing
4px grid: 4/8/12/16/20/24/32

### Radius
8px (buttons), 10px (cards), 12px (user messages), 14px (composer)

### Motion
- Enter: 0ms (instant)
- Hover: 120ms
- Panel slide: 200ms
- Easing: cubic-bezier(0.05, 0.7, 0.1, 1.0)

---

## Component Architecture (11 active components)

```
src/components/mimo/
├── Shell.tsx              — root layout (Quiet Surface)
├── Rail.tsx               — 48px, 4 buttons + logo
├── Conversation.tsx       — wraps ChatView (the spine)
├── AgentStatus.tsx        — inline Action Trace
├── TaskCard.tsx           — inline task lifecycle
├── BackgroundTaskIndicator.tsx — minimized tasks
├── Sidebar.tsx            — summoned, 5 views
├── UniversalSearch.tsx    — ⌘/ search
├── useEventStream.ts      — SSE consumer
├── useTasks.ts            — task data
└── hooks.ts               — workspace data

src/components/nova/
├── ChatView.tsx           — empty state + message list + composer
├── Composer.tsx           — primary control surface (effort, mode, tools)
├── MessageItem.tsx        — intelligent documents, not chat bubbles
├── Markdown.tsx           — markdown renderer
├── CommandPalette.tsx     — ⌘K
├── SettingsModal.tsx      — settings
├── VoiceMode.tsx          — voice
├── ImageGenModal.tsx      — image generation
├── Toasts.tsx             — notifications
└── icons.tsx              — icon set
```

---

## Remaining "OS Flavor" Gaps (future work)

The VLM noted: "To become a true Life OS, it needs to display structured data in the chat flow, not just text."

These are the inline elements that need to be built:
1. **Inline memory citations** — `[mem:abc]` expandable cards
2. **Inline knowledge links** — `[ent:xyz]` expandable entities
3. **Inline task cards** — already built (TaskCard.tsx), needs wiring into chat responses
4. **Inline artifact cards** — code/document/image previews in conversation
5. **Inline approval cards** — "MiMo wants to modify files" + Approve/Reject
6. **Inline error cards** — with Retry/Details/Fix actions

The foundation is solid. These inline elements will make the conversation feel like a living operating system, not just text.
