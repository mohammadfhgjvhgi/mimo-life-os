# MiMo — Testing Architecture

**Phase:** Foundation From The Ground Up — ARCH-D / Doc 3 of 5
**Status:** ARCHITECTURE SPECIFICATION. Distinguishes [CURRENT] / [TARGET] / [MIGRATION] / [FACT] / [INFERENCE] / [UNKNOWN].
**Authority:** MiMo Product Bible (Parts 19, 22, 25, 27 §27.10, §27.17) + MiMo_Current_System_Audit (§10).
**Scope:** Testing strategy only — what to test, how, when, with what tools. **No test code.** Defines test categories, gates, and the pragmatic compromise between the project rule ("no test code — owner validates manually via Agent Browser") and architectural safety needs.
**Governing principle:** **Pragmatic, not dogmatic.** Respect the project rule (manual Agent Browser verification as primary), but add automated gates for architectural invariants (type safety, lint, contract tests for adapters). The owner validates behavior; the system validates architecture.

---

## 0. Executive Summary

**[CURRENT]** MiMo has **zero tests**. [FACT — Audit §10.1]
- `tests/` folder contains only shell scripts for Python runtime containers (not MiMo tests).
- `package.json` has no `test` script.
- `eslint.config.mjs` disables ~25 rules — the linter provides almost no protection. [FACT — Audit §10.2]
- `next.config.ts` has `typescript: { ignoreBuildErrors: true }` — TypeScript errors are silently ignored. [FACT — Audit §1.1]
- `tsconfig.json` has `noImplicitAny: false` — strict mode weakened. [FACT — Audit §1.1]
- Verification is manual via Agent Browser (per project rules — Part 27.10).

**[PROJECT RULE — Part 27.10]:** "No test code (per project rules — owner validates manually via Agent Browser). Lint + type check are the automated gates. Agent Browser golden-path verification after every feature."

**[CONFLICT]:** The project rule says "no test code," but architectural safety (Audit §10) demands automated verification of invariants. The Audit labels this "HIGH RISK — no automated verification." [FACT]

**[RESOLUTION — this document]:** A **pragmatic testing strategy** that:
1. Respects the project rule: manual Agent Browser is the PRIMARY verification path for product behavior.
2. Adds automated gates ONLY for **architectural invariants** that the owner cannot verify manually in reasonable time:
   - **Type safety** (TypeScript strict mode, no `any`).
   - **Lint cleanliness** (re-enabled rules).
   - **Contract tests for adapters** (ZAIModel, SearchProvider — the boundary between MiMo and external SDKs).
   - **Schema tests** (Prisma schema integrity, migrations).
   - **Build integrity** (production build succeeds).
3. Does NOT add comprehensive unit/integration/e2e test suites in v1 (deferred to v2 if/when the project rule is revisited).
4. Provides an OPTIONAL test infrastructure (vitest, playwright, axe-core) that the owner can OPT INTO when they choose, without breaking the project rule.

**[TARGET]** Two tiers of verification:
- **Tier 1 (MANDATORY automated gates):** type check, lint, adapter contract tests, schema tests, build. Run on every commit. ~5 seconds.
- **Tier 2 (MANUAL Agent Browser):** golden-path verification of every feature. Run by the owner after every feature.
- **Tier 3 (OPTIONAL automated tests):** unit/integration/e2e/a11y. Available infrastructure; owner opts in.

---

## 1. Test Categories — Full Taxonomy

For each category: definition, why it matters, who runs it, when, with what tools, what's mandatory vs optional.

### 1.1 Unit Tests

**Definition:** Tests of individual functions / classes / modules in isolation. Mock external dependencies.

**Why:** Catch regressions in pure logic (e.g., memory decay formula, knowledge entity merge algorithm, prompt template assembly, datetime formatting).

**Tool:** Vitest (fast, jest-compatible, native ESM, Vite-powered — fits Next.js 16 + Turbopack).

**Scope (if implemented — Tier 3 OPTIONAL):**
- `lib/mimo/datetime.ts` — deterministic timestamp formatting (hydration-critical).
- `lib/mimo/commands.ts` — CommandRegistry add/get/lookup.
- `lib/mimo/api.ts` — typed API client (request shaping, response parsing).
- `core/memory/MemoryEngine.ts` — store/query/decay logic (in isolation from Prisma).
- `core/knowledge/KnowledgeEngine.ts` — entity merge, relation typing.
- `core/context/ContextBuilder.ts` — context assembly + compression.
- `core/reasoner/Reasoner.ts` — intent classification (rule-based).
- `core/planner/Planner.ts` — plan generation (façade over PlannerAgent).
- `core/validator/Validator.ts` — final gate (output validation).
- `core/prompt/PromptEngine.ts` — template assembly.
- `lib/utils.ts` — utility functions.

