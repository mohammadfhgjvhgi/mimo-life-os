# Task Queue

**Category:** Infrastructure
**Status:** REQUIRED
**Maturity:** Mature (SQLite-backed); Mature (BullMQ/Redis)

## Definition
A Task Queue persists units of background work ("jobs") and dispatches them to workers, with retry, deadlines, priority, dead-letter, and observability. For v1 MiMo AI at personal scale, the chosen form is a **SQLite-backed queue** — a `Job` table + a worker poll loop — rather than BullMQ/Redis. BullMQ is documented as the future scale path.

## Problem Solved
- Long-running work (chunk embedding, KG extraction, evaluation runs, browser automation) must not block request handlers.
- Failed jobs need bounded retries with backoff.
- The system must survive crashes — pending jobs must resume on restart.
- Background workers need isolation from interactive latency.
- Need priority (interactive-spawned jobs > nightly consolidation) and deadlines (a stuck browser job must time out).

## Why It Matters
The Task Queue is the **execution spine** for Layers 10 (Execution) and 14 (Autonomy). Without it, long-horizon tasks die on process restart, failures cascade, and the UI freezes during heavy work.

## How It Works
### v1: SQLite-backed queue
1. **Enqueue:** producer inserts a `Job` row with `{ id, type, payload, priority, status='pending', attempts=0, maxAttempts, runAfter, deadlineAt, createdAt }` — atomic, durable.
2. **Claim:** a worker `UPDATE Job SET status='running', claimedAt=now(), claimedBy=? WHERE id=(SELECT id FROM Job WHERE status='pending' AND runAfter<=now() ORDER BY priority DESC, createdAt ASC LIMIT 1) RETURNING *` — atomic claim via `RETURNING`. (SQLite serializes writes; this is safe.)
3. **Execute:** worker dispatches to the registered handler for `job.type`.
4. **Complete:** `UPDATE Job SET status='completed', finishedAt=now(), result=? WHERE id=?`.
5. **Fail:** `UPDATE Job SET status='failed', attempts=attempts+1, lastError=?, runAfter=now()+backoff WHERE id=?` — and if `attempts >= maxAttempts`, set `status='dead'` and move to `DeadLetter`.
6. **Stuck-job recovery:** a sweeper job finds `status='running' AND claimedAt < now() - staleAfter` and requeues them (worker crashed mid-job).
7. **Observability:** every transition emits an event on the Event Bus (`task.started`, `task.finished`, `task.failed`).

### Job types (examples)
- `embed-chunks` — batch embedding of new chunks.
- `extract-graph` — NER + relation extraction for new chunks.
- `consolidate-memory` — STM → LTM consolidation pass.
- `evaluation-run` — run an eval suite.
- `browser-task` — long-running browser automation.
- `autonomy-scheduled` — a scheduled trigger fired.
- `index-rebuild` — vector index migration.

### Why not BullMQ/Redis for v1
1. Personal scale — single Node process or small worker pool. A Redis server is operational overhead without benefit.
2. SQLite queue shares one file with the rest of the state — backup = copy file.
3. Atomic claim via `UPDATE ... RETURNING` is sufficient at the throughput personal AI needs (jobs/sec, not jobs/ms).
4. No Redis credentials, no failover, no memory pressure from large payloads.
5. BullMQ's strengths (priority queues, rate limiting, concurrency caps, scheduled jobs, flows) are achievable in a few hundred lines of SQL + TS for personal scale.

BullMQ earns its keep at: high throughput (100+ jobs/sec), cross-host workers, complex dependency graphs (flows), per-queue concurrency tuning at scale. None apply to v1 MiMo AI.

### Future scale path (documented, not adopted)
- **BullMQ on Redis:** drop-in replacement for the SQLite queue when MiMo needs cross-host workers or >100 jobs/sec. The `Queue` interface is identical; only the backing implementation swaps.
- **Redis Streams** as a queue (alternative to BullMQ) — also viable; *evaluate alongside.*

## Architecture
```
Producer ──enqueue──▶ Job table (SQLite)
                          │
                          ▼ (atomic claim)
                    Worker pool (N workers)
                          │
                          ├─ dispatch to handler by job.type
                          │
                          ├─ success → Job.status='completed' → emit task.finished
                          │
                          ├─ failure → attempts++, backoff → requeue OR dead-letter
                          │
                          └─ stuck (claimedAt stale) → sweeper requeues

Event Bus ──task.started/finished/failed──▶ Observability, UI, Autonomy, Learning
```

