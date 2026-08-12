# Knowledge Graph (KG)

**Category:** Retrieval
**Status:** REQUIRED
**Maturity:** Mature (concept + tooling) / Mature (production at scale)

## Definition
A structured representation of knowledge as a graph of **entities (nodes)** connected by typed **relationships (edges)**, optionally with literal properties on each. Each fact is stored as a triple (subject, predicate, object) — e.g., `(User, livesIn, Berlin)` — queryable by graph traversal, pattern matching, or hybrid retrieval.

## Problem Solved
Flat text/embedding indexes can't answer multi-hop questions, can't represent typed relationships explicitly, and can't easily reconcile entity aliases. A KG makes entities first-class citizens with typed relations → precise multi-hop queries, entity-level updates, and a substrate for GraphRAG.

## Why It Matters
MiMo AI needs to track the user's world: people, projects, places, documents, events, tools — and the relationships among them. The Personal Knowledge Graph is the substrate for "who works on what," "what did the user decide about X," "show me everything related to project Y."

## How It Works
1. **Build**: extract entities + relations from documents/episodes (NER + relation extraction + triple extraction) → entity resolution (merge aliases) → store.
2. **Schema**: nodes (id, type, name, description, properties, embeddingId) and edges (id, src, dst, type, properties, validFrom, validTo, provenance).
3. **Query**: by graph pattern (Cypher-like or SPARQL-like), by entity-neighbor traversal, or by hybrid (vector + graph).
4. **Update**: append-only with `validTo` for superseded facts; re-extract on corpus change.

## Architecture
```
Sources → Extractor (NER + Relation Extraction + Triple Extraction)
   → Entity Resolution (alias merge)
   → Graph Store:
       ├─ Node table (id, type, name, properties, embeddingId)
       └─ Edge table (id, src, dst, type, validFrom, validTo, provenance)
Query:
   - Pattern: MATCH (n)-[r]->(m) WHERE n.name=? RETURN ...
   - Traversal: neighbors(entity, depth)
   - Hybrid: vector + graph (GraphRAG)
```

## Interfaces
- `upsertEntity({type, name, properties}) → entityId`
- `upsertRelation({src, dst, type, properties, provenance}) → relationId`
- `resolveEntity(candidate) → entityId | newEntityId`
- `traverse({entityId, depth, edgeTypes?}) → Subgraph`
- `matchPattern(pattern) → Subgraph[]`

## Dependencies
- LLM extractor (GLM-5.2): NER + relation extraction + triple extraction.
- Entity resolution (fuzzy + embedding-based).
- Graph storage: SQLite-based (nodes + edges tables) preferred; external (Neo4j) for scale.
- Embedding model (for entity-description vectors + resolution).

## Strengths
- Multi-hop reasoning via traversal.
- Typed relations = precise queries ("who is the manager of the owner of project X?").
- Entity-level updates (fix one entity → propagates).
- Substrate for GraphRAG global QA.
- Human-readable: KG browser UI builds trust.

## Weaknesses
- Extraction quality dominates — bad NER = bad graph.
- Entity resolution is hard (aliases, name collisions).
- Build cost (LLM per chunk for extraction).
- Maintenance: graph drift after corpus changes.
- Storage + indexing overhead vs flat.

## Failure Modes
- Duplicate entities (`John` vs `J. Smith` vs `Johnny`) fragment the graph.
- Wrong relation type ("manager" vs "reports to" confused).
- Stale edges (relations that no longer hold) without `validTo`.
- Traversal explosion (high-degree entities → huge subgraphs).

