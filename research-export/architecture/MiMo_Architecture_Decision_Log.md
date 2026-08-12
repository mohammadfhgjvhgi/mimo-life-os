# MiMo — Architecture Decision Log
### Phase: Foundation From The Ground Up — ARCH-E
### Owner: Senior Systems Architect

**Status:** BINDING. Every architectural decision in MiMo must live here. No architectural decision may be hidden inside prose, code comments, or a PR description. If a choice is not in this log, it is not a MiMo architectural decision.

**Source documents:**
- `MiMo_Product_Bible.md` (3,407 lines — FINAL product authority).
- `architecture/MiMo_Current_System_Audit.md` (501 lines — reality of what exists today).
- Parallel ARCH-A through ARCH-D docs (may or may not exist yet — worked from Bible + Audit when absent).

**Epistemic discipline:** Every claim is labelled.
- **[CURRENT]** — exists today in the repository (per Audit).
- **[TARGET]** — what we intend to build (per Bible + this log).
- **[MIGRATION]** — how to get from CURRENT to TARGET.
- **[FACT]** — directly verifiable.
- **[INFERENCE]** — reasoned from evidence but not directly verified.
- **[UNKNOWN]** — flagged for investigation.

**Per-decision schema (every decision below uses it):**
1. Decision
2. Problem
3. Context
4. Evidence
5. Alternatives
6. Rejected alternatives
7. Why rejected
8. Consequences
9. Security impact
10. Performance impact
11. Scalability impact
12. Migration impact
13. Reversibility
14. Validation method

---

## Index of Decisions

