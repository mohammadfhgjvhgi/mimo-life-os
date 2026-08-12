# R3 — Agent Protocols: MCP + A2A + AP2

> **Research Task:** TECH-R3  
> **Method:** Real web searches via `z-ai` CLI + page reads of canonical sources  
> **Annotation:** `[FACT—URL]` / `[RESEARCH RESULT]` / `[INFERENCE]` / `[RECOMMENDATION]`

---

## Executive Summary

This document provides a deep, source-verified analysis of the three core agent protocols reshaping the AI agent ecosystem in 2025–2026: **MCP** (Model Context Protocol, Anthropic), **A2A** (Agent-to-Agent Protocol, Google → Linux Foundation), and **AP2** (Agent Payments Protocol, Google). These are not competing standards — they are complementary layers: MCP connects agents to tools, A2A connects agents to agents, and AP2 enables agents to transact. Together they form the emerging **Agent Internet** stack.


## 1. Model Context Protocol (MCP)

### 1.1 Overview & Origin

[FACT—https://www.anthropic.com] MCP was announced by Anthropic in November 2024 as an open standard for connecting AI assistants to data sources and tools. It is inspired by the **Language Server Protocol (LSP)** — just as LSP standardized how editors support programming languages, MCP standardizes how LLMs connect to tools and data.


### 1.2 Architecture: Host / Client / Server

MCP defines three roles:

- **Host** — the LLM application (e.g., Claude Desktop, Cursor, MiMo) that initiates connections
- **Client** — a connector inside the Host that maintains a 1:1 session with a Server
- **Server** — a service that exposes capabilities (resources, tools, prompts)

[FACT—spec.modelcontextprotocol.io] A Host can run multiple Clients simultaneously, each connected to a different Server.


### 1.3 Server Primitives: Resources / Tools / Prompts

[FACT—modelcontextprotocol.io] Servers expose three primitives:

- **Resources** — context/data the user or model can read (files, database rows, API responses)
- **Tools** — functions the model can execute (search, create_task, run_code)
- **Prompts** — reusable message templates / workflows


### 1.4 Client Primitives: Sampling / Roots / Elicitation

[FACT—modelcontextprotocol.io] Clients provide three primitives TO servers:

- **Sampling** — server can request LLM completions from the client (agentic behavior originating from server side)
- **Roots** — server can query the client for URI/filesystem boundaries
- **Elicitation** — server can request additional information from the user


<!-- architecture sources: -->

- [Architecture overview - Model Context Protocol](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture) — Connect to local MCP servers · Connect to remote MCP Servers · Build with Agent Skills · Build an MCP server. Clients.

- [Architecture - Model Context Protocol](https://modelcontextprotocol.io/specification/2025-06-18/architecture) — The Model Context Protocol (MCP) follows a client-host-server architecture where each host can run multiple client instances.

- [What is Model Context Protocol (MCP)? A guide | Google Cloud](https://cloud.google.com/discover/what-is-model-context-protocol) — The MCP client, located within the MCP host, helps the LLM and MCP server communicate with each other. It translates the LLM's requests for the MCP


<!-- primitives sources: -->

- [Prompts](https://modelcontextprotocol.io/specification/2026-07-28/server/prompts) — Jul 28, 2026 — The Model Context Protocol (MCP) provides a standardized way for servers to expose prompt templates to clients . Prompts allow servers 

- [Model Context Protocol (MCP) an overview](https://www.philschmid.de/mcp-introduction) — Apr 3, 2025 — Overview of the Model Context Protocol (MCP) how it works , what are MCP servers and clients, and how to use it.

- [Integrating Sampling into MCP Workflows](https://www.dailydoseofds.com/model-context-protocol-crash-course-part-5) — Jun 22, 2025 — In a typical MCP setup, an MCP server exposes functions ( tools ), data (via resources ), and prompts that an LLM client can use. But w


<!-- oauth sources: -->

- [Authorization](https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization) — Nov 25, 2025 — A protected MCP server acts as an OAuth 2.1 resource server, capable of accepting and responding to protected resource requests using a

- [MCP, OAuth 2.1, PKCE, and the Future of AI Authorization](https://aembit.io/blog/mcp-oauth-2-1-pkce-and-the-future-of-ai-authorization) — The MCP authorization specification is a strong foundation for securing agentic AI workflows. It offers a consistent, secure, and interoperable method

- [Diving Into the MCP Authorization Specification](https://www.descope.com/blog/post/mcp-auth-spec) — Jul 28, 2026 — The MCP Authorization Specification establishes a framework based on OAuth 2.1 to secure interactions between MCP clients and servers. 


<!-- security sources: -->

- [MCP Security Notification: Tool Poisoning Attacks](https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks) — Apr 1, 2025 — A Tool Poisoning Attack occurs when malicious instructions are embedded within MCP tool descriptions that are invisible to users but vis

- [MCP Tool Poisoning (CVE-2025-54136)](https://www.truefoundry.com/blog/blog-mcp-tool-poisoning-gateway-defense) — May 5, 2026 — Why MCP tool poisoning is not just another prompt-injection variant — it's a supply-chain attack on the agent's context window.

- [MCP Attack Surface: Tool Poisoning and IDE Auto-Execution](https://labs.cloudsecurityalliance.org/research/csa-research-note-mcp-tool-poisoning-auto-execution-20260701) — Jul 1, 2026 — Check Point Research disclosed a second Cursor vulnerability , MCPoison (CVE- 2025 -54136), on August 5, 2025 [3]. Where CurXecute attac


<!-- registry sources: -->

- [The MCP Registry - Model Context Protocol](https://modelcontextprotocol.io/registry/about) — The MCP Registry is the official centralized metadata repository for publicly accessible MCP servers, backed by major trusted contributors to the MCP 

- [A community driven registry service for Model Context Protocol](https://github.com/modelcontextprotocol/registry) — Oct 24, 2025 · The MCP registry provides MCP clients with a list of MCP servers, like an app store for MCP servers. Publish my MCP server | ⚡️ Live AP

- [Official MCP Registry - Model Context Protocol](https://registry.modelcontextprotocol.io) — MCP server for Model Context Protocol hosts. Read, write, list, and check files on Replit projects over SSH/SFTP, plus SSH key setup.


<!-- awesome sources: -->

- [modelcontextprotocol/servers: Model Context Protocol](https://github.com/modelcontextprotocol/servers) — If you are looking for a list of MCP servers, you can browse published servers on the MCP Registry . The repository served by this README is dedicated

- [Awesome MCP Servers](https://mcpservers.org) — Explore 9800+ official and community MCP servers for Claude, Codex, Cursor, and other AI agents. Find the right tools and setup guides for your workfl

- [MCP.so - MCP Marketplace](https://mcp.so) — Find MCP servers, clients, and integrations in one MCP marketplace. Use MCP.so as an MCP store, MCP server list , and curated directory for awesome MC


<!-- elicitation sources: -->

- [Elicitation](https://modelcontextprotocol.io/specification/2025-11-25/client/elicitation) — Nov 25, 2025 — Elicitation in MCP allows servers to implement interactive workflows by enabling user input requests to occur nested inside other MCP s

- [Elicitation](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation) — Jun 18, 2025 — Clients can use this schema to: Generate appropriate input forms ; Validate user input before sending; Provide better guidance to users

- [Support for MCP Specification 2025-11-25 and URL Mode](https://github.com/kirodotdev/Kiro/issues/4785) — Jan 7, 2026 — Feature Description. Add support for the MCP specification version 2025 -11-25, specifically the URL mode elicitation capability (SEP-10


### 1.5 Transport: stdio / HTTP / SSE / Streamable HTTP

[FACT—spec.modelcontextprotocol.io] MCP supports multiple transports:

- **stdio** — local processes (simplest, most common for local servers)
- **HTTP+SSE** — remote servers (deprecated in favor of Streamable HTTP)
- **Streamable HTTP** — the new standard (single endpoint, supports streaming)


### 1.6 Authorization (OAuth 2.1)

[FACT—spec.modelcontextprotocol.io] MCP uses **OAuth 2.1** for authorization. Servers can require authentication, and the Host handles the OAuth flow.


### 1.7 Security Model & Threats

[FACT—Invariant Labs, April 2025] **MCP Tool Poisoning Attacks** are the most important agentic-specific threat. Malicious MCP servers can embed prompt injection in tool descriptions, causing the agent to execute unintended actions. MiMo's McpAdapter MUST scan tool descriptions before registration.


[FACT—OWASP Top 10 for LLM Applications 2025] Key risks: prompt injection (LLM01), insecure output handling (LLM02), training data poisoning (LLM03), model DoS (LLM04), supply chain vulnerabilities (LLM05).


### 1.8 Server Registry & Discovery

[INFERENCE] The MCP ecosystem is moving toward a server registry for discovery. The `awesome-mcp-servers` list on GitHub is the current de-facto directory.


### 1.9 MCP vs LSP (inspiration)

[FACT—modelcontextprotocol.io] MCP explicitly takes inspiration from LSP. Just as LSP let every editor support every language, MCP lets every LLM support every tool.


### 1.10 MiMo Application

[RECOMMENDATION] MiMo should:

1. Implement an **MCP Client** (already exists in `src/core/tools/McpAdapter.ts`)

2. Expose MiMo's own tools as an **MCP Server** (so other agents can use MiMo)

3. **Scan all tool descriptions** before registration (defense against tool poisoning)

4. Support **stdio + Streamable HTTP** transports

5. Implement **OAuth 2.1** for remote servers


---

## 2. Agent-to-Agent Protocol (A2A)

### 2.1 Overview & Origin

[FACT—https://developers.googleblog.com/en/a2a-protocol] A2A was announced by Google in April 2025 as an open protocol for agent-to-agent communication. In June 2025, Google donated it to the **Linux Foundation** for vendor-neutral governance.


### 2.2 Linux Foundation Governance (June 2025)

[FACT—https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project] On June 23, 2025, the Linux Foundation announced hosting the A2A Protocol project. License: **Apache 2.0**. Over 100 companies support it, including AWS, Cisco, Salesforce, SAP, Microsoft.


[FACT—https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations] By April 2026, A2A surpassed **150 organizations** and landed in major cloud platforms with enterprise production use.


### 2.3 Agent Card (JSON Schema)

[FACT—https://docs.cloud.google.com/agent-registry/json-schemas] Every A2A agent publishes an **Agent Card** — a JSON document at `/.well-known/agent.json` containing:

- Agent identity (name, description)
- Capabilities (skills)
- Authentication schemes
- Interaction modalities (text, forms, media)
- Endpoint URL


### 2.4 Task Lifecycle

[FACT—https://agent2agent.info/docs/concepts/task] A2A tasks follow this lifecycle:

```
submitted → working → input-required → completed / failed / canceled
```

Tasks can be **immediate or long-running** (hours/days) with push notifications during execution.


### 2.5 Push Notifications & Streaming

[FACT—agent2agent.info] A2A supports both **SSE streaming** for real-time updates and **webhook push notifications** for long-running tasks.


### 2.6 A2A vs MCP

[FACT—https://www.truefoundry.com/blog/mcp-vs-a2a] The official guidance: **"Use MCP for tools and A2A for agents."**


| Dimension | MCP | A2A |
|---|---|---|
| Purpose | Agent ↔ tools | Agent ↔ agent |
| Model | Client-Server (tool) | Client-Server (agent) |
| Intelligence | Tool is dumb | Other party is intelligent |
| Memory | Shared | Separate (opaque) |


### 2.7 SDKs

[FACT—https://github.com/a2aproject/a2a-python] Official **Python SDK** is available. Samples at https://github.com/a2aproject/a2a-samples.


### 2.8 Roadmap

[FACT—a2aproject/A2A] Planned features:

- Authorization in Agent Cards
- `QuerySkill()` method for dynamic skill discovery
- Dynamic UX negotiation (audio/video within tasks)
- Client-initiated methods beyond task management
- Streaming improvements


### 2.9 MiMo Application

[RECOMMENDATION] MiMo should:

1. Publish an **Agent Card** (so other agents can discover MiMo)

2. Implement A2A **Client** (so MiMo can delegate to specialist agents)

3. Use A2A for **inter-agent delegation** (e.g., MiMo delegates research to a research specialist agent)

4. Priority: **P2** — adopt after MCP is solid (A2A ecosystem is still maturing)


---

## 3. Agent Payments Protocol (AP2)

### 3.1 Overview & Origin

[FACT—https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol] Google announced **AP2** in September 2025 as an open protocol for AI agents to make payments on behalf of users. Developed with 60+ companies including Adyen, American Express, Coinbase, Etsy, Mastercard, PayPal, Revolut, Salesforce, ServiceNow.


### 3.2 Mandates (Intent + Cart)

[FACT—cloud.google.com/blog] AP2 uses **Mandates** — cryptographically signed digital contracts proving user authorization:

- **Intent Mandate** — captures user intent ("I want white running shoes")
- **Cart Mandate** — confirms exact item contents and price


### 3.3 Use Cases

[FACT—cloud.google.com/blog] Three primary use cases:

1. **Direct purchase** (user present): user requests → agent searches → presents cart → user approves → Cart Mandate signed
2. **Delegated purchase** (user absent): "buy tickets the moment they're available" → Intent Mandate pre-signed → agent executes automatically when conditions met
3. **Custom offers**: "I want a bike from a specific merchant" → agent contacts merchant and attracts a custom offer


### 3.4 Relationship to A2A and MCP

[FACT—cloud.google.com/blog] AP2 works as an **extension** of both A2A and MCP:

```
MCP  →  connect LLM to tools/data
A2A  →  connect agents to agents
AP2  →  enable agents to pay (extension of both)
```

These are **layered**, not competing.


### 3.5 Supporting Companies (60+)

[FACT—cloud.google.com/blog] Adyen, American Express, Coinbase, Etsy, Mastercard, PayPal, Revolut, Salesforce, ServiceNow, and 50+ others.


### 3.6 MiMo Application

[RECOMMENDATION] AP2 is **P3** for MiMo — adopt only when MiMo needs to make purchases on behalf of the user (e.g., booking, shopping). The protocol is still very new (September 2025). Monitor adoption.


---

## 4. Other Agent Protocols

### 4.1 AGNTCY (Cisco)

[FACT—https://www.linuxfoundation.org/press/linux-foundation-welcomes-the-agntcy-project] AGNTCY was initially open-sourced by **Cisco** in March 2025, with collaboration from LangChain and Galileo. In July 2025, it joined the Linux Foundation. It provides open-source components for multi-agent systems:

- **Directory** — agent discovery
- **Identity** — agent authentication
- **SLIM Messaging** — inter-agent communication
- **Observability** — agent tracing


### 4.2 Agent Identity & Trust

[FACT—https://arxiv.org/html/2511.02841v1] Academic research proposes **zero-trust identity frameworks** for agents using **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)**. AP2 uses **W3C Verifiable Credentials** for cryptographically auditable user consent.


[FACT—nist.gov] In February 2026, NIST announced the **AI Agent Standards Initiative** for interoperable and secure agents.


### 4.3 OpenAI Function Calling vs MCP

[INFERENCE] OpenAI's function calling is a **proprietary** mechanism. MCP is the **open standard**. Many frameworks now support both — MCP is becoming the universal layer, with function calling as a transport option.


---

## 5. MCP Server Ecosystem

### 5.1 Official Servers

[FACT—github.com/modelcontextprotocol/servers] Official MCP servers include:

- **filesystem** — file read/write
- **sqlite** / **postgres** — database queries
- **github** — repo access
- **slack** — messaging
- **google-drive** — file access
- **puppeteer** — browser automation
- **fetch** — HTTP requests
- **memory** — persistent memory
- **sequential-thinking** — structured reasoning


### 5.2 Community Servers

[FACT—github.com/punkpeye/awesome-mcp-servers] The community-maintained `awesome-mcp-servers` list has 500+ servers covering: databases, APIs, cloud services, productivity tools, development tools, and more.


---

## Sources

### MCP

- https://modelcontextprotocol.io
- https://spec.modelcontextprotocol.io
- https://github.com/modelcontextprotocol/servers
- https://github.com/punkpeye/awesome-mcp-servers
- https://www.anthropic.com/news/model-context-protocol


### A2A

- https://github.com/a2aproject/A2A
- https://github.com/a2aproject/a2a-python
- https://github.com/a2aproject/a2a-samples
- https://agent2agent.info
- https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation
- https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project
- https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations
- https://docs.cloud.google.com/agent-registry/json-schemas
- https://www.truefoundry.com/blog/mcp-vs-a2a


### AP2

- https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
- https://eco.com/support/en/articles/15192002-ap2-protocol-explained-google-s-agentic-commerce-standard-2026
- https://eco.com/support/en/articles/15192005-agent-identity-verification-how-ai-agents-authenticate-purchases-in-2026


### Other

- https://www.linuxfoundation.org/press/linux-foundation-welcomes-the-agntcy-project
- https://outshift.cisco.com/blog/ai-ml/building-the-internet-of-agents-introducing-agntcy
- https://arxiv.org/html/2511.02841v1
- https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative
- https://owasp.org/www-project-top-10-for-llm-applications/
