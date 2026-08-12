# Long-Horizon Execution

**Category:** Execution
**Status:** CORE
**Maturity:** Production-ready (checkpointed single-process); Emerging (multi-day distributed)

## Definition
**Long-horizon execution** is the execution pattern for tasks that span **hours, days, or weeks** — far beyond a single LLM call or a single HTTP request. It is the integration of **checkpointing + resumability + scheduling + background workers + recovery + verification** into a coherent execution model that can run, pause, resume, recover, and complete tasks over extended time horizons.

It is the **operational realization** of MiMo AI's core promise: a task is not "answer this question" but "research, plan, code, test, verify, and deploy over the next 3 days."

## Problem Solved
A typical web request lives < 30 seconds. A typical agent loop lives minutes. But the tasks users actually want autonomous AI to do — "build me this feature," "research this market over the next week," "monitor this and act when X happens" — live hours to weeks. Standard execution models fail because:
- HTTP requests time out.
- In-memory state is lost on process restart.
- No way to pause + resume across days.
- No way to schedule "do X at 9am Monday."
- No way to survive 100 transient failures over 3 days.
- No way to verify intermediate progress.

Long-horizon execution solves these by combining: durable task queue, checkpointed state machine, scheduled triggers, background workers, bounded recovery, milestone verification, and human escalation.

## Why It Matters
This is **the** defining capability of MiMo AI. The project exists because GLM-5.2 + a layered runtime can sustain reasoning across long horizons — and long-horizon execution is the substrate that makes that real. Without it, the system is a chatbot; with it, the system is an autonomous worker.

It is also the **hardest capability to get right**: it touches every layer (model, context, memory, agent, tool, execution, verification, recovery, autonomy, security, observability). Weakness in any layer breaks long-horizon execution.

## How It Works

### Task lifecycle (long-horizon)
```
1. SUBMIT: user submits goal → Task created (status: queued)
2. SCHEDULE: Task Engine picks up task per scheduling policy
3. START: spawn AgentRun (status: running); transition lifecycle
4. EXECUTE LOOP:
   a. ReAct step (think → act → observe)
   b. Checkpoint (per-step or per-milestone)
   c. Verify (per-milestone)
   d. On failure → Recovery (retry/reflect/escalate)
   e. On budget threshold → checkpoint + continue or pause
   f. On external pause signal → checkpoint + pause
5. PAUSE/RESUME cycles (potentially many over days):
   - scheduled pause (e.g., "stop at 6pm, resume at 9am")
   - event pause (e.g., awaiting user input)
   - crash → resume from checkpoint
6. VERIFY FINAL: verification layer checks final output against contract
7. COMPLETE: status: completed; artifacts released; learning extracted
   OR ESCALATE: status: failed/escalated; user notified
```

### Scheduling model
- **Immediate** — task starts as soon as a worker is free.
- **Scheduled** — task starts at a specific time (cron-like).
- **Event-triggered** — task starts when an event fires (webhook, file change, sensor).
- **Background** — task runs continuously or on a recurring schedule (monitoring).
- **Persistent goal** — long-lived goal that spawns tasks on triggers.

### Worker model
- **In-process** — task runs in the Next.js server process (v1; simple; limited to process lifetime).
- **Mini-service worker** — task runs in a dedicated `agents-service` bun process (port 4010); survives Next.js restarts; can be scaled horizontally.
- **Queue + worker pool** — task queue (SQLite or BullMQ) + N worker processes pulling jobs (v1.x for high throughput).

### Pause/Resume semantics
```
PAUSE:
  - finish current step
  - checkpoint full state
  - release sandbox resources
  - transition: running → paused
  - emit 'task:paused'

RESUME:
  - load latest checkpoint
  - reconstruct in-memory state
  - re-bind tools, re-acquire permissions
  - re-provision sandbox if needed
  - transition: paused → resuming → running
  - emit 'task:resumed'
  - continue ReAct loop from stepIndex + 1
```

### Budget enforcement
```typescript
type TaskBudget = {
  maxSteps: number;          // hard cap on ReAct steps
  maxCostUsd: number;        // hard cap on LLM + tool spend
  maxWallClockMs: number;    // hard cap on elapsed time
  maxToolCalls: number;      // hard cap on tool invocations
  maxRecoveryAttempts: number; // cap on recovery attempts
};
```
On any budget threshold (90%): checkpoint + warn. On exhaustion: pause + escalate.

