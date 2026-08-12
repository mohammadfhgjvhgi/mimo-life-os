# MiMo — Tool Architecture
### Phase: Foundation From The Ground Up — ARCH-B (Doc 6 of 6)

**Status:** ARCHITECTURE. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Scope:** A unified tool contract. Identity, description, capabilities, input/output schemas, permissions, risk levels, confirmation, timeouts, retry, audit, cancellation. Tool categories. Security boundary between AI reasoning and actual execution.
**Source of truth:** Product Bible Part 22 (Security), Part 25 (Plugin/API Architecture), Part 8.6 (Agent Permissions), Part 9.2 (Approval Points), Part 9.7 (Cancel/Retry). `MiMo_Current_System_Audit.md` §4.3, §9.2. `src/core/tools/`, `src/core/registry/`.

---

## 0. Label Legend

- `[CURRENT]` — what exists today in `src/core/tools/`.
- `[TARGET]` — what this architecture specifies.
- `[MIGRATION]` — how to get there.
- `[FACT]` — verifiable from code.
- `[INFERENCE]` — architect's reasoned conclusion.
- `[UNKNOWN]` — open question.

---

## 1. The Core Principle

> **Tools are the bridge between AI reasoning and real-world effect.** Every tool is a typed, permissioned, audited, cancellable, time-bounded operation. AI proposes; tools dispose — under explicit permission gates. [PRODUCT INVARIANT — Bible Part 22.4, Part 25.2]

A tool is NOT:
- A function the AI calls freely (no permission, no audit).
- A wrapper around an SDK (the SDK is the adapter; the tool is the contract).
- A plugin (plugins are external; tools are MiMo-native + plugin-exposed).

A tool IS:
- A declared capability with input/output schemas.
- A permissioned operation (read-only / workspace-write / danger).
- An audited action (every invocation logged).
- A cancellable operation (timeout + abort).
- A retryable operation (transient failures retried with policy).

---

## 2. The Security Boundary [TARGET — INVARIANT]

```
┌──────────────────────────────────────────────────────────┐
│  AI REASONING LAYER (no real-world effect)               │
│  - Model output: "I want to call web_search(query=X)"   │
│  - Tool call is a STRUCTURED REQUEST, not execution      │
└────────────────────────┬─────────────────────────────────┘
                         │
            ┌────────────▼─────────────┐
            │  APPROVAL GATE           │
            │  - Permission check      │
            │  - Risk level check      │
            │  - Trust ledger check    │
            │  - User confirmation     │ (if required)
            └────────────┬─────────────┘
                         │
┌────────────────────────▼─────────────────────────────────┐
│  EXECUTION LAYER (real-world effect)                     │
│  - ToolRegistry.execute(toolId, input, context)          │
│  - Sandbox enforcement                                   │
│  - Timeout enforcement                                  │
│  - Cancellation token                                   │
│  - Audit trail (write BEFORE execution, update AFTER)    │
└──────────────────────────────────────────────────────────┘
```

**[INVARIANT]** AI never executes tools directly. AI emits a `ToolCall` request; the Orchestrator + ApprovalGate + ToolRegistry mediate every execution. [Bible Part 22.4]

### 2.1 The Pre-Execution Audit Pattern [TARGET]

For destructive operations, the audit log is written BEFORE execution:
1. AuditEntry created with `status = 'pending'`, `inputs = {...}`, `timestamp = now`.
2. Tool executes.
3. AuditEntry updated with `status = 'success' | 'failed'`, `outputs`, `durationMs`.

If MiMo crashes mid-execution, the `pending` AuditEntry signals an interrupted operation — surfaced for recovery on next boot.

### 2.2 [CURRENT] Deficiency

[CURRENT] No security boundary. WebSearchTool calls `provider.search()` directly. No approval gate, no audit log, no permission check. [FACT — `src/core/tools/WebSearchTool.ts`]

---

## 3. The Unified Tool Contract [TARGET]

Every tool MUST declare:

