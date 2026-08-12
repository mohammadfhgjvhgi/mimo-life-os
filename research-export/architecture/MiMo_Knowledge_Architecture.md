# MiMo — Knowledge Architecture
### Phase: Foundation From The Ground Up — ARCH-B (Doc 3 of 6)

**Status:** ARCHITECTURE. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Scope:** How MiMo derives structured knowledge from memory + documents + sources. Defines the knowledge graph, entities, relationships, retrieval, citations. The difference between Memory / Knowledge / Context / Source MUST NOT collapse.
**Source of truth:** Product Bible Part 6 (Knowledge Architecture), Part 4.6 (Context Transparency), Part 22 (Security). `MiMo_Current_System_Audit.md` §3.5. `src/core/types.ts` (MemoryRelation type only).

---

## 0. Label Legend

- `[CURRENT]` — what exists today (effectively nothing for Knowledge).
- `[TARGET]` — what this architecture specifies.
- `[MIGRATION]` — how to get there.
- `[FACT]` — verifiable from code.
- `[INFERENCE]` — architect's reasoned conclusion.
- `[UNKNOWN]` — open question.

---

## 1. The Core Principle

> **Knowledge is derived, not asserted.** The user never maintains the knowledge graph. MiMo derives it from memory + documents + sources via the consolidation engine. The user can inspect and correct, but never hand-author. [PRODUCT DECISION — Bible Part 6.1]

Knowledge is **NOT**:
- A second copy of memory.
- A dumping ground for AI inferences.
- A database of facts the user must curate.

Knowledge **IS**:
- A typed, related, evidence-backed graph of entities.
- The basis for the User Model that ContextBuilder consumes.
- The structural backing for citations on every claim.

---

## 2. Memory vs Knowledge vs Context vs Source (MUST NOT collapse)

| Term | What it is | Created by | Mutability | Decay | Example |
|---|---|---|---|---|---|
| **Memory** | Stored belief about a fact/preference/event/skill/goal. | User, agents (with provenance). | User can edit/delete. | Yes (per-type halflife). | "Owner prefers Arabic." |
| **Knowledge** | Derived entity graph — typed, related, evidence-backed. | MiMo's consolidation engine. | MiMo maintains; user corrects. | Yes (entity confidence). | Entity "Arabic" — `prefers_language` — entity "Owner". |
| **Context** | The assembled snapshot used for ONE turn. Immutable once built. | ContextBuilder. | None (immutable). | N/A. | The ContextObject for turn N. |
| **Source** | Where a memory/knowledge claim came from. Provenance. | Reality (captured at write). | None (immutable fact). | None. | "Conversation 12, turn 4, agent:planner." |

[FACT — Bible Part 6.1 establishes Memory ≠ Knowledge. This doc extends the distinction to Context and Source.]

**The collapse failure modes (forbidden):**
1. Treating knowledge as a second memory store (writes go directly to Knowledge) → user cannot audit.
2. Treating context as a knowledge source → context is a snapshot, not a source.
3. Treating sources as memory (the AI "remembers" a source as if it were a fact) → provenance lost.
4. Treating memory as the citation source → memory has no authority of its own; it must trace back to a Source.

---

## 3. Knowledge Sources [TARGET — Bible Part 6.2]

| Source | How ingested | Trust level |
|---|---|---|
| Memory (auto-derived via consolidation) | Consolidation engine reads `Memory.status = 'active'` | Inherits memory trustLevel |
| Files (project files, when referenced) | On `@file` mention or folder-as-context | inferred (unless file is user-authored config) |
| Documents (uploaded) | User uploads via UI; chunked + embedded | inferred |
| Notes (conversation-derived) | Memory agent extracts from conversations | inferred → confirmed (on user confirm) |
| Web research | Research agent fetches; content embedded + cited | unverified (per domain reputation) |
| Projects | Project-scoped entities (auto-derived) | inferred |
| External sources (MCP) | Plugin emits structured entity | inferred (unless plugin signed + verified) |

### 3.1 [CURRENT] Deficiency

