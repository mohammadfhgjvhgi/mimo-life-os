# MiMo — Z.ai × ZCode Design Synthesis

> **The product DNA synthesis. Z.ai interaction DNA + ZCode execution DNA + MiMo Life OS = one coherent product.**

---

## 1. Z.ai Interaction DNA

### What Z.ai Is (OBSERVED from docs.z.ai)

Z.ai is a single-agent AI platform with toggleable reasoning, built for long-horizon tasks. The defining interaction principle is:

> **Reasoning depth is a continuously-variable knob, not a mode.**

Per-turn `thinking` parameter: "smarter when things are hard, faster when things are simple." The model stays coherent across turns.

### Z.ai Interaction Anatomy

| Element | Observed | Documented | Inferred | MiMo Translation |
|---------|----------|------------|----------|------------------|
| **Shell** | Docs: Mintlify left sidebar + center + right TOC | Consumer: JS-rendered SPA (NOT observed) | Clean, focused chat surface | Conversation fills viewport; minimal chrome |
| **Navigation** | Docs: ⌘K search + left sidebar nav | Consumer: NOT observed | Sidebar with conversation history | 48px rail + summoned sidebar |
| **Conversation** | Streaming (`reasoning_content` + `content` channels) | Default thinking ON for GLM-5.2 | Token-by-token rendering | Streaming + Action Trace (not chain-of-thought) |
| **Composer** | NOT observed (consumer SPA) | Model selection is first sidebar entry (inverse of Gemini) | Model selector in/near composer | Effort selector in composer (Fast/Balanced/Deep) |
| **Model selection** | 14 variants (TOO MANY — documented weakness) | Each variant has own docs page | Collapse to 2-3 tiers | 3 effort levels (not 14 models) |
| **Thinking control** | `thinking` parameter per-turn (OBSERVED) | Turn-Level Thinking + Interleaved Thinking + Preserved Thinking | Per-turn toggle accessible in UI | Effort as per-turn knob in composer |
| **Tools** | Web Search (3 layers: API + Chat RAG + Search Agent) | MCP server support | Tool calls visible in conversation | Inline citations + Action Trace tool details |
| **Attachments** | NOT observed | NOT documented | Standard file upload pattern | Contextual file attachment (progressive disclosure) |
| **Search** | 3-layer decomposition (OBSERVED) | API + Chat RAG + Search Agent | Inline citations in chat | Inline `[1]`, `[2]` expandable citations |
| **Research** | Search Agent (multi-turn autonomous) | NOT consumer-observed | Research as a distinct workflow | Research as a task type (question → sources → synthesis → answer) |
| **Task execution** | NOT observed (consumer) | GLM-5.1: "up to 8 hours on a single task" | Long-running task indicator | Background task indicator + task card |
| **Results** | Streaming content + separate reasoning | Slide/Poster Agent produces artifacts | Result + artifact in conversation | Inline result + artifact card |
| **Artifacts** | Slides, posters, frontend code, video | NOT consumer-observed | Generated output shown in conversation | Inline artifact cards |
| **Settings** | NOT observed | NOT documented | Standard settings modal | Summoned via S key |
| **Keyboard** | ⌘K (OBSERVED in docs) + ⌘I (Deep Thinking) | NOT consumer-observed | Keyboard-first interaction | ⌘K universal + single-key daily-5 |
| **Responsive** | NOT observed | NOT documented | Responsive web app | Desktop-first; deliberate breakpoints |
| **Visual hierarchy** | Docs: model selection first (inverse of Gemini) | NOT consumer-observed | Clean, focused, dark-mode | Warm-neutral palette + ONE accent |
| **Progressive disclosure** | 14-variant picker = FAILURE (documented) | — | Collapse to 3 tiers | 3 effort levels, tools hidden by default |
| **Long session** | Context caching + Preserved Thinking (OBSERVED) | GLM-5.2: 1M context, GLM-5.1: 8 hours | Long conversations supported | Memory + knowledge as cached context |
| **Trust** | Open-weight + reproducibility artifacts | NOT consumer-observed | Transparent, verifiable | Every memory shows source + timestamp + delete |
| **Explainability** | `reasoning_content` API field (OBSERVED) | NOT consumer-observed (evidence gap) | API-level, not consumer-UI | Action Trace (operational state, not reasoning) |

### Z.ai's Biggest Strengths (OBSERVED)
1. Toggleable thinking per-turn
2. Long-horizon task positioning (1M context, 8-hour autonomous)
3. 3-layer search decomposition
4. OpenAI-compatible API
5. Context caching

### Z.ai's Biggest Weaknesses (OBSERVED)
1. 14-variant model picker (cognitive overload)
2. Consumer chat surface is SPA-only (not inspectable — evidence gap)
3. No documented Canvas-like workspace
4. No documented consumer-facing memory introspection
5. No documented plan-checkpoint UX
6. Accessibility undocumented
7. Privacy/data retention undocumented

---

## 2. ZCode Execution DNA

### What ZCode Is (OBSERVED from zcode.z.ai docs)

ZCode is Z.ai's agentic development environment. The defining principle is:

