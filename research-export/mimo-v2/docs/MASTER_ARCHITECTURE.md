# MASTER_ARCHITECTURE

> The final, frozen architecture for MiMo AI. Produced after understanding + research + conflict resolution.
> This is the blueprint Phase 2 implements. Changes after this point require a documented ADR.

---

## 1. System Purpose
MiMo AI is a **personal autonomous AI system** that turns GLM-5.2 (a powerful long-horizon LLM) into a long-running, memory-maintaining, tool-using, self-verifying, recoverable, (gated) autonomous agent. It closes the gap between "a model that can answer" and "a system that can take a complex goal, plan, act, fail, recover, verify, and complete over hours/days."

## 2. Product Definition
A single-user, locally-deployed (Docker Compose) system with a Next.js console on `/` and a layered Runtime OS behind it. The brain is GLM-5.2 via Z.ai API (behind a Model Gateway). Memory + Knowledge persist across sessions. Tools execute sandboxed. Long-horizon tasks checkpoint and resume. Autonomy is gated. Security is architectural. Everything is observable.

## 3. Design Principles
1. **Model ≠ System** — amplify the model, don't assume it solves system problems.
2. **One Runtime, many services** — not 100 disconnected systems.
3. **Embedded-first** at personal scale (sqlite-vec, SQLite KG/queue); swap interfaces for dedicated later.
4. **Single-language (TypeScript)** runtime; Vercel AI SDK as the framework primitive.
5. **Hybrid agents** — single-agent default, specialists when justified.
6. **Context management mandatory** regardless of context-window size.
7. **Security architectural & non-bypassable** from day one.
8. **Verification mandatory** for important tasks.
9. **Controlled self-improvement** — lessons free, deployed changes gated.
10. **Long-horizon = checkpoints + resumability**, not giant context.
11. **Complexity control** — strongest practical system, not largest tech pile.
12. **Observability of everything** — every action traced, costed, audited.

## 4. Architecture Overview
```
                  ┌─────────────────────────────────────┐
                  │            USER (UI)                │
                  │   Next.js console on / (port 3000)  │
                  └───────────────┬─────────────────────┘
                                  │ socket.io (?XTransformPort=ws)
                  ┌───────────────▼─────────────────────┐
                  │          CADDY GATEWAY (:81)        │
                  │  single external port; XTransformPort│
                  └──────┬──────────┬──────────┬────────┘
                         │          │          │
            ┌────────────▼──┐ ┌─────▼─────┐ ┌──▼──────────────┐
            │ UI API routes │ │ WS svc    │ │ Runtime svc(s)  │
            │ (Next.js)     │ │ (socket.io│ │ Agent :4010     │
            │               │ │  mini-svc)│ │ Tool  :4030     │
            └────────────┬──┘ └───────────┘ │ Exec  :4020     │
                         │                  └──────┬──────────┘
                         └──────────┬──────────────┘
                                    │
                  ┌─────────────────▼──────────────────┐
                  │          LAYERED RUNTIME            │
                  │  (15 layers — see §6)               │
                  └─────────────────┬──────────────────┘
                                    │
                  ┌─────────────────▼──────────────────┐
                  │       MODEL GATEWAY (ADR-001)       │
                  │   GLM-5.2 (Z.ai) + fallback(s)      │
                  └────────────────────────────────────┘
                                    │
                  ┌─────────────────▼──────────────────┐
                  │   INFRASTRUCTURE (ADR-004, ADR-009) │
                  │ Prisma+SQLite + sqlite-vec +        │
                  │ SQLite-KG + SQLite-queue + event bus│
                  └────────────────────────────────────┘
```