```typescript
interface Tool {
  // Identity
  id: string;                            // stable, kebab-case (e.g. 'web_search', 'file_read')
  name: string;                          // display name
  version: string;                       // '1.0.0'
  description: string;                   // shown to AI in tool spec
  category: ToolCategory;
  icon?: string;
  
  // Capabilities + schemas
  capabilities: ToolCapability[];         // what this tool can do (for routing)
  inputSchema: JSONSchema;                // strict, validated by Zod
  outputSchema: JSONSchema;               // strict, validated by Zod
  
  // Permissions + risk
  permissions: ToolPermission[];          // ['network:read', 'filesystem:read', ...]
  riskLevel: RiskLevel;                   // 'safe' | 'elevated' | 'dangerous'
  confirmationRequired: ConfirmationPolicy;  // 'never' | 'first_use' | 'always' | 'destructive_only'
  
  // Operational
  timeoutMs: number;                     // default; per-call override allowed
  retryPolicy: RetryPolicy;              // per-tool retry config
  cancellable: boolean;                  // can it be cancelled mid-execution?
  idempotent: boolean;                   // safe to retry without side effects?
  
  // Execution
  execute(input: unknown, context: ToolExecutionContext): Promise<ToolExecutionResult>;
  
  // Metadata
  requiresNetwork?: boolean;
  requiresFilesystem?: boolean;
  requiresShell?: boolean;
  requiresApiKey?: string;               // keychain key name, if needed
  minMiMoVersion?: string;
  deprecated?: { since: string; replacedBy?: string };
}

interface ToolExecutionContext {
  readonly runId: string;
  readonly stepId: string;
  readonly agentId: string;
  readonly scope: AgentScope;
  readonly sandbox: SandboxMode;
  readonly approvalPolicy: ApprovalPolicy;
  readonly cancellationToken: CancellationToken;
  readonly projectRoot: string;
  readonly userId: string;
  readonly conversationId: string;
  readonly auditLog: AuditLogger;
}

interface ToolExecutionResult {
  success: boolean;
  output: unknown;                       // matches outputSchema
  error?: ToolError;
  durationMs: number;
  sideEffects?: SideEffect[];             // for rollback
  auditId: string;                        // audit entry ID
}
```

### 3.1 [CURRENT] Deficiency

[CURRENT] `Tool` interface (`src/core/registry/types.ts`) has only `{ id, name, description, category, inputSchema, outputSchema, permissions, execute() }`. No version, no capabilities, no riskLevel, no confirmationRequired, no timeout, no retryPolicy, no cancellable, no idempotent, no execution context, no side effects, no audit. [FACT]

---

## 4. Tool Categories [TARGET — Bible Part 25.2]

| Category | Tools (TARGET) | Default risk | Default approval |
|---|---|---|---|
| **filesystem** | `file_read`, `file_write`, `file_delete`, `file_search`, `folder_list` | safe / elevated / dangerous | first_use |
| **shell** | `shell_exec`, `shell_exec_trusted` | dangerous | always (unless trusted) |
| **browser** | `browser_navigate`, `browser_click`, `browser_snapshot`, `browser_form_fill`, `browser_extract` | elevated | first_use |
| **search** | `web_search`, `web_fetch`, `image_search` | safe | first_use |
| **database** | `db_query`, `db_execute` (sandboxed) | elevated | first_use |
| **code execution** | `code_exec_python` (sandboxed), `code_exec_javascript` (CSP iframe), `code_exec_wasm` | elevated | first_use |
| **communication** | `email_send`, `message_send`, `notification` | dangerous | always |
| **scheduling** | `task_schedule`, `task_cancel`, `daemon_register` | elevated | first_use |
| **external APIs** | `http_request`, `mcp_call` | elevated | first_use |
| **system tools** | `clipboard_read`, `clipboard_write`, `notification_show`, `file_open_external` | elevated | first_use |
| **memory** (existing) | `memory_recall`, `memory_store`, `memory_forget` | safe / elevated | never / first_use |
| **knowledge** (TARGET) | `knowledge_retrieve`, `knowledge_inspect` | safe | never |
| **artifact** (TARGET) | `artifact_create`, `artifact_update`, `artifact_version` | elevated | first_use |

[INFERENCE — categories align with Bible Part 25.2 ("Tools registered in ToolRegistry, each declares: id, name, description, category, inputSchema, outputSchema, permissions, execute()"). This doc sharpens the contract significantly.]

### 4.1 [CURRENT] Deficiency

[CURRENT] 3 tools: WebSearch, MemoryRecall, MemoryStore. No filesystem, shell, browser, code execution, or external API tools. [FACT — `src/core/tools/`]

---

## 5. Permissions [TARGET — Bible Part 22.4]

### 5.1 Permission Vocabulary

