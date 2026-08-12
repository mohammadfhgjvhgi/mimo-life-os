# MiMo — Observability Architecture

**Task ID:** ARCH-C / Doc 7 of 7
**Phase:** Foundation From The Ground Up
**Status:** ARCHITECTURE (no implementation). Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible Part 22.9 (Audit Logs Invariant), Part 8.11 (Agent Observability), Part 10 (Execution/Runtime UX), Part 21 (Trust/Explainability), Part 24 (Error/Recovery), Part 26.6 (Background Sync). Current System Audit §3.2 (EventBus in-memory), §9.5 (no audit log), §1.4 (DeveloperPanel consumes EventBus live).
**Scope:** Logs, metrics, traces, execution events, agent/model/tool traces, error classification, retries, recovery, rollback, diagnostics. **Both user-facing and developer-facing observability.**

> **Architectural rule.** MiMo must be **explainable when something fails.** When the owner sees an inline error card, they must be able to drill down to the exact agent, exact tool, exact model call, exact input, exact output, exact decision that produced the failure — without leaving MiMo, without external tooling. Bible Part 21 (Trust/Explainability) + Part 22.9 (Audit Logs Invariant) + Part 24 (Error/Recovery) are authoritative.

---

## 1. Two observability surfaces

MiMo has TWO distinct observability audiences:

| Surface | Audience | Default state | Includes |
|---|---|---|---|
| **User-facing trust/explainability** | The owner (always visible) | ON by default | Citations, ExecutionTrace, decision explainer, inline errors, provenance |
| **Developer-facing diagnostics** | The owner (when `devMode` is on) | OFF by default (`⌘⇧D`) | Structured logs, metrics, traces, audit log, registry state, network requests, sandbox events |

Bible Part 28 (Always Visible / Conditional / Hidden) distinguishes these. The developer surface is **conditional** — only when devMode is on. The user-facing surface is **always visible** (Bible Part 21 — trust is architectural).

**Invariant OBS-1.** No developer-only artifact (logs, metrics, traces) is needed to explain a user-facing failure. The user-facing explainability layer MUST stand on its own. (Bible Invariant 33 — one explainability layer.)

---

## 2. Observability pillars

Five pillars, no overlap with each other:

| Pillar | What | Where stored | Retention |
|---|---|---|---|
| Logs | Structured text events | `mimo-data/logs/*.log` (rotated) + console (dev) | 30 days local; never sent externally |
| Metrics | Numeric time-series (counters, gauges, histograms) | `metric` table in SQLite | 90 days (down-sampled to hourly after 7 days) |
| Traces | Causal spans (model call → tool call → sub-agent call) | `trace_span` table in SQLite | 30 days |
| Execution Events | Lifecycle events (ExecutionTrace + AgentDock) | `event` table (was EventBus — now persisted) | 30 days |
| Audit Log | Security-relevant actions (append-only) | `audit_event` table | Forever (Bible Part 22.9 — never deleted) |

[FACT] Audit §3.2: EventBus is in-memory `Map<string, Set<EventHandler>>`. Not persisted. [FACT] Audit §9.5: "No audit log. EventBus emits events but they're not persisted."

**Invariant OBS-2.** The audit log (pillar 5) is the only **append-only, never-deleted** store. The other four rotate. This separation is intentional — the audit log is for security accountability; the others are for diagnostics.

---

## 3. Logs

### 3.1 Structured logger

[CURRENT] Audit confirms `core/logger.ts` exists (`createLogger`). It logs to console. [TARGET] Extend to:
- Console (dev only, colorized).
- File (`mimo-data/logs/mimo-YYYY-MM-DD.log`, rotated daily, gzip-compressed after 7 days).
- NOT network (Bible Part 22.14 — no telemetry).

### 3.2 Log entry shape

```ts
type LogEntry = {
  ts: number;
  level: 'debug' | 'info' | 'warn' | 'error';
  logger: string;         // e.g., 'core.orchestrator', 'runtime.gateway', 'plugin.github-issues'
  message: string;
  data?: Record<string, unknown>;   // structured, JSON-serializable
  requestId?: string;     // correlation ID across the pipeline
  agentId?: string;
  projectId?: string;
  traceId?: string;       // cross-ref to trace_span table
};
```

