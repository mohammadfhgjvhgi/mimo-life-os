# MiMo — Z.ai × ZCode Product Blueprint

> **The definitive implementation blueprint. Z.ai simplicity + ZCode task depth + MiMo Life OS.**
> Built on: recovered research (54 products, 16 academic, 16 patterns, 28 architecture docs) + Z.ai/ZCode deep study.

---

## A. Product Mental Model

MiMo is ONE intelligent operating environment — not many AI features.

```
Layer 1 — Conversation (universal entry point)
Layer 2 — Context (what MiMo knows: memory + knowledge + GraphRAG)
Layer 3 — Intelligence (reasoning, models, research, tools, agents)
Layer 4 — Execution (tasks, actions, background work, approvals)
Layer 5 — Results (answers, artifacts, decisions, changes)
Layer 6 — Memory (what should persist)
Layer 7 — Knowledge (what MiMo understands about the user's world)
Layer 8 — Timeline (what happened over time)
```

The user expresses intent. MiMo orchestrates all layers. The user never operates each layer manually.

---

## B. Primary User Journey

### Simple question
```
Open MiMo → type → answer
```

### Complex task
```
Ask → MiMo understands intent
→ gathers context (memory, knowledge, GraphRAG)
→ creates task (inline card)
→ plans (expandable steps)
→ [approval if needed]
→ executes (Action Trace)
→ produces result
→ saves artifact (inline card)
→ extracts memory (automatic)
→ updates knowledge (automatic)
→ records in timeline (automatic)
```

### Background task
```
Start task → task minimizes → user continues chatting
→ notification on completion → expand to see result
```

---

## C. Global Information Architecture

### Always Visible
| Element | Location | Why |
|---------|----------|-----|
| Conversation | Center (760px max, centered) | The permanent spine |
| Composer | Bottom (760px max, centered) | Primary control surface |
| Rail | Left edge (48px, 4 buttons + logo) | Minimal navigation |

### Summoned
| Element | Trigger | Location |
|---------|---------|----------|
| Sidebar | Rail icon / ⌘B | Right (340px, resizable) |
| Command Palette | ⌘K | Center overlay (640px max) |
| Universal Search | ⌘/ | Center overlay (640px max) |
| Task detail | Click task card | Right side panel |
| Settings | S key / account | Modal |

### Contextual (inline in conversation)
| Element | When |
|---------|------|
| Action Trace | AI working |
| Task card | Task created |
| Artifact card | Artifact produced |
| Memory citation | MiMo uses a memory |
| Knowledge link | MiMo references an entity |
| Approval card | Sensitive action |
| Error card | Error occurs |
| Background task indicator | Task minimized |

### Hidden
Runtime metrics, developer tools, MCP, sandbox, processes, database internals, provider SDK.

---

## D. Screen Hierarchy

```
┌────────┬──────────────────────────────────────┐
│        │                                      │
│  Rail  │         Conversation                  │
│ (48px) │         (760px max, centered)         │
│        │                                      │
│  [M]   │         [Action Trace if working]     │
│  [⌘K]  │         [Task cards if any]           │
│  [🧠]  │         [Artifact cards if any]       │
│  [🔗]  │         [Memory citations]             │
│  [👤]  │         [Approval cards]               │
│        │         [Error cards]                 │
│        │                                      │
│        ├──────────────────────────────────────┤
│        │  [Background task indicator if any]   │
│        ├──────────────────────────────────────┤
│        │  Composer (760px max)                │
│        │  [mode] [effort] [tools] [send]       │
│        └──────────────────────────────────────┘
│                                                │
│        Sidebar (340px) — summoned right        │
│        [Context] [Memory] [Knowledge]          │
│        [Tasks] [Timeline]                       │
└────────────────────────────────────────────────┘
```

---

## E. Shell Structure

### Layout
```
┌──────┬────────────────────────────────────────┐
│      │                                        │
│ Rail │           Conversation                 │
│ 48px │           (flex 1, centered)           │
│      │                                        │
│      ├────────────────────────────────────────┤
│      │  Action Trace (if working, 760px max)  │
│      ├────────────────────────────────────────┤
│      │  Background indicator (if any)        │
│      ├────────────────────────────────────────┤
│      │  Composer (760px max, centered)        │
│      └────────────────────────────────────────┘
└──────┴────────────────────────────────────────┘
  Sidebar (340px) summoned right
```

### Dimensions
- Rail: 48px (box-sizing: border-box)
- Conversation max-width: 760px
- Composer max-width: 760px
- Sidebar: 340px (resizable 280-440px)
- No top bar (removed)
- No persistent tabs (conversation is permanent)

### Responsive
- > 960px: full shell (rail + conversation + summoned sidebar)
- 640-960px: sidebar becomes overlay, rail stays
- < 640px: rail becomes bottom bar (44px), conversation full-width

---

## F. Conversation Structure

