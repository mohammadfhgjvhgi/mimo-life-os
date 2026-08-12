# MiMo — Final Implementation Plan

> **How exactly will we turn the current empty chat-like shell into the complete MiMo Life OS interface?**
> This is a concrete component-level architecture document, not vague design language.

---

## 1. Current Architecture

### Current UI State
The UI is an empty chat screen with:
- A hidden rail (appears on mouse hover at right edge)
- A bottom composer bar
- Full-width conversation area
- Summoned sidebar overlay (5 tabs)
- No visible navigation, tasks, memory, knowledge, artifacts, or timeline by default

### Core Problem
"Conversation-first" was interpreted as "conversation-only." The interface hides ALL capabilities behind a hidden rail and an empty conversation. A beautiful empty chat is still an empty chat. MiMo is a Life OS, not a chat app.

### Backend (ASSET — fully functional)
| Capability | Backend | API | Status |
|-----------|---------|-----|--------|
| Chat pipeline | runWorkflow (Context→Reason→Plan→Execute→Validate) | `/api/chat` | ✅ |
| Conversations | Prisma Conversation + Message | `/api/conversations` | ✅ |
| Memory | MemoryEngine + MemoryIntelligence + 6 types + consolidation | `/api/mimo/workspace` (read only) | ⚠️ No CRUD API |
| Knowledge | KnowledgeGraph + GraphRAG + entities + relationships | `/api/knowledge/graph` | ✅ Read only |
| Tasks | Task model + AgentLifecycle + CheckpointManager | `/api/tasks` (CRUD) | ✅ |
| Events | EventBus + EventLog (persistent) + SSE | `/api/events` + `/api/events/stream` | ✅ |
| Search | HybridSearch + Web search | `/api/search` + `/api/mimo/workspace?q=` | ✅ |
| Artifacts | Prisma Artifact model | ❌ No API | Model exists |
| Image gen | ImageCapability | `/api/image` | ✅ |
| Backup | BackupEngine | `/api/backup` | ✅ |
| Projects | Prisma Project model | ❌ No API | Model exists |
| Files | Prisma File model | ❌ No API | Model exists |
| Agent recovery | CheckpointManager | `/api/agents/recover` | ✅ |
| Model routing | ModelRouter (5 profiles) + executeWithFallback | Internal (wired to WriterAgent) | ✅ |
| Tool policy | ToolPolicyEngine (risk + confirmation) | Internal | ✅ |
| Runtime | RuntimeGateway (sandbox) | Internal | ✅ |

### Missing APIs (needed for UI)
1. `/api/artifacts` — CRUD for Artifact model (GET list, GET [id], POST create, PATCH update, DELETE)
2. `/api/memory` — CRUD for Memory model (GET list, PATCH update, DELETE soft-delete)
3. `/api/projects` — CRUD for Project model (GET list, POST create, PATCH update, DELETE)

---

## 2. Current UI Problems

1. **Empty screen syndrome** — default state shows nothing but a greeting and 4 suggestion chips. No sense of what MiMo can do.
2. **Hidden navigation** — rail appears only on mouse hover. Capabilities are invisible. A new user has no idea what exists.
3. **No task visibility** — tasks exist in backend but only appear as a background indicator. No task list, no task creation, no task lifecycle in conversation.
4. **No memory visibility** — memory data exists in `/api/mimo/workspace` but only shows in sidebar Memory tab. No inline memory references.
5. **No knowledge visibility** — knowledge graph exists at `/api/knowledge/graph` but only shows as a flat list in sidebar. No entity exploration.
6. **No artifact system** — Artifact model exists but no API. No inline artifact cards.
7. **No research workflow** — research is a "mode" in the composer but there's no research-specific UI (sources, citations, synthesis).
8. **No command system** — CommandPalette exists but is basic. No prefix grammar, no contextual actions.
9. **No timeline** — EventLog exists and is queried but Timeline sidebar view shows raw events, not human-readable activity.
10. **No project workspace** — Project model exists but no API, no project switching, no project context.

---

## 3. Existing Reusable Components

