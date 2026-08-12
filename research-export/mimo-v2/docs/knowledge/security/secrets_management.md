# Secrets Management

**Category:** Security
**Status:** CORE
**Maturity:** Mature (well-established discipline; agent-specific application: emerging)

## Definition
**Secrets Management** is the discipline of securely storing, distributing, rotating, auditing, and revoking secrets — API keys, OAuth tokens, passwords, certificates, signing keys — used by MiMo AI and its dependencies. Core principles:
- **Never commit** secrets to source control.
- **Never expose** secrets to the LLM context (prompts, tool inputs, code visible to the model).
- **Least privilege**: each secret scoped to what's needed; rotated regularly.
- **Encrypted at rest**, in transit, and in memory (where feasible).
- **Auditable**: every access logged; anomalies flagged.
- **Revocable**: kill switch per secret.

## Problem Solved
An autonomous agent that has access to API keys (Z.ai, OpenAI, GitHub, email, bank...) is also an agent that can leak them — via prompt injection, via a tool call to a malicious URL, via a code snippet it writes that includes the key, via a log line it emits. Without rigorous secrets management:
- A single leaked key can cost thousands in API bills.
- A leaked email token can leak the user's entire inbox.
- A leaked GitHub token can compromise the user's repos.
- A leaked bank credential can be catastrophic.

Secrets management is the discipline that prevents these.

