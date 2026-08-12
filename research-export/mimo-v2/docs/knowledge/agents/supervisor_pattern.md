# Supervisor Pattern

**Category:** Agents
**Status:** CORE
**Maturity:** Production-ready

## Definition
The **Supervisor pattern** is a multi-agent architecture in which a top-level "supervisor" agent owns the goal, decomposes it into sub-tasks, dispatches each sub-task to a worker (another agent or a tool), reviews the worker's output, and synthesizes the final result. The supervisor never executes sub-tasks itself — it plans, delegates, reviews, and integrates.

It is the agent-world analogue of a human project manager: not the one writing code, but the one ensuring the right code gets written, reviewed, and integrated.

## Problem Solved
A single agent attempting a large multi-faceted task faces three problems the supervisor pattern addresses:
1. **Cognitive overload** — one context cannot hold every sub-domain's detail without bloating.
2. **Lack of review gate** — a single agent's outputs are not independently checked.
3. **No parallelism** — single-agent is serial; supervisor can dispatch independent sub-tasks concurrently.

The supervisor pattern introduces a **clean separation** between planning/integration (supervisor) and execution (workers), with an explicit review loop in between.

## Why It Matters
For MiMo AI, the supervisor pattern is the **escape hatch** when single-agent is insufficient (see `single_vs_multi_agent.md` deviation criteria). It is the canonical way to:
- Run a research task that requires scraping 5 sites in parallel.
- Run a coding task where one worker writes code, another runs tests, a third reviews.
- Compose domain specialists (research + coding + writing) into one coherent deliverable.

It also introduces the **review gate** that makes verification mandatory rather than optional: the supervisor's job is to reject incomplete or wrong worker output.

## How It Works
```
supervisor.run(goal):
  plan = supervisor.think("Decompose goal into sub-tasks")
  results = {}
  for subtask in plan.subtasks:
    if subtask.parallelizable: dispatch concurrently
    else: dispatch sequentially
    worker = Router.select(subtask.domain)
    result = worker.run(subtask, fork(parentContext))
    review = supervisor.review(result, subtask.outputContract)
    if review == PASS:
      results[subtask.id] = result
    elif review == REVISE:
      re-dispatch with feedback
    elif review == ESCALATE:
      ask user or escalate to recovery
  final = supervisor.synthesize(results, goal)
  return final
```

### Key primitives
- **Plan**: structured list of sub-tasks with dependencies, expected outputs, and worker hints.
- **Fork**: spawn a child context with a compressed summary of parent state (never the full parent context).
- **Review**: supervisor evaluates worker output against an `OutputContract` (Zod schema + acceptance criteria).
- **Revise loop**: bounded (typically ≤2 revisions) before escalation.
- **Synthesize**: supervisor integrates all sub-results into the final answer.

## Architecture
```
                 ┌───────────────────────────┐
                 │      Supervisor Agent     │
                 │  - plan(goal)             │
                 │  - review(worker_output)  │
                 │  - synthesize(results)    │
                 └────────────┬──────────────┘
                              │ dispatch (fork context)
        ┌─────────────┬───────┴────────┬─────────────┐
        ▼             ▼                ▼             ▼
   ┌─────────┐  ┌──────────┐    ┌──────────┐  ┌──────────┐
   │ Worker  │  │ Worker   │    │ Worker   │  │ Worker   │
   │  (web)  │  │ (coder)  │    │(browser) │  │(verifier)│
   └────┬────┘  └─────┬────┘    └─────┬────┘  └─────┬────┘
        │             │               │             │
        └─────────────┴───────┬───────┴─────────────┘
                              │ structured output (OutputContract)
                              ▼
                 ┌───────────────────────────┐
                 │      Supervisor Review    │
                 │  PASS | REVISE | ESCALATE │
                 └───────────────────────────┘
```

## Interfaces
- `Supervisor.run(goal: Goal): Promise<SupervisorResult>`
- `SupervisorPlan { subtasks: SubTask[]; dependencies: Edge[]; expectedDurationMs; expectedCostUsd }`
- `SubTask { id, description, domain, outputContract, workerHint?, parallelizable: bool, budget }`
- `Worker.run(subtask: SubTask, ctx: ForkedContext): Promise<WorkerOutput>`
- `WorkerOutput { taskId, result: unknown, contractValid: bool, artifacts: Artifact[] }`
- `ReviewResult = { verdict: 'PASS' | 'REVISE' | 'ESCALATE', feedback?: string, issues?: string[] }`

