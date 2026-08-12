# MiMo — Plugin Architecture

**Task ID:** ARCH-C / Doc 6 of 7
**Phase:** Foundation From The Ground Up
**Status:** ARCHITECTURE (no implementation). Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible Part 25 (Plugin/API Architecture), Part 22.4 (Tool Permissions), Part 8.6 (Agent Permissions). Current System Audit §4.3 (3 tools registered via idempotent ToolRegistry), §13 (reusable assets — `registry/`), §17 conflict 14 (`/api/image` + `/api/search` bypass Core).
**Scope:** Plugin identity, manifest, permissions, sandbox, APIs, lifecycle, versioning, trust model, installation, removal, updates. **Hard constraint:** plugins must not become unrestricted code with access to the entire user's life data.

> **Architectural rule.** A plugin is NOT a code blob that runs with MiMo's privileges. A plugin is a **declared capability surface** — a manifest of tools, agents, slash blocks, hooks — that runs in its own process, with declared permissions, behind the RuntimeGateway, and is invoked through MiMo's public capability API. Bible Part 25.3 (API Model Invariant) + Part 25.8 (Sandboxing) are authoritative.

---

## 1. Why plugins exist

Bible Part 25.1: MCP integration (Tana + GitHub + Claude Code + Amie + Superhuman pattern). Custom tools, custom agents, `@`-mention invocation. Bible Part 25.9: slash blocks as plugins. Bible Part 25.10: hooks as plugins.

The owner's life is bigger than what MiMo ships with. Plugins extend MiMo without MiMo absorbing every integration into core. But plugins run on the owner's machine, against the owner's data — so the threat surface (Security Arch ADV3) is real.

**Constraint (Bible Part 25.8):** "Extensions run locally (no remote code execution). MCP servers run in separate process. No access to MiMo internals (only via public API)."

---

## 2. Plugin identity + manifest

### 2.1 Plugin identity

```ts
type PluginId = string;   // format: "plg_<ulid>"
type PluginRef = {
  id: PluginId;
  name: string;            // human-readable, unique within owner's registry
  version: string;          // semver
  source: PluginSource;
};
type PluginSource =
  | { kind: 'mcp'; transport: 'stdio' | 'http' | 'sse'; endpoint: string }
  | { kind: 'local-module'; path: string }     // owner-authored Node module on disk
  | { kind: 'slash-block'; definition: SlashBlockDefinition }
  | { kind: 'hook'; definition: HookDefinition };
```

A plugin is **identified by its `PluginId`**, not by name (names can be renamed; IDs cannot). A plugin has a `source` indicating how it is materialized on the owner's machine.

### 2.2 Manifest

Every plugin declares a manifest. The manifest is the contract between the plugin and MiMo:

```ts
type PluginManifest = {
  id: PluginId;
  name: string;
  version: string;            // semver
  description: string;
  author: string;             // for personal registry — owner or trusted publisher
  homepage?: string;
  minMiMoVersion: string;     // semver — forward compatibility (Bible Part 25.7)
  maxMiMoVersion?: string;
  permissions: PluginPermissionDeclaration;
  capabilities: PluginCapability[];
  config?: ConfigSchema;      // JSON-schema for owner-configurable settings
  audit: { emitEvents: boolean };   // always true; this is just a declaration
};
```

### 2.3 Capabilities

A plugin declares one or more capabilities — each is a typed surface MiMo knows how to invoke:

```ts
type PluginCapability =
  | { kind: 'tool'; tool: ToolDeclaration }       // Part 25.2
  | { kind: 'agent'; agent: AgentDeclaration }     // Part 8
  | { kind: 'slash-block'; block: SlashBlockDeclaration }   // Part 25.9
  | { kind: 'hook'; hook: HookDeclaration };       // Part 25.10
```

**Invariant P-1.** A plugin cannot declare a capability outside this list. There are exactly 4 capability kinds. No 5th kind without a Bible amendment. (Bible Invariant 25 — vocabulary lock.)

### 2.4 Example manifest (MCP server exposing a "github-issue" tool)

