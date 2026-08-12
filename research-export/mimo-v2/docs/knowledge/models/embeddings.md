# Embeddings

**Category:** Models
**Status:** CORE
**Maturity:** Production-ready (API); Mature (local)

## Definition
Embeddings are numeric vector representations of text (or images) produced by an embedding model. Each input is mapped to a fixed-dimension float vector such that semantically similar inputs land close together in vector space. MiMo AI uses them to power semantic search over memories, knowledge chunks, episodic logs, and the personal knowledge graph — the vector half of **hybrid search** (BM25 keyword + vector).

## Problem Solved
- Keyword search misses semantically equivalent but lexically different content ("buy a car" vs. "purchase an automobile").
- Memory and knowledge bases grow too large to scan linearly per turn.
- Need a similarity signal that ranks retrieved items by meaning, not just token overlap.

## Why It Matters
Embeddings are the substrate of the Context Layer's retrieval and the Memory Layer's recall. Without them, MiMo AI degrades to keyword search and the model's own context window — which, per the GLM-5.2 critical note, is not a substitute for managed retrieval.

## How It Works
1. **Embedding model** takes a string (or image) and returns a vector (e.g., 768-d, 1024-d, 1536-d, 3072-d depending on the model).
2. **Storage:** vectors are stored alongside their source text in a vector index (see `vector_database.md`).
3. **Query:** at retrieval time, the query string is embedded using the *same* model; the index returns the k nearest neighbors by cosine similarity.
4. **Hybrid search:** vector scores are combined with BM25 keyword scores (and optional reranker) to produce the final ranked list fed to the Context Layer.

### API vs Local
- **API embeddings** (Z.ai via `z-ai-web-dev-sdk`, OpenAI, Voyage, Cohere, Google): high quality, no local compute, costs per token, requires network.
- **Local embeddings** (transformers.js / ONNX runtime in Node, or a local Ollama model): no per-call cost, offline, privacy-friendly; lower state-of-the-art quality, higher local CPU/RAM cost, larger binary footprint.

## Architecture
```
Text chunk ──▶ Embedding Provider (API or Local) ──▶ Vector ──▶ Vector Store
                                                                ▲
Query text  ──▶ Embedding Provider (same model!)  ──▶ Vector ───┘ (k-NN search)
                                                                │
                                                                ▼
                                                          Ranked chunks ──▶ Reranker ──▶ Context Layer
```
- **Critical:** the *same* embedding model must be used for both indexing and querying — mixing models produces meaningless similarity scores.
- The Model Gateway's `embed()` operation is the single entry point (see `model_gateway.md`).

## Interfaces
```ts
interface EmbedRequest {
  texts: string[];
  model?: string;                // 'zai:embedding-3' | 'openai:text-embedding-3-large' | 'local:bge-small'
  prefer?: 'api' | 'local';      // hint to router
  dimensions?: number;           // for models that support truncation (e.g., OpenAI v3)
}
interface EmbedResponse {
  vectors: Float32Array[];       // one per input text, all same dimension
  model: string;                 // resolved model id
  usage: { inputTokens: number; costUsd: number };
}
// Gateway exposes:
gateway.embed(texts: string[], opts?: { prefer?: 'api'|'local' }): Promise<EmbedResponse>;
```

## Dependencies
- Model Gateway (the `embed()` operation).
- Vector store (sqlite-vec / better-sqlite3-vector) for persistence + k-NN.
- Chunker (Knowledge Layer) that splits documents into embeddable units.
- Optional reranker (cross-encoder) for hybrid search.
- Local embeddings runtime: `@xenova/transformers` (transformers.js) or `onnxruntime-node`, plus model weights (~50–500MB depending on model).

## Strengths
- **Semantic recall** far beyond keyword search.
- **Cheap at query time** if vectors are pre-computed (one query embedding + index lookup).
- **Composable** with BM25 (hybrid) and rerankers.
- **API path is trivial to use** — no model weights, no GPU.
- **Local path is free per call** — good for batch ingestion of large corpora.

