# MiMo — System Constitution
### Phase: Foundation From The Ground Up — ARCH-A (Doc 1/5)

**Status:** HARD ARCHITECTURAL RULES. Translates the MiMo Product Bible into constraints that bind every line of code.
**Authority:** This document is the architectural constitution. Where it conflicts with implementation, **implementation loses**. Where it conflicts with the Product Bible, **the Product Bible wins** (this document is a derivative, not a peer).
**Method:** Direct derivation from `MiMo_Product_Bible.md` (Parts 1, 22, 25, 27, 29) and `MiMo_Current_System_Audit.md`. Every rule cites a Bible part and a reason.
**Labels:** `[CURRENT]` = present reality per Audit · `[TARGET]` = what we will build · `[MIGRATION]` = how we move from current to target · `[FACT]` = verifiable · `[INFERENCE]` = reasoned but unverified · `[UNKNOWN]` = open question.

---

## 0. Constitution vs. Specs vs. Code

| Layer | Authority | Mutability |
|---|---|---|
| Product Bible (`MiMo_Product_Bible.md`) | Highest | Amendments require a design-decision record (Part 30 pattern) |
| Constitution (this document) | Architectural | Amendments require a PR + Bible cross-reference |
| Domain Model / Data / Events / API (siblings) | Architectural | Must not contradict Constitution |
| Code | Lowest | Must comply with all of the above |

If code disagrees with the Constitution, the code is wrong. If the Constitution disagrees with the Bible, the Constitution is wrong. There is no third option.

---

## 1. System Boundaries

### 1.1 What MiMo is [FACT — Bible Part 1.7, Part 33]

A single-user, local-first, conversation-spine + canvas-per-mode AI Operating System. One process. One owner. One machine (with optional E2E cloud sync, off by default).

### 1.2 The five trust boundaries [TARGET — Bible Parts 22, 25]

The system has exactly five trust boundaries. Each is an enforced seam, not a convention.

| # | Boundary | What crosses it | What must NOT cross it | Enforcement |
|---|---|---|---|---|
| **B1** | Process boundary | HTTP/JSON over `localhost` (UI ↔ API routes) | Direct references to Core engine internals in client components | `'use client'` directive + ESLint `no-restricted-imports` |
| **B2** | Provider boundary | Canonical MiMo request/response objects | Provider-proprietary shapes (Anthropic/OpenAI/ZAI payloads) | Adapter pattern (`core/models/*Adapter.ts`, `core/search/*Adapter.ts`); no `import` of provider SDKs outside `core/models/` or `core/search/` |
| **B3** | Execution boundary | Tool invocations with declared input schemas | Unrestricted shell / filesystem / network access from agents | Every tool declares `permissions`; every invocation passes through `PolicyEngine.check()` before `execute()` |
| **B4** | Plugin boundary | Public Core API (`core/index.ts`) + MCP protocol | Direct access to Prisma, EventBus internals, agent state, file paths | Plugins run in separate process; talk only via MCP messages |
| **B5** | Persistence boundary | Validated domain objects | UI-mutated in-memory state | All writes go through a Repository; Repositories are the only Prisma client users |

### 1.3 System boundary rule [TARGET]

> **The MiMo system ends at the OS process.** Anything outside (filesystem beyond workspace, network, GPU, other apps) is **untrusted by default** and requires explicit per-action permission.

Reason: Bible Part 22 (Security). Local-first does not mean "trust everything on the machine." It means "the owner's data stays here, and everything that touches that data is gated."

### 1.4 [CURRENT] violation: boundaries are leaky

Per Audit §1.2, §2, §6.1:
- `/api/image` and `/api/search` import `z-ai-web-dev-sdk` directly — **B2 violation**.
- No `PolicyEngine` exists — any tool can do anything — **B3 violation**.
- No plugins exist — **B4 vacuous**.
- Prisma client (`lib/db.ts`) is importable from anywhere — **B5 unenforced**.

---

## 2. Module Boundaries

### 2.1 The four layers [TARGET — Bible Part 27.2]

```
┌─────────────────────────────────────────────────────────────────┐
│  L1 Presentation  (src/components/*, src/app/page.tsx)           │
│      React components, Zustand stores, hooks. No Core imports.   │
├─────────────────────────────────────────────────────────────────┤
│  L2 API Edge     (src/app/api/*)                                 │
│      Thin routes: validate input → call Core → shape response.    │
│      No business logic, no direct provider imports.              │
├─────────────────────────────────────────────────────────────────┤
│  L3 Core Domain  (src/core/*)                                    │
│      Pipeline, engines, registries, repositories, events.         │
│      No imports from L1 or L2.                                   │
├─────────────────────────────────────────────────────────────────┤
│  L4 Infrastructure (src/core/models/*Adapter.ts, lib/db.ts,      │
│      fs/, keychain/, sqlite)                                      │
│      Provider adapters, Prisma, OS APIs. No business rules.      │
└─────────────────────────────────────────────────────────────────┘
```

