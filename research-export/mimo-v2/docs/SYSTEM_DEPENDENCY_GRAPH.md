# SYSTEM_DEPENDENCY_GRAPH

> For every major subsystem: depends on, consumed by, produces, triggers, observes, verifies, persists, can fail because of.
> Covers the whole system. Read alongside `SYSTEM_DATA_FLOW.md` (lifecycle) and `SYSTEM_STATE_MODEL.md` (states).

## Notation
- `A → dep → B` : A depends on B (A needs B to function).
- `A → by → B` : A is consumed by B (B reads A).
- `A → prod → X` : A produces X.
- `A → trig → B` : A triggers B.
- `A → obs → B` : A observes B.
- `A → ver → B` : A verifies B.
- `A → pers → X` : A persists X.
- `A → fail ← B` : A can fail because of B.

---

## Subsystem Matrix

### 1. Core Runtime
| Field | Value |
|---|---|
| depends on | Persistence (SQLite), Event Bus, Configuration |
| consumed by | every other layer |
| produces | task/session/agent state, events |
| triggers | Task Engine steps |
| observes | system health |
| persists | runtime state, checkpoints |
| can fail because of | DB corruption, OOM, unhandled exceptions |

Components: Event Bus, Task Engine, State Machine, Session Manager, Context Manager, Job Manager, Config, Error Handling, Retry, Cancellation, Checkpoints, Persistence, Plugin Interface, API Layer, Logging.

### 2. Model Layer (Gateway + GLM-5.2)
| Field | Value |
|---|---|
| depends on | Z.ai API (GLM-5.2), Secrets (API key), Network |
| consumed by | Reasoning, Planning, Verifier, Embedding gen |
| produces | chat completions, tool calls, structured output, embeddings |
| triggers | (none — reactive) |
| observes | latency, token usage, errors |
| persists | call logs (audit) |
| can fail because of | API outage, rate limit, bad key, malformed request, context overflow |
| mitigation | fallback model, retry, context trim |

### 3. Context Layer
| Field | Value |
|---|---|
| depends on | Memory (retrieve), Knowledge (retrieve), Workspace, Task/Goal state, Agent/Tool/Execution state |
| consumed by | Reasoning, Planning, Executive, Model (prompt input) |
| produces | assembled prompt context, compressed summaries |
| triggers | Memory retrieval, Knowledge retrieval |
| observes | token budget, relevance scores |
| persists | context snapshots (for observability + resume) |
| can fail because of | retrieval returning irrelevant/missing info, context overflow, stale memory |

### 4. Memory Layer
| Field | Value |
|---|---|
| depends on | Persistence (records + vector index), Embedding (for semantic retrieval) |
| consumed by | Context (retrieve), Learning (write), Execution (write episodic) |
| produces | retrieved memories, ranked evidence |
| triggers | consolidation jobs (STM→LTM), decay jobs |
| observes | memory hit rate, conflict flags |
| persists | all memory records (typed, provenance, confidence, version) |
| can fail because of | vector index corruption, conflicting records, schema drift, embedding model mismatch |

### 5. Knowledge Layer
| Field | Value |
|---|---|
| depends on | Ingestion sources (files/web/DB), Embedding, Vector store, Graph store |
| consumed by | Context (retrieve), Agents (research) |
| produces | chunks, embeddings, KG triples, reranked evidence |
| triggers | ingestion jobs, indexing |
| observes | index freshness, source coverage |
| persists | chunks, embeddings, KG, source metadata |
| can fail because of | stale index, broken source, embedding drift, KG inconsistency |

### 6. Reasoning Layer
| Field | Value |
|---|---|
| depends on | Context, Model, Memory |
| consumed by | Planning, Executive, Verifier |
| produces | reasoning traces, decisions, confidence scores |
| triggers | Model calls, Memory retrieval |
| observes | reasoning quality, contradiction flags |
| persists | reasoning traces (observability) |
| can fail because of | model hallucination, context gaps, mode mismatch |

