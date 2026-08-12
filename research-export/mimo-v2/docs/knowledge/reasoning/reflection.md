# Reflection (Reflexion / Self-Critique)

**Category:** Reasoning
**Status:** REQUIRED
**Maturity:** Mature

## Definition
A pattern in which, after producing an answer (or failing a task), the model reflects on its own trajectory: identifies what went wrong, extracts a concrete lesson, and retries with the lesson injected into the prompt. Iterated until success or budget exhausted. Canonical implementation is *Reflexion* (Shinn et al., 2023).

## Problem Solved
Agents fail. Without a feedback loop the same failure repeats indefinitely. Naive retry (re-run with no changes) succeeds only by luck. Reflection converts failure into a *durable, actionable lesson* that changes the next attempt, and — if persisted — improves future tasks of the same kind.

## Why It Matters
It is the operational bridge from **Recovery Layer** to **Learning Layer**. Reflection is what turns a transient failure into a stored lesson in failure memory, which is then retrieved and applied to similar future tasks. Without it, MiMo has no learning loop and no recovery beyond blind retry.

## How It Works
1. Run a task (CoT, ReAct, or Plan-and-Solve).
2. If verification FAILS (or the model self-flags low confidence), invoke a reflection pass: the model is given the trajectory + the failure signal and asked "what went wrong, and what should be done differently?"
3. The reflection produces a *verbal feedback* string (a lesson).
4. Retry the task with the lesson injected into the prompt (or into the agent's long-term memory).
5. Loop until success or budget exhausted; persist the final lesson to Memory Layer (failure memory + skill memory).

## Architecture
Sits across Recovery + Learning + Reasoning layers. Triggered by Verification Layer's FAIL verdict or by a confidence threshold. Produces a `Lesson { id, taskId, triggerEvent, diagnosis, lesson, appliedSuccessfully? }` stored in Prisma. The Reasoning Layer consumes prior lessons via the Context Layer (lessons retrieved for similar tasks). The Learning Layer periodically consolidates lessons into skill memory.

## Interfaces
- `reflect(trajectory: Trajectory, failureSignal: FailureSignal): Promise<Reflection>` returning `{ diagnosis, lesson, suggestedStrategy }`.
- `applyLesson(task: TaskSpec, lessons: Lesson[]): TaskSpec` — augments the prompt with relevant past lessons.
- `persistLesson(lesson: Lesson): Promise<void>` — writes to Memory Layer.

## Dependencies
- A working ReAct / CoT trajectory to reflect on.
- A failure signal source: Verification Layer verdict, exception, timeout, or self-reported low confidence.
- Memory Layer for lesson storage + retrieval.
- Context Layer for lesson retrieval on future tasks.

## Strengths
- Converts failures into compounding improvement.
- Cheap relative to fine-tuning — no model weights touched.
- Lessons are human-readable → auditable and editable.
- Strong empirical lift on coding (HumanEval), decision-making (ALFWorld), QA benchmarks.

## Weaknesses
- Reflection can itself hallucinate causes (plausible but wrong diagnoses).
- Lessons can conflict across episodes; need consolidation and conflict resolution.
- Naive persistence pollutes memory with low-quality lessons — need scoring.
- Latency cost: each retry adds a full task re-execution.

## Failure Modes
- **Reflection loop without progress**: keeps reflecting, keeps failing the same way.
- **Lesson over-fitting**: lesson applies to one episode but is generalised inappropriately.
- **Lesson drift**: accumulated lessons contradict each other.
- **Self-justification**: model rationalises its original answer instead of finding the real cause.

## Security Implications
- Lessons may contain sensitive data from the original trajectory — apply redaction before persistence.
- A prompt-injection that survives into a lesson becomes a durable attack vector — sanitise + scan lessons before retrieval.
- Lesson editing must be audit-logged (lesson is a control-plane artifact).

## Performance Implications
- Each reflection adds one model call + a full retry.
- Bounded by retry budget (typically 2–3 reflections per task).
- Lesson retrieval adds latency to future task setup.

## Operational Implications
- Need lesson storage, scoring, versioning, conflict resolution.
- Need lesson review UI in the Next.js console (approve / edit / delete).
- Need metrics: lesson application success rate, reflection count, retry budget consumption.

## Alternatives
- Naive retry (no reflection) — works only for transient failures.
- Fine-tuning on failures — heavyweight, slow, risky.
- Critic agent (separate model critiques) — heavier but more objective.
- Self-Consistency — different mechanism (vote across samples, no failure-driven lesson).

## Maturity & Production Readiness
Mature. Reflexion (2023) is widely deployed in agent frameworks. Used in LangChain, AutoGen, CrewAI. The pattern is well-understood; quality depends on lesson scoring, not on the basic loop.

## Relevant Research / Papers
- Shinn et al., 2023 — *Reflexion: Language Agents with Verbal Reinforcement Learning*. (canonical)
- Madaan et al., 2023 — *Self-Refine: Iterative Refinement with Self-Feedback*.
- Paul et al., 2023 — *REFINER* (reasoning feedback).

## Official Documentation
- LangChain Reflexion agent docs.
- AutoGen reflection docs.

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement `lib/reasoning/reflection.ts` with `reflect()`, `applyLesson()`, `persistLesson()`.
- Store lessons in Prisma: `Lesson { id, taskId, triggerType, diagnosis, lesson, schemaVersion, score, status, createdAt, updatedAt }` with `status` ∈ `draft | active | deprecated | rejected`.
- Index lessons by embedding (vector store) for similarity retrieval — the Context Layer retrieves top-K lessons for the current task.
- Lesson scoring: a lesson's score increases when applied + task succeeds; decreases on failure; auto-deprecate below threshold.
- Expose lesson review UI at `/admin/lessons` (App Router) — approve, edit, delete, see usage stats.
- Stream reflection progress via socket.io.

## Relevance To Our Project (MiMo AI specifically)
Reflection is the **heart of MiMo's Recovery Layer (12) and Learning Layer (13)**. It is what makes MiMo *improve* over time without fine-tuning. Failure traces flow from Execution → Verification FAIL → Reflection → Lesson → Memory (failure memory + skill memory). Future tasks retrieve the lesson via Context Layer. This loop is explicitly mandated by `PROJECT_UNDERSTANDING.md` §4 Layer 12 ("Failure → diagnose → cause → alternative strategy → retry (bounded)") and Layer 13 ("Task+result+failure+correction+feedback → experience → lesson"). It is the bridge from "task failed" to "the system got durably better."

## Recommended Usage
- Trigger on Verification FAIL, exception, timeout, or self-reported confidence < threshold.
- Cap retries at 2–3 per task.
- Score lessons; auto-deprecate low-scoring ones.
- Surface lessons in the UI for human review (the user is the final arbiter of memory).
- Pair with Critic agent for high-stakes tasks (a second perspective reduces self-justification bias).

## Decision
**ADOPT** — Recovery + Learning loop; required for any autonomous system that should improve.

## Sources
- Shinn et al., 2023, arXiv:2303.11366.
- Madaan et al., 2023, arXiv:2303.17651.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #5 (P1).
- Internal: `docs/CAPABILITY_MAP.md` §1 (Reflection = R) and §14 (Self-reflection = R).
- Internal: `docs/PROJECT_UNDERSTANDING.md` §4 Layer 12 + Layer 13.
