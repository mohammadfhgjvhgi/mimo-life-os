# GLM-5.2 (Z.ai API)

**Category:** Models
**Status:** CORE
**Maturity:** Production-ready (Z.ai hosted API)

## Definition
GLM-5.2 is Z.ai's flagship long-context, long-horizon general-purpose large language model, accessed through the Z.ai API. In MiMo AI it serves as the **primary reasoning brain** — the model that owns understanding, planning, tool-selection, reflection, and final-answer generation across the Runtime OS. It is **NOT** ZCode (Z.ai's separate developer product); GLM-5.2 is the chat/reasoning model exposed through the Z.ai API and the `z-ai-web-dev-sdk` client.

Key capabilities advertised by Z.ai for the GLM-4.5/5.x family and carried into GLM-5.2 (per Z.ai public docs): very large context window (≈1M tokens for GLM-4.5/5 long-context variants), native tool/function calling, structured (JSON) output, multimodal (image) input, and a long-horizon positioning aimed at agentic workflows that span many turns and many tools.

> NOTE: Specific numeric limits (exact context length, exact model ID strings, pricing, rate limits) must be confirmed against Z.ai's current API documentation at integration time. Treat any number cited here as **planning guidance, not a contract**.

## Problem Solved
A personal autonomous AI needs a model that can:
- Hold a long, multi-step task in mind across many tool calls without losing the thread.
- Decide *when* to call a tool vs. answer directly.
- Produce structured JSON the runtime can parse reliably.
- Look at images (screenshots, diagrams, scanned docs).
- Stay coherent across an entire long-horizon run (hours/days) given proper checkpointing.

GLM-5.2 is the model chosen to fill that role in MiMo AI. The Runtime OS exists precisely because the model alone cannot guarantee any of the above — it only provides the raw capability.

## Why It Matters
GLM-5.2 is the cognitive engine. Every reasoning, planning, tool-call, verification, and learning decision ultimately passes through it (or through a fallback model). Picking the right primary model determines the ceiling of the whole system. Picking GLM-5.2 specifically buys: (1) long context (reduces retrieval pressure for medium tasks), (2) long-horizon positioning (model is trained/tuned for agentic, multi-turn work, not just single Q&A), (3) native tool calling (no fragile prompt-injection of tools), (4) multimodal (one model handles text + images), (5) structured output (drives reliable downstream parsing).

## How It Works
- **API access:** Z.ai exposes a chat-completions-style HTTP API. The `z-ai-web-dev-sdk` package wraps this for Node.js, returning typed responses and handling auth via `ZAI_API_KEY`.
- **Tool calling:** The request includes a `tools` array (JSON-schema-typed function definitions). The model decides to emit `tool_calls`; the runtime executes them and feeds back `tool_results`; the model continues. This is the ReAct loop primitive.
- **Structured output:** A `response_format: { type: "json_schema", json_schema: {...} }` parameter (or equivalent) constrains the model to emit JSON conforming to a schema — used for plans, verifier verdicts, memory records, lessons.
- **Multimodal:** Messages can include image parts (URL or base64). Used for screenshot reasoning, OCR fallback, diagram understanding.
- **Long context:** When needed, large inputs (many files, long transcripts, retrieved knowledge) can be passed in one request. This is **a capability, not a strategy** — see Critical Note below.

### Critical Note: Context Length ≠ Context Management
> **Advertised context capacity (≈1M tokens) is NOT a substitute for good context/memory management.** Even at 1M tokens, models degrade on:
> - Recall of mid-context details ("lost in the middle").
> - Instruction following when context is saturated with retrieved noise.
> - Cost and latency (long inputs are expensive and slow).
> - Cross-session continuity (a context window does not persist between processes).
>
> MiMo AI must still implement: working/short/long-term memory, on-demand retrieval, context compression/summarization, hybrid search, and checkpointed long-horizon state. GLM-5.2's large context **lowers the frequency** of retrieval/summarization, it does **not eliminate** the need for it. The Context Layer owns this; the Model Layer just receives whatever the Context Layer assembles.

