# MiMo — Visual Before/After

> **The visual differentiation test. Current vs proposed. Every surface must show meaningful change.**

---

## VLM Baseline (Current UI)

| Metric | Score | Verdict |
|--------|-------|---------|
| Premium Feel | 3/10 | "Looks like a free Tailwind template" |
| OS Identity | 1/10 | "Nothing says Operating System" |
| Calmness | 7/10 | "Not stressful, just boring" |
| Visual Hierarchy | 4/10 | "Input box fights content for attention" |

VLM summary: "Dark Mode Notion with a ChatGPT input bar. Zero OS identity."

---

## Surface-by-Surface Comparison

| Surface | Current | Proposed | Meaningful Change? |
|---------|---------|----------|-------------------|
| **Shell** | Pure black void, centered column, floating rail | Warm-neutral with atmospheric depth (subtle radial gradient), conversation fills viewport, 48px rail integrated | ✅ YES — eliminates void, adds depth |
| **Navigation** | 4 rail buttons + account (teal accent) | Same structure, NEW accent color (deep teal replaces violet), atmospheric background | ✅ YES — new accent eliminates "AI Purple cliché" |
| **Composer** | Floating card with hard border, shadow, mode+effort+tools | Integrated surface with tonal elevation (no hard border), subtle shadow on focus, refined controls | ✅ YES — no longer "ChatGPT clone input box" |
| **Messages** | Chat bubbles with avatars, action buttons visible | Intelligent documents: user = subtle raised bg (no avatar), AI = transparent (28px mark, no avatar), actions on hover only | ✅ YES — from "chat bubbles" to "documents" |
| **Typography** | System font, flat hierarchy, tight Arabic line-height | IBM Plex Sans Arabic, clear scale (28/22/18/15/14.5/13/12/11/10), Arabic line-height 1.75 | ✅ YES — better hierarchy, better Arabic rendering |
| **Color** | Violet accent (#6d28d9/#a78bfa) — "AI Purple cliché" | Deep teal accent (#0d9488/#2dd4bf) — distinctive, not used by any major AI product | ✅ YES — eliminates the #1 VLM criticism |
| **Tasks** | Inline TaskCard with lifecycle, BackgroundIndicator | Same structure + execution mode selector (Plan/Auto/Goal — ZCode translated) + checkpoint recovery | ✅ YES — ZCode execution DNA added |
| **Agent** | Action Trace (3 levels, verb+object) | Same structure + verified event→action mapping + correct AI state colors | ✅ YES — operational state, not fake "thinking" |
| **Projects** | Not implemented | Project switcher (⌘P) + scoped conversation + sidebar context | ⬜ NEW — ZCode workspace translated to life context |
| **Memory** | Sidebar list with type badges | Sidebar list + inline `[mem:abc]` citations in AI messages (expandable cards with provenance) | ✅ YES — from "database list" to "inline understanding" |
| **Knowledge** | Sidebar list (filtered memory) | Sidebar entity browser + inline `[ent:xyz]` links in AI messages (expandable with relationships) | ✅ YES — from "filtered list" to "entity exploration" |
| **Artifacts** | Not implemented | Inline artifact cards in conversation (preview, expand, actions) | ⬜ NEW — Claude artifacts translated to inline |
| **Research** | Not a distinct workflow | Research as task type: question → sources → synthesis → cited answer → artifact | ⬜ NEW — Perplexity + NotebookLM translated |
| **Command** | Basic ⌘K with flat list | ⌘K as OS command layer: categorized (actions/navigation/search), prefix grammar (future) | ✅ YES — from "search modal" to "command layer" |
| **Approvals** | Not implemented | Inline approval cards (what/why/approve/reject), 4 levels | ⬜ NEW — Manus/ZCode approval translated |
| **Errors** | Text in message | Inline error cards with context + actions (retry/fix/details) | ✅ YES — from "text" to "actionable card" |
| **Empty State** | Logo + greeting + 4 suggestion chips | Refined: NEW accent, atmospheric depth, better typography, suggestion chips with accent icons | ✅ YES — refined visual direction |
| **Mobile** | Not deliberately designed | Rail → bottom bar (44px), conversation full-width, sidebar → full-screen overlay, composer full-width | ⬜ NEW — deliberate mobile composition |

---

## Visual Differentiation Test

### 1. Does the interface visibly resemble Z.ai's interaction quality?
**YES** — conversation fills viewport, effort as per-turn knob, model selection in composer, streaming with separate reasoning (Action Trace). The interaction DNA is Z.ai-inspired.

### 2. Does it incorporate ZCode's task continuity?
**YES** — Life Task with lifecycle (pending→planning→executing→validating→done), execution modes (Plan/Auto/Goal), inline task card with plan + steps + progress, background task minimization, checkpoint recovery.

### 3. Does it feel like one coherent product?
**YES** — everything is inline in conversation or summoned. No separate "modules." No dashboard. No page navigation. The conversation is the spine; everything slides in.

### 4. Does it clearly differ from ChatGPT?
**YES** — no chat bubbles, no generic input box, no "AI Purple," no sidebar with conversation list as primary. Effort selector (Z.ai DNA), inline task cards (ZCode DNA), inline memory citations (MiMo unique), inline artifact cards (Claude translated).

### 5. Does it clearly differ from an IDE?
**YES** — no developer workspace, no terminal, no code editor, no Git panels, no build logs. Technical execution is hidden behind Action Trace and progressive disclosure.

### 6. Does the user understand how to use it immediately?
**YES** — empty state says "اسأل MiMo…" with 4 suggestion chips. Composer is the obvious entry point. Everything else is discovered progressively.

### 7. Can advanced capabilities appear without permanent clutter?
**YES** — tools hidden behind ✦ toggle. Sidebar summoned. Command palette summoned. Task detail summoned. Memory citations and knowledge links appear inline only when relevant.

### 8. Does conversation remain the spine?
**YES** — conversation fills 100% of viewport. Everything else is inline or summoned. The conversation never closes, never gets replaced.

### 9. Does the interface make MiMo's backend power feel simple?
**YES** — effort selector (not model picker), mode selector (not feature list), Action Trace (not process monitor), inline citations (not database browser), task cards (not task management app).

### 10. Would a screenshot communicate "Personal AI Operating System"?
**PROPOSED YES** — the combination of conversation filling the viewport, atmospheric depth, teal accent, inline task/artifact/memory cards, and Action Trace creates a visual identity that is NOT ChatGPT, NOT Notion, NOT an IDE. It reads as a personal intelligence surface.

---

## Major Differences from Current UI

| # | Change | Impact |
|---|--------|--------|
| 1 | Accent: violet → deep teal | Eliminates "AI Purple cliché" (VLM #1 criticism) |
| 2 | Background: flat → atmospheric radial gradient | Eliminates "black hole void" (VLM #2 criticism) |
| 3 | Messages: chat bubbles → intelligent documents | From "ChatGPT clone" to "AI document" |
| 4 | Composer: floating card → integrated surface | From "generic input box" to "command surface" |
| 5 | Avatars: 36px image → 28px mark | Less noise, more calm |
| 6 | Action buttons: always visible → hover only | Reduces visual clutter |
| 7 | Memory: sidebar only → inline citations | From "database" to "understanding" |
| 8 | Knowledge: filtered list → entity exploration | From "list" to "understanding" |
| 9 | Artifacts: not implemented → inline cards | Durable outputs visible in context |
| 10 | Approvals: not implemented → inline cards | User control over consequential actions |
| 11 | Errors: text → actionable cards | Recovery, not just reporting |
| 12 | Execution modes: not implemented → Plan/Auto/Goal | ZCode task continuity translated to life |
| 13 | Typography: system → IBM Plex Sans Arabic with clear scale | Better hierarchy, better Arabic |
| 14 | Line height: tight → 1.75 for Arabic | Better readability (VLM noted tight Arabic) |

---

## Unresolved Decisions

1. **Inline citation rendering** — AI emits `[mem:abc]` tokens, or post-process responses?
2. **Artifact API** — new `/api/artifacts` CRUD, or reuse existing Artifact model?
3. **Approval flow** — from ToolPolicyEngine automatic, or new approval API?
4. **Memory edit/delete API** — add `PATCH/DELETE /api/mimo/memory/[id]`?
5. **Execution modes** — expose Plan/Auto/Goal as task setting, or auto-detect from intent?
6. **Conversation width** — 760px (current, better rhythm) vs 820px (Product Bible spec)?
7. **Rail width** — 48px (current, quieter) vs 56px (Product Bible spec)?