## Weaknesses
- **Model-mixing hazard:** changing embedding model requires re-embedding the entire corpus (expensive).
- **Dimension lock-in:** the vector store's dimension is fixed at creation; changing models usually means changing dimensions → full re-index.
- **Local quality gap:** the best local models (BGE, GTE, E5 small) trail the best API models by a measurable margin on retrieval benchmarks; for a single-user personal AI this is often acceptable, but it's a real trade.
- **Local binary size:** 50–500MB weights + ONNX runtime is non-trivial for a personal device.
- **Multilingual:** some models are English-only; for a mixed Arabic/English personal AI, choose a multilingual model (e.g., `multilingual-e5`, `bge-m3`).
- **No understanding of negation/quantifiers** — embeddings conflate "I like dogs" and "I don't like dogs" somewhat; BM25 + reranker helps.

## Failure Modes
- **Stale embeddings:** document edited but vector not re-computed → search returns stale content. Mitigation: re-embed on edit, with a content-hash check.
- **Chunk-boundary information loss:** a fact split across two chunks may not match either. Mitigation: overlap chunks; consider contextual retrieval (Anthropic, 2024).
- **Mixed-model index:** accidentally querying a `1536-d` index with a `768-d` query vector → crash or garbage. Mitigation: store `model` + `dimensions` in the index metadata and validate on every query.
- **Local model OOM** on large batches → mitigate with batching + streaming.
- **API rate limits during bulk ingestion** → mitigate with backoff + local fallback for bulk work.

## Security Implications
- **Data egress:** API embeddings send the raw text to the vendor. For sensitive personal content, route to local embeddings (the `prefer: 'local'` hint) or to a vetted provider only.
- **PII in embeddings:** embeddings themselves cannot be trivially inverted to text, but the stored source text alongside them is sensitive — encrypt at rest (SQLite extensions or filesystem-level encryption).
- **Model supply chain:** local model weights are downloaded from HuggingFace; pin a specific revision hash and verify before loading.

## Performance Implications
- **Ingestion cost:** embedding a large corpus (10k+ chunks) via API costs real money and time; local embeddings trade money for CPU.
- **Query latency:** typically 5–50ms for a query embedding + sqlite-vec k-NN at personal scale (<1M vectors).
- **Storage:** 768-d float32 = 3KB/vector; 1M vectors ≈ 3GB. Use float16 or quantization if storage matters.
- **Batching:** always batch embed requests; per-call overhead dominates for small batches.

## Operational Implications
- Need an **embedding model pin** in config: `EMBEDDING_MODEL=zai:embedding-3` (or local equivalent).
- Need a **re-embedding migration path** when the pinned model changes: tag every vector with `model` + `contentHash`; on model change, re-embed in the background, swap atomically.
- Need a **bulk-embed job** (Task Queue mini-service) for initial corpus ingestion.
- Need a **local-embeddings health check** — load the ONNX model at startup, fail loud if missing.

## Alternatives
- **BM25 only:** cheaper, faster, but loses semantic recall. Insufficient for MiMo AI alone; kept as the keyword half of hybrid search.
- **Sparse embeddings (SPLADE):** learned sparse vectors that combine some semantic + keyword benefits; more complex to operate. *Defer.*
- **ColBERT / late-interaction:** higher quality, more storage (per-token vectors). *Defer — overkill for personal scale.*
- **Reranker-only (no embeddings):** a cross-encoder over BM25 candidates can match vector quality on small corpora, but doesn't scale to large knowledge bases. *Use as a complement, not a replacement.*

## Maturity & Production Readiness
- API embeddings: production-ready, mature.
- Local embeddings (transformers.js / ONNX): mature for CPU inference; suitable for personal scale.
- sqlite-vec / better-sqlite3-vector: production-ready for personal scale (see `vector_database.md`).

