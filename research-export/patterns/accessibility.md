# Pattern: Accessibility

> Task PAT-4 — Evidence-Based Pattern Synthesis. Phase R2. NO MiMo design. Synthesis of evidence from existing product research files. Every claim cited.

---

## 1. Pattern Definition

**Accessibility (a11y)** in this evidence set refers to the documented posture of each product toward users with cognitive, motor, visual, auditory, and linguistic differences — and the WCAG/W3C conformance posture, screen-reader support, keyboard-only operability, color contrast, motion-reduction respect, focus-visible handling, internationalization, and platform-native a11y inheritance each product exhibits.

The pattern decomposes into six observable sub-primitives:

1. **Dedicated a11y documentation surface** — does the product publish a VPAT/WCAG conformance report or a dedicated a11y help page? (VS Code: yes; others: mostly no.)
2. **Screen-reader support** — VoiceOver / Narrator / Orca via ARIA patterns, accessibility trees, AccessKit (for GPU-rendered UIs).
3. **Keyboard-only operability** — every action reachable without a mouse; focus rings; tab-trap handling.
4. **Color contrast / high-contrast themes** — native high-contrast mode toggle (VS Code yes, Notion added Jul 2026, Microsoft Learn yes) vs. community-themed (Linear, Raycast) vs. absent (Arc).
5. **Reduced-motion respect** — `prefers-reduced-motion` media query / OS-level "Reduce Motion" setting honored (Linear, Raycast, Arc, Notion verified; most others undocumented).
6. **Internationalization + non-English keyboard parity** — language localization for input/NLP; non-English keyboard shortcut parity (Craft discloses gap; Things 3/Fantastical have multilingual NLP; Helix/Craft have non-English caveats).

The **negative space** is critical: most products in the evidence set have *functional but undocumented* a11y — a documented weakness compared to VS Code's explicit a11y page.

---

## 2. Why It Matters

### Academic evidence (HCI laws/principles)

- **Shneiderman's 2nd Golden Rule "Seek universal usability"** (added 6th edition, 2016): "Recognize diverse users (novice to expert, age ranges, disabilities, international variations, technological diversity); design for plasticity; provide explanations for novices and shortcuts for experts." [Source: academic/ben-shneiderman.md §4, citing https://www.cs.umd.edu/~ben/goldenrules.html]
- **Shneiderman's 8th Golden Rule "Reduce short-term memory load"** — accessibility for cognitive differences requires visible state, persistent labels, breadcrumb navigation — directly maps to a11y for users with working-memory impairments. [Source: academic/ben-shneiderman.md §4]
- **Nielsen Heuristic #4 "Consistency and Standards"** + Heuristic #6 "Recognition Rather than Recall" — accessibility overlaps: users with cognitive load benefit from recognition-based interfaces (visible menus, autocomplete, recent-items lists, breadcrumbs). [Source: academic/jakob-nielsen.md §4; academic/recognition-vs-recall.md §3, citing https://www.nngroup.com/articles/ten-usability-heuristics/]
- **Fitts's Law (1954)** — button/target sizing for motor-impaired users; Apple iOS HIG 44×44pt minimum, Google Material 48×48dp, Microsoft Fluent 32×32px (2017+). ISO 9241-9:2000 / ISO/IEC 9241-411:2014 standardizes throughput. [Source: academic/fitts-law.md §6, citing Fitts 1954 J Exp Psych 47(6):381-391]
- **Raskin's modelessness + universal undo** — motor-impaired and cognitively-impaired users benefit most from modeless interfaces (no invisible state) and universal undo (anxiety relief encourages exploration). [Source: academic/jef-raskin.md §4-§5, citing Sellen, Kurtenbach & Buxton 1992 CHI '92 DOI 10.1145/142750.142795]
- **Norman's Gulf of Evaluation** — for users with cognitive differences, the gulf between system state and user understanding widens. Discoverability + signifiers are accessibility features, not just usability features. [Source: academic/don-norman.md §4]
- **WCAG 2.1** (cited across the evidence set in VS Code, Notion, Linear, Raycast, Arc, Craft, Microsoft): SC 1.4.3 Contrast (Minimum), SC 2.1.1 Keyboard, SC 2.3.3 Animation from Interactions, SC 2.4.7 Focus Visible, SC 3.3.2 Labels or Instructions.

### Mechanistic claim

Accessibility matters because **the user population is not homogeneous**. CLT's expertise-reversal effect (Kalyuga, Ayres, Chandler & Sweller 2003) demonstrates that techniques that help one user population can hurt another — accessibility design is the discipline of accommodating multiple populations simultaneously. [Source: academic/cognitive-load-theory.md §5] Without explicit a11y design, products default to the "average user" (a non-existent construct) and silently exclude users at the tails of the distribution.

---

## 3. Evidence Across Products

### Tier-1 (deepest documented a11y)

**VS Code** [Source: evidence/vscode.md §19]
- **Dedicated Accessibility docs page** — relatively rare among the studied products.
- **Keyboard-only navigation**: full support, with `Tab` traps handled by focus rings.
- **Screen reader optimization**: "VS Code is optimized for screen readers […] we recommend setting the Screen Reader Mode to 'on'." Toggle with `editor.screenReaderAnnounceInlineSuggestion`.
- **Accessibility Help**: ⌥F1 (Alt+F1 / Shift+Alt+F1) opens context-sensitive help menu for editor, terminal, notebook, Chat view, Inline Chat.
- **Zoom**: View → Appearance → Zoom In/Out (⌘= / ⌘-) — 20% per step, persisted in `window.zoomLevel`. Also supports fine decimals.
- A11y baseline inherited by Cursor (VS Code fork).

