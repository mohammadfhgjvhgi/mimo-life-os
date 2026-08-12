# Plan-and-Solve

**Category:** Reasoning
**Status:** CORE
**Maturity:** Production-ready

## Definition
A two-phase reasoning pattern: (1) **Plan** — the model decomposes the task into an ordered list of sub-tasks; (2) **Solve** — the model executes each sub-task in order, carrying forward intermediate results. The canonical prompt opens with "Let's first understand the problem and devise a plan to solve it. Then, let's carry out the plan to solve the problem step by step."

## Problem Solved
Vanilla CoT often starts executing before fully understanding the problem, producing locally-reasonable but globally-wrong trajectories. Plan-and-Solve forces global decomposition first, reducing premature commitment and improving performance on multi-step tasks (math word problems, multi-hop QA, multi-file coding).

## Why It Matters
It is the bridge between **Reasoning Layer** and **Planning Layer**. The plan is the artifact the Planning Layer consumes to produce a task graph for the Agent / Execution layers. It is also the natural pattern for any task that needs >3 sequential sub-tasks where naive ReAct would wander.

## How It Works
1. **Plan phase**: prompt the model to produce a structured plan (often JSON or numbered list) covering all sub-tasks. The plan is reviewed (optionally by a critic) and possibly revised.
2. **Solve phase**: for each sub-task in the plan, run a CoT or ReAct step. Pass the result forward to the next sub-task.
3. **Aggregate**: combine sub-task outputs into the final answer; verify against the original goal.

## Architecture
Sits between Reasoning and Planning layers. The Plan phase is a single model call (or a small debate between planner + critic). The Solve phase spawns one Execution Layer task per sub-task, each running its own reasoning mode (CoT, ReAct, structured). Checkpoints are taken per sub-task so partial progress survives crashes. The plan is stored in Prisma `Plan` table; sub-tasks reference it via `planId`.

## Interfaces
- `planAndSolve(task: TaskSpec): Promise<{ plan: SubTask[], result: any }>` — returns the plan AND the final aggregated result.
- `plan(task: TaskSpec): Promise<SubTask[]>` — exposes the plan phase alone (lets the Executive Layer decide whether to execute immediately or seek human approval).
- `solve(plan: SubTask[]): AsyncIterable<SubTaskResult>` — streams per-sub-task execution.

## Dependencies
- CoT-capable model (GLM-5.2).
- Execution Layer with sub-task scheduling.
- Optional: Critic agent (for plan critique).
- Optional: Memory Layer (to recall prior plans for similar tasks).

## Strengths
- Better than CoT on multi-step problems; comparable or better than ReAct on planning-heavy tasks.
- Plan is a reusable artifact — can be cached, replayed, shared across agents.
- Naturally parallelisable where sub-tasks are independent.
- Composes with verification (verify each sub-task; verify the aggregation).

## Weaknesses
- Plan quality dominates final quality — a bad plan cannot be saved by good execution.
- Rigid plan doesn't adapt to surprises mid-execution (combine with adaptive reasoning / replanning).
- Higher latency for short tasks (plan overhead not worth it).
- Risk of over-decomposition: trivial tasks split into trivial sub-tasks.

## Failure Modes
- **Bad decomposition**: plan misses a required sub-task.
- **Order errors**: sub-tasks scheduled in wrong order.
- **Plan-execution drift**: execution deviates from plan but plan is never updated.
- **Sub-task context loss**: each sub-task loses the global goal (mitigate by re-injecting the goal into each sub-task prompt).

## Security Implications
- Plans may reveal intent that should be redacted before logging.
- Sub-task prompts may include sensitive context — apply same prompt-injection defenses as ReAct.
- High-impact plans (e.g., tool calls affecting production systems) require human approval gate before Solve phase.

## Performance Implications
- Adds one extra model call (the plan) before execution.
- Independent sub-tasks can be parallelised for wall-clock win.
- Plan caching for similar tasks dramatically reduces cost.

## Operational Implications
- Need plan storage + versioning.
- Need plan review / approval workflow for high-impact tasks.
- Need metrics: plan quality, plan adherence, sub-task success rate.

## Alternatives
- ReAct — no upfront plan; better when sub-tasks are discovered dynamically.
- Tree-of-Thought — branching search instead of linear plan.
- HuggingGPT / task-planner patterns — model-as-controller for multi-model pipelines.

## Maturity & Production Readiness
Production-ready. Used in LangChain Plan-and-Execute, AutoGPT planning, OpenAI Assistants, BabyAGI descendants. The pattern is well-understood.

## Relevant Research / Papers
- Wang et al., 2023 — *Plan-and-Solve Prompting: Improving Zero-Shot Chain-of-Thought Reasoning by Large Language Models*. (canonical)
- Yao et al., 2020 — *Tree of Thoughts* (related, branching).

## Official Documentation
- LangChain Plan-and-Execute cookbook.
- OpenAI Assistants API (Run Steps mirror this pattern).

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement `lib/reasoning/plan-and-solve.ts` returning a typed `Plan` object.
- Store plans in Prisma: `Plan { id, taskId, subtasks JSON, status, createdAt, version }` and `SubTask { id, planId, parentId, order, spec JSON, status, result JSON, startedAt, completedAt }`.
- Use Execution Layer's task queue (BullMQ-style via SQLite or in-memory) to schedule sub-tasks; independent sub-tasks run as parallel jobs.
- Stream sub-task progress via socket.io for live UI.
- Use GLM-5.2's structured-output mode to force plan into a Zod-validated schema (`z.array(SubTaskSpec)`).
- Wire Approval Layer: if any sub-task uses a high-impact tool, pause before Solve and emit `approval:needed` event to the Next.js approval center.

## Relevance To Our Project (MiMo AI specifically)
Plan-and-Solve is the **Planning Layer's** core mechanism. The Executive Layer uses it whenever a task requires multi-step decomposition. The plan becomes the input to the Agent Layer (one agent per sub-task or one agent executing the plan sequentially). The plan is also the unit of checkpointing for long-horizon execution — a crashed task resumes by re-loading its plan and re-executing incomplete sub-tasks. It directly satisfies `CAPABILITY_MAP.md` §1 Plan-and-Solve = C and §6 Long-Horizon Execution requirements.

## Recommended Usage
- Use when task has ≥3 sequential sub-tasks OR requires upfront decomposition.
- Skip for single-shot Q&A (use CoT directly).
- Skip for exploratory search (use ReAct).
- Always pair with per-sub-task verification for important tasks.
- Cache plans for recurring task patterns.

## Decision
**ADOPT** — Planning Layer's primary mechanism; required for long-horizon execution.

## Sources
- Wang et al., 2023, arXiv:2305.04091.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #6 (P0).
- Internal: `docs/CAPABILITY_MAP.md` §1 (Plan-and-Solve = C).
- Internal: `docs/PROJECT_UNDERSTANDING.md` §4 Layer 5 + Layer 6.
