# Function Calling (Tool Calling)

**Category:** Tools
**Status:** CORE
**Maturity:** Production-ready

## Definition
**Function calling** (also called **tool calling**) is the LLM API capability where the model, given a set of tool definitions (name, description, parameter schema), can emit a structured request to invoke one of those tools with specific arguments, rather than (or in addition to) emitting free-form text. The runtime executes the tool and feeds the result back into the conversation, enabling the model to ground its reasoning in real-world actions and observations.

It is the **native API primitive** that makes ReAct-style agent loops possible without prompt-hacking the model to emit parseable text markers.

## Problem Solved
Before native function calling, agents relied on **prompt-based tool use**: the system prompt instructed the model to emit JSON like `{"tool": "search", "args": {...}}`, and the runtime parsed it with regex or JSON.parse. This was brittle:
- Models would wrap JSON in prose, break schemas, or hallucinate fields.
- Parsing errors broke the loop.
- No native multi-tool support.
- Each provider had different conventions.

Native function calling (OpenAI 2023, Anthropic, Google, Z.ai/GLM) solved this by:
- Moving tool definitions into the API request as a first-class field.
- Returning tool calls as a structured response type.
- Letting the model emit multiple tool calls in one turn.
- Validating arguments against the provided JSON schema.

## Why It Matters
Function calling is the **foundation of every agent framework**. Without it:
- The ReAct loop is a brittle prompt-engineering exercise.
- Tool selection reliability drops from ~95%+ to ~70–80% (industry observation).
- Multi-tool parallelism is impossible.

For MiMo AI, function calling is the **interface between the LLM (GLM-5.2) and the Tool Runtime**. Every action the agent takes originates as a function call. The reliability of this interface determines the reliability of the entire system.

## How It Works

### Request structure
```json
POST /v1/chat/completions
{
  "model": "glm-5.2",
  "messages": [...],
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "web_search",
        "description": "Search the web for fresh information.",
        "parameters": {
          "type": "object",
          "properties": {
            "query": { "type": "string" },
            "max_results": { "type": "integer", "default": 5 }
          },
          "required": ["query"]
        }
      }
    }
  ],
  "tool_choice": "auto"
}
```

### Response with tool call
```json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": null,
      "tool_calls": [{
        "id": "call_abc123",
        "type": "function",
        "function": {
          "name": "web_search",
          "arguments": "{\"query\": \"GLM-5.2 benchmarks\", \"max_results\": 5}"
        }
      }]
    }
  }]
}
```

### Loop continuation
The runtime executes `web_search("GLM-5.2 benchmarks")`, gets results, then sends back:
```json
{
  "messages": [
    {previous messages...},
    { "role": "assistant", "tool_calls": [...] },
    { "role": "tool", "tool_call_id": "call_abc123", "content": "{search results JSON}" }
  ]
}
```
The model now reasons over the tool result and either emits another tool call or a final answer.

### `tool_choice` modes
- `"auto"` — model decides whether to call a tool (default).
- `"none"` — model must not call tools.
- `"required"` — model must call at least one tool.
- `{"type": "function", "function": {"name": "X"}}` — force a specific tool.

### Parallel tool calls
Modern APIs (GLM-5.2 included) support multiple tool calls in one assistant turn. The runtime executes them concurrently (if independent) and feeds all results back in one batch.

## Architecture
```
┌──────────────────────────────────────────────────────────┐
│                    Agent Runtime                         │
│                                                          │
│  ┌─────────────┐    ┌──────────────┐    ┌─────────────┐ │
│  │ Context Mgr │───▶│ Model Gateway│───▶│ GLM-5.2 API │ │
│  │ (assembles  │    │ (z-ai-web-   │    │  with tools │ │
│  │  messages + │    │  dev-sdk)    │    │  param      │ │
│  │  tools)     │    │              │    │             │ │
│  └─────────────┘    └──────┬───────┘    └─────────────┘ │
│                            │                             │
│                            ▼ tool_calls                  │
│                     ┌──────────────┐                     │
│                     │ Tool Runtime │ (executes, returns  │
│                     │              │  ToolResult)        │
│                     └──────┬───────┘                     │
│                            │                             │
│                            ▼ tool result message         │
│                       (back to context)                  │
│                            │                             │
│                            ▼                             │
│                       next model call                    │
└──────────────────────────────────────────────────────────┘
```

## Interfaces
- **Vercel AI SDK**: `streamText({ model, messages, tools, toolChoice, maxSteps })` — handles the loop natively; `tools` is a map of `tool({ description, parameters, execute })`.
- **Zod schemas**: `tool({ parameters: z.object({...}) })` — SDK converts Zod to JSON Schema for the API.
- **GLM-5.2 via z-ai-web-dev-sdk**: provider adapter; same interface as OpenAI.
- **Tool result**: `{ role: 'tool', toolCallId, content: string }` (content is stringified JSON or text).

