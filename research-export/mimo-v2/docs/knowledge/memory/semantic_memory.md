# Semantic Memory

**Category:** Memory
**Status:** CORE
**Maturity:** Mature (concept) / Mature (production: vector + triple stores)

## Definition
A typed long-term memory store of **facts, beliefs, and generalized knowledge** — propositions the system holds to be true, decoupled from the specific episode in which they were learned. Stored either as text snippets + embeddings or as structured triples (subject-predicate-object).

## Problem Solved
A raw transcript log cannot answer "what is the user's timezone?" without re-reading every conversation. Semantic memory extracts and persists facts once, so future queries are a lookup, not a re-read.

## Why It Matters
Semantic memory is the backbone of factual recall and grounding for MiMo AI: user profile facts, project facts, domain knowledge, world facts. It is also the substrate RAG retrieves over and the input Knowledge Graphs are built from.

## How It Works
1. **Extraction**: an LLM reads episodes / messages / documents and emits candidate facts (as triples or short statements) with provenance + confidence.
2. **Conflict resolution**: new facts are matched against existing facts on (subject, predicate); if conflicting, the system applies a policy (latest-wins, source-trust-wins, or escalate to user).
3. **Storage**: triple table `(s, p, o, valid_from, valid_to, confidence, provenance)` plus an embedding index over the rendered statement text.
4. **Retrieval**: hybrid — BM25/keyword over rendered text + vector similarity over embedding + optional graph traversal for multi-hop ("user → livesIn → ?").
5. **Decay/reinforcement**: facts accessed frequently get reinforced; superseded facts get `valid_to` set (kept for history, not retrieved by default).

## Architecture
```
Episodes/Documents → Fact Extractor (LLM)
   → Candidate Fact (s,p,o, statement, confidence, provenance)
   → Conflict Resolver (match by s+p; latest/source-wins)
   → Semantic Store:
       ├─ Triple table (s, p, o, valid_from, valid_to, confidence, provenance)
       └─ Statement text + embedding (sqlite-vec)
Context Layer ← (hybrid retrieval) ← Semantic Store
```

## Interfaces
- `assertFact({subject, predicate, object, confidence, provenance}) → factId | conflictId`
- `queryFacts({subject?, predicate?, object?, queryText, topK}) → Fact[]`
- `retractFact(factId, reason)`
- `resolveConflict(conflictId, decision)`
- `traverse({subject, predicate, depth}) → Fact[]` (graph-style)

## Dependencies
- LLM extractor (GLM-5.2).
- Embedding model.
- sqlite-vec.
- Conflict-resolution policy engine + provenance + confidence.
- (Optional) Knowledge Graph layer for triple traversal.

## Strengths
- Cheap factual recall without re-reading source material.
- Supports multi-hop reasoning via graph traversal.
- Versioned (`valid_from`/`valid_to`) — history preserved.
- Natural input to Knowledge Graph and GraphRAG.

## Weaknesses
- Extraction errors become "facts" → silent hallucinations.
- Conflict resolution is hard (time-varying truths, partial truths).
- Triples are lossy; statement text is more faithful but less queryable.
- Embedding drift after model swap.

## Failure Modes
- Asserted-but-wrong facts pollute downstream reasoning.
- Stale facts not superseded (no `valid_to` set).
- Duplicate entities (`John` vs `J. Smith`) → fragmentation.
- Embedding index out of sync with triple table.

## Security Implications
- Facts may be PII (user address, family, health).
- Prompt-injection risk: a malicious document could inject "facts" — needs provenance + trust scoring + write-rate limiting.
- Tamper-evident provenance for audit.

## Performance Implications
- Hybrid retrieval (vector + keyword + graph) — keep indexes co-located in SQLite.
- Write path goes through extractor + conflict resolver → batch async.
- Read path must be sub-100ms for Context Layer use.

## Operational Implications
- Fact browser UI (subject/predicate/object, confidence, provenance, history).
- Periodic re-extraction pass after extractor prompt changes.
- Backup = SQLite dump.

## Alternatives
- **Pure vector store of text snippets** (no triples; loses graph traversal).
- **RDF / SPARQL triple store** (heavy; overkill for single-user).
- **Pure Knowledge Graph** (overlap; semantic store is the substrate).

## Maturity & Production Readiness
- Triples + embeddings: mature (Zep, GraphRAG, Mem0 all use variants).
- Auto-conflict-resolution at production quality is still research-y.

## Relevant Research / Papers
- Tulving (1972) — semantic memory distinction.
- Edge et al. (2024) — **GraphRAG** (Microsoft) — extracts semantic triples for KG.
- Zep (2024) — temporal semantic graph.

## Official Documentation
- Microsoft GraphRAG: https://microsoft.github.io/graphrag/
- Zep: https://docs.getzep.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Prisma model `Fact`**: `id, subject String, predicate String, object String, statement String, confidence Float, provenance Json, validFrom DateTime, validTo DateTime?, createdAt`.
- **sqlite-vec** virtual table `fact_vec(rowid, embedding)` over `Fact.id` using the rendered `statement`.
- **Extractor**: GLM-5.2 (z-ai-web-dev-sdk) prompted to emit JSON triples; runs in Next.js background worker consuming episode/document events from the bus.
- **Conflict resolver**: Prisma query `WHERE subject=? AND predicate=? AND validTo IS NULL`; on conflict, apply policy and emit `fact.conflict` socket.io event for UI review.
- **Zustand**: client cache of "top N facts about user" for the conversation header.
- **Caddy**: single-port reverse proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory) + Layer 4 (Knowledge). CAPABILITY_MAP §3 lists Semantic Memory as CORE; §4 lists Knowledge Graph, Triple Extraction as R. Semantic store is the substrate for the Personal KG and the retrieval corpus RAG searches.

## Recommended Usage
- Extract from episodes + documents + web ingestion.
- Store BOTH triple AND statement text — triple for graph traversal, statement for embedding/keyword.
- Always set `validFrom`/`validTo`; never delete (history matters).
- Default policy: latest-high-confidence-source wins; flag low-confidence conflicts for user review.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite + sqlite-vec; triple + statement dual storage; GLM-5.2 extractor; conflict policy = latest-trusted-wins with UI escalation.

## Sources
- Tulving, E. (1972). *Episodic and Semantic Memory.*
- Edge et al. (2024). *From Local to Global: A GraphRAG Approach to Query-Focused Summarization.* arXiv:2404.16130.
- Mem0 (2024). arXiv:2504.19413.
- Zep (2024). arXiv:2501.13956.
- MiMo AI `docs/CAPABILITY_MAP.md` §3, §4.
- Inventory lines 333–339 (Semantic Memory, P0).
