# Research Group H — System-Level AI & Agent Platform UX (2024–2025)

**Task ID:** H · **Agent:** Senior Product/UX Researcher · **Scope:** Pure research, NO UI code
**Subject:** How SYSTEM-LEVEL AI products integrate into the OS, and how AGENT PLATFORMS visualize agent work — studied through 21 philosophical angles per product, across 6 products.

**Method note:** 6 web searches (z-ai web_search) → 9 page reads attempted via z-ai `page_reader`; the SDK returned HTTP 429 on every page_reader call (sustained rate-limit during concurrent sibling-agent runs), so page content was instead fetched via direct `curl` (with browser UA) and, for JS-rendered or captcha-walled pages (Dust blog, FastCompany), via the Internet Archive Wayback Machine. All citations below come from real fetched pages cached in `/home/z/my-project/research/searches/pages/`. Per-product URL list at the end of each section.

**Context (MiMo):** MiMo is a single-user AI Operating System — conversation-spine OS for one power user. The MiMo Design Specification (already drafted; see worklog) defines MiMo as NOT-conversation-only but conversation-spine + canvas-per-MODE, with the ONE defining interaction being Hold-Space peek + ⌘K act + ⌘⇧Tab quick-AI. This research exists to inform HOW system-level AI should sit inside MiMo and HOW agent work should be visualized for the single power user.

---

## 1. Apple Intelligence — verified via
- https://www.apple.com/newsroom/2024/12/apple-intelligence-now-features-image-playground-genmoji-and-more (Dec 11, 2024)
- https://developer.apple.com/apple-intelligence/ (developer docs, fetched 2025)
- https://www.apple.com/apple-intelligence (consumer)
- https://www.apple.com/newsroom/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac (Jun 10, 2024 — WWDC announcement)

### Product / UX Philosophy / Mental Model
**Product philosophy (1):** Apple Intelligence is "the easy-to-use personal intelligence system that delivers helpful and relevant intelligence while taking an extraordinary step forward for privacy in AI" (Apple Newsroom Dec 11 2024). The product is not an app — it is an *intelligence layer* woven through iOS 18.2 / iPadOS 18.2 / macOS Sequoia 15.2. Every existing surface (Messages, Notes, Mail, Safari, Photos, Freeform, Keynote, third-party text fields) inherits new AI capabilities without the user "opening Apple Intelligence." The defining product verb is *help*, not *chat*.

**UX philosophy (2):** "Fun," "easy," "in the moment," "without having to switch between apps." Apple's design philosophy is *ambient assistance* — the AI shows up where the user already is, in the idiom of the host app. There is no Apple Intelligence "home screen"; instead there are five concrete capabilities (Writing Tools, Image Playground, Genmoji, Visual Intelligence, Siri context) each appearing in their native context. The aesthetic is restrained — Image Playground intentionally ships only 2 styles at launch (Animation, Illustration) plus Sketch later, *to reduce choice paralysis*.

**Mental model (3):** Neither assistant nor agent — **personal intelligence system**. The user's mental model is "my device got smarter," not "I now have an AI friend." Siri remains an assistant (suggest, retrieve, route), Writing Tools are tools (rewrite/proofread/summarize), Image Playground is a tool (create images), Visual Intelligence is a "look at this" action, Genmoji is "make me an emoji." The system-level metaphor is *capability surfaces appearing in existing apps*, not a single new app.

### IA / Interaction / Cognitive Load / Progressive Disclosure
**Information architecture (4):** No new top-level IA. Capabilities attach to existing affordances: Writing Tools attach to any system text control; Image Playground is both a dedicated app AND an inline picker inside Messages/Freeform/Keynote; Genmoji lives inside the emoji keyboard; Visual Intelligence lives behind Camera Control on iPhone 16; Siri lives behind the side button / "Siri" wake word / Type-to-Siri. App Intents (developer.apple.com) is the unifying IA primitive — "entity schemas contribute your content to the Spotlight semantic index for personal context understanding, while intent schemas let people take action on that content naturally, with no specific phrases to define and no code changes needed as Siri's language understanding evolves." Spotlight is the de-facto semantic index for personal context.

**Interaction design (5):** Direct, gesture-native, single-tap. Image Wand: "circle a rough sketch" → polished image. Camera Control (iPhone 16 hardware): one click → visual intelligence. Writing Tools "Describe Your Change": user types "make this a poem" instead of choosing Rewrite/Proofread/Summarize. Genmoji: type a description into the emoji keyboard, get multiple options. Every interaction is one or two taps from intent, never a chat session.

**Cognitive load (6):** Very low *per interaction* — but spread across many surfaces. Apple deliberately ships few options (2 image styles, 4 Writing Tools verbs) so the user never sees a menu of 30 AI features. The cost is discoverability — many users in 2024–25 did not realize Apple Intelligence was installed.

**Progressive disclosure (7):** Layered. Layer 0 = host app (Messages, Notes, Mail). Layer 1 = AI affordance visible in toolbar (Writing Tools icon, Image Playground icon, emoji keyboard Genmoji). Layer 2 = capability chooser (Animation vs Illustration). Layer 3 = full editor (Image Playground app for fine control). The user descends only as far as needed.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX
**Human-AI collaboration (8):** User initiates 100% of actions; AI never volunteers. The only "agent-like" surface is Siri's upcoming onscreen awareness + personal context (announced for later in 2025). The collaboration model is *tool use*, not delegation. Describe Your Change is the closest to dialogue: "rewrite my dinner party invitation as a poem."

**Agent UX (9):** None visible. There is no agent graph, no step trace, no "what is Siri doing?" view. The system works invisibly. This is the OPPOSITE of LangGraph Studio (see §3).

**Workspace UX (10):** Each host app IS the workspace; Apple does not impose a new one. Image Playground as a dedicated app is the only "AI workspace" — a canvas for image generation with concept chips (themes, costumes, accessories, places).

**Long session experience (11):** No long sessions by design. Apple Intelligence is built for micro-interactions (rewrite this paragraph, make an emoji, summarize this email). The only long-session surface is Siri+ChatGPT Compose, which delegates to ChatGPT's UX.

**Keyboard-driven UX (12):** Type-to-Siri exists. "Describe Your Change" is keyboard input. Genmoji is keyboard-typed. Otherwise the system is gesture/tap first.

**Visual hierarchy (13):** Apple's standard HIG — semantic system colors, San Francisco type, generous whitespace, frosted-glass materials. AI affordances inherit the host app's visual language, NOT a special "AI purple" accent. Image Playground uses distinctive Animation/Illustration style as the visual differentiator rather than a separate brand.

**Motion design (14):** Restrained, system-default spring animations. Image generation shows a brief shimmer/pulse during generation (not a spinner). Genmoji options slide-in. Visual Intelligence camera preview is the real camera feed with overlay UI.

**Design systems (15):** Built on HIG. New tokens: AI surfaces use the system's standard materials (no new design language). Foundation Models framework (developer API) reuses SwiftUI primitives — `@Generable`, `Image Playground` view modifier, `.imagePlayground(isPresented:)`.

