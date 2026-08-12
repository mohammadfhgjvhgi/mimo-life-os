# ADR-009: Mini-Services + Caddy Single-Port Gateway

**Status:** Accepted · **Date:** Phase 1

## Problem
The sandbox exposes only **one external port**. Long-running processes (agent runtime, tool runtime, execution engine) must not run inside the Next.js UI server (crashes/blocking take down the UI), but they also can't each have an external port.

## Candidates
1. Run everything in the Next.js process.
2. Mini-services (independent bun processes, each on its own internal port) behind the Caddy gateway.
3. External queue/workers with no HTTP.

## Selected
**Candidate 2 — Mini-services behind Caddy.**
- Each runtime process (Agent Runtime `:4010`, Tool Runtime `:4030`, Execution Engine, socket.io realtime) is an independent bun project in `mini-services/`, on its own fixed internal port.
- The UI (Next.js `:3000`) and all mini-services sit behind Caddy (`:81` external).
- Cross-service requests use the **relative path + `?XTransformPort=<port>`** query convention (never absolute `localhost:PORT` URLs; never raw port in WebSocket — `io("/?XTransformPort=4010")`).

## Rejected
- **Candidate 1** — UI crash takes down agents/tools; blocking ops stall the request cycle.
- **Candidate 3** — loses HTTP-based observability/control + makes UI integration harder.

## Reason
Process isolation (a tool crash doesn't kill the UI) + single-external-port compliance + the gateway already exists in the scaffold (Caddyfile). The `XTransformPort` convention is the established pattern in this environment.

## Consequences
- N mini-services to start/manage (`.zscripts/mini-services-start.sh` exists).
- Each mini-service is a bun project with its own `package.json` + `index.ts`, hot-reload via `bun --hot`.
- Real-time via socket.io mini-service; UI subscribes with `/?XTransformPort=<port>`.
- Internal services can call each other via relative path + `XTransformPort` (Caddy routes).

## Reversal Cost
Medium — consolidating mini-services back into one process is a refactor, but the layer interfaces (Agent/Tool/Execution) stay stable.
