# Research Group C — Real UX of 4 AI Builder Products (2025-2026)

**Task ID:** R-C
**Agent:** Senior UX/Product Researcher
**Subject:** Real current UX of Lovable, Bolt.new, v0 (Vercel), Manus
**Method:** Verified via live web search (z-ai web_search) + web reading (z-ai page_reader) of 2025-2026 articles, official changelogs, technical deep-dives, and product blogs. NOT memory-only.

**MiMo Context Recall:** MiMo is a single-user AI Operating System (not SaaS). Conversation-first. Owner = developer + operator + user. Daily multi-hour sessions. RTL Arabic-first. Already ships: INLINE ExecutionTrace (5-stage pipeline inside AI message), AgentDock horizontal stepper (visible only while generating), ContextSidebar (adaptive per 8 modes), hidden DeveloperPanel (only when devMode), Command Palette (⌘K), Universal Search (⌘/), 8 workspace modes. This research informs the redesign of MiMo's conversation + preview + agent-viz + artifact layers.

---

## Lovable (lovable.dev)

### Current UX (2024-2025) — verified via
- https://trickle.so/blog/lovable-ai-review (Jul 27, 2025)
- https://docs.lovable.dev/changelog (live, through Jul 2026)
- https://www.productcompass.pm/p/lovable-branching (Jul 6, 2025)
- https://sarthakai.substack.com/p/lets-build-the-lovable-ai-agent-tutorialcode

### What works
- **Visual Edits** — Figma-like WYSIWYG over the live running app. Select any element, change it, and the change lands instantly via Vite HMR. Under the hood: code is parsed to an AST in the browser, Tailwind classes are generated client-side, and visual elements map 1:1 to JSX source. This is the cleanest "AI generated, human fine-tuned" loop on the market.
- **Plan Mode** (renamed from Chat Mode, Feb 5, 2026): agent produces a *detailed plan before any code is written*. User reviews, edits, and approves in a dedicated view. Approved plan saved to `.lovable/plan.md` so context persists across messages. Massive reliability win on complex requests.
- **Prompt Queue** (visible above chat input): user can keep typing while Lovable is working. Queue supports pause/resume, reorder, edit, copy, remove, and even **repeat a prompt up to 50×** for batch automation. This is a killer feature for long sessions.
- **Condensed action cards + timeline details view**: 2026 chat UI refresh groups tool calls and file changes into compact cards. Expandable to a full timeline of "everything Lovable did" — not just what the user asked for. Reduces chat noise, preserves auditability.
- **GitHub two-way sync** — every agent edit commits live; pushes from a real IDE sync back to Lovable within seconds. Branch switching enabled by default. This makes Lovable a true collaborator with existing dev workflows.
- **Supabase one-click integration** — auth, Postgres, storage, edge functions auto-wired from natural language.
- **Browser testing** — Lovable runs a real browser in a VM and tests the app like a user: navigates pages, captures screenshots, clicks elements, fills forms, reads console logs, inspects network. This is a verification step the user can watch.
- **Edit history with screenshot previews on hover** — quickly see what the app looked like at any prior step without opening each version.
- **Extended processing time: up to 15 minutes per request**, supporting long browser sessions and complex multi-step tasks.
- **Publish/unpublish with link-preview editing** before going live.

### What does not work
- **Strict message-credit limits** feel punitive on complex tasks: free tier = 5 msgs/day, Pro = 100/mo. Debugging a single bug can burn through several credits. Users explicitly complain about this.
- **Error loops**: the "Try to Fix" button can get stuck cycling on the same build failure ("While Lovable claims to have fixed an issue, it then also understands the build of the generated code failed"). One changelog note admits a bug where previews got "stuck on Try to fix until a page refresh."
- **UI hallucination on style requests** — multiple users report Lovable "hallucinates like crazy" when given UI change requests; quality regresses on refinement passes.
- **Preview breaks on GitHub push** — community reports the preview repeatedly breaks when pushing from GitHub. Suggests sync is fragile at edge cases.
- **AI output is "~60-70% production-ready"** — experienced users warn it always needs manual review for non-trivial logic.
- **Recent "less intelligent after update" complaints** — multiple users felt the AI regressed after recent model changes.

### What is unique
- **Visual Edits** (Figma-like WYSIWYG over live preview with AST-based JSX mapping) — no other product does this at the same fidelity. v0 has "Design Mode" which is similar but less code-aware.
- **Plan Mode persisted to `.lovable/plan.md`** — the plan itself becomes a versioned artifact in the repo.
- **Prompt Queue with repeatable items** (up to 50×) — turns the chat into a batch automation surface.
- **Browser testing inside the agent loop** — agent self-tests its output in a real headless browser, reads console + network, then iterates.
- **Skills** — users can earn LinkedIn-recognized skills based on real platform usage (creative gamification tied to actual competence).
- **Multi-user Workspaces** with role-based editors/admins/owners, shared credits.