| Component | Reusable? | Notes |
|-----------|-----------|-------|
| Shell.tsx | Rebuild | Needs visible navigation, not just conversation |
| Rail.tsx | Rebuild | Hidden rail is wrong — needs visible minimal nav |
| Conversation.tsx | Reuse (wrapper) | Just wraps ChatView |
| ChatView.tsx | Rebuild | Empty state needs capability discovery, not just greeting |
| Composer.tsx | Rebuild | Needs slash commands, @ references, contextual capabilities |
| MessageItem.tsx | Rebuild | Needs inline structured elements (tasks, artifacts, memory, citations) |
| AgentStatus.tsx | Reuse + extend | Action Trace is good, needs task lifecycle integration |
| TaskCard.tsx | Reuse + extend | Good structure, needs plan/verification/result sections |
| BackgroundTaskIndicator.tsx | Reuse | Works well |
| Sidebar.tsx | Rebuild | Needs context-driven views, not 5 equal tabs |
| CommandPalette.tsx | Rebuild | Needs prefix grammar, more actions |
| UniversalSearch.tsx | Rebuild | Needs to search more sources |
| SettingsModal.tsx | Reuse | Functional |
| VoiceMode.tsx | Reuse | Functional |
| ImageGenModal.tsx | Reuse | Functional |
| Toasts.tsx | Reuse | Functional |
| Markdown.tsx | Reuse | Functional |
| icons.tsx | Reuse | Functional |
| useEventStream.ts | Reuse | SSE consumer works |
| useTasks.ts | Reuse | Task data hook works |
| hooks.ts | Reuse | useWorkspace + useWorkspaceSearch work |

---

## 4. Components to Delete

None. All existing components have reusable logic. Visual presentation will be rebuilt.

---

## 5. Components to Rebuild

| Component | Why | Priority |
|-----------|-----|----------|
| **Shell.tsx** | Needs visible minimal navigation + conversation + summoned sidebar | P0 |
| **Rail.tsx** | Hidden rail is wrong — needs persistent minimal nav (logo + 4-5 icons) | P0 |
| **ChatView.tsx** | Empty state needs capability discovery + recent work + active tasks | P0 |
| **Composer.tsx** | Needs slash commands, @ references, mode/effort, expandable | P0 |
| **MessageItem.tsx** | Needs inline structured elements (task, artifact, memory, citation, approval, error) | P1 |
| **Sidebar.tsx** | Needs context-driven views (not 5 equal tabs) | P1 |
| **CommandPalette.tsx** | Needs prefix grammar, more actions, contextual ranking | P2 |
| **UniversalSearch.tsx** | Needs to search artifacts, tasks, knowledge, files (not just workspace) | P2 |

---

## 6. Components to Create

| Component | Responsibility | Data Source | Priority |
|-----------|---------------|-------------|----------|
| **MemoryCitation.tsx** | Inline expandable memory reference in AI messages | Memory from GraphRAG context | P1 |
| **KnowledgeLink.tsx** | Inline expandable entity reference in AI messages | KnowledgeEntity from GraphRAG | P1 |
| **ArtifactCard.tsx** | Inline artifact preview/expand in conversation | `/api/artifacts` (NEW API) | P1 |
| **ApprovalCard.tsx** | Inline approval request in conversation | ToolPolicyEngine | P2 |
| **ErrorCard.tsx** | Inline error with recovery actions | Pipeline errors | P2 |
| **ResearchTrace.tsx** | Inline research progress (sources, synthesis) | SSE events during research | P2 |
| **TaskPanel.tsx** | Task detail panel (summoned from task card) | `/api/tasks/[id]` | P2 |
| **ProjectSwitcher.tsx** | Project context switching | `/api/projects` (NEW API) | P3 |
| **TimelineView.tsx** | Human-readable timeline (replaces raw event list) | `/api/events` + `/api/tasks` | P3 |

---

## 7. Backend APIs Already Available

| API | Method | Purpose |
|-----|--------|---------|
| `/api/chat` | POST | Chat pipeline (streaming) |
| `/api/conversations` | GET/POST | Conversation + message CRUD |
| `/api/mimo/workspace` | GET | Memory, knowledge, agents, tools, timeline, stats |
| `/api/knowledge/graph` | GET | Full graph, path finding, subgraph |
| `/api/search` | POST | Web search |
| `/api/tasks` | GET/POST | Task list + create |
| `/api/tasks/[id]` | GET/PATCH/DELETE | Task detail + update + cancel |
| `/api/events` | GET | Event log query |
| `/api/events/stream` | GET (SSE) | Real-time event stream |
| `/api/image` | POST | Image generation |
| `/api/backup` | GET/POST/DELETE | Backup management |
| `/api/agents/recover` | POST | Agent recovery |
| `/api/health` | GET | Health check |
| `/api/readiness` | GET | Readiness check |

