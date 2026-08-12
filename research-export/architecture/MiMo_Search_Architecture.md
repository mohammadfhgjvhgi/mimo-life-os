# MiMo — Search Architecture

**Task ID:** ARCH-C / Doc 3 of 7
**Phase:** Foundation From The Ground Up
**Status:** ARCHITECTURE (no implementation). Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible Part 14 (Search), Part 15.1 (Command Palette), Part 26.3 (Indexed Retrieval). Current System Audit §3.3 (no FTS5), §3.4 (no vector search), §1.4 (UniversalSearch exists).
**Scope:** ONE search across the whole MiMo system. Not 8 search systems. Not 8 mental models.

> **Architectural rule.** Search is one surface with one input, one ranking model, one result schema, and one explanation grammar. Different **kinds** of results (conversations, memory, knowledge, artifacts, files, commands, projects, agents, entities) are facets of the SAME search — not separate systems. Bible Part 14.1 is authoritative.

---

## 1. Why one search (not eight)

[FACT] Bible Part 14.1: "ONE search (not separate search pages)." Bible Invariant 29: "No second command palette. ONE palette with prefix grammar." Bible Invariant 35: "One model per dimension."

If we built 8 search systems — one per data kind — we would have:
- 8 indexes to keep consistent.
- 8 ranking models that disagree.
- 8 result shapes the owner must learn.
- 8 places where permissions / scope / recency must be re-implemented.
- 8 sources of bugs.

That is exactly the anti-pattern Bible Part 14.1 rejects. **One search, eight facets.**

[CURRENT] Audit §1.4 + §3.3 confirm: `UniversalSearch` exists and queries conversations (client-side substring), memory (via API), knowledge (via API), and commands. **No FTS5, no vector search, no indexing, no ranking model, no fuzzy, no semantic, no result explanation.** Substring matching on the client.

---

## 2. Search surfaces

Bible Part 14.6: "Search accessible from `⌘/`, `⌘K`, Rail Search icon, Top bar Search icon — all open the same overlay."

| Surface | Trigger | Same overlay? |
|---|---|---|
| Universal Search | `⌘/` | YES |
| Command Palette | `⌘K` (with prefix grammar) | YES |
| Rail Search icon | click | YES |
| Top bar Search icon | click | YES |
| In-conversation `@mention` | `@` in composer | YES (scoped to type) |
| In-conversation `#file` | `#` in composer | YES (scoped to files) |
| In-conversation `/slash` | `/` in composer | YES (scoped to slash blocks) |

**Invariant S-1.** There is one search overlay component. All entry points route to it. Different triggers may pre-set the active facet or prefix, but never open a different component.

### 2.1 Searchable kinds (facets)

Bible Part 14.1 + Inference for the full set:

| Kind | Source | Indexed? | Default facet |
|---|---|---|---|
| conversation | `Conversation` + `Message` tables | FTS5 + recency | YES |
| memory | `Memory` table (Part 5) | FTS5 + vector + type | YES |
| knowledge entity | `KnowledgeEntity` (Part 6) | FTS5 + graph neighbors | YES |
| artifact | `Artifact` + `ArtifactVersion` (Artifact Arch §12) | FTS5 + type | YES |
| file | virtual FS (Bible Part 22.5) | filename + path + content (opt-in) | YES |
| command | command registry | name + alias | YES |
| project | `Project` table | name + accent | YES |
| agent | agent registry | name + role | YES |
| entity (graph node) | subsumed by `knowledge entity` | — | — |

"entity search" in the task description is the **knowledge entity** facet (Bible Part 6.3). It is not a separate system; it is a facet with graph-aware ranking (§5.3).

---

## 3. Indexing

### 3.1 Index strategy

Three index types coexist; each kind uses one or more.

