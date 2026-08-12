# Agent Lifecycle

**Category:** Agents
**Status:** CORE
**Maturity:** Production-ready

## Definition
The **agent lifecycle** is the set of discrete states an agent transitions through from creation to termination, plus the events that trigger transitions. A canonical lifecycle: `created → initialized → planning → running → paused → resuming → verifying → completed | failed | cancelled | timed_out`.

It is the **state machine** the Agent Runtime enforces around every agent invocation, ensuring deterministic behavior, clean resource cleanup, auditability, and resumability.

## Problem Solved
Without an explicit lifecycle:
- Agents can be "half-running" with no clear state (did it pause? crash? finish?).
- Resources (model sessions, sandbox containers, file handles) leak.
- Resume after crash is undefined (what state are we resuming from?).
- Observability cannot correlate events to a logical agent instance.
- The UI cannot tell the user what is happening ("still working..." forever).

An explicit lifecycle turns an agent into a **managed object**: created, tracked, paused, resumed, terminated — with every transition logged and every state recoverable.

## Why It Matters
For MiMo AI's long-horizon autonomy, the lifecycle is the **backbone of resumability**. A multi-day task is not one continuous run — it is a series of `running → paused → resuming → running` transitions, each checkpointed. Without a formal lifecycle, "pause" and "resume" are undefined operations.

It is also the **foundation of observability**: every agent event, cost line, and log entry is correlated to a lifecycle state. Debugging a failed task means walking the lifecycle transitions.

## How It Works

### States
| State | Meaning | Allowed transitions |
|---|---|---|
| `created` | AgentSpec loaded; not yet running | → `initialized` |
| `initialized` | Context assembled, tools bound, permissions checked, sandbox ready | → `planning` |
| `planning` | Agent is generating/executing a plan (optional for single-step tasks) | → `running` |
| `running` | ReAct loop executing; producing thoughts/actions/observations | → `paused`, `verifying`, `completed`, `failed`, `timed_out`, `cancelled` |
| `paused` | Voluntarily suspended (checkpoint taken); awaiting resume or external trigger | → `resuming`, `cancelled` |
| `resuming` | Loading from checkpoint; reconstructing context | → `running`, `failed` |
| `verifying` | Verifier layer checking current output against contract | → `running` (PASS), `failed` (FAIL+exhausted), `paused` (FAIL+awaiting human) |
| `completed` | Final answer produced and verified; resources released | (terminal) |
| `failed` | Unrecoverable error or verification exhausted | (terminal) |
| `timed_out` | Wall-clock or step budget exhausted | (terminal) |
| `cancelled` | User or system killed the agent | (terminal) |

### Transitions (events)
- `START` (user submits goal) → created → initialized.
- `PLAN_READY` → planning → running.
- `STEP_DONE` → running → running (loop continues).
- `PAUSE` (checkpoint requested or external trigger) → running → paused.
- `RESUME` (user or scheduler) → paused → resuming → running.
- `VERIFY` (milestone reached) → running → verifying.
- `VERIFY_PASS` → verifying → running (or completed if final).
- `VERIFY_FAIL` → verifying → running (retry) or paused (escalate) or failed (budget exhausted).
- `ERROR` → running/planning/verifying → failed (if unrecoverable) or paused (if recoverable).
- `TIMEOUT` → running → timed_out.
- `CANCEL` (user kill switch) → any → cancelled.

## Architecture
```
┌─────────────────────────────────────────────────────────────────────┐
│                         AgentRuntime                                 │
│                                                                     │
│   ┌─────────┐  ┌──────────┐  ┌─────────┐  ┌──────────┐  ┌────────┐ │
│   │ created │─▶│initialized│─▶│planning │─▶│ running  │─▶│verifying││
│   └─────────┘  └──────────┘  └─────────┘  └────┬─────┘  └────┬───┘│
│                                                  │              │    │
│                          ┌───────────────────────┘              │    │
│                          ▼                                      ▼    │
│                    ┌──────────┐                          ┌──────────┐│
│                    │  paused  │◀────────────────────────│completed ││
│                    └────┬─────┘                          │ failed   ││
│                         │                                │ timed_out││
│                         ▼                                │cancelled ││
│                    ┌──────────┐                          └──────────┘│
│                    │ resuming │  ──▶ running                          │
│                    └──────────┘                                     │
└─────────────────────────────────────────────────────────────────────┘
       │                                  │
       ▼                                  ▼
   Prisma + SQLite                  socket.io events
   (AgentRun, AgentCheckpoint)      (lifecycle:state_change)
```