> **The task keeps everything connected. Goal + context + plan + execution + verification + review stay inside ONE continuous task.**

### ZCode Interaction Anatomy

| ZCode Pattern | Evidence | Why It Works | MiMo Translation |
|---------------|----------|-------------|------------------|
| **Task continuity** | OBSERVED: "continuously combines workspace state, tool results, and Git changes" | Context never lost; user doesn't re-explain | Life Task keeps intent + context + plan + results connected |
| **Plan Mode** | OBSERVED: "generates complete execution plan before implementation" | User reviews before execution; prevents unwanted changes | Inline task card with expandable plan + approval |
| **Goal Mode** | OBSERVED: "sets a verifiable objective; agent keeps iterating until goal is met" | Autonomous long-running work with clear completion criteria | Autonomous Life Task (works until user-defined goal is met) |
| **Auto Mode** | OBSERVED: "proceeds more automatically" | Fast execution for low-risk tasks | Default task mode (auto-execute for simple tasks) |
| **Execution modes** | OBSERVED: "switch modes based on task risk" | Risk-appropriate autonomy | Task mode selector (Plan / Auto / Goal) |
| **Memory** | OBSERVED: "retain context across tasks and sessions" | Reduces repeated input | Persistent memory + knowledge (already in MiMo) |
| **Tool integration** | OBSERVED: Vision, Web Search MCP, Web Reader MCP, Zread MCP | Extensible capabilities | Internal agent tools (not user-facing) |
| **Long-horizon tasks** | OBSERVED: "combine workspace state, file references, execution mode, Git branch context" | Hours-long work without losing thread | Background tasks + checkpoint recovery |
| **Automations** | OBSERVED: "run on the cadence you set and leave results in a session" | Recurring work without manual trigger | Scheduled/recurring life tasks (future) |
| **Subagents** | OBSERVED: "custom subagents" with specific roles | Specialized agents for different task types | MiMo agents (Planner, Researcher, Writer, Verifier) |
| **Remote control** | OBSERVED: "phone icon opens Mobile Remote Control" | Control from mobile while away | Mobile-responsive web (future) |
| **Approvals** | INFERRED from Plan Mode + execution modes | User controls destructive actions | Inline approval cards (Allow Once / Always Allow) |
| **Checkpoints** | INFERRED from GLM-5.2 docs: "first provide execution plan, impact scope, risk boundaries, verification method" | Recovery from interruption | CheckpointManager (already in MiMo backend) |
| **Review** | INFERRED from "leave results in a session for you to review" | User verifies after completion | Task completion card with result + verify actions |

### ZCode → MiMo Translation

| ZCode Concept | MiMo Equivalent |
|---------------|-----------------|
| Code Task | Life Task (research, plan trip, learn, organize) |
| Workspace state | Life Context (memory + knowledge + project) |
| File references | Personal files / project files |
| Git changes | Result / Artifact / Decision |
| Git review | Result verification |
| Developer permission | User approval |
| Execution mode | Task mode (Plan / Auto / Goal) |
| Long-horizon task | Long-running life task |
| Subagents | MiMo agents |
| Automations | Scheduled life tasks |
| Remote control | Mobile-responsive web |

---

## 3. Secondary Product Contributions

### Product DNA Hierarchy

| Product | DNA Contribution | What MiMo Borrows |
|---------|-----------------|-------------------|
| **Z.ai** | Primary interaction DNA | Effort selector, single-agent, inline citations, conversation-first |
| **ZCode** | Primary execution DNA | Task continuity, execution modes, Plan Mode, long-horizon |
| **Claude** | Artifact DNA | Inline artifact cards, persistent memory, context compaction |
| **Perplexity** | Research DNA | Clarifying questions, numbered citations |
| **NotebookLM** | Source-grounding DNA | Per-claim source-to-quote citation, knowledge provenance |
| **Manus** | Agent visibility DNA | Action Trace (live runtime), inline approvals, scheduled tasks |
| **Linear** | Command/keyboard DNA | ⌘K, single-key, asymmetric motion, calm density |
| **Raycast** | Command-first DNA | Prefix grammar, Quick AI on selection |
| **Cursor** | Plan→execute→verify DNA | Task plan + approval + checkpoint recovery |
| **ChatGPT** | General AI DNA | Model selection in composer (2025 trend) |
| **Gemini** | Multimodal DNA | (future: multimodal inputs) |
| **Notion** | Anti-pattern DNA | REJECT: 8 AI surfaces, block-first model |
| **v0** | Anti-pattern DNA | REJECT: 8 containers, static "waiting" |
| **Lovable** | Anti-pattern DNA | REJECT: 7 containers, feature creep |

---

## 4. Existing MiMo Capabilities

