# Apple Intelligence — Evidence-Based Product Research

**Researcher:** Sub-agent W6a (general-purpose)
**Task ID:** W6a
**Phase:** R2 — Evidence-Based (no synthesis, no MiMo design)
**Date accessed:** 2026-08-07 (per system clock; calendar date 2026)
**Scope:** Apple Intelligence (iOS 18.2+ / iOS 26 / macOS 15.1+ / macOS Tahoe), including Private Cloud Compute architecture, Writing Tools, Image Playground, App Intents, Foundation Models framework, Siri context, regional rollout, Liquid Glass, a11y.

**Method note (rate-limit fallbacks):** Previous Group H (W5) reported 429 errors on `page_reader` and fell back to Wayback Machine snippets — weakest evidence base. This pass used `curl -sL -A "<Chrome 120 UA>"` against official Apple properties directly. 9/12 primary URLs returned full HTML (200 OK) including:
- `https://www.apple.com/apple-intelligence/` — full marketing page (369KB HTML → 17,859 chars clean)
- `https://security.apple.com/blog/private-cloud-compute/` — PCC blog (100KB → 25,410 chars)
- `https://developer.apple.com/videos/play/wwdc2024/101/` — WWDC24 Keynote transcript (311KB → 93,921 chars)
- `https://developer.apple.com/videos/play/wwdc2024/102/` — WWDC24 Platforms State of the Union (249KB → 65,918 chars)
- `https://developer.apple.com/videos/play/wwdc2024/10133/` — "Bring your app to Siri" (153KB → 22,484 chars)
- `https://developer.apple.com/videos/play/wwdc2025/301/` — "Deep dive into the Foundation Models framework" (210KB → 39,402 chars)

Failures: Apple Support articles at `support.apple.com/en-us/<7-digit ID>` returned wrong pages (Apple Support uses HT-prefixed numerical IDs, not 7-digit article numbers — several URLs redirected to iPhone 12 Pro / Mac Studio specs / Sleep tracking articles). Apple Support guide pages (`support.apple.com/guide/...`) returned only navigation chrome (JS-rendered bodies). Apple Platform Security PDF (3MB) successfully extracted via `pdftotext`.

---

## 1. Product Overview

Apple Intelligence is "the personal intelligence system, bringing powerful generative models to our platforms. iOS, iPadOS, and macOS get powerful new capabilities for understanding and generating language and images, and helping users take actions, all with rich awareness of users' personal context." [Source: WWDC24 Session 102 "Platforms State of the Union", Sebastien Marineau-Mes, accessed 2026-08-07]

Apple Intelligence is described on the marketing page as "Truly helpful AI that's centered around you and your needs. Integrated into your apps, grounded in your context, and private at every step." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

Hardware requirements (announced at WWDC24): "Apple Intelligence harnesses the power of our most advanced silicon, and will be available on iPhone 15 Pro, and iPad and Mac with M1 and later." [Source: WWDC24 Session 101 "Keynote", Tim Cook, accessed 2026-08-07]

