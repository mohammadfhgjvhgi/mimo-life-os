# Research Group E — Canonical Design Systems (2024–2025)

**Task ID:** R-E
**Agent:** Senior UX / Design Systems Researcher
**Subject:** Apple HIG · Material Design 3 · Microsoft Fluent 2
**Goal:** Extract grounded, numeric design principles to inform MiMo's own design language (NOT to copy).
**MiMo context recap:** single-user AI Operating System; owner = developer + operator + end user; daily multi-hour use; conversation-first; multi-platform (desktop-first, mobile-companion); 8 adaptive modes; keyboard-first; inline AI execution trace; RTL Arabic capable.

Methodology: live web search + page_reader on official docs (developer.apple.com, m3.material.io, fluent2.microsoft.design) plus verified secondary teardowns (superdesign.dev, GitHub material-design-skill reference) where official pages are JS-rendered. All numbers below are sourced; `[verified]` tags cite the URL.

---

## Apple Human Interface Guidelines

### Current guidelines (2024–2025) — verified via
- https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design  `[verified — primary, Apple Newsroom, June 9 2025]`
- https://developer.apple.com/documentation/technologyoverviews/liquid-glass  `[verified — primary]`
- https://developer.apple.com/design/human-interface-guidelines/materials  `[verified — primary, nav + topic confirmed]`
- https://developer.apple.com/design/human-interface-guidelines/typography  `[verified — primary, nav + topic confirmed]`
- https://developer.apple.com/design/human-interface-guidelines/motion  `[verified — primary, nav + topic confirmed]`
- https://developer.apple.com/design/whats-new  `[verified — primary; confirms Dec 16 2025 typography update added emphasized weights per platform]`
- https://superdesign.dev/blog/apple-design-system  `[verified — secondary teardown, cross-checked live against Apple HIG typography specs]`

### Design philosophy
Apple's HIG is built on three long-standing principles — **Clarity** (legible, precise, easy to understand), **Deference** (the UI serves content and never competes with it; chrome recedes), and **Depth** (layers and motion convey hierarchy) — with Consistency as connective tissue. Since June 2025 (WWDC25), this is materialized through **Liquid Glass**, a translucent, optically real material that reflects/refracts surrounding content, dynamically adapts between light and dark, and turns controls/nav into a distinct functional layer floating *above* content. Liquid Glass spans iOS 26, iPadOS 26, macOS Tahoe 26, watchOS 26, tvOS 26 — the broadest cross-platform design unification Apple has ever shipped. The thesis: hardware + software integration should feel intuitive, beautiful, and delightful; design to **semantic roles**, not raw hex, because colors are adaptive by trait environment.

### Spacing system (with numbers)
- **Convention: 8pt base grid with 4pt half-step subdivisions.** This is the working model every Apple teardown converges on (superdesign.dev cross-verified live against HIG output). Apple's HIG does *not* mandate or brand "the 8pt grid" the way Material does — it is a reliable convention that matches Apple's actual output, not a published rule.
- Spacing tokens are not published as fixed px; spacing emerges from safe-area insets, layout margins (20pt screen edges on iOS), and component-internal padding.
- **Hard rule: minimum tap target 44×44pt** for any interactive control (Apple HIG, since original iPhone).
- Generous whitespace is the hierarchy mechanism — deference means whitespace does the hierarchy work so chrome can recede.

### Typography scale (with sizes)
Apple uses **San Francisco (SF Pro)** as the system typeface (neutral sans), **New York** as companion serif, **SF Mono** for code. iOS Dynamic Type scale at default (Large) size — *verified against Apple HIG typography specs via superdesign.dev teardown*:

| Style | Size (pt) | Weight |
|---|---|---|
| Large Title | 34 | Regular (Bold emphasized) |
| Title 1 | 28 | Regular (Bold) |
| Title 2 | 22 | Regular (Bold) |
| Title 3 | 20 | Regular (Semibold) |
| Headline | 17 | Semibold |
| Body | 17 | Regular |
| Callout | 16 | Regular |
| Subhead | 15 | Regular |
| Footnote | 13 | Regular |
| Caption 1 | 12 | Regular |
| Caption 2 | 11 | Regular |

- **Dec 16 2025 update** (per Apple "What's New"): emphasized weights added to the Dynamic Type style specs for each platform.
- 17pt Body = legibility floor for arm's-length reading; deliberate size jumps create hierarchy without shouting.
- **Dynamic Type** lets users rescale the whole system for accessibility (AX1–AX5 reach ~200%+). The scale is therefore defined as *named styles*, never fixed pixels — this is the core insight: **type is a token-by-role, not a px-by-size**.

### Color system
- **Semantic & adaptive, never literal hex.** Apple gives named tokens: `systemRed`, `systemOrange`, `systemYellow`, `systemGreen`, `systemTeal`, `systemBlue`, `systemIndigo`, `systemPurple`, `systemPink` + `systemGray`…`systemGray6` ramp; plus content roles `label`, `secondaryLabel`, `tertiaryLabel`, `quaternaryLabel`, `systemBackground`, `secondarySystemBackground`, `tertiarySystemBackground`.
- These auto-adapt across **light, dark, increased-contrast, and vibrancy** trait environments.
- **Apple deliberately does NOT publish guaranteed hex values.** The widely-circulated `#007AFF` for systemBlue is community-measured, not Apple-official, and differs between OS versions.
- One **primary accent** (systemBlue) — do not introduce multiple competing accents.
- Liquid Glass surfaces use real-time rendering + specular highlights; color is *informed by surrounding content* and intelligently adapts between light/dark.

### Elevation / depth
- **Material-based, not shadow-based.** Pre-2025: thin hairline separators + blur (NSVisualEffectView / UIVisualEffectView) for translucency; minimal shadow use. Content layered: background → content → floating controls/nav.
- **Post-2025 (Liquid Glass):** depth via optical layering — specular highlights, refraction, lensing/warping of light to signal layering. Controls are "a distinct functional layer that sits above apps and gives way to content." Tab bars shrink on scroll and expand on scroll-up. Sidebars (iPadOS/macOS) refract content behind them while reflecting wallpaper from around them — users always keep a sense of context.
- Multiple glass layers stack: Dock, app icons, widgets, lock-screen clock are all "crafted from multiple layers of Liquid Glass." On macOS Tahoe 26 the menu bar is completely transparent.
- Inset/rounded-concentric corners: controls now fit concentric with the rounded corners of modern hardware/windows.

