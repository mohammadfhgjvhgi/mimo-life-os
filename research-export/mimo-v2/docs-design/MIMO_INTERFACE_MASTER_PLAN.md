# MiMo — Interface Master Plan

> **The concrete interface plan. Every surface defined with dimensions, behavior, states, data, and actions.**
> Built on: Z.ai interaction DNA + ZCode execution DNA + secondary product patterns.

---

## 1. Shell

### Purpose
The shell is the root container. Conversation fills it. Everything else is summoned.

### Layout
```
┌──────┬──────────────────────────────────────────────┐
│      │                                              │
│ Rail │           Conversation                       │
│ 48px │           (flex 1, 760px max centered)       │
│      │                                              │
│ [M]  │           [inline elements]                 │
│ [⌘K] │                                              │
│ [🧠] │                                              │
│ [🔗] │                                              │
│ [👤] │                                              │
│      ├──────────────────────────────────────────────┤
│      │  Action Trace (if working, 760px max)        │
│      ├──────────────────────────────────────────────┤
│      │  Background indicator (if any, 760px max)    │
│      ├──────────────────────────────────────────────┤
│      │  Composer (760px max centered)               │
│      │  [mode ▾] [effort ▾] [✦] [➤]               │
│      └──────────────────────────────────────────────┘
│                                                    │
│      Sidebar (340px) — summoned right             │
│      [Context] [Memory] [Knowledge] [Tasks] [Timeline]
└──────────────────────────────────────────────────────┘
```

### Dimensions
- Rail: 48px (box-sizing: border-box)
- Conversation max-width: 760px
- Composer max-width: 760px
- Sidebar: 340px (resizable 280-440px)
- No top bar
- No persistent tabs

### States
| State | What changes |
|-------|-------------|
| Default | Conversation + composer + rail. Sidebar hidden. |
| Sidebar open | Sidebar slides in from right (200ms). Conversation shrinks. |
| Command palette | Glass overlay centers over everything. |
| Search | Glass overlay centers over everything. |
| Task detail | Right panel replaces sidebar. |

### Responsive
| Width | Shell |
|-------|-------|
| > 960px | Full: rail + conversation + summoned sidebar |
| 640-960px | Sidebar becomes overlay, rail stays |
| < 640px | Rail becomes bottom bar (44px), conversation full-width |

### RTL
- `direction: rtl` on root
- Rail: left edge (RTL "start")
- Sidebar: right edge (RTL "end")
- User messages: right-aligned. AI messages: left-aligned.
- Code blocks: `direction: ltr`

---

## 2. Rail

### Purpose
Minimal navigation. 4 buttons + logo. Not a feature list.

### Layout
```
┌──┐
│M │  Logo (32×32, accent, click → conversation)
├──┤
│✦ │  ⌘K (command palette)
├──┤
│🧠│  Memory (→ sidebar Memory view)
│🔗│  Knowledge (→ sidebar Knowledge view)
├──┤
│  │  (flex spacer)
├──┤
│👤│  Account (popover: theme, settings)
└──┘
```

### Dimensions
- Width: 48px
- Button: 32×32px
- Gap: 6px

### States
| Button | Default | Hover | Active |
|--------|---------|-------|--------|
| Logo | accent bg | scale 0.94 | — |
| ⌘K | transparent | raised bg | — |
| Memory | transparent | raised bg | accent-soft bg + accent text |
| Knowledge | transparent | raised bg | accent-soft bg + accent text |
| Account | transparent | raised bg | accent-soft bg + accent text |

### Data Source
- `sidebarView` from Zustand store
- `rightOpen` from Zustand store

### User Actions
- Click logo → conversation + sidebar context view
- Click ⌘K → command palette
- Click Memory → sidebar Memory view (toggle: if already showing, close)
- Click Knowledge → sidebar Knowledge view (toggle)
- Click Account → popover (theme toggle, settings)

### Keyboard
- ⌘K — command palette
- ⌘B — toggle sidebar
- M — sidebar → Memory
- S — settings