**Apple Intelligence** [Source: evidence/apple-intelligence.md §19]
- **VoiceOver** (richer descriptions): "VoiceOver describes your physical surroundings and onscreen content in richer detail."
- **Magnifier** (zoom + AI Q&A): "Magnifier zooms in so you can ask about what's in frame."
- **Accessibility Reader** (text cleanup): "Accessibility Reader cleans up text for easier reading."
- **Voice Control** (flexible natural language): "Voice Control is more flexible so you can interact with apps in your own words with less to memorize."
- **Live Translation**: "automatically translate texts in Messages, display live translated captions in FaceTime, and get spoken translations for calls in the Phone app and conversations on your AirPods."
- Siri voice output: "Pick a voice, then customize expressivity and pace until it clicks for you." — implies adjustable speech rate for accessibility users.
- Foundation Models framework: `unsupportedLanguageOrLocale` error for graceful degradation; API to check whether model supports a certain language.

**Microsoft 365 Copilot** [Source: evidence/ms-copilot.md §19]
- **Fluent 2 a11y tooling**: "A11y – Focus Order: Quickly annotate your design's focus and tab order for a meaningful flow of interactive objects. A11y – Color Contrast Checker: Ensure your text is readable by adhering to Web Content Accessibility Guideline standards." [https://fluent2.microsoft.design/]
- **WCAG compliance** — Microsoft 365 apps generally conform to WCAG 2.1 AA. Specific Copilot WCAG conformance reports are per-app on Microsoft Learn (not captured this round due to auth wall).
- **Microsoft Responsible AI** — Copilot Chat "adheres to Microsoft's Responsible AI principles."
- **AI Disclaimer** footer link on Microsoft Learn pages.
- **High contrast themes** — Microsoft Learn themes include "Light, Dark, High contrast" (visible in footer of all captured Learn pages).

### Tier-2 (functional a11y, less documented)

**Linear** [Source: evidence/linear.md §19]
- Keyboard-only operation is fully supported (Linear is keyboard-first by design).
- ARIA live regions announce status changes (e.g., "Issue moved to In Progress") — community-confirmed via screen reader behavior.
- Color contrast: default theme is mid-contrast; high-contrast themes are not natively offered as of 2025-08-07 (community feature request).
- Screen reader: desktop app built on Electron — inherits Chromium a11y; web app uses standard React ARIA patterns.
- **Reduced motion**: respects OS-level "Reduce Motion" setting (verified by prior use).
- **No dedicated a11y page** in Linear's docs (compared to VS Code's explicit accessibility page).
- **Gap**: no public VPAT/ACR or formal WCAG statement linked from the main site (though Enterprise customers can request one).

**Notion** [Source: evidence/notion.md §19]
- **High contrast mode** (Jul 30 2026 release): "Accessibility win! High contrast mode is a new display option that makes text, icons, and borders easier to read. Try it by going to Settings > Preferences > Appearance. Available on desktop and web."
- **Keyboard shortcuts**: comprehensive (see keyboard-ux.md).
- **Screen reader support**: Notion uses ARIA patterns but complex block structures can confuse screen readers. Community feedback cites limitations.
- **No dedicated a11y page** in Notion Help (compared to VS Code).

**Raycast** [Source: evidence/raycast.md §19]
- **VoiceOver**: Raycast claims VoiceOver compatibility in marketing; the manual mentions accessibility in passing.
- **Keyboard navigation**: full — Raycast IS the keyboard-first product. Every action is reachable without a mouse.
- **High contrast**: Custom Themes (Pro) allow high-contrast color schemes but no native "High Contrast" mode toggle like VS Code.
- **Dynamic Type**: respects macOS Dynamic Type partially (text size adjustable in AI Chat as of v1.102.0). [raycast-changelog.html v1.102.0 — "AI Chat Text Settings: You can now control the text size and line spacing in AI Chat independently of the main window."]
- **Reduced Motion**: respects macOS "Reduce Motion" setting (verified by behavior in prior use).
- **Color contrast**: not formally documented; community themes vary.
- **Gap**: Raycast's a11y is functional but **not rigorously documented**.

**Claude (claude.ai web)** [Source: evidence/claude.md §19]
- Marketing pages support focus-visible outlines with configurable `--focus--width` and `--focus--offset-outer` CSS variables.
- Marketing site uses `prefers-color-scheme: light` and `prefers-color-scheme: dark` media queries for theme-aware favicons.
- Marketing site sets `<html lang="en-US">` and provides localized `hreflang` alternates (en-US, ja-JP, de-DE, fr-FR, ko-KR, it-IT).
- Anti-flicker CSS hides elements with `[data-prevent-flicker='true']` until GSAP loads, with a `<noscript>` fallback to make them visible.
- Help center offers 12 language options (English, Français, Deutsch, Bahasa Indonesia, Italiano, 日本語, 한국어, Português, Пусский, 简体中文, Español, 繁體中文).
- Visual content has explicit mobile limitations: "Visual weather content is available on web and desktop. On mobile (iOS and Android), Claude provides weather information as text in the conversation."
- **No published VPAT / WCAG conformance report.** Flagged as known gap.

**Craft** [Source: evidence/craft.md §19]
- **Keyboard-only access** — "The context menu shortcut (Ctrl+Return) provides keyboard-only access to all context actions, offering an alternative to right-clicking. This improves accessibility and enables faster keyboard-first workflows." [introduction_shortcuts.md]
- **External keyboard support on iOS/iPadOS** — "Mobile platforms (iOS/iPadOS) support external keyboard shortcuts when connected."
- **Custom shortcuts via macOS System Settings** — users with motor differences can remap any menu action.
- **Non-English keyboard caveat** — "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English."
- **Apple Vision Pro support** — Craft ships a Vision Pro app, demonstrating commitment to platform accessibility ecosystems.
- **Apple Intelligence integration** — Craft's on-device AI uses Apple Foundation Model, requiring Apple Intelligence to be turned on.
- **No documented WCAG conformance statement** found in crawlable docs.