Dependency direction is **strictly downward**: L1 → L2 → L3 → L4. An upward import is a Constitution violation.

### 2.2 Module ownership matrix [TARGET]

Each Core module owns one concern. No module owns another's concern.

| Module | Owns | Does NOT own |
|---|---|---|
| `kernel/` | Boot sequence, feature flags, registry wiring | Business logic, persistence |
| `context/` | Assembling `ContextObject` from engines | Calling models, building prompts |
| `reasoner/` | Intent detection, complexity classification | Calling models (unless toggled, see §8) |
| `planner/` | Building `Plan` (steps + dependencies) | Executing plans |
| `orchestrator/` | Executing plans, agent spawning, sequencing | Building plans, validation |
| `validator/` | Final output gate (completeness, format, safety) | Producing output |
| `workflow/` | Pipeline orchestration (Context→Reason→Plan→Execute→Validate→Done) | Stage internals |
| `memory/` | Memory CRUD, recall scoring, decay | Knowledge graph, entities |
| `knowledge/` | Entity graph, relationships, consolidation, evolution | Memory items |
| `executive/` | Goals, priorities, user-model aggregation | Memory, knowledge (it consumes them) |
| `agents/` | Agent roles (Planner/Researcher/Builder/Reviewer/Verifier) | Pipeline sequencing |
| `tools/` | Tool definitions + execution | Policy enforcement |
| `policies/` *(new)* | Permission checks, sandbox modes, approval gates | Tool execution |
| `models/` | Provider adapters behind canonical interface | Prompting, validation |
| `search/` | Web-search adapter behind canonical interface | Result interpretation |
| `events/` | EventBus + event log persistence | Event semantics (those live in producers) |
| `registry/` | Tool/Agent/Model registries | What gets registered |
| `repositories/` *(new)* | All Prisma access | Business rules |
| `prompts/` | Prompt assembly (`ModelMessage[]`) | Calling the model |
| `artifacts/` *(new)* | Artifact storage, versioning, runtime sandbox | Conversation rendering |
| `logger/` / `errors.ts` / `types.ts` | Cross-cutting primitives | Business logic |

### 2.3 [CURRENT] deviation

Audit §1.2: `core/` exists but lacks `policies/`, `repositories/`, `artifacts/`, `executive/`, `knowledge/`. These will be added — see §11 migration plan.

---

## 3. Ownership Rules

### 3.1 Three ownership types [TARGET — Bible Part 3.2]

Every domain object has exactly one of three ownership types:

| Ownership | Who creates | Who mutates | Who deletes | Examples |
|---|---|---|---|---|
| **User-owned** | Owner via UI | Owner, or agent on owner's behalf with approval | Owner (with grace period) | Project, Conversation, Memory (explicit), Artifact, File |
| **System-owned** | Core engines | Core engines only | Core (or owner via explicit controls) | Task, Agent run, Context (per-turn), Knowledge Entity, Event |
| **Hybrid** | System creates, owner confirms or overrides | Either | Owner final | Auto-extracted Memory, Knowledge after consolidation |

Reason: Bible Part 3.2 specifies ownership in its table. Without explicit ownership, every object becomes "everyone's responsibility" → no one's.

### 3.2 Ownership invariants [TARGET]

1. **No object without an owner.** Every row in every table has an `owner` column (user / system / hybrid) plus a `createdBy` (which agent or user ID).
2. **No agent may delete user-owned objects without approval.** Even with "Always allow" trust, deletion of user-owned artifacts requires confirmation, OR must be reversible within 30 days.
3. **System-owned objects may be GC'd by the system** but only after they have no living references (e.g., a Task can be archived once its Conversation is archived).

---

## 4. Dependency Direction

### 4.1 Hard rule [TARGET]

> **Dependencies flow inward.** Presentation depends on API edge depends on Core depends on Infrastructure. Infrastructure depends on nothing in MiMo. Core depends on Infrastructure, never on API or Presentation.

### 4.2 Forbidden dependencies [TARGET]

