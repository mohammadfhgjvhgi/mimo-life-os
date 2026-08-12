# MiMo — AI Architecture
### Phase: Foundation From The Ground Up — ARCH-B (Doc 4 of 6)

**Status:** ARCHITECTURE. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Scope:** A provider-neutral AI layer. Local models, cloud models, multiple providers, model routing, structured outputs, streaming, tool calling, reasoning, vision, embeddings, reranking, fallback, retries, cancellation, cost tracking, capability discovery.
**Source of truth:** Product Bible Part 7 (AI Architecture), Part 7.14 (Model Evolution invariant), Part 22 (Security), Part 23 (Offline/Online). `MiMo_Current_System_Audit.md` §4. `src/core/models/ZAIModel.ts`, `src/core/registry/`.

---

## 0. Label Legend

- `[CURRENT]` — what exists today.
- `[TARGET]` — what this architecture specifies.
- `[MIGRATION]` — how to get there.
- `[FACT]` — verifiable from code.
- `[INFERENCE]` — architect's reasoned conclusion.
- `[UNKNOWN]` — open question.

---

## 1. The Core Principle

> **MiMo is NOT locked to one model.** No provider-specific code may leak into domain logic. The provider is an adapter; the model is a capability; the routing is a policy. [PRODUCT INVARIANT — Bible Part 7.14]

The current `ZAIModel` adapter pattern is correct (single import point for SDK). The architecture generalizes it: one interface, many adapters, one router, one policy.

---

## 2. Layer Model [TARGET]

```
┌─────────────────────────────────────────────────────────┐
│  Domain Logic (agents, orchestrator, context, memory)    │
│  Calls: ai.complete(), ai.stream(), ai.embed(), etc.    │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  MiMo AI Interface (the contract)                       │
│  Pure TypeScript types. No provider imports.            │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  Model Router (the policy)                              │
│  Decides which model handles which request, based on:   │
│  - task type (chat/research/code/vision/...)            │
│  - capability required                                  │
│  - cost budget                                         │
│  - latency target                                      │
│  - privacy preference (local vs cloud)                  │
│  - user override                                       │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  Provider Adapter (the SDK wrapper)                     │
│  e.g. ZAIProvider, OpenAIProvider, OllamaProvider        │
│  Translates MiMo AI Interface calls → provider SDK calls │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│  Provider / Local Runtime                               │
│  z-ai-web-dev-sdk | OpenAI SDK | Anthropic SDK |        │
│  Ollama HTTP API | llama.cpp subprocess | ONNX runtime   │
└─────────────────────────────────────────────────────────┘
```

**[FACT]** The current `ZAIModel` already implements the Provider Adapter layer correctly — `z-ai-web-dev-sdk` is imported only in `src/core/models/ZAIModel.ts` and `src/core/search/SearchProvider.ts`. The Audit confirmed `/api/image` and `/api/search` bypass this (Audit §4.1, issue).

---

## 3. The MiMo AI Interface [TARGET]

