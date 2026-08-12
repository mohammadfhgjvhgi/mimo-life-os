# MiMo — Product Experience Blueprint

> **The definitive design blueprint. Z.ai simplicity + ZCode task depth + MiMo Life OS model.**
> Built on: existing research reconciliation + competitive interaction matrix + Z.ai/ZCode deep study.

---

## 1. Product Philosophy

### 1.1 What MiMo Is

MiMo is a **private, single-user Personal AI Operating System**.

One intelligent operating environment that replaces the need to switch between many AI products. The user says "I need this" and MiMo determines: intent, model, tools, research, task creation, agent delegation, context, approval, background work, artifact, memory.

### 1.2 Three Words: Calm. Alive. Mine.

- **Calm** — default is one conversation on a clean surface. No dashboard. No chrome.
- **Alive** — when MiMo works, you see real actions (Action Trace, not spinner).
- **Mine** — memory is visible, correctable, local-first.

### 1.3 The ONE Thesis

> **The conversation is the operating system; everything else slides in to support it.**

### 1.4 The Mental Model

```
Conversation (permanent spine)
→ Intent (what the user wants)
→ Context (what MiMo knows — memory + knowledge + GraphRAG)
→ Model/Agent selection (effort + routing)
→ Task (execution unit with lifecycle)
→ Execution (tools, research, sub-agents)
→ Verification (check the result)
→ Result (inline in conversation)
→ Artifact (durable output)
→ Memory (auto-extracted)
→ Knowledge (derived)
→ Timeline (recorded)
```

The user does NOT operate each layer. MiMo orchestrates them.

---

## 2. Information Architecture

### 2.1 What Is Always Visible

| Element | Location | Why |
|---------|----------|-----|
| Conversation | Center (760px max, centered) | The spine — permanent, never replaced |
| Composer | Bottom (760px max, centered) | Primary control surface |
| Rail | Left edge (48px) | Minimal navigation (4 buttons + logo) |

### 2.2 What Is Summoned

| Element | Trigger | Location |
|---------|---------|----------|
| Sidebar | Rail icon / ⌘B | Right side (340px) |
| Command Palette | ⌘K | Center overlay |
| Universal Search | ⌘/ | Center overlay |
| Project Switcher | ⌘P | Via command palette |
| Task detail panel | Click task card | Right side panel |
| Artifact panel | Click artifact | Right side panel |
| Settings | S key | Modal |

### 2.3 What Is Contextual (appears when relevant)

| Element | When | Where |
|---------|------|-------|
| Action Trace | AI working | Inline in conversation |
| Task card | Task created | Inline in conversation |
| Approval card | Sensitive action | Inline in conversation |
| Error card | Error occurs | Inline in conversation |
| Background task indicator | Task minimized | Bottom of conversation |
| Memory citation | MiMo uses a memory | Inline `[mem:abc]` expandable |
| Knowledge link | MiMo uses an entity | Inline `[ent:xyz]` expandable |
| Artifact card | Artifact produced | Inline in conversation |

### 2.4 What Is Background

| Element | Behavior |
|---------|----------|
| Long-running tasks | Minimize to indicator; user continues chatting |
| Memory auto-extraction | Happens silently after each conversation turn |
| Knowledge graph updates | Derived from memory; happens in background |
| EventLog persistence | Every action logged; visible in Timeline |

### 2.5 What Is Advanced (progressive disclosure)

| Element | How to access |
|---------|---------------|
| Effort/Model details | Composer effort dropdown → expand |
| Tool execution details | Action Trace → Level 3 (click an action) |
| Agent internals | Task detail panel → expand |
| Sandbox/Execution details | Action Trace → Level 3 (only when relevant) |

### 2.6 What Is Completely Hidden

| Element | Why |
|---------|-----|
| Runtime metrics (CPU, memory) | Not relevant to life OS |
| Developer tools | Not a developer tool |
| MCP server management | Internal agent capability |
| Sandbox profile/permissions | Internal agent capability |
| Process list | Internal agent capability |
| Database internals | Internal |
| Provider SDK | Internal (adapter pattern) |