| # | Forbidden | Reason |
|---|---|---|
| D1 | `components/**` importing from `core/**` (except via `core/index.ts` re-exported types) | Bible Part 27.3 rule 2; presentation must not couple to engine internals |
| D2 | `app/api/**` importing provider SDKs directly | Bible Part 25.3 + Audit §17 conflict #14; provider coupling |
| D3 | `core/**` importing from `app/` or `components/` | Bible Part 27.6; Core is a pure domain |
| D4 | `core/agents/**` importing `@prisma/client` directly | Repositories are the only Prisma users (§5.4) |
| D5 | `core/memory/**` importing `core/knowledge/**` directly | Memory feeds Knowledge via events, not direct calls — preserves the §3.1 ownership line |
| D6 | `core/**` importing `next/*` or `react/*` | Core must remain host-agnostic (Bible Part 26.7 evolution) |
| D7 | Circular imports anywhere in `core/` | EventBus exists precisely to break cycles |
| D8 | Any module importing `lib/nova/store.ts` from Core | UI store is downstream; Core has no business knowing UI state |

### 4.3 Permitted dependencies [TARGET]

- Any module → `core/types.ts`, `core/errors.ts`, `core/logger.ts`, `core/events/`.
- `core/agents/**` → `core/tools/**` (via registry, not direct).
- `core/orchestrator/**` → `core/agents/**` (via registry).
- API routes → `core/index.ts` (the public API surface).
- Repositories → `@prisma/client` (the ONLY consumer).

---

## 5. Data Ownership

### 5.1 Source-of-Truth rule [TARGET — Bible Invariants 1, 9, 18]

> **Every class of data has exactly one source of truth.** If a second copy exists, it is explicitly a cache and must be labeled `cache`, with a TTL or invalidation path.

### 5.2 Source-of-Truth map [TARGET]

| Data class | Source of truth | Caches (explicit) |
|---|---|---|
| Conversations / messages | SQLite via Prisma (`Conversation`, `Message`) | Zustand client mirror (UI render); 6s poll fallback |
| Memory | SQLite (`Memory` table) | In-memory recall index; UserModel aggregated cache |
| Knowledge entities | SQLite (`Entity`, `Relationship`) | In-memory graph (rebuilt on boot); UserModel cache |
| Artifacts | SQLite (metadata) + filesystem (content blobs) | ArtifactDock UI list; ArtifactViewer runtime state |
| Files (project-scoped) | Filesystem (canonical) + SQLite (metadata + path index) | UI file tree |
| Tasks | SQLite (`Task`, `ExecutionStep`) | EventBus transient state; ExecutionTrace UI |
| Agents (registry) | Code (registered at boot) — not persisted | None |
| Models (registry) | Code (registered at boot) + `Provider` table for credentials | None |
| Events | Append-only SQLite `Event` table (TARGET) | EventBus in-memory fan-out |
| Layout / workspace UI state | SQLite (`LayoutState`) | Zustand client store (write-through) |
| Audit log | Append-only SQLite `AuditLog` | DeveloperPanel UI |
| Permissions / policies | SQLite (`Policy`, `TrustLedger`) | In-memory PolicyEngine cache |

### 5.3 [CURRENT] violation: dual seed sources

Per Audit §2 issue #3 and §16 #16: `lib/nova/constants.ts` `INITIAL_MEMORIES` and `/api/mimo/workspace` both seed memories. **Two sources of truth.** Constitution forbids this.

### 5.4 Repository rule [TARGET]

> **The Prisma client is reachable only from `core/repositories/*`.** Every other module calls a Repository interface, not Prisma.

Reason: (1) lets us swap storage backends without touching business logic (Bible Part 26.7 — evolution); (2) lets us add encryption, audit hooks, and validation in one place (Bible Part 22.2, 22.9); (3) makes testing possible (Bible Part 27.10 — currently impossible because everything is in RAM).

### 5.5 Cache discipline [TARGET]

Every cache must declare:
- `source`: the source-of-truth it mirrors.
- `invalidation`: event-driven (subscribe to specific `EVENT.*`), TTL, or manual.
- `fallback`: what happens on miss (read-through, error, or empty).

A cache that cannot answer all three is not a cache — it is a second source of truth, and it is forbidden.

---

## 6. Event Ownership

### 6.1 Producers own semantics [TARGET — Bible Part 22.9]

> **The module that performs an action emits the event describing it.** Consumers never infer "X happened" by side-effect.

