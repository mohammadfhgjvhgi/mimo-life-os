# MiMo — Domain Model
### Phase: Foundation From The Ground Up — ARCH-A (Doc 2/5)

**Status:** Canonical domain entities, their relationships, lifecycles, and ownership.
**Authority:** Derives from `MiMo_Product_Bible.md` Parts 2 (Mental Model), 3 (Information Architecture), 5 (Memory), 6 (Knowledge), 8 (Agents), 10 (Execution), 11 (Artifacts), 12 (Conversation), 13 (Workspace), 22 (Security). Bound by `MiMo_System_Constitution.md`.
**Method:** Each entity is justified, not invented. If an entity is listed, it has a purpose that no other entity serves. If it could be folded into another, it is — and noted as such.
**Labels:** `[CURRENT]` / `[TARGET]` / `[MIGRATION]` / `[FACT]` / `[INFERENCE]` / `[UNKNOWN]`.

---

## 0. Reading guide

This document defines **what exists** in MiMo. It does not define how it is stored (see `MiMo_Data_Architecture.md`), how it is communicated (see `MiMo_Event_Architecture.md`), or how it is exposed (see `MiMo_API_Architecture.md`).

Entity cards use this shape:

```
ENTITY: <Name>
  Purpose:        one-line reason this entity exists
  Justification:  why it is not folded into another entity
  Ownership:      user / system / hybrid  (Constitution §3.1)
  Identity:       primary key + determinism rule
  Scope:          global / project / conversation / task / ephemeral
  Lifecycle:      created → states → terminal
  Relationships:  parent / children / references
  Persistence:    table / filesystem / in-memory / none
  Versioning:     none / appended / snapshot / git-style
  Deletion:       hard / soft (grace N days) / never
  Audit:          what is logged about this entity
  Dependencies:   what it needs to function
  [CURRENT]:      present state per Audit
  [TARGET]:       intended state
```

---

## 1. Entity inventory (justified)

22 entities. Each justifies itself against the alternative "fold it into X."

| # | Entity | Why not fold into something else? |
|---|---|---|
| 1 | User | Bible Part 1.8: the owner. Distinct from agents (which are system-owned) and from UserProfile (which is derived). |
| 2 | Workspace | Bible Part 2.4: top-level scope. Not a container competing with Project — but distinct from Project (which is one-of-many). |
| 3 | Project | Bible Part 2.5 + Invariant 1: the ONLY container. Cannot be folded. |
| 4 | Conversation | Bible Part 2.6 + Invariant 1: the ONLY AI surface. Cannot be folded. |
| 5 | Message | A conversation without messages is empty. Distinct from Conversation for indexing, pagination, streaming. |
| 6 | Context | Bible Part 4: per-turn assembled state. Ephemeral; cannot be folded into Conversation (one conversation has many contexts). |
| 7 | Memory | Bible Part 5 + Invariant 4: stored items with provenance. Distinct from Knowledge (which is derived). |
| 8 | Knowledge | Bible Part 6.1 + Invariant: Memory ≠ Knowledge. Knowledge is derived via consolidation. Cannot fold. |
| 9 | Entity (knowledge entity) | Bible Part 6.3: typed, evidence-backed node in the knowledge graph. Distinct from Memory (raw items) and from Relationship (edges). |
| 10 | Artifact | Bible Part 11.1 + Invariant 16: first-class output. Distinct from Message (it can outlive the conversation) and from File (it has versions + provenance + runtime). |
| 11 | Task | Bible Part 2.7 + 10.8: a unit of agent work with state machine. Distinct from Conversation (one conversation has many tasks) and from Agent (which is a role; Task is the work). |
| 12 | Agent | Bible Part 8.1: a named role. Distinct from Task (which is the work) and from User (which is the owner). |
| 13 | Execution | A single run of an agent within a Task. Distinct from Task (one Task has many executions on retry/resume) and from Event (events describe executions; executions are the things). |
| 14 | Tool | Bible Part 25.2: declarable, callable capability. Distinct from Agent (an agent uses tools; a tool is not an agent). |
| 15 | Model | Bible Part 7.14 + Invariant 16: provider-routed model. Distinct from Provider (which is the SDK adapter). |
| 16 | Source | Bible Part 6.11 + Invariant 7: provenance for external knowledge. Distinct from Memory (a Source is where a fact came from; Memory is the fact). |
| 17 | Event | Bible Part 22.9 + Invariant 8: append-only audit-grade log. Distinct from Execution (events describe state changes; executions are stateful work). |
| 18 | Notification | Bible Part 24.9 + Invariant 24: inline actionable UI message. Distinct from Event (events are system-level; notifications are user-facing). |
| 19 | Plugin | Bible Part 25.1: MCP server / external extension. Distinct from Tool (a plugin can register many tools). |
| 20 | Skill | Bible Part 5.1 (memory type) + Part 6.12 (user-model component). A proficiency the owner has. Distinct from Memory (it is one type of memory) and from Tool (a skill is not a tool). **Candidate for folding into Entity(type=skill)** — see §3.20. |
| 21 | Schedule | Bible Part 26.11 (daemon mode, v2): a time-triggered task. Distinct from Task (one-shot) — but only justified once daemon mode exists. |
| 22 | Workflow | Bible Part 10.1 + 10.8: the pipeline run itself (Context→Reason→Plan→Execute→Validate→Done). Distinct from Task (which is the work) and from Execution (which is a single agent run). The Workflow is the spine of one user turn. |
| 23 | File | Bible Part 2.3: virtual FS entry scoped to project. Distinct from Artifact (File is raw; Artifact has versions, provenance, runtime). |
| 24 | Permission | Bible Part 22.4 + Invariant 3: named sandbox modes + approval policies. Distinct from Policy (Permission is a grant; Policy is a rule that grants). |
| 25 | Policy | Bible Part 22.4: the rule that decides allow/deny. Distinct from Trust (which is learned; Policy is configured). |