```typescript
type ToolPermission =
  // Filesystem
  | 'filesystem:read'
  | 'filesystem:write'
  | 'filesystem:delete'
  // Network
  | 'network:read'           // GET requests, search
  | 'network:write'           // POST/PUT, external sends
  | 'network:local'          // localhost only
  // Shell
  | 'shell:exec'             // process spawn
  | 'shell:read'             // read stdout
  // Memory + Knowledge
  | 'memory:read'
  | 'memory:write'
  | 'memory:delete'
  | 'knowledge:read'
  | 'knowledge:write'
  // System
  | 'clipboard:read'
  | 'clipboard:write'
  | 'notification:show'
  | 'process:spawn'           // any subprocess
  // External
  | 'api:external'            // calls to external APIs (with API key)
  | 'mcp:invoke';            // calls to MCP plugins
```

### 5.2 Permission Checking [TARGET]

Before execution, the ApprovalGate checks:
1. Tool's declared `permissions[]` — what the tool needs.
2. Caller's `scope` + `sandbox` — what the agent is allowed.
3. Project's `tool_permissions` config — what the project allows.
4. Trust ledger — whether this task type is auto-approved.

If ANY of these deny → `PermissionDeniedError`. Approval required escalated to user.

### 5.3 [CURRENT] Deficiency

[CURRENT] Tools declare `permissions: string[]` (e.g. `['network:read']`) but no system checks them. The ToolRegistry stores tools; the Orchestrator calls them; no permission gate. [FACT — Audit §9.2]

---

## 6. Risk Levels [TARGET — Bible Part 22.4]

### 6.1 Three Risk Levels

| Level | Definition | Examples | Default approval |
|---|---|---|---|
| `safe` | Read-only, no side effects, no network, no destructive ops | `file_read`, `memory_recall`, `knowledge_retrieve` | never |
| `elevated` | Side effects but reversible, scoped to workspace | `file_write` (in scope), `code_exec_python` (sandboxed), `web_search` | first_use (then trust ledger) |
| `dangerous` | Irreversible, external, or system-wide | `file_delete`, `shell_exec`, `email_send`, `db_execute` | always (override via trust ledger) |

### 6.2 Risk Assessment Rules [TARGET]

A tool is `dangerous` if ANY of:
- It can delete data (`file_delete`, `memory_forget` with `purge` mode).
- It sends data externally (`email_send`, `http_request POST`, `message_send`).
- It spawns processes outside MiMo (`shell_exec`).
- It modifies system state (`clipboard_write`, `notification_show` to OS).
- It accesses secrets (`api:external` with API key).

A tool is `elevated` if it has side effects but all are:
- Reversible (within 30 days via rollback).
- Scoped to project workspace.
- Logged for audit.

A tool is `safe` if it ONLY reads + returns data.

### 6.3 [CURRENT] Deficiency

[CURRENT] No risk levels. WebSearchTool (which makes external network calls) has same priority as MemoryRecallTool (which reads local memory). [FACT]

---

## 7. Confirmation + Approval Points [TARGET — Bible Part 9.2]

### 7.1 Confirmation Policy

```typescript
type ConfirmationPolicy = 
  | 'never'                  // safe tools (memory_recall, file_read)
  | 'first_use'              // ask once, then trust ledger
  | 'always'                 // ask every time (file_delete, shell_exec)
  | 'destructive_only';     // ask only if input indicates destructive action
```

### 7.2 When Confirmation is Required [TARGET — Bible Part 9.2]

Mandatory approval before:
- **Destructive actions** (delete files, overwrite code, send external requests).
- **Code/UI execution** (plan approval gate — Replit/Lovable pattern).
- **First-time tool use** (per task type — until trust earned).
- **External network** (web requests, API calls — unless pre-approved).

### 7.3 When Confirmation is NOT Required [TARGET — Bible Part 9.6]

- Read-only operations (memory recall, file read, search).
- Trusted task types (after 3 approvals — "Always allow this kind").
- Background daemon tasks (pre-approved by owner at scheduling time).

### 7.4 Confirmation Fatigue Prevention [TARGET — Bible Part 9.8]

- Per-task-type trust (not per-instance).
- "Always allow this kind" after 3 approvals.
- No approval storms (Codex/Manus anti-pattern).
- Trust ledger visible + editable in Settings.
- Sandbox modes reduce approval need.

### 7.5 [CURRENT] Deficiency