### 7. Planning Layer
| Field | Value |
|---|---|
| depends on | Reasoning, Memory, Knowledge |
| consumed by | Executive, Agent Runtime |
| produces | task graphs / plans |
| triggers | Agent Runtime task assignment |
| observes | plan progress, drift |
| persists | plans (versioned, re-plannable) |
| can fail because of | incomplete reasoning, missing dependencies, over-complex decomposition |

### 8. Executive Layer
| Field | Value |
|---|---|
| depends on | Reasoning, Planning, Memory, Knowledge, Agent Runtime |
| consumed by | (top of stack — driven by user goal / autonomy trigger) |
| produces | strategy decisions, task assignments, continue/stop signals |
| triggers | Planning, Agent Runtime |
| observes | overall progress, budget, verification results |
| persists | executive decisions (audit) |
| can fail because of | inconsistent memory, bad planning, infinite loop, budget exhaustion |

### 9. Agent Layer (Runtime)
| Field | Value |
|---|---|
| depends on | Tool Runtime, Memory, Context, Permissions (Security) |
| consumed by | Executive, Execution Engine |
| produces | agent steps, tool calls, partial results |
| triggers | Tool calls, handoffs, delegation |
| observes | agent state, budgets, timeouts |
| persists | agent state, checkpoints, output contracts |
| can fail because of | tool failure, permission denial, timeout, context loss on handoff, infinite loop |

### 10. Tool Layer (Runtime)
| Field | Value |
|---|---|
| depends on | Security (permissions), Sandbox (Execution), external systems |
| consumed by | Agent Layer, Execution Engine |
| produces | tool results |
| triggers | Execution (sandboxed), approval requests |
| observes | tool reliability, latency |
| persists | tool call traces (audit) |
| can fail because of | sandbox breach, permission misconfig, external service down, malicious output |

### 11. Execution Layer
| Field | Value |
|---|---|
| depends on | Task Engine, Checkpoints, Persistence, Queue/Workers |
| consumed by | Agent/Tool layers (run steps), Autonomy (background) |
| produces | step results, checkpoints, progress |
| triggers | Verification (on step done), Recovery (on failure) |
| observes | task progress, failures |
| persists | checkpoints, task journal, partial results |
| can fail because of | crash without checkpoint, queue stall, unhandled exception, deadlock |

### 12. Verification Layer
| Field | Value |
|---|---|
| depends on | Evidence (Knowledge), Tests, Critic agent, Model |
| consumed by | Execution (gate), Executive |
| produces | PASS/FAIL verdict, confidence |
| triggers | Recovery (on FAIL), Learning (on PASS/FAIL) |
| observes | verification pass rate |
| persists | verdicts (audit) |
| can fail because of | contradictory evidence, weak tests, critic error |

### 13. Recovery / Reflection Layer
| Field | Value |
|---|---|
| depends on | Diagnosis (Model/Reasoning), Memory (failure memory) |
| consumed by | Execution (on failure) |
| produces | alternative strategy, retry decision, escalation |
| triggers | Execution (retry), user escalation |
| observes | recovery success rate |
| persists | failure lessons (→ Learning → Memory) |
| can fail because of | misdiagnosed root cause, retry budget exhausted |

### 14. Learning Layer
| Field | Value |
|---|---|
| depends on | Execution history, Verification results, feedback |
| consumed by | Memory (write lessons), self-improvement (gated) |
| produces | experiences, lessons, strategy updates |
| triggers | Memory writes, (gated) prompt/routing updates |
| observes | learning effectiveness |
| persists | lessons in memory + skill store |
| can fail because of | noisy feedback, overfitting to rare events, unsafe auto-deploy |

