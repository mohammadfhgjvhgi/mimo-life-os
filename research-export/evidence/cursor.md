# Cursor — Evidence File (W2 / Phase R2)

**Product:** Cursor IDE (cursor.com)
**Vendor:** Anysphere
**Role:** AI-first code editor (fork of VS Code) with integrated Agent, Composer, Tab, and Cloud Agents
**Research date:** 2025-08-07
**Researcher:** W2 agent (general-purpose)
**Method:** Official docs (cursor.com/docs), official blog (cursor.com/blog), Cursor community forum, npm-installed Claude Code CLI used for parallel comparison, raw HTML + RSC extraction from cursor.com (Next.js SPA). Cursor desktop binary NOT installed (Electron binary requires GUI; sandbox headless). Where docs are JS-rendered, RSC payload was extracted from inline `<script>self.__next_f.push(...)</script>` blocks. Evidence type is tagged inline.

> **Important caveat:** Cursor is a desktop IDE binary. The sandbox cannot run the Electron app. Direct interaction claims marked `Not directly accessed`. All visual / UX claims sourced from official docs + forum + blog.

---

## 1. Product Overview

- "Cursor is a coding agent for building ambitious software." [Source: https://cursor.com/docs (RSC payload extracted from inline Next.js stream), accessed 2025-08-07]
- "Official Cursor documentation. Covers Agent mode, Rules, Skills, MCP servers, CLI, models, and Teams & Enterprise setup." [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
- "Cursor is a fork of VS Code." [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07 — confirmed by community + Anysphere funding posts]
- Made by Anysphere. "The company who created Cursor are Anysphere: https://anysphere.inc/. Anysphere received some funding from OpenAI." [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- "Agent is Cursor's assistant that can complete complex coding tasks independently, run terminal commands, and edit code." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Components: Agent, Composer (multi-file), Tab (autocomplete), Browser (visual editor), Cloud Agents, Rules, Skills, MCP. [Source: https://cursor.com/docs (RSC payload), accessed 2025-08-07]

## 2. Product Philosophy

- "Cursor can now create plans, research your codebase, and run agents for significantly longer." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- "Most new features at Cursor now begin with Agent writing a plan. We've seen this significantly improve the code generated." — Jai Smith, Cursor [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- "We're excited to release a visual editor for the Cursor Browser. It brings together your web app, codebase, and powerful visual editing tools, all in the same window." [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- "We see a future where agents are even more deeply connected to building apps on the web, and humans express their ideas through interfaces that connect thought to code more directly." — Jason Ginsberg & Ryo Lu, Cursor [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- Cursor's agent "orchestrates these components for each model we support, tuning instructions and tools specifically for every frontier model." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]

## 3. Core Mental Model

- **Editor-first with agent superpowers.** Cursor is a VS Code fork — the user's primary surface remains the editor + file tree + tabs. AI is layered on top via three bindings: Cmd-K (inline edit), Cmd-L (chat sidebar), Cmd-I (Composer multi-file). [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- Agent mode is the unifying concept: "Agent is Cursor's assistant that can complete complex coding tasks independently, run terminal commands, and edit code." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Plan Mode: when you prompt Agent to create a plan, "Cursor researches your codebase to find relevant files, review docs, and ask clarifying questions." When approved, "it creates a Markdown file with file paths and code references. You can edit the plan directly, including adding or removing to-dos." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Mental model = pair-programmer with persistent workspace, not autonomous worker. Cloud Agents are the autonomous variant. [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 4. User Journey

- **First-run:** Not directly accessed (Cursor desktop not installable in sandbox). Forum reports indicate first-run shows a "what is Cursor" intro + keybinding hints. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07 — community description, NOT primary]
- **Onboarding docs claim:** "Start building in minutes." [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
- **Daily flow:** Cmd-K for in-file edits, Cmd-L for chat panel, Cmd-I (Composer) for multi-file edits, Tab for autocomplete. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- **Long-term:** Project Rules + User Rules + Team Rules + AGENTS.md accumulate. "Start simple. Add rules only when you notice Agent making the same mistake repeatedly. Check your rules into git so your whole team benefits." [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- **Power-user endpoint:** Cloud Agents run in cloud VMs. "Use one when a task spans separate frontend, backend, infrastructure, or shared-library repositories." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 5. Navigation

- VS Code-derived layout: Activity Bar (left), Side Bar (Explorer/Search/Source Control/Extensions + Cursor Chat), Editor (with tabs), Panel (terminal/output/problems), Status Bar (bottom). [Source: VS Code public docs layout, plus Cursor community forum, https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- "Cascade icon in the top right corner of the Devin Desktop window" — NOT Cursor; this is the Windsurf pattern (see windsurf.md). Cursor's chat is in the LEFT sidebar (Cmd-L), per forum. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- Not directly accessed for direct observation; inferred from VS Code baseline (Cursor is a VS Code fork) + forum.

## 6. Workspace

- Inherited VS Code split-view, terminal panel, multi-tab. [Source: VS Code baseline + forum, https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- "Cursor Browser" is a NEW dedicated panel — a Chromium instance inside Cursor with a visual editor overlay. Lets you "drag elements around, inspect components and props directly, and describe changes while pointing and clicking." [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- Browser panel surfaces: drag-and-drop DOM manipulation, props sidebar (with sliders/palettes/color pickers), point-and-prompt. "The agents run in parallel, and within seconds your changes are live." [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- Cloud Agents have their OWN workspace: "VMs in the cloud with full development environments instead of on your local machine." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 7. Conversation

- Chat panel (Cmd-L) lives in the sidebar. Two historical modes: "Normal" and "Interpreter" (Interpreter generates executable Python). [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- Composer (Cmd-I) is the multi-file variant. Forum: "Composer... can edit code across multiple files." [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- Streaming: not directly observed. Plan Mode includes "an interactive editor to modify plans inline." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- "Queue follow-up messages while Agent is working on the current task." — built-in feature. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Checkpoints in the chat timeline: "click any checkpoint in the chat timeline to preview your files at that point, then restore to revert all files to that state. Checkpoints are stored locally and separate from Git." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]

## 8. Agent Experience

- **Agent is the core visual concept.** Tools listed in docs: "Intelligently read the content of a file", "Execute terminal commands and monitor output", "Control a browser to take screenshots, test applications, and verify visual changes", "Generate images from text descriptions or reference images", "Ask clarifying questions during a task. While waiting for your response, the agent continues reading files, making edits, or running commands." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- **Plan Mode visualization:** Markdown plan file with file paths, code references, todos. Inline editable. [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- **Cloud Agents dashboard:** "shows which environment and Build an agent used, along with environment details and version history. On the agent page, hover over the repository name at the top of the page to inspect the environment used for that run." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
- **Clarifying questions:** Async — "While waiting for your response, the agent continues reading files, making edits, or running commands." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Not directly observed; evidence is from official docs only.

## 9. Memory

- **Rules system** with three scopes:
  - User Rules: "Global to your Cursor environment." [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
  - Project Rules: "Agent instructions in markdown format." Each rule is a markdown file with frontmatter metadata. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
  - Team Rules: "Team-wide rules managed from the dashboard." "When enabled, the rule is required for all team members and cannot be disabled in Customize." "By default, non‑enforced Team Rules can be disabled by users. Team Rules support glob patterns for file-scoped application." [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- **AGENTS.md support:** "Configure persistent instructions with Project, Team, and User Rules, plus AGENTS.md." [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- **How rules load:** "Large language models don't retain memory between completions. When applied, rule contents are included at the start of the model context." [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- **Frontmatter:** `alwaysApply: true` makes a rule load on every chat session. Also supports glob-pattern based file-scoped rules. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- **`.cursorrules` legacy:** Project Rules replaced the older `.cursorrules` file pattern (community references; not in current docs). [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204 community mentions, accessed 2025-08-07]
- **Per-session memory only.** No mention of Claude-Code-style "auto memory" — Cursor relies on user-authored rules. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07 — absence of auto-memory feature]

## 10. Knowledge (Context Engine)

- Cursor indexes the codebase via embeddings (forum mentions "codebase indexing and the vector embedding process"). [Source: https://forum.cursor.com/t/cursor-feature-deep-dive/13963, accessed 2025-08-07]
- **@-mentions** in chat: `@Files`, `@Folders`, `@Docs` (custom doc indexing, e.g., add a Gist link as a doc). [Source: https://forum.cursor.com/t/tutorial-adding-full-repo-context-pdfs-and-other-docs/33925, accessed 2025-08-07]
- Note: forum thread "Where did the @docs go?" (May 2026, version 3.5.33) suggests @Docs feature was temporarily removed in a recent release. [Source: https://forum.cursor.com/t/where-did-the-docs-go/161651, accessed 2025-08-07]
- Plan Mode automatically researches: "Cursor researches your codebase to find relevant files, review docs, and ask clarifying questions." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Cloud Agents: "Cloud Agents use a curated selection of models." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 11. Search

- Inherited VS Code: Cmd-P (quick open), Cmd-Shift-F (project search), Cmd-F (file search). [Source: VS Code baseline + Cursor fork confirmation, https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- "AI-powered find and replace that applies natural language prompts to each match." — actually from Windsurf/Devin Desktop docs; Cursor equivalent unverified. [Note: cross-contamination risk; this claim belongs to Windsurf]
- Not directly accessed.

## 12. Execution

- Agent tools: file read, terminal execute, browser control, image generation, clarifying questions. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Terminal commands: "Execute terminal commands and monitor output." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Browser control: "Agent can navigate pages, interact with elements, and capture the current state for analysis." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Plan execution: Plan Mode writes a Markdown plan file; user can edit; "build directly from your plan when ready." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Cloud Agents: "can build, test, and interact with the changed software. They can also use computers to control the desktop and browser." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 13. Artifacts

- Plan Mode: Markdown plan files with file paths + code references. [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Checkpoints: snapshots of codebase during an Agent session, restorable from chat timeline. "Stored locally and separate from Git." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Inline diffs in editor (Cmd-K results) — standard for VS Code extensions. Not directly observed.
- Visual editor changes: "tell the agent to apply it. The agent will locate the relevant components and update the underlying code for you." [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- Cloud Agents produce: "VM provisioning, isolation, snapshots, startup, artifacts, and capacity." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 14. Keyboard UX

- **Cmd/Ctrl + K:** in-file code generation (inline edit). [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- **Cmd/Ctrl + L:** open AI chat panel in sidebar. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- **Cmd/Ctrl + I:** Composer (multi-file edit). [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- **Shift + Tab:** enter Plan Mode in the agent input. [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- **Tab:** accept Cursor Tab autocomplete suggestion (VS Code inherited convention).
- **Cmd-K in terminal:** generate terminal commands from natural language. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
- Full keybinding reference is in user-settings JSON (VS Code inherited). [Source: not directly accessed — Wayback Machine had not archived cursor.com/docs/keybindings as of access date]

## 15. Motion

- Not directly observed (Cursor desktop not installed). Visual editor blog mentions "live color pickers that preview your choices" — implies real-time. [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- Plan Mode editor is described as "interactive" — implies inline editing transitions. [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- No public Cursor design blog with motion specs found.

## 16. Animation

- No public Cursor design-engineering blog on easing/durations found. Visual editor blog mentions "tweaks are fully interactive: live color pickers" — implies CSS transitions on hover/preview states. [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- Cursor is built on VS Code / Electron; default motion inherits VS Code (subtle, fast).

## 17. Visual Hierarchy

- Not directly observed. From blog screenshots (described): the Browser panel + visual editor sidebar dominate when active; chat sidebar is left rail; editor center. [Source: https://cursor.com/blog/browser-visual-editor screenshots described, accessed 2025-08-07]
- Plan Mode: "interactive editor to modify plans inline" — plan content is the focus when in Plan Mode. [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]

## 18. Progressive Disclosure

- **Layered reveal:** User starts with Cmd-K (simplest). Cmd-L chat is one level up. Cmd-I Composer is multi-file. Plan Mode is full-agent. Cloud Agents are remote autonomous. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204 + https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Rules system is opt-in: "Start simple. Add rules only when you notice Agent making the same mistake repeatedly." [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- Visual editor sidebar reveals: drag-and-drop → props panel → color pickers → point-and-prompt. [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]

## 19. Accessibility

- No a11y statements found on cursor.com/docs or cursor.com/blog as of access date.
- Inherits VS Code Electron accessibility baseline (standard for VS Code forks). [Source: VS Code public a11y docs, https://code.visualstudio.com/docs/editor/accessibility, accessed 2025-08-07]
- Not directly accessed.

## 20. Performance Perception

- No official perf claims in docs/blog as of access date.
- Forum thread on "big projects" suggests slowdowns are a real user concern; the recommended cure is heavy use of Rules + PRD documents. [Source: https://forum.cursor.com/t/guide-how-to-handle-big-projects-with-cursor/70997, accessed 2025-08-07]
- Forum thread "Where did the @docs go?" (May 2026) suggests the @Docs feature was removed in v3.5.33 — possibly for performance or reliability reasons. [Source: https://forum.cursor.com/t/where-did-the-docs-go/161651, accessed 2025-08-07]
- Cloud Agents: "Not setting up a development environment for your cloud agents is like not giving your engineers a computer. This is why environment setup is the most important step to improve the effectiveness of cloud agents." — implies agent slowness is usually an environment problem. [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 21. Trust

- **Checkpoints** are the primary per-session trust mechanism: "If Agent takes a wrong turn, click any checkpoint in the chat timeline to preview your files at that point, then restore to revert all files to that state." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Checkpoints are separate from Git — user does NOT need to commit to roll back. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- **Queue follow-up messages** lets the user redirect without aborting. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- Cloud Agents run on Cursor-managed VMs: "Cursor manages VM provisioning, isolation, snapshots, startup, artifacts, and capacity." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
- Team Rules: enforced rules "cannot be disabled in Customize" — admin-level trust for organizations. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- No explicit accept/reject-per-file docs found (vs. Codex/Windsurf which explicitly model this). Inferred: Cursor relies on Checkpoints + Git diff after the fact.

## 22. Explainability

- Plan Mode is the primary explainability mechanism: the agent writes a plan first, the user can edit it, then build. "Most new features at Cursor now begin with Agent writing a plan." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Clarifying questions are surfaced mid-task: "Ask clarifying questions during a task. While waiting for your response, the agent continues reading files, making edits, or running commands." [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
- No "why did the agent do X" introspection panel documented.

## 23. Long Session Experience

- Forum users on big projects explicitly recommend: "1. Create a PRD Document; 2. Establish Cursor Rules; 3. Create a Features Document; 4. Generate RFCs for Individual Features; 5. Implementation." — implying long sessions degrade without external scaffolding. [Source: https://forum.cursor.com/t/guide-how-to-handle-big-projects-with-cursor/70997, accessed 2025-08-07]
- Plan Mode was created to enable "longer agents." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- Not directly observed.

## 24. Power User Features

- **Plan Mode:** Markdown plan files, editable inline. [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
- **Cloud Agents:** multi-repo, full VM, parallel runs. [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
- **Browser + Visual Editor:** drag-and-drop DOM, props panel, color pickers, point-and-prompt. [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
- **MCP servers:** "Both HTTP and stdio transports are supported. OAuth is supported for MCP servers that need it." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
- **Skills:** documented in cursor.com/docs metadata: "Covers Agent mode, Rules, Skills, MCP servers, CLI, models." [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
- **Team Rules** with enforcement + glob patterns. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
- **CLI:** Cursor ships a CLI (per docs metadata). Not directly inspected. [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
- **AGENTS.md support** for cross-tool compatibility. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]

## 25. Developer Experience

- **MCP support** with HTTP, stdio, and OAuth. [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
- **Cursor CLI** (per docs metadata). Not directly inspected. [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
- **Teams & Enterprise** tier documented. [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
- No public extension API documented beyond MCP. Cursor extensions are VS Code extensions (inherited). [Source: VS Code extension API baseline]
- **Cursor Browser** has its own docs (referenced in visual editor blog: "Read the Browser docs"). [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]

## 26. Biggest Strengths (with evidence)

1. **Editor-first integration.** Being a VS Code fork means the editor is the IDE — no context switching to a chat window. Cmd-K is inline. [Source: forum confirms VS Code fork, https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
2. **Plan Mode produces a Markdown artifact** the user can edit and review. "Most new features at Cursor now begin with Agent writing a plan." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
3. **Checkpoints as local snapshots**, separate from Git, restorable from chat timeline. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
4. **Cloud Agents run in real VMs** with full dev environment + browser control. "Cursor manages VM provisioning, isolation, snapshots, startup, artifacts, and capacity." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
5. **Visual editor** bridges design and code with point-and-prompt + parallel agents. [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
6. **Three-tier rules** (User/Project/Team) with enforced Team Rules for compliance. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Long-session degradation in big projects** is acknowledged by community workarounds (PRD + Rules + RFCs + Features docs). [Source: https://forum.cursor.com/t/guide-how-to-handle-big-projects-with-cursor/70997, accessed 2025-08-07]
2. **Feature churn:** @Docs feature was removed in v3.5.33 (May 2026 forum thread). User: "I updated Cursor and now @docs is completely gone. I also don't see the list of documentation I've indexed." [Source: https://forum.cursor.com/t/where-did-the-docs-go/161651, accessed 2025-08-07]
3. **No "auto memory"**: relies on user-authored Rules. Compared to Claude Code's auto memory that "Claude writes itself based on your corrections," Cursor's rules require manual maintenance. [Source: https://cursor.com/docs/rules (RSC payload) vs https://docs.anthropic.com/en/docs/claude-code/memory, accessed 2025-08-07]
4. **No documented per-file accept/reject flow** (vs Codex /approvals, vs Windsurf revert arrow). Trust is post-hoc via Checkpoints + Git. [Source: absence in https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
5. **Closed source, Electron-only.** Cursor IDE binary requires GUI install; no headless / CLI mode equivalent to Claude Code's `--print` for piping. (CLI exists but separate from agent loop.) [Source: https://cursor.com/docs meta description, accessed 2025-08-07]
6. **Cloud Agents require admin setup** ("Cursor account admin needs to connect source control for the account"). [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
7. **Visual editor is web-app-focused** ("Many modern apps are built in React, where components have properties"). Limited value for non-React projects. [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]

## 28. What should MiMo learn? (evidence-based)

1. **Checkpoints** as local, Git-independent snapshots restorable from the chat timeline — this is the strongest trust mechanism across all four products. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
2. **Plan Mode producing a Markdown artifact** the user can edit before execution — turns "what is the agent doing" into "what will the agent do, edit before it starts." [Source: https://cursor.com/blog/plan-mode, accessed 2025-08-07]
3. **Async clarifying questions** ("while waiting for your response, the agent continues reading files, making edits, or running commands") — non-blocking UX. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
4. **Queue follow-up messages** during work in progress. [Source: https://cursor.com/docs/agent (RSC payload), accessed 2025-08-07]
5. **Three-tier rules** (User / Project / Team) with enforced variants. Glob-pattern file scoping. [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
6. **AGENTS.md** as a cross-tool standard (Cursor, Codex, Claude Code all support it). [Source: https://cursor.com/docs/rules (RSC payload), accessed 2025-08-07]
7. **Visual editor + point-and-prompt** for UI work: "agents run in parallel, and within seconds your changes are live." [Source: https://cursor.com/blog/browser-visual-editor, accessed 2025-08-07]
8. **Cloud agents in real VMs** with full dev environment (not just container). "VMs in the cloud with full development environments." [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]
9. **MCP with HTTP + stdio + OAuth.** [Source: https://cursor.com/docs/background-agent (RSC payload), accessed 2025-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **Editor-first as the only mental model.** Cursor inherits VS Code's complexity; new users get lost. Forum threads about "what is Cursor" suggest onboarding is weak. [Source: https://forum.cursor.com/t/understanding-cursors-ai-feature/7204, accessed 2025-08-07]
2. **Removing major features silently.** @Docs disappeared in v3.5.33 with users confused. MiMo should preserve feature stability. [Source: https://forum.cursor.com/t/where-did-the-docs-go/161651, accessed 2025-08-07]
3. **Requiring external scaffolding** (PRD + RFCs + Features docs) to handle big projects — this is a workaround for missing context management, not a feature. [Source: https://forum.cursor.com/t/guide-how-to-handle-big-projects-with-cursor/70997, accessed 2025-08-07]
4. **Closed binary.** No headless mode, no `--print` pipe equivalent. Claude Code's CLI-first design is strictly more programmable. [Source: absence in cursor.com/docs, accessed 2025-08-07]
5. **Manual rule maintenance** with no auto-memory. Claude Code's auto memory removes this burden. [Source: cursor.com/docs/rules (RSC payload) vs docs.anthropic.com/en/docs/claude-code/memory, accessed 2025-08-07]

## 30. Confidence Score: 60/100

**Reasoning:**
- Strong direct evidence: cursor.com/blog/plan-mode, cursor.com/blog/browser-visual-editor (full blog text extracted, primary source).
- Strong RSC-extracted evidence: cursor.com/docs, /docs/agent, /docs/rules, /docs/background-agent (official docs, but extracted via RSC payload hack — content is verbatim but layout context lost).
- Weak evidence: direct UX observation (Cursor desktop binary not installable in sandbox). All keyboard shortcuts sourced from a 2024 forum post (https://forum.cursor.com/t/understanding-cursors-ai-feature/7204) — those shortcuts may have changed in v3.x.
- Weak evidence: a11y, performance, motion, animation — no public Cursor design blog found; relying on VS Code baseline.
- Forum threads cited (Where did the @docs go?; Big Projects guide) are community reports, not primary.
- Confidence raised from 50 → 60 because the RSC payload extraction yielded verbatim official-docs text for the most important claims (Checkpoints, Plan Mode, Rules, Cloud Agents, MCP).
- Confidence NOT raised higher because direct product use was impossible (no Electron GUI in sandbox).
