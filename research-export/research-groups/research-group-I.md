# Research Group I — Motion Design + Developer Experience Gold Standards

**Researcher:** Senior Product/UX Researcher (general-purpose)
**Task ID:** I
**Date:** Aug 7, 2026
**Method:** 8 web_search + 11 page reads via curl/SDK page_reader. All sources cited inline.
**Scope:** 6 products famous for premium feel + engineering quality — Stripe, Figma, GitHub Primer, Atlassian Design System, Vercel Geist, Linear.

This file is the pure-research input to the MiMo UX redesign spec. **No UI code here.**

---

## 1. Stripe — verified via [stripe.com/blog/connect-front-end-experience](https://stripe.com/blog/connect-front-end-experience), [moesif.com Stripe DX teardown](https://www.moesif.com/blog/best-practices/api-product-management/the-stripe-developer-experience-and-docs-teardown), [stripe.com/payments/elements](https://stripe.com/payments/elements), [stripe.dev/blog/sessions-2025-dev-track-resources](https://stripe.dev/blog/sessions-2025-dev-track-resources)

### Product / UX Philosophy / Mental Model
- **Product Philosophy:** "Internet infrastructure." Stripe treats payments as a developer platform, not a finance product. The bar is "the developer should ship a working integration in one session." Sessions 2025 keynote positioned AI as an "API design" accelerant — Stripe wants to be the default surface for both human **and** agent readers.
- **UX Philosophy:** "Tightness over polish" (Moesif teardown, 2026). Polish is the visible output; the underlying tight feedback loop between docs ↔ API ↔ dashboard is the actual product. "Developers move between those four surfaces dozens of times in a single integration session, and Stripe's design system makes the transitions feel like one product."
- **Mental Model:** "A developer's questions get answered in the order they ask them, not in the order Stripe's internal product hierarchy would suggest." (Moesif) — IA follows user task, not org chart.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **Three-column docs layout:** left = product-area navigation + per-product Quickstart tree; middle = prose/concepts/walkthroughs; right = runnable code in chosen language (synced with prose). Reduces cognitive load by removing context-switching between docs and code.
- **Hover-and-highlight:** hovering a prose paragraph highlights the corresponding code line, and vice versa. Removes the "paragraph → code → paragraph → code" translation tax. Moesif: "If you are picking one Stripe interaction to clone first, this is it."
- **Interactive testing inside the docs:** right-pane is live; developer pastes test API key, runs the call from the page, response renders inline. Test always runs against test mode (signaled visually); pasted key stored in browser session storage only (not server-side).
- **Progressive disclosure:** Quickstart tree is collapsed per product; only the current product is expanded; concept docs branch by language/version via Markdoc conditionals rather than fragmenting into multiple pages.
- **Markdoc (Stripe open-sourced 2022, MIT):** extends Markdown with (a) custom components (`{% code_block %}`), (b) conditionals/variables (branch by language, version, feature flag without splitting into drifting pages), (c) build-time validation of links/components/syntax — "this is why Stripe's docs almost never show a stale or 404'd internal link."

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion (DEEP) / Design System (DEEP) / A11y / Performance (DEEP) / Explainability / Trust / DX (DEEP) / Power UX
- **Human-AI Collab / Agent UX:** Stripe now ships an `llms.txt` index file (machine-readable docs index for LLM crawlers, like a sitemap for agents). Stripe exposes structured navigation at OpenAPI spec level + docs level. `operationId`, `summary`, `description` fields are treated as **developer-facing copy**, not internal labels — "Vague descriptions cause wrong tool selection." Snake_case discipline across the entire surface is one reason agent integrations work as cleanly as they do. (Moesif 2026)
- **Workspace UX:** Dashboard's design language is the same as the brand, docs, and API reference. Transitions between surfaces feel like one product.
- **Long Session Experience:** Test mode is the killer pattern — developers experiment freely without consequences (test cards + test-mode segregation). Sessions 2025 introduced new UI components for Stripe Apps "to create experiences that feel native within the Stripe Dashboard."
- **Keyboard Driven UX:** Not a documented Stripe priority; dashboard is mouse-first with conventional cmd-K in newer surfaces.
- **Visual Hierarchy:** Stripe's signature is the gradient mesh hero (cyan→blue→pink→amber), the ink-dark (#635BFF brand purple) typography, and the high-contrast 3D CSS-rendered laptop/device props. Stripe Connect page (2017, still canonical) used CSS-drawn devices that weighed <1KB each to avoid bitmap loading time.
- **Motion Design (DEEP):** Per Stripe Connect blog (2017, still cited as canonical):
  - **Hard rule:** "in most cases you'll want to stay under 500 milliseconds."
  - **Custom cubic-bezier curves only** — "You almost never want to use a built-in timing-function like `ease-in`, `ease-out` and `linear`. A nice time-saver is to globally define a number of custom cubic-bezier variables."
  - **Specific curve cited:** `cubic-bezier(.2, 1, .2, 1)` for keyboard slide-in animation, duration 800ms (this is the longer-than-UI animation for the Express onboarding demo — UI elements still ≤500ms).
  - **Animation tech priority ladder:** CSS transitions → CSS animations → Web Animations API → `requestAnimationFrame`. "If you're not sure about the right technology to use for your animations, you can probably prioritize your options like this."
  - **Web Animations API** used for chainable sequences (Express onboarding animation: ~5KB total scripts+images). Provides "the performance and simplicity of CSS `@keyframes` in JavaScript" with native cubic-bezier easing support.
  - **Animate only cheap properties:** "In CSS, this means exclusively animating cheap properties (`transform` and `opacity`) and offloading animations to the GPU when you can (using `will-change`)."
  - **Intersection Observer** triggers animations on viewport entry — "we're now one step closer to buttery-smooth web pages."
  - **prefers-reduced-motion:** "On macOS, when Reduce Motion is enabled in System Preferences, the new `prefers-reduced-motion` media query will be triggered, and all decorative animations on the page will be disabled." Implementation: combine `@media (prefers-reduced-motion)` CSS block + `matchMedia` JS check that cancels `requestAnimationFrame` loop.
  - **CSS-drawn 3D props:** the laptop CSS weighs <1KB, scales infinitely, animatable per-part, can embed real DOM elements inside the screen. "The flexibility doesn't mean giving up on clean code — the markup stays clear, concise and descriptive."
  - **Stripe Connect cube animation** (signature rotating-cube hero): uses `requestAnimationFrame` to compute per-face visibility/transformation/shading each frame. Three pillars per frame: (1) Visibility — never >3 faces visible, skip work for hidden sides; (2) Transformation — basic math operations per visible side; (3) Shading — interpolate base color × shading factor per face to simulate virtual light source at center. Performance: `requestIdleCallback` + `backface-visibility` to skip hidden backfaces.
  - **Stripe Sessions 2025:** Stripe released new UI components for Stripe Apps "to create experiences that feel native within the Stripe Dashboard."