[CURRENT] No confirmation system. No approval gate. [FACT]

---

## 8. Timeouts [TARGET]

### 8.1 Default Timeouts per Category

| Category | Default timeout | Reason |
|---|---|---|
| filesystem (read) | 5s | Local disk is fast |
| filesystem (write) | 30s | Large files possible |
| shell_exec | 60s (configurable per call) | Long-running shells are common |
| browser | 30s per action | Network latency |
| search | 15s | External API |
| code_exec_python | 30s (sandboxed) | Prevent infinite loops |
| code_exec_javascript | 30s (CSP iframe) | Same |
| memory_recall | 1s | Local query |
| knowledge_retrieve | 5s | Local query + graph |
| http_request | 30s | External |
| mcp_call | 60s | Plugin latency |

### 8.2 Timeout Handling [TARGET]

- On timeout: emit `tool.timeout` event.
- Mark tool execution as `failed` with error code `timeout`.
- Apply retry policy (if retryable).
- If non-retryable OR retries exhausted: return `ToolError` to caller.

### 8.3 Per-call override [TARGET]

The caller (Orchestrator) can override the default timeout per invocation:
```typescript
tool.execute(input, { ...context, timeoutMs: 120000 });
```

Override CANNOT exceed `maxTimeoutMs` (per-tool hard cap, e.g. 5 minutes for shell_exec).

### 8.4 [CURRENT] Deficiency

[CURRENT] No timeouts. WebSearchTool can hang forever. [FACT]

---

## 9. Retry Policy [TARGET — Bible Part 7.12]

### 9.1 Per-Tool Retry Configuration

```typescript
interface RetryPolicy {
  maxRetries: number;                    // default 0 for dangerous, 3 for safe/elevated
  backoffStrategy: 'fixed' | 'exponential' | 'jittered';
  initialDelayMs: number;               // default 500
  maxDelayMs: number;                   // default 8000
  retryableErrors: string[];            // ['timeout', 'rate_limit', 'network', '5xx']
  nonRetryableErrors: string[];          // ['invalid_input', 'permission_denied', 'auth_failed', 'content_filter']
}
```

### 9.2 Default Per Category [TARGET]

| Category | Default maxRetries | Reason |
|---|---|---|
| safe | 3 | Transient failures common; no side effects |
| elevated (idempotent) | 2 | Limited retries; idempotent so safe |
| elevated (non-idempotent) | 0 | Don't retry if side effects may compound |
| dangerous | 0 | Never auto-retry destructive ops |

### 9.3 Idempotency [TARGET]

A tool declares `idempotent: true` if:
- Calling it twice with same inputs has same effect as calling once (e.g. `file_write` overwrites — same result).
- It has no side effects (e.g. `file_read`).

A tool declares `idempotent: false` if:
- It produces a new side effect each call (e.g. `email_send` sends another email).
- It increments a counter, creates a new record, etc.

Non-idempotent tools are NEVER auto-retried.

### 9.4 [CURRENT] Deficiency

[CURRENT] No retry. Tools either succeed or throw. [FACT]

---

## 10. Audit Behavior [TARGET — Bible Part 22.9]

### 10.1 Every Tool Invocation Audited

```typescript
interface ToolAuditEntry {
  id: string;
  timestamp: number;
  toolId: string;
  toolVersion: string;
  runId: string;
  stepId: string;
  agentId: string;
  inputs: unknown;                       // sanitized (secrets redacted)
  scope: AgentScope;
  sandbox: SandboxMode;
  approvalPolicy: ApprovalPolicy;
  approvedBy: 'user' | 'auto' | 'trusted' | 'pre_approved';
  approvalDecisionId?: string;
  status: 'pending' | 'success' | 'failed' | 'cancelled' | 'timeout';
  output?: unknown;                      // sanitized
  error?: { code: string; message: string };
  durationMs: number;
  sideEffects?: SideEffect[];
  retryAttempt?: number;
}
```

### 10.2 Audit Log is Append-Only [TARGET — INVARIANT]

[INVARIANT — Bible Part 22.9] The audit log is never deleted. Even if a tool's effects are rolled back, the audit entry remains. This preserves full provenance.

### 10.3 Secret Redaction [TARGET]

Before writing inputs/outputs to audit:
- Replace API keys, tokens, passwords with `<redacted:key_name>`.
- Pattern-based redaction (regex for common secret formats).
- Sanitization applied to inputs AND outputs.

