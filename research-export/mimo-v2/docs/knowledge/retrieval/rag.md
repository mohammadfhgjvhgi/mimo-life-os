# Retrieval-Augmented Generation (RAG)

**Category:** Retrieval
**Status:** CORE
**Maturity:** Production-ready

## Definition
A retrieval-then-generate pattern where, before the LLM answers, a retriever selects relevant passages (chunks) from an external knowledge corpus and injects them into the prompt as grounded context. The LLM then generates an answer conditioned on both the query and the retrieved evidence, with citations.

## Problem Solved
LLMs (a) have a training cutoff, (b) don't know private/user-specific documents, (c) hallucinate, and (d) can't show provenance. RAG addresses all four: it injects fresh, private, verifiable evidence at inference time and grounds the answer in citable sources.

## Why It Matters
MiMo AI retrieves over the user's documents, notes, code, browsed pages, and the system's own memory. Without RAG, every answer would be untethered from the user's actual data. RAG is the read-path backbone of the Knowledge Layer and the most-researched, most-mature retrieval pattern.

## How It Works
1. **Ingestion (offline)**: documents → chunk (semantic-aware) → embed each chunk → store chunk + embedding + metadata in vector index + keyword index.
2. **Query (online)**: user query → embed → retrieve top-K chunks (hybrid: vector + BM25) → rerank → inject into prompt as numbered evidence block.
3. **Generation**: LLM is instructed to answer using only the evidence, cite by number, and say "I don't know" if evidence is insufficient.
4. **Citations**: returned answer carries source pointers (chunk ID, doc, page, URI).
5. **Feedback loop**: low-confidence answers trigger re-retrieval or escalation.

## Architecture
```
Documents/Web/Notes → Chunker → Embedder → Index (vector + BM25 + metadata)
                                                  │
User query → Embedder → Hybrid Retrieve → Rerank ─┘
                                                ↓
                            Evidence block → LLM (GLM-5.2) → Answer + citations
```

## Interfaces
- `ingest({doc, source, metadata}) → chunkIds[]`
- `query({text, filters?, topK, maxTokens}) → {answer, citations[], retrievedChunks[]}`
- `retrievalOnly({text, topK}) → Chunk[]` (for Context Layer direct use)
- `reindex(docId)` / `deleteDoc(docId)`

## Dependencies
- Embedding model (API or local).
- Vector store + BM25 (sqlite-vec + SQLite FTS5).
- Reranker.
- LLM (GLM-5.2).
- Chunker (semantic-aware: recursive, sentence-aware, or layout-aware).
- Document ingestion pipeline (PDF/HTML/markdown/code parsers).

## Strengths
- Grounds answers in citable evidence → reduces hallucination.
- Works with private/fresh data without retraining.
- Modular: each stage (chunk, embed, retrieve, rerank) is independently swappable.
- Mature ecosystem; well-understood failure modes.

## Weaknesses
- Retrieval misses → answer fails (silent).
- Bad chunking → relevant info split across chunks.
- Stale corpus → wrong answers.
- Cost: embedding + reranking + larger prompt tokens.
- Citation quality depends on chunk granularity.

## Failure Modes
- Top-K too small → miss the key passage.
- Top-K too large → context bloat → quality drop.
- Chunk boundary cuts a fact.
- Embedding drift after model swap.
- "I don't know" when answer exists in corpus but wasn't retrieved.

## Security Implications
- Retrieved chunks may contain secrets/PII — must apply permission filters BEFORE prompt injection.
- Prompt-injection risk: malicious documents in corpus can attempt to hijack the LLM via retrieved text — needs isolation + instruction hierarchy.
- Citation leakage: don't leak restricted source URIs in citations to unauthorized users.
- Audit log of retrievals.

## Performance Implications
- Online path: retrieval (~50–150ms) + rerank (~50–150ms) + LLM (varies).
- Offline path: ingestion is amortized but embedding cost scales with corpus size.
- Cache query embeddings for repeat queries.

