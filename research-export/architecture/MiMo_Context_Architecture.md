# MiMo — Context Architecture
### Phase: Foundation From The Ground Up — ARCH-B (Doc 1 of 6)

**Status:** ARCHITECTURE. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Scope:** How MiMo assembles the ContextObject that every other module consumes. Deterministic policy FIRST, model judgment SECOND.
**Source of truth:** Product Bible Part 4 (Context Architecture), Part 7 (AI Architecture), Part 22 (Security). `MiMo_Current_System_Audit.md` §3, §4. `src/core/context/ContextBuilder.ts`.

---

## 0. Label Legend

- `[CURRENT]` — what exists today in the repository.
- `[TARGET]` — what this architecture specifies for the foundation build.
- `[MIGRATION]` — how to get from CURRENT to TARGET.
- `[FACT]` — verifiable from the codebase or external reality.
- `[INFERENCE]` — architect's reasoned conclusion, not yet validated.
- `[UNKNOWN]` — open question; do NOT pretend to have an answer.

---

## 1. The Core Principle

> **Context is policy, not magic.** "The AI decides what matters" is forbidden as the *only* rule. There is always a deterministic policy layer above any model-driven ranking. [TARGET — Product Bible Part 4.6 Context Transparency Invariant]

The ContextBuilder's job is **NOT** to build a prompt. The PromptEngine builds the prompt. The ContextBuilder produces a typed, immutable `ContextObject` containing every piece of information that *might* be relevant, each tagged with source, priority, freshness, permission class, and provenance. [FACT — `src/core/context/ContextBuilder.ts` already enforces this separation]

---

## 2. The Context Hierarchy

Layers, ordered from outermost (most stable) to innermost (most volatile). Each layer is a deterministic source with explicit entry rules.

```
User
 └── Workspace            (set of projects + global preferences)
      └── Project          (MIMO.md, settings, accent, file scope)
           └── Conversation (history + summary + attachments)
                └── Current Task  (the user's latest input + intent + mode)
                     ├── Relevant Memory      (semantic recall, top N)
                     ├── Relevant Knowledge   (entities + graph hops)
                     ├── Relevant Artifacts   (versioned outputs referenced)
                     ├── Relevant Files       (@file / folder-as-context)
                     ├── Tool State           (registered tools + their schemas)
                     └── Agent State          (current agent's accumulated state)
                          └── Prompt Assembly (PromptEngine, not ContextBuilder)
```

### 2.1 Layer Rules Table [TARGET]

| # | Layer | Source | Enters automatically? | Enters on demand? | Never enters? | Permission class |
|---|---|---|---|---|---|---|
| 1 | User | Personal Model | ✓ (always) | — | — | identity (read-only) |
| 2 | Workspace | DB table `Workspace` | ✓ (on boot) | — | Other workspaces | identity |
| 3 | Project | DB table `Project` + `MIMO.md` | ✓ (on project switch) | — | Other projects' context | scoped |
| 4 | Conversation | DB table `Conversation` + `Message` | ✓ (current conv only) | `/clear`, `/compact` | Cross-project convs | scoped |
| 5 | Current Task | User input + Reasoner output | ✓ (per turn) | — | Old tasks' state | scoped |
| 6 | Relevant Memory | Memory engine recall | ✓ (top N) | `/forget <id>` | Unrelated memories | scoped |
| 7 | Relevant Knowledge | Knowledge graph retrieval | ✓ (top N) | — | Unrelated entities | scoped |
| 8 | Relevant Artifacts | DB table `Artifact` (by ID, `@artifact`) | Only if `@`-mentioned | `@artifact` | Out-of-scope artifacts | scoped |
| 9 | Relevant Files | Filesystem (project root + `@file`) | Only if folder-as-context set | `@file`, `@folder` | Out-of-scope paths | scoped |
| 10 | Tool State | ToolRegistry | ✓ (registered tools) | — | Disallowed tools (per-scope) | executable |
| 11 | Agent State | AgentRegistry + per-agent state | ✓ (current agent only) | — | Other agents' state | executable |
| 12 | Runtime | `Date.now()`, `Intl`, device, network | ✓ (always) | — | — | identity |