| ID | Decision | Status |
|---|---|---|
| D1 | Next.js 16 + App Router as application framework | ACCEPTED (Bible Part 27.1) |
| D2 | SQLite + Prisma as persistence layer | ACCEPTED (Bible Part 22.1, Part 27.1) |
| D3 | In-memory EventBus + persistent event log (hybrid) | ACCEPTED (this log — refines Bible) |
| D4 | Provider-neutral AI adapter layer | ACCEPTED (Bible Part 25.3, Invariant 16/17) |
| D5 | Sequential 6-stage pipeline, parallel opt-in only | ACCEPTED (Bible Part 8.8, Invariant 21) |
| D6 | Local-first architecture | ACCEPTED (Bible Part 1.6 #6, Part 22.1, Part 23) |
| D7 | No authentication (single-user local) | ACCEPTED (Bible Part 22.1) — documented limitation |
| D8 | Zustand for client state | ACCEPTED (Bible Part 27.1) |
| D9 | Monolithic Core public API surface | ACCEPTED (Bible Part 25.3, Invariant 16) |
| D10 | MCP for plugin protocol | ACCEPTED (Bible Part 25.1) |
| D11 | Sandboxing approach for artifact runtime | ACCEPTED (Bible Part 22.8, Part 11.4) |
| D12 | No onboarding wizard | ACCEPTED (Bible Part 28.2, DD-19) |
| D13 | No credit/quota counters | ACCEPTED (Bible Part 1.6 #9, DD-10, Invariant 9) |
| D14 | No deprecations mid-redesign | ACCEPTED (Bible Part 1.6 #9, DD-20, Invariant 10) |
| D15 | Per-task-type trust ledger | ACCEPTED (Bible Part 8.7, DD-08) |
| D16 | One container (Project) + one branch (Fork) | ACCEPTED (Bible Part 1.7, DD-02) |
| D17 | One AI surface (Conversation) | ACCEPTED (Bible Part 1.7, DD-03) |
| D18 | One command palette with prefix grammar | ACCEPTED (Bible Part 14, DD-11) |
| D19 | 44px tap targets + WCAG AA | ACCEPTED (Bible Part 19, DD-17) |
| D20 | 5-tier motion system | ACCEPTED (Bible Part 17, DD-16) |
| D21 | Split Zustand store by boundary | TARGET (Audit §5.2 debt #6) |
| D22 | Persistent MemoryEngine via Prisma | TARGET (Audit §3.2 debt #8; Bible Part 5.10) |
| D23 | Full-text search via SQLite FTS5 | TARGET (Audit §3.3; Bible Part 26.3) |
| D24 | No tests policy + automated contract tests for adapters | TARGET (Audit §10; Bible Part 27.10 — refined) |
| D25 | API-only (no server actions) | ACCEPTED (Bible Part 25.3, Part 27.6) |

---

## D1 — Next.js 16 + App Router as the application framework

**1. Decision.** MiMo's web tier is Next.js 16 with the App Router, Turbopack, `output: "standalone"`. [Bible Part 27.1] [CURRENT: Next.js 16.1.1, App Router confirmed]

**2. Problem.** MiMo needs one permanent UI surface (conversation spine + adaptive canvas), a server-side Core intelligence pipeline, streaming APIs, and an API boundary that prevents client components from importing server-only engines (e.g. the model SDK). The framework must enforce that boundary structurally, not by convention.

**3. Context.**
- [CURRENT] Next.js 16.1.1 is installed and running (dev server has issues — see Audit §1.5; root cause is stale Turbopack cache, not the framework).
- [CURRENT] App Router structure (`src/app/page.tsx` + `src/app/api/*`) is in place and matches Bible Part 27.2.
- [CURRENT] `next.config.ts` has `typescript: { ignoreBuildErrors: true }` and `reactStrictMode: false` — both must be reversed (Audit §12 debt #1).

**4. Evidence.**
- Bible Part 27.1 — non-negotiable stack.
- Audit §1.1 — confirmed 16.1.1 in use.
- [EVIDENCE Grade B] App Router gives RSC boundary for free (server-only by default; client must opt-in via `'use client'`).

**5. Alternatives.**
- Electron (desktop shell + Node backend).
- Tauri (Rust shell + system webview).
- Pure-native (Swift macOS / WinUI Windows).
- Plain Vite + React SPA (no server).

**6. Rejected alternatives.** All four above.

**7. Why rejected.**
- *Electron*: doubles process model, ~150MB binary, two release channels; doesn't add anything MiMo needs for v1 (the owner is desktop-first but a browser tab works).
- *Tauri*: smaller binary but Rust backend means rewriting the Core pipeline in a second language; Bible mandates TypeScript end-to-end (Part 27.1).
- *Native*: full rewrite per-platform; antithetical to "ship fewer features at higher craft" (Bible Part 1.5).
- *Vite SPA*: no server tier → client must import model SDK or talk to external backend → violates Invariant 17 (z-ai-web-dev-sdk never in client). Server tier is structurally required.

**8. Consequences.**
- The owner accesses MiMo via `localhost:3000` (today) or a future Electron/Tauri wrapper around the same Next.js standalone build (v2 — Bible Part 26.9 does not preclude this).
- Build is `next build` → standalone server. No SSG of dynamic content.
- All client/server isolation enforced by RSC boundary + `'use client'` / `'use server'` directives (Bible Part 27.3 rule 4).

**9. Security impact.** App Router's `'use server'` boundary structurally keeps model SDK + provider keys server-side (Invariant 17). This is the primary security benefit.

**10. Performance impact.**
- RSC reduces client bundle for the shell.
- Turbopack dev rebuilds are fast (<1s typical for single-file edits).
- [CURRENT ISSUE] Streaming in `/api/chat` is fake (word-by-word `setTimeout`) — Audit §4.2. Must be replaced with real `ReadableStream` from the model adapter (D4 + Phase 8 of roadmap).

**11. Scalability impact.** Single Next.js server process; horizontal scaling unnecessary (single-user). Bible Part 26.1 caps target at 10k conversations + 10k memories + 1k entities — well within one process.

**12. Migration impact.** None from CURRENT — framework is already Next.js 16. Migration is config: flip `ignoreBuildErrors: false`, `reactStrictMode: true`, fix surfaced TS errors (Phase 0 of roadmap).

**13. Reversibility.** HIGH. The shell, components, and Core are framework-agnostic at the module level. Next.js could be swapped for Remix/Express later at the `app/` layer only.

**14. Validation method.**
- `bun run build` exits 0 with strict TS + strict lint (Phase 0 acceptance).
- `curl http://localhost:3000/` returns 200 with the MiMo OS shell (Audit §1.5 — currently 500).
- Agent Browser golden-path: page loads, conversation sends + streams.

---

## D2 — SQLite + Prisma as the persistence layer

**1. Decision.** SQLite (file `db/custom.db`) accessed exclusively through Prisma 6 ORM. [Bible Part 22.1, Part 27.1] [CURRENT: SQLite + Prisma 6.11 installed]

**2. Problem.** MiMo must persist conversations, memory, knowledge entities, artifacts, tasks, agents, executions, audit events, and user/owner model state across crashes and reloads — with zero data loss as a hard product requirement (Bible Part 1.2 success criteria #2). All of this is single-user local-first. A networked database adds operational burden + a second machine to trust.

**3. Context.**
- [CURRENT] Prisma 6.11 + SQLite installed; schema is **boilerplate** (`User` + `Post` only — Audit §3.1).
- [CURRENT] Migrations folder does not exist; project uses `db:push` (schema-push, no migration history) — Audit §3.1.
- [CURRENT] MemoryEngine, EventBus, registries are all in RAM (Audit §3.2) — they MUST move to Prisma (D22, D3).
- [TARGET] Full MiMo domain schema (Project, Conversation, Message, Memory, Knowledge, Artifact, Task, Agent, Execution, AuditEvent, …) — Bible Part 27.2.

**4. Evidence.**
- Bible Part 22.1 — local-first SQLite via Prisma is invariant.
- Bible Part 26.7 — migrations via `bun run db:push`, backward-compatible.
- [EVIDENCE Grade A — evidence/anytype.md §21, evidence/bolt.md §21] Local-first products converge on SQLite.
- [EVIDENCE Grade A — evidence/linear.md §21] Linear ships a local SQLite cache for instant ⌘K at scale.

**5. Alternatives.**
- PostgreSQL (local or remote).
- IndexedDB / OPFS (browser-only).
- Plain files (JSON / Markdown).
- LMDB / DuckDB / other embedded KV.

**6. Rejected alternatives.** Postgres; IndexedDB; plain files; other embedded DBs.

**7. Why rejected.**
- *Postgres*: requires a server process the owner must start/stop/upgrade; violates local-first; doubles failure surface (server down = MiMo down).
- *IndexedDB/OPFS*: tied to a single browser profile; can be evicted under storage pressure; not queryable from the Core (which is server-side); can't do FTS5 or relational joins.
- *Plain files*: no transactions, no FTS, no relational integrity; concurrent writes corrupt. Acceptable for export (Bible Part 22.10), not as primary store.
- *Other embedded DBs*: lose Prisma's typed schema + migrations; no TypeScript-native query API.

**8. Consequences.**
- All domain state must be modelled in `prisma/schema.prisma`. No silent in-RAM state for canonical data (UI ephemera like "is palette open" can stay in Zustand).
- Migrations are managed via `prisma migrate dev` (Phase 1) — `db:push` is acceptable for prototype but loses migration history, which the audit trail (D3) needs.
- WAL mode must be enabled for concurrent read while write (see D3 + D23).

**9. Security impact.**
- [TARGET] SQLCipher (Bible Part 22.2) — SQLite file at rest must be encrypted. SQLCipher is wire-compatible with Prisma via `@prisma/adapter-sqlcipher` or a patched driver. [UNKNOWN — must verify Prisma 6 + SQLCipher compatibility in Phase 1.]
- API keys + secrets must NOT live in SQLite — they go to OS keychain (Bible Part 22.3). Prisma schema must have no `Secret` table.

**10. Performance impact.** SQLite handles 10k+ rows per table with indexes + FTS5 with sub-ms queries on a laptop SSD. WAL mode enables concurrent reads during writes (eliminates reader/writer contention that the in-memory Map "solves" by being single-threaded).

**11. Scalability impact.** Bible Part 26.1 caps: 10k conversations, 10k memories, 1k entities. SQLite + FTS5 + proper indexes handles 100× this. Single-file DB caps at ~281TB (SQLite limit). We will never hit the ceiling.

**12. Migration impact.**
- [MIGRATION] Replace boilerplate schema with full MiMo domain schema.
- [MIGRATION] Use `prisma migrate dev --name init_domain_schema` to begin migration history (Audit §3.1 currently has none).
- [MIGRATION] Existing `db/custom.db` (24KB demo data) is acceptable data loss (Audit §16 risk #1) — `db:push --accept-data-loss` is fine here.
- [MIGRATION] MemoryEngine swaps its in-RAM `Map` for Prisma queries while preserving the `MemoryEngine` interface (D22).

**13. Reversibility.** MEDIUM. Schema is reversible via migrations. Switching DB engine later (e.g. to LibSQL for sync) is feasible because Prisma abstracts it; switching ORM (to Drizzle/Kysely) is harder but not catastrophic because the domain model is in `types.ts`, not the ORM.

**14. Validation method.**
- Phase 1 acceptance: every Core engine that holds state has a Prisma model + a round-trip test (create → read → update → delete).
- `bun run db:migrate dev` succeeds clean on a fresh clone.
- Kill dev server mid-write → restart → zero data loss (durability test).

---

## D3 — In-memory EventBus + persistent event log (hybrid)

**1. Decision.** The EventBus stays as an in-memory pub/sub (zero-latency, sync handlers). Every published event is *also* written to an append-only `AuditEvent` table in SQLite (Prisma) before delivery. Replay = re-read the log; live = in-memory bus.

**2. Problem.** Bible Part 22.9 mandates an append-only audit log of every agent action. Bible Part 8.10 + Part 24 require state-edit-and-continue + crash recovery (events must survive a crash so an agent can resume). Audit §3.2 + §9.5 show CURRENT EventBus is in-RAM only — no audit trail, no replay, no recovery.

**3. Context.**
- [CURRENT] `EventBus` is `Map<string, Set<EventHandler>>` (Audit §3.2). Lost on restart.
- [TARGET] EventBus interface stays the same (`publish`, `subscribe`, `unsubscribe`) but `publish` first writes a row to `AuditEvent` (Prisma), then notifies subscribers synchronously.
- [TARGET] Replay API: `EventBus.replay(filter)` reads from `AuditEvent` and re-publishes (only for recovery / dev panel).

**4. Evidence.**
- Bible Part 22.9 — append-only audit log invariant.
- Bible Part 8.10 + Part 24 — recovery needs durable state.
- [EVIDENCE Grade A — evidence/openhands.md §8] OpenHands event-stream is 12 event types, append-only, observable.
- [EVIDENCE Grade A — evidence/dust.md §8] Dust uses Temporal for durable per-agent observability.

**5. Alternatives.**
- Pure in-memory bus (CURRENT) — fails Bible Part 22.9.
- Persistent event log + no in-memory bus (every subscriber polls) — adds latency to live UI updates.
- External message queue (Redis / RabbitMQ / NATS JetStream) — operational burden, single-user overkill.
- SQLite as the bus itself (LISTEN/NOTIFY equivalent: SQLite has update-hook but no portable pub/sub).

**6. Rejected alternatives.** All four above.

**7. Why rejected.**
- *Pure in-memory*: fails audit-trail + recovery invariants (Bible Part 22.9, Part 24).
- *Persistent-only*: live ExecutionTrace + AgentDock need <50ms event delivery; polling adds latency + waste.
- *External MQ*: requires a second process the owner must run; violates local-first; over-engineered for one process.
- *SQLite-as-bus*: no portable pub/sub; polling reintroduces the latency problem.

**8. Consequences.**
- Every `publish()` is one Prisma insert + N sync handler calls.
- Subscribers must be idempotent — replay re-runs them. (Mitigation: replay supports a `dryRun` flag that returns events without invoking handlers; UI subscribers can use this.)
- AuditEvent schema: `id, timestamp, type, payload (JSON), source (agent/route/user/tool), correlationId, causationId`.

**9. Security impact.** Append-only audit log is the security invariant (Bible Part 22.9). Tampering requires DB write access + schema mutation — single-user local mitigates this; SQLCipher (D2) raises the bar further.

**10. Performance impact.** One Prisma insert per publish (~0.5–2ms on local SSD). At MiMo's scale (10s of events per user action) this is negligible. For high-frequency events (token streaming), use a separate non-audited `StreamChunk` channel (see D25 + Phase 8).

**11. Scalability impact.** AuditEvent table grows linearly with usage. Bible Part 26.7 says migrations are backward-compatible. Compaction policy (Phase 3 deliverable): keep 90 days full detail, after that aggregate to daily summaries (still append-only — never delete).

**12. Migration impact.**
- [MIGRATION] Phase 3 of roadmap: add `AuditEvent` Prisma model, refactor `EventBus.publish` to write-then-notify.
- [MIGRATION] Existing event types in `core/events` keep their signatures.
- [MIGRATION] New `EventBus.replay(filter)` method.

**13. Reversibility.** HIGH. The hybrid is contained: drop the audit-log write → back to CURRENT in-memory bus.

**14. Validation method.**
- Phase 3 acceptance: kill server mid-publish → restart → event is in AuditEvent table (durability).
- Replay test: subscribe handler that increments a counter; replay last 100 events → counter matches.
- Audit-trail test: every tool invocation produces an `AuditEvent` row (Bible Part 22.9 invariant).

---

## D4 — Provider-neutral AI adapter layer

**1. Decision.** Every external AI capability (chat completion, streaming, embeddings, vision, image generation, web search) is accessed only through a Core adapter (`ModelAdapter`, `ImageAdapter`, `SearchAdapter`, `EmbeddingsAdapter` interfaces). Provider SDKs (`z-ai-web-dev-sdk`, OpenAI, Anthropic, Ollama) are imported ONLY inside adapter implementations, never in API routes, components, or other Core engines. [Bible Part 25.3, Invariant 16/17]

**2. Problem.** [CURRENT] `z-ai-web-dev-sdk` is imported directly in `/api/image/route.ts` and `/api/search/route.ts` (Audit §2 issues #1 + §4.1) — provider coupling + Core pipeline bypass. Bible Part 25.3 forbids this.

**3. Context.**
- [CURRENT] Correct pattern exists: `core/models/ZAIModel.ts` and `core/search/SearchProvider.ts` already isolate the SDK behind adapters (Audit §13 reusable assets).
- [CURRENT] Wrong pattern exists: 2 API routes import the SDK directly.
- [TARGET] `ModelAdapter` interface + `ImageAdapter` interface + `SearchAdapter` interface; concrete adapters register in the ModelRegistry / CapabilityRegistry; API routes call `core.capabilities.image.generate(...)`, never the SDK.

**4. Evidence.**
- Bible Part 25.3 — one public API surface, no bypass paths.
- Bible Part 7.14 — ModelRegistry supports multiple; new models registered at runtime.
- [EVIDENCE Grade A — evidence/cursor.md §8] per-agent model routing is enabled by adapter neutrality.
- [EVIDENCE Grade A — evidence/aider.md §25] Aider works with "any model" via adapter pattern.

**5. Alternatives.**
- Direct SDK coupling in routes (CURRENT for image + search).
- One mega-adapter that switches on `provider` string inside itself (no interface polymorphism).
- LangChain / LlamaIndex as the abstraction layer.

**6. Rejected alternatives.** All three above.

**7. Why rejected.**
- *Direct coupling*: violates Invariant 16 + 17, makes swapping providers impossible.
- *Mega-adapter*: violates open-closed; every new provider edits one file.
- *LangChain/LlamaIndex*: heavy dependency, opinionated abstractions, hard to evolve; Bible Part 25 says MiMo owns the adapter contract.

**8. Consequences.**
- Every capability has an interface + at least one concrete adapter + a registry.
- `@/core/index.ts` exports `core.capabilities.{chat,image,search,embeddings,vision}` — API routes use these.
- Adding a provider = adding one file (e.g. `core/models/OpenAIModel.ts`) + one registry registration. No edits to routes.

**9. Security impact.** Adapter is the single point where API keys are loaded from keychain (D7 + Bible Part 22.3). Routes never see keys.

**10. Performance impact.** Negligible indirection (one function call). Streaming must pass through unchanged (`ReadableStream` end-to-end).

**11. Scalability impact.** Model routing (Bible Part 7.1: cheap/fast/deep/vision/local) is enabled structurally — the Orchestrator picks an adapter by role.

**12. Migration impact.**
- [MIGRATION] Phase 4: route `/api/image` + `/api/search` through `core.capabilities.image` + `core.capabilities.search`.
- [MIGRATION] Define `ImageAdapter` interface; existing `core/search/SearchProvider.ts` already conforms — formalise as `SearchAdapter`.
- [MIGRATION] Add contract tests for each adapter (D24) — given a fixed input, the adapter's output shape must match regardless of provider.

**13. Reversibility.** HIGH. Adapter pattern; reverting to direct SDK coupling is a mechanical find-replace (though we would not want to).

**14. Validation method.**
- `grep -r "z-ai-web-dev-sdk" src/app src/components` returns ZERO matches (only `src/core/*Adapter.ts` may import it).
- Contract tests: each adapter passes input/output contract test (Phase 4 deliverable).
- Adding a second provider (e.g. a local Ollama adapter) requires zero edits to `app/` or `components/`.

---

## D5 — Sequential 6-stage pipeline, parallel opt-in only

**1. Decision.** Default execution is the sequential 6-stage pipeline: `Context → Reason → Plan → Execute → Validate → Done`. Parallel multi-agent execution is opt-in ONLY when each parallel agent has per-agent visibility in the AgentDock. [Bible Part 8.8, Invariant 21, DD-23]

**2. Problem.** Parallel agents confuse users (Bible Part 1.7 anti-Manus rationale; [EVIDENCE Grade A — evidence/manus.md §27]). Single-agent with a search loop preserves context fidelity ([EVIDENCE Grade A — evidence/glm.md §8]). But some tasks genuinely benefit from parallel work (research + coding simultaneously, each independent scope).

**3. Context.**
- [CURRENT] 5-stage pipeline exists (Context→Reason→Plan→Execute→Validate) — Audit §1.4. Missing the explicit `Done` stage.
- [TARGET] 6 stages; the `Done` stage is where audit events are flushed, the AgentDock slides away, and the result is committed to the conversation.

**4. Evidence.**
- Bible Part 33 — "The 6-stage pipeline (Context → Reason → Plan → Execute → Validate → Done)" cannot be changed.
- Bible Part 8.8 + Invariant 21 — parallel opt-in only with per-agent visibility.
- [EVIDENCE Grade A — evidence/glm.md §8, evidence/manus.md §27].

**5. Alternatives.**
- Parallel-default (Manus pattern).
- No parallelism ever (strictly sequential).
- Multi-agent with no visibility (Codex early anti-pattern).

**6. Rejected alternatives.** All three above.

**7. Why rejected.**
- *Parallel-default*: confuses users (Manus).
- *Strictly sequential*: limits capability for genuinely parallel tasks.
- *No visibility*: violates Invariant 21.

**8. Consequences.**
- Orchestrator is single-threaded by default; a `parallel: true` flag on a Plan step spawns sub-plans each with their own AgentDock entry.
- Every spawned parallel agent has a visible AgentDock card (Bible Part 8.8 rule 2).
- The owner can see all branches (Bible Part 8.8 rule 3).

**9. Security impact.** Each parallel agent inherits parent scope (Bible Part 22.6 — sub-agents cannot escalate). The trust ledger (D15) applies per-task-type per parallel branch.

**10. Performance impact.** Sequential by default means latency = sum of stages. Acceptable: most stages are <1s; only Execute (model calls) is slow. Real model streaming (Phase 8) hides this.

**11. Scalability impact.** New stages can be inserted (the 6 are fixed; sub-stages within Execute are extensible). Parallel branches are bounded by owner attention (Bible Part 8.8).

**12. Migration impact.**
- [MIGRATION] Add `Done` stage to `WorkflowEngine` (Phase 2 of roadmap).
- [MIGRATION] Orchestrator gains `parallel: PlanStep[]` support (Phase 9 of roadmap, post-default-sequential).

**13. Reversibility.** MEDIUM. Adding the Done stage is trivial; removing parallel support later would break any parallel-dependent workflows (none exist today).

**14. Validation method.**
- Agent Browser: send a research-mode prompt → ExecutionTrace shows 6 stages lighting sequentially.
- Parallel opt-in test: explicitly request "research while coding" → two AgentDock cards appear, each with its own stage indicator.

---

## D6 — Local-first architecture

**1. Decision.** MiMo renders from local cache; all canonical data lives on the owner's machine in SQLite. Cloud sync is opt-in, off by default, end-to-end encrypted. [Bible Part 1.6 #6, Part 22.1, Part 23]

**2. Problem.** Trust is architectural, not UX (Bible Part 1.5). The owner must structurally know that MiMo cannot betray their data. Any cloud-first dependency erodes that trust (ChatGPT opacity anti-pattern, Bible Part 5.4 evidence).

**3. Context.**
- [CURRENT] Local-first in practice — no cloud sync code, SQLite on disk (Audit §3.1, §7).
- [TARGET] Local model support (Phase 8 — Aider `--oss` / Codex `--oss` pattern, Bible Part 7.1).
- [TARGET] E2E cloud sync (Bible Part 22.2 — opt-in, off by default). Deferred to v2.

**4. Evidence.**
- Bible Part 22.1 — invariant.
- [EVIDENCE Grade A — evidence/anytype.md §21, evidence/granola.md §21, evidence/bolt.md §21, evidence/linear.md §21].

**5. Alternatives.**
- Cloud-first (ChatGPT/Claude pattern).
- Hybrid sync (default local + cloud backup).
- Browser-only (IndexedDB).

**6. Rejected alternatives.** All three.

**7. Why rejected.**
- *Cloud-first*: trust risk + latency + region locks (Bible Part 1.7 anti-Claude).
- *Hybrid sync*: adds complexity + a second failure mode (sync conflict); deferred to v2.
- *Browser-only*: violates D2 (SQLite server-side).

**8. Consequences.**
- All features must work offline (Bible Part 23 — graceful degradation; online-only features must degrade visibly).
- No telemetry (Bible Part 22.14).
- E2E sync (when added) must be opt-in + E2E (Bible Part 22.2).

**9. Security impact.** Architectural trust (Bible DD-28). Owner's data never leaves the machine without explicit consent.

**10. Performance impact.** Local SSD reads = sub-ms. No network in critical path (Bible Part 27.11). This is *the* performance strategy.

**11. Scalability impact.** Single-machine scale (Bible Part 26.1). Cannot scale beyond one user (by design).

**12. Migration impact.** None from CURRENT. Local-first is already true; the migration is to add SQLite persistence + the optional sync layer (v2).

**13. Reversibility.** LOW (intentional — Bible DD-28: "architectural commitments hard to change"). Local-first is the product. Reversing it = building a different product.

**14. Validation method.**
- Offline test: disconnect internet → all local features (chat, memory, knowledge, artifacts) work.
- Audit: no outbound network calls except opt-in cloud sync + provider AI calls (which are explicit per-query).

---

## D7 — No authentication (single-user local)

**1. Decision.** MiMo ships with NO authentication. `next-auth` is removed. The single owner is implicitly the only user. [Bible Part 22.1 implicit] [Audit §9.1 — next-auth installed but unused]

**2. Problem.** Authentication adds complexity (session, login UI, token refresh, cookie management) that single-user local-first does not need. [CURRENT] `next-auth 4.24.11` is installed but not configured (Audit §9.1) — dead dependency.

**3. Context.**
- [CURRENT] No auth API routes; `User` Prisma model unused (Audit §9.1).
- [TARGET] Remove `next-auth` dependency; remove `User` + `Post` boilerplate; document no-auth as an explicit architectural decision.

**4. Evidence.**
- Bible Part 1.8 — "one person: the owner … simultaneously the developer, the operator, and the end user."
- Bible Part 22.1 — local-first implies single-user.

**5. Alternatives.**
- Local-only auth (a master password that decrypts SQLCipher).
- next-auth with a single hardcoded user.
- OS-level user account binding (no app-level auth).

**6. Rejected alternatives.** next-auth + hardcoded user; OS-account binding (deferred).

**7. Why rejected.**
- *next-auth*: dependency for no benefit; adds cookies + session surface that single-user does not need.
- *OS-account binding*: cleaner but requires native shell (Tauri/Electron); not v1.
- *Master password / SQLCipher decryption password*: NOT rejected — this is the v2 path for at-rest encryption (Bible Part 22.2). v1 ships with no-auth + plaintext SQLite (Audit §9.3 — documented MEDIUM risk).

**8. Consequences.**
- [DOCUMENTED LIMITATION] Anyone with filesystem access to `db/custom.db` can read all data. Mitigation: single-user machine; full-disk encryption (FileVault / BitLocker) is the owner's responsibility.
- No session middleware; routes are open. Acceptable for `localhost` only — MiMo must NOT be exposed on `0.0.0.0`.
- A `bind: 127.0.0.1` config or the future Electron wrapper provides the network boundary.

**9. Security impact.** This decision *is* the security trade. Mitigations:
- Server binds to `127.0.0.1` only (config).
- SQLCipher at rest is v2 (D2 + Bible Part 22.2).
- OS keychain for API keys (Bible Part 22.3 — provider keys never in `.env` for production).

**10. Performance impact.** None — fewer middleware layers.

**11. Scalability impact.** None — by design single-user.

**12. Migration impact.**
- [MIGRATION] Phase 0: `bun remove next-auth`; delete unused `User` + `Post` models from Prisma schema.
- [MIGRATION] v2: add optional master password that unlocks SQLCipher.

**13. Reversibility.** HIGH. Adding auth later is additive (wrap routes in session middleware). Removing it now is cheap.

**14. Validation method.**
- `package.json` does not contain `next-auth`.
- `prisma/schema.prisma` has no `User` model (only `Owner` settings, if any).
- Documentation explicitly states "no auth; bind to 127.0.0.1."

---

## D8 — Zustand for client state

**1. Decision.** Client state is Zustand. [Bible Part 27.1, Part 27.4] [CURRENT: Zustand installed; one monolithic store]

**2. Problem.** MiMo needs a client store for UI state (active tab, palette open, theme, etc.), conversation streaming state, workspace state, and mode state. The store must be lightweight, work outside React's render cycle (for keyboard handlers, peek overlays), and support selectors for memoization.

**3. Context.**
- [CURRENT] Zustand installed + one monolithic 354-line `lib/nova/store.ts` mixing concerns (Audit §5.2).
- [TARGET] Split into focused stores (see D21).

**4. Evidence.**
- Bible Part 27.1 — non-negotiable stack.
- Bible Part 27.5 — Zustand for client state.
- [EVIDENCE Grade A — Linear, Vercel, shadcn/ui ecosystem adoption].

**5. Alternatives.**
- Redux Toolkit.
- Jotai / Recoil (atomic).
- Native React (Context + `useState`).
- Valtio / MobX.

**6. Rejected alternatives.** All five above.

**7. Why rejected.**
- *Redux*: too much ceremony for single-user; selector + reducer + action boilerplate per feature.
- *Jotai/Recoil*: atom-per-state is fine but loses co-located state (e.g. "tab + its scroll position" belong together).
- *Native*: Context re-renders all consumers; no selector primitive; doesn't work outside React (keyboard handler needs to read state without subscribing).
- *Valtio/MobX*: proxy magic is harder to reason about; Zustand is explicit.

**8. Consequences.**
- One store per boundary (D21): UI store, Conversation store, Workspace store, Mode store, Developer store.
- Selectors for memoization (Bible Part 27.11).
- No prop drilling (Bible Part 27.5).

**9. Security impact.** None — client state is non-secret (no API keys; model SDK never client-side, Invariant 17).

**10. Performance impact.** Zustand selectors prevent unnecessary re-renders. Splitting stores (D21) reduces subscriber breadth.

**11. Scalability impact.** Stores scale by boundary, not by size — 1000 messages live in the Conversation store; the UI store stays tiny.

**12. Migration impact.** [MIGRATION] Phase 15 of roadmap: split the monolithic store into focused stores, keeping the old store as a temporary façade during transition (Audit §16 risk #3 mitigation).

**13. Reversibility.** HIGH. Zustand is a thin wrapper over React's `useSyncExternalStore`. Swapping for another store later is mechanical.

**14. Validation method.**
- `bun run lint` passes clean on store files.
- React DevTools shows one store per boundary, not one giant store.
- Component A subscribing to UI store does NOT re-render when Conversation store updates (selector isolation test).

---

## D9 — Monolithic Core public API surface

**1. Decision.** `src/core/index.ts` is the ONLY public entry point to the Core intelligence pipeline. Anything not exported is internal. [Bible Part 25.3, Invariant 16]

**2. Problem.** Without a single API surface, routes and components reach into Core internals → coupling + bypass paths (Audit §2 issue #2).

**3. Context.**
- [CURRENT] `core/index.ts` exports ~40 symbols (Audit §1.2).
- [TARGET] Curated public surface: `core.kernel`, `core.capabilities`, `core.workflow`, `core.memory`, `core.knowledge`, `core.context`, `core.events`, `core.registry`. Engines and types internal to a namespace are NOT exported.

**4. Evidence.**
- Bible Part 25.3 — one public API surface, no bypass paths.
- Bible Part 27.6 — "UI → API routes → Core public API → Core engines."

**5. Alternatives.**
- Multiple public surfaces (one per engine).
- Microservices (each engine a service).
- Direct engine imports.

**6. Rejected alternatives.** All three.

**7. Why rejected.**
- *Multiple surfaces*: fragments the contract; hard to evolve.
- *Microservices*: operational burden, network in critical path, violates local-first single-process.
- *Direct imports*: CURRENT anti-pattern in 2 routes; violates Invariant 16.

**8. Consequences.**
- The public API is versioned (Bible Part 25.7 — backward-compatible).
- Adding to the public API requires updating `core/index.ts` + a contract test (D24).
- Internal refactors do not break consumers (they consume the public surface).

**9. Security impact.** The public surface is the only place where permission checks MUST be enforced (every public method that mutates state checks the trust ledger — D15).

**10. Performance impact.** Negligible indirection.

**11. Scalability impact.** Public API stability is the lever for evolving MiMo over 10 years without breaking the UI layer.

**12. Migration impact.** [MIGRATION] Phase 14: audit `core/index.ts`, remove internal exports, document the public API contract.

**13. Reversibility.** LOW (intentional). The public API is a stable contract; once shipped, it should not change shape (only extend).

**14. Validation method.**
- `grep -r "from '@/core/" src/app src/components | grep -v "@/core/index"` returns ZERO matches (every Core import goes through `@/core`).
- Public API documented in a TypeScript interface (`MiMoCore`).
- Contract tests cover every public method.

---

## D10 — MCP for plugin protocol

**1. Decision.** Plugin protocol is Model Context Protocol (MCP). Custom tools and agents arrive via MCP servers (local process). [Bible Part 25.1]

**2. Problem.** MiMo must be extensible (Bible Part 25) without inventing yet another protocol. MCP is the convergence point ([EVIDENCE Grade A — evidence/tana.md §25, evidence/github-spark.md §25, evidence/claude-code.md §25, evidence/amie.md §25, evidence/superhuman.md §25]).

**3. Context.**
- [CURRENT] No MCP integration — registries hold built-in tools/agents only.
- [TARGET] Phase 10 of roadmap: MCP client in Core; tools discovered from local MCP servers; permissions per-server.

**4. Evidence.** Bible Part 25.1 + 5 product citations above.

**5. Alternatives.**
- Custom JSON-RPC protocol.
- No plugins (only built-in).
- LangChain tools.

**6. Rejected alternatives.** All three.

**7. Why rejected.**
- *Custom*: NIH; no ecosystem leverage.
- *No plugins*: violates Bible Part 25.11 (personal extension registry).
- *LangChain*: heavy, opinionated, not a protocol.

**8. Consequences.**
- MCP servers run as separate local processes (Bible Part 25.8).
- Each MCP tool/agent appears in the registry with its declared permissions (Bible Part 25.6).
- No remote code execution (Bible Part 22.8 + Part 25.8).

**9. Security impact.** MCP servers are untrusted code — they run in their own process, communicate over stdio/JSON-RPC, have declared permissions, and cannot escalate (Bible Part 25.6 + Part 22.8). Permission approval on first use (D15 trust ledger applies).

**10. Performance impact.** IPC latency (one stdio round-trip per tool call). Acceptable for tool calls (typically 100ms+).

**11. Scalability impact.** Each MCP server is independent; failure of one does not crash MiMo.

**12. Migration impact.** [MIGRATION] Phase 10: add MCP client, port the 3 built-in tools to in-process adapters (no MCP server needed for built-ins).

**13. Reversibility.** MEDIUM. Removing MCP later means removing the client + adapters; built-in tools unaffected.

**14. Validation method.**
- A local MCP server exposing one tool → MiMo discovers it → owner approves → tool invoked from chat.
- Unapproved MCP tool → blocked by permission gate.

---

## D11 — Sandboxing approach for artifact runtime

**1. Decision.** Multi-tier sandbox per artifact type: Pyodide/WASM (Python code), CSP-locked iframe (React/HTML/JS), gVisor-style isolation (when a true OS-level sandbox is needed — future). No raw `eval` in the MiMo process. [Bible Part 22.8, Part 11.4]

**2. Problem.** Code artifacts must be runnable (Bible Part 11.4 — "real runtime, not a preview") without giving arbitrary code access to the owner's filesystem or network.

**3. Context.**
- [CURRENT] No sandbox; no artifact runtime (Audit §9.6, §3.6).
- [TARGET] Phase 11 of roadmap: Pyodide for Python, CSP iframe for web, gVisor (or a wasm-based equivalent like E2B/Firecracker microVM) deferred to v2 for arbitrary shell.

**4. Evidence.**
- Bible Part 11.4 + Part 22.8.
- [EVIDENCE Grade A — evidence/claude.md §13] gVisor verified (R1 corrected).
- [EVIDENCE Grade A — evidence/bolt.md §12] Bolt uses WebContainer.

**5. Alternatives.**
- gVisor only (heavy; requires Linux + a daemon).
- WebContainer (StackBlitz proprietary; licensing constraints).
- Pyodide only (Python-only; not for React/HTML).
- CSP iframe only (no Python).
- No sandbox (run code directly in MiMo process — UNACCEPTABLE).

**6. Rejected alternatives.** gVisor-only; WebContainer; Pyodide-only; CSP-iframe-only; no sandbox.

**7. Why rejected.**
- *gVisor only*: Linux-only, heavy, requires daemon — fine for v2 server, not v1 web.
- *WebContainer*: licensing + vendor lock-in.
- *Pyodide-only / CSP-iframe-only*: covers only one language each.
- *No sandbox*: violates Bible Part 22.8.

**8. Consequences.**
- Three runtime tiers in Phase 11: Pyodide (Python), CSP iframe (web), gVisor/E2B (shell — v2).
- Each artifact type declares its runtime tier (Bible Part 11.2 table).
- Network egress from sandboxed code is blocked by default (Bible Part 22.7).

**9. Security impact.** Sandboxing is the second layer of defense (after D7 + D15). Arbitrary code cannot reach the owner's filesystem or network without explicit approval per artifact.

**10. Performance impact.** Pyodide cold-start ~1–2s (one-time per session); CSP iframe ~100ms. Acceptable for an interactive artifact runtime.

**11. Scalability impact.** Each artifact runtime is an isolated process/iframe; can be disposed.

**12. Migration impact.** [MIGRATION] Phase 11 of roadmap: implement Pyodide + CSP iframe; defer gVisor to v2.

**13. Reversibility.** HIGH per-tier; each tier is independent.

**14. Validation method.**
- Python artifact: `print("hello")` runs in Pyodide → output appears in ArtifactViewer.
- React artifact: `<button onClick=...>` runs in CSP iframe → click works; iframe cannot access `parent.document`.
- Network test: sandboxed `fetch('https://example.com')` is blocked unless explicitly allowed.

---

## D12 — No onboarding wizard

**1. Decision.** Never. The owner starts working in <30 seconds. Empty states + command palette discoverability replace a wizard. [Bible Part 28.2, DD-19]

**2. Problem.** Wizards add friction (Bible Part 1.5 — Apple calm deference).

**3. Context.** [CURRENT] No wizard exists (good). This decision locks it.

**4. Evidence.** Bible DD-19 + Apple calm deference [Grade A] + Roam too-steep [Grade B].

**5. Alternatives.** Multi-step wizard; Roam-style no-onboarding-but-steep-learning-curve; progressive disclosure tour.

**6. Rejected alternatives.** All three.

**7. Why rejected.** Friction; too steep; tours are abandoned after first use.

**8. Consequences.** First-run experience = empty conversation with one prompt ("What would you like to work on?"). Empty states in every panel with hints. Command palette discoverable via `⌘K`.

**9–11. Security/Performance/Scalability.** None.

**12. Migration impact.** None — already true.

**13. Reversibility.** HIGH (intentionally — a wizard could be added later if user testing demands).

**14. Validation method.** First-run test (fresh DB → owner can send a message in <30s).

---

## D13 — No credit/quota counters

**1. Decision.** Never. No counter UI anywhere. [Bible Part 1.6 #9, DD-10, Invariant 9]

**2. Problem.** Counters punish long sessions and erode trust (Bible DD-10; [EVIDENCE Grade A — evidence/genspark.md §27, evidence/lovable.md §27]).

**3. Context.** [CURRENT] No counters exist (good). This decision locks it.

**4. Evidence.** Bible DD-10 + 3 product citations.

**5. Alternatives.** Credit counter; soft quota; unlimited cloud.

**6. Rejected alternatives.** All three.

**7. Why rejected.** Punishes long sessions; anxiety; trust risk; nonsensical for single-user local-first.

**8. Consequences.** Local resources are the only limit (CPU, RAM, disk, model API rate limits — which are provider-side, not MiMo-side).

**9. Security impact.** None.

**10. Performance impact.** None.

**11. Scalability impact.** None.

**12. Migration impact.** None — already true.

**13. Reversibility.** LOW (intentional — counter UI anywhere violates Invariant 9).

**14. Validation method.** `grep -ri "credit\|quota\|remaining\|usage_limit" src/` returns ZERO matches outside `core/capabilities/*Adapter` (which may expose provider rate-limit info to DeveloperPanel only, never to primary UI).

---

## D14 — No deprecations mid-redesign

**1. Decision.** Never. Working features are not removed during a redesign. Parallel versions live during transitions. [Bible Part 1.6 #9, DD-20, Invariant 10]

**2. Problem.** Deprecating working features erodes trust (Bible DD-20; [EVIDENCE Grade A — evidence/chatgpt.md §13 Canvas sunset, evidence/v0.md §13 Premium plan sunset]).

**3. Context.** This is the contract that protects the owner's investment. It applies during MiMo's own redesign (e.g. switching MemoryEngine from in-RAM to Prisma-backed — the old engine stays runnable in parallel until the new one is verified).

**4. Evidence.** Bible DD-20 + 2 product citations.

**5. Alternatives.** Deprecate + migrate; big-bang rewrite.

**6. Rejected alternatives.** Both.

**7. Why rejected.** Erodes trust; breaks flows.

**8. Consequences.** During the architecture redesign (this phase), CURRENT code stays functional until each TARGET replacement is shipped + verified. Migrations keep both old + new paths live until the owner confirms the new path (Bible Part 26.7 — backward-compatible).

**9–11. Security/Performance/Scalability.** None direct. Temporary dual-maintenance cost (Bible DD-20 scalability impact).

**12. Migration impact.** EVERY phase in the roadmap must keep the CURRENT path runnable until the TARGET path is shipped + verified. Rollback is always available.

**13. Reversibility.** LOW (intentional — this is the contract).

**14. Validation method.** At every phase: old path still works + new path works. Only after owner sign-off (via Agent Browser test) does the old path get removed (or kept as a feature flag).

---

## D15 — Per-task-type trust ledger

**1. Decision.** Trust is granted per task type (per project + per scope), not per instance. After 3 approvals of the same task type, MiMo offers "Always allow this kind for this project." Ledger is visible + editable in Settings. [Bible Part 8.7, DD-08, Invariant 22]

**2. Problem.** Per-instance approval storms are the #1 complaint in Codex + Manus (Bible DD-08 evidence). Blanket trust is unsafe. Per-task-type calibrates trust to the owner's actual workflow.

**3. Context.**
- [CURRENT] No permission system (Audit §9.2).
- [TARGET] `TrustLedger` Prisma model: `project_id, task_type, scope, approval_count, granted (boolean), granted_at`.

**4. Evidence.** Bible DD-08 + Codex/Manus citations + Trust-in-AI [Grade A].

**5. Alternatives.** Per-instance approval; blanket trust; no approval (auto-execute everything).

**6. Rejected alternatives.** All three.

**7. Why rejected.** Fatigue (Codex/Manus); unsafe; trust erosion.

**8. Consequences.** Every tool invocation checks the ledger first. Sandbox modes (read-only / workspace-write / danger — Bible Part 22.4) layer on top.

**9. Security impact.** This IS the security control for tool execution (along with D11 sandbox).

**10. Performance impact.** One Prisma read per tool invocation (~1ms).

**11. Scalability impact.** Trust entries scale with (project × task_type × scope) — bounded by owner's task diversity, not by usage volume.

**12. Migration impact.** [MIGRATION] Phase 9 + 10 of roadmap: add `TrustLedger` model, route every tool call through `TrustLedger.check()`.

**13. Reversibility.** MEDIUM. Ledger is additive; removing it = back to per-instance (which we would not).

**14. Validation method.**
- 3 approvals of "run tests" → "Always allow?" prompt → grant → 4th invocation runs without prompt.
- Settings shows ledger; owner can revoke per entry.

---

## D16 — One container (Project) + one branch (Fork)

**1. Decision.** Project is the ONLY container type. Fork is the ONLY branch primitive. [Bible Part 1.7, DD-02]

**2. Problem.** Container sprawl (Lovable 7, v0 8) causes cognitive overload (Bible DD-02 evidence).

**3. Context.** [CURRENT] A "currentProject" field exists in the Zustand store (Audit §5.2); no Fork primitive yet.

**4. Evidence.** Bible DD-02 + 4 product citations + CLT.

**5. Alternatives.** Multiple containers; no containers.

**6. Rejected alternatives.** Both.

**7. Why rejected.** Overload; no organization.

**8. Consequences.** Project holds conversations, artifacts, memory (project-scoped), tasks. Fork creates a new conversation tab with the forked turn as root (Bible Part 12.2).

**9–11. Security/Performance/Scalability.** Project-scoped memory + permissions (D15). Fork is a lightweight copy (no data duplication — references parent turn).

**12. Migration impact.** [MIGRATION] Phase 2 of roadmap: `Project` Prisma model; Phase 12: Fork primitive.

**13. Reversibility.** LOW (intentional — one-model-per-dimension).

**14. Validation method.** Owner organizes work with only Project + Fork (user test).

---

## D17 — One AI surface (Conversation)

**1. Decision.** Conversation is the ONLY AI surface. All AI capabilities compose into the conversation. [Bible Part 1.7, DD-03]

**2. Problem.** Multiple AI surfaces cause cognitive overload (Bible DD-03 — Notion's 8 surfaces).

**3. Context.** [CURRENT] MiMo OS shell renders one conversation surface (Audit §1.3).

**4. Evidence.** Bible DD-03.

**5. Alternatives.** Multiple AI surfaces (Notion pattern).

**6. Rejected alternatives.** Multiple.

**7. Why rejected.** Overload.

**8. Consequences.** Image generation, search, code execution, etc. all surface as artifacts or inline cards in the conversation, not separate AI surfaces.

**9–11. Security/Performance/Scalability.** None direct.

**12. Migration impact.** None from CURRENT — already true.

**13. Reversibility.** LOW (intentional).

**14. Validation method.** All tasks done via conversation (user test).

---

## D18 — One command palette with prefix grammar

**1. Decision.** `⌘K` opens ONE palette with prefix grammar: `>` commands, `/` slash blocks, `@` mentions, `#` files, `!` Quick AI. [Bible Part 14, DD-11, Part 15]

**2. Problem.** Multiple search/command surfaces = overload (Bible DD-11).

**3. Context.** [CURRENT] `CommandPalette` exists in `components/nova/` (Audit §5.1); `UniversalSearch` exists in `components/mimo/` (Audit §1.3). Prefix grammar partial (Audit §17 conflict #11).

**4. Evidence.** Bible DD-11 + 5 product citations.

**5. Alternatives.** Two separate overlays (commands + search); multiple palettes per mode.

**6. Rejected alternatives.** Both.

**7. Why rejected.** Adds a second model.

**8. Consequences.** One palette component, one prefix parser, one set of result renderers.

**9–11. Security/Performance/Scalability.** None direct. Performance: palette opens <80ms (Bible Part 1.2 success criteria #4).

**12. Migration impact.** [MIGRATION] Phase 16 of roadmap: unify CommandPalette + UniversalSearch; complete prefix grammar.

**13. Reversibility.** LOW (intentional — Invariant 29).

**14. Validation method.** Agent Browser: `⌘K` → `>cmd` / `/search` / `@mem` / `#file` / `!ai` all return correct result types.

---

## D19 — 44px tap targets + WCAG AA

**1. Decision.** Tap targets ≥44×44px (Apple HIG). Contrast meets WCAG AA. Reduced-motion respected. ARIA live regions for dynamic content. [Bible Part 19, DD-17]

**2. Problem.** Accessibility is non-negotiable (Bible Part 19).

**3. Context.** [CURRENT] shadcn/ui provides baseline ARIA (Audit §5.4 — UNKNOWN, not verified). No axe-core audit (Audit §10.1).

**4. Evidence.** Bible DD-17 + Apple 44pt [Grade A] + WCAG AA + Primer MUST + Fitts's Law.

**5. Alternatives.** Material 48dp; WCAG AAA; no reduced-motion; motion-only.

**6. Rejected alternatives.** All four.

**7. Why rejected.** 48dp is fine but Apple's 44pt is the convergent value; AAA is too strict for visual design freedom; no-reduced-motion excludes users; motion-only excludes screen readers.

**8. Consequences.** All interactive elements ≥44×44px (computed from padding + content). Contrast verified via paired foreground tokens (Bible Part 16). axe-core in CI (Phase 15).

**9. Security impact.** None.

**10. Performance impact.** None.

**11. Scalability impact.** A11y baked in (Bible Part 19).

**12. Migration impact.** [MIGRATION] Phase 15 + 16 of roadmap: audit all components with axe-core; fix violations.

**13. Reversibility.** LOW (intentional — Invariant 13).

**14. Validation method.** axe-core audit + NVDA/VoiceOver screen-reader test (Bible DD-17 validation; Audit §18 unknown #4).

---

## D20 — 5-tier motion system

**1. Decision.** Five motion duration tiers: 0 (instant) / 100 / 200 / 300 / 500 ms. Emphasized bezier `cubic-bezier(0.05, 0.7, 0.1, 1.0)`. Springs for direct manipulation. Asymmetric enter/exit (instant-enter, 150-exit inferred from Linear). Composited properties only. [Bible Part 17, DD-16]

**2. Problem.** Material's 6 tiers + Fluent's 6 = too many (Bible DD-16 evidence). No-motion loses state communication.

**3. Context.** [CURRENT] Framer Motion 12 installed (Audit §1.1); motion tokens partially in `globals.css`.

**4. Evidence.** Bible DD-16 + Primer + Linear (inferred) + Stripe + Material.

**5. Alternatives.** Material 6-tier; iOS springs only; no motion.

**6. Rejected alternatives.** All three.

**7. Why rejected.** Too many; insufficient; loses state communication.

**8. Consequences.** 5 motion tokens + spring config. Every transition uses one of the 5 tiers. Layout-triggering animations forbidden (Invariant 12).

**9. Security impact.** None.

**10. Performance impact.** Composited-only animations keep ≥50fps (Bible Part 20.4).

**11. Scalability impact.** All transitions use the same 5 tiers.

**12. Migration impact.** [MIGRATION] Phase 16 of roadmap: motion token audit; remove non-conforming animations.

**13. Reversibility.** MEDIUM.

**14. Validation method.** Agent Browser: transitions feel right (Bible DD-16). Chrome DevTools Performance tab: no layout-triggering animations recorded during a message send.

---

## D21 — Split Zustand store by boundary (TARGET)

**1. Decision.** The monolithic `lib/nova/store.ts` (354 lines, mixes UI/conversation/workspace/mode/developer state — Audit §5.2) is split into focused stores by boundary:
- `stores/uiStore.ts` — theme, palette open, voice open, image-gen open, settings open, right sidebar open.
- `stores/conversationStore.ts` — conversations, messages, streaming state, composer input.
- `stores/workspaceStore.ts` — tabs, activeTabId, pinned tab, project switcher.
- `stores/modeStore.ts` — current mode, deep-think toggle, web-search toggle, output style.
- `stores/developerStore.ts` — devMode, runtime metrics, event stream, agent registry snapshot.

**2. Problem.** Monolithic store violates single-responsibility; any state update re-renders all subscribers (Audit §5.2 debt #6); makes per-boundary testing impossible; mixes ephemeral UI state with durable conversation state.

**3. Context.**
- [CURRENT] One store, 354 lines, 15+ state slices (Audit §5.2).
- [TARGET] Five stores, each <100 lines, each independently testable.

**4. Evidence.**
- Audit §5.2 + §12 debt #6 + §13 "Replace candidates."
- Bible Part 27.5 — "Zustand for client state" (does not mandate one store; this decision refines).
- [EVIDENCE Grade A — evidence/linear.md §5] Linear uses focused stores per surface.

**5. Alternatives.**
- Keep monolithic store (CURRENT).
- Atomic store per field (Jotai-style).
- One store per component (too granular).

**6. Rejected alternatives.** All three.

**7. Why rejected.**
- *Monolithic*: CURRENT debt; mixing concerns.
- *Atomic*: loses co-located state.
- *Per-component*: too granular; selectors impossible.

**8. Consequences.** Components import only the store they need. Conversation re-render does not re-render the right sidebar.

**9. Security impact.** None.

**10. Performance impact.** Reduces unnecessary re-renders. Critical for ≥50fps on 1000+ message conversations (Bible Part 12.5).

**11. Scalability impact.** Each store scales independently.

**12. Migration impact.** [MIGRATION] Phase 15 of roadmap: incremental split; keep old `lib/nova/store.ts` as a façade that re-exports from the new stores during transition (Audit §16 risk #3 mitigation). After all consumers migrate, delete the façade.

**13. Reversibility.** HIGH.

**14. Validation method.**
- React DevTools shows 5 stores, not 1.
- Selector isolation test: subscribing to `uiStore.paletteOpen` does not re-render when `conversationStore.messages` updates.
- Each store file <100 lines.

---

## D22 — Persistent MemoryEngine via Prisma (TARGET)

**1. Decision.** The `MemoryEngine` swaps its in-RAM `Map<string, StoredEntry>` for Prisma-backed persistence. Same interface (`store`, `recall`, `delete`, `list`); different backing store. [Audit §3.2 + §13 Replace Candidates]

**2. Problem.** [CURRENT] MemoryEngine is volatile (Audit §3.2 — "All memories lost on server restart"). Bible Part 5.10 mandates local-first persistence. Bible Part 1.2 success criteria #2 mandates zero data loss.

**3. Context.**
- [CURRENT] `core/memory/MemoryEngine.ts` — `Map<string, StoredEntry>` (Audit §3.2).
- [TARGET] Prisma `Memory` model; MemoryEngine methods do Prisma queries.
- [TARGET] Every memory has source + timestamp + type + confidence + deleted_at (Bible Part 5.4).

**4. Evidence.**
- Bible Part 5 (memory architecture).
- Audit §3.2 + §13.

**5. Alternatives.**
- Keep in-RAM (CURRENT).
- Plain JSON file persistence.
- SQLite raw (no Prisma).

**6. Rejected alternatives.** All three.

**7. Why rejected.**
- *In-RAM*: data loss.
- *JSON file*: no transactions, no FTS, concurrency issues.
- *Raw SQLite*: loses Prisma typing + migrations.

**8. Consequences.** MemoryEngine becomes async (Prisma queries return Promises). Every caller (`ContextBuilder`, `MemoryRecallTool`, `/api/mimo/workspace`) becomes async — they already are (or trivially can be).

**9. Security impact.** Memory persisted in SQLite → benefits from SQLCipher (D2 + Bible Part 22.2). Provenance (Bible Part 5.4) is enforced by schema.

**10. Performance impact.** Prisma query ~1–5ms. With FTS5 (D23) recall is indexed (sub-ms). For hot paths, an in-RAM LRU cache layer on top (invalidated on write) — Bible Part 26.4 caching.

**11. Scalability impact.** Handles 10k+ memories with FTS5 (Bible Part 26.1).

**12. Migration impact.** [MIGRATION] Phase 6 of roadmap: add `Memory` Prisma model; refactor MemoryEngine to Prisma-backed; keep CURRENT `MemoryEngine` interface unchanged so callers don't change.

**13. Reversibility.** HIGH (interface-preserving swap).

**14. Validation method.**
- Restart test: store memory → kill server → restart → recall returns it.
- Provenance test: every memory has non-null source + timestamp.
- Delete test: delete memory → it's gone from recall but `deleted_at` is set (soft delete for audit trail).

---

## D23 — Full-text search via SQLite FTS5 (TARGET)

**1. Decision.** Add SQLite FTS5 virtual tables for `Memory`, `Conversation` (title), `Message` (content), `Entity` (name + aliases), `Artifact` (title + content). Search via `MATCH` queries. Ranking via FTS5 `bm25()`. [Bible Part 26.3]

**2. Problem.** [CURRENT] No search index; MemoryEngine does `String.includes()` substring matching (Audit §3.3). O(n) per query; fails at 10k+ entries.

**3. Context.**
- [CURRENT] No FTS5 (Audit §3.3).
- [TARGET] FTS5 virtual tables synced via Prisma triggers or application-level write-through.

**4. Evidence.**
- Bible Part 26.3 — "Memory: indexed by type + full-text search."
- SQLite FTS5 is a well-supported, native SQLite extension.
- [EVIDENCE Grade A — SQLite official docs].

**5. Alternatives.**
- Vector-only search (embeddings + cosine similarity).
- No FTS (CURRENT substring).
- External search index (Meilisearch, Typesense).

**6. Rejected alternatives.** Vector-only; substring; external index.

**7. Why rejected.**
- *Vector-only*: loses exact-match recall (memory IDs, project names, code identifiers); requires embedding pipeline (latency + model dependency); not necessary for v1 (Bible Part 6.5 — Knowledge graph is the semantic layer; FTS handles lexical).
- *Substring*: O(n); no ranking; fails at scale.
- *External index*: another process to run; violates local-first.

**8. Consequences.** FTS5 virtual tables add storage (~2× the indexed text). Triggers or write-through keep them in sync. Vector search is a v2 addition on top of FTS5 (not a replacement).

**9. Security impact.** FTS5 indexes plaintext (encrypted at rest via SQLCipher when D2 lands SQLCipher).

**10. Performance impact.** Sub-ms queries at 10k rows. Index update ~1ms per write.

**11. Scalability impact.** FTS5 handles 100k+ documents easily.

**12. Migration impact.** [MIGRATION] Phase 13 of roadmap: add FTS5 virtual tables; sync via Prisma middleware or explicit write-through in each engine.

**13. Reversibility.** MEDIUM (FTS5 tables can be dropped; substring search is the fallback).

**14. Validation method.**
- 10k memory entries seeded → `recall("arduino")` returns in <50ms.
- Ranking test: search "arduino project" → results ordered by relevance (bm25).
- Sync test: write memory → search returns it within the same transaction.

---

## D24 — No tests policy + automated contract tests for adapters (TARGET)

**1. Decision.** MiMo does NOT write unit/integration/e2e test code for product features. The owner validates manually via Agent Browser (Bible Part 27.10). EXCEPTION: automated **contract tests** for Core adapters (Model, Image, Search, Embeddings) — because adapters are the boundary with external providers and must be verified on every change.

**2. Problem.** [CURRENT] No tests; lint disabled to near-nothing (Audit §10.1, §10.2). Lint + typecheck are the automated gates (Bible Part 27.10). But adapter contracts are too important to leave unverified — a silent adapter regression breaks the whole pipeline.

**3. Context.**
- [CURRENT] `tests/` folder contains only Python runtime shell scripts (Audit §15 — delete candidates).
- [CURRENT] `package.json` has no `test` script.
- [TARGET] `tests/contract/` folder with one contract test per adapter. Run via `bun run test:contract`. Run on every commit (CI optional — local-first).

**4. Evidence.**
- Bible Part 27.10 — "No test code (per project rules — owner validates manually via Agent Browser). Lint + type check are the automated gates."
- This decision refines Part 27.10: contract tests are not "test code for product features"; they are **interface verification**, which is a different category.

**5. Alternatives.**
- Full test suite (Jest/Vitest on every component).
- No tests at all (pure manual verification).
- Snapshot tests for UI.

**6. Rejected alternatives.** Full suite; no tests at all; snapshot tests.

**7. Why rejected.**
- *Full suite*: contradicts Bible Part 27.10 + the owner's no-test workflow; high maintenance.
- *No tests at all*: leaves adapter contracts unverified; a single adapter regression can silently break chat/image/search.
- *Snapshot tests*: brittle; not relevant to adapter contracts.

**8. Consequences.**
- One contract test file per adapter: `tests/contract/ZAIModel.contract.ts`, `tests/contract/SearchProvider.contract.ts`, etc.
- Each test verifies: given a fixed input, the adapter returns the expected output shape (not the exact bytes — provider responses vary).
- Contract test for the EventBus persistence (D3): publish → kill → restart → replay returns it.
- Contract test for MemoryEngine persistence (D22): store → restart → recall returns it.
- No contract tests for UI components (manual Agent Browser verification per Bible).

**9. Security impact.** Adapter contract tests catch provider SDK regressions before they ship.

**10. Performance impact.** Negligible — contract tests run in <5s total.

**11. Scalability impact.** Contract tests scale with adapter count (not feature count) — bounded.

**12. Migration impact.** [MIGRATION] Phase 4 of roadmap: add contract tests for ZAIModel + SearchProvider; Phase 8: contract tests for new adapters as added.

**13. Reversibility.** HIGH — contract tests are additive.

**14. Validation method.**
- `bun run test:contract` exits 0 on every adapter.
- Adapter swap test: replace ZAIModel with a mock adapter implementing the same interface → contract tests pass.

---

## D25 — API-only (no server actions)

**1. Decision.** MiMo uses Next.js API routes (`app/api/*/route.ts`) exclusively. No React Server Actions. [Bible Part 25.3, Part 27.6] [CURRENT: no server actions used — Audit §5.3 — consistent]

**2. Problem.** Server Actions blur the client/server boundary (the function looks like a normal import but executes server-side). For MiMo's hard boundary (Invariant 17 — model SDK never client-side), explicit API routes are safer + more debuggable.

**3. Context.**
- [CURRENT] 4 API routes: `/api/chat`, `/api/image`, `/api/search`, `/api/mimo/workspace` (Audit §6.1).
- [TARGET] Add streaming variants + workspace aggregation (Phase 14).

**4. Evidence.**
- Bible Part 25.3 — "one public API surface" (API routes are the surface).
- Bible Part 27.6 — "UI → API routes → Core public API → Core engines."
- Audit §5.3 — confirmed no server actions.

**5. Alternatives.**
- Server Actions (Next.js native RPC).
- GraphQL.
- tRPC.

**6. Rejected alternatives.** All three.

**7. Why rejected.**
- *Server Actions*: blurs the boundary; implicit RPC makes audit harder.
- *GraphQL*: overkill for single-user; schema overhead.
- *tRPC*: type-safe but adds a dependency; REST-style routes are sufficient.

**8. Consequences.** Every UI→Core call is an explicit `fetch('/api/...')`. Streaming via `ReadableStream`. Defensive: every route handler wraps Core calls in `safe()` (Bible Part 25.3).

**9. Security impact.** Explicit routes are auditable; the model SDK boundary is structurally enforced (no `'use server'` function can sneak the SDK into a client bundle).

**10. Performance impact.** HTTP overhead per call (~1ms local). Acceptable; streaming for chat hides latency.

**11. Scalability impact.** Route count grows linearly with capabilities — bounded.

**12. Migration impact.** None from CURRENT — already API-only.

**13. Reversibility.** HIGH.

**14. Validation method.**
- `grep -r "'use server'" src/app src/components` returns ZERO matches.
- Every Core capability reachable via a documented route.

---

## Cross-cutting notes

### Decisions that are architectural invariants (low reversibility — intentional)
D6 (local-first), D9 (one public API), D13 (no counters), D14 (no deprecations), D16 (one container), D17 (one AI surface), D18 (one palette), D19 (44px + WCAG AA), D20 (5-tier motion).

These cannot be reversed without changing the product. They are the contract that protects the owner's investment (Bible DD-28).

### Decisions that are reversible engineering choices
D1 (Next.js), D2 (SQLite + Prisma), D3 (hybrid bus), D4 (adapter layer), D5 (sequential pipeline), D8 (Zustand), D21 (split stores), D22 (Prisma memory), D23 (FTS5), D24 (contract tests), D25 (API-only).

These can be revisited without changing the product.

### Decisions that are documented limitations
D7 (no auth) — mitigated by SQLCipher (D2), keychain (Bible Part 22.3), and `bind: 127.0.0.1`.

### Decisions still marked [UNKNOWN] / [VALIDATION REQUIRED]
- D2 SQLCipher + Prisma 6 compatibility (Phase 1 validation).
- D11 gVisor vs E2B vs Firecracker microVM for shell artifacts (v2 — Phase 11 lands Pyodide + CSP iframe first).
- D19 axe-core audit (Phase 15).
- D20 Linear motion tokens (inferred — Bible DD-16 accepted limitation).

### Conflicts with CURRENT (per Audit §17)
Every decision above is reconciled with the audit conflicts in the migration phases of `MiMo_Implementation_Roadmap.md`. No conflict is left unresolved.

---

**End of MiMo Architecture Decision Log.** 25 decisions logged. Every decision grounded in Bible + Audit. No decision rests on inference alone (Bible Part 30 standard).