### Backend (ASSET — preserved)
- ✅ Core pipeline: buildContext → reason → plan → execute → validate → response
- ✅ Memory: MemoryEngine + MemoryIntelligence + consolidation + decay + 6 types
- ✅ Knowledge: KnowledgeGraph + GraphRAG + 13 entity types + 18 relationship types
- ✅ Agents: 4 agents (Planner, Researcher, Memory, Writer) + AgentLifecycle + CheckpointManager
- ✅ Tools: 3 tools + ToolPolicyEngine + RuntimeGateway + SandboxManager
- ✅ Events: EventBus + EventLog (persistent) + SSE stream
- ✅ Tasks: Task model + API (/api/tasks) + useTasks hook + TaskCard
- ✅ Search: HybridSearch (FTS + vector + graph)
- ✅ Model routing: ModelRouter (5 profiles) + executeWithFallback + LocalModelProvider
- ✅ Backup: BackupEngine + API
- ✅ Security: DbSecurityAudit + secret redaction + path validation
- ✅ 119 tests passing

### Frontend (current state)
- ✅ Shell (Quiet Surface concept)
- ✅ Rail (48px, 4 buttons + logo)
- ✅ Conversation (ChatView + streaming)
- ✅ Composer (effort selector + mode + tools toggle)
- ✅ AgentStatus (Action Trace — 3 levels)
- ✅ TaskCard (inline lifecycle card)
- ✅ BackgroundTaskIndicator (minimized tasks)
- ✅ Sidebar (5 views: Context/Memory/Knowledge/Tasks/Timeline)
- ✅ CommandPalette (⌘K)
- ✅ UniversalSearch (⌘/)
- ✅ useEventStream (SSE consumer)

---

## 5. Existing MiMo Weaknesses

1. **No inline memory citations** — `[mem:abc]` expandable cards not implemented
2. **No inline knowledge links** — `[ent:xyz]` expandable entities not implemented
3. **No inline artifact cards** — artifacts not shown in conversation
4. **No inline approval cards** — ToolPolicyEngine has `requiresConfirmation` but no UI
5. **No inline error cards** — errors shown as text, no retry/fix actions
6. **No research workflow** — research is not a distinct task type with source tracking
7. **No artifact API** — Artifact Prisma model exists but no CRUD routes
8. **No memory edit/delete API** — UI buttons exist but no PATCH/DELETE routes
9. **No execution modes** — ZCode's Plan/Goal/Auto modes not translated to MiMo
10. **No scheduled tasks** — ZCode's Automations not translated
11. **Message virtualization** — 1000+ messages not virtualized
12. **VLM grade A-** — still feels like "polished dark mode" not "OS" (per VLM audit)

---

## 6. Things to Remove

Nothing to remove — the current 18 active components are clean. The old components were already deleted in prior sessions.

---

## 7. Things to Preserve

- ALL backend (Core, APIs, events, persistence, SSE, tools, runtime, sandbox, agents, memory, knowledge, GraphRAG)
- Shell concept (Quiet Surface — conversation fills viewport)
- Rail (48px, 4 buttons + logo)
- Composer (effort selector + progressive disclosure)
- AgentStatus (Action Trace — 3 levels)
- TaskCard + BackgroundTaskIndicator
- Sidebar (5 views)
- CommandPalette + UniversalSearch
- useEventStream + useTasks hooks
- 119 tests
- Design tokens (--m-* + --nv-*)

---

## 8. Things to Redesign

1. **MessageItem** — add inline `[mem:abc]`, `[ent:xyz]`, artifact cards, approval cards, error cards
2. **Composer** — add slash commands (future), verify effort mapping to ModelRouter
3. **Sidebar** — verify all 5 views with real data, add provenance display
4. **CommandPalette** — add prefix grammar (>, @, /, #)
5. **TaskCard** — add execution mode selector (Plan/Auto/Goal)

---

## 9. Things to Introduce

1. **Inline memory citations** — `[mem:abc]` expandable cards in AI messages
2. **Inline knowledge links** — `[ent:xyz]` expandable entities in AI messages
3. **Inline artifact cards** — preview + expand + actions in AI messages
4. **Inline approval cards** — "MiMo wants to..." + Approve/Reject
5. **Inline error cards** — What/Why/Retry/Fix/Details
6. **Research workflow** — question → sources → synthesis → cited answer → artifact
7. **Artifact API** — `/api/artifacts` CRUD routes
8. **Memory edit/delete API** — `PATCH/DELETE /api/mimo/memory/[id]`
9. **Execution modes** — Plan / Auto / Goal as task-level setting
10. **Scheduled tasks** — recurring life tasks (future)

---

## 10. Final Product Principles

1. **Conversation is the operating system** — everything slides in to support it
2. **Calm. Alive. Mine.** — calm default, alive workflow, personal ownership
3. **Maximum capability behind minimum visible complexity** — beginner sees simplicity, advanced user discovers depth
4. **Effort as a per-turn knob** — not a permanent mode (Z.ai DNA)
5. **Task continuity** — goal + context + plan + execution + results stay connected (ZCode DNA)
6. **Action Trace, not chain-of-thought** — operational state, never internal reasoning
7. **Inline over sidebar** — memory, knowledge, artifacts, approvals appear in conversation when relevant
8. **Progressive disclosure** — default is calm, complexity appears when summoned
9. **Keyboard as home** — ⌘K universal, single-key daily-5, ≤2 modifiers
10. **ONE accent, no decorative gradients** — violet, used sparingly
11. **Real data only** — no fake stats, no seed data, honest empty states
12. **Local-first** — no network in critical path, no counters, no deprecations