```json
{
  "id": "plg_01J...",
  "name": "github-issues",
  "version": "1.2.0",
  "description": "Search and create GitHub issues from MiMo.",
  "author": "owner",
  "minMiMoVersion": "1.0.0",
  "permissions": {
    "fs": "none",
    "net": { "mode": "allowlist", "hosts": ["api.github.com"] },
    "secrets": ["github_token"]
  },
  "capabilities": [
    {
      "kind": "tool",
      "tool": {
        "id": "github_search_issues",
        "name": "GitHub Search Issues",
        "category": "research",
        "inputSchema": { "type": "object", "properties": { "q": { "type": "string" } }, "required": ["q"] },
        "outputSchema": { "type": "object", "properties": { "issues": { "type": "array" } } },
        "permissions": { "sandbox": "read-only", "approvalPolicy": "on-request" }
      }
    }
  ],
  "audit": { "emitEvents": true }
}
```

---

## 3. Permissions + sandbox

### 3.1 Permission declaration

```ts
type PluginPermissionDeclaration = {
  fs: 'none' | 'read-project' | 'write-project' | 'read-host';
  net: { mode: 'none' | 'allowlist'; hosts: string[] };
  spawn: 'none' | 'in-sandbox';
  secrets: string[];   // names of keychain entries this plugin may read (must be owner-approved)
  display: 'none' | 'screenshot';
};
```

These mirror Runtime Arch §5.1 (PermissionBag). **A plugin's runtime calls go through the RuntimeGateway with the plugin's declared permission bag.** No bypass path.

### 3.2 Sandbox (Bible Part 25.8)

- **MCP servers** run as separate OS processes (child processes spawned by MiMo, sandboxed via the OS seatbelt — Runtime Arch §3.5).
- **Local modules** run in a Node `worker_threads` sandbox (separate event loop; no shared globals; communicate via `postMessage`).
- **Slash blocks + hooks** run in-process but only via the public Core API; they cannot import MiMo internals.

**Invariant P-2.** No plugin code, in any form, gets:
- Direct SQLite access.
- Direct keychain access (only via `SecretStore.get(name)` for declared `secrets`).
- Direct conversation-stream access.
- Direct access to Core engines (kernel, context, reasoner, planner, orchestrator, validator).

A plugin sees only: (a) its declared tool/agent inputs, (b) the result it returns, (c) approved secret values it declared.

### 3.3 Approval on install (Bible Part 25.6)

On install, the manifest's permission declaration is shown to the owner:
```
"github-issues" wants to:
  • Make network requests to: api.github.com
  • Read the secret "github_token" from your keychain
[ Approve ]  [ Deny ]  [ Approve for this project only ]
```

Owner approves globally or per-project. Deny cancels install.

### 3.4 Per-invocation approval (Bible Part 8.7)

Each tool invocation goes through the trust ledger (Security Arch §4.5):
- First invocation: `untrusted` → prompt.
- After 3 approvals for (project, taskType): auto-approve offer.
- Once trusted: `never` policy; invocations are audited but not blocking.

---

## 4. APIs

### 4.1 Public capability API (Bible Part 25.3)

The plugin sees ONE API surface, mirrored from Core's public API. It does NOT see Core internals.

```ts
interface MiMoPluginContext {
  // Identity
  pluginId: string;
  projectId: string;

  // Approved secrets (only declared ones)
  secrets: { get(name: string): Promise<string | null> };

  // Logging + audit (always emitted; cannot be silenced)
  log: { info(msg: string, data?: unknown): void; warn(...); error(...); };
  audit: { emit(event: string, detail?: unknown): void };

  // Owner notifications (non-blocking)
  notify: { info(msg: string): void; warn(msg: string): void; error(msg: string): void };

  // Network (only declared hosts)
  fetch: (url: string, init?: RequestInit) => Promise<Response>;
}
```

**What is NOT exposed:**
- DB queries. The plugin returns data via tool output; MiMo stores it.
- Filesystem outside declared `fs` scope.
- Other plugins' data.
- Conversation history.
- Memory / knowledge internals.

### 4.2 Slash blocks (Bible Part 25.9)

A slash block is a user-facing plugin primitive:

```ts
type SlashBlockDeclaration = {
  trigger: string;          // e.g., "summarize"
  title: string;
  inputSchema: JSONSchema;  // structured input from the slash UI
  outputKind: 'markdown' | 'diagram' | 'code' | 'image';
  reRunOnChange: boolean;   // Bible Part 25.9 — "re-runs on input change"
  handler: (input: unknown, ctx: MiMoPluginContext) => Promise<BlockOutput>;
};
```

Built-in slash blocks (Bible Part 25.9): `/summarize`, `/translate`, `/diagram`, `/plan`. These ship with MiMo (not plugins). Custom slash blocks are owner-defined via plugins.

