# DeepSeek (Product)

> Evidence-first research file. DeepSeek = the chat product (chat.deepseek.com), the API platform (platform.deepseek.com), and the underlying open-weight models (DeepSeek-V3 / R1 / V3.1 / V4-Flash / V4-Pro). Focus per task brief: the chat product UX + DeepSeek-R1's exposed chain-of-thought as an explainability exemplar.

---

## 1. Product Overview

DeepSeek is a Chinese AI lab and consumer chat product (chat.deepseek.com) plus an OpenAI/Anthropic-compatible API platform (platform.deepseek.com). The home page (`deepseek.com`, retrieved Aug 7 2026) advertises: "🎉 DeepSeek-V4-Flash 正式版 API 已上线公测，Agent 能力大幅增强；V4-Pro 暂未变动" → in English: "DeepSeek-V4-Flash API is now in public beta, agent capabilities significantly enhanced; V4-Pro unchanged." The product surfaces are: **DeepSeek App** (mobile), **DeepSeek 网页版** (web), and **开放平台 API** (open API platform). [Source: https://www.deepseek.com, accessed 2026-08-07]

The API now exposes two flagship models: `deepseek-v4-flash` (DeepSeek-V4-Flash-0731) and `deepseek-v4-pro`, both with **1M context length**, **384K max output**, **JSON Output**, **Tool Calls**, **Responses API** (flash only), **Anthropic API** format support, and **Chat Prefix Completion (Beta)** / **FIM Completion (Beta)**. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

The research lineage is published as open weights: DeepSeek-V3 (Dec 2024, MoE 671B/37B-active), DeepSeek-R1 (Jan 2025, reasoning model trained via RL with exposed chain-of-thought), distilled into 1.5B/7B/8B/14B/32B/70B Qwen2.5 / Llama-3 checkpoints. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README, accessed 2026-08-07; https://arxiv.org/abs/2501.12948, accessed 2026-08-07]

## 2. Product Philosophy

Two co-existing philosophies: (1) **Open weights as commodity infrastructure** — DeepSeek-V3 paper section 1 explicitly describes the model as "a strong Mixture-of-Experts (MoE) language model with 671B total parameters with 37B activated for each token" requiring "only 2.788M H800 GPU hours" for full training, a deliberate cost-compression stance. [Source: https://github.com/deepseek-ai/DeepSeek-V3 README, accessed 2026-08-07] (2) **Open chain-of-thought as default UX** — DeepSeek-R1's release README states: "We directly apply reinforcement learning (RL) to the base model without relying on supervised fine-tuning (SFT)… This approach allows the model to explore chain-of-thought (CoT) for solving complex problems… DeepSeek-R1-Zero demonstrates capabilities such as self-verification, reflection, and generating long CoTs." [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §2, accessed 2026-08-07]

The chat product (per home page) markets itself as "与 DeepSeek 免费对话 — 体验全新旗舰模型" ("Free conversation with DeepSeek — experience the new flagship model"), making free chat access a strategic customer-acquisition lever for the paid API. [Source: https://www.deepseek.com, accessed 2026-08-07]

## 3. Core Mental Model

The DeepSeek mental model is **"reasoning is a first-class artifact, not a hidden step"**. The API exposes a `thinking` parameter (`{"type": "enabled"}`) and a `reasoning_effort` parameter (`"high"`) at the request level — turning reasoning on/off and dialing its depth are explicit user choices baked into the chat-completions payload. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

For the user, this means the chat product surfaces the model's chain-of-thought as visible content — not as a debug trace but as the response itself. The R1 README notes this comes with known tradeoffs: "DeepSeek-R1-Zero encounters challenges such as endless repetition, poor readability, and language mixing" — the published product UX inherits the burden of making long, sometimes-messy CoTs scannable. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §1, accessed 2026-08-07]

## 4. User Journey

Documented for the API surface: register → apply for API key → set `base_url=https://api.deepseek.com` (OpenAI format) or `https://api.deepseek.com/anthropic` (Anthropic format) → choose `deepseek-v4-flash` or `deepseek-v4-pro` → optionally toggle `thinking` and `reasoning_effort`. The docs explicitly mention integration with **Claude Code, GitHub Copilot, OpenCode** as drop-in agent/coding backends: "If you use tools like Claude Code, GitHub Copilot, or OpenCode, you can use DeepSeek as the backend model directly — no code required." [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

Chat surface journey (chat.deepseek.com): the page is a JS shell — primary HTML is empty (0 bytes on direct curl of `chat.deepseek.com`), confirming a SPA-first delivery. UNVERIFIED: per-session conversation history, sidebar, model-switcher specifics not directly extractable without browser rendering. [Source: curl of https://chat.deepseek.com returned 0 bytes (SPA shell), accessed 2026-08-07]

## 5. Navigation

API docs navigation (left sidebar, primary source): "DeepSeek Platform → Quick Start → Your First API Call → Models & Pricing → Token & Token Usage → Rate Limit & Isolation → Error Codes → Agent Integrations → API Guides → Thinking Mode → Multi-round Conversation → Chat Prefix Completion (Beta) → FIM Completion (Beta) → JSON Output → Tool Calls → Context Caching → Using the Responses API → Using the Anthropic API → API Reference → News → Other Resources → FAQ → Change Log". [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

The home page (deepseek.com) has a top-level split: 探索未至之境 / 开始对话 (Start conversation, free chat) / API 开放平台 (API platform) / 加入 DeepSeek (jobs). Footer surfaces research lineage: "DeepSeek R1 · DeepSeek V3 · DeepSeek Coder V2 · DeepSeek VL · DeepSeek V2 · DeepSeek Coder · DeepSeek Math · DeepSeek LLM" and product: "DeepSeek App · DeepSeek 网页版 · 开放平台 · API · 价格 · 服务状态". [Source: https://www.deepseek.com, accessed 2026-08-07]

## 6. Workspace

The chat workspace itself (chat.deepseek.com) is a SPA — UNVERIFIED via direct curl (0 bytes; content rendered client-side). Known from secondary context (home page marketing) and shared R1 inference behavior: the workspace is single-conversation-threaded with optional model selection and visible CoT. UNVERIFIED: specifics of multi-chat sidebar, fork branch, saved prompts. [Source: https://www.deepseek.com, accessed 2026-08-07; https://chat.deepseek.com returned empty body, accessed 2026-08-07]

The API "workspace" is the developer's IDE / agent client (Claude Code, Copilot, OpenCode) pointed at `api.deepseek.com` — there is no hosted developer playground visible at `platform.deepseek.com` (returned 0 bytes via curl). [Source: https://platform.deepseek.com returned 0 bytes (SPA shell), accessed 2026-08-07]

## 7. Conversation

API-level conversation primitives: standard OpenAI-style `chat/completions` with `messages` array; supports multi-round (separate doc page), JSON output, tool calls, **Context Caching** (separate doc page) — meaning repeated prompts reuse KV-cache for cost reduction (cache-hit price $0.0028/1M input tokens vs $0.14/1M cache-miss for `deepseek-v4-flash`). [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

**Chat Prefix Completion (Beta)** — separate doc page exists; lets the developer supply a prefix the model must continue from, useful for steering output format. **FIM Completion (Beta)** (Fill-In-the-Middle) is non-thinking-mode only — explicitly used for code-completion style workflows. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

## 8. Agent Experience

DeepSeek is explicitly designed as a **backend model for agent tools**, not as an end-user agent. The docs say: "The DeepSeek API is supported by many popular AI agent and coding assistant tools. If you use tools like Claude Code, GitHub Copilot, or OpenCode, you can use DeepSeek as the backend model directly — no code required." [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

The API exposes `Responses API` (OpenAI-format, flash model only currently — pro support scheduled "early August 2026" per pricing footnote 1) — enabling agentic multi-turn loops with tool calls. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

For the chat product: the home page advertises "Agent 能力大幅增强" (Agent capabilities significantly enhanced) for V4-Flash. UNVERIFIED: whether chat.deepseek.com itself exposes agentic tool-use UI or whether the "agent" claim refers only to the API consumer. [Source: https://www.deepseek.com, accessed 2026-08-07]

## 9. Memory

API has explicit **Context Caching** as a first-class billing primitive: cache-hit price $0.0028/1M (flash) / $0.003625/1M (pro) vs cache-miss $0.14/1M (flash) / $0.435/1M (pro) — a 50–120× cost reduction for cached prefixes, designed for agents with long stable system prompts. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

Context length: **1M tokens** for both V4-Flash and V4-Pro, max output **384K** — large enough to host a long-running agent's full conversation history in-context. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

Chat product memory (chat.deepseek.com): UNVERIFIED — SPA; specifics of cross-session memory, "pinned" facts, or user profile carryover not extractable without browser rendering. [Source: https://chat.deepseek.com returned empty, accessed 2026-08-07]

## 10. Knowledge

The DeepSeek product does NOT expose a personal knowledge base / second-brain feature in any verified primary source. R1 / V3 are general-purpose models; the V3 README notes pre-training on "14.8 trillion diverse and high-quality tokens" with no productized RAG layer mentioned. [Source: https://github.com/deepseek-ai/DeepSeek-V3 README §1, accessed 2026-08-07]

UNVERIFIED: whether chat.deepseek.com has file-upload, project-scoped knowledge, or document-grounding UI — SPA prevents direct verification via curl.

## 11. Search

The product does not expose a dedicated search interface. The API exposes **Tool Calls** as the mechanism by which an external agent (Claude Code, etc.) can plug in search. The chat product inherits web-search behavior only if the user-facing UI surfaces it; UNVERIFIED via direct curl. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

## 12. Execution

API execution model: synchronous (or streaming) request/response over HTTPS. The concurrency limits are published: **2,500 concurrent requests** for `deepseek-v4-flash`, **500 concurrent requests** for `deepseek-v4-pro`. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

A pricing footnote warns of an imminent price increase: "We plan to raise the overall pricing for DeepSeek API services in the near future, with a significant increase expected. Please plan your usage accordingly. The specific pricing plan will be subject to official notice." [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

## 13. Artifacts

The chat product's primary artifact is **the conversation itself**, including the visible chain-of-thought. The R1 paper abstract (arXiv 2501.12948, v1 submitted 22 Jan 2025) frames this as the core contribution: "General reasoning represents a long-standing and formidable challenge in artificial intelligence. Recent breakthroughs, exemplified by large language models (LLMs) and chain-of-thought prompting…" — R1 is the productized artifact of "incentivizing reasoning capability via RL". [Source: https://arxiv.org/abs/2501.12948, accessed 2026-08-07]

API artifacts: JSON responses, tool-call payloads, Chat-Prefix-Completed continuations. V3 also pioneered **Multi-Token Prediction (MTP)** as a training objective that "can also be used for speculative decoding for inference acceleration" — an artifact with execution implications. [Source: https://github.com/deepseek-ai/DeepSeek-V3 README §2, accessed 2026-08-07]

## 14. Keyboard UX

UNVERIFIED — chat.deepseek.com is a SPA; keyboard affordances (Cmd-K, slash commands, prompt-history navigation) not extractable from server-rendered HTML. [Source: https://chat.deepseek.com returned empty, accessed 2026-08-07]

## 15. Motion

UNVERIFIED — SPA. Per the home page hero ("探索未至之境" / "Explore the unexplored"), the brand visual language uses a starfield/space motif — implying motion design around exploration themes, but specifics of loading transitions, streaming-text animations, or reasoning-trace folding not directly verifiable. [Source: https://www.deepseek.com, accessed 2026-08-07]

## 16. Animation

UNVERIFIED — SPA. The home page is heavy JS / React-like shell (172KB raw HTML for genspark-adjacent competitor; deepseek home is 100KB with visible text content "DeepSeek | 深度求索"). [Source: https://www.deepseek.com, accessed 2026-08-07]

## 17. Visual Hierarchy

Home page hierarchy (verified): (1) bilingual hero "DeepSeek | 深度求索" + tagline "欢迎加入我们，我们投身于探索 AGI 的本质" (Welcome — we dedicate ourselves to exploring the essence of AGI); (2) primary CTAs "开始对话 与 DeepSeek 免费对话" (Start conversation — free with DeepSeek) and "API 开放平台 调用 DeepSeek 最新模型 快速集成、流畅体验" (API platform — call DeepSeek's latest models, fast integration, smooth experience); (3) recruitment CTA "加入 DeepSeek 共赴星辰大海" (Join DeepSeek, together to the sea of stars); (4) footer with research lineage and product list. [Source: https://www.deepseek.com, accessed 2026-08-07]

## 18. Progressive Disclosure

API docs (Docusaurus SPA, 45KB shell per page): progressive disclosure is conventional doc-site pattern — left-rail navigation, on-page anchors, expandable code blocks (curl/python/nodejs tabs). The `Thinking Mode` doc is a separate top-level page rather than buried under API Guides — signaling reasoning is a first-class concept. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

## 19. Accessibility

UNVERIFIED — no WCAG / a11y statement located in fetched primary sources. The home page and API docs both render via JS-heavy SPAs, which is a baseline accessibility risk if not explicitly handled. The API docs do include the standard Docusaurus "Skip to main content" affordance. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

## 20. Performance Perception

The API explicitly markets **cache hits** as a performance lever: cache-hit input pricing is **50× cheaper** than cache-miss ($0.0028 vs $0.14 per 1M tokens for flash). This reframes "fast" as "cached" — a UX-relevant billing disclosure that lets developers architect for perceived speed. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

V3's MTP design (speculative decoding) is a training-time choice with inference-time speedup consequences — a model-level performance optimization inherited by all downstream chat products. [Source: https://github.com/deepseek-ai/DeepSeek-V3 README §2, accessed 2026-08-07]

## 21. Trust

Trust levers: (1) **Open weights** — R1 (671B/37B-active), R1-Zero, V3-Base, V3, and 6 distilled checkpoints (1.5B–70B on Qwen2.5 / Llama-3) all published to Hugging Face per the R1 README §3. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README, accessed 2026-08-07] (2) **Reproducible claims** — V3 README explicitly reports "2.788M H800 GPU hours" with no "irrecoverable loss spikes or rollbacks". [Source: https://github.com/deepseek-ai/DeepSeek-V3 README §1, accessed 2026-08-07]

Trust risks: (1) Imminent price-increase footnote ("significant increase expected") without specifics — erodes billing predictability. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07] (2) The footer of `deepseek.com` lists Chinese corporate registration (杭州深度求索人工智能基础技术研究有限公司, 浙ICP备2023025841号) — for non-Chinese users this raises data-residency / sovereignty questions; UNVERIFIED whether the chat product offers regional routing.

## 22. Explainability

**DeepSeek-R1's exposed chain-of-thought is the canonical explainability exemplar.** The arXiv abstract frames it: "We introduce our first-generation reasoning models, DeepSeek-R1-Zero and DeepSeek-R1… DeepSeek-R1-Zero, a model trained via large-scale reinforcement learning (RL) without supervised fine-tuning (SFT)… demonstrated remarkable performance on reasoning. With RL, DeepSeek-R1-Zero naturally emerged with numerous powerful and interesting reasoning behaviors." [Source: https://arxiv.org/abs/2501.12948, accessed 2026-08-07]

The API exposes this as a **user-controllable toggle** (`thinking: {type: "enabled"}`) and **depth dial** (`reasoning_effort: "high"`) — turning explainability on/off is a runtime choice, not a model-version choice. This is a stronger explainability affordance than competitors that bake reasoning invisibly into the response. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

The R1 README is transparent about CoT's downsides: "endless repetition, poor readability, and language mixing" — an honesty signal that the explainability is real (messy) rather than polished-and-fake. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §1, accessed 2026-08-07]

## 23. Long Session Experience

API supports **1M-token context** for both flash and pro models, with **384K max output** — designed for long agent sessions where the entire transcript can stay in-context. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

**Context Caching** (separate doc page) means long sessions with stable system prompts become 50× cheaper to extend — an explicit long-session economics lever. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

UNVERIFIED: chat.deepseek.com's behavior at long context (UI pagination, truncation warnings, summarization prompts) — SPA prevents verification. [Source: https://chat.deepseek.com returned empty, accessed 2026-08-07]

## 24. Power User Features

- **Chat Prefix Completion (Beta)** — let developer force a prefix the model continues from. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]
- **FIM Completion (Beta)** — Fill-In-the-Middle code completion, non-thinking-mode only. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]
- **Anthropic API format** at `https://api.deepseek.com/anthropic` — drop-in replacement for Claude API consumers. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]
- **Responses API** (OpenAI-format, flash only currently) — for multi-step agentic loops. [Source: https://api-docs.deepseek.com/quick_start/pricing footnote 1, accessed 2026-08-07]
- **Per-request `reasoning_effort`** — dial reasoning depth per call. [Source: https://api-docs.deepseek.com/quick_start/pricing code sample, accessed 2026-08-07]
- **2,500 concurrency on flash / 500 on pro** — published limits, not black-boxed. [Source: https://api-docs.deepseek.com/quick_start/pricing footnote 3, accessed 2026-08-07]

## 25. Developer Experience

DX is the strongest surface. (1) **OpenAI + Anthropic dual compatibility** (single `base_url` change) — eliminates SDK lock-in. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07] (2) **Documented agent-tool integration** with Claude Code / GitHub Copilot / OpenCode as named, supported first-class clients. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07] (3) **Transparent pricing table** with cache-hit vs cache-miss split, per-model concurrency, footnote about future price change. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07] (4) **Open-weight model cards** on GitHub with model downloads, evaluation tables, and distillation recipes. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §3, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Open weights at frontier scale** — R1 (671B/37B) and 6 distilled variants (1.5B–70B) all on Hugging Face. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §3, accessed 2026-08-07]
2. **Open chain-of-thought as API toggle** — `thinking: enabled` + `reasoning_effort: high` are runtime parameters, not separate SKUs. [Source: https://api-docs.deepseek.com/quick_start/pricing code sample, accessed 2026-08-07]
3. **Radical cost compression** — V3 trained on 2.788M H800 hours (vs industry estimates of 10×+ for GPT-4-class); API pricing $0.14/$0.28 per 1M in/out tokens (flash) at cache-miss. [Source: https://github.com/deepseek-ai/DeepSeek-V3 README §1; https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]
4. **1M context + 384K output** at both model tiers. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]
5. **Dual API compatibility** (OpenAI + Anthropic) — drop-in for existing agent stacks. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Chat product UI is opaque to outside inspection** — chat.deepseek.com returns 0 bytes via curl (SPA shell); specifics of memory, search, multi-chat management UNVERIFIED from primary sources. [Source: https://chat.deepseek.com curl returned 0 bytes, accessed 2026-08-07]
2. **CoT readability is acknowledged-bad** — R1 README admits "endless repetition, poor readability, and language mixing" for R1-Zero; R1 mitigates but does not eliminate. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §1, accessed 2026-08-07]
3. **Pricing instability signaled without specifics** — "significant increase expected" footnote makes budgeting uncertain. [Source: https://api-docs.deepseek.com/quick_start/pricing footnote 2, accessed 2026-08-07]
4. **Asymmetric feature parity** — Responses API is flash-only (pro support "early August 2026"); FIM and Chat-Prefix-Completion are Beta; thinking-mode toggling works on both but exposes only one knob for depth (`reasoning_effort: high` — no documented `low/medium` granularity). [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]
5. **Sovereignty / data-residency opacity** — corporate entity is Chinese (杭州深度求索…); no documented regional routing or data-processing locale. [Source: https://www.deepseek.com footer, accessed 2026-08-07]

## 28. What should MiMo learn? (evidence-based)

1. **Expose reasoning as a runtime toggle, not a separate model SKU** — DeepSeek's `thinking: {type: "enabled"}` + `reasoning_effort` is the cleanest reasoning-on/off affordance in the market. MiMo should let the user dial reasoning depth per-turn without switching models. [Source: https://api-docs.deepseek.com/quick_start/pricing code sample, accessed 2026-08-07]
2. **Bill cache-hits explicitly** — the 50× cache-hit discount turns "the model remembers" from a hidden feature into a visible cost lever. MiMo should expose cache-hit status in the UI as a trust + economy signal. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]
3. **Dual API compatibility** — supporting both OpenAI and Anthropic request formats at one `base_url` doubled the addressable agent ecosystem with one engineering decision. [Source: https://api-docs.deepseek.com/, accessed 2026-08-07]
4. **Open weights as a trust moat** — by publishing the 1.5B/7B/8B/14B/32B/70B distills, DeepSeek commoditized the reasoning layer and made its API the cheapest credible option. MiMo should consider which layer it open-sources for parity-of-trust. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §3, accessed 2026-08-07]
5. **Long context as the default, not an upsell** — 1M context + 384K output at the cheapest tier is a deliberate "long sessions are first-class" stance. [Source: https://api-docs.deepseek.com/quick_start/pricing, accessed 2026-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **Opaque SPA chat UI** — chat.deepseek.com returns empty body to non-JS clients; this fails basic link-preview / crawler / accessibility use cases. MiMo should server-render at least the conversation shell. [Source: https://chat.deepseek.com curl returned 0 bytes, accessed 2026-08-07]
2. **Vague price-increase warnings** — the "significant increase expected" footnote is a trust leak; MiMo should commit to pricing windows with explicit grandfathering terms. [Source: https://api-docs.deepseek.com/quick_start/pricing footnote 2, accessed 2026-08-07]
3. **Asymmetric feature parity across model tiers** — Responses-API on flash-only is a known footgun; MiMo should ship platform features simultaneously across all model tiers. [Source: https://api-docs.deepseek.com/quick_start/pricing footnote 1, accessed 2026-08-07]
4. **Acknowledge-bad CoT without UI mitigation** — R1 README admits CoT has "poor readability" but the product does not appear (UNVERIFIED) to surface scannable / collapsible CoT affordances in the chat UI. MiMo must do better: foldable reasoning traces, summarization on demand, side-by-side answer-vs-reasoning views. [Source: https://github.com/deepseek-ai/DeepSeek-R1 README §1, accessed 2026-08-07]
5. **Sovereignty opacity** — Chinese corporate registration with no documented regional routing will repel some segments. MiMo should publish a data-flow map. [Source: https://www.deepseek.com footer, accessed 2026-08-07]

## 30. Confidence Score

**Confidence: 72 / 100**

Reasoning:
- **Strong (85+)**: API surface claims — pricing, models, context length, concurrency limits, agent-tool integrations — all directly extracted from `api-docs.deepseek.com` (Docusaurus-rendered, 45KB pages with full text).
- **Strong (85+)**: Model facts — V3 (671B/37B MoE, 2.788M H800 hours, MTP, FP8 training, R1 distillation), R1 (RL-trained, exposed CoT, distills to 1.5B–70B) — all from raw GitHub README markdown (not SPA-rendered).
- **Weak (40)**: Chat product UX (sections 6, 14, 15, 16, 19) — chat.deepseek.com is a pure SPA returning 0 bytes via curl; UI claims rely on home-page marketing copy and are otherwise UNVERIFIED.
- **Weak (45)**: Long-session UI behavior (section 23), accessibility (section 19), motion / animation / keyboard UX (sections 14–16) — same SPA opacity.
- **Medium (60)**: Strategic / DX inferences — derived from pricing-page footnotes and README framing, not from product-team interviews.
- Files saved under `/home/z/my-project/research/evidence/raw-deepseek/`: api-docs-home.html, api-usage.html, home.html, pricing.html, r1-news.html, r1-paper-arxiv.html, r1-readme.html, r1-readme-raw.md, v3-paper-arxiv.html, v3-readme.html, v3-readme-raw.md, v31-news.html, v31-news2.html, news-v31.html, platform.html, chat.html (empty), chat-signin.html, chat-wayback.html, thinking-mode.html, kv-cache.html.

---

*File: /home/z/my-project/research/evidence/deepseek.md*
*Task: FINAL-FILL*
*Compiled: 2026-08-07*
