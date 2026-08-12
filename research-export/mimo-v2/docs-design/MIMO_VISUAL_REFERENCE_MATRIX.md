# MiMo — Visual Reference Matrix

> **Cross-product visual comparison. Every surface mapped to Z.ai (primary) + ZCode (secondary) + supporting products. Final column = what MiMo will actually build.**

---

## Surface Comparison

| Surface | Z.ai (PRIMARY) | ZCode (SECONDARY) | Claude | ChatGPT | Manus | Linear | MiMo Decision |
|---------|---------------|-------------------|--------|---------|-------|--------|---------------|
| **Shell** | INFERRED: clean chat surface, model-first hierarchy | OBSERVED: task workspace with execution mode selector | Sidebar + chat + artifact panel | Sidebar + chat | Composer + computer pane | Sidebar + dense list | **Hybrid OS shell**: conversation fills viewport, no sidebar by default, summoned context panel. Not a list app. Not a dashboard. |
| **Sidebar** | INFERRED: conversation history + new chat | OBSERVED: workspace state, execution mode, file context | Chats + Projects + Artifacts sections | Conversations + Explore | Task list + computer pane | Issues + Projects + Views | **Summoned context panel** (not persistent). 5 views but NOT equal tabs — contextual priority. Opens via rail icon or ⌘B. |
| **Composer** | INFERRED: model selector prominent, thinking toggle accessible | OBSERVED: execution mode selector, goal setting, file context | Standard textarea + attachments | Model picker IN composer (2025), attachment, tools | "What can I do for you?" + quick-action chips | N/A (issue-based) | **Command surface**: textarea + effort selector + mode + tools toggle (progressive disclosure). Effort is the Z.ai thinking toggle translated. Mode = intent type. NOT a generic input box. |
| **Conversation** | OBSERVED: streaming (reasoning_content + content channels) | OBSERVED: task execution inline, plan documents | Streaming + artifacts side panel + memory citations | Streaming + Canvas + memory references | Plan Mode markdown + approval cards + live runtime | N/A | **Intelligent documents**: AI messages are rendered content (markdown, code, citations, memory refs, knowledge refs, artifacts, tasks). NOT chat bubbles. User messages are minimal. |
| **Agent state** | DOCUMENTED: toggleable thinking (per-turn) | OBSERVED: execution mode indicator, plan/build/verify progress | Extended thinking (on/off) | "Thinking..." text | Live computer pane (real runtime) | N/A | **Action Trace**: 3-level progressive disclosure. Level 1: verb + object + pulsing dot. Level 2: action trace with checkmarks. Level 3: details. NEVER chain-of-thought. NEVER spinner. |
| **Task** | DOCUMENTED: GLM-5.1 "up to 8 hours on single task" | OBSERVED: Goal → Plan → Execute → Verify → Review, Goal Mode, Plan Mode, Auto Mode | N/A | N/A | Plan Mode (markdown, editable, source of truth) + scheduled tasks | Issue lifecycle (Draft→Active→Done) | **Life Task**: inline card with lifecycle (pending→planning→executing→validating→done). Execution mode selector (Plan/Auto/Goal — ZCode translated). Background task minimizes. Checkpoint recovery. |
| **Artifact** | DOCUMENTED: slides, posters, frontend code, video | OBSERVED: Git changes as result | Side panel + version selector + publish/share + in-place edit | Canvas (sunset) | N/A | N/A | **Inline artifact card**: preview collapsed, expand to full. Connected to conversation + task + project. Actions: copy, edit, export, save. NOT a separate panel by default. |
| **Research** | DOCUMENTED: 3-layer search (API + Chat RAG + Search Agent) | N/A | N/A | N/A | N/A | N/A | **Research as task type**: question → sources → evidence → synthesis → cited answer → saved artifact. Inline `[1]`, `[2]` citations expandable. |
| **Approval** | NOT observed | INFERRED: execution mode implies permission control | N/A | N/A | "Allow Once" / "Always Allow" for terminal commands | N/A | **Inline approval card**: what MiMo wants to do + why + risk + Approve/Reject. 4 levels: Informational / Reversible / Important / Irreversible. |
| **Search** | DOCUMENTED: ⌘K in docs | N/A | Chat search + sidebar search | Sidebar search | N/A | ⌘K universal command menu | **⌘K = command palette** (actions + navigation). **⌘/ = universal search** (content search across conversations, memories, knowledge, tasks, artifacts, files). |
| **Command** | OBSERVED: ⌘K in docs | OBSERVED: slash commands (/plan, /goal) | N/A | N/A | Slash commands (/plan, skills) | ⌘K + single-key + hold-Space | **⌘K as OS command layer**: actions + navigation + search. Prefix grammar (future: >, @, /, #). Single-key daily-5 (C/M/A/R/S). |

---

## Evidence Classification

### Z.ai Consumer Interface
- **OBSERVED**: API parameters (thinking, streaming, tools), docs layout, ⌘K/⌘I shortcuts, 14 model variants, pricing, MCP server
- **DOCUMENTED**: Product positioning (long-horizon tasks), Coding Plan, Slide/Poster Agent, Context Caching
- **INFERRED**: Clean chat surface, model selector in/near composer, thinking toggle per-turn, sidebar with history, dark mode
- **UNKNOWN**: Actual consumer visual layout, composer geometry, sidebar structure, responsive behavior, accessibility, privacy

### ZCode Desktop Interface
- **OBSERVED**: Task continuity principle, execution modes (Plan/Goal/Auto), memory mechanism, tool integration, automations, subagents, remote control
- **DOCUMENTED**: "continuously combines workspace state, tool results, and Git changes"
- **INFERRED**: Task lifecycle UI, Plan Mode visual, approval UI, checkpoint UI
- **UNKNOWN**: Actual desktop visual layout, panel structure, progress visualization

---

## Shell Alternatives Evaluated

### A — Z.ai-like Conversational Shell
- **Concept**: Clean chat surface, minimal navigation, model/effort controls in composer
- **Pros**: Simple, focused, conversation-first
- **Cons**: May feel like "just another chat app" (VLM audit: "ChatGPT clone")
- **Verdict**: Good foundation but insufficient — needs OS flavor

### B — ZCode-like Task-Aware Shell
- **Concept**: Task workspace with execution modes, plan panel, progress tracking
- **Pros**: Powerful, task-continuous, agent-visible
- **Cons**: Developer-focused, too complex for life OS
- **Verdict**: Too heavy for default; execution DNA should be INLINE, not shell-level

### C — Hybrid Conversational OS Shell (CHOSEN)
- **Concept**: Conversation fills viewport (Z.ai simplicity). Tasks, artifacts, memory, knowledge appear INLINE when relevant (ZCode execution). Context panel summoned (not persistent). Composer as command surface.
- **Why**: Combines Z.ai's calm simplicity with ZCode's task depth. Conversation is spine. OS flavor comes from inline elements, not from chrome.
- **What disappears**: Top bar, persistent sidebar, mode bar, dashboard, tabs (except conversation + artifact)
- **What becomes contextual**: Action Trace, task cards, artifact cards, memory citations, approval cards, error cards
- **What becomes summoned**: Sidebar (context panel), command palette, universal search, task detail, settings
- **How conversation remains dominant**: Fills 100% of viewport. Everything else is inline or summoned.

### D — Radically Minimal OS Shell
- **Concept**: Pure conversation + ⌘K. No rail. No sidebar. Everything via command.
- **Pros**: Maximum calm
- **Cons**: Too stark — users need memory/knowledge access without typing a command
- **Verdict**: Too extreme; needs at least minimal rail for discoverability

---

## MiMo Decision Summary

| Decision | Choice | Evidence |
|----------|--------|----------|
| Shell | C — Hybrid Conversational OS | Z.ai simplicity + ZCode execution inline |
| Rail | 48px, 4 buttons + logo | Minimal navigation; conversation dominant |
| Sidebar | Summoned, not persistent | Contextual, not competing with conversation |
| Composer | Command surface with effort + mode + tools | Z.ai thinking toggle + ZCode execution modes |
| Conversation | Intelligent documents, not bubbles | Claude artifact quality + Z.ai streaming |
| Agent state | Action Trace (3 levels) | Manus live runtime translated to operational state |
| Task | Inline Life Task with lifecycle + execution modes | ZCode task continuity translated to life context |
| Artifact | Inline card, expandable | Claude artifacts translated to inline (not side panel) |
| Research | Task type with sources + citations | Perplexity + NotebookLM citation patterns |
| Approval | Inline card, 4 levels | Manus approval pattern translated |
| Command | ⌘K as OS layer | Linear + Raycast command patterns |
| Search | ⌘/ universal | Perplexity answer+sources pattern |
