# MiMo — API Architecture
### Phase: Foundation From The Ground Up — ARCH-A (Doc 5/5)

**Status:** API boundaries, contracts, validation, auth, versioning, streaming.
**Authority:** Derives from `MiMo_Product_Bible.md` Parts 22 (Security), 23 (Offline), 25 (Plugin/API Architecture), 27.6 (API Boundaries), 27.7 (Data Fetching). Bound by `MiMo_System_Constitution.md` §1 (Boundaries), §8 (AI Boundaries), §11 (UI Boundaries).
**Method:** Every API route justifies its existence. Every contract is typed. Provider-specific logic stays behind adapters. The Core system never depends on a provider's proprietary shape.
**Labels:** `[CURRENT]` / `[TARGET]` / `[MIGRATION]` / `[FACT]` / `[INFERENCE]` / `[UNKNOWN]`.

---

## 0. The single rule that governs everything

> **`src/core/index.ts` is the ONLY public API surface.** Anything not exported there is internal. API routes are thin: validate input → call Core → shape response. (Bible Part 25.3 + Constitution §11.1.)

Everything in this document follows from that rule.

---

## 1. API surface inventory

### 1.1 Three API classes [TARGET]

| Class | Consumer | Transport | Examples |
|---|---|---|---|
| **Internal HTTP API** (`/api/*`) | MiMo UI (client components) | HTTP/JSON + SSE | `/api/chat`, `/api/mimo/workspace`, `/api/events` |
| **Core programmatic API** (`src/core/index.ts` exports) | API routes + plugins (via MCP bridge) | TypeScript imports | `runWorkflow()`, `memoryEngine.recall()`, `policyEngine.authorize()` |
| **Plugin API** (MCP) | External MCP servers | MCP protocol over stdio/HTTP | tool registration, agent invocation |

External third-party APIs (provider SDKs, web search backends) are NEVER directly callable from API routes — they sit behind Core adapters (Constitution §8.1).

### 1.2 [CURRENT] state (Audit §6.1)

| Route | Status | Through Core? | Issue |
|---|---|---|---|
| `GET /api` | Dead boilerplate | No | Delete (Audit §15) |
| `POST /api/chat` | Working (streams) | YES (runWorkflow) | None (correct pattern) |
| `POST /api/image` | Working | NO (direct ZAI) | **Constitution F3 violation** |
| `POST /api/search` | Working | NO (direct ZAI) | **Constitution F3 violation** |
| `GET /api/mimo/workspace` | Working | YES (memoryEngine, registries, events) | None |
| `/api/axp/*` | Referenced in `components/mimo/hooks.ts` but routes don't exist | N/A | Dangling — delete references (Audit §16 #17) |

### 1.3 [TARGET] route inventory

