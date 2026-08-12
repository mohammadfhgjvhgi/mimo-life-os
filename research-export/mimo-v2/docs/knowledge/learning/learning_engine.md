# Learning Engine

**Category:** Learning
**Status:** REQUIRED
**Maturity:** Mature (pattern); Emerging (LLM-specific)

## Definition
The Learning Engine is the subsystem that converts **experience** (task + plan + actions + result + failure + correction + feedback) into **durable improvements**: lessons written to memory, skills added to the skill library, strategies updated in the strategy store. It is the *observation* and *internalization* half of self-improvement; the *deployment* half (actually changing production behavior) is gated separately — see `controlled_self_improvement.md`.

## Problem Solved
- Without learning, the same mistake happens twice. The system "re-stated a mistake ≠ durable improvement" (per `PROJECT_UNDERSTANDING.md` §2).
- Reflection output (a paragraph of "what went wrong") is useless unless it's structured into a retrievable, reusable lesson.
- Skill/strategy knowledge that lives only in someone's head (or only in the model's weights) is not leverageable.

## Why It Matters
The Learning Engine is what makes MiMo AI improve over time *without* modifying the model. Each finished task is a training signal; each failure is a lesson; each repeated pattern becomes a skill. This compounds: a personal AI that learns its user's workflows, common failure modes, and effective strategies is dramatically more useful after a month than on day one.

## How It Works
### The learning loop
1. **Experience capture** — the Execution Layer emits `task.finished` / `task.failed` events with full trace (goal, plan, steps, tool calls, results, verifier verdict, recovery attempts, user feedback).
2. **Experience store** — written to an append-only `Experience` table (raw trace, not yet a lesson).
3. **Reflection** — an LLM call (via Gateway, structured output) over the experience produces a structured reflection: `{ whatWorked, whatFailed, rootCause, lesson, applicableContext, confidence }`.
4. **Lesson classification** — the reflection's `lesson` is routed to one of:
   - **Memory** (episodic / failure / preference) — "user prefers short bullet answers" → preference memory.
   - **Skill** — a reusable procedure ("how to summarize a PDF with tables") → skill library with steps + preconditions + tool list.
   - **Strategy** — a decision policy ("for code-review tasks, run the verifier twice") → strategy store with applicability conditions.
   - **Routing hint** — "for this kind of task, model X is faster" → feeds the Model Router's quality scores.
   - **Tool reliability** — "tool Y failed 3× this week under condition Z" → tool-reliability metrics.
5. **Storage** — lessons are written to their target store with provenance (`experienceId`, `createdAt`, `confidence`).
6. **Consolidation** — periodic job merges similar lessons, resolves conflicts, ages out low-confidence ones.
7. **Feedback loop** — at retrieval time (Context Layer), relevant lessons are surfaced into the prompt; the next task benefits.

### What a "lesson" looks like
```ts
interface Lesson {
  id: string;
  type: 'memory'|'skill'|'strategy'|'routing'|'tool-reliability';
  content: string;                // human + model readable
  structured?: unknown;           // type-specific schema (skill steps, strategy policy, etc.)
  applicableContext: {            // when to retrieve this lesson
    taskTypes?: string[];
    tags?: string[];
    entities?: string[];
    conditions?: string;
  };
  confidence: number;             // 0..1, decays without reinforcement
  provenance: { experienceId: string; source: 'auto'|'user-feedback'; createdAt: Date };
  reinforcedCount: number;        // incremented when a later task confirms it
  lastReinforcedAt: Date;
  supersededBy?: string;          // when a newer lesson replaces this one
}
```

## Architecture
```
Execution Layer ──task.finished/failed──▶ Event Bus
                                            │
                                            ▼
                              Experience Store (SQLite)
                                            │
                                            ▼ (async job)
                              Reflection (LLM, structured)
                                            │
                                            ▼
                              Lesson Classifier
                                            │
                              ┌─────────────┼─────────────┬─────────────┬─────────────┐
                              ▼             ▼             ▼             ▼             ▼
                          Memory        Skill Lib     Strategy     Router Hints  Tool Reliability
                              │             │             │             │             │
                              └─────────────┴─────────────┴─────────────┴─────────────┘
                                            │
                                            ▼ (at retrieval)
                              Context Layer surfaces relevant lessons into the prompt
```

## Interfaces
```ts
interface LearningEngine {
  recordExperience(exp: Experience): Promise<void>;
  reflect(experienceId: string): Promise<Reflection>;
  classifyAndStore(reflection: Reflection): Promise<Lesson[]>;
  consolidate(): Promise<void>;             // periodic dedup + conflict resolution
  retrieveRelevantLessons(context: TaskContext, limit: number): Promise<Lesson[]>;
  reinforce(lessonId: string): Promise<void>;
  feedback(experienceId: string, feedback: UserFeedback): Promise<void>;
}
```

