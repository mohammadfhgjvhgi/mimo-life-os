# MiMo — Final Component Map

> **Every component mapped to a real product surface, visual region, interaction, and backend source.**
> Components follow the visual architecture — not the other way around.

---

## Product Surface → Component Map

### 1. Shell

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Root container | Full viewport | Responsive, theme | `Shell.tsx` | N/A (layout) |
| Rail | Left 48px | Click navigation | `Rail.tsx` | `useNova` store |
| Account popover | Rail bottom | Click → popover | `Rail.tsx` (inline) | `useNova` store (theme, settings) |

### 2. Conversation

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Message list | Center, scrollable | Scroll, auto-scroll | `ChatView.tsx` | `/api/conversations` |
| User message | Right-aligned | None (display) | `MessageItem.tsx` | `messages` from store |
| AI message | Left-aligned | Hover → actions | `MessageItem.tsx` | `/api/chat` (streaming) |
| Streaming indicator | Inline in AI msg | Display only | `MessageItem.tsx` | SSE from `/api/chat` |
| Markdown rendering | Inline in AI msg | Display only | `Markdown.tsx` | N/A (renderer) |
| Empty state | Center, centered | Click suggestions | `ChatView.tsx` | `messages.length === 0` |

### 3. Composer

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Textarea | Bottom, centered | Type, Enter to send | `Composer.tsx` | `useNova` (input, loading) |
| Mode selector | Bottom-left of composer | Click → dropdown | `Composer.tsx` (inline) | `useNova` (mode) |
| Effort selector | Bottom-left of composer | Click → dropdown | `Composer.tsx` (inline) | `useNova` (effort → ModelRouter) |
| Tools toggle | Bottom-right of composer | Click → reveal tools | `Composer.tsx` (inline) | `useNova` (deepThink, webSearch) |
| Send button | Bottom-right | Click / Enter | `Composer.tsx` (inline) | `useChat().send()` |
| Stop button | Bottom-right (replaces Send) | Click → stop | `Composer.tsx` (inline) | `useChat().stop()` |

### 4. Agent State

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Action Trace (Level 1) | Above composer, inline | Click → expand | `AgentStatus.tsx` | SSE via `useEventStream` |
| Action Trace (Level 2) | Expanded inline | Click action → Level 3 | `AgentStatus.tsx` | SSE events |
| Action Trace (Level 3) | Expanded detail | Display only | `AgentStatus.tsx` | SSE event payload |

### 5. Tasks

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Task card (collapsed) | Inline in conversation | Click → expand | `TaskCard.tsx` | `/api/tasks` via `useTasks` |
| Task card (expanded) | Inline in conversation | Pause/Cancel/Minimize | `TaskCard.tsx` | `/api/tasks/[id]` PATCH |
| Background task indicator | Below conversation, above composer | Click → expand list | `BackgroundTaskIndicator.tsx` | `/api/tasks` via `useTasks` |
| Task detail panel | Right panel (summoned) | Display only | (future: `TaskDetailPanel.tsx`) | `/api/tasks/[id]` |

### 6. Sidebar (Context Panel)

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Sidebar container | Right, summoned | Toggle via rail/⌘B | `Sidebar.tsx` | `useNova` (rightOpen, sidebarView) |
| Context view | Sidebar content | Display only | `Sidebar.tsx` (inline) | `useWorkspace` + `useEventStream` |
| Memory view | Sidebar content | Filter, edit, delete | `Sidebar.tsx` (inline) | `useWorkspace` (memory data) |
| Knowledge view | Sidebar content | Browse, expand | `Sidebar.tsx` (inline) | `useWorkspace` (knowledge data) |
| Tasks view | Sidebar content | Browse, click | `Sidebar.tsx` (inline) | `useTasks` |
| Timeline view | Sidebar content | Filter, scroll | `Sidebar.tsx` (inline) | `useEventStream` |