[CURRENT] No knowledge sources at all. `MemoryRelation` type exists in `src/core/types.ts` but no graph engine, no entities, no consolidation. [FACT]

---

## 4. Knowledge Entity Model [TARGET — Bible Part 6.3]

```typescript
interface Entity {
  id: string;              // stable, deterministic (ent:<type>:<slug>)
  type: EntityType;        // identity | skill | interest | project | goal | person | memory | decision
  name: string;
  aliases: string[];
  properties: Record<string, unknown>;
  evidence: Evidence[];    // sources that support this entity
  confidence: number;     // 0..1, decayed over time
  status: 'active' | 'merged' | 'archived' | 'orphaned';
  changes: EntityChange[]; // history of property updates
  createdAt: number;
  updatedAt: number;
  lastVerifiedAt: number;
}

type EntityType =
  | 'identity'     // the user (name, languages, location)
  | 'skill'        // a proficiency
  | 'interest'     // a topic the user engages with
  | 'project'      // a MiMo project
  | 'goal'         // a goal (active or historical)
  | 'person'       // a person the user mentions
  | 'memory'       // a derived memory entity
  | 'decision'     // a recorded decision (e.g. "chose Next.js for project X")
  | 'document'     // an ingested document
  | 'concept'      // a topic (used in research/knowledge browsing)
  | 'event'        // a life/work event
  | 'organization' // a company/team
  | 'place';       // a location
```

[INFERENCE — Bible specifies 8 types (identity / skill / interest / project / goal / person / memory / decision). This doc adds 5 (document / concept / event / organization / place) for research-mode + document ingestion. Flagged for review.]

### 4.1 Entity ID Strategy [TARGET]

`ent:<type>:<slug>` where slug is `kebab-case(normalized(name))`. Example: `ent:skill:arduino`.

Why: stable across restarts, debuggable in logs, human-readable in DB queries.

### 4.2 Aliases [TARGET]

Each entity has aliases (e.g. "Arduino" → ["arduino", "ARDUINO", "أردوينو"]). Indexed for fast lookup. Used by the consolidation engine to detect that "Arduino" and "أردوينو" are the same entity.

### 4.3 Properties [TARGET]

Free-form key-value, but with declared schemas per entity type:

```typescript
const PROPERTY_SCHEMAS: Record<EntityType, Schema> = {
  skill:      { proficiency: number (0..1), yearsExperience: number, lastUsed: timestamp },
  interest:   { engagementCount: number, lastEngaged: timestamp, sentiment: 'positive'|'neutral'|'negative' },
  goal:       { priority: 'low'|'medium'|'high', status: 'active'|'achieved'|'abandoned', deadline: timestamp? },
  project:    { status: 'active'|'paused'|'archived', accent: string, rootPath: string },
  identity:   { name: string, languages: string[], location: string, timezone: string },
  // ...
};
```

[INFERENCE — schemas are best-effort; final shapes evolve with use.]

---

## 5. Relationships (typed, evidence-backed) [TARGET — Bible Part 6.4]

```typescript
interface Relationship {
  id: string;
  fromId: string;      // entity ID
  toId: string;        // entity ID
  type: RelationshipType;
  evidence: Evidence;  // why this relationship exists
  confidence: number;
  createdAt: number;
  updatedAt: number;
  status: 'active' | 'superseded' | 'archived';
}

type RelationshipType =
  // Personal
  | 'has_skill'           // identity → skill
  | 'interested_in'       // identity → interest
  | 'works_on'            // identity → project
  | 'pursues_goal'        // identity → goal
  | 'knows_person'        // identity → person
  | 'is_part_of'          // identity → organization
  | 'lives_in'            // identity → place
  // Structural
  | 'related_to'          // generic
  | 'part_of'             // concept → concept (containment)
  | 'depends_on'          // project → project | goal → goal
  | 'prerequisite_for'    // skill → skill
  | 'evolved_into'        // interest → skill (Bible Part 5.5 evolution)
  | 'mentions'            // document → concept
  | 'cites'               // document → document
  | 'authored_by'          // document → person
  | 'decided_in'          // decision → project
  | 'occurred_during'     // event → project
  | 'replaces'            // entity → entity (versioning)
  ;
```

