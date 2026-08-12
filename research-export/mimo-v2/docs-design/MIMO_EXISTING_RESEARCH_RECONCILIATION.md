# MiMo — Existing Research Reconciliation Report

> **Mandatory prerequisite.** Recovered, inspected, classified, and reconciled all existing research before any new design work.

---

## 1. Research Inventory

### A. Primary Product Research (`research/evidence/` — 54 product files)

| Product | File | Research Date | Quality | MiMo Relevance | Key Findings |
|---------|------|---------------|---------|----------------|--------------|
| **Z.ai / GLM** | `glm.md` | 2026-08-07 | HIGH (docs.z.ai Mintlify) | PRIMARY | Single-agent + toggleable thinking. `thinking` parameter per-turn. Long-horizon task positioning. MCP support. Web Search tool (3 layers). Context caching. Preserved thinking. |
| **ChatGPT** | `chatgpt.md` | 2026-08-07 | HIGH | SECONDARY | 2-layer memory (saved + reference). Project-scope (Aug 2025). Canvas (sunset). GPTs. |
| **Claude** | `claude.md` | 2026-11-15 | HIGH | SECONDARY | Artifacts (side panel, versioning, publish/share). Projects (isolated memory). Persistent memory (Sep 2025). Cowork. Extended thinking + tool use. |
| **Cursor** | `cursor.md` | 2025-08-07 | HIGH (cursor.com/docs RSC) | SECONDARY (agent) | Editor-first + Agent. Plan Mode (research → plan → approve → execute). Per-file diffs. Cloud Agents. Rules/Skills/MCP. |
| **Manus** | `manus.md` | 2026-08-07 | HIGH | SECONDARY (agent) | Live computer pane (never spinner). Plan Mode (markdown plan, editable, source of truth). Approvals ("Allow Once" / "Always Allow"). Scheduled tasks. Projects. |
| **NotebookLM** | `notebooklm.md` | 2025-11-07 | HIGH | SECONDARY (research) | Source-grounded assistant. Per-claim source-to-quote citation (GOLD STANDARD). Audio Overview. Mind Map. |
| **Perplexity** | `perplexity.md` | 2026-08-07 | MEDIUM | SECONDARY (search) | Collections. Threads. Pro Search (clarifying questions). Sparkpage. |
| **Linear** | `linear.md` | 2026-08-07 | HIGH | SECONDARY (task/density) | Single-issue-list (premium feel). Single-key shortcuts. Hold-Space. ⌘K. Asymmetric motion (0ms enter, 150ms exit). |
| **Notion** | `notion.md` | 2026-08-07 | HIGH | SECONDARY (anti-pattern) | 8 AI surfaces = cognitive overload. Block-first model. |
| **Raycast** | `raycast.md` | 2026-08-07 | HIGH | SECONDARY (command) | ⌘⇧Tab Quick AI on selection. Prefix grammar. Extensions. Hotkeys. |
| **Aider** | `aider.md` | 2026-08-07 | HIGH (installed CLI) | SECONDARY (diff) | Git diffs as first-class. Auto-commit + revert. Repo-map. `/commands`. |
| **OpenHands** | `openhands.md` | 2026-08-07 | HIGH (installed) | SECONDARY (agent) | Event-stream (12 types). Agent Canvas. Task delegation. Time-travel. |
| **Claude Code** | `claude-code.md` | 2026-11-15 | HIGH (installed CLI) | SECONDARY (agent) | CLAUDE.md (5-tier). 6 permission modes. Subagents. Hooks. Auto-memory. |
| **Devin** | `devin.md` | 2026-08-07 | MEDIUM | SECONDARY (anti-pattern) | "Teammate" model. Async PRs. No live visibility. |
| **Arc** | `arc.md` | 2026-08-07 | HIGH | SECONDARY (tabs) | Pinned/Today + auto-archive. Command-as-tab-creation. |
| **Obsidian** | `obsidian.md` | 2026-08-07 | HIGH | SECONDARY (knowledge) | Graph view. Backlinks. Local-first. Plugins. |
| **Heptabase** | `heptabase.md` | 2026-08-07 | HIGH | SECONDARY (knowledge) | Card-based. Whiteboard. Visual relationships. |
| **v0** | `v0.md` | 2026-08-07 | HIGH | ANTI-PATTERN | 8 containers = overload. Static "waiting" state. |
| **Lovable** | `lovable.md` | 2026-08-07 | HIGH | ANTI-PATTERN | 7 containers = feature creep. |

