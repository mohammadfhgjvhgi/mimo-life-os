# Agent-to-Agent (A2A) Protocol

**Category:** Protocols
**Status:** OPTIONAL
**Maturity:** Emerging (Google-led draft, 2025)

## Definition
The **Agent2Agent (A2A) Protocol** is an open protocol (Google, April 2025) that lets independent AI agents — built by different vendors/frameworks — discover each other, advertise capabilities via an **Agent Card** (JSON at `/.well-known/agent.json`), negotiate tasks, exchange messages, and stream progress over JSON-RPC 2.0 over HTTPS. Complementary to MCP: **MCP** is "agent ↔ tool/data"; **A2A** is "agent ↔ agent".

## Problem Solved
Today, agents cannot easily delegate work to other agents built on different stacks. Every multi-vendor agent collaboration needs bespoke glue. A2A standardizes: discovery, capability advertisement, task lifecycle (`submitted → working → input-required → completed/failed/canceled`), structured message exchange (parts: text, file, data), and push/streaming updates.

## Why It Matters
For MiMo AI, A2A is **not** core to v1 (single-user, single-runtime). It matters when MiMo needs to:
- Delegate a sub-task to a specialized external agent (e.g. an external research agent from another vendor).
- Be invoked by another agent (e.g. a corporate orchestration agent asking MiMo to perform coding work).
- Interoperate in a future multi-agent organizational deployment.

For Phase 1, the relevance is architectural seams: design the Agent Layer so that *an A2A adapter could later be plugged in* without rewriting agent identity/state/IO contracts.

## How It Works
- Each agent exposes `/.well-known/agent.json` — the **Agent Card** with: name, description, version, capabilities (streaming, push-notifications, state transitions), skills, default endpoints, auth.
- Client sends `tasks/send` (or `tasks/sendSubscribe` for streaming) with a message containing `parts` (text/file/data).
- Server agent transitions task through lifecycle states; emits `TaskStatusUpdate` and `TaskArtifactUpdate` events.
- `tasks/get`, `tasks/cancel`, `tasks/pushNotification/set` for polling/cancellation/webhooks.
- Authentication: standard HTTP auth (API key, OAuth, mTLS).

## Architecture
```
MiMo Agent Runtime ─┐                          ┌─ External Agent A (e.g. Acme Research)
                    │  HTTPS + JSON-RPC 2.0    │
                    │ ◀──────────────────────▶ ├─ External Agent B (e.g. vendor Coding)
                    │  /.well-known/agent.json │
                    │  tasks/send*             └─ External Agent C (e.g. org orchestrator)
                    │
                    └─ A2A adapter (future)
```

## Interfaces
- Transport: HTTPS + JSON-RPC 2.0.
- Discovery: `GET /.well-known/agent.json`.
- Methods: `tasks/send`, `tasks/sendSubscribe`, `tasks/get`, `tasks/cancel`, `tasks/pushNotification/set`.
- Message parts: `TextPart`, `FilePart` (with bytes or URI), `DataPart` (structured JSON).
- Auth: HTTP header-based (Bearer, API key, mTLS).

## Dependencies
- HTTPS endpoint (Caddy already planned).
- JSON-RPC 2.0 handler.
- Optional: webhook receiver for push notifications.
- Optional: persistent task store (SQLite/Prisma already available).

## Strengths
- Vendor-neutral; backed by Google, Salesforce, SAP, LangChain, etc. (50+ partners at launch).
- Clean separation from MCP — they compose (an A2A agent can itself use MCP tools internally).
- Designed for long-running tasks with explicit lifecycle, streaming, and push.
- Agent Card makes discovery and capability negotiation machine-readable.

## Weaknesses
- Spec very new (2025); adoption still limited; not yet a "true standard" (IETF/ECMA not involved).
- No standard for **trust** between agents — agent A calling agent B has no semantic guarantee B is honest or competent.
- Security model is still maturing (no formal threat model published as of late 2025).
- Adds an entire RPC + auth + discovery surface — non-trivial to harden.
- Overlap with simpler patterns: an HTTP endpoint + JSON schema is often sufficient.
- Cost/latency of cross-vendor agent calls is unpredictable; no SLA semantics.

