# ADR-006: Controlled Self-Improvement Hard Boundary

**Status:** Accepted · **Date:** Phase 1

## Problem
The inventory lists self-improvement of prompts, routing, tool-selection, agent behavior, planning. Unrestricted self-modification of production behavior is unsafe (silent regressions, gaming evals, drift).

## Candidates
1. Auto-deploy all improvements.
2. No self-improvement.
3. Hard boundary: lessons always safe; deployed changes gated.

## Selected
**Candidate 3 — Controlled self-improvement with a hard boundary.**
- **Always safe (no gate):** writing learned lessons to memory (episodic/failure/skill). These are observations, not behavior changes.
- **Gated (must pass):** any change to deployed behavior — prompts, routing rules, tool-selection policy, agent instructions, planning strategies. Gate = evaluation + regression + approval + rollback.

## Gate pipeline
```
candidate improvement
  → sandbox deploy
  → benchmark (eval suite)
  → regression tests
  → security checks
  → human approval (v1: manual; v1.x: auto for low-risk with rollback)
  → canary deploy
  → monitor
  → full deploy (or auto-rollback on regression)
```

## Rejected
- **Candidate 1** — unsafe; silent regressions; potential for eval-gaming.
- **Candidate 2** — leaves real value on the table (lessons still useful).

## Reason
Learning (capturing experience) and Deploying (changing behavior) are different actions with different risk profiles. Conflating them is the danger. The boundary makes learning free while keeping deployment safe.

## Consequences
- Learning Engine writes freely to memory/skill stores.
- A separate "candidate improvements" queue feeds the gate.
- v1: all deploys are manual-approval. Auto-deploy deferred to v1.x, only for low-risk changes with proven auto-rollback.
- Prompt/strategy registry is versioned; rollback = revert version.
- **Unrestricted self-modification is explicitly rejected.**

## Reversal Cost
Low for the boundary itself (it's a policy). Relaxing to auto-deploy later = building the auto-rollback confidence; that's the real work, not the decision.