[FACT — Product Bible Part 4.1 specifies these 10 layers; the architecture here splits Artifact from File (Bible Part 11 treats them separately) and adds Agent State (Bible Part 8) — total 12.]

---

## 3. Context Sources (Where each piece comes from)

Each source is a typed, named producer. No source may write directly to the `ContextObject` — sources feed the Builder, the Builder freezes the object.

| Source | Producer | Currently real? |
|---|---|---|
| `user_profile` | Personal Model (derived from Knowledge graph) | [CURRENT] hardcoded `DEFAULT_USER` in ContextBuilder.ts |
| `project_settings` | `Project` table + `MIMO.md` file | [CURRENT] neither exists |
| `conversation_history` | `Message` table scoped by `conversationId` | [CURRENT] passed in from caller (not yet from DB) |
| `conversation_summary` | CompressionEngine | [CURRENT] optional param, not generated |
| `task_input` | `userInput` (the user's current message) | [FACT] passed in |
| `task_intent` | Reasoner | [CURRENT] rule-based keyword detection |
| `task_mode` | UI → `PromptMode` | [FACT] passed in |
| `memory_relevant` | MemoryEngine.recall | [CURRENT] substring match, top 5 |
| `memory_recent` | MemoryEngine.recall (last 3) | [CURRENT] yes |
| `knowledge_entities` | KnowledgeGraph.retrieve | [CURRENT] NOT IMPLEMENTED |
| `knowledge_user_model` | UserModel cache | [CURRENT] NOT IMPLEMENTED |
| `artifacts_referenced` | `Artifact` table by `@id` mention | [CURRENT] NOT IMPLEMENTED |
| `files_in_scope` | Folder-as-context engine + `@file` mentions | [CURRENT] NOT IMPLEMENTED |
| `tools_registered` | ToolRegistry.snapshot | [CURRENT] yes (but no permission filtering) |
| `agent_state` | AgentRegistry + per-agent accumulated state | [CURRENT] NOT IMPLEMENTED (agents are stateless functions) |
| `runtime_env` | `Date`, `Intl`, `navigator.onLine` (client) or process env (server) | [CURRENT] partial (timezone, locale, now) |
| `extra_sources` | Caller-supplied (e.g. prior step outputs) | [FACT] `extraSources` param exists |

---

## 4. Priority + Ranking

### 4.1 Priority is NOT "model-judged relevance"

Priority is a **deterministic, weighted score** computed from observable fields. The model is allowed to *re-rank within a single bucket* only when a tie-break is needed.

### 4.2 The Priority Formula [TARGET]

```
priority = (
    layerWeight[layer]            // 0..100, fixed table
  * typeWeight[type]              // 0..1, fixed table
  * freshness(entry)             // exp(-age / halflife[type])
  * permissionGate(entry)         // 0 if disallowed, 1 if allowed, 0.5 if revocable
)
+ explicitBoost(entry)           // @mentions, user pins
+ provenanceBoost(entry)         // user-confirmed > agent-inferred > auto-extracted
- conflictPenalty(entry)         // if contradicted by higher-trust source
```

### 4.3 Layer Weight Table [TARGET]

| Layer | Weight | Reason |
|---|---|---|
| Current Task | 100 | What the user just said always wins ties |
| Conversation (recent) | 80 | Immediate prior turn |
| Conversation (older, post-compact) | 40 | Summarized |
| User Profile (identity) | 70 | Always relevant |
| Project (MIMO.md) | 60 | Project-scoped rules |
| Memory (relevant) | 50 | Recalled, type-decayed |
| Knowledge (entities) | 45 | Derived, evidence-backed |
| Artifacts (referenced) | 55 | Active work product |
| Files (in scope) | 50 | Folder-as-context |
| Tool state | 30 | Capability list |
| Agent state | 35 | Mid-task state |
| Runtime | 10 | Background |

### 4.4 Provenance Boost [TARGET]

| Provenance | Boost |
|---|---|
| User-confirmed explicit | +20 |
| User-authored memory | +15 |
| Tool-verified fact | +10 |
| Agent-inferred | 0 |
| Auto-extracted (unconfirmed) | −10 |

### 4.5 [CURRENT] Deficiency

[CURRENT] ContextBuilder.ts computes priority as `(mem.relevance ?? 0.5) * 100` and `extraSources[].priority ?? 50`, then sorts descending. There is NO layer weight, NO freshness decay, NO provenance, NO conflict detection, NO permission gate. [FACT]

---

## 5. Token Budgeting

### 5.1 The Budget Contract [TARGET]

Every model has a `contextWindow` (declared in ModelRegistry). The ContextBuilder receives a `tokenBudget` parameter from the caller (the WorkflowEngine knows the model). The Builder allocates the budget across layers BEFORE returning the ContextObject.

### 5.2 Default Budget Allocation [TARGET]

| Layer | Default % of budget | Hard cap |
|---|---|---|
| System + Developer prompts | 8% | 4 KiB |
| User Profile | 2% | 1 KiB |
| Project (MIMO.md) | 8% | 8 KiB |
| Conversation history | 30% | model window / 3 |
| Memory (relevant) | 12% | 16 KiB |
| Knowledge (entities + graph) | 12% | 16 KiB |
| Artifacts (referenced) | 8% | 32 KiB |
| Files (in scope) | 12% | 32 KiB |
| Tool schemas | 4% | 4 KiB |
| Reserved (model output) | 4% | — |

[INFERENCE — percentages derived from empirical RAG literature; tunable per project; the cap is the hard ceiling beyond which the layer is truncated.]

### 5.3 Truncation Policy [TARGET]

When a layer exceeds its hard cap, truncation order (deterministic):
1. Drop oldest entries first within the layer (FIFO).
2. Drop lowest-priority entries (per §4.2) within the same age bucket.
3. Drop entries with `provenance = auto-extracted-unconfirmed` before user-confirmed.
4. Drop entries with active conflicts (see §9).
5. If still over cap, mark layer `truncated: true` in the ContextObject — surfaced in DeveloperPanel.

### 5.4 [CURRENT] Deficiency

[CURRENT] There is NO token budgeting. The ContextBuilder returns whatever it has. The PromptEngine (which currently does not exist as a real implementation) is responsible, but with no budget contract, overflow is undefined behavior.

---

## 6. Compression

### 6.1 When compression triggers [TARGET]

- Conversation history layer exceeds 60% of its allocated cap.
- OR total context exceeds 90% of model window.
- OR user invokes `/compact`.

### 6.2 Compression Algorithm [TARGET]

The CompressionEngine produces two artifacts:
1. A lossy **summary** (prose, ≤500 tokens).
2. A lossless **fact list** (typed facts extracted by the MemoryEngine — these become Memory entries with `provenance = auto-extracted-confirmed-implicit` and are visible in Memory tab).

**Original messages are never deleted.** They are moved to `Message.archived = true` and excluded from context assembly. The summary replaces them in context.

[PRODUCT DECISION — Bible Part 4.5: "lossless for facts, lossy for verbosity."]

### 6.3 Compression Transparency [TARGET — PRODUCT INVARIANT]

Every compression event emits `context.compressed` event with `{ conversationId, messagesRemoved, summaryTokens, factsExtracted, ratio }`. Visible in DeveloperPanel. User can undo the last compression within 30 days.

### 6.4 [CURRENT] Deficiency

[CURRENT] No CompressionEngine. `summary` is an optional caller-supplied string. Bible Part 4.5 not implemented.

---

## 7. Summarization

Summarization ≠ compression. Summarization is the *act* of producing the summary; compression is the *policy* of when to apply it.

### 7.1 [TARGET] Summarization Service

- Implemented as a Model call routed through the AI layer (`MiMo_AI_Architecture.md`) with `model_class = 'cheap'`.
- Input: N most recent messages (configurable, default 20).
- Output: `{ summary: string, facts: Fact[] }` where each fact has type, content, confidence, evidence pointers.
- Idempotent: re-summarizing the same messages with the same model returns an identical hash (cached).

### 7.2 [TARGET] Cache

- Summaries cached by `hash(messages) + modelId`.
- Cache stored in DB table `ConversationSummary`.
- Invalidated when ANY of the cached messages is edited (see §11).

---

## 8. Freshness

### 8.1 [TARGET] Freshness Function

```
freshness(entry) = exp(-age_ms / (halflife[type] * DAY_MS))
```

Halflife table — Bible Part 5.6 (per memory type):

| Type | Halflife |
|---|---|
| identity | ∞ (1.0 forever) |
| skill | 365 days |
| preference | 180 days |
| goal | 180 days |
| event | 90 days |
| relation | 90 days |
| fact (general) | 90 days |

### 8.2 Re-verification [TARGET]

A memory's `lastVerified` timestamp is bumped when:
- The user re-confirms it (explicit action in Memory tab).
- A new piece of evidence is added (e.g. a tool observes the fact again).
- The user edits it.

Each re-verification resets the decay clock AND raises confidence by a fixed increment (+0.1, capped at 1.0). [Bible Part 5.6]

### 8.3 [CURRENT] Deficiency

[CURRENT] `MemoryEntry` has `createdAt` but no `lastVerified`, no halflife, no decay. Recall sorts by `relevance ?? 0` then `createdAt desc`. [FACT]

---

## 9. Conflicts

### 9.1 What is a conflict? [TARGET]

Two context sources that, for the same typed claim, hold different values. Examples:
- Memory: "user prefers dark mode" vs Project MIMO.md: "force light mode for screenshots."
- Knowledge entity: "user skill Arduino = 0.85" vs recent artifact: "user could not compile basic Arduino sketch."

### 9.2 Conflict Detection [TARGET]

The ContextBuilder runs a `ConflictDetector` pass after assembly. Detector rules:
1. Same `(type, subject)` pair with different `value` → conflict.
2. Same entity referenced with two different `confidence` values > 0.2 apart → conflict.
3. Contradictory facts in memory (one says X, another says NOT X).

### 9.3 Conflict Resolution [TARGET] (deterministic, not model-judged)

| Resolution rule | Example |
|---|---|
| User-confirmed > agent-inferred | User said "Arabic" wins over agent inference "English." |
| Newer > older (when provenance equal) | Today's preference overrides last week's. |
| Higher-trust source > lower-trust | MIMO.md > memory > auto-extracted. |
| Higher-evidence-count > lower | Skill with 12 evidence wins over skill with 2. |
| Unresolved → flag, don't auto-resolve | If two user-confirmed facts contradict, surface as a clarification question to the user (Part 9.5) |

### 9.4 Conflict Visibility [TARGET]

Conflicts surface in:
- DeveloperPanel → Context tab (when devMode on).
- As a clarification question in chat if the conflict blocks the answer (Bible Part 9.5).
- As a `context.conflicts[]` array in the ContextObject.

### 9.5 [CURRENT] Deficiency

[CURRENT] No conflict detection. Two contradictory memories can both enter context with no flag. [FACT]

---

## 10. Permissions + Trust Boundaries

### 10.1 Permission Classes for Context Sources [TARGET]

| Class | Allowed consumers | Example sources |
|---|---|---|
| `identity` | All agents + UI | User profile, runtime env |
| `scoped` | Agents in the same project | Memory, knowledge, files, conversation |
| `executable` | Agents with explicit tool/agent capability | Tool schemas, agent state |
| `secret` | Never enters model context | API keys, OS credentials |

**`secret` never enters the ContextObject.** This is a hard invariant. Secrets live in the OS keychain (Bible Part 22.3) and are referenced by ID only. [TARGET — Bible Part 22.3]

### 10.2 Filesystem Trust Boundary [TARGET]

| Path | Default permission | Override mechanism |
|---|---|---|
| `<projectRoot>/**` | read-only (workspace-write requires elevation) | Project scope config |
| `<projectRoot>/.mimo/**` | read-write (MiMo internal state) | Always allowed |
| `~/Library/`, `~/.config/`, dotfiles | NEVER | No override (hard block) |
| `/etc/`, `/System/`, `/usr/` | NEVER | No override (hard block) |
| `@folder` mentioned path | read-only for that turn | User explicit mention |

### 10.3 [CURRENT] Deficiency

[CURRENT] No filesystem access at all in ContextBuilder. No `@file` or `@folder` parsing. [FACT]

### 10.4 Network Trust Boundary [TARGET]

- Web search results enter as `web` source type with `provenance = external`.
- Each web source has `url`, `fetchedAt`, `headers`, `trustScore` (computed from domain reputation list — TBD in `MiMo_Knowledge_Architecture.md`).
- Web content is **sanitized** (HTML stripped, scripts removed) before entering context.

### 10.5 [CURRENT] Deficiency

[CURRENT] WebSearchTool returns raw results; no trust scoring, no sanitization policy in ContextBuilder. [FACT]

---

## 11. Context Caching + Invalidation

### 11.1 [TARGET] Cache Key

```
cacheKey = hash(
  userId,
  workspaceId,
  projectId,
  conversationId,
  taskInputHash,
  memoryStateHash,    // hash of memory IDs + versions relevant to taskInput
  knowledgeStateHash, // hash of entity IDs + versions retrieved
  toolsRegisteredHash,
  agentStateHash,
  runtimeSalt         // invalidates on boot
)
```

### 11.2 [TARGET] Invalidation Triggers

| Trigger | What invalidates |
|---|---|
| User edits a message | conversation_history, conversation_summary, task_intent |
| New memory stored | memory_relevant, knowledge_entities (if consolidation triggers) |
| User deletes a memory | memory_relevant, knowledge_entities (cascade) |
| Project switch | everything below layer 3 |
| `/clear` | conversation_history only |
| `/compact` | conversation_history, conversation_summary |
| `/forget <id>` | memory_relevant only |
| `/folder <path>` | files_in_scope only |
| Tool registered/unregistered | tools_registered |
| Agent state change | agent_state |
| Model switch | cache key prefix (different model → different cache) |

### 11.3 [TARGET] Cache Storage

- In-memory LRU (size 64) per process for hot-path.
- Optional disk cache for cross-session reuse (off by default; opt-in per project).

### 11.4 [CURRENT] Deficiency

[CURRENT] No cache. `/api/mimo/workspace` re-queries MemoryEngine every poll (6s). [FACT]

---

## 12. Context Windows (per model)

### 12.1 [TARGET] Model Context Window Registry

Each registered model declares:
- `contextWindow` (tokens)
- `outputWindow` (max output tokens)
- `costPerInputToken`, `costPerOutputToken`
- `supportsStreaming`, `supportsVision`, `supportsTools`, `supportsReasoning`

The ContextBuilder queries the ModelRegistry for the *routed* model's window BEFORE assembling. If the assembled object would exceed window, the CompressionEngine triggers pre-emptively.

### 12.2 [CURRENT] Deficiency

[CURRENT] ZAIModel has no declared context window. ModelRegistry has one model. [FACT]

---

## 13. Context Provenance

Every entry in the ContextObject MUST carry:

```typescript
interface ContextSource {
  id: string;
  type: ContextSourceType;
  priority: number;       // computed per §4.2
  content: unknown;
  provenance: {
    origin: 'user' | 'agent' | 'tool' | 'system' | 'external' | 'auto-extracted';
    originId: string;      // conversation_id / agent_id / tool_id / url
    capturedAt: number;
    trustLevel: 'confirmed' | 'verified' | 'inferred' | 'unconfirmed';
  };
  freshness: number;      // 0..1 per §8
  permissionClass: 'identity' | 'scoped' | 'executable' | 'secret';
  conflictIds?: string[]; // populated by ConflictDetector
}
```

### 13.1 [CURRENT] Deficiency

[CURRENT] `ContextSource` has only `{ id, type, priority, content }`. No provenance, freshness, permission class, or conflict tracking. [FACT — `src/core/types.ts:85-91`]

---

## 14. Context Transparency [PRODUCT INVARIANT — Bible Part 4.6]

The user always knows what the AI is using.

- ExecutionTrace Context stage shows: memory recalled, knowledge retrieved, files in scope, tools available, conflicts detected, compression applied.
- Every AI answer cites its sources (per-claim, NotebookLM pattern — Bible Part 6.11).
- The user can edit context: `/clear`, `/compact`, `/forget`, `/scope`, `/folder`.
- The user can inspect context: DeveloperPanel → Context tab (when devMode on).

### 14.1 [TARGET] Context Manifest

Every AI response carries a `contextManifest`:

```typescript
interface ContextManifest {
  layersUsed: LayerName[];
  sourcesCount: number;
  tokensUsed: number;
  tokensBudget: number;
  conflictsDetected: number;
  compressionApplied: boolean;
  truncatedLayers: LayerName[];
  citations: Citation[];
}
```

Stored alongside the message. Always inspectable.

---

## 15. The Build Pipeline (Sequence)

```
1. Caller invokes buildContext({ userId, workspaceId, projectId, conversationId, taskInput, mode })
2. Resolve User Profile (from Personal Model cache or recompute)
3. Resolve Project scope (MIMO.md + project settings + file scope config)
4. Load Conversation history (last N messages, scoped by conversationId)
5. If history > cap → trigger CompressionEngine (sync, blocking)
6. Detect Intent (Reasoner) → fills task.intent
7. Recall Memory (semantic, top N by §4.2 ranking)
8. Retrieve Knowledge (entities + graph hops, top N by §4.2 ranking)
9. Resolve referenced artifacts (@artifact mentions)
10. Resolve referenced files (@file, @folder mentions)
11. Snapshot ToolRegistry (filtered by project permissions)
12. Snapshot Agent state (current agent only)
13. Resolve Runtime env
14. Merge all sources into one ContextObject
15. Run ConflictDetector → flag conflicts
16. Compute priorities (§4.2) and apply token budget (§5)
17. Emit context.built event (with manifest)
18. Return frozen ContextObject (immutable)
```

[INFERENCE — this pipeline replaces the current ~6-line implementation in `ContextBuilder.ts`.]

### 15.1 [CURRENT] Deficiency

[CURRENT] buildContext does step 4 (history), step 7 (memory recall top 5), step 12 (no — not done), step 13 (partial). Steps 2, 3, 5, 6, 8, 9, 10, 11, 14, 15, 16 are not done. [FACT]

---

## 16. Migration Path [MIGRATION]

### Phase 1 — Persistence (prerequisite)
- Define Prisma schema for Project, Conversation, Message, Memory, Artifact.
- Replace `DEFAULT_USER` constant with User Profile service.
- Migrate ContextBuilder to read conversation history from DB (not caller-supplied).

### Phase 2 — Provenance + Priority
- Extend `ContextSource` with `provenance`, `freshness`, `permissionClass`, `conflictIds`.
- Implement §4.2 priority formula.
- Add `ContextManifest` to every AI response.

### Phase 3 — Compression + Summarization
- Implement CompressionEngine (Model-routed, cheap model class).
- Add `ConversationSummary` table.
- Implement `/clear`, `/compact`, `/forget` slash commands.

### Phase 4 — Knowledge + Files
- Implement KnowledgeGraph (see `MiMo_Knowledge_Architecture.md`).
- Implement `@file`, `@folder`, `@artifact` mention parser.
- Wire folder-as-context into ContextBuilder.

### Phase 5 — Conflicts + Caching
- Implement ConflictDetector.
- Implement context cache with invalidation triggers.

### Phase 6 — Permissions
- Implement permission classes per §10.
- Implement filesystem trust boundary.
- Block `secret` class from entering context.

Each phase is independently shippable. No phase requires the next.

---

## 17. Trust Boundaries Summary

| Boundary | What crosses it | Who enforces |
|---|---|---|
| User → MiMo | User input | Reasoner (intent detection + sanitization) |
| MiMo → AI Model | ModelRequest (messages only) | PromptEngine + AI Adapter |
| AI Model → MiMo | ModelResponse | Validator + Sanitizer |
| MiMo → Filesystem | Read/write paths | FilesystemPermissionGate (Bible Part 22.5) |
| MiMo → Network | Outbound HTTP | NetworkPermissionGate (Bible Part 22.7) |
| MiMo → Shell | Process spawn | ShellPermissionGate (sandboxed) |
| MiMo → Memory Store | Read/write memory | MemoryEngine (scoped to project + user) |
| MiMo → Knowledge Graph | Read/write entities | KnowledgeGraph (consolidation gated) |
| AI → Tool Execution | Tool invocation | Orchestrator + ApprovalGate (Bible Part 9.2) |
| Secrets → anywhere | NEVER | Hard block (no route exists) |

[FACT — Bible Part 22 establishes these. Current code has none enforced.]

---

## 18. Open Questions [UNKNOWN]

| # | Question | Why it matters | Investigation |
|---|---|---|---|
| 1 | What token budget % allocation is empirically optimal for MiMo's task mix? | Wrong allocation = wasted context or missed facts | A/B test once Knowledge + Memory are real |
| 2 | Should `extraSources` (caller-supplied) bypass priority ranking or be ranked too? | Currently bypass; Bible silent | Decide when WorkflowEngine is wired |
| 3 | How does context cache survive server restart? | Disk cache vs recompute | Profile after Phase 5 |
| 4 | Does the ConflictDetector run synchronously (blocking) or async (post-context)? | Affects latency | Measure typical conflict rate first |
| 5 | Is per-claim citation practical for non-research modes (chat mode)? | Bible Part 6.11 implies per-claim always | User research needed |
| 6 | Token counting — use the model's tokenizer or a heuristic? | Different tokenizers give different counts | Use `tiktoken`-equivalent per adapter; fallback heuristic |

---

## 19. Non-Goals (Explicit)

This architecture does NOT specify:
- The UI rendering of context (covered in `MiMo_Frontend_Architecture.md`, future task).
- The PromptEngine's prompt templates (separate architecture, future).
- The Memory engine internals (see `MiMo_Memory_Architecture.md`).
- The Knowledge graph internals (see `MiMo_Knowledge_Architecture.md`).
- The AI model routing (see `MiMo_AI_Architecture.md`).

It DOES specify the contracts these systems must satisfy to produce a ContextObject.

---

## 20. Summary

[CURRENT]: ContextBuilder assembles a minimal `ContextObject` from user + history + memory recall (substring) + extra sources. No priority policy beyond `relevance * 100`. No compression, no conflicts, no permissions, no provenance, no token budgeting. Frozen-once-built pattern is correct.

[TARGET]: 12-layer hierarchical context with deterministic priority formula (layer × type × freshness × permission × provenance), explicit token budget per layer, CompressionEngine with fact extraction, ConflictDetector with deterministic resolution, full provenance on every source, permission classes (identity/scoped/executable/secret), trust boundaries enforced at the Builder, context caching with 11 invalidation triggers, and a ContextManifest emitted with every AI response.

[MIGRATION]: 6 phases, each independently shippable. Persistence → Provenance → Compression → Knowledge/Files → Conflicts/Caching → Permissions.

**Invariant:** No model-driven context decision is allowed to bypass the deterministic policy layer. The model re-ranks within buckets; it never decides what buckets exist or how big they are.
