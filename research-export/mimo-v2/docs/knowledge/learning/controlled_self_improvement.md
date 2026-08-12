# Controlled Self-Improvement

**Category:** Learning
**Status:** IMPORTANT
**Maturity:** Emerging (LLM-specific); Mature (release-engineering primitives)

## Definition
Controlled Self-Improvement is the **gated** mechanism by which MiMo AI may modify its own *deployed production behavior* — prompts, routing policies, tool-selection strategies, skill definitions — by passing every candidate change through **evaluation → regression → approval → rollback** gates before it reaches production. It is the *deployment* counterpart to the Learning Engine: the Learning Engine observes and internalizes safely; Controlled Self-Improvement actually changes behavior, and is therefore gated.

**Critical boundary:** Learned lessons (memory/skill/strategy *records*) are always safe to write — they are data the planner may consult. **Deployed behavior changes** (which prompt the system uses by default, which model the router picks for a task class, which skill is auto-loaded) are *not* automatically safe — they alter what the system does on every subsequent task, including ones the user hasn't seen yet. Those changes must pass the gates.

## Problem Solved
- Unrestricted self-modification ("the AI rewrote its own prompt and now it's worse") is the classic failure mode of "self-improving" agents (AutoGPT, BabyAGI, etc.).
- Without a gate, a bad self-improvement can silently degrade the system across all future tasks.
- Without rollback, a regression can't be undone cleanly.
- Without approval, the user loses trust ("what did MiMo change?").

## Why It Matters
This is the **single most important safety boundary** in the Learning Layer. The project source material is explicit (`PROJECT_UNDERSTANDING.md` §8.8): *"Controlled self-improvement — gated by tests/eval/regression/approval/rollback."* The system may *learn* freely (write lessons); it may *improve deployed behavior* only under control.

## How It Works
### The 4-gate change pipeline
1. **Candidate generation** — a proposed behavior change, sourced from:
   - A high-confidence lesson from the Learning Engine ("for code-review tasks, a CoT prompt outperforms a structured prompt").
   - An automatic prompt-optimization job (e.g., DSPy-style prompt search).
   - A workflow-optimization job ("combine these two steps into one tool call").
   - A routing optimization ("route summarization to a cheaper model").
   - A skill refinement ("update the PDF-summary skill to handle tables").
2. **Evaluation gate** — the candidate is run against the Evaluation Lab's benchmark suites:
   - Must not regress on **core** benchmarks beyond a threshold (e.g., ≤2% drop on any core suite).
   - Must improve on the **target** suite (the one the change is meant to help) by a meaningful margin.
   - Adversarial tests must not break (prompt-injection resistance, safety refusals, etc.).
3. **Regression gate** — the candidate is run against:
   - Unit/integration tests of the runtime (does the new prompt break the JSON schema parser? does the new routing starve a critical task type?).
   - Smoke tests on representative real tasks (replay last N user tasks; verify quality).
4. **Approval gate** — the candidate is presented to the user with:
   - What changes (diff of prompt / routing policy / skill definition).
   - Evaluation results (before/after scores).
   - Regression results.
   - Risk assessment (what could go wrong).
   - The user **approves**, **rejects**, or **defers** (re-evaluate in a week).
5. **Deployment** — if approved, the change is written to the *production* config with:
   - `effectiveFrom: now` (or scheduled).
   - `previous: <old version>` (for rollback).
   - `canary: true` for the first N tasks (incremental rollout with auto-abort on quality drop).
6. **Rollback** — if post-deployment monitoring shows quality regression (verifier FAIL rate up, user feedback down, cost up), the change auto-rolls back to `previous`; the candidate is flagged for re-evaluation.

