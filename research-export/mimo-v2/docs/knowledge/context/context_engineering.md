# Context Engineering

**Category:** Context
**Status:** CORE
**Maturity:** Mature

## Definition
The discipline of deciding **what enters the model's prompt window** at each call: which conversation turns, which task state, which memory items, which knowledge chunks, which tool results, which agent state — and in what order, with what priority, under what budget. It is the art and engineering of treating the context window as a scarce, contested resource rather than a dump-everything buffer.

## Problem Solved
A model with a 1M-token window still degrades when stuffed with irrelevant, redundant, or stale content: attention is diluted, recall drops, latency rises, cost climbs, and prompt-injection surface grows. "Bigger context" is not "better context." Without engineering, the prompt becomes an unstructured pile that hurts every downstream layer.

## Why It Matters
Context engineering is the **governing principle of MiMo's Context Layer (Layer 2)** — explicitly called out in `PROJECT_UNDERSTANDING.md` §4. Every capability the system has (reasoning, planning, tools, memory, knowledge) is mediated by what the Context Layer assembles. The single most-cited principle in the source material: *context management ≠ context length*. This file is the umbrella concept; the four sibling files (assembly, compression, long-context management, plus this one) elaborate it.

## How It Works
Context engineering is a pipeline:
1. **Identify candidate items** — task, conversation, workspace, files, memory hits, knowledge hits, agent/tool/execution state, goal state, user preferences.
2. **Score** each item by relevance, recency, importance, and confidence.
3. **Budget** — allocate token budget across categories (e.g., 30% memory, 40% knowledge, 20% conversation, 10% system).
4. **Select** — keep top-K items per category within budget.
5. **Order** — place highest-priority items at the start and end of the prompt (primacy/recency effects).
6. **Compress** — summarise lower-priority items instead of dropping them.
7. **Assemble** — render the final prompt with clear section delimiters.
8. **Re-evaluate** — after each model call, update context based on what was learned.

## Architecture
MiMo's Context Layer is the home. It is a service with sub-components:
- **Context Router** — selects which sub-assemblers run for the current task type.
- **Context Assembler** — combines outputs into a final prompt.
- **Context Compressor** — summarises when over budget.
- **Context Cache** — memoises assembled prefixes across calls.
- **Context Budgeter** — enforces token caps per category.
Consumes from Memory Layer (ranked retrieval), Knowledge Layer (reranked chunks), Execution Layer (state). Feeds Reasoning Layer.

## Interfaces
- `assembleContext(task: TaskSpec): Promise<AssembledContext>` returning `{ prompt: Message[], tokenCount, breakdown: ContextBreakdown }`.
- `ContextBudget` config: `{ total, byCategory: { memory, knowledge, conversation, system, tools, ... } }`.
- Hooks: `preAssembly`, `postAssembly` for plugins (e.g., PII redaction, prompt-injection scan).

## Dependencies
- Tokeniser (accurate per-provider tokenisation).
- Memory Layer retrieval (hybrid search).
- Knowledge Layer retrieval (BM25 + vector + rerank).
- A budget policy (per task class).
- Plugin interface for pre/post hooks.

## Strengths
- Decouples "what the model knows" from "what the model is shown" → controllable.
- Enables a 1M-token model to behave like a 10M-token model via selective retrieval.
- Composable with every other layer.
- Token-cost savings are immediate and measurable.

## Weaknesses
- Scoring heuristics are imperfect — wrong items selected.
- Budget allocation is brittle if task profile is misclassified.
- Compression can lose critical details.
- Adds latency (retrieval + ranking + compression).

## Failure Modes
- **Context omission**: critical item not retrieved → wrong answer.
- **Context pollution**: irrelevant items dilute attention.
- **Context ordering**: key item buried in the middle → forgotten.
- **Context staleness**: state from N turns ago no longer accurate.
- **Budget misallocation**: too much to one category, starving others.

