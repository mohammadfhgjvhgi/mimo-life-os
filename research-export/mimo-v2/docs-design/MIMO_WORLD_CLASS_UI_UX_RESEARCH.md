# MiMo — Z.ai × ZCode Research (World-Class UI/UX Research)

> Deep study of Z.ai Chat + ZCode as PRIMARY references. Observations vs inferences clearly marked.

---

## 1. Z.ai (chat.z.ai) — Primary Visual + Interaction Reference

### 1.1 Product Identity

Z.ai is "the AI assistant powered by GLM-5.2. Build websites, write code, handle long-horizon tasks, and get instant answers. Fast, smart, and reliable." [OBSERVED: z.ai meta description]

The Chinese consumer brand (ChatGLM/清言) positions itself as: "Based on GLM, not just an AI assistant, but an Agent that gets things done. From understanding goals to invoking tools, from decomposing tasks to delivery." [OBSERVED: chatglm.cn meta description]

**Key positioning**: Z.ai is explicitly built around **long-horizon tasks** and **agent execution**, not just chat. GLM-5.2 is "a flagship model built for the era of long-horizon tasks. With truly usable 1M-token context, it has been tested to handle project-scale engineering context, delivering more stable long-task execution." [OBSERVED: docs.z.ai/guides/llm/glm-5.2]

### 1.2 Core Interaction Model

**Single-agent with toggleable reasoning** — the defining interaction pattern:
- Every chat completion carries a `thinking` parameter (`{"type": "enabled"}` or `{"type": "disabled"}`)
- **Turn-Level Thinking**: within a multi-turn session, each request can independently choose whether to reason
- "more flexible cost/latency control: For lightweight turns like 'asking a fact' or 'tweaking wording,' you can disable thinking to get faster responses; for heavier tasks like 'complex planning,' 'multi-constraint reasoning,' or 'code debugging,' you can enable thinking to improve accuracy and stability." [OBSERVED: docs.z.ai/guides/capabilities/thinking-mode]
- The model "stays coherent across turns and keeps a consistent output style, making it feel 'smarter when things are hard, faster when things are simple.'" [OBSERVED: same source]

**This is philosophically different from Gemini's mode-pickers** (Canvas/Deep Research as discrete feature toggles) — GLM treats **reasoning depth itself** as the continuously-variable knob.

### 1.3 Interleaved Thinking

Z.ai supports **Interleaved Thinking**: "the model can think between tool calls and after receiving tool results. This enables more complex, step-by-step reasoning: interpreting each tool output before deciding what to do next, chaining multiple tool calls with reasoning steps, and making finer-grained decisions based on intermediate results." [OBSERVED: docs.z.ai/guides/capabilities/thinking-mode]

### 1.4 Preserved Thinking

"the model can retain reasoning content from previous assistant turns in the context. This helps preserve reasoning continuity and conversation integrity, improves model performance, and increases cache hit rates—saving tokens in real tasks." [OBSERVED: docs.z.ai/guides/capabilities/thinking-mode]

### 1.5 Web Search (3 Layers)

Z.ai offers three distinct search surfaces:
1. **Web Search API** — structured results with intent-enhanced retrieval, time-aware output
2. **Web Search in Chat** — RAG with cited web sources, seamless integration of real-time retrieval + LLM generation
3. **Search Agent** — intelligent search agent (multi-turn, autonomous)

[OBSERVED: docs.z.ai/guides/tools/web-search]

### 1.6 MCP Support

"Flexibly integrate external MCP tools and data sources to expand application scenarios." The Web Search docs document an MCP server: `https://api.z.ai/api/mcp/web_search/sse`. [OBSERVED: docs.z.ai/guides/llm/glm-5.2]

### 1.7 Context Caching

"Intelligent caching mechanism to optimize performance in long conversations." Pricing shows separate "Cached Input" column (e.g., GLM-5.2: $1.4 input vs $0.26 cached input vs $4.4 output). [OBSERVED: docs.z.ai/guides/overview/pricing]

### 1.8 Keyboard UX

Z.ai docs feature ⌘K search affordance and ⌘I shortcut (Deep Thinking). [OBSERVED: docs.z.ai page headers/footers]

### 1.9 Evidence Gaps (chat.z.ai consumer interface)

- **Consumer chat UI**: JS-rendered SPA, not retrievable via curl. Only 4-byte visible body returned.
- **Visual layout**: sidebar, composer, model picker placement — NOT directly observed.
- **Dark mode**: Greasy Fork script exists for "dark UI for Z.ai" but no screenshots of native dark mode.
- **Responsive behavior**: undocumented.

**INFERENCE**: Based on the docs (⌘K, ⌘I, thinking toggle), the consumer interface likely has:
- A clean, focused chat surface
- Model selector in or near the composer
- Thinking toggle accessible per-turn
- Sidebar with conversation history
- Clean, modern dark mode (given the dark mode Greasy Fork script exists)

---

## 2. ZCode — Primary Agent/Workflow Reference

### 2.1 Product Identity

ZCode is "Z.ai's Agentic Development Environment (ADE) built to bring GLM-5.2 into real coding workflows." It "combines the best AI agents with your existing tools so you can plan, code, review, and deploy without friction." [OBSERVED: zcode.z.ai]