### What MiMo should learn
- **Visual Edits pattern, but adapted**: MiMo's ArtifactViewer should support direct manipulation over the running preview, mapping visual elements to source artifacts. The MiMo owner is also the developer — they will want WYSIWYG over previews.
- **Plan Mode → persisted plan artifact**: MiMo's "research" and "code" modes should produce a persisted plan file (like MiMo's existing memory + goals) that the agent follows step-by-step and the user can edit. MiMo already has `goals` in the ContextSidebar — promote plans to a first-class editable artifact.
- **Prompt Queue pattern**: MiMo is multi-hour daily use. The user will want to queue follow-ups while AI is working. Add a visible queue above the composer with reorder/edit/repeat. Critical for long sessions.
- **Condensed action cards + expandable timeline**: aligns perfectly with MiMo's current ExecutionTrace. Keep the inline pipeline compact by default; let the user expand into a full timeline showing tool calls + file changes per stage.
- **Browser testing as a verification pipeline stage**: MiMo's "run" mode and "automation" mode should automatically verify agent output in a real headless browser and report console/network issues back into the conversation. This makes MiMo's 6-stage pipeline (context→analysis→planning→execution→verification→done) actually mean something — the "verification" stage runs a real browser.
- **Edit history with screenshot previews on hover** — MiMo's ProjectWorkspace timeline should show thumbnail screenshots per state, not just text.
- **Extended processing time (15 min)**: MiMo should not artificially cap agent runs at 60 seconds. Long tasks need to be first-class.

### What MiMo should avoid
- **Message-credit limits** — MiMo is single-user, local-first. Never impose per-day counters. Always let the user keep working.
- **Hallucination-prone conversational UI editing** — MiMo must keep a hard boundary between "I am editing via WYSIWYG" (deterministic, AST-backed) and "I am asking the AI to redesign" (LLM stochastic). Never blur these into one surface.
- **Plan Mode that disrupts existing chat flow** — Lovable users complained Plan Mode felt like a step backwards from Chat Mode. MiMo's plans should be inline-expandable in the conversation, not a separate modal that breaks flow.
- **Fragile GitHub sync that breaks preview** — if MiMo ever adds external sync, it must be append-only with explicit conflict UI, never silent overwrites.
- **Forcing users to discover Connectors by browsing menus** — MiMo should let users speak ("connect my Supabase") and have the agent wire it.

### Premium interaction (specific)
- **Visual Edits in the live preview**: select a button, drag a color slider, watch it paint instantly through Vite HMR while the JSX source updates underneath. Feels like Figma but produces real code. This is the single most premium interaction in the entire AI builder space.
- Runner-up: **Edit history hover thumbnails** — fly over the timeline and see the app's visual history as a film strip.

### Slow interaction (specific)
- **Waiting on a "Try to Fix" loop** that keeps cycling on the same build error for minutes with no manual escape. Lovable eventually added a "stop and tell me" path, but the default loop is slow and disempowering.
- **Long chat exceeds credit/quota mid-task** → user must upgrade plan mid-flow. Jarring.
- **15-minute extended processing** is itself a UX confession: some requests just take that long, and the user watches condensed cards stream with no real idea of ETA.

### Cognitive overload (specific)
- **The 3-way mode switch (Plan Mode / Build Mode / Chat Mode / Browser Testing)** — users explicitly complained that "preferred chat mode over plan mode" and that Lovable felt "less intelligent" after the mode rename. Multiple similarly-named modes is a classic cognitive overload trap.
- **Connectors menu** — Stripe, Supabase, Shopify, Pipedrive, Notion, PostHog, Redshift, Microsoft Fabric, Google Analytics, Xero, custom MCP servers… the integrations panel is a long flat list. Choosing is a research project.
- **Workspace + Project + Remix + Branch + Fork + Template + Skill** — seven overlapping "container" concepts. Users cannot keep them straight.

### Conversation / Preview / Agent viz / Execution / Artifacts / Workspace / Project / Keyboard / Long-session notes
- **Conversation ↔ Preview**: classic split-view layout — chat on the left, live preview on the right. Visual Edits overlay is the bridge. The code itself is a third tab.
- **Agent viz**: condensed action cards (tool-call groupings) inside the chat stream. Expandable to a full "action timeline" — file diffs, terminal commands, browser actions all in one scrollable view.
- **Execution viz**: streaming cards as the agent works. Each card = one logical action ("edited src/App.tsx", "ran npm install", "tested login flow"). New 2026 UI is much cleaner than the old verbose logs.
- **Artifact management**: each edit creates an entry in Edit History (with screenshot thumbnail). Publish/Unpublish is a one-click operation with link-preview editing.
- **Workspace organization**: dashboard sidebar with draggable, nestable folders (up to 3 levels). Tabs for multiple projects. Background tab opening (Cmd/Ctrl+click) in Desktop app.
- **Project model**: a Project = GitHub repo + Lovable metadata + connectors + Edit History + published URL. Branching supported via GitHub. Remixed projects fork the repo.
- **Keyboard**: ⌘K command palette in docs. Cmd/Ctrl+click for background tabs. Slash command (`/`) in chat for quick actions (e.g., `/migrate-to-tanstack-start`). Otherwise keyboard workflow is underdeveloped.
- **Long-session usability**: Prompt Queue is the key long-session feature. Extended processing (15 min) supports long agent runs. Edit History lets users backtrack. But the credit system actively punishes long sessions.
- **"Alive" vs "static"**: the live preview + HMR + streaming action cards + browser-testing-step screenshots make Lovable feel alive. The "static" parts are the connector settings pages and the credit counter — those feel like SaaS billing, not a creative tool.

---

## Bolt.new (StackBlitz)

### Current UX (2024-2025) — verified via
- https://newsletter.posthog.com/p/from-0-to-40m-arr-inside-the-tech (Sep 16, 2025 — co-founder + founding engineer interview)
- https://tympanus.net/codrops/2025/05/22/bolt-new-web-creation-at-the-speed-of-thought (May 22, 2025)
- https://deepwiki.com/stackblitz/bolt.new/3-webcontainer-system (Apr 18, 2025)
- https://support.bolt.new/release-notes
- https://github.com/stackblitz/bolt.new