## 5. Component Map
| Component | Location | Port | Layer |
|---|---|---|---|
| UI (Next.js App Router) | `src/app/` | 3000 | UI |
| UI API routes | `src/app/api/` | 3000 | API |
| socket.io realtime service | `mini-services/realtime/` | (internal) | Infra |
| Agent Runtime service | `mini-services/agents/` | 4010 | Agent |
| Tool Runtime service | `mini-services/tools/` | 4030 | Tool |
| Execution Engine service | `mini-services/execution/` | 4020 | Execution |
| Model Gateway | `src/lib/ai/gateway/` (UI server) or mini-service | — | Model |
| Core Runtime (event bus, task engine, state machine) | `src/lib/runtime/` | — | Core |
| Memory Layer | `src/lib/memory/` + Prisma models | — | Memory |
| Knowledge Layer | `src/lib/knowledge/` + Prisma + sqlite-vec | — | Knowledge |
| Reasoning/Planning/Executive | `src/lib/brain/` | — | Brain |
| Verification/Recovery/Learning/Autonomy | `src/lib/control/` | — | Control |
| Security (Policy Engine) | `src/lib/security/` | — | Security (cross) |
| Observability | `src/lib/observability/` + OTel | — | Observability (cross) |
| Evaluation | `src/lib/evaluation/` + suites | — | Evaluation |
| Caddy gateway | `Caddyfile` | 81 | Infra |

## 6. The 15 Layers
1. **Model Layer** — Gateway + GLM-5.2 adapter + fallback + embeddings. (ADR-001)
2. **Context Layer** — assemble/compress/retrieve-on-demand. (ADR-007)
3. **Memory Layer** — 7 CORE typed memories + consolidation + hybrid retrieval + provenance.
4. **Knowledge Layer** — ingestion → chunk → embed → index → hybrid search → rerank → evidence; KG + GraphRAG.
5. **Reasoning Layer** — CoT/ReAct/Plan-and-Solve/structured/adaptive; confidence + contradiction detection.
6. **Planning Layer** — goal → strategy → task graph → assignment → monitor → verify gates.
7. **Executive Layer** — top decision maker: answer? search? tool? agent? continue? stop?
8. **Agent Layer** — ReAct loop, supervisor, specialists (hybrid). (ADR-003)
9. **Tool Layer** — registry + permission + sandbox + approval + policy. (ADR-005, ADR-008)
10. **Execution Layer** — long-running, checkpointed, resumable. (ADR-009)
11. **Verification Layer** — result/test/evidence/consistency + critic agent.
12. **Recovery/Reflection Layer** — diagnose → alternative → bounded retry → escalate.
13. **Learning Layer** — experience → lesson → memory/skill; gated deploy. (ADR-006)
14. **Autonomy Layer** — trigger → should-act? → permission → plan → execute → verify → notify.
15. **Security / Observability / Evaluation** — cross-cutting.

## 7. Data Flow
See `SYSTEM_DATA_FLOW.md`. Spine:
```
USER GOAL → EXECUTIVE → PLANNING → AGENT RUNTIME → TOOL RUNTIME
  → EXECUTION → VERIFICATION → (FAIL→RECOVERY) → RESULT
  → MEMORY UPDATE → LEARNING → AUDIT
```
Fast-path: trivial questions skip planning, go straight to Model via Context.

## 8. State Flow
See `SYSTEM_STATE_MODEL.md`. Key states: session, conversation, task (pending→planning→ready→running→verifying→completed/failed/escalated), plan, agent, tool, execution (checkpointed/resumable), memory, knowledge, approval, verification, recovery, autonomy, system-health.

## 9. Dependency Graph
See `SYSTEM_DEPENDENCY_GRAPH.md`. Spine: Model→Reasoning→Planning→Agent→Tool→Execution→Verification→(Recovery|Result)→Learning→Memory. Cross-cutting: Security, Observability, Evaluation. Foundation: Core Runtime, Infrastructure.

## 10. Model Layer (detail)
- **Gateway** (`src/lib/ai/gateway/`): `ModelProvider` interface (chat/toolCall/structured/multimodal/embed); adapter for Z.ai (GLM-5.2); ≥1 fallback adapter; retry/circuit-breaker/cost/cache.
- **GLM-5.2**: primary. Long context (1M), tool calling, structured output, multimodal. Accessed ONLY via Gateway.
- **Routing**: capability+cost+latency+quality+health-aware; ensemble reserved for verifier on critical tasks.
- **Embeddings**: Z.ai API default for queries; local transformers.js for bulk/offline.

