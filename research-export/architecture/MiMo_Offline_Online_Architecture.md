# MiMo — Offline / Online Architecture

**Task ID:** ARCH-C / Doc 5 of 7
**Phase:** Foundation From The Ground Up
**Status:** ARCHITECTURE (no implementation). Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible Part 23 (Offline/Online), Part 20.12 (Offline Behavior), Part 22.1 (Local-First Invariant), Part 24 (Error/Recovery). Current System Audit §1.4 (in-memory memory), §3.2 (volatile), §6.2 (no jobs), §6.3 (no WebSockets).
**Scope:** Exactly what works offline, partially online, fully online. Failure behavior. No destructive behavior because a network request failed.

> **Architectural rule.** MiMo is offline-first by design, not offline-capable as a feature. The owner's work NEVER depends on the network being up. The network is an *optional accelerator* for cloud AI, web search, and (opt-in) cloud sync. Bible Part 23.1 is authoritative.

---

## 1. Three operating modes

| Mode | Definition | Default? |
|---|---|---|
| **Fully Offline** | No network. No cloud model. No web search. No sync. | No (most owners have internet) |
| **Partially Online** | Network up; cloud model selected but unavailable/failing; or web search failing; or sync failing. Local model may or may not be configured. | Common failure mode |
| **Fully Online** | Network up; cloud model working; web search working; sync working (if enabled). | Default when online |

The system must **never** transition a destructive operation based on a mode change. Specifically:
- A failing cloud model MUST NOT delete the conversation.
- A failing sync MUST NOT delete local data.
- A failing web search MUST NOT abort an agent that can continue with local knowledge.

**Invariant OFF-1.** Network failures degrade capability, never data. Bible Invariant 8 ("No silent failures") + Bible Invariant 5 ("No destructive action without recovery").

---

## 2. Capability matrix per mode

| Capability | Fully Offline | Partially Online | Fully Online |
|---|---|---|---|
| Conversation (chat) | YES (local model) | YES (local or cloud) | YES (cloud preferred) |
| Memory store + recall | YES | YES | YES |
| Knowledge graph | YES | YES | YES |
| Artifacts create + view + edit | YES | YES | YES |
| Artifact runtime (in-browser sandbox) | YES (Pyodide/CSP) | YES | YES |
| Artifact runtime (host sandbox) | YES | YES | YES |
| Universal Search (local) | YES | YES | YES |
| Universal Search (semantic) | YES (local vectors) | YES | YES |
| Agent pipeline (with local model) | YES | YES | YES |
| Agent pipeline (with cloud model) | NO | YES (or fall back) | YES |
| Web search (research mode) | NO | NO (degrades) | YES |
| Image generation (cloud model) | NO | NO (degrades) | YES |
| Image generation (local model) | YES (if configured) | YES | YES |
| Cloud sync | NO | NO (queues) | YES (if enabled) |
| Cloud backup | NO | NO (queues) | YES (if enabled) |
| Plugin install (MCP server URL fetch) | NO | NO | YES |
| Plugin invocation (local MCP server) | YES | YES | YES |
| All keyboard shortcuts | YES | YES | YES |
| All workspace operations | YES | YES | YES |
| Audit log write | YES | YES | YES |

[FACT] Bible Part 23.2 + Part 23.3 list the same capabilities with the same disposition.

---

## 3. What works offline (Bible Part 23.2)

Everything that does not require external data:

- **Conversation** with a local model (Bible Part 23.6).
- **Memory** (local SQLite + SQLCipher).
- **Knowledge** (local graph).
- **Artifacts** (local runtime — in-browser classes always work; host sandbox works).
- **Agent pipeline** with a local model.
- **Search** (local FTS5 + vector + graph indices — Search Arch §3).
- All keyboard shortcuts. All workspace operations. All UI.

### 3.1 What is required for offline to work

[TARGET] Five prerequisites (today NONE exist — Audit §1.4, §3.2, §4.1):

1. **Persistent local DB** (SQLCipher-encrypted SQLite — Security Arch §5).
2. **At least one model adapter configured.** The ZAIModel adapter requires network (it calls ZAI cloud). For offline, the owner MUST configure a local model adapter (Ollama adapter — Bible Part 23.6).
3. **Local embedding model** for semantic search (`all-MiniLM-L6-v2` ONNX — Search Arch §3.3).
4. **Local artifact runtime** (Pyodide for Python; CSP iframe for HTML — Runtime Arch §3).
5. **All indices populated locally** (FTS5 + vector + graph — Search Arch §3).

[INFERENCE] Without these, "offline-first" is marketing. With these, "offline-first" is real.

---

## 4. Failure behaviors

Bible Part 23.7 enumerates six failure scenarios. We adopt them verbatim and specify the implementation.

### 4.1 Internet disconnect (Bible Part 23.7)