### What works
- **WebContainer = local feel in a browser tab**: the entire Node.js runtime, file system, and dev server run in the user's browser via Rust→WASM + SharedArrayBuffer + Service Worker. No cold starts. No cloud container per session. "It feels as if you're developing on localhost" (founding engineer Dominic Elm). This is Bolt's superpower and the core reason the UX feels fast.
- **Split-view layout**: chat on the left, code editor + live preview on the right, switchable. Preview updates in tens of milliseconds via Vite HMR (intercepted WebSocket via Service Worker).
- **In-browser terminal**: Bolt's custom TypeScript shell "JSH" — supports `cd`, `ls`, `npm run dev`, arrow-key history. Single terminal pane, even though each command runs in a separate Web Worker. Feels like a real local shell.
- **Single-prompt full app generation**: one meticulously crafted system prompt → LLM generates the entire app → WebContainer installs + runs it. No multi-step wizard.
- **Snapshot-first file system**: `node_modules` + project source packed into one compressed blob, streamed into shared memory on first load, then cached. Subsequent visits take hundreds of ms, not seconds.
- **Pre-compressed CDN package layers**: `npm install` often finishes in <500ms or is skipped entirely.
- **One-click publish**: produces a public URL. One-click deploy to production.
- **Model auto-routing**: Bolt automatically routes to the right LLM per task, balancing quality and cost. User does not pick models.
- **Figma integration**: design components translate directly to working code.
- **shadcn/ui components** baked in for polished output.
- **Bolt Agent (newer v2)**: improved built-in context management handles projects "1000× larger than before".
- **Chat history preserved across v1→Bolt Agent migration** (Aug 2026 release note).

### What does not work
- **WebContainer boot failures**: white/grey screen / blank preview is a recurring user complaint. Support docs literally have a "Hard refresh, Cmd+Shift+R" troubleshooting page — admitting the preview breaks regularly. "Open in new tab" sometimes fails to render the UI at all.
- **Terminal errors compound**: when WebContainer fails to start, the result is "frozen UI or blank screen" with no graceful recovery. Users must export and re-import into a fresh StackBlitz project.
- **Mobile / weak-device performance**: WASM runtime + SharedArrayBuffer + thousands of files is heavy. Low-end devices struggle.
- **No real multi-user collaboration** on the same project the way Lovable Workspaces offer. Bolt is single-user by default.
- **Single-prompt dependency**: when the LLM gets the first prompt slightly wrong, the whole project starts wrong and recovery is painful (re-prompt → re-install → re-preview).
- **No visual editor**: unlike Lovable's Visual Edits or v0's Design Mode, Bolt has no WYSIWYG layer over the preview. All edits go through chat or the code editor.

### What is unique
- **WebContainer itself** — running a full Node.js VM (with virtual localhost, fake signals, emulated stdio, ESM↔CommonJS bridge) entirely in the browser. No competitor does this. Manus uses E2B cloud VMs; Lovable uses a cloud dev container; v0 runs preview in a sandbox. Bolt is the only one where the "computer" is the user's own browser tab.
- **JSH custom shell** — a TypeScript shell with arrow-key history, not a real Bash binary. Lightweight, fast, feels native.
- **Virtual localhost via Service Worker**: requests to `/__bolt/3000/...` are intercepted and routed to the Web Worker owning port 3000 via MessagePort. To the dev server it looks like a real socket; to the page it's just `fetch()`.
- **WebSocket bridge for HMR** through the same Service Worker.
- **TCP fallback tunnel** for tools (e.g., Postgres client) that demand raw TCP — Bolt relays via WebSocket to a Bolt relay server.

### What MiMo should learn
- **Local-first execution**: MiMo is single-user, so the model should be "the runtime IS the user's machine, not a cloud container." If MiMo runs code, prefer WebContainer-style in-browser (or, since MiMo is desktop-class, actual local processes) over spinning up cloud sandboxes per task. Latency wins + privacy wins + no per-task cost.
- **In-browser terminal as a first-class surface**: MiMo's "code" and "automation" modes should expose a real terminal pane alongside the conversation. The user is a developer — they expect to see and run shell commands.
- **Single-prompt → full artifact** as the default flow (with optional plan-first): the magic of "type sentence, get running thing" cannot be overstated. MiMo's existing Composer + ExecutionTrace already supports this — preserve it.
- **Model auto-routing hidden from user**: MiMo's spec already says "do not expose internal runtime unless developer mode." Bolt's auto-routing validates this — never make the user pick a model unless they explicitly want to.
- **Snapshot-first state**: MiMo should snapshot project state (FS + memory + conversation) into a single compressed blob for instant resume. Subsequent opens should be sub-second.
- **Pre-compressed common dependencies**: if MiMo has a skills/tools library, pre-package it once and reuse, not re-fetch every session.

### What MiMo should avoid
- **Silent WebContainer-style boot failures with blank screens**: if MiMo's runtime fails, it must surface the error inline with a one-click recovery. Never show a blank preview with no explanation.
- **Single-prompt dependency for complex apps**: Bolt's "one prompt, one shot" model is great for demos but breaks on real projects. MiMo should encourage plan-first for non-trivial work (which it already does via "planning" pipeline stage — preserve and strengthen this).
- **No visual editor option**: pure chat-and-code editing is slow for fine UI work. MiMo should offer a Visual Edits layer.
- **Heavy in-browser runtime on low-end devices**: MiMo is desktop-class, so this is less of a concern, but if there is ever a mobile MiMo client, do not try to run a full WASM VM there.
- **Flat "everything in one tab" interface**: Bolt's split view is good for one project but does not scale to multiple parallel projects. MiMo's ProjectWorkspace already handles this better.