### Message Types
- **User**: raised bg, right-aligned, no avatar, 72% max-width
- **AI**: transparent bg, left-aligned, 28px "M" mark, action buttons on hover
- **Action Trace**: inline (verb + object + count), pulsing dot
- **Task card**: inline (lifecycle, steps, progress)
- **Artifact card**: inline (preview, expand, actions)
- **Memory citation**: inline `[mem:abc]` → expandable
- **Knowledge link**: inline `[ent:xyz]` → expandable
- **Approval card**: inline (what/why/approve/reject)
- **Error card**: inline (what/why/retry/fix/details)

### Spacing
- 20px between messages
- 24px horizontal padding
- 32px top padding (first message)

---

## G. Composer Structure

### Default (calm)
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│                                            │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
MiMo يعمل محلياً · Enter للإرسال · ⌘K للأوامر
```

### Expanded (tools revealed)
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│                                            │
│ [محادثة ▾] [متوازن ▾] [✦]                │
│ [🧠] [🌐] [🖼️] [🎤]    [➤]              │
└──────────────────────────────────────────┘
```

### Controls
- **Mode**: محادثة / بحث / كود / كتابة (4 modes, not 8)
- **Effort**: سريع / متوازن / عميق (maps to ModelRouter FAST/BALANCED/DEEP)
- **Tools** (✦ toggle): deep think, web search, image gen, voice
- **Send** (➤): accent when text present, disabled when empty
- **Stop** (⏹): replaces Send when AI working

### Design
- Tonal elevation (no hard border)
- Surface: `--m-surface`
- Focus: shadow elevation change (not border)
- 14px radius
- 760px max-width

---

## H. Z.ai-Inspired Interaction Patterns

1. **Effort as per-turn knob** (not permanent mode) — Z.ai's toggleable thinking
2. **Model selection in composer** — not in settings (ChatGPT 2025 trend, Z.ai likely follows)
3. **Single-agent philosophy** — one coherent intelligence, not a swarm
4. **3-layer search** — API + Chat RAG + Search Agent → inline citations + search API + research agent
5. **Context caching** — memory + knowledge act as cached context
6. **⌘K** — universal command entry
7. **Streaming** — token-by-token rendering (already implemented)

---

## I. ZCode-Inspired Agent/Task Patterns

1. **Task continuity** — goal + context + plan + execution + results stay connected in ONE task
2. **Execution modes** — Plan (propose before execute) / Auto (proceed automatically) / Goal (work until complete)
3. **Plan Mode** — inline task card with editable plan (markdown, source of truth)
4. **Memory across sessions** — persistent memory + knowledge
5. **Long-horizon tasks** — tasks that run for hours (GLM-5.1: up to 8 hours)
6. **Automations** — scheduled/recurring tasks (future)
7. **Approvals** — "Allow Once" / "Always Allow" for sensitive actions

---

## J. Supporting Patterns

### From Claude
- Artifacts → inline cards (not side panel)
- Persistent memory → visible, editable, deletable
- Context compaction → long conversation management

### From Manus
- Live runtime → Action Trace (real actions, not spinner)
- Plan Mode (markdown) → inline task plan
- Approvals → inline approval cards

### From NotebookLM
- Source-grounding → GraphRAG + memory as implicit grounding
- Per-claim citation → inline `[1]`, `[2]` expandable

### From Linear
- Keyboard language → ⌘K + single-key + hold-Space
- Asymmetric motion → enter 0ms, exit 150ms
- Calm density → dense but disciplined

### From Cursor
- Plan → approve → execute → checkpoint
- Checkpoints → task recovery

### From Perplexity
- Clarifying questions → research task asks before searching
- Numbered citations → `[1]`, `[2]` inline

### From Raycast
- Prefix grammar → `>` `@` `/` `#` in command palette

---

## K. Sidebar Behavior

### Summoned (not default)
- Trigger: rail icon (Memory/Knowledge) or ⌘B
- Width: 340px, resizable 280-440px
- Enter: 0ms (instant). Exit: 200ms slide.
- 5 views: Context / Memory / Knowledge / Tasks / Timeline

### View: Context
- Current AI state (if working)
- "What MiMo knows" stats (real counts)
- Recent activity (5 events)

### View: Memory
- Browse all memories
- Filter by type (fact/preference/skill/goal/event)
- Search
- Edit (inline)
- Delete (soft-delete with confirmation)
- Provenance (source, date, confidence, related)

### View: Knowledge
- Browse entities by type
- See relationships (list, not graph)
- See evidence + sources
- Confidence + evidence count

### View: Tasks
- Browse all tasks (active + history)
- Status indicators
- Click to expand

### View: Timeline
- Human-readable activity (not raw events)
- Filter by type (user/AI/task/memory/error)
- Search

---

## L. Command Palette (⌘K)

### Capabilities
- Navigate: open memory, knowledge, timeline, tasks
- Search: find project, file, artifact, conversation
- Actions: new conversation, create task, start research
- Settings: toggle theme, open settings

### Prefix Grammar (future)
- `>` — actions
- `@` — entities (memory, knowledge, project)
- `/` — slash commands (clear, compact, forget)
- `#` — search by tag

