# Memory Architectures (Typed Memory Systems Overview)

**Category:** Memory
**Status:** CORE
**Maturity:** Mature (concept) / Emerging (unified agent-memory implementations)

## Definition
A memory architecture partitions an agent's stored experience into typed stores — each with its own schema, write triggers, retrieval policy, decay rule, and confidence model — rather than dumping everything into a single context window or one flat log. Common types: working, short-term, long-term, episodic, semantic, procedural, preference, relationship, failure, skill, temporal, behavioral, autobiographical, organizational.

## Problem Solved
A bare LLM has no persistent state; even a 1M-token window forgets between sessions, can't prioritize, can't forget, can't resolve contradictions, and conflates "raw transcript" with "learned fact." Typed memory separates concerns (what happened vs. what is true vs. how to act vs. what the user likes) so retrieval, ranking, and consolidation can be type-aware.

## Why It Matters
MiMo AI is long-horizon and personal: it must remember across sessions, distinguish a one-off request from a durable preference, know the difference between an event ("user moved to Berlin in March") and a fact ("user lives in Berlin"), and avoid replaying stale failures. Without typed memory, "memory" becomes a noisy dump that degrades retrieval precision and inflates context cost.

## How It Works
- Every experience is **classified** on write into one or more memory types (episodic event + extracted semantic fact + preference signal can all stem from one conversation).
- Each type owns a **store** (table/embedding index/file), a **schema** (fields, timestamps, provenance, confidence), and a **lifecycle** (consolidation, compression, decay, reinforcement, versioning).
- The **Context Layer** queries memory by type+intent, not by one global search — e.g., "user preferences" for response shaping, "procedural" for how-to, "episodic" for "what did we do last week."
- **Consolidation** moves items STM→LTM; **compression** shrinks old items; **conflict resolution** reconciles contradictions; **provenance** records where each item came from.

## Architecture
```
Experience → Memory Writer → Classifier
   ├→ Working Memory  (in-process, current turn)
   ├→ Short-Term (24h rolling log)
   ├→ Long-Term (typed stores):
   │     ├─ Episodic   (events, when/where/who)
   │     ├─ Semantic   (facts, beliefs)
   │     ├─ Procedural (skills, how-to, rules)
   │     ├─ Preference (user likes/dislikes)
   │     ├─ Relationship (entities & links)
   │     ├─ Failure   (errors + lessons)
   │     └─ Skill     (learned tool patterns)
   └→ Consolidation / Compression / Decay / Conflict-Resolution / Provenance
Context Layer ← (typed retrieval) ← Long-Term stores
```

## Interfaces
- `write(experience, metadata) → memoryIds[]`
- `retrieve(type, query, {topK, filters, minConfidence}) → Memory[]`
- `consolidate(window) → movedCount`
- `compress(memoryId) → compressedId`
- `resolveConflict(memoryIdA, memoryIdB) → winnerId | mergedId`
- `forget(memoryId)` / `reinforce(memoryId, delta)`

## Dependencies
- Embedding model (for semantic retrieval over each store).
- SQLite + vector extension (storage backbone for all types).
- LLM classifier (to type incoming experiences and extract facts/preferences from transcripts).
- Event bus (write/consolidation triggers).
- Provenance & confidence subsystems.

## Strengths
- Type-aware retrieval = higher precision + smaller context footprint.
- Each type can have its own lifecycle (episodic decays; semantic persists; procedural versions).
- Makes "what does MiMo know about me" inspectable per type — supports trust/audit UI.
- Natural fit for personalization (preferences) and learning (procedural/failure).

## Weaknesses
- Classification errors cascade (an episodic fact filed as semantic becomes permanent).
- More schemas = more migration/refactor risk.
- Cross-type reasoning (e.g., a preference that conflicts with a fact) needs a coordinator.
- Risk of over-engineering: not every type justifies a separate store.

## Failure Modes
- Misclassification on write → wrong recall.
- Type sprawl: 15 types, half empty.
- Silent contradictions between types (e.g., preference says "vegan", episodic says "ordered steak").
- Consolidation loop dropping items that should have persisted.
- Embedding drift after model swap → recall collapses.

## Security Implications
- Memory holds PII (preferences, relationships, autobiographical). Needs encryption-at-rest, access control, export/purge (GDPR-style), and prompt-injection defense (malicious tool output should not be allowed to write semantic facts unprompted).
- Provenance must be tamper-evident for audit.

## Performance Implications
- Per-type indexes keep retrieval fast and bounded.
- Consolidation/compression must run in background workers — never block the request path.
- Embedding cost scales with writes; batch + cache.

