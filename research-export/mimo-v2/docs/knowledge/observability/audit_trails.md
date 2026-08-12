# Audit Trails

**Category:** Observability
**Status:** CORE
**Maturity:** Mature (audit logging decades-mature; agent-specific audit emerging)

## Definition
An **Audit Trail** is an immutable, time-ordered, tamper-evident record of every security-relevant action in the system: who (subject) did what (action) on which (resource) when (timestamp) from where (source/IP) with what result (allow/deny/success/fail) and what context (task_id, trace_id, approval_id). Unlike general logs (operational, ephemeral, sampled), audit trails are **complete, immutable, and retained long-term** for compliance, forensics, and accountability.

In MiMo AI, audit trails are a strict subset of observability data: every action that touches security boundaries (tool calls, model calls, policy decisions, approvals, secret accesses, authentications, configuration changes, kill-switch invocations) is recorded as an audit event.

## Problem Solved
General logs are mutable, sampled, and short-lived — fine for debugging, useless for "what did MiMo do last Tuesday at 3pm with my email account, and who authorized it?". Audit trails answer:
- **Accountability**: who/what did this action?
- **Forensics**: after an incident, reconstruct what happened.
- **Compliance**: GDPR / HIPAA / SOC2 / EU AI Act require auditable records.
- **Trust**: user can verify what MiMo did on their behalf.
- **Deterrence**: tamper-evident records discourage insider misuse.

Without audit trails, an autonomous agent is unaccountable.

## Why It Matters
MiMo AI is an autonomous agent with the user's credentials. Audit trails are the **legal and ethical prerequisite** for that level of autonomy. They are also the **forensic backbone** for incident response: if a prompt-injection attack succeeded, the audit trail shows what the attacker did and what was leaked. For self-improvement, audit trails are the evidence base for evaluating whether a change was safe.

## How It Works
### Audit event structure
```
{
  audit_id: uuid,
  timestamp: ISO8601,
  trace_id, span_id,         // links to observability trace
  task_id,                   // links to execution task
  subject: {                 // who initiated
    user_id, role, agent_id, tool_id
  },
  action: "tool.call" | "policy.decision" | "approval.grant" |
          "secret.access" | "auth.login" | "config.change" |
          "killswitch.invoke" | "model.call",
  resource: {                // what was acted on
    type: "file"|"tool"|"model"|"secret"|"url"|"user",
    id, attributes
  },
  decision: "allow"|"deny"|"require-approval"|"success"|"fail",
  reason: ruleId | errorMessage,
  context: {
    source: "chat"|"scheduled"|"proactive"|"mcp",
    ip, user_agent, approval_id, sandbox_id, budget_before, budget_after
  },
  prev_hash: <hash of previous audit event>,  // tamper-evidence
  event_hash: <hash of this event>,
  signature: <signed by audit service key>
}
```

### Tamper-evidence
- **Append-only**: events can be added but never modified or deleted (DB constraint + WORM storage).
- **Hash-chaining**: each event's `event_hash = H(prev_hash || event_fields)`. Breaking the chain = detectable tampering.
- **Signing**: each event (or batch) signed by an audit-service private key (kept in vault/HSM).
- **Off-host copy**: daily (or per-N-events) snapshot to WORM storage (S3 Object Lock, Azure Immutable Blob, physical write-once media) that even DB admins can't modify.
- **Independent verification**: a verifier recomputes the hash chain from raw events and compares to stored hashes; alerts on mismatch.

### What to audit (mandatory event types)
- **Auth events**: login, logout, token issue, token revoke, failed auth.
- **Policy decisions**: every allow/deny/require-approval.
- **Tool calls**: every tool invocation (name, params-summary, result-summary, latency, exit status).
- **Model calls**: every model invocation (model, token counts, cost, latency, finish_reason).
- **Secret accesses**: every read of a secret (secret_id, accessor, purpose).
- **Approvals**: every approval requested, granted, denied, expired.
- **Config changes**: every change to roles, permissions, ABAC rules, MCP server registry, kill-switch.
- **Kill-switch invocations**: pause, resume, abort, revoke.
- **Data access**: every read/write of user data (files, emails, messages) by an agent.
- **External API calls**: every outbound call (URL, status, size).

### Retention
- Compliance regimes dictate minimum retention (GDPR: as long as needed for purpose; HIPAA: 6 years; SOC2: 1 year; financial: 7 years).
- Default: 7 years for audit events; longer if regulated.
- Hot: 90 days (queryable); cold: archive to immutable storage.

