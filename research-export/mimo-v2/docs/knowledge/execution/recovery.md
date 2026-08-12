# Recovery (Failure Handling)

**Category:** Execution
**Status:** CORE
**Maturity:** Production-ready

## Definition
**Recovery** is the subsystem that handles failures during agent execution: it **detects** the failure, **diagnoses** the root cause, **selects** an alternative strategy, **retries** within a bounded budget, and **escalates** to the human if retries are exhausted. It is the **failure-handling brain** of the execution layer — the difference between "agent crashed, task lost" and "agent failed, recovered, continued, or escalated cleanly."

Recovery covers: tool-call failures, model-API failures, verification failures, timeout failures, sandbox failures, and unexpected process crashes (via checkpoint-based resume).

## Problem Solved
In any non-trivial agent run, things fail constantly:
- A tool returns an error (network down, schema mismatch, permission denied).
- The model API times out or rate-limits.
- A verification step says "this result is wrong."
- A sandbox OOMs.
- The agent loops infinitely on the same failed action.
- The process crashes.

Without recovery, each failure terminates the task. With recovery:
- Transient failures → retried with backoff.
- Schema/permission failures → re-prompt the agent with the error.
- Verification failures → reflect + retry with a new strategy.
- Infinite loops → detected + broken via reflection.
- Crashes → resumed from last checkpoint.

Recovery turns a fragile pipeline into a **resilient workflow**.

## Why It Matters
For MiMo AI's long-horizon autonomy, recovery is what makes multi-day tasks viable. A 3-day task that fails on hour 5 due to a transient network error and cannot recover is useless. A 3-day task that recovers from 100 transient failures along the way and completes is the product.

Recovery is also the **trust mechanism**: the user trusts the system to either complete the task or escalate cleanly — never to silently produce a wrong answer or hang forever.

## How It Works

### Recovery decision flow
```
failure detected
   │
   ▼
┌──────────────────────────────────────────┐
│ 1. Classify failure                      │
│    - transient (network, rate-limit)     │
│    - schema/args (bad tool args)         │
│    - permission/policy (denied)          │
│    - verification (output wrong)         │
│    - timeout (tool/model/wall-clock)     │
│    - sandbox (OOM, killed)               │
│    - loop (repetition detected)          │
│    - crash (process exit; via checkpoint)│
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 2. Diagnose root cause                   │
│    - inspect error, context, history     │
│    - LLM-assisted diagnosis (optional)   │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 3. Select recovery strategy              │
│    - retry (with backoff)                │
│    - re-prompt agent with error          │
│    - reflect + replan                    │
│    - switch tool/model                   │
│    - skip + continue                     │
│    - abort + escalate                    │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 4. Execute strategy                      │
│    - decrement retry budget              │
│    - record recovery attempt             │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 5. Check budget                          │
│    - if retries remain → back to step 1  │
│    - if exhausted → ESCALATE             │
└──────────────────────────────────────────┘
```

### Failure classification → strategy matrix
| Failure type | Default strategy | Retry budget | Escalation |
|---|---|---|---|
| Transient (network, 5xx, rate-limit) | Retry w/ exponential backoff + jitter | 5 | Escalate to user |
| Schema/args invalid | Re-prompt agent with Zod error | 2 | Mark step failed |
| Permission/policy denied | Do NOT retry (denied is denied); inform agent | 0 | Agent decides: skip or escalate |
| Verification FAIL | Reflect + replan + retry | 2 | Escalate to user |
| Timeout (tool) | Retry once with longer timeout | 1 | Skip + continue or escalate |
| Timeout (wall-clock) | Escalate immediately | 0 | User |
| Sandbox OOM/killed | Retry with higher quota (if policy allows) | 1 | Escalate |
| Infinite loop detected | Force reflection; if persists, escalate | 1 | User |
| Process crash | Resume from last checkpoint | ∞ (idempotent) | If checkpoint missing → failed |
| Model API down | Fallback model via Gateway | 3 | Escalate |

