# MiMo — Product UI Master Spec

> **The final product UI specification. Not an implementation plan. Not a chat design.**
> This document defines MiMo Life OS as a complete product interface.
> Another engineer must be able to build the entire interface from this document alone.

---

## A. Product Definition

MiMo is a **Personal AI Operating System** — one environment that replaces the need to switch between multiple AI products.

The user opens MiMo and everything they need is already here: conversation, research, tasks, memory, knowledge, artifacts, search, commands, projects, and model selection — all integrated into one coherent system.

**MiMo is NOT a chat app.** Chat is the primary interaction surface, but the product is an operating system for the user's intellectual life.

**MiMo is NOT a dashboard.** There are no KPI cards, no analytics panels, no statistics grids.

**MiMo is NOT a developer tool.** No IDE, no terminal, no code editor, no Git panels.

---

## B. Product Principles

1. **Conversation is the primary control surface** — but NOT the entire product. Everything connects to and from conversation.
2. **Calm surface, deep capability** — default state is quiet. Power appears when needed.
3. **One coherent system** — no mini-apps, no separate pages, no context switching.
4. **Real data only** — no fake stats, no seed data, no placeholder content.
5. **Progressive disclosure** — simple by default, powerful when discovered.
6. **Keyboard-first** — ⌘K universal, single-key shortcuts, ≤2 modifiers.
7. **Arabic-first** — RTL native, IBM Plex Sans Arabic, line-height 1.75.
8. **Local-first** — no network in critical path, no counters, no deprecations.
9. **Action Trace, not chain-of-thought** — operational state, never internal reasoning.
10. **Task continuity** — goal + context + plan + execution + results stay connected (ZCode DNA).

---

## C. Information Architecture

```
MiMo Life OS
     │
     ├── CONVERSATION (primary surface, always visible)
     │     ├── Messages (user + AI)
     │     ├── Action Trace (inline, when working)
     │     ├── Task cards (inline, when task active)
     │     ├── Artifact cards (inline, when produced)
     │     ├── Memory references (inline, when recalled)
     │     ├── Knowledge links (inline, when referenced)
     │     ├── Approval cards (inline, when needed)
     │     ├── Error cards (inline, when failed)
     │     └── Research trace (inline, during research)
     │
     ├── CONTEXT (summoned, right panel)
     │     ├── Project (current project scope)
     │     ├── Knowledge (entities + relationships)
     │     ├── Memory (what MiMo knows)
     │     ├── Files (project-scoped)
     │     └── Timeline (activity history)
     │
     ├── COMMAND (overlays)
     │     ├── ⌘K Command Palette (actions + navigation)
     │     ├── ⌘/ Universal Search (content search)
     │     └── ⌘P Project Switcher
     │
     ├── EXECUTION (inline + background)
     │     ├── Tasks (lifecycle + plan + progress)
     │     ├── Research (sources + synthesis + citations)
     │     └── Agent activity (Action Trace)
     │
     ├── OUTPUT (inline + summoned)
     │     ├── Artifacts (documents, code, images, reports)
     │     └── Results (inline in conversation)
     │
     └── SYSTEM
       ├── Models (effort: Fast/Balanced/Deep)
       ├── Tools (web search, image gen, deep think)
       ├── Settings (theme, preferences)
       └── Account (profile)
```

### Visibility Rules

| Layer | Persistent | Summoned | Contextual (inline) |
|-------|-----------|----------|-------------------|
| Conversation | ✅ Always | — | — |
| Composer | ✅ Always | — | — |
| Rail | ✅ Minimal (40px) | — | — |
| Context panel | — | ✅ ⌘B / rail | — |
| Command palette | — | ✅ ⌘K | — |
| Search | — | ✅ ⌘/ | — |
| Tasks | — | — | ✅ When active |
| Artifacts | — | — | ✅ When produced |
| Memory refs | — | — | ✅ When recalled |
| Knowledge links | — | — | ✅ When referenced |
| Approvals | — | — | ✅ When needed |
| Errors | — | — | ✅ When failed |
| Research | — | — | ✅ During research |
| Background tasks | — | — | ✅ When minimized |
| Settings | — | ✅ S key | — |

---

## D. Navigation Architecture

### Rail (40px, persistent, left edge)
```
┌──┐
│M │  Logo → conversation
├──┤
│✦ │  ⌘K → command palette
├──┤
│🧠│  Memory → context panel Memory view
│🔗│  Knowledge → context panel Knowledge view
│📋│  Tasks → context panel Tasks view
│🕐│  Timeline → context panel Timeline view
├──┤
│👤│  Account → popover (theme, settings)
└──┘
```

- Width: 40px (minimal but visible — NOT hidden)
- Icons: 24×24px
- Active: accent-soft background
- Hover: raised background
- The rail is always visible. It communicates "there are things here" without dominating.

### Why not hidden rail?
Hidden rail = undiscoverable. A new user has no idea what MiMo can do. The rail must be visible but minimal.

### Why not full sidebar?
Full sidebar = steals horizontal space from conversation. The conversation must own the viewport.

### Context Panel (340px, summoned right)
- Triggered by rail icons (Memory/Knowledge/Tasks/Timeline) or ⌘B
- Slides in from right as overlay with subtle backdrop
- Content swaps based on active view
- Closeable via X button, Esc, or clicking backdrop

---

## E. Shell Architecture

