# Structured Reasoning (JSON / XML Schemas)

**Category:** Reasoning
**Status:** CORE
**Maturity:** Production-ready

## Definition
A reasoning mode in which the model's thought process and output are constrained to a predefined schema (JSON, XML, or a typed DSL) rather than free-form natural language. The schema encodes the *shape* of the reasoning — fields like `hypothesis`, `evidence`, `analysis`, `conclusion`, `confidence` — forcing the model to fill each slot.

## Problem Solved
Free-form CoT traces are hard to consume programmatically: downstream code must regex-parse natural language, schemas drift over long sessions, and the model can omit critical fields (e.g., a confidence score). Structured reasoning makes the reasoning product **machine-readable, type-checkable, and contract-bound**.

## Why It Matters
MiMo is a layered runtime where every layer's output is consumed by another layer. Structured reasoning is the **interface contract** between Reasoning Layer and Verification / Planning / Learning layers. Without it, every consumer would need bespoke parsing logic and would be brittle to model updates.

## How It Works
1. Define a Zod / JSON-Schema describing the reasoning output (e.g., `{ hypothesis: string, evidence: Evidence[], reasoning: string, conclusion: string, confidence: number }`).
2. Pass the schema to the model via structured-output mode (GLM-5.2 supports this natively via `response_format`).
3. The model emits a JSON / XML document conforming to the schema.
4. Runtime validates the output against the schema; rejects and re-prompts on violation.

## Architecture
Lives in the Reasoning Layer but consumed heavily by Verification (each field is a verifiable claim), Planning (structured plans), Learning (structured lessons), and Tool (structured tool-call args). Uses GLM-5.2's structured-output / function-calling primitives. Validation runs in TS via Zod; failures trigger a bounded retry loop.

## Interfaces
- `reasonStructured<T>(prompt: string, schema: ZodSchema<T>): Promise<T>` — type-safe structured reasoning call.
- `verifyStructured(output: unknown, schema: ZodSchema): ValidationResult` — used by Verification Layer.
- Schemas live in `lib/reasoning/schemas/*.ts` as versioned Zod schemas.

## Dependencies
- Model Layer gateway supporting `response_format: { type: "json_schema", schema }` (GLM-5.2 yes).
- Zod (already in the Next.js scaffold).
- Bounded retry policy for schema violations.

## Strengths
- Machine-readable → composable across layers.
- Type-safe end-to-end (TS + Zod → no `any`).
- Forces model to fill every required slot → no silent omission of confidence/evidence.
- Schema acts as a contract — easy to evolve with versioned migrations.
- Plays well with the rest of the TypeScript stack.

## Weaknesses
- Constrains the model — sometimes forces artificial structure on naturally free-form thoughts.
- Schema design is non-trivial; over-constrained schemas hurt quality.
- Some models struggle with deeply-nested JSON.
- Token overhead from schema boilerplate.

## Failure Modes
- **Schema violation**: model emits malformed JSON or missing fields.
- **Schema over-fitting**: model fills slots with filler to satisfy schema.
- **Schema drift across model versions**: a model update produces subtly different JSON shapes.
- **Validation-loop runaway**: model keeps failing schema, retrying forever.

## Security Implications
- Schema validation is a defense against prompt injection that tries to inject unstructured output — strict schemas reject malformed payloads.
- Schemas should forbid fields not in the spec (additionalProperties: false) to prevent data exfiltration via extra fields.
- Tool-call arg schemas double as permission scope — a strict schema limits what an injected prompt can do.

## Performance Implications
- Adds ~50–200ms validation overhead per call.
- Retry loop on failure adds latency and cost — cap retries at 2–3.
- Structured outputs are slightly slower to generate than free text on some providers.

## Operational Implications
- Need schema versioning (each schema has `version` field).
- Need metrics: schema violation rate by model, retry rate.
- Need contract tests: each schema has fixtures proving the model can fill it.

## Alternatives
- Free-form CoT + regex parsing (brittle, not recommended).
- XML-based structured reasoning (older style; OpenAI function-calling legacy).
- Typed DSL / custom grammar (heavyweight; only for niche domains).
- Program-aided Language Models (PAL) — emit code instead of JSON.

## Maturity & Production Readiness
Production-ready. Supported by every major frontier model (OpenAI structured outputs, Anthropic tool-use, GLM-5.2 structured output). Standard practice in 2024+ LLM apps.

## Relevant Research / Papers
- OpenAI, 2023 — *Function Calling* announcement.
- OpenAI, 2024 — *Introducing Structured Outputs in the API* (JSON schema enforcement).
- Piper et al., 2023 — *LMQL* (query language for structured LLM outputs, related).

## Official Documentation
- OpenAI Structured Outputs guide.
- Anthropic Tool Use docs.
- Z.ai GLM-5.2 API reference (response_format).

## Implementation Considerations (for our Next.js/TS/Prisma/SQLite stack)
- Use Zod (already a dependency) to define all reasoning schemas in `lib/reasoning/schemas/`.
- Wrap z-ai-web-dev-sdk chat completions with a `chatJSON<T>(messages, schema)` helper that sets `response_format` and validates.
- Store structured outputs as JSON columns in Prisma (SQLite supports JSON via `Json` type).
- Version every schema (`schemaVersion: 1`) and store alongside the output — enables migration when schemas evolve.
- Build a small contract-test suite that runs each schema against fixture prompts in CI.
- For the Next.js console, render structured reasoning via a typed React component (one component per schema).

## Relevance To Our Project (MiMo AI specifically)
Structured reasoning is the **inter-layer contract** of MiMo's runtime. The Plan from Plan-and-Solve is a structured object. The Critic / Verifier emit structured verdicts. The Learning Layer stores structured lessons. The Agent Layer's output contract is itself a structured schema. It is also the foundation for the Tool Layer's tool-call arg validation — every tool's input schema is a structured-reasoning schema. Without it, the layered runtime collapses into stringly-typed glue.

## Recommended Usage
- Use for every cross-layer artifact (plans, verdicts, lessons, tool args, agent results).
- Use Zod as the single source of truth — share between client (Next.js) and server (runtime).
- Cap retries at 2; on third failure fall back to free-form + log metric.
- Version every schema; plan migrations.

## Decision
**ADOPT** — the runtime's contract layer; required for type-safe composition.

## Sources
- OpenAI Structured Outputs (2024) — https://openai.com/blog/introducing-structured-outputs-in-the-api/
- Z.ai GLM-5.2 API documentation (inferred; structured-output support is standard in the GLM family).
- Internal: `upload/تقنيات بناء ai شهر 8 2026.txt` row #8 (P0).
- Internal: `docs/CAPABILITY_MAP.md` §1 (Structured reasoning = C).
