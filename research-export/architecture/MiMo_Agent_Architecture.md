# MiMo — Agent Architecture
### Phase: Foundation From The Ground Up — ARCH-B (Doc 5 of 6)

**Status:** ARCHITECTURE. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Scope:** Agents as a real runtime system. Pipeline, identity, capabilities, tools, policies, permissions, planning, execution, state, events, checkpoints, pause/resume/cancel/retry/rollback, validation, recovery, audit trail. Single-agent vs multi-agent rules with explicit justification.
**Source of truth:** Product Bible Part 8 (Agent Architecture), Part 9 (Human ↔ AI Collaboration), Part 10 (Execution/Runtime UX), Part 22 (Security), Part 24 (Error/Recovery). `MiMo_Current_System_Audit.md` §1.4, §4.3. `src/core/agents/`, `src/core/orchestrator/`, `src/core/registry/`.

---

## 0. Label Legend

- `[CURRENT]` — what exists today in `src/core/agents/`, `src/core/orchestrator/`, `src/core/registry/`.
- `[TARGET]` — what this architecture specifies.
- `[MIGRATION]` — how to get there.
- `[FACT]` — verifiable from code.
- `[INFERENCE]` — architect's reasoned conclusion.
- `[UNKNOWN]` — open question.

---

## 1. The Core Principle

> **Agents are a real runtime, not a metaphor.** An agent is a stateful, observable, interruptible, recoverable computation unit. It has identity, capabilities, permissions, state, events, and an audit trail. It is NOT just a function the orchestrator calls.

Default: **single-agent sequential pipeline.** Multi-agent is justified ONLY when (a) each parallel agent has independent capability, (b) per-agent visibility is provided, (c) one agent genuinely cannot perform the task. [PRODUCT DECISION — Bible Part 8.8]

---

## 2. The Pipeline [TARGET — Bible Part 10.2]

```
Intent → Context → Plan → Approval → Execution → Observation → Validation → Recovery → Result
```

| Stage | Purpose | Who runs it | When it pauses for user |
|---|---|---|---|
| **Intent** | Detect user intent from input | Reasoner (rule-based today, model-routed later) | Never |
| **Context** | Assemble ContextObject | ContextBuilder | Never (compression may surface) |
| **Plan** | Build step-by-step plan | Planner agent | **Always** for code/UI; never for chat |
| **Approval** | User approves plan or clarifies | User (gate) | Always when required (Part 9.2) |
| **Execution** | Run plan steps via agents + tools | Orchestrator | Per tool-call approval (if not trusted) |
| **Observation** | Collect tool outputs + agent results | Orchestrator | Never |
| **Validation** | Validate output completeness + safety | Validator | Never (unless validation requires user input) |
| **Recovery** | If failure, suggest recovery strategies | RecoveryEngine | If user must choose strategy |
| **Result** | Return validated response | Workflow | Never |

[FACT — Bible Part 10.2 specifies 6 stages (Context → Reason → Plan → Execute → Validate → Done). This architecture adds Intent (before Context) and Approval (between Plan and Execution), and Observation + Recovery as implicit stages. Total: 9 stages. The CURRENT pipeline has 5 (Context → Reason → Plan → Execute → Validate) per Audit §1.4.]

### 2.1 [CURRENT] Deficiency

[CURRENT] `src/core/workflow/WorkflowEngine.runWorkflow()` does: `buildContext → reason → plan → execute → validate`. No Approval gate. No Observation as a discrete stage. No Recovery. No pause/resume. No checkpoints. [FACT]

---

## 3. Agent Identity [TARGET]

Every agent is a named, registered, typed identity. Not an ad-hoc function.

```typescript
interface AgentIdentity {
  id: string;                  // 'planner' | 'researcher' | 'builder' | 'reviewer' | 'verifier' | 'memory'
  displayName: string;          // shown in AgentDock
  version: string;              // '1.0.0' — for compatibility tracking
  description: string;
  capabilities: AgentCapability[];  // ['plan', 'research', 'code', 'review', 'memory_recall', 'memory_store', ...]
  requiredTools: string[];      // tool IDs this agent can invoke
  defaultModelClass: 'cheap' | 'balanced' | 'deep' | 'vision' | 'local';
  defaultScope: AgentScope;    // read-only | src | docs | full-workspace
  defaultSandbox: 'read-only' | 'workspace-write' | 'danger';
  defaultApprovalPolicy: 'untrusted' | 'on-request' | 'never';
  maxConcurrentInvocations: number;  // 1 by default (single-agent sequential)
}
```

### 3.1 Built-in Agents [TARGET — Bible Part 8.1]

