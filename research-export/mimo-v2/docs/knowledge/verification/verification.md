# Verification

**Category:** Verification
**Status:** CORE
**Maturity:** Mature (pattern); Emerging (LLM-specific)

## Definition
The Verification Layer checks the outputs of MiMo AI's reasoning, planning, tool use, and execution against **expected truth** before declaring a task "done." It implements four verification modes — **result verification, test-based verification, evidence/source verification, consistency verification** — plus a **Critic Agent** that independently re-examines the work. Per `PROJECT_UNDERSTANDING.md` §2: *"Confusing execution with successful completion (running a step ≠ verified success)."* Verification is the structural enforcement of "done ≠ success."

## Problem Solved
- LLMs hallucinate; tools return wrong/outdated data; plans miss edge cases; "the agent said it's done" is not the same as "the task is actually done."
- Without verification, errors propagate: a wrong intermediate fact poisons every downstream step.
- Without a *separate* critic, the same model that produced the work is judging it — confirmation bias.
- Without test-based verification, code changes can pass "looks right" but break tests.

## Why It Matters
Verification is the **trust boundary** between "the model produced something" and "MiMo AI delivered a correct result." It is mandatory for important tasks (per `PROJECT_UNDERSTANDING.md` §8.7). It is also the input to the Recovery Layer (`FAIL → diagnose → alternative strategy → retry`) and the Learning Layer (`PASS → lesson; FAIL → failure memory + lesson`).

