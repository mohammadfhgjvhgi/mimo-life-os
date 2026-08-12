# Agent Security

**Category:** Security
**Status:** CORE
**Maturity:** Emerging (threat models maturing; defense patterns consolidated 2024-2025)

## Definition
**Agent Security** is the cross-cutting discipline of protecting an autonomous AI agent system — and the data, tools, and people it touches — from intentional and unintentional harm. It spans authentication, authorization (RBAC+ABAC), secrets management, sandboxing, prompt-injection defense, malicious-tool-output defense, data-exfiltration defense, audit, approval gates, rate limiting, kill switch, and safe failure. It is **architectural**, not bolted on: security is a property of the runtime layers, not a feature added at the end.

This file is the umbrella; specific topics are detailed in:
- `security/prompt_injection_defense.md`
- `security/permissions_rbac_abac.md`
- `security/secrets_management.md`
- `observability/audit_trails.md`

## Problem Solved
An autonomous agent that can read email, browse the web, execute code, and call APIs is also an autonomous agent that can be tricked, hijacked, leaked-from, or made to do harm. Traditional app security (auth, RBAC, input validation) is necessary but not sufficient because agents introduce new attack surfaces:
- **Prompt injection** (direct and indirect).
- **Malicious tool outputs** (a tool returns text that hijacks the model).
- **Tool poisoning** (a malicious MCP server).
- **Data exfiltration** (model sends secrets to a tool or external URL).
- **Credential theft** (agent mishandles API keys).
- **Unbounded autonomy** (agent takes destructive actions without approval).
- **Cost runaway** (agent loops calling paid APIs).

Agent security is the systematic defense against these.

## Why It Matters
MiMo AI's value prop is autonomy — and autonomy without security is liability. A MiMo that can browse, code, and email on the user's behalf can also be coerced into clicking phishing links, leaking the user's address book, or running up thousands in API bills. Security is the difference between "trusted assistant" and "dangerous toy". Per `PROJECT_UNDERSTANDING.md`: "Security from day one — architectural, not bolted on."

## How It Works
Defense-in-depth, layered across the runtime:

1. **Identity & Authentication**: who is the user? who is the agent? Session auth (NextAuth), service-to-service auth (mTLS / signed JWT for internal mini-services).
2. **Authorization (RBAC + ABAC)**: every action — model call, tool call, agent dispatch, file access — passes through a policy engine. See `security/permissions_rbac_abac.md`.
3. **Secrets management**: API keys, OAuth tokens, passwords in env / vault, never in code, never in prompts. See `security/secrets_management.md`.
4. **Sandboxing**: code execution, browser, MCP stdio servers run in isolated containers with no host access, no secrets, restricted network. See `coding/coding_agent.md` and `browser/browser_automation.md`.
5. **Prompt-injection defense**: input sanitization, output sandboxing, instruction hierarchy, action allowlist. See `security/prompt_injection_defense.md`.
6. **Tool-output sandboxing**: treat every tool output (MCP, browser page, code-execution stdout) as untrusted text — fence it from instructions.
7. **Approval gates**: destructive / irreversible / costly actions require human approval (HITL). See below.
8. **Rate limiting + budgets**: per-user, per-tool, per-task caps on calls, tokens, dollars, time.
9. **Kill switch**: global pause / abort / revoke-tokens capability for the user.
10. **Audit trails**: immutable record of every action. See `observability/audit_trails.md`.
11. **Safe failure**: when something goes wrong, fail closed (deny) not open (allow).
12. **Network policy**: egress allowlist through Caddy; block internal IPs, metadata endpoints; per-tool network namespaces.

## Architecture
```
                  ┌──────────────────────────────┐
                  │  User (authenticated session) │
                  └──────────────┬───────────────┘
                                 │
                  ┌──────────────▼───────────────┐
                  │  Policy Engine (RBAC + ABAC) │
                  │  + Approval Gates + Budgets  │
                  └──────────────┬───────────────┘
                                 │ allow / deny / require-approval
            ┌────────────────────┼────────────────────┐
            │                    │                    │
   ┌────────▼────────┐  ┌────────▼────────┐  ┌────────▼────────┐
   │ Agent Layer     │  │ Tool Layer      │  │ Execution Layer │
   │ (sandboxed)     │  │ (sandboxed)     │  │ (sandboxed)     │
   └────────┬────────┘  └────────┬────────┘  └────────┬────────┘
            │                    │                    │
            └────────────────────┼────────────────────┘
                                 │
                  ┌──────────────▼───────────────┐
                  │  Audit Log (immutable)       │
                  │  + Tracing + Cost Tracking   │
                  └──────────────────────────────┘
                                 │
                  ┌──────────────▼───────────────┐
                  │  Kill Switch / Pause / Revoke│
                  └──────────────────────────────┘
```