---

## 3. Navigation Model

### 3.1 The Rail (48px)

```
┌──┐
│M │  Logo (click → conversation)
├──┤
│✦ │  ⌘K (command palette — universal entry)
├──┤
│🧠│  Memory (→ sidebar Memory view)
│🔗│  Knowledge (→ sidebar Knowledge view)
├──┤
│  │  (flex spacer)
├──┤
│👤│  Account (popover: theme, settings)
└──┘
```

4 buttons + logo. Minimal. Quiet.

### 3.2 No Top Bar

There is NO persistent top bar. The conversation fills the vertical space.

### 3.3 Sidebar (summoned, 340px)

5 views, switched by rail icons or tabs:
1. **Context** — current AI state + "what MiMo knows" stats + recent activity
2. **Memory** — browse all memories, filter, edit, delete
3. **Knowledge** — browse entities by type, see relationships
4. **Tasks** — browse all tasks (active + history)
5. **Timeline** — human-readable activity (not raw events)

---

## 4. Default Screen

### 4.1 Empty State (no conversation)

```
┌──────────────────────────────────────────┐
│                                          │
│                                          │
│              ┌────┐                      │
│              │ M  │                      │
│              └────┘                      │
│                                          │
│            مرحباً                         │
│                                          │
│   أنا MiMo — نظامك الشخصي.               │
│   اسألني، كلّفني مهمة، أو اطلب بحثاً.    │
│   أتذكّر ما يهمّك وأتعلم من كل محادثة.   │
│                                          │
│   [حلل خطة أسبوعي]  [ابحث بعمق]          │
│   [اكتب كوداً]      [خطّط لمشروع]         │
│                                          │
│                                          │
├──────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │ اسأل MiMo…                        │   │
│  │                                    │   │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤] │   │
│  └──────────────────────────────────┘   │
│  MiMo يعمل محلياً · Enter للإرسال        │
└──────────────────────────────────────────┘
```

Calm. Personal. No dashboard. No KPIs. No fake stats.

### 4.2 Active Conversation

```
┌──────────────────────────────────────────┐
│  ┌──┐                                     │
│  │M │  مرحباً، من أنت؟                    │
│  └──┘                                     │
│                                           │
│  أنا MiMo — نظام التشغيل الذكي الشخصي... │
│                                           │
│                          ┌──────────────┐ │
│                          │ مرحبا، من أنت؟│ │
│                          └──────────────┘ │
│                                           │
│  ┌──┐                                     │
│  │M │  أنا MiMo...                         │
│  └──┘                                     │
│                                           │
├──────────────────────────────────────────┤
│  ┌──────────────────────────────────┐   │
│  │ اسأل MiMo…                        │   │
│  │ [محادثة ▾] [متوازن ▾]    [✦] [➤] │   │
│  └──────────────────────────────────┘   │
└──────────────────────────────────────────┘
```

Messages are intelligent documents. User messages: subtle raised background, right-aligned. AI messages: transparent, left-aligned, small "M" mark. Action buttons hidden until hover.

---

## 5. Composer

### 5.1 Default State (calm)

```
┌──────────────────────────────────┐
│ اسأل MiMo…                        │
│                                    │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤] │
└──────────────────────────────────┘
MiMo يعمل محلياً · Enter للإرسال · ⌘K للأوامر
```

- **Mode selector**: محادثة / بحث / كود / كتابة (4 modes, not 8)
- **Effort selector**: سريع / متوازن / عميق (maps to ModelRouter FAST/BALANCED/DEEP)
- **Tools toggle** (✦): reveals deep think, web search, image gen, voice
- **Send** (➤): accent color when text present

### 5.2 Expanded State (tools revealed)

```
┌──────────────────────────────────┐
│ اسأل MiMo…                        │
│                                    │
│ [محادثة ▾] [متوازن ▾] [✦]        │
│ [🧠] [🌐] [🖼️] [🎤]    [➤]      │
└──────────────────────────────────┘
```