## Architecture
```
Reasoning/Planning/Verifier/Executive ──call──▶ Model Gateway
                                                      │
                                                      ▼
                                              Provider Adapter (Z.ai)
                                                      │
                                                      ▼
                                               Z.ai API (HTTPS)
                                                      │
                                                      ▼
                                                   GLM-5.2
                                                      │
                                                      ▼
                              Response { text, tool_calls, structured, usage }
                                                      │
                                                      ▼
                                          Observability (tokens, $, latency)
```
- The model is **never** called directly except through the Model Gateway (see `model_gateway.md`).
- The Gateway chooses GLM-5.2 as the default primary; fallbacks live behind the same interface.
- Tool calls flow back into the Tool Layer, not directly to the user.

## Interfaces
From the runtime's perspective, GLM-5.2 is just one adapter satisfying the `ModelProvider` interface (see `model_gateway.md`):
```ts
interface ChatRequest {
  messages: Message[];            // system + user + assistant + tool roles
  tools?: ToolSchema[];           // JSON-schema function definitions
  responseFormat?: 'text' | 'json_schema';
  jsonSchema?: JSONSchema;        // when responseFormat === 'json_schema'
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  model?: 'glm-5.2' | 'glm-5.2-long' | string;   // Z.ai model IDs (verify at integration)
}
interface ChatResponse {
  content: string | null;
  toolCalls?: ToolCall[];
  structured?: unknown;           // parsed JSON when json_schema requested
  usage: { inputTokens, outputTokens, costUsd };
  finishReason: 'stop' | 'tool_calls' | 'length' | 'content_filter';
}
```
The Z.ai adapter is implemented via `z-ai-web-dev-sdk` (already in the scaffold). The SDK is backend-only — never call it from the Next.js client.

## Dependencies
- `z-ai-web-dev-sdk` (Node.js client, already in scaffold).
- `ZAI_API_KEY` env var (managed by Secrets subsystem, never committed).
- HTTPS egress (allowed by Caddy/network policy).
- Model Gateway wrapper (mandatory; no direct SDK calls outside the adapter).
- Observability layer (to record tokens/cost/latency per call).
- Retry/circuit-breaker (Z.ai API can 429/5xx; the Gateway handles this).

## Strengths
- Long context reduces retrieval pressure for medium tasks (but does not remove it — see Critical Note).
- Long-horizon positioning: better at agentic multi-turn/tool-use coherence than vanilla chat models.
- Native tool calling → no prompt-injection parsing fragility.
- Structured (JSON-schema) output → reliable downstream parsing.
- Multimodal input → screenshots, diagrams, scanned pages in one model.
- One vendor for chat+vision+tools → simpler billing, one key, one SDK.
- Strong non-English (incl. Chinese and Arabic) capability — useful for the primary user's mixed-language content.

## Weaknesses
- Vendor lock-in risk if model calls aren't behind the Gateway (hence the Gateway mandate).
- Long-context pricing can be high — large prompts cost real money; the Context Layer must still compress.
- "Lost in the middle" recall degradation persists even with large windows.
- Multimodal quality on complex diagrams/UX screenshots may lag dedicated vision models — keep a swap option.
- Rate limits and occasional 429/5xx — must be handled with retry + fallback.
- Knowledge cutoff — recent facts still need Knowledge Layer / tool search.
- Hallucination on facts — Verification Layer exists precisely because the model can be wrong.

## Failure Modes
- **Context saturation:** stuffing 800k tokens of low-relevance retrieval tanks quality even though the window "fits."
- **Silent tool-schema misunderstanding:** model emits a tool call with subtly wrong argument types; runtime must validate before executing.
- **JSON-schema violations:** even with `response_format=json_schema`, edge cases (empty arrays, wrong enum) happen — always `try/catch` and re-prompt on parse failure.
- **Hallucinated citations / fake tool results:** model may "imagine" a tool returned data. The runtime must inject only real `tool_results`.
- **Cost runaway:** long-horizon runs that loop on tools without progress can burn budget — enforce per-task token/cost ceilings.
- **Rate-limit storms:** many concurrent agents all hitting the same key → 429 cascade → backoff storms. Gateway must serialize/coalesce.
- **Outage:** Z.ai API down → fallback chain must activate (see `model_routing.md`).

