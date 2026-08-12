# MiMo — UI Architecture & Interface Specification

> **The definitive reference for MiMo's visual interface. Derived from `MiMo_Product_Bible.md` (Parts 1-33), `architecture/MiMo_Frontend_Architecture.md`, and `research/` evidence.**

**Status:** FINAL. The single source of truth for all UI implementation. Any visual decision must trace back to this document or the Product Bible.

---

## 1. Design Philosophy

### 1.1 Identity: "Calm. Alive. Mine."

- **Calm** — default state is one conversation on a clean surface. No dashboards. No KPI grids. No clutter. Complexity appears only when needed and recedes when done.
- **Alive** — when the AI works, the user feels it through real runtime motion: verb-based status, progressive disclosure, never a spinner.
- **Mine** — local-first, personal, transparent. Every memory shows source + timestamp + delete. The system structurally cannot betray the owner.

### 1.2 The One Thesis

> **The conversation is the operating system; everything else slides in to support it.**

The conversation is PERMANENT in the center. It never gets replaced by a tab. Memory, Knowledge, Timeline, Tasks — all slide in around it via the right sidebar. The user never loses their thread.

### 1.3 Mental Model: Senior Collaborator

MiMo is not a tool, not a chatbot, not a dashboard. It is a **senior collaborator who never forgets**. The owner has a permanent conversation with them; they know the owner's projects, skills, history, preferences; they adapt to the current task; they show their work; they never betray trust.

### 1.4 Five Product Principles

1. **Conversation permanence** — the conversation never closes, never gets replaced, never scrolls away behind a dashboard.
2. **Adaptive sidebar** — the right sidebar swaps content based on context (Memory/Knowledge/Timeline/Context). The center stays conversation.
3. **Alive workflow** — verb-based AI state ("يفكّر…", "يسترجع…", "ينفّذ…"), progressive disclosure, never a spinner.
4. **Progressive disclosure** — default is calm (conversation + minimal sidebar). Developer tools, runtime metrics, agent internals hidden unless enabled.
5. **Keyboard as home** — every primary action reachable in ≤2 modifiers. Single-key daily-5 (C/M/A/R/S).

---

## 2. Information Architecture

### 2.1 Shell Layout

```
┌────────┬──────────────────────────────────────┬─────────────┐
│        │ Top Bar (44px)                       │             │
│  Rail  │ ┌─ ⌘K ─┬─ Project ─┬─ Tabs ─┬─ ⊞ ─┐│   Sidebar   │
│ (56px) │ │      │            │        │     ││  (320px)    │
│        │ └──────┴────────────┴────────┴─────┘│  adaptive   │
│        │                                      │             │
│  Home  │                                      │  Context /  │
│ Memory │       Conversation (820px max)       │  Memory /   │
│ Know   │                                      │  Knowledge /│
│ Time   │       ← the permanent spine →       │  Timeline   │
│ Proj   │                                      │             │
│ Files  │                                      │  (resizable │
│ Search │                                      │   260-440)  │
│        │                                      │             │
│  Dev   ├──────────────────────────────────────┤             │
│  Acc   │ Composer (820px max)                 │             │
└────────┴──────────────────────────────────────┴─────────────┘
```

### 2.2 The Critical IA Rule

> **Rail icons for Memory/Knowledge/Timeline switch the RIGHT SIDEBAR content. They do NOT open center tabs.**

The center is ALWAYS the conversation. When the user clicks "Memory" in the rail, the right sidebar slides to show memory content. The conversation stays visible. This is the fundamental difference from the old IA.

Only Artifacts and Files open as center tabs (they need full-width viewing). Everything else lives in the sidebar.

### 2.3 Navigation Hierarchy