---

## 8. Backend APIs Missing (to create)

### API 1: `/api/artifacts` (CRUD)
```
GET    /api/artifacts           → list artifacts (?type=&projectId=&limit=)
GET    /api/artifacts/[id]      → get single artifact
POST   /api/artifacts           → create artifact {type, title, content, projectId?, provenance?}
PATCH  /api/artifacts/[id]      → update {title?, content?, version?}
DELETE /api/artifacts/[id]      → delete artifact
```
Uses existing `Artifact` Prisma model. No schema change.

### API 2: `/api/memory` (CRUD)
```
GET    /api/memory              → list memories (?type=&limit=&search=)
PATCH  /api/memory/[id]         → update {content?, confidence?, metadata?}
DELETE /api/memory/[id]          → soft-delete (set deletedAt)
```
Uses existing `Memory` Prisma model. No schema change. Reuses `MemoryRepository` from Core.

### API 3: `/api/projects` (CRUD)
```
GET    /api/projects             → list projects
POST   /api/projects             → create project {name, description?, accent?}
PATCH  /api/projects/[id]       → update {name?, description?}
DELETE /api/projects/[id]         → delete (cascade)
```
Uses existing `Project` Prisma model. No schema change.

---

## 9. Database Models Already Available

All needed models exist in Prisma schema:
- Project (id, name, description, accent, mimoMdPath, createdAt, updatedAt)
- Conversation (id, projectId, title, pinned, forkedFrom, createdAt, updatedAt)
- Message (id, conversationId, role, content, mode, model, thinking, research, streaming, error, tokenCount, createdAt)
- Memory (id, type, content, scope, projectId, source, confidence, metadata, createdAt, updatedAt, deletedAt)
- KnowledgeEntity (id, name, type, description, confidence, evidenceCount, createdAt, updatedAt)
- KnowledgeRelationship (id, fromEntityId, toEntityId, type, confidence, createdAt)
- Artifact (id, type, title, content, projectId, provenance, version, parentId, createdAt, updatedAt)
- Task (id, projectId, conversationId, status, intent, plan, progress, agentId, error, createdAt, updatedAt, completedAt)
- EventLog (id, type, source, payload, correlationId, timestamp)
- File (id, projectId, name, path, size, mimeType, content, createdAt, updatedAt)
- ProjectSetting (id, projectId, key, value)

---

## 10. Required Schema Changes

**None.** All needed models exist. Missing APIs will reuse existing models.

---

## 11. State Machine (Zustand Store)

### Current Store Fields (reuse)
- theme, view, sidebarOpen, panelOpen
- devMode, rightOpen, rightWidth, universalSearch
- sidebarView (SidebarView: context|memory|knowledge|tasks|timeline)
- tabs, activeTabId, currentProject, artifactDockOpen
- convs, activeId
- input, loading, search, mode, model, modelMenu
- deepThink, webSearch, thinkOpen
- palette, palQ, settings, voice, imgGen, genning, genImgs
- artifact, canvasText, voiceLine, tasks, newTask, mems, toasts, copiedId

### New Store Fields (additive)
- `activeTaskId: string | null` — currently expanded task in conversation
- `backgroundTasks: MiMoTask[]` — tasks running in background
- `recentArtifacts: Artifact[]` — recently created artifacts
- `activeProject: Project | null` — current project context

### New Store Actions
- `setActiveTaskId(id: string | null)`
- `addBackgroundTask(task: MiMoTask)`
- `removeBackgroundTask(id: string)`

---

## 12. Navigation Architecture

### Navigation Hierarchy

**PRIMARY (always visible):**
- Conversation (fills viewport)
- Composer (bottom bar)
- Minimal rail (left edge — visible, not hidden)

**SECONDARY (discoverable):**
- ⌘K → Command palette (overlay)
- ⌘/ → Universal search (overlay)
- ⌘B → Sidebar (summoned overlay)

**TERTIARY (contextual):**
- Task panel (summoned from task card)
- Artifact viewer (summoned from artifact card)
- Settings (modal)

### Rail (REDESIGN — not hidden)
The rail should be **visible but minimal** — a thin vertical strip with 4-5 small icons. NOT hidden (hidden = undiscoverable). NOT a full sidebar (full sidebar = steals space).

