# Model Context Protocol (MCP)

**Category:** Protocols
**Status:** CORE
**Maturity:** Emerging (spec stable, ecosystem maturing rapidly)

## Definition
The **Model Context Protocol (MCP)** is an open JSON-RPC 2.0 based protocol introduced by Anthropic (Nov 2024) that standardizes how LLM applications (clients) connect to external data sources and tools (servers). It defines a uniform interface for exposing **Resources** (read-only data), **Tools** (executable functions), **Prompts** (parameterized templates), and (newer) **Sampling** (server-initiated LLM requests) and **Tasks** (long-running work). Transports: stdio (local subprocess), HTTP+SSE, and the newer Streamable HTTP transport.

## Problem Solved
Before MCP, every LLM app implemented bespoke integrations: OpenAI function-calling schema, Anthropic tool schema, LangChain adapters, custom HTTP wrappers — N×M integration explosion. MCP turns this into N+M: each tool/data source publishes one MCP server; each LLM app embeds one MCP client. It also decouples "what the model can reach" from "what model is being used" — swap GLM-5.2 for Claude or GPT without rewriting tool integrations.

## Why It Matters
For MiMo AI, MCP is the standard rail for the **Tool Layer (Layer 9)**. It lets us:
1. Reuse the growing catalog of community MCP servers (GitHub, Postgres, filesystem, Slack, linear, puppeteer, memory, etc.) instead of writing every adapter from scratch.
2. Expose MiMo AI's own tools (code execution sandbox, knowledge base search, browser, agent runtime) as an MCP server so external MCP-aware clients (Claude Desktop, Cursor, other agents) can drive MiMo.
3. Avoid vendor lock-in at the tool boundary, complementing the Model Gateway abstraction at the model boundary.

## How It Works
- **Client** (host LLM app, e.g. MiMo runtime) opens a connection to a **Server** (the tool/data provider).
- Handshake: `initialize` → negotiate protocol version, capabilities (resources/tools/prompts/sampling/logging), clientInfo/serverInfo.
- Server advertises capabilities; client subscribes via `notifications/listChanged`.
- **Resources**: `resources/list`, `resources/read` → returns text or blob (URIs like `file://`, `git://`, `postgres://`).
- **Tools**: `tools/list` (schema in JSON Schema), `tools/call` (returns content blocks: text, image, embedded resource).
- **Prompts**: `prompts/list`, `prompts/get` → returns messages ready to feed to the model.
- **Sampling** (server→client): server requests an LLM completion from the client — dangerous, must be permission-gated.
- **Roots**: client can declare filesystem roots the server may access.
- Authorization: OAuth 2.1 for HTTP transports (latest spec revision).

## Architecture
```
┌──────────────┐   JSON-RPC   ┌──────────────┐
│  MCP Client  │ ◀──────────▶ │  MCP Server  │
│  (MiMo Tool  │  (stdio /    │  (e.g. fs,   │
│   Registry)  │   HTTP+SSE)  │   GitHub)    │
└──────┬───────┘              └──────────────┘
       │ exposes tools/resources to model via MiMo Tool Layer
       ▼
   MiMo Reasoning/Agent Layer → Model Gateway → GLM-5.2
```
MiMo acts as **both client and server** (bidirectional):
- Client side: aggregates external MCP servers behind the Tool Registry, with permission gate, audit, sandbox.
- Server side: exposes MiMo's own capabilities (kb_search, browser_session, code_run, agent_run) to external MCP clients.

## Interfaces
- Transport: `stdio` (subprocess, local), `Streamable HTTP` (remote, recommended over deprecated HTTP+SSE).
- Message envelope: JSON-RPC 2.0 (`jsonrpc: "2.0"`, `id`, `method`, `params`/`result`/`error`).
- Tool schema: standard JSON Schema for parameters; result is array of content blocks.
- Server-side SDKs: TypeScript (`@modelcontextprotocol/sdk`), Python (`mcp`).
- Client-side: same SDKs; community routers include `mcp-router`, LlamaIndex MCP, LangChain MCP adapters.