### Mobile
- Becomes bottom bar (44px height)
- Same 4 buttons + logo, horizontal

---

## 3. Home Screen (Empty State)

### Purpose
First impression. Calm, personal, intelligent. No dashboard.

### Layout
```
┌──────────────────────────────────────────┐
│                                          │
│              ┌────┐                      │
│              │ M  │  (56×56, accent)     │
│              └────┘                      │
│                                          │
│            مرحباً  (24px, 600)            │
│                                          │
│   أنا MiMo — نظامك الشخصي.               │
│   اسألني، كلّفني مهمة، أو اطلب بحثاً.    │
│   أتذكّر ما يهمّك وأتعلم من كل محادثة.    │
│                                          │
│   [حلل خطة أسبوعي]  [ابحث بعمق]          │
│   [اكتب كوداً]      [خطّط لمشروع]        │
│                                          │
├──────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │ اسأل MiMo…                        │   │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤] │   │
│  └──────────────────────────────────┘   │
│  MiMo يعمل محلياً · Enter · ⌘K          │
└──────────────────────────────────────────┘
```

### Dimensions
- Logo: 56×56px
- Heading: 24px, weight 600
- Body: 14px, secondary text
- Suggestion chips: 10px padding, 10px radius
- Composer: full width within 760px max

### States
| State | What shows |
|-------|-----------|
| Empty (no messages) | Logo + greeting + 4 suggestion chips + composer |
| Active (has messages) | Message list + composer (greeting fades out) |

### Data Source
- `messages` from Zustand store (length === 0 → empty state)

### User Actions
- Click suggestion chip → send the suggestion text
- Type in composer → Enter to send

---

## 4. Conversation

### Purpose
The permanent spine. Messages flow from top. Composer anchored bottom. No dead zone.

### Layout
```
┌──────────────────────────────────────────┐
│  (messages scroll area, 760px max)        │
│                                          │
│  ┌──────────────────┐                    │
│  │ مرحبا، من أنت؟    │ (user, right)     │
│  └──────────────────┘                    │
│                                          │
│  ┌──┐                                     │
│  │M │  أنا MiMo... (AI, left)            │
│  └──┘                                     │
│                                          │
│  [Action Trace if working]               │
│  [Task card if task created]             │
│  [Artifact card if produced]             │
│  [Memory citation if used]               │
│  [Approval card if needed]              │
│  [Error card if failed]                  │
│                                          │
├──────────────────────────────────────────┤
│  [Background task indicator if any]      │
├──────────────────────────────────────────┤
│  Composer (760px max)                    │
└──────────────────────────────────────────┘
```

### Dimensions
- Max-width: 760px
- Padding: 24px horizontal, 24px top
- Message spacing: 20px between messages
- User message: 72% max-width, raised bg, right-aligned
- AI message: full width, transparent bg, 28px "M" mark, left-aligned

### States
| State | What changes |
|-------|-------------|
| User typing | Composer shows text, send button activates |
| AI streaming | Typing indicator (calm dots) → streaming content with cursor |
| AI working | Action Trace appears above composer |
| Task active | Task card appears inline in conversation |
| Background task | Indicator appears below conversation, above composer |

### Data Source
- `messages` from Zustand store
- `loading` from Zustand store
- SSE events via `useEventStream`

### User Actions
- Type → Enter to send (⇧Enter for newline)
- Hover AI message → action buttons (copy)
- Click task card → expand/collapse
- Click artifact card → expand/preview
- Click memory citation → expand card
- Click approval card → approve/reject

---

## 5. Composer

### Purpose
Primary control surface. Calm by default, powerful when expanded.

### Default State
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│                                            │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
MiMo يعمل محلياً · Enter للإرسال · ⌘K للأوامر
```

### Expanded State (tools revealed)
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│                                            │
│ [محادثة ▾] [متوازن ▾] [✦]                │
│ [🧠] [🌐] [🖼️] [🎤]    [➤]              │
└──────────────────────────────────────────┘
```