```typescript
interface AIProvider {
  id: string;                            // 'zai' | 'openai' | 'anthropic' | 'ollama' | 'local-llama'
  name: string;
  capabilities: AIProviderCapability[];  // ['chat', 'streaming', 'vision', 'tools', 'reasoning', 'embeddings', 'reranking']
  models: AIModel[];
  
  complete(request: AICompleteRequest): Promise<AICompleteResponse>;
  stream(request: AICompleteRequest): AsyncIterable<AIStreamChunk>;
  embed(request: AIEmbedRequest): Promise<AIEmbedResponse>;
  rerank(request: AIRerankRequest): Promise<AIRerankResponse>;
  
  healthCheck(): Promise<AIHealthStatus>;
  dispose(): void;
}

interface AIModel {
  id: string;                            // 'gpt-4o-mini' | 'glm-4.7' | 'llama-3.1-8b-local'
  providerId: string;
  displayName: string;
  capabilities: AIModelCapability[];     // ['chat', 'vision', 'tools', 'reasoning']
  contextWindow: number;                  // tokens
  outputWindow: number;                   // max output tokens
  costPerInputToken?: number;             // USD or local equivalent
  costPerOutputToken?: number;
  latencyProfile?: { p50: number; p95: number };
  isLocal: boolean;
  isDefault?: boolean;
}

type AIProviderCapability = 'chat' | 'streaming' | 'vision' | 'tools' | 'reasoning' | 'embeddings' | 'reranking' | 'json_mode' | 'paraphrase';
type AIModelCapability = AIProviderCapability;

interface AICompleteRequest {
  modelId: string;
  messages: ModelMessage[];
  temperature?: number;
  maxTokens?: number;
  thinking?: boolean;                     // Bible Part 7.4
  tools?: AIToolSpec[];                    // tool calling
  responseFormat?: 'text' | 'json' | 'json_schema';
  jsonSchema?: object;
  stop?: string[];
  requestId: string;                      // for cancellation + tracing
  priority?: 'low' | 'normal' | 'high';
  budgetHint?: { maxTokens?: number; maxCostUsd?: number };
}

interface AICompleteResponse {
  content: string;
  model: string;                          // actual model used (may differ from requested after fallback)
  provider: string;
  usage?: { promptTokens: number; completionTokens: number; cachedTokens?: number };
  cost?: { inputUsd: number; outputUsd: number; totalUsd: number };
  finishReason?: 'stop' | 'length' | 'tool_call' | 'content_filter';
  toolCalls?: AIToolCall[];
  reasoningTrace?: string;                 // when thinking enabled
  latencyMs: number;
  requestId: string;
}

interface AIStreamChunk {
  type: 'delta' | 'tool_call' | 'reasoning' | 'usage' | 'done' | 'error';
  content?: string;
  toolCall?: AIToolCall;
  reasoning?: string;
  usage?: AICompleteResponse['usage'];
  error?: { code: string; message: string };
}

interface AIEmbedRequest {
  modelId: string;
  inputs: string[];
  dimensions?: number;
  requestId: string;
}

interface AIEmbedResponse {
  embeddings: number[][];
  model: string;
  usage?: { inputTokens: number };
  cost?: { totalUsd: number };
  dimensions: number;
}

interface AIRerankRequest {
  modelId: string;
  query: string;
  documents: string[];
  topK: number;
  requestId: string;
}

interface AIRerankResponse {
  results: Array<{ index: number; score: number }>;
  model: string;
  cost?: { totalUsd: number };
}
```

### 3.1 [CURRENT] Deficiency

[CURRENT] The `Model` interface (`src/core/registry/types.ts`) has only `{ id, name, capabilities, chat() }`. No streaming, no tools, no embeddings, no reranking, no vision, no cost tracking, no cancellation, no JSON mode, no reasoning trace. [FACT]

---

## 4. Provider Categories [TARGET]

| Category | Examples | When to use | When NOT to use |
|---|---|---|---|
| **Cloud general-purpose** | ZAI, OpenAI GPT-4o, Anthropic Claude Sonnet | Default for chat, research, code | Privacy-sensitive, offline |
| **Cloud specialized** | OpenAI o1 (reasoning), Gemini (vision), Voyage (rerank), Cohere (rerank) | Specific capability gaps in general provider | Cost-sensitive bulk operations |
| **Local small/medium** | Llama 3.1 8B (via Ollama), Phi-3, Gemma 2 | Offline, privacy-sensitive, low-latency | Long-context, complex reasoning |
| **Local large** | Llama 3.1 70B (via llama.cpp + GPU), Qwen 2.5 72B | Privacy-sensitive + complex reasoning | Hardware-constrained |
| **Local embeddings** | bge-small-en-v1.5, multilingual-e5-large (via sentence-transformers or Ollama) | All embeddings (local-first) | — |
| **Local rerankers** | bge-reranker-base (via sentence-transformers) | Reranking retrieved chunks | When no reranker installed (fall back to no rerank) |
| **Edge / on-device** | Phi-3-mini via ONNX, WebGPU models | Future mobile companion | Not for desktop today |

[INFERENCE — categories align with Bible Part 7.1 (cheap/fast/deep/vision/local) + Part 23 (offline-first).]

---

## 5. Model Router [TARGET — Bible Part 7.1]

### 5.1 Routing dimensions

| Dimension | Values | Default for |
|---|---|---|
| `task_type` | chat, research, code, vision, embed, rerank, summarize | — |
| `cost_tier` | cheap, balanced, premium | balanced |
| `latency_tier` | instant (<1s), fast (<5s), deep (>5s ok) | fast |
| `privacy` | local_only, cloud_ok | cloud_ok (configurable) |
| `capability` | tools, reasoning, vision, json_mode | required by task |
| `context_size` | tokens needed | from ContextBuilder |
| `user_override` | explicit model ID | — |

