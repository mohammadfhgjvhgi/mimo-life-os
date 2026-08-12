# Knowledge Graph Store

**Category:** Infrastructure
**Status:** REQUIRED
**Maturity:** Mature (SQLite relational); Mature (dedicated graph DB)

## Definition
A Knowledge Graph (KG) store persists entities (nodes) and relationships (edges) extracted from the user's documents, conversations, and tool results — typically as RDF-like triples `(subject, predicate, object)` or as a property graph. For MiMo AI at personal scale, the chosen form is **relational SQLite tables** (`Entity`, `Relation`, `EntityAttribute`) managed via Prisma, rather than a dedicated graph database (Neo4j, Memgraph, NebulaGraph).

## Problem Solved
- Vector search retrieves *similar text*; it does not answer "who works at Acme and reports to whom?" — that requires traversal of typed relationships.
- Pure keyword search loses multi-hop reasoning ("the author of the paper cited by X").
- Knowledge that should be reified (named entities, their attributes, their links) needs structure, not just embedded blobs.

## Why It Matters
A KG lets MiMo AI answer structural questions, ground entity references (coreference), power GraphRAG (retrieve subgraphs around a query entity), and give the model stable handles for "the user's brother," "project X," "company Y." It is the **skeleton** that vector search fills in with prose.