### Controls

| Control | Default | Expanded | Purpose |
|---------|---------|----------|---------|
| Mode | محادثة / بحث / كود / كتابة | — | Intent type (4 modes, not 8) |
| Effort | سريع / متوازن / عميق | — | ModelRouter profile (per-turn knob) |
| Tools (✦) | Hidden | Reveals: deep think, web search, image gen, voice | Progressive disclosure |
| Send (➤) | Disabled (no text) | Accent (text present) | Send message |
| Stop (⏹) | — | Replaces Send when AI working | Stop generation |

### Dimensions
- Max-width: 760px
- Surface: `--m-surface` (tonal elevation, no hard border)
- Radius: 14px
- Textarea: 15px font, 1.6 line-height, auto-grow to 200px max
- Controls: 32×32px buttons, 8px radius

### States
| State | What changes |
|-------|-------------|
| Empty | Placeholder "اسأل MiMo…", send disabled |
| Typing | Text present, send accent color |
| Working | Send → Stop, textarea disabled |
| Tools expanded | Tools row slides in (200ms) |

### Data Source
- `input`, `mode`, `effort`, `loading` from Zustand store
- `send()` / `stop()` from `useChat` hook

### User Actions
- Type → Enter to send
- Click mode → dropdown (4 modes)
- Click effort → dropdown (3 levels)
- Click ✦ → toggle tools row
- Click send → send message
- Click stop → stop generation

### Keyboard
- Enter — send
- ⇧Enter — newline
- ⌘K — command palette

---

## 6. Agent/Task Experience

### Purpose
Show operational state (not chain-of-thought). Task lifecycle inline in conversation.

### Action Trace (inline, above composer)

**Level 1 (default — single line):**
```
◐ ينفذ — يستدعى أداة البحث
```

**Level 2 (expanded — action trace):**
```
◐ ينفذ — بناء نظام المصادقة
─────────────────────────
✓ حلل السياق — الذاكرة والمعرفة
✓ بنى الخطة — 5 خطوات
→ يبحث عن أفضل ممارسات JWT
✓ اكتمل
```

**Level 3 (click an action → details):**
```
يبحث عن أفضل ممارسات JWT
  المصادر: 8 نتائج ويب
  الأداة: web_search
  المدة: 3.2 ثانية
```

### Task Card (inline in conversation)

**Collapsed:**
```
┌─────────────────────────────────────────┐
│ ● ينفذ — بناء نظام المصادقة              │
│ الخطوة 2 من 5 · 45 ثانية                 │
│ [فتح]  [إلغاء]                          │
└─────────────────────────────────────────┘
```

**Expanded:**
```
┌─────────────────────────────────────────┐
│ ✦ بناء نظام المصادقة                     │
│ الهدف: implement JWT auth               │
│ الحالة: ينفذ · الخطوة 2 من 5             │
│                                          │
│ الخطوات:                                 │
│  ✓ تحليل بنية المشروع (14 ملف)           │
│  → إنشاء ملفات المصادقة (4 ملفات)        │
│  · كتابة الاختبارات                      │
│  · تشغيل الاختبارات                      │
│  · التحقق                                │
│                                          │
│ الأدوات: web_search · memory_recall      │
│                                          │
│ [إيقاف مؤقت]  [إلغاء]  [تصغير]           │
└─────────────────────────────────────────┘
```

### Background Task Indicator
```
┌─────────────────────────────────────────┐
│ ◐ مهمة في الخلفية — بناء نظام المصادقة   │
│ الخطوة 2 من 5 · [فتح]                    │
└─────────────────────────────────────────┘
```

### Dimensions
- Max-width: 760px (same as conversation)
- Card: 10px radius, surface bg, hairline border
- Status dot: 8px, pulsing (m-pulse animation)
- Step indicator: 12px, checkmark/arrow/dot