| Index type | Engine | Used by | Why |
|---|---|---|---|
| Full-text | SQLite FTS5 (built-in) | conversations, memory, knowledge, artifacts (text types), files (opt-in) | Sub-100ms on local SQLite, no external deps, supports BM25 ranking, prefix queries, and snippet highlighting |
| Vector | SQLite `sqlite-vec` extension OR a local `hnswlib` index | memory (semantic), knowledge entities (semantic) | Semantic recall ("things related to X conceptually") that FTS misses |
| Graph | adjacency lists in SQLite (`KnowledgeEdge` table) | knowledge entities | "entities linked to X" — graph traversal ranking |
| Trie / prefix | built-in via FTS5 prefix tokenization | commands, projects, agents | Fast typed-prefix matches (`⌘K > fo...` → "Focus Mode") |

[FACT] SQLite FTS5 is shipped with SQLite (which Prisma uses). `sqlite-vec` is a small extension; `hnswlib` is a single-file WASM-runnable library. No external service.

**Invariant S-2.** No external search service (no Elasticsearch, no Typesense, no Meilisearch, no Algolia). Bible Part 22.1 — local-first. Every search runs against local SQLite.

### 3.2 FTS5 schema (per kind)

Each kind has its own FTS5 virtual table to keep column sets clean:

```sql
-- conversations
CREATE VIRTUAL TABLE conv_fts USING fts5(
  title, summary, content, project_id UNINDEXED,
  tokenize = 'porter unicode61'
);

-- messages (one row per message)
CREATE VIRTUAL TABLE msg_fts USING fts5(
  body, conversation_id UNINDEXED, role UNINDEXED, ts UNINDEXED,
  tokenize = 'porter unicode61'
);

-- memory
CREATE VIRTUAL TABLE mem_fts USING fts5(
  title, content, type UNINDEXED, source UNINDEXED, ts UNINDEXED,
  tokenize = 'porter unicode61'
);

-- knowledge entities
CREATE VIRTUAL TABLE ent_fts USING fts5(
  name, aliases, description, type UNINDEXED,
  tokenize = 'porter unicode61'
);

-- artifacts (text types only — markdown, research, plan, code, etc.)
CREATE VIRTUAL TABLE art_fts USING fts5(
  title, content, type UNINDEXED, project_id UNINDEXED, version UNINDEXED,
  tokenize = 'porter unicode61'
);
```

[Bible Part 26.3 — "Memory: indexed by type + full-text search; Knowledge: indexed by type + name + alias; Conversations: indexed by title + full-text; Files: indexed by name."]

### 3.3 Vector index

```sql
-- memory embeddings (only Memory + Knowledge have vectors; conversations/artifacts do NOT — cost/size)
CREATE TABLE mem_vec (
  mem_id TEXT PRIMARY KEY,
  embedding BLOB,           -- float32[d=384] — distilled model size
  model TEXT,                -- e.g., "all-MiniLM-L6-v2"
  ts INTEGER
);

CREATE TABLE ent_vec (
  ent_id TEXT PRIMARY KEY,
  embedding BLOB,
  model TEXT,
  ts INTEGER
);
```

- **Embedding model:** `all-MiniLM-L6-v2` (384 dims, ~22 MB ONNX). Runs locally via `onnxruntime-web` in a Web Worker. [INFERENCE — small, fast, open-source.]
- **Index:** brute-force cosine similarity for < 50k vectors (acceptable < 50ms); HNSW for > 50k. [INFERENCE — defer HNSW until needed; SQLite scales fine.]
- **Embeddings computed** on memory create / update, on knowledge entity create, NOT on every conversation message (cost; Bible Part 22.14 — no telemetry, but local compute is not telemetry).
- **Re-embedding on model change:** if the embedding model is updated, a background job re-embeds all rows. Owner sees progress; can cancel.

### 3.4 [CURRENT] — what exists

[FACT] Audit §3.3: "No FTS5, no search index. The MemoryEngine does naive `String.includes()` substring matching." Audit §3.4: "No vector store. No embeddings."

[CURRENT] `UniversalSearch.tsx` queries:
- conversations: in-memory client-side substring on titles + message content.
- memory + knowledge: via `/api/mimo/workspace?q=` API which itself does `String.includes()`.
- commands: in-memory filter on the command registry.

No FTS5, no vector, no graph, no ranking beyond recency. Rebuild needed.

