# MiMo — Interface State Map

> Every major screen state with defined composition. Dimensions, hierarchy, position, behavior, transitions.

---

## A. Empty State (no conversation)

```
┌─────────────────────────────────────────────────────────────┐
│ ┌──┐                                                        │
│ │M │  Logo (56×56, accent, centered)                        │
│ └──┘                                                        │
│                                                             │
│                    مرحباً  (24px, 600)                      │
│                                                             │
│    أنا MiMo — نظامك الشخصي.                                 │
│    اسألني، كلّفني مهمة، أو اطلب بحثاً.                     │
│    أتذكّر ما يهمّك وأتعلم من كل محادثة.                     │
│                                                             │
│    [حلل خطة أسبوعي]  [ابحث بعمق]                            │
│    [اكتب كوداً]      [خطّط لمشروع]                          │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐              │
│  │ اسأل MiMo…                                │              │
│  │                                            │              │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │              │
│  └──────────────────────────────────────────┘              │
│  MiMo يعمل محلياً · Enter للإرسال · ⌘K للأوامر              │
└─────────────────────────────────────────────────────────────┘
```

- **Viewport**: full (100vh)
- **Rail**: 48px left (hidden in empty state — pure focus on greeting)
- **Conversation area**: centered, max-width 760px
- **Composer**: bottom, 760px max, integrated
- **Behavior**: suggestion chips → send on click
- **Transition**: greeting fades out, conversation fades in (200ms)

---

## B. Normal Conversation

```
┌─────────────────────────────────────────────────────────────┐
│┌──┐                                                         │
││M │  مرحباً، من أنت؟ (user, right-aligned, raised bg)      │
│└──┘                                                         │
│                                                             │
│  ┌──┐                                                       │
│  │M │  أنا MiMo — نظام التشغيل الذكي الشخصي... (AI, left)  │
│  └──┘                                                       │
│                                                             │
│                          ┌──────────────────┐               │
│                          │ ماذا تعرف عني؟    │ (user)       │
│                          └──────────────────┘               │
│                                                             │
│  ┌──┐                                                       │
│  │M │  بناءً على ما تعلمته... (AI with markdown)            │
│  └──┘                                                       │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐              │
│  │ اسأل MiMo…                                │              │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │              │
│  └──────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

- **Rail**: 48px left (visible)
- **Conversation**: scrollable, 760px max centered, 24px padding
- **Composer**: bottom, integrated, 760px max
- **Message spacing**: 20px margin between messages
- **User messages**: raised bg, right-aligned, 72% max-width, no avatar
- **AI messages**: transparent bg, left-aligned, 28px "M" mark, action buttons on hover
- **Transition**: new messages animate in (opacity + y:6→0, 200ms)

---

## C. Long Conversation

Same as B but:
- Messages virtualized (future — for 1000+ messages)
- Scroll-to-bottom button appears when scrolled up
- Auto-scroll to bottom on new message (if already at bottom)

---

## D. Agent Working

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages above)                              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐              │
│  │ ◐ ينفذ — يستدعى أداة البحث                │              │
│  │                            [▾ تفاصيل]     │              │
│  └──────────────────────────────────────────┘              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐              │
│  │ اسأل MiMo… (disabled while AI working)    │              │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [⏹]         │              │
│  └──────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

- **Action Trace**: above composer, 760px max
- **Level 1**: single line verb + object + pulsing dot
- **Level 2** (expanded): action trace with checkmarks + counts
- **Composer**: disabled (Stop button replaces Send)
- **Behavior**: Action Trace enters instantly (0ms), exits with 150ms fade
- **Never**: spinner, "thinking...", chain-of-thought

---

## E. Background Task

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation continues normally)                         │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐              │
│  │ ◐ مهمة في الخلفية — بناء نظام المصادقة     │              │
│  │ الخطوة 2 من 5 · [فتح]                     │              │
│  └──────────────────────────────────────────┘              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────┐              │
│  │ اسأل MiMo… (enabled — user can continue)  │              │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │              │
│  └──────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────┘
```

- **Background indicator**: above composer, calm
- **Composer**: ENABLED — user can continue chatting
- **Behavior**: click [فتح] → expand task list inline