### 4.3 Hooks (Bible Part 25.10)

A hook is an after-edit action:

```ts
type HookDeclaration = {
  trigger: 'after-file-write' | 'after-artifact-version' | 'after-message-send' | 'pre-execution';
  scope: 'project' | 'global';
  match?: { projectPattern?: string; artifactType?: string };
  handler: (event: HookEvent, ctx: MiMoPluginContext) => Promise<HookResult>;
};
```

Built-in hooks (Bible Part 25.10): auto-run tests, auto-format, auto-lint (configurable per-project). Custom hooks are owner-defined via plugins.

A hook CANNOT block the triggering action (Bible Part 24.9 — no modal blocks). It runs after the fact; its result is surfaced inline as a follow-up (Bible Part 8.9).

### 4.4 MCP integration (Bible Part 25.1)

- MiMo is an MCP **client**. Plugins may be MCP servers (separate processes MiMo connects to).
- Transport: stdio (preferred for local), HTTP, SSE.
- MCP servers expose tools via the standard MCP protocol; MiMo translates these to `ToolDeclaration`s and registers them via the ToolRegistry.

---

## 5. Lifecycle (Bible Part 25.5)

### 5.1 Lifecycle stages

```
discovered → manifest-fetched → approved → installed → registered → invoked → disabled → uninstalled
                                              ↑                          ↓
                                           re-enabled ← disabled
```

### 5.2 Install

1. **Discover:** owner provides a source (MCP URL, local path, slash-block definition).
2. **Fetch manifest:** MiMo reads `PluginManifest`. Validates schema. If MCP server, MiMo spawns it and queries its `manifest` capability.
3. **Review + approve:** Owner reviews permission declaration (§3.3).
4. **Install:** MiMo writes `Plugin` row to DB (encrypted). Spawns MCP server (if applicable) and verifies it boots.
5. **Register:** ToolRegistry / AgentRegistry / SlashBlockRegistry registers declared capabilities (idempotent — Bible Part 25.3).

### 5.3 Invoke

- Via `@plugin-name` mention in chat (Bible Part 25.1 — GitHub pattern).
- Via agent (the orchestrator picks a plugin-declared tool — Bible Part 7.8 tool selection).
- Via slash block in composer (Bible Part 25.9).
- Via hook trigger (automatic — Bible Part 25.10).

Every invocation:
- Goes through RuntimeGateway with the plugin's permission bag.
- Is logged in the audit log (Bible Part 22.9).

### 5.4 Observe

- DeveloperPanel → Plugins tab: list, status (running/stopped/errored), last-invocation, audit log.
- Every invocation visible.

### 5.5 Disable

- Per-project or global.
- Disabling revokes the plugin's capabilities from registries (idempotent).
- MCP server process is killed.
- The plugin's row in DB is marked `disabled` (not deleted — Bible Invariant 5).

### 5.6 Uninstall

- Disable first (graceful).
- Remove from registry.
- Delete the `Plugin` row (after 30-day grace — Bible Part 22.11).
- Remove the plugin's stored config (in DB).
- Revoke keychain access for declared secrets.
- Audit event: `plugin.uninstalled`.

**Invariant P-3.** Uninstall does NOT delete artifacts / memory / knowledge produced by the plugin's prior invocations. Those belong to the owner, not the plugin. (Bible Invariant 5.)

---

## 6. Versioning + compatibility (Bible Part 25.7)

### 6.1 Three version axes

1. **MCP protocol version** — MCP standard itself; MiMo supports a min + max range.
2. **Plugin version** — semver, declared in manifest.
3. **MiMo version** — the plugin declares `minMiMoVersion` + optional `maxMiMoVersion`.

### 6.2 Compatibility rules

- **Backward-compatible:** old plugins work with new MiMo (Bible Part 25.7). MiMo's public capability API follows semver — breaking changes require a new major version of MiMo AND a migration path.
- **Forward-compatible:** new plugins declare `minMiMoVersion`. MiMo rejects install if its version is below.
- **No deprecations mid-redesign** (Bible Invariant 10): if a capability API changes, the old one stays live during transition.

### 6.3 Updates

- Owner triggers update (no auto-update without opt-in — Bible Part 22.14 no telemetry).
- Update flow: fetch new manifest → diff permissions → if permissions expanded, re-prompt owner → install.
- Update preserves plugin config + audit history.

