# Reranking

**Category:** Retrieval
**Status:** CORE
**Maturity:** Production-ready

## Definition
A second-stage retrieval step that takes the top-N candidates from first-stage retrieval (BM25/vector/hybrid) and **re-scores them with a more expensive but more accurate model** — typically a cross-encoder or an LLM — to produce a final, better-ordered top-K list.

## Problem Solved
First-stage retrievers (bi-encoders, BM25) are fast but coarse: they compute query-document similarity from independent embeddings, missing fine-grained query-doc interaction. Rerankers compute attention between query and document tokens → dramatically better precision@K, especially when N is small.

## Why It Matters
MiMo AI's reasoning quality is bounded by what reaches the prompt. A 50→10 rerank step typically halves retrieval failure rate. For a personal assistant that must cite the right invoice or recall the right episode, reranking is the difference between "right answer" and "close-but-wrong answer."

## How It Works
1. **Input**: top-N (e.g., 50) candidates from hybrid retrieval.
2. **Score**: for each candidate, the reranker computes a relevance score given (query, candidate_text).
   - Cross-encoder: a transformer takes `[CLS] query [SEP] doc [SEP]` → relevance logit. ~1–5ms per candidate on CPU.
   - LLM-as-reranker: prompt the LLM "rate relevance 0–10 for each (query, doc)" → parse.
3. **Sort** by score.
4. **Return** top-K (e.g., 10).

## Architecture
```
Top-N candidates (hybrid retrieval)
   ↓
   Reranker (cross-encoder OR LLM-as-reranker)
   ↓
   Re-scored list
   ↓
   Top-K to Context Layer
```

## Interfaces
- `rerank({query, candidates, topK, model?}) → RerankedCandidate[]`
- `scorePair(query, doc) → Float`

## Dependencies
- Cross-encoder model (e.g., `bge-reranker-base` via @xenova/transformers) OR LLM (GLM-5.2 via z-ai-web-dev-sdk) OR external API (Cohere Rerank).
- First-stage retriever (provides candidates).

## Strengths
- Large precision boost (typically +5–15% nDCG@10 over hybrid-only).
- Cheap relative to its benefit (50 candidates × ~2ms = 100ms).
- Pluggable: swap cross-encoder ↔ LLM-reranker without touching retriever.
- LLM-reranker can do instruction-style reranking ("rank by recency AND relevance").

## Weaknesses
- Latency: dominant cost in retrieval pipeline (50–200ms).
- Cross-encoder context limit (usually 512 tokens) — long chunks get truncated.
- LLM-reranker cost (tokens × N).
- Adds a model dependency and an eval surface.

## Failure Modes
- Truncation of long candidates → wrong scores.
- LLM-reranker output unparseable (use structured JSON output).
- Reranker trained on different domain than corpus → scores noisy.
- Reranker drift after model swap.

## Security Implications
- Reranker sees candidate text → apply permission filter BEFORE rerank.
- LLM-reranker prompt must not leak other candidates' content into one another's score (run per-pair, not batched-with-all-candidates-in-one-prompt unless sanitized).
- Audit log: rerank scoring is part of retrieval audit trail.

## Performance Implications
- 50→10 rerank: ~100ms on CPU with a small cross-encoder; ~200–400ms with LLM-reranker.
- Batch candidates to amortize model load.
- Cache: identical (query, doc) pairs cached.

## Operational Implications
- Eval: nDCG@10, precision@5 on labeled queries.
- Model version pinning + drift alert.
- Optional: A/B cross-encoder vs LLM-reranker.

## Alternatives
- **No reranker** (rely on first-stage only — lower precision).
- **Cohere Rerank API** (excellent quality but external dependency + cost).
- **Learned bi-encoder fine-tune** (improves first stage; doesn't replace reranker).

## Maturity & Production Readiness
- Cross-encoder rerankers: production-default (Cohere, BGE, ms-marco-MiniLM).
- LLM-as-reranker: production-ready for harder queries (used by Anthropic, OpenAI retrieval pipelines).

## Relevant Research / Papers
- Nogueira & Cho (2019). **Passage Re-ranking with BERT.** arXiv:1901.04085.
- Xiao et al. (2023). **BGE Reranker** (C-MTEC benchmark winner).
- Anthropic (2024). *Contextual Retrieval* — rerank gives 49% failure-rate reduction (engineering blog).

## Official Documentation
- Cohere Rerank: https://docs.cohere.com/docs/reranking
- BGE Reranker: https://huggingface.co/BAAI/bge-reranker-base
- @xenova/transformers: https://huggingface.co/docs/transformers.js

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Default reranker**: `bge-reranker-base` via `@xenova/transformers` (local, no API cost, ~2ms/candidate on CPU). Load once at process start (Next.js `instrumentation.ts`).
- **LLM-reranker fallback**: GLM-5.2 via z-ai-web-dev-sdk with JSON-output prompt — used for hard queries (ambiguity high) or instruction-style reranking. Cap N at 20 for LLM-rerank (cost control).
- **API**: Next.js route `POST /api/retrieval/rerank {query, candidates[], topK, mode}` → reranked list.
- **Permission filter** applied BEFORE rerank.
- **Truncation policy**: if candidate > 512 tokens, use first 256 + last 256.
- **Cache**: in-memory LRU keyed by hash(query)+hash(candidate).
- **socket.io**: optional rerank-trace event for debug UI.
- **Zustand**: client-side rerank score chips in citation drawer.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 4 (Knowledge) + Layer 3 (Memory). CAPABILITY_MAP §4 lists Reranking as CORE. Directly consumed by Hybrid Search and Memory Retrieval. ~50% retrieval-failure reduction at modest latency cost — mandatory for a quality personal assistant.

## Recommended Usage
- Always rerank top-50 → top-10.
- Default: local cross-encoder (bge-reranker-base).
- LLM-rerank for high-ambiguity queries only (cost control).
- Apply permission filter BEFORE rerank.
- Cache aggressively.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. Local bge-reranker-base default + GLM-5.2 LLM-rerank fallback; permission-filtered pre-rerank; cached.

## Sources
- Nogueira & Cho (2019). *Passage Re-ranking with BERT.* arXiv:1901.04085.
- Xiao et al. (2023). *C-Pack: Packaged Resources To Advance General Chinese Embedding.* (BGE Reranker) arXiv:2309.07597.
- Anthropic (2024). *Introducing Contextual Retrieval* (rerank reduces retrieval failures by 49%).
- MiMo AI `docs/CAPABILITY_MAP.md` §4.
- Inventory lines 613–621 (Reranking, P0).