## Security Implications
- The Context Layer is the primary defense point against **prompt injection** — every retrieved item must be scanned and tagged (trusted vs untrusted).
- PII / secrets in retrieved items must be redacted before assembly.
- Untrusted content (web pages, tool outputs) must be delimited so the model treats it as data, not instructions.

## Performance Implications
- Retrieval + ranking + compression add 50–500ms per call.
- Smaller prompts → lower latency + lower cost.
- Caching assembled prefixes saves repeated work.

## Operational Implications
- Need per-task-class context profiles.
- Need metrics: token usage breakdown, retrieval hit rate, compression ratio, prompt-injection detection rate.
- Need a UI in the Next.js console to inspect the assembled context per call.

## Alternatives
- "Dump everything" — naive; fails above a few KB.
- Fixed template — works for trivial apps; doesn't scale to MiMo.
- Pure RAG — covers knowledge but ignores memory/state/goal context.

## Maturity & Production Readiness
Mature as a discipline, but most teams under-invest in it. Production-ready patterns exist (Anthropic contextual retrieval, LangChain context managers, OpenAI Assistants' context management). The hard part is the engineering investment, not research risk.

## Relevant Research / Papers
- Lewis et al., 2020 — *Retrieval-Augmented Generation* (RAG foundation).
- Anthropic, 2024 — *Contextual Retrieval* (context-aware chunk annotation).
- Lin et al., 2024 — *RAPTOR* (hierarchical retrieval).
- Xiao et al., 2023 — *Longcontext Transformers* (engineering view).

## Official Documentation
- Anthropic Context Engineering guidance (2024+).
- OpenAI prompt-engineering guide on context.
- LangChain Context / Memory modules.

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Implement as a dedicated Next.js server-side service `lib/context/engine.ts` exposing `assembleContext`.
- Sub-assemblers as plugins implementing `ContextAssembler` interface — easy to add/remove.
- Budget config in Prisma `ContextProfile { taskClass, totalTokens, byCategory JSON }` — editable via Next.js admin UI.
- Token counting via `tiktoken` (or provider's tokenizer) wrapped in a TS module — never guess.
- Cache assembled prefixes in SQLite (`ContextCache { hash, assembled JSON, tokens, createdAt, ttl }`) — invalidate on memory/knowledge updates.
- Pre-assembly hooks: PII redaction (regex + detector), prompt-injection classifier (small model), secret scanner.
- Post-assembly: emit `context:assembled` event to socket.io for live UI inspection.
- Render in Next.js console as a collapsible "What the model saw" panel.

## Relevance To Our Project (MiMo AI specifically)
Context engineering is **MiMo's Context Layer (Layer 2)** — the single layer that, more than any other, decides whether the system behaves like "a smart model with stuff" or "an incoherent model with stuff." The source material repeatedly stresses: a 1M-token window does NOT replace context management. MiMo must rank, compress, retrieve-on-demand, and assemble deliberately. This is also where prompt-injection defense lives — every retrieved item (memory, knowledge, web) is suspect until tagged. The four sibling knowledge files (assembly, compression, long-context management, and this umbrella) collectively define the layer.

## Recommended Usage
- Always go through the Context Layer — never let an agent call the model directly.
- Define per-task-class profiles (chat, coding, research, browser, verification).
- Treat token budget as a first-class resource — log it, alert on overruns.
- Add PII + injection scanning as pre-assembly hooks from day one.
- Expose the assembled context in the UI for debugging.

## Decision
**ADOPT** — MiMo's Context Layer in its entirety; the principle is non-negotiable per the source material.

## Sources
- Lewis et al., 2020, arXiv:2005.11401.
- Anthropic, 2024 — Contextual Retrieval blog post.
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` rows #389–400 (category 24, Context Engineering).
- Internal: `docs/CAPABILITY_MAP.md` §2 (all context capabilities).
- Internal: `docs/PROJECT_UNDERSTANDING.md` §4 Layer 2 and §8 decision #4.
