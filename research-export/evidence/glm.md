# GLM (Zhipu AI / Z.ai) — Evidence-First Product Research

**Product:** GLM model family + Z.ai platform (chatglm.cn, z.ai, docs.z.ai)
**Task ID:** W1b
**Phase:** R2 — Evidence-Based
**Author:** Senior Product Researcher (general-purpose sub agent)
**Date compiled:** 2026-08-07
**Method:** All claims cited with `[Source: <URL>, accessed 2026-08-07]`. Cached raw HTML in `research/evidence/raw-glm/`, clean text in `research/evidence/raw-glm/text/`. web_search returned persistent HTTP 429 across all attempts (initial + 30-second retry); per task instructions, fell back to `curl -sL -A "Mozilla/5.0..."` on known official URLs. The Z.ai developer documentation at `docs.z.ai` is statically served (Mintlify) and is the most reliable source — extracted 8–22KB clean text per page. The Z.ai marketing homepage `z.ai` returns only a 53-byte visible text body plus an SEO meta description; it is JS-rendered SPA-only. The Chinese ChatGLM page `chatglm.cn` is also JS-rendered and returned a 4-byte visible body; this is an explicit evidence gap.

---

## 1. Product Overview

Z.ai (formerly Zhipu AI until July 2025 rebrand) is a Chinese generative-AI company originating from Tsinghua University's Knowledge Engineering Group, now ~800 people (60–70% in R&D). [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

The consumer/developer product surface is the **GLM model family** on the Z.ai platform. As of 2026-08-07, the active text-model lineup includes: GLM-5.2 (flagship, "HOT"), GLM-5.1, GLM-5, GLM-5-Turbo, GLM-4.7, GLM-4.7-FlashX, GLM-4.7-Flash, GLM-4.6, GLM-4.5, GLM-4.5-X, GLM-4.5-Air, GLM-4.5-AirX, GLM-4.5-Flash, GLM-4-32B-0414-128K — **14 text-model variants** in a single picker. Plus vision models (GLM-5V-Turbo, GLM-4.6V, GLM-OCR, GLM-4.6V-FlashX, GLM-4.5V, GLM-4.6V-Flash) and image/video/audio/agent products. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