```
┌──┐
│M │  Logo (click → conversation)
├──┤
│✦ │  ⌘K
│🧠│  Memory
│🔗│  Knowledge
│📋│  Tasks
├──┤
│👤│  Account
└──┘
```

Width: 40px (down from 48px — tighter, less space stolen)
Icons: 24×24 (down from 32×32)
Active: accent-soft background
Hover: raised background

This is persistent but quiet. It communicates "there are things here" without dominating.

---

## 13. Conversation Architecture

### Message Types (inline in conversation)
1. **User message** — raised bg, right-aligned, no avatar, 68% max-width
2. **AI message** — transparent, left-aligned, no avatar mark, full content width
3. **Action Trace** — inline (above composer), verb + object + pulsing dot, expandable
4. **Task card** — inline (when task created), lifecycle + plan + progress + mode
5. **Artifact card** — inline (when artifact produced), preview + expand + actions
6. **Memory citation** — inline `[mem]` expandable (when MiMo uses a memory)
7. **Knowledge link** — inline `[ent]` expandable (when MiMo references an entity)
8. **Approval card** — inline (when sensitive action), what/why/approve/reject
9. **Error card** — inline (when error), what/why/retry/fix/details
10. **Research trace** — inline (during research), sources/synthesis/citations
11. **Background task indicator** — below conversation (when task minimized)

### Empty State (REDESIGN)
The empty state should show:
- Personal greeting (calm, not giant)
- Composer (primary action)
- 4 suggestion chips (discovering capabilities)
- "What MiMo knows" (if any data exists — real counts from `/api/mimo/workspace`)
- Recent conversations (if any — 3 most recent, compact)
- Active tasks (if any — minimized task indicator)

This makes the empty state feel alive, not empty. It shows MiMo is a system with history and capabilities, not just an input box.

---

## 14. Composer Architecture

