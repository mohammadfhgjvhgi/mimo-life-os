# MiMo — Data Architecture
### Phase: Foundation From The Ground Up — ARCH-A (Doc 3/5)

**Status:** Storage strategy, source-of-truth map, indexing, consistency, backups.
**Authority:** Derives from `MiMo_Product_Bible.md` Parts 5 (Memory), 6 (Knowledge), 13.7 (Recent Work), 22 (Security), 26 (Scalability/Evolution). Bound by `MiMo_System_Constitution.md` §5 (Data Ownership) and `MiMo_Domain_Model.md`.
**Method:** Every storage choice answers: what problem does it solve, is the problem real today, can a simpler solution solve it, what operational burden, can it be added later, does it create a new source of truth, does it add failure modes? If a simpler answer exists, it is preferred.
**Labels:** `[CURRENT]` / `[TARGET]` / `[MIGRATION]` / `[FACT]` / `[INFERENCE]` / `[UNKNOWN]`.

---

## 0. The single decision that drives everything else

> **MiMo is single-user, local-first, single-process.** (Bible Part 1.6 principle 6; Part 22.1; Part 26.1)

This single fact eliminates 80% of the storage decisions a typical system faces. There is no multi-writer concurrency. There is no multi-region replication. There is no sharding. There is no consensus protocol. There is no eventual consistency across nodes. There is exactly one writer (the MiMo process) and one reader (the owner).

Everything in this document follows from that fact. When a section says "we use X," the reason is almost always: X is the simplest thing that solves a real problem for one writer + one reader on one machine.

---

## 1. Storage substrate inventory

### 1.1 What we have [FACT — Audit §1.1, §3, §7]

| Substrate | Status today | Use today |
|---|---|---|
| SQLite (`db/custom.db`) via Prisma 6.11 | Demo schema (`User` + `Post` boilerplate) | Nothing real |
| Filesystem | `upload/` (unused), `download/` (README only) | Nothing |
| In-memory (Maps, Sets, Zustand) | All real state | Conversations, memory, tasks, layout, UI |
| EventBus | In-memory pub/sub | Used, but not persisted |
| Vector store | None | — |
| Full-text search | None (`String.includes()` in MemoryEngine — Audit §3.3) | — |
| Graph store | None (only `MemoryRelation` type) | — |
| Cache | None | — |
| Backup | None | — |

### 1.2 What we will have [TARGET]

| Substrate | Use | Why this substrate |
|---|---|---|
| **SQLite** (single file) via Prisma | All relational data: conversations, messages, memory, knowledge, tasks, executions, artifacts metadata, files metadata, layout, audit log, events, policies, trust ledger | Single-file, transactional, FTS5 + JSON + vector extensions, zero ops, survives crashes |
| **Filesystem** | Artifact content blobs, project-scoped files, backups | Large blobs don't belong in SQLite; filesystem is faster + simpler for streaming |
| **SQLite `Embedding` table** (with sqlite-vec or in-process HNSW) | Vector embeddings of memories + entities | Single-file, no separate process, no new failure mode |
| **SQLite `Event` table** (append-only) | Audit log + event sourcing for devMode time-travel | One database, transactional with the data it describes |
| **In-memory Maps/Sets** | Registries (rebuilt at boot), PolicyEngine cache, UserModel cache, ContextObject (per-turn), EventBus fan-out | Latency; rebuilt from SQLite on boot |
| **Zustand client store** (write-through) | UI render cache | Renders from cache; writes go to API → SQLite |
| **OS Keychain** | API keys, encryption keys | Bible Part 22.3 — never in plaintext |

### 1.3 What we will NOT have [TARGET — explicit rejection]

| Substrate | Why rejected |
|---|---|
| **PostgreSQL** | Single-user; SQLite is simpler, zero-ops, single-file. PG adds a process to manage, backup, restore. Adds nothing MiMo needs. |
| **Elasticsearch / Meilisearch / Typesense** | Single-user scale (10k items — Bible 26.1). SQLite FTS5 handles this trivially. Separate server = new failure mode + new source of truth. |
| **Pinecone / Weaviate / Qdrant / Chroma** | Same scale argument. sqlite-vec or in-process HNSW handles 10k vectors at <50ms query. Separate server = new failure mode. |
| **Neo4j / ArangoDB / Dgraph** | Bible Part 6.5 explicitly says "in-memory entity + relationship store." 1k entities (Bible 26.1) fits trivially in memory; persisted to SQLite. |
| **Redis / Memcached** | Single-process; Map/Set is faster. Cache invalidation logic is the hard part, not cache lookup. |
| **Kafka / NATS / RabbitMQ** | Single-process. EventBus (in-memory + persisted to SQLite) suffices. Adding a broker creates 5 new failure modes for zero benefit. |
| **S3 / cloud blob storage** | Local-first (Bible 22.1). Filesystem + optional E2E cloud backup suffices. |
| **MongoDB** | Relational fits MiMo better (typed entities, foreign keys, soft-delete cascades). Document DB buys nothing. |