## Interfaces
- **PolicyEngine API**: `check(subject, action, resource, context) → allow | deny | require-approval`.
- **Approval API**: `request(subject, action, resource, context) → approvalId`; user approves/rejects via UI or socket.io.
- **Budget API**: `consume(subject, dimension, amount) → ok | exceeded`.
- **Audit API**: `record(action, subject, resource, input, output, timestamp, traceId)`.
- **KillSwitch API**: `pause()`, `resume()`, `abort(taskId)`, `revokeTokens(userId)`.

## Dependencies
- Auth: NextAuth or equivalent (already in Next.js ecosystem).
- Policy engine: Casbin, OPA, Cedar, or custom (SQLite-backed for v1).
- Vault: HashiCorp Vault (heavy), AWS Secrets Manager (cloud), or for v1: encrypted SQLite + env + age-encrypted secrets file.
- Sandbox: Docker / gVisor / Firecracker.
- Audit: append-only SQLite table + WORM storage for tamper-evidence.
- Network: Caddy (already planned) as the egress gate.

## Strengths
- Defense-in-depth: no single layer's failure compromises the system.
- Architectural: security decisions live with the runtime, not in ad-hoc code.
- Auditable: every action traceable to a user, an agent, a tool, a timestamp.
- Fail-safe: defaults deny; errors fail closed.
- User-transparent: approval center + audit dashboard let the user see what MiMo is doing.

## Weaknesses
- **Complexity**: many layers = many places to misconfigure.
- **Latency**: policy checks add per-call overhead (mitigated by caching decisions).
- **False positives**: over-strict policies frustrate users; tuning required.
- **Novel attacks**: agent security is a moving target; defenses lag attacks.
- **No silver bullet**: prompt injection has no perfect defense — only reduction.
- **Operational burden**: audit log volume, secret rotation, sandbox image maintenance.

## Failure Modes
- **Over-permissive policy**: a wildcard rule lets an agent call any tool → catastrophe. Mitigation: default-deny; explicit allowlist.
- **Prompt injection bypasses policy** (model calls a tool it shouldn't because the page told it to). Mitigation: prompt-injection defense + policy check is *non-bypassable* (not in model's control).
- **Sandbox escape**: container breakout. Mitigation: gVisor/Firecracker; seccomp; minimal image.
- **Secret leak via prompt**: model includes a key in a tool call. Mitigation: secrets never in context; secret scanner on outgoing tool inputs.
- **Audit log tampering**: attacker deletes logs. Mitigation: append-only + WORM + hash-chaining + off-host copy.
- **Kill switch ignored**: in-flight task continues. Mitigation: cooperative + forced cancel (kill container, revoke tokens).
- **Budget bypass**: agent finds an un-metered path. Mitigation: every API call wrapped; no direct SDK access from agents.

## Security Implications (meta)
This file *is* the security implications. Cross-cutting risks:
- **Supply chain**: third-party MCP servers, npm packages, model providers — each is a trust boundary.
- **Insider threat**: the primary user themselves can ask MiMo to do harmful things; some safety rails still apply (illegal content, self-harm).
- **Multi-tenant future**: if MiMo extends to org/multi-user, isolation between users becomes critical.
- **Regulatory**: GDPR (EU), CCPA (CA), EU AI Act, sector-specific (HIPAA, SOC2) — track applicable regimes.

## Performance Implications
- Policy checks: 1-10ms cached, 10-50ms uncached — negligible per call.
- Audit writes: batch async to avoid blocking.
- Sandbox startup: 100-500ms — pool warm containers.
- Network egress through Caddy: minimal overhead.

## Operational Implications
- Need a **PolicyEngine service** with admin UI to view/edit rules.
- Need an **Approval Center** UI (real-time via socket.io): pending approvals, one-click approve/reject.
- Need an **Audit Dashboard** (Observability UI): filterable by user/agent/tool/time.
- Need a **Kill Switch** UI: global pause, abort specific task, revoke tokens.
- Need **secret rotation** workflow.
- Need **security incident response** playbooks.
- Need **regular review** of audit logs for anomalies.
- Need **regression suite** for security: penetration tests, prompt-injection red-teaming, sandbox escape attempts.