**[TARGET Tier 3 OPTIONAL]** Vitest configured. Example test files co-located with source (`*.test.ts`). Owner opts in.

**[CURRENT]** None. [FACT — Audit §10.1]

### 1.2 Integration Tests

**Definition:** Tests of multiple modules working together (e.g., Core pipeline stages Context→Reason→Plan→Execute→Validate without external SDK calls).

**Why:** Catch wiring bugs between modules.

**Tool:** Vitest with `@vitest/coverage-v8`.

**Scope (if implemented — Tier 3 OPTIONAL):**
- `runWorkflow()` end-to-end with mocked ZAIModel (returns canned response).
- `MemoryEngine.store()` → `MemoryEngine.query()` round-trip with mocked Prisma.
- `EventBus.emit()` → subscriber receives event.
- `ContextBuilder` → `Reasoner` → `Planner` → `Orchestrator` → `Validator` pipeline.
- `ArtifactService.version()` → `ArtifactService.diff()` → per-hunk accept.

**[TARGET Tier 3 OPTIONAL]** Owner opts in.

### 1.3 Contract Tests [MANDATORY in Tier 1]

**Definition:** Tests that verify the contract between MiMo and external systems (z-ai-web-dev-sdk, Prisma, Next.js API routes).

**Why:** External SDKs change; MiMo must detect breakage. This is the **most critical** automated test category — it's the architectural safety net the project rule omits. Without contract tests, an SDK upgrade can silently break MiMo.

**Tool:** Vitest.

**Scope (MANDATORY):**
- `core/models/ZAIModel.ts` contract: `chat()` returns `{ content, usage?, metadata? }`; `stream()` yields `{ type: 'token', value } | { type: 'done' }` events; throws `MiMoError` on failure (not raw SDK errors).
- `core/search/SearchProvider.ts` contract: `search()` returns `{ results: [{ title, url, snippet }] }`; throws `MiMoError` on failure.
- `core/capabilities/image.ts` (to be created) contract: `generate()` returns `{ url, metadata? }`; throws `MiMoError` on failure.
- `lib/db.ts` contract: Prisma client connects; `prisma.$queryRaw` works; migrations apply cleanly.
- API route contracts: `POST /api/chat` returns a `ReadableStream` with `{ type, ... }` events; `GET /api/mimo/workspace` returns `{ conversations, memories, agents, tools, recentActivity }`; `POST /api/image` returns `{ url }`; etc.

