# ReAct Agent Loop (Reason → Act → Observe)

**Category:** Agents
**Status:** CORE
**Maturity:** Production-ready

## Definition
**ReAct** is the agent loop pattern where the LLM interleaves **reasoning traces** ("Thought") with **actions** ("Action") and **observations** ("Observation") in a single stream, producing a trajectory: `Thought → Action → Observation → Thought → Action → … → Final Answer`. It was introduced by Yao et al. (2022) as a synergy of Chain-of-Thought reasoning and tool-use acting.

In modern implementations the explicit "Thought/Action/Observation" text markers are usually replaced by **native tool calling** (function-calling API), but the structural pattern is identical: the model reasons, decides on an action, the runtime executes it and feeds the result back, the model reasons again.

## Problem Solved
Before ReAct, two extremes dominated:
- **Pure Chain-of-Thought** — model reasons internally but cannot act; fails on tasks requiring external information (search, calculation, code execution).
- **Pure action / RL-style** — model emits actions but no explicit reasoning; hard to debug; reasoning is implicit and unreliable.

ReAct solves the **grounding problem**: the model's reasoning is grounded by real observations from tools, and tool selection is guided by explicit reasoning. It also solves the **debuggability problem**: every step has an auditable thought.

## Why It Matters
ReAct is the **default execution loop** for almost every LLM agent in production (Cursor, Claude Code, ChatGPT, Devin, GLM coding agents). It is the minimal viable agent: one model, one tool surface, one loop. For MiMo AI:

- It is the **single-agent default loop** (see `single_vs_multi_agent.md`).
- It is the **control-flow primitive** that the Executive layer (Layer 7) implements.
- It is the **substrate** on which reflection, planning, verification, and recovery are layered (those are *extensions* to ReAct, not replacements).

## How It Works
```
state.context = ContextManager.assemble(goal)
loop until max_steps or model says "done":
    1. THINK:  model generates reasoning given current context
              (internal CoT; may be elided in tool-calling mode)
    2. ACT:    model emits either:
                 - a tool_call {name, args}  → runtime executes
                 - a final_answer           → loop exits
                 - a "need_more_info"       → triggers retrieval
    3. OBSERVE: runtime appends tool result to context
    4. CHECKPOINT: persist state (see checkpointing.md)
    5. VERIFY (optional, per step or per milestone):
       if verification fails → trigger recovery
return final_answer
```

### Pseudo-trajectory (research task)
```
Thought: I need to find the latest GLM-5.2 benchmarks. I'll search.
Action:  web_search("GLM-5.2 benchmark MMLU HumanEval 2025")
Observation: [search results...]
Thought: The first result is the official Z.ai blog. I'll fetch it.
Action:  fetch_url("https://z.ai/blog/glm-5.2")
Observation: [page content...]
Thought: I have the benchmarks. The user asked for a comparison. I'll compute the delta.
Action:  python_exec("...")
Observation: [script output...]
Thought: I have everything. Final answer.
Action:  final_answer("GLM-5.2 improves over GLM-4.6 by ...")
```

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     ReAct Loop                              │
│  ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌────────┐ │
│  │  THINK   │───▶│   ACT    │───▶│ OBSERVE  │───▶│ CHECK  │─┼──┐
│  │ (model)  │    │(tool/ans)│    │(result)  │    │ POINT  │  │  │
│  └──────────┘    └──────────┘    └──────────┘    └────────┘  │  │
│       ▲                                                        │  │
│       └────────────── context.append ◀────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
        │                              │                  │
        ▼                              ▼                  ▼
   Model Gateway               Tool Runtime          Prisma + SQLite
   (GLM-5.2)                  (sandbox+policy)      (checkpoints, journal)
