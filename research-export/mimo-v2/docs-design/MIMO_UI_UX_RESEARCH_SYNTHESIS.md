# MiMo — UI/UX Research Synthesis

> Deep research synthesis for the second-pass agentic product UI. Derived from existing `research/` (54 products) + 2025 web research on agentic interfaces.

---

## 1. Key Findings from Existing Research

### From `research/` (54 products, 16 academic, 16 patterns)

**The strongest agentic interface patterns:**
1. **Manus** — live computer pane (real runtime motion, never spinner)
2. **OpenHands** — Agent Canvas + event-stream 12 types + time-travel
3. **Aider** — git diffs as first-class output (auto-commit + revert)
4. **Claude Code** — CLAUDE.md 5-tier + 6 permission modes + auto-memory
5. **Cursor** — Plan Mode vs Agent Mode separation + per-file diffs
6. **Linear** — single-issue-list + asymmetric motion (0ms enter, 150ms exit)
7. **Raycast** — ⌘⇧Tab Quick AI on selection (AI as verb, not destination)
8. **Notion** — slash block menu (inline command surface)
9. **Arc** — Pinned/Today + auto-archive (ephemeral tabs)

**The anti-patterns to avoid:**
1. **v0** — 8 containers, static "waiting" state (cognitive overload)
2. **Lovable** — 7 containers (feature creep)
3. **Notion** — 8 AI surfaces (scattered)
4. **AutoGPT** — no intervention, infinite loops (cautionary tale)

### From 2025 Web Research

**ZCode / GLM-5.2**: "Agentic Development Environment (ADE)" — plan → code → review → deploy in one flow. Long-horizon task support. File context + agent + planning + execution + verification + review.

**Claude Code**: Orchestrator session spawns agents from a task queue. Agents run autonomously in sandbox with permissions. Long-running overnight tasks.

**Cursor**: Plan Mode (read-only, proposes changes) vs Agent Mode (executes). Per-file diffs visible. Approvals before file writes.

**Linear**: Activity feed as chronological stream. Focus on what happened, not what's pending. Calm density.

---

## 2. Pattern Extraction

### Pattern: Task Lifecycle Visualization
- **Product**: Cursor, Claude Code, Manus
- **Why it works**: User understands WHERE in the process the agent is
- **Problem solved**: Black-box agent execution anxiety
- **When NOT to use**: For trivial single-turn responses
- **MiMo adoption**: YES — but as Action Trace, not chain-of-thought
- **Adaptation**: "Analyzing structure → 14 files inspected" not "thinking about..."

### Pattern: Plan → Execute → Verify
- **Product**: Cursor Plan Mode, ZCode, Claude Code
- **Why it works**: Separates intent from action, allows approval before mutation
- **Problem solved**: Agent makes unwanted changes
- **MiMo adoption**: YES — for file-modifying tasks only (not chat)
- **Adaptation**: Inline in conversation, not a separate mode

### Pattern: Live Runtime Motion (not spinner)
- **Product**: Manus (computer pane), Bolt (HMR), Gemini (live thoughts)
- **Why it works**: User trusts what they can see
- **Problem solved**: Spinners feel dead
- **MiMo adoption**: YES — verb-based status with real actions
- **Adaptation**: "يسترجع السياق…" + sources being checked, not fake "thinking..."

### Pattern: Background Tasks
- **Product**: Claude Code (overnight), Devin (async PRs)
- **Why it works**: User doesn't wait; continues other work
- **Problem solved**: Long tasks block conversation
- **MiMo adoption**: YES — task minimizes, user continues chatting
- **Adaptation**: Calm task indicator, not a DevOps dashboard

### Pattern: Approval Gates
- **Product**: Cursor (file write approval), Claude Code (permission modes)
- **Why it works**: User controls destructive actions
- **Problem solved**: Agent does something irreversible
- **MiMo adoption**: YES — for file writes, deletions, network access
- **Adaptation**: Inline approval card in conversation, not modal

### Pattern: Command Palette as Universal Entry
- **Product**: Linear, Raycast, VS Code
- **Why it works**: Keyboard-first, every action in ≤2 modifiers
- **Problem solved**: Navigation complexity
- **MiMo adoption**: YES — ⌘K is the universal entry
- **Adaptation**: Prefix grammar (>, @, /, #) for scoped actions

---

## 3. What MiMo Should NOT Copy

1. **ChatGPT's sidebar conversation list** — MiMo conversation is permanent, not a list
2. **Claude's Artifacts panel** — MiMo artifacts should be inline or in a task, not a separate dock
3. **Cursor's editor-first layout** — MiMo is conversation-first
4. **Notion's block editor** — MiMo is not a notes app
5. **GLM's chat UI** — MiMo is an OS, not a chatbot
6. **DevOps dashboards** — MiMo is personal, not enterprise

---

## 4. MiMo's Unique Position

MiMo is the ONLY product that combines:
- Conversation as permanent spine (not editor-first like Cursor)
- Memory that's visible + correctable (not hidden like ChatGPT)
- Knowledge graph with provenance (not decorative like Notion)
- Agent execution with action trace (not black-box like GLM)
- Local-first + no counters (not SaaS like Linear)
- Development workspace integrated (not separate like VS Code)

**The design must make this uniqueness visible.**
