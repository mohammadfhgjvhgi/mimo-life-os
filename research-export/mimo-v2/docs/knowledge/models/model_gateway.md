# Model Gateway (Provider Abstraction)

**Category:** Models
**Status:** CORE
**Maturity:** Mature (well-established pattern; specific adapters vary)

## Definition
A Model Gateway is a uniform internal interface placed between the rest of the runtime and the actual LLM provider SDKs. It exposes a small set of stable operations — `chat`, `chatWithTools`, `chatStructured` (JSON-schema output), `embed`, and (where supported) `vision` — and routes each call to the appropriate provider adapter (Z.ai/GLM-5.2, OpenAI, Anthropic, Gemini, OpenRouter, local). The rest of MiMo AI never imports a provider SDK directly.

## Problem Solved
- **Vendor lock-in:** if Reasoning/Planning/Verification code imports `z-ai-web-dev-sdk` directly, switching or adding a provider requires touching every call site.
- **Inconsistent semantics:** each provider has slightly different tool-call schemas, structured-output syntax, streaming shapes, error formats.
- **No central place for cross-cutting concerns:** retries, rate-limit handling, cost/latency logging, caching, secrets, fallback, content-filter handling, prompt redaction, permission checks.
- **No fallback:** without a gateway, "GLM-5.2 is down → switch to Claude" means hunting every call site.

## Why It Matters
The Gateway is the **single most important structural decision** in the Model Layer. It is what makes MiMo AI portable, observable, cost-controlled, and resilient. Per `PROJECT_UNDERSTANDING.md` §8.3: *"Model Gateway abstraction — never hardcode the provider."* The Gateway is the enforcement mechanism for that rule.

## How It Works
1. **Interface:** a `ModelProvider` TypeScript interface declares every operation the runtime needs.
2. **Adapters:** one adapter per provider implements `ModelProvider` by translating to the vendor SDK.
3. **Router:** the Gateway holds a list of `(provider, model, priority)` entries; for each request it picks the best match (see `model_routing.md`) and dispatches.
4. **Cross-cutting:** the Gateway wraps every adapter call with: retry+backoff, circuit-breaker, cost/latency recording, request-hash caching, secret injection, schema validation of tool args, content-filter detection, fallback-on-error.
5. **Streaming:** the Gateway exposes an async-iterator/stream API; adapters normalize vendor streaming shapes into one event stream.
6. **Outbox/fallback:** on a hard failure (5xx, 429 exhausted, timeout), the Gateway advances to the next provider in the fallback chain.

## Architecture
```
                ┌────────────────────────────────────────────┐
Reasoning ─────▶│  Model Gateway                             │
Planning  ─────▶│   - Router (selects provider+model)        │
Verifier  ─────▶│   - Retry / circuit-breaker               │
Executive ─────▶│   - Cost / latency / token accounting     │
Embedder  ─────▶│   - Cache (request-hash)                  │
                │   - Secret injection                       │
                │   - Schema validation of tool args         │
                └────┬───────┬───────┬───────┬───────┬───────┘
                     ▼       ▼       ▼       ▼       ▼
                  Z.ai   OpenAI  Anthropic Gemini  Local
                  (GLM)  (GPT)   (Claude) (Gemini)(Llama/Qwen)
```
The Gateway is a **single** module under `src/server/model/`. It exposes a singleton (or context-scoped instance) used everywhere.

## Interfaces
```ts
type Message = { role: 'system'|'user'|'assistant'|'tool'; content: ContentPart[] | string; toolCallId?: string; toolCalls?: ToolCall[] };
type ToolSchema = { type: 'function'; function: { name: string; description: string; parameters: JSONSchema } };

interface ChatRequest {
  messages: Message[];
  tools?: ToolSchema[];
  responseFormat?: 'text' | 'json_schema';
  jsonSchema?: JSONSchema;
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
  // routing hints:
  preference?: 'quality' | 'latency' | 'cost' | 'longContext' | 'multimodal';
  requiredCapabilities?: ('toolCalling'|'structuredOutput'|'vision'|'longContext')[];
  fallback?: string[];            // ordered list of provider ids to try on failure
  budget?: { maxTokens: number; maxCostUsd: number };
  traceId?: string;               // for distributed tracing
}
interface ChatResponse {
  content: string | null;
  toolCalls?: ToolCall[];
  structured?: unknown;
  usage: { inputTokens: number; outputTokens: number; costUsd: number; latencyMs: number };
  finishReason: 'stop'|'tool_calls'|'length'|'content_filter'|'error';
  modelUsed: string;              // e.g. "zai:glm-5.2"
  attempts: AttemptLog[];         // for debugging fallback
}

interface ModelProvider {
  id: string;                     // 'zai' | 'openai' | 'anthropic' | ...
  models: ModelDescriptor[];      // capabilities, context length, cost
  chat(req: ChatRequest): Promise<ChatResponse>;
  chatStream(req: ChatRequest): AsyncIterable<ChatChunk>;
  embed(texts: string[]): Promise<Float32Array[]>;
}

class ModelGateway {
  constructor(providers: ModelProvider[], router: Router);
  chat(req: ChatRequest): Promise<ChatResponse>;
  chatStream(req: ChatRequest): AsyncIterable<ChatChunk>;
  embed(texts: string[], opts?: { prefer?: 'api'|'local' }): Promise<Float32Array[]>;
}
```