## 11. Context Layer (detail)
- **Context Manager**: per-call token budget; assemble (task+goal+compressed conversation+workspace refs+retrieved memory+retrieved knowledge+state+permissions); retrieve on demand; compress old; persist snapshots.
- **Critical**: 1M window is a safety net, not a strategy. (ADR-007)

## 12. Memory Layer (detail)
- **Single `Memory` table + `type` discriminator** (working/short/long/episodic/semantic/procedural/preference CORE; relationship/failure/skill/temporal/behavioral v1.x).
- **Operations**: store, retrieve (hybrid: BM25+vector+rerank), rank, compress, consolidate (STM→LTM), forget (decay), resolve conflicts, provenance, confidence, version.
- **Concurrency**: optimistic versioning on writes.

## 13. Knowledge Layer (detail)
- **Ingestion**: files/web/DB/docs → chunk → embed (sqlite-vec) → index; BM25 via FTS5.
- **Retrieval**: hybrid (FTS5 + sqlite-vec + RRF fusion) → cross-encoder rerank (local `bge-reranker-base`) → evidence + sources.
- **Graph**: SQLite-relational KG (`Entity`/`Relation`/`Mention` + recursive CTE + `graphology`); GraphRAG for multi-hop/global.

## 14. Reasoning Layer (detail)
- Modes: CoT (default), ReAct (agent loop), Plan-and-Solve (planning), Structured (Zod contracts), Adaptive (by difficulty).
- Per step: confidence + uncertainty + contradiction detection.
- Self-consistency for high-stakes (multi-sample vote).

## 15. Planning Layer (detail)
- Goal → strategy → task graph (dependencies) → assignment (agent+tools+permissions+budget+timeout+verification gate) → monitor → re-plan on drift.
- Plans versioned, diffable, with alternative branches.

## 16. Executive Layer (detail)
- Per input/goal: classify intent → fast-path or deep-path → decide (answer/search/tool/agent/multi-agent/continue/stop) → budget enforcement → verification gate.
- Owns the high-level loop.

## 17. Agent Layer (detail)
- **ReAct loop** on Vercel AI SDK (`streamText`+`tools`+`maxSteps`).
- **Hybrid**: single-agent default; specialists (Researcher, Browser, Coding, Data, Writer, Verifier) when 5 deviation criteria met. (ADR-003)
- **Supervisor** pattern for multi-specialist coordination.
- **Lifecycle**: created→assigned→thinking→acting→(waiting-approval)→done/failed; heartbeat + watchdog + kill-switch.
- **Handoff**: typed message + scoped `allowedTools` + compressed context + output contract (Zod).

## 18. Tool Layer (detail)
- **Registry** of tools (web search, browser/Playwright, HTTP, filesystem, terminal/shell, Python, Git, DB, document processing, data analysis, image/audio/video, MCP client).
- **Pipeline**: selection → Policy Engine check (ADR-008) → sandbox tier (ADR-005) → execution → result sanitization → context update → trace.
- **Approval workflow** for risky tools; **dry-run** support; **retries** with idempotency keys.
- **MCP**: bidirectional (consume external MCP servers; expose MiMo tools as MCP server).

## 19. Execution Layer (detail)
- **Task Engine** (mini-service `:4020`): SQLite-backed queue (`UPDATE…RETURNING` atomic claim + sweeper); workers; budget enforcement; milestone verification; kill-switch.
- **Checkpointing**: atomic Prisma+SQLite transactions; gzip+checksum+versioned; tiered triggers (per-step/per-milestone/on-failure); WAL mode.
- **Recovery**: failure classification → bounded retry+backoff → Reflexion reflection → loop detection → crash recovery from checkpoint/journal → escalate if exhausted.
- **Resumability**: load last checkpoint → replay journal → resume.