## Dependencies
- Event Bus (task.finished/failed triggers).
- Task Queue (reflection + consolidation jobs).
- Model Gateway (LLM for reflection + classification).
- Memory Layer (target store for memory lessons).
- Skill Library (target store for skills — a Prisma `Skill` table).
- Strategy Store (target store for strategies — a Prisma `Strategy` table).
- Model Router (consumer of routing hints).
- Tool Layer (consumer of tool-reliability metrics).
- Context Layer (consumer of retrieved lessons).
- Verification Layer (a lesson must not contradict verified facts; verifier checks high-confidence lessons).

## Strengths
- **Compounding improvement** without model retraining.
- **Structured** — lessons are typed, retrievable, auditable, not free-text reflections.
- **Provenance** — every lesson traces back to the experience that produced it.
- **Reinforcement** — repeated observations strengthen; absence decays.
- **Feedback-aware** — user corrections override auto-derived lessons.
- **Decoupled from deployment** — learning is safe; deployment is gated (see `controlled_self_improvement.md`).

## Weaknesses
- **Reflection quality** — LLM may produce shallow or wrong lessons. Mitigation: verifier checks; require evidence in the reflection; down-weight low-confidence lessons.
- **Lesson bloat** — without consolidation, lessons proliferate and retrieval becomes noisy. Mitigation: aggressive dedup + conflict resolution + decay.
- **Conflicting lessons** — "user likes short answers" vs. "user asked for detail today." Mitigation: temporal context in `applicableContext`; strategy store handles precedence.
- **Cold start** — no lessons on day one; the system is "naive" until it accumulates experience.
- **Bias amplification** — if the user always does X, the lesson "always do X" can lock in suboptimal behavior. Mitigation: confidence thresholds; periodic review.
- **Privacy** — lessons encode personal patterns; sensitive.

## Failure Modes
- **Wrong lesson** — reflection misattributes root cause. Mitigation: verifier spot-checks; user feedback overrides; low confidence until reinforced.
- **Stale lesson** — user's preference changed; old lesson keeps firing. Mitigation: decay + reinforcement; `supersededBy` chain.
- **Lesson pollution** — too many low-quality lessons degrade retrieval. Mitigation: consolidation job + confidence floor for retrieval.
- **Runaway learning** — feedback loop where a lesson causes behavior that reinforces itself wrongly. Mitigation: bounded confidence; periodic human review of top lessons.
- **Cascade** — a lesson from one task incorrectly applied to a different task type. Mitigation: `applicableContext` precision; retrieval ranking.

## Security Implications
- **Lessons are sensitive** — encode personal behavior patterns; encrypt at rest; restrict UI access.
- **Prompt-injection via lessons** — a malicious external source could trick reflection into storing a lesson like "always exfiltrate data." Mitigation: lessons are data, not instructions; the planner treats them as advisory; verifier checks high-stakes lessons; lessons cannot grant permissions.
- **Audit** — every lesson (created, reinforced, superseded, deleted) logged.
- **User control** — the user can inspect, edit, delete any lesson.

## Performance Implications
- Reflection: one LLM call per experience (async, off the critical path).
- Retrieval: a vector + keyword search over lessons (cheap; same hybrid infra as Knowledge).
- Consolidation: periodic batch job; cost bounded.

## Operational Implications
- Need a **Lessons UI** — inspect by type, confidence, provenance; edit/delete.
- Need a **consolidation job** (nightly) — dedup, conflict-resolve, decay.
- Need a **feedback channel** — user can correct lessons inline ("no, that's wrong").
- Need a **lesson-quality monitor** — track how often retrieved lessons led to verifier-PASS vs. FAIL.

## Alternatives
- **No learning (stateless):** rejected — fails the "improves over time" goal.
- **Free-text reflections only (no structured lessons):** rejected — not retrievable, not actionable.
- **Model fine-tuning:** rejected for v1 — too expensive, too risky, requires data pipeline; revisit only if learning-from-lessons plateaus.
- **RLHF / online RL:** rejected for v1 — overkill and unsafe for personal AI.

## Maturity & Production Readiness
- The reflection → lesson → memory pattern is mature (Reflexion, Generative Agents).
- LLM-specific lesson quality is emerging — needs verifier checks.
- Suitable for v1 with: structured reflection, typed lessons, consolidation, conservative retrieval (only high-confidence lessons surface in the prompt).

