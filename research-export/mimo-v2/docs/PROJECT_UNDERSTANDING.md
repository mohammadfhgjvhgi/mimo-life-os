# PROJECT_UNDERSTANDING

> Phase 1 deliverable. Holistic mental model of MiMo AI — what it is, why, for whom, and how every part relates.
> Evidence base: `upload/تقنيات بناء ai شهر 8 2026.txt` (technology inventory), `upload/Pasted Content_1786280875960.txt` (strategic plan + immersion protocol).

---

## 1. Product Identity

**What we are building:** MiMo AI — a **personal autonomous AI system** built around **GLM-5.2** (Z.ai's long-horizon model) as the reasoning brain, wrapped in a layered **Runtime OS** that turns a language model into a long-horizon, tool-using, memory-maintaining, self-verifying agent.

**What it is NOT:**
- Not a chatbot.
- Not a thin LLM wrapper.
- Not a prompt collection.
- Not a coding assistant only.
- Not a website with an AI chat box.
- Not a collection of disconnected agents.
- Not a prototype that works for a few demos.

**Why:** A raw LLM — even one with 1M-token context — is not an agent. It has no persistent memory, no tools, no execution loop, no verification, no recovery, no autonomy. The gap between "a model that can answer" and "a system that can take a complex goal, plan, act, fail, recover, verify, and complete over hours/days" is exactly what MiMo AI fills.

**For whom:** A single primary user (personal AI), with an architecture extensible to organizational/multi-user deployment later.

**Problem solved:** Long-horizon autonomous work — research, coding, browsing, data analysis, life-management — that requires sustained context, memory across sessions, reliable tool use, and recovery from failure, none of which a bare model provides.

## 2. The Critical Distinction: Model ≠ System

The single most important principle, repeated throughout the source material:

> **GLM-5.2 is the primary intelligence engine. It is NOT the entire architecture.**

The architecture must **amplify** the model's capabilities, not assume the model solves every system problem. Concretely this forbids:
- Confusing context length with memory (1M tokens ≠ durable cross-session memory).
- Confusing tool access with autonomy (calling a tool ≠ deciding to act unsupervised).
- Confusing planning with execution (a plan ≠ completed work).
- Confusing execution with successful completion (running a step ≠ verified success).
- Confusing self-reflection with learning (re-stating a mistake ≠ durable improvement).
- Confusing multi-agent complexity with intelligence (more agents ≠ smarter).

## 3. What "Autonomous AI" Means in This Project

A graduated, **controlled** autonomy — not unrestricted self-modification. The system may, when authorized:
- Proactively act on triggers/schedules (not just react to prompts).
- Maintain persistent goals.
- Run long-horizon tasks (hours/days) with checkpoints + resumability.
- Improve strategies/prompts/routing **under** test + evaluation + approval + rollback gates.

It must NOT:
- Modify core production behavior without passing regression/security/approval gates.
- Execute dangerous tools without permission checks + sandboxing + kill-switch.
- Escalate indefinitely — failure beyond retry budget must escalate to the human.

## 4. The Layered Runtime (15 layers)

Every capability is a **service/layer on top of one Runtime**, not 100 disconnected systems. Layers (with one-line purpose):

| # | Layer | Purpose |
|---|---|---|
| 1 | **Model Layer** | Gateway + provider adapter → GLM-5.2 (abstracted so OpenAI/Anthropic/Gemini/local can be added later without rewrite) |
| 2 | **Context Layer** | Assemble what enters the prompt: task + conversation + workspace + files + memory + knowledge + agent/tool/execution/goal state. Decides what fits, what is summarized, what is retrieved on demand |
| 3 | **Memory Layer** | Working / Short-term / Long-term / Episodic / Semantic / Procedural / Preference / Relationship / Failure / Skill. Store, retrieve, rank, compress, consolidate, forget, resolve conflicts |
| 4 | **Knowledge Layer** | Ingest files/web/DBs/docs → chunk → embed → index → keyword + vector + hybrid search → rerank → evidence. Plus Knowledge Graph + GraphRAG |
| 5 | **Reasoning Layer** | Understand → Think → Analyze → Plan → Act → Observe → Reflect. Multiple reasoning modes (CoT, ReAct, Plan-and-Solve, structured, adaptive) |
| 6 | **Planning Layer** | Goal → strategy → tasks → assignment → monitor → verify |
| 7 | **Executive Layer** | The top agent: decides answer? search? tool? agent? continue? stop? |
| 8 | **Agent Layer** | Runtime for agents (Supervisor, Researcher, Browser, Coding, Data, Analysis, Writer, Verifier). Each with identity/goal/instructions/memory/tools/permissions/state/budget/timeout/output-contract |
| 9 | **Tool Layer** | Registry + permission-gated execution: web search, browser, HTTP, Python, shell, files, DB, Git, document processing, data analysis, computer interaction, MCP |
| 10 | **Execution Layer** | Long-running task engine: start → step → tool/agent → failure → recovery → continue → verify → complete. State persisted continuously; resumable |
| 11 | **Verification Layer** | Mandatory for important tasks: result → verifier → PASS/FAIL → replan on FAIL. "Done." is not success |
| 12 | **Recovery / Reflection Layer** | Failure → diagnose → cause → alternative strategy → retry (bounded) → escalate to user if exhausted |
| 13 | **Learning Layer** | Task+result+failure+correction+feedback → experience → lesson → memory/skill/strategy |
| 14 | **Autonomy Layer** | Trigger → should-act? → permission → plan → execute → verify → notify. Scheduled/event/background/persistent/proactive tasks |
| 15 | **Security / Observability / Evaluation** | Cross-cutting: identity, permissions (RBAC/ABAC), secrets, sandbox, network policy, audit, approval, kill-switch; logs/metrics/traces/cost; benchmark suites + regression |

## 5. Subsystems, Services & Components

### Core Runtime (foundation everything plugs into)
Event Bus, Task Engine, State Machine, Session Manager, Context Manager, Job Manager, Configuration, Error Handling, Retry System, Cancellation, Checkpoints, Persistence, Plugin Interface, API Layer, Logging.

### Model Layer
Model Gateway → Provider Adapter → Z.ai API → GLM-5.2. Supports chat, tool-calling, structured output, multimodal. Fallback model strategy. **Must not hardcode Z.ai everywhere** — gateway abstraction is mandatory.

### Memory subsystems
Working, Short-term (24h), Long-term, Episodic, Semantic, Procedural, Preference, Relationship, Failure, Skill, Temporal, Behavioral, Autobiographical, Organizational. Operations: store, retrieve, rank, compress, consolidate, forget, resolve conflicts, provenance, confidence, versioning.

### Knowledge subsystems
Ingestion, chunking, embedding, indexing, BM25 keyword search, vector search, hybrid search, reranking, contextual retrieval, evidence tracking. Knowledge Graph + GraphRAG + Personal KG + Temporal KG. Entity resolution, linking, NER, relationship extraction, triple extraction, ontology, semantic networks.

### Agent components
Identity, goal, instructions, memory, tools, permissions, state, budget, timeout, output contract. Patterns: single-agent, ReAct, supervisor, specialist, hierarchical, planner-executor, critic, verifier, dynamic routing, handoff, delegation. **Hybrid architecture** — single-agent with full context continuity preferred where it wins (per Z.ai's own approach); specialists only where they genuinely add value.

### Tool components
Registry, selection, permission check, execution, result, context update. Sandboxing for dangerous tools. Retries, rollback, dry-run, approval workflow, policy engine, tracing.

### Execution components
Task queue, scheduling, background workers, event-driven execution, cancellation, timeouts, dead-letter, partial completion, rollback, human escalation, checkpoints, resumability.

### Verification components
Result verification, critic, test-based, evidence, source, consistency, regression, confidence estimation, quality gates.

### Security components
Authentication, authorization (RBAC+ABAC), tool/agent permissions, sandboxing, secrets, API-key mgmt, encryption, isolation, prompt-injection defense, data-exfiltration defense, network restrictions, audit logs, approval gates, rate limiting, kill switch, safe failure.

### Observability components
Logs, metrics, traces (agent/task/model/tool/memory), cost tracking, latency, error tracking, audit trails, dashboard.

### Evaluation components
Model/reasoning/agent/memory/tool-use/long-horizon/autonomy/security evaluation, regression, benchmark suites, adversarial evaluation.

### Infrastructure
SQLite (Prisma) for relational state; vector store for embeddings; graph store for KG; object/file storage for artifacts; in-memory cache; queues; workers; event bus; model gateway; API surface; WebSocket (socket.io) for real-time; Caddy gateway (single external port).

### UI
Next.js console: conversation, workspace, agent/task/memory/knowledge observability dashboard, approval center, settings.

## 6. Relationships (Dependency / Communication Map)

Format: `A → verb → B`. Full graph in `SYSTEM_DEPENDENCY_GRAPH.md`. Key edges:

- Executive **depends on** Reasoning, Planning, Memory, Knowledge.
- Reasoning **consumes** Context, **calls** Model.
- Planning **consumes** Reasoning, **produces** task graph for Agent Runtime.
- Agent Runtime **depends on** Tool Runtime, Memory, Context.
- Tool Runtime **depends on** Execution (sandbox), Security (permission).
- Execution **persists via** Checkpoints, **triggers** Verification on step done.
- Verification **FAIL →** Recovery; **PASS →** Result + Learning.
- Recovery **FAIL (exhausted) →** escalate to user.
- Memory **read by** Context; **written by** Execution/Learning.
- Knowledge **read by** Context (retrieval); **written by** Ingestion.
- Model **called by** Reasoning/Planning/Verifier via Gateway.
- Security **wraps** every Tool/Agent/Execution call.
- Observability **observes** everything.
- Evaluation **tests** the whole system.

### "Can fail because of" (critical failure edges)
- Executive can fail if Memory is inconsistent.
- Planning can fail if Context omits key info.
- Tool execution can fail if sandbox/permissions misconfigured.
- Long-horizon tasks can fail if checkpoints not persisted.
- Verification can fail if evidence sources contradict.
- Recovery can fail if root cause misdiagnosed.
- Autonomy can become unsafe if approval gates bypassed.
- Whole system degrades if Model API fails (need fallback).

## 7. Existing Project Understanding

The current repo is an **empty Next.js 16 scaffold** (see `PROJECT_FILE_INVENTORY.md`). It is the container, not the system. Nothing of MiMo AI exists in code yet. The scaffold provides: App Router, TS, Tailwind 4, full shadcn/ui set, Prisma+SQLite, z-ai-web-dev-sdk, zustand, tanstack-query, framer-motion, socket.io pattern, Caddy single-port gateway, mini-service pattern. These are reusable foundations; the AI Runtime layers do not exist and must be built in Phase 2.

## 8. Key Decisions Embedded in the Source Material

1. **GLM-5.2 via Z.ai API** as the brain (not ZCode — ZCode is a separate dev product).
2. **Single Runtime, many services** — not 100 disconnected systems.
3. **Model Gateway abstraction** — never hardcode the provider.
4. **Context management ≠ context length** — even with 1M tokens, the system must manage what enters the prompt.
5. **Hybrid agent strategy** — prefer single-agent context continuity; use specialists only when justified.
6. **Security from day one** — architectural, not bolted on.
7. **Verification mandatory** for important tasks.
8. **Controlled self-improvement** — gated by tests/eval/regression/approval/rollback.
9. **Long-horizon = checkpoints + resumability**, not one giant context.
10. **Complexity control** — strongest practical system, not largest pile of tech.

## 9. Unresolved / Open Questions (handed to conflicts + missing-capabilities docs)
- Single vector store choice (SQLite-vector vs dedicated) — see `ARCHITECTURAL_CONFLICTS.md`.
- Graph store for KG (SQLite-based vs external) — see conflicts.
- Whether to build agents as in-process modules or mini-services (socket.io) — see ADRs.
- Local embeddings vs API embeddings — see ADRs.
- How much of the 1,500-technique inventory is CORE vs experimental — see `TECHNOLOGY_CLASSIFICATION.md`.