## Dependencies
- Router (selects worker by domain).
- Context Manager (fork + compress for handoffs).
- Verification layer (the `OutputContract` is verified).
- Tool Layer (workers call tools).
- Checkpointing (supervisor + all worker states persisted for resume).
- Memory (per-task namespace).
- Event Bus (parallel worker coordination).

## Strengths
- **Decomposition** — turns a giant task into manageable sub-tasks.
- **Parallelism** — independent sub-tasks run concurrently.
- **Review gate** — supervisor enforces quality before integration.
- **Specialization** — each worker gets a domain-tuned prompt + toolset.
- **Isolation** — workers cannot pollute each other's contexts.
- **Resumability** — supervisor checkpoints plan + per-subtask state; a crash mid-task resumes from the last completed subtask.

## Weaknesses
- **Coordination overhead** — supervisor adds 1+ LLM call per subtask for review.
- **Handoff loss** — fork compression can drop critical details.
- **Supervisor context bloat** — review feedback accumulates; needs management.
- **Serial bottleneck** — even with parallel workers, the supervisor reviews serially.
- **Trust propagation** — supervisor trusting unverified worker output → silent wrong answers.
- **Revise loops can explode cost** — unbounded revisions are a budget risk.

## Failure Modes
- **Bad decomposition** — supervisor splits the task along wrong seams; sub-tasks overlap or miss part of the goal. Mitigation: structural plan validation against goal.
- **Router misfire** — subtask sent to wrong worker domain. Mitigation: worker rejects tasks outside its domain; supervisor re-routes.
- **Review rubber-stamp** — supervisor approves low-quality output (common when supervisor prompt is weak). Mitigation: structured `OutputContract` validation, not free-form review.
- **Revise loop runaway** — worker keeps failing, supervisor keeps revising. Mitigation: hard cap (e.g., 2 revisions), then escalate.
- **Starvation** — one slow worker blocks synthesis. Mitigation: per-subtask timeout, partial-result synthesis fallback.
- **Synthesis information loss** — supervisor over-compresses results in synthesis. Mitigation: synthesis includes raw artifact references, not just summaries.

## Security Implications
- Workers run with **scoped permissions** — never inherit supervisor's full permission set.
- Handoff messages (fork context, worker output) are **untrusted input** to the receiving side (supervisor or worker). Treat as potentially prompt-injected.
- Parallel workers must not share filesystem namespace unless explicitly authorized.
- Supervisor's `synthesize` step must not blindly trust worker-supplied URLs/paths (verification layer must validate).

## Performance Implications
- Total latency ≈ plan_latency + max(parallel_worker_latencies) + Σ review_latencies + synthesis_latency.
- Token cost ≈ supervisor_plan_tokens + Σ worker_tokens + Σ review_tokens + synthesis_tokens. Typically 3–5× single-agent for equivalent task.
- Parallelism speedup bounded by Amdahl: serial fraction (plan + review + synthesis) limits max speedup.

## Operational Implications
- Supervisor + workers each produce their own trajectory → observability must reconstruct the tree.
- Replay requires deterministic scheduling (record dispatch order; replay in same order).
- Cost attribution: per-worker cost lines + supervisor overhead line.
- Live UI: render as a tree (supervisor at root, workers as children, handoff/result edges).

## Alternatives
- **Single-agent** — default; supervisor only when justified.
- **Hierarchical** — recursive supervisor-of-supervisors (see `agent_architectures.md`).
- **Planner-Executor** — variant where planner is a non-LLM or a one-shot LLM call; executor runs the plan without review. Loses the review gate.
- **Blackboard** — workers read/write a shared state object instead of handoffs. Research-stage.
- **CrewAI-style role-playing** — workers "talk" to each other in a shared conversation. Higher token cost, less structure. Not our default.

## Maturity & Production Readiness
**Production-ready.** LangGraph documents the supervisor pattern as a first-class recipe. OpenAI Agents SDK and Anthropic Claude Agent SDK support handoff-based supervision. Used in production by Cursor (orchestrator + sub-agents), Devin (planner + workers), and ChatGPT agent mode.