```
┌────┬───────────────────────────────────────────────────┐
│    │                                                   │
│ M  │                                                   │
│    │              CONVERSATION                          │
│ ⌘K │         (820px max, centered)                     │
│    │                                                   │
│ 🧠 │    messages / tasks / artifacts / memory          │
│    │    citations / approvals / errors / research     │
│ 🔗 │                                                   │
│    │                                                   │
│ 📋 │                                                   │
│    │                                                   │
│ 🕐 ├───────────────────────────────────────────────────┤
│    │  Action Trace (if working, 820px max)            │
│    ├───────────────────────────────────────────────────┤
│    │  Background indicator (if any, 820px max)        │
│    ├───────────────────────────────────────────────────┤
│ 👤 │  Composer (820px max, bottom bar)               │
│    │  [mode ▾] [effort ▾] [✦] [➤]                   │
└────┴───────────────────────────────────────────────────┘
  Context Panel (340px) — summoned overlay right
```

### Dimensions
- Rail: 40px (persistent)
- Conversation: 820px max centered, full height
- Composer: 820px max centered, bottom bar
- Context panel: 340px, summoned overlay
- No top bar. No persistent tabs. No dashboard.

### Responsive
| Width | Shell |
|-------|-------|
| >960px | Rail + conversation + summoned panel |
| 640-960px | Rail + conversation (panel = full overlay) |
| <640px | Bottom bar + conversation (panel = full screen) |

---

## F. Conversation Architecture

### Message Types (inline)
1. **User** — raised bg, right-aligned, 68% max-width, no avatar
2. **AI** — transparent, left-aligned, full content width, no avatar, actions on hover
3. **Action Trace** — inline above composer, verb+object+pulsing dot, expandable
4. **Task card** — inline when task active, lifecycle+plan+progress+mode
5. **Artifact card** — inline when produced, preview+expand+actions
6. **Memory reference** — inline when recalled, expandable with provenance
7. **Knowledge link** — inline when referenced, expandable with relationships
8. **Approval card** — inline when needed, what/why/approve/reject
9. **Error card** — inline when failed, what/why/retry/fix/details
10. **Research trace** — inline during research, sources/synthesis/citations
11. **Background indicator** — below conversation when task minimized

### Empty State
```
┌──────────────────────────────────────────┐
│                                          │
│              ┌────┐                      │
│              │ M  │                      │
│              └────┘                      │
│            مرحباً                         │
│   أنا MiMo — نظامك الشخصي.               │
│   اسألني، كلّفني مهمة، أو اطلب بحثاً.    │
│                                          │
│   [حلل خطة] [ابحث] [اكتب] [خطط]          │
│                                          │
│   ── ماذا يعرف MiMo ──                   │
│   ذكريات: 12  ·  مهارات: 5  ·  أهداف: 3 │
│                                          │
│   ── محادثات أخيرة ──                    │
│   · بحث عن JWT       قبل يومين           │
│   · خطة المشروع      أمس                 │
│                                          │
│   ── مهام نشطة ──                        │
│   ◐ تحليل البيانات   2/5 خطوات          │
│                                          │
├──────────────────────────────────────────┤
│  Composer                                │
└──────────────────────────────────────────┘
```

NOT empty. Shows capabilities, recent work, active tasks. Calm but alive.

---

## G. Composer Architecture

### Default
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
Enter للإرسال · ⌘K للأوامر · ⌘/ للبحث
```

### Expanded (tools revealed)
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│ [محادثة ▾] [متوازن ▾] [✦]                │
│ [🧠] [🌐] [🖼️] [🎤]    [➤]              │
└──────────────────────────────────────────┘
```

### Slash commands (when `/` typed at start)
```
┌──────────────────────────────────────────┐
│ /                                        │
│ ┌──────────────────┐                      │
│ │ /plan    خطّة     │                      │
│ │ /research بحث     │                      │
│ │ /task    مهمة     │                      │
│ │ /clear   مسح     │                      │
│ └──────────────────┘                      │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
```

### Controls
- **Mode**: محادثة / بحث / كود / كتابة
- **Effort**: سريع / متوازن / عميق (Z.ai per-turn knob)
- **Tools** (✦ toggle): deep think, web search, image gen, voice
- **Send/Stop**: accent when text present, error-color when working

### Design
- Bottom bar with subtle top border
- 820px max-width centered
- Border on focus (not shadow)
- Arabic-first

---

## H. Task Architecture

### Lifecycle
```
pending → planning → [approval] → executing → validating → done
                     ↕ paused                               ↘ error
                                                            ↘ cancelled
```

### Execution Modes (ZCode DNA)
- **Plan**: propose plan first, wait for approval before execution
- **Auto**: execute within permissions, ask only when needed
- **Goal**: work toward verifiable objective until complete or failed

### Task Card (inline, collapsed)
```
● ينفذ — تحليل خطة الدراسة
الخطوة 2 من 5 · [هدف] ▾
```

### Task Card (expanded)
```
✦ تحليل خطة الدراسة
الهدف: تحليل الجدول الدراسي واقتراح تحسينات
الحالة: ينفذ · الخطوة 2 من 5

وضع التنفيذ: [خطّة] [تلقائي] [هدف]

الخطوات:
  ✓ جمع المعلومات (4 ملفات)
  ✓ تحليل الجدول
  → بناء الخطة
  ○ مراجعة التعارضات
  ○ التحقق

الأدوات: web_search · memory_recall

[إيقاف مؤقت] [إلغاء] [تصغير]
```