### 5.3 Effort Selector

| Level | Label | Maps to | Use case |
|-------|-------|---------|----------|
| Fast | سريع | FAST profile | Quick answers, simple questions |
| Balanced | متوازن | BALANCED profile | Default — good quality, reasonable speed |
| Deep | عميق | DEEP profile | Complex planning, research, analysis |

**NOT** a separate "mode" — it's a per-turn knob (inspired by Z.ai's toggleable thinking).

---

## 6. Conversation

### 6.1 Message Types

- **User message**: subtle raised background, right-aligned, no avatar
- **AI message**: transparent background, left-aligned, 28px "M" mark
- **Action Trace**: inline (when AI working) — verb + object + count
- **Task card**: inline (when task created) — lifecycle, steps, progress
- **Artifact card**: inline (when artifact produced) — preview, expand
- **Memory citation**: inline `[mem:abc]` → expandable card
- **Knowledge link**: inline `[ent:xyz]` → expandable card
- **Approval card**: inline (when sensitive action) — Review/Approve/Reject
- **Error card**: inline (when error) — What/Why/Actions

### 6.2 Message Actions (hidden until hover)

- Copy
- Regenerate (future)
- Edit (future)
- Save to memory (future)
- Create task (future)

---

## 7. Agent Experience (Action Trace)

### 7.1 Never Expose Chain-of-Thought

MiMo shows **operational state**, never internal reasoning.

### 7.2 Action Trace Levels

**Level 1** (default — single line):
```
◐ ينفذ — يستدعى أداة البحث
```

**Level 2** (expanded — action trace):
```
◐ ينفذ — بناء نظام المصادقة
─────────────────────────
✓ حلل السياق — الذاكرة والمعرفة
✓ بنى الخطة — 5 خطوات
→ يبحث عن أفضل ممارسات JWT
  · يبحث في الويب…
✓ اكتمل
```

**Level 3** (click an action → details):
```
يبحث عن أفضل ممارسات JWT
  المصادر: 8 نتائج ويب
  الأداة: web_search
  المدة: 3.2 ثانية
```

---

## 8. Task Model

### 8.1 What is a Task?

A Task is a unit of agent work with a lifecycle. It represents anything MiMo does that has a beginning and end:
- Research something
- Plan a trip
- Learn a subject
- Organize a project
- Prepare a decision
- Analyze documents
- Execute a workflow

### 8.2 Task Lifecycle

```
User request
→ Task created (inline card appears)
→ Understanding ("فهمت الهدف")
→ Planning ("أرتب الخطوات — 5 خطوات")
→ [Approval gate if file-modifying or irreversible]
→ Execution ("أنفذ الخطوة 2 من 5")
→ Tool calls ("أستدعى أداة البحث")
→ Observation ("أحلل النتائج")
→ Verification ("أتحقق من النتيجة")
→ Completed (artifact produced)
```

### 8.3 Task Card (inline, collapsed)

```
┌─────────────────────────────────────────┐
│ ● ينفذ — بناء نظام المصادقة              │
│ الخطوة 2 من 5 · 45 ثانية                 │
│ [فتح التفاصيل]  [إلغاء]                  │
└─────────────────────────────────────────┘
```

### 8.4 Task Card (expanded)

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

### 8.5 Background Task

```
┌─────────────────────────────────────────┐
│ ◐ مهمة في الخلفية — بناء نظام المصادقة   │
│ الخطوة 2 من 5 · [فتح]                    │
└─────────────────────────────────────────┘
```

### 8.6 Task Detail Panel (summoned)

Shows: goal, status, progress, steps, tools used, files changed, artifacts produced, timeline, checkpoints, recovery.

---

## 9. Projects

### 9.1 Projects are Living Contexts

