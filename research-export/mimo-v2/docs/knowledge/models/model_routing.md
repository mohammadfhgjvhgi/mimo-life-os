# Model Routing

**Category:** Models
**Status:** CORE
**Maturity:** Mature (pattern); specific policies are project-specific

## Definition
Model Routing is the strategy inside the Model Gateway that picks **which provider+model** should serve a given request, and **what to do when that choice fails**. It includes capability-aware, cost-aware, latency-aware, quality-aware selection, plus a fallback chain and an optional ensemble/arbitration layer for high-stakes calls.

## Problem Solved
- Different tasks need different models (cheap summarization vs. deep reasoning vs. multimodal screenshot analysis vs. offline privacy-sensitive work).
- A single provider will fail, rate-limit, or be too slow at some point — the system must keep working.
- Cost matters — routing a 50-token summarization to GPT-4-class pricing is wasteful.
- Latency matters — interactive chat cannot wait 30s for a deep-reasoning model.

## Why It Matters
Routing is the *policy* counterpart to the Gateway's *mechanism*. The Gateway makes multi-provider possible; routing decides *which* provider per call. Good routing = lower cost, lower latency, higher quality, and graceful degradation. Bad routing = paying too much, too slow, or breaking on outages.

## How It Works
1. **Request hints:** callers attach `preference` ('quality'|'latency'|'cost'|'longContext'|'multimodal') and `requiredCapabilities` (toolCalling, structuredOutput, vision, longContext).
2. **Provider catalog:** a `ModelDescriptor` table records per-model `{ contextLength, supportsTools, supportsStructured, supportsVision, costPer1kInput, costPer1kOutput, p50LatencyMs, qualityScore }`.
3. **Selector:** filters models by requiredCapabilities, then ranks by the chosen preference (cost→cheapest, latency→lowest p50, quality→highest qualityScore, longContext→largest window, multimodal→must support vision).
4. **Health check:** the top-ranked candidate is checked against the Provider Health tracker; if it's currently failing, the next candidate is chosen.
5. **Budget guard:** if the candidate's predicted cost exceeds `budget.maxCostUsd`, the selector moves down the chain to a cheaper model.
6. **Dispatch:** the Gateway calls the chosen adapter.
7. **On failure:** retry-with-backoff once on the same provider for transient errors; on hard failure or repeated 429/5xx, advance to the next entry in `fallback[]`.
8. **Optional ensemble:** for high-stakes calls (e.g., final verifier verdict on a critical task), dispatch to N models in parallel and let an arbiter pick — used sparingly due to cost.

## Architecture
```
ChatRequest ──▶ Router
                 │
                 ├─ 1. Filter by requiredCapabilities
                 ├─ 2. Rank by preference (cost/latency/quality/longContext/multimodal)
                 ├─ 3. Apply Provider Health (skip failing providers)
                 ├─ 4. Apply Budget guard (skip over-budget models)
                 ├─ 5. Pick primary; carry fallback[]
                 │
                 ▼
              Provider Adapter (try)
                 │ on hard fail / 429 exhausted / timeout
                 ▼
              Next in fallback[]
                 │
                 ▼
              (optional) Ensemble / Arbiter for critical calls
```

## Interfaces
```ts
interface ModelDescriptor {
  providerId: string;            // 'zai' | 'openai' | ...
  modelId: string;               // 'glm-5.2' | 'gpt-4o' | ...
  contextLength: number;
  supportsTools: boolean;
  supportsStructured: boolean;
  supportsVision: boolean;
  costPer1kInputUsd: number;
  costPer1kOutputUsd: number;
  p50LatencyMs: number;
  p95LatencyMs: number;
  qualityScore?: number;         // 0..1, from internal eval (see evaluation_lab.md)
}

interface Router {
  select(req: ChatRequest, health: ProviderHealth): { primary: ModelDescriptor; fallback: ModelDescriptor[] };
}

interface ProviderHealth {
  providerId: string;
  successRate1h: number;         // 0..1
  p95LatencyMs: number;
  circuitState: 'closed' | 'open' | 'half-open';
}
```

## Dependencies
- Model Gateway (this is a sub-component of the Gateway).
- Provider Health tracker (success-rate/latency windowed by provider).
- Evaluation Lab output (feeds `qualityScore` per model — see `evaluation_lab.md`).
- Cost/Observability (for `costPer1k*` figures and live token tracking).
- Prisma `ModelDescriptor` and `ProviderHealth` tables (or in-memory caches refreshed from Prisma).

## Strengths
- Decouples "what model" from "what code" — adding a model is a catalog row, not a code change.
- Cost-aware routing saves real money at scale (cheap tasks → cheap models).
- Latency-aware routing keeps interactive UX snappy.
- Health-aware routing makes the system self-healing during outages.
- Fallback chain is the primary resilience mechanism for the whole runtime.

## Weaknesses
- **Quality scores are noisy:** unless you run your own eval suite (Evaluation Lab), you're relying on vendor benchmarks or vibes.
- **Cost tables drift:** vendors change pricing; the catalog needs maintenance.
- **Over-routing:** routing every micro-decision adds overhead and obscures which model is "really" answering — keep routing decisions logged.
- **Capability gaps:** a model that nominally supports `structuredOutput` may still emit malformed JSON in edge cases — routing by capability flag is necessary but not sufficient; the Gateway must still validate.
- **Ensemble is expensive:** only justified for high-stakes calls; otherwise avoid.

