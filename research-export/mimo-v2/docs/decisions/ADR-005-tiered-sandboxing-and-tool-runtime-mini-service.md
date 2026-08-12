# ADR-005: Tiered Sandboxing + Tool Runtime Mini-Service

**Status:** Accepted · **Date:** Phase 1

## Problem
Tools include shell, Python, filesystem, browser, HTTP — many can cause real damage. Sandboxing must match risk to isolation weight. In-process-only is unsafe; Docker-only is heavy for a personal system.

## Candidates
1. In-process only (`node:vm` / direct calls).
2. Docker-only for all tools.
3. Tiered: risk → isolation weight; Tool Runtime as a dedicated mini-service.

## Selected
**Candidate 3 — Tiered.**
- **Tier 1 (light):** `node:vm` for pure-JS computation, read-only filesystem.
- **Tier 2 (medium):** `child_process` + `firejail` (or equivalent) for shell/Python with restricted paths.
- **Tier 3 (heavy):** Docker pooled containers for untrusted/heavy code execution and browser automation.
- **Network:** default-deny via egress proxy; allowlist per tool.
- **Process isolation:** Tool Runtime runs as a dedicated mini-service on its own port (`:4030`), isolated from the UI server, reached via Caddy `?XTransformPort=4030`.

## Rejected
- **Candidate 1** — unsafe for shell/code.
- **Candidate 2** — heavy for trivial tools; slow cold-starts.

## Reason
Match sandbox weight to risk. A read-only file scan doesn't need Docker; untrusted code execution does. Isolating the Tool Runtime as its own mini-service means a tool crash/exploit can't take down the UI, and the egress proxy is enforced at the service boundary.

## Consequences
- Three sandbox tiers to maintain (but each is well-scoped).
- Default-deny network is the rule; allowlist is the exception (audited).
- Every tool call: permission check → sandbox tier selection → execution → result sanitization → trace.
- Approval workflow for risky tools (see `knowledge/tools/approval_workflow.md`).

## Reversal Cost
Medium — changing the sandbox tier mapping is config; replacing the sandbox implementation (e.g. firejail → gVisor) is localized to the Tool Runtime service.