### 5.2 Routing Algorithm [TARGET]

```typescript
function route(request: RoutingRequest): AIModel {
  // 1. If user explicitly picked a model, use it (after capability check).
  if (request.userOverride) {
    const model = getModel(request.userOverride);
    if (hasCapabilities(model, request.capabilities)) return model;
    // else fall through with a warning
  }
  
  // 2. Filter models by hard constraints (privacy, capability, context_size).
  const candidates = allModels.filter(m =>
    m.capabilities.includesAll(request.capabilities) &&
    m.contextWindow >= request.minContextWindow &&
    (request.privacy === 'cloud_ok' || m.isLocal) &&
    isHealthy(m)
  );
  
  if (candidates.length === 0) throw new NoModelAvailableError();
  
  // 3. Score by cost tier + latency tier.
  const scored = candidates.map(m => ({
    model: m,
    score: computeRouteScore(m, request),
  }));
  
  // 4. Return highest-scoring.
  return scored.sort((a, b) => b.score - a.score)[0].model;
}

function computeRouteScore(model, request): number {
  let score = 0;
  score += costScore(model, request.cost_tier);     // 0..40
  score += latencyScore(model, request.latency_tier); // 0..30
  score += privacyBonus(model, request.privacy);      // 0..20
  score += capabilityBonus(model, request.capabilities); // 0..10
  return score;
}
```

### 5.3 Default Routing Table [TARGET]

| Task | Default model class | Notes |
|---|---|---|
| Chat (simple) | cheap cloud (e.g. GPT-4o-mini / GLM-4-flash) | Fast, low-cost |
| Chat (deep reasoning toggle on) | deep cloud (e.g. GPT-4o / Claude Sonnet / GLM-4.7) | Bible Part 7.4 |
| Research | deep cloud + web tools | Multi-step, capability-heavy |
| Code generation | deep cloud (Claude/GPT-4-class) | Best code quality |
| Code review/lookup | cheap cloud | Fast iteration |
| Vision | vision-capable (GPT-4o vision / Gemini) | Image analysis |
| Embeddings | local (bge-small / multilingual-e5) | Always local-first per Bible Part 22 |
| Reranking | local (bge-reranker-base) | Always local-first |
| Summarization | cheap cloud | Background bulk |
| Memory auto-extraction | cheap cloud | Background bulk |
| Consolidation classification | cheap cloud or local | Background bulk |

### 5.4 [CURRENT] Deficiency

[CURRENT] No router. Single model. `ZAI_MODEL_ID = 'zai-default'`. The `ModelRegistry` has one entry. [FACT]

---

## 6. Structured Outputs [TARGET]

### 6.1 Three modes

| Mode | When | How |
|---|---|---|
| `text` | Default chat | Plain string response |
| `json` | Tool inputs, plans, classifications | Provider's JSON mode if supported; else prompt-engineered + parsed with retry |
| `json_schema` | Strict contracts (Plan, Memory, Entity) | Provider's structured output if supported; else fallback to `json` + Zod validation |

### 6.2 Validation + Retry [TARGET]

- Every structured output passes through Zod schema validation.
- On validation failure: retry once with error message included in next prompt ("Your previous response failed validation: <error>. Please retry.").
- After 2 failures: fall back to `text` mode + best-effort extraction in the caller.
- All failures logged + surfaced in DeveloperPanel.

### 6.3 [CURRENT] Deficiency

[CURRENT] No structured output support. `ModelResponse.content` is plain string. [FACT]

---

## 7. Streaming [TARGET — Bible Part 7.1, Part 20]

### 7.1 Real streaming, not fake

[CURRENT] `/api/chat` uses fake streaming — calls `runWorkflow()` (non-streaming), then re-chunks the final answer with `setTimeout`. This violates Bible Part 10.3 "Never Fake." [FACT — Audit §4.2]

[TARGET] Real streaming via `AIProvider.stream()`:
- Server-Sent Events (SSE) to client.
- Each chunk is a real `AIStreamChunk` from the provider.
- Tool calls stream as they're emitted.
- Reasoning trace streams (when `thinking: true`).
- Usage metadata in final chunk.

### 7.2 Stream lifecycle

