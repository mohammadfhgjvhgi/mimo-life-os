# Agent Architectures (Single / Supervisor / Specialist / Hierarchical)

**Category:** Agents
**Status:** CORE
**Maturity:** Production-ready (single, supervisor, specialist); Emerging (hierarchical at scale)

## Definition
An **agent architecture** is the structural pattern by which an LLM-based system organizes reasoning, tool use, memory, and control flow to accomplish goals. Four canonical patterns dominate practice:

1. **Single Agent** — one model, one control loop, full context continuity. The agent reasons, acts, observes, and reflects in a single stream.
2. **Supervisor** — a top-level "manager" agent that decomposes goals, dispatches sub-tasks to workers (which may themselves be single agents or tools), aggregates results, and decides completion.
3. **Specialist** — multiple named agents each scoped to a domain (research, coding, browser, data, writing, verification), with a router selecting the right specialist per step.
4. **Hierarchical** — recursive supervisor tree: a root supervisor delegates to mid-level supervisors, which delegate to leaf workers. Multi-depth organization chart.

These patterns are not mutually exclusive: real systems compose them. A single agent may invoke a specialist on demand; a supervisor may itself be a specialist of a higher supervisor.

## Problem Solved
A raw LLM has no control flow, no state, no tool memory, no decomposition ability. Without an architecture:
- Long tasks drift (no checkpoints, no resumption).
- Tool results are not fed back into reasoning.
- There is no concept of "task done" — only "model emitted text".
- Errors propagate because nothing verifies or retries.

Agent architectures impose **structure on top of stochastic generation**: they define the loop, the state transitions, the boundaries of work, and the seams where memory, tools, verification, and recovery plug in.

## Why It Matters
The architecture choice dictates:
- **Context continuity** — does the same reasoning stream see everything, or is state passed (lossy) between agents?
- **Cost & latency** — multi-agent systems multiply LLM calls and prompt sizes.
- **Failure surface** — every inter-agent boundary is a serialization/deserialization point that can lose information.
- **Verifiability** — supervisor/specialist patterns make it easier to attach per-step verification and output contracts.
- **Operability** — different agents can have different budgets, permissions, time-outs, and model routing.

For MiMo AI specifically, the architecture determines whether GLM-5.2's long-horizon capability is fully exploited (single-stream, 1M-token context) or fragmented across boundaries.

## How It Works

### Single Agent
```
loop:
  observe(context + last_tool_result)
  think (CoT / ReAct)
  decide: act(tool) | answer | reflect | stop
  if act: execute tool → result enters context
  if stop: return final answer
```
One state object, one growing context window, one decision-maker.

### Supervisor
```
supervisor:
  plan(goal) → list of sub-tasks
  for each sub-task:
    route → worker agent (or tool)
    worker executes, returns structured output
    supervisor reviews: PASS | REVISE | ESCALATE
  synthesize final answer
```
Supervisor holds the plan + aggregated results; workers hold narrow task context.

### Specialist
```
router(goal):
  classify → {research | coding | browser | data | write | verify | ...}
  dispatch → specialist_agent
  specialist returns output_contract
```
Each specialist has its own system prompt, tool set, permissions, and memory namespace.

### Hierarchical
```
root_supervisor
├── research_supervisor
│   ├── web_researcher
│   ├── doc_researcher
│   └── kg_researcher
├── build_supervisor
│   ├── coder
│   └── tester
└── verifier
```
Recursive delegation with depth-bounded recursion and per-level budgets.

## Architecture
```
                  ┌─────────────────────────────────────────┐
                  │            Executive / Router           │
                  │  (decides: single path | delegate)      │
                  └───────────────┬─────────────────────────┘
                                  │
        ┌─────────────────────────┼──────────────────────────┐
        │                         │                          │
   ┌────▼─────┐            ┌──────▼──────┐            ┌──────▼──────┐
   │  Single  │            │  Supervisor │            │ Specialist  │
   │  Agent   │            │  (plan +    │            │  Pool       │
   │  Loop    │            │  review)    │            │ (router →   │
   └────┬─────┘            └──────┬──────┘            │  one-of-N)  │
        │                         │                   └─────────────┘
        │                  ┌──────┴──────┐
        │                  │   Workers   │
        │                  │ (agents or  │
        │                  │  tools)     │
        │                  └─────────────┘
        │
   ┌────▼──────────────────────────────┐
   │  Shared: Memory | Tools | Verify  │
   │  Security | Observability         │
   └───────────────────────────────────┘
```
All four patterns sit on top of the **same** runtime services: Memory, Tool Layer, Verification, Recovery, Observability. The architecture is the control-flow overlay, not a parallel system.

