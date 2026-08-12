# Memory Retrieval (Hybrid Retrieval over Memories)

**Category:** Memory
**Status:** CORE
**Maturity:** Mature (vector + keyword) / Emerging (type-aware + graph + temporal)

## Definition
The process of selecting, from all typed memory stores (episodic, semantic, procedural, preference, etc.), the small subset relevant to the current query or context — typically using a hybrid of vector similarity, keyword (BM25), metadata filters, temporal recency, and type routing, followed by reranking.

## Problem Solved
Even with typed stores, raw vector similarity alone misses keyword-critical queries ("find the email about invoice #1234"), and BM25 alone misses paraphrases. Memory retrieval is the unified layer that makes recall precise, fast, and bounded so the Context Layer never over-injects.

## Why It Matters
MiMo AI's reasoning quality is bounded by recall quality: if relevant memory isn't surfaced, the model hallucinates or repeats past mistakes; if too much is surfaced, the context bloats and quality degrades. Memory retrieval is the lever that controls both.

## How It Works
1. **Query construction**: from the current user message + task + active context, build a retrieval query (text + structured filters: type, time range, actors, confidence threshold).
2. **Type routing**: decide which memory types to query (preferences → always; episodic → for "when" queries; procedural → for "how" queries; semantic → for "what is" queries).
3. **Parallel retrieval**: per type, run BM25 + vector search → merge by reciprocal-rank fusion (RRF) or weighted sum.
4. **Filtering**: apply temporal decay, confidence threshold, permission filters.
5. **Reranking**: cross-encoder or LLM reranker over top-N candidates.
6. **Budget**: cap final output at K items per type and total tokens.
7. **Return**: typed memory items with provenance for Context Layer injection.

## Architecture
```
Query (text + structured filters)
  → Type Router (which memory types?)
  → Per-type parallel:
      ├─ BM25 (sqlite FTS5)
      ├─ Vector (sqlite-vec)
      └─ Metadata filter (type, ts, actors, confidence)
  → Reciprocal Rank Fusion (RRF)
  → Temporal decay + confidence weighting
  → Reranker (cross-encoder or LLM)
  → Budget cap (K per type, total tokens)
  → Context Layer
```

## Interfaces
- `retrieveMemory({query, types?, filters?, topK, maxTokens}) → Memory[]`
- `retrieveByType(type, query, opts) → Memory[]`
- `scoreMemory(memory, query) → score` (for reranker)
- `explainRetrieval(query) → {plan, candidates, final}` (debug)

## Dependencies
- sqlite-vec (vector).
- SQLite FTS5 (BM25).
- Reranker model (cross-encoder or GLM-5.2 LLM-as-reranker).
- Typed memory stores.
- Embedding model (shared with stores).

## Strengths
- Hybrid retrieval beats either method alone (well-documented).
- Type routing keeps each query cheap and precise.
- Reranking + budget cap guards prompt quality.
- Single API for Context Layer → clean seam.

## Weaknesses
- RRF weights need tuning per type.
- Cross-encoder rerankers add latency (~50–150ms for top-50).
- Type router itself can misroute.
- Embedding drift breaks similarity.

## Failure Modes
- Top-K too small → miss key memory.
- Top-K too large → context bloat → quality drop.
- Stale memories ranked high (no decay).
- Wrong type routing (e.g., querying episodic for a "what is" question).

## Security Implications
- Permission filter must be applied BEFORE rerank (don't leak restricted memories even into candidate set).
- Retrieval log = audit trail (who queried what, when).
- Reranker runs on candidate text → ensure it doesn't exfiltrate via logs.

## Performance Implications
- Target: <200ms p95 for retrieval+rereank at personal scale.
- Embedding query cached for identical queries.
- BM25 + vector run in parallel via two SQLite queries.
- Reranker is the dominant latency cost — cap N at 50.

## Operational Implications
- Retrieval-quality eval suite (precision@K, recall@K on labeled queries).
- Per-type hit-rate telemetry.
- "Explain retrieval" debug view in UI.

## Alternatives
- **Vector-only** (simple; misses keyword queries).
- **BM25-only** (simple; misses paraphrases).
- **External retrieval service** (Pinecone/Weaviate — overkill at single-user scale).
- **LLM-as-retriever** (full-table scan via LLM — too expensive).

## Maturity & Production Readiness
- Hybrid retrieval (vector + BM25 + RRF + rerank): mature, production-default.
- Type-aware memory routing: emerging (research-grade).

## Relevant Research / Papers
- Lewis et al. (2020) — **RAG** (origin of hybrid retrieval for LLMs).
- Cormack et al. (2009) — **Reciprocal Rank Fusion**.
- Sun et al. (2023) — **GTE / multi-stage retrieval**.
- Anthropic (2024) — **Contextual Retrieval** blog (context + rerank gains).

## Official Documentation
- sqlite-vec: https://github.com/asg017/sqlite-vec
- SQLite FTS5: https://www.sqlite.org/fts5.html
- Cohere Rerank: https://docs.cohere.com/docs/reranking

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Storage**: single SQLite DB with `memory` table (typed), `memory_vec` sqlite-vec virtual table, `memory_fts` FTS5 virtual table — all joined by `memory.id`.
- **Retrieval API**: Next.js route `POST /api/memory/retrieve` consumed by Context Layer; runs two queries in parallel (`memory_fts MATCH ?` + `memory_vec MATCH ?`), fuses by RRF, applies decay/confidence, calls reranker.
- **Reranker options**:
  1. Cross-encoder via @xenova/transformers (local, no API cost, ~50ms on CPU for top-50).
  2. GLM-5.2 LLM-as-reranker (z-ai-web-dev-sdk) for hard queries — only when top-K ambiguity is high.
  3. Cohere Rerank API (external dependency — avoid for personal/offline).
  → **Default: local cross-encoder**; LLM-rerank as opt-in.
- **Type router**: a small classifier (rules + LLM fallback) decides types.
- **Budget**: configurable per-call `maxTokens` default ~1500 tokens.
- **Zustand**: client-side "memories used in this turn" view.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory) — the read-side counterpart of consolidation. CAPABILITY_MAP §3 lists Memory Retrieval (hybrid), Memory Ranking as CORE. Consumed by Layer 2 (Context) for every prompt assembly. Directly determines reasoning quality.

## Recommended Usage
- Always hybrid: BM25 (FTS5) + vector (sqlite-vec) + RRF.
- Type routing by query intent (rules first, LLM fallback).
- Rerank top-50 → return top-10 per type.
- Apply temporal decay (half-life 30d for episodic, none for semantic).
- Hard budget cap per retrieval call.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite + sqlite-vec + FTS5; RRF fusion; local cross-encoder reranker default, LLM-rerank fallback; type-routed; budget-capped.

## Sources
- Lewis et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS. arXiv:2005.11401.
- Cormack, Clarke & Büttcher (2009). *Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods.* SIGIR.
- Anthropic (2024). *Introducing Contextual Retrieval* (engineering blog).
- MiMo AI `docs/CAPABILITY_MAP.md` §3.
- Inventory lines 501–519 (Memory Retrieval, Hybrid Retrieval, both P0).
