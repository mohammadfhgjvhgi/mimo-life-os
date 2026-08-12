# MiMo — Competitive Interaction Matrix

> Cross-product pattern comparison. Best existing pattern + why it works + weakness + MiMo adaptation.

---

## Conversation

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Z.ai** | Single-agent + toggleable thinking | Coherent, simple; reasoning depth is a knob, not a mode | Consumer UI not inspectable (SPA) | Conversation is the spine; effort is a per-turn knob |
| **Claude** | Streaming + extended thinking + artifacts side panel | Rich output without blocking conversation | Artifacts in separate panel = context switch | Artifacts inline in conversation |
| **ChatGPT** | 2-layer memory + project scope | Persistent personalization | Too many surfaces (Canvas, GPTs) | ONE conversation surface + summoned sidebar |
| **Manus** | "What can I do for you?" + quick-action chips | Reduces cold-start friction | Task-focused, not life-focused | Calm greeting + suggestion chips (life-oriented) |

**MiMo Decision**: Conversation is the ONLY permanent surface. Everything else is inline or summoned. Messages are intelligent documents, not chat bubbles. Action Trace replaces spinners.

---

## Composer

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Z.ai** | Thinking toggle per-turn | Cost/latency control without mode switching | Consumer UI not inspectable | Effort selector (Fast/Balanced/Deep) in composer |
| **Claude** | Artifact side panel trigger | Output visible while typing | Separate panel | Inline artifact creation |
| **Cursor** | Cmd-K inline edit + Cmd-L chat + Cmd-I composer | Three entry points for three depths | Too many shortcuts | One composer, progressive disclosure |
| **Manus** | "What can I do for you?" + Plan Mode toggle | Goal-first, not feature-first | Limited to task creation | Natural language → intent detection → task creation |
| **Notion** | `/` slash commands | Inline action surface | Block-first model | Slash commands in composer (future) |

**MiMo Decision**: Composer is the primary control surface. Default: textarea + mode selector + effort selector + send. Progressive disclosure: tools toggle reveals deep think, web search, image gen, voice. No permanent mode bar.

---

## Model Selection / Effort Control

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Z.ai** | `thinking` parameter (enabled/disabled per turn) | Fine-grained control; coherent across turns | API-level, not UI-level (evidence gap) | Effort selector: Fast/Balanced/Deep (maps to ModelRouter profiles) |
| **OpenAI** | Reasoning effort (low/medium/high) | Simple 3-level | Not per-turn | Per-turn effort in composer dropdown |
| **Claude** | Extended thinking (on/off) | Binary simplicity | No middle ground | 3 levels (Fast/Balanced/Deep) |
| **Qwen Code** | `/effort` command with tiers | Keyboard-first | CLI-only | Effort as composer dropdown + ⌘K command |

**MiMo Decision**: Effort selector in composer (Fast/Balanced/Deep). Maps to ModelRouter (FAST/BALANCED/DEEP profiles). Default: Balanced. User can change per-turn. Not a separate "mode" — it's a knob.

---

## Agent Execution

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Manus** | Live computer pane | User sees real runtime, never spinner | Terminal-like (too technical for life OS) | Action Trace: verb + object + count ("يحلل 14 ملفاً") |
| **Cursor** | Per-file diffs | See exactly what changed | Code-only | Inline artifact diffs (when relevant) |
| **ZCode** | Workspace state + tool results connected to task | Context never lost | Developer-focused | Task as continuity mechanism (goal + context + plan + results) |
| **OpenHands** | Event-stream (12 types) | Rich observability | Too many event types for default | Progressive disclosure: Level 1 (verb), Level 2 (trace), Level 3 (details) |

**MiMo Decision**: Action Trace (operational state, not chain-of-thought). Level 1: single line verb + object. Level 2: full action trace with checkmarks. Level 3: details (sources, tools, files). Never expose hidden reasoning.

---

## Task Lifecycle

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **ZCode** | Goal → Plan → Execute → Verify → Review → Continue | One continuous task, not disconnected tool calls | Developer-focused | MiMo Task = life task (research, plan trip, learn, organize) |
| **Manus** | Plan Mode (markdown, editable, source of truth) | User can review + edit before execution | Terminal-heavy | Inline task card with expandable plan + approval gate |
| **Cursor** | Plan → approve → execute | User controls destructive actions | Code-only | Approval gates for file/destructive ops + memory changes |
| **Linear** | Single-issue-list + status flow | Clear lifecycle, calm density | Project management, not personal | Task as inline card with lifecycle states |

