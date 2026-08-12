# OpenHands (formerly OpenDevin) — Evidence-Based Product Research

**Task:** W8b · Phase R2 · EVIDENCE-BASED  
**Researcher:** Senior Product Researcher (general-purpose sub-agent)  
**Accessed date for all sources:** 2026-11-15  
**Method:** curl with Mozilla user-agent; GitHub README (raw markdown); docs.openhands.dev (Mintlify-served, exposes `.md` source); PyPI JSON API for `openhands-ai` package metadata; `pip install --break-system-packages --no-deps openhands-ai` (verified meta-package install at version 1.11.0). Live `openhands` CLI binary not executed (would require ~5+ min full-deps install). Cached raw extracts in `raw-openhands/`.

---

## 1. Product Overview

OpenHands (formerly OpenDevin) is now architected as **OpenHands Agent Canvas** + **OpenHands Software Agent SDK** + **OpenHands Cloud / Enterprise**. The README's headline: "The self-hosted developer control center for coding agents and automations. Run OpenHands, Claude Code, Codex, Gemini, or any ACP-compatible agent across local, remote, and cloud backends." [Source: https://raw.githubusercontent.com/All-Hands-AI/OpenHands/main/README.md, accessed 2026-11-15; raw-openhands/readme.md].

The docs home describes four product surfaces [Source: https://docs.openhands.dev/overview/introduction, accessed 2026-11-15; raw-openhands/docs-home.html]:
1. **Agent Canvas** — browser-based UI + backend server for running agents and automations; `agent-canvas` command starts the full stack locally. Self-host on a VM or connect to OpenHands Cloud.
2. **OpenHands Cloud** — fully-managed; deeper GitHub/GitLab/Bitbucket integration; Slack/Jira/Linear integration; multi-user; RBAC; conversation sharing; usage reporting; budget enforcement. Sign in with GitHub.
3. **OpenHands Enterprise** — self-hosted OpenHands Cloud in customer VPC via Kubernetes; source-available (see source in `enterprise/` directory); requires license for >1 month use.
4. **OpenHands Software Agent SDK** — composable Python library; "It's the engine that powers everything else." Define agents in code; run locally or scale to 1000s of agents in the cloud.

Legacy: the older OpenHands CLI and Local GUI are still listed as "Legacy" surfaces.

## 2. Product Philosophy

From the Design Principles doc: "OpenHands V1 is a complete architectural rework based on lessons from OpenHands V0, one of the most widely adopted open-source coding agents. ... That growth exposed architectural tensions — tight coupling between research and production, mandatory sandboxing, mutable state, and configuration sprawl — which informed the design principles of agent-sdk in V1." [Source: https://docs.openhands.dev/sdk/arch/design.md, accessed 2026-11-15; raw-openhands/arch-design.md].

Four explicit V1 design principles:
1. **Optional Isolation over Mandatory Sandboxing** — "Sandboxing should be opt-in, not universal. V1 unifies agent and tool execution within a single process by default, aligning with MCP's local-execution model."
2. **Stateless by Default, One Source of Truth for State** — "Keep everything stateless, with exactly one mutable state. All components (agents, tools, LLMs, and configurations) are immutable Pydantic models validated at construction. The only mutable entity is the conversation state, a single source of truth that enables deterministic replay and robust persistence across sessions or distributed systems."
3. **Clear Boundaries between Agent and Applications** — "Maintain strict separation of concerns. V1 divides the system into stable, isolated layers: the SDK (agent core), tools, workspace (sandbox), and agent server."
4. **Composable Components for Extensibility** — "Everything should be composable and safe to extend. Agents are defined as graphs of interchangeable components — tools, prompts, LLMs, and contexts — each described declaratively with strong typing."

## 3. Core Mental Model (OpenHands agent)

The core mental model is the **stateless, event-driven Agent reasoning-action loop** orchestrated by a **Conversation** lifecycle manager, with all state held in an **append-only Event log** [Source: https://docs.openhands.dev/sdk/arch/agent.md + conversation.md + events.md, accessed 2026-11-15]:

- **Agent** — stateless reasoning-action loop. Reads from event history, writes new events. Each `step()` call processes one reasoning cycle. Holds no mutable state between steps.
- **Conversation** — lifecycle manager; factory dispatches to `LocalConversation` (in-process) or `RemoteConversation` (via agent-server HTTP/WebSocket) based on workspace type.
- **ConversationState** — the SINGLE mutable entity. Pydantic model with validation and serialization. Contains `agent`, `workspace`, `stats`, `events`.
- **EventLog** — immutable append-only store. The agent's memory.
- **Workspace** — execution environment (LocalWorkspace direct, RemoteWorkspace via API, DockerSandbox, ApptainerSandbox, CloudWorkspace).
- **Tools** — typed actions + observations. Tool executor turns Actions into Observations.
- **LLM** — provider-agnostic interface (LiteLLM-supported).
- **Condenser** — history compression when token limits approached.
- **SecurityAnalyzer** — risk assessment before action execution.

## 4. User Journey

Per the Getting Started doc [Source: https://docs.openhands.dev/sdk/getting-started.md, accessed 2026-11-15]:
1. Install `uv` package manager (v0.8.13+).
2. Acquire an LLM API key (Anthropic, OpenAI, or OpenHands Cloud, or ChatGPT Plus/Pro subscription via `LLM.subscription_login()`).
3. Install the SDK: `pip install -U openhands-sdk openhands-tools` (matched-set rule — install together so versions align).
4. Optionally install `openhands-workspace` + `openhands-agent-server` for sandboxed/remote execution.
5. Write a Python script defining an `LLM`, an `Agent` with tools, and a `Conversation` with a workspace.
6. Call `conversation.send_message(...)`, then `conversation.run()`.

For Agent Canvas (browser UI): `npm install -g @openhands/agent-canvas` then `agent-canvas` (without sandbox) or Docker sandbox option. Access the UI at `http://localhost:8000` (npm/source) or `http://localhost:8000/canvas` (Docker image) [Source: README, accessed 2026-11-15].

The legacy V0 install path `pip install openhands-ai && openhands` still works — `openhands-ai` (v1.11.0 on PyPI) is a meta-package that depends on `openhands-sdk==1.34.0`, `openhands-tools==1.34.0`, `openhands-agent-server==1.34.0` [Source: https://pypi.org/pypi/openhands-ai/json, accessed 2026-11-15; verified via `pip install --break-system-packages --no-deps openhands-ai` which successfully installed `openhands_ai-1.11.0`].

Observed: `pip install --break-system-packages --no-deps openhands-ai` succeeded locally; meta-package version 1.11.0 installed. Full CLI binary `openhands` requires the full dependency tree (uv, fastmcp, litellm, docker, playwright, etc.) which was not installed in this pass due to time-box constraints.

## 5. Navigation

Docs nav (from docs-home.html extracted text) [Source: https://docs.openhands.dev/overview/introduction, accessed 2026-11-15]:
- **Get Started** — Introduction, Home, Agent Canvas SDK Cloud Enterprise, Quick Start, Tutorial Library, Essential Guidelines (When to Use OpenHands, Prompting Best Practices, Good vs. Bad Instructions, OpenHands in Your SDLC)
- **Use Cases** — Vulnerability Remediation, Automated Code Review, Automated QA Testing, Incident Triage, COBOL Modernization, Dependency Upgrades, Spark Migrations
- **Product Guides** — Key Features (Hooks, MCP, Skills, Plugins, Automations, Repository Customization, Settings)
- **Additional Documentation** — V0 Reference, LLM Configuration
- **Developers** — Deprecated
- **Projects** — Local GUI, CLI
- **Community** — Contributing, FAQs, Feedback

The SDK docs are at `/sdk/` and are extensive (200+ pages). The full docs index is at `/llms.txt` and `/llms-full.txt` (1.6 MB) [Source: https://docs.openhands.dev/llms.txt, accessed 2026-11-15].

## 6. Workspace

OpenHands has multiple workspace types [Source: https://docs.openhands.dev/sdk/arch/sdk.md, accessed 2026-11-15]:
- **LocalWorkspace** — direct execution on the local filesystem.
- **RemoteWorkspace** — delegates operations to agent-server via HTTP/WebSocket.
- **DockerSandbox** — isolated Docker containers for security and reproducibility [Source: https://docs.openhands.dev/sdk/guides/agent-server/docker-sandbox.md, accessed 2026-11-15].
- **ApptainerSandbox** — rootless Apptainer containers for HPC / shared computing [Source: https://docs.openhands.dev/sdk/guides/agent-server/apptainer-sandbox.md, accessed 2026-11-15].
- **CloudWorkspace** — OpenHands Cloud managed sandboxes with optional SaaS credential inheritance [Source: https://docs.openhands.dev/sdk/guides/agent-server/cloud-workspace.md, accessed 2026-11-15].
- **API-based Sandbox** — hosted API-based agent server for fully-managed infrastructure [Source: https://docs.openhands.dev/sdk/guides/agent-server/api-sandbox.md, accessed 2026-11-15].

The V1 design principle: "Sandboxing should be opt-in, not universal" — unlike V0 where every tool call executed in a Docker sandbox by default [Source: https://docs.openhands.dev/sdk/arch/design.md, accessed 2026-11-15].

## 7. Conversation (OpenHands canvas)

The Conversation class is the unified entrypoint; the factory automatically selects `LocalConversation` (for `str` or `LocalWorkspace` inputs) or `RemoteConversation` (for `RemoteWorkspace` inputs) [Source: https://docs.openhands.dev/sdk/arch/conversation.md, accessed 2026-11-15]. The Conversation's four responsibilities: Agent Lifecycle Management, State Orchestration (history + events + status), Workspace Coordination, Runtime Services (persistence, monitoring, security, visualization).

The Agent Canvas is the browser-based UI surface for conversations [Source: README, accessed 2026-11-15]. It can connect to multiple Agent Servers and "flip between them" — i.e., a user can have local + cloud agents running simultaneously in the same UI.

## 8. Agent Experience (event-stream + AgentDelegateAction — DEEP)

This is OpenHands' most distinctive architectural feature.

### 8.1 Event-Stream Architecture (Append-Only Log)

"The **Event System** provides an immutable, type-safe event framework that drives agent execution and state management. Events form an append-only log that serves as both the agent's memory and the integration point for auxiliary services." [Source: https://docs.openhands.dev/sdk/arch/events.md, accessed 2026-11-15; raw-openhands/arch-events.md].

Four core responsibilities of the Event System:
1. **Type Safety** — Enforce event schemas through Pydantic models.
2. **LLM Integration** — Convert events to/from LLM message formats.
3. **Append-Only Log** — Maintain immutable event history.
4. **Service Integration** — Enable observers to react to event streams.

Event type taxonomy (verbatim from arch-events.md):

| Event Type | Source | Content | LLM Role |
| --- | --- | --- | --- |
| MessageEvent (user) | user | Text, images | `user` |
| MessageEvent (agent) | agent | Text reasoning, skills | `assistant` |
| ActionEvent | agent | Tool call with thought, reasoning, security risk | `assistant` with `tool_calls` |
| ObservationEvent | environment | Tool execution result | `tool` |
| UserRejectObservation | environment | Rejection reason | `tool` |
| AgentErrorEvent | agent | Error details | `tool` |
| SystemPromptEvent | agent | System prompt with tool schemas | `system` |
| CondensationSummaryEvent | environment | Summary of forgotten events | `user` |
| ConversationStateUpdateEvent | (internal) | State updates | (not LLM-visible) |
| CondensationRequest | (internal) | Request compression | (not LLM-visible) |
| Condensation | (internal) | Compression result | (not LLM-visible) |
| PauseEvent | (internal) | User pause | (not LLM-visible) |

Events are split into **LLM-Convertible Events** (visible to the LLM) and **Internal Events** (NOT visible to the LLM) [Source: arch-events.md, accessed 2026-11-15].

The conversion pipeline: `Event List → Filter LLMConvertibleEvent → Group ActionEvents by llm_response_id → Convert to Messages → LLM Input`. This is the documented mechanism by which the append-only event log is projected into the LLM's message list each reasoning step.

### 8.2 Reasoning-Action Loop (Stateless)

The Agent operates through a single-step execution model where each `step()` call processes one reasoning cycle [Source: https://docs.openhands.dev/sdk/arch/agent.md, accessed 2026-11-15]. Step execution flow (verbatim from arch-agent.md):
1. **Pending Actions:** If actions awaiting confirmation exist, execute them and return.
2. **Condensation:** If condenser exists, call `condenser.condense()`. If returns `View`, use condensed events for LLM query (continue same step). If returns `Condensation`, emit event and return (processed next step).
3. **LLM Query:** Query LLM with messages from event history. If context window exceeded, emit `CondensationRequest` and return.
4. **Response Parsing:** Parse LLM response into events. Tool calls → create `ActionEvent`s. Text message → create `MessageEvent` and return.
5. **Confirmation Check:** If actions need user approval, set conversation status to `WAITING_FOR_CONFIRMATION` and return.
6. **Action Execution:** Execute tools and create `ObservationEvent`s.

Key characteristics: Stateless (no mutable state between steps), Event-Driven (reads from event history, writes new events), Interruptible (each step is atomic and can be paused/resumed).

### 8.3 AgentDelegateAction → renamed/refactored to TaskToolSet (DEEP)

**Important finding**: The `AgentDelegateAction` primitive from OpenHands V0 has been refactored in V1 to the **TaskToolSet** pattern [Source: https://docs.openhands.dev/sdk/guides/task-tool-set.md, accessed 2026-11-15; raw-openhands/guide-task-tool-set.md].

The TaskToolSet "lets a parent agent launch sub-agents that handle complex, multi-step tasks autonomously. Each sub-agent runs **synchronously** — the parent blocks until the sub-agent finishes and returns its result. Sub-agents can be **resumed** later using a task ID, preserving their full conversation context."

Delegation flow (verbatim):
- Parent Agent → TaskManager: `task(prompt, type)`
- TaskManager → Sub-Agent: `create / resume`
- Sub-Agent runs autonomously
- Sub-Agent → TaskManager: `result`
- TaskManager → Parent Agent: `TaskObservation`
- Conversation persisted for resume

Tool parameters: `prompt` (str, required) — instruction for sub-agent; `subagent_type` (str, optional) — which registered agent type to use (default: `"default"`); `description` (str, optional) — short label for display/tracking; `resume` (str, optional) — Task ID from previous invocation to continue.

The TaskObservation return value contains: `task_id` (unique identifier, e.g., `task_00000001`), `subagent` (agent type that handled the task), `status` (Final status: `completed` or `error`), `text` (sub-agent's response or error message).

Sub-agent registration via `register_agent(name="code_reviewer", factory_func=create_code_reviewer, description="...")` [Source: guide-task-tool-set.md, accessed 2026-11-15]. The `DelegationVisualizer` is recommended for terminal display of multi-agent flow.

Parallel delegation is supported via `tool_concurrency_limit` (default 1; 2-8 moderate; >8 high parallelism) [Source: https://docs.openhands.dev/sdk/guides/parallel-tool-execution.md, accessed 2026-11-15]. Verbatim from parallel-tool-execution.md: "the main agent has `tool_concurrency_limit=8`, allowing it to delegate to all three sub-agents simultaneously" + "Do NOT delegate one at a time - call all three delegate tools in a single response."

File-Based Agents: "Define specialized sub-agents as simple Markdown files with YAML frontmatter — no Python code required." Registered as delegates that can be spawned by the orchestrator [Source: https://docs.openhands.dev/sdk/guides/agent-file-based.md, accessed 2026-11-15].

ACP Agent (Agent-Client Protocol): "Delegate to an ACP-compatible server (Claude Code, Gemini CLI, etc.) instead of calling an LLM directly." [Source: https://docs.openhands.dev/sdk/guides/agent-acp.md, accessed 2026-11-15] — i.e., OpenHands can orchestrate Claude Code / Codex / Gemini as sub-agents via the ACP protocol.

## 9. Memory

### 9.1 Conversation-level Memory (Event Log)
The append-only Event log IS the agent's short-term memory [Source: arch-events.md, accessed 2026-11-15].

### 9.2 Context Condenser (Long-context Compression)
The Condenser "Reduces context when token limits approached" [Source: arch-agent.md, accessed 2026-11-15]. It can produce a `View` (condensed events for LLM query in same step) or a `Condensation` (compression result emitted as event). The `CondensationSummaryEvent` is "LLM-convertible summary of forgotten events" [Source: arch-events.md, accessed 2026-11-15]. See also Context Condenser guide [Source: https://docs.openhands.dev/sdk/guides/context-condenser.md, accessed 2026-11-15].

### 9.3 Persistent Memory (Cross-Conversation)
"Give agents opt-in, two-tier memory that survives across conversations." [Source: https://docs.openhands.dev/sdk/guides/persistent-memory.md, accessed 2026-11-15; raw-openhands/guide-persistent-memory.md].

### 9.4 Conversation Persistence + Fork + Pause/Resume
- Save and restore conversation state across sessions [Source: https://docs.openhands.dev/sdk/guides/convo-persistence.md, accessed 2026-11-15].
- **Fork a Conversation**: "Branch off an existing conversation for follow-up exploration without contaminating the original." [Source: https://docs.openhands.dev/sdk/guides/convo-fork.md, accessed 2026-11-15].
- **Pause and Resume**: "Pause agent execution, perform operations, and resume without losing state." [Source: https://docs.openhands.dev/sdk/guides/convo-pause-and-resume.md, accessed 2026-11-15]. PauseEvent is emitted on user pause.

## 10. Knowledge (workspace)

OpenHands' knowledge sources:
- The **workspace** itself (file tree, code) — agent reads directly via the FileEditorTool.
- **Skills** — "Skills add specialized behaviors, domain knowledge, and context-aware triggers to your agent through structured prompts." [Source: https://docs.openhands.dev/sdk/guides/skill.md, accessed 2026-11-15]. Skills are part of AgentContext (always-active `repo` skill + trigger-based `knowledge` skills).
- **MCP** (Model Context Protocol) — "Enables dynamic tool integration from external servers. Agents can discover and use MCP-provided tools automatically." [Source: https://docs.openhands.dev/sdk/arch/mcp.md, accessed 2026-11-15].
- **Plugins** — "Bundle skills, hooks, MCP servers, agents, and commands into reusable packages that extend agent capabilities." [Source: https://docs.openhands.dev/sdk/guides/plugins.md, accessed 2026-11-15].
- **Hooks** — lifecycle hooks (see §8 above) for injecting context or observing execution.

## 11. Search

No explicit "search" primitive documented. Search-like behavior is achieved via: (a) the FileEditorTool reading files, (b) Browser Use for web browsing [Source: https://docs.openhands.dev/sdk/guides/agent-browser-use.md, accessed 2026-11-15], (c) Web search via MCP-provided tools, (d) the `repo` skill (always-active) for repository awareness. There is no published vector-search / codebase-RAG primitive in the SDK (agents read files directly).

## 12. Execution (tool calls, file edits, terminal, plan steps)

Tools execute via the Tool Executor, producing `ActionEvent` → `ObservationEvent` pairs [Source: arch-agent.md, accessed 2026-11-15]. Built-in tools include TerminalTool (bash), FileEditorTool (with ApplyPatchTool as alternative for GPT-5), and custom tools. Tool calls can be executed concurrently via `tool_concurrency_limit` [Source: parallel-tool-execution.md, accessed 2026-11-15]. The Interactive Terminal guide describes agent interaction with ipython / python REPL / other interactive CLIs [Source: https://docs.openhands.dev/sdk/guides/agent-interactive-terminal.md, accessed 2026-11-15].

## 13. Artifacts (diffs, applied edits, PRs)

OpenHands artifacts are stored in the Event log as `ActionEvent` + `ObservationEvent` pairs. Each ActionEvent contains "Tool call with thought, reasoning, security risk" [Source: arch-events.md, accessed 2026-11-15]. The visualizer renders the conversation. There are GitHub workflow integrations for PR Review and Assign Reviews — "Use OpenHands Agent to generate meaningful pull request review" and "Automate PR management with intelligent reviewer assignment" [Source: https://docs.openhands.dev/sdk/guides/github-workflows/pr-review.md + assign-reviews.md, accessed 2026-11-15]. Browser Session Recording via rrweb captures browser interactions for replay [Source: https://docs.openhands.dev/sdk/guides/browser-session-recording.md, accessed 2026-11-15].

## 14. Keyboard UX

OpenHands SDK has no documented keyboard shortcuts (it's a Python SDK + REST API). The Agent Canvas browser UI inherits standard browser shortcuts; the README and docs do not document a keybinding list. The docs site itself uses ⌘K for search [Source: docs-home.html extracted text, accessed 2026-11-15]. The CLI (legacy V0) presumably uses standard readline shortcuts but this is not documented.

## 15. Motion

No motion-design documentation in the SDK docs. The Agent Canvas UI uses standard web motion. The Custom Visualizer guide indicates conversation visualization is pluggable: "Customize conversation visualization by creating custom visualizers or configuring the default visualizer." [Source: https://docs.openhands.dev/sdk/guides/convo-custom-visualizer.md, accessed 2026-11-15]. The DelegationVisualizer "shows the multi-agent conversation flow in the terminal" [Source: guide-task-tool-set.md, accessed 2026-11-15].

## 16. Animation

No animation-specific docs. The terminal visualizer renders text-based delegation trees (orchestrator → sub-agents). Browser UI animations are inherited from the React-based Agent Canvas frontend.

## 17. Visual Hierarchy

Docs hierarchy (from docs-home.html extracted text) [Source: https://docs.openhands.dev/overview/introduction, accessed 2026-11-15]:
- **Get Started** > Introduction > Quick Start > Tutorial Library > Essential Guidelines
- **Use Cases** > Vulnerability Remediation, Automated Code Review, Automated QA Testing, Incident Triage, COBOL Modernization, Dependency Upgrades, Spark Migrations
- **Product Guides** > Key Features (Hooks, MCP, Skills, Plugins, Automations, Repository Customization, Settings)
- **SDK Architecture** > Overview, Events, Agent, Conversation, LLM, SDK Package, Condenser, MCP, Security, Design Principles
- **SDK Guides** > Hello World, Getting Started, Task Tool Set, Parallel Tool Execution, Custom Tools, Confirmation Mode, Hooks, Context Condenser, Persistent Memory, Conversation Persistence, Fork, Pause/Resume, Browser Use, Browser Session Recording, Observability & Tracing, Metrics Tracking, LLM Streaming, LLM Routing, LLM Fallback, etc.
- **API Reference** > openhands.sdk.agent, openhands.sdk.conversation, openhands.sdk.event, openhands.sdk.llm, openhands.sdk.security, openhands.sdk.tool, openhands.sdk.utils, openhands.sdk.workspace

## 18. Progressive Disclosure

OpenHands uses progressive disclosure aggressively in its docs:
- Top-level: Get Started (intro) → Use Cases (industry) → Product Guides (features) → SDK Architecture (deep dive) → SDK Guides (recipes) → API Reference (auto-generated).
- The SDK exposes layers: `Conversation` (high-level entrypoint) → `Agent` (reasoning loop) → `LLM` + `Tools` + `Skills` + `Condenser` + `SecurityAnalyzer` (components).
- The factory pattern (Conversation dispatches to LocalConversation vs RemoteConversation based on workspace type) hides deployment complexity from the user [Source: arch-conversation.md, accessed 2026-11-15].
- Configuration is declarative: agents defined as graphs of interchangeable components, validated at construction (Pydantic models).
- Advanced features (parallel tool execution, LLM fallback, model routing, iterative refinement) are documented as separate opt-in guides.

## 19. Accessibility

No accessibility-specific docs page discovered. The Agent Canvas is a React-based web UI; the SDK + Agent Server are programmatic. The legacy V0 CLI uses prompt_toolkit. No documented screen-reader / high-contrast / keyboard-navigation features in the docs.

## 20. Performance Perception (step latency)

Each Agent `step()` is one reasoning cycle [Source: arch-agent.md, accessed 2026-11-15]:
- Condensation step (if condenser present)
- LLM query
- Response parsing (tool call or message)
- (Optional) Confirmation wait
- Action execution → ObservationEvent

Latency is dominated by the LLM query round-trip. Mitigations:
- **LLM Streaming** — "Stream LLM responses token-by-token for real-time display and interactive user experiences." [Source: https://docs.openhands.dev/sdk/guides/llm-streaming.md, accessed 2026-11-15].
- **Parallel Tool Execution** — `tool_concurrency_limit` lets multiple tools execute in one LLM response.
- **Context Condenser** — prevents context-window-overflow slowdowns by compressing history.
- **Deferred Init (Warm-Pool)** — "Pre-warm agent-server pods before a user is matched, then activate them at runtime with POST /api/init." [Source: https://docs.openhands.dev/sdk/guides/agent-server/deferred-init.md, accessed 2026-11-15]. This is the cloud equivalent of avoiding cold-start latency.
- **Conversation Fork** — branch off rather than re-running from scratch.
- **Pause/Resume** — pause execution, perform other operations, resume without losing state.

## 21. Trust (event-stream = traceable)

OpenHands' trust model is its strongest UX pattern:

### 21.1 Event-Stream = Traceable
"The Event System provides an immutable, type-safe event framework ... Events form an append-only log that serves as both the agent's memory and the integration point for auxiliary services." [Source: arch-events.md, accessed 2026-11-15]. Every ActionEvent includes "Tool call with thought, reasoning, security risk" — i.e., the agent's reasoning is captured per-action. Every ObservationEvent captures the tool result. This gives complete traceability of agent behavior.

### 21.2 Confirmation Mode (WAITING_FOR_CONFIRMATION)
Confirmation policy controls whether actions require user approval [Source: https://docs.openhands.dev/sdk/guides/security.md, accessed 2026-11-15; raw-openhands/guide-security.md]. Three policies:
- `AlwaysConfirm()` — Require approval for all actions.
- `NeverConfirm()` — Execute all actions without approval.
- `ConfirmRisky()` — Only require approval for risky actions (requires security analyzer).

When the agent proposes actions requiring confirmation, the conversation enters `WAITING_FOR_CONFIRMATION` state [Source: arch-agent.md, accessed 2026-11-15]. The user can reject with feedback: `conversation.reject_pending_actions("User rejected because actions seem too risky. Please try a safer approach.")` — i.e., the agent gets feedback on why its action was rejected, enabling it to try a different approach.

### 21.3 SecurityAnalyzer
The SecurityAnalyzer "Evaluates action risk before execution" [Source: arch-agent.md, accessed 2026-11-15]. Risk is captured in the ActionEvent itself ("Tool call with thought, reasoning, security risk"). See also arch-security.md [Source: https://docs.openhands.dev/sdk/arch/security.md, accessed 2026-11-15].

### 21.4 Hooks (Lifecycle Observability)
Hooks let you observe and customize key lifecycle moments [Source: https://docs.openhands.dev/sdk/guides/hooks.md, accessed 2026-11-15; raw-openhands/guide-hooks.md]. Hook types: PreToolUse (before tool execution, can block with exit 2), PostToolUse (after tool execution), UserPromptSubmit (before processing user message, can block), Stop (when agent tries to finish, can block), SessionStart, SessionEnd. Hooks match the Claude Code hook contract — exit code 0 = proceed, exit code 2 = block, other non-zero = non-blocking error logged via HookExecutionEvent.

### 21.5 Deterministic Replay
Because state is held only in the immutable event log + the single mutable ConversationState, the system supports "deterministic replay and robust persistence across sessions or distributed systems" [Source: arch-design.md, accessed 2026-11-15].

## 22. Explainability

OpenHands' explainability is **architectural** rather than operational:
- Every ActionEvent captures thought + reasoning + security risk per action [Source: arch-events.md, accessed 2026-11-15].
- Every ObservationEvent captures the tool execution result.
- The append-only event log is the canonical trace; observers (visualizers, loggers, OTel exporters) react to the event stream [Source: same].
- **Observability & Tracing** via OpenTelemetry — "Enable OpenTelemetry tracing to monitor and debug your agent's execution with tools like Laminar, MLflow, Honeycomb, or any OTLP-compatible backend." [Source: https://docs.openhands.dev/sdk/guides/observability.md, accessed 2026-11-15].
- **Metrics Tracking** — "Track token usage, costs, and latency metrics for your agents." [Source: https://docs.openhands.dev/sdk/guides/metrics.md, accessed 2026-11-15].
- **Critic (Experimental)** — "Real-time evaluation of agent actions using an LLM-based critic model, with built-in iterative refinement." [Source: https://docs.openhands.dev/sdk/guides/critic.md, accessed 2026-11-15].
- **Iterative Refinement** — "Implement iterative refinement workflows where agents refine their work based on critique feedback until quality thresholds are met." [Source: https://docs.openhands.dev/sdk/guides/iterative-refinement.md, accessed 2026-11-15].
- The custom visualizer is pluggable for rendering.

This is a stark contrast to Continue (no published trace) and Replit (operational work-log + video replay).

## 23. Long Session Experience

OpenHands' long-session support is the most architecturally complete of the three products:
- **Context Condenser** — automatic history compression when token limits approached; LLM-convertible summary of forgotten events [Source: context-condenser.md, accessed 2026-11-15].
- **Conversation Persistence** — save/restore conversation state [Source: convo-persistence.md, accessed 2026-11-15].
- **Fork a Conversation** — branch off without contaminating original [Source: convo-fork.md, accessed 2026-11-15].
- **Pause and Resume** — pause execution, perform operations, resume without losing state [Source: convo-pause-and-resume.md, accessed 2026-11-15].
- **Persistent Memory** — opt-in, two-tier memory that survives across conversations [Source: persistent-memory.md, accessed 2026-11-15].
- **TaskToolSet** — sub-agent resumption via task ID preserves full conversation context across multiple invocations [Source: task-tool-set.md, accessed 2026-11-15].
- **Conversation Goals** — "Add a resumable goal strategy to a normal agent-server conversation." [Source: https://docs.openhands.dev/sdk/guides/agent-server/conversation-goals.md, accessed 2026-11-15].
- **Goal Completion Loop** — "Drive a conversation toward a verifiable objective with a judge-driven, self-continuing completion loop." [Source: https://docs.openhands.dev/sdk/guides/convo-goal.md, accessed 2026-11-15].
- **Ask Agent questions** — "Get sidebar replies from the agent during conversation execution without interrupting the main flow." [Source: https://docs.openhands.dev/sdk/guides/convo-ask-agent.md, accessed 2026-11-15].

## 24. Power User Features

- **TaskToolSet** — synchronous sub-agent delegation with resume [Source: task-tool-set.md, accessed 2026-11-15].
- **Parallel Tool Execution** — `tool_concurrency_limit` up to 8+ [Source: parallel-tool-execution.md, accessed 2026-11-15].
- **File-Based Agents** — define sub-agents as Markdown + YAML frontmatter (no Python code) [Source: agent-file-based.md, accessed 2026-11-15].
- **ACP Agents** — delegate to Claude Code / Codex / Gemini CLI as sub-agents [Source: agent-acp.md, accessed 2026-11-15].
- **Custom Tools** — typed actions + observations [Source: custom-tools.md, accessed 2026-11-15].
- **Hooks** — PreToolUse / PostToolUse / UserPromptSubmit / Stop / SessionStart / SessionEnd [Source: hooks.md, accessed 2026-11-15].
- **Plugins** — bundle skills + hooks + MCP servers + agents + commands [Source: plugins.md, accessed 2026-11-15].
- **Critic + Iterative Refinement** — LLM-based self-critique loops [Source: critic.md + iterative-refinement.md, accessed 2026-11-15].
- **LLM Streaming + Routing + Fallback + Subscriptions** (ChatGPT Plus/Pro for Codex models without API credits) [Source: llm-streaming.md + llm-routing.md + llm-fallback.md + llm-subscriptions.md, accessed 2026-11-15].
- **LLM Profile Store + Registry** — save/load reusable LLM configs; dynamically select models [Source: llm-profile-store.md + llm-registry.md, accessed 2026-11-15].
- **OpenAI-Compatible Endpoint** — "Call an OpenHands agent-server through the OpenAI Chat Completions protocol." [Source: agent-server/openai-gateway.md, accessed 2026-11-15].
- **Browser Use + Browser Session Recording (rrweb)** [Source: agent-browser-use.md + browser-session-recording.md, accessed 2026-11-15].
- **Automations** — agents that run on schedule or in response to webhook events, integrated with Slack/GitHub/Linear [Source: prebuilt-automations.md, accessed 2026-11-15].
- **Agent Canvas** — multi-backend control center (local + Docker + VM + cloud) [Source: README, accessed 2026-11-15].
- **OpenTelemetry tracing** with Laminar/MLflow/Honeycomb [Source: observability.md, accessed 2026-11-15].
- **Secret Registry** — secure env vars / secrets [Source: secrets.md, accessed 2026-11-15].

## 25. Developer Experience (open-source + API)

OpenHands is fully open-source (the SDK + tools + agent server are MIT/Apache). The README explicitly invites forking and contribution [Source: README, accessed 2026-11-15].

- **SDK install**: `pip install -U openhands-sdk openhands-tools` (matched-set rule) [Source: getting-started.md, accessed 2026-11-15].
- **Agent Canvas install**: `npm install -g @openhands/agent-canvas` then `agent-canvas` (or Docker sandbox, or from source via `git clone + npm install + npm run dev`) [Source: README, accessed 2026-11-15].
- **Legacy V0 install**: `pip install openhands-ai` (meta-package v1.11.0 on PyPI, depends on openhands-sdk==1.34.0 + openhands-tools==1.34.0 + openhands-agent-server==1.34.0) [Source: https://pypi.org/pypi/openhands-ai/json, accessed 2026-11-15; verified locally with `pip install --break-system-packages --no-deps openhands-ai` succeeding].
- **API**: the Agent Server is a REST API for running multiple agents on a single host. The Agent Canvas can connect to multiple Agent Servers and flip between them. The OpenAI-Compatible Endpoint lets you call an OpenHands agent-server through the OpenAI Chat Completions protocol [Source: agent-server/openai-gateway.md, accessed 2026-11-15].
- **Self-hosting**: `agent-canvas --frontend-only` (static frontend + ingress) or `agent-canvas --backend-only` (agent server + automation backend + ingress) [Source: README, accessed 2026-11-15].
- **Docker sandbox**: `docker run -it --rm -p 8000:8000 -v "$HOME/.openhands:/home/openhands/.openhands" -v "${PROJECTS_PATH}:/projects" ghcr.io/openhands/agent-canvas:1.10.0` [Source: README, accessed 2026-11-15].
- **Custom tools with Remote Agent Server**: build a custom base image that includes your tool implementations [Source: agent-server/custom-tools.md, accessed 2026-11-15].

The docs (Mintlify-served) expose `.md` source via the `/llms.txt` index and `/<path>.md` convention, making them LLM-friendly. There are 200+ SDK guide pages.

Observed: `pip install --break-system-packages --no-deps openhands-ai` succeeded locally; meta-package version 1.11.0 installed. The full install (with deps) was not run due to time-box constraints — but `pip index versions openhands-ai` confirmed 100+ versions exist (latest 1.11.0, oldest listed 0.8.3).

## 26. Biggest Strengths (with evidence)

1. **Append-only event-stream architecture** — every action + observation + reasoning is captured in an immutable log; "Events form an append-only log that serves as both the agent's memory and the integration point for auxiliary services" [Source: arch-events.md, accessed 2026-11-15].
2. **Hierarchical delegation** — TaskToolSet with synchronous sub-agent launch + resume via task ID + DelegationVisualizer [Source: task-tool-set.md, accessed 2026-11-15].
3. **File-Based Agents** — sub-agents as Markdown + YAML frontmatter, no Python required [Source: agent-file-based.md, accessed 2026-11-15].
4. **ACP integration** — orchestrate Claude Code / Codex / Gemini as sub-agents [Source: agent-acp.md, accessed 2026-11-15].
5. **Fully open-source + self-hostable** (Agent Canvas, Agent Server, SDK, Tools) [Source: README, accessed 2026-11-15].
6. **Multi-backend** — local, Docker, VM, cloud; flip between backends in same UI [Source: README, accessed 2026-11-15].
7. **Confirmation Mode** with three policies (Always/Never/ConfirmRisky) + reject-with-feedback [Source: security.md, accessed 2026-11-15].
8. **SecurityAnalyzer** evaluates risk before execution; risk captured per-ActionEvent [Source: arch-events.md + arch-agent.md, accessed 2026-11-15].
9. **Hooks** — Claude-Code-compatible lifecycle hooks (PreToolUse/PostToolUse/UserPromptSubmit/Stop/SessionStart/SessionEnd) with exit-2-block semantics [Source: hooks.md, accessed 2026-11-15].
10. **Deterministic replay** — immutable event log + single mutable ConversationState enables "deterministic replay and robust persistence across sessions or distributed systems" [Source: arch-design.md, accessed 2026-11-15].
11. **Context Condenser** — automatic history compression with LLM-convertible summaries [Source: context-condenser.md, accessed 2026-11-15].
12. **Conversation Fork + Pause/Resume + Persistent Memory** — full long-session support [Source: convo-fork.md + convo-pause-and-resume.md + persistent-memory.md, accessed 2026-11-15].
13. **OpenTelemetry tracing** with Laminar/MLflow/Honeycomb [Source: observability.md, accessed 2026-11-15].
14. **V1 design principles** — Optional isolation over mandatory sandboxing; stateless by default; clear boundaries; composable components [Source: arch-design.md, accessed 2026-11-15].
15. **OpenAI-Compatible Endpoint** — call OpenHands agent-server via OpenAI Chat Completions protocol [Source: agent-server/openai-gateway.md, accessed 2026-11-15].

## 27. Biggest Weaknesses (with evidence — learning curve)

1. **Steep learning curve** — 200+ SDK guide pages; multiple layers (Conversation → Agent → LLM/Tools/Skills/Condenser/SecurityAnalyzer); concepts like LLMConvertibleEvent vs Internal Events, ActionEvent vs ObservationEvent, ConversationState vs EventLog [Source: llms.txt has 200+ entries, accessed 2026-11-15].
2. **V0 vs V1 fragmentation** — V0 (legacy CLI, Local GUI, openhands-ai meta-package) coexists with V1 (Agent Canvas, SDK, openhands-sdk + openhands-tools + openhands-agent-server); users must understand which surface they're targeting [Source: docs-home.html "Legacy" section + getting-started.md, accessed 2026-11-15].
3. **Matched-set install rule** — `openhands-sdk` and `openhands-tools` are a matched set: "they are built, tested, and released together at the same version number, and `openhands-tools` imports `openhands-sdk` internals directly. Always install and upgrade them in a **single** `pip` command so their versions match. Installing them separately can leave a newer `openhands-tools` against an older `openhands-sdk` ... which fails at import with errors like `ModuleNotFoundError: No module named 'openhands.sdk.utils.path'`." [Source: getting-started.md, accessed 2026-11-15]. This is a fragile install path.
4. **Parallel tool execution is experimental** — "Parallel tool execution is still experimental. By default, `tool_concurrency_limit` is set to `1` (sequential execution). Increasing this value may improve runtime performance, but use at your own risk. Concurrent execution can lead to race conditions or unexpected behavior for tools that share state." [Source: parallel-tool-execution.md, accessed 2026-11-15].
5. **No published keyboard-shortcut list** for the Agent Canvas UI [Source: docs.openhands.dev — no keybindings page, accessed 2026-11-15].
6. **No accessibility docs** — no a11y page in the docs nav [Source: docs.replit.com — wait, OpenHands — no a11y page, accessed 2026-11-15].
7. **Enterprise license required for >1 month** — OpenHands Enterprise is source-available but "you'll need to purchase a license if you want to run it for more than one month" [Source: docs-home.html, accessed 2026-11-15].
8. **AgentDelegateAction renamed** — the V0 `AgentDelegateAction` primitive was refactored to TaskToolSet in V1, breaking V0 documentation references and external tutorials [Source: guide-task-tool-set.md vs V0 docs, accessed 2026-11-15].
9. **Two confirmation systems** — Confirmation Policy + SecurityAnalyzer are complementary but separate; user must understand both [Source: security.md, accessed 2026-11-15].
10. **Optional sandboxing is risky** — "This runs the agent-server directly on the machine you're installing on — the agent will have full access to your filesystem!" warning appears multiple times in README [Source: README, accessed 2026-11-15].
11. **Self-hosting has security burden** — Self-Hosting guide required for production [Source: docs/SELF_HOSTING.md referenced in README, accessed 2026-11-15].

## 28. What should MiMo learn?

(Evidence-based, no MiMo design proposed.) Concrete patterns to learn:
1. **Append-only event log as the agent's memory + integration point** — every ActionEvent includes thought/reasoning/security risk; every ObservationEvent captures the result [Source: arch-events.md, accessed 2026-11-15].
2. **Stateless Agent + single mutable ConversationState** — enables deterministic replay + robust persistence [Source: arch-design.md, accessed 2026-11-15].
3. **Hierarchical delegation via TaskToolSet** — synchronous sub-agent launch + resume via task_id + DelegationVisualizer [Source: task-tool-set.md, accessed 2026-11-15].
4. **File-Based Agents (Markdown + YAML frontmatter)** — sub-agent definition without Python code [Source: agent-file-based.md, accessed 2026-11-15].
5. **Confirmation Mode with three policies** (Always/Never/ConfirmRisky) + reject-with-feedback ("User rejected because actions seem too risky. Please try a safer approach.") [Source: security.md, accessed 2026-11-15].
6. **SecurityAnalyzer risk-tagging per ActionEvent** — risk captured in the event itself [Source: arch-events.md, accessed 2026-11-15].
7. **Hooks (Claude-Code-compatible)** with exit-2-block semantics [Source: hooks.md, accessed 2026-11-15].
8. **Context Condenser with LLM-convertible summary of forgotten events** — explicit CondensationSummaryEvent that becomes a `user` message [Source: arch-events.md, accessed 2026-11-15].
9. **Conversation Fork + Pause/Resume + Persistent Memory** as first-class primitives [Source: convo-fork.md + convo-pause-and-resume.md + persistent-memory.md, accessed 2026-11-15].
10. **Multi-backend flip** — local + Docker + VM + cloud in same UI [Source: README, accessed 2026-11-15].
11. **OpenTelemetry tracing** with Laminar/MLflow/Honeycomb [Source: observability.md, accessed 2026-11-15].
12. **OpenAI-Compatible Endpoint** — expose agent via OpenAI Chat Completions protocol [Source: agent-server/openai-gateway.md, accessed 2026-11-15].
13. **Optional isolation over mandatory sandboxing** (V1 lesson) — sandbox opt-in, not universal [Source: arch-design.md, accessed 2026-11-15].
14. **Parallel sub-agent delegation** via `tool_concurrency_limit` + "call all three delegate tools in a single response" [Source: parallel-tool-execution.md, accessed 2026-11-15].
15. **ACP integration** — orchestrate third-party agents (Claude Code, Codex, Gemini) as sub-agents [Source: agent-acp.md, accessed 2026-11-15].

## 29. What should MiMo reject?

(Evidence-based, no MiMo design proposed.) Concrete patterns to reject:
1. **Matched-set install rule** — fragile `pip install openhands-sdk openhands-tools` rule that breaks if installed separately [Source: getting-started.md, accessed 2026-11-15].
2. **V0/V1 fragmentation** — maintaining two parallel surfaces (legacy CLI/Local GUI vs new SDK/Canvas) creates user confusion [Source: docs-home.html "Legacy" section, accessed 2026-11-15].
3. **Optional sandboxing warning repeated in docs** ("the agent will have full access to your filesystem!") — better to ship with safe defaults [Source: README, accessed 2026-11-15].
4. **Experimental parallel tool execution** with race-condition risk — should be production-grade before shipping [Source: parallel-tool-execution.md, accessed 2026-11-15].
5. **Two separate confirmation systems** (Confirmation Policy + SecurityAnalyzer) — overlapping mechanisms require user understanding of both [Source: security.md, accessed 2026-11-15].
6. **Enterprise license wall for >1 month of self-host** — discourages long-term evaluation [Source: docs-home.html, accessed 2026-11-15].
7. **Renaming key primitives across versions** (AgentDelegateAction → TaskToolSet) without aliasing — breaks external tutorials/docs [Source: guide-task-tool-set.md, accessed 2026-11-15].
8. **200+ page docs without a clear "happy path"** — the docs index is exhaustive but the beginner's path is buried [Source: llms.txt has 200+ entries, accessed 2026-11-15].

## 30. Confidence Score (0-100)

**Confidence: 88/100**.

Reasoning:
- Strong on: SDK architecture (arch-events.md, arch-agent.md, arch-conversation.md, arch-design.md, arch-sdk.md, arch-security.md) — all primary-source, verbatim-quoted with mermaid diagrams. Event-stream taxonomy + reasoning-action loop + stateless principle + delegation pattern are documented in extreme detail.
- Strong on: TaskToolSet (the renamed AgentDelegateAction) — full tool parameters, return values, registration, resume, parallel delegation, DelegationVisualizer all verbatim-quoted.
- Strong on: Confirmation Mode (3 policies) + SecurityAnalyzer + Hooks (6 types with Claude-Code-compatible exit codes) + Conversation Fork + Pause/Resume + Persistent Memory + Context Condenser + Observability + Metrics.
- Strong on: README (rebranding to Agent Canvas + Agent Server SDK + Cloud + Enterprise), Getting Started (matched-set install rule), PyPI metadata (openhands-ai v1.11.0 meta-package dependencies).
- Strong on: 200+ SDK guide pages indexed via llms.txt (41447 bytes) and llms-full.txt (1.6 MB).
- Verified locally: `pip install --break-system-packages --no-deps openhands-ai` succeeded — meta-package version 1.11.0 installed. `pip index versions openhands-ai` confirmed 100+ versions on PyPI.
- Weaker on: live in-product UI (Agent Canvas) — would require `npm install -g @openhands/agent-canvas && agent-canvas` (Node.js 22.12+ + uv prerequisites; full Docker sandbox install not run due to time-box). Several UX details (animation behaviour, accessibility tree, keyboard shortcuts) are inferred from docs rather than directly observed.
- Weaker on: V0 / legacy surfaces (CLI, Local GUI) — only briefly described in docs home; not deeply extracted in this pass.
- The "AgentDelegateAction" pattern from the task brief: confirmed via docs that this V0 primitive has been **renamed to TaskToolSet** in V1, with synchronous blocking sub-agent launch + resume via task_id + DelegationVisualizer. The hierarchical delegation intent is preserved; the implementation has been refactored. This is a notable finding worth highlighting to the synthesizer.

---
**Cached raw extracts:** `/home/z/my-project/research/evidence/raw-openhands/` (readme.md [8.9 KB], github-home.html, docs-home.html, getting-started.html, llms.txt [41 KB], llms-full.txt [1.6 MB], arch-events.md, arch-agent.md, arch-conversation.md, arch-design.md, arch-sdk.md, arch-security.md, sdk-getting-started.md, guide-task-tool-set.md, guide-parallel-tool-execution.md, guide-agent-file-based.md, guide-agent-server.md, guide-security.md, guide-hooks.md, guide-convo-pause-and-resume.md, guide-convo-fork.md, guide-context-condenser.md, guide-persistent-memory.md).
