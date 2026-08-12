# Chain-of-Thought (CoT)

**Category:** Reasoning
**Status:** CORE
**Maturity:** Production-ready

## Definition
A prompting / decoding technique in which the model is induced (via prompt, fine-tune, or trained-in behavior) to emit intermediate reasoning steps before producing a final answer. The model literally "thinks out loud" in natural language before committing to an output.

## Problem Solved
LLMs frequently fail on multi-step tasks (arithmetic, logical, planning) when forced to produce the answer in a single forward pass: the answer token is sampled before the model has done the deductive work. CoT moves computation from a single token decision into a sequence of intermediate tokens that progressively narrow the answer distribution.

## Why It Matters
It is the foundational primitive that unlocks every other reasoning pattern in this knowledge base. ReAct, Plan-and-Solve, Self-Consistency, Reflection, and structured reasoning all assume a model that can produce coherent stepwise thought. Without reliable CoT, the higher-order reasoning layer cannot exist.

## How It Works
1. The prompt is augmented with an instruction like "Let's think step by step" (zero-shot CoT) or with worked examples whose answers include rationales (few-shot CoT).
2. The model autoregressively generates a chain of intermediate tokens `t1..tn` conditioned on the question.
3. The final answer `a` is then generated conditioned on `question + t1..tn`.
4. Mathematically, this factorises `P(a | q)` into `Σ_t P(t | q) · P(a | q, t)`, letting the model allocate more compute (more tokens) to harder problems.

## Architecture
Lives in the **Reasoning Layer** of MiMo's runtime. Inputs: task + context (from Context Layer). Outputs: structured thought trace + final answer. The thought trace is logged to the **Observability Layer** and may be persisted to **Memory Layer** (episodic / failure memory) for later learning. It runs on top of the **Model Layer** gateway (GLM-5.2 first; provider-agnostic).

## Interfaces
- `runCoT(prompt: ReasoningRequest): Promise<ReasoningResult>` returning `{ trace: ThoughtStep[], answer: string, confidence: number }`.
- Consumes `Context` (assembled prompt) from Context Layer.
- Emits `ThoughtStep` events to the socket.io bus for live UI streaming.
- Produces trace consumable by Verification Layer (each step is a verifiable claim).

## Dependencies
- Model Layer gateway with streaming + structured-output support.
- Tokeniser for accurate budget accounting.
- (Optional) fine-tuned CoT checkpoint for hard domains — not required for GLM-5.2 which has CoT behaviour built in.

## Strengths
- Trivially easy to enable; requires no architecture change.
- Composes cleanly with all other reasoning patterns.
- Trace is human-readable → debuggable and auditable.
- Strong lift on arithmetic, symbolic, and multi-hop QA benchmarks.

## Weaknesses
- Linear only — no branching or backtracking (use ToT / Plan-and-Solve for that).
- Long traces inflate latency and cost.
- The model can produce a confident-sounding but wrong chain (plausible-reasoning failure).
- Trace leakage can expose internal reasoning that should stay hidden in agent-to-agent comms.

## Failure Modes
- **Hallucinated intermediate steps**: a fluent chain that is logically invalid.
- **Runaway chains**: model never converges to an answer without a stop signal / budget.
- **Format drift**: trace format degrades over long sessions.
- **Distraction**: an early wrong step poisons all downstream steps.

## Security Implications
- Trace text may contain data exfiltrated from earlier context (prompt-injection leakage). Sanitise before echoing to untrusted UI.
- A visible CoT trace gives attackers a side-channel to probe system prompts. Consider hidden reasoning for sensitive flows.

## Performance Implications
- Latency grows roughly linearly with chain length.
- Cost (token usage) grows with chain length.
- Use budget caps + early-stop heuristics to control.

## Operational Implications
- Need per-task budget (max thought tokens).
- Need trace storage policy (retention, redaction).
- Need metrics: avg chain length, chain length by task class, answer-correctness vs chain length.

## Alternatives
- Direct answer (no CoT) — faster, weaker on multi-step.
- Tree-of-Thought — branching search; more expensive, better on hard search problems.
- Plan-and-Solve — explicit plan then execute; better for multi-step task execution.
- Program-aided Language Models (PAL) — emit code instead of natural-language reasoning.

## Maturity & Production Readiness
Production-ready since 2022; built into frontier models (including GLM-5.2) as a default capability. No research risk for adoption.

## Relevant Research / Papers
- Wei et al., 2022 — *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models*. (canonical reference)
- Kojima et al., 2022 — *Large Language Models are Zero-Shot Reasoners* ("let's think step by step").
- Wang et al., 2022 — *Self-Consistency Improves Chain-of-Thought Reasoning* (companion technique).

## Official Documentation
- OpenAI prompting guide (CoT section).
- Anthropic prompt engineering docs (extended thinking).
- Z.ai GLM-5.2 model card — reasoning capabilities.

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement as a pure TS module `lib/reasoning/cot.ts` invoked by the Reasoning Layer service.
- Stream the trace over socket.io to the Next.js console (App Router server action publishes to the room for the current task id).
- Persist trace rows in SQLite via Prisma model `ReasoningTrace { id, taskId, stepIndex, content, tokens, createdAt }` — indexed on `taskId` for fast retrieval.
- Budget enforcement: hard cap via `maxTokens` on the gateway call; soft cap via a watcher that emits a `chain:too-long` metric.
- Use z-ai-web-dev-sdk chat completions with `stream: true`; parse trace segments by delimiter token (e.g., `<step>...</step>`) which GLM-5.2 supports natively.
- Never block the UI thread — run via the Execution Layer's background worker and stream results.

## Relevance To Our Project (MiMo AI specifically)
CoT is the **default reasoning mode** for the Reasoning Layer. The Executive Layer uses it for everyday tasks; harder tasks escalate to ReAct, Plan-and-Solve, or structured reasoning. The trace is the primary input to the Verification Layer (each step is testable) and to the Learning Layer (failure traces become failure-memory entries). It is also the substrate on which Reflection operates — Reflexion literally critiques a CoT trace.

## Recommended Usage
- Default to CoT for any task requiring more than a single token's worth of deduction.
- Combine with Self-Consistency for high-stakes answers (sample N chains, vote).
- Switch to ReAct when external information is needed mid-chain.
- Switch to Plan-and-Solve when task has ≥3 sequential sub-tasks.

## Decision
**ADOPT** — foundational reasoning primitive; required for every higher-order pattern.

## Sources
- Wei et al., 2022, arXiv:2201.11903.
- Kojima et al., 2022, arXiv:2205.11916.
- Wang et al., 2022, arXiv:2203.11171.
- Z.ai GLM-5.2 documentation (inferred capability from public Z.ai model family).
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #1 (P0).
- Internal: `docs/CAPABILITY_MAP.md` §1 — Chain-of-Thought reasoning = C.