**Accessibility (16):** All AI surfaces inherit VoiceOver, Dynamic Type, Voice Control, Switch Control automatically because they are built on standard UIKit/SwiftUI text controls. "If you're using any of the standard UI frameworks to render text fields, your app will automatically have this ability" (Apple Developer docs). This is a major accessibility win vs. chat-only AI products.

**Performance perception (17):** On-device models run instantly (no network wait). Private Cloud Compute shows a brief loading state. Apple's `Evaluations` framework lets developers measure reliability across dynamic conditions — built-in eval.

**Explainability (18):** Weak. Writing Tools show before/after but no reasoning. Summaries are presented without provenance links. Image Playground shows 4 thumbnails but not the prompt used. Visual Intelligence offers "ask ChatGPT to explain" but does not expose ChatGPT's reasoning. The Explainability gap is real.

**Trust building (19):** Apple's defining trust move: **on-device processing by default**, **Private Cloud Compute** for larger models where "data is never stored or shared with Apple; it is used only to fulfill their request," **independent experts can inspect the code that runs on Apple silicon servers**. ChatGPT integration: "users choose whether to enable… users' IP addresses are obscured to prevent their sessions from being linked together" and "OpenAI will not store requests, and will not use the data for model training" when used without an account. Privacy is THE product story.

**Developer experience (20):** Foundation Models framework (native Swift, multimodal prompts, `Language Model` protocol so any provider can conform). App Intents framework (schemas — no specific phrases to define, no code changes needed as Siri evolves). View Annotations API for on-screen awareness. Evaluations framework for testing. Apple Intelligence Pathway — "easy-to-navigate collection of resources to get started." This is best-in-class DX for system-level AI integration.

**Power user experience (21):** Limited. Power users hit a ceiling: cannot define custom workflows (Shortcuts helps but is gated by App Intents adoption), cannot see reasoning, cannot chain multiple Writing Tools calls in one keystroke. Apple targets the median user; power users supplement with ChatGPT/Shortcuts.

### ONE defining interaction
**Hold Camera Control once → Visual Intelligence runs on whatever the camera sees** (summarize text, translate, detect contact info, search Google for the product, ask ChatGPT to explain a diagram). One physical button → instant multi-modal AI on the world. This is the cleanest expression of "AI as ambient OS-level capability."

### Ideas → ADOPT / ADAPT / REJECT (with reason)
- **ADOPT** — *Capability attaches to existing surface, not a new app.* MiMo's conversation-spine must let Writing/Code/Research/Plan MODES each inherit the right AI verbs natively, not force the user into one universal chat. (Solves: cognitive overload from "where do I do X?")
- **ADOPT** — *On-device-first by default, with explicit cloud escalation.* MiMo is single-user local-first; this matches Apple's pattern. Cloud calls must be user-initiated and visible. (Solves: trust + latency)
- **ADOPT** — *App Intents / schema-based action discovery.* MiMo should expose its capabilities via typed schemas (entity + intent) so the conversation spine can route natural-language requests without hard-coded commands. (Solves: command discovery)
- **ADAPT** — *Describe Your Change.* MiMo should let users describe a transformation in natural language for ANY artifact (text, code, image), not just writing. (Solves: rigid mode menus)
- **ADAPT** — *Apple's deliberate style limitation (2 image styles at launch).* MiMo should ship FEWER MODE canvas options initially, with more revealed as the user demonstrates mastery. (Solves: choice paralysis)
- **ADAPT** — *Independent code inspection for cloud compute.* MiMo's cloud escalation should be auditable — the user (power user, single tenant) should be able to see what data leaves the device. (Solves: trust without corporate intermediation)
- **REJECT** — *Invisible AI with no reasoning surface.* Apple's explainability gap is a power-user deal-breaker. MiMo must ALWAYS show why (cite source, show steps). (Reason: power user needs trust through transparency, not corporate assurance)
- **REJECT** — *No long-session surface.* Apple has nothing for 30-minute deep work. MiMo is fundamentally about long sessions — this is exactly what Apple does NOT solve.

---

## 2. Microsoft Copilot (M365) — verified via
- https://www.microsoft.com/en-us/microsoft-365/blog/2026/05/28/introducing-a-new-design-for-microsoft-365-copilot (May 28, 2026 — design blog by Jon Friedman, Chief Design Officer)
- https://learn.microsoft.com/en-us/microsoft-365/copilot/release-notes (release notes — confirms MCP agent access in Word/Excel/PPT/Outlook, fetched 2025–26)
- https://www.microsoft.com/en-us/microsoft-365-copilot (consumer landing)
- https://redriver.com/collaboration/microsoft-copilot-use-cases (use-cases, 2026)

### Product / UX Philosophy / Mental Model
**Product philosophy (1):** "In the AI era, the most important user experience for human-centered design to shape isn't the interface—it's the output." (Jon Friedman, M365 Blog May 28 2026). Microsoft's stated goal: "use [AI] in ways that help you move more directly from intention to outcome." They explicitly reject "simply layer[ing] AI onto familiar tools." The product verb is *move* — move from rough idea → real progress, from intention → outcome. Three product shifts named: "individual features → connected experiences," "adding capabilities → shaping outcomes," "asking people to adapt to technology → shaping technology around how people actually work."

**UX philosophy (2):** Progressive disclosure as first principle: "we applied the long-standing design principle of progressive disclosure: starting with a clean, focused interface, then revealing more capabilities as you need them." Craft is foregrounded: "craft isn't a decorative finishing touch; it's how intelligence communicates care." Two intertwined quality bars: **(a)** speed (UI that keeps pace with the user) **(b)** coherence (output that arrives quickly but lacks coherence shifts the burden from waiting to reworking). They refuse to trade either.

**Mental model (3):** Copilot as **a connected, adaptive system** — explicitly NOT a chatbot. "Shaped by your feedback, the new designs shift Copilot toward a more connected, adaptive system by turning a once static text box—the prompt line—into a task-aware workspace." The prompt line is the workplace; the canvas (Word/Excel/PPT) is the workpiece; Work IQ is the orchestrator that decides depth.

### IA / Interaction / Cognitive Load / Progressive Disclosure
**Information architecture (4):** (a) **Left navigation pane** that expands/contracts — "reveals a clearer space for agents, conversations, and history." (b) **Shared pinning system** + "more room for session recall" — return-to-work-in-progress is a first-class IA primitive. (c) **Prompt surface** can "expand to fill the experience, making room for deeper work: pasting content, retaining structure, and using inline formatting before sending." (d) **Single entry point across M365 apps** — "rather than scattering touchpoints across the interface, it anchors Copilot as one connected system across Microsoft 365." (e) **Side pane** that "works directly with your document: not just as chat, but as an editing partner that can suggest changes or make them, with clear signals so you always know what it's doing." (f) **Canvas invocation** — Copilot can be "invoked on the canvas itself, within a paragraph, cell, or slide, so the interaction begins where the work already lives."

