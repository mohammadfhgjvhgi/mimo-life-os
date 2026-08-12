# Memory Consolidation

**Category:** Memory
**Status:** CORE
**Maturity:** Emerging (production consolidation pipelines)

## Definition
The process that **promotes information from short-term / working memory to long-term typed stores**, typically via LLM-driven summarization, fact/preference extraction, clustering, and conflict resolution. Analogous to sleep consolidation in human memory.

## Problem Solved
Without consolidation, short-term memory grows unboundedly, long-term memory never gets populated, and recall degrades. With naive consolidation (verbatim copy), the LTM store becomes a noisy transcript rather than typed, retrievable knowledge.

## Why It Matters
MiMo AI's value depends on cross-session recall. Consolidation is the bridge that turns "today's conversation" into "durable facts, episodes, preferences, and procedures" — without it, every session starts from scratch.

## How It Works
1. **Trigger**: schedule (e.g., hourly), threshold (STM row count > N), or event (session end, idle for 30min).
2. **Select**: pick unprocessed STM items in the consolidation window.
3. **Classify & extract**: LLM reads the window and emits:
   - Episodic summary (one Episode per meaningful event).
   - Semantic facts (triples with confidence + provenance).
   - Preferences (explicit or inferred).
   - Procedural candidates (if a successful task pattern is detected).
   - Conflicts (against existing LTM).
4. **Write**: append to typed LTM stores; mark STM items `consolidated=true`; preserve raw pointer for audit.
5. **Conflict resolution**: apply policy per type; emit UI-review events for ambiguous conflicts.
6. **Cleanup**: optionally delete or archive consolidated STM items past retention.

## Architecture
```
Trigger (schedule/threshold/event)
  → Select unprocessed STM window
  → Consolidator (GLM-5.2 LLM, structured output)
     → Episodic summaries / Semantic facts / Preferences / Procedures / Conflicts
  → Type-specific writers (with conflict resolution)
  → Mark STM consolidated
  → Emit socket.io events (consolidated, conflict-for-review)
```

## Interfaces
- `triggerConsolidation({window}) → consolidationRunId`
- `getConsolidationStatus(runId) → {processed, conflicts, derivedCounts}`
- `reviewConflict(conflictId, decision) → resolvedId`
- `rollbackConsolidation(runId)` (best-effort)

## Dependencies
- LLM (GLM-5.2) for extraction/summarization.
- Typed memory stores (episodic/semantic/preference/procedural).
- Conflict-resolution policies.
- Background worker runtime (Node script / Next.js instrumentation).
- Event bus + socket.io.

## Strengths
- Decouples cheap STM writes from expensive LTM extraction.
- Produces typed, retrievable knowledge instead of noisy logs.
- Batched → amortizes LLM cost.
- Enables "next session starts smarter than the last."

## Weaknesses
- LLM extraction errors propagate into LTM (silent corruption).
- Idempotency is hard (re-running must not duplicate facts).
- Latency: a long consolidation run can block subsequent runs if not parallelized.
- Rollback is best-effort once derived facts are written.

## Failure Modes
- Consolidator crashes mid-run → partial state.
- Re-classifying an old window after a prompt change → conflicting facts.
- Extractor prompt regression → garbage LTM (need eval gate).
- Loss of provenance → can't audit where a fact came from.

## Security Implications
- Consolidation is the path where prompt-injected content can become "durable fact" — extractor must sanitize, provenance must be trustworthy, low-confidence facts must be flagged.
- Rollback ability matters for security incidents.

## Performance Implications
- Runs in background; never blocks request path.
- Batch size tuned to LLM token limits + latency budget.
- Embedding regeneration on derived items adds cost — batch + cache.

## Operational Implications
- Consolidation run log + UI (what got extracted, what conflicted).
- Periodic eval pass on extractor output (sample → human review).
- Idempotency keys per STM window.

## Alternatives
- **No consolidation** (STM = LTM, unbounded growth).
- **Per-turn write to LTM** (expensive, noisy).
- **External service** (Zep/Mem0 — adds dependency).

## Maturity & Production Readiness
- Concept mature (cognitive science).
- Production pipelines: emerging — Mem0, Zep, Letta all ship variants; quality varies.

## Relevant Research / Papers
- Packer et al. (2023) — MemGPT archival/working memory swap.
- Mem0 (2024) — add/update consolidation path.
- Zep (2024) — temporal consolidation into graph.

## Official Documentation
- Mem0: https://docs.mem0.ai/
- Letta: https://docs.letta.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Worker**: Node script spawned from Next.js `instrumentation.ts` (or external worker process); runs on cron (node-cron) + on event-bus trigger.
- **Prisma model `ConsolidationRun`**: `id, startedAt, finishedAt, windowStart, windowEnd, itemsProcessed Int, derivedCounts Json, status Enum, error Json?`.
- **Extractor prompt**: GLM-5.2 (z-ai-web-dev-sdk), structured JSON output (episodes[], facts[], preferences[], procedures[], conflicts[]).
- **Idempotency**: `STM.consolidatedRunId` set on success; re-run skips.
- **Conflict queue**: `MemoryConflict` table with `status PENDING|RESOLVED|DEFERRED`; UI surfaces via socket.io.
- **Rollback**: best-effort — track derived IDs per run; delete on rollback (caveat: if a derived fact was already used downstream, log it).
- **Zustand**: client-side "consolidation feed" widget for the observability dashboard.
- **Caddy**: single-port proxy; worker doesn't need direct exposure.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory). CAPABILITY_MAP §3 lists Memory Consolidation as CORE. Pivotal: without it, the typed-memory architecture is decorative. Also feeds Learning Layer (13) and Verification Layer (11) (provenance).

## Recommended Usage
- Run hourly + on session-idle + on session-end.
- Batch size: ~50 STM items or ~30k tokens (whichever first).
- Always emit provenance + confidence on derived facts.
- Eval-gate the extractor prompt (sample review before promoting to production).
- Idempotency keys + rollback on failure.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. Background worker + GLM-5.2 extractor + typed writers + conflict queue + idempotency + UI review.

## Sources
- Packer et al. (2023). *MemGPT.* arXiv:2310.08560.
- Mem0 (2024). arXiv:2504.19413.
- Zep (2024). arXiv:2501.13956.
- MiMo AI `docs/CAPABILITY_MAP.md` §3.
- Inventory lines 421–429 (Memory Consolidation, P0).
