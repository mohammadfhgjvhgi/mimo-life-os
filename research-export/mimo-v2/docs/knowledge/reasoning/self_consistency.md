# Self-Consistency (Multi-Sample Voting)

**Category:** Reasoning
**Status:** IMPORTANT
**Maturity:** Production-ready

## Definition
A decoding strategy that samples N independent CoT trajectories for the same prompt (using temperature > 0) and selects the most common final answer by majority vote. The single most-supported answer is returned rather than the single greedy chain.

## Problem Solved
A single CoT sample can be wrong because the model commits to one chain that may diverge at an early step. Sampling N chains produces a *distribution* of answers; the mode of that distribution is empirically far more accurate than any individual sample, because correct answers tend to recur across samples while errors are typically uncorrelated.

## Why It Matters
It is the cheapest inference-time compute-scaling lever that meaningfully improves answer accuracy on hard reasoning tasks. No model weights change; no fine-tuning; no extra context. It is also a built-in **uncertainty signal** — agreement ratio tells you how confident the system should be.

## How It Works
1. Run the same CoT prompt N times (typical N = 5–40) with `temperature ≈ 0.5–0.7` to encourage diversity.
2. Extract the final answer from each chain (parsing depends on answer type: numeric, multiple-choice, JSON value, free-text).
3. Cluster answers by equivalence (exact match for MC; numeric tolerance for math; semantic similarity for free-text).
4. Return the mode; report agreement ratio = `count(mode) / N` as confidence.

## Architecture
Lives in the Reasoning Layer as a wrapper over the standard CoT path. Runs N parallel model calls via the Model Layer gateway (concurrent requests). The Aggregation step is a pure TS function. Output is a single answer plus a confidence score, consumed by Verification Layer and Executive Layer (which can decide whether to escalate low-confidence answers).

## Interfaces
- `selfConsistentAnswer(prompt: ReasoningRequest, n: number): Promise<{ answer, confidence, samples }>` returning the winning answer, agreement ratio, and the underlying samples for traceability.
- `aggregateAnswers(samples: Answer[], mode: 'exact' | 'numeric' | 'semantic'): VoteResult` — pluggable aggregation.

## Dependencies
- CoT-capable model with non-zero temperature support (GLM-5.2 yes).
- Concurrent request execution (Promise.all with bounded concurrency).
- Aggregation strategy per answer type.

## Strengths
- Substantial accuracy lift on math, logic, multi-hop QA (often 5–20 percentage points).
- Cheap to implement; no training.
- Provides a free confidence signal (agreement ratio).
- Composes with structured reasoning (vote on structured outputs).

## Weaknesses
- N× cost and latency — impractical for high-N on every call.
- Only works for answer types where equivalence is well-defined (hard for free-text).
- Diversity depends on temperature — too low, all samples identical; too high, quality degrades.
- Doesn't help if the model is systematically wrong (correlated errors).

## Failure Modes
- **Correlated errors**: model consistently makes the same mistake across all N samples.
- **Aggregation ambiguity**: free-text answers don't cluster cleanly.
- **Runaway cost**: high N on every call drains budget.
- **False confidence**: high agreement on a wrong answer (model is confidently wrong).

## Security Implications
- N parallel requests multiply token output — sensitive data in outputs is multiplied N× in logs.
- Aggregation logic must be deterministic and audited (a malicious aggregation could pick a minority wrong answer).
- Cache N-sample results to avoid recomputing identical prompts.

## Performance Implications
- Wall-clock: bounded by slowest sample (use parallel requests).
- Cost: linear in N.
- Cache hits dramatically reduce cost for repeated prompts.

## Operational Implications
- Need per-task N budget (high-stakes → N=20; everyday → N=1).
- Need cache for identical prompts (especially for evaluation runs).
- Need metrics: agreement ratio distribution, accuracy lift vs N.

## Alternatives
- Single CoT — faster, weaker on hard tasks.
- Best-of-N with a verifier — pick best sample by a learned verifier (more expensive, more accurate).
- Universal Self-Consistency — model itself votes on which chain is best (no separate parser).
- Tree-of-Thought — branching search with evaluator (more powerful, far more expensive).

## Maturity & Production Readiness
Production-ready. Standard technique since 2022. Supported implicitly by any provider that allows temperature sampling.

## Relevant Research / Papers
- Wang et al., 2022 — *Self-Consistency Improves Chain of Thought Reasoning in Language Models*. (canonical)
- Chen et al., 2023 — *Universal Self-Consistency for Language Models*.

## Official Documentation
- Covered in most LLM prompting guides (OpenAI, Anthropic).
- LangChain Self-Consistency cookbook.

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement `lib/reasoning/self-consistency.ts` with bounded concurrency (use `p-limit`).
- Default N by task class: high-stakes verification → N=10; everyday → N=1 (disabled).
- Cache sample sets keyed by `hash(prompt) + modelVersion` in Prisma `ReasoningCache` table (SQLite with index on hash).
- Aggregation strategies:
  - **Exact**: `string === string` for MC / enum answers.
  - **Numeric**: tolerance-based for math answers.
  - **Semantic**: embed each free-text answer, cluster by cosine similarity, pick largest cluster's centroid.
- Return `confidence = count(mode) / N` to the Verification Layer and surface in the Next.js UI as a confidence bar.
- Stream only the winning answer to the user (hide the N raw samples by default; expose in a "Show samples" drawer for debugging).

## Relevance To Our Project (MiMo AI specifically)
Self-Consistency is the **inference-time compute scaling lever** for MiMo's Reasoning Layer. The Executive Layer uses it selectively on high-stakes decisions (e.g., "should we run this destructive tool?"). The Verification Layer consumes the agreement ratio as a confidence input. It directly satisfies `CAPABILITY_MAP.md` §1 (Self-consistency = I; Inference-time compute scaling = I) and supports the principle that confidence scoring (§1, C) needs a real signal — agreement ratio is one of the cheapest.

## Recommended Usage
- Use selectively on high-stakes tasks (destructive tools, irreversible actions, public-facing outputs).
- Default N=10 for verification tasks; N=1 (disabled) for everyday chat.
- Always expose agreement ratio as confidence.
- Cache aggressively to control cost.
- Combine with structured reasoning so aggregation is well-defined.

## Decision
**ADOPT** — cost-effective accuracy + free confidence signal; required for Verification Layer's confidence estimation.

## Sources
- Wang et al., 2022, arXiv:2203.11171.
- Chen et al., 2023, arXiv:2311.17311.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #3 (P1).
- Internal: `docs/CAPABILITY_MAP.md` §1 (Self-consistency = I).
