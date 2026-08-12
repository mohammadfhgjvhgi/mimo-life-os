# MiMo — Zero-Based UI/UX Master Specification

> **The definitive reference for MiMo's product interface. Zero-based reconstruction.**
> Derived from `MiMo_Product_Bible.md` (Parts 1-33) + `research/` (54 products) + 2025 agentic interface research.
> **Status:** FINAL. Every visual decision must trace to this document.

---

## 1. Product Philosophy

### 1.1 What MiMo Is

MiMo is a **private, single-user AI Life Operating System**.

Not a chatbot. Not a dashboard. Not a developer tool. Not a notes app.

A **persistent personal intelligence system** where:
- Conversation is the natural language interface
- Tasks are the execution unit
- Projects are living contexts
- Memory is continuity
- Knowledge is understanding
- Agents are workers
- Artifacts are outputs
- Timeline is history
- The user is always in control

### 1.2 What MiMo Is NOT

- **NOT a developer tool** — there is no "Developer Workspace", no IDE, no terminal-first home, no code-centric navigation
- **NOT a chatbot** — conversation is the spine, not the whole product
- **NOT a dashboard** — no KPI grids, no metrics spam, no "home page" with stats
- **NOT a SaaS** — local-first, single-user, no counters, no deprecations

### 1.3 Three Words: Calm. Alive. Mine.

- **Calm** — default is one conversation on a clean surface. Complexity appears only when needed.
- **Alive** — when MiMo works, you see real actions (Action Trace, not spinner).
- **Mine** — memory is visible, correctable, local-first. Every memory shows source + timestamp + delete.

### 1.4 The ONE Thesis

> **The conversation is the operating system; everything else slides in to support it.**

The conversation is PERMANENT. It never closes. It never gets replaced. Memory, knowledge, tasks, artifacts — all appear INLINE when relevant, and in summoned surfaces when browsing.

---

## 2. User Model

### 2.1 The Owner

The user is the **owner** of the system. Not a "user" of a product. Not a "developer" of code. The owner.

They use MiMo for:
- Thinking (conversation)
- Planning (tasks)
- Remembering (memory)
- Understanding (knowledge)
- Creating (artifacts)
- Organizing (projects)
- Reflecting (timeline)
- Executing (agents)

### 2.2 The Senior Collaborator

MiMo is a **senior collaborator who never forgets**. Not a tool, not an intern, not a chatbot. A collaborator who:
- Knows your projects, skills, history, preferences
- Adapts to whatever you're working on
- Shows their work (Action Trace)
- Lets you correct them per-step
- Never forgets
- Never betrays your trust

---

## 3. Core Mental Model

### 3.1 ONE Primary Object: Conversation

MiMo has exactly ONE primary object: the **Conversation**. Everything else orbits it.

### 3.2 Object Hierarchy

```
Workspace (the entire OS — single instance, single user)
├── Conversation (the permanent spine — never closes)
│   ├── Messages (user + AI)
│   ├── Tasks (agent work units — appear inline)
│   ├── Artifacts (outputs — appear inline)
│   └── Citations (provenance — appear inline)
├── Project (the ONLY container — one per long-running effort)
│   ├── Conversations (forks)
│   ├── Tasks
│   ├── Artifacts
│   ├── Files
│   ├── Memory (scoped)
│   ├── Knowledge (scoped)
│   └── Settings
├── Memory (what MiMo remembers about you)
├── Knowledge (what MiMo knows — entities + relationships)
├── Timeline (system + life activity)
└── Agents (workers — Planner/Researcher/Memory/Writer)
```

### 3.3 The Mental Model Flow

```
User → Intent → Context (what MiMo knows) → AI (reasoning) → Agent (execution)
→ Plan (approvable) → Execution (visible) → Artifact (output) → Memory (auto-extracted)
→ Knowledge (derived) → Result (inline in conversation)
```

**Invariant:** The result returns inline. The conversation never closes. Memory and knowledge accumulate in the background.

---

## 4. Information Architecture