## Operational Implications
- Retrieval-quality eval suite (precision@K, recall@K, answer faithfulness).
- Per-source ingestion health monitoring.
- Re-index on chunker/embedder model change.
- Citation UI in chat (clickable → source).

## Alternatives
- **Fine-tuning** (expensive; not fresh; loses citations).
- **Long-context-only** ("stuff everything in") — bounded by context window, expensive, no provenance.
- **GraphRAG** (complement; not alternative — used for global/multi-hop questions).
- **Agentic search** (RAG with iterative retrieval — heavier).

## Maturity & Production Readiness
- Production-default for any grounded LLM system. Mature libraries (LangChain, LlamaIndex, Haystack) and production deployments everywhere.

## Relevant Research / Papers
- Lewis et al. (2020). **RAG** — *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS. arXiv:2005.11401.
- Karpukhin et al. (2020). **DPR** — *Dense Passage Retrieval.* EMNLP.
- Gao et al. (2023). *Retrieval-Augmented Generation for Large Language Models: A Survey.* arXiv:2312.10997.
- Anthropic (2024). *Contextual Retrieval* (engineering blog).

## Official Documentation
- LangChain RAG: https://python.langchain.com/docs/tutorials/rag/
- LlamaIndex: https://docs.llamaindex.ai/
- sqlite-vec: https://github.com/asg017/sqlite-vec

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Storage**: SQLite single DB — `Chunk` table (Prisma), `chunk_vec` sqlite-vec virtual table, `chunk_fts` FTS5 virtual table — all keyed by `chunk.id`.
- **Chunker**: TypeScript module — recursive character splitter with sentence boundaries; layout-aware for PDFs (use `unpdf` or `pdf-parse`); code-aware (split on functions).
- **Embedder**: z-ai-web-dev-sdk embedding API (default); optional local fallback via `@xenova/transformers` (bge-small or gte-small) for offline.
- **Retriever**: Next.js route `POST /api/rag/query` — hybrid (BM25 + vec) + RRF + rerank (local cross-encoder) → top-K chunks → prompt.
- **Generator**: GLM-5.2 via z-ai-web-dev-sdk with system prompt enforcing "answer only from evidence, cite by [n], say 'I don't know' if insufficient."
- **Citations**: returned as JSON `[{n, chunkId, docTitle, uri, snippet}]` → UI renders clickable chips.
- **Streaming**: socket.io streams LLM tokens; citations sent as final event.
- **Zustand**: client-side chat state with citation drawer.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 4 (Knowledge) + Layer 2 (Context). CAPABILITY_MAP §4 lists RAG as CORE. The Knowledge Layer ingests docs/web/code; the Context Layer uses retrieval-only mode to assemble grounded context for the Reasoning Layer (5). RAG is the default grounding mechanism for any factual/user-data question.

## Recommended Usage
- Always hybrid (BM25 + vector + RRF + rerank).
- Cite by chunk ID; never fabricate citations.
- Chunk size 256–512 tokens with 10–20% overlap for prose; semantic boundaries for code/PDFs.
- Re-embed on chunker change; version embeddings (`embeddingModel` field on Chunk).
- Eval gate: retrieval precision@10 ≥ 0.7 on labeled queries.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite + sqlite-vec + FTS5 hybrid; GLM-5.2 generator; local cross-encoder reranker default; z-ai-web-dev-sdk embedder with local fallback.

## Sources
- Lewis, Perez, Piktus et al. (2020). *Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks.* NeurIPS. arXiv:2005.11401.
- Karpukhin et al. (2020). *Dense Passage Retrieval for Open-Domain Question Answering.* EMNLP. arXiv:2004.04906.
- Gao, Ma, Lin, Jiang (2023). *RAG Survey.* arXiv:2312.10997.
- Anthropic (2024). *Introducing Contextual Retrieval.* (engineering blog)
- MiMo AI `docs/CAPABILITY_MAP.md` §4.
- Inventory: lines 597–611 (BM25, Hybrid Search, P0); RAG concept covered by §4 capabilities.