### Reflection (Reflexion-style)
When a verification fails or a strategy is exhausted, the agent is prompted to **verbally critique** its trajectory so far:
```
You attempted to achieve <goal>. Your last 5 steps were <steps>.
The result was <failure>. Critique what went wrong and propose a
different approach. Output: { critique: string, newStrategy: string }.
```
The critique + new strategy are appended to context; the agent retries with the new framing. This is the **Reflexion** pattern (Shinn et al. 2023), adopted as a recovery extension.

### Escalation
When retries are exhausted, recovery escalates:
1. **Pause** the agent (lifecycle → `paused`).
2. **Checkpoint** current state.
3. **Notify** the user via socket.io + (v1.x) email/push.
4. **Surface** the failure: classification, diagnosis, attempted strategies, last checkpoint.
5. **Await** user decision: retry with new params / modify goal / cancel.
6. On user input → resume from checkpoint with new context.

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Agent Runtime                            │
│   ┌──────────┐    ┌──────────────┐    ┌───────────────┐    │
│   │  ReAct   │───▶│ Failure      │───▶│ Recovery      │    │
│   │  Loop    │    │ Detector     │    │ Engine        │    │
│   └──────────┘    └──────────────┘    └───────┬───────┘    │
│                                              │             │
│                              ┌───────────────┼─────────┐  │
│                              │               │         │  │
│                       ┌──────▼─────┐  ┌──────▼──────┐ ┌──▼────────┐
│                       │ Retry Mgr  │  │ Reflector   │ │ Escalator │
│                       │ (backoff)  │  │ (Reflexion) │ │ (notify)  │
│                       └────────────┘  └─────────────┘ └───────────┘
│                              │               │              │
│                              └───────────────┴──────────────┘
│                                              │
│                                       ┌──────▼──────┐
│                                       │ Checkpoint  │
│                                       │ (resume)    │
│                                       └─────────────┘
└─────────────────────────────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────┐
│  socket.io → user UI: escalation notice + decision panel    │
└─────────────────────────────────────────────────────────────┘
```

## Interfaces
- `RecoveryEngine.handle(failure: Failure, ctx: RunContext): Promise<RecoveryAction>`
- `Failure { type: FailureType; cause: Error; stepIndex; toolCallId?; args?; result?; checkpointRef? }`
- `RecoveryAction = { strategy: 'retry'|'re-prompt'|'reflect'|'switch-tool'|'switch-model'|'skip'|'escalate'; newArgs?; newModel?; reflection?; backoffMs?; budgetAfter: number }`
- `RetryManager.attempt(key, fn, policy): Promise<Result>` — exponential backoff with jitter.
- `Reflector.critique(trajectory, failure): Promise<{ critique, newStrategy }>`
- `Escalator.notify(runId, failure, attempts): Promise<void>` — pauses + notifies user.

## Dependencies
- Failure Detector (hooks in Tool Runtime, Model Gateway, Verifier).
- Retry Manager (exponential backoff + jitter).
- Reflector (LLM-assisted critique via Model Gateway).
- Checkpointing (resume after crash).
- Escalation channel (socket.io + UI + v1.x notifications).
- Audit log (every recovery attempt recorded).
- Learning layer (recovery outcomes feed lesson extraction).

## Strengths
- **Resilience** — transient failures don't terminate tasks.
- **Bounded** — retry budgets prevent infinite loops + cost runaway.
- **Adaptive** — reflection enables strategy change, not just blind retry.
- **Transparent** — every recovery attempt logged; user sees what was tried.
- **Graceful degradation** — when all else fails, escalate cleanly with state preserved.

## Weaknesses
- **Complexity** — many failure types × many strategies = combinatorial logic.
- **Cost** — retries + reflections multiply token spend.
- **Diagnosis difficulty** — root-cause analysis is hard; LLM-assisted diagnosis can be wrong.
- **Escalation fatigue** — too many escalations → user ignores them.
- **State drift** — retrying after a partial side-effect (e.g., a tool that wrote a file then errored) requires idempotency or rollback.

## Failure Modes
- **Misclassification** — recovery treats a permanent failure as transient → wastes retry budget. Mitigation: conservative classification; if 2 retries fail with same error, re-classify.
- **Reflection loops** — agent reflects, retries, fails, reflects, ... Mitigation: reflection budget (≤2 per failure).
- **Cost runaway** — retries + reflections on a costly tool. Mitigation: cost cap per recovery attempt; abort if exceeded.
- **Escalation ignored** — user doesn't respond; task stalled forever. Mitigation: TTL on escalations; auto-cancel after timeout.
- **Non-idempotent retry** — retrying a `POST /charge` creates double charge. Mitigation: idempotency keys; dry-run before retry; rollback where possible.
- **Checkpoint corruption** — crash recovery can't load checkpoint. Mitigation: keep multiple checkpoints; fall back to earlier one.
- **Cascade** — one failure triggers recovery which triggers another failure. Mitigation: global recovery budget per task (not just per step).

## Security Implications
- Retries must not bypass approval gates — a denied tool stays denied.
- Reflection prompts include failure context → may contain sensitive data from tool results; scrub before logging.
- Escalation messages must not leak secrets (e.g., a tool error that includes an API key).
- Recovery budget enforced globally per task — prevents runaway cost from a compromised or buggy agent.

## Performance Implications
- Retries add latency: 3 retries with backoff (1s, 2s, 4s) = ~7s added.
- Reflection adds 1 LLM call (~1–5s).
- Escalation blocks until user responds (seconds to hours).
- Global recovery budget caps total recovery overhead per task.

## Operational Implications
- Recovery metrics: per-failure-type recovery success rate; mean retries to success; escalation rate.
- Audit dashboard: every recovery attempt visible with strategy + outcome.
- Escalation queue: pending escalations surface in UI; SLA on response.
- Lesson extraction: failed-then-recovered cases feed Learning layer ("this tool fails when X; use Y instead").

## Alternatives
- **No recovery (fail-fast)** — rejected; not viable for long-horizon.
- **Blind retry (no classification)** — wastes budget on permanent failures.
- **Temporal.io retry policies** — robust but adds dependency; we adopt the pattern without the framework for v1.
- **Manual recovery (user fixes every failure)** — rejected; defeats autonomy.

## Maturity & Production Readiness
**Production-ready.** Retry-with-backoff is industry standard (every HTTP client library). Reflexion is research-validated (Shinn et al. 2023) and adopted in production agents (Cursor, Claude Code reflection). Escalation/human-in-the-loop is standard. The integration rigor is the differentiator.

## Relevant Research / Papers
- Shinn, N. et al. (2023). *Reflexion: Language Agents with Verbal Reinforcement Learning.* arXiv:2303.11366. (Foundational for reflection-based recovery.)
- Yao, S. et al. (2022). *ReAct* (the loop recovery extends).
- Madaan, A. et al. (2023). *Self-Refine: Iterative Refinement with Self-Feedback.* arXiv:2303.17651. (Related self-correction pattern.)
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (recovery/reflection sections).
- Temporal.io — *Retry Policies* documentation (industry reference for backoff).

## Official Documentation
- Temporal.io Activity Retry Policies (temporal.io/docs/concepts/activities#retry).
- LangGraph — error handling + reflection nodes.
- OpenAI Agents SDK — Guardrails + retry.
- Vercel AI SDK — `streamText` error handling + `onError` callbacks.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Recovery Engine lives in the `agents-service`** (or main Next.js process) — wherever the agent loop runs. It wraps every tool call, model call, and verification step with try/catch + classification + strategy selection.
- **Prisma schema**:
  - `RecoveryAttempt` (id, runId, stepIndex, failureType, cause, strategy, attemptNum, budgetAfter, outcome, durationMs, createdAt) — append-only audit.
  - `Escalation` (id, runId, failureSummary, attemptedStrategies JSON, checkpointRef, status enum, notifiedAt, decidedAt, userDecision) — pending escalations surface in UI.
- **Retry Manager**: TypeScript module; exponential backoff `delay = base * 2^attempt + jitter`; per-failure-type policy (`transient: { maxAttempts: 5, base: 1000ms }`, `verification: { maxAttempts: 2, base: 0 }`).
- **Reflector**: a `reflect` tool registered with the Tool Runtime; on verification FAIL or strategy exhaustion, the agent loop injects a forced `reflect` call. The LLM is prompted with the trajectory + failure + a critique template; output is structured `{ critique, newStrategy }` validated by Zod; appended to context as a `Reflection` block.
- **Loop detector**: hash `(toolName, JSON.stringify(args))` of last 3 steps; if hash repeats, force reflection before next action; if reflection doesn't break the loop, escalate.
- **Crash recovery**: on process startup, scan `AgentRun` for `status = 'running'` with stale heartbeat → mark `paused` + emit `recovery:crash_detected`. Scheduler (or manual) can then `resume(runId)` from last checkpoint. See `agent_lifecycle.md` heartbeat/watchdog.
- **Escalation flow**: `Escalator.notify()` → pause agent + checkpoint + insert `Escalation` row + emit `escalation:pending` via socket.io to room `user:<userId>`. UI shows escalation card with failure summary + attempted strategies + decision buttons (retry / modify / cancel).
- **socket.io events**: `recovery:attempted`, `recovery:reflected`, `recovery:escalated`, `recovery:resumed`. **zustand** `useRecoveryStore` shows recovery history per run + pending escalations.
- **Global budget**: `RecoveryBudget` per run — `{ maxAttempts: 20, maxCostUsd: 5.00, maxReflections: 5 }`. Decrement on each attempt; on exhaustion → force escalate.
- **Idempotency**: for non-idempotent tools (POST, file-write), retries use idempotency keys (UUID per logical action); tool handler checks if key already processed.
- **Caddy**: escalation endpoints (`/api/escalations/*`) on main Next.js port (user-facing); recovery engine is internal to agents-service.

## Relevance To Our Project (MiMo AI layered runtime)
Recovery is **Layer 12 (Recovery / Reflection)** of the runtime OS. It is invoked by Layer 10 (Execution) on any failure; it uses Layer 8 (Agent — reflect tool), Layer 1 (Model — reflection LLM call), Layer 9 (Tool — retry with idempotency), Layer 11 (Verification — re-verify after retry), and Layer 15 (Security — escalation is a controlled pause). It feeds Layer 13 (Learning) — every recovery attempt is a training example for "what works when X fails."

It is the **resilience backbone** that makes long-horizon autonomy trustworthy: the system either completes the task, recovers from failures along the way, or escalates cleanly with state preserved. No silent failures, no infinite loops, no lost progress.

## Recommended Usage
- Every tool/model/verification call wrapped with failure detection + classification.
- Bounded retry budgets per failure type + global budget per run.
- Reflexion-style reflection on verification failures + strategy exhaustion.
- Loop detection + forced reflection on repetition.
- Crash recovery via checkpoint resume + heartbeat watchdog.
- Escalation with full context (failure, attempts, checkpoint) when budget exhausted.
- Idempotency keys for non-idempotent tool retries.
- Audit every recovery attempt; feed outcomes to Learning layer.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** Recovery Engine with classification + bounded retries + Reflexion-style reflection + loop detection + crash-recovery via checkpoints + escalation. **ADOPT** global recovery budget per run. **DEFER** LLM-assisted root-cause diagnosis (beyond Reflexion) to v1.x. **REJECT** fail-fast (no recovery) for any task > 1 step. **REJECT** unbounded retries (cost runaway risk).

## Sources
- Shinn et al. 2023 — Reflexion (arxiv.org/abs/2303.11366)
- Madaan et al. 2023 — Self-Refine (arxiv.org/abs/2303.17651)
- Yao et al. 2022 — ReAct (arxiv.org/abs/2210.03629)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- Temporal.io Retry Policies (temporal.io/docs/concepts/activities#retry)
- LangGraph error handling (langchain-ai.github.io/langgraph/how-tos/error-handling)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 12 Recovery/Reflection), §6 (failure edges)
- MiMo AI `CAPABILITY_MAP.md` §6 (failure handling/recovery = C, retries = C, cancellation = C, human escalation = C)