---

## 7. Trust model + personal registry (Bible Part 25.11)

### 7.1 Personal registry, no marketplace

Bible Part 25.11 explicit: "No public marketplace. The owner's extensions are personal."

[TARGET] MiMo ships with NO plugin marketplace. Plugins come from:
- The owner's own local modules.
- MCP servers the owner explicitly installs (via URL or path).
- Built-in slash blocks + hooks (shipped with MiMo).

This avoids the Obsidian anti-pattern (Bible Part 25.11 footnote) of plugin-marketplace fragmentation.

### 7.2 Future marketplace (Bible Part 25.12, v2+)

If MiMo adds a marketplace in the future:
- Curated (not open flood).
- Reviewed (security + quality).
- Signed (verified publisher).
- Permissions explicit (no implicit grant).

Out of scope for v1. Architecture must not preclude it; architecture must not assume it.

### 7.3 Trust ledger integration

Plugin invocations are subject to the same trust ledger as built-in tools (Security Arch §4.5). A plugin is a tool/agent/slash-block source; the ledger tracks `(projectId, taskType, scope)` triples, not `(projectId, pluginId, taskType)`. This means a plugin's tool "run-tests" shares trust with MiMo's built-in "run-tests" tool. [PRODUCT DECISION — keeps the trust model simple; the owner trusts task types, not vendors.]

If the owner wants to distrust a specific plugin: they disable or uninstall it (§5.5 / §5.6).

---

## 8. Foundation on existing ToolRegistry + AgentRegistry

[CURRENT] Audit §4.3 + §13 confirm: `ToolRegistry` and `AgentRegistry` exist (`src/core/registry/`) and support idempotent registration. Three tools registered: WebSearch, MemoryRecall, MemoryStore. Four agents registered: Planner, Researcher, Memory, Writer.

[TARGET] Plugins extend these registries, not bypass them.

### 8.1 What the existing registries provide

- Idempotent `register(tool)` (Bible Part 25.2 — "Lookups never throw on miss — return undefined").
- Typed `Tool` and `Agent` interfaces.
- Lookup by id / by category.

### 8.2 What plugins add

- A `PluginManifest` layer on top of `Tool` / `Agent`.
- A separate process / worker_threads sandbox for plugin code.
- An approval gate (Bible Part 25.6).
- Audit events on every invocation.
- Per-plugin config + secret access.

### 8.3 Migration path

The existing `WebSearchTool`, `MemoryRecallTool`, `MemoryStoreTool` are **NOT plugins**. They are built-in tools registered at kernel boot. Plugins live alongside them in the same ToolRegistry but with the additional metadata:

```ts
type ToolRegistration = {
  tool: Tool;
  source: 'builtin' | 'plugin';
  pluginId?: string;        // if source === 'plugin'
  manifest?: PluginManifest;
};
```

The ToolRegistry lookup API stays the same: `registry.get(toolId)`. Callers do not need to know if a tool is built-in or from a plugin.

---

## 9. Slash blocks + hooks as first-class plugins

### 9.1 Slash block registry

```ts
interface SlashBlockRegistry {
  register(block: SlashBlockDeclaration, source: 'builtin' | 'plugin', pluginId?: string): void;
  get(trigger: string): SlashBlockDeclaration | undefined;
  list(): SlashBlockDeclaration[];
  unregister(pluginId: string): void;   // remove all blocks from this plugin
}
```

### 9.2 Hook registry

```ts
interface HookRegistry {
  register(hook: HookDeclaration, source: 'builtin' | 'plugin', pluginId?: string): void;
  listByTrigger(trigger: HookTrigger, projectId: string): HookDeclaration[];
  unregister(pluginId: string): void;
}
```

Hooks fire on the trigger event; their handlers run asynchronously; results surface inline (Bible Part 8.9).

---

## 10. [CURRENT] vs [TARGET] vs [MIGRATION]

### 10.1 [CURRENT]

[FACT — Audit §4.3, §9.2, §13]:
- `ToolRegistry` + `AgentRegistry` exist and support idempotent registration.
- 3 tools registered: WebSearch (no permission gate — Audit §9.2), MemoryRecall, MemoryStore.
- 4 agents registered (Planner, Researcher, Memory, Writer) — no per-agent scope.
- No plugin system. No PluginManifest. No MCP client. No slash-block registry. No hook registry.
- No sandbox for tool execution.

