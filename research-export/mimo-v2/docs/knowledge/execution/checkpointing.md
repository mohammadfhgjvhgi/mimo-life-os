# Checkpointing

**Category:** Execution
**Status:** CORE
**Maturity:** Production-ready

## Definition
**Checkpointing** is the periodic persistence of an agent's complete execution state — context, trajectory, plan, intermediate results, tool-call history, agent-lifecycle state — to durable storage, so that the agent can be **resumed from that point** after a crash, pause, or scheduled interruption. A checkpoint is a **serializable snapshot** of "everything needed to continue this task from this step."

It is the **durability primitive** that turns a long-running in-memory process into a resumable, crash-safe workflow.

## Problem Solved
A long-horizon agent running for hours or days accumulates significant state: the conversation trajectory, tool results, partial plans, retrieved knowledge, memory updates. Without checkpoints:
- A crash (process exit, server restart, OOM) loses all progress.
- A pause/resume is impossible (state lives only in memory).
- The user cannot inspect intermediate state.
- Debugging requires re-running the whole task.

Checkpointing solves this by **serializing state at boundaries** (every step, every N seconds, every milestone) to durable storage (Prisma + SQLite). Resume = load the latest checkpoint + reconstruct in-memory state + continue the loop.

## Why It Matters
For MiMo AI's long-horizon autonomy, checkpointing is **non-negotiable**. A multi-day task is not one continuous process — it is a sequence of `running → checkpoint → pause → resume → running` cycles. Without checkpoints:
- "Run for 3 days" is impossible (no process runs 3 days without interruption).
- Crash recovery is undefined.
- The kill switch cannot preserve state.
- The user cannot pause + resume later.

Checkpointing is the **substrate of resumability**, which is the **substrate of long-horizon autonomy**.

## How It Works

### What to checkpoint
A checkpoint captures:
1. **Agent lifecycle state** — current state in the FSM (`running`, `paused`, etc.).
2. **Conversation trajectory** — full message history (or compressed summary + recent messages).
3. **Plan** — current plan tree (if any), with completed/in-progress/pending subtasks.
4. **Tool-call history** — last N tool calls + results (for replay + audit).
5. **Memory namespace state** — working memory + short-term memory contents for this task.
6. **Context manager state** — what was assembled, what was compressed, retrieval hints.
7. **Budget counters** — steps used, cost spent, time elapsed.
8. **Open handles** — sandbox IDs, file handles (must be reconstructed on resume, not serialized).
9. **Output contracts** — expected final output schema (for verification on resume).
10. **Artifact references** — pointers to files/objects produced so far (not the artifacts themselves — those live in object storage).

