# Long-Context Management

**Category:** Context
**Status:** CORE
**Maturity:** Mature

## Definition
The set of techniques for *using* a very large context window (100k–1M+ tokens) effectively: how to fill it, how to keep it coherent, how to avoid the well-documented "lost in the middle" attention degradation, and how to keep latency/cost under control when the prompt is huge. It is *not* the same as compression (which shrinks) — long-context management is about *operating well at scale*.

## Problem Solved
Models advertise 1M-token windows, but in practice:
- **Quality degrades** as context grows — the "lost in the middle" phenomenon: items in the middle of a long prompt are recalled worse than items at the start or end.
- **Latency grows** roughly linearly with context length (worse for some architectures).
- **Cost grows** linearly with input tokens.
- **Attention dilutes** — relevant items compete with irrelevant items.
So "the model supports 1M tokens" does not mean "you should put 1M tokens in every call."

## Why It Matters
GLM-5.2 is a long-horizon model — MiMo is built around long-horizon tasks. The temptation is to dump everything into context and let the model sort it out. That fails empirically. MiMo must use the long window *deliberately*: structure it, place key items at start/end, use the long window for *retrieval-on-demand* rather than *stuff-everything*. This is the explicit principle from `PROJECT_UNDERSTANDING.md` §8 decision #4: *context management ≠ context length*.

## How It Works
1. **Reserve the long window for genuine long context** — full documents, multi-turn trajectories, large codebases — not for "just in case" padding.
2. **Position-critical placement** — system instructions and the active task at the *start*; the most relevant retrieved items at the *end* (recency); filler in the middle.
3. **Sectioning** — explicit delimiters + section headers so the model can navigate.
4. **Retrieval-on-demand** — even with a 1M window, retrieve the right 50k tokens rather than stuffing 500k.
5. **Sliding window** — for very long sessions, keep recent context full; summarise the older portion (compression).
6. **KV-cache reuse** — for repeated long prefixes (system prompt + workspace), cache the KV state so only the changing tail is recomputed (provider-dependent).
7. **Latency budgeting** — long-context calls are slow; budget wall-clock per call; stream tokens to mask latency.

## Architecture
Spans Context Layer + Model Layer:
- Context Layer: positions items, applies sectioning, decides what fits.
- Model Layer: enables KV-cache reuse where supported, streams output, reports per-call latency.
- Execution Layer: tracks wall-clock per model call, raises alerts on overruns.
- Observability: logs per-call token count + latency + position-of-key-items.

## Interfaces
- `assembleLongContext(task: TaskSpec, window: TokenWindow): Promise<AssembledPrompt>` — window-aware assembler.
- `positionItem(item: ContextItem, position: 'start'|'middle'|'end'): void` — explicit placement.
- `cacheKV(promptPrefix: Message[]): Promise<CacheKey>` — request KV-cache reuse (if provider supports).

## Dependencies
- Provider with long-context support (GLM-5.2 supports long context).
- Provider KV-cache API (where available; otherwise no-op).
- Tokeniser.
- Observability for per-call latency + token metrics.

## Strengths
- Lets MiMo handle genuinely long inputs (large docs, long sessions, big codebases) without fragmentation.
- Proper placement recovers most of the "lost in the middle" penalty.
- KV-cache reuse gives major latency/cost wins for repeated long prefixes.
- Pairs with compression for unbounded sessions.

## Weaknesses
- Even with placement, very long contexts still degrade somewhat.
- KV-cache APIs are provider-specific — abstraction needed.
- Latency is unavoidable for huge prompts.
- Cost scales with input tokens — expensive at 1M scale.

## Failure Modes
- **Lost in the middle**: critical item buried → wrong answer.
- **Window overflow**: exceeded provider max → API error.
- **Stale cache**: KV-cache invalidation failure → wrong context served.
- **Position drift**: items reordered across calls → inconsistent behaviour.

## Security Implications
- Long contexts increase prompt-injection surface (more content = more attack vectors).
- KV-cache reuse can leak content between sessions if cache keys are not user-scoped — strict cache-key namespacing by user + session.
- Audit logs of long-context calls are themselves huge — store redacted summaries, not full prompts.