---

## 4. Ranking model

### 4.1 Unified rank score

Every result has a `score ∈ [0, 1]`. Computed as a weighted sum:

```
score = w_relevance * relevance
      + w_recency   * recency
      + w_frequency * frequency
      + w_scope     * scope_match
      + w_kind      * kind_boost
```

Default weights (tunable per project, exposed in Settings):
- `w_relevance` = 0.45 (FTS BM25 score or vector cosine, normalized to [0,1])
- `w_recency` = 0.20 (exponential decay, half-life 7 days)
- `w_frequency` = 0.10 (number of accesses in last 30 days, log-scaled)
- `w_scope` = 0.20 (1.0 if in current project, 0.3 if global, 0 if outside project scope and not globally shared)
- `w_kind` = 0.05 (kind-specific boost — see §4.4)

[Bible Part 14.5: "Ranking: by relevance (fuzzy score) + recency + frequency." — explicitly these three signals; we add scope + kind.]

### 4.2 Relevance normalization

- FTS5 BM25 score: normalized via softmax across result set (so 1.0 = best match, 0.0 = worst).
- Vector cosine: `(cos + 1) / 2` → [0, 1].
- Trie/prefix match: `1.0` for exact, `0.7` for prefix, `0.4` for fuzzy.

### 4.3 Recency

```ts
function recency(ts: number, now: number): number {
  const ageDays = (now - ts) / 86_400_000;
  return Math.exp(-ageDays / 7);   // half-life 7 days
}
```

[Bible Part 14.5 — recency is a first-class signal; Linear pattern.]

### 4.4 Kind boosts (default)

| Kind | Boost | Reason |
|---|---|---|
| command | 1.0 | Commands are intentionally fast to invoke — Bible Part 15.1 |
| conversation | 0.7 | Primary work surface |
| memory | 0.6 | Frequently recalled |
| artifact | 0.7 | First-class objects (Part 11.1) |
| knowledge entity | 0.5 | Slower to consume |
| file | 0.5 | Often the right answer but not the primary surface |
| project | 0.8 | Switching projects is a common action |
| agent | 0.4 | Rare to search by agent |

[INFERENCE — these are starting defaults; tunable in Settings. No telemetry to "learn" them (Bible Part 22.14).]

### 4.5 Graph-aware ranking for knowledge entities

When searching the knowledge facet, entities with more inbound edges from other matched entities get a graph-boost:

```
graph_boost = 0.15 * sigmoid(inbound_edge_count - 2)
```

[INFERENCE — surfaces "hub" entities in a search. Bible Part 6.5 (Knowledge Graph) implies graph-aware retrieval.]

---

## 5. Filters + facets

### 5.1 Facets (Bible Part 14.3)

Results grouped by kind. Each result shows: icon, title, subtitle, kind badge. The result list shows top N per kind (default 3) with a "show all" expansion per kind.

### 5.2 Filters

| Filter | Values | Default |
|---|---|---|
| kind | one or multiple kinds | all |
| project | current / specific / global | current |
| date | today / week / month / year / all | all |
| tag | per-project tag set | none |
| type (within memory) | fact / preference / event / artifact_ref | all |
| type (within artifact) | code / markdown / image / ... | all |
| author | agent-name / owner | all |

### 5.3 Prefix grammar (Bible Part 14.4)

In the Command Palette (`⌘K`):
- `>cmd` — commands facet only.
- `/search` — universal search facet (all).
- `@mem` — memory facet only.
- `#file` — files facet only.
- `!ai` — quick AI (not a search; routes the query to the chat as a prompt).

Prefix is **a facet pre-selector**, not a separate search. Same overlay, same ranking.

---

## 6. Fuzzy + semantic + full-text

### 6.1 Three matching modes coexist

| Mode | When triggered | Engine |
|---|---|---|
| Exact | quotes (`"foo bar"`) | FTS5 phrase query |
| Fuzzy prefix | bare typing | FTS5 prefix query (`foo*`) + trigram fuzzy |
| Semantic | `~` prefix (`~machine learning`) | Vector cosine on memory/knowledge entities |