## Dependencies
- A JSON-RPC capable runtime (Node/Bun/Deno/Python). MiMo already Node/TS — fits.
- For HTTP transport: a web server (Caddy already planned; can terminate TLS for remote MCP servers).
- Optional: OAuth 2.1 provider for authenticated remote servers.
- Optional: subprocess supervisor for stdio MCP servers (lifecycle, crash-restart).

## Strengths
- **Open spec, multi-vendor**: Anthropic, OpenAI, Microsoft, Z.ai and IDE vendors converging on it.
- **Strong decoupling**: tools live in their own processes; isolation is free.
- **Composability**: a client can attach to many servers simultaneously; the model sees a unified tool list.
- **Typed schemas**: JSON Schema params enable runtime validation before invocation.
- **Ecosystem**: 1000+ community servers exist (awesome-mcp-servers); major SaaS vendors shipping official servers.

## Weaknesses
- Spec still iterating (e.g. 2025-03 → 2025-06 revisions changed transports, removed `prompt`/`resource` template forms in some flows).
- **No built-in authz granularity per tool call** — left to the server implementer; risk of over-permissive servers.
- **No tool-output sandboxing by spec** — a malicious server can return content that triggers prompt injection in the client model. Mitigation is the client's responsibility.
- **No standard for cost/latency** reporting from server to client.
- Sampling direction (server→client) is a privilege escalation risk if a malicious server asks the client to summarize private context.
- Multi-server name collisions: tools with same name across servers require namespacing.
- Stateful servers complicate horizontal scaling.

## Failure Modes
- **Tool poisoning**: malicious MCP server returns tool descriptions or outputs that hijack the model (e.g. hidden instructions to read `~/.ssh/id_rsa`).
- **Server crash**: stdio subprocess dies → client must detect + restart + surface degraded capability to the agent.
- **Schema drift**: server changes tool schema; client cached old schema → call fails at runtime.
- **Hangs**: server doesn't respond; need timeouts per `tools/call`.
- **OAuth misconfiguration**: token scope too broad; server gets more than the agent needs.
- **Sampling abuse**: untrusted server repeatedly pings client for LLM completions → cost/abuse.

## Security Implications
- Treat **every external MCP server as untrusted code** with the same risk as a third-party npm package.
- Sandboxing at the process level (containers/seccomp/AppArmor for stdio servers; network egress controls for HTTP servers).
- **Allowlist** approach: only administrator-approved MCP servers may be registered; no auto-discovery of arbitrary servers.
- Per-tool-call **authorization gate** in MiMo Tool Layer (RBAC + ABAC) — see `security/permissions_rbac_abac.md`.
- Tool-output **content scanning & isolation** — see `security/prompt_injection_defense.md`; treat outputs like untrusted documents.
- Capability tokens: a server should be scoped (filesystem server only sees one subtree, etc.).
- Audit every `tools/call` (input, output, caller, server, latency, exit code).
- Disable `sampling` from servers by default; only allow for explicitly trusted servers.

## Performance Implications
- **stdio**: fast (no network), but server startup latency matters (Node MCP servers ~100-500ms cold start).
- **HTTP+SSE / Streamable HTTP**: adds RTT; coalesce `tools/list` caching; cache schemas with TTL + invalidation on `notifications/listChanged`.
- Tool-call latency dominated by the actual tool work, not the protocol (cheap JSON-RPC).
- Parallel tool calls: MCP supports concurrent JSON-RPC requests; client should batch independent calls.
- Token cost: large tool outputs (file dumps, search results) inflate context — client-side truncation/summarization mandatory.