**Entities considered and rejected:**

- **Workspace, Tab, Panel, Overlay** — UI structures, not domain entities. They live in client state only.
- **ModelCall** — Folded into `Execution` as a `Step`. A separate table adds no value (Bible Part 7 — model invocation is one step of an execution).
- **Embedding** — Folded into `Memory` and `Entity` as a `vector` column. A separate table is implementation detail, not domain.
- **WorkspaceMember** — single-user; rejected.
- **Role** — folded into Agent (agent's `role` field).
- **Subscription / Plan / Billing** — Bible Invariant 9: no counters. Rejected.

---

## 2. Entity-Relationship overview

```
Workspace (1)
  └─ Project (N)
       ├─ Conversation (N)  [one pinned per project at a time]
       │     ├─ Message (N)
       │     ├─ Workflow (N)        [one per user turn]
       │     │     └─ Task (N)
       │     │           ├─ Execution (N)         [agent runs; 1+ per task]
       │     │           │     └─ Event (N)        [emitted during execution]
       │     │           └─ Plan (embedded)
       │     └─ Artifact (N)        [generated inline; opens as tab]
       │
       ├─ Artifact (N)              [also reachable here; project-scoped]
       │     └─ ArtifactVersion (N)
       │
       ├─ File (N)                   [virtual FS]
       ├─ Memory (N)                 [project-scoped or global]
       │     └─ Source (N)           [provenance]
       ├─ Entity (N)                 [knowledge graph node]
       │     └─ EntityChange (N)     [history]
       ├─ Relationship (N)           [entity↔entity edges]
       ├─ AgentState (N)             [per-project agent scope]
       ├─ Policy (1)                  [per-project overrides]
       ├─ TrustLedgerEntry (N)       [per-task-type trust]
       └─ LayoutState (1)             [tab widths, scroll, mode]

User (1, singleton)
  ├─ Profile (1)
  ├─ Preferences (1)
  └─ KeychainRef (N)                 [API keys, by provider]

Plugin (N, global)
  ├─ Tool (N, registered)
  ├─ Agent (N, registered)
  └─ Audit log entries (N)

Model (N, registered)
Provider (N)                         [SDK adapters; code-only, not persisted]

Notification (N, global)             [UI-facing]
Schedule (N, v2)                     [daemon triggers]

Event (N, global, append-only)       [system-level audit log]
```

---

## 3. Entity cards

### 3.1 ENTITY: User

- **Purpose:** The single owner of the MiMo instance.
- **Justification:** Bible Part 1.8 — owner is developer + operator + end user. Distinct from agents and from UserProfile (derived).
- **Ownership:** user-owned (the owner owns themselves).
- **Identity:** `id` (UUID, generated once on first-run; deterministic seed). Singleton — only one row.
- **Scope:** global.
- **Lifecycle:** created on first-run → never deleted (account-delete is a separate "Delete Everything" flow with 7-day grace per Bible 22.11).
- **Relationships:** owns Workspace, Projects, Memories, Artifacts, Files, Notifications, Schedules.
- **Persistence:** SQLite `User` table (replaces the demo User from Audit §3.1).
- **Versioning:** none (immutable except profile fields).
- **Deletion:** never (only the "Delete Everything" flow).
- **Audit:** row creation logged.
- **Dependencies:** none (root).
- **[CURRENT]:** Audit §3.1 — `User` table exists but is the demo boilerplate (id/email/name). Not the MiMo owner.
- **[TARGET]:** Replace with MiMo owner row: `id`, `createdAt`, `displayName`, `locale`, `timezone`, `languages`, `recoveryEmailHash` (optional, for cloud backup), `encryptionKeyRef` (keychain).
- **[MIGRATION]:** Drop the demo schema (acceptable — boilerplate). Seed a single owner row on first boot.

### 3.2 ENTITY: Workspace

- **Purpose:** The top-level scope (Bible Part 2.4). Not a container competing with Project — it is the OS instance.
- **Justification:** Some state is genuinely global (theme, layout, keybindings, owner profile, plugin registry). Without Workspace, that state has no home.
- **Ownership:** user-owned.
- **Identity:** singleton — `id = 'default'` or derived from owner.
- **Scope:** global.
- **Lifecycle:** created on first-run → never deleted.
- **Relationships:** owns Projects, Plugins, global Memory, global Knowledge.
- **Persistence:** SQLite `Workspace` table (singleton row).
- **Versioning:** none.
- **Deletion:** never.
- **Audit:** row creation only.
- **Dependencies:** User.
- **[CURRENT]:** not modeled. Workspace state lives in client Zustand (`lib/nova/store.ts`) — Audit §5.2.
- **[TARGET]:** Persist as a row holding global settings: `defaultModelId`, `defaultSandboxMode`, `theme`, `devMode`, `accent`, `keybindingsHash`. UI state that is purely client-side (panel open/closed) stays in Zustand.
- **[MIGRATION]:** Move settings out of Zustand initial state into the Workspace row. Keep Zustand as a write-through cache.

### 3.3 ENTITY: Project

- **Purpose:** The ONLY container (Bible Part 2.5 + Invariant 1).
- **Justification:** Cannot be folded. Everything below this row is project-scoped.
- **Ownership:** user-owned.
- **Identity:** `id` (UUID). `slug` (owner-chosen, unique). `accent` (hex color).
- **Scope:** global (visible from anywhere; one is active at a time).
- **Lifecycle:** active → archived (30-day grace) → deleted (hard).
- **Relationships:** owns Conversations, Artifacts, Files, Memories (scoped), Entities (scoped), AgentStates, Policies, TrustLedger, LayoutState.
- **Persistence:** SQLite `Project` table.
- **Versioning:** none (projects don't version; their contents do).
- **Deletion:** soft → hard. Grace 30 days (Bible 22.11).
- **Audit:** create / archive / delete / accent-change / settings-change.
- **Dependencies:** Workspace.
- **[CURRENT]:** not modeled. `lib/nova/store.ts` `currentProject` is a string (Audit §5.2).
- **[TARGET]:** full Project row + scoped children + MIMO.md content.
- **[MIGRATION]:** introduce in M2 (Constitution §14.1).

### 3.4 ENTITY: Conversation

- **Purpose:** The permanent spine (Bible Part 2.6 + Invariant 1).
- **Justification:** Cannot be folded. The conversation is the ONLY AI surface.
- **Ownership:** user-owned.
- **Identity:** `id` (UUID). `projectId` (FK). `isPinned` (boolean — at most one pinned per project).
- **Scope:** project.
- **Lifecycle:** active → archived (30-day grace) → deleted. The pinned conversation is created with the project and cannot be archived while pinned.
- **Relationships:** parent of Messages, Workflows, generated Artifacts. Forks reference a parent Conversation + Message.
- **Persistence:** SQLite `Conversation` table.
- **Versioning:** none directly — but each Workflow is a point-in-time snapshot; Messages are append-only (so history is preserved).
- **Deletion:** soft → hard, 30-day grace.
- **Audit:** create / archive / delete / fork / pin-status-change.
- **Dependencies:** Project.
- **[CURRENT]:** not modeled. Conversations live in Zustand (`lib/nova/store.ts` `conversations` array — Audit §5.2). Lost on hard refresh.
- **[TARGET]:** Persisted. Pinned conversation auto-created with project.
- **[MIGRATION]:** M2 + M3 (schema + persistence).

### 3.5 ENTITY: Message

- **Purpose:** A single turn in a conversation.
- **Justification:** Cannot fold into Conversation — messages stream, paginate, virtualize (Bible Part 12.5 + Part 26.2). A conversation without messages is just metadata.
- **Ownership:** user-owned (user messages) or system-owned (assistant messages, agent messages, system messages).
- **Identity:** `id` (UUID). `conversationId` (FK). `sequenceNumber` (monotonic per conversation).
- **Scope:** conversation.
- **Lifecycle:** streamed → committed → edited (creates a new version) → deleted (soft).
- **Relationships:** belongs to Conversation. May reference Memory (via `((mem_id))` block refs — Bible 5.7). May reference Artifacts (inline cards). May reference Sources (citations). May be a fork root (one Conversation+Message pair).
- **Persistence:** SQLite `Message` table. Content stored as text; large content (e.g., generated artifacts inline-rendered) stored as blob reference if > 64KB.
- **Versioning:** append-only. Edits create new Message rows with `parentId` pointing to the original. Original is preserved.
- **Deletion:** soft (sets `deletedAt`). Hard delete only after conversation archive + 30-day grace.
- **Audit:** create / edit / delete / stream-complete.
- **Dependencies:** Conversation.
- **[CURRENT]:** partial — `ConversationTurn` type exists (`core/types.ts:38`), but no persistence.
- **[TARGET]:** full table with FTS5 index for search.

### 3.6 ENTITY: Context

- **Purpose:** The assembled state for a single turn (Bible Part 4). 10 layers: User / Conversation / Project / Task / Agent / Memory / Knowledge / File / Tool / Runtime.
- **Justification:** Ephemeral per-turn state. Cannot fold into Conversation (one conversation has many contexts — one per turn).
- **Ownership:** system-owned.
- **Identity:** `id` (UUID, per-turn). `messageId` (FK to the user Message that triggered it). `workflowId` (FK).
- **Scope:** ephemeral (per-turn).
- **Lifecycle:** built → consumed by Reasoner → consumed by Planner → consumed by Orchestrator → archived (devMode time-travel only).
- **Relationships:** references Memory items, Entities, Files, Tools, Sources (all by ID — does not embed them).
- **Persistence:** **None by default.** DevMode time-travel (Bible Part 24.7) persists snapshots to a `ContextSnapshot` table for replay — opt-in only, pruned aggressively.
- **Versioning:** none — each Context is unique per turn.
- **Deletion:** dropped at end of turn (unless devMode snapshot enabled).
- **Audit:** `CONTEXT_RESOLVED` event with summary (memory count, entity count, file count, tool count).
- **Dependencies:** Conversation, Memory, Knowledge, Files, Tools, Project, User.
- **[CURRENT]:** `ContextObject` type exists (`core/types.ts:99`). Built per-request, dropped after.
- **[TARGET]:** same shape + optional devMode snapshot.

### 3.7 ENTITY: Memory

- **Purpose:** A stored item (fact / preference / event / relation / skill / goal) with provenance (Bible Part 5 + Invariant 4).
- **Justification:** Cannot fold into Knowledge — Memory is raw input; Knowledge is derived (Bible 6.1).
- **Ownership:** hybrid — system creates (auto-extraction), owner confirms (explicit layer).
- **Identity:** `id` (UUID, stable — Bible 5.7 block-level addressing). `projectId` (nullable — null = global).
- **Scope:** project or global.
- **Lifecycle:** candidate (auto-extracted, pending confirmation) → explicit (confirmed) → archived → deleted.
- **Relationships:** references Source (provenance). May reference other Memories (MemoryRelation). May be linked to an Entity (post-consolidation).
- **Persistence:** SQLite `Memory` table. `vector` column for embedding (for semantic recall).
- **Versioning:** append-only via `MemoryEdit` rows (preserve original on edit).
- **Deletion:** hard, one-click (Bible 5.12). Cascade: delete `MemoryEdit`, `MemoryRelation`, unlink from `Entity` (set `memoryId` null — Entity survives).
- **Audit:** create / edit / delete / scope-change / decay-recalculation / consolidation-promote.
- **Dependencies:** Project (if scoped), Source.
- **[CURRENT]:** in-memory only (`MemoryEngine` Map — Audit §3.2). Lost on restart.
- **[TARGET]:** full persistence with vector column, FTS5, decay, relations.
- **[MIGRATION]:** M3 (Constitution §14.1).

### 3.8 ENTITY: Knowledge (the graph; not a row)

- **Purpose:** The derived knowledge graph (Bible Part 6). Composed of Entity + Relationship rows + in-memory index.
- **Justification:** "Knowledge" is a logical grouping, not a table. The actual rows are `Entity` and `Relationship`. Listed here because Bible Part 6 treats Knowledge as a first-class concept.
- **Ownership:** system-owned (consolidation engine creates).
- **Identity:** the graph as a whole has no identity — its nodes (Entity) and edges (Relationship) do.
- **Scope:** project or global.
- **Persistence:** `Entity`, `EntityChange`, `Relationship` tables + in-memory index rebuilt on boot.
- **[CURRENT]:** type-only (`MemoryRelation` exists in `core/types.ts:67`); no graph.

### 3.9 ENTITY: Entity (knowledge node)

- **Purpose:** A typed, evidence-backed node in the knowledge graph (Bible Part 6.3). Types: identity / skill / interest / project / goal / person / memory / decision.
- **Justification:** Distinct from Memory — Entity is derived and decays differently (Bible 6.6).
- **Ownership:** system-owned.
- **Identity:** `id` deterministic — `ent:<type>:<slug>` (Bible 6.3). Stable across re-derivation.
- **Scope:** project or global.
- **Lifecycle:** active → merged (into another Entity) → archived.
- **Relationships:** references Memory (evidence). References other Entities (via Relationship). References Sources.
- **Persistence:** SQLite `Entity` table. `aliases` as JSON array. `properties` as JSON. `confidence` (0..1, decayed). Index on `(projectId, type, nameLower)`.
- **Versioning:** append-only via `EntityChange` rows.
- **Deletion:** soft (archived). Hard delete only via "Delete Everything" — Bible 22.11.
- **Audit:** create / merge / archive / property-update / confidence-decay.
- **Dependencies:** Memory (evidence source), Project.
- **[CURRENT]:** not modeled.
- **[TARGET]:** full table + in-memory graph index.

### 3.10 ENTITY: Relationship (knowledge edge)

- **Purpose:** A typed, evidence-backed edge between two Entities (Bible Part 6.4).
- **Justification:** Cannot fold into Entity — edges have their own evidence and confidence.
- **Ownership:** system-owned.
- **Identity:** `(fromId, toId, type)` composite key.
- **Scope:** inherits from Entity (project or global).
- **Lifecycle:** active → archived.
- **Persistence:** SQLite `Relationship` table.
- **[CURRENT]:** type-only.

### 3.11 ENTITY: Artifact

- **Purpose:** A first-class output (code / markdown / image / etc.) — Bible Part 11.1.
- **Justification:** Cannot fold into Message — artifacts outlive conversations, have versions, can be opened as tabs, have runtimes (Bible Part 11.4).
- **Ownership:** user-owned (created by user or agent on user's behalf).
- **Identity:** `id` (UUID). `projectId` (FK).
- **Scope:** project.
- **Lifecycle:** draft → published → archived → deleted.
- **Relationships:** belongs to Project. Has ArtifactVersions. References producing Conversation + Workflow + Agent (provenance — Bible 11.6).
- **Persistence:** SQLite `Artifact` table (metadata) + filesystem blobs for content (canonical: `~/.mimo/projects/<projectId>/artifacts/<artifactId>/v<n>.<ext>`).
- **Versioning:** git-style — each version is a row in `ArtifactVersion` + a content blob. Hover thumbnails (Bible 11.4).
- **Deletion:** soft → hard, 30-day grace.
- **Audit:** create / version / publish / archive / delete / share-url-generated.
- **Dependencies:** Project, Conversation (provenance), Agent (provenance).
- **[CURRENT]:** not modeled. ArtifactDock exists but no Artifact entity (Audit §17 #9).
- **[TARGET]:** full model + filesystem blobs + sandboxed runtime (Pyodide/CSP iframe in M8).
- **[MIGRATION]:** M8.

### 3.12 ENTITY: Task

- **Purpose:** A unit of agent work within a Workflow (Bible Part 2.7 + 10.8).
- **Justification:** Cannot fold into Workflow (one workflow has many tasks) or into Agent (an agent is a role; a task is the work).
- **Ownership:** system-owned.
- **Identity:** `id` (UUID). `workflowId` (FK).
- **Scope:** workflow.
- **Lifecycle:** empty → planning → executing → validating → done / failed / cancelled / paused.
- **Relationships:** belongs to Workflow. Has Executions. Has a Plan (embedded). May produce Artifacts.
- **Persistence:** SQLite `Task` table. State machine column.
- **Versioning:** state transitions are append-only via `TaskStateChange` rows.
- **Deletion:** never hard-deleted while Conversation is alive. Archived with conversation.
- **Audit:** every state transition logged.
- **Dependencies:** Workflow, Agent.
- **[CURRENT]:** partial — `INITIAL_TASKS` mock exists in `lib/nova/constants.ts`. Audit §16 #16. No real Task entity.
- **[TARGET]:** full state machine + persistence.

### 3.13 ENTITY: Agent

- **Purpose:** A named role (Planner / Researcher / Builder / Reviewer / Verifier) — Bible Part 8.1.
- **Justification:** Distinct from Task — Agent is the role; Task is the work. One Agent can run many Tasks.
- **Ownership:** system-owned (registered at boot).
- **Identity:** `id` (deterministic string, e.g., `agent:planner`).
- **Scope:** global (registered) + per-project state (AgentState rows).
- **Lifecycle:** registered at boot → alive for app lifetime. Per-project: spawned → idle → spawned.
- **Relationships:** has AgentState per project. Has required tools. Has model routing. Has Executions.
- **Persistence:** `Agent` table is **not** persisted (rebuilt from code at boot — Bible Part 26.7 "agents registered at kernel boot"). `AgentState` table IS persisted (per-project scope, accumulated state).
- **Versioning:** none (code-defined).
- **Deletion:** only by removing from code.
- **Audit:** registry-loaded at boot; per-run actions audited via Execution + Event.
- **Dependencies:** Tools (declared), Model (routing).
- **[CURRENT]:** 4 agents exist (`Planner`, `Researcher`, `Memory`, `Writer` — Audit §1.4). No per-project state.
- **[TARGET]:** 5 named roles per Bible 8.1 (add `Reviewer` + `Verifier`; rename `Writer` to `Builder`). Add `AgentState` table.

### 3.14 ENTITY: Execution

- **Purpose:** A single run of an agent within a Task. Includes retry attempts.
- **Justification:** Cannot fold into Task — retry/resume (Bible Part 9.7) needs separate rows. Cannot fold into Event — events describe executions; executions are the things.
- **Ownership:** system-owned.
- **Identity:** `id` (UUID). `taskId` (FK). `attemptNumber` (1, 2, 3 — capped at 3 per Bible 7.12).
- **Scope:** task.
- **Lifecycle:** started → streaming → completed / failed / paused / cancelled.
- **Relationships:** belongs to Task. Emits Events. Calls Tools (logged). Calls Model (logged).
- **Persistence:** SQLite `Execution` table + `ExecutionStep` rows (one per pipeline step, one per tool call, one per model call).
- **Versioning:** append-only.
- **Deletion:** archived with conversation.
- **Audit:** every step logged.
- **Dependencies:** Task, Agent, Model, Tools.
- **[CURRENT]:** not modeled. Orchestrator runs ad-hoc.
- **[TARGET]:** full execution trace → powers ExecutionTrace UI + devMode time-travel (Bible 24.7).

### 3.15 ENTITY: Tool

- **Purpose:** A declarable, callable capability (Bible Part 25.2).
- **Justification:** Cannot fold into Agent — an Agent uses Tools; Tools are reusable across Agents.
- **Ownership:** system-owned (built-in) or plugin-owned (registered by MCP server).
- **Identity:** `id` (deterministic string, e.g., `tool:web_search`).
- **Scope:** global.
- **Lifecycle:** registered at boot or plugin-load → disabled per-project → re-enabled. Never deleted while registered.
- **Relationships:** declares required Permissions. May be owned by a Plugin.
- **Persistence:** `Tool` table is **not** persisted for built-ins (rebuilt from code at boot). Plugin-registered tools ARE persisted in `PluginTool` (so they survive restart, with owner consent).
- **Versioning:** schema versioned (Bible 25.7).
- **Deletion:** built-ins: by code removal. Plugin: by uninstall.
- **Audit:** every invocation logged via `TOOL_CALLED` event.
- **Dependencies:** Permissions (declared).
- **[CURRENT]:** 3 tools (`WebSearch`, `MemoryRecall`, `MemoryStore` — Audit §4.3).
- **[TARGET]:** add `file_read`, `file_write`, `terminal` (Bible 8.1). Add PolicyEngine gate.

### 3.16 ENTITY: Model

- **Purpose:** A provider-routed model (Bible Part 7.14 + Invariant 16).
- **Justification:** Cannot fold into Provider — one Provider can offer many Models (e.g., ZAI offers `glm-4.7`, `glm-4.7-thinking`, etc.).
- **Ownership:** system-owned.
- **Identity:** `id` (deterministic, e.g., `model:zai:glm-4.7`). `providerId` (FK to Provider — code-only). `dimension` (cheap/fast / deep / vision / local — Bible 7.1).
- **Scope:** global.
- **Lifecycle:** registered at boot or owner-added → disabled → re-enabled.
- **Relationships:** belongs to Provider. Has API key reference (KeychainRef).
- **Persistence:** `Model` table persisted (owner-added models survive restart).
- **Versioning:** schema versioned.
- **Deletion:** soft (disabled). Hard delete only by owner action.
- **Audit:** every invocation logged via `MODEL_INVOKED` event.
- **Dependencies:** Provider adapter (code), API key (KeychainRef).
- **[CURRENT]:** one model (`ZAIModel` adapter — Audit §4.1). No routing, no per-task-type.
- **[TARGET]:** registry with multiple models, per-task routing (cheap/fast/deep/vision/local).

### 3.17 ENTITY: Source

- **Purpose:** Provenance for external knowledge (Bible Part 6.11 + Invariant 7). Where a fact came from.
- **Justification:** Cannot fold into Memory — one Source can support many Memories (and many Entities). Folding loses the citation graph.
- **Ownership:** system-owned.
- **Identity:** `id` (UUID). `kind` (web / file / conversation / agent / tool / user / external-api). `ref` (URL, file path, conversation+message ID, etc.).
- **Scope:** global (a Source can support facts across projects).
- **Lifecycle:** created → never deleted (referenced by Memories/Entities).
- **Relationships:** referenced by Memory (evidence), Entity (evidence), Artifact (provenance).
- **Persistence:** SQLite `Source` table. Unique on `(kind, ref)` so duplicate citations dedupe.
- **Versioning:** none.
- **Deletion:** hard delete only when no references remain (GC).
- **Audit:** create / reference-count-change.
- **Dependencies:** none (leaf).
- **[CURRENT]:** not modeled. `ContextSource` type exists (`core/types.ts:85`) but is ephemeral.
- **[TARGET]:** persisted, with the citation graph.

### 3.18 ENTITY: Event

- **Purpose:** Append-only audit log (Bible Part 22.9 + Invariant 8).
- **Justification:** Cannot fold into Execution — Events describe ALL state changes (memory writes, plan approvals, tool denials, user edits), not just executions.
- **Ownership:** system-owned.
- **Identity:** `id` (UUID). `sequenceNumber` (monotonic global). `correlationId` (UUID per workflow). `type` (canonical name — see Event Architecture doc).
- **Scope:** global.
- **Lifecycle:** emitted → never mutated → archived (after 1 year — Bible 22.9 says "never deleted"; archival = cold storage, still readable).
- **Relationships:** references the entity it describes (polymorphic by `entityType` + `entityId`).
- **Persistence:** SQLite `Event` table, append-only. Indexed on `(type, createdAt)`, `(correlationId)`, `(entityType, entityId)`.
- **Versioning:** schema versioned (`schemaVersion` column).
- **Deletion:** never (Bible 22.9).
- **Audit:** self (it IS the audit).
- **Dependencies:** none (leaf).
- **[CURRENT]:** `EventBus` is in-memory only (Audit §3.2). No persistence.
- **[TARGET]:** persisted append-only log.
- **[MIGRATION]:** M4.

### 3.19 ENTITY: Notification

- **Purpose:** User-facing inline actionable message (Bible Part 24.9 + Invariant 24).
- **Justification:** Cannot fold into Event — Events are system-level (audit); Notifications are UI-level (with actions: retry, undo, dismiss).
- **Ownership:** user-owned.
- **Identity:** `id` (UUID). `userId` (FK).
- **Scope:** global.
- **Lifecycle:** pending → shown → dismissed / action-taken → archived.
- **Relationships:** references the triggering Event. References the target entity (Task, Memory, Artifact).
- **Persistence:** SQLite `Notification` table. TTL 24h for unactioned.
- **Versioning:** none.
- **Deletion:** hard after dismissal + 7 days.
- **Audit:** create / show / dismiss / action.
- **Dependencies:** Event.
- **[CURRENT]:** Zustand toasts (`lib/nova/store.ts` `toasts` — Audit §5.2). Ephemeral.
- **[TARGET]:** persisted; survives refresh.

### 3.20 ENTITY: Skill

- **Purpose:** A proficiency the owner has, with confidence + evidence (Bible Part 5.1 type=skill + Part 6.12 user-model).
- **Justification:** **Candidate for folding into Entity(type=skill).** Skill IS a knowledge entity of type "skill." Listing it separately here is wrong. **Skill is folded into Entity.**
- **Decision:** Skill is NOT a separate table. It is `Entity` where `type = 'skill'`. The Bible treats "skill" as both a memory type and an entity type — they unify at the Entity level after consolidation.
- **[CURRENT]:** `MemoryType = 'skill'` exists. No Entity yet.
- **[TARGET]:** memories of type=skill consolidate into Entities of type=skill.

### 3.21 ENTITY: Schedule (v2)

- **Purpose:** A time-triggered Task (Bible Part 26.11 — daemon mode).
- **Justification:** Cannot fold into Task — Task is one-shot triggered by user; Schedule is recurring/deferred. **Only justified once daemon mode exists (v2).** Listed for completeness; not built in v1.
- **Ownership:** user-owned.
- **Identity:** `id` (UUID). `cron` (or `nextRunAt`). `taskTemplateId` (FK).
- **Scope:** global or project.
- **Lifecycle:** active → paused → deleted.
- **Relationships:** spawns Tasks on schedule.
- **Persistence:** SQLite `Schedule` table (v2).
- **Deletion:** soft → hard, 30-day grace.
- **Audit:** create / pause / resume / fire / delete.
- **Dependencies:** Task template, PolicyEngine (pre-approved at scheduling time — Bible 9.6).
- **[CURRENT]:** not implemented.
- **[TARGET]:** v2.

### 3.22 ENTITY: Workflow

- **Purpose:** The pipeline run for a single user turn (Context→Reason→Plan→Execute→Validate→Done) — Bible Part 10.1 + 10.8.
- **Justification:** Cannot fold into Task — one Workflow can have many Tasks (parallel branches in v2 multi-agent — Bible 8.8). Cannot fold into Execution — Execution is per-agent; Workflow is per-turn.
- **Ownership:** system-owned.
- **Identity:** `id` (UUID). `messageId` (FK to triggering user Message).
- **Scope:** conversation.
- **Lifecycle:** started → context_built → planned → executing → validating → done / failed.
- **Relationships:** belongs to Conversation. Has Tasks. Has Executions (via Tasks). Emits Events.
- **Persistence:** SQLite `Workflow` table.
- **Versioning:** append-only (state transitions).
- **Deletion:** archived with conversation.
- **Audit:** every stage transition logged.
- **Dependencies:** Conversation, Context, Tasks.
- **[CURRENT]:** `runWorkflow()` function exists (`core/workflow/WorkflowEngine.ts`), but no persisted Workflow entity.
- **[TARGET]:** persisted; powers devMode time-travel.

### 3.23 ENTITY: File

- **Purpose:** A virtual FS entry scoped to a project (Bible Part 2.3 + 2.5).
- **Justification:** Cannot fold into Artifact — File is raw (no versions, no provenance, no runtime); Artifact is rich.
- **Ownership:** user-owned.
- **Identity:** `id` (UUID). `projectId` (FK). `path` (relative to project root, normalized). Unique on `(projectId, path)`.
- **Scope:** project.
- **Lifecycle:** created → modified → deleted (soft, 30-day grace).
- **Relationships:** belongs to Project. May be referenced by Messages (`@file`). May be folder-as-context.
- **Persistence:** SQLite `File` table (metadata) + filesystem (content — `~/.mimo/projects/<projectId>/files/<fileId>`).
- **Versioning:** none (use Artifacts for versioned content).
- **Deletion:** soft → hard. Content blob deleted on hard delete.
- **Audit:** create / modify / delete / read-by-agent.
- **Dependencies:** Project.
- **[CURRENT]:** not implemented (Audit §3.6).

### 3.24 ENTITY: Permission

- **Purpose:** A grant (allow/deny/ask) for a (subject, action, resource) triple — Bible Part 22.4.
- **Justification:** Cannot fold into Policy — Permission is the stored grant; Policy is the rule engine that interprets grants + trust + sandbox modes to produce a Decision.
- **Ownership:** user-owned (owner grants) or system-owned (defaults).
- **Identity:** `id` (UUID). `subjectType` (agent / tool / plugin). `subjectId`. `action` (e.g., `file.write`, `network.call`, `shell.exec`). `resource` (path/glob/URL pattern).
- **Scope:** global or project.
- **Lifecycle:** active → revoked.
- **Relationships:** none (atomic).
- **Persistence:** SQLite `Permission` table.
- **Versioning:** none (append + revoke; never mutate).
- **Deletion:** hard (revoke = delete).
- **Audit:** grant / revoke / check (every check logged if `audit=true`).
- **Dependencies:** Policy engine (consumer).
- **[CURRENT]:** not implemented (Audit §9.2).
- **[TARGET]:** M5.

### 3.25 ENTITY: Policy

- **Purpose:** The rule that decides allow/deny for a given request, combining sandbox mode + trust ledger + explicit permissions — Bible Part 22.4.
- **Justification:** Cannot fold into Permission — Policy is the function; Permission is the data.
- **Ownership:** system-owned (code-defined) + per-project overrides (persisted).
- **Identity:** `id` (deterministic, e.g., `policy:default`, `policy:<projectId>:override`).
- **Scope:** global default + per-project override.
- **Lifecycle:** loaded at boot → mutated via Settings UI → persisted.
- **Relationships:** consumes Permissions + TrustLedger + sandbox mode.
- **Persistence:** SQLite `Policy` table (per-project overrides only — defaults in code).
- **Versioning:** code-versioned for defaults; row-versioned for overrides.
- **Deletion:** soft (revert to default).
- **Audit:** policy-change.
- **Dependencies:** Permissions, TrustLedger.
- **[CURRENT]:** not implemented.
- **[TARGET]:** M5.

### 3.26 ENTITY: TrustLedger (entry)

- **Purpose:** Per-task-type trust state (Bible Part 8.7 + Invariant 22).
- **Justification:** Distinct from Permission — Trust is learned (counts approvals); Permission is explicit. Trust can be graduated ("Always allow" after 3 approvals — Bible 8.7); Permission is binary.
- **Ownership:** user-owned.
- **Identity:** `id` (UUID). `projectId` (FK, nullable for global). `taskType`. `sandboxMode`. `approvalCount`.
- **Scope:** project or global.
- **Lifecycle:** untrusted (count=0) → on-request (count=1..2) → always-allow-offered (count=3) → trusted (count≥3, accepted).
- **Relationships:** belongs to Project. References taskType.
- **Persistence:** SQLite `TrustLedgerEntry` table.
- **Versioning:** append-only (every approval logged via Event; ledger entry mutated).
- **Deletion:** hard (revoke trust).
- **Audit:** approval-granted / always-allow-accepted / revoked.
- **Dependencies:** Policy (consumer).
- **[CURRENT]:** not implemented.
- **[TARGET]:** M5.

---

## 4. Cross-cutting lifecycle rules

### 4.1 Identity rules [TARGET]

- UUIDs are v4 (random) for non-deterministic entities (Conversation, Message, Task, Execution).
- UUIDs are deterministic for entities with a natural key: `Entity.id = ent:<type>:<slug>`, `Agent.id = agent:<role>`, `Tool.id = tool:<name>`, `Model.id = model:<provider>:<name>`.
- Slugs are lowercase, ASCII, kebab-case, max 64 chars.

### 4.2 Soft-delete rule [TARGET]

Every user-owned entity has `deletedAt` (nullable). Soft-deleted rows are excluded from default queries. Hard delete happens after the grace period (30 days for projects/conversations/artifacts/files, 7 days for "Delete Everything" — Bible 22.11). Hard delete cascades to children.

### 4.3 Cascade rules [TARGET]

| Parent deleted (hard) | Children |
|---|---|
| User (Delete Everything) | Everything, after 7-day grace |
| Workspace | Everything |
| Project | Conversations, Artifacts, Files, Memories (scoped), Entities (scoped), Layout, Policies, TrustLedger |
| Conversation | Messages, Workflows, Tasks, Executions, Events (archived, not deleted) |
| Workflow | Tasks, Executions (archived) |
| Task | Executions, Plan (embedded) |
| Memory | MemoryEdits, MemoryRelations (unlinked from Entity) |
| Entity | Relationships (both directions), EntityChanges |
| Artifact | ArtifactVersions, content blobs |

### 4.4 Versioning rules [TARGET]

- **Append-only:** Message, Memory, Entity, Event, Execution, ExecutionStep, Notification, AuditLog.
- **Snapshot versions:** Artifact (each version is a row + blob).
- **State-machine append:** Task, Workflow (transitions logged).
- **Replaceable:** User (profile fields), Workspace (settings), Project (settings), File (content), Permission, Policy, TrustLedgerEntry.

### 4.5 Audit rules [TARGET — Bible Part 22.9]

Every entity write emits at least one Event. The Event references `(entityType, entityId, action, actor, before, after, correlationId, timestamp)`. The AuditLog view reads from the Event table filtered to security-relevant types.

---

## 5. Domain invariants (the entity-level rules)

These are domain-level counterparts to the Constitution's architectural rules.

1. **A Conversation always belongs to exactly one Project.** Even the global pinned conversation has a project (the "default" project). [Invariant — Bible 2.6]
2. **A Memory without a Source is invalid.** [Bible 5.4 + Invariant 4]
3. **An Entity without evidence is invalid.** [Bible 6.3 — `evidence: Evidence[]` is non-empty]
4. **A Task without a Workflow is invalid.** [Bible 10.8 — Tasks are within conversation turns]
5. **An Execution without an Agent is invalid.** [Bible 8.1]
6. **An Artifact without provenance is invalid.** [Bible 11.6 + Invariant]
7. **A Permission without a subject is invalid.** [This document]
8. **An Event without a correlationId is invalid** (except system boot events). [Event Architecture]
9. **No entity may reference a soft-deleted parent.** Foreign keys are checked at query time, not just DB constraint. [This document]
10. **No two entities may share the same `id`.** Deterministic IDs enforce this; UUIDs guarantee it probabilistically.

---

## 6. Entity-to-Bible cross-reference

| Entity | Bible anchor |
|---|---|
| User | Part 1.8 |
| Workspace | Part 2.4 |
| Project | Part 2.5 |
| Conversation | Part 2.6 + Part 12 |
| Message | Part 12 (implicit) + Part 26.3 (FTS) |
| Context | Part 4 (10 layers) |
| Memory | Part 5 |
| Knowledge / Entity / Relationship | Part 6 |
| Artifact | Part 11 |
| Task | Part 2.7 + Part 10.8 |
| Agent | Part 8 |
| Execution | Part 8.11 + Part 10 (observability) |
| Tool | Part 25.2 |
| Model | Part 7.14 |
| Source | Part 6.11 + Part 11.6 |
| Event | Part 22.9 |
| Notification | Part 24.9 |
| Plugin | Part 25.1 |
| Skill (folded into Entity) | Part 5.1 + Part 6.12 |
| Schedule | Part 26.11 (v2) |
| Workflow | Part 10.1 + Part 10.8 |
| File | Part 2.3 + Part 2.5 |
| Permission | Part 22.4 |
| Policy | Part 22.4 |
| TrustLedger | Part 8.7 |

---

## 7. Open questions

1. **[UNKNOWN]** Should `Workflow` be a separate row from `Message`, or folded into Message as a `workflowState` column? Lean toward separate — Workflows have many Tasks, and time-travel (Bible 24.7) needs the snapshot. Decision: separate.
2. **[UNKNOWN]** Should `Memory` store its own vector embedding, or use a separate `Embedding` table keyed by `(memoryId, modelId, version)`? Separate table lets us re-embed when models change without rewriting Memory rows. Decision: separate `Embedding` table (added to Data Architecture).
3. **[UNKNOWN]** Should `Context` snapshots (devMode time-travel) be in SQLite or in a separate file? SQLite — easier to query, small enough.
4. **[UNKNOWN]** Should `Plugin` be its own table, or just a column on `Tool` / `Agent`? Separate table — a Plugin registers multiple tools/agents; needs its own lifecycle (install/uninstall/permissions).
5. **[UNKNOWN]** Does `File` need versioning? Bible treats Files as raw. Decision: no versioning — use Artifacts for versioned content.

---

## 8. Summary

The MiMo domain model has **24 persisted entities** (User, Workspace, Project, Conversation, Message, Context [devMode-only], Memory, Entity, Relationship, Artifact, ArtifactVersion, Task, Execution, ExecutionStep, Tool, Model, Source, Event, Notification, Plugin, Workflow, File, Permission, Policy, TrustLedgerEntry, plus Schedule in v2) plus **code-defined entities** (Agent, Provider adapter, built-in Tool). Each entity is justified against the alternative of folding it into another; Skill was considered and explicitly folded into Entity.

The model respects:
- **Constitution §3.1 ownership types** (user / system / hybrid) on every entity.
- **Bible Part 3.2 ownership + lifecycle table** — extended with persistence + audit details.
- **Bible Invariants 1, 4, 5, 16, 22** — one container, one AI surface, provenance on memory, per-task-type trust.
- **Bible Part 26.7 evolution strategy** — agents and built-in tools are code-defined (rebuild at boot), so new ones are added without migration.

The four sibling docs take this model as input:
- **Data Architecture** decides storage for each entity.
- **Event Architecture** defines the events emitted by each entity's lifecycle.
- **API Architecture** defines the routes that read/write each entity.
- **Constitution** enforces the rules that protect each entity's integrity.

**End of Domain Model.**
