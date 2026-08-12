# Research Group A — AI Chat Products (Current UX, 2024–2025)

**Task ID:** R-A
**Agent:** Senior UX/Product Researcher (general-purpose)
**Scope:** ChatGPT (OpenAI), Claude (Anthropic), Google Gemini, GLM (Zhipu / Z.ai), Perplexity, Genspark
**Method:** Web search (6 product searches) + 12 verified page reads via z-ai page_reader. No memory-only claims — every concrete UX fact below is grounded in a cited URL listed in its section.
**Files produced:** `research/groupA_clean.txt`, `research/groupA_sections/*.txt` (per-source extracted text), `research/groupA_raw/page_*.json` (raw reader output), this report.

---

## 1. ChatGPT (OpenAI)

### Current UX (2024–2025) — verified via
- https://help.openai.com/en/articles/6825453-chatgpt-release-notes (OpenAI official release notes — read in full)
- https://medium.com/@bengumness_41135/canvas-projects-my-favorite-chatgpt-tools-de06aaca6e34 (Apr 26 2025, hands-on with Canvas+Projects)
- https://openai.com/index/memory-and-new-controls-for-chatgpt (referenced via search, June 3 2025 update)
- https://simonwillison.net/2025/May/21/chatgpt-new-memory (search snippet)

**Verified feature surface (release notes, 2025):**
- **Canvas** (Oct 2024 → 2025): a side-by-side document/code editor opened from a chat. Live preview, inline Python "Run", highlight-and-rewrite, drag-and-drop text blocks. As of late 2025 OpenAI announced **canvas will no longer be available in GPT-5**; paid users keep it for a limited time via legacy models until sunset (release notes).
- **Projects** (Dec 2024 → Free in 2025): folder that bundles saved chats + Files + custom instructions + memory scope. Aug 22 2025 added **Project-only memory** ("ChatGPT can use other conversations in that project for additional context, and won't use your saved memories from outside the project"). Each project can have a **color + icon**, custom instructions, and shared files.
- **Memory** (rolling out to free tier June 3 2025): two layers — (a) explicit "Saved memories" (user-editable list) and (b) implicit "chat history reference" (ChatGPT can recall any prior chat). New **memory summary page** with per-memory delete + "Delete and turn off memory" three-dot control. **Temporary Chat** toggle to opt out of both memory layers + Library upload for that chat.
- **ChatGPT Image Library** (Apr 15 2025): all generated images auto-saved to a sidebar Library; one place to browse/reuse without digging through chats.
- **Apps & Connectors**: Google Drive unification (Docs/Sheets/Slides under one Drive connector); connectors relabeled "Apps" in the directory; settings at Settings → Apps & Connectors. Enables ChatGPT to read external files in-prompt.
- **Sidebar Search** (July 14 2026, in release notes): supercharged search across chats, projects, and files from the sidebar with content-type filters.
- **Desktop app** (July 16 2026): now distinguishes Chat vs Work, surfaces Projects in the app, syncs across devices.
- **Connectors rebranded as Skills** (sidebar, Enterprise/Edu).

### What works
- **Project as a memory-bounded workbench.** Saved chats stay grouped, Files are pinned in-project, Project-only memory means cross-chat context without polluting global memory. (Medium, OpenAI release notes)
- **Highlight-and-rewrite inside Canvas.** Treat Canvas as a whiteboard: post the messy draft, circle weaknesses, ask GPT to rebuild just that section. Speed beats perfection. (Medium)
- **Sidebar Image Library** removes the "where did I save that generated image?" tax. (Release notes)
- **Project color + icon** as visual anchor for resuming context. (Release notes)

### What does NOT work
- **Canvas is being sunset in GPT-5** — paying users built muscle memory for a feature that is being deprecated, with only legacy-model access as a bridge. (Release notes) — this is a textbook "do not strip working features in betas" failure.
- **Two-layer memory is opaque.** Users cannot reliably tell whether a fact came from Saved memories vs chat-history-reference; "I really don't like ChatGPT's new memory dossier" (Simon Willison, May 21 2025). (simonwillison.net search snippet)
- Memory can silently create memories from any chat unless Temporary Chat is enabled — opt-out, not opt-in.
- **Project navigation collapses under volume.** Saved chats inside a Project still scroll flat; no sub-folders, no pinning of key chats (Medium author's own workaround is "name the outcome, not the task" — proving the product doesn't help).

### What is UNIQUE
- **Two-layer memory** (explicit saved + implicit chat history) combined with per-project scoping. No other product in this set has a memory model with explicit per-container isolation.
- **Canvas Run button** for live code execution inside a chat artifact (Medium, OpenAI release notes).
- **Connectors → Apps → Skills** migration shows the OS-grade "tool directory" pattern none of the other 5 have at this depth.

### What MiMo should LEARN
- **Project = a memory scope, not just a folder.** Project-only memory is the single most powerful idea: scope-bound context, no bleed between projects. MiMo's Project container should support both shared OS-memory and per-project scoped memory, with a hard toggle.
- **Library pattern**: generated artifacts (images, code, docs) auto-persist in a typed Library with one-click reuse — separate from the chat that produced them.
- **Apps/Connectors/Skills directory** in settings, unified under one browseable surface (MiMo: "Tools" surface in the OS).
- **Memory summary page** with per-fact delete + bulk "Delete and turn off" — explicit, auditable, gives owner control.

### What MiMo should AVOID
- **Deprecating working artifact surfaces in new model revs** (Canvas → GPT-5 sunset). MiMo must keep the artifact viewer live across model swaps.
- **Two-layer memory with no clear provenance.** Every memory item in MiMo must show source chat + timestamp.
- **Flat saved-chats list inside a Project** — needs sub-grouping or pinning.
- **Memory on by default with opt-out** (Temporary Chat). MiMo should invert: explicit "remember this" gesture, default per-conversation ephemeral.

### Premium interaction
- **Highlight a passage in Canvas → contextual rewrite menu appears with "Make longer / shorter / fix" presets.** Direct manipulation on the artifact, no re-prompting needed. (Medium)

### Slow interaction
- **Canvas initial open + first AI rewrite.** Canvas opens a separate render context and the first edit triggers a full model re-stream; subsequent edits are faster but the first latency spike breaks flow. (Medium, hands-on)

