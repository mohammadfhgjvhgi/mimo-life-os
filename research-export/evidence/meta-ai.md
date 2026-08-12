# Meta AI — Evidence-First Product Research

**Task ID:** W8a · **Phase:** R2 Evidence-Based · **Agent:** Senior Product Researcher
**Date accessed:** 2026-08-07
**Products researched:** Meta AI consumer assistant (chatbot in FB/IG/WhatsApp/Messenger/Threads/Ray-Ban Meta/Quest) + Llama 4 / Llama API developer surface
**Method:** Canonical-source first. Live UI of www.meta.ai, about.meta.com/ai, ai.meta.com/llama returns Cloudflare JS challenge or near-empty shell in this environment, so in-product UI is only partially observable (meta.ai/vibes HTML exposed meta description + sidebar aria-labels only). Evidence is from Wikipedia editorial records of Meta AI / Llama / Ray-Ban Meta / Meta Platforms, plus archived snapshot of ai.meta.com/llama. Where a claim is unverified by direct UI observation, this is stated.

---

## 1. Product Overview

"Meta AI" refers to two overlapping things:
- **Meta AI as a research division**: founded 2013 as FAIR (Facebook Artificial Intelligence Research); renamed Meta AI after the 2021 corporate rebrand. Directed by Yann LeCun until 2018; succeeded by Jérôme Pesenti (formerly IBM CTO of big-data group). Workspaces in Menlo Park, London, NYC, Paris, Seattle, Pittsburgh, Tel Aviv, Montreal as of 2025. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **Meta AI as the consumer virtual assistant**: chatbot integrated across Meta's social products (Facebook, Instagram, WhatsApp, Messenger, Threads), available standalone at meta.ai, pre-installed on Ray-Ban Meta smartglasses (since Oct 17, 2023) and Quest 2+ HMDs, with a subscription-based standalone app. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

Current model family: **Llama 4** (released April 5, 2025), with three variants:
- **Llama 4 Scout**: 17B active parameters, 16 experts, 109B total, 10M-token context window, single-H100 GPU efficiency, natively multimodal.
- **Llama 4 Maverick**: 17B active, 128 experts, 400B total, 1M-token context window.
- **Llama 4 Behemoth** (preview, not released): 288B active, 16 experts, ~2T total parameters; used as teacher for distilling Maverick; still in training when Scout/Maverick were released.

[Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]

Training corpus for Llama 4 included "publicly available data, licensed data, and Meta-proprietary data such as publicly shared posts from Instagram and Facebook and people's interactions with Meta AI." Knowledge cutoff: August 2024. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]

October 1, 2025 — Facebook announced: "We will soon use your interactions with AI at Meta to personalize the content and ads you see." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

Pricing (Llama 4 Maverick): $0.19–$0.49 per 1M input+output tokens (3:1 blended cost), assuming distributed inference; $0.30–$0.49 single-host estimate. Comparable to Gemini 2.0 Flash ($0.17/Mtok), DeepSeek v3.1 ($0.48/Mtok), GPT-4o ($4.38/Mtok). [Source: web.archive.org snapshot of ai.meta.com/llama/, accessed 2026-08-07]

---

## 2. Product Philosophy

The Meta AI brand promise is **"AI for everyone, on every surface they already use"** — distributed ambient AI rather than a destination app. Three observable pillars:

1. **Multi-surface distribution** — Meta AI is embedded in Facebook, Instagram (DM + feed), WhatsApp, Messenger, Threads, Ray-Ban Meta smartglasses, Quest 2+ HMDs, and standalone at meta.ai. The strategy is to meet users where they already are, not to require them to open a new app. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
2. **Open-weight Llama as the substrate** — Meta releases Llama weights openly (Llama 2 in July 2023 was "the first project to be unveiled out of Meta's generative AI group"; first available for commercial use; "would not charge access or usage but instead operate with a source-available model"). The brand positions openness as a competitive moat: "We can't wait to see what you build." [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07] · [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
3. **Personalisation through data integration** — Meta explicitly announced in October 2025 that AI interactions would inform ad targeting and content personalization. The assistant is not a privacy-first product; it is a *Meta-graph-aware* product. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

Marketing language on the archived Llama landing page: "Industry Leading, Open-Source AI" / "Llama 4: Leading intelligence." / "Unrivaled speed and efficiency." / "The most intelligent, scalable, and convenient generation of Llama is here: natively multimodal, mixture-of-experts models, advanced reasoning, and industry-leading context windows." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

The Llama brand specifically claims industry-leading context length: "Llama 4 Scout supports up to 10M tokens of context — the longest context length available in the industry — unlocking new use cases around memory, personalization, and multi-modal applications." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 3. Core Mental Model

Meta AI's mental model for the consumer: **"one assistant, every surface, knows me"**. Three sub-models co-exist:

- **Consumer assistant (Meta AI)**: text + voice + multimodal-image chatbot. Embedded in every Meta surface. Personality is helpful/neutral (no Grok-style "wit"). Personalisation is via the Meta social graph rather than explicit memory-of-this-conversation.
- **Llama 4 model family (developer-facing + substrate)**: Scout (10M context), Maverick (1M context, faster), Behemoth (teacher). Natively multimodal via "early fusion that allows us to pre-train the model with large amounts of unlabeled text and vision tokens — a step change in intelligence from separate, frozen multimodal weights." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Vibes (image + video generation)**: exposed at `meta.ai/vibes` with the meta description "Use Vibes to create AI-generated images and videos for free." [Source: https://www.meta.ai/vibes/, accessed 2026-08-07]

The product mental model is *multi-surface presence + open-weight substrate* — fundamentally different from Grok's "one chatbot, real-time X data, less filtered".

---

## 4. User Journey

Consumer journey (reconstructed — live UI not directly observable):

1. **Discovery**: most users meet Meta AI inside an existing Meta app — Facebook (DMs and search bar), Instagram (DMs), WhatsApp (chat list — though Mar 2026 EU antitrust ruling forced Meta to allow AI rivals on WhatsApp for a year), Messenger, Threads. Standalone at meta.ai (subscription-based app exists too). [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
2. **Empty state**: not directly observable. meta.ai/vibes HTML exposes "New chat" + "Vibes" + "Log in / Sign up" + "Settings" + "Notifications" as the only sidebar items. [Observed: https://www.meta.ai/vibes/ HTML, accessed 2026-08-07]
3. **Conversation**: text input → model response. Since May 2024, the chatbot summarizes news from various outlets **without linking directly to original articles** — including in Canada, where news links are banned on its platforms. This "use of news content without compensation and attribution has raised ethical and legal concerns." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
4. **Multimodal on Ray-Ban Meta**: voice activation ("Hey, Facebook" wake phrase originally — Ray-Ban Stories; "Hey Meta" later). April 23, 2024 update enabled multimodal input via computer vision — the glasses can "describe surroundings; read text aloud using OCR and speech synthesis; and provide turn-by-turn directions." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
5. **Image generation ("Imagine")**: users generate images from text within the chat surface (Meta AI Imagine, powered by Llama 4). [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
6. **Vibes** at `meta.ai/vibes` — a dedicated image+video generation surface ("Use Vibes to create AI-generated images and videos for free"). [Observed: meta description, accessed 2026-08-07]
7. **Surface migration**: Meta AI follows the user across surfaces — conversation continuity across Facebook / Instagram DMs / WhatsApp is implied by the multi-surface integration but not directly observable. Gap noted.
8. **Voice**: Ray-Ban Meta has a dedicated voice interface (5-microphone array, "Hey Meta" wake phrase). On Quest 2+ HMDs too. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

Developer journey: llama.com (redirects to facebook-style JS app) or ai.meta.com/llama (returns Cloudflare challenge). The archived snapshot of ai.meta.com/llama shows the canonical entry path: "Download models" button → Llama API + Llama Stack for deployment → "Docs / Cookbooks / Case studies / Resources / Community". [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 5. Navigation

**Consumer surfaces:**
- **meta.ai** — returns Cloudflare challenge / 478-byte reload shell in this environment; could not inspect. [Observed: `curl -sL -A "Mozilla/5.0..." https://www.meta.ai/` → 478-byte HTML with `fetch('/__rd_verify_...')` challenge, accessed 2026-08-07]
- **meta.ai/vibes** — partially observable. Sidebar items: New chat / Vibes / Log in / Sign up / Settings / Notifications (alt+T shortcut). Meta description: "Use Vibes to create AI-generated images and videos for free." Apple iTunes app-id=1558240027. [Observed: https://www.meta.ai/vibes/ HTML, accessed 2026-08-07]
- **about.meta.com/ai, /technologies/meta-ai/, /technologies/meta-ai/meta-ai-ray-ban/** — all return Cloudflare challenge (1543-byte error page). [Observed: accessed 2026-08-07]
- **In-app surfaces (Facebook, Instagram, WhatsApp, Messenger, Threads)** — not directly observable (require authenticated Facebook account); Wikipedia documents they exist.

**Developer surface:**
- **ai.meta.com/llama** (archived snapshot observed): top nav links to "Models & Products · Docs · Community · Resources · Download models". Body sections: Llama 4 hero, "Build with Llama 4" cards (Llama API, Llama 4 Scout, Llama 4 Maverick, Llama 4 Behemoth preview), "Llama 4 Capabilities" (Natively Multimodal, Unparalleled Long Context, Expert Image Grounding), "Benchmarks" comparison table, Resources (Docs / Cookbooks / Case studies / partner ecosystem), "Latest Llama updates" feed, newsletter signup. [Source: web.archive.org snapshot of ai.meta.com/llama/, accessed 2026-08-07]
- **llama.com** (live) — returns Facebook-style JS app shell; not directly observable. [Observed: 383 KB HTML with mostly CSS variables, no SSR content, accessed 2026-08-07]
- **llama.developer.meta.com** (Llama API developer console) — returns Cloudflare challenge / 1542-byte error page. [Observed: accessed 2026-08-07]

---

## 6. Workspace

Consumer workspace (mostly not directly observable):
- **meta.ai/vibes sidebar**: "New chat", "Vibes", "Settings", "Notifications" (with `alt+T` shortcut). Minimal sidebar. [Observed: https://www.meta.ai/vibes/ HTML, accessed 2026-08-07]
- **Multi-surface**: same assistant is reachable in Facebook DMs, Instagram DMs, WhatsApp chats, Messenger, Threads — conversation context may or may not sync across surfaces; not directly evidenced. Gap noted.

Ray-Ban Meta hardware workspace:
- **No HUD / no AR display** — Wikipedia: "Unlike other smart glasses, the Ray-Ban Meta glasses do not include any HUD or AR head-mounted display." The interface is purely voice + camera + companion phone app. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Touchpad on right temple** — tap once for 30-second video; hold for photo (Ray-Ban Stories control scheme; touchpad retained on Ray-Ban Meta). [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Five-microphone array** (Ray-Ban Meta gen 2, up from Stories' microphone setup). [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **12 MP camera** (Ray-Ban Meta), up from Stories' 5 MP. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Meta View companion app** (renamed from Facebook View) — for importing, editing, formatting photos/videos for sharing on Instagram, Messenger, WhatsApp. Battery percentage display. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Meta Ray-Ban Display** (announced at Meta Connect 2025) — first AI glasses with integrated display + neural wristband. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

Developer workspace (developer docs):
- **llama.com/docs** — returns 383 KB HTML with mostly CSS variables (Facebook-style JS app); not directly observable. [Observed: accessed 2026-08-07]
- **Llama Stack** mentioned as deployment substrate: "Build your greatest ideas and seamlessly deploy in minutes with Llama API and Llama Stack." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 7. Conversation

Consumer chat features (from public sources, mostly not directly observed):
- **Text in / text out** chat with multimodal input (image, voice on Ray-Ban Meta, camera-feed on glasses after April 23, 2024 multimodal update). [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **News summarisation without links** (since May 2024): "the chatbot has summarized news from various outlets without linking directly to original articles, including in Canada, where news links are banned on its platforms. This use of news content without compensation and attribution has raised ethical and legal concerns." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **Ray-Ban Meta multimodal**: glasses "can describe surroundings; read text aloud using OCR and speech synthesis; and provide turn-by-turn directions" (assistive-tech case). [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Voice activation**: "Hey, Facebook" wake phrase on Ray-Ban Stories; later "Hey Meta" on Ray-Ban Meta. Wikipedia notes the Facebook View privacy policy states "users' voice commands may be sent to Meta's servers unless explicitly opted out." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Vibes** surface — `meta.ai/vibes` for image+video generation. [Observed: meta description, accessed 2026-08-07]

Reasoning / thinking-block visibility: not directly evidenced in canonical docs. Gap noted — Wikipedia's Meta AI article does not document an explicit "Think mode" or visible reasoning trace comparable to Grok's Think mode. The Llama 4 capabilities page mentions "advanced reasoning" but does not detail UX. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

Developer-facing Llama API:
- Available via llama.com / llama.developer.meta.com (both Cloudflare-challenged in this environment). [Observed: accessed 2026-08-07]
- The archived Llama page mentions "Llama API — Go from ideation to app deployment in minutes. Experience a seamless and efficient way to build AI apps using Llama models." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 8. Agent Experience

Meta AI consumer-side agent features: not directly evidenced in canonical docs. The Wikipedia Meta AI article does not document an agentic "DeepSearch" equivalent or autonomous-task-execution mode. Gap noted.

Developer-side agentic tooling:
- **Llama Stack** — mentioned as deployment substrate for "seamless" deployment in minutes. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **MCP (Model Context Protocol) support** — not directly evidenced in observed Meta docs (vs. Grok's explicit `mcp` parameter). Gap noted.
- **Function calling / tool use** — not directly evidenced in observed Meta docs; would need direct llama.com/docs access. Gap noted.

Ray-Ban Meta as ambient agent:
- **Always-listening (with wake phrase)** — "Hey, Facebook"/"Hey Meta" wake word activates. Microphones always-on for wake-word detection. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Multimodal computer vision agent** (April 23, 2024 update) — describe surroundings, OCR + TTS, turn-by-turn directions. This is a genuinely ambient agent surface — the closest Meta has to a vision-equipped agent. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

Meta's "Moltbook" acquisition (March 2026): "Meta acquired Moltbook a social network for AI bots, where AI agents interact with one another autonomously." This suggests Meta is exploring agent-to-agent communication as a product surface, though not yet a consumer-visible Meta AI feature. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]

---

## 9. Memory

Meta AI consumer memory is implicit through the Meta social graph rather than explicit conversation-level memory:
- October 1, 2025 announcement: "We will soon use your interactions with AI at Meta to personalize the content and ads you see." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- Llama 4 training data explicitly includes "people's interactions with Meta AI" — user interactions with the assistant feed back into model training. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- Llama 4's "10M-token context window (Scout)" explicitly positioned as "unlocking new use cases around memory, personalization, and multi-modal applications." Memory is a *capability* of the model, not a separate product surface. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

Explicit cross-conversation memory feature (analogous to ChatGPT Memory or Grok's `--experimental-memory`): not directly evidenced in canonical sources. Gap noted.

Ray-Ban Meta:
- Voice-command data "may be sent to Meta's servers unless explicitly opted out." Implies server-side storage of voice interactions. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- Photos/videos "are automatically stored on the users Facebook account" — so account-level persistence is the default for Ray-Ban Stories; equivalent pattern for Ray-Ban Meta. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 10. Knowledge

Meta AI's knowledge model differs sharply from Grok's:

- **Llama 4 has training-cutoff knowledge only** (August 2024 cutoff). No documented equivalent of Grok's real-time `web_search`/`x_search` server-side tools in observed material. The Wikipedia Meta AI article documents the chatbot summarises news "from various outlets" but does not document an explicit agentic search tool exposed to developers. Gap noted. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07] · [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **Natively multimodal knowledge** via early fusion — image and text tokens are pre-trained together, claimed as a "step change in intelligence from separate, frozen multimodal weights." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Long-context knowledge** — Llama 4 Scout's 10M-token context window is the headline knowledge claim; "the longest context length available in the industry." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Expert image grounding** — "Llama 4 is also best-in-class on image grounding, able to align user prompts with relevant visual concepts and anchor model responses to regions in the image." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Multilingual** — Llama 4 supports 12 languages natively. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **No real-time X integration** — Meta AI has no equivalent of Grok's privileged X-data access. The closest competitor integration is news-outlet summarisation (without links, since May 2024), which is the source of the ethical/legal concern noted. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

Llama 4 benchmark performance (from archived Llama landing page, Meta-reported): MMMU 73.4, MathVista 73.7, ChartQA 90.0, DocVQA 94.4, LiveCodeBench 43.4, MMLU Pro 80.5, GPQA Diamond 69.8, Multilingual MMLU 84.6, MTOB (half book) 54.0/46.4, MTOB (full book) 50.8/46.7. Compared against Gemini 2.0 Flash ($0.17/Mtok), DeepSeek v3.1 ($0.48/Mtok), GPT-4o ($4.38/Mtok). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

Notable controversy: Meta claimed Llama 4 bested GPT-4o on LMArena using an unreleased "experimental chat version" optimized for "conversationality" — not the version released publicly. LMArena indicated it would change policies as a result. Some users accused Meta of training on test sets. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]

---

## 11. Search

Meta AI consumer search:
- **News summarisation without source attribution** (since May 2024) — including in Canada where news links are banned. Meta "continues to reduce news visibility on its platforms" while still summarizing news content via AI. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- No documented real-time-web-search tool analogous to Grok's `web_search`. Gap noted — would require direct product observation.

Llama-side search:
- **Llama API** is documented as a deployment surface, but no explicit "search tool" or "browse" tool is mentioned in the archived Llama landing page. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- The Wikipedia Llama article's Applications section mentions third-party uses (Stanford Alpaca, Meditron, Zoom AI Companion) but no native search product. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]

Ray-Ban Meta ambient search:
- The multimodal-vision update (April 23, 2024) lets the glasses do OCR + describe surroundings — a form of ambient visual search. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Harvard students used PimEyes** with Ray-Ban Meta to do real-time face identification from a single captured face — pulled names, phone numbers, home addresses. Meta's spokesperson responded that "PimEyes could be used with ANY camera" but 404 Media noted the students "choose to use Meta's Ray Bans: because in passing, they look just like any other pair of glasses." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 12. Execution

Consumer-side execution:
- **Chat completion**: standard LLM chat; not directly observable.
- **Image generation** via Vibes (`meta.ai/vibes`) — image+video generation. [Observed: meta description, accessed 2026-08-07]
- **Code Execution tool** (sandboxed): not directly evidenced in canonical docs (vs. Grok's documented `code_execution` tool). Gap noted.
- **Ray-Ban Meta multimodal pipeline**: voice → STT → Meta AI → response → TTS → speakers; image capture → multimodal model → response. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

Developer-side execution:
- **Llama API** — deployment surface; specific endpoints not directly observable (llama.com/docs Cloudflare-challenged).
- **Llama Stack** — deployment substrate mentioned on landing page; details not observable. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Community partners**: AWS (Llama Startup Program), Microsoft Azure, Google Cloud. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07] · [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

Meta internal AI infrastructure:
- Switched from CPUs / in-house chips to Nvidia GPUs post-2022. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **MTIA v1 chip** — content-recommendation chip on TSMC 7nm, 25W, 51.2 TFlops FP16. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **March 11, 2026 roadmap**: four new in-house chips as part of Meta Training and Inference Accelerator (MTIA) program. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **December 4, 2024**: announced $10B AI data center in northeast Louisiana, powered by natural gas. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **February 2026**: long-term Nvidia partnership announced. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]

---

## 13. Artifacts

**Vibes (image + video generation)** — `meta.ai/vibes` — meta description: "Use Vibes to create AI-generated images and videos for free." Apple iTunes app-id=1558240027. [Observed: HTML meta tags, accessed 2026-08-07]

**Meta AI Imagine** — image generation powered by Llama 4. Wikipedia's Llama article caption: "Example of an image generated by Meta AI Imagine, powered by Llama 4." Prompt example: "A representation of Meta AI and Llama." [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]

**Movie Gen** (Oct 4, 2024): Meta announced an AI model "capable of generating realistic video and audio clips based on user prompts. Meta stated it would not release Movie Gen for open development, preferring to collaborate directly with content creators and integrate it into its products by the following year." Built using licensed + publicly available datasets. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]

**Ray-Ban Meta photo/video artifacts**:
- 12 MP camera, multi-image capture, 32 GB storage.
- Livestreaming to Facebook and Instagram.
- "Photos and videos are automatically stored on the users Facebook account, so an account is necessary for these glasses." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Meta View companion app** for importing, editing, formatting — shareable to Instagram, Messenger, WhatsApp, and "other social media sites". [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

**Muse Spark** — listed as a Meta AI research product in the Wikipedia infobox (no detail). [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

**Galactica** (Nov 15-18, 2022): LLM for scientific text generation. Withdrawn after three days "for generating racist and inaccurate content." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

Pricing: Llama 4 Maverick $0.19–$0.49/Mtok (3:1 blended); Llama 4 Scout is "single-H100 GPU efficiency" (implies lower cost, exact pricing not on landing page). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 14. Keyboard UX

Direct consumer-keyboard UX not directly observable. The only keyboard-shortcut evidence is from the meta.ai/vibes HTML `aria-label`:
- **"Notifications alt+T"** — alt+T to access notifications panel. [Observed: aria-label on the Notifications sidebar item, https://www.meta.ai/vibes/, accessed 2026-08-07]
- **"Toggle Sidebar"** — sidebar toggle control. [Observed]
- **"Settings"** — settings control. [Observed]
- **"Loading page"** — loading-state aria-label. [Observed]

Ray-Ban Meta hardware controls:
- **Touchpad on right temple** — tap once for 30-second video; hold for photo. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Voice activation** via wake phrase ("Hey, Facebook" / "Hey, Meta"). [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Hardware power switch** — engineers "created a hardware power switch and a hardwired LED light to indicate when the camera is recording." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

Developer-docs keyboard UX: llama.com/docs is JS-rendered; could not observe. Gap noted.

---

## 15. Motion

Motion/transition design is not described in canonical docs. Ray-Ban Meta's interface is purely auditory (TTS) + visual (LED recording indicator + camera LED) + tactile (touchpad) — no screen, no on-screen motion. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

The meta.ai/vibes HTML exposes a "Loading page" aria-label — implying loading-state animations exist but their specifics are not observable from the static HTML. [Observed: https://www.meta.ai/vibes/, accessed 2026-08-07]

Consumer chat motion (typing indicator, streaming-token reveal, etc.): not directly observable. Gap noted.

---

## 16. Animation

Same gap as §15. Animation behaviour of consumer chat / mobile apps not directly observed.

Streamed generation: not directly evidenced in canonical sources (Wikipedia does not document streaming UX). Gap noted.

**Meta Ray-Ban Display** (announced Meta Connect 2025) — first AI glasses with integrated display + neural wristband. This will introduce on-screen animation for the first time on a Meta wearable, but no observed details on animation design. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 17. Visual Hierarchy

For the archived ai.meta.com/llama landing page (directly observed):
- Top nav: "Models & Products · Docs · Community · Resources · Download models". [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Hero: H1 "Llama 4: Leading intelligence." / H2 "Unrivaled speed and efficiency." with "Download models" CTA. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Body section "Build with Llama 4" — four cards: Llama API, Llama 4 Scout, Llama 4 Maverick, Llama 4 Behemoth (preview). Each card has a "Download"/"Learn more"/"View blog" link. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Body section "Llama 4 Capabilities" — three capability cards: Natively Multimodal, Unparalleled Long Context, Expert Image Grounding. Each card has a short paragraph explanation. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Body section "Benchmarks" — large comparison table (Llama 4 Maverick vs Gemini 2.0 Flash vs DeepSeek v3.1 vs GPT-4o) across MMMU, MathVista, ChartQA, DocVQA, LiveCodeBench, MMLU Pro, GPQA Diamond, Multilingual MMLU, MTOB half-book, MTOB full-book. Inference-cost column. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Body section "Resources" — three cards: Docs, Cookbooks, Case studies. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Body section "Our partner ecosystem" — partner logos (referenced but not loaded in static snapshot). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Body section "Latest Llama updates" — feed of recent announcements with category labels (Open Source / Large Language Model / etc.). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- Footer: "Stay up-to-date / Our latest updates delivered to your inbox / Subscribe to our newsletter / Sign up". [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

Meta AI consumer chat visual hierarchy: not directly observable. Gap noted.

Ray-Ban Meta visual hierarchy: no screen → no on-screen visual hierarchy. The LED recording indicator is the only visual signal. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 18. Progressive Disclosure

- **Archived Llama landing page** uses progressive disclosure: hero claims → capability cards → benchmark table → resources. Each level reveals more detail. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Meta AI sidebar** (from meta.ai/vibes HTML) is minimal: "New chat / Vibes / Settings / Notifications" — feature surfaces are not visible by default; Vibes is a separate top-level destination. [Observed: https://www.meta.ai/vibes/, accessed 2026-08-07]
- **Ray-Ban Meta** progressive disclosure: voice is the primary interface; touchpad gestures (tap/hold) reveal photo/video capture; companion phone app exposes editing/sharing/battery. Hardware power switch provides a hard binary on/off. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Meta Ray-Ban Display** (Connect 2025) — first surface that will integrate an actual display, with the neural wristband as a separate input layer. Progressive disclosure of information from audio-only → audio+visual is the trajectory. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 19. Accessibility

Accessibility documentation gap is significant for Meta AI:
- No published VPAT surfaced in canonical docs.
- The archived Llama landing page does not have an explicit accessibility statement. [Observed: archived ai.meta.com/llama/, accessed 2026-08-07]
- The meta.ai/vibes HTML exposes `aria-label` on the Notifications control ("Notifications alt+T") and "Toggle Sidebar" — minimum ARIA support, but no skip-link observed. [Observed: https://www.meta.ai/vibes/, accessed 2026-08-07]

Ray-Ban Meta accessibility — strong positive evidence:
- "The AI can describe surroundings; read text aloud using OCR and speech synthesis; and provide turn-by-turn directions. This technology could improve quality of life and independence for visually impaired users." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- The April 23, 2024 multimodal-vision update is explicitly an assistive-tech feature: OCR + TTS + spatial descriptions for blind/low-vision users.

Ray-Ban Meta accessibility risks:
- The recording LED is small (white LED) — critics argue it is not visible/effective in low-light. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- 404 Media documented "a cheap modification kit that can disable the recording light." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- July 2026 update: "Meta began rolling out an update that disables the glasses' camera when tampering with or damage to the recording-indicator LED is detected." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 20. Performance Perception

- **Llama 4 Maverick** cost: $0.19–$0.49 / 1M tokens (3:1 blended) — marketed as ~25× cheaper than GPT-4o ($4.38/Mtok). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Llama 4 Scout**: "single H100 GPU efficiency" — implies low-latency single-host serving. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **10M-token context** (Scout) — marketed as "longest context length available in the industry", unlocking "memory, personalization, and multi-modal applications" without chunking. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Mixture-of-experts architecture** — only "a fraction of the model's expert sub-networks are activated per input token" → faster inference at equivalent quality. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **December 11, 2024 outage**: "Meta experienced a global outage, impacting accounts on all of its social media and messaging applications. Outage reports from DownDetector reached 70,000+ and 100,000+ within minutes for Instagram and Facebook, respectively." [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **October 2025 AI unit layoffs**: "Meta would be laying off 600 employees in the artificial intelligence unit … It referred to its AI unit as 'bloated' and are seeking to trim down the department." [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]

Ray-Ban Meta performance:
- "Charging case and USB-C charging cable, which can fully charge the glasses in just over an hour with three hours of battery life." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- Voice latency not directly measured in canonical docs. Gap noted.

---

## 21. Trust

Meta AI's trust posture is dominated by **Meta's pre-existing consumer-data trust deficit**:

- **October 1, 2025 announcement** that AI interactions will be used for ad personalization — the assistant is explicitly part of Meta's ad-targeting apparatus, not a separate privacy-first product. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **Llama 4 training data includes "people's interactions with Meta AI"** — user prompts and responses feed back into model training. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **Llama 4 benchmark controversy**: Meta used an "experimental chat version" optimized for conversationality on LMArena, not the public release; users accused Meta of training on test sets (denied). LMArena changed policies as a result. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **Galactica incident (Nov 2022)**: scientific-text LLM withdrawn after three days for generating racist/inaccurate content — Meta's prior failure mode for under-tested AI releases. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **News summarization without attribution** (since May 2024) — "use of news content without compensation and attribution has raised ethical and legal concerns." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **LibGen training-data lawsuit**: "Mediapart reported that in 2022, Facebook's parent company illegally used works accumulated by the pirate site LibGen to train its artificial intelligence." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **Ray-Ban Meta privacy concerns**: "pervert glasses" label; small recording LED; 404 Media documented modification kit to disable LED; January 2026 BBC report on pickup artists filming women without consent for TikTok uploads; Harvard students using PimEyes for real-time face identification. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Voice-command data**: "users' voice commands may be sent to Meta's servers unless explicitly opted out." Default opt-out is the opposite of privacy-first. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **NOYB cease-and-desist** (May 2025): privacy advocacy group alleged unlawful use of EU personal data for AI training. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Irish DPC scrutiny** of glasses since 2021; Italian regulators questioning the recording LED's effectiveness. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **EU AI Act (effective 2024, full obligations by 2026)**: "may classify certain Meta AI features on the glasses as 'high-risk' if they involve biometric processing (e.g., visual analysis or recognition capabilities), requiring fundamental rights impact assessments, transparency measures, and risk mitigation." Some advanced AI features faced delayed/restricted EU rollout. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **March 2026 UK and US investigations** into Ray-Ban Meta smart glasses for AI-image/video data use in AI training. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **March 2026 EU antitrust ruling**: Meta agreed to allow AI rivals on WhatsApp for a year after competitor complaints. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **July 2026 New York State court ban**: statewide ban on camera/microphone-equipped smart glasses in all facilities of the NY State Unified Court System, effective July 20, 2026. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Futurism January 2026 report**: "a man who lost his job and became estranged from his family after being deluded by heavy use of the glasses, which gave him a messiah complex and convinced him that aliens were visiting imminently." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **2026 Delhi Jantar Mantar protests**: "some Delhi police personnel wearing Meta smart glasses, alongside other surveillance equipment." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

Mitigation visible in product:
- **July 2026 camera-disable update**: "Meta began rolling out an update that disables the glasses' camera when tampering with or damage to the recording-indicator LED is detected." [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Hardware power switch**: physical switch to disconnect camera/mic. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Open-weight Llama** releases (Apache-style licensing) — partial transparency move, though not equivalent to Grok's system-prompt publication.

---

## 22. Explainability

- **"Advanced reasoning"** claimed in Llama 4 marketing but no documented visible reasoning trace or "Think mode" equivalent to Grok's. Gap noted. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **No documented `logprobs`** support in observed material; gap noted vs. OpenAI.
- **No documented system-prompt publication** comparable to Grok's GitHub publication; gap noted.
- **Source citation in news summarization**: Wikipedia documents that Meta AI summarizes news "without linking directly to original articles" — i.e., explainability of *where the information came from* is *not* surfaced. This is a measurable explainability regression vs. Perplexity/Grok DeepSearch. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
- **Llama 4 benchmarks table** is published (with footnoted methodology notes about reproducibility, date ranges, internal runs) — model-card transparency is reasonable. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Llama 4 "experimental chat version" LMArena controversy** — Meta released a benchmark-optimized variant different from public release, which LMArena called out. Transparency of evaluation variants is an explainability concern. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]

---

## 23. Long Session Experience

- **10M-token context** (Llama 4 Scout) — explicitly positioned as enabling "new use cases around memory, personalization, and multi-modal applications" without chunking. The single most aggressive long-session capability in the industry. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **1M-token context** (Llama 4 Maverick). [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **Long-context benchmark** MTOB (half-book and full-book translation eng↔kgv): Maverick scores 54.0/46.4 (half) and 50.8/46.7 (full) — Meta self-reports these because "Specialized long context evals are not traditionally reported for generalist models." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Mixture-of-experts efficiency**: only a fraction of experts active per token — lower per-turn cost for long conversations. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **Multi-surface continuity**: Meta AI assistant is reachable across Facebook / Instagram / WhatsApp / Messenger / Threads / Ray-Ban Meta / Quest / standalone meta.ai — but explicit conversation-state continuity across these surfaces is not directly evidenced. Gap noted.
- **Personalization via Meta social graph** — the October 2025 announcement that AI interactions feed ad/content personalization is a long-session pattern, but in the ad-targeting direction rather than the assistant-remembers direction. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]

Ray-Ban Meta long-session:
- **3-hour battery life** per charge; 1-hour full charge. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **32 GB storage** on-device for photos/videos before sync. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 24. Power User Features

- **Llama 4 Scout 10M context window** — for users who need to load entire codebases or document corpora in a single prompt. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Open-weight releases**: Llama 2 (July 2023) "would not charge access or usage but instead operate with a source-available model". Llama 4 weights are downloadable. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07] · [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **llama.cpp** (open-source, Georgi Gerganov, March 10, 2023) — re-implementation of Llama in C++ for local inference without GPU. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **llamafile** (Justine Tunney) — bundles llama.cpp + model into a single executable. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
- **Llama Stack** — Meta's deployment substrate. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Llama API** at llama.com. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Ray-Ban Meta multimodal voice** (April 23, 2024 update) — voice + camera + computer vision agent. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Meta Ray-Ban Display** (Connect 2025) — first glasses with integrated display + neural wristband. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Oakley Meta** (Gen 2 partnership with Oakley, June 20, 2025) — sports/performance variant; HSTN (Aug 26, 2025), Vanguard (Sep 18, 2025). [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **Meta Glasses** (June 23, 2026) — new smartglasses line with EssilorLuxottica. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
- **March 31, 2026** — two new Ray-Ban smart glasses designed for prescription lenses. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **Movie Gen** (Oct 4, 2024) — video+audio generation model, not openly released. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **Vibes** — image+video generation at meta.ai/vibes. [Observed: meta description, accessed 2026-08-07]
- **Moltbook acquisition** (March 2026) — social network for AI bots to interact autonomously. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
- **Multi-cloud availability**: AWS, Microsoft Azure, Google Cloud partner ecosystems. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07] · [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 25. Developer Experience

**Surface area (from archived ai.meta.com/llama landing page):**
- "Llama API — Go from ideation to app deployment in minutes."
- "Docs / Cookbooks / Case studies / Resources / Community"
- "Llama 4 Scout / Llama 4 Maverick / Llama 4 Behemoth preview" — all downloadable.
- "Our partner ecosystem" — AWS, Microsoft, Google Cloud.
- "Latest Llama updates" feed.
- Newsletter signup.

[Source: archived ai.meta.com/llama/, accessed 2026-08-07]

**SDKs**: not directly observable (llama.com/docs Cloudflare-challenged in this environment). Gap noted.

**Llama Stack**: deployment substrate mentioned but details not observable. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

**Llama API Console**: llama.developer.meta.com — returns Cloudflare challenge (1542-byte error page). Could not inspect API-key management or usage UI. [Observed: accessed 2026-08-07]

**Community pages**:
- **AWS Llama Startup Program** — "joining forces with Amazon Web Services to announce a new program that will provide resources and support to 30 promising startups in the U.S. that are building with Llama." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **ANZ bank case study** — "How Llama helps drive engineering efficiency at a major Australian bank." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
- **Llama Startup Program cohort** — inaugural cohort announcement. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

**Pricing transparency**: $0.19–$0.49 / 1M tokens (3:1 blended) for Maverick; specific per-tier pricing on llama.com/pricing not directly observable (Cloudflare-challenged). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

**Notable DX gaps vs. competitors**:
- No published equivalent of xAI's `llms.txt` (machine-readable docs bundle). Gap noted.
- No published equivalent of xAI's OpenAI-Realtime-API base-URL-swap migration doc. Gap noted.
- No published equivalent of xAI's Claude Code CLI flag compatibility. Gap noted.
- Live docs at llama.com/docs are JS-rendered; no SSR content extractable — DX access is gated behind a working JS browser. [Observed: 383 KB HTML with mostly CSS variables, no SSR content, accessed 2026-08-07]

---

## 26. Biggest Strengths

1. **Multi-surface distribution is genuinely unique** — Meta AI is embedded in Facebook + Instagram + WhatsApp + Messenger + Threads + Ray-Ban Meta + Quest + standalone meta.ai. No other AI assistant has this surface reach (ChatGPT has no native distribution inside any of these apps). [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
2. **Llama 4 Scout 10M-token context** — explicit "longest context length available in the industry" claim, with concrete benchmark results (MTOB full-book translation). [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
3. **Natively multimodal via early fusion** — text and vision tokens pre-trained together, claimed as a "step change in intelligence from separate, frozen multimodal weights." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
4. **Open-weight release strategy** — Llama weights downloadable; llama.cpp / llamafile ecosystem enables local deployment without GPU. Genuine open-source ecosystem. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
5. **Mixture-of-experts cost efficiency** — $0.19–$0.49 / 1M tokens (3:1 blended) for Maverick, ~25× cheaper than GPT-4o. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
6. **Ray-Ban Meta as ambient assistive-tech device** — OCR + TTS + spatial descriptions for blind/low-vision users; "improve quality of life and independence for visually impaired users." A real accessibility win. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
7. **Three-model family strategy** (Scout/Maverick/Behemoth) — explicit cost/quality/context tradeoffs visible to the user/developer. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
8. **Multi-cloud partner ecosystem** — AWS, Azure, Google Cloud all carry Llama. No cloud lock-in. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
9. **Llama Startup Program + ANZ case study** — concrete startup-customer acquisition motion, not just a developer-docs portal. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
10. **Explicit on-device power switch + July 2026 tamper-detection camera disable** — hardware-grade kill switch for the most controversial device in the lineup. Real mitigation. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 27. Biggest Weaknesses

1. **Ad-targeting integration is the trust anchor** — October 1, 2025 announcement that AI interactions will be used to personalize ads is a structural trust deficit. Meta AI is, by design, part of Meta's ad-targeting apparatus. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
2. **User interactions feed back into model training** — Llama 4 training data includes "people's interactions with Meta AI." Opt-in/opt-out mechanics not documented in observed sources. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
3. **News summarization without attribution** (since May 2024) — explainability regression; "ethical and legal concerns." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
4. **Llama 4 benchmark controversy** — Meta used an "experimental chat version" for LMArena, not the public release. LMArena indicated policy changes. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
5. **Galactica precedent (Nov 2022)** — scientific-text LLM withdrawn after three days for racist/inaccurate output. Pattern of under-tested AI releases. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
6. **LibGen training-data lawsuit** — "illegally used works accumulated by the pirate site LibGen to train its artificial intelligence." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
7. **Ray-Ban Meta privacy/safety incidents** — "pervert glasses" label; 404 Media modification kit; January 2026 pickup-artist filming cases; Harvard PimEyes face identification; 2026 Delhi police surveillance. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
8. **Voice-command data sent to Meta servers by default** — opt-out required; opposite of privacy-first. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
9. **Live docs at llama.com/docs are JS-rendered with no SSR** — DX access requires a working JS browser; no `llms.txt` equivalent; no OpenAI-Realtime-API compatibility doc; no Claude-Code CLI flag compatibility. DX is materially worse than xAI's. [Observed: 383 KB HTML, no extractable content, accessed 2026-08-07]
10. **October 2025 AI unit layoffs (600 employees)** — Meta itself called its AI unit "bloated"; signals organizational instability in the AI product surface. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]
11. **No documented consumer-visible reasoning trace / "Think mode"** — explainability regression vs. Grok 3, Claude, ChatGPT-o1. Gap noted.
12. **Mandatory JS for first-touch** — every consumer and developer surface (meta.ai, about.meta.com/ai, ai.meta.com/llama, llama.com, llama.developer.meta.com) returns Cloudflare challenge or empty JS shell to non-JS clients. Direct product inspection was impossible in this research environment. [Observed: all surfaces, accessed 2026-08-07]
13. **No documented equivalent of Grok's `web_search`/`x_search` server-side tools** in observed material — Meta AI's real-time-web integration is undocumented in canonical sources. Gap noted.
14. **Futurism January 2026 report** of a user who developed a messiah complex and lost his job from heavy Ray-Ban Meta use — extreme but documented product-harm case. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]

---

## 28. What should MiMo learn?

(Per task instructions, NO synthesis is to be done — but the prompt explicitly asks "What should MiMo learn?" and "What should MiMo reject?" as sections 28-29. These are *evidence-anchored observations of patterns MiMo could consider*, not synthesis or design recommendations.)

1. **Multi-surface distribution as a primary strategy** — Meta AI's presence inside every Meta surface (FB, IG, WhatsApp, Messenger, Threads, Ray-Ban, Quest) is its single biggest strategic asset. Reach > destination. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
2. **Three-model family with explicit cost/quality/context tradeoffs** (Scout/Maverick/Behemoth) — gives the user/developer a visible tradeoff matrix rather than a single "best" model. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
3. **10M-token context window as a marketing headline** — long-context is a *product-positioning* claim, not just an API spec. Meta uses it to claim "new use cases around memory, personalization, and multi-modal applications." [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
4. **Open-weight releases + community ecosystem (llama.cpp, llamafile, Alpaca, Meditron)** — third-party tooling expands the surface area without Meta engineering cost. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
5. **Multimodal via early fusion** — text and vision tokens pre-trained together, not bolted on. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
6. **Multi-cloud availability** — AWS, Azure, GCP. Avoid cloud lock-in for enterprise customers. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
7. **Llama Startup Program + customer case studies (ANZ bank)** — explicit startup-customer acquisition motion with case-study social proof. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]
8. **Ray-Ban Meta ambient assistive-tech feature** — OCR + TTS + spatial descriptions for blind/low-vision users. Accessibility as a headline product feature, not a checklist. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
9. **Hardware-grade kill switch** — physical power switch + July 2026 tamper-detection camera disable. Real privacy mitigation at the hardware level for the most controversial surface. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
10. **Llama 4 capabilities-page pattern** — three named capability cards (Natively Multimodal / Unparalleled Long Context / Expert Image Grounding) as a product-marketing structure. Clear, falsifiable, named claims. [Source: archived ai.meta.com/llama/, accessed 2026-08-07]

---

## 29. What should MiMo reject?

1. **AI interactions feeding ad personalization** — Meta's October 2025 announcement is the trust-erosion playbook in one sentence. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
2. **User interactions feeding back into model training without clear opt-in** — Llama 4 training data includes "people's interactions with Meta AI." [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
3. **News summarization without source attribution** — Meta AI's pattern of summarizing news without linking to original articles creates legal/ethical exposure and an explainability regression. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
4. **Benchmark-optimized variant different from public release** — the Llama 4 LMArena "experimental chat version" controversy is a model-card-trust failure mode to avoid. [Source: https://en.wikipedia.org/wiki/Llama_(language_model), accessed 2026-08-07]
5. **Galactica-style under-tested AI releases** — three-day withdrawal after racist/inaccurate output. [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
6. **LibGen-style training-data sourcing** — lawsuit over "illegally used works accumulated by the pirate site LibGen." [Source: https://en.wikipedia.org/wiki/Meta_AI, accessed 2026-08-07]
7. **Opt-out (not opt-in) for voice-command server storage** — Ray-Ban Meta's default sends voice commands to Meta servers. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
8. **Mandatory JS for docs access** — llama.com/docs returns no SSR content; DX is gated behind a working JS browser. Hostile to research, accessibility tooling, and SEO. [Observed: 383 KB HTML with mostly CSS variables, accessed 2026-08-07]
9. **No `llms.txt` equivalent** — xAI's machine-readable docs bundle is a competitive DX advantage that Meta has not matched. [Observed: no `llms.txt` discovered on llama.com or ai.meta.com, accessed 2026-08-07]
10. **No documented CLI / Claude-Code-compatibility path** — Meta has no equivalent of Grok Build's CLI agentic-coding surface with explicit Claude Code flag aliases. Gap noted.
11. **Surveillance-product brand entanglement** — Ray-Ban Meta used by Delhi police for protest surveillance; "pervert glasses" label. Consumer-AI products should not be co-marketable as surveillance tools. [Source: https://en.wikipedia.org/wiki/Ray-Ban_Meta, accessed 2026-08-07]
12. **Organizational instability signals** — October 2025 layoff of 600 AI employees with the AI unit described as "bloated" signals product-surface churn risk. [Source: https://en.wikipedia.org/wiki/Meta_Platforms, accessed 2026-08-07]

---

## 30. Confidence Score

**Score: 62/100**

**Reasoning:**
- (+) Wikipedia editorial record is strong for Meta AI division history, Ray-Ban Meta (36K chars), Llama family (54K chars), Meta Platforms corporate context (144K chars). Sections 1, 2, 4, 6, 13, 21, 27 are well-evidenced.
- (+) Archived snapshot of `ai.meta.com/llama/` (1.16 MB) gives direct evidence on Llama 4 model variants, capabilities, benchmarks table, pricing, partner ecosystem, latest-update feed. Sections 1, 3, 10, 17, 24, 25 are well-evidenced.
- (+) Direct observation of `meta.ai/vibes` HTML exposed meta description, Apple iTunes app-id, sidebar structure, "Notifications alt+T" aria-label — minimal but real evidence on the consumer surface.
- (-) Live UI of `www.meta.ai`, `about.meta.com/ai`, `ai.meta.com/llama` (live, not archived), `llama.com`, `llama.com/docs`, `llama.developer.meta.com` — all returned Cloudflare challenge, near-empty JS shell, or 1.5 KB error page under Mozilla curl UA. Sections 5 (consumer navigation), 6 (workspace), 7 (conversation specifics), 14 (keyboard UX), 15-18 (motion/animation/hierarchy/progressive-disclosure), 19 (consumer accessibility) are derived from public documentation and partial HTML rather than direct observation.
- (-) Web-search skill (z-ai-web-dev-sdk `web_search` function) returned persistent 429 errors across the entire session — never recovered, even after multiple 60-90-120-second waits. The canonical web-search path was unusable.
- (-) Bing RSS search returned consistent generic-Meta-corporate results for all six Meta AI queries (same 8 URLs every time) — strong signal of bot-detection.
- (-) DuckDuckGo HTML search returned CAPTCHA challenge.
- (-) Sections 7 (conversation), 8 (agent experience), 11 (search), 12 (execution), 14 (keyboard), 15 (motion), 16 (animation), 22 (explainability), 25 (DX) have material gaps — Meta AI's consumer chat surface and developer API docs were not directly observable.
- (-) No documented equivalent of Grok's `web_search`/`x_search`/`code_execution`/`mcp` tools or Think mode was found in observed material; absence is the evidence but may reflect access gaps rather than actual product absence.

**Comparison anchors:** prior task (langgraph-studio.md, 82/100) had higher confidence because the live CLI was observable; this task (Meta AI, 62/100) is materially lower than Grok (71/100) because Meta's consumer surface is more aggressively JS-gated than xAI's docs surface, and Meta's developer docs (llama.com/docs) are also JS-rendered with no SSR fallback.

---

## Raw evidence inventory (in `/home/z/my-project/research/evidence/raw-meta-ai/`)

- `_en.wikipedia.org_wiki_Meta_AI.html` — Meta AI division Wikipedia (302 KB)
- `_en.wikipedia.org_wiki_Ray-Ban_Meta.html` — Ray-Ban Meta smartglasses Wikipedia (329 KB)
- `_en.wikipedia.org_wiki_Llama_(language_model).html` — Llama family Wikipedia (456 KB)
- `_en.wikipedia.org_wiki_Meta_Platforms.html` — Meta Platforms corporate Wikipedia (1.28 MB)
- `_en.wikipedia.org_wiki_Threads_(social_network).html` — Threads Wikipedia (623 KB)
- `_web.archive.org_web_2025_https___ai.meta.com_llama_.html` — archived Llama landing page (1.16 MB)
- `_web.archive.org_web_2025_https___www.meta.ai_.html` — archived meta.ai (empty shell)
- `_web.archive.org_web_2025_https___www.meta.com_en-us_smart-glasses_.html` — archive (not captured)
- `_web.archive.org_web_2025_https___about.meta.com_ai_.html` — archive (empty)
- `_www.meta.ai_.html` — Cloudflare challenge (478 bytes)
- `_www.meta.ai_vibes_.html` — partial shell with sidebar + meta description (148 KB)
- `_www.meta.com_en-us_ai_.html` — Facebook JS app shell (244 KB, no SSR)
- `_www.meta.com_en-us_smart-glasses_.html` — Facebook JS app shell (244 KB, no SSR)
- `_www.llama.com_docs_.html` — Facebook JS app shell (383 KB, no SSR)
- `_www.llama.com_pricing.html` — Facebook JS app shell (382 KB, no SSR)
- `_llama.com_.html` — Facebook JS app shell (383 KB)
- `_llama.developer.meta.com_.html` — Cloudflare challenge (1542 bytes)
- `_ai.meta.com_llama_.html` — Cloudflare challenge (1542 bytes)
- `_ai.meta.com_blog_.html` — Cloudflare challenge (1542 bytes)
- `bing-rss-*.xml` — three Bing RSS search result feeds (uniform generic-Meta-corporate results)
- `bing-search-*.html` — three Bing HTML SERPs (mostly JS scaffold)
- `wiki-meta-ai.html` — duplicate of Wikipedia Meta AI article