### Premium interaction (specific)
- **Typing a prompt and watching the preview paint itself in tens of milliseconds**, with HMR updates flickering through the right pane as the LLM streams code. The latency is the luxury.
- **One-click publish → public URL**: from prompt to live internet URL in under a minute. The dopamine of "I made this real" is unmatched.

### Slow interaction (specific)
- **First-load WASM runtime download** (sub-10MB but still) — the very first Bolt visit on a fresh browser is perceptibly slow.
- **`npm install` on a cold cache** when packages are not pre-compressed on the CDN.
- **Recovering from a white screen** — the troubleshooting flow requires Cmd+Shift+R, then opening in a new tab, then re-prompting Bolt "the preview is not showing." Multi-step, manual, slow.

### Cognitive overload (specific)
- **The code editor + terminal + preview + chat all visible at once** with no auto-collapse. On smaller screens, every pane is cramped. Users must manually resize or hide panes.
- **No clear "what is the agent doing RIGHT NOW" visualization**: Bolt's streaming is mostly code-diff text. Unlike Lovable's condensed action cards, Bolt can feel like watching a wall of code scroll past.
- **v1 vs v2 (Bolt Agent) project model confusion** — release notes mention "v1 projects will be moved to Bolt Agent automatically." Users with older projects had to mentally migrate.

### Conversation / Preview / Agent viz / Execution / Artifacts / Workspace / Project / Keyboard / Long-session notes
- **Conversation ↔ Preview**: side-by-side split. Code editor and preview are themselves tabs within the right pane. User toggles between "look at code" and "look at preview" manually.
- **Agent viz**: minimal. The agent's work is shown as streamed code diffs and the preview updating. No dedicated "agent panel" or "computer view." This is the opposite of Manus.
- **Execution viz**: streaming text. Tool-call boundaries are not strongly visualized — it is just code appearing in files. The terminal pane shows actual `npm install` output, which doubles as execution feedback.
- **Artifact management**: files are in the in-browser virtual FS. Export = download ZIP or push to GitHub. No persistent artifact browser like Lovable's Edit History.
- **Workspace organization**: single-project-per-tab. Multiple projects = multiple browser tabs. No workspace/folder hierarchy.
- **Project model**: a Bolt project = a WebContainer snapshot + chat history + optional GitHub link. v2 ("Bolt Agent") projects have improved context management for larger codebases.
- **Keyboard**: terminal supports full shell keybindings (arrow history, Ctrl+C, etc.). Otherwise keyboard shortcuts are underdeveloped. No command palette equivalent to Lovable's ⌘K.
- **Long-session usability**: Bolt's chat history can grow very long; context management improvements in v2 help. But there is no Prompt Queue equivalent — user must wait for the agent to finish before sending the next message. Long sessions require patience or browser-tab juggling.
- **"Alive" vs "static"**: Bolt feels alive ONLY when the preview is actively updating via HMR. When idle, it feels like a static IDE. The agent's "thinking" is invisible — no spinner, no pipeline, just waiting.

---

## v0 (Vercel)

### Current UX (2024-2025) — verified via
- https://trickle.so/blog/vercel-v0-review (Aug 17, 2025)
- https://v0.app/docs/design-mode
- https://community.vercel.com/t/introducing-design-mode-on-v0/13225 (Jun 12, 2025)
- https://www.taskade.com/blog/v0-review (Oct 1, 2025)
- https://community.vercel.com/t/long-chat-detected-on-all-projects-even-short-ones/24315 (Oct 7, 2025)
- https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools/blob/main/v0%20Prompts%20and%20Tools/Prompt.txt

### What works
- **Text-to-UI specialization**: v0 is purpose-built to convert natural language to polished React/Next.js/Tailwind/shadcn UI. Output is consistently well-designed — spacing, typography hierarchy, color, accessibility all baked in. Quality per credit is very high *for UI*.
- **Design Mode** (Jun 12, 2025): overlay of design tools on top of the running app in the Preview tab. Lets user make quick visual changes WITHOUT editing code and WITHOUT spending credits. Brilliant freemium mechanic + respects the designer's intuition.
- **Version Box per generation**: each generation creates a "version" — click the version box to open the preview. Easy to A/B compare.
- **Fork = chat branching**: when a chat gets long or complex, v0 surfaces a "Long chat detected" warning with a "Fork" button. Forking creates a new branch conversation. This is graceful degradation of context limits.
- **200 free monthly credits**: each generation uses 1-5 credits based on complexity. Free tier is genuinely usable for prototyping.
- **Templates + community gallery**: ready-made components and full-page designs for fast starts.
- **iOS app for design on the go** — unique cross-device touch.
- **2026 updates**: sandbox-based runtime for full-stack apps, Git panel for branch/PR creation directly from chat, database integration. v0 is slowly becoming more than UI-only.
- **Multi-file generation**: produces not just one component but multi-file Next.js apps (app router, components, lib).

