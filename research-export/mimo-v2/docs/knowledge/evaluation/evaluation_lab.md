# Evaluation Lab

**Category:** Evaluation
**Status:** REQUIRED
**Maturity:** Mature (benchmark pattern); Emerging (LLM-agent-specific)

## Definition
The Evaluation Lab is the subsystem that runs **benchmark suites**, **regression tests**, and **adversarial evaluations** against MiMo AI's components (model, reasoning, agent, memory, tool-use, long-horizon, autonomy, security) and against candidate behavior changes (from Controlled Self-Improvement). It produces the `qualityScore` used by the Model Router and the **pass/fail evidence** used by the self-improvement gates.

## Problem Solved
- "The system feels better" is not evidence — evaluation must be reproducible, quantitative, and versioned.
- Without regression tests, a change that helps one task class may silently break another.
- Without adversarial evaluation, prompt-injection and safety regressions slip through.
- Without per-component evaluation, you can't tell whether a quality drop is the model, the planner, the memory, or the tool layer.
- Without independent evaluation, the Self-Improvement Gate has no objective signal.

## Why It Matters
Evaluation is the **objective ground truth** for the whole system. It feeds the Router (which model is best for which task), the Self-Improvement Gate (does this candidate improve or regress), the Learning Engine (which strategies work), and the user's trust (here's how MiMo performs on standard tasks). Without it, "improvement" is vibes; with it, improvement is measurable.

## How It Works
### Suite types
1. **Benchmark suites** — public datasets adapted for MiMo:
   - **Simple Q&A** — factual recall (subset of MMLU, TriviaQA, NaturalQuestions).
   - **Reasoning** — logico-mathematical (GSM8K, MATH, BBH subset).
   - **Code** — code generation/repair (HumanEval, MBPP, SWE-bench-lite subset).
   - **Long-horizon** — multi-step tasks (a custom MiMo suite; see below).
   - **Retrieval** — RAG quality (BEIR subset, custom personal-corpus suite).
   - **Tool use** — function-calling accuracy (BFCL subset, custom tool suites).
   - **Multimodal** — image understanding (MMMU subset, custom screenshot suite).
2. **Regression suites** — MiMo-specific scenarios built from real user tasks:
   - Replays of past tasks with known-good outputs; new code must reproduce them.
   - One suite per task type (chat, code-review, summarize-PDF, browser-task, KG-extract, ...).
   - Grows over time as users flag "this is what good looks like."
3. **Adversarial suites** — safety/robustness:
   - Prompt-injection attacks (embedded in retrieved content, tool outputs, user messages).
   - Data-exfiltration attempts (will the system leak secrets?).
   - Refusal tests (does it correctly refuse harmful requests?).
   - Permission-bypass attempts (does an autonomous action try to exceed its scope?).
   - Hallucination stress (will it fabricate citations?).

### Evaluation methods
- **Exact match / F1** — for factual QA.
- **LLM-as-judge** — a strong model (different from the one under test, via Router) scores the output on a rubric. Used for open-ended tasks.
- **Test execution** — for code tasks (run tests, count pass).
- **Assertion checks** — for browser/tool tasks (did the page state match? did the tool call have correct args?).
- **Human spot-check** — a sample of outputs reviewed by the user periodically.
- **Trajectory scoring** — for long-horizon: did the agent take efficient steps? how many retries? cost?

### Suite structure
```ts
interface EvalSuite {
  id: string;
  name: string;
  type: 'benchmark'|'regression'|'adversarial';
  component: 'model'|'reasoning'|'agent'|'memory'|'tool-use'|'long-horizon'|'autonomy'|'security';
  cases: EvalCase[];
  scoringMethod: ScoringMethod;
  rubric?: string;               // for LLM-as-judge
  baselineScore?: number;        // last known good score
  threshold?: number;            // minimum acceptable score (regression gate)
}

interface EvalCase {
  id: string;
  input: unknown;                // task spec
  expectedOutput?: unknown;      // for exact-match / assertion
  expectedAssertions?: Assertion[];  // for state checks
  timeout?: number;
  budget?: { maxCostUsd: number; maxSteps: number };
}

interface EvalRun {
  id: string;
  suiteId: string;
  candidateId?: string;          // if run for self-improvement
  modelConfig: { provider, model, prompt };
  results: EvalCaseResult[];
  summary: { score, passRate, avgCostUsd, avgLatencyMs, durationMs };
  startedAt, finishedAt: Date;
}
```

