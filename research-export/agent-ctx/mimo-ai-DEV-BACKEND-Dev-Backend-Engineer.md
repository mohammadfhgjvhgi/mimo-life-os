# Task ID: DEV-BACKEND — Dev-Backend-Engineer Work Record

## Scope
Build the Development Workspace backend services in `src/core/dev/` and
the matching API routes in `src/app/api/dev/`. The frontend shell is
being written in parallel by DEV-FRONTEND (`src/components/dev/*`).

## Files Created

### Backend services (`src/core/dev/`)
1. `FileExplorerService.ts` — sandboxed file ops (list/read/write/move/
   delete/search) with sha256 + MIME detection. All paths go through
   `resolveSafePath` and writes through `validateWrite`. Mirrors state
   to DevFile table via upsert.
2. `LogService.ts` — DevLog persistence with secret redaction. Redacts
   values matching `sk-`, JWT, AWS keys, GitHub PATs, Slack tokens,
   `-----BEGIN ... PRIVATE KEY-----`, and any value whose KEY name
   matches `password|secret|api_key|token|authorization|...`.
3. `BuildSystem.ts` — `detectProjectType`, `getBuildCommand`,
   `runBuild`, `listBuilds`, `getBuild`. Uses executeRuntime with
   `workspacePath = project root`, `fsPolicy: 'read-write'`,
   `networkPolicy` from profile. Parses errors/warnings from output.
4. `TestRunner.ts` — `getTestCommand`, `runTests`, `listTestRuns`,
   `getTestRun`. Parses jest/vitest/mocha/pytest output formats.
5. `TerminalService.ts` — `executeCommand`, `listProcesses`,
   `killProcess`. Enforces `maxConcurrentProcesses` + `maxTimeoutMs`
   from profile limits. Each call creates a DevProcess row and a
   DevLog entry on the 'terminal' channel.
6. `GitIntegration.ts` — `getStatus`, `getDiff`, `getBranches`,
   `commit`, `getHistory`. Hard-blocks: `git push --force`,
   `git reset --hard`, `git clean -fd`, `git branch -D`,
   `git checkout -- .`. Uses `escapeShellArg` for safe commit
   messages.
7. `ResourceMonitor.ts` — `getMetrics`, `getProcessList`. Returns
   `null` for cpuPercent/memoryMb/uptime when no tracked PIDs OR
   non-Linux platform. Disk via `getProjectStats`. Real process count
   from DB.
8. `SnapshotEngine.ts` — `createSnapshot`, `listSnapshots`,
   `restoreSnapshot`, `deleteSnapshot`, `cloneProject`. Uses tar via
   executeRuntime. Verifies sha256 hash BEFORE restore. Atomic rename
   swap of project root.
9. `DevCodingAgent.ts` — `analyzeProject`, `proposeChange`,
   `applyChange`, `runWorkflow`. Uses `modelRegistry.default().chat()`
   to generate JSON proposals. All file mutations go through
   FileExplorerService. High-risk changes require explicit
   `approvedHighRisk` flag.
10. `index.ts` — barrel export.

### API routes (`src/app/api/dev/`)
- `_lib.ts` — shared helpers (kernel boot, projectId validation,
  SandboxError → HTTP status mapping).
- `projects/route.ts` — GET (list, ?archived=true), POST (create)
- `projects/[id]/route.ts` — GET, PATCH (update + archive), DELETE
- `projects/[id]/files/route.ts` — GET (tree, ?path=, ?q=search),
  POST (create file or dir)
- `projects/[id]/files/[...path]/route.ts` — GET (read), PUT (write
  or move), DELETE
- `projects/[id]/build/route.ts` — POST (trigger), GET (list)
- `projects/[id]/test/route.ts` — POST (trigger), GET (list)
- `projects/[id]/terminal/route.ts` — POST (exec), GET (list)
- `projects/[id]/git/route.ts` — GET (status), POST (action:
  status/diff/branches/history/commit)