**MiMo Decision**: Task is a living execution object. Appears inline in conversation. Has lifecycle (pending→planning→executing→validating→done/error/cancelled). Supports pause/resume/cancel. Background tasks minimize to calm indicator. Task detail panel (summoned) shows goal, plan, steps, tools, artifacts, timeline.

---

## Research

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **NotebookLM** | Source-grounded + per-claim source-to-quote citation | User can verify every claim | Requires explicit source upload | GraphRAG + memory + knowledge = implicit grounding |
| **Perplexity** | Pro Search with clarifying questions + Collections | Improves query quality | Web-only, not personal | Research as a task type (question → search → evaluate → synthesize → cite) |
| **Z.ai** | Web Search in Chat (RAG with cited sources) | Seamless search+generation | Consumer UI not inspectable | Inline citations `[1]`, `[2]` expandable to source |

**MiMo Decision**: Research is a first-class workflow. Inline in conversation. Shows: question → sources reviewed → evidence → synthesis → cited answer → saved as research artifact. Citations are expandable `[1]` links.

---

## Memory

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Claude** | Persistent memory (visible, editable, exportable, pause/reset) | User control + transparency | Separate settings page | Inline memory citations `[mem:abc]` + sidebar browse |
| **ChatGPT** | 2-layer (saved + reference) + project-scoped | Structured persistence | Opaque (pre-Aug 2025) | Every memory: source + timestamp + confidence + delete |
| **Claude Code** | Auto-memory (automatic extraction) | Zero-friction capture | Developer-only | Auto-extraction from conversations + manual save |

**MiMo Decision**: Memory is personal and visible. Inline citations when MiMo uses a memory. Sidebar browse with filter/search/edit/delete. "What does MiMo know about you?" section in Context view. Never fake memories. Every memory shows provenance.

---

## Knowledge

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Obsidian** | Graph view + backlinks | Visual relationship exploration | Decorative by default | Entity list with relationships (not graph) |
| **Heptabase** | Card-based + whiteboard | Spatial thinking | Complex setup | Inline entity links `[ent:xyz]` expandable |
| **Tana** | Structured entity system | Data-structured knowledge | Too technical | Simple: entity → type → confidence → relationships → evidence |

**MiMo Decision**: Knowledge is understanding, not a database. Inline entity links in conversation. Sidebar browse by type. Relationships as list (not decorative graph). Provenance: every entity shows evidence count + sources. Graph view available on explicit request (not default).

---

## Artifacts

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Claude** | Side panel + version selector + publish/share | Rich output management | Separate panel = context switch | Inline artifact cards in conversation |
| **Cursor** | Per-file diffs + Composer (multi-file) | See exactly what changed | Code-only | Artifacts for documents, reports, plans, code, images |
| **Aider** | Git diffs as first-class + auto-commit | Version control built-in | Developer-only | Artifact versioning (internal) |

**MiMo Decision**: Artifacts are durable outputs. Appear inline as cards (preview collapsed, expand to full). Actions: copy, edit, export, save to project, version history. Summoned artifact panel for browsing. Connected to originating conversation + task + project.

---

## Search

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Perplexity** | Answer + sources + follow-up questions | Search is a conversation, not a results page | Web-only | Universal search across conversations, memories, knowledge, tasks, artifacts, files |
| **Notion** | Search across all pages + properties | Comprehensive | Slow on large workspaces | Hybrid search (FTS5 + vector + graph) with ranking |
| **Linear** | ⌘K command menu = search + navigation | One entry point for everything | No semantic search | ⌘K = command palette; ⌘/ = universal search |

**MiMo Decision**: Two search surfaces: ⌘K (command palette — actions + navigation) and ⌘/ (universal search — content search across everything). Results categorized with provenance. Keyboard navigation.

---

