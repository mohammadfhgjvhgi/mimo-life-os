# SYSTEM_STATE_MODEL

> Every important state in MiMo AI, its transitions, and failure states. Long-running tasks must be resumable.

## State Categories

### 1. Session State
- **Fields:** sessionId, userId, createdAt, lastActiveAt, workspaceId, activeConversationId.
- **Transitions:** created → active → idle → expired/closed.
- **Persisted:** yes (SQLite).
- **Failure:** session loss → recreate from user identity + last checkpoint.

### 2. Conversation State
- **Fields:** conversationId, sessionId, turns[], compressedSummary, tokenBudgetUsed.
- **Transitions:** open → turn-in-progress → turn-complete → archived.
- **Persisted:** yes (turns + summary).
- **Failure:** context overflow → compress older turns to summary (full fidelity in episodic memory).

### 3. Task State
- **Fields:** taskId, goal, planId, status, createdAt, updatedAt, checkpoints[], budget, progress.
- **Statuses:** `pending → planning → ready → running → paused → verifying → completed | failed | cancelled | escalated`.
- **Transitions:**
  - pending → planning (Executive accepts)
  - planning → ready (plan produced)
  - ready → running (Execution starts)
  - running → verifying (step/task done)
  - verifying → completed (PASS) | failed (FAIL)
  - failed → running (recovery retry) | escalated (budget exhausted)
  - running → paused (checkpoint/suspend) → running (resume)
  - any → cancelled (user/kill-switch)
- **Persisted:** yes (checkpoints + journal).
- **Resumable:** yes — on crash, read last checkpoint + journal, resume.
- **Failure:** checkpoint missing → reconstruct from journal; if journal also lost → mark `failed-unknown`, escalate.

### 4. Plan State
- **Fields:** planId, taskId, steps[], dependencies, version, alternatives[].
- **Statuses:** `draft → active → superseded | abandoned`.
- **Transitions:** draft → active → (re-plan) → superseded (new active).
- **Persisted:** yes (versioned).
- **Failure:** plan invalid → re-plan; preserve old version for diff.

### 5. Agent State
- **Fields:** agentId, type (supervisor/researcher/...), taskId, status, memory snapshot, tools[], permissions, budget, timeout, outputContract.
- **Statuses:** `idle → assigned → thinking → acting → waiting-approval → done | failed | timed-out`.
- **Transitions:** idle → assigned → thinking → acting → (waiting-approval) → done/failed.
- **Persisted:** yes (for handoff + resume).
- **Failure:** timeout → record + recover; context loss on handoff → pass compressed context + state.

### 6. Tool State
- **Fields:** toolCallId, toolName, input, status, output, permission, sandboxId, retries, trace.
- **Statuses:** `requested → permission-check → approved → executing → succeeded | failed | denied | timed-out`.
- **Transitions:** requested → permission-check → approved/denied → executing → succeeded/failed.
- **Persisted:** yes (audit trace).
- **Failure:** denied → request approval or abort; failed → retry (bounded) → escalate.

### 7. Execution State
- **Fields:** executionId, taskId, stepId, status, checkpointRef, startedAt, updatedAt.
- **Statuses:** `queued → running → checkpointed → completed | failed | cancelled | dead-lettered`.
- **Transitions:** queued → running → checkpointed → (loop) → completed/failed; failed → dead-lettered (after retries).
- **Persisted:** yes (checkpoint + journal).
- **Failure:** crash → resume from checkpoint; queue stall → worker health check + requeue.

### 8. Memory State
- **Fields:** recordId, type, content, embedding, provenance, confidence, version, createdAt, lastAccessed, accessCount, decayScore.
- **Statuses:** `active → consolidated → decayed | forgotten | conflicted`.
- **Transitions:** active → consolidated (STM→LTM) → decayed (low access) → forgotten; conflicted → resolution → active.
- **Persisted:** yes.
- **Failure:** conflict → resolution policy (newer+higher-confidence wins, flag for review); corruption → restore from backup/provenance.

### 9. Knowledge State
- **Fields:** sourceId, chunks[], embeddings[], kgTriples[], indexVersion, freshness.
- **Statuses:** `ingesting → indexed → stale → reindexed | invalidated`.
- **Transitions:** ingesting → indexed → stale (source changed) → reindexed; invalidated (source removed).
- **Persisted:** yes.
- **Failure:** stale index → re-ingest; KG inconsistency → re-extract triples.

### 10. Workflow / Approval State
- **Fields:** approvalId, requestor, action, risk, status, decidedBy, decidedAt.
- **Statuses:** `requested → pending → approved | denied | expired | modified`.
- **Transitions:** requested → pending → approved/denied/modified; timeout → expired → re-request or abort.
- **Persisted:** yes (audit).
- **Failure:** expired → re-request or safe-abort.

### 11. Verification State
- **Fields:** verificationId, targetId, mode, verdict, confidence, evidence[], createdAt.
- **Statuses:** `pending → running → pass | fail | inconclusive`.
- **Transitions:** pending → running → pass/fail/inconclusive; fail → trigger recovery.
- **Persisted:** yes.
- **Failure:** inconclusive → flag needs-review; contradictory evidence → inconclusive.

### 12. Recovery State
- **Fields:** recoveryId, failureId, cause, strategy, attempt, maxAttempts, status.
- **Statuses:** `diagnosing → strategizing → retrying → recovered | exhausted`.
- **Transitions:** diagnosing → strategizing → retrying → recovered (success) / exhausted (escalate).
- **Persisted:** yes (lessons).
- **Failure:** misdiagnosis → bounded retries cap damage; exhausted → escalate to user.

### 13. Autonomy State
- **Fields:** triggerId, type (schedule/event/proactive), goal, status, lastFired, nextFire.
- **Statuses:** `armed → fired → should-act-check → permitted → executing → notified | suppressed`.
- **Transitions:** armed → fired → should-act-check → permitted/suppressed → executing → notified.
- **Persisted:** yes.
- **Failure:** runaway → kill-switch + rate-limit; suppressed → log + alert.

### 14. System Health State
- **Fields:** component, status (healthy/degraded/down), latency, errorRate, queueDepth, diskUsage.
- **Statuses:** `healthy → degraded → down → recovering`.
- **Transitions:** healthy → degraded → down → recovering → healthy.
- **Persisted:** metrics (time-series, time-bounded).
- **Failure:** component down → fallback (e.g. model down → fallback model; vector store down → keyword-only).

## Resumability Rules (long-horizon)
1. Every running task checkpoints after each step.
2. Checkpoint = full task state + plan state + agent state + execution state + workspace refs + last context snapshot.
3. Journal = append-only event log (step-start/done/fail/checkpoint).
4. On crash: load last checkpoint → replay journal from checkpoint → resume.
5. If checkpoint corrupt: reconstruct from journal; if journal corrupt: mark `failed-unknown`, escalate.
6. Memory/knowledge updates are committed transactionally with step completion (crash-safe learning).

## Kill-Switch Behavior
- User or security policy can flip a global kill-switch.
- Effect: all running tasks → `paused`; all autonomy triggers → `suppressed`; all tool calls → `denied`.
- State preserved (resumable after switch re-armed).