## Failure Modes
- **Rogue remote agent** returns wrong/malicious work; the delegating agent must verify outputs (Verification Layer).
- **Capability mismatch**: Agent Card advertises a skill the agent performs poorly.
- **Hangs**: remote agent never returns; need deadlines + `tasks/cancel`.
- **Auth failure**: leaked API key used to invoke MiMo's A2A endpoint.
- **Cost runaway**: a remote agent bills per call; delegation loops.

## Security Implications
- Treat every external agent as untrusted — its outputs flow into your context; apply the same prompt-injection defenses as MCP outputs.
- Capability tokens: scope each A2A relationship (which tasks, which data classes).
- Mutual auth (mTLS or signed JWTs) preferred for production.
- Audit every A2A delegation; log agent card, input parts, output parts, status transitions.
- Approval gate for delegations that touch sensitive data or execute side effects.

## Performance Implications
- Each A2A call adds network + remote agent inference latency; budget accordingly.
- Streaming (`sendSubscribe`) reduces perceived latency for long tasks.
- Cap parallel delegations; remote agents may rate-limit or queue.

## Operational Implications
- Need an **A2A registry** of trusted remote agents (Agent Card URL, auth, capabilities, last_health).
- Need task persistence (Prisma `A2aTask` table) for resumable long-running delegations.
- Need a UI to view in-flight delegations + approve/cancel.
- Need webhook ingress (Caddy → /a2a/callback) for push notifications.

## Alternatives
- **MCP Tasks**: MCP's own long-running task primitive; simpler if both sides already speak MCP.
- **Plain HTTP/JSON + schema**: the simplest inter-agent API; fine for bilateral relationships.
- **LangGraph multi-agent / CrewAI**: framework-internal agent-to-agent; not vendor-neutral.
- **Microsoft Agent Governance**: governance-focused, complementary (security/rules for agent collaboration).

## Maturity & Production Readiness
- Spec draft-quality; some reference implementations (Google ADK, LangChain A2A adapter).
- Not yet battle-tested at scale; expect breaking changes.
- Suitable for **experimentation only** in MiMo Phase 2/3.

## Relevant Research / Papers
- Google et al., "Announcing the Agent2Agent Protocol" (April 2025).
- A2A specification (github.com/a2aproject/A2A).
- Comparison: A2A vs MCP (Anthropic + Google joint explainer, 2025).

## Official Documentation
- Spec: https://a2a-protocol.org/latest/
- Repo: https://github.com/a2aproject/A2A
- Samples: https://github.com/a2aproject/A2A/tree/main/samples

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- Defer concrete implementation to Phase 2+.
- Architectural seams to preserve now: agent identity, capability description, task lifecycle, structured I/O contract. These map cleanly to A2A later.
- If implemented, expose MiMo's A2A endpoint behind Caddy with mTLS; store Agent Cards and task state in Prisma; push real-time status to UI via socket.io.

## Relevance To Our Project (MiMo AI layered runtime)
- Phase 1: **no code**; only architectural awareness.
- Phase 2+: optional adapter at the Agent Layer (Layer 8) boundary, mirroring the MCP adapter pattern at Layer 9.
- Reinforces the principle that agent identity/state/IO should be protocol-agnostic.

## Recommended Usage
- DEFER for v1; revisit when a concrete cross-vendor delegation use case appears.
- Track spec maturity; do not commit to surface until 1.0.
- Keep agent runtime decoupled from inter-agent transport.

## Decision
**DEFER** — OPTIONAL. Track spec evolution. Keep agent I/O contract clean so an A2A adapter can be added later without rearchitecting.

## Sources
- Google A2A announcement (April 2025).
- A2A specification (a2a-protocol.org).
- Anthropic/Google "A2A and MCP" explainer (2025).
- Inferred risk pattern from OWASP Agentic threats (cross-agent trust).
