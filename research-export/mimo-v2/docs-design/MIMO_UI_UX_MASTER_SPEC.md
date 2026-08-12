# MiMo — UI/UX Master Specification

> **The authoritative source for MiMo's interface. Zero-based redesign.**
> Derived from `MiMo_Product_Bible.md` + `research/` (54 products, 16 academic, 16 patterns) + 2025 AI interface research.
> **Status:** FINAL. Every visual decision must trace to this document.

---

## 1. Product Interface Philosophy

### 1.1 The "Quiet Surface" Concept

MiMo is not a dashboard. Not a chatbot. Not an IDE. Not a notes app.

MiMo is a **quiet surface** where one person's intellectual life happens with an AI collaborator.

- **Default state**: almost blank. The conversation, centered. A composer at the bottom. Minimal chrome. No tabs, no sidebar, no mode bar, no stats.
- **When MiMo works**: a single verb-based status line appears inline. Never a spinner.
- **When you need more**: you summon it. ⌘K for commands. ⌘/ for search. ⌘B for sidebar. The conversation never moves.
- **When information is relevant**: it appears INLINE in the conversation. Memory cards, knowledge references, tool results, citations — all inline, not in a separate panel.

### 1.2 What MiMo Feels Like

| Moment | Feeling |
|---|---|
| First 5 seconds | "This is clean. Where do I type?" |
| First 30 seconds | "I typed something. MiMo is thinking — I can see what it's doing." |
| First 10 minutes | "MiMo knows things about me. I can see why it knows them. I can correct them." |
| After 1 hour | "I never left the conversation. Everything I needed came to me." |
| After 1 month | "MiMo knows me. It remembers. It helps me think. It's mine." |

### 1.3 How MiMo Differs

| Product | How MiMo differs |
|---|---|
| ChatGPT | MiMo has memory that's visible, correctable, and persists. MiMo is an OS, not a chat. |
| Claude | MiMo is local-first, no counters, no deprecations. Conversation never closes. |
| Notion | MiMo is conversation-first, not block-first. No page navigation. |
| Cursor/IDE | MiMo is not editor-first. Conversation is the spine, code is a mode. |
| Linear | MiMo adapts Linear's calm density + keyboard language, but for AI, not project management. |

### 1.4 Design Principles

1. **Conversation permanence** — the conversation never closes, never gets replaced, never scrolls behind chrome.
2. **Quiet by default** — minimal chrome. The conversation breathes. Complexity appears only when summoned.
3. **Alive, not animated** — verb-based status, progressive disclosure, never a spinner, never fake motion.
4. **Inline over sidebar** — memory, knowledge, tool results appear INLINE in the conversation when relevant. The sidebar is for browsing, not for primary display.
5. **Keyboard as home** — ⌘K is the universal entry point. Every action in ≤2 modifiers.
6. **One accent** — violet, used sparingly. No decorative gradients. Tonal separation, not shadows.
7. **Real data only** — no fake stats, no seed data, no hardcoded identity. Empty states are honest.
8. **Mine** — every memory shows source + timestamp + delete. Local-first. No counters.

---

## 2. Information Architecture

### 2.1 Shell Layout — "Quiet Surface"

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                   Conversation                          │
│                   (820px max, centered)                 │
│                                                         │
│                                                         │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  Status line (only when MiMo is working)                │
├─────────────────────────────────────────────────────────┤
│  Composer (820px max, centered)                         │
└─────────────────────────────────────────────────────────┘
  Rail (48px, left edge, minimal)