## Architecture
```
   Security-relevant action occurs (in any layer)
        │
        ▼
   AuditService.record(event)
        │
        ▼
   ┌──────────────────────────────────────┐
   │  Audit Log (append-only)             │
   │  - Prisma table with INSERT-only ACL │
   │  - hash-chained                      │
   │  - signed                            │
   └────────────┬─────────────────────────┘
                │ daily snapshot
                ▼
   ┌──────────────────────────────────────┐
   │  WORM Storage (S3 Object Lock /      │
   │   Azure Immutable / write-once)      │
   └──────────────────────────────────────┘
                │
                ▼
   ┌──────────────────────────────────────┐
   │  Verifier (scheduled job)            │
   │  - recompute hash chain              │
   │  - verify signatures                 │
   │  - alert on mismatch                 │
   └──────────────────────────────────────┘
```

## Interfaces
- `AuditService.record(event) → auditId` (insert-only; never update/delete).
- `AuditService.query(filter) → events[]` (admin-only; access-controlled).
- `AuditService.verify() → {chain_ok, signatures_ok, mismatches[]}`.
- Export API: stream events to external SIEM / compliance system.

## Dependencies
- Append-only DB table (SQLite with INSERT-only trigger, or Postgres with REVOKE UPDATE/DELETE).
- Hash function (SHA-256).
- Signing key (in vault/HSM; rotated yearly).
- WORM storage (S3 Object Lock, Azure Immutable Blob, GCP Bucket Lock).
- Verifier job (scheduled).

## Strengths
- **Tamper-evident**: hash-chaining + signing + WORM = strong assurance.
- **Complete**: every security-relevant action recorded.
- **Queryable**: admin dashboard for forensics/compliance.
- **Exportable**: feeds external SIEM/compliance systems.
- **Deters insider misuse**: tamper-evidence + audit = accountability.

## Weaknesses
- **Volume**: every action → event; high-volume systems produce many events.
- **Storage cost**: 7-year retention of immutable storage is non-trivial.
- **Performance**: synchronous audit writes add latency (mitigated by async batching, but reduces tamper-assurance if crash before flush).
- **Redaction tension**: audit needs detail for forensics, but PII/secrets must be redacted; trade-off.
- **Operational burden**: verifier job, WORM config, key rotation, export integration.
- **Not a substitute for prevention**: audit tells you what happened after; doesn't prevent it.