## Dependencies
- The Z.ai adapter depends on `z-ai-web-dev-sdk` (already in scaffold).
- Other adapters depend on their respective SDKs (`@anthropic-ai/sdk`, `openai`, `@google/genai`, etc.) — added lazily when first configured.
- Prisma `ModelCall` table for logging.
- Secrets subsystem for keys.
- Observability for emitting traces/metrics.
- Optional: a small in-memory LRU cache for identical request hashes.

## Strengths
- **One import site:** every call goes through `gateway.chat()`; provider never leaks into reasoning code.
- **Pluggable:** adding a provider = one new file implementing `ModelProvider`.
- **Observable:** every call recorded uniformly regardless of provider.
- **Resilient:** automatic fallback chain keeps the system alive during provider outages.
- **Cost-controlled:** budget enforcement + cache + per-provider cost tracking.
- **Streamlines routing:** the Router is a strategy object, swappable without touching call sites.

## Weaknesses
- **Lowest-common-denominator risk:** the interface must expose only what *all* providers support; provider-specific features (e.g., Anthropic's prompt caching, OpenAI's `parallel_tool_calls`) need escape hatches or be left unused.
- **Adapter maintenance burden:** each provider SDK changes; adapters need tests against recorded fixtures.
- **Streaming normalization is fiddly:** each vendor streams tokens/tool-call deltas differently; building one shape takes care.
- **Tool-call schema drift:** subtle differences (required vs optional fields, `$schema` keys, enum handling) require a normalizer.
- **Latency overhead:** negligible (microseconds) but non-zero — direct SDK call would be marginally faster; the trade is overwhelmingly worth it.

## Failure Modes
- **Adapter silently drops a field:** e.g., provider supports `response_format=json_schema` but adapter forgets to pass it → unstructured output → downstream parse failure. Mitigation: contract tests per adapter.
- **Fallback mis-fire:** router falls back too eagerly (transient 429) or too late (stuck 30s on a dead provider). Mitigation: tuned circuit-breaker thresholds.
- **Cost-cache poisoning:** caching a response that should have been fresh (creative task). Mitigation: only cache when `temperature === 0` and `stream === false` and request hash includes all params.
- **Secret leak in logs:** adapter logs full request including system prompt containing secrets. Mitigation: redaction in the logger.
- **Provider returns malformed tool args:** adapter passes through unvalidated → tool executes garbage. Mitigation: Gateway validates every `toolCall.arguments` against the tool's JSON schema before returning.