### 10.4 Visibility [TARGET]

- DeveloperPanel → Events tab (full audit log, filterable).
- Per-conversation audit summary (collapsible).
- Per-tool usage statistics.

### 10.5 [CURRENT] Deficiency

[CURRENT] No audit log. Tool calls are not recorded. [FACT — Audit §9.5]

---

## 11. Cancellation Behavior [TARGET — Bible Part 9.7]

### 11.1 Cancellation Tokens

```typescript
interface CancellationToken {
  isCancelled: boolean;
  onCancel(handler: () => void): Unsubscribe;
  cancel(): void;
}
```

Every tool execution receives a `cancellationToken` in its context. The tool is responsible for polling it (for long-running operations) or wiring it to underlying AbortController (for HTTP requests).

### 11.2 Cancellation Semantics [TARGET]

- Cancellation is **cooperative**: MiMo signals cancel; the tool decides when to stop.
- For HTTP-based tools: AbortController + fetch.
- For subprocess tools (shell_exec): SIGTERM → wait 5s → SIGKILL.
- For sandboxed code execution: kill the worker thread / process.
- For database queries: AbortSignal on query.

### 11.3 What Cancellation Does NOT Do [TARGET]

- Does NOT roll back side effects already committed (e.g. if `file_write` wrote 90% of file before cancel, the file is partially written).
- For atomic side effects: the tool should use temp-file-then-rename pattern to ensure atomicity.
- For non-atomic side effects: rollback is handled by RecoveryEngine (see `MiMo_Agent_Architecture.md` §12).

### 11.4 Cancellation + Audit [TARGET]

- On cancellation: audit entry updated with `status = 'cancelled'`.
- Partial outputs (if any) recorded.
- Side effects recorded for potential rollback.

### 11.5 [CURRENT] Deficiency

[CURRENT] No cancellation. Tools run to completion or hang forever. [FACT]

---

## 12. Input + Output Schema Validation [TARGET]

### 12.1 Strict Validation

Every tool's `inputSchema` and `outputSchema` is a JSON Schema. Validated by Zod at runtime.

```typescript
// On tool registration:
function registerTool(tool: Tool) {
  const inputValidator = compileSchema(tool.inputSchema);
  const outputValidator = compileSchema(tool.outputSchema);
  // Store validators alongside tool.
}

// On execution:
function executeTool(toolId, input, context) {
  const tool = registry.get(toolId);
  const validatedInput = tool.inputValidator.parse(input);  // throws ZodError on invalid
  const result = await tool.execute(validatedInput, context);
  const validatedOutput = tool.outputValidator.parse(result.output);  // throws on invalid
  return { ...result, output: validatedOutput };
}
```

### 12.2 Why Strict Validation?

- AI-generated tool inputs are unreliable (hallucinated fields, wrong types).
- Strict validation prevents silent failures downstream.
- Zod error messages guide AI retry ("Your input failed: query must be string, got number").

### 12.3 [CURRENT] Status

[CURRENT] Tools declare schemas but they are NOT validated. `inputSchema` is JSON-Schema-like (`{ type: 'object', properties: {...}, required: [...] }`) but no validator runs. Tools manually check inputs (e.g. `WebSearchTool` checks `if (!inp?.query || typeof inp.query !== 'string')`). [FACT]

---

## 13. Tool Registry [TARGET — Bible Part 25.2]

### 13.1 Registry Interface

```typescript
interface ToolRegistry {
  register(tool: Tool): void;
  unregister(toolId: string): void;
  
  get(toolId: string): Tool | undefined;        // never throws on miss — returns undefined (Bible Part 25.2)
  list(filter?: ToolFilter): Tool[];
  
  // Capability queries
  byCategory(category: ToolCategory): Tool[];
  byPermission(perm: ToolPermission): Tool[];
  byRiskLevel(level: RiskLevel): Tool[];
  
  // Execution (with full mediation)
  execute(toolId: string, input: unknown, context: ToolExecutionContext): Promise<ToolExecutionResult>;
  
  // Permission filtering for context
  availableForScope(scope: AgentScope, sandbox: SandboxMode): Tool[];
  
  // Health
  healthReport(): ToolHealthReport;
}
```

### 13.2 Registry is the Only Execution Path [TARGET — INVARIANT]

