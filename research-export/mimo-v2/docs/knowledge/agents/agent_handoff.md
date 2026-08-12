# Agent Handoff

**Category:** Agents
**Status:** REQUIRED
**Maturity:** Production-ready

## Definition
**Agent handoff** is the controlled transfer of a task (or sub-task) from one agent to another, including the context, artifacts, and output contract needed to continue the work. It is the **primitive that connects agents** in a multi-agent system — the message that says "Agent A is done with X; Agent B, please take over / continue from here."

A handoff is **not** simply calling a tool. It is a structured transfer of responsibility: the receiving agent owns the next step's outcome, the sending agent relinquishes ownership (or supervises the result).

## Problem Solved
In a multi-agent system, work must flow between agents without:
- **Information loss** — critical context dropped during transfer.
- **Ambiguity** — receiving agent unsure what was asked.
- **Unbounded scope** — receiving agent does more (or less) than intended.
- **Trust violation** — receiving agent's output accepted without verification.
- **State drift** — sender and receiver disagree about task state.

Handoff solves these by defining a **typed message** that carries: the task, a compressed context summary, allowed tools, an output contract, a return address, and (optionally) a deadline/budget.

## Why It Matters
For MiMo AI, handoffs are the **load-bearing primitive** of the supervisor + specialist patterns (see `supervisor_pattern.md`, `agent_architectures.md`). Every delegation, every specialist invocation, every verifier call is a handoff. Get this primitive wrong and the multi-agent path falls apart.

Handoffs are also the **primary prompt-injection surface** in a multi-agent system: a malicious tool output observed by Agent A can be carried into Agent B's context via the handoff summary. The handoff format must defend against this.

## How It Works

### Handoff message structure
```typescript
type Handoff = {
  handoffId: string;
  from: AgentId;
  to: AgentRole;        // resolved by Router to a concrete agent
  taskId: string;
  taskDescription: string;
  contextSummary: CompressedContext;  // never the full parent context
  artifacts: Artifact[];              // files, URLs, prior results
  allowedTools: ToolName[];
  outputContract: ZodSchema;
  budget: { maxSteps; maxCostUsd; timeoutMs };
  returnTo: AgentId;
  deadline?: ISO8601;
  priority?: 'low' | 'normal' | 'high';
};
```

### Handoff flow
```
1. SENDER (supervisor or specialist):
   - decides to delegate (per shouldDelegate criteria)
   - constructs Handoff message:
     - compress parent context (ContextManager.compress)
     - extract relevant artifacts
     - define outputContract (Zod)
     - scope allowedTools (least-privilege)
   - persists Handoff to DB
   - emits handoff:initiated event

2. ROUTER:
   - resolves `to` (AgentRole) to a concrete agent instance
   - checks receiver's availability + permissions match
   - if mismatch → handoff:rejected, return to sender

3. RECEIVER:
   - loads Handoff
   - constructs initial context from contextSummary + artifacts
   - runs its own agent loop with allowedTools + outputContract
   - on completion: produces WorkerOutput validated against outputContract
   - emits handoff:completed with result + artifacts

4. SENDER (resumes):
   - receives WorkerOutput
   - verifies contract (Zod safeParse)
   - reviews (PASS | REVISE | ESCALATE)
   - integrates result into parent context
```

### Handoff types
- **Delegation** — supervisor → worker; worker owns subtask.
- **Escalation** — worker → supervisor (or higher); worker cannot complete, escalates.
- **Chain** — A → B → C (sequential specialists).
- **Broadcast** — supervisor → multiple workers (parallel); each gets a copy of the handoff.
- **Return** — worker → supervisor; carries the result back.

## Architecture
```
┌────────────────┐                       ┌────────────────┐
│  Sender Agent  │                       │ Receiver Agent │
│  (supervisor)  │                       │  (specialist)  │
└───────┬────────┘                       └────────▲───────┘
        │                                         │
        │  1. construct Handoff                   │
        ▼                                         │
┌────────────────────────┐                        │
│   Handoff Queue        │                        │
│   (Prisma + SQLite)    │────────────────────────┘
└───────────┬────────────┘
            │  2. Router resolves receiver
            ▼
┌────────────────────────┐
│   Router               │
│   (role → agent)       │
└───────────┬────────────┘
            │  3. dispatch
            ▼
        receiver executes
            │
            │  4. WorkerOutput (contract-validated)
            ▼
┌────────────────────────┐
│  Verification Layer    │
│  (Zod + Verifier)      │
└───────────┬────────────┘
            │  PASS
            ▼
        sender integrates
```