### Milestone verification
Long-horizon tasks have **milestones** (plan subtask completions, every N steps, every M minutes). At each milestone:
- Verifier checks current state against expected.
- PASS → continue.
- FAIL → Recovery (reflect + retry or escalate).
- AMBIGUOUS → pause + ask user.

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Task Engine (Layer 10)                    │
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌────────────┐  │
│  │ Task     │  │ Scheduler│  │ Worker   │  │ Budget     │  │
│  │ Queue    │─▶│          │─▶│ Pool     │─▶│ Enforcer   │  │
│  │ (Prisma) │  │ (cron +  │  │ (bun     │  │            │  │
│  │          │  │  events) │  │  procs)  │  │            │  │
│  └──────────┘  └──────────┘  └────┬─────┘  └─────┬──────┘  │
│                                   │              │         │
│                            ┌──────▼──────┐ ┌─────▼──────┐  │
│                            │ Agent Run   │ │ Checkpoint │  │
│                            │ (ReAct loop)│ │ Manager    │  │
│                            └──────┬──────┘ └─────┬──────┘  │
│                                   │              │         │
│                            ┌──────▼──────────────▼──────┐  │
│                            │ Recovery + Verification    │  │
│                            └────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
        │                                  │
        ▼                                  ▼
┌──────────────────┐              ┌──────────────────┐
│ socket.io events │              │ Prisma + SQLite  │
│ (live UI updates)│              │ (tasks, runs,    │
│                  │              │  checkpoints,    │
└──────────────────┘              │  escalations)    │
                                  └──────────────────┘