## How It Works
### Relational SQLite approach (chosen)
- `Entity` table: `{ id, type, name, displayName, normalizedKey, sourceCount, createdAt, updatedAt }`. Indexed on `(type, normalizedKey)` for entity resolution.
- `EntityAttribute` table: `{ entityId, key, value, valueType, confidence, sourceChunkId, createdAt }` — multi-valued attributes with provenance.
- `Relation` table: `{ id, subjectEntityId, predicate, objectEntityId, confidence, sourceChunkId, validFrom, validTo, createdAt }` — typed edges with provenance and temporal validity.
- `Mention` table: `{ chunkId, entityId, spanStart, spanEnd, confidence }` — links chunks (the vector store's units) to entities, enabling "show me all chunks mentioning Alice."

### Typical queries
- One-hop: "Alice's employer" → `SELECT objectEntityId FROM Relation WHERE subjectEntityId=? AND predicate='works_at'`.
- Multi-hop: recursive CTE in SQLite — `WITH RECURSIVE ...` traverses the graph for k hops.
- Subgraph extraction (for GraphRAG): given a seed entity set, expand k hops and return all entities + relations in the subgraph; serialize to text + feed the Context Layer.

### Extraction pipeline (in the Knowledge Layer)
1. Chunk text → embed → store in vector DB.
2. NER + relation extraction (LLM call via Gateway, structured output) on each chunk → candidate `(entity, relation, entity)` triples.
3. Entity resolution: match candidates to existing entities by `normalizedKey` (case-folded, alias map) or by embedding similarity above a threshold.
4. Insert new entities/relations; record provenance (`sourceChunkId`).
5. Conflict resolution: if a new triple contradicts an existing one, keep both with confidence scores and a `validFrom/validTo` for temporal KG.

### Why SQLite over Neo4j
1. Personal scale — single user, ≤100k entities, ≤1M relations. A dedicated graph server is overkill.
2. Operational simplicity — one SQLite file with the rest of the state.
3. Transactional consistency — graph writes share ACID with chunks, memories, etc.
4. Recursive CTEs in SQLite are sufficient for k≤3-hop traversals, which covers ~95% of personal-AI queries.
5. Same Prisma stack.
6. No separate server, credentials, network, or licensing.

Neo4j earns its keep at: billion-edge graphs, Cypher-native path queries, GDS graph algorithms, multi-tenant. None apply to v1 MiMo AI.

## Architecture
```
Knowledge Ingestion ──▶ NER+Relation Extraction (LLM, structured) ──▶ Candidate triples
                                                                              │
                                                                              ▼
                                                                  Entity Resolution
                                                                              │
                                                                              ▼
                                       ┌──────────────────────────────────────┐
                                       │  SQLite (mimo.db)                    │
                                       │   Entity / EntityAttribute /         │
                                       │   Relation / Mention                 │
                                       │   + Chunk (FTS5) + vec_chunks (vec0) │
                                       └──────────────────────────────────────┘
                                                                              ▲
GraphRAG query ──▶ seed entities ──▶ k-hop subgraph ──▶ serialized text ──────┘ fed to Context Layer
```

## Interfaces
```ts
interface KnowledgeGraphStore {
  upsertEntity(e: EntityInput): Promise<Entity>;
  upsertRelation(r: RelationInput): Promise<Relation>;
  upsertMention(m: MentionInput): Promise<void>;
  resolveMention(name: string, type?: string): Promise<Entity | null>;
  neighbors(entityId: string, k: number): Promise<Subgraph>;
  subgraph(seedEntityIds: string[], k: number): Promise<Subgraph>;
  searchEntities(query: string, limit: number): Promise<Entity[]>;  // name + embedding hybrid
}

interface Subgraph { entities: Entity[]; relations: Relation[]; }
```
Implemented in `src/server/knowledge/kg-store.ts` on top of Prisma + raw recursive CTEs.

## Dependencies
- Prisma + SQLite (already in scaffold).
- LLM Gateway for NER + relation extraction (structured output mode).
- Embeddings for entity search (entity name → vector for hybrid entity lookup).
- Vector store (entities optionally have an embedding for fuzzy entity search).
- Optionally: `nano-graphrag` (lightweight GraphRAG library) — *evaluate; may save boilerplate but a hand-rolled version is straightforward.*

## Strengths
- **Structured recall** answers vector-only retrieval cannot.
- **Provenance** — every triple links to its source chunk.
- **Temporal** — `validFrom/validTo` supports "as of" queries (Alice's old employer vs. current).
- **Transactional** with the rest of the DB.
- **No server** — embedded.
- **Hybrid-friendly** — entity search combines keyword (on name) + vector (on embedding).

## Weaknesses
- **Recursive CTE performance** degrades for very deep traversals (k≥4) or very dense graphs. Mitigation: cap k=3, materialize hot subgraphs.
- **No native graph algorithms** (PageRank, community detection) — if needed, export to NetworkX in a worker.
- **Schema rigidity** — adding new predicates is cheap, but adding new edge properties requires migration.
- **Write amplification** — every chunk ingestion triggers NER+relation extraction (LLM cost). Mitigation: only extract from high-value chunks; batch.
- **Entity resolution is hard** — name collisions, aliases, abbreviations. Mitigation: alias table + embedding-based fuzzy match + manual UI curation.

## Failure Modes
- **Stale relations** — entity attribute changed (Alice changed job) but old triple still present. Mitigation: `validTo` timestamps; resolver picks the latest valid.
- **Contradictory triples** — two sources disagree. Mitigation: keep both with confidence; GraphRAG surfaces both to the model.
- **Entity proliferation** — same entity added multiple times under different names. Mitigation: aggressive normalization at insert time + periodic dedup job.
- **Extraction hallucination** — LLM emits a relation not supported by the source. Mitigation: every triple carries `sourceChunkId`; verification step samples triples and re-checks against source text.

## Security Implications
- **PII concentration** — a KG of personal relationships is highly sensitive; filesystem permissions + optional SQLCipher encryption.
- **Provenance audit** — every triple links to its source chunk, which links to its source document; this is also the audit trail for "where did MiMo learn this?"
- **No network exposure** — embedded, no port, no credentials.

## Performance Implications
- Insert: cheap (relational rows).
- One-hop query: <5ms with proper indexes.
- k-hop recursive CTE: 5–50ms for typical personal scale.
- GraphRAG subgraph extraction: dominated by LLM cost of serializing the subgraph, not the SQL.

## Operational Implications
- Need a **NER+relation extraction mini-service** (Task Queue job) that runs on new chunks.
- Need a **dedup/conflict-resolution job** that runs periodically.
- Need a **KG browser UI** (settings/dashboard) for the user to inspect and correct entities/relations.
- Need a **backup** (same SQLite file as everything else).

## Alternatives
- **Neo4j / Memgraph / NebulaGraph:** dedicated graph DBs with Cypher. Rejected for v1 — operational overhead without benefit at personal scale. Re-evaluate if MiMo AI goes multi-tenant or needs graph algorithms at scale.
- **RDF store (GraphDB / Blazegraph / Apache Jena):** semantic-web stack; overkill for personal AI.
- **nano-graphrag:** lightweight GraphRAG library that stores its graph in JSON/SQLite. Viable as a starter; *evaluate — may accelerate v1.*
- **In-memory graph (NetworkX):** no persistence; only useful for ephemeral analysis.
- **Property graph in Postgres (Apache AGE):** adds Postgres server; rejected for v1.

## Maturity & Production Readiness
- SQLite relational graph: mature, simple, well-understood. Suitable for v1.
- GraphRAG (subgraph extraction → serialized context): emerging pattern (Microsoft GraphRAG paper, 2024) but well-grounded.
- nano-graphrag: emerging but usable.

## Relevant Research / Papers
- Microsoft Research, "From Local to Global: A Graph RAG Approach to Query-Focused Summarization," 2024 (arXiv:2404.16130) — GraphRAG.
- Edge et al., "Local to Global" — same as above.
- *Verify exact citations at integration time.*

## Official Documentation
- SQLite recursive CTEs: `https://www.sqlite.org/lang_with.html`.
- Prisma raw SQL: `https://www.prisma.io/docs/orm/prisma-client/using-custom-sql-queries`.
- nano-graphrag: `https://github.com/gusye1234/nano-graphrag`.
- Microsoft GraphRAG: `https://microsoft.github.io/graphrag/`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** KG store is a server-side module.
- **Module layout:**
  - `src/server/knowledge/kg-store.ts` — the `KnowledgeGraphStore` interface + Prisma implementation.
  - `src/server/knowledge/extract.ts` — NER + relation extraction prompt + structured-output parsing.
  - `src/server/knowledge/graphrag.ts` — subgraph extraction + serialization for the Context Layer.
- **Prisma schema:** `Entity`, `EntityAttribute`, `Relation`, `Mention`, plus `EntityAlias` for the alias map.
- **Recursive CTEs** executed via `prisma.$queryRaw` (typed with `zod` for safety).
- **Mini-service:** a Task Queue job `extract-graph` that picks chunks lacking extraction and runs the LLM extractor in batches.
- **UI:** a KG browser in the Next.js console (settings/dashboard) — `EntityDetail` page showing attributes, relations, mentions, provenance.
- **Caddy/socket.io:** KG stats surface in the observability dashboard.

## Relevance To Our Project (MiMo AI layered runtime)
KG store is the structural half of Layer 4 (Knowledge). Combined with the vector store, it enables GraphRAG and structural recall — critical for answering the kinds of multi-hop questions a personal AI gets ("what did my brother say about project X last month?").

## Recommended Usage
- **Adopt SQLite-relational KG for v1.**
- **Run extraction only on high-value chunks** (documents the user marks important, conversations longer than N turns, web pages saved by the browser agent).
- **Cap GraphRAG traversal at k=3** by default.
- **Surface provenance always** — every entity/relation in the UI shows its source.
- **Periodic dedup + conflict review** as a weekly job.

## Decision
**ADOPT** — SQLite-relational KG store for v1. Dedicated graph DBs (Neo4j/Memgraph/NebulaGraph) **REJECTED** for v1; revisit only if scale or graph-algorithm needs demand.

## Sources
- Technology inventory category 25 (Storage) #404 Graph Database / Neo4j (P1), #410 Nano-GraphRAG (P1).
- `docs/PROJECT_UNDERSTANDING.md` §5 (Knowledge subsystems: Knowledge Graph + GraphRAG + Personal KG + Temporal KG), §9 (open question: "Graph store for KG (SQLite-based vs external)").
- `docs/CAPABILITY_MAP.md` §4 (Knowledge Graph — R, GraphRAG — R, Personal KG — R, Temporal KG — I).
- Microsoft GraphRAG paper, Edge et al., 2024 (arXiv:2404.16130).
- SQLite recursive CTE docs: `https://www.sqlite.org/lang_with.html`.
- nano-graphrag: `https://github.com/gusye1234/nano-graphrag`.
- *Inferred:* specific schema, recursive-CTE traversal, GraphRAG serialization pattern — designed for this stack.