## Security Implications
- KG makes implicit relationships explicit → extra PII surface (e.g., social graph).
- Permission model must apply to nodes + edges (don't traverse into restricted entities).
- Provenance per edge (which chunk asserted it?) is mandatory for audit.

## Performance Implications
- SQLite-based graph: traversal via recursive CTEs — fast for ≤100k nodes.
- Vector index on entity descriptions for similarity search.
- Pattern queries indexed on `(src, type)` and `(dst, type)`.

## Operational Implications
- KG browser UI (entities, relations, source provenance).
- Periodic entity-resolution pass (merge duplicates).
- Re-extract on extractor prompt change.
- Eval: precision of extracted relations on labeled sample.

## Alternatives
- **External graph DB (Neo4j)** — heavy for single-user; great at scale.
- **RDF + SPARQL** — standard but heavyweight; overkill for personal scope.
- **Flat semantic memory only** (no graph traversal; loses multi-hop).

## Maturity & Production Readiness
- KG as a concept + tooling: mature (Neo4j, Wikidata, enterprise KGs).
- LLM-extracted personal KGs: emerging (Zep, GraphRAG, Mem0 graph variants).

## Relevant Research / Papers
- Hogan et al. (2021). **Knowledge Graphs.** ACM Computing Surveys.
- Edge et al. (2024). **GraphRAG.** arXiv:2404.16130.
- Zep (2024) — temporal knowledge graph memory. arXiv:2501.13956.
- Bordes et al. (2013). **TransE** — translating embeddings for KGs.

## Official Documentation
- Neo4j: https://neo4j.com/docs/
- Microsoft GraphRAG: https://microsoft.github.io/graphrag/
- Zep: https://docs.getzep.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **SQLite-based graph**: Prisma models `Entity(id, type, name, description, properties Json, embeddingId, createdAt)` and `Relation(id, srcId, dstId, type, properties Json, validFrom DateTime, validTo DateTime?, provenance Json, createdAt)`.
- **Indexes**: SQLite indexes on `Relation(srcId, type)`, `Relation(dstId, type)`, `Entity(type, name)`.
- **Traversal**: recursive CTE via raw `better-sqlite3` (Prisma doesn't expose CTEs cleanly): `WITH RECURSIVE … SELECT …`.
- **Entity resolution**: embedding similarity on `Entity.description` + Levenshtein on `name` → merge UI for ambiguous matches.
- **Extractor**: GLM-5.2 (z-ai-web-dev-sdk) JSON output `{entities[], relations[]}` per chunk; merged into graph by background worker.
- **Schema vs graph DB tradeoff**: for personal scale (<100k entities) SQLite wins (zero infra, transactional with other data, simpler backups). Neo4j only justified if multi-hop query latency becomes a bottleneck — defer.
- **UI**: Next.js route `/knowledge/graph` with zustand store for graph exploration (use `react-flow` or `cytoscape` for visualization).
- **socket.io**: emits `entity.added` / `relation.added` for live UI updates.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 4 (Knowledge). CAPABILITY_MAP §4 lists Knowledge Graph, Personal KG as REQUIRED; NER, Relationship/Triple Extraction, Entity Resolution as R. The Personal KG is the user-specific instance of this — the substrate for GraphRAG and for "MiMo knows my world."

## Recommended Usage
- SQLite-based KG (nodes + edges tables) for personal scale.
- Extract incrementally per-ingested-doc; periodic entity-resolution pass.
- Always set `validFrom`/`validTo` on relations; never delete.
- Provenance per edge (source chunk IDs).
- Permission filter on traversal.
- KG browser UI for trust + audit.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** (REQUIRED) — SQLite-based KG (Entity + Relation Prisma models); GLM-5.2 extractor; embedding + Levenshtein entity resolution; defer Neo4j unless scale demands it.

## Sources
- Hogan et al. (2021). *Knowledge Graphs.* ACM Computing Surveys. arXiv:2003.02320.
- Edge et al. (2024). *GraphRAG.* arXiv:2404.16130.
- Zep (2024). arXiv:2501.13956.
- Bordes et al. (2013). *TransE.* NeurIPS.
- MiMo AI `docs/CAPABILITY_MAP.md` §4.
- Inventory lines 655–663 (Knowledge Graph, P0); 685–693 (Personal KG, P0); 705–823 (NER, Relation Extraction, Triple Extraction, P1).