### 4.1 The "Quiet Surface" Concept

The default state is almost blank: the conversation, centered. A composer at the bottom. A minimal rail. No sidebar, no tabs, no mode bar, no dashboard.

When MiMo works, a single Action Trace line appears inline. When you need more, you summon it.

### 4.2 What's Always Visible / Contextual / Summoned

**Always Visible:**
| Element | Location |
|---|---|
| Conversation | Center (820px max, centered) |
| Composer | Bottom (820px max, centered) |
| Rail | Left edge (48px — 4 buttons + logo) |

**Contextual (appears when needed):**
| Element | When | Where |
|---|---|---|
| Action Trace | AI working | Inline in conversation |
| Task card | Task created | Inline in conversation |
| Approval card | Sensitive action | Inline in conversation |
| Error card | Error occurs | Inline in conversation |
| Background task indicator | Task minimized | Bottom of conversation |
| Memory citation | MiMo uses a memory | Inline `[mem:abc]` expandable |
| Knowledge link | MiMo uses an entity | Inline `[ent:xyz]` expandable |
| Artifact card | Artifact produced | Inline in conversation |

**Summoned (user action):**
| Element | Trigger | Where |
|---|---|---|
| Sidebar | Rail icon / ⌘B | Right side (340px) |
| Command Palette | ⌘K | Center overlay |
| Universal Search | ⌘/ | Center overlay |
| Project Switcher | ⌘P | Center overlay |
| Task detail | Click task card | Right side panel |
| Settings | S key | Modal |

### 4.3 Shell Layout

```
┌────────┬──────────────────────────────────────┐
│        │                                      │
│        │         Conversation                  │
│  Rail  │         (820px max, centered)         │
│ (48px) │                                      │
│        │         [Task cards inline]           │
│        │         [Artifact cards inline]       │
│        │         [Memory citations inline]     │
│        │         [Approval cards inline]       │
│        │         [Error cards inline]          │
│        │                                      │
│        ├──────────────────────────────────────┤
│        │  Action Trace (if AI working)        │
│        ├──────────────────────────────────────┤
│        │  Background task indicator (if any)  │
│        ├──────────────────────────────────────┤
│        │  Composer (820px max, centered)       │
│        └──────────────────────────────────────┘
└────────────────────────────────────────────────┘
  Sidebar (340px) — summoned right
```

### 4.4 Navigation

The rail has 4 buttons + logo:
1. **⌘K** — Command Palette (universal entry)
2. **Memory** — Sidebar → Memory view
3. **Knowledge** — Sidebar → Knowledge view
4. **Account** — Popover (theme, settings)

**Removed from rail** (now in command palette or inline):
- Home (logo click returns to conversation)
- Timeline (sidebar view, accessed via ⌘K → "timeline")
- Projects (⌘P switcher)
- Files (⌘K → "files")
- Search (⌘/)
- Development (REMOVED — not a product feature)

---

## 5. Conversation Model

### 5.1 The Permanent Spine

The conversation is ALWAYS in the center. It never gets replaced by a tab. It never closes.

### 5.2 Inline Elements

When MiMo works, elements appear INLINE in the conversation:
- **Action Trace**: "يفكّر… / يسترجع السياق… / ينفذ…" (verb + object, not chain-of-thought)
- **Task cards**: lifecycle, steps, progress, pause/cancel
- **Artifact cards**: code/markdown/image/diagram — preview inline, expand to full
- **Memory citations**: `[mem:abc]` → expandable card with content, source, confidence, edit/delete
- **Knowledge links**: `[ent:xyz]` → expandable with relationships + evidence
- **Approval cards**: "MiMo wants to modify 6 files" + Review/Approve/Reject
- **Error cards**: What happened / Why / What MiMo can do / What you can do + Retry/Details/Fix

### 5.3 Message Actions

Each message has contextual actions:
- Regenerate (retry with different approach)
- Edit (correct the input)
- Branch (fork from this turn)
- Save to memory (explicit memory capture)
- Create task (turn message into a task)
- Copy