| Event (canonical) | Producer module | Why |
|---|---|---|
| `USER_MESSAGE_CREATED` | API route `/api/chat` (after persist) | The route is the only entry point for user input |
| `CONTEXT_RESOLVED` | `context/ContextBuilder` | It performs the assembly |
| `MEMORY_CREATED` / `MEMORY_UPDATED` / `MEMORY_DECAYED` | `memory/MemoryEngine` | It owns the lifecycle |
| `KNOWLEDGE_INDEXED` / `ENTITY_MERGED` / `EVOLUTION_DETECTED` | `knowledge/*` | It owns the graph |
| `TASK_CREATED` / `TASK_COMPLETED` / `TASK_FAILED` | `workflow/WorkflowEngine` | It owns task state |
| `PLAN_CREATED` / `PLAN_APPROVED` / `PLAN_REJECTED` | `planner/Planner` | It owns plans |
| `AGENT_STARTED` / `AGENT_COMPLETED` / `AGENT_FAILED` | `orchestrator/Orchestrator` (not the agent itself) | Orchestrator owns sequencing |
| `TOOL_CALLED` / `TOOL_RESULT_RECEIVED` / `TOOL_DENIED` | `policies/PolicyEngine` (after check) + `tools/*` (after exec) | Policy is the gate |
| `EXECUTION_PAUSED` / `EXECUTION_RESUMED` / `EXECUTION_ROLLED_BACK` | `orchestrator/Orchestrator` | It owns run state |
| `ARTIFACT_CREATED` / `ARTIFACT_UPDATED` / `ARTIFACT_VERSIONED` | `artifacts/*` | It owns artifact lifecycle |
| `VALIDATION_STARTED` / `VALIDATION_COMPLETED` | `validator/Validator` | It owns the gate |
| `USER_EDITED` (Windsurf-style trigger) | API route `/api/turn/edit` | Only UI knows |
| `PERMISSION_DENIED` | `policies/PolicyEngine` | It owns the gate |

### 6.2 [CURRENT] deviation

Audit §1.4 + `core/events/index.ts` shows the current `EVENT` constants are partial (`USER_INPUT`, `CONTEXT_BUILT`, `PLAN_CREATED`, `AGENT_STARTED`, `MEMORY_STORED`, `MEMORY_RECALLED`, `MODEL_INVOKED`, `RESPONSE_READY`, `ERROR_OCCURRED`, …). Naming is inconsistent (`user.input` vs `MEMORY_CREATED`). Constitution mandates the canonical names in §6.1 (UPPER_SNAKE) — see Event Architecture doc for the rename plan.

---

## 7. Security Boundaries

### 7.1 Threat model [FACT — Bible Part 22]

MiMo is single-user local-first. The threat model is NOT multi-tenant isolation. It is:

1. **Malicious plugin / MCP server** — gains code execution on the owner's machine.
2. **Compromised model output** — model emits instructions that trick the owner into authorizing a destructive action.
3. **Stale or excessive permissions** — owner grants "Always allow" then forgets; future tasks inherit over-broad trust.
4. **Data loss** — corruption, accidental delete, disk failure.
5. **Bystander access** — someone else reaches the dev server (only relevant while the system has no auth, which is acceptable for local-only — Audit §9.1).

### 7.2 Mandatory controls [TARGET — Bible Parts 22.4–22.9]

| Control | Mandatory? | Reason |
|---|---|---|
| Tool permission declarations | YES | Bible 22.4 — every tool must declare required permissions |
| Per-tool policy check before execution | YES | Bible 22.4 + Invariant 3 — no autonomous action without permission model |
| Per-agent scope (read-only / src/ / docs/ / full-workspace) | YES | Bible 22.6 |
| Per-task-type trust ledger | YES | Bible 8.7 — anti-approval-storm |
| Sandbox modes (read-only / workspace-write / danger) | YES | Bible 22.4 |
| Audit log (append-only) | YES | Bible 22.9 + Invariant — "every agent action logged" |
| Secrets in OS keychain | YES (TARGET) | Bible 22.3 — `.env` is dev-only |
| Encryption at rest (SQLCipher or equivalent) | YES (TARGET) | Bible 22.2 |
| Sandboxed code execution (Pyodide/WASM/CSP iframe; gVisor for system-level) | YES (TARGET for code artifacts) | Bible 22.8 + Part 11.4 |
| Network egress allowlist | YES (TARGET) | Bible 22.7 — agent network access requires approval |
| No telemetry | YES (mandatory invariant) | Bible 22.14 + Invariant 19 |

### 7.3 [CURRENT] state

Audit §9: NONE of the above exist. The PolicyEngine, trust ledger, sandbox, and audit log are all greenfield.

