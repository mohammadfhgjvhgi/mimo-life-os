# ADR-003: Hybrid Agent Strategy (Single-Agent Default)

**Status:** Accepted · **Date:** Phase 1

## Problem
The inventory lists single-agent, multi-agent, hierarchical, supervisor, voting, debate, swarm. Naively implementing all creates coordination overhead, context fragmentation on handoff, and information loss. "More agents ≠ smarter."

## Candidates
1. Always single-agent (full context continuity).
2. Always multi-agent (parallelism, specialization).
3. Hybrid: single-agent default, specialists when justified.

## Selected
**Candidate 3 — Hybrid.** Single-agent with full context continuity is the default (matches Z.ai's own long-context philosophy). Spawn a specialist only when one of 5 deviation criteria is met.

## Deviation criteria (when to spawn a specialist)
1. Genuinely independent parallelizable subtasks.
2. Distinct tool/permission scope (isolation benefit).
3. Context-size pressure (single context too large even compressed).
4. Distinct expertise needed (e.g., browser agent vs coding agent).
5. Long-running delegation (free the main loop).

## Rejected
- **Candidate 1** — can't parallelize independent work; can't isolate risky tools.
- **Candidate 2** — coordination overhead, context loss on handoff, latency, reliability cost.
- **Voting/debate/swarm** — complexity not justified for personal scale; rejected for v1.

## Reason
Single-agent context continuity is a real advantage for long-horizon coherence. Specialists add value only when their isolation/parallelism/expertise outweighs handoff cost. The hybrid gets both.

## Consequences
- Agent handoff is an explicit, typed, traced operation (see `knowledge/agents/agent_handoff.md`).
- Compressed context + state passed on handoff (never raw full context).
- Supervisor pattern available when multiple specialists coordinate.

## Reversal Cost
Low — the decision is per-task, not global. Shifting the default is a config change.