## Interfaces
```ts
interface Job<T = unknown> {
  id: string;
  type: string;
  payload: T;
  priority: number;            // higher = sooner
  status: 'pending'|'running'|'completed'|'failed'|'dead';
  attempts: number;
  maxAttempts: number;
  runAfter: Date;
  deadlineAt: Date;
  claimedBy?: string;
  result?: unknown;
  lastError?: string;
  traceId?: string;
  createdAt: Date;
  claimedAt?: Date;
  finishedAt?: Date;
}

interface Queue {
  enqueue<T>(type: string, payload: T, opts?: Partial<Job>): Promise<Job<T>>;
  enqueueMany<T>(items: { type: string; payload: T }[]): Promise<Job<T>[]>;
  cancel(jobId: string): Promise<void>;
  retry(jobId: string): Promise<void>;
  get(jobId: string): Promise<Job | null>;
  list(filter: JobFilter): Promise<Job[]>;
}

interface Worker {
  type: string;
  concurrency: number;
  handler: (job: Job) => Promise<unknown>;
  timeoutMs: number;
}

class TaskQueue implements Queue {
  registerWorker(w: Worker): void;
  start(): Promise<void>;
  stop(): Promise<void>;
}
```

## Dependencies
- Prisma + SQLite (the `Job` table).
- A worker supervisor (long-running mini-service started at boot).
- Event Bus for emitting transitions.
- Cancellation tokens (for graceful shutdown — `stop()` waits for in-flight jobs or aborts them).
- Distributed tracing (`traceId` propagated into the worker context).

## Strengths
- **Durable** — jobs survive crashes; pending resume on restart.
- **Atomic** — `UPDATE ... RETURNING` claim is race-free in SQLite.
- **Simple** — a few hundred lines of TS over a Prisma table.
- **No infrastructure** — no Redis, no separate process.
- **Observable** — every transition logged + emitted.
- **Backpressure-friendly** — workers pull at their own pace.

## Weaknesses
- **Single-writer serialization** — SQLite serializes writes; throughput caps at ~hundreds of jobs/sec (plenty for personal AI, insufficient for SaaS scale).
- **No native priority semantics beyond `ORDER BY priority`** — fine for v1.
- **No native delayed-job semantics beyond `runAfter`** — fine for v1.
- **Stuck-job detection** requires a sweeper — adds a moving part.
- **Cross-host workers impossible** without Redis/NATS.
- **Long payloads** in `Job.payload` bloat the DB — prefer object storage refs for big payloads.

## Failure Modes
- **Worker crash mid-job** — `claimedAt` goes stale; sweeper requeues. Mitigation: idempotent handlers (the same job may run twice).
- **Handler hangs forever** — `deadlineAt` enforced by the worker; aborts the handler.
- **Poison job** — repeatedly fails and requeues. Mitigation: `maxAttempts` cap → dead-letter.
- **Queue bloat** — completed/failed jobs accumulate. Mitigation: retention policy (archive/delete after N days).
- **Priority starvation** — low-priority jobs never run. Mitigation: aging (priority increases with wait time).
- **Claim race** — two workers claim the same row. Mitigation: SQLite serializes writes; `UPDATE ... WHERE id=(SELECT ... LIMIT 1) RETURNING *` is atomic.

## Security Implications
- **Payload sensitivity** — `Job.payload` may contain PII; SQLite file permissions + optional encryption.
- **Handler trust** — only registered handlers run; arbitrary code execution is not possible via the queue itself.
- **Cancellation** — `cancel()` must gracefully abort a running handler (token-based), not just mark the row.
- **Audit** — every job transition is logged; the queue is part of the audit trail for autonomous actions.

## Performance Implications
- Enqueue: one INSERT — <1ms.
- Claim: one UPDATE+RETURNING — <1ms.
- Worker throughput: bounded by handler latency, not the queue.
- Polling: workers poll every ~100ms; for lower latency, use SQLite's update hook (`sqlite-notify`) — *evaluate.*
- Concurrency: N workers per process; tune per handler type.

## Operational Implications
- Need a **worker supervisor** mini-service started at boot.
- Need a **sweeper job** for stuck-job recovery.
- Need a **retention job** to prune old completed/failed jobs.
- Need a **dashboard view** of queue depth, throughput, failures, dead-letter count.
- Need a **dead-letter UI** for inspecting + retrying failed jobs.

## Alternatives
- **BullMQ on Redis:** the natural upgrade when MiMo needs cross-host workers or >100 jobs/sec. *Defer to v2.*
- **Redis Streams as a queue:** alternative to BullMQ; *evaluate.*
- **In-memory queue (no persistence):** rejected — loses jobs on crash.
- **OS cron:** too coarse; no retries, no priorities, no observability.
- **Celery / Sidekiq (other-language):** rejected — wrong stack.
- **Postgres-based queues (e.g., pg-boss):** would require Postgres; rejected for v1.
- **AWS SQS / GCP Cloud Tasks:** cloud-managed; rejected — we want self-hosted personal AI.

