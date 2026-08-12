# GraphRAG

**Category:** Retrieval
**Status:** REQUIRED
**Maturity:** Emerging (research-grade, 2024)

## Definition
A RAG variant where, instead of retrieving flat text chunks, the system first **extracts a Knowledge Graph (entities + relationships) from the corpus**, then retrieves by combining **vector search over entity/community summaries** with **graph traversal** — enabling both local entity-centric QA and global multi-hop reasoning.

## Problem Solved
Standard RAG fails on (a) global questions ("what are the main themes in this corpus?") that require synthesizing across many chunks, and (b) multi-hop questions ("who works on the same project as the person who reported the bug?") that require traversing relationships. GraphRAG builds a graph at ingestion time and queries over its communities/entities at retrieval time.

## Why It Matters
MiMo AI needs both — local ("what does my note about the auth bug say?") AND global ("what patterns recur across my last 6 months of meetings?") recall. GraphRAG is the only mature pattern that handles the global/multi-hop case without stuffing the whole corpus into context.

## How It Works
1. **Ingestion**: chunk documents → LLM extracts entities + relationships (triples) per chunk → merge into a global graph → detect communities (Leiden / Louvain) → LLM generates a summary per community + per entity.
2. **Local retrieval**: given an entity-centric query, find the seed entity → traverse neighbors → return subgraph + associated chunk evidence.
3. **Global retrieval**: given a global query, retrieve relevant community summaries → LLM synthesizes a global answer from the summaries (not from raw chunks).
4. **Hybrid**: combine community-summary retrieval with chunk-level vector search + rerank.

## Architecture
```
Chunks → Entity/Relation Extractor (LLM) → Triples → Graph
   → Community Detection (Leiden) → Community Summaries (LLM)
   → Entity Summaries (LLM)
   → Index (entities, communities, summaries embedded)
Query:
   Local:  entity seed → neighbor traversal → subgraph + chunks
   Global: query → community-summary retrieval → LLM synthesis
```

## Interfaces
- `buildGraph({corpusId}) → graphBuildId` (long-running)
- `queryLocal({entity, hops, topK}) → Subgraph`
- `queryGlobal({queryText, topK}) → communityAnswers[]`
- `getCommunity(commId) → {summary, entities, sourceChunks}`
- `recomputeCommunities()` (after major graph updates)

## Dependencies
- LLM extractor (GLM-5.2) — expensive at build time.
- Graph store (SQLite-based or dedicated).
- Community detection algorithm (Leiden / Louvain).
- Embedding model (for entity/community summary vectors).
- Standard RAG stack (vector + BM25 + rerank) for hybrid mode.

## Strengths
- Answers global/synthesis questions standard RAG can't.
- Multi-hop reasoning via graph traversal.
- Community summaries compress corpus → cheap global queries.
- Entity-level precision for "tell me about X" queries.

## Weaknesses
- **Expensive build**: LLM calls per chunk for extraction + per community for summaries.
- Graph drift: corpus changes require incremental graph updates (hard).
- Community detection param tuning (resolution, min size).
- Quality of extraction dominates quality of everything downstream.
- Storage + complexity overhead vs flat RAG.

## Failure Modes
- Extractor hallucinates entities → polluted graph.
- Community boundaries incoherent → bad global answers.
- Stale graph after corpus changes.
- Build crashes mid-corpus → partial graph.
- Wrong retrieval mode (local vs global) for the query.

## Security Implications
- Graph can expose implicit relationships (e.g., "user X and user Y both worked on project Z") that flat chunks don't make obvious — extra PII surface.
- Permission model must extend to graph traversal (don't traverse into restricted entities).
- Build-time provenance: every entity/relation must trace to source chunks.

## Performance Implications
- Build: hours for large corpora (LLM-bound).
- Local query: <200ms (graph traversal + small rerank).
- Global query: ~500ms–2s (depends on # community summaries to synthesize).
- Storage: graph + summaries + embeddings — 2–3× flat RAG.

## Operational Implications
- Graph build pipeline + UI to inspect entities/communities.
- Incremental update strategy (re-extract changed chunks only).
- Periodic full rebuild (drift correction).
- Eval: global-QA eval suite (questions flat RAG fails on).

## Alternatives
- **Standard RAG** (no global/multi-hop).
- **Tree-structured summarization** (map-reduce; no graph).
- **External graph DB** (Neo4j — heavy for single-user).
- **Self-RAG / agentic search** (heavier online cost).

## Maturity & Production Readiness
- Microsoft GraphRAG (2024): production-quality reference implementation; emerging in industry adoption.
- Build cost + incremental-update complexity are the main adoption blockers.

## Relevant Research / Papers
- Edge et al. (2024). **GraphRAG: From Local to Global — A GraphRAG Approach to Query-Focused Summarization.** arXiv:2404.16130.
- Microsoft GraphRAG (2024) — open-source implementation.
- Zep (2024) — temporal KG memory (graph-based RAG variant).

## Official Documentation
- Microsoft GraphRAG: https://microsoft.github.io/graphrag/
- Neo4j GraphRAG (alternative stack): https://neo4j.com/labs/genai-ecosystem/graphrag/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Graph store in SQLite**: `Entity(id, name, type, description, embeddingId)`, `Relation(id, srcEntityId, dstEntityId, type, description, sourceChunkIds Json)`, `Community(id, summary, entityIds Json, parentCommunityId?, level)`.
- **Community detection**: run Leiden via a small WASM/JS lib (e.g., `graphology` + `graphology-communities-louvain`) in the worker process; persist results.
- **Extractor**: GLM-5.2 via z-ai-web-dev-sdk, JSON output `{entities[], relations[]}` per chunk; merge into graph (entity resolution by name+type fuzzy match).
- **Build worker**: Node script spawned from `instrumentation.ts`; long-running; progress streamed via socket.io to UI.
- **Query API**: `POST /api/graphrag/local {entity, hops}` and `POST /api/graphrag/global {query}`; both call GLM-5.2 for final synthesis.
- **Hybrid**: standard RAG retrieved chunks + GraphRAG subgraph → merged → reranked → LLM.
- **Incremental update**: re-extract only chunks whose hash changed; merge into existing graph; periodic full rebuild for drift.
- **Zustand**: client-side "graph explorer" view (entities/communities sidebar).
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 4 (Knowledge). CAPABILITY_MAP §4 lists GraphRAG as REQUIRED. Complements standard RAG (CORE) for global/synthesis questions over the user's docs/notes/code. Pairs with Personal KG (R) for user-specific entities.

## Recommended Usage
- Use GraphRAG for global/synthesis queries; standard RAG for local factual queries.
- Build incrementally (per-ingested-doc); periodic full rebuild.
- Cap community count + level depth to control build cost.
- Entity-resolution quality is the single biggest lever — invest in the extractor prompt.
- A/B GraphRAG vs standard RAG on a global-QA eval suite before enabling by default.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** (REQUIRED) — SQLite-based graph (entities/relations/communities tables); GLM-5.2 extractor; Leiden via graphology; hybrid retrieval mode (standard RAG + GraphRAG). Defer to v1.x if build cost proves prohibitive in Phase 2 evaluation.

## Sources
- Edge, Trinh, Cheng et al. (2024). *From Local to Global: A GraphRAG Approach to Query-Focused Summarization.* arXiv:2404.16130.
- Microsoft GraphRAG (2024). Open-source implementation: https://github.com/microsoft/graphrag.
- Zep (2024). arXiv:2501.13956.
- MiMo AI `docs/CAPABILITY_MAP.md` §4.
- Inventory lines 665–673 (GraphRAG, P0).