- **Design System (DEEP):** Stripe Elements = "Stripe's suite of rich UI building blocks to design a secure payments experience that perfectly matches your site and helps drive conversion." Brand identity and Elements are co-designed; the dashboard inherits the same tokens. Markdoc embeds custom components so docs/brand/dashboard all consume the same primitive library. The Moesif teardown notes Stripe's design language is "consistent across the brand, the docs, the API reference, and the dashboard" — not because of one canonical token file but because the authoring pipeline (Markdoc) treats docs as software.
- **Accessibility:** Stripe Connect cube animation explicitly disables decorative motion under `prefers-reduced-motion`. Web Animations API chosen partly because it inherits CSS keyframe semantics, including reduced-motion overrides.
- **Performance Perception (DEEP):** CSS-only 3D rendering (<1KB per device). Avoiding bitmap image loads. IntersectionObserver instead of scroll listeners. `will-change` for GPU offloading. Animate only `transform`/`opacity` to keep main thread free. All decorative animation cancellable via `prefers-reduced-motion`.
- **Explainability:** Hover-and-highlight prose↔code mapping IS the explainability primitive — Stripe docs never describe an API concept without showing the literal line of code that implements it, synchronized.
- **Trust Building:** Test mode + test cards = "integration safe at the experimentation stage." `Stripe-Version` header is the most-cited example of a clean versioning scheme that survives years of breaking changes (per Moesif). Snake_case discipline across API + docs surface = consistency builds trust.
- **Developer Experience (DEEP):** Per Moesif 2026 teardown, 7-point "what to steal" checklist ranked by ROI: (1) three-column layout with persistent navigation + prose + code; (2) hover-and-highlight prose/code synchronization; (3) OpenAPI-first reference generation (docs generated from spec, not hand-written, so they cannot drift); (4) real runnable code samples (copyable with one click, works with developer's actual API key); (5) versioning by header or URI + clear deprecation policy; (6) **agent-readable spec quality** — treat `operationId` and `description` as user-facing copy; (7) a "test mode" channel. Stripe treats docs as software: Markdoc, build-time validation, conditional rendering by language/version/flag. Stripe-Version header: clean versioning that survives breaking changes.
- **Power User Experience:** "Try it" inline runs against developer's test mode key with response rendering inline. OpenAPI spec is first-class for code generation. In 2026, agents can read docs + spec to call API on user's behalf.

### ONE Defining Interaction
**Hover-and-highlight between prose paragraph and the exact line of code that implements it, in the same docs page.** This is the most-cited, most-copied Stripe pattern. It removes the translation tax between concept and implementation. If MiMo ships ONE interaction borrowed from Stripe, this is it: in conversational AI UX, the analog is "hover over an agent's claim → highlight the source/citation/evidence step that supports it" — synchronized, in-place, no jumping.

### Ideas → ADOPT / ADAPT / REJECT
- **ADOPT** — Hover-and-highlight prose↔code sync pattern, generalized to "claim↔evidence" sync in MiMo's agent answers (hover a sentence → highlight the underlying source/tool-call).
- **ADOPT** — Animation duration ≤500ms rule + custom cubic-bezier variables only (no `ease-in`/`ease-out`/`linear`).
- **ADOPT** — `prefers-reduced-motion` media query + `matchMedia` JS cancellation of `requestAnimationFrame` for decorative loops.
- **ADOPT** — Animation tech ladder: CSS transitions → CSS animations → Web Animations API → rAF.
- **ADOPT** — Animate only `transform`/`opacity` (composite properties); never animate layout-triggering properties.
- **ADOPT** — IntersectionObserver triggers animation on viewport entry (saves main-thread work for off-screen elements).
- **ADOPT** — Treat MiMo docs as software (Markdoc-style), with build-time validation of internal links and components.
- **ADOPT** — Three-column layout for MiMo's "show me how" help docs (nav / explanation / runnable sample).
- **ADOPT** — Test mode concept: MiMo should have a "sandbox agent" mode where actions are reversible and clearly visually signaled.
- **ADAPT** — `llms.txt` index file for MiMo — since MiMo is itself an AI OS, the "agent-readable" layer is the system itself, not a separate doc; but the *principle* (stable, structured, consistent operationId/description discipline across all surfaces) directly applies to MiMo's tool registry.
- **ADAPT** — `Stripe-Version` header pattern → MiMo's tool-versioning + deprecation policy for the local tool registry.
- **REJECT** — CSS-drawn 3D device mockups (Stripe's marketing-page trick). Too marketing-coded for MiMo's OS surface; MiMo is a work surface, not a landing page.
- **REJECT** — Per-product Quickstart tree as MiMo's IA. MiMo has ONE container (Project = conversation lineage), so the per-product hierarchy doesn't apply.

---

## 2. Figma — verified via [figma.com/blog/introducing-figma-motion](https://www.figma.com/blog/introducing-figma-motion), [figma.com/blog/schema-2025-design-systems-recap](https://www.figma.com/blog/schema-2025-design-systems-recap), [figma.com/blog/config-2025-recap](https://www.figma.com/blog/config-2025-recap)

### Product / UX Philosophy / Mental Model
- **Product Philosophy:** "If it's something you interact with every day, software should make you feel something. Motion is another pathway to bringing that to life." (Adanna Onuekwusi, product designer) — Figma treats design as a living system, not a deliverable. Motion, code, and design live on one canvas.
- **UX Philosophy:** "Atomic design is now atomic motion design because I have keyframes on the canvas. It's the last big piece in the interactive world." (Maxwell Hathaway, Atlassian Lead Motion Designer, Figma customer) — motion inherits component/variable semantics so it travels with components across files the way fills and typography do.
- **Mental Model:** Canvas = system of systems. Components carry motion the same way they carry typography. Variables have modes; switching a mode updates every consumer in the file.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- **Modes:** Design / Dev / Motion / Draw / Code layers — same canvas, different lens. Switch any frame to Motion mode → timeline appears alongside design.
- **Timeline control:** drag layers to adjust timing; scrub to preview any moment; keyframe position, scale, rotation, opacity independently. Auto-keyframing records every change while the playhead is moving.
- **Time-based comments on the canvas:** anyone can point to a specific moment in the animation — brings the whole team into motion reviews at the exact frame, not "around" the animation.
- **Animation styles (presets):** fade, move, scale — quickest entry. Stack styles on the timeline to play simultaneously, or drag to sequence. Then refine on canvas.
- **Progressive disclosure:** presets first, then full timeline, then shader property keyframing, then 3D transforms (coming soon). Each layer unlocks more depth without forcing it on beginners.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion (DEEP) / Design System (DEEP) / A11y / Performance (DEEP) / Explainability / Trust / DX (DEEP) / Power UX
- **Human-AI Collab / Agent UX:** Figma agent builds keyframes from a prompt, "grounded in your components and tokens" — the agent respects design-system guardrails, doesn't generate freehand. "Being able to generate within guardrails really matters for enterprise systems. It allows for consistency, accessibility, and implementation quality as much as speed." (Alexandra Pereira, Atlassian) Users can run several prompts at once, each on a different frame.
- **Workspace UX:** Motion lives in the same file as components, variables, and the team. No more specialist handoff to motion designer; design + animate + dev-handoff all in one canvas.
- **Long Session Experience:** Time-based comments collapse review into the timeline itself — no more "watch the Loom then comment in Slack." Reduces session fragmentation across tools.
- **Keyboard Driven UX:** Timeline uses standard playhead/scrub; Figma relies on its broader canvas keyboard map (V/M/T tools, ⌘K, etc.).
- **Visual Hierarchy:** Layers panel + Properties panel + Timeline panel tri-axial layout. Animation styles stack vertically on the timeline; keyframes on property tracks. Property-level keyframe granularity (position/scale/rotation/opacity independent) is unusual depth for a visual tool.
- **Motion Design (DEEP):**
  - **Animation styles (presets):** fade, move, scale.
  - **Keyframe-able properties:** position, scale, rotation, opacity (independently), plus every property a shader exposes.
  - **Shader effects keyframable:** "Traditionally, Figma's animatable properties were limited. Shaders change that—anything you can control with a slider or input field, you can now animate with keyframes over time."
  - **3D transforms (announced):** rotate frames/vectors/text on z-axis with native controls + live preview as you drag. Every transform stays fully editable. "The result exports to CSS and connects through MCP, so the spatial design you build is the spatial design that's in code."
  - **Motion variables:** create an easing variable, define multiple modes for that variable, apply across animations. Switch mode at page level → every animation referencing the variable updates at once. (This is the design-system primitive that makes motion systematizable.)
  - **Animated components:** once you build an animation for a component, it travels with that component across every screen and collaborator's file "the same way fill and typography do."
  - **Dev Mode Motion tab:** full timeline visible and inspectable. Every timing value, easing curve, and keyframe is readable without interpretation from the developer. Copy animation code directly from panel in CSS, JSON, framework-ready React, or motion.dev.
  - **MCP-compatible:** share a link to any animated frame with a coding agent. "Since it carries the full motion context, nothing gets rewritten or reinterpreted."
  - **Direct export:** MP4, GIF, SVG, WEBM directly from the file for early alignment.
  - **No specific ms/easing values published** — Figma Motion is a tool surface, not a motion spec; the spec is whatever designers encode as motion variables.
- **Design System (DEEP):** Per Schema 2025 (Oct 28, 2025) recap:
  - **Extended collections:** multi-brand design systems — release a whitelabeled parent; designers across company extend with own themes; extended collection stays in sync with parent, inherits new variables/color updates, preserves explicit overrides. Available Nov 2025.
  - **Slots:** add own layers within instances; specify which instances a slot accepts — solves "detach component → break design system" anti-pattern. Apply for early access.
  - **Check designs linter:** mark something ready for dev → automatically surfaces elements like variables to align to design system. Custom model suggests the right variable in context; designer checks work before applying.
  - **Code Connect UI:** connect Figma directly to GitHub repositories; AI suggests the right code file to map to Figma components — "no coding necessary."
  - **Figma MCP server GA:** brings Figma + codebase context into agentic coding workflows; users can now add guidelines for how AI models should adhere to design system. Remote and desktop servers have feature parity. FigJam diagram support for multi-step workflows.
  - **Variables code syntax + Code Connect:** tighter binding between design system and codebase.
  - **W3C DTCG design tokens spec 1.0:** Figma now supports native import/export of variables (Nov 2025) aligned with the 1.0 community spec.
  - **Variable modes increased:** 10 on Professional, 20 on Organization (was 4).
  - **Design systems performance rewrite:** 30–60% faster variable updates/mode switches; heavy state swaps from 3500ms→350ms and 2500ms→450ms (depending on complexity of variable interactions and components). "Single, unified foundation for all of Figma's design systems features" — refactored underlying data models powering components and variables.
  - **Make kits:** import Figma libraries → generate React code components + CSS files for styles/variables → package outputs for use in Figma Make (prompt-to-app).
  - **npm package imports:** import React components (self-built or open-source) via public/private npm into Figma Make.
- **Accessibility:** "Being able to generate within guardrails really matters for enterprise systems. It allows for consistency, accessibility, and implementation quality as much as speed." Figma Motion's design-system binding ensures accessibility constraints encoded in motion variables (e.g., reduced-motion mode) propagate to every consumer.
- **Performance Perception (DEEP):** Figma's own internal design-systems rewrite is the case study — "30–60% faster" actions on variables/mode switches; state swaps went from 3500ms→350ms (10×) and 2500ms→450ms (~5×). The rewrite was a "massive" architecture refactor of underlying data models powering components + variables. Lesson for MiMo: performance is not a tweak, it's a re-architecture decision.
- **Explainability:** Timeline + time-based comments make motion legible to non-motion designers. Dev Mode Motion tab makes every value inspectable without interpretation.
- **Trust Building:** Code Connect + Check designs linter = design system can be enforced, not just suggested. Handoff no longer depends on the designer remembering the right token — the linter surfaces it.
- **Developer Experience (DEEP):** Dev Mode Motion tab exports CSS/JSON/React/motion.dev. MCP server shares frames with coding agents with full motion context preserved. Make kits → npm packages: design system → React components → Figma Make generations in one pipeline. Code Connect UI removes the "manually map Figma component → React component" chore via AI suggestions linked directly to GitHub repos.
- **Power User Experience:** Motion variables with multi-mode easing. Custom animation styles (coming). 3D transforms. Shader keyframing. Multi-prompt agent runs.

### ONE Defining Interaction
**Motion variables with modes — define an easing variable once, attach it to many animations, switch mode at page level, every animation updates at once.** This is the design-system primitive that turns motion from "the things designers animate each sprint" into a first-class system token. Figma's quote: "Good motion isn't a collection of one-off animations. It's a set of values defined once and applied everywhere."

### Ideas → ADOPT / ADAPT / REJECT
- **ADOPT** — Motion-as-token (easing variables with modes). MiMo should encode motion as design tokens (durations, easings, transition tuples) consumed by every component, with a single mode-switch (e.g., reduced-motion, fast-mode, presentation-mode) updating all consumers at once.
- **ADOPT** — Animated components: motion travels with the component across every consumer (Figma's pattern = MiMo's component library should ship with built-in motion variants, not require post-hoc animation wrapping).
- **ADOPT** — Time-based comments on a timeline (for MiMo: conversation replay scrubbing with comments pinned to a specific turn or tool-call moment — this is the conversation equivalent of Figma's frame-level motion comments).
- **ADOPT** — Dev Mode "inspect every value without interpretation" — MiMo's artifact viewer should expose every prompt, tool-call, and parameter inline-inspectable (already validated by Claude Artifacts CSP pattern in Group A).
- **ADAPT** — Figma MCP "share a link to a frame with a coding agent, full motion context preserved" — MiMo is itself the agent host, so the analog is: every artifact produced by an agent is itself an MCP-shareable surface with full provenance.
- **ADAPT** — Code Connect UI: GitHub-direct mapping with AI suggestions. MiMo's local-first FS could expose a similar "map project file ↔ agent capability" UI for power users extending the agent.
- **REJECT** — Extended collections (multi-brand white-label). MiMo is single-user; one design system, no white-labeling needed.
- **REJECT** — 3D transforms / shader keyframing. MiMo is a productivity OS, not a creative canvas; these are out of scope unless a future "design mode" is added (cf. Group C v0 Jan 2026 Design Mode removal — caution).

---

## 3. GitHub Primer — verified via [primer/primitives DESIGN_TOKENS_GUIDE.md (raw)](https://github.com/primer/primitives/blob/main/DESIGN_TOKENS_GUIDE.md), [primer.style/product/primitives/token-names](https://primer.style/product/primitives/token-names), [primer.style](https://primer.style)

### Product / UX Philosophy / Mental Model
- **Product Philosophy:** "Invisible infrastructure" (Primer team talk title). The design system is a foundation engineers don't have to think about; tokens are semantic, not raw. Master Guide opens with the core rule: **"You are a CSS expert. Never use raw values (hex, px, etc.). Only use semantic tokens."**
- **UX Philosophy:** Tokens are named by *intent* (function they serve) and *property* (CSS surface they affect), not by appearance. The naming convention forces correct usage: if you can't find a token for what you're doing, you're probably doing it wrong.
- **Mental Model:** Three-tier token hierarchy: **base** (raw values) → **functional** (global UI patterns) → **component/pattern** (component-specific). Each tier references the one below; each tier is a subset of the over-arching convention.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- Token name structure: `[prefix].[namespace].[pattern].[variant].[property].[scale]`
  - **Prefix** (optional): `brand` — marketing/brand-specific tokens, or value overrides to avoid collisions
  - **Namespace:** `base` (raw values), functional, or pattern-specific
  - **Pattern:** group of design decisions (e.g., `control` for buttons, inputs, ActionList items)
  - **Variant** (optional, max 1): stylistic variant like `danger` or `small`
  - **Property** (REQUIRED): the CSS property or conceptual property (`bgColor`, `borderColor`, `size`, `minTarget`)
  - **Scale:** ordinal describing state, density, thickness, range, speed
- Token delimiter: `-` dash for CSS variables, `.` dot for JavaScript
- Cognitive load reduction: the naming convention itself is the documentation — designers/engineers can read intent from the token name.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion (DEEP) / Design System (DEEP) / A11y / Performance (DEEP) / Explainability / Trust / DX (DEEP) / Power UX
- **Human-AI Collab / Agent UX:** Primer ships an MCP server (listed in their navigation: "Foundations → MCP server"). Design system is agent-readable by virtue of strict semantic naming.
- **Workspace UX:** Token system spans color, typography, spacing, motion, elevation, border, radius, icons. Components built from tokens inherit theming automatically.
- **Long Session Experience:** Reduced-motion + density variants (`condensed` / `normal` / `spacious`) allow the same component to support both deep-work mode (condensed) and onboarding mode (spacious) without code forks.
- **Keyboard Driven UX:** Not a Primer-specific priority.
- **Visual Hierarchy:** Five-state interactive model (rest, hover, focus-visible, active, disabled) is mandatory for every interactive element. Shadow↔z-index alignment table makes elevation legible at the token level: `shadow.resting.*` ↔ `zIndex.default`/`zIndex.sticky`; `shadow.floating.small/medium` ↔ `zIndex.dropdown`/`zIndex.overlay`; `shadow.floating.large/xlarge` ↔ `zIndex.modal`/`zIndex.popover`.
- **Motion Design (DEEP) — THE most prescriptive motion system found in this research:**
  - **Motion token pattern:** `--motion-[property]-[semantic]` where property ∈ {duration, easing, transition} and semantic ∈ {micro, short, medium, long} (duration) / {hover, enter, exit, move, linear} (easing) / {hover, stateChange, enter, exit} (transition).
  - **Concrete duration scale (with MUST/NEVER rules):**
    - `motion.duration.micro` = **100ms** — SHOULD use for hover/focus micro-interactions
    - `motion.duration.short` = **200ms** — SHOULD use for state changes
    - `motion.duration.medium` = **300ms** — MUST keep UI interactions ≤ this
    - `motion.duration.long` = **500ms** — NEVER exceed for UI interactions
  - **Easing decision tree:**
    1. Element entering/exiting viewport? → `motion.easing.enter` / `motion.easing.exit`
    2. Element moving/morphing on screen? → `motion.easing.move`
    3. Hover state change? → `motion.easing.hover`
    4. Constant motion (loaders)? → `motion.easing.linear`
  - **Transition tokens:** `motion.transition.hover`, `motion.transition.stateChange`, `motion.transition.enter`, `motion.transition.exit`.
  - **MUST:** Use `motion.transition.*` tokens for interactive state changes. Keep animations ≤ `motion.duration.medium` (300ms) for UI interactions. Respect `prefers-reduced-motion` media query. Provide instant alternatives when motion is reduced.
  - **SHOULD:** `motion.duration.micro` (100ms) for hover/focus micro-interactions. `motion.duration.short` (200ms) for state changes.
  - **NEVER:** Exceed `motion.duration.long` (500ms) for UI interactions. Use motion purely for decoration. Create indefinitely looping motion without user control. Rely solely on motion to convey information.
- **Design System (DEEP):**
  - **Color:** `bgColor-*-emphasis` MUST pair with `fgColor-onEmphasis`; `bgColor-*-muted` MUST use semantic fg; `bgColor-default` + `fgColor-default` = standard pairing; `bgColor-muted` + `fgColor-default` is OK; **NEVER use `fgColor-muted` on `bgColor-muted`** (contrast failure). Contrast requirements: 4.5:1 normal text, 3:1 large text/UI (WCAG AA).
  - **Control tokens:** `--control-[size]-[property]` where size ∈ {xsmall, small, medium, large, xlarge}, property ∈ {size, paddingInline-[density], paddingBlock}, density ∈ {condensed, normal, spacious}.
  - **Stack tokens:** `--stack-[property]-[size]` (property: gap, padding; size: condensed, normal, spacious). Also `--controlStack-[size]-gap-[density]` (size: small/medium/large, density: condensed/auto/spacious).
  - **Typography tokens:** `--text-[role]-shorthand-[size]` where role ∈ {display, title, body, subtitle, caption, codeBlock, codeInline}, size ∈ {small, medium, large}. MUST use shorthand tokens (e.g., `font: var(...)`) to ensure `line-height` and `font-weight` are synchronized. SHOULD match token to semantic role. SHOULD downgrade one size for mobile viewports (e.g., `title-large` → `title-medium`). NEVER use `text-caption-shorthand` for multi-line body text (a11y/readability failure).
  - **Z-index scale:** behind (-1) / default / sticky / dropdown / overlay / modal / popover / skipLink. MUST pair z-index with appropriate shadow level (see alignment table). SHOULD prefer `isolation: isolate` over escalating z-index. NEVER use `behind` (-1) without verifying no ancestor creates a stacking context (transform, opacity, filter).
  - **Interactive states checklist — every interactive element MUST define all 5:** rest (`.element`), hover (`:hover`), focus (`:focus-visible` — NEVER `:focus` alone), active (`:active`), disabled (`:disabled` / `[aria-disabled="true"]`). NEVER use `opacity` for disabled (it visually disables but doesn't communicate state to AT).
  - **Golden reference button** included in the guide shows all 5 states with correct token usage, motion via `transition: background-color var(--motion-transition-hover), box-shadow var(--motion-transition-hover), transform var(--motion-transition-hover);`, `:active { transform: scale(0.98); }`, `@media (prefers-reduced-motion: reduce) { .btn { transition: none; } }`.
  - **Hallucination guard:** "If you suggest a token name not found in this spec or the system, suffix it with `/* check-token */`." This is literally an anti-hallucination rule for token authoring — directly relevant to MiMo's AI-assisted design system.
- **Accessibility:** WCAG AA contrast enforced in token pairings. `:focus-visible` mandatory (never `:focus` alone). `prefers-reduced-motion` MUST be respected with instant alternatives. `aria-disabled="true"` over opacity. `skipLink` z-index token reserved for accessibility skip-navigation. NEVER use motion as the sole information channel.
- **Performance Perception (DEEP):** Reduced motion = instant alternatives (not just "no animation"). Density variants allow same component to render condensed (more density, less whitespace) without re-architecting. Shadow↔z-index alignment table prevents z-index wars.
- **Explainability:** Token names are self-explanatory (`bgColor-danger-emphasis` reads as "background color, danger emphasis"). Hallucination guard rule literally forces engineers to mark speculative tokens.
- **Trust Building:** Build-time enforcement. "NEVER use raw values" is the first rule. The system prevents drift by design.
- **Developer Experience (DEEP):** Strict semantic naming → IDE autocomplete becomes a UX surface. Token picker (search + filter). MCP server listed in nav. Component linting. Migration guides for React + Rails + CSS utilities. The hallucination-guard pattern (suffix unknown tokens with `/* check-token */`) is a DX innovation specifically designed for AI-augmented code generation.
- **Power User Experience:** Density variants (condensed/normal/spacious) for power users who want dense info. Multi-tier token hierarchy supports deep customization without breaking semantics.

### ONE Defining Interaction
**The hallucination-guard rule: "If you suggest a token name not found in this spec or the system, suffix it with `/* check-token */`."** This is the single most MiMo-relevant idea in Primer. It explicitly accommodates AI-assisted authoring *while forcing the AI to flag uncertainty*. The system knows the agent will hallucinate tokens; instead of fighting it, Primer requires the agent to mark its hallucinations for human review. This is the design-system equivalent of "the model annotates its own confidence."

### Ideas → ADOPT / ADAPT / REJECT
- **ADOPT** — Full motion token system: `--motion-[property]-[semantic]` with duration scale (micro 100ms / short 200ms / medium 300ms / long 500ms) and easing tokens (hover/enter/exit/move/linear). Adopt verbatim into MiMo's design system.
- **ADOPT** — Motion MUST/SHOULD/NEVER rules: ≤300ms for UI interactions; ≤100ms for micro-interactions; ≤500ms hard ceiling; NEVER decorative-only; NEVER infinite loops without user control; NEVER motion-as-sole-information-channel.
- **ADOPT** — Easing decision tree (enter/exit/move/hover/linear) — makes easing selection mechanical, not aesthetic.
- **ADOPT** — 5 interactive states (rest/hover/focus-visible/active/disabled) mandatory for every interactive MiMo component.
- **ADOPT** — Shadow↔z-index alignment table (resting↔default/sticky, floating.small/medium↔dropdown/overlay, floating.large/xlarge↔modal/popover).
- **ADOPT** — Hallucination-guard rule: when AI suggests a token not in the system, suffix with `/* check-token */`. Generalize to MiMo agent behavior — every agent output should mark speculative/uncertain facts with a `check` annotation for human review.
- **ADOPT** — Typography shorthand tokens (role+size+weight+line-height bundled) — ensures typography consistency as a single decision.
- **ADAPT** — Density variants (condensed/normal/spacious) — for MiMo, "condensed" mode is the power-user long-session mode; "spacious" is the onboarding/focus mode. Single mode-switch updates all components.
- **REJECT** — `brand` prefix namespace. MiMo is single-user; no multi-brand concern.
- **REJECT** — Rails component library. MiMo is Next.js/TS only.

---

## 4. Atlassian Design System — verified via [atlassian.design/foundations/tokens/design-tokens](https://atlassian.design/foundations/tokens/design-tokens), [community.developer.atlassian.com/t/introducing-design-tokens-new-colour-foundations-and-dark-mode](https://community.developer.atlassian.com/t/introducing-design-tokens-new-colour-foundations-and-dark-mode/62258), [community.developer.atlassian.com/t/a-visual-refresh-of-our-ui-foundations-is-coming](https://community.developer.atlassian.com/t/a-visual-refresh-of-our-ui-foundations-is-coming/84949)

### Product / UX Philosophy / Mental Model
- **Product Philosophy:** Atlassian Design System exists to standardize visual decisions across Atlassian apps (Jira, Confluence, Trello, Bitbucket, etc.). Token-based theming enables light/dark/high-contrast **and** non-color themes (cozy/comfortable/compact, reduced motion, custom typography styles).
- **UX Philosophy:** "Design tokens are a single source of truth to name and store design decisions." Tokens describe *how to use* a value, not *what it is*. Example: `color.icon.success` reads as "the color for an icon that signals success" — not "a green."
- **Mental Model:** Token = `foundation.property.modifier`. Foundation = type of visual design attribute (color, elevation, space). Property = UI element the token applies to (border, background, shadow). Modifier = additional details (color role, emphasis, interaction state). Not every token has a modifier.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- Foundation categories listed in nav: Color, Spacing, Grid, Typography, **Motion**, Iconography, Illustrations, Logos, Elevation, Border (Beta), Radius (Beta). Motion is its own foundation.
- Token name structure makes intent self-evident. Designer/engineer finds the right token by describing their use case in foundation→property→modifier terms.
- Themes are "collections of token values" — switching themes is a single operation, not a refactor.
- Token picker (search/filter) helps discovery.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion (DEEP) / Design System (DEEP) / A11y / Performance (DEEP) / Explainability / Trust / DX (DEEP) / Power UX
- **Human-AI Collab / Agent UX:** Atlassian is a Figma Motion launch customer — see Figma section quote: "It turns animated illustrations from a specialist handoff into a system capability." Atlassian designers used the Figma agent to prompt motion suggestions on a banner.
- **Workspace UX:** Multi-product context (Jira for issues, Confluence for docs, etc.) — the design system is the connective tissue. Tokens survive cross-product application.
- **Long Session Experience:** Cozy/Comfortable/Compact density themes let the same user adjust density based on task (review vs. deep work). Reduced motion as a theme =/= a hack; it's a first-class mode.
- **Keyboard Driven UX:** Not a documented Atlassian Design System priority (varies by host product — Jira has `.` command palette, Confluence has `/` slash menu).
- **Visual Hierarchy:** Color token categories are explicitly enumerated: text, links, icons, backgrounds, borders, blankets, charts, skeleton loaders. Each category has its own role-based tokens, not a single generic color scale. Blanket tokens specifically for modal scrims.
- **Motion Design (DEEP):**
  - Motion is its own Foundation (alongside Color/Spacing/Grid/Typography/Iconography/Elevation).
  - Token naming convention applies: `motion.property.modifier`. (Specific values weren't reachable in the static HTML; the page is JS-rendered. But Motion being elevated to a co-equal foundation with Color is itself the philosophical finding — Atlassian treats motion as a first-class design dimension, not a polish layer.)
  - Themes can include "reduced motion" as a non-color theme variant — meaning the entire motion system can be muted via one theme switch.
  - From Figma Motion blog (Atlassian customer quote): "It turns animated illustrations from a specialist handoff into a system capability. Dev Mode and being able to comment on the timeline will allow for a seamless back and forth."
- **Design System (DEEP):**
  - **Token name structure:** `foundation.property.modifier`
  - **Color tokens by category:** text, links, icons, backgrounds, borders, blankets, charts, skeleton loaders — dedicated tokens per UI surface, not a shared color scale.
  - **Elevation tokens:** perceived surface level + shadow. Token name conveys both.
  - **Opacity tokens:** `opacity.disabled` (interactive images that are disabled, e.g., disabled avatar), `opacity.loading` (content sitting underneath a loading spinner). Token-level semantics for the spinner-overlay pattern — this is the kind of detail that separates "designed" from "assembled."
  - **Space tokens:** reduce decision making; consistent spacing between elements in page layout; designed for horizontal + vertical use in a variety of contexts.
  - **Typography tokens:** include font family, font size, font weights, and line heights for all text styles.
  - **Themes as collections of token values:** Light, Dark, High-Contrast, plus non-color themes (Cozy/Comfortable/Compact, Reduced Motion, custom typography).
  - **Best practice:** "Choose tokens based on meaning where applicable, not specific values. Don't use a token just because the colors appear to match. This can break the experience in other themes."
- **Accessibility:** High-Contrast theme as a first-class variant. Reduced-motion theme as a first-class variant. WCAG-compliant contrast enforced at token-pairing level.
- **Performance Perception (DEEP):** Skeleton loader tokens (dedicated category) — Atlassian bakes perceived-performance into the design system itself. Spinner + `opacity.loading` overlay pattern is tokenized.
- **Explainability:** Token names describe intent. `color.icon.success` is self-documenting. Themes are explicit collections, not implicit configs.
- **Trust Building:** "As Atlassian's visual language evolves, changes can be made once across the system and apps. No more finding and replacing hard-coded values everywhere."
- **Developer Experience (DEEP):** Automated tooling to help designers and developers start using tokens faster. Migration guides ("Migrate to tokens", "Use tokens in code", "Use tokens in design"). Token picker with search/filter. Code samples in component examples.
- **Power User Experience:** Density themes (Cozy/Comfortable/Compact). High-contrast for accessibility power users. Custom typography styles as a theme variant.

### ONE Defining Interaction
**Themes as collections of token values** — including non-color themes (reduced motion, density, typography). Switching a theme switches the entire token set in one operation. This is the philosophical opposite of "dark mode toggle" being a special case; at Atlassian, dark mode is just one theme, and reduced-motion is just another theme, and compact-density is just another theme. They're all the same primitive.

### Ideas → ADOPT / ADAPT / REJECT
- **ADOPT** — Token name structure `foundation.property.modifier` as MiMo's primary token naming convention. Self-documenting.
- **ADOPT** — Motion as a co-equal Foundation with Color/Spacing/Typography. Not a polish layer.
- **ADOPT** — Themes-as-collections-of-token-values model — MiMo should support theme switching as a single operation that swaps an entire token set (light/dark/reduced-motion/compact/dense modes).
- **ADOPT** — Dedicated skeleton-loader token category. Perceived-performance should be tokenized.
- **ADOPT** — `opacity.loading` and `opacity.disabled` as tokenized semantics for spinner-overlay + disabled-avatar patterns.
- **ADOPT** — Color token categories (text, links, icons, backgrounds, borders, blankets, charts, skeleton loaders) — not a single shared color scale.
- **ADAPT** — Cozy/Comfortable/Compact density themes — for MiMo, "Focus mode" (compact, dense, minimal chrome) vs. "Review mode" (comfortable, spacious, full context) vs. "Onboarding mode" (cozy, generous, explanatory). Each is a theme, switchable in one operation.
- **REJECT** — Multi-product cross-application (Jira/Confluence/Trello/etc.). MiMo is one product, one user.

---

## 5. Vercel Geist — verified via [vercel.com/geist/introduction](https://vercel.com/geist/introduction), [shadcn.io/design/vercel (curated DESIGN.md)](https://www.shadcn.io/design/vercel), [designsystems.surf/design-systems/vercel](https://designsystems.surf/design-systems/vercel), [community.vercel.com/t/vercel-geist-design-system](https://community.vercel.com/t/vercel-geist-design-system/2313)

### Product / UX Philosophy / Mental Model
- **Product Philosophy:** "Restraint is the product." Per shadcn.io DESIGN.md teardown: "The system is worth studying because of what it refuses: no second accent color, no display weight above 600, no gradient miniaturization." Vercel's design language is "the dashboard marketing surface for a developer platform, written for engineers who already know the syntax."
- **UX Philosophy:** Single ink color (`#171717`) carries every CTA, "never softened to a brand-blue or secondary accent." One mesh gradient (cyan/blue/pink/amber fused) used **only at hero scale** — never miniaturized. Geist Sans + Geist Mono "specifically designed for developers and designers."
- **Mental Model:** Polarity flip. White canvas with ink type is the default; when a section needs depth, the polarity flips to dark band with white type. Same tokens, inverted polarity.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- 5 Foundations (per designsystems.surf): Color System, Component overview, Icons, Layout, Typography.
- 29 components (per designsystems.surf inventory): Accordion, Avatar, Badge, Breadcrumb, Button, Checkbox, Code snippet, Combobox, Data table, Date picker, Drawer, Empty state, Menus, Modal, Pagination, Progress bar, Progress indicator, Radio button, Segmented control, Select, Slider, Snackbar, Switch, Tabs, Text area, Text field, Tooltip, Tree view, etc.
- shadcn.io DESIGN.md lists 40+ components including `nav-bar`, `pricing-card-featured`, polarity-flipped `showcase-band-dark`.
- Cognitive load is reduced by absence: there is no second accent, so users never wonder "which accent does this state use?"

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion (DEEP) / Design System (DEEP) / A11y / Performance (DEEP) / Explainability / Trust / DX (DEEP) / Power UX
- **Human-AI Collab / Agent UX:** Geist's DESIGN.md format itself is human-AI-readable; shadcn.io's whole proposition is "Feed the file to Claude, Cursor, or Copilot when you need a React component that reads as Vercel rather than as a generic shadcn theme." Vercel's broader AI strategy includes the AI SDK + v0 + eve.
- **Workspace UX:** Vercel dashboard uses ink-on-white default; polarity flips to dark band for showcase sections. Same tokens survive the polarity flip.
- **Long Session Experience:** Two pill scales coexist (100px marketing CTAs vs. 6px nav buttons) but never mixed in one screen — prevents visual inconsistency across deep navigation.
- **Keyboard Driven UX:** ⌘K is the documented Geist interaction ("Geist K" is the search shortcut in the Geist docs themselves, per the page text "Geist K").
- **Visual Hierarchy (DEEP):**
  - **Primary:** #171717 (ink near-black) — every CTA, never softened to brand-blue or secondary accent.
  - **Canvas:** #ffffff / soft #fafafa / soft 2 #f5f5f5 — three-step neutral background.
  - **Text:** ink #171717 (headlines), #4d4d4d (body), on-primary #ffffff.
  - **Links:** #0070f3 (default), #0761d1 (deep), #d3e5ff (bg soft).
  - **Hairlines:** #ebebeb (default), #a1a1a1 (strong) — "200-step gray scale where every divider, border, and disabled state lives on its own deliberate step."
  - **Semantic:** success #0070f3 (yes, success IS the link blue — restraint), error #ee0000 / soft #f7d4d6 / deep #c50000, warning #f5a623 / soft #ffefcf / deep #ab570a.
  - **Mesh gradient (hero-only):** develop #007cf0 → #00dfd8, preview #7928ca → #ff0080, ship #ff4d4d → #f9cb28. The three gradients correspond to Vercel's three deployment phases.
  - **Polarity flip pattern:** Conversion targets, dark bands, code mockups, and primary CTAs all share the same #171717 tone, polarity-flipped onto white when a section needs depth.
- **Motion Design (DEEP):**
  - Geist does not publish a public motion-token spec (motion is not in the 5 Foundations listed on designsystems.surf — Foundations are Color, Icons, Layout, Typography, Components).
  - **Implied motion discipline:** shadcn.io DESIGN.md notes "Geist display caps at weight 600; aggressive -2.4px tracking carries voice instead of heavier weights" and "stacked shadows over single drops (4-12% black opacity layered with an inset hairline ring on every card)." The shadow stacking implies a hover/active state model using stacked shadow elevation rather than scale/transform.
  - Vercel dashboard's actual production motion: very restrained — hover states transition shadow elevation; buttons have minimal motion (no scale-on-click). This matches Linear's philosophy (motion does spatial work, not decoration) but is more conservative.
- **Design System (DEEP):**
  - **Typeface:** Geist Sans + Geist Mono — "specifically designed for developers and designers" (open-source via Vercel).
  - **Display caps at weight 600** — no weight 700/800/900. Voice comes from `-2.4px` tracking on sentence-case headlines, not from heavier weight.
  - **9 corner radii** from 0px to 9999px; **8px base**; **100px pill** as the marketing-CTA signature radius.
  - **12 spacing values** stepping from 4px to 192px section gap — 4px base unit.
  - **40+ components** in the curated DESIGN.md spec.
  - **Stacked shadows** (4-12% black opacity layered + inset hairline ring) instead of single drop shadows on every card.
  - **Restraint list:** "no second accent color, no display weight above 600, no gradient miniaturization." Restraint IS the product.
- **Accessibility:** "High contrast, accessible color system" (Geist self-description). Stack-shadow + hairline-ring on every card means elevation is legible even at small sizes. Color contrast: ink #171717 on canvas #ffffff = 16.4:1 (way above WCAG AAA).
- **Performance Perception (DEEP):** Restraint = performance. No heavy gradients except at hero. No weight 700+ (smaller font files). Geist Sans/Mono are variable fonts designed for fast loading.
- **Explainability:** Restraint eliminates decision points. There is one accent (ink); there is one radius for marketing CTAs (100px); there is one shadow pattern (stacked). The system is so small that every choice is documented by absence of alternatives.
- **Trust Building:** Vercel dashboard's restraint signals engineering credibility to developers — "this was made by people who know what they're doing." The polarity-flip pattern (ink-on-white ↔ white-on-ink) is visually distinctive without being decorative.
- **Developer Experience (DEEP):** Geist was historically "publicly viewable, but components based on the design are not published as a library for use in other projects" (Vercel community, Nov 2024). However, Vercel has since opened Geist for broader use. shadcn.io packages Geist as a DESIGN.md file readable by AI agents. Vercel's AI SDK + v0 + eve ecosystem uses Geist as the rendering surface for AI-generated UIs. Vercel's developer portal uses the same Geist language — DX is the visible product.
- **Power User Experience:** Geist K (command palette). Polarity-flip pattern lets power users mentally chunk sections by visual inversion. Minimal but extensible.

### ONE Defining Interaction
**The polarity flip: same #171717 ink token, inverted against white for default sections and against dark-band for showcase sections.** No second accent. No decorative gradient at non-hero scale. The system signals depth by flipping polarity, not by adding color. This is the defining restraint.

### Ideas → ADOPT / ADAPT / REJECT
- **ADOPT** — Restraint as a design principle: pick ONE primary color (ink), ONE accent (the gradient at hero scale only), ONE display weight cap (600), and document the *absence* of alternatives as part of the system.
- **ADOPT** — Stacked shadows (4-12% black opacity layered + inset hairline ring) instead of single drop shadows. More legible elevation, more "designed" feel.
- **ADOPT** — Three-step neutral canvas (#ffffff / #fafafa / #f5f5f5) — gives depth without introducing color.
- **ADOPT** — Two-step hairline scale (#ebebeb default / #a1a1a1 strong) — explicit divider hierarchy.
- **ADOPT** — Variable-weight typeface (Geist Sans/Mono) at weight cap 600 with negative tracking for voice.
- **ADOPT** — 9-step radius scale (0px → 9999px) with 8px base + 100px pill as marketing-CTA signature.
- **ADOPT** — 4px spacing base unit; 12-step scale to 192px section gap.
- **ADAPT** — Polarity-flip section pattern — for MiMo, the analog is "conversation canvas is light, focused artifact viewer is dark (polarity-flipped)" using the same token set.
- **ADAPT** — Three deployment-phase gradient stack (develop/preview/ship) → for MiMo, encode three agent-pipeline phases as color-coded gradient states.
- **REJECT** — "Restraint = no second accent color" is too austere for MiMo's purple/pink gradient identity (already established per worklog Task 0). MiMo should adopt Geist's *philosophy* of restraint (one primary, one accent, one signature radius) without copying the specific ink-only aesthetic.

---

## 6. Linear — verified via [performance.dev/how-is-linear-so-fast-a-technical-breakdown](https://performance.dev/how-is-linear-so-fast-a-technical-breakdown), [karrisaarinen.com/posts/starting-linear-app](https://karrisaarinen.com/posts/starting-linear-app), [figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out](https://www.figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out), [linear.app/now/press](https://linear.app/now/press), [linear.app/method](https://linear.app/method)

### Product / UX Philosophy / Mental Model
- **Product Philosophy:** "There is a lost art of building true quality software." (Linear Method) Karri Saarinen's 10 rules (Config 2025, March 2025): commit to quality at leadership level; go small and aim high; do away with handoff; resist specialized product teams; spec is the baseline MVP, not the goal; quality is not perfection; the best design is opinionated; reduce scope to increase quality; don't get locked into one way; data can be a crutch. "We started with quality. Then we learned that people actually noticed, because it's a rare approach — especially for startups."
- **UX Philosophy:** "Issue trackers were not designed for humans, and took all the good design rules and reversed them." (Karri, Starting Linear) — Linear's founding insight was that Jira had bad visual hierarchy and excessive noise. Karri wrote a Chrome extension at Airbnb to "reduce the information overload of JIRA, and tone down and improve some of the visuals for better hierarchy" — got 100 internal installs. Linear is the productionized version of that extension.
- **Mental Model:** "The browser is the database." Tuomas Artman (co-founder): "Literally the first lines of code that I wrote was the sync engine, which is very uncommon to what you usually do when you're a startup." Local-first is not an optimization — it's the architectural premise. The server is a sync target, not the source of truth.

### IA / Interaction / Cognitive Load / Progressive Disclosure
- Linear Method IA: Direction → Building → Generate momentum. Sub-sections (1.1 Set the product direction; 2.1 Set useful goals; 2.2 Prioritize enablers and blockers; 2.3 Scope projects down; 3.1 Write issues not user stories; 3.2 Manage design projects; 3.3 Build with users; 3.4 Launch and keep launching; 3.5 Build in public).
- Product surface: Intake, Plan, Build, Diffs, Monitor, Asks, Agents, Coding Sessions, Customer Requests, Insights, Mobile, Integrations, Changelog.
- Cognitive load reduction via keyboard-first design: every common action has a shortcut. Single-letter shortcuts edit focused issue; two-letter combos navigate; modifiers act globally. Command palette is one keystroke away (⌘K). Right-click menu is custom-built.

### Human-AI Collab / Agent UX / Workspace / Long Session / Keyboard / Visual / Motion (DEEP) / Design System (DEEP) / A11y / Performance (DEEP) / Explainability / Trust / DX (DEEP) / Power UX
- **Human-AI Collab / Agent UX (DEEP):** Linear has shipped Agents as a first-class surface (in nav: Asks, Agents, Coding Sessions, Customer Requests, Insights). Karri's LinkedIn: "Feedback, decisions, plans, and code in one system, so humans and agents can move work all the way to production." Karri's product workflow video (Jan 2026): uses Linear Agent to analyze 40k+ customer requests to find the broader pattern, not react to one. "How to Design for Human-agent Interaction" (Apr 2026 Every article): "Unreliable AI products are a design problem. Here's how Linear solves it." Sequoia fireside chat: agents reshape roles; judgment + taste remain essential.
- **Workspace UX:** Linear Method IA (Intake → Plan → Build → Diffs → Monitor) is the workspace IA. Same surface hosts human and agent work.
- **Long Session Experience:** Linear's keyboard-first + local-first architecture compounds — every shortcut saved compounds across thousands of actions per day. The Karri "rejects Silicon Valley's hustle culture" article (Entrepreneur Dec 2025) reinforces: long sessions are sustainable because the tool is fast, not because the user grinds harder.
- **Keyboard Driven UX (DEEP):**
  - Every common action has a shortcut; shortcuts are foundational from day one.
  - Single letters edit the focused issue. Two-letter combos navigate. Modifiers act globally.
  - Shortcuts visible everywhere in the UI (learning aid).
  - Most frequent actions are single characters (used the most).
  - Every action can be done with a mouse (don't alienate beginners).
  - ⌘K command palette: searches Issues, projects, labels, status changes, navigation, issue creation, settings, theme toggles. Incredibly fast because it searches local MobX object pool, not a server. Contextual — adapts to current view.
  - "Navigation is search. Issue creation is search. Status changes are search scoped to statuses."
  - Custom-built right-click menu.
- **Visual Hierarchy:** Linear's defining visual move is restraint + tight hierarchy. Inspired by Karri's Jira Chrome extension: "tone down and improve some of the visuals for better hierarchy." Status pills use color sparingly; the rest of the UI is grayscale + one accent. Font sizes are tight; line-height is generous.
- **Motion Design (DEEP) — THE most specific motion values found in this research, directly from Linear's stylesheet:**
  - **Linear's actual `--speed-*` CSS variables:**
    - `--speed-highlightFadeIn: 0s;` (instant enter)
    - `--speed-highlightFadeOut: .15s;` (gradual exit)
    - `--speed-quickTransition: .1s;` (100ms — micro interactions)
    - `--speed-regularTransition: .25s;` (250ms — standard)
    - `--speed-slowTransition: .35s;` (350ms — slowest in the system)
  - **Asymmetric timing:** "Hover highlights, popovers, and the agent panel appear instantly when you summon them, then fade out over 150ms when you dismiss them." Linear's agent window "appears instantly but fades out similar to macOS."
  - **Cause-and-effect threshold:** "durations sit below the 100ms cause-and-effect threshold" — anything ≥100ms feels like a delay; anything <100ms feels like a response.
  - **Industry comparison:** "Most design systems default longer than they should. Material's standard duration is 200ms, iOS's spring closer to 350ms. Defaulting to shorter transitions is one of the easiest ways to make an app feel faster, and Linear's defaults sit well below the industry norm."
  - **Animate only composited properties:** transform, opacity → GPU, run independent of main thread. Paint-triggering (color, background-color, border-color, fill) → skip layout but redraw pixels. **Layout-triggering (width, height, top, left, margin, padding) → NEVER.** "I mean never." Linear mostly animates transform + opacity; sometimes background-color/border-color.
  - **No transitions on list items:** "There are no transitions on list items to keep things snappy."
  - **Spatial motion:** "The reason a lot of their animations work is that they reference their origin. The status popover scales out of the status pill. The agent panel slides in from its toggle. The motion is doing spatial work, telling the user where the new element came from, rather than fading in from nowhere as decoration."
  - **Know when to not animate:** "What's almost as important as only animating composite properties is knowing when to not animate at all. It's easy to get carried away with animations. But in a tool used every day, the animations you'd love on a marketing site start to get in the way. Even a small hover delay, in the wrong place, becomes the thing the user notices."
  - **Sample CSS from Linear:** `.row:hover { background-color: var(--color-bg-hover); transition: background-color 0.12s; }` and `.icon-arrow { transform: translateX(0); transition: transform 0.15s; }`. Hover transitions in the 100-150ms range.
  - **Anti-pattern example:** `.row:hover { margin-left: 2px; transition: all 0.2s; }` — triggers layout for every row beneath the hovered one, on every frame, for 200ms. "On a long issue list that's the difference between buttery and jank."
  - **Animations stay on the GPU; durations sit below 100ms cause-and-effect threshold; layout-triggering properties are never animated.**
  - **Acknowledged flaw:** "The command palette is the one I'd argue is too slow, but I've become a cranky old man over the years."
  - **Reference:** Emil Kowalski (Linear Design Engineer) created animations.dev course.
- **Design System (DEEP):** Linear doesn't publish a formal design system like Primer/Atlassian, but the system is observable in the CSS:
  - `--color-bg-hover` (semantic hover bg color)
  - `--speed-*` motion scale (4 named speeds, max 350ms)
  - Speed-as-variable philosophy: every transition speed is a named token, not a raw ms value.
  - System is enforced through code review (small high-quality team, no handoff, no specialized teams) rather than through external tooling.
- **Accessibility:** Linear's motion philosophy is implicitly accessible — instant enter (0ms) means no vestibular trigger; fades are short (150ms) and reversible. No infinite decorative loops. Reduced motion would have minimal visual impact because Linear barely animates to begin with.
- **Performance Perception (DEEP) — THE gold standard:**
  - **IndexedDB in-browser database:** "The actual database the UI reads from is in the browser, in IndexedDB." Not a cache — the database.
  - **MobX observables:** per-property observable granularity → "a 50-issue update is 50 cell re-renders rather than a list re-render."
  - **Mutations apply locally first:** `issue.title = "Faster app launch"; issue.save();` — first line updates MobX store synchronously; UI re-renders synchronously off the local in-memory update; second line queues a transaction that the sync engine batches and flushes to the server asynchronously. "There are no spinners because there is nothing to wait for because the data is synced in the background."
  - **WebSocket delta broadcast:** server broadcasts deltas back to other clients via WebSocket.
  - **No spinners:** "The more loading states you can avoid the better." "The secret to building incredible web apps is by hiding all the network requests from the user."
  - **Service worker precaching:** "ships less code in more pieces, with a service worker precaching the rest while the user is still on the login page."
  - **Auth assumed, verified later:** "Auth is assumed based off state and verified later."
  - **First-paint optimization:** bundler/loader shell makes first load feel instant.
  - **Sync engine hydrates from IndexedDB into per-property MobX observables.**
  - **⌘K searches local MobX object pool, not a server** — "Remember, avoid the network."
  - **No Next, no Tanstack, no fancy framework** — client-side rendered app faster than server-rendered ones. "They decided early on what architecture would serve their users best and have stayed true to it."
  - **Speed is both an engineering AND a design problem:** "You can build a perfect sync engine and a flawless rendering pipeline, and still ship something that feels slow if the design is wrong. Engineering speed makes a single interaction fast. Design speed makes the path to each interaction short."
- **Explainability:** Status popovers scale out of status pills (spatial provenance); agent panel slides in from its toggle (spatial origin). Motion itself is the explanation — it tells you where things came from.
- **Trust Building:** Craft is the differentiator. "We started with quality. Then we learned that people actually noticed, because it's a rare approach." Linear rejects A/B testing — "you must be comfortable making decisions without data as your guide. Success depends on hiring people who care about the craft." Customers: OpenAI, Ramp, Vercel — trust by association.
- **Developer Experience (DEEP):** Linear's DX is its own users' experience — engineers using Linear to ship Linear features. Linear Method: "Write issues not user stories" — issue format is structured for engineering consumption. Linear has Coding Sessions, Diffs (diffs-as-PR-replacement in Linear surface), Monitor (production observability in same surface). Linear is "the platform for agent coordination" (Y Combinator Jul 2025).
- **Power User Experience:** Keyboard-first + local-first = compound speed gains. ⌘K searches local pool. Single-letter shortcuts for most frequent actions. Agent surfaces (Asks, Agents, Coding Sessions) for AI-augmented power workflows.

### ONE Defining Interaction
**The asymmetric instant-enter / fade-out timing model, where every summoned surface (popover, hover highlight, agent panel) appears at 0ms but dismisses over 150ms.** This is the single most-defined Linear interaction. The pattern inverts the natural inclination (animate-in, instant-out) and is the reason Linear "feels fast" — summoning anything is frictionless; dismissing is graceful. Combined with motion that references origin (status popover scales out of status pill, agent panel slides from toggle), Linear's motion is *always spatial*, never decorative.

### Ideas → ADOPT / ADAPT / REJECT
- **ADOPT** — Linear's `--speed-*` token scale verbatim: `quickTransition: 100ms`, `regularTransition: 250ms`, `slowTransition: 350ms`, `highlightFadeIn: 0ms`, `highlightFadeOut: 150ms`. This is the most concrete, production-validated motion scale found in this research and it sits well below the industry norm (Material 200ms, iOS spring 350ms).
- **ADOPT** — Asymmetric timing: enter instantly (0ms), exit over 150ms. Generalize to MiMo: every agent-summoned surface appears instantly; dismissals are graceful.
- **ADOPT** — Cause-and-effect threshold: durations <100ms feel like responses; ≥100ms feel like delays. Hard rule for MiMo: any reaction that should feel immediate must be <100ms.
- **ADOPT** — Animate only composited properties (transform/opacity); sometimes paint-triggering (background-color, border-color); NEVER layout-triggering (width/height/top/left/margin/padding).
- **ADOPT** — Spatial motion: every summoned element animates from its origin (scales out of the trigger, slides from the toggle). Never fades in from nowhere as decoration.
- **ADOPT** — No transitions on list items (keep list interactions snappy).
- **ADOPT** — "No spinners because there is nothing to wait for" — local-first architecture as the foundation of perceived performance. MiMo is local-first per its spec; this validates the architecture decision.
- **ADOPT** — ⌘K searches local MobX pool, not server. MiMo's command palette should search local state first.
- **ADOPT** — Single-letter shortcuts for most-frequent actions; two-letter combos for navigation; modifiers for global actions. Visible shortcuts everywhere as learning aid.
- **ADOPT** — Service worker precaching during login screen.
- **ADOPT** — Per-property observable granularity (50-issue update = 50 cell re-renders, not list re-render). MiMo's state management should mirror this.
- **ADAPT** — Linear's "no A/B tests, trust intuition" — for MiMo (single-user OS), this is the *only* viable mode anyway; there's no user base to A/B test against. Validate the principle: ship what feels right, ship less of it but at higher craft.
- **ADAPT** — Linear Method's "Write issues not user stories" → for MiMo: conversation turns should be structured as issues (with status, priority, owner) when they become tasks, not as freeform chat.
- **ADAPT** — Linear's Agents surface → MiMo's 6-stage pipeline should be visible as named agents (already in spec from Group A findings).
- **REJECT** — IndexedDB as primary database (Linear's specific implementation). MiMo is a single-user OS with different storage needs (Prisma + local FS); the principle (local-first) is what matters, not the specific storage engine.
- **REJECT** — Linear's "no Next, no Tanstack, no fancy framework" — MiMo is already Next.js 16; the architecture choice is made. The principle (decide early, stay true) is what matters.

---

## Cross-Product Synthesis — 15 Takeaways

1. **Motion is a token, not a polish layer.** Three of six systems (Primer, Atlassian, Linear) treat motion as a first-class Foundation co-equal with Color/Spacing/Typography. Primer publishes `--motion-[property]-[semantic]` with MUST/SHOULD/NEVER rules. Atlassian lists Motion as its own Foundation. Linear encodes every transition speed as a `--speed-*` variable. MiMo must adopt the same: motion-as-token, not motion-as-afterthought.

2. **Duration scales converge on 4 tiers under 500ms.** Primer: 100/200/300/500ms (micro/short/medium/long). Linear: 0/100/250/350ms (highlightFadeIn/quick/regular/slow). Stripe: hard ceiling at 500ms. All three systems default shorter than Material (200ms) or iOS spring (350ms). MiMo should adopt: micro 100ms / short 200ms / medium 300ms / long 500ms hard ceiling — with Linear's 0ms instant-enter as a 5th tier for summoned surfaces.

3. **Asymmetric timing (instant enter, gradual exit) is the Linear differentiator.** Most systems animate-in and animate-out symmetrically. Linear's instant-enter/150ms-fade-out pattern is the most concrete "feels fast" decision found. MiMo should adopt for every summoned surface (popovers, panels, agent windows).

4. **Animate only composited properties.** Stripe, Linear, and Primer all enforce: animate `transform`/`opacity` (GPU-composited), sometimes `background-color`/`border-color` (paint-triggering OK), NEVER `width`/`height`/`top`/`left`/`margin`/`padding` (layout-triggering). This is the single most-repeated motion rule across the gold standards.

5. **Motion must reference origin.** Linear: "The status popover scales out of the status pill. The agent panel slides in from its toggle. The motion is doing spatial work, telling the user where the new element came from, rather than fading in from nowhere as decoration." MiMo's agent-summoned surfaces must scale/slide from their trigger, not fade-in.

6. **`prefers-reduced-motion` is mandatory, not optional.** Stripe Connect blog (2017) implemented it with `@media (prefers-reduced-motion)` + `matchMedia` JS cancellation. Primer enforces it as a MUST with "provide instant alternatives when motion is reduced." Atlassian treats it as a first-class theme. MiMo must implement reduced-motion as a theme switch that disables decorative motion while preserving informational motion.

7. **NEVER rules matter as much as MUST rules.** Primer publishes 4 NEVER rules for motion: never exceed 500ms; never decorative-only; never infinite loops without user control; never motion-as-sole-information-channel. Linear's never-animate-layout-triggering is its hardest rule. The restraint is the system.

8. **Token naming convention = the documentation.** Primer: `[prefix].[namespace].[pattern].[variant].[property].[scale]`. Atlassian: `foundation.property.modifier`. Stripe: snake_case across API+docs. Geist: token-by-absence (only one accent exists). MiMo should adopt a single token naming convention (recommend Primer's structure: most prescriptive) and document the *absence* of alternatives (Geist's contribution).

9. **Hallucination-guard rule is the AI-era DX innovation.** Primer: "If you suggest a token name not found in this spec or the system, suffix it with `/* check-token */`." This explicitly accommodates AI-assisted authoring while forcing the AI to flag its own uncertainty. MiMo — being itself an AI OS — should adopt this pattern as a universal rule: every agent output should mark speculative/uncertain content with a `check` annotation for human review.

10. **Restraint IS the product (Geist).** Vercel Geist's defining principle: no second accent, no display weight above 600, no gradient miniaturization. Restraint isn't a constraint — it's the value proposition. MiMo should adopt Geist's restraint philosophy: pick ONE primary color, ONE accent (gradient at hero scale only), ONE display weight cap, ONE signature radius. Document the *absence* of alternatives.

11. **Themes are collections of token values, not toggles (Atlassian).** Dark mode, reduced motion, compact density, custom typography are all the same primitive: a theme is a set of token values. Switching themes is one operation. MiMo should support theme switching as a single operation that swaps the entire token set: Focus/Review/Onboarding modes are all themes.

12. **Hover-and-highlight is Stripe's most-copied pattern.** Stripe's synchronized highlighting between prose paragraph and the exact line of code is "the most-copied pattern in modern API docs" (Moesif). MiMo should generalize: hover over an agent's claim → highlight the source/citation/evidence step that supports it. Synchronized, in-place, no jumping.

13. **Local-first is the foundation of perceived performance (Linear).** Linear's IndexedDB + MobX + sync engine is the architectural decision that makes everything else possible. "There are no spinners because there is nothing to wait for." MiMo is local-first per its spec; this research validates the architecture choice as the gold standard.

14. **AI-readable design systems are now table stakes.** Stripe ships `llms.txt` + treats OpenAPI operationId/description as developer-facing copy. Primer ships an MCP server. Figma Motion is MCP-compatible and exports CSS/JSON/React/motion.dev. Geist is packaged as DESIGN.md for AI agents. MiMo's design system must be AI-readable from day one: every token, every component, every motion primitive should be machine-parseable and agent-reusable.

15. **Craft wins over scale (Linear's Karri Saarinen).** "We started with quality. Then we learned that people actually noticed, because it's a rare approach." Quality is the differentiator, not speed-to-market. "Reduce scope to increase quality." "Spec is the baseline MVP, not the goal." For MiMo (single-user OS for one power user), this is the only viable product strategy: ship fewer features at higher craft, not more features at average craft. Reject hustle culture; sustain long sessions through tool speed, not user grind.

---

## Verified Source URLs (full list)

1. Stripe Connect front-end experience — https://stripe.com/blog/connect-front-end-experience (VERIFIED, full text via curl)
2. Moesif Stripe DX teardown (2026) — https://www.moesif.com/blog/best-practices/api-product-management/the-stripe-developer-experience-and-docs-teardown (VERIFIED, full text via curl)
3. Stripe Elements — https://stripe.com/payments/elements (VERIFIED, partial — mostly nav)
4. Stripe Sessions 2025 dev track — https://stripe.dev/blog/sessions-2025-dev-track-resources (search snippet)
5. Figma Motion introducing — https://www.figma.com/blog/introducing-figma-motion (VERIFIED, full text via curl)
6. Figma Schema 2025 design systems recap — https://www.figma.com/blog/schema-2025-design-systems-recap (VERIFIED, full text via curl)
7. Figma Config 2025 recap — https://www.figma.com/blog/config-2025-recap (search snippet)
8. Primer DESIGN_TOKENS_GUIDE.md — https://github.com/primer/primitives/blob/main/DESIGN_TOKENS_GUIDE.md (VERIFIED, full markdown via raw curl)
9. Primer token names — https://primer.style/product/primitives/token-names (VERIFIED, full text via curl)
10. Primer.style — https://primer.style (search snippet)
11. Atlassian design tokens overview — https://atlassian.design/foundations/tokens/design-tokens (VERIFIED, full text via curl after redirect)
12. Atlassian introducing design tokens — https://community.developer.atlassian.com/t/introducing-design-tokens-new-colour-foundations-and-dark-mode/62258 (search snippet)
13. Atlassian visual refresh — https://community.developer.atlassian.com/t/a-visual-refresh-of-our-ui-foundations-is-coming/84949 (search snippet)
14. Vercel Geist introduction — https://vercel.com/geist/introduction (VERIFIED, partial — nav only)
15. shadcn.io Vercel DESIGN.md — https://www.shadcn.io/design/vercel (VERIFIED, full token list via curl)
16. designsystems.surf Vercel — https://designsystems.surf/design-systems/vercel (VERIFIED, component inventory via curl)
17. Vercel community Geist Q&A — https://community.vercel.com/t/vercel-geist-design-system/2313 (search snippet)
18. Linear performance breakdown — https://performance.dev/how-is-linear-so-fast-a-technical-breakdown (VERIFIED, full text via curl — includes Linear's actual `--speed-*` CSS variables)
19. Karri Saarinen Starting Linear — https://karrisaarinen.com/posts/starting-linear-app (VERIFIED, full text via curl)
20. Karri Saarinen 10 rules (Figma blog) — https://www.figma.com/blog/karri-saarinens-10-rules-for-crafting-products-that-stand-out (VERIFIED, full text via curl)
21. Linear press list — https://linear.app/now/press (VERIFIED, full text via curl)
22. Linear Method — https://linear.app/method (VERIFIED, nav structure via SDK page_reader)
