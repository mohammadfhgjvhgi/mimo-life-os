# Memory Compression

**Category:** Memory
**Status:** REQUIRED
**Maturity:** Emerging (LLM-driven summarization is the production default)

## Definition
The process of **reducing the size of older memories** while preserving their informational value — via summarization, clustering, key-fact extraction, or lossy storage tiering — so that long-term stores stay bounded and retrieval stays precise over months/years of use.

## Problem Solved
Long-horizon personal assistants accumulate years of episodes, transcripts, and facts. Without compression, storage grows linearly, retrieval latency degrades, context bloats, and old items crowd out recent relevant ones.

## Why It Matters
MiMo AI is meant to run for the user's lifetime. Compression is what keeps the LTM store finite, fast, and useful — the alternative is "forget everything older than N days" (loses long-term value) or "keep everything" (unbounded cost).

## How It Works
1. **Trigger**: schedule (e.g., nightly), threshold (memory count > N for a type), or policy (episodes older than 90d, low-confidence facts older than 180d).
2. **Cluster**: group candidate memories by semantic similarity (vector clustering).
3. **Summarize**: GLM-5.2 generates a compact summary per cluster; extract key facts/preferences.
4. **Replace**: write the summary as a new memory (with `compressedFrom=[originalIds]`); mark originals `archived=true` (or delete if retention allows).
5. **Preserve pointers**: keep raw-pointer for audit; summary references originals.
6. **Index**: embed summary, update FTS5 + sqlite-vec.

## Architecture
```
Trigger → Select candidates (old, low-confidence, or clustered)
  → Cluster (vector similarity)
  → Compressor (GLM-5.2: summarize + extract key facts)
  → New compressed Memory (type=summary, compressedFrom=[])
  → Mark originals archived
  → Re-index (embedding + FTS5)
```

## Interfaces
- `compressMemories({type, since, clusterThreshold}) → compressionRunId`
- `getCompressionStatus(runId) → {inputCount, outputCount, ratio}`
- `expandMemory(memoryId) → Memory[]` (decompress — return originals)
- `rollbackCompression(runId)`

## Dependencies
- LLM summarizer (GLM-5.2).
- Embedding model + clustering (k-means / HDBSCAN).
- sqlite-vec.
- Background worker runtime.
- Audit log + provenance.

## Strengths
- Bounded storage + bounded retrieval latency.
- Old info preserved as high-level summary + retrievable originals on demand.
- Cluster-level summaries can surface patterns invisible at item level.
- Reversible (originals retained for audit).

## Weaknesses
- Lossy by design — summaries drop detail.
- Clustering errors produce incoherent summaries.
- Re-summarizing summaries compounds fidelity loss.
- Latency: compression runs are LLM-heavy.

## Failure Modes
- Over-aggressive compression loses key details (e.g., invoice numbers, dates).
- Wrong cluster grouping → mixed-topic summary.
- Compression run crashes → partial archive state.
- Embedding model swap → clusters invalid.

## Security Implications
- Compression must preserve provenance and access-control tags.
- Compressed memories can be a leakage vector if summaries leak PII across cluster boundaries — audit before write.
- Rollback path matters for incident response.

## Performance Implications
- Runs in background; never blocks requests.
- Batch size tuned to LLM token limits.
- Post-compression retrieval is faster (fewer items).

## Operational Implications
- Compression-run log + UI.
- Periodic audit: sample summaries, verify fidelity.
- Per-type policy (episodic: compress at 90d; semantic: never compress, only supersede).

## Alternatives
- **TTL deletion** (simple; loses long-term value).
- **Memory decay only** (no size reduction; just ranking).
- **External archival** (S3 + index; adds infra).

## Maturity & Production Readiness
- LLM-driven summarization: production-default (Mem0, Letta, ChatGPT memory all use variants).
- Cluster-based multi-item compression: emerging.

## Relevant Research / Papers
- Packer et al. (2023) — MemGPT archival summarization.
- Mem0 (2024) — compression + update path.
- Wu et al. (2024) — *GraphRAG* hierarchical summarization (community summaries).

## Official Documentation
- Mem0: https://docs.mem0.ai/
- Letta: https://docs.letta.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Worker**: Node script spawned from `instrumentation.ts`; nightly cron (node-cron).
- **Prisma model `CompressionRun`**: `id, type, startedAt, finishedAt, inputCount, outputCount, ratio Float, status, error Json?`.
- **Memory schema additions**: `archived Boolean`, `compressedFrom String[]` (Json), `isSummary Boolean`.
- **Cluster**: in-process k-means on sqlite-vec embeddings (small N, no scikit needed).
- **Compressor**: GLM-5.2 (z-ai-web-dev-sdk) → JSON `{summary, keyFacts[], confidence}`.
- **Re-index**: insert summary, embed, update FTS5.
- **Audit**: provenance preserved; originals soft-archived (not deleted) by default.
- **socket.io**: `compression.run.finished` for UI.
- **Zustand**: client-side "compression history" widget.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory). CAPABILITY_MAP §3 lists Memory Compression as REQUIRED. Pairs with Consolidation (CORE) and Memory Decay (I). Without it, the LTM store becomes unbounded over the user's lifetime.

## Recommended Usage
- Compress episodic memories older than 90d into cluster summaries.
- Never compress semantic facts — supersede instead (versioned).
- Compress procedural memory only when superseded by a newer version.
- Compress preferences only on explicit retract.
- Always preserve originals (soft-archive) for audit + rollback.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — REQUIRED. Background worker + GLM-5.2 cluster summarizer + soft-archive (not delete) + provenance preserved.

## Sources
- Packer et al. (2023). *MemGPT.* arXiv:2310.08560.
- Mem0 (2024). arXiv:2504.19413.
- Edge et al. (2024). *GraphRAG* — hierarchical community summaries. arXiv:2404.16130.
- MiMo AI `docs/CAPABILITY_MAP.md` §3.
- Inventory lines 431–439 (Memory Compression, P1).
