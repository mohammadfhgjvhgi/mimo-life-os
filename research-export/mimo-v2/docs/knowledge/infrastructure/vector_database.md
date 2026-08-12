# Vector Database

**Category:** Infrastructure
**Status:** CORE
**Maturity:** Mature (embedded); Production-ready (dedicated)

## Definition
A vector database stores high-dimensional float vectors (embeddings) together with metadata and provides **approximate nearest-neighbor (ANN)** search: given a query vector, return the k stored vectors closest by cosine/L2 distance. For MiMo AI at personal single-user scale, the chosen form is an **embedded** vector extension to SQLite — specifically **sqlite-vec** (or its `better-sqlite3-vector` sibling) — rather than a standalone server (Pinecone/Weaviate/Milvus/Qdrant).

## Problem Solved
- Plain SQL cannot do "find me the k most semantically similar items to this vector" efficiently.
- The Memory and Knowledge layers need fast similarity search over tens of thousands to millions of vectors.
- Personal-scale AI must not require running a separate database server.

## Why It Matters
Vector search is the recall half of the Context Layer. Without it, retrieval degrades to keyword search and the model's context window — insufficient (see the GLM-5.2 critical note on context ≠ memory). Embedded vector storage keeps the operational footprint minimal: one SQLite file, no server, no network, no separate credentials.

## How It Works
- sqlite-vec is a SQLite loadable extension that adds a `vec0` virtual table type.
- Schema: `CREATE VIRTUAL TABLE vec_chunks USING vec0(embedding FLOAT[768]);` — vectors stored in the virtual table, metadata (source text, doc id, model, hash) in a normal `Chunk` table keyed by `rowid`.
- Insert: `INSERT INTO vec_chunks(rowid, embedding) VALUES (?, ?)`.
- Query: `SELECT rowid, distance FROM vec_chunks WHERE embedding MATCH ? ORDER BY distance LIMIT 10;` — the query vector is passed as the MATCH argument; sqlite-vec performs the k-NN scan.
- Indexing: sqlite-vec uses brute-force with optional flat quantization for small/medium corpora, which is fast enough up to ~1M vectors at personal scale. For larger corpora, an IVF/HNSW index would be needed (not yet in sqlite-vec core — *verify against current docs*).

### Why Embedded over Dedicated (Pinecone/Weaviate/Milvus/Qdrant)
1. **Personal scale** — single user, ≤1M vectors, ≤3GB of vector data. A dedicated server is overkill.
2. **Operational simplicity** — one SQLite file ships with the app; backup = copy the file; no server to start, monitor, patch, secure.
3. **Transactional consistency** — vectors and metadata share one DB; insert/update/delete is atomic. No distributed-consistency gap between "vector inserted" and "metadata inserted."
4. **Zero network** — no separate credentials, no VPC, no egress cost, no API rate limits.
5. **Offline-capable** — works on a laptop with no internet (matches the local-embeddings offline path).
6. **Cost** — free. Dedicated servers are billed per pod/instance even at zero usage.
7. **Same Prisma stack** — `better-sqlite3` already in the scaffold; sqlite-vec is the same family.

Dedicated servers earn their keep at: multi-tenant SaaS, >10M vectors, cross-region replication, or specialized hardware (GPU ANN). None of these apply to v1 MiMo AI.

## Architecture
```
                    ┌─────────────────────────────┐
Chunk (Prisma)      │   SQLite file (mimo.db)     │
  - id (rowid)      │                             │
  - docId           │  ┌──────────────────────┐   │
  - content         │  │ Chunk (relational)   │   │
  - model           │  └──────────────────────┘   │
  - contentHash     │  ┌──────────────────────┐   │
  - createdAt       │  │ vec_chunks (vec0)    │   │ ← sqlite-vec ext
                    │  │  rowid ↔ Chunk.id    │   │
                    │  └──────────────────────┘   │
                    │  ┌──────────────────────┐   │
                    │  │ ChunkFTS (FTS5)      │   │ ← keyword half of hybrid
                    │  └──────────────────────┘   │
                    └─────────────────────────────┘
```
Hybrid search query: BM25 over `ChunkFTS` ∪ vector k-NN over `vec_chunks`, fused via reciprocal rank fusion (RRF), optional reranker over top-50.