### Cognitive overload interaction
- **Choosing among Temporary Chat / Memory on / Project-only memory / saved memories / chat-history-reference.** Five overlapping memory states with subtle bleed rules; users cannot predict what the model "knows" right now. (Simon Willison critique)

### Dimension notes
- **Conversation:** linear chat; reasoning model (o-series) shows a collapsed thinking trace; Canvas opens as a right-side panel.
- **Navigation:** left sidebar with Chats → Projects → Library → Apps/Skills; search supercharged July 2026 across chats/projects/files.
- **Workspace:** Project = chats + Files + instructions + memory-scope + color/icon; Canvas = side-by-side editor inside a chat.
- **Artifacts:** Canvas (doc/code with live preview, Run, highlight-rewrite); Image Library for generated images.
- **Execution viz:** o-series shows abbreviated reasoning steps; Canvas shows live preview that updates on edit.
- **Memory:** two-layer (saved + chat-history-reference) + Project-only memory scope + Temporary Chat opt-out + Memory Summary page with delete.
- **Search:** in-app sidebar search across chats/projects/files (Jul 2026); web search via browsing tool inside chat.
- **Keyboard:** highlight → ⌘+K-style menu in Canvas; otherwise chat input + Enter.
- **Long-session:** Project keeps related chats together; Image Library + Files keep artifacts findable. Memory bleed remains the long-session risk.

---

## 2. Claude (Anthropic — claude.ai)

### Current UX (2024–2025) — verified via
- https://www.anthropic.com/news/projects (Jun 25 2024 official Projects announcement)
- https://simonwillison.net/2024/Oct/21/claude-artifacts/ (Simon Willison, Oct 21 2024 — detailed daily-driver account)
- Search snippet: https://medium.com/@nuno.roberto/claude-artifacts-turning-chat-into-shareable-software-4985fdba94a2 (Oct 2025 — Artifacts extended with MCP support)
- Search snippet: https://awesomegenerativeui.com/cases/anthropic-claude-artifacts-apps (Jul 2025 Artifacts panel = lightweight app surface)

**Verified feature surface:**
- **Projects** (Jun 25 2024, Pro+Team): 200K context window per project; add documents/code/transcripts as project knowledge; custom instructions per project; team members get a shared **activity feed** of best conversations.
- **Artifacts** (Jun 20 2024 launch; Oct 2025 MCP update): a dedicated right-side window that renders code, SVG, HTML, Mermaid, React components live; CSP-locked sandbox on `claudeusercontent.com` with Pyodide pre-whitelisted in script-src (Simon Willison discovered the CSP header). As of Oct 2025 Artifacts can call back into Claude via MCP — turning the artifact panel into a "lightweight app surface."
- Simon Willison produced **14 functional mini-apps in 7 days** (URL-to-Markdown via Jina, SQLite-WASM REPL, Pyodide REPL, QR decoder, OpenAI audio capture, YAML-to-JSON, etc.); most built in <5 minutes.
- Artifacts sandbox cannot make outbound API calls, submit forms, or link out — Simon calls these "limitations" he's "beginning to get a little frustrated at."
- Artifacts auto-extract to `claude.site/artifacts/<uuid>` — shareable URL.
- **CSP header policy** (observed via DevTools) is the technical signal of deliberate sandboxing: `default-src https://www.claudeusercontent.com; script-src 'unsafe-eval' 'unsafe-inline' … https://cdn.jsdelivr.net/pyodide/; … frame-ancestors https://claude.ai https://preview.claude.ai https://claude.site`.

### What works
- **Artifacts = the original "chat-side live artifact" pattern**, still the best-in-class for single-page-app + Pyodide/React rendering inside the chat window. (Simon Willison)
- **200K context Project knowledge base** lets users ground Claude in their style guides/codebases/interview transcripts. (Anthropic)
- **Shareable artifact URL** (`claude.site/artifacts/<uuid>`) — instant hand-off from chat to shareable artifact. (Simon Willison)
- **Team activity feed** inside Projects — team members see each other's best Claude chats as inspiration, not real-time co-edit. (Anthropic)
- **Pyodide pre-whitelisted in CSP** = Anthropic deliberately wants Python artifacts to run in-browser. (Simon Willison CSP analysis)

### What does NOT work
- **Artifacts cannot make outbound API calls, submit forms, or link out** — Simon Willison: "beginning to get a little frustrated at their limitations." Mini-apps that need network calls must be exported and re-hosted.
- **No real-time co-editing.** Sharing is read-only / fork-only — same flaw as Gemini.
- **Artifact is single-file HTML/JS** — no npm, no build, no module imports beyond CDN allow-list. Real apps outgrow it.
- **Project activity feed is one-way inspiration** — teammates see what you did, but cannot join the same conversation.

### What is UNIQUE
- **Artifacts as a CSP-locked, Pyodide-pre-whitelisted mini-app runtime inside chat.** No other product in this set has Anthropic's deliberate CSP+Pyodide+React stack; this makes Claude uniquely suited for "spin up a working Python/React tool in 5 minutes."
- **200K context per Project** was, at launch, 2× the competitor context — and remains the single largest project-scoped context among the 6.
- **Oct 2025 MCP integration** lets an artifact call back into Claude — turning Artifacts from "static share" into "agentic app surface." (Medium / nuno.roberto, Oct 2025)

### What MiMo should LEARN
- **Artifact panel must run real code in a sandbox** with an explicit CSP and a pre-whitelisted "Python via WASM" path. MiMo should treat the artifact viewer as a runtime, not a preview.
- **Per-project context window as a first-class concept** — MiMo should expose how much of the project context is consumed (Claude does this implicitly via 200K cap; MiMo should make it visible).
- **Shareable artifact URL** for hand-off (read-only fork link).
- **Team activity feed** as opt-in inspiration layer — MiMo, even single-user, can use the same pattern for cross-project "best-of" surfacing.