---

## 6. Task Model

### 6.1 What is a Task?

A Task is a unit of agent work. It represents anything MiMo does that has a lifecycle:
- Research something
- Plan a trip
- Learn a subject
- Organize a project
- Prepare a decision
- Analyze documents
- Execute a workflow
- Investigate a question

### 6.2 Task Lifecycle

```
User request
→ Task created (inline card appears in conversation)
→ Understanding ("فهمت الهدف")
→ Planning ("أرتب الخطوات — 5 خطوات")
→ [Approval gate if file-modifying or irreversible]
→ Execution ("أنفذ الخطوة 2 من 5")
→ Tool calls ("أستدعى أداة البحث")
→ Observation ("أحلل النتائج")
→ Verification ("أتحقق من النتيجة")
→ Completed (artifact produced)
```

### 6.3 Task States

| State | Label | Color | Meaning |
|---|---|---|---|
| pending | بانتظار | muted | Created, not started |
| planning | يخطط | thinking | Building the plan |
| executing | ينفذ | executing | Running steps |
| validating | يتحقق | retrieving | Checking result |
| paused | متوقف مؤقتاً | warning | User paused |
| done | اكتمل | success | Completed |
| error | خطأ | error | Failed |
| cancelled | أُلغي | muted | User cancelled |

### 6.4 Task Card (inline)

Collapsed: single line with status + intent + progress
Expanded: goal, steps, tools, files, artifacts, errors, pause/cancel/resume

### 6.5 Background Tasks

Tasks minimize to a calm indicator at the bottom of the conversation. User continues chatting. Click to expand task list.

### 6.6 Task Detail

Click a task card → right side panel shows: goal, status, progress, steps, tools used, files changed, artifacts produced, timeline, checkpoints, recovery.

---

## 7. Agent Model

### 7.1 Action Trace (NOT chain-of-thought)

MiMo shows **operational state**, never internal reasoning:

| Stage | What user sees |
|---|---|
| Understanding | "فهمت الطلب" |
| Planning | "أرتب الخطوات — 5 خطوات" |
| Research | "أراجع 12 مصدراً" |
| Memory | "أتحقق من معلوماتك السابقة — 3 ذكريات" |
| Execution | "أنفذ الخطوة 3 من 7" |
| Verification | "أتحقق من النتيجة" |
| Completed | "اكتمل" |

### 7.2 Progressive Disclosure

**Level 1** (default): single line — current verb + object
**Level 2** (expanded): full action trace with checkmarks + counts
**Level 3** (click an action): details — sources, tools, files, citations

### 7.3 Multi-Agent (future)

When multiple agents work:
```
◐ ينفذ — 3 وكلاء يعملون
  • وكيل البحث — يراجع المصادر
  • وكيل الكتابة — يحرر التقرير
  • وكيل التحقق — يراجع النتيجة
```

---

## 8. Project Model

### 8.1 Projects are Living Contexts