### Background Task
```
◐ مهمة في الخلفية — تحليل خطة الدراسة
الخطوة 2 من 5 · [فتح]
```

### Task Detail Panel (summoned)
Full view: goal, status, progress, steps, tools, artifacts, timeline, checkpoints, recovery.

---

## I. Agent Execution Architecture

### Action Trace (NOT chain-of-thought)

**Level 1** (default — single line):
```
◐ ينفذ — يستدعى أداة البحث
```

**Level 2** (expanded — action trace):
```
◐ ينفذ — تحليل خطة الدراسة
─────────────────────────
✓ حلل السياق — الذاكرة والمعرفة
✓ بنى الخطة — 5 خطوات
→ يبحث عن أفضل ممارسات الدراسة
✓ اكتمل
```

**Level 3** (click action → details):
```
يبحث عن أفضل ممارسات الدراسة
  المصادر: 8 نتائج ويب
  الأداة: web_search
  المدة: 3.2 ثانية
```

### Never
- Chain-of-thought
- Internal reasoning
- Fake "thinking..."
- Spinner

---

## J. Project Architecture

### Project = Living Context
A project is NOT a folder. It's a context that scopes:
- Conversations (project-scoped)
- Memory (project-scoped)
- Knowledge (project-scoped)
- Files (project-scoped)
- Tasks (project-scoped)
- Artifacts (project-scoped)

### Project Entry
- Via ⌘P (command palette → project switcher)
- Project chip appears in composer when active
- Context panel shows project context

### Project Switcher
```
┌──────────────────────────────────┐
│ تبديل المشروع                      │
│                                    │
│ ● مشروع التخرج                     │
│   مهام: 3  ·  ذكريات: 12          │
│                                    │
│ ○ تعلم Python                      │
│   مهام: 1  ·  ذكريات: 5           │
│                                    │
│ ○ بدون مشروع                       │
│                                    │
│ [+ مشروع جديد]                    │
└──────────────────────────────────┘
```

### Backend
- Project Prisma model exists (id, name, description, accent, mimoMdPath)
- **MISSING**: `/api/projects` CRUD API
- ProjectSetting model exists for per-project configuration

---

## K. Memory Architecture

### Three Levels

**Level 1 — Inline Contextual Reference** (in AI messages)
```
... استنادًا إلى ما تعرفه عنك…
┌─────────────────────────────────────────┐
│ 🧠 ذاكرة                                 │
│ "يفضّل العمل ليلاً"                        │
│ المصدر: محادثة 2024-08-15                 │
│ الثقة: 85%  · نوع: تفضيل                  │
│ [تعديل]  [حذف]  [إخفاء]                  │
└─────────────────────────────────────────┘
```

**Level 2 — Memory Detail** (expand from inline)
Shows: content, source, date, confidence, related entities, edit/delete.

**Level 3 — Memory Explorer** (context panel)
Browse all memories. Filter by type. Search. Edit. Delete. Provenance.

### Backend
- MemoryEngine + MemoryRepository + MemoryIntelligence (all exist)
- Memory model: type, content, scope, source, confidence, metadata, deletedAt
- `/api/mimo/workspace` returns memory data (read-only)
- **MISSING**: `/api/memory` CRUD (PATCH update, DELETE soft-delete)
- MemoryRepository already has `updateMemory` and `deleteMemory` functions

---

## L. Knowledge Architecture

### Three Levels

**Level 1 — Inline Entity Link** (in AI messages)
```
... جامعة خضوري
┌─────────────────────────────────────────┐
│ 🔗 كيان معرفة                            │
│ جامعة خضوري                              │
│ النوع: مؤسسة  · الثقة: 90%              │
│ العلاقات:                               │
│  · تدرس فيه — محمد                      │
│  · يقع في — خضوري                       │
│ الأدلة: 3 مصادر                         │
└─────────────────────────────────────────┘
```

**Level 2 — Entity Detail** (expand from inline)
Shows: name, type, description, relationships (list), evidence, sources, confidence.

**Level 3 — Knowledge Explorer** (context panel)
Browse entities by type. Expand relationships. See evidence.

### Backend
- KnowledgeGraph + KnowledgeRepository (exist)
- KnowledgeEntity + KnowledgeRelationship Prisma models (exist)
- `/api/knowledge/graph` API (exists, returns full graph + path + subgraph)
- GraphRagEngine wired into ContextBuilder (runs on every chat)

---

## M. Research Architecture

### Research as Workflow
```
Question
→ clarification if needed
→ search (web_search tool)
→ sources discovered
→ evidence evaluated
→ synthesis
→ cited answer [1] [2] [3]
→ saved as research artifact
```

### Inline Display
```
📚 بحث — أفضل ممارسات JWT
─────────────────────────
✓ بحث في 8 مصادر
✓ قيّم المصداقية
✓ استخلص النقاط الرئيسية
→ يركّب الإجابة

[عرض المصادر] [حفظ كبحث]
```

### Citations
Inline `[1]`, `[2]` → expandable to source URL + snippet.

### Backend
- WebSearchTool exists (calls SearchProvider → ZAI SDK)
- ResearchAgent exists (calls WebSearchTool)
- `/api/search` exists (web search)
- Research is triggered by mode=research in chat request

---

