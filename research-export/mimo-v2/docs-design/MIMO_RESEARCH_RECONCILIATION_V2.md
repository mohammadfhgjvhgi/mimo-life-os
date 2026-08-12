# MiMo — Research Reconciliation V2

> **Complete recovery, verification, and reconciliation of the existing research library.**
> Every finding traced to actual repository files. No assumptions.

---

## 1. Verified Research Inventory

### A. Product Evidence Files (`research/evidence/`)

**Verified count: 54 product evidence files** (confirmed by `ls research/evidence/*.md | wc -l`)

| # | Product | File | Date | MiMo Relevance | Key Pattern |
|---|---------|------|------|----------------|-------------|
| 1 | **Z.ai / GLM** | `glm.md` (345 lines, 30 sections) | 2026-08-07 | **PRIMARY** | Toggleable thinking, long-horizon tasks, 3-layer search, MCP, context caching |
| 2 | ChatGPT | `chatgpt.md` | 2026-08-07 | Secondary | 2-layer memory, project scope, model selection in composer |
| 3 | Claude | `claude.md` | 2026-11-15 | Secondary | Artifacts side panel, persistent memory, extended thinking, context compaction |
| 4 | Claude Code | `claude-code.md` | 2026-11-15 | Secondary (agent) | CLAUDE.md 5-tier, 6 permission modes, subagents, auto-memory |
| 5 | Cursor | `cursor.md` | 2025-08-07 | Secondary (agent) | Plan Mode, per-file diffs, Cloud Agents, checkpoints |
| 6 | Manus | `manus.md` | 2026-08-07 | Secondary (agent) | Live computer pane, Plan Mode (markdown), approvals, scheduled tasks |
| 7 | NotebookLM | `notebooklm.md` | 2025-11-07 | Secondary (research) | Source-grounding, per-claim source-to-quote citation |
| 8 | Perplexity | `perplexity.md` | 2025-11-07 | Secondary (search) | Pro Search (clarifying questions), Spaces, numbered citations |
| 9 | Linear | `linear.md` | 2026-08-07 | Secondary (command) | Single-key, hold-Space, ⌘K, asymmetric motion, calm density |
| 10 | Notion | `notion.md` | 2026-08-07 | Anti-pattern | 8 AI surfaces = cognitive overload |
| 11 | Raycast | `raycast.md` | 2026-08-07 | Secondary (command) | ⌘⇧Tab Quick AI, prefix grammar, extensions |
| 12 | OpenHands | `openhands.md` | 2026-08-07 | Secondary (agent) | Event-stream 12 types, Agent Canvas, time-travel |
| 13 | Aider | `aider.md` | 2026-08-07 | Secondary (diff) | Git diffs first-class, auto-commit + revert |
| 14 | Arc | `arc.md` | 2026-08-07 | Secondary (tabs) | Pinned/Today, auto-archive, command-as-tab |
| 15 | Obsidian | `obsidian.md` | 2026-08-07 | Secondary (knowledge) | Graph, backlinks, local-first |
| 16 | Heptabase | `heptabase.md` | 2026-08-07 | Secondary (knowledge) | Card-based, whiteboard, visual relationships |
| 17 | v0 | `v0.md` | 2026-08-07 | Anti-pattern | 8 containers, static "waiting" |
| 18 | Lovable | `lovable.md` | 2026-08-07 | Anti-pattern | 7 containers, feature creep |
| 19-54 | (35 more products) | Various | Various | Tertiary | Various patterns (see full list in reconciliation) |

**Full 54-product list:** aider, amie, anytype, apple-intelligence, arc, autogpt, bolt, chatgpt, claude-code, claude, codex, continue, copilot-workspace, craft, cursor, deepseek, devin, dust, fantastical, gemini, genspark, github-spark, glm, granola, grok, helix, heptabase, jetbrains-ai, langgraph-studio, le-chat, linear, logseq, lovable, manus, meta-ai, ms-copilot, notebooklm, notion, obsidian, openhands, perplexity, raycast, reflect, replit, roam, superhuman, sweep, tana, things3, v0, vscode, warp, windsurf, zed.

### B. Academic Research (`research/academic/`)

**Verified count: 16 academic files** (confirmed by `ls research/academic/*.md | wc -l`)