### What is a "deployed behavior change"?
- ✅ Changing the default system prompt for a task type.
- ✅ Changing the Model Router's preference for a task class.
- ✅ Changing which skill is auto-loaded for a task class.
- ✅ Changing a tool-selection strategy.
- ❌ Writing a lesson to memory (always safe — it's data, not behavior).
- ❌ Adding a skill to the library (safe — the planner chooses whether to use it; auto-loading is the gated part).
- ❌ Recording an experience (always safe).

## Architecture
```
Learning Engine ──high-confidence lesson──▶ Candidate Generator
                                              │
                                              ▼
                                      Candidate (proposed change)
                                              │
                          ┌───────────────────┼───────────────────┐
                          ▼                   ▼                   ▼
                    Eval Gate          Regression Gate      Approval Gate
                  (benchmarks)         (tests + smoke)      (user reviews)
                          │                   │                   │
                          └──── PASS ─────────┴──── APPROVED ──────┘
                                              │
                                              ▼
                              Deploy (canary, with previous pointer)
                                              │
                                              ▼
                              Monitor (verifier FAIL rate, feedback, cost)
                                              │ regression detected?
                                              ▼
                                          Auto-rollback
```

## Interfaces
```ts
type ChangeKind = 'prompt' | 'routing-policy' | 'skill-auto-load' | 'tool-strategy' | 'workflow';

interface ChangeCandidate {
  id: string;
  kind: ChangeKind;
  target: string;                 // e.g., 'planner.systemPrompt.codeReview'
  before: unknown;                // current production value
  after: unknown;                 // proposed value
  rationale: string;              // why (cites source lesson / optimization run)
  sourceLessonId?: string;
  evaluationResult?: EvalResult;
  regressionResult?: RegressionResult;
  approval?: { decision: 'approved'|'rejected'|'deferred'; at: Date; by: string; note?: string };
  state: 'proposed'|'evaluating'|'regression'|'pending-approval'|'approved'|'rejected'|'deployed'|'rolled-back';
  deployedAt?: Date;
  previousDeployedId?: string;    // for rollback chain
}

interface SelfImprovementGate {
  propose(candidate: ChangeCandidate): Promise<void>;
  evaluate(candidateId: string): Promise<EvalResult>;
  regression(candidateId: string): Promise<RegressionResult>;
  requestApproval(candidateId: string): Promise<void>;
  deploy(candidateId: string): Promise<void>;
  rollback(candidateId: string, reason: string): Promise<void>;
  monitor(): Promise<void>;       // periodic; auto-rollback on regression
}
```

## Dependencies
- Learning Engine (source of high-confidence lessons).
- Evaluation Lab (eval gate — benchmark suites, adversarial tests).
- Test/CI infra (regression gate — unit + integration + smoke).
- Approval Center UI (user approval).
- Config store (Prisma `BehaviorConfig` table with version history).
- Observability (post-deployment monitoring — verifier FAIL rate, user feedback, cost).
- Task Queue (eval/regression jobs run async).
- Model Gateway (eval jobs need model calls).

## Strengths
- **Safe by construction** — no behavior change reaches production without all 4 gates.
- **Auditable** — every change has a full trail (rationale, eval, regression, approval, deployment, monitoring).
- **Reversible** — rollback is one operation; previous version always available.
- **Incremental** — canary deployment catches issues before full rollout.
- **Trust-preserving** — the user sees every change and its evidence.
- **Decoupled from learning** — the Learning Engine writes freely; only *deployed* changes are gated.

## Weaknesses
- **Slow** — eval + regression + approval is hours-to-days, not real-time. Mitigation: this is intentional; safety > speed for behavior changes.
- **Eval-suite coverage** — gates are only as good as the benchmarks. A change that passes eval but breaks an uncovered scenario still ships. Mitigation: grow the eval suite continuously; include real-task replays.
- **Approval fatigue** — too many candidates → user rubber-stamps. Mitigation: batch approvals; only surface high-impact candidates; auto-reject low-confidence ones.
- **Canary false-negatives** — a regression may not appear in the first N canary tasks. Mitigation: longer canary windows for high-risk changes.
- **Optimization local minima** — auto-prompt-optimization may converge on a prompt that's good on the eval suite but bad in real use. Mitigation: real-task replays in the regression gate.

## Failure Modes
- **Gate bypass** — a developer applies a behavior change directly to config without the pipeline → untracked change. Mitigation: the config store rejects writes that don't reference a `ChangeCandidate` (architectural enforcement).
- **Bad eval suite** — passes a regression. Mitigation: continuous eval-suite growth; user can flag "this candidate is bad in practice" → feeds back into eval.
- **Approval rubber-stamping** — user approves without reading. Mitigation: surface risk + diff prominently; require explicit confirmation for high-risk changes.
- **Rollback failure** — `previous` version is corrupt or incompatible. Mitigation: rollback is itself tested; previous versions are immutable.
- **Cascade** — change A enables change B which breaks C. Mitigation: deploy changes serially, not in parallel; canary each.
- **Monitoring blind spot** — regression not detected because the metric isn't tracked. Mitigation: monitor verifier FAIL rate, user-feedback sentiment, cost, latency — broadly.

## Security Implications
- **Behavior changes can introduce vulnerabilities** — a "smart" new prompt may be more susceptible to prompt injection. Mitigation: adversarial tests in the eval gate; security review for high-risk changes.
- **Auto-rollback is a safety mechanism** — must not be bypassable; if monitoring shows a critical regression, auto-rollback fires regardless of approval state.
- **Approval as audit** — every change has an approver of record; the user is the default approver (no auto-approval for v1).
- **Candidate provenance** — every candidate cites its source (lesson / optimization run); no anonymous changes.
- **No self-modification of the gates** — the gates themselves (this pipeline) are not a candidate for self-improvement; they are fixed policy. Mitigation: architectural — the SelfImprovementGate code is not in the candidate-target namespace.

## Performance Implications
- Eval gate: minutes-to-hours per candidate (benchmark suite run); runs async.
- Regression gate: minutes (test suite + smoke replays); runs async.
- Approval gate: latency = user response time.
- Deployment: instant (config write); canary period (N tasks or T time).
- Monitoring: continuous; auto-rollback decision in seconds.

## Operational Implications
- Need an **Approval Center UI** — list of pending candidates, each with diff, eval results, regression results, risk; approve/reject/defer buttons.
- Need a **Change History** view — deployed changes, rollback chain, monitoring metrics.
- Need a **canary runner** — deploys the change to a fraction of tasks (or first-N-tasks mode) and monitors.
- Need an **auto-rollback monitor** — continuous check of post-deployment metrics.
- Need a **candidate source policy** — how often to generate candidates, max concurrency (don't generate 100 candidates at once).

## Alternatives
- **Unrestricted self-modification:** explicitly **REJECTED** — unsafe; forbidden by project source material.
- **No self-improvement (frozen behavior):** rejected — fails the "improves over time" goal; but a reasonable fallback mode if gates are down.
- **Human-only changes (no auto-candidates):** viable as a stricter mode; the pipeline still useful for tracking.
- **Continuous deployment (no approval gate):** rejected for v1 — too risky for a personal AI; revisit with strong eval coverage.

## Maturity & Production Readiness
- The gates (eval / regression / approval / rollback) are mature release-engineering primitives.
- LLM-specific behavior-change evaluation is emerging — quality depends on the Evaluation Lab.
- Suitable for v1 with: **manual approval for all changes** (no auto-deploy); auto-rollback enabled; canary on for high-risk changes.

## Relevant Research / Papers
- DSPy (Khattab et al., 2023) — automatic prompt optimization; relevant to candidate generation.
- AutoGPT/BabyAGI (2023) — cautionary tales on unrestricted self-modification.
- Reflexion (Shinn et al., 2023) — reflection → improvement, but without deployment gates (we add them).
- "Evals as a guardrail" — OpenAI/Anthropic evals documentation.
- *Verify exact citations at integration time.*

## Official Documentation
- DSPy: `https://dspy.ai/`.
- OpenAI Evals: `https://github.com/openai/evals`.
- Anthropic evals: `https://docs.anthropic.com/en/docs/test-and-evaluate`.
- Release-engineering patterns (canary, rollback) — standard SRE literature.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** The gate runs server-side; candidates are persisted; eval/regression jobs run as Task Queue workers.
- **Module layout:**
  - `src/server/learning/self-improvement/gate.ts` — `SelfImprovementGate` class.
  - `src/server/learning/self-improvement/candidate.ts` — candidate generation (from lessons / optimization jobs).
  - `src/server/learning/self-improvement/eval.ts` — runs Evaluation Lab suites on a candidate.
  - `src/server/learning/self-improvement/regression.ts` — runs test + smoke replays.
  - `src/server/learning/self-improvement/deploy.ts` — config write + canary + previous pointer.
  - `src/server/learning/self-improvement/monitor.ts` — post-deployment monitoring + auto-rollback.
- **Prisma schema:** `ChangeCandidate { ...as above }`, `BehaviorConfig { key, currentValue Json, version, previousValue Json?, candidateId, effectiveFrom, canaryUntil? }`, `RollbackEvent { candidateId, reason, metricsSnapshot Json, at }`.
- **Config store enforcement:** the runtime reads behavior config *only* from `BehaviorConfig` (versioned); direct writes to the underlying Prisma rows by other modules are forbidden (lint rule + code review).
- **Approval Center UI:** Next.js route `/approvals` with a list of pending candidates; each card shows diff (monaco editor for prompt diffs), eval results (charts), regression results, risk; approve/reject/defer buttons.
- **socket.io:** `candidate.proposed` event → UI notification; `candidate.deployed` / `candidate.rolled-back` events → toast.
- **Canary:** for high-risk changes, deploy with `canaryUntil = now + 24h` and a 10% task fraction; monitor verifier FAIL rate; auto-rollback if > threshold.
- **Caddy:** irrelevant directly.

## Relevance To Our Project (MiMo AI layered runtime)
Controlled Self-Improvement is the *deployment* half of **Layer 13 (Learning Layer)**. The Learning Engine produces candidate lessons safely; this gate decides which lessons (or which optimization outputs) actually become *production behavior*. It depends on Layer 18 (Evaluation), Layer 15 (Security/Observability), and the Approval Center UI (Layer UI). It is the structural enforcement of "controlled autonomy" — the system may improve itself, but only under gates that the user controls.

## Recommended Usage
- **Adopt the 4-gate pipeline for all deployed behavior changes.**
- **Manual approval for all changes in v1** (no auto-deploy).
- **Auto-rollback enabled** — if post-deployment monitoring shows regression, roll back automatically and notify the user.
- **Canary for high-risk changes** (prompts, routing) — 10% task fraction, 24h window.
- **Candidate generation is conservative** — only high-confidence lessons or well-evidenced optimization runs become candidates; low-confidence ones stay as lessons (data, not behavior).
- **The gates themselves are not candidates** — fixed policy; no self-modification of the self-improvement process.
- **Audit everything** — every candidate, every gate result, every approval, every rollback.

## Decision
**ADOPT** — Controlled Self-Improvement with the 4-gate pipeline (eval → regression → approval → rollback) for all deployed behavior changes. Hard boundary: the Learning Engine may write lessons freely; *deployed* changes require all gates. Unrestricted self-modification **REJECTED**. Auto-deploy **DEFERRED** (v1 requires manual approval for all changes).

## Sources
- Technology inventory category 17 (Self-Improvement) lines 3059–3240 — esp. #287 Self-Improving Agents (P2), #292 Automatic Prompt Optimization (P2), #293 Automatic Workflow Optimization (P2), #294 Agent Learning (P2), #298 Policy Improvement (P3), #302 Workflow Auto-Build (P3).
- `docs/PROJECT_UNDERSTANDING.md` §2 (self-reflection ≠ learning), §3 (controlled autonomy), §8.8 (controlled self-improvement gated by tests/eval/regression/approval/rollback).
- `docs/CAPABILITY_MAP.md` §14 (Controlled self-improvement — I; strategy improvement — I).
- Shinn et al., Reflexion, 2023 (arXiv:2303.11366).
- Khattab et al., DSPy, 2023 (arXiv:2310.03714) — *verify citation*.
- OpenAI Evals: `https://github.com/openai/evals`.
- Anthropic evals docs: `https://docs.anthropic.com/en/docs/test-and-evaluate`.
- *Inferred:* 4-gate pipeline, candidate taxonomy, canary + auto-rollback design — designed for this stack; the boundary "lessons safe / deployed changes gated" is the project's explicit policy.
