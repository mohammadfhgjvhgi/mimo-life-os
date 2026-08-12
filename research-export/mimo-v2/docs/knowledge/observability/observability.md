# Observability — Logs, Metrics, Traces, Cost

**Category:** Observability
**Status:** CORE
**Maturity:** Mature (logs/metrics/traces decades-mature; LLM-specific observability emerging but production-grade tools exist)

## Definition
**Observability** for an autonomous AI agent system is the discipline of instrumenting every layer so that the system's behavior is **transparent, debuggable, accountable, and cost-controlled**. It spans:
- **Structured logs**: discrete events with context.
- **Metrics**: aggregate numeric measurements (counts, latencies, error rates, token usage, cost).
- **Distributed traces**: hierarchical spans following a request/task through every layer (user → API → executive → planner → agent → tool → model → response).
- **Cost tracking**: per-model-call token + dollar cost; per-task rollup; per-user rollup.
- **Latency tracking**: per-span timings; bottleneck identification.
- **Error tracking**: classification, count, root-cause hints.
- **Audit trails**: see `observability/audit_trails.md`.

The MiMo observability stack draws on OpenTelemetry conventions, adapted for LLM-agent semantics (LLM spans, tool spans, agent spans, retrieval spans).

## Problem Solved
Without observability, an autonomous agent is a black box: you can't see *why* it failed, *which* tool call was slow, *how much* a task cost, *which* model call dominated token usage, *where* a hallucination originated. For a long-horizon agent that runs for hours, you cannot debug or trust it without granular, structured, replayable traces. Observability is also a security/compliance prerequisite (audit) and a cost-control prerequisite (budget enforcement requires measurement).

## Why It Matters
MiMo AI's layered runtime has 15 layers and many cross-cutting concerns. Every task touches model, context, memory, knowledge, tools, execution, verification. Observability:
- Lets the developer debug failures ("why did the browser agent loop?").
- Lets the user see what MiMo is doing in real time (live dashboard).
- Lets the operator track cost and enforce budgets.
- Lets the auditor reconstruct what happened (compliance, incident response).
- Lets the evaluation layer correlate outcomes with traces (regression analysis).

## How It Works
### Three pillars + LLM-specific additions
1. **Logs**: structured JSON events (`{timestamp, level, trace_id, span_id, event, ...fields}`). Emitted by every layer. Use a structured logger (pino for Node) — never `console.log` in production.
2. **Metrics**: counters (`tool_calls_total`), histograms (`llm_call_duration_seconds`), gauges (`active_tasks`). Aggregated by a metrics backend (Prometheus-style or SQLite-aggregated for v1 simplicity).
3. **Traces**: OpenTelemetry-style spans. A trace = one task; spans = each step (executive decide, planner plan, agent act, tool call, model call, retrieval, verify). Spans carry attributes (model name, token count, cost, tool name, exit code).
4. **LLM-specific**:
   - Per-call: model, prompt_tokens, completion_tokens, cost, latency, temperature, finish_reason, tool_calls_requested.
   - Per-task: total tokens, total cost, span count, model calls, tool calls, retries, errors, duration, status.
   - Per-user: rollups over time windows.
5. **Cost tracking**: each model call's cost computed from `tokens × per-token-price` (model-specific pricing table maintained in DB); rolled up per task, per user, per day. Budget enforcement gates use the same numbers.
6. **Latency tracking**: span durations; p50/p95/p99 per span type; identify bottlenecks (often LLM calls or browser steps).
7. **Error tracking**: errors classified (model_error, tool_error, timeout, policy_deny, verification_fail, recovery_fail, escalation). Count + sample trace per class.

### Trace structure (example)
```
trace_id: task_abc
├─ span: executive.decide (12ms)
├─ span: planner.plan (450ms, model=GLM-5.2, tokens=1200, cost=$0.012)
│   ├─ span: memory.recall (35ms)
│   └─ span: knowledge.retrieve (180ms, retriever=hybrid, hits=5)
├─ span: agent.execute (8500ms)
│   ├─ span: tool.browser.navigate (1500ms, url=...)
│   ├─ span: tool.browser.click (800ms, locator=...)
│   ├─ span: llm.call (2200ms, model=GLM-5.2, tokens=800, cost=$0.008)
│   └─ span: tool.browser.screenshot (300ms)
├─ span: verifier.check (1100ms, model=GLM-5.2, tokens=500, cost=$0.005, result=PASS)
└─ span: response (50ms)
total: 10212ms, tokens=2500, cost=$0.025
```