| Topic | File | Key Principle for MiMo |
|-------|------|----------------------|
| Cognitive Load Theory | `cognitive-load-theory.md` | Minimize extraneous load (chrome, choices) |
| Progressive Disclosure | `progressive-disclosure.md` | Reveal complexity only when needed |
| Miller's Law | `millers-law.md` | ≤7±2 items in working memory (rail ≤7 buttons) |
| Hick's Law | `hicks-law.md` | Fewer choices = faster decisions |
| Fitts's Law | `fitts-law.md` | Larger + closer = faster interaction |
| Nielsen Heuristics | `jakob-nielsen.md` | Visibility of system status (Action Trace) |
| Norman | `don-norman.md` | Affordances, signifiers, feedback |
| Shneiderman | `ben-shneiderman.md` | Direct manipulation, user control |
| Recognition vs Recall | `recognition-vs-recall.md` | Show options > remember commands |
| Jef Raskin | `jef-raskin.md` | Quasimodes (hold-to-activate) |
| Alan Cooper | `alan-cooper.md` | Goal-directed design |
| Human-AI Interaction | `human-ai-interaction.md` | Amershi 2019 — 18 HAI guidelines |
| Trust in AI | `trust-in-ai.md` | Transparency + control |
| Explainable AI | `explainable-ai.md` | Interpretability |
| Information Scent | `information-scent.md` | Follow strongest scent |
| Direct Manipulation | `direct-manipulation.md` | Visible objects + rapid feedback |

### C. Pattern Syntheses (`research/patterns/`)

**Verified count: 16 pattern files** (confirmed by `ls research/patterns/*.md | wc -l`)

Each pattern file has 13 sections: Definition, Why It Matters, Evidence Across Products, Observed Variations, Premium Exemplars, Anti-Patterns, Cognitive Load, Progressive Disclosure, Accessibility, Performance, Long-Session, Open Questions, Confidence Score.

| Pattern | File | Lines | Best Exemplar | Anti-Pattern |
|---------|------|-------|---------------|--------------|
| Agent UX | `agent-ux.md` | 369 | Manus (live computer) | v0 (static waiting) |
| Artifacts UX | `artifacts-ux.md` | — | Claude (side panel) | — |
| Command Palette | `command-palette.md` | 277 | Linear/Raycast | — |
| Conversation UX | `conversation-ux.md` | 178 | Claude (streaming) | — |
| Execution UX | `execution-ux.md` | — | Manus (live runtime) | v0 (spinner) |
| Keyboard UX | `keyboard-ux.md` | — | Linear (single-key) | — |
| Knowledge UX | `knowledge-ux.md` | — | Obsidian (graph) | — |
| Memory UX | `memory-ux.md` | — | Claude (visible/editable) | — |
| Motion UX | `motion-ux.md` | — | Linear (asymmetric) | — |
| Navigation UX | `navigation-ux.md` | — | Linear (sidebar+⌘K) | Notion (8 surfaces) |
| Progressive Disclosure | `progressive-disclosure.md` | — | — | v0 (8 containers) |
| Search UX | `search-ux.md` | — | Perplexity (answer+sources) | — |
| Sidebar UX | `sidebar-ux.md` | — | Linear (dense+disciplined) | Notion (overloaded) |
| Tabs UX | `tabs-ux.md` | — | Arc (Pinned/Today) | — |
| Workspace UX | `workspace-ux.md` | 212 | Cursor (editor+agent) | Lovable (7 containers) |
| Accessibility | `accessibility.md` | — | Apple (VPAT) | — |

### D. Architecture Documents (`architecture/`)

**Verified count: 28 architecture files** (confirmed by `ls architecture/*.md | wc -l`)

Key documents for UI:
- `MiMo_Frontend_Architecture.md` — shell layout, state boundaries, data flow
- `MiMo_State_Architecture.md` — 5 state slices
- `MiMo_UI_Architecture.md` — layout grid, rail, topbar, sidebar, conversation, composer
- `MiMo_System_Architecture.md` — 10-layer architecture
- `MiMo_Context_Architecture.md` — context layers, token budget, GraphRAG
- `MiMo_Memory_Architecture.md` — 6 memory types, consolidation, decay
- `MiMo_Knowledge_Architecture.md` — 13 entity types, 18 relationship types
- `MiMo_Agent_Architecture.md` — 9-stage pipeline, 6 agents, checkpoints
- `MiMo_Tool_Architecture.md` — 13-field contract, risk levels, ToolPolicyEngine
- `MiMo_Runtime_Architecture.md` — RuntimeGateway, SSRF defense, sandbox

### E. Research Top-Level Docs (`research/`)

**Verified count: 16 top-level docs**

