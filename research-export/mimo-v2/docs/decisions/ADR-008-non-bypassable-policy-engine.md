# ADR-008: Non-Bypassable Policy Engine (RBAC+ABAC, Deny-Default)

**Status:** Accepted · **Date:** Phase 1

## Problem
The system executes real actions (shell, code, browser, files, network). A hijacked or prompt-injected model must not be able to perform unauthorized actions. RBAC alone can't express context-sensitive rules; ABAC alone can't express role hierarchy cleanly.

## Candidates
1. RBAC only.
2. ABAC only.
3. Hybrid RBAC+ABAC via a non-bypassable Policy Engine.
4. Per-tool ad-hoc checks scattered in code.

## Selected
**Candidate 3 — Hybrid RBAC+ABAC via a non-bypassable Policy Engine.**
- **RBAC:** roles (user, agent, supervisor, autonomous-trigger) for structure.
- **ABAC:** attributes (task risk, sandbox tier, time, budget remaining, approval status) for context.
- **Engine:** Casbin (or SQLite-backed rules) v1 → OPA/Cedar v2. Deny-by-default + deny-wins.
- **Non-bypassable:** every Tool/Agent/Execution call passes through the engine *before* execution. The engine is the single chokepoint; there is no "skip policy" path.
- **Capability tokens:** short-lived scoped tokens issued by the engine, honored by tools.

## Rejected
- **Candidates 1 & 2** — each misses expressiveness the other provides.
- **Candidate 4** — inconsistent, easy to miss a check, bypassable.

## Reason
The more autonomous the system, the more critical this control. A non-bypassable engine means even a fully hijacked model cannot perform an action the policy denies. This is the single most important security control — defense-in-depth starts here.

## Consequences
- Every action pays a policy-check cost (cheap; cached).
- Policy is versioned + auditable.
- Deny-default means new tools/actions are blocked until explicitly allowed.
- Kill-switch = global deny rule.

## Reversal Cost
Low for the policy content (rules are data). Medium for the engine implementation (Casbin → OPA is a swap behind the interface).