A project is NOT a folder. It's a living workspace that contains:
- Purpose (what is this project about?)
- Current state (what's happening now?)
- Goals (what are we trying to achieve?)
- Active tasks (what's being worked on?)
- Recent activity (what happened recently?)
- Important knowledge (key entities + relationships)
- Files (project-scoped)
- Artifacts (outputs)
- Decisions (key choices made)
- Timeline (project history)

### 8.2 Project Surface

When the user enters a project (via ⌘P switcher), the conversation scope changes. The sidebar shows project context. A project chip appears in the composer.

### 8.3 NO Developer Workspace

The "Development Workspace" was an interpretation error. It is NOT part of the product. The backend sandbox/runtime/dev-projects capabilities are internal agent tools, NOT a user-facing product surface.

**What stays:** The backend sandbox, runtime gateway, and dev-projects remain as internal capabilities that agents use to execute tasks.
**What's removed:** The user-facing "Development Workspace" UI (the full-viewport IDE-like interface with file explorer, terminal, code editor, build/test/logs panels).

---

## 9. Memory Model

### 9.1 Memory is Continuity

Memory is what makes MiMo *personal*. It's not a database — it's the system's understanding of the user.

### 9.2 Inline Citations

When MiMo uses a memory, it cites it inline:
```
[mem:abc] → expandable card:
  "المستخدم يفضّل التعلم العملي"
  المصدر: محادثة 2024-08-15
  الثقة: 85% · نوع: تفضيل
  [تعديل] [حذف] [إخفاء]
```

### 9.3 Memory View (sidebar)

Browse all memories:
- Filter by type (fact / preference / skill / goal / event)
- Search
- Edit (inline)
- Delete (soft-delete with confirmation)
- See provenance (source, date, confidence, related entities)

### 9.4 "What does MiMo know about you?"

A natural section in the Context sidebar view: real counts (no fake stats), with links to browse.

---

## 10. Knowledge Model

### 10.1 Knowledge is Understanding

Knowledge is DIFFERENT from memory:
- **Memory**: what MiMo remembers about the user
- **Knowledge**: what MiMo knows — entities, concepts, and how they connect

### 10.2 Inline Entity Links

When MiMo references a knowledge entity:
```
[ent:xyz] → expandable card:
  React
  النوع: تقنية · الثقة: 90%
  العلاقات:
    · يعتمد على TypeScript
    · مستخدم في 3 مشاريع
  الأدلة: 5 مصادر
```

### 10.3 Knowledge View (sidebar)

Browse entities by type (person / project / technology / concept / skill / goal):
- See relationships (list, not decorative graph)
- See evidence + sources
- See confidence + evidence count

### 10.4 NO Decorative Graph

Graph visualization is NOT used by default. It's decorative. Users need to explore relationships, not stare at a node diagram. A relationship list is more useful + calmer.

---

## 11. Artifact Model

### 11.1 Artifacts are First-Class Outputs

Artifacts are what MiMo produces:
- Documents (reports, plans, summaries)
- Code (scripts, functions)
- Images (generated)
- Diagrams (structured visualizations)
- Tables (structured data)
- Research results

### 11.2 Inline Display

Artifacts appear INLINE in the conversation as cards:
- Preview (collapsed)
- Expand to full view
- Actions: copy, edit, export, save to project, version history

### 11.3 Artifact Panel (summoned)

Browse all artifacts by type + project. Search. Reopen.

---

## 12. Research Model

### 12.1 Research is a First-Class Workflow

When the user asks a research question, MiMo:
1. Clarifies the question (if needed)
2. Searches sources
3. Evaluates credibility
4. Extracts key information
5. Synthesizes findings
6. Notes contradictions
7. Produces a cited answer
8. Saves as a research artifact

### 12.2 Research UI

Inline in conversation:
```
📚 بحث — أفضل ممارسات JWT
─────────────────────────
✓ بحث في 8 مصادر
✓ قيّم المصداقية
✓ استخلص النقاط الرئيسية
→ يركّب الإجابة

[عرض المصادر] [حفظ كبحث]
```

---

## 13. File Model

### 13.1 Two Levels

**Contextual files:** attached to a conversation / task / project.
**Global files:** available to MiMo across all contexts.

### 13.2 Provenance

Every file shows: where it came from, why MiMo has access, when it was added.

---

## 14. Approval Model

### 14.1 Approval Levels

| Level | Behavior | Example |
|---|---|---|
| Informational | No approval | "ذكرت أنك تفضّل العمل ليلاً" |
| Reversible | Automatic | "حفظت ذاكرة جديدة" |
| Important | Ask before executing | "تعديل 6 ملفات في المشروع" |
| Irreversible | Always require approval | "حذف مشروع" |

### 14.2 Inline Approval Cards

```
⚠ موافقة مطلوبة
MiMo يريد تعديل 6 ملفات في مشروع "تطوير الويب"
[مراجعة التغييرات] [موافقة] [رفض]
```

---

## 15. Sandbox Interaction Model

### 15.1 Sandbox is an Agent Capability

The sandbox is NOT a user-facing surface. It's an internal capability that agents use to execute tasks.

### 15.2 What the User Sees

The user sees:
- What MiMo is executing (Action Trace)
- Execution status
- Result
- Files created
- Errors
- Recovery options

Advanced technical details (sandbox profile, permissions, process list) are progressively disclosed — NOT the primary view.

### 15.3 NEVER a Terminal-First Interface

The primary interface NEVER looks like a terminal. The user interacts through conversation + task cards, not through a command line.

---

## 16. Command Model

### 16.1 Universal Command Palette (⌘K)

The command palette is the universal entry point. It supports:
- Actions: "new conversation", "create task", "start research"
- Navigation: "open memory", "open knowledge", "open timeline"
- Search: "find project", "find file", "find artifact"
- Settings: "toggle theme", "toggle dev mode", "open settings"

### 16.2 Prefix Grammar (future)

- `>` — actions
- `@` — entities
- `/` — slash commands
- `#` — search by tag

---

## 17. Notification Model

### 17.1 Calm Notifications

No notification spam. Only:
- Task completed
- Approval required
- Error occurred
- Important result
- Background task finished

### 17.2 Inline, Not Toasts

Notifications appear inline in the conversation when possible. Toasts only for transient confirmations (2.6s auto-dismiss).

---

## 18. Responsive Model

### 18.1 Desktop-First

MiMo is a desktop personal OS. Target resolutions:
- 1280×720 (minimum)
- 1440×900 (laptop)
- 1920×1080 (desktop)
- 2560×1440 (large)

### 18.2 Adaptive

- **> 960px**: full shell (rail + conversation + summoned sidebar)
- **640–960px**: sidebar becomes overlay, rail stays
- **< 640px**: rail becomes bottom bar, conversation full-width

---

## 19. Accessibility Model

- **Keyboard**: all actions ≤2 modifiers. Tab navigates, Enter/Space activates, Esc closes.
- **Focus**: visible accent outline (2px, offset 2px)
- **ARIA**: semantic HTML + aria-label on icon buttons + aria-live for AI state
- **Contrast**: text on bg ≥ 4.5:1
- **RTL**: direction: rtl, code blocks LTR
- **Reduced motion**: @media (prefers-reduced-motion: reduce) — all animations instant

---

## 20. Motion System

| Tier | Duration | Use |
|---|---|---|
| instant | 0ms | summoned surfaces enter |
| micro | 120ms | hover, focus, state toggle |
| short | 200ms | panel slide, tab switch |
| medium | 300ms | popover, overlay |
| long | 400ms ceiling | modal, full-screen transition |

**Easing**: `cubic-bezier(0.05, 0.7, 0.1, 1.0)` (emphasized)
**Asymmetric**: enter instantly (0ms), exit gradually (150ms fade)
**Reduced motion**: all animations become instant

---

## 21. Visual Design System

### 21.1 Color

**ONE accent: violet. No decorative gradients.**

| Token | Light | Dark | Use |
|---|---|---|---|
| `--m-bg` | #fafaf9 | #0c0a09 | App background |
| `--m-surface` | #ffffff | #161311 | Surface (cards, panels) |
| `--m-raised` | #f5f5f4 | #1c1917 | Raised (hover, active) |
| `--m-text` | #1c1917 | #f5f5f4 | Primary text |
| `--m-text-2` | #57534e | #a8a29e | Secondary text |
| `--m-text-3` | #a8a29e | #57534e | Muted text |
| `--m-border` | #e7e5e4 | #292524 | Hairline border |
| `--m-accent` | #6d28d9 | #a78bfa | Accent (ONE) |
| `--m-accent-soft` | #ede9fe | rgba(167,139,250,.10) | Accent background |

**AI state colors**: thinking, retrieving, executing, success, warning, error

### 21.2 Typography

- IBM Plex Sans Arabic (Arabic), system sans (English), JetBrains Mono (code)
- Scale: 20/17/15/14/13/12/11px
- Weights: 400/500/600

### 21.3 Spacing

4px grid: 4/8/12/16/20/24/32/40/48/64

### 21.4 Radius

6px (chips) / 8px (inputs) / 10px (cards) / 12px (panels)

### 21.5 Elevation

Shadows reserved for floating layers only. 90% of UI uses hairlines + tonal separation.

---

## 22. Component Architecture

### 22.1 New Components (built from zero)

```
src/components/mimo/
├── Shell.tsx              (root layout — Quiet Surface)
├── Rail.tsx               (48px — 4 buttons + logo)
├── Conversation.tsx       (the permanent spine)
├── Composer.tsx           (primary interaction surface)
├── AgentStatus.tsx        (inline Action Trace)
├── TaskCard.tsx           (inline task lifecycle)
├── BackgroundTaskIndicator.tsx (minimized tasks)
├── Sidebar.tsx            (summoned — 5 views)
├── CommandPalette.tsx     (⌘K universal entry)
├── UniversalSearch.tsx    (⌘/ search)
├── ApprovalCard.tsx       (inline approval)
├── ErrorCard.tsx          (inline error with actions)
├── MemoryCitation.tsx     (inline [mem:abc] expandable)
├── KnowledgeLink.tsx      (inline [ent:xyz] expandable)
├── ArtifactCard.tsx        (inline artifact preview)
├── useEventStream.ts      (SSE consumer)
├── useTasks.ts            (task data hook)
└── hooks.ts               (workspace data)
```

### 22.2 Removed Components

| Component | Why removed |
|---|---|
| `MiMoOS.tsx` | Replaced by Shell.tsx |
| `LeftRail.tsx` | Replaced by Rail.tsx |
| `WorkspaceTabs.tsx` | No persistent top bar |
| `ContextSidebar.tsx` | Replaced by Sidebar.tsx |
| `AgentDock.tsx` | Replaced by AgentStatus.tsx (inline) |
| `DeveloperPanel.tsx` | Developer mode is internal, not product UI |
| `ExecutionTrace.tsx` | Merged into AgentStatus |
| `panels/PersonalDashboard.tsx` | No dashboard (conversation empty state) |
| `panels/ProjectWorkspace.tsx` | Project info in sidebar |
| `panels/MiniPanels.tsx` | Redundant |
| `panels/TabContent.tsx` | Simplified (conversation + artifact only) |
| **ALL of `src/components/dev/*`** | Development Workspace is NOT a product feature |

### 22.3 Preserved Backend (untouched)

All backend code remains: Core, APIs, events, persistence, SSE, tools, runtime, sandbox, agents, memory, knowledge, GraphRAG. The backend is an asset.

---

## 23. State Architecture

### 23.1 Store Shape (Zustand)

```typescript
interface NovaState {
  // Shell
  theme: 'dark' | 'light'
  devMode: boolean  // internal — for diagnostics only, NOT a product surface
  sidebarView: 'context' | 'memory' | 'knowledge' | 'tasks' | 'timeline'
  rightOpen: boolean  // false by default (Quiet Surface)
  rightWidth: number  // 340

  // Conversation
  convs: Conversation[]
  activeId: string
  input: string
  loading: boolean

  // Overlays
  palette: boolean  // ⌘K
  universalSearch: boolean  // ⌘/
  settings: boolean

  // Tabs (conversation + artifact only — NO memory/knowledge/project tabs)
  tabs: WorkspaceTab[]
  activeTabId: string
}
```

### 23.2 WorkspaceTabKind (simplified)

```typescript
type WorkspaceTabKind = 'conversation' | 'artifact'
// Removed: 'file' (files are contextual, not tabs)
// Removed: 'memory' | 'knowledge' | 'dashboard' | 'project' (sidebar views)
```

---

## 24. Interaction Patterns

### 24.1 Keyboard Language

| Shortcut | Action |
|---|---|
| ⌘K | Command Palette |
| ⌘/ | Universal Search |
| ⌘B | Toggle sidebar |
| ⌘P | Project switcher |
| ⌘W | Close tab |
| Alt+1..9 | Switch tab |
| C | New conversation |
| M | Sidebar → Memory |
| S | Settings |
| Enter | Send |
| ⇧Enter | Newline |
| Esc | Close overlay |

**Cap: 2 modifiers max.**

### 24.2 The ONE Defining Interaction

**⌘K is the universal entry point.** Every action is reachable from there.

---

## 25. Empty / Loading / Error States

### 25.1 Empty States

Every empty state answers:
- Where am I?
- What can I do here?
- Why is this empty?
- What's the next action?

Example: "لا توجد ذكريات بعد. ستظهر هنا عندما يتعلّم MiMo عنك من المحادثات."

### 25.2 Loading States

- Skeletons (not spinners) for data loading
- Action Trace for AI work (verb + object, not "loading...")
- Never a bare spinner

### 25.3 Error States

Every error shows:
- What happened?
- Why?
- What can MiMo do?
- What can I do?
- Actions: Retry / View details / Fix automatically / Ignore

---

## 26. RTL Strategy

- `direction: rtl` on root
- Arabic is primary language
- Code blocks: `direction: ltr` forced
- Logical properties where possible
- Icons mirror correctly

---

## 27. Performance Strategy

- Message virtualization for 1000+ messages (future)
- Event deduplication via stable IDs in useEventStream
- Polling only when active tasks exist
- No unnecessary re-renders (Zustand selectors)
- Local-first: no network in critical path

---

## 28. Migration / Removal Plan

### 28.1 What's Removed

1. **Development Workspace UI** — `src/components/dev/*` is NOT rendered. The backend (`src/core/dev/*`, `/api/dev/*`) stays as internal agent capabilities.
2. **Old shell components** — MiMoOS, LeftRail, WorkspaceTabs, ContextSidebar, AgentDock, DeveloperPanel, ExecutionTrace, all panels/* — replaced by new components.
3. **Mode bar** — removed. Mode selection lives in composer (contextual).
4. **Dashboard** — removed. No KPI grids, no stats spam.
5. **⌘⇧E shortcut** — removed (no dev workspace).

### 28.2 What's Preserved

1. **All backend** — Core, APIs, events, persistence, SSE, tools, runtime, sandbox, agents, memory, knowledge, GraphRAG.
2. **ChatView + Composer** — the conversation rendering (already good).
3. **useEventStream** — SSE consumer (already good).
4. **CommandPalette + UniversalSearch** — already rebuilt.
5. **All 123 tests** — must continue passing.

### 28.3 Migration Steps

1. Write this spec (DONE)
2. Remove old components from render path (page.tsx already mounts Shell)
3. Delete old component files
4. Remove dev workspace shortcut + rail button
5. Clean up store (remove devWorkspaceOpen)
6. Verify all tests pass
7. Browser QA

---

## 29. BEFORE → AFTER

| Surface | Before | After |
|---|---|---|
| Shell | 56px rail + 44px topbar + tabs + sidebar | 48px rail + conversation fills viewport + summoned sidebar |
| Rail | 7-8 nav buttons | 4 buttons + logo |
| Top bar | Persistent with tabs + mode bar | REMOVED (no top bar by default) |
| Sidebar | Always visible (320px) | Summoned (340px, hidden by default) |
| Memory | Center tab (replaces conversation) | Sidebar view + inline citations |
| Knowledge | Center tab (filtered memory) | Sidebar view + inline entity links |
| Timeline | Center tab | Sidebar view |
| Tasks | MISSING | Inline TaskCard + BackgroundIndicator + sidebar view |
| Agent status | Floating dock | Inline Action Trace |
| Dev Workspace | Full-viewport IDE | REMOVED (not a product feature) |
| Dashboard | KPI grid | REMOVED (conversation empty state) |
| Mode bar | 8 mode buttons in topbar | Composer dropdown (contextual) |
