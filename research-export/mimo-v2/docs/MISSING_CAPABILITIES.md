# MISSING_CAPABILITIES

> Capabilities the target system needs that are NOT adequately covered by the supplied technology inventory, plus gaps in the inventory itself. Added only where a real architectural requirement exists — not because a tech is "interesting."

## Method
Compared the `CAPABILITY_MAP.md` target against the inventory's 34 categories. Listed gaps where a required capability has no adequate technology, plus operational gaps the inventory doesn't address.

---

## Missing / Under-covered Capabilities

### 1. Deployment & Packaging (not in inventory)
- **Gap:** No mention of how MiMo is packaged/deployed (Docker image, systemd, bare metal, single-binary).
- **Requirement:** A reproducible build + run story. The scaffold already has `.zscripts/build.sh` + `next build` standalone output.
- **Add:** ADR for deployment target (Docker Compose for UI + mini-services + Caddy).

### 2. Backup & Disaster Recovery (under-covered)
- **Gap:** Inventory mentions backups vaguely. For a personal AI holding months of memory/knowledge, loss is catastrophic.
- **Requirement:** Automated SQLite backup (WAL checkpoint + snapshot), vector index rebuild from source chunks, KG rebuild from documents, secrets recovery.
- **Add:** Backup/restore runbook + scheduled job.

### 3. Migration / Schema Evolution
- **Gap:** No mention of schema migrations for evolving memory/knowledge/task schemas.
- **Requirement:** Prisma migrations + versioned memory records (the `version` field) + back-compat shims.
- **Add:** Migration strategy in ADR.

### 4. Cost & Budget Enforcement (operational)
- **Gap:** Observability tracks cost, but no explicit per-task/per-session/per-day budget enforcement.
- **Requirement:** Budget gates that pause/escalate when spend exceeds limits. Especially critical for autonomy.
- **Add:** Budget policy in Policy Engine; budget fields on Task/Agent/Session.

### 5. Streaming Protocol to UI
- **Gap:** Inventory doesn't specify how agent/tool activity streams to the UI in real time.
- **Requirement:** socket.io event schema (step-start/progress/done/tool-call/verification/error/checkpoint/result).
- **Add:** Real-time event contract (already have the socket.io demo pattern in `examples/`).

### 6. Idempotency & Exactly-once Tool Execution
- **Gap:** Retries are mentioned, but idempotency keys for tool calls (so a retry doesn't double-charge/double-execute) are not.
- **Requirement:** Idempotency keys on tool calls; dedup on retry.
- **Add:** `idempotencyKey` on tool-call schema.

### 7. Content Safety / Output Filtering
- **Gap:** Prompt-injection defense is covered; output safety (model generating harmful content, PII leaking into responses) is under-covered.
- **Requirement:** Output filter (PII redaction, content policy) before results reach the user or tools.
- **Add:** Output-safety stage in Tool/Result pipeline.

### 8. Provenance for Generated Artifacts
- **Gap:** Knowledge provenance is covered; provenance for generated code/files/images (which model, which prompt, which tool) is not.
- **Requirement:** Every generated artifact carries a manifest (model, prompt hash, tool, timestamp, license).
- **Add:** Artifact manifest schema.

### 9. Time / Timezone Handling
- **Gap:** Temporal reasoning/memory mentioned, but concrete timezone handling for schedules/triggers across user context is not.
- **Requirement:** Consistent timezone storage (UTC) + user-local display + trigger scheduling in user TZ.
- **Note:** User TZ = Asia/Jerusalem (set in this environment).

### 10. Multi-device / Sync (future)
- **Gap:** Personal AI implies multi-device access; inventory doesn't address sync.
- **Requirement:** v1 single-device; design memory/knowledge schema so a sync layer can be added later (client IDs, vector timestamps). Defer actual sync to v2.

### 11. Telemetry Privacy
- **Gap:** Observability implies logging prompts/results — which may contain sensitive personal data.
- **Requirement:** Redaction pipeline (secrets/PII scrubbed) before persistence; configurable verbosity; user-owned data export/delete.
- **Add:** Redaction in observability pipeline; GDPR-style data export/delete endpoints.

### 12. Local-first / Offline Capability
- **Gap:** Inventory lists Local Embeddings (P1) but doesn't address offline LLM fallback.
- **Requirement:** If Z.ai API is down, degrade gracefully (local small model for trivial tasks, or clear "offline" mode) rather than hard-fail.
- **Add:** Offline mode design (deferred to v1.x; local model via Model Gateway adapter).

### 13. Versioning of Prompts / Strategies
- **Gap:** Self-improvement updates prompts, but prompt versioning + rollback isn't explicit.
- **Requirement:** Prompt/strategy registry with versions; rollback on regression.
- **Add:** `PromptTemplate` versioned table (already proposed by subagent 6-a).

### 14. Concurrency Control on Memory Writes
- **Gap:** Multiple agents/tools may write memory concurrently; conflict resolution is mentioned but not the concurrency control itself.
- **Requirement:** Optimistic concurrency (version check) or serialized writes per record; merge strategy for simultaneous updates.
- **Add:** Concurrency control in Memory Layer.

---

## Capabilities Explicitly NOT Missing (verified covered)
- Reasoning modes, memory types, retrieval, agents, tools, execution, verification, recovery, learning (gated), autonomy (gated), security, observability, evaluation, multimodal, browser, coding, MCP — all covered in `knowledge/`.

## Summary
14 gaps identified, all addressable within the chosen stack without new external dependencies (except optional local model for offline, deferred). None block Phase 2 implementation; all should be designed into interfaces now (provenance, idempotency, budget, redaction, versioning) so they're not bolt-ons later.