**Helix** [Source: evidence/helix.md §19]
- Bounded by terminal accessibility:
  - **No native screen-reader support**: terminal apps rely on the terminal emulator's accessibility tree (VoiceOver/Terminal on macOS, Orca/xterm on Linux, Narrator/Windows Terminal on Windows). Helix does not expose an accessibility tree of its own.
  - **Cursor shape**: configurable per mode (`block`/`bar`/`underline`/`hidden`) but "only the primary cursor can change shape" due to terminal limitations.
  - **Color modes**: `color-modes = false` default — when true, the mode indicator (NORMAL/INSERT/SELECT) is colored differently per mode.
  - **`true-color`** override for terminals that support 24-bit color but report false negatives.
  - **`undercurl`** override for terminals that support undercurl (squiggly underlines) but report false negatives.
  - **`kitty-keyboard-protocol`** = `enabled | disabled | auto` — controls whether extended keyboard protocol is used (affects which key combos can be detected).
  - **Terminal conflicts**: "Some terminals' default key mappings conflict with Helix's. If any of the mappings described on this page do not work as expected, check your terminal's mappings."
- FAQ: "No Electron. No VimScript. No JavaScript. Use it over ssh, tmux, or a plain terminal. Your laptop battery life will thank you." — accessibility through low resource usage (works on old/low-end machines).

**Zed** [Source: evidence/zed.md §19]
- Home page demos agent task titled "Add AccessKit support to GPUI elements" — AccessKit is the Rust accessibility framework that exposes UI trees to platform screen readers (VoiceOver, Narrator, Orca). Agent's task statement: "I want to add AccessKit support to GPUI so screen readers can traverse the element tree."
- Significant: Zed is actively building screen-reader accessibility into its GPU-rendered UI framework (GPUI), non-trivial because GPU-rendered canvases do not have a native accessibility tree. Worktree name `gpui-accesskit` confirms this is in progress.
- No documented screen-reader support status, colour-contrast spec, or keyboard-only navigation guarantee was found in crawlable surface.

**Obsidian** [Source: evidence/obsidian.md §19]
- Limited direct evidence in fetched sources.
- Changelog mentions keyboard navigation improvements in Settings (Tab/Shift-Tab focusable elements).
- Mobile changelog: "Tablet: Press-and-hold to resize splits and pinned sidebars."
- **Obsidian community forum (forum.obsidian.md)** hosts extensive discussion of screen-reader limitations, color-blind issues, and focus-trap problems — but the forum is a separate site and was not fetched in this pass.

### Tier-3 (weak / undocumented a11y)