## Interfaces
- `HandoffBroker.send(handoff: Handoff): Promise<HandoffId>`
- `HandoffBroker.receive(handoffId: HandoffId): Promise<WorkerOutput>`
- `Router.resolve(role: AgentRole, constraints): AgentId`
- `WorkerOutput { handoffId, result: unknown, contractValid: bool, artifacts: Artifact[], trajectory: TrajectoryRef }`
- `HandoffStatus = 'pending' | 'dispatched' | 'in_progress' | 'completed' | 'rejected' | 'failed' | 'timed_out'`

## Dependencies
- Context Manager (compression for handoff summary).
- Router (role → agent resolution).
- Verification layer (output contract validation).
- Tool Layer (receiving agent's `allowedTools` must be permission-checked).
- Persistence (Prisma — handoffs are first-class persisted objects).
- Event Bus (socket.io for handoff lifecycle events).
- Checkpointing (both sender and receiver checkpoint independently).

## Strengths
- **Typed** — Zod schema enforces structure; no ad-hoc message passing.
- **Auditable** — every handoff persisted with full provenance.
- **Resumable** — a crashed receiver can resume from its checkpoint; sender waits or escalates.
- **Secure** — `allowedTools` enforces least-privilege per handoff; context compression reduces data leak.
- **Asynchronous** — handoff queue decouples sender from receiver (sender can do other work or wait).
- **Parallelizable** — broadcast handoffs enable parallel specialist execution.

## Weaknesses
- **Overhead** — every handoff is a DB write + context compress + dispatch. Adds latency + cost.
- **Compression loss** — context summary may omit details the receiver needs.
- **Coordination complexity** — N handoffs in flight → tracking + timeout management.
- **Trust propagation** — receiver's output is only as trustworthy as the verifier (Zod is structural; semantic verification is harder).
- **Latency floor** — minimum handoff RTT ≈ compress + dispatch + receiver init + execute + verify.

## Failure Modes
- **Lost handoff** — sender dispatched but receiver never picked up (queue leak). Mitigation: handoff TTL + watchdog.
- **Receiver rejection** — receiver's role doesn't match task, or tools unavailable. Mitigation: router pre-flight check.
- **Contract mismatch** — receiver produces output that doesn't match `outputContract`. Mitigation: Zod validation; on FAIL, REVISE or ESCALATE.
- **Context loss** — compression dropped a critical detail. Mitigation: include `artifacts[]` references (not just summaries); receiver can fetch raw data.
- **Prompt injection via handoff** — malicious content in `contextSummary` or `artifacts` hijacks receiver. Mitigation: handoff content is untrusted input; receiver's system prompt must fence it; tool calls from receiver are still policy-checked.
- **Deadlock** — A waits for B, B waits for A (rare; mostly in cyclic chains). Mitigation: cycle detection in router; global timeout.
- **Timeout cascade** — receiver times out, sender's deadline already passed. Mitigation: sender's deadline > receiver's deadline + verification margin.

## Security Implications
- Handoff content (`contextSummary`, `artifacts`) is **untrusted input** to the receiver — same prompt-injection defenses as tool outputs.
- `allowedTools` must be the **intersection** of sender's permissions and receiver's role permissions — never the union.
- Artifacts (file paths, URLs) in handoffs must be validated by the Tool Layer before the receiver can access them.
- Handoff messages are logged for audit but **sensitive fields redacted** (API keys, PII).
- Cross-permission handoffs (e.g., from a low-privilege agent to a high-privilege one) require an approval gate.

## Performance Implications
- Handoff RTT ≈ 50–500ms (DB write + compress + dispatch + receiver init) excluding receiver execution.
- Context compression cost ≈ 1 model call (summarization) — significant for frequent handoffs.
- Parallel broadcast handoffs amortize compression (one compress, N receives).

## Operational Implications
- Every handoff has a lifecycle: `pending → dispatched → in_progress → completed/failed/timed_out`.
- Live UI shows handoff graph (sender → receiver edges) for supervised tasks.
- Replay requires deterministic handoff ordering — record dispatch timestamps.
- Cost attribution: handoff overhead (compress + dispatch + verify) is a separate cost line per subtask.

## Alternatives
- **In-process function call** — degenerate handoff (no DB, no queue). Acceptable for v1 in-process specialists. Loses durability.
- **Shared blackboard** — agents read/write shared state instead of handoffs. Reduces compression loss but adds coordination. Research-stage.
- **Direct agent-to-agent chat** (AutoGen-style) — agents converse freely. Higher token cost; less structure. Not our default.

## Maturity & Production Readiness
**Production-ready.** OpenAI Agents SDK has `handoffs` as a first-class primitive. LangGraph supports subgraph invocation with state passing. Anthropic documents handoff patterns. The pattern is well-understood; the engineering rigor (typed contracts, verification, audit) is what varies.

## Relevant Research / Papers
- Wu et al. 2023 — *AutoGen* (conversational handoffs between agents).
- Hong et al. 2023 — *MetaGPT* (structured handoffs with role-based contracts).
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (communication/handoff taxonomy).
- OpenAI — *Agents SDK handoffs* documentation (2024).

## Official Documentation
- OpenAI Agents SDK — `handoffs` parameter on `Agent`.
- LangGraph — `Command` for subgraph handoff with state.
- Anthropic — *Multi-Agent Systems* engineering note.
- Mastra — `workflow.step()` for typed agent handoffs in TypeScript.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Prisma schema**:
  - `Handoff` (id, fromAgentId, toRole, taskId, taskDescription, contextSummary JSON, artifacts JSON, allowedTools JSON, outputContract JSON, budget JSON, status enum, createdAt, dispatchedAt, completedAt, parentRunId)
  - `HandoffArtifact` (id, handoffId, kind, ref, mimeType, sizeBytes)
  - Indexed on `(status, toRole)` for "find pending handoffs for role X".
- **ContextManager.compress(parentContext, subtask)**: produces a `CompressedContext` = structured summary + artifact references + retrieval hints (so receiver can pull raw data on demand via Knowledge/Memory layers).
- **Router**: TypeScript module; maps `AgentRole` to a concrete `AgentSpec` (in-process for v1, mini-service for specialists needing isolation). Includes pre-flight permission check.
- **Handoff broker**: in-process for v1 (function call); promote to a queue (BullMQ or SQLite-based) if mini-services are adopted. The broker persists handoff + dispatches + waits for result.
- **socket.io**: emit `handoff:initiated`, `handoff:dispatched`, `handoff:received`, `handoff:completed`, `handoff:failed`. **zustand** store `useHandoffStore` holds the handoff graph for the current task; UI renders edges in the supervisor tree.
- **Zod contracts**: stored alongside agent spec in the `Agent` table; validated at handoff completion via `contract.safeParse(output)`.
- **Timeouts**: per-handoff `timeoutMs`; broker enforces; on timeout, handoff status → `timed_out`, sender decides (retry, escalate, or partial-result synthesis).
- **Audit**: every handoff logged with redacted content (PII/api-key scrubber).

## Relevance To Our Project (MiMo AI layered runtime)
Handoffs are the **connective tissue of Layer 8 (Agent)**. The Executive (Layer 7) issues handoffs to specialists; specialists return WorkerOutputs. Layer 11 (Verification) validates the output contract. Layer 12 (Recovery) handles REVISE/ESCALATE. Layer 13 (Learning) records handoff outcomes (good/bad transfers) for later improvement (e.g., "compression dropped a detail — adjust summarizer").

Handoffs are **only used in the multi-agent path** (deviation from single-agent default). When the Executive stays single-agent, no handoffs occur — tools are called inline.

## Recommended Usage
- Use handoffs **only** when delegating to a specialist (per `single_vs_multi_agent.md` deviation criteria).
- Always: typed `Handoff` message, Zod `outputContract`, scoped `allowedTools`, compressed `contextSummary`, persisted to DB, audited.
- Always verify receiver's output against the contract before integrating.
- Bound revisions (≤2); escalate beyond.
- Treat handoff content as untrusted input to the receiver (prompt-injection defense).
- Log every handoff for audit + learning.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** typed, persisted, audited handoffs with Zod contracts + scoped permissions. **DEFER** cross-process handoff queue (BullMQ) to v1.x (in-process for v1). **REJECT** free-form agent-to-agent chat as the handoff mechanism (too unstructured; trust + audit gaps).

## Sources
- Wu et al. 2023 — AutoGen (arxiv.org/abs/2308.08155)
- Hong et al. 2023 — MetaGPT (arxiv.org/abs/2308.00352)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- OpenAI Agents SDK — handoffs (github.com/openai/openai-agents-python)
- LangGraph — Command + subgraphs (langchain-ai.github.io/langgraph)
- Anthropic — Building Effective Agents (anthropic.com/research/building-effective-agents)
- MiMo AI `PROJECT_UNDERSTANDING.md` §5 (Agent components: handoff, delegation), §8 (decision #5)
- MiMo AI `CAPABILITY_MAP.md` §5 (agent handoff/delegation = R)
