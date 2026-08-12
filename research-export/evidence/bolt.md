# Bolt.new (StackBlitz) — Evidence File (Task W3a, Phase R2)

**Product:** Bolt.new — AI-powered website/web-app/mobile-app builder, developed by StackBlitz
**Vendor:** StackBlitz, Inc. (creators of WebContainers — Node.js in the browser). Bolt.new runs on WebContainers, so the dev environment is local-first in-browser, not cloud-side VM.
**Evidence agent:** general-purpose sub-agent, sandboxed
**Method:** `z-ai function web_search` returned 429 even after 30s retry; fell back to curl with browser UA per task instructions. Sources fetched: `bolt.new` (main page, statically extractable), `bolt.new/pricing` (statically extractable), `support.bolt.new` (Mintlify help center, `.md` URLs work), `blog.stackblitz.com`, `webcontainer.io`, `docs.stackblitz.com`. Cached under `research/evidence/raw-bolt/`. The `support.bolt.new/llms.txt` index (14KB) was used to enumerate all ~80 docs pages, and ~30 highest-priority `.md` files were fetched (Plan Mode, agents, code-view, rollback-backup, projects-files, version-history-github, collaborate, sharing, tokens, billing, intro-bolt, quickstart, project-lifecycle, etc.). **Product NOT directly used in a browser** — interactive editor (signed-in SPA) was not inspected in this sandbox.
**Access date:** 2026-08-07 (all `[Source: <URL>, accessed 2026-08-07]` citations below).

---

## 1. Product Overview