## Operational Implications
- Need a **MCP Server Registry** table (Prisma) tracking: server_id, transport, command/URL, capabilities, version, owner, enabled, last_health_check, health_status.
- Need a **supervisor** that monitors stdio subprocesses and restarts them, surfacing crashes to the UI.
- Need **health-check** calls (the spec's `ping` method) on a cadence.
- Need a **catalog UI** to enable/disable servers, view tool list, test a tool call, view audit history.
- Need **version pinning** for MCP servers; auto-update is risky (schema/behavior drift → silent failures).

## Alternatives
- **OpenAI function-calling / Anthropic tool-use JSON schemas**: lower-level, no protocol — fine for in-process tools but no standardized data-source layer.
- **LangChain Tools / LlamaIndex Tools**: framework-specific adapters; lock you to that framework.
- **Custom HTTP microtools**: reinvents MCP poorly; loses ecosystem.
- **A2A protocol** (Google, 2025): agent-to-agent, complementary not competing — see `protocols/a2a.md`.

## Maturity & Production Readiness
- **Spec**: stable enough for production with care; revisions expected.
- **SDKs**: official TS + Python SDKs production-quality.
- **Community servers**: quality varies wildly; treat each as supply-chain risk (like any npm package).
- **Adopters**: Anthropic Claude Desktop/Apps, Cursor, Continue, Zed, Sourcegraph Cody, Replit — wide adoption across IDE/agent ecosystem.

## Relevant Research / Papers
- Anthropic, "Introducing the Model Context Protocol" (Nov 2024) — announcement + spec.
- MCP Specification (latest revision on modelcontextprotocol.io).
- "Tool Poisoning Attacks" writeups (Invariant Labs, 2025) — practical attacks on malicious MCP servers.
- OWASP "Top 10 for LLM Applications" (2025) — LLM06:2025 Sensitive Information Disclosure and LLM02:2025 Insecure Output Handling directly apply to MCP outputs.

## Official Documentation
- Spec: https://modelcontextprotocol.io/specification
- TS SDK: https://github.com/modelcontextprotocol/typescript-sdk
- Python SDK: https://github.com/modelcontextprotocol/python-sdk
- Servers registry: https://github.com/modelcontextprotocol/servers
- Awesome list: https://github.com/punkpeye/awesome-mcp-servers

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk which provides LLM/VLM/TTS/ASR/image-gen / backend only / socket.io / Caddy)
- **Backend-only**: MCP client + server run server-side. Browser must never directly speak MCP.
- Use official `@modelcontextprotocol/sdk` on Node; expose MiMo tools as MCP server via `Streamable HTTP` behind Caddy.
- Persist `McpServer`, `McpTool`, `McpToolCall` (audit) tables in Prisma/SQLite.
- Wrap every `tools/call` in: permission check → budget check → audit log → invoke → post-process output (sanitize/truncate) → return to model.
- The MiMo MCP server exposes: `kb_search`, `memory_recall`, `browser_session`, `code_run` (sandboxed), `agent_dispatch`. Each tool definition has JSON Schema + permission tag.
- Real-time UI: socket.io pushes `tool_call_starting`, `tool_call_finished` events to the console.
- For stdio servers, use a Node `child_process` supervisor with health checks; for HTTP servers, register under Caddy with auth.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Tool Layer (Layer 9)** as the external integration rail.
- Bidirectional: MiMo **consumes** external MCP servers (filesystem, GitHub, browser, Postgres, community servers); MiMo **exposes** its own runtime tools as an MCP server for external clients.
- Integrates with **Security Layer (Layer 15)** for permission gating, sandboxing, audit.
- Integrates with **Observability Layer (Layer 15)** for tracing each `tools/call` as a span.
- Critical for the "external integration" capability block without proliferating bespoke adapters.

## Recommended Usage
- ADOPT as the standard external tool/data integration protocol.
- Pin to a specific spec revision; track changelog before upgrading SDK.
- Allowlist model: only admin-curated servers may be registered; no auto-discovery.
- Default-deny for `sampling` capability from any untrusted server.
- Sandbox all stdio servers via container/seccomp; restrict network egress.
- One uniform audit + tracing wrapper around every `tools/call`.

## Decision
**ADOPT** — CORE for the Tool Layer. Bidirectional (client + server). Mandatory security wrapping (allowlist, sandbox, output sanitization, audit). Phase 2 should land an MCP client in the Tool Registry + a minimal MiMo MCP server exposing `kb_search`, `memory_recall`, `code_run_sandboxed`.

## Sources
- MCP Specification, modelcontextprotocol.io (canonical).
- Anthropic announcement blog (Nov 25, 2024).
- TS/Python SDK repositories (GitHub).
- Invariant Labs "Tool Poisoning" advisory (2025) — inferred risk pattern.
- OWASP Top 10 for LLM Applications 2025.