## Failure Modes
- **Routing to a model that doesn't actually support a capability** (e.g., a provider lists `supportsTools: true` but the SDK is buggy) → runtime error. Mitigation: adapter-level smoke tests + capability drift detection.
- **Fallback chain exhausted** → hard failure surfaced to user. Mitigation: always configure ≥2 providers; for critical paths, ≥3.
- **Health tracker false-positives** (one bad request trips the circuit) → unnecessary fallback. Mitigation: tune circuit thresholds (e.g., open after 5 consecutive failures in 60s, half-open after 30s).
- **Budget guard too strict** → cheap tasks rejected. Mitigation: per-task-type budget defaults; override per request.
- **Cache + routing interaction** (cached response from provider A returned when caller expected provider B) → fine for correctness (same input → same output), but make sure the cache key includes the resolved model.

## Security Implications
- **Provider data residency:** routing may send the same prompt to different vendors — for privacy-sensitive tasks the caller can constrain `fallback[]` to vetted providers only (or to local-only).
- **Prompt-injection in vendor responses:** different providers have different safety postures; the Gateway's tool-arg validation and content-filter detection must run uniformly regardless of which provider answered.
- **Audit:** the chosen `modelUsed` is logged on every `ModelCall` row — no ambiguity about who answered.

## Performance Implications
- Routing decision itself is microseconds (in-memory catalog + health).
- The big wins: cost-aware routing can cut spend 30–70% for mixed workloads; latency-aware routing can cut interactive TTFT 2–5×.
- Ensemble doubles or triples cost — reserve for ≤5% of calls.

## Operational Implications
- Need a catalog maintenance workflow: when Z.ai/OpenAI/Anthropic ship a new model, update `ModelDescriptor` and re-run a mini-eval before exposing it to routing.
- Need a health dashboard: per-provider success rate, p95 latency, circuit state, cost trend.
- Need a routing audit log: per request, which models were considered and which was chosen — useful for debugging "why did the system answer with X?"

## Alternatives
- **Single-model, no routing:** simplest, but no resilience, no cost optimization. Rejected for MiMo AI.
- **OpenRouter as the router:** OpenRouter does provider selection server-side; convenient but adds a hop and a third party. Useful as one of the adapters; not a replacement for our own Router (we still need our cost/health/privacy policies).
- **Manual per-call provider choice (caller specifies):** works for a few call sites, does not scale — rejected as the default. Allowed as an override for special cases (`req.fallback` and explicit `req.preferredProvider`).

## Maturity & Production Readiness
- Routing pattern: mature.
- Specific policies (cost tables, quality scores): need calibration against the Evaluation Lab.
- Suitable for v1 with: GLM-5.2 primary + at least one fallback + simple capability+health+cost routing.

## Relevant Research / Papers
- FrugalGPT: "Cost-Efficient Language Model Usage" (Chen et al., 2023) — cost-aware routing across providers.
- RouteLLM (Patel et al., 2024) — learned router for strong/weak model selection.
- *Verify exact citations at integration time.*

## Official Documentation
- LiteLLM Router docs (illustrates routing concepts): `https://docs.litellm.ai/docs/routing`.
- Portkey routing docs (commercial analog): `https://portkey.ai/docs`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- `src/server/model/router.ts` — the Router class; pure function `select(req, health) → { primary, fallback }`.
- `src/server/model/catalog.ts` — loads `ModelDescriptor[]` from Prisma `ModelDescriptor` table; cached in-memory, invalidated on settings change.
- `src/server/model/health.ts` — maintains rolling 60-min success-rate + latency per provider; persists snapshots to Prisma `ProviderHealth` (cheap upsert every N calls).
- `src/server/model/circuit.ts` — circuit-breaker per provider.
- Prisma tables: `ModelDescriptor`, `ProviderConfig`, `ProviderHealth`, `ModelCall` (per-call log including `modelUsed` and `attempts`).
- Config in env: `MODEL_ROUTER_DEFAULT_PREFERENCE=quality`, `MODEL_ROUTER_FALLBACK=zai,openai,anthropic`.
- Client never sees routing; it sees the final streamed answer. The `modelUsed` field is exposed in the observability dashboard.
- Mini-services (eval workers) bypass interactive routing — they pin to a specific model under test.

## Relevance To Our Project (MiMo AI layered runtime)
Routing lives inside Layer 1 (Model Layer) and is consumed by Layers 5 (Reasoning), 6 (Planning), 7 (Executive), 11 (Verification), 13 (Learning). It is the policy layer that makes the Gateway's multi-provider mechanism actually pay off.

## Recommended Usage
- **Default preference:** `quality` for planning/verification/lessons; `latency` for interactive chat; `cost` for batch/extraction/embedding.
- **Always configure ≥2 providers** from day one.
- **Reserve ensemble** for verifier verdicts on critical (high-cost, irreversible) tasks.
- **Pin routing config in env** but allow runtime override via Settings UI (Prisma `ProviderConfig`).
- **Log every routing decision** (primary, fallback, chosen, reason) for post-hoc analysis.

## Decision
**ADOPT** — mandatory. The Router is the brain of the Model Gateway; without it the Gateway is just a multi-SDK wrapper with no policy.

## Sources
- `docs/PROJECT_UNDERSTANDING.md` §5 (Model Layer: fallback model strategy).
- Technology inventory category 23 (Model Routing) lines 4031–4162 — esp. #377 Model Router (P0), #378 Model Selection (P0), #379 Capability Routing (P1), #380 Cost-Aware (P1), #381 Latency-Aware (P1), #382 Quality-Aware (P1), #383 Fallback Chain (P0), #384 Ensemble (P2), #386 Specialist Models (P1), #387 Local/Cloud Hybrid (P0), #388 AIProvider Abstraction (P0).
- FrugalGPT (Chen et al., 2023, arXiv:2305.05176) — *verify citation*.
- RouteLLM (Patel et al., 2024) — *verify citation*.
- LiteLLM Router documentation — `https://docs.litellm.ai/docs/routing`.
- *Inferred:* specific interface and Prisma schema — designed for this stack.