The owner does not pick a mode explicitly (one input, one mental model — Bible Part 14.1). The prefix grammar picks the mode based on the first character.

### 6.2 Fuzzy implementation

- FTS5 prefix tokenization handles `foo*` natively.
- Trigram fuzzy (e.g., for typos): for queries < 12 chars, generate trigrams; match against an FTS5 trigram index; rank by trigram overlap. [INFERENCE — keeps fuzzy in FTS5; no external library.]
- Spell correction: deferred (Bible Part 14.3 — "filters as you type" implies owner-driven refinement, not auto-correct).

### 6.3 Semantic implementation

- For `~`-prefixed queries: embed the query (same model as memory/knowledge embeddings — §3.3), compute cosine against `mem_vec` and `ent_vec`.
- Result: returns top-K (default 10) memories + entities above a 0.3 cosine threshold.
- Conversations + artifacts + files are NOT searched semantically in v1 (no embeddings for them).
- [INFERENCE — could add later; deferred to keep cost/size in check.]

### 6.4 Combined query example

Query: `"project alpha" ~deploy #file deploy.sh`
- `"project alpha"` → exact phrase on conversation/memory/artifact facets.
- `~deploy` → semantic on memory/knowledge entities.
- `#file deploy.sh` → files facet, exact filename.

The overlay shows three groups (conversation/memory, memory/entity, file) with their scores. [INFERENCE — multi-modal queries supported in v1.]

---

## 7. Permissions + scope

### 7.1 Scope (Bible Part 14.5)

- Default scope: **current project**.
- `⌘⇧/` toggles **global scope**.
- Owner can pin a project in the overlay (top bar) — persists for the session.

### 7.2 Permissions

Single-user: all data is the owner's. No per-user permission filter needed for search. [Bible Part 22.1.]

But there ARE soft filters:
- Archived conversations: hidden by default; toggleable via filter.
- Hidden artifact versions (Artifact Arch §10.4): not searchable.
- Deleted memories (Bible Part 22.11 grace period): not searchable.
- Secrets / forbidden paths (Runtime Arch §6.3): never indexed. The indexer maintains a hardcoded blocklist.

### 7.3 Index isolation

