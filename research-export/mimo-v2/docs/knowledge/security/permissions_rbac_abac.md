# Permissions — RBAC + ABAC

**Category:** Security
**Status:** CORE
**Maturity:** Mature (RBAC: decades; ABAC: mature; agent-specific application: emerging)

## Definition
**Authorization** is the mechanism that decides, for a given subject (user/agent/tool) attempting a given action on a given resource, whether to **allow**, **deny**, or **require approval**. MiMo uses a hybrid **RBAC + ABAC** model:
- **RBAC (Role-Based Access Control)**: subjects have roles (`user`, `admin`, `agent:browser`, `agent:coder`, `tool:mcp:filesystem`); roles have permissions on resource classes.
- **ABAC (Attribute-Based Access Control)**: decisions also consider attributes of subject (`user_id`, `clearance`), resource (`owner_id`, `sensitivity`), action (`read`/`write`/`execute`/`destructive`), and environment (`time`, `ip`, `task_context`, `approval_state`).

Hybrid RBAC+ABAC gives the simplicity of roles for coarse permissions and the precision of attributes for fine-grained, context-aware decisions.

## Problem Solved
Hardcoded permission checks scattered through code are: (a) inconsistent, (b) hard to audit, (c) bypassable by a model that finds an unchecked path. A centralized Policy Engine with RBAC+ABAC:
- Makes every authorization decision explicit and logged.
- Allows non-bypassable enforcement at the Tool Layer boundary.
- Lets admins change rules without code changes.
- Handles context-sensitive decisions ("user can read own files but not others'", "agent can call browser tool only for tasks the user approved", "destructive actions always need approval").

## Why It Matters
This is the **single most important security control** for an autonomous agent. Even if the LLM is fully hijacked by prompt injection, a non-bypassable policy layer means the model cannot do anything it wasn't already authorized to do. It is the boundary between "smart assistant" and "unrestricted liability".

## How It Works
### Subjects, Actions, Resources, Context
- **Subject**: user (authenticated), agent instance (with role + scoped capabilities), internal service.
- **Action**: model_call, tool_call, file_read, file_write, shell_exec, git_push, browser_navigate, browser_form_submit, email_send, payment, etc.
- **Resource**: specific file, repo, URL, tool, model, secret, user data record.
- **Context**: task_id, approval_state, time, ip, source (chat/scheduled/proactive), budget_remaining, sandbox_id.

### Policy rule structure (ABAC)
```
allow if:
  subject.role in {admin}
  OR
  (subject.role = user
   AND action = file_write
   AND resource.owner_id = subject.id
   AND resource.sensitivity != "critical"
   AND context.approval_state = "approved")
  OR
  (subject.role = agent:browser
   AND action = browser_form_submit
   AND context.task_id = subject.task_id
   AND context.approval_state = "approved"
   AND resource.domain in subject.allowed_domains)
deny if:
  action in {destructive_actions}
  AND context.approval_state != "approved"
```

### Decision flow
1. Subject attempts action.
2. Tool Layer calls `PolicyEngine.check(subject, action, resource, context)`.
3. Engine evaluates RBAC role permissions, then ABAC attribute rules.
4. Returns: `allow` | `deny` | `require-approval` | `require-escalation`.
5. If `require-approval`: emit approval request to UI; block until approved/denied/timed-out.
6. Audit the decision (allow/deny/require-approval) + the inputs.

### Non-bypassable enforcement
- Every tool call site goes through the Policy Engine. No "trusted internal" path skips it.
- The model cannot call tools directly — only through the Tool Layer which enforces the check.
- Even internal services authenticate (mTLS) and pass through the same policy.

## Architecture
```
   Agent (subject) proposes action
        │
        ▼
   Tool Layer entry point
        │
        ▼
   ┌──────────────────────────────────┐
   │  PolicyEngine                    │
   │   - RBAC: role → permissions     │
   │   - ABAC: attribute rules        │
   │   - approval_state check         │
   │   - budget check                 │
   └────────────┬─────────────────────┘
                │ allow / deny / require-approval
        ┌───────┼─────────┐
        ▼       ▼         ▼
     Execute  Deny    Request approval (socket.io)
              +Audit    +Audit
```