**Justification for rejection rule:** each rejected substrate adds (a) a process to run, (b) a backup strategy to maintain, (c) a new consistency model to reconcile, (d) a new failure mode to handle. None of them solve a problem MiMo has. If MiMo ever hits a scale where one is needed, it can be added behind the Repository interface (Constitution §5.4) without breaking business logic.

---

## 2. Source of truth per data class

[Constitution §5.1 — every class of data has exactly one source of truth.]

| Data class | Source of truth | Caches (explicit, with invalidation) |
|---|---|---|
| User identity + preferences | SQLite `User` row (singleton) | Zustand `uiStore.user` (write-through; invalidated on `/api/me` poll or explicit refresh) |
| Workspace settings | SQLite `Workspace` row | Zustand `uiStore.settings` (write-through) |
| Project list | SQLite `Project` table | Zustand `workspaceStore.projects` (invalidated on `PROJECT_CREATED` / `PROJECT_ARCHIVED` events) |
| Active project | SQLite `Workspace.activeProjectId` | Zustand `workspaceStore.activeProjectId` (write-through) |
| Conversation list (per project) | SQLite `Conversation` table | Zustand `conversationStore.conversations` (invalidated on `CONVERSATION_*` events) |
| Messages (per conversation) | SQLite `Message` table | Zustand `conversationStore.messages[conversationId]` (write-through; streaming appends; invalidated on `MESSAGE_CREATED` for other tabs) |
| Memory | SQLite `Memory` table | In-memory recall index in MemoryEngine (rebuilt on boot; invalidated on `MEMORY_*` events) |
| Memory embeddings | SQLite `Embedding` table | None (loaded into sqlite-vec on query) |
| Knowledge entities | SQLite `Entity` table | In-memory graph in KnowledgeEngine (rebuilt on boot; invalidated on `ENTITY_*` events) |
| Knowledge relationships | SQLite `Relationship` table | In-memory edges in KnowledgeEngine |
| Artifacts (metadata) | SQLite `Artifact` table | Zustand `workspaceStore.artifacts` (write-through) |
| Artifact content blobs | Filesystem `~/.mimo/projects/<projectId>/artifacts/<artifactId>/v<n>.<ext>` | None (read on demand) |
| Files (metadata) | SQLite `File` table | None |
| File content | Filesystem `~/.mimo/projects/<projectId>/files/<fileId>` | None |
| Tasks | SQLite `Task` table + `TaskStateChange` | EventBus transient state; ExecutionTrace UI |
| Executions | SQLite `Execution` + `ExecutionStep` | None |
| Workflows | SQLite `Workflow` table | None (devMode time-travel reads from table) |
| Context (per-turn) | In-memory only (built per turn) | DevMode snapshots → SQLite `ContextSnapshot` (opt-in) |
| Events / audit log | SQLite `Event` table (append-only) | EventBus in-memory fan-out |
| Notifications | SQLite `Notification` table | Zustand `uiStore.notifications` (write-through) |
| Permissions | SQLite `Permission` table | PolicyEngine in-memory cache (invalidated on `PERMISSION_GRANTED` / `PERMISSION_REVOKED`) |
| Trust ledger | SQLite `TrustLedgerEntry` table | PolicyEngine in-memory cache (invalidated on `TRUST_*` events) |
| Layout state | SQLite `LayoutState` row (per project) | Zustand `workspaceStore.layout` (write-through, debounced 500ms) |
| Registries (tools, agents, models) | Code (rebuilt at boot) | None |
| Plugin registrations | SQLite `Plugin` table | In-memory registry (rebuilt on boot from table) |
| API keys | OS Keychain | None (read on demand; never cached in process memory for >5min) |
| Encryption keys | OS Keychain (master) + derived per-row keys | None |

### 2.1 [CURRENT] violations