### 7.4 Trust boundary rule [TARGET]

> **An agent never executes a tool directly.** Every tool invocation goes through `PolicyEngine.authorize(agent, tool, input) → Decision`. The Decision is one of: `allow`, `allow_with_audit`, `require_approval`, `deny`. The Decision is logged before the tool executes.

Reason: Bible Invariant 3 ("No autonomous action without permission model"). Without this seam, there is no place to enforce sandbox modes or the trust ledger.

---

## 8. AI Boundaries

### 8.1 The provider-agnostic rule [TARGET — Bible Invariant 16 + Part 7.14]

> **The Core depends on a `Model` interface, never on a provider SDK.** Every provider (ZAI, Anthropic, OpenAI, Ollama, local) implements the interface behind `core/models/*Adapter.ts`. Provider-specific quirks (tool-calling shape, streaming protocol, system-prompt placement) are absorbed by the adapter, never leaked into Core.

### 8.2 [CURRENT] violation + MIGRATION

Audit §4.1: `/api/image` and `/api/search` import `z-ai-web-dev-sdk` directly. Migration: route them through `core/capabilities/image` and the existing `core/search/SearchProvider`. This is a Constitution violation that must be fixed before any further provider work.

### 8.3 Model routing boundary [TARGET — Bible Part 7.1]

Routing decisions live in `orchestrator/Orchestrator` (or a `ModelRouter` it calls). They consume task type + project settings + per-query override, and return a `ModelHandle`. No other module picks models.

### 8.4 Reasoner boundary [TARGET — Bible Part 7.4]

The Reasoner may be **rule-based or model-based** (Bible Part 7.4 toggle). When model-based, the model call goes through the same `Model` interface — the Reasoner does not import any SDK.

### 8.5 Hallucination boundary [TARGET — Bible Part 27.16 + Invariant 7]

> **No AI output that uses external knowledge may exit the Validator without a citation set.** Speculative content must be flagged with `/* check-token */` (Primer pattern). The Validator enforces this; if it cannot, the output is rejected (`VALIDATION_FAILED`).

### 8.6 No "the AI handles this" [RULE — enforced across all five ARCH-A docs]

If any document says "the AI handles X," the author must specify: **which service** invokes the model, **which data** is passed, **which event** signals success, **which policy** gates it, **which model** is routed, **which tool** executes the side-effect, **which state** changes, and **which failure path** recovers. If any of these is missing, the claim is `[UNKNOWN]` and must be marked as such. Constitution forbids magic.

---

## 9. Plugin Boundaries

### 9.1 Plugins are external [TARGET — Bible Part 25.8]

> **Plugins (MCP servers, custom tools, custom agents) run in a separate process.** They never share MiMo's address space. They communicate via the MCP protocol (or a future MiMo-native RPC). They cannot import MiMo internals.

### 9.2 Plugin capability surface [TARGET — Bible Part 25.3]

A plugin may:
- Register tools and agents (via the registry, through the MCP bridge).
- Invoke the public Core API surface (`core/index.ts` exports).
- Read/write files **only within an assigned workspace path**.
- Make network calls **only with prior owner approval** (recorded in the trust ledger).

A plugin may NOT:
- Import Prisma, EventBus, repositories, or engines.
- Spawn subprocesses outside its sandbox.
- Access the keychain.
- Modify Conversation or Memory directly — only via the public API.

### 9.3 [CURRENT] state

No plugins exist (Audit §6.2). The MCP bridge is greenfield. Constitution mandates that the bridge land **before** any plugin work, not after.

---

## 10. Runtime Boundaries

### 10.1 Process model [TARGET]

MiMo runs as one Next.js process (v1). Two runtimes coexist in that process:

| Runtime | What lives here | Lifetime | Failure isolation |
|---|---|---|---|
| **Request runtime** | `/api/*` handlers | Per HTTP request | Next.js default: errors → 500, no cross-request damage |
| **Kernel runtime** | `mimoKernel.boot()` — registries, in-memory engines, event bus | App lifetime (singleton) | Engine errors caught + logged; cannot crash the kernel |

### 10.2 Background runtime [TARGET — Bible Part 8.9 + 26.11]

Long-running agent work and daemon tasks (v2) require a **background runtime** that survives request boundaries. v1 implementation: a single in-process scheduler with a persisted task queue (SQLite `Task` table). v2 implementation (deferred): a daemon process.

Constitution rule: the request runtime MUST NEVER block on the background runtime. Status flows via events; the UI polls or subscribes.