### Default State
```
┌──────────────────────────────────────────┐
│ اسأل MiMo…                                │
│                                            │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
Enter للإرسال · ⌘K للأوامر · ⌘/ للبحث
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

### Slash Commands (future — when `/` typed)
```
┌──────────────────────────────────────────┐
│ /                                          │
│ ┌──────────────────┐                      │
│ │ /plan    خطّة     │                      │
│ │ /research بحث     │                      │
│ │ /task    مهمة     │                      │
│ │ /clear   مسح     │                      │
│ │ /compact ضغط     │                      │
│ └──────────────────┘                      │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
```

### @ References (future — when `@` typed)
```
┌──────────────────────────────────────────┐
│ @                                          │
│ ┌──────────────────┐                      │
│ │ 📄 ملف            │                      │
│ │ 🧠 ذاكرة          │                      │
│ │ 🔗 كيان معرفة     │                      │
│ │ 📋 مشروع          │                      │
│ └──────────────────┘                      │
│ [محادثة ▾] [متوازن ▾]    [✦] [➤]         │
└──────────────────────────────────────────┘
```

### Controls
- **Mode**: محادثة / بحث / كود / كتابة (4 modes)
- **Effort**: سريع / متوازن / عميق (3 levels — Z.ai per-turn knob)
- **Tools** (✦ toggle): deep think, web search, image gen, voice
- **Send/Stop**: accent when text present, error-color when AI working

### Design
- Bottom bar with subtle top border (not floating card)
- 820px max-width centered
- Tonal elevation (border on focus, not shadow)
- Arabic-first (placeholder, labels, line-height 1.75)

---

## 15. Task Architecture

### Task Lifecycle (ZCode DNA translated)
```
User request
→ MiMo determines task is needed
→ Task created (inline card appears in conversation)
→ Understanding ("يفهم الطلب")
→ Planning ("يرتب الخطوات" — visible plan)
→ [Approval if Plan mode or destructive action]
→ Execution ("ينفذ الخطوة 2 من 5" — Action Trace)
→ Tool calls ("يستدعى أداة البحث" — Action Trace)
→ Observation ("يحلل النتائج")
→ Verification ("يتحقق من النتيجة")
→ Completed (artifact produced if applicable)
→ Background minimization (if long-running)
```

### Execution Modes
- **Plan**: propose plan first, wait for approval before execution
- **Auto**: execute within permissions, ask only when needed
- **Goal**: work toward verifiable objective until complete or failed

Mode is stored in task's `plan` JSON field (already implemented). Mode selector appears in expanded task card.

### Task Card (inline)
Collapsed: status + intent + progress + mode badge
Expanded: goal, plan steps, current action, tools, files, artifacts, approvals, errors, pause/cancel/resume

### Background Task
Minimizes to calm indicator below conversation. User continues chatting. Click to expand task list.

---

## 16. Memory Architecture

### Inline Citations (in AI messages)
When MiMo uses a memory during response generation, it can reference it:
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

Implementation: The `/api/chat` route already runs GraphRAG + Memory recall. The response can include memory references. Post-process the AI response to insert `[mem:id]` tokens where the model references known memories, then render them as expandable cards.

### Memory API (NEW — `/api/memory`)
- GET list (filter by type, search)
- PATCH update (content, confidence, metadata)
- DELETE soft-delete

### Memory Sidebar View
Browse all memories. Filter by type. Search. Edit. Delete. Provenance.

### "What does MiMo know about you?"
In empty state: real counts from `/api/mimo/workspace` stats. No fake data.

---

## 17. Knowledge Architecture

### Inline Entity Links (in AI messages)
When MiMo references a knowledge entity:
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

### Knowledge Sidebar View
Browse entities by type. Expand relationships (list, not graph). See evidence + sources.

### Knowledge Graph API (existing)
`/api/knowledge/graph` returns full graph, path finding, subgraph. Used for entity exploration.

---

## 18. Artifact Architecture

### Inline Artifact Cards (in AI messages)
```
┌─────────────────────────────────────────┐
│ 📄 تقرير تحليل البيانات                   │
│ نوع: تقرير · 4 صفحات                    │
│ [معاينة]  [نسخ]  [تصدير]  [حفظ]         │
└─────────────────────────────────────────┘
```

### Artifact API (NEW — `/api/artifacts`)
Uses existing Artifact Prisma model. CRUD routes.

### Expanded Artifact
- Code: syntax highlighted
- Document: rendered markdown
- Image: displayed
- Table: formatted

### Connected
Artifacts link to originating conversation + task + project via `provenance` field.

---

## 19. Research Architecture

### Research as Task Type
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

### Implementation
When mode=research, the chat pipeline already runs differently (ResearchAgent). The SSE events can be mapped to a research-specific Action Trace showing sources → evaluation → synthesis.

---

## 20. Search Architecture

### Universal Search (⌘/)
Searches across:
- Conversations (via `/api/conversations` search)
- Messages (via conversation messages)
- Memories (via `/api/mimo/workspace?q=`)
- Knowledge (via `/api/knowledge/graph`)
- Tasks (via `/api/tasks`)
- Artifacts (via `/api/artifacts` — NEW API)
- Files (via File model — if API added)

### Results
Categorized by source type. Each result has provenance (source, date, relevance).

---

## 21. Command Architecture

### Command Palette (⌘K)
```
⌘ اكتب أمراً أو ابحث…
```

### Categories
- **Actions**: new conversation, create task, start research, create artifact
- **Navigation**: open memory, knowledge, tasks, timeline, settings
- **Search**: find project, file, artifact, conversation
- **Settings**: toggle theme, change effort, switch model

### Prefix Grammar (future)
- `>` — actions
- `@` — entities (memory, knowledge, project)
- `/` — slash commands
- `#` — tags

---

## 22. Timeline Architecture

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
Query `/api/events` + `/api/tasks` and map event types to human-readable labels. Filter by type (user/AI/task/memory/artifact/error). Not raw event log — translated activity.

---

## 23. Responsive Strategy

### Desktop (>960px)
- Rail: 40px visible (left edge)
- Conversation: 820px max centered
- Composer: 820px max centered
- Sidebar: 340px summoned overlay

### Tablet (640-960px)
- Rail: 40px visible
- Conversation: full width with 32px padding
- Composer: full width
- Sidebar: full-screen overlay

### Mobile (<640px)
- Rail: bottom bar (44px, horizontal)
- Conversation: full width with 16px padding
- Composer: full width
- Sidebar: full-screen overlay
- Command palette: full-screen overlay

---

## 24. Accessibility Strategy