---

## F. Research Active

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages)                                    │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ 📚 بحث — أفضل ممارسات JWT                  │              │
│  │ ✓ بحث في 8 مصادر                          │              │
│  │ ✓ قيّم المصداقية                           │              │
│  │ → يركّب الإجابة                            │              │
│  │ [عرض المصادر] [حفظ كبحث]                  │              │
│  └──────────────────────────────────────────┘              │
├─────────────────────────────────────────────────────────────┤
│  (composer — may be disabled or enabled)                    │
└─────────────────────────────────────────────────────────────┘
```

- **Research card**: inline in conversation
- **Shows**: question → sources reviewed → evidence → synthesis status
- **Actions**: view sources, save as research artifact

---

## G. Artifact Generated

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages)                                    │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ 📄 تقرير تحليل البيانات                    │              │
│  │ نوع: تقرير · 4 صفحات                      │              │
│  │ [معاينة]  [نسخ]  [تصدير]  [حفظ]           │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  (composer — enabled)                                       │
└─────────────────────────────────────────────────────────────┘
```

- **Artifact card**: inline in conversation
- **Collapsed**: type + title + actions
- **Expanded**: full preview (code, markdown, image, etc.)
- **Actions**: preview, copy, export, save to project

---

## H. Approval Required

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages)                                    │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ ⚠ موافقة مطلوبة                            │              │
│  │ MiMo يريد تعديل 6 ملفات في مشروع "تطوير"   │              │
│  │ [مراجعة التغييرات] [موافقة] [رفض]         │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  (composer — disabled until approval resolved)              │
└─────────────────────────────────────────────────────────────┘
```

- **Approval card**: inline in conversation
- **Shows**: what MiMo wants to do + why + what will change
- **Actions**: review changes, approve, reject
- **Composer**: disabled until resolved

---

## I. Error State

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages)                                    │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ ⚠ تعذر إكمال المهمة                       │              │
│  │ حدث خطأ أثناء تنفيذ الخطوة 4.              │              │
│  │                                            │              │
│  │ MiMo يستطيع:                               │              │
│  │ [إعادة المحاولة] [طريقة أخرى] [التفاصيل]   │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  (composer — enabled)                                       │
└─────────────────────────────────────────────────────────────┘
```

- **Error card**: inline, with context
- **Shows**: what happened, why, what MiMo can do
- **Actions**: retry, try different approach, view details
- **Never**: raw stack traces

---

## J. Task Paused

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages)                                    │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ ⏸ متوقف مؤقتاً — بناء نظام المصادقة        │              │
│  │ الخطوة 2 من 5                              │              │
│  │ [استئناف]  [إلغاء]  [فتح التفاصيل]        │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  (composer — enabled)                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## K. Task Completed

```
┌─────────────────────────────────────────────────────────────┐
│  (conversation messages)                                    │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ ✓ اكتمل — بناء نظام المصادقة               │              │
│  │ 5 خطوات · 2.3 دقيقة                       │              │
│  │ [عرض النتائج]  [حفظ]                      │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  (composer — enabled)                                       │
└─────────────────────────────────────────────────────────────┘
```

---

## L. Sidebar Open

```
┌────────┬──────────────────────────────┬─────────────┐
│        │                              │             │
│  Rail  │     Conversation             │   Sidebar   │
│ (48px) │     (760px max, centered)    │   (340px)   │
│        │                              │             │
│        │                              │  [السياق]   │
│        │                              │  [الذاكرة]  │
│        │                              │  [المعرفة]  │
│        │                              │  [المهام]   │
│        │                              │  [الوقائع]  │
│        │                              │             │
│        │                              │  (content)  │
│        │                              │             │
│        ├──────────────────────────────┤             │
│        │  Composer (760px max)        │             │
│        └──────────────────────────────┘             │
└────────┴──────────────────────────────┴─────────────┘
```

- **Sidebar**: 340px, resizable 280-440px
- **5 tabs**: Context / Memory / Knowledge / Tasks / Timeline
- **Enter**: 0ms (instant). **Exit**: 200ms slide.
- **Content**: swaps based on active view (200ms fade)

---

## M. Project Context Active