## How It Works
### Four verification modes
1. **Result verification** — does the output meet the task's output contract?
   - Schema check (does it have the required fields?).
   - Constraint check (within length limits? matches the requested format?).
   - Goal check (does it actually answer the user's question, not a related one?).
   - Cheap, deterministic, always runs.
2. **Test-based verification** — for code/executable outputs:
   - Run the existing test suite; new code must not break tests.
   - For new functionality, generate + run new tests (Coding Agent).
   - For browser tasks, run assertion checks on the resulting page state.
   - For data analysis, run sanity checks on the output (row counts, value ranges, no nulls where forbidden).
3. **Evidence/source verification** — for factual claims:
   - Every factual claim in the output must cite a source (a retrieved chunk, a tool result, a memory record).
   - The verifier checks: does the source actually support the claim? (entailment check via LLM or heuristic).
   - Uncited claims are flagged; the user can require "no uncited claims" for sensitive tasks.
4. **Consistency verification** — internal logical consistency:
   - Does the output contradict itself? (e.g., "the meeting is at 3pm" and "the meeting is in the morning").
   - Does it contradict prior verified facts in memory? (e.g., "Alice works at Acme" when memory says "Alice works at Globex" — temporal check).
   - Does it contradict other sources in the retrieval? (multiple sources disagree → flag).

### Critic Agent
- A *separate* agent (different system prompt, optionally a different model via the Model Router) re-examines the work independently.
- Inputs: the original task, the output, the evidence, the verifier's findings.
- Outputs: `{ verdict: 'PASS'|'FAIL'|'NEEDS_REVISION', issues: Issue[], suggestedFixes: string[], confidence: number }`.
- The critic is **not** the same model call that produced the work — it runs after, with a fresh context, focused on "is this correct?"
- For high-stakes tasks, multiple critics (ensemble) vote; majority + confidence threshold decides.

### Verification pipeline
```
Execution Layer: task.step finished
        │
        ▼
Result Verifier (schema + constraints + goal) ──PASS──▶ Test Verifier (if applicable)
        │ FAIL                                              │ FAIL
        ▼                                                   ▼
   (replan)                                             (replan)
        │ PASS                                            │ PASS
        ▼                                                   ▼
Evidence Verifier (claims ↔ sources) ──PASS──▶ Consistency Verifier (self + memory + sources)
        │ FAIL                                              │ FAIL
        ▼                                                   ▼
   (replan)                                             (replan)
        │ PASS                                            │ PASS
        ▼                                                   ▼
                  Critic Agent (independent re-examination)
                                  │
                                  ├─ PASS ─▶ task.done (verified)
                                  ├─ NEEDS_REVISION ─▶ (replan)
                                  └─ FAIL ─▶ Recovery Layer
```

## Architecture
```
Execution ──step.done──▶ Verification Layer
                            │
                            ├─ Result Verifier (deterministic)
                            ├─ Test Verifier (runs tests)
                            ├─ Evidence Verifier (LLM entailment)
                            ├─ Consistency Verifier (LLM + memory)
                            └─ Critic Agent (separate LLM call, fresh context)
                            │
                            ▼
                    VerifierVerdict { PASS | FAIL | NEEDS_REVISION }
                            │
                            ▼ FAIL / NEEDS_REVISION
                    Recovery Layer (bounded retries → escalate)
                            │ PASS
                            ▼
                    Learning Layer (record verified result)
```

## Interfaces
```ts
interface Verifier {
  verify(input: VerifyInput): Promise<VerifierVerdict>;
}

interface VerifyInput {
  taskId: string;
  goal: string;
  outputContract: OutputContract;      // schema + constraints
  output: unknown;                     // the produced result
  evidence: Evidence[];                // sources cited
  context: TaskContext;                // memory + retrieved knowledge
}

interface VerifierVerdict {
  verdict: 'PASS'|'FAIL'|'NEEDS_REVISION';
  issues: { mode: VerifyMode; severity: 'blocker'|'warning'; description: string; fix?: string }[];
  confidence: number;
  verifierId: string;                  // 'result'|'test'|'evidence'|'consistency'|'critic'
}

interface CriticAgent {
  critique(input: { goal: string; output: unknown; evidence: Evidence[]; priorVerdicts: VerifierVerdict[] }): Promise<CriticVerdict>;
}
```

## Dependencies
- Model Gateway (evidence + consistency + critic need LLM calls).
- Test runner (for test-based verification — the Coding Agent's test infra).
- Memory Layer (consistency check against prior verified facts).
- Knowledge Layer (evidence lookup — does the cited source support the claim?).
- Recovery Layer (FAIL consumer).
- Learning Layer (PASS/FAIL consumer).
- Event Bus (`verification.passed` / `verification.failed` events).
- Observability (verifier latency, PASS rate, FAIL reasons).

## Strengths
- **Catches hallucination** before it reaches the user.
- **Catches tool errors** (wrong data, stale facts) before they propagate.
- **Catches self-contradiction** that the producing model missed.
- **Independent critic** reduces confirmation bias.
- **Mode-mixable** — cheap deterministic checks always run; expensive LLM checks run for important tasks.
- **Feeds learning** — every FAIL is a lesson; every PASS reinforces.

## Weaknesses
- **Cost** — LLM-based verifiers (evidence, consistency, critic) double or triple the model cost of a task. Mitigation: tiered verification — cheap always-on, expensive for high-stakes only.
- **Critic can be wrong** — a critic that rejects correct work wastes recovery budget. Mitigation: critic confidence threshold; human escalation on persistent disagreement.
- **Evidence verification is only as good as the sources** — if the retrieval returns wrong sources, the verifier will pass wrong claims. Mitigation: source-quality ranking in the Knowledge Layer.
- **Test-suite coverage** — test-based verification only catches what tests cover. Mitigation: grow tests; include regression tests for past failures.
- **Latency** — full verification pipeline adds seconds-to-minutes. Mitigation: parallel verifiers where independent; stream interactive outputs with "verified" badge post-hoc.

## Failure Modes
- **Verifier timeout** — LLM-based verifier stalls. Mitigation: deadline; on timeout, treat as `NEEDS_REVISION` (conservative).
- **Critic false-reject loop** — critic rejects; recovery replans; critic rejects again; loop. Mitigation: bounded retries; escalate to user.
- **Source hallucination** — the producing model invents a source citation; verifier checks the (non-existent) source and fails. Mitigation: evidence verifier first checks source existence; uncited or non-existent sources → FAIL.
- **Consistency over-strict** — flags legitimate nuance as contradiction. Mitigation: severity levels; warnings vs. blockers.
- **Schema drift** — output contract changes but verifier uses stale schema. Mitigation: version the contract; verifier reads the version used by the producer.
- **Self-verification bias** — using the same model+context to verify its own work. Mitigation: critic uses a *fresh* context, optionally a *different* model.

## Security Implications
- **Prompt-injection in evidence** — a malicious source could try to make the verifier pass a wrong claim. Mitigation: evidence is data, not instructions; verifier prompts treat citations as data.
- **Critic as last line of defense** — for security-sensitive tasks (sending an email, running shell), the critic checks for prompt-injection signatures and exfiltration patterns.
- **Audit** — every verifier verdict (mode, issues, confidence) logged; full verification trail for each task.
- **Kill switch** — for catastrophic failures, a "skip verification" emergency toggle exists but is audited and rate-limited (only for unblocking; never the default).

## Performance Implications
- Result verifier: <1ms (deterministic schema/constraint check).
- Test verifier: seconds-to-minutes (test suite runtime).
- Evidence verifier: 1 LLM call per claim — can be batched.
- Consistency verifier: 1 LLM call — seconds.
- Critic: 1 LLM call — seconds.
- Total added latency: 5–60s for full pipeline; parallelize where possible.
- Cost: +30–100% on tasks that need LLM verification; tiered to high-stakes only.

## Operational Implications
- Need a **verification policy** per task type: which modes run, in what order, with what thresholds.
- Need a **PASS-rate dashboard** — per task type, per verifier mode; alert on drops.
- Need a **FAIL-reason taxonomy** — categorize failures for the Learning Layer.
- Need a **critic-model pin** — optionally a different (cheaper or stronger) model for the critic role.
- Need an **escalation UI** — when the critic and the producer disagree persistently, surface to the user.

## Alternatives
- **No verification (trust the model):** rejected — unsafe; fails the project's core principle.
- **Self-verification only (same call):** rejected — confirmation bias; insufficient.
- **Human verification only:** rejected — doesn't scale; only for highest-stakes tasks.
- **External verifier service:** rejected — adds dependency; we want in-process control.
- **Statistical / classifier-based verifier:** viable for specific patterns (hallucination classifiers); complement, not replacement.

## Maturity & Production Readiness
- Result + test verification: mature (standard engineering).
- Evidence + consistency + critic: emerging pattern (Reflexion, Self-Refine, Constitutional AI), well-grounded but tuning-intensive.
- Suitable for v1 with: **result + evidence + consistency always-on** for important tasks; **critic** for high-stakes; **test-based** for code.

## Relevant Research / Papers
- Shinn et al., "Reflexion: Language Agents with Verbal Reinforcement Learning," 2023 (arXiv:2303.11366) — verifier-in-the-loop.
- Madaan et al., "Self-Refine: Iterative Refinement with Self-Feedback," 2023 (arXiv:2303.17651).
- Bai et al., "Constitutional AI: Harmlessness from AI Feedback," 2022 (arXiv:2212.08073) — critic-style feedback.
- Cobbe et al., "Training Verifiers to Solve Math Word Problems," 2021 (arXiv:2110.14168) — verifier concept.
- *Verify exact citations at integration time.*

## Official Documentation
- No single canonical doc; this is an integration pattern.
- Related: OpenAI's "Evals" framework (for the test-based mode).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Verifiers run server-side, called by the Execution Layer at step completion.
- **Module layout:**
  - `src/server/verification/verifier.ts` — the `Verifier` interface + dispatcher.
  - `src/server/verification/modes/result.ts` — schema + constraint + goal checks (uses zod for schema).
  - `src/server/verification/modes/test.ts` — runs the test runner (delegates to Coding Agent's test infra).
  - `src/server/verification/modes/evidence.ts` — LLM entailment check per cited source.
  - `src/server/verification/modes/consistency.ts` — LLM self + memory + source consistency.
  - `src/server/verification/critic.ts` — `CriticAgent` (separate LLM call, fresh context, optional different model via Router).
  - `src/server/verification/policy.ts` — per-task-type verification policy (which modes, what order, thresholds).
- **Prisma schema:** `VerifierVerdict { id, taskId, verifierId, verdict, issues Json, confidence, latencyMs, modelUsed?, createdAt }`, `VerificationPolicy { taskType, modes String[], thresholds Json, criticEnabled Bool }`.
- **Tiered policy:** interactive chat → result + consistency only (fast); code tasks → result + test + critic; factual research → result + evidence + consistency + critic; high-stakes (irreversible/external) → all modes + ensemble critic.
- **socket.io:** `verification.failed` event → UI badge on the task; `verification.passed` → "verified" checkmark.
- **Caddy:** irrelevant directly.

## Relevance To Our Project (MiMo AI layered runtime)
This is **Layer 11 (Verification Layer)** of the 15-layer Runtime OS. It is the structural enforcement of "done ≠ success." It is consumed by Layer 10 (Execution — calls verify after each step), Layer 12 (Recovery — handles FAIL), Layer 13 (Learning — records PASS/FAIL), Layer 14 (Autonomy — autonomous tasks need stricter verification since no user is in the loop), and Layer 15 (Observability — verifier metrics).

## Recommended Usage
- **Mandatory verification for important tasks** (per project source material §8.7).
- **Tiered policy** — cheap modes always-on; expensive modes for high-stakes.
- **Independent critic** with fresh context (and optionally a different model) for high-stakes tasks.
- **Strict mode for autonomous tasks** — no user in the loop to catch errors; verifiers must.
- **Evidence-first** — uncited factual claims FAIL by default for research tasks.
- **Conservative on timeout** — verifier timeout → `NEEDS_REVISION`, not `PASS`.
- **Audit everything** — every verdict is queryable for post-hoc analysis.

## Decision
**ADOPT** — Verification Layer with 4 modes (result, test, evidence, consistency) + independent Critic Agent. Tiered per task type. Mandatory for important and autonomous tasks. No-verification **REJECTED**; self-verification-only **REJECTED**.

## Sources
- Technology inventory category 17 (Self-Improvement) #299 Evaluator Agents (P1), #300 Automatic Evaluation (P1) — lines 3191–3209.
- `docs/PROJECT_UNDERSTANDING.md` §2 (execution ≠ success), §5 (Verification components), §8.7 (verification mandatory for important tasks).
- `docs/CAPABILITY_MAP.md` §15 (Verification — result C, test-based C, evidence/source C, consistency R, critic agent R, confidence estimation R, quality gates R, regression testing R).
- Shinn et al., Reflexion, 2023 (arXiv:2303.11366).
- Madaan et al., Self-Refine, 2023 (arXiv:2303.17651).
- Bai et al., Constitutional AI, 2022 (arXiv:2212.08073).
- Cobbe et al., "Training Verifiers," 2021 (arXiv:2110.14168).
- *Inferred:* 4-mode taxonomy, tiered policy, critic-fresh-context pattern — designed for this stack.