```
MiMo OS (Workspace)
├── Left Rail (56px, icon-only, 6 nav + dev + account)
│   ├── Home → conversation focus (scroll to bottom)
│   ├── Memory → sidebar switches to Memory view
│   ├── Knowledge → sidebar switches to Knowledge view
│   ├── Timeline → sidebar switches to Timeline view
│   ├── Projects → project switcher overlay (⌘P)
│   ├── Files → files tab (center, full-width)
│   ├── Search → universal search overlay (⌘/)
│   ├── Development → full-viewport dev workspace (⌘⇧E)
│   └── Account → popover (theme / dev mode / settings)
│
├── Top Bar (44px)
│   ├── ⌘K trigger (left/center)
│   ├── Project chip (click → switcher)
│   ├── Workspace Tabs (pinned conversation + spawnable artifacts/files)
│   └── Right cluster (search + sidebar toggle)
│
├── Center (ALWAYS conversation OR a spawned tab)
│   ├── Conversation (pinned #1, 820px max, never closed)
│   ├── Artifact tabs (spawnable, closeable)
│   └── File tabs (spawnable, closeable)
│
├── Right Sidebar (320px, adaptive, resizable 260-440px)
│   ├── Context view (default — AI state + recent events)
│   ├── Memory view (when Memory rail icon clicked)
│   ├── Knowledge view (when Knowledge rail icon clicked)
│   └── Timeline view (when Timeline rail icon clicked)
│
├── AgentDock (floating, bottom-center — only when AI working)
│
└── Overlays (zero navigation — all summoned)
    ├── Command Palette (⌘K)
    ├── Universal Search (⌘/)
    ├── Project Switcher (⌘P)
    ├── Settings (S)
    ├── Voice / Image Gen (composer buttons)
    └── Developer Panel (devMode only)
```

### 2.4 Object Visibility Rules

| Object | Always Visible | Conditional | Hidden |
|---|---|---|---|
| Conversation | ✅ center, pinned | — | — |
| Right sidebar | — | ✅ default visible, ⌘B toggles | — |
| AgentDock | — | ✅ when AI working | ✅ when idle |
| Composer | ✅ on conversation tab | — | — |
| Memory | — | ✅ in sidebar when Memory clicked | — |
| Knowledge | — | ✅ in sidebar when Knowledge clicked | — |
| Timeline | — | ✅ in sidebar when Timeline clicked | — |
| Runtime metrics | — | — | ✅ unless devMode |
| Developer tools | — | — | ✅ unless devMode |
| Dashboard | — | — | ✅ never homepage |

---

## 3. Visual Language

### 3.1 Color System

**ONE accent (violet), used sparingly. No decorative gradients.**

| Token | Light | Dark | Use |
|---|---|---|---|
| `--nv-bg` | #fafaf9 | #0c0a09 | App background (warm neutral) |
| `--nv-bg2` | #ffffff | #15130f | Surface (cards, panels) |
| `--nv-bg3` | #f5f5f4 | #1c1917 | Raised surface (hover, active) |
| `--nv-bg4` | #e7e5e4 | #292524 | Depressed (inputs) |
| `--nv-tx` | #1c1917 | #fafaf9 | Primary text |
| `--nv-tx2` | #57534e | #a8a29e | Secondary text |
| `--nv-tx3` | #a8a29e | #57534e | Muted text |
| `--nv-bd` | #e7e5e4 | #292524 | Hairline border |
| `--nv-bd2` | #d6d3d1 | #44403c | Strong border |
| `--nv-pr` | #6d28d9 | #a78bfa | Accent (ONE) |
| `--nv-pr-soft` | #ede9fe | rgba(167,139,250,.12) | Accent background |

**AI state colors (semantic, not decorative):**
| Token | Light | Dark | Use |
|---|---|---|---|
| `--nv-thinking` | #6d28d9 | #a78bfa | AI reasoning |
| `--nv-retrieving` | #0891b2 | #22d3ee | AI retrieving context |
| `--nv-executing` | #ea580c | #fb923c | AI executing |
| `--nv-success` | #16a34a | #4ade80 | Success |
| `--nv-warning` | #d97706 | #fbbf24 | Warning |
| `--nv-error` | #dc2626 | #f87171 | Error |

### 3.2 Typography

- **Family**: IBM Plex Sans Arabic (Arabic), system sans (English), JetBrains Mono (code)
- **Scale**: 19/17/15/13/12/11/10px
- **Weights**: 400 (body), 600 (emphasis), 700 (headings) — never 800 (too heavy for calm UI)
- **Line-height**: 1.75 for markdown, 1.5 for UI text

### 3.3 Spacing

4px base grid: **4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48**. No arbitrary values.

### 3.4 Radius