## N. Artifact Architecture

### Inline Artifact Card
```
┌─────────────────────────────────────────┐
│ 📄 تقرير تحليل البيانات                   │
│ نوع: تقرير · 4 صفحات                    │
│ [معاينة]  [نسخ]  [تصدير]  [حفظ]         │
└─────────────────────────────────────────┘
```

### Expanded (preview)
- Code: syntax highlighted
- Document: rendered markdown
- Image: displayed
- Table: formatted

### Artifact Viewer (summoned)
Full-screen focused view with edit/revise/version/export.

### Backend
- Artifact Prisma model exists (type, title, content, provenance, version, parentId)
- **MISSING**: `/api/artifacts` CRUD API

---

## O. Search Architecture

### Universal Search (⌘/)
```
┌──────────────────────────────────────────┐
│ 🔍 ابحث في كل شيء…                        │
└──────────────────────────────────────────┘

المحادثات
· محادثة عن JWT                    قبل يومين

الذكريات
· يفضّل العمل ليلاً                85% ثقة

المعرفة
· React — تقنية                    90% ثقة

المهام
· تحليل خطة الدراسة                ينفذ

النتائج
· تقرير تحليل البيانات             تقرير
```

### Sources (searched)
- Conversations (`/api/conversations`)
- Messages (within conversations)
- Memories (`/api/mimo/workspace?q=`)
- Knowledge (`/api/knowledge/graph`)
- Tasks (`/api/tasks`)
- Artifacts (`/api/artifacts` — MISSING API)
- Files (File model — MISSING API)

### Backend
- HybridSearch exists (FTS + vector + graph)
- `/api/search` exists (web search only)
- `/api/mimo/workspace?q=` exists (memory + knowledge search)
- **MISSING**: Unified search across tasks + artifacts + files

---

## P. Command Architecture

### Command Palette (⌘K)
```
┌──────────────────────────────────────────┐
│ ⌘ اكتب أمراً أو ابحث…                      │
└──────────────────────────────────────────┘

الإجراءات
· محادثة جديدة                     C
· إنشاء مهمة
· بدء بحث
· إنشاء مستند

التنقّل
· الذاكرة                          M
· المعرفة
· المهام
· الوقائع
· الإعدادات                        S

السياق
· تبديل المشروع                    ⌘P
· تغيير الجهد
```

### Prefix Grammar (future)
- `>` — actions
- `@` — entities (memory, knowledge, project)
- `/` — slash commands
- `#` — tags

### Backend
- No API needed — command palette uses existing APIs + store actions

---

## Q. Timeline Architecture

### Human-Readable Activity
```
اليوم
10:32 — بدأت بحثًا عن JWT
10:41 — أنشأت تقريرًا
11:02 — حدّثت خطة الجامعة

أمس
14:15 — أكملت مهمة تحليل البيانات
16:30 — حفظت ذاكرة جديدة
```

### Implementation
- Query `/api/events` (EventLog)
- Map event types to human-readable labels
- Merge with `/api/tasks` (task lifecycle events)
- Filter by type (conversation/task/memory/knowledge/artifact/error)
- NOT raw event log — translated activity

### Backend
- EventLog model exists (type, source, payload, correlationId, timestamp)
- `/api/events` API exists (query with since/limit)
- `/api/events/stream` SSE exists
- 27 event types defined in EVENT constants

---

## R. Background Work

### Background Task Indicator
```
┌─────────────────────────────────────────┐
│ ◐ مهمة في الخلفية — تحليل خطة الدراسة   │
│ الخطوة 2 من 5 · [فتح]                    │
└─────────────────────────────────────────┘
```

- Appears below conversation, above composer
- User continues chatting while task runs
- Click [فتح] → expand task list
- Calm, not notification spam

### Backend
- Task model supports background execution (status: executing while user continues)
- AgentLifecycle + CheckpointManager support pause/resume/recovery
- SSE events stream task progress in real-time

---

## S. Approval System

### Levels
| Level | Behavior | Example |
|-------|----------|---------|
| Informational | No approval | Memory cited |
| Reversible | Automatic | Memory stored |
| Important | Ask before | File modifications |
| Irreversible | Always require | Delete project |

### Inline Approval Card
```
┌─────────────────────────────────────────┐
│ ⚠ موافقة مطلوبة                          │
│ MiMo يريد تعديل 6 ملفات في مشروع "تطوير" │
│                                          │
│ ماذا سيحدث: تعديل ملفات المصادقة          │
│ المخاطر: تعديل قابل للتراجع              │
│                                          │
│ [مراجعة] [موافقة] [رفض]                  │
└─────────────────────────────────────────┘
```

### Backend
- ToolPolicyEngine exists (riskLevel, requiresConfirmation, timeoutMs)
- ToolPolicyEngine is wired into toolRegistry.invoke (all tool calls go through it)
- **MISSING**: UI to surface `requiresConfirmation` from ToolPolicyEngine

---

## T. Error/Recovery System

### Inline Error Card
```
┌─────────────────────────────────────────┐
│ ⚠ تعذر إكمال المهمة                      │
│                                          │
│ حدث خطأ أثناء تنفيذ الخطوة 4.            │
│                                          │
│ MiMo يستطيع:                             │
│ [إعادة المحاولة] [طريقة أخرى] [التفاصيل]   │
└─────────────────────────────────────────┘
```