### 3.3 PII scrubbing

[PRODUCT DECISION] Logs NEVER contain:
- Conversation content (only message IDs).
- Memory content (only memory IDs).
- Artifact content (only artifact IDs + versions).
- Secret values (only key names).
- File contents (only paths).

A scrubber middleware intercepts every `log.info(data)` call and redacts any field whose value matches secret patterns (sk-*, AKIA*, ghp_*) or whose key name matches (`password`, `token`, `secret`, `apiKey`).

### 3.4 Log levels + use

| Level | When |
|---|---|
| `debug` | Verbose pipeline detail (devMode only) |
| `info` | Normal lifecycle (kernel boot, agent started, conversation created) |
| `warn` | Degraded behavior (retry triggered, fallback invoked, resource warning) |
| `error` | Failures (tool failed, model errored, sandbox killed) |

Errors are also surfaced inline to the owner (Bible Part 24.2) — the log is the developer's record; the inline card is the owner's record.

---

## 4. Metrics

### 4.1 Three metric types

| Type | Example | Storage |
|---|---|---|
| Counter | `chat.messages.sent`, `tool.invocations.total{tool=web_search}`, `audit.events.emitted` | `metric_counter` table |
| Gauge | `runtime.active_executions`, `sync.queue_depth`, `indexer.lag_ms` | `metric_gauge` table |
| Histogram | `model.latency_ms{provider=zai,model=glm-4.6}`, `tool.duration_ms{tool=file_read}` | `metric_histogram` table (bucketed) |

### 4.2 Schema

```sql
CREATE TABLE metric_counter (
  ts INTEGER NOT NULL,
  name TEXT NOT NULL,
  labels TEXT,             -- JSON
  value INTEGER NOT NULL,
  PRIMARY KEY (ts, name, labels)
);

CREATE TABLE metric_gauge (
  ts INTEGER NOT NULL,
  name TEXT NOT NULL,
  labels TEXT,
  value REAL NOT NULL
);

CREATE TABLE metric_histogram (
  ts INTEGER NOT NULL,
  name TEXT NOT NULL,
  labels TEXT,
  bucket TEXT NOT NULL,   -- e.g., "0-10ms", "10-50ms", ...
  count INTEGER NOT NULL
);
```

### 4.3 Use cases

- DeveloperPanel → Metrics tab: live charts (recharts — already in stack, Audit §1.1).
- Anomaly detection (offline): if `tool.error_rate` > 5% in 5 min, surface warning.
- Performance budget (Bible Part 20.2): if `chat.first_token_ms` p95 > 1000ms, surface warning.

### 4.4 No telemetry (Bible Part 22.14)

[PRODUCT INVARIANT] Metrics NEVER leave the machine. No Prometheus, no Datadog, no remote aggregator. The owner can export metrics as JSON (Settings → Export → Metrics) but they are not auto-exported.

---

## 5. Traces

### 5.1 What a trace is

A trace is a **causal tree of spans** representing one pipeline execution (one conversation turn, one agent task, one tool invocation chain).

```ts
type TraceSpan = {
  spanId: string;          // "spn_<ulid>"
  parentId: string | null;  // null = root
  traceId: string;         // shared across the tree
  name: string;            // e.g., "pipeline.context.build", "agent.researcher.web_search"
  kind: 'pipeline' | 'agent' | 'tool' | 'model' | 'sandbox' | 'plugin' | 'execution';
  startedAt: number;
  endedAt: number | null;  // null = still in flight
  durationMs: number | null;
  status: 'running' | 'ok' | 'error' | 'cancelled';
  attributes: Record<string, unknown>;   // typed per `kind`
  events: TraceEvent[];    // child events within the span
};

type TraceEvent = {
  ts: number;
  name: string;            // e.g., "memory.recall.hit", "model.token.streamed"
  attributes?: Record<string, unknown>;
};
```

### 5.2 Span kinds

| Kind | When emitted |
|---|---|
| `pipeline` | One conversation turn through Context → Reason → Plan → Execute → Validate → Done |
| `agent` | One agent invocation (e.g., Researcher web-search loop) |
| `tool` | One tool invocation (e.g., `web_search`, `memory_recall`) |
| `model` | One model call (e.g., ZAI generate, Ollama stream) |
| `sandbox` | One `ExecutionRequest` through RuntimeGateway |
| `plugin` | One plugin capability invocation |
| `execution` | One artifact runtime execution |