## Interfaces
- **AgentRuntime.run(input, ctx) → AsyncGenerator<AgentEvent>** — stream of thought/tool/result/final events.
- **AgentSpec** — `{ id, role, systemPrompt, tools[], permissions, budget, timeout, outputContract, modelRef }`.
- **Handoff protocol** — `{ fromAgent, toAgent, taskSummary, stateRef, artifacts[] }`.
- **OutputContract** — Zod schema the agent's final result must satisfy; verifier rejects non-conforming output.
- **Checkpoint** — `agentId, stateBlob, contextRef, stepIndex, timestamp` persisted to SQLite.

## Dependencies
- Model Gateway (GLM-5.2 + fallback).
- Context Manager (assembles prompt for each agent).
- Memory subsystems (working / short / long / episodic).
- Tool Layer (registry, sandbox, policy engine).
- Verification + Recovery layers.
- Persistence (Prisma + SQLite) for checkpoints and journals.
- Event Bus for inter-agent signaling (socket.io for live UI).

## Strengths
- **Single**: maximum context continuity; lowest coordination overhead; best fit for long-horizon reasoning on GLM-5.2; cheapest; simplest to debug.
- **Supervisor**: enables decomposition for tasks genuinely too large for one stream; clear review gates; parallelizable sub-tasks.
- **Specialist**: each agent gets a tuned prompt + tool set + permissions → better quality on narrow domains; isolates failures.
- **Hierarchical**: scales to very large multi-day projects; matches human organizational intuition; allows per-branch budgets.

## Weaknesses
- **Single**: bounded by one context window; no parallelism; can get stuck in a single reasoning groove.
- **Supervisor**: supervisor prompt grows with sub-task results; coordination overhead; risk of supervisor losing detail.
- **Specialist**: handoff losses; routing errors send work to wrong specialist; harder end-to-end debugging; cost multiplies.
- **Hierarchical**: high latency; complex state propagation; failure isolation paradoxically hides root causes; over-engineering risk.

## Failure Modes
- **Architecture mismatch** — using multi-agent where single-agent would suffice → cost + lost context.
- **Handoff loss** — supervisor's summary omits a detail the worker needed → wrong result.
- **Router misclassification** — specialist pattern sends coding task to writer.
- **Runaway recursion** — hierarchical pattern delegates infinitely (must enforce depth limit).
- **Context fragmentation** — too many small agents → no agent sees the whole picture.
- **Silent failure** — worker returns plausible-but-wrong result and supervisor has no verifier.

## Security Implications
- Each agent must carry its **own permission set** — do not inherit supervisor's permissions automatically.
- Specialist agents with shell/filesystem access must be sandboxed (see `sandboxing.md`).
- Inter-agent handoff messages are untrusted input → treat as potentially prompt-injected.
- Supervisor approval gates must be enforced by the runtime, not by the supervisor's own LLM judgment.

## Performance Implications
- Single-agent latency ≈ N × model_round_trip (N = reasoning steps).
- Supervisor latency ≈ plan + Σ(worker) + review_rounds — often 2–5× single for same task.
- Specialist pool enables parallelism (independent sub-tasks can run concurrently).
- Hierarchical adds coordination latency per level.
- Token cost grows with the number of distinct prompts × their context sizes.

## Operational Implications
- Each agent needs: identity, logs, traces, metrics, cost attribution.
- Replay (for debugging) requires deterministic state reconstruction → checkpoints are mandatory for multi-agent.
- Live UI must render agent state across nested supervisors → socket.io event stream with agent-tree topology.
- Versioning: agent prompts/specs are code → git-tracked, regression-tested.

## Alternatives
- **Pure orchestration (no agents)** — hardcoded pipelines (Airflow-style). Loses adaptivity.
- **Blackboard system** — shared memory + multiple observers (older AI pattern; re-emerging as shared-context multi-agent).
- **Single prompt with all tools** — degenerate single-agent; works for trivial tasks but no loop, no recovery.
- **External agent platforms** — OpenAI Assistants, Claude Agent SDK — lock-in; we use Vercel AI SDK + custom loop instead.

## Maturity & Production Readiness
- Single + Supervisor + Specialist: production-ready, widely deployed (Cursor, Devin, Claude Code, ChatGPT agents).
- Hierarchical: emerging; LangGraph and AutoGen support it but production deployments beyond 2–3 levels are rare.
- All patterns suffer from the same underlying issue: stochastic LLM reasoning. The architecture mitigates but does not eliminate it.