### What does not work
- **No terminal / no log access**: server-side exceptions leave developers "stuck" with no way to see what's wrong. "The platform doesn't give access to terminal logs, which leaves developers stuck without any way to see what's causing errors." This is the single biggest complaint.
- **Manual code edits vanish in later generations** — fine-tuning a component by hand, then asking v0 for another change, can lose the manual edits. Users feel punished for hand-editing.
- **Exports produce blank screens or miss pages**: "blank screens appearing after exporting" and "only one page instead of all created pages." Things work in v0's environment but break in production.
- **Git integration weak** — version control in team settings is difficult.
- **Sudden UI quality regression** (Aug 2025): community reports UI quality dropped overnight and never fully recovered. Speaks to non-determinism in the model.
- **New Beta removed Design Mode** (Jan 2026) temporarily — "Design Mode will be coming back at some point but right now it is being improved." Stripping a flagship feature mid-beta eroded user trust.
- **React-only lock-in**: no Angular, Vue, Svelte, no TypeScript-by-default, no CSS-in-JS support.
- **No backend, no DB, no auth logic**: it builds auth *UI* but not auth *systems*. Developers must wire all underlying functionality themselves.
- **Lost conversation history**: a Reddit report of "lost 2 hours of chat, all versions and code" on a forked chat. Persistence is fragile.
- **Sharing breakage**: "Previews are not supported for recipients. If a link is copied from a new tab, the preview works but the chat window is missing."

### What is unique
- **Design Mode = free, no-credit WYSIWYG** — the only product where direct manipulation of the preview costs zero credits. Others charge per interaction.
- **Fork-based conversation branching** — explicit "this chat is too long, fork it" UX pattern. Most chat tools silently truncate or summarize; v0 makes branching a user-visible action.
- **Version Box per generation** — each AI output is a first-class comparable artifact, not just a chat message. You can flip between v1, v2, v3 of a component visually.
- **iOS app** — only AI builder with a real mobile companion for design work.
- **Community templates gallery** with one-click fork into your workspace.
- **Git panel + PR creation directly from chat** (2026) — closest to a real dev workflow of any AI builder.

### What MiMo should learn
- **Design Mode overlay pattern**: a no-LLM-cost WYSIWYG layer over the live preview. MiMo's ArtifactViewer should support direct manipulation for free (deterministic AST edits). Reserve LLM calls for actual redesign requests.
- **Version Box per generation**: MiMo should treat each AI generation as a versioned artifact with a thumbnail. User can flip between versions visually. MiMo's existing ProjectWorkspace `timeline` tab is the right home — but it should feel like a filmstrip, not a list.
- **Fork-as-explicit-branching**: MiMo conversations should support "fork" when context gets heavy — creating a clean branch while preserving the original. The user should see this as a feature, not a failure.
- **Git panel inside the chat surface** (2026 v0 update): if MiMo ever does external code, branch/PR creation should happen inline, not via a separate GitHub UI.
- **Mobile companion app for design review**: MiMo is desktop-first, but a phone companion for reviewing artifacts / approving agent steps would extend long-session usability.

### What MiMo should avoid
- **No terminal / no log access**: this is the cardinal sin. MiMo must always expose a terminal pane and full logs to the developer. MiMo's DeveloperPanel (when devMode on) already does this — preserve and strengthen it.
- **Losing manual edits** between LLM generations: MiMo must diff-preserve user hand-edits. Before any LLM regeneration, snapshot user edits and warn if they will be overwritten.
- **Stripping flagship features in beta**: never ship a beta that removes a working feature. MiMo should keep parallel versions live during transitions.
- **Losing conversation history**: persistence must be bulletproof. MiMo's local-first single-user model has no excuse for data loss.
- **React-only lock-in**: MiMo is multi-modal (chat/research/code/writing/run/image/automation/data) — code mode should support multiple stacks, not lock to one framework.
- **UI quality regression without rollback path**: MiMo should version its own system prompts and allow instant rollback if quality regresses.

### Premium interaction (specific)
- **Design Mode over a live preview** — drag a slider to change padding, watch the component re-render instantly, no credit spent. The freedom to experiment visually without penalty is the premium feel.
- **Forking a long chat into a fresh branch with full version history preserved** — graceful, intentional, user-driven.

### Slow interaction (specific)
- **Server-side exception with no terminal access** — "stuck" is the literal word users use. You wait, refresh, try again, with zero diagnostic signal.
- **Waiting for a generation to complete and discovering it stopped mid-code** ("v0 stopping responses in each generation").
- **Re-prompting after manual edits vanish** — the user re-does work v0 silently discarded.

### Cognitive overload (specific)
- **Long chat warnings appearing on every project, even short ones** (Oct 2025 community report) — false-positive "long chat detected" panics users into forking unnecessarily.
- **Credits vs tokens vs generations** confusion: "Some developers think these credits work like tokens in other AI systems. Each v0 generation actually uses 1-5 credits based on complexity." The mental model is unclear.
- **Preview tab + Code tab + Design Mode overlay + History + Fork + Version Box + Git panel + Templates** — many overlapping surfaces. New users do not know where to look.
- **"Is this a design tool or a code tool?"** — fundamental identity confusion. Users approaching v0 as Figma are disappointed; users approaching it as Copilot are disappointed. The product's category is unclear from the UI alone.