| Trigger | Behavior |
|---|---|
| `navigator.onLine === false` (browser event) OR active probe fails | Connection indicator appears (Bible Part 23.5 — top bar, subtle, not modal). |
| In-flight cloud-model request | Aborts with `NetworkError`. Conversation message shows inline error card (Bible Part 24.1) with "Retry" + "Switch to local model" buttons. |
| In-flight web search | Tool returns `offline` to the agent. Agent continues with local knowledge (Bible Part 23.4). |
| In-flight sync | Sync request queued to `sync_queue` table. Will retry on reconnect. |
| In-flight image generation | Same as cloud model: inline error + queue. |
| Local operations (memory, knowledge, artifacts, search) | Continue unaffected. |

**Critical invariant.** The conversation turn is **not** aborted when a sub-tool fails. The Orchestrator continues with degraded capability, surfacing each degradation inline (Bible Part 24.1).

### 4.2 API failure (Bible Part 23.7)

| Trigger | Behavior |
|---|---|
| Cloud model returns 5xx or times out (≥ 30s) | Retry with backoff (max 3 attempts: 1s, 2s, 4s). On final failure, fall back to alternate model (if configured) or queue. |
| Cloud model returns 4xx (auth/quota/invalid request) | No retry. Inline error with classification (auth → "Check API key"; quota → "Switch model"; invalid → "Report issue"). |
| Cloud model returns malformed output | Validator (Bible Part 7.12) catches. Retry once with stricter prompt. On second malformed response, fall back to alternate model or surface to owner. |

Bible Part 23.7 explicit: "Retry with backoff (max 3). Fall back to alternative model (if configured). Queue if no alternative."

### 4.3 Quota exhaustion (Bible Part 23.7)

Bible Part 23.7: "No quotas (MiMo has no credit system — Part 1.6 principle 9). If using external API with quotas, fall back to local model."

[PRODUCT DECISION] MiMo has no internal quota. If the configured cloud provider returns a quota error (e.g., OpenAI 429), MiMo:
1. Logs the provider's quota state (visible in DeveloperPanel).
2. Falls back to a local model (if configured).
3. If no local model: surfaces an inline error with a "Configure local model" link (no modal — Bible Invariant 24).

No counters shown to the owner (Bible Invariant 9).

### 4.4 Model failure (Bible Part 23.7)

- Retry with backoff.
- Fall back to alternative model (model routing — Bible Part 7.1 declares multiple models per task type).
- Show error inline.

### 4.5 Tool failure (Bible Part 23.7)

- If non-critical: continue without. (e.g., web_search offline → continue with local knowledge.)
- If transient: retry (e.g., file read after a transient FS error).
- If critical: abort with recovery suggestion (e.g., `file_read` for a project file that no longer exists → suggest re-attaching).

### 4.6 Agent failure (Bible Part 23.7)

- Pause (not crash). Bible Part 8.10.
- Error shown inline (actionable). Bible Part 24.2.
- Owner can retry / edit state / abort. Bible Part 24.4.
- RecoveryEngine suggests strategies. Bible Part 24.4.

---

## 5. Sync failure (cloud backup / sync, if enabled)

### 5.1 Sync queue model

When the owner enables cloud sync (Settings → Cloud Sync, opt-in, E2E — Bible Part 22.2):

- Every local mutation (conversation message, memory entry, knowledge entity, artifact version) writes a row to `sync_queue`:

```sql
CREATE TABLE sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ts INTEGER NOT NULL,
  kind TEXT NOT NULL,         -- 'conversation' | 'memory' | 'knowledge' | 'artifact' | 'audit' | 'project'
  entityId TEXT NOT NULL,
  version INTEGER NOT NULL,   -- for optimistic concurrency
  payload TEXT NOT NULL,      -- E2E-encrypted blob
  status TEXT NOT NULL,       -- 'pending' | 'in-flight' | 'failed' | 'applied'
  attempts INTEGER NOT NULL DEFAULT 0,
  lastAttemptTs INTEGER,
  lastError TEXT
);

CREATE INDEX idx_sync_status ON sync_queue(status, ts);
```

- A background sync worker (running every 30s when online) pulls `pending` rows in order, applies to cloud, marks `applied` or `failed`.
- On `failed` after 5 attempts: row stays in `failed` status; owner sees "5 sync failures" warning in DeveloperPanel. No data is lost.
- On reconnect after offline: queue drains automatically.

### 5.2 Conflict resolution

- Last-write-wins per `entityId + version` (higher version wins).
- Conflicts logged with both versions; owner can review and revert (Bible Part 24.4 rollback).
- [INFERENCE] v1 uses LWW. v2 may add 3-way merge for markdown / artifact content. Out of scope.

### 5.3 No destructive behavior on sync failure

**Invariant OFF-2.** A sync failure MUST NOT delete local data. The local DB is the source of truth. The cloud is a downstream replica.