- Never raw stack traces
- Always actionable (retry, fix, details)
- Calm, not alarming

### Backend
- Validator.ts handles error classification
- EVENT.ERROR_OCCURRED is emitted on errors
- Orchestrator catches step failures and synthesizes failed runs

---

## U. Model/Tool Architecture

### Effort Selector (Z.ai DNA)
| Level | Label | Maps to | Use case |
|-------|-------|---------|----------|
| Fast | سريع | FAST profile | Quick answers |
| Balanced | متوازن | BALANCED profile | Default |
| Deep | عميق | DEEP profile | Complex planning, research |

- Per-turn knob (not permanent mode)
- Inspired by Z.ai's toggleable thinking

### Model Selection
- Default: "Auto" (ModelRouter selects)
- Advanced: accessible via command palette or composer dropdown
- NEVER 15 model buttons

### Tool Selection
- Web search (toggle in composer tools)
- Deep think (toggle in composer tools)
- Image generation (button in composer tools)
- Voice (button in composer tools)
- Tools are progressive disclosure — hidden behind ✦ toggle

### Backend
- ModelRouter exists (5 profiles: FAST/BALANCED/DEEP/LOCAL/VISION)
- executeWithFallback exists (primary + fallback model)
- LocalModelProvider exists (Ollama detection)
- WriterAgent uses executeWithFallback (wired)

---

## V. Screen Specifications

### 1. Home / First Launch
```
┌────┬──────────────────────────────────────────┐
│    │                                          │
│ M  │              ┌────┐                      │
│    │              │ M  │                      │
│ ⌘K │              └────┘                      │
│    │            مرحباً                         │
│ 🧠 │   أنا MiMo — نظامك الشخصي.               │
│    │   اسألني، كلّفني مهمة، أو اطلب بحثاً.    │
│ 🔗 │                                          │
│    │   [حلل خطة] [ابحث] [اكتب] [خطط]          │
│ 📋 │                                          │
│    │   ── ماذا يعرف MiMo ──                   │
│ 🕐 │   ذكريات: 12  ·  مهارات: 5  ·  أهداف: 3 │
│    │                                          │
│ 👤 │   ── محادثات أخيرة ──                    │
│    │   · بحث عن JWT       قبل يومين           │
│    │   · خطة المشروع      أمس                 │
│    │                                          │
│    │   ── مهام نشطة ──                        │
│    │   ◐ تحليل البيانات   2/5 خطوات          │
│    │                                          │
│    ├──────────────────────────────────────────┤
│    │  Composer (820px max)                   │
│    │  [mode ▾] [effort ▾]    [✦] [➤]         │
│    └──────────────────────────────────────────┘
```

- **Data**: `/api/mimo/workspace` (stats, memory), `/api/conversations` (recent), `/api/tasks` (active)
- **Keyboard**: Enter → send, ⌘K → commands, ⌘/ → search
- **Mobile**: Rail → bottom bar, full width, stacked sections

### 2. Normal Conversation
```
┌────┬──────────────────────────────────────────┐
│    │  ┌──────────────┐                        │
│ M  │  │ مرحبا        │ (user, right)          │
│    │  └──────────────┘                        │
│ ⌘K │  أنا MiMo — نظام التشغيل الذكي...       │
│    │  (AI, left, document-style)             │
│ 🧠 │                                          │
│ 🔗 │  [hover: copy]                          │
│ 📋 │                                          │
│ 🕐 ├──────────────────────────────────────────┤
│ 👤 │  Composer (enabled)                     │
└────┴──────────────────────────────────────────┘
```

### 3. Active Task
```
┌────┬──────────────────────────────────────────┐
│    │  ┌──────────────┐                        │
│ M  │  │ حلل خطة الدراسة│ (user)               │
│    │  └──────────────┘                        │
│ ⌘K │  سأحلل خطة دراستك...                    │
│    │                                          │
│ 🧠 │  ┌──────────────────────────────────┐   │
│ 🔗 │  │ ● ينفذ — تحليل خطة الدراسة        │   │
│ 📋 │  │ الخطوة 2 من 5 · [هدف]            │   │
│ 🕐 │  │ ✓ جمع المعلومات                  │   │
│    │  │ → بناء الخطة                      │   │
│ 👤 │  │ [إيقاف] [تصغير]                  │   │
│    │  └──────────────────────────────────┘   │
│    ├──────────────────────────────────────────┤
│    │  ◐ ينفذ — يستدعى أداة البحث              │
│    ├──────────────────────────────────────────┤
│    │  Composer (enabled for follow-up)        │
└────┴──────────────────────────────────────────┘
```

### 4. Research
```
┌────┬──────────────────────────────────────────┐
│    │  ┌──────────────┐                        │
│ M  │  │ ابحث عن JWT  │ (user)                │
│    │  └──────────────┘                        │
│ ⌘K │  📚 بحث — أفضل ممارسات JWT               │
│    │  ✓ بحث في 8 مصادر                       │
│ 🧠 │  ✓ قيّم المصداقية                        │
│ 🔗 │  → يركّب الإجابة                         │
│ 📋 │  [عرض المصادر] [حفظ كبحث]               │
│ 🕐 │                                          │
│ 👤 ├──────────────────────────────────────────┤
│    │  Composer (enabled)                     │
└────┴──────────────────────────────────────────┘
```

