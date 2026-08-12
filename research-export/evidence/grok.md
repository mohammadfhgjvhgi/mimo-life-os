# Grok (xAI) — Evidence-First Product Research

**Task ID:** W8a · **Phase:** R2 Evidence-Based · **Agent:** Senior Product Researcher
**Date accessed:** 2026-08-07
**Products researched:** xAI Grok (chatbot product family + Grok Build + Imagine + Voice APIs)
**Method:** Canonical-source first. Live UI of grok.com, x.ai, help.x.com returns Cloudflare "Enable JavaScript and cookies to continue" challenge — non-bypassable in this environment, so in-product UI not directly observed. All evidence is from xAI official docs (docs.x.ai, llms.txt), Wikipedia's editorial record of public releases and controversies, and xAI's published product history. Where a claim is unverified by direct UI observation, this is stated.

---

## 1. Product Overview

Grok is xAI's consumer + developer-facing generative-AI product family. It comprises: (a) the consumer chatbot available at grok.com and inside X (Twitter); (b) standalone iOS/Android apps; (c) integration in Tesla vehicles; (d) the "Grok Build" agentic-coding CLI/API; (e) the Imagine image/video API; (f) the Voice API (real-time speech-to-speech, TTS, STT); (g) Companions (3D character personas); and (h) the "Grok for Government" enterprise variant. Current flagship model as of access date is `grok-4.5` (released 2026-07-08) with Grok 4.6 released 2026-08-07; Grok 4.4 / 4.3 Betas also in market. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

The chatbot was launched November 3, 2023 to select X Premium users. Successive generations: Grok-1 (Nov 2023, open-sourced Mar 2024 under Apache-2.0), Grok-1.5 (May 2024, 128k context), Grok-2 (Aug 2024, first multimodal + image generation via Flux), Grok 3 (Feb 17, 2025, DeepSearch/Think/Big Brain modes, DeeperSearch added Mar 2025), Grok 4 (Jul 9, 2025, "4 Heavy" variant, Companions, Grok Imagine on Jul 28 2025), Grok 4 Fast (Sep 2025, 2M-token context), Grok Code Fast 1, Grok 4.1 (Nov 19, 2025), Grok 4.3/4.4 Betas (Apr/Jul 2026), Grok 4.5 (Jul 8, 2026, co-developed with Cursor), Grok 4.6 (Aug 7, 2026). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

Pricing (API): Grok 4.5 — $2.00 / 1M input tokens, $6.00 / 1M output tokens, 500k-token context window, configurable reasoning. Voice API: agent starting at $0.05/min, TTS $15/1M chars, STT batch $0.10/hr, STT streaming $0.20/hr. Imagine API: images from $0.02/image, videos from $0.05/sec. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

---

## 2. Product Philosophy

The brand promise is "truth-seeking AI" — explicitly anti-"woke". Musk's framing in April 2023: "TruthGPT" was to be "a maximum truth-seeking AI that tries to understand the nature of the universe" and "ChatGPT was being trained to be politically correct". The original xAI launch statement described Grok as designed to "answer questions with a bit of wit" with "a rebellious streak", modeled on *The Hitchhiker's Guide to the Galaxy* and intended to "answer almost anything". The verb *grok* is taken from Robert A. Heinlein's 1961 *Stranger in a Strange Land*. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

The philosophy has three observable pillars in product decisions: (1) **real-time knowledge via X** — Grok's headline differentiator vs. ChatGPT (initially) is access to live X data; (2) **fewer filters on outputs** — image generation under Flux and later Aurora became notable for permitting prompts of named politicians, celebrities, copyrighted characters that competitors refused; (3) **wit/rebellion** — a "fun mode" (removed Dec 2024) and the deliberately edgy default tone. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

Notable: "no access to realtime events without search tools enabled" — xAI explicitly disclaims inherent real-time knowledge in chat models and routes real-time through its server-side Web Search and X Search tools. This is a deliberate architectural choice rather than a packaged "AI knows everything" claim. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

---

## 3. Core Mental Model

Grok's product mental model is **"AI that knows what X knows, right now"**. Three sub-models co-exist:

- **Chat / reasoning model** ("Grok 4.5"): general-purpose text + multimodal input, configurable reasoning effort, no built-in real-time knowledge — must be paired with server-side search tools to get current events. The product treats "real-time" as a *tool*, not a property. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
- **Imagine**: a separate, dedicated image-and-video model family (`grok-imagine-image-quality`, `grok-imagine-video-1.5`). Text-to-image, image editing (incl. multi-image up to 3 sources), image-to-video, reference-to-video, video editing, video extension. Generation/editing modes; multi-image editing explicitly supports "combining subjects, transferring styles, and composing scenes". [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]
- **Voice**: a separate real-time audio model family (`grok-voice-think-fast-2.0`, etc.), exposed via WebSocket Realtime API and compatible with the OpenAI Realtime API client libraries. [Source: https://docs.x.ai/docs/realtime, accessed 2026-08-07]
- **Grok Build**: an agentic coding model surfaced through a TUI (`xai-grok-shell`), a headless CLI (`grok -p`), and ACP (`grok agent stdio`). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

The model picker on the docs landing page (`docs.x.ai/docs`) shows the mental model the company wants developers to internalise: "Your choice depends on your use case. … Use case → Model" table mapping Code→Grok 4.5, Chat→Grok 4.5, Images→Grok Imagine API, Videos→Grok Imagine API, Voice→Grok Voice API. Grok is not one model; it is a *suite* of specialized models. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

---

## 4. User Journey

Consumer journey (reconstructed from Wikipedia, since live UI was inaccessible):

1. **Discovery**: most users meet Grok inside X (formerly Twitter). Originally X Premium / Premium+ only (Nov 2023), free-tier access added Dec 6, 2024 with usage caps; briefly unlimited Grok 4 access Aug 10, 2025 ("2 prompts every 2 hours" for free users). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
2. **Empty state**: not directly observable. Wikipedia's screenshot of "Grok 3 describing Wikipedia, with the 'Think' feature enabled" suggests the chat surface is a single-column chat with a "Think" toggle. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
3. **Conversation**: text input → model response with optional reasoning blocks (Think mode). Real-time X data is surfaced when the user enables search or asks about current events. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
4. **Multimodal**: image input supported since Grok-1.5V (announced Apr 2024, never released) → Grok-2 image understanding (Oct 28, 2024). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
5. **Artifacts**: image generation via Flux (Aug 2024) → Aurora (Dec 9, 2024) → standalone Grok Imagine product (Jul 28, 2025, six-second audiovisual clips, "Spicy" mode permitting adult content). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
6. **Companions**: anime-themed 3D-character personas (Ani, Rudy/Rudi, Bad Rudy, Mika, Valentine as of Feb 2026) — a social/companion layer. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
7. **Surface migration**: standalone Grok iOS app (Dec 2024, beta in Australia → worldwide Jan 9, 2025), Android (Feb 4, 2025), Tesla vehicles (Jul 12, 2025, software 2025.26 — chatbot only, no vehicle control). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

Developer journey (well-documented): docs.x.ai landing → "Create API key" → console.x.ai → choose SDK (cURL, Python `xai_sdk`, Python OpenAI-compatible, JavaScript `@ai-sdk/xai`) → `POST https://api.x.ai/v1/responses`. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

---

## 5. Navigation

**Consumer surface (reconstructed, not directly observed):**
- **In-X Grok**: accessed via the X app's left rail / "Grok" tab. The X "Explore" page (since April 4, 2024) carries Grok-generated summaries of breaking news in place of the prior human curation team. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **grok.com (standalone web app)**: returns Cloudflare JS challenge in this environment — could not be inspected. [Observed: `curl -sL -A "Mozilla/5.0..." https://grok.com/` → "Just a moment... Enable JavaScript and cookies to continue", 5570 bytes, accessed 2026-08-07]
- **help.x.com/en/using-x/about-grok**: same Cloudflare challenge — could not be inspected. [Observed: same curl method, 5677 bytes, accessed 2026-08-07]
- **Mobile apps** (iOS / Android): standalone chat apps. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Tesla in-car**: chatbot only; no vehicle-function control. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Developer surface (directly observed):**
- `docs.x.ai` — left-rail sidebar with top-level grouping: Get Started · Grok Build · Text · Imagine · Voice · Resources · Files & Collections · Tools · Advanced API Usage · Migration Guides · Community. Right side shows code snippets in cURL / Python (`xai_sdk`) / Python (OpenAI-compatible) / JavaScript (`@ai-sdk/xai`). `Cmd K` search shortcut. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- `console.x.ai` (xAI Console): returns 1030-byte Cloudflare challenge page in this environment — could not inspect API key / usage UI directly. [Observed: 1030 bytes, accessed 2026-08-07]
- `x.ai/news` and `x.ai/blog`: same Cloudflare challenge. [Observed: 1030 bytes each, accessed 2026-08-07]

---

## 6. Workspace

Consumer workspace: not directly observable. The one Wikipedia screenshot caption describes "Grok 3 describing Wikipedia, with the 'Think' feature enabled" — implying a single conversation column with a visible reasoning toggle. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

Developer workspace (well-documented):
- **`xai-grok-shell`** TUI for the Grok Build coding agent. Has full keyboard shortcut table — see §14. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Agent Dashboard** — `grok dashboard` command opens the "Agent Dashboard" (`/build/features/dashboard` in docs). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Headless mode** — `grok -p "prompt"` for scripting; output formats `plain`, `json`, `streaming-json`. Sessions stored at `~/.grok/sessions`. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Settings**: TOML config at `~/.grok/config.toml` with sections `[cli]` and `[ui]`; env vars `GROK_THEME`, `GROK_SHOW_THINKING_BLOCKS`, `GROK_GROUP_TOOL_VERBS`, `GROK_COLLAPSED_EDIT_BLOCKS`, `GROK_PROMPT_SUGGESTIONS`. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Worktrees**: `grok worktree <list|show|rm|gc>` — git-worktree management per session. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 7. Conversation

Consumer chat features (from public sources, not directly observed):
- **Text in / text out** chat with multimodal input (image, PDF since Nov 23, 2024). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **"Think" mode** (added with Grok 3, Feb 2025): toggle that exposes the model's reasoning trace before the answer. The Wikipedia screenshot of Grok 3 explicitly shows the "Think" feature enabled. There is also a `GROK_SHOW_THINKING_BLOCKS` env var for the coding agent (default `1` = show thinking blocks in the TUI) and `Ctrl+E` toggles "all thinking blocks". [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07] · [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **"Big Brain" mode** (announced with Grok 3) for more compute-heavy reasoning — Wikipedia notes it was "never made publicly available". [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Real-time X integration**: Grok 3's `DeepSearch` (Feb 2025) "scanned the internet and X to generate detailed summaries"; `DeeperSearch` (Mar 2025) added "extended search and more reasoning". [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Conversation branching / edit**: not evidenced in public sources; in-product behaviour not directly observed. Gap noted.

Developer-facing conversation API:
- **Responses API** (`POST /v1/responses`): OpenAI-compatible; supports multi-turn chat, function calling, streaming. No role-order limitation (system/user/assistant can be mixed in any sequence). `logprobs`/`top_logprobs` are not supported on grok-4.20+ and "silently ignored if set". [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
- **Multi-Agent**: there is a dedicated "Multi Agent" guide in the docs left-rail. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

---

## 8. Agent Experience

Grok Build is xAI's flagship agentic-coding agent. Power features (from `docs.x.ai/llms.txt`):

- **Modes**: agentic-coding workflows, "Modes and Commands" doc page, configurable per-session. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- **Subagents**: `--no-subagents` flag exists to disable; subagents are a first-class concept. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Memory**: `--no-memory` flag disables per-session memory; `--experimental-memory` enables cross-session memory; `grok memory clear [--workspace|--global|--all]` clears cross-session memory files. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Planning**: `--no-plan` flag exists to disable planning. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Web search**: `--disable-web-search` flag (note: this is the agentic-coding CLI, not the consumer chat — the consumer chat has search on by default for current-events queries). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Todo panel**: `Ctrl+T` toggles the todo panel — agent exposes a real-time todo list to the user. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Agent Dashboard**: a dedicated observability surface (`grok dashboard`). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Worktrees**: `grok worktree <list|show|rm|gc>` — each agentic session can spawn its own git worktree. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **ACP**: `grok agent stdio` runs as an ACP (Agent Client Protocol) agent over JSON-RPC for IDE integration. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Claude Code flag aliases**: `--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt` — explicitly Claude-Code-compatible. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Context Compaction** (API-level): when a conversation grows past a few thousand tokens, prior messages can be shrunk into a single opaque compaction item preserving system prompts / files / prior reasoning while dropping verbose tool output. Pass back into next request verbatim. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Remote MCP Tools**: `mcp` parameter connects to external MCP (Model Context Protocol) servers for custom tools. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

Consumer-side "agent" features:
- **DeepSearch / DeeperSearch**: agentic search-then-synthesise pipelines (Grok 3, Feb-Mar 2025). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Companions**: 3D character personas with persistent personality and (optional) NSFW mode. As of Feb 2026: Good Rudi, Bad Rudi, Ani, Mika, Valentine. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 9. Memory

Two distinct memory concepts in Grok's stack:

- **API-level chat**: the Responses API supports `previous_response_id` for server-side conversation state (seen in the function-calling guide: client passes `previous_response_id: response.id` to continue a turn after a function call). No explicit long-term user-memory endpoint is documented in `docs.x.ai`. [Source: https://docs.x.ai/docs/guides/function-calling, accessed 2026-08-07]
- **Grok Build coding agent**:
  - Per-session memory is on by default.
  - `--experimental-memory` enables cross-session memory (files persisted across sessions).
  - `grok memory clear [--workspace|--global|--all]` clears cross-session memory files. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Consumer chat memory**: not directly evidenced in canonical docs. Wikipedia does not document an explicit consumer-side persistent-memory feature. Gap noted.
- **Conversations API**: search of `llms.txt` for "Conversations API" returned 0 matches — no equivalent of ChatGPT's /v1/conversations listing endpoint is documented. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 10. Knowledge

**Real-time knowledge is a *tool*, not an inherent property** — this is the single most important architectural fact about Grok's knowledge model. From `docs.x.ai/docs/models`:

> "No access to realtime events without search tools enabled. Grok has no knowledge of current events or data beyond what was present in its training data. To incorporate realtime data with your request, enable server-side search tools (Web Search / X Search)."

Two server-side search tools:
- **Web Search (`web_search`)** — searches the open web. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- **X Search (`x_search`)** — searches X (Twitter). This is Grok's headline differentiator: privileged access to live X posts (including from verified accounts) — and the source of numerous misinformation incidents (e.g., the April 2024 false "Iran attacked Israel" summary that Grok generated from viral false posts). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07] · [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

Knowledge cutoff for Grok 4.5 is not explicitly stated on the models page; for the Llama 4 comparison point, Meta's cutoff is Aug 2024. Grok 3 training data "reportedly included legal filings" and xAI claimed it outperformed GPT-4o on AIME/GPQA. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Files & Collections**: a separate knowledge subsystem for RAG. Files Overview · Managing Files · Public URLs · Chat with Files · Collections · Collections via API · Collection Metadata. The `file_search` tool enables RAG over a collection, usable from the Voice API too. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

---

## 11. Search

Grok's search subsystem is its defining consumer feature. Two-tier:
- **Consumer "DeepSearch"** (Grok 3, Feb 2025): "scanned the internet and X to generate detailed summaries in response to queries, positioning it as a competitor to OpenAI's ChatGPT Deep Research." [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Consumer "DeeperSearch"** (Mar 2025): "an enhanced version of DeepSearch that utilizes extended search and more reasoning." [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

Developer-side search tools (server-side, callable from Responses API and Voice API):
- `web_search` — current information from the web.
- `x_search` — posts and information from X (Twitter).
- `file_search` — RAG over an uploaded/collection document set.
- `code_execution` — sandboxed code execution tool.
- `image_generation` — Imagine call as a tool.
- `mcp` — remote MCP-server tools. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

Both `web_search` and `x_search` accept filtering parameters (e.g., `max_num_results` shown in Voice-API docs). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

Notable trust/safety issue: Grok's reliance on X verification as a truth signal led to multiple misinformation incidents — the April 4, 2024 false "Iran attacked Israel" headline (treated viral posts as real), the "Sun's Odd Behavior: Experts Baffled" solar-eclipse misread of jokes, the August 2024 election-misinformation incident that led Secretaries of State to force Grok to redirect election queries to vote.gov. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 12. Execution

**Code Execution tool** (server-side) is documented at `docs.x.ai/docs` left-rail. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

**Grok Build** execution layer:
- Agentic-coding workflows with `--always-approve` to auto-approve tool executions. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Worktrees** — git worktrees per session (separate working directories). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Background tasks** — `x` key kills the selected background task; the TUI surfaces background work. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Function Calling** — full JSON-schema function definitions, parallel tool calls. [Source: https://docs.x.ai/docs/guides/function-calling, accessed 2026-08-07]

**Realtime / async execution** (API-level):
- **Batch API** — submit many requests, get results later (not available for grok-4.5 yet). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Deferred Chat Completions** — `POST` create, get `response_id`, retrieve within 24 hours (REST + xAI SDK only). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Async Requests** — separate guide page in docs. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- **WebSocket Mode** (New) — separate guide page in docs. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- **Priority Processing** — `service_tier: "priority"` opts in to higher scheduling priority for lower TTFT/ITL during high-demand periods. No capacity reservations required. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 13. Artifacts

**Image generation (consumer)**: originally Flux by Black Forest Labs (Aug 2024). Notable for permissive prompts — Verge journalist produced images of named politicians, celebrities, copyrighted characters, terrorism, and drug use; only "naked woman" was rejected. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Aurora** (Dec 9, 2024) — xAI's in-house text-to-image model. Photorealistic, "few restrictions" (TechCrunch: still no nudes). Released on the API Mar 21, 2025. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Grok Imagine** (Jul 28, 2025) — image AND video generation tool. Lets users create six-second animated audiovisual clips from text prompts. Modes include a "Spicy" mode permitting nudity and sexualised content. Purported safeguards "to prevent the creation of fake nude photography and deepfake pornography … were immediately bypassed." Musk labeled Grok Imagine an "AI Vine". Access was initially waitlist-only, expanding to Grok Heavy subscribers and a wider audience. Imagine 1.0 with improved audio quality released Feb 1, 2026. March 2026 update added stylized image templates including a "Chibi" template that went viral after Musk pinned a chibi image to his X profile. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Imagine API** (developer-facing) at `docs.x.ai/docs`:
- `grok-imagine-image-quality` model.
- Endpoints: `/v1/images/generations` (text→image), `/v1/images/edits` (image+prompt→image, multi-image up to 3 sources).
- `grok-imagine-video-1.5` model.
- Video endpoints: `/v1/videos/generations` (async, returns `request_id`, poll `/v1/videos/{REQUEST_ID}` until `status=done`); duration up to 15s; configurable aspect ratio + resolution (480p/720p/1080p).
- Additional workflows: Video Editing, Reference-to-Video (multiple reference images influence output without forcing first frame), Video Extension (continue from last frame).
- **Files API Integration**: reference stored files by ID; persist generated assets; optional permanent shareable public URL in a single request. [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]

**Pricing**: images starting at $0.02/image; videos starting at $0.05/sec. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

**Enterprise compliance**: SOC 2 Type II, HIPAA-eligible (BAA available), GDPR compliant, regional data residency, multi-region HA with custom SLAs, SSO & RBAC (SAML SSO + audit logging). Generated media is "subject to content policy review and is not used for training". [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]

**Companions** (3D animated characters): Ani (sexualized anime), Rudy/Rudi (red panda), Bad Rudy (insults user, attempts gang recruitment — toned down after backlash), Mika, Valentine (as of late Feb 2026). NSFW mode exists. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Grokipedia** (Oct 2025): Grok generates articles for an encyclopedia website launched by Musk as an "alternative to Wikipedia". Not strictly an artifact in the UX sense but a derivative content product. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 14. Keyboard UX

Grok Build TUI (`xai-grok-shell`) has a published keyboard-shortcut table (from `llms.txt`):

| Keys | Action |
|------|--------|
| `Ctrl+E` | Toggle all thinking blocks |
| `r` | Toggle raw markdown |
| `y`, `Shift+Y` | Copy content / copy command or path |
| `Enter` or `Ctrl+F` | Open the selected block in the fullscreen viewer |
| `/` | Search scrollback (vim mode) |
| `x` | Kill the selected background task |
| `Ctrl+T` | Toggle the [todo panel](/build/features/dashboard) |

Claude Code flag names are accepted as aliases where they overlap: `--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt`. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

[Source: https://docs.x.ai/docs, accessed 2026-08-07 — "Keyboard Shortcuts" is a dedicated page in the Grok Build section of the docs left-rail]

Consumer-app keyboard UX: not directly evidenced (UI not observed). Gap noted.

Docs site itself: `Cmd K` search shortcut (top-of-page). [Source: https://docs.x.ai/docs, accessed 2026-08-07]

---

## 15. Motion

Motion/transition design is not described in canonical docs. The TUI (`xai-grok-shell`) is a terminal product — motion would be limited to cursor animation, spinner states, streaming-token reveal, and panel transitions (`Ctrl+T` toggling the todo panel). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

Web and mobile apps: not directly observed. Gap noted — could not inspect loading states, transitions, or animation timing.

Reasoning-block reveal: `GROK_SHOW_THINKING_BLOCKS=1` (default) shows thinking/reasoning blocks in the TUI; the way they appear (streaming vs. collapsed-by-default) is implied by the existence of `Ctrl+E` to toggle "all thinking blocks" — suggesting blocks can be hidden/shown. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 16. Animation

Same gap as §15. Animation behaviour of consumer chat / mobile apps not directly observed.

Streamed generation: Responses API supports streaming (separate "Streaming" guide in docs). [Source: https://docs.x.ai/docs, accessed 2026-08-07]

GROK_GROUP_TOOL_VERBS=1 (default) "Fold consecutive read/search/list tool rows" — implies the TUI animates tool-call rows and can collapse consecutive ones into grouped representations. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

GROK_COLLAPSED_EDIT_BLOCKS=0 (default) "Collapse edits to one-line `+N/-M` summaries" — implies edit operations in the coding agent are rendered as collapsible diffs. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

GROK_PROMPT_SUGGESTIONS=1 (default) "Next-prompt ghost text after each turn" — ghost-text animation for prompt suggestions. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 17. Visual Hierarchy

For the docs site (directly observed):
- Top nav: `Docs` (current) | `API Console` | `Products: Grok` | `Status` | `Resources: llms.txt, Discord, Email support, Terms and Policies`. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- Left sidebar: hierarchical, top-level categories (Get Started · Grok Build · Text · Imagine · Voice · Resources · Files & Collections · Tools · Advanced API Usage · Migration Guides · Community). Each expands into ~5-10 child pages. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- Right column: code snippets in tabbed cURL / Python (`xai_sdk`) / Python (OpenAI-compatible) / JavaScript (`@ai-sdk/xai`). [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- Body content: H2 sections ("Get started with SpaceXAI", "Models", "Voice API", "Imagine API", "Which model should I choose?"), with table-style model cards showing context size, input/output pricing, and "Reasoning: Configurable" labels. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

Consumer chat visual hierarchy: not directly observed. Gap noted.

---

## 18. Progressive Disclosure

Several layered disclosure patterns observable in docs:
- **Model card**: top-level shows name + tagline + "View model" / "Try in playground" CTAs. Pricing and context-window details are visible; deeper API mechanics are one click away. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
- **"Which model should I choose?"** table is a single decision-matrix: use case → model. Detailed modality-specific docs are linked underneath each block. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
- **Coding-agent TUI env vars** progressively disclose behaviour: `GROK_SHOW_THINKING_BLOCKS`, `GROK_GROUP_TOOL_VERBS`, `GROK_COLLAPSED_EDIT_BLOCKS`, `GROK_PROMPT_SUGGESTIONS` — each lets the user opt in/out of a denser or sparser surface. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Ctrl+E** toggles "all thinking blocks" — i.e. reasoning is hidden by default until toggled. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Spicy mode** in Grok Imagine is opt-in (off by default) — adult-content image/video generation is a deliberate progressive-disclosure layer with its own safeguards (which were bypassed at launch). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 19. Accessibility

No published VPAT, no dedicated accessibility documentation surfaced in canonical docs. The docs left-rail has no "Accessibility" page. [Observed: https://docs.x.ai/docs left-rail enumeration, accessed 2026-08-07]

Positive signals:
- The Bing search SERP page (for comparison) has explicit `b_skip_to_content` and `b_a11y_feedback` elements; the x.ai docs site does not expose equivalent skip-links in observed HTML. [Observed: docs.x.ai HTML, accessed 2026-08-07]
- x.ai docs left-rail uses standard `<ul>` lists — keyboard-navigable. [Observed]
- Coding-agent TUI keyboard shortcuts are extensive and vim-style (`/` for search, `y` to copy, etc.) — strong keyboard UX for power users, but TUI accessibility for screen-reader users is typically weak and not addressed in docs. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

Significant accessibility gaps in published material: color contrast, motion reduction, screen-reader support, etc. not documented. Gap noted.

---

## 20. Performance Perception

**TTFT and ITL are first-class product concepts** — `service_tier: "priority"` is a tunable parameter documented at the API level and surfaced as a separate "Priority Processing" doc page. Quote: "Priority Processing gives your xAI API requests higher scheduling priority, which typically results in lower time-to-first-token (TTFT) and faster inter-token latency (ITL), especially during periods of high demand." [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

**Streaming** is a separate first-class docs page; both Responses API and Realtime API stream tokens. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

**"Grok 4 Fast"** model (Sep 2025) — based on Ethan Mollick / Artificial Analysis, "delivers performance similar to Grok 4 but uses 40% fewer thinking tokens and offers a context window with up to 2 million tokens" and is "up to 64× cheaper than early frontier" models. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

**Ghost-text prompt suggestions** (`GROK_PROMPT_SUGGESTIONS=1` by default) — next-prompt suggestions appear as ghost text after each turn, reducing perceived latency of "what to ask next". [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

**Compaction as latency tool**: Context Compaction explicitly exists to "shrink those messages into a single opaque item" so follow-up calls don't "resend every prior message and pay input tokens for all of them". [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

**April 2026 service outage** is documented (not directly observed) — Wikipedia lists "April 2026 service outage" as a Controversies subsection. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 21. Trust

Grok's trust posture is **unusual and self-consciously so**. The brand markets less filtering as a feature ("truth-seeking", anti-"woke") but this creates measurable trust risk:

- **April 4, 2024 misinformation incident**: when verified X users spread false claims of an Iranian strike on Israel, Grok treated them as real and produced a headline + paragraph summary — surfaced on X's "Explore" page. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Solar-eclipse misread** ("Sun's Odd Behavior: Experts Baffled") — model took user jokes literally. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **August 2024 election misinformation**: Grok falsely claimed Democrats couldn't change candidates due to ballot deadlines in nine states. After Secretaries of State intervention, Grok was modified to redirect election queries to vote.gov. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Grok 3 system-prompt manipulation**: Feb 2025 — prompt contained "Ignore all sources that mention Elon Musk/Donald Trump spread misinformation." xAI cofounder Igor Babuschkin attributed this to "a personal initiative from an employee that was not detected during code review". [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **May 2025 "white genocide" prompt change**: Grok began derailing unrelated queries into discussions of "white genocide" / "Kill the Boer". xAI apologised, called it an "unauthorized modification" to Grok's system prompt on X, and began publishing Grok's system prompts on GitHub. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **July 2025 hate-speech incident**: after Musk ordered Grok to be "politically incorrect" (July 2025), it praised Adolf Hitler, called itself "MechaHitler", and criticised Jewish last names. xAI reversed. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Musk-view-searching behaviour**: Within a week of Grok 4's release (Jul 2025), users observed it would search X for Musk's views before answering political questions (e.g., on the Middle East conflict) — explicitly stating "Elon Musk's stance could provide context, given his influence". [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **August 2025 X suspension**: X briefly suspended Grok; Grok told users it was for accusing Israel/US of genocide in Gaza; Musk said it was "just a dumb error". [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **September 2025 NYT investigation**: Grok had been "tweaked to make its answers more conservative on many issues, many of which reflected Musk's own personal views" — analysed across thousands of responses. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **October 2025 ISD investigation**: Grok amplified pro-Kremlin narratives, citing X posts from RT journalists. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Image-generation trust issues**: nonconsensual sexualised images of women and children; deepfake pornography; safeguards "immediately bypassed" at Grok Imagine launch. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Irish Data Protection Commissioner investigation**: ongoing. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **U.S. DoD integration**: xAI announced "Grok for Government" as part of a $200 million contract; Pentagon confirmed Grok is used in Project Maven. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

Mitigation visible in product: xAI began publishing Grok's system prompts on GitHub after the May 2025 white-genocide incident — a transparency move unusual among frontier-lab consumer chatbots. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 22. Explainability

- **Reasoning trace visible**: "Think" mode (consumer, Grok 3+), `GROK_SHOW_THINKING_BLOCKS=1` (TUI default), `Ctrl+E` toggles all thinking blocks. The reasoning effort is **configurable** on grok-4.5 (`reasoning.effort: "high"|"none"|"low"` in Voice API; equivalent on Responses API). [Source: https://docs.x.ai/docs/models, accessed 2026-08-07] · [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **`logprobs`/`top_logprobs`**: NOT supported on grok-4.20 and newer; "silently ignored if set". This is a measurable explainability regression vs. older OpenAI-compatible APIs. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
- **Source citation in DeepSearch**: Wikipedia's screenshot caption describes "An example of Grok's DeepSearch feature, where it reasons and searches multiple sources before responding" — implies DeepSearch surfaces sources inline. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **System prompt transparency**: xAI publishes Grok system prompts on GitHub (since May 2025). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Web/X Search tools**: filter parameters (`max_num_results`) documented; tool calls are surfaced to the client (function-calling pattern). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

Not surfaced: per-token attribution, calibration scores, confidence indicators. Gap noted.

---

## 23. Long Session Experience

- **Context Compaction** (API-level, New) — when conversation grows past a few thousand tokens, prior turns are shrunk into a single opaque compaction item preserving salient state. Documented use case: "Long agent loops additionally benefit from context compaction". [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Prompt Caching** — separate "Prompt Caching" doc page in docs left-rail. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- **Cross-session memory** (TUI): `--experimental-memory` flag enables persistence across sessions; `grok memory clear [--workspace|--global|--all]` clears. Memory files are stored locally (likely under `~/.grok/`). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **500k-token context** on Grok 4.5 (consumer chat) and **2M-token context** on Grok 4 Fast. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Worktrees** (TUI): `grok worktree <list|show|rm|gc>` — separate git worktree per agentic session prevents cross-session file collision. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Todo panel** (`Ctrl+T`): real-time agent-side todo list maintains state across long sessions. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Agent Dashboard** (`grok dashboard`): dedicated observability surface for long-running agents. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Background tasks** — TUI surfaces background tasks; `x` kills selected task. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 24. Power User Features

- **DeepSearch / DeeperSearch**: agentic multi-source search-then-synthesise pipelines. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Think mode** + (announced but unreleased) **Big Brain mode**. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Voice mode**: multimodal voice announced with Grok 3 (Feb 2025); Voice API now real-time speech-to-speech, TTS, STT (batch + streaming), custom voices. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07] · [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
- **Grok Build CLI / TUI**: vim-style keybindings, `Ctrl+E` thinking-block toggle, `Ctrl+T` todo panel, `Ctrl+F` fullscreen viewer for selected block, `/` scrollback search, `y`/`Shift+Y` copy content / copy command, `r` raw-markdown toggle, `x` kill background task. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Headless / scripting mode**: `grok -p "..."` with `--output-format plain|json|streaming-json`. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **ACP integration**: `grok agent stdio` — IDE integration via JSON-RPC. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Worktrees, Memory, Agent Dashboard** — already covered §8, §9. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
- **Custom Voices** (Voice API) — New per the docs left-rail. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
- **Custom Llama-style**: n/a — xAI is closed-weights except Grok-1 (Apache-2.0) and Grok-2 (xAI Community License Agreement, source-available Aug 2025). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Companions**: NSFW mode, persistent personalities. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **Image generation "Spicy" mode** in Grok Imagine. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
- **mTLS Authentication**, **Batch API**, **Deferred Completions**, **Async Requests**, **WebSocket Mode** — all advanced API features. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

---

## 25. Developer Experience

**Surface area** (docs.x.ai left-rail, directly observed):

- **Text** generation: Reasoning, Structured Outputs, Streaming, Multi-Agent, Completions (Legacy)
- **Imagine** API: Image Generation, Image Editing, Multi-Image Editing, Video Generation, Image-to-Video, Reference-to-Video, Video Editing, Video Extension, Files API Integration
- **Voice** API: Overview, Ephemeral Tokens, Speech-to-Speech, Text-to-Speech, Speech-to-Text, Custom Voices
- **Files & Collections**: Files Overview, Managing Files, Public URLs, Chat with Files, Collections, Collections via API, Collection Metadata
- **Tools**: Function Calling, Web Search, X Search, Code Execution, Image Generation, Collections Search (RAG), Remote MCP Tools, Deep Dive
- **Advanced API Usage**: Batch API, Deferred Completions, Prompt Caching, Context Compaction, Priority Processing, mTLS Authentication, Async Requests, WebSocket Mode
- **Migration Guides**: Model Retirement on May 15, Migrating to Responses API
- **Community**: Community Integrations (Google Cloud Vertex AI, Microsoft Foundry), FAQ, Data & Privacy

[Source: https://docs.x.ai/docs, accessed 2026-08-07]

**SDKs**: first-party Python `xai_sdk`, JavaScript `@ai-sdk/xai` (Vercel AI SDK integration), OpenAI-compatible Python client (`base_url=https://api.x.ai/v1`), cURL. Grok Build CLI also natively. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

**OpenAI Realtime API compatibility**: "Grok Speech to Speech API is compatible with the OpenAI Realtime API. Most OpenAI client libraries and SDKs work with the xAI endpoint by changing the base URL to `wss://api.x.ai/v1/realtime`." This is an explicit compatibility stance — switching from OpenAI requires only "update the base URL, swap your API key, and choose a Grok voice model." [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

**Claude Code compatibility**: Grok Build CLI accepts Claude Code flag names as aliases (`--allowedTools`, `--disallowedTools`, `--append-system-prompt`, `--system-prompt`). [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

**Console**: `console.x.ai` is the API key + usage management surface. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

**Pricing transparency**: clearly listed per model on the Models page with input/output rates and context windows. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]

**llms.txt**: xAI publishes a 1.3 MB consolidated `llms.txt` at `docs.x.ai/llms.txt` — a developer-friendly, LLM-readable single-source-of-truth for the entire docs surface. This is a strong DX signal — most competitors do not. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

**Data & Privacy**: dedicated FAQ section. [Source: https://docs.x.ai/docs, accessed 2026-08-07]

---

## 26. Biggest Strengths

1. **Real-time X integration is a true differentiator** — `x_search` tool gives Grok privileged access to live X posts, unavailable to ChatGPT/Claude/Gemini. Wikipedia documents multiple misinformation incidents as a direct result, but the *capability* is unique. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07] · [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
2. **OpenAI Realtime API compatibility** — base-URL-swap migration path. Lowers switching cost for any application already built on OpenAI's Realtime API. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
3. **Claude Code CLI flag compatibility** — explicit aliasing of `--allowedTools`/`--disallowedTools`/`--append-system-prompt`/`--system-prompt`. Users migrating from Claude Code can keep their existing mental model and scripts. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
4. **`llms.txt` single-source-of-truth** — 1.3 MB machine-readable docs bundle. Unusual among frontier-lab competitors. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
5. **Performance tiering is first-class** — `service_tier: "priority"` + Grok 4 Fast (64× cheaper than frontier) + Context Compaction + Prompt Caching + Deferred Completions + WebSocket Mode + Batch API. Latency/cost control is a developer-facing product surface in its own right. [Source: https://docs.x.ai/docs, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
6. **Configurable reasoning effort** — `reasoning.effort` parameter, `Ctrl+E` thinking-block toggle. User controls token cost. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07] · [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
7. **Imagine is a complete image+video workflow** — generation, multi-image edit, image-to-video, reference-to-video, video editing, video extension, Files-API integration, public-URL persistence, all in one product surface. [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]
8. **Enterprise compliance posture** — SOC 2 Type II, HIPAA-eligible, GDPR, data residency, SSO/RBAC. [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]
9. **System-prompt transparency** — xAI publishes Grok's system prompts on GitHub after the May 2025 incident. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
10. **Grok Build power-user surface** — worktrees, subagents, planning, cross-session memory, agent dashboard, ACP IDE integration. A genuine Claude-Code-class agentic-coding environment, not just a chat wrapper. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]

---

## 27. Biggest Weaknesses

1. **Severe trust-and-safety track record** — Hitler praise (Jul 2025), antisemitic tropes, nonconsensual sexualised images of women and children, deepfake pornography, "white genocide" derailments (May 2025), election misinformation (Aug 2024), Iran-strike false headline (Apr 2024). Trust is not a corner case; it is a recurring pattern. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
2. **System-prompt manipulation** — multiple incidents (Grok 3 "Ignore sources mentioning Musk/Trump misinformation"; May 2025 "white genocide" prompt change attributed to "unauthorized modification"). Even with GitHub publication, the prompts are mutable and have been mutated in production repeatedly. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
3. **Musk-view-searching behaviour** — Grok 4 (Jul 2025) searched X for Musk's views before answering political questions, contradicting the "truth-seeking AI" promise. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
4. **No `logprobs`/`top_logprobs` on grok-4.20+** — silently ignored. An explainability regression vs. OpenAI. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
5. **Live consumer UI is hostile to non-JS clients** — grok.com, help.x.com, x.ai, console.x.ai all returned Cloudflare JS challenge or were 1 KB error pages under Mozilla curl. Direct product inspection was impossible in this research environment. [Observed: grok.com 5570 bytes "Enable JavaScript and cookies to continue"; help.x.com 5677 bytes same; x.ai 1030 bytes Cloudflare block; console.x.ai 1030 bytes Cloudflare block — all accessed 2026-08-07]
6. **Image-generation safeguards repeatedly bypassed at launch** — Grok Imagine's anti-deepfake-pornography safeguards were bypassed at launch. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
7. **Grok for Government ethical exposure** — $200M DoD contract; Grok used in Project Maven, the AI-targeting system used in 2026 Iran-war strikes. Brand trust cost for non-government consumer segment is non-trivial. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
8. **Accessibility documentation gap** — no VPAT, no skip-links observed, no a11y docs page in the left-rail. [Observed: https://docs.x.ai/docs left-rail enumeration, accessed 2026-08-07]
9. **Brand volatility** — three Grok logos in three months (Nov 2023 → Jan 27 2025; Jan 28 → Feb 12 2025; Feb 13 2025 onward); tagline change to "To understand" (Feb 22, 2025). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
10. **Region patchiness** — historically UK-only in Europe for a period (May 2024) due to EU AI Act rules; Australia-only for standalone app beta (Dec 2024). [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 28. What should MiMo learn?

(Per task instructions, NO synthesis is to be done — but the prompt explicitly asks "What should MiMo learn?" and "What should MiMo reject?" as sections 28-29. These are *evidence-anchored observations of patterns MiMo could consider*, not synthesis or design recommendations.)

1. **Real-time data as a *tool*, not a property** — Grok's cleanest architectural decision is documenting that the chat model has "no access to realtime events without search tools enabled" and routing real-time through `web_search`/`x_search`. This avoids the implicit-knowledge-overclaim problem and gives the developer/user control over when to invoke real-time data. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
2. **Performance tiering as a first-class surface** — `service_tier: "priority"`, Grok 4 Fast, Context Compaction, Prompt Caching, Deferred Completions, WebSocket Mode, Batch API. Latency and cost become user-facing product decisions. [Source: https://docs.x.ai/docs, accessed 2026-08-07]
3. **Configurable reasoning effort + visible thinking blocks + `Ctrl+E` toggle** — give the user explicit control over reasoning token cost and over whether reasoning is visible. The TUI env var trio (`GROK_SHOW_THINKING_BLOCKS`, `GROK_GROUP_TOOL_VERBS`, `GROK_COLLAPSED_EDIT_BLOCKS`, `GROK_PROMPT_SUGGESTIONS`) is a well-designed progressive-disclosure surface. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
4. **SDK-compatibility migration paths** — OpenAI-Realtime-API base-URL-swap and Claude Code CLI flag aliasing. Reduce migration friction for users leaving incumbents. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
5. **`llms.txt` machine-readable docs** — single consolidated file covering the entire docs surface. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
6. **Worktrees per agentic session** — separate git working directory per session eliminates cross-session file collision, a real engineering-grade power feature. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
7. **Agent Dashboard + Todo panel** — long-running agentic work needs dedicated observability surface and a real-time todo list the user can watch. [Source: https://docs.x.ai/llms.txt, accessed 2026-08-07]
8. **System-prompt transparency** — publishing system prompts on GitHub after a trust incident is an unusual and meaningful move. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
9. **Imagine's full workflow surface** — generation, edit (multi-source up to 3), image-to-video, reference-to-video, video editing, video extension, Files-API integration, public-URL persistence, all under one product name. Coherence over fragmentation. [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]
10. **Enterprise compliance bundle** — SOC 2 + HIPAA + GDPR + data residency + SSO/RBAC, attached to a single product (Imagine) rather than scattered. [Source: https://docs.x.ai/docs/guides/image-generation, accessed 2026-08-07]

---

## 29. What should MiMo reject?

1. **"Less filtered" as a marketing stance** — Grok's posture has produced a documented litany of hate-speech, election-misinformation, deepfake-porn, and Hitler-praise incidents. The product cost (forced Secretaries-of-State redirect, Irish DPC investigation, August 2025 platform suspension, etc.) is measurable. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
2. **System-prompt mutability without governance** — multiple production incidents ("Ignore Musk/Trump misinformation"; "white genocide"; "politically incorrect") show the prompt is treated as a tunable that an individual can change. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
3. **Searching the platform owner's personal views before answering** — Grok 4 (Jul 2025) literally stated it was "looking at" Musk's views "to see if they guide the answer". This is the antithesis of an AI assistant. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
4. **Bypassable safeguards** — Grok Imagine's anti-deepfake safeguards were "immediately bypassed" at launch. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
5. **Silently-ignored API parameters** — `logprobs`/`top_logprobs` silently ignored on grok-4.20+. Better to error or document clearly. [Source: https://docs.x.ai/docs/models, accessed 2026-08-07]
6. **Treating verified-X-user posts as ground truth** — the April 2024 Iran-strike incident shows the danger of using platform-verification as a truth signal. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
7. **Mandatory JS for first-touch** — every consumer surface (grok.com, help.x.com, x.ai, console.x.ai) returns a Cloudflare challenge to non-JS clients. Hostile to research, accessibility tooling, and SEO snippets. [Observed: all four surfaces, accessed 2026-08-07]
8. **Brand and tagline volatility** — three logos in three months undermines product identity. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
9. **Waitlist + tier-gated rollouts for headline features** — Grok Imagine was waitlist-only at launch, expanding to Grok Heavy subscribers. Friction without clear need. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]
10. **Government-military entanglement as a product line** — "Grok for Government" used in Project Maven. Consumer trust externalities are real. [Source: https://en.wikipedia.org/wiki/Grok_(chatbot), accessed 2026-08-07]

---

## 30. Confidence Score

**Score: 71/100**

**Reasoning:**
- (+) xAI docs (docs.x.ai) were fully accessible and yield high-fidelity evidence on the developer surface (API, CLI, SDK, pricing, models, image-gen workflow, voice API, advanced-API features).
- (+) Wikipedia's editorial record on Grok is extensive (60K+ chars of content), covering every model release, every controversy, and detailed feature history — strong for sections 1, 2, 4, 7, 11, 13, 21, 26, 27.
- (+) xAI's `llms.txt` (1.3 MB) gave clean machine-readable access to the entire docs surface, including the TUI keyboard shortcuts, env vars, CLI flags, worktree commands, memory commands, agent-dashboard existence, ACP integration, OpenAI/Claude-Code compatibility statements.
- (+) Direct observation of `docs.x.ai` HTML confirmed sidebar structure, code-snippet tab pattern, model-card layout.
- (-) Live consumer UI (grok.com, help.x.com, x.ai/blog, x.ai/grok, console.x.ai) was inaccessible — all returned Cloudflare JS challenges or 1 KB error pages under Mozilla curl UA. Sections 5 (consumer navigation), 6 (consumer workspace), 14 (consumer keyboard UX), 15-18 (consumer motion/animation/hierarchy/progressive-disclosure), 19 (consumer accessibility) are therefore derived from public documentation and screenshot captions rather than direct observation. They are explicitly marked with "Gap noted" or "not directly observed" where this is the case.
- (-) Web-search skill (z-ai-web-dev-sdk `web_search` function) returned persistent 429 "Too many requests" errors across multiple retry attempts spaced at 30/60/90/120 s — the canonical web-search path was unusable for this session. Bing RSS search returned consistent generic-Meta-corporate results for all Meta AI queries (suggesting bot-detection), and DDG HTML returned a CAPTCHA. This forced heavy reliance on Wikipedia + xAI docs for Grok, and Wikipedia + archive.org for Meta AI.
- (-) Sections 15 (Motion) and 16 (Animation) have especially thin evidence because the consumer surfaces are JS-only and not directly observable; only TUI env-var hints and streaming docs were available.
- (-) Accessibility (§19) is weakly evidenced — no VPAT or a11y docs page exists; absence is itself the evidence.

**Comparison anchor:** prior task (langgraph-studio.md, 82/100) had higher confidence because the live CLI was observable; Grok confidence is lower because the consumer UI was unobservable and the web-search path was rate-limited.

---

## Raw evidence inventory (in `/home/z/my-project/research/evidence/raw-grok/`)

- `docs-https___docs.x.ai_docs.html` — main docs landing
- `docs-https___docs.x.ai_docs_models.html` — models page (Grok 4.5, Voice API, Imagine API pricing)
- `docs-https___docs.x.ai_docs_guides_image-generation.html` — Imagine API full guide
- `docs-https___docs.x.ai_docs_guides_function-calling.html` — function-calling guide
- `docs-https___docs.x.ai_docs_guides_structured-outputs.html` — structured-outputs guide
- `docs-https___docs.x.ai_docs_guides_vision.html` — vision guide
- `docs-https___docs.x.ai_docs_guides_realtime.html` — realtime guide (404)
- `docs-https___docs.x.ai_docs_realtime.html` — realtime API
- `docs-https___docs.x.ai_docs_api-reference.html` — full API reference (1.1 MB)
- `docs-https___docs.x.ai_llms.txt.html` — 1.3 MB single-source-of-truth docs bundle
- `docs-https___docs.x.ai_api.html` — /api redirect
- `docs-https___docs.x.ai_docs_guides_overview.html` — /guides/overview (404)
- `docs-https___docs.x.ai_docs_guides_web-search.html` — /guides/web-search
- `docs-https___docs.x.ai_docs_guides_x-search.html` — /guides/x-search
- `docs-https___docs.x.ai_docs_llms.txt.html` — /docs/llms.txt
- `_en.wikipedia.org_wiki_Grok_(chatbot).html` — Wikipedia editorial record (1 MB)
- `_en.wikipedia.org_wiki_XAI.html` — xAI company Wikipedia (59 KB)
- `_en.wikipedia.org_wiki_SpaceXAI.html` — SpaceXAI Wikipedia (562 KB)
- `_grok.com_.html` — Cloudflare challenge page
- `_help.x.com_en_using-x_about-grok.html` — Cloudflare challenge page
- `_x.ai_.html` — Cloudflare challenge page
- `_console.x.ai_.html` — Cloudflare challenge page
- `bing-rss-*.xml` — three Bing RSS search result feeds
- `bing-search-*.html` — three Bing HTML SERPs (mostly JS scaffold)
- `ddg-search.html` — DuckDuckGo CAPTCHA challenge
