# Coding Agent

**Category:** Coding
**Status:** REQUIRED
**Maturity:** Mature (production-grade coding agents widely deployed 2024-2025)

## Definition
A **Coding Agent** is an autonomous agent that performs software-engineering work: reading and understanding a repository, writing new code, editing existing code, generating tests, debugging, refactoring, running builds/tests, and committing changes via Git. Unlike a code-completion assistant (Copilot-style autocomplete), it owns a task end-to-end: "implement feature X", "fix bug Y", "refactor module Z".

## Problem Solved
Raw LLMs can write a function but cannot:
- Navigate a real codebase (find the right file, understand conventions, respect imports).
- Make coordinated edits across multiple files.
- Run the build / tests to verify their change.
- Iterate when tests fail.
- Commit with a meaningful message and a sane diff.
- Avoid breaking unrelated code.

A coding agent wraps the LLM with repository context, file-editing tools, sandboxed execution, verification (build + test), and recovery. It closes the gap between "LLM suggests a snippet" and "LLM completes a PR".

## Why It Matters
MiMo AI is itself a software system being built; the Coding Agent is both an internal capability (MiMo improving its own code under controlled gates) and a user-facing capability (MiMo writing code for the user). It exercises the full layered runtime: Context (repo understanding), Memory (project conventions, past failures), Knowledge (codebase index), Reasoning + Planning (decompose task), Tool (file edit, build, test, git), Verification (test pass), Recovery (fix failing tests), Learning (record what worked).

## How It Works
Standard coding-agent loop (SWE-agent style):
1. **Task intake**: "Implement feature X" or "Fix failing test Y".
2. **Repository understanding**:
   - File tree overview.
   - Codebase index: embeddings + symbol index (LSP / ctags / tree-sitter AST).
   - Semantic search to locate relevant files / functions.
   - Read targeted files into context.
3. **Plan**: break task into edits ("modify auth.ts", "add test in auth.test.ts", "update README").
4. **Edit**: use file-editing tools (replace, insert, delete ranges, or full-rewrite). Track diff.
5. **Execute**: run build, lint, tests in sandbox.
6. **Verify**: tests pass? build succeeds? lint clean? If not, read failure output → debug → iterate.
7. **Commit**: stage diff, commit with conventional-commit message, optionally open PR.
8. **Report**: summary, diff link, test results, files changed.

**Repository representation strategies**:
- **Map-then-act**: first build a high-level map (file tree + key symbols), then act. Best for medium repos.
- **Embedding retrieval**: chunk files, embed, retrieve on demand. Best for large repos.
- **AST-aware**: tree-sitter parse; navigate by symbol. Best for precise refactors.
- **Hybrid**: combine all three.

**Edit strategies**:
- **Search-and-replace blocks** (Aider-style): precise, low-token, but brittle if whitespace differs.
- **Full-file rewrite**: simple, robust, expensive for large files.
- **Line-range replace**: balance of precision and robustness.
- **Tool API**: `edit_file(path, old_string, new_string)` with strict matching.

## Architecture
```
        ┌────────────────────────────────┐
        │  Coding Agent Loop             │
        │  (Plan → Edit → Build → Test   │
        │   → Verify → Iterate → Commit) │
        └────────────┬───────────────────┘
                     │
        ┌────────────▼─────────┐
        │ Repository Tools     │
        │ - file_read/write    │
        │ - search (grep/AST)  │
        │ - semantic_search    │
        │ - git_*              │
        └────────────┬─────────┘
                     │
        ┌────────────▼─────────┐
        │ Sandbox Execution    │
        │ (build/test/lint)    │
        └────────────┬─────────┘
                     │
        ┌────────────▼─────────┐
        │ Verification Layer   │
        │ (tests pass? lint?)  │
        └──────────────────────┘
```