### 5. Artifact
```
┌────┬──────────────────────────────────────────┐
│    │  ┌──────────────────────────────────┐   │
│ M  │  │ 📄 تقرير تحليل البيانات            │   │
│    │  │ نوع: تقرير · 4 صفحات              │   │
│ ⌘K │  │ [معاينة] [نسخ] [تصدير] [حفظ]      │   │
│    │  └──────────────────────────────────┘   │
│ 🧠 │                                          │
│ 🔗 ├──────────────────────────────────────────┤
│ 📋 │  Composer (enabled)                     │
│ 🕐 │                                          │
│ 👤 │                                          │
└────┴──────────────────────────────────────────┘
```

### 6. Approval
```
┌────┬──────────────────────────────────────────┐
│    │  ┌──────────────────────────────────┐   │
│ M  │  │ ⚠ موافقة مطلوبة                   │   │
│    │  │ MiMo يريد تعديل 6 ملفات          │   │
│ ⌘K │  │ [مراجعة] [موافقة] [رفض]          │   │
│    │  └──────────────────────────────────┘   │
│ 🧠 ├──────────────────────────────────────────┤
│ 🔗 │  Composer (disabled until resolved)     │
│ 📋 │                                          │
│ 🕐 │                                          │
│ 👤 │                                          │
└────┴──────────────────────────────────────────┘
```

### 7. Error
```
┌────┬──────────────────────────────────────────┐
│    │  ┌──────────────────────────────────┐   │
│ M  │  │ ⚠ تعذر إكمال المهمة               │   │
│    │  │ حدث خطأ في الخطوة 4.              │   │
│ ⌘K │  │ [إعادة المحاولة] [طريقة أخرى]     │   │
│    │  │ [التفاصيل]                        │   │
│ 🧠 │  └──────────────────────────────────┘   │
│ 🔗 ├──────────────────────────────────────────┤
│ 📋 │  Composer (enabled)                     │
│ 🕐 │                                          │
│ 👤 │                                          │
└────┴──────────────────────────────────────────┘
```

### 8. Command Palette
```
                    ┌──────────────────────────────────┐
                    │ ⌘ اكتب أمراً أو ابحث…              │
                    └──────────────────────────────────┘

                    الإجراءات
                    · محادثة جديدة              C
                    · إنشاء مهمة
                    · بدء بحث

                    التنقّل
                    · الذاكرة                   M
                    · المعرفة
                    · المهام
                    · الوقائع
                    · الإعدادات                 S
```

### 9. Universal Search
```
                    ┌──────────────────────────────────┐
                    │ 🔍 ابحث في كل شيء…                 │
                    └──────────────────────────────────┘

                    المحادثات
                    · محادثة عن JWT           قبل يومين

                    الذكريات
                    · يفضّل العمل ليلاً        85% ثقة

                    المعرفة
                    · React — تقنية            90% ثقة
```

