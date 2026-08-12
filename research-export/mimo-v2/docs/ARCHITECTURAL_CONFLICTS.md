# ARCHITECTURAL_CONFLICTS

> Contradictions, duplications, and incompatible choices discovered during analysis. Each conflict: description → affected components → resolutions → recommendation. Major conflicts are NOT silently resolved.

---

## Conflict 1 — Vector Store: Embedded vs Dedicated
- **Description:** Inventory lists Vector Database (P0) and Local Embeddings; multiple dedicated vector DBs imply a server (Pinecone/Weaviate/Milvus/Qdrant) while the project is personal/single-user on a single-port Caddy gateway.
- **Affected:** Knowledge Layer, Memory Layer, Infrastructure.
- **Resolutions:**
  - (a) Embedded `sqlite-vec` / `better-sqlite3-vector` — zero infra, transactional with relational state.
  - (b) Dedicated vector server — more scalable, but adds a service + port + ops burden.
- **Recommendation:** **(a) sqlite-vec embedded** for v1. Revisit (b) only if vector count > 1M or latency becomes a bottleneck. Interface abstracted so a dedicated store can swap in.
- **Why:** Personal scale, single external port, simplicity, transactional consistency with memory records.

## Conflict 2 — Graph Store: SQLite-relational vs Dedicated Graph DB
- **Description:** Knowledge Graph + GraphRAG are REQUIRED; Neo4j/Memgraph imply a separate server, conflicting with the single-user embedded philosophy.
- **Affected:** Knowledge Layer (KG, GraphRAG), Infrastructure.
- **Resolutions:**
  - (a) SQLite-relational KG (`Entity`, `Relation`, `Mention` tables + recursive CTE traversal + `graphology` for in-memory analytics).
  - (b) Dedicated graph DB (Neo4j) — better for deep multi-hop, but heavy.
- **Recommendation:** **(a) SQLite-relational** for v1. Defer Neo4j unless multi-hop latency becomes a real bottleneck.
- **Why:** Same as Conflict 1 — personal scale, simplicity, transactional.

## Conflict 3 — Agent Frameworks: Build-own vs Import
- **Description:** Inventory lists 17 agent frameworks (LangGraph, CrewAI, AutoGen, Vercel AI SDK, Mastra, etc.) in multiple languages. Importing several creates duplication + competing orchestration models.
- **Affected:** Agent Layer, Tool Layer, entire Runtime.
- **Resolutions:**
  - (a) Build MiMo's own minimal TypeScript runtime on **Vercel AI SDK** (tool-calling/streaming primitive) + Mastra-style patterns.
  - (b) Import a Python framework (LangGraph/CrewAI) — requires a Python sidecar service, cross-language IPC, dual runtimes.
  - (c) Import multiple — maximum duplication.
- **Recommendation:** **(a)**. Single TS runtime; Vercel AI SDK as the only framework dep; borrow *patterns* (LangGraph graph orchestration, supervisor, planner-executor) without importing the libs.
- **Why:** Next.js/TS stack coherence, single runtime, no Python sidecar, no framework lock-in. See ADR-002.

## Conflict 4 — Single-Agent vs Multi-Agent
- **Description:** Inventory lists Single Agent (P0), Multi-Agent (P1), Hierarchical (P1), Supervisor (P1), plus voting/debate/swarm. Naively implementing all creates coordination overhead and information loss.
- **Affected:** Agent Layer, Executive, Context (context fragmentation on handoff).
- **Resolutions:**
  - (a) Default single-agent with full context continuity; spawn specialists only when justified (5 deviation criteria).
  - (b) Always multi-agent — more "agents" but more overhead + loss.
  - (c) Always single-agent — simpler but can't parallelize genuinely independent work.