### 5.3 Per-kind attributes

Each span kind has a typed attribute schema. Examples:

```ts
// pipeline span
{ conversationId: string, turnId: string, projectId: string, mode: string }

// agent span
{ agentId: string, modelId: string, scope: string, parentAgentId?: string }

// tool span
{ toolId: string, inputHash: string, outputHash: string, durationMs: number }

// model span
{ providerId: string, modelId: string, promptTokens: number, completionTokens: number, latencyMs: number, egressClasses: string[] }

// sandbox span
{ executionId: string, sandboxClass: 'c1'|'c2'|'c3'|'c4'|'c5', permissionBag: PermissionBag, exitCode: number, killedReason?: string }
```

### 5.4 Storage

```sql
CREATE TABLE trace_span (
  spanId TEXT PRIMARY KEY,
  parentId TEXT,
  traceId TEXT NOT NULL,
  name TEXT NOT NULL,
  kind TEXT NOT NULL,
  startedAt INTEGER NOT NULL,
  endedAt INTEGER,
  durationMs INTEGER,
  status TEXT NOT NULL,
  attributes TEXT,    -- JSON
  events TEXT          -- JSON array
);

CREATE INDEX idx_trace_id ON trace_span(traceId);
CREATE INDEX idx_span_status ON trace_span(status, startedAt);
```

### 5.5 Trace UI

- DeveloperPanel → Traces tab: list of recent traces; click to see waterfall (Gantt-style span tree).
- Click a span to see attributes + events.
- Filter by kind, status, agent, tool.
- "Replay" button (devMode only, Bible Part 24.7 — Time-Travel Debugging): re-runs the pipeline with the same inputs (if deterministic; model calls are NOT replayable, only the non-model stages).

### 5.6 Connection to ExecutionTrace (user-facing)

The user-facing ExecutionTrace (Bible Part 10.2) is a **subset view** of the `pipeline` span. It shows:
- Stage stepper (Context → Reason → Plan → Execute → Validate → Done).
- Real motion per stage.
- The error inline if any stage errored.

The full span (with all child agent / tool / model / sandbox spans) is in the DeveloperPanel. The user-facing ExecutionTrace MUST be derivable from the persisted `pipeline` span — single source of truth.

**Invariant OBS-3.** ExecutionTrace UI state is derived from the trace, not maintained separately. (Bible Invariant 35 — one model per dimension.)

---

## 6. Execution Events (the persisted EventBus)

### 6.1 From in-memory to persisted

[CURRENT] Audit §3.2 + §9.5: EventBus is in-memory `Map<string, Set<EventHandler>>`. Not persisted. No audit trail.

[TARGET] EventBus gains a **persisted event log**:

```sql
CREATE TABLE event (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  type TEXT NOT NULL,         -- e.g., 'agent.started', 'message.sent'
  payload TEXT NOT NULL,     -- JSON
  traceId TEXT,
  requestId TEXT
);

CREATE INDEX idx_event_ts ON event(ts);
CREATE INDEX idx_event_type ON event(type);
```

The EventBus API stays the same (`emit(type, payload)`, `on(type, handler)`). Internally, every `emit` writes a row to `event` AND notifies in-memory subscribers.

### 6.2 EventBus vs Audit Log — the distinction

| EventBus (`event` table) | Audit Log (`audit_event` table) |
|---|---|
| All lifecycle events | Security-relevant events only |
| 30-day retention | Forever (append-only) |
| For ExecutionTrace + DeveloperPanel | For security accountability |
| Example: `message.streaming.started` | Example: `permission.escalation` |

Some events appear in both (e.g., `tool.invoked` is in EventBus for the live ExecutionTrace; the security-relevant subset is duplicated to `audit_event`). [INFERENCE — small duplication cost; clarity benefit.]

### 6.3 Event types (catalogue)

