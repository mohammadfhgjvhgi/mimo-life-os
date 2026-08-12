# Single vs Multi-Agent — The Critical Decision

**Category:** Agents
**Status:** CORE
**Maturity:** Production-ready (both patterns); the *decision* of which to default to is the contentious part

## Definition
**Single-agent** means one LLM reasoning stream owns the entire task: planning, tool selection, execution, observation, reflection, and final answer all happen in one continuous context. **Multi-agent** means the task is split across two or more LLM instances, each with its own context, communicating via handoff messages.

The decision is *not* "which is better in the abstract" — it is "which default should the runtime pick, and when should it deviate." This file documents MiMo AI's default and the criteria for deviation.

## Problem Solved
Every autonomous AI system faces: **when does the LLM reason as one mind, and when does it split?** Get this wrong and you either:
- Over-fragment → lose context, multiply cost, debug hell (multi-agent where single would do).
- Over-concentrate → hit context ceiling, miss parallelism, lose domain specialization (single where multi would help).

The decision affects context continuity, cost, latency, debuggability, verification, and recovery — i.e., everything that matters for long-horizon autonomy.

## Why It Matters
This is the **single most consequential architectural decision** for a long-horizon system, because:

1. **Context continuity is the scarce resource.** GLM-5.2 has up to 1M-token context. When the LLM holds the full task state — plan, prior steps, tool results, memory — its reasoning is grounded. Every agent boundary is a *serialization checkpoint* where information is compressed into a handoff message; whatever was omitted is lost.

2. **Z.ai's own approach leans single-stream.** Their long-horizon model is optimized for sustained reasoning in one context. Fragmenting across agents throws away that capability. (Inferred from GLM-4.5/4.6 technical positioning; not an official Z.ai statement.)

3. **Multi-agent cost grows multiplicatively.** Each agent has its own system prompt, its own context, its own review rounds. A 5-agent system is rarely 5× the cost — it is often 10–15× when you count coordination, handoffs, and supervisor reviews.

4. **Debugging single-agent is linear.** Multi-agent debugging is graph traversal — you must reconstruct who-saw-what-when across N contexts.

5. **Failure isolation cuts both ways.** Multi-agent isolates failures *but also isolates information*. A specialist that produces a subtly wrong result may not be caught by a supervisor whose summary omits the relevant detail.

## How It Works

### Single-Agent Default Path
```
Executive.run(goal):
  context = ContextManager.assemble(goal, memory, knowledge, state)
  loop:
    response = model.stream(context, tools)
    if response.has_tool_calls:
      for tool_call: result = ToolRuntime.execute(tool_call, sandbox, policy)
      context.append(tool_results)
      checkpoint(state)
    else:
      return response.final_answer
```
One `context` object grows across the entire task. Tools are inline. Checkpoints capture the full state.

### Multi-Agent Deviation Path (only when justified)
```
Executive.run(goal):
  if task.requires_specialist(domain) and single_agent_would_lose:
    specialist = Router.select(domain)
    result = specialist.run(subtask, handed_off_context)
    Executive.review(result) → PASS | REVISE | REJECT
    if PASS: integrate into main context
  else:
    single_agent_path()
```

### The Decision Function
A task justifies multi-agent **only if at least one** is true:
1. **Distinct toolset + permissions** — e.g., coding specialist needs shell+git; research specialist needs browser+search; their tool surfaces are incompatible in one prompt.
2. **Domain prompt specialization** — a coding system prompt with strict output contracts differs materially from a research prompt.
3. **Parallelism** — multiple independent sub-tasks (e.g., scrape 5 sites simultaneously) where serial single-agent is too slow.
4. **Context ceiling** — total work genuinely exceeds 1M tokens of accumulated state (rare; usually means context management is broken).
5. **Isolation requirement** — security demands that one sub-task (e.g., executing untrusted code) cannot see another's context.

If none of (1)–(5) hold, **single-agent wins**.

## Architecture
```
                 ┌─────────────────────────────┐
                 │   Executive (single agent   │
                 │   by default)               │
                 │   context: full task state  │
                 └──────────────┬──────────────┘
                                │
              ┌─────────────────┴──────────────────┐
              │                                     │
   ┌──────────▼──────────┐           ┌─────────────▼─────────────┐
   │ DEFAULT: stay here  │           │ DEVIATE: spawn specialist │
   │ Reason over full    │           │ when criteria (1)-(5) met │
   │ context, call tools │           │ Handoff = compressed      │
   │ inline               │           │ subtask + minimal ctx    │
   └─────────────────────┘           └───────────────────────────┘
```