### B. Academic Foundations (`research/academic/` — 16 files)

| Topic | File | Key Principle |
|-------|------|---------------|
| Cognitive Load Theory | `cognitive-load-theory.md` | Minimize extraneous load; manage intrinsic load; maximize germane load |
| Progressive Disclosure | `progressive-disclosure.md` | Reveal complexity only when needed |
| Miller's Law | `millers-law.md` | 7±2 items in working memory |
| Hick's Law | `hicks-law.md` | More choices = slower decisions |
| Fitts's Law | `fitts-law.md` | Larger + closer = faster interaction |
| Nielsen Heuristics | `jakob-nielsen.md` | Visibility of system status; user control; consistency |
| Norman's Design Rules | `don-norman.md` | Affordances; signifiers; feedback; conceptual models |
| Shneiderman | `ben-shneiderman.md` | 8 golden rules; direct manipulation |
| Recognition vs Recall | `recognition-vs-recall.md` | See options > remember commands |
| Jef Raskin | `jef-raskin.md` | Quasimodes (hold-to-activate); humane interface |
| Alan Cooper | `alan-cooper.md` | Goal-directed design; personas |
| Human-AI Interaction | `human-ai-interaction.md` | Amershi 2019 — 18 guidelines for HAI |
| Trust in AI | `trust-in-ai.md` | Transparency + control + performance |
| Explainable AI | `explainable-ai.md` | Interpretability vs completeness |
| Information Scent | `information-scent.md` | Users follow strongest scent |
| Direct Manipulation | `direct-manipulation.md` | Visible objects + rapid feedback |

### C. Architecture Documents (`architecture/` — 27 files)

| Document | Relevance to UI |
|----------|----------------|
| `MiMo_Frontend_Architecture.md` | Shell layout, state boundaries, data flow. Frontend = consumer of domain. |
| `MiMo_State_Architecture.md` | 5 state slices (UI, Workspace, Conversation, Session, Cache). |
| `MiMo_UI_Architecture.md` | Layout grid, rail, topbar, sidebar, conversation, composer, motion, accessibility. |
| `MiMo_System_Architecture.md` | 10-layer architecture (L0-L9). Dependency direction. |
| `MiMo_Context_Architecture.md` | Context layers, token budget, GraphRAG pipeline. |
| `MiMo_Memory_Architecture.md` | 6 memory types, consolidation, decay, conflict resolution. |
| `MiMo_Knowledge_Architecture.md` | 13 entity types, 18 relationship types, hybrid search. |
| `MiMo_Agent_Architecture.md` | 9-stage pipeline, 6 agents, trust ledger, checkpoints. |
| `MiMo_Tool_Architecture.md` | 13-field contract, risk levels, ToolPolicyEngine. |
| `MiMo_Runtime_Architecture.md` | RuntimeGateway, SSRF defense, sandbox profiles. |
| `MiMo_Search_Architecture.md` | ONE search with 8 facets. FTS5 + vector + graph. |
| `MiMo_Security_Architecture.md` | 6 trust boundaries. No multi-user auth. Prompt injection defense. |

### D. Existing Design Documents (`docs/design/` — 11 files)