### 10.3 [CURRENT] state

Audit §6.2: no background runtime, no queue, no workers. Long-running tasks are not possible today.

### 10.4 Execution sandbox [TARGET — Bible Part 11.4 + 22.8]

For artifacts that execute code (Python, React, HTML):
- **Python:** Pyodide/WASM in a Web Worker (in-browser) — owner's data never leaves the process.
- **React/HTML:** CSP-locked iframe with `sandbox` attribute, no same-origin access.
- **System-level code execution** (shell, filesystem writes outside artifacts): gVisor-style sandbox (Bible Part 11.4) — DEFERRED to a later milestone; v1 ships only in-browser runtimes.

Constitution forbids unsandboxed code execution anywhere.

---

## 11. UI Boundaries

### 11.1 Presentation owns no business logic [TARGET — Bible Part 27.3 + Invariant 26]

> **No React component may contain business logic.** Components render state and dispatch intents. State derivation, validation, persistence, and orchestration happen in Core (via API routes).

### 11.2 Single-route rule [TARGET — Bible Invariant 15 + Part 27.3 rule 1]

> **`src/app/page.tsx` is the only route.** Everything else is a tab, panel, overlay, or API handler. No `<Link>` to other routes.

### 11.3 State-store rule [TARGET — Bible Part 27.5]

Client state lives in Zustand. Server state lives behind API routes. The Zustand store is a **cache + intent dispatcher**, never a source of truth (see §5.1).

The Audit found one monolithic 354-line store (`lib/nova/store.ts`). Constitution mandates a split:

| Store | Owns | Does NOT own |
|---|---|---|
| `uiStore` | Theme, view, palette, voice, imageGen, settings modal | Conversations, memory, tasks |
| `conversationStore` | Conversations, messages, input, streaming state | Workspace layout |
| `workspaceStore` | Tabs, active tab, project chip, mode, dev mode, sidebar open | Conversation content |
| `modeStore` | Current prompt mode, deepThink, webSearch toggles | Conversations |

### 11.4 [CURRENT] violation

Audit §5.2 + §16 #6: monolithic store. Migration: split incrementally, keeping the old store as a façade during transition (Audit §16 #3 risk acknowledges this).

### 11.5 No mock data [TARGET — Bible Invariant 18 + Audit §16 #16]

> **UI never ships mock data.** If a Core API is not ready, the UI shows an empty/loading state — never fabricated content.

The Audit found `INITIAL_MEMORIES` in `lib/nova/constants.ts`. This is mock data. Constitution forbids it. Migration: remove and replace with `useQuery` against `/api/mimo/workspace`.

---

## 12. Persistence Boundaries

### 12.1 What persists where [TARGET — full map in `MiMo_Data_Architecture.md`]

- **SQLite via Prisma:** conversations, messages, memory, knowledge, tasks, executions, artifacts metadata, files metadata, layout, audit log, events, policies, trust ledger.
- **Filesystem:** artifact content blobs, project-scoped files, backups.
- **Append-only event log:** SQLite `Event` table (not a separate log file).
- **Keychain (OS):** provider API keys, encryption keys.
- **In-memory only:** registries (rebuilt on boot), EventBus fan-out, ContextObject (per-turn), PolicyEngine cache, UserModel cache.

### 12.2 Write path [TARGET]

```
Component → API route → Core service → Repository → Prisma → SQLite
                                            ↓
                                       EventBus.emit (post-commit)
                                            ↓
                                       Audit log (async, durable)
```

Constitution rule: **events are emitted after the write commits, never before.** An event describing a state change that did not happen is a lie (Bible Invariant 8 — no silent failures extends to "no false events").

### 12.3 [CURRENT] violation

Audit §3.1: Prisma schema is demo boilerplate (`User` + `Post`). No domain models persist. MemoryEngine is in RAM. Constitution mandates the full domain schema — see `MiMo_Domain_Model.md` and `MiMo_Data_Architecture.md`.

### 12.4 Migration rule [TARGET — Bible Invariant 10]

> **No deprecations mid-redesign.** When a schema changes, the old shape and the new shape coexist during migration. A migration that loses data without a 30-day grace path is forbidden (Bible 22.11).

---

## 13. Forbidden Architecture Patterns

These are forbidden. Each has a reason. Each maps to a Bible Invariant or Audit conflict.