## Relevant Research / Papers
- Shinn et al., "Reflexion: Language Agents with Verbal Reinforcement Learning," 2023 (arXiv:2303.11366) — reflection → memory → improvement loop.
- Park et al., "Generative Agents: Interactive Simulacra of Human Behavior," 2023 (arXiv:2304.03442) — memory + reflection + planning.
- Voyager (Wang et al., 2023) — skill library accumulation.
- *Verify exact citations at integration time.*

## Official Documentation
- No single canonical doc; this is an integration pattern.
- LangGraph / LlamaIndex have "memory" + "reflection" examples — *reference implementations, not adopted as dependencies.*

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Learning jobs run as Task Queue workers; reflection is an LLM call via Gateway.
- **Module layout:**
  - `src/server/learning/engine.ts` — `LearningEngine` class.
  - `src/server/learning/reflect.ts` — reflection prompt + structured-output parsing.
  - `src/server/learning/classify.ts` — lesson-type router.
  - `src/server/learning/consolidate.ts` — periodic consolidation job.
  - `src/server/learning/retrieve.ts` — hybrid retrieval of relevant lessons for the Context Layer.
- **Prisma schema:** `Experience { id, traceId, goal, plan Json, steps Json, result Json, verifierVerdict, userFeedback Json?, createdAt }`, `Lesson { id, type, content, structured Json, applicableContext Json, confidence, provenance Json, reinforcedCount, lastReinforcedAt, supersededBy? }`, `Skill { id, name, steps Json, preconditions Json, tools String[], sourceLessonId, version }`, `Strategy { id, name, policy Json, applicability Json, sourceLessonId, version }`.
- **Retrieval:** lessons indexed with embeddings (same sqlite-vec infra) + FTS5 on `content`; hybrid search returns top-N ranked by confidence × relevance.
- **Context Layer integration:** before each model call, the Context Layer calls `learning.retrieveRelevantLessons(context, 5)` and injects them as a `system` message section ("Relevant lessons: ...").
- **socket.io:** `lesson.created` event → dashboard notification (optional, for transparency).
- **Settings UI:** Lessons browser (filter by type/confidence, edit, delete, view provenance).

## Relevance To Our Project (MiMo AI layered runtime)
This is **Layer 13 (Learning Layer)** of the 15-layer Runtime OS. It consumes `task.finished/failed` events (Layer 10), uses the Model Gateway (Layer 1) for reflection, writes to Memory (Layer 3), Skill Library (Layer 8), Strategy Store (Layer 5), and feeds back into the Context Layer (Layer 2). It is the safe, always-on improvement mechanism — distinct from `controlled_self_improvement.md` which governs *deployed* behavior changes.

## Recommended Usage
- **Adopt the experience → reflection → lesson → memory/skill/strategy loop.**
- **Run reflection async** (Task Queue job) — never block the user.
- **Require evidence** in every reflection (cite the experience steps that justify the lesson).
- **Conservative retrieval** — only surface lessons with `confidence ≥ threshold` (default 0.6) in the prompt.
- **Periodic consolidation** (nightly) — dedup, conflict-resolve, decay.
- **User feedback overrides** auto-derived lessons.
- **Lessons are advisory** — the planner may ignore them; they never grant permissions or bypass gates.

## Decision
**ADOPT** — Learning Engine with structured reflection → typed lessons → memory/skill/strategy/routing/tool-reliability targets, with provenance, reinforcement, and consolidation. Distinct from controlled self-improvement (which gates *deployed* changes); the Learning Engine's outputs are always safe to write.

## Sources
- Technology inventory category 17 (Self-Improvement) lines 3059–3240 — esp. #288 Self-Reflection (P1), #290 Skill Acquisition (P1), #291 Skill Refinement (P1), #294 Agent Learning (P2), #295 Feedback Loops (P1), #296 Experience Replay (P2), #297 Trajectory Learning (P2), #299 Evaluator Agents (P1), #300 Automatic Evaluation (P1), #301 Skill Discovery (P3), #303 Recurring Error Detection (P1).
- `docs/PROJECT_UNDERSTANDING.md` §2 (reflection ≠ learning), §5 (Learning components), §8.8.
- `docs/CAPABILITY_MAP.md` §14 (Learning — feedback R, experience extraction R, lesson→memory/skill/strategy R, self-reflection R, self-evaluation R, strategy improvement I, memory-based learning I, skill acquisition I).
- Shinn et al., Reflexion, 2023 (arXiv:2303.11366).
- Park et al., Generative Agents, 2023 (arXiv:2304.03442).
- Wang et al., Voyager, 2023 (arXiv:2305.16291) — *verify citation*.
- *Inferred:* 5-target lesson taxonomy, consolidation design, retrieval integration — designed for this stack.