| Document | Purpose |
|----------|---------|
| `MASTER_RESEARCH_MATRIX.md` | 54 products + 16 academic + 16 patterns with evidence grades |
| `MiMo_FINAL_EVIDENCE_MAP.md` | 35 major decisions mapped to evidence |
| `MiMo_RESEARCH_READINESS.md` | READY/ACCEPTED LIMITATIONS/BLOCKERS declaration |
| `RESEARCH_GAP_CLOSURE.md` | 12 CLOSED, 18 ACCEPTED LIMITATION, 0 BLOCKERS |
| `R2_Final_Report.md` | R2 research phase final report |
| `research-group-A.md` through `research-group-J.md` | 10 research group files covering all 54 products |

### F. Design Documents (`docs/design/`)

**Verified count: 16 design docs** (confirmed by `ls docs/design/*.md | wc -l`)

### G. Product Bible

`MiMo_Product_Bible.md` — **3,407 lines, 33 parts** (verified)

### H. Previous Counts Verification

| Category | Previous Report Claimed | Actual Verified | Discrepancy |
|----------|----------------------|-----------------|-------------|
| Product evidence files | 54 | **54** | ✓ Match |
| Academic files | 16 | **16** | ✓ Match |
| Pattern files | (not counted before) | **16** | New finding |
| Architecture docs | 27 | **28** | +1 (MiMo_UI_Architecture.md was added) |
| Design docs | 11 | **16** | +5 (5 new docs from recent sessions) |
| Top-level research docs | 5 | **16** | +11 (research-group-A through J + worklog) |

---

## 2. Z.ai Deep Study (PRIMARY Reference)

### What the existing research established (from `research/evidence/glm.md`):

**OBSERVED (from docs.z.ai — primary source):**
1. **Toggleable thinking** — `thinking` parameter per-turn: enabled/disabled. "smarter when things are hard, faster when things are simple"
2. **Interleaved Thinking** — model reasons between tool calls + after tool results
3. **Preserved Thinking** — reasoning content retained across turns for coherence
4. **3-layer Web Search** — API (structured results) + Chat RAG (cited sources) + Search Agent
5. **MCP support** — `https://api.z.ai/api/mcp/web_search/sse`
6. **Context Caching** — "intelligent caching mechanism for long conversations"
7. **GLM-5.2** — "built for long-horizon tasks, truly usable 1M-token context"
8. **14 model variants** — too many; should collapse to 2-3 tiers
9. **⌘K** — docs search affordance
10. **⌘I** — Deep Thinking shortcut

**DOCUMENTED (from Z.ai blog/docs but not consumer UI):**
- Long-horizon task positioning (GLM-5.2)
- Autonomous agent systems (2-year roadmap, not current feature)
- Coding Plan tier ($10/month, Preserved Thinking ON by default)
- Slide/Poster Agent (beta)

**EVIDENCE GAPS (chat.z.ai consumer interface):**
- Consumer chat UI is JS-rendered SPA → not retrievable via curl (4-byte body)
- Visual layout: NOT directly observed
- Composer design: NOT directly observed
- Sidebar structure: NOT directly observed
- Model picker placement: NOT directly observed
- Dark/light mode: NOT directly observed

**INFERENCE (from docs + external research):**
- Clean, focused chat surface (given ⌘K + ⌘I shortcuts)
- Model selector likely in or near composer (ChatGPT moved model selection to composer in 2025)
- Thinking toggle accessible per-turn
- Sidebar with conversation history (standard AI chat pattern)
- Dark mode supported (Greasy Fork "dark UI for Z.ai" script exists)

### New findings from current research (2026):

**From web search results:**
1. Z.ai Chat has a `/chat` mode: "basic interface for fast, interactive conversations with GLM-5 and GLM-5.2 models, thinking mode (optional)"
2. ChatGPT moved model selection INTO the composer (2025/2026 trend) — Z.ai likely follows
3. GLM-5.1 "can work autonomously on a single task for up to 8 hours, completing the full process from planning and execution to testing, fixing, and delivery"
4. GLM-5.2 "gives users greater flexibility... allowing them to select the most suitable reasoning mode"