### States
| State | Color | Label |
|-------|-------|-------|
| pending | muted | بانتظار |
| planning | thinking | يخطط |
| executing | executing | ينفذ |
| validating | retrieving | يتحقق |
| paused | warning | متوقف مؤقتاً |
| done | success | اكتمل |
| error | error | خطأ |
| cancelled | muted | أُلغي |

### Data Source
- SSE events via `useEventStream`
- `/api/tasks` via `useTasks` hook

### User Actions
- Click Action Trace → expand/collapse
- Click task card → expand/collapse
- Click [إيقاف مؤقت] → PATCH task status=paused
- Click [إلغاء] → DELETE task
- Click [تصغير] → minimize to background indicator
- Click background indicator → expand task list

---

## 7. Sidebar

### Purpose
Contextual browsing. Summoned, not permanent. 5 views.

### Layout
```
┌────────────────────────────────┐
│ [السياق] [الذاكرة] [المعرفة] [المهام] [الوقائع] │
├────────────────────────────────┤
│                                │
│  (view content)                │
│                                │
└────────────────────────────────┘
```

### Dimensions
- Width: 340px (resizable 280-440px)
- Tab height: 34px
- Content padding: 12px
- Resize handle: 3px, left edge

### Views

**Context:**
- Current AI state (if working)
- "What MiMo knows" stats (real counts: memories, goals, skills, facts)
- Recent activity (5 events)

**Memory:**
- Browse all memories
- Filter by type (fact/preference/skill/goal/event)
- Search
- Each: content + type badge + confidence bar + source + date
- Edit (inline) + Delete (soft-delete with confirmation)

**Knowledge:**
- Browse entities by type
- Each: name + type badge + confidence + evidence count
- Expand: relationships (list, not graph) + sources

**Tasks:**
- Browse all tasks (active + history)
- Each: intent + status dot + date
- Click to expand

**Timeline:**
- Human-readable activity (not raw events)
- Filter by type
- Each: timestamp + type icon + description

### States
| State | What changes |
|-------|-------------|
| Closed | Not visible (conversation fills viewport) |
| Open | Slides in from right (200ms) |
| View switch | Content fades (200ms) |

### Data Source
- `useWorkspace` hook (memory, knowledge, stats, timeline)
- `useTasks` hook (tasks)
- `useEventStream` (live events)

### User Actions
- Click tab → switch view
- Click memory → expand
- Click entity → expand relationships
- Click task → expand
- Drag resize handle → adjust width

### Keyboard
- ⌘B — toggle sidebar
- M — sidebar → Memory view

---

## 8. Memory Experience

### Purpose
Memory feels like understanding, not database administration.

### Inline Citations (in AI messages)
When MiMo uses a memory: `[mem:abc]` → expandable card:
```
┌─────────────────────────────────────────┐
│ 🧠 ذاكرة                                │
│ "المستخدم يفضّل العمل ليلاً"              │
│ المصدر: محادثة 2024-08-15                │
│ الثقة: 85%  · نوع: تفضيل                 │
│ [تعديل]  [حذف]  [إخفاء]                 │
└─────────────────────────────────────────┘
```

### Sidebar Browse
- All memories, filterable by type
- Each shows: content, type badge, confidence bar, source, date
- Edit: inline text editor
- Delete: soft-delete with confirmation
- Provenance: source + date + confidence + related entities

### "What does MiMo know about you?"
In Context view: real counts (no fake stats). Links to browse memories.

---

## 9. Knowledge Experience

### Purpose
Knowledge feels like understanding, not a graph visualization.

### Inline Entity Links (in AI messages)
When MiMo references an entity: `[ent:xyz]` → expandable:
```
┌─────────────────────────────────────────┐
│ 🔗 كيان معرفة                           │
│ React                                  │
│ النوع: تقنية  · الثقة: 90%             │
│ العلاقات:                              │
│  · يعتمد على TypeScript                │
│  · مستخدم في 3 مشاريع                  │
│ الأدلة: 5 مصادر                        │
└─────────────────────────────────────────┘
```

