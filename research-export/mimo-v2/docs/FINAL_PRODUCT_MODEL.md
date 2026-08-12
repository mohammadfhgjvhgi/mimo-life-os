# FINAL_PRODUCT_MODEL

> Describe the finished MiMo AI system **as if it already exists**. Answers: "What exactly will exist when this project is complete?"

---

## 1. What the User Experiences

A single **MiMo Console** (Next.js web app on `/`). The user opens it and sees:

- **Conversation surface** — natural language in/out, with streaming responses, cited evidence, and inline tool/agent activity cards (e.g. "🔎 searching…", "🌐 browsing…", "⚙️ running python…", "✅ verified").
- **Workspace panel** — current task, plan, active agents, file artifacts, memory snapshot, knowledge sources.
- **Observability dashboard** — live traces of agent/task/model/tool/memory events, cost, latency, errors; drill into any step.
- **Approval center** — pending approval requests for dangerous/sensitive tool calls or autonomous actions; approve/deny/modify.
- **Memory & Knowledge browser** — inspect episodic/semantic/preference memories, the personal knowledge graph, search the knowledge base.
- **Autonomy settings** — schedules, triggers, persistent goals, permission scopes, kill-switch.
- **Settings** — model selection, API keys (secret-vaulted), security policy, evaluation lab.

Behind the conversation: the user can say *"Research the SOTA in retrieval-augmented memory, build a prototype, test it, and write up findings"* — and MiMo will plan, search, read papers, write code in a sandbox, run tests, verify, recover from failures, and deliver a verified writeup, possibly over hours, checkpointed throughout, resumable if interrupted.

## 2. Conversation
Stateful, multi-turn, cross-session. Conversation is **not** the whole context — it is one input. The Context Layer assembles conversation + task + workspace + retrieved memory + retrieved knowledge + agent/tool/execution state + goal into the prompt. Old turns are compressed/summarized; full fidelity lives in episodic memory and is retrievable.

## 3. Workspace
A persistent per-task workspace: working files, generated artifacts, scratch notes, tool outputs, decision log. Survives across sessions. Checkpointed. The agent can read/write it; the user can inspect it.

## 4. AI Core (the brain chain)
```
USER GOAL
  → EXECUTIVE (understand goal, determine strategy, break into tasks, assign, monitor, verify)
  → PLANNER (produce task graph)
  → AGENT RUNTIME (supervisor + specialists)
  → TOOL RUNTIME (permission-gated execution)
  → EXECUTION ENGINE (long-running, checkpointed, resumable)
  → VERIFICATION (PASS → result / FAIL → recovery → replan)
  → LEARNING (extract experience → memory/skill/strategy)
  → AUTONOMY (scheduled/event/proactive, gated)
```

## 5. Model Layer
A **Model Gateway** with a Provider Adapter. Default provider: **GLM-5.2 via Z.ai API**. The gateway exposes a uniform interface (chat, tool-calling, structured output, multimodal, embeddings) so that OpenAI / Anthropic / Gemini / local models / vision / speech models can be added later **without rewriting the system**. Routing + fallback strategy (if GLM-5.2 API fails, degrade gracefully or switch). Cost/latency tracked per call.

## 6. Context Layer
A **Context Manager** that, for every model call, decides what enters the prompt:
- current task + goal
- recent conversation (compressed as needed)
- workspace file references
- retrieved memory (ranked)
- retrieved knowledge (reranked evidence)
- agent/tool/execution state
- permission/safety constraints

It never blindly dumps 1M tokens — it assembles the minimum sufficient context, retrieves the rest on demand, and persists what was used for observability.

## 7. Memory Layer
A typed memory store with operations:
- **Types:** working, short-term (24h), long-term, episodic, semantic, procedural, preference, relationship, failure, skill, temporal, behavioral, autobiographical.
- **Operations:** store, retrieve (hybrid: semantic + keyword), rank, compress, consolidate (STM→LTM), forget (decay), resolve conflicts, track provenance, confidence, versioning.

Memory is **the substrate of continuity** — the conversation can be empty and the system still "knows" the user, past projects, preferences, and past failures.

## 8. Knowledge Layer
An ingestion + retrieval pipeline:
- **Ingest:** files, web, DBs, docs, research → chunk → embed → index.
- **Retrieve:** BM25 keyword + vector semantic + hybrid → rerank → evidence with source tracking.
- **Graph:** Knowledge Graph (entities + relationships) + GraphRAG + Personal KG + Temporal KG. Entity resolution, linking, NER, relationship/triple extraction, contradiction detection.

## 9. Reasoning Layer
A controlled reasoning pipeline: Understand → Think → Analyze → Plan → Act → Observe → Reflect. Multiple modes selectable by task difficulty: Chain-of-Thought, ReAct, Plan-and-Solve, structured (JSON/XML), adaptive. Confidence scoring + uncertainty estimation + contradiction detection at each step.

## 10. Planning Layer
Goal → strategy → decomposed tasks → assignment → monitoring → verification gates. Plans are first-class persisted objects (re-plannable, diffable).

## 11. Executive Layer
The top-level decision maker. For each input/goal it decides: answer directly? search? use a tool? spawn an agent? need multiple agents? continue? stop? It owns the high-level loop and budget.

## 12. Agent Layer
An Agent Runtime hosting:
- **Supervisor** (orchestrates specialists)
- **Researcher, Browser, Coding, Data, Analysis, Writer, Verifier**

