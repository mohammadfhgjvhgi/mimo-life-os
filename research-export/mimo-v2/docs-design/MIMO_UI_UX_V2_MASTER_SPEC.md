# MiMo — UI/UX V2 Master Specification

> **The authoritative source for MiMo's second-pass agentic product interface.**
> Builds on `MIMO_UI_UX_MASTER_SPEC.md` (V1 "Quiet Surface") + Decision Matrix + Gap Analysis.

---

## 1. Product Philosophy

MiMo is a **Personal AI Operating System** — not a chatbot, not a dashboard, not an IDE.

**Three words**: Calm. Alive. Mine.
- **Calm** — default is one conversation on a clean surface. No chrome clutter.
- **Alive** — when MiMo works, you see real actions (Action Trace, not spinner).
- **Mine** — memory is visible, correctable, local-first.

**The defining principle**: The conversation is the permanent spine. Tasks, memory, knowledge, artifacts — all live INLINE in the conversation when relevant, and in summoned surfaces when browsing.

---

## 2. What's Always Visible / Contextual / Summoned

### Always Visible
| Element | Location | Why |
|---|---|---|
| Conversation | Center (820px max) | The spine |
| Composer | Bottom (820px max) | Primary input |
| Rail (48px) | Left edge | Minimal navigation |

### Contextual (appears when needed)
| Element | Appears when | Where |
|---|---|---|
| AgentStatus | AI working | Inline, above composer |
| Task card | Task created from conversation | Inline in conversation |
| Approval card | Sensitive action requested | Inline in conversation |
| Error card | Error occurs | Inline in conversation |
| Background task indicator | Task minimized | Bottom of conversation |
| Citation popover | User hovers `[1]` link | Inline tooltip |

### Summoned (user action)
| Element | Trigger | Where |
|---|---|---|
| Sidebar | Rail icon / ⌘B | Right side (340px) |
| Command Palette | ⌘K | Center overlay |
| Universal Search | ⌘/ | Center overlay |
| Project Switcher | ⌘P | Center overlay |
| Task detail panel | Click task card | Right side panel |
| Artifact panel | Click artifact | Right side panel |
| Settings | S key / account | Modal |
| Dev Workspace | ⌘⇧E | Full viewport |
| Dev Panel | ⌘⇧D | Right side |

---

## 3. Shell Architecture

```
┌────────┬──────────────────────────────────────┐
│        │                                      │
│        │           Conversation                │
│  Rail  │           (820px max, centered)       │
│ (48px) │                                      │
│        │           [Task cards inline]         │
│        │           [Approval cards inline]     │
│        │           [Artifact cards inline]     │
│        │           [Error cards inline]        │
│        │                                      │
│        ├──────────────────────────────────────┤
│        │  AgentStatus (inline, if working)    │
│        ├──────────────────────────────────────┤
│        │  Composer (820px max, centered)       │
│        ├──────────────────────────────────────┤
│        │  Background task indicator (if any)  │
│        └──────────────────────────────────────┘
└────────────────────────────────────────────────┘
  Sidebar (340px) summoned right
```

---

## 4. Task System (the #1 new capability)

### 4.1 Task Lifecycle

```
User request
→ Task created (inline card appears)
→ Understanding ("يحلل الطلب…")
→ Planning ("يبني الخطة — 5 خطوات")
→ [Approval gate if file-modifying]
→ Execution ("ينفذ الخطوة 2 من 5")
→ Tool calls ("يستدعى أداة البحث")
→ Observation ("يحلل النتائج")
→ Verification ("يتحقق من النتيجة")
→ Completed (artifact produced)
```

### 4.2 Task Card (inline in conversation)

```
┌─────────────────────────────────────────┐
│ ● ينفذ — بناء نظام المصادقة              │
│ الخطوة 2 من 5 · 45 ثانية                 │
│ [فتح التفاصيل]  [إلغاء]                  │
└─────────────────────────────────────────┘
```

Expanded:
```
┌─────────────────────────────────────────┐
│ ✦ بناء نظام المصادقة                     │
│                                          │
│ الهدف: implement JWT auth for the API    │
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
│ الأدوات المنتجة: auth.ts · auth.test.ts  │
│                                          │
│ [إيقاف مؤقت]  [إلغاء]  [تصغير]           │
└─────────────────────────────────────────┘
```

### 4.3 Background Task Indicator (minimized)

