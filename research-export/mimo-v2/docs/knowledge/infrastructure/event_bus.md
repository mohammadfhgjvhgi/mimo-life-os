# Event Bus

**Category:** Infrastructure
**Status:** CORE
**Maturity:** Mature (in-process); Mature (Redis/NATS)

## Definition
An Event Bus is an in-process pub/sub channel that decouples producers (anything that emits a signal: "chunk ingested", "tool finished", "memory written", "user message arrived", "task failed") from consumers (autonomy triggers, observers, UI broadcasters, learning workers). For v1 MiMo AI, the chosen form is **Node.js `EventEmitter` (typed) + a SQLite outbox** for durability. Redis Streams / NATS JetStream are documented as the future scale path, **not** adopted for v1.

## Problem Solved
- Without an event bus, every component must know every consumer ("tool finished → notify UI, log metric, trigger learning, check autonomy rules") → tight coupling, hard to extend.
- Direct calls make it impossible to add new consumers without touching the producer.
- Background work (learning, consolidation, KG extraction) needs to be triggered by events, not polled.

## Why It Matters
The Event Bus is the **nervous system** of the Runtime OS. It is what turns "a tool finished executing" into "the autonomy layer checks whether to act," "the learning layer extracts a lesson," "the UI streams a status update," "the observability layer records a metric" — all without the tool knowing about any of them.

## How It Works
### v1: Typed EventEmitter + SQLite outbox
1. **Producer** calls `bus.emit('tool.finished', payload)`.
2. **In-process** subscribers (registered at startup) fire synchronously-ish (or queued via `setImmediate` to avoid blocking the producer).
3. **Outbox:** the producer also writes a row to the SQLite `EventOutbox` table inside the same transaction as the work that triggered the event. This guarantees at-least-once delivery even if the process crashes between "work committed" and "subscribers ran."
4. **Relay worker:** a background loop reads un-acknowledged outbox rows, emits them on the in-process bus, marks them acknowledged. This covers events that should have fired but didn't (crash recovery).
5. **Idempotency:** subscribers must handle duplicate events (the outbox may redeliver). Use event IDs for dedup.

### Why not Redis/NATS for v1
1. Personal scale — single process, single user. A separate broker is operational overhead without benefit.
2. SQLite outbox gives durability for free (same file as everything else).
3. No network, no separate credentials, no failover complexity.
4. The Next.js dev model is a single Node process (or a small worker pool); in-process pub/sub is sufficient.

Redis/NATS earns its keep at: multi-process workers, cross-host events, fan-out to many services, message persistence beyond the app's lifetime. None apply to v1.

### Future scale path (documented, not adopted)
- **Redis Streams:** persistent, consumer groups, scale to many workers. Drop-in replacement for the outbox when we move to a worker pool.
- **NATS JetStream:** lighter than Kafka, persistent, multi-tenant. For cross-host or multi-instance MiMo.
- The `EventBus` interface is identical; only the backing implementation swaps.

## Architecture
```
Producer (e.g., Tool Layer)
    │
    ├─ (1) writes WorkRow + EventOutbox row in one SQLite txn
    │
    └─ (2) bus.emit('tool.finished', payload)  ──▶ in-process subscribers
                                                       │
                                                       ├─▶ Autonomy: should-act?
                                                       ├─▶ Learning: extract lesson
                                                       ├─▶ Observability: metric
                                                       └─▶ socket.io: UI broadcast

Background relay worker (loop):
    reads EventOutbox WHERE ackedAt IS NULL → re-emits → marks acked
```

