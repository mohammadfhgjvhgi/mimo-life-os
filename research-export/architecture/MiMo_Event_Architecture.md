# MiMo — Event Architecture
### Phase: Foundation From The Ground Up — ARCH-A (Doc 4/5)

**Status:** Canonical event model, producers, consumers, payloads, persistence, ordering, idempotency.
**Authority:** Derives from `MiMo_Product_Bible.md` Parts 8.5 (Agent Communication), 8.11 (Agent Observability), 10 (Execution Trace), 21 (Trust/Explainability), 22.9 (Audit Logs), 24 (Error/Recovery). Bound by `MiMo_System_Constitution.md` §6 (Event Ownership) and §12.2 (event-after-commit).
**Method:** Every event justifies its existence. Every event names its producer, consumer, payload, persistence, ordering, idempotency, retry, security implications. No event is introduced because it "might be useful."
**Labels:** `[CURRENT]` / `[TARGET]` / `[MIGRATION]` / `[FACT]` / `[INFERENCE]` / `[UNKNOWN]`.

---

## 0. Why events at all?

MiMo is single-process single-user. The reflex objection is: "if it's one process, just call functions." Events exist for four reasons, each verified against whether the problem is real today:

| Reason | Problem real today? | Justification |
|---|---|---|
| **Decoupling** — break cycles between Core modules | YES — `memory/`, `knowledge/`, `agents/`, `orchestrator/` would all call each other directly, creating import cycles | Without events, every module imports every other; with events, each module emits and listens |
| **Observability** — audit trail + ExecutionTrace UI + devMode | YES — Bible Part 22.9 (audit logs) + Part 10 (ExecutionTrace) require a record of what happened | Events ARE the audit trail; ExecutionTrace renders them; devMode time-travel replays them |
| **Recovery** — pause/resume/rollback need a state log | YES — Bible Part 24.4 + 24.7 (state-edit-and-continue, time-travel) | Events = state transition log; resume = replay events to rebuild state |
| **UI streaming** — token stream, agent progress, tool results | YES — Bible Part 10.1 (alive workflow), Part 20.6 (streaming) | Events flow from server to client via SSE/WebSocket; UI renders them as they arrive |

What MiMo does NOT use events for:
- **Distributed system integration** (single-process; no external subscribers).
- **Microservice choreography** (no microservices).
- **Event-sourced state reconstruction as primary** (SQLite is primary; events are audit + recovery, not source of truth — Constitution §5.1).

---

## 1. Event model

### 1.1 Canonical event shape [TARGET]

```typescript
interface MiMoEvent<T = unknown> {
  readonly id: string;            // UUID v4 — unique per event
  readonly sequenceNumber: number; // monotonic global — assigned by EventRepository on persist
  readonly type: string;          // canonical UPPER_SNAKE name (see §3)
  readonly payload: T;            // typed payload (see per-event contract in §3)
  readonly timestamp: number;     // ms epoch — set by producer BEFORE emit
  readonly source: string;        // producer module ID, e.g., 'memory:MemoryEngine'
  readonly correlationId: string; // workflow UUID — groups events in one turn
  readonly entityType?: string;  // which entity this event describes (for audit query)
  readonly entityId?: string;    // ID of that entity
  readonly actorType: 'user' | 'agent' | 'tool' | 'system';
  readonly actorId: string;      // 'user:<userId>' | 'agent:<agentId>' | 'tool:<toolId>' | 'system'
  readonly schemaVersion: number; // payload schema version
  readonly causalEventId?: string; // event that caused this one (for chain debugging)
}
```

This extends the current `MiMoEvent` (`core/types.ts:16`) which has only `type, payload, timestamp, source, correlationId`. The additions are: `id`, `sequenceNumber`, `entityType/entityId`, `actorType/actorId`, `schemaVersion`, `causalEventId`.

### 1.2 Canonical naming rule [TARGET]

> **Event types use UPPER_SNAKE_CASE, past tense, in the form `<NAMESPACE>_<ACTION_PAST_TENSE>`.**

Examples: `USER_MESSAGE_CREATED`, `MEMORY_DECAYED`, `TOOL_DENIED`, `EXECUTION_PAUSED`.

Why: past tense describes what happened (events are immutable facts about the past). UPPER_SNAKE distinguishes them from method calls (camelCase) and types (PascalCase).

### 1.3 [CURRENT] deviation

Audit + `core/events/index.ts` shows current names: `user.input`, `context.built`, `plan.created`, `agent.started`, `memory.stored`, `tool.invoked`, `response.ready`, `error.occurred`. These are lowercase-dot format. Constitution §6.2 mandates canonical UPPER_SNAKE. Migration plan: rename in M4 (event log + audit phase).

### 1.4 Two-tier model [TARGET]

