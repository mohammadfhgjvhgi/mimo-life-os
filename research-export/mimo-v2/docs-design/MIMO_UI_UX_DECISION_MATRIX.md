# MiMo — UI/UX Decision Matrix

> Every major design decision: current state, problem, evidence, options, chosen solution, rationale, rejected alternatives.

---

## Decision 1: Shell Architecture

| Aspect | Detail |
|---|---|
| **Current** | 56px rail + 44px topbar + conversation + 320px sidebar (always visible) |
| **Problem** | Too much chrome. Conversation doesn't breathe. Sidebar is noise by default. |
| **Evidence** | Product Bible 1.1 "Calm"; Linear single-issue-list; Manus computer pane |
| **Options** | A) Keep all surfaces visible. B) "Quiet Surface" — hide sidebar by default. C) Full-screen conversation + command palette only. |
| **Chosen** | B — "Quiet Surface": 48px rail + conversation fills viewport + sidebar summoned. No top bar by default. |
| **Why** | Conversation is the spine. Complexity appears when summoned. Matches "Calm" principle. |
| **Rejected** | A (too much chrome), C (too stark — users need memory/knowledge access) |

---

## Decision 2: Task System

| Aspect | Detail |
|---|---|
| **Current** | No UI. Backend has full Task model + AgentLifecycle + CheckpointManager. |
| **Problem** | Users can't see what MiMo is doing beyond a single verb. Can't track multi-step tasks. Can't resume interrupted work. |
| **Evidence** | Cursor Plan/Agent modes; Claude Code task queue; Manus 3-tier execution; ZCode plan→execute→verify |
| **Options** | A) Separate Tasks page. B) Task list in sidebar. C) Inline task cards in conversation + task detail in summoned panel. |
| **Chosen** | C — Inline task cards in conversation (where tasks are born) + summoned Task panel (for active/history). |
| **Why** | Tasks originate from conversation. User sees them appear inline. Can expand for details. Background tasks minimize to a calm indicator. |
| **Rejected** | A (breaks conversation spine), B (sidebar is for browsing, not active work) |

---

## Decision 3: Agent State Visualization

| Aspect | Detail |
|---|---|
| **Current** | AgentStatus: single verb + pulsing dot + expandable pipeline stages |
| **Problem** | Too abstract. "يفكّر…" doesn't tell the user WHAT is being thought about. |
| **Evidence** | Manus live computer pane; Gemini live thoughts; Cursor per-file diffs |
| **Options** | A) Expose chain-of-thought (rejected — Product Bible forbids). B) Action Trace: real actions with counts ("14 files inspected"). C) Detailed pipeline with timing. |
| **Chosen** | B — Action Trace: real verb + object + count. "يحلل بنية المشروع — 14 ملفاً تفحصها" |
| **Why** | Shows real work without exposing internal reasoning. User trusts what they can see. |
| **Rejected** | A (violates privacy + product bible), C (too technical for default) |

---

## Decision 4: Memory Display

| Aspect | Detail |
|---|---|
| **Current** | Sidebar list with type badges. No provenance in conversation. No edit/delete. |
| **Problem** | User can't see WHY MiMo knows something. Can't correct it. |
| **Evidence** | NotebookLM per-claim source-to-quote (GOLD STANDARD); Claude persistent memory; Apple Memory |
| **Options** | A) Memory as sidebar list only. B) Inline memory citations in conversation + sidebar for browsing. C) Separate memory page. |
| **Chosen** | B — Inline `[mem:abc]` citations in conversation (expandable cards) + sidebar for browsing + edit/delete. |
| **Why** | Memory is most valuable when it appears in context. Sidebar is for management. |
| **Rejected** | A (too passive), C (breaks conversation spine) |

---

## Decision 5: Knowledge Display