| Route | Purpose | Through Core? | Transport |
|---|---|---|---|
| `POST /api/chat` | Streaming chat (full pipeline) | YES (`runWorkflow`) | SSE |
| `GET /api/mimo/workspace` | Aggregated sidebar data | YES (repositories + caches) | JSON |
| `POST /api/message/edit` | Edit a message (creates version) | YES (`MessageRepository`) | JSON |
| `POST /api/conversation/fork` | Fork a conversation | YES (`ConversationRepository`) | JSON |
| `POST /api/conversation/archive` | Archive conversation | YES | JSON |
| `POST /api/project/create` | Create project | YES (`ProjectRepository`) | JSON |
| `POST /api/project/switch` | Switch active project | YES | JSON |
| `GET /api/memory` | List memories (filter by type, scope, search) | YES (`MemoryRepository`) | JSON |
| `POST /api/memory/create` | Explicit memory save | YES | JSON |
| `POST /api/memory/:id/edit` | Edit memory | YES | JSON |
| `POST /api/memory/:id/delete` | Hard delete memory (one-click) | YES | JSON |
| `GET /api/knowledge` | List entities (filter by type) | YES (`KnowledgeEngine`) | JSON |
| `GET /api/knowledge/:id` | Entity detail (evidence, changes, relationships) | YES | JSON |
| `GET /api/artifact` | List artifacts (per project) | YES (`ArtifactService`) | JSON |
| `GET /api/artifact/:id` | Get artifact metadata | YES | JSON |
| `GET /api/artifact/:id/content` | Stream artifact content (version) | YES (filesystem read) | Binary stream |
| `POST /api/artifact/create` | Create artifact (from agent or user) | YES | JSON |
| `POST /api/artifact/:id/version` | New version | YES | JSON |
| `POST /api/artifact/:id/hunk/accept` | Accept hunk (Bible 10.5) | YES | JSON |
| `POST /api/artifact/:id/hunk/reject` | Reject hunk | YES | JSON |
| `GET /api/file` | List files (per project) | YES (`FileRepository`) | JSON |
| `GET /api/file/:id/content` | Stream file content | YES | Binary |
| `POST /api/file/upload` | Upload file (with permission check) | YES + PolicyEngine | JSON |
| `POST /api/task/:id/approve` | Approve pending task | YES (`WorkflowEngine`) | JSON |
| `POST /api/task/:id/deny` | Deny | YES | JSON |
| `POST /api/task/:id/pause` | Pause | YES | JSON |
| `POST /api/task/:id/resume` | Resume | YES | JSON |
| `POST /api/task/:id/cancel` | Cancel | YES | JSON |
| `POST /api/task/:id/rollback` | Rollback to pre-task state | YES | JSON |
| `POST /api/plan/:id/approve` | Approve plan | YES | JSON |
| `POST /api/plan/:id/reject` | Reject plan | YES | JSON |
| `POST /api/plan/:id/edit` | Edit plan before approving | YES | JSON |
| `GET /api/permissions` | List permissions | YES (`PolicyEngine`) | JSON |
| `POST /api/permissions/grant` | Grant | YES | JSON |
| `POST /api/permissions/revoke` | Revoke | YES | JSON |
| `GET /api/trust-ledger` | List trust entries | YES | JSON |
| `POST /api/trust-ledger/:id/upgrade` | Accept "always allow" | YES | JSON |
| `POST /api/trust-ledger/:id/revoke` | Revoke trust | YES | JSON |
| `GET /api/events` | SSE event stream (since sequence) | YES (`EventRepository`) | SSE |
| `GET /api/search` | Universal search (FTS5 + semantic + graph) | YES (`SearchService`) | JSON |
| `POST /api/image` | Image generation | YES (`ImageCapability`) | JSON |
| `GET /api/me` | Owner profile + workspace settings | YES | JSON |
| `POST /api/settings` | Update workspace/project settings | YES | JSON |
| `POST /api/export` | Trigger full export | YES | JSON + tar.gz stream |
| `POST /api/import` | Import from export | YES | multipart |
| `POST /api/plugin/install` | Install MCP plugin (with approval) | YES + PolicyEngine | JSON |
| `POST /api/plugin/:id/disable` | Disable | YES | JSON |
| `POST /api/plugin/:id/uninstall` | Uninstall | YES | JSON |
| `POST /api/backup` | Manual backup | YES | JSON |
| `POST /api/restore` | Restore from backup | YES | JSON |

**Total: ~40 routes.** Each justified by a Bible requirement or a domain entity lifecycle operation. No route exists "for completeness."

### 1.4 What is NOT an API route [TARGET]