| Category | Examples |
|---|---|
| Pipeline | `pipeline.started`, `pipeline.context.built`, `pipeline.reason.completed`, `pipeline.plan.built`, `pipeline.execute.started`, `pipeline.validate.completed`, `pipeline.done` |
| Agent | `agent.started`, `agent.delegate`, `agent.completed`, `agent.failed`, `agent.paused`, `agent.resumed` |
| Tool | `tool.invoked`, `tool.result`, `tool.error` |
| Model | `model.call.started`, `model.token.streamed`, `model.call.completed`, `model.call.failed` |
| Memory | `memory.created`, `memory.updated`, `memory.consolidated`, `memory.decayed` |
| Knowledge | `entity.created`, `entity.edge.added`, `entity.consolidated` |
| Artifact | `artifact.created`, `artifact.version.added`, `artifact.run.started`, `artifact.run.completed`, `artifact.shared` |
| Search | `search.query`, `search.index.lag` |
| Sandbox | `execution.requested`, `execution.started`, `execution.completed`, `execution.failed`, `execution.cancelled`, `security.forbidden_path_requested`, `security.ssrf_blocked` |
| Plugin | `plugin.installed`, `plugin.invoked`, `plugin.disabled`, `plugin.uninstalled` |
| Sync | `sync.queue.added`, `sync.applied`, `sync.failed`, `sync.conflict` |
| System | `kernel.booted`, `kernel.shutdown`, `provider.enabled`, `provider.disabled` |

Every event is typed in `core/types.ts` and validated at emit time.

---

## 7. Error classification (Bible Part 24.1)

### 7.1 Taxonomy (Bible Part 24.1, expanded)

| Error type | Cause | Display | Recovery |
|---|---|---|---|
| `Network` | No connection / timeout | Inline error card | Retry button |
| `Model` | Model returned error / timeout | Inline error card | Retry / switch model |
| `Tool` | Tool execution failed | Inline in ExecutionTrace | Continue without / retry |
| `Agent` | Agent crashed / looped | Inline in AgentDock | Retry / abort |
| `Validation` | Validator rejected output | Inline in conversation | Fix + retry |
| `Data` | Corrupt data / missing file | Inline error card | Restore from backup |
| `Permission` | Action not allowed | Inline error card | Request permission / change scope |
| `Quota` | External API quota exhausted | Inline error card | Switch model |
| `Sandbox` | Sandbox killed (resource, timeout, escape attempt) | Inline in ExecutionTrace | Adjust limits / retry / abort |
| `Plugin` | Plugin errored | Inline error card | Disable plugin / retry |
| `Crash` | App crash | Recovery screen | Restore last state |

Every error is classified at the point of detection. The classification determines the recovery options surfaced to the owner.

### 7.2 Error envelope

```ts
type MiMoError = {
  type: ErrorType;             // one of the 11 above
  code: string;                // machine-readable, e.g., 'MODEL_TIMEOUT'
  message: string;             // human-readable
  detail?: unknown;            // structured diagnostic (redacted of secrets)
  retryable: boolean;
  recoveryActions: RecoveryAction[];
  traceId: string;             // links to the trace span where it occurred
  spanId: string;
  ts: number;
};

type RecoveryAction =
  | { kind: 'retry' }
  | { kind: 'switch-model'; modelId: string }
  | { kind: 'continue-without' }
  | { kind: 'request-permission'; scope: string }
  | { kind: 'restore-backup' }
  | { kind: 'disable-plugin'; pluginId: string }
  | { kind: 'edit-state'; statePath: string };
```

[CURRENT] Audit confirms `core/errors.ts` exists with a MiMoError hierarchy. [TARGET] Extend with `recoveryActions` + `traceId` + `spanId`.

### 7.3 No silent failures (Bible Part 24.2)

Every error — even retried-and-recovered ones — emits:
- A `warn`-level log entry.
- An event in the `event` table.
- A span status update to `error` then `ok` (on retry).

The owner sees recovered errors in DeveloperPanel → Events (filter `level >= warn`). The user-facing UI does NOT show recovered errors unless they recur ≥ 3 times in 5 minutes (then: inline banner, not modal).

---

## 8. Retries + recovery + rollback

### 8.1 Retry policy (Bible Part 23.7 + Part 24.4)

