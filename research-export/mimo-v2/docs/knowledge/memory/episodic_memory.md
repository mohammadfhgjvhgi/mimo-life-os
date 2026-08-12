# Episodic Memory

**Category:** Memory
**Status:** CORE
**Maturity:** Mature (concept) / Emerging (agent implementations)

## Definition
A typed long-term memory store that records **specific events experienced by the system or user** — bound to a time, place, actors, and context — as discrete episodes rather than generalized facts. Each episode answers "what happened, when, with whom, in what context."

## Problem Solved
Without episodic memory the agent can answer "what is X?" (semantic) but not "what did we do about X last Tuesday?" — long-horizon, session-spanning recall of concrete events requires time-indexed episode records, not paraphrased facts.

## Why It Matters
MiMo AI is a personal long-horizon assistant: users will ask "remember when you helped me debug the auth bug?" or "what did I decide at the meeting on the 5th?" Episodic memory is what makes that recall possible and what feeds autobiographical memory consolidation later.

## How It Works
1. On a meaningful event (task complete, user decision, tool call, conversation turn that the classifier flags), an **Episode record** is written.
2. Each Episode stores: timestamp, actor(s), type, summary, raw pointer (to transcript/chunk), participants, location/channel, outcome, embedding of the summary.
3. Retrieval is by **temporal + semantic + actor** filters (e.g., "episodes about `auth` with `user` in the last 30 days, top 5 by recency × relevance").
4. Consolidation can compress older episodes into semantic facts ("user has repeatedly worked on auth → topic of interest") while preserving the original episode pointer.

## Architecture
```
Event Bus → Episode Writer
   ├─ classify(event) → isEpisodic?
   ├─ summarize (LLM) → short summary
   ├─ embed(summary) → vector
   └─ Episode row: {id, ts, actor[], type, summary, rawRef, participants, outcome, embedding, confidence, provenance}
Context Layer ← (temporal+semantic query) ← Episodic store (SQLite + sqlite-vec)
```

## Interfaces
- `recordEpisode(event: {ts, actor, type, rawRef, participants, outcome}) → episodeId`
- `recallEpisodes({query, since, until, actors, topK}) → Episode[]`
- `consolidateEpisodes(window) → derivedSemanticFacts[]`
- `getEpisodeTimeline({since, until, filters}) → Episode[]`

## Dependencies
- LLM summarizer (GLM-5.2 via z-ai-web-dev-sdk).
- Embedding model.
- SQLite + sqlite-vec.
- Event bus / task engine (write triggers).
- Provenance tracker.

## Strengths
- Enables "memory of events," not just facts — critical for personal assistants.
- Time-indexed → supports recency-weighted retrieval and timelines.
- Pointer to raw transcript preserves auditability.
- Natural input to autobiographical memory and to consolidation.

## Weaknesses
- Volume grows fast — must compress/decay or retrieval degrades.
- Summaries lose detail; raw pointer is mandatory.
- Distinguishing "episodic-worthy" events from noise is itself an LLM judgment call.
- Privacy-sensitive by nature (PII, conversations).

## Failure Modes
- Over-recording (every turn → noise) or under-recording (misses key events).
- Wrong timestamp/timezone handling.
- Summary drift: re-summarizing during consolidation loses fidelity.
- Embedding model change breaks similarity without re-index.

## Security Implications
- Episodes often contain raw user speech — PII, secrets, sensitive decisions.
- Needs field-level access control, encryption at rest, retention policy, purge-on-request.
- Provenance must be tamper-evident for audit.

## Performance Implications
- Writes are amortized (async, batched); reads are bounded by topK + filters.
- Index on `(ts, actor, type)` plus embedding index.
- Consolidation must run in background worker, not request path.

## Operational Implications
- Episode browser UI (timeline view) for trust/debug.
- Backup includes raw transcript pointers (don't orphan them).
- Retention policy: keep raw pointer N days, then summarized-only.

## Alternatives
- **Single transcript log** (loses time/actor indexing, slow recall).
- **Semantic-only memory** (loses event recall entirely).
- **MemGPT-style archival messages** (coarser; no typed episode schema).

## Maturity & Production Readiness
- Cognitive science: mature (Tulving 1972).
- Production agent stores: emerging — Zep and Letta ship episodic-ish layers; Mem0 has episodic mode.

## Relevant Research / Papers
- Tulving (1972) — original episodic/semantic distinction.
- Zep (2024) — temporal episodic graph memory.
- Mem0 (2024) — episodic add/update path.

## Official Documentation
- Zep: https://docs.getzep.com/
- Letta memory blocks: https://docs.letta.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Prisma model `Episode`**: `id, occurredAt DateTime, actor String, type String, summary String, rawRef String (path/URI), participants Json, outcome String?, embeddingId String, confidence Float, provenance Json, createdAt, lastAccessedAt`.
- **sqlite-vec** virtual table `episode_vec(rowid, embedding)` joined to `Episode.id`.
- **Writer**: Next.js server route invoked from event bus; calls GLM-5.2 to summarize, calls embedding model, persists.
- **Background consolidation worker** (Node script spawned from `instrumentation.ts`) on cron: read episodes older than 7d, summarize clusters → write to semantic store, mark episode as `consolidated=true`.
- **socket.io** emits `episode.recorded` so the UI timeline updates live.
- **Zustand** stores the "current session episodes" list for in-conversation recall chips.
- **Caddy** exposes the Next.js + socket.io behind one port.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory). CAPABILITY_MAP §3 lists Episodic Memory as CORE. Feeds autobiographical memory (I) and is consumed by Context Layer (Layer 2) for "what did we do" queries, and by Learning Layer (13) for experience extraction.

## Recommended Usage
- Record on: task completion, user decision, tool call with significant side effect, scheduled-job outcome, error+recovery.
- Do not record every chat turn as a separate episode — record conversation-level episodes with turn pointers.
- Default retention: raw pointer 30 days, summarized record indefinitely.
- Recency-weighted ranking in retrieval (e.g., score × decay(ts)).

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite + sqlite-vec store; GLM-5.2 summarizer; background consolidation worker.

## Sources
- Tulving, E. (1972). *Episodic and Semantic Memory.*
- Packer et al. (2023). *MemGPT.* arXiv:2310.08560.
- Mem0 (2024). arXiv:2504.19413.
- Zep (2024). arXiv:2501.13956.
- MiMo AI `docs/CAPABILITY_MAP.md` §3.
- Inventory lines 322–330 (Episodic Memory, P0).