## Security Implications
- **Secrets:** only the adapter ever sees the API key; the Gateway injects it from the Secrets subsystem at call time.
- **Prompt redaction:** Gateway can run a redactor (regex or heuristic) on outgoing messages to strip known-sensitive patterns before they leave the trust boundary.
- **Tool-arg validation:** Gateway must validate `toolCall.arguments` against the registered tool schema *before* the Tool Layer executes — this stops prompt-injected or hallucinated tool calls from doing damage.
- **Audit:** every call logged with provider, model, token count, cost, finishReason, and (optionally) redacted request hash — but never raw secrets.
- **Permission:** the Gateway itself is not permission-gated (it's infra), but callers (agents, tools) must already have permission to call models; the Gateway trusts its callers.

## Performance Implications
- Per-call overhead: sub-millisecond for routing + logging.
- Cache hit on identical deterministic prompts → big wins for batch embedding/extraction.
- Streaming normalized → uniform backpressure handling for socket.io consumers.
- Concurrency control: Gateway holds a semaphore per provider to avoid 429 storms.
- Latency tracking built-in → feeds the Cost/Latency dashboards.

## Operational Implications
- Need a `providers` config (Prisma `ProviderConfig` table or env): per-provider enabled flag, model list, key reference, priority, weight.
- Need per-adapter fixture tests — recorded vendor responses replayed to verify normalization.
- Need a runtime "provider health" view: success rate, p50/p95 latency, cost — surfaced in the observability dashboard.
- Need an incident runbook: "Z.ai 5xx spike → bump fallback priority to OpenAI temporarily" — supported by config, no code change.

## Alternatives
- **Direct SDK calls everywhere:** rejected — vendor lock-in, untestable, no fallback, no uniform observability.
- **OpenRouter as the single gateway:** convenient (one API, many models) but adds a third party between us and the model; we still need our own Gateway on top for caching/cost/validation. Useful as *one of* the adapters, not as the Gateway itself.
- **LiteLLM / portkey:** open-source gateways that already normalize providers. Could be adopted as the adapter layer behind our Gateway, but doesn't remove the need for our own Gateway (we still need to inject our security/cost/observability policies). *Evaluate in Phase 2.*
- **LangChain model abstraction:** rejected — too heavy, too much abstraction; we want a thin TypeScript interface, not a graph framework.

## Maturity & Production Readiness
- The *pattern* is mature — every serious LLM application has a gateway.
- Specific adapter maturity varies: Z.ai/OpenAI/Anthropic/Gemini adapters are straightforward; local-LLM adapters (via Ollama/llama.cpp HTTP) are simpler still.
- Suitable for v1 with the Z.ai adapter; add fallback adapters incrementally.

## Relevant Research / Papers
- Not a research artifact; an engineering pattern. Related to API Gateway (Microservices pattern, Richardson 2017) and the Adapter/Strategy patterns (GoF).
- LiteLLM's "Unified API for 100+ LLMs" documentation illustrates the same pattern at scale.

## Official Documentation
- `z-ai-web-dev-sdk` README (in-repo).
- OpenAI Node SDK: `https://github.com/openai/openai-node`.
- Anthropic SDK: `https://github.com/anthropics/anthropic-sdk-typescript`.
- Google GenAI SDK: `https://github.com/googleapis/js-genai`.
- LiteLLM (optional sub-adapter): `https://docs.litellm.ai/`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Module layout:**
  - `src/server/model/gateway.ts` — the Gateway class + Router.
  - `src/server/model/types.ts` — the `ModelProvider`, `ChatRequest`, `ChatResponse` interfaces.
  - `src/server/model/providers/zai.ts` — Z.ai adapter (imports `z-ai-web-dev-sdk`).
  - `src/server/model/providers/openai.ts`, `anthropic.ts`, `gemini.ts`, `local.ts` — added as needed.
  - `src/server/model/cache.ts` — request-hash LRU cache (in-memory; persisted snapshot optional).
  - `src/server/model/health.ts` — provider health tracker (success rate, latency).
- **Backend only.** Gateway never imported by client code. Client calls `/api/model/chat` route which delegates.
- **Streaming.** Route handler converts Gateway's `AsyncIterable<ChatChunk>` into socket.io events (or SSE) for the client; zustand store consumes them.
- **Persistence.** Every call → Prisma `ModelCall` row (traceId, provider, model, inputTokens, outputTokens, costUsd, latencyMs, finishReason, redactedRequestHash, createdAt). Indexed for the cost dashboard.
- **Config.** `ProviderConfig` Prisma table: `{ id, enabled, priority, apiKeyRef, models: Json, weight, maxConcurrency }`. Settings UI can toggle providers without redeploying.
- **Mini-services.** Embedding/evaluation workers import the same Gateway singleton; long-running batch jobs use `gateway.embed()` with the local-embeddings adapter when offline is preferred.
- **Caddy.** All provider egress passes through Caddy's TLS termination; the browser only hits our `/api/model/*` routes.

## Relevance To Our Project (MiMo AI layered runtime)
This is **Layer 1** of the 15-layer Runtime OS. It is the only component allowed to call provider SDKs. Every higher layer (Reasoning, Planning, Verification, Executive, Learning) talks to the Gateway, never to a vendor. This is the structural enforcement of "Model ≠ System" and "never hardcode the provider."

## Recommended Usage
- **Adopt from day one** — building the Gateway before any reasoning code prevents SDK leakage.
- **Implement Z.ai adapter first; add at least one fallback (OpenAI or Anthropic) before any production use.**
- **Wire cost/latency logging into the Gateway from day one** — retrofitting is painful.
- **Keep the interface narrow** — resist adding provider-specific parameters; use capability flags (`requiredCapabilities`) instead.

## Decision
**ADOPT** — mandatory. The Gateway is the architectural enforcement of provider abstraction, cost control, observability, and fallback. No production code may bypass it.

## Sources
- `docs/PROJECT_UNDERSTANDING.md` §5 (Model Layer: "Must not hardcode Z.ai everywhere — gateway abstraction is mandatory"), §8.3.
- Technology inventory category 23 (Model Routing) lines 4031–4162 — esp. #388 "AIProvider Abstraction" (P0) and #387 "Local/Cloud Hybrid" (P0).
- Technology inventory category 25 (Storage) — SQLite as the persistence substrate for `ModelCall`/`ProviderConfig`.
- LiteLLM documentation — `https://docs.litellm.ai/` (illustrates the pattern at scale; *not* necessarily adopted).
- Richardson, *Microservices Patterns*, 2018 — API Gateway pattern (analogous structural pattern).
- *Inferred:* specific interface shape and module layout — designed to fit this project's Next.js/Prisma/SQLite stack; not copied from any single source.