| Trigger | Policy |
|---|---|
| Network error (transient) | Retry with backoff: 1s, 2s, 4s (max 3). |
| Model 5xx / timeout | Retry with backoff (max 3). |
| Model 4xx (auth/quota) | No retry. Surface immediately. |
| Tool failure (transient) | Retry once. |
| Sandbox timeout | No retry. Adjust limits + retry. |
| Plugin error | No auto-retry. Surface to owner. |

Every retry is a child span of the original (so the trace shows the retry tree).

### 8.2 Recovery (Bible Part 24.4)

Recovery actions surfaced to the owner per error type — see §7.1.

### 8.3 Rollback (Bible Part 9.4 + Part 11.9)

- Per-hunk accept/reject for code artifacts (Artifact Arch §6.3) — primary rollback primitive.
- Aider auto-commit pattern: every artifact edit is a version; rollback restores a prior version as a new HEAD.
- Conversation rewind (`Esc Esc` — Bible Part 24.5): removes the last agent action; conversation state restored from snapshot.
- Project rollback: Aider pattern — every agent edit is a git commit if the project is a git repo; rollback is `git revert`.

Snapshots are stored in `mimo-data/snapshots/<requestId>/` (Runtime Arch §11.3). Retention: 7 days (configurable).

---

## 9. Diagnostics (devMode only)

### 9.1 DeveloperPanel tabs (Bible Part 8.11)

[TARGET] DeveloperPanel — the existing component (Audit §1.3) — exposes:

| Tab | Content |
|---|---|
| Events | Live event stream (from `event` table) + filter by type / agent / trace |
| Traces | Recent traces; click for waterfall |
| Metrics | Live charts (counters, gauges, histograms) |
| Registry | Agent registry, Tool registry, Plugin registry, Model registry state |
| Network | Outbound requests (URL, bytes, status) — last 100 |
| Audit | Audit log (append-only) — filter by event type / actor |
| Sandbox | Active + recent sandbox executions; click for output + resource usage |
| Snapshots | Snapshot list + rollback UI (per request) |

### 9.2 Live runtime pane (Bible Part 10.6)

[TARGET] When devMode is on, a "Computer" pane (Manus pattern — Bible Part 10.6 footnote) shows:
- Actual browser screenshots (for C5 runtime).
- Actual terminal output (for C3/C4 runtime).
- Actual file diffs per stage.

Visible only when devMode on. When off, inline ExecutionTrace suffices.

### 9.3 Time-travel debugging (Bible Part 24.7)

[TARGET] Owner can:
- Step back through the pipeline (via the `pipeline` span tree).
- Inspect any past state (input, output, intermediate).
- Replay from any node (with caveats: model calls are NOT replayable — they get re-invoked with the same prompt, which may produce different output; the trace annotates these as "non-deterministic replay").

### 9.4 Hallucination-guard (Bible Part 27.16)

Every agent output marks speculative/uncertain content with a `check` annotation. In the trace, these are surfaced as `model.token.speculative` events. DeveloperPanel highlights them in the model span view.

---

## 10. User-facing observability (Bible Part 21 — Trust/Explainability)

### 10.1 Trust is architectural (Bible Part 21.1)

[PRODUCT INVARIANT] The owner does NOT need devMode to trust MiMo. The user-facing surface provides:

- **Citations** (Bible Part 6.11): every claim with external knowledge cites source.
- **ExecutionTrace inline** (Bible Part 10.2): the owner feels the AI thinking.
- **Decision explainer** (Bible Part 21.4): "Why did MiMo do X?" → answers with the pipeline stages + plan + tool calls.
- **Provenance** (Bible Part 11.6): every artifact shows where it came from.
- **Inline errors** (Bible Part 24.2): every failure is inline + actionable + explainable.
- **Hallucination-guard** (Bible Part 27.16): speculative content is marked.

### 10.2 Decision explainer

```ts
type DecisionExplanation = {
  action: string;            // "ran web_search for 'best practices for X'"
  reason: string;            // "you asked about best practices; the planner classified this as a research task"
  traceId: string;           // links to the pipeline span
  stages: StageExplanation[];  // per-stage summary
  citations?: Citation[];    // sources used
  uncertainties?: Uncertainty[]; // speculative content marked
};
```

The owner can click any agent action → see the DecisionExplanation. No devMode required.