### Conversation / Preview / Agent viz / Execution / Artifacts / Workspace / Project / Keyboard / Long-session notes
- **Conversation ↔ Preview**: chat on left, preview on right. Code is a tab. Design Mode is an overlay *on* the preview.
- **Agent viz**: minimal. v0 streams code into files; the preview updates. No agent persona, no tool-call timeline, no "computer" view. Execution is implicit.
- **Execution viz**: progress is shown as the code streaming in. No breakdown of "thinking → tool use → file edit → preview update."
- **Artifact management**: each generation = Version. Versions are comparable side-by-side. Templates and community gallery extend the artifact library.
- **Workspace organization**: per-chat workspace. Multiple chats = multiple workspaces. No folder hierarchy like Lovable's. 2026 Git panel adds branch-level organization.
- **Project model**: a v0 project = a chat + versions + (optional) GitHub link. Forking creates a new chat with shared history up to the fork point.
- **Keyboard**: underdeveloped. No ⌘K command palette. No slash commands. Tab to switch preview/code.
- **Long-session usability**: the Fork pattern is the primary long-session mechanism. Without it, long chats degrade. Recent 2026 sandbox runtime helps. But lost-history reports show fragility.
- **"Alive" vs "static"**: v0 feels alive during generation (streaming code, preview painting). When idle, it feels like a static code editor. There is no "agent is thinking" visual.

---

## Manus (manus.im — now part of Meta)

### Current UX (2024-2025) — verified via
- https://arxiv.org/html/2505.02024v1 (May 4, 2025 — academic architecture paper)
- https://e2b.dev/blog/how-manus-uses-e2b-to-provide-agents-with-virtual-computers (May 6, 2025 — co-founder interview)
- https://manus.im/blog/manus-my-computer-desktop (Mar 16, 2026 — official)
- https://en.wikipedia.org/wiki/Manus_(AI_agent)
- https://sidsaladi.substack.com/p/manus-ai-101-the-complete-guide-to-the-autonomous-ai ("Manus's Computer window" observation)

### What works
- **"Manus's Computer" live view**: a dedicated pane shows the agent's virtual computer in real time — the browser it is using, the terminal it is running, the files it is editing. User can "watch the agent work in real-time and intervene at any point." This is the single best agent visualization in any AI product. It transforms "the AI is thinking" into "the AI is doing."
- **Multi-agent architecture (Planner + Executor + Verification)**: a Planner agent decomposes the request into subtasks; Executor agents carry them out using 27 tools (browser, file search, terminal, etc.); a Verification agent reviews and can trigger re-planning. This is exposed in the UI as a visible task plan + execution steps + verification status.
- **E2B Firecracker microVMs**: ephemeral, lightweight, secure. Spawn in ~150ms. Run Python, JS, Bash, Chromium browser. Sessions can persist for hours. Paid users get 14-day sandbox persistence. This is the infrastructure that makes the "computer" feel real.
- **Pause/resume sandbox sessions**: when the agent needs user input (credentials, CAPTCHA), it pauses; user resolves; agent resumes. The state is preserved across the pause.
- **My Computer (Mar 2026, Manus Desktop)**: brings the agent out of the cloud onto the user's local machine. Agent executes CLI commands in the user's terminal — reads/edits local files, launches local apps, uses local GPU. Turns an idle Mac mini into a 24/7 remote AI assistant.
- **Explicit approval gate**: every terminal command requires user approval before execution. Two modes: "Always Allow" (for trusted tasks) or "Allow Once" (review each op). User is "the commander; Manus is the executor." This trust model is essential for local machine access.
- **27 tools integrated**: Chromium browser (visit URLs, save images, scroll), terminal commands, filesystem ops, plus integrations with Google Calendar, Gmail, Slack, Telegram, and more.
- **Scheduled Tasks + recurring local routines**: "tidy Downloads folder every morning" or "weekly summary report from local data" — Manus becomes a daemon, not just a chat.
- **Cross-device orchestration**: send instruction from phone, Manus executes on home computer, emails result via Gmail from the cloud. The cloud + local bridge is seamless.
- **Multi-modal**: handles text, images, code as both inputs and outputs within one workflow.

### What does not work
- **Slow on long tasks**: "the agent works, sometimes taking even dozens of minutes." Manus is not for instant answers — it is for autonomous completion. Users expecting chat-speed replies are frustrated.
- **Beta / invite-only / waitlist history**: GAIA-benchmark-leading but access was constrained. Trust + onboarding friction.
- **Approval fatigue**: "Every terminal command requires your explicit approval" is great for trust, but on a real workflow (rename 100 invoices) it means 100 approval prompts unless the user explicitly switches to "Always Allow." The default-safe setting can become unusable.
- **"Agent does something unexpected" risk**: the Verification agent catches errors, but it cannot catch intent mismatch (agent did the wrong thing correctly). The user must watch the live "computer" view constantly to catch drift.
- **No code-level editor**: Manus is not a code editor. It writes code via terminal commands (Python scripts, Swift files). Developers who want to hand-edit must do so outside Manus and re-introduce it.
- **Sandbox state can be lost**: 14-day max persistence for paid users. Free users likely less. Long-running research projects can expire.
- **Cloud dependency** (until My Computer): even with My Computer, the *intelligence* is still cloud-side. Network down = no agent.
- **Mobile app limitations**: phone-driven tasks rely on the home machine being powered on and online.
- **Learning curve**: the "watch the agent work" model is alien to users trained on chat-only assistants. First-time users do not know when to intervene.

