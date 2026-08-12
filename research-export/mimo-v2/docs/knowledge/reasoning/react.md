# ReAct (Reason + Act)

**Category:** Reasoning
**Status:** CORE
**Maturity:** Production-ready

## Definition
An agent loop pattern that interleaves reasoning traces (`Thought`) and tool actions (`Action`) with environment observations (`Observation`) in a single coherent trajectory: `Thought → Action → Observation → Thought → … → Final Answer`. The model reasons about what to do, calls a tool, observes the result, then reasons again.

## Problem Solved
Pure CoT cannot incorporate fresh information — the model only knows what was in its prompt. Pure tool-calling without reasoning produces brittle agents that fire tools without judging whether the result answers the question. ReAct couples the two: reasoning directs tool choice; observations update reasoning.

## Why It Matters
It is the canonical **agent loop**. Every agent in MiMo's Agent Layer is, at minimum, a ReAct loop with identity, tools, permissions, and a budget. The pattern is also the substrate for the Execution Layer's step engine: each step is one `Thought → Action → Observation` cycle, persisted as a checkpoint.

## How It Works
1. **Thought** — model produces natural-language reasoning about the current state and what to do next.
2. **Action** — model emits a structured tool call (name + args) drawn from its tool registry.
3. **Observation** — runtime executes the tool (via Tool Layer) and returns the result to the model.
4. Loop back to Thought until the model emits `Final Answer` or hits a budget / kill-switch.

## Architecture
Spans three MiMo layers:
- **Reasoning Layer** — produces Thought.
- **Tool Layer** — executes Action (permission-gated, sandboxed).
- **Execution Layer** — drives the loop, persists each cycle as a checkpoint, enforces budget/timeout.
The Agent Layer wraps this loop with identity, memory, permissions, output contract. Observability logs each cycle as a span. Verification can be invoked on `Final Answer`.

## Interfaces
- `runReActLoop(agent: AgentHandle, task: TaskSpec): AsyncIterable<ReActStep>` yielding `{ type: 'thought'|'action'|'observation'|'final', payload }`.
- Tools conform to MiMo's tool registry interface `{ name, schema, permissions, execute(args): Promise<ToolResult> }`.
- Each step persisted via `lib/execution/checkpoint.ts` to allow resumption.

## Dependencies
- CoT-capable model (GLM-5.2 via Model Layer).
- Tool registry with permission checks (Security Layer).
- Checkpoint store (Prisma `ExecutionStep` table).
- Streaming + tool-calling support from z-ai-web-dev-sdk.

## Strengths
- Couples reasoning with grounded observations → fewer hallucinated facts.
- Tractable and well-understood; production-battle-tested in LangChain, AutoGPT, etc.
- Each step is observable, debuggable, and replayable.
- Naturally supports resumability (checkpoint per cycle).

## Weaknesses
- Latency multiplies (one model call per step + tool latency).
- Loops can be unbounded without budget enforcement.
- Observation quality is bottlenecked by tool result formatting — noisy tool output poisons the next thought.
- Linear trajectory — no backtracking on dead ends (use ToT / LATS for branching).

## Failure Modes
- **Tool-call format drift**: model emits args that don't match schema.
- **Infinite loop**: model keeps calling the same tool with same args.
- **Observation overflow**: tool returns more tokens than the context window can absorb.
- **Stale context**: long ReAct trajectories hit context limits (combine with Context Compression).
- **Tool-selection errors**: model picks a tool that cannot answer.

## Security Implications
- Every Action MUST pass through Security Layer permission check (RBAC+ABAC) before execution.
- Observations from untrusted sources (web pages, MCP servers) must be sanitised to prevent prompt injection poisoning the next Thought.
- Dangerous tools require approval gate (human-in-the-loop) before Action executes.
- Kill-switch must abort the loop within one cycle.

## Performance Implications
- Latency = N × (model_call + tool_call) — bounded by budget.
- Cost scales with trajectory length and observation size.
- Streaming helps perceived latency; parallel tool calls can reduce wall-clock where independent.

## Operational Implications
- Need per-agent budget (max steps, max tokens, max cost, max wall-clock).
- Need dead-letter handling for permanently-failing tools.
- Need trace export to Observability dashboard.
- Need replay tooling for debugging failed trajectories.

## Alternatives
- Pure CoT — no tools, no fresh info.
- Plan-and-Solve — plan once then execute; better when sub-tasks are known upfront.
- Reflexion — adds post-hoc critique and retry on failure.
- LATS — branching tree search; far more expensive.

## Maturity & Production Readiness
Production-ready since 2023. Standard agent loop in every major framework (LangChain, LlamaIndex, AutoGen, CrewAI, OpenAI Agents SDK). No research risk.

## Relevant Research / Papers
- Yao et al., 2022 — *ReAct: Synergizing Reasoning and Acting in Language Models*. (canonical)
- Shinn et al., 2023 — *Reflexion* (builds on ReAct).

## Official Documentation
- LangChain ReAct agent docs.
- OpenAI function-calling + reasoning cookbook.
- Z.ai GLM-5.2 tool-calling guide.

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement as `lib/agent/react-loop.ts` exposing an async generator.
- Agent identity + permissions stored in Prisma `Agent` table; tools registry in `Tool` table.
- Persist every cycle in `AgentStep { id, agentId, taskId, type, payload, tokensIn, tokensOut, latencyMs, createdAt }` for replay and audit.
- Stream steps via socket.io room `task:<taskId>` for live UI.
- Use z-ai-web-dev-sdk's native tool-calling (parallel-tools supported) rather than parsing free text — fewer format-drift failures.
- Wire checkpoint resume: on crash, query last `AgentStep` for `taskId`, reconstruct context via Context Layer, resume loop.
- Hard budget enforced by Execution Layer (cancels via AbortController).

## Relevance To Our Project (MiMo AI specifically)
ReAct is the **default agent loop** for the Agent Layer. Specialists (Researcher, Browser, Coding, Data, Analysis, Writer, Verifier) all run ReAct loops with different tool subsets. The Executive Layer is itself a meta-ReAct loop deciding "answer? search? tool? agent? continue? stop?". Long-horizon tasks persist each cycle as a checkpoint (Execution Layer) so the system can resume after crash — a hard requirement from `PROJECT_UNDERSTANDING.md` §4 Layer 10.

## Recommended Usage
- Default agent loop for any task needing tool use or fresh information.
- Set per-agent budget: typical `maxSteps = 20`, `maxTokens = 50k`, `maxWallClock = 5min` (tune per specialist).
- Combine with Reflexion for tasks that fail on first attempt.
- Escalate to Plan-and-Solve when sub-task decomposition is obvious upfront.

## Decision
**ADOPT** — canonical agent loop; no production system ships without it.

## Sources
- Yao et al., 2022, arXiv:2210.03629.
- Shinn et al., 2023, arXiv:2303.11366.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #4 (P0).
- Internal: `docs/CAPABILITY_MAP.md` §1 (ReAct = C) and §5 (ReAct agent loop = C).
