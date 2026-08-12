# Tool Runtime

**Category:** Tools
**Status:** CORE
**Maturity:** Production-ready

## Definition
The **Tool Runtime** is the subsystem that owns the full lifecycle of a tool invocation: lookup in the registry → permission check → policy evaluation → (optional) approval gate → sandboxed execution → result capture → tracing → context update. It is the **single chokepoint** through which every agent action that touches the outside world must pass.

It is *not* the tools themselves (those are individual capabilities — search, browser, shell, file, code-exec, git, etc.). It is the **execution environment + policy envelope** around them.

## Problem Solved
Without a centralized Tool Runtime:
- Tools are called ad-hoc from anywhere → no permission enforcement, no audit, no retry, no sandbox.
- Each tool implements its own error handling → inconsistent behavior.
- No way to apply global policies (rate limits, approval gates, cost caps).
- No way to trace which agent called what with what result.
- No way to roll back side-effects.

The Tool Runtime provides a **uniform execution contract**: every tool call goes through the same pipeline, gets the same guarantees (permissions, sandbox, retry, trace, audit), and produces the same result shape.

## Why It Matters
For MiMo AI, the Tool Runtime is **Layer 9 of the runtime OS** — the boundary between the LLM's intent ("call shell with these args") and the system's action (actually executing shell in a sandbox with scoped filesystem, network policy, and timeout). It is the **primary safety surface**: if an agent goes rogue, the Tool Runtime is what stops it.

It is also the **primary observability surface**: every external action is logged, traced, cost-attributed, and replayable.

## How It Works

### Tool call pipeline
```
agent emits tool_call { name, args }
         │
         ▼
┌─────────────────────────────────────────────────┐
│ 1. Registry lookup                              │
│    - find ToolSpec by name                      │
│    - validate args against Zod schema           │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│ 2. Permission check                             │
│    - caller agent's permissions ∩ tool required │
│    - ABAC: context attributes (task, user, env) │
└──────────────────────┬──────────────────────────┘
                       │  allow
                       ▼
┌─────────────────────────────────────────────────┐
│ 3. Policy engine                                │
│    - rate limit, cost cap, quota                │
│    - dry-run? approval required?                │
│    - prompt-injection scan on args              │
└──────────────────────┬──────────────────────────┘
                       │  proceed
                       ▼
┌─────────────────────────────────────────────────┐
│ 4. Approval gate (if required)                  │
│    - request user approval via socket.io        │
│    - block until approved/denied/timeout        │
└──────────────────────┬──────────────────────────┘
                       │  approved
                       ▼
┌─────────────────────────────────────────────────┐
│ 5. Sandbox provisioning                         │
│    - allocate isolated FS / process / network   │
│    - apply resource quotas (CPU, RAM, time)     │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│ 6. Execution (with retries)                     │
│    - invoke tool implementation                 │
│    - on failure: retry per policy               │
│    - capture stdout/stderr/exitcode/artifacts   │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│ 7. Result shaping + tracing                     │
│    - shape into ToolResult {ok, data, error}    │
│    - write trace span (args, result, dur, cost) │
│    - audit log entry                            │
└──────────────────────┬──────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────┐
│ 8. Context update                               │
│    - append ToolResult to agent's context       │
│    - mark as untrusted input (fenced)           │
└─────────────────────────────────────────────────┘
```

### Tool registration
```typescript
type ToolSpec = {
  name: string;
  description: string;        // shown to LLM
  inputSchema: ZodSchema;     // args validation
  outputSchema: ZodSchema;    // result validation
  category: 'read' | 'write' | 'execute' | 'network' | 'meta';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  requiredPermissions: Permission[];
  sandbox: 'none' | 'process' | 'vm' | 'container';
  defaultTimeoutMs: number;
  retryPolicy: RetryPolicy;
  approvalPolicy: 'never' | 'high-risk' | 'always';
  rateLimit?: { windowMs; maxCalls };
  costEstimate?: (args) => number;
  handler: (args, ctx) => Promise<ToolResult>;
};
```

## Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                       Tool Runtime                              │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────────┐  │
│  │ Registry │  │ Policy   │  │ Approval │  │ Sandbox Mgr   │  │
│  │          │  │ Engine   │  │ Gateway  │  │ (process/vm/  │  │
│  │ ToolSpecs│  │          │  │          │  │  container)   │  │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └───────┬───────┘  │
│       └──────────────┴─────────────┴───────────────┘           │
│                              │                                  │
│                       ┌──────▼──────┐                          │
│                       │  Executor   │  ← retries, timeout       │
│                       └──────┬──────┘                          │
│                              │                                  │
│                       ┌──────▼──────┐                          │
│                       │   Tracer    │  → logs/metrics/spans     │
│                       └──────┬──────┘                          │
│                              │                                  │
│                       ┌──────▼──────┐                          │
│                       │ Audit Log   │  → Prisma + SQLite       │
│                       └─────────────┘                          │
└─────────────────────────────────────────────────────────────────┘
        ▲                                         │
        │ tool_call                               │ ToolResult
        │                                         ▼
   ┌────┴────┐                            ┌──────────────┐
   │  Agent  │                            │ Agent Context│
   │ Runtime │                            │ (appended)   │
   └─────────┘                            └──────────────┘