### Pipeline
```
Trigger (manual / candidate-from-self-improvement / nightly cron)
    │
    ▼
Run suite cases ──▶ collect outputs ──▶ score (exact / LLM-judge / test-exec / assertion)
    │
    ▼
EvalRun persisted with full results
    │
    ├─▶ Self-Improvement Gate (regression check)
    ├─▶ Router qualityScore update
    ├─▶ Learning Engine (which strategies won)
    └─▶ Dashboard (trend charts)
```

## Architecture
```
┌──────────────────────────────────────────────────────────────┐
│  Evaluation Lab                                              │
│    Suites: benchmark / regression / adversarial              │
│    Methods: exact / F1 / LLM-judge / test-exec / assertion   │
│    Runner: Task Queue job, parallelized, budget-bounded      │
│    Storage: EvalRun, EvalCaseResult (Prisma)                 │
└────────────┬─────────────────────────────────────────────────┘
             │ feeds
             ▼
  ┌──────────────────────┐  ┌────────────────────┐  ┌────────────────────┐
  │ Self-Improvement Gate│  │ Model Router       │  │ Learning Engine    │
  │ (regression check)   │  │ (qualityScore)     │  │ (which strategies) │
  └──────────────────────┘  └────────────────────┘  └────────────────────┘
             │
             ▼
       Observability Dashboard (trend charts, regressions alerted)
```

## Interfaces
```ts
interface EvaluationLab {
  registerSuite(suite: EvalSuite): Promise<void>;
  runSuite(suiteId: string, opts: { candidateId?: string; modelConfig?: ModelConfig; parallelism?: number }): Promise<EvalRun>;
  compareRuns(runIds: string[]): Promise<ComparisonReport>;
  trend(suiteId: string, window: { from: Date; to: Date }): Promise<TrendReport>;
  exportResults(runId: string): Promise<EvalExport>;
}
```

## Dependencies
- Task Queue (eval runs are long; run as jobs).
- Model Gateway (cases need model calls; LLM-judge needs a separate model).
- Tool Layer + Agent Layer (long-horizon cases need full agent execution).
- Memory + Knowledge (cases may exercise retrieval).
- Verification Layer (some cases use the verifier as a scorer).
- Prisma (EvalSuite, EvalRun, EvalCaseResult tables).
- Observability (eval-run metrics).

## Strengths
- **Objective** — quantitative scores replace vibes.
- **Reproducible** — pinned model config + pinned suite version = comparable runs.
- **Multi-component** — isolates where regressions come from.
- **Adversarial** — catches safety regressions before users do.
- **Feeds the gates** — gives the Self-Improvement Gate objective pass/fail evidence.
- **Grows with use** — regression suite accumulates real-user scenarios.

## Weaknesses
- **Coverage gap** — eval suites only catch what they test; uncovered scenarios still ship. Mitigation: grow the regression suite from real failures.
- **LLM-as-judge bias** — judge models have preferences; may penalize valid alternative phrasings. Mitigation: rubric clarity; multiple judges for high-stakes.
- **Cost** — full suite runs can be expensive (many LLM calls). Mitigation: sample subsets for routine runs; full suite for candidate evaluation.
- **Stale benchmarks** — public benchmarks leak into training data; scores inflate. Mitigation: weight the custom MiMo regression suite higher than public benchmarks.
- **Adversarial arms race** — attackers evolve; adversarial suite must too.
- **Long-horizon eval is slow** — full agent runs take minutes-to-hours per case. Mitigation: smaller long-horizon suite for routine runs.