## Interfaces
- `AgentRuntime.create(spec: AgentSpec, goal: Goal): AgentRun`
- `AgentRuntime.transition(runId: string, event: LifecycleEvent): Promise<State>`
- `AgentRuntime.getState(runId: string): State`
- `AgentRuntime.pause(runId): Promise<CheckpointRef>`
- `AgentRuntime.resume(runId, fromCheckpoint?: CheckpointRef): Promise<void>`
- `AgentRuntime.cancel(runId, reason?: string): Promise<void>`
- `LifecycleEvent = 'START' | 'PLAN_READY' | 'STEP_DONE' | 'PAUSE' | 'RESUME' | 'VERIFY' | 'VERIFY_PASS' | 'VERIFY_FAIL' | 'ERROR' | 'TIMEOUT' | 'CANCEL'`

## Dependencies
- State Machine (could be XState or a hand-rolled TS state machine).
- Checkpointing (every `running → paused` transition persists state).
- Event Bus (state changes broadcast for UI + observability).
- Resource Manager (sandbox containers, file handles, model sessions — released on terminal states).
- Scheduler (for `paused → resuming` triggers, e.g., cron or external event).
- Verification layer (`verifying` state).
- Recovery layer (handles `ERROR` → `failed` vs `paused` decision).

## Strengths
- **Deterministic** — every agent has a well-defined state at every moment.
- **Resumable** — `paused` + checkpoint = clean resume semantics.
- **Observable** — state transitions are the primary observability dimension.
- **Resource-safe** — terminal states guarantee cleanup.
- **Auditable** — full transition history per agent.
- **UI-friendly** — frontend can render state without polling internal state.

## Weaknesses
- **Complexity** — more states = more code paths to test.
- **State machine bugs** — invalid transitions if machine is hand-rolled (use XState or rigorous tests).
- **Distributed state risk** — if agent runs in a separate process, state must be persisted before transition (not after) to avoid drift.
- **Pause latency** — checkpointing on pause can be slow for large contexts.

## Failure Modes
- **Zombie state** — agent process died but DB still shows `running` (heartbeat required to detect).
- **Lost transition** — state changed in memory but DB write failed → drift. Mitigation: write state change + checkpoint atomically (Prisma transaction).
- **Invalid transition** — code tries `completed → running` (should be impossible; state machine must reject).
- **Stuck in paused** — agent paused but no resume trigger ever fires. Mitigation: scheduler scans for stale `paused` agents.
- **Resource leak on terminal** — sandbox not torn down on `failed`. Mitigation: `finally` block + periodic GC sweep.
- **Resume from stale checkpoint** — code resumes from an old checkpoint, ignoring newer state. Mitigation: monotonic checkpoint versioning.

## Security Implications
- `cancelled` must immediately revoke all permissions and kill sandbox processes — no lag.
- `paused` agents retain their permissions in checkpoint; resuming re-activates them — audit this.
- `failed` agents' artifacts (file outputs, downloaded data) must be scanned before retention.
- Kill switch (Layer 15) forces `cancelled` from any state — must bypass normal transition guards.

## Performance Implications
- State transitions are cheap (DB row updates); checkpoints are the expensive part.
- `paused` agents consume no compute but their checkpoint occupies storage — periodic cleanup policy needed.
- `resuming` latency ≈ checkpoint deserialization + context reconstruction; for large checkpoints this can be seconds.

## Operational Implications
- Every transition logged with `{ runId, from, to, event, timestamp, cause? }`.
- Stale-state watchdog: scan every minute for `running` agents without a recent heartbeat → mark as `failed` (zombie recovery).
- Retention policy: `completed`/`failed` runs retained N days, then archived; checkpoints garbage-collected after retention.
- Live UI: agent card shows current state with color-coded badge; state history viewable in audit panel.

## Alternatives
- **No formal lifecycle** — ad-hoc flags (`isRunning`, `isDone`). Loses resumability + audit. Rejected.
- **Workflow engine** (Temporal.io, Inngest) — provides lifecycle + durability as a service. Heavier dependency; we use Prisma+SQLite+custom state machine for v1 simplicity (see `long_horizon_execution.md`).
- **XState** — solid state machine library; candidate for adoption (reduces hand-rolled bugs).