| # | Forbidden pattern | Reason | Bible reference |
|---|---|---|---|
| F1 | **UI owning persistent business logic.** A React component writing to Prisma, calling a model directly, or computing domain state. | Violates §11.1; presentation must not own domain | Part 27.3 rule 2; Invariant 16 |
| F2 | **Random modules accessing the DB.** Any module other than `core/repositories/*` importing `@prisma/client`. | One storage seam; lets us add encryption, audit, validation in one place | Part 22.2, 22.9; this Constitution §5.4 |
| F3 | **Provider-specific AI logic leaking into product logic.** ZAI/OpenAI/Anthropic payload shapes appearing in `core/agents/**`, `core/planner/**`, etc. | Provider lock-in kills 10-year evolution | Part 7.14; Invariant 16; this Constitution §8.1 |
| F4 | **Agents bypassing permissions.** An agent calling `tool.execute()` without `PolicyEngine.authorize()`. | Bible's entire security model collapses | Part 22.4–22.7; Invariant 3; this Constitution §7.4 |
| F5 | **Memory written without provenance.** Any `Memory` row with null `source`, `createdAt`, `type`, or `confidence`. | Bible's anti-false-memory invariant | Part 5.4; Invariant 4 |
| F6 | **Tools executing without policy checks.** | Same as F4 | Part 22.4; Invariant 3 |
| F7 | **Duplicated sources of truth.** Two tables, two stores, or a store + a table holding the "real" version of the same data without explicit cache labeling. | Inconsistency is inevitable; debugging is impossible | Invariant 1, 9, 18; this Constitution §5.1 |
| F8 | **Hidden global mutable state.** A module-level `let` or singleton that is mutated by multiple callers without an event or guard. | Concurrency bugs, unobservable state, untestable code | Part 24.2 (no silent failures, extended to state); Part 27.17 |
| F9 | **Business logic in presentation components.** A component computing validation, deduplication, ranking, or routing. | Same as F1 | Part 27.3 rule 2; Invariant 16 |
| F10 | **Bypass of the Core pipeline.** Any `/api/*` route that calls a model, tool, or agent without going through `buildContext → runWorkflow → return validation.sanitisedAnswer`. | Bible's defining invariant | Part 25.3; Invariant 16; Audit §17 #14 |
| F11 | **`any` types in production code.** | Type safety bypass | Part 27.17; Invariant 26 |
| F12 | **`console.log` in production code.** | Use Core logger | Part 27.17; Invariant 27 |
| F13 | **Mock data in shipped UI.** | Owner trusts the system; mocks violate that | Invariant 18 |
| F14 | **Provider SDK imported in client components.** | Keys leak; bundle bloats | Part 27.1; Invariant 17 |
| F15 | **A second source-of-truth created without explicit `cache` labeling + invalidation.** | Implicit duplication rots | This Constitution §5.5 |
| F16 | **An event emitted before its write commits.** | Lies corrupt audit + consumers | This Constitution §12.2 |
| F17 | **Long-running synchronous work in the request runtime.** | Blocks all other requests; Bible perf targets fail | Part 20.2; this Constitution §10.2 |
| F18 | **A new model introduced for a dimension that already has one.** ("One model per dimension") | Cognitive overload | Invariant 1, 35 |
| F19 | **A new marketplace / public plugin registry without Bible Part 25.12 safeguards.** | Security risk | Part 25.12 |
| F20 | **Telemetry, analytics, error reporting without opt-in.** | Privacy | Invariant 19; Part 22.14 |
| F21 | **Cron-style background tasks without a persisted queue + audit log.** | Unobservable, unrecoverable | Part 22.9; this Constitution §10.2 |
| F22 | **A schema migration that drops a column without a 30-day grace path.** | Data loss | Part 22.11; Invariant 10 |
| F23 | **A modal blocking the main editor region for errors.** | UX invariant | Part 24.9; Invariant 24 |
| F24 | **A spinner for AI work.** | Bible's defining motion rule | Part 10.3; Invariant 23 |
| F25 | **Per-instance approval prompts.** | Approval fatigue | Part 8.7; Invariant 22 |

---

## 14. Migration Plan: CURRENT → TARGET

The Constitution is a target. The Audit shows where we start. Migration is sequenced to **never break the working chat pipeline** (Audit §1.4 — the only thing that works end-to-end today).

### 14.1 Phase ordering [MIGRATION]