| Document | Status | Key Content |
|----------|--------|-------------|
| `MIMO_ZERO_BASED_UI_UX_MASTER_SPEC.md` | LATEST (V3) | 29 sections. "Quiet Surface" concept. Removed dev workspace. |
| `MIMO_UI_UX_V2_MASTER_SPEC.md` | SUPERSEDED | V2 spec with Task System. |
| `MIMO_UI_UX_MASTER_SPEC.md` | SUPERSEDED | V1 "Quiet Surface" initial. |
| `MIMO_UI_UX_DECISION_MATRIX.md` | ACTIVE | 10 design decisions with evidence. |
| `MIMO_UI_UX_GAP_ANALYSIS.md` | ACTIVE | 21 capability→UI gaps. 4 closed, 7 remain. |
| `MIMO_UI_UX_RESEARCH_SYNTHESIS.md` | ACTIVE | Pattern extraction from 54 products. |
| `MIMO_VISUAL_AUDIT.md` | ACTIVE | VLM-powered audit (pre-rebuild). |
| `MIMO_FINAL_VISUAL_SYSTEM.md` | ACTIVE | Implemented visual language (A- grade). |
| `MIMO_ZERO_BASED_FINAL_QA.md` | ACTIVE | Dev workspace removal QA. |
| `MIMO_UI_UX_V2_FINAL_QA.md` | ACTIVE | Task System QA. |
| `MIMO_UI_UX_FINAL_AUDIT.md` | ACTIVE | V1 audit. |

### E. Product Bible (`MiMo_Product_Bible.md` — 3,407 lines, 33 parts)

The highest authority. Key parts for UI:
- **Part 1**: Identity — "Calm. Alive. Mine." Conversation-spine AI OS.
- **Part 2**: Mental Model — Senior collaborator. ONE primary object (Conversation).
- **Part 3**: IA — Rail ≤8, topbar 44px, sidebar 320px, conversation 820px max.
- **Part 12**: Conversation — pinned, never closes, fork, virtualization.
- **Part 13**: Workspace — Projects, tabs, focus mode, persistent state.
- **Part 15**: Command — ⌘K prefix grammar, single-key daily-5, Quick AI.
- **Part 16**: Visual — 4px grid, ONE accent, tonal separation.
- **Part 17**: Motion — 0/100/200/300/500ms tiers, asymmetric.
- **Part 19**: Accessibility — WCAG AA, reduced motion, screen readers.
- **Part 28**: Always Visible / Conditional / Hidden.

---

## 2. Existing Knowledge Map

### AI Conversation UX
- **Z.ai**: Single-agent + toggleable thinking. `thinking` parameter per-turn. [OBSERVED: docs.z.ai]
- **ChatGPT**: 2-layer memory. Canvas (sunset). GPTs. [DOCUMENTED: openai.com]
- **Claude**: Artifacts side panel. Extended thinking. Streaming. [DOCUMENTED: anthropic.com]
- **Gemini**: Deep Research live thoughts. Gems. Canvas. [DOCUMENTED: blog.google]

### Agent UX
- **ZCode**: Workspace state + tool results + Git changes stay connected to one task. Plan → execute → verify → review. [OBSERVED: zcode.z.ai docs]
- **Cursor**: Plan Mode (research codebase → markdown plan → approve → execute). Per-file diffs. [OBSERVED: cursor.com/docs]
- **Manus**: Live computer pane. Plan Mode (markdown, editable). Approvals. [OBSERVED: manus.im/docs]
- **OpenHands**: Event-stream (12 types). Agent Canvas. Time-travel. [OBSERVED: docs.all-hands.dev]

### Long-Running Tasks
- **ZCode/GLM-5.2**: "Built for long-horizon tasks." 1M-token context. Project-scale engineering. [OBSERVED: docs.z.ai]
- **Claude Code**: Orchestrator spawns agents from task queue. Overnight execution. [DOCUMENTED: anthropic.com]
- **Manus**: Scheduled tasks (daily/weekly/monthly). Cloud Computer (24/7). [OBSERVED: manus.im/docs]

