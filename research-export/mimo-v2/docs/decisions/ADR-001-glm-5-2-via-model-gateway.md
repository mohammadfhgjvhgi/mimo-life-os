# ADR-001: GLM-5.2 as Primary Brain via Model Gateway

**Status:** Accepted · **Date:** Phase 1

## Problem
The system needs a primary reasoning model. GLM-5.2 (Z.ai) is the chosen brain, but hardcoding Z.ai calls everywhere couples the whole system to one provider and makes switching/impossible-without-rewrite.

## Candidates
1. Direct Z.ai API calls scattered across layers.
2. GLM-5.2 behind a Model Gateway with a provider-adapter interface.
3. Use ZCode (Z.ai's dev product) as the brain.

## Selected
**Candidate 2** — GLM-5.2 via Model Gateway. Uniform interface (chat, tool-calling, structured output, multimodal, embeddings); provider adapters isolate Z.ai specifics; fallback chain supported.

## Rejected
- **Candidate 1** — couples system to Z.ai; no fallback; no swap path.
- **Candidate 3 (ZCode)** — ZCode is a separate dev-oriented product, not the general reasoning engine. The strategic plan explicitly states we build around GLM-5.2 the model, not ZCode.

## Reason
GLM-5.2 is positioned for long-context + long-horizon + multi-turn tool calls — exactly our use case. But model ≠ system; the Gateway lets us add OpenAI/Anthropic/Gemini/local models later without rewriting call sites, and provides fallback when the Z.ai API fails.

## Consequences
- Every model call goes through the Gateway (one extra indirection).
- ≥1 fallback provider must be configured from day one.
- Cost/latency tracked per call at the Gateway.

## Reversal Cost
Low — adding/swapping a provider = implementing one adapter. Removing the Gateway = larger refactor but localized to Model Layer.
