# ADR-002: Minimal TypeScript Runtime on Vercel AI SDK

**Status:** Accepted · **Date:** Phase 1

## Problem
The inventory lists 17 agent frameworks (LangGraph, CrewAI, AutoGen, Vercel AI SDK, Mastra, OpenAI/Claude/Google SDKs, etc.) across Python and TypeScript. Importing several creates duplication, competing orchestration models, and (for Python) a cross-language sidecar.

## Candidates
1. Build MiMo's own minimal TS runtime on Vercel AI SDK.
2. Import LangGraph (Python) + run a Python sidecar.
3. Import multiple frameworks (mix-and-match).

## Selected
**Candidate 1** — minimal TypeScript runtime. Use **Vercel AI SDK** as the tool-calling/streaming primitive (TypeScript-native, Next.js-native). Borrow *patterns* (LangGraph graph orchestration, supervisor, planner-executor, Mastra's agent definitions) without importing the libs.

## Rejected
- **Candidate 2** — requires Python sidecar, cross-language IPC, dual runtimes, two dependency trees. Breaks the single-stack coherence.
- **Candidate 3** — maximum duplication, conflicting mental models, hard to debug.

## Reason
The project stack is Next.js 16 + TypeScript end-to-end. A single-language runtime is simpler, more observable, and easier to extend. Vercel AI SDK gives us `streamText` + `tools` + `maxSteps` (the ReAct loop primitive) natively. The frameworks' value is in their *patterns*, not their code — we implement the patterns ourselves.

## Consequences
- We own the orchestration code (more maintenance, but full control).
- Vercel AI SDK is the only framework dependency.
- No Python in the runtime (Python tools run sandboxed via the Tool Runtime, not as framework code).

## Reversal Cost
Medium — swapping to a framework later means re-implementing the agent loop in that framework's terms. But the layer interfaces (Agent, Tool, Memory contracts) stay stable.