## Failure Modes
- **Suite rot** — benchmarks drift out of relevance. Mitigation: annual suite review; retire stale cases.
- **Overfitting to the suite** — self-improvement candidates optimize for the suite at the expense of real use. Mitigation: real-task replays in the regression gate; held-out cases not used for optimization.
- **Judge inconsistency** — same case scored differently across runs. Mitigation: temperature 0 for judge; multiple judges + majority.
- **Run divergence** — a case that used to pass now fails for environmental reasons (API change, model upgrade), not code change. Mitigation: pin model versions; record environment in EvalRun.
- **Budget overrun** — long-horizon case runs away. Mitigation: per-case `budget.maxCostUsd` and `maxSteps`.

## Security Implications
- **Adversarial suite is sensitive** — contains attack patterns; restrict access; don't log to client-visible dashboards.
- **Eval results may leak PII** — if regression cases include real user data. Mitigation: anonymize regression cases before storing; separate "real task replays" from shareable benchmark results.
- **Self-improvement gaming** — a malicious candidate could try to modify the eval suite to pass. Mitigation: suites are not in the candidate-target namespace (architectural); suite changes require human review.

## Performance Implications
- Routine runs (subset, nightly): minutes-to-tens-of-minutes.
- Full candidate evaluation: hours; runs async.
- Storage: full case outputs can be large; retention policy (drop raw outputs after N days, keep scores).

## Operational Implications
- Need a **suites registry** — list of suites, their cases, baselines, thresholds.
- Need a **run scheduler** — nightly routine runs; on-demand candidate runs.
- Need a **dashboard** — trend charts per suite; alert on regression below threshold.
- Need a **suite-growth workflow** — turn real user task + good output into a regression case (with user consent).
- Need a **model-pinning policy** — eval runs pin model versions for reproducibility.

## Alternatives
- **No evaluation:** rejected — no objective signal; "improvement" is vibes.
- **Manual testing only:** rejected — doesn't scale; not reproducible.
- **Public benchmarks only (no MiMo regression suite):** rejected — public benchmarks drift and leak; real-user scenarios matter more.
- **External eval services (Scale AI, etc.):** rejected for v1 — cost + privacy; revisit for specialized adversarial testing.
- **OpenAI Evals framework:** viable as a runner; *evaluate — may save boilerplate; not adopted as a hard dependency.*

## Maturity & Production Readiness
- Benchmark + regression patterns: mature (standard SRE/test-engineering).
- LLM-as-judge: mature in practice, with known caveats.
- Long-horizon + autonomy + security eval: emerging — active research area.
- Suitable for v1 with: a starter regression suite (10–20 cases per task type), a small public-benchmark subset, a basic adversarial suite (prompt-injection + refusal + exfiltration), LLM-as-judge with rubrics.

## Relevant Research / Papers
- "Evaluating Long-Horizon LLM Agents" — *survey; verify citation*.
- SWE-bench (Jimenez et al., 2024) — code-task evaluation.
- BFCL (Berkeley Function-Calling Leaderboard) — tool-use evaluation.
- BEIR (Thakur et al., 2021) — retrieval evaluation.
- "LLM-as-a-Judge: Bias and Beyond" (Zheng et al., 2023) — judge biases.
- AgentBench (Liu et al., 2023) — agent evaluation.
- *Verify exact citations at integration time.*

## Official Documentation
- OpenAI Evals: `https://github.com/openai/evals`.
- Anthropic evals: `https://docs.anthropic.com/en/docs/test-and-evaluate`.
- SWE-bench: `https://www.swebench.com/`.
- BFCL: `https://gorilla.cs.berkeley.edu/leaderboard.html`.
- BEIR: `https://arxiv.org/abs/2104.08663`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Eval runs are Task Queue jobs; the lab is a server-side module.
- **Module layout:**
  - `src/server/eval/lab.ts` — `EvaluationLab` class.
  - `src/server/eval/suites/` — one file per suite (benchmark/reasoning, benchmark/code, regression/chat, regression/code-review, adversarial/prompt-injection, etc.).
  - `src/server/eval/scorers/` — exact, F1, llm-judge, test-exec, assertion.
  - `src/server/eval/runner.ts` — parallelized case runner with budget enforcement.
  - `src/server/eval/compare.ts` — run-to-run comparison + trend reports.