### Motion language (durations + easing)
- Apple does not publish a fixed ms/easing token table the way Material/Fluent do. Motion guidance is principle-based: purposeful, smooth, continuous (no jarring cuts), respects spatial relationships.
- Common patterns: tab-bar morph/shrink on scroll (~250–350ms feel), spring physics for interactive controls (drag, sheet dismiss), ease-out for entrances, ease-in for exits. Sheets modally present with spring + corner-radius morph.
- **Liquid Glass motion** is *reactive to movement* with real-time rendering and specular highlights — material dynamically transforms depending on content/context.
- Accessibility: `UIAccessibility.isReduceMotionEnabled` → collapse non-essential motion, eliminate parallax, replace with crossfades.
- **WHEN to animate:** state changes, hierarchy shifts, orientation/scope changes, direct manipulation feedback, transitions between contexts. **Never** animate static content or purely decorative motion.

### Iconography
- **SF Symbols** — library of 6,000+ configurable icons that align **optically** with SF Pro across every weight and size, and inherit the same Dynamic Type scaling and color adaptation.
- Icon + type are **one system** — an Apple UI never has mismatched icon weights because the symbol weight matches the font weight.
- Styles: Outline (default for wayfinding), Filled (for selected/emphasis states in iOS 17+).
- Multilayer (multicolor) symbols for richer metaphors; animate symbol effects (bounce, pulse, variable-color).
- App icons: 1024×1024 master, with `IconComposer` producing Liquid Glass icons across platforms (multi-layered, adaptive to light/dark/clear/tinted looks).
- Tap-target-sized hit areas even when the glyph is small.

### Component patterns
- **Buttons:** plain / gray / tinted / filled (iOS 17+ taxonomy), with Liquid Glass treatment in iOS 26 — controls craft out of glass and act as a distinct functional layer.
- **Tab bars:** bottom on iPhone, top on iPad, shrink-on-scroll + expand-on-scroll-up; Liquid Glass treatment; concentric rounded corners.
- **Sidebars:** iPadOS/macOS — refract background content, reflect wallpaper; resizable + collapsible; list-based with sections.
- **Lists:** grouped (inset) / inset grouped / plain; row height ~44pt min, leading icon + title + subtitle + trailing accessory pattern.
- **Modals:** sheets (bottom on iPhone, center on iPad), full-screen covers; spring-presented, swipe-to-dismiss.
- **Toasts:** Apple uses *no native toast* — uses banners/notices within Mail/Messages patterns, or inline. (Important negative lesson — Apple deliberately avoids transient popups.)
- **Cards:** uncommon in Apple-native UI; instead uses grouped inset lists and material surfaces. Cards are more of a Material/Fluent pattern.
- **Navigation:** tab bar (root) + navigation stack (push/pop) + split view (sidebar→detail) on iPad/Mac; content always has a clear back-path.

### Adaptive layouts
- **Per-platform sizing, not breakpoints.** Apple does not use CSS breakpoints — it uses size classes: *Compact* vs *Regular* (horizontal × vertical) and trait collections. UI morphs by size class, not by px width.
- Multi-column on Regular width (iPad split-view, macOS); single-column stack on Compact (iPhone portrait).
- `safeAreaInsets` drive layout; content respects home indicator, notch/dynamic-island, status bar.
- macOS: window with sidebar + toolbar + content; supports multiple windows, tabs.
- visionOS: depth + volume — windows float in 3D space, glass materials essential.
- **Liquid Glass unifies across all 5 platforms** while each keeps distinct qualities (e.g. watchOS stays glance-driven, macOS keeps menu bar + dock).

### Accessibility
- **44×44pt minimum tap target** (hard rule).
- Dynamic Type rescales whole type system (AX1–AX5 reach ~224% at Large Title).
- Semantic colors auto-adapt to **Increase Contrast** accessibility setting.
- **VoiceOver** first-class (every element needs accessibilityLabel/hint/trait).
- Reduce Motion, Reduce Transparency, Differentiate Without Color, Smart Invert — all toggleable trait environments the UI must respect.
- Switch Control, Full Keyboard Access, Voice Control, Sound Detection — interaction diversity.
- Focus rings: system-drawn, appear on keyboard navigation, configurable.

