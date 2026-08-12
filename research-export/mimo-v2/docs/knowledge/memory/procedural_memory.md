# Procedural Memory

**Category:** Memory
**Status:** CORE
**Maturity:** Mature (skills/policies) / Emerging (LLM-learned procedures)

## Definition
A typed long-term memory store of **how-to knowledge**: skills, recipes, step sequences, behavioral rules, tool-use patterns, and operating procedures. Procedural memory says "to do X, follow these steps / apply this rule," distinct from episodic (what happened) and semantic (what is true).

## Problem Solved
Without procedural memory, the agent re-derives "how to deploy the staging env" or "how the user likes PRs formatted" every time — slow, inconsistent, and unable to improve. Procedural memory persists learnable how-to so it can be retrieved and replayed.

## Why It Matters
MiMo AI must execute long-horizon multi-step tasks (coding, ops, life-OS). Procedural memory is the substrate for skill acquisition, replayable workflows, repeatable tool chains, and learned user-specific interaction rules. It is also where Learning Layer (13) writes lessons that change behavior.

## How It Works
1. **Acquisition**: a procedure is written explicitly (user-authored skill), extracted by the LLM after a successful task ("extract the steps that just worked"), or generalized from repeated episodes.
2. **Storage**: a Procedure record holds trigger conditions, step list (or graph), preconditions/postconditions, required tools/permissions, success rate, last-used, version, embedding of description.
3. **Retrieval**: given a goal, the planner queries procedural memory (semantic match on description + tool-set match + permission match) → returns candidate procedures ranked by success rate × relevance × recency.
4. **Execution**: planner instantiates the procedure as a task graph or ReAct-style instruction set; outcome (success/fail) is written back to update success rate.
5. **Versioning**: failed executions trigger a revision (new version) — old version kept for rollback.

## Architecture
```
Task success / explicit authoring / repeated episodes
   → Procedure Extractor (LLM)
   → Procedure: {trigger, steps, pre/post, tools, perms, successRate, version, embedding}
   → Procedural Store (SQLite + sqlite-vec)
Planning Layer ← (retrieve-by-goal) ← Procedural Store
Execution outcome → update successRate / spawn revision
```

## Interfaces
- `defineProcedure(proc) → procId`
- `retrieveProcedures({goal, tools, perms, topK}) → Procedure[]`
- `executeProcedure(procId, inputs) → taskId`
- `recordOutcome(procId, success, failureReason?) → updatedSuccessRate | newVersionId`
- `reviseProcedure(procId, newSteps, reason) → newVersionId`

## Dependencies
- LLM extractor (GLM-5.2).
- Embedding model (for description matching).
- Planning Layer (consumer).
- Execution Layer (runs procedures).
- Permission system (procedures declare required perms).
- Versioning subsystem.

## Strengths
- Enables real skill accumulation — behavior improves with use.
- Reduces planning cost (retrieve vs. re-plan).
- Audit trail of "how" (every step replayable).
- Natural integration with tool registry (procedures reference tools).

## Weaknesses
- Bad procedures get replayed until failure rate triggers revision.
- Trigger conditions are hard to specify precisely → over- or under-firing.
- Version explosion if not pruned.
- Procedures tied to specific tool versions break when tools change.

## Failure Modes
- Wrong procedure retrieved for a similar-looking goal (false match).
- Procedure persists after underlying tool/API changes (silent breakage).
- Circular procedure dependencies.
- Success-rate drift (early successes overweighted).

## Security Implications
- Procedures carry permission claims — must be re-validated at execute time, not trusted from store.
- User-authored procedures are arbitrary code-like content — sandbox + approval gate before first execution.
- Provenance: who/what created each procedure (LLM extraction vs. user vs. imported).

## Performance Implications
- Retrieval is one vector + keyword query — cheap.
- Execution cost depends on procedure complexity.
- Success-rate updates are O(1).

## Operational Implications
- Procedure library UI: list, edit, version, enable/disable, "test run."
- Periodic re-validation pass (does the procedure still work? run on a test fixture).
- Telemetry: per-procedure success rate, avg duration, last-used.

## Alternatives
- **Hardcoded skills in code** (loses runtime learnability).
- **Prompt-only procedures** (no persistence, no success tracking).
- **Agent-as-skill patterns** (heavier; one agent per procedure).

## Maturity & Production Readiness
- Skills/playbooks in production agents: mature (Voyager, AutoGPT-style skills, LangChain tools).
- Auto-extracted procedures from LLM transcripts: emerging but workable (Voyager-style skill library).

## Relevant Research / Papers
- Wang et al. (2023). **Voyager** — Open-ended embodied agent with skill library. arXiv:2305.16291.
- **Sandler & Sandler** — procedural memory in cognitive architectures (SOAR/ACT-R).
- AutoGPT / BabyAGI — early skill-persistence experiments.

## Official Documentation
- LangChain Tools/Skills: https://python.langchain.com/docs/concepts/tools/
- Letta memory blocks (procedural-like): https://docs.letta.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Prisma model `Procedure`**: `id, description, trigger Json, steps Json (ordered list or graph), preconditions Json, postconditions Json, requiredTools String[], requiredPerms String[], successRate Float, executionCount Int, version Int, parentVersionId String?, embeddingId String, provenance Json, enabled Boolean, createdAt, updatedAt`.
- **sqlite-vec** virtual table `procedure_vec` over `Procedure.id` using `description`.
- **Extractor**: GLM-5.2 prompted to output a procedure JSON given a successful task transcript; runs in background worker.
- **Retrieval API**: Next.js route consumed by Planning Layer — `POST /api/procedures/retrieve {goal, tools, perms}` → ranked list.
- **Execute path**: planner converts procedure → task graph → Execution Layer; socket.io emits `procedure.executed` with outcome.
- **Versioning**: every revision creates a new row with `parentVersionId`; UI shows diff.
- **Approval gate**: user-authored or LLM-extracted procedures require explicit "enable" before first execution.
- **Zustand**: client-side list of "recently used procedures" for the workspace sidebar.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory) + Layer 13 (Learning). CAPABILITY_MAP §3 lists Procedural Memory as CORE, Skill Memory as R; §14 lists Lesson → memory/skill/strategy, Skill acquisition. Procedures are consumed by Planning Layer (6) and executed by Execution Layer (10). This is the durable substrate for "MiMo gets better at tasks over time."

## Recommended Usage
- Auto-extract procedures on verified task success.
- Always pair with success-rate + versioning + approval-gate.
- Distinguish user-authored (high trust) vs. LLM-extracted (medium trust) vs. imported (low trust) via provenance.
- Periodic re-validation pass; auto-disable procedures whose success rate drops below threshold.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite + sqlite-vec; GLM-5.2 extractor; success-rate + versioned; approval-gated execution.

## Sources
- Wang et al. (2023). *Voyager: An Open-Ended Embodied Agent with Large Language Models.* arXiv:2305.16291.
- Anderson, J. R. (1996). *ACT-R* and procedural memory in cognitive architectures.
- Laird, J. (2012). *The SOAR Cognitive Architecture.* MIT Press.
- MiMo AI `docs/CAPABILITY_MAP.md` §3, §14.
- Inventory lines 341–349 (Procedural Memory, P0).