Domain logic NEVER calls `tool.execute()` directly. It calls `toolRegistry.execute()`. The registry:
1. Validates input schema.
2. Checks permissions.
3. Checks risk level + confirmation policy.
4. Writes pre-execution audit entry.
5. Executes with timeout + cancellation.
6. Validates output schema.
7. Writes post-execution audit entry.
8. Returns validated result.

[INVARIANT — Bible Part 25.3: "No bypass paths."]

### 13.3 [CURRENT] Status

[CURRENT] `ToolRegistry` exists in `src/core/registry/`. It's a thin Map of toolId → Tool. No execution mediation — agents call `tool.execute()` directly. No permission check, no audit, no timeout, no cancellation, no schema validation. [FACT]

---

## 14. Tool Discovery for AI [TARGET — Bible Part 7.8]

### 14.1 Tool Spec Sent to AI

When the AI is asked to decide tool calls, the ToolRegistry produces a list of `AIToolSpec`:

```typescript
function toAIToolSpec(tool: Tool, context: ToolExecutionContext): AIToolSpec | null {
  // Filter by scope + sandbox + permissions.
  if (!isAvailableForContext(tool, context)) return null;
  
  return {
    name: tool.id,
    description: tool.description,
    inputSchema: tool.inputSchema,
    requiredCapabilities: tool.capabilities,
  };
}
```

### 14.2 Tools are Filtered per Agent [TARGET]

Not all tools are visible to all agents. The Reasoner + Orchestrator filter:
- By agent's `requiredTools` declaration.
- By project's `tool_permissions` config.
- By sandbox + scope.

A Planner agent (read-only) sees only `memory_recall`, `knowledge_retrieve`. A Builder agent (workspace-write) sees `file_read`, `file_write`, `code_exec_python`, etc.

### 14.3 [CURRENT] Deficiency

[CURRENT] Tools are not exposed to AI as tool specs. The ResearchAgent manually invokes `web_search` — the AI doesn't decide. [FACT — Audit §4.3]

---

## 15. Plugin Tools (MCP) [TARGET — Bible Part 25]

### 15.1 Plugin Tool Wrapping

MCP plugins expose tools. MiMo wraps each MCP tool as a MiMo `Tool` with:
- Same contract (schemas, permissions, risk, timeout, audit, cancellation).
- `permissions: ['mcp:invoke']` always set.
- `riskLevel: 'dangerous'` by default (unless plugin is signed + verified).
- `confirmationRequired: 'first_use'` (or 'always' for unsigned plugins).

### 15.2 Plugin Permission Approval [TARGET — Bible Part 25.6]

- Plugin declares required permissions at install.
- User approves at install time.
- Per-project scope.
- No remote code execution (plugin runs locally via MCP server, separate process).

### 15.3 Plugin Sandboxing [TARGET — Bible Part 25.8]

- MCP servers run in separate process.
- No access to MiMo internals (only via public API).
- Plugin tools have a separate tool ID namespace: `plugin:<plugin_id>:<tool_name>`.

### 15.4 [CURRENT] Deficiency

[CURRENT] No plugin system. No MCP integration. [FACT]

---

## 16. Side Effects + Rollback [TARGET — Bible Part 9.4, 24]

### 16.1 Side Effect Declaration

Tools that produce side effects declare them:

```typescript
interface SideEffect {
  type: 'file_write' | 'file_delete' | 'shell_exec' | 'memory_write' | 'memory_delete' | 'artifact_create' | 'artifact_update' | 'external_send';
  path?: string;                  // for filesystem
  beforeHash?: string;            // hash before change (for rollback)
  afterHash?: string;             // hash after change
  reversible: boolean;
  rollbackAction?: () => Promise<void>;
}
```

### 16.2 Rollback Strategy [TARGET]

For each side effect type:
- `file_write`: restore from `beforeHash` (requires snapshot before write — temp file or git).
- `file_delete`: restore from trash (soft delete in `.mimo/trash/`).
- `shell_exec`: NOT reversible (rollback = warn user).
- `memory_write`: delete the memory created (if `idempotent: false`).
- `memory_delete`: restore from `archived` status.
- `external_send`: NOT reversible (rollback = warn user + record).

### 16.3 Rollback is Best-Effort [TARGET]

Not all side effects can be rolled back. The RecoveryEngine surfaces what can + cannot be rolled back. The user decides whether to proceed.

