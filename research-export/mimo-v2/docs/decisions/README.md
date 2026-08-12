# Architecture Decision Records (ADRs)

> Major architectural decisions for MiMo AI. Each decision: problem, candidates, selected, rejected, reason, consequences, reversal cost.
> Numbering: ADR-00X. Status: Proposed | Accepted | Superseded.

| ID | Decision | Status |
|---|---|---|
| [ADR-001](./ADR-001-glm-5-2-via-model-gateway.md) | GLM-5.2 as primary brain via Model Gateway abstraction | Accepted |
| [ADR-002](./ADR-002-minimal-ts-runtime-on-vercel-ai-sdk.md) | Build minimal TS runtime on Vercel AI SDK (no Python frameworks) | Accepted |
| [ADR-003](./ADR-003-hybrid-agent-strategy.md) | Hybrid agents: single-agent default, specialists when justified | Accepted |
| [ADR-004](./ADR-004-embedded-storage-for-v1.md) | Embedded storage (sqlite-vec + SQLite KG + SQLite queue) for v1 | Accepted |
| [ADR-005](./ADR-005-tiered-sandboxing-and-tool-runtime-mini-service.md) | Tiered sandboxing + Tool Runtime as mini-service | Accepted |
| [ADR-006](./ADR-006-controlled-self-improvement-hard-boundary.md) | Controlled self-improvement hard boundary | Accepted |
| [ADR-007](./ADR-007-context-management-mandatory.md) | Context management mandatory regardless of 1M window | Accepted |
| [ADR-008](./ADR-008-non-bypassable-policy-engine.md) | Non-bypassable Policy Engine (RBAC+ABAC, deny-default) | Accepted |
| [ADR-009](./ADR-009-mini-services-and-caddy-single-port.md) | Mini-services + Caddy single-port gateway for runtime | Accepted |
| [ADR-010](./ADR-010-socket-io-real-time.md) | socket.io for real-time UI updates | Accepted |