## Interfaces
- `check(subjectId, action, resource, context) → {decision, reason, ruleId}`.
- `requestApproval(subjectId, action, resource, context) → approvalId`.
- `resolveApproval(approvalId, decision, userId) → ok`.
- Admin UI: CRUD on roles, permissions, ABAC rules.
- Audit: every decision logged.

## Dependencies
- Policy engine library: Casbin (TS), OPA (general), Cedar (Amazon), or custom SQLite-backed for v1.
- Auth: NextAuth or equivalent for subject identity.
- Approval UI: socket.io real-time + Next.js console.
- Audit store: Prisma/SQLite (append-only) + off-host WORM copy.

## Strengths
- **Non-bypassable** when enforced at every tool call site — the strongest single control.
- **Centralized**: rules in one place; auditable; changeable without code deploys.
- **Fine-grained**: ABAC handles context-sensitive decisions that pure RBAC can't.
- **Auditable**: every decision logged with inputs.
- **Composable with approval gates**: `require-approval` is a first-class decision.
- **Composable with budgets**: budget check is part of the policy.
- **Fail-safe**: default-deny if no rule matches.

## Weaknesses
- **Complexity**: ABAC rules can become a tangle; need governance.
- **Performance**: per-call check adds latency (mitigated by caching decisions for identical `(subject, action, resource, context)`).
- **Rule conflicts**: conflicting rules need clear precedence (deny-wins is typical).
- **Operational overhead**: managing roles + rules + approvals is real work.
- **False sense of security**: a policy is only as good as its coverage; missing a tool call site = bypass.
- **Approval fatigue**: too many approval prompts → users rubber-stamp → reduces security.

## Failure Modes
- **Missing tool-call site** bypasses policy. Mitigation: lint/CI check that every tool wrapper calls PolicyEngine; architectural enforcement (single Tool Layer entry point).
- **Over-permissive rule** (wildcard). Mitigation: default-deny; rule review; no `*` in production.
- **Rule conflict** (allow + deny both match). Mitigation: explicit precedence (deny-wins); rule priority field.
- **Context spoofing** (agent lies about task_id). Mitigation: context comes from runtime, not from model.
- **Approval bypass** (auto-approve after timeout). Mitigation: timeout = deny, not allow.
- **Cache poisoning** (cached allow for a since-revoked permission). Mitigation: cache invalidation on rule/role/permission change; short TTL.
- **Stale rules** (rule references a tool that no longer exists). Mitigation: rule linter.

## Security Implications (meta)
- Policy Engine is itself a high-value target: compromise it = bypass everything. Mitigation: minimal attack surface (no model-facing API; only internal mTLS); append-only audit; host-level isolation.
- Rules DB is sensitive: tampering = bypass. Mitigation: append-only + hash-chaining + signed rules + off-host copy.
- Approval workflow is a target: an attacker who can approve (via stolen session) can authorize anything. Mitigation: re-auth for high-risk approvals; rate limit.

## Performance Implications
- Per-call check: 1-10ms cached, 10-50ms uncached.
- Cache by `(subject_id, action, resource_hash, context_hash)`; invalidate on rule/role changes.
- Approval flow adds user-wait latency (seconds to minutes) — only for actions that need it.
- Budget check is a DB read; cache in memory.

## Operational Implications
- Need a **PolicyEngine service** with admin UI for rules/roles.
- Need an **Approval Center** UI: pending approvals, history, one-click approve/reject, comments.
- Need **audit dashboard**: filter by subject/action/decision/time.
- Need **rule review** workflow: changes peer-reviewed, versioned, rollback-able.
- Need **rule linter**: detect unused rules, conflicting rules, rules referencing missing tools.
- Need **test suite**: every rule has test cases (allow/deny/require-approval).
- Need **policy regression suite**: re-run all tests on rule changes.