### 2.2 The Key Principle: Task Continuity

**"ZCode Agent continuously combines workspace state, tool results, and Git changes throughout task execution, turning model capability into stable code changes."** [OBSERVED: zcode.z.ai docs]

This is the defining principle: **the task keeps everything connected**. Not disconnected tool calls — one continuous task where:
- Goal
- Context (files, workspace state)
- Plan
- Execution (tool results, Git changes)
- Verification
- Review

all stay connected inside ONE task.

### 2.3 Plan Mode

"Some coding agents also provide a dedicated Plan mode that generates a complete execution plan before implementation begins." [OBSERVED: docs.z.ai ZCode best practice]

This mirrors Manus's Plan Mode and Cursor's Plan Mode:
1. User states goal
2. Agent researches (codebase, docs, clarifying questions)
3. Agent generates plan (markdown with steps)
4. User reviews + edits plan
5. User approves
6. Agent executes against the plan

### 2.4 Memory Mechanism

"Memory enables a coding agent to retain context across tasks and sessions, reducing repeated input and improving execution efficiency." [OBSERVED: docs.z.ai ZCode memory-mechanism]

### 2.5 Tool Integration

"ZCode integrates AI agents into your existing toolchain, supporting local execution and automated engineering tasks." [OBSERVED: docs.z.ai ZCode tool-integration]

Supported capabilities:
- Vision Understanding
- Web Search MCP
- Web Reader MCP
- Zread MCP

### 2.6 Thought Level / Effort Control

From the Z.ai thinking mode docs: the reasoning effort level can be controlled via the `thinking` parameter. This maps to the ZCode UI as a thought-level selector.

From external research: "the reasoning effort level can simply be controlled via a system prompt. Thinking effort level: 0.8, and adjusts its token usage accordingly." [DOCUMENTED: Ahead of AI blog]

Qwen Code (a comparable tool) offers `/effort` command with tiers. [DOCUMENTED: Qwen Code docs]

### 2.7 Permission Model

From ZCode's best practice docs: "Unlike traditional copilot-style tools, coding agents do more than generate code from prompts. They can read and navigate codebases, modify files, run commands..." — implying permission controls for these actions.

Manus (a comparable agent): "Every terminal command requires explicit approval — 'Allow Once' or 'Always Allow'." [OBSERVED: manus.im/docs]
Cursor (comparable): "File write approval + permission modes." [OBSERVED: cursor.com/docs]

### 2.8 Evidence Gaps (ZCode desktop interface)

- **Desktop app UI**: Not installable in sandbox (Electron binary requires GUI).
- **Task lifecycle UI**: Not directly observed.
- **Plan Mode UI**: Not directly observed.
- **Approval UI**: Not directly observed.

**INFERENCE**: Based on the docs + comparable tools (Cursor, Manus):
- Task creation from a prompt
- Plan as markdown (editable, source of truth)
- Approval before file modifications
- Progress indicators (steps, current action)
- Result presentation (diffs, artifacts)
- Task continuity (resume, continue, follow-up)

---

## 3. Transferable Principles for MiMo

### From Z.ai:
1. **Toggleable thinking per-turn** → MiMo's Effort selector (Fast/Balanced/Deep)
2. **Single-agent philosophy** → One coherent intelligence, not a swarm
3. **Web Search in Chat** → Inline citations with source links
4. **Context caching** → MiMo's memory + knowledge act as cached context
5. **⌘K + ⌘I** → Universal command + thinking toggle

### From ZCode:
1. **Task continuity** → MiMo Task keeps goal + context + plan + execution + results connected
2. **Plan Mode** → Inline task card with expandable plan + approval
3. **Memory across sessions** → MiMo's persistent memory + knowledge
4. **Tool integration** → MiMo's ToolPolicyEngine + RuntimeGateway (internal, not user-facing)
5. **Workspace state connected to task** → MiMo's project scope + task scope

### From both:
1. **Long-horizon tasks are the unit of work** → MiMo Task can run for hours/days
2. **Agent does more than generate text** → MiMo executes, researches, creates artifacts
3. **User controls depth** → Effort/Thinking level as a per-turn knob
4. **Context never lost** → Task + project + memory + knowledge stay connected

---

## 4. What MiMo Must NOT Copy

1. **ZCode's developer-focused UI** — MiMo is a Life OS, not a coding tool
2. **Z.ai's API-level thinking parameter** — MiMo exposes effort as a user-facing concept
3. **Terminal/IDE aesthetics** — MiMo is human-readable, not technical
4. **Code-centric workflow** — MiMo handles life tasks, not just code
5. **Git/diff as primary output** — MiMo produces documents, plans, research, not just code changes

---

## 5. MiMo's Unique Differentiator

MiMo combines:
- **Z.ai's interaction simplicity** (conversation + effort control)
- **ZCode's task continuity** (goal → plan → execute → verify → result)
- **MiMo's personal life context** (memory + knowledge + projects + timeline)

The result is NOT a chatbot, NOT a coding tool, NOT a dashboard.

It is a **persistent personal intelligence system** where:
- Conversation is the natural language interface
- Tasks are the execution unit
- Projects are living contexts
- Memory is continuity
- Knowledge is understanding
- Agents are workers
- Artifacts are outputs
- Timeline is history

**The UI must communicate this difference.**