## Why It Matters
MiMo AI necessarily holds powerful credentials (the user's Z.ai API key, the user's OAuth tokens for connected services, the user's MCP server credentials). The agent's autonomy amplifies both utility and risk. Secrets management is the boundary between "trusted assistant with my keys" and "liability". Per `PROJECT_UNDERSTANDING.md`: secrets in env/vault (never commit), audit, sandbox isolation.

## How It Works
### Storage layers (defense in depth)
1. **Source control**: NEVER. `.gitignore` covers `db/*.db`, `.env*`, `secrets/`, `*.pem`, `*.key`.
2. **Environment variables**: for dev and simple deployments; per-process; not in repo.
3. **Encrypted secrets file** (v1 production): `age`-encrypted file in repo-ignored path; master key in env or OS keychain. Decrypted at startup; held in process memory only.
4. **Secrets manager / vault** (v2 production): HashiCorp Vault, AWS Secrets Manager, GCP Secret Manager, Doppler, Infisical. Centralized; audited; auto-rotation; per-secret ACLs.
5. **OS keychain** (local dev): macOS Keychain, Windows Credential Manager, Linux Secret Service.

### Distribution
- Secrets loaded at process startup into process memory (not shell env where `ps`/child processes can read).
- Passed to subprocesses (sandboxed) only when needed, scoped, and only via secure channels (file descriptor, env in container namespace) — never via prompts.
- Internal mini-services: mTLS with certs issued by an internal CA; no shared long-lived secrets.
- Browser/MCP sandbox: no secrets by default; only injected when a task explicitly requires them and policy allows.

### LLM/Agent boundary
- Secrets never appear in prompts, system messages, tool descriptions, or context that the model can read.
- When the agent needs to call an authenticated API, the Tool Layer attaches the credential server-side (e.g. as an HTTP header) — the model only sees the tool name + params, not the credential.
- Code that the Coding Agent writes is scanned for hardcoded secrets before commit (pre-commit hook + secret scanner).
- All outgoing tool inputs (URLs, file writes, code commits) are scanned for secret patterns before transmission.

### Rotation & revocation
- Rotation schedule per secret (30/60/90 days; per provider policy).
- Emergency revocation: kill switch per secret + per user.
- Audit log: every read of a secret (who, when, what for).

### Compromise response
- Detect: anomaly detection on secret usage (unusual IPs, volume, time).
- Revoke: invalidate the secret at the provider.
- Rotate: issue new secret.
- Forensics: audit log shows what was accessed with the leaked secret.

## Architecture
```
   ┌─────────────────────────────────────┐
   │ Secret Store (Vault / encrypted     │
   │  file / env)                        │
   └────────────┬────────────────────────┘
                │ read at startup (or on-demand)
                ▼
   ┌─────────────────────────────────────┐
   │ MiMo Backend (process memory only)  │
   │  - never in prompts                 │
   │  - never in model-visible context   │
   └────────────┬────────────────────────┘
                │ attach at Tool Layer
                ▼
   ┌─────────────────────────────────────┐
   │ Tool Layer: call external API with  │
   │  credential in header (not visible  │
   │  to model)                          │
   └─────────────────────────────────────┘
                │
                ▼
   ┌─────────────────────────────────────┐
   │ Secret Scanner on all outgoing      │
   │  tool inputs (URLs, files, commits) │
   └─────────────────────────────────────┘
```

## Interfaces
- `SecretStore.get(secretId, subjectId, purpose) → secret` (with audit log).
- `SecretStore.rotate(secretId) → newSecret`.
- `SecretStore.revoke(secretId)`.
- `secretScanner.scan(text) → matches[]`.
- Tool Layer: when calling an authenticated external API, looks up the credential by `secretId` (mapped per tool + per user) and attaches it server-side.

## Dependencies
- v1: `age` (encryption), OS keychain (local dev), env vars (simple deploys).
- v2: HashiCorp Vault or cloud-native (AWS Secrets Manager, GCP Secret Manager).
- Secret scanner: `gitleaks`, `trufflehog`, or custom regex lib.
- Pre-commit hooks for secret detection.
- Internal CA (for mTLS between mini-services): `step-ca` or `cert-manager`.

## Strengths
- Defense-in-depth prevents single-point catastrophic leak.
- LLM-boundary enforcement means even a fully hijacked model can't exfiltrate keys it never sees.
- Rotation limits blast radius of any leak.
- Audit enables forensics.
- Revocation enables emergency response.

## Weaknesses
- **Operational burden**: rotation, audit review, scope tuning.
- **Latency**: Vault/SM calls add per-call latency (mitigated by in-process cache with short TTL).
- **False positives** in secret scanner (block legitimate content like test fixtures).
- **Human error**: dev accidentally commits a key; mitigated by pre-commit + repo scanning.
- **Scope creep**: "just give the agent full access" temptation; resist; least-privilege always.
- **Master key risk**: if the vault master key leaks, all secrets leak; protect at OS/HSM level.

## Failure Modes
- **Committed secret** in repo. Mitigation: pre-commit hook; repo scanner; git history rewrite if found; rotate immediately.
- **Secret in prompt** (model sees a key in env or file). Mitigation: secrets never in context; static analysis on context assembly.
- **Secret in tool output** (e.g. browser navigates to a page that includes a key in URL params). Mitigation: secret scanner on tool outputs before they enter context.
- **Secret in code** (Coding Agent writes a key). Mitigation: pre-commit scanner; block commits with secrets.
- **Secret in logs**. Mitigation: log redaction; structured logging that masks known patterns.
- **Vault compromise**. Mitigation: HSM-backed master key; network isolation; mTLS only; audit anomalies.
- **Long-lived OAuth token leak**. Mitigation: short-lived tokens + refresh-token rotation; revocation endpoint.
- **Insider leak**. Mitigation: audit log; least privilege; dual-control for high-value secrets.

## Security Implications (meta)
- Secrets management is itself a high-value target; treat the vault as critical infrastructure.
- The model boundary is the key insight: secrets must live below the model's awareness. The model never sees a secret; the Tool Layer attaches it.
- Secret scanner must run on every exit path: tool inputs, file writes, commits, log lines, even socket.io events.

## Performance Implications
- Vault/SM call: 5-50ms (network round-trip); cache in process memory with 5-15min TTL.
- Secret scanner: 1-10ms per text (regex).
- Pre-commit scanner: adds seconds to commit; acceptable.

## Operational Implications
- Need a **SecretStore service** (Vault adapter or encrypted-file adapter).
- Need a **SecretScanner** module invoked at every exit path.
- Need **pre-commit hook** + **repo scanner** (gitleaks in CI).
- Need **rotation workflow** with reminders + automation.
- Need **audit dashboard** for secret access.
- Need **incident response** playbook: detect → revoke → rotate → forensics.
- Need **dual-control** for high-value secrets (e.g. production DB password).

## Alternatives
- **Plain env vars**: simplest; weakest; dev only.
- **`.env` files in repo-ignored path**: ok for small projects; no audit; no rotation; not for production.
- **Doppler / Infisical**: managed secret managers; good DX; cloud-only.
- **AWS/GCP/Azure Secrets Manager**: cloud-native; integrates with cloud IAM.
- **HashiCorp Vault**: most powerful; self-hosted; complex.
- **Kubernetes Secrets**: K8s-native; base64 by default (not encrypted unless etcd encryption configured); pair with Vault or cloud SM.

## Maturity & Production Readiness
- Secrets management as a discipline is decades-mature.
- Vault, AWS SM, GCP SM, Doppler, Infisical all production-grade.
- Agent-specific application (model-boundary enforcement, secret scanner on outputs) is emerging but well-grounded.

## Relevant Research / Papers
- NIST SP 800-57 (Key Management).
- OWASP Cryptographic Storage Cheat Sheet.
- OWASP Top 10 for LLM Applications 2025 — LLM02 (Sensitive Information Disclosure), LLM06 (Sensitive Information Disclosure), LLM07 (Insecure Plugin Design).
- "Trufflehog" / "Gitleaks" tool documentation.
- Anthropic / OpenAI / Google model cards (data-handling sections).

## Official Documentation
- HashiCorp Vault: https://developer.hashicorp.com/vault
- AWS Secrets Manager: https://aws.amazon.com/secrets-manager/
- GCP Secret Manager: https://cloud.google.com/secret-manager
- Doppler: https://www.doppler.com
- Infisical: https://infisical.com
- `age` encryption: https://github.com/FiloSottile/age
- gitleaks: https://github.com/gitleaks/gitleaks
- trufflehog: https://github.com/trufflesecurity/trufflehog

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: secrets held in Node process memory; never sent to browser; never in model context.
- v1 dev: `.env.local` (git-ignored); v1 production: `age`-encrypted secrets file with master key in env.
- v2: HashiCorp Vault or cloud SM.
- Schema (Prisma): `Secret` (metadata: name, owner, scope, rotation_due, last_rotated, revoked), `SecretAccess` (audit: secret_id, accessor, purpose, timestamp). **Never store the secret value in Prisma** — only metadata; value lives in vault/encrypted-file.
- Tool Layer: `callExternalApi(toolName, params, userId)` looks up the credential server-side via `SecretStore.get(secretId, ...)` and attaches as HTTP header; model sees only the tool name + sanitized params.
- Secret scanner module: regex lib for common patterns (AWS `AKIA...`, OpenAI `sk-...`, GitHub `ghp_...`, JWTs, emails, credit cards); invoked on every tool input that exits the backend (URLs, file writes, commits, socket.io events, log lines).
- Pre-commit hook: `gitleaks` on every commit; CI re-scans on PR.
- Log redaction: structured logger masks known secret patterns before emitting.
- Rotation: per-secret schedule; UI shows rotation-due; automated for OAuth refresh; manual + dual-control for high-value.
- Revocation: per-secret kill switch in admin UI; revokes at provider + clears from process cache.
- Caddy: terminates TLS; never logs request bodies; redacts Authorization headers in access logs.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Security Layer (Layer 15)**, cross-cutting.
- Wraps the **Tool Layer (Layer 9)** — credentials attached server-side at tool call.
- Wraps the **Coding Agent (Layer 8)** — pre-commit + repo scanner.
- Wraps the **Observability Layer (Layer 15)** — log redaction.
- Critical for the "controlled autonomy" principle: the agent can act with the user's credentials but can never see or leak them.

## Recommended Usage
- ADOPT defense-in-depth secrets management.
- v1: `age`-encrypted file + env master key; v2: Vault or cloud SM.
- Secrets never in model context — Tool Layer attaches server-side.
- Secret scanner on every exit path (tool inputs, commits, logs, socket.io events).
- Pre-commit + repo scanner (gitleaks).
- Rotation schedule per secret; revocation kill switch.
- Audit every secret access.
- Least privilege: scoped per tool + per user + per task; capability tokens for fine-grained delegation.

## Decision
**ADOPT** — CORE. Defense-in-depth secrets management. v1: `age`-encrypted file + env master key. v2: HashiCorp Vault or cloud SM. Model-boundary enforcement (secrets never in prompts). Secret scanner on every exit path. Pre-commit + repo scanner. Rotation + revocation + audit. Least privilege + capability tokens.

## Sources
- NIST SP 800-57 (Key Management).
- OWASP Cryptographic Storage Cheat Sheet + OWASP LLM Top 10 2025 (LLM02, LLM06, LLM07).
- HashiCorp Vault / AWS SM / GCP SM / Doppler / Infisical documentation.
- gitleaks / trufflehog / age tool documentation.
- Inferred agent-specific patterns from OWASP Agentic Security Initiative.
