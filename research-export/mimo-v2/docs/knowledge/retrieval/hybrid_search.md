# Hybrid Search

**Category:** Retrieval
**Status:** CORE
**Maturity:** Production-ready

## Definition
A retrieval strategy that combines **lexical search** (BM25 / FTS5 keyword matching) and **dense vector search** (embedding similarity), fusing their ranked results — typically via Reciprocal Rank Fusion (RRF) or a learned weighted sum — to get the strengths of both.

## Problem Solved
Vector search is great at semantic similarity but weak on rare terms, IDs, code identifiers, numbers, and exact phrases. BM25 is great at exact-term matching but weak at paraphrase and synonyms. Hybrid search combines them so neither failure mode dominates.

## Why It Matters
MiMo AI retrieves over heterogeneous content — prose, code, file names, invoices, dates, IDs, API docs. A query like "find invoice #INV-2024-0815" needs BM25; a query like "how did we handle the auth bug?" needs vectors. Hybrid is the only mode that serves both.

## How It Works
1. Run BM25 (SQLite FTS5) and vector search (sqlite-vec) in parallel for the same query, each returning top-N.
2. **Fuse**: Reciprocal Rank Fusion — `score(d) = Σ 1/(k + rank_i(d))` across both result lists (k≈60 default). Or weighted sum of normalized scores.
3. (Optional) apply metadata filters (type, time, source) before fusion.
4. (Optional) rerank top-K with a cross-encoder or LLM.
5. Return top-K.

## Architecture
```
Query → [Embedder] → Vector search (sqlite-vec)  ──┐
       → [Tokenizer] → BM25 search (FTS5)         ──┤
                                                     ↓
                                     Reciprocal Rank Fusion (RRF)
                                                     ↓
                                  Metadata filter + temporal decay
                                                     ↓
                                          (Optional reranker)
                                                     ↓
                                              Top-K results
```

## Interfaces
- `hybridSearch({queryText, filters?, topK, alpha?}) → Result[]` (alpha = vector weight; default 0.5)
- `explainHybrid(queryText) → {bm25Hits, vecHits, fused}`

## Dependencies
- SQLite FTS5 (BM25).
- sqlite-vec (vector).
- Embedding model (for query embedding).
- (Optional) reranker.

## Strengths
- Strictly better than either method alone on heterogeneous corpora.
- Cheap to run (two parallel SQLite queries).
- RRF needs no weight tuning between incompatible score scales.
- Production-default in mature RAG systems.

## Weaknesses
- Two indexes to maintain (storage + re-index on changes).
- RRF ignores score magnitude — high-confidence BM25 hit and low-confidence one are treated equally if ranks match.
- Embedding drift breaks vector half.

## Failure Modes
- One branch returns nothing (e.g., rare token absent in FTS index) → effectively single-method.
- Index desync (vector has stale rows, FTS doesn't).
- Tokenizer mismatch (FTS5 default tokenizer mishandles code/CJK).

## Security Implications
- Permission filter must be applied before fusion (don't fuse restricted items into the candidate set even if they'd be filtered later).
- Query log + retrieval log = audit trail.

## Performance Implications
- Two SQLite queries in parallel — sub-100ms at personal scale.
- Query embedding cached for repeats.
- RRF is O(N) — negligible.

## Operational Implications
- Telemetry: per-branch hit rate (how often BM25 vs vector contributes the top result).
- Re-index on tokenizer/embedder change (version the indexes).
- FTS5 tokenizer choice matters: `unicode61` default; consider `trigram` for code/CJK.

## Alternatives
- **Vector-only** (simpler; misses keyword-critical queries).
- **BM25-only** (simpler; misses paraphrase).
- **Learned sparse** (SPLADE) — better than BM25, but adds model dependency.
- **External hybrid service** (Vespa/Weaviate) — overkill at single-user scale.

## Maturity & Production Readiness
- Production-default. Used by virtually every serious RAG system (Cohere, Pinecone Hybrid, Weaviate, Elasticsearch).

## Relevant Research / Papers
- Cormack, Clarke & Büttcher (2009). **Reciprocal Rank Fusion.** SIGIR.
- Luan et al. (2021). *Sparse and Dense Hybrid Retrieval.*
- Chen et al. (2023). *When do you need hybrid search?* (empirical study).

## Official Documentation
- SQLite FTS5: https://www.sqlite.org/fts5.html
- sqlite-vec: https://github.com/asg017/sqlite-vec
- Cohere Hybrid Search: https://docs.cohere.com/docs/hybrid-search

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Storage**: same `Chunk` (or `Memory`) table; FTS5 virtual table `chunk_fts USING fts5(text, content='chunk', content_rowid='id')`; sqlite-vec virtual table `chunk_vec USING vec0(embedding float[768])`.
- **Query path**: Next.js server route runs two `better-sqlite3` prepared statements (`SELECT … FROM chunk_fts WHERE chunk_fts MATCH ? ORDER BY bm25(chunk_fts) LIMIT 50` + `SELECT … FROM chunk_vec WHERE embedding MATCH ? ORDER BY distance LIMIT 50`), fuses with RRF (k=60).
- **FTS5 tokenizer**: `unicode61 remove_diacritics 2` for prose; consider `trigram` for code-heavy corpus.
- **Embedding**: z-ai-web-dev-sdk (default 768 or 1024 dim — pin one and version it).
- **Reranker**: optional local cross-encoder over top-50.
- **Zustand**: client cache of recent searches.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 4 (Knowledge) + Layer 3 (Memory). CAPABILITY_MAP §3 lists Hybrid Retrieval as CORE; §4 lists Vector Search, BM25, Hybrid Search all as CORE. This is the workhorse retriever for both RAG and Memory Retrieval.

## Recommended Usage
- Always-on default for both RAG and memory retrieval.
- RRF k=60 (standard).
- Optional alpha tuning per query type (e.g., alpha=0.3 for code/ID queries favoring BM25).
- Apply metadata + permission filters BEFORE fusion.
- Pair with reranker for top-K quality.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite FTS5 + sqlite-vec + RRF fusion; default alpha=0.5; permission-filtered pre-fusion; optional reranker.

## Sources
- Cormack, Clarke & Büttcher (2009). *Reciprocal Rank Fusion outperforms Condorcet and individual Rank Learning Methods.* SIGIR.
- Lewis et al. (2020). *RAG.* arXiv:2005.11401.
- SQLite FTS5 docs (https://www.sqlite.org/fts5.html).
- MiMo AI `docs/CAPABILITY_MAP.md` §3, §4.
- Inventory lines 597–611 (BM25, Hybrid Search, P0).