## Relevant Research / Papers
- Karpukhin et al., "Dense Passage Retrieval for Open-Domain QA," 2020 (arXiv:2004.04906).
- Thakur et al., "BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation," 2021 (arXiv:2104.08663).
- Anthropic, "Contextual Retrieval," 2024 (blog post — contextual chunk prefixes).
- BGE / GTE / E5 model cards on HuggingFace.

## Official Documentation
- `z-ai-web-dev-sdk` embedding API (in-repo).
- OpenAI Embeddings guide: `https://platform.openai.com/docs/guides/embeddings`.
- transformers.js: `https://huggingface.co/docs/transformers.js`.
- sqlite-vec: `https://sqlite-vec.io/`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** `gateway.embed()` is called from server route handlers, Knowledge-ingestion mini-services, and Memory workers. Never from the client.
- **Default: API embeddings via Z.ai** (`z-ai-web-dev-sdk`), with **local embeddings via transformers.js** as a fallback for offline/bulk/PII work.
- **Adapter layout:**
  - `src/server/model/providers/zai-embed.ts` — Z.ai embedding adapter.
  - `src/server/model/providers/local-embed.ts` — transformers.js adapter (lazy-loads ONNX weights on first call).
- **Storage:** sqlite-vec virtual table `vec_chunks(rowid INTEGER, embedding FLOAT[N])` alongside the relational `Chunk` table (Prisma). Hybrid search implemented as: BM25 over `Chunk.content` FTS5 + vector k-NN over `vec_chunks`, scores fused (reciprocal rank fusion).
- **Reranker:** optional small cross-encoder (`bge-reranker-base`) loaded locally; applied to top-50 hybrid results to produce final top-10.
- **Bulk job:** a Task Queue job `embed-corpus` that iterates chunks lacking a vector, batches by 64, writes back, respects `budget.maxCostUsd`.
- **Caching:** identical text → identical vector; cache by `sha256(text)+model` in an LRU to avoid re-embedding unchanged chunks.
- **Migration:** when `EMBEDDING_MODEL` changes, a migration job re-embeds all chunks tagged with the old model; the index is rebuilt atomically (new table → swap → drop old).

## Relevance To Our Project (MiMo AI layered runtime)
Embeddings feed Layer 4 (Knowledge) and Layer 3 (Memory). They are what makes "retrieve on demand" possible — the alternative is dumping everything into the model's context, which (per the GLM-5.2 critical note) is not viable regardless of context length.

## Recommended Usage
- **Default:** API embeddings (Z.ai) for query-time (low volume, low latency) + local embeddings for bulk ingestion (high volume, free).
- **Pin one model** in config; never mix models in the same index.
- **Always hybrid:** combine vector + BM25; pure-vector retrieval underperforms hybrid on most workloads.
- **Always rerank** the top-N (N≈20–50) with a cross-encoder when retrieval quality matters (planning, verification).
- **Always tag vectors** with model + content-hash for safe migration.

## Decision
**ADOPT** — embeddings are mandatory infrastructure. Specific choice: **Z.ai API embeddings as default** with **local transformers.js embeddings** as the offline/bulk fallback. Pin a multilingual model (Arabic+English) given the primary user's mixed-language content.

## Sources
- Technology inventory category 25 (Storage) #403 Vector Database (P0).
- Technology inventory category 23 (Model Routing) — capability routing applies to embedding choice too.
- `docs/PROJECT_UNDERSTANDING.md` §5 (Knowledge subsystems: chunking, embedding, indexing, vector search, hybrid search, reranking).
- `docs/CAPABILITY_MAP.md` §4 (Knowledge: Embedding generation — C).
- Karpukhin et al., DPR, 2020 (arXiv:2004.04906).
- Thakur et al., BEIR, 2021 (arXiv:2104.08663).
- Anthropic, "Contextual Retrieval," 2024 — `https://www.anthropic.com/news/contextual-retrieval`.
- transformers.js — `https://huggingface.co/docs/transformers.js`.
- sqlite-vec — `https://sqlite-vec.io/`.
- *Inferred:* specific adapter layout, hybrid fusion strategy, migration plan — designed for this stack.