- **MemoryEngine in RAM** (Audit §3.2) — not persisted; source of truth is "whatever is in the Map at this moment," which is lost on restart. Constitution violation F7 (duplicated source of truth with `INITIAL_MEMORIES`).
- **`INITIAL_MEMORIES` in `lib/nova/constants.ts`** (Audit §16 #16) — second source of truth for memory. Must be deleted in M3.
- **Zustand `conversations` array** (Audit §5.2) — source of truth for conversations; should be a cache of SQLite.
- **EventBus not persisted** (Audit §3.2) — no audit trail; violates Bible 22.9.

### 2.2 [TARGET] invariants

1. **Every Zustand store is a write-through cache.** UI writes go: Zustand → API route → Repository → Prisma → SQLite. On success, the Zustand state is updated optimistically (Bible Part 20.7) and confirmed by event. On failure, the Zustand state is rolled back.
2. **Every in-memory engine reads from SQLite on boot.** No "seeded" data in code.
3. **No code-defined constant is a source of truth for domain data.** Constants are for enums, IDs of built-ins (Agent, Tool, Model IDs), and design tokens — never for conversations, memories, tasks, etc.

---

## 3. Schema design

### 3.1 SQLite + Prisma [TARGET]

Prisma is the ORM (Bible Part 27.1). Schema lives in `prisma/schema.prisma`. Migrations via `bun run db:push` initially (acceptable for single-user with documented data loss), then `prisma migrate` once schema stabilizes (Bible Part 26.7 — "migrations automated, backward-compatible").

### 3.2 Schema shape (high-level)

```
// Identity & scoping
User              (singleton)
Workspace         (singleton)
Project           (N)
  LayoutState     (1:1 per project)
  AgentState      (N — per project, per agent)

// Conversation spine
Conversation      (N — belongs to Project)
  Message         (N — belongs to Conversation; append-only)
  Workflow        (N — belongs to Conversation; one per user turn)
    Task          (N — belongs to Workflow)
      Execution   (N — belongs to Task; one per attempt)
        ExecutionStep (N — belongs to Execution)
      Plan        (1:1 embedded as JSON)

// Memory & knowledge
Memory            (N — belongs to Project or global)
  MemoryEdit      (N — append-only)
  MemoryRelation  (N — edges between memories)
  Embedding       (N — one per embedding model per memory)
Entity            (N — belongs to Project or global)
  EntityChange    (N — append-only)
Relationship      (N — edges between entities)
Source            (N — global; dedup on kind+ref)

// Artifacts & files
Artifact          (N — belongs to Project)
  ArtifactVersion (N — append-only; content in filesystem)
File              (N — belongs to Project; content in filesystem)

// Security
Permission        (N — per subject/action/resource)
Policy            (1 — default; N — per-project override)
TrustLedgerEntry  (N — per project+taskType+sandboxMode)

// Observability
Event             (N — global, append-only)
Notification      (N — global, belongs to User)
Plugin            (N — global)

// v2 (deferred)
Schedule          (N — daemon triggers)
```

### 3.3 Key column rules [TARGET]

1. **Every table has:** `id` (UUID or deterministic), `createdAt` (ms epoch), `updatedAt` (ms epoch), `deletedAt` (nullable, for soft delete).
2. **Every user-owned table has:** `ownerId` (FK to User, even though there's one user — future-proofs multi-user mode without changing schema).
3. **Every system-owned table has:** `createdBy` (agent ID or "system") + `createdVia` (workflow ID).
4. **Foreign keys are real** (Prisma enforces; SQLite has FK support on by default in Prisma's connection).
5. **JSON columns** are used only for genuinely unstructured data (Entity.properties, Memory.metadata, Plan.steps, ExecutionStep.input, ExecutionStep.output). All structured data is in typed columns.

### 3.4 Indexing strategy [TARGET — Bible Part 26.3]

| Table | Index |
|---|---|
| Project | `(slug)` unique; `(archivedAt)` for "active" filter |
| Conversation | `(projectId, updatedAt)` for "recent"; `(projectId, isPinned)` for pinned lookup |
| Message | `(conversationId, sequenceNumber)` unique; FTS5 virtual table `MessageFTS(content)` |
| Memory | `(projectId, type)`; FTS5 `MemoryFTS(content)`; `(memoryId, modelId)` on Embedding |
| Entity | `(projectId, type)`; `(projectId, nameLower)`; `(projectId, aliasLower)` (joined on EntityAlias table) |
| Relationship | `(fromId, toId, type)` unique; `(fromId)`; `(toId)` |
| Artifact | `(projectId, updatedAt)` |
| ArtifactVersion | `(artifactId, versionNumber)` unique |
| File | `(projectId, path)` unique |
| Task | `(workflowId, state)` |
| Execution | `(taskId, attemptNumber)` unique |
| ExecutionStep | `(executionId, sequenceNumber)` |
| Event | `(createdAt)`; `(type, createdAt)`; `(correlationId)`; `(entityType, entityId)` |
| Notification | `(userId, createdAt, dismissedAt)` |
| Permission | `(subjectType, subjectId, action)` |
| TrustLedgerEntry | `(projectId, taskType, sandboxMode)` unique |
| Plugin | `(pluginId, version)` unique |

### 3.5 Full-text search (FTS5) [TARGET]

- **One FTS5 virtual table per searchable text class:** `MessageFTS`, `MemoryFTS`, `ArtifactFTS` (title + content), `FileFTS` (name).
- Triggers sync inserts/updates/deletes from the parent table.
- tokenizer: `unicode61` with `remove_diacritics 2` (Arabic + English support — Bible Part 1.8 RTL primary).
- Ranking: BM25 (built into FTS5).
- Query: `SELECT * FROM MessageFTS WHERE MessageFTS MATCH ? ORDER BY bm25(MessageFTS) LIMIT 50`.

### 3.6 Vector search [TARGET — Bible Part 6.9]

- **Embedding model:** configurable (default: provider embedding endpoint, e.g., ZAI/OpenAI). Local model (e.g., `bge-small-en`) supported via adapter.
- **Storage:** `Embedding` table keyed by `(entityType, entityId, modelId, modelVersion)`. `vector` column as BLOB (Float32 array).
- **Index:** sqlite-vec (if available) or in-process HNSW (rebuilt on boot from `Embedding` rows). 10k vectors @ 384 dims = ~15MB — trivial for in-memory.
- **Query:** cosine similarity, top-N (default 10), with type filter.
- **Re-embedding:** when an embedding model is upgraded, mark all rows `stale=true`; re-embed lazily on next recall or in background.

### 3.7 Graph relationships [TARGET — Bible Part 6.5]

- **No graph DB.** SQLite tables `Entity` + `Relationship` are the canonical store.
- **In-memory graph** rebuilt on boot: `Map<entityId, Entity>` + `Map<entityId, Set<Relationship>>`.
- **Traversal:** `retrieveRelated(entityId, depth)` walks the in-memory graph (BFS, depth-capped).
- **Co-occurrence discovery:** `discoverRelations()` scans recent memories for co-mentioned entities; proposes Relationships (subject to consolidation rules — Bible 5.5).

### 3.8 JSON columns [TARGET]

Used sparingly. Each JSON column has a documented schema (in `core/types.ts` as a TypeScript interface) and is validated on write by the Repository.

| Table.column | Schema |
|---|---|
| `Memory.metadata` | `Record<string, unknown>` (Bible 5.8 — proficiency, priority, deadline, category) |
| `Entity.properties` | `Record<string, unknown>` (Bible 6.3) |
| `Entity.aliases` | `string[]` (Bible 6.3) — stored as JSON, indexed via `EntityAlias` table for query |
| `Task.plan` | `Plan` interface (steps + dependencies) |
| `ExecutionStep.input` / `output` | `unknown` (validated by tool schema) |
| `LayoutState.tabs` | `Tab[]` (id, type, projectId, scrollX/Y, width) |

---

## 4. Consistency model

### 4.1 Single-writer [FACT — Bible 26.1]

MiMo is single-user single-process. The Prisma client is the only writer. There is no concurrent multi-writer problem.

### 4.2 Transaction boundaries [TARGET]

| Operation | Transaction? | Why |
|---|---|---|
| Create a Message + update Conversation.updatedAt | YES (single tx) | They must be consistent |
| Create a Memory + emit `MEMORY_CREATED` event | YES (event row in same tx) | Constitution §12.2 — events emitted after write commits, in the same tx |
| Update an Entity + append EntityChange | YES | Atomic history |
| Create an ArtifactVersion + write content blob | NO (two-phase: blob first, then row) | Blob write is slow; row references blob hash; if blob fails, no row; if row fails, blob is orphaned (GC reclaims) |
| Append to Event log | YES (always single-row tx) | Append-only; no contention |
| Bulk re-embed Memories | NO (batch, one tx per row) | Long tx would block UI queries |
| Soft-delete Project + cascade | YES | Cascade must be atomic |

### 4.3 Concurrency [TARGET]

- **WAL mode** on SQLite (default in Prisma) → readers don't block the writer.
- **One write at a time** (SQLite default) — acceptable for single-user scale.
- **Long writes are split:** e.g., bulk re-embedding is N small transactions, not one big one.

### 4.4 Optimistic UI [TARGET — Bible Part 20.7]

UI writes go through this path:
1. Component dispatches intent to Zustand store.
2. Store updates optimistically (UI re-renders immediately).
3. API route is called (async).
4. On success: store confirms (no-op, already in desired state) + emits event for other tabs.
5. On failure: store rolls back + Notification shown (Bible Part 24.9).

This is the only "eventual consistency" in MiMo — between optimistic update and API confirmation. It is bounded (<500ms target — Bible Part 20.2).

---

## 5. Caching

### 5.1 Cache policy [TARGET — Constitution §5.5]

Every cache declares: `source`, `invalidation`, `fallback`.

| Cache | Source | Invalidation | Fallback on miss |
|---|---|---|---|
| UserModel (aggregated) | `Entity` + `Memory` tables | Event-driven: any `ENTITY_*` or `MEMORY_*` event | Re-aggregate from tables (slow path, <200ms) |
| Knowledge retrieval per query | `Entity` + `Relationship` | TTL 6s (Bible 26.4) | Re-query |
| Workspace API response | All workspace tables | TTL 6s (Bible 26.4) | Re-query |
| PolicyEngine decision cache | `Permission` + `TrustLedger` | Event-driven: `PERMISSION_*`, `TRUST_*` events | Re-evaluate |
| Conversation rendered messages | SQLite `Message` | Append-only; invalidate last-N on `MESSAGE_CREATED` for current conversation | Re-fetch |
| MemoryEngine recall index | `Memory` + `Embedding` | Event-driven: `MEMORY_*` events | Re-build on boot |
| KnowledgeEngine graph | `Entity` + `Relationship` | Event-driven: `ENTITY_*`, `RELATIONSHIP_*` events | Re-build on boot |

### 5.2 What is NOT cached [TARGET]

- Artifact content blobs (always read from filesystem on demand).
- File content (always read from filesystem).
- API keys (always read from keychain on demand, never cached >5min).
- Event log (always read fresh — append-only, no cache benefit).

### 5.3 [CURRENT] state

No cache layer exists (Audit §3.7). Workspace API re-queries every 6s poll.

---

## 6. Temporary execution state

### 6.1 What is temporary [TARGET]

- **ContextObject** (per-turn): built in memory, dropped after the turn (unless devMode snapshot enabled).
- **Streaming buffers** (token stream from model): in-memory, flushed to `Message.content` on stream complete.
- **ExecutionTrace UI state**: derived from Events; in-memory in Zustand.
- **Agent runtime state**: in `AgentState` row (persisted) for cross-session, plus ephemeral in-memory state during a run.

### 6.2 Crash recovery [TARGET — Bible Part 22.13]

- **In-flight Workflow:** on crash, marked `failed` on next boot (a Workflow with `state=executing` and no heartbeat for >5min is auto-failed).
- **Streaming message:** on crash, partial `Message` row kept with `state=streaming`; on next boot, marked `interrupted`; UI offers "resume" or "discard."
- **Optimistic UI writes:** if the API call didn't complete before crash, the optimistic state is rolled back on next load (Zustand reads from SQLite, not from itself).

### 6.3 [CURRENT] state

No crash recovery exists. Hard refresh loses in-flight streaming.

---

## 7. Artifact + file storage

### 7.1 Filesystem layout [TARGET]

```
~/.mimo/
├── mimo.db                        # SQLite (encrypted via SQLCipher or app-level)
├── mimo.db.key                    # Encryption key reference (actual key in OS keychain)
├── backups/
│   ├── daily/
│   │   ├── mimo-2026-01-15.db.gz
│   │   └── ...
│   └── manual/
├── projects/
│   ├── <projectId>/
│   │   ├── mimo.md                # project grounding file (Bible 2.5)
│   │   ├── artifacts/
│   │   │   └── <artifactId>/
│   │   │       ├── v1.<ext>
│   │   │       ├── v2.<ext>
│   │   │       └── meta.json      # thumbnail refs, params
│   │   └── files/
│   │       └── <fileId>           # content blob; filename preserved in DB
│   └── ...
├── plugins/
│   └── <pluginId>/                 # MCP server binaries, configs
├── cache/                          # ephemeral caches (safe to delete)
│   ├── embeddings/                 # in-process HNSW index (rebuilt on boot)
│   └── thumbnails/                 # artifact version thumbnails (regenerable)
└── logs/
    └── mimo.log                    # rotated daily
```

### 7.2 Why filesystem for blobs [TARGET]

- SQLite BLOB columns have a practical limit (~1MB before performance degrades). Artifacts can be multi-MB.
- Filesystem streaming is faster for large content.
- Backup is simpler: copy the directory.
- Versioning is trivial: `v1.<ext>`, `v2.<ext>` files.
- The DB stores metadata + content hash; the FS stores content. Constitution §5.2 — Source of Truth for content is FS; for metadata is DB.

### 7.3 [CURRENT] state

No artifact storage, no file storage (Audit §3.6, §7).

---

## 8. Event storage

### 8.1 Append-only `Event` table [TARGET — Bible Part 22.9]

```
Event
  id              UUID PK
  sequenceNumber  INTEGER (global monotonic, auto-increment)
  type            TEXT (canonical name, e.g., 'MEMORY_CREATED')
  payload         JSON
  source          TEXT (producer module ID, e.g., 'memory:MemoryEngine')
  timestamp       INTEGER (ms epoch)
  correlationId   UUID (workflow ID)
  entityType      TEXT (which entity this event describes)
  entityId        UUID
  actorType       TEXT ('user' | 'agent:<id>' | 'tool:<id>' | 'system')
  actorId         TEXT
  schemaVersion   INTEGER
```

- Append-only. No UPDATE, no DELETE (Bible 22.9 — "never deleted").
- Indexed for: "what happened in this workflow" (`correlationId`), "what happened to this entity" (`entityType, entityId`), "what happened at this time" (`createdAt`), "all events of this type" (`type, createdAt`).
- Old events are **archived** (moved to `EventArchive` table or cold file) after 1 year, NOT deleted.

### 8.2 EventBus ↔ Event table [TARGET]

```
Producer → createEvent() → Repository.writeEvent() [tx with the data write]
                            ↓ commit
                          EventBus.emit() [in-memory fan-out to subscribers]
                            ↓
                          Subscribers (UI via SSE/poll, audit view, devMode)
```

Constitution §12.2: event is written in the same transaction as the data change. After commit, EventBus fans out in-memory. If a subscriber is slow, it does not block the producer (fire-and-forget per EventBus.ts current behavior — Audit verified).

### 8.3 [CURRENT] state

EventBus is in-memory only (Audit §3.2). No persistence.

---

## 9. Migrations + versioning

### 9.1 Schema versioning [TARGET — Bible Part 26.7]

- `prisma/schema.prisma` is the source of truth for schema.
- Migrations live in `prisma/migrations/` (currently absent — Audit §3.1).
- v1: `bun run db:push` (acceptable; documented data loss only on demo boilerplate).
- Post-v1: `prisma migrate dev` for schema changes, `prisma migrate deploy` for production.

### 9.2 Backward compatibility [TARGET — Bible Invariant 10]

- **No column drops without 30-day grace.** When a column is deprecated: (1) stop writing it, (2) keep reading for 30 days (backward compat), (3) drop in a migration after grace.
- **No type changes without a migration path.** New column added; old column kept; data migrated lazily on read.
- **No rename without an alias.** Old name keeps working as an alias for 30 days.

### 9.3 Embedding versioning [TARGET]

- `Embedding` table has `modelId` + `modelVersion`. New embedding model = new rows, not overwrites.
- Old embeddings are kept until all consumers (recall, knowledge retrieval) confirm the new model works.
- Re-embedding is lazy (on next recall) or background (daemon mode, v2).

### 9.4 Plugin versioning [TARGET — Bible Part 25.7]

- MCP protocol versioned.
- Plugin's declared schema versioned.
- Old plugin versions keep working (Bible 25.7 — backward-compatible).

---

## 10. Backup + recovery

### 10.1 Backup strategy [TARGET — Bible Part 22.12]

| Type | Frequency | Location | Retention |
|---|---|---|---|
| **Local daily backup** | Daily at 03:00 (configurable) | `~/.mimo/backups/daily/` | 30 daily backups rolling |
| **Local manual backup** | Owner-triggered (Settings) | `~/.mimo/backups/manual/` | Until owner deletes |
| **Cloud backup (opt-in)** | Daily, if enabled | E2E encrypted, owner-chosen destination | Until owner deletes |
| **Pre-migration backup** | Before every `prisma migrate` | `~/.mimo/backups/pre-migration/<timestamp>/` | 90 days |

### 10.2 Backup contents [TARGET]

- SQLite file (closed cleanly via `VACUUM INTO` or Prisma's backup helper).
- Project directories (artifacts + files).
- Keychain references (NOT keys themselves — those live in keychain, restored separately).
- `mimo.md` per project.

### 10.3 Recovery strategy [TARGET — Bible Part 22.13]

- **Crash recovery:** on next boot, MiMo opens SQLite (WAL ensures consistency), checks for in-flight Workflows (auto-fail), restores UI layout from `LayoutState`.
- **Data corruption:** `PRAGMA integrity_check` on boot; if fails, offer restore from latest backup.
- **Disk failure:** restore from cloud backup (if enabled) on new device; else, restore from local backup.
- **Accidental delete:** soft-delete grace period (30 days for projects/conversations/artifacts; 7 days for "Delete Everything").

### 10.4 [CURRENT] state

No backups (Audit §7).

---

## 11. Encryption + secrets

### 11.1 At rest [TARGET — Bible Part 22.2]

- **SQLite encrypted** via SQLCipher (preferred — transparent to Prisma) OR app-level encryption of sensitive columns (fallback if SQLCipher not available on platform).
- **Master encryption key** stored in OS keychain (macOS Keychain / Windows Credential Manager / Linux Secret Service).
- **Filesystem blobs** encrypted with derived per-project keys (so sharing/exporting one project doesn't require decrypting all).

### 11.2 In transit [TARGET]

- TLS for all external API calls (provider SDKs handle this).
- No internal TLS needed (single-process; `localhost` is the only endpoint).

### 11.3 E2E cloud sync [TARGET — Bible Part 22.2, opt-in off by default]

- If enabled, owner's data is encrypted client-side with a key the server never sees.
- Sync protocol: append-only event log sync (events are already append-only); conflicts resolved by last-write-wins on data rows + manual merge on conflicts.

### 11.4 Secrets [TARGET — Bible Part 22.3]

- API keys: OS keychain only. Never in `.env` in production. Never in code.
- `.env` is dev-only (Bible 22.3).
- Keychain access via `core/infrastructure/keychain/*Adapter.ts` (adapter pattern — per-OS).

### 11.5 [CURRENT] state

- `.env` has only `DATABASE_URL` (Audit §9.4). No API keys in env (ZAI SDK doesn't require one in this sandbox).
- No encryption at rest (Audit §9.3).

---

## 12. Data export + deletion

### 12.1 Export [TARGET — Bible Part 22.10]

- Settings → Export → produces a `.mimo-export.tar.gz` containing:
  - `data.json` (all SQLite tables as JSON arrays).
  - `markdown/` (all conversations + messages as Markdown).
  - `artifacts/` (all artifact versions as files).
  - `files/` (all project files).
  - `manifest.json` (schema version, export date).
- One click. Owner can take their data anywhere (Bible 22.10).

### 12.2 Deletion [TARGET — Bible Part 22.11]

| Delete target | Path |
|---|---|
| Single Memory | One-click hard delete (Bible 5.12). Cascade: MemoryEdits, MemoryRelations, Embedding rows. |
| Single Message | Soft-delete (30-day grace). Hard delete with conversation. |
| Conversation | Archive (30-day grace). Hard delete: cascade Messages, Workflows, Tasks, Executions, Events (archived). |
| Artifact | Soft-delete (30-day grace). Hard delete: ArtifactVersions, content blobs. |
| Project | Archive (30-day grace). Hard delete: cascade all scoped children. |
| All data ("Delete Everything") | Requires confirmation + 7-day grace. Then: drop all tables, delete all blobs. |

---

## 13. Performance targets + scale

### 13.1 Single-user scale targets [TARGET — Bible Part 26.1]

| Metric | Target |
|---|---|
| Conversations | 10,000+ without lag |
| Memory entries | 10,000+ with <50ms semantic recall |
| Knowledge entities | 1,000+ with <20ms graph traversal (depth 3) |
| Messages per conversation | 1,000+ at ≥50fps render (virtualization) |
| Artifacts per project | 1,000+ without dock lag |
| Event log size | 1M+ events with <100ms filtered query |

### 13.2 Query performance budget [TARGET]

| Query | Budget | Strategy |
|---|---|---|
| Open conversation | <100ms | Indexed `(projectId, updatedAt)`; FTS5 for search |
| Recall top-10 memories (semantic) | <50ms | sqlite-vec / HNSW index; type filter pre-applied |
| Recall top-10 memories (FTS) | <20ms | FTS5 BM25 |
| Knowledge graph traversal (depth 3) | <20ms | In-memory graph |
| Workspace API (sidebar poll) | <100ms | Cached 6s; aggregated query |
| Search across everything | <200ms | Parallel FTS5 across MessageFTS, MemoryFTS, ArtifactFTS, FileFTS |

### 13.3 [CURRENT] performance risks (Audit §11)

- No virtualization (perf cliff at 1000+ messages).
- 6s polling (wasteful + latent).
- O(n) MemoryEngine recall.
- No cache.
- Broken dev server.

These are addressed by the migration plan (Constitution §14.1) — virtualization (M9), real streaming (M9), persisted Memory + indexed recall (M3), cache (M4+).

---

## 14. Operational burden

### 14.1 What MiMo adds to the owner's machine [TARGET]

| Resource | Size (typical) | Notes |
|---|---|---|
| SQLite DB | 50–500 MB (10k conversations + 10k memories + 1k entities + 1M events) | WAL mode keeps reads fast |
| Embeddings | ~50 MB (10k vectors @ 384 dims) | Loaded into HNSW on boot |
| Artifact blobs | unbounded | Owner-managed; quota per-project optional |
| Logs | ~10 MB/day | Rotated daily |
| Backups | ~50–500 MB daily | 30-day rolling |

### 14.2 What MiMo does NOT add [TARGET]

- No background daemon (v1; v2 daemon is opt-in per Schedule entity).
- No system services / launch agents (v1).
- No network listeners other than the Next.js dev server (production builds would bundle as Electron/Tauri — future, out of scope).
- No cloud dependencies (unless owner opts into E2E sync).

---

## 15. Open questions

1. **[UNKNOWN]** SQLCipher vs. app-level column encryption. SQLCipher is transparent but adds a native dependency (compilation per platform). App-level encryption is portable but requires careful schema design (which columns are sensitive). **Decision deferred to M2** — try SQLCipher first; fall back if it complicates packaging.
2. **[UNKNOWN]** Whether to use `sqlite-vec` (native extension, requires compilation) or a pure-JS HNSW (slower but portable). **Decision:** pure-JS HNSW in v1; switch to sqlite-vec if scale requires (10k+ vectors is fine for pure JS).
3. **[UNKNOWN]** Whether the `Event` table grows unbounded. At 1M events/year (generous estimate for single-user), SQLite handles it. Archival to file after 1 year, but queryable on re-import. **Decision:** archive-after-1-year, keep meta-row in DB pointing to archive file.
4. **[UNKNOWN]** Whether to use Prisma's full-text search or raw SQL FTS5. Prisma doesn't natively support FTS5; raw SQL is needed. **Decision:** raw SQL via `prisma.$queryRaw` for FTS queries; Prisma for everything else. Documented as a known limitation.
5. **[UNKNOWN]** How cloud E2E sync resolves conflicts on the same Memory edited on two devices. **Decision:** last-write-wins on data; events are append-only so no conflict; UI surfaces "edited on two devices, kept the latest" notification.

---

## 16. Summary

MiMo's data architecture is deliberately boring. It is:

- **One SQLite file** for all relational data, accessed via Prisma, wrapped in Repositories.
- **One filesystem tree** (`~/.mimo/`) for blobs, backups, project files, logs.
- **One OS keychain** for secrets.
- **In-memory caches** that are explicitly labeled, with documented invalidation, rebuilt from SQLite on boot.
- **No external servers** — no Postgres, no Redis, no Pinecone, no Neo4j, no Kafka. Each rejected because it adds operational burden + a new source of truth + new failure modes without solving a real single-user problem.

The architecture respects:
- **Constitution §5.1** — one source of truth per data class.
- **Constitution §5.4** — Repositories are the only Prisma consumers.
- **Constitution §12.2** — events emitted in same transaction as the data write.
- **Bible Part 22** — local-first, E2E optional, audit-grade event log.
- **Bible Part 26.1** — single-user scale (10k conversations, 10k memories, 1k entities).

The migration from [CURRENT] (in-RAM everything) to [TARGET] (persisted everything) is sequenced in Constitution §14.1 as M2 (schema) → M3 (Memory persistence) → M4 (event log) → M5 (policies) → M6 (knowledge) → M8 (artifacts) → M9 (streaming + virtualization).

**End of Data Architecture.**
