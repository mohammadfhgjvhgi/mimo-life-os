# MiMo — UI/UX Gap Analysis

> Backend capability → API → UI mapping. Evidence-based. Every gap documented.

---

## Capability→UI Matrix

| Capability | Backend | API | UI | UI Quality | Gap |
|---|---|---|---|---|---|
| **Conversation** | ✅ Chat route + runWorkflow + SSE | ✅ `/api/chat` + `/api/conversations` | ✅ ChatView | GOOD | Pagination exists but no virtualization |
| **Memory** | ✅ MemoryEngine + MemoryIntelligence + consolidation | ✅ `/api/mimo/workspace` | ⚠️ Sidebar list | PARTIAL | No edit/delete API; no provenance display in conversation; no confidence visualization |
| **Knowledge** | ✅ KnowledgeGraph + GraphRAG + entities/relationships | ✅ `/api/knowledge/graph` + `/api/mimo/workspace` | ⚠️ Sidebar list (filtered memory) | PARTIAL | No entity exploration; no relationship traversal; graph API exists but UI doesn't use it |
| **GraphRAG** | ✅ Wired into ContextBuilder | ✅ Runs on every chat | ❌ No UI | MISSING | User can't see what GraphRAG retrieved; citations not shown inline |
| **Tasks** | ✅ Task model + AgentLifecycle state machine + CheckpointManager | ⚠️ `/api/agents/recover` only | ❌ No UI | MISSING | **#1 gap** — full task lifecycle has no UI surface |
| **Agents** | ✅ 4 agents (Planner/Research/Memory/Writer) + registry | ✅ Via chat pipeline | ⚠️ AgentStatus (inline verb only) | PARTIAL | No agent detail view; no multi-agent visibility |
| **Tools** | ✅ 3 tools + ToolPolicyEngine + RuntimeGateway | ✅ Via chat pipeline | ❌ No UI | MISSING | Tool invocations not visible in conversation; no tool result cards |
| **Runtime** | ✅ RuntimeGateway (shell/python/JS) | ✅ Via dev workspace | ⚠️ Dev Workspace only | PARTIAL | Runtime not visible in main conversation; only in dev mode |
| **Sandbox** | ✅ SandboxManager + per-project isolation | ✅ `/api/dev/*` | ⚠️ Dev Workspace only | PARTIAL | Sandbox capability hidden behind dev mode |
| **Artifacts** | ✅ Prisma Artifact model + ArtifactDock | ❌ No CRUD API | ⚠️ ArtifactDock (images only) | PARTIAL | No artifact creation/editing; no artifact center; only generated images |
| **Projects** | ⚠️ Project model (life) + DevProject (dev) | ✅ Dev projects API | ⚠️ Dev Workspace only | PARTIAL | Life projects have no workspace; dev projects have workspace but disconnected from main |
| **Files** | ⚠️ File model (life) + DevFile (dev) | ✅ Dev files API | ⚠️ FilesBrowser (images only) | PARTIAL | Life files have no real backend; dev files are in dev workspace |
| **Events** | ✅ EventBus + EventLog (persistent) + SSE | ✅ `/api/events` + `/api/events/stream` | ⚠️ Timeline (sidebar) | PARTIAL | Timeline shows raw events, not human-readable activity |
| **Search** | ✅ HybridSearch + memory/knowledge search | ✅ `/api/search` + `/api/mimo/workspace?q=` | ⚠️ UniversalSearch overlay | PARTIAL | No search across tasks/artifacts/projects; results not categorized well |
| **Command Palette** | N/A | N/A | ✅ CommandPalette | PARTIAL | Limited commands; no task/project/artifact actions; no prefix grammar |
| **Model Router** | ✅ ModelRouter (5 profiles) + executeWithFallback | ✅ Wired into WriterAgent | ❌ No UI | MISSING | User can't see model selection; no effort controls |
| **Local Model** | ✅ LocalModelProvider (Ollama detection) | ✅ Wired into Kernel | ❌ No UI | MISSING | User can't see if local model is available |
| **Backup** | ✅ BackupEngine + path validation | ✅ `/api/backup` | ❌ No UI | MISSING | Backup/restore not accessible from UI |
| **DB Security** | ✅ DbSecurityAudit (real) | ❌ No API | ❌ No UI | MISSING | Security status not visible |
| **Dev Workspace** | ✅ Full sandbox + project + files + build + test + git + snapshot | ✅ Complete `/api/dev/*` | ✅ DevelopmentWorkspace | GOOD | Functional but visually disconnected from main shell |
| **MCP** | ✅ McpJsonRpcClient + McpAdapter (real stdio) | ❌ No MCP API | ❌ No UI | MISSING | MCP server management not accessible |
| **Permissions** | ✅ DevPermission model + per-project | ✅ `/api/dev/*/permissions` | ⚠️ DevInspector | PARTIAL | Only in dev workspace; no life-side permission system |

---

## Gap Categories

### 1. Backend capability with NO UI (5 gaps)
- **Task System** — full lifecycle backend, zero UI
- **Model Router** — wired into pipeline, no visibility
- **Local Model** — detected on boot, no indicator
- **Backup/Restore** — API exists, no UI
- **MCP** — real stdio client, no management UI

### 2. UI with incomplete API (3 gaps)
- **Memory edit/delete** — UI buttons exist, no PATCH/DELETE API
- **Artifact CRUD** — ArtifactDock exists, no artifact API
- **Timeline** — shows raw events, needs human-readable activity API

### 3. Missing UX states (4 gaps)
- **Task progress** — no progress bar/step indicator
- **Approval gate** — no inline approval card
- **Background task** — no minimized task indicator
- **Error recovery** — errors shown as text, no retry/recover actions

### 4. Missing loading states (2 gaps)
- **GraphRAG retrieval** — no indication of what's being retrieved
- **Model routing** — no indication of model selection process

### 5. Missing long-running task UX (3 gaps)
- **Task lifecycle** — no task detail view
- **Checkpoint/recovery** — no recovery UI
- **Multi-agent** — no multi-agent visibility

### 6. Missing keyboard navigation (1 gap)
- **Command palette prefix grammar** — no >, @, /, # scoping

---

## Priority Order

1. **Task System** (#1 — backend is rich, UI is zero)
2. **Agent Experience** (action trace, not chain-of-thought)
3. **Memory provenance** (inline citations + edit/delete API)
4. **Knowledge entity exploration** (use the existing graph API)
5. **Model Router visibility** (effort controls + model indicator)
6. **Artifact Center** (CRUD API + inline display)
7. **Background Tasks** (minimized task indicator)
8. **Approval UX** (inline approval cards)
9. **Error Recovery** (retry/recover actions)
10. **Backup UI** (settings panel)
