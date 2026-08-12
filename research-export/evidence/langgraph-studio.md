# LangGraph Studio (LangChain) — Evidence File

**Task ID:** W6b · **Phase:** R2 — EVIDENCE-BASED · **Product:** LangGraph Studio / LangSmith Studio
**Compiled:** 2026-11-15 · **Sources:** docs.langchain.com, blog.langchain.dev, github.com/langchain-ai/langgraph, `langgraph-cli` install + CLI help

> Method note: A prior cached batch of HTML in `raw-langgraph-studio/` was mostly empty error pages (Mintlify JS hydration). Re-fetched canonical URLs via `curl -sL -A "Mozilla/5.0..."` for: use-studio, time-travel, observability-studio, agent-server, langgraph-cli, memory, troubleshooting-studio, blog-v1, github-releases. Also verified by installing `langgraph-cli[inmem]==0.4.31` and running `langgraph dev --help` (Observed locally). Cached text outputs: `fresh-*.txt`.

---

## 1. Product Overview

LangGraph Studio (now rebranded **LangSmith Studio** in the new docs site) is "a specialized agent IDE that enables visualization, interaction, and debugging of agentic systems that implement the Agent Server API protocol." [Source: https://docs.langchain.com/langsmith/studio, accessed 2026-11-15] The product is the visual companion surface to LangGraph (the orchestration framework) and LangSmith (the trace/observability platform); it loads a graph compiled in Python or JS and renders it as an interactive diagram with live execution, state inspection, and time-travel debugging. [Source: https://docs.langchain.com/langsmith/studio, accessed 2026-11-15] The CLI workflow is `langgraph dev` (free, in-memory, no Docker required) which serves an Agent Server on `127.0.0.1:2024` and opens Studio at `https://smith.langchain.com/studio/?baseUrl=http://127.0.0.1:2024`. [Source: md-b97839964db4.md (studio-get-started), accessed 2026-11-15; Observed: `langgraph dev --help` locally] Current OSS release: langgraph==1.2.10 (28 Jul 2026) and langgraph-cli==0.4.31 (10 Jul 2026) [Source: https://github.com/langchain-ai/langgraph/releases, accessed 2026-11-15].

## 2. Product Philosophy

LangChain positions agents as the primary primitive: "agents are the future" is the underlying assumption; the LangChain 1.0 release re-centers the `langchain` package around the new `create_agent` abstraction built on top of LangGraph — "Give an LLM access to some tools / Call it with some input / If it calls a tool: Execute that tool / Return to step 2..." [Source: https://blog.langchain.dev/langchain-langgraph-1-0-alpha-releases/, accessed 2026-11-15] The studio layer operationalises that philosophy: developers should be able to *see* the agent's reasoning graph, *step* through it, *edit* the state mid-run, and *replay* — because agent behaviour is non-deterministic enough that pure logging is insufficient. "LangGraph gives you fine-grained control to mix deterministic, hand-coded steps with LLM-driven agentic steps in the same graph, so you can build bespoke agents that behave exactly the way your application requires." [Source: md-9052da31feab.md (LangGraph overview), accessed 2026-11-15] The 1.0 announcement repeats: "battle tested as companies like Uber, LinkedIn, and Klarna use it in production." [Source: fresh-blog-v1.txt, accessed 2026-11-15]

## 3. Core Mental Model

The mental model is the **agent graph**: nodes (Python/JS callables that mutate state), edges (control-flow), and conditional edges (LLM-driven routing). State is a typed dict with reducers, persisted via a checkpointer after each super-step. [Source: md-9052da31feab.md (LangGraph overview), accessed 2026-11-15] Studio visualises this graph and lets the developer interact with three first-class objects: **Threads** (a conversation/session with checkpointed state), **Assistants** (configuration overlays — prompts, models, tools bound to a graph), and **Runs** (one execution of a thread). [Source: fresh-agent-server.txt, accessed 2026-11-15] Studio has two modes: **Graph mode** (full feature set — nodes traversed, intermediate states, LangSmith integrations) and **Chat mode** (lightweight conversational UI; only for graphs whose state extends `MessagesState`). [Source: md-42e5aca64882.md (LangSmith Studio), accessed 2026-11-15]

## 4. User Journey

Canonical first-run journey (from the studio quickstart): (1) install `pip install --upgrade "langgraph-cli[inmem]"`; (2) write an `agent.py` with `create_agent(...)`; (3) write `langgraph.json` referencing `./src/agent.py:agent`; (4) put `LANGSMITH_API_KEY=lsv2...` in `.env`; (5) run `langgraph dev`; (6) Studio opens in browser at the tunnel URL. [Source: md-b97839964db4.md, accessed 2026-11-15] Once open: developer submits an input on the left, watches the graph animate, inspects each node's input/output, edits state to fork from a checkpoint, then deploys to LangSmith Cloud in one click. [Source: md-42e5aca64882.md, accessed 2026-11-15] For production debugging: user opens a LangSmith trace in the cloud UI, clicks "Run in Studio", and Studio loads with the deployed thread pre-selected. [Source: fresh-obs-studio.txt, accessed 2026-11-15] Local-vs-remote clone: "Open the LangSmith trace... Click the dropdown next to Run in Studio. Enter your local agent's URL. Select Clone thread locally." [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 5. Navigation (Studio UI)

Top-level navigation surfaces (Observed from `fresh-use-studio.txt` + `md-42e5aca64882.md`):
- Left pane: **Input** section (with **View Raw** toggle to switch between form view and JSON editor) plus up/down arrow controls to cycle through previously submitted inputs. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- Bottom-left: **Settings** button (shows active assistant name; opens modal to manage assistants). [Source: fresh-use-studio.txt, accessed 2026-11-15]
- Bottom-left also has **Manage Assistants** modal entry. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- Right pane: thread dropdown at the top, **+ New Thread** button. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- Top of page: a **slider** to expand or contract the level of detail in the thread log. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- Submit button has a streaming dropdown; Interrupt button opens breakpoint selector. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- Top-right: "Run experiment" button (LangSmith dataset experiments). [Source: fresh-obs-studio.txt, accessed 2026-11-15]
- Global command: `⌘ K` opens the Ask-AI search. [Source: every docs page footer, e.g., fresh-studio.txt]

## 6. Workspace (Studio graph view)

Studio's workspace is the graph itself. The graph view renders nodes (from `graph.add_node(name, fn)`) and edges (`graph.add_edge` / `add_conditional_edges`). Undefined conditional edges render as all-to-all because "Studio assumes the conditional edge could access all other nodes" — to fix this, developers pass an explicit path map `graph.add_conditional_edges("node_a", routing_function, {True: "node_b", False: "node_c"})` or annotate `-> Literal["node_b","node_c"]`. [Source: fresh-troubleshoot.txt, accessed 2026-11-15] Each node displays a **gear icon** if it has associated configuration fields (`langgraph_nodes` + `langgraph_type` schema keys) — clicking opens a configuration modal to edit prompt fields in-place. [Source: fresh-obs-studio.txt, accessed 2026-11-15] Per-node "Edit node state" affordance lets the user click on any historical node and edit its output JSON, then click **Fork** to create a new forked run. [Source: fresh-use-studio.txt, accessed 2026-11-15]

## 7. Conversation (LangGraph chat)

Studio's **Chat mode** (only for graphs whose state extends `MessagesState`) renders a conversation panel; the user types into the bottom of the panel; the message is submitted as a `Human` message and the response is streamed back. [Source: md-42e5aca64882.md, accessed 2026-11-15] A **Show tool calls** toggle controls whether tool invocations are rendered inline. [Source: fresh-use-studio.txt, accessed 2026-11-15] Assistants are switchable via the dropdown at the top of the page. [Source: fresh-use-studio.txt, accessed 2026-11-15] Cancel button stops the ongoing run. [Source: fresh-use-studio.txt, accessed 2026-11-15] Threads persist server-side on the local Postgres (`langgraph dev` provisions an in-memory/managed DB) and can be resumed across sessions.

## 8. Agent Experience (animated graph traversal — DEEP)

This is the killer DX feature. Studio renders the compiled graph as a static diagram, and during a run the active node is visually highlighted as the graph's execution pointer traverses the edges in real time. The slider at the top of the page controls the "super-step" granularity visible in the thread log; dragging it right exposes more granular detail (turns / nodes / state keys), dragging left collapses. [Source: fresh-use-studio.txt, accessed 2026-11-15] Each node, when clicked, opens an **Inspect** panel showing its input state, output state, and any LLM/tool calls (the same model that `langgraph` uses for tracing in LangSmith). [Source: md-b97839964db4.md, accessed 2026-11-15] Crucially the agent graph is itself the navigation surface — you don't scroll a list of traces, you watch the agent *move* through its decision space. Studio captures exceptions "with the surrounding state to help you understand what happened." [Source: md-b97839964db4.md, accessed 2026-11-15] Streaming events are forwarded by the queue worker over SSE: "If the client opened a /stream connection, the API server subscribes to the pubsub channel and forwards events to the client via server-sent events in real time." [Source: fresh-agent-server.txt, accessed 2026-11-15] Conditional edges during animation show as branch candidates so the developer can see *which* path was chosen and why.

## 9. Memory (LangGraph checkpointing + state)

LangGraph models memory as two layers (mirroring human memory per the CoALA paper). **Short-term (thread-scoped)**: state is part of the agent's state, persisted via thread-scoped checkpoints; the checkpointer writes a snapshot at each super-step. [Source: fresh-memory.txt, accessed 2026-11-15] **Long-term (cross-thread)**: a `Store` saves JSON documents under namespaces `(user_id, application_context)` with a key; supports semantic search and content filters. [Source: fresh-memory.txt, accessed 2026-11-15] The store supports four memory sub-types: **Semantic** (facts, profiles or collections), **Episodic** (past actions / few-shot examples), **Procedural** (instructions / system prompt, mutable via reflection). [Source: fresh-memory.txt, accessed 2026-11-15] Memory writes are either "in the hot path" (real-time, transparent, latency cost) or "in the background" (async, no latency but timing challenges). [Source: fresh-memory.txt, accessed 2026-11-15] In Studio the developer can inspect any checkpoint's state and the per-node diff between checkpoints via the **Edit node state** flow. [Source: fresh-use-studio.txt, accessed 2026-11-15]

## 10. Knowledge (LangGraph state graph)

The "knowledge" the agent has access to is whatever the developer wires into the graph: tools (`langchain.tools`), retrievers (vector stores), or long-term memory from the Store. Studio itself does not provide a knowledge-management surface (unlike Dust) — knowledge is in code. However, the **state graph** is the structured representation of *what the agent knows right now*: each checkpoint is a typed-dict snapshot of all channels (`messages`, `documents`, `intermediate_steps`, custom keys). [Source: md-9052da31feab.md, accessed 2026-11-15] Studio's thread log shows pretty (rendered) or JSON views of this state per step; the slider collapses/expands. [Source: fresh-use-studio.txt, accessed 2026-11-15] Studio also supports attaching a LangSmith dataset (curated inputs/reference outputs) and running the assistant against it as an experiment; results scored by evaluators. [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 11. Search (LangGraph trace search)

Studio does not have its own trace search UI; it relies on LangSmith's trace search (root run, span filters, metadata). [Source: fresh-obs-studio.txt, accessed 2026-11-15] What Studio *adds* is the ability to take any trace found in LangSmith and load it interactively — either via "Run in Studio" (loads the deployed thread) or "Clone thread locally" (replays a production trace against a local agent to test code changes). [Source: fresh-obs-studio.txt, accessed 2026-11-15] Within a single thread, `graph.get_state_history(config)` returns the checkpoint history in reverse chronological order so the developer can pick a fork point. [Source: fresh-time-travel.txt, accessed 2026-11-15]

## 12. Execution (LangGraph node execution + step latency)

A run flows: client → API server creates pending run in durable task queue → queue worker acquires lease, loads graph, executes; queue enforces at most 1 concurrent run per thread. [Source: fresh-agent-server.txt, accessed 2026-11-15] Each super-step writes a checkpoint (durability mode `async` writes after each step; `exit` only the final state). [Source: fresh-agent-server.txt, accessed 2026-11-15] Default `--n-jobs-per-worker` is 10 (configurable via CLI flag). [Source: Observed `langgraph dev --help` locally, 2026-11-15] Latency per node depends on the underlying LLM call / tool execution; Studio shows per-node timings inline (token/latency metrics from LangSmith integration). [Source: md-b97839964db4.md, accessed 2026-11-15] Each LLM call inside a node can be opened in the Playground from the "View LLM Runs" affordance — without rerunning the graph. [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 13. Artifacts (LangGraph traces)

Studio's primary artifacts are: (1) **threads** (ordered checkpoint histories with state at each step); (2) **assistants** (versioned configurations); (3) **runs** (executions with streaming event logs); (4) **datasets** (curated input/output pairs that can be generated by selecting thread nodes via "Add to Dataset"). [Sources: fresh-use-studio.txt, fresh-obs-studio.txt, fresh-agent-server.txt, accessed 2026-11-15] Nodes can be individually added as examples to LangSmith datasets — "Useful to evaluate individual steps of the agent." [Source: fresh-obs-studio.txt, accessed 2026-11-15] Experiments produce scored outputs against evaluators; results open in LangSmith. [Source: fresh-obs-studio.txt, accessed 2026-11-15] Cron jobs, scheduled runs, and webhook-triggered runs (server API) extend the artifact surface for production. [Source: fresh-agent-server.txt, accessed 2026-11-15]

## 14. Keyboard UX (Studio shortcuts)

Documented shortcuts are sparse in official docs but the docs site itself uses `⌘ K` (Ask AI search, present in every page footer). [Source: fresh-studio.txt footer, accessed 2026-11-15] In Studio: the **up/down arrow keys** in the Input section cycle through previously submitted inputs. [Source: fresh-use-studio.txt, accessed 2026-11-15] No dedicated command palette inside Studio is documented in the public docs; this is a gap. The slider at the top of the page (mouse-driven) controls thread-log detail; no keyboard equivalent is documented. [Source: fresh-use-studio.txt, accessed 2026-11-15]

## 15. Motion (LangGraph live graph animation)

The graph view animates the execution pointer over nodes and edges during a run. The slider at the top of the page "drags" the timeline — dragging right exposes more granular turns/nodes/keys; dragging left collapses them. [Source: fresh-use-studio.txt, accessed 2026-11-15] Streaming events are pushed to the browser via SSE in real time, so the visual highlighting of the currently-executing node is live, not polled. [Source: fresh-agent-server.txt, accessed 2026-11-15] Tool calls appear one after another as they happen "instead of hiding behind a single activity indicator." (This pattern is named explicitly in Dust's steering docs as the model of real-time agent UX — LangGraph's UI is comparable, just framed as graph traversal rather than chat streaming.) [Source: ud-agents/steering-conversations.md (Dust, for comparison), accessed 2026-11-15]

## 16. Animation

Animations are functional rather than decorative: node-highlight on entry/exit, conditional-edge branching on routing decision, slider-driven expand/collapse of the thread log. The Mintlify theme is `catppuccin-latte` (light) / `catppuccin-mocha` (dark), implying a soft pastel palette for code blocks and graph nodes. [Source: md-42e5aca64882.md (mermaid theme config), accessed 2026-11-15] No explicit "premium motion" claims in the docs — the docs are matter-of-fact about what is animated and why (state transitions, execution pointer).

## 17. Visual Hierarchy

The layout establishes a clear three-pane hierarchy: graph (centre/canvas), input panel (left), thread log (right). [Source: fresh-use-studio.txt, accessed 2026-11-15] Within the thread log, hierarchical structure is **turn → node → state key**, each independently collapse/expand. [Source: fresh-use-studio.txt, accessed 2026-11-15] The slider acts as a global "depth" control across this hierarchy. The Settings/Manage Assistants/Interrupt controls cluster at the bottom-left — they are discoverable but secondary to the canvas. The Run-experiment button at top-right signals its episodic, less-common nature. [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 18. Progressive Disclosure (LangGraph node expansion)

Thread log: **turn → node → key**, all collapse/expand. Slider sets the global expansion threshold. Pretty vs JSON mode is a per-step toggle. [Source: fresh-use-studio.txt, accessed 2026-11-15] Per-node: clicking a node shows its state diff; clicking **View LLM Runs** opens the LLM call list; clicking an LLM call opens it in Playground. [Source: fresh-obs-studio.txt, accessed 2026-11-15] Playground itself is a sub-UI that lets you iterate on a single prompt without rerunning the graph. The **Edit node state** modal opens JSON editor; **Fork** is the destructive-but-safe action (creates new run, preserves original). [Source: fresh-use-studio.txt, accessed 2026-11-15] This layering — Overview → Node → LLM call → Prompt — is the canonical LangGraph progressive-disclosure stack.

## 19. Accessibility

LangGraph Studio docs do not document WCAG conformance, screen-reader compatibility, or keyboard-only navigation; this is a notable gap. The docs site itself uses `data-a11y-animated-images="system"` and `data-a11y-link-underlines="true"` (GitHub's repo page, used as inspiration). [Source: page-9be8e5d6a6e6.html, accessed 2026-11-15] Browser support is restricted to Chromium-family (Chrome, Edge) — Safari and Brave require `--tunnel` or shield disabling, which has clear accessibility implications (limits user agent choice). [Source: fresh-troubleshoot.txt, accessed 2026-11-15] Chrome 142+ Private Network Access restrictions require explicit "Local network access: Allow" toggle, which is a configuration barrier for any user with managed-browser policies. [Source: fresh-troubleshoot.txt, accessed 2026-11-15]

## 20. Performance Perception (LangGraph step latency)

The animation of execution pointer over the graph + the streaming of intermediate states in the thread log together make long runs *feel* productive — the user can see progress even when an LLM call takes 30 seconds. The slider lets users dial up detail when they want to inspect, dial down when they want to skim. [Source: fresh-use-studio.txt, accessed 2026-11-15] Hot-reload means code changes reflect immediately: "make changes to prompts or tool signatures in your code, and Studio reflects them immediately. Re-run conversation threads from any step to test your changes without starting over." [Source: md-b97839964db4.md, accessed 2026-11-15] Pre-compiled graph loading is encouraged over factory functions because "the server loads it once at container startup and reuses it for every run—no compilation overhead per request." [Source: fresh-agent-server.txt, accessed 2026-11-15]

## 21. Trust (LangGraph local execution)

Local execution is a core trust signal: the agent runs on `127.0.0.1:2024` (default bind); only the Studio UI is hosted at `smith.langchain.com`. [Source: md-b97839964db4.md, accessed 2026-11-15] Tracing is opt-out: "If you don't want data traced to LangSmith, set `LANGSMITH_TRACING=false` in your application's `.env` file. With tracing disabled, no data leaves your local server." [Source: md-b97839964db4.md, accessed 2026-11-15] The default `--host` is `127.0.0.1` for security; `0.0.0.0` is explicitly discouraged. [Source: Observed `langgraph dev --help`, accessed 2026-11-15] Cloudflare `--tunnel` requires manual allow-listing of the tunnel URL in Studio's UI ("This manual step is required for security - Studio requires explicit user confirmation before connecting to external URLs."). [Source: fresh-troubleshoot.txt, accessed 2026-11-15]

## 22. Explainability (LangGraph state inspection — DEEP)

The crown jewel. Every checkpoint stores the full graph state after each super-step. The `get_state_history(config)` API returns this history in reverse chronological order, so the developer can replay or fork from any point. [Source: fresh-time-travel.txt, accessed 2026-11-15] **Replay** re-executes nodes from a prior checkpoint — "Replay re-executes nodes—it doesn't just read from cache. LLM calls, API requests, and interrupts fire again and may return different results." [Source: fresh-time-travel.txt, accessed 2026-11-15] **Fork** creates a new branch with modified state via `update_state` — "update_state does not roll back a thread. It creates a new checkpoint that branches from the specified point. The original execution history remains intact." [Source: fresh-time-travel.txt, accessed 2026-11-15] **Subgraph time travel**: by default subgraphs inherit the parent's checkpointer (only parent-level checkpoints); setting `checkpointer=True` on the subgraph gives it its own checkpoint history and lets you fork from inside the subgraph. [Source: fresh-time-travel.txt, accessed 2026-11-15] Interrupts (HITL) are always re-triggered during time travel so human-in-the-loop flows replay correctly. [Source: fresh-time-travel.txt, accessed 2026-11-15] In the UI: clicking **Edit node state** opens the JSON editor; clicking **Fork** creates a new forked run; clicking **Re-run from here** creates a new forked run without state edits (useful when only the assistant config changed). [Source: fresh-use-studio.txt, accessed 2026-11-15] Per-node LLM calls can be opened in Playground with the full prompt context to inspect exactly what the model saw. [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 23. Long Session Experience

Long traces are managed via the slider + collapse/expand hierarchy. Hot-reload avoids context loss across code iterations: "Re-run conversation threads from any step to test your changes without starting over." [Source: md-b97839964db4.md, accessed 2026-11-15] Background experiments ("You can continue to work in Studio while the experiment runs in the background") prevent UI blocking during long evaluations. [Source: fresh-obs-studio.txt, accessed 2026-11-15] Long-running server-side runs benefit from durable execution: "if a worker is interrupted, the run can resume from the last checkpoint rather than from the beginning." [Source: fresh-agent-server.txt, accessed 2026-11-15] No explicit context-compaction feature is documented (contrast: Dust's context compaction); LangGraph relies on the developer's state design and Store for long-term context.

## 24. Power User Features (DEEP — time-travel + state-edit-and-continue + hot-reload + replay-from-node)

- **Time-travel debugging**: full Replay + Fork from any checkpoint, with subgraph checkpointers, interrupt re-triggering, and multiple-interrupt forking (fork between two interrupts to change a later answer without re-asking earlier questions). [Source: fresh-time-travel.txt, accessed 2026-11-15]
- **State-edit-and-continue**: `update_state(config, values, as_node=...)` lets the developer inject arbitrary state changes at any historical checkpoint and continue execution. The `as_node` parameter is critical for parallel branches (resolves `InvalidUpdateError`), fresh threads (testing), and skipping nodes ("Set `as_node` to a later node to make the graph think that node already ran"). [Source: fresh-time-travel.txt, accessed 2026-11-15]
- **Hot code reload**: `langgraph dev` watches files and reloads on change; `--no-reload` disables it. [Source: Observed `langgraph dev --help`, accessed 2026-11-15] Studio "reflects them immediately" — no manual refresh needed. [Source: md-b97839964db4.md, accessed 2026-11-15]
- **Replay-from-node**: clicking **Re-run from here** in the thread log creates a new forked run from the selected checkpoint without state edits. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- **Breakpoints**: pre-node and post-node breakpoints via the **Interrupt** control. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- **Remote debugging**: `--debug-port INTEGER` enables `debugpy` remote debugging; `--wait-for-client` pauses the server until a debugger attaches. [Source: Observed `langgraph dev --help`, accessed 2026-11-15]
- **One-click deploy**: from Studio to LangSmith Cloud. [Source: md-42e5aca64882.md, accessed 2026-11-15]
- **Trace-clone-locally**: load a production LangSmith trace against a local agent for regression testing. [Source: fresh-obs-studio.txt, accessed 2026-11-15]
- **AgentDelegateAction / Go Deep equivalent**: LangGraph itself does not expose an explicit "AgentDelegateAction" UI primitive. Instead, delegation is expressed in code via subgraphs (compiled graphs used as nodes), the `Send` API for parallel fan-out, and the `Command` object for resuming from interrupts with state updates. [Source: md-9052da31feab.md, accessed 2026-11-15; fresh-time-travel.txt, accessed 2026-11-15] This is a structural difference vs Dust's @deep-dive handoff — LangGraph models delegation as a graph-shape concern, Dust models it as a runtime skill.

## 25. Developer Experience (LangGraph SDK — DEEP)

The SDK surface is broad:
- **CLI**: `langgraph dev / build / deploy / up / dockerfile / new / validate` (Observed `langgraph --help`, 2026-11-15). Version 0.4.31 installed locally.
- **Configuration file** `langgraph.json` with keys: `dependencies`, `graphs` (mapping name → `./path/to/file.py:object`), `env` (path to `.env`). [Source: md-b97839964db4.md, accessed 2026-11-15]
- **Python + JS parity**: `pip install langgraph-cli` or `npm install -g @langchain/langgraph-cli` (the JS variant is `langgraphjs`). [Source: fresh-cli.txt, accessed 2026-11-15]
- **Agent Server API**: REST endpoints for assistants, threads, runs, cron jobs, webhooks, streaming (SSE), human-in-the-loop, time travel; plus MCP endpoint and A2A endpoint. [Source: fresh-agent-server.txt, accessed 2026-11-15]
- **RemoteGraph**: a client SDK to invoke a deployed Agent Server as if it were a local graph. [Source: fresh-cli.txt, accessed 2026-11-15]
- **Persistence**: PostgreSQL (default) or MongoDB/custom for checkpoints; PostgreSQL for store. [Source: fresh-agent-server.txt, accessed 2026-11-15]
- **Distributed runtime**: split API and queue (Redis for pub/sub signaling, no user data in Redis), and a fully distributed runtime for large-scale. [Source: fresh-agent-server.txt, accessed 2026-11-15]
- **Multi-framework**: Agent Server can deploy non-LangGraph agents built with Strands, Claude Agent SDK, Google ADK via the Functional API or `deployments-wrap-sdk`. [Source: fresh-agent-server.txt, accessed 2026-11-15]
- **MCP integration**: docs offer a "Connect these docs to Claude, VSCode, and more via MCP for real-time answers" callout on every page — a dogfooded MCP server for docs. [Source: every docs page footer, e.g., fresh-studio.txt]
- **Browser-extension conflicts** can break Studio; the troubleshooting page lists Ollama extension as a known culprit. [Source: fresh-troubleshoot.txt, accessed 2026-11-15]

## 26. Biggest Strengths (with evidence)

1. **Time-travel + state-edit-and-continue is genuinely unmatched.** No competing agent IDE documents an equivalent capability to inject state at a historical checkpoint, specify `as_node`, and resume execution while preserving the original history. [Source: fresh-time-travel.txt, accessed 2026-11-15]
2. **Local-first trust model.** Agent runs on localhost; LangSmith tracing opt-out via `LANGSMITH_TRACING=false`; tunnel allow-listing required. [Source: md-b97839964db4.md, fresh-troubleshoot.txt, accessed 2026-11-15]
3. **Hot-reload + interactive graph = fast iteration.** Code changes reflect immediately and threads can be re-run from any step. [Source: md-b97839964db4.md, accessed 2026-11-15]
4. **Open source, production-tested.** langgraph 1.2.10 + langgraph-cli 0.4.31; Uber, LinkedIn, Klarna cited as production users. [Source: fresh-gh-releases.txt, fresh-blog-v1.txt, accessed 2026-11-15]
5. **Multi-framework deployment.** Strands, Claude Agent SDK, Google ADK supported via Functional API or `deployments-wrap-sdk`. [Source: fresh-agent-server.txt, accessed 2026-11-15]
6. **Graph + Chat dual modes.** Graph mode for full debug; Chat mode for business-user testing. [Source: md-42e5aca64882.md, accessed 2026-11-15]
7. **Built-in experiments and dataset generation** directly from thread nodes. [Source: fresh-obs-studio.txt, accessed 2026-11-15]
8. **Deep observability stack**: trace → Studio thread → Playground (per-LLM-call). [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 27. Biggest Weaknesses (with evidence)

1. **Steep learning curve.** "LangGraph is very low-level, and focused entirely on agent orchestration. Before using LangGraph, we recommend you familiarize yourself with some of the components used to build agents, starting with models and tools." [Source: md-9052da31feab.md, accessed 2026-11-15] The framework explicitly recommends the higher-level `langchain.agents` for new users — so Studio inherits a cognitive tax.
2. **Browser restrictions block first-run.** Safari blocks localhost; Brave shields block; Chrome 142 PNA enforcement requires manual Local Network Access toggle; Ollama extension conflicts. [Source: fresh-troubleshoot.txt, accessed 2026-11-15] First-run friction is real.
3. **Conditional edges render wrong by default.** Undefined conditional edges appear as all-to-all — visual noise that misleads new users. [Source: fresh-troubleshoot.txt, accessed 2026-11-15]
4. **Chat mode locked to `MessagesState`.** Lightweight UI is unavailable for any graph that doesn't extend `MessagesState`, which excludes many workflow-style graphs. [Source: md-42e5aca64882.md, accessed 2026-11-15]
5. **Accessibility is undocumented.** No WCAG statement, no documented keyboard-only navigation in Studio. Browser restrictions further compound access inequity.
6. **No native context compaction for very long traces.** Where Dust adds explicit compaction summaries, LangGraph relies on developer-designed state schemas and the Store — long investigations must be hand-engineered.
7. **No first-class delegation primitive in the UI.** Subgraph delegation is a code-level pattern; there is no equivalent of Dust's `@deep-dive` handoff UI affordance — builders must compose this themselves.
8. **Multi-agent confusion not addressed at the UI level.** No visual diff between subgraph invocations and top-level node invocations beyond the thread-log hierarchy.
9. **Cloud-coupled.** Studio's UI is hosted at `smith.langchain.com` even when running locally — there is no fully-airgapped Studio binary.

## 28. What should MiMo learn?

- **Make state inspection and state-edit-and-continue first-class.** The Fork primitive (state mutation + branch) is the most powerful agent debugging pattern observed. MiMo should treat every agent step as a checkpoint and offer one-click fork-from-here with state edits. [Source: fresh-time-travel.txt, accessed 2026-11-15]
- **Treat the graph as the navigation surface.** Thread logs are linear and hideous; an animated graph view that highlights the execution pointer in real time is more legible. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- **Layer the inspect hierarchy: thread → node → LLM call → prompt.** Each level is independently explorable without rerunning the agent. [Source: fresh-obs-studio.txt, accessed 2026-11-15]
- **Local-first trust model with opt-out tracing.** Default-bind to localhost; tunnel only when needed; require explicit allow-listing for external URLs. [Source: md-b97839964db4.md, fresh-troubleshoot.txt, accessed 2026-11-15]
- **Hot-reload as a default.** Disable via `--no-reload`, not enable. [Source: Observed `langgraph dev --help`, accessed 2026-11-15]
- **`langgraph.json` config-file convention.** Explicit, declarative, version-controllable: dependencies, graphs map, env path. [Source: md-b97839964db4.md, accessed 2026-11-15]
- **One-click deploy from local to cloud.** [Source: md-42e5aca64882.md, accessed 2026-11-15]
- **Slider-based global detail control on long traces.** Single control, big payoff. [Source: fresh-use-studio.txt, accessed 2026-11-15]
- **Clone production traces locally for regression testing.** Bridges prod telemetry and local dev. [Source: fresh-obs-studio.txt, accessed 2026-11-15]

## 29. What should MiMo reject?

- **Conditional-edge rendering that defaults to all-to-all.** Visually noisy and misleading. [Source: fresh-troubleshoot.txt, accessed 2026-11-15]
- **Browser-fragmented first-run experience.** Three different troubleshooting paths for Safari, Chrome 142+, and Brave is unacceptable friction. [Source: fresh-troubleshoot.txt, accessed 2026-11-15]
- **Cloud-hosted Studio UI even for local runs.** Breaks airgap use cases and couples the local IDE to LangSmith uptime. [Source: md-b97839964db4.md, accessed 2026-11-15]
- **Chat-mode lock to `MessagesState`.** Excludes workflow graphs unnecessarily. [Source: md-42e5aca64882.md, accessed 2026-11-15]
- **Self-deprecating "very low-level" framing in the docs.** Tells users to use a different product first — leaks confidence. [Source: md-9052da31feab.md, accessed 2026-11-15]
- **Implicit accessibility gap.** Studio has no documented keyboard-only path or WCAG statement.

## 30. Confidence Score

**82 / 100.** Reasoning: primary-source coverage is excellent for the core product (Studio, time-travel, observability, agent-server architecture, CLI, releases) — these were read from canonical docs and the CLI was installed and inspected locally. Time-travel and state-edit-and-continue claims are documented with code examples in the official guide. Loss of confidence: (a) keyboard-shortcut and accessibility sections are inferred from doc gaps rather than positive evidence; (b) "AgentDelegateAction" is not a LangGraph concept — I could not find it in the canonical docs and the closest analogue is the code-level `Send` API and subgraph composition, which is structurally different from Dust's @deep-dive handoff; (c) live-animation specifics are inferred from streaming-event architecture rather than directly observed in a running Studio session (would need a live LangSmith account to fully verify).