## Security Implications
- **Prompt injection:** model output is untrusted text — never `eval` it, never pass it to a shell without sanitization. Tool arguments must be validated against schema before execution.
- **Secret leakage:** system prompts may contain sensitive context; never echo secrets back to the user or to tool calls that would exfiltrate them.
- **PII egress:** long-context inputs may include personal data sent to Z.ai servers — acceptable for a single-user personal AI, but must be acknowledged in the privacy posture; the Gateway can mask/redact on the way out for sensitive fields.
- **API key exposure:** `ZAI_API_KEY` only ever lives server-side (Caddy + Next.js server runtime); the client talks to our own `/api/model` route.
- **Content filtering:** Z.ai may filter certain outputs — the Gateway must surface `finishReason: 'content_filter'` distinctly so the runtime can react.

## Performance Implications
- Latency: long prompts → longer time-to-first-token. Stream whenever UX allows it.
- Token cost: track per-request and per-task; aggregate into the Cost subsystem (Observability).
- Concurrency: bound parallel model calls (semaphore) to avoid 429s and to keep cost predictable.
- Caching: identical prompt+params within a short window can be cached by request hash (Gateway-level) for deterministic, non-creative calls (e.g., structured extraction).
- Cold starts: not applicable (stateless API), but first-call latency for new sessions includes SDK init.

## Operational Implications
- Need a `MODEL_PROVIDER=zai` + `ZAI_MODEL=glm-5.2` config (env-driven, swappable).
- Need a model-version pinning policy — when Z.ai ships GLM-5.3 we re-run evaluation before adopting.
- Need cost dashboards (per task type, per agent) — the Observability subsystem aggregates Gateway emissions.
- Need an incident runbook for Z.ai outages (fallback activation, queueing, user notification).
- Need per-task token/cost budgets enforced in the Execution Layer.

## Alternatives
- **Claude 4 / Claude Sonnet (Anthropic):** strong long-context + tool use; candidate fallback #1.
- **GPT-4o / GPT-5 (OpenAI):** strong multimodal + tools; candidate fallback #2.
- **Gemini 2.5 (Google):** very large context; candidate fallback #3.
- **Llama 4 / Qwen 3 (open-weight):** self-hosted local fallback for offline / privacy-sensitive work.
- **DeepSeek V3 / Mistral Large:** deep-reasoning or European-data alternatives.
- **OpenRouter / Together / Fireworks:** routing layers / hosts for the open-weight fallbacks.
- All of the above are reachable through the **same** `ModelProvider` interface — that's the entire point of the Gateway.

## Maturity & Production Readiness
- Z.ai API: production, hosted, billed, documented. Suitable for v1.
- GLM-5.2 specifically: positioned by Z.ai as the long-horizon/agentic model — adopt as default.
- The `z-ai-web-dev-sdk` is already in the scaffold and is the supported client.
- **Caveat:** confirm exact model IDs, context limits, and pricing against current Z.ai docs before locking the design.

## Relevant Research / Papers
- Z.ai GLM technical reports (GLM-4, GLM-4.5, GLM-5 series) — *inferred relevant; verify title/author at integration*.
- "Lost in the Middle: How Language Models Use Long Contexts" (Liu et al., 2023) — the canonical reference for why long context ≠ solved memory.
- ReAct: "Synergizing Reasoning and Acting in Language Models" (Yao et al., 2022) — the tool-loop pattern GLM-5.2 supports natively.
- Tool-augmented / function-calling LLM literature (OpenAI, Anthropic, Google parallel work).