```
┌────────┬──────────────────────────────┐
│        │  [Project: تطوير الويب ▾]    │  ← project chip in composer
│  Rail  │                              │
│        │     Conversation             │
│        │     (project-scoped)         │
│        │                              │
│        ├──────────────────────────────┤
│        │  Composer (with project chip)│
│        └──────────────────────────────┘
```

- **Project chip**: appears in composer when a project is active
- **Conversation**: scoped to project memory + knowledge
- **Sidebar**: shows project context (active tasks, recent activity)

---

## N. Search Open (⌘/)

```
┌─────────────────────────────────────────────────────────────┐
│  (blurred background — conversation dimmed)                 │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ 🔍 ابحث في كل شيء…                        │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
│  المحادثات                                                   │
│  · محادثة عن JWT                    قبل يومين               │
│                                                             │
│  الذكريات                                                   │
│  · يفضّل العمل ليلاً                 85% ثقة                │
│                                                             │
│  المعرفة                                                    │
│  · React — تقنية                    90% ثقة                │
│                                                             │
│  المهام                                                     │
│  · بناء نظام المصادقة                ينفذ                  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **Overlay**: glass backdrop (blur 16px)
- **Input**: centered, 640px max
- **Results**: categorized, keyboard navigable (↑/↓ Enter Esc)
- **Enter**: 0ms. **Exit**: 150ms fade.

---

## O. Command Palette Open (⌘K)

```
┌─────────────────────────────────────────────────────────────┐
│  (blurred background)                                       │
│                                                             │
│  ┌──────────────────────────────────────────┐              │
│  │ ⌘ اكتب أمراً أو ابحث…                      │              │
│  └──────────────────────────────────────────┘              │
│                                                             │
│  الإجراءات                                                   │
│  · محادثة جديدة                     C                     │
│  · إنشاء مهمة                                             │
│  · بدء بحث                                                │
│                                                             │
│  التنقّل                                                    │
│  · الذاكرة                          M                     │
│  · المعرفة                                                │
│  · المهام                                                 │
│  · الوقائع                                                │
│  · الإعدادات                        S                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

- **Overlay**: glass backdrop
- **Input**: centered, 640px max
- **Results**: categorized (Actions / Navigation / Search)
- **Keyboard**: ↑/↓ Enter Esc
- **Prefix grammar** (future): > actions, @ entities, / commands, # tags

---

## P. Mobile / Narrow Viewport (< 640px)

```
┌──────────────────────────────┐
│                              │
│     Conversation             │
│     (full width)            │
│                              │
│                              │
├──────────────────────────────┤
│  ┌────────────────────────┐ │
│  │ اسأل MiMo…              │ │
│  │ [محادثة ▾]    [✦] [➤]  │ │
│  └────────────────────────┘ │
├──────────────────────────────┤
│  [M] [✦] [🧠] [🔗] [👤]     │  ← bottom bar (rail)
└──────────────────────────────┘
```

- **Rail**: becomes bottom bar (44px)
- **Conversation**: full width
- **Composer**: full width
- **Sidebar**: full-screen overlay

---

## Q. Dark Mode

- Background: `#0c0a09` (warm neutral, not pure black)
- Surface: `#161311` (slightly raised)
- Raised: `#1c1917`
- Text: `#f5f5f4` (primary), `#a8a29e` (secondary), `#57534e` (muted)
- Border: `#292524` (hairline)
- Accent: `#a78bfa` (violet, brightened for dark)

---

## R. Light Mode

- Background: `#fafaf9` (warm neutral)
- Surface: `#ffffff`
- Raised: `#f5f5f4`
- Text: `#1c1917` (primary), `#57534e` (secondary), `#a8a29e` (muted)
- Border: `#e7e5e4` (hairline)
- Accent: `#6d28d9` (violet, deeper for light)

---

## S. RTL Arabic

- `direction: rtl` on root
- User messages: right-aligned
- AI messages: left-aligned
- Rail: left edge (in RTL, this is the "start")
- Sidebar: right edge (in RTL, this is the "end")
- Code blocks: `direction: ltr` (forced)
- Icons: mirror correctly
- Spacing: symmetric (no directional bias)
- Typography: IBM Plex Sans Arabic (designed for RTL)