### Checkpoint triggers
- **Per-step**: after every ReAct step (Thought → Action → Observation). Safest; highest write load.
- **Per-milestone**: after every plan subtask completion, every verification, every N steps. Balanced.
- **Time-based**: every 30s if a step is long-running (e.g., a 2-minute tool call).
- **On-pause**: explicit `pause` event from user/scheduler.
- **On-error**: before entering recovery (so recovery can resume from a known-good state).
- **On-budget-threshold**: when cost or steps approach the cap (so we don't lose progress if the cap is hit).

### Checkpoint format
```typescript
type Checkpoint = {
  checkpointId: string;
  runId: string;
  stepIndex: number;
  lifecycleState: AgentState;
  trajectory: Message[];            // or { summary: string, recent: Message[] }
  plan?: PlanTree;
  toolHistory: ToolCallRecord[];    // last N
  memoryState: { working: unknown; shortTerm: unknown };
  contextState: { compressedUpTo: number; retrievalHints: unknown[] };
  budget: { stepsUsed, stepsMax, costUsd, costMaxUsd, elapsedMs, timeoutMs };
  artifactRefs: ArtifactRef[];
  outputContract?: ZodSchema;
  createdAt: ISO8601;
  version: number;                  // schema version for forward-compat
};
```

### Checkpoint lifecycle
```
1. agent step completes
2. checkpoint serializer gathers state
3. write to Prisma (atomic transaction: insert Checkpoint + update AgentRun.lastCheckpointId)
4. optionally emit 'checkpoint:saved' event (for UI)
5. (background) prune old checkpoints per retention policy
```

### Resume flow
```
1. load latest Checkpoint by runId, ordered by stepIndex desc
2. reconstruct in-memory state from checkpoint
3. re-bind tools, re-acquire permissions, re-provision sandbox if needed
4. transition lifecycle: paused → resuming → running
5. continue ReAct loop from stepIndex + 1
6. audit: emit 'resume:from_checkpoint' event
```

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Agent Runtime                            │
│                                                             │
│   ┌────────────┐    ┌──────────────┐    ┌───────────────┐  │
│   │  ReAct     │───▶│ Checkpoint   │───▶│ Checkpoint    │  │
│   │  Loop      │    │ Trigger      │    │ Serializer    │  │
│   └────────────┘    └──────────────┘    └───────┬───────┘  │
│                                                │           │
│                                       ┌────────▼────────┐  │
│                                       │ Prisma TX       │  │
│                                       │ - insert        │  │
│                                       │   AgentCheckpt  │  │
│                                       │ - update        │  │
│                                       │   AgentRun.last │  │
│                                       └────────┬────────┘  │
│                                                │           │
│                                       ┌────────▼────────┐  │
│                                       │ Event Bus       │  │
│                                       │ socket.io emit  │  │
│                                       └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
       ▲
       │ resume(runId)
       │
┌──────┴──────────────────────────────────────────────────────┐
│  Resume: load latest checkpoint → reconstruct state →        │
│  re-bind tools → transition lifecycle → continue loop        │
└─────────────────────────────────────────────────────────────┘
```

## Interfaces
- `CheckpointManager.save(runId, state): Promise<CheckpointRef>`
- `CheckpointManager.loadLatest(runId): Promise<Checkpoint | null>`
- `CheckpointManager.load(checkpointId): Promise<Checkpoint>`
- `CheckpointManager.list(runId, opts?): Promise<Checkpoint[]>`
- `CheckpointManager.prune(runId, keepLast: number): Promise<void>`
- `CheckpointRef = { checkpointId, runId, stepIndex, createdAt }`

## Dependencies
- Prisma + SQLite (durable storage; atomic transactions).
- Serializer (structured-clone / JSON / MessagePack; must handle cyclic refs in trajectory).
- Compression (gzip large trajectories before blob storage).
- Event Bus (socket.io for `checkpoint:saved` events).
- Retention scheduler (periodic prune of old checkpoints).
- Versioning (schema version on each checkpoint for forward-compat migration).

## Strengths
- **Durability** — crash-safe; no progress lost.
- **Resumability** — pause/resume works.
- **Auditability** — every checkpoint is a point-in-time snapshot of agent state.
- **Replayability** — load checkpoint N, re-run from there with different model/params (for debugging + A/B).
- **Inspectability** — UI can render any checkpoint to show "what the agent knew at step N."

## Weaknesses
- **Write load** — per-step checkpointing can be expensive for fast loops (1000s of steps). Mitigation: per-milestone + time-based triggers.
- **Storage growth** — checkpoints accumulate; retention policy required.
- **Serialization cost** — large trajectories take time + space to serialize. Mitigation: compression; trajectory summarization (compress older steps).
- **Resume complexity** — re-binding tools, re-acquiring permissions, re-provisioning sandboxes is non-trivial.
- **Version drift** — schema changes between checkpoint versions require migration logic.

## Failure Modes
- **Corrupt checkpoint** — serialization error or partial write. Mitigation: atomic Prisma transaction; checksum validation on load.
- **Lost checkpoint** — write failed silently. Mitigation: confirm write before marking step "done"; retry on failure.
- **Version mismatch** — old checkpoint loaded by new code. Mitigation: schema version + migration functions; reject if unsupported.
- **Resume state drift** — checkpoint says `running` but external state (e.g., sandbox) is gone. Mitigation: resume logic re-validates external state; re-provisions if missing.
- **Storage exhaustion** — too many checkpoints fill disk. Mitigation: retention policy (keep last N per run); prune completed runs after X days.
- **Checkpoint storm** — too-frequent checkpointing starves the event loop. Mitigation: debounce; batch writes; background serialization.
- **Trajectory too large to checkpoint** — long task's trajectory exceeds practical blob size. Mitigation: compress older steps; store summary + recent detail.

## Security Implications
- Checkpoints contain conversation + tool results + memory → may include secrets or PII.
- **Encryption at rest** — SQLite file encrypted (SQLCipher or filesystem-level encryption).
- **Access control** — checkpoint reads require task/user authorization.
- **Redaction** — known-secret patterns scrubbed before serialization (defense in depth; primary defense is not putting secrets in context).
- **Audit** — checkpoint access logged.
- **Retention** — completed-run checkpoints deleted per policy (e.g., 90 days) to limit data-at-rest.

## Performance Implications
- Per-step checkpoint: ~5–20ms (small trajectory) to ~100ms (large trajectory, compressed). Acceptable for most loops; problematic for >10 steps/sec.
- Per-milestone: amortized cost; recommended for most tasks.
- Storage: ~10KB–10MB per checkpoint depending on trajectory size; compression 3–10×.
- Resume latency: ~50–500ms (load + decompress + reconstruct).

## Operational Implications
- Retention policy: per-run keep last N checkpoints; archive completed runs after X days; delete after Y days.
- Storage monitoring: alert when checkpoint DB exceeds threshold.
- Resume testing: periodically test resume from a random checkpoint (synthetic chaos).
- Versioning: schema version on every checkpoint; migration path documented.
- UI: timeline view of checkpoints per run; click to inspect state at that point.

## Alternatives
- **In-memory only** — rejected; not durable.
- **Append-only event log (event sourcing)** — alternative model: store events, reconstruct state by replay. More flexible but more complex; we use snapshot checkpoints (simpler) with optional event log for audit. Hybrid possible for v1.x.
- **Temporal.io / durable execution frameworks** — provide checkpointing as a service; heavier dependency. We use Prisma + SQLite for v1 simplicity (see `long_horizon_execution.md`).
- **Redis snapshots** — faster but less durable than SQLite; not appropriate for primary checkpoint store.

## Maturity & Production Readiness
**Production-ready.** LangGraph has first-class checkpointing (`MemorySaver`, `SqliteSaver`, `PostgresSaver`). OpenAI Agents SDK persists run state. Temporal.io is built around durable execution. The pattern is well-understood; the engineering quality varies.

## Relevant Research / Papers
- Temporal.io — *Durable Execution* (industry reference).
- LangGraph — *Persistence* docs (checkpointers).
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (state management).
- Fowler, M. — *Event Sourcing* (related pattern; alternative to snapshots).

## Official Documentation
- LangGraph Persistence (langchain-ai.github.io/langgraph/concepts/persistence).
- Temporal Workflows (temporal.io/docs).
- Prisma transactions (prisma.io/docs/orm/prisma-client/queries/transactions).
- SQLite + WAL mode (sqlite.org/wal.html) — for concurrent read/write performance.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Prisma schema**:
  - `AgentCheckpoint` (id, runId, stepIndex, lifecycleState, trajectory JSON, plan JSON, toolHistory JSON, memoryState JSON, contextState JSON, budget JSON, artifactRefs JSON, outputContract JSON, schemaVersion, createdAt, checksum) — indexed on `(runId, stepIndex)` for "latest checkpoint for run".
  - `AgentRun.lastCheckpointId` (FK; updated atomically with checkpoint insert).
  - Large trajectories: store as `TEXT` (JSON) with gzip compression in application code; or use SQLite BLOB. For >1MB trajectories, consider storing trajectory separately in object storage (file) + reference in checkpoint row.
- **SQLite WAL mode** — enable Write-Ahead Logging for concurrent read (UI) + write (agent) performance: `PRAGMA journal_mode=WAL;`.
- **Checkpoint triggers**:
  - Per-step for short tasks (<50 steps).
  - Per-milestone (every 10 steps or every subtask completion) for medium tasks.
  - Per-milestone + time-based (every 60s) for long tasks.
  - Always on: pause, error-before-recovery, budget-threshold (90% of cap).
- **Atomic write**: `prisma.$transaction([createCheckpoint, updateAgentRun])` — no partial state.
- **Compression**: `gzip` trajectory before insert; decompress on load. ~3–10× storage savings.
- **Checksum**: SHA-256 of serialized blob; validate on load; reject corrupt.
- **Schema versioning**: `schemaVersion` field; migration functions registered in code (`migrations: Map<version, (old) => new>`); on load, apply migrations in sequence.
- **Resume**: `resume(runId)` → load latest checkpoint → reconstruct Message[] trajectory → re-bind tools from registry → re-acquire permissions from caller context → re-provision sandbox if there was an open one → transition `paused → resuming → running` → continue ReAct loop.
- **socket.io**: emit `checkpoint:saved` (with `stepIndex`, `sizeBytes`) for UI timeline; `checkpoint:resumed` on resume.
- **zustand** `useCheckpointStore`: timeline of checkpoints for the active run; click → fetch full checkpoint → render in inspector drawer.
- **Retention**: scheduled job (cron or setInterval) — per run, keep last 20 checkpoints + first + last; completed runs: archive after 30 days, delete after 90 days.
- **Mini-service placement**: checkpointing logic lives in the `agents-service` (or main Next.js process) — wherever the agent loop runs. The Prisma DB is shared across services (single SQLite file or per-service DBs with replication; v1: single shared DB).

## Relevance To Our Project (MiMo AI layered runtime)
Checkpointing is the **core durability primitive at Layer 10 (Execution)**. It is what makes Layer 8 (Agent) lifecycle states (`paused`, `resuming`) meaningful. It feeds Layer 12 (Recovery) — recovery resumes from the last good checkpoint. It feeds Layer 14 (Autonomy) — scheduled tasks checkpoint + pause between scheduled windows. It feeds Layer 15 (Observability) — checkpoints are point-in-time snapshots for the audit dashboard.

It is the **enabler of the project's core promise**: long-horizon autonomous work that survives crashes, pauses, and interruptions.

## Recommended Usage
- Checkpoint every step for short tasks; every milestone + 60s for long tasks.
- Always checkpoint on: pause, error-before-recovery, budget-threshold (90%).
- Atomic Prisma transaction (checkpoint insert + AgentRun update).
- Compress + checksum trajectories.
- Versioned schema + migration path.
- Retention: keep last 20 per run; archive completed runs 30d; delete 90d.
- Test resume from random checkpoints (chaos testing).

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** Prisma + SQLite checkpointing with atomic transactions, compression, checksums, schema versioning, tiered triggers (per-step/milestone/time), retention policy. **DEFER** event-sourcing variant to v1.x (snapshot-first is simpler). **DEFER** Temporal.io to v1.x evaluation (overkill for v1 single-user). **REJECT** in-memory-only execution for any task > 1 minute.

## Sources
- LangGraph Persistence (langchain-ai.github.io/langgraph/concepts/persistence)
- Temporal.io Durable Execution (temporal.io/resources/durable-execution)
- Prisma transactions (prisma.io/docs/orm/prisma-client/queries/transactions)
- SQLite WAL (sqlite.org/wal.html)
- Fowler — Event Sourcing (martinfowler.com/eaaDev/EventSourcing.html)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 10 Execution: checkpoints + resumability), §8 (decision #9)
- MiMo AI `CAPABILITY_MAP.md` §6 (checkpoints = C, resumability = C, state persistence = C, context reconstruction = C)