## Dependencies
- Model Gateway (GLM-5.2 + fallback providers).
- Tool Runtime (executes the emitted calls).
- Context Manager (assembles messages + tools for each call).
- Zod (schema definition + validation).
- JSON Schema (wire format for tool definitions).

## Strengths
- **Reliable** — native API support; models trained to emit valid tool calls. Far more reliable than prompt-based parsing.
- **Typed** — JSON Schema / Zod enforces argument structure.
- **Parallel** — multiple tool calls per turn enable concurrent execution.
- **Composable** — tools are self-contained definitions; mix and match per task.
- **Provider-portable** — OpenAI-compatible API is the de-facto standard; GLM-5.2, Anthropic, Gemini all support variants.
- **Native to ReAct** — the loop is the model's natural mode.

## Weaknesses
- **Schema rigidity** — model must conform to JSON Schema; complex schemas (nested unions, recursive) can confuse it.
- **Argument hallucination** — model may invent args not in schema, or pick invalid enum values. Mitigation: Zod validation rejects; re-prompt with error.
- **Description quality matters** — vague descriptions → wrong tool selection. Tool descriptions are a first-class engineering concern.
- **Token cost** — tool definitions consume prompt tokens (50–500 tokens per tool).
- **Provider variance** — not all providers support all features (parallel calls, forced tool, structured outputs uniformly).
- **Loop-count dependency** — model needs `maxSteps` or it may loop forever waiting for "more info".

## Failure Modes
- **Wrong tool selected** — model picks `web_search` when `fetch_url` was needed. Mitigation: better descriptions; `toolChoice` forced for known steps.
- **Invalid arguments** — schema violation. Mitigation: Zod validation, reject, re-prompt with the validation error.
- **Hallucinated tool name** — model invents a tool not in the list. Mitigation: API rejects unknown tools; runtime catches and re-prompts.
- **Missing required field** — model omits a required arg. Mitigation: Zod `.required()` rejects.
- **Infinite tool loop** — model keeps calling tools without concluding. Mitigation: `maxSteps` cap; reflection injection every N steps.
- **Tool result too large** — model emits a tool call whose result overflows context. Mitigation: Tool Runtime truncates large results + provides a fetch-more tool.
- **Provider incompatibility** — code written for OpenAI may not work identically on GLM/Anthropic. Mitigation: Vercel AI SDK abstracts; test per provider.

## Security Implications
- Tool definitions are visible to the model — descriptions should not contain sensitive info.
- Tool args are model-generated → **untrusted**. Always validate with Zod before execution.
- Tool args may contain prompt injection (e.g., a URL whose content the tool fetches and returns). Mitigation: tool output is fenced + tagged untrusted in context.
- `toolChoice: required` can force the model to call a sensitive tool — use carefully; prefer `auto` for high-risk tools with approval gates.

## Performance Implications
- Tool definitions add tokens to every request (cost grows linearly with tool count).
- Parallel tool calls reduce round-trips (N tools in 1 turn vs. N turns).
- `maxSteps` bounds total cost; typical values 10–50.
- Tool execution time dominates loop latency for slow tools (browser, code-exec).

## Operational Implications
- Tool registry must be versioned (changing a schema breaks replays).
- Per-tool-call tracing (args, result, duration, cost) via Tool Runtime.
- Tool description quality is a measurable metric (tool-selection accuracy on benchmark tasks).
- Provider-specific quirks documented in Model Gateway adapter.

## Alternatives
- **Prompt-based tool use** (legacy) — rejected; brittle.
- **MCP (Model Context Protocol)** — Anthropic's open standard for tool definitions; we adopt MCP as the tool definition format where it interops with our registry, but the execution still goes through our Tool Runtime.
- **Structured outputs / JSON mode** — related but narrower (constrains output to a schema; not the same as tool calling, though often combined).

## Maturity & Production Readiness
**Production-ready, industry standard.** Every major LLM provider supports function calling. Vercel AI SDK, LangChain, OpenAI Agents SDK, Claude Agent SDK, Mastra all build on it. GLM-5.2 supports OpenAI-compatible function calling via z-ai-web-dev-sdk.

## Relevant Research / Papers
- Schick et al. 2023 — *Toolformer: Language Models Can Teach Themselves to Use Tools.* arXiv:2302.04761.
- Patil et al. 2023 — *Gorilla: Large Language Model Connected with Massive APIs.* arXiv:2305.15334.
- Qin et al. 2023 — *ToolLLM: Facilitating Large Language Models to Master 16000+ Real-world APIs.* arXiv:2307.16789.
- Yao et al. 2022 — *ReAct* (the loop pattern that function calling enables).
- OpenAI — *Function Calling* announcement (June 2023); *Structured Outputs* (2024).