A project is NOT a folder. It's a living workspace:
- Purpose (what is this project about?)
- Current state (what's happening now?)
- Goals (what are we trying to achieve?)
- Active tasks (what's being worked on?)
- Recent activity (what happened recently?)
- Important knowledge (key entities)
- Files (project-scoped)
- Artifacts (outputs)

### 9.2 Project Entry

Via ⌘P (command palette → project switcher). Entering a project:
- Conversation scope changes (project-scoped memory + knowledge)
- Project chip appears in composer
- Sidebar shows project context

---

## 10. Memory

### 10.1 Inline Citations

When MiMo uses a memory:
```
[mem:abc] → expandable card:
  ┌─────────────────────────────────────────┐
  │ 🧠 ذاكرة                                │
  │ "المستخدم يفضّل العمل ليلاً"             │
  │ المصدر: محادثة 2024-08-15                │
  │ الثقة: 85%  · نوع: تفضيل                 │
  │ [تعديل]  [حذف]  [إخفاء]                 │
  └─────────────────────────────────────────┘
```

### 10.2 Memory View (sidebar)

Browse all memories:
- Filter by type (fact / preference / skill / goal / event)
- Search
- Edit (inline)
- Delete (soft-delete with confirmation)
- See provenance (source, date, confidence, related entities)

### 10.3 "What does MiMo know about you?"

In Context sidebar view: real counts (no fake stats), with links to browse.

---

## 11. Knowledge

### 11.1 Inline Entity Links

When MiMo references a knowledge entity:
```
[ent:xyz] → expandable card:
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

### 11.2 Knowledge View (sidebar)

Browse entities by type. Relationships as list (not decorative graph).

---

## 12. Artifacts

### 12.1 Inline Artifact Cards

```
┌─────────────────────────────────────────┐
│ 📄 تقرير تحليل البيانات                   │
│ نوع: تقرير  · 4 صفحات                    │
│ [معاينة]  [نسخ]  [تصدير]  [حفظ]         │
└─────────────────────────────────────────┘
```

### 12.2 Artifact Types

- Documents (reports, plans, summaries)
- Code (scripts, functions)
- Images (generated)
- Diagrams (structured visualizations)
- Tables (structured data)
- Research results

---

## 13. Research

### 13.1 Research as a Task Type

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

## 14. Approvals

### 14.1 Approval Levels

| Level | Behavior | Example |
|-------|----------|---------|
| Informational | No approval | "ذكرت أنك تفضّل العمل ليلاً" |
| Reversible | Automatic | "حفظت ذاكرة جديدة" |
| Important | Ask before executing | "تعديل 6 ملفات في المشروع" |
| Irreversible | Always require approval | "حذف مشروع" |

### 14.2 Inline Approval Card

```
⚠ موافقة مطلوبة
MiMo يريد تعديل 6 ملفات في مشروع "تطوير الويب"
[مراجعة التغييرات] [موافقة] [رفض]
```

---

## 15. Errors

### 15.1 Inline Error Card

```
تعذر إكمال المهمة

حدث خطأ أثناء تنفيذ الخطوة 4.

MiMo يستطيع:
[إعادة المحاولة]  [محاولة طريقة أخرى]  [عرض التفاصيل]
```

Never raw stack traces. Always actionable.

---

## 16. Command Palette (⌘K)

### 16.1 Capabilities

- Navigate: open memory, knowledge, timeline, tasks
- Search: find project, file, artifact, conversation
- Actions: new conversation, create task, start research
- Settings: toggle theme, open settings

### 16.2 Prefix Grammar (future)

- `>` — actions
- `@` — entities (memory, knowledge, project)
- `/` — slash commands (clear, compact, forget)
- `#` — search by tag

---

## 17. Visual Direction

### 17.1 Color

- **Background**: warm-neutral (stone-based, not pure black)
- **Surface**: slightly raised (cards, composer, sidebar)
- **Text**: high contrast (stone-900 / stone-50)
- **ONE accent**: violet (#6d28d9 light / #a78bfa dark)
- **AI states**: thinking (violet), retrieving (cyan), executing (orange), success (green), warning (amber), error (red)

### 17.2 Typography

- IBM Plex Sans Arabic (Arabic primary)
- System sans (English)
- JetBrains Mono (code)
- Scale: 24/17/15/14/13/12/11px
- Weights: 400/500/600

### 17.3 Spacing

4px grid: 4/8/12/16/20/24/32/40/48/64

### 17.4 Motion

- 0ms (enter) / 120ms (hover) / 200ms (slide) / 300ms (overlay) / 400ms ceiling (modal)
- Easing: cubic-bezier(0.05, 0.7, 0.1, 1.0)
- Asymmetric: enter instantly, exit 150ms fade
- Reduced motion: all instant

---

## 18. Capability → Experience Matrix

| Capability | Backend | API | Desired Surface | Trigger | Visibility | Reference |
|-----------|---------|-----|----------------|---------|------------|-----------|
| Conversation | ✅ | ✅ | Center (permanent) | Always | Always visible | Z.ai |
| Memory | ✅ | ✅ | Inline + sidebar | Contextual | Progressive | Claude + MiMo |
| Knowledge | ✅ | ✅ | Inline + sidebar | Contextual | Summoned | Obsidian + MiMo |
| GraphRAG | ✅ | ✅ | Inline citations | Automatic | Contextual | NotebookLM |
| Tasks | ✅ | ✅ | Inline + sidebar | Intent | Contextual | ZCode |
| Agents | ✅ | ✅ | Action Trace | Execution | Progressive | Manus |
| Tools | ✅ | ✅ | Action Trace details | Execution | Progressive | ZCode |
| Runtime | ✅ | ✅ | Hidden (internal) | N/A | Hidden | N/A |
| Sandbox | ✅ | ✅ | Hidden (internal) | N/A | Hidden | N/A |
| Artifacts | ✅ | ⚠️ | Inline + panel | Result | Contextual | Claude |
| Projects | ✅ | ⚠️ | Context switcher | Navigation | Summoned | ZCode |
| Search | ✅ | ✅ | ⌘/ overlay | Keyboard | Summoned | Perplexity |
| Command | N/A | N/A | ⌘K overlay | Keyboard | Summoned | Linear + Raycast |
| Model Router | ✅ | ✅ | Effort selector | Composer | Progressive | Z.ai |
| Events/SSE | ✅ | ✅ | Action Trace + Timeline | Automatic | Contextual | OpenHands |
| Timeline | ✅ | ✅ | Sidebar view | Navigation | Summoned | MiMo |
| Backup | ✅ | ✅ | Settings | Action | Summoned | MiMo |

---

## 19. User Flows

### Simple Question
```
Open MiMo → type → answer
```

### Complex Study Task
```
Ask → understand → plan → research → execute → verify → result → save artifact → optionally remember
```

### Long-Running Project
```
Project → task → background execution → user continues conversation → notification → result
```

### Research
```
Question → source discovery → evaluation → synthesis → cited answer → research artifact
```

### Consequential Action
```
Intent → plan → approval → execute → verify → report
```

---

## 20. Implementation Strategy

### Phase 1: Visual Foundation
- Design tokens (already in globals.css)
- Primitives (buttons, inputs, cards)

### Phase 2: Shell
- Shell.tsx (already rebuilt)
- Rail.tsx (already rebuilt)

### Phase 3: Conversation
- ChatView.tsx (already rebuilt)
- Composer.tsx (already rebuilt)
- MessageItem.tsx (already rebuilt)

### Phase 4: Agent Experience
- AgentStatus.tsx (already rebuilt with Action Trace)

### Phase 5: Tasks
- TaskCard.tsx (already built)
- BackgroundTaskIndicator.tsx (already built)
- Task API (already built)

### Phase 6: Memory + Knowledge
- Inline memory citations (NEW — needs `[mem:abc]` rendering)
- Inline knowledge links (NEW — needs `[ent:xyz]` rendering)
- Sidebar views (already built)

### Phase 7: Artifacts
- Inline artifact cards (NEW)
- Artifact API (NEEDS — no CRUD API yet)

### Phase 8: Search + Command
- UniversalSearch.tsx (already built)
- CommandPalette.tsx (already built — needs prefix grammar)

### Phase 9: Approvals + Errors
- Inline approval cards (NEW)
- Inline error cards (NEW)

### Phase 10: Responsive + RTL + Accessibility
- Verify breakpoints
- Verify RTL
- Verify keyboard
- Verify ARIA

---

## 21. What Will Be Deleted from Old UI

| Component | Why |
|-----------|-----|
| None currently (old components already deleted in prior sessions) | Already cleaned |

The current 18 active components are the clean set. No deletions needed.

## 22. What Will Be Rebuilt

| Component | Why | Priority |
|-----------|-----|----------|
| MessageItem | Add inline `[mem:abc]`, `[ent:xyz]`, artifact cards, approval cards, error cards | HIGH |
| Composer | Add slash commands (future) | MEDIUM |
| AgentStatus | Already has Action Trace — verify event mapping | LOW |
| Sidebar | Verify all 5 views work with real data | MEDIUM |
| CommandPalette | Add prefix grammar | MEDIUM |

## 23. What Remains Untouched in Backend

ALL backend code remains:
- Core (agents, memory, knowledge, GraphRAG, tools, runtime, sandbox)
- APIs (chat, conversations, tasks, events, search, workspace, dev, backup, agents/recover)
- Prisma models (all 19 models)
- SSE stream
- EventLog persistence

## 24. What Requires Approval Before Coding

1. **Inline citation rendering** — `[mem:abc]` and `[ent:xyz]` syntax in AI messages. Requires the AI to emit these tokens, or post-processing of AI responses to insert citations. Which approach?

2. **Artifact API** — No CRUD API exists for life-side artifacts (only DevProject artifacts). Should we create `/api/artifacts` with GET/POST/PATCH/DELETE? Or reuse the existing Artifact Prisma model with new routes?

3. **Approval flow** — ToolPolicyEngine has `requiresConfirmation` but no UI to surface it. Should approvals come from the tool policy engine (automatic) or from a new approval API?

4. **Memory edit/delete API** — UI has edit/delete buttons but no `PATCH/DELETE /api/mimo/memory/[id]` routes. Should we add these?

---

## 25. Final Answers to the 15 Questions

1. **Default screen**: Conversation fills viewport. Empty state: calm "M" logo + greeting + 4 suggestion chips. Composer at bottom.
2. **Always visible**: Conversation, composer, rail (48px, 4 buttons + logo).
3. **Summoned**: Sidebar (⌘B), command palette (⌘K), universal search (⌘/), project switcher (⌘P), settings (S), task detail panel, artifact panel.
4. **Composer**: Textarea + mode selector + effort selector + tools toggle + send. Progressive disclosure.
5. **Conversation**: Messages (user + AI), action trace, task cards, artifact cards, memory citations, knowledge links, approval cards, error cards.
6. **Tasks**: Inline task cards with lifecycle + plan + steps + pause/cancel. Background task indicator. Task detail panel (summoned).
7. **Projects**: Context switcher (⌘P). Entering a project scopes memory + knowledge + conversation.
8. **Sidebar**: 5 views (Context/Memory/Knowledge/Tasks/Timeline). Summoned, not default.
9. **Command palette**: ⌘K. Actions + navigation + search. Prefix grammar (future).
10. **Search**: ⌘/ universal search. Across conversations, memories, knowledge, tasks, artifacts, files.
11. **Inline**: Memory citations, knowledge links, task cards, artifact cards, approval cards, error cards, action trace.
12. **Contextual**: Action trace (when AI working), background task indicator (when task minimized).
13. **Background**: Long-running tasks, memory auto-extraction, knowledge updates, event log.
14. **Advanced**: Effort/model details, tool execution details, agent internals, sandbox details.
15. **Hidden**: Runtime metrics, developer tools, MCP management, sandbox profiles, process list, database internals, provider SDK.