**Arc** [Source: evidence/arc.md §19]
- **No dedicated a11y page** in the Arc Help Center (Cloudflare-blocked from this research; not in cached content).
- **Keyboard navigation**: full support — Arc is keyboard-first by design (Command Bar is the primary surface).
- **VoiceOver**: Arc claims VoiceOver compatibility on macOS but specifics not documented.
- **High contrast**: no native High Contrast theme (per Arc's design philosophy — themes are aesthetic, not a11y-focused).
- **Reduce Motion**: respects macOS "Reduce Motion" setting (verified by prior use).
- **Color vision**: Arc uses color for Spaces (per-Space themes) — **color-blind users may struggle to differentiate Spaces by color alone.**
- **Weakness**: Arc's a11y documentation is the **weakest among the 5 studied products** — VS Code has a dedicated a11y page; Notion added High Contrast in Jul 2026; Linear has functional a11y with ARIA patterns. Arc's a11y documentation is essentially absent from publicly accessible sources.

**Cursor** [Source: evidence/cursor.md §19]
- No a11y statements found on cursor.com/docs or cursor.com/blog as of access date.
- Inherits VS Code Electron accessibility baseline (standard for VS Code forks). [https://code.visualstudio.com/docs/editor/accessibility]
- Not directly accessed.

**Gemini** [Source: evidence/gemini.md §19]
- Accessibility is partially documented:
  - Sign-in required for nearly every feature — **a barrier for users without Google accounts**.
  - Age gating: "Be 18 or over" for Memory and Deep Research; "13 (or the applicable age in your country) or over" for Gems; "supervised accounts" have reduced feature sets.
  - Work/school accounts: many personalization features are explicitly unavailable ("This feature isn't available when you sign in to a work, school, or supervised Google Account").
  - Language availability: Help Center offers 50+ languages; mobile "Hey Google" unavailable in 11 languages (Bulgarian, Croatian, Estonian, Finnish, Greek, Hebrew, Hungarian, Latvian, Lithuanian, Romanian, Serbian, Slovak, Slovenian, Ukrainian).
  - Dark Mode is toggle-able.
  - **No explicit screen-reader, keyboard-only, or ARIA documentation was found** — evidence gap.

**Manus** [Source: evidence/manus.md §19]
- **Not heavily documented.** No VPAT / WCAG conformance statement found.
- **Mobile-first Design View Mark tool**: "Press and Hold to Mark" — relies on touch gesture, may have keyboard-equivalent gap.
- **Voice input** (mobile) for instructions.
- **15+ language support** in nav (English, Deutsch, Español, Español Latinoamérica, Français, Italiano, Português Brasil, Português Portugal, Tiếng Việt, Türkçe, 简体中文, 繁體中文, 日本語, 한국어, العربية, ไทย, हिन्दी).
- **Trust center exists** (linked from footer).
- **Help center exists** (help.manus.im linked from docs FAQ).

**Bolt** [Source: evidence/bolt.md §19]
- Almost no documented accessibility features:
  - **No documented keyboard shortcut set** beyond `Ctrl+S` and `Enter`.
  - **Safari read-only limitation** in Code view — must use Chrome/Chromium-family browser to edit code. **This is an access-barrier for Safari users.**
  - WebContainer supports "all major browsers, from Chromium-based, to Firefox or Safari TP" (Technology Preview only — i.e., stable Safari is NOT supported for WebContainer itself; only Safari TP).
  - Help Center uses ⌘K for search, ⌘I for Ask Assistant — site-level.
  - **Bolt Slides** as separate artifact type — no accessibility-specific docs.
- **Evidence gap**: no VPAT/WCAG statement, no documented screen-reader behavior for the chat thread, no documented high-contrast or reduced-motion mode. Compared to Lovable's SEO & AI search accessibility checks, Bolt's a11y posture is weaker in public docs.

**v0** [Source: evidence/v0.md §19]
- **Not heavily documented.** Docs mention "non-editable text is detected in Design Mode" messaging (Jan 16, 2026 fix).
- Keyboard shortcuts documented throughout (Cmd+K, Cmd+B, Cmd+F, Cmd+S, Option+D, Cmd+I, Escape, arrow keys, Enter, ⌘+click).
- iOS app exists; MCP server presets desktop-only ("Adding or configuring new MCP server presets is currently handled on desktop").
- "Mobile settings pages no longer crowd actions or clip table contents" (May 15, 2026).
- "The sidebar no longer flashes on load on narrow screens" (Jul 31, 2026).
- SOC 2 Type 2 attestation covers Security, Confidentiality, Availability.
- **No published VPAT / WCAG conformance statement found** in cached docs.

**Warp** [Source: evidence/warp.md §19]
- Docs site has dedicated Accessibility section: "Accessibility" listed under "More Features" in docs nav.
- Keyboard-first Warp Drive navigation (j/k, arrows, Enter, Esc) — strong keyboard accessibility.
- "Audible terminal bell" + "Desktop notifications" listed as features — multi-modal accessibility affordances.
- "Text, fonts, & cursor" customization (per docs nav) supports visual accessibility.

### Apple-platform native (inherit platform a11y)

**Things 3** [Source: evidence/things3.md §19]
- No dedicated accessibility statement was found in the fetched URLs.
- Indirect evidence: full keyboard control on Mac, iPad, and Vision (separate iPad shortcuts article exists); Apple-platform native components inherit Apple's accessibility infrastructure (VoiceOver, etc.); Siri voice integration: "How to tell Siri to add a to-do or show a list."
- Multilingual NLP support: "The following languages are currently supported for natural language input: English, German, French, Italian, Spanish, Russian, Chinese, and Japanese."
- Keyboard Language Recall on iPhone/iPad: "If you write one of your to-dos in a different language, Things will now remember and switch the keyboard back to that language when you next edit the to-do."

**Fantastical** [Source: evidence/fantastical.md §19]
- No dedicated accessibility statement found in fetched URLs.
- Indirect signals: 8-language localization for natural language input (English, French, German, Italian, Spanish, European Portuguese, Brazilian Portuguese, Japanese); Light & Dark mode as visual accessibility aid; Apple-platform native components inherit VoiceOver infrastructure; Windows app exists but accessibility claims not documented.

**Amie** [Source: evidence/amie.md §19]
- No dedicated accessibility statement was found in fetched URLs.
- Multilingual support: "We speak 17 languages really well. And 82 more without speaker labeling." (homepage); full list: "english, spanish, french, german, italian, portuguese, dutch, hindi, japanese, chinese, finnish, korean, polish, russian, turkish, ukrainian" + 84 more languages added.
- Preferred meeting language to ensure correct transcription dialect (Settings > Meetings, #123).
- Better language detection: "we often interpreted recording starting with minutes of silence (eg waiting for someone) as korean (haha). it's A LOT more robust now." (#122, May 30, 2025).
- No keyboard-only operation claims; no VoiceOver / screen reader claims found.

**Superhuman** [Source: evidence/superhuman.md §19]
- No dedicated accessibility statement was found in fetched URLs.
- Indirect signals: "GDPR, CCPA, and FERPA compliant" claim for Superhuman Go.
- Autocorrect as an input accessibility aid for users with motor impairments (inferred).
- Keyboard-first design (widely cited) is itself an accessibility feature, though not explicitly documented as such on marketing pages.

**Tana** [Source: evidence/tana.md §19]
- **Not directly accessed.** No a11y statement found on fetched pages.
- Tana's outliner is heavily mouse-driven (drag, hover menus); keyboard support exists but specifics not documented in marketing copy.

---

## 4. Observed Variations

### Variation A: Documentation depth
- **Dedicated a11y page**: VS Code (full page), Warp (docs nav item under "More Features").
- **Bundled a11y with platform**: Apple Intelligence (VoiceOver/Magnifier/Accessibility Reader/Voice Control on apple.com/apple-intelligence/), Microsoft Copilot (Fluent 2 a11y tooling + WCAG 2.1 AA conformance claim).
- **Honest disclosure of gaps**: Craft (non-English keyboard caveat disclosed), Helix (terminal conflicts acknowledged).
- **No documentation**: Arc, Cursor, Manus, Bolt, v0, Superhuman, Fantastical, Amie, Tana, Claude (in-product).

### Variation B: Screen-reader strategy
- **Native a11y tree inherited**: Linear (Electron+Chromium), Notion (React+ARIA), VS Code (Electron), Cursor (inherits VS Code).
- **Native platform VoiceOver**: Raycast (macOS), Craft (macOS/iOS/Vision Pro), Things 3 (Apple platform), Fantastical (Apple platform), Amie (macOS).
- **GPU-rendered, no native tree (in progress)**: Zed (AccessKit integration in progress).
- **Terminal-emulator-dependent**: Helix (no native support).
- **Undocumented**: Arc, Cursor, Manus, Bolt, v0, Superhuman, Amie, Tana.

### Variation C: Keyboard-only operability
- **Keyboard-first by design**: Linear, Raycast, Helix, Warp, VS Code (extensive), Arc (Command Bar), Craft (508-line shortcut doc), Things 3 (11-category Mac shortcuts).
- **Comprehensive but not philosophy-defining**: Notion (slash + @ + [[), Obsidian (Cmd-P), Superhuman (keyboard-first widely cited but not documented).
- **Limited**: Amie (3 documented hotkeys), Tana (heavily mouse-driven), Bolt (only Ctrl+S and Enter documented).

### Variation D: High-contrast / color
- **Native high-contrast toggle**: VS Code, Notion (added Jul 30 2026), Microsoft Learn themes ("Light, Dark, High contrast"), Apple Intelligence (Accessibility Reader).
- **Custom themes allow high contrast**: Raycast (Pro themes), Linear (community themes, not native).
- **Aesthetic themes only, no a11y focus**: Arc (per-Space themes color-blind-unfriendly).
- **Color-mode config for terminals**: Helix (`color-modes`, `true-color`, `undercurl`).

### Variation E: Reduced-motion respect
- **OS-level Reduce Motion respected**: Linear, Raycast, Arc, Notion (all verified by prior use).
- **Documented motion removal**: v0 (removed accordion and versioned-block animations May 15 2026).
- **Motion absent by design**: Helix (terminal TUI).
- **Undocumented**: most others.

### Variation F: Internationalization
- **12+ language localization**: Claude (12 help-center languages), Things 3 (8 NLP languages), Fantastical (8 NLP languages), Amie (17+84 languages), Manus (15+ languages), Apple Intelligence (Live Translation across Messages/FaceTime/Phone/AirPods).
- **Non-English keyboard parity gap disclosed**: Craft (Web app and Windows only available in English), Helix (terminal-dependent).
- **Age/account gating as access barrier**: Gemini (sign-in required, age gating, work/school account feature restrictions).

---

## 5. Premium Exemplars (BEST + WHY — evidence-based)

### BEST: **VS Code** (dedicated a11y page + multi-modal help)

**Why evidence-based**:
- Only product in the evidence set with a **dedicated Accessibility docs page**.
- Screen Reader Mode toggle (`editor.screenReaderAnnounceInlineSuggestion`) — explicit, documented, opt-in.
- Accessibility Help ⌥F1 (Alt+F1 / Shift+Alt+F1) — context-sensitive help menu for editor, terminal, notebook, Chat view, Inline Chat. Multi-surface.
- Zoom persisted in `window.zoomLevel` — fine-decimal support (not just integer steps).
- Keyboard-only navigation with `Tab` traps handled by focus rings — explicit.
- Maps to Shneiderman's 2nd Golden Rule (universal usability) — the most direct product-side realization in the evidence set. [Source: academic/ben-shneiderman.md §4]
- Inherits baseline for VS Code forks (Cursor).

### BEST: **Apple Intelligence** (system-level a11y integration)

**Why evidence-based**:
- Explicitly lists 5 accessibility features on the marketing page: VoiceOver (richer descriptions), Magnifier (zoom + AI Q&A), Accessibility Reader (text cleanup), Voice Control (more flexible), Live Translation.
- Siri voice output: "Pick a voice, then customize expressivity and pace until it clicks for you" — implies adjustable speech rate.
- Foundation Models framework exposes `unsupportedLanguageOrLocale` error for graceful degradation — *programmable* accessibility.
- Apple's platform-native a11y infrastructure is inherited by all Apple-platform products in the set (Things 3, Fantastical, Amie, Craft, Raycast, Arc).
- Maps to Fitts's Law (edge-of-screen Siri glow at screen edge — effectively infinite target width).

### BEST: **Microsoft 365 Copilot / Fluent 2** (design-system-level a11y tooling)

**Why evidence-based**:
- Fluent 2 publishes a11y tooling: "A11y – Focus Order" + "A11y – Color Contrast Checker" — designers can verify a11y in Figma.
- WCAG 2.1 AA conformance claim for Microsoft 365 apps generally.
- Microsoft Learn themes include "Light, Dark, High contrast" — visible in footer of all captured Learn pages.
- Microsoft Responsible AI principles for Copilot Chat.
- AI Disclaimer footer link on Learn pages.
- Maps to Shneiderman's 2nd Golden Rule (universal usability) at the *design-system* level — unique in the evidence set.

### BEST: **Craft** (honest disclosure + multi-modal access)

**Why evidence-based**:
- Ctrl+Return context menu — keyboard-only access to all context actions, alternative to right-clicking (Fitts's-law-relevant: eliminates pointing entirely).
- External keyboard support on iOS/iPadOS.
- Custom shortcuts via macOS System Settings — users with motor differences can remap any menu action.
- **Honest disclosure of gaps**: "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English."
- Apple Vision Pro app — commitment to platform accessibility ecosystems.
- Apple Intelligence integration (on-device AI via Apple Foundation Model).
- Maps to Raskin's universal undo + modelessness — Craft's keyboard remap-ability is a Raskin-style "monotony of invocation" extension.
- **Gap**: no documented WCAG conformance statement.

### BEST: **Warp** (terminal a11y with multi-modal affordances)

**Why evidence-based**:
- Docs site has dedicated Accessibility section ("Accessibility" listed under "More Features" in docs nav).
- "Audible terminal bell" + "Desktop notifications" — multi-modal accessibility affordances (visual + audio + system-notification channels).
- "Text, fonts, & cursor" customization — visual accessibility.
- Keyboard-first Warp Drive navigation (j/k, arrows, Enter, Esc).
- Maps to multi-modal CLT (Mousavi, Low & Sweller 1995 modality effect) — spreading load across phonological loop (audio bell) + visuospatial sketchpad (visual cursor). [Source: academic/cognitive-load-theory.md §5]

---

## 6. Anti-Patterns (FAIL + WHY — evidence-based)

### ANTI-PATTERN: **Arc's absent a11y documentation + color-blind Space differentiation**

**Why evidence-based**:
- "Arc's a11y documentation is essentially absent from publicly accessible sources." [§19]
- "Arc uses color for Spaces (per-Space themes) — color-blind users may struggle to differentiate Spaces by color alone." [§19]
- "No native High Contrast theme (per Arc's design philosophy — themes are aesthetic, not a11y-focused)." [§19]
- VoiceOver claims on macOS but specifics not documented.
- Maps to WCAG SC 1.4.3 Contrast (Minimum) and SC 1.4.11 Non-text Contrast — Arc's per-Space color differentiation may fail WCAG thresholds for color-blind users. [WCAG 2.1 cited in: evidence/vscode.md §19, evidence/notion.md §19]

### ANTI-PATTERN: **Bolt's Safari read-only + WebContainer access barrier**

**Why evidence-based**:
- "Safari read-only limitation in Code view — must use Chrome/Chromium-family browser to edit code. This is an access-barrier for Safari users." [§19]
- "WebContainer supports 'all major browsers, from Chromium-based, to Firefox or Safari TP' (Technology Preview only — i.e., stable Safari is NOT supported for WebContainer itself; only Safari TP)." [§19]
- No documented keyboard shortcut set beyond `Ctrl+S` and `Enter`.
- No VPAT/WCAG statement, no documented screen-reader behavior, no documented high-contrast or reduced-motion mode.
- Maps to WCAG SC 2.1.1 Keyboard — Bolt's keyboard surface is too narrow for keyboard-only users.

### ANTI-PATTERN: **Gemini's account + age gating as access barrier**

**Why evidence-based**:
- "Sign-in required for nearly every feature — a barrier for users without Google accounts." [§19]
- Age gating: "Be 18 or over" for Memory and Deep Research; "13 (or the applicable age in your country) or over" for Gems; "supervised accounts" have reduced feature sets.
- Work/school accounts: many personalization features explicitly unavailable.
- Mobile "Hey Google" unavailable in 11 languages (Bulgarian, Croatian, Estonian, Finnish, Greek, Hebrew, Hungarian, Latvian, Lithuanian, Romanian, Serbian, Slovak, Slovenian, Ukrainian).
- No explicit screen-reader, keyboard-only, or ARIA documentation.
- Maps to Shneiderman's 2nd Golden Rule (universal usability) — Gemini fails the "diverse users" criterion on multiple axes (account, age, region, language).

### ANTI-PATTERN: **Most products' missing VPAT/WCAG conformance reports**

**Why evidence-based**:
- Only Microsoft Copilot explicitly claims "WCAG 2.1 AA" conformance (per-app on Microsoft Learn, not captured).
- VS Code has a dedicated a11y page but no captured VPAT.
- Linear, Notion, Raycast, Arc, Craft, Cursor, Manus, Bolt, v0, Superhuman, Things 3, Fantastical, Amie, Tana, Claude (in-product), Zed — **none publish a VPAT/ACR** in captured evidence.
- Maps to WCAG reporting requirements (VPAT/ACR is the industry-standard conformance disclosure). Without VPAT, enterprise/government procurement cannot verify a11y.

### ANTI-PATTERN: **Helix's terminal-inherited a11y ceiling**

**Why evidence-based**:
- "No native screen-reader support: terminal apps rely on the terminal emulator's accessibility tree (VoiceOver/Terminal on macOS, Orca/xterm on Linux, Narrator/Windows Terminal on Windows). Helix does not expose an accessibility tree of its own." [§19]
- "Only the primary cursor can change shape" due to terminal limitations.
- "Some terminals' default key mappings conflict with Helix's."
- Not strictly an anti-pattern (Helix targets power users), but terminal-inherited a11y excludes screen-reader users entirely from Helix's modal editing model.
- Maps to WCAG SC 4.1.2 Name, Role, Value — terminal apps cannot reliably expose role/value to assistive tech.

### ANTI-PATTERN: **Tana's mouse-driven outliner without keyboard parity**

**Why evidence-based**:
- "Tana's outliner is heavily mouse-driven (drag, hover menus); keyboard support exists but specifics not documented in marketing copy." [§19]
- No a11y statement on fetched pages.
- Maps to WCAG SC 2.1.1 Keyboard — Tana's drag-and-hover-driven outliner may fail "all functionality operable from keyboard."

---

## 7. Cognitive Load Implications

### CLT framework (Sweller 1988)

[Source: academic/cognitive-load-theory.md §4-§5]

- **Intrinsic load (IL)**: users with cognitive differences face higher IL for the same task. CLT's expertise-reversal effect (Kalyuga et al. 2003) means accessibility design must accommodate both novice and expert paths simultaneously.
- **Extraneous load (EL)**: poor a11y increases EL — Bolt's Safari-only limitation forces browser switching; Gemini's account-gating forces authentication friction; Arc's color-only Space differentiation forces memorization; Tana's mouse-only actions force motor-path translation. Each adds EL.
- **Germane load (GL)**: when a11y is high (VS Code's Accessibility Help ⌥F1, Apple's Voice Control), users with cognitive differences can devote more capacity to schema construction rather than basic operation.

### Miller's Law (7±2 / 4±1 modern)

[Source: academic/millers-law.md §4]

- Users with working-memory impairments (ADHD, TBI, age-related decline) face reduced effective chunk capacity below 4±1.
- Apple's Accessibility Reader "cleans up text for easier reading" directly addresses chunk-capacity reduction by externalizing structure. [Source: evidence/apple-intelligence.md §19]
- Microsoft Fluent 2's "A11y – Focus Order" tool helps designers annotate focus/tab order to stay within ≤7 visible interactive elements — respects Miller's Law for cognitively-impaired users.

### Hick's Law (T = a + b·log₂(n+1))

[Source: academic/hicks-law.md §4]

- Users with motor impairments face longer effective decision time per choice (higher `b` slope) due to input-device overhead. Designs that minimize choice count (linear's ⌘K command menu hiding hundreds of commands, Raycast's single-search-box default state) disproportionately benefit motor-impaired users.
- Arc's per-Space color differentiation without text labels violates Hick's Law for color-blind users — color becomes non-discriminable, forcing memorization.

### Expertise reversal + accessibility

[Source: academic/cognitive-load-theory.md §5]

- CLT's expertise-reversal effect: techniques that help novices (large visible buttons, full labels) hurt experts (cluttered, slow). Accessibility design must provide BOTH paths — Shneiderman's 2nd Golden Rule ("explanations for novices and shortcuts for experts") directly addresses this.
- VS Code's Accessibility Help ⌥F1 is opt-in (expert users don't see it; novice screen-reader users invoke it) — correct expertise-reversal design.

---

## 8. Progressive Disclosure Relationship

Accessibility and progressive disclosure are **structurally paired**:

- **Progressive disclosure of a11y features**: VS Code's Accessibility Help ⌥F1 is invoked on demand — novice screen-reader users discover it; expert keyboard users never see it. Maps to Nielsen's progressive disclosure "right split between initial and secondary features" criterion. [Source: academic/progressive-disclosure.md §4]
- **A11y as progressive disclosure failure mode**: Gemini's mode+model+source+app conflation in one text box (§18 of gemini.md) is also an a11y failure — screen-reader users cannot disambiguate which affordance is which when they're collapsed into one input surface.
- **CLT's split-attention effect** (Sweller, Chandler & Tierney 1990) implies a11y help must be co-located with the action — VS Code's context-sensitive Accessibility Help (different content for editor vs. terminal vs. notebook vs. Chat view vs. Inline Chat) is the correct pattern. [Source: academic/cognitive-load-theory.md §5]
- **Springer & Whittaker 2018 (arXiv:1811.02164)** on AI transparency progressive disclosure: "initially simplified feedback that hides potential system errors and assists in building working heuristics > always-on full transparency." Directly applies to a11y for AI surfaces — visually-impaired users benefit from simplified AI feedback, not from full transparency. [Source: academic/progressive-disclosure.md §5]

Cross-ref: see `progressive-disclosure.md` (sibling pattern file in this set).

---

## 9. Accessibility Considerations (cite WCAG + a11y evidence + Fitts's Law)

### WCAG 2.1 Success Criteria most relevant

[WCAG 2.1 cited across: evidence/vscode.md §19, evidence/notion.md §19, evidence/linear.md §19, evidence/raycast.md §19, evidence/arc.md §19, evidence/craft.md §19, evidence/ms-copilot.md §19]

- **SC 1.4.3 Contrast (Minimum)**: Arc's per-Space themes may fail; Linear's mid-contrast default may fail; high-contrast themes (Notion Jul 2026, VS Code, Microsoft Learn) address this.
- **SC 1.4.11 Non-text Contrast**: Arc's color-only Space differentiation may fail.
- **SC 2.1.1 Keyboard**: Bolt (Ctrl+S and Enter only), Tana (mouse-driven outliner) likely fail; Linear, Raycast, Helix, VS Code, Warp, Craft, Things 3 pass.
- **SC 2.3.3 Animation from Interactions**: most products respect `prefers-reduced-motion` (Linear, Raycast, Arc, Notion verified by prior use); v0 explicitly removed animations; Helix has none by design. Bolt, Manus, Claude (in-product) — undocumented.
- **SC 2.4.7 Focus Visible**: Claude marketing pages support `--focus--width` and `--focus--offset-outer` CSS variables; VS Code's focus rings; most others undocumented.
- **SC 3.3.2 Labels or Instructions**: Apple's Accessibility Reader "cleans up text for easier reading"; Microsoft's "A11y – Focus Order" tool annotates labels.
- **SC 4.1.2 Name, Role, Value**: Helix (terminal) cannot reliably expose; Zed (AccessKit in progress) is being built to comply.

### Fitts's Law for tap targets

[Source: academic/fitts-law.md §6, citing Fitts 1954 J Exp Psych 47(6):381-391; ISO 9241-9:2000 / ISO/IEC 9241-411:2014; Apple iOS HIG 44×44pt; Google Material 48×48dp; Microsoft Fluent 32×32px]

- Apple iOS HIG 44×44pt minimum observed in: Things 3, Fantastical, Amie (Apple-platform native).
- Apple's Siri glow at screen edge follows the "edge/corner targets are infinite in effective width" principle — Fitts's Law directly justifies.
- Craft's Ctrl+Return keyboard-only context menu **eliminates pointing entirely** for keyboard users — bypasses Fitts's Law for motor-impaired users.
- Bolt's Quick Action buttons (Implement this plan / Show an example / Refine this idea) appearing after Plan-mode response — Fitts's Law applies; button sizing not documented.
- Linear's single-key shortcuts (C/E/A/L/P/S/#/M/X/Y when issue is selected) similarly bypass pointing — Fitts's Law optimal.

### Aria / screen-reader evidence

- Linear: ARIA live regions announce status changes ("Issue moved to In Progress"). [§19]
- Notion: ARIA patterns present but complex block structures confuse screen readers. [§19]
- Claude (marketing): focus-visible outlines with `--focus--width` and `--focus--offset-outer` CSS variables. [§19]
- Apple: VoiceOver "describes your physical surroundings and onscreen content in richer detail." [§19]
- Microsoft Fluent 2: "A11y – Focus Order" + "A11y – Color Contrast Checker" tooling. [§19]
- Zed: AccessKit integration in progress (GPUI is GPU-rendered — no native accessibility tree). [§19]

### Multi-modal accessibility (CLT modality effect)

[Source: academic/cognitive-load-theory.md §5, citing Mousavi, Low & Sweller 1995]

- Warp: "Audible terminal bell" + "Desktop notifications" + visual cursor — three modalities.
- Apple Intelligence: Live Translation (text + audio), Voice Control (voice input), VoiceOver (audio output), Magnifier (visual + AI Q&A).
- Amie: 17 languages + 84 more without speaker labeling — multi-language modality.
- CLT modality effect: spreading load across phonological loop (audio) + visuospatial sketchpad (visual) reduces EL.

---

## 10. Performance Implications

### A11y as performance feature

- **Linear's keyboard-first design** (single-key + hold-Space) is both an a11y feature AND a perceived-performance feature (no mouse round-trip). Maps to Fitts's Law optimization (zero-distance targets). [Source: evidence/linear.md §14, §20]
- **Raycast's native macOS Swift** + keyboard-first design → "Think in milliseconds" performance AND keyboard-only operability. [Source: evidence/raycast.md §20]
- **Helix's "No Electron. No VimScript. No JavaScript"** → accessibility through low resource usage (works on old/low-end machines) AND performance (Rust + terminal). [Source: evidence/helix.md §15, §19]
- **Zed's GPU rendering at 120fps** + AccessKit integration (in progress) → performance AND future a11y. [Source: evidence/zed.md §15, §19]

### A11y performance cost

- **Screen reader ARIA live regions** (Linear's status announcements) add a small CPU cost per mutation.
- **Notion's complex block structures + ARIA** → screen-reader navigation cost (community feedback cites limitations). [§19]
- **Microsoft Fluent 2's WCAG 2.1 AA conformance** → per-app conformance reports on Microsoft Learn (auth-walled).

### Reduced-motion as performance optimization

- v0's May 15 2026 changelog: "Removed accordion and versioned-block animations in chat" — motion removal is both an a11y improvement (reduced-motion users) AND a performance improvement (fewer reflows).
- v0's Jul 7 2026: "subtle progress line and no loading status pills" — replaced heavier loading state with lighter cue.

---

## 11. Long-Session Impact

### A11y-specific long-session risks

- **Screen-reader fatigue**: long sessions with ARIA live regions (Linear's status announcements every action) may fatigue screen-reader users. Mitigation: collapse older activity log with "Show more" (Linear §23).
- **Keyboard-strain**: keyboard-only users over 1+ hour face RSI risk. Mitigation: Helix's modal editing (reduces hand travel; cited as long-session benefit in evidence/zed.md §23 — "Vim/Helix modes: for power users, modal editing reduces hand travel and mental fatigue over long sessions"); Things 3's full keyboard control.
- **Cognitive load accumulation**: CLT implies EL accumulates over session. Users with cognitive differences may hit overload sooner. Mitigation: VS Code's named Profiles for context switching; Linear's saved views + filters; Warp's session restoration across restarts.
- **Motion fatigue for visually-sensitive users**: Manus's three concurrent live panes (Cloud Browser + Browser Operator + Desktop terminal) may cause motion fatigue. Mitigation: `prefers-reduced-motion` respect (undocumented for Manus).

### A11y-positive long-session design

- **Linear** [§23]: "Engineered for long sessions — the perceived performance does not degrade with usage, unlike Electron apps that leak memory." A11y benefits from consistent performance.
- **Raycast** [§23]: "Architected against session fatigue — because each invocation is short and independent." Each Raycast invocation is a clean slate — cognitively undemanding.
- **Warp** [§23]: Sessions persist across directory changes + SSH remote hosts; "Push local sessions to the cloud to keep steering on the go" — continuity for users who cannot hold state mentally.
- **Manus** [§23]: Pause/resume (Plan Mode) + Scheduled Tasks + Cloud Computer daemon — long-session unattended workflows (a11y-positive for users who need to step away).

### Apple Intelligence — adjustable speech rate for long sessions

- "Pick a voice, then customize expressivity and pace until it clicks for you" — implies adjustable speech rate. Long-session Siri users can slow down cadence to reduce listening fatigue. [§19]

---

## 12. Open Questions (insufficient evidence)

1. **Cross-product VPAT/ACR coverage** — only Microsoft Copilot explicitly claims WCAG 2.1 AA conformance. Most products have no published VPAT. Enterprise/government procurement cannot verify a11y without VPAT.
2. **Zed AccessKit timeline + WCAG conformance target** — work in progress; no published timeline. [Source: evidence/zed.md §19]
3. **Apple Liquid Glass a11y** — HIG Motion page is JS-rendered (52 chars captured); Liquid Glass a11y implications unknown. [Source: evidence/apple-intelligence.md §15, §19]
4. **Microsoft Copilot per-app WCAG conformance reports** — auth-walled; not captured this round. [Source: evidence/ms-copilot.md §19]
5. **Obsidian forum-documented a11y limitations** — forum.obsidian.md hosts extensive discussion but was not fetched. [Source: evidence/obsidian.md §19]
6. **Arc Help Center a11y content** — Cloudflare-blocked from this research. [Source: evidence/arc.md §19]
7. **Claude.ai in-product a11y** — focus-visible CSS variables captured from marketing pages, but no published VPAT or WCAG conformance report for the product UI. [Source: evidence/claude.md §19]
8. **Cursor a11y statements** — none found on cursor.com/docs or cursor.com/blog. [Source: evidence/cursor.md §19]
9. **Bolt screen-reader behavior for chat thread** — not documented. [Source: evidence/bolt.md §19]
10. **Tana keyboard support specifics** — outliner is heavily mouse-driven; keyboard specifics not documented. [Source: evidence/tana.md §19]
11. **Manus Press-and-Hold Mark tool keyboard-equivalent** — may have gap; not documented. [Source: evidence/manus.md §19]
12. **v0 published VPAT/WCAG conformance statement** — not found in cached docs. [Source: evidence/v0.md §19]
13. **Cross-product `prefers-reduced-motion` documentation** — most products respect it but don't document it; no consistent VPAT-style disclosure.
14. **Cross-product non-English keyboard parity** — Craft disclosed gap; Helix disclosed gap; others (Notion, Linear, Raycast, VS Code) — undocumented.
15. **Manus 15+ language support completeness** — nav lists 15+ languages but full localization parity not verified.

---

## 13. Confidence Score

**74 / 100**

Reasoning: Strong primary-source evidence for VS Code (dedicated a11y page, multiple features documented), Apple Intelligence (5 features listed on marketing page), Microsoft Copilot (Fluent 2 a11y tooling, WCAG 2.1 AA claim), Craft (honest disclosure + keyboard-only access + Vision Pro app), Warp (dedicated Accessibility section + multi-modal affordances), Helix (terminal-inherited a11y + honest terminal-conflict disclosure). Moderate evidence for Linear, Notion, Raycast, Claude (marketing pages), Zed (AccessKit in progress), Things 3/Fantastical/Amie (Apple-platform inheritance). Weak evidence for Arc (Cloudflare-blocked), Cursor (no a11y statements), Gemini (partial — account/age/language gating documented, screen-reader/keyboard undocumented), Manus (no VPAT), Bolt (Safari barrier documented, rest undocumented), v0 (motion fixes documented, VPAT absent), Superhuman (no a11y statement), Tana (no a11y statement, mouse-driven). Academic grounding is strong (Shneiderman 2nd + 8th rules, Nielsen #4 + #6, Fitts's Law, Raskin modelessness/undo, Norman Gulf of Evaluation, CLT expertise-reversal + modality effect, Miller 4±1, Hick decision-time). Reduced from 80 due to: (a) most products lack VPAT/ACR; (b) most products' `prefers-reduced-motion` documentation is absent despite respecting the setting; (c) several products' a11y posture is fully undocumented (Arc, Cursor, Manus, Bolt, v0, Tana, Superhuman); (d) Apple Liquid Glass and Microsoft Copilot per-app conformance reports are JS-rendered/auth-walled.