- Cloud deletes (owner deletes on device B) propagate as "tombstone" rows in `sync_queue` with `kind='delete'`. On device A, the corresponding local row is **archived** (not hard-deleted) for 30 days before permanent delete (Bible Part 22.11). This protects against a malicious or buggy cloud sync deleting local data.

---

## 6. Provider failure (multi-provider failover)

Bible Part 7.1 declares model routing per task type. Each task type may declare:

```ts
type ModelRouting = {
  primary: string;       // e.g., 'zai:glm-4.6'
  fallback?: string;     // e.g., 'ollama:llama3.1-8b'
  lastResort?: string;    // e.g., 'zai:glm-4-flash'
};
```

[TARGET] The ModelAdapter routes per task type. If the primary fails after retries, the fallback is tried. If the fallback fails, the last resort (or a queue) is used.

[CURRENT] Audit §4.1: only ZAI registered. No fallback. No model routing. The "single-provider" reality means a ZAI outage takes down the entire cloud-model capability.

---

## 7. Search unavailable

### 7.1 Local search always works

Universal Search (Search Arch §2) runs against local SQLite FTS5 + vector indices. **No network dependency.** Search never goes "offline."

### 7.2 Web search (tool) unavailable

- `web_search` tool returns `offline` to the agent.
- Agent continues with local knowledge (Bible Part 23.4 — "agent says so, continues without").
- No error card to the owner for the search itself; the agent's behavior is documented in ExecutionTrace ("Web search unavailable; continuing with local knowledge").

### 7.3 Semantic search (vector) — embedding model unavailable

- Embeddings computed locally (`all-MiniLM-L6-v2` ONNX — Search Arch §3.3). No network dependency.
- If the ONNX runtime fails: semantic search degrades to FTS5-only. Owner sees a DeveloperPanel warning. Not a user-facing error.

---

## 8. Cloud storage unavailable (if enabled)

- Cloud sync queues locally (§5.1).
- Cloud backup (Bible Part 22.12): if cloud backup fails, the local backup is still created daily (Settings → Backup → local path). The cloud backup is retried on next online window.

---

## 9. Connection indicator (Bible Part 23.5)

[TARGET] A subtle indicator in the top bar:
- **Online (default):** no indicator.
- **Offline:** small cloud-slash icon + "offline" text label, in `text-tertiary` color (Part 16.5). Not a modal. Not a banner. Owner can dismiss.
- **Degraded** (network up but cloud model failing): small warning icon + "model degraded" label. Hover for details.

[CURRENT] Audit confirms no connection indicator exists. The system assumes network is always up.

---

## 10. Local model support (Bible Part 23.6)

### 10.1 Required

[TARGET] MiMo MUST support at least one local model adapter for fully offline operation. Bible Part 23.6 explicit.

### 10.2 Adapter choice

- **Ollama** is the recommended local model runtime (cross-platform, MIT-licensed, model-library ecosystem).
- The adapter calls Ollama's local HTTP API (`http://localhost:11434/api/...`).
- Ollama is NOT bundled with MiMo. Owner installs it via Settings → "Set up local model" (links to Ollama download + verifies install on save).

### 10.3 Configuration

```ts
type LocalModelConfig = {
  runtime: 'ollama' | 'llamacpp' | 'none';
  endpoint: string;        // default 'http://127.0.0.1:11434'
  defaultModel: string;    // e.g., 'llama3.1:8b'
  visionModel?: string;    // e.g., 'llava:13b'
  embeddingModel?: string; // default 'all-minilm-l6-v2' (via ONNX, not Ollama)
  maxContextTokens?: number;  // default 8192
};
```

### 10.4 Fallback flow

```
cloud_model primary → fails → local_model fallback → if local not configured → queue + offline indicator
```

Bible Part 23.4: "Cloud model unavailable → fall back to local model (if configured) or queue."

---

## 11. Background sync (Bible Part 26.6)

[TARGET] Replace the current 6s-poll architecture (Audit §6.3 — no WebSockets) with:
- Local DB writes are immediate (no network).
- A `SyncWorker` background job (Node `setInterval`, every 30s when online) drains the `sync_queue`.
- UI re-renders from local cache (Bible Part 26.4 — caching).

[CURRENT] Audit §6.3 confirms: client polls `/api/mimo/workspace` every 6s + AXP routes every 3-5s. No WebSocket. No background sync. This is acceptable for local-only (data is local; the poll is just a cache refresh), but should evolve to event-driven once WebSockets are added (Bible Part 26.6 — "background sync").

---

## 12. Mode signaling

### 12.1 Internal mode state