### 10.2 [TARGET]

- Plugins as first-class objects with manifests.
- 4 capability kinds: tool, agent, slash-block, hook.
- MCP client integration (stdio / HTTP / SSE).
- Per-plugin permission declaration + approval gate.
- RuntimeGateway enforces permission bag for all plugin invocations.
- Personal registry (no marketplace).
- Audit trail for every plugin invocation.
- Versioning (MCP protocol + plugin semver + MiMo version).
- Disable + uninstall with grace + audit.

### 10.3 [MIGRATION]

| Phase | What | Depends on |
|---|---|---|
| P1 | Define `PluginManifest`, `PluginCapability`, `PluginPermissionDeclaration` types. | — |
| P2 | Extend `ToolRegistration` with `source` + `pluginId` + `manifest`. ToolRegistry lookup unchanged. | P1 |
| P3 | Add `SlashBlockRegistry` + `HookRegistry`. | P1 |
| P4 | Add `MiMoPluginContext` API (the public capability surface). | P1 |
| P5 | Add MCP client (connect to stdio / HTTP / SSE MCP servers; query manifest; map tools to ToolRegistration). | P4 |
| P6 | Add approval gate on plugin install + per-invocation (trust ledger integration). | Security Arch SEC-6 |
| P7 | Wire plugin invocations through RuntimeGateway. | Runtime Arch M4 |
| P8 | Add DeveloperPanel → Plugins tab (list, status, audit). | Observability |
| P9 | Add disable + uninstall flows with 30-day grace. | P2 |
| P10 | Add plugin update flow (re-prompt on permission expansion). | P9 |
| P11 | Built-in slash blocks (`/summarize`, `/translate`, `/diagram`, `/plan`) registered as `source: 'builtin'`. | P3 |
| P12 | Built-in hooks (auto-run tests, auto-format, auto-lint) registered as `source: 'builtin'`. | P3 |

P1–P4 + P11–P12 are required for v1 (slash blocks + hooks are Bible Part 25.9 / 25.10 explicit). P5–P10 enable MCP plugins and can ship progressively in v1.x.

---

## 11. Open questions / [UNKNOWN]

| # | Unknown | Resolution |
|---|---|---|
| 1 | Which MCP protocol version to support? | v2025-06-18 (latest stable at writing). Validate during P5. |
| 2 | Does `worker_threads` provide enough isolation for local-module plugins, or do we need full child processes? | `worker_threads` is sufficient for non-network plugins. Network-requiring plugins go through MCP (separate process). [INFERENCE] |
| 3 | Plugin config storage — encrypted in DB or separate file? | Encrypted in DB (`plugin_config` table, JSON column, encrypted via SQLCipher). [INFERENCE] |
| 4 | How to sandbox MCP servers on Windows where AppContainer is restrictive? | Use Job Object + restricted token. Cross-ref Runtime Arch §6.2. |
| 5 | Can a plugin declare a custom artifact type? | NO in v1. The 12 artifact types are fixed (Artifact Arch A-1). Plugins may produce artifacts of existing types only. |
| 6 | Should plugins be able to register agents with the existing 5 (Planner/Researcher/Builder/Reviewer/Verifier)? | YES — but with declared scope; sub-agent inheritance applies (Security Arch §4.2). |
| 7 | Plugin sandbox vs built-in tool sandbox — same RuntimeGateway? | Yes. One Gateway; permission bag differs per request. |

---

## 12. Invariants (this document)

- **P-1.** Exactly 4 plugin capability kinds: tool, agent, slash-block, hook. No 5th without Bible amendment.
- **P-2.** Plugins never get direct DB, keychain, conversation-stream, or Core-engine access.
- **P-3.** Uninstall does NOT delete owner data produced by the plugin.
- **P-4.** Every plugin invocation goes through RuntimeGateway with the declared permission bag.
- **P-5.** Every plugin invocation is audited.
- **P-6.** Plugin install requires explicit owner approval of the permission declaration.
- **P-7.** Plugins extend ToolRegistry / AgentRegistry / SlashBlockRegistry / HookRegistry — they do not bypass them.
- **P-8.** No public marketplace in v1 (personal registry only).
- **P-9.** Plugin updates require re-approval if permissions expand.
- **P-10.** No auto-update of plugins without owner opt-in (Bible Part 22.14 — no telemetry).

---

**End of MiMo Plugin Architecture.**