The Z.ai homepage tagline (per SEO meta description) is: "Meet Z.ai, the AI assistant powered by GLM-5.2. Build websites, write code, handle long-horizon tasks, and get instant answers. Fast, smart, and reliable." [Source: https://z.ai/, accessed 2026-08-07 — meta description tag in raw HTML]

The Chinese consumer brand is **ChatGLM/清言** at `chatglm.cn` — meta description: "基于 GLM 大模型，不只是 AI 助手，更是能帮你把事办成的 Agent。从理解目标到调用工具、从拆解任务到执行交付…" ("Based on GLM, not just an AI assistant, but an Agent that gets things done. From understanding goals to invoking tools, from decomposing tasks to delivery"). [Source: https://chatglm.cn/, accessed 2026-08-07 — meta description in raw HTML]

## 2. Product Philosophy

Per CEO Zhang Peng: "Let machines think like humans" is the company's slogan, equating this with AGI; he asserted "2024 will be the first year of AGI". [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

In July 2026 Z.ai outlined a "Touch High" initiative with four "engines" for the next two years: **(1) Long-horizon tasks** ("move beyond instant answers and execute large projects over days, weeks, or even months. This requires stronger memory architectures, planning at the project-level, and the ability to break ambitious goals into thousands of executable subtasks"); **(2) Autonomous agent systems** ("digital employees — Thousands of agents with different professional roles can collaborate, debate, review code, allocate resources"); **(3) Fully self-training AI** (synthetic data, AI-vs-AI competition, self-play); **(4) Safety governance** ("mechanistic interpretability, superalignment, and AI governance"). [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

GLM-5.2 is explicitly positioned as "a flagship model built for the era of long-horizon tasks. With truly usable 1M-token context, it has been tested to handle project-scale engineering context, delivering more stable long-task execution". [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]

GLM-4.7's design philosophy centers on **"task completion" rather than single-point code generation**: "It autonomously accomplishes requirement comprehension, solution decomposition, and multi-technology stack integration starting from target descriptions." [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

The developer-facing docs prominently feature a "Coding Plan" subscription tier that "fully compatible with top coding tools like Claude Code and Cline. Starting from just $10/month." [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

## 3. Core Mental Model

The core mental model is **"model-as-agent with toggleable reasoning"** — every chat completion request carries a `thinking` parameter (`{"type": "enabled"}` or `{"type": "disabled"}`), and within GLM-4.7 a **Turn-Level Thinking** capability lets each request in a multi-turn session independently choose whether to reason. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

Per the docs: "more flexible cost/latency control: For lightweight turns like 'asking a fact' or 'tweaking wording,' you can disable thinking to get faster responses; for heavier tasks like 'complex planning,' 'multi-constraint reasoning,' or 'code debugging,' you can enable thinking to improve accuracy and stability." The model "stays coherent across turns and keeps a consistent output style, making it feel 'smarter when things are hard, faster when things are simple.'" [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

This is philosophically different from Gemini's mode-pickers (Canvas/Deep Research as discrete feature toggles) — GLM treats **reasoning depth itself** as the continuously-variable knob. The product surface for this is the API parameter, not a UI button.

## 4. User Journey

Documented developer onboarding journey (Quick Start):

1. Install SDK: `pip install zai-sdk` (or `pip install zai-sdk==0.2.3`). [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
2. Get API Key from Z.AI Platform. [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
3. Instantiate: `client = ZaiClient(api_key="your-api-key")`. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
4. Call: `client.chat.completions.create(model="glm-4.7", messages=[...], thinking={"type": "enabled"}, max_tokens=4096, temperature=1.0)` with optional `stream=True`. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
5. Tools (e.g., `web_search`) attach via the OpenAI-compatible `tools=[{"type": "function", "function": {...}}]` schema. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
6. Streaming responses carry both `reasoning_content` and `content` deltas; the developer **must return the historical `reasoning_content` to keep the reasoning coherent** for the next turn when using Preserved Thinking. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

End-user (consumer chat) journey is **NOT documented in the docs.z.ai Mintlify site** — `chatglm.cn` is JS-rendered and returned only a 4-byte visible body via curl, and `z.ai` returned only the SEO meta description. **Evidence gap**: end-user onboarding, empty states, and chat UI flows are not captured from primary docs.

## 5. Navigation

**Z.ai developer documentation** uses a standard Mintlify left-sidebar navigation: "Guides / API Reference / Coding Plan / Released Notes / Terms and Policy / Help Center". Within Guides: Get Started (Quick Start, Overview, Pricing, Core Parameters, SDKs Guide, Migrate to GLM-5.2), Language Models (GLM-5.2 HOT → GLM-4-32B), Vision Language Models, Image Generation Models, Video Generation Models, Audio Models, Capabilities (Thinking Mode, Deep Thinking, Streaming Messages, Tool Streaming Output, Function Calling, Context Caching, Structured Output), Tools (Web Search, Stream Tool Call), Agents (GLM Slide/Poster Agent, Translation Agent, Video Effect Template Agent). [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07 — page navigation extracted from sidebar; Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

The consumer chat surfaces (`z.ai`, `chatglm.cn`) are SPA-only; navigation could not be retrieved via curl. **Evidence gap**: consumer chat navigation (sidebar, history, settings) undocumented.

## 6. Workspace

There is **no documented Canvas-like workspace artifact surface** in the Z.ai developer docs. The closest analog is the **GLM Slide/Poster Agent (beta)**: "A Slide & Poster Agent powered by the native capabilities of the GLM model — integrating information retrieval, content structuring, and visual layout design, enabling you to effortlessly create professional-grade slides and posters." Workflow: (1) describe needs in natural language, (2) "Smart Information Gathering: The intelligent agent automatically searches and organizes relevant content", (3) "Slide/Poster Generation: Instantly create visually engaging slides or posters based on curated information." [Source: https://docs.z.ai/guides/agents/slide, accessed 2026-08-07]

GLM-4.7 docs explicitly call out **frontend artifact generation** as a primary use case: "Web UI Generation and Visual Aesthetic Optimization — Significantly enhanced understanding of visual code and UI specifications. GLM-4.7 provides more aesthetically pleasing and consistent default solutions for layout structures, color harmony, and component styling, reducing time spent on repetitive 'fine-tuning' of styles." [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

GLM-5.2 docs describe a **Code-to-Video Loop** workspace: "GLM-5.2 can use the Remotion framework to create videos programmatically with React code, including components, parameters, and animation logic, and then render them into MP4." This is a code-driven video-generation workspace. [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]

## 7. Conversation

Streaming is a documented first-class capability: "Streaming Output — Support real-time streaming responses to enhance user interaction experience." [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-07-07]

The streaming response splits deltas into `reasoning_content` and `content` channels, both consumable via the OpenAI-compatible streaming interface:

```
for chunk in response:
    delta = chunk.choices[0].delta
    if hasattr(delta, "reasoning_content") and delta.reasoning_content:
        reasoning += delta.reasoning_content
    if hasattr(delta, "content") and delta.content:
        content += delta.content
```

[Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

Default Thinking Behaviour: "Thinking is activated by default in GLM-5.2 GLM-5.1 GLM-5 GLM-4.7 series, different from the default hybrid thinking in GLM-4.6." [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

## 8. Agent Experience

Z.ai publicly defends a **single-agent philosophy with toggleable thinking**, NOT a multi-agent orchestration model. Per the Turing Post deep-dive: "GLM-4.7 and GLM-4.7-Flash, with a more practical feature: reasoning can be turned on for difficult tasks and switched off when it is not needed." [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

The "agent" framing is implemented via:
- **Function Calling** ("Powerful tool invocation capabilities, enabling integration with various external toolsets"). [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- **Interleaved Thinking** (since GLM-4.5) — "GLM to think between tool calls and after receiving tool results. This enables more complex, step-by-step reasoning: interpreting each tool output before deciding what to do next, chaining multiple tool calls with reasoning steps." [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Web Search** as a built-in tool (Search Agent, Web Search in Chat, Web Search API). [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
- **Specialized agents** for slides/posters, translation, video-effect templates. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

There is **no documented consumer-facing multi-agent surface** (no Gemini-Gems-style saved agents, no shared-agent marketplace). The "Touch High" roadmap does mention "Thousands of agents with different professional roles can collaborate, debate, review code" — but this is forward-looking strategy, not a current product. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

**CogAgent** is a visual GUI Agent based on the CogVLM architecture, "capable of interpreting and interacting with GUI interfaces through visual modalities for more direct and effective decision-making" — a separate research artifact rather than a consumer product feature. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

## 9. Memory

The Z.ai developer docs document three memory-related capabilities:

- **Context Caching** — "Intelligent caching mechanism to optimize performance in long conversations." Pricing per 1M tokens shows a separate "Cached Input" column (e.g., GLM-5.2: $1.4 input vs $0.26 cached input vs $4.4 output). [Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]
- **Preserved Thinking** — "the model can retain reasoning content from previous assistant turns in the context. This helps preserve reasoning continuity and conversation integrity, improves model performance, and increases cache hit rates—saving tokens in real tasks. This capability is enabled by default on the Coding Plan endpoint and disabled by default on the standard API endpoint." Enable by setting `clear_thinking: false` AND returning the complete unmodified `reasoning_content` back to the API. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **200K / 1M context windows** — GLM-4.7 / 4.6 / 5 / 5.1: 200K context, 128K max output. GLM-5.2: 1M context, 128K max output. GLM-4.5: 128K context. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-4.6, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07; Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

There is **no documented personal memory** of the kind Gemini offers ("Did you use any info from past chats?"). Z.ai's memory is **technical context memory** (cache hits + reasoning preservation), not user-persona memory. [Evidence gap — no consumer-memory feature documented in retrieved docs.]

## 10. Knowledge

Z.ai's knowledge mechanism is **tool-based**, not connected-app-based:

- **Web Search tool** — three layers: Web Search API (structured results), Web Search in Chat (RAG with cited web sources), Search Agent (intelligent search agent). "Through a unified API, offering end-to-end capabilities—from raw web data retrieval and fusion of search results with LLM output, to multi-turn dialogue context management." [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
- **MCP (Model Context Protocol)** support — "Flexibly integrate external MCP tools and data sources to expand application scenarios" (listed as a GLM-5.2 capability). The Web Search docs explicitly document an MCP server: `https://api.z.ai/api/mcp/web_search/sse?Authorization=YOUR API Key`, usable in Cursor 0.45.6+. [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07; Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
- **File uploads / NotebookLM-style notebooks** are NOT documented in the Z.ai developer docs — there is no equivalent to Gemini's per-Gem Knowledge upload or NotebookLM notebook attach. [Evidence gap]

The consumer chat surface (`z.ai`, `chatglm.cn`) presumably supports file upload but this could not be verified via curl. **Evidence gap.**

## 11. Search

Z.ai offers a **dedicated search product line** — three distinct surfaces:

1. **Web Search API** — "Directly obtain structured search results (title/summary/link, etc.)" — features "Intent-Enhanced Retrieval: Intelligently identifies the user's query intent and automatically determines whether web search is needed"; "Structured Output"; "Customizable Search Scope" (count, domain constraints, time ranges, summary lengths); "Time-Aware Output Control" (publish time returned). [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
2. **Web Search in Chat** — "Incorporate search results into large model-generated answers with cited web sources. Seamless Integration of Real-Time Retrieval and LLM Generation." [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
3. **Search Agent** — "intelligent search agents (Search Agent)" — multi-turn dialogue context management. [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]

Pricing: **$0.01 per use** of Web Search (Built-in Tools table). [Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]

The architecture is **deeply structured retrieval** rather than implicit chat grounding — developers get explicit control over search behavior at the API level. This contrasts with Gemini's "Google Search is included as a source by default; deselect if you don't want it" approach.

## 12. Execution

The Z.ai execution model is **single-agent with interleaved reasoning**, explicitly defended publicly:

- GLM-4.7 introduces **Round-Level Reasoning** ("Turn-level Thinking"): "within the same session, each request can independently choose to enable or disable thinking". [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Interleaved Thinking** lets the model "think between tool calls and after receiving tool results. This enables more complex, step-by-step reasoning: interpreting each tool output before deciding what to do next, chaining multiple tool calls with reasoning steps, and making finer-grained decisions based on intermediate results." [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Preserved Thinking** persists reasoning across multi-turn dialogues — "automatically preserves reasoning blocks across multi-turn dialogues, improving cache hit rates and reducing computational costs—ideal for long-term complex tasks." [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

The Turing Post article frames the company's strategy as moving "from general reasoning and coding upgrades to long-horizon agentic engineering" — GLM-5 "for complex systems engineering, coding, and long-running agent tasks", GLM-5.1 "with stronger coding, repo generation, terminal tasks, and better performance over long multi-step sessions", GLM-5.2 "1M-token context window" with "IndexShare techniques, which lets the model reuse the same sparse-attention index across multiple transformer layers... decreases long-context computation by nearly 3×". [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

GLM-5.2 docs explicitly describe execution loops for long tasks: "Long-Horizon Refactoring: It first breaks down the goal, identifies dependencies and risks, then implements, verifies, and closes the task in stages"; "Mobile On-Device Debugging Loop: From Code Implementation to Device Validation... it can use ADB, logcat, screenshots, and runtime logs to locate real-device issues"; "Code-to-Video Loop: From Natural-Language Ideas to a Demo-Ready Video". [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]

There is **no documented "shows thoughts while browsing" UI surface** like Gemini's Deep Research Edit Plan checkpoint — the reasoning transparency is at the API/streaming level (`reasoning_content` deltas), not at a user-visible plan-edit UI. [Evidence gap for consumer-facing execution transparency.]

## 13. Artifacts

Z.ai's artifact surfaces include:

- **Slides/Posters** via GLM Slide/Poster Agent (beta) — "Smart Information Search: Automatically retrieve and organize relevant materials, aggregate multi-source content for richness and accuracy, and support real-time web data access"; "Elegant Visual Design: Built-in professional visual standards with intelligent layout algorithms"; "Generates polished slides or posters, supporting custom page count to meet your exact content needs." Pricing: $0.7 / MTok. [Source: https://docs.z.ai/guides/agents/slide, accessed 2026-08-07; Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]
- **Frontend code generation** (the GLM-4.7 "Web UI Generation and Visual Aesthetic Optimization" use case). [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- **Videos** — Code-to-Video loop via Remotion framework. [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]
- **Translation** — Translation Agent (40+ languages, terminology customization). [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
- **Image generation** — GLM-Image, CogView-4. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
- **Video effects** — Video Effect Template Agent ("French_Kiss, BodyShake, Sexy_Me" — popular effects). [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

There is **no documented Canvas-style real-time collaborative doc/code editor** in the developer docs — artifacts are generated outputs, not interactive workspaces.

## 14. Keyboard UX

Z.ai docs feature a ⌘K search affordance ("Search... ⌘K" appears in every docs page header), and a ⌘I shortcut (visible in page footer "Deep Thinking ⌘I" reference). [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

The consumer chat surface keyboard UX is undocumented (SPA-only, not retrievable). **Evidence gap.**

The developer-facing curl examples show typical API ergonomics but no IDE-style command palette or hotkey documentation beyond the docs site itself.

## 15. Motion

Not documented in the developer docs. GLM Slide/Poster Agent produces "visually engaging slides or posters" but motion/animation of the generation process itself is not described. [Source: https://docs.z.ai/guides/agents/slide, accessed 2026-08-07]

Interactive demo animations are referenced in the docs ("Display" previews under Examples), suggesting there is some interactive preview motion in the slide agent UI. [Source: https://docs.z.ai/guides/agents/slide, accessed 2026-08-07]

**Evidence gap** for chat UI motion.

## 16. Animation

Same as Motion — not documented. The Video Effect Template Agent ("French_Kiss, BodyShake, Sexy_Me") implies video animation is a first-class artifact type. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

## 17. Visual Hierarchy

Developer docs (Mintlify) hierarchy:

1. Top nav: "Guides / API Reference / Coding Plan / Released Notes / Terms and Policy / Help Center", language selector, "API Keys" + "Payment Method" quick actions, ⌘K search.
2. Left sidebar: Get Started → Language Models → Vision Language Models → Image/Video/Audio Models → Capabilities → Tools → Agents. Currently-selected model marked "HOT" (GLM-5.2).
3. Center: documentation body with on-page TOC (Overview / Capability / Usage / Introducing / Resources).
4. Right: "On this page" jump links + "Copy page" + "Was this page helpful?" feedback. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

The hierarchy explicitly ranks **model selection first** (the 14-variant Language Models list is the dominant sidebar entry), then capabilities, then tools, then agents — communicating "pick your model first, then we'll tell you what it can do". This is the inverse of Gemini's "pick a feature mode first" pattern.

## 18. Progressive Disclosure

Z.ai's primary progressive disclosure failure is the **14-variant model picker**:

GLM-5.2, GLM-5.1, GLM-5, GLM-5-Turbo, GLM-4.7, GLM-4.7-FlashX, GLM-4.7-Flash, GLM-4.6, GLM-4.5, GLM-4.5-X, GLM-4.5-Air, GLM-4.5-AirX, GLM-4.5-Flash, GLM-4-32B-0414-128K. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

Each variant has its own positioning: GLM-5.2 ("Stable 1M-token context for long-horizon tasks"), GLM-5.1 ("Coding proficiency aligned with Opus 4.6, Ability to work independently and consistently for up to 8 hours"), GLM-5 ("Programming ability, Agentic Long-Term Planning, Backend refactoring"), GLM-5-Turbo ("Optimization of Core Requirements for OpenClaw Tasks"), GLM-4.7 ("SOTA Performance, Enhanced General Capabilities, Optimized Agentic Coding"), GLM-4.7-FlashX ("Lightweight & High-Speed"), GLM-4.6 ("High Performance, Strong Coding, More Versatile"), GLM-4.5 ("Better Performance, Strong Reasoning"), GLM-4.5-X ("Ultra-Fast Response"), GLM-4.5-Air ("Cost-Effective, Lightweight"), GLM-4.5-AirX ("Lightweight, Ultra-Fast"), GLM-4.5-Flash (Free, Lightweight), GLM-4.7-Flash (Free), GLM-4-32B-0414-128K (cost-efficiency). [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]

This exceeds the task brief's "7+" claim — the actual count is 14 text-model variants in the active picker. Differentiating among them requires the developer to read 14 separate docs pages.

This is the **direct analog** to Gemini's mode+model+source conflation: Z.ai has solved mode (single chat surface) but multiplied model variants.

## 19. Accessibility

Accessibility is **not explicitly documented** in the Z.ai developer docs retrieved. The docs site itself uses standard Mintlify patterns (⌘K search, language selector, English/Chinese toggle). [Observed: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

The Chinese consumer chat at `chatglm.cn` includes `lang="zh-CN"` and webkit renderer hints in HTML meta tags, but actual accessibility compliance (screen reader, keyboard navigation, contrast) is undocumented. [Source: https://chatglm.cn/ raw HTML head, accessed 2026-08-07]

**Major evidence gap** — no documented accessibility commitments, no VPAT/WCAG statement visible in retrieved pages.

## 20. Performance Perception

Pricing per 1M tokens is documented transparently — input, cached input (3–7× cheaper), and output columns. Free variants exist (GLM-4.7-Flash, GLM-4.5-Flash — all categories priced "Free"). [Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]

GLM-4.6 was benchmarked on efficiency: "In terms of average token consumption, GLM-4.6 is over 30% more efficient than GLM-4.5, achieving the lowest consumption rate among comparable models." Z.ai published "all test questions and agent trajectories for verification and reproduction" on HuggingFace. [Source: https://docs.z.ai/guides/llm/glm-4.6, accessed 2026-08-07]

GLM-5.2's architecture optimizations directly address latency: "IndexShare techniques, which lets the model reuse the same sparse-attention index across multiple transformer layers instead of recomputing it every time. That decreases long-context computation by nearly 3×"; "redesigned speculative decoding, increasing accepted draft lengths by up to 20%"; "flexible effort levels which lets developers trade latency for stronger reasoning when needed." [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

There is **no documented consumer-facing "this will take 5-10 minutes" pattern** like Gemini's Deep Research — performance perception is engineered at the model level (caching, speculative decoding, IndexShare), not surfaced via UI affordances. **Evidence gap.**

## 21. Trust

Trust signals are sparse in the retrieved docs:

- **Open-weight strategy** — GLM-5.2 is described as "Open-source SOTA Performance" and "most capable open-source model to date". [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07; Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
- **Reproducibility** — Z.ai "publicly released all test questions and agent trajectories for verification and reproduction" for GLM-4.6's Claude Code tests (HuggingFace dataset `zai-org/CC-Bench-trajectories`). [Source: https://docs.z.ai/guides/llm/glm-4.6, accessed 2026-08-07]
- **Safety governance** is in the "Touch High" roadmap ("mechanistic interpretability, superalignment, and AI governance") but not documented as a product feature. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
- **Geopolitical risk** — "In January 2025, the U.S. Commerce Department added Z.ai and related entities to the Entity List, citing national security and foreign-policy concerns. This restricted the company's access to some U.S. technologies". [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
- **Data retention/privacy** — not documented in the retrieved developer docs. **Evidence gap.**

## 22. Explainability

The flagship explainability feature is **Turn-Level Thinking** (GLM-4.7+) — "lets you control reasoning computation on a per-turn basis: within the same session, each request can independently choose to enable or disable thinking". [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

Interleaved Thinking surfaces reasoning between tool calls — "the model can retain reasoning content from previous assistant turns in the context". [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

The reasoning content is exposed as a separate `reasoning_content` field in API responses (distinct from `content`), making it consumable by developers building explainability UIs. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

However, **no user-facing "show your reasoning" UI toggle is documented** in the consumer chat surface — explainability is API-level, not consumer-UI-level. By contrast, Gemini's Edit Plan checkpoint in Deep Research IS a consumer-facing explainability affordance.

GLM-4.7 also has a "Think before acting" mechanism within agentic coding frameworks (Claude Code, Kilo Code, TRAE, Cline, Roo Code). [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

## 23. Long Session Experience

Long-session support is engineered at multiple levels:

- **200K context** on GLM-4.5/4.6/4.7/5/5.1, **1M context** on GLM-5.2. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
- **GLM-5.1** explicitly "Ability to work independently and consistently for up to 8 hours on a single task" — this is the only documented multi-hour single-task claim in the lineup. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
- **Preserved Thinking** — "automatically preserves reasoning blocks across multi-turn dialogues, improving cache hit rates and reducing computational costs—ideal for long-term complex tasks". [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- **Context Caching** as a priced feature — cheaper cached input tokens encourage developers to keep sessions long. [Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]
- **Coding Plan endpoint** — separate endpoint tier where Preserved Thinking is ON by default, explicitly optimized for coding-agent long sessions. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]

GLM-5.2 docs describe multi-stage execution patterns like "Long-Horizon Refactoring: Let It Run a Real Engineering Task End to End" with "/goal mode" and explicit "first provide the execution plan, impact scope, risk boundaries, and verification method". [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]

## 24. Power User Features

- **Turn-Level Thinking toggle** (GLM-4.7+) — per-turn reasoning on/off. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Preserved Thinking** (`clear_thinking: false`) — retain reasoning across turns for coding agents. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Interleaved Thinking** — reasoning between tool calls. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Function Calling / Structured Output (JSON)** / **Tool Streaming Output** / **Context Caching** / **MCP integration**. [Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]
- **Coding Plan subscription** — "fully compatible with top coding tools like Claude Code and Cline. Starting from just $10/month". [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- **GLM Slide/Poster Agent (beta)** — natural-language → professional slides/posters with auto info gathering. [Source: https://docs.z.ai/guides/agents/slide, accessed 2026-08-07]
- **Web Search MCP server** — pluggable into Cursor 0.45.6+. [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
- **CogAgent** — visual GUI Agent (research artifact based on CogVLM architecture). [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
- **AutoGLM-Phone-Multilingual** — listed in vision model lineup, suggesting a phone-automation agent. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
- **OpenAI-compatible API** — drop-in replacement via `openai>=1.0` SDK with custom `base_url="https://api.z.ai/api/paas/v4/"`. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Multiple SDKs** — Official Python (`zai-sdk`), Official Java SDK, OpenAI Python SDK, cURL. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

## 25. Developer Experience

Z.ai developer experience is **well-documented and explicitly OpenAI-API-compatible**:

- Endpoint: `https://api.z.ai/api/paas/v4/chat/completions`. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- SDKs: Official Python (`pip install zai-sdk`, current version 0.2.3), Official Java SDK, OpenAI Python SDK (`pip install --upgrade 'openai>=1.0'`). [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- API Reference, Quick Start, Core Parameters, SDKs Guide, Migrate to GLM-5.2 docs. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07 — page navigation]
- **Coding Plan** subscription tier (from $10/month) — a productized developer SKU distinct from API consumption pricing, with Preserved Thinking ON by default. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- Transparent per-1M-token pricing across input, cached input, and output. [Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]
- **`/llms.txt`** documentation index is explicitly advertised at top of every docs page: "Documentation Index: Fetch the complete documentation index at: /llms.txt". [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- Mintlify-powered docs with ⌘K search, multi-language toggle, copy-page buttons. [Observed: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]

## 26. Biggest Strengths

1. **Turn-Level Thinking toggle** (GLM-4.7+) — "smart when things are hard, faster when things are simple" via per-turn reasoning on/off, a uniquely fine-grained control not matched by Gemini or Claude. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
2. **Open-weight SOTA strategy** — GLM-5.2 is "the most capable open-source model to date" with 1M context; this differentiates from Gemini's closed-weights approach. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]
3. **OpenAI-API-compatible** with explicit `base_url` swap — drop-in for existing OpenAI SDK code. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
4. **Coding Plan subscription** ($10/month) — productized developer SKU with Preserved Thinking ON by default. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07; Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
5. **Three-layer Web Search product** (API / in-Chat / Search Agent) — explicit architectural decomposition of search granularity. [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
6. **MCP integration** — pluggable into Cursor 0.45.6+ via documented MCP server. [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
7. **Reproducibility commitments** — Z.ai published CC-Bench-trajectories on HuggingFace for GLM-4.6 verification. [Source: https://docs.z.ai/guides/llm/glm-4.6, accessed 2026-08-07]
8. **`/llms.txt` documentation index** — first-class machine-readable docs index, signaling developer-friendliness. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
9. **Long-horizon positioning** — GLM-5.1 "up to 8 hours on a single task", GLM-5.2 "1M lossless context". [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07; Source: https://docs.z.ai/guides/llm/glm-5.2, accessed 2026-08-07]

## 27. Biggest Weaknesses

1. **14-variant model picker** — exceeds "7+" claim. Differentiating GLM-5.2 vs GLM-5.1 vs GLM-5 vs GLM-5-Turbo vs GLM-4.7 vs GLM-4.7-FlashX vs GLM-4.7-Flash vs GLM-4.6 vs GLM-4.5 vs GLM-4.5-X vs GLM-4.5-Air vs GLM-4.5-AirX vs GLM-4.5-Flash vs GLM-4-32B requires reading 14 separate docs pages. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
2. **Consumer chat surface is SPA-only and unretrievable** — `z.ai` returned only a 53-byte visible body (SEO meta description) and `chatglm.cn` returned only a 4-byte body via curl. Documentation gap between API-level (rich) and consumer-level (opaque). [Observed: https://z.ai/ and https://chatglm.cn/ raw HTML, accessed 2026-08-07]
3. **No documented Canvas-style interactive workspace** — artifacts are generated outputs (slides, posters, code, video) rather than collaborative editing surfaces. [Evidence gap — no Canvas-like feature in retrieved docs]
4. **No documented consumer-facing memory/introspection** of the kind Gemini offers ("Did you use any info from past chats?"). Memory is technical-context-caching only. [Evidence gap]
5. **No documented plan-checkpoint UX** like Gemini's Edit Plan before Deep Research — explainability is API-level only (`reasoning_content` deltas). [Evidence gap for consumer UI]
6. **Geopolitical risk** — Z.ai was added to the U.S. Commerce Department Entity List in January 2025; this restricts U.S. technology access and creates uncertainty for international developers. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
7. **Branding instability** — Zhipu AI rebranded internationally as Z.ai in July 2025; ChatGLM remains the Chinese consumer brand; GLM remains the model family. Three names for one company creates discoverability friction. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
8. **Accessibility undocumented** — no VPAT, no WCAG statement, no screen-reader documentation visible in retrieved pages. [Evidence gap]
9. **Privacy/data retention undocumented** in retrieved developer docs — no equivalent to Gemini's explicit "Keep Activity" toggle and Apps Activity deletion flows. [Evidence gap]

## 28. What should MiMo learn?

- **Turn-Level Thinking toggle** — per-turn reasoning on/off as a continuously-variable knob; "smarter when things are hard, faster when things are simple". [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Preserved Thinking** with explicit cache-hit optimization — return `reasoning_content` to keep reasoning coherent AND improve cache hit rates. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Interleaved Thinking** between tool calls — model reasons before each tool invocation and after each tool result. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **OpenAI-API compatibility** with simple `base_url` swap — minimize developer migration friction. [Source: https://docs.z.ai/guides/capabilities/thinking-mode, accessed 2026-08-07]
- **Productized developer tier** (Coding Plan $10/month) distinct from API consumption pricing, with feature defaults (Preserved Thinking ON) tuned for the use case. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- **Three-layer search decomposition** — separate API, in-Chat RAG, and Search Agent surfaces, each with distinct developer value. [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]
- **`/llms.txt` documentation index** — machine-readable docs index for AI agents. [Source: https://docs.z.ai/guides/llm/glm-4.7, accessed 2026-08-07]
- **Reproducibility artifacts** (CC-Bench-trajectories on HuggingFace) as a trust mechanism. [Source: https://docs.z.ai/guides/llm/glm-4.6, accessed 2026-08-07]
- **Transparent pricing tables** with separate cached-input column to incentivize long-context use. [Source: https://docs.z.ai/guides/overview/pricing, accessed 2026-08-07]
- **MCP server** as a first-class integration surface (pluggable into Cursor). [Source: https://docs.z.ai/guides/tools/web-search, accessed 2026-08-07]

## 29. What should MiMo reject?

- **14-variant model picker** — do not expose 14 model variants in a single sidebar; collapse to 2–3 tiers with clear positioning labels, and document trade-offs in one comparison table rather than 14 separate pages. [Source: https://docs.z.ai/guides/overview/overview, accessed 2026-08-07]
- **Opaque consumer chat surface** — do not make the consumer chat product invisible to direct HTTP inspection (z.ai returns 53-byte body, chatglm.cn returns 4-byte body); publish public marketing/feature pages that are statically renderable. [Observed: https://z.ai/ and https://chatglm.cn/ on 2026-08-07]
- **Three-brand-name ambiguity** — avoid having three names (Zhipu AI / Z.ai / ChatGLM / GLM) for one entity. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
- **API-only explainability** — do not limit reasoning transparency to API `reasoning_content` deltas; surface user-facing reasoning controls in the consumer UI (as Gemini does with Edit Plan). [Evidence gap — no consumer-UI reasoning toggle documented]
- **Undocumented accessibility / privacy commitments** — publish explicit VPAT, WCAG statement, data retention policy, and user-facing activity controls comparable to Gemini's Keep Activity toggle. [Evidence gap]
- **Forward-looking strategy as positioning** — do not market "Thousands of agents with different professional roles can collaborate" as a current product feature when it is a 2-year roadmap item; the gap creates trust risk. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]
- **Geopolitical dependency on entity-listed company** — for international deployments, factor U.S. Entity List risk into vendor selection. [Source: https://www.turingpost.com/p/zhipu, accessed 2026-08-07]

## 30. Confidence Score (0-100)

**Confidence: 75/100**

Reasoning:

- (+) 8 primary Z.ai developer docs pages from `docs.z.ai/guides/*` were statically served (Mintlify) and fully extracted — 4KB–22KB clean text each. Every section 3–25 has primary citations.
- (+) 1 substantial third-party deep-dive (Turing Post, 30KB clean text) corroborates company history, model lineage, CogAgent, "Touch High" strategy, Entity List status, and Hong Kong IPO.
- (+) Pricing data is fully transparent and primary-sourced.
- (+) All claims cited with URL + access date 2026-08-07.
- (−) **Consumer chat surface NOT inspected** — `z.ai` returned 53-byte body, `chatglm.cn` returned 4-byte body via curl (both JS-rendered SPAs). Onboarding, empty states, sidebar interactions, Canvas-like surfaces, error states, motion, and animation could NOT be verified. Sections 5, 6, 14, 15, 16, 19 carry explicit "evidence gap" notes.
- (−) **web_search returned HTTP 429** on both initial attempt and 30-second retry — no search-result diversification was possible. Source corpus is the priority URL list from the task prompt plus docs.z.ai pages discovered by extracting the docs overview navigation.
- (−) **No documented consumer-facing memory** (only technical context caching) — could not verify whether the consumer chat product has a personal-memory feature comparable to Gemini's.
- (−) **No documented consumer-facing explainability UI** (only API-level `reasoning_content`) — could not verify whether the consumer chat product exposes a "show reasoning" toggle.
- (−) ChinaTalk media homepage (https://chinatalk.media/) returned a 122KB Substack landing page with no Zhipu-specific article visible — that source contributed nothing useful.
- (−) Accessibility, privacy, and data-retention commitments are undocumented in retrieved pages — confidence on Sections 19, 21 is lower.
- (+) The docs.z.ai Mintlify site is dated and versioned ("Migrate to GLM-5.2" implies current state); GLM-4.7's `pip install zai-sdk==0.2.3` matches a current SDK release.