## Maturity & Production Readiness
**Production-ready.** Every agent framework has some lifecycle model (LangGraph state, OpenAI Agents SDK Run lifecycle, Temporal workflow lifecycle). The question is how rigorous — we adopt a rigorous, persisted lifecycle.

## Relevant Research / Papers
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (mentions lifecycle / state management).
- Temporal.io — *Durable Execution* model (industry reference for long-running state machines).
- XState / Statecharts — Harel statecharts (formal foundation for hierarchical state machines).

## Official Documentation
- LangGraph — `StateGraph` and checkpoint persistence.
- OpenAI Agents SDK — `Run` lifecycle (`RunStatus`).
- Temporal — Workflow lifecycle (reference, not adopted).
- XState docs (stately.ai/docs/xstate).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Prisma schema**:
  - `AgentRun` (id, agentId, goal, status enum, currentStep, startedAt, pausedAt, endedAt, totalCostUsd, modelRef, parentRunId?)
  - `AgentLifecycleEvent` (id, runId, fromState, toState, event, cause, timestamp) — append-only audit log.
  - `AgentCheckpoint` (id, runId, stepIndex, stateBlob, contextRef, createdAt) — see `checkpointing.md`.
- **State machine**: implement with **XState** (TypeScript-native, well-tested) or a small hand-rolled FSM with exhaustive switch + Zod-validated transitions. XState preferred for v1.x; hand-rolled acceptable for v1 to avoid dependency.
- **Heartbeat**: while `running`, agent writes `lastHeartbeatAt` every 10s. Watchdog cron (or a setInterval in the same process) scans for `running` agents with stale heartbeat → forces `failed`.
- **Atomic transition + checkpoint**: use `prisma.$transaction` to update `AgentRun.status` + insert `AgentCheckpoint` + insert `AgentLifecycleEvent` in one TX. No partial state.
- **socket.io**: emit `lifecycle:state_change` events on every transition; **zustand** `useAgentStore` updates a `runs: Map<string, RunState>` map. UI badge color: running=blue, paused=amber, completed=green, failed=red, cancelled=gray.
- **Kill switch**: a dedicated `/api/agents/:id/cancel` endpoint + socket.io event; bypasses normal transition guards, forces `cancelled`, kills any sandbox process via the Tool Runtime.
- **Mini-service placement**: lifecycle management lives in the **main Next.js process** (or `agents-service` mini-service if separated). Workers (specialists) inherit lifecycle from their supervisor's runtime.

## Relevance To Our Project (MiMo AI layered runtime)
The agent lifecycle is the **Layer 8 (Agent) state machine**, with tight coupling to Layer 10 (Execution — checkpoints/resume), Layer 11 (Verification — `verifying` state), Layer 12 (Recovery — `ERROR` handling), Layer 14 (Autonomy — `paused → resuming` triggered by scheduler/events), and Layer 15 (Security — kill switch forces `cancelled`).

It is the **enabler of long-horizon autonomy**: without it, "run for 3 days" is meaningless. With it, a multi-day task is a sequence of `running → paused → resuming` transitions, each checkpointed, each auditable, each resumable.

## Recommended Usage
- Every agent invocation must have a lifecycle — no "bare" agent runs.
- Persist every transition (append-only audit log).
- Use atomic DB transactions for transition + checkpoint writes.
- Heartbeat + watchdog for zombie detection.
- Kill switch always available, bypasses guards.
- UI surfaces state in real time via socket.io.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** formal lifecycle state machine with persisted transitions + heartbeats + kill switch. **DEFER** XState adoption to v1.x (hand-rolled FSM acceptable for v1 if tests are exhaustive). **REJECT** ad-hoc boolean flags as the lifecycle mechanism.

## Sources
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- Temporal.io — Durable Execution (temporal.io/resources/durable-execution)
- XState docs (stately.ai/docs/xstate)
- LangGraph state + checkpointing (langchain-ai.github.io/langgraph/concepts/persistence)
- OpenAI Agents SDK Run lifecycle (github.com/openai/openai-agents-python)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 8 Agent, Layer 10 Execution)
- MiMo AI `CAPABILITY_MAP.md` §5 (agent lifecycle = C, agent state = C)