| Aspect | Detail |
|---|---|
| **Current** | Sidebar shows memory filtered by type (not real knowledge entities). |
| **Problem** | Knowledge is treated as "just memory". No entity exploration, no relationships. |
| **Evidence** | Obsidian graph; Heptabase cards; Tana entity system |
| **Options** | A) Decorative graph visualization. B) Entity list with relationships. C) Inline entity links + sidebar exploration. |
| **Chosen** | C — Inline `[ent:xyz]` links in conversation + sidebar entity browser with relationship list (not graph). |
| **Why** | Graphs are decorative. Users need to explore relationships, not stare at a node diagram. |
| **Rejected** | A (decorative, Product Bible forbids), B (too separate from conversation) |

---

## Decision 6: Model Router Visibility

| Aspect | Detail |
|---|---|
| **Current** | No UI. ModelRouter runs silently. |
| **Problem** | User can't control effort/reasoning. Can't see which model is used. |
| **Evidence** | ChatGPT model selector; Claude Sonnet/Opus toggle; Cursor model picker |
| **Options** | A) Full model selector in composer. B) Effort levels (Fast/Balanced/Deep/Max) + "Auto" default. C) Hidden, fully automatic. |
| **Chosen** | B — Effort control in composer dropdown. Default "Auto". Expandable to show selected model + reason. |
| **Why** | Effort is the user-facing concept. Model details are for advanced users. |
| **Rejected** | A (too technical), C (no user control) |

---

## Decision 7: Artifact System

| Aspect | Detail |
|---|---|
| **Current** | ArtifactDock shows generated images only. No CRUD API. |
| **Problem** | Artifacts are second-class. Can't create/edit/version them. |
| **Evidence** | Claude Artifacts (code/markdown/diagrams); ChatGPT Canvas; Cursor diffs |
| **Options** | A) Separate artifact page. B) Inline artifact cards in conversation + Artifact panel. C) Keep ArtifactDock for images. |
| **Chosen** | B — Inline artifact cards (code/markdown/image/diagram) in conversation + summoned Artifact panel for browsing. |
| **Why** | Artifacts are born from conversation. They appear inline. Panel is for management. |
| **Rejected** | A (breaks spine), C (too limited) |

---

## Decision 8: Background Tasks

| Aspect | Detail |
|---|---|
| **Current** | No background task concept. Chat blocks until response complete. |
| **Problem** | Long tasks block conversation. |
| **Evidence** | Claude Code overnight; Devin async PRs; Cursor background agents |
| **Options** | A) Full task queue dashboard. B) Calm task indicator (minimized to bottom bar) + task detail on click. C) No background tasks. |
| **Chosen** | B — Calm indicator at bottom of conversation. Click to expand task detail. |
| **Why** | Tasks minimize, conversation continues. User monitors without context switch. |
| **Rejected** | A (DevOps dashboard), C (no long-running support) |

---

## Decision 9: Approval System

| Aspect | Detail |
|---|---|
| **Current** | No approval UI. ToolPolicyEngine has `requiresConfirmation` but no UI to surface it. |
| **Problem** | Sensitive actions happen silently or not at all. |
| **Evidence** | Cursor file write approval; Claude Code permission modes |
| **Options** | A) Modal dialog for every approval. B) Inline approval cards in conversation. C) No approvals (auto-execute everything). |
| **Chosen** | B — Inline approval cards: "MiMo wants to modify 6 files" + [Review] [Approve] [Reject]. |
| **Why** | Inline keeps conversation flow. Modal interrupts. |
| **Rejected** | A (interrupts flow), C (unsafe) |

---

## Decision 10: Error UX

| Aspect | Detail |
|---|---|
| **Current** | Errors shown as text in messages. No retry/recover actions. |
| **Problem** | User doesn't know what to do when something fails. |
| **Evidence** | Linear error states; Raycast retry; VS Code error diagnostics |
| **Options** | A) Stack trace. B) "What happened / Why / What MiMo can do / What you can do" + actions. C) Toast notification. |
| **Chosen** | B — Inline error card with context + Retry/Details/Fix/Ignore actions. |
| **Why** | Errors need context + action. User should never feel stuck. |
| **Rejected** | A (too technical), C (too transient) |