**PROPOSED FOR MIMO:**
- Effort selector in composer (Fast/Balanced/Deep) — inspired by Z.ai's toggleable thinking
- Model selection in composer (not in a separate settings page)
- Conversation as primary surface (Z.ai's `/chat` mode)
- Per-turn effort control (not permanent modes)

---

## 3. ZCode Deep Study (SECONDARY PRIMARY Reference)

### What the existing research established:

**OBSERVED (from zcode.z.ai docs):**
1. **Task continuity** — "ZCode Agent continuously combines workspace state, tool results, and Git changes throughout task execution"
2. **Plan Mode** — "generates a complete execution plan before implementation begins"
3. **Execution modes** — control whether agent plans first, follows default strategy, or proceeds automatically
4. **Memory mechanism** — "retain context across tasks and sessions"
5. **Tool integration** — Vision, Web Search MCP, Web Reader MCP, Zread MCP
6. **Thought level** — controllable via `thinking` parameter
7. **GLM-5.2** — "1M context, project-scale engineering, stable long-task execution"

**New findings from current research (2026):**

**From ZCode docs (docs.z.ai/zcode):**
1. **Three execution modes**:
   - **Plan Mode** — "working out an approach before anything runs"
   - **Goal Mode** — "automatic continuation" (graduated from experimental to GA in 2026)
   - **Auto/Default Mode** — proceeds more automatically
2. **Goal Mode + Completion Contracts** — agent works until CI is green
3. **Automations** — "let ZCode Agent run on the cadence you set and leave the results in a session for you to review"
4. **Long Horizon Tasks** — "ZCode Agent can combine workspace state, file references, execution mode, and Git branch context to move a complex task forward over hours"
5. **GLM-5.1** — "up to 8 hours autonomously, completing the full process from planning and execution to testing, fixing, and delivery"
6. **Custom subagents** — user-defined agents with specific roles
7. **Remote control** — control ZCode from mobile/web
8. **BYOK** — bring your own API key

**EVIDENCE GAPS (ZCode desktop interface):**
- Desktop app is Electron, not installable in sandbox
- Task lifecycle UI: NOT directly observed
- Plan Mode UI: NOT directly observed
- Approval UI: NOT directly observed
- Execution mode selector: NOT directly observed

### ZCode → MiMo Translation

| ZCode Concept | MiMo Equivalent |
|---------------|-----------------|
| Code Task | Life Task / Project Task |
| Workspace state | Life Context (memory + knowledge + project) |
| File references | Personal files / project files |
| Git changes | Result / Artifact / Decision |
| Git review | Result verification |
| Developer permission | User approval |
| Execution mode | Task mode (Plan / Auto / Goal) |
| Long-horizon task | Long-running life task |
| Subagents | MiMo agents (Planner, Researcher, Writer, Verifier) |
| Automations | Scheduled/recurring tasks |

---

## 4. Cross-Product Reconciliation Matrix

| Product | Existing Evidence | Strongest Pattern | MiMo Adaptation |
|---------|------------------|-------------------|-----------------|
| **Z.ai** | 345 lines, 30 sections | Toggleable thinking + long-horizon + 3-layer search | Effort selector, per-turn control, inline citations |
| **ZCode** | docs + external | Task continuity (goal+context+plan+execute+verify connected) | Life Task as continuity mechanism |
| **Claude** | Full evidence | Artifacts side panel + persistent memory + context compaction | Inline artifact cards + memory citations |
| **ChatGPT** | Full evidence | 2-layer memory + model selection in composer | Memory model + effort in composer |
| **Cursor** | Full evidence | Plan Mode (research→plan→approve→execute) + checkpoints | Task plan + approval gate + checkpoint recovery |
| **Manus** | Full evidence | Live computer pane + Plan Mode (markdown) + approvals | Action Trace + inline task card + approval cards |
| **NotebookLM** | Full evidence | Source-grounded + per-claim source-to-quote citation | Research citations + knowledge provenance |
| **Perplexity** | Full evidence | Pro Search (clarifying questions) + numbered citations | Research workflow with citations |
| **Linear** | Full evidence | Single-key + hold-Space + ⌘K + asymmetric motion | Keyboard language + motion system |
| **Notion** | Full evidence | ANTI-PATTERN: 8 AI surfaces | ONE conversation surface |
| **Raycast** | Full evidence | ⌘⇧Tab Quick AI + prefix grammar | Command palette with prefix grammar |
| **OpenHands** | Full evidence | Event-stream 12 types + time-travel | SSE events + action trace |
| **Aider** | Full evidence | Git diffs as first-class + auto-commit | Artifact versioning (internal) |
| **Arc** | Full evidence | Pinned/Today + auto-archive | Conversation permanence |

---

## 5. What MiMo Will Borrow

### From Z.ai (PRIMARY):
1. **Toggleable thinking per-turn** → Effort selector (Fast/Balanced/Deep)
2. **Single-agent philosophy** → One coherent intelligence
3. **3-layer search** → Inline citations + search API + search agent
4. **Model selection in composer** → Effort/mode selector in composer

### From ZCode (SECONDARY PRIMARY):
1. **Task continuity** → Task keeps goal + context + plan + execution + results connected
2. **Execution modes** → Task mode (Plan / Auto / Goal)
3. **Plan Mode** → Inline task card with expandable plan + approval
4. **Memory across sessions** → Persistent memory + knowledge
5. **Automations** → Scheduled/recurring tasks (future)
6. **Long-horizon tasks** → Tasks that run for hours/days

### From Claude:
1. **Artifacts** → Inline artifact cards (not side panel)
2. **Persistent memory** → Visible, editable, deletable memory
3. **Context compaction** → Long conversation management

### From Manus:
1. **Live runtime** → Action Trace (real actions, not spinner)
2. **Plan Mode** → Inline task plan (markdown, editable, source of truth)
3. **Approvals** → Inline approval cards ("Allow Once" / "Always Allow")
4. **Scheduled tasks** → Background/recurring tasks

### From NotebookLM:
1. **Source-grounding** → GraphRAG + memory as implicit grounding
2. **Per-claim citation** → Inline `[1]`, `[2]` expandable citations

### From Linear:
1. **Keyboard language** → ⌘K + single-key + hold-Space
2. **Asymmetric motion** → Enter 0ms, exit 150ms fade
3. **Calm density** → Dense but disciplined

### From Cursor:
1. **Plan Mode** → Plan → approve → execute
2. **Checkpoints** → Task recovery via CheckpointManager
3. **Per-file diffs** → Artifact version comparison (future)

### From Perplexity:
1. **Clarifying questions** → Research task asks before searching
2. **Numbered citations** → `[1]`, `[2]` inline

### From Raycast:
1. **Quick AI** → ⌘⇧Tab on selection (future)
2. **Prefix grammar** → `>` @ `/` `#` in command palette

---

## 6. What MiMo Will Reject

1. **Notion's 8 AI surfaces** → cognitive overload
2. **v0's 8 containers** → feature creep
3. **Lovable's 7 containers** → feature creep
4. **Z.ai's 14 model variants** → collapse to 3 effort levels
5. **Devin's no live visibility** → black-box execution
6. **Any decorative graph** → not useful for default
7. **Any dashboard/KPI grid** → not a personal OS
8. **Any developer workspace** → not a developer tool
9. **Any terminal-first UI** → not a command line
10. **Any IDE aesthetics** → not a code editor
11. **Any hardcoded identity** → user-neutral
12. **Any fake data** → honest empty states only
13. **Chain-of-thought exposure** → operational state only
14. **Permanent mode bar** → modes are contextual, in composer
15. **Excessive cards/borders/shadows** → tonal separation

---

## 7. What Remains Unknown

1. **chat.z.ai consumer interface** — JS-rendered SPA, not directly inspectable. Visual layout, composer, sidebar, model picker placement are INFERRED, not OBSERVED.
2. **ZCode desktop interface** — Electron app, not installable in sandbox. Task lifecycle UI, Plan Mode UI, approval UI are INFERRED from docs.
3. **Z.ai native dark mode** — existence confirmed via Greasy Fork script, but visual details not observed.
4. **GLM-5.2 consumer chat responsive behavior** — undocumented.

**Impact on design**: The design is based on INFERRED Z.ai patterns + OBSERVED ZCode docs + OBSERVED patterns from 54 other products. The Z.ai consumer UI gap is the biggest evidence risk. However, the INFERRED patterns (effort in composer, single-agent, conversation-first) are strongly supported by Z.ai's own documentation and positioning.

---

## 8. Confidence Assessment

| Finding | Source | Confidence |
|---------|--------|------------|
| Z.ai toggleable thinking | OBSERVED (docs.z.ai) | 95% |
| Z.ai long-horizon positioning | OBSERVED (docs.z.ai) | 95% |
| Z.ai 3-layer search | OBSERVED (docs.z.ai) | 95% |
| Z.ai consumer UI layout | INFERRED (from docs + external) | 60% |
| ZCode task continuity | OBSERVED (zcode.z.ai docs) | 90% |
| ZCode execution modes | OBSERVED (docs.z.ai) | 90% |
| ZCode Plan Mode | OBSERVED (docs.z.ai) | 85% |
| ZCode desktop UI | INFERRED (from docs) | 55% |
| Claude artifacts | DOCUMENTED (support.claude.com) | 90% |
| Manus live computer | OBSERVED (manus.im/docs) | 90% |
| Linear keyboard | OBSERVED (prior) | 85% |
| NotebookLM source-grounding | DOCUMENTED (blog.google) | 90% |