### 15. Autonomy Layer
| Field | Value |
|---|---|
| depends on | Triggers (schedule/event), Security (should-act/permission), Execution |
| consumed by | (top-level — drives background work) |
| produces | autonomous tasks |
| triggers | Executive, notifications |
| observes | trigger fire rate, approval status |
| persists | schedules, persistent goals, autonomous task history |
| can fail because of | runaway loop, bypassed approval, stale trigger |

### 16. Security Layer (cross-cutting)
| Field | Value |
|---|---|
| depends on | Identity, Permission policy, Secrets vault |
| consumed by | every layer (permission checks) |
| produces | allow/deny decisions, audit entries |
| triggers | approval requests, kill-switch |
| observes | policy violations, anomalies |
| persists | audit logs |
| can fail because of | policy misconfig, secret leak, bypassed gate |

### 17. Observability Layer (cross-cutting)
| Field | Value |
|---|---|
| depends on | every layer emitting events |
| consumed by | Dashboard (UI), Evaluation, Debugging |
| produces | logs, metrics, traces |
| triggers | alerts |
| observes | everything |
| persists | traces/metrics/logs (time-bounded) |
| can fail because of | event volume overload, lost traces |

### 18. Evaluation Layer
| Field | Value |
|---|---|
| depends on | benchmark suites, regression tests, the running system |
| consumed by | Learning (gating), CI |
| produces | eval scores, regression reports |
| triggers | (gates) self-improvement deploy |
| observes | quality trends |
| persists | eval history |
| can fail because of | benchmark drift, flaky tests |

### 19. Infrastructure
| Field | Value |
|---|---|
| depends on | SQLite, vector store, graph store, file storage, cache, queue, event bus, Caddy, socket.io |
| consumed by | all layers |
| produces | storage, transport, compute |
| can fail because of | disk full, store corruption, port conflict, gateway misroute |

### 20. UI / API
| Field | Value |
|---|---|
| depends on | Runtime API, socket.io (real-time) |
| consumed by | user |
| produces | user actions, display |
| triggers | user goals, approvals |
| observes | live traces |
| can fail because of | API error, WS disconnect, hydration mismatch |

---

## High-Level Dependency Chain (the spine)
```
USER GOAL / AUTONOMY TRIGGER
        │
        ▼
   EXECUTIVE ──dep──▶ Reasoning, Planning, Memory, Knowledge
        │
        ▼
   PLANNING ──dep──▶ Reasoning, Memory, Knowledge
        │
        ▼
   AGENT RUNTIME ──dep──▶ Tool Runtime, Memory, Context, Security
        │
        ▼
   TOOL RUNTIME ──dep──▶ Security, Sandbox(Execution)
        │
        ▼
   EXECUTION ENGINE ──dep──▶ Checkpoints, Persistence, Queue
        │
        ▼
   VERIFICATION ──dep──▶ Evidence, Tests, Critic, Model
        │
   ┌────┴────┐
   ▼         ▼
 FAIL       PASS
   │         │
   ▼         ▼
RECOVERY   RESULT ──▶ LEARNING ──▶ MEMORY
   │
   ▼ (exhausted)
ESCALATE TO USER

CROSS-CUTTING (wrap everything): Security · Observability · Evaluation
FOUNDATION (everything sits on): Core Runtime · Infrastructure
```

## Critical Failure Edges (must defend)
1. Model API failure → fallback model + cached/degraded response.
2. Memory inconsistency → conflict resolution + provenance.
3. Retrieval returning nothing relevant → fallback to broader search / ask user.
4. Checkpoint missing after crash → task journal reconstruction.
5. Tool sandbox breach → kill-switch + audit + isolation review.
6. Verification with contradictory evidence → flag uncertainty, don't claim success.
7. Recovery misdiagnosis → bounded retries, then escalate.
8. Autonomy runaway → kill-switch + rate limit + approval gate.
9. Context overflow → compression + on-demand retrieval.
10. Prompt injection (tool output / web content) → sanitizer + sandbox + policy.