## Interfaces
```ts
// Under the Knowledge Layer:
interface VectorStore {
  upsert(rowid: number, embedding: Float32Array): Promise<void>;
  upsertBatch(rows: { rowid: number; embedding: Float32Array }[]): Promise<void>;
  search(query: Float32Array, k: number): Promise<{ rowid: number; distance: number }[]>;
  delete(rowid: number): Promise<void>;
  count(): Promise<number>;
  reindex(newModel: string): Promise<void>;   // for embedding-model migration
}
```
Implemented in `src/server/knowledge/vector-store.ts` on top of `better-sqlite3` + sqlite-vec.

## Dependencies
- `better-sqlite3` (already in scaffold for Prisma's SQLite driver, but the vector store uses its own connection to load the extension).
- `sqlite-vec` loadable extension (downloaded/bundled at build time).
- Embeddings via the Model Gateway (see `embeddings.md`).
- Prisma `Chunk` table for relational metadata.
- Prisma `ChunkFTS` FTS5 virtual table for keyword half of hybrid.

## Strengths
- **One file, one DB** — operational simplicity unmatched by dedicated servers.
- **Transactional** — vectors + metadata share ACID transactions.
- **Offline** — no network dependency.
- **Free** — no per-query cost, no infrastructure cost.
- **Fast enough** at personal scale: 5–50ms queries for ≤1M vectors.
- **Backup = file copy** — trivially integrated into a daily cron + object storage.
- **Single Prisma story** — relational and vector data live in one schema.

## Weaknesses
- **Not horizontally scalable** — single writer, single file. Fine for one user; not for multi-tenant.
- **Brute-force / flat quantization** — performance degrades past ~1–5M vectors without specialized indexes (IVF/HNSW). For a single user this is rarely hit.
- **No native filtering by metadata in the vector query** — you query vectors, then JOIN to metadata. Workable with careful schema design.
- **Extension distribution** — sqlite-vec ships as a platform-specific binary; bundling for Linux/macOS/Windows needs build-time care.
- **No GPU ANN** — CPU only. Acceptable at personal scale.
- **No native distributed consistency** — but we don't need it.

## Failure Modes
- **Extension load failure** — binary mismatch (wrong platform / SQLite version). Mitigation: pin sqlite-vec version; smoke-test at startup; fail loud.
- **Dimension mismatch** — query vector dim ≠ table dim → runtime error. Mitigation: validate at the VectorStore boundary; store `dimensions` in `Chunk` metadata.
- **Corruption** — SQLite file corruption from interrupted writes. Mitigation: WAL mode + daily backup + integrity check job.
- **Vector drift** — embeddings exist for chunks that were edited. Mitigation: content-hash check on retrieval; re-embed on mismatch.
- **Bloat** — deleted chunks' vectors may linger if `delete` not called. Mitigation: cascade on relational delete.

## Security Implications
- **Local-only** — no network exposure; the attack surface is the SQLite file itself.
- **File permissions** — the SQLite file contains source text (potentially PII); enforce filesystem permissions (0600), and optionally encrypt the file (SQLCipher) for sensitive deployments.
- **No secrets in vectors** — but source text next to vectors may contain secrets; the redactor in the Knowledge ingestion pipeline must run before chunking.

## Performance Implications
- Insert: ~10–50µs per vector (batched).
- Query: 5–50ms for k=10 over ≤1M vectors (brute-force scan).
- Memory: sqlite-vec keeps the index in the SQLite page cache; tune `PRAGMA cache_size` for the workload.
- Concurrency: WAL mode allows concurrent readers + one writer — fits the read-heavy, write-batched pattern of personal AI.

## Operational Implications
- Need a **build step** that bundles the sqlite-vec binary for the deployment platform.
- Need a **startup smoke test** that loads the extension and runs a trivial k-NN; fail loud if missing.
- Need a **daily backup** of the SQLite file (cron → object storage).
- Need a **migration path** for embedding-model changes (see `embeddings.md`).
- Need a **monitoring metric** for index size, query latency p95, insert rate.

## Alternatives
- **Dedicated vector DB (Pinecone/Weaviate/Milvus/Qdrant):** rejected for v1 — operational overhead without benefit at personal scale. Re-evaluate if MiMo AI goes multi-user.
- **pgvector (PostgreSQL extension):** mature, but adds a Postgres server — rejected for v1 (the whole point of SQLite is operational simplicity).
- **ChromaDB:** embedded Python-first; works but less ergonomic in a TS/Next.js stack than sqlite-vec.
- **LanceDB:** embedded columnar vector DB; viable alternative to sqlite-vec; *evaluate alongside.*
- **In-memory only (no persistence):** rejected — loses vectors on restart; only useful for ephemeral caches.

## Maturity & Production Readiness
- sqlite-vec: stable, actively maintained, recommended by SQLite community for embedded vector workloads. Suitable for v1.
- better-sqlite3: production-grade.
- Hybrid search (FTS5 + vec0 + RRF): standard pattern, well-documented.

## Relevant Research / Papers
- Johnson, Douze, Jégou, "Billion-scale similarity search with GPUs," 2017 (FAISS) — background on ANN algorithms; sqlite-vec uses simpler flat/quantized variants.
- Pan et al., "Survey of Vector Search Algorithms," 2023 — *verify citation*.

## Official Documentation
- sqlite-vec: `https://sqlite-vec.io/`.
- better-sqlite3: `https://github.com/WiseLibs/better-sqlite3`.
- SQLite FTS5: `https://www.sqlite.org/fts5.html`.
- Prisma + raw SQL for virtual tables: `https://www.prisma.io/docs/orm/prisma-client/using-custom-sql-queries`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Vector store is a server-side module.
- **Module layout:**
  - `src/server/knowledge/vector-store.ts` — the `VectorStore` interface + sqlite-vec implementation.
  - `src/server/knowledge/db.ts` — opens a dedicated `better-sqlite3` connection (separate from Prisma's) so we can load the sqlite-vec extension without Prisma interference; both connections point at the same SQLite file in WAL mode.
  - `src/server/knowledge/hybrid-search.ts` — combines FTS5 + vec0 + RRF + optional reranker.
- **Prisma coexistence:** Prisma manages relational tables; the vector virtual table and FTS5 table are created via raw `db.exec(...)` in a migration script (Prisma migrations support raw SQL).
- **Bulk ingestion:** a Task Queue job batches embed calls (64 at a time) and bulk-inserts vectors; runs as a mini-service worker.
- **Caddy / socket.io:** irrelevant to vector store directly; the dashboard surfaces index stats via socket.io events on the observability channel.
- **Settings UI:** expose index size, query latency, last-migration model — read-only.

## Relevance To Our Project (MiMo AI layered runtime)
This is the persistence substrate for Layer 4 (Knowledge) and the vector half of Layer 3 (Memory) retrieval. Without it, the Context Layer cannot do on-demand retrieval, and the model's context window becomes the only memory — which (per the GLM-5.2 critical note) is not viable.

## Recommended Usage
- **Adopt sqlite-vec as the sole vector store for v1.**
- **Use WAL mode + daily file backup.**
- **Always pair with FTS5 for hybrid search** — pure-vector retrieval underperforms.
- **Always tag vectors with model + content-hash.**
- **Plan for migration:** when the embedding model changes, re-embed in the background.

## Decision
**ADOPT** — sqlite-vec (embedded) as the v1 vector database. Dedicated servers (Pinecone/Weaviate/Milvus/Qdrant) explicitly **REJECTED** for v1 personal scale; revisit only if MiMo AI goes multi-tenant.

## Sources
- Technology inventory category 25 (Storage) #403 Vector Database (P0), #401 SQLite (P0), #407 Embedded Database (P0), #408 Prisma ORM (P0).
- `docs/PROJECT_UNDERSTANDING.md` §11 (Infrastructure: "vector store for embeddings").
- `docs/CAPABILITY_MAP.md` §19 (Vector store — C).
- sqlite-vec docs: `https://sqlite-vec.io/`.
- SQLite FTS5 docs: `https://www.sqlite.org/fts5.html`.
- *Inferred:* specific hybrid fusion (RRF), Prisma coexistence pattern, migration plan — designed for this stack.