```

**Default state**: conversation fills the viewport. Rail is 48px (icon-only, minimal). No top bar. No sidebar. No tabs.

### 2.2 The Rail (48px — reduced from 56px)

The rail is MINIMAL. It contains:
- Logo (top)
- ⌘K trigger (command palette — the universal entry point)
- Memory (→ sidebar slides in showing Memory)
- Knowledge (→ sidebar slides in showing Knowledge)
- Account (bottom — popover: theme, dev, settings)

That's 4 buttons + logo. Not 7-8. The rail is quiet.

**Removed from rail**: Home (logo click returns to conversation), Timeline (in sidebar), Projects (in command palette), Files (in command palette), Search (⌘/ is the shortcut), Development (⌘⇧E).

### 2.3 The Sidebar (summoned, not default)

The sidebar is HIDDEN by default. It slides in when:
- A rail icon is clicked (Memory/Knowledge → sidebar shows that view)
- ⌘B is pressed (toggles sidebar, shows Context view)
- A sidebar tab is clicked

Width: 340px (slightly wider than before for better readability). Resizable 280–440px.

4 views: Context | Memory | Knowledge | Timeline

### 2.4 No Top Bar

There is NO persistent top bar. The conversation fills the vertical space.

When a tab is open (artifact/file), a minimal 36px tab strip appears at the top of the conversation area. Otherwise, nothing.

### 2.5 The Composer (primary interaction surface)

The composer is the most important UI element after the conversation. It's where the user spends their time.

- Full-width at the bottom, max-width 820px centered
- Textarea: multi-line, auto-grow, placeholder "اسأل MiMo…"
- Left controls: mode selector (dropdown, compact), attach, slash commands
- Right controls: send, deep think, web search, voice, image gen
- The mode selector is a COMPACT dropdown (not a full bar)
- Slash commands (`/`) open an inline command menu (Notion pattern)

### 2.6 Inline Surfaces (in the conversation)

When MiMo works, status appears INLINE in the conversation thread:
- "يفكّر…" (thinking) — with a subtle pulsing dot
- "يسترجع السياق…" (retrieving) — with the sources being checked
- "ينفّذ…" (executing) — with the tool being called
- Tool results appear as cards in the conversation
- Citations appear as `[1]`, `[2]` inline links → expandable
- Memory cards appear inline when relevant ("بناءً على ما أعرفه عنك…")

### 2.7 Overlays (summoned, zero navigation)

| Overlay | Shortcut | Purpose |
|---|---|---|
| Command Palette | ⌘K | Universal entry — actions, navigation, search |
| Universal Search | ⌘/ | Search across everything |
| Project Switcher | ⌘P | Switch project scope |
| Settings | S | Configuration |
| Dev Workspace | ⌘⇧E | Full-viewport development mode |
| Developer Panel | ⌘⇧D | DevMode diagnostics |

---

## 3. Visual System

### 3.1 Color

**ONE accent: violet. No decorative gradients.**

| Token | Light | Dark | Use |
|---|---|---|---|
| `--m-bg` | #fafaf9 | #0c0a09 | App background |
| `--m-surface` | #ffffff | #161311 | Surface (cards, panels) |
| `--m-raised` | #f5f5f4 | #1c1917 | Raised (hover, active) |
| `--m-sunken` | #f0efed | #15120f | Sunken (inputs) |
| `--m-text` | #1c1917 | #f5f5f4 | Primary text |
| `--m-text-2` | #57534e | #a8a29e | Secondary text |
| `--m-text-3` | #a8a29e | #57534e | Muted text |
| `--m-border` | #e7e5e4 | #292524 | Hairline border |
| `--m-border-2` | #d6d3d1 | #44403c | Strong border |
| `--m-accent` | #6d28d9 | #a78bfa | Accent (ONE) |
| `--m-accent-soft` | #ede9fe | rgba(167,139,250,.10) | Accent background |
| `--m-accent-fg` | #ffffff | #0c0a09 | Accent foreground |

**AI state semantic colors:**
| Token | Light | Dark | Use |
|---|---|---|---|
| `--m-thinking` | #6d28d9 | #a78bfa | AI reasoning |
| `--m-retrieving` | #0891b2 | #22d3ee | Retrieving context |
| `--m-executing` | #ea580c | #fb923c | Executing |
| `--m-success` | #16a34a | #4ade80 | Success |
| `--m-warning` | #d97706 | #fbbf24 | Warning |
| `--m-error` | #dc2626 | #f87171 | Error |

### 3.2 Typography

- **Family**: IBM Plex Sans Arabic (Arabic primary), system sans (English), JetBrains Mono (code)
- **Scale**: 20/17/15/14/13/12/11px
- **Weights**: 400 (body), 500 (emphasis), 600 (headings) — never 700+ (too heavy for quiet UI)
- **Line-height**: 1.7 for prose, 1.4 for UI text

### 3.3 Spacing

4px base grid: **4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 64**

### 3.4 Radius

- 6px (chips, badges, small buttons)
- 8px (inputs, medium buttons)
- 10px (cards)
- 12px (panels, modals)

### 3.5 Elevation

**Shadows reserved for floating layers only.** 90% of UI uses hairlines + tonal separation.

| Token | Use |
|---|---|
| `--m-shadow-sm` | Popovers, dropdowns |
| `--m-shadow-md` | Modals |
| `--m-shadow-lg` | Full-screen overlays |

### 3.6 Borders

- Default: 1px `--m-border`
- Strong: 1px `--m-border-2`
- Focus: 2px `--m-accent` (outline, not border)

### 3.7 Iconography

- Lucide icons, 16px in rail/buttons, 14px inline, 20px in panel headers
- Monochrome, inherit text color
- Active state: accent color

---

## 4. Motion

### 4.1 Timing

| Tier | Duration | Use |
|---|---|---|
| instant | 0ms | summoned surfaces enter |
| micro | 120ms | hover, focus, state toggle |
| short | 200ms | panel slide, tab switch |
| medium | 300ms | popover, overlay |
| long | 400ms (ceiling) | modal, full-screen transition |

### 4.2 Easing

- `cubic-bezier(0.05, 0.7, 0.1, 1.0)` — emphasized (default)
- `cubic-bezier(0.2, 0.0, 0.0, 1.0)` — standard (generic)

### 4.3 Principles

1. Motion serves orientation + feedback — NOT decoration.
2. Never animate content the user is reading.
3. Enter instantly (0ms), exit gradually (150ms fade).
4. Reduced motion: all animations become instant.

---

## 5. Interaction Model

### 5.1 Keyboard Language

| Shortcut | Action |
|---|---|
| ⌘K | Command Palette (universal entry) |
| ⌘/ | Universal Search |
| ⌘B | Toggle sidebar |
| ⌘P | Project switcher |
| ⌘T | New tab |
| ⌘W | Close tab |
| ⌘⇧E | Dev Workspace |
| ⌘⇧D | Developer Mode |
| Alt+1..9 | Switch tab |
| C | New conversation |
| M | Sidebar → Memory |
| S | Settings |
| Enter | Send |
| ⇧Enter | Newline |
| Esc | Close overlay |

**Cap: 2 modifiers max.**

### 5.2 AI State (Progressive Disclosure)

**Level 1** (inline, always visible when working):
- A single line in the conversation: "يفكّر…" / "يسترجع السياق…" / "ينفّذ…"
- A calm pulsing dot (the AI state color)
- Elapsed time

**Level 2** (click to expand):
- Pipeline stages: Context → Reason → Plan → Execute → Validate
- Checkmarks for completed stages
- Current stage highlighted

**Level 3** (click a stage):
- Details: memories retrieved, tools called, citations
- Provenance chain

### 5.3 Memory Interaction

- **Inline**: when MiMo uses a memory, it cites it inline `[mem:abc]` → expandable card showing content, source, confidence, timestamp
- **Sidebar**: browse all memories, filter by type, edit, delete
- **Dashboard**: "ماذا يعرف MiMo عنك؟" — real counts, no fake stats

### 5.4 Knowledge Interaction

- **Inline**: when MiMo uses a knowledge entity, it links it `[ent:xyz]` → expandable
- **Sidebar**: browse entities by type, see relationships (list, not decorative graph)
- **Provenance**: every entity shows evidence count + sources

---

## 6. Surface Specifications

### 6.1 Shell (root)
- 100vh, 100vw
- `--m-bg` background
- Flex: rail (48px) | main (flex 1) | sidebar (340px, conditional)
- RTL

### 6.2 Rail (48px)
- Width: 48px (box-sizing: border-box)
- Background: transparent (blends with `--m-bg`) — no surface separation
- Content: logo (32×32) + ⌘K button + 3 nav buttons (32×32) + account (bottom)
- Active: `--m-accent-soft` bg + `--m-accent` text
- Hover: `--m-raised` bg (120ms)

### 6.3 Conversation (820px max, centered)
- Max-width: 820px
- Padding: 24px horizontal, 32px top, 16px bottom
- Messages: full-width within container
- User: `--m-raised` bg, right-aligned
- AI: transparent bg, left-aligned, markdown
- Scroll: smooth, auto-scroll to bottom
- Virtualization: for 1000+ messages

### 6.4 Composer (820px max, centered)
- Max-width: 820px
- Sticky at bottom
- Textarea: `--m-surface` bg, `--m-border` border, 12px radius
- Auto-grow up to 6 lines, then scroll
- Controls: left (mode, attach), right (send, deep think, web search, voice, image)

### 6.5 Sidebar (340px, summoned)
- Width: 340px, resizable 280–440px
- Background: `--m-surface`
- Border: 1px `--m-border` on outer edge
- 4 views, switched by rail icons or tabs
- Enter: 0ms. Exit: 200ms slide.

### 6.6 Command Palette (⌘K)
- Centered overlay, max-width 640px
- Glass backdrop (`--m-bg` at 80% + blur 16px)
- Input at top, results below
- Categorized: Actions, Conversations, Memories, Knowledge, Files
- Keyboard: ↑/↓, Enter, Esc

---

## 7. State Architecture

### 7.1 Store Shape (additive)

New fields in `useNova`:
- `sidebarView: 'context' | 'memory' | 'knowledge' | 'timeline'`
- `sidebarOpen: boolean` (default: false — hidden by default)
- `setSidebarView(view)` — opens sidebar + sets view
- `toggleSidebar()` — toggles visibility

### 7.2 Data Flow

```
User input → /api/chat (conversationId)
→ buildContext (GraphRAG + Memory + Knowledge)
→ runWorkflow (ModelRouter → WriterAgent → Validator)
→ SSE events → useEventStream → inline AI status
→ Response appears in conversation
→ Citations/provenance inline
→ Sidebar Context view shows live state
```

---

## 8. Accessibility

### 8.1 Keyboard
- Tab navigates interactive elements
- Enter/Space activates
- Esc closes overlays
- Focus visible: 2px accent outline, offset 2px
- Focus trap in modals

### 8.2 Screen Readers
- Semantic HTML: `<nav>`, `<main>`, `<aside>`, `<button>`, `<dialog>`
- ARIA labels on icon-only buttons
- `aria-live="polite"` for AI status changes
- `sr-only` for screen-reader text

### 8.3 Contrast
- Text on bg: ≥ 4.5:1
- Accent on bg: ≥ 3:1

### 8.4 RTL
- `direction: rtl` on root
- Logical properties where possible
- Code blocks: `direction: ltr`

### 8.5 Reduced Motion
- `@media (prefers-reduced-motion: reduce)` — all animations instant

---

## 9. Component Architecture

### 9.1 New Components (built from zero)

```
src/components/mimo/
├── Shell.tsx              (NEW — the root layout)
├── Rail.tsx               (NEW — 48px minimal rail)
├── Conversation.tsx       (NEW — the spine, replaces ChatView wrapper)
├── Composer.tsx           (REBUILD — primary interaction surface)
├── Sidebar.tsx            (NEW — summoned, 4 views)
├── AgentStatus.tsx        (NEW — inline AI state, replaces AgentDock)
├── CommandPalette.tsx     (REBUILD — ⌘K universal entry)
├── UniversalSearch.tsx    (REBUILD — ⌘/ search)
├── MemoryCard.tsx         (NEW — inline memory display)
├── Citation.tsx           (NEW — inline citation display)
├── useEventStream.ts      (KEEP — already good)
└── hooks.ts               (KEEP — data hooks)
```

### 9.2 Preserved Components (backend-adjacent, still good)
- `src/components/dev/*` — Development Workspace (fix issues, align tokens)
- `src/components/ui/*` — shadcn/ui primitives
- `src/lib/nova/store.ts` — Zustand store (additive changes)
- `src/lib/nova/useChat.ts` — chat logic (keep, adapt)
- `src/lib/nova/api.ts` — API helpers (keep)

### 9.3 Removed Components (replaced, not needed)
- `MiMoOS.tsx` → replaced by `Shell.tsx`
- `LeftRail.tsx` → replaced by `Rail.tsx`
- `WorkspaceTabs.tsx` → removed (no persistent top bar)
- `ContextSidebar.tsx` → replaced by `Sidebar.tsx`
- `AgentDock.tsx` → replaced by `AgentStatus.tsx` (inline)
- `panels/TabContent.tsx` → simplified (conversation + artifact/file only)
- `panels/PersonalDashboard.tsx` → removed (dashboard is the conversation empty state)
- `panels/ProjectWorkspace.tsx` → removed (project info in sidebar)
- `panels/MiniPanels.tsx` → removed (redundant)

---

## 10. Testing Strategy

- **Unit**: every component renders + interacts correctly
- **Integration**: UI → API → real data
- **Architecture**: provider isolation, no hardcoded identity, no key warnings
- **Regression**: ResourceMonitor key bug, conversation ID, pagination
- **E2E**: agent-browser walkthrough of every surface
- **Accessibility**: keyboard, ARIA, contrast, RTL, reduced motion

---

## 11. Visual QA Strategy

Screenshots required for:
1. Empty state (new conversation)
2. Active conversation
3. AI executing (inline status)
4. Sidebar: Memory
5. Sidebar: Knowledge
6. Sidebar: Timeline
7. Command Palette
8. Universal Search
9. Dev Workspace
10. Dark mode
11. Light mode
12. Compact viewport

Each compared against this spec.

---

## 12. Implementation Order

1. Design tokens (CSS variables)
2. Shell (root layout)
3. Rail (48px minimal)
4. Conversation (the spine)
5. Composer (primary interaction)
6. AgentStatus (inline AI state)
7. Sidebar (summoned, 4 views)
8. Command Palette (⌘K)
9. Universal Search (⌘/)
10. Memory + Knowledge panels (in sidebar)
11. Timeline (in sidebar)
12. Dev Workspace (align tokens)
13. Settings
14. Accessibility + responsive
15. Motion + polish
