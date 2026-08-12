# ADR-007: Context Management Mandatory Regardless of 1M Window

**Status:** Accepted · **Date:** Phase 1

## Problem
GLM-5.2 advertises a 1M-token context window. The temptation is to "just dump everything" into the prompt. The source material explicitly warns this is insufficient: cost, latency, retrieval quality, and long-horizon resumability all degrade with dump-everything, and a giant context is not durable memory.

## Candidates
1. Rely on the 1M window; minimal context management.
2. Always manage context (assemble minimal sufficient, retrieve on demand, compress old) regardless of window size.

## Selected
**Candidate 2 — Context management is mandatory.** The 1M window is a safety net, not a strategy. The Context Layer decides what enters every prompt.

## Context Layer responsibilities
- Compute a token budget per call.
- Assemble: current task + goal + compressed conversation + workspace refs + retrieved memory (ranked) + retrieved knowledge (reranked) + agent/tool/execution state + permission scope.
- Retrieve on demand (not dump-all).
- Compress old turns to summaries (full fidelity in episodic memory).
- Persist context snapshots for observability + resume.

## Rejected
- **Candidate 1** — high cost, latency, poor retrieval signal-to-noise, no resumability after crash, no cross-session continuity.

## Reason
Context length ≠ memory. A 1M window doesn't remember yesterday's session, doesn't compress intelligently, doesn't retrieve the *right* things, and doesn't survive a crash. The Context Layer does all of that. Recorded explicitly per the immersion protocol's "Never confuse context length with memory" principle.

## Consequences
- Every model call pays a context-assembly cost (retrieval + ranking + compression). Worth it.
- Context snapshots persisted → resume after crash.
- Compression is lossy at the prompt level but lossless at the memory level (episodic store).

## Reversal Cost
Low — the Context Layer is a pipeline stage; bypassing it for a specific call is a flag, not a rewrite.