```

## Interfaces
- `ReActLoop.run(input: AgentInput): AsyncGenerator<ReActEvent>`
- `ReActEvent` union:
  - `{ type: 'thought', text: string }`
  - `{ type: 'action', tool: string, args: unknown }`
  - `{ type: 'observation', result: ToolResult }`
  - `{ type: 'checkpoint', ref: string }`
  - `{ type: 'final', answer: unknown }`
  - `{ type: 'error', cause: Error, recoverable: boolean }`
- Loop configuration: `{ maxSteps, maxTokens, maxCost, timeoutMs, tools[], allowReflect: bool }`.

## Dependencies
- Model Gateway (GLM-5.2 native tool calling).
- Tool Runtime (registry, sandbox, policy, retries — see `tool_runtime.md`).
- Context Manager (manages the growing trajectory; compresses when needed).
- Checkpointing (per-step state persistence).
- Verification (optional per-step; mandatory per-milestone).
- Recovery (on `error` or verification FAIL).

## Strengths
- **Simple** — one loop, one state object, one model. Easy to implement, debug, and reason about.
- **Grounded** — every claim is backed by an observation or a memory retrieval.
- **Auditable** — the trajectory is a complete record of why the agent did what it did.
- **Composable** — reflection, planning, verification, recovery all slot in as extensions.
- **Native** — modern LLMs (GLM-5.2 included) are trained for this loop; tool-calling API is the native interface.

## Weaknesses
- **Serial** — actions execute one at a time; no parallelism without extension.
- **Context grows** — long trajectories bloat context; needs compression/summarization.
- **Can loop** — agent may repeat failed actions (mitigated by reflection + step budget).
- **No explicit plan** — pure ReAct is reactive; large multi-step tasks benefit from upfront Plan-and-Solve (we layer that on top).
- **Tool selection errors cascade** — one bad tool call can derail the trajectory (mitigated by verification + reflection).

## Failure Modes
- **Infinite loop** — agent keeps calling the same tool with same args. Mitigation: detect repetition, force reflection, decrement step budget.
- **Context overflow** — too many observations bloat context. Mitigation: Context Manager summarizes older steps.
- **Hallucinated tool args** — model invents args that don't match the tool schema. Mitigation: Zod schema validation before execution; reject + re-prompt.
- **Tool failure cascade** — one tool fails, agent retries blindly. Mitigation: retry budget per tool; on exhaustion, reflect or escalate.
- **Premature termination** — agent declares "done" without verification. Mitigation: mandatory verifier for important tasks.
- **Stuck in reflection** — extended reflection without action. Mitigation: reflection-step budget.

## Security Implications
- Every action passes through the Tool Policy Engine (permissions, sandbox, approval — see `tool_policy_engine.md`, `approval_workflow.md`).
- Observations from tools are **untrusted input** to the next reasoning step — they may contain prompt injection. Mitigation: observations are tagged as `system:tool_output`, fenced, and the model is instructed to treat them as data not instructions.
- Step budget caps runaway loops that could exfiltrate data or burn cost.

## Performance Implications
- Latency = Σ step_latencies. Each step = 1 model call + 0..N tool calls.
- Token cost grows with trajectory length — Context compression is essential for long tasks.
- Parallelizable variant: when the model emits multiple independent tool calls in one step, execute them concurrently (modern tool-calling APIs support this).

## Operational Implications
- Every step logged with `{ agentId, stepIndex, thought, action, observation, durationMs, costUsd }`.
- Trajectory is replayable from checkpoints for debugging.
- Live UI renders the trajectory as a stream of thought/action/observation cards via socket.io.
- Cost attribution per step enables budget enforcement + analytics.

## Alternatives
- **Plan-and-Solve** — generate full plan first, then execute. Better for large tasks; we layer on top of ReAct (Executive plans, then ReAct executes each step).
- **Reflexion** — ReAct + verbal self-critique after failure. We adopt as an extension, not a replacement.
- **Tree-of-Thoughts** — explore multiple reasoning branches in parallel. Research-stage; not core.
- **Pure tool-calling without explicit reasoning** — degenerate ReAct with no Thought step. Loses debuggability.

## Maturity & Production Readiness
**Production-ready, industry standard.** Every major agent framework (Vercel AI SDK, LangGraph, OpenAI Agents SDK, Claude Agent SDK, Mastra) implements ReAct as the default loop. GLM-5.2 is trained for native tool calling which is the modern ReAct substrate.

## Relevant Research / Papers
- Yao, S. et al. (2022). *ReAct: Synergizing Reasoning and Acting in Language Models.* arXiv:2210.03629. (Foundational.)
- Wei, J. et al. (2022). *Chain-of-Thought Prompting Elicits Reasoning in Large Language Models.* arXiv:2201.11903. (CoT substrate.)
- Shinn, N. et al. (2023). *Reflexion: Language Agents with Verbal Reinforcement Learning.* arXiv:2303.11366. (ReAct + self-critique.)
- Yao, S. et al. (2023). *Tree of Thoughts.* arXiv:2305.10601. (Alternative search-based reasoning.)

## Official Documentation
- Vercel AI SDK — `streamText({ tools, maxSteps })` implements ReAct natively.
- LangGraph — `create_react_agent` helper.
- OpenAI — function calling / tool calling docs (the API primitive).
- Z.ai API docs — GLM-5.2 tool calling (via z-ai-web-dev-sdk).
- Anthropic — Claude tool use docs (reference implementation).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- Use **Vercel AI SDK `streamText`** with `tools` (Zod schemas) and `maxSteps: 50` (configurable per task). The SDK handles the tool-call → tool-result → re-prompt loop natively; we wrap it with our own:
  - **Pre-step hooks**: permission check, policy evaluation, approval gate (for high-risk tools).
  - **Post-step hooks**: checkpoint write, observability span, cost accrual.
  - **Step budget enforcement**: hard cap on `maxSteps` + total cost + wall-clock.
- **z-ai-web-dev-sdk** exposes GLM-5.2 via the Vercel AI SDK provider interface — single import, no custom HTTP.
- **Prisma schema** for trajectory persistence:
  - `AgentRun` (id, goal, status, startedAt, endedAt, totalCostUsd, modelRef)
  - `AgentStep` (id, runId, stepIndex, type, thought, toolName, toolArgs, observation, durationMs, costUsd, checkpointRef)
  - Indexed on `(runId, stepIndex)` for replay.
- **socket.io** emits `step:thought`, `step:action`, `step:observation`, `step:checkpoint` events to room `task:<runId>`. UI subscribes; **zustand** store appends steps to `useRunStore.steps[]`.
- **Loop runs in Next.js server action** for v1 (single process). Promote to a dedicated `agents-service` mini-service (bun, own port, Caddy `?XTransformPort=4010`) only when (a) loop runs > 5 min and would block other requests or (b) needs separate process isolation.
- **Repetition detector**: hash `(toolName, args)` of last 3 steps; if duplicate, force a `reflect` step before next action.
- **Reflection extension**: every K steps or on tool failure, inject a `reflect` tool that prompts the model to critique its trajectory so far. Output is appended to context as a structured `Reflection` block.
- **Verification hook**: at configurable milestones (every N steps or at `final_answer`), invoke the Verifier; on FAIL, trigger Recovery (see `recovery.md`).

## Relevance To Our Project (MiMo AI layered runtime)
ReAct is the **Executive layer's primary loop** (Layer 7). It sits on top of the Model Gateway (Layer 1), Context (Layer 2), Memory (Layer 3), Knowledge (Layer 4), Reasoning (Layer 5 — the "Thought" step), Planning (Layer 6 — optional upfront plan), and Tool Layer (Layer 9 — the "Action" executor). It produces the trajectory that Layer 10 (Execution) checkpoints and Layer 11 (Verification) inspects.

For long-horizon tasks, ReAct + checkpoints + reflection is the **minimal viable autonomy**: the agent can run for hours, pause, resume, recover from failures, and produce an auditable trajectory.

## Recommended Usage
- **Default loop** for all single-agent tasks.
- Configure `maxSteps` per task class: simple Q&A → 5; research → 30; coding → 100; multi-day → 1000+ with checkpoints.
- Always pair with: Context compression, Checkpointing, Verification (per milestone), Recovery (on failure), Observability (per step).
- Use **parallel tool calls** within a single step when the model emits multiple independent actions.
- Layer **Plan-and-Solve** on top for large tasks: Executive emits a plan, then ReAct executes each plan step.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** as the default agent loop. **ADOPT** Reflexion-style reflection as a layered extension. **DEFER** Tree-of-Thoughts to research. **REJECT** pure-tool-calling-without-reasoning as the default (loses auditability).

## Sources
- Yao et al. 2022 — ReAct (arxiv.org/abs/2210.03629)
- Wei et al. 2022 — Chain-of-Thought (arxiv.org/abs/2201.11903)
- Shinn et al. 2023 — Reflexion (arxiv.org/abs/2303.11366)
- Yao et al. 2023 — Tree of Thoughts (arxiv.org/abs/2305.10601)
- Vercel AI SDK docs (sdk.vercel.ai/docs/ai-sdk-core/agents)
- LangGraph `create_react_agent` (langchain-ai.github.io/langgraph)
- Z.ai API docs (z.ai) + z-ai-web-dev-sdk
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 7 Executive, Layer 5 Reasoning)
- MiMo AI `CAPABILITY_MAP.md` §1 (ReAct = C), §5 (ReAct loop = C)