### 16.4 Aider Pattern: Git Auto-Commit [TARGET — Bible Part 9.4]

For filesystem tools in projects with git:
- Every `file_write` is preceded by a git commit (snapshot of current state).
- Rollback = `git revert` (one command).
- For projects without git: MiMo maintains a shadow-commit in `.mimo/snapshots/`.

### 16.5 [CURRENT] Deficiency

[CURRENT] No side effect tracking. No rollback. [FACT]

---

## 17. Trust Boundaries for Tools

| Boundary | What crosses | Enforced by |
|---|---|---|
| AI → ToolRegistry | ToolCall request | Orchestrator + ApprovalGate (per `MiMo_Agent_Architecture.md`) |
| ToolRegistry → Tool | Validated input + context | ToolRegistry (schema validation + permission check) |
| Tool → Filesystem | Read/Write path | FilesystemPermissionGate (Bible Part 22.5) |
| Tool → Network | HTTP request | NetworkPermissionGate (Bible Part 22.7) |
| Tool → Shell | Process spawn | ShellPermissionGate (sandboxed — Bible Part 22.8) |
| Tool → Memory | Read/Write | MemoryEngine (per `MiMo_Memory_Architecture.md`) |
| Tool → Knowledge | Read/Write | KnowledgeGraph (per `MiMo_Knowledge_Architecture.md`) |
| Tool → External API | HTTP with API key | APIKeyVault (keychain-stored, never in code) |
| Tool → Audit | Audit entry | AuditLogger (append-only, sanitized) |
| Plugin Tool → MCP | RPC to MCP server | Plugin process boundary (separate process) |
| Tool → Cancellation | Cancel signal | CancellationToken (cooperative) |

### 17.1 Secrets Never Enter Tool Inputs [TARGET — INVARIANT]

API keys, passwords, tokens are NEVER passed as tool inputs. They live in:
- OS keychain (macOS Keychain / Windows Credential Manager / Linux Secret Service).
- Retrieved at execution time by the ToolRegistry.
- Injected into the tool's HTTP request via environment variable or header.
- NEVER logged in audit (sanitized to `<redacted>`).

[INVARIANT — Bible Part 22.3]

---

## 18. Migration Path [MIGRATION]

### Phase 1 — Tool Contract Generalization
- Extend `Tool` interface with all fields per §3.
- Add `ToolExecutionContext`, `ToolExecutionResult`, `SideEffect`, `RetryPolicy`.
- Refactor existing 3 tools (WebSearch, MemoryRecall, MemoryStore) to new contract.

### Phase 2 — ToolRegistry Mediation
- Move tool execution to `ToolRegistry.execute()` (agents no longer call `tool.execute()` directly).
- Add input/output schema validation (Zod).
- Add timeout enforcement.

### Phase 3 — Permission Gate
- Implement `ApprovalGate` (between Orchestrator and ToolRegistry).
- Implement permission checking (tool's permissions vs. agent's scope + sandbox).
- Implement risk-level-based confirmation.

### Phase 4 — Audit Log
- Add `ToolAuditEntry` table (append-only).
- Implement pre-execution + post-execution audit.
- Implement secret redaction.
- Surface in DeveloperPanel → Events tab.

### Phase 5 — Cancellation
- Add `CancellationToken` to `ToolExecutionContext`.
- Wire cancellation to AbortController (HTTP), SIGTERM (shell), worker kill (code_exec).
- Wire user-cancel button in ExecutionTrace.

### Phase 6 — Retry Policy
- Implement per-tool retry configuration.
- Implement idempotency check (refuse retry on non-idempotent tools).
- Implement error classification (retryable vs non-retryable).

### Phase 7 — Filesystem Tools
- Add `file_read`, `file_write`, `file_delete`, `file_search`, `folder_list`.
- Implement FilesystemPermissionGate.
- Implement path-traversal protection (no `../` escapes from project root).
- Implement git auto-commit before writes (Aider pattern).

### Phase 8 — Shell + Code Execution
- Add `shell_exec` (with sandbox).
- Add `code_exec_python` (Pyodide or subprocess with gVisor-style isolation — Bible Part 22.8).
- Add `code_exec_javascript` (CSP-locked iframe).

### Phase 9 — Browser Tools
- Add `browser_navigate`, `browser_click`, `browser_snapshot`, `browser_extract`.
- Use headless browser (Playwright or agent-browser skill).
- All browser actions audited + screenshot captured.