| Agent | Role | Stage | Tools | Default model class |
|---|---|---|---|---|
| **Planner** | Detect intent, build plan | Intent + Plan | memory_recall, memory_store | balanced |
| **Researcher** | Web research, source gathering | Execution (research mode) | web_search, browser_navigate, browser_snapshot | balanced |
| **Builder** | Writes code, runs commands | Execution (code/build mode) | file_read, file_write, terminal, code_exec | deep |
| **Reviewer** | Checks completeness, errors, format | Validation | (analysis only — no tools) | balanced |
| **Verifier** | Runs tests, validates diffs | Validation (code mode) | terminal, file_read, test_run | cheap |
| **Memory** | Recall + store memory | Throughout (memory ops) | memory_recall, memory_store | cheap |

[CURRENT] has 4: Planner, Researcher, Memory, Writer. Writer conflates Builder + Reviewer. [FACT — Audit §1.4, §13 reusable assets.]

[INFERENCE — splitting Writer into Builder + Reviewer + Verifier follows Bible Part 8.1 explicitly. The split enables per-agent model routing + per-agent permissions.]

### 3.2 [CURRENT] Deficiency

[CURRENT] Agent interface has `{ id, name, description, capabilities, requiredTools, execute() }`. No version, no defaultModelClass, no scope, no sandbox, no approval policy, no concurrency limit. [FACT — `src/core/registry/types.ts`]

---

## 4. Agent Capabilities [TARGET]

Capabilities gate what an agent can do. The orchestrator checks capabilities before invoking.

```typescript
type AgentCapability =
  // Reasoning
  | 'intent_detection'
  | 'planning'
  | 'reasoning'
  // Information
  | 'memory_recall'
  | 'memory_store'
  | 'knowledge_retrieve'
  | 'web_search'
  | 'browser_automation'
  // Creation
  | 'code_generation'
  | 'code_review'
  | 'code_execution'
  | 'file_read'
  | 'file_write'
  | 'shell_exec'
  // Validation
  | 'validation'
  | 'test_run'
  // Communication
  | 'conversation'
  | 'artifact_creation'
  // Management
  | 'subagent_spawn';
```

An agent's `capabilities` array MUST match its `requiredTools` (an agent cannot declare `code_generation` capability without `file_write` + `code_exec` tools available).

### 4.1 [CURRENT] Deficiency

[CURRENT] Capabilities are a freeform string array. No validation against tools. The PlannerAgent declares `['plan', 'intent_detection']` but the type does not enforce. [FACT]

---

## 5. Agent Permissions [TARGET — Bible Part 8.6, 22.4]

### 5.1 Three Permission Dimensions

| Dimension | Values | Default | Override |
|---|---|---|---|
| `scope` (file access) | `read-only` / `src` / `docs` / `full-workspace` | per-agent default | User can tighten per task; never loosen beyond agent default |
| `sandbox` (write ability) | `read-only` / `workspace-write` / `danger` | per-agent default | User can tighten; never loosen |
| `approval_policy` | `untrusted` / `on-request` / `never` | per-agent default | User can loosen per task type after 3 approvals (trust ledger) |

### 5.2 Default Permissions Per Agent [TARGET]

