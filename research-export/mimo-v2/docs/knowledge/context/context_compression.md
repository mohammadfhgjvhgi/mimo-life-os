# Context Compression

**Category:** Context
**Status:** CORE
**Maturity:** Mature

## Definition
Techniques that reduce the token footprint of context items **without losing the information the model needs**. Includes summarisation of old conversation turns, memory-item consolidation, knowledge-chunk deduplication, and selective omission of low-value content. The goal: fit more *signal* into fewer *tokens*.

## Problem Solved
Even with a 1M-token window, long-running tasks (multi-hour research, multi-day coding, long chat sessions) eventually exceed budget. Without compression, the system either (a) drops critical items → quality collapse, or (b) throws a context-overflow error → task fails. Compression is the controlled alternative: shrink, don't drop.

## Why It Matters
MiMo is explicitly a **long-horizon** system. Long-horizon = sustained context across many turns, with resumability after crashes (`PROJECT_UNDERSTANDING.md` §4 Layer 10). Without compression, every checkpoint either re-loads a huge prompt (expensive, slow) or drops history (lossy). Compression is what lets MiMo run for hours/days without context bankruptcy.

## How It Works
Multiple complementary techniques:
1. **Conversation summarisation** — periodically summarise the oldest N turns into a single `summary` message; replace them.
2. **Memory-item consolidation** — group related memory items, summarise the group, store the summary + a representative.
3. **Knowledge-chunk deduplication** — embed chunks, cluster by similarity, keep one representative per cluster.
4. **Tool-result pruning** — old tool outputs replaced with a one-line summary; only the latest K kept in full.
5. **Selective omission** — drop items with low relevance×recency×importance scores.
6. **Lossless compaction** — remove whitespace, collapse repeated patterns (cheap, low-risk).

## Architecture
Sub-component of the Context Layer. Triggered by:
- The Context Assembler when assembled prompt exceeds budget.
- The Execution Layer at checkpoint time (compress state before persisting).
- A periodic background job that consolidates long-running task state.

Uses the Model Layer to generate summaries (small model OK; doesn't need GLM-5.2). Writes compressed artifacts back to Memory Layer with a `compressed: true` flag and a reference to the originals.

## Interfaces
- `compress(selection: ContextSelection, targetTokens: number): Promise<ContextSelection>` — returns a smaller selection.
- `summariseTurns(turns: ConversationTurn[]): Promise<Summary>` — chat-specific.
- `consolidateMemory(items: MemoryItem[]): Promise<MemoryItem[]>` — memory-specific.
- `compressForCheckpoint(state: ExecutionState): Promise<CompressedState>` — used at checkpoint time.

## Dependencies
- A summarisation-capable model (small/cheap model OK; e.g., GLM-5.2-mini if available, or GLM-5.2 with a low-token limit).
- Tokeniser (for accurate target enforcement).
- Embedding model (for dedup clustering).

## Strengths
- Enables long-horizon execution within fixed context budget.
- Summaries preserve gist better than naive truncation.
- Compressed artifacts are cacheable and reusable across tasks.
- Composes cleanly with assembly (compress → assemble).

## Weaknesses
- **Lossy** — details are irreversibly lost when summarised.
- Summarisation itself costs a model call (latency + cost).
- Bad summaries propagate errors forward.
- Embedding-based dedup can merge items that are similar but critically different.

## Failure Modes
- **Over-compression**: too aggressive → key facts lost → wrong answers.
- **Summary drift**: summaries of summaries accumulate error.
- **Compression race condition**: state compressed while a tool is mid-flight.
- **Wrong-level compression**: compressing the wrong section (e.g., the active task).

## Security Implications
- Summaries may inadvertently retain sensitive data redacted from originals — re-scan compressed artifacts for PII/secrets.
- Compressed artifacts are stored — same access controls as raw memory.
- Compression model output is itself susceptible to prompt-injection if input contains untrusted content.

## Performance Implications
- Summarisation adds a model call per compression event (~1–3s).
- Compression at checkpoint time is on the critical path — keep it bounded.
- Compressed prompts → faster model calls + lower cost downstream.

## Operational Implications
- Need a compression policy per task class (e.g., chat: summarise every 10 turns; coding: keep full file refs, summarise conversation).
- Need metrics: compression ratio, summary quality (downstream task success), compression latency.
- Need a UI to expand compressed sections for debugging.

## Alternatives
- Truncation — drops oldest content blindly; loses signal.
- Larger context window — doesn't solve unbounded growth.
- External memory (full offload to retrieval) — works for some content but adds retrieval latency per turn.

## Maturity & Production Readiness
Mature. Every major chat product (ChatGPT, Claude, Gemini) does conversation summarisation. Memory consolidation is newer but well-attested (MemGPT, Mem0, Letta). Production-ready with care.

## Relevant Research / Papers
- Packer et al., 2023 — *MemGPT: Towards LLMs as Operating Systems* (memory hierarchy + compression).
- Zhong et al., 2024 — *MemoRAG* (memory-based retrieval).
- Anthropic, 2024 — *Contextual Retrieval* (related — annotated chunks).
- Xiao et al., 2023 — *LLM-Inference Acceleration* (KV-cache compaction, related).

## Official Documentation
- LangChain memory + summariser docs.
- LlamaIndex memory modules.
- Letta (formerly MemGPT) docs.

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement `lib/context/compression.ts` with multiple strategies, dispatched by content type.
- Use a small/cheap model for summarisation calls (route via Model Layer's fallback strategy — do NOT burn GLM-5.2 tokens on summarisation).
- Store compressed artifacts in Prisma `CompressedArtifact { id, sourceType, sourceIds JSON, summary, tokens, modelUsed, createdAt }`.
- Originals retained (don't delete) — compression is additive (a `compressed` view), not destructive.
- Trigger policy:
  - Conversation: when turn count > 10 AND total tokens > budget×0.7.
  - Memory: nightly consolidation job (cron-style via Execution Layer's scheduler).
  - Checkpoint: compress at every checkpoint before persisting.
- Stream compression progress via socket.io (`compression:started`, `compression:done`).
- Add a `expand` API endpoint to fetch originals for a compressed artifact (Next.js API route `GET /api/context/compressed/:id/originals`).

## Relevance To Our Project (MiMo AI specifically)
Compression is **mandatory for MiMo's long-horizon execution model** (`PROJECT_UNDERSTANDING.md` §4 Layer 10 + §8 decision #9: "Long-horizon = checkpoints + resumability"). Without compression, checkpoints become huge and resumability is impractical. Compression is also where Memory Layer consolidation intersects Context Layer — the same summarisation primitive serves both. It directly satisfies `CAPABILITY_MAP.md` §2 (Context compression/summarization = C; Memory compression = R; Memory consolidation = C).

## Recommended Usage
- Summarise conversation turns older than the active window.
- Consolidate memory items nightly (background job).
- Compress execution state at every checkpoint.
- Keep originals; never destroy — compression is a view, not a delete.
- Use a cheap model for summarisation; save GLM-5.2 for reasoning.
- Surface compression ratio in the observability dashboard.

## Decision
**ADOPT** — required for long-horizon execution; non-negotiable for MiMo's runtime model.

## Sources
- Packer et al., 2023, arXiv:2310.08560 (MemGPT).
- Anthropic, 2024 — Contextual Retrieval blog.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #390 (Context Compression, P1).
- Internal: `docs/CAPABILITY_MAP.md` §2 (Context compression = C).
- Internal: `docs/PROJECT_UNDERSTANDING.md` §4 Layer 10 + §8 decision #9.