| Phase | Goal | Constitution rules activated |
|---|---|---|
| **M0 — Stabilize** | Fix dev server (Audit §1.5). Re-enable TS strict + lint. Remove dead code (Audit §15). | F8, F11, F12 |
| **M1 — Adapters** | Route `/api/image` + `/api/search` through Core adapters. Delete direct ZAI imports outside `core/models/`, `core/search/`. | F3, F10, F14 |
| **M2 — Domain schema** | Replace Prisma demo schema with full domain model (`MiMo_Domain_Model.md`). Add `core/repositories/*`. | F2, F7, F15 |
| **M3 — Persistence for Memory** | MemoryEngine → Prisma-backed. Add `MemoryRepository`. | F2, F7, F13 (remove `INITIAL_MEMORIES`) |
| **M4 — Event log + audit** | EventBus persists events; audit log table. | F16 |
| **M5 — PolicyEngine** | Tool permission checks, sandbox modes, trust ledger. | F4, F6 |
| **M6 — Knowledge layer** | Entities, relationships, consolidation engine. | F2 (knowledge has its own repos) |
| **M7 — State store split** | Monolithic Zustand → four stores. | F9, F15 |
| **M8 — Artifact runtime** | Pyodide + CSP iframe. | F17 (sandboxed execution) |
| **M9 — Streaming + ExecutionTrace** | Real model streaming; ExecutionTrace wired to events. | F24 |
| **M10 — Background tasks + daemon (v2 prep)** | Persisted task queue; in-process scheduler. | F17, F21 |

Each phase has a Constitution rule it activates. Phases may overlap (M2 + M3 in parallel, for example), but **no phase may skip M1** — adapter isolation is the foundation everything else rests on.

### 14.2 Migration non-goals [MIGRATION]

- Do NOT introduce Kubernetes, message brokers (Kafka/RabbitMQ), microservices, or distributed state. MiMo is single-process single-user. Adding such infra violates "do not invent complexity."
- Do NOT introduce a separate search server (Elasticsearch, Meilisearch) in v1. SQLite FTS5 is sufficient for single-user scale (Audit Part 26.1).
- Do NOT introduce a separate vector DB (Pinecone, Weaviate) in v1. SQLite-vec or in-process HNSW is sufficient (see Data Architecture).
- Do NOT introduce a separate graph DB (Neo4j) in v1. SQLite tables + in-memory graph are sufficient (Bible Part 6.5 — "in-memory entity + relationship store").
- Do NOT introduce OAuth / multi-user auth. Single-user, local-first (Audit §9.1).

### 14.3 Migration unknowns [UNKNOWN]

- Whether gVisor-style sandboxing is feasible on all target platforms (macOS, Linux, Windows) without containerization. **Open question.** v1 ships in-browser runtimes only; gVisor deferred.
- Whether SQLCipher is the right encryption layer vs. app-level encryption of sensitive columns. **Open question.** Deferred to M2 schema design.
- Whether the in-process scheduler (v1) can survive a Next.js hot reload. **Open question.** Likely needs the kernel runtime to detach from the request runtime cleanly.

---

## 15. Constitutional Review Gate

Every PR that touches `src/core/`, `src/app/api/`, `prisma/schema.prisma`, or `next.config.ts` must answer:

1. Does it create a new source of truth? (If yes, name the cache + invalidation.)
2. Does it bypass the Core pipeline? (If yes, stop.)
3. Does it import a provider SDK outside an adapter? (If yes, stop.)
4. Does it add an `any` type, a `console.log`, or mock data? (If yes, stop.)
5. Does it emit events before write commit? (If yes, stop.)
6. Does it add a new dimension with a competing model? (If yes, stop.)
7. Does it add infrastructure that solves a problem not present today? (If yes, justify or defer.)
8. Does it touch a forbidden pattern in §13? (If yes, stop.)

A "no" to all eight is required to merge. This is the Constitution's enforcement mechanism.

---

## 16. Summary

The MiMo System Constitution translates the Product Bible's product invariants into architectural constraints. Its core moves:

- **Five trust boundaries** (process, provider, execution, plugin, persistence), each enforced at a seam.
- **Four-layer dependency direction** (Presentation → API → Core → Infrastructure), strictly inward.
- **One source of truth per data class**, with caches explicitly labeled.
- **Repositories as the only Prisma consumers**, adapters as the only provider-SDK consumers, PolicyEngine as the only permission gate.
- **25 forbidden patterns**, each with a Bible citation and a reason.
- **Migration sequenced in 11 phases**, M1 (adapters) before all else, never breaking the working chat pipeline.

This document is the rules. The four sibling docs (`MiMo_Domain_Model.md`, `MiMo_Data_Architecture.md`, `MiMo_Event_Architecture.md`, `MiMo_API_Architecture.md`) are the elaboration. Code is the implementation.

**End of Constitution.**