Each agent has: identity, goal, instructions, private memory, tool subset, permissions, state, budget, timeout, output contract. **Hybrid strategy**: single-agent with full context continuity by default; specialists spawned only when they genuinely add value (not automatically). Agent handoff/delegation/routing are explicit, traced operations.

## 13. Tool Layer
A Tool Registry + permission-gated runtime:
- web search, browser automation (Playwright), HTTP/API, filesystem, terminal/shell, Python execution, Git, databases, document processing, data analysis, image/audio/video processing, screen/computer interaction, MCP integration.
- Every call: selection → permission check → sandboxed execution → result → context update → traced.
- Retries, rollback, dry-run/simulation, approval workflow, policy engine.

## 14. Execution Layer
A long-running task engine: start → steps → tool/agent calls → failure → recovery → continue → verification → complete. **State persisted continuously** via checkpoints. If the process crashes, the task resumes from the last checkpoint. Supports cancellation, timeouts, dead-letter, partial completion, human escalation.

## 15. Verification Layer
Mandatory for important tasks. Result → Verifier → PASS (proceed) / FAIL (replan via Recovery). Verification modes: test-based, evidence-based, source-based, consistency, regression, confidence. "Done." is never accepted as success without verification.

## 16. Recovery / Reflection Layer
Failure → diagnose → determine cause → alternative strategy → retry (bounded). If retries exhausted → escalate to user. Lessons feed the Learning Layer.

## 17. Learning Layer
Inputs: task + result + failure + correction + feedback. Outputs: experience → lesson → memory/skill/strategy. Improves: prompts, tool selection, planning, routing, agent behavior — **under control** (changes pass evaluation + regression + approval before reaching production behavior).

## 18. Autonomy Layer
Trigger (schedule/event/background/persistent-goal/proactive) → should-act? → permission → plan → execute → verify → notify. The system can act without being prompted, but every autonomous action is permission-gated, logged, and reversible (kill-switch).

## 19. Multimodality
Vision (image reasoning, OCR, document understanding, screenshot reasoning), audio (speech-to-text, text-to-speech, audio understanding), video understanding, screen/GUI interaction. All flow through the same Context/Memory/Agent Runtime.

## 20. Security
Architectural, from day one: identity, RBAC + ABAC, tool/agent permissions, secrets vault, sandboxing, filesystem/network isolation, prompt-injection defense, malicious-tool-output defense, data-exfiltration defense, audit logs, approval gates, rate limiting, kill switch, safe failure.

## 21. Observability
Everything is visible: task → agent → model → prompt → memory → tool → result → verification → cost → time → error. Structured logs, metrics, distributed traces (agent/task/model/tool/memory), audit trails. A live dashboard.

## 22. Evaluation
A benchmark lab: simple/medium/complex/long-horizon tasks across research/coding/browser/memory/planning/recovery/autonomy. Every system change is tested against it. Adversarial + regression suites. Confidence scoring.

## 23. Infrastructure
- **Relational state:** Prisma + SQLite (sessions, tasks, plans, agents, memory metadata, audit).
- **Vector store:** for embeddings (semantic retrieval).
- **Graph store:** for the Knowledge Graph.
- **File/object storage:** workspace artifacts.
- **In-memory cache:** hot context.
- **Queue + workers:** background/long-running tasks.
- **Event bus:** decoupled inter-service events.
- **Real-time:** socket.io mini-service for streaming agent activity to the UI.
- **Gateway:** Caddy single-port reverse proxy (`XTransformPort` pattern) — the only external surface.
- **API:** Next.js API routes (App Router) for the UI; mini-services for heavy/runtime processes.

## 24. APIs
- **UI API** (Next.js routes): conversation, workspace, memory, knowledge, approvals, observability, settings.
- **Runtime API** (mini-services): agent runtime, tool runtime, execution engine — addressed via `?XTransformPort=N`.
- **Model API** (gateway): internal abstraction over provider APIs.
- **MCP** (optional): expose/consume tools via Model Context Protocol.

## 25. UI
Next.js 16 App Router, Tailwind 4, full shadcn/ui, dark mode, responsive, framer-motion transitions, sticky footer, accessible. Real-time updates via socket.io. The single user-facing route is `/`.

## 26. Data
- Conversation history, task/plan/agent/execution state, checkpoints.
- Memory records (typed, with provenance/confidence/version).
- Knowledge chunks + embeddings + KG triples.
- Audit logs, traces, metrics, cost records.
- User preferences, permissions, secrets (vaulted).

## 27. Extensibility
- Add a model → implement Provider Adapter.
- Add a tool → register in Tool Registry + declare permissions.
- Add an agent → define identity/goal/tools/permissions/contract.
- Add a memory type → extend Memory Layer schema + operations.
- Add a knowledge source → add ingestion adapter.
- Add an autonomous trigger → register in Autonomy Layer.
- No rewrite required for any of the above.

## 28. What "Complete" Looks Like (Definition of Done for the product)
The system can: understand a complex goal → maintain long-running context → reason → plan → research → use tools → operate agents → execute → recover from failures → verify results → maintain memory → maintain knowledge → learn from experience → operate autonomously when authorized → work over long horizons → handle multimodal info → interact with software/external environments → monitor itself → evaluate its own performance → improve strategies under controlled conditions → remain secure, observable, testable, maintainable — and **grow substantially without a rewrite**.

This is the target. Phase 1 produces the understanding + blueprint to reach it; Phase 2 builds toward it.