- The search index is **in the same SQLite DB** as the data. No separate index DB.
- Indexer is single-process (MiMo's Node process). No concurrent writers.
- Indexer triggers: row insert/update/delete → FTS5 trigger syncs automatically (SQLite's `fts5` virtual table handles this with `EXTERNAL CONTENT` tables).

---

## 8. Recency + relevance + result explanation

### 8.1 Result explanation (Bible Part 21.4 — Explainability Model)

Every search result has a hover-detail panel showing:
- The matched terms (highlighted in the snippet).
- The relevance score breakdown (`relevance: 0.82, recency: 0.64, frequency: 0.30, scope: 1.00, kind_boost: 0.60 → total: 0.74`).
- The source kind + project + last-modified date.

[PRODUCT DECISION — Bible Invariant 33: "One explainability layer." Search inherits the same explainability contract as the AI.]

### 8.2 Snippet generation

FTS5 `snippet()` function generates a context-windowed snippet (default ±40 chars around the match). For vector matches, the snippet is the entity description (no contextual window — there's no match position).

### 8.3 Highlighting

- Matched terms wrapped in `<mark>` with class `search-match`.
- Fuzzy matches highlighted with `search-match-fuzzy`.
- Semantic matches highlighted with `search-match-semantic` (subtle underline).

---

## 9. Performance

### 9.1 Targets (Bible Part 14.2)

- **< 80ms first open.** [FACT — Bible Part 14.2 explicit.]
- No loading state (Linear's "no spinners because nothing to wait for").
- Renders from local cache.
- Background sync (indexer runs in background; not on the search critical path).

### 9.2 Implementation

- Indexer runs in a Web Worker (Node `worker_threads`) — does not block the main thread or the chat API.
- Search query: SQLite FTS5 query + optional vector query + graph query, all in one round-trip.
- Result cache: last query's results cached for 5s (TanStack Query).
- Index size: ~10% of source data for FTS5; ~384 bytes/vector * row count for vectors. For 10k memories + 1k entities: ~4 MB vector index. [INFERENCE.]

### 9.3 Scale (Bible Part 26.1)

| Kind | Target | Achievable? |
|---|---|---|
| Conversations | 10,000+ | FTS5 handles 100k+ rows in < 50ms |
| Memory | 10,000+ | FTS5 + vector brute-force < 50ms at 10k |
| Knowledge | 1,000+ entities | FTS5 + graph adjacency < 20ms |
| Messages | 1M+ | FTS5 handles; per-message rows |
| Files | 10,000+ | Filename index < 10ms |

[FACT — SQLite FTS5 documented performance. Bible Part 26.1 numbers explicitly within reach.]

---

## 10. UniversalSearch UX contract

[CURRENT] `UniversalSearch.tsx` exists but queries via substring. [TARGET] keeps the same component, swaps the engine.

### 10.1 Component contract (stable interface)

```ts
type SearchResult = {
  id: string;
  kind: SearchResultKind;
  title: string;
  subtitle: string;
  icon: string;
  score: number;
  scoreBreakdown: ScoreBreakdown;
  snippet?: string;
  matchHighlights?: Range[];
  ref: ArtifactRef | ConversationRef | MemoryRef | EntityRef | FileRef | CommandRef | ProjectRef | AgentRef;
  scope: 'current-project' | 'global' | 'outside';
};

type SearchQuery = {
  text: string;
  scope: 'current-project' | 'global';
  filters: SearchFilters;
  limit: number;       // default 50
  explain: boolean;    // include scoreBreakdown (off by default for perf)
};

type SearchResponse = {
  results: SearchResult[];
  totalByKind: Record<SearchResultKind, number>;
  tookMs: number;
  indexVersion: string;
};
```

**Invariant S-3.** The `SearchResult` shape is the SAME for all kinds. The overlay component does not switch on kind to render differently — it renders `icon + title + subtitle + kind badge` for every result.

### 10.2 Keyboard contract (Bible Part 14.3)

- `↑↓` navigate.
- `↵` select.
- `Esc` close.
- `Tab` switches facet focus (cycles through kinds with results).
- `⌘1..9` jump to kind N's first result.

---

## 11. Indexer lifecycle

### 11.1 Triggers

| Event | Indexer action |
|---|---|
| `conversation.created` | FTS5 row in `conv_fts` |
| `message.added` | FTS5 row in `msg_fts` |
| `memory.created` / `memory.updated` | FTS5 row + vector embedding (re-compute if content changed) |
| `entity.created` / `entity.updated` | FTS5 row + vector embedding |
| `artifact.created` / `artifact.version.added` | FTS5 row in `art_fts` (only for text types; image/diagram skip content indexing) |
| `file.added` | FTS5 row in `file_fts` (filename only; content index opt-in) |
| `entity.edge.added` / `entity.edge.removed` | graph adjacency update (no FTS row) |
| `*..deleted` | FTS5 row deleted (via `EXTERNAL CONTENT` trigger) |

### 11.2 Background processing

- The indexer is a **queued background worker** (not on the chat critical path).
- Events arrive via EventBus; indexer's queue is persisted to SQLite (so a crash mid-index can resume).
- A `indexer.lag` metric is exposed in DeveloperPanel — should stay < 100ms in steady state.

### 11.3 Re-index on schema change

- If MiMo ships an embedding-model change, a `reindex.all` job is queued. Owner sees progress in DeveloperPanel. Can defer / cancel.
- FTS5 schema changes (new columns) require `DROP` + `CREATE` + `INSERT` cycle. Auto-handled by the indexer migration code.

---

## 12. [CURRENT] vs [TARGET] vs [MIGRATION]

### 12.1 [CURRENT]

[FACT] Audit §1.4, §3.3, §3.4:
- `UniversalSearch.tsx` component exists; queries conversations client-side via substring.
- Memory + knowledge searched via `/api/mimo/workspace?q=` API which uses `String.includes()`.
- Commands searched via registry filter.
- No FTS5, no vector, no graph, no ranking beyond recency sort.
- No prefix grammar beyond what the Command Palette (`cmdk` library) provides natively.
- No result explanation, no score breakdown.
- No filters beyond kind.

### 12.2 [TARGET]

- One search overlay; eight facets (conversation, memory, knowledge, artifact, file, command, project, agent).
- FTS5 + vector + graph indexes in local SQLite.
- Unified rank score (relevance + recency + frequency + scope + kind_boost).
- Prefix grammar (`>`, `/`, `@`, `#`, `!`, `~`).
- Result explanation with score breakdown.
- < 80ms first open.
- Background indexer; persisted queue; crash-resumable.

### 12.3 [MIGRATION]

| Phase | What | Depends on |
|---|---|---|
| S1 | Define `SearchResult` / `SearchQuery` types in `core/types.ts`. Stable interface. | — |
| S2 | Add FTS5 virtual tables for conversations + messages. | Persistence (domain schema) |
| S3 | Replace `UniversalSearch` client substring with FTS5 query for conversations. | S2 |
| S4 | Add memory FTS5 + backfill from persisted MemoryEngine. | Memory persistence |
| S5 | Add knowledge entity FTS5 + graph adjacency. | Knowledge persistence |
| S6 | Add artifact FTS5 (text types only). | Artifact Arch A1 |
| S7 | Add file FTS5 (filename only). | File system layer |
| S8 | Add unified rank score + result explanation UI. | S3–S7 |
| S9 | Add prefix grammar (`>/@/#/!/~`) in the overlay. | S1 |
| S10 | Add vector index for memory + knowledge entities (`sqlite-vec` or `hnswlib`). | S4, S5 |
| S11 | Add semantic `~` query mode. | S10 |
| S12 | Add background indexer with persisted queue. | S2–S7 |
| S13 | Add filters (kind, project, date, tag, type, author). | S8 |

S1–S9 are required for v1. S10+ can ship progressively. S12 (background indexer) is required for any production-quality search experience and should not be deferred beyond v1.

---

## 13. Open questions / [UNKNOWN]

| # | Unknown | Resolution |
|---|---|---|
| 1 | Does `sqlite-vec` ship a prebuilt binary for macOS arm64 + x86_64 + Linux + Windows? | Verify during S10. Fallback: `hnswlib` (pure-WASM). |
| 2 | Is `all-MiniLM-L6-v2` fast enough on a typical laptop CPU (< 50ms / embed)? | Benchmark during S10. Fallback: smaller model (`paraphrase-MiniLM-L3-v2`, 128 dims). |
| 3 | Should conversation messages be vectorized too? | No in v1 — cost/size. Reconsider in v2 if semantic conversation recall becomes a need. [INFERENCE] |
| 4 | How to handle multi-language content (Arabic + English per Bible Part 16.4)? | FTS5 `unicode61` tokenizer handles both. Embedding model must be multilingual — `paraphrase-multilingual-MiniLM-L12-v2` if needed. [INFERENCE] |
| 5 | Should search results include archived conversations by default? | No; toggleable via filter. |
| 6 | Indexer lag monitoring — alert threshold? | 1s lag = warning; 5s = error (in DeveloperPanel). [INFERENCE] |

---

## 14. Invariants (this document)

- **S-1.** One search overlay. One component. All entry points route to it.
- **S-2.** No external search service. Local SQLite only.
- **S-3.** One `SearchResult` shape for all kinds.
- **S-4.** One rank score formula for all kinds (weights may differ per kind via `kind_boost`).
- **S-5.** Every result has an explainable score breakdown.
- **S-6.** The indexer is a background worker with a persisted queue; indexer lag is monitored.
- **S-7.** Prefix grammar is the only "mode switch" the owner learns — not separate search systems.
- **S-8.** Forbidden paths / secrets / hidden versions are never indexed.

---

**End of MiMo Search Architecture.**