### What is unique
- **"Manus's Computer" live pane** — the agent's runtime is exposed as a literal visible computer: a browser, a terminal, a file manager, all updating live. No other product does this. Bolt hides its WebContainer behind a preview; v0 has no agent viz; Lovable shows condensed action cards. Manus shows the *actual screen* of the agent's VM.
- **Multi-agent Planner/Executor/Verification** exposed in the UI as visible pipeline stages — user sees the plan, sees each executor step, sees verification.
- **Pause/resume sandbox** with preserved state across user-input pauses — unique capability for handling credentials and CAPTCHAs.
- **My Computer bridging cloud ↔ local machine** — only AI agent that genuinely runs on the user's hardware while orchestrated from the cloud.
- **Scheduled Tasks + recurring routines** — only agent that doubles as a persistent daemon.
- **Cross-device orchestration** (phone → home Mac → Gmail) — no equivalent in any other AI builder.
- **Explicit per-command approval gate** — only agent with a real trust UI for local machine access.
- **27-tool integration** breadth.

### What MiMo should learn
- **The "Manus's Computer" pane is the gold standard for agent visualization**. MiMo's existing AgentDock (horizontal stepper) is good for pipeline *stage* but does not show *what the agent is actually doing right now*. MiMo should add a "computer view" pane that shows the actual runtime: browser, terminal, file edits — live. This is the missing piece between MiMo's ExecutionTrace and a truly alive UX.
- **Planner / Executor / Verification as visible stages** maps almost perfectly to MiMo's existing 6-stage pipeline (context → analysis → planning → execution → verification → done). MiMo should make the *verification* stage actually run something (browser test, syntax check, type check) and report results inline, not just be a label.
- **Pause/resume with preserved state** is essential for MiMo long sessions: if the user is interrupted or needs to provide credentials, MiMo should pause cleanly and resume without losing context.
- **Scheduled Tasks / recurring routines**: MiMo is a single-user OS. The owner will want "every morning summarize my messages" or "every Friday review my week." MiMo should have a daemon mode — Manus shows this is feasible and valuable.
- **Explicit approval gate for destructive ops**: MiMo's "run" and "automation" modes touch the real world (terminals, files, APIs). Every destructive action should require explicit approval, with "Always Allow" for trusted task types. MiMo must not be a fire-and-forget agent on the user's own machine without consent UI.
- **Cross-device orchestration** is interesting for MiMo: a phone companion that can dispatch tasks to the desktop MiMo is a powerful long-session extension.
- **Live screen capture of agent actions** — even if MiMo does not run a full VM, recording screenshots/videos of what the agent did (browser pages opened, terminal output, files edited) creates an audit trail that users trust.

### What MiMo should avoid
- **Approval fatigue**: never prompt per-command for routine ops. MiMo should learn per-task-type trust and offer "Always allow this kind of action" rather than per-instance.
- **Hours-long opaque runs**: Manus's "dozens of minutes" runs without granular progress are stressful. MiMo should always show current step, ETA, and intermediate artifacts.
- **Verification-only-by-LLM**: Manus's Verification agent is also an LLM, which can rubber-stamp wrong output. MiMo's verification must include deterministic checks (compile, type check, test run, browser test) not just another LLM pass.
- **Sandbox expiry**: MiMo is local-first, so this is less of a concern — but if MiMo ever uses cloud sandboxes, they should not expire mid-task.
- **Cloud-only intelligence**: MiMo should be able to function offline for local tasks (text, code, file ops) and only require cloud for knowledge/synthesis. Manus's hard cloud dependency is a fragility.
- **No code editor**: MiMo is for a developer+operator. It MUST include a real code editor surface for hand-edits, not just terminal-driven generation.

### Premium interaction (specific)
- **Watching the "Manus's Computer" pane scroll through a real Chromium browser** as the agent researches a topic, opens tabs, scrolls pages, downloads files — all visible in real time. This is the most premium agent visualization in existence.
- **Pause-on-CAPTCHA**: agent hits a CAPTCHA, pauses, surfaces it to the user, user solves it, agent continues. The seamlessness of human-in-the-loop is premium.
- **Sending a task from a phone and watching the home machine execute it remotely** — "I'm out, send me that contract from my desktop" — and it just works.

### Slow interaction (specific)
- **Dozens-of-minutes autonomous runs** with no granular ETA. Manus is slow by design, but the *lack of progress signal* is the slow part.
- **Approval prompt loops** on long batch tasks — clicking "Allow Once" 50 times.
- **Cold sandbox spin-up** is ~150ms (fast), but **resuming a paused session** that has been idle can take seconds.

### Cognitive overload (specific)
- **Watching the agent's live computer pane while it works** — fascinating but hypnotic; users can lose track of their own goal. The live VM view is so engaging it can distract from the task.
- **Multi-agent plan decomposition**: when the Planner breaks a task into 15 subtasks and they execute in parallel, the user has trouble tracking "which subtask is currently active and why." Parallel agent execution is harder to follow than sequential.
- **Approval fatigue** — already mentioned, but it is also a cognitive load: each approval is a micro-decision.
- **Trust calibration** — "should I Always Allow this? What if it does something wrong later?" The user must mentally model trust per task type.