### Tool Execution
- **Z.ai**: Function Calling + Web Search (3 layers) + MCP. [OBSERVED: docs.z.ai]
- **Cursor**: Agent runs terminal commands + edits code. [OBSERVED: cursor.com/docs]
- **Manus**: Cloud Browser + Desktop + Browser Operator. [OBSERVED: manus.im/docs]

### Research UX
- **NotebookLM**: Source-grounded. Per-claim source-to-quote citation. [DOCUMENTED: blog.google]
- **Perplexity**: Pro Search with clarifying questions. Collections. [DOCUMENTED: docs.perplexity.ai]
- **Z.ai**: Web Search in Chat (RAG with cited sources). Search Agent. [OBSERVED: docs.z.ai]

### Memory UX
- **ChatGPT**: 2-layer (saved + reference). Project-scoped (Aug 2025). [DOCUMENTED: openai.com]
- **Claude**: Persistent memory (Sep 2025). Visible, editable, exportable. Pause/Reset. [DOCUMENTED: support.claude.com]
- **Claude Code**: Auto-memory (unique — automatic extraction). [DOCUMENTED: anthropic.com]

### Knowledge UX
- **Obsidian**: Graph view. Backlinks. Local-first. [OBSERVED: obsidian.md]
- **Heptabase**: Card-based. Whiteboard. Visual relationships. [OBSERVED: heptabase.md]
- **Tana**: Entity system. Structured data. [OBSERVED: tana.md]

### Artifact UX
- **Claude**: Artifacts side panel. Version selector. Publish/share. In-place edit. [DOCUMENTED: support.claude.com]
- **Cursor**: Per-file diffs. Composer (multi-file). [OBSERVED: cursor.com/docs]
- **Aider**: Git diffs as first-class. Auto-commit + revert. [OBSERVED: aider.chat]

