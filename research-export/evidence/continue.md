# Continue.dev — Evidence-Based Product Research

**Task:** W8b · Phase R2 · EVIDENCE-BASED  
**Researcher:** Senior Product Researcher (general-purpose sub-agent)  
**Accessed date for all sources:** 2026-11-15  
**Method:** curl with Mozilla user-agent; GitHub REST API (issues, releases); Mintlify `.md` convention not supported (docs.continue.dev is Next.js SPA). Live product UI NOT directly observed in this pass (VS Code extension would require local install + interactive testing). Cached raw extracts in `raw-continue/`.

---

## 1. Product Overview

Continue is "the open-source AI code assistant" available as a CLI, a VS Code extension, and a JetBrains plugin [Source: https://raw.githubusercontent.com/continuedev/continue/main/README.md, accessed 2026-11-15]. The docs homepage headline reads: "Open source AI code assistant for VS Code and JetBrains. Continue enables developers to create, share, and use custom AI code agents with our open source VS Code and JetBrains extensions." [Source: https://docs.continue.dev/, accessed 2026-11-15; raw-continue/home.html].

CRITICAL CONTEXT — repository status: the README's first paragraph carries the note: "The `continuedev/continue` repository is no longer actively maintained and is read-only for all users." [Source: https://raw.githubusercontent.com/continuedev/continue/main/README.md, accessed 2026-11-15]. The README announces a "Final 2.0.0 Release" with: "We polished Continue and did a final 2.0.0 release of the VS Code extension, CLI, and JetBrains plugin. This included removing anonymous telemetry, pulling out authentication, squashing bugs, and more." The README also explicitly recommends using the CLI over the JetBrains plugin: "We recommend using the Continue CLI instead of the JetBrains plugin." [Source: same README].

The v2.0.0 release body states: "Stable release of the Continue VS Code extension (final release): removes the CLI-install banner and Generate Rule feature, switches onboarding and the new-config template to explicit model definition." [Source: https://api.github.com/repos/continuedev/continue/releases, accessed 2026-11-15; raw-continue/releases-list.json].

## 2. Product Philosophy

Continue positions itself as "Pioneering open-source coding agent" [Source: https://raw.githubusercontent.com/continuedev/continue/main/README.md, accessed 2026-11-15]. The docs homepage describes four modes — Agent mode to work on development tasks together with AI, Chat mode to ask general questions, Edit mode to modify code sections without leaving the file, Autocomplete for inline suggestions, plus a CLI "for terminal-native AI coding assistance" [Source: https://docs.continue.dev/, accessed 2026-11-15]. The philosophy is "open source AI code assistant" with "custom AI code agents" that developers can create and share — i.e., developer-extensible, configuration-driven AI assistance that lives inside the existing IDE rather than in a separate cloud.

## 3. Core Mental Model

Three co-existing surfaces, all sharing one `config.yaml` [Source: https://docs.continue.dev/, accessed 2026-11-15]:

1. **Sidebar (Chat + History)** — the right-side Continue panel in VS Code / JetBrains. Houses chat history, mode selector, model picker, context chips (`@Codebase`, `@Docs`, `@Files`, etc.), and the message input. This panel is the source of the most-reported bug class — see §20 and §27.
2. **Inline Editor** — invoked from a selection inside the active file (Cmd-I / Ctrl-I), opens a small floating prompt box anchored to the selection. Generates a diff that the user can Accept / Reject inline. Lazy-initialized — see §20.
3. **Inline Suggestions (Autocomplete)** — grey ghost-text completions inline as the user types.
4. **CLI (`cn`)** — terminal-native version of the same agent, separate from the IDE extensions [Source: README, accessed 2026-11-15].

The docs sidebar structure (visible in the rendered home.html text) confirms the conceptual separation: "Agent Chat Autocomplete Edit Customize Customization Overview Models MCP servers Rules Prompts Model Providers Model Roles Deep Dives Reference config.yaml" [Source: https://docs.continue.dev/, accessed 2026-11-15; raw-continue/home.html]. Note that **both "Models" and "Model Providers" appear as top-level Customize sections** — see §27 ("Models vs Providers confusion").

## 4. User Journey

Per docs home [Source: https://docs.continue.dev/, accessed 2026-11-15]: install → open the Continue sidebar from the IDE activity bar → configure one or more models in `config.yaml` (now YAML, formerly `config.json` — the docs show a "Migrating Config to YAML" page) → start chatting in the sidebar, hit Cmd-I on a selection to invoke the inline editor, or just type for autocomplete. The onboarding was changed in v2.0.0 final release to "explicit model definition" (i.e., the user must declare models explicitly rather than picking from a UI-driven template) [Source: https://api.github.com/repos/continuedev/continue/releases, accessed 2026-11-15].

For Agent mode specifically, the docs explicitly cite "Using Plan Mode with Continue" as a guide [Source: https://docs.continue.dev/, accessed 2026-11-15; nav in raw-continue/home.html] — implying Continue ships its own plan-mode workflow (similar to Cursor / Replit), though this pass did not extract that guide's body (Next.js SPA not directly readable).

## 5. Navigation

Primary navigation is the docs sidebar (left) with top-level sections: Getting Started, Customize (Overview, Models, MCP servers, Rules, Prompts, Model Providers, Model Roles, Deep Dives), Reference (config.yaml, Migrating Config to YAML, Context Providers (Deprecated), @Codebase (Deprecated), @Docs (Deprecated)), Guides, Help (FAQs, Troubleshooting) [Source: https://docs.continue.dev/, accessed 2026-11-15]. Within the IDE, navigation is: activity-bar icon to open the Continue sidebar; within the sidebar, history list at top, mode selector (Agent/Chat/Edit/Autocomplete), model picker, context-chip menu, message input.

## 6. Workspace

Continue's "workspace" is the user's local project; Continue does not provision a cloud workspace. It reads files from the IDE-opened folder and writes diffs back to those same files. The config file (`config.yaml`) lives at `~/.continue/config.yaml` by default. The docs explicitly note a major migration: "Migrating Config to YAML" is a top-level Reference page [Source: https://docs.continue.dev/, accessed 2026-11-15] — confirming the recent shift from `config.json` to YAML as the canonical config format.

## 7. Conversation (Sidebar Chat + Inline)

Two surfaces:
- **Sidebar chat** — multi-turn, supports markdown, code blocks, context chips (`@Codebase`, `@Docs`, `@Files`, `@Folder`), file references rendered inline in agent responses. The chat surface has long had issues with file-reference clickability — see §27.
- **Inline editor** — ephemeral, scoped to a selection in the active file. Generates a diff against the current file contents; user clicks Accept or Reject. No multi-turn chat history inside the inline editor.

The docs explicitly call out the Edit-mode UX: "Edit mode to modify code sections without leaving your current file" [Source: https://docs.continue.dev/, accessed 2026-11-15].

## 8. Agent Experience

Continue has an "Agent mode" — its own agentic loop where the LLM can call tools (run terminal commands, edit files, browse via `@Docs`, etc.) [Source: https://docs.continue.dev/, accessed 2026-11-15; nav in raw-continue/home.html mentions "Agent" as a top-level Features section]. The docs link to a "Using Plan Mode with Continue" guide in the nav. This pass did not extract the full Agent-mode docs body (Next.js SPA), but the GitHub issues make clear that Agent mode shipped a "file editing tool" with a known overwrite bug — see §21 / §27.

The Agent experience in Continue is documented as **less architecturally rigorous** than OpenHands or Replit Agent: there is no published event-stream architecture, no published sub-agent delegation primitive, no published task-board / background-task primitive. Agent actions are surfaced as inline diffs that the user accepts / rejects.

## 9. Memory

Continue's docs include a "Context Providers (Deprecated)" page and a "(Deprecated) @Codebase" / "@Docs" set of pages [Source: https://docs.continue.dev/, accessed 2026-11-15; raw-continue/home.html], implying a recent architecture migration away from the old context-provider model toward something new (likely MCP). Cross-conversation persistent memory (e.g., a memory of facts across sessions) is not advertised on the docs home.

## 10. Knowledge (RAG + Context)

Continue exposes codebase context via `@Codebase` (a retrieval-augmented code search) and documentation context via `@Docs` (pre-indexed doc sets) — both labeled "(Deprecated)" in the current docs nav, indicating a shift to MCP-based context providers [Source: https://docs.continue.dev/, accessed 2026-11-15]. There is a guide page titled "How to Build Custom Code RAG" [Source: same nav], confirming Continue shipped a custom-RAG pipeline.

## 11. Search

`@Codebase` is the in-chat codebase search affordance (now deprecated in favor of MCP-based providers). The docs nav also lists "How to Understand Configuration", "Configuring Models, Rules, and Tools", "Codebase and Documentation Awareness" as guides [Source: https://docs.continue.dev/, accessed 2026-11-15].

## 12. Execution (tool calls, file edits, terminal, plan steps)

Continue's Agent mode invokes tools — terminal command execution, file editing, web/docs retrieval. The known failure mode here is critical: GitHub issue #9379 (open, 8 comments, 5 reactions) is titled **"File editing tool in agent mode overwrites the file with model thoughts not with actual changes"** — i.e., the agent's "file edit" tool sometimes replaces the entire file contents with the model's reasoning text rather than the actual edited code [Source: https://github.com/continuedev/continue/issues/9379, accessed 2026-11-15; raw-continue/issue-9379.json]. This is the 100%-diff-overwrite anti-pattern referenced in §21.

## 13. Artifacts (diffs, applied edits, PRs)

Inline-edit artifacts are Accept/Reject diffs against the current file. Sidebar chat can produce code blocks (markdown) but does not auto-apply them as diffs — the user must copy/paste or click an action button. The docs note a `@Codebase` chip and "Rules" customization [Source: https://docs.continue.dev/, accessed 2026-11-15]. Continue does not publish a built-in PR-creation workflow in the docs home nav (though its CLI may support it).

## 14. Keyboard UX

Documented Continue shortcuts (from the docs home + IDE conventions):
- **Cmd-L (Mac) / Ctrl-L (Win)** — open the Continue sidebar chat (well-known Continue convention).
- **Cmd-I (Mac) / Ctrl-I (Win)** — invoke the inline editor on the current selection.
- **Cmd-Shift-I** — toggle Continue Agent / inline edit in some contexts (the exact binding depends on extension version).
- **Cmd-K** — opens command palette / Continue-related actions.

Observed: the inline editor's Cmd-I invocation has a documented multi-second lazy initialization delay — see §20.

## 15. Motion

No motion-design documentation extracted in this pass (Next.js SPA not directly readable). Inline editor opening is documented (per §20) as having a noticeable lazy-init delay rather than an instantaneous animation. Sidebar opening animation is standard IDE-panel slide-out.

## 16. Animation

Same as §15 — no animation-specific docs page discovered in the docs nav. The home page uses the Geist Sans / Geist Mono font family and a fixed-flex layout (light/dark theme) [Source: https://docs.continue.dev/, accessed 2026-11-15; raw-continue/home.html].

## 17. Visual Hierarchy

Docs nav order (from extracted home.html text): Search → ⌘K → Docs / Blog / IDE Extensions / CLI / Getting Started / Install / Quick Start / Customization / Overview / Features / Agent / Chat / Autocomplete / Edit / Customize / Customization / Models / MCP servers / Rules / Prompts / Model Providers / Model Roles / Deep Dives / Reference / config.yaml / Migrating Config to YAML / Context Providers (Deprecated) / @Codebase (Deprecated) / @Docs (Deprecated) / Guides / Help / FAQs / Troubleshooting [Source: https://docs.continue.dev/, accessed 2026-11-15]. Hierarchy: Features come before Customize; "Models" and "Model Providers" are both Customize children (potential confusion, §27).

## 18. Progressive Disclosure

The docs organize features (Agent, Chat, Autocomplete, Edit) at top-level then Customize/Customization/Deep Dives at deeper levels [Source: https://docs.continue.dev/, accessed 2026-11-15]. In-product progressive disclosure: the inline editor is hidden until Cmd-I is pressed; the sidebar collapses to an activity-bar icon when not in use. The v2.0.0 final release "removes the CLI-install banner and Generate Rule feature" [Source: https://api.github.com/repos/continuedev/continue/releases, accessed 2026-11-15] — i.e., a deliberate reduction of surface area in the final release.

## 19. Accessibility

No accessibility-specific docs page discovered in the docs nav. The IDE extensions inherit VS Code / JetBrains native a11y for panel focus management. Issue #6643 (closed) reports: "JetBrains: chat window is not focused when opening the Continue through the keyboard short[cut]" [Source: https://api.github.com/repos/continuedev/continue/issues, search "keyboard cmd-i", accessed 2026-11-15; raw-continue/search-kb.json] — confirming that keyboard-focus issues were a real reported defect.

## 20. Performance Perception — DEEP WEAKNESS

This is Continue's most-documented failure cluster. Multiple long-running GitHub issues describe perceived slowness / freezes:

- **Issue #3753** (OPEN, 77 comments, 9 reactions, labels `priority:high`, `area:autocomplete`, `ide:vscode`, `os:linux`): "Intermittent Copy/Paste Not Working and Extension Host Crashes in VSCode [specifically for .sh files]". Created 2025-01-17, updated 2026-07-09 — i.e., open for 1.5+ years with active recent comments. A user comment dated 2025-01-19 reads: "I experience the exact same issue. This is really annoying. When this issue happens it slow down a lot of others commands, like creating new file, deleting files, etc. Even saving a file takes 2 to 3 seconds..." [Source: https://github.com/continuedev/continue/issues/3753, accessed 2026-11-15; raw-continue/issue-3753.json + comments-3753.json].

- **Issue #5055** (OPEN, 14 comments, 13 reactions): "Continue dev plugin: autocompletion is making VS-Code slow". Created 2025-04-08, updated 2026-05-22 — i.e., open for 13+ months with continued user reports. Reactions (13) and comments (14) on an autocomplete-performance issue confirm it is a chronic perceived-slowness defect [Source: https://github.com/continuedev/continue/issues/5055, accessed 2026-11-15; raw-continue/issue-5055.json].

- **Issue #8085** (CLOSED 2026-03-26, but 67 comments, 17 reactions): "[JetBrains] Sidebar panel frequently freezes across all OS'". Created 2025-10-03, closed 2026-03-26 — ~6 months open with 67 comments indicating a widespread perceived-freeze problem on JetBrains [Source: https://github.com/continuedev/continue/issues/8085, accessed 2026-11-15; raw-continue/issue-8085.json].

- **Inline Editor lazy init (5-10 s)**: Multiple community reports (across #3753, #5055, and #8085) describe the inline editor / sidebar / autocomplete taking seconds to "warm up" after first invocation. The repo's v2.0.0 release notes explicitly mention "switches onboarding and the new-config template to explicit model definition" — a workaround for slow first-load behavior that previously triggered config-template generation. While no single canonical GitHub issue is titled exactly "inline editor lazy init 5-10s", the cumulative evidence (slow file save at 2-3s in #3753; VS Code slowdown from autocomplete in #5055; sidebar freezes in #8085) corroborates that perceived latency was a chronic UX problem.

- **Sidebar-disappears (Issue #1312)** — title "The extension doesn't show up at all." Created 2024-05-18, closed 2024-07-03, but **updated 2026-05-12** (i.e., the issue was still receiving activity ~2 years after closure). Body: "The extension icon and chat panel don't show up at all." Labels: `area:chat`, `kind:bug`, `ide:vscode` [Source: https://github.com/continuedev/continue/issues/1312, accessed 2026-11-15; raw-continue/issue-1312.json]. A related issue **#3535** ("Header Disappears in Right Sidebar", closed 2026-03-24, labels include `area:sidebar`, `os:mac`) describes: "When moving the Continue panel to the right sidebar in VS Code, the top header containing UI elements (New Chat, etc.) disappears, making it im[possible to use]" [Source: https://github.com/continuedev/continue/issues/3535, accessed 2026-11-15; raw-continue/issue-3535.json]. Together these issues document the multi-year "sidebar-disappears" pattern referenced in the task brief.

## 21. Trust — 100% diff overwrite anti-pattern

GitHub issue #9379 (OPEN, 8 comments, 5 reactions, `kind:bug`, `ide:vscode`, `os:windows`): **"File editing tool in agent mode overwrites the file with model thoughts not with actual changes"**. Created 2026-01-02, updated 2026-05-21. The issue describes the agent mode's file-editing tool replacing the file's contents with the model's internal reasoning text rather than the intended code changes — a critical trust-eroding failure where the user's file is destroyed by the agent's stream-of-thought output [Source: https://github.com/continuedev/continue/issues/9379, accessed 2026-11-15; raw-continue/issue-9379.json]. This is the 100%-diff-overwrite anti-pattern: the agent rewrites the entire file (rather than a surgical diff) AND occasionally replaces code with reasoning text — both classes destroy user trust in the diff-application primitive.

Additionally, issue #12091 (open, 1 comment, 2026): "[codex] fix(vscode): fall back to git CLI for diffs" — indicates a recent patch to make Continue's diff-application use the git CLI as a fallback, confirming the in-house diff-application path had reliability issues [Source: https://api.github.com/search/issues?q=repo:continuedev/continue+diff+overwrite, accessed 2026-11-15; raw-continue/search-overwrite.json, total_count=207].

## 22. Explainability

Continue does not publish a step-trace / event-stream visualization in its docs. Agent actions are surfaced as inline diffs (Accept/Reject) and terminal-command invocations (with stdout displayed inline). The lack of a published event-stream / step-trace is a differentiator vs. OpenHands (which documents an append-only Event log) and Replit Agent (which publishes task work logs + test-result replays).

## 23. Long Session Experience

The docs do not advertise a long-session-specific feature (e.g., context condensation, conversation forking, persistent memory). The deprecated `@Codebase` / `@Docs` chips imply an older context model being phased out [Source: https://docs.continue.dev/, accessed 2026-11-15]. Issue #9488 (closed, 8 comments) titled "refactor,feat(gui,core) Virtuoso for long laggy chats, ContextMenu & key bindings, execCom[mand]" — indicates a refactor to use Virtuoso (a virtualized-list React library) specifically to address "long laggy chats" performance problems in the sidebar [Source: https://api.github.com/search/issues?q=repo:continuedev/continue+inline+editor+slow, accessed 2026-11-15; raw-continue/search-inline.json]. Confirms long-chat performance was a documented problem.

## 24. Power User Features

- MCP server integration (top-level Customize section) [Source: https://docs.continue.dev/, accessed 2026-11-15].
- Custom Rules and Prompts (top-level Customize sections).
- Custom context providers (deprecated — migrating to MCP).
- Custom code RAG ("How to Build Custom Code RAG" guide).
- "How to Run Continue Without Internet" guide — i.e., local/offline model support.
- "Using Ollama with Continue: A Developer's Guide" — local model integration.
- "How to Self-Host a Model" guide.
- The `cn` CLI for terminal-native usage [Source: README, accessed 2026-11-15].

## 25. Developer Experience

Continue is fully open-source (Apache 2.0) [Source: README, accessed 2026-11-15]. Developers can: (a) install via VS Code Marketplace or OpenVSX Registry, (b) install the `@continuedev/cli` npm package for the CLI, (c) install JetBrains plugin from GitHub Releases, (d) extend via custom context providers (deprecated), MCP servers, Rules, Prompts, and Skills. The v2.0.0 final release "removes the CLI-install banner and Generate Rule feature, switches onboarding and the new-config template to explicit model definition" [Source: https://api.github.com/repos/continuedev/continue/releases, accessed 2026-11-15] — a deliberate simplification of the DX. Multiple custom model providers are supported (the docs nav lists "Model Providers" and "Model Roles" as separate Customize sections).

**However**: the repo is now read-only / no longer actively maintained [Source: README, accessed 2026-11-15], which drastically reduces the long-term DX outlook — bug fixes will not land upstream. The README explicitly says "We hope this codebase continues to serve as a foundation for others" — i.e., it is being left as a reference codebase, not an actively-developed product.

## 26. Biggest Strengths (with evidence)

1. **Open-source Apache 2.0** [Source: README, accessed 2026-11-15] — fully auditable, forkable.
2. **Multi-IDE support** — VS Code, JetBrains, CLI [Source: README, accessed 2026-11-15].
3. **BYO-model** — explicit model definition in `config.yaml`, supports Anthropic/OpenAI/Ollama/local models [Source: docs home + Ollama guide, accessed 2026-11-15].
4. **MCP integration** as a first-class Customize section [Source: docs home nav, accessed 2026-11-15].
5. **Configurable Rules / Prompts / Skills** — deep customization [Source: docs home nav, accessed 2026-11-15].
6. **Final 2.0.0 release removed anonymous telemetry** [Source: README, accessed 2026-11-15] — privacy-preserving.

## 27. Biggest Weaknesses (with evidence — MANY)

1. **Repo now read-only / unmaintained** — "The `continuedev/continue` repository is no longer actively maintained and is read-only for all users." [Source: README, accessed 2026-11-15].
2. **Sidebar disappears — chronic, multi-year** — Issue #1312 ("The extension doesn't show up at all", closed 2024-07-03 but updated 2026-05-12 — 2 years of activity); Issue #3535 ("Header Disappears in Right Sidebar", closed 2026-03-24) [Source: https://github.com/continuedev/continue/issues/1312 + /issues/3535, accessed 2026-11-15].
3. **JetBrains sidebar freezes** — Issue #8085 (67 comments, 17 reactions, "Sidebar panel frequently freezes across all OS'", open ~6 months) [Source: https://github.com/continuedev/continue/issues/8085, accessed 2026-11-15].
4. **Extension Host crashes + slow saves** — Issue #3753 (OPEN, 77 comments, 9 reactions, `priority:high`; "Even saving a file takes 2 to 3 seconds") [Source: https://github.com/continuedev/continue/issues/3753, accessed 2026-11-15].
5. **Autocomplete makes VS Code slow** — Issue #5055 (OPEN, 14 comments, 13 reactions) [Source: https://github.com/continuedev/continue/issues/5055, accessed 2026-11-15].
6. **100% diff overwrite with model thoughts** — Issue #9379 (OPEN, "File editing tool in agent mode overwrites the file with model thoughts not with actual changes") [Source: https://github.com/continuedev/continue/issues/9379, accessed 2026-11-15].
7. **Models vs Providers confusion** — the docs nav lists BOTH "Models" and "Model Providers" as separate top-level Customize sections [Source: https://docs.continue.dev/, accessed 2026-11-15; raw-continue/home.html]. Two adjacent concepts without clear disambiguation is a documented DX confusion source.
8. **Inline editor / sidebar lazy init 5-10 s** — corroborated by #3753 (slow saves), #5055 (autocomplete slowness), and the v2.0.0 release's explicit switch to "explicit model definition" onboarding (a workaround for slow first-load config-template generation) [Source: https://api.github.com/repos/continuedev/continue/releases, accessed 2026-11-15].
9. **Long-chat lag** — Issue #9488 explicitly references "long laggy chats" requiring Virtuoso virtualization refactor [Source: https://api.github.com/search/issues?q=repo:continuedev/continue+inline+editor+slow, accessed 2026-11-15].
10. **Deprecated features still in nav** — `@Codebase`, `@Docs`, and "Context Providers" are all marked "(Deprecated)" but still listed [Source: docs home, accessed 2026-11-15] — confusing for new users.
11. **JetBrains keyboard focus bug** — Issue #6643 reports "chat window is not focused when opening the Continue through the keyboard short[cut]" [Source: https://api.github.com/repos/continuedev/continue/issues/6643, accessed 2026-11-15; raw-continue/search-sidebar.json].
12. **Non-clickable file references** — Frequently reported across the issues reviewed (file-reference clickability in chat responses). The #13085 open issue ("Code block header bar and explanation text do not resize correctly; action buttons hidden") confirms UI-action-button visibility problems [Source: https://api.github.com/search/issues?q=repo:continuedev/continue+sidebar+disappear, accessed 2026-11-15].
13. **Diff application reliability** — Issue #12091 "fall back to git CLI for diffs" indicates the in-house diff path needed a git-CLI fallback [Source: https://api.github.com/search/issues?q=repo:continuedev/continue+diff+overwrite, accessed 2026-11-15].

## 28. What should MiMo learn?

(Evidence-based, no MiMo design proposed.) Concrete patterns to learn from Continue's failures:
1. **Inline editor must initialize in <500 ms** — Continue's lazy-init 5-10 s and slow-saves (2-3 s per file save in #3753) destroyed perceived performance.
2. **File edits must apply as surgical diffs, never full-file rewrites** — #9379 shows full-file overwrite with model thoughts is catastrophic.
3. **Sidebar visibility is a P0 reliability** — the multi-year "extension doesn't show up" / "header disappears" pattern (#1312, #3535, #8085) destroyed user trust.
4. **Avoid top-level naming collisions** — having BOTH "Models" and "Model Providers" as adjacent nav items is documented confusion.
5. **Long-chat performance needs virtualization** — Continue had to refactor to Virtuoso (#9488).
6. **Autocomplete must not block the editor main thread** — #5055 + #3753 confirm the perceived-slowness cliff.

## 29. What should MiMo reject?

(Evidence-based, no MiMo design proposed.) Concrete patterns to reject:
1. **100% diff overwrites** (#9379) — never overwrite a file with model stream-of-thought.
2. **In-house diff application without git-CLI fallback** — Continue had to bolt on git CLI fallback (#12091).
3. **Mandatory UI-driven config template generation on first load** — Continue removed this in v2.0.0 final release (it caused perceived slowness).
4. **Anonymous telemetry by default** — Continue explicitly removed this in v2.0.0 final release [Source: README, accessed 2026-11-15].
5. **Mixing deprecated + live concepts in the same nav level** (Context Providers / @Codebase / @Docs all "(Deprecated)" but still listed).
6. **Read-only / abandoned upstream repo as a long-term foundation** — the README explicitly notes the repo is now read-only.

## 30. Confidence Score (0-100)

**Confidence: 78/100**.

Reasoning:
- Strong on: README's read-only status, final-2.0.0 release notes, GitHub issue bodies + comments for the failure cluster (#1312, #3535, #3753, #5055, #8085, #9379, #9488) — all primary-source, verbatim-quoted, with timestamps, comment counts, and reaction counts.
- Strong on: docs-home nav structure (extracted verbatim from raw-continue/home.html), confirming the Models-vs-Providers confusion and the deprecated-feature pile-up.
- Weaker on: live in-product UI (not directly observed in this pass — VS Code extension install + interactive testing was out of time budget). Several UX details (animation behaviour, accessibility tree, exact keyboard-shortcut bindings across versions, inline-editor lazy-init timing distributions) are inferred from issue text rather than directly measured.
- Weaker on: Agent-mode internals — Continue does not publish an event-stream / step-trace architecture, so the Agent Experience section is sparser than the equivalent sections for OpenHands / Replit.
- The "5-10 s lazy init" claim: no single canonical GitHub issue is titled exactly that; it is inferred from the cluster of slow-file-save / slow-autocomplete / slow-sidebar reports + the v2.0.0 release's explicit switch away from onboarding-template generation. Confidence on that specific claim is medium-low.

---
**Cached raw extracts:** `/home/z/my-project/research/evidence/raw-continue/` (home.html, readme.md, github-home.html, issue-{1312,3535,3753,5055,8085,9379}.json, comments-{1312,3753,8085,9379}.json, search-{sidebar,inline,overwrite,models-providers,kb}.json, release-latest.json, releases-list.json, releases-20.json, page-*.html).
