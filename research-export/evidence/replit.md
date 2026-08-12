# Replit Agent — Evidence-Based Product Research

**Task:** W8b · Phase R2 · EVIDENCE-BASED  
**Researcher:** Senior Product Researcher (general-purpose sub-agent)  
**Accessed date for all sources:** 2026-11-15  
**Method:** curl with Mozilla user-agent; Mintlify `.md` convention (docs.replit.com exposes Markdown source at `<path>.md`). Live product UI NOT directly observed in this pass (would require a Replit account + browser automation). Cached raw extracts in `raw-replit/`.

---

## 1. Product Overview

"Replit Agent turns your ideas into apps, designs, slides, and more, all from plain language. No coding required." [Source: https://docs.replit.com/features/agent/overview.md, accessed 2026-11-15; raw-replit/doc-overview.md]. Replit Agent is the agentic core inside Replit's cloud-hosted IDE — it differs from Continue / OpenHands in that it is fully cloud-native (no local install), runs in Replit-hosted containers, and ships with one-click publish-to-URL. The agent supports building: web apps, mobile apps (iOS/Android via Expo), data dashboards, AI-powered tools, visual designs and prototypes, multiple outputs in one project (web+mobile+slides sharing one backend), files and documents (CSV, PDF, PPTX, MD), connected-service queries (BigQuery, Linear, Slack, Notion), 3D games, and automations [Source: https://docs.replit.com/features/agent/overview.md, accessed 2026-11-15].

Replit Agent also ships **Plan mode** (brainstorm/planning), **Build mode** (default), and three cost/capability modes (**Lite / Economy / Power**) [Source: https://docs.replit.com/features/agent/plan-mode.md + agent-modes.md, accessed 2026-11-15].

## 2. Product Philosophy

Plain-language-in, app-out. From the overview: "Agent takes your ideas, helps you refine them, and then makes them real. Unlike a chatbot that only answers questions, Agent takes action: it sets up your project, creates applications, checks its work, and fixes problems along the way. Describe what you want in everyday language. No code or technical knowledge required. Agent handles the rest, from planning to deployment." [Source: https://docs.replit.com/features/agent/overview.md, accessed 2026-11-15].

Three design commitments evident across the docs:
1. **Human-in-the-loop approval gates** — every consequential change goes through an explicit Accept/Revise or Apply/Dismiss gate (§21, §12).
2. **Plain-English refinement** — when something is off, the user "ask[s] Agent to fix it in the main thread" in natural language [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15].
3. **Cost transparency** — every interaction is billable with effort-based pricing, and the docs repeatedly surface cost control (Plan mode, Lite/Economy/Power modes, App Testing cost trade-offs).

## 3. Core Mental Model (Replit workspace)

The workspace is the **Project Editor** — a single Replit App containing: (a) the main chat thread (where the user describes what they want and Agent proposes work), (b) the chat-input box with mode selector (Plan/Build, Lite/Economy/Power, primary model, Effort), (c) the **task board** with columns Drafts / Active / Ready / Done, (d) the **workspace** (file tree, code editor), (e) the **live preview** pane (web preview, mobile simulator), and (f) the **Design Canvas** (frames for visual design work) [Source: https://docs.replit.com/features/agent/overview.md + task-system.md + design/canvas.md, accessed 2026-11-15].

The mental model: **main thread for direction + decisions, background tasks for execution**. From the task-system docs: "Agent can work in two places: the main thread and background tasks. The main thread is the conversation where you describe what you want, refine direction, and decide what gets applied to your main version. Background tasks are separate threads where Agent works independently in isolated copies of your project. Use the main thread for direction and decisions. Use background tasks for execution that can happen in parallel. Background tasks do not change your main version until you review and apply them." [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15].

## 4. User Journey

Per the overview's "How to use Replit Agent" Steps [Source: https://docs.replit.com/features/agent/overview.md, accessed 2026-11-15]:
1. **Describe what you want** — start chatting in the Project Editor. Describe an app, ask a question, research a topic, or pull data from connected services (BigQuery, Slack, Notion). "There are no constraints."
2. **Choose what to build** (optional) — pick a project type (web app, mobile app, slides, design, data viz, animation, 3D game, document, spreadsheet, automation). "If you already described what you want in step 1, Agent figures out the right setup automatically."
3. **Agent builds it** — "Agent writes code, sets up infrastructure, and tests the result."
4. **Refine + publish** — chat with Agent to refine, then publish when ready. "All artifacts publish together."

## 5. Navigation

Top-level docs nav (from llms.txt + docs home) [Source: https://docs.replit.com/llms.txt, accessed 2026-11-15]:
- Build (tutorials for web apps, mobile, dashboards, ecommerce, mobile games, integrations, login, payments)
- Replit Agent (`/features/agent/*` — overview, plan-mode, agent-modes, model-selector, task-system, task-board, task-lifecycle, follow-up-tasks, voice-mode, web-search, app-testing, skills, agent-customization, general-agent, message-queue, automations, audio-generation, image-generation)
- Design (Canvas, Chat, Refine, Visual Editor, Build your design)
- Connectors (warehouses: BigQuery/Databricks/Snowflake; Linear/Jira/Gmail/Slack/Discord)
- Billing (Plans, AI Billing, Managing Spend)
- Core Concepts (Project Editor, Agent Task System)

In-product navigation: mode selector at bottom-left of chat input; Project Editor with file tree, code editor, preview pane; Design Canvas accessible separately.

## 6. Workspace

The Replit workspace = the cloud-hosted Project Editor. It includes the chat panel, code editor, file tree, secrets (encrypted env vars) [Source: https://docs.replit.com/core-concepts/project-editor/app-setup/secrets.md, accessed 2026-11-15], development URLs for sharing in-progress apps [Source: https://docs.replit.com/core-concepts/project-editor/app-setup/development-urls.md, accessed 2026-11-15]. Background tasks run "in isolated copies of your project" so the main version is never modified until Apply [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15].

## 7. Conversation (Replit chat)

The Agent chat box is the primary conversation surface. It supports: text input, **Voice Mode** (microphone button — speech transcribed into the chat box for review before sending, up to 6 minutes per recording, 30-s silence auto-stop) [Source: https://docs.replit.com/features/agent/voice-mode.md, accessed 2026-11-15], a **mode selector** (Plan / Build at top level, Lite / Economy / Power below), a **model selector** with Effort slider [Source: https://docs.replit.com/features/agent/model-selector.md, accessed 2026-11-15], an attached-frame chip when designing [Source: https://docs.replit.com/design/refine.md, accessed 2026-11-15]. Voice Mode: "Review before sending — Transcribed text lands in the chat box so you can read and edit it before sending — nothing is sent automatically" [Source: voice-mode.md, accessed 2026-11-15].

## 8. Agent Experience

Replit Agent is the agentic loop. It autonomously writes code, sets up infrastructure, tests results, and fixes problems [Source: overview.md, accessed 2026-11-15]. The agent operates via the **task system**: it splits a user request into discrete tasks, places them on a board (Drafts / Active / Ready / Done), and runs each task in an isolated copy of the project [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15]. The agent supports parallelism: "Core runs 1 background task at a time, while Pro supports up to 10 concurrent background tasks" [Source: same]. Tasks can declare dependencies — "a task that builds a dashboard depends on the task that creates the database schema. Dependent tasks wait until their prerequisites complete" [Source: same].

The agent also has a **"Begin take over"** affordance during App Testing: "Sometimes the Agent will encounter a roadblock during testing that it needs your help with to continue. Most commonly this involves logging in to a user account (e.g. Gmail). In these cases, the Agent will pop up with a button to 'Begin take over.'" — pressing it lets the human complete the steps in the testing preview, then Agent continues. "If you do not respond within 10 minutes, the Agent will continue as if you pressed 'Skip.'" [Source: https://docs.replit.com/features/agent/app-testing.md, accessed 2026-11-15].

Notably: Replit Agent does NOT publish an event-stream architecture like OpenHands. The traceability is via the task work log + test-result replay + live preview at task completion (§22).

## 9. Memory

Agent Skills provide cross-session memory: "Preserve patterns, conventions, and solutions across sessions with Agent Skills." [Source: https://docs.replit.com/features/agent/skills.md, accessed 2026-11-15; raw-replit/doc-skills.md]. Agent Customization adds "workspace-wide custom instructions and skills, managed centrally in Workspace Settings" [Source: https://docs.replit.com/features/agent/agent-customization.md, accessed 2026-11-15]. Web Search [Source: https://docs.replit.com/features/agent/web-search.md, accessed 2026-11-15] lets Agent pull up-to-date info during a build.

## 10. Knowledge (repo map)

Replit Agent maintains project awareness via the workspace (file tree + code). For external knowledge: Web Search (live docs), connected-service queries (BigQuery, Linear, Slack, Notion, Jira, Gmail, Discord) [Source: https://docs.replit.com/features/agent/general-agent.md, accessed 2026-11-15; raw-replit/doc-general-agent.md]. Agent Skills are installable patterns from a Skills Directory [Source: https://docs.replit.com/features/agent/skills-directory.md, accessed 2026-11-15]. The Replit docs do not advertise an explicit "repo map" data structure like Cursor's (Replit's project awareness comes from the workspace + Agent's browsing of the file tree).

## 11. Search

Web Search is a built-in agent capability — "Learn how Agent searches the web to build apps with up-to-date information and the latest documentation." [Source: https://docs.replit.com/features/agent/web-search.md, accessed 2026-11-15]. Code search within the workspace is implicit (Agent reads files directly). Connected-service queries let Agent pull structured data from BigQuery, Snowflake, Databricks, Linear, Slack, Notion, etc. [Source: connectors section of llms.txt, accessed 2026-11-15].

## 12. Execution (tool calls, file edits, terminal, plan steps)

Replit Agent's execution model is task-based:
- **Plan mode** generates an ordered task list ("Break down complex projects into ordered task lists", "Explore different approaches and weigh trade-offs", "Review and refine before any code is written"). User reviews and clicks "Start building" to approve [Source: https://docs.replit.com/features/agent/plan-mode.md, accessed 2026-11-15].
- **Build mode** runs tasks. Background tasks execute in isolated copies of the project so the main version is untouched until Apply [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15].
- **Apply / Dismiss** — when a task finishes, the user gets the work log, test results, and a live preview. They click "Apply changes to main version" or "Dismiss" [Source: same].
- **Auto-merge** is configurable per-user (auto-apply for background tasks, auto-approve for plans) [Source: https://docs.replit.com/features/agent/agent-modes.md, accessed 2026-11-15].
- **Plain-English fixes**: "If something looks off afterward, ask Agent to fix it in the main thread." [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15].
- **App Testing** (Economy/Power modes only; off in Lite): Agent opens a browser preview, navigates the app like a real user, clicks around, enters mock data, analyzes results, auto-fixes issues [Source: https://docs.replit.com/features/agent/app-testing.md, accessed 2026-11-15].

## 13. Artifacts (diffs, applied edits, PRs)

Each completed task produces: a **work log**, **test results** (video replay with section navigation), and a **live preview** of the changes [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15; raw-replit/doc-task-system.md]. Application of a task's changes is a merge into the main version with AI-assisted conflict resolution: "Agent uses AI-assisted conflict resolution. It understands what each task was trying to accomplish and applies the changes intelligently. If something looks off, you can ask Agent to fix it in the thread." [Source: https://docs.replit.com/core-concepts/agent/task-system.md FAQ, accessed 2026-11-15]. There is no explicit "PR" concept — Replit uses direct Apply-to-main + one-click publish-to-URL instead of a PR workflow.

## 14. Keyboard UX

Documented: **⌘+Shift+I (Ctrl+Shift+I on Windows)** cycles through Agent modes (Lite → Economy → Power) without leaving the chat input [Source: https://docs.replit.com/features/agent/agent-modes.md, accessed 2026-11-15]. Plan mode is toggled via the mode-selector dropdown at the bottom-left of the chat input [Source: https://docs.replit.com/features/agent/plan-mode.md, accessed 2026-11-15]. Voice Mode is invoked via a microphone button in the chat box [Source: https://docs.replit.com/features/agent/voice-mode.md, accessed 2026-11-15]. The docs do not document an exhaustive keybinding list (no "Keyboard Shortcuts" page in the nav).

## 15. Motion

The task-card animations are documented in CSS keyframes inside the docs themselves — e.g. `@keyframes task-card-fade-in { from { transform: translateY(6px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }` and a complex status-dot pulse animation `@keyframes tc-tl`/`tc-tr`/`tc-bl`/`tc-br` with 0-95% opacity steps for an "active" status indicator [Source: https://docs.replit.com/features/agent/task-lifecycle.md, accessed 2026-11-15; raw-replit/doc-task-lifecycle.md]. App Testing shows a live browser preview with Agent's cursor moving through the app [Source: https://docs.replit.com/features/agent/app-testing.md, accessed 2026-11-15].

## 16. Animation

From the same task-card CSS [Source: https://docs.replit.com/features/agent/task-lifecycle.md, accessed 2026-11-15]:
- Task cards fade-in with `translateY(6px)` → `translateY(0)` + opacity 0→1.
- Active-status dots use multi-step opacity keyframes (0%→5%→10%→...→95%) to create a pulsing "running" indicator.
- Applying-state cards use a `tc-drop` keyframe pattern.
- Voice Mode's recording UI shows a live waveform [Source: voice-mode.md, accessed 2026-11-15].

The motion language is restrained: small (6 px) vertical translations, opacity fades, status-dot pulses — no large/springy motion.

## 17. Visual Hierarchy

The docs nav structure (top-down): Build (tutorials) → Replit Agent features (Plan Mode, Agent Modes, Model Selector, Task System, Task Board, Task Lifecycle, Follow-up Tasks, Voice Mode, Web Search, App Testing, Skills, Agent Customization, General Agent, Message Queue, Automations, Audio Generation, Image Generation) → Design (Canvas, Chat, Refine, Visual Editor, Build, Design System) → Connectors → Billing → Core Concepts → Trust and Safety → Changelog [Source: https://docs.replit.com/llms.txt, accessed 2026-11-15].

In-product hierarchy: chat panel is primary; mode selector is at bottom-left of chat input (i.e., placed at the highest-attention zone of the input where the user's eye lands before typing); task board is a sibling view (toggleable); preview pane is a sibling to the editor.

## 18. Progressive Disclosure

Replit uses progressive disclosure aggressively:
1. The default flow is "describe → agent builds" with no required config.
2. Plan mode is OPT-IN (a separate mode toggle) — users who don't want a plan step can stay in Build.
3. Lite / Economy / Power modes default to Economy; Advanced settings (App Testing, High effort, Turbo) are hidden behind an "Advanced settings" expander [Source: https://docs.replit.com/features/agent/overview.md, accessed 2026-11-15].
4. The task board is a separate view (Board view) — the main thread is the default; users can ignore the board if they want.
5. Visual Editor (Design) is invoked only when the user clicks an element with the Edit tool — otherwise the chat is the primary surface [Source: https://docs.replit.com/design/refine.md, accessed 2026-11-15].
6. Voice Mode: "Voice Mode turns your speech into text in the chat box. It does not read Agent's responses aloud" — i.e., voice is a one-way input affordance, not a fully voice-driven mode [Source: voice-mode.md, accessed 2026-11-15].

## 19. Accessibility

- Voice Mode: explicitly designed for accessibility / mobile — "Voice Mode is helpful when typing is slow or awkward — especially on mobile, where dictating a full prompt is often faster than thumb-typing it." [Source: voice-mode.md, accessed 2026-11-15].
- App Testing covers "Performance and accessibility: Load times, responsiveness, and accessibility standards" [Source: app-testing.md, accessed 2026-11-15] — i.e., the agent itself checks the app's a11y.
- No dedicated keyboard-shortcuts doc page (only the ⌘+Shift+I mode-cycle shortcut is documented). No high-contrast / screen-reader documentation was found in the docs nav.
- The task-card CSS uses both light and dark theme tokens (`--replit-docs-bg-task`, etc.) [Source: task-lifecycle.md, accessed 2026-11-15] — supports dark mode.

## 20. Performance Perception (cloud latency)

Replit is fully cloud-hosted, so latency is dominated by: (a) cloud-build latency (Agent writes code in a remote container), (b) live-preview cold-start, (c) background-task scheduling. The docs surface this via:
- **Lite mode** (10-60 seconds) — explicitly positioned for "Quick fixes, UI polish, and short iteration loops while you stay at your keyboard" [Source: https://docs.replit.com/features/agent/agent-modes.md, accessed 2026-11-15].
- **Turbo** mode (Pro and Enterprise): "up to 2.5x faster builds at higher cost" [Source: overview.md, accessed 2026-11-15].
- **Background tasks** reduce perceived latency: "Background tasks queue automatically based on your plan, so work keeps moving without crowding the main thread." [Source: task-system.md, accessed 2026-11-15].
- **Take-over timeout**: 10-minute auto-skip during App Testing if the user doesn't respond [Source: app-testing.md, accessed 2026-11-15] — i.e., the system handles long user-response latency gracefully without blocking the agent.

## 21. Trust (plan approval gate + clarifying questions)

This is Replit's strongest UX pattern. The plan-approval gate is explicit and consistent:
1. In **Plan mode**, Agent generates an ordered task list. The user reviews it. They can click **"Start building"** to approve, or keep chatting to refine [Source: https://docs.replit.com/features/agent/plan-mode.md, accessed 2026-11-15].
2. In the task system, when Agent proposes a set of tasks, the user chooses: **"Accept tasks"** (start all and send to background) or **"Revise plan"** (ask Agent to adjust) [Source: https://docs.replit.com/core-concepts/agent/task-system.md, accessed 2026-11-15]. This is the explicit "plan approval gate" + "clarifying questions" pattern.
3. Even after a task finishes, the user reviews via **Apply changes to main version** or **Dismiss** — a second approval gate [Source: same].
4. **Plain-English fixes**: "If something looks off afterward, ask Agent to fix it in the main thread." [Source: same]. This is the "plain-English fixes" affordance referenced in the task brief.
5. Settings are **user-tied, not project-tied**: "Your Agent settings are tied to you, not to the project. When you invite a teammate into a project, each of you keeps your own choices for: Mode (Lite, Economy, or Power), Primary model and Effort, Plan Mode, Auto-merge for background tasks, Auto-approve for plans. A teammate switching to Power on their next task does not flip your settings to Power." [Source: https://docs.replit.com/features/agent/agent-modes.md, accessed 2026-11-15] — i.e., multiplayer-safe per-user trust settings.

## 22. Explainability

Replit Agent's explainability is operational rather than architectural:
- **Work log per task** — "When a task finishes, Agent shows you what it did: the work log, test results, and a live preview of the changes." [Source: task-system.md, accessed 2026-11-15].
- **Interactive video replay** for App Testing — "After testing, click the video to replay the entire testing session. Use the sliders at the bottom to jump to specific sections of the test." [Source: app-testing.md, accessed 2026-11-15].
- **Thread view** for background tasks — "each task runs in its own thread with a live status indicator, so you can follow along or jump into any task's conversation" [Source: task-system.md, accessed 2026-11-15].
- **Board view** — column-based with status (Draft / Active / Queued / Ready / Applying / Done) [Source: https://docs.replit.com/features/agent/task-lifecycle.md, accessed 2026-11-15].

There is no published event-stream / step-trace data structure (unlike OpenHands). The explainability surface is the task + work-log + video replay.

## 23. Long Session Experience

- **Background tasks** allow parallel long-running work without blocking the main thread.
- **Message Queue** for queued follow-up messages — "Learn how to queue follow-up messages for Agent so it handles them in order after finishing its current task." [Source: https://docs.replit.com/features/agent/message-queue.md, accessed 2026-11-15].
- **Follow-up tasks** — Agent suggests next tasks at the end of a run, which the user can review/start/bulk-manage [Source: https://docs.replit.com/features/agent/follow-up-tasks.md, accessed 2026-11-15].
- **Task lifecycle** has explicit long-session states: Draft → Active → Queued → Ready → Applying → Done, with Archiving and Cancelling semantics [Source: task-lifecycle.md, accessed 2026-11-15].
- **Cost monitoring** via Managing Your Spend page [Source: https://docs.replit.com/billing/managing-spend.md, accessed 2026-11-15].

## 24. Power User Features

- Three agent modes (Lite / Economy / Power) + Turbo (Pro/Enterprise) for 2.5x faster builds [Source: overview.md + agent-modes.md, accessed 2026-11-15].
- Model Selector with Effort slider — "raise the Effort so Agent reaches for its most powerful frontier model on the most complex tasks" [Source: overview.md, accessed 2026-11-15].
- Plan mode for explicit pre-build planning + Accept/Revise approval gate [Source: plan-mode.md, accessed 2026-11-15].
- Task board with up to 10 concurrent background tasks (Pro plan) [Source: task-system.md, accessed 2026-11-15].
- Agent Skills (preserve patterns/conventions across sessions) + Skills Directory (installable from Replit + partners) [Source: https://docs.replit.com/features/agent/skills.md + skills-directory.md, accessed 2026-11-15].
- Agent Customization with workspace-wide custom instructions [Source: https://docs.replit.com/features/agent/agent-customization.md, accessed 2026-11-15].
- Connect via MCP — "Connect Replit Agent to external tools, data sources, and APIs through the Model Context Protocol (MCP)" [Source: https://docs.replit.com/build/connect-via-mcp.md, accessed 2026-11-15].
- Web Search capability [Source: https://docs.replit.com/features/agent/web-search.md, accessed 2026-11-15].
- App Testing with interactive replay + take-over [Source: app-testing.md, accessed 2026-11-15].
- Voice Mode (speech-to-text in chat input, 6-min max per recording) [Source: voice-mode.md, accessed 2026-11-15].
- Automations + General Agent (any framework, any output type, read/write to connected services) [Source: https://docs.replit.com/features/agent/automations.md + general-agent.md, accessed 2026-11-15].
- ⌘+Shift+I mode-cycle shortcut [Source: agent-modes.md, accessed 2026-11-15].

## 25. Developer Experience (Replit API)

Replit is closed-source and cloud-hosted (no self-host). The DX is shaped by: (a) the cloud IDE itself (no install required — sign up and start chatting), (b) the docs at docs.replit.com (Mintlify-served, expose `.md` source for LLM friendliness, has `/llms.txt` index [Source: https://docs.replit.com/llms.txt, accessed 2026-11-15]), (c) third-party tooling via MCP connectors [Source: connect-via-mcp.md, accessed 2026-11-15], (d) mobile-app building via Expo + native iOS/Android components [Source: mobile-* docs, accessed 2026-11-15], (e) one-click publishing to a public URL. There is no published Replit Agent SDK / API for programmatic agent invocation — the agent is only accessible through the Replit UI.

## 26. Biggest Strengths (with evidence)

1. **Explicit plan-approval gate** — Accept tasks / Revise plan / Start building [Source: task-system.md + plan-mode.md, accessed 2026-11-15].
2. **Plain-English fix affordance** — "ask Agent to fix it in the main thread" [Source: task-system.md, accessed 2026-11-15].
3. **Live preview at task completion** — work log + test results + live preview + video replay [Source: task-system.md + app-testing.md, accessed 2026-11-15].
4. **Background tasks with isolated copies** — main version is never touched until Apply [Source: task-system.md, accessed 2026-11-15].
5. **Three cost/capability modes** — Lite (10-60s), Economy (default), Power (+Turbo 2.5x) [Source: agent-modes.md, accessed 2026-11-15].
6. **Per-user settings in shared projects** — multiplayer-safe trust model [Source: agent-modes.md, accessed 2026-11-15].
7. **Take-over button** during App Testing — graceful human-in-loop for CAPTCHAs/logins [Source: app-testing.md, accessed 2026-11-15].
8. **AI-assisted conflict resolution** on Apply [Source: task-system.md FAQ, accessed 2026-11-15].
9. **Voice Mode with review-before-send** — accessibility win [Source: voice-mode.md, accessed 2026-11-15].
10. **Effort-based pricing transparency** + spend-management tools [Source: managing-spend.md, accessed 2026-11-15].

## 27. Biggest Weaknesses (with evidence — cloud)

1. **Fully cloud-hosted** — no local/offline mode; requires Replit account + internet [Source: docs.replit.com throughout, accessed 2026-11-15]. No BYO-model for privacy-sensitive teams.
2. **Cloud-build latency** — mitigated by Lite mode (10-60s) and Turbo (2.5x) but inherent to the cloud model [Source: agent-modes.md, accessed 2026-11-15].
3. **No published programmatic API/SDK** — Agent only accessible through the Replit UI (no `replit-agent` CLI, no Python SDK for invoking Agent) [Source: docs.replit.com — no SDK/API page in nav, accessed 2026-11-15].
4. **Limited concurrent background tasks on Core** — only 1 at a time on Core plan (Pro supports 10) [Source: task-system.md, accessed 2026-11-15].
5. **Cost can accumulate** — every interaction is billable: "All Agent interactions are billable — whether Agent responds with text guidance or makes code changes, there is always a charge, though smaller requests cost less." [Source: plan-mode.md, accessed 2026-11-15].
6. **App Testing limited to Full Stack JavaScript and Streamlit Python** — not available for all web frameworks [Source: app-testing.md, accessed 2026-11-15].
7. **No published event-stream / step-trace** — debugging long agent runs relies on the work log + video replay rather than a structured trace [Source: docs.replit.com — no event-stream page, accessed 2026-11-15].
8. **Take-over auto-skip after 10 min** — if the user is slow to respond, the agent proceeds as if skipped, which can drop context [Source: app-testing.md, accessed 2026-11-15].
9. **No first-class PR workflow** — Replit uses direct Apply-to-main + publish-to-URL instead of GitHub-PR-style review; teams used to PRs must adapt [Source: task-system.md, accessed 2026-11-15].
10. **Visual Editor in Design is credit-free but only for simple edits** — complex changes still require chat + credit spend [Source: refine.md, accessed 2026-11-15].
11. **Voice Mode is one-way** — speech-to-text only, no spoken responses [Source: voice-mode.md, accessed 2026-11-15].

## 28. What should MiMo learn?

(Evidence-based, no MiMo design proposed.) Concrete patterns to learn:
1. **Explicit plan-approval gate** with "Accept tasks" / "Revise plan" dual path [Source: task-system.md, accessed 2026-11-15].
2. **Plain-English fix loop** — "ask Agent to fix it in the main thread" — natural-language remediation after a task [Source: task-system.md, accessed 2026-11-15].
3. **Live preview + work log + test results at task completion** — three-piece artifact bundle per task [Source: task-system.md, accessed 2026-11-15].
4. **Background tasks in isolated copies** — main version never mutated until Apply [Source: task-system.md, accessed 2026-11-15].
5. **Three cost/capability modes** with clear semantics (Lite=quick scoped, Economy=default, Power=most capable) [Source: agent-modes.md, accessed 2026-11-15].
6. **Per-user settings in shared projects** — multiplayer-safe trust [Source: agent-modes.md, accessed 2026-11-15].
7. **AI-assisted conflict resolution on Apply** with plain-English follow-up if it goes wrong [Source: task-system.md FAQ, accessed 2026-11-15].
8. **"Begin take over" affordance** for human-in-loop moments (CAPTCHA/login) with a 10-min auto-skip [Source: app-testing.md, accessed 2026-11-15].
9. **Effort slider** to dial model power up/down per task [Source: model-selector.md, accessed 2026-11-15].
10. **Task lifecycle as a kanban board** (Draft / Active / Queued / Ready / Applying / Done) [Source: task-lifecycle.md, accessed 2026-11-15].
11. **Credit-free Visual Editor** for simple design tweaks ("simple edits, like text changes, color picks, and spacing tweaks, apply to the source code instantly without spending credits") [Source: refine.md, accessed 2026-11-15].
12. **Voice Mode with review-before-send** — speech-to-text in chat box, never auto-sent [Source: voice-mode.md, accessed 2026-11-15].

## 29. What should MiMo reject?

(Evidence-based, no MiMo design proposed.) Concrete patterns to reject:
1. **Making every interaction billable** including pure-text Q&A in Plan mode ("All Agent interactions are billable") — discourages exploratory planning [Source: plan-mode.md, accessed 2026-11-15].
2. **10-min auto-skip in take-over** — silently dropping user context after a fixed timeout [Source: app-testing.md, accessed 2026-11-15].
3. **App Testing only on Full Stack JS + Streamlit** — too narrow [Source: app-testing.md, accessed 2026-11-15].
4. **1 concurrent background task on Core** — too restrictive for serious multi-task work [Source: task-system.md, accessed 2026-11-15].
5. **No published SDK/API** — agent only accessible via UI; cannot be embedded in pipelines [Source: docs.replit.com — no SDK page, accessed 2026-11-15].
6. **Direct Apply-to-main without PR review** — bypasses the team review workflow many engineering teams rely on [Source: task-system.md, accessed 2026-11-15].
7. **Voice Mode is one-way** — no spoken responses limits the modalities [Source: voice-mode.md, accessed 2026-11-15].
8. **No published event-stream architecture** — debugging is operational (work logs, video) rather than structured (event trace) [Source: docs.replit.com, accessed 2026-11-15].

## 30. Confidence Score (0-100)

**Confidence: 86/100**.

Reasoning:
- Strong on: All canonical docs (overview, plan-mode, agent-modes, task-system, task-lifecycle, app-testing, voice-mode, refine, model-selector, agent-customization, managing-spend, skills, message-queue, follow-up-tasks, web-search, general-agent) — fetched via Mintlify `.md` convention; all primary-source with verbatim quotes.
- Strong on: docs index (llms.txt + llms-full.txt at 1.6 MB) — comprehensive coverage of all Replit Agent feature pages.
- Strong on: task-card animation CSS (extracted verbatim from task-lifecycle.md source).
- Strong on: per-user settings (verbatim quote), 10-min take-over auto-skip (verbatim quote), billable-everything policy (verbatim quote), background-task concurrency limits (Core=1, Pro=10, verbatim quote).
- Weaker on: live in-product UI (not directly observed — would require Replit account + browser automation). Several fine-grained interaction details (exact keyboard-shortcut list beyond ⌘+Shift+I, accessibility-tree state, exact animation timing curves, mobile-app build flow specifics) are inferred from docs rather than directly measured.
- Weaker on: Replit Agent's internal architecture (no published event-stream / step-trace model — unlike OpenHands). Architecture claims are inferred from the docs' description of the task lifecycle.
- The clarifying-questions pattern: Replit does not have a dedicated "Clarifying Questions" docs page (none exists in llms.txt); the equivalent behavior is the "Revise plan" affordance in Plan mode + task approval gate. This is documented in plan-mode.md and task-system.md.

---
**Cached raw extracts:** `/home/z/my-project/research/evidence/raw-replit/` (docs-home.html, blog-index.html, agent-overview.html, replit-home.html, llms.txt [59 KB], llms-full.txt [1.6 MB], doc-overview.md [73 KB], doc-plan-mode.md, doc-agent-modes.md, doc-task-system.md, doc-task-lifecycle.md, doc-task-board.md, doc-app-testing.md, doc-voice-mode.md, doc-web-search.md, doc-model-selector.md, doc-agent-customization.md, doc-skills.md, doc-message-queue.md, doc-follow-up-tasks.md, doc-general-agent.md, doc-managing-spend.md, doc-use-agent-skills.md, doc-canvas.md, doc-refine.md).
