# SYSTEM_DATA_FLOW

> Lifecycle of a task through MiMo AI. The reference flow is analyzed and improved where necessary (notes inline).

## Reference Task Lifecycle
```
USER INPUT
  → INTENT UNDERSTANDING
  → CONTEXT ASSEMBLY
  → MEMORY RETRIEVAL
  → KNOWLEDGE RETRIEVAL
  → REASONING
  → PLANNING
  → TOOL / AGENT SELECTION
  → EXECUTION
  → OBSERVATION
  → VERIFICATION
  → RECOVERY / REPLANNING  (on FAIL)
  → RESULT
  → MEMORY UPDATE
  → LEARNING
  → AUDIT
```

## Stage-by-Stage Data Flow

### 1. USER INPUT
- **In:** natural language (text now; voice/image later via Multimodal).
- **Out:** normalized message + session id + user id + workspace id.
- **Improvement:** capture intent hints (is this a question? a task? a command? an approval response?) early to route fast paths vs deep paths.

### 2. INTENT UNDERSTANDING
- **In:** normalized message.
- **Process:** Executive classifies intent (answer / search / act / approve / autonomous-trigger).
- **Out:** intent tag + estimated difficulty + suggested strategy.
- **Improvement:** fast-path simple questions straight to Model (skip full planning) to minimize latency for trivial asks.

### 3. CONTEXT ASSEMBLY
- **In:** message + intent + session + workspace refs.
- **Process:** Context Manager pulls conversation (compressed), task/goal state, workspace file list, agent/tool/execution state, permission scope.
- **Out:** base context object (not yet final prompt).
- **Improvement:** compute a token budget up front; retrieve memory/knowledge to fill budget, not beyond.

### 4. MEMORY RETRIEVAL
- **In:** context object + message embedding.
- **Process:** hybrid search (semantic vector + keyword BM25) across typed memories (episodic, semantic, preference, failure, skill...); rank by relevance + recency + confidence.
- **Out:** ranked memory records with provenance.
- **Improvement:** include failure memory proactively (don't repeat past mistakes).

### 5. KNOWLEDGE RETRIEVAL
- **In:** context + message.
- **Process:** hybrid search over knowledge base (chunks + KG); rerank; GraphRAG expands via entity relations.
- **Out:** reranked evidence chunks + KG subgraph + source refs.
- **Improvement:** contradiction detection across sources before passing to reasoning.

### 6. REASONING
- **In:** full assembled context (conversation + retrieved memory + retrieved knowledge + state).
- **Process:** Model call (via Gateway) with selected reasoning mode (CoT/ReAct/Plan-and-Solve/structured). Confidence + uncertainty + contradiction checks.
- **Out:** reasoning trace + conclusions + confidence.
- **Improvement:** adaptive mode selection by difficulty (cheap mode for easy, deep mode for hard) to balance latency vs quality.

### 7. PLANNING
- **In:** reasoning conclusions + goal.
- **Process:** decompose into task graph; assign agents; define verification gates + budgets/timeouts.
- **Out:** persisted plan (versioned).
- **Improvement:** make plans diffable + re-plannable; store alternative branches.

### 8. TOOL / AGENT SELECTION
- **In:** plan steps.
- **Process:** for each step pick agent + tool subset; check permissions; request approvals if needed.
- **Out:** execution manifest.
- **Improvement:** prefer single-agent with full context where possible; spawn specialists only when justified (per hybrid strategy).

### 9. EXECUTION
- **In:** execution manifest.
- **Process:** Execution Engine runs steps (tool calls in sandbox, agent steps); checkpoint after each; stream progress via socket.io to UI.
- **Out:** step results + checkpoints + traces.
- **Improvement:** parallelize independent steps where safe; serialize dependent ones.

### 10. OBSERVATION
- **In:** step results.
- **Process:** feed results back into context; update workspace; update agent state.
- **Out:** updated context for next step / verification.
- **Improvement:** structured observation schema so verification can consume cleanly.

### 11. VERIFICATION
- **In:** step/task results + expected outcome + evidence.
- **Process:** Verifier (test-based / evidence-based / consistency / critic agent) → PASS/FAIL + confidence.
- **Out:** verdict.
- **Improvement:** never accept "Done." without verification for important tasks; flag low-confidence as needs-review.

### 12. RECOVERY / REPLANNING (on FAIL)
- **In:** failure + diagnosis.
- **Process:** diagnose root cause; pick alternative strategy; retry (bounded); if exhausted → escalate to user.
- **Out:** retry attempt OR escalation.
- **Improvement:** persist failure lesson immediately (don't wait for end) so a crash mid-recovery still captures learning.

### 13. RESULT
- **In:** verified outputs.
- **Process:** format for user (cited evidence, artifacts, streaming).
- **Out:** user-facing result + artifacts.
- **Improvement:** include confidence + evidence links + "what I did" trace (transparency).

### 14. MEMORY UPDATE
- **In:** task + result + failure lessons + user feedback.
- **Process:** write episodic (this task), semantic (new facts), preference (inferred), failure (mistakes), skill (reusable procedures); consolidate STM→LTM.
- **Out:** updated memory store.
- **Improvement:** provenance on every write; conflict resolution on contradictory new info.

### 15. LEARNING
- **In:** task history + verification + feedback.
- **Process:** extract experience → lesson → candidate improvement (prompt/routing/tool-selection/strategy). Gated by evaluation + regression + approval before touching production behavior.
- **Out:** lessons (to memory) + candidate improvements (to sandbox).
- **Improvement:** separate "learned lesson" (always safe) from "deployed change" (gated).

### 16. AUDIT
- **In:** full trace.
- **Process:** observability persists logs/metrics/traces/cost/audit; security appends audit entry.
- **Out:** queryable audit trail.
- **Improvement:** immutable audit; time-bounded hot traces vs cold archive.

## Improvement Summary (deviations from naive flow)
1. **Fast-path** trivial questions (skip planning).
2. **Token budget** computed before retrieval (not after).
3. **Adaptive reasoning mode** by difficulty.
4. **Failure memory** retrieved proactively.
5. **Contradiction detection** before reasoning.
6. **Plans diffable/re-plannable** with alternative branches.
7. **Single-agent preferred**; specialists only when justified.
8. **Parallelize independent steps**; serialize dependent.
9. **Verification mandatory** for important tasks.
10. **Persist failure lessons immediately** (crash-safe).
11. **Transparency**: result includes confidence + evidence + trace.
12. **Provenance + conflict resolution** on every memory write.
13. **Separate learned-lesson from deployed-change** (gated self-improvement).
14. **Immutable audit**; hot/cold trace tiers.

## Real-Time Data Flow (UI ↔ Runtime)
- UI subscribes to task/agent streams via socket.io (`/?XTransformPort=<runtime-port>`).
- Runtime emits: step-start, step-progress, step-done, tool-call, verification, error, checkpoint, result.
- UI sends: user input, approvals, cancellation, settings.
- All cross-service requests go through Caddy with `XTransformPort` (single external port constraint).
