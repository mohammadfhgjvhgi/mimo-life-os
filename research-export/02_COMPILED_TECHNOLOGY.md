# PART 1 — AI Technology Research

> **Compiled from:** 7 research files (4,979 lines, 500+ verified URLs)
> **Date:** 9 August 2026
> **Scope:** Every AI technology, architecture, and protocol relevant to building a personal AI system / agentic OS
> **Sources:** Verified via `z-ai` CLI web_search + page_reader against canonical primary sources (official docs, arXiv papers, vendor blogs)

---

## Encyclopedia Overview

This encyclopedia aggregates findings from six specialized research files plus a base capability map. It covers **38+ technology layers** and **200+ capabilities**, each with maturity rating (Production / Mature / Emerging / Research / Experimental) and priority (P0 / P1 / P2 / P3).

The 2026 AI landscape is defined by six macro-trends:

1. **Protocols matured** — MCP (Anthropic) + A2A (Google → Linux Foundation) + AP2 (Google) form a unified layer: tools + agents + payments.
2. **Context Engineering** replaced Prompt Engineering as the primary discipline (4 pillars: write / select / compress / isolate).
3. **Durable Execution** crossed the chasm into early-majority (LangGraph + Temporal + Inngest + Restate + DBOS).
4. **Self-Improvement** is proven — agents can improve substantially without retraining (Reflexion: 91% vs GPT-4's 80% on HumanEval).
5. **Agent Economics** is a real challenge — agents consume 5–30× more tokens than chatbots (Gartner March 2026); agentic coding tasks consume ~1000× more (Stanford, May 2026).
6. **Open-source ecosystem** matured for every layer — Mem0 (memory), LangGraph (agents), Ollama (local), browser-use (browser), Langfuse (observability).

---

## 1. Cognitive Architecture

### 1.1 Reasoning Patterns

| Capability | Description | Maturity | Priority |
|---|---|---|---|
| **Chain-of-Thought (CoT)** | Step-by-step reasoning before answering | Production | P0 |
| **Tree-of-Thought (ToT)** | Explores multiple reasoning paths in a tree | Mature | P1 |
| **Self-Consistency** | Generates multiple answers, selects the best | Mature | P1 |
| **ReAct (Reason + Act)** | Alternating thought and action with tool calls | Production | P0 |
| **Reflexion** | Verbal self-reflection after failure (episodic memory buffer) | Mature | P1 |
| **Plan-and-Solve** | Plan first, then execute | Mature | P0 |
| **LATS (Language Agent Tree Search)** | Tree search with evaluation | Emerging | P2 |
| **Self-Refine** | Iterative intra-turn refinement with self-feedback | Mature | P1 |
| **ExpeL** | Experiential learning — extracts reusable insights from trajectories | Emerging | P2 |
| **DSPy / MIPROv2** | Programmatic prompt engineering with automatic optimization | Mature | P1 |
| **Structured Reasoning** | Reasoning with explicit JSON/XML structures | Production | P0 |
| **Adaptive Reasoning** | Switch reasoning strategy based on task | Emerging | P1 |
| **Inference-Time Compute** | Spend more time thinking on hard problems | Emerging | P1 |
| **Hypothesis Generation + Testing** | Generate hypotheses and test them | Emerging | P1 |
| **Uncertainty/Confidence Estimation** | Quantify certainty per answer part | Emerging | P1 |

### 1.2 Planning & Synthesis Architecture

| Concept | Description |
|---|---|
| **Hierarchical Task Network (HTN)** | Decompose tasks into hierarchical subtasks |
| **Goal Decomposition** | Break goals into sub-goals ("do research on X" → 5 steps) |
| **Constraint Propagation** | Propagate constraints to narrow options ("no Python" → filter) |
| **World Model** | Internal model of world state (user context) |
| **Hypothesis Generation + Testing** | Generate hypotheses, test multiple solutions |
| **Uncertainty Estimation** | Estimate certainty ("I'm 70% sure") |

### 1.3 Self-Verification Pipeline

```
Request → Reason → Answer → Verify → (yes: emit | no: re-reason)
```

**Techniques:**
- **Self-Refine:** Model critiques and rewrites its own answer
- **Verification Chain:** Multi-stage verification chain
- **Confidence Scoring:** Confidence score per answer part
- **Contradiction Detection:** Detect internal contradictions

### Key Papers
- **ReAct** (2022) — alternating thought and action
- **Reflexion** (NeurIPS 2023, arXiv:2303.11366) — verbal RL via episodic reflection; 91% pass@1 on HumanEval vs GPT-4's 80%, no fine-tuning
- **Tree of Thoughts** (2023) — exploring multiple reasoning paths
- **Self-Refine** (NeurIPS 2023, arXiv:2303.17651) — iterative self-feedback
- **ExpeL** (AAAI 2024, arXiv:2308.10144) — experiential learners

---

## 2. Memory Architecture

### 2.1 Memory Types

| Type | Description | Technology | Priority |
|---|---|---|---|
| **Episodic Memory** | Event memories ("Thursday I did X") | Event store + embedding | P0 |
| **Semantic Memory** | General knowledge ("The capital is…") | Knowledge graph + vector | P0 |
| **Procedural Memory** | Procedural knowledge ("how to do X") | Skills repository | P0 |
| **Working Memory** | Current conversation context | Context window | P0 |
| **Short-Term Memory** | Last 24 hours | Recent conversation buffer | P0 |
| **Long-Term Memory** | All past | Vector DB + Graph DB | P0 |
| **Autobiographical Memory** | User's life story | Structured profile | P1 |
| **Temporal Memory** | Time-bound information | Timestamped entries | P1 |
| **Relationship Memory** | Entity relationships | Knowledge graph | P1 |
| **Preference Memory** | User preferences | Key-value store | P0 |
| **Behavioral Memory** | User behavior patterns | Pattern detection | P1 |
| **Failure Memory** | Past errors and lessons | Failure archive | P1 |

### 2.2 Memory Management Mechanisms

| Mechanism | Description | Importance |
|---|---|---|
| **Memory Consolidation** | Short-term → long-term transfer | P0 — prevents overflow |
| **Memory Compression** | Compress old memories | P1 — preserves budget |
| **Memory Decay** | Decrease importance of distant memories | P2 — mimics human memory |
| **Memory Reinforcement** | Strengthen recurring memories | P1 |
| **Memory Conflict Resolution** | Resolve contradictions | P1 ("now X" replaces "was X") |
| **Memory Provenance** | Track source of each memory | P1 |
| **Memory Confidence** | Confidence score per memory | P2 ("90% sure") |
| **Memory Versioning** | Multiple memory versions | P2 |
| **Memory Retrieval** | Smart memory retrieval | P0 — most important operation |

### 2.3 Open-Source Memory Frameworks (Verified 2026)

| Project | GitHub | Stars | Key Feature | Priority |
|---|---|---|---|---|
| **Mem0** | github.com/mem0ai/mem0 | ~25K | Embedding + filtering, production-ready | P0 |
| **Letta (MemGPT)** | github.com/letta-ai/letta | ~15K | 4-layer hierarchical memory | P1 |
| **Zep / Graphiti** | github.com/getzep/graphiti | — | Temporal knowledge graph memory | P1 |
| **Cognee** | github.com/topoteretes/cognee | ~4K | Self-hosted knowledge graph memory | P2 |
| **LangMem** | (LangChain ecosystem) | ~1.5K | Hot path + cold path memory | P2 |
| **A-MEM** | github.com/WujiangXu/A-mem | — | NeurIPS 2025 — agentic memory (cited 943×) | P1 |

### 2.4 Letta's 4-Layer Memory Model

| Layer | What it stores | Where | Editable by agent? |
|---|---|---|---|
| **Message buffer** | Most recent messages in the perpetual thread | In-context | No (append-only) |
| **Core memory** | In-context blocks: user prefs, persona, current task | In-context, pinned | Yes (via tool calls) |
| **Recall memory** | Full conversational history | On disk (searchable) | No |
| **Archival memory** | Processed, indexed knowledge | External vector / graph DB | Yes (via tools) |

**Key Letta insight:** agent memory is fundamentally context engineering — what your agent "remembers" is what's in its context window; everything else is retrieval infrastructure.

### 2.5 Dual-Stream Memory Pattern (ChatGPT April 2025)

OpenAI's ChatGPT memory works in two ways simultaneously:
1. **Saved memories** — facts you've explicitly asked it to remember
2. **Chat history** — insights gathered from past chats

Users can toggle each independently in Settings; **Temporary Chat** bypasses both. June 2025 update added free-user support with a "lightweight" short-term continuity variant; Plus/Pro users get longer-term personalization.

### 2.6 Proposed Memory Architecture

```
┌─────────────────────────────────────────┐
│              Working Memory              │
│         (Context Window — immediate)     │
├─────────────────────────────────────────┤
│           Short-Term Memory              │
│      (Buffer — last 24 hours)            │
├──────────────────┬──────────────────────┤
│  Episodic Store  │   Semantic Store     │
│  (Vector DB)     │   (Knowledge Graph)  │
├──────────────────┴──────────────────────┤
│          Long-Term Memory                │
│    (Consolidated + Compressed)           │
├─────────────────────────────────────────┤
│       Procedural Memory                  │
│       (Skills + Workflows)               │
└─────────────────────────────────────────┘
```

### 2.7 5-Right User-Memory Contract

- **Right to know** — every memory is auditable
- **Right to edit** — every memory is mutable
- **Right to forget** — soft + hard delete with retention timers
- **Right to compartmentalize** — per-project memory, per-temporary-session memory
- **Right to explanation** — every memory-cited response links to the source memory

The line between *personalization* and *surveillance* is **user-controllability**, not data volume.

---

## 3. Knowledge Architecture

### 3.1 Knowledge Graph Concepts

| Concept | Description | Priority |
|---|---|---|
| **Knowledge Graph (KG)** | Network of entities and relations | P0 |
| **GraphRAG** | Microsoft — extract KG from text then RAG over it | P0 |
| **LightRAG** | HKUDS — simple, fast GraphRAG alternative | P1 |
| **nano-graphrag** | Minimal GraphRAG (~1100 LOC) | P2 |
| **Temporal KG** | KG with temporal dimension | P1 |
| **Personal KG** | User-specific KG | P0 |
| **Entity Resolution** | Link similar entities ("Mohammed" = "M.Al-Rajbi") | P1 |
| **Entity Linking** | Link to external knowledge base | P2 |
| **Ontology** | Organized knowledge classification | P1 |
| **Contradiction Detection** | Detect contradictions in knowledge | P1 |
| **Knowledge Validation** | Verify knowledge correctness | P1 |
| **Provenance Tracking** | Track source of each fact | P1 |

### 3.2 GraphRAG (Microsoft Research)

**Pipeline:**
1. **Split text** into TextUnits
2. **Extract** all entities, relationships, claims
3. **Build** Knowledge Graph
4. **Cluster** entities into communities using Leiden algorithm
5. **Generate** community summaries bottom-up
6. **Query modes:**
   - **Global Search** — broad questions about the corpus
   - **Local Search** — questions about a specific entity
   - **DRIFT Search** — search with community context
   - **Basic Search** — standard RAG

**GitHub:** github.com/microsoft/graphrag — 29,800+ stars by December 2024

### 3.3 Personal Knowledge Graph Architecture

```
User speaks/acts
       ↓
Entity Extraction (LLM)
       ↓
┌──────────────────────────┐
│   Personal Knowledge     │
│   Graph                  │
│                          │
│  User ──── studies ──→ University
│    │                       │
│    ├── works on ──→ Project X
│    │                       │
│    ├── knows ────→ Python
│    │                       │
│    └── lives in ──→ City
└──────────────────────────┘
       ↓
GraphRAG Queries
       ↓
AI responds with full knowledge context
```

### 3.4 Knowledge Graphs as Digital Twin Substrate

Without a KG, a digital twin is just a replay log. With a KG, the twin can answer **counterfactuals** ("what would I likely do if X happened?"). The personal world model is then a query-time function: given current state S and proposed action A, retrieve the most relevant subgraph and ask the LLM "is A consistent with the user's past behavior on similar subgraphs?"

**References:**
- ICML 2025 — *On the Effectiveness of LLMs as Personal World Models* (Richens et al.)
- Quantiphi — *Unlocking Digital Twins with Agentic AI*
- Tredence — *Knowledge Graphs in AI Agent*

---

## 4. Agent Architecture

### 4.1 Agent Patterns

| Pattern | Description | Maturity | Priority |
|---|---|---|---|
| **Single Agent** | One agent does everything | Production | P0 |
| **ReAct Agent** | Think → act → observe | Production | P0 |
| **Multi-Agent** | Multiple specialized agents | Mature | P1 |
| **Hierarchical Agents** | Manager + workers | Mature | P1 |
| **Supervisor Agent** | Agent manages other agents | Production | P1 |
| **Planner-Executor** | One plans, another executes | Mature | P1 |
| **Critic / Verifier** | Agent reviews other agents' work | Emerging | P1 |
| **Swarm** | Agents without a manager | Experimental | P3 |
| **Dynamic Agent Creation** | Create agents as needed | Emerging | P2 |
| **Agent Handoff** | Transfer task between agents | Production | P1 |
| **Debate Pattern** | Agents debate to reach decision | Experimental | P3 |

### 4.2 Agent Framework Comparison (Verified 2026)

| Framework | Company | Language | Strength | Weakness | Stars |
|---|---|---|---|---|---|
| **LangGraph** | LangChain | Python/JS | Stateful workflows, durable execution | Complexity | ~39–50K |
| **DeepAgents** | LangChain | Python/JS | Subagents + file memory + planning | Relatively new | — |
| **OpenAI Agents SDK** | OpenAI | Python | Simple, handoffs, guardrails, provider-agnostic | OpenAI-tied | — |
| **Claude Agent SDK** | Anthropic | Python/TS | Computer use, safety | Claude-tied | — |
| **Google ADK** | Google | Python | Gemini ecosystem integration | Google-tied | — |
| **Pydantic AI** | Independent | Python | Type safety, validation | No heavy orchestration | ~95K |
| **CrewAI** | CrewAI | Python | Role-based teams, easy | Limited complexity | ~25–54K |
| **Strands Agents** | AWS | Python | AWS integration | AWS-tied | — |
| **Mastra** | Independent | TypeScript | Best TS option | Smaller community | — |
| **Vercel AI SDK** | Vercel | TypeScript | Next.js integration | Limited tools | — |
| **Smolagents** | HuggingFace | Python | Simple, ~1000 LOC | Limited | ~26K |

### 4.3 Agent Skills System

```
Skill Discovery → Skill Learning → Skill Storage → Skill Testing
       ↓                                              ↓
  From repeated                                  Skill Refinement
  behavior                                              ↓
                                                 Skill Composition
                                                        ↓
                                                 Skill Selection
                                                 (when to use?)
```

| Concept | Description |
|---|---|
| **Skill Discovery** | AI discovers a behavior recurs → saves it as a skill |
| **Skill Library** | Reusable skill repository |
| **Skill Composition** | Compose simple skills into complex ones |
| **Skill Selection** | Choose the right skill per task |
| **Skill Refinement** | Improve skill based on outcomes |
| **Skill Metadata** | Per skill: description, inputs, outputs, when-to-use |

### 4.4 Skill Format (Voyager-inspired)

```
(name, natural-language description, DSPy Module, metric, version, success_rate, last_used_at)
```

Skill retrieval at inference time uses embedding similarity over the description + name. Skill execution failure triggers a Reflexion step whose reflection is appended to the skill's "failure notes" field. This is a concrete synthesis of Voyager + Reflexion + DSPy.

---

## 5. Agent Skills System

(See §4.3–4.4 above for full treatment. Skills = procedural memory.)

**Skill Acquisition Lineage (Voyager → present):**
- **Automatic curriculum** — agent proposes its next exploration goal based on what it hasn't mastered yet
- **Skill library** — each successful execution stored as a reusable code function with NL description
- **Iterative prompting** — when execution fails, the prompt is refined with the error message (Reflexion-style loop specialized for code)

**Sources:**
- Voyager (Wang et al. 2023, arXiv:2305.16291) — github.com/minedojo/voyager
- Beancount 2026 retrospective — Voyager's lasting contribution is procedural-memory-as-code
- Skywork AI 2025 extension — applies the same pattern to general-purpose agent skill acquisition

---

## 6. Tool Architecture

### 6.1 Tool Categories

| Category | Tools | Priority |
|---|---|---|
| **Core Tools** | Web search, file read/write, code execution, calculator | P0 |
| **Communication Tools** | Email, messaging, notifications | P1 |
| **Browser Tools** | Navigate, click, type, screenshot, extract | P0 |
| **File System Tools** | Read, write, list, search, move, delete | P0 |
| **Code Tools** | Execute, lint, format, test, debug | P0 |
| **API Tools** | HTTP calls, OAuth, webhooks | P1 |
| **Database Tools** | Query, insert, migrate | P1 |
| **Media Tools** | Image generation, audio processing, PDF creation | P2 |
| **Calendar/Time Tools** | Schedule, remind, time zone | P1 |
| **Custom Tools** | User-defined functions | P1 |

### 6.2 Tool Safety Architecture

```
Tool Call Request
       ↓
Permission Check → Allowed? → Execute → Verify Result
       ↓ No                    ↓ Error
   Ask User               Retry / Fallback
   (HITL)
```

| Feature | Description | Maturity | Priority |
|---|---|---|---|
| **Tool Permissions** | Each tool has a permission level | Production | P0 |
| **Sandboxing** | Isolated execution for dangerous tools | Production | P0 |
| **Dry Run** | Simulate without real execution | Mature | P1 |
| **Rollback** | Ability to undo | Mature | P1 |
| **Idempotency** | Same operation = same result | Mature | P1 |
| **Timeout** | Time limit per tool | Production | P0 |
| **Rate Limiting** | Usage cap | Production | P0 |
| **Approval Workflow** | Request approval for dangerous operations | Mature | P1 |
| **Tool Composition** | Compose tools | Emerging | P1 |
| **Tool Chaining** | Chain tools | Mature | P1 |
| **Tool Verification** | Verify tool integrity | Emerging | P1 |

### 6.3 Capability → Domain → Skill → Tool Hierarchy

The proposed hierarchy: Capability (broad) → Domain (specific area) → Skill (reusable pattern) → Tool (concrete function). All wrapped with `ToolPolicy` + Sandboxing + Approval gates.

---

## 7. Protocols

### 7.1 MCP (Model Context Protocol)

**Origin:** Announced by Anthropic in November 2024 as an open standard for connecting AI assistants to data sources and tools. Inspired by the **Language Server Protocol (LSP)** — just as LSP standardized how editors support programming languages, MCP standardizes how LLMs connect to tools and data.

#### Architecture: Host / Client / Server

- **Host** — the LLM application (Claude Desktop, Cursor, a personal AI system) that initiates connections
- **Client** — a connector inside the Host that maintains a 1:1 session with a Server
- **Server** — a service that exposes capabilities (resources, tools, prompts)

A Host can run multiple Clients simultaneously, each connected to a different Server.

#### Server Primitives (3)

- **Resources** — context/data the user or model can read (files, DB rows, API responses)
- **Tools** — functions the model can execute (search, create_task, run_code)
- **Prompts** — reusable message templates / workflows

#### Client Primitives (3)

- **Sampling** — server can request LLM completions from the client (agentic behavior originating from server side)
- **Roots** — server can query the client for URI/filesystem boundaries
- **Elicitation** — server can request additional information from the user

#### Transport

- **stdio** — local processes (simplest, most common for local servers)
- **HTTP+SSE** — remote servers (deprecated in favor of Streamable HTTP)
- **Streamable HTTP** — the new standard (single endpoint, supports streaming)

#### Authorization: OAuth 2.1

A protected MCP server acts as an OAuth 2.1 resource server. PKCE required. The Host handles the OAuth flow.

#### Security Model & Threats

**MCP Tool Poisoning Attacks** (Invariant Labs, April 2025) — the most important new agentic-specific threat. Malicious MCP servers can embed prompt injection in tool descriptions, causing the agent to execute unintended actions.

Demonstrated attack: an `add(a, b, sidenote)` MCP tool whose docstring contains hidden `<IMPORTANT>` instructions telling the LLM to read `~/.cursor/mcp.json` and `~/.ssh/id_rsa` and pass their contents as the `sidenote` parameter. The LLM complies, exfiltrating both MCP config credentials and SSH private keys, while the UI shows only a benign "adding two numbers" interaction.

- **CVE-2025-54136** (MCPoison) — disclosed August 5, 2025 by Check Point Research
- CyberArk (May 2025): "Poison everywhere — No output from your MCP server is safe"
- Adversa.ai: "MCP Security: Top 25 MCP Vulnerabilities"
- arXiv:2508.12538 — *Systematic Analysis of MCP Security*

**Defense:**
1. Tool description audit (use Invariant's MCP-Scan)
2. User-visible description (full description shown in Settings before enabling)
3. Sandboxed execution (no filesystem access outside allow-list)
4. Output validation against declared schemas
5. No credential inheritance (capability tokens only)

#### Server Registry & Discovery

- **MCP Registry** — official centralized metadata repository
- **Awesome MCP Servers** — community directory (9800+ servers)
- **MCP.so** — marketplace
- **awesome-mcp-servers** (GitHub) — 500+ servers

#### Official Servers

filesystem, sqlite, postgres, github, slack, google-drive, puppeteer, fetch, memory, sequential-thinking

#### MCP vs LSP

MCP explicitly takes inspiration from LSP. Just as LSP let every editor support every language, MCP lets every LLM support every tool.

**Source URLs:**
- https://modelcontextprotocol.io
- https://spec.modelcontextprotocol.io
- https://github.com/modelcontextprotocol/servers
- https://github.com/punkpeye/awesome-mcp-servers
- https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
- https://www.truefoundry.com/blog/blog-mcp-tool-poisoning-gateway-defense

### 7.2 A2A (Agent-to-Agent Protocol)

**Origin:** Announced by Google in April 2025 as an open protocol for agent-to-agent communication.

#### Linux Foundation Governance (June 2025)

On June 23, 2025, the Linux Foundation announced hosting the A2A Protocol project. License: **Apache 2.0**. Over 100 companies support it initially (AWS, Cisco, Salesforce, SAP, Microsoft). By April 2026, A2A surpassed **150 organizations** with enterprise production use.

#### Agent Card (JSON Schema)

Every A2A agent publishes an **Agent Card** — a JSON document at `/.well-known/agent.json` containing:
- Agent identity (name, description)
- Capabilities (skills)
- Authentication schemes
- Interaction modalities (text, forms, media)
- Endpoint URL

#### Task Lifecycle

```
submitted → working → input-required → completed / failed / canceled
```

Tasks can be **immediate or long-running** (hours/days) with push notifications during execution.

#### Push Notifications & Streaming

A2A supports both **SSE streaming** for real-time updates and **webhook push notifications** for long-running tasks.

#### A2A vs MCP

Official guidance: **"Use MCP for tools and A2A for agents."**

| Dimension | MCP | A2A |
|---|---|---|
| Purpose | Agent ↔ tools | Agent ↔ agent |
| Model | Client-Server (tool) | Client-Server (agent) |
| Intelligence | Tool is dumb | Other party is intelligent |
| Memory | Shared | Separate (opaque) |

#### SDKs

- Official **Python SDK** — github.com/a2aproject/a2a-python
- Samples — github.com/a2aproject/a2a-samples

#### Roadmap

- Authorization in Agent Cards
- `QuerySkill()` method for dynamic skill discovery
- Dynamic UX negotiation (audio/video within tasks)
- Client-initiated methods beyond task management
- Streaming improvements

**Source URLs:**
- https://github.com/a2aproject/A2A
- https://github.com/a2aproject/a2a-python
- https://agent2agent.info
- https://developers.googleblog.com/en/google-cloud-donates-a2a-to-linux-foundation
- https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project
- https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations

### 7.3 AP2 (Agent Payments Protocol)

**Origin:** Google announced AP2 in September 2025 as an open protocol for AI agents to make payments on behalf of users. Developed with **60+ companies** including Adyen, American Express, Coinbase, Etsy, Mastercard, PayPal, Revolut, Salesforce, ServiceNow.

#### Mandates (Intent + Cart)

AP2 uses **Mandates** — cryptographically signed digital contracts proving user authorization:

- **Intent Mandate** — captures user intent ("I want white running shoes")
- **Cart Mandate** — confirms exact item contents and price

AP2 uses **W3C Verifiable Credentials** for cryptographically auditable user consent.

#### Use Cases (3)

1. **Direct purchase** (user present): user requests → agent searches → presents cart → user approves → Cart Mandate signed
2. **Delegated purchase** (user absent): "buy tickets the moment they're available" → Intent Mandate pre-signed → agent executes automatically when conditions met
3. **Custom offers**: "I want a bike from a specific merchant" → agent contacts merchant and attracts a custom offer

#### Relationship to A2A and MCP

```
MCP  →  connect LLM to tools/data
A2A  →  connect agents to agents
AP2  →  enable agents to pay (extension of both)
```

These are **layered**, not competing.

**Priority:** P3 — adopt only when the system needs to make purchases on behalf of the user. The protocol is still very new (September 2025).

**Source URLs:**
- https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
- https://eco.com/support/en/articles/15192002-ap2-protocol-explained-google-s-agentic-commerce-standard-2026

### 7.4 Other Agent Protocols

#### AGNTCY (Cisco → Linux Foundation)

Initially open-sourced by Cisco in March 2025, with collaboration from LangChain and Galileo. Joined Linux Foundation in July 2025. Components:
- **Directory** — agent discovery
- **Identity** — agent authentication
- **SLIM Messaging** — inter-agent communication
- **Observability** — agent tracing

#### Agent Identity & Trust

- Academic research proposes **zero-trust identity frameworks** using **Decentralized Identifiers (DIDs)** and **Verifiable Credentials (VCs)**
- NIST (February 2026) announced the **AI Agent Standards Initiative** for interoperable and secure agents

#### OpenAI Function Calling vs MCP

OpenAI's function calling is **proprietary**. MCP is the **open standard**. Many frameworks now support both — MCP is becoming the universal layer.

### 7.5 Protocol Summary Table

| Protocol | Maturity | Governance | Priority |
|---|---|---|---|
| **MCP** | Production | Anthropic (open) | P0 |
| **A2A** | Production | Linux Foundation (150+ companies) | P2 |
| **AP2** | Emerging | Google (60+ companies) | P3 |
| **AGNTCY** | Emerging | Linux Foundation (Cisco) | P3 |
| **OpenAPI** | Production | OpenAPI Initiative | P1 |
| **OAuth 2.1** | Production | IETF | P1 |
| **Webhooks** | Production | — | P1 |
| **SSE** | Production | — | P1 |
| **WebSocket** | Production | — | P1 |

---

## 8. Browser Intelligence

### 8.1 Three Approaches to Browser Understanding

| Approach | Description | Strength | Weakness |
|---|---|---|---|
| **DOM-based** | Read HTML directly | Fast, accurate | Needs selectors |
| **Accessibility Tree** | Read accessibility tree | Closer to human understanding | Less detail |
| **Screenshot + Vision** | Image + LLM analyzes it | Understands everything | Slow, expensive |
| **Hybrid (DOM + AT + Vision)** | All three together | Best | Most complex |

### 8.2 Browser Automation Tools (Verified 2026)

| Tool | Stars | Type | Priority |
|---|---|---|---|
| **browser-use** | ~60K | AI agent that controls browser | P0 |
| **Playwright** | ~88.5K | Multi-browser automation framework | P0 |
| **Stagehand** | ~23.8K | AI-first browser automation (4 primitives: act, extract, observe, agent) | P1 |
| **Skyvern** | ~500+ | Playwright extension with AI | P1 |
| **Puppeteer** | ~90K | Chrome automation | P1 |
| **LaVague** | — | Web agent framework | P2 |
| **WebAgent** | — | HuggingFace web agent | P2 |

### 8.3 Browser Agent Capabilities

| Capability | Priority |
|---|---|
| Page Navigation | P0 |
| Element Interaction (click, type, select) | P0 |
| Form Filling | P0 |
| Data Extraction | P0 |
| Session Management (cookies, login) | P1 |
| Authentication | P1 |
| Screenshot Capture | P0 |
| PDF Generation | P2 |
| File Download | P1 |
| Multi-tab Management | P1 |

---

## 9. Computer Use

### 9.1 Approaches

| Approach | Description | Tool |
|---|---|---|
| **API-based** | Use APIs directly | MCP Tools |
| **Accessibility-based** | OS accessibility APIs | Microsoft UI Automation |
| **Vision-based** | Screenshot → LLM → Action | Anthropic Computer Use |
| **Hybrid** | All approaches together | Best |

### 9.2 Computer Use Agents

| Project | Description | Maturity |
|---|---|---|
| **Anthropic Computer Use** | Claude controls desktop | Emerging |
| **OpenAI Operator** | Agent controls browsing | Emerging |
| **Open Interpreter** | Execute commands on machine (60K+ stars) | Mature |
| **OS-World** | Benchmark for desktop agents | Research |
| **AutoGUI** | Agent controls GUI | Experimental |

---

## 10. Code Intelligence

### 10.1 Coding Agents

| Project | Description | Strength |
|---|---|---|
| **Cursor** | AI code editor | Best programming experience |
| **Windsurf (Codeium)** | AI IDE | Free, fast |
| **Devin** | Full SWE Agent | Executes complex tasks |
| **SWE-Agent** | Open source SWE agent | Open, researchable |
| **Aider** | CLI coding agent | Works with any LLM |
| **Continue** | Open-source AI code assistant | Local execution |
| **Copilot** | GitHub AI | GitHub integration |

### 10.2 Code Capabilities

| Capability | Priority |
|---|---|
| Code Generation | P0 |
| Code Editing | P0 |
| Codebase Indexing | P1 |
| AST Understanding | P1 |
| Semantic Code Search | P1 |
| Test Generation | P1 |
| Automated Debugging | P1 |
| Refactoring | P2 |
| Dependency Analysis | P2 |
| Repository Understanding | P1 |
| SWE Agents | P1 |

---

## 11. Sandbox / Execution

| Technology | Description | Maturity | Priority |
|---|---|---|---|
| **Docker** | Containers | Production | P0 |
| **Firecracker** | MicroVMs (AWS, powers Lambda/Fargate; 125ms boot, 150 microVMs/sec/host) | Production | P1 |
| **gVisor** | Application kernel for containers (Google) | Production | P1 |
| **E2B** | Sandboxed code execution for AI (Firecracker-based) | Mature | P1 |
| **Modal** | Serverless sandbox | Production | P1 |
| **Daytona** | Dev environment manager (72K stars) | Emerging | P2 |
| **WASM Sandbox** | Isolated WebAssembly execution | Emerging | P2 |
| **WebContainer** | In-browser dev environments (StackBlitz) | Mature | P2 |
| **Pyodide** | Python in browser | Mature | P2 |
| **Nix** | Reproducible environments | Mature | — |

**Recommended combination:** Docker + E2B for isolated execution + MCP for tool integration.

---

## 12. RAG Evolution

### 12.1 RAG Techniques

| Technique | Description | Maturity | Priority |
|---|---|---|---|
| **Baseline RAG** | Embedding → Vector Search → LLM | Production | P0 |
| **Hybrid RAG** | Vector + Keyword (BM25) | Production | P0 |
| **GraphRAG** | Knowledge Graph + RAG (Microsoft) | Mature | P0 |
| **Agentic RAG** | Agent plans retrieval operation | Emerging | P1 |
| **Corrective RAG** | Verify results before generation | Emerging | P1 |
| **Self-RAG** | Model decides if retrieval needed | Emerging | P1 |
| **Recursive RAG** | Multi-stage retrieval | Emerging | P1 |
| **Multi-hop Retrieval** | Multiple retrieval steps | Mature | P1 |
| **Query Decomposition** | Break question into sub-questions | Mature | P1 |
| **Reranking** | Re-rank results | Production | P0 |
| **Contextual Retrieval** | Include context in each chunk | Emerging | P1 |
| **Adaptive RAG** | Choose strategy per question | Emerging | P2 |

### 12.2 Advanced RAG Techniques (NirDiamant repo)

The RAG_Techniques repository contains **42+ runnable notebooks** covering:
- **Foundational:** chunking strategies, embedding selection, vector store comparison
- **Query Enhancement:** HyDE (Hypothetical Document Embeddings), multi-query, step-back prompting
- **Retrieval Enhancement:** reranking, contextual compression, parent-document retrieval
- **Advanced:** knowledge graph integration, self-RAG, corrective RAG
- **Evaluation:** faithfulness, relevancy, context precision

### 12.3 Long Context vs RAG — Decision Framework

| Scenario | Use Long Context | Use RAG |
|---|---|---|
| <200K tokens, stable corpus | ✅ Simpler | ❌ Overkill |
| >1M tokens, stable corpus | ✅ If cost acceptable | ✅ More cost-effective |
| Dynamic/updating corpus | ❌ Can't update mid-conversation | ✅ Always fresh |
| Multi-hop reasoning | ✅ All context visible | ✅ Better for structured data |
| Cost-sensitive | ❌ Expensive per token | ✅ Cheaper (retrieve less) |
| Need citations | ❌ No source tracking | ✅ Built-in citations |

**Recommendation:** Hybrid — long context for conversation history + RAG for external knowledge + GraphRAG for structured relationships.

### 12.4 RAG Frameworks

| Framework | Stars | Priority |
|---|---|---|
| **LlamaIndex** | ~40K | P0 |
| **Haystack** | ~20K | P1 |
| **GraphRAG (Microsoft)** | 29.8K+ | P0 |
| **LightRAG** | — | P1 |
| **nano-graphrag** | — | P2 |

### 12.5 Vector Databases

| DB | Stars | Priority |
|---|---|---|
| **Milvus** | ~44K | P1 |
| **Qdrant** | ~22K | P1 |
| **Weaviate** | — | P1 |
| **Chroma** | ~26K (90K+ dependents) | P0 |
| **LanceDB** | — | P1 |

---

## 13. Context Engineering

### 13.1 Definition & Evolution

**[LangChain, July 2025]:** "Context engineering is the art of designing and managing the context window for LLM applications." It goes beyond prompt engineering — which focuses on crafting the right instructions — to include *what information* goes into the context, *how it's organized*, and *how it's managed over time*.

**[Sourcegraph, May 2026]:** Context engineering has **four pillars**:

1. **Write context** — instructions, tools, outputs
2. **Select context** — retrieve relevant information
3. **Compress context** — fit within token budget
4. **Isolate context** — separate concerns across agents/turns

Anthropic published their guide on effective context engineering for agents in September 2025. The discipline has overtaken prompt engineering as the primary lever for agent quality.

### 13.2 Context Window State of the Art (2026)

As of 2026, **13 models ship 1M+ token windows**:

| Model | Context Window | Provider |
|---|---|---|
| Gemini 2.5/3 Pro | 1M–10M tokens | Google |
| Claude Sonnet 4 | 200K–1M tokens | Anthropic |
| GPT-4.1/5 | 1M tokens | OpenAI |
| Llama 4 | 10M tokens | Meta |
| Qwen 3 | 256K–1M tokens | Alibaba |

**Long context does NOT eliminate RAG** — it changes the tradeoff. For <200K tokens, long-context is simpler. For >1M tokens, RAG is still more cost-effective.

### 13.3 Context Compression

- **LLMLingua** (Microsoft) — **20× compression** with only 1.5% performance loss on reasoning tasks. Uses a small language model to identify and remove less salient tokens.
- **LLMLingua-2** (May 2026) — data distillation for more efficient and faithful task-agnostic prompt compression.
- **Context summarization** — LLM-based summarization of conversation history
- **Selective retention** — keep only high-relevance turns
- **Hierarchical compression** — compress old turns more aggressively

**Sources:**
- https://www.llmlingua.com
- https://www.researchgate.net/publication/384217654_LLMLingua-2_Data_Distillation_for_Efficient_and_Faithful_Task-Agnostic_Prompt_Compression

### 13.4 Context Caching

**Anthropic Prompt Caching (Claude):**
- Cache write: 1.25× base input price (5-min TTL) or 2× (1-hour TTL)
- Cache read: **0.1× base input price (90% discount)**
- Break-even at ~2.3 cache reuses

**OpenAI Prompt Caching (October 2025):**
- Automatic for prompts >1024 tokens
- 50% discount on cached input tokens
- No code changes required

**Google Gemini** supports implicit caching with similar economics.

**Critical anti-pattern:** Timestamps/session IDs in cached prefix destroy cache performance. One cited case: enterprise RAG endpoint with 60K tokens of system prompt came back at **1% discount instead of 90%** because the system prompt opened with today's date. Another case: 170K-token context fully reprocessed on every request because a "Current Date & Time" field changed per turn — **10× cost over expectation**.

### 13.5 Context Routing & Selective Retrieval

- **RCR-Router** (arXiv:2508.04903, 2025) — lightweight, modular routing strategy for multi-agent LLM systems, enabling context selection across agents. Cited 8×.
- **Role-aware routing** — different agents get different context slices
- **Cost-sensitive retrieval** — balance retrieval cost vs accuracy gain
- **Recency-weighted selection** — newer context preferred
- **Relevance scoring** — multi-factor ranking (relevance + importance + recency + confidence)

### 13.6 Context Engineering Concepts

| Concept | Maturity | Priority |
|---|---|---|
| Context Assembly Engine | Emerging | P0 |
| Context Compression (LLMLingua) | Mature | P1 |
| Context Caching (Anthropic) | Production | P0 |
| Context Routing | Emerging | P1 |
| Context Prioritization | Emerging | P1 |
| Context Pruning | Mature | P1 |
| Long Context (1M+) | Production | P0 |
| Context Transparency | Emerging | P0 |

### 13.7 Recommended Context Engineering Stack

1. **Context Assembly Engine** — decides what enters context (not "all memories + all history")
2. **Prompt caching** — cache system prompt + user profile + project context (90% cost reduction)
3. **Context compression** — LLMLingua for long conversations
4. **Selective retrieval** — relevance + recency + confidence scoring
5. **Context budget** — per-request token budget with priority-based allocation
6. **Context transparency** — show the user what's in context

---

## 14. Research Intelligence

### 14.1 OpenAI Deep Research (February 2025)

Agent that conducts multi-step research on the web:
- Plans a research strategy
- Searches the web iteratively
- Reads and synthesizes sources
- Produces a cited report
- Can run for 5–30 minutes per query
- Shows live "thinking" steps as it works

Uses an **end-to-end RL-trained model** (o3-based) that learned to browse, read, and synthesize. Not a simple ReAct loop — a specialized research model.

### 14.2 Perplexity Pro Search

- Asks **clarifying questions** when query is ambiguous
- Decomposes query into sub-questions
- Searches for each sub-question
- Reads multiple sources
- Synthesizes with inline numbered citations `[1]`, `[2]`
- Shows source cards

### 14.3 Google Gemini Deep Research

- Creates a research plan first (user can edit)
- Executes the plan across multiple searches
- Produces a long-form report with citations
- Exports to Google Docs

### 14.4 Autonomous Research Agent Patterns

Common patterns across all deep research systems:
1. **Query decomposition** — break complex question into sub-questions
2. **Multi-query search** — search for each sub-question separately
3. **Source reading** — read full pages, not just snippets
4. **Source evaluation** — rank by credibility, recency, relevance
5. **Cross-source synthesis** — combine information from multiple sources
6. **Contradiction detection** — flag when sources disagree
7. **Citation extraction** — link claims to sources
8. **Iterative refinement** — if initial research is insufficient, search more

### 14.5 Source Verification Techniques

- **Cross-reference** — same claim across multiple independent sources
- **Authority scoring** — rank sources by credibility (official docs > blogs > forums)
- **Recency check** — prefer recent sources for rapidly-evolving topics
- **URL verification** — ensure links are live and not archived
- **Claim-to-source linking** — every claim links to the exact source passage

### 14.6 Cross-Source Contradiction Detection

- **Claim extraction** — extract atomic claims from each source
- **Semantic comparison** — compare claims semantically (not just string match)
- **LLM judge** — separate LLM call to assess if two claims contradict
- **Evidence graph** — build a graph of claims and their support/refutation relationships

### 14.7 Literature Review Agents

Autonomous academic literature review:
- Search arxiv, semantic scholar, Google Scholar
- Read abstracts → filter → read full papers
- Extract key findings, methodologies, limitations
- Identify research gaps
- Produce structured review

Open-source example: github.com/EvolvingLMMs-Lab/literature-review-agent (LangGraph or CrewAI)

---

## 15. Multimodal Intelligence

### 15.1 Vision

| Capability | Technology | Priority |
|---|---|---|
| Image Understanding | GPT-4o, Claude 3.5, Gemini | P0 |
| OCR | Tesseract, EasyOCR, DocAI | P1 |
| Document Understanding | Claude, DocAI | P1 |
| Chart/Diagram Reading | GPT-4o, Claude | P1 |
| Screenshot Understanding | Claude, GPT-4o | P0 |
| Video Understanding | Gemini, GPT-4o | P2 |

### 15.2 Audio

| Capability | Technology | Priority |
|---|---|---|
| Speech-to-Text | Whisper (OpenAI, local), Groq Whisper | P0 |
| Text-to-Speech | ElevenLabs, OpenAI TTS, Coqui, Piper (local) | P1 |
| Real-time Voice | OpenAI Realtime, Livekit Agents | P2 |
| Speaker ID | pyannote-audio | P2 |
| Audio Understanding | Gemini, GPT-4o | P2 |

### 15.3 Local Multimodal

- **Whisper (local)** — STT
- **Ollama Vision** — local image models
- **Piper TTS** — local TTS

---

## 16. Proactive Intelligence

The defining difference between a personal AI system and ChatGPT — the system **does not wait for the question**.

| Capability | Description | Priority |
|---|---|---|
| **Event-Driven Actions** | Reacts to events | P0 |
| **Background Tasks** | Works in background | P1 |
| **Scheduled Tasks** | Scheduled tasks | P0 |
| **Anomaly Detection** | Detects anomalies in data | P1 |
| **Opportunity Detection** | Detects opportunities | P2 |
| **Predictive Assistance** | Predicts what you need | P2 |
| **Context-Aware Suggestions** | Suggestions based on context | P1 |
| **Routine Detection** | Detects behavior patterns | P2 |
| **Habit Tracking** | Tracks habits automatically | P1 |
| **Automatic Planning** | Plans your day | P2 |

### Behavioral Pattern Detection Pipeline

Letta's recall memory is the canonical pattern: every message is persisted to disk and indexed for later search. Behavioral patterns emerge via:
- **Recurrence detection** — entity-action pairs that occur ≥ N times across the recall log
- **Temporal clustering** — same action at recurring time-of-day / day-of-week
- **Deviation detection** — today's action diverges from the recurring pattern → surface to user

Red Hat's June 2026 piece *"From Context to Dreams: Architecting Memory for AI Agents"* extends this to **offline consolidation** ("dreaming") — the agent periodically re-processes its recall log to extract schemas, compress redundant episodes, and refine its core-memory blocks.

---

## 17. Personalization

### 17.1 User Modeling Techniques

User modeling in personal AI has converged on a **layered, multi-signal architecture** rather than a single "user profile" object. ChatGPT's April 2025 dual-stream model (saved memories + chat history) is the canonical pattern.

IBM's 2025 AI personalization overview characterizes modern personalization as moving beyond static segmentations to **dynamic, AI-driven profiles that update with each interaction**. The hard part is no longer model accuracy but **data integration and governance** across many signal sources.

### 17.2 Preference Learning

- **DSPy MIPROv2** (Stanford NLP) — state-of-the-art for automatic preference/behavior learning. Jointly optimizes instruction text and few-shot demonstrations by bootstrapping successful traces.
  - `auto: "light" | "medium" | "heavy"` modes
  - `max_bootstrapped_demos`, `max_labeled_demos`
- **GEPA optimizer** — extends MIPROv2 with iterative prompt reflection (Reflective Prompt Evolution)
- **Contextual bandits** — canonical technique for *implicit* preference learning at click/interaction level (Thompson sampling / UCB with LLM-based reward shaping)

Two distinct preference-learning regimes:
- **Explicit / declarative** — "remember that I prefer X"
- **Implicit / behavioral** — inferred from trajectories

### 17.3 Adaptive Personality

The 2026 guide to self-improving AI agents distinguishes:
- **Persona-adaptive** agents (shift tone/style/verbosity based on inferred context)
- **Capability-adaptive** agents (shift reasoning strategy)

Parloa Labs calls this "the hidden layer of personalization." Inkeep's analysis of GPT-5's "personalized AI architecture" highlights a shift toward **per-user persona weights stored as system-prompt fragments** dynamically composed at inference time — no fine-tuning required.

Three orthogonal axes:
- **Tone** (formal ↔ casual, terse ↔ verbose)
- **Modality preference** (text-dominant ↔ mixed-media ↔ code-dominant)
- **Decision style** (analytical/step-by-step ↔ intuitive/first-pass)

### 17.4 Digital Twin & Personal World Model

Stanford HAI frames *digital twins of specific humans* as the dual of *synthetic persona agents* — same architecture (memory + reflection + planning), different training data (one person's full life log vs. a synthetic persona spec).

The **personal world model** formulation reached ICML 2025 (Richens et al., "On the Effectiveness of LLMs as Personal World Models").

### 17.5 Personalization vs Surveillance (Ethical Boundary)

The line between *personalization* and *surveillance* is **user-controllability**, not data volume. The system can store a lot — even everything — provided the user has:
1. Full read
2. Full edit
3. Full delete
4. Per-feature opt-out
5. Clear in-UI surfacing of when memory is being applied

TTC Labs (Google's cross-industry research consortium on responsible AI UX) emphasizes the **transparency–control–trust triangle**: users tolerate aggressive personalization if and only if (a) they can see what's known, (b) they can edit/delete it, (c) the system explains *why* a personalization was applied.

### 17.6 Personalization Capability Matrix

| Sub-capability | Maturity | Priority |
|---|---|---|
| Dual-stream memory (explicit + implicit) | Production (ChatGPT) | P0 |
| In-context core-memory blocks | Production (Letta) | P0 |
| Personal KG / digital twin | Mature (GraphRAG) | P0 |
| Behavioral pattern detection | Emerging → Mature | P1 |
| Adaptive personality | Emerging | P1 |
| Personal world model | Research (ICML 2025) | P2 |
| Preference learning (implicit) | Mature (bandits) + Emerging (LLM) | P1 |
| Privacy / surveillance guardrails | Production | P0 |

---

## 18. Self-Improvement

**Headline finding:** LLM agents can improve substantially **without any weight updates** by composing four orthogonal techniques — (1) verbal reflection loops, (2) iterative self-refinement, (3) experience-based skill accumulation, (4) automatic prompt/demonstration optimization.

### 18.1 Reflexion Pattern

**Reflexion** (Shinn et al., NeurIPS 2023, arXiv:2303.11366) — canonical "verbal reinforcement learning" framework. Instead of updating weights, the agent:
1. Attempts a task
2. Receives feedback (scalar or free-form language)
3. **Verbally reflects** on the failure in natural language
4. Stores the reflection in an **episodic memory buffer**
5. Re-attempts with the reflection prepended to context

**Headline result:** **91% pass@1 on HumanEval, surpassing GPT-4's 80%** — without any fine-tuning.

Design constraints:
- Reflection must be **verbal** (natural language), not a vector — enables debuggability
- Episodic memory buffer is **per-task**, not global — prevents contamination
- Feedback signal can be **self-generated**

### 18.2 DSPy — Automatic Prompt Optimization

**DSPy** (Stanford NLP) — dominant framework for programmatic prompt engineering with automatic optimization. Instead of hand-writing prompts, declare a typed `Signature` and compose `Module`s (Predict, ReAct, ChainOfThought). A `Teleprompter`/`Optimizer` searches over (a) instruction text and (b) few-shot demonstrations.

**MIPROv2** flagship optimizer parameters:
- `metric: Callable` — developer-supplied evaluation function
- `prompt_model` / `task_model` — separate models for proposing vs executing
- `max_bootstrapped_demos: int = 4`, `max_labeled_demos: int = 4`
- `auto: "light" | "medium" | "heavy" | None` — controls compute budget
- `num_candidates`, `num_threads`, `init_temperature`, `metric_threshold`

**GEPA optimizer** (Generative Prompt Adaptation) — extends MIPROv2 with iterative reflection on the prompt itself.

### 18.3 Voyager — Skill Acquisition

**Voyager** (Wang et al., 2023, arXiv:2305.16291) — seminal open-ended embodied agent with lifelong learning in Minecraft. Three components that are now the template for skill libraries:

1. **Automatic curriculum** — agent proposes next exploration goal based on what it hasn't mastered
2. **Skill library** — each successful execution stored as reusable code function with NL description. Future tasks retrieve relevant skills via embedding similarity
3. **Iterative prompting** — when execution fails, prompt is refined with error message (Reflexion-style loop for code)

### 18.4 Self-Refine

**Self-Refine** (Madaan et al., NeurIPS 2023, arXiv:2303.17651) — simplest iterative refinement:
1. Produces initial output
2. Generates its own feedback
3. Produces improved output conditioned on feedback
4. Repeats until stopping criterion

Differs from Reflexion: (1) operates **within a single task attempt** (intra-turn) vs Reflexion's **across attempts** (inter-turn); (2) feedback is purely self-generated.

### 18.5 Failure Memory & Learning from Mistakes

**"Where LLM Agents Fail and How They Can Learn From It"** (Zhu, Liu et al., arXiv:2509.25370, ICML 2025) — formalizes **failure-memory-augmented agents**: structured archive of past failures (task, attempted plan, error, root-cause analysis, fix) retrieved at planning time.

Failure-memory schema:
```
{
  failure_id: uuid,
  task_id: uuid,
  task_description: str,
  attempted_plan: [steps],
  failure_point: str,
  error_type: enum,             // from Awesome-LLM-Reasoning-Failures taxonomy
  error_message: str,
  root_cause_analysis: str,     // LLM-generated
  proposed_fix: str,            // LLM-generated
  applied_fix: bool,
  embedding: vector,            // for retrieval
  timestamp, project_id, user_id
}
```

At planning time: embed proposed plan → retrieve top-K similar past failures → if any have `applied_fix == true`, prepend fix to planner's context.

**Awesome-LLM-Reasoning-Failures** (Peiyang Song, 2025) — catalogues failure modes: arithmetic errors, logical contradictions, hallucinated API calls, plan-step omission, etc.

### 18.6 Trajectory Learning

- **Trajectory Replay (TR)** (arXiv:2510.10304, Oct 2025) — agent periodically re-executes past trajectories with stronger model; uses deltas to update policy
- **CER: Counterfactual Experience Replay** (ICLR 2025) — extends to counterfactual trajectories ("what if we'd taken the other branch at step K?")

### 18.7 Can Agents Improve Without Retraining?

**YES.** The four techniques above plus failure memory and trajectory replay collectively enable substantial agent improvement with **zero weight updates**.

| Technique | What it improves | Retraining? | Compute cost |
|---|---|---|---|
| Reflexion | Per-task success rate (cross-attempt) | No | +1 reflection call per failed attempt |
| Self-Refine | Per-message output quality | No | +1 critique + 1 regenerate per message |
| DSPy MIPROv2 | Prompt instructions + few-shot demos | No | Offline batch (hours, weekly) |
| DSPy GEPA | Prompt instructions (reflection-evolved) | No | Offline batch (hours, weekly) |
| Voyager skill library | Reusable skill reuse rate | No | Storage + retrieval only |
| Failure memory | Avoidance of repeated mistakes | No | Storage + retrieval only |
| Trajectory replay | Action-policy quality | No | Offline batch (hours, monthly) |
| ExpeL | Insight extraction from past trajectories | No | Offline batch |

### 18.8 ExpeL (AAAI 2024)

**ExpeL** (Zhao, Huang et al., AAAI 2024, arXiv:2308.10144) — "LLM Agents Are Experiential Learners" — canonical reference showing agents can extract **reusable insights** from past trajectories and apply to new tasks without retraining.

### 18.9 Context-Update vs Parameter-Update Continual Learning

The 2026 consensus: **for personal AI, context-update self-improvement is the right regime**. Parameter updates require training infrastructure, risk catastrophic forgetting, and are slow. Context-update techniques are:
- **Debuggable** — the improvement is visible text/skills
- **Reversible** — delete a bad skill
- **Fast** — hours, not weeks

Apple Machine Learning Research's 2025 *"Reinforced Agent Inference Feedback"* describes a runtime control system using RL-inspired signals to adjust agent behavior at inference time — no training.

### 18.10 Self-Improvement Capability Matrix

| Sub-capability | Maturity | Priority |
|---|---|---|
| Self-Refine (intra-turn) | Production | P0 |
| Reflexion (cross-attempt) | Mature (NeurIPS 2023) | P0 |
| DSPy MIPROv2 / GEPA | Production | P1 |
| Skill library (Voyager-style) | Mature | P1 |
| Failure memory | Research → Mature (ICML 2025) | P0 |
| Trajectory replay | Research (Oct 2025) | P2 |
| ExpeL insight extraction | Research (AAAI 2024) | P2 |
| Context-update continual learning | Mature (2026 consensus) | P0 |

All self-improvement outputs (reflections, optimized prompts, new skills, failure entries) must be **versioned, reversible, and user-auditable** — same 5-right contract as personalization.

---

## 19. Long-Term Autonomy

### 19.1 LangGraph Durable Execution

LangGraph's persistence layer provides **two complementary systems**:

| System | Persists | Scope | Use For |
|---|---|---|---|
| **Checkpointer** | Graph state snapshots | One thread | Conversation continuity, HITL, time travel, fault tolerance |
| **Store** | Application-defined key-value data | Across threads | User preferences, facts, shared knowledge |

**Backends:** `InMemorySaver` (dev only), `PostgresSaver` / `AsyncPostgresSaver` (production), Redis, SQLite. Note: `thread_id` must be ≤ 255 characters for PostgresSaver.

**Cron:** LangGraph supports cron-based scheduled tasks via `langgraph_sdk` cron module and LangSmith cron jobs.

**Important caveat (Diagrid blog, 2025):** Checkpoints ≠ durable execution. LangGraph checkpoints persist state but do not by themselves guarantee *code completion* across process restarts the way Temporal/Restate/DBOS do.

**Security:** 2026 CSA research note and Check Point Research disclosed SQL-injection-to-RCE vulnerabilities in LangGraph's checkpointer — the checkpointer DB must be hardened in production.

### 19.2 Temporal Workflows

The original durable-execution engine. February 2025 blog *"Build resilient Agentic AI with Temporal"*:
- **Durable and resilient** — workflows survive process crashes, bad data, network timeouts
- **Long-running and stateful** — workflows last hours, days, or months
- **Scheduled execution** — workflows run on a schedule (cron)
- **Human-in-the-loop support** — pause for approval/input via signals
- **Multi-language SDKs** — Go, Python, Java, TypeScript, .NET, Ruby
- **Centralized orchestration** with full visibility UI

**Integrations:**
- OpenAI Agents SDK integration (Temporal blog)
- Vercel AI SDK integration

**Ambient agents** (May 2025 blog): pattern for agents running continuously in the background, processing events as they arrive.

### 19.3 Inngest

February 2026 blog *"Durable Execution: The Key to Harnessing AI Agents in Production"* — best 2026 reference. Key claims:

- Durable execution **crossed the chasm into the early majority in late 2025** with new offerings from AWS (Durable Functions), Cloudflare (Workflows GA), Vercel (Workflow DevKit)
- AI agents break traditional assumptions: **(1) probabilistic** (same prompt → different outputs), **(2) compositional** (5 steps at 99% = 95% overall; 10 steps = 90%), **(3) stateful**
- HITL patterns map directly to durable execution's suspend/resume primitives
- Next evolution: **low-latency patterns for interactive, user-facing AI agents**

**Primitives:** `step.ai()` (AgentKit integration), `step.run()` / `step.sleep()` / `step.waitForEvent()` — each step automatically checkpointed and retried.

### 19.4 Restate

Built "from first principles" (https://www.restate.dev/blog/building-a-modern-durable-execution-engine-from-first-principles):
- **No external database required** — embedded storage
- **Lower latency** — sub-millisecond overhead, enabling user-facing interactive agents
- **TypeScript-first** (with Rust/Java SDKs)
- **Restate 1.2** current stable release

On ThoughtWorks Technology Radar — strong signal of enterprise readiness.

### 19.5 DBOS

"Database Operating System" — durability inside the database, not in a separate workflow engine. Targets:
- HITL waiting for human input (hours or days)
- Retries and parallelization of tool calls
- Server crash recovery with no duplicate or missed updates
- Refund/payment-style workflows

Integrated with **Pydantic AI** as the durability layer. DBOS + Databricks integration for analytics-heavy workflows.

### 19.6 Four Production Patterns for AI Agent State

| Pattern | Description | Best Runtime |
|---|---|---|
| **Per-thread checkpointing** | Snapshot graph state at every step | LangGraph checkpointer |
| **Cross-thread store** | Key-value / vector store for data shared across conversations | LangGraph store, Letta archival |
| **Workflow durability** | Multi-step workflows survive process/server crashes | Temporal, Restate, Inngest, DBOS |
| **Event-sourced log** | Append-only event log; state derived by replay | Zep, Temporal event history |

**Hybrid pattern (recommended):** LangGraph for in-conversation state + Temporal/Restate for cross-process durability + event log for audit. Google ADK blog and Cloudflare agents documentation converge on the same architecture.

### 19.7 Interruption Recovery & Retry

- LangGraph persistence: re-invoke graph with same `thread_id`; checkpointer restores latest snapshot
- Temporal recovery: automatic — failed activities retried per workflow's retry policy; process crashes trigger automatic workflow replay
- **April 2026 arXiv survey** *"Checkpoint/Restore Systems: Evolution, Techniques, and Applications in AI Agents"* (arXiv:2603.20625) — most comprehensive academic reference
- **ACRFence** — *Preventing Semantic Rollback Attacks in Agent Checkpoint/Restore* — restoring agent state to earlier checkpoint doesn't undo side effects in the external world (sent emails, executed payments)

### 19.8 Background Workers & Scheduled Jobs

JobRunr's blog *"Why AI Agents Need Background Jobs"*: AI agents need background workers for (a) long-running tasks that shouldn't block chat UI, (b) scheduled recurring tasks (daily summaries, weekly reports), (c) batch processing of accumulated events, (d) polling external systems.

Reddit observation: *"AI Agents is just a cron from Kubernetes"* — most long-running agent patterns reduce to "cron + state store + retry." Valuable insight: durable-execution runtimes give you all three for free with stronger guarantees.

### 19.9 Long-Term Autonomy Capability Matrix

| Sub-capability | Maturity | Priority |
|---|---|---|
| Per-thread checkpointing | Production (LangGraph) | P0 |
| Cross-thread store | Production (LangGraph) | P0 |
| Durable workflows (hours/days) | Production | P0 |
| Scheduled / cron tasks | Production | P0 |
| Event-triggered background workers | Production | P1 |
| Interruption recovery | Production | P0 |
| Retry policies | Production | P0 |
| HITL pause/resume | Production | P0 |
| Semantic-rollback protection | Research (2025–2026) | P1 |
| Time-travel debugging | Production | P1 |
| Compensation/rollback for side effects | Mature pattern | P1 |

### 19.10 Closed Self-Improvement Loop

The three pillars (Personalization, Self-Improvement, Long-Term Autonomy) form a **closed self-improvement loop**:

1. **Personalization** → models the user → produces user signals (reward function)
2. **Self-Improvement** → models the agent → produces new skills/prompts (improvement)
3. **Long-Term Autonomy** → runs the loop for days/weeks → durable workflows carry state across crashes, restarts, and human pauses → background workers periodically consolidate memory, optimize prompts, and curate the skill library

These should be built as a single integrated subsystem, not three separate P1 features.

---

## 20. Model Routing

| Concept | Description | Maturity | Priority |
|---|---|---|---|
| **Model Router** | Chooses appropriate model per task | Production | P0 |
| **Cost-Aware Routing** | Cheapest model when possible | Mature | P0 |
| **Quality-Aware Routing** | Best model for hard tasks | Mature | P0 |
| **Latency-Aware Routing** | Fastest model for simple tasks | Mature | P1 |
| **Local/Cloud Hybrid** | Local first, cloud on demand | Mature | P0 |
| **Fallback Chain** | Model 1 → Model 2 → Model 3 | Production | P0 |
| **Ensemble** | Multiple models answer, select best | Emerging | P2 |
| **Model Judges** | Model judges model outputs | Emerging | P2 |

**Pattern:** Small/cheap model (GPT-4o-mini, Claude Haiku) for routing/classification; frontier model only for hard reasoning.

---

## 21. Privacy / Local-First AI

### 21.1 Local Models (2026)

| Model | Company | Size | Strength |
|---|---|---|---|
| **Llama 4** | Meta | 10M context | Massive context |
| **Qwen 3** | Alibaba | Multiple sizes | Good Arabic |
| **Gemma 3** | Google | Multiple sizes | Lightweight |
| **Phi-4** | Microsoft | Small | Excellent for size |
| **DeepSeek V3** | DeepSeek | Large | Deep reasoning |
| **Mistral Large** | Mistral | Large | European |

### 21.2 Local Infrastructure (Verified 2026)

| Tool | Stars | Description | Priority |
|---|---|---|---|
| **Ollama** | ~120–172K | Easiest local model runner | P0 |
| **llama.cpp** | ~70K | C++ inference engine | P0 |
| **vLLM** | ~30K | GPU inference server (1918 commits in June 2026) | P1 |
| **MLX** | — | Apple Silicon inference | P1 |
| **LocalAI** | — | OpenAI-compatible local API | P2 |
| **WebLLM** | ~18.5K | LLM in browser (WebGPU) | P2 |
| **Transformers.js** | — | HuggingFace in browser | P2 |
| **ChromaDB** | ~26K | Local vector database | P0 |
| **SQLite + FTS5** | — | Local full-text search | P0 |

---

## 22. Storage Architecture

| Data Type | Recommended Technology | Priority |
|---|---|---|
| Conversations | SQLite + JSON | P0 |
| Memories | Mem0 + Vector DB + SQLite | P0 |
| Embeddings | Chroma (local) / Qdrant | P0 |
| Knowledge Graph | GraphRAG + Neo4j (optional) | P1 |
| Events/Logs | SQLite + append-only | P0 |
| Files | Filesystem + metadata | P0 |
| Traces | Langfuse (self-host) | P1 |
| Skills | JSON/SQLite | P1 |
| Workflows | LangGraph state | P1 |
| Agent States | LangGraph checkpointing | P1 |
| Cache | In-memory (LRU) | P0 |

---

## 23. Observability

### 23.1 OpenTelemetry for GenAI

**OpenTelemetry GenAI Semantic Conventions** — CNCF-backed standard, maintained at `github.com/open-telemetry/semantic-conventions-genai`. As of mid-2026: **230 stars, 74 forks, Apache-2.0 license**.

The conventions cover **spans, metrics, and events for GenAI clients, MCP (Model Context Protocol), and provider-specific conventions (OpenAI, etc.)**. Schema includes standard attributes for prompts, model responses, token usage, tool/agent calls, and provider metadata.

Datadog Agent Observability natively supports the conventions (Dec 2025). OpenLLMetry donated its conventions to OTel. Every observability vendor (Datadog, Dynatrace, Langfuse, Arize, Helicone) emits or consumes these.

### 23.2 Langfuse vs LangSmith vs Helicone vs Arize Phoenix

| Tool | License | Self-host? | Best for |
|---|---|---|---|
| **Langfuse** | MIT | Yes (Postgres + ClickHouse) | Open-source self-host, prompt versioning, evals |
| **LangSmith** | Proprietary | No (cloud only) | LangChain users, managed cloud |
| **Helicone** | Open-source | Yes (proxy-first) | Simple drop-in proxy, cost tracking |
| **Arize Phoenix** | Apache-2.0 | Yes | Drift detection, ML teams |
| **Laminar** | Open-source | Yes | Real-time agent debugging, replay |

**Pricing:**
- Langfuse Cloud: free to 50K units/month; core repo MIT; self-hosting free
- LangSmith: 5K traces then $2.50 per 1K
- Helicone: free unlimited personal use; $79/mo Pro; $799/mo Team
- Phoenix: free self-host; Arize cloud is enterprise tier

**Recommended:** Langfuse — MIT license, self-hostable on Postgres + ClickHouse, native prompt versioning, first-class token & cost tracking, SDK-based integration, ships with OpenTelemetry GenAI support.

### 23.3 What to Trace

- **Trace** (top-level): `task_id`, `user_id`, `session_id`, `agent_name`, `started_at`, `ended_at`, `total_cost_usd`, `total_tokens`, `cache_hit_rate`
- **Span: planner** — input (task), output (plan), model, tokens
- **Span: context_builder** — input (task), output (retrieved memories + knowledge), retrieval count
- **Span: llm_call** — model, system_prompt_hash, input/output tokens, cached tokens, cost, latency, tool_calls
- **Span: tool_call** — tool_name, idempotency_key, input, output, duration, side_effects
- **Span: validator** — input, output (valid/invalid + reason), rule_id
- **Span: human_approval** — approver, approved_action_hash, decision, decided_at

All spans emit OTel GenAI semantic conventions for vendor portability.

### 23.4 Production Monitoring

Production monitoring triad: **latency, cost, quality** — each tracked at trace level and aggregated for alerting.

Four alert types:
- **Cost spike** — single trace > 2× rolling median cost
- **Latency spike** — single trace > 30s wall-clock
- **Quality drop** — validation failure rate > 10% in 5-minute window
- **Cache hit rate drop** — cache hit rate < 50% when expected > 80%

---

## 24. Reliability

### 24.1 Circuit Breakers

The circuit breaker pattern is now a documented reliability primitive for GenAI agents. **LiteLLM April 2026 Redis circuit-breaker post** is the canonical production implementation.

Standard three-state machine: closed → open → half-open. Closed = normal calls; open = fast-fail without calling provider; half-open = test single request.

**Two distinct regimes:**
- **Provider circuit breaker** — fires on HTTP 429/500/503
- **Quality circuit breaker** — fires on *output* degradation (high hallucination, low confidence, repeated tool failures) even when provider returns 200

jztan's February 2026 piece: *"the circuit breaker catches quality degradation within three calls instead of six hours."*

### 24.2 Graceful Degradation & Fallback Chains

**5-layer degradation ladder** (BuildMVPFast April 2026):
1. Primary model
2. Cheaper/faster fallback model
3. Cached prior response
4. Checkpoint + resume later
5. Degraded UX ("I can't complete this now, here's what I have so far")
6. Human escalation

**Critical insight (Towards Data Science, June 2026):** Naive fallback chains (model A → model B) preserve availability but **break agent state structure** — model B may not honor A's tool-call schema. Fix is a state-recovery workflow that validates post-fallback state against pre-fallback schema.

### 24.3 Idempotency

Arpit Bhayani: *"AI agents will retry. They will always retry. We have to be ready for it. Given how long-running agentic loops are, network drops, timeouts, and partial completions are inevitable. Idempotency keys are not optional — they are the only thing between you and double-charging a customer."*

Four required components:
1. Idempotency key per tool call (UUID generated by orchestrator)
2. Dedup table keyed on (tool, idempotency_key)
3. Checkpoint of agent state after each successful tool call
4. Durable execution so checkpoint survives process restart

### 24.4 Retry Policies

- **In-process retry** — handles transient HTTP errors (3 attempts, exponential backoff with jitter: 1s, 2s, 4s, 8s)
- **Durable retry** — handles process crashes and long waits (requires persistence)

Reddit r/AI_Agents: *"Your agent's retry logic dies when the agent does."* — in-process retry logic doesn't survive process crashes; only durable execution provides crash-safe retry.

8 retry patterns that make agent actions auditable (Medium, Komal Parmar, May 2026): idempotency keys, exponential backoff with jitter, ledger-based retries, saga orchestration, audit trails, dead-letter queues, time-bound retry windows, human-escalation triggers after N attempts.

### 24.5 Deterministic Components

**Critical principle:** A non-deterministic component cannot serve as a trustworthy control for another non-deterministic component. Every governance component must be deterministic.

- **Civic** (July 2025): "Deterministic Guardrails: Hard rules that reject, redact, or add security context to inputs and outputs."
- **Arthur AI** (April 2026): pre-LLM + post-LLM guardrail architecture
- arXiv *A Deterministic Control Plane for LLM Coding Agents* (June 2026)
- RanTheBuilder: "Agentic Coding Hooks" — pre-tool and post-tool callbacks that run deterministic checks (allow/deny/redact) without invoking an LLM

### 24.6 State Recovery & Rollback

Three patterns compose:
- **CheckpointManager** — captures agent state at each step
- **EventLogRepository** — append-only audit log
- **Saga compensation** — for each tool call, register compensating action that can undo it

The **Saga pattern** (Azure Architecture Center, Microsoft): a saga is a sequence of local transactions. Each local transaction updates the database and publishes a message/event to trigger the next. For agents, each tool call is a local transaction; compensating transactions undo prior steps if a later step fails.

### 24.7 Reliability Stack

| Layer | Pattern | Status |
|---|---|---|
| 1. Provider circuit breaker | Closed/Open/Half-open on HTTP errors | Partial — needs explicit state machine |
| 2. Quality circuit breaker | Trip on validation failure rate | New |
| 3. Fallback chain | 5-layer ladder | Partial |
| 4. Idempotent tool calls | Idempotency key + dedup table | New |
| 5. Saga-style compensation | Compensating action per side-effecting tool | New |

All five are production-grade patterns with documented 2026 implementations. None requires new research; they require engineering.

---

## 25. Security

### 25.1 OWASP Top 10 for LLM Applications 2025

The canonical reference. The 2025 list:

| # | Risk | Description |
|---|---|---|
| **LLM01:2025** | **Prompt Injection** | Manipulating LLMs via crafted inputs (direct or indirect) to override system directives |
| **LLM02:2025** | **Sensitive Information Disclosure** | LLMs leak PII, training data, or context data via outputs |
| **LLM03:2025** | **Supply Chain Vulnerabilities** | Vulnerable third-party models, datasets, plugins, or pre-trained weights |
| **LLM04:2025** | **Data and Model Poisoning** | Manipulation of pre-training, fine-tuning, or embedding data to alter behavior |
| **LLM05:2025** | **Improper Output Handling** | LLM output treated as trusted → XSS, SSRF, privilege escalation downstream |
| **LLM06:2025** | **Excessive Agency** | Agent given too many permissions / tools / autonomy → unintended destructive actions |
| **LLM07:2025** | **System Prompt Leakage** | Sensitive info in system prompts exposed via prompt injection or model memorization |
| **LLM08:2025** | **Vector and Embedding Weaknesses** | Poisoned vectors, retrieval-time injection, insecure embedding DBs |
| **LLM09:2025** | **Misinformation** | Model fabricates false information that is then acted upon |
| **LLM10:2025** | **Unbounded Consumption** | Resource exhaustion via prompt flooding, recursive agents, or token-burning attacks |

The Top 10 splits into two natural groups:
- **Input/output risks** (LLM01, LLM02, LLM05, LLM07, LLM09) — mitigated by deterministic pre/post-LLM guardrails
- **Architectural risks** (LLM03, LLM04, LLM06, LLM08, LLM10) — mitigated by capability scoping, sandboxing, and budget limits

**LLM06 (Excessive Agency)** is the single highest-priority risk for personal AI because agents execute tools that touch the user's filesystem, knowledge graph, and external services.

### 25.2 Prompt Injection Defenses

**Microsoft MSRC** (July 2025) — defense-in-depth:
1. Input classification (trusted vs. untrusted)
2. Output filtering
3. Prompt isolation (separating system instructions from user data)
4. Tool-call allow-listing

**SentinelOne** defense stack: input sanitization, prompt structure isolation (XML/markdown tags), output validation against expected schema, tool-call rate limiting, HITL for high-risk tool calls.

**No defense makes prompt injection impossible.** The realistic goal is **defense-in-depth** that reduces probability and blast radius.

### 25.3 Indirect Injection

OWASP distinguishes direct vs. indirect: *"Indirect prompt injections occur when an LLM accepts input from external sources, such as websites or files."*

**Microsoft's approach:**
1. **Input classification** — mark data as untrusted before it enters LLM context
2. **Spotlighting** — transform untrusted data (base64 encoding, markdown quoting) so LLM treats it as data
3. **Process-level isolation** — agents processing untrusted data run in sandbox with restricted tool access

**Palo Alto Unit 42** (March 2026): real-world web-based indirect injection attacks observed in the wild — attackers embedding malicious instructions in web pages that AI browsing agents process and execute.

### 25.4 MCP Tool Poisoning

**The most important new agentic-specific threat of 2025.** See §7.1 MCP Security for full details.

Key sources:
- Invariant Labs (April 1, 2025) — original disclosure
- CyberArk (May 30, 2025) — "Poison everywhere"
- Red Hat (July 1, 2025) — security risks and controls
- Elastic Security Labs (Sept 19, 2025) — attack vectors and defense
- Adversa.ai (Sept 17, 2025) — Top 25 MCP Vulnerabilities
- arXiv:2508.12538 — Systematic Analysis of MCP Security

### 25.5 Data Exfiltration Prevention

Three layers:
1. **Egress filtering** — every outbound request filtered against allow-list of domains and IP ranges
2. **PII detection on outputs** — scan for PII patterns (email, phone, SSN, credit card, API keys) before leaving agent boundary
3. **Volume anomaly detection** — track agent outbound data volume; spikes trigger alert or block

### 25.6 Credential Isolation & Sandboxing

- **Capability-based security** — explicitly grants access to specific APIs rather than blanket permissions
- **Per-task filesystem boundary** — each task gets fresh working directory
- **Egress allow-list** — network access restricted to declared endpoints per tool
- **Resource caps** — CPU, memory, wall-clock, and token budgets per task
- **Audit every action** — every filesystem write, network call, tool invocation logged with full input/output for replay
- **No host credential access** — agent runtime never sees user's API keys, OAuth tokens, or filesystem credentials

### 25.7 Capability-Based Permissions (Emerging 2026 Standard)

**SuperTokens** (March 2026): *"Authentication for AI Agents: Tokens, Tool Calls, and [Capability Scoping] — Least-Privilege. An agent token can produce a per-tool capability token carrying an even narrower scope. The rule is: only narrow, never widen."*

**Cloud Security Alliance Agent Identity Governance Framework v1** — just-in-time access model that replaces standing agent privileges with intent-declared, time-bound, scope-limited grants.

Three-level model:
1. **Agent identity** — each agent has its own identity (not the user's), with a long-lived signing key
2. **Capability tokens** — for each tool invocation, the agent requests a short-lived, narrowly-scoped capability token from a policy engine. Token names: which tool, which arguments (or argument hash), what data scope, what expiry, what rate limit.
3. **Tool-side verification** — the tool verifies the capability token's signature, expiry, scope, and rate limit before executing

**Key principle:** capability tokens only narrow, never widen (capability-monotonicity rule from object-capability theory).

### 25.8 Audit Trails & Compliance

Minimum-viable audit trail per agent action:
- `trace_id` (links to Langfuse trace)
- `task_id`
- `agent_id`
- `tool_name`
- `input_hash` (full input stored in Langfuse)
- `output_hash`
- `capability_token_id`
- `approved_by` (user ID if HITL required)
- `started_at`, `ended_at`
- `cost_usd`
- `side_effects` (list of filesystem writes, external sends, etc.)

Append-only, retained per regulatory requirement (default 90 days, configurable), exportable in JSON/CSV.

### 25.9 HITL for High-Risk Actions

**Critical failure mode: post-signoff drift.** If the agent's action can change between approval and execution, the human approval is theater. The fix is **binding approval**:

1. **Binding approval** — approved action captured as immutable signed payload (content hash + capability token). Executor verifies hash before execution.
2. **No drift** — between approval and execution, action's input arguments cannot change.
3. **Audit trail** — every approval decision (approve / reject / modify) logged with approver, timestamp, full context.
4. **Time-bound approval** — approvals expire after configurable window (default 5 minutes).

High-risk action categories requiring HITL:
- Filesystem writes outside task working directory
- External sends (email, webhook, message)
- Irreversible operations (delete, overwrite, publish)
- Credential-gated actions
- Cost-gated actions (would exceed task's remaining budget by 2× or more)

### 25.10 Governance-in-the-Loop vs HITL

**ISHIR (2026):** "Governance-in-the-Loop: The Future of Enterprise AI — The organizations achieving the highest AI adoption success rates in 2026 are shifting from Human-in-the-Loop toward a more mature framework known as Governance-in-the-Loop."

HITL doesn't scale (one human can't approve every agent action); governance-in-the-loop means policy-as-code that automatically approves low-risk actions and escalates only high-risk ones to humans.

---

## 26. Agent Economics

### 26.1 The Token Multiplier Problem (5–30x)

**VERIFIED.** Gartner's March 2026 analysis: *"agentic models require between 5 and 30 times more tokens per task than a standard chatbot."*

**Stanford Digital Economy Lab** (April–May 2026) — *How are AI agents spending your tokens?* (Bai, Brynjolfsson, Pentland, Pei et al., arXiv:2604.22750):

> *"Agentic tasks are uniquely expensive, consuming 1000x more tokens than code reasoning and code chat, with input tokens rather than output the dominant cost."*

The mechanism is the **context-snowball problem**: an agent reads the task, gets a response, then has to **re-read everything** (original prompt + response) before the next action, then re-read all of that plus the new response, and so on. Each iteration pays again for everything before it.

Up to **30× variance** in token consumption between runs of the same agent on the same task.

**Helicone production data:**
- Support chat: $0.12/task (5 API calls)
- Document analysis: $0.45/task (12 API calls)
- Quick queries: <$0.05/task

**Goldman Sachs forecast:** token processing hits 47 quadrillion/month in 2028 (~565 quadrillion/year); 120 quadrillion/month by 2030. 24× AI token demand by 2030.

### 26.2 Uber Case Study (Verified)

**Fortune, 26 May 2026:** Uber president and COO Andrew Macdonald said on the *Rapid Response* podcast that Uber had burnt through its entire 2026 AI coding-tools budget in 4 months after incentivizing employees through an internal leaderboard ranking teams by total AI tool usage.

**Cockroach Labs (June 10, 2026) — engineering breakdown:**
- Uber CTO Praveen Neppalli Naga: *"I'm back to the drawing board, because the budget I thought I would need is blown away already."*
- Claude Code adoption: **32% → 84% of Uber's 5,000-engineer org** between December 2025 and March 2026
- Monthly API costs per engineer: **$500–$2,000**
- Enterprise AI inference = **85% of total AI budgets** in 2026
- Per-token cost has dropped **98% since early 2024**, yet enterprise AI bills keep rising
- Simple chatbot: 1 inference call; agentic workflow: **10–20 model calls per user task**

CEO Dara Khosrowshahi on Q1 2026 earnings: ~10% of Uber's committed code is now built by autonomous agents. Q1 2026 R&D spend: $951M, up ~17% YoY. Total 2025 R&D: $3.4B.

**Microsoft** began canceling most direct Claude Code licenses in May 2026, moving engineers to GitHub Copilot CLI. Anthropic's Claude Code hit **$2.5 billion in annualized revenue by February 2026**, up from $1 billion in November 2025.

### 26.3 Sam Altman's "Fair Criticism" Quote

June 2026 CNBC interview: OpenAI CEO Sam Altman called the question of whether AI spending will produce returns *"the most fair criticism right now of AI"* and acknowledged customers had told him they had already burned through their entire 2026 AI budget. Altman's August 2025 "AI is in a bubble" comment (CNBC) separately verified.

Altman (March 2026): *"We see a future where intelligence is a utility, like electricity or water, and people buy it from us on a meter."* OpenAI's top token spender 6.5 years ago used 100K tokens/month; today that's the global per-capita average; OpenAI's current token leader consumes ~100 billion tokens/month — a **one-million-fold per-user increase**.

### 26.4 Cost-per-Task as the New Metric

Cockroach Labs: *"the relevant unit is no longer cost per prompt, but cost per completed task."*

Bigeye (May 2026): *"AI agents consume 5–30x more tokens per task than standard chatbots, and average enterprise AI spending grew 483% from 2024 to 2026."*

Four orthogonal components:
1. **Inference cost** — model × tokens × unit price
2. **Retry cost** — failed/repeated attempts × per-attempt inference cost
3. **Context cost** — the snowball: every step re-pays for prior context
4. **Tool cost** — external API calls, search queries, sandboxed execution

### 26.5 Token Budget Management

**Four-layer token-budget system:**

| Layer | What it does |
|---|---|
| **Per-task budget** | Hard cap on total cost per Task. Auto-pauses when budget hit. |
| **Per-session budget** | Soft cap per user session; surfaces warning UI at 80% |
| **Per-day user budget** | Daily rolling cap; auto-degrades to small model on exceed |
| **Cache-first inference** | All system prompts + tool definitions structured for max cache hits |

**Prompt caching** is the highest-return first move. On Anthropic Claude Sonnet 4.6: cache reads cost $0.30 per million tokens vs $3.00 standard — **90% reduction**. Break-even: 2.3 reuses.

**Cache-killing anti-pattern:** Timestamps and session IDs in prefix destroy cache performance. Injecting "Today is March 6, 2026" into system prompt invalidates cache every day. One cited case: 60K-token system prompt came back at 1% discount instead of 90%. Another: 170K-token context fully reprocessed on every request due to "Current Date & Time" field — 10× cost over expectation.

### 26.6 ROI Data (2025–2026)

- **Google Cloud ROI of AI Report 2025** (Sept 2025): 52% of organizations report achieving ROI from AI; 74% of executives report ROI within first year
- **Pickaxe 2026:** AI spending will hit $2.5 trillion in 2026; only 29% of executives can confidently measure AI ROI
- **Planetary Labour 2026:** organizations report average ROI of 171% from AI agent deployments; U.S. enterprises forecasting 192% returns
- **DigitalApplied 2026:** ROI studies claiming 106% to 396% three-year ROI
- **Gartner:** 40% of enterprise applications will embed task-specific AI agents by end of 2026 (up from <5% in 2025)
- **McKinsey State of AI 2025** (Nov 2025): 88% of organizations use AI in at least one function; 52% actively using AI agents
- **MIT research:** 95% of AI projects stall in pilot-to-production; McKinsey: <10% of enterprise agents make it beyond pilot

**Macro vs Micro:** AI spending exploding ($2.5T in 2026, 24× token growth to 2030), adoption universal (88%), ROI *can* be very high (171% average). But: most pilots stall (95%), most leaders can't measure ROI (only 29% can), and gap between adoption (88%) and value (10% scaled) is widening.

### 26.7 FinOps Foundation

FinOps Foundation published "Optimizing GenAI Usage" in May 2025 — extending cloud-FinOps discipline to AI-specific spend categories (inference, fine-tuning, storage, human review). GenAI is now an official FinOps Foundation working group.

Oplexa 2026 report: **AI inference costs are 85% of enterprise AI budgets in 2026**.

---

## 27. Enterprise Patterns

### 27.1 Toyota (Verified — Deloitte Insights, 3 December 2025)

*"Reimagining operations with agentic AI at Toyota — Agents alone won't drive competitive advantage; process redesign and people will."*

Verbatim facts:
- **Jason Ballard**, VP of digital innovations at Toyota — named executive
- Digital innovations group embedded within automotive operations and supply chain
- **Use case #1 — Resource allocation:** previously *"75-odd spreadsheets, 50-plus team members, and hours and hours"* to build supplier/manufacturing plans. New global planning system shrinks team to **6 to 10 planners**.
- **Use case #2 — ETA tracking:** new vehicle management tool *"retires 50 to 100 mainframe screens"*; agent drafts emails to logistics providers and dealerships *"before the team member even comes in in the morning."*
- Platform: public cloud + data hub + services + intelligence layer, accessed through common portal called **"Cube"** and managed via **"Cube Command Center"**
- Headline quote (Ballard): *"The differentiator isn't who has the best algorithm. It's who can embed AI into daily decisions without breaking trust."*
- *"The real value of agentic AI is not in automating existing processes — something many companies did with their initial implementations for incremental gains — but in process redesign."*
- New Toyota function **"Talent & Experiences"** focuses on training, upskilling, engaging team members

**Microsoft Source (Nov 19, 2024):** Toyota deployed AI agents to "harness the collective wisdom of engineers" — system adopted by 800 Toyota engineers.

**TMLS Insights (Jan 29, 2026):** *"Toyota took a different path. They built an enterprise AI team that ships generative AI projects in 3-4 months. They've documented $22 million [in value]."*

**Lesson:** Toyota redesigned the work first, then deployed agents into the redesigned process. The 75-spreadsheet → 6-planner reduction is the clearest agentic-AI productivity number in the literature.

### 27.2 Mapfre (Partially Verified)

The company is genuinely active in agentic AI for insurance, but the framing as a "hybrid human AI agent" canonical case is an inference, not a single named case study.

**What was verified:**
- Mapfre presented at **ITC Vegas 2025** (October 2025) on agentic AI for insurance workflows
- Mapfre's August 2025 study examines how AI will transform the insurance industry by 2035
- Mapfre + Shift Technology partnership (October 2020): *"Shift's claims automation solution uses AI to instantly identify those claims that can be indemnified immediately"* — canonical human-in-the-loop pattern
- Mapfre uses **Google Cloud BigQuery + Looker + Vertex AI**
- Mapfre's MACH architecture migration with Making Science achieved 30% faster time-to-market
- Mapfre uses Datacebo synthetic data for homeowner insurance fraud detection
- Mapfre + EBO AI for customer journey automation

**Strongest "hybrid human AI agent" insurance case study:** Temporal's January 2026 *Trusting AI agents: A reinsurance case study* — multi-agent system with human-in-the-loop safeguards for accurate execution in reinsurance.

### 27.3 Moderna (Verified)

**Phase 1: OpenAI partnership (April 2024)**
- Moderna deployed ChatGPT Enterprise to thousands of employees
- In few months since adoption: deployed more than **750 GPTs** across the company
- 40% of weekly active users created GPTs
- Each user has **120 ChatGPT Enterprise conversations per week** on average
- ~3,000 Moderna employees have access to ChatGPT Enterprise
- Launched mChat in 2023 (own instance of ChatGPT on OpenAI's API) before deploying Enterprise in 2024

**Phase 2: HR + IT merger (May 2025)**
- WSJ (12 May 2025): *"Why Moderna Merged Its Tech and HR Departments"*
- New role: **Chief People and Digital Technology Officer**, helmed by **Tracey Franklin** (former HR chief)
- Former CIO Brad Miller left
- Diginomica (6 June 2025): *"Tracey Franklin assumed the role of Chief People and Digital Technology Officer at the end of last year."*
- Unleash.ai interview: merged HR and IT to "architect the flow of work"

**Lesson:** Moderna is the canonical *organizational-restructure-for-AI* case study. AI agents change the *shape of work itself*, so the org chart had to change to match. The new role signals that AI deployment is no longer an IT function — it's a workforce-design function.

### 27.4 Build vs Buy Statistics

- **McKinsey:** less than 10% of enterprise agents make it beyond pilot stage
- **MIT research:** buy-first strategies had higher pilot success rates, but **build-first strategies** had higher production-scale success rates — bespoke-built agents fit the actual workflow better
- **Dataiku (Sept 2025):** *"Buying gets you quick answers and faster pilots. Building gets you creativity, control, and business impact. Hybrid gives you both, as long as you choose deliberately."*
- **Kore.ai (May 2026):** *"Most enterprises think they're choosing whether to build AI agents. They're actually choosing what to build."*

**Per-layer build-vs-buy decision:**
- **Foundation models:** BUY (never train)
- **Orchestration / agent loop:** BUILD (differentiator)
- **Memory & knowledge graph:** BUILD (too central)
- **Observability:** BUY + self-host (Langfuse, OpenTelemetry) — commodity
- **Sandboxing:** BUY (Daytona, E2B, gVisor) — hard to get right
- **Evaluation:** HYBRID (buy frameworks, build domain-specific evals)

### 27.5 Enterprise Governance

- **Strata.io (May 2026):** HITL is becoming a minimum-viable control
- **Gartner:** by 2029, 70% of enterprises will deploy agentic AI as part of IT infrastructure operations (up from <5% in 2025)
- **ISHIR (2026):** Governance-in-the-Loop > HITL for scale
- **NHIMG (August 2026):** *"Enterprise AI crossed from copilots into production infrastructure in 2025"*
- **FifthRow (April 28, 2026):** *"The final week of April 2026 catalyzed a historic transition in enterprise AI, as global leaders rapidly advanced from isolated agentic AI pilots to production."*

---

## 28. Evaluation Harness

### 28.1 RAGAS (RAG Assessment)

Leading open-source RAG evaluation framework (github.com/explodinggradients/ragas). Key metrics:
- **Faithfulness** — is the answer grounded in retrieved context? (no hallucination)
- **Answer Relevancy** — does the answer address the question?
- **Context Precision** — is the retrieved context relevant?
- **Context Recall** — did we retrieve all necessary information?
- **Context Relevancy** — signal-to-noise ratio of retrieved context

Uses LLM-as-a-judge for most metrics. De-facto standard for RAG evaluation.

### 28.2 DeepEval

Open-source LLM evaluation framework (github.com/confident-ai/deepeval):
- Pytest-style assertions for LLM outputs
- Metrics: hallucination, answer relevance, faithfulness, toxicity, bias
- CI/CD integration
- Custom metric support
- Dataset generation for testing

### 28.3 Agent-as-a-Judge (arXiv:2410.10934, 2024)

Instead of using a simple LLM to evaluate, use a full agent that can execute tools, access files, and perform multi-step reasoning to assess quality. More accurate than LLM-as-a-judge for complex tasks.

Pattern: the judge agent has the same tools as the evaluated agent but is prompted to *critique* rather than *perform*.

### 28.4 SWE-bench & Coding Benchmarks

**SWE-bench** — standard benchmark for coding agents:
- Real GitHub issues from popular Python repos
- Agent must produce a PR that resolves the issue
- Verified by running the repo's test suite
- SWE-bench Lite: 300 issues; SWE-bench Full: 2,294 issues

Other coding benchmarks: HumanEval (basic code generation), MBPP, CodeContests, LiveCodeBench (anti-contamination).

### 28.5 Hallucination Detection

- **Self-consistency** — generate multiple answers, check agreement
- **Faithfulness check** — verify each claim against source documents
- **External fact-checking** — verify claims against knowledge base
- **LLM judge** — separate LLM call to assess factuality
- **Confidence estimation** — model uncertainty as probability

### 28.6 Instruction Following (IFEval)

arXiv:2311.07911 — tests whether LLMs follow formatting instructions (e.g., "respond in exactly 3 paragraphs", "include keywords X, Y, Z"). Verifiable programmatically — no LLM judge needed.

### 28.7 Cost-per-Task Metrics

The new metric is **cost-per-completed-task**, not cost-per-prompt. Tracking:
- Tokens per task (input + output)
- Model invocations per task
- Tool calls per task
- Retries per task
- Total cost per task
- Latency per task

### 28.8 Recommended Evaluation Stack

1. **RAGAS** for RAG pipeline evaluation (faithfulness + relevancy)
2. **DeepEval** for agent output testing in CI
3. **Agent-as-a-Judge** for complex task evaluation
4. **Cost-per-task tracking** via Langfuse
5. **Hallucination detection** — faithfulness check against context
6. **Internal benchmark suite** — system-specific test cases
7. **Regression testing** — never ship a change that degrades evaluation scores

---

## 29. Open Source Ecosystem (Verified 2026)

### 29.1 Memory Frameworks

| Project | GitHub | Key Finding |
|---|---|---|
| **Mem0** | github.com/mem0ai/mem0 | Production-ready, embedding + filtering |
| **Letta (MemGPT)** | github.com/letta-ai/letta | 4-layer hierarchical memory, agent runtime |
| **Zep/Graphiti** | github.com/getzep/graphiti | Temporal knowledge graph for AI agents |
| **Cognee** | github.com/topoteretes/cognee | Self-hosted knowledge graph memory |
| **LangMem** | LangChain ecosystem | ~1.5K stars, hot path + cold path |
| **A-MEM** | github.com/WujiangXu/A-mem | NeurIPS 2025, cited 943×, agentic memory |
| **Generative Agents** | github.com/Shichun-Liu/Agent-Memory-Paper-List | Paper list on Agent Memory |

### 29.2 Agent Frameworks

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **LangGraph** | github.com/langchain-ai/langgraph | ~39.2K | Low-level orchestration, stateful agents |
| **OpenAI Agents SDK** | github.com/openai/openai-agents-python | — | Lightweight, provider-agnostic, multi-agent |
| **CrewAI** | github.com/crewaiinc/crewai | ~25–54K | Role-based teams, 5.2M monthly downloads |
| **Pydantic AI** | github.com/pydantic/pydantic-ai | ~95K | Type safety, validation |
| **Google ADK** | github.com/google/adk-python | — | Code-first Python toolkit |
| **Claude Agent SDK** | github.com/anthropics/claude-agent-sdk-python | — | Claude Code's capabilities |
| **Smolagents** | github.com/huggingface/smolagents | ~26K | HuggingFace minimal agent, ~1000 LOC |

### 29.3 Local AI Infrastructure

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **Ollama** | github.com/ollama/ollama | ~120–172K | Easiest local model runner |
| **llama.cpp** | — | ~70K | C++ inference engine |
| **vLLM** | github.com/vllm-project | ~30K | GPU inference server; 9× throughput vs Ollama |
| **MLX** | github.com/ml-explore/mlx | — | Apple Silicon array framework |
| **LocalAI** | github.com/mudler/localai | — | Open-source AI engine, any model on any hardware |
| **WebLLM** | github.com/mlc-ai/web-llm | ~18.5K | In-browser LLM inference (WebGPU) |
| **Transformers.js** | — | — | HuggingFace in browser |

### 29.4 Browser Automation & Computer Use

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **browser-use** | github.com/browser-use/browser-use | ~60K | AI agent controls browser |
| **Playwright** | github.com/microsoft/playwright | ~88.5K | Multi-browser automation |
| **Stagehand** | github.com/browserbase/stagehand | ~23.8K | 4 primitives: act, extract, observe, agent |
| **Skyvern** | github.com/skyvern-ai/skyvern | ~500+ | Playwright extension with AI |
| **Open Interpreter** | github.com/openinterpreter/openinterpreter | ~60K | Open-source desktop agent |
| **Anthropic Computer Use** | github.com/anthropics/anthropic-quickstarts | — | Claude controls desktop |

### 29.5 Sandbox & Execution

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **E2B** | github.com/e2b-dev/e2b | — | Open-source, Firecracker microVMs |
| **Daytona** | github.com/daytonaio/daytona | ~72K | Secure infrastructure for AI code |
| **gVisor** | github.com/google/gvisor | — | Application kernel for containers |
| **Firecracker** | github.com/firecracker-microvm/firecracker | — | AWS microVMs (Lambda/Fargate) |
| **WebContainer** | github.com/stackblitz/webcontainer-core | — | In-browser dev environments |

### 29.6 RAG & Knowledge

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **LlamaIndex** | github.com/run-llama/llama_index | ~40K | Leading agentic application framework |
| **GraphRAG** | github.com/microsoft/graphrag | ~29.8K | Microsoft, KG-based RAG |
| **LightRAG** | github.com/hkuds/lightrag | — | HKUDS, simple and fast |
| **nano-graphrag** | github.com/gusye1234/nano-graphrag | — | ~1100 LOC minimal GraphRAG |
| **RAGAS** | github.com/explodinggradients/ragas | ~8K | RAG evaluation toolkit |
| **DeepEval** | github.com/confident-ai/deepeval | — | Pytest-style LLM testing |
| **Chroma** | github.com/chroma-core/chroma | ~26K | 90K+ dependents, 11M downloads/month |
| **Qdrant** | github.com/qdrant/qdrant | ~22K | Rust vector search engine |
| **LanceDB** | github.com/lancedb/lancedb | — | Multimodal Lakehouse for AI |
| **Milvus** | — | ~44K | Leading vector DB by stars |

### 29.7 Observability

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **Langfuse** | github.com/langfuse/langfuse | ~10K | MIT, self-host, Postgres+ClickHouse |
| **Arize Phoenix** | github.com/arize-ai/phoenix | — | Apache-2.0, OpenTelemetry-native |
| **Helicone** | github.com/helicone/helicone | — | Proxy-first, $79/mo Pro |

### 29.8 Workflow & Orchestration

| Project | GitHub | Stars (2026) | Key Finding |
|---|---|---|---|
| **Inngest** | github.com/inngest/inngestgo | — | Durable functions, serverless-native |
| **Restate** | github.com/restatedev/restate | — | Low-latency durable execution, no external DB |
| **DBOS** | github.com/dbos-inc | — | Database-native durability |
| **Temporal** | github.com/temporalio/temporal | — | Enterprise-grade durable execution |
| **n8n** | github.com/n8n-io/n8n | ~60K | Fair-code workflow automation, 400+ integrations |
| **Dify** | github.com/langgenius/dify | ~100–122K | Open-source LLM app platform |

### 29.9 Recommended Stack Summary

| Layer | Recommended | Alternative | Rationale |
|---|---|---|---|
| **Memory** | Mem0 | Letta/Zep | Production-ready, embeds + filters, local-first |
| **Agent Framework** | LangGraph | Pydantic AI | Durable execution, checkpointing |
| **Local LLM** | Ollama | llama.cpp/vLLM | Easiest setup, 120K+ stars |
| **Browser Automation** | browser-use | Playwright+Stagehand | 60K+ stars, AI-first |
| **Sandbox** | E2B | Daytona | Purpose-built for AI code |
| **RAG** | LlamaIndex + GraphRAG | LightRAG | LlamaIndex for pipelines, GraphRAG for KG |
| **Vector DB** | Chroma (local) | Qdrant | Local-first, simple |
| **Evaluation** | RAGAS + DeepEval | — | RAGAS for RAG, DeepEval for agents |
| **Observability** | Langfuse (self-host) | Arize Phoenix | MIT, self-host, GenAI tracing |
| **Workflow** | Inngest + Temporal | Restate | Inngest for serverless, Temporal for enterprise |

---

## 30. Research Papers

| Paper | Year | Problem | Idea |
|---|---|---|---|
| **ReAct** | 2022 | Agent needs reasoning + action | Alternating thought and action |
| **Reflexion** (arXiv:2303.11366) | 2023 | Agent learns from failure | Self-reflection after mistakes; 91% on HumanEval |
| **Tree of Thoughts** | 2023 | Complex reasoning | Exploring multiple reasoning paths |
| **Self-Refine** (arXiv:2303.17651) | 2023 | Iterative improvement | Iterative refinement with self-feedback |
| **Voyager** (arXiv:2305.16291) | 2023 | Agent doesn't learn skills | Skill library in Minecraft; lifelong learning |
| **GraphRAG** | 2024 | Holistic understanding of large data | Knowledge graph + community summaries |
| **Self-RAG** | 2023 | RAG generates unsupported claims | Self-reflective retrieval decisions |
| **Corrective RAG** | 02/2024 | Poor retrieval quality | Corrective step after retrieval |
| **Adaptive RAG** | 03/2024 | One-size RAG fails | Adaptive strategy selection |
| **MemGPT** | 2023 | Context window limits | Hierarchical memory management |
| **Toolformer** | 2023 | LLMs don't use tools well | Self-taught tool usage |
| **Generative Agents** (arXiv:2304.03442) | 2023 | Simulating human behavior | Memory + reflection + planning (cited 7101×) |
| **SWE-bench** | 2024 | Evaluating coding agents | Benchmark for real-world bugs |
| **Agent-as-a-Judge** (arXiv:2410.10934) | 2024 | Evaluating agent outputs | Agent evaluates agent |
| **ExpeL** (arXiv:2308.10144, AAAI 2024) | 2024 | LLM agents as experiential learners | Reusable insights from trajectories |
| **DSPy MIPROv2** | 2024–2025 | Manual prompt engineering | Automatic prompt + demo optimization |
| **GEPA** | 2024–2025 | MIPROv2 prompt evolution | Reflective Prompt Evolution |
| **Where LLM Agents Fail** (arXiv:2509.25370, ICML 2025) | 2025 | Failure-memory-augmented agents | Structured archive of past failures |
| **Trajectory Replay** (arXiv:2510.10304) | 2025 | Action-policy improvement | Re-execute past trajectories with stronger model |
| **CER** (ICLR 2025) | 2025 | Counterfactual trajectories | "What if we'd taken the other branch?" |
| **A-MEM** (arXiv:2502.12110) | 2025 (cited 943×) | Static memory systems | Agentic memory that dynamically organizes |
| **Personal World Models** (ICML 2025) | 2025 | User behavior prediction | LLMs as personal world models |
| **IFEval** (arXiv:2311.07911) | 2023 | Instruction following evaluation | Programmatically verifiable |
| **RCR-Router** (arXiv:2508.04903) | 2025 | Context selection in multi-agent | Role-aware context routing |
| **Systematic Analysis of MCP Security** (arXiv:2508.12538) | 2025 | MCP security | Academic systematic analysis |
| **Deterministic Control Plane for LLM Coding Agents** (arXiv:2606.26924) | 2026 | Non-deterministic control | All governance components deterministic |
| **Dynamic Capability Scoping** (arXiv:2607.22445) | 2026 | Least-privilege for agents | Dynamic capability scoping |
| **Checkpoint/Restore Systems** (arXiv:2603.20625) | 2026 | Agent checkpoint/restore | Comprehensive academic survey |
| **How Do AI Agents Spend Your Money?** (arXiv:2604.22750) | 2026 | Token economics | ~1000× tokens for agentic coding |
| **Systems Security Foundations for Agentic Computing** (arXiv:2512.01295) | 2025 | Agent systems security | Short and long-term research problems |
| **Benchmarking Indirect Prompt Injection** (ACM Yi et al.) | 2025 | Indirect injection attacks | Academic benchmark (cited 461×) |

---

## 31. AI Operating System Concepts

### 31.1 Reference Projects

| Project | Description | Maturity | Lesson |
|---|---|---|---|
| **Open Interpreter** | Agent controls computer | Mature | Computer use pattern |
| **AutoGPT** | Self-running agent | Experimental | Goal-driven architecture |
| **AgentGPT** | Browser-based agent | Emerging | UI pattern |
| **MetaGPT** | Multi-agent software company | Emerging | Role-based multi-agent |
| **CrewAI** | Agent teams | Mature | Role-based collaboration |
| **Dify** | LLM app platform | Production | Visual workflow builder (100K+ stars) |
| **n8n** | Workflow automation | Production | Event-driven workflows |
| **Rewind / Limitless** | Life recording | Production | Passive data capture |
| **Mem.ai** | Personal knowledge | Production | Strong memory |
| **ChatGPT** | General assistant | Production | Massive user base |
| **Claude** | Model + artifacts | Production | Excellent code analysis |
| **Cursor** | Coding Agent | Production | Excellent programming experience |
| **Notion AI** | Productivity | Production | Notion integration |
| **Devin** | SWE Agent | Production | Software engineering |

### 31.2 Personal AI OS / Agent OS / Digital Assistant OS Concepts

A personal AI OS combines:
- **Orchestration layer** (LangGraph for durable execution)
- **Memory layer** (Mem0 + multiple memory types)
- **Knowledge layer** (GraphRAG + personal KG)
- **Tool layer** (MCP for tools, A2A for agent-to-agent)
- **Observability layer** (Langfuse for tracing)
- **Local LLM layer** (Ollama for offline)
- **Browser/Sandbox layer** (browser-use + E2B)
- **Evaluation layer** (RAGAS + DeepEval)
- **Self-Improvement layer** (Reflexion + DSPy)
- **Context Engineering layer** (Assembly + Caching + Compression)
- **Protocol layer** (MCP P0 → A2A P2 → AP2 P3 — layered)
- **Reliability layer** (Circuit Breakers + Fallback + Idempotency + Saga)
- **Security layer** (OWASP + Capability Permissions + Audit)
- **Economics layer** (Cost-per-task + Prompt caching + Budget)

### 31.3 Ultimate Architecture

```
┌──────────────────────────────────────────────────────────────┐
│              PERSONAL AI SYSTEM — ULTIMATE ARCHITECTURE       │
├──────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │                  UI LAYER                            │    │
│  │  Chat │ Command Palette │ Artifacts │ Memory UI      │    │
│  │  Knowledge Graph │ Voice │ Notifications │ Timeline  │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │         CONTEXT ENGINEERING LAYER                    │    │
│  │  Assembly Engine │ Compression (LLMLingua)           │    │
│  │  Caching (90% cost cut) │ Routing │ Budget           │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              ORCHESTRATION LAYER                     │    │
│  │  Supervisor Agent │ Planner │ Executor Agents       │    │
│  │  Agent Runtime (LangGraph durable exec)              │    │
│  │  Stateful │ Durable │ Checkpointed │ Resumable       │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      SELF-IMPROVEMENT LAYER                          │    │
│  │  Reflexion │ DSPy/MIPROv2 │ Failure Memory           │    │
│  │  Skill Discovery (Voyager) │ Trajectory Learning     │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              COGNITIVE LAYER                         │    │
│  │  Reasoning (CoT/ToT/ReAct) │ Planning (HTN)         │    │
│  │  Self-Verification │ Confidence │ Hypothesis Testing │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              MEMORY LAYER                            │    │
│  │  Working │ Episodic │ Semantic (KG/GraphRAG)         │    │
│  │  Procedural │ Failure │ Personal/Preference           │    │
│  │  Memory engine: Mem0 (local)                         │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │              KNOWLEDGE LAYER                         │    │
│  │  Personal KG │ GraphRAG │ Entity Extraction (NER)   │    │
│  │  RAG Pipeline (LlamaIndex) │ Reranking │ Verification│    │
│  │  Contradiction Detection │ Provenance │ Versioning  │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      TOOL LAYER — MCP + Hierarchy                    │    │
│  │  Browser (browser-use) │ Code (E2B) │ File System    │    │
│  │  Capability→Domain→Skill→Tool hierarchy              │    │
│  │  ToolPolicy + Sandboxing + Approval gates            │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      MODEL LAYER — Multi-Provider Router             │    │
│  │  Router → Local (Ollama) │ Cloud (Groq/Cerebras/     │    │
│  │  Cloudflare/Gemini/NVIDIA/OpenRouter) │ Fallback     │    │
│  │  Cost-Aware │ Quality-Aware │ Latency-Aware          │    │
│  │  Prompt Caching (90% cost cut)                       │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │    PROTOCOL LAYER                                    │    │
│  │  MCP Client (tools) │ MCP Server (expose)            │    │
│  │  A2A Client (agent delegation) │ AP2 (payments, P3)  │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      RELIABILITY LAYER                               │    │
│  │  Circuit Breaker │ Fallback Chain │ Idempotency      │    │
│  │  Retry + Backoff │ Deterministic Components          │    │
│  │  State Recovery │ Saga Compensation                  │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      SECURITY LAYER                                  │    │
│  │  OWASP Top 10 LLM │ Prompt Injection Defense         │    │
│  │  MCP Tool Poisoning Scan │ Capability Permissions    │    │
│  │  Audit Logs │ Binding HITL │ Secret Isolation        │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      OBSERVABILITY LAYER                             │    │
│  │  Langfuse (self-host) │ Trace IDs │ Token Tracking   │    │
│  │  Cost Tracking │ Latency │ Replay │ OTEL GenAI       │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      EVALUATION LAYER                                │    │
│  │  RAGAS │ DeepEval │ Agent-as-a-Judge │ SWE-bench     │    │
│  │  Hallucination Detection │ Cost-per-Task │ IFEval    │    │
│  └───────────────────────┬─────────────────────────────┘    │
│  ┌───────────────────────▼─────────────────────────────┐    │
│  │      INFRASTRUCTURE LAYER                            │    │
│  │  SQLite │ Chroma (vector) │ GraphRAG │ File Storage │    │
│  │  Docker Sandbox │ Event Bus │ Scheduler (Inngest)    │    │
│  │  Langfuse │ Guardrails                                  │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

---

## 32. Frontier / Experimental Ideas

| Idea | Classification | Description |
|---|---|---|
| AI discovers skills from behavior | Experimental | Analyze patterns → skill creation |
| AI builds workflows automatically | Experimental | "I noticed you do X → created workflow" |
| AI detects recurring errors | Proven | Failure Archive + pattern detection |
| AI creates tools as needed | Research | Dynamic tool creation via code generation |
| AI builds KG automatically | Implemented | GraphRAG from all data |
| AI maintains model of the user | Experimental | Personal world model |
| AI rebuilds plans after failure | Proven | Reflexion pattern |
| AI pauses itself and resumes later | Emerging | Durable execution (LangGraph) |
| AI collaborates with external agents | Emerging | A2A + MCP protocols |
| AI chooses appropriate model | Experimental | Model routing |
| AI monitors itself | Emerging | Langfuse tracing |
| AI learns offline then syncs | Research | Local-first + eventual sync |
| AI has hierarchical memory | Implemented | Letta/MemGPT architecture |
| AI understands user through behavior | Research | Behavioral modeling |
| AI acts as digital twin | Research | Personal digital twin |
| AI detects opportunities | Research | Proactive opportunity detection |

---

## 33. Unknown Unknowns

| Idea | Description | Why it matters |
|---|---|---|
| **Energy Monitoring** | Monitor device energy consumption | Adapt to battery |
| **Context Switching Intelligence** | Know when user switches between tasks | Auto-save context |
| **Emotional State Detection** | Detect mood from writing style | Adapt responses |
| **Time Perception** | Understand "quickly" and "later" relatively | Plan per user style |
| **Delegation Intelligence** | Know when to ask vs decide | Don't bother with questions |
| **Learning Velocity** | Measure user's learning speed | Suggest learning styles |
| **Social Graph Awareness** | Understand social relationships | Help with networking |
| **Dead Letter Queue** | Failed tasks nobody noticed | Auto-revisit |
| **Graceful Degradation** | When API credits run out | Auto-switch to local |
| **Explainability** | Explain why a decision was made | Build trust |
| **Agent Insurance/Liability** | Who's responsible if agent errs? | Legal framework |
| **Agent Marketplace** | Market to buy/sell agents | Distribution |
| **Mandate Systems** | Digital contracts between user and agent | Trust framework |
| **Deterministic Agent Components** | Parts that don't depend on LLM | Reliability |
| **Agent Composition Patterns** | How to compose agents together | Architecture |

---

## Appendix A: Implementation Roadmap (Phased)

### Phase 1 — Foundation (Months 1-2)
- Context Engineering Layer (Assembly + Caching + Compression)
- Memory System (Mem0 + SQLite + Chroma vector)
- Tool Calling (MCP basics)
- RAG Pipeline (LlamaIndex + Hybrid + GraphRAG)
- Basic Agent (ReAct pattern)
- Observability (Langfuse self-host)
- Model Router (Local Ollama + Cloud providers)
- Cost Tracking (Langfuse token tracking)
- Prompt Caching (Anthropic + OpenAI)
- LLM-driven Reasoner + Planner
- Real SSE streaming
- Integration with existing systems

### Phase 2 — Intelligence (Months 3-4)
- Knowledge Graph (GraphRAG + NER entity extraction)
- Browser Automation (browser-use + Playwright)
- Proactive Intelligence (event system + scheduler)
- Personalization (dual-stream memory, user modeling)
- Code Execution (E2B sandbox)
- Local LLM (Ollama + Llama 4 integration)
- Security hardening (OWASP + MCP tool poisoning scan)
- Evaluation Harness (RAGAS + DeepEval)
- MCP Server (expose tools to other agents)
- Enable Approval gates (remove auto-approve)

### Phase 3 — Autonomy (Months 5-8)
- Multi-Agent System (LangGraph supervisor + specialists)
- Skills System (Voyager-inspired: discover + store + compose)
- Long-Term Autonomy (LangGraph durable execution)
- Computer Use (Anthropic CU API)
- Self-Improvement (Reflexion + DSPy/MIPROv2 + failure memory)
- Advanced RAG (Self-RAG, Corrective RAG, Agentic RAG)
- Intelligent Model Routing (cost + quality + latency aware)
- Agent-as-a-Judge evaluation
- A2A Client (inter-agent delegation)

### Phase 4 — Evolution (Months 9-12)
- Digital Twin (personal world model)
- Voice Interface (Whisper + Piper TTS local)
- A2A Server (publish Agent Card)
- AP2 Integration (agent payments — if needed)
- Advanced Personalization (adaptive personality)
- Continuous Learning (trajectory replay + experience)
- Production Deployment
- Community Features (optional)

---

## Appendix B: Key Source URLs

### Context Engineering
- https://www.langchain.com/blog/context-engineering-for-agents
- https://sourcegraph.com/blog/context-engineering
- https://pub.towardsai.net/state-of-context-engineering-in-2026
- https://www.llmlingua.com
- https://platform.claude.com/docs/en/build-with-claude/prompt-caching
- https://www.prompthub.us/blog/prompt-caching-with-openai-anthropic-and-google-models
- https://arxiv.org/pdf/2508.04903 (RCR-Router)
- https://www.morphllm.com/llm-context-window-comparison

### Research Intelligence
- https://openai.com/index/introducing-deep-research/
- https://docs.perplexity.ai
- https://ai.google.dev/gemini-api/docs/deep-research
- https://github.com/EvolvingLMMs-Lab/literature-review-agent

### Evaluation
- https://github.com/explodinggradients/ragas
- https://github.com/confident-ai/deepeval
- https://www.swebench.com
- https://arxiv.org/abs/2410.10934 (Agent-as-a-Judge)
- https://arxiv.org/abs/2311.07911 (IFEval)

### Personalization
- https://openai.com/index/memory-and-new-controls-for-chatgpt
- https://www.letta.com/blog/agent-memory
- https://mem0.ai/compare/mem0-vs-letta
- https://www.ibm.com/think/topics/ai-personalization
- https://hai.stanford.edu/policy/simulating-human-behavior-with-ai-agents
- https://icml.cc/virtual/2025/poster/44620 (Personal World Models)
- https://dspy.ai/api/optimizers/MIPROv2
- https://dspy.ai/getting-started/gepa-optimization
- https://www.parloa.com/labs/insights/the-hidden-layer-of-personalization-in-ai-agents
- https://www.ttclabs.net/research/understanding-users-views-on-ai-personalization

### Self-Improvement
- https://arxiv.org/abs/2303.11366 (Reflexion)
- https://arxiv.org/abs/2303.17651 (Self-Refine)
- https://arxiv.org/abs/2305.16291 (Voyager)
- https://arxiv.org/abs/2308.10144 (ExpeL)
- https://arxiv.org/abs/2509.25370 (Failure Memory, ICML 2025)
- https://arxiv.org/html/2510.10304v1 (Trajectory Replay)
- https://yitaoliu17.com/assets/pdf/ICLR_2025_CER.pdf (CER)
- https://github.com/Peiyang-Song/Awesome-LLM-Reasoning-Failures
- https://dspy.ai
- https://github.com/stanfordnlp/dspy
- https://machinelearning.apple.com/research/reinforced-agent-inference-feedback

### Long-Term Autonomy
- https://docs.langchain.com/oss/python/langgraph/persistence
- https://temporal.io/blog/build-resilient-agentic-ai-with-temporal
- https://temporal.io/blog/announcing-openai-agents-sdk-integration
- https://www.inngest.com/blog/durable-execution-key-to-harnessing-ai-agents
- https://www.restate.dev/blog/building-a-modern-durable-execution-engine-from-first-principles
- https://www.dbos.dev/blog/durable-execution-crashproof-ai-agents
- https://pydantic.dev/articles/pydantic-ai-dbos
- https://arxiv.org/html/2603.20625v1 (Checkpoint/Restore Systems)
- https://www.diagrid.io/blog/checkpoints-are-not-durable-execution-why-langgraph-crewai-google-adk-and-others-fall-short-for-production-agent-workflows
- https://addyosmani.com/blog/long-running-agents

### Protocols
- https://modelcontextprotocol.io
- https://spec.modelcontextprotocol.io
- https://github.com/modelcontextprotocol/servers
- https://github.com/punkpeye/awesome-mcp-servers
- https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
- https://github.com/a2aproject/A2A
- https://agent2agent.info
- https://www.linuxfoundation.org/press/linux-foundation-launches-the-agent2agent-protocol-project
- https://www.linuxfoundation.org/press/a2a-protocol-surpasses-150-organizations
- https://docs.cloud.google.com/agent-registry/json-schemas
- https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol
- https://www.linuxfoundation.org/press/linux-foundation-welcomes-the-agntcy-project
- https://www.nist.gov/news-events/news/2026/02/announcing-ai-agent-standards-initiative

### Agent Economics
- https://fortune.com/2026/05/26/uber-coo-ai-spending-tokens-claude-code
- https://www.cockroachlabs.com/blog/agentic-ai-costs-at-scale
- https://www.forbes.com/sites/janakirammsv/2026/05/17/uber-burns-its-2026-ai-budget-in-four-months-on-claude-code
- https://digitaleconomy.stanford.edu/news/how-are-ai-agents-spending-your-tokens
- https://arxiv.org/abs/2604.22750 (How Do AI Agents Spend Your Money?)
- https://docs.helicone.ai/guides/cookbooks/cost-tracking
- https://www.bigeye.com/blog/how-to-track-ai-agent-costs-and-token-usage
- https://www.businessinsider.com/sam-altman-addresses-ai-spending-concerns-capex-2026-6
- https://www.cnbc.com/2025/08/18/altman-ai-bubble-openai.html
- https://www.finops.org/wg/optimizing-genai-usage
- https://oplexa.com/ai-inference-cost-crisis-2026
- https://cloud.google.com/transform/roi-of-ai-how-agents-help-business
- https://pickaxe.co/post/ai-agent-roi-metrics-formulas
- https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai
- https://olakai.ai/blog/ai-pilot-to-production

### Enterprise
- https://www.deloitte.com/us/en/insights/topics/technology-management/tech-trends/2025/toyota-digital-transformation-ai.html
- https://news.microsoft.com/source/asia/features/toyota-is-deploying-ai-agents-to-harness-the-collective-wisdom-of-engineers-and-innovate-faster
- https://tmlsinsights.substack.com/p/toyotas-agentic-ai-playbook-how-a
- https://www.mapfre.com/en/communicate/innovation-communicate/future-interaction-society-tomorrow-mapfre-analyzes-role-insurance
- https://www.shift-technology.com/resources/news/mapfre-and-shift-technology-join-forces-to-reinvent-the-customer-claims-experience
- https://cloud.google.com/customers/mapfre
- https://temporal.io/blog/trusting-ai-agents-a-reinsurance-case-study
- https://www.wsj.com/articles/why-moderna-merged-its-tech-and-hr-departments-95318c2a
- https://www.forbes.com/sites/solrashidi/2025/08/28/modernas-game-changing-reorg-merging-hr-and-it-under-one-umbrella
- https://openai.com/index/moderna
- https://www.ishir.com/blog/329275/human-in-the-loop-is-not-enough-why-governance-in-the-loop-is-becoming-the-new-standard-for-ai-agent-risk-management.htm
- https://www.kore.ai/blog/build-vs-buy-ai-agents-enterprise-architecture
- https://www.dataiku.com/blog/build-vs-buy-for-ai-agents

### Reliability
- https://docs.litellm.ai/blog/redis-circuit-breaker
- https://medium.com/@wasowski.jarek/building-reliable-ai-agents-catalog-of-15-production-patterns-agentic-design-patterns-3cff554cbb70
- https://www.buildmvpfast.com/blog/graceful-degradation-ai-agents-fallback-model-unavailable-2026
- https://towardsdatascience.com/llm-fallbacks-break-agent-pipelines-i-built-the-missing-recovery-layer
- https://www.linkedin.com/posts/arpitbhayani_ai-agents-will-retry-they-will-always-retry-activity-7474080563595870209-74UJ
- https://www.buildmvpfast.com/blog/idempotent-ai-agent-retry-safe-patterns-production-workflow-2026
- https://www.linkedin.com/pulse/deterministic-guardrails-nondeterministic-agents-andrew-mallaband-hn14e
- https://www.civic.com/news/deterministic-guardrails-for-ai-agent-security
- https://www.arthur.ai/blog/best-practices-for-building-agents-guardrails
- https://arxiv.org/html/2606.26924v1 (Deterministic Control Plane)
- https://learn.microsoft.com/en-us/azure/architecture/patterns/saga
- https://temporal.io/blog/mastering-saga-patterns-for-distributed-transactions-in-microservices
- https://ranthebuilder.cloud/blog/agentic-coding-hooks-deterministic-ai-guardrails

### Observability
- https://opentelemetry.io/docs/specs/semconv/gen-ai
- https://github.com/open-telemetry/semantic-conventions-genai
- https://www.datadoghq.com/blog/llm-otel-semantic-convention
- https://langfuse.com/resources/engineering/langsmith-alternative
- https://www.morphllm.com/comparisons/langfuse-vs-langsmith
- https://langfuse.com/docs/observability/features/token-and-cost-tracking
- https://langfuse.com/blog/2024-07-ai-agent-observability-with-langfuse
- https://cresta.com/blog/observability-for-ai-agents-tracing-multi-service-llm-pipelines-with-langfuse
- https://www.digitalapplied.com/blog/ai-agent-observability-2026-tracing-monitoring-stack-guide

### Security
- https://owasp.org/www-project-top-10-for-large-language-model-applications
- https://genai.owasp.org/llm-top-10
- https://genai.owasp.org/llmrisk/llm01-prompt-injection
- https://www.microsoft.com/en-us/msrc/blog/2025/07/how-microsoft-defends-against-indirect-prompt-injection-attacks
- https://www.crowdstrike.com/en-us/blog/indirect-prompt-injection-attacks-hidden-ai-risks
- https://unit42.paloaltonetworks.com/ai-agent-prompt-injection
- https://dl.acm.org/doi/10.1145/3690624.3709179 (Benchmarking Indirect Prompt Injection)
- https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
- https://www.cyberark.com/resources/threat-research-blog/poison-everywhere-no-output-from-your-mcp-server-is-safe
- https://arxiv.org/html/2508.12538v1 (Systematic Analysis of MCP Security)
- https://www.redhat.com/en/blog/model-context-protocol-mcp-understanding-security-risks-and-controls
- https://www.elastic.co/security-labs/mcp-tools-attack-defense-recommendations
- https://adversa.ai/resources/mcp-security-top-25-mcp-vulnerabilities
- https://supertokens.com/blog/auth-for-ai-agents
- https://labs.cloudsecurityalliance.org/agentic/agentic-identity-governance-framework-v1
- https://www.okta.com/identity-101/how-to-implement-least-privilege-for-ai-agents
- https://www.cerbos.dev/blog/mcp-and-zero-trust-securing-ai-agents-with-identity-and-policy
- https://arxiv.org/html/2607.22445v1 (Dynamic Capability Scoping)
- https://www.kiteworks.com/regulatory-compliance/human-in-the-loop-ai-compliance
- https://arxiv.org/html/2512.01295v1 (Systems Security Foundations for Agentic Computing)
- https://blaxel.ai/blog/ai-sandbox
- https://www.augmentcode.com/guides/agent-execution-sandbox
- https://www.armosec.io/blog/what-is-ai-agent-sandboxing-kubernetes-native-enforcement-explained
- https://developer.nvidia.com/blog/practical-security-guidance-for-sandboxing-agentic-workflows-and-managing-execution-risk

### Open Source Ecosystem
- https://github.com/mem0ai/mem0
- https://github.com/letta-ai/letta
- https://github.com/getzep/graphiti
- https://github.com/topoteretes/cognee
- https://github.com/WujiangXu/A-mem
- https://github.com/langchain-ai/langgraph
- https://github.com/openai/openai-agents-python
- https://github.com/crewaiinc/crewai
- https://github.com/pydantic/pydantic-ai
- https://github.com/google/adk-python
- https://github.com/anthropics/claude-agent-sdk-python
- https://github.com/huggingface/smolagents
- https://github.com/ollama/ollama
- https://github.com/vllm-project
- https://github.com/ml-explore/mlx
- https://github.com/mudler/localai
- https://github.com/mlc-ai/web-llm
- https://github.com/browser-use/browser-use
- https://github.com/microsoft/playwright
- https://github.com/browserbase/stagehand
- https://github.com/skyvern-ai/skyvern
- https://github.com/openinterpreter/openinterpreter
- https://github.com/e2b-dev/e2b
- https://github.com/daytonaio/daytona
- https://github.com/google/gvisor
- https://github.com/firecracker-microvm/firecracker
- https://github.com/stackblitz/webcontainer-core
- https://github.com/run-llama/llama_index
- https://github.com/microsoft/graphrag
- https://github.com/hkuds/lightrag
- https://github.com/gusye1234/nano-graphrag
- https://github.com/explodinggradients/ragas
- https://github.com/confident-ai/deepeval
- https://github.com/chroma-core/chroma
- https://github.com/qdrant/qdrant
- https://github.com/lancedb/lancedb
- https://github.com/langfuse/langfuse
- https://github.com/arize-ai/phoenix
- https://github.com/helicone/helicone
- https://github.com/inngest/inngestgo
- https://github.com/restatedev/restate
- https://github.com/dbos-inc
- https://github.com/temporalio/temporal
- https://github.com/n8n-io/n8n
- https://github.com/langgenius/dify

---

## Final Synthesis

A personal AI system can be built today from off-the-shelf open-source components. **The challenge is not the existence of the technologies — it's their integration.** The system needs a multi-layered architecture combining the best of each domain, with:

- **Context Engineering** as a critical new layer (write/select/compress/isolate)
- **Self-Improvement** as an evolutionary capability (Reflexion + DSPy + Voyager + Failure Memory)
- **Durable Execution** for long-term autonomy (LangGraph + Temporal + Inngest + Restate + DBOS)
- **Cost-per-task economics** as the binding business-model constraint (5–30× token multiplier, prompt caching, budget tiers)
- **OWASP Top 10 + Capability Permissions** as the trust backbone
- **MCP (P0) → A2A (P2) → AP2 (P3)** as the layered protocol stack

All three pillars (Personalization, Self-Improvement, Long-Term Autonomy) form a **closed self-improvement loop**: personalization models the user → produces reward signal → self-improvement optimizes agent behavior → produces new skills/prompts needing durable storage → long-term autonomy carries both across crashes, restarts, and human pauses. Building them in isolation produces three mediocre subsystems; building them together produces a single compounding self-improving personal AI.

**Total source base:** 500+ verified URLs across 7 research files (4,979 lines), with every `[FACT]` claim sourced to a primary doc (official docs, arXiv paper, or vendor blog), every `[RESEARCH RESULT]` sourced to secondary analyses, and every `[INFERENCE]`/`[RECOMMENDATION]` clearly marked as architect's synthesis.