## Relevant Research / Papers
- Yao, S. et al. (2022). *ReAct: Synergizing Reasoning and Acting in Language Models.* (foundational single-agent loop)
- Shinn, N. et al. (2023). *Reflexion: Language Agents with Verbal Reinforcement Learning.* (self-reflection single-agent)
- Wang, L. et al. (2024). *A Survey on Large Language Model based Autonomous Agents.* (taxonomy of architectures)
- Hong, J. et al. (2023). *MetaGPT: Meta Programming for Multi-Agent Collaborative Framework.* (specialist + role-based)
- Wu, Q. et al. (2023). *AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation.* (hierarchical conversation)
- Z.ai GLM-4.5/4.6 technical reports and coding-agent documentation (inferred: their approach favors single-stream long-context reasoning over fragmented multi-agent).

## Official Documentation
- Vercel AI SDK — `ai` package: `streamText`, `generateText`, `tool`, `stepCount` (Core library we will build on).
- LangGraph — `StateGraph`, `MessagesState`, supervisor pattern docs.
- OpenAI Agents SDK — `Agent`, `Runner`, `handoffs`.
- Anthropic Claude Agent SDK — tool-use loop reference.
- Mastra — TypeScript-native agent framework (alternative reference).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- Build the **AgentRuntime as a TypeScript module** consumed by an in-process Next.js server action OR a dedicated mini-service (`agents-service`, bun process, own port, reached via Caddy `?XTransformPort=4010`). Default: in-process for v1, mini-service when CPU/isolation demands it (see ADR pending).
- Use **Vercel AI SDK** `streamText` with `tools` and `maxSteps` as the loop primitive — it handles tool-call → tool-result → re-prompt natively. Wrap with our own checkpointing, verification, and recovery.
- Define **AgentSpec in Zod**, persisted to SQLite via Prisma (`Agent` table: id, role, systemPrompt, tools[], permissions, budget, modelRef, version). Versioned + git-backed.
- **zustand store** on the client holds the live agent tree (current agent, supervisor hierarchy, step counter, last events); socket.io pushes server-side `AgentEvent`s to update it.
- **socket.io room per task** — `task:<taskId>` — so the UI can subscribe to a single running task's stream without polling.
- Each agent runs inside the **Tool Layer's permission envelope** — no direct filesystem/network; all side-effects go through sandboxed tools.
- **Checkpoints** written to Prisma `AgentCheckpoint` table after every N steps (see `checkpointing.md`).
- **Caddy** fronts everything on one external port; the agents-service is reached internally only.

## Relevance To Our Project (MiMo AI layered runtime)
MiMo AI's Layer 7 (Executive) + Layer 8 (Agent) implement these architectures. The **default path is single-agent** (the Executive reasoning over the assembled context, calling tools, looping until done). Supervisor and specialist modes activate **only when** the Executive decides a sub-task is genuinely outside its scope (e.g., deep coding requiring a coding specialist with its own toolset + permissions). Hierarchical is deferred to v1.x.

The architecture directly serves the **long-horizon autonomy** goal: single-agent with checkpoints + resumability means a multi-day task can pause and resume without context loss. Multi-agent fragmentation would defeat this.

## Recommended Usage
- **Default: single-agent** for ~80% of tasks. Reasoning, planning, tool use, reflection all in one stream.
- **Specialist** when: (a) domain needs distinct system prompt + toolset (coding, browser automation); (b) permissions must be isolated; (c) cost of context pollution in single-agent exceeds specialist overhead.
- **Supervisor** when: a task decomposes into ≥3 independent sub-tasks that can run in parallel and need synthesis.
- **Hierarchical**: defer; only if v1.x needs multi-day multi-team projects.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** single-agent as default + specialist/supervisor as opt-in patterns. **DEFER** hierarchical to v1.x. **REJECT** agent voting/debate/swarm for v1 (research only).

## Sources
- Yao et al. 2022 — ReAct paper (arxiv.org/abs/2210.03629)
- Shinn et al. 2023 — Reflexion (arxiv.org/abs/2303.11366)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- Hong et al. 2023 — MetaGPT (arxiv.org/abs/2308.00352)
- Wu et al. 2023 — AutoGen (arxiv.org/abs/2308.08155)
- Vercel AI SDK docs (sdk.vercel.ai/docs)
- LangGraph docs (langchain-ai.github.io/langgraph)
- OpenAI Agents SDK (github.com/openai/openai-agents-python)
- Z.ai GLM technical reports (z.ai) — inferred preference for long-context single-stream
- MiMo AI `PROJECT_UNDERSTANDING.md` §4–§5 (layered runtime, agent components)