## Interfaces
```ts
type EventName =
  | 'user.message'
  | 'task.started' | 'task.step' | 'task.finished' | 'task.failed'
  | 'tool.called' | 'tool.result' | 'tool.error'
  | 'memory.written' | 'memory.consolidated'
  | 'chunk.ingested' | 'kg.triple.extracted'
  | 'model.call' | 'model.error'
  | 'approval.requested' | 'approval.resolved'
  | 'autonomy.shouldAct' | 'autonomy.acted';

interface EventBus {
  on<T>(name: EventName, handler: (payload: T) => void | Promise<void>): Unsubscribe;
  once<T>(name: EventName, handler: (payload: T) => void | Promise<void>): Unsubscribe;
  emit<T>(name: EventName, payload: T, opts?: { durable?: boolean }): Promise<void>;
  off(name: EventName, handler: Function): void;
}
```
- `durable: true` (default for important events) writes to the outbox.
- Subscribers may be async; the bus awaits them but with a timeout (a slow subscriber shouldn't block the producer forever — log + continue).

## Dependencies
- Node.js `events.EventEmitter` (built-in).
- Prisma `EventOutbox` table.
- A background relay worker (Task Queue job or a long-running mini-service).
- socket.io server (for UI broadcasts — the bus has a `socket.io` subscriber that forwards selected events to the client).
- zod for payload validation at the boundary.

## Strengths
- **Decoupling** — producers don't know consumers.
- **Extensibility** — add a new consumer = one `bus.on(...)` line.
- **Durable** with the outbox (crash-safe).
- **Typed** (TypeScript discriminated unions on `EventName`) — refactor-safe.
- **No infrastructure** for v1.
- **Testable** — emit in test, assert subscribers fired.

## Weaknesses
- **In-process only (v1)** — doesn't survive process restart by itself; the outbox covers durability but cross-process fan-out isn't possible without Redis/NATS.
- **Backpressure** — a slow subscriber can stall the bus; need timeouts + dead-letter for stuck handlers.
- **Ordering** — events from different producers may interleave; subscribers that need ordering per-entity must key on `payload.entityId`.
- **No replay** beyond the outbox's retention window.
- **Debugging event chains** can be tricky — need distributed tracing (traceId propagated in payload).

## Failure Modes
- **Subscriber throws** — must not crash the bus. Mitigation: try/catch per handler; log + dead-letter.
- **Outbox bloat** — if the relay worker falls behind or dies, the outbox grows. Mitigation: monitor outbox depth; alert if > N unacked.
- **Duplicate delivery** — outbox may redeliver. Mitigation: idempotent subscribers + event ID dedup.
- **Lost event (in-process emit before subscriber registered)** — startup ordering matters. Mitigation: subscribers register at boot; producers never emit before boot completes.
- **Hot loop** — an event triggers a handler that emits the same event → infinite loop. Mitigation: depth counter; abort + alert if exceeded.

## Security Implications
- **Sensitive payloads** — events may carry PII; restrict the socket.io forwarder to non-sensitive event types, or redact payloads before broadcast to the client.
- **Subscriber trust** — any module can subscribe; in a single-process app this is fine, but audit who listens to what (a `bus.listeners(name)` debug endpoint).
- **Audit trail** — durable events ARE part of the audit trail; the outbox is append-only with `ackedAt`.

## Performance Implications
- In-process emit: microseconds.
- Outbox write: one extra INSERT in the same txn — negligible.
- Relay worker: polls every ~100ms; for higher throughput, switch to SQLite `update_returning` or a notify mechanism.
- socket.io broadcast: only for events the UI needs (filter at the forwarder).

## Operational Implications
- Need a **relay worker** running (long-running mini-service).
- Need an **outbox depth monitor** — alert if growing.
- Need a **dead-letter table** for events whose handlers repeatedly fail.
- Need a **bus debug view** in the dashboard (recent events, subscriber list).

## Alternatives
- **Direct calls (no bus):** rejected — tight coupling, un-extensible.
- **Redis Pub/Sub (no persistence):** fast but no durability; lost on crash. Insufficient alone.
- **Redis Streams:** durable, consumer groups — the natural upgrade when MiMo needs multi-worker. *Defer.*
- **NATS JetStream:** lighter than Kafka; multi-host. *Defer.*
- **Kafka:** overkill for personal scale.
- **Postgres LISTEN/NOTIFY:** would require Postgres; rejected for v1.
- **sqlite-notify / better-sqlite3 change hooks:** useful as an optimization to replace polling in the relay worker — *evaluate.*

## Maturity & Production Readiness
- Typed EventEmitter + outbox: standard, mature, production-grade at personal scale.
- Suitable for v1.

## Relevant Research / Papers
- Transactional Outbox pattern — Richardson, *Microservices Patterns* (2018), and Vernon, *Implementing DDD*.
- EventEmitter — Node.js standard library docs.

## Official Documentation
- Node.js `events`: `https://nodejs.org/api/events.html`.
- socket.io: `https://socket.io/docs/v4/`.
- Transactional Outbox: `https://microservices.io/patterns/data/transactional-outbox.html`.
- Redis Streams (future path): `https://redis.io/docs/latest/develop/use/data-types/streams/`.
- NATS JetStream (future path): `https://docs.nats.io/nats-concepts/jetstream`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** The bus lives in the Next.js server runtime. The client receives selected events via socket.io (the bus has a socket.io-forwarder subscriber).
- **Module layout:**
  - `src/server/events/bus.ts` — the `EventBus` class (wraps `EventEmitter`).
  - `src/server/events/outbox.ts` — writes/reads `EventOutbox` rows.
  - `src/server/events/relay.ts` — the background relay worker (mini-service).
  - `src/server/events/types.ts` — discriminated union of `EventName → Payload`.
  - `src/server/events/socket-forwarder.ts` — forwards whitelisted events to socket.io rooms.
- **Prisma schema:** `EventOutbox { id, name, payload Json, traceId?, createdAt, ackedAt? }`, `EventDeadLetter { ... }`.
- **Subscribers register at boot:** a `src/server/events/subscribers/index.ts` aggregator that imports and registers every subscriber module — ensures no emit fires before subscribers are ready.
- **socket.io rooms:** per-user room for personal events; per-task room for task-scoped updates; the client zustand store subscribes to relevant rooms.
- **Caddy:** socket.io is served on the same Caddy single-port gateway; websocket upgrade handled by Caddy.
- **Mini-services:** the relay worker is a long-running mini-service started by the Task Queue supervisor.

## Relevance To Our Project (MiMo AI layered runtime)
The Event Bus is part of the Core Runtime (Layer 0 / shared substrate) and is consumed by:
- Layer 14 (Autonomy) — `autonomy.shouldAct`, `autonomy.acted`.
- Layer 13 (Learning) — `task.finished`, `tool.error` → extract lessons.
- Layer 12 (Recovery) — `task.failed` → diagnose.
- Layer 15 (Observability) — every event → metric/trace.
- UI — task/memory/agent observability live updates.

## Recommended Usage
- **Adopt Typed EventEmitter + SQLite outbox for v1.**
- **Whitelist socket.io forwards** — only non-sensitive, UI-relevant events go to the client.
- **Make subscribers idempotent** — outbox may redeliver.
- **Propagate `traceId`** in every event payload for distributed tracing.
- **Monitor outbox depth** — alert if it grows.
- **Document the upgrade path** to Redis Streams when MiMo needs multi-worker.

## Decision
**ADOPT** — Typed EventEmitter + SQLite outbox for v1. Redis/NATS explicitly **DEFERRED** to a future multi-worker scale; the `EventBus` interface is designed so the swap is a backing-implementation change only.

## Sources
- Technology inventory category 19 (Events/Triggers) lines 3383–3504 — esp. #318 Event Bus (P0), #325 Event Source (P1), #322 Background Jobs (P0), #326 SSE (P0), #327 WebSocket (P1).
- `docs/PROJECT_UNDERSTANDING.md` §5 (Core Runtime: Event Bus), §11 (Infrastructure: event bus).
- `docs/CAPABILITY_MAP.md` §19 (Event bus — C, WebSocket R).
- Transactional Outbox pattern: `https://microservices.io/patterns/data/transactional-outbox.html`.
- Richardson, *Microservices Patterns*, 2018.
- Node.js events docs: `https://nodejs.org/api/events.html`.
- socket.io docs: `https://socket.io/docs/v4/`.
- *Inferred:* specific schema, relay worker design, subscriber registration pattern — designed for this stack.