## Official Documentation
- Vercel AI SDK — Tools & Function Calling (sdk.vercel.ai/docs/ai-sdk-core/tools-and-function-calling).
- Z.ai API docs — GLM-5.2 tool calling (docs.z.ai).
- z-ai-web-dev-sdk — provider adapter (npm).
- OpenAI — Function Calling guide (platform.openai.com/docs/guides/function-calling).
- Anthropic — Tool Use (docs.anthropic.com/en/docs/build-with-claude/tool-use).
- Anthropic MCP — modelcontextprotocol.io.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- Use **Vercel AI SDK `streamText`** with `tools` map. Each tool is defined as `tool({ description, parameters: z.object({...}), execute: async (args, { toolCallId, messages }) => { ... } })`. The `execute` callback is our entry into the Tool Runtime pipeline.
- **z-ai-web-dev-sdk** provides GLM-5.2 as a Vercel AI SDK provider: `import { glm } from 'z-ai-web-dev-sdk/vercel-adapter'` (or equivalent). The tool-calling interface is identical to OpenAI's.
- **Tool definitions live in code** (TS modules exporting `ToolSpec`) for built-ins + in **Prisma `Tool` table** for user-defined. A loader merges both at startup into a `Registry` map.
- **Zod schemas** are the source of truth; the SDK converts them to JSON Schema for the API. Validate args again at execution (defense in depth).
- **Parallel tool calls**: Vercel AI SDK executes multiple `tool_calls` in one assistant turn concurrently via `Promise.all` by default. Configure per-tool concurrency caps in the Tool Runtime if needed.
- **`maxSteps`**: per-task configurable; default 30, max 200 for long-horizon. Stored on `AgentRun` and enforced by the SDK + our wrapper.
- **`toolChoice`**: default `'auto'`. For verification milestones, force `'required'` with a specific `verify` tool.
- **socket.io**: emit `tool_call:emitted` (model → tool), `tool_call:executing`, `tool_call:completed` events. **zustand** store renders live tool calls in the trajectory view.
- **Prisma**: `Tool` (registry), `ToolCallAudit` (per-call log), `AgentStep` (links tool calls to agent trajectory).
- **Provider abstraction**: Model Gateway (Layer 1) wraps z-ai-web-dev-sdk; if we add OpenAI/Anthropic later, the tool interface stays the same (Vercel AI SDK abstracts). Only the tool-definition JSON Schema format may need provider-specific tweaks — abstract in the gateway.
- **Mini-service placement**: function-calling loop logic lives in the main Next.js process or `agents-service` mini-service (wherever the agent loop runs). Tool *execution* goes to the `tool-runtime-service` mini-service (port 4030) over internal HTTP.

## Relevance To Our Project (MiMo AI layered runtime)
Function calling is the **interface between Layer 1 (Model) and Layer 9 (Tool)**. The Executive (Layer 7) and Agent Runtime (Layer 8) use Vercel AI SDK's function-calling to emit tool calls; the Tool Runtime (Layer 9) executes them; results flow back into Layer 2 (Context). Layer 15 (Security) wraps every call with permission/policy/approval checks.

It is the **mechanism that turns a language model into an agent**. Without it, GLM-5.2 is a text generator; with it, GLM-5.2 can search, browse, code, execute, and verify.

## Recommended Usage
- Define every tool with a Zod schema + clear description (the description is the model's only guide to selection).
- Use `maxSteps` to bound loops; configure per task class.
- Validate args with Zod at execute time (defense in depth).
- Treat tool results as untrusted input (fence + tag).
- Use parallel tool calls when the model emits independent actions.
- Use `toolChoice: required` + specific tool for forced verification milestones.
- Keep tool count per task ≤ 20 (more dilutes selection accuracy + bloats context).
- Audit every call; trace every span.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** Vercel AI SDK function calling with Zod schemas + GLM-5.2 via z-ai-web-dev-sdk. **ADOPT** MCP as an interop format for external tool definitions (Phase 2). **REJECT** prompt-based tool use (legacy). **DEFER** structured-output mode (`response_format: json_schema`) to specific use cases (verifier outputs) — adopt case-by-case.

## Sources
- Schick et al. 2023 — Toolformer (arxiv.org/abs/2302.04761)
- Patil et al. 2023 — Gorilla (arxiv.org/abs/2305.15334)
- Qin et al. 2023 — ToolLLM (arxiv.org/abs/2307.16789)
- Yao et al. 2022 — ReAct (arxiv.org/abs/2210.03629)
- Vercel AI SDK — Tools & Function Calling (sdk.vercel.ai/docs/ai-sdk-core/tools-and-function-calling)
- Z.ai API docs (docs.z.ai)
- Anthropic MCP (modelcontextprotocol.io)
- OpenAI Function Calling (platform.openai.com/docs/guides/function-calling)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 1 Model, Layer 9 Tool)
- MiMo AI `CAPABILITY_MAP.md` §7 (function/tool calling = C), §8 (MCP = R)