## Interfaces
- **Inputs**: task description, target repo path, branch, constraints (don't touch X, follow convention Y), success criteria (tests pass).
- **Outputs**: diff, commit hash, PR link, test results, summary, files changed, verification status.
- **Internal tools**: `repo.map`, `file.read`, `file.search` (regex/AST), `file.semantic_search` (embeddings), `file.edit`, `shell.exec` (sandboxed), `git.status/diff/commit/push/branch`, `test.run`.
- **Real-time events** (socket.io): `coding:plan`, `coding:edit`, `coding:test_run`, `coding:test_result`, `coding:commit`, `coding:done`.

## Dependencies
- **LLM** (GLM-5.2 via Model Gateway) for reasoning/planning/editing.
- **Codebase index**: embeddings (local or via z-ai-web-dev-sdk embeddings) + BM25 + symbol index (tree-sitter or LSP).
- **Sandbox**: Docker/Firecracker/gVisor for `shell.exec`, `test.run` (mandatory for security).
- **Git**: `isomorphic-git` (pure JS) or shell `git`.
- **Language tooling**: per-language linters/formatters/test runners (eslint, prettier, tsc, jest, pytest, go test, cargo, etc.) baked into sandbox images.
- **Tree-sitter** (optional but recommended) for AST-aware editing.

## Strengths
- End-to-end ownership: from "fix this bug" to merged PR.
- Iterative verification: tests catch mistakes; agent self-corrects.
- Composable with MiMo's layered runtime (Memory, Knowledge, Verification, Recovery).
- Drives the project forward autonomously under controlled gates.
- Useful for both user tasks and (carefully gated) self-improvement of MiMo itself.

## Weaknesses
- **Context window pressure**: large repos don't fit; need good retrieval.
- **Hallucinated APIs**: model invents functions that don't exist; mitigated by running build/test.
- **Test-driven collapse**: if tests are weak, agent produces plausible-but-wrong code.
- **Style drift**: model may not match project conventions; mitigated by examples in context + linters.
- **Expensive**: many model calls per task; large diffs are token-heavy.
- **Sandbox complexity**: per-language build environments are non-trivial to maintain.
- **Verification is fuzzy for non-code artifacts** (docs, configs) — no test to run.
- **Refactoring risk**: large refactors can break unrelated tests; need regression suites.

## Failure Modes
- **Wrong file edited** → noise, no fix. Mitigation: confirmation step + diff review.
- **Infinite loop** (agent keeps tweaking failing test). Mitigation: iteration cap; escalate.
- **Test override**: agent weakens tests to make them pass (rare but documented). Mitigation: test immutability for some suites; review diff.
- **Build env mismatch**: works in agent's sandbox but fails in CI. Mitigation: pin env versions; mirror CI.
- **Secrets leak into code**: agent writes API keys it saw in env. Mitigation: never expose secrets to agent; secret scanner pre-commit.
- **Hallucinated dependency**: agent adds a non-existent package. Mitigation: package install dry-run + verification.
- **Large PR**: agent touches 50 files when 5 suffice. Mitigation: scope constraints in task prompt.
- **Prompt injection from code**: malicious code in repo (e.g. comments telling agent to exfiltrate). Mitigation: prompt-injection defense.

## Security Implications
- **Sandbox is mandatory**: never run agent-generated or agent-executed code outside a sandboxed container with no network access (except approved package mirrors), no host filesystem, no secrets.
- **Secrets**: never expose user/system secrets to the coding agent. Use scoped env vars; inject only what tests need.
- **Git push**: requires approval gate for pushes to protected branches; commits to local feature branches OK.
- **Dependency installation**: package install can run arbitrary postinstall scripts — restrict to approved package mirrors; disable postinstall where possible; scan packages.
- **Filesystem scope**: agent may only touch the target repo path; no escape via symlinks.
- **Network**: build/test sandbox typically has no network egress except for package mirrors.
- **Audit**: every file edit, shell command, git op logged.
- **Code review**: agent PRs go through standard review (possibly a Verifier agent + human approval for risky changes).
- **Self-modification of MiMo**: special-case — must go through evaluation + regression + approval + rollback gates before merging to main (see `PROJECT_UNDERSTANDING.md` controlled self-improvement).

## Performance Implications
- Token-heavy: repo context + edits + test output can be 50k-500k tokens per task.
- Latency: 1-10 minutes per task; long-horizon tasks (multi-file refactors) can take 30+ minutes.
- Compute: sandbox build/test runs consume CPU/RAM; parallelize across tasks.
- Cost: per-task model cost $0.05-$5 depending on task size and model.

## Operational Implications
- Need a **CodebaseIndex** service: chunk + embed + symbol-index a repo; incremental update on file change.
- Need a **SandboxPool**: pre-warm Docker containers per language; recycle after each task.
- Need a **CodingTask** store (Prisma): task, plan, edits, commits, test results, status, cost.
- Need a **diff review UI**: side-by-side diff, approval button, comments.
- Need **language images**: per-language Docker images with pinned toolchains.
- Need **metrics**: task success rate, test pass rate, files changed, iterations, cost per task.
- Need **regression suites**: MiMo's own codebase has tests the agent must not break.

## Alternatives
- **Aider**: popular open-source coding agent (Python); pair-programmer style.
- **SWE-agent** (Princeton): research framework; influential action-space design.
- **Cursor / Continue / Cline**: IDE-integrated; less autonomous, more interactive.
- **Devin / Factory / OpenHands (formerly OpenDevin)**: cloud-based autonomous coding agents.
- **Claude Code / Codex CLI**: vendor CLI agents.
- **Custom loop on MiMo's agent runtime**: most control, most leverage; recommended given MiMo already has the runtime layers.

## Maturity & Production Readiness
- Production-grade for well-scoped, well-tested codebases with good test coverage.
- Still weak on: large legacy codebases, novel languages, complex refactors, ambiguous requirements.
- Expect 60-90% success on well-defined tasks; design for failure + escalation.

## Relevant Research / Papers
- "SWE-agent: Agent-Computer Interfaces Enable Software Engineering Language Models" (Yang et al., 2024).
- "RepoBench: Benchmarking Repository-Level Code-Completion" (Liu et al., 2023).
- "RepoCoder: Repository-Level Code Completion Through Iterative Retrieval and Generation" (Zhang et al., 2023).
- "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?" (Jimenez et al., 2023).
- "CodeRAGBench: Retrieval-Augmented Code Generation Benchmark" (Wang et al., 2024).

## Official Documentation
- Aider: https://aider.chat
- OpenHands: https://github.com/All-Hands-AI/OpenHands
- SWE-agent: https://github.com/princeton-nlp/SWE-agent
- tree-sitter: https://tree-sitter.github.io/tree-sitter/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: agent loop, sandbox, git ops all server-side; UI is just a console over socket.io.
- Use **GLM-5.2 via Model Gateway** for reasoning/planning/editing.
- Use **z-ai-web-dev-sdk embeddings** (if available; otherwise local sentence-transformers via Ollama) for codebase semantic search.
- **Sandbox**: Docker per-language image (TS/Node, Python, Go, Rust, etc.) with pinned toolchains, no network egress except package mirror; `isomorphic-git` for git ops.
- Persist `CodingTask`, `CodeEdit`, `Commit`, `TestRun` in Prisma/SQLite.
- Stream events via socket.io: plan, each edit, test runs, commit.
- Approval Center: PRs to protected branches require user approval; diff review UI.
- **Self-improvement mode** (special): agent edits MiMo's own code → extra gates (regression suite, evaluation, approval, rollback) before merge.
- Tree-sitter for AST-aware editing and symbol indexing.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Agent Layer (Layer 8)** as a specialist agent (Coding Agent).
- Heavy user of **Tool Layer (Layer 9)**: file ops, shell, git, sandbox.
- Heavy user of **Knowledge Layer (Layer 4)**: codebase index, semantic search.
- Wrapped by **Verification Layer (Layer 11)**: tests must pass.
- Wrapped by **Recovery Layer (Layer 12)**: iterate on test failures.
- Special path to **Learning Layer (Layer 13)**: record what fixes worked → skill memory.
- For **controlled self-improvement**, integrates with **Evaluation Layer (Layer 15)**: regression + benchmark before merge.

## Recommended Usage
- ADOPT a custom coding agent on MiMo's runtime, drawing patterns from SWE-agent (action space) and Aider (edit format).
- Mandatory sandbox for code execution; no secrets in sandbox.
- Mandatory verification (build + tests) before "done".
- Approval gates for: pushes to protected branches, dependency changes, schema migrations, infra-as-code changes.
- For self-modification of MiMo: extra regression + evaluation + rollback gates.

## Decision
**ADOPT** — REQUIRED specialist agent. Custom loop on MiMo runtime, sandboxed execution, verification mandatory, approval gates for risky changes. Self-improvement mode requires the full evaluation/approval/rollback chain.

## Sources
- SWE-agent paper (Yang et al., 2024) — action-space design.
- SWE-bench (Jimenez et al., 2023) — task benchmark.
- RepoCoder / RepoBench / CodeRAGBench — repo-level retrieval.
- Aider / OpenHands / SWE-agent documentation.
- OWASP Agentic threats (inferred applicability to code-execution sandboxing).