- **`/api/axp/*`** — dangling reference in `components/mimo/hooks.ts` (Audit §16 #17). Deleted.
- **`/api/route.ts`** (Hello World boilerplate). Deleted.
- **No server actions** — Bible Part 25.3 allows API-only; consistent with current state (Audit §5.3).

---

## 2. Request/response contracts

### 2.1 Universal envelope [TARGET]

Every JSON response (success or error) uses:

```typescript
type ApiResponse<T> =
  | { ok: true; data: T; meta?: { cursor?: string; totalCount?: number } }
  | { ok: false; error: ApiError };
```

```typescript
interface ApiError {
  code: string;          // machine-readable, e.g., 'VALIDATION_FAILED', 'POLICY_DENIED'
  message: string;      // human-readable (Bible 24.3)
  details?: unknown;    // structured details (field errors, etc.)
  retryable: boolean;   // can the client retry?
  correlationId: string;// for debugging
}
```

This replaces the current ad-hoc shape (Audit §6.1) where routes return raw objects or `NextResponse.json()` with arbitrary shapes.

### 2.2 Validation [TARGET]

- **Input validation:** every route uses a Zod schema (Bible Part 27.1 — react-hook-form + zod already in deps).
- **Output validation:** every route returns a typed response via the universal envelope. Internal data shapes are validated at the Repository boundary (Constitution §5.4).
- **Failure mode:** validation failure → `400` with `code: 'VALIDATION_FAILED'` and `details: { fieldErrors }`.

### 2.3 [CURRENT] state

No envelope, no Zod schemas on routes, no universal error shape. Routes return raw objects (Audit §6.1).

---

## 3. Authentication + authorization

### 3.1 Authentication [TARGET — Bible Part 22, single-user local-first]

> **No multi-user auth.** MiMo is single-user. The "user" is the owner of the machine.

- v1: no authentication (acceptable for local-first — Audit §9.1).
- v1 hardening: bind the dev server to `127.0.0.1` only (not `0.0.0.0`). Reject requests with non-localhost `Host` header. Document this as a known limitation.
- v2 (if ever exposed on LAN): single shared secret in keychain, checked on every request. NOT user accounts.

### 3.2 Authorization [TARGET — Bible Part 22.4–22.7]

Authorization is NOT about user identity. It's about:

1. **Tool invocation:** `PolicyEngine.authorize(agent, tool, input) → Decision`.
2. **File access:** agent can only access files in project scope (Bible 22.5).
3. **Network access:** agent network access requires approval (Bible 22.7).
4. **Plugin capabilities:** plugin declares required permissions; owner approves on install (Bible 25.6).

These are enforced at the Core layer (PolicyEngine), NOT at the API edge. The API edge does only:
- Validate input shape.
- Call Core (which internally enforces authorization).
- Return result.

Why: authorization decisions are domain logic (Constitution §11.1 — no business logic in presentation; same principle — no business logic in API edge).

### 3.3 [CURRENT] state

No auth, no authz, no PolicyEngine (Audit §9.1, §9.2). All greenfield (M5 per Constitution §14.1).

---

## 4. Rate limiting + idempotency

### 4.1 Rate limiting [TARGET]

- **No rate limiting on internal API** — single-user, local-first. The owner cannot DoS themselves meaningfully.
- **Rate limiting on provider API calls:** enforced by the provider adapter (e.g., ZAI SDK handles retries; the adapter maps rate-limit errors to `MODEL_FAILED` events with `retryable: true`). Bible Part 23.7 — quota exhaustion falls back to local model.
- **Concurrency limit:** one chat workflow at a time per conversation (server-side mutex on `conversationId`). Prevents overlapping streams on the same conversation.

### 4.2 Idempotency [TARGET]

- **POST `/api/chat`:** `Idempotency-Key` header (client-generated UUID). Server tracks `IdempotencyKey → Response` for 5 min. Re-send returns cached response.
- **POST `/api/message/edit`, `/api/memory/:id/edit`:** idempotent by content hash — if the new content matches the latest version's hash, return success without writing.
- **POST `/api/task/:id/approve`:** idempotent — approving an already-approved task is a no-op success.
- **All other mutations:** not idempotent by default; client must handle retries.

### 4.3 [CURRENT] state

No idempotency. No concurrency control on chat.

---

## 5. Errors

### 5.1 Error taxonomy [TARGET — Bible Part 24.1]

| Code | HTTP | Cause | Retryable | UI behavior |
|---|---|---|---|---|
| `VALIDATION_FAILED` | 400 | Bad input | No | Inline form error |
| `UNAUTHORIZED` | 401 | (v2 only) Non-local request | No | Block |
| `POLICY_DENIED` | 403 | PolicyEngine denied | No | Inline "permission required" card (Bible 22.4) |
| `NOT_FOUND` | 404 | Entity doesn't exist | No | Inline "not found" |
| `CONFLICT` | 409 | Concurrent edit / state mismatch | No | Inline "edited elsewhere, refresh?" |
| `RATE_LIMITED` | 429 | (External provider) Provider rate-limited | Yes (backoff) | Inline "rate-limited, retrying" |
| `PROVIDER_FAILED` | 502 | Model/search/image provider error | Yes (backoff, alt model) | Inline "provider error, retrying" |
| `INTERNAL_ERROR` | 500 | Uncaught error | Maybe | Inline error + correlationId (Bible 24.2) |
| `TIMEOUT` | 504 | Long-running operation timed out | Yes | Inline "timed out, retry?" |

### 5.2 No silent failures [TARGET — Bible Invariant 8]

Every error:
1. Is logged via Core logger.
2. Emits a `SYSTEM_ERROR_OCCURRED` event (Tier 2 audit).
3. Returns the universal error envelope to the client.
4. Is shown inline in the UI (never a modal — Bible 24.9).

### 5.3 [CURRENT] state

No error envelope. Routes throw or return raw errors. Audit §10.2 — linter disabled, no protection.

---

## 6. Versioning + backward compatibility

### 6.1 API versioning [TARGET — Bible Part 26.7]

- **No URL versioning** (`/api/v2/...`) — single-user, single-instance. The owner upgrades MiMo; there are no third-party consumers to break.
- **Schema versioning:** every payload declares `schemaVersion` (in the response meta). Breaking changes:
  - Add new fields: backward-compatible (old clients ignore).
  - Remove fields: forbidden (Constitution §9.2 — no deprecations mid-redesign). Keep the field, mark deprecated, return null.
  - Change field types: forbidden. Add a new field with a different name; old field returns null.
- **Plugin API versioning:** MCP protocol versioned (Bible 25.7). Plugins declare `minimumMiMoVersion`.

### 6.2 [CURRENT] state

No versioning. Routes are untyped. Constitution F11 (`any` types) currently allowed.

---

## 7. Streaming APIs

### 7.1 Chat streaming [TARGET — Bible Part 20.6]

- **Endpoint:** `POST /api/chat` returns `text/event-stream` (SSE).
- **Events streamed:**
  - `stage` — `{ stage: 'CONTEXT' | 'REASON' | 'PLAN' | 'EXECUTE' | 'VALIDATE' | 'DONE' }` (ExecutionTrace UI lights up).
  - `token` — `{ token: string }` (incremental content).
  - `tool` — `{ toolId, input, output }` (tool call visibility).
  - `artifact` — `{ artifactId, type, version }` (inline artifact card).
  - `done` — `{ messageId, durationMs, sanitised: bool }` (terminal).
  - `error` — `{ code, message, retryable }` (terminal).
- **Reconnect:** client sends `Last-Event-ID` header; server resumes from that event sequence.

### 7.2 Event stream [TARGET — Event Architecture §5.3]

- **Endpoint:** `GET /api/events?since=<sequence>` returns `text/event-stream`.
- **Use:** client catches up after disconnect; devMode live view.
- **Filter:** `?types=MEMORY_CREATED,ARTIFACT_CREATED` to subscribe to a subset.

### 7.3 [CURRENT] state

`/api/chat` streams via `ReadableStream` + `setTimeout` (word-by-word fake streaming — Audit §4.2). Not real model streaming; not SSE-formatted.

Migration: switch to real `ZAIModel.stream()` (which exists but is unused — Audit §18 #2) and SSE format. M9 phase.

---

## 8. Provider adapter pattern [TARGET — Constitution §8.1, Bible Part 7.14]

### 8.1 The canonical `Model` interface

```typescript
interface Model {
  readonly id: string;                // 'model:zai:glm-4.7'
  readonly providerId: string;       // 'provider:zai'
  readonly dimension: 'cheap' | 'fast' | 'deep' | 'vision' | 'local';
  readonly contextWindow: number;
  readonly supportsStreaming: boolean;
  readonly supportsToolCalling: boolean;
  readonly supportsVision: boolean;

  invoke(req: ModelRequest): Promise<ModelResponse>;
  stream(req: ModelRequest): AsyncIterable<ModelChunk>;
  embed(text: string): Promise<Float32Array>;
}

interface ModelRequest {
  messages: ModelMessage[];          // canonical shape — Bible Part 7.2
  tools?: ToolDeclaration[];          // canonical tool schemas (NOT provider-specific)
  temperature?: number;
  maxTokens?: number;
  reasoningDepth?: 'none' | 'brief' | 'deep';  // Bible 7.4
}

interface ModelResponse {
  content: string;
  toolCalls?: ToolCall[];             // canonical — provider adapter translates
  usage: { promptTokens, completionTokens };
  finishReason: 'stop' | 'tool-call' | 'length' | 'content-filter';
}

interface ModelChunk {
  delta?: string;                     // incremental content
  toolCallDelta?: ToolCall;
  done?: boolean;
}
```

### 8.2 Adapter responsibilities [TARGET]

Each provider adapter (`core/models/ZAIModel.ts`, future `core/models/AnthropicAdapter.ts`, `core/models/OllamaAdapter.ts`):
- Implements the `Model` interface.
- Translates canonical `ModelMessage[]` → provider-specific request shape.
- Translates provider-specific response → canonical `ModelResponse` / `ModelChunk`.
- Absorbs provider quirks (Anthropic's separate `system` parameter, OpenAI's `tool_choice`, ZAI's streaming format).
- Handles provider-specific errors → `MODEL_FAILED` event with `errorType` mapped to canonical taxonomy.

### 8.3 Forbidden patterns (Constitution §8 + F3, F10, F14)

| Forbidden | Reason |
|---|---|
| Importing `z-ai-web-dev-sdk` outside `core/models/ZAIModel.ts` | Constitution §8.1 — provider boundary |
| Importing `@anthropic-ai/sdk` outside `core/models/AnthropicAdapter.ts` | Same |
| API route importing any provider SDK | Constitution F3 |
| Core module referencing provider-specific shapes (e.g., `Anthropic.ContentBlock`) | Provider lock-in |
| `Model` interface exposing provider concepts (e.g., `anthropicTools`, `openaiFunctions`) | Lock-in via interface |

### 8.4 [CURRENT] state + MIGRATION

Audit §4.1: ZAI SDK imported in 4 places — 2 correct (ZAIModel adapter, SearchProvider adapter), 2 wrong (`/api/image`, `/api/search`).

Migration (M1 — Constitution §14.1):
1. Create `core/capabilities/image/ImageCapability.ts` with `generate(req): Promise<ImageResult>` interface.
2. Move ZAI image logic into `core/capabilities/image/ZAIImageAdapter.ts`.
3. `/api/image` calls `core.capabilities.image.generate()` — no SDK import.
4. `/api/search` already has `core/search/SearchProvider.ts` — route it through (the adapter exists, just unused).
5. ESLint rule: `no-restricted-imports` forbids `z-ai-web-dev-sdk` outside `core/models/` and `core/search/` and `core/capabilities/`.

---

## 9. Plugin API

### 9.1 MCP integration [TARGET — Bible Part 25.1]

- Plugins are MCP servers (Bible Part 25.1 — Tana + GitHub + Claude Code + Amie + Superhuman pattern).
- They run in a separate process (Constitution §9.1 — never share MiMo's address space).
- They communicate via MCP protocol over stdio or HTTP.
- They register Tools and Agents via the MCP bridge (`core/plugins/MCPBridge.ts`).
- They invoke the public Core API via `core/index.ts` (re-exported types only — no internals).

### 9.2 Plugin capabilities [TARGET — Bible Part 25.6]

| Capability | Granted by | Enforcement |
|---|---|---|
| Register tool | Owner approval on install | Registry rejects unapproved registrations |
| Register agent | Owner approval on install | Same |
| Read file (in assigned workspace) | Default | Filesystem sandbox |
| Write file (in assigned workspace) | Owner approval | Filesystem sandbox + PolicyEngine |
| Network call | Owner approval (per-host) | Network allowlist in PolicyEngine |
| Invoke Core API | Default (public surface) | `core/index.ts` exports only safe operations |
| Access Prisma / EventBus / Repository | DENIED | Plugin cannot import these (separate process) |
| Spawn subprocess | DENIED | MCP server is the only process; cannot spawn more |
| Access keychain | DENIED | Only MiMo's keychain adapter |

### 9.3 Plugin lifecycle [TARGET — Bible Part 25.5]

```
install (owner provides MCP server URL/path)
  → PolicyEngine.reviewPermissions(declared)
  → owner approves
  → Plugin row created (state=enabled)
  → MCPBridge connects (separate process)
  → Tools/Agents registered
  → PluginRegistry event emitted
  → Owner can invoke via @-mention in chat (Bible 25.1)

disable (per-project or global)
  → MCPBridge disconnects
  → Tools/Agents unregistered (or hidden)

uninstall
  → Plugin row deleted (soft, 30-day grace)
  → MCPBridge disconnects permanently
  → Plugin's tools/agents removed from registry
  → Plugin's files (if any) archived
```

### 9.4 Slash blocks + hooks [TARGET — Bible Part 25.9, 25.10]

- **Slash blocks** (`/summarize`, `/translate`, etc.) are user-facing plugin primitives. They render as composable blocks in the composer (Bible Part 25.9 — Notion pattern).
- **Hooks** (`after-edit: auto-run-tests`, `after-save: auto-format`) are event-driven (subscribe to `ARTIFACT_UPDATED`, `MESSAGE_EDITED`). Configurable per-project (Bible Part 25.10 — Claude Code pattern).
- Both go through the same plugin permission model.

### 9.5 [CURRENT] state

No plugins exist (Audit §6.2). MCP bridge is greenfield.

---

## 10. Agent API (internal)

### 10.1 The `Agent` interface [TARGET — Bible Part 8]

```typescript
interface Agent {
  readonly id: string;              // 'agent:planner'
  readonly role: 'Planner' | 'Researcher' | 'Builder' | 'Reviewer' | 'Verifier';
  readonly requiredTools: string[];
  readonly defaultModelDimension: 'cheap' | 'fast' | 'deep' | 'vision' | 'local';
  readonly defaultScope: 'read-only' | 'src' | 'docs' | 'full-workspace';
  readonly defaultSandboxMode: 'read-only' | 'workspace-write' | 'danger';

  execute(input: AgentInput, ctx: AgentContext): Promise<AgentOutput>;
}

interface AgentInput {
  task: Task;
  context: ContextObject;
  tools: Tool[];
  model: Model;
}

interface AgentOutput {
  result: unknown;
  artifacts: Artifact[];
  events: MiMoEvent[];              // events emitted during execution
}
```

### 10.2 How agents are invoked [TARGET]

- Only the `Orchestrator` invokes agents (Constitution §6.1).
- The Orchestrator selects an agent by `registry.withCapability(taskType)`.
- The agent's `execute()` runs within the Orchestrator's `Execution` row (so all events have the right `correlationId`).
- The agent's tool calls go through the PolicyEngine (Constitution §7.4).
- The agent's model calls go through the `Model` interface (Constitution §8.1).

### 10.3 Sub-agent delegation [TARGET — Bible Part 8.4]

- A parent agent (via Orchestrator) can spawn a sub-agent for an isolated sub-task.
- Sub-agent inherits parent's scope (cannot escalate — Bible 22.6).
- Sub-agent has its own `Execution` row, linked to parent via `parentExecutionId`.
- `AGENT_DELEGATED` event emitted (Event Architecture §3.7).

---

## 11. Tool API

### 11.1 The `Tool` interface [TARGET — Bible Part 25.2]

```typescript
interface Tool {
  readonly id: string;              // 'tool:web_search'
  readonly name: string;
  readonly description: string;
  readonly category: 'search' | 'memory' | 'file' | 'shell' | 'network' | 'compute' | 'custom';
  readonly inputSchema: ZodSchema;
  readonly outputSchema: ZodSchema;
  readonly requiredPermissions: Permission[];

  execute(input: unknown, ctx: ToolContext): Promise<unknown>;
}

interface ToolContext {
  executionId: string;
  agentId: string;
  projectId: string;
  sandboxMode: 'read-only' | 'workspace-write' | 'danger';
}
```

### 11.2 Tool invocation flow [TARGET]

```
Agent → tool.execute(input, ctx)
  → PolicyEngine.authorize(ctx.agentId, tool, input) → Decision
      if Decision = deny       → TOOL_DENIED event; throw
      if Decision = require_approval → TOOL_APPROVAL_REQUIRED event; pause Execution
      if Decision = allow      → proceed
  → Tool.execute() runs (with timeout + sandbox enforcement)
  → Tool returns output
  → output validated against outputSchema
  → TOOL_RESULT_RECEIVED event
  → return to Agent
```

### 11.3 Built-in tools [TARGET — Bible Part 8.1]

| Tool | Sandbox | Permission |
|---|---|---|
| `memory_recall` | read-only | none |
| `memory_store` | workspace-write | memory.write |
| `web_search` | n/a | network.call |
| `file_read` | read-only | file.read.<scope> |
| `file_write` | workspace-write | file.write.<scope> |
| `terminal` (Bible 8.1 — Verifier/Builder) | danger | shell.exec (always requires approval, even with trust) |
| `image_generate` | n/a | provider.call (image) |

### 11.4 [CURRENT] state

3 tools exist (Audit §4.3): WebSearch, MemoryRecall, MemoryStore. No PolicyEngine gate. No tool-calling protocol — ResearchAgent manually invokes `web_search` (Audit §4.3).

---

## 12. Artifact API

### 12.1 Endpoints [TARGET]

See §1.3 inventory. Key flows:

- **Create:** agent or user → `POST /api/artifact/create` → server writes blob → returns artifactId → `ARTIFACT_CREATED` event.
- **Version:** `POST /api/artifact/:id/version` → new blob + new ArtifactVersion row → `ARTIFACT_UPDATED` event.
- **Read content:** `GET /api/artifact/:id/content?v=<n>` → streams blob from filesystem (range requests supported for large artifacts).
- **Share URL:** `GET /artifact/<uuid>` (public route — read-only snapshot, no auth in v1 since local-first).
- **Hunk accept/reject:** `POST /api/artifact/:id/hunk/accept` (Bible 10.5) → applies hunk → emits `ARTIFACT_HUNK_ACCEPTED`.

### 12.2 Runtime API (code artifacts) [TARGET — Bible Part 11.4]

- **Python:** Pyodide/WASM in a Web Worker (in-browser sandbox — Bible 11.4). Owner's data never leaves the page.
- **React/HTML:** CSP-locked `<iframe sandbox="allow-scripts">` with no same-origin access.
- **System-level code execution:** gVisor-style sandbox — DEFERRED (Constitution §10.4).

The runtime API is invoked by the ArtifactViewer component (client-side), NOT by an API route. Server only stores + serves the content.

---

## 13. Memory API

### 13.1 Endpoints [TARGET]

- `GET /api/memory?projectId=...&type=...&scope=...&q=...&limit=...` — list with filters + FTS5 search.
- `POST /api/memory/create` — explicit save (Bible 5.12).
- `POST /api/memory/:id/edit` — edit (creates MemoryEdit row).
- `POST /api/memory/:id/delete` — hard delete (Bible 5.12 — one-click).
- `POST /api/memory/:id/scope` — change scope (project ↔ global).

### 13.2 Recall API (internal) [TARGET]

- `MemoryEngine.recall(query: MemoryQuery, ctx): Promise<MemoryEntry[]>` — used internally by ContextBuilder, NOT exposed as HTTP.
- Semantic retrieval via `Embedding` table + sqlite-vec / HNSW.
- Hybrid retrieval (FTS5 + semantic + graph) for complex queries (Bible 6.10).

---

## 14. Knowledge API

### 14.1 Endpoints [TARGET]

- `GET /api/knowledge?projectId=...&type=...` — list entities.
- `GET /api/knowledge/:id` — entity detail (evidence, changes, relationships, confidence history).
- `GET /api/knowledge/:id/relationships` — edges.
- `GET /api/knowledge/:id/linked-references` — explicit relationships.
- `GET /api/knowledge/:id/unlinked-references` — implicit mentions (Bible 6.14).

### 14.2 Retrieval API (internal) [TARGET]

- `KnowledgeEngine.retrieveRelated(entityId, depth): Promise<Entity[]>` — graph traversal.
- `KnowledgeEngine.retrieveSemantic(query, topN): Promise<Entity[]>` — embedding-based.
- Both internal — not exposed as HTTP (used by ContextBuilder for context resolution).

---

## 15. Search API (Universal Search — Bible Part 14)

### 15.1 Endpoint [TARGET]

- `GET /api/search?q=<query>&scope=project|global&kinds=conversation,memory,knowledge,file,artifact,command,project,agent`
- Returns grouped results (Bible 14.3): `[{ kind, results: [{ id, title, subtitle, icon, badge }] }]`.
- Ranking: fuzzy score + recency + frequency (Bible 14.5).
- Uses FTS5 across MessageFTS, MemoryFTS, ArtifactFTS, FileFTS (parallel queries).
- For memory/knowledge: also semantic retrieval (top N by embedding similarity).
- For commands: client-side fuzzy (no server round-trip — Bible 14.2 local-first).

### 15.2 Prefix grammar [TARGET — Bible Part 14.4]

The Command Palette (`/api` not needed — client-side) parses prefix:
- `>cmd` — commands.
- `/search` — universal search.
- `@mem` — memory.
- `#file` — files.
- `!ai` — quick AI.

The prefix is client-side; only the underlying searches hit the API.

---

## 16. Cross-cutting API rules

### 16.1 Thin routes [TARGET — Constitution §11.1, Bible Part 27.6]

Every API route:
1. Validates input (Zod).
2. Calls Core (via `core/index.ts`).
3. Shapes response (universal envelope).
4. Logs errors (Core logger + `SYSTEM_ERROR_OCCURRED` event).
5. Returns.

No business logic. No direct DB access. No direct provider calls. No long-running computation (use Task queue for >1s work).

### 16.2 Defensive APIs [TARGET — Bible Part 25.3]

Every Core API function wrapped in `safe()` (try/catch) at the API route layer. Errors caught and converted to the universal error envelope. No route throws an uncaught exception.

### 16.3 Latency budget [TARGET — Bible Part 20.2]

| Operation | Budget |
|---|---|
| `GET /api/mimo/workspace` (cached) | <50ms |
| `GET /api/memory` (filtered) | <100ms |
| `GET /api/search` (FTS only) | <100ms |
| `GET /api/search` (hybrid: FTS + semantic + graph) | <250ms |
| `POST /api/chat` (first token) | <1000ms (cached context) |
| `POST /api/memory/create` | <50ms |
| `POST /api/artifact/create` (small content) | <100ms |

### 16.4 Caching headers [TARGET]

- `GET /api/mimo/workspace`: `Cache-Control: max-age=6` (Bible 26.4).
- `GET /api/memory`, `/api/knowledge`: `Cache-Control: max-age=6, must-revalidate`.
- `GET /api/artifact/:id/content`: `Cache-Control: immutable` (content-addressed by version).
- All mutations: `Cache-Control: no-store`.

### 16.5 CORS [TARGET]

- `Access-Control-Allow-Origin: http://localhost:3000` (only the MiMo UI origin).
- No wildcard.
- v2 (if mobile companion): add the companion's origin.

### 16.6 [CURRENT] state

No universal envelope, no Zod schemas, no defensive `safe()`, no caching headers, no CORS config. All greenfield.

---

## 17. [CURRENT] → [TARGET] migration

### 17.1 M1 — Adapter isolation [MIGRATION]

1. Create `core/capabilities/image/ImageCapability.ts` interface.
2. Move ZAI image logic to `core/capabilities/image/ZAIImageAdapter.ts`.
3. Update `/api/image` to call the capability.
4. Verify `/api/search` already routes through `SearchProvider` (it should, per Audit §1.2).
5. Add ESLint rule `no-restricted-imports` banning `z-ai-web-dev-sdk` outside adapters.
6. Verify build passes.

### 17.2 M2 — Repository layer [MIGRATION]

1. Create `core/repositories/*` for each domain entity.
2. Move all `prisma.*` calls out of API routes into repositories.
3. API routes call repositories via `core/index.ts`.
4. Verify no `@prisma/client` import outside `core/repositories/`.

### 17.3 M3 — Universal envelope + Zod [MIGRATION]

1. Define `ApiResponse<T>` + `ApiError` in `core/types.ts`.
2. Define Zod schemas for every route's input.
3. Refactor each route to use the envelope.
4. Add `safe()` wrapper.

### 17.4 M5 — PolicyEngine [MIGRATION]

1. Implement `PolicyEngine.authorize()`.
2. Wire every tool invocation through it.
3. Add `/api/permissions/*` and `/api/trust-ledger/*` routes.

### 17.5 M9 — Real streaming [MIGRATION]

1. Switch `/api/chat` to SSE format.
2. Use `ZAIModel.stream()` (real model streaming — Audit §18 #2).
3. Stream ExecutionTrace events (`stage`, `token`, `tool`, `artifact`, `done`).
4. Add `/api/events` SSE endpoint for catch-up.

### 17.6 M10 — Plugin API [MIGRATION]

1. Implement `core/plugins/MCPBridge.ts`.
2. Add `/api/plugin/*` routes.
3. First MCP plugin: a "hello world" tool, to validate the bridge end-to-end.

---

## 18. Open questions

1. **[UNKNOWN]** Should `/api/events` use SSE or WebSocket? Lean: SSE — simpler, one-way (server→client), sufficient for event fan-out. WebSocket only if we need bidirectional (v2 mobile companion — Bible 26.12).
2. **[UNKNOWN]** Should the universal envelope be applied to streaming responses? Lean: yes — wrap each SSE event in the envelope's `data` shape for consistency. Non-streaming responses use the envelope directly.
3. **[UNKNOWN]** How to handle file uploads (multipart) — Next.js App Router has `Request.formData()` support. Acceptable. No need for a separate upload service.
4. **[UNKNOWN]** Whether to expose `MemoryEngine.recall()` as an HTTP endpoint for external tools (e.g., a Raycast extension). Lean: not in v1. Plugins access via MCP. External tools wait for v2.
5. **[UNKNOWN]** How to version the MCP plugin protocol independently of the MiMo API. Lean: separate versioning — MCP protocol version is its own thing; MiMo's compatibility is declared per-plugin (`minimumMiMoVersion`).

---

## 19. Summary

MiMo's API architecture is deliberately thin:

- **One public Core API** (`src/core/index.ts`) — the only entry point to business logic.
- **~40 HTTP routes** — thin wrappers that validate, call Core, shape response.
- **One universal envelope** for all responses (success + error).
- **One canonical `Model` interface** — provider SDKs live behind adapters, never leak.
- **One PolicyEngine** — every tool invocation gated.
- **One MCP bridge** — plugins are external processes, never share address space.
- **SSE for streaming** — chat (token + stage events) and event fan-out.

The architecture respects:
- **Constitution §8** — provider-agnostic; adapters absorb provider quirks.
- **Constitution §11** — no business logic in routes; thin wrappers only.
- **Constitution §7.4** — every tool call through PolicyEngine.
- **Constitution §9** — plugins are external; cannot import MiMo internals.
- **Bible Part 25.3** — no bypass paths to the Core pipeline.
- **Bible Part 27.6** — UI → API → Core → Infrastructure, never skipping layers.

Migration from [CURRENT] (5 routes, 2 of which bypass Core, no envelope, no streaming) to [TARGET] (~40 routes, all through Core, universal envelope, real SSE streaming) is sequenced as M1 (adapters) → M2 (repositories) → M3 (envelope + Zod) → M5 (policy) → M9 (streaming) → M10 (plugins). Each phase independently shippable; none breaks the working chat pipeline.

**End of API Architecture.**