## Failure Modes
- **Audit service down** → events lost. Mitigation: local queue + retry; fail-closed (block action if audit can't record, for high-risk actions).
- **Hash-chain break** (DB corruption, manual edit). Mitigation: WORM snapshot + verifier job + alert.
- **Signing key leak** → forged events. Mitigation: HSM-backed key; rotation; dual-control.
- **Redaction failure** (secret in audit event). Mitigation: redaction pipeline before insert; verify with secret scanner.
- **Excessive volume** overwhelms storage. Mitigation: aggregate low-risk events; sample where appropriate (but never for high-risk).
- **Lost WORM snapshot** (provider outage). Mitigation: multi-region / multi-provider copy.
- **Query access abuse** (admin reads PII). Mitigation: access-controlled + audit-the-auditor (admin access to audit log is itself audited).

## Security Implications (meta)
- Audit log is itself high-value: tampering = undetected misuse. Protect with WORM + signing + verifier.
- Admin access to audit log is itself audited (audit-the-auditor).
- Audit events may contain PII → redaction pipeline + retention policy aligned with privacy regs (GDPR right to erasure vs. audit retention requirement — reconcile via pseudonymization: keep event structure, redact PII to hash).
- Signing key in vault/HSM; rotate yearly; dual-control for rotation.

## Performance Implications
- Synchronous audit insert: 1-5ms; acceptable for most actions.
- For high-frequency events (e.g. per-token), aggregate (one event per model call, not per token).
- Async batching for low-risk events; sync for high-risk (destructive, secret access).
- WORM snapshot: daily or per-N-events; background.

## Operational Implications
- Need an **AuditService** with INSERT-only DB constraints.
- Need a **hash-chaining + signing** implementation.
- Need a **WORM storage** integration (S3 Object Lock / Azure Immutable).
- Need a **verifier job** (scheduled; alerts on mismatch).
- Need an **audit dashboard** (admin-only; filter by subject/action/time/result).
- Need a **retention policy** (7 years default; longer if regulated).
- Need an **export pipeline** to external SIEM/compliance if required.
- Need a **redaction pipeline** (PII/secrets → hashes before insert).
- Need **key rotation** workflow (yearly; dual-control).

## Alternatives
- **Plain logs**: mutable, ephemeral; not tamper-evident; insufficient for audit.
- **Database audit triggers**: useful but not tamper-evident by themselves.
- **SIEM systems** (Splunk, Elastic, Datadog): ingestion + analysis; pair with WORM for tamper-evidence.
- **Blockchain / distributed ledger**: tamper-evident but overkill; WORM + hash-chaining is sufficient.
- **Cloud audit logs** (CloudTrail, GCP Audit Logs, Azure Activity Log): for cloud-provider-side actions; complement MiMo's app-level audit.

## Maturity & Production Readiness
- Audit logging as a discipline is decades-mature.
- WORM storage (S3 Object Lock, Azure Immutable Blob) is production-grade.
- Hash-chaining + signing is standard cryptography.
- Agent-specific audit (per-tool, per-model-call, per-approval) is emerging but well-grounded.

## Relevant Research / Papers
- NIST SP 800-92 (Guide to Computer Security Log Management).
- " tamper-evident audit logs" literature (cryptographic chaining, e.g. Bellare-Miner protocol).
- OWASP Logging Cheat Sheet.
- GDPR / HIPAA / SOC2 audit requirements.
- EU AI Act (audit obligations for high-risk AI systems).

## Official Documentation
- NIST SP 800-92.
- OWASP Logging Cheat Sheet: https://cheatsheetseries.owasp.org/cheatsheets/Logging-Cheat-Sheet.html
- AWS S3 Object Lock: https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html
- Azure Immutable Blob: https://learn.microsoft.com/azure/storage/blobs/immutable-storage-overview
- GCP Bucket Lock: https://cloud.google.com/storage/docs/bucket-lock

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: AuditService runs server-side; admin UI in Next.js console.
- Schema (Prisma): `AuditEvent` (append-only; INSERT-only via DB trigger or app-level enforcement).
- Hash-chaining: each event's `event_hash = sha256(prev_hash || canonical_json(event_fields))`.
- Signing: each daily batch signed with Ed25519 key (in vault/HSM v1; in-process env v1 dev).
- WORM: daily snapshot of audit table to S3 Object Lock / Azure Immutable (or local write-once for v1 single-host dev).
- Verifier job: scheduled (hourly); recomputes chain; alerts on mismatch.
- Audit dashboard: admin-only; filter by subject/action/time/result; export to CSV/JSON.
- Audit-the-auditor: admin access to audit log is itself audited.
- Redaction: before insert, mask known secret patterns (regex) and hash PII fields (email, phone) to hashes; keep event structure.
- Retention: 7 years default; aligned with applicable regulations.
- Export: stream to external SIEM (Splunk/Elastic) if compliance requires.
- High-risk actions (destructive, secret access) → sync audit insert; fail-closed if audit unavailable.
- Low-risk, high-frequency events → async batch insert.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Observability Layer (Layer 15)** + **Security Layer (Layer 15)** cross-cutting.
- Strict subset of observability data (security-relevant events).
- Consumes from every layer that performs security-relevant actions.
- Foundation for compliance, forensics, accountability, trust.
- Input to **Evaluation Layer** (correlate audit with outcomes for safety regression).
- Critical for "controlled autonomy": every autonomous action is auditable.

## Recommended Usage
- ADOPT tamper-evident audit trails from day one (Phase 2 implementation).
- Append-only + hash-chained + signed + WORM snapshot + verifier job.
- Audit every security-relevant action (see mandatory event types above).
- Redaction pipeline before insert (mask secrets; hash PII).
- 7-year retention default; align with applicable regs.
- Audit dashboard (admin-only) + audit-the-auditor.
- Sync insert + fail-closed for high-risk; async batch for low-risk/high-frequency.

## Decision
**ADOPT** — CORE. Tamper-evident audit trails: append-only + hash-chained + signed + WORM + verifier. Every security-relevant action audited. Redaction pipeline. 7-year retention. Admin dashboard + audit-the-auditor. Sync for high-risk; async batch for low-risk.

## Sources
- NIST SP 800-92 (Guide to Computer Security Log Management).
- OWASP Logging Cheat Sheet.
- Bellare-Miner tamper-evident log protocol (cryptographic literature).
- AWS S3 Object Lock / Azure Immutable Blob / GCP Bucket Lock documentation.
- GDPR / HIPAA / SOC2 / EU AI Act audit requirements.
- Inferred agent-specific patterns from OWASP Agentic Security Initiative.