## Relevant Research / Papers
- Hong et al. 2023 — *MetaGPT* (role-based multi-agent with structured handoffs; supervisor analogue).
- Wu et al. 2023 — *AutoGen* (conversational multi-agent; supervisor pattern emerges via "GroupChatManager").
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (taxonomy includes supervisor/hierarchical).
- LangChain — *Supervisor pattern* engineering blog (2024).

## Official Documentation
- LangGraph — Multi-Agent Supervisor recipe (langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor).
- OpenAI Agents SDK — `handoffs` and orchestrator pattern.
- Anthropic — *Building Multi-Agent Systems* (engineering guidance).
- Mastra — TypeScript multi-agent with supervisor workflow.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- Supervisor runs as a **TypeScript orchestrator** in the Next.js server action (or `agents-service` mini-service). Each worker is invoked as a **function call** (in-process) for v1; promote to mini-service when isolation/parallelism demands it.
- **Vercel AI SDK** `streamText` powers each worker; the supervisor itself uses `generateText` (plan + review + synthesize are non-streaming structured calls).
- **Prisma schema**:
  - `SupervisorPlan` (id, runId, subtasks JSON, dependencies JSON, createdAt)
  - `SubTask` (id, planId, domain, description, workerAgentId, status, outputRef, reviewVerdict, reviewFeedback, revisionCount, startedAt, endedAt)
  - Indexed on `(planId, status)` for "find pending subtasks" queries.
- **Parallel execution**: use `Promise.all` over independent subtasks; bounded concurrency (e.g., `p-limit`) to avoid thundering herd on the model API.
- **socket.io** emits `supervisor:plan`, `supervisor:dispatch`, `worker:started`, `worker:completed`, `supervisor:review`, `supervisor:synthesize`. UI renders the supervisor tree via **zustand** `useSupervisorStore`.
- **OutputContract** is a Zod schema stored alongside the agent spec; supervisor review first runs `contract.safeParse(output)`, then a free-form LLM review for qualitative criteria.
- **Revise cap**: hard constant `MAX_REVISIONS = 2`; beyond that, `ESCALATE` to user via the Approval Center UI (socket.io push).
- **Caddy**: if workers are promoted to mini-services, they are reached via `?XTransformPort=40XX`; the supervisor is the only externally visible orchestrator.

## Relevance To Our Project (MiMo AI layered runtime)
The Supervisor pattern is implemented at **Layer 7 (Executive) + Layer 8 (Agent)**. The Executive acts as supervisor when single-agent is insufficient; it dispatches to specialist agents (Researcher, Coder, Browser, Data, Writer, Verifier) and reviews their output via **Layer 11 (Verification)**. Checkpoints at **Layer 10 (Execution)** persist the supervisor plan + per-subtask state. Recovery at **Layer 12** handles revise/escalate. Learning at **Layer 13** captures supervisor decisions (good/bad decompositions) for later improvement.

This pattern is the **structured multi-agent path** in MiMo AI's hybrid agent strategy — used when deviation criteria from `single_vs_multi_agent.md` are met.

## Recommended Usage
- Use when a task has ≥3 independent sub-tasks requiring different domains/tools.
- Always pair with: `OutputContract` (Zod), per-subtask budget + timeout, bounded revisions (≤2), verification on every worker output.
- Keep supervisor prompt focused on plan/review/synthesize — **not** on execution detail.
- Log every supervisor decision (decompose, route, review verdict) for learning + audit.
- For long-horizon tasks: checkpoint after every subtask completion; resume from last completed subtask.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** as the structured multi-agent path. **ADOPT** bounded revisions + structured `OutputContract` review (not free-form). **REJECT** unbounded revise loops and supervisor rubber-stamping (must use Zod contract validation).

## Sources
- Hong et al. 2023 — MetaGPT (arxiv.org/abs/2308.00352)
- Wu et al. 2023 — AutoGen (arxiv.org/abs/2308.08155)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- LangGraph Supervisor recipe (langchain-ai.github.io/langgraph/tutorials/multi_agent/agent_supervisor)
- OpenAI Agents SDK (github.com/openai/openai-agents-python)
- Anthropic — Building Effective Agents (anthropic.com/research/building-effective-agents)
- MiMo AI `PROJECT_UNDERSTANDING.md` §5 (Agent components: supervisor pattern), §8 (decision #5: hybrid)
- MiMo AI `CAPABILITY_MAP.md` §5 (supervisor = C)