### What MiMo should learn
1. **Design to semantic roles, not raw hex** — `label`, `surface`, `accent`, `danger` tokens that auto-flip for light/dark/contrast. This is the single most portable lesson and exactly what MiMo needs for its theme system.
2. **One system typeface + weight-for-hierarchy** — MiMo should pick one primary UI font and let weight + size carry hierarchy (not multiple families). Body at a legibility floor (~16–17px), with a deliberate named-style ramp.
3. **Type as named roles, not px** — define `body`, `headline`, `title1..3`, `caption` as tokens that can rescale (Dynamic-Type-equivalent) so accessibility scaling "comes for free."
4. **44pt/44px minimum tap target** — adopt as hard rule even on desktop (helps trackpad/low-vision users).
5. **Material-based depth over shadow-heavy depth** — MiMo's "conversation-first" surface should use translucency + hairlines + blur, not Material-style multi-elevation shadow stacks. Calm, not dramatic.
6. **Controls as a distinct functional layer above content** — exactly MiMo's model: chat content leads, the composer/rail/dock are a *layer*, not the foreground.
7. **Icon + type as one system** — MiMo should use an icon family whose weights match its font weights, and inherit theme color.
8. **Avoid native toasts** — use inline status in the conversation flow (matches MiMo's ExecutionTrace + inline status).
9. **Size-class adaptation over breakpoints** — MiMo's desktop-first + mobile-companion split maps cleanly to Compact/Regular thinking.
10. **Reduce-motion as a first-class trait** — MiMo's pipeline animation should respect a reduce-motion toggle and collapse to a static progress state.

### What MiMo should avoid
1. **Do not hardcode "system color" hexes** — they are adaptive; if MiMo copies a `#007AFF`, it loses the adaptivity that makes Apple's system work. Define the role, compute the value per theme.
2. **Do not over-glass** — full Liquid Glass is GPU-expensive and tiring in multi-hour sessions. MiMo is for *daily multi-hour* use; translucency should be used sparingly (one or two layers max), not as a global effect.
3. **Do not copy the iOS tab bar + push-stack model** — MiMo is a workspace OS, not a phone app; a sidebar + command palette + ⌘K model fits better than bottom tab bars.
4. **Do not rely on vibrancy-dependent contrast** — Liquid Glass looks great in marketing but its adaptive contrast can fail; MiMo must guarantee a fallback solid surface when content behind is unpredictable (e.g., user code, arbitrary web).
5. **Do not adopt the per-platform divergence tax** — Apple pays it because they ship 5 OSes. MiMo is one product on web/desktop; the unification is a feature, not a cost.
6. **Do not animate reactively with specular highlights** — beautiful but expensive and potentially vestibular-triggering in long sessions. Reserve for rare delight moments.
7. **Do not use multiple accent colors** — Apple's discipline of one systemBlue primary is a focus mechanism MiMo should keep.

---

## Material Design 3 (Material You)

### Current guidelines (2024–2025) — verified via
- https://m3.material.io/foundations/design-tokens  `[verified — primary; token system overview]`
- https://m3.material.io/styles/elevation/applying-elevation  `[verified — primary, full content]`
- https://m3.material.io/styles/motion/easing-and-duration/tokens-specs  `[verified — primary, full content]`
- https://m3.material.io/styles/typography  +  https://m3.material.io/styles/typography/applying-type  `[verified — primary]`
- https://m3.material.io/styles/color/system/overview  +  https://m3.material.io/styles/color/roles  `[verified — primary]`
- https://m3.material.io  `[verified — primary; M3 Expressive May 2025 update: vibrant colors, intuitive motion, adaptive components, flexible typography, contrasting shapes]`
- https://github.com/yhongm/material-design-skill/blob/master/references/typography.md  `[verified — mirror of official M3 typography specs with exact px/weight/tracking values]`

### Design philosophy
Material 3 (Material You) is **token-first**: every style decision is a named token (color, type, shape, spacing, motion, elevation) that flows from a global → alias → component layer, enabling dynamic theming and brand switching. The headline feature is **Dynamic Color** — an algorithm derives a custom color scheme from the user's wallpaper, applied system-wide and to apps. The 2025 **M3 Expressive** update pushes further: vibrant colors, intuitive (spring-based) motion, adaptive components, flexible typography (variable axes — grade, width, weight, slant), and contrasting shapes. The philosophy: personal, expressive, adaptive — the UI becomes *yours* rather than *Google's*. Material 3 explicitly uses a constrained elevation system (only 6 levels) as a creative constraint forcing thoughtful depth decisions, and treats tonal difference as the primary separator between surfaces (not shadow).

### Spacing system (with numbers)
- Material 3 publishes spacing as **design tokens** (e.g. `md.sys.space.*`), with the canonical scale: **4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64 dp** (4dp base unit). The 4dp grid is the explicit Material convention (Apple only implies it).
- Padding tokens (component-level): `md.comp.*.container.*.padding` per component.
- Layout uses responsive grid: 4/8/12 columns at compact/medium/expanded breakpoints; gutters 16dp default; margins 16dp compact / 24dp expanded.
- Components align to 4dp sub-grid; larger structural elements to 8dp.

### Typography scale (with sizes)
**30 type styles total (M3 Expressive May 2025): 15 baseline + 15 emphasized.** Organized into 5 roles × 3 sizes. Default typeface **Roboto** (variable: Roboto Flex, Roboto Serif available).

**Baseline (verified against m3.material.io via GitHub mirror):**

| Role | Size | Token | Size (px) | Line-height (px) | Weight | Tracking |
|---|---|---|---|---|---|---|
| Display | Large | `typescale-display-large` | 57 | 64 | 400 | -0.25 |
| Display | Medium | `typescale-display-medium` | 45 | 52 | 400 | 0 |
| Display | Small | `typescale-display-small` | 36 | 44 | 400 | 0 |
| Headline | Large | `typescale-headline-large` | 32 | 40 | 400 | 0 |
| Headline | Medium | `typescale-headline-medium` | 28 | 36 | 400 | 0 |
| Headline | Small | `typescale-headline-small` | 24 | 32 | 400 | 0 |
| Title | Large | `typescale-title-large` | 22 | 28 | 400 | 0 |
| Title | Medium | `typescale-title-medium` | 16 | 24 | 500 | 0.15 |
| Title | Small | `typescale-title-small` | 14 | 20 | 500 | 0.1 |
| Body | Large | `typescale-body-large` | 16 | 24 | 400 | 0.5 |
| Body | Medium | `typescale-body-medium` | 14 | 20 | 400 | 0.25 |
| Body | Small | `typescale-body-small` | 12 | 16 | 400 | 0.4 |
| Label | Large | `typescale-label-large` | 14 | 20 | 500 | 0.1 |
| Label | Medium | `typescale-label-medium` | 12 | 16 | 500 | 0.5 |
| Label | Small | `typescale-label-small` | 11 | 16 | 500 | 0.5 |

**Emphasized styles (M3 Expressive)** mirror the same 15 tokens at identical sizes, but the Title/Body roles bump to weight 500 for extra emphasis at highlight moments. The 5 roles are: **Display** (hero), **Headline** (section), **Title** (item heading), **Body** (paragraph), **Label** (UI controls / buttons / captions).

### Color system
- **Dynamic Color** from wallpaper is the headline: an HCT-based algorithm extracts a source color, generates 5 tonal palettes (primary, secondary, tertiary, neutral, neutral-variant, error), each spanning tones 0–100.
- Roles are paired: every container color has an "on-*" foreground role for guaranteed contrast.
- **Full role set** (verified via m3.material.io/styles/color/roles + developer.android.com): `primary` / `on-primary` / `primary-container` / `on-primary-container`; same pattern for `secondary`, `tertiary`, `error`; `surface` / `on-surface` / `surface-variant` / `on-surface-variant`; the **surface-container ramp** added in M3: `surface-container-lowest`, `-low`, `-medium`, `-high`, `-highest`; `outline` / `outline-variant`; `background` / `on-background`; `inverse-primary` / `inverse-surface` / `inverse-on-surface`; `scrim` / `shadow`; `success` / `on-success` (added later).
- Light/dark: every role has both a light-scheme and dark-scheme value derived from the same tonal palette (light scheme uses tones ~90–99 for surfaces, ~10–40 for text; dark scheme inverts).
- **Personalization:** user can override wallpaper-derived scheme with a brand seed color → whole UI retints. This is the key innovation.

### Elevation / depth
- **6 levels only**, by deliberate creative constraint: `0`, `+1`, `+2`, `+3`, `+4`, `+5` dp.
  - Resting state: levels **0 to +3**.
  - User-interacted states (hover, dragged, pressed): levels **+4 and +5**.
- Elevation is depicted by **(a) tonal difference** (default — primary separator), **(b) drop shadows**, or **(c) scrims** (32% opacity).
- Shadows: small + sharp = close; large + soft = far. "Less is more" — fewer levels = more power per shadow.
- Surface **container color roles** (lowest → highest) are *not* tied to elevation — they decouple visual containment from z-order, giving flexibility. Overlapping components should use *different* container roles to read as separate.
- Use elevation to: (1) **protect elements** on busy/patterned backgrounds (cards, chips, buttons), (2) **encourage interaction** (lift on focus/hover/swipe, lower when higher element appears), (3) **modals/scrim** for focus.

### Motion language (durations + easing)
**Two easing sets** (verified, exact cubic-bezier from m3.material.io):

| Set | Variant | CSS cubic-bezier |
|---|---|---|
| **Emphasized** (default for most transitions) | Emphasized | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` (CSS N/A — use Standard as fallback; Flutter `easeInOutCubicEmphasized`) |
| | Emphasized decelerate | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` |
| | Emphasized accelerate | `cubic-bezier(0.3, 0.0, 0.8, 0.15)` |
| **Standard** (small/utility) | Standard | `cubic-bezier(0.2, 0.0, 0, 1.0)` |
| | Standard decelerate | `cubic-bezier(0, 0, 0, 1)` |
| | Standard accelerate | `cubic-bezier(0.3, 0, 1, 1)` |

**Duration tokens (4 tiers × 4 steps):**
- Short: `short1` 50ms · `short2` 100ms · `short3` 150ms · `short4` 200ms (selection controls: 200ms Standard)
- Medium: `medium1` 250ms · `medium2` 300ms · `medium3` 350ms · `medium4` 400ms (FAB→Sheet: 400ms Emphasized)
- Long: `long1` 450ms · `long2` 500ms · `long3` 550ms · `long4` 600ms (Card→fullscreen: 500ms Emphasized)
- Extra-long: `extra-long1` 700ms · `extra-long2` 800ms · `extra-long3` 900ms · `extra-long4` 1000ms (ambient carousel auto-advance: 1000ms Emphasized)

**M3 Expressive update (May 2025):** components and motion now use a **spring-physics system**. The easing/duration token system is still used for transitions but no longer maintained — products should migrate to springs. (Important: M3 is moving from bezier to spring.)

### Iconography
- **Material Symbols** (replaced Material Icons) — variable font with 4 axes: weight (100–700), grade (-25..200), optical size (20–48), fill (0..1). 2,500+ icons.
- Default style: **outline**; `fill` axis and `grade` enable filled/rounded variants on demand at runtime.
- 5 standard optical sizes: 20, 24, 40, 48 (and others). 24dp is the default for UI.
- Color: monochrome, inherits `on-surface-variant` or component color; multicolor rare.
- Symbol weight should pair with type weight for optical harmony.

### Component patterns
- **Buttons:** Text / Outlined / Filled / Filled Tonal / Elevated (5 variants by emphasis). Min height 40dp (label-large). Icon + label optional.
- **Cards:** Elevated / Filled / Outlined (3 variants). Resting elevation +1 (elevated) or 0 (filled/outlined). Container color role differs per variant.
- **Lists:** 1-line / 2-line / 3-line; leading icon/avatar, trailing meta/action; selectable.
- **Navigation:** Navigation bar (bottom, 3–5 destinations, compact) / Navigation rail (left edge, medium) / Navigation drawer (expanded). Top app bar (small/medium/large/center-aligned) — large app bar collapses on scroll.
- **Modals:** Bottom Sheet (modal) — drag handle, 3 heights (peek/half/full); Dialog (basic/full-screen).
- **Toasts/Snackbar:** Snackbar (bottom, 1-line, optional action, auto-dismiss 4–10s) — Material's native transient feedback (contrast Apple's no-toast stance).
- **FAB:** Primary / Extended / Surface / Third-party; resting +3 elevation, hover/pressed +4.
- **Chips:** Assist / Filter / Input / Suggestion chips — small pill-shaped containers.