## 20. Verification Layer (detail)
- 4 modes: result, test-based, evidence-based, consistency.
- **Critic Agent**: independent (fresh context, optional different model) for important tasks.
- Tiered by task type; mandatory for important + autonomous tasks.
- PASS → result; FAIL → recovery; INCONCLUSIVE → flag needs-review.

## 21. Recovery / Reflection Layer (detail)
- Failure → diagnose (root cause via Reasoning + failure-memory) → alternative strategy → bounded retry → escalate to user.
- Lessons persisted immediately (crash-safe).

## 22. Learning Layer (detail)
- Inputs: task+result+failure+correction+feedback.
- Outputs: experience → lesson → memory/skill/strategy/routing/tool-reliability.
- Provenance + reinforcement + consolidation.
- **Hard boundary** (ADR-006): lessons always safe; deployed behavior changes gated (eval+regression+approval+rollback).

## 23. Autonomy Layer (detail)
- 7-stage gated pipeline: trigger → should-act? → permission → plan → execute → verify → notify.
- Triggers: schedule (node-cron), event, background, persistent-goal, proactive.
- Kill-switch mandatory; rate-limited; per-pattern mute.
- Unrestricted autonomy rejected.

## 24. Multimodality (detail)
- Vision (VLM), ASR, TTS via **z-ai-web-dev-sdk (backend only)** behind Model Gateway.
- Image generation (v1.x, backend).
- Redaction + caching + prompt-injection defense on all multimodal I/O.

## 25. Security (detail) — ADR-008
- **Non-bypassable Policy Engine**: RBAC+ABAC, deny-default, deny-wins, capability tokens. Casbin/SQLite v1 → OPA/Cedar v2.
- **Secrets**: env+age v1 → Vault v2; never in model context (Tool Layer attaches server-side); secret scanner on every exit path.
- **Sandboxing**: tiered (ADR-005); default-deny network.
- **Prompt-injection defense**: input sanitization, tool-output sandboxing, isolation, detection. (No complete defense; reduction+containment+detection.)
- **Audit**: append-only + hash-chained + signed + WORM snapshot + verifier job.
- **Kill-switch**: global deny rule.
- **Approval gates**: for risky tools + autonomous actions.

## 26. Observability (detail)
- **OpenTelemetry** traces (agent/task/model/tool/memory) + **pino** logs + custom cost tracker (SQLite) v1; Langfuse optional v2.
- Per-model-call cost tracking; budget enforcement reads same numbers.
- Live dashboard via socket.io.
- **Audit trails**: immutable, 7-year retention, redaction pipeline.
- Telemetry privacy: PII/secret redaction before persistence; user data export/delete.

## 27. Evaluation (detail)
- Benchmark suites: simple/medium/complex/long-horizon across research/coding/browser/memory/planning/recovery/autonomy/security.
- Scoring: exact/F1/LLM-judge/test-exec/assertion.
- Regression + adversarial suites.
- Feeds: Self-Improvement Gate, Model Router qualityScore, Observability dashboard.

## 28. Infrastructure (detail) — ADR-004, ADR-009
- **Relational**: Prisma + SQLite (WAL).
- **Vector**: sqlite-vec (embedded).
- **Graph**: SQLite-relational KG.
- **Queue**: SQLite-backed.
- **Event bus**: typed EventEmitter + SQLite outbox.
- **Cache**: in-memory (LRU).
- **File storage**: local `workspace/` dir.
- **Real-time**: socket.io mini-service.
- **Gateway**: Caddy `:81` (single external port; `XTransformPort`).
- **Deployment**: Docker Compose (UI + mini-services + Caddy).
- **Backup**: SQLite snapshot + vector/KG rebuild from source.

## 29. APIs (detail)
- **UI API** (Next.js routes): conversation, workspace, memory, knowledge, approvals, observability, settings, data export/delete.
- **Runtime API** (mini-services, via `?XTransformPort`): agent, tool, execution.
- **Model API** (Gateway, internal).
- **MCP** (optional, bidirectional).

## 30. UI (detail)
- Next.js 16 App Router, Tailwind 4, full shadcn/ui, dark mode (next-themes), responsive, framer-motion, a11y, sticky footer.
- Panels: conversation (streaming), workspace, observability dashboard, approval center, memory/knowledge browser, autonomy settings, settings.
- Real-time via socket.io.