- **Prisma schema:** `EvalSuite { id, name, type, component, scoringMethod, rubric?, baselineScore?, threshold?, version }`, `EvalCase { id, suiteId, input Json, expectedOutput Json?, expectedAssertions Json?, timeout?, budget Json? }`, `EvalRun { id, suiteId, candidateId?, modelConfig Json, summary Json, startedAt, finishedAt }`, `EvalCaseResult { id, runId, caseId, output Json?, score, latencyMs, costUsd, error? }`.
- **Runner:** Task Queue job `eval-run` that parallelizes cases (concurrency bounded by `parallelism` and budget); per-case deadlines + cost ceilings.
- **LLM-judge:** uses a *different* model from the one under test (Router picks a strong model for judging); temperature 0; rubric in the prompt.
- **Dashboard:** Next.js route `/eval` with trend charts per suite, recent runs, regression alerts; zustand store consumes `eval.run-finished` socket.io events.
- **Caddy:** irrelevant directly.
- **Suite growth:** a UI action "save this task as a regression case" (with user consent) wraps a finished task's input + verified output into a new `EvalCase`.

## Relevance To Our Project (MiMo AI layered runtime)
The Evaluation Lab is part of **Layer 15 (Security / Observability / Evaluation)**. It is consumed by:
- Layer 1 (Model Router) — `qualityScore` per model.
- Layer 13 (Learning) — which strategies win on the suites.
- Layer 13 (Controlled Self-Improvement) — eval gate + regression gate evidence.
- Layer 15 (Observability) — trend dashboards, regression alerts.
- Layer 15 (Security) — adversarial suite catches safety regressions.

## Recommended Usage
- **Adopt from day one** with a starter regression suite (10–20 cases per task type).
- **Nightly routine runs** on a subset; full suite on candidate evaluation.
- **LLM-as-judge with rubrics** for open-ended tasks; *different* model from the one under test.
- **Adversarial suite** mandatory — prompt-injection, refusal, exfiltration, permission-bypass.
- **Real-task replays** in the regression gate (not just synthetic cases).
- **Pin model versions** per run for reproducibility.
- **Grow the regression suite** from real user tasks (with consent).
- **Retire stale cases** annually.

## Decision
**ADOPT** — Evaluation Lab with benchmark + regression + adversarial suites; multiple scoring methods (exact/F1/LLM-judge/test-exec/assertion); feeds the Self-Improvement Gate, the Model Router, and the Observability dashboard. Mandatory input to all deployed behavior changes.

## Sources
- Technology inventory category 17 (Self-Improvement) #299 Evaluator Agents (P1), #300 Automatic Evaluation (P1).
- `docs/PROJECT_UNDERSTANDING.md` §5 (Evaluation components: model/reasoning/agent/memory/tool-use/long-horizon/autonomy/security evaluation, regression, benchmark suites, adversarial evaluation), §8.8 (controlled self-improvement gated by eval/regression).
- `docs/CAPABILITY_MAP.md` §18 (Evaluation — benchmark suites R, regression R, adversarial I, per-component R, long-horizon/autonomy/security I).
- Jimenez et al., SWE-bench, 2024 (arXiv:2310.06770) — *verify citation*.
- Liu et al., AgentBench, 2023 (arXiv:2308.03688) — *verify citation*.
- Zheng et al., "LLM-as-a-Judge," 2023 (arXiv:2306.05685).
- Thakur et al., BEIR, 2021 (arXiv:2104.08663).
- OpenAI Evals: `https://github.com/openai/evals`.
- Anthropic evals: `https://docs.anthropic.com/en/docs/test-and-evaluate`.
- *Inferred:* suite taxonomy, runner design, dashboard integration — designed for this stack.