**Interaction design (5):** The loop is: prompt on canvas → side pane suggests → user accepts/rejects → Copilot edits in place. Capability-focused agents (Designer, Researcher, Word, Excel, PowerPoint Copilots) "evolve Copilot in Word, Excel, and PowerPoint from a tool that responds to prompts within a single document, into an experience that can take action, draw on broader work context, and more independently operate inside the apps." Movement between canvas and chat is the central gesture: "that movement between canvas and chat reflects how real work unfolds: not in separate modes, but in a continuous loop where ideas take shape as you build."

**Cognitive load (6):** Reduced by organizing "what matters first and reveals more capability in context." Work IQ adapts: "quick responses when they fit the task, and deeper reasoning—including the ability to choose between AI models—when that can surface more relevant results." The user does not pick the model upfront; the system chooses depth.

**Progressive disclosure (7):** Three explicit layers. **Interface layer:** clean focused UI → reveal capabilities as needed. **Output layer:** "Copilot begins with a clear, readable response, then adds structure and next-step support as you refine what you need: formatting when it improves clarity, suggested prompts when they deepen the work, follow-up actions when they move it forward." **Depth layer:** Work IQ decides model depth based on signals. This three-layer PD is the most explicit formulation we found in any product.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX
**Human-AI collaboration (8):** "Editing partner" model — Copilot "can suggest changes or make them, with clear signals so you always know what it's doing." This is the clearest articulation of an *agentic collaborator* in any mainstream productivity tool: it can take action, not just answer.

**Agent UX (9):** "Clear signals so you always know what it's doing" — implicit agent-activity indicators, though not a graph viz. Capability-focused agents (Designer, Researcher) are explicitly named as agent personas. MCP-based agents now accessible in Word/Excel/PPT/Outlook directly (release notes, Jul 2026). Agent activity is shown via state changes on the canvas (highlights, edits-in-progress) rather than a separate trace UI.

**Workspace UX (10):** Side pane + canvas. The pinning system + session recall is the workspace memory. The left nav houses agents, conversations, history. This is the closest mainstream product to MiMo's "conversation-spine + canvas" model.

**Long session experience (11):** Strong. Shared pinning + session recall explicitly designed for returning to "work in progress." Multiple Copilot surfaces (Word + side pane + canvas edits) sustain multi-hour work. Work IQ's depth-adaptation prevents token-burnout fatigue.

**Keyboard-driven UX (12):** Prompt line supports inline formatting, paste with structure retention. No published universal keyboard map. Command palette patterns are partially there via prompt suggestions but not first-class.

**Visual hierarchy (13):** Left nav (collapsed by default) → prompt surface (center, expanding) → side pane (right, contextual) → canvas (the work). Headings, structured output ("more structured outputs that are easier to scan"), suggested prompts as visual chips.

**Motion design (14):** "Speed, structure, and output quality must be holistically designed." Performance IS motion design — load >2× faster, response times +10%. The blog emphasizes reliability of pacing over decorative animation.

**Design systems (15):** Fluent 2 (per existing MiMo research R-E). Copilot extends it with agent-specific tokens (Work IQ "intelligence layer you can see when active and directly control" — implies a visual mode indicator for active reasoning).

**Accessibility (16):** Inherits M365 accessibility (immersive reader, high contrast, alt-text auto-generation, dictation). Copilot itself generates alt text and structure that improves downstream a11y.

**Performance perception (17):** Explicit metrics published: **load time reduced >50%** (treatment ~11.06M users vs control ~11.16M, Mar 2026); **chat first-token response +10%** at 95th percentile. Usage lifts post-redesign: **Word +27%, Excel +33%, PowerPoint +43%, Outlook +30%** (May 2026 vs May 2026 baseline — i.e., very recent). Microsoft is publishing perf-as-UX proof — unusual and instructive.