### Sidebar Browse
- Browse by type (person/project/technology/concept/skill/goal)
- Each shows: name, type badge, confidence, evidence count
- Expand: relationships (list, NOT decorative graph), sources

### NO Decorative Graph
Graph view is NOT default. Relationships are lists. Graph available only on explicit request (future).

---

## 10. Artifact Experience

### Purpose
Artifacts are durable outputs, connected to their origin.

### Inline Artifact Cards (in AI messages)
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

### Connected
- Links to originating conversation + task + project
- Version history (internal)

---

## 11. Research Experience

### Purpose
Research is a first-class workflow, not just search results.

### Flow
```
Question
→ Sources discovered (8 sources)
→ Evidence evaluated (credibility)
→ Synthesis (key findings)
→ Cited answer (inline [1], [2])
→ Research artifact saved
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
Inline `[1]`, `[2]` → expandable to source + quote (NotebookLM pattern).

---

## 12. Command Center (⌘K)

### Purpose
The operating system's command layer. Not a generic search modal.

### Layout
```
┌──────────────────────────────────────────┐
│ ⌘ اكتب أمراً أو ابحث…                      │
└──────────────────────────────────────────┘

الإجراءات
· محادثة جديدة                     C
· إنشاء مهمة
· بدء بحث

التنقّل
· الذاكرة                          M
· المعرفة
· المهام
· الوقائع
· الإعدادات                        S
```

### Capabilities
- Actions: new conversation, create task, start research
- Navigation: open memory, knowledge, tasks, timeline, settings
- Search: find project, file, artifact, conversation

### Prefix Grammar (future)
- `>` — actions
- `@` — entities
- `/` — slash commands
- `#` — tags

### Dimensions
- Glass backdrop overlay
- Input: 640px max, centered
- Results: categorized, keyboard navigable

### Keyboard
- ⌘K — open/close
- ↑/↓ — navigate
- Enter — execute
- Esc — close

---

## 13. Approval Experience

### Purpose
User controls consequential actions. Not hidden, not spam.

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
│ [مراجعة التغييرات] [موافقة] [رفض]        │
└─────────────────────────────────────────┘
```

---

## 14. Error/Recovery Experience

### Purpose
Errors are actionable, not alarming. Never raw stack traces.

### Inline Error Card
```
┌─────────────────────────────────────────┐
│ ⚠ تعذر إكمال المهمة                      │
│                                          │
│ حدث خطأ أثناء تنفيذ الخطوة 4.            │
│                                          │
│ MiMo يستطيع:                             │
│ [إعادة المحاولة] [طريقة أخرى] [التفاصيل]  │
└─────────────────────────────────────────┘
```

---

## 15. Visual Language

### Color
- Background: warm-neutral (#fafaf9 light / #0c0a09 dark)
- Surface: slightly raised
- ONE accent: violet (#6d28d9 light / #a78bfa dark)
- AI states: thinking, retrieving, executing, success, warning, error
- No decorative gradients

### Typography
- IBM Plex Sans Arabic (Arabic), system sans (English), JetBrains Mono (code)
- Scale: 24/17/15/14/13/12/11px
- Weights: 400/500/600

### Spacing
4px grid: 4/8/12/16/20/24/32/40/48/64

### Motion
0/120/200/300/400ms tiers. Asymmetric (enter 0ms, exit 150ms). Reduced motion: all instant.

### Density
Calm by default. Dense when summoned. Never overwhelming.

---

## 16. Wireframes

### Home (Empty State)
```
┌──────────────────────────────────────────┐
│                                          │
│              ┌────┐                      │
│              │ M  │                      │
│              └────┘                      │
│            مرحباً                         │
│   أنا MiMo — نظامك الشخصي.               │
│   [حلل خطة] [ابحث] [اكتب] [خطط]          │
├──────────────────────────────────────────┤
│  ┌──────────────────────────────────┐    │
│  │ اسأل MiMo…                        │    │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤] │    │
│  └──────────────────────────────────┘    │
│  Enter · ⌘K                              │
└──────────────────────────────────────────┘
```

### Conversation + Agent Task
```
┌──────────────────────────────────────────┐
│  ┌──────────────┐                        │
│  │ ابنِ نظام مصادقة│ (user)               │
│  └──────────────┘                        │
│                                          │
│  ┌──┐                                     │
│  │M │  سأبني نظام مصادقة JWT...          │
│  └──┘                                     │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │ ● ينفذ — بناء نظام المصادقة       │   │
│  │ الخطوة 2 من 5                    │   │
│  │ ✓ تحليل (14 ملف)                 │   │
│  │ → إنشاء ملفات (4 ملفات)          │   │
│  │ [إيقاف] [تصغير]                  │   │
│  └──────────────────────────────────┘   │
├──────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │ اسأل MiMo… (enabled for follow-up)│   │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤] │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

