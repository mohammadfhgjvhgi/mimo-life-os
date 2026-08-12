# Vector Search

**Category:** Retrieval
**Status:** CORE
**Maturity:** Production-ready

## Definition
A retrieval method that finds items whose **embedding vectors are closest to the query embedding** under a similarity/distance metric (cosine, L2, inner-product), using an approximate-nearest-neighbor (ANN) or exact-kNN index. Returns top-K nearest items.

## Problem Solved
Lexical search (BM25) cannot match paraphrases, synonyms, or semantic intent. Vector search enables "find me docs about X" where the doc never contains the literal word X — the foundation of semantic retrieval.

## Why It Matters
MiMo AI retrieves over heterogeneous personal content where exact terms rarely match (the user asks "how did we fix the login bug" but the doc says "auth flow patch"). Vector search is the semantic half of hybrid retrieval and the substrate of all RAG systems.

## How It Works
1. **Offline**: every chunk/memory gets a dense embedding (e.g., 768-dim float vector) from an embedding model; stored in a vector index.
2. **Online**: the query is embedded with the same model; the index returns the K vectors closest to the query vector (cosine similarity is the default for normalized embeddings).
3. **ANN tradeoff**: most indexes (HNSW, IVF, PQ) trade exactness for speed; for personal-scale corpora (10k–1M vectors), exact kNN via sqlite-vec is fast enough and lossless.

## Architecture
```
Text → Embedder → Vector (768-d float)
                    ↓
              Vector Index (sqlite-vec / HNSW / IVF)
                    ↓
Query → Embedder → Vector → kNN search → top-K candidates
```

## Interfaces
- `indexVector({id, embedding, metadata}) → ok`
- `searchVector({queryEmbedding, topK, filters?}) → Hit[]`
- `deleteVector(id)` / `updateVector(id, embedding)`

## Dependencies
- Embedding model (API or local).
- Vector index: sqlite-vec (embedded, exact kNN) preferred at personal scale.
- (Alternative) external vector DB (Pinecone/Weaviate/Qdrant) — heavier, unnecessary at single-user scale.

## Strengths
- Semantic matching (paraphrase, synonym, intent).
- Cheap queries (~10–50ms at personal scale).
- Composable with BM25 (hybrid) and rerank.
- Mature ecosystem.

## Weaknesses
- Bad at exact-term / ID / number / code-identifier matching (BM25 wins there).
- Embedding drift after model swap → re-index required.
- Opaque: hard to debug "why didn't it match?"
- Long-chunk embeddings lose detail (averaging effect).

## Failure Modes
- Wrong embedding model for the domain (e.g., English-only model on Arabic corpus).
- Stale index (orphaned vectors after chunk deletion).
- Dimension mismatch (model swapped without re-index).
- Out-of-domain query embedding near nothing relevant.

## Security Implications
- Vectors encode text content — treat as content (PII/secret leakage possible via reconstruction attacks in theory).
- Permission filter applied alongside vector search.
- Audit log of vector queries.

## Performance Implications
- sqlite-vec exact kNN: ~10–50ms for 100k vectors; ~100–300ms for 1M.
- HNSW: faster but approximate; needs parameter tuning.
- Query embedding is the dominant cost — cache it.

## Operational Implications
- Embedding model versioning (`embeddingModel` field on each row).
- Re-index pipeline on model swap.
- Periodic consistency check (vector row count == chunk row count).
- Eval: recall@K against labeled queries.

## Alternatives
- **BM25 only** (no semantic).
- **External vector DB** (Pinecone/Weaviate/Qdrant/Milvus) — overkill at single-user scale; adds infra + latency + cost.
- **Learned sparse (SPLADE)** — middle ground, less common.

## Maturity & Production Readiness
- Production-default. sqlite-vec (released 2024) makes embedded vector search trivial for personal/single-user scale.

## Relevant Research / Papers
- Karpukhin et al. (2020). **DPR** — *Dense Passage Retrieval.* EMNLP.
- Johnson, Douze & Jégou (2019). **FAISS** — *Billion-scale similarity search with GPUs.* IEEE Trans. Big Data.
- Malkov & Yashunin (2018). **HNSW** — *Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs.* arXiv:1603.09320.
- Reimers & Gurevych (2019). **Sentence-BERT** — embeddings for semantic search. EMNLP.

## Official Documentation
- sqlite-vec: https://github.com/asg017/sqlite-vec
- FAISS: https://faiss.ai/
- HNSWLib: https://github.com/nmslib/hnswlib

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Index**: `sqlite-vec` virtual table `chunk_vec USING vec0(embedding float[768])` — exact kNN, no tuning needed.
- **Embedder**: z-ai-web-dev-sdk embedding API (default); pin the model and dim (e.g., 1024 or 768); record `embeddingModel` on each row.
- **Local fallback**: `@xenova/transformers` with `bge-small-en-v1.5` or `gte-small` (384-dim, fast on CPU) for offline.
- **Query path**: `SELECT id, distance FROM chunk_vec WHERE embedding MATCH ? AND k = 50 ORDER BY distance` via `better-sqlite3` prepared statement.
- **Normalization**: store normalized vectors (cosine == dot product).
- **Re-index worker**: on model swap, batch-re-embed all chunks in background; swap atomically.
- **Permission filter**: post-filter via `WHERE id IN (SELECT … FROM chunk WHERE permission=...)` or pre-filter by rowid list.
- **Zustand**: client-side cache of recent vector hits for UI.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 4 (Knowledge) + Layer 3 (Memory). CAPABILITY_MAP §3 lists Vector Search as CORE (memory); §4 lists Vector Search as CORE (knowledge). The semantic half of every retrieval call; paired with BM25 in Hybrid Search and reranked for final quality.

## Recommended Usage
- sqlite-vec exact kNN for personal scale (<1M vectors).
- Pin one embedding model + dimension; version per row.
- Normalize embeddings (store L2-normalized → cosine == dot product).
- Pair with BM25 (hybrid) — never vector-only.
- Re-index pipeline on model swap; A/B before cutover.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. sqlite-vec exact kNN; z-ai-web-dev-sdk embedder default + local fallback; normalized vectors; never vector-only (always hybrid with BM25).

## Sources
- Karpukhin et al. (2020). *Dense Passage Retrieval.* arXiv:2004.04906.
- Malkov & Yashunin (2018). *HNSW.* arXiv:1603.09320.
- Johnson et al. (2019). *FAISS.* IEEE Trans. Big Data.
- Reimers & Gurevych (2019). *Sentence-BERT.* EMNLP. arXiv:1908.10084.
- sqlite-vec docs (https://github.com/asg017/sqlite-vec).
- MiMo AI `docs/CAPABILITY_MAP.md` §3, §4.
- Inventory lines 553–591 (Vector Database, Embeddings, Vector Search, P0).