- `projects/[id]/snapshot/route.ts` — GET (list), POST (create)
- `projects/[id]/snapshot/[snapshotId]/route.ts` — POST (restore),
  DELETE
- `projects/[id]/agent/route.ts` — POST (action: analyze/propose/
  apply/workflow)
- `projects/[id]/resources/route.ts` — GET (real metrics)
- `projects/[id]/logs/route.ts` — GET (query with filters)
- `projects/[id]/permissions/route.ts` — GET (list), PATCH (update)

## Key Decisions

- **All executeRuntime calls** pass `workspacePath = getProjectRoot(projectId)`
  and `fsPolicy: 'read-write'`. Network policy is `'restricted'` only if
  the profile allows network; otherwise `'none'`.
- **Profile enforcement** is at the service layer (BuildSystem,
  TestRunner, TerminalService, GitIntegration check
  `limits.allowProcessExec` / `allowGitAccess` / `maxConcurrentProcesses`
  before delegating to RuntimeGateway). This is defense-in-depth on top
  of RuntimeGateway's own checks.
- **Secret redaction** in LogService happens BEFORE the DevLog row is
  written — even if a caller passes `metadata: { apiKey: 'sk-...' }`,
  the persisted value will be `'[REDACTED]'`.
- **Snapshot integrity**: `restoreSnapshot` re-computes sha256 of the
  archive on disk and compares to the stored hash BEFORE doing any
  destructive rename. Hash mismatch → SandboxError, no swap.
- **Agent file paths**: `DevCodingAgent.applyChange` rejects absolute
  paths and `..` sequences early (defense-in-depth; FileExplorerService
  re-validates via SandboxManager).
- **CUID format validation** in routes via `requireValidProjectId`
  early-returns 404 on bad format.
- **SandboxError → HTTP status mapping**: `PROJECT_NOT_FOUND` → 404,
  `FORBIDDEN_PATH`/`PATH_TRAVERSAL`/`PROFILE_VIOLATION` → 403,
  `*_TOO_LARGE`/`*_EXCEEDED` → 413, `INTERNAL` → 500.
- **CPU/memory in ResourceMonitor**: returns `null` with a `note`
  when there are no tracked PIDs or the platform is non-Linux. NEVER
  returns fake/zero values.

## Limitations Encountered

1. **CPU% is approximate** — `ResourceMonitor` reads `/proc/<pid>/stat`
   once (snapshot, not delta) so the reported CPU% is "average over
   uptime since process start", not instantaneous. Real instantaneous
   CPU% would require a second sample after a sleep interval.
2. **`killProcess` is best-effort** — the DevProcess row is marked
   `killed`, but the underlying shell child may not be immediately
   reaped. RuntimeGateway's own timeout will clean up the child.
3. **`detectProjectType` is heuristic** — based on file presence
   (package.json → nextjs if "next" in deps else node; requirements.txt
   → python; index.html → static; else generic). Could be wrong for
   unusual setups.
4. **`getTestCommand` for nextjs/node uses `npm test`** — assumes
   a `test` script is defined in package.json. If not, npm errors out
   with "missing script: test", which is captured as a failed run.
5. **Frontend files (`src/components/dev/DevelopmentWorkspace.tsx`,
   `hooks.ts`, `state.ts`) currently have tsc + lint errors** — these
   are owned by DEV-FRONTEND (parallel agent). My backend code passes
   `bunx tsc --noEmit` and `bunx eslint` with ZERO errors when scoped
   to `src/core/dev` and `src/app/api/dev`. The dev.log shows missing
   modules `./DevInspector` and `./AICodingAgent` — frontend engineer
   is expected to deliver those.

## Verification

- `cd /home/z/my-project && bunx tsc --noEmit` — 0 errors in
  `src/core/dev/**` and `src/app/api/dev/**` (verified by grepping
  output).
- `cd /home/z/my-project && bunx eslint src/core/dev src/app/api/dev`
  — exits 0, no warnings.

Status: DEV-BACKEND COMPLETE.