### 10.3 One explainability layer (Bible Invariant 33)

The user-facing decision explainer + the developer-facing trace are **the same data, two views**. The developer view has more detail (raw spans, network requests, sandbox state); the user view has the curated subset. Single source of truth: the `trace_span` table.

---

## 11. Performance impact

### 11.1 Overhead budget

| Pillar | Target overhead |
|---|---|
| Logging | < 1% CPU (async file write, batched) |
| Metrics | < 0.5% CPU (in-memory aggregation, flush every 5s) |
| Traces | < 2% CPU (span creation + JSON serialization) |
| Events | < 1% CPU (SQLite insert, batched in a queue) |
| Audit | < 0.5% CPU (low write rate — security events only) |

Total budget: < 5% CPU, < 50 MB additional memory, < 5% disk growth per day.

### 11.2 Sampling

In normal operation, ALL events are recorded (Bible Part 22.9 — audit log is exhaustive). For high-volume non-audit events (e.g., `model.token.streamed`), only the boundaries are recorded (start/end + count), not every token. [INFERENCE — keeps the event table small.]

In devMode, the owner can enable full token-level events for a single conversation (developer toggle).

### 11.3 Storage growth

Estimated per active day (8 hours of use):
- Logs: 5 MB (rotated, gzip after 7 days → 1 MB/day retained).
- Metrics: 2 MB (down-sampled after 7 days → 0.2 MB/day retained).
- Traces: 10 MB (purged after 30 days).
- Events: 5 MB (purged after 30 days).
- Audit: 1 MB (kept forever).

Total retained (steady state): ~50 MB per month. SQLite handles this fine.

---

## 12. [CURRENT] vs [TARGET] vs [MIGRATION]

### 12.1 [CURRENT]

[FACT — Audit §3.2, §9.5, §1.4]:
- `createLogger` (structured logs to console only).
- EventBus (in-memory `Map`, NOT persisted).
- DeveloperPanel consumes EventBus live.
- No traces. No metrics. No error classification beyond `MiMoError` hierarchy. No persisted event log. No audit log. No decision explainer.

### 12.2 [TARGET]

- Structured logger → file + console, PII-scrubbed.
- `event` table (persisted EventBus, 30-day retention).
- `trace_span` table (causal span tree, 30-day retention).
- `metric_counter` / `metric_gauge` / `metric_histogram` tables (90-day retention).
- `audit_event` table (append-only, forever).
- 11-type error classification with `recoveryActions`.
- DeveloperPanel with 8 tabs (Events, Traces, Metrics, Registry, Network, Audit, Sandbox, Snapshots).
- Live runtime pane (devMode only).
- Time-travel debugging (devMode only).
- User-facing decision explainer (no devMode required).

### 12.3 [MIGRATION]

| Phase | What | Depends on |
|---|---|---|
| O-1 | Extend `createLogger` to write to file (`mimo-data/logs/`) with rotation + PII scrubbing. | — |
| O-2 | Add `event` table; EventBus `emit` writes to it AND notifies subscribers. | Persistence (Prisma domain) |
| O-3 | Add `MiMoError` extensions (`recoveryActions`, `traceId`, `spanId`). | — |
| O-4 | Add 11-type error taxonomy to `core/errors.ts`. | O-3 |
| O-5 | Add `trace_span` table + span creation in pipeline stages. | O-2 |
| O-6 | Add span creation in agent / tool / model / sandbox / plugin code paths. | O-5 |
| O-7 | Add metric counter + gauge + histogram tables + emit calls. | O-2 |
| O-8 | Add `audit_event` table + append-only enforcement. | Security Arch SEC-8 |
| O-9 | Add DeveloperPanel → Events tab (live from `event` table). | O-2 |
| O-10 | Add DeveloperPanel → Traces tab (waterfall UI). | O-5 |
| O-11 | Add DeveloperPanel → Metrics tab (recharts). | O-7 |
| O-12 | Add DeveloperPanel → Audit tab. | O-8 |
| O-13 | Add DeveloperPanel → Sandbox + Snapshots tabs. | Runtime Arch M4 |
| O-14 | Add DeveloperPanel → Network tab (last 100 requests). | Runtime Arch M5 |
| O-15 | Add user-facing DecisionExplainer UI (click any agent action → see explanation). | O-5 |
| O-16 | Add time-travel debugging (devMode). | O-5 |
| O-17 | Add live runtime pane (devMode). | Runtime Arch M6 |
| O-18 | Add rollback UI (snapshots list, revert button). | Runtime Arch M11 |