### Adaptive layouts
- **3 breakpoints:** Compact (<600dp), Medium (600–839dp), Expanded (840–1199dp), plus Large/Extra-large (1200–1599dp / 1600dp+) in M3 Expressive.
- Layout changes *component choice*, not just size: Navigation Bar → Navigation Rail → Navigation Drawer as width grows. List → Grid. Single column → multi.
- 12-column grid on expanded; 4-column on compact; gutters 16dp.
- M3 Expressive adds adaptive components that re-shape based on available space.

### Accessibility
- **WCAG AA contrast minimums:** 4.5:1 normal text, 3:1 large text (≥18.5px bold or ≥24px regular).
- Touch targets: **48×48dp minimum** (Material rule, denser than Apple's 44pt).
- Focus states: visible focus ring (component-specific, often a 2dp outline).
- Color is never the only signal — pair with icon/shape/text.
- Reduce Motion: respect system "Remove animations" — collapse to instant transitions.
- TalkBack first-class; semantic roles via `Role` and `StateDescription`.
- Dynamic Color defaults preserve contrast via HCT algorithm.

### What MiMo should learn
1. **Token-first architecture (global → alias → component)** — the cleanest of the three for theming. MiMo should adopt this 3-layer token model so brand/theme swaps and dark mode are free.
2. **Surface-container color ramp decoupled from elevation** — `surface-container-lowest → highest` gives 5 distinct containment tones without stacking shadows. *Ideal* for MiMo's chat/conversation layers (message bubble, code block, sidebar, modal all get distinct container roles).
3. **Paired "on-*" foreground roles** — every container role has a guaranteed-contrast foreground. This is the most robust contrast system of the three. MiMo must do this.
4. **6-level constrained elevation** — the creative-constraint discipline (don't invent a +7) keeps depth meaningful. MiMo should adopt a similarly small fixed set.
5. **The exact duration tiers (short/medium/long × 4)** — this is the most reusable, numeric motion taxonomy. MiMo can adopt it nearly verbatim: short for state, medium for transitions, long for hero/expand.
6. **Emphasized cubic-bezier `cubic-bezier(0.05, 0.7, 0.1, 1.0)`** — the signature Material "expressive" ease; great for MiMo's expand/collapse and pipeline-stage animations.
7. **Snackbar pattern (vs Apple's no-toast)** — MiMo needs *some* transient feedback (e.g. "memory saved", "tool invoked"); Snackbar-style bottom transient with inline action is the right call.
8. **Variable-axis icons (Material Symbols)** — weight axis that matches type weight is a superpower for a conversation-first product where icons sit next to text constantly.
9. **Material's 3 button variants by emphasis (Text/Outlined/Filled)** — maps directly to MiMo's need for primary/secondary/tertiary action hierarchy without inventing new patterns.
10. **The M3 Expressive move to springs** — MiMo should use spring physics for interactive/direct-manipulation motion (drag, swipe, dismiss) and reserve bezier for structural transitions.

### What MiMo should avoid
1. **Dynamic Color from wallpaper** — charming on a phone, wrong for a desktop AI workspace where the user spends hours and needs *stable, predictable* chrome. MiMo should let the user *pick* a seed color, not derive it from wallpaper.
2. **Material's shadow-heavy elevation aesthetic** — Material 3 still leans on shadows where Apple uses translucency; for a calm multi-hour surface, Material's shadows can feel heavy. MiMo should prefer tonal-container separation + hairlines, with shadows reserved for true floating layers (popovers, modals).
3. **Bottom navigation bar** — phone-first pattern; wrong for a desktop-first OS like MiMo.
4. **The "everything is a card" instinct** — Material's card-first mental model can clutter a conversation UI. MiMo's primary surface is a *message stream*, not a card grid.
5. **30-style type scale is too granular** — MiMo should compress to ~8–10 named styles; 30 produces decision paralysis in a single-product system.
6. **FAB (Floating Action Button)** — Material's signature affordance, but MiMo's primary action (compose/send) lives inline in the conversation, not floating over it.
7. **Over-reliance on Dynamic Color contrast algorithm** — HCT guarantees contrast but produces visually muddy neutrals; MiMo should hand-tune neutral palette for long-session comfort.
8. **Easing/duration token system "no longer maintained" (M3 Expressive)** — Material itself is abandoning the bezier token system for springs; MiMo should design for springs first, with bezier as a fallback.

---

## Microsoft Fluent 2 / Fluent UI

### Current guidelines (2024–2025) — verified via
- https://fluent2.microsoft.design  `[verified — primary homepage]`
- https://fluent2.microsoft.design/design-tokens  `[verified — primary, full content]`
- https://fluent2.microsoft.design/typography  `[verified — primary, full type ramp for Web/Windows/macOS/iOS/Android]`
- https://fluent2.microsoft.design/motion  `[verified — primary, full motion principles + transitions + choreography + accessibility]`
- https://fluent2.microsoft.design/elevation  `[verified — primary, full shadow ramp with blur/opacity values]`
- https://fluent2.microsoft.design/color  `[verified — primary, full palette + interaction states + accessibility]`
- https://fluent2.microsoft.design/iconography  `[verified — primary, full icon collections + themes + sizes]`
- https://learn.microsoft.com/en-us/fluent-ui/web-components/design-system/design-tokens  `[verified — primary Microsoft Learn]`

### Design philosophy
Fluent 2 is **"Unmistakably Microsoft"** — a cross-platform design system (web, Windows, macOS, iOS, Android) built on two token layers (global raw → alias semantic) with a strong principle of **"one for all, all for one"** (accessibility-first, inclusive). It mimics 3D space by placing components at different elevations along the z-axis using **shadow + light interplay**, with a distinctive platform split (Windows uses strokes instead of key shadows to outline objects). Motion is built on **physical laws (inertia, gravity, weight, velocity)** to feel "fluid and real." Where Apple is "calm deference" and Material is "personal expression," Fluent is **enterprise-grade clarity + physical realism** — the system most explicitly engineered for multi-hour productivity tooling (Teams, Office, Outlook, Windows). Motion principles are explicitly **Functional / Natural / Consistent / Appealing**.

### Spacing system (with numbers)
- Fluent 2 publishes spacing as **alias tokens** built on a **4px base**. The canonical ramp (widely documented in Fluent UI web-components token docs and the lobehub skill reference): `xxxs` 4px, `xxs` 8px, `xs` 12px, `s` 16px ( HorizontalXS / S ), `m` 20px, `l` 24px, `xl` 32px, `xxl` 40px, `xxxl` 48px (with additional `l` 20px / `xl` 24px / `xxl` 32px variants on some platforms).
- Layout also uses **8px major grid** for structural rhythm; 4px for fine alignment.
- Spacing is one of the token categories Fluent explicitly enumerates: color, typography, spacing, elevation, stroke width, border radius, size — all tokenized.
- (Note: official `/spacing` page returns 404; spacing is documented within the design-tokens hub and the web-components token reference.)

### Typography scale (with sizes)
**Three native ramps** — Fluent uses the *native system font on each platform* (Segoe UI on web/Windows, SF Pro on macOS/iOS, Roboto on Android) for familiarity + accessibility.

**Web ramp (Segoe UI) — verified verbatim from fluent2.microsoft.design/typography:**

| Name | Weight | Size / Line-height |
|---|---|---|
| Caption 2 | Regular | 10px / 14px |
| Caption 2 Strong | Semibold | 10px / 14px |
| Caption 1 | Regular | 12px / 16px |
| Caption 1 Strong | Semibold | 12px / 16px |
| Caption 1 Stronger | Bold | 12px / 16px |
| Body 1 | Regular | 14px / 20px |
| Body 1 Strong | Semibold | 14px / 20px |
| Body 1 Stronger | Bold | 14px / 20px |
| Subtitle 2 | Semibold | 16px / 22px |
| Subtitle 2 Stronger | Bold | 16px / 22px |
| Subtitle 1 | Semibold | 20px / 26px |
| Title 3 | Semibold | 24px / 32px |
| Title 2 | Semibold | 28px / 36px |
| Title 1 | Semibold | 32px / 40px |
| Large Title | Semibold | 40px / 52px |
| Display | Semibold | 68px / 92px |

**Windows ramp (Segoe UI Variable):** Caption 12/16 · Body 14/20 · Body Strong 14/20 · Body large 18/24 · Subtitle 20/28 · Title 28/36 · Large Title 40/52 · Display 68/92.

**macOS ramp (SF Pro):** Caption1 10/13 · Body1 13/16 · Subtitle2 11/14 · Subtitle1 13/16 · Title3 15/20 · Title2 17/22 · Title1 22/26 · Large Title 26/32 · Display 30/40 (mirrors Apple's own ramp — Fluent adapts to the platform).

**iOS ramp (SF Pro):** Caption2 12/16 · Caption1 13/18 · Body2 15/20 · Body1 17/22 · Title3 20/25 · Title2 22/28 · Title1 28/34 · Large Title 34/41 · Display 60/70.

**Android ramp (Roboto):** Caption2 12/16 · Caption1 13/18 · Body2 14/20 · Body1 16/24 · Title3 18/24 · Title2 20/24 · Title1 24/32 · Large Title 34/44 · Display 60/72.

**Styling rules:** sentence case (never all-caps for emphasis); baseline vertical alignment; left-align LTR / right-align RTL (Arabic, Hebrew — directly relevant to MiMo). Standard text contrast ≥4.5:1; large text (≥18.5px bold or ≥24px regular) ≥3:1.

### Color system
- **Three palettes:**
  1. **Neutral** — black, white, grays; grounds surfaces, text, layout; connotes state change in components. Lighter neutrals on surfaces = primary focus.
  2. **Shared** — aligned across M365 suite; used in high-value reusable components (avatars, calendars, badges) for quick cross-product recognition. Shift saturation/brightness in dark mode to reduce eye strain.
  3. **Brand** — product-specific (Outlook blue, PowerPoint orange, Excel green, Teams purple, Word blue, etc.) for immediate brand recognition. Applied to CTAs, selected states, not large surfaces.
- **Semantic colors** (subset of shared) communicate feedback/status/urgency: red = danger, yellow = caution, green = positive. Used only for important messages, never decoration. Always paired with another indicator (icon/shape).
- **Interaction states darken:** rest (lightest) → hover → selected (darkest). **Windows is the exception** — controls get *lighter* as interacted.
- **Focus state:** control color doesn't change; container gets a thicker stroke to distinguish mouse vs keyboard interaction.
- **Theming out-of-the-box:** light, dark, high-contrast, and branded themes; tokens guarantee WCAG contrast across all.
- **Alias tokens** add semantic meaning to raw global values (e.g. `colorBrandBackgroundHover` condenses multiple raw values into one named intent).

### Elevation / depth
**Shadow ramp (verified verbatim from fluent2.microsoft.design/elevation):**
- **Two ramps:** Low elevation (resting states) and High elevation (floating/overlay states).
- Shadow = combination of **key** (sharp, directional — defines edges) + **ambient** (soft, diffused — implies distance).
- **Token values** (blur = n pixels; shadow type = `$shadow{n}`):

| Token | Use case | Light Shadow 1 (blur=1·n, x=0, y=0.5·n, opacity=14%) | Light Shadow 2 | Dark Shadow 1 (opacity=28%) | Dark Shadow 2 |
|---|---|---|---|---|---|
| `$shadow2` | Cards without edge, FAB pressed | ✓ | ✓ | ✓ | ✓ |
| `$shadow4` | Cards (general), grid items, list items | — | blur=4 | — | — |
| `$shadow8` | FAB (resting), raised cards, raised app bars, command bars, command dropdowns, tooltips | — | — | — | — |
| `$shadow16` | Cards without edge, FAB pressed, callouts, hover cards | — | — | — | — |
| `$shadow28` | Bottom sheet, side navigation, raised tab bars | (high-ramp formula) | | | |
| `$shadow64` | Pop-up dialogs, panels | (high-ramp formula) | | | |

- **Platform distinction:** Windows uses **strokes instead of key shadows** to outline objects (a deliberate Fluent platform divergence).
- **Shadows on colored surfaces:** adjusted via the **luminosity equation** `0.2126*R + 0.7152*G + 0.0722*B` to calculate opacity, so a shadow on a brand color visually matches a shadow on a neutral. Brand shadow tokens provided.
- Shadow direction conveys a consistent perceived light source; size (sharp/crisp = close, large/soft = far).

### Motion language (durations + easing)
**Four motion principles (verified):**
1. **Functional** — purpose and intent; motion identifies next step, informs of changes, celebrates accomplishments.
2. **Natural** — follows physical laws (inertia, gravity, weight, velocity) → believable + predictable.
3. **Consistent** — unifies Microsoft experiences, strengthens "Unmistakably Microsoft."
4. **Appealing** — delightful, draws people in, creates memorable moments.

**Duration:** size + distance-driven. Larger elements / longer travel → longer duration. Aim for fast + smooth without making people wait. Fluent does not publish a fixed ms table the way Material does — duration is contextual. (This is a deliberate difference; Fluent treats duration as emergent from element physics.)

**Easing (verified):**
- **Linear** — constant speed; unnatural; use only for consistent-rate needs (rotations).
- **Ease-in** — slow start, speeds up.
- **Ease-out** — fast start, slows down.
- **Ease-in-out** — slow → fast → slow.

**Four core transition patterns:**
1. **Enter and Exit** — introduce/dismiss elements (menus, dialogs, popovers).
2. **Elevation** — indicate depth change (button states, drag-drop, windows, hierarchy).
3. **Top level** — navigate between pages/destinations; large elements → use **quick fade** (avoid slide/disorient).
4. **Container transform** — resize/reposition a container (responsive layout shifts).

**Choreography:**
- **Staggering** — delay start of one or more animations to soften entry of large sets or shift gaze. Short offsets; preferred for most scenarios; non-staggered only for very large groups.
- **Hierarchy** — order of animation; important elements get more prominent movement + longer duration; less-significant elements group with synchronized timing.

**Accessible motion design (verified, explicit):**
- Design for and include a **"no motion" setting** (WCAG recommendation).
- Keep durations short and movement natural.
- Avoid flashes / jarring movements (seizure triggers).
- Keep motion constrained to the **element in focus** — motion elsewhere distracts.
- Use **ARIA live regions** to announce dynamic content as an alternative to motion.

### Iconography
- **Three collections:** System icons (UI: command bars, nav, status), Product launch icons (Microsoft app icons — identify capability, not the company), File type icons.
- **Two themes:**
  - **Regular** (outline) — primary wayfinding, identify + select actions (download, buy, launch).
  - **Filled** — highlight selected states, or smaller moments needing more weight/readability.
- **Sizes:** 12 (information only, too small for interaction), 16, 20, 24, 32, 48. Larger icons on smaller screens / less-precise input (touch). Match icon size to the tool/input precision.
- **Product icons:** simplify in detail below 48px; scale by factors of 4 above 48px (48 → 64 → 96 → 192) for pixel perfection.
- **File type icons:** multicolor, best at 16/48/96px; available as SVG + webp.
- **Naming:** literal metaphor (Shield, not Security).
- **Modifiers:** filled, placed bottom-right corner, to add specific action to a base icon — use sparingly.
- **Color:** monochrome by default; adding color disrupts balance — use carefully. Icons inherit component color.
- System icons are MIT-licensed open source (Figma + GitHub).
- Icons should be recognizable, functional, easily understood — semantic purpose in layout.

### Component patterns
Fluent 2 ships **50+ components** (verified from fluent2.microsoft.design nav), including: Accordion, Avatar, Avatar group, Badge, Breadcrumb, Button, Card, Carousel, Checkbox, Combobox, Dialog, Divider, Drawer, Dropdown, Field, Image, Info label, Input, Label, Link, List, Menu, Message bar, Nav, Persona, Popover, Progress bar, Radio group, Rating, Searchbox, Select, Skeleton, Slider, Spin button, Spinner, Switch, Tablist, Tag, Tag picker, Text, Textarea, Toast, Toolbar, Tooltip, Tree.
- **Buttons:** variants by appearance (subtle/outline/filled/transparent) + size (small/medium/large). Strong/Brand appearance for primary CTAs.
- **Cards:** subtle elevation + neutral/brand background; consistent radius.
- **Lists:** List + Tree (hierarchical); supports selection, drag-drop, virtualization.
- **Nav / Sidebars:** `Nav` component for vertical navigation; collapsible groups; selected state via thicker stroke + brand fill.
- **Modals:** Dialog (modal/non-modal) + Drawer (side panel); `shadow64` for dialogs.
- **Toasts:** explicit `Toast` component (transient, auto-dismiss, action optional) — Microsoft embraces toasts (contrast Apple).
- **Message bar:** persistent status/feedback (error/warning/success/severe); not transient.
- **Tabs:** Tablist (horizontal/vertical); selected tab gets underline + brand color.
- **Persona / Avatar:** identity representation (image + initials + presence).
- **Toolbar:** action grouping for command surfaces.

### Adaptive layouts
- Fluent 2 is **cross-platform** (web, Windows, macOS, iOS, Android) — adaptation is by *platform* more than by breakpoint. Native type + native elevation idiom (Windows uses strokes) on each.
- Web uses responsive breakpoints; Layout tokens (`layout` section in design language). Common: small (<480), medium (480–639 / 640–1023), large (1024+).
- Fluent UI Web Components are framework-agnostic (work in React, Vue, vanilla, Angular).
- Adaptive color system provides unique advantages: guarantees WCAG contrast across all themes including high-contrast mode (a Windows accessibility hallmark).
- Windows-specific: snap layouts, mica/acrylic materials, native window chrome.

### Accessibility
- **"One for all, all for one"** is principle #1 — inclusive design is foundational, not bolted on.
- Contrast: ≥4.5:1 standard text, ≥3:1 large text (matches WCAG AA).
- **High-contrast theme** is a first-class theme (not a fallback) — Windows heritage.
- Keyboard-first: explicit focus states (thicker stroke on container), full keyboard access.
- Screen reader support (NVDA, JAWS, Narrator, VoiceOver, TalkBack) via ARIA.
- **"No motion" setting** explicitly recommended (WCAG).
- Motion constrained to element in focus.
- ARIA live regions for dynamic content (alternatives to motion).
- Avoid seizure-triggering flashes.
- Color paired with icon/shape/text — never sole signal.

### What MiMo should learn
1. **Two-layer token model (Global raw → Alias semantic)** — slightly cleaner than Material's three-layer; MiMo should adopt exactly this: global tokens hold raw values (hex, px, ms), alias tokens hold intent (`colorBackgroundBrandHover`, `spacingComponentPadding`). This is the most enterprise-proven token structure.
2. **Platform-native typography is the right call** — Fluent uses SF Pro on Mac/iOS, Segoe on Windows, Roboto on Android. MiMo (web/desktop) should use the *native system font stack* (`-apple-system, Segoe UI, Roboto, system-ui…`) so it feels native on every OS the owner uses.
3. **Explicit RTL support in typography rules** — Fluent's "right-align for RTL (Arabic, Hebrew)" is directly relevant to MiMo's Arabic-first support.
4. **Sentence-case rule + baseline alignment** — calm, readable, no all-caps shouting. Matches MiMo's "calm" tone.
5. **The shadow ramp ($shadow2/4/8/16/28/64 with use-cases)** — the most prescriptive, component-mapped elevation guide of the three. MiMo can adopt this ramp with named use-cases (cards→4, FAB→8, hover→16, dialog→64).
6. **Windows uses strokes instead of key shadows** — a brilliant insight: in a calm multi-hour UI, a 1px stroke often reads cleaner than a shadow. MiMo should use strokes for resting separation and shadows only for true floating layers.
7. **Four motion transition patterns (Enter/Exit, Elevation, Top-level fade, Container transform)** — the cleanest transition taxonomy. MiMo's pipeline-stage expand/collapse = Container transform; mode switching = Top-level fade; popover = Enter/Exit.
8. **"No motion" setting as a first-class feature + ARIA live regions as motion alternative** — MiMo's ExecutionTrace should announce via ARIA live region so screen-reader users get the "AI is working" signal without motion.
9. **Message bar vs Toast split** — Fluent distinguishes persistent status (Message bar) from transient feedback (Toast). MiMo should adopt this split: persistent = inline message in conversation; transient = toast for confirmations.
10. **Interaction states darken progressively (rest→hover→selected)** — predictable, low-cognitive-load pattern. MiMo should use the same monotonic darken ramp.
11. **High-contrast theme as first-class** — important for an owner-operator who may use accessibility tools; MiMo should ship a high-contrast theme.
12. **Persona/Avatar component** — relevant for MiMo's identity surface (owner's profile, agent identities in the dock).

### What MiMo should avoid
1. **Enterprise visual heaviness** — Fluent's default density and chrome (command bars, ribbons, toolbars) is optimized for Office/Teams productivity apps, not a calm conversation surface. MiMo should keep Fluent's *structure* but lighten the *density*.
2. **Brand color proliferation (one per product)** — Fluent assigns brand colors per M365 app (Outlook blue, Excel green, Word blue, Teams purple…). MiMo is one product; multi-color branding would dilute focus. One accent only.
3. **Windows-specific platform quirks (mica/acrylic, strokes-instead-of-shadows)** — beautiful on Windows, but MiMo is web/desktop cross-platform; don't lock depth model to a single platform idiom.
4. **Duration-without-numbers motion guidance** — Fluent deliberately leaves duration contextual ("size + distance driven"). For a *single* product this is underspecified; MiMo should publish actual ms tokens (borrow Material's short/medium/long tiers).
5. **60+ component sprawl** — Fluent ships 50+ components because it serves the entire M365 suite. MiMo needs ~15–20 well-chosen primitives; importing Fluent's full library would over-formalize.
6. **Linear easing ever** — Fluent lists it for "consistent rate like rotations"; in practice linear reads as mechanical and wrong for a conversational, organic UI. MiMo should ban linear except for indeterminate progress spinners.
7. **"Unmistakably Microsoft" branding posture** — Fluent is engineered to *feel like Microsoft*. MiMo should feel like *itself*, not borrow another company's brand voice.
8. **Segoe UI as the *only* font** — using Segoe on macOS/iOS feels alien; MiMo must use the platform-native stack, not force one font everywhere.

---

## Cross-system synthesis — what MiMo's own design language should be

**The single most important cross-cutting insight:** all three systems converge on the same three architectural commitments, and MiMo should adopt all three:

1. **Token-first, semantic, role-based** — Apple (semantic adaptive colors + named Dynamic Type styles), Material (global→alias→component tokens + surface-container ramp + paired on-* foregrounds), Fluent (global raw → alias semantic). MiMo must define tokens by *role/intent* (e.g. `surface-message`, `text-primary`, `accent-brand`, `border-hairline`), never by raw value. This gives free light/dark/contrast theming.

2. **Constrained elevation by *intent*, not by number** — Material's 6 levels (0–+5) with resting (0–3) vs interacted (+4–+5); Fluent's 6 shadow tokens mapped to component use-cases; Apple's "material layer above content" model. MiMo should pick a *small fixed set* (e.g. 5: base / hairline / container / floating / modal) and never invent a 6th.

3. **Type as named roles that rescale** — Apple's Dynamic Type (named styles, not px), Material's 5-role×3-size scale, Fluent's Caption/Body/Subtitle/Title/LargeTitle/Display ramp. MiMo should adopt ~9 named roles (Display, Title1/2/3, Headline, Body, Subhead, Caption1/2) with a variable/rescalable system, and a single system-font stack that's platform-native.

**The two sharpest cross-system tensions MiMo must resolve:**
- **Apple (no toasts, calm, material-depth) vs Material/Fluent (toasts, shadow-depth)** → MiMo should pick **Apple's no-native-toast stance** for its conversation flow (inline status is calmer and matches its ExecutionTrace model), but borrow **Material's Snackbar** pattern for transient system confirmations only (memory saved, tool invoked).
- **Material's wallpaper-derived Dynamic Color vs Fluent's brand-per-product vs Apple's adaptive semantic** → MiMo should adopt **Apple's adaptive semantic approach** (one accent, role-based, auto-flips per theme) and let the *user* pick a seed color (Material's personalization minus the wallpaper coupling).

**The numeric backbone MiMo should ship:**
- **Spacing:** 4px base, scale 4/8/12/16/20/24/32/40/48 (Material + Fluent convergence).
- **Type ramp (web/desktop):** Display 56/64 · Title1 32/40 · Title2 28/36 · Title3 22/28 · Headline 18/24 · Body 16/24 · Subhead 14/20 · Caption1 12/16 · Caption2 11/16 — single system-font stack (`-apple-system, 'Segoe UI', 'Roboto', system-ui, sans-serif`), weight-for-hierarchy (400/500/600/700).
- **Elevation:** 5 levels — `base` (0) · `hairline` (1px stroke) · `container` (tonal-step, no shadow) · `floating` (`shadow8`-equivalent) · `modal` (`shadow64`-equivalent + scrim 32%).
- **Motion:** Material's duration tiers (short 50–200ms / medium 250–400ms / long 450–600ms) + Emphasized cubic-bezier `(0.05, 0.7, 0.1, 1.0)` for expressive + spring physics for direct manipulation; Fluent's 4 transition patterns (Enter/Exit, Elevation, Top-level fade, Container transform); ARIA live region + "no motion" toggle mandatory.
- **Color:** role tokens (primary/on-primary, surface/on-surface, surface-container-lowest→highest, outline/outline-variant, danger/warning/success/info with paired on-* foregrounds), one user-pickable accent seed, auto-derived light/dark/high-contrast schemes, guaranteed WCAG AA contrast via paired foregrounds.
- **Icons:** one variable-weight icon family (Material Symbols style) whose weight matches type weight; outline default, filled for selected state; 16/20/24/32 sizes; inherit component color.
- **Tap target:** 44px minimum (Apple's rule, slightly more generous than Material's 48dp — better for trackpad/low-vision).
- **Adaptation:** size-class/trait model (Compact/Regular) over CSS breakpoints; desktop-first with mobile-companion.

**The through-line for MiMo's design language:** *Apple's calm deference + Material's token rigor + Fluent's prescriptive component-depth mapping — minus each system's signature excess* (no over-glass, no wallpaper-derived color, no enterprise chrome, no per-product brand colors, no bottom tab bars, no FAB).