## Performance Implications
- Long contexts are slow and expensive — reserve for tasks that genuinely need them.
- KV-cache reuse can cut latency 30–70% for repeated prefixes.
- Streaming masks perceived latency for end users.

## Operational Implications
- Need per-task budget (typical: 10k–100k; only allow 500k+ for explicitly long-input tasks).
- Need latency alerts (call > 30s → investigate).
- Need cost alerts (call > $X → investigate).
- Need to monitor "lost in the middle" empirically (probe tests).

## Alternatives
- Always-short context + aggressive retrieval — works but loses holistic view of long inputs.
- Sliding window without long-context — loses distant information.
- Multi-agent split (each agent handles a slice) — adds complexity; useful only when slices are independent.

## Maturity & Production Readiness
Mature. Long-context models (Claude 200k+, Gemini 1M+, GLM-5.2) are production-deployed. KV-cache reuse is newer but standardising (Anthropic prompt caching, OpenAI prompt caching, Gemini context caching). Production-ready with engineering care.

## Relevant Research / Papers
- Liu et al., 2023 — *Lost in the Middle: How Language Models Use Long Contexts*. (canonical)
- Anthropic, 2024 — *Prompt Caching* announcement.
- Ratner et al., 2023 — *Parallel Context Windows*.
- Xiao et al., 2023 — *Efficient Streaming Language Models with Attention Sinks*.

## Official Documentation
- Anthropic prompt caching docs.
- OpenAI prompt caching docs.
- Google Gemini context caching docs.
- Z.ai GLM-5.2 model card / API docs (long-context capabilities).

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement `lib/context/long-context.ts` as a window-aware assembler used by the Context Layer.
- Position-aware rendering: system prompt → workspace + task → retrieved knowledge/memory → conversation tail → final instruction. Critical retrieved items go at the end.
- Use explicit section headers (`=== SYSTEM ===`, `=== KNOWLEDGE ===`, etc.) — helps model navigate.
- Wrap z-ai-web-dev-sdk calls to request prompt caching where supported (pass stable prefix identifier).
- Cache key must be namespaced: `${userId}:${sessionId}:${hash(prefix)}` — never share across users.
- Per-task token budget enforced via Prisma `TaskClass { id, maxContextTokens, maxOutputTokens }` config — editable in admin UI.
- Stream long-context responses via socket.io (essential for UX; long generations without streaming feel broken).
- Per-call metrics to Prisma `ModelCall { id, taskId, inputTokens, outputTokens, latencyMs, costUsd, cacheHit }` for observability + cost tracking.

## Relevance To Our Project (MiMo AI specifically)
Long-context management is the **operational discipline** that makes MiMo's choice of GLM-5.2 (a long-horizon model) actually pay off. Without it, the long window is wasted — either by stuffing-everything (quality collapse) or by ignoring it (no benefit). It also underwrites long-horizon execution (Layer 10): tasks running for hours need to maintain coherence across many turns, which is exactly what long-context + placement + KV-cache + compression together provide. It satisfies `CAPABILITY_MAP.md` §2 (Context Windows = C) and is the practical manifestation of `PROJECT_UNDERSTANDING.md` §8 decision #4.

## Recommended Usage
- Use the long window for genuine long inputs (full docs, big codebases, long sessions) — not as a dumping ground.
- Always place key items at start (system) and end (active task + most-relevant retrieval).
- Enable KV-cache reuse for stable prefixes.
- Budget per task class; alert on overruns.
- Stream responses to mask latency.
- Pair with compression for unbounded sessions.

## Decision
**ADOPT** — required to use GLM-5.2's long-context capability effectively; non-negotiable for long-horizon execution.

## Sources
- Liu et al., 2023, arXiv:2307.03172 (Lost in the Middle).
- Anthropic, 2024 — Prompt Caching.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #396 (Context Windows, P0).
- Internal: `docs/CAPABILITY_MAP.md` §2 (Context Windows = C).
- Internal: `docs/PROJECT_UNDERSTANDING.md` §8 decision #4.
