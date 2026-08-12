# MiMo — Approved Visual Direction

> **The visual system for MiMo's next generation. NOT inherited from previous implementation. Re-evaluated from first principles based on Z.ai research + VLM audit.**

---

## 1. VLM Audit Baseline (Current UI)

VLM ratings on current UI:
- Premium Feel: 3/10
- OS Identity: 1/10
- Calmness: 7/10
- Visual Hierarchy: 4/10

VLM verdict: "Dark Mode Notion with a ChatGPT input bar. Zero OS identity."

### Key Problems Identified
1. Pure black background = "black hole," no depth
2. Centered column = "blog layout," not OS
3. ChatGPT-clone composer = generic
4. Purple accent = "AI Purple cliché" (overused in 2024-2026 AI apps)
5. No "OS flavor" — no spatial environment, no layers, no atmosphere
6. Flat, utilitarian — no bespoke details

---

## 2. Visual Direction Decision

### The Question: Keep warm-neutral + violet, or redesign?

**Analysis:**
- The VLM criticized "AI Purple" as a cliché
- However, the Product Bible explicitly calls for "ONE accent, role-based, auto-flips per theme"
- The existing warm-neutral palette (#fafaf9 / #0c0a09) is actually good — it's NOT pure black (the VLM's criticism was based on the rendered screenshot which appeared darker than the actual token values)
- The problem is NOT the palette — it's the EXECUTION (flat, no depth, no atmosphere)

### Decision: REFINED PALETTE (not replaced)

**Keep**: Warm-neutral base (stone-based, not pure black)
**Keep**: Single accent principle (ONE accent, used sparingly)
**Change**: Accent from violet to a more distinctive hue
**Add**: Layered depth (subtle elevation, not flat)
**Add**: Atmospheric warmth (not a void)

### New Accent: Deep Teal

**Why not violet?** The VLM correctly identified that violet/purple is the most overused color in AI apps (ChatGPT, Midjourney, Poe, etc.). It signals "generic AI wrapper."

**Why teal?**
- Distinctive — no major AI product uses teal as primary
- Calm but technical — not aggressive (red), not clinical (blue), not cliché (purple)
- Warm-neutral pairing — teal + stone creates a sophisticated, grounded palette
- Works in dark and light — deep teal (#0d9488) in light, bright teal (#2dd4bf) in dark
- Semantic — teal is associated with intelligence, depth, and clarity

---

## 3. Typography

### Primary Font
**IBM Plex Sans Arabic** (Arabic) — already loaded, excellent Arabic support

### Secondary
System sans-serif for English text within Arabic content

### Monospace
**JetBrains Mono** — for code blocks (already loaded)

### Scale
| Level | Size | Weight | Use |
|-------|------|--------|-----|
| Display | 28px | 600 | Empty state greeting |
| H1 | 22px | 600 | Major headings in AI responses |
| H2 | 18px | 600 | Section headings |
| H3 | 15px | 600 | Subsection headings |
| Body | 14.5px | 400 | Conversation text, AI responses |
| Body-sm | 13px | 400 | Secondary text, sidebar |
| Caption | 12px | 500 | Controls, buttons, labels |
| Micro | 11px | 500 | Metadata, timestamps, hints |
| Nano | 10px | 600 | Badges, uppercase labels |

### Line Height
- Arabic body: 1.75 (Arabic needs more breathing room — VLM noted tight line-height)
- English body: 1.6
- Headings: 1.3
- Code: 1.7

---

## 4. Color System

### Light Theme

| Token | Value | Use |
|-------|-------|-----|
| `--m-bg` | #fafaf9 | App background (warm neutral — stone-50) |
| `--m-surface` | #ffffff | Surface (cards, composer, sidebar) |
| `--m-raised` | #f5f5f4 | Raised (hover, user messages) |
| `--m-sunken` | #f0efed | Sunken (inputs when focused) |
| `--m-text` | #1c1917 | Primary text (stone-900) |
| `--m-text-2` | #57534e | Secondary text (stone-600) |
| `--m-text-3` | #a8a29e | Muted text (stone-400) |
| `--m-border` | #e7e5e4 | Hairline border (stone-200) |
| `--m-border-2` | #d6d3d1 | Strong border (stone-300) |
| `--m-accent` | #0d9488 | **Deep teal** (teal-600) |
| `--m-accent-soft` | #ccfbf1 | Accent background (teal-50) |
| `--m-accent-fg` | #ffffff | Accent foreground |

### Dark Theme (PRIMARY)

| Token | Value | Use |
|-------|-------|-----|
| `--m-bg` | #0c0a09 | App background (stone-950, warm dark — NOT pure black) |
| `--m-surface` | #161311 | Surface (slightly raised, warm) |
| `--m-raised` | #1c1917 | Raised (hover, user messages) |
| `--m-sunken` | #15120f | Sunken (inputs) |
| `--m-text` | #f5f5f4 | Primary text (stone-100) |
| `--m-text-2` | #a8a29e | Secondary text (stone-400) |
| `--m-text-3` | #57534e | Muted text (stone-600) |
| `--m-border` | #292524 | Hairline (stone-800) |
| `--m-border-2` | #44403c | Strong border (stone-700) |
| `--m-accent` | #2dd4bf | **Bright teal** (teal-400, readable on dark) |
| `--m-accent-soft` | rgba(45,212,191,.10) | Accent background |
| `--m-accent-fg` | #0c0a09 | Accent foreground |

### AI State Colors (semantic, not decorative)

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--m-thinking` | #0d9488 | #2dd4bf | AI reasoning (same as accent — it's the AI's color) |
| `--m-retrieving` | #0891b2 | #22d3ee | Retrieving context (cyan-600/400) |
| `--m-executing` | #ea580c | #fb923c | Executing (orange-600/400) |
| `--m-success` | #16a34a | #4ade80 | Success (green-600/400) |
| `--m-warning` | #d97706 | #fbbf24 | Warning (amber-600/400) |
| `--m-error` | #dc2626 | #f87171 | Error (red-600/400) |

### Atmospheric Depth (NEW — addressing VLM "void" criticism)

To address the "black hole" problem, the dark theme background uses a subtle radial gradient:
```css
background: radial-gradient(ellipse at top, #161311 0%, #0c0a09 50%);
```
This creates a subtle "warmth from above" — like a desk lamp — without being decorative. The gradient is barely perceptible but removes the flat void feeling.

---

## 5. Spacing

4px base grid (Product Bible spec, validated by Linear/Apple convergence):

| Token | Value | Use |
|-------|-------|-----|
| `xs` | 4px | Tight gaps (icon + label) |
| `sm` | 8px | Small gaps (button groups) |
| `md` | 12px | Medium gaps (list items) |
| `lg` | 16px | Large gaps (sections) |
| `xl` | 20px | Extra large (message spacing) |
| `2xl` | 24px | Section padding |
| `3xl` | 32px | Major section breaks |
| `4xl` | 40px | Empty state spacing |
| `5xl` | 48px | Hero spacing |

---

## 6. Radius

| Token | Value | Use |
|-------|-------|-----|
| `r-sm` | 6px | Chips, badges, small buttons |
| `r-md` | 8px | Inputs, medium buttons |
| `r-lg` | 10px | Cards, task cards |
| `r-xl` | 14px | Composer, panels |
| `r-full` | 9999px | Pills, dots |

---

## 7. Borders

- Default: 1px solid `--m-border`
- Strong: 1px solid `--m-border-2`
- Focus: 2px solid `--m-accent` (outline, not border — doesn't shift layout)
- **Principle**: Prefer tonal separation over borders. Use borders only for structural separation.

---

## 8. Shadows

**Reserved for floating layers only.** 90% of UI uses tonal separation.

| Token | Value | Use |
|-------|-------|-----|
| `--m-shadow-sm` | `0 1px 2px rgba(28,25,23,.04), 0 1px 3px rgba(28,25,23,.06)` | Popovers, dropdowns |
| `--m-shadow-md` | `0 4px 12px rgba(28,25,23,.06), 0 2px 4px rgba(28,25,23,.04)` | Modals, command palette |
| `--m-shadow-lg` | `0 12px 32px rgba(28,25,23,.10), 0 4px 12px rgba(28,25,23,.06)` | Full-screen overlays |

Dark theme shadows are deeper:
| Token | Dark Value |
|-------|-----------|
| `--m-shadow-sm` | `0 1px 2px rgba(0,0,0,.3), 0 1px 3px rgba(0,0,0,.2)` |
| `--m-shadow-md` | `0 4px 12px rgba(0,0,0,.4), 0 2px 4px rgba(0,0,0,.3)` |
| `--m-shadow-lg` | `0 12px 32px rgba(0,0,0,.5), 0 4px 12px rgba(0,0,0,.4)` |

---

## 9. Iconography

- **Library**: Lucide React (already installed)
- **Size**: 16px in rail/buttons, 14px inline, 20px in panel headers
- **Color**: Monochrome, inherit text color. Active = accent.
- **Style**: Clean line icons, consistent stroke width (1.5px)
- **Custom**: The "M" logo mark is a solid square with rounded corners, NOT an icon

---

## 10. Motion

### Timing Tiers

| Tier | Duration | Use |
|------|----------|-----|
| instant | 0ms | Summoned surfaces enter (Linear pattern) |
| micro | 120ms | Hover, focus, state toggle |
| short | 200ms | Panel slide, tab switch, sidebar |
| medium | 300ms | Popover, overlay |
| long | 400ms | Modal, full-screen transition (ceiling) |

### Easing

| Curve | Value | Use |
|-------|-------|-----|
| emphasized | `cubic-bezier(0.05, 0.7, 0.1, 1.0)` | Default for expressive motion |
| standard | `cubic-bezier(0.2, 0.0, 0.0, 1.0)` | Generic |

### Asymmetric Timing (Linear differentiator)
- **Enter**: 0ms (instant) — summoned surfaces appear immediately
- **Exit**: 150ms fade-out — dismissals are graceful

### Principles
1. Motion serves orientation + feedback — NOT decoration
2. Never animate content the user is reading
3. State changes: 120ms (fast enough to feel responsive, slow enough to perceive)
4. Reduced motion: `@media (prefers-reduced-motion: reduce)` — all animations become instant

---

## 11. Density

### Calm by Default
- Generous spacing (24px horizontal padding on conversation)
- Single column (760px max — wide enough for readability, narrow enough for focus)
- Minimal visible controls (progressive disclosure)
- No persistent sidebar

### Dense When Summoned
- Sidebar (340px) can be information-dense
- Command palette results are dense (compact rows)
- Task detail panel can show full lifecycle

### Never Overwhelming
- Maximum 7±2 items visible at once in any panel (Miller's Law)
- Rail: 4 buttons + logo (not 7-8)
- Sidebar tabs: 5 (not 8)
- Composer default controls: 3 (mode, effort, send) — tools hidden

---

## 12. Dark Mode (PRIMARY)

Dark mode is the primary theme for MiMo (a personal AI OS used in long sessions, often at night).

### Design
- Warm-neutral background (#0c0a09 — NOT pure black, NOT blue-tinted)
- Subtle radial gradient for atmospheric depth
- Surface separation via tone (not borders/shadows)
- Accent: bright teal (#2dd4bf) — readable on dark
- Text: high contrast (stone-100 primary, stone-400 secondary)

---

## 13. Light Mode

### Design
- Warm-neutral background (#fafaf9 — NOT pure white)
- Surface: pure white (#ffffff)
- Accent: deep teal (#0d9488)
- Text: high contrast (stone-900 primary, stone-600 secondary)
- No shadow spam — hairlines + tonal separation

---

## 14. RTL Strategy

- `direction: rtl` on root
- User messages: right-aligned (RTL "start")
- AI messages: left-aligned (RTL "end")
- Rail: left edge (RTL "start" in physical layout)
- Sidebar: right edge (RTL "end")
- Code blocks: `direction: ltr` (forced — code is always LTR)
- Icons: symmetric (no directional bias)
- Typography: IBM Plex Sans Arabic (designed for RTL, excellent Arabic glyph shaping)
- Line height: 1.75 for Arabic body (more breathing room than Latin)