## Alternatives
- **OWASP Top 10 for LLM Applications (2025)** — industry-standard threat list; use as checklist.
- **OWASP Agentic Security Initiative** — agent-specific guidance.
- **NIST AI RMF** — risk management framework.
- **Microsoft Agent Governance** — governance-focused framework.
- **Anthropic / OpenAI / Google safety frameworks** — vendor guidance, useful patterns.

## Maturity & Production Readiness
- Threat models well-understood (OWASP LLM Top 10, 2025).
- Defense patterns consolidated but still maturing (esp. prompt-injection defense).
- Production-grade tools exist for each layer (Casbin, Vault, gVisor, OPA).
- Novel attack research publishes monthly — track arXiv, OWASP, Invariant Labs, etc.

## Relevant Research / Papers
- OWASP Top 10 for LLM Applications (2025).
- "System Card" / model cards from Anthropic, OpenAI, Google (safety sections).
- "Tool Poisoning Attacks" (Invariant Labs, 2025).
- "Prompt Injection attack against LLM-integrated Applications" (Greshake et al., 2022 — foundational).
- "Not what you've signed up for: Compromising Real-World LLM-integrated Applications" (Greshake et al., 2023).
- "Agents and the Open Web" (security analyses, 2024-2025).
- NIST AI RMF 1.0 (2023).

## Official Documentation
- OWASP LLM Top 10: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- OWASP Agentic Security: https://owasp.org/www-project-agentic-security-initiative/
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- Casbin: https://casbin.org
- OPA: https://www.openpolicyagent.org
- Cedar (Amazon): https://www.cedarpolicy.com
- HashiCorp Vault: https://developer.hashicorp.com/vault

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: all security services run on Node backend; browser only sees results.
- Auth: NextAuth for user sessions; service-to-service mTLS or signed JWTs for internal mini-services.
- Policy engine: Casbin or custom SQLite-backed for v1 (RBAC + ABAC rules in DB); OPA/Cedar for v2 if scale demands.
- Secrets: env vars for dev; for v1 production, age-encrypted secrets file in repo-ignored path + master key in env; v2 → Vault.
- Sandbox: Docker per-language image (coding agent) and per-browser image; gVisor runtime for stronger isolation; no network egress except through Caddy.
- Audit: append-only Prisma table + hash-chained records + daily WORM snapshot to off-host storage.
- Approval Center: socket.io real-time; UI in Next.js console.
- Kill Switch: global flag in DB checked by every loop iteration; per-task abort; token revocation endpoint.
- Rate limit + budget: per-user, per-tool, per-task caps in DB; checked before every call.
- Network policy: Caddy as egress proxy; allowlist of external domains per tool; block RFC1918 + 169.254.169.254.
- Secret scanner on outgoing tool inputs (regex for common key patterns) — block if matched.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Security / Observability / Evaluation cross-cutting layer (Layer 15)**.
- Wraps every Tool/Agent/Execution call — non-bypassable.
- Integrates with all other layers; security is the connective tissue.
- Critical for the "controlled autonomy" principle: autonomy is granted by policy, not assumed.

## Recommended Usage
- ADOPT defense-in-depth from day one (Phase 2 implementation; Phase 1 designs the seams).
- Policy engine: Casbin or custom SQLite-backed (RBAC + ABAC).
- Secrets: env + age-encrypted file (v1); Vault (v2).
- Sandbox: Docker + gVisor; no egress except via Caddy allowlist.
- Approval gates for all destructive / costly / irreversible actions.
- Kill switch global + per-task.
- Audit append-only + hash-chained + off-host copy.
- Track OWASP LLM Top 10 as living checklist.
- Red-team regularly (prompt-injection tests, sandbox escape attempts).

## Decision
**ADOPT** — CORE. Defense-in-depth, architectural, non-bypassable. Casbin/SQLite policy engine (v1) → OPA/Cedar (v2). Vault for secrets (v2). Docker+gVisor sandbox. Approval gates + kill switch + immutable audit. Track OWASP LLM Top 10.

## Sources
- OWASP Top 10 for LLM Applications (2025) — canonical checklist.
- OWASP Agentic Security Initiative.
- NIST AI RMF.
- Greshake et al. prompt-injection papers (foundational).
- Invariant Labs tool-poisoning advisory.
- Casbin / OPA / Cedar / Vault official docs.
