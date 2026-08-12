# OpenAI Codex (CLI + Cloud + IDE) — Evidence File (W2 / Phase R2)

**Product:** OpenAI Codex (suite: Codex CLI, Codex Cloud, Codex IDE extension, Codex Web)
**Vendor:** OpenAI
**Role:** Cross-platform local software agent + cloud-based coding agents + IDE extension
**Research date:** 2025-08-07
**Researcher:** W2 agent (general-purpose)
**Method:** (a) **Installed Codex CLI v0.147.0 via `npm i -g @openai/codex`** — `codex --help`, `codex exec --help`, `codex sandbox --help` are direct observations. (b) GitHub README at raw.githubusercontent.com/openai/codex/main/README.md — fully extracted. (c) Wayback Machine for developers.openai.com/codex/* (live site blocks curl with a 59-byte challenge page). Extracted slash commands, security, AGENTS.md, agent-loop blog. (d) Could NOT run interactive agent (requires ChatGPT auth).

---

## 1. Product Overview

- **Codex is a SUITE** of three offerings: "at OpenAI, 'Codex' encompasses a suite of software agent offerings, including Codex CLI, Codex Cloud, and the Codex VS Code extension." [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- **Codex CLI:** "is a coding agent from OpenAI that runs locally on your computer." [Source: https://raw.githubusercontent.com/openai/codex/main/README.md, accessed 2025-08-07]
- **Codex CLI install:** `npm install -g @openai/codex` (or `curl -fsSL https://chatgpt.com/codex/install.sh | sh` on Mac/Linux; `brew install --cask codex` via Homebrew; PowerShell on Windows). [Source: README.md, accessed 2025-08-07]
- **Installed version:** `codex-cli 0.1.47` [Observed: `codex --version`, 2025-08-07]
- "Codex in ChatGPT is a command center for agentic coding. With built-in worktrees and cloud environments, agents work in parallel across projects, completing tasks, reviewing work, and opening pull requests." [Source: https://openai.com/codex (Wayback), accessed 2025-08-07]
- "Codex CLI is our cross-platform local software agent, designed to produce high-quality, reliable software changes while operating safely and efficiently on your machine." [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- "Codex SDK: Embed the same agent that powers the Codex CLI into your own workflows, tools, and apps for state-of-the-art performance on GPT-5" [Source: https://openai.com/index/codex-now-generally-available (search snippet), accessed 2025-08-07]
- "Codex Web" is the cloud-based agent at chatgpt.com/codex. [Source: README.md, accessed 2025-08-07]

## 2. Product Philosophy

- **Safety-first by default.** "Codex helps protect your code and data and reduces the risk of misuse. By default, the agent runs with network access turned off and can write only inside the current workspace, whether locally or in the cloud." [Source: https://developers.openai.com/codex/security (Wayback), accessed 2025-08-07]
- **OS-level sandboxing is foundational**, not optional. macOS uses Seatbelt + sandbox-exec; Linux uses Landlock + seccomp; Windows uses WSL. [Source: same]
- **The agent loop is the product.** "At the heart of every AI agent is something called 'the agent loop.'" Engineering blog focuses on the loop, not features. [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- "Because the agent can execute tool calls that modify the local environment, its 'output' is not limited to the assistant message. In many cases, the primary output of a software agent is the code it writes or edits on your machine." [Source: same]
- **Two layers explicitly separated:** "the agent (or 'harness')" vs "the model." The harness orchestrates; the model reasons. [Source: same]
- "We've learned a tremendous amount about how to build a world-class software agent since we first launched the CLI in April." — first CLI launch April 2025. [Source: same]
- "Many of the finer details of our design decisions are memorialized in GitHub issues and pull requests if you'd like to learn more." — open-source development culture. [Source: same]

## 3. Core Mental Model

- **Local agent + cloud agent + IDE extension = unified harness.** "This post focuses on the Codex harness, which provides the core agent loop and execution logic that underlies all Codex experiences and is surfaced through the Codex CLI." [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- **Agent loop = user input → prompt → model inference → tool calls → loop → assistant message.** "This process repeats until the model stops emitting tool calls and instead produces a message for the user." [Source: same]
- **Turn = one user-message-to-assistant-message cycle**, which can include many tool calls. "Every time you send a new message to an existing conversation, the conversation history is included as part of the prompt for the new turn." [Source: same]
- **Mental model = software engineer that writes code, not a chatbot that answers questions.** "primary output of a software agent is the code it writes or edits on your machine." [Source: same]
- **CLI is the primary surface.** Even though there's an IDE extension and Cloud, the harness ships first in the CLI. [Source: same]

## 4. User Journey

- **Install (Mac/Linux):** `curl -fsSL https://chatgpt.com/codex/install.sh | sh` [Source: README.md, accessed 2025-08-07]
- **Install (Windows):** `powershell -ExecutionPolicy ByPass -c "irm https://chatgpt.com/codex/install.ps1 | iex"` [Source: same]
- **Install (npm):** `npm install -g @openai/codex` [Observed: succeeded, 2025-08-07]
- **Install (Homebrew):** `brew install --cask codex` [Source: README.md, accessed 2025-08-07]
- **Auth:** "Run `codex` and select 'Sign in with ChatGPT'. We recommend signing into your ChatGPT account to use Codex as part of your Plus, Pro, Business, Edu, or Enterprise plan." [Source: README.md, accessed 2025-08-07]
- **Alternative auth:** "You can also use Codex with an API key, but this requires additional setup." [Source: same]
- **First-run:** `codex` opens interactive TUI. Slash popup on `/`. [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback), accessed 2025-08-07]
- **Onboarding flow:** "On launch, Codex detects whether the folder is version-controlled and recommends: Version-controlled folders: Auto (workspace write + on-request approvals). Non-version-controlled folders: read-only." [Source: https://developers.openai.com/codex/security (Wayback), accessed 2025-08-07]
- **Daily flow:** `codex` (interactive) or `codex exec [PROMPT]` (non-interactive, pipeable). [Observed: `codex --help`, 2025-08-07]
- **Long-term:** AGENTS.md accumulates per-directory. Config at `~/.codex/config.toml`. [Source: https://developers.openai.com/codex/guides/agents-md (Wayback), accessed 2025-08-07]
- **Power endpoint:** `codex cloud` (browse tasks from Codex Cloud and apply changes locally), `codex resume --last` (resume most recent session), `codex fork` (fork a previous session), `codex archive` / `unarchive` / `delete`. [Observed: `codex --help`, 2025-08-07]

## 5. Navigation

- **TUI navigation:** Slash popup on `/` in the composer. Slash commands listed with name + purpose + when-to-use. [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback), accessed 2025-08-07]
- **Session picker:** `codex resume` opens picker by default; `--last` continues most recent. [Observed: `codex --help resume`, 2025-08-07]
- **Cloud task browsing:** `codex cloud` [experimental]. [Observed, 2025-08-07]
- **Working root:** `--cd <DIR>` tells the agent to use the specified directory as its working root. [Observed: `codex exec --help -C --cd`, 2025-08-07]
- **Additional dirs:** `--add-dir <DIR>` for writable directories alongside primary workspace. [Observed, 2025-08-07]
- **No file tree / sidebar** (TUI). File navigation via tool calls (Read, Glob, Grep inherited from agent loop).

## 6. Workspace

- **Working directory = workspace.** Default: current directory. Override: `--cd <DIR>`. Extend: `--add-dir <DIR>`. [Observed: `codex exec --help`, 2025-08-07]
- **Sandbox workspace:** `/status` shows which directories are in the workspace. [Source: https://developers.openai.com/codex/security (Wayback), accessed 2025-08-07]
- **`/tmp` is in the workspace** by default. [Source: same]
- **Cloud environments:** "Codex cloud: Runs in isolated OpenAI-managed containers, preventing access to your host system or unrelated data." [Source: same]
- **IDE extension:** Codex VS Code extension (separate from CLI). [Source: README.md, accessed 2025-08-07]
- **No split view** in TUI.
- **`codex sandbox`** subcommand: run commands within a Codex-provided sandbox (macOS `sandbox-exec` profile, Linux Landlock+seccomp). [Observed: `codex sandbox --help`, 2025-08-07]

## 7. Conversation

- **Interactive TUI:** conversation + composer + slash popup. [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback), accessed 2025-08-07]
- **Streaming output:** "Because tokens are produced incrementally, this translation can happen as the model runs, which is why many LLM-based applications display streaming output." [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- **Compact:** `/compact` "Summarize the visible conversation to free tokens. Use after long runs so Codex retains key points without blowing the context window." [Source: slash commands docs, accessed 2025-08-07]
- **New conversation:** `/new` "Start a new conversation inside the same CLI session. Reset the chat context without leaving the CLI when you want a fresh prompt in the same repo." [Source: same]
- **Resume:** `codex resume` (picker), `codex resume --last` (most recent), `codex fork` (fork a session). [Observed: `codex --help`, 2025-08-07]
- **Mention files:** `/mention src/lib/api.ts` "Attach a file to the conversation. Point Codex at specific files or folders you want it to inspect next." [Source: slash commands docs, accessed 2025-08-07]
- **Undo:** `/undo` "Revert Codex's most recent turn. Roll back an unwanted edit or command run." [Source: same]
- **Diff:** `/diff` "Show the Git diff, including files Git isn't tracking yet. Review Codex's edits before you commit or run tests." [Source: same]
- **Session lifecycle:** `codex archive`, `codex delete`, `codex unarchive` for session management. [Observed: `codex --help`, 2025-08-07]
- **Ephemeral:** `codex exec --ephemeral` "Run without persisting session files to disk." [Observed, 2025-08-07]
- **Image attachment:** `-i, --image <FILE>...` "Optional image(s) to attach to the initial prompt." [Observed, 2025-08-07]

## 8. Agent Experience

- **Agent loop is the agent.** No separate "Agent" panel — the TUI conversation IS the agent. [Observed + inferred from docs]
- **Agent loop diagram** (described in blog): "Diagram titled 'Agent loop' illustrating how an AI system processes a user request, calls tools, observes results, updates its plan, and returns outputs. Arrows connect steps such as user input, model reasoning, tool actions, and final response." [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- **Default tools:** "Codex's default shell tool (https://github.com/openai/codex/blob/99f47d6e9a3546c14c43af99c7a58fa6bd130548/codex-rs/core/src/tools/spec.rs#L278-L340) for spawning new processes locally. Runs a shell command and returns its output." [Source: same]
- **Plan tool:** "Codex's built-in plan tool (https://github.com/openai/codex/blob/99f47d6e9a3546c14c43af99c7a58fa6bd130548/codex-rs/core/src/tools/handlers/plan.rs#L20-L60)." [Source: same]
- **Web search tool:** "Web search tool provided by the Responses API." [Source: same]
- **Tool calls are visible** in the conversation transcript.
- **`/status` shows** the active model, approval policy, writable roots, and current token usage. [Source: slash commands docs, accessed 2025-08-07]
- **Multiple agents:** Cloud supports parallel agents in different environments. [Source: https://openai.com/codex (Wayback), accessed 2025-08-07]
- **`codex exec`** for non-interactive runs. `codex review` for code review. [Observed: `codex --help`, 2025-08-07]
- **MCP server:** `codex mcp-server` starts Codex as an MCP server (stdio). [Observed, 2025-08-07]

## 9. Memory

- **AGENTS.md** is the memory file format. [Source: https://developers.openai.com/codex/guides/agents-md (Wayback), accessed 2025-08-07]
- **Global scope:** `~/.codex/AGENTS.md` (or `AGENTS.override.md` for temporary overrides). `CODEX_HOME` env var changes this. [Source: same]
- **Project scope:** "Starting at the repository root, Codex walks down to your current working directory. In each directory, it checks for AGENTS.override.md, then AGENTS.md, then any fallback names in project_doc_fallback_filenames. Codex includes at most one file per directory." [Source: same]
- **Merge order:** "Codex concatenates files from the root down. Files closer to your current directory override earlier guidance because they appear later in the combined prompt." [Source: same]
- **Size cap:** "Codex skips empty files and stops adding files once the combined size reaches the limit defined by project_doc_max_bytes (32 KiB by default)." [Source: same]
- **Custom fallback filenames:** `project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]` in config.toml. [Source: same]
- **No auto memory** (vs. Claude Code's auto memory). Manual AGENTS.md only.
- **/init** slash command: "Generate an AGENTS.md scaffold in the current directory. Capture persistent instructions for the repository or subdirectory you're working in." [Source: slash commands docs, accessed 2025-08-07]
- **No rebuild on the fly:** "Codex rebuilds the instruction chain on every run, so there is no cache to clear manually." [Source: https://developers.openai.com/codex/guides/agents-md (Wayback), accessed 2025-08-07]
- **Subagents / hooks** not directly documented in AGENTS.md page; Codex supports hooks per `~/.codex/config.toml` `allow_managed_hooks_only` flag. [Source: GitHub repo docs/config.md, accessed 2025-08-07]

## 10. Knowledge (Context Engine)

- **Codex uses the OpenAI Responses API** for model inference. "The Codex CLI sends HTTP requests to the Responses API to run model inference." [Source: https://openai.com/index/unrolling-the-codex-agent-loop (Wayback), accessed 2025-08-07]
- **Configurable endpoint:** "The Responses API endpoint that the Codex CLI uses is configurable, so it can be used with any endpoint that implements the Responses API." [Source: same]
  - ChatGPT login: `https://chatgpt.com/backend-api/codex/responses` [Source: same]
  - API-key auth (OpenAI hosted): `https://api.openai.com/...` [Source: same]
- **OSS providers:** `--oss` flag with `--local-provider lmstudio|ollama`. [Observed: `codex --help`, 2025-08-07]
- **Context window management:** "an agent could decide to make hundreds of tool calls in a single turn, potentially exhausting the context window. For this reason, context window management is one of the agent's many responsibilities." [Source: agent-loop blog, accessed 2025-08-07]
- **No embedding/RAG engine documented** (vs. Windsurf's RAG-based context engine). Codex relies on file reading + Grep + AGENTS.md.

## 11. Search

- **`/mention` slash command:** "Attach a file to the conversation. Point Codex at specific files or folders you want it to inspect next." [Source: slash commands docs, accessed 2025-08-07]
- **`/mcp` slash command:** "List configured Model Context Protocol (MCP) tools. Check which external tools Codex can call during the session." [Source: same]
- Built-in tools (shell, plan, web search) — no separate "search" tool documented.
- Standard file navigation via shell commands (`ls`, `grep`, `find`) — agent uses Bash-equivalent.

## 12. Execution

- **Shell tool** for command execution. [Source: agent-loop blog, accessed 2025-08-07]
- **Plan tool** for planning. [Source: same]
- **Web search tool** via Responses API. [Source: same]
- **MCP servers** for external tools (GitHub, Slack, Linear per docs nav). [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback) — nav references GitHub/Slack/Linear integrations, accessed 2025-08-07]
- **Sandbox modes:** read-only, workspace-write, danger-full-access. [Observed: `codex --help -s --sandbox`, 2025-08-07]
- **Approval modes:** Auto (preset), Read-only, untrusted, never, on-request. [Source: https://developers.openai.com/codex/security (Wayback), accessed 2025-08-07]
- **`--approve-for-me`** routes approval requests through automatic review using the workspace-write sandbox. [Observed: `codex --help`, 2025-08-07]
- **`--dangerously-bypass-approvals-and-sandbox`** (alias: `--yolo`). [Source: security docs (Wayback), accessed 2025-08-07]
- **`--dangerously-bypass-hook-trust`** "Run enabled hooks without requiring persisted hook trust for this invocation." [Observed: `codex --help`, 2025-08-07]
- **Config override:** `-c, --config <key=value>` overrides any value from `~/.codex/config.toml`. Supports dotted paths (`foo.bar.baz`). [Observed, 2025-08-07]
- **Feature flags:** `--enable <FEATURE>` / `--disable <FEATURE>` (repeatable). [Observed, 2025-08-07]
- **Profiles:** `-p, --profile <CONFIG_PROFILE_V2>` layers `$CODEX_HOME/<name>.config.toml` on top of base user config. [Observed, 2025-08-07]
- **Codex SDK:** "Codex SDK: Embed the same agent that powers the Codex CLI into your own workflows, tools, and apps." [Source: https://openai.com/index/codex-now-generally-available (search snippet), accessed 2025-08-07]
- **GitHub Action:** Codex ships a GitHub Action (per docs nav). [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback) nav, accessed 2025-08-07]

## 13. Artifacts

- **`/diff`** shows the Git diff including untracked files. [Source: slash commands docs, accessed 2025-08-07]
- **`/undo`** reverts the most recent turn (including reverting file changes). [Source: same]
- **`/review`** asks Codex to review the working tree. [Source: same]
- **AGENTS.md** files in repository. [Source: AGENTS.md docs, accessed 2025-08-07]
- **Plan files** (built-in plan tool produces them). [Source: agent-loop blog, accessed 2025-08-07]
- **PRs from Cloud agents.** [Source: https://openai.com/codex (Wayback), accessed 2025-08-07]
- **Session files** (saved unless `--ephemeral`). [Observed: `codex exec --help`, 2025-08-07]
- **`codex apply`** subcommand: "Apply the latest diff produced by Codex agent as a `git apply` to your local working tree." [Observed: `codex --help`, 2025-08-07]

## 14. Keyboard UX

- **Slash popup** on `/` in the composer. "Type / in the composer to open the slash popup, choose a command, and Codex will perform actions such as switching models, adjusting approvals, or summarizing long conversations without leaving the terminal." [Source: slash commands docs, accessed 2025-08-07]
- **Slash command filtering:** "Open the slash popup and start typing the command name to filter the list." [Source: same]
- **Built-in slash commands:** `/approvals`, `/compact`, `/diff`, `/exit`, `/feedback`, `/init`, `/logout`, `/mcp`, `/mention`, `/model`, `/new`, `/quit`, `/review`, `/status`, `/undo`. [Source: same]
- **Custom prompts:** "To create your own reusable prompts that behave like slash commands (invoked as `/prompts: <name>`), see Custom Prompts." [Source: same]
- Terminal-native: keyboard-first by definition.
- **Search:** `Search ⌘ K` mentioned in nav (likely Cmd-K for command palette in IDE extension). [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback) — nav snippet shows "Search ⌘ K", accessed 2025-08-07]

## 15. Motion

- TUI: minimal motion by default. No published motion specs.
- Slash popup implies a small dropdown animation.
- Streaming output is the primary "animation" (token-by-token).

## 16. Animation

- No published easing/durations.
- Streaming tokens = primary animated element.
- Slash popup open/close (timing not documented).

## 17. Visual Hierarchy

- TUI: conversation transcript dominates; composer at bottom; slash popup overlays composer on `/`. [Inferred from slash commands docs description]
- **`/status`** output: model, approval policy, writable roots, token usage — gives a "where am I" snapshot. [Source: slash commands docs, accessed 2025-08-07]
- **Tool calls visible** inline in transcript (assumed; standard for agentic TUIs).
- **Approval prompts** are visual focus points when in `on-request` or `untrusted` mode.

## 18. Progressive Disclosure

- **Sandbox preset detection on launch:** "On launch, Codex detects whether the folder is version-controlled and recommends: Version-controlled folders: Auto (workspace write + on-request approvals). Non-version-controlled folders: read-only." [Source: security docs (Wayback), accessed 2025-08-07]
- **Slash commands as progressive disclosure:** "Type / in the composer to open the slash popup, choose a command." Commands listed with purpose + when-to-use. [Source: slash commands docs, accessed 2025-08-07]
- **Approval modes from strict to loose:** read-only → untrusted → on-request → never. [Source: security docs, accessed 2025-08-07]
- **Custom prompts** layer on top of built-in slash commands. [Source: slash commands docs, accessed 2025-08-07]
- **Configuration layering:** `~/.codex/config.toml` (base) → `<name>.config.toml` (profile) → `-c` overrides (CLI). [Observed: `codex --help`, 2025-08-07]
- **Feature flags** for experimental features. [Observed, 2025-08-07]
- **Skills** (per docs nav — "Overview, Create skills"). [Source: https://developers.openai.com/codex/cli/slash-commands (Wayback) — nav "Skills: Overview, Create skills", accessed 2025-08-07]

## 19. Accessibility

- **No explicit a11y flag** (vs. Claude Code's `--ax-screen-reader`). [Observed: absence in `codex --help`, 2025-08-07]
- Terminal-native = inherently text-based, screen-reader compatible by default.
- No a11y statements in docs.
- IDE extension inherits VS Code a11y baseline.

## 20. Performance Perception

- **Streaming output** for perceived speed. [Source: agent-loop blog, accessed 2025-08-07]
- **`--approve-for-me`** "Route approval requests through automatic review using the workspace-write sandbox" — reduces human-in-loop latency. [Observed: `codex --help`, 2025-08-07]
- **Cloud agents** for parallel execution. [Source: https://openai.com/codex (Wayback), accessed 2025-08-07]
- **OpenTelemetry** for performance monitoring: "Codex supports opt-in monitoring via OpenTelemetry (OTEL) to help teams audit usage, investigate issues, and meet compliance requirements." Event categories include `codex.api_request` and `codex.sse_event` (durations, status, token counts). [Source: security docs (Wayback), accessed 2025-08-07]
- **Codex cloud setup phase:** "Network access is always enabled during the setup phase, which runs before the agent has access to your code." — implies setup latency before agent starts. [Source: same]

## 21. Trust

- **Default deny:** "By default, the agent runs with network access turned off and can write only inside the current workspace, whether locally or in the cloud." [Source: security docs (Wayback), accessed 2025-08-07]
- **Three sandbox modes:** `read-only`, `workspace-write`, `danger-full-access`. [Observed: `codex --help -s --sandbox`, 2025-08-07]
- **OS-level enforcement:**
  - macOS: "Seatbelt policies and runs commands using sandbox-exec with a profile (-p) that corresponds to the --sandbox mode you selected." [Source: security docs, accessed 2025-08-07]
  - Linux: "Landlock and seccomp to enforce the sandbox configuration." [Source: same]
  - Windows: "uses the Linux sandbox implementation when running in WSL. When running natively on Windows, you can enable an experimental sandbox implementation." [Source: same]
- **Approval policies:**
  - `Auto` (preset): "Codex can read files, make edits, and run commands in the workspace. Codex asks for approval to run commands outside the sandbox." [Source: same]
  - `Read-only`: "Codex can only read files; never asks for approval." [Source: same]
  - `Automatically edit but ask for approval to run untrusted commands`: `--sandbox workspace-write --ask-for-approval untrusted`. [Source: same]
  - `Dangerous full access`: `--dangerously-bypass-approvals-and-sandbox` (alias: `--yolo`). [Source: same]
- **`/approvals`** slash command to switch modes mid-session. [Source: slash commands docs, accessed 2025-08-07]
- **`/undo`** to revert most recent turn (including file changes). [Source: same]
- **`/diff`** to inspect changes before committing. [Source: same]
- **Version control recommendation:** "Work on a feature branch and keep git status clean before delegating. This keeps Codex patches easier to isolate and revert. Prefer patch-based workflows (for example, git diff / git apply) over editing tracked files directly. Commit frequently so you can roll back in small increments." [Source: security docs, accessed 2025-08-07]
- **Telemetry off by default** (opt-in OTEL). "Codex turns off OTEL export by default to keep local runs self-contained." [Source: same]
- **Prompt injection warning:** "Use caution when enabling network access or web search in Codex. Prompt injection can cause the agent to fetch and follow untrusted instructions." [Source: same]
- **Codex cloud isolation:** "isolated OpenAI-managed containers, preventing access to your host system or unrelated data." [Source: same]

## 22. Explainability

- **`/status`** shows active model, approval policy, writable roots, token usage. [Source: slash commands docs, accessed 2025-08-07]
- **`/diff`** shows what changed. [Source: same]
- **`/review`** "Run after Codex completes work or when you want a second set of eyes on local changes." [Source: same]
- **Plan tool** (built-in) produces plans. [Source: agent-loop blog, accessed 2025-08-07]
- **Audit log:** "~/.codex/log/codex-tui.log (or the most recent session-*.jsonl file if you enabled session logging) after a session if you need to audit which instruction files Codex loaded." [Source: AGENTS.md docs (Wayback), accessed 2025-08-07]
- **Verification commands:** `codex --ask-for-approval never "Summarize the current instructions."` to verify AGENTS.md loading. [Source: same]
- **Per-event OTEL categories:** `codex.conversation_starts`, `codex.api_request`, `codex.sse_event`, `codex.user_prompt` (length; content redacted unless enabled), `codex.tool_*`. [Source: security docs, accessed 2025-08-07]
- **No "why did the agent do X" introspection panel** documented.

## 23. Long Session Experience

- **`/compact`** for context preservation: "Summarize the visible conversation to free tokens. Use after long runs so Codex retains key points without blowing the context window." [Source: slash commands docs, accessed 2025-08-07]
- **Session resume:** `codex resume` (picker), `codex resume --last`. [Observed: `codex --help`, 2025-08-07]
- **Session fork:** `codex fork` to fork a previous interactive session. [Observed, 2025-08-07]
- **Session archive/delete/unarchive.** [Observed, 2025-08-07]
- **Cloud agents** for very long runs in isolated environments. [Source: https://openai.com/codex (Wayback), accessed 2025-08-07]
- **Background agents:** Codex CLI doesn't have `--bg` like Claude Code, but `codex exec-server` is "experimental" for non-interactive runs. [Observed: `codex --help`, 2025-08-07]
- **OTEL monitoring** for long-running sessions. [Source: security docs, accessed 2025-08-07]

## 24. Power User Features

- **`codex exec`** for non-interactive runs (pipeable). [Observed: `codex exec --help`, 2025-08-07]
- **`codex review`** for code review. [Observed, 2025-08-07]
- **`codex mcp-server`** to start Codex as an MCP server (stdio). [Observed, 2025-08-07]
- **`codex sandbox`** to run commands within a Codex sandbox. [Observed, 2025-08-07]
- **`codex apply`** to apply the latest diff as `git apply`. [Observed, 2025-08-07]
- **`codex cloud`** to browse tasks from Codex Cloud and apply changes locally. [Observed, 2025-08-07]
- **`codex fork`** to fork a previous session. [Observed, 2025-08-07]
- **`codex doctor`** to diagnose installation, config, auth, runtime. [Observed, 2025-08-07]
- **`codex features`** to inspect feature flags. [Observed, 2025-08-07]
- **`codex debug`** for debugging tools. [Observed, 2025-08-07]
- **`codex remote-control`** to manage app-server daemon. [Observed, 2025-08-07]
- **`codex app-server`** (experimental) for app-server tooling. [Observed, 2025-08-07]
- **`codex exec-server`** (experimental) for standalone exec-server service. [Observed, 2025-08-07]
- **`codex completion`** for shell completion scripts. [Observed, 2025-08-07]
- **`codex update`** to update to latest. [Observed, 2025-08-07]
- **`--remote <ADDR>`** to connect TUI to a remote app server endpoint (ws://, wss://, unix://). [Observed, 2025-08-07]
- **`--remote-auth-token-env <ENV_VAR>`** for bearer token to remote app server. [Observed, 2025-08-07]
- **`--strict-config`** to error on unrecognized config.toml fields. [Observed, 2025-08-07]
- **`--skip-git-repo-check`** to allow running outside a Git repository. [Observed, 2025-08-07]
- **`--ignore-user-config`** to skip user config. [Observed, 2025-08-07]
- **`--oss`** with `--local-provider lmstudio|ollama` for local models. [Observed, 2025-08-07]
- **Profiles:** `-p, --profile <name>`. [Observed, 2025-08-07]
- **Custom prompts** (slash-command-like, invoked as `/prompts: <name>`). [Source: slash commands docs, accessed 2025-08-07]
- **Skills** (per docs nav). [Source: slash commands docs nav, accessed 2025-08-07]
- **MCP plugins** via `codex plugin` subcommand. [Observed, 2025-08-07]
- **Hooks** (per docs/config.md `allow_managed_hooks_only` flag). [Source: GitHub repo docs/config.md, accessed 2025-08-07]
- **Codex SDK** for embedding agent into custom workflows. [Source: https://openai.com/index/codex-now-generally-available (search snippet), accessed 2025-08-07]
- **GitHub Action** for CI integration. [Source: docs nav, accessed 2025-08-07]

## 25. Developer Experience

- **Open source:** Apache-2.0 license. "This repository is licensed under the Apache-2.0 License." [Source: README.md, accessed 2025-08-07]
- **GitHub repo:** https://github.com/openai/codex [Source: README.md, accessed 2025-08-07]
- **Multiple install paths:** npm, Homebrew, shell script, PowerShell, GitHub Releases binary. [Source: README.md, accessed 2025-08-07]
- **Config file:** `~/.codex/config.toml` (TOML). [Observed + Source: docs/config.md, accessed 2025-08-07]
- **Profiles:** `$CODEX_HOME/<name>.config.toml`. [Observed, 2025-08-07]
- **Codex SDK:** "Embed the same agent that powers the Codex CLI into your own workflows, tools, and apps." [Source: https://openai.com/index/codex-now-generally-available (search snippet), accessed 2025-08-07]
- **MCP server mode:** `codex mcp-server` (stdio). [Observed, 2025-08-07]
- **MCP client support:** `codex mcp` to manage external MCP servers. [Observed, 2025-08-07]
- **IDE extension** for VS Code (and Cursor/Windsurf per README). [Source: README.md, accessed 2025-08-07]
- **GitHub Action** for CI. [Source: docs nav, accessed 2025-08-07]
- **Integrations:** GitHub, Slack, Linear (per docs nav). [Source: docs nav, accessed 2025-08-07]
- **Codex Web** at chatgpt.com/codex for cloud agent. [Source: README.md, accessed 2025-08-07]
- **Codex App:** `codex app` for desktop experience. [Source: README.md, accessed 2025-08-07]
- **OpenTelemetry** for observability. [Source: security docs, accessed 2025-08-07]
- **Contributing guide:** docs/contributing.md in repo. [Source: GitHub repo file listing, accessed 2025-08-07]
- **Windows support:** Native Windows sandbox is experimental; WSL recommended for full sandbox semantics. [Source: security docs, accessed 2025-08-07]
- **Codex for education:** "How Codex ran OpenAI DevDay 2025" + "Using Codex for education at Dagster Labs" (per docs nav). [Source: docs nav, accessed 2025-08-07]

## 26. Biggest Strengths (with evidence)

1. **OS-level sandbox enforcement** (Seatbelt on macOS, Landlock+seccomp on Linux, WSL on Windows). No other product in this batch has this. [Source: https://developers.openai.com/codex/security (Wayback), accessed 2025-08-07]
2. **Three sandbox modes + four approval modes** = 12 combinations. Most granular trust model. [Source: same + Observed: `codex --help -s --sandbox`, 2025-08-07]
3. **Open source (Apache-2.0).** Public repo at github.com/openai/codex. Codex's agent loop, tool specs, plan tool are all referenceable via permalinks. [Source: README.md + agent-loop blog permalinks, accessed 2025-08-07]
4. **Codex SDK** for embedding the agent into custom apps. [Source: https://openai.com/index/codex-now-generally-available (search snippet), accessed 2025-08-07]
5. **Local OSS model support** via `--oss --local-provider lmstudio|ollama`. [Observed, 2025-08-07]
6. **AGENTS.md as a cross-tool standard** with documented discovery + merge order + size cap. [Source: AGENTS.md docs (Wayback), accessed 2025-08-07]
7. **Slash command set is the most complete** of the four products: /approvals, /compact, /diff, /exit, /feedback, /init, /logout, /mcp, /mention, /model, /new, /quit, /review, /status, /undo. [Source: slash commands docs, accessed 2025-08-07]
8. **`/undo` reverts most recent turn including file changes.** Per-turn undo is rare. [Source: same]
9. **`/diff` shows untracked files** (in addition to staged + unstaged). [Source: same]
10. **Cloud agents run in isolated OpenAI-managed containers** with explicit setup phase before code access. [Source: security docs, accessed 2025-08-07]
11. **Prompt injection warning** is explicit: "Use caution when enabling network access or web search in Codex. Prompt injection can cause the agent to fetch and follow untrusted instructions." [Source: same]
12. **OpenTelemetry opt-in monitoring** with structured events. [Source: same]
13. **Version-control-first workflow:** "Prefer patch-based workflows (for example, git diff / git apply) over editing tracked files directly." [Source: same]
14. **Codex CLI is cross-platform local software agent.** Designed for local-first execution. [Source: agent-loop blog, accessed 2025-08-07]
15. **Multiple install paths** (npm, brew, curl|sh, PowerShell, GitHub Releases binary). [Source: README.md, accessed 2025-08-07]
16. **GitHub Action + IDE extension + Codex Web + Codex Cloud** = full surface coverage. [Source: README.md + docs nav, accessed 2025-08-07]
17. **`codex exec --ephemeral`** for non-persistent sessions. [Observed, 2025-08-07]
18. **`codex apply`** to apply agent diffs as git apply. [Observed, 2025-08-07]
19. **Remote app server:** `--remote ws://host:port`, `--remote unix://PATH` for connecting TUI to remote execution. [Observed, 2025-08-07]
20. **`codex doctor`** for installation health check. [Observed, 2025-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **developers.openai.com/codex live site blocks curl** (returns 59-byte Cloudflare-style challenge page). Wayback Machine was required for most docs. Poor resilience for offline / scripted access. [Observed: 59-byte response, 2025-08-07]
2. **No auto memory** (vs. Claude Code's auto memory that Claude writes itself). [Observed: absence in AGENTS.md docs, accessed 2025-08-07]
3. **No screen-reader mode flag** (vs. Claude Code's `--ax-screen-reader`). [Observed: absence in `codex --help`, 2025-08-07]
4. **AGENTS.md size cap of 32 KiB** is small for large projects. "Raise the limit or split instructions across nested directories when you hit the cap." [Source: AGENTS.md docs, accessed 2025-08-07]
5. **Codex cloud setup phase has network always on.** "Network access is always enabled during the setup phase, which runs before the agent has access to your code." — small attack window. [Source: security docs, accessed 2025-08-07]
6. **Windows native sandbox is experimental.** "When running natively on Windows, you can enable an experimental sandbox implementation." Linux/WSL recommended. [Source: same]
7. **Docker container sandbox may not work.** "When you run Linux in a containerized environment such as Docker, the sandbox may not work if the host or container configuration doesn't support the required Landlock and seccomp features." [Source: same]
8. **No GUI.** CLI/TUI only. (IDE extension is separate.)
9. **Brand proliferation:** Codex CLI, Codex Cloud, Codex IDE extension, Codex Web, Codex App, Codex SDK — confusing. [Source: README.md, accessed 2025-08-07]
10. **Smaller ecosystem than Cursor.** Codex is younger (CLI launched April 2025 per agent-loop blog) than Cursor (~2023).
11. **No explicit codebase indexing/RAG** (vs. Windsurf's RAG context engine). Codex relies on agent reading files via shell tools.

## 28. What should MiMo learn? (evidence-based)

1. **OS-level sandbox enforcement** (Seatbelt/Landlock/seccomp). No other product in this batch has this. [Source: security docs (Wayback), accessed 2025-08-07]
2. **Three sandbox modes × four approval modes** = explicit trust matrix. [Source: same]
3. **Default-deny network access.** "By default, the agent runs with network access turned off." [Source: same]
4. **`/approvals` slash command** to switch modes mid-session. [Source: slash commands docs, accessed 2025-08-07]
5. **`/undo` per-turn revert** including file changes. [Source: same]
6. **`/diff` showing untracked files.** [Source: same]
7. **`/status` showing model, approval policy, writable roots, token usage** in one snapshot. [Source: same]
8. **`/compact` for context preservation.** [Source: same]
9. **`/init` for AGENTS.md scaffolding.** [Source: same]
10. **Slash popup on `/` with name + purpose + when-to-use.** [Source: same]
11. **AGENTS.md discovery:** global → project → directory walk, with override files and fallback filenames. [Source: AGENTS.md docs, accessed 2025-08-07]
12. **AGENTS.md merge order:** root-down concatenation; closer files override. [Source: same]
13. **AGENTS.md size cap** (32 KiB default, configurable). [Source: same]
14. **Codex rebuilds instruction chain on every run** — no cache to clear. [Source: same]
15. **OpenTelemetry opt-in** with structured events (`codex.conversation_starts`, `codex.api_request`, `codex.sse_event`, `codex.user_prompt` redacted by default, `codex.tool_*`). [Source: security docs, accessed 2025-08-07]
16. **Prompt injection warning** is explicit. [Source: same]
17. **Version-control-first workflow** recommendation. [Source: same]
18. **Patch-based workflows** (git diff / git apply) over direct file editing. [Source: same]
19. **`codex exec --ephemeral`** for non-persistent runs. [Observed, 2025-08-07]
20. **`codex apply`** to apply agent diffs as git apply. [Observed, 2025-08-07]
21. **Remote app server** (`--remote ws://`, `--remote unix://PATH`). [Observed, 2025-08-07]
22. **`codex doctor`** for health checks. [Observed, 2025-08-07]
23. **Local OSS model support** (`--oss --local-provider lmstudio|ollama`). [Observed, 2025-08-07]
24. **Configurable Responses API endpoint.** [Source: agent-loop blog, accessed 2025-08-07]
25. **SDK for embedding** the agent into custom workflows. [Source: search snippet for codex-now-generally-available, accessed 2025-08-07]
26. **GitHub Action** for CI. [Source: docs nav, accessed 2025-08-07]
27. **Multiple install paths** (npm, brew, curl|sh, PowerShell, GitHub Releases). [Source: README.md, accessed 2025-08-07]
28. **Cloud agents in isolated OpenAI-managed containers** with explicit setup phase before code access. [Source: security docs, accessed 2025-08-07]
29. **Onboarding detection:** "On launch, Codex detects whether the folder is version-controlled and recommends" appropriate sandbox mode. [Source: same]
30. **Session lifecycle:** archive, delete, unarchive, fork, resume --last. [Observed, 2025-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **Cloudflare-style challenge on docs site.** developers.openai.com/codex returns 59-byte challenge to non-JS clients. MiMo should serve docs as static HTML. [Observed: 59-byte response, 2025-08-07]
2. **Brand proliferation** (Codex CLI / Cloud / IDE / Web / App / SDK). MiMo should pick one product name and stick to it. [Source: README.md, accessed 2025-08-07]
3. **32 KiB AGENTS.md size cap** is too small for large projects. MiMo should support larger or auto-split. [Source: AGENTS.md docs, accessed 2025-08-07]
4. **No auto memory** — relying solely on user-authored AGENTS.md. MiMo should adopt Claude Code's auto-memory pattern. [Observed: absence, 2025-08-07]
5. **No screen-reader flag.** MiMo should adopt Claude Code's `--ax-screen-reader` pattern. [Observed: absence, 2025-08-07]
6. **Docker sandbox incompatibility.** "the sandbox may not work if the host or container configuration doesn't support the required Landlock and seccomp features." MiMo should explicitly document container compatibility. [Source: security docs, accessed 2025-08-07]
7. **Cloud setup phase has network always on** — small attack window. MiMo should not enable network during setup. [Source: same]
8. **Windows native sandbox is experimental.** MiMo should ship a stable Windows sandbox. [Source: same]
9. **No RAG / codebase indexing** — agent must read files via shell tools, which is slow on large codebases. MiMo should consider Windsurf-style RAG. [Observed: absence in docs, accessed 2025-08-07]

## 30. Confidence Score: 80/100

**Reasoning:**
- **Direct product use:** Codex CLI v0.147.0 installed and `codex --help` (131 lines), `codex exec --help`, `codex sandbox --help` captured. Direct observational evidence for sections 3, 4, 5, 6, 7, 8, 12, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25.
- **GitHub README fully extracted** (3.3KB raw markdown). Strong primary source.
- **Wayback Machine yielded 4 critical docs pages** (slash commands 6.4KB, security 12KB, AGENTS.md 6.5KB, agent-loop blog 26KB). Strong primary source for sections 1, 2, 3, 8, 9, 11, 12, 13, 21, 22, 26, 27, 28.
- **Weak evidence:** interactive session NOT run (requires ChatGPT auth). UI states (loading, error, empty) not directly observed — inferred from CLI flags + docs.
- **Weak evidence:** developers.openai.com/codex live site blocks curl. Had to rely on Wayback Machine snapshots which may be slightly out-of-date. Wayback pages are dated 2025.
- **Weak evidence:** Codex SDK not directly inspected (mentioned in search snippet only).
- **Weak evidence:** IDE extension not directly inspected.
- Confidence raised to 80 because: (a) CLI installed and inspected directly with multiple subcommands, (b) GitHub repo is open-source so the code itself is verifiable, (c) Wayback extraction yielded verbatim official-docs text.
- Confidence NOT raised to 85+ because: live docs site required Wayback fallback, interactive session not run, SDK + IDE extension not directly inspected.