- 4px (chips, badges)
- 8px (inputs, small buttons)
- 10px (cards, panels)
- 12px (modals, overlays)

### 3.5 Shadows (reserved for floating layers only)

| Token | Use |
|---|---|
| `--nv-ssm` | subtle (cards resting on surface — rarely used; prefer hairlines) |
| `--nv-smd` | popovers, dropdowns |
| `--nv-slg` | modals, overlays |

**Rule:** 90% of UI uses 1px hairlines + tonal separation. Shadows only for things that float above the surface.

### 3.6 Iconography

- Lucide icons (already installed)
- 16px in rail/buttons, 14px in inline contexts, 18px in panel headers
- Monochrome, inherit text color
- Active state: accent color

---

## 4. Motion Language

### 4.1 Timing Tiers (Product Bible 17.2)

| Tier | Duration | Use |
|---|---|---|
| instant | 0ms | summoned surfaces enter (Linear pattern) |
| micro | 100ms | hover, focus, state toggle |
| short | 200ms | panel expand, tab switch, sidebar slide |
| medium | 300ms | popover, dock slide |
| long | 500ms (ceiling) | modal open, page transition |

### 4.2 Easing

- **emphasized**: `cubic-bezier(0.05, 0.7, 0.1, 1.0)` — default for expressive motion
- **standard**: `cubic-bezier(0.2, 0.0, 0.0, 1.0)` — generic
- **linear**: never (except progress bars)

### 4.3 Asymmetric Timing (Linear differentiator)

- **Enter instantly** (0ms) — every summoned surface appears immediately
- **Exit gradually** (150ms fade-out) — dismissals are graceful

### 4.4 Motion Principles

1. Motion serves **orientation + feedback + continuity** — NOT decoration.
2. Never animate content the user is reading.
3. State changes: 100ms (fast enough to feel responsive, slow enough to perceive).
4. Panel slides: 200ms (short enough to not delay work).
5. Reduced motion: `@media (prefers-reduced-motion: reduce)` — all animations become instant.

---

## 5. Interaction Model

### 5.1 Keyboard Language (Product Bible 15.2)

| Shortcut | Action |
|---|---|
| `⌘K` | Command Palette |
| `⌘/` | Universal Search |
| `⌘B` | Toggle right sidebar |
| `⌘P` | Project switcher |
| `⌘T` | New tab |
| `⌘W` | Close tab (not pinned conversation) |
| `⌘⇧L` | Toggle left rail |
| `⌘⇧D` | Toggle Developer Mode |
| `⌘⇧E` | Toggle Development Workspace |
| `Alt+1..9` | Switch to tab N |
| `C` | New conversation (single-key) |
| `M` | Sidebar → Memory view |
| `A` | Sidebar → Context (agent) view |
| `R` | Research mode |
| `S` | Settings |
| `Enter` | Send message |
| `⇧Enter` | Newline in composer |
| `Esc` | Close any overlay |

**Cap: 2 modifiers max.** No 3-modifier hotkeys.

### 5.2 AI State Visualization (Progressive Disclosure)

**Level 1** (always visible when AI working):
- A single verb status: "يفكّر…" / "يسترجع السياق…" / "ينفّذ…" / "يتحقق…"
- A calm pulsing accent dot (not a spinner)
- Appears in the AgentDock (floating, bottom-center)

**Level 2** (click to expand):
- Pipeline stages: Context → Reason → Plan → Execute → Validate
- Completion checkmarks
- Current stage highlighted

**Level 3** (click a stage):
- Details: which memories were retrieved, which tools called, citations
- Provenance chain

**Rule:** Never a spinner. Always a descriptive verb. The user always knows WHAT MiMo is doing, can optionally learn WHY.

### 5.3 Memory Interaction

- Memory items show: content, type badge (semantic color), confidence bar (4px), source, timestamp
- Click to expand: full content, provenance, creation date, last updated, confidence score, related entities
- Inline edit (pencil icon)
- Delete with confirmation (soft-delete, recoverable)
- "ماذا يعرف MiMo عنك؟" count in dashboard — real numbers only

### 5.4 Knowledge Interaction