```
client → POST /api/chat (with stream:true)
server → 200 OK (SSE)
server → event: chunk { type: 'reasoning', reasoning: '...' }
server → event: chunk { type: 'delta', content: 'I' }
server → event: chunk { type: 'delta', content: ' think' }
server → event: chunk { type: 'tool_call', toolCall: {...} }
server → event: chunk { type: 'delta', content: 'Based on...' }
server → event: chunk { type: 'usage', usage: {...} }
server → event: chunk { type: 'done' }
server → 200 close
```

### 7.3 Cancellation mid-stream [TARGET]

- Client closes the connection → server receives abort signal.
- AI layer calls `provider.cancelStream(requestId)`.
- Provider adapter sends abort (AbortController for fetch-based SDKs; terminate stream for HTTP-based).
- Partial response logged + available for "continue from here" recovery.

### 7.4 [CURRENT] Deficiency

[CURRENT] ZAIModel has `stream()` method declared in interface but `/api/chat` does not use it. [FACT — Audit §4.2]

---

## 8. Tool Calling [TARGET — Bible Part 7.8]

### 8.1 The Tool Calling Protocol [TARGET]

```typescript
interface AIToolSpec {
  name: string;
  description: string;
  inputSchema: object;       // JSON Schema
  requiredCapabilities?: string[];  // what permissions the tool needs
}

interface AIToolCall {
  id: string;                // tool call ID (provider-assigned)
  name: string;
  arguments: object;        // parsed JSON arguments
}

interface AIToolResult {
  toolCallId: string;
  result: unknown;
  isError?: boolean;
}
```

### 8.2 The Loop [TARGET]

```
1. Caller sends request with tools[] to AIProvider.complete()
2. Model returns response with finishReason='tool_call' + toolCalls[]
3. AI layer emits 'tool_call' event (caller can approve/reject per Bible Part 9.2)
4. If approved, caller (orchestrator) executes tool via ToolRegistry
5. Tool result appended to messages as 'tool' role
6. Loop back to step 1 with extended messages
7. Model returns finishReason='stop' → final answer
```

### 8.3 Approval gate [TARGET — Bible Part 9.2]

- Each tool call requires approval UNLESS:
  - Tool is in the trusted set (after 3 user approvals — Bible Part 8.7).
  - Tool is read-only (memory_recall, file_read, web_search).
- Approval is synchronous (blocks the loop) and visible in ExecutionTrace.

### 8.4 [CURRENT] Deficiency

[CURRENT] No tool calling protocol. The ResearchAgent manually invokes `web_search` — the model doesn't decide tool calls. [FACT — Audit §4.3]

---

## 9. Reasoning [TARGET — Bible Part 7.4]

### 9.1 Toggleable per-prompt

- `request.thinking = true` → model emits `reasoningTrace` in response.
- `request.thinking = false` → fast direct answer, no reasoning emitted.
- Default per task type:
  - chat: false
  - research: true (Bible Part 7.4)
  - code: true
  - summarize: false
  - embed: N/A

### 9.2 Reasoning visibility

- `reasoningTrace` is shown in ExecutionTrace (Bible Part 10.2).
- `reasoningTrace` is NOT shown in the final user-facing answer (unless `devMode` on).
- `reasoningTrace` is stored with the message (provenance for "why did the AI say that?").

### 9.3 Reasoner vs Reasoning

- **Reasoner** (existing module) = intent detection (rule-based today, model-routed later). Decides WHICH model + WHICH mode.
- **Reasoning** (per-prompt) = the model's chain-of-thought when `thinking: true`. Different concept.

[FACT — Audit §4.4 confirms Reasoner is rule-based.]

### 9.4 [CURRENT] Deficiency

[CURRENT] `ModelRequest.thinking` field exists. ZAIModel passes it to ZAI SDK. But it's never toggled by callers, never surfaced in ExecutionTrace, never stored on messages. [FACT]

---

## 10. Vision [TARGET]

### 10.1 Image input

```typescript
interface ModelMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | ContentPart[];
}

interface ContentPart {
  type: 'text' | 'image_url' | 'image_base64';
  text?: string;
  imageUrl?: { url: string; detail?: 'low' | 'high' };
  imageBase64?: { mediaType: 'image/png' | 'image/jpeg' | 'image/webp'; data: string };
}
```

### 10.2 Vision use cases [TARGET]

- Screenshots in research mode (user uploads image, model describes).
- UI screenshots in code mode (model analyzes a UI to generate code).
- Diagrams (model converts whiteboard photo to structured artifact).
- Webcam frames in future agent runtime (Part 10.6 devMode live pane).

