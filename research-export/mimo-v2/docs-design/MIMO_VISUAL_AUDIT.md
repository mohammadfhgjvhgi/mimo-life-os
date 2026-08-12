# MiMo — Visual Audit (VLM-Powered)

> Brutal honest analysis from VLM + manual inspection. The starting point for the rebuild.

---

## VLM Verdict: "Dashboard, Not an OS"

> "This looks like a ChatGPT clone wrapped in a dark theme, not a revolutionary Personal AI Operating System."

---

## Critical Problems Identified

### 1. The "Generic SaaS" Problem
- **Floating card syndrome**: Input area is a generic rounded rectangle — looks like every SaaS dashboard from 2023
- **No depth**: Background is flat dark — no ambient layering, feels empty rather than minimal
- **Standard icons**: Rail + input icons are generic line-icons, not bespoke OS quality

### 2. Hierarchy & Focal Point Failures
- **Input box too prominent**: Draws eye downward — latest message should be the hero, not the text field
- **Sidebar clutter**: Action buttons next to messages create visual noise
- **Z-index confusion**: Avatars feel on different planes, user message feels like an afterthought

### 3. Typography & Spacing
- **Arabic font**: Uses standard system font — lacks character for a premium Arabic-first OS
- **The "Empty Middle"**: Massive dead zone between conversation and input — disconnect
- **Micro-spacing**: Inconsistent padding in input, gaps between elements uneven

### 4. Specific Unpolished Details
- **Bottom bar**: Status bar breaks the "OS" illusion
- **Color**: Purple accent used generically — doesn't feel integrated
- **RTL**: Text is right-aligned but layout feels "mirrored English" not natively RTL

---

## What Must Change

1. **Kill the borders**: Remove hard borders around input. Use subtle elevation instead
2. **Fill the void**: Connect conversation to input — no dead zone
3. **Integrate the input**: Make input feel part of conversation stream, not a separate module
4. **Reduce chrome**: Hide action buttons until hover. Clean up visual noise
5. **Customize typography**: Better Arabic typesetting, unique AI voice
6. **Make conversation the hero**: Latest message draws the eye, not the input

---

## Implementation Focus

- Conversation fills the viewport (no dead zone)
- Composer is integrated (bottom of conversation stream, not separate)
- No floating card syndrome (use tonal elevation, not borders)
- Action buttons hidden until hover
- Better spacing (no empty middle)
- Premium Arabic typography (IBM Plex Sans Arabic is already loaded — use it well)