| Agent | Default scope | Default sandbox | Default approval |
|---|---|---|---|
| Planner | read-only | read-only | untrusted (but planner doesn't execute — N/A) |
| Researcher | read-only | read-only | on-request (web calls need approval unless trusted) |
| Builder | src | workspace-write | untrusted (plan approval required) |
| Reviewer | read-only | read-only | never (analysis only) |
| Verifier | src | workspace-write | on-request (test running) |
| Memory | read-only (memory only) | read-only | never (memory ops are not destructive) |

### 5.3 Sub-agent Permission Inheritance [TARGET — Bible Part 22.6]

> Sub-agents inherit parent scope. They CANNOT escalate.

If parent agent has `scope = src`, sub-agent CANNOT get `scope = full-workspace`. If parent has `sandbox = read-only`, sub-agent CANNOT get `sandbox = workspace-write`.

### 5.4 [CURRENT] Deficiency

[CURRENT] No permissions. Any agent can do anything. [FACT — Audit §9.2]

---

## 6. Per-Task-Type Trust Ledger [TARGET — Bible Part 8.7]

### 6.1 The Trust Ledger

A per-project, per-task-type, per-scope record of how much trust the user has granted.

```typescript
interface TrustLedgerEntry {
  projectId: string;
  taskType: string;              // 'code_write' | 'test_run' | 'web_search' | 'file_delete' | 'shell_exec' | ...
  scope: AgentScope;
  approvalsCount: number;       // how many times user approved this task type
  autoApprovedAt: number | null; // null until approvalsCount >= 3
  lastApprovalAt: number;
  lastRejectionAt: number | null;
  rejectionCount: number;
}
```

### 6.2 Trust Threshold

- After 3 approvals → offer "Always allow this kind for this project" (Bible Part 8.7).
- After 1 rejection → reset approvalsCount to 0 + offer to never ask (move to `never` approval).
- Trust is per-task-type, NOT per-instance (Bible Part 8.7 invariant).

### 6.3 Visibility

- Trust ledger visible + editable in Settings.
- User can revoke "always allow" anytime.
- User can see history of approvals/rejections.

### 6.4 [CURRENT] Deficiency

[CURRENT] No trust ledger. Every action requires approval (if approval were enforced, which it isn't). [FACT]

---

## 7. Agent State + Context [TARGET]

### 7.1 Agent State

Every agent invocation has state. State is checkpointed (see §10).

```typescript
interface AgentState {
  agentId: string;
  runId: string;
  stepId: string;
  status: AgentRunStatus;        // idle | planning | awaiting_approval | executing | observing | validating | done | error | paused | cancelled
  startedAt: number;
  updatedAt: number;
  
  // Inputs
  inputs: Readonly<Record<string, unknown>>;
  context: Readonly<ContextObject>;
  
  // Outputs (incremental)
  outputs: Record<string, unknown>;
  artifacts: Artifact[];
  
  // Tool calls
  toolCalls: ToolCallRecord[];
  
  // Reasoning trace
  reasoningTrace: string;
  
  // Permissions at invocation time (frozen)
  permissions: FrozenPermissions;
  
  // Checkpoints
  checkpoints: Checkpoint[];
  
  // Parent (for sub-agents)
  parentRunId?: string;
  
  // Audit
  auditTrail: AuditEntry[];
}
```

### 7.2 Agent Context

The agent receives a slice of the ContextObject, NOT the whole thing. The Orchestrator filters context by:
- What the agent's capabilities need (memory_recall capability → memory.relevant).
- What the agent's scope permits (file_read capability → files_in_scope, filtered by scope).

The agent does NOT see other agents' state (unless explicitly passed via `depOutputs`).

### 7.3 [CURRENT] Deficiency

[CURRENT] Agents are stateless functions. `Agent.execute(task, context)` returns `AgentResult`. No state object, no checkpoints, no audit trail, no tool call records. [FACT]

---

## 8. Planning [TARGET — Bible Part 7.9, 8.1]

### 8.1 Plan Structure [TARGET]

```typescript
interface Plan {
  id: string;
  intent: Intent;
  steps: PlanStep[];
  requiredAgents: string[];
  requiredTools: string[];
  complexity: 'low' | 'medium' | 'high';
  estimatedDurationMs: number;
  estimatedCostUsd?: number;
  requiresApproval: boolean;       // true for code/UI/long-running
  approvable: boolean;             // true if user can edit before approval
}

interface PlanStep {
  id: string;
  description: string;
  agentId: string;
  toolId?: string;
  dependsOn: string[];
  inputs?: Record<string, unknown>;
  expectedDurationMs?: number;
  approvalRequired?: boolean;      // override per-step
}
```

### 8.2 Plan Surface Rules [TARGET — Bible Part 9.5]

A plan is surfaced for approval BEFORE execution when:
1. Task type is `creation` (code/UI).
2. Task is `long-running` (>30s estimated).
3. Task involves destructive actions (delete, overwrite, external send).
4. First-time tool use for this task type.
5. Trust not yet earned.

A plan is NOT surfaced when:
- Task type is `question` (simple chat).
- All tools in plan are in trusted set.
- User explicitly disabled plan surfacing for this task type.

### 8.3 [CURRENT] Deficiency

[CURRENT] Plan exists in `src/core/types.ts:152-159` with `{ id, intent, steps, requiredAgents, requiredTools, complexity }`. No `requiresApproval`, no `approvable`, no duration estimate, no cost estimate. Plans are never surfaced for approval — the Orchestrator executes them directly. [FACT]

---

## 9. Execution [TARGET]

### 9.1 Orchestrator Responsibilities

1. Receive plan.
2. Validate permissions (each step's agent must have capabilities for its tools).
3. Topologically sort steps by `dependsOn`.
4. For each step (in order):
   a. Spawn agent invocation (with frozen state + permissions).
   b. Wait for agent to complete OR pause for approval OR fail.
   c. Record step result.
   d. If step has `approvalRequired = true` and not trusted → pause for user.
   e. If step failed and downstream steps depend → trigger recovery (§13).
5. After all steps complete → assemble Run result.
6. Emit `run.completed` event.

### 9.2 Sequential by Default [TARGET — Bible Part 8.8]

Default: steps execute sequentially in dependency order. No parallel execution.

### 9.3 Parallel Execution [TARGET — Bible Part 8.8, with justification]

Parallel execution is allowed ONLY when ALL of:
1. Each parallel step has independent scope (no shared files, no shared state).
2. Each parallel step is visible in AgentDock as a separate nested entry.
3. The user has explicitly approved parallel execution (or trust ledger allows).
4. The total parallelism is capped (default: 3 concurrent agents).

Parallel execution is FORBIDDEN when:
- Steps share file scope (race conditions).
- Steps write to shared memory (consistency).
- One step's output is another step's input (sequential dependency).
- The user has not opted in.

[INFERENCE — Bible Part 8.8 explicitly defaults to single-agent sequential; parallel requires justification.]

### 9.4 [CURRENT] Deficiency

[CURRENT] Orchestrator executes steps in dependency order, sequentially. No parallel execution (correct default). No permission validation, no approval pause, no recovery, no state freezing. [FACT — `src/core/orchestrator/Orchestrator.ts`]

---

## 10. Checkpoints + Pause/Resume/Cancel [TARGET — Bible Part 9.7]

### 10.1 Checkpoint Model

Every step boundary is a checkpoint. The orchestrator snapshots:

```typescript
interface Checkpoint {
  id: string;
  runId: string;
  stepId: string;                 // the step just completed (or about to start)
  stepIndex: number;
  timestamp: number;
  agentState: AgentState;
  // Side effects so far (for rollback)
  sideEffects: SideEffect[];       // [{ type: 'file_write', path, beforeHash, afterHash }, ...]
}
```

### 10.2 Pause [TARGET — Bible Part 9.7]

- User clicks Pause (or `Esc`).
- Orchestrator stops at the next checkpoint (does NOT interrupt a tool mid-execution — waits for safe point).
- State preserved in DB table `Checkpoint`.
- AgentDock shows "paused" state.

### 10.3 Resume [TARGET]

- User clicks Resume.
- Orchestrator loads latest checkpoint, continues from there.
- Re-validates permissions + trust ledger (in case anything changed during pause).

### 10.4 Cancel [TARGET — Bible Part 9.7]

- User clicks Cancel (or `Esc Esc` for one-keystroke rewind, Bible Part 9.4).
- Orchestrator stops.
- Partial results kept (visible in conversation).
- State archived (not deleted — for audit + possible resume).

### 10.5 Retry [TARGET — Bible Part 9.7]

- User clicks Retry (after error).
- Orchestrator loads latest checkpoint, restarts from there (NOT from scratch).
- Optionally: tries a different model (per fallback chain) or different tool.

### 10.6 Undo / Rollback [TARGET — Bible Part 9.4, 9.7]

- `Esc Esc` → undo last agent action (rewinds to previous checkpoint).
- Rollback → revert to pre-task state (per Aider auto-commit pattern).
- Each agent edit is a git commit (or shadow-commit if no git); revert is one command.

### 10.7 [CURRENT] Deficiency

[CURRENT] No checkpoints. No pause. No resume. No cancel. No retry. No undo. No rollback. [FACT — Audit §1.4]

---

## 11. Validation [TARGET — Bible Part 7.11]

### 11.1 The Validator is the final gate (mandatory)

Every response passes through Validator. No bypass paths.

```typescript
interface ValidationReport {
  passed: boolean;
  answer: string;                  // sanitized
  checks: ValidationCheck[];
  warnings: string[];
  errors: string[];
}

interface ValidationCheck {
  name: string;                    // 'completeness' | 'format' | 'sanitisation' | 'exception_guard' | 'hallucination'
  passed: boolean;
  message: string;
}
```

### 11.2 Checks [TARGET]

- **Completeness** — non-empty, min length, short-answer warning.
- **Error check** — surfaces run failures as graceful user message.
- **Format check** — detects unclosed code fences.
- **Sanitisation** — trim, collapse 3+ newlines, strip trailing whitespace.
- **Hallucination guard** — speculative content marked `/* check-token */` (Primer pattern, Bible Part 7.12).
- **Exception guard** — never throws, always returns a report.

### 11.3 Events Emitted [TARGET]

- `response.ready` — validation passed.
- `error.occurred` — validation failed OR pipeline threw.

### 11.4 [CURRENT] Status

[CURRENT] `Validator` exists in `src/core/validator/`. Implements completeness, error check, format check, sanitisation, exception guard. Does NOT implement hallucination guard. Emits events. [FACT — Audit confirms Validator is the final gate, no bypass.]

---

## 12. Recovery [TARGET — Bible Part 8.10, 24]

### 12.1 The RecoveryEngine

When a step fails (or the run fails), RecoveryEngine suggests recovery strategies:

```typescript
interface RecoveryStrategy {
  type: 'retry' | 'alternative_model' | 'alternative_tool' | 'skip_and_continue' | 'abort_and_rollback' | 'ask_user';
  description: string;
  estimatedImpact: string;          // "loses last 2 steps" | "no data loss"
  applyable: boolean;
}

function suggestRecoveries(failure: FailureContext): RecoveryStrategy[] {
  // Deterministic rules first, then model-routed suggestions
}
```

### 12.2 Recovery Strategy Selection [TARGET]

| Failure type | Default strategy |
|---|---|
| Transient network | Retry with backoff (max 3) |
| Rate limit | Retry with longer backoff OR alternative provider |
| Model error | Alternative model in same class |
| Tool timeout | Retry OR alternative tool OR skip if non-critical |
| Tool permission denied | Ask user (escalate) |
| Validation failure | Retry with refined prompt (max 2) |
| Hard failure (model unavailable) | Abort + rollback + ask user |
| Ambiguous intent | Ask user (clarification question) |

### 12.3 State-Edit-and-Continue [TARGET — Bible Part 9.4, LangGraph pattern]

- User can edit agent state mid-task.
- Edits create a new checkpoint branch (the original is preserved).
- Agent continues from edited state.
- All edits audited.

### 12.4 Time-Travel Debugging [TARGET — Bible Part 10.9, devMode only]

- User can step back through checkpoints.
- Inspect past state.
- Replay from any past checkpoint (creates a branch).
- Original timeline preserved (fork, not overwrite).

### 12.5 [CURRENT] Deficiency

[CURRENT] No RecoveryEngine. On step failure, orchestrator aborts downstream steps. No retry, no alternative model, no state-edit, no time-travel. [FACT]

---

## 13. Events + Audit Trail [TARGET — Bible Part 8.11, 22.9]

### 13.1 Events emitted per agent run

- `agent.started`
- `agent.plan_created`
- `agent.awaiting_approval`
- `agent.approved` / `agent.rejected`
- `agent.step_started`
- `agent.step_completed`
- `agent.step_failed`
- `agent.tool_called` (with toolId, inputs, scope, approved/auto)
- `agent.tool_result`
- `agent.paused` / `agent.resumed` / `agent.cancelled`
- `agent.checkpoint_created`
- `agent.recovery_suggested`
- `agent.completed` / `agent.failed`

### 13.2 Audit Log [TARGET — Bible Part 22.9, INVARIANT]

Every agent action logged with:
- What was done.
- When.
- By which agent (agentId).
- With what scope/model.
- Approved or auto.
- Result (success/failure).

Append-only. Never deleted. Visible in DeveloperPanel Events tab.

### 13.3 Persistence

- Events emitted via EventBus (in-memory).
- Audit entries persisted to DB table `AuditLog` (append-only).
- Checkpoints persisted to DB table `Checkpoint` (with TTL — auto-cleaned after 30 days unless pinned).

### 13.4 [CURRENT] Deficiency

[CURRENT] EventBus is in-memory, not persisted. No AuditLog table. Some events emitted (`AGENT_STARTED`, `PLAN_CREATED`, `RUN_STARTED`, `RUN_COMPLETED`, `RUN_FAILED`) but not the full set above. No audit trail. [FACT — Audit §3.2, §9.5]

---

## 14. Sub-agents [TARGET — Bible Part 8.3, 8.4]

### 14.1 What is a sub-agent?

A sub-agent is a child agent invocation, spawned by a parent agent for an isolated sub-task. The sub-agent has its own scope + model + state, visible in AgentDock as a nested entry.

### 14.2 When sub-agents are justified

| Justification criterion | Example |
|---|---|
| Independent capability needed | Parent (Planner) needs deep research → spawn Researcher sub-agent |
| Isolated scope | Parent (Builder) needs to test code → spawn Verifier sub-agent with `read-only` scope |
| Parallel work (with explicit approval) | Researcher A + Researcher B researching different aspects simultaneously |
| Long-running sub-task | Parent delegates background work to a sub-agent while continuing main thread |

### 14.3 When sub-agents are NOT justified

- If the parent can perform the task itself with one extra tool call.
- If the sub-task shares scope with the parent (no isolation benefit).
- If the sub-task is trivial (< 5 seconds).

> **Rule:** Every sub-agent must justify: why it exists, what independent capability it provides, what complexity it introduces, why the parent cannot perform the task. [PRODUCT INVARIANT — adapted from Bible Part 8.8]

### 14.4 Sub-agent constraints [TARGET]

- Max depth: 2 (parent → child → grandchild, no further).
- Max concurrent sub-agents per parent: 3.
- Sub-agent inherits parent scope (cannot escalate, per §5.3).
- Sub-agent's tool calls visible in parent's audit trail.
- Sub-agent's checkpoints nested under parent's.

### 14.5 [CURRENT] Deficiency

[CURRENT] No sub-agents. The 4 agents are flat peers in the registry, executed sequentially. [FACT]

---

## 15. Single-Agent vs Multi-Agent Rules [TARGET — Bible Part 8.8]

### 15.1 The Default Rule

> **Default: Single-agent sequential pipeline.** Multi-agent only when justified.

[FACT — Bible Part 8.8 PRODUCT DECISION.]

### 15.2 Multi-Agent Justification Test

Before introducing a second agent, answer ALL of:

1. **Why does this agent exist?** (specific capability, not "for separation")
2. **What independent capability does it provide?** (not duplicable by parent + tool)
3. **What complexity does it introduce?** (state management, coordination, observability)
4. **Why can't one agent perform this task?** (genuinely, not lazily)

If any answer is weak, do NOT add the agent.

### 15.3 The Anti-Patterns (forbidden)

- **"More agents = more sophisticated."** No. More agents = more failure modes, more state, more coordination overhead. [Bible Part 8.8 — Genspark 9+ agents = overload anti-pattern.]
- **"Parallel agents look impressive."** No. Parallel agents confuse users (Bible Part 8.8 — Manus parallel execution anti-pattern).
- **"Each tool needs its own agent."** No. Tools are invoked by agents; they are not agents themselves.
- **"Let's add a Coordinator agent."** No. The Orchestrator IS the coordinator. Adding another layer is bureaucracy.

### 15.4 When Multi-Agent IS Justified [TARGET]

| Scenario | Justification |
|---|---|
| Research + Coding simultaneously (Part 8.8) | Each has independent scope (web vs files). Each visible in AgentDock. |
| Long-running background task | Parent continues main thread; sub-agent runs in background. |
| Specialist verification | Builder (writer) + Verifier (test runner) — different capabilities, different scope. |
| User explicitly invokes | "Research X while I write Y" — user opts in to parallel. |

### 15.5 [CURRENT] Status

[CURRENT] 4 agents (Planner, Researcher, Memory, Writer) registered in `AgentRegistry`, executed sequentially by Orchestrator. No sub-agents. No parallel execution. This is the CORRECT default per Bible Part 8.8. [FACT]

The TARGET architecture preserves this default; multi-agent + sub-agents are explicit, justified additions — not the default mode.

---

## 16. Agent Lifecycle [TARGET — Bible Part 8.2]

```
idle (hidden)
  → planning (if code/UI/long-running)
    → awaiting_approval (plan gate)
      → approved → executing
      → rejected → idle (with reasoning shown)
  → executing (visible in AgentDock)
    → paused (state preserved)
      → resumed → executing
      → cancelled → archived (with partial results)
    → step_failed
      → recovering → executing (retry) | done (abort)
  → validating (Reviewer + Verifier)
    → validation_passed → done
    → validation_failed → recovering
  → done (dock slides away, result inline in conversation)
  → error (inline + actionable + explainable)
```

### 16.1 [CURRENT] Deficiency

[CURRENT] Agent lifecycle is implicit: `execute()` is called → returns `AgentResult`. No idle/planning/approval/paused states. [FACT]

---

## 17. Agent Observability [TARGET — Bible Part 8.11]

### 17.1 AgentDock (default UI)

- Pipeline stepper (stage progress).
- Agent name + role.
- Last event + timestamp.
- Confidence (if model-provided).
- Health indicator (running / paused / failed).
- Cancel button.
- Expandable details.

### 17.2 DeveloperPanel (devMode only)

- Full agent registry (all registered agents + their state).
- Per-agent state + checkpoint history.
- Event stream (real-time).
- Tool invocations (with inputs/outputs).
- Latency per step.
- Cost per step.

### 17.3 Audit Log (always on)

- Every agent action logged (append-only).
- Visible in DeveloperPanel → Events tab.
- Filterable by agent / time / scope / approved.

### 17.4 [CURRENT] Status

[CURRENT] AgentDock component exists (`src/components/mimo/AgentDock.tsx`). DeveloperPanel exists. ExecutionTrace exists (uses simulated timers, not real pipeline events — Audit §17 conflict #7). [FACT — partial]

---

## 18. Real-Time Partnership [TARGET — Bible Part 8.12]

### 18.1 User Edit Detection

- EventBus emits `user.edited` events when user edits:
  - A file in scope.
  - A message in the conversation.
  - An artifact.
  - Agent state (mid-task).

### 18.2 Proactive Consistency Offers

- The agent subscribes to `user.edited` events for artifacts/files it has touched.
- When a relevant edit happens, agent offers (NEVER auto-applies) consistency fixes.
- Example: user renames a function → agent offers to rename all references.
- Offer shown inline in conversation as a suggestion.

### 18.3 [CURRENT] Deficiency

[CURRENT] No `user.edited` events. No proactive offers. [FACT]

---

## 19. Persistence Schema [TARGET]

```prisma
model AgentRun {
  id              String   @id @default(cuid())
  conversationId  String
  planId          String
  status          String   // idle | planning | awaiting_approval | executing | observing | validating | done | error | paused | cancelled
  startedAt       DateTime @default(now())
  endedAt         DateTime?
  parentRunId     String?  // for sub-agents
  
  steps           AgentStep[]
  checkpoints     Checkpoint[]
  auditEntries    AuditEntry[]
  
  @@index([conversationId, status])
  @@index([parentRunId])
}

model AgentStep {
  id              String  @id @default(cuid())
  runId           String
  stepId          String   // 's1', 's2', ...
  agentId         String
  status          String   // pending | executing | completed | failed | skipped
  inputs          Json
  outputs         Json?
  startedAt       DateTime?
  endedAt         DateTime?
  durationMs      Int?
  toolCalls       Json     // array of ToolCallRecord
  error           String?
  
  run             AgentRun @relation(fields: [runId], references: [id])
  
  @@index([runId, status])
}

model Checkpoint {
  id              String  @id @default(cuid())
  runId           String
  stepId          String
  stepIndex       Int
  timestamp       DateTime @default(now())
  agentState      Json
  sideEffects     Json     // [{ type, path, beforeHash, afterHash }]
  pinned          Boolean  @default(false)
  expiresAt       DateTime?  // 30 days by default
  
  run             AgentRun @relation(fields: [runId], references: [id])
  
  @@index([runId, stepIndex])
}

model AuditEntry {
  id              String  @id @default(cuid())
  runId           String?
  agentId         String
  action          String   // 'step_started' | 'tool_called' | 'tool_result' | 'paused' | ...
  details         Json
  scope           String   // read-only | src | docs | full-workspace
  sandbox         String
  approvalPolicy  String
  approved        String   // user | auto | trusted
  timestamp       DateTime @default(now())
  
  run             AgentRun? @relation(fields: [runId], references: [id])
  
  @@index([agentId, timestamp])
  @@index([runId, timestamp])
}

model TrustLedgerEntry {
  id              String  @id @default(cuid())
  projectId       String
  taskType        String
  scope           String
  approvalsCount  Int     @default(0)
  autoApprovedAt  DateTime?
  lastApprovalAt  DateTime?
  lastRejectionAt DateTime?
  rejectionCount  Int     @default(0)
  
  @@unique([projectId, taskType, scope])
}
```

---

## 20. Migration Path [MIGRATION]

### Phase 1 — Split Agents + Permissions
- Split Writer → Builder + Reviewer + Verifier (5 agents total per Bible Part 8.1).
- Add `version`, `defaultModelClass`, `defaultScope`, `defaultSandbox`, `defaultApprovalPolicy` to Agent interface.
- Wire ModelRegistry routing per agent.

### Phase 2 — Agent State + Checkpoints
- Add `AgentState` type (per §7.1).
- Add `Checkpoint` table.
- Snapshot state at every step boundary.

### Phase 3 — Approval Gate
- Add Approval stage between Plan and Execution.
- Add `requiresApproval`, `approvable` to Plan.
- Surface plans in conversation (inline, not separate panel — Bible Part 10.4).

### Phase 4 — Pause/Resume/Cancel
- Add `paused`, `cancelled` to run status.
- Wire `Esc` (cancel) and `Esc Esc` (undo last action).
- Persist checkpoints on pause.

### Phase 5 — Recovery Engine
- Implement `suggestRecoveries()`.
- Wire to step failure path.
- Add state-edit-and-continue.

### Phase 6 — Trust Ledger
- Add `TrustLedgerEntry` table.
- Track approvals per (project, taskType, scope).
- Auto-approve after 3 approvals.

### Phase 7 — Audit Log + Event Persistence
- Add `AuditEntry` table (append-only).
- Persist EventBus events to DB.
- Surface in DeveloperPanel.

### Phase 8 — Sub-agents
- Implement sub-agent spawning.
- Add `parentRunId` to AgentRun.
- Add AgentDock nested entry.
- Enforce permission inheritance.

### Phase 9 — Time-Travel Debugging (devMode only)
- Implement checkpoint browsing UI.
- Implement replay from checkpoint (creates branch).

### Phase 10 — Real-Time Partnership
- Emit `user.edited` events.
- Subscribe in agents.
- Offer (never auto-apply) consistency fixes.

Each phase independently shippable. Phase 1 + 2 unblock everything.

---

## 21. Trust Boundaries for Agents

| Boundary | What crosses | Enforced by |
|---|---|---|
| Orchestrator → Agent | Task + context | Orchestrator (validates capabilities + scope) |
| Agent → Tool | Tool call request | ApprovalGate (per Bible Part 9.2) |
| Tool → Agent | Tool result | Tool returns result + audit record |
| Agent → Memory | Write attempt | MemoryEngine (validates caller per `MiMo_Memory_Architecture.md` §16.2) |
| Agent → Knowledge | Read (always), Write (only consolidation agents) | KnowledgeGraph (write gate) |
| Agent → AI Model | ModelRequest | ModelRegistry.route() (per `MiMo_AI_Architecture.md`) |
| Agent → Filesystem | Read/Write path | FilesystemPermissionGate (Bible Part 22.5) |
| Agent → Network | HTTP request | NetworkPermissionGate (Bible Part 22.7) |
| Agent → Shell | Process spawn | ShellPermissionGate (sandboxed) |
| Sub-agent → Anything | Inherited parent scope | Orchestrator (rejects escalation) |
| Plugin Agent → MiMo | Extension API call | Plugin capability gate (`agent:spawn` required) |

---

## 22. Open Questions [UNKNOWN]

| # | Question | Why it matters | Investigation |
|---|---|---|---|
| 1 | How many checkpoints to keep per run? | Storage + audit value tradeoff | Default 30 days; sample real usage |
| 2 | Should pause wait for next checkpoint or interrupt mid-tool? | Tool atomicity vs responsiveness | Wait for safe point (per Bible Part 9.7) |
| 3 | Can two parallel agents share conversation context? | Race conditions on context snapshot | No — each gets its own frozen snapshot |
| 4 | How to handle a sub-agent that exceeds parent scope (rejected)? | Failure mode | Surface as error + suggest user to elevate scope manually |
| 5 | Should the trust ledger auto-reset after long inactivity? | Stale trust | Reset after 90 days of no activity for that task type |
| 6 | Time-travel branching — how many branches per run? | Storage + UX | Cap at 5 branches; oldest auto-pruned |
| 7 | How does an agent handle a model mid-stream producing unsafe output? | Safety | Validator + content filter per `MiMo_AI_Architecture.md` §21 |

---

## 23. Non-Goals

- AI layer internals (see `MiMo_AI_Architecture.md`).
- Tool execution contracts (see `MiMo_Tool_Architecture.md`).
- Context assembly (see `MiMo_Context_Architecture.md`).
- Memory + Knowledge (see respective architectures).
- AgentDock UI rendering.

---

## 24. Summary

[CURRENT]: 4 agents (Planner, Researcher, Memory, Writer) in a flat registry. Orchestrator executes plans sequentially in dependency order. No sub-agents. No pause/resume/cancel/retry/rollback. No checkpoints. No recovery engine. No trust ledger. No audit log. No approval gate. No state persistence. Agents are stateless functions. The pipeline is 5 stages (Context → Reason → Plan → Execute → Validate), not 9.

[TARGET]: 9-stage pipeline (Intent → Context → Plan → Approval → Execution → Observation → Validation → Recovery → Result). 6 agents (Planner, Researcher, Builder, Reviewer, Verifier, Memory). Agent identity with version, capabilities, scope, sandbox, approval policy. Per-task-type trust ledger with 3-approval auto-trust. Checkpointed state with 30-day retention. Pause/resume/cancel/retry/undo/rollback all wired. RecoveryEngine with 6 strategy types. State-edit-and-continue. Time-travel debugging (devMode). Sub-agents (justified, scoped, inherited). Append-only audit log. Real-time partnership (proactive consistency offers). Sequential-by-default, parallel only when justified (4 criteria all met).

[MIGRATION]: 10 phases. Phase 1 (split agents + permissions) + Phase 2 (state + checkpoints) unblock everything. Each phase independently shippable.

**Invariant:** Default single-agent sequential. Every additional agent must justify: why it exists, what independent capability it provides, what complexity it introduces, why one agent cannot perform the task. Multi-agent is opt-in, never default.