- **Recommendation:** **(a) Hybrid**. Single-agent default (matches Z.ai's own long-context philosophy); specialists when: (i) independent parallelizable subtasks, (ii) distinct tool/permission scope, (iii) context-size pressure, (iv) distinct expertise needed, (v) long-running delegation. Reject voting/debate/swarm for v1.
- **Why:** More agents ≠ smarter. Context continuity matters for long-horizon. See ADR-003, `knowledge/agents/single_vs_multi_agent.md`.

## Conflict 5 — Task Queue: SQLite-backed vs Redis/BullMQ
- **Description:** Long-horizon execution needs a queue + workers. BullMQ/Redis is the "standard" but adds Redis infra; the project is embedded-first.
- **Affected:** Execution Layer, Infrastructure.
- **Resolutions:**
  - (a) SQLite-backed queue (`jobs` table + `UPDATE…RETURNING` atomic claim + sweeper).
  - (b) BullMQ + Redis — robust, but extra service.
- **Recommendation:** **(a) SQLite-backed** for v1. Interface (`Queue`, `Worker`) designed so BullMQ can swap in at v1.x.
- **Why:** Personal scale; avoid Redis ops burden; transactional with checkpoints.

## Conflict 6 — Memory: How Many Types?
- **Description:** Inventory lists ~24 memory types. Implementing all as separate stores creates schema sprawl and retrieval complexity.
- **Affected:** Memory Layer, schema.
- **Resolutions:**
  - (a) One `Memory` table with a `type` discriminator + typed JSON payload; 7 CORE types active, others added as needed.
  - (b) Separate table per type — strict but heavy.
- **Recommendation:** **(a) Single table + discriminator**. 7 CORE types (working/short/long/episodic/semantic/procedural/preference) in v1; relationship/failure/skill/temporal/behavioral as v1.x; implicit/emotional rejected.
- **Why:** Simplicity, uniform retrieval, progressive addition.

## Conflict 7 — Sandboxing: In-process vs Container
- **Description:** Tool sandboxing options range from `node:vm` (light) to Docker (heavy). The single-port Caddy + mini-service pattern constrains infra.
- **Affected:** Tool Layer, Security, Infrastructure.
- **Resolutions:**
  - (a) Tiered: `node:vm` for pure JS → `child_process`+`firejail` for shell → Docker pooled for untrusted/heavy.
  - (b) Docker-only — safe but heavy for a personal system.
  - (c) In-process only — unsafe for shell/code execution.
- **Recommendation:** **(a) Tiered**, default-deny network via egress proxy. Tool Runtime as a dedicated mini-service (`:4030`) isolated from the UI server.
- **Why:** Balance safety + practicality; match risk to sandbox weight.

## Conflict 8 — Context Length vs Context Management
- **Description:** GLM-5.2 advertises 1M-token context. Tempting to "just dump everything." The source material explicitly warns this is insufficient.
- **Affected:** Context Layer, Memory, Knowledge.
- **Resolutions:**
  - (a) Always manage context (assemble minimal sufficient, retrieve on demand, compress old) regardless of window size.
  - (b) Rely on the 1M window.
- **Recommendation:** **(a)**. 1M is a safety net, not a strategy. Context Layer is mandatory.
- **Why:** Cost, latency, retrieval quality, long-horizon resumability all degrade with dump-everything. Explicitly recorded per the immersion protocol.

## Conflict 9 — Observability: OTel vs Langfuse vs Custom
- **Description:** Multiple observability stacks possible; mixing creates trace gaps.
- **Affected:** Observability Layer.
- **Resolutions:**
  - (a) OpenTelemetry SDK + pino logs + custom cost tracker (SQLite) for v1; Langfuse as v2 if hosted UI desired.
  - (b) Langfuse from day one — adds a service/dep.
- **Recommendation:** **(a)**. OTel is vendor-neutral; custom cost tracker is trivial on SQLite; Langfuse optional later.
- **Why:** Avoid extra service; OTel portable.

## Conflict 10 — Permissions: RBAC vs ABAC
- **Description:** Inventory lists both RBAC and ABAC as P0. Choosing one limits expressiveness.
- **Affected:** Security Layer.
- **Resolutions:**
  - (a) Hybrid RBAC+ABAC via a non-bypassable Policy Engine (Casbin/SQLite v1 → OPA/Cedar v2).
  - (b) RBAC only — can't express context-sensitive rules.
  - (c) ABAC only — can't express role hierarchy cleanly.
- **Recommendation:** **(a) Hybrid**, deny-by-default + deny-wins + capability tokens.
- **Why:** Roles for structure, attributes for context; non-bypassable engine is the key control (even a hijacked model can't bypass).

## Conflict 11 — Self-Improvement: Where's the Line?
- **Description:** Inventory lists self-improvement of prompts/routing/tool-selection/agent-behavior/planning. Unrestricted self-modification is unsafe.
- **Affected:** Learning Layer, production behavior.
- **Resolutions:**
  - (a) Hard boundary: learned lessons always safe to write; deployed behavior changes MUST pass eval+regression+approval+rollback.
  - (b) Auto-deploy everything — unsafe.
  - (c) No self-improvement — leaves value on table.
- **Recommendation:** **(a) Controlled self-improvement**. Manual approval for all v1 changes; auto-rollback on regression.
- **Why:** Safety > convenience for production behavior; lessons still captured. See ADR-006.

## Conflict 12 — Computer-Use / GUI Agents
- **Description:** Inventory lists Computer-Use Agents, GUI Agents, vision-based control. High risk + high complexity for a personal v1.
- **Affected:** Tool Layer, Multimodal, Security.
- **Resolutions:**
  - (a) Defer to v2; v1 = terminal + filesystem + browser only.
  - (b) Build now — high capability but high risk.
- **Recommendation:** **(a) Defer**. Document, sandbox research, not in v1 core.
- **Why:** Risk/complexity vs value for personal use; browser+terminal+filesystem cover most real needs.

---

## Summary
All 12 conflicts have a documented recommendation. None are silently locked — each maps to an ADR in `decisions/`. The recurring theme: **embedded/personal-scale over dedicated servers; single TS runtime over polyglot frameworks; hybrid strategies over extremes; safety gates over convenience.**