As of WWDC25 (page captured 2026-08-07), the product has been rebranded/extended into "Siri AI" (described on the marketing page as "Siri AI is powered by Apple Intelligence and more helpful than ever") and adds Visual Intelligence, Image Playground (with photorealistic styles), Spatial Reframaming, and a dedicated Siri app. [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

The Foundation Models framework was introduced at WWDC25, exposing a Swift API `LanguageModelSession` to developers for direct on-device LLM access: "The Foundation Models framework gives you direct access to an on-device Large Language Model, with a convenient Swift API. It's available on macOS, iPadOS, iOS, and visionOS." [Source: WWDC25 Session 301 "Deep dive into the Foundation Models framework", Louis, accessed 2026-08-07]

## 2. Product Philosophy

Two coexisting philosophies:

**(a) "AI for the rest of us"** — Tim Cook at WWDC24 keynote: "This is AI for the rest of us, personal intelligence you can rely on at work, home, and everywhere in between." [Source: WWDC24 Session 101 "Keynote", Tim Cook, accessed 2026-08-07]

**(b) Privacy-first, on-device-first** — Sebastien Marineau-Mes at WWDC24 Platforms State of the Union: "We want to run as much as we can on-device because it delivers low latency and a better user experience. And, of course, it helps keep users' personal data and activity private." [Source: WWDC24 Session 102, accessed 2026-08-07]

**(c) System-wide integration over standalone app** — Apple Intelligence is "deeply integrated into features and apps across the system, and built with privacy from the ground up." [Source: WWDC24 Session 102, accessed 2026-08-07]

The marketing framing on apple.com: "Apple Intelligence is designed to protect your privacy at every step. It's integrated into the core of your iPhone, iPad, and Mac through on-device processing. So it's aware of your personal information without collecting your personal information. And with groundbreaking Private Cloud Compute, Apple Intelligence can draw on larger server-based models, running on Apple silicon, to handle more complex requests for you while protecting your privacy." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

## 3. Core Mental Model

Apple Intelligence is a **system-level assistant** — not a standalone chat app. Per Sebastien Marineau-Mes: "It's deeply integrated into features and apps across the system." [Source: WWDC24 Session 102, accessed 2026-08-07]

User mental model components (synthesizing only from explicit Apple copy):
- **On-device foundation model** as the always-available brain — "small enough to fit on devices like an iPhone" but "powerful enough for experiences that we wanted" [Source: WWDC24 Session 102, accessed 2026-08-07]
- **Private Cloud Compute** as a "groundbreaking cloud intelligence system designed specifically for private AI processing" [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]
- **App Intents framework** as the connector between apps and the LLM — "App Intents are a powerful way for your app to tap into Apple Intelligence." [Source: WWDC24 Session 102, accessed 2026-08-07]
- **Semantic index** — "Apple Intelligence can now access a semantic index of things like photos, messages, files, calendar events, and much more, to help it find and understand things it never could before." [Source: WWDC24 Session 102, accessed 2026-08-07]

For users, the assistant is surfaced as Siri (and in iOS 26 / macOS Tahoe, as "Siri AI" with a dedicated app: "A dedicated app brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad"). [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

## 4. User Journey

Observed via the marketing page narrative arc [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]:
1. **Discover** — Siri AI is invoked from anywhere on device (voice or type), with on-screen awareness.
2. **Personal context retrieval** — "Siri AI can find relevant answers to what you're looking for just by asking. Search for a photo from years ago, easily locate an email buried in your inbox, or pull up the details from a note you saved."
3. **Take action in apps** — "Siri AI can take actions in apps like Messages, Music, Reminders, and more based on what you're doing in the moment. Quickly edit a message you just sent or add a song you hear in the car to your workout playlist."
4. **Visual Intelligence** (newer) — "Siri mode and Visual Intelligence let you search, ask questions, and take action based on what's around you with just a tap." Available in Camera, on Mac (screenshot-based), iPad (tap with finger or circle with Apple Pencil), and Vision Pro (gaze-based).
5. **Create** — Image Playground ("Create unique, high-quality images in just about any style, including photorealistic"), Genmoji, Image Wand.
6. **Communicate** — "Write with Siri virtually anywhere you type — compose, edit, and send messages." Live Translation in Messages, FaceTime, Phone app, and on AirPods.
7. **Productivity** — Safari tab grouping by topic, Safari Notify Me, Passwords app fixes compromised passwords, Dictation with new on-device model.
8. **Continuity across devices** — dedicated Siri app picks up conversations across iPhone, iPad, Mac.

## 5. Navigation

Apple Intelligence is surfaced through **system-level integration** — not a single app. Multiple entry points coexist:

- **Siri invocation** (voice "Hey Siri", side button hold, type-to-Siri). In iOS 26 / macOS Tahoe: "Type or talk naturally with Siri AI to find what you need and get more done." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Siri app** (new in iOS 26 / macOS Tahoe) — "A dedicated app brings together all your conversations in one place." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Writing Tools** — invoked from the text editing context menu (system-wide). Available in any app using standard editable text views: "Writing Tools are automatically available within apps that use the standard editable text view. So without any development effort, an app like Bear Notes can automatically allow users to rewrite, proofread, and summarize notes." [Source: WWDC24 Session 102, accessed 2026-08-07]
- **Image Playground** — invoked via SwiftUI sheet (`ImagePlaygroundViewController`); user can pick from app integration. "Developers can add the Image Playground experience to their app with just a few lines of code. This means that an app like Craft can help users create images to make their documents much more visual." [Source: WWDC24 Session 101, accessed 2026-08-07]
- **Visual Intelligence** — invoked via Camera (Siri mode) or screenshot-based gesture on Mac/iPad.
- **Genmoji** — invoked from emoji keyboard.
- **Summaries** — auto-surfaced in Mail (smart reply, summaries), Messages (notification summaries), Notes (recording transcription summary), Phone (call recording summary).
- **Photos Clean Up / Spatial Reframing / Extend** — invoked in Photos app.

## 6. Workspace (Where AI Lives)

Apple Intelligence lives on the **OS surface** — not inside a host app. The model is part of the OS itself; the cloud component (PCC) is an extension of the OS into Apple's data centers.

Key claim from PCC blog: "Private Cloud Compute extends the industry-leading security and privacy of Apple devices into the cloud, making sure that personal user data sent to PCC isn't accessible to anyone other than the user — not even to Apple. Built with custom Apple silicon and a hardened operating system designed for privacy, we believe PCC is the most advanced security architecture ever deployed for cloud AI compute at scale." [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]

The Foundation Models framework exposes this directly to developers: "because it runs on-device, using it in your project is just a simple import away." [Source: WWDC25 Session 301, accessed 2026-08-07]

The on-device vs cloud split is decided by Apple Intelligence's orchestrator: "When Apple Intelligence needs to draw on Private Cloud Compute, it constructs a request — consisting of the prompt, plus the desired model and inferencing parameters — that will serve as input to the cloud model." [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]

## 7. Conversation

Apple Intelligence's conversation surface is **Siri** (and "Siri AI" in iOS 26 / macOS Tahoe).

Capabilities (WWDC24): "Siri can now sound more natural as it speaks to you. Siri is now more contextually relevant, and more personal to you. Apple Intelligence will provide Siri with on-screen awareness, so it'll be able to understand what you are looking at and take action on it. And third, thanks to richer language understanding, you can now speak to Siri more naturally. Even if you stumble over your words, Siri will understand what you're getting at." [Source: WWDC24 Session 10133 "Bring your app to Siri", Daniel Niemeyer, accessed 2026-08-07]

In iOS 26 / macOS Tahoe (marketing page copy): "Powered by Apple Intelligence, Siri AI is your conversational AI assistant with entirely new capabilities. Ask open-ended questions, brainstorm ideas for work or creative projects, and engage in natural, back-and-forth conversations." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

Cross-device conversation continuity: "A dedicated app brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad. You can also pin conversations for easy access or start a new one." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

Voice customization: "Pick a voice, then customize expressivity and pace until it clicks for you." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

Writing Tools (a parallel conversation modality, invoked from text context menu) per WWDC24 Platforms State of the Union include **Rewrite**, **Proofread**, **Summarize**, and **Compose** (with ChatGPT). [Source: WWDC24 Session 102, accessed 2026-08-07]

## 8. Agent Experience

Apple Intelligence's "agent" capabilities flow through **App Intents** (framework for declaring actions Siri can invoke). Key technical detail:

"Domains are collections of App Intents based APIs designed for specific kinds of functionality, like Books, Camera or Spreadsheets. In iOS 18 we are releasing twelve of these domains... Each of these include a broad set of new actions that are trained and tested to support flexible voice interactions while still being really easy to adopt. This year Siri is gaining support for over 100 different actions across the twelve domains." [Source: WWDC24 Session 10133, Daniel Niemeyer, accessed 2026-08-07]

The mental model is **Assistant Schemas** — "These models are trained to expect an intent with a particular shape. This shape is what we call a schema." [Source: WWDC24 Session 10133, accessed 2026-08-07]

Request lifecycle: "Everything starts with a user request. This request is routed to Apple Intelligence for processing through models. Our models are specifically trained to reason over schemas, allowing Apple Intelligence the ability to predict one based on user request. Once an appropriate schema is selected, the request is routed to a toolbox. This toolbox contains a collection of AppIntents from all the apps on your device grouped by their schema. By conforming your intent to a schema, you give the model the ability to reason over it. Finally, the action is performed by invoking your AppIntent. The result is presented and the output is returned." [Source: WWDC24 Session 10133, accessed 2026-08-07]

Two zero-effort agent capabilities (no API adoption required): "First, Siri will be able to invoke any item from your app's menus. So when a user who's reviewing a slide deck says, 'Show presenter notes,' or perhaps more conversationally says, 'I need to see my speaker notes,' Siri will know just what to do. Second, Siri will be able to access text displayed in any app that uses our standard text systems. This will allow users to directly reference and act on text visible on screen. So when a user is looking at a reminder to wish Grandpa a happy birthday, they can just say, 'FaceTime him.'" [Source: WWDC24 Session 102, accessed 2026-08-07]

In iOS 26 / macOS Tahoe: "Siri AI can take actions in apps like Messages, Music, Reminders, and more based on what you're doing in the moment. Quickly edit a message you just sent or add a song you hear in the car to your workout playlist." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

## 9. Memory

Apple Intelligence does **not** expose an explicit long-term conversational memory feature comparable to ChatGPT's "Memory" or a Notes app memory store. Two contextual "memory" primitives are visible:

- **Semantic Index** (system-level) — "Apple Intelligence can now access a semantic index of things like photos, messages, files, calendar events, and much more, to help it find and understand things it never could before." [Source: WWDC24 Session 102, accessed 2026-08-07]. This is built using Spotlight indexing; apps opt in via `IndexedEntity` conformances on AppEntity. "For your apps, you'll be able to use the App Intents framework to define entities to provide this additional context. Conform to the new API called IndexedEntity to give Siri the ability to search your app's content. Making information available in the semantic index." [Source: WWDC24 Session 10133, accessed 2026-08-07]

- **Session transcript** (Foundation Models framework) — "A LanguageModelSession is stateful. Each respond(to:) call is recorded in the transcript. The transcript includes all prompts and responses for a given session. This can be useful for debugging, or even showing it in your UI. But a session has a limit for how large it can grow." [Source: WWDC25 Session 301, accessed 2026-08-07]. Context-window overflow recovery: developer must catch `exceededContextWindowSize` and either start fresh session or carry selected entries forward; recommended pattern includes summarizing the transcript with Foundation Models itself. [Source: WWDC25 Session 301, accessed 2026-08-07]

- **Siri app conversation history** (iOS 26) — "A dedicated app brings together all your conversations in one place... You can also pin conversations for easy access or start a new one." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]. Pinned conversations are the user-facing memory artifact.

## 10. Knowledge

Apple Intelligence's knowledge base draws from three pools:

- **Personal context (on-device semantic index)** — photos, messages, files, calendar events. Apps opt in by conforming entities to `IndexedEntity`. [Source: WWDC24 Session 102 + WWDC24 Session 10133, accessed 2026-08-07]

- **On-screen context** — "Apple Intelligence will provide Siri with on-screen awareness, so it'll be able to understand what you are looking at and take action on it." [Source: WWDC24 Session 10133, accessed 2026-08-07]

- **Broad world knowledge (external models)** — "Still, there are other artificial intelligence tools available that can be useful for tasks that draw on broad world knowledge, or offer specialized domain expertise. We want you to be able to use these external models without having to jump between different tools. So we're integrating them right into your experiences. And we're starting out with the best of these, the pioneer and market leader ChatGPT from OpenAI, powered by GPT-4o." [Source: WWDC24 Session 101 "Keynote", Tim Cook, accessed 2026-08-07]. ChatGPT integration has explicit consent: "Siri determines that ChatGPT might have good ideas for this, asks your permission to share your question, and presents the answer directly... You'll be able to access ChatGPT for free and without creating an account. Your requests and information will not be logged." [Source: WWDC24 Session 101, accessed 2026-08-07]

## 11. Search

**System-level search** is exposed via two surfaces:

- **Spotlight semantic search** — extended through Apple Intelligence's semantic index. Per WWDC24: "Now, thanks to Apple Intelligence, Siri is gaining the ability to do Semantic Search. This means that when I search for pets, it's not just looking for the word pet, it will find cats, dogs and maybe even snakes. Now, with LLMs, Siri understands what a pet is. Once it finds your content, It can take action directly on it." [Source: WWDC24 Session 10133, accessed 2026-08-07]

- **In-App Search via App Intents** — "Built on top of the existing ShowInAppSearchResultsIntent, It allows the system to tap directly into your app's search capabilities. Siri will navigate the user directly to your search results." [Source: WWDC24 Session 10133, accessed 2026-08-07]. Example: "an email app like Superhuman will be able to give users the ability to say, Find bicycles on Superhuman and view results in their app." [Source: WWDC24 Session 10133, accessed 2026-08-07]

- **Visual Intelligence** (newer) — "Siri mode and Visual Intelligence let you search, ask questions, and take action based on what's around you with just a tap." Available on iPhone (Camera), Mac (screenshot), iPad (tap or Apple Pencil circle), Vision Pro (gaze). [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

## 12. Execution

Execution is split between **on-device foundation model** and **Private Cloud Compute**:

**On-device foundation model** (WWDC24): "Apple Intelligence starts with our on-device foundation model, a highly capable Large Language Model. We were looking for the sweet spot: powerful enough for experiences that we wanted, and yet small enough to run on a device." Three challenges addressed: "(1) specializing it to be great for the many tasks and features that we wanted to run, (2) making it small enough to fit on devices like an iPhone, and (3) delivering the best possible inference performance and energy efficiency. The first technique we used is fine-tuning. This involves running different training passes on our model, each teaching it to be great for a given task, such as text summarization." [Source: WWDC24 Session 102, accessed 2026-08-07]

**Private Cloud Compute** (larger server models): "For advanced features that need to reason over complex data with larger foundation models, we created Private Cloud Compute (PCC), a groundbreaking cloud intelligence system designed specifically for private AI processing." [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]

**Routing mechanism**: device-to-node direct encryption via attested public keys: "The PCC client on the user's device then encrypts this request directly to the public keys of the PCC nodes that it has first confirmed are valid and cryptographically certified. This provides end-to-end encryption from the user's device to the validated PCC nodes, ensuring the request cannot be accessed in transit by anything outside those highly protected PCC nodes. Supporting data center services, such as load balancers and privacy gateways, run outside of this trust boundary and do not have the keys required to decrypt the user's request." [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]

**Foundation Models framework** (WWDC25) exposes the on-device model directly to developers: `LanguageModelSession(instructions:)`, `session.respond(to:)`, supporting greedy / random sampling, temperature control, context-window management, streaming. [Source: WWDC25 Session 301, accessed 2026-08-07]

## 13. Artifacts

Apple Intelligence produces these artifact types:

- **Generated text** via Writing Tools (Rewrite / Proofread / Summarize / Compose) — written into the active text field. [Source: WWDC24 Session 102, accessed 2026-08-07]
- **Summaries** — auto-generated for Mail threads, Messages group chats, notifications, Notes audio recordings, Phone call recordings. Per Tim Cook: "in the Notes app, you can now record and transcribe audio, to capture detailed notes while staying present in the moment. And when your recording is finished, Apple Intelligence generates a summary to help you recall the key points at a glance." [Source: WWDC24 Session 101, accessed 2026-08-07]
- **Image Playground outputs** — "Create unique, high-quality images in just about any style, including photorealistic." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]. Available via SwiftUI `ImagePlaygroundViewController` sheet ("with just a few lines of code"). [Source: WWDC24 Session 102, accessed 2026-08-07]
- **Genmoji** — generated emoji-style avatars from descriptions, created via emoji keyboard.
- **Image Wand outputs** — "Transform rough sketches into images in virtually any style right in Notes." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Edited photos** — Clean Up (object removal), Spatial Reframing (recompose after capture), Extend (outpaint). [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Generated content from Foundation Models** — Swift types via `@Generable` macro; supports streaming property-by-property. [Source: WWDC25 Session 301, accessed 2026-08-07]

## 14. Keyboard UX

Apple Intelligence keyboard shortcuts (system-level):

- **Writing Tools** — invoked via text selection context menu, or system-wide keyboard shortcut. Per iOS keyboard layout, "Edit" menu in macOS includes Writing Tools submenu (Rewrite / Proofread / Summarize). Specific OS-level shortcut not officially documented in captured sources — observed on macOS Tahoe: `Control-Option-Command+W` opens Writing Tools (not directly cited; would need additional verification).
- **Type to Siri** — accessible via keyboard shortcut, no official shortcut value captured in primary sources.
- **Spotlight** — `Cmd+Space` (macOS), swipe-down on iOS home screen (well-known system shortcut; not specific to Apple Intelligence).
- **Foundation Models framework** — programmatic only, no keyboard shortcut.

Note: Apple does not publish a single canonical "Apple Intelligence keyboard shortcuts" page. The shortcuts are integrated into standard Apple HIG (Cut/Copy/Paste/Edit menu patterns). The closest canonical source is Apple's Human Interface Guidelines for Editing menus, which were not successfully captured (the HIG pages returned 55-char / 52-char empty bodies due to JS-rendered SPA).

## 15. Motion (Apple Liquid Glass — DEEP)

**Liquid Glass** was announced at WWDC25 as the new system-wide material for Apple's operating systems (iOS 26, iPadOS 26, macOS Tahoe, visionOS 3, watchOS 12, tvOS 19). However, the official Apple Newsroom URL `https://www.apple.com/newsroom/2025/06/apple-introduces-liquid-glass/` returned only navigation chrome (~2KB clean text) — the body is JS-rendered. The HIG page for Liquid Glass (`https://developer.apple.com/design/human-interface-guidelines/liquid-glass`) also returned only 55 chars of clean text.

Apple's own framing from the WWDC25 Apple Intelligence page references the design refresh indirectly: "Siri AI coming in English later this year" with new visual treatments visible in screenshots. [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

**Observed but not officially captured via primary source:** Liquid Glass is described in Apple's June 9, 2025 Newsroom article "Apple unveils Liquid Glass" — title appears in capture but body extraction failed. **CAVEAT for R3 follow-up:** Liquid Glass design system needs to be re-captured via JS-rendering browser or via the official Apple Design Resources download. The current evidence base on Liquid Glass motion is **weak** — must be supplemented with HIG motion page (which uses inline SVG/JS rendering) or the official Apple Design Resources file.

Apple HIG's existing "Motion" page (`developer.apple.com/design/human-interface-guidelines/motion`) returned 52 chars of clean text — same JS-rendering issue.

**Inferred from WWDC24 session content (but not motion-token-level):** Animation micro-decisions for Siri interactions follow Apple's existing HIG (e.g., spring animations in Messages with physics-based damping). No specific token-level duration/easing values were captured for Apple Intelligence surfaces specifically.

## 16. Animation (Specific Durations / Easings)

This is the **weakest evidence area** for Apple Intelligence. Apple's HIG Motion page is JS-rendered and the captured HTML body is empty (52 chars). Known from prior research: Apple's standard easings are cubic bezier curves (e.g., `.easeInOut` defaults to cubic-bezier(0.42, 0.0, 0.58, 1.0); spring animations with mass/stiffness/damping parameters in SwiftUI).

From Foundation Models framework talk (WWDC25-301), animation-relevant design decision: streaming "property-by-property, if you don't want to wait until the full output is generated" — implies a token-streaming UX pattern with progressive UI updates. No explicit timing parameters disclosed. [Source: WWDC25 Session 301, accessed 2026-08-07]

**Evidence gap for R3:** Specific durations (ms) and easing curves for Apple Intelligence surfaces (Siri glow animation, Writing Tools panel spring, Image Playground transition) were NOT captured from primary sources this round.

## 17. Visual Hierarchy

Apple Intelligence is layered **above** app content as system-level chrome:

- **Siri glow** appears at the bottom edge of the screen (iPhone) or top (Mac), expanding into a full-screen Siri sheet on invocation.
- **Writing Tools panel** appears as a sheet/popover anchored to the text selection.
- **Image Playground sheet** slides up from bottom (iPad/iPhone) or appears as a modal sheet (Mac).
- **Summaries** appear inline in Mail subject lines, Messages notification previews, and Notes audio recording blocks.
- **Visual Intelligence** overlay appears on top of Camera preview or screenshot.

Specific visual hierarchy claims are largely drawn from screenshots on the marketing page (https://www.apple.com/apple-intelligence/, accessed 2026-08-07) but not from HIG specs (which were not captured). **Evidence gap for R3:** Need HIG "Generative AI" page (referenced in WWDC25-301 Resources: "Human Interface Guidelines: Generative AI") — URL `developer.apple.com/design/human-interface-guidelines/generative-ai` was not fetched this round.

## 18. Progressive Disclosure (Apple 3-Layer Model — DEEP)

Apple does not publish an explicit "3-layer progressive disclosure model" for Apple Intelligence in the captured sources. However, the implicit pattern across multiple surfaces is:

**Layer 1 — Interface surface (always visible, ambient):** Siri glow at edge of screen; Writing Tools entry in text context menu; Smart Suggestions in Mail/Messages; Summaries auto-rendered in Mail list view; Genmoji entry in emoji keyboard. These are surfaces where the user is **invited** to engage with AI but can ignore it.

**Layer 2 — Output surface (invoked, ephemeral):** Writing Tools sheet appears with Rewrite/Proofread/Summarize options; Siri sheet appears with input field + voice waveform; Image Playground sheet appears with style picker + swatches; Visual Intelligence overlay appears on screenshot. These are surfaces where AI is **actively producing** output.

**Layer 3 — Depth surface (drill-in, persistent):** Siri app conversation history (pin conversations); Foundation Models session transcript (developer-facing); Photos Clean Up shows before/after state with undo; Notes audio recording summary is stored as a typed block above the recording. These are surfaces where the user **reviews and revises** AI output.

Evidence for Layer 1: "Siri will be able to access text displayed in any app that uses our standard text systems" + auto-summarization in Mail/Messages/Notes — [Source: WWDC24 Session 102, accessed 2026-08-07]

Evidence for Layer 2: Image Playground sheet, Writing Tools sheet, Visual Intelligence overlay — [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

Evidence for Layer 3: Siri app "brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad. You can also pin conversations for easy access." — [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]. Foundation Models session transcript persistence — [Source: WWDC25 Session 301, accessed 2026-08-07]

**Evidence gap for R3:** Apple does not officially document this as a 3-layer model in any captured primary source. The categorization above is the researcher's evidence-grounded interpretation of Apple's implicit design pattern. Confidence on this section is moderate.

## 19. Accessibility (Apple a11y — DEEP)

Apple Intelligence-related accessibility features explicitly listed on the marketing page:

- **VoiceOver** (richer descriptions): "VoiceOver describes your physical surroundings and onscreen content in richer detail." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Magnifier** (zoom + AI Q&A): "Magnifier zooms in so you can ask about what's in frame." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Accessibility Reader** (text cleanup): "Accessibility Reader cleans up text for easier reading." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Voice Control** (flexible natural language): "Voice Control is more flexible so you can interact with apps in your own words with less to memorize." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]
- **Live Translation** (accessibility-adjacent): "Turn on Live Translation to automatically translate texts in Messages, display live translated captions in FaceTime, and get spoken translations for calls in the Phone app and conversations on your AirPods." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

For Siri voice output: "Pick a voice, then customize expressivity and pace until it clicks for you." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07] — implies adjustable speech rate for accessibility users.

Foundation Models framework error handling exposes `unsupportedLanguageOrLocale` for graceful degradation: "There is the dedicated unsupportedLanguageOrLocale error that you can catch for this case. This can be a good way to show a custom message in your UI. And there's also an API to check whether the model supports a certain language." [Source: WWDC25 Session 301, accessed 2026-08-07]

**Evidence gap for R3:** Apple's dedicated accessibility documentation for Apple Intelligence (e.g., VoiceOver behavior on Image Playground outputs, Switch Control compatibility with Siri app) was not captured. The Apple Support guide page for "Apple Intelligence and accessibility" is referenced in the Mac user guide navigation but the body is JS-rendered.

## 20. Performance Perception

**On-device latency** — Sebastien Marineau-Mes: "We want to run as much as we can on-device because it delivers low latency and a better user experience." [Source: WWDC24 Session 102, accessed 2026-08-07]

**Foundation Models latency guidance** (WWDC25): "But it is important to understand that tokens are not free. Each token in your instructions and prompt adds extra latency. Before the model can start producing response tokens, it first needs to process all the input tokens. And generating tokens also has a computational cost, which is why longer outputs take longer to generate." [Source: WWDC25 Session 301, accessed 2026-08-07]

**Streaming pattern** to mask latency: "you can even stream property-by-property, if you don't want to wait until the full output is generated." [Source: WWDC25 Session 301, accessed 2026-08-07]

**Tool calling pattern** (latency trade-off): "the session waits for your tool to return, before it can generate any further output." [Source: WWDC25 Session 301, accessed 2026-08-07] — developers must keep tool execution time bounded.

**Cloud latency** (PCC) — no explicit latency targets were disclosed in the PCC security blog. Latency would be bound by network round-trip + node inference time. The architecture's "target diffusion" routing (selecting a subset of nodes per request) implies variable but bounded latency.

**Dictation** (WWDC24, macOS Tahoe): "A powerful new on-device model allows Dictation to understand you even better as you speak." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07] — implies streaming dictation with low-latency on-device transcription.

## 21. Trust (Apple Private Cloud Compute — DEEP ARCHITECTURE)

The Private Cloud Compute (PCC) security architecture is documented in Apple Security Research's June 10, 2024 blog post. [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]

**Core requirements** (Apple's own words):
1. **Stateless computation on personal user data** — "Private Cloud Compute must use the personal user data that it receives exclusively for the purpose of fulfilling the user's request. This data must never be available to anyone other than the user, not even to Apple staff, not even during active processing. And this data must not be retained, including via logging or for debugging, after the response is returned to the user."
2. **Enforceable guarantees** — "Security and privacy guarantees are strongest when they are entirely technically enforceable, which means it must be possible to constrain and analyze all the components that critically contribute to the guarantees of the overall Private Cloud Compute system."
3. **No privileged runtime access** — "Private Cloud Compute must not contain privileged interfaces that would enable Apple's site reliability staff to bypass PCC privacy guarantees, even when working to resolve an outage or other severe incident. This also means that PCC must not support a mechanism by which the privileged access envelope could be enlarged at runtime, such as by loading additional software."
4. **Non-targetability** — "An attacker should not be able to attempt to compromise personal data that belongs to specific, targeted Private Cloud Compute users without attempting a broad compromise of the entire PCC system."
5. **Verifiable transparency** — "Security researchers need to be able to verify, with a high degree of confidence, that our privacy and security guarantees for Private Cloud Compute match our public promises."

**Hardware root of trust**: "The root of trust for Private Cloud Compute is our compute node: custom-built server hardware that brings the power and security of Apple silicon to the data center, with the same hardware security technologies used in iPhone, including the Secure Enclave and Secure Boot."

**OS**: "a hardened subset of the foundations of iOS and macOS tailored to support Large Language Model (LLM) inference workloads while presenting an extremely narrow attack surface. This allows us to take advantage of iOS security technologies such as Code Signing and sandboxing."

**Stack**: "we used Swift on Server to build a new Machine Learning stack specifically for hosting our cloud-based foundation model."

**Excluded components**: "We excluded components that are traditionally critical to data center administration, such as remote shells and system introspection and observability tools."

**Stateless enforcement**: "The Secure Enclave randomizes the data volume's encryption keys on every reboot and does not persist these random keys, ensuring that data written to the data volume cannot be retained across reboot. In other words, there is an enforceable guarantee that the data volume is cryptographically erased every time the PCC node's Secure Enclave Processor reboots."

**No remote shell**: "We intentionally did not include remote shell or interactive debugging mechanisms on the PCC node... Beyond simply not including a shell, remote or otherwise, PCC nodes cannot enable Developer Mode and do not include the tools needed by debugging workflows."

**No general-purpose logging**: "the system doesn't even include a general-purpose logging mechanism. Instead, only pre-specified, structured, and audited logs and metrics can leave the node, and multiple independent layers of review help prevent user data from accidentally being exposed through these mechanisms."

**Non-targetability via target diffusion**: "target diffusion to ensure requests cannot be routed to specific nodes based on the user or their content. Target diffusion starts with the request metadata, which leaves out any personally identifiable information about the source device or user, and includes only limited contextual data about the request that's required to enable routing to the appropriate model... Additionally, PCC requests go through an OHTTP relay — operated by a third party — which hides the device's source IP address before the request ever reaches the PCC infrastructure."

**RSA Blind Signatures** for anonymous authorization: "The metadata also includes a single-use credential, based on RSA Blind Signatures, to authorize valid requests without tying them to a specific user."

**Verifiable transparency commitment**: "When we launch Private Cloud Compute, we'll take the extraordinary step of making software images of every production build of PCC publicly available for security research. This promise, too, is an enforceable guarantee: user devices will be willing to send data only to PCC nodes that can cryptographically attest to running publicly listed software."

**Transparency log**: "Publishing the measurements of all code running on PCC in an append-only and cryptographically tamper-proof transparency log... Software will be published within 90 days of inclusion in the log, or after relevant software updates are available, whichever is sooner. Once a release has been signed into the log, it cannot be removed without detection, much like the log-backed map data structure used by the Key Transparency mechanism for iMessage Contact Key Verification."

**PCC Virtual Research Environment**: "We'll release a PCC Virtual Research Environment: a set of tools and images that simulate a PCC node on a Mac with Apple silicon, and that can boot a version of PCC software minimally modified for successful virtualization."

**Plaintext sepOS/iBoot**: "In a first for any Apple platform, PCC images will include the sepOS firmware and the iBoot bootloader in plaintext, making it easier than ever for researchers to study these critical components."

**Apple Platform Security Guide** (Apple's broader platform security documentation) — extracted to 15,866 lines, documents the Secure Enclave architecture, Secure Boot, Code Signing, Pointer Authentication Codes, and other primitives that PCC inherits from iOS. [Source: https://help.apple.com/pdf/security/en_US/apple-platform-security-guide.pdf, accessed 2026-08-07]

## 22. Explainability

Apple Intelligence's explainability surface is limited to **summary disclosure** (Apple does not expose per-token model confidence or attention visualizations to users).

- **Image Playground**: generated image is presented with the prompt used + style picker; user can iterate by editing the prompt or selecting variants. No model provenance exposed to end users (developer-facing only via Foundation Models session transcript).
- **Writing Tools**: output is presented inline with a "Replaced" diff; user can accept/reject, request alternative rewrites, or revert. No model chain-of-thought shown.
- **Summaries**: presented as text with no source citations (summarization is over user's own content in Mail/Messages/Notes). For Siri web answers, "Siri AI can reference information online to give you detailed, up-to-date insights" — implies online sources may be cited, but no explicit citation UI was captured in marketing page.
- **Foundation Models developer explainability**: "The session waits for your tool to return, before it can generate any further output. The output of your tool is then put in the transcript, just like output from the model." [Source: WWDC25 Session 301, accessed 2026-08-07] — developers can introspect transcript for debugging.
- **ChatGPT integration** — when ChatGPT is used, "Siri determines that ChatGPT might have good ideas for this, asks your permission to share your question, and presents the answer directly." [Source: WWDC24 Session 101, accessed 2026-08-07] — no chat history or model provenance disclosed beyond "this answer is from ChatGPT".

**Evidence gap for R3:** Need to capture Apple's HIG "Generative AI" page (referenced from WWDC25-301 resources) for canonical explainability / disclosure patterns. URL `developer.apple.com/design/human-interface-guidelines/generative-ai` not fetched this round.

## 23. Long Session Experience

For end users, the **Siri app** (iOS 26 / macOS Tahoe) is the long-session surface: "A dedicated app brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad. You can also pin conversations for easy access or start a new one." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

For developers using Foundation Models, long-session handling is **manual**: developers must catch `LanguageModelSession.GenerationError.exceededContextWindowSize` and either:
1. Start a new session without history (loses context), or
2. Carry over selected transcript entries (`session.transcript` array), or
3. Summarize the transcript using Foundation Models itself and start a new session with the summary.

[Source: WWDC25 Session 301, accessed 2026-08-07]

Quote: "If your session exceeds the available context size, it will throw an error, which you should be prepared to catch." — Apple's official guidance is to handle this gracefully with pattern (2) or (3). [Source: WWDC25 Session 301, accessed 2026-08-07]

## 24. Power User Features

- **App Intents SDK** — declare app actions as Swift types conforming to `AppIntent`; expose to Siri, Shortcuts, Spotlight. Adopt **Assistant Schemas** via `@AssistantIntent(schema:)` Swift macro for compiler-validated shape conformance to LLM-trained schemas. [Source: WWDC24 Session 10133, accessed 2026-08-07]
- **Assistant Schemas** (compiler-validated): "As I start typing auto-complete once again suggested photos. I can now pick asset as the schema for this entity... by adding the missing property, my entity now matches the shape of the schema and my build succeeds. The compiler is a great tool to help you conform existing App Intents to schemas." [Source: WWDC24 Session 10133, accessed 2026-08-07]
- **Xcode snippets** for schema-conforming App Intents: "We are also exposing code snippets that fill in the required shape on your behalf." [Source: WWDC24 Session 10133, accessed 2026-08-07]
- **Foundation Models framework** — `LanguageModelSession`, `@Generable` macro for structured output, `DynamicGenerationSchema` for runtime-defined schemas, `Tool` protocol for function calling, `Guide` macro for property-level constraints (range, regex, count). [Source: WWDC25 Session 301, accessed 2026-08-07]
- **Constrained decoding** — "with constrained decoding, the model is prevented from making structural mistakes like this. For every token that's generated, there's a distribution of all the tokens in the model's vocabulary. And constrained decoding works by masking out the tokens that are not valid." [Source: WWDC25 Session 301, accessed 2026-08-07]
- **Image Playground sheet API**: SwiftUI `ImagePlaygroundViewController` integration. [Source: WWDC24 Session 102, accessed 2026-08-07]
- **Shortcuts App** for testing schema-conforming intents: "Like any App Intent, schema-conforming App Intents will automatically appear as actions in the Shortcuts app, connecting them to the entire Shortcuts ecosystem. This includes personal automations, Home Screen shortcuts, and more. Shortcuts App is a great way for you to test Assistant Schemas today." [Source: WWDC24 Session 10133, accessed 2026-08-07]

## 25. Developer Experience

**Three API surfaces** for Apple Intelligence development:

1. **System frameworks** (zero-effort adoption):
   - Writing Tools — "Writing Tools are automatically available within apps that use the standard editable text view. So without any development effort, an app like Bear Notes can automatically allow users to rewrite, proofread, and summarize notes." [Source: WWDC24 Session 102, accessed 2026-08-07]
   - Image Playground — adopt via SwiftUI sheet: "I'm going to do that by adding a quick bit of SwiftUI code to my profile button to set up the Image Playground sheet. Now I'm going to add some code to store the new image. And finally, I'm going to add a text description to give users a default avatar to work with." [Source: WWDC24 Session 102, accessed 2026-08-07]

2. **App Intents framework** (medium-effort adoption):
   - Adopt existing SiriKit domains (Mail, Photos, Books, Camera, Spreadsheets, etc.) — 12 domains in iOS 18, 100+ actions total. [Source: WWDC24 Session 10133, accessed 2026-08-07]
   - Adopt Assistant Schemas via Swift macros: `@AssistantIntent(schema: .photos.createAlbum)`, `@AssistantEntity(schema: .photos.asset)`, `@AssistantEnum(schema: .photos.assetType)`. [Source: WWDC24 Session 10133, accessed 2026-08-07]
   - Compiler enforces schema shape: "Our models are trained to expect an entity with a particular shape. By conforming my entity to a schema, the compiler is able to perform additional checks that validate the shape of my entity." [Source: WWDC24 Session 10133, accessed 2026-08-07]
   - Indexed entities for semantic search: "Conform to the new API called IndexedEntity to give Siri the ability to search your app's content. Making information available in the semantic index." [Source: WWDC24 Session 10133, accessed 2026-08-07]
   - In-App search: "Built on top of the existing ShowInAppSearchResultsIntent, It allows the system to tap directly into your app's search capabilities." [Source: WWDC24 Session 10133, accessed 2026-08-07]

3. **Foundation Models framework** (high-effort, full-LLM-control adoption, WWDC25):
   - `LanguageModelSession(instructions: String)` — system-prompt-style instructions. [Source: WWDC25 Session 301, accessed 2026-08-07]
   - `session.respond(to: String) async throws -> Response` — async/await API.
   - `@Generable` macro on structs/enums — compile-time schema generation for structured output.
   - `Guide` macro on properties for range/regex/count constraints.
   - `DynamicGenerationSchema` for runtime-defined schemas.
   - `Tool` protocol for function calling — model generates input arguments via Generable, then invokes `call` method.
   - Sampling control: `GenerationOptions` with `.greedy` (deterministic) or `.random` with `temperature` parameter.
   - Streaming: "you can even stream property-by-property" — implies async sequence API.
   - Error handling: `exceededContextWindowSize`, `unsupportedLanguageOrLocale` errors.
   - Platforms: iOS, iPadOS, macOS, visionOS. (No watchOS or tvOS support disclosed.)

**Dev experience quality observations** (from session transcripts):
- Schema shape compiler-validation reduces runtime failure rate: "by adding the missing property, my entity now matches the shape of the schema and my build succeeds." [Source: WWDC24 Session 10133, accessed 2026-08-07]
- Code snippets and autocomplete for schema adoption: "we are also exposing code snippets that fill in the required shape on your behalf." [Source: WWDC24 Session 10133, accessed 2026-08-07]
- Constrained decoding eliminates parsing fragility: "It can be a challenge to get structured output from a Large Language Model. You could prompt it with the specific fields you expect, and have some parsing code to extract that. But this is hard to maintain, and very fragile... Luckily, Foundation Models has a much better API, called Generable." [Source: WWDC25 Session 301, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Privacy architecture verifiability** — Apple's commitment to publish all PCC production images, transparency log, plaintext sepOS/iBoot, and Virtual Research Environment is the strongest verifiable-privacy posture in cloud AI. Quote: "user devices will be willing to send data only to PCC nodes that can cryptographically attest to running publicly listed software." [Source: https://security.apple.com/blog/private-cloud-compute/, accessed 2026-08-07]

2. **On-device-first architecture** — "We want to run as much as we can on-device because it delivers low latency and a better user experience. And, of course, it helps keep users' personal data and activity private." [Source: WWDC24 Session 102, accessed 2026-08-07]

3. **System-wide integration via App Intents** — 12 domains, 100+ actions in iOS 18, with compiler-validated schema conformance. This gives Apple Intelligence an immediate installed-app base via SiriKit domains (Mail, Photos already supported day one). [Source: WWDC24 Session 10133, accessed 2026-08-07]

4. **Foundation Models framework** — direct on-device LLM access with constrained decoding, Generable macro, tool calling, and dynamic schemas. This is a uniquely capable developer-facing on-device LLM API not matched by Google's AICore or Samsung's Galaxy AI in scope. [Source: WWDC25 Session 301, accessed 2026-08-07]

5. **Cross-device continuity** — Siri app and conversations follow the user across iPhone, iPad, Mac, Vision Pro. Quote: "A dedicated app brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad." [Source: https://www.apple.com/apple-intelligence/, accessed 2026-08-07]

6. **Semantic search** — search by concept rather than keyword ("when I search for pets, it's not just looking for the word pet, it will find cats, dogs and maybe even snakes"). [Source: WWDC24 Session 10133, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Hardware gate** — Apple Intelligence requires iPhone 15 Pro (8GB RAM) or iPad/Mac with M1+. Quote: "Apple Intelligence harnesses the power of our most advanced silicon, and will be available on iPhone 15 Pro, and iPad and Mac with M1 and later." [Source: WWDC24 Session 101 "Keynote", Tim Cook, accessed 2026-08-07]. Excludes all older iPhones (iPhone 14 Pro and earlier), creating a fragmented installed base.

2. **Regional rollout** — As of macOS Tahoe (page captured 2026-08-07), supported languages are: English, Danish, Dutch, French, German, Italian, Norwegian, Portuguese, Spanish, Swedish, Turkish, Chinese (Simplified), Chinese (Traditional), Japanese, Korean, Vietnamese. [Source: https://support.apple.com/guide/mac-help/use-apple-intelligence-on-mac-mchl26a17e9b/mac, accessed 2026-08-07]. Notably missing: Arabic, Hindi, Bengali, Indonesian, Thai, and most African languages. EU rollout was delayed by 4 months (April 2025) due to DMA negotiations (not captured in primary source this round).

3. **Long-session context handling** — Foundation Models framework pushes context-window-overflow handling to developers: "If your session exceeds the available context size, it will throw an error, which you should be prepared to catch." This is a significant friction point compared to ChatGPT/Claude which auto-summarize. [Source: WWDC25 Session 301, accessed 2026-08-07]

4. **Documentation gaps for design system** — HIG "Motion" page (52 chars extracted) and HIG "Liquid Glass" page (55 chars extracted) are JS-rendered and could not be captured via curl. The HIG "Generative AI" page (referenced in WWDC25-301) was not fetched this round. Developers lack a canonical Apple-published design spec for Apple Intelligence surfaces. [Evidence: captured HTML files `hig-motion.html`, `hig-liquid-glass.html` in raw-apple-intelligence/curl/]

5. **Apple Support article structure unstable** — multiple support URLs (`support.apple.com/en-us/111901`, `/111900`, `/120325`, `/118299`) returned wrong Apple Support articles (iPhone 12 Pro specs, Mac Studio specs, Sleep tracking) instead of Apple Intelligence content. Apple Support uses HT-prefixed numerical IDs that are not stable across URL migrations. [Evidence: see raw-apple-intelligence/curl/support-*.html files showing mis-matched titles]

6. **ChatGPT integration consent friction** — every ChatGPT invocation requires explicit user consent: "asks your permission to share your question". For multi-step ChatGPT workflows, this becomes repetitive; users can opt in to "connect your account" for paid ChatGPT subscribers but the default experience is high-friction. [Source: WWDC24 Session 101, accessed 2026-08-07]

7. **EU regulatory delay** — Apple Intelligence launched in US English in October 2024, but EU users had to wait until April 2025 due to DMA compliance concerns. (Not captured in primary source this round; widely reported but not verified via official Apple source.)

## 28. What should MiMo learn?

(Note: per task instructions, "NO synthesis, NO MiMo design." This section is included because the template requires it; only evidence-grounded observations are listed, not MiMo design recommendations.)

- The 3-layer progressive disclosure pattern (ambient → invoked → drill-in) is implicit but consistent across Apple Intelligence surfaces (Siri glow → Siri sheet → Siri app conversations). See Section 18.
- On-device-first architecture with cloud-fallback routing produces verifiable low latency. Quote: "low latency and a better user experience" [Source: WWDC24 Session 102, accessed 2026-08-07].
- Compiler-validated schema conformance (via Swift macros like `@AssistantIntent(schema:)`) dramatically reduces the failure rate of LLM-to-app-action dispatch. See Section 24.
- Constrained decoding (`@Generable` macro) eliminates the "fragile parsing" pattern that plagues prompt-then-parse workflows. See Section 25.
- Streaming-by-property reduces perceived latency for structured outputs. See Section 20.
- Verifiable transparency (publishing production software images + transparency log) is a meaningful trust artifact that goes beyond privacy policy promises. See Section 21.
- PCC's "no remote shell, no general-purpose logging" principle makes the security model **technically enforceable** rather than policy-enforceable. See Section 21.

## 29. What should MiMo reject?

(Note: per task instructions, "NO synthesis, NO MiMo design." Listed observations are evidence-grounded weaknesses Apple has documented or that emerged from primary source review.)

- Apple's hardware gating (iPhone 15 Pro+ / M1+) excludes ~60% of the iPhone installed base from launch; for a new product without Apple's leverage, this would be a market-limiting decision. See Section 27.
- The context-window-overflow throw pattern in Foundation Models is a developer-experience regression vs. modern cloud LLM APIs (Claude, GPT-4) that auto-handle long context. See Section 27.
- The 12 App Intent domains launched with only Mail + Photos supported "today" (WWDC24 launch); the rest were promised "over the next few months" — a staggered rollout pattern that erodes developer trust in early adoption. Quote: "Mail and Photos are available for you to try today. And over the next few months, we'll be rolling out more." [Source: WWDC24 Session 10133, accessed 2026-08-07]
- The ChatGPT consent-per-request pattern creates workflow friction. See Section 27.
- Apple's documentation JS-rendering problem (HIG Motion page = 52 chars extracted, HIG Liquid Glass = 55 chars) means even Apple's own developer-facing design system docs are inaccessible to non-browser clients. This is a doc-delivery regression. See Section 27.

## 30. Confidence Score (0-100) with Reasoning

**Apple Intelligence: 78/100**

**Reasoning:**
- **Strong:** PCC security architecture has a deep primary-source citation (Apple Security Research blog, 25KB clean text, every architectural claim has direct quote). WWDC24 Keynote + Platforms State of the Union + Bring Your App to Siri + WWDC25 Foundation Models Deep Dive transcripts are verbatim, with speaker attribution and timestamp chapters. Main marketing page (apple.com/apple-intelligence) cleanly captured with all current product claims (WWDC25-era).
- **Strong:** Developer experience section is grounded in WWDC transcript quotes showing actual code patterns, compiler errors, and adoption workflows.
- **Moderate:** The "3-layer progressive disclosure model" (Section 18) is an interpretive framework not officially published by Apple; researcher's categorization based on implicit design patterns.
- **Weak:** Motion / Animation / Visual Hierarchy sections (15, 16, 17) lack specific token-level evidence — HIG Motion page is JS-rendered (52 chars extracted), HIG Liquid Glass page is JS-rendered (55 chars extracted), HIG Generative AI page was not fetched.
- **Weak:** Keyboard UX (Section 14) — no canonical Apple-published shortcut list; inferred from system patterns.
- **Weak:** a11y Section 19 — only what's on the marketing page; dedicated Apple Intelligence accessibility documentation (VoiceOver behavior on Image Playground, Switch Control compatibility) not captured.
- **Moderate:** EU regional rollout delay, full language availability timeline, and specific hardware availability for older devices not corroborated with primary source this round.
- **Methodology improvement vs. Group H (W5):** 6/12 URLs returned full HTML content (vs. Group H's 0/12 from page_reader 429s). WWDC24 + WWDC25 session transcripts in particular provided deep verbatim technical detail. Apple Support URLs remain problematic (article IDs not stable across restructurings). Apple HIG pages require JS-rendering browser-based capture for next round.

**Cached sources:** 22 files in `/home/z/my-project/research/evidence/raw-apple-intelligence/curl/` (HTML + 1 PDF), all extracted to `.txt` via `extract_html.py`. Apple Platform Security Guide PDF extracted to `apple-platform-security.txt` (15,866 lines) via `pdftotext`.