### 10. Memory Explorer (context panel)
```
┌────────────────────────────────┐
│ [السياق] [الذاكرة] [المعرفة] [المهام] [الوقائع] │
├────────────────────────────────┤
│ 🔍 ابحث في الذاكرة…              │
│ [الكل] [حقائق] [أهداف] [مهارات]  │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🧠 fact · 85%            │   │
│ │ "يفضّل العمل ليلاً"        │   │
│ │ المصدر: محادثة 2024-08-15 │   │
│ │ [تعديل] [حذف]            │   │
│ └──────────────────────────┘   │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🎯 goal · 90%            │   │
│ │ "إكمال مشروع التخرج"     │   │
│ │ المصدر: مستخدم            │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

### 11. Knowledge Explorer (context panel)
```
┌────────────────────────────────┐
│ [السياق] [الذاكرة] [المعرفة] [المهام] [الوقائع] │
├────────────────────────────────┤
│ 🔍 ابحث في المعرفة…              │
│ [الكل] [أشخاص] [مشاريع] [مفاهيم]  │
│                                │
│ ┌──────────────────────────┐   │
│ │ 🔗 تقنية · 90%            │   │
│ │ React                    │   │
│ │ العلاقات:                │   │
│ │  · يعتمد على TypeScript  │   │
│ │  · مستخدم في 3 مشاريع    │   │
│ │ الأدلة: 5 مصادر           │   │
│ └──────────────────────────┘   │
└────────────────────────────────┘
```

### 12. Mobile
```
┌──────────────────────────┐
│                          │
│    Conversation          │
│    (full width)          │
│                          │
├──────────────────────────┤
│  Composer (full width)   │
├──────────────────────────┤
│ [M] [✦] [🧠] [🔗] [📋] [🕐] [👤] │  (bottom bar)
└──────────────────────────┘
```

---

## W. State Specifications

### Conversation States
| State | What changes |
|-------|-------------|
| Empty | Greeting + suggestions + recent work + active tasks + stats |
| User typing | Composer active, send enabled |
| AI streaming | Typing indicator → streaming content with cursor |
| AI working | Action Trace appears above composer |
| Task active | Task card appears inline |
| Task background | Background indicator appears |
| Approval needed | Approval card appears, composer disabled |
| Error | Error card appears, composer enabled |
| Research | Research trace appears inline |
| Artifact produced | Artifact card appears inline |

### Context Panel States
| State | What shows |
|-------|-----------|
| Context (default) | AI state + stats + recent activity |
| Memory | All memories, filter, edit, delete |
| Knowledge | All entities, filter, expand relationships |
| Tasks | All tasks (active + history) |
| Timeline | Human-readable activity history |

---

## X. Transition Specifications

| From | To | How | Context preserved |
|------|-----|-----|------------------|
| Conversation | Task | Task card appears inline | Conversation stays visible |
| Conversation | Research | Mode=research, research trace appears | Conversation stays visible |
| Conversation | Memory | Inline memory reference → expand | Conversation stays visible |
| Conversation | Knowledge | Inline entity link → expand | Conversation stays visible |
| Conversation | Artifact | Inline artifact card → expand | Conversation stays visible |
| Conversation | Project | ⌘P → project switcher | Conversation scoped to project |
| Task | Artifact | Task card shows artifact produced | Task card stays in conversation |
| Task | Timeline | Context panel → Timeline | Task events visible in timeline |
| Research | Knowledge | Research creates knowledge entries | Knowledge linkable from research |
| Research | Memory | Research may create memories | Memory linkable from research |
| Artifact | Conversation | Close artifact viewer | Return to conversation |
| Search | Any | Click search result | Opens in conversation/context |
| Command | Any | Execute command | Navigates or acts |

**Key principle**: Every transition preserves context. The user never loses their conversation thread.

---

## Y. Responsive Architecture

### Desktop (>960px)
- Rail: 40px persistent left
- Conversation: 820px max centered
- Composer: 820px max centered
- Context panel: 340px summoned overlay

### Tablet (640-960px)
- Rail: 40px persistent
- Conversation: full width with 32px padding
- Composer: full width
- Context panel: full-screen overlay

### Mobile (<640px)
- Rail: bottom bar (44px, horizontal, 7 icons)
- Conversation: full width with 16px padding
- Composer: full width
- Context panel: full-screen overlay
- Command palette: full-screen overlay
- All inline elements: full width

---

## Z. Accessibility

- **Keyboard**: all actions ≤2 modifiers. Tab navigates, Enter/Space activates, Esc closes.
- **Focus**: visible accent outline (2px, offset 2px)
- **ARIA**: semantic HTML (nav, main, aside, button), aria-label on icon buttons, aria-live for AI state
- **Contrast**: text on bg ≥ 4.5:1 (stone palette + teal accent achieves this)
- **RTL**: direction: rtl, code blocks LTR, logical CSS properties
- **Reduced motion**: @media (prefers-reduced-motion: reduce) — all animations instant
- **Touch targets**: minimum 44px on mobile
- **Screen readers**: sr-only text for icon-only buttons

---

## AA. Visual System

### Color
- Background: warm-neutral (#fafaf9 light / #0c0a09 dark)
- Atmospheric: subtle radial gradient in dark mode (eliminates void)
- Surface: slightly raised (#ffffff / #161311)
- Text: stone-900/stone-50 (primary), stone-600/stone-400 (secondary), stone-400/stone-600 (muted)
- Accent: deep teal (#0d9488 light / #2dd4bf dark) — ONE accent, no decorative gradients
- AI states: thinking (teal), retrieving (cyan), executing (orange), success (green), warning (amber), error (red)

### Typography
- IBM Plex Sans Arabic (Arabic), system sans (English), JetBrains Mono (code)
- Scale: 22/18/15/14/13/12/11/10px
- Weights: 400/500/600
- Arabic line-height: 1.75

### Spacing
4px grid: 4/8/12/16/20/24/32/40/48/64

### Motion
0/120/200/300/400ms tiers. Asymmetric (enter 0ms, exit 150ms). Reduced motion: all instant.

### Borders
1px hairline. Prefer tonal separation. Borders only for structural separation.

### Shadows
Reserved for floating layers (popovers, overlays, modals). 90% of UI uses tonal separation.

---

## AB. Component Map

| Component | Responsibility | Data Source | Status |
|-----------|---------------|-------------|--------|
| Shell.tsx | Root layout: rail + conversation + summoned panel | Store | REBUILD |
| Rail.tsx | Minimal persistent navigation (40px, 7 icons) | Store | REBUILD |
| Conversation.tsx | Wraps ChatView | N/A | REUSE |
| ChatView.tsx | Message list + empty state + composer | `/api/conversations` + `/api/mimo/workspace` + `/api/tasks` | REBUILD |
| Composer.tsx | Primary control surface (mode, effort, tools, send) | Store + `/api/chat` | REBUILD |
| MessageItem.tsx | AI/user message rendering + inline elements | Messages from store | REBUILD |
| AgentStatus.tsx | Action Trace (3 levels) | SSE via `useEventStream` | REUSE + EXTEND |
| TaskCard.tsx | Inline task lifecycle card | `/api/tasks` via `useTasks` | REUSE + EXTEND |
| BackgroundTaskIndicator.tsx | Minimized tasks | `/api/tasks` | REUSE |
| Sidebar.tsx | Context panel (5 views) | Multiple hooks | REBUILD |
| CommandPalette.tsx | ⌘K command layer | Store + APIs | REBUILD |
| UniversalSearch.tsx | ⌘/ universal search | Multiple APIs | REBUILD |
| Markdown.tsx | Markdown renderer | N/A | REUSE |
| SettingsModal.tsx | Settings | Store | REUSE |
| VoiceMode.tsx | Voice input | N/A | REUSE |
| ImageGenModal.tsx | Image generation | `/api/image` | REUSE |
| Toasts.tsx | Notifications | Store | REUSE |
| icons.tsx | Icon set | N/A | REUSE |
| MemoryCitation.tsx | Inline memory reference | Memory from context | CREATE |
| KnowledgeLink.tsx | Inline entity reference | Entity from context | CREATE |
| ArtifactCard.tsx | Inline artifact preview | `/api/artifacts` (NEW) | CREATE |
| ApprovalCard.tsx | Inline approval request | ToolPolicyEngine | CREATE |
| ErrorCard.tsx | Inline error with recovery | Pipeline errors | CREATE |
| ResearchTrace.tsx | Inline research progress | SSE events | CREATE |

---

## AC. Backend Integration Map

| UI Feature | Hook | API | Backend Service | DB Model |
|-----------|------|-----|----------------|----------|
| Chat | useChat | `/api/chat` | WorkflowEngine + ModelRouter | Message |
| Conversations | useLoadConversations | `/api/conversations` | Prisma | Conversation, Message |
| Memory (read) | useWorkspace | `/api/mimo/workspace` | MemoryEngine | Memory |
| Memory (edit/delete) | NEW | `/api/memory` (NEW) | MemoryRepository | Memory |
| Knowledge | useWorkspace | `/api/knowledge/graph` | KnowledgeGraph | KnowledgeEntity, KnowledgeRelationship |
| Tasks | useTasks | `/api/tasks` | AgentLifecycle | Task |
| Events (real-time) | useEventStream | `/api/events/stream` (SSE) | EventBus + EventLog | EventLog |
| Search (web) | N/A | `/api/search` | SearchProvider | — |
| Search (content) | useWorkspaceSearch | `/api/mimo/workspace?q=` | HybridSearch | Memory, KnowledgeEntity |
| Artifacts | NEW | `/api/artifacts` (NEW) | N/A | Artifact |
| Image gen | N/A | `/api/image` | ImageCapability | — |
| Agent recovery | N/A | `/api/agents/recover` | CheckpointManager | Task, EventLog |
| Backup | N/A | `/api/backup` | BackupEngine | — |
| Projects | NEW | `/api/projects` (NEW) | N/A | Project |

### Missing APIs (3)
1. `/api/artifacts` — CRUD for Artifact model (model exists, no API)
2. `/api/memory` — PATCH/DELETE for Memory model (model + repository exist, no API)
3. `/api/projects` — CRUD for Project model (model exists, no API)

All reuse existing Prisma models. No schema changes.

---

## AD. Acceptance Criteria

1. ✅ Can a new user understand MiMo within 10 seconds? — Empty state shows capabilities + recent work + active tasks
2. ✅ Can the user start a normal conversation immediately? — Composer is visible
3. ✅ Can the user start research without changing applications? — Mode selector in composer
4. ✅ Can MiMo execute a long-running task? — Task API + TaskCard + lifecycle + background
5. ✅ Can the user see what MiMo is doing? — Action Trace (SSE events)
6. ✅ Can the user approve risky actions? — ApprovalCard (ToolPolicyEngine)
7. ✅ Can the user inspect memories? — Memory sidebar + inline citations + CRUD API
8. ✅ Can the user explore knowledge? — Knowledge sidebar + inline links + graph API
9. ✅ Can the user find old conversations? — Universal search + conversations API
10. ✅ Can the user find files? — File model (API to add if needed)
11. ✅ Can the user retrieve artifacts? — Artifact API + inline cards + sidebar
12. ✅ Can the user resume a task? — Task API + BackgroundTaskIndicator + recovery
13. ✅ Can the user run commands? — ⌘K command palette
14. ✅ Can the user change model/reasoning? — Effort selector in composer
15. ✅ Can the user manage background tasks? — BackgroundTaskIndicator
16. ✅ Can the user understand errors and recover? — ErrorCard with retry/fix/details
17. ✅ Can the user use it comfortably in Arabic RTL? — IBM Plex Sans Arabic, RTL layout
18. ✅ Can it work on mobile? — Responsive breakpoints + bottom bar
19. ✅ Does it remain calm instead of becoming a dashboard? — Progressive disclosure, summoned surfaces
20. ✅ Does it genuinely reduce the need to switch between multiple AI tools? — Conversation + research + tasks + artifacts + memory + knowledge + search + commands in ONE interface

### Product Replacement Test

| Product | What MiMo replaces | What MiMo cannot replace (yet) | Missing capability |
|---------|-------------------|------------------------------|-------------------|
| ChatGPT | General chat, memory, model selection | Canvas (collaborative editing) | Inline collaborative editing |
| Z.ai | Effort control, streaming, search | Consumer UI layout (not observed) | — |
| ZCode | Task continuity, execution modes, long-running | IDE features (code editor, Git) | Not needed (MiMo is Life OS) |
| Claude | Artifacts, persistent memory, context compaction | Cowork (multi-agent sessions) | Multi-agent UI (future) |
| Gemini | Multimodal, context integration | Deep Research live thoughts | Multimodal input (future) |
| Perplexity | Research, citations, search | Pro Search clarifying questions | Clarifying questions (future) |
| NotebookLM | Source grounding, per-claim citations | Audio overview, mind map | Audio/mind map (future) |
| Manus | Action Trace, approvals, live runtime | Cloud computer, browser operator | Not needed (Life OS) |
| Cursor | Plan→execute→verify | Code editor, inline diffs | Not needed (Life OS) |