```

## Interfaces
- `ToolRuntime.call(toolCall: ToolCall, ctx: CallContext): Promise<ToolResult>`
- `ToolRuntime.register(spec: ToolSpec): void`
- `ToolRuntime.list(filter?): ToolSummary[]` (for LLM tool surface)
- `ToolCall { name: string; args: unknown; callId: string; callerAgentId: string; taskId: string }`
- `CallContext { agentId, taskId, user, permissions, budgetRemaining, dryRun: bool }`
- `ToolResult { ok: boolean; data?: unknown; error?: { code, message, retryable }; artifacts: Artifact[]; durationMs; costUsd; traceSpanId }`

## Dependencies
- Tool Registry (Prisma `Tool` table or static TS registry).
- Permission system (RBAC + ABAC, Layer 15 Security).
- Policy Engine (rules engine; see `tool_policy_engine.md`).
- Approval Workflow (user-facing; see `approval_workflow.md`).
- Sandbox manager (process / VM / container; see `sandboxing.md`).
- Retry system (exponential backoff, jitter).
- Tracer (OpenTelemetry-compatible spans).
- Audit log (Prisma `ToolCallAudit` table).
- Event Bus (socket.io for live UI + approval requests).

## Strengths
- **Single chokepoint** — every tool call goes through one pipeline; guarantees uniform safety + observability.
- **Pluggable** — new tools register via `ToolSpec`; no runtime code changes.
- **Typed** — Zod schemas on input/output catch schema mismatches before execution.
- **Auditable** — every call logged with caller, args, result, duration, cost.
- **Resilient** — retries + timeouts + circuit breakers per tool.
- **Safe** — sandboxing + policy + approval gates layered defense.

## Weaknesses
- **Latency floor** — pipeline adds ~5–20ms overhead per call (acceptable for most tools; matters for high-frequency calls).
- **Complexity** — many moving parts (registry, policy, approval, sandbox, retry, trace).
- **Configuration burden** — each tool needs a full `ToolSpec`; missing fields = silent gaps.
- **Single point of failure** — if Tool Runtime is down, no agent can act. Needs redundancy.

## Failure Modes
- **Tool not found** — registry miss; reject with clear error.
- **Schema mismatch** — args don't match Zod; reject + re-prompt agent.
- **Permission denied** — caller lacks required permissions; reject + log.
- **Policy violation** — rate limit / cost cap / quota exceeded; reject + log.
- **Approval timeout** — user didn't respond; reject + log + optionally retry.
- **Sandbox failure** — couldn't provision; reject + alert.
- **Tool execution failure** — handler threw; retry per policy; on exhaustion, return error.
- **Timeout** — tool exceeded `defaultTimeoutMs`; kill + return error.
- **Result schema mismatch** — output doesn't match `outputSchema`; log + return error (don't pass invalid data to agent).

## Security Implications
- Every tool call is **authenticated** (caller identified), **authorized** (RBAC+ABAC), **audited** (full record), **sandboxed** (filesystem/network isolation for high-risk tools), and **rate-limited**.
- Prompt-injection defense: tool args scanned for known injection patterns; high-risk args (URLs, shell commands) get extra scrutiny.
- Tool outputs are tagged untrusted in agent context (fenced, system-tagged).
- Critical tools (shell, file-write, network POST) require approval gate.
- Kill switch: Tool Runtime exposes `/api/tools/kill` to abort all in-flight tool calls.

## Performance Implications
- Pipeline overhead ~5–20ms per call (negligible vs. tool execution time for most tools).
- Sandbox provisioning: process-based ~10ms; container-based ~100–500ms (cold start); VM-based seconds.
- Retries multiply latency: 3 retries with exponential backoff can add 1–10s.
- Tracing overhead: ~1ms per span (OpenTelemetry in-process).

## Operational Implications
- Per-tool reliability metrics (success rate, p50/p99 latency, error breakdown) → observability dashboard.
- Tool health checks (registry ping) — detect dead tools.
- Tool versioning: `ToolSpec` is versioned; old versions retained for replay.
- Cost attribution per call → per-agent cost rollup.
- Audit log retention policy (90 days hot, 1 year cold).

## Alternatives
- **Direct tool calls from agent** — no runtime; rejected (no safety, no audit).
- **MCP (Model Context Protocol)** — standardizes tool definitions; we adopt MCP as the tool surface format (see `function_calling.md`), with Tool Runtime as the execution backend.
- **LangChain Tools** — Python-centric; we use Vercel AI SDK tools (TS-native).
- **OpenAI Assistants function calling** — provider-locked; we abstract via Vercel AI SDK.

## Maturity & Production Readiness
**Production-ready.** Every agent framework has a tool runtime (Vercel AI SDK `tool`, LangChain `Tool`, OpenAI Agents SDK `function_tool`). The differentiation is in the safety/observability rigor — MiMo AI's runtime is more demanding than typical.

## Relevant Research / Papers
- Yao et al. 2022 — *ReAct* (tool use as part of the agent loop).
- Schick et al. 2023 — *Toolformer* (LLMs teaching themselves to use tools).
- Patil et al. 2023 — *Gorilla* (LLM connected to massive APIs).
- Anthropic — *Model Context Protocol* (MCP) spec (2024) — industry-standard tool interface.
- Qin et al. 2023 — *ToolLLM* (large-scale tool use evaluation).

## Official Documentation
- Vercel AI SDK — `tool()` helper, `tools` parameter on `streamText`/`generateText`.
- Anthropic MCP — modelcontextprotocol.io.
- LangChain Tools — python.langchain.com/docs/modules/tools.
- OpenAI Function Calling — platform.openai.com/docs/guides/function-calling.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Tool Runtime as a mini-service**: dedicated `tool-runtime-service` (bun process, own port, reached via Caddy `?XTransformPort=4030`). Rationale: isolates tool execution (especially sandboxed code/shell) from the main Next.js process; a runaway tool cannot crash the UI server. **Default placement for v1**: separate mini-service. The main Next.js process calls it via internal HTTP (or in-process for read-only tools if latency-critical).
- **Registry**: Prisma `Tool` table for dynamic tools (loaded at startup) + static TS registry for built-in tools. Hybrid: built-ins in code, user-defined in DB.
- **ToolSpec in Zod**: input + output schemas validated at runtime; mismatch → reject.
- **Vercel AI SDK integration**: `tool({ description, parameters: inputSchema, execute: (args) => toolRuntime.call({name, args, ctx}) })` — the SDK's `execute` callback is our pipeline entry point.
- **socket.io**: emit `tool:called`, `tool:approved`, `tool:executing`, `tool:completed`, `tool:failed` events. **zustand** `useToolStore` shows live tool calls in the observability panel. Approval requests push to the Approval Center UI.
- **Prisma schema**:
  - `Tool` (id, name, version, category, riskLevel, spec JSON, enabled, createdAt)
  - `ToolCallAudit` (id, callId, toolName, callerAgentId, taskId, argsHash, args JSON, resultHash, result JSON, status, durationMs, costUsd, traceSpanId, timestamp) — append-only, indexed on `(taskId, timestamp)`.
- **Sandbox manager**: see `sandboxing.md` — `node:vm` for pure JS, `child_process` with seccomp/firejail for shell, Docker for full isolation. Provisioned per call (or pooled for hot tools).
- **Retry policy**: exponential backoff with jitter; per-tool configurable; default 3 retries for transient errors, 0 for permission/schema errors.
- **Kill switch**: `/api/tools/kill` endpoint + socket.io broadcast; aborts all in-flight calls, kills sandboxes, marks as `cancelled`.
- **Caddy**: routes `/tool-runtime` traffic to the mini-service port; internal-only for non-approval endpoints.

## Relevance To Our Project (MiMo AI layered runtime)
The Tool Runtime is **Layer 9** of the runtime OS. It is called by the Agent Runtime (Layer 8) when an agent emits a tool call. It depends on Layer 15 (Security — permissions, policy, approval) and Layer 10 (Execution — sandbox provisioning). It feeds results back into Layer 2 (Context — appended as untrusted observation) and Layer 12 (Observability — traces + audit).

It is the **single safety + observability chokepoint** for every external action — the architectural component that makes autonomous operation trustworthy enough to deploy.

## Recommended Usage
- Every tool call (no exceptions) goes through the Tool Runtime.
- Every tool has a complete `ToolSpec` (Zod schemas, riskLevel, permissions, sandbox, retry, approval policy).
- High-risk tools (shell, file-write, network POST, code-exec) require sandbox + approval.
- Audit every call; retain per policy.
- Live observability of all in-flight calls.
- Kill switch always available.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** centralized Tool Runtime as a dedicated mini-service (`tool-runtime-service`, port 4030, Caddy `?XTransformPort=4030`). **ADOPT** Zod-validated ToolSpec + full audit. **DEFER** container-based sandbox (Docker) to v1.x if `node:vm`+`child_process` proves insufficient for v1.

## Sources
- Yao et al. 2022 — ReAct (arxiv.org/abs/2210.03629)
- Schick et al. 2023 — Toolformer (arxiv.org/abs/2302.04761)
- Patil et al. 2023 — Gorilla (arxiv.org/abs/2305.15334)
- Qin et al. 2023 — ToolLLM (arxiv.org/abs/2307.16789)
- Anthropic MCP (modelcontextprotocol.io)
- Vercel AI SDK tools (sdk.vercel.ai/docs/ai-sdk-core/tools-and-function-calling)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 9 Tool), §5 (Tool components)
- MiMo AI `CAPABILITY_MAP.md` §7 (tool registry, runtime gateway = C)