```

## Interfaces
- `TaskEngine.submit(goal: Goal, opts: SubmitOpts): Promise<TaskId>`
- `TaskEngine.schedule(taskId, trigger: ScheduleTrigger): Promise<void>`
- `TaskEngine.pause(taskId): Promise<CheckpointRef>`
- `TaskEngine.resume(taskId): Promise<void>`
- `TaskEngine.cancel(taskId, reason?): Promise<void>`
- `TaskEngine.getStatus(taskId): TaskStatus`
- `SubmitOpts { budget: TaskBudget; schedule?: ScheduleTrigger; priority?: 'low'|'normal'|'high'; milestones?: Milestone[] }`
- `ScheduleTrigger = { type: 'immediate'|'cron'|'event'|'persistent'; cron?: string; event?: EventSpec }`

## Dependencies
- Task Queue (Prisma `Task` table; or BullMQ for v1.x scale).
- Scheduler (cron interpreter + event listener).
- Worker Pool (bun processes; one or more `agents-service` instances).
- Checkpointing (see `checkpointing.md`).
- Recovery (see `recovery.md`).
- Verification (per-milestone).
- Budget Enforcer (counters + threshold checks).
- Event Bus (socket.io for live UI; internal events for triggers).
- Autonomy Layer 14 (should-act gating for scheduled/event tasks).

## Strengths
- **Durability** — tasks survive process crashes, server restarts, scheduled pauses.
- **Scalability** — worker pool can scale horizontally (v1.x).
- **Flexibility** — immediate, scheduled, event-triggered, background, persistent-goal tasks all supported.
- **Safety** — budget caps + milestone verification + recovery + escalation prevent runaway + wrong answers.
- **Observability** — full task lifecycle visible in UI; every step traced.

## Weaknesses
- **Complexity** — many moving parts (queue, scheduler, workers, checkpoints, recovery, verification).
- **Operational burden** — worker pool health, queue backlog, checkpoint storage growth, escalation response.
- **Cost** — long tasks accumulate LLM + tool spend; budget caps essential.
- **Latency** — scheduled pauses mean tasks don't complete "as fast as possible" but "as scheduled."
- **State drift** — long-running checkpoints may reference artifacts/sandbox state that drifts over days.

## Failure Modes
- **Worker crash mid-task** — checkpoint-based resume; watchdog detects stale heartbeat.
- **Queue backlog** — too many tasks, workers overwhelmed. Mitigation: priority queue; auto-scale workers (v1.x).
- **Checkpoint corruption** — fall back to earlier checkpoint; if none, task fails.
- **Budget exhaustion** — pause + escalate; user can increase budget or cancel.
- **Stale artifact** — checkpoint references a file that was deleted. Mitigation: artifact retention aligned with task retention.
- **Schedule missed** — cron job didn't fire. Mitigation: missed-schedule detection + catch-up.
- **Escalation ignored** — user doesn't respond; task stalled. Mitigation: escalation TTL; auto-pause indefinitely (not auto-cancel).
- **Distributed state inconsistency** — if multi-worker, two workers pick up same task. Mitigation: atomic task claim (row lock or queue lease).

## Security Implications
- Scheduled/event tasks trigger **without user present** → must-act gating (Autonomy Layer 14) decides if action is permitted.
- Background tasks have **persistent permissions** → audit which tasks are running + their permission envelopes.
- Kill switch (Layer 15) must abort all in-flight tasks + workers.
- Long-running tasks accumulate artifacts → retention policy + secrets scanning.
- Escalations must authenticate the user before accepting decisions.

## Performance Implications
- Per-step overhead: checkpoint + verify + budget check ≈ 10–50ms.
- Worker concurrency: limited by model API rate limits (typical 5–50 concurrent agents per provider key).
- Wall-clock for long tasks dominated by: LLM latency × steps + tool latency × calls + scheduled-pause idle time.

## Operational Implications
- Worker pool monitoring: alive count, queue depth, avg task duration.
- Checkpoint storage: growth monitoring + retention sweeps.
- Escalation SLA: pending escalations should be responded to within X hours (configurable).
- Cost dashboard: per-task spend rollup; budget-cap alerts.
- Audit: full task history retained per policy.

## Alternatives
- **Temporal.io / Inngest / Hatchet** — durable execution frameworks; provide queue + scheduler + checkpointing as a service. Powerful but add a dependency + operational burden. For v1 (single-user, Prisma+SQLite), custom implementation is simpler. **Defer** Temporal to v1.x evaluation if scale demands.
- **BullMQ + Redis** — queue + workers; lighter than Temporal. **Defer** to v1.x if SQLite-based queue becomes a bottleneck.
- **Simple cron + scripts** — adequate for scheduled tasks but no checkpointing/recovery. Rejected for agent workloads.
- **Serverless functions** — not suitable (stateless; timeout limits).

## Maturity & Production Readiness
- Custom Prisma+SQLite+workers: **production-ready** for single-user / small-scale (MiMo AI v1).
- Temporal.io: **production-ready** at scale (used by Snap, Stripe, Coinbase) — overkill for v1.
- Long-horizon agent execution as a category: **emerging** — the industry is still learning what works for multi-day agent tasks (Devin, Cursor Background Agents, ChatGPT scheduled tasks are all 2024–2025 experiments).

## Relevant Research / Papers
- Shinn et al. 2023 — *Reflexion* (long-horizon self-correction).
- Yao et al. 2023 — *Tree of Thoughts* (long-horizon search).
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (long-horizon + autonomy sections).
- Z.ai — GLM-5.2 long-context positioning (inferred: designed for sustained reasoning over long horizons).
- Temporal.io — *Durable Execution* (industry reference).
- Devin / Cognition — long-horizon coding agent (industry reference; 2024).

## Official Documentation
- Temporal.io (temporal.io/docs).
- Inngest (inngest.com/docs).
- Hatchet (hatchet.run).
- BullMQ (docs.bullmq.io).
- Prisma + SQLite (prisma.io/docs).
- node-cron (npm).
- socket.io (socket.io/docs).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Task Engine lives in the `agents-service` mini-service** (bun process, port 4010, Caddy `?XTransformPort=4010`). This is the **architecturally correct placement** for v1: agent execution is decoupled from the Next.js UI server; a long-running task (hours/days) survives UI server restarts; the UI server stays responsive.
- **Prisma schema**:
  - `Task` (id, goal, status enum, priority, budget JSON, schedule JSON, parentTaskId?, createdAt, startedAt, pausedAt, endedAt, totalCostUsd, currentRunId) — indexed on `(status, priority, createdAt)` for queue queries.
  - `AgentRun` (id, taskId, agentId, status, startedAt, endedAt) — see `agent_lifecycle.md`.
  - `AgentCheckpoint` (see `checkpointing.md`).
  - `Milestone` (id, taskId, label, expectedState, status enum, verifiedAt) — per-task verification milestones.
  - `TaskEvent` (id, taskId, type, payload JSON, timestamp) — append-only audit + trigger log.
- **Task Queue**: SQLite-based for v1 (a `Task` row with `status='queued'` is a queue entry). Workers poll with `SELECT ... FOR UPDATE`-style atomic claim (SQLite `UPDATE Task SET status='running', workerId=? WHERE id=? AND status='queued' RETURNING *`). For v1.x scale, migrate to BullMQ + Redis.
- **Scheduler**: `node-cron` in the agents-service process; fires `TaskEvent` of type `schedule:triggered`; a listener picks up the task and submits it to the queue. Event-triggered tasks subscribe to the Event Bus (socket.io or internal emitter).
- **Worker Pool**: single worker in the agents-service for v1 (one task at a time per process; sufficient for single-user). For v1.x, spawn N worker processes (bun) pulling from the queue.
- **Budget Enforcer**: counters per task (steps, cost, time, tool calls, recovery attempts); checked after every step; on 90% threshold → checkpoint + emit `budget:warning`; on 100% → pause + escalate.
- **Milestone verification**: per-task milestone list (user-defined or auto-generated by planner); on milestone hit, Verifier checks + emits `milestone:pass` or `milestone:fail` (→ Recovery).
- **Pause/Resume**: `pause(taskId)` → finish current step + checkpoint + release sandbox + status=pause. `resume(taskId)` → load checkpoint + reconstruct + status=running. Both via API + socket.io.
- **Crash recovery**: on agents-service startup, scan `AgentRun` for `status='running'` with stale heartbeat → mark `paused` + emit `recovery:crash_detected`. Scheduler (or manual) can resume.
- **socket.io**: emit `task:submitted`, `task:started`, `task:step`, `task:paused`, `task:resumed`, `task:milestone`, `task:budget_warning`, `task:completed`, `task:failed`, `task:escalated`. **zustand** `useTaskStore` holds the task list + active task details; UI renders task timeline + live step stream.
- **Caddy**: `/agents/*` routes to agents-service (port 4010) via `?XTransformPort=4010`; task management endpoints (`/api/tasks/*`) on main Next.js port (user-facing) call agents-service internally.
- **Kill switch**: `/api/tasks/kill-all` → agents-service aborts all in-flight tasks + kills sandboxes via tool-runtime-service + emits `task:killed` for each.
- **Notifications**: socket.io for online; v1.x add email/push for offline users on completion/escalation.

## Relevance To Our Project (MiMo AI layered runtime)
Long-horizon execution is **Layer 10 (Execution) + Layer 14 (Autonomy)** — the operational core of MiMo AI. It integrates:
- Layer 8 (Agent) — the ReAct loop is the unit of work.
- Layer 9 (Tool) — tools are called within the loop, sandboxed + policy-checked.
- Layer 10 (Execution) — checkpointing, scheduling, workers, budgets.
- Layer 11 (Verification) — milestone + final verification.
- Layer 12 (Recovery) — failure handling within the loop.
- Layer 14 (Autonomy) — should-act gating for scheduled/event tasks.
- Layer 15 (Security) — kill switch, audit, escalation auth.

It is the **capability that defines the product**: an AI that can take a complex goal and work on it for hours or days, recovering from failures, pausing for user input, resuming after crashes, and producing verified results. Every other layer exists to serve this.

## Recommended Usage
- Every task > 1 minute goes through the Task Engine (not a bare agent call).
- Define budget per task class; enforce hard caps.
- Checkpoint per-step (short) or per-milestone + 60s (long).
- Milestone verification for any task > 10 steps.
- Scheduled/event tasks must pass should-act gating (Autonomy Layer 14).
- Workers in dedicated mini-service (agents-service, port 4010) — not in the Next.js UI process.
- Kill switch always available; aborts all tasks + sandboxes.
- Escalations surface in UI with full context; TTL on escalation response.
- Audit full task history; feed outcomes to Learning layer.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** custom Task Engine in `agents-service` mini-service (port 4010) with Prisma+SQLite queue, checkpointing, scheduling, budget enforcement, milestone verification, recovery, escalation. **DEFER** Temporal.io / BullMQ to v1.x evaluation (if SQLite queue becomes a bottleneck or multi-worker scale demands). **DEFER** email/push notifications to v1.x. **REJECT** in-Next.js-process long-running tasks (UI server must stay responsive). **REJECT** stateless serverless for agent workloads.

## Sources
- Shinn et al. 2023 — Reflexion (arxiv.org/abs/2303.11366)
- Yao et al. 2023 — Tree of Thoughts (arxiv.org/abs/2305.10601)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- Temporal.io — Durable Execution (temporal.io/resources/durable-execution)
- Inngest (inngest.com/docs)
- BullMQ (docs.bullmq.io)
- Z.ai GLM-5.2 (z.ai) — inferred long-horizon design
- Devin / Cognition (cognition.ai) — industry reference
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 10 Execution, Layer 14 Autonomy), §8 (decisions #9, #10)
- MiMo AI `CAPABILITY_MAP.md` §6 (long-running tasks, checkpoints, resumability, scheduling, background execution, retries, recovery, cancellation, timeouts, escalation, progress tracking — all C)
