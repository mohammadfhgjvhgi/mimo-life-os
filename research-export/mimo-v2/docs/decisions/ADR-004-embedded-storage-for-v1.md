# ADR-004: Embedded Storage for v1

**Status:** Accepted · **Date:** Phase 1

## Problem
The system needs relational state, vector search, a knowledge graph, and a task queue. The "standard" choices (Pinecone/Weaviate for vectors, Neo4j for graph, Redis/BullMQ for queue) each add a server + port + ops burden, conflicting with the personal/single-user, single-external-port Caddy constraint.

## Candidates
1. Dedicated servers (Pinecone + Neo4j + Redis).
2. Embedded (sqlite-vec + SQLite-relational KG + SQLite-backed queue).
3. Mixed.

## Selected
**Candidate 2 — Embedded for v1.**
- **Vectors:** `sqlite-vec` (or `better-sqlite3-vector`) — embedded, transactional with memory records.
- **Knowledge Graph:** SQLite-relational (`Entity`/`Relation`/`Mention` tables + recursive CTE traversal + `graphology` in-memory analytics).
- **Queue:** SQLite-backed (`jobs` table + `UPDATE…RETURNING` atomic claim + sweeper worker).
- **Relational:** Prisma + SQLite (already in scaffold).

## Rejected
- **Candidate 1** — 3+ extra services, ports, ops burden, overkill at personal scale.
- **Candidate 3** — adds complexity without clear benefit at v1.

## Reason
At personal/single-user scale, embedded stores are simpler, transactionally consistent with each other, trivially backed up (copy one .db file), and fit the single-port gateway. All interfaces (`VectorStore`, `GraphStore`, `Queue`) are abstracted so a dedicated store can swap in later **without rewriting call sites**.

## Reversal Cost
Low — swap is localized behind the interface. Revisit thresholds:
- Vector count > 1M → consider dedicated vector DB.
- Multi-hop KG latency bottleneck → consider Neo4j.
- Queue throughput > ~100 jobs/sec sustained → consider BullMQ/Redis.

## Consequences
- One SQLite file (relational + vectors + graph + queue) → backup = copy file.
- WAL mode for concurrency.
- Reindex/rebuild jobs for vectors + KG when schema/source changes.