```ts
type ConnectivityState = {
  network: 'online' | 'offline' | 'degraded';
  cloudModel: 'available' | 'unavailable' | 'unknown' | 'not-configured';
  localModel: 'available' | 'unavailable' | 'not-configured';
  webSearch: 'available' | 'unavailable' | 'unknown';
  sync: 'syncing' | 'idle' | 'failed' | 'not-configured' | 'offline';
  lastChecked: number;
};
```

The ConnectivityState is updated:
- On `navigator.online` / `navigator.offline` events.
- On every cloud-model call (success / failure).
- On every web_search call.
- On every sync attempt.

Stored in the Zustand `system` slice (Audit §5.2 — store refactor target).

### 12.2 UX impact

The ExecutionTrace shows the actual mode each stage ran in:
- "Context assembled (local memory + knowledge)" — no network.
- "Reasoned (local model)" — local model.
- "Plan (cloud model)" — cloud model.
- "Web search: offline; continuing with local knowledge" — degradation surfaced.

Bible Part 10.3 — Never Fake. The trace shows the actual path, not a presumed one.

---

## 13. [CURRENT] vs [TARGET] vs [MIGRATION]

### 13.1 [CURRENT]

[FACT — Audit]:
- Memory is in RAM (volatile). Lost on restart.
- No persistence for conversation state beyond Zustand (client-side, lost on hard refresh).
- No local model support. ZAI only (Audit §4.1).
- No sync. No queue.
- No connection indicator.
- No graceful degradation. A ZAI outage stops chat.
- A server restart loses all in-flight conversations.
- `WebSearchTool` has no permission gate and no graceful "offline" handling (Audit §9.2).

### 13.2 [TARGET]

- Persistent SQLCipher DB. Restart-safe.
- Local model adapter (Ollama). Configurable in Settings.
- Sync queue with crash-safe resume.
- Connection indicator.
- Per-failure-mode behavior (§4).
- No destructive behavior on network failure (§5.3).
- Mode state exposed to ExecutionTrace.

### 13.3 [MIGRATION]

| Phase | What | Depends on |
|---|---|---|
| OFF-1 | Persist MemoryEngine to Prisma (replace `Map<string, StoredEntry>` — Audit §3.2). | Prisma domain schema |
| OFF-2 | Persist conversations + messages to Prisma. | Same |
| OFF-3 | Add connectivity state slice to Zustand. | — |
| OFF-4 | Add connection indicator to top bar. | OFF-3 |
| OFF-5 | Add Ollama adapter to ModelRegistry. | Model adapter interface |
| OFF-6 | Add per-task-type model routing (primary + fallback + lastResort). | OFF-5 |
| OFF-7 | Add sync_queue table + SyncWorker (when cloud sync enabled). | Security Arch SEC-13 |
| OFF-8 | Add `navigator.onLine` listener; degrade `web_search` to `offline`. | — |
| OFF-9 | Add local embedding model (ONNX). | Search Arch S10 |
| OFF-10 | Add `model degraded` indicator + retry-with-fallback flow. | OFF-6 |

OFF-1 through OFF-5 are required for v1. OFF-6+ are required for "true offline" but can ship progressively.

---

## 14. Open questions / [UNKNOWN]

| # | Unknown | Resolution |
|---|---|---|
| 1 | Is Ollama a stable enough dependency to recommend? | Yes — actively maintained, large community, MIT. Document install path. |
| 2 | Does the local embedding model (`all-MiniLM-L6-v2`) work in `onnxruntime-web` (browser) or only in Node? | Both. v1 runs it in Node (Core side); v2 may move to a Web Worker. [INFERENCE] |
| 3 | Should the cloud sync conflict resolution use vector clocks instead of LWW? | LWW is simpler and sufficient for single-user two-device. v2 can revisit. |
| 4 | What is the smallest viable local model for `lastResort`? | `llama3.2:1b` (1B params, ~1 GB). Configurable. |
| 5 | How to detect "cloud model degraded" before a request fails (latency-based)? | v2. v1 uses request-failure detection. |
| 6 | Does `navigator.onLine` fire reliably on all platforms? | Mostly. We supplement with an active probe (HEAD request to the configured provider's health endpoint every 60s). [INFERENCE] |

---

## 15. Invariants (this document)

- **OFF-1.** Network failures degrade capability, never data.
- **OFF-2.** A sync failure MUST NOT delete local data.
- **OFF-3.** The local DB is the source of truth. Cloud is a downstream replica.
- **OFF-4.** The conversation is NOT aborted when a sub-tool fails — the agent continues with degraded capability.
- **OFF-5.** A local model adapter MUST exist for fully offline operation.
- **OFF-6.** Every degradation is surfaced in ExecutionTrace (Bible Invariant 8 — no silent failures).
- **OFF-7.** Cloud deletes propagate as tombstones; local data is archived 30 days before hard delete.
- **OFF-8.** The connection indicator is non-modal (Bible Invariant 24).

---

**End of MiMo Offline/Online Architecture.**