### Command Palette
- **Linear**: ⌘K universal. Single-key. Hold-Space. [OBSERVED]
- **Raycast**: ⌘⇧Tab Quick AI. Prefix grammar. Extensions. [OBSERVED]
- **VS Code**: ⌘P + ⌘⇧P. Prefix grammar (> @ #). [OBSERVED]

### Model/Effort Controls
- **Z.ai**: `thinking` parameter (enabled/disabled per turn). [OBSERVED: docs.z.ai]
- **OpenAI**: Reasoning effort (low/medium/high). [DOCUMENTED: platform.openai.com]
- **Claude**: Extended thinking (on/off). [DOCUMENTED: anthropic.com]
- **Qwen Code**: `/effort` command with tiers. [DOCUMENTED: qwen code docs]

### Approval UX
- **Cursor**: File write approval. Permission modes. [OBSERVED: cursor.com/docs]
- **Manus**: "Allow Once" / "Always Allow" for terminal commands. [OBSERVED: manus.im/docs]
- **Claude Code**: 6 permission modes. [DOCUMENTED: anthropic.com]

### Task Lifecycle
- **ZCode**: Goal → Plan → Execute → Verify → Review → Continue. [OBSERVED: zcode.z.ai]
- **Manus**: Plan Mode (markdown, editable, source of truth). [OBSERVED: manus.im/docs]
- **Cursor**: Plan Mode (research → markdown → approve → execute). [OBSERVED: cursor.com/docs]

---

## 3. Competitive Patterns (Concrete)

### Composer Behavior
| Product | Pattern | Why It Works | MiMo Adaptation |
|---------|---------|-------------|-----------------|
| Z.ai | Thinking toggle per-turn | Cost/latency control | Effort selector (Fast/Balanced/Deep) |
| Claude | Side panel for artifacts | Output doesn't block conversation | Inline artifact cards |
| Cursor | Cmd-K inline edit | Quick action without context switch | Quick AI on selection |
| Manus | "What can I do for you?" + quick-action chips | Reduces cold-start friction | Suggestion chips in empty state |

### Sidebar Behavior
| Product | Pattern | Why It Works | MiMo Adaptation |
|---------|---------|-------------|-----------------|
| Z.ai | History + new chat + settings | Simple, focused | Summoned sidebar (Context/Memory/Knowledge/Tasks/Timeline) |
| Claude | Chats + Projects + Artifacts sections | Organized by type | Single adaptive sidebar (swaps by context) |
| Linear | Workspace + Inbox + My Issues | Hierarchical, not flat | Rail (4 buttons) + summoned sidebar |
| Notion | Sidebar with nested pages | Deep hierarchy | AVOID (too complex for personal OS) |

### Agent Status
| Product | Pattern | Why It Works | MiMo Adaptation |
|---------|---------|-------------|-----------------|
| Manus | Live computer pane (real runtime) | User trusts what they see | Action Trace (verb + object + count) |
| Gemini | Live thoughts (Deep Research) | Transparency | AVOID chain-of-thought; use operational state |
| Cursor | Per-file diffs | See exactly what changed | Inline artifact diffs |
| Z.ai | Toggleable thinking | User controls cost | Effort selector |

### Task Lifecycle
| Product | Pattern | Why It Works | MiMo Adaptation |
|---------|---------|-------------|-----------------|
| ZCode | Workspace state + tool results + Git connected to task | Context never lost | Task as continuity mechanism |
| Manus | Plan Mode (markdown, editable) | User can review + edit before execution | Inline task card with expandable plan |
| Cursor | Plan → approve → execute | User controls destructive actions | Approval gates for file/destructive ops |

---

## 4. What MiMo Should Adopt

1. **Z.ai's toggleable thinking** → Effort selector (Fast/Balanced/Deep) in composer
2. **ZCode's task continuity** → Task keeps goal + context + plan + execution + results connected
3. **Manus's live runtime** → Action Trace (real actions, not spinner)
4. **NotebookLM's source-to-quote** → Per-claim citations in research
5. **Linear's keyboard language** → ⌘K + single-key + hold-Space
6. **Claude's artifact side panel** → Inline artifact cards + summoned artifact browser
7. **Cursor's Plan Mode** → Inline task card with expandable plan + approval
8. **Raycast's Quick AI** → ⌘⇧Tab on selection (future)

## 5. What MiMo Should Reject

1. **Notion's 8 AI surfaces** → Cognitive overload
2. **v0's 8 containers** → Feature creep
3. **Devin's no live visibility** → Black-box execution
4. **ChatGPT's Canvas sunset** → Don't build disposable features
5. **Any decorative graph visualization** → Not useful for default
6. **Any dashboard/KPI grid** → Not a personal OS
7. **Any developer workspace** → Not a developer tool

## 6. What MiMo Should Improve

1. **Conversation rendering** → Intelligent documents, not chat bubbles
2. **Composer** → Integrated control surface, not floating input box
3. **Task system** → Inline task cards with lifecycle + plan + approval
4. **Memory** → Inline citations + provenance + edit/delete
5. **Knowledge** → Entity exploration with relationships (list, not graph)
6. **Agent state** → Action Trace with real actions + counts
7. **Empty state** → Calm greeting, not dashboard

## 7. What Remains Unknown

1. **chat.z.ai consumer interface** — JS-rendered SPA, not retrievable via curl. Evidence gap: visual layout, composer design, sidebar structure, model picker placement. Need live browser inspection.
2. **ZCode desktop interface** — Desktop app, not installable in sandbox. Evidence gap: task lifecycle UI, plan mode UI, approval UI. Need screenshots or live inspection.
3. **Z.ai dark mode specifics** — Greasy Fork script exists for "dark UI for Z.ai" but no screenshots of the native dark mode.
4. **GLM-5.2 consumer chat UI** — Same JS-rendered gap as chat.z.ai.