### Phase 10 — Side Effects + Rollback
- Implement `SideEffect` tracking.
- Implement rollback per side effect type.
- Wire to RecoveryEngine (`MiMo_Agent_Architecture.md` §12).

### Phase 11 — Plugin Tools (MCP)
- Add MCP client (per Bible Part 25.1).
- Wrap MCP tools as MiMo `Tool` instances.
- Add plugin install + permission approval flow.

### Phase 12 — Trust Ledger Integration
- Wire tool execution to TrustLedgerEntry.
- Auto-approve after 3 approvals (per task type).
- Surface trust ledger in Settings.

Each phase independently shippable. Phase 1 + 2 unblock everything.

---

## 19. Open Questions [UNKNOWN]

| # | Question | Why it matters | Investigation |
|---|---|---|---|
| 1 | Sandboxing: gVisor (Linux only) vs WASM (universal) vs subprocess + seccomp? | Platform support + isolation strength | Default to subprocess + seccomp on Linux, WASM where possible |
| 2 | Pyodide vs Python subprocess for code_exec_python? | Pyodide is sandboxed by default; subprocess needs more isolation | Pyodide first; subprocess for cases needing native libs |
| 3 | Browser tool: Playwright (heavy) vs simple HTTP fetch + readability? | Many "browser" tasks just need content extraction | Two tools: `web_fetch` (simple) + `browser_navigate` (full browser) |
| 4 | Should tool inputs be sanitized for prompt-injection before execution? | AI may receive malicious inputs via web content | Yes — sanitize all string inputs, strip control chars |
| 5 | How to handle tools that need interactive input (e.g. prompts)? | Tools should be non-interactive | Reject interactive tools; require all inputs upfront |
| 6 | Should plugins be signed? How? | Trust model for plugin tools | v1: unsigned + user approval; v2: signed + verified |
| 7 | Audit log retention — forever, or 1 year, or 30 days? | Storage cost vs audit completeness | Forever for dangerous, 1 year for elevated, 30 days for safe — configurable |
| 8 | What's the max tool execution time before forced cancellation? | Prevent runaway tools | Default 5 min hard cap; configurable per-tool up to 30 min |

---

## 20. Non-Goals

- Agent runtime (see `MiMo_Agent_Architecture.md`).
- AI layer / model routing (see `MiMo_AI_Architecture.md`).
- Memory + Knowledge internals (see respective architectures).
- Plugin marketplace (Bible Part 25.12 — future v2+).
- UI rendering of tool calls (ExecutionTrace — covered in future frontend architecture).

---

## 21. Summary

[CURRENT]: 3 tools (WebSearch, MemoryRecall, MemoryStore) in `src/core/tools/`, registered in `ToolRegistry` (thin Map). Tool interface: `{ id, name, description, category, inputSchema, outputSchema, permissions, execute() }`. No version, no capabilities, no risk levels, no confirmation, no timeouts, no retry, no cancellation, no audit, no schema validation, no side effects, no rollback. Agents call `tool.execute()` directly — no mediation. No permission gate. No filesystem, shell, browser, code execution, or external API tools.

[TARGET]: Unified tool contract with 13 mandatory fields (identity, version, capabilities, input/output schemas, permissions, risk level, confirmation policy, timeout, retry policy, cancellable, idempotent, execute, metadata). 12 tool categories. 3 risk levels (safe/elevated/dangerous). 4 confirmation policies (never/first_use/always/destructive_only). Per-category default timeouts. Retry policy with idempotency check. Pre-execution + post-execution audit (append-only, secret-redacted). Cooperative cancellation via CancellationToken. Strict input/output schema validation (Zod). ToolRegistry as the ONLY execution path (no bypass). Side effect tracking with best-effort rollback (Aider git auto-commit pattern for filesystem). Plugin tools (MCP) wrapped as MiMo Tools with separate namespace + sandboxed process. Trust ledger integration (3-approval auto-trust per task type).

[MIGRATION]: 12 phases. Phase 1 (contract generalization) + Phase 2 (registry mediation) unblock everything. Each phase independently shippable.

**Invariant:** AI never executes tools directly. AI proposes; tools dispose — under explicit permission gates, with audit, timeout, cancellation, and rollback. Every tool is a typed, permissioned, audited, cancellable, time-bounded operation. Secrets never enter tool inputs. The audit log is append-only.