### 5.1 Why typed relationships (not freeform)?

A freeform graph (e.g. "X relates to Y because...") loses queryability. Typed relationships enable:
- "Show me all skills the user has." (query `has_skill`)
- "What projects depend on this skill?" (`prerequisite_for` traversal)
- "How did this interest evolve into a skill?" (`evolved_into` chain)

[INFERENCE — the Bible's pattern (Bible Part 6.4) and Obsidian's typed-relations both support this.]

### 5.2 Evidence on relationships [TARGET]

Every relationship has at least one `Evidence` item. If the only evidence is deleted (e.g. the memory that prompted the relationship), the relationship is marked `status = 'orphaned'` and surfaced for review. It is NOT auto-deleted (provenance is preserved).

---

## 6. Knowledge Graph Engine [TARGET — Bible Part 6.5]

### 6.1 Storage

- **Entities** stored in SQLite (`Entity` table) via Prisma.
- **Relationships** stored in SQLite (`Relationship` table) via Prisma.
- **Indexes** on `type`, `name` (lowercase), `alias` (lowercase), `status`.
- **In-memory cache** (LRU, size 1024) for hot entities (the user's identity, current project entities, top skills).

### 6.2 Operations

```typescript
interface KnowledgeGraph {
  // Entities
  upsertEntity(input: EntityInput): Entity;          // creates or merges
  getEntity(id: string): Entity | undefined;
  findEntity(name: string, type?: EntityType): Entity | undefined;
  
  // Relationships
  relate(input: RelateInput): Relationship;
  relationships(entityId: string, type?: RelationshipType): readonly Relationship[];
  traverse(entityId: string, hops: number): GraphTraversalResult;
  
  // Retrieval
  retrieve(query: RetrieveQuery): readonly Entity[];     // semantic + graph hybrid
  retrieveRelated(entityId: string): readonly Entity[];  // 1-hop neighbors
  
  // Maintenance
  mergeEntities(targetId: string, sourceId: string): Entity;
  archiveEntity(id: string): void;
  recomputeConfidence(entityId: string): Entity;
  
  // Inspection
  inspect(query: InspectQuery): GraphInspectionResult;
  
  // Events
  on(event: GraphEvent, handler: EventHandler): Unsubscribe;
}
```

### 6.3 Events emitted

- `entity.created`
- `entity.updated` (property change)
- `entity.merged`
- `entity.archived`
- `relationship.created`
- `relationship.superseded`
- `graph.consolidation_run`

### 6.4 [CURRENT] Deficiency

[CURRENT] No KnowledgeGraph. The `MemoryEngine.relate()` exists but only adds to an in-memory array on the Memory entry — no entities, no graph engine. [FACT]

---

## 7. Documents + Chunks + Embeddings [TARGET]

### 7.1 Document Model

```typescript
interface Document {
  id: string;
  title: string;
  source: DocumentSource;       // upload | web | project_file | conversation_note
  sourceUri: string;             // file path, URL, conversation ID
  mimeType: string;
  sizeBytes: number;
  ingestedAt: number;
  status: 'pending' | 'indexed' | 'failed' | 'archived';
  provenance: DocumentProvenance;
}

interface DocumentProvenance {
  fetchedBy: 'user' | 'agent' | 'tool' | 'plugin';
  fetchedAt: number;
  trustLevel: 'verified' | 'inferred' | 'unverified';
  originalUrl?: string;
  contentHash: string;           // sha256 of original content
  transformationLog: string[];   // ['html_stripped', 'chunked_512', 'embedded']
}
```

### 7.2 Chunking Strategy [TARGET]

- **Chunk size**: 512 tokens (default), tunable per document.
- **Overlap**: 50 tokens (prevents losing context at boundaries).
- **Boundary-aware**: prefer paragraph breaks > sentence breaks > fixed-size.
- **Chunk metadata**: `{ documentId, chunkIndex, startChar, endChar, heading, parentHeading }`.

### 7.3 Embeddings [TARGET]

- **Model**: configurable per project (default: `bge-small-en-v1.5` local OR `text-embedding-3-small` OpenAI-compatible API — see `MiMo_AI_Architecture.md`).
- **Storage**: SQLite table `Embedding` with `chunkId`, `model`, `vector` (stored as BLOB, float32 array).
- **Vector index**: brute-force cosine for v1 (single-user, < 100k chunks is fast enough). Upgrade to HNSW later if needed.
- **Reranking**: optional second-pass reranker (cross-encoder) for top-K results.

### 7.4 [CURRENT] Deficiency

[CURRENT] No document ingestion. No embeddings. No vector store. [FACT — Audit §3.4]

---

## 8. Metadata + Citations + Provenance [TARGET — Bible Part 6.11]

### 8.1 Every knowledge retrieval returns an Explanation

```typescript
interface Explanation {
  summary: string;                  // what the graph says about this query
  sources: Citation[];               // every source used
  confidence: number;               // 0..1
  knowledgeClass: 'fact' | 'inference' | 'opinion' | 'temporary';  // Bible Part 6.6
  evidenceCount: number;
  lastVerified: number;
  reasoning: string;                // graph traversal path or retrieval explanation
  conflicts: Conflict[];            // if any
}

interface Citation {
  type: 'memory' | 'document' | 'web' | 'conversation' | 'file' | 'tool_output';
  refId: string;
  excerpt: string;                  // the specific quoted text
  url?: string;
  capturedAt: number;
  trustLevel: 'verified' | 'inferred' | 'unverified';
  trustScore?: number;              // for web sources (domain reputation)
}
```

### 8.2 Citation Display Patterns [TARGET — Bible Part 6.11]

- **Per-claim source-to-quote citation** (NotebookLM pattern): each AI claim has a `[1]` marker linking to the source + quoted excerpt.
- **Inline numbered citations** (Perplexity pattern): `[1]`, `[2]` inline in the answer.
- **Per-paragraph AI citations** (Heptabase pattern): each paragraph ends with sources used.

Default for MiMo: per-claim + inline numbered. Per-paragraph in research mode.

### 8.3 Provenance chain (full traceability)

Every claim in an AI answer traces back through:
1. AI claim → Citation (which source + excerpt).
2. Citation → Knowledge Entity (which entity was retrieved).
3. Entity → Evidence (which memory or document backed it).
4. Memory → Source (which conversation / agent / tool call produced it).

The chain is fully queryable. The user can click any `[1]` and walk back to the originating conversation turn. [TARGET — Bible Part 6.11 invariant]

---

## 9. Retrieval (when to use what) [TARGET — Bible Part 6.9]

| Retrieval type | When | Algorithm | Cost |
|---|---|---|---|
| **Direct** | Exact match (entity by ID, file by path) | O(1) lookup | Cheap |
| **Semantic** | "What do I know about X?" | Embedding similarity (cosine) on entity + chunk vectors | Medium |
| **Graph** | "What's related to X?" | Traverse relationships (1-2 hops) | Medium |
| **Hybrid** | Complex queries | Combine semantic + graph + direct | Expensive |

### 9.1 5-Factor Scoring [TARGET — Bible Part 6.9]

```
score = 0.35 × relevance        // embedding similarity
      + 0.20 × importance        // entity type weight (identity > goal > skill > interest > concept)
      + 0.20 × confidence       // decayed entity confidence
      + 0.10 × freshness        // recency of last evidence
      + 0.15 × proximity        // graph distance to current task entities
```

### 9.2 Default retrieval for ContextBuilder

```
retrieve({
  query: taskInput,
  scope: currentProject,
  types: ['identity', 'skill', 'interest', 'goal', 'project'],
  limit: 10,
  minConfidence: 0.3,
  excludeStatus: ['archived', 'orphaned']
})
```

### 9.3 RAG vs GraphRAG [TARGET — Bible Part 6.10]

- **RAG** (semantic retrieval of memory chunks + conversation history): used for chat-mode answers.
- **GraphRAG** (graph traversal of entities + relationships): used for research-mode + knowledge-grounded explanations.
- **Hybrid** (default for complex queries): combine RAG (memory) + GraphRAG (knowledge) + direct (files).

### 9.4 [CURRENT] Deficiency

[CURRENT] No retrieval beyond `MemoryEngine.recall` substring match. No RAG, no GraphRAG, no embeddings. [FACT]

---

## 10. Knowledge Policies (Classification) [TARGET — Bible Part 6.6]

Every entity has a `knowledgeClass`:

| Class | Definition | Retention | Display |
|---|---|---|---|
| `fact` | Identity OR high-weight user_statement (confidence ≥ 0.85 + ≥2 user-confirmed evidence). | Permanent (decays slowly). | Always shown as fact. |
| `temporary` | Single low-weight observation (confidence < 0.4 OR only 1 evidence). | 30 days then archive. | Marked "tentative." |
| `inference` | Half+ of evidence is `agent_reasoning` (not user-confirmed). | Decays per halflife. | Marked "inferred." |
| `opinion` | Default class. | Decays per halflife. | Marked "belief." |

### 10.1 Class Promotion Rules [TARGET]

- `opinion` → `inference`: when 2+ independent evidence items exist.
- `inference` → `fact`: when (a) user confirms AND (b) confidence ≥ 0.7 AND (c) ≥1 `user_action` evidence.
- `temporary` → `archived`: after 30 days with no new evidence.

### 10.2 Why classify?

> Without classification, every AI belief becomes a "fact." The user cannot tell what is solid vs what is speculative. Classification makes the trust level explicit on every claim. [INFERENCE — Bible Part 5.11 false memory prevention]

---

## 11. Consolidation Engine [TARGET — Bible Part 6.7]

### 11.1 Job

Daily background job that:
1. Scans `Memory.status = 'active'` for new memories since last run.
2. For each memory, runs `classifySubject(memory)` heuristic — determines which `(type, subject)` it implies.
3. Looks up corresponding Entity (by name + aliases).
4. If entity exists, appends evidence + recomputes confidence.
5. If entity does not exist:
   - Creates entity with `status = 'pending_confirmation'` if thresholds not met.
   - Creates entity with `status = 'active'` if thresholds met (3 interest / 6 skill / 4 project — Bible Part 5.5).
6. Discovers relationships via co-occurrence (`discoverRelations`).

### 11.2 Thresholds [TARGET — Bible Part 5.5]

| Entity type | Mentions to create | Mentions to upgrade |
|---|---|---|
| `interest` | 3 | — |
| `skill` | 6 | 5 evidence → `skill`, 12 evidence + property → `expert` |
| `project` | 4 | — |

### 11.3 Consolidation never deletes

It only creates + updates + archives. Deletion is a separate user-driven action.

### 11.4 [CURRENT] Deficiency

[CURRENT] No consolidation engine. The MemoryEngine has no concept of entity derivation. [FACT]

---

## 12. Evolution Engine [TARGET — Bible Part 6.8]

### 12.1 Job

Daily background job that:
1. Scans for entities of type `interest` with engagement count > threshold.
2. If an `interest` has ≥5 evidence items with positive sentiment AND ≥1 skill-like mention → propose evolution to `skill` with `evolved_into` relationship.
3. If a `skill` has ≥12 evidence items AND a `proficiency` property > 0.7 → propose upgrade to `expert` (subtype).
4. Emits `EVOLUTION_DETECTED` event.

### 12.2 Evolution is proposed, not auto-applied

The user sees the proposal in the Knowledge tab. Confirming creates the evolution. Rejecting records a negative feedback (used to tune thresholds).

### 12.3 [CURRENT] Deficiency

[CURRENT] No evolution engine. [FACT]

---

## 13. User Model [TARGET — Bible Part 6.12]

The UserModel is the **aggregated** view of the knowledge graph for ContextBuilder consumption. It is NOT a separate store — it is a cached projection.

```typescript
interface UserModel {
  identity: { name, languages, location, timezone };
  skills: Array<{ name, proficiency, lastUsed }>;
  interests: Array<{ name, engagementCount, sentiment }>;
  projects: Array<{ id, name, status, lastActive }>;
  goals: Array<{ name, priority, status, deadline? }>;
  relations: Array<{ type, targetEntityId, since }>;
  strengths: string[];        // top-N skills (proficiency > 0.7)
  weaknesses: string[];      // skills with low proficiency but high engagement (learning)
  lifeGoals: string[];       // top-level goals
  cachedAt: number;
}
```

### 13.1 Caching + Invalidation [TARGET]

- UserModel cached in DB table `UserModelCache`.
- Invalidated on any of: `entity.updated`, `entity.created`, `entity.merged`, `relationship.created`, `relationship.superseded`.
- Recomputed lazily on next ContextBuilder call.

### 13.2 [CURRENT] Deficiency

[CURRENT] No UserModel. ContextBuilder uses `DEFAULT_USER` hardcoded. [FACT]

---

## 14. Knowledge Browser [TARGET — Bible Part 6.13]

A visual explorer (in the Knowledge tab). Not part of this architecture's spec (UI is covered separately), but the data contract is:

```typescript
interface KnowledgeBrowserQuery {
  type?: EntityType;
  status?: EntityStatus;
  searchText?: string;
  sortBy: 'name' | 'confidence' | 'updatedAt' | 'evidenceCount';
  limit: number;
  offset: number;
}

interface KnowledgeBrowserResult {
  entities: Entity[];
  total: number;
  graph: { nodes: Entity[], edges: Relationship[] };  // for graph view
}
```

### 14.1 Linked + Unlinked References [TARGET — Bible Part 6.14]

Every entity shows:
- **Linked references** — explicit relationships (via Relationship table).
- **Unlinked references** — implicit mentions in memories/conversations/documents (via full-text search on entity name + aliases).

This turns implicit edges into explicit graph edges over time (Roam's accumulating-value pattern).

---

## 15. Source Verification [TARGET]

### 15.1 Web source trust score

For web sources (`source = 'web'`):
- Domain reputation list (maintained manually + learns from user feedback).
- HTTPS required (HTTP auto-trust = 0).
- Trust score: `domain_reputation × content_freshness × (1 - contradiction_rate_with_verified_sources)`.

### 15.2 Document source verification

- Hash verification: stored `contentHash` matches recomputed hash (detects tampering if file changes after ingest).
- Authoritative sources (e.g. official docs) flagged with `trustLevel = 'verified'`.

### 15.3 Plugin (MCP) source verification

- Plugins must declare their source capabilities.
- Plugins with `verified_publisher` signature get `trustLevel = 'verified'`.
- Unsigned plugins get `trustLevel = 'unverified'` and require user approval per retrieval.

### 15.4 [CURRENT] Deficiency

[CURRENT] No source verification. WebSearchTool returns raw results with no trust scoring. [FACT]

---

## 16. Hybrid Search [TARGET]

### 16.1 The Hybrid Pipeline

```
1. Direct retrieval (exact entity by ID/name lookup)
2. Semantic retrieval (embedding similarity on entities + chunks)
3. Graph traversal (1-2 hops from direct + semantic results)
4. Reranking (cross-encoder or 5-factor score)
5. Deduplication (same entity from multiple paths merged)
6. Citation assembly (every result carries its source chain)
7. Confidence recomputation (entity confidence + retrieval confidence)
8. Return ranked list with Explanation
```

### 16.2 Why hybrid (not pure RAG or pure graph)

- Pure RAG misses structured relationships ("what's related to X").
- Pure graph misses semantic similarity ("entities that mean X but use different words").
- Hybrid covers both.

[INFERENCE — standard hybrid-RAG architecture, supported by Bible Part 6.10.]

---

## 17. GraphRAG Justification [TARGET]

GraphRAG is **justified** when:
1. The query is relational ("what depends on what").
2. Multi-hop reasoning is needed ("what skills does this project need, and which does the user already have?").
3. The user wants an explainable answer (graph path is the reasoning).

GraphRAG is **NOT justified** when:
1. Simple fact lookup (direct retrieval is faster).
2. Free-text search (semantic retrieval is better).
3. The graph is sparse (cost of maintaining graph > benefit).

[INFERENCE — Bible Part 6.10 specifies GraphRAG for research-mode + knowledge-grounded explanations. This doc sharpens when to use it.]

---

## 18. Persistence Schema [TARGET]

```prisma
model Entity {
  id              String   @id
  type            String
  name            String
  aliases         String[]  // SQLite JSON
  properties      Json
  confidence      Float
  status          String   // active | pending_confirmation | merged | archived | orphaned
  knowledgeClass  String   // fact | inference | opinion | temporary
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  lastVerifiedAt  DateTime?
  
  evidence        Evidence[]
  changes         EntityChange[]
  relationshipsFrom Relationship[] @relation("from")
  relationshipsTo   Relationship[] @relation("to")
  
  @@index([type, status])
  @@index([name])
  @@index([status, confidence])
}

model Relationship {
  id          String  @id @default(cuid())
  fromId      String
  toId        String
  type        String
  evidence    Json
  confidence  Float
  status      String
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  from        Entity  @relation("from", fields: [fromId], references: [id])
  to          Entity  @relation("to", fields: [toId], references: [id])
  
  @@index([fromId, type])
  @@index([toId, type])
  @@index([type])
}

model Document {
  id            String  @id @default(cuid())
  title         String
  source        String  // upload | web | project_file | conversation_note
  sourceUri     String
  mimeType      String
  sizeBytes     Int
  status        String  // pending | indexed | failed | archived
  provenance    Json
  contentHash   String
  ingestedAt    DateTime @default(now())
  
  chunks        Chunk[]
  
  @@index([source, status])
  @@index([contentHash])
}

model Chunk {
  id            String  @id @default(cuid())
  documentId    String
  chunkIndex    Int
  content       String
  heading       String?
  startChar     Int
  endChar       Int
  tokenCount    Int
  
  document      Document @relation(fields: [documentId], references: [id])
  embedding     Embedding?
  
  @@index([documentId, chunkIndex])
}

model Embedding {
  id            String  @id @default(cuid())
  chunkId       String  @unique
  model         String
  vector        Bytes   // float32 array
  dimensions    Int
  createdAt     DateTime @default(now())
  
  chunk         Chunk   @relation(fields: [chunkId], references: [id])
  
  @@index([model])
}

model EntityChange {
  id          String  @id @default(cuid())
  entityId    String
  changeType  String  // property_updated | confidence_changed | status_changed
  oldValue    Json?
  newValue    Json?
  changedBy   String  // user | agent_id | consolidation_job
  changedAt   DateTime @default(now())
  
  entity      Entity  @relation(fields: [entityId], references: [id])
}

model UserModelCache {
  id          String  @id @default("singleton")
  model       Json
  cachedAt    DateTime @default(now())
  invalidatedAt DateTime?
}
```

---

## 19. Migration Path [MIGRATION]

### Phase 1 — Schema + Entities + Direct Retrieval
- Define Prisma schema per §18.
- Implement `KnowledgeGraph` interface (entities + relationships only, no embeddings yet).
- Implement direct retrieval (by ID, by name+aliases).
- Wire `KnowledgeGraph` to ContextBuilder (replaces nothing — adds new source).

### Phase 2 — Consolidation + Evolution
- Implement `ConsolidationEngine` (daily job).
- Implement `EvolutionEngine` (daily job, proposes evolutions).
- User Model cache (computed from graph).

### Phase 3 — Embeddings + Semantic Retrieval
- Add `Embedding` adapter to AI layer (see `MiMo_AI_Architecture.md`).
- Embed all `Memory` content (backfill on first run).
- Implement semantic retrieval (cosine similarity).

### Phase 4 — Documents + Chunking
- Implement `Document` ingestion (file upload).
- Implement chunking (512 tokens, 50 overlap).
- Embed chunks.

### Phase 5 — Hybrid Search + Reranking
- Combine direct + semantic + graph retrieval.
- Add reranker (cross-encoder) for top-K.

### Phase 6 — Citations + Per-Claim Tracing
- Implement `Explanation` + `Citation` types.
- Wire citations into AI responses (every `[1]` links to a source).

### Phase 7 — Source Verification + Web Trust
- Domain reputation list.
- Hash verification on documents.
- Plugin signature verification.

Each phase is independently shippable. Phase 1 unblocks ContextBuilder's knowledge layer.

---

## 20. Trust Boundaries for Knowledge

| Boundary | What crosses | Enforced by |
|---|---|---|
| Memory → Knowledge (consolidation) | Active memories | ConsolidationEngine (only `active` memories, never `pending_confirmation`) |
| Document → Knowledge (ingestion) | Uploaded files | DocumentIngester (only after user approval; quarantine scan) |
| Web → Knowledge (research) | Fetched web pages | ResearchAgent + WebSourceTrustScore (trust < 0.3 → flagged) |
| Plugin → Knowledge (MCP) | Structured entity | Plugin capability gate (`knowledge:write` required, user-approved) |
| Knowledge → Context (retrieval) | Retrieved entities | ContextBuilder (re-ranks per `MiMo_Context_Architecture.md`) |
| Knowledge → User Model | Cached projection | UserModelCache (invalidated on graph events) |
| Knowledge → UI (browser) | Entity list + graph | API route (scoped to user; single-user) |

---

## 21. Open Questions [UNKNOWN]

| # | Question | Why it matters | Investigation |
|---|---|---|---|
| 1 | Local embedding model vs API embedding? | Privacy + cost + latency tradeoff | Test sentence-transformers locally; fall back to API if quality insufficient |
| 2 | Vector index: brute-force cosine vs HNSW? | Brute force fine for < 100k chunks; HNSW needed beyond | Profile after 10k documents |
| 3 | Should entities be versioned (full history of every property)? | Storage cost vs audit completeness | Sample user behavior first |
| 4 | Cross-project entity sharing — global entities or per-project? | Bible Part 5.3 has shared OS memory; entities likely same | Decide when Phase 1 lands |
| 5 | Embedding regeneration when model changes — re-embed all? | Cost + time | Provide migration script + flag |
| 6 | How does GraphRAG handle cycles in the relationship graph? | Infinite traversal risk | Hard cap on hops (default 2) |
| 7 | Should the Knowledge graph support bi-directional relationships (from→to implies to→from)? | Affects query simplicity | Use directed + inverse relationships auto-created |

---

## 22. Non-Goals

- Memory internals (see `MiMo_Memory_Architecture.md`).
- Context assembly (see `MiMo_Context_Architecture.md`).
- AI model used for embeddings (see `MiMo_AI_Architecture.md`).
- Knowledge tab UI rendering.

---

## 23. Summary

[CURRENT]: No knowledge graph. No entities. No embeddings. No documents. No citations. `MemoryRelation` type exists in `src/core/types.ts:67-71` but is only used by `MemoryEngine.relate()` to push to an in-memory array — no graph engine.

[TARGET]: Full knowledge graph with 13 entity types, 18 relationship types, 4 knowledge classes (fact/inference/opinion/temporary), consolidation + evolution engines, document ingestion with chunking + embeddings, hybrid search (direct + semantic + graph + reranking), per-claim citations with full provenance chain, source verification (domain reputation + hash + signature), and a cached UserModel projection for ContextBuilder.

[MIGRATION]: 7 phases. Schema+Entities first (unblocks ContextBuilder knowledge layer). Consolidation+Evolution next. Then Embeddings, Documents, Hybrid Search, Citations, Source Verification. Each phase independently shippable.

**Invariant:** Memory is input. Knowledge is derived graph. Context is snapshot. Source is provenance. They MUST NOT collapse. Knowledge is derived (not asserted) — the user never hand-authors entities. Every knowledge retrieval returns an Explanation with citations tracing back to original sources.
