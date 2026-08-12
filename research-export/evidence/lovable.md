# Lovable — Evidence File (Task W3a, Phase R2)

**Product:** Lovable (lovable.dev) — AI software engineer for the web
**Vendor:** Lovable (independent; raised $100M Series B led by Coatue in 2025; backed by Cerebras partnership Aug 2026)
**Evidence agent:** general-purpose sub-agent, sandboxed
**Method:** Official docs (`docs.lovable.dev`, fetched as Mintlify `.md` files), pricing page (`lovable.dev/pricing`, statically extractable HTML), changelog (`lovable.dev/changelog`, statically extractable HTML), and blog (`lovable.dev/blog`). All curl-fetched with browser UA after `z-ai function web_search` returned HTTP 429 even after 30s retry. Cached under `research/evidence/raw-lovable/`. **Product NOT directly used in a browser** — homepage `lovable.dev` is behind Cloudflare ("Just a moment…") and `/help` and `/features` return 404; the actual editor (signed-in SPA) was not inspected in this sandbox. All evidence is from public docs/changelog/blog, not first-hand interactive sessions.
**Access date:** 2026-08-07 (all `[Source: <URL>, accessed 2026-08-07]` citations below).

---

## 1. Product Overview

Lovable is an "AI software engineer" that "enables anyone to build for the web" through natural-language chat [Source: https://lovable.dev/pricing, accessed 2026-08-07]. The product takes a high-level natural-language prompt ("Add authentication with sign up and login") and produces a running full-stack web app — frontend code, backend, database, auth, hosting — without requiring the user to write code [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07]. Lovable ships with a built-in backend called **Cloud** (Postgres-compatible database, auth, file storage, edge functions, scheduled jobs, AI) so users do not need to set up separate infrastructure [Source: https://docs.lovable.dev/features/cloud.md, accessed 2026-08-07]. Default stack is React + Vite, with **TanStack Start (SSR)** becoming the default template from May 13, 2026 [Source: https://lovable.dev/blog, accessed 2026-08-07]. Mobile app on iOS/Android shipped April 27, 2026 [Source: https://lovable.dev/blog, accessed 2026-08-07]. Latest changelog entry reviewed: July 31, 2026 ("Opt out of AI model training") [Source: https://lovable.dev/changelog, accessed 2026-08-07].

## 2. Product Philosophy

Lovable's stated philosophy is "build software by chatting" — the marketing copy reads "Lovable is an AI software engineer, which enables anyone to build for the web. Simply chat to instantly build websites and web apps, with no technical knowledge needed" [Source: https://lovable.dev/pricing, accessed 2026-08-07]. Internally the team describes the agent's design as a loop: "Behind every message, Lovable's agent works in a loop: it gathers context from your conversation and project, takes action with tools, and checks the result before moving on" [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. The company positions itself as "the first AI coding agent platform to earn AIUC-1 certification" (industry security standard for AI agents, July 22, 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07]. The blog post "$85,000 in tokens later: What I learned from scaling agentic coding at Lovable" (July 3, 2026) by engineer Alexander Lebedev describes plan-mode PRs and "agent swarms shipping 150+ PRs a week" — evidence of an internal philosophy that the agent should produce PR-quality output autonomously [Source: https://lovable.dev/blog, accessed 2026-08-07].

## 3. Core Mental Model

The user's mental model is **chat + live preview split**, with two interchangeable modes at the prompt box: **Build mode** (was "Agent mode") and **Plan mode** (was "Chat mode") [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07]. The docs state: "Plan mode is for decision-making. Build mode is for execution. The two modes are designed to work together, and you can switch between them at any time" [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07]. The workspace is a **project** (chat + preview + code + Cloud backend + version history) rather than a generic agent. The persistent agent memory lives in `.lovable/plan.md` (latest approved plan) [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07] and in **Workspace Knowledge** + **Project Knowledge** text fields (10k char each) [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07]. There is no separate "agent visualization" pane — agent activity is surfaced **inline in chat** as expandable "activity cards" [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].

## 4. User Journey

Lovable's docs describe the project lifecycle as: design/plan → first prompt → iterate → publish [Source: https://docs.lovable.dev/features/projects/overview.md, accessed 2026-08-07]. From the dashboard the user clicks "create project," is dropped into the editor with chat panel left + preview right; their first prompt can attach files (designs, spreadsheets, PDFs, audio recordings — up to 10 files / 256 MB per file on paid plans) [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. After the first build, the user iterates by typing more prompts, using the **preview toolbar** to select elements visually, or opening **Code** tab to edit code directly (paid plans) [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/code-mode.md, accessed 2026-08-07]. Publishing is a single **Publish** button in the top-right, optionally with a custom domain [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. The Lovable mobile app (iOS/Android, April 2026) lets users continue building from phone with swipeable views instead of a top bar [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. **Observed:** Not directly observed in this sandbox (Cloudflare-protected homepage and signed-in SPA not accessible to curl).

## 5. Navigation

Top bar in the editor contains: **Lovable logo** (opens dashboard sidebar in place, so workspace/project switching doesn't leave editor), **project name menu** (Settings, Connectors, Remix, Rename, Star, Move to folder, Details, Appearance, Help), **History toggle** (version history), **Close sidebar toggle** (`Cmd+B` / `Ctrl+B`), and a **project toolbar** of tabs: Preview (home), Files, Code, More (opens a panel containing Analytics, Cloud, Agent integrations, Payments, Connectors, Security, SEO & AI search, Sensitive data) [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. A **command palette** is triggered by `Cmd+K` / `Ctrl+K` from anywhere in the editor [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. Top-right controls above preview: Preview toolbar toggle, Comments, Collaborator avatars, Share, Publish [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].

## 6. Workspace (chat + preview split)

Two main areas: **Chat panel (left)** for prompts and following agent progress; **Preview (right)** — a "live, interactive version of your app that updates as Lovable works" [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. Layout description explicitly states: "On smaller windows some controls collapse into overflow menus, and the Lovable mobile app arranges the same areas as swipeable views instead of a top bar" [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. The chat panel hosts the prompt box with: a microphone for dictation (`Option+V` / `Alt+V`), the **mode toggle** (Build/Plan, `Option+P` / `Alt+P`), and a `+` button opening the **Chat actions menu** [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. The preview toolbar can be docked at bottom-center of preview, dragged anywhere (snaps to corners), minimized to a tab, or hidden [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07]. The sidebar can be collapsed (`Cmd+B`) for full-window preview [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].

## 7. Conversation (streaming action cards)

The agent's actions surface as **expandable activity cards** in chat: "file edits, commands, web searches, browser tests, and the subagents it delegates research to. Expand a card to inspect the details. On bigger Build mode requests, Lovable also shows the tasks it's working through" [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. When Lovable needs more direction it pauses and shows a **question card** holding "up to four questions, each with answer options" — the user can pick an option or write their own; they can move between questions, change earlier answers, skip individually or skip all [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. Draft answers persist in browser so a refresh doesn't lose them [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. After a response, action chips appear: **Undo latest edit** (latest response only, no confirmation), **Revert to this version** (earlier responses, with confirmation), **Copy**, **Helpful/Not helpful** [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. A "More options" menu reveals: Copy message link, Preview (see app as of that message without reverting), how long Lovable worked, and **Credits used** for that message [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].

## 8. Agent Experience

Build mode is autonomous: "When you give Lovable a task, it takes ownership of execution end to end. It understands your intent, explores the codebase for context, applies changes across files, and resolves issues that appear during development" [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07]. **Visible tasks** appear in chat showing: current step, files being modified, tools being used (search, web fetch, image generation), progress through multi-step implementations [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07]. The agent can inspect logs, runtime output, network activity and iterate on fixes [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07]. **Subagents** (May 27, 2026 release) are "temporary, read-only" workers that "inspect your project, look up documentation, review work against your prompt, and return findings to the main agent. Subagents cannot edit, create, or delete files" [Source: https://lovable.dev/changelog, accessed 2026-08-07; Source: https://docs.lovable.dev/features/subagents.md, accessed 2026-08-07]. A **Vent tool** (May 21, 2026) lets the main agent send feedback directly to its creators — described as "self-improving every hour by learning from production friction" [Source: https://lovable.dev/blog, accessed 2026-08-07]. There is no separate agent visualization panel; everything flows through the chat activity card stream [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].

## 9. Memory

Memory is layered:
- **`.lovable/plan.md`** — "When you approve a plan, the latest approved version is saved to `.lovable/plan.md`. This file represents the current plan that Build mode will implement, and you can inspect it like any other project file" [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07]. Previous plans are not lost — they remain in chat history and can be reopened in Plan view [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- **Workspace Knowledge** — single text field per workspace, up to 10,000 characters, shared across all projects, editable only by workspace owners/admins [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **Project Knowledge** — per-project text field, up to 10,000 characters, editable by anyone with edit access [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **Skills** (May 18, 2026) — markdown files with reusable instructions loaded on-demand when the request matches the skill's description (contrast with Knowledge, which is always included) [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07; Source: https://lovable.dev/blog, accessed 2026-08-07].
- **AGENTS.md / CLAUDE.md** — root-level instruction files in the user's GitHub repository are always read by the Lovable agent regardless of session length [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- The docs admit a long-session limitation: "in very long conversations with a lot of context, instructions may not always be followed consistently" [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].

## 10. Knowledge

See §9. Knowledge is a **deterministic always-on context layer** — distinct from Skills (on-demand) and from Plans (per-conversation). Recommended content includes coding standards (e.g., "Always enable TypeScript strict mode", "Never use `any`"), naming conventions, styling rules (Tailwind, shadcn/ui), architecture rules ("Route API calls through a service layer"), testing requirements, brand voice, and project-specific context (database schema, user personas, domain terminology) [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07]. When sending a message, Lovable reads: project knowledge + workspace knowledge + project code + integration knowledge from connected services + instruction files (AGENTS.md / CLAUDE.md) [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07]. If project and workspace knowledge conflict, Lovable is "encouraged to prioritize" project knowledge [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].

## 11. Search

In-editor search is via the **command palette** (`Cmd+K` / `Ctrl+K`) for projects, folders, and settings [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. Within code, the **Code** tab provides a code editor with file browsing, search, line-referencing in chat (e.g., `@src/components/UserProfile.tsx` adds file as reference) [Source: https://docs.lovable.dev/features/code-mode.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. Cross-project referencing lets users `@`-mention another project in the same workspace to reuse code, files, assets, or chat history from it (read-only, respects workspace permissions) [Source: https://docs.lovable.dev/features/cross-project-referencing.md, accessed 2026-08-07]. The agent itself can perform web searches (surfaced as activity cards) [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].

## 12. Execution

Build mode executes "end to end" with these visible steps: current step being executed, files being modified, tools being used (search, web fetch, image generation), progress through multi-step implementations [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07]. Available tools include browser testing (real browser in virtual environment, "clicking buttons, filling forms, testing flows, and checking behavior across screen sizes"), frontend tests, edge function verification [Source: https://docs.lovable.dev/features/browser-testing.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07]. Build errors trigger a **Try to fix** button on the activity card — "Fixing errors is free within our fair use policy" — but if used heavily, further fixes run as normal chat messages and are charged [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. There is no user-visible terminal/HMR in Lovable (preview is server-rendered cloud-side, not a WebContainer), so the user sees only the live preview updating [Source: https://docs.lovable.dev/features/projects/preview.md, accessed 2026-08-07]. Stop button halts the current task; stopped requests are charged based on work completed [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].

## 13. Artifacts

Lovable's artifact surface:
- **Live preview** — interactive, supports phone/tablet/desktop sizes, full preview link sharing [Source: https://docs.lovable.dev/features/projects/preview.md, accessed 2026-08-07].
- **Code** — Code tab with read (free) and edit (paid) modes, line-referencing in chat, codebase download [Source: https://docs.lovable.dev/features/code-mode.md, accessed 2026-08-07].
- **Visual Edits → Preview toolbar** — the older "Visual edits" experience was **replaced** by a floating preview toolbar with four modes: Select elements (`S`), Edit text inline (`T`), Draw annotation (`D`), Add comment (`C`) [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07]. Inline text edits are free up to 100/day per user, then use credits; other toolbar actions consume credits [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- **Edit History / Version history** — every change auto-saved as a version; panel has **History** and **Bookmarks** tabs; each version supports: Open preview in new tab, View code changes (diff), Go to message in chat, Revert, Bookmark toggle; "Published" badge marks the live version [Source: https://docs.lovable.dev/features/projects/history.md, accessed 2026-08-07].
- **Fork → Remix** — creates an independent copy; **Public remixing** toggle in Project settings → Sharing (off by default; not available in Enterprise) controls whether anyone with the link can copy the latest version [Source: https://docs.lovable.dev/features/projects/remix.md, accessed 2026-08-07]. Remix copies: code, database structure (not data), optionally chat history and custom knowledge. Does NOT copy: database data, version history, secrets, custom domains, publish state, collaborators, service connections [Source: https://docs.lovable.dev/features/projects/remix.md, accessed 2026-08-07]. "Remix progress tracking" appears in changelog [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- **Plan Mode** — see §8/§24.

## 14. Keyboard UX

Documented shortcuts:
- `Cmd+K` / `Ctrl+K` — open command palette anywhere in editor [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
- `Cmd+B` / `Ctrl+B` — close / restore the chat sidebar [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
- `Option+V` / `Alt+V` — start/stop microphone dictation [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- `Option+P` / `Alt+P` — toggle Build/Plan mode [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- In preview toolbar: `S` = Select elements, `T` = Edit text inline, `D` = Draw annotation, `C` = Add comment [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- `Cmd`/`Ctrl`+click — add additional elements to current selection in Select mode [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- Desktop app 1.4.0 (July 24, 2026): `Cmd`/`Ctrl`+click project = open in background tab; `Cmd`/`Ctrl`+Shift+click = open in focused tab [Source: https://lovable.dev/changelog, accessed 2026-08-07].

## 15. Motion (streaming card motion)

The activity cards "expand" to reveal detail (no animated-transition language in docs) [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. Question cards animate question-by-question (user moves between questions, changes earlier answers) [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. Design guidance (§17) offers "three lightweight design directions" the user picks from before building — implying preview re-renders, but the docs do not specify transition timing [Source: https://docs.lovable.dev/features/design-guidance.md, accessed 2026-08-07]. **The docs do not describe explicit streaming card motion design** (e.g., typewriter streaming, slide-in transitions) — evidence gap. The Cerebras partnership announcement (Aug 5, 2026) targets "dramatically reduced response times by 2027, so you spend less time waiting" — implying current latency is the primary perceived-motion bottleneck [Source: https://lovable.dev/blog, accessed 2026-08-07].

## 16. Animation

Docs do not document animation specifics (durations, easing, micro-interactions). The preview toolbar snaps to corners and "bottom-center default position" when dragged — implying magnetic/snap behavior [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07]. Draw annotation mode recognizes rough shapes (lines, arrows, rectangles, circles, ovals) and "cleans them up automatically" [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07]. The "Plan mode" send button "turns blue" when active (mode-state visual cue) [Source: https://lovable.dev/changelog, accessed 2026-08-07]. **Evidence gap:** no public docs specify easing curves, transition durations, or skeleton/loading shimmer patterns.

## 17. Visual Hierarchy

The editor's visual hierarchy (top-bar → project toolbar tabs → preview/chat split → floating preview toolbar) is described structurally, not visually [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07]. The **preview toolbar** is the visual focal point: "starts docked at the bottom center of the preview"; can be minimized to "a small tab on the edge of the preview" or hidden entirely [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07]. Design guidance offers **three preview variations** before Lovable builds, "so you can compare different layouts, typography, colors, spacing, and overall visual tone before choosing one" [Source: https://docs.lovable.dev/features/design-guidance.md, accessed 2026-08-07]. Plan mode "Plan view" opens as a "dedicated Plan view" that can be opened "in full screen to review the entire approach" [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07]. Light/Dark editor themes available via **Appearance** submenu [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].

## 18. Progressive Disclosure

Strong pattern. Examples:
- Activity cards collapsed by default; expand to inspect [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- "More options" menu on a response reveals Copy message link / Preview / Worked time / Credits used [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- "More" tab in project toolbar hides Analytics, Cloud, Agent integrations, Payments, Connectors, Security, SEO & AI search, Sensitive data — "What you see in the More menu depends on your project and plan: sections tied to a feature appear once you use it" [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
- Plan view opens full screen only when there's a plan to review [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- Preview toolbar can be hidden completely until needed [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- Suggestions from Lovable appear "as clickable chips near the chat input" after a response — visible but ignorable; can be turned off in account settings [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].

## 19. Accessibility

Limited explicit accessibility documentation. Accessible-adjacent features:
- Keyboard shortcuts across the editor (§14) [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
- Light/Dark editor themes [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
- Preview toolbar **Auto** theme "adapts to what's behind it as you scroll, so it stays readable against any background" [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- **SEO & AI search** tool surfaces accessibility issues (alongside metadata, indexing) — implies Lovable auto-checks for some a11y issues in generated apps [Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
- Browser testing "checks behavior across screen sizes" — implies cross-viewport validation [Source: https://docs.lovable.dev/features/browser-testing.md, accessed 2026-08-07].
**Evidence gap:** no published VPAT/WCAG conformance statement, no documented screen-reader behavior for the chat activity cards or question cards.

## 20. Performance Perception

**Cloud-side latency model.** Lovable's agent runs on Lovable's servers, not in the browser — docs FAQ confirm: "Your request runs on Lovable's servers, not in your browser, so you can close the tab and come back later to find the finished result in chat" [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07]. Latency management strategies:
- Visible progress: activity cards stream tasks step-by-step (current step, files modified, tools used) [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].
- Queue + continue-working UX: user can keep typing prompts while Lovable works; queued messages visible above the input [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Desktop browser notifications (opt-in): "may offer to enable browser notifications so you know when it finishes a task or needs your input" [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Cerebras partnership (Aug 5, 2026) explicitly targeting reduced response times "by 2027" — evidence that current latency is a recognized bottleneck [Source: https://lovable.dev/blog, accessed 2026-08-07].
- "Routing Billions of Tokens per Minute" blog (March 2026) describes "a robust LLM provider load balancer to handle billions of tokens per minute while preserving prompt caching and preventing rate limit exhaustion" — infra-level mitigation [Source: https://lovable.dev/blog, accessed 2026-08-07].

## 21. Trust

**Sandbox & isolation:** Built-in backend (Cloud) provides isolation per project; database, auth, storage, edge functions, secrets all live inside Lovable Cloud [Source: https://docs.lovable.dev/features/cloud.md, accessed 2026-08-07]. Build secrets stored at workspace level (encrypted env vars injected at build time, e.g., npm tokens for private packages) [Source: https://docs.lovable.dev/features/build-secrets.md, accessed 2026-08-07]. Leaked API keys in public GitHub repos auto-revoked (July 25, 2026) — "GitHub detects the key and notifies Lovable, and the key stops working right away" [Source: https://lovable.dev/changelog, accessed 2026-08-07]. First AI coding agent platform to earn **AIUC-1 certification** (July 22, 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07]. Trust & Safety reports via structured forms at `lovable.dev/abuse` [Source: https://lovable.dev/changelog, accessed 2026-08-07]. Sensitive workspace changes (member invite/role change/ownership transfer in unrecognized contexts) trigger **Verify it's you** step (password or emailed code) [Source: https://lovable.dev/changelog, accessed 2026-08-07].

**Credit system (DETAILED):**
- Credits are "units Lovable uses to measure and pay for usage across your workspace" — "Credits let you build apps, run deployed apps, and power AI features from one balance" [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- **Build mode pricing is usage-based**: cost varies by task complexity (files modified, logic complexity, codebase exploration, tools used) [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07; Source: https://lovable.dev/pricing, accessed 2026-08-07].
- **Plan mode pricing**: "Every message in Plan mode deducts one credit" [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- Example per-message costs (Build mode): "Make the button gray" = 0.50 credits; "Remove the footer" = 0.90; "Add authentication with sign up and login" = 1.20; "Build me a landing page, use images" (3 generated images, theme, 5 sections) = 1.70 [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- Free plan: 5 build credits/day (up to 30/month) + 20 Cloud credits/month + 4 AI-feature credits for in-app AI [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- Paid plans add credit balance + daily 5 build credits + 20 Cloud credits/month [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- Expiry: monthly plan credits expire 2 months after issue; annual expire 1 month after annual period ends; top-up credits last 12 months; daily build credit grants expire at end of each day (don't roll over) [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- Credits non-refundable, not redeemable for cash [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- "Try to fix" on build errors is **free within fair use policy**; beyond that, charged as normal chat messages [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Inline text edits (preview toolbar `T` mode): free up to 100/day per user, then use credits [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- Business/Enterprise workspace data excluded from model training by default; Free/Pro users can opt out via Account settings → Privacy (effective September 9, 2026) [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- Billing simplification announced June 13, 2026 — "one credit balance for building and running your apps, plus a clearer billing dashboard" [Source: https://lovable.dev/blog, accessed 2026-08-07].

## 22. Explainability

- Activity cards per action (file edits, commands, web searches, browser tests, subagent delegations) are expandable to inspect details [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- After response, action summary + "what changed" is provided [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Each version in history shows **View code changes** (diff of files/lines changed) and **Go to message in chat** (jump to conversation moment that produced the version) [Source: https://docs.lovable.dev/features/projects/history.md, accessed 2026-08-07].
- Per-message cost shown in "Credits used" in More options menu [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Plan mode creates a structured plan document (high-level overview, key decisions/assumptions/constraints, components/data models/APIs, step-by-step sequencing, optional diagrams) that is "fully editable as markdown before approval" [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- Subagents return findings to main agent (read-only) — visible to user via activity card [Source: https://docs.lovable.dev/features/subagents.md, accessed 2026-08-07].

## 23. Long Session Experience

- **Prompt queue** lets user queue messages while Lovable works — up to **50× repeat** of a queued prompt; pause/resume entire queue; reorder, edit, copy, remove individual prompts [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07; Source: https://lovable.dev/changelog, accessed 2026-08-07].
- Long-session degradation admitted in Knowledge docs: "in very long conversations with a lot of context, instructions may not always be followed consistently" [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **Cross-project referencing** enables reuse across projects in workspace (read-only, respects permissions) — strategy for avoiding long-context degradation by spawning fresh projects [Source: https://docs.lovable.dev/features/cross-project-referencing.md, accessed 2026-08-07].
- **Remix (fork)** creates independent copy with chat history optionally preserved — explicit forking strategy for long chats [Source: https://docs.lovable.dev/features/projects/remix.md, accessed 2026-08-07].
- **Edit message + Revert and resend**: hover over own past message → Edit message → "Revert and resend" reverts project to state before that message and reruns the new version [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Browser notifications (desktop) alert when Lovable finishes or needs input [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- Plan mode + Plan view split out reasoning from execution — prevents context bloat [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- Blog post "$85,000 in tokens later" (July 3, 2026) describes scaling agentic coding — engineer notes Plan mode PRs and "agent swarms shipping 150+ PRs a week" [Source: https://lovable.dev/blog, accessed 2026-08-07].

## 24. Power User Features

- **Visual Edits → Preview toolbar** (replaced older Visual edits panel) — 4 modes (Select/S/T/D/C) [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- **Prompt Queue with 50× repeat** — batch + automation [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].
- **Edit History / Version history** with bookmarks, code-change diffs, "Go to message in chat" [Source: https://docs.lovable.dev/features/projects/history.md, accessed 2026-08-07].
- **Plan Mode** — markdown-editable plan, saved to `.lovable/plan.md`, accessible from chat history [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- **Scheduled tasks (Jobs)** — Lovable Cloud scheduled jobs (June 24, 2026); **Project monitoring** (Pro+) schedules checks for bugs/errors and posts briefs in chat [Source: https://lovable.dev/changelog, accessed 2026-08-07; Source: https://docs.lovable.dev/features/project-monitoring.md, accessed 2026-08-07].
- **Skills** (May 18, 2026) — markdown files of reusable instructions; loaded on-demand [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07; Source: https://lovable.dev/blog, accessed 2026-08-07].
- **Subagents** (May 27, 2026) — parallel research/exploration [Source: https://docs.lovable.dev/features/subagents.md, accessed 2026-08-07].
- **Cross-project referencing** — read-only reuse across workspace projects [Source: https://docs.lovable.dev/features/cross-project-referencing.md, accessed 2026-08-07].
- **Design systems** (Enterprise) — reusable React component libraries, styling guidelines, setup across projects [Source: https://docs.lovable.dev/features/design-systems.md, accessed 2026-08-07].
- **Design templates** (Business/Enterprise) — reuse Lovable projects as templates that copy full codebase [Source: https://docs.lovable.dev/features/business/design-templates.md, accessed 2026-08-07].
- **Design guidance** — three preview variations + guided design questions before building [Source: https://docs.lovable.dev/features/design-guidance.md, accessed 2026-08-07].
- **Workspace Knowledge** + **Project Knowledge** (10k chars each) + AGENTS.md/CLAUDE.md support [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **MCP server publishing** — turn a published Lovable app into an MCP server for ChatGPT, Claude, etc. (your Lovable app now works inside ChatGPT and Claude — July 15, 2026 announcement) [Source: https://lovable.dev/blog, accessed 2026-08-07; Source: https://docs.lovable.dev/features/agent-integrations.md, accessed 2026-08-07].
- **Connectors** (chat-side + app-side) — Amazon Redshift, Microsoft Fabric, Google Analytics, Xero, Pipedrive (one-click), PostHog, Shopify (list picker), Google Workspace, Gemini Enterprise [Source: https://lovable.dev/changelog, accessed 2026-08-07; Source: https://lovable.dev/blog, accessed 2026-08-07].
- **Lovable Desktop** (1.4.0 July 24, 2026) — background tabs (Cmd/Ctrl+click) [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- **Mobile app** (iOS/Android, April 27, 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07].
- **TanStack Start migration** (July 28, 2026) — upgrade older React+Vite projects to SSR template [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- **Security scanning** — Wiz findings (May 13, 2026), Aikido pentesting partnership (March 24, 2026), dependency scan false-alarm reduction (July 29, 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07; Source: https://lovable.dev/changelog, accessed 2026-08-07].

## 25. Developer Experience

- **GitHub integration** — two-way sync between Lovable project and GitHub repo (changes flow in both directions) [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- **GitLab integration** — same two-way sync [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- **Code editor** (Code tab) — read free; edit on paid plans; line referencing in chat (`@src/...`); codebase download [Source: https://docs.lovable.dev/features/code-mode.md, accessed 2026-08-07].
- **Codebase export** — download full codebase (zip) [Source: https://docs.lovable.dev/features/code-mode.md, accessed 2026-08-07].
- **AGENTS.md / CLAUDE.md** support — root-level instruction files in repo auto-read [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **MCP server** for the published app (consumable by ChatGPT/Claude) [Source: https://docs.lovable.dev/features/agent-integrations.md, accessed 2026-08-07].
- **Stack migration** — TanStack Start upgrade in-place [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- **Edge functions**, **server functions**, **scheduled jobs**, **logs** (functions/database/auth/storage) [Source: https://docs.lovable.dev/features/edge-functions.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/jobs.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/logs.md, accessed 2026-08-07].
- **Custom domains**, **custom emails** (DKIM/SPF/DMARC auto-setup), **branded workspace URLs** [Source: https://docs.lovable.dev/features/custom-domain.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/custom-emails.md, accessed 2026-08-07].
- **API**: Workspace API keys revokable; auto-revoke on public GitHub leak (July 25, 2026) [Source: https://lovable.dev/changelog, accessed 2026-08-07]. No public REST API documentation found in llms.txt — evidence gap.

## 26. Biggest Strengths (with evidence)

1. **Two-mode Plan/Build split with persistent plan artifact** — Plan mode → `.lovable/plan.md` saved on approval; previous plans accessible from chat history [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07]. This is a clean, file-system-visible memory design — superior to chat-only memory.
2. **Strong progressive disclosure pattern** — activity cards, More menu, preview toolbar hide/show, suggestions chips toggleable off [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07; Source: https://docs.lovable.dev/features/projects/editor.md, accessed 2026-08-07].
3. **Prompt queue with 50× repeat** — unique batch/automation primitive not seen in other products surveyed; "automate repetitive workflows" [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].
4. **Full-stack built-in backend (Cloud)** — database, auth, storage, edge functions, scheduled jobs, AI, payments (Paddle/Stripe), emails all in one workspace — eliminates "stitch together platforms" problem [Source: https://docs.lovable.dev/features/cloud.md, accessed 2026-08-07; Source: https://lovable.dev/blog, accessed 2026-08-07].
5. **AIUC-1 certification** — first AI coding agent platform to earn industry security/safety/reliability standard for AI agents (July 22, 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07]. Auto-revocation of leaked API keys (July 25, 2026) is a concrete trust-building feature [Source: https://lovable.dev/changelog, accessed 2026-08-07].
6. **Subagents + Vent tool** — agent can spawn read-only parallel researchers (May 27, 2026) and send feedback to its creators (May 21, 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07] — a self-improvement loop rare among competitors.
7. **Mobile + Desktop apps** — full editor on iOS/Android (April 2026); desktop 1.4.0 with background tabs (July 2026) [Source: https://lovable.dev/blog, accessed 2026-08-07; Source: https://lovable.dev/changelog, accessed 2026-08-07].
8. **Per-message cost transparency** — "Credits used" surfaced in More options menu on each response; pricing table published (button gray = 0.5 credits, full landing page = 1.7 credits) [Source: https://lovable.dev/pricing, accessed 2026-08-07; Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
9. **Try-to-fix is free within fair use** — explicit free error-fixing safety net (within fair use) [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].

## 27. Biggest Weaknesses (with evidence)

1. **Cloud-side latency acknowledged as bottleneck** — Cerebras partnership (Aug 5, 2026) explicitly targets "dramatically reduced response times by 2027" — current latency is the top perceived-motion problem [Source: https://lovable.dev/blog, accessed 2026-08-07]. No WebContainer-like local-first execution.
2. **Long-context degradation admitted** — "in very long conversations with a lot of context, instructions may not always be followed consistently" [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
3. **Credits expire aggressively** — daily build credit grants expire at end of day (no roll-over); monthly plan credits expire 2 months after issue; non-refundable [Source: https://lovable.dev/pricing, accessed 2026-08-07]. No-rollover daily grants are particularly user-hostile.
4. **Plan mode charges per message** — "Every message in Plan mode deducts one credit" [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07]. Users are penalized for thinking before building.
5. **Stopped requests still charged** — "Stopped requests are charged based on the work completed so far" [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].
6. **Free plan token grants low** — 5 build credits/day (30/month) + 20 Cloud credits/month [Source: https://lovable.dev/pricing, accessed 2026-08-07]. Inadequate for sustained exploration.
7. **Data training opt-out delayed** — opt-out available starting September 9, 2026; until then, Free/Pro data may be used for AI model training [Source: https://lovable.dev/changelog, accessed 2026-08-07].
8. **Editor not inspectable without account** — homepage `lovable.dev` is Cloudflare-protected ("Just a moment…"); `/help` and `/features` returned 404; signing-in required to inspect the SPA — observability gap for outside researchers [Observed: curl fetches on 2026-08-07].
9. **No published keyboard-shortcut cheat sheet** — shortcuts scattered across multiple docs pages; no consolidated reference. Evidence gap.
10. **No public REST API docs** — llms.txt docs index (45KB) lists no API reference section; only MCP server publishing mentioned. Evidence gap.
11. **April 2026 incident** — "Our response to the April 2026 incident" blog post (April 22, 2026) indicates a notable production incident; details not retrieved but implies service-stability risk [Source: https://lovable.dev/blog, accessed 2026-08-07].
12. **Token-heavy blog "$85,000 in tokens later"** — implies even internal engineers find cost management hard at scale [Source: https://lovable.dev/blog, accessed 2026-08-07].

## 28. What should MiMo learn?

- **`.lovable/plan.md` artifact pattern** — persisting the latest approved plan as a project file (not just chat memory) gives a file-system-visible, version-controllable, human-editable memory layer [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- **Two-mode split (Plan / Build)** with explicit "Plan mode never modifies your code" guarantee and clear cost framing [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- **Prompt queue with up-to-50× repeat** — first-class primitive for batch/automation; visible above input; reorderable; pausable [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].
- **Activity cards as primary agent-visualization surface** — inline in chat, expandable, with subagent delegations visible [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- **Question card with up-to-4 questions + skip individually or all + draft persistence on refresh** — graceful disambiguation UX [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- **Preview toolbar (Select/S/T/D/C modes)** — replaces older Visual edits panel; dock-drag-minimize-hide; Auto theme adapts to background [Source: https://docs.lovable.dev/features/preview-toolbar.md, accessed 2026-08-07].
- **Version history with diff ("View code changes") + "Go to message in chat"** — connects code state to conversation moment [Source: https://docs.lovable.dev/features/projects/history.md, accessed 2026-08-07].
- **Try-to-fix free within fair use** — explicit safety net against error-spend anxiety [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07].
- **Per-message credit transparency** — "Credits used" visible per response; published cost table [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- **Workspace Knowledge + Project Knowledge (10k chars each) + AGENTS.md/CLAUDE.md auto-read** — three-layer memory with clear priority rules (project over workspace) [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **Auto-revocation of leaked API keys** + Verify-it's-you flow on suspicious workspace changes [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- **Subagents (read-only, parallel, temporary)** — explicit separation of "researcher" role from "executor" role [Source: https://docs.lovable.dev/features/subagents.md, accessed 2026-08-07].
- **MCP server publishing of generated apps** — generated app becomes a tool other AI assistants can call [Source: https://docs.lovable.dev/features/agent-integrations.md, accessed 2026-08-07].

## 29. What should MiMo reject?

- **Charging per Plan-mode message** — penalizes the user for thinking before building; encourages rushed prompts that consume more Build credits later [Source: https://docs.lovable.dev/features/plan-mode.md, accessed 2026-08-07].
- **Credits expiring at end of day with no roll-over** for daily build grants [Source: https://lovable.dev/pricing, accessed 2026-08-07].
- **Cloud-only execution without local-first fallback** — `lovable.dev` homepage is behind Cloudflare; the agent runs on Lovable's servers, so users can't run offline or inspect execution locally [Source: https://docs.lovable.dev/features/projects/chat.md, accessed 2026-08-07; Observed: 2026-08-07].
- **Long-context degradation hand-waved** — "may not always be followed consistently" without a quantified remediation [Source: https://docs.lovable.dev/features/knowledge.md, accessed 2026-08-07].
- **Stopped requests still charged** for work completed — friction on course-correction [Source: https://docs.lovable.dev/features/agent-mode.md, accessed 2026-08-07].
- **Default-on data collection for Free/Pro training** (until September 9, 2026 opt-out activation) — user-unfriendly default [Source: https://lovable.dev/changelog, accessed 2026-08-07].
- **No published keyboard shortcut cheat sheet** — scattered across docs pages [Observed in docs, 2026-08-07].
- **No public REST API documentation** — llms.txt has no API reference section [Observed in docs, 2026-08-07].
- **Remix does not copy version history** — fresh History panel means forking loses the audit trail [Source: https://docs.lovable.dev/features/projects/remix.md, accessed 2026-08-07].

## 30. Confidence Score

**Confidence: 78/100**

Reasoning:
- (+) Official docs at `docs.lovable.dev` are fully extractable as Mintlify `.md` files — every claim above has a primary citation. ~30 docs pages read across plan-mode, agent-mode, chat, history, editor, preview-toolbar, knowledge, code-mode, remix, overview, collaboration, cross-project-referencing, design-guidance, subagents, mobile-app, project-monitoring, skills, testing, security-center, design-templates, agent-integrations, credits-and-usage, seo-aeo.
- (+) Pricing page is static HTML with a complete cost table; examples per-message credit cost; full expiry rules.
- (+) Changelog goes back to December 3, 2024 with detailed entries (e.g., Prompt queue release, Subagents May 27 2026, Vent tool May 21 2026, Mobile app April 27 2026, Cerebras partnership Aug 5 2026).
- (+) Blog index lists ~60 posts with author attribution; useful for philosophy + UX intent.
- (−) **Product NOT actually used** in a browser — homepage behind Cloudflare; signed-in SPA not inspected. Empty state, onboarding survey, first-prompt flow, mobile vs desktop gestures, error/loading shimmer states — all inferred from docs, not observed.
- (−) Animation/motion specifics (durations, easing, transitions) — no public documentation; evidence gap.
- (−) Keyboard-shortcut cheat sheet not consolidated — scattered across docs pages; some shortcuts (e.g., search within Code tab) not documented.
- (−) April 2026 incident details not retrieved — only the blog title was indexed.
- (−) REST API documentation status unverified (no API reference section in llms.txt suggests no public REST API for builders).
- (−) `z-ai function web_search` returned 429 even after 30s retry; product-specific search engine evidence (Reddit/Trustpilot complaints) not gathered.