## Alternatives
- **Pure RBAC**: simpler but can't express "user can write own files but not others'"; insufficient for MiMo.
- **Pure ABAC**: most expressive but harder to manage; hybrid is pragmatic.
- **ACLs (Access Control Lists)**: per-resource lists; doesn't scale to agent dynamics.
- **MAC (Mandatory Access Control)**: OS-level (SELinux); too rigid for app logic.
- **Capability tokens**: scoped, time-limited tokens granting specific rights — complementary, see `security/agent_security.md`.

## Maturity & Production Readiness
- RBAC: decades-mature, ubiquitous.
- ABAC: mature (NIST ABAC, XACML).
- Hybrid RBAC+ABAC: standard enterprise pattern.
- Agent-specific application: emerging but well-grounded in access-control fundamentals.
- Tools: Casbin (production-grade), OPA (production-grade), Cedar (Amazon, production-grade).

## Relevant Research / Papers
- NIST Special Publication 800-162 (ABAC).
- NIST SP 800-82 (RBAC).
- XACML 3.0 (OASIS standard).
- "A Survey of Access Control Models" (Hu et al., NIST).
- OWASP Access Control Cheat Sheet.
- OWASP Top 10 for LLM Applications 2025 (LLM06, LLM07 — access control relevance).

## Official Documentation
- Casbin: https://casbin.org (TS SDK available).
- OPA: https://www.openpolicyagent.org.
- Cedar: https://www.cedarpolicy.com.
- NIST ABAC/RBAC publications.
- OWASP Access Control Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Authorization-Cheat-Sheet.html

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: PolicyEngine runs server-side; never model-facing.
- v1: Casbin with SQLite adapter, or custom SQLite-backed engine (RBAC roles + ABAC rules as JSON conditions).
- v2: OPA or Cedar if scale/policy complexity demands.
- Schema (Prisma): `Role`, `Permission`, `PolicyRule`, `PolicyDecision` (audit), `ApprovalRequest`, `ApprovalDecision`.
- Tool Layer architectural rule: every tool wrapper (`callTool(subjectId, toolName, params, context)`) MUST call `PolicyEngine.check` before dispatch; lint/CI enforces.
- Approval Center: socket.io real-time; UI in Next.js console; re-auth for high-risk approvals.
- Cache: in-memory LRU keyed by `(subject, action, resource, context)`; TTL 60s; invalidate on rule/role change.
- Default-deny: no matching rule = deny.
- Deny-wins: if both allow and deny match, deny.
- Budget integration: `Budget` table per (subject, dimension); PolicyEngine checks before allow.
- Capability tokens: for fine-grained tool delegation (e.g. browser session scoped to one task + one domain set) — token signed by PolicyEngine, validated by Tool Layer.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Security Layer (Layer 15)**, cross-cutting.
- Wraps every Tool Layer (Layer 9), Agent Layer (Layer 8), Execution Layer (Layer 10) call.
- Critical for "controlled autonomy": autonomy is granted by policy, not assumed.
- Integrates with Audit Trails (observability) and Approval Gates (security).

## Recommended Usage
- ADOPT hybrid RBAC + ABAC, centralized Policy Engine, non-bypassable.
- v1: Casbin or custom SQLite-backed (RBAC roles + ABAC JSON rules).
- v2: OPA or Cedar if needed.
- Default-deny + deny-wins + cached decisions + approval as first-class decision.
- Architectural enforcement: every tool wrapper calls PolicyEngine (lint + CI).
- Approval Center UI; re-auth for high-risk approvals.
- Capability tokens for fine-grained agent scoping.

## Decision
**ADOPT** — CORE. Hybrid RBAC + ABAC, centralized Policy Engine (Casbin/SQLite v1, OPA/Cedar v2), non-bypassable, default-deny, deny-wins, cached, approval-first-class, capability tokens for scoping. Architectural enforcement via lint + CI.

## Sources
- NIST SP 800-162 (ABAC) and SP 800-82 (RBAC).
- XACML 3.0 (OASIS).
- OWASP Authorization Cheat Sheet + OWASP LLM Top 10 2025.
- Casbin / OPA / Cedar official docs.
- Inferred agent-specific patterns from OWASP Agentic Security Initiative.