## Architecture
```
   Every layer (1-15) emits logs/metrics/traces
        │
        ▼
   ┌──────────────────────────────────────┐
   │ OTel SDK (Node) — in-process         │
   │  - span creation/attr                │
   │  - log structuring                   │
   │  - metric increment                  │
   └────────────┬─────────────────────────┘
                │
        ┌───────┼────────┐
        ▼       ▼        ▼
   Logs    Metrics    Traces
   (pino →  (Prom-    (OTel collector
    file/    style     → SQLite / Jaeger
    SQLite)  SQLite)   / Grafana Tempo)
                │
                ▼
   ┌──────────────────────────────────────┐
   │ Cost Tracker (per model call)        │
   │  + per-task / per-user rollup        │
   └────────────┬─────────────────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │ Dashboard UI (Next.js)               │
   │  - live task view (socket.io)        │
   │  - trace waterfall                   │
   │  - cost / latency / error charts     │
   └──────────────────────────────────────┘
```

## Interfaces
- **OTel SDK** (Node): `tracer.startSpan(name, attrs)`, `span.setAttribute(k, v)`, `span.end()`.
- **Logger** (pino): `log.info({trace_id, span_id, ...fields}, message)`.
- **Metrics**: `metrics.counter('tool_calls_total').inc({tool: 'browser'})`.
- **CostTracker**: `record({model, prompt_tokens, completion_tokens})` → computes cost via pricing table; `getTaskCost(taskId)`, `getUserCost(userId, window)`.
- **Query API** for dashboard: `getTrace(traceId)`, `searchTraces(filter)`, `getMetrics(window)`.

## Dependencies
- **OpenTelemetry SDK** for Node (`@opentelemetry/sdk-node`, `@opentelemetry/auto-instrumentations`) — production-grade.
- **pino** for structured logging (fastest Node logger).
- Metrics backend: v1 — SQLite aggregate tables; v2 — Prometheus + Grafana.
- Trace backend: v1 — SQLite `Span` table; v2 — Jaeger / Tempo / Honeycomb / Langfuse.
- **Langfuse** (open-source, OSS) — LLM-native observability; can be self-hosted; strong fit for MiMo's agent semantics.
- **Helicone** — managed LLM observability proxy (alternative).
- Pricing table: maintained in DB; updated when providers change pricing.

## Strengths
- OpenTelemetry is the industry standard; portable across backends.
- LLM-native tools (Langfuse, Helicone) understand tokens/cost/agents out of the box.
- Per-task cost rollup enables budget enforcement (PolicyEngine reads cost-so-far).
- Traces make debugging long-horizon tasks tractable.
- Live dashboard (socket.io) gives user transparency and trust.
- Foundation for evaluation (correlate outcomes with traces).

## Weaknesses
- **Volume**: a complex task can emit thousands of spans + log lines; storage cost.
- **Sampling**: must sample (keep all errors; sample successes) to control volume.
- **Privacy**: traces may contain user data / secrets — must redact.
- **Latency overhead**: OTel SDK adds 1-5% overhead; acceptable.
- **Correlation across services**: requires propagating `trace_id`/`span_id` through every boundary (HTTP, socket.io, MCP).
- **Pricing drift**: provider pricing changes; stale table = wrong cost numbers.
- **Backend complexity**: full OTel stack (collector + Jaeger + Prometheus + Grafana) is heavy; v1 should prefer SQLite-based simplicity.