## Official Documentation
- Z.ai API docs: `https://docs.z.ai/` (verify exact URL at integration; canonical Z.ai developer documentation).
- `z-ai-web-dev-sdk` README (in-repo `node_modules`).
- Tool-calling and structured-output spec: Z.ai API reference (model + chat-completions section).
- *Mark all numeric limits as "verify against current Z.ai docs" before pinning.*

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** `z-ai-web-dev-sdk` is imported exclusively in Next.js server runtime (route handlers, server actions, mini-service workers). Never expose `ZAI_API_KEY` to the browser; client talks to `/api/model/*` which proxies through the Gateway.
- **Gateway pattern.** Create `src/server/model/gateway.ts` exposing `chat()`, `chatStructured()`, `embed()` (see `model_gateway.md`). The Z.ai adapter `src/server/model/providers/zai.ts` is the only file that imports `z-ai-web-dev-sdk`.
- **Streaming over socket.io.** For chat UX, the route handler emits chunks via socket.io; zustand store on the client appends tokens live.
- **Persistence.** Every model call is logged (request hash, model, tokens, cost, latency, finishReason) into a Prisma `ModelCall` table — this is the raw data for the Cost/Latency/Evaluation subsystems.
- **Config.** `MODEL_PROVIDER=zai`, `ZAI_MODEL=glm-5.2`, `ZAI_API_KEY=...`, `ZAI_BASE_URL=...` (if SDK supports override) via env. Prisma `SystemConfig` table mirrors overrides set from the UI Settings page.
- **Mini-services.** Long-running model-heavy work (e.g., batch embedding, evaluation runs) can run as a mini-service worker consuming the same Gateway — never as a separate SDK call path.
- **Caddy.** All model egress goes through Caddy's TLS termination; the model route is the only one the browser hits.
- **Cost guard.** Per-task token/cost ceiling enforced at the Gateway (rejects calls that would exceed the budget) — protects against runaway loops.

## Relevance To Our Project (MiMo AI layered runtime)
GLM-5.2 sits at the bottom of the stack as the cognitive engine but is **wrapped** by:
- Layer 1 (Model Layer): the Gateway + adapter that owns the SDK.
- Layer 2 (Context Layer): decides what tokens reach GLM-5.2 — the model never sees the raw universe.
- Layer 11 (Verification Layer): checks GLM-5.2's outputs — "the model said it" is never sufficient.
- Layer 13 (Learning Layer): turns GLM-5.2's failures into lessons.
- Layer 15 (Security/Observability/Evaluation): wraps every call.

The non-negotiable rule: **nothing in MiMo AI calls GLM-5.2 directly except the Z.ai adapter inside the Model Gateway.** This is what makes the system portable to GLM-5.3, GLM-6, or any other model without rewriting reasoning/planning/verification code.

## Recommended Usage
- **Default primary** for: chat, planning, tool-calling, structured-output tasks, multimodal (image) reasoning, reflection, lesson distillation.
- **Switch to fallback** when: Z.ai API errors / rate-limited / cost ceiling hit / specific capability (e.g., specialized vision) better served by another model.
- **Always stream** for interactive chat; **batch** for evaluation/embedding pipelines.
- **Always validate** tool args and structured output before trusting them downstream.

## Decision
**ADOPT** — GLM-5.2 via Z.ai API as the primary brain, accessed exclusively through the Model Gateway. Critical caveats:
1. Context length ≠ context management — the Context Layer is mandatory regardless.
2. Adapter isolation — no SDK calls outside the Z.ai adapter.
3. Fallback chain — at least one alternative provider configured from day one.
4. Version pinning — model ID pinned in config; upgrades gated by evaluation.

## Sources
- Z.ai official API documentation — `https://docs.z.ai/` (verify URL/title).
- `z-ai-web-dev-sdk` package (in-repo `node_modules/z-ai-web-dev-sdk`).
- Project source material: `docs/PROJECT_UNDERSTANDING.md` §2 (Model ≠ System), §8.1 (GLM-5.2 via Z.ai API, not ZCode).
- Technology inventory: category 27 (LLMs) — lines 4599–4770 of `upload/تقنيات بناء ai شهر 8 2026.txt`.
- Liu et al., "Lost in the Middle: How Language Models Use Long Contexts," 2023 (arXiv:2307.03172) — *cited to ground the "context ≠ memory" rule; verify against the published version.*
- Yao et al., "ReAct: Synergizing Reasoning and Acting in Language Models," 2022 (arXiv:2210.03629).
- *Inferred:* specific GLM-5.2 capabilities (1M context, native tools, structured output, multimodal) — confirmed directionally against Z.ai's public GLM-4.5/5 marketing but exact numbers must be re-verified against current Z.ai docs at integration time.