```
┌────────────────────────────────────────────────────────────────────┐
│  Tier 1: Domain Events (in-memory, transient)                       │
│  ───────────────────────────────────────────────────                │
│  Produced in-memory by Core modules. Fanned-out to subscribers      │
│  by EventBus. Powers: ExecutionTrace UI, devMode live view,          │
│  reactive caches, optimistic UI confirmation.                        │
│  Lifetime: until end of process; lost on restart.                    │
├────────────────────────────────────────────────────────────────────┤
│  Tier 2: Audit Events (persisted, permanent)                        │
│  ───────────────────────────────────────────────────                │
│  Subset of Tier 1 events (those with audit value) persisted to the  │
│  `Event` table in the SAME transaction as the data write. Powers:    │
│  audit log (Bible 22.9), devMode time-travel (Bible 24.7), crash    │
│  recovery (Bible 22.13).                                             │
│  Lifetime: forever (archived after 1 year).                          │
└────────────────────────────────────────────────────────────────────┘
```

**Rule:** every Tier 2 event is also a Tier 1 event. Not every Tier 1 event is Tier 2. (E.g., `MODEL_TOKEN_STREAMED` is Tier 1 only — too high-frequency, not audit-relevant; the final `MESSAGE_STREAM_COMPLETED` is Tier 2.)

---

## 2. Event infrastructure

### 2.1 Do we need an event bus?

**Yes — but a single in-process EventBus, not a message broker.** (Constitution §14.2 — reject Kafka/NATS/RabbitMQ.)

The current `core/events/EventBus.ts` (Audit §1.2) is the right shape:
- Singleton `mimoEvents`.
- `emit(event)` — fire-and-forget, errors caught + logged (not propagated).
- `on(type, handler)` / `once(type, handler)` / `off(type, handler)`.
- Dependency-free (only types + logger) — no cycles.

Constitution §6.1: producer modules emit; consumer modules subscribe. No module imports another's internals for cross-cutting concerns.

### 2.2 Do we need an append-only event log?

**Yes.** (Bible Part 22.9 — "every agent action logged ... never deleted (append-only).")

The `Event` table (Data Architecture §8.1) is the append-only log. Tier 2 events are written there in the same transaction as their data write (Constitution §12.2).

### 2.3 Do we need domain events vs. integration events?

**Domain events only.** MiMo has no external subscribers. If a plugin (MCP server) needs to subscribe, it does so via the public API (polling `/api/events?since=<seq>`) — not by direct EventBus subscription. Integration events would be a future concern (E2E cloud sync, v2), not a v1 concern.

### 2.4 Do we need a job queue?

**Yes — a persisted task queue (in-process scheduler).** (Bible Part 8.9 + 26.11 — background tasks.)

Why: long-running agent work cannot block the request runtime (Constitution §10.2 — F17 forbidden). The queue:
- `Task` table (Domain Model §3.12) is the queue.
- `TaskScheduler` (in-process) picks up `state=queued` Tasks and runs them.
- Status flows back via events: `TASK_STARTED`, `TASK_PAUSED`, `TASK_COMPLETED`, `TASK_FAILED`.
- v1: in-process (single Next.js process). v2: separate daemon process (Bible 26.11).

What we do NOT need: a separate queue infrastructure (Redis Queue, BullMQ, etc.). SQLite + in-process scheduler is sufficient for single-user scale.

---

## 3. Canonical event catalog

Each event below has: name, producer, consumer(s), payload, persistence (Tier), ordering, idempotency, retry, security.

### 3.1 Conversation + Message events

#### `USER_MESSAGE_CREATED`