### 7. Overlays

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Command Palette | Center overlay | ⌘K, ↑/↓ Enter Esc | `CommandPalette.tsx` | `useNova` (actions) |
| Universal Search | Center overlay | ⌘/, ↑/↓ Enter Esc | `UniversalSearch.tsx` | `/api/search` + `/api/mimo/workspace` |
| Settings | Modal | S key, click | `SettingsModal.tsx` | `useNova` (theme, etc.) |
| Voice mode | Modal | Composer button | `VoiceMode.tsx` | (future: ASR/TTS skills) |
| Image generation | Modal | Composer button | `ImageGenModal.tsx` | `/api/image` |
| Toasts | Bottom-center | Auto-dismiss | `Toasts.tsx` | `useNova` (toasts) |

### 8. Inline Elements (in AI messages — NEW, to be built)

| Product Surface | Visual Region | Interaction | Component | Backend Source |
|----------------|---------------|-------------|-----------|----------------|
| Memory citation | Inline in AI message | Click → expand card | `MemoryCitation.tsx` (NEW) | Memory referenced in response |
| Knowledge link | Inline in AI message | Click → expand card | `KnowledgeLink.tsx` (NEW) | Entity referenced in response |
| Artifact card | Inline in AI message | Click → expand/preview | `ArtifactCard.tsx` (NEW) | `/api/artifacts` (NEW API) |
| Approval card | Inline in conversation | Click → Approve/Reject | `ApprovalCard.tsx` (NEW) | ToolPolicyEngine |
| Error card | Inline in conversation | Click → Retry/Details | `ErrorCard.tsx` (NEW) | Error from pipeline |

### 9. Hooks (data layer)

| Hook | Source | Used By |
|------|--------|---------|
| `useNova` | Zustand store | All components |
| `useChat` | `/api/chat` + `/api/conversations` | ChatView, Composer |
| `useEventStream` | `/api/events/stream` (SSE) | AgentStatus, Sidebar (Timeline) |
| `useWorkspace` | `/api/mimo/workspace` | Sidebar (Context, Memory, Knowledge) |
| `useTasks` | `/api/tasks` | TaskCard, BackgroundTaskIndicator, Sidebar (Tasks) |
| `useLoadConversations` | `/api/conversations` | Shell (on mount) |

---

## Component Count

| Category | Components | Status |
|----------|-----------|--------|
| Shell | Shell, Rail | ✅ EXISTS (rebuild needed for new visual direction) |
| Conversation | ChatView, MessageItem, Markdown | ✅ EXISTS (rebuild needed) |
| Composer | Composer | ✅ EXISTS (rebuild needed) |
| Agent State | AgentStatus | ✅ EXISTS (verify event mapping) |
| Tasks | TaskCard, BackgroundTaskIndicator | ✅ EXISTS |
| Sidebar | Sidebar | ✅ EXISTS (rebuild for new visual direction) |
| Overlays | CommandPalette, UniversalSearch, SettingsModal, VoiceMode, ImageGenModal, Toasts | ✅ EXISTS |
| Hooks | useEventStream, useTasks, useWorkspace, hooks | ✅ EXISTS |
| Inline Elements (NEW) | MemoryCitation, KnowledgeLink, ArtifactCard, ApprovalCard, ErrorCard | ⬜ TO BUILD |
| **Total** | 18 existing + 5 new = **23 components** | |

---

## Implementation Priority

| Priority | Component | Why |
|----------|-----------|-----|
| P0 | Shell + Rail (visual direction update) | Foundation — new accent color, atmospheric depth |
| P0 | Composer (visual direction update) | Primary control surface — new accent, refined controls |
| P0 | ChatView + MessageItem (visual direction update) | Conversation is the spine — intelligent documents, not bubbles |
| P1 | AgentStatus (verify event mapping) | Action Trace needs correct event→action mapping |
| P1 | Sidebar (visual direction update) | Context panel — new accent, refined views |
| P2 | MemoryCitation (NEW) | Inline memory references — core "OS flavor" |
| P2 | KnowledgeLink (NEW) | Inline entity references — core "OS flavor" |
| P2 | ArtifactCard (NEW) | Inline artifact display — durable outputs |
| P2 | ApprovalCard (NEW) | Inline approvals — user control |
| P2 | ErrorCard (NEW) | Inline errors with recovery — actionable |
| P3 | CommandPalette (visual update) | New accent, prefix grammar (future) |
| P3 | UniversalSearch (visual update) | New accent |