## Interfaces
- `Executive.shouldDelegate(task) → { delegate: bool, specialist?: AgentRole, reason: string }` — explicit decision function, logged.
- `Context.fork(prefix) → ChildContext` — when delegating, fork the context with a compressed summary; never hand the parent's full context to a specialist (security + cost).
- `HandoffMessage { task, summary, allowedTools, outputContract, returnTo: agentId }`.

## Dependencies
- Context Manager (compression / summarization for handoffs).
- Router (specialist selection).
- Memory (per-agent namespace isolation when needed).
- Verification (the specialist's output must be verified — the supervisor cannot trust it).
- Checkpointing (both agents' states persisted for resume).

## Strengths
- **Single-agent**: maximal context continuity; lowest cost; simplest debugging; best leverages GLM-5.2 long-horizon; fewest prompt-injection surfaces.
- **Multi-agent (when justified)**: domain specialization; parallelism; permission isolation; can fit tasks that genuinely exceed one context.

## Weaknesses
- **Single-agent**: bounded by one context window (mitigated by memory + retrieval); no parallelism; can get stuck in one reasoning mode (mitigated by reflection step).
- **Multi-agent**: handoff loss; cost; debugging complexity; routing errors; supervisor context bloat; trust propagation (supervisor trusting wrong specialist output).

## Failure Modes
- **Default-to-multi-antipattern** — using CrewAI-style role-playing agents by default because "it looks like a team." Most tasks do not need a team.
- **Handoff amnesia** — supervisor summarizes away a critical detail; specialist produces correct-but-irrelevant output.
- **Router thrash** — task bounces between specialists because routing classifier is noisy.
- **Supervisor context overflow** — too many specialist outputs pile into supervisor's context; supervisor loses the plot.
- **Trust without verification** — supervisor accepts specialist output as ground truth; no verifier; silent wrong answer.

## Security Implications
- Single-agent = one permission envelope. Easier to audit. Fewer handoff messages that could carry prompt injection.
- Multi-agent = N permission envelopes. Each specialist must be capability-scoped. Handoff messages are **untrusted input** to the receiving agent (treat as adversarial).
- Specialist with shell access must be sandboxed *separately* from specialist with web access — no shared filesystem namespace.

## Performance Implications
- Single-agent token cost ≈ Σ step_context_sizes (one stream).
- Multi-agent token cost ≈ Σ specialist_context_sizes + supervisor_context_sizes + handoff_message_sizes × 2 (sent + received).
- Latency: single-agent is serial; multi-agent can parallelize independent branches but adds coordination RTT.
- For a typical 30-minute research task, single-agent is usually 2–4× cheaper than a 3-agent crew for equivalent quality (industry observation; not a formal benchmark).

## Operational Implications
- Single-agent: one trace, one log stream, one cost line item.
- Multi-agent: N traces + a coordination trace; observability must reconstruct the agent graph.
- Replay (deterministic debugging) is straightforward for single-agent; multi-agent requires deterministic scheduling (non-trivial with parallel specialists).

## Alternatives
- **Hybrid (chosen default)** — single-agent base, specialists on demand. Best of both, at the cost of a more complex runtime.
- **Pure single-agent** — simpler but cannot isolate dangerous tools or parallelize.
- **Pure multi-agent** — over-engineered for ~80% of tasks.
- **Blackboard / shared memory** — agents read/write a shared state object instead of handoffs; reduces handoff loss but adds coordination complexity. Research-stage for LLM agents.

## Maturity & Production Readiness
- Single-agent with tool calling: **production-ready, industry standard** (Cursor, Claude Code, ChatGPT, GLM coding).
- Multi-agent crews: **production-deployed but often over-used** (CrewAI, AutoGen deployments); quality varies widely.
- The *hybrid default-single* approach: **emerging consensus** among production teams (e.g., Anthropic's guidance to "start with one agent, add more only when needed"); not yet a formal standard.

## Relevant Research / Papers
- Yao et al. 2022 — ReAct (single-agent loop baseline).
- Shinn et al. 2023 — Reflexion (single-agent self-improvement).
- Hong et al. 2023 — MetaGPT (multi-agent specialist roles).
- Wu et al. 2023 — AutoGen (multi-agent conversation).
- Anthropic, *Building Effective Agents* (2024) — engineering guidance: "start simple, add complexity when measured benefit justifies it." (Inferred alignment with our default.)
- Wang et al. 2024 — Survey on LLM-based autonomous agents (architecture taxonomy).

## Official Documentation
- Vercel AI SDK — `streamText` with `maxSteps` (single-agent loop primitive).
- LangGraph — both single-agent (`MessagesState`) and supervisor patterns documented.
- OpenAI Agents SDK — handoff primitive; defaults to single-agent with opt-in handoff.
- Anthropic Claude Agent SDK — same default-single philosophy in tool-use docs.
- Mastra — TypeScript agent framework; supports both patterns.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Default the Executive to single-agent** using `z-ai-web-dev-sdk` (via Vercel AI SDK adapter) with `streamText({ tools, maxSteps: 50 })`. This is one bun/Next.js process; no inter-process overhead.
- The **`shouldDelegate` decision function** is a TypeScript module that takes the current task + agent state and returns a delegation verdict. It is logged to Prisma `DelegationDecision` table for audit + later learning.
- When delegating, the specialist runs **in the same process** for v1 (function call, not network call) to avoid mini-service overhead. Promote to a dedicated mini-service (own bun port, Caddy `?XTransformPort=4020`) **only** if (a) isolation requires it (e.g., coding specialist that runs untrusted code) or (b) CPU/memory demands it.
- **zustand store**: `useAgentStore` holds `{ mode: 'single' | 'supervised', currentAgent, specialists: [], handoffs: [] }`. UI renders a tree if supervised, a single thread if single.
- **socket.io** emits `agent:step`, `agent:delegate`, `agent:handoff`, `agent:return` events; UI replays them into the store.
- **Prisma** tables: `Agent`, `AgentRun`, `AgentStep`, `Handoff`, `DelegationDecision`. All versioned + git-backed where prompts are concerned.
- **Never** fork the full parent context to a specialist — use `ContextManager.compress(parentContext, subtask)` to produce a minimal handoff prompt. This bounds specialist cost and prevents context leak across permission boundaries.

## Relevance To Our Project (MiMo AI layered runtime)
This decision **shapes Layer 7 (Executive) and Layer 8 (Agent)**. By defaulting to single-agent:
- The Executive's reasoning loop is the primary execution path.
- Layer 8's specialist agents are *available but dormant* unless the Executive explicitly delegates.
- Layer 10 (Execution) checkpoints a single agent's state — much simpler than coordinating N agents.
- Layer 9 (Tool) needs only one permission envelope per task by default.
- Layer 12 (Recovery) only needs to resume one stream.

This default is **aligned with Z.ai's long-horizon model philosophy**: GLM-5.2 is built to sustain reasoning across one long context. The runtime should *not* fragment that capability unless there is a concrete reason.

## Recommended Usage
- **Default**: single-agent. The Executive reasons, plans, calls tools, reflects, and answers in one stream.
- **Deviate to specialist** when one of criteria (1)–(5) above is true. Log the reason.
- **Never** use multi-agent for "it feels more capable" — measure first. If a benchmark shows single-agent fails where multi-agent succeeds, *then* adopt.
- Periodically audit `DelegationDecision` table: if >30% of tasks delegate, investigate whether context management is failing (specialists are masking a context-assembly bug).

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** single-agent as the runtime default with explicit, logged deviation to specialists when justified. **REJECT** "always multi-agent" / CrewAI-style role-playing as a default. **DEFER** agent-swarm / voting / debate to research-only (E classification).

## Sources
- Yao et al. 2022 — ReAct (arxiv.org/abs/2210.03629)
- Shinn et al. 2023 — Reflexion (arxiv.org/abs/2303.11366)
- Hong et al. 2023 — MetaGPT (arxiv.org/abs/2308.00352)
- Wu et al. 2023 — AutoGen (arxiv.org/abs/2308.08155)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- Anthropic — *Building Effective Agents* (anthropic.com/research/building-effective-agents) — inferred alignment
- Vercel AI SDK docs (sdk.vercel.ai/docs)
- MiMo AI `PROJECT_UNDERSTANDING.md` §8 (key decision #5: hybrid agent strategy)
- MiMo AI `CAPABILITY_MAP.md` §5 (Agents: single-agent = C, specialist = R)