O-1 through O-9 are required for v1 (without them, "no silent failures" — Bible Invariant 8 — is unenforceable). O-10+ ship progressively.

---

## 13. Open questions / [UNKNOWN]

| # | Unknown | Resolution |
|---|---|---|
| 1 | Is recharts performant for live metric charts (60 Hz updates)? | No — throttle to 1 Hz for live view; 60 Hz is too fast for the human eye. [INFERENCE] |
| 2 | SQLite write contention between EventBus inserts and reads? | WAL mode + separate read connections in the UI; inserts batched every 100ms. [INFERENCE] |
| 3 | How to display very large traces (1000+ spans) without UI jank? | Virtualize the trace tree; collapse non-error branches by default; expand on click. [INFERENCE] |
| 4 | Should the owner be able to delete the audit log? | NO (Bible Part 22.9 — append-only, never deleted). "Delete everything" (Bible Part 22.11) wipes the whole DB; audit log goes with it. |
| 5 | Trace replay for non-deterministic model calls — how to indicate? | Annotate the replayed span with `replay: true` + `non_deterministic: true` + diff from original output if available. [INFERENCE] |
| 6 | What's the right metric for "MiMo is healthy"? | Composite: `pipeline.error_rate < 1%`, `model.latency_ms p95 < 2000ms`, `sync.queue_depth < 100`, `indexer.lag_ms < 1000ms`. [INFERENCE] |

---

## 14. Invariants (this document)

- **OBS-1.** User-facing explainability stands on its own; does not require devMode.
- **OBS-2.** The audit log is the only append-only, never-deleted store. Others rotate.
- **OBS-3.** ExecutionTrace UI state is derived from the trace, not maintained separately.
- **OBS-4.** Logs NEVER contain conversation content, memory content, artifact content, or secret values.
- **OBS-5.** Every error is classified, has `recoveryActions`, and links to its trace span.
- **OBS-6.** No telemetry. No metric, log, trace, or audit event leaves the machine.
- **OBS-7.** Total observability overhead < 5% CPU, < 50 MB additional memory.
- **OBS-8.** One span tree per pipeline execution; all child spans (agent, tool, model, sandbox, plugin) link to it.
- **OBS-9.** EventBus is persisted; the in-memory notify is a complement, not a replacement.
- **OBS-10.** Time-travel debugging is devMode-only (Bible Part 24.7).

---

**End of MiMo Observability Architecture.**

---

## Summary of all 7 ARCH-C documents

| # | Document | Core invariant count | Key choice |
|---|---|---|---|
| 1 | Runtime Architecture | R-1..R-8 | Tiered runtime (5 classes); gVisor/WebContainer/VM rejected; process isolation + OS seatbelt default |
| 2 | Artifact Architecture | A-1..A-9 | 12 types; per-hunk accept for code only; first-class versioned with provenance |
| 3 | Search Architecture | S-1..S-8 | ONE search, 8 facets; FTS5 + vector + graph in local SQLite; < 80ms |
| 4 | Security Architecture | SEC-1..SEC-10 | SQLCipher + OS keychain + RuntimeGateway; explicit NEVER-LEAVE list; no multi-user auth |
| 5 | Offline/Online Architecture | OFF-1..OFF-8 | Local DB is source of truth; cloud is downstream replica; no destructive behavior on network failure |
| 6 | Plugin Architecture | P-1..P-10 | 4 capability kinds; personal registry (no marketplace); plugins behind RuntimeGateway |
| 7 | Observability Architecture | OBS-1..OBS-10 | 5 pillars (logs, metrics, traces, events, audit); audit append-only forever; user-facing explainability stands alone |

All 7 documents distinguish [CURRENT] / [TARGET] / [MIGRATION], label every claim, reference specific Bible parts, and define explicit invariants. No magic. No speculative futures beyond the Bible's stated v2 aspirations (which are explicitly out of scope for v1).