### Research
```
┌──────────────────────────────────────────┐
│  ┌──────────────┐                        │
│  │ ابحث عن JWT  │ (user)                │
│  └──────────────┘                        │
│                                          │
│  ┌──┐                                     │
│  │M │  📚 بحث — أفضل ممارسات JWT         │
│  └──┘  ✓ بحث في 8 مصادر                  │
│        ✓ قيّم المصداقية                    │
│        → يركّب الإجابة                    │
│        [عرض المصادر] [حفظ كبحث]          │
│                                          │
├──────────────────────────────────────────┤
│  Composer (enabled)                      │
└──────────────────────────────────────────┘
```

### Approval
```
┌──────────────────────────────────────────┐
│  ┌──────────────────────────────────┐   │
│  │ ⚠ موافقة مطلوبة                    │   │
│  │ MiMo يريد تعديل 6 ملفات            │   │
│  │ [مراجعة] [موافقة] [رفض]           │   │
│  └──────────────────────────────────┘   │
├──────────────────────────────────────────┤
│  Composer (disabled until resolved)      │
└──────────────────────────────────────────┘
```

### Error
```
┌──────────────────────────────────────────┐
│  ┌──────────────────────────────────┐   │
│  │ ⚠ تعذر إكمال المهمة                │   │
│  │ حدث خطأ في الخطوة 4.              │   │
│  │ [إعادة المحاولة] [طريقة أخرى]      │   │
│  │ [التفاصيل]                         │   │
│  └──────────────────────────────────┘   │
├──────────────────────────────────────────┤
│  Composer (enabled)                      │
└──────────────────────────────────────────┘
```

### Mobile
```
┌──────────────────────────┐
│                          │
│    Conversation          │
│    (full width)          │
│                          │
├──────────────────────────┤
│  Composer (full width)   │
├──────────────────────────┤
│ [M] [✦] [🧠] [🔗] [👤]  │  (bottom bar)
└──────────────────────────┘
```

---

## 17. Design Decisions Requiring Approval

1. **Inline citation rendering** — should the AI emit `[mem:abc]` tokens in responses, or should responses be post-processed to insert citations based on GraphRAG context?

2. **Artifact API** — create new `/api/artifacts` CRUD routes, or reuse existing Artifact Prisma model with new routes?

3. **Approval flow** — should approvals come from ToolPolicyEngine (automatic, based on `requiresConfirmation`), or from a new approval API?

4. **Memory edit/delete API** — add `PATCH/DELETE /api/mimo/memory/[id]` routes to support UI edit/delete buttons?

5. **Execution modes** — should MiMo expose ZCode-style execution modes (Plan/Auto/Goal) as a task-level setting, or should MiMo auto-detect the appropriate mode from intent?

6. **Conversation width** — 760px (current) vs 820px (Product Bible spec). 760px gives better reading rhythm on widescreen; 820px matches the spec. Which?

7. **Rail width** — 48px (current) vs 56px (Product Bible spec). 48px is quieter; 56px gives more touch target. Which?