Bolt is "an AI-powered builder for websites, web apps, and mobile apps" developed by StackBlitz [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. The marketing copy on bolt.new reads: "Create stunning apps & websites by chatting with AI. Let's build a prototype... Plan / Build now / Website / Slides / App / Prototype / or import from Figma / GitHub" [Source: https://bolt.new, accessed 2026-08-07]. Trust signals on homepage: "Trusted by Google, Microsoft, Salesforce, AWS, Meta, HubSpot, Accenture, TikTok, Shopify, Chegg, Cloudflare, Netlify, FactSet, ByteDance, PwC, Mozilla, Intel, Xano, Stripe" [Source: https://bolt.new, accessed 2026-08-07]. Bolt ships with **Bolt Cloud** — "enterprise-grade backend infrastructure including hosting, databases, integrations and more. Unlimited databases, Enterprise-grade User Management & Authentication, SEO optimization, Hosting with analytics & custom domains" [Source: https://bolt.new, accessed 2026-08-07]. Claims: "98% less errors" via automatic testing/refactoring/iterating; "projects 1,000 times larger than before" with improved built-in context management; "build with design system"; "the best model, every time" (auto-routes to right model) [Source: https://bolt.new, accessed 2026-08-07]. Built on WebContainers — "Bolt runs on WebContainers, so you don't have to install anything or set up a local environment before you start building" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. Bolt is SOC 2 Type II compliant [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. **Observed:** homepage static text extractable; signed-in editor not inspected.

## 2. Product Philosophy

Bolt's philosophy is **in-browser full-stack execution** — running the user's project locally inside WebContainers in their browser rather than cloud-side. WebContainers marketing: "Dev environments. In your web app. From interactive tutorials to full-blown IDEs, build instant, interactive coding experiences backed by WebContainers" [Source: https://webcontainer.io, accessed 2026-08-07]. Bolt inherits this — the StackBlitz team built WebContainers "to first make it possible to run Node.js directly in your browser" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. Philosophy expressed in product: "Bolt does the heavy lifting for you, so you can focus on your vision instead of fighting errors" and "Stop stitching together platforms. Bolt Cloud gives you enterprise-grade backend infrastructure" [Source: https://bolt.new, accessed 2026-08-07]. For non-technical users: "Describe what you want, and Bolt creates it for you. Then, make changes by chatting with Bolt. No coding knowledge required" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. For developers: "Bolt gives you speed, flexibility, and full control. Choose your languages and frameworks, connect to source control, and edit your code directly in code view. Or don't" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. **You own your code** — "The code you create is yours to use for any legal purpose, including commercial projects" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. "Bolt 100K Open Source Fund" (Feb 13, 2025) signals investment back into the open-source WebContainer dependencies [Source: https://blog.stackblitz.com, accessed 2026-08-07].

## 3. Core Mental Model

Bolt's mental model is also **chat + preview split** with a Plan/Build mode toggle, but the execution layer is **local-first** via WebContainer rather than cloud VM [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07; Source: https://webcontainer.io, accessed 2026-08-07]. The user picks an **agent** (Standard or Max — see §8) before/while building [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07]. Workspace is a single shared chat thread per project, with tabs: **Code** view and **Preview** view (toggleable in top center) [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07]. Bolt has **no equivalent of `.lovable/plan.md`** — no persisted agent memory file; "managing project context" is left to the user (clear context, reduce project size, target files) [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07]. Bolt's "Build mode" is the default; Plan mode is a separate toggle that highlights blue when active [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07]. Multiplayer mode: "Every project has a single shared chat thread" — multiple users prompt the same thread, Bolt processes one prompt at a time [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].

## 4. User Journey

From `https://bolt.new` homepage, the user sees a chatbox with prompt input + a "Build now" / "Plan" toggle + project-type pills (Website / Slides / App / Prototype) + import sources (Figma, GitHub) [Source: https://bolt.new, accessed 2026-08-07]. User submits first prompt → "Sign in or sign up (Google, GitHub, or email: no credit card required). Complete the survey. Wait approximately five minutes while Bolt creates your app. Because your prompt includes features such as sign-up, login, and favorites, Bolt needs to set up databases, which takes a bit more time" [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07]. QuickStart guide notes "Following this walkthrough will use just under 300K tokens, which is the daily limit of Bolt's free plan" — substantial free-tier consumption for one example app [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07]. Lifecycle described as mermaid flowchart: "Design and plan → Start building (first prompt) → Iterate (more prompting) → Deploy → Iterate" [Source: https://support.bolt.new/get-started/project-lifecycle.md, accessed 2026-08-07]. Step 1 explicitly asks the user to answer "What / Who / Features / Look-and-feel / How-will-users-access-it" before prompting [Source: https://support.bolt.new/get-started/project-lifecycle.md, accessed 2026-08-07]. Bolt offers an **Enhance prompt** feature — `+` icon → Enhance prompt → answer guided questions → Bolt generates a recommended prompt the user can edit [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07]. **Observed:** Not directly observed — interactive editor not used in sandbox.

## 5. Navigation

Top-bar layout (from quickstart + projects-files docs):
- **Top-left**: project title menu — opens "Open recent project", "Rename", "Transfer to", "Duplicate", "Export > Download" / "Open in StackBlitz", "Version history" [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07; Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Top-center**: Code/Preview toggle (with code icon), database icon, gear icon ("All project settings") [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07; Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Top-right**: Share and Publish buttons [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **Bottom-left of chatbox**: `+` icon → Settings, Search Help Center, Enhance prompt, Attach file [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Bottom-right of chatbox**: **Plan** toggle (highlights blue when active) [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Bottom-left of chatbox**: **current agent name** (e.g., "Standard") — click to switch agents [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07].
- **In chatbox**: **Select** button (UI element selector) with small arrow for "Pick from layers" [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Help Center**: ⌘K (search) + ⌘I (Ask Assistant) shortcuts mentioned in support page header [Source: https://support.bolt.new, accessed 2026-08-07].

## 6. Workspace (chat + preview split)

Chat panel left + Preview right; toggle to Code view via "Code Preview icon" in top center [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07]. Code view has a **Files** list (left), editor (center), Save button (top-right); right-click in Files list reveals "New file…" / "Delete" / "Target file" / "Lock file" / "Lock all" [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07]. In Safari, Code view is read-only (must use Chrome/Chromium/Opera/Brave/Edge/Vivaldi to edit code) [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07]. Preview shows live app; "the user accesses this in their browser. It's mostly content and information" (for websites) or interactive (for web apps) [Source: https://support.bolt.new/get-started/project-lifecycle.md, accessed 2026-08-07]. Multiplayer collaborators see real-time typing and same chat thread [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].

## 7. Conversation (streaming action cards)

Bolt's docs do not document an explicit "activity card" UI like Lovable's. Instead:
- Each prompt produces a version snapshot visible in chat history — "Scroll through the chat history and click the version you want to restore" via the **eye icon** (preview) and **return arrow icon** (restore) [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- The Bolt homepage states "Bolt automatically tests, refactors, and iterates reducing errors" and "handles projects 1,000 times larger than before" — implies internal iteration loop, but the docs do not describe a user-facing streaming activity-card UI [Source: https://bolt.new, accessed 2026-08-07].
- Plan mode produces "quick action buttons" at the end of a response: "Implement this plan" (auto-switches to Build Mode), "Show an example", "Refine this idea" — contextual, varying by prompt [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- When errors occur, Bolt offers an "Attempt fix" button — "remember that each attempt uses tokens" [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07].
- Suggestions / prompts library: **Save and manage prompts** — "Save your prompts in the Prompt Library to reuse them later, and apply built-in prompts Bolt provides for common tasks" [Source: https://support.bolt.new/building/prompt-library.md, accessed 2026-08-07].
**Evidence gap:** explicit activity-card UI (showing file edits, tool calls, search results, subagent delegations inline as Lovable does) is **not documented** in public Bolt docs — only chat-history-based version previews.

## 8. Agent Experience

Bolt offers **two named agents** the user explicitly chooses between (unlike Lovable's single agent + on-demand subagents):
- **Standard** — "Balanced for everyday building. Standard is fast and token-efficient, which makes it a good default for most development work. It performs best when the task is well defined." Best for: small/medium-scale apps, UI updates, general development, clear well-defined tasks. Available on Free plan [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07].
- **Max** — "Maximum reasoning for complex tasks. Max thinks more about each step, which makes a difference when the task involves working through large codebases with complex dependencies or solving problems without an obvious solution." Paid plan only. Best for: large-scale applications, complex/interconnected features, refactoring, open-ended tasks [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07].
- Marketing language on bolt.new: "Bolt Agent — Standard (All users) / Max (Pro only); Speed: High; Intelligence: High; Token cost: Balanced" [Source: https://bolt.new, accessed 2026-08-07].
- "Bolt automatically routes to the right model for each task, balancing quality and cost. No more juggling platforms or guessing which agent to use" [Source: https://bolt.new, accessed 2026-08-07].
- Switch agents: "In the bottom-left corner of the chatbox, click the **current agent name**" [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07]. Hover over agent name for details.
- No documented "subagent" or "parallel researcher" feature — Bolt's parallelism is at the **runtime level** via WebContainer HMR (see §12), not at the agent-cognition level [Observed in docs, 2026-08-07].
- **HMR-driven perception**: Because the project runs in a WebContainer in-browser, code changes stream into the running preview via hot module replacement — "Bolt automatically builds your changes" after Save in Code view [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].

## 9. Memory

**Bolt has no equivalent of `.lovable/plan.md`.** Memory is implicit and managed via context window only:
- "Manage project context: Keep your context window small for better performance" [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07].
- "Most token usage is related to syncing your project's file system to the AI: the larger the project, the more tokens used per message" [Source: https://bolt.new/pricing, accessed 2026-08-07].
- Strategies to manage context: Clear context (resets Bolt's understanding), reduce project size, target files (right-click → Target file), lock files/directories (right-click → Lock file / Lock all) [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07; Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- "When you make changes to the project, Bolt doesn't automatically push them to the repository. Instead, your changes sync to GitHub the next time the project owner opens the project" — owner-presence-gated sync model [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **Skills** feature exists: "Use skills to apply reusable instructions" — markdown files of rules/workflows Bolt can apply during planning or building [Source: https://support.bolt.new/building/skills.md, accessed 2026-08-07]. Functionally similar to Lovable's Skills.
- **Prompt Library** saves user prompts for reuse [Source: https://support.bolt.new/building/prompt-library.md, accessed 2026-08-07].
- No mention of AGENTS.md/CLAUDE.md auto-read in Bolt docs (evidence gap).
- No mention of Workspace Knowledge / Project Knowledge text fields like Lovable's 10k-char fields.

## 10. Knowledge

Bolt's "knowledge" surface is fragmented:
- **Skills** — "rules and workflows Bolt can apply while planning or building" [Source: https://support.bolt.new/building/skills.md, accessed 2026-08-07]. Doc is 25KB — large feature set including skill metadata, conditions, sources, sharing.
- **Project Knowledge** mentioned in Project settings docs — "set project knowledge" alongside rename, domains, hosting, analytics, restore backups [Source: https://support.bolt.new/settings/project-settings.md, accessed 2026-08-07]. **Evidence gap:** project-knowledge-specific doc not located in llms.txt index — character limits and management UX undocumented.
- **Workspace knowledge** mentioned in Workspace settings docs [Source: https://support.bolt.new/settings/workspace-settings.md, accessed 2026-08-07]. Same gap.
- **Connectors (MCP servers)** — "Connect to an MCP server to give Bolt context from your external tools and data" [Source: https://support.bolt.new/building/using-bolt/connect-mcp.md, accessed 2026-08-07]. "Adding information to Bolt's context increases token consumption. We recommend turning on connectors for a project only when you need them."
- **Design system knowledge** — Teams plan only: "Design System knowledge with per-package prompts" [Source: https://bolt.new/pricing, accessed 2026-08-07]; detailed docs at `/building/design-system/*` [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].
- **Best practices** docs structure: Plan-mode → prompting → token-efficiency → manage-context [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].

## 11. Search

In-editor search:
- **Code view search**: "If you know where to look to make your changes, that's great. However, a shortcut is to use the search bar to find the text you want to change. To do so, click the **Search** icon" [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Search Help Center from chatbox**: `+` icon → Search Help Center — searches entire Bolt Help Center without leaving project [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Projects dashboard search**: "Use the search bar at the top to find a specific project" [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Mention files**: "To mention a project file or folder in your prompt, type the `@` symbol to tag the resource. Bolt brings up a list of matching files and folders that filters as you type" [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Ask Bolt on highlighted code**: highlight code in Code view → "Ask Bolt" button (may require right-click) — links selection to prompt box [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- Help Center uses ⌘K for site search and ⌘I for "Ask Assistant" [Source: https://support.bolt.new, accessed 2026-08-07].

## 12. Execution

Bolt executes locally in-browser via **WebContainers** — "the technology that first made it possible to run Node.js directly in your browser" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. WebContainer capabilities (from webcontainer.io):
- "Run the native versions of `npm`, `pnpm`, and `yarn`, all in the browser, all in your app, up to 10x faster than local" [Source: https://webcontainer.io, accessed 2026-08-07].
- "Full browser support: Run WebContainer in all major browsers, from Chromium-based, to Firefox or Safari TP" [Source: https://webcontainer.io, accessed 2026-08-07].
- "All major frameworks: Instantly spin up disposable environments running any major modern framework" [Source: https://webcontainer.io, accessed 2026-08-07].
- "Run Wasm out of the box" [Source: https://webcontainer.io, accessed 2026-08-07].
- Boot sequence: `WebContainer.boot()` → mount files → `npm i` → `npm run dev` (dev server in-browser) [Source: https://webcontainer.io, accessed 2026-08-07].
- **HMR**: After saving in Code view (`Ctrl+S`), "Bolt automatically builds your changes" — Code view → Preview toggle to see results [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Project lifecycle**: Design/plan → first prompt → iterate → publish (Bolt hosting / Netlify / GitHub / Expo / Download) [Source: https://support.bolt.new/get-started/project-lifecycle.md, accessed 2026-08-07].
- **Mobile app builds via Expo** — "Using Bolt with Expo to create mobile apps and publish them to app stores" [Source: https://support.bolt.new/integrations/expo.md, accessed 2026-08-07].
- No documented user-facing terminal in the Bolt editor (terminal exists in StackBlitz IDE for projects pre-April-2026 storage format, when "Open in StackBlitz" was available) [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07]. **Evidence gap:** explicit terminal/HMR-panel UX in current Bolt editor not documented.

## 13. Artifacts

- **Live preview** — interactive preview of running WebContainer app; toggle from Code view [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Code** — Code view, read/edit/delete files, create new files, Target file, Lock file/all, Ask Bolt on selection [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Visual Edits / Select tool** — Bolt's equivalent: "Use Select to target a specific element in your app's preview and focus your prompt on that part of the interface" with optional **Pick from layers** mode for greater control (target a card/section instead of inner button/heading) [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07]. Video references in docs at Cloudinary URLs [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Edit History / Version history** — "Version history (✅ Recommended) – Browse, preview, label, and restore older versions of your project automatically saved by Bolt using the **View history** button." Plus: Chat history (eye-icon preview, return-arrow restore), Manual Backups (download zip + restore via StackBlitz account), GitHub Integration [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07]. Version history supports **Change name** (pencil icon) and **Bookmark** [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07]. Restoring to an earlier project version does NOT change Bolt/Supabase databases [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Fork / Duplicate** — Bolt has both **Duplicate** (creates fresh copy in Bolt with code + settings intact, except GitHub/Netlify integrations; clears chat history) and **Transfer** (moves project between workspaces or users — Bolt DB transfers, GitHub/Supabase may need re-connection, custom domains must be removed first) [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07]. On StackBlitz (Bolt's parent), the action is called **Fork** — "Open the Fork dropdown menu, select your team, then click Open in bolt.new | AI" [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07]. **Important caveat:** "As of April 2026, we're updating how Bolt stores project code. When a project moves to the new format, the Open in StackBlitz option is no longer available" — fork-via-StackBlitz may be deprecated for new projects [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Plan Mode** — see §8/§24. "Implement this plan" button auto-switches to Build Mode.
- **Prompt Library** — saved prompts + Bolt-provided built-in prompts for common tasks [Source: https://support.bolt.new/building/prompt-library.md, accessed 2026-08-07].
- **Bolt Slides** — separate artifact type for presentations [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].

## 14. Keyboard UX

**Notable evidence gap.** Bolt's public docs document very few keyboard shortcuts:
- `Ctrl+S` — Save in Code view (triggers auto-build) [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- `Enter` — Submit prompt (or click blue arrow icon) [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- Help Center (support.bolt.new site) uses ⌘K for search and ⌘I for Ask Assistant — these are site-level shortcuts, not editor shortcuts [Source: https://support.bolt.new, accessed 2026-08-07].
- "Project lifecycle" doc lists "Keyboard shortcuts" only as an **optional enhancement to add to a generated app** (e.g., "Optional Enhancements: Dark/light mode toggle, Keyboard shortcuts, Task statistics") — not as Bolt editor shortcuts [Source: https://support.bolt.new/get-started/project-lifecycle.md, accessed 2026-08-07].
**Verdict:** Bolt's editor keyboard UX is largely undocumented in public help center docs. In contrast to Lovable's documented `Cmd+K`/`Cmd+B`/`Option+P`/`Option+V`/`S`/`T`/`D`/`C` set, Bolt does not publish a comparable reference.

## 15. Motion (streaming card motion, HMR transitions)

- **HMR transitions**: Because Bolt runs the project in a WebContainer in-browser, code changes propagate to the live preview via hot module replacement — "Bolt automatically builds your changes" after Save [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07]. WebContainer marketing claims "up to 10x faster than local" for npm/pnpm/yarn [Source: https://webcontainer.io, accessed 2026-08-07]. Specific HMR transition timing not documented.
- **Agent response streaming**: Bolt's docs do not describe an explicit streaming card UI. Instead, the response appears in chat and produces a version snapshot. The chat-history eye-icon preview gives "as-of-this-message" snapshots [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Quick action buttons** (Implement this plan / Show an example / Refine this idea) appear at end of Plan-mode response — implying chat-style append-after-response [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Plan mode highlight**: "Plan Mode highlights blue when active" — single-color state cue [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
**Evidence gap:** transition durations, easing curves, skeleton/shimmer loading states — not documented.

## 16. Animation

No public docs on animation specifics. The only animation-adjacent evidence:
- Chatbox Select tool has Cloudinary-hosted video demos (e.g., `select-option-default_znfl91.mp4`, `select-pick-from-layers_ge6lip.mp4`, `enhance-prompt-guided-questions_t74hvs.mp4`) — implies UI animation but the docs are text + video, no motion specs [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- HMR transitions imply live-preview re-render animations on code change [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- Plan-mode button color change (blue when active) [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
**Evidence gap:** no documented easing curves, transition durations, loading-state micro-animations.

## 17. Visual Hierarchy

Top-bar layout in Bolt editor:
- **Top-left**: project title menu (Open recent project / Rename / Transfer / Duplicate / Export) [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Top-center**: Code/Preview toggle, Database icon, Gear icon ("All project settings") [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Top menu**: Version history (clock icon) [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Top-right**: Share and Publish [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **Bottom-left of chatbox**: `+` icon → Settings, Search Help Center, Enhance prompt, Attach file [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Bottom-left of chatbox**: Current agent name [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07].
- **Bottom-right of chatbox**: Plan toggle [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **In chatbox**: Select tool (with arrow for Pick from layers) [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Above chatbox** (when enabled in Settings → General → Display token usage in chat): token usage display [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Project thumbnail**: "Project thumbnail images generate when you prompt Bolt. If you don't see a thumbnail for a project, it will appear the next time you prompt Bolt in that project" [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].

## 18. Progressive Disclosure

- `+` icon in chatbox hides Settings / Search Help Center / Enhance prompt / Attach file behind a single menu [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- Select tool has secondary "Pick from layers" toggle behind small arrow [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- Code view Target file / Lock file / Lock all revealed on right-click in Files list [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- Quick action buttons appear contextually after Plan-mode responses (not always) [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- Token usage display opt-in via Settings → General → "Display token usage in chat" — off by default [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Project settings gear** opens "All project settings" — overflow container for less-frequent actions [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
**Evidence gap:** less extensive than Lovable's explicit progressive-disclosure pattern (activity cards expandable, More menu, preview toolbar hide/show, suggestion chips toggleable off).

## 19. Accessibility

Almost no documented accessibility features:
- **No documented keyboard shortcut set** beyond `Ctrl+S` and `Enter` [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07; Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Safari read-only limitation** in Code view — must use Chrome/Chromium-family browser to edit code [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07]. This is an access-barrier for Safari users.
- WebContainer supports "all major browsers, from Chromium-based, to Firefox or Safari TP" (Technology Preview only — i.e., stable Safari is NOT supported for WebContainer itself; only Safari TP) [Source: https://webcontainer.io, accessed 2026-08-07].
- Help Center uses ⌘K for search, ⌘I for Ask Assistant — site-level [Source: https://support.bolt.new, accessed 2026-08-07].
- **Bolt Slides** as separate artifact type [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07] — no accessibility-specific docs.
**Evidence gap:** no VPAT/WCAG statement, no documented screen-reader behavior for the chat thread, no documented high-contrast or reduced-motion mode. Compared to Lovable's SEO & AI search accessibility checks, Bolt's a11y posture is weaker in public docs.

## 20. Performance Perception (Bolt WebContainer latency — local-first; Lovable cloud latency)

- **Local-first execution**: Bolt runs the WebContainer in-browser, so once booted, the project runs locally without round-trips to a cloud VM for runtime operations (npm install, dev server, HMR) [Source: https://webcontainer.io, accessed 2026-08-07].
- "up to 10x faster than local" claim for native npm/pnpm/yarn inside WebContainer [Source: https://webcontainer.io, accessed 2026-08-07].
- **Token usage is the primary performance/cost perception issue**: "Most of your token usage comes from Bolt reading, understanding, and syncing your project files, so larger projects use more tokens per message" [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07].
- **QuickStart reality check**: "Following this walkthrough will use just under 300K tokens, which is the daily limit of Bolt's free plan" — for a single Pet Name Picker app [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- In QuickStart example: initial build used ~204K tokens (out of 1M monthly, 300K daily); a follow-up "Change the title to PetPick" used ~70K tokens; a code-view edit used 0 tokens [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- Free plan: 300K tokens/day limit + 1M tokens/month limit; upgrading to paid removes daily limit [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- Bolt homepage claim: "projects 1,000 times larger than before" via improved built-in context management [Source: https://bolt.new, accessed 2026-08-07].
- Cloudflare partnership (June 4, 2025) backing `pkg.pr.new`'s data infrastructure — "enabling us to sustainably scale preview package releases" [Source: https://blog.stackblitz.com, accessed 2026-08-07].

## 21. Trust

**Sandbox & isolation:** WebContainers run inside the browser tab — Node.js runs in the user's browser sandbox, not on StackBlitz servers; WebContainer is "the trusted, browser-based runtime from StackBlitz" [Source: https://webcontainer.io, accessed 2026-08-07]. SOC 2 Type II compliance for Bolt [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07].

**Token & credit system (DETAILED):**
- Bolt uses **tokens** (not credits) as the consumption unit. "Tokens are small pieces of text. Short, common words like 'I', 'love', and 'cats' are typically one token each, but longer or less common words can be split into several" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- "Bolt consumes tokens when it reads, thinks about, and builds your project" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- "Bolt has a limit on how many tokens it can work with in each conversation. This limit includes both your input (like questions or documents) and Bolt's output (like responses or generated code)" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Free plan**: 300K tokens/day, 1M tokens/month, Bolt branding on websites, 10MB file upload, hosting up to 333K web requests, unlimited databases [Source: https://bolt.new/pricing, accessed 2026-08-07].
- **Pro plan** ($25/month): No daily token limit, starts at 10M tokens/month, no Bolt branding, share sites privately, 100MB file upload, hosting up to 1M web requests, unused tokens roll over one month, custom domain support, SEO boosting, expanded database capacity, choice of database provider, image editing with AI [Source: https://bolt.new/pricing, accessed 2026-08-07].
- **Teams plan** ($30/month/member): Everything in Pro + centralized billing, team-level access management, granular admin controls & user provisioning, share with your organization, private NPM registries, Design System knowledge with per-package prompts [Source: https://bolt.new/pricing, accessed 2026-08-07].
- **Enterprise** (custom): SSO, audit logs, compliance support, dedicated account manager, 24/7 priority support, custom workflows/integrations/SLAs, flexible billing/procurement, data governance/retention policies, hands-on onboarding [Source: https://bolt.new/pricing, accessed 2026-08-07].
- **Token reset**: Free = 1st of each calendar month; Paid = renewal date [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Token rollover** (July 1, 2025 onwards): Paid plan tokens roll over **one additional month** (valid up to two months total) — but active paid subscription required to access rolled-over tokens [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07; Source: https://bolt.new/pricing, accessed 2026-08-07].
- **Token reload** (paid users only — those on highest-tier monthly Pro or any annual Pro): "Any tokens purchased as a reload do not expire" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Mid-cycle cancellation**: "When you cancel your paid plan, you lose access to all allocated tokens (including rollover tokens) when the billing cycle ends" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Free plan tokens do not roll over** — "Any tokens that you have accrued are assigned as fixed one-month buckets" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **FIFO consumption**: "Tokens are consumed on a first-in, first-out basis, meaning the oldest (rollover) buckets are consumed before the newer tokens" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Downgrade retention**: "When you downgrade from one paid plan to a lower-tier paid plan, you retain access to any unused tokens from your previous (higher-tier) allocation until they expire" [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Buttons don't use tokens**: "Use the Publish button instead of prompting Bolt to publish your site" / "Use the Version History feature instead of prompting Bolt to revert" — "Clicking an on-screen button or action doesn't use tokens, but prompting Bolt does" [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07].
- **Restoring versions doesn't use tokens**: "Restoring your site to a previous version doesn't use tokens!" [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Code view edits don't use tokens**: "you just made code changes that didn't require any tokens!" [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Connectors increase token consumption**: "Adding information to Bolt's context increases token consumption. We recommend turning on connectors for a project only when you need them" [Source: https://support.bolt.new/building/using-bolt/connect-mcp.md, accessed 2026-08-07].
- **Avoid repeated auto-fix attempts**: "Each attempt uses tokens. Avoid clicking Attempt fix over and over" [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07].
- **Free-plan support limited**: "If you're on a free plan: Reach out for support on Discord" — paid plan required for email support [Source: https://support.bolt.new, accessed 2026-08-07].

## 22. Explainability

- **Version history** is the primary explainability artifact — "Version history (which you can see using the **View history** button) is a timeline of changes, letting you see how your project has evolved and pick out the exact point you want to return to" [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Backup name change**: "Version history lets you change the auto-generated name of a backup so it's easier to recognize" [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Bookmark**: "Version history also lets you bookmark backups so you can quickly find important versions later" [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Token display in chat** (opt-in): "Turn on Display token usage in chat" — shows remaining tokens above chatbox [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Plan Mode** provides structured plans + "Implement this plan" / "Show an example" / "Refine this idea" action buttons [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Plan Mode web research**: "When Bolt answers a question, it can pull in real-time, up-to-date information from trusted web sources instead of just relying on what it was trained on. When a search has been conducted, Bolt displays the sources at the top of the response" [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Inspector tool**: "Use the Inspector tool to highlight a component within a page, and discuss potential changes" — visible targeting during Plan mode [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
**Evidence gap:** Bolt does NOT publish a per-message cost breakdown like Lovable's "Credits used" menu — token consumption is shown only as a balance decrement (e.g., "96K → 26K = 70K used"), not as a per-action accounting.

## 23. Long Session Experience

- **No persisted plan file** (no `.lovable/plan.md` equivalent) — long-session memory is implicit only [Observed in docs, 2026-08-07].
- **Context window management**: "Clearing Bolt's context resets its understanding of your project so your requests use fewer tokens" — explicit manual context-reset strategy [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07].
- **Reduce project size**: "A smaller project uses fewer tokens, because Bolt has less code to read and process" — clean up unused files, split large files [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07].
- **Target file / Lock file**: Right-click in Files list → Target file (focus Bolt's edits) or Lock file/all (exclude from edits) [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Prompt queue**: **NOT documented** as a Bolt feature. Bolt processes "one prompt at a time" but does not appear to surface a visible queue UI like Lovable's [Observed in docs — only multiplayer "Bolt processes one prompt at a time" reference found in collaborate.md, 2026-08-07].
- **Duplicate + Transfer**: For long chats, **Duplicate** (clears chat history) + **Transfer** to another workspace/user is the Bolt-native fork strategy [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07]. Docs explicitly advise: "If you want information from your chat history available in the new project, generate a summary before duplicating and upload it afterward" (via Plan mode prompt: "Generate a short summary of our conversation so far") [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07]. This is a manual workaround for context loss on fork.
- **Plan mode** to avoid unnecessary code exchanges: "Plan mode uses fewer tokens because it doesn't make any changes to your project" [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07].
- **Multiplayer long sessions**: "Every project has a single shared chat thread" — single-threaded, single-prompt-at-a-time — implies chat thread grows linearly with no compression [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **No subagent parallelism** documented (unlike Lovable's subagents) [Observed in docs, 2026-08-07].

## 24. Power User Features

- **Plan Mode** (homepage + in-project): blue-highlight toggle, quick action buttons, Inspector tool, web research with sources cited [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Standard vs Max agents** — explicit agent choice (Max for large/complex/refactoring/open-ended; Standard for everyday) [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07].
- **Select + Pick from layers** — UI element targeting with layer-tree picker [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Code view with Target file / Lock file / Lock all / Ask Bolt on selection** — surgical scope control [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Version history** with Change name + Bookmark + diff preview [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Prompt Library** — saved prompts + Bolt-provided built-in prompts for common tasks [Source: https://support.bolt.new/building/prompt-library.md, accessed 2026-08-07].
- **Skills** — reusable markdown instruction files [Source: https://support.bolt.new/building/skills.md, accessed 2026-08-07].
- **Connectors (MCP servers)** — external context sources [Source: https://support.bolt.new/building/using-bolt/connect-mcp.md, accessed 2026-08-07].
- **Bolt Cloud** — databases, hosting, domains, server functions, user management, file storage, secrets, logs, send-emails [Source: https://support.bolt.new/cloud/bolt-cloud.md, accessed 2026-08-07; Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].
- **Design system support** (Teams+): add design system, view it in Bolt, build with it, sync it from source, per-package prompts [Source: https://support.bolt.new/building/design-system/introduction.md, accessed 2026-08-07; Source: https://bolt.new/pricing, accessed 2026-08-07].
- **Mobile app builds via Expo** — including app store publishing [Source: https://support.bolt.new/integrations/expo.md, accessed 2026-08-07].
- **Multiplayer collaboration** — real-time co-editing, single shared chat thread, tokens drawn from prompter's account [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **Bolt Slides** — separate artifact type for presentations [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].
- **Team templates** (Teams plan) — skip repetitive project setup [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].
- **Import from Lovable** — explicit Lovable→Bolt migration path [Source: https://support.bolt.new/integrations/lovable-import.md, accessed 2026-08-07].
- **Import from Figma / Google Stitch / GitHub repo** [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07].
- **Project transfer** to workspace or user (with documented integration-transfer behavior) [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Scheduled jobs / Project monitoring** — **not documented** in Bolt docs (Lovable has this; Bolt does not appear to) [Observed in llms.txt, 2026-08-07].

## 25. Developer Experience

- **GitHub integration** — connect a GitHub repository for backups, sync commits automatically, work across branches; create a new repository from a Bolt project or import an existing repository [Source: https://support.bolt.new/integrations/git.md, accessed 2026-08-07]. Note: GitHub integration is owner-only for collaborators; changes sync only when project owner opens the project [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **GitHub org access** — org admins control which repos Bolt users can access [Source: https://support.bolt.new/integrations/github-org.md, accessed 2026-08-07].
- **Export > Download** — download project as zip; restore via StackBlitz account by drag-drop into a new empty project [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07; Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Export > Open in StackBlitz** — open project in StackBlitz IDE for direct code editing; **deprecated for projects migrated to new April 2026 storage format** ("the Open in StackBlitz option is no longer available") [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Code view** — full file editor with Target/Lock controls [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **WebContainer API** — separate commercial product (webcontainer.io) for embedding in-browser dev environments in your own app [Source: https://webcontainer.io, accessed 2026-08-07]. "Pricing" page exists for WebContainer API at webcontainer.io [Source: https://webcontainer.io, accessed 2026-08-07].
- **MCP server connection** — connect to external MCP servers for context [Source: https://support.bolt.new/building/using-bolt/connect-mcp.md, accessed 2026-08-07].
- **Supabase alternative to Bolt Database** — "Use Supabase with Bolt to add a database, authentication, or edge functions to your app as an alternative to Bolt Database" [Source: https://support.bolt.new/integrations/supabase.md, accessed 2026-08-07].
- **Netlify for hosting** — one-click publish from within Bolt [Source: https://support.bolt.new/integrations/netlify.md, accessed 2026-08-07].
- **Stripe for payments** [Source: https://support.bolt.new/integrations/stripe.md, accessed 2026-08-07].
- **Google SSO** [Source: https://support.bolt.new/integrations/google-sso.md, accessed 2026-08-07].
- **Expo for mobile apps** [Source: https://support.bolt.new/integrations/expo.md, accessed 2026-08-07].
- **Figma for design import** [Source: https://support.bolt.new/integrations/figma.md, accessed 2026-08-07].
- **Import from Lovable** [Source: https://support.bolt.new/integrations/lovable-import.md, accessed 2026-08-07].
- **OpenAPI spec**: `https://support.bolt.new/api-reference/openapi.json` [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07] — Bolt publishes a public OpenAPI spec (Lovable does not, by comparison).

## 26. Biggest Strengths (with evidence)

1. **Local-first WebContainer execution** — "Bolt runs on WebContainers, so you don't have to install anything or set up a local environment before you start building" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. WebContainer claims "up to 10x faster than local" for npm/pnpm/yarn [Source: https://webcontainer.io, accessed 2026-08-07]. This is a fundamental architectural advantage over cloud-side VM execution.
2. **Browser-native security sandbox** — Node.js runs in the browser tab, not on StackBlitz servers [Source: https://webcontainer.io, accessed 2026-08-07]. SOC 2 Type II compliant [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07].
3. **Explicit Standard vs Max agent choice** — gives users control over cost/quality tradeoff ("Max thinks more about each step... For tasks where Standard already performs well, Max may not show a noticeable difference") [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07].
4. **Buttons-vs-prompts token economics** — "Clicking an on-screen button or action doesn't use tokens, but prompting Bolt does" — explicit guidance to use UI affordances for free actions (Publish, Version History) [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07]. Code view edits are also free [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
5. **Token rollover** (since July 1, 2025) — paid-plan unused tokens roll over one month (valid 2 months total) [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
6. **Token reload does not expire** — purchased reload tokens are permanent [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
7. **Plan Mode with web research + sources cited at top of response** — explainable AI answer sourcing [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
8. **Import paths** — explicit migration from Lovable, Figma, Google Stitch, GitHub repos [Source: https://support.bolt.new/integrations/lovable-import.md, accessed 2026-08-07; Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07].
9. **You own your code** — "The code you create is yours to use for any legal purpose, including commercial projects" [Source: https://support.bolt.new/get-started/intro-bolt.md, accessed 2026-08-07]. Bolt 100K Open Source Fund signals OSS commitment [Source: https://blog.stackblitz.com, accessed 2026-08-07].
10. **Public OpenAPI spec** at `/api-reference/openapi.json` [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07] — Bolt publishes a programmatic API surface (Lovable does not, by comparison).
11. **Multiplayer collaboration** with real-time co-editing [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
12. **WebContainer API as separate commercial product** — embeddable in-browser dev environments power Bolt; also available to third-party products [Source: https://webcontainer.io, accessed 2026-08-07].
13. **Mobile app building via Expo** including app store publishing [Source: https://support.bolt.new/integrations/expo.md, accessed 2026-08-07].

## 27. Biggest Weaknesses (with evidence)

1. **No persisted plan/memory file** — Bolt has no equivalent of `.lovable/plan.md`; long-context degradation is acknowledged implicitly via the recommendation to "clear context" and "reduce project size" as workarounds [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07]. **Notable evidence gap vs Lovable.**
2. **No visible prompt queue UI** — Bolt processes one prompt at a time but does not appear to surface a queue UI like Lovable's 50×-repeat queue; users must wait or context-switch [Observed in docs, 2026-08-07].
3. **No documented activity cards / subagent delegation UI** — Bolt's docs do not describe an expandable-card surface for file edits, web searches, browser tests [Observed in docs, 2026-08-07].
4. **Token accounting is opaque** — only balance decrement shown, no per-message cost breakdown (Lovable shows "Credits used" per message) [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
5. **Heavy token consumption on large projects** — "Most token usage is related to syncing your project's file system to the AI: the larger the project, the more tokens used per message" [Source: https://bolt.new/pricing, accessed 2026-08-07]. QuickStart example: 70K tokens to change a single title via prompt [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
6. **Free plan daily 300K cap reached by a single example app build** — "Following this walkthrough will use just under 300K tokens, which is the daily limit of Bolt's free plan" [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
7. **Free-plan support is Discord-only** — "If you're on a free plan: Reach out for support on Discord" [Source: https://support.bolt.new, accessed 2026-08-07].
8. **Safari read-only limitation** — "If you're using Bolt in Safari, code view is read-only. You can still open and look through your files, but you'll need to prompt Bolt to make changes instead of editing them directly" [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
9. **WebContainer itself only supports Safari TP** (Technology Preview), not stable Safari — "Run WebContainer in all major browsers, from Chromium-based, to Firefox or Safari TP" [Source: https://webcontainer.io, accessed 2026-08-07].
10. **"Open in StackBlitz" deprecated** for projects migrated to April 2026 storage format — fork-via-StackBlitz workaround may no longer be available for new projects [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
11. **Duplicate clears chat history** — workaround is to manually generate a chat summary via Plan-mode prompt + attach to new project — kludgy fork-with-context workflow [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
12. **Mid-cycle cancellation loses all allocated tokens** — including rollover tokens [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
13. **No scheduled jobs / project monitoring** — Bolt docs do not document these features; Lovable has both (Jobs + Project Monitoring) [Observed in llms.txt, 2026-08-07].
14. **GitHub integration is owner-only** — collaborators can't connect or manage GitHub; changes sync only when owner opens project [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
15. **Public keyboard shortcut documentation is sparse** — only `Ctrl+S` and `Enter` documented; no `Cmd+K` command palette equivalent in editor [Observed in docs, 2026-08-07].
16. **Restoring a version does NOT restore databases** — "Restoring to an earlier project version will not change your current Bolt or Supabase databases" — schema/structure revert is partial [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
17. **"98% less errors" claim** on homepage lacks source/methodology [Source: https://bolt.new, accessed 2026-08-07].
18. **"1,000 times larger than before"** project-size claim on homepage lacks baseline year/version [Source: https://bolt.new, accessed 2026-08-07].

## 28. What should MiMo learn?

- **Local-first execution via WebContainer** — running the project in-browser (not cloud VM) eliminates round-trip latency for runtime operations; WebContainer claims "up to 10x faster than local" for npm/pnpm/yarn [Source: https://webcontainer.io, accessed 2026-08-07].
- **Explicit Standard vs Max agent choice with documented tradeoffs** — "For tasks where Standard already performs well, Max may not show a noticeable difference" [Source: https://support.bolt.new/building/using-bolt/agents.md, accessed 2026-08-07]. Clear cost/quality knob.
- **Buttons-don't-use-tokens economics** — explicit UI affordances (Publish, Version History) bypass token consumption [Source: https://support.bolt.new/best-practices/maximizing-token-efficiency.md, accessed 2026-08-07].
- **Code view edits are free** — manual code edits via Code view consume zero tokens [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **Target file / Lock file / Lock all** — surgical scope control during agent edits [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **Pick from layers in Select tool** — lets user target a card/section instead of inner button/heading [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Plan Mode quick action buttons** (Implement this plan / Show an example / Refine this idea) — contextual one-click follow-throughs [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Plan Mode web research with sources cited at top of response** — explainable AI answer sourcing [Source: https://support.bolt.new/best-practices/plan-mode.md, accessed 2026-08-07].
- **Enhance prompt guided-question flow** — `+` icon → Enhance prompt → answer questions → Bolt generates recommended prompt the user can edit [Source: https://support.bolt.new/building/chat-tools.md, accessed 2026-08-07].
- **Prompt Library** (saved prompts + built-in prompts for common tasks) [Source: https://support.bolt.new/building/prompt-library.md, accessed 2026-08-07].
- **Token rollover** (one month) + **token reload does not expire** — two-tier token economy [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Public OpenAPI spec** at `/api-reference/openapi.json` [Source: https://support.bolt.new/llms.txt, accessed 2026-08-07].
- **Project transfer with documented integration-transfer behavior** — clear DB / GitHub / Supabase / custom domain transfer rules [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Explicit Import-from-Lovable path** — competitive migration friction-reducer [Source: https://support.bolt.new/integrations/lovable-import.md, accessed 2026-08-07].
- **Multiplayer single-shared-chat-thread** with tokens drawn from prompter's account (not owner) — clean accounting model [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **WebContainer API as separate commercial product** — embeddable in-browser dev environment productized separately [Source: https://webcontainer.io, accessed 2026-08-07].

## 29. What should MiMo reject?

- **No persisted plan/memory file** — Bolt's lack of a `.lovable/plan.md` equivalent is a weakness; long-context degradation is hand-waved via "clear context" [Source: https://support.bolt.new/best-practices/manage-context.md, accessed 2026-08-07].
- **No visible prompt queue** — Bolt processes one prompt at a time but does not surface a queue UI; users can't batch or repeat prompts [Observed in docs, 2026-08-07].
- **Duplicate clears chat history** with manual Plan-mode-summary workaround — kludgy fork-with-context flow [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Restoring a version does NOT restore databases** — partial revert is misleading [Source: https://support.bolt.new/building/using-bolt/rollback-backup.md, accessed 2026-08-07].
- **Safari read-only Code view** — forces Safari users to switch browsers for code editing [Source: https://support.bolt.new/building/using-bolt/code-view.md, accessed 2026-08-07].
- **WebContainer Safari TP-only support** — stable Safari users can't run WebContainer at all [Source: https://webcontainer.io, accessed 2026-08-07].
- **Mid-cycle cancellation loses all tokens including rollovers** — punitive cancellation policy [Source: https://support.bolt.new/account-and-subscription/tokens.md, accessed 2026-08-07].
- **Free-plan Discord-only support** — paywall on email support [Source: https://support.bolt.new, accessed 2026-08-07].
- **GitHub integration owner-only** — collaborators can't manage it; changes sync only on owner-presence [Source: https://support.bolt.new/building/using-bolt/collaborate.md, accessed 2026-08-07].
- **"Open in StackBlitz" deprecated** for April 2026+ storage format — fork-via-StackBlitz workaround lost [Source: https://support.bolt.new/building/using-bolt/projects-files.md, accessed 2026-08-07].
- **Unsourced marketing claims** ("98% less errors", "1,000 times larger than before") — lack methodology disclosure [Source: https://bolt.new, accessed 2026-08-07].
- **Per-message token accounting not exposed** — only balance decrement shown, not per-action cost [Source: https://support.bolt.new/get-started/quickstart.md, accessed 2026-08-07].
- **No scheduled jobs / project monitoring features** — Bolt docs do not document these; competitors (Lovable) do [Observed in llms.txt, 2026-08-07].
- **Sparse keyboard shortcut documentation** — only Ctrl+S and Enter; no command palette equivalent in editor [Observed in docs, 2026-08-07].

## 30. Confidence Score

**Confidence: 75/100**

Reasoning:
- (+) Official support.bolt.new docs are fully extractable as Mintlify `.md` files (correct URL pattern discovered via `/llms.txt` index — initial guesses at URL patterns returned `null` for some paths). ~30 docs pages read across intro-bolt, quickstart, project-lifecycle, plan-mode, prompting-effectively, maximizing-token-efficiency, manage-context, agents, code-view, collaborate, projects-files, rollback-backup, sharing, connect-mcp, skills, start-project, upload-files, images, security, prompt-library, version-history-github, tokens, billing, git, expo, lovable-import, figma, bolt-cloud, design-system-introduction, account-settings, project-settings.
- (+) Pricing page is static HTML with full plan table + token FAQ; clear token economics documented.
- (+) webcontainer.io provides primary-source evidence on the local-first execution model (WebContainer runtime claims, browser support matrix, boot sequence code).
- (+) blog.stackblitz.com corroborates engineering posts (Cloudflare partnership June 4 2025, Bolt 100K Open Source Fund Feb 13 2025, ViteConf 2024, VoidZero investment Oct 1 2024).
- (−) **Product NOT actually used in a browser** — interactive editor (signed-in SPA) was not inspected in this sandbox. Onboarding survey, empty state, mobile vs desktop layout, error/loading shimmer, agent visualization UI specifics — all inferred from docs, not observed.
- (−) **Sparse keyboard shortcut documentation** in public docs — only Ctrl+S and Enter are explicitly documented for the editor. ⌘K and ⌘I appear only as Help Center site shortcuts, not editor shortcuts. This is a confidence-lowering evidence gap (Lovable docs these explicitly).
- (−) **Activity-card UI / streaming-response surface** is **NOT documented** — Bolt's docs describe chat-history-version-snapshots (eye-icon preview, return-arrow restore) but not an expandable-card UI like Lovable's. Whether Bolt has activity cards inline could not be verified without using the product.
- (−) **Project Knowledge / Workspace Knowledge character limits and management UX undocumented** — docs reference these features but no dedicated doc page exists in the llms.txt index for them.
- (−) `z-ai function web_search` returned 429 even after 30s retry; product-specific third-party evidence (Reddit complaints, Trustpilot reviews) not gathered.
- (−) **April 2026 storage-format migration** is referenced but the migration's full UX implications (e.g., what "Open in StackBlitz" users should do instead) are not fully documented.
- (−) Some marketing claims on bolt.new ("98% less errors", "1,000 times larger than before") lack source methodology — these are vendor claims, not independently verifiable.