- **Producer:** API route `/api/chat` (after persisting the Message).
- **Consumers:** WorkflowEngine (starts a Workflow), ExecutionTrace UI (renders the user's message), NotificationEngine (if mention detected).
- **Payload:** `{ messageId, conversationId, projectId, content, attachments: [{type, id}[], mentions: [{type, id}[]] }`.
- **Persistence:** Tier 2 (audit).
- **Ordering:** Per-conversation monotonic by `sequenceNumber`.
- **Idempotency:** Producer dedupes by `messageId` (UUID).
- **Retry:** None — user message creation is synchronous; if persist fails, API returns 500, no event emitted.
- **Security:** Content not logged to filesystem logs (only to encrypted Event table). PII-safe.

#### `MESSAGE_STREAM_STARTED`

- **Producer:** `orchestrator/Orchestrator` when first model token arrives.
- **Consumers:** ExecutionTrace UI, conversation renderer.
- **Payload:** `{ messageId, workflowId, modelId }`.
- **Persistence:** Tier 1 only (high-frequency).

#### `MESSAGE_TOKEN_STREAMED`

- **Producer:** Model adapter (via Orchestrator) for each token chunk.
- **Consumers:** SSE stream to client (renders incrementally).
- **Payload:** `{ messageId, token, position }`.
- **Persistence:** Tier 1 only (too high-frequency). Streamed to client; not stored as events.
- **Note:** This is the ONLY event that flows to the client without going through EventBus persistence. It's a direct SSE stream from the model adapter to the client.

#### `MESSAGE_STREAM_COMPLETED`

- **Producer:** `orchestrator/Orchestrator` when stream ends.
- **Consumers:** MemoryEngine (auto-extract candidate memories), KnowledgeEngine (observe for consolidation), ExecutionTrace UI (mark done).
- **Payload:** `{ messageId, workflowId, tokenCount, durationMs }`.
- **Persistence:** Tier 2.
- **Idempotency:** Deduped by `messageId`.

#### `MESSAGE_EDITED`

- **Producer:** API route `/api/message/edit`.
- **Consumers:** Conversation renderer, MemoryEngine (re-extract), KnowledgeEngine (re-observe).
- **Payload:** `{ messageId, oldContent, newContent, editedBy, editedAt }`.
- **Persistence:** Tier 2.
- **Security:** `oldContent` retained for audit (Bible Invariant 5 — recovery); only hard-deleted with the conversation.

#### `CONVERSATION_FORKED`

- **Producer:** API route `/api/conversation/fork`.
- **Consumers:** Conversation list renderer.
- **Payload:** `{ parentConversationId, parentMessageId, newConversationId }`.
- **Persistence:** Tier 2.

#### `CONVERSATION_ARCHIVED` / `CONVERSATION_RESTORED`

- **Producer:** API route `/api/conversation/archive` / `restore`.
- **Consumers:** Workspace API cache invalidation, conversation list.
- **Persistence:** Tier 2.

### 3.2 Context events

#### `CONTEXT_RESOLVED`

- **Producer:** `context/ContextBuilder` after assembling the ContextObject for a turn.
- **Consumers:** Reasoner (consumes Context), ExecutionTrace UI (Context stage lights up).
- **Payload:** `{ workflowId, memoryCount, entityCount, fileCount, toolCount, conversationTurnCount, compressed: bool, compressionRatio }`.
- **Persistence:** Tier 2 (audit + devMode time-travel).
- **Security:** Does NOT include content (only counts). Content is in the ContextObject (in-memory) + devMode snapshot (opt-in).

### 3.3 Memory events

#### `MEMORY_CREATED`

- **Producer:** `memory/MemoryEngine` after persist.
- **Consumers:** KnowledgeEngine (observe for consolidation), MemoryBrowser UI, ExecutionTrace (if extracted during a turn).
- **Payload:** `{ memoryId, type, content, projectId, scope, sourceId, confidence, extractionMethod: 'explicit' | 'auto-extracted' | 'auto-extracted-confirmed' }`.
- **Persistence:** Tier 2.
- **Security:** `content` is encrypted at rest (Constitution §11). Provenance (`sourceId`) is mandatory — Bible Invariant 4. An emit without `sourceId` is a code bug; the producer must refuse.

#### `MEMORY_UPDATED`

- **Producer:** `memory/MemoryEngine` after edit (creates a `MemoryEdit` row).
- **Payload:** `{ memoryId, field, oldValue, newValue, editedBy, reason }`.
- **Persistence:** Tier 2.
- **Idempotency:** Each edit is a unique row; no dedup needed.

#### `MEMORY_DECAYED`

- **Producer:** `memory/MemoryEngine` on scheduled decay recalculation (e.g., daily).
- **Payload:** `{ memoryId, oldConfidence, newConfidence, decayedAt }`.
- **Persistence:** Tier 2 (for trust transparency — Bible 5.4 confidence display).
- **Frequency:** Once per memory per decay interval (not per query).

#### `MEMORY_DELETED`

- **Producer:** `memory/MemoryEngine` after hard delete.
- **Consumers:** KnowledgeEngine (unlink from Entities), MemoryBrowser UI.
- **Payload:** `{ memoryId, deletedBy, deletedAt, sourceId }`.
- **Persistence:** Tier 2 (proves deletion happened — Bible 22.11).

### 3.4 Knowledge events

#### `KNOWLEDGE_INDEXED`

- **Producer:** `knowledge/KnowledgeEngine` after persisting a new Entity.
- **Consumers:** KnowledgeBrowser UI, UserModel cache invalidator.
- **Payload:** `{ entityId, type, name, evidenceCount, confidence, projectId }`.
- **Persistence:** Tier 2.

#### `ENTITY_MERGED`

- **Producer:** `knowledge/ConsolidationEngine` after merging two Entities.
- **Consumers:** KnowledgeBrowser UI, UserModel cache invalidator.
- **Payload:** `{ sourceEntityId, targetEntityId, mergeReason, evidenceCount }`.
- **Persistence:** Tier 2.
- **Cascade:** `Relationship` rows referencing `sourceEntityId` are updated to `targetEntityId` (in same tx).

#### `EVOLUTION_DETECTED`

- **Producer:** `knowledge/EvolutionEngine` (Bible 5.5 — interest→skill→expert).
- **Consumers:** NotificationEngine (inform owner), KnowledgeBrowser UI.
- **Payload:** `{ entityId, oldType, newType, evidenceCount }`.
- **Persistence:** Tier 2.

#### `RELATIONSHIP_CREATED`

- **Producer:** `knowledge/KnowledgeEngine` (or `discoverRelations` heuristic).
- **Payload:** `{ fromId, toId, type, evidenceId }`.
- **Persistence:** Tier 2.

### 3.5 Task + Workflow events

#### `TASK_CREATED`

- **Producer:** `workflow/WorkflowEngine` after creating a Task row.
- **Consumers:** TaskScheduler (queue), AgentDock UI.
- **Payload:** `{ taskId, workflowId, taskType, agentId, sandboxMode, approvalPolicy, estimatedDurationMs? }`.
- **Persistence:** Tier 2.

#### `TASK_STARTED` / `TASK_PAUSED` / `TASK_RESUMED` / `TASK_COMPLETED` / `TASK_FAILED` / `TASK_CANCELLED`

- **Producer:** `workflow/WorkflowEngine` on each state transition.
- **Consumers:** AgentDock UI, ExecutionTrace UI, NotificationEngine (on failure — Bible 24.2).
- **Payload:** `{ taskId, fromState, toState, byActor, reason?, durationMs? }`.
- **Persistence:** Tier 2 (all).
- **Idempotency:** State transitions are unique per `(taskId, toState, at)`; deduped by transition UUID.

#### `TASK_APPROVAL_REQUESTED`

- **Producer:** `policies/PolicyEngine` when `Decision = require_approval`.
- **Consumers:** NotificationEngine (inline approval card — Bible 9.2), AgentDock UI.
- **Payload:** `{ taskId, actionType, requestedScope, sandboxMode, trustLedgerState }`.
- **Persistence:** Tier 2.
- **Security:** Approval required for destructive actions (Bible 9.2 — delete, overwrite, external send).

#### `TASK_APPROVAL_GRANTED` / `TASK_APPROVAL_DENIED`

- **Producer:** API route `/api/task/approve` / `deny` (user action).
- **Consumers:** WorkflowEngine (resumes or aborts), TrustLedger (increments approval count), PolicyEngine cache.
- **Payload:** `{ taskId, grantedBy, grantedAt, trustUpgradeOffered: bool }`.
- **Persistence:** Tier 2.

#### `WORKFLOW_STARTED` / `WORKFLOW_COMPLETED` / `WORKFLOW_FAILED`

- **Producer:** `workflow/WorkflowEngine`.
- **Consumers:** ExecutionTrace UI (Done stage), audit log.
- **Payload:** `{ workflowId, conversationId, messageId, stages: ['CONTEXT','REASON','PLAN','EXECUTE','VALIDATE','DONE'], durationMs }`.
- **Persistence:** Tier 2.

### 3.6 Plan events

#### `PLAN_CREATED`

- **Producer:** `planner/Planner` after building the Plan.
- **Consumers:** ExecutionTrace UI (Plan stage renders), API route (streams to client), approval gate.
- **Payload:** `{ planId, taskId, steps: [{ id, description, agentId, toolIds[], dependencies[], isDestructive, requiresApproval }], approvable: bool }`.
- **Persistence:** Tier 2 (devMode time-travel).

#### `PLAN_APPROVED` / `PLAN_REJECTED` / `PLAN_EDITED`

- **Producer:** API route `/api/plan/approve` / `reject` / `edit`.
- **Consumers:** WorkflowEngine (proceeds or aborts), ExecutionTrace UI.
- **Payload:** `{ planId, byActor, editedSteps? }`.
- **Persistence:** Tier 2.

### 3.7 Agent + Execution events

#### `AGENT_STARTED`

- **Producer:** `orchestrator/Orchestrator` (not the Agent itself — Constitution §6.1).
- **Consumers:** AgentDock UI, audit log.
- **Payload:** `{ executionId, taskId, agentId, modelId, scope, sandboxMode }`.
- **Persistence:** Tier 2.

#### `AGENT_DELEGATED`

- **Producer:** `orchestrator/Orchestrator` when spawning a subagent (Bible 8.4).
- **Payload:** `{ parentExecutionId, childExecutionId, childAgentId, delegatedScope }`.
- **Persistence:** Tier 2.

#### `AGENT_COMPLETED` / `AGENT_FAILED`

- **Producer:** `orchestrator/Orchestrator`.
- **Consumers:** AgentDock UI (dock slides away on completion — Bible 8.2), NotificationEngine (on failure).
- **Payload:** `{ executionId, durationMs, result?: 'success'|'failure', error?: { type, message, recoverable } }`.
- **Persistence:** Tier 2.

#### `EXECUTION_PAUSED` / `EXECUTION_RESUMED` / `EXECUTION_ROLLED_BACK`

- **Producer:** `orchestrator/Orchestrator` on user action (Bible 9.7).
- **Consumers:** ExecutionTrace UI, Task state machine.
- **Payload:** `{ executionId, byActor, at: 'step:<stepId>'|'stage:<stage>' }`.
- **Persistence:** Tier 2.

### 3.8 Tool events

#### `TOOL_CALLED`

- **Producer:** `tools/<Tool>.execute()` (after PolicyEngine.authorize() returns `allow`).
- **Consumers:** Audit log, ExecutionTrace UI (shows tool call).
- **Payload:** `{ toolCallId, toolId, executionId, input, authorizedBy: 'policy'|'trust-ledger'|'explicit-approval', sandboxMode }`.
- **Persistence:** Tier 2 (audit — Bible 22.9).

#### `TOOL_RESULT_RECEIVED`

- **Producer:** `tools/<Tool>.execute()` after the tool returns.
- **Consumers:** Orchestrator (continues), ExecutionTrace UI.
- **Payload:** `{ toolCallId, output, durationMs, success: bool }`.
- **Persistence:** Tier 2.
- **Security:** Output may contain secrets (e.g., API key echoed back) — sanitized before audit persist (Bible 22.3).

#### `TOOL_DENIED`

- **Producer:** `policies/PolicyEngine` when `Decision = deny`.
- **Consumers:** Audit log (critical for security — Bible 22.9), NotificationEngine (inline message).
- **Payload:** `{ toolId, executionId, input, denialReason: 'no-permission'|'sandbox-violation'|'trust-insufficient'|'rate-limit' }`.
- **Persistence:** Tier 2.

#### `TOOL_APPROVAL_REQUIRED`

- **Producer:** `policies/PolicyEngine` when `Decision = require_approval`.
- **Consumers:** NotificationEngine (inline approval card — Bible 9.2).
- **Payload:** `{ toolId, executionId, input, requestedScope, sandboxMode, trustLedgerEntryId? }`.
- **Persistence:** Tier 2.

### 3.9 Model events

#### `MODEL_INVOKED`

- **Producer:** `orchestrator/Orchestrator` (or Agent) via `Model.invoke()`.
- **Consumers:** Audit log, ExecutionTrace UI, billing/quota (none — Bible Invariant 9).
- **Payload:** `{ modelId, providerId, promptTokens, completionTokens, durationMs, modelVersion, dimension }`.
- **Persistence:** Tier 2 (for cost transparency — Bible Part 21.3 "what AI did").
- **Security:** Prompt content NOT in the audit payload (too large, may contain PII); only counts. Prompt content is in the `ExecutionStep` row if devMode snapshot enabled.

#### `MODEL_TOKEN_STREAMED`

- See §3.1 — high-frequency, Tier 1 only, streamed via SSE.

#### `MODEL_FAILED`

- **Producer:** Model adapter on provider error.
- **Consumers:** Orchestrator (retry with backoff — Bible 7.12), NotificationEngine.
- **Payload:** `{ modelId, errorType: 'network'|'quota'|'rate-limit'|'content-filter'|'unknown', message, retryable }`.
- **Persistence:** Tier 2 (if retryable, Tier 1 only — too noisy otherwise).

### 3.10 Artifact events

#### `ARTIFACT_CREATED`

- **Producer:** `artifacts/ArtifactService` after persist + blob write.
- **Consumers:** ArtifactDock UI, Conversation renderer (inline card).
- **Payload:** `{ artifactId, projectId, type, title, version: 1, conversationId, executionId, agentId }`.
- **Persistence:** Tier 2.
- **Provenance:** `conversationId + executionId + agentId` is mandatory — Bible Invariant (Part 11.6). Producer refuses to emit without all three.

#### `ARTIFACT_UPDATED`

- **Producer:** `artifacts/ArtifactService` after a new version.
- **Payload:** `{ artifactId, newVersion, changeType: 'content'|'metadata', updatedBy }`.
- **Persistence:** Tier 2.

#### `ARTIFACT_VERSIONED`

- Same as `ARTIFACT_UPDATED` — versioning is the update mechanism. Folded.

#### `ARTIFACT_HUNK_ACCEPTED` / `ARTIFACT_HUNK_REJECTED`

- **Producer:** API route `/api/artifact/hunk/accept` / `reject` (Bible Part 10.5).
- **Consumers:** ArtifactService (applies/reverts hunk), ExecutionTrace UI.
- **Payload:** `{ artifactId, hunkId, accepted: bool, byActor }`.
- **Persistence:** Tier 2.

### 3.11 Validation events

#### `VALIDATION_STARTED`

- **Producer:** `validator/Validator`.
- **Payload:** `{ executionId, messageId }`.
- **Persistence:** Tier 1 (very fast; not audit-relevant unless failed).

#### `VALIDATION_COMPLETED`

- **Producer:** `validator/Validator` (final gate — Bible 7.11).
- **Consumers:** Orchestrator (returns response if pass; enters recovery if fail), ExecutionTrace UI.
- **Payload:** `{ executionId, messageId, passed: bool, report: { completeness, formatErrors, sanitised, hallucinationFlagged } }`.
- **Persistence:** Tier 2.
- **Security:** If `hallucinationFlagged = true`, the response is marked `/* check-token */` and the user is notified (Bible 27.16).

### 3.12 Policy + trust events

#### `PERMISSION_GRANTED` / `PERMISSION_REVOKED`

- **Producer:** API route `/api/permissions` (user action).
- **Consumers:** PolicyEngine cache invalidator.
- **Payload:** `{ permissionId, subjectType, subjectId, action, resource, byActor }`.
- **Persistence:** Tier 2.

#### `TRUST_UPGRADED`

- **Producer:** `policies/TrustLedger` after the 3rd approval (Bible 8.7).
- **Consumers:** NotificationEngine (offer "Always allow"), PolicyEngine cache.
- **Payload:** `{ trustEntryId, taskType, sandboxMode, newLevel: 'on-request'|'always-allow' }`.
- **Persistence:** Tier 2.

#### `PERMISSION_DENIED`

- Same as `TOOL_DENIED` from the PolicyEngine side — folded.

### 3.13 User + UI events

#### `USER_EDITED`

- **Producer:** API route `/api/turn/edit` (or any mutation endpoint).
- **Consumers:** Subscribed agents (Bible 8.12 — Windsurf pattern — offer consistency fixes).
- **Payload:** `{ entityType, entityId, field, editedBy }`.
- **Persistence:** Tier 2.

#### `NOTIFICATION_SHOWN` / `NOTIFICATION_DISMISSED`

- **Producer:** NotificationEngine.
- **Persistence:** Tier 1 (UI-only; Notification table is source of truth).

### 3.14 System events

#### `SYSTEM_BOOTED`

- **Producer:** `kernel/Kernel.boot()`.
- **Payload:** `{ version, schemaVersion, bootedAt, loadedModules: string[] }`.
- **Persistence:** Tier 2.
- **Note:** No `correlationId` (system event).

#### `SYSTEM_ERROR_OCCURRED`

- **Producer:** Any module on uncaught error.
- **Consumers:** NotificationEngine (inline error — Bible 24.2), audit log.
- **Payload:** `{ module, errorType, message, stack?, recoverable }`.
- **Persistence:** Tier 2 (always — Bible Invariant 8 — no silent failures).

---

## 4. Event flow: end-to-end example

A user sends a message. What happens?

```
1.  Client → POST /api/chat { conversationId, content }
2.  API route validates input
3.  API route → MessageRepository.create()  [TX BEGIN]
4.      Message row inserted
5.      USER_MESSAGE_CREATED event row inserted (same TX)
6.  [TX COMMIT]
7.  API route → EventBus.emit(USER_MESSAGE_CREATED)  [Tier 1 fan-out]
8.  WorkflowEngine subscribes → starts Workflow
9.  WorkflowEngine → WorkflowRepository.create()  [TX]
10.     WORKFLOW_STARTED event row inserted (same TX)
11. [TX COMMIT]
12. WorkflowEngine → EventBus.emit(WORKFLOW_STARTED)
13. WorkflowEngine → ContextBuilder.build(workflowId)
14.     ContextBuilder reads Memory, Entity, File, Tool tables
15.     ContextBuilder → EventBus.emit(CONTEXT_RESOLVED)  [Tier 2 persist in own tx]
16. WorkflowEngine → Reasoner.run(context)
17.     Reasoner may call Model (via adapter) → MODEL_INVOKED event
18.     Reasoner returns Intent
19. WorkflowEngine → Planner.buildPlan(intent, context)
20.     Planner → PLAN_CREATED event (Tier 2)
21.     If plan.approvable: API route streams to client; wait for PLAN_APPROVED
22. WorkflowEngine → Orchestrator.execute(plan)
23.     For each step:
24.         Orchestrator spawns Agent → AGENT_STARTED event
25.         Agent may call Tool → PolicyEngine.authorize() → TOOL_CALLED or TOOL_DENIED
26.         Tool returns → TOOL_RESULT_RECEIVED
27.         Agent completes → AGENT_COMPLETED event
28. WorkflowEngine → Validator.validate(result) → VALIDATION_COMPLETED
29. Validator returns sanitised response
30. WorkflowEngine → MessageRepository.update(messageId, content)  [TX]
31.     MESSAGE_STREAM_COMPLETED event row inserted
32. [TX COMMIT]
33. WorkflowEngine → EventBus.emit(MESSAGE_STREAM_COMPLETED)
34. MemoryEngine subscribes → auto-extracts candidate memories → MEMORY_CREATED events
35. KnowledgeEngine subscribes → observes for consolidation → may emit ENTITY_*
36. WorkflowEngine → WORKFLOW_COMPLETED event
37. API route returns final response to client
```

Note: every Tier 2 event is in a transaction with its data write (Constitution §12.2). Every Tier 1 fan-out happens AFTER commit (so subscribers never see uncommitted state). This is the foundation of Bible Part 24.7 (time-travel) — replay events to rebuild any past state.

---

## 5. Cross-cutting event rules

### 5.1 Ordering [TARGET]

- **Per-correlation-id ordering:** events with the same `correlationId` (workflow) are persisted in the order they were emitted, by `sequenceNumber`.
- **Global ordering:** `sequenceNumber` is monotonic globally (auto-increment in `Event` table).
- **Causality:** `causalEventId` lets us reconstruct causal chains (e.g., `MEMORY_CREATED` was caused by `MESSAGE_STREAM_COMPLETED`).
- **No causal ordering across workflows:** two unrelated workflows' events may interleave; that's correct.

### 5.2 Idempotency [TARGET]

- **Each event has a unique `id` (UUID).** Producers dedupe by `id` before persisting.
- **Subscribers must be idempotent.** An event delivered twice (e.g., on retry) must produce the same effect as delivered once. Subscribers key their side-effects by `event.id`.
- **Tier 2 events are write-once.** The `Event` table is append-only; re-emitting an event with the same `id` is a no-op (constraint violation caught + logged).

### 5.3 Retry [TARGET]

| Failure point | Retry strategy |
|---|---|
| EventBus.emit (Tier 1) | Fire-and-forget. Errors logged (current behavior — Audit §1.4). No retry. Subscribers are idempotent, so missing one event is recoverable on next event. |
| Event persistence (Tier 2) | MUST succeed — if the event write fails, the data write rolls back (same TX). The user sees an error. No silent loss. |
| Subscriber processing | Subscribers may retry internally (e.g., KnowledgeEngine consolidation might fail on a transient read). If a subscriber fails permanently, the event is still persisted; the subscriber catches up on next boot (reads `Event` table from last-processed `sequenceNumber`). |
| SSE delivery to client | Client tracks `lastSequenceNumber`. On reconnect, requests `/api/events?since=<lastSeq>` to catch up. No event lost. |

### 5.4 Backpressure [TARGET]

- **High-frequency events** (TOKEN_STREAMED, VALIDATION_STARTED) are Tier 1 only — they don't hit the DB.
- **Bursts** (e.g., auto-extracting 20 memories from one message): each `MEMORY_CREATED` is its own transaction; the MemoryEngine processes them sequentially (not in parallel) to avoid DB contention.
- **UI throttling:** ExecutionTrace UI batches renders (Framer Motion `useAnimationFrame`); doesn't render every event individually if they arrive faster than 60fps.

### 5.5 Security implications [TARGET — Bible Part 22]

| Concern | Mitigation |
|---|---|
| PII in event payloads | Tier 2 events store counts + IDs, not content. Content is in the data tables (encrypted at rest). |
| Secret leakage (API keys in tool inputs/outputs) | Tool inputs/outputs sanitized before persist (regex for known key patterns). |
| Audit tampering | `Event` table is append-only (no UPDATE/DELETE in code; DB-level trigger can enforce). |
| Event log reads (devMode) | devMode is owner-only (Bible 28.2); event log in devMode is full; in production, only the audit-relevant subset. |
| Event log size | Archived after 1 year to cold file (still readable; not deleted — Bible 22.9). |

---

## 6. Event → consumer matrix

| Event | ExecutionTrace UI | AgentDock UI | ArtifactDock UI | MemoryBrowser | KnowledgeBrowser | NotificationEngine | AuditLog | PolicyEngine cache | UserModel cache | KnowledgeEngine | MemoryEngine |
|---|---|---|---|---|---|---|---|---|---|---|---|
| USER_MESSAGE_CREATED | ✓ | | | | | | ✓ | | | | |
| MESSAGE_STREAM_COMPLETED | ✓ | | | | | | ✓ | | | ✓ | ✓ |
| CONTEXT_RESOLVED | ✓ | | | | | | ✓ | | | | |
| MEMORY_CREATED | ✓ (during turn) | | | ✓ | | ✓ (if extracted) | ✓ | | ✓ | ✓ | |
| MEMORY_UPDATED / DELETED | | | | ✓ | | | ✓ | | ✓ | ✓ | |
| KNOWLEDGE_INDEXED | | | | | ✓ | | ✓ | | ✓ | | |
| ENTITY_MERGED / EVOLUTION_DETECTED | | | | | ✓ | ✓ (evolution) | ✓ | | ✓ | | |
| TASK_CREATED / STARTED / COMPLETED | ✓ | ✓ | | | | ✓ (fail) | ✓ | | | | |
| TASK_APPROVAL_REQUESTED | | ✓ | | | | ✓ | ✓ | | | | |
| PLAN_CREATED / APPROVED | ✓ | | | | | | ✓ | | | | |
| AGENT_STARTED / COMPLETED | ✓ | ✓ | | | | ✓ (fail) | ✓ | | | | |
| EXECUTION_PAUSED / RESUMED | ✓ | ✓ | | | | | ✓ | | | | |
| TOOL_CALLED / RESULT / DENIED | ✓ | | | | | ✓ (deny) | ✓ | | | | |
| MODEL_INVOKED | ✓ | | | | | | ✓ | | | | |
| ARTIFACT_CREATED / UPDATED | | | ✓ | | | | ✓ | | | | |
| ARTIFACT_HUNK_ACCEPTED / REJECTED | | | ✓ | | | | ✓ | | | | |
| VALIDATION_COMPLETED | ✓ | | | | | ✓ (if fail) | ✓ | | | | |
| PERMISSION_GRANTED / REVOKED | | | | | | | ✓ | ✓ | | | |
| TRUST_UPGRADED | | | | | | ✓ | ✓ | ✓ | | | |
| USER_EDITED | | | | | | | ✓ | | | (subscribed agents) | |
| SYSTEM_ERROR_OCCURRED | | | | | | ✓ | ✓ | | | | |

---

## 7. [CURRENT] vs. [TARGET] gap analysis

### 7.1 Current state (Audit §1.4 + `core/events/index.ts`)

- 14 event types exist: `user.input`, `context.built`, `plan.created`, `decision.made`, `run.started`, `run.completed`, `run.failed`, `agent.started`, `agent.completed`, `agent.failed`, `tool.invoked`, `tool.result`, `memory.stored`, `memory.recalled`, `model.invoked`, `response.ready`, `error.occurred`.
- All Tier 1 (in-memory). None persisted.
- No `correlationId` propagation across the workflow (audit §1.4 — `correlationId?` is optional).
- No `entityType/entityId` (audit impossible).
- No `actorType/actorId` (no accountability).
- No `schemaVersion` (no evolution).

### 7.2 Migration plan [MIGRATION]

| Phase | Action |
|---|---|
| **M4a** | Add the missing fields to `MiMoEvent` (id, sequenceNumber, entityType, entityId, actorType, actorId, schemaVersion, causalEventId). |
| **M4b** | Create `Event` table + `EventRepository.write()` (in same TX as data writes). |
| **M4c** | Rename `EVENT` constants to canonical UPPER_SNAKE. Add a backward-compat alias map (`user.input` → `USER_INPUT_CREATED`, etc.) for one release. |
| **M4d** | Update each producer (MemoryEngine, WorkflowEngine, Orchestrator, Validator, Agents) to emit the new shape with all fields populated. |
| **M4e** | Add `/api/events?since=<seq>` SSE endpoint for client catch-up. |
| **M4f** | Add devMode event browser in DeveloperPanel (Bible Part 22.9). |

Each phase is independently shippable. M4a–M4c are foundational; M4d–M4f are progressive.

### 7.3 Risks [MIGRATION]

| Risk | Mitigation |
|---|---|
| Renaming events breaks subscribers | Aliases for one release (Constitution §9.2 — backward compat). |
| Adding required fields (`correlationId`) breaks producers | Make required, audit each producer, fix all in M4d. |
| Event table grows fast | Tier 1 only for high-frequency events (TOKEN_STREAMED). Tier 2 only for audit-relevant. Archive after 1 year. |
| Subscriber idempotency bugs surface on retry | Test plan: deliberately re-emit events in devMode and verify no double side-effects. |

---

## 8. Open questions

1. **[UNKNOWN]** Should `MODEL_TOKEN_STREAMED` events be persisted at all (e.g., for full conversation replay)? Lean: no — too noisy, not audit-relevant. The completed Message is the audit record.
2. **[UNKNOWN]** Should we use SSE or WebSocket for client delivery? Lean: SSE — simpler, one-way (server→client), works over HTTP/2, no protocol upgrade. WebSocket only if bidirectional needed (v2 mobile companion — Bible 26.12).
3. **[UNKNOWN]** How to handle events emitted during a transaction that later rolls back? **Decision:** they are NOT emitted. The EventBus.emit happens AFTER commit (Constitution §12.2). If the TX rolls back, no event. This means subscribers never see events for data that doesn't exist.
4. **[UNKNOWN]** Should devMode time-travel use the event log directly, or separate snapshots? Lean: snapshots (Bible 24.7 — "step back through the pipeline, inspect past state"). Events are the audit; snapshots are the devMode replay. Both derived from the same Workflow + Execution + ExecutionStep rows.
5. **[UNKNOWN]** How to surface trust-ledger upgrades without notification fatigue? Bible Part 9.8 mandates no approval storms. `TRUST_UPGRADED` is once-per-task-type, not per-instance, so volume is bounded. Acceptable.

---

## 9. Summary

MiMo's event architecture is deliberately small:

- **One in-process EventBus** (no broker) — current code is the right shape, needs persistence.
- **One append-only `Event` table** (no separate log file) — Tier 2 audit + recovery.
- **One canonical event catalog** (~50 events across 13 namespaces) — each justified, each with explicit producer/consumer/payload/persistence/idempotency.
- **Two-tier model** — Tier 1 (transient, in-memory, for UI streaming) and Tier 2 (persisted, for audit/recovery). Not every Tier 1 event is Tier 2.
- **No job-queue infrastructure** — `Task` table + in-process scheduler. Sufficient for single-user scale.

The architecture respects:
- **Constitution §6** — producers own event semantics; orchestrator (not agents) emits agent events.
- **Constitution §12.2** — events emitted after commit, in the same transaction as the data write.
- **Bible Part 22.9** — audit log, append-only, never deleted.
- **Bible Part 24.7** — events enable time-travel debugging.
- **Bible Part 10.1** — events flow to ExecutionTrace UI for "alive" feel.

Migration from [CURRENT] (14 in-memory events, no audit) to [TARGET] (~50 events, full audit, SSE delivery) is sequenced as M4a–M4f, each independently shippable.

**End of Event Architecture.**