**Why MANDATORY:** The Audit (§4.1, §17 conflict #14, #16) flags Core-bypassing routes as a Product Bible violation (Part 25, Part 29 invariant #16). Contract tests are the only automated way to catch a regression where someone adds a new route that bypasses Core. They take ~5 seconds and provide outsized architectural safety.

**[TARGET Tier 1 MANDATORY]** Run on every commit. ~5 seconds. Fails build.

**[CURRENT]** None. [FACT — Audit §10.1]

### 1.4 Database Tests [MANDATORY in Tier 1 — schema only]

**Definition:** Tests that verify Prisma schema integrity + migrations.

**Why:** Catch schema drift, missing indexes, broken migrations.

**Tool:** Prisma's built-in `prisma validate` + `prisma migrate status` + a small test that creates an in-memory SQLite DB, applies the schema, runs CRUD on each model, and tears down.

**Scope (MANDATORY):**
- `prisma validate` — schema is syntactically valid.
- `prisma migrate status` (or `db:push --accept-data-loss` in dry-run) — schema can be applied to a fresh DB.
- In-memory DB CRUD test: for each model (Project, Conversation, Message, Memory, KnowledgeEntity, KnowledgeRelation, Artifact, ArtifactVersion, Task, Agent, ExecutionTrace, AuditLog, TrustPolicy), create one row, read it, update it, delete it.
- Index verification: each indexed field has an index (full-text search on Memory.content, KnowledgeEntity.name; FK indexes on all `*Id` fields).

**[TARGET Tier 1 MANDATORY]** Run on every commit + on schema change. ~10 seconds.

**[CURRENT]** None. Schema is demo boilerplate. [FACT — Audit §3.1]

### 1.5 API Tests

**Definition:** Tests of Next.js API routes — request/response shape, error handling, status codes.

**Why:** Catch API drift between frontend expectations and backend reality.

**Tool:** Vitest with `next-test-api-route-handler` (or direct fetch against a test server).

**Scope (Tier 3 OPTIONAL — except contract tests in §1.3 which are MANDATORY):**
- `POST /api/chat` — accepts `{ text, mode, conversationId, projectId }`, returns `ReadableStream`, stream events have correct shape.
- `GET /api/mimo/workspace` — returns workspace snapshot, 6s cache headers.
- `POST /api/image` — accepts `{ prompt, size }`, returns `{ url }`, routes through Core (contract test verifies this).
- `POST /api/search` — accepts `{ query }`, returns `{ results }`, routes through Core.
- `GET /api/events` — returns SSE stream.
- `POST /api/agent/:id/:action` — accepts `approve | reject | cancel | retry`, returns `{ ok }`.
- `POST /api/artifact/:id/accept` — accepts `{ hunkIds: string[] }`, returns `{ acceptedHunks, rejectedHunks }`.
- Error cases: malformed body → 400; missing auth → 401 (v2); server error → 500 with `{ error: { code, message, retryable, traceId } }`.

**[TARGET Tier 3 OPTIONAL]** Owner opts in. (Contract tests in §1.3 cover the most critical API contracts MANDATORILY.)

### 1.6 AI Adapter Tests [MANDATORY in Tier 1]

**Definition:** Tests that verify MiMo's AI adapters (ZAIModel, SearchProvider, future ImageAdapter, future LocalModel) implement the correct interface AND handle SDK errors gracefully.

**Why:** The Audit (§4.1) flags `/api/image` and `/api/search` bypassing Core adapters as a HIGH-RISK provider coupling. Adapter tests are the automated gate.

**Tool:** Vitest with mocked `z-ai-web-dev-sdk`.

**Scope (MANDATORY):**
- `ZAIModel.chat()` — returns `{ content, usage?, metadata? }` on success; throws `MiMoError` with `code: 'AI_PROVIDER_ERROR'` on SDK error; throws `MiMoError` with `code: 'AI_TIMEOUT'` on timeout; throws `MiMoError` with `code: 'AI_RATE_LIMIT'` on 429.
- `ZAIModel.stream()` — yields `{ type: 'token', value }` events; yields `{ type: 'tool_call', ... }` events (when SDK supports); yields `{ type: 'done', ... }` final event; throws `MiMoError` on stream error.
- `SearchProvider.search()` — returns `{ results: [{ title, url, snippet }] }`; throws `MiMoError` on failure.
- Image adapter (to be created) — returns `{ url, metadata? }`; throws `MiMoError` on failure.
- **Adapter isolation test:** grep-verify `z-ai-web-dev-sdk` is only imported in `core/models/ZAIModel.ts`, `core/search/SearchProvider.ts`, `core/capabilities/image.ts`. NOT imported in `app/api/*` or `components/*` or `lib/*`. (This is the audit's §4.1 issue automated.)

**[TARGET Tier 1 MANDATORY]** Run on every commit. ~3 seconds.

**[CURRENT]** None. [FACT — Audit §10.1]

### 1.7 Agent Tests

**Definition:** Tests of agent lifecycle + delegation + cancellation + failure recovery.

**Why:** Agents are complex state machines (Part 8.10 — cancellation/retry/failure/recovery). Manual verification is expensive.

**Tool:** Vitest with mocked Model + Tools.

**Scope (Tier 3 OPTIONAL):**
- PlannerAgent — generates a Plan from a context; Plan has correct shape.
- ResearchAgent — invokes WebSearchTool, returns synthesized result.
- WriterAgent — generates output from a brief.
- MemoryAgent — extracts memories from a conversation.
- Agent lifecycle: idle → spawned → planning → ... → done/failed/cancelled/paused.
- Cancellation: agent.cancel() transitions to `cancelled`; in-flight tool calls abort.
- Retry: agent.retry() re-runs from the last successful stage.
- Failure: agent throws → transitions to `failed`; error persisted to ExecutionTrace.
- Per-task-type trust: agent.spawn() checks TrustPolicy; if `awaiting_approval`, blocks.

**[TARGET Tier 3 OPTIONAL]** Owner opts in.

### 1.8 Tool Tests

**Definition:** Tests of individual tools (WebSearch, MemoryRecall, MemoryStore, future FileRead, FileWrite, CodeExec).

**Why:** Tools are the agent's hands (Part 25 — Plugin/Tool Architecture). Malformed tool calls corrupt state.

**Tool:** Vitest with mocked external services.

**Scope (Tier 3 OPTIONAL — but security-sensitive tools MANDATORY):**
- `WebSearchTool` — returns results; handles empty results; handles network error.
- `MemoryRecallTool` — queries MemoryEngine; returns ranked results; handles empty.
- `MemoryStoreTool` — stores memory; requires `source` + `type`; rejects malformed.
- `FileReadTool` (future) — reads file; rejects paths outside project sandbox.
- `FileWriteTool` (future) — writes file; rejects paths outside project sandbox; respects read-only/workspace-write/danger permissions.
- `CodeExecTool` (future) — executes in sandbox; respects time/memory limits; rejects network access (unless allowed).

**Security-sensitive tools (FileWrite, CodeExec) — MANDATORY in Tier 1** because manual verification of sandbox escapes is impractical.

**[TARGET Tier 1 MANDATORY for security-sensitive tools]** Run on every commit. ~5 seconds.

### 1.9 Security Tests [MANDATORY in Tier 1 — basic]

**Definition:** Tests of MiMo's security boundaries.

**Why:** The Audit (§9) flags HIGH-RISK gaps: no auth, no authorization, no sandbox, no encryption at rest. Manual verification of every permission check is impractical.

**Tool:** Vitest + grep-based invariant tests.

**Scope (MANDATORY):**
- **Adapter isolation:** `z-ai-web-dev-sdk` only imported in Core adapters (§1.6).
- **Core boundary:** `app/` and `components/` never import from `@/core/*` except `@/core/index` (single public surface).
- **Server-only imports:** `z-ai-web-dev-sdk`, `@prisma/client`, `lib/db.ts` never imported in any file under `src/components/`, `src/hooks/`, `src/lib/mimo/`.
- **No `any` types:** `grep -r ": any" src/ | grep -v ".test." | grep -v "node_modules"` returns zero (with allowlist for transitional `// eslint-disable-next-line`).
- **No `console.log` in production code:** `grep -r "console\." src/ | grep -v ".test." | grep -v "logger.ts"` returns zero (with allowlist).
- **No `<Link>` to other routes:** `grep -r "from 'next/link'" src/` returns zero (Part 27.3 rule #5, Part 29 invariant #15).
- **Rail ≤ 8 icons:** runtime assertion in `LeftRail.tsx` + test verifies `NavItems.length <= 8`.

**Scope (Tier 3 OPTIONAL — full security tests):**
- Permission enforcement: every tool call checked against TrustPolicy.
- Sandbox escape attempts: file paths normalized, network blocked.
- Audit log integrity: every state-changing operation logged.

**[TARGET Tier 1 MANDATORY]** Run on every commit. ~2 seconds.

### 1.10 Sandbox Tests [MANDATORY when sandbox exists]

**Definition:** Tests of the code execution sandbox (for CodeExecTool, artifact runtime).

**Why:** Sandbox escapes are catastrophic (arbitrary code execution on the owner's machine).

**Tool:** Vitest with actual sandbox (Docker, gVisor, or WASM — TBD by MiMo_Security_Architecture [TBD]).

**Scope (MANDATORY when sandbox exists — NOT in v1):**
- Sandbox blocks file writes outside project dir.
- Sandbox blocks network access (unless allowed).
- Sandbox blocks fork bombs / excessive memory.
- Sandbox respects time limit.
- Sandbox cannot access env vars (except allowlist).

**[UNKNOWN]** When sandbox is implemented (v1.5 or v2), these tests become MANDATORY. Today: not applicable (no sandbox — Audit §9.6).

### 1.11 Accessibility Tests [MANDATORY in Tier 1 — axe-core]

**Definition:** Automated a11y tests with axe-core.

**Why:** Part 19.11 lists axe-core as a VALIDATION REQUIREMENT. WCAG AA is a Product Invariant (Part 27.3 rule #14, Part 29 invariant #14).

**Tool:** `@axe-core/playwright` (e2e-level) OR `jest-axe` (unit-level).

**Scope (MANDATORY):**
- Render each shell region (LeftRail, TopBar, WorkspaceTabs, CanvasHost, ContextSidebar, AgentDock, ArtifactDock) → run axe → zero violations.
- Render each overlay (CommandPalette, UniversalSearch, QuickAI, ProjectSwitcher, Settings, Voice, ImageGen, DeveloperPanel) → run axe → zero violations.
- Render each panel (ConversationPanel, MemoryBrowser, KnowledgeBrowser, FilesBrowser, ProjectWorkspace, PersonalDashboard) → run axe → zero violations.

**Standard:** zero violations on `wcag2a` + `wcag2aa` + `wcag21a` + `wcag21aa`.

**[TARGET Tier 1 MANDATORY]** Run on every commit + in CI. ~30 seconds (Playwright launches).

**[CURRENT]** None. [FACT — Audit §5.4, §10.2]

### 1.12 End-to-End (E2E) Tests

**Definition:** Full-stack tests of user journeys through the running app.

**Why:** Catch integration bugs across frontend + API + Core + DB.

**Tool:** Playwright (best fit for Next.js 16; supports SSE, network interception, multi-browser).

**Scope (Tier 3 OPTIONAL — except golden-path MANDATORY via Agent Browser):**
- Send message → see streaming response → memory extracted → appears in Memory browser.
- Open artifact → per-hunk accept → artifact versioned.
- Spawn agent → approve plan → agent executes → done.
- Switch project → layout restored.
- Hold-Space peek → preview appears < 100ms.
- ⌘K → type `>cmd` → command list filtered.
- `Esc Esc` → rewinds last agent action.

**[TARGET Tier 3 OPTIONAL]** Owner opts in. Manual Agent Browser is the PRIMARY e2e verification (Part 27.10).

### 1.13 Golden-Path Tests [MANDATORY — via Agent Browser]

**Definition:** Manual verification of the critical user journeys, performed by the owner after every feature, using Agent Browser (the agent-browser skill in the workspace).

**Why:** Project rule (Part 27.10). Owner's primary verification.

**Tool:** Agent Browser (skill in workspace — `agent-browser` skill).

**Golden paths (MANDATORY — run after every feature touching them):**
1. **Chat golden path:** send message → see streaming response → see inline ExecutionTrace → response committed.
2. **Memory golden path:** send message → memory extracted → appears in Memory browser → has source + timestamp + delete.
3. **Artifact golden path:** generate artifact → opens as tab → per-hunk accept → version persisted.
4. **Mode switch golden path:** send message in chat → switch to research → canvas adapts → conversation stays.
5. **Tab golden path:** ⌘T new tab → switch via Alt+1..9 → ⌘W close (not pinned) → reload → tabs restored.
6. **Command palette golden path:** ⌘K → type `>cmd` → arrow keys → Enter → command runs.
7. **Universal search golden path:** ⌘/ → type query → results grouped by kind → Enter → opens.
8. **Quick AI golden path:** select text → ⌘⇧Tab → verb menu → choose → result.
9. **Hold-Space peek golden path:** hover rail item → hold Space → preview appears < 100ms → release → dismissed < 80ms.
10. **Agent golden path:** spawn agent → see AgentDock → see pipeline stages → approve → agent done.
11. **Project switch golden path:** ⌘P → select project → workspace switches < 200ms → recent updated.
12. **Error recovery golden path:** trigger error (e.g., kill network during send) → see inline error → retry → succeeds.
13. **Reduced motion golden path:** enable `prefers-reduced-motion: reduce` → animations disabled → ExecutionTrace still announces via ARIA.
14. **Keyboard golden path:** navigate entire app with keyboard only — no mouse.

**[TARGET Tier 2 MANDATORY]** Run by owner after every feature. Documented in feature PR description.

**[CURRENT]** Manual verification happens but is ad-hoc. [INFERENCE — not formalized]

### 1.14 Regression Tests

**Definition:** Tests that catch regressions — i.e., a feature that worked before now doesn't.

**Why:** Product Bible Part 29 invariant #10: "No deprecations mid-redesign. Working features never removed." Regression tests are the automated safety net for this invariant.

**Tool:** Vitest + Playwright (Tier 3 OPTIONAL).

**Scope (Tier 3 OPTIONAL):**
- Snapshot tests of rendered components (Vitest + `@vitest/snapshot`).
- API response shape snapshots.
- Conversation message rendering snapshots (markdown + citations + attachments).

**Process (MANDATORY):** when a bug is found (via Agent Browser or user report):
1. Reproduce with Agent Browser (golden path).
2. Document the bug + reproduction steps in `worklog.md`.
3. Fix the bug.
4. Re-verify with Agent Browser.
5. (OPTIONAL Tier 3) Add a regression test in Vitest.

**[TARGET Tier 2 MANDATORY process]** + **[Tier 3 OPTIONAL automated regression tests]**.

---

## 2. What MUST Be Tested Before Every Release [MANDATORY]

The **release gate** is the combination of Tier 1 + Tier 2.

### 2.1 Tier 1 — Automated Gates (run on every commit, must pass):

1. **Type check:** `tsc --noEmit` passes with `strict: true`, `noImplicitAny: true` (Part 27.17).
2. **Lint:** `bun run lint` passes with re-enabled rules (Part 27.17).
3. **Adapter contract tests:** all AI adapter contracts pass (§1.3, §1.6).
4. **Schema tests:** Prisma schema validates + applies to fresh DB (§1.4).
5. **Security invariant tests:** all grep-based invariants pass (§1.9).
6. **A11y tests:** axe-core reports zero violations on `wcag2a` + `wcag2aa` + `wcag21a` + `wcag21aa` (§1.11).
7. **Build:** `next build` succeeds without warnings.

**Total time:** ~60 seconds. Run on every commit (pre-commit hook) + in CI (if/when CI is added).

### 2.2 Tier 2 — Manual Agent Browser (run by owner before every release):

1. **All 14 golden paths** (§1.13) pass.
2. **Cold-launch performance:** first paint < 2s (Part 20.2).
3. **Command palette performance:** ⌘K opens < 80ms (Part 20.2).
4. **Hold-Space peek performance:** < 100ms (Part 20.2).
5. **Project switch performance:** < 200ms (Part 20.2).
6. **Long conversation performance:** 1000+ messages ≥ 50fps (Part 20.2, Part 29 invariant).
7. **Offline mode:** works fully offline for conversation + memory + knowledge + artifacts (Part 20.12, Part 23).
8. **Reduced motion:** all non-essential motion disabled (Part 19.6, Part 29 invariant #13).
9. **No silent failures:** trigger each error path (kill network, kill DB, kill SDK); each shows inline error with retry.

### 2.3 Tier 3 — Optional Automated Tests (run if/when owner opts in):

1. Unit tests (§1.1).
2. Integration tests (§1.2).
3. API tests (§1.5).
4. Agent tests (§1.7).
5. Tool tests (§1.8).
6. E2E tests (§1.12).
7. Regression tests (§1.14 — automated portion).

---

## 3. Test Infrastructure [TARGET]

### 3.1 Tools (Mandatory Tier 1)

- **Vitest** — unit + integration + contract + adapter + schema + security tests. Fast (Vite-powered). Native ESM. jest-compatible API.
- **@axe-core/playwright** (or `jest-axe` for component-level) — a11y tests.
- **Prisma's built-in `validate` + `migrate status`** — schema tests.
- **`tsc --noEmit`** — type check.
- **ESLint** (re-enabled rules) — lint.

**Total Tier 1 dependency cost:** ~3 npm packages. Minimal.

### 3.2 Tools (Optional Tier 3)

- **Playwright** — e2e + a11y (with `@axe-core/playwright`).
- **@vitest/coverage-v8** — coverage.
- **next-test-api-route-handler** — API route tests.
- **msw** (Mock Service Worker) — mock API in tests.

### 3.3 Configuration

- `vitest.config.ts` — Vitest config (test directory: `src/**/*.test.ts`; coverage thresholds if Tier 3 enabled).
- `playwright.config.ts` — Playwright config (browser: chromium; baseURL: `http://localhost:3000`).
- `package.json` scripts:
  ```json
  {
    "scripts": {
      "test": "vitest run",                    // Tier 1 mandatory
      "test:watch": "vitest",                   // Tier 3 watch mode
      "test:e2e": "playwright test",            // Tier 3
      "test:a11y": "playwright test --grep=@a11y",  // Tier 1 mandatory (axe-core)
      "test:contract": "vitest run --grep=contract",  // Tier 1 mandatory
      "test: schema": "vitest run --grep=schema",  // Tier 1 mandatory
      "test:security": "vitest run --grep=security",  // Tier 1 mandatory
      "typecheck": "tsc --noEmit",              // Tier 1 mandatory
      "lint": "eslint .",                       // Tier 1 mandatory (re-enabled rules)
      "precommit": "bun run typecheck && bun run lint && bun run test",  // Tier 1 mandatory
      "build:check": "next build"               // Tier 1 mandatory
    }
  }
  ```

### 3.4 Pre-commit Hook

`.husky/pre-commit` (or `simple-git-hooks`):
```sh
bun run precommit
```

If precommit fails, commit is blocked. Owner can bypass with `--no-verify` (rare; documented).

### 3.5 File Structure

```
src/
├── core/
│   ├── models/
│   │   ├── ZAIModel.ts
│   │   └── ZAIModel.contract.test.ts        # Tier 1 mandatory
│   ├── search/
│   │   ├── SearchProvider.ts
│   │   └── SearchProvider.contract.test.ts  # Tier 1 mandatory
│   └── ...
├── lib/
│   ├── db.ts
│   ├── db.schema.test.ts                    # Tier 1 mandatory
│   └── mimo/
│       ├── api.ts
│       └── api.contract.test.ts             # Tier 1 mandatory
├── components/
│   └── mimo/
│       ├── LeftRail.tsx
│       └── LeftRail.a11y.test.tsx           # Tier 1 mandatory (axe-core)
└── tests/
    ├── invariants.test.ts                   # Tier 1 mandatory (grep-based security)
    ├── adapter-isolation.test.ts            # Tier 1 mandatory
    └── golden-paths/                         # Tier 2 manual (Agent Browser scripts)
        ├── 01-chat.md
        ├── 02-memory.md
        └── ...
```

---

## 4. Test Data + Fixtures [TARGET]

### 4.1 Fixtures

- `tests/fixtures/conversations.ts` — sample conversations (small, medium, long 1000+ messages).
- `tests/fixtures/memories.ts` — sample memories (with all types + scopes).
- `tests/fixtures/knowledge.ts` — sample knowledge entities + relations.
- `tests/fixtures/artifacts.ts` — sample artifacts (each type).
- `tests/fixtures/users.ts` — sample user (single user).

### 4.2 Mocks

- `tests/mocks/zai-sdk.ts` — mocks `z-ai-web-dev-sdk` (chat, stream, image, search).
- `tests/mocks/prisma.ts` — in-memory Prisma mock (or use a real in-memory SQLite).
- `tests/mocks/event-bus.ts` — captures emitted events for assertions.

### 4.3 Seed DB

- `tests/seed.ts` — applies schema + inserts fixtures into a fresh in-memory SQLite DB. Used by integration + e2e tests.

---

## 5. Coverage Strategy [TARGET]

**Tier 1 (MANDATORY):** 100% coverage of:
- AI adapter contracts (all methods, all error paths).
- API route contracts (all routes, all error paths).
- Security invariants (all grep checks).
- A11y (all shell regions + overlays + panels — axe reports zero violations).
- Schema (all models, CRUD round-trip).

**Tier 3 (OPTIONAL):** Target 80% coverage of:
- Core engines (memory, knowledge, context, reasoner, planner, orchestrator, validator).
- Frontend stores (UI, Workspace, Session, Execution).
- Frontend hooks (useChat, useEventStream, useKeyboard).
- Utilities.

**Coverage is a guide, not a gate** — 80% with good test quality > 100% with bad tests. Don't write tests just to hit a number.

---

## 6. CI/CD Strategy [TARGET]

**[CURRENT]** No CI. [FACT — Audit §10.1]

**[TARGET v1]:** Pre-commit hook only (Tier 1). No remote CI.

**[TARGET v2 — when owner opts in]:** GitHub Actions (or equivalent):
- On PR: run Tier 1.
- On merge to main: run Tier 1 + Tier 3 (if opted in).
- Nightly: run Tier 2 (Agent Browser golden paths — automated via `agent-browser` skill).

**Why no CI in v1:** Single-user local-first. The owner's pre-commit hook is the gate. CI is for distributed teams; MiMo is one owner.

---

## 7. Performance Testing [TARGET]

See MiMo_Performance_Architecture.md for full budgets. Testing-relevant:

**Tier 2 (MANDATORY manual via Agent Browser):**
- Cold-launch first paint < 2s.
- ⌘K open < 80ms.
- Hold-Space peek < 100ms.
- Project switch < 200ms.
- First AI token < 1s.
- 1000+ messages ≥ 50fps.

**Tier 3 (OPTIONAL automated):**
- Playwright + `page.evaluate(() => performance.now())` for timing.
- Lighthouse CI for bundle size + LCP + FID.
- Custom metric: messages-per-second in conversation scroll.

---

## 8. Failure Modes + Test Failure Handling [TARGET]

### 8.1 Tier 1 failure → block commit

Pre-commit hook fails → commit blocked. Owner fixes the issue OR documents the bypass in `worklog.md` and uses `--no-verify`.

### 8.2 Tier 2 failure → block release

Owner cannot release if any golden path fails. Fix the regression first.

### 8.3 Tier 3 failure → informational

Owner sees test failures but they don't block. Track in `worklog.md`.

### 8.4 Flaky tests

Flaky tests (pass sometimes, fail others) are WORSE than no tests. Policy:
- If a Tier 1 test is flaky, mark it `test.skip` with a TODO + investigate.
- If a Tier 3 test is flaky, mark it `test.skip` with a TODO.
- Never tolerate flaky tests in the gate.

---

## 9. Migration Plan

| Phase | Action | Risk | Audit ref |
|---|---|---|---|
| T1 | Add `vitest` + `@axe-core/playwright` to `devDependencies` | Low | §10.1 |
| T2 | Add `vitest.config.ts` + `playwright.config.ts` | Low | §10.1 |
| T3 | Add `tests/invariants.test.ts` (grep-based security + adapter isolation) | Low | §4.1, §9 |
| T4 | Add `tests/mocks/zai-sdk.ts` + `tests/mocks/prisma.ts` + `tests/seed.ts` | Medium (Prisma mock is fiddly) | §10.1 |
| T5 | Add adapter contract tests (`ZAIModel.contract.test.ts`, `SearchProvider.contract.test.ts`) | Medium (need to know SDK contract) | §4.1 |
| T6 | Add API route contract tests (`api.contract.test.ts`) | Medium | §1.3 |
| T7 | Add schema tests (`db.schema.test.ts`) — requires domain schema first (State Architecture S1) | High (depends on data model) | §3.1 |
| T8 | Add axe-core a11y tests for each shell region + overlay + panel | Medium (need components to render correctly first) | §5.4 |
| T9 | Add `precommit` script + `.husky/pre-commit` hook | Low | §10.1 |
| T10 | Re-enable ESLint rules progressively (start with `no-explicit-any`, `no-unused-vars`, `no-console`) | High (many existing violations) | §10.2, migration risk #5 |
| T11 | Re-enable `tsconfig.json` `noImplicitAny: true` | High (many existing violations) | §1.1 |
| T12 | Set `next.config.ts` `typescript: { ignoreBuildErrors: false }` | High (existing errors will surface) | §1.1 |
| T13 | Add golden-path Agent Browser scripts in `tests/golden-paths/` | Low | §27.10 |
| T14 | (Optional Tier 3) Add unit tests for `lib/mimo/datetime.ts`, `lib/mimo/commands.ts`, `lib/utils.ts` | Low | §10.1 |
| T15 | (Optional Tier 3) Add integration tests for Core pipeline (mocked Model + Tools) | Medium | §10.1 |
| T16 | (Optional Tier 3) Add Playwright e2e tests for golden paths | Medium | §10.1 |

---

## 10. Anti-Patterns to Avoid [TARGET — forbidden]

1. **Tests that test the mock, not the system** — don't write tests that verify the mock returns what the mock is configured to return. Test the contract, not the implementation.
2. **Snapshot tests for everything** — snapshots catch changes but don't verify correctness. Use sparingly.
3. **100% coverage obsession** — coverage is a guide, not a gate.
4. **Flaky tests in the gate** — never.
5. **Tests that require network** — Tier 1 tests must run offline.
6. **Tests that require DB** — Tier 1 contract tests use mocks; only schema tests use real (in-memory) DB.
7. **Tests that take > 60s for Tier 1** — gate must be fast. If Tier 1 grows beyond 60s, split.
8. **Tests that don't fail when broken** — a test that always passes is worse than no test.
9. **Manual verification skipped because "tests pass"** — Tier 1 ≠ Tier 2. Both required.
10. **Tier 3 tests added to Tier 1 gate** — keep gates minimal. Tier 3 is opt-in.

---

## 11. Unknowns [UNKNOWN]

| # | Unknown | Why it matters |
|---|---|---|
| 1 | Will the owner accept Tier 1 mandatory automated tests, given the project rule "no test code"? | The project rule (Part 27.10) says "no test code." Tier 1 contract tests are technically test code. **[RESOLUTION]** Tier 1 is "automated gates for architectural invariants," not "test code for product behavior." The distinction is documented in §0. |
| 2 | Should Tier 1 tests live in `src/**/*.test.ts` (co-located) or `tests/**` (separate)? | Co-located is more discoverable; separate is cleaner. Decision: contract + schema + invariant tests in `tests/`; a11y tests co-located with components (`*.a11y.test.tsx`). |
| 3 | What's the ZAI SDK's actual streaming protocol? | Audit Unknown #2 — `ZAIModel.stream()` is untested. Need to verify before writing contract tests. |
| 4 | Will `next-test-api-route-handler` work with Next.js 16? | Need to verify — Next 16 is recent. |
| 5 | Can `@axe-core/playwright` test overlays that mount on keyboard shortcut? | Need to verify — likely yes (Playwright can synthesize keyboard events). |
| 6 | Should Tier 1 include a "build succeeds" gate even if `ignoreBuildErrors: true` is currently set? | YES — T12 sets `ignoreBuildErrors: false`. Until then, build gate is informational. |
| 7 | Will the owner opt into Tier 3? | [UNKNOWN] — Tier 3 is optional by design. Owner may never opt in, which is acceptable. |
| 8 | Are there security-sensitive tools in v1 that need mandatory tests? | WebSearch is the only external tool today (Audit §4.3). FileWrite + CodeExec are future. v1: WebSearch contract test is Tier 1. |
| 9 | What's the right axe-core tag set? | `wcag2a` + `wcag2aa` + `wcag21a` + `wcag21aa`. `wcag22aa` (2024) — TBD. |
| 10 | Should Tier 1 include a bundle-size budget? | Useful but not in v1 — owner can add later. |

---

## 12. Summary

**[CURRENT]** Zero tests. Lint disabled. TypeScript build errors ignored. Single-user local-first means no distributed-team CI pressure, BUT architectural safety still needs automated gates.

**[TARGET]** Three tiers:
- **Tier 1 (MANDATORY, ~60s, on every commit):** type check, lint, adapter contracts, schema tests, security invariants, a11y (axe-core), build. **~7 test categories.** Pre-commit hook.
- **Tier 2 (MANDATORY, manual, before every release):** 14 golden paths via Agent Browser + performance budgets + offline + reduced motion.
- **Tier 3 (OPTIONAL, owner opts in):** unit, integration, API, agent, tool, e2e, regression.

**This respects the project rule** (Part 27.10 — "no test code ... owner validates manually via Agent Browser") because:
- Tier 1 is **automated architectural gates** (type/lint/contract/schema/security/a11y/build), NOT "test code for product behavior."
- Tier 2 is **manual Agent Browser** — exactly what the project rule mandates.
- Tier 3 is **optional** — owner can opt in if/when they want, without violating the rule.

**[MIGRATION]** 16 phases (§9). Highest-risk: T7 (schema tests depend on Prisma domain schema — needs State Architecture S1 first), T10-T12 (re-enabling strict mode surfaces many existing errors).

The goal is **not** to build a comprehensive test suite. The goal is to **protect architectural invariants** while respecting the owner's primary verification method.

---

**End of MiMo_Testing_Architecture.md.**