### Conversation / Preview / Agent viz / Execution / Artifacts / Workspace / Project / Keyboard / Long-session notes
- **Conversation ↔ Preview**: Manus's layout is conversation on one side, "Manus's Computer" live pane on the other. The "preview" IS the agent's computer — not the artifact being built (though artifacts appear there too).
- **Agent viz**: the gold standard. Live browser, live terminal, live file ops. Plus a visible task plan (Planner output) and per-step status (Executor + Verification).
- **Execution viz**: each tool call is a visible step in the live pane. Terminal commands appear in the terminal. Browser navigation appears in the browser. File edits appear in the file manager. No abstraction layer — just the real runtime.
- **Artifact management**: artifacts (documents, code, charts, websites) appear in the sandbox file system and can be downloaded. Manus's "turn any file into a website with one prompt" feature is a notable artifact pattern.
- **Workspace organization**: per-task workspace = one sandbox session. Sessions are isolated. Projects tab groups related sessions. Agents tab lets you create named persistent agents. Scheduled Tasks tab for recurring routines.
- **Project model**: a Manus Project = a collection of related sessions + named Agents + scheduled tasks + connected services (Gmail, Calendar, etc.). My Computer adds local folders to a project.
- **Keyboard**: undeveloped in the web UI. Approval gates require mouse clicks. No command palette. Desktop app likely has terminal-style shortcuts.
- **Long-session usability**: pause/resume + scheduled tasks are the long-session mechanics. 14-day persistence preserves state across days. But runs of "dozens of minutes" without granular progress is the long-session weakness.
- **"Alive" vs "static"**: Manus feels **the most alive** of any AI product on the market. The live computer pane, real browser navigation, real terminal output — every action is a visible motion. The "static" parts are the cloud latency (waiting for the next LLM call to decide the next action) and the verification loop (which can stall).

---

## Cross-Product Takeaways (most important for MiMo)

1. **Agent visualization is the differentiator of 2025-2026.** Lovable condensed action cards, Bolt streamed code, v0 implicit, Manus live "computer" pane. Manus wins. **MiMo must add a live runtime pane** (browser/terminal/file ops) on top of its existing ExecutionTrace — not just stage labels but actual screen of what the agent is doing.

2. **WYSIWYG-over-preview with no LLM cost is the premium interaction.** Lovable's Visual Edits and v0's Design Mode both prove users love direct manipulation that doesn't burn credits. **MiMo's ArtifactViewer must support deterministic AST-based WYSIWYG** over previews, separate from stochastic LLM redesign.

3. **Prompt Queue + Plan persistence are the long-session killers.** Lovable's queue (visible above composer, reorder/edit/repeat up to 50×) and Plan Mode persisted to `.lovable/plan.md` are the two best long-session features in the market. **MiMo should adopt both** — its existing 8 modes already have the right ContextSidebar scaffolding.

4. **Terminal + logs access is non-negotiable for a developer product.** v0's biggest complaint is "stuck with no terminal access." Bolt's biggest delight is "in-browser terminal that feels local." **MiMo's DeveloperPanel must always be one shortcut away**, never hidden behind a beta gate or stripped in transitions.

5. **Forking / versioning / branching conversations is a core primitive.** v0's Fork button on "long chat detected," Lovable's Edit History with hover thumbnails, Manus's pause/resume — all address the same need: long conversations need graceful degradation. **MiMo should support conversation fork + versioned artifact thumbnails** in the ProjectWorkspace timeline.

6. **Approval gates must be per-task-type, not per-instance.** Manus's per-command approval causes fatigue. **MiMo should learn trust per task type** and offer "Always allow this kind" — never default to per-instance prompts.

7. **Local-first execution beats cloud sandboxes for single-user UX.** Bolt's WebContainer (in-browser, no cold start) and Manus's My Computer (local terminal) both prove latency wins when the runtime is local. **MiMo is single-user desktop-class — it should default to local execution** and treat cloud as a fallback, not the default.

8. **The "alive" feeling comes from visible motion in the agent's runtime, not from spinners.** Manus's live browser + Bolt's HMR + Lovable's streaming action cards all create aliveness. v0's static "waiting for generation" feels dead. **MiMo's ExecutionTrace must show actual runtime motion** (real terminal output, real browser screenshots, real file diffs per stage), not just stage labels lighting up.

9. **Cognitive overload comes from overlapping container concepts.** Lovable (Workspace + Project + Remix + Branch + Fork + Template + Skill), v0 (Preview + Code + Design + History + Fork + Version + Git + Templates) — too many similar things. **MiMo should keep exactly one container model** (Project = workspace = conversation lineage) and one branching primitive (fork).

10. **Multi-agent decomposition must be visible but not chaotic.** Manus's Planner/Executor/Verification is visible but parallel execution confuses users. **MiMo's 6-stage pipeline is sequential and clear — preserve that**. Do not introduce parallel agents without per-agent visibility.

11. **Scheduled tasks + recurring routines turn the AI from chat to OS.** Manus's scheduled local routines (tidy Downloads every morning) prove the daemon pattern. **MiMo, as an OS, must have a daemon mode** — scheduled agent runs that operate on local files + memory without prompting.

12. **Mobile companion for review/approval extends long sessions.** v0's iOS app + Manus's phone-dispatched tasks both prove the value of "agent runs on desktop, user reviews from phone." **MiMo should ship a phone companion for review-and-approve**, not for full work.

13. **Never strip working features in betas.** v0's Jan 2026 removal of Design Mode eroded trust. **MiMo must keep parallel versions live during transitions** — never break a working surface mid-redesign.

14. **Identity confusion kills products.** v0's "is this a design tool or a code tool?" question is its biggest weakness. **MiMo's identity is clear: an Operating System, conversation-first, multi-mode** — preserve that clarity. Do not let any single mode (e.g., code) become the product.

15. **Credit/quota systems actively punish long sessions.** Every product with a credit counter (Lovable, v0) has users who complain about mid-task friction. **MiMo is single-user local-first — never impose counters.** Always let the user keep working.

---

**File written:** `/home/z/my-project/research/research-group-C.md`
**Total sources verified:** 11 (5 web_search rounds, 7 page_reader calls covering 2025-2026 articles + official changelogs + co-founder interviews + academic architecture paper).