```
┌─────────────────────────────────────────┐
│ ◐ مهمة في الخلفية — بناء نظام المصادقة   │
│ الخطوة 2 من 5 · [فتح]                    │
└─────────────────────────────────────────┘
```

### 4.4 Task Detail Panel (summoned, right side)

Shows: goal, status, progress, steps, tools, files changed, artifacts, errors, checkpoints, recovery.

---

## 5. Agent Experience (Action Trace)

### 5.1 Live Activity (inline, not chain-of-thought)

**Level 1** (default — single line):
```
◐ ينفذ — يستدعى أداة البحث
```

**Level 2** (expanded — action trace):
```
◐ ينفذ — بناء نظام المصادقة
─────────────────────────
✓ حلل بنية المشروع (14 ملف)
✓ استرجع ذاكرة ذات صلة (3 ذكريات)
→ يبحث عن أفضل ممارسات JWT
  · يبحث في الويب…
  · يحلل النتائج…
✓ بنى الخطة (5 خطوات)
→ ينفذ الخطوة 2: إنشاء ملفات المصادقة
```

**Never**: chain-of-thought, internal reasoning, "thinking about..."

---

## 6. Memory + Knowledge

### 6.1 Memory (inline citations)

In conversation: `[mem:abc]` → expandable card:
```
┌─────────────────────────────────────────┐
│ 🧠 ذاكرة                                │
│ "المستخدم يفضّل العمل ليلاً"              │
│ المصدر: محادثة 2024-08-15                │
│ الثقة: 85%  · نوع: تفضيل                 │
│ [تعديل]  [حذف]  [إخفاء]                 │
└─────────────────────────────────────────┘
```

### 6.2 Knowledge (entity links)

In conversation: `[ent:xyz]` → expandable:
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

### 6.3 Sidebar Views (summoned)

- **Context**: current AI state + stats + recent activity
- **Memory**: browse all memories, filter, edit, delete
- **Knowledge**: browse entities by type, see relationships (list, not graph)
- **Timeline**: human-readable activity (not raw events)

---

## 7. Composer (primary interaction surface)

```
┌─────────────────────────────────────────┐
│  [وضع: محادثة ▾]                        │
│                                          │
│  اسأل MiMo…                              │
│                                          │
│  [📎] [⚙️ جهد: متوازن ▾]    [🔍] [🎤] [➤]│
└─────────────────────────────────────────┘
```

- Mode selector (left): chat / research / code / writing / run
- Effort selector: Auto / Fast / Balanced / Deep / Max
- Attach, web search, voice, send (right)

---

## 8. Command Palette (⌘K)

Prefix grammar:
- `>` — actions (run, create, toggle)
- `@` — entities (memory, knowledge, project, file)
- `/` — slash commands (clear, compact, forget)
- `#` — search by tag

Results categorized: Actions / Conversations / Memories / Knowledge / Files / Tasks / Artifacts

---

## 9. Visual System

### 9.1 Design Tokens (already in globals.css)
- `--m-bg`, `--m-surface`, `--m-raised`, `--m-sunken`
- `--m-text`, `--m-text-2`, `--m-text-3`
- `--m-border`, `--m-border-2`
- `--m-accent`, `--m-accent-soft`, `--m-accent-fg`
- `--m-thinking`, `--m-retrieving`, `--m-executing`, `--m-success`, `--m-warning`, `--m-error`

### 9.2 Typography
- IBM Plex Sans Arabic (Arabic), system sans (English), JetBrains Mono (code)
- Scale: 20/17/15/14/13/12/11px
- Weights: 400/500/600

### 9.3 Spacing
4px grid: 4/8/12/16/20/24/32/40/48/64

### 9.4 Motion
0ms (enter) / 120ms (hover) / 200ms (slide) / 300ms (overlay) / 400ms ceiling (modal)

---

## 10. Implementation Order

1. Task API routes (GET/PATCH tasks, POST approve/cancel)
2. TaskCard component (inline in conversation)
3. AgentStatus upgrade (action trace, not just verb)
4. BackgroundTaskIndicator
5. ApprovalCard (inline)
6. ErrorCard (inline with actions)
7. Memory inline citations + edit/delete API
8. Knowledge inline entity links
9. Composer effort controls
10. Command palette upgrade (prefix grammar)
11. Sidebar Timeline (human-readable)
12. Artifact API + inline cards
13. Backup UI (settings)
14. QA + cleanup