## Command Palette

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Linear** | ⌘K + single-key + hold-Space | Keyboard-first, fast | Project management only | ⌘K as universal entry (actions, navigation, search) |
| **Raycast** | ⌘⇧Tab Quick AI + prefix grammar + extensions | AI as verb, not destination | macOS only | Prefix grammar (>, @, /, #) for scoped actions |
| **VS Code** | ⌘P + ⌘⇧P + prefix grammar | Two modes (files vs commands) | Code-only | One palette with prefix grammar |

**MiMo Decision**: ⌘K is the universal entry point. Supports: actions (new conversation, create task, start research), navigation (open memory, knowledge, timeline, settings), search (find project, file, artifact). Prefix grammar: `>` actions, `@` entities, `/` slash commands, `#` tags.

---

## Approvals

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Manus** | "Allow Once" / "Always Allow" for terminal commands | Granular control | Terminal-focused | Inline approval cards: "MiMo يريد تعديل 6 ملفات" + Review/Approve/Reject |
| **Cursor** | File write approval + permission modes | User controls destructive actions | Code-only | 4 approval levels: Informational / Reversible / Important / Irreversible |
| **Claude Code** | 6 permission modes | Fine-grained trust | Developer-only | Per-task-type trust (not per-instance) |

**MiMo Decision**: 4 approval levels. Informational (no approval). Reversible (automatic). Important (ask before). Irreversible (always require). Inline approval cards in conversation. Never hide side effects.

---

## Error Recovery

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Linear** | Error states with context + action | User knows what to do | Project management | Inline error card: What happened / Why / What MiMo can do / What you can do + Retry/Details/Fix/Ignore |
| **VS Code** | Error diagnostics with quick fix | Inline, actionable | Code-only | Error cards inline in conversation, not toasts |
| **Cursor** | Error → retry with different approach | Recovery, not just reporting | Code-only | Retry / Try different approach / View details |

**MiMo Decision**: Errors are inline cards with context + actions. Never raw stack traces. 4 actions: Retry, View details, Fix automatically, Ignore. Calm, not alarming.

---

## Background Tasks

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Claude Code** | Orchestrator + task queue + overnight execution | Long tasks don't block | Developer-only | Background task indicator (minimized) + task detail panel |
| **Manus** | Scheduled tasks (daily/weekly/monthly) + Cloud Computer (24/7) | Recurring + always-on | Cloud-dependent | Background tasks minimize to calm indicator; user continues chatting |
| **Cursor** | Cloud Agents | Async execution in cloud VMs | Cloud-only | Local-first background execution via AgentLifecycle + CheckpointManager |

**MiMo Decision**: Tasks minimize to a calm indicator at bottom of conversation. User continues chatting. Click to expand task list. Task detail panel shows progress, steps, artifacts. Recovery via checkpoints.

---

## Responsive Behavior

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Z.ai** | Responsive web app | Works on all devices | Consumer UI not inspectable | Desktop-first; sidebar becomes overlay < 960px |
| **Claude** | Web + mobile apps | Cross-platform | Mobile is separate app | Desktop-first; rail becomes bottom bar < 640px |
| **Linear** | Desktop + web + mobile | Native feel everywhere | Complex responsive | Desktop-first with deliberate breakpoints |

**MiMo Decision**: Desktop-first (1280×720 minimum). > 960px: full shell. 640–960px: sidebar overlay, rail stays. < 640px: rail becomes bottom bar, conversation full-width.

---

## Keyboard UX

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Linear** | Single-key + hold-Space + ⌘K | Keyboard home row; ≤2 modifiers | Project management | ⌘K + single-key daily-5 (C/M/A/R/S) |
| **Raycast** | ⌘⇧Tab Quick AI + prefix grammar | AI as verb | macOS only | Prefix grammar in ⌘K (future: Quick AI) |
| **VS Code** | ⌘P + ⌘⇧P + G chord | Two modes + navigation chords | Code-only | One ⌘K with prefix grammar |

**MiMo Decision**: ⌘K universal. Single-key daily-5: C (new conversation), M (memory), A (agents/tasks), R (research mode), S (settings). Cap: 2 modifiers max. Hold-Space peek (future).

---

## Visual Hierarchy

| Product | Best Pattern | Why It Works | Weakness | MiMo Adaptation |
|---------|-------------|-------------|----------|-----------------|
| **Z.ai** | Dark, clean, focused | Calm, professional | Consumer UI not inspectable | Warm-neutral dark, ONE accent, tonal separation |
| **Linear** | Calm density + asymmetric motion | Premium feel, fast | Project management | Calm density, 4px grid, motion tiers |
| **Claude** | Warm, document-like | Readable, humane | Artifacts in separate panel | Intelligent documents, not chat bubbles |
| **Manus** | "Less structure, more intelligence" | Minimal chrome | Task-focused | "Quiet Surface" — conversation fills viewport |

**MiMo Decision**: "Quiet Surface" concept. Conversation fills viewport. 48px rail (minimal). No top bar. No sidebar by default. Warm-neutral palette (stone-based). ONE accent (violet). Tonal separation, not shadows. Motion: 0/120/200/300/400ms tiers, asymmetric.