## Operational Implications
- Need monitoring per type (count, freshness, conflict rate, hit rate).
- Need a Memory admin UI: browse, edit, forget, force-consolidate.
- Backup strategy: SQLite file + vector index snapshot.

## Alternatives
- **Single flat memory log** (simplest; loses typing, retrieval precision).
- **MemGPT-style hierarchical context** (OS-like memory tiers; good model but more complex).
- **A-MEM / Zep-style auto-memory** (LLM-curated memory graphs; heavier).
- **LangGraph/LangChain memory abstractions** (framework-coupled).

## Maturity & Production Readiness
- Cognitive-science taxonomy is mature; production agent deployments are emerging.
- SQLite-backed typed memory is production-feasible at personal/single-user scale (Zep, Letta/MemGPT, Mem0 all ship variants).
- Heterogeneous multi-store orchestration is still an active research area.

## Relevant Research / Papers
- Tulving (1972) — episodic vs. semantic memory distinction (cognitive science origin).
- Packer et al., **MemGPT** (2023) — LLM OS-style virtual context management.
- **Mem0** (2024) — production-ish memgpt-lite memory layer.
- Zep (2024) — temporal knowledge-graph memory.

## Official Documentation
- Letta docs (https://docs.letta.com/) — MemGPT memory blocks.
- Mem0 docs (https://docs.mem0.ai/).
- Zep docs (https://docs.getzep.com/).

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Prisma schema:** one base `Memory` table (id, type, content, embedding, confidence, provenance, createdAt, lastAccessed, decayScore, version) plus per-type tables for type-specific fields (Episodic: when/where/who; Semantic: subject/predicate/object; Procedural: triggerSteps; Preference: dimension/value/strength).
- **Vector:** sqlite-vec (or `better-sqlite3-vector`) virtual table joined to `Memory.id` — avoids a second DB.
- **Writer service:** Next.js server-action / API route that calls GLM-5.2 (via z-ai-web-dev-sdk) to classify experiences, extract triples/preferences, then writes via Prisma + emits events on socket.io for live UI.
- **Consolidation worker:** Node background task (or Next.js `instrumentation.ts`-spawned worker) reading STM table on schedule, calling LLM to summarize, writing LTM, deleting STM rows.
- **Zustand store:** client-side cache of "current session memory snapshot" (working memory + last N short-term) for the conversation UI.
- **Caddy:** single-port reverse proxy exposing Next.js + socket.io.
- **Migrations:** Prisma migrate for type-specific tables; version the schema.

## Relevance To Our Project (MiMo AI layered runtime)
This is **Layer 3 (Memory Layer)** of the 15-layer runtime. CAPABILITY_MAP §3 lists working, short-term, long-term, episodic, semantic, procedural, preference, memory retrieval, consolidation as CORE (C); relationship, failure, skill, compression, conflict-resolution, provenance as REQUIRED (R); temporal, behavioral, autobiographical, decay, reinforcement as IMPORTANT (I). The architecture must implement C+R types with typed stores and a single typed-retrieval interface consumed by Layer 2 (Context).

## Recommended Usage
- Implement CORE types first (working, STM, LTM-base, episodic, semantic, procedural, preference) on SQLite + sqlite-vec.
- Add R types (relationship, failure, skill) once consolidation pipeline is stable.
- Defer I types (autobiographical, behavioral, temporal) until v1.x.
- Always pair writes with provenance + confidence fields (even if confidence defaults to 1.0 initially).
- Single typed-retrieval API in Context Layer; never let agents hit memory stores directly.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — typed memory is the architectural spine of Layer 3. SQLite + sqlite-vec for storage; GLM-5.2 for classification/extraction; start with CORE types, add R types incrementally.

## Sources
- Tulving, E. (1972). *Episodic and Semantic Memory.* In *Organization of Memory.* (cognitive-science origin of typed-memory distinction).
- Packer, Wooders, Lin, Fang, Patil (2023). *MemGPT: Towards LLMs as Operating Systems.* arXiv:2310.08560.
- Mem0 (2024). *Mem0: Building Production-Ready AI Agents with Scalable Long-Term Memory.* arXiv:2504.19413.
- Zep (2024). *Zep: A Temporal Knowledge Graph Architecture for Long-Term Agent Memory.* arXiv:2501.13956.
- MiMo AI docs: `docs/PROJECT_UNDERSTANDING.md` §4 (Layer 3), `docs/CAPABILITY_MAP.md` §3.
- Inventory: `upload/تقنيات بناء ai شهر 8 2026.txt` lines 279–540 (memory types).