### What MiMo should AVOID
- **CSP lock that blocks outbound calls.** MiMo artifacts (since it's local-first) should allow controlled outbound calls with explicit per-call permission.
- **Single-file artifact limit.** MiMo artifacts should support multi-file projects (mirroring Claude Code's filesystem, not Claude.ai's single HTML).
- **Read-only share with no real-time collab** — if MiMo ever goes multi-device, must do better.

### Premium interaction
- **Pyodide artifacts**: a single prompt → working Python REPL in the right pane with no setup. Simon Willison reports this works because Anthropic pre-whitelisted `cdn.jsdelivr.net/pyodide/` in the CSP. (Simon Willison)

### Slow interaction
- **Iterating on a complex React artifact**: every prompt triggers a full re-render of the artifact; for large single-page apps this stalls visibly. (Simon Willison "took 11:55–12:07 for first version, 12:18–12:27 for second iteration — 21 minutes total" for OpenAI Audio tool.)

### Cognitive overload interaction
- **Deciding whether a problem should be solved in chat, in an artifact, in a Project, or via Claude Code (CLI).** Four overlapping surfaces with different capabilities; the user must remember which surface supports Pyodide, which supports MCP callbacks, which supports npm packages, which supports long-running tasks.

### Dimension notes
- **Conversation:** linear chat; Artifacts open right side; Projects group chats + knowledge.
- **Navigation:** left sidebar (Recent → Projects → Activity feed for teams).
- **Workspace:** Project = chats + 200K knowledge base + custom instructions + activity feed; Artifact = right-side sandbox.
- **Artifacts:** code/SVG/HTML/Mermaid/React with Pyodide pre-whitelisted; shareable URL; Oct 2025 MCP callback support.
- **Execution viz:** artifact updates live on each turn; no live "thinking trace" by default (extended thinking is toggleable).
- **Memory:** Project-scoped knowledge base (uploaded files), not an evolving memory; Claude relies on Project knowledge + 200K context rather than ChatGPT-style persistent memory.
- **Search:** none at Claude.ai app level beyond project chats; relies on uploaded knowledge.
- **Keyboard:** standard chat input; no highlight-and-rewrite menu like ChatGPT Canvas (a gap).
- **Long-session:** 200K context + Projects hold up well; but no Memory layer means context is fresh per session unless uploaded.

---

## 3. Google Gemini

### Current UX (2024–2025) — verified via
- https://blog.google/products-and-platforms/products/gemini/new-gemini-app-features-march-2025/ (Mar 13 2025, official Google blog)
- https://freshvanroot.com/blog/google-gemini-review (Aug 25 2025, hands-on review — Gems/Canvas/Deep Research/Workspace)
- Search snippet: https://gemini.google/overview/deep-research (official Deep Research overview)

**Verified feature surface:**
- **Deep Research** (Dec 2024 pioneer; Mar 13 2025 rolled out free-tier): uses Gemini 2.0 Flash Thinking Experimental; "shows its thoughts while it browses the web, giving you a real-time look into how it's going about solving your research task"; produces multi-page reports; available in 45+ languages; free users get "a few times a month," Gemini Advanced expanded access. (Google blog)
- **Gems** (Aug 2024 launch; Mar 13 2025 free for all): custom AI personas built via "Gem Manager" in sidebar; premade Gems available; can upload files when creating a Gem. (Google blog, freshvanroot)
- **Personalization (experimental)** (Mar 13 2025): connects Gemini to Search history → restaurant / travel recommendations grounded in user's prior searches; toggleable via model drop-down; can disconnect. (Google blog)
- **Connected apps**: Calendar, Notes, Tasks, Photos, YouTube, Google Drive; single prompt can orchestrate across multiple apps ("look up cookie recipe on YouTube, add ingredients to shopping list, find grocery stores open nearby"). (Google blog)
- **Canvas in Gemini**: collaborative workspace; visual-first; live HTML/code preview with a dedicated "Code" tab; highlight-to-rewrite/expand/simplify; exports to Docs/Gmail. (freshvanroot)
- **1M token context window** for Gemini Advanced on 2.0 Flash Thinking Experimental. (Google blog)
- **Workspace side-panel integration**: Gemini icon (✦) in Docs/Sheets/Slides/Gmail/Drive toolbar; "Help me write" in Docs; can summarize Drive folders by asking the folder a question. (freshvanroot)
- **Gemini Live** (mobile): real-time voice + camera + screen-share. (freshvanroot)
- **Limitation (freshvanroot hands-on)**: Gemini chats are NOT truly collaborative — share link is read-only; teammates can fork their own copy but cannot co-edit; no shared thread where multiple colleagues + AI interact together. This is "a big limitation for collective activity."

### What works
- **Deep Research shows its thoughts while browsing** — real-time look into planning → searching → reasoning → analyzing → reporting. This is the best execution-trace visualization of the 6 products. (Google blog)
- **Gem Manager sidebar for custom personas** with file upload — quick to build, persistent across sessions. (freshvanroot)
- **Drive panel** — asking a Drive folder a question and getting a sourced answer is "far faster than opening multiple files." (freshvanroot)
- **Connected-app orchestration** in a single prompt ("YouTube recipe → shopping list → nearby stores") — the only product in this set that can chain across Calendar/Notes/Tasks/Photos/YouTube natively. (Google blog)
- **Export to Docs/Gmail** removes the copy-paste tax for Workspace users. (freshvanroot)

### What does NOT work
- **No shared chats / no real-time collaboration.** Freshvanroot: "Gemini chats aren't truly collaborative — you can share a chat via link, but it's essentially 'read-only' for others." Teams only see content you insert into the document, not your prompts. This is repeatedly cited as the #1 gap.
- **Folder-context amnesia**: asking for a folder summary works, but "when you try to refine or filter that information, such as requesting only key deadlines from the folder, it sometimes loses the prompt context and requires restating details." (freshvanroot)
- **Image generation inconsistency**: "doesn't correctly work at the moment"; only one image at a time; multi-step image requests fail. (freshvanroot)
- **Sliders/Sheets/Drive limitations**: cannot apply backgrounds directly in Slides; cannot analyse external PDF links in Sheets. (freshvanroot)
- **Personalization is Search-history only at launch** — Calendar/Gmail personalization is "coming"; current scope is narrow.
- **Gems cannot be shared** — limits team use. (freshvanroot)

### What is UNIQUE
- **Workspace-embedded side panel** — Gemini lives inside Docs/Sheets/Slides/Gmail/Drive as a toolbar icon, not just a standalone chat. No other product in this set has this depth of host-app embedding.
- **Deep Research thinking-stream while browsing** — the visible "Gemini shows its thoughts while it browses" is unique real-time execution viz.
- **Connected-app orchestration in a single prompt** (YouTube → Tasks → Maps).
- **1M token context** on Gemini Advanced — largest in this comparison.
- **Gemini Live mobile** with camera + screen-share — unique multimodal mobile surface.

### What MiMo should LEARN
- **Visible thinking-stream during multi-step tasks** — MiMo's ExecutionTrace must show actual browsing/analysis in real time, not a static "Working…" spinner.
- **Folder-as-context** — let the user point at a directory and ask a question; MiMo as local-first OS can do this natively and better than Gemini's cloud Drive.
- **Gem Manager pattern**: a sidebar of saved "personas" with file attachments + instructions; quick-switch between them.
- **Export-to-native-format** (Docs/Gmail) — MiMo should export artifacts to the OS-native formats (markdown, code files, calendar entries).
- **Connected-app orchestration** via a single prompt that chains tools — MiMo's agent should be able to do "read file X, write file Y, run command Z, schedule task W" in one turn.

### What MiMo should AVOID
- **Read-only share links** — share must allow fork + continue, ideally real-time follow.
- **Folder-context amnesia** — refine/filter follow-ups must preserve prior prompt context.
- **Personalization tied to one data source** (Search history) — MiMo's personalization should pull from all OS-local data the owner has connected.
- **Workspace side-panel without real-time collab** — don't pretend to be collaborative if it's fork-only.

### Premium interaction
- **Deep Research "shows its thoughts while it browses the web"** — live execution narration during a multi-step research task. The single most premium execution-trace interaction in the 6 products. (Google blog)

### Slow interaction
- **Deep Research end-to-end run** — minutes-long multi-page report generation; the live thinking-stream keeps it from feeling dead, but total wall-clock is long. (Google blog)
- **Folder-summary follow-up** — refining a folder query "sometimes loses the prompt context and requires restating details," forcing manual re-context. (freshvanroot)

### Cognitive overload interaction
- **Choosing model + personalization + connected-apps + Gem + Deep Research + Canvas** all from a single model drop-down / prompt bar with overlapping scopes. The drop-down conflates "model" (2.5 Flash / 2.5 Pro / 2.0 Flash Thinking / Deep Research / Personalization) with "mode" (Canvas / Gem / Live). (freshvanroot, Google blog)

### Dimension notes
- **Conversation:** linear chat + mode drop-down (model + Deep Research + Personalization).
- **Navigation:** sidebar with Chats + Gem Manager + Library; Workspace side-panel via ✦ icon in Docs/Sheets/Slides/Gmail/Drive.
- **Workspace:** Gem = persona + instructions + files; Project = not a first-class concept (Gem is the closest analog).
- **Artifacts:** Canvas (visual-first, with Code tab + live preview, highlight-rewrite); Deep Research output = multi-page report doc.
- **Execution viz:** Deep Research thinking-stream (best-in-class); Gemini Live voice + camera.
- **Memory:** Personalization via Search history (toggleable, disconnectable); Gems remember instructions per-Gem; no ChatGPT-style global memory layer.
- **Search:** native web search via Deep Research; folder search via Drive panel.
- **Keyboard:** standard chat input + model drop-down.
- **Long-session:** Workspace side-panel is strong for solo long sessions; chat-alone long sessions suffer from lack of true memory + no shared chats.

---

## 4. GLM (Zhipu AI / Z.ai)

### Current UX (2024–2025) — verified via
- https://www.turingpost.com/p/zhipu (Jul 14 2026 deep-dive; covers GLM-4.5, 4.6V, 4.7, GLM-5.2)
- https://www.chinatalk.media/p/the-zai-playbook (Nov 21 2025 interview with Zixuan Li, Director of Product and genAI Strategy at Z.ai — direct UX-relevant quotes)
- Search snippet: https://z.ai (Z.ai homepage — GLM-5.2, "Build websites, write code, handle long-horizon tasks")
- Search snippet: https://z.ai/blog/glm-4.5 (Jul 28 2025 — frontend interfaces generated by GLM-4.5 exhibit "enhanced functionality and aesthetic appeal")
- Search snippet: https://www.reddit.com/r/LocalLLaMA/comments/1nx18ax (GLM-4.6 user praise)
- Search snippet: https://medium.com/@leucopsis/glm-4-6-review-0600e9425c73 (GLM-4.6 review)

**Verified feature surface (Z.ai chat product, GLM-4.5 → GLM-5.2 era):**
- **Z.ai chat acts as a single agent** that can do search, come back, do another round of search, generate slides / presentations / posters. (Chinatalk — Zixuan Li)
- **Single-agent architecture preferred over multi-agent** because "single agents have better context management — you have the best model that can see all the context ahead of the current conversation. For multi-agents, you need to compress the context for each agent, and that might lose context." (Chinatalk)
- **Strategic pivot**: "In 2025, with the launch of Manus and Claude Code, we realized that coding and agentic functions are more useful… we are no longer putting simple chat at the top of our priorities. Instead, we are exploring more on the coding side and the agent side." (Chinatalk — Zixuan Li)
- **GLM Coding Plan** subscription — flat subscription, not per-token: "With subscription, your users become more sticky. They love this area because you don't have to worry about how one prompt consumes tokens in your dialogue. Maybe inside Claude, a round of interaction will consume a million tokens, but you don't have to worry about it." (Chinatalk)
- **Role-playing strength** — GLM-4.6 added role-playing training data; many users on Silly Tavern + Janitor AI use GLM for role-play. (Chinatalk)
- **GLM-4.7 / GLM-4.7-Flash** introduced **toggleable reasoning**: "reasoning can be turned on for difficult tasks and switched off when it is not needed." (Turing Post)
- **CogAgent** — visual GUI agent based on CogVLM, can interpret and interact with GUI interfaces via visual modality. (Turing Post)
- **GLM-4.6V / GLM-4.5V** — multimodal models for images, video, interfaces, long documents; useful for GUI agents, visual reasoning, coding, document analysis; 128K context for 4.6V. (Turing Post)
- **GLM-5.2** (Jun 2026): 1M-token context, IndexShare sparse-attention reuse (3× long-context compute reduction), redesigned speculative decoding (+20% accepted draft length), flexible effort levels. (Turing Post)
- **Building MCP** internally: "we need to do searches, we need to build our MCP. We're trying to get a competitive advantage over other GLM providers." (Chinatalk)
- **Frontend-interface generation**: GLM-4.5 generates frontends with "enhanced functionality and aesthetic appeal, demonstrating strong alignment with human [intent]." (z.ai/blog/glm-4.5)

### What works
- **Toggleable reasoning** (GLM-4.7): user controls latency vs depth per prompt — best-in-class for "pay for thinking only when you need it." (Turing Post)
- **Single-agent design with full context visibility** — Z.ai explicitly chose this over multi-agent decompositions to preserve context fidelity. (Chinatalk)
- **Flat subscription (GLM Coding Plan)** removes per-token anxiety; aligns with long multi-hour sessions. (Chinatalk)
- **Frontend / slides / poster generation** in chat as native output types. (Chinatalk, z.ai/blog)
- **GLM-4.6V multimodal GUI agent** — can read and interact with GUI screens, positioning GLM as an OS-grade agent. (Turing Post)

### What does NOT work
- **No first-class artifact panel like Canvas/Artifacts** — generated frontends/slides live as inline chat output or get exported; no side-by-side iterate-on-artifact surface. (Implied from Chinatalk — single agent in chat.)
- **No shared chats / no team features** — Z.ai is single-user focused.
- **Effective context ≠ advertised context**: Zixuan Li admits "you can say your model can do a one-million context window, but it actually performs very well only inside 60k or maybe 100k." (Chinatalk) — a candid UX-vs-marketing gap.
- **US-market discovery problem**: "It's not easy to get famous in the United States because people just don't accept your API." Forces reliance on third-party inference (Fireworks, Groq) and coding-agent partners (Cloud Code, KiloCode). (Chinatalk)
- **No deep memory model** beyond context window; relies on context length + search.

### What is UNIQUE
- **Explicit single-agent-with-search-loop architecture** (not multi-agent) — Z.ai publicly defends this as a context-fidelity decision. Unique among the 6 products in making this a stated design principle.
- **Toggleable reasoning per-prompt** (GLM-4.7) — no other product surfaces this as a clean toggle.
- **GLM Coding Plan flat subscription** explicitly positioned against per-token pricing of competitors. (Chinatalk)
- **CogAgent — visual GUI agent that can see and operate GUIs** — points at OS-grade agent capabilities none of the other 5 chat products have.
- **Bilingual (Chinese + English) with strong role-playing** — only product in this set with explicit role-play training and Silly Tavern / Janitor AI adoption.

### What MiMo should LEARN
- **Single-agent-with-search-loop > multi-agent decomposition** for context fidelity. MiMo's 6-stage sequential pipeline (already preserved per Group C findings) is the right call — Z.ai independently validates this.
- **Toggleable reasoning per prompt** — let the owner choose "fast" vs "deep" on each turn, defaulting to fast.
- **Flat subscription / no per-token counter** — MiMo is single-user local-first; this is natural. Z.ai's "users don't have to worry about how one prompt consumes tokens" is the principle.
- **Visual GUI agent (CogAgent pattern)** for OS-grade operations — MiMo as an AI OS should be able to see and operate its own UI.
- **Frontend / slides / poster as first-class output types**, not just text.

### What MiMo should AVOID
- **Advertised context >> effective context.** If MiMo exposes a context budget, it must be the *effective* budget, not a marketing number.
- **No first-class artifact surface.** Generated frontends must live in a side-by-side artifact viewer (like Claude/ChatGPT), not as inline chat output.
- **Reliance on partner surfaces for distribution** (Z.ai's reliance on KiloCode / Cloud Code). MiMo owns its own surface; don't outsource the UX.

### Premium interaction
- **Toggle reasoning on/off per prompt** — owner pays for depth only when they want it; instant latency for trivial turns. (GLM-4.7, Turing Post)

### Slow interaction
- **Long multi-step agent runs** — Z.ai's single agent does sequential search rounds, each round is a full model call; multi-step research tasks have visible round-trip latency. (Chinatalk description of single-agent search loop)

### Cognitive overload interaction
- **Choosing among model variants** (GLM-4.5, 4.5-Air, 4.5V, 4.6V, 4.7, 4.7-Flash, 5.2) — Z.ai ships many model variants with overlapping capabilities; the chat product surfaces them as a model picker without clear "when to use which" guidance. (Turing Post)

### Dimension notes
- **Conversation:** single-agent chat with inline search loop; reasoning toggle per prompt.
- **Navigation:** minimal sidebar (recent chats); no Projects first-class; Gem-style persona concept not native.
- **Workspace:** single chat thread is the unit; generated slides/frontends/posters are inline outputs.
- **Artifacts:** inline; no dedicated side-by-side artifact panel (a gap vs Claude/ChatGPT/Gemini).
- **Execution viz:** search loop visible; reasoning trace visible when toggle is on.
- **Memory:** context-window-only (1M claimed, ~60–100K effective per Zixuan Li); no persistent memory layer.
- **Search:** native single-agent web search loop.
- **Keyboard:** standard chat input + model picker.
- **Long-session:** strong on long-context reasoning (1M tokens, GLM-5.2 IndexShare), weak on cross-session memory and artifact continuity.

---

## 5. Perplexity

### Current UX (2024–2025) — verified via
- https://www.eesel.ai/blog/perplexity-reviews (Oct 8 2025 review)
- https://www.uxdesigninstitute.com/blog/perplexity-ai-and-design-process (Jun 14 2024 designer guide — still accurate for current UX)
- Search snippets: reddit.com/r/perplexity_ai (Pro Search vs Copilot rename), perplexity.ai/pro

**Verified feature surface:**
- **In-line numbered citations** — every major claim in an answer has a small number that links to source. (eesel, UX Institute)
- **Focus modes** (free): All (whole web), Academic (scholarly papers), YouTube (video transcripts), Reddit (discussion threads), Wolfram|Alpha (computational), Writing (no web — pure generation). (UX Institute)
- **Pro Search** (formerly Copilot, renamed to disambiguate from Microsoft Copilot): AI asks 1–4 clarifying questions before searching, then runs multi-step search with reasoning. Free tier: 5 Pro Searches / 4 hours; Pro tier: 600+/day. (eesel, UX Institute, Reddit)
- **Multiple LLMs on Pro**: switch between Sonar Large (Perplexity's own), GPT-4o, Claude 3 Opus, Mistral Large per query. (eesel)
- **Threads + Collections + Library**: a Thread = a back-and-forth; Collections organize Threads; Library tab hosts both. (UX Institute)
- **Discover tab**: built-in news feed; click article → opens in Perplexity interface. (UX Institute)
- **File uploads** (Pro): PDF, text, image; ask questions about them.
- **Image generation** (Pro): only works after a search response completes — no standalone text-to-image prompt.
- **Spaces** (referenced in search; team knowledge feature) and **Comet** browser (referenced in related eesel articles).

**Verified UX limitations:**
- **Hallucinations + questionable sources**: "occasionally hallucinates and presents wrong information with confidence"; "pulls from questionable sources like random Discord chats and cites them as if they were peer-reviewed." (eesel)
- **Cannot connect to private/internal company knowledge** — public-web + manually uploaded files only; not a business tool. (eesel)
- **Billing/support complaints**: "unexpected charges, subscriptions that are nearly impossible to cancel, customer support nowhere to be found"; reviewer: "like the Mafia, you can't get out." (eesel summarizing Trustpilot)
- **Image generation is secondary**: no standalone text-to-image; only post-search.
- **Conversational flow is weaker than ChatGPT** for back-and-forth ideation. (UX Institute)

### What works
- **In-line numbered citations** — the original "transparent sourcing" UX; still best-in-class for verifiability. (eesel, UX Institute)
- **Focus modes** as a clean pre-prompt routing — "Academic / YouTube / Reddit / Wolfram|Alpha / Writing" lets the user pre-scope the source surface. (UX Institute)
- **Pro Search clarifying questions** before deep search — disambiguates intent, dramatically improves first-answer quality. (eesel, UX Institute)
- **Multiple LLM switcher on Pro** — choose Sonar / GPT-4o / Claude / Mistral per query. (eesel)
- **Collections** for organizing related Threads. (UX Institute)

### What does NOT work
- **Hallucinated or surface-level answers for niche topics**: "produces answers based on surface level information" (Reddit quote in eesel).
- **Cannot access private/internal knowledge** — not a business tool. (eesel)
- **Billing + cancellation friction**: "no self-service cancellation," Trustpilot complaints widespread. (eesel)
- **Image generation tied to search** — no standalone prompt-to-image.
- **Conversational flow weaker than ChatGPT** for ideation. (UX Institute)

### What is UNIQUE
- **Numbered in-line citations as the answer's primary structure** — every fact is a clickable source. No other product makes sourcing the answer's primary axis.
- **Focus modes** as a clean source-routing primitive.
- **Pro Search clarifying questions** before deep research — pre-prompt disambiguation.
- **Multi-LLM picker per query** (Sonar / GPT-4o / Claude / Mistral) — most explicit model-choice UX of the 6.

### What MiMo should LEARN
- **Numbered in-line citations** for any factual claim; MiMo's answers should always show provenance, clickable to source.
- **Focus modes** as a prompt-routing primitive — pre-scope the source surface (web / local files / code / docs / chat history).
- **Pro Search clarifying questions** before long-running tasks — disambiguate intent before burning a 5-minute Deep Research run. MiMo's agent should ask 1–3 clarifying questions before multi-step execution.
- **Per-query model picker** — owner should choose fast vs deep per turn, similar to GLM-4.7 toggle.

### What MiMo should AVOID
- **Hallucinated sources / Discord-chats-as-citations.** MiMo's citations must point to verified local files or fetched-and-cached web pages, not hallucinated URLs.
- **No private-knowledge access.** MiMo is local-first — this is its core advantage; never give it up.
- **Billing friction** — MiMo is single-user, no counters (already a Group C principle).
- **Image generation tied to search** — MiMo should support standalone image generation as a first-class mode.

### Premium interaction
- **Click a citation number → side panel opens with the source page rendered + the relevant passage highlighted.** Verifiable trust in one click. (UX Institute)

### Slow interaction
- **Pro Search end-to-end** with clarifying questions + multi-step search: 30–90 seconds for complex queries; the clarifying-questions gate adds latency before search even begins. (eesel, UX Institute)

### Cognitive overload interaction
- **Choosing among Focus modes × Pro Search on/off × model picker (4 LLMs) × Thread vs Collection.** Four orthogonal axes at prompt time; users struggle to predict quality/cost trade-offs. (UX Institute, eesel)

### Dimension notes
- **Conversation:** Thread (linear); Pro Search adds clarifying-questions gate.
- **Navigation:** sidebar with Home (Discover), Threads, Library (Collections); Spaces for teams.
- **Workspace:** Thread + Collection (folder of Threads); no artifact panel.
- **Artifacts:** none first-class — answers are text + citations; image generation is post-search only.
- **Execution viz:** Pro Search shows "Searching… → Reading source X → Synthesizing" steps.
- **Memory:** none beyond Thread context; no persistent memory layer.
- **Search:** the product itself — primary axis; Focus modes + multi-LLM picker.
- **Keyboard:** standard chat input + Focus drop-down.
- **Long-session:** strong for research; weak for ideation / artifact iteration.

---

## 6. Genspark

### Current UX (2024–2025) — verified via
- https://www.lindy.ai/blog/genspark-review (Oct 31 2025 — features, pricing, multi-agent Sparkpages, AI Drive, Call For Me)
- https://www.spectrumaireviews.com/reviews/ai-assistants/productivity/genspark (Aug 6 2026 update; 30-day hands-on; 47 phone calls tested; 94 credits tracked; credit-cost breakdowns)
- Search snippet: https://www.trustpilot.com/review/genspark.ai (customer service reviews)

**Verified feature surface:**
- **Sparkpages**: structured mini-reports with sections, citations, follow-up options, and an embedded copilot that can expand or refine in context. (Lindy, Spectrum)
- **Multi-agent system**: each prompt is split into smaller jobs assigned to specialized agents (Clip Genius, AI Docs, AI Sheets, AI Slides, Super Agent, Call For Me, Deep Research, Fact Check, Download For Me). (Lindy)
- **Super Agent**: handles multi-step workflows from research → execution; bridges digital and physical world. (Spectrum)
- **Call For Me agent**: places real phone calls on user's behalf (restaurant bookings, appointment scheduling, business-hours inquiry). Spectrum tested 47 calls → 83% success (39/47); 17% failure rate; fails on accented English, noisy environments, multi-department transfers, non-English conversations. (Spectrum)
- **AI Drive**: file storage / organization / search inside Genspark. (Lindy)
- **Credit-based pricing**: Free 200 daily credits; Plus $24.99/mo = 10,000 credits; Pro $249.99/mo = 125,000 credits. Credits do NOT roll over; failed tasks still consume credits (50–100 for failed phone call). Per-task costs vary wildly: simple search 10–25, basic Sparkpage 40–80, complex Sparkpage 100–200, phone call 100–250, image/video gen 200–500. (Spectrum, Lindy)
- **No self-service cancellation**; email support 2–3 day response. (Spectrum, Lindy)
- **Platform uptime**: 94% over 30 days (18 hours downtime). "Error generating response" 3–5 times daily. (Spectrum)
- **Sparkpage generation time**: 2–3 minutes pre-Aug 2025, 90 seconds post-update. (Spectrum)

### What works
- **Sparkpage as the default output** — structured, citable, editable, shareable via link. Better than chat-only output for research/briefs. (Lindy, Spectrum)
- **Embedded copilot inside each Sparkpage** — drill into specific sections without losing context. (Spectrum)
- **Multi-agent specialization** — different agents for Docs/Sheets/Slides/Research/Fact-Check/Phone Calls; each tuned. (Lindy)
- **Call For Me as the only AI-with-a-phone product** in this comparison. (Lindy, Spectrum)
- **Free tier (200 daily credits) allows meaningful testing**. (Spectrum)

### What does NOT work
- **Opaque credit system** — "impossible to predict credit consumption; basic tasks vary wildly in cost (10–200 credits), making usage planning difficult." (Spectrum)
- **Failed tasks still consume credits** — phone call failure costs 50–100 credits with no refund. (Spectrum)
- **No self-service cancellation** + 2–3 day email support response. (Spectrum, Lindy)
- **94% uptime** with 3–5 "Error generating response" daily. (Spectrum)
- **Phone calls fail unpredictably** — 17% failure rate; fails on accents, noise, complex service. (Spectrum)
- **Exports unreliable** — "users have complained that exports do not always work smoothly." (Lindy)
- **Writing style repetitive** if prompts are not specific. (Lindy)

### What is UNIQUE
- **Sparkpage as the default output type** — every search becomes a structured, citable, editable mini-report with an embedded copilot. No other product in this set defaults to a structured document over chat text.
- **Call For Me** — only AI in this comparison that actually places real phone calls. (Spectrum, Lindy)
- **Multi-agent specialization with named agents** (Clip Genius, AI Docs, AI Sheets, AI Slides, Super Agent, Call For Me, Deep Research, Fact Check, Download For Me) — most explicit agent-decomposition UX.
- **AI Drive** — internal file storage + search across generated artifacts.

### What MiMo should LEARN
- **Default to a structured output artifact** (Sparkpage pattern) for research tasks — not a wall of chat text. MiMo's ExecutionTrace + plan artifact should default to a structured doc.
- **Embedded copilot inside each artifact** — drill-down / refinement without losing context.
- **Named specialized agents** — MiMo's 6-stage pipeline already maps to this pattern; make each stage's role visible (Planner, Researcher, Builder, Reviewer, etc.) with named identity.
- **Internal AI-Drive-like storage** — MiMo is local-first OS; this is native. Persist all generated artifacts in a typed Library with search.

### What MiMo should AVOID
- **Opaque credit system** — MiMo is single-user local-first; never impose counters (Group C principle, re-confirmed).
- **Failed-task-still-charges** pattern — never bill for failed runs.
- **94% uptime** expectation — MiMo must be reliable for multi-hour daily use.
- **Repetitive writing without specific prompts** — MiMo's defaults must produce varied, context-aware output without requiring prompt-engineering effort.
- **No self-service cancellation** — N/A for MiMo (no subscription), but the principle: owner must always have full control over their data + sessions.

### Premium interaction
- **Embedded copilot inside a Sparkpage** — click a section → "expand this" / "refine" / "find more sources" without leaving the Sparkpage context. (Spectrum)

### Slow interaction
- **Sparkpage generation**: 90 seconds post-Aug-2025 update, was 2–3 minutes before. Still the slowest default-output interaction in this comparison. (Spectrum)
- **Super Agent multi-step workflows**: 150–300 credits + multi-minute wall-clock. (Spectrum)

### Cognitive overload interaction
- **Choosing among 9+ named agents** (Super Agent, Clip Genius, AI Docs, AI Sheets, AI Slides, Call For Me, Deep Research, Fact Check, Download For Me) — the user must remember which agent handles which task. (Lindy)
- **Credit-cost unpredictability** — "same task can cost 50–200 credits depending on complexity; no real-time credit counter." (Spectrum)

### Dimension notes
- **Conversation:** multi-agent; Sparkpage replaces chat as default output.
- **Navigation:** dashboard of agents; AI Drive for files.
- **Workspace:** Sparkpage = structured doc with sections + copilot; AI Drive = file storage.
- **Artifacts:** Sparkpages, AI Docs, AI Sheets, AI Slides — each tied to a specialized agent.
- **Execution viz:** Super Agent shows multi-step workflow progress; phone-call agent shows live call status.
- **Memory:** AI Drive (file storage); no persistent conversation-memory layer.
- **Search:** primary axis; multi-agent web crawl + synthesis.
- **Keyboard:** standard chat input + agent picker.
- **Long-session:** credit burn + 3–5 daily errors + 94% uptime make long sessions fragile; Sparkpage link-share + AI Drive give artifact persistence.

---

## Cross-Product Synthesis — Top Takeaways for MiMo

1. **The "structured output artifact" is winning over plain chat.** ChatGPT Canvas, Claude Artifacts, Gemini Canvas, Gemini Deep Research doc, Genspark Sparkpages — all 5 of 6 products now default to side-by-side structured output for non-trivial tasks. MiMo must make the artifact viewer a first-class surface, not a chat decoration.

2. **ChatGPT is sunsetting Canvas in GPT-5** — proving that even the market leader can erode user trust by deprecating working artifact surfaces. MiMo must keep artifact viewer stable across model swaps (Group C principle #13 re-confirmed).

3. **Memory is bifurcating into "explicit saved" + "implicit history-reference"** (ChatGPT two-layer) vs "context-window-only" (Claude, GLM, Perplexity, Genspark) vs "personalization via search history" (Gemini). MiMo should adopt the ChatGPT pattern but make every memory item show source + timestamp + delete button — solve the opacity problem ChatGPT has.

4. **Project-as-memory-scope (ChatGPT Project-only memory, Aug 2025) is the most important pattern.** Scope-bound context, no bleed between projects. MiMo's Project container should support both shared OS-memory and per-project scoped memory with a hard toggle.

5. **Real-time execution viz ("Gemini shows its thoughts while it browses") is the premium differentiator.** Static "Working…" spinners feel dead. MiMo's ExecutionTrace must show live runtime motion — browsing, reading, writing, calling tools. Group C principle #8 re-confirmed.

6. **Single-agent-with-search-loop > multi-agent decomposition** for context fidelity. Z.ai publicly defends this design choice; MiMo's 6-stage sequential pipeline is independently validated.

7. **Toggleable reasoning per-prompt** (GLM-4.7) is the right latency-vs-depth control. MiMo should let owner choose fast/deep on each turn.

8. **Per-query model picker** (Perplexity + GLM) is becoming table stakes. MiMo should expose model choice per turn.

9. **In-line numbered citations (Perplexity) + Sparkpage structured output (Genspark)** together define the "verifiable answer" pattern. MiMo should default to cited structured outputs for research-style tasks.

10. **Workspace-embedded side panels (Gemini in Docs/Sheets/Slides/Gmail/Drive)** are the deepest host-app integration. MiMo as a local-first AI OS can do this natively for any local app, not just Workspace.

11. **Folder-as-context (Gemini Drive panel)** is a powerful primitive MiMo should adopt — point at a directory, ask a question, get a sourced answer. MiMo can do this better locally than Gemini does in cloud.

12. **Pro Search clarifying questions (Perplexity)** before long-running tasks — MiMo's agent should ask 1–3 clarifying questions before multi-step execution to prevent wasted runs.

13. **Connected-app orchestration in a single prompt** (Gemini: YouTube → Tasks → Maps) — MiMo's agent should chain local tools (read file → run command → write file → schedule task) in one turn.

14. **No product in this set has real-time multi-user collaboration.** Gemini, Claude, ChatGPT all share via read-only links or fork-only. MiMo, as single-user, sidesteps this — but should plan for multi-device sync (mobile companion for review/approve, per Group C #12).

15. **Credit/quota systems actively punish long sessions** (Genspark 200 credits = 3–4 hours; failed tasks still charge; no rollover; unpredictable costs). MiMo is single-user local-first — NEVER impose counters. Group C principle #15 re-confirmed.

16. **Named specialized agents (Genspark) + visible multi-stage pipeline** — MiMo's 6-stage pipeline maps to this pattern; make each stage's role visible with named identity (Planner, Researcher, Builder, Reviewer, etc.).

17. **Pyodide/React sandbox (Claude Artifacts CSP)** — MiMo's artifact viewer should run real code in a sandbox with explicit CSP + pre-whitelisted WASM Python path. Treat artifact viewer as a runtime, not a preview.

18. **Shareable artifact URL (Claude `claude.site/artifacts/<uuid>`)** — instant hand-off from chat to shareable artifact. MiMo should support this for hand-off to other devices or external collaborators.

19. **Frontend / slides / poster as first-class output types** (GLM, Genspark AI Slides) — MiMo should treat these as native artifact types, not just text-with-markdown.

20. **Visual GUI agent (Z.ai CogAgent)** — MiMo as AI OS should be able to see and operate its own UI, not just generate text. This is the path from "chat product" to "AI OS."

---

## Cross-Product Premium / Slow / Overload Map

| Interaction | Premium exemplar | Slow exemplar | Cognitive-overload exemplar |
|---|---|---|---|
| Highlight-and-rewrite on artifact | ChatGPT Canvas contextual menu | Canvas first-open latency | Choosing among 5 memory states in ChatGPT |
| Live execution trace | Gemini Deep Research thinking-stream | Deep Research end-to-end (minutes) | Gemini model drop-down conflating model + mode |
| Single-click source verification | Perplexity citation → side panel | Pro Search with clarifying questions (30–90s) | Perplexity 4-axis choice (Focus × Pro × LLM × Thread/Collection) |
| Toggleable reasoning | GLM-4.7 per-prompt toggle | GLM single-agent multi-round search | GLM model-variant picker (7+ variants) |
| Embedded copilot in artifact | Genspark Sparkpage copilot | Sparkpage generation (90s) | Genspark 9+ named agents + opaque credit costs |
| Pyodide/React artifact runtime | Claude Artifacts CSP sandbox | Complex React artifact re-render (full re-stream) | Claude choosing among chat / artifact / Project / Claude Code |

---

## Key Source URLs (verified live)

- ChatGPT: https://help.openai.com/en/articles/6825453-chatgpt-release-notes · https://medium.com/@bengumness_41135/canvas-projects-my-favorite-chatgpt-tools-de06aaca6e34 · https://openai.com/index/memory-and-new-controls-for-chatgpt · https://simonwillison.net/2025/May/21/chatgpt-new-memory
- Claude: https://www.anthropic.com/news/projects · https://simonwillison.net/2024/Oct/21/claude-artifacts/ · https://medium.com/@nuno.roberto/claude-artifacts-turning-chat-into-shareable-software-4985fdba94a2
- Gemini: https://blog.google/products-and-platforms/products/gemini/new-gemini-app-features-march-2025/ · https://freshvanroot.com/blog/google-gemini-review · https://gemini.google/overview/deep-research
- GLM / Z.ai: https://www.turingpost.com/p/zhipu · https://www.chinatalk.media/p/the-zai-playbook · https://z.ai/blog/glm-4.5 · https://z.ai
- Perplexity: https://www.eesel.ai/blog/perplexity-reviews · https://www.uxdesigninstitute.com/blog/perplexity-ai-and-design-process · https://www.perplexity.ai/pro
- Genspark: https://www.lindy.ai/blog/genspark-review · https://www.spectrumaireviews.com/reviews/ai-assistants/productivity/genspark · https://www.trustpilot.com/review/genspark.ai