- **Keyboard**: all actions ≤2 modifiers. Tab navigates, Enter/Space activates, Esc closes.
- **Focus**: visible accent outline (2px, offset 2px)
- **ARIA**: semantic HTML + aria-label on icon buttons + aria-live for AI state
- **Contrast**: text on bg ≥ 4.5:1 (stone palette achieves this)
- **RTL**: direction: rtl, code blocks LTR
- **Reduced motion**: @media (prefers-reduced-motion: reduce) — all animations instant
- **Touch targets**: minimum 44px for interactive elements on mobile

---

## 25. Implementation Phases

### Phase A: Foundation + APIs (1-2h)
1. Create `/api/artifacts` CRUD (uses existing Artifact model)
2. Create `/api/memory` CRUD (uses existing Memory model + MemoryRepository)
3. Create `/api/projects` CRUD (uses existing Project model)
4. Verify all tests pass

### Phase B: Shell + Navigation (1-2h)
1. Rebuild Shell with visible minimal rail (40px, not hidden)
2. Rebuild Rail with 5 icons (logo, ⌘K, memory, knowledge, tasks, account)
3. Rebuild empty state with capability discovery + recent work + active tasks
4. Verify visually

### Phase C: Conversation + Composer (1-2h)
1. Rebuild ChatView with richer empty state
2. Rebuild Composer with slash command support (future: @ references)
3. Rebuild MessageItem with inline element slots
4. Verify visually

### Phase D: Task/Agent (1-2h)
1. Verify TaskCard with execution modes
2. Wire AgentStatus Action Trace to real SSE events
3. Verify BackgroundTaskIndicator
4. Test task lifecycle end-to-end

### Phase E: Memory + Knowledge (1-2h)
1. Create MemoryCitation component (inline expandable)
2. Create KnowledgeLink component (inline expandable)
3. Rebuild Sidebar Memory + Knowledge views with real data
4. Test memory CRUD

### Phase F: Artifacts (1h)
1. Create ArtifactCard component (inline preview/expand)
2. Wire to `/api/artifacts`
3. Test artifact creation + display

### Phase G: Approvals + Errors (1h)
1. Create ApprovalCard component (inline)
2. Create ErrorCard component (inline with recovery)
3. Wire to ToolPolicyEngine + pipeline errors

### Phase H: Command + Search (1h)
1. Rebuild CommandPalette with more actions + prefix grammar
2. Rebuild UniversalSearch with more sources
3. Test command flow

### Phase I: Timeline + Projects (1h)
1. Rebuild Timeline view (human-readable)
2. Create ProjectSwitcher
3. Test project switching

### Phase J: Responsive + A11y (1-2h)
1. Test + fix responsive at 1440/1280/1024/768/390px
2. Test + fix RTL
3. Test + fix keyboard navigation
4. Test + fix accessibility

### Phase K: Polish (1h)
1. Visual polish pass
2. Performance check
3. Final VLM audit

---

## 26. QA Strategy

After each phase:
1. `bunx tsc --noEmit` — 0 errors
2. `bun run lint` — 0 errors
3. `bun test` — all pass
4. Browser visual inspection — screenshot + compare
5. Console audit — 0 errors
6. VLM audit — structural, not just color

---

## 27. Acceptance Criteria

1. ✅ Can a new user understand MiMo within 10 seconds? — Empty state shows capabilities + suggestions
2. ✅ Can the user start a normal conversation immediately? — Composer is visible
3. ✅ Can the user start research without changing applications? — Mode selector in composer
4. ✅ Can MiMo execute a long-running task? — Task API + TaskCard + lifecycle
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

---

## Decisions Requiring Approval

1. **Rail visibility**: Plan proposes visible 40px rail (not hidden). Previous hidden rail was undiscoverable. This is a design decision.

2. **New APIs**: Plan proposes 3 new API routes (`/api/artifacts`, `/api/memory`, `/api/projects`). All reuse existing Prisma models. No schema changes. This is a backend addition, not a rewrite.

3. **Empty state enrichment**: Plan proposes showing recent conversations + active tasks + memory counts in the empty state. This changes it from "just a greeting" to "a calm but informative home screen." This is a UX decision.

4. **Inline element rendering**: Plan proposes post-processing AI responses to insert memory/knowledge references. This is a backend pipeline change (in the chat route's response processing, not the model itself).

5. **Composer slash commands**: Plan proposes `/` prefix in composer for quick actions. This is a Phase C feature that may be deferred if time-constrained.