### Design
- Glass backdrop overlay
- Centered input (640px max)
- Categorized results
- Keyboard: ↑/↓ navigate, Enter execute, Esc close

---

## M. Universal Search (⌘/)

### Sources
- Conversations
- Messages
- Memories
- Knowledge entities
- Projects
- Tasks
- Artifacts
- Files
- Events

### Design
- Glass backdrop overlay
- Centered input (640px max)
- Categorized results with provenance
- Keyboard navigation

---

## N. Project Experience

### Projects are Living Contexts
- Purpose, current state, goals, active tasks, recent activity
- Important knowledge, files, artifacts, decisions, timeline

### Entry
- Via ⌘P (command palette → project switcher)
- Entering a project scopes memory + knowledge + conversation
- Project chip appears in composer

---

## O. Memory Experience

### Inline Citations
When MiMo uses a memory: `[mem:abc]` → expandable card with content, source, confidence, date, edit/delete.

### Sidebar Browse
Filter, search, edit, delete. Provenance for every memory.

### "What does MiMo know about you?"
Real counts in Context view. No fake stats.

---

## P. Knowledge Experience

### Inline Entity Links
When MiMo references an entity: `[ent:xyz]` → expandable with type, confidence, relationships, evidence.

### Sidebar Browse
Browse by type. Relationships as list (not decorative graph).

---

## Q. Research Experience

### Research as a Task Type
```
📚 بحث — أفضل ممارسات JWT
✓ بحث في 8 مصادر
✓ قيّم المصداقية
→ يركّب الإجابة
[عرض المصادر] [حفظ كبحث]
```

### Citations
Inline `[1]`, `[2]` → expandable to source + quote.

---

## R. Artifact Experience

### Inline Artifact Cards
```
📄 تقرير تحليل البيانات
نوع: تقرير · 4 صفحات
[معاينة] [نسخ] [تصدير] [حفظ]
```

### Types
Documents, code, images, diagrams, tables, research results.

### Connected
Artifacts link to originating conversation + task + project.

---

## S. Task Experience

### Lifecycle
```
pending → planning → executing → validating → done/error/cancelled
                     ↕ paused
```

### Inline Task Card
Collapsed: status + intent + progress
Expanded: goal, steps, tools, files, artifacts, errors, pause/cancel/resume

### Background Task
Minimizes to calm indicator. User continues chatting. Click to expand.

### Task Detail Panel (summoned)
Full view: goal, status, progress, steps, tools, files, artifacts, timeline, checkpoints, recovery.

---

## T. Agent Experience

### Action Trace (NOT chain-of-thought)
- Level 1: verb + object + pulsing dot
- Level 2: full action trace with checkmarks + counts
- Level 3: details (sources, tools, files, citations)

### Never
- Chain-of-thought
- Internal reasoning
- Fake "thinking..."
- Spinner

---

## U. Approval Experience

### Levels
| Level | Behavior | Example |
|-------|----------|---------|
| Informational | No approval | Memory cited |
| Reversible | Automatic | Memory stored |
| Important | Ask before | File modifications |
| Irreversible | Always require | Delete project |

### Inline Approval Card
```
⚠ موافقة مطلوبة
MiMo يريد تعديل 6 ملفات
[مراجعة] [موافقة] [رفض]
```

---

## V. Error/Recovery Experience

### Inline Error Card
```
تعذر إكمال المهمة
حدث خطأ أثناء تنفيذ الخطوة 4.
[إعادة المحاولة] [طريقة أخرى] [التفاصيل]
```

Never raw stack traces. Always actionable.

---

## W. Background Task Experience

### Indicator
```
◐ مهمة في الخلفية — بناء نظام المصادقة
الخطوة 2 من 5 · [فتح]
```

User continues chatting. Click to expand task list.

---

## X. Responsive Behavior

| Width | Shell |
|-------|-------|
| > 960px | Full: rail + conversation + summoned sidebar |
| 640-960px | Sidebar becomes overlay, rail stays |
| < 640px | Rail becomes bottom bar (44px), conversation full-width |

---

## Y. RTL Behavior

- `direction: rtl` on root
- User messages: right-aligned
- AI messages: left-aligned
- Rail: left edge (RTL "start")
- Sidebar: right edge (RTL "end")
- Code blocks: `direction: ltr` forced
- IBM Plex Sans Arabic (designed for RTL)

---

## Z. Visual Hierarchy

### Color
- Background: warm-neutral (#fafaf9 light / #0c0a09 dark)
- Surface: slightly raised
- ONE accent: violet (#6d28d9 light / #a78bfa dark)
- AI states: thinking, retrieving, executing, success, warning, error
- No decorative gradients

### Typography
- IBM Plex Sans Arabic
- Scale: 24/17/15/14/13/12/11px
- Weights: 400/500/600

### Spacing
4px grid: 4/8/12/16/20/24/32/40/48/64

### Motion
0/120/200/300/400ms tiers. Asymmetric (enter 0ms, exit 150ms). Reduced motion: all instant.

### Density
Calm by default. Dense when summoned (sidebar). Never overwhelming.