**Explainability (18):** "Clear signals so you always know what it's doing" on canvas. Work IQ is visible when active. But no reasoning trace, no source citations on most outputs. Citations are stronger in Researcher agent. Explainability is *operational* (what's happening now), not *reasoning* (why this output).

**Trust building (19):** Trust built through: (a) actions visible on canvas (you see the edit), (b) suggested vs. applied (you accept), (c) Work IQ visible when active (you see depth), (d) choose between AI models (you control reasoning depth). Less about privacy policy, more about *observable action*.

**Developer experience (20):** MCP support in M365 apps (release notes) means any MCP-compatible tool surfaces inside Word/Excel/PPT/Outlook. Copilot Extensions toolkit with "Copilot skillsets, a faster, lightweight implementation option" and "context passing." OIDC replacing X-Github-Token — better auth. Cross-IDE support (VS Code, Visual Studio, JetBrains, GitHub.com, Mobile).

**Power user experience (21):** Power users can: choose models, switch between agents, pin sessions, expand prompt surface, invoke Copilot on specific canvas regions. The 30%+ usage lifts suggest power users are adopting heavily. Still no keyboard-first mode; no macro/automation layer; no agent-graph debugging.

### ONE defining interaction
**Invoke Copilot on a specific paragraph/cell/slide → side pane opens anchored to that region → Copilot suggests an edit → user accepts → edit applies in place → Copilot stays available for the next region.** The movement between canvas and chat in a continuous loop, anchored to *where the user is working*.

### Ideas → ADOPT / ADAPT / REJECT (with reason)
- **ADOPT** — *Prompt-line-as-task-aware-workspace.* MiMo's conversation spine must expand to accept pasted structure, inline formatting, multi-block input — not a single-line chat box. (Solves: rigid chat UX)
- **ADOPT** — *Canvas invocation anchored to selection.* ⌘⇧Tab quick-AI-on-selection (already in MiMo spec) is validated verbatim by Microsoft's "invoked on the canvas itself, within a paragraph, cell, or slide." (Solves: context transfer friction)
- **ADOPT** — *Pinning + session recall as first-class IA.* MiMo must treat "return-to-work-in-progress" as a primary navigation primitive, not a hidden history list. (Solves: long-session continuity)
- **ADAPT** — *Three-layer progressive disclosure (interface / output / depth).* MiMo should adopt the same three layers but make depth-layer explicit and user-controllable (power user wants to FORCE deep reasoning on demand). (Solves: model-depth opacity)
- **ADAPT** — *Work IQ visible-when-active indicator.* MiMo should show a single "thinking deeper" status when escalated, but always allow force-deep / force-fast via keyboard. (Solves: invisible reasoning)
- **ADAPT** — *Publish perf metrics as UX proof.* MiMo (single-user) should show the user their own latency / token spend / reliability dashboard — Microsoft's published-metrics pattern, but per-user. (Solves: trust through observable performance)
- **REJECT** — *Capability-focused agents as separate personas (Designer/Researcher/Word/Excel).* For a SINGLE power user, fragmenting into named agents is overhead. MiMo should have ONE conversation spine that *becomes* the right MODE for the right canvas, not multiple Copilot personas. (Reason: power users do not want persona-switching friction)
- **REJECT** — *No reasoning trace.* Same as Apple — Microsoft's "clear signals" are operational, not reasoning. MiMo must show why. (Reason: power-user trust requires explainability)

---

## 3. LangGraph Studio — verified via
- https://www.langchain.com/blog/langgraph-studio-the-first-agent-ide (Aug 1, 2024 — official launch blog)
- https://docs.langchain.com/langsmith/studio (current docs)
- https://mem0.ai/blog/visual-ai-agent-debugging-langgraph-studio (Jul 31, 2026 — visual debugging guide)
- https://python.plainenglish.io/mastering-langgraph-studio-how-to-visualize-debug-and-accelerate-your-ai-agent-workflows-e3c2424ec3b9 (Oct 6, 2025)
- https://fast.io/resources/top-tools-langgraph (2026 ranking)

### Product / UX Philosophy / Mental Model
**Product philosophy (1):** "Building LLM applications differs from traditional software development, requiring different tooling outside of the traditional code editor" (LangChain blog Aug 1 2024). LangGraph Studio is "the first IDE designed specifically for agent development." The product verb is *iterate* — visualize, interact, debug, iterate. Philosophy: **agents are graphs; graphs need a canvas, not a console.**

**UX philosophy (2):** Augment, don't replace, the code editor. "We don't aim to replace code editors but, instead, to augment the development experience with tools tailored for LangGraph applications." Three pillars: **visualize** (see the graph), **interact** (modify state mid-run), **debug** (interrupt + step-through + replay). Core belief: agent development needs *time-travel* and *state manipulation* as first-class IDE primitives — neither exists in VS Code.

**Mental model (3):** Agent = directed graph (nodes = cognitive steps, edges = control flow, state = shared memory). The developer's mental model is "I am wiring a state machine," not "I am writing a chatbot." Studio surfaces the state machine. Two modes (docs): **Graph mode** (full feature-set, nodes traversed, intermediate states, LangSmith integrations) and **Chat mode** (simpler UI for testing chat-specific agents — only for graphs whose state extends `MessagesState`).

### IA / Interaction / Cognitive Load / Progressive Disclosure
**Information architecture (4):** Five top-level surfaces in Studio: (1) **graph visualization canvas** (center), (2) **interaction panel** (chat box, left or bottom), (3) **real-time step stream** (right — shows "the agent decide which tools to call, call those tools, and then continue looping"), (4) **state inspector** (per-node state at any point), (5) **prompt/assistant/thread management** (top-level tabs). LangSmith integrations appear as side rails: datasets, playground, evals, prompt engineering, long-term memory, 1-click deploy.

**Interaction design (5):** Three core dev interactions: **(a) interrupt** — "you can interrupt the agent at any time if it veers off course," **(b) debug mode** — "pauses after each step of the graph so you can walk-through step by step," **(c) state edit + replay** — "if you don't like what the agent responded with at a specific step, you can directly modify the response and then continue with that new response." Plus **hot code reload** — "LangGraph Studio detects changes to the underlying code files, allowing you to update prompts in your code editor and rerun nodes." This last is exceptional DX.

**Cognitive load (6):** HIGH by design — this is a developer tool. Graph mode shows everything (nodes, edges, state, traces, datasets). Chat mode reduces load for business users testing agent behavior. The two modes ARE the cognitive-load dial.

**Progressive disclosure (7):** Graph mode (full) ↔ Chat mode (simple). Within Graph mode: node detail expands on click; intermediate states collapse by default; trace timeline scrubs on demand. The "time-travel debugging" (docs: "Debug agent state via time travel") is the deepest layer.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX
**Human-AI collaboration (8):** Asymmetric. The human (developer) modifies the agent mid-trajectory — directly editing state and continuing execution. This is *co-piloting the agent's cognition*, the deepest human-AI collaboration surface in any product studied.

**Agent UX (9):** THE reference for agent visualization. Three layers of agent visibility: **(a) topology** — graph of nodes/edges, **(b) live execution** — animated traversal as the agent runs, tool calls visible in real-time, **(c) state at any node** — full state inspection + edit. "See what your agent is really doing" is the LangSmith tagline. Time-travel = scrub through past runs. This is exactly the agent-trace visualization MiMo needs.

**Workspace UX (10):** Desktop app (Apple Silicon first, then more platforms). Opens a directory containing a Python file with a graph + `langgraph.json` config. Studio auto-builds the env. Tight integration with VS Code (the code editor stays open alongside).

**Long session experience (11):** Designed for long iteration loops. Hot code reload + replay-from-node means you don't restart from scratch when changing a prompt. State-edit-and-continue means a 20-minute agent run can be salvaged if it goes wrong at minute 15.

**Keyboard-driven UX (12):** Not the focus. Mouse-driven graph interaction; keyboard for chat input. Not a power-keyboard product.

**Visual hierarchy (13):** Graph canvas dominates. Nodes are boxes with labels; edges are arrows; active node highlights; tool-call nodes show "calling X." Real-time stream is right-side scroll. State inspector is modal/expandable.

**Motion design (14):** **Animated graph traversal** — nodes light up as the agent enters them; edges pulse during transitions. This is the most important motion pattern in the entire research: *the agent's "thinking" is shown as motion through the graph.* (mem0 blog: "walks you through debugging AI agents step by step visually.")

**Design systems (15):** LangSmith design system — clean dev-tool aesthetic, monospace for state/code, sans-serif for UI, status colors (green=success, amber=running, red=error). Not formally documented as a public DS.

**Accessibility (16):** Standard web a11y. Graph canvas is NOT screen-reader-friendly by default (visual-first tool). State inspector + chat are accessible.

**Performance perception (17):** Streaming-first — "you'll get a stream of real-time information about what steps are happening." The agent's work is visible as it happens, so there is no perceived "wait" — only "watch."

**Explainability (18):** **Best-in-class.** Every node has inputs/outputs inspectable. Every tool call is logged. Every state transition is visible. Time-travel allows forensic analysis of any past run. This is the gold standard MiMo should adopt for agent traces.

**Trust building (19):** Trust through *total visibility* — the developer sees everything; nothing happens in a black box. Plus evaluations framework (run experiments over datasets, measure reliability). Trust = observability + evals.

**Developer experience (20):** Exceptional. `langgraph.json` config file. Auto env-build. Hot code reload. Replay-from-any-node. 1-click deploy to LangSmith Cloud. MCP integration (docs). Studio is THE developer tool to beat in the agent-debugging space.

**Power user experience (21):** Power user IS the user. Every feature is power-user. Time-travel debugging, state mutation mid-run, dataset-driven evals, model switching, prompt versioning.

### ONE defining interaction
**Click any node in the graph → see its full input/output state → edit the output → click "continue from here" → the agent resumes execution with your edited state.** This is *interventionist debugging of an LLM agent* — the developer reaches into the agent's mind mid-thought and rewrites it.

### Ideas → ADOPT / ADAPT / REJECT (with reason)
- **ADOPT** — *Animated graph traversal as agent-trace visualization.* MiMo must visualize agent work as motion through a graph — nodes light up, edges pulse, tool-calls visible. (Solves: invisible agent work — the silent killer in every product)
- **ADOPT** — *Time-travel debugging.* MiMo must let the user scrub back through any past agent run, inspect state at each node, and branch from any point. (Solves: "why did the agent do that?" + replay/branching)
- **ADOPT** — *State-edit-and-continue.* MiMo must let the user edit an agent's intermediate output and resume from that point. (Solves: wasted long runs when agent goes wrong at minute 15)
- **ADOPT** — *Two-mode toggle: Graph mode (full) vs Chat mode (simple).* MiMo should expose both views of the same conversation — power view (graph + trace) and simple view (chat). (Solves: cognitive-load dial for single power user who sometimes wants simple)
- **ADOPT** — *Hot code reload + replay-from-node.* MiMo agent definitions (instructions, tools, model choice) should be editable mid-session and replayable from any node. (Solves: iteration friction)
- **ADAPT** — *Evals-over-datasets.* MiMo should let the user build a small eval set for their recurring tasks and re-run agents against it. (Solves: "is this new prompt actually better?")
- **ADAPT** — *LangSmith trace UI aesthetic.* MiMo's agent trace should look like LangSmith — monospace state, color-coded nodes, scrubable timeline. (Solves: visual convention = lower learning curve)
- **REJECT** — *Mouse-first graph canvas as the primary surface.* MiMo is conversation-spine-first; the graph view should be ON-DEMAND (toggle), not the default. (Reason: MiMo's spine is conversation; graph is a peek under the hood, not the home)
- **REJECT** — *Studio as a separate desktop app.* MiMo integrates dev/debug into the same OS — no context switch to a separate "agent IDE." (Reason: single-user OS unifies creation + use)

---

## 4. Dust.tt — verified via
- https://dust.tt/blog/2025-dust-product-update-recap (Dec 29, 2025 — annual recap; fetched via Wayback)
- https://dust.tt/blog/how-to-build-an-ai-agent (Feb 18, 2026 — builder guide; partially via Wayback)
- https://dust.tt (homepage — "Multiplayer AI for human-agent collaboration")
- https://www.saastr.com/saastr-ai-app-of-the-week-dust (SaaStr profile — 70% weekly adoption)

### Product / UX Philosophy / Mental Model
**Product philosophy (1):** "Building THE operating system for the AI era, where you can deploy, orchestrate, and govern fleets of specialized AI agents that work alongside your team, safely connected to your company's knowledge and tools" (Dust 2025 Recap). Dust positions itself explicitly as an OS — same category as MiMo, but for teams not individuals. The product verb is *collaborate* — agents are "colleagues you trust to help you get work done." Agents "work alongside you, not just for you, as true collaborators. They remember who you are, work while you sleep, and contribute to your systems, not simply read or search them."

**UX philosophy (2):** Multiplayer by default. Agents live in shared Spaces with humans, all having access to the same knowledge, tools, conversations, notifications. The UX is built around *observability* (Builder Observability dashboard), *autonomy* (Triggers, Scheduled agents), and *memory* (per-user-per-agent memory). The agent is not a tool you invoke — it's a teammate whose work you can audit.

**Mental model (3):** Agent = colleague. Each agent has: a name, a model, instructions, tools, memory, scheduled triggers, success metrics. The user manages a *fleet*, not a chat. The @dust global agent is the user's "operating-system-level" assistant with filesystem-like search, data warehouse querying, and access to all company-data tools — analogous to MiMo's conversation spine.

### IA / Interaction / Cognitive Load / Progressive Disclosure
**Information architecture (4):** **Spaces** (workspaces grouping agents + knowledge + tools + team members). **Agents** (each a configured LLM with instructions/tools/memory). **Conversations** (per-agent, per-user). **Triggers** (scheduled, webhook, event-based). **Builder Observability dashboard** (success rates, token usage, performance metrics per agent). **Company Data** (the semantic index). **@dust global agent** (filesystem-like search across everything). **Interactive Frames** (shareable, explorable data visualizations).

**Interaction design (5):** Four interaction surfaces: **(a) build** — agent builder UI (Step 1: Create, Step 2: Instructions, Step 3: Model, Step 4: Tools); **(b) chat** — talk to an agent in its space; **(c) trigger** — schedule via natural language ("daily report at 9am") or webhook/event; **(d) observe** — Builder Observability dashboard. Agent chaining: research agent gathers → writing agent transforms → sub-agents run in parallel.

**Cognitive load (6):** Highest of the 6 products because of fleet-management overhead. Mitigated by: per-agent observability, role specialization (Deep Dive = research agent, @dust = global), and natural-language trigger configuration.

**Progressive disclosure (7):** Layer 1: Chat with an agent. Layer 2: Build/edit an agent (instructions, model, tools). Layer 3: Schedule/trigger an agent. Layer 4: Observe agent fleet performance. Layer 5: Cross-functional workflows (agent chaining, multi-space data access). The depth curve is steep but well-graded.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX
**Human-AI collaboration (8):** "Agents work alongside you, not just for you." Agents post to Slack from your account, draft emails from your account, update CRM records, create Notion pages. They take *real actions on your behalf*, with audit trails.

**Agent UX (9):** Builder Observability is the agent UX surface: success rates, token usage, performance metrics per agent. Interactive Frames turn agent outputs into explorable dashboards. Deep Dive spawns parallel sub-agents for 10+ minutes of research, exploring multiple angles simultaneously — this is real agent-chain visualization. Voice mode for spoken interaction.

**Workspace UX (10):** Spaces are the unit of work. Multiple agents can access multiple Spaces for cross-functional workflows. User provisioning (Okta, Entra ID, Google Workspace) auto-manages team membership.

**Long session experience (11):** Strong for *autonomous* long sessions — Deep Dive runs 10+ minutes exploring angles in parallel. Scheduled agents run daily/weekly without user presence. The user returns to find work done — "agents that work while you sleep."

**Keyboard-driven UX (12):** Agent configuration has keyword search (added 2025). Chat is keyboard-first. Builder UI is form-driven (not keyboard-first). @dust supports filesystem-like search syntax.

**Visual hierarchy (13):** Builder Observability dashboard is the visual centerpiece — per-agent cards with metrics. Interactive Frames provide visual outputs (charts, dashboards). Conversations are standard chat UI.

**Motion design (14):** Voice mode (speak naturally, speech generation for podcasts). Deep Dive's parallel sub-agent execution implies an animated parallel-execution visualization (though not documented as motion).

**Design systems (15):** Custom — clean, professional SaaS aesthetic. Not a publicly documented DS.

**Accessibility (16):** Standard web a11y. Voice mode is both an input modality and an a11y feature.

**Performance perception (17):** Token usage dashboards. Scheduled agents run in background. The 10+ minute Deep Dive runs require clear "still working" feedback (implied).

**Explainability (18):** Builder Observability gives success rates + token usage + performance metrics per agent. This is *outcome* explainability, not *reasoning* explainability. Per-conversation trace not emphasized.

**Trust building (19):** Trust through: (a) per-user-per-agent memory isolation (privacy), (b) admin-controlled tool approval settings (governance), (c) Builder Observability (auditable success rates), (d) Trusted Platform / Trust Center / Vulnerability Disclosure (security posture), (e) "agents contribute to your systems, not simply read or search them" (write-actions are explicit and audited).

**Developer experience (20):** Developer Platform, Dust for Engineers, Platform Documentation, Github Repo. MCP integrations (Asana, Jira, GitHub, Google Drive, Confluence, GitLab). Excel extension. Custom tool approval. 1,000+ commits/month in 2025 — high cadence.

**Power user experience (21):** @dust global agent with filesystem-like search + data warehouse querying + all company-data tools is the power-user surface. Agent chaining, parallel sub-agents, custom triggers, custom tool approval — deep power-user affordances.

### ONE defining interaction
**Configure a trigger: "When a PR opens in GitHub, run the code-review agent; when it finishes, post the summary to the #eng Slack channel and create Linear issues for any bugs found."** The user sets up an autonomous, event-driven multi-system workflow in natural language, and the agent fleet executes it without further intervention.

### Ideas → ADOPT / ADAPT / REJECT (with reason)
- **ADOPT** — *Per-agent observability dashboard (success rate, token usage, performance metrics).* MiMo must surface per-agent metrics so the user can see which agents are pulling weight. (Solves: silent degradation of agent quality)
- **ADOPT** — *Agent Memory (per-user-per-agent, persistent across conversations).* MiMo is single-user so memory is per-agent — but the principle holds: each agent remembers past interactions and preferences. (Solves: cold-start every conversation)
- **ADOPT** — *Triggers (natural-language scheduled + webhook + event).* MiMo must support "when X happens, run agent Y" — natural language for schedule, webhook for external events. (Solves: user-initiated-only limitation)
- **ADOPT** — *Agent chaining with parallel sub-agents (Deep Dive pattern).* MiMo's research/planning agents should be able to spawn parallel sub-agents that explore angles simultaneously. (Solves: sequential slowness on complex tasks)
- **ADAPT** — *Builder Observability.* MiMo (single-user) needs a *personal* agent-observability dashboard — what did each agent do today, what's pending, what failed. (Solves: agent-fleet overwhelm for one user)
- **ADAPT** — *Interactive Frames.* MiMo's artifacts should be explorable — not just text output but interactive charts/dashboards the user can manipulate. (Solves: static-output limitation)
- **ADAPT** — *Multiplayer vision → Single-user "multi-self".* Dust's multiplayer insight (shared context, persistent memory) applies to MiMo as: the user's various agents share a common memory and context — a "team of one" with multiple specialized agents. (Solves: agent silos)
- **REJECT** — *Spaces as team-shared workspaces.* MiMo is single-user — no team sharing. Spaces become *project workspaces* for one user. (Reason: team semantics add overhead without benefit)
- **REJECT** — *Per-agent success rate as the only explainability.* MiMo needs *per-decision* trace, not just aggregate metrics. (Reason: power user needs to debug specific failures, not just see averages)
- **REJECT** — *Agent-as-colleague framing.* MiMo's agents are *extensions of the user*, not colleagues. The metaphor should be "my hands," not "my coworkers." (Reason: power user wants control, not social relationships with AI)

---

## 5. AutoGPT + BabyAGI lineage — verified via
- https://www.fastcompany.com/90880294/auto-gpt-and-babyagi-how-autonomous-agents-are-bringing-generative-ai-to-the-masses (Apr 13, 2023 — via Wayback; seminal coverage)
- https://www.tomshardware.com/news/autonomous-agents-new-big-thing (Apr 22, 2023 — "Solve World Hunger" example)
- https://medium.com/data-science/4-autonomous-ai-agents-you-need-to-know-d612a643fa92 (BabyAGI's 3-agent architecture: Task Execution + Task Creation + Task Prioritization)
- https://www.fastcompany.com/90880294/ + https://sidsaladi.substack.com/p/week-36-exploring-the-new-frontier (limitations analysis)

### Product / UX Philosophy / Mental Model
**Product philosophy (1):** "Autonomous agents can generate a systematic sequence of tasks that the LLM works on until it's satisfied a preordained 'goal'" (FastCompany). BabyAGI's origin (Yohei Nakajima, Untapped Capital): "I wake up in the morning and tackle the first thing on the list, and throughout the day I add new tasks, and then at night I review my tasks and reprioritize them, then decide what to do the next day." AutoGPT/BabyAGI's philosophy: **the LLM is the reasoning engine; the agent is a software wrapper that loops it.** Goal in → autonomous execution → out comes a result. The product verb is *run* — set a goal, press start, watch it run.

**UX philosophy (2):** Terminal-first, log-stream UX. The user types a goal, the agent produces a continuous stream of "THOUGHTS: … ACTION: … OBSERVATION: …" text. The UX is *watching the agent think aloud in a console*. No visualization, no intervention mid-run, no state inspection. Pure output stream.

**Mental model (3):** Agent = autonomous goal-seeker with a task list. Three sub-agents (BabyAGI): **Task Execution Agent** (does the current task), **Task Creation Agent** (creates new tasks based on results), **Task Prioritization Agent** (re-orders the list). The user's mental model is "I set a goal, it works until done." The reality was very different.

### IA / Interaction / Cognitive Load / Progressive Disclosure
**Information architecture (4):** Three IA primitives: **(a) goal input** (text prompt at start), **(b) live log stream** (THOUGHTS/ACTION/OBSERVATION), **(c) workspace dir** (files the agent creates). BabyAGI was famously 105 lines of code — minimal IA. AutoGPT added a (rough) web UI on top of the same primitives.

**Interaction design (5):** Set goal → press Run → watch → occasionally Ctrl-C when it goes off the rails. No mid-run intervention. No editing the task list. No steering. The ONLY interaction is start/stop.

**Cognitive load (6):** Low to enter (one goal), ENORMOUS to monitor (you had to read every THOUGHTS line to know if it was sane). The "watch the agent spiral" experience was exhausting. The Tom's Hardware "Solve World Hunger" default was both a joke and a real critique — agents would happily attempt impossible goals without自知.

**Progressive disclosure (7):** None. The entire agent state was a single scrolling log. No layers, no collapsing, no inspection.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX
**Human-AI collaboration (8):** Aspirationally "set goal, walk away, come back to result." In practice: "set goal, watch obsessively, Ctrl-C when it spirals, restart with a more constrained goal." Collaboration was adversarial — the user had to police the agent.

**Agent UX (9):** THE cautionary tale. **No graph viz. No state inspection. No mid-run intervention. No task-list editing. No eval. No memory of past runs.** This is the negative space that LangGraph Studio (§3) was built to fill. AutoGPT/BabyAGI taught the industry *what NOT to do* for agent UX.

**Workspace UX (10):** A directory of files the agent created (often dozens of unrelated files). No persistent workspace concept. No session resume.

**Long session experience (11):** Catastrophic. Long runs spiraled. Token costs exploded. No checkpoint. No salvage. You either let it run or killed it.

**Keyboard-driven UX (12):** CLI-first. Goal as arg: `python babyagi.py --goal "..."`. Fully keyboard.

**Visual hierarchy (13):** None. Monospace log.

**Motion design (14):** None. Scrolling text.

**Design systems (15):** None. Stdout.

**Accessibility (16):** CLI = accessible via screen reader, but unusable for non-technical users.

**Performance perception (17):** Each LLM call took 10–60s. The agent looped for minutes-to-hours. The "watch it think" UX was performance-as-spectacle but failed to be performance-as-productivity.

**Explainability (18):** Best part — every THOUGHTS/ACTION/OBSERVATION was visible in the log. The agent "thought aloud." This was good explainability but bad signal-to-noise.

**Trust building (19):** Trust never materialized. Users quickly learned agents were unreliable. The lesson: **autonomy without observability + intervention = distrust.** Trust requires control, not just transparency.

**Developer experience (20):** Good for hackers — open source, GitHub, 105 lines, hackable. Terrible for non-devs.

**Power user experience (21):** Power users loved the experiment, then abandoned it. The lineage's UX lessons are almost entirely negative.

### ONE defining interaction
**Type a goal → press Enter → watch a never-ending stream of THOUGHTS/ACTION/OBSERVATION scroll past → eventually Ctrl-C when it spirals.** The interaction defined a category (autonomous agents) and a UX failure mode (unobservable, uninterruptible autonomy).

### Ideas → ADOPT / ADAPT / REJECT (with reason)
- **ADOPT** — *Agent "thinks aloud" stream (THOUGHTS/ACTION/OBSERVATION).* MiMo's agent trace should show each step's reasoning + action + observation, in human-readable form. This is the AutoGPT principle, rescued. (Solves: invisible agent reasoning)
- **ADOPT** — *Three-sub-agent separation (execution / creation / prioritization).* MiMo's planning agent should explicitly separate "do this task," "what new tasks emerged," and "what's the new priority order." (Solves: monolithic agent loops)
- **ADAPT** — *The goal-in/press-run model.* MiMo should allow "set a goal, walk away, agent works in background" — BUT with all the missing pieces: checkpointing, intervention, observability. (Solves: user-initiated-only friction — adapted with guardrails)
- **REJECT** — *Unobservable, uninterruptible autonomy.* The cardinal lesson. MiMo must NEVER let an agent run for 10+ minutes without the user being able to see what it's doing and intervene. (Reason: trust failure mode — this is what killed the AutoGPT moment)
- **REJECT** — *Terminal-log UX as the only surface.* MiMo must visualize agent work (graph + state + trace), not just stream text. (Reason: cognitive overload, no signal-to-noise)
- **REJECT** — *No mid-run intervention.* The most important rejection. MiMo must allow state-edit-and-continue (per LangGraph) at every step. (Reason: long runs become unrecoverable without it)
- **REJECT** — *Goal-only with no constraints.* MiMo should encourage the user to specify success criteria, time budget, and tool scope before any autonomous run. (Reason: prevents "Solve World Hunger" failure mode)

---

## 6. GitHub Spark / Copilot Extensions / Spaces — verified via
- https://github.blog/changelog/2025-02-19-announcing-the-general-availability-of-github-copilot-extensions (Feb 19, 2025 — Extensions GA)
- https://github.com/orgs/community/discussions/160840 (May 28, 2025 — Copilot Spaces launch, 42 comments)
- https://docs.github.com/en/copilot/get-started/features (features doc)
- https://github.com/features/copilot/plans (plans, includes Cloud agent + 3rd-party agents)
- https://github.com/features/copilot (Copilot landing — Cloud agent, Claude Code + Codex access)

### Product / UX Philosophy / Mental Model
**Product philosophy (1):** "Your tools. Your workflows. All within Copilot Chat." Copilot Extensions GA (Feb 2025) — third-party tools invokable inside Copilot Chat via natural language. Copilot Spaces (GA Sep 2025 per Reddit; announced May 2025) — "organize and centralize relevant content—like code, docs, files, and (soon) issues—into 'Spaces' that ground Copilot's responses in the right context for a specific task." Note: GitHub Spark (a separate GitHub feature) was **deprecated August 2026** per the Extensions GA changelog ("Upcoming deprecation of GitHub Spark on github.com"). The live, current product is **Copilot Extensions + Spaces + Cloud Agent + 3rd-party agents (Claude Code, Codex)**.

**UX philosophy (2):** "Stay in your workflow, with context-aware assistance from your favorite tools right at your fingertips." Three pillars: **(a) Extensions** — bring tools into Copilot Chat; **(b) Spaces** — bring context into Copilot Chat; **(c) Cloud Agent** — autonomous cloud-resident coding agent with code review. The UX philosophy: **Copilot Chat is the universal entry point; everything else plugs into it.**

**Mental model (3):** Copilot = universal agent router. Extensions = capabilities. Spaces = context. Cloud Agent = autonomous worker. 3rd-party agents (Claude Code, Codex) = alternative cognitive engines. The user's mental model: "I talk to Copilot; it knows what tools and context I need."

### IA / Interaction / Cognitive Load / Progressive Disclosure
**Information architecture (4):** **(a) Copilot Chat** — universal entry, available in VS Code, Visual Studio, JetBrains, GitHub.com, GitHub Mobile. **(b) Spaces** — named workspaces with code + docs + files + (soon) issues + custom instructions; shareable with team; "context is always based on the latest state of your main branch." **(c) Extensions Marketplace** — Perplexity, Stack Overflow, Docker, Mermaid Chart, Arm, etc. **(d) Cloud Agent** — autonomous coding agent in GitHub Cloud with code review. **(e) 3rd-party agents** — Claude Code, Codex, accessible in chat.

**Interaction design (5):** Three interactions: **(a) `@extension-name`** — invoke a specific extension inline; **(b) select a Space** — switch Copilot's grounding context; **(c) invoke Cloud Agent** — delegate a coding task to run autonomously. Plus **Copilot automations triggered by comments** (Aug 2026 release) — GitHub comments trigger Copilot actions.

**Cognitive load (6):** Moderate. Spaces reduce context-switching load (one grounding context per task). Extensions add capability-switching load (which `@` to invoke). The Marketplace discovery problem is real.

**Progressive disclosure (7):** Layer 1: Chat. Layer 2: `@`-mention to invoke an extension. Layer 3: Create a Space for persistent context. Layer 4: Schedule Cloud Agent runs. Layer 5: Set up Copilot automations triggered by comments. Well-graded.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion / Design System / A11y / Performance / Explainability / Trust / DX / Power UX
**Human-AI collaboration (8):** Copilot in IDE: inline suggestions + chat. Copilot Cloud Agent: autonomous task execution with code review. 3rd-party agents (Claude Code, Codex) extend collaboration patterns. Comment-triggered automations tie GitHub's existing collaboration model (PR comments, issue comments) to AI actions.

**Agent UX (9):** Cloud Agent has its own activity surface (PR comments, code review output). Extensions appear as chat turns. Spaces are the grounding context indicator. No unified graph viz. The agent UX is GitHub-native — agents show up as PR comments, review requests, commit authors.

**Workspace UX (10):** Spaces IS the workspace UX. Each Space = a focused context (code + docs + files + instructions). Custom instructions per Space ("help me write SQL queries using our telemetry schemas"). Shareable across team. Spaces replace ad-hoc context switching with persistent, named workspaces.

**Long session experience (11):** Spaces + Cloud Agent enable long sessions — set up a Space, kick off Cloud Agent, return to PR with changes. Session continuity via Space persistence.

**Keyboard-driven UX (12):** IDE-native — keyboard-first via VS Code/Visual Studio/JetBrains keymaps. GitHub.com Copilot is mouse+keyboard mixed.

**Visual hierarchy (13):** GitHub's standard design system (Primer). Copilot Chat is a right-side panel; Spaces are switcher chips; Extensions are `@`-mentions; Cloud Agent activity appears as PR comments.

**Motion design (14):** Standard GitHub motion (Primer motion). Streaming responses in chat. Cloud Agent progress shown as PR status checks.

**Design systems (15):** Primer (GitHub's DS). Copilot inherits fully. Custom Copilot affordances: chat panel, suggestion inline ghost text, agent activity indicators.

**Accessibility (16):** Primer a11y. Copilot Chat accessible via screen reader. Inline ghost-text suggestions are a known a11y challenge (must be dismissible).

**Performance perception (17):** Copilot Chat streams responses. Cloud Agent runs in background with PR-check-style progress. Spaces context-grounding happens pre-prompt (so first-token latency is the perceived metric).

**Explainability (18):** Cloud Agent code review comments cite specific lines. Spaces show their grounding sources. Extension responses can cite their sources. But agent reasoning traces are not exposed.

**Trust building (19):** Trust via: (a) GitHub-native patterns (PR comments, reviews, checks), (b) custom tool approval settings, (c) OIDC-based auth (Extensions GA replaced X-Github-Token with native third-party tokens — "reducing API round trips, and improving security"), (d) 3rd-party agent access (you choose Claude Code or Codex), (e) Enterprise team specialization.

**Developer experience (20):** Extensions toolkit: Copilot skillsets (lightweight), context passing, OIDC, builder docs. Spaces: low-code creation. Cloud Agent: low-config autonomous execution. 3rd-party agents: provider-managed. DX is strong for both Copilot consumers and builders.

**Power user experience (21):** Power users: create Spaces per project, invoke extensions via `@`, run Cloud Agent for autonomous PRs, switch between Claude Code and Codex per task, customize reasoning level (Aug 2026 release). High power-user ceiling.

### ONE defining interaction
**`@extension-name` in Copilot Chat, within a selected Space, with Cloud Agent running a parallel task — all from one chat input.** The universal chat input routes to the right capability (extension), grounded in the right context (Space), with optional autonomous delegation (Cloud Agent).

### Ideas → ADOPT / ADAPT / REJECT (with reason)
- **ADOPT** — *Spaces as named, persistent context bundles.* MiMo should have project-level "Spaces" — a named bundle of code + docs + instructions + memory that grounds the conversation spine. (Solves: context-switching friction)
- **ADOPT** — *Custom instructions per Space.* MiMo Spaces should carry user-defined instructions that shape agent behavior in that context. (Solves: re-stating preferences every session)
- **ADOPT** — *Extensions via natural language + `@`-mention.* MiMo should let the user invoke MCP tools / custom agents via `@`-mention in the conversation spine. (Solves: tool discovery + invocation)
- **ADOPT** — *Comment-triggered automations.* MiMo should support "when artifact X changes / when note Y is added / when commit Z happens, run agent W" — natural-language event triggers tied to OS events. (Solves: user-initiated-only limitation; aligns with Dust triggers)
- **ADOPT** — *3rd-party agent choice.* MiMo should let the user pick between Claude/GPT/Gemini/local per task — same pattern as GitHub Copilot offering Claude Code + Codex. (Solves: model lock-in)
- **ADAPT** — *Cloud Agent pattern.* MiMo is local-first; "cloud agent" becomes "background agent" — runs while user does other things, with progress visible in the conversation spine. (Solves: blocking long tasks)
- **ADAPT** — *Marketplace for extensions.* MiMo (single user) doesn't need a public marketplace, but should support a personal extension registry (MCP servers + custom tools). (Solves: tool extensibility without marketplace overhead)
- **REJECT** — *GitHub-native agent activity (PR comments, status checks).* MiMo is not a code-hosting platform — agent activity should live in the conversation spine + canvas, not as pseudo-GitHub events. (Reason: cargo-culting GitHub's interaction model into a personal OS adds overhead)
- **REJECT** — *GitHub Spark (deprecated Aug 2026).* MiMo should not pursue a Spark-like separate "AI app" surface — the lesson from Spark's deprecation is that single-purpose AI surfaces lose to integrated ones. (Reason: validated by GitHub's own product decision)
- **REJECT** — *Extensions without observability.* Same as AutoGPT lesson — every extension invocation in MiMo must be traceable and interruptible. (Reason: trust requires control)

---

## Cross-Product Takeaway (15 lines)

1. **System-level AI lives IN existing surfaces, not as a new app** (Apple, Microsoft, GitHub) — MiMo's conversation spine must be the universal router, not a 7th app.
2. **Three-layer progressive disclosure** (Microsoft's interface/output/depth) is the most mature PD model found — adopt verbatim, force depth-layer user-controllable.
3. **Agent work must be VISUALIZED, not just streamed** — LangGraph's animated graph traversal is the gold standard; AutoGPT's text-log UX is the cautionary tale.
4. **State-edit-and-continue + time-travel debugging** (LangGraph) is non-negotiable for any agent that runs >2 minutes — MiMo must implement this.
5. **Trust = observability + intervention + evals** — Apple uses privacy, Microsoft uses canvas-visible actions, LangGraph uses total state visibility, Dust uses per-agent metrics, AutoGPT failed all three.
6. **Per-agent observability dashboards** (Dust) are essential when running multiple agents — adopt for MiMo's single-user fleet.
7. **Triggers (schedule + webhook + event)** are the bridge from chat to autonomous — adopt from Dust + GitHub comment-automations.
8. **Spaces as named persistent context bundles** (GitHub) solve context-switching — adopt verbatim for MiMo projects.
9. **Extensions via `@`-mention in chat** (GitHub) is the cleanest tool-invocation pattern — adopt.
10. **`@dust` global agent with filesystem-like search** is the closest precedent to MiMo's conversation spine — study its UX deeply.
11. **Hot code reload + replay-from-node** (LangGraph) is the killer DX feature for agent iteration — adopt.
12. **Capability-focused personas (MS) and agent-as-colleague (Dust) FAIL for single power user** — MiMo should have ONE spine that *becomes* the right MODE.
13. **CLI/terminal-only agent UX (AutoGPT) is rejected** — visualization + intervention are mandatory.
14. **3rd-party / alternative model choice per task** (GitHub Copilot offering Claude Code + Codex) is the new normal — adopt for MiMo.
15. **Explainability gap is universal** — Apple, Microsoft, Dust, GitHub all under-deliver on reasoning trace; LangGraph is the exception. **MiMo's competitive moat = explainability + intervention + observability for one power user.**

**File path confirmed:** `/home/z/my-project/research/research-group-H.md`