## 31. Storage (detail)
- **SQLite file** (relational + vectors + graph + queue + audit + traces) — backup = copy.
- **Workspace dir** (artifacts with provenance manifests).
- **Secrets** (env/age, never in DB).
- Schemas: see Prisma models (to be defined in Phase 2: `Session`, `Conversation`, `Turn`, `Task`, `Plan`, `Step`, `Agent`, `ToolCall`, `Checkpoint`, `Memory`, `Entity`, `Relation`, `Chunk`, `Embedding`, `Approval`, `Verification`, `AuditLog`, `ModelCall`, `PromptTemplate`, `Lesson`, etc.).

## 32. Extensibility
- Add model → Provider Adapter.
- Add tool → Registry entry + permission declaration.
- Add agent → identity/goal/tools/permissions/contract.
- Add memory type → discriminator value + operations.
- Add knowledge source → ingestion adapter.
- Add autonomous trigger → Autonomy Layer registration.
- No rewrite for any of the above.

## 33. Experimental Technologies (NOT in core)
World models, digital twins, neural memory, continual learning, meta-learning, evolutionary agents, advanced self-improvement, embodied AI, full computer-use/GUI agents, agent payments (AP2), voting/debate/swarm. Documented in `knowledge/` as RESEARCH; sandboxed; not in v1 production core.

## 34. Technology Decisions
See `decisions/` (ADR-001…010) and `KNOWLEDGE_INDEX.md` (ADOPT/DEFER/REJECT per technology).

## 35. Risks
- **Model API failure** → fallback model + cached/degraded response.
- **Memory inconsistency** → conflict resolution + provenance.
- **Retrieval returning nothing relevant** → broader search → ask user.
- **Checkpoint missing after crash** → journal reconstruction → mark unknown → escalate.
- **Tool sandbox breach** → kill-switch + audit + isolation review.
- **Verification with contradictory evidence** → flag uncertainty, don't claim success.
- **Recovery misdiagnosis** → bounded retries → escalate.
- **Autonomy runaway** → kill-switch + rate limit + approval gate.
- **Context overflow** → compression + on-demand retrieval.
- **Prompt injection** → sanitizer + sandbox + policy (non-bypassable).
- **Cost runaway** → budget gates + per-task/per-day caps.

## 36. Missing Capabilities
See `MISSING_CAPABILITIES.md` (14 gaps, all addressable in-stack: deployment, backup, migration, budget enforcement, streaming schema, idempotency, output safety, artifact provenance, timezone, multi-device-future, telemetry privacy, offline, prompt versioning, memory concurrency).

## 37. Future Expansion
- Multi-device sync (v2).
- Dedicated vector/graph stores if scale demands (interfaces ready).
- Auto-deploy for low-risk self-improvements (after auto-rollback proven).
- Full computer-use/GUI agents (v2).
- Multi-user/org mode (v2).
- Local model offline fallback (v1.x).

## 38. Build Order (Phase 2 guidance)
1. Core Runtime (event bus, task engine, state machine, persistence, config, logging).
2. Model Gateway + GLM-5.2 adapter + embeddings.
3. Context Layer + Memory Layer (typed + hybrid retrieval).
4. Knowledge Layer (ingestion + hybrid search + rerank + KG).
5. Reasoning + Planning + Executive.
6. Agent Runtime (ReAct loop) + Tool Runtime (registry + sandbox + policy).
7. Execution Engine (checkpointing + recovery + resumability).
8. Verification + Learning (gated) + Autonomy (gated).
9. Security hardening + Observability + Evaluation.
10. UI console + real-time + approval center.
11. Integration tests + long-horizon eval + audit.

Track progress in `PROJECT_STATE.md` + `BUILD_PLAN.md` (to be created in Phase 2).

---

**Architecture Freeze.** Implementation can begin (Phase 2) without repeatedly rediscovering the system. Changes require a new ADR.