## Failure Modes
- **Missing instrumentation**: a layer doesn't emit spans → blind spot. Mitigation: architectural enforcement (every layer wraps work in spans); lint.
- **Secret in log** (model input/output dumped to log). Mitigation: log redaction; never log raw model inputs/outputs in production; log metadata + hashes.
- **Trace too large** to display. Mitigation: sampling; UI pagination; collapse low-value spans.
- **Cost table stale**. Mitigation: pricing-updater job; alert on stale entries.
- **Backend down** → observability lost. Mitigation: queue locally (file) + retry; degrade gracefully.
- **Trace ID lost** across boundary (e.g. MCP call doesn't propagate). Mitigation: OTel context propagation everywhere; tests.
- **Metric cardinality explosion** (per-user/per-URL labels). Mitigation: bucket / hash high-cardinality labels.

## Security Implications
- **Logs/traces may contain PII or secrets**: mandatory redaction pipeline; structured logger masks known patterns; never dump raw model inputs/outputs.
- **Access control**: traces/logs are sensitive; only admin/owner can view; per-user isolation.
- **Tamper-evidence**: for audit-grade traces, see `observability/audit_trails.md` (append-only + hash-chained).
- **Cost**: observability itself has cost (storage, backend); budget for it.
- **Backend isolation**: observability backends (Langfuse/Jaeger) are internal-only; not exposed to internet; mTLS where possible.

## Performance Implications
- OTel SDK overhead: 1-5% per request; acceptable.
- Async log shipping (don't block request path).
- Span attribute size: keep small; large attributes (full prompts) → store by reference, not value.
- Metrics: aggregate in-process; flush periodically.
- Sampling: keep 100% of errors + slow spans; sample 10-50% of fast successes.

## Operational Implications
- Need an **OTel collector** (or SQLite-based v1) ingesting spans.
- Need a **pricing table** maintained in DB; updater job.
- Need a **dashboard UI**: live task view (socket.io), trace waterfall, cost/latency/error charts.
- Need **retention policy**: traces 30 days hot, 90 days cold; logs 7-30 days; metrics 1 year aggregates.
- Need **alerting**: error rate spike, cost spike, latency spike, trace-volume anomaly.
- Need **sampling policy**: documented; tunable.
- Need **redaction pipeline** for logs/traces.
- Need **backup** for observability data (or accept loss for non-audit data).

## Alternatives
- **Langfuse** (OSS, self-hosted): LLM-native; tokens, cost, agent traces; strong fit for v1/v2.
- **Helicone** (managed): proxy in front of model API; auto-captures; easy.
- **Honeycomb / Datadog / New Relic**: general-purpose; expensive; works but not LLM-native.
- **Jaeger / Tempo**: trace-only; pair with Prometheus for metrics.
- **Prometheus + Grafana**: metrics-only; pair with OTel for traces.
- **Custom SQLite-based**: simplest for v1; works for single-user scale.

## Maturity & Production Readiness
- OpenTelemetry: production-grade, industry standard.
- pino: production-grade.
- Langfuse: production-grade OSS, widely adopted for LLM apps.
- Helicone: production-grade managed.
- All viable for MiMo.

## Relevant Research / Papers
- OpenTelemetry Specification (CNCF).
- "Google SRE Book" — observability chapters (canonical).
- "Observability Engineering" (Majors, Fong-Jones, Miranda, 2020).
- Langfuse documentation (LLM-specific patterns).
- "Tracing in Distributed Systems" (literature survey).

## Official Documentation
- OpenTelemetry: https://opentelemetry.io
- pino: https://github.com/pinojs/pino
- Langfuse: https://langfuse.com
- Helicone: https://helicone.ai
- Jaeger: https://www.jaegertracing.io
- Prometheus: https://prometheus.io
- Grafana: https://grafana.com

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: instrumentation runs server-side; UI consumes via API + socket.io.
- v1: OpenTelemetry SDK + pino + SQLite-backed span/metric/log tables + custom cost tracker + custom dashboard. Simplest viable.
- v2: migrate to Langfuse (self-hosted OSS) for LLM-native observability, or to OTel collector + Jaeger + Prometheus + Grafana for full stack.
- Schema (Prisma): `Trace`, `Span`, `LogEvent`, `Metric` (aggregate), `ModelCall` (cost detail), `Pricing` (model pricing table).
- Every layer wraps work in spans: `withSpan(name, attrs, fn)`.
- Cost tracker: on every model call, record `(model, prompt_tokens, completion_tokens, latency, cost)`; pricing table consulted; per-task + per-user rollups materialized periodically.
- Live dashboard: socket.io emits `task:span_start`, `task:span_end`, `task:cost_update` events; UI shows live trace waterfall.
- Redaction: logger masks known secret patterns; spans never include raw model inputs/outputs (only metadata + content hash).
- Retention: traces 30d hot / 90d cold; logs 30d; metrics 1y aggregates.
- Sampling: keep 100% errors + slow spans; 10-50% fast successes.
- Alerting: error rate, cost/day, latency p95 — alert on thresholds.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Observability Layer (Layer 15)**, cross-cutting.
- Wraps every other layer (1-14): each layer emits spans/logs/metrics.
- Provides input to **Evaluation Layer** (correlate outcomes with traces for regression).
- Provides input to **Security Layer** (audit trails derive from same instrumentation).
- Provides input to **Policy Engine** (cost-so-far reads from cost tracker).
- Critical for the "transparent, debuggable, accountable" property of MiMo.

## Recommended Usage
- ADOPT OpenTelemetry SDK + pino + cost tracker for v1 (SQLite-backed).
- Migrate to Langfuse (OSS self-hosted) in v2 for LLM-native observability.
- Every layer wrapped in spans; architectural enforcement via lint.
- Cost tracking per model call; per-task + per-user rollups; budget enforcement reads same numbers.
- Live dashboard (socket.io) for user transparency.
- Redaction pipeline for PII/secrets.
- Retention + sampling + alerting.

## Decision
**ADOPT** — CORE. OpenTelemetry + pino + custom cost tracker (v1, SQLite-backed) → Langfuse or full OTel stack (v2). Every layer instrumented. Cost tracking mandatory. Live dashboard via socket.io. Redaction + retention + sampling + alerting.

## Sources
- OpenTelemetry specification (CNCF, canonical).
- Google SRE Book (observability chapters).
- "Observability Engineering" (Majors et al., 2020).
- Langfuse / Helicone / Jaeger / Prometheus / Grafana documentation.
- OWASP LLM Top 10 2025 (inferred applicability to log redaction + cost abuse).