### 10.3 [CURRENT] Deficiency

[CURRENT] `ModelMessage.content` is plain string. No vision. No `ContentPart` type. [FACT]

---

## 11. Embeddings [TARGET]

### 11.1 Default: local-first

Per Bible Part 22 (local-first), embeddings run on-device by default.

- Default model: `bge-small-en-v1.5` (384 dims) via `sentence-transformers` (Python subprocess) OR `Xenova/bge-small-en-v1.5` via `@xenova/transformers` (JS, runs in Node).
- For multilingual: `multilingual-e5-large` or `bge-m3`.
- Fallback: cloud embeddings (OpenAI `text-embedding-3-small`).

### 11.2 The Embedding Adapter

```typescript
interface EmbeddingProvider {
  id: string;
  models: EmbeddingModel[];
  embed(inputs: string[], modelId: string): Promise<number[][]>;
  dispose(): void;
}
```

Implemented by:
- `LocalTransformerProvider` (uses `@xenova/transformers`).
- `OllamaEmbeddingProvider` (uses Ollama's `/api/embeddings`).
- `CloudEmbeddingProvider` (ZAI/OpenAI/etc.).

### 11.3 [CURRENT] Deficiency

[CURRENT] No embeddings. [FACT]

---

## 12. Reranking [TARGET]

### 12.1 When to rerank

After semantic retrieval returns top-K candidates (e.g. K=20), rerank to top-N (e.g. N=5) using a cross-encoder.

### 12.2 Default reranker

- Default: `bge-reranker-base` via `@xenova/transformers` (local).
- Fallback: no rerank (just sort by similarity score).
- Optional: Cohere rerank API (cloud) for high-quality reranking on critical queries.

### 12.3 [CURRENT] Deficiency

[CURRENT] No reranker. [FACT]

---

## 13. Fallback + Retries [TARGET — Bible Part 7.12]

### 13.1 Fallback Chain

When the routed model fails:
1. Retry same model (with backoff — see §13.2).
2. If retries exhausted, fall back to next model in same capability class.
3. If no same-class fallback, fall back to cheaper model (downgrade capability).
4. If no model available, return `ModelUnavailableError` to caller (user-facing graceful message).

### 13.2 Retry Policy

```typescript
interface RetryPolicy {
  maxRetries: number;              // default 3
  backoffStrategy: 'fixed' | 'exponential' | 'jittered';
  initialDelayMs: number;          // default 500
  maxDelayMs: number;              // default 8000
  retryableErrors: string[];       // ['timeout', 'rate_limit', 'network', '5xx']
  nonRetryableErrors: string[];    // ['invalid_request', 'content_filter', 'auth_failed']
}
```

Default: 3 retries, exponential backoff with jitter (500ms, 1s, 2s, capped at 8s).

### 13.3 Retry visibility

- Every retry logged + visible in DeveloperPanel.
- ExecutionTrace shows "retrying (attempt 2/3)..." inline.
- After max retries, surface the failure as actionable error (Bible Part 24).

### 13.4 [CURRENT] Deficiency

[CURRENT] No retry, no fallback, no error classification. ZAIModel throws `ModelError` on any failure. [FACT]

---

## 14. Cancellation [TARGET]

### 14.1 Cancellation Tokens

Every AI request carries a `requestId`. The caller can call `ai.cancel(requestId)` to abort.

- For fetch-based SDKs: AbortController.
- For HTTP-based providers: send abort signal + discard response stream.
- For local models (llama.cpp subprocess): send SIGTERM.

### 14.2 Cancellation Semantics

- Cancellation is **cooperative**: the model may continue generating on the provider side (we can't stop it), but MiMo discards the response.
- For cloud providers with cancellation API (e.g. OpenAI's `cancel_completion`): call it.
- Cancellation does NOT roll back partial side effects (e.g. if a tool was called mid-stream, the tool's effects remain — see `MiMo_Agent_Architecture.md` §recovery).

### 14.3 [CURRENT] Deficiency

[CURRENT] No cancellation. Requests are fire-and-forget. [FACT]

---

## 15. Cost Tracking [TARGET]

### 15.1 Per-request cost

Every `AICompleteResponse` includes `cost.totalUsd` (computed from `usage.promptTokens × costPerInputToken + usage.completionTokens × costPerOutputToken`).

### 15.2 Aggregation

- Cost aggregated per day, per project, per task type.
- Stored in DB table `AICostLog` (append-only).
- Surfaced in DeveloperPanel → AI tab (when devMode on).
- Budget alerts: if a project exceeds a daily budget threshold, prompt user before next cloud call (Bible Part 9.5 cost-sensitive action).

### 15.3 Local model cost

- Local models cost $0 per token.
- Track GPU/CPU time + electricity-equivalent cost (optional, off by default).

### 15.4 [CURRENT] Deficiency

[CURRENT] No cost tracking. `ModelResponse.usage` exists but is not populated by ZAIModel. [FACT]

---

## 16. Capability Discovery [TARGET]

### 16.1 The Capability Catalog

On boot, the kernel queries every registered provider for:
- Provider capabilities (chat / streaming / vision / tools / reasoning / embeddings / reranking).
- Available models + their capabilities + context windows + costs.

```typescript
async function discoverCapabilities(): Promise<CapabilityReport> {
  const report = { providers: [], models: [], routingTable: {} };
  for (const provider of registeredProviders) {
    const health = await provider.healthCheck();
    if (!health.healthy) continue;
    report.providers.push({ id: provider.id, capabilities: provider.capabilities, health });
    for (const model of provider.models) {
      report.models.push(model);
    }
  }
  report.routingTable = computeDefaultRoutes(report.models);
  return report;
}
```

### 16.2 When to refresh

- On boot.
- On user request (Settings → "Refresh AI capabilities").
- On provider configuration change (new API key added).
- Periodically (every hour, if app long-running).

### 16.3 [CURRENT] Deficiency

[CURRENT] No capability discovery. ZAIModel is hardcoded as default. [FACT]

---

## 17. The Provider Adapter Contract [TARGET]

Every provider adapter MUST:

1. Implement `AIProvider` interface.
2. Import its SDK ONLY within its own file (no leakage).
3. Translate MiMo's `ModelMessage` format → provider's format.
4. Translate provider's response format → MiMo's `AICompleteResponse`.
5. Translate provider's errors → MiMo's `AIError` hierarchy (with `code` classification: `timeout` / `rate_limit` / `network` / `auth_failed` / `invalid_request` / `content_filter` / `unknown`).
6. Implement streaming via AsyncIterable (or throw `NotSupportedError` if provider lacks streaming).
7. Implement healthCheck (return `healthy: false` if provider is down or unconfigured).
8. Implement `dispose()` to clean up resources.
9. NOT touch domain logic, types, or other adapters.

### 17.1 Provider adapters to build [TARGET — in priority order]

| Priority | Adapter | Why |
|---|---|---|
| 1 | `ZAIProvider` (refactor existing) | Already partially done; align with new interface |
| 2 | `OllamaProvider` | Local models; Bible Part 7.1 `local` routing; offline-capable |
| 3 | `LocalTransformerProvider` | Local embeddings + reranker (Xenova) |
| 4 | `OpenAIProvider` | Most-requested cloud alternative |
| 5 | `AnthropicProvider` | Claude class for code + reasoning |
| 6 | `GoogleGeminiProvider` | Vision + long context |
| 7 | `MistralProvider` | European option, open-weight models |
| 8 | `LocalLlamaCppProvider` | Direct llama.cpp subprocess for custom local setups |

### 17.2 [CURRENT] Status

[CURRENT] Only `ZAIModel` exists. It implements the old `Model` interface (only `chat()`). It does NOT implement streaming (declared, unused), tools, embeddings, vision, or cost tracking. [FACT]

---

## 18. The Model Registry [TARGET]

```typescript
interface ModelRegistry {
  registerProvider(provider: AIProvider): void;
  unregisterProvider(providerId: string): void;
  
  getProvider(providerId: string): AIProvider | undefined;
  getModel(modelId: string): AIModel | undefined;
  listModels(filter?: ModelFilter): AIModel[];
  
  route(request: RoutingRequest): AIModel;
  
  // Capability queries
  modelsWithCapability(cap: AIModelCapability): AIModel[];
  modelsInCostTier(tier: 'cheap' | 'balanced' | 'premium'): AIModel[];
  localModels(): AIModel[];
  
  // Health
  healthReport(): ProviderHealthReport;
  
  // Cost
  costReport(timeRange: TimeRange): CostReport;
}
```

### 18.1 Registry is the only entry point

Domain logic NEVER imports a provider. It calls `modelRegistry.route(request).complete(...)`. The registry handles routing + provider lookup.

### 18.2 [CURRENT] Status

[CURRENT] `ModelRegistry` exists (in `src/core/registry/`) but is a thin Map of model ID → Model instance. No routing, no capability queries, no health, no cost. [FACT]

---

## 19. Provider-Specific Code Forbidden Locations [TARGET — INVARIANT]

Provider SDK imports (`z-ai-web-dev-sdk`, `openai`, `@anthropic-ai/sdk`, `ollama`, `@xenova/transformers`) are allowed ONLY in:
- `src/core/models/<ProviderName>Provider.ts`
- `src/core/embeddings/<ProviderName>EmbeddingProvider.ts`
- `src/core/rerankers/<ProviderName>RerankerProvider.ts`
- `src/core/search/<ProviderName>SearchProvider.ts`

Forbidden in:
- `src/core/agents/*` (any agent)
- `src/core/orchestrator/*`
- `src/core/context/*`
- `src/core/memory/*`
- `src/core/knowledge/*`
- `src/app/api/*` (any API route)
- `src/components/*` (any UI)
- `src/lib/*`

[FACT — Audit §4.1 confirms `/api/image` and `/api/search` VIOLATE this by importing `z-ai-web-dev-sdk` directly. This must be fixed in MIGRATION.]

---

## 20. Offline / Online Behavior [TARGET — Bible Part 23]

### 20.1 What works offline

- All local models (Ollama, Xenova embeddings + rerankers).
- All local retrieval (memory recall, knowledge graph, document search).
- All filesystem tools (read/write/shell scoped to project).
- Conversation (with local model only).
- Code execution sandbox.

### 20.2 What requires online

- Cloud model calls.
- Web search (depends on provider).
- Cloud embeddings (if local not configured).
- Plugin/MCP servers that are remote.
- Cloud sync (E2E encrypted).

### 20.3 Graceful degradation

- If `request.privacy = 'cloud_ok'` but offline → router falls back to local model.
- If local model also unavailable → user-facing graceful message ("Offline. Try a local model or reconnect.")
- If a tool requires network (web search) and offline → tool returns `OfflineError`, agent can skip or wait.

### 20.4 [CURRENT] Deficiency

[CURRENT] No offline handling. ZAI is cloud-only; if offline, all chat fails. [FACT]

---

## 21. Trust Boundaries for AI Layer

| Boundary | What crosses | Enforced by |
|---|---|---|
| Domain logic → AI layer | `AICompleteRequest` | ModelRegistry.route() (validates capabilities + privacy) |
| AI layer → Provider adapter | Translated request | Provider adapter (translates format + handles SDK errors) |
| Provider adapter → External API | HTTP/gRPC call | NetworkPermissionGate (Bible Part 22.7) |
| External API → Provider adapter | Response | Provider adapter (validates + translates) |
| Provider adapter → AI layer | `AICompleteResponse` | AI layer (validates response shape, sanitizes content) |
| AI layer → Domain logic | Validated response | Validator (Bible Part 7.11) |
| Secrets → AI layer | NEVER | Hard block (API keys passed via env / keychain, never in messages) |

### 21.1 Sanitization

- AI response content is sanitized by Validator (Bible Part 7.11) before returning to caller.
- Sanitization: trim, collapse 3+ newlines, strip trailing whitespace, detect unclosed code fences.
- Speculative content marked with `/* check-token */` (Bible Part 7.12 hallucination guard).

---

## 22. Migration Path [MIGRATION]

### Phase 1 — Generalize Interface
- Refactor `Model` interface → `AIProvider` + `AIModel` (per §3).
- Refactor `ZAIModel` → `ZAIProvider` (implement new interface).
- Add `stream()`, `embed()` (stub), `healthCheck()`.

### Phase 2 — Model Router + Registry
- Implement `ModelRegistry` with routing per §5.
- Implement routing dimensions + default routing table.
- Add `userOverride` parameter (Bible Part 7.1 per-query picker).

### Phase 3 — Real Streaming
- Refactor `/api/chat` to use `AIProvider.stream()` (eliminate fake word-by-word streaming).
- Add SSE support in API route.
- Add cancellation handling.

### Phase 4 — Tool Calling Protocol
- Add `AIToolSpec` / `AIToolCall` / `AIToolResult` types.
- Implement tool-call loop in AIProvider adapters that support it.
- Wire to Orchestrator (orchestrator executes tool calls, not the model).

### Phase 5 — Structured Outputs
- Add `responseFormat` + `jsonSchema` parameters.
- Add Zod validation + retry-on-fail.
- Use for Plan, Memory, Entity extraction.

### Phase 6 — Reasoning + Vision
- Wire `request.thinking` through to ExecutionTrace.
- Add `ContentPart` for vision messages.
- Add vision-capable models to routing table.

### Phase 7 — Local Models
- Add `OllamaProvider` (local chat + embeddings).
- Add `LocalTransformerProvider` (embeddings + reranker).
- Configure routing for offline + privacy modes.

### Phase 8 — Cost Tracking + Health + Capability Discovery
- Add `AICostLog` table.
- Add periodic health check.
- Add capability discovery on boot.

### Phase 9 — Fallback + Retries
- Implement retry policy (§13).
- Implement fallback chain.
- Classify errors.

### Phase 10 — Cloud Provider Adapters
- Add `OpenAIProvider`, `AnthropicProvider`, `GoogleGeminiProvider` (per priority in §17.1).

### Phase 11 — Fix Audit Issues
- Route `/api/image` and `/api/search` through Core adapters (Audit §4.1, issue).

Each phase independently shippable. Phase 1 unblocks Phase 2-10.

---

## 23. Open Questions [UNKNOWN]

| # | Question | Why it matters | Investigation |
|---|---|---|---|
| 1 | Does the ZAI SDK support real streaming? | Bible Part 10.3 "Never Fake" requires it | Test `ZAIModel.stream()` end-to-end (Audit unknown #2) |
| 2 | Local model runtime: Ollama vs llama.cpp vs Xenova? | Affects deployment + capability | Test each; default to Ollama for ease, llama.cpp for perf |
| 3 | Embedding storage: BLOB (float32 array) vs SQLite-vec vs sqlite-vss extension? | Performance at scale | Profile with 10k chunks |
| 4 | Should the router cache routing decisions per (task_type, capability) pair? | Latency optimization | Measure first |
| 5 | How does the AI layer handle provider SDK crashes (segfault, etc.)? | Robustness | Sandbox provider in worker thread / subprocess for local models |
| 6 | Cost tracking for free/local models — show $0 or show "local" tag? | UX clarity | Show "local" tag, separate from cost |
| 7 | Should user-set API keys be per-provider or per-model? | Flexibility vs simplicity | Per-provider (simpler); allow per-model override later |

---

## 24. Non-Goals

- Agent runtime (see `MiMo_Agent_Architecture.md`).
- Tool execution (see `MiMo_Tool_Architecture.md`).
- Context assembly (see `MiMo_Context_Architecture.md`).
- Memory + Knowledge internals (see respective architectures).
- Prompt templates (PromptEngine — separate architecture, future).

---

## 25. Summary

[CURRENT]: `ZAIModel` adapter is the only provider. Pattern is correct (single import point for SDK), but interface is minimal — only `chat()`, no streaming used, no tools, no embeddings, no vision, no cost tracking, no routing, no fallback, no cancellation, no capability discovery. Two API routes (`/api/image`, `/api/search`) bypass the adapter entirely.

[TARGET]: 4-layer model (Domain → Interface → Router → Adapter → Provider Runtime). Provider-neutral `AIProvider` interface covering complete, stream, embed, rerank. Model Router with 7 routing dimensions and per-task default routing table. Tool calling protocol with approval gate. Real streaming via SSE. Structured outputs (JSON / JSON Schema) with Zod validation + retry. Toggleable reasoning per prompt. Vision via ContentPart. Local-first embeddings + rerankers (Xenova). Fallback chain + retry policy with error classification. Cost tracking per request + aggregated. Capability discovery on boot. 8 provider adapters planned in priority order. Provider SDK imports restricted to adapter files only — enforced as architectural invariant.

[MIGRATION]: 11 phases. Phase 1 (generalize interface) unblocks everything. Fixing the `/api/image` + `/api/search` bypass (Audit issue) lands in Phase 11 but should be done early as part of Phase 1 (it's a one-line fix per route).

**Invariant:** No provider-specific code may leak into domain logic. The provider is an adapter; the model is a capability; the routing is a policy. MiMo is NOT locked to one model — ever.
