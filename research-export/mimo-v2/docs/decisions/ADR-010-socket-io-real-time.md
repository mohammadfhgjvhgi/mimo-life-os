# ADR-010: socket.io for Real-Time UI Updates

**Status:** Accepted · **Date:** Phase 1

## Problem
Long-running agent/tool execution must stream live progress to the UI (step-start, progress, tool-call, verification, error, checkpoint, result). HTTP polling is too latent and wasteful. The environment mandates WebSocket/socket.io for real-time (no other real-time mechanism allowed).

## Candidates
1. HTTP polling.
2. Server-Sent Events (SSE).
3. socket.io (WebSocket).

## Selected
**Candidate 3 — socket.io.** Per environment rules, WebSocket/socket.io is the only sanctioned real-time mechanism. The scaffold already includes a socket.io demo (`examples/websocket/`).

## Pattern
- A socket.io mini-service runs on its own internal port.
- UI connects: `io("/?XTransformPort=<ws-port>")` (relative path, `XTransformPort` query — never absolute `localhost:PORT`).
- Runtime emits structured events: `step:start`, `step:progress`, `step:done`, `tool:call`, `tool:result`, `verification`, `error`, `checkpoint`, `result`, `approval:request`.
- UI sends: `user:input`, `approval:decide`, `task:cancel`, `settings:update`.

## Rejected
- **Candidate 1** — latent, wasteful.
- **Candidate 2** — one-way only (server→client); can't handle approvals/cancel cleanly without a second channel.

## Reason
socket.io gives bidirectional, reconnect-with-backoff, room/namespace support (per-task channels), and is the environment-sanctioned choice. The `examples/websocket/` demo proves the pattern.

## Consequences
- One extra mini-service (the WS server).
- Event schema must be versioned + documented (contract between runtime + UI).
- Reconnection must replay missed events from the task journal (idempotent consumer).

## Reversal Cost
Low — the event schema is the contract; the transport is swap-able behind it.