## Maturity & Production Readiness
- SQLite-backed queue with atomic claim: mature, well-understood pattern. Suitable for v1.
- The pattern is essentially "pg-boss for SQLite" — proven in production at small-medium scale.

## Relevant Research / Papers
- "Reliable Delivery" and "Transactional Outbox" patterns — Richardson, *Microservices Patterns*, 2018.
- pg-boss (PostgreSQL queue) — analogous design, well-documented: `https://github.com/timgit/pg-boss`.
- BullMQ design docs: `https://docs.bullmq.io/`.

## Official Documentation
- SQLite `UPDATE ... RETURNING`: `https://www.sqlite.org/lang_returning.html`.
- Prisma raw SQL: `https://www.prisma.io/docs/orm/prisma-client/using-custom-sql-queries`.
- BullMQ (future path): `https://docs.bullmq.io/`.
- pg-boss (analog): `https://github.com/timgit/pg-boss`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Queue + workers run in the Next.js server runtime as long-lived mini-services.
- **Module layout:**
  - `src/server/queue/queue.ts` — the `TaskQueue` class + Prisma `Job` operations.
  - `src/server/queue/worker.ts` — the `Worker` base + supervisor.
  - `src/server/queue/sweeper.ts` — stuck-job recovery.
  - `src/server/queue/handlers/` — one file per job type (`embed-chunks.ts`, `extract-graph.ts`, `evaluation-run.ts`, etc.).
  - `src/server/queue/dead-letter.ts` — dead-letter inspection + retry API.
- **Prisma schema:** `Job { id, type, payload Json, priority Int, status, attempts Int, maxAttempts Int, runAfter DateTime, deadlineAt DateTime, claimedBy String?, result Json?, lastError String?, traceId String?, createdAt, claimedAt?, finishedAt? }`. Indexed on `(status, runAfter, priority, createdAt)`.
- **Workers as mini-services:** started by a supervisor at Next.js boot; each worker has `concurrency` (default 1 for heavy types, e.g. evaluation; 4 for light types, e.g. embed).
- **socket.io:** job status changes broadcast to the dashboard; zustand store surfaces queue depth, active jobs, recent failures.
- **Caddy:** irrelevant directly; the queue is internal.
- **Cancellation:** `AbortController` per job; `cancel()` triggers the abort; handlers must check the signal.

## Relevance To Our Project (MiMo AI layered runtime)
The Task Queue is the execution substrate for:
- Layer 10 (Execution) — long-running tasks, checkpoints, resumability.
- Layer 14 (Autonomy) — scheduled/event triggers enqueue jobs.
- Layer 13 (Learning) — lesson extraction runs as a job.
- Layer 4 (Knowledge) — embedding/extraction jobs.
- Layer 18 (Evaluation) — eval-suite runs.

## Recommended Usage
- **Adopt SQLite-backed queue for v1.**
- **Pin `maxAttempts` per job type** (e.g., `embed-chunks`: 3; `browser-task`: 2; `evaluation-run`: 1).
- **Set `deadlineAt` aggressively** for interactive-spawned jobs; loose for nightly jobs.
- **Make handlers idempotent** — sweeper may re-run.
- **Monitor queue depth + dead-letter count** — surface in dashboard.
- **Retention:** archive completed >7 days, failed >30 days.

## Decision
**ADOPT** — SQLite-backed Task Queue for v1. BullMQ/Redis explicitly **DEFERRED** to a future multi-worker / cross-host scale; the `Queue` interface is designed so the swap is a backing-implementation change only.

## Sources
- Technology inventory category 19 (Events/Triggers) lines 3383–3504 — esp. #322 Background Jobs (P0), #323 Task Queue (P1), #321 Schedules (P0), #274 Dead Letter Queue (P1, category 15).
- `docs/PROJECT_UNDERSTANDING.md` §5 (Core Runtime: Job Manager; Execution components: task queue, scheduling, background workers, dead-letter), §11 (Infrastructure: queues + workers).
- `docs/CAPABILITY_MAP.md` §19 (Queue + workers — R), §6 (Long-Horizon Execution — task queue/scheduling C).
- Richardson, *Microservices Patterns*, 2018 — Transactional Outbox, Reliable Delivery.
- pg-boss (analog): `https://github.com/timgit/pg-boss`.
- BullMQ (future path): `https://docs.bullmq.io/`.
- SQLite RETURNING: `https://www.sqlite.org/lang_returning.html`.
- *Inferred:* specific schema, atomic-claim SQL, sweeper design, retention policy — designed for this stack.