- Knowledge entities show: name, type badge, confidence, evidence count
- Click to expand: description, relationships (list, not decorative graph), evidence sources
- Relationships are useful: click a related entity → navigate to it
- No graph visualization unless the user explicitly asks (it's decorative by default)

### 5.5 Agent + Task Interaction

- AgentDock appears when AI is working (conditional)
- Shows: current verb, elapsed time, current step
- Expandable: full pipeline, tools used, artifacts produced
- Long-running tasks: progress bar, pause/resume/cancel buttons
- Approval requests: inline in the conversation, not a modal

---

## 6. Surface Specifications

### 6.1 Left Rail (56px)

- Width: EXACTLY 56px (box-sizing: border-box)
- Background: `--nv-bg2`
- Border: 1px `--nv-bd` on the inner edge (left in RTL)
- Content: logo (36×36, solid accent, "M") + 7 nav buttons (36×36) + dev button (conditional) + account button
- Active state: `--nv-pr-soft` background + `--nv-pr` text
- Hover: `--nv-bg3` background (100ms)
- ARIA: `role="navigation"`, `aria-label` on each button

### 6.2 Top Bar (44px)

- Height: EXACTLY 44px (box-sizing: border-box)
- Background: `--nv-bg2`
- Border: 1px `--nv-bd` on bottom
- Content: ⌘K trigger (left) + project chip + workspace tabs + search + sidebar toggle (right)
- No mode selector (moved to composer)
- Tabs: 34px height, accent underline (2px) for active, muted text for inactive

### 6.3 Conversation (820px max, centered)

- Max-width: 820px, centered in the main area
- Messages: full-width within the 820px container
- User messages: `--nv-bg3` background, right-aligned (RTL)
- AI messages: `--nv-bg2` background, left-aligned, markdown rendered
- Timestamps: `--nv-tx3`, 10px, relative ("قبل دقيقة")
- Citations: inline `[1]`, `[2]` links → expand to show source
- Provenance: hover on a claim → tooltip with evidence
- Scroll: smooth, auto-scroll to bottom on new message, virtualized for 1000+ messages

### 6.4 Composer (820px max, centered)

- Max-width: 820px, centered
- Textarea: `--nv-bg2` background, `--nv-bd` border, 8px radius
- Mode selector: dropdown (left side), shows current mode
- Buttons: attach, image gen, deep think, web search, voice, send
- Send: `--nv-pr` accent when text present, disabled when empty
- `⇧Enter` for newline, `Enter` to send

### 6.5 Right Sidebar (320px, adaptive)

- Width: 320px default, resizable 260–440px
- Background: `--nv-bg2`
- Border: 1px `--nv-bd` on the outer edge
- Content: 4 views (Context / Memory / Knowledge / Timeline)
- View switching: via rail icons (Home→Context, Memory→Memory, etc.)
- Active view indicator: accent text + accent-soft background on the header
- Resize handle: 3px wide, `--nv-bd`, hover → `--nv-pr`

### 6.6 AgentDock (floating, bottom-center)

- Appears ONLY when AI is working (conditional)
- Position: fixed, bottom-center, above the composer
- Background: `--nv-bg2` + `--nv-smd` shadow (floating layer)
- Level 1: single-line verb status + pulsing dot + elapsed time
- Level 2 (expanded): pipeline stages with checkmarks
- Level 3 (stage clicked): details panel
- Enter: 0ms (instant). Exit: 150ms fade.

### 6.7 Command Palette (⌘K)

- Full-screen overlay with glass backdrop (`--nv-glass`)
- Centered input (max-width 640px)
- Results below: categorized (Actions / Conversations / Memories / Knowledge / Files)
- Keyboard: ↑/↓ navigate, Enter execute, Esc close
- Opens in <80ms

### 6.8 Universal Search (⌘/)

- Full-screen overlay with glass backdrop
- Centered input (max-width 640px)
- Results: categorized, each with icon + title + subtitle + timestamp
- Keyboard: ↑/↓ navigate, Enter open, Esc close

---

## 7. State Management

### 7.1 Zustand Store Shape (additive — no breaking changes)

New fields added to `useNova`:
- `sidebarView: 'context' | 'memory' | 'knowledge' | 'timeline'` — controls right sidebar content
- `setSidebarView(view)` — switches the sidebar view

Removed concepts:
- Memory/Knowledge/Timeline no longer open as center tabs — they switch the sidebar view
- `WorkspaceTabKind` simplified: `'conversation' | 'artifact' | 'file'` (removed `'memory' | 'knowledge' | 'dashboard' | 'project'` — these are sidebar views, not center tabs)

### 7.2 Data Flow

```
User input → /api/chat (with conversationId)
→ buildContext (GraphRAG + Memory + Knowledge)
→ runWorkflow (Reason → Plan → Execute → Validate)
→ SSE events → useEventStream → UI state update
→ Conversation display + AgentDock progressive disclosure
→ Right sidebar Context view shows live AI state
```

---

## 8. Accessibility

### 8.1 Keyboard Navigation
- Tab navigates through interactive elements
- Enter/Space activates
- Esc closes overlays
- Focus visible: 2px accent outline, offset 2px
- Focus trap in modals (CommandPalette, UniversalSearch, Settings)

### 8.2 Screen Readers
- Semantic HTML: `<nav>`, `<main>`, `<aside>`, `<button>`, `<dialog>`
- ARIA labels on all icon-only buttons
- `sr-only` class for screen-reader-only text
- Live regions for AI state changes (`aria-live="polite"`)

### 8.3 Contrast
- Text on bg: ≥ 4.5:1 (stone palette achieves this)
- Accent on bg: ≥ 3:1 (for large text + UI components)

### 8.4 Reduced Motion
- `@media (prefers-reduced-motion: reduce)` — all animations become instant
- Respect in JS: check `window.matchMedia('(prefers-reduced-motion: reduce)')`

### 8.5 RTL
- `direction: rtl` on root
- All margins/paddings use logical properties (`ms-`, `me-`, `ps-`, `pe-`) where possible
- Code blocks: `direction: ltr` forced
- Icons mirror correctly

---

## 9. Responsive Strategy

- **Desktop-first** (Product Bible: MiMo is a desktop personal OS)
- **> 960px**: full shell (rail + topbar + center + sidebar)
- **640–960px**: sidebar becomes overlay, rail stays
- **< 640px**: rail becomes bottom bar, conversation full-width, sidebar overlay
- **Development Workspace**: full viewport on all sizes (it's a separate mode)

---

## 10. Implementation Order

1. **Shell** (`MiMoOS.tsx`) — the root layout with the new IA
2. **LeftRail** — 56px, rail icons switch sidebar view (not center tabs)
3. **TopBar** (merged into `WorkspaceTabs.tsx`) — 44px, minimal
4. **ContextSidebar** — adaptive 4 views (Context/Memory/Knowledge/Timeline)
5. **AgentDock** — 3-level progressive disclosure
6. **Conversation** — verify it's the permanent center
7. **Composer** — mode selector dropdown
8. **Overlays** — CommandPalette, UniversalSearch (verify glass + keyboard)
9. **Dev Workspace** — visual token alignment (already done)
10. **Accessibility + Responsive** — verify + fix

---

## 11. What Changed from the Old IA

| Old | New | Why |
|---|---|---|
| Memory/Knowledge open as center tabs | Rail icons switch right sidebar view | Conversation stays as the permanent spine |
| 8 sidebar tabs | 4 sidebar views (Context/Memory/Knowledge/Timeline) | Progressive disclosure, less clutter |
| Mode bar in topbar | Mode selector in composer | Conversation is the spine, modes are contextual |
| Tab replaces conversation | Conversation always center; only Artifacts/Files spawn tabs | "Conversation is the OS" principle |
| AgentDock shows all stages | 3-level progressive disclosure | Calm default, details on demand |

---

## 12. Product Invariants (must not break)

1. Conversation is always visible (pinned, never closed, never replaced by Memory/Knowledge/Timeline tabs)
2. ONE accent color, no decorative gradients
3. Never a spinner — always a verb-based status
4. All data is real (no fake stats, no seed data masquerading as live)
5. All backend contracts preserved (APIs, events, persistence, SSE, tools, runtime)
6. All 119+ tests pass
7. Architecture guard passes
8. Keyboard-first (≤2 modifiers)
9. RTL-first (Arabic is primary)
10. Local-first (no network in critical path)
