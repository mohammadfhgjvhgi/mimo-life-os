# MiMo MASTER RESEARCH MATRIX
### Final closure — honest evidence levels across all products studied.

**Status:** FINAL. No reopening unless a true architectural blocker is found.
**Rule:** "Live UX Evidence = NO" if the product was not directly used. No inflation.

---

## 1. Product Matrix (54 products)

### 1.1 AI Assistants (9)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ChatGPT | Wayback snapshots of openai.com + help.openai.com | HIGH | NO | NO | docs-only | HIGH | MEDIUM (GPTs) | MEDIUM (Canvas — sunset verified) | HIGH (2-layer + Project-scope Aug 2025) | LOW | 74 | Live UX; video; VPAT |
| Claude | anthropic.com/news + engineering blog + support.claude.com | HIGH | NO (region-blocked) | NO | docs-only | HIGH (Projects + Artifacts + Cowork) | MEDIUM (Tools, Computer Use) | HIGH (gVisor sandbox VERIFIED; share URL) | HIGH (persistent memory Sep 2025 VERIFIED) | LOW | 82 | Live UX; region-block |
| Gemini | blog.google + Help Center + deepmind.google | MEDIUM | NO (JS SPA) | NO | docs-only | MEDIUM (Gems, Drive, Connected Apps) | MEDIUM (Deep Research live thoughts) | MEDIUM (Canvas, Deep Research doc) | LOW (search history) | LOW | 70 | Live UX; motion specs |
| GLM (Z.ai) | docs.z.ai (Mintlify) + Turing Post | MEDIUM | NO (JS SPA) | NO | docs-only | LOW (no Projects) | MEDIUM (single-agent search loop, CogAgent) | MEDIUM (slides, frontend) | LOW (context-only) | LOW | 75 | Live UX; consumer chat UI |
| Grok (xAI) | docs.x.ai + llms.txt + Wikipedia | MEDIUM | NO (Cloudflare) | NO | docs-only | LOW | MEDIUM (DeepSearch) | MEDIUM (Imagine image gen) | LOW | LOW | 71 | Live UX; consumer surface |
| Meta AI | ai.meta.com (Wayback) + Wikipedia + meta.ai (partial) | LOW-MEDIUM | NO (Cloudflare) | NO | docs-only | LOW (multi-surface) | LOW | MEDIUM (Imagine) | LOW | LOW | 62 | Live UX; consumer surface |
| Mistral Le Chat / Vibe | mistral.ai + docs.mistral.ai | MEDIUM | NO | NO | docs-only | MEDIUM (3-mode Chat/Work/Code) | LOW | MEDIUM (canvas) | LOW | LOW | 72 | Live UX |
| Microsoft Copilot | learn.microsoft.com + WorkLab | HIGH | NO (auth-wall per-app) | NO | docs-only | HIGH (M365 integration, Semantic Index) | MEDIUM (Copilot Studio) | MEDIUM | MEDIUM (MS Graph) | MEDIUM (Fluent a11y) | 72 | Per-app docs; live UX |
| Apple Intelligence | apple.com + WWDC24 transcripts + Platform Security PDF | HIGH | NO | transcripts only | docs-only | HIGH (3-layer PD, App Intents) | HIGH (PCC architecture) | MEDIUM (Image Playground) | MEDIUM (Apple Memory) | MEDIUM (5 a11y features) | 78 | Live UX; Liquid Glass motion specs |
| DeepSeek | deepseek.com + api-docs + GitHub | MEDIUM | NO (chat SPA) | NO | docs-only | LOW | MEDIUM (R1 exposed chain-of-thought) | LOW | LOW | LOW | 72 | Live UX; chat product UI |

### 1.2 AI Search / Research (3)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Perplexity | docs.perplexity.ai (Mintlify) | HIGH | NO (Cloudflare) | NO | docs-only | MEDIUM (Collections, Threads) | HIGH (Pro Search clarifying Qs) | MEDIUM (Sparkpage) | LOW (Memory) | LOW | 62 | Live UX; UI citations |
| NotebookLM | Google Blog (verbatim) + Help Center | HIGH | NO (JS SPA) | NO | docs-only | HIGH (per-notebook source grounding) | MEDIUM | HIGH (per-claim source-to-quote — GOLD STANDARD) + Audio/Video/Mind Map | MEDIUM (per-notebook) | LOW | 70 | Live UX |
| Genspark | genspark.ai + Wikipedia | LOW-MEDIUM | NO (SPA pricing) | NO | docs-only | LOW | MEDIUM (100+ tools) | MEDIUM (Sparkpage) | LOW | LOW | 58 | Pricing/credit verification; live UX |

### 1.3 AI Agents (9)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Manus | manus.im/docs (Mintlify) + blog + $100M ARR | HIGH | NO | NO | docs-only | HIGH (3-tier execution) | HIGH (live Computer pane, Plan Mode) | MEDIUM (files, scheduled tasks) | LOW (pause/resume) | LOW | 78 | Live UX; arxiv paper (does not exist — confirmed) |
| OpenAI Codex | docs (Wayback) + `codex --help` (INSTALLED) | HIGH | YES (CLI) | NO | HIGH (CLI flags) | HIGH (AGENTS.md, 3×4 modes) | HIGH (OS-level sandbox VERIFIED) | MEDIUM (PRs) | LOW (32KiB AGENTS.md cap) | LOW (--ax-screen-reader flag) | 80 | Live web UI; auto-memory |
| Claude Code | docs.anthropic.com + `claude --help` (INSTALLED) | HIGH | YES (CLI) | NO | HIGH (CLI flags) | HIGH (CLAUDE.md 5-tier, 6 permission modes) | HIGH (subagents, hooks, agent teams) | MEDIUM (commits, diffs) | HIGH (auto memory — UNIQUE) | MEDIUM (--ax-screen-reader) | 85 | Live web UI; local/offline model |
| Devin | docs.devin.ai + cognition.ai/blog | MEDIUM | NO (paid cloud) | NO | docs-only | MEDIUM (teammate model) | MEDIUM (async PR) | MEDIUM (PRs) | LOW | LOW | 82 | Live trial; Matt Duggan primary quote |
| OpenHands | docs.all-hands.dev + GitHub + `pip install` (INSTALLED) | HIGH | YES (install verified) | NO | HIGH (event-stream 12 types) | HIGH (TaskToolSet delegation) | HIGH (Agent Canvas) | MEDIUM | LOW | LOW | 88 | Live UI session |
| Aider | aider.chat/docs + GitHub + `aider --help` (INSTALLED) | HIGH | YES (CLI) | NO | HIGH (/commands, repo-map) | MEDIUM | HIGH (auto-commit + revert) | HIGH (git diffs) | MEDIUM (.aider files) | LOW | 90 | — |
| Dust | dust.tt/blog + docs | HIGH | NO | NO | docs-only | HIGH (triggers, per-agent observability) | HIGH (up to 6 sub-agents, Temporal) | MEDIUM (outputs) | MEDIUM (context) | LOW | 84 | Live UI session |
| AutoGPT | github.com/Significant-Gravitas/AutoGPT + docs.agpt.co | MEDIUM | NO | NO | docs-only | MEDIUM (4-surface split post-pivot) | MEDIUM (cautionary tale — no intervention, loops) | LOW | LOW | LOW | 78 | Original 2023 CLI README (Wayback) |
| LangGraph Studio | langchain docs + GitHub + `langgraph dev --help` (INSTALLED) | HIGH | YES (install verified) | NO | HIGH (time-travel, state-edit) | HIGH (graph traversal, Fork) | HIGH (hot reload, replay-from-node) | MEDIUM (traces) | MEDIUM (checkpointing) | LOW | 82 | Live LangSmith session |

### 1.4 AI Coding / IDE (13)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Cursor | cursor.com/docs (RSC-extracted) + forum | MEDIUM | NO | NO | docs-only | HIGH (Plan Mode, Checkpoints) | HIGH (per-agent model + scope) | HIGH (per-hunk accept/reject) | LOW (no auto-memory; .cursorrules user-authored) | LOW | 60 | Live UX; @Docs removal verification |
| Windsurf | codeium.com (sparse) | LOW | NO | NO | docs-only | MEDIUM (Cascade + Todo) | HIGH (real-time edit awareness — UNIQUE) | MEDIUM (applied edits) | MEDIUM (auto-memory — claimed) | LOW | 50 | Live UX; brand churn (Codeium→Cognition) |
| GitHub Copilot | github.com/features + docs.github.com | MEDIUM | NO | NO | docs-only | HIGH (Spaces, Extensions, @-mention) | MEDIUM (Copilot agents) | MEDIUM (PRs) | LOW | LOW | 68 | Live UX; Spark deprecation verification |
| Copilot Workspace | githubnext.com (archived) + GitHub Blog + Wayback | MEDIUM | NO (sunset) | NO | docs-only | MEDIUM (structured pipeline — failure mode) | LOW | MEDIUM (plan/spec/code) | LOW | LOW | 68 | Don Syme retrospective PRIMARY source NOT located |
| Continue.dev | GitHub issues (verbatim) + README | HIGH | NO | NO | docs-only | MEDIUM (sidebar + inline + Plan sibling) | LOW | LOW (100% overwrites — anti-pattern) | LOW | LOW | 78 | Live UX (repo is read-only / final release) |
| Replit | docs.replit.com (Mintlify) | HIGH | NO | NO | docs-only | HIGH (task board, plan-approval gate) | HIGH (plain-English fix loop) | HIGH (live preview, video replay) | MEDIUM (per-user settings) | LOW | 86 | Live UX |
| v0 | v0.dev/docs + vercel.com/blog | MEDIUM | NO | NO | docs-only | MEDIUM (Preview/Code/Design/History/Fork) | MEDIUM (Firecracker sandbox) | HIGH (Design Mode ACTIVE — corrected) | LOW (Fork) | LOW | 72 | Live UX; credit complaints primary |
| Lovable | lovable.dev/blog + changelog + docs (Mintlify) | HIGH | NO | NO | docs-only | HIGH (Prompt Queue, activity cards) | MEDIUM | HIGH (Visual Edits, Edit History) | HIGH (.lovable/plan.md) | LOW | 78 | Live UX |
| Bolt | bolt.new + support.bolt.new (llms.txt) + webcontainer.io | HIGH | NO | NO | docs-only | MEDIUM (Standard/Max agent choice) | MEDIUM | HIGH (HMR, local-first WebContainer) | LOW (token economy, not credits) | LOW | 75 | Live UX |
| Zed | zed.dev + blog + docs | MEDIUM | NO (no GPU) | NO | docs-only | MEDIUM (editor + multiplayer) | HIGH (Parallel Agents + metrics) | MEDIUM | LOW | LOW | 74 | Live UX (GPU required) |
| VS Code | code.visualstudio.com/docs + Update logs | MEDIUM | NO | NO | docs-only | HIGH (Custom Layout, keybindings DSL) | LOW (Copilot Chat) | MEDIUM (tabs, split) | MEDIUM (settings sync) | HIGH (a11y page + ⌥F1) | 78 | Live UX |
| JetBrains AI | jetbrains.com/ai + help + blog | MEDIUM | NO | NO | docs-only | MEDIUM (multi-agent: Junie/Claude/Codex/Copilot) | MEDIUM (ACP + MCP + Context) | MEDIUM | LOW | MEDIUM | 80 | Live UX |
| Warp | warp.dev/docs + blog | HIGH | NO | NO | docs-only | HIGH (4-product line, AGPL) | HIGH (Warp Drive, Agent Kits) | MEDIUM (blocks) | HIGH (Warp Drive learns patterns) | LOW | 84 | Live UX |
| Helix | helix-editor.com + docs + GitHub (verbatim) | HIGH | NO | NO | docs-only | HIGH (selection-first modal) | NONE | MEDIUM (editor) | MEDIUM (TOML config) | LOW (terminal-inherited) | 86 | Live install |

### 1.5 Knowledge / PKM (11)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Notion | notion.so/help + blog | HIGH | NO | NO | docs-only | HIGH (8 AI surfaces documented) | MEDIUM (Notion Agents) | HIGH (blocks, databases) | MEDIUM (database) | LOW | 80 | Live UX; long-page lag benchmarks |
| Obsidian | obsidian.md + help.obsidian.md | MEDIUM | NO | NO | docs-only | HIGH (vault, Bases, Dataview) | NONE (no first-party AI — deliberate) | HIGH (Canvas, JSON Canvas) | HIGH (file-over-app) | LOW | 72 | Live UX; plugin fragmentation |
| Heptabase | heptabase.com/blog + docs | MEDIUM | NO | NO | docs-only | HIGH (Card/Whiteboard/AI-Chat tri-primitive) | MEDIUM (AI Tutor) | HIGH (cards, whiteboards) | MEDIUM | LOW | 76 | Live UX |
| Tana | tana.inc + blog | MEDIUM | NO | NO | docs-only | HIGH (supertags, AI Agents, command nodes) | HIGH (Meeting agents, MCP) | MEDIUM | MEDIUM | LOW | 70 | "command nodes" docs returned 404 |
| Anytype | anytype.io GitBook + llms.txt | HIGH | NO | NO | docs-only | HIGH (typed-object graph, AnySync CRDT) | NONE | HIGH (objects, sets, queries) | HIGH (E2E + local-first) | MEDIUM | 88 | Live UX |
| Logseq | logseq.com + docs (SPA) | LOW-MEDIUM | NO | NO | docs-only | MEDIUM (outliner + Datalog) | NONE (no native AI) | MEDIUM (blocks) | MEDIUM (local-first) | LOW | 62 | Datalog syntax docs (SPA) |
| Roam Research | GitHub README (roam-tools) | LOW-MEDIUM | NO | NO | docs-only | MEDIUM (block refs) | NONE | MEDIUM (blocks) | MEDIUM | LOW | 68 | Public docs site (none) |
| Reflect | reflect.app + changelog + blog | MEDIUM | NO | NO | docs-only | MEDIUM (backlinks, Reflect Open pivot) | LOW | MEDIUM | HIGH (graph accumulates) | LOW | 80 | Live UX |
| Craft | craft.do + Mintlify docs (170+ pages) | HIGH | NO | NO | docs-only | HIGH (blocks, cards, 508-line shortcuts doc) | LOW | HIGH (blocks, cards) | MEDIUM | MEDIUM | 90 | Live UX |
| Granola | granola.ai + blog + pricing + help | MEDIUM | NO (native app) | NO | docs-only | MEDIUM (Before/During/After) | HIGH (ambient AI — no bot joins calls) | MEDIUM (meeting notes) | MEDIUM (templates) | LOW | 68 | Live UX; pricing JS-rendered |

### 1.6 Productivity / Power User (6)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Linear | linear.app + Linear Method + changelog | HIGH | NO (Cloudflare blog) | NO | docs-only | HIGH (ONE issue list, single-key + hold-Space) | MEDIUM (Linear Agents) | MEDIUM | HIGH (local-cache-render) | LOW | 84 | `--speed-*` motion tokens (Cloudflare-blocked blog) |
| Raycast | raycast.com/docs + blog | MEDIUM | NO | NO | docs-only | HIGH (Quick AI ⌘⇧Tab, Hyper key, extensions) | MEDIUM (AI command) | MEDIUM (quicklinks) | MEDIUM | LOW | 72 | 3 SPA docs; live UX |
| Superhuman | superhuman.com + help (Cloudflare-blocked) | LOW-MEDIUM | NO | NO | docs-only | HIGH (keyboard-first, Auto Labels/Reply) | HIGH (Auto Drafts 2.0, Agent Store, Agents SDK) | MEDIUM (emails) | HIGH (Zero Day Retention) | LOW | 75 | Shortcuts URL 404; live UX |
| Things 3 | culturedcode.com + blog | MEDIUM | NO | NO | docs-only | HIGH (Today/Upcoming/Anytime/Someday, Type Travel) | LOW (Apple Intelligence Writing Tools opt-in) | MEDIUM (tasks) | MEDIUM (Things Cloud Swift) | LOW | 82 | Live UX |
| Amie | amie.so + blog + docs | MEDIUM | NO | NO | docs-only | HIGH (calendar+todos+meeting notes+email unified) | HIGH (AI Scheduling, MCP server) | MEDIUM | MEDIUM | LOW | 78 | Sparse shortcuts docs |
| Fantastical | flexibits.com | LOW-MEDIUM | NO | NO | docs-only | HIGH (natural language parser 8 languages, Calendar Sets) | NONE (no first-party AI chat) | MEDIUM (events) | MEDIUM | LOW | 70 | Support URL 404; no API/SDK/MCP |

### 1.7 Browser / System UX (3)

| Product | Official Sources | Documentation | Live UX Evidence | Video/Demo | Interaction Evidence | IA Evidence | Agent Evidence | Artifact Evidence | Memory Evidence | A11y Evidence | Confidence | Missing |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Arc / Dia | arc.net (sparse, sunsetting to Dia) | LOW | NO | NO | docs-only | MEDIUM (Spaces, Pinned/Today, per-Space accent) | LOW (Arc Max — shallow) | MEDIUM (tabs) | LOW | LOW | 58 | Help URLs 404; Dia successor; sunset confusion |
| Apple Intelligence | (covered above) | HIGH | NO | transcripts | docs-only | HIGH | HIGH | MEDIUM | MEDIUM | MEDIUM | 78 | Live UX; Liquid Glass motion |
| Microsoft Copilot | (covered above) | HIGH | NO (auth-wall) | NO | docs-only | HIGH | MEDIUM | MEDIUM | MEDIUM | MEDIUM | 72 | Per-app docs; live UX |

### 1.8 Design Systems (covered in research-group-E.md + research-group-I.md, not separate evidence files)

| System | Official Sources | Documentation | Confidence |
|---|---|---|---|
| Apple HIG | developer.apple.com + WWDC transcripts | HIGH | 65 (Liquid Glass JS-rendered) |
| Material 3 | material.io + blog | HIGH | 65 (M3 Expressive in flux) |
| Fluent 2 | fluent2.microsoft.design | MEDIUM | 60 (auth-wall on some) |
| GitHub Primer | primer.style + MCP server | HIGH | 75 (motion MUST/SHOULD/NEVER documented) |
| Vercel Geist | geist-ui + DESIGN.md | HIGH | 70 (restraint philosophy documented) |
| Figma | figma.com + Motion MCP | MEDIUM | 60 |
| Linear design/motion | linear.app (Cloudflare-blocked blog) | LOW-MEDIUM | 50 (`--speed-*` tokens NOT directly accessed) |

---

## 2. Academic Foundations Matrix (16 topics)

| Topic | Primary Source | Confidence | Application Strength |
|---|---|---|---|
| Jakob Nielsen (10 heuristics) | nngroup.com | 88 | HIGH — grounds visibility, error recovery, minimalist design |
| Don Norman (DoET) | jnd.org + Wikipedia | 85 | HIGH — mental models, gulfs of execution/evaluation |
| Ben Shneiderman (8 Golden Rules) | UMD primary (verbatim) | 95 | HIGH — easy reversal, dialog closure, internal control |
| Alan Cooper (About Face) | Wikipedia stub (book not accessed) | 78 | MEDIUM — persona/goal-directed (book out of print) |
| Jef Raskin (Humane Interface) | Wikipedia (book not accessed) | 82 | MEDIUM — quasimodes (hold-Space), no dialogs |
| Fitts's Law | Wikipedia + 1954/1978/1992 primary | 92 | HIGH — grounds 44px tap targets |
| Hick's Law | Wikipedia + 1952/1953 primary | 88 | HIGH — grounds one-palette, no multi-axis choice |
| Miller's Law (7±2) | Wikipedia + Cowan 2001 critique | 90 | HIGH — grounds ≤8 rail icons (but Cowan's 4±1 challenges upper bound) |
| Cognitive Load Theory | Wikipedia 56KB + 2026 arXiv | 92 | HIGH — grounds one-model-per-dimension |
| Progressive Disclosure | NN/g 2006 + Springer & Whittaker 2018 arXiv | 95 | HIGH — grounds 3-layer PD (Apple/MS) |
| Recognition vs Recall | Nielsen + Mandler 1980 | 94 | HIGH — grounds command palette, slash menus |
| Information Scent | Pirolli & Card 1999 (paywalled) | 88 | MEDIUM — grounds search result previews |
| Direct Manipulation | Shneiderman 1983 + Hutchins 1985 | 87 | MEDIUM — grounds canvas-per-mode, per-hunk accept/reject |
| Human-AI Interaction | Amershi 2019 + 4× 2026 arXiv | 90 | HIGH — 18 guidelines incl. error recovery, autonomy scaling |
| Explainable AI (XAI) | Wikipedia 65KB + 6× 2026 arXiv | 92 | HIGH — grounds inline citations, exposed reasoning |
| Trust in AI | 5+ 2026 arXiv empirical + Lee & See 2004 | 95 | HIGH — grounds architectural trust + calibrated trust |

**Academic average: 83.2/100**

---

## 3. UX Pattern Synthesis Matrix (16 patterns)

| Pattern | Evidence Breadth | Academic Grounding | Confidence |
|---|---|---|---|
| Conversation UX | 15+ products | CLT, PD, Recognition/Recall | 82 |
| Workspace UX | 12+ products | CLT, Direct Manipulation | 80 |
| Sidebar UX | 10+ products | CLT, Miller, Hick | 78 |
| Tabs UX | 10+ products | CLT, Direct Manipulation | 79 |
| Search UX | 15+ products | Information Scent, Hick | 78 |
| Command Palette | 7+ products | Hick, Recognition/Recall, Fitts | 82 |
| Execution UX | 11+ products | Visibility (Nielsen), Direct Manipulation | 84 |
| Agent UX | 11+ products | Amershi, XAI, Trust | 86 |
| Artifacts UX | 13+ products | Direct Manipulation | 78 |
| Knowledge UX | 11+ products | Information Scent, XAI | 82 |
| Memory UX | 10+ products | CLT, Recognition/Recall | 80 |
| Navigation UX | 13+ products | Information Scent, Recognition/Recall | 79 |
| Motion UX | 12+ products | Nielsen PD, Shneiderman feedback | 78 |
| Accessibility | 10+ products | Fitts, WCAG, reduced-motion | 74 |
| Keyboard UX | 10+ products | Fitts, Hick, Raskin quasimodes | 82 |
| Progressive Disclosure | 10+ products | NN/g, Springer & Whittaker 2018 | 84 |

**Pattern average: 79.1/100**

---

## 4. Aggregate Honest Numbers

| Metric | Count | Confidence |
|---|---|---|
| Products researched | 54 | avg 75.6 |
| Academic topics | 16 | avg 83.2 |
| Pattern syntheses | 16 | avg 79.1 |
| **Total files** | **86 evidence + academic + pattern** | **Overall ~78** |
| **Total lines** | **~25,719** | |
| Products actually installed/used | 5 (Aider, Claude Code, Codex, OpenHands, LangGraph) | — |
| Products with live UX observation | 0 (full) + 5 (CLI --help) | — |
| Products Cloudflare/auth-gated | 45 | — |

---

## 5. Evidence Quality Distribution (A/B/C/D)

| Grade | Products | Notes |
|---|---|---|
| **A (official docs + direct observation)** | Aider, Claude Code, Codex, OpenHands, LangGraph (5 — CLI installs) | Strongest |
| **A (official docs + engineering blog, no live UX)** | Claude, Manus, Apple Intelligence, MS Copilot, Linear, Cursor, Replit, Lovable, Bolt, Anytype, Craft, OpenHands, Warp, Helix, Dust, Devin (16) | Strong docs, no live UX |
| **B (official blog + changelog + help)** | ChatGPT, Gemini, GLM, Notion, Obsidian, Heptabase, Tana, Zed, VS Code, Raycast, Things 3, Amie, Superhuman, JetBrains AI, Granola, v0, Copilot Workspace, DeepSeek (18) | Good but secondary |
| **C (mixed official + secondary)** | Perplexity, NotebookLM, Genspark, Grok, Meta AI, Le Chat, Sweep, Continue, Reflect, Roam, Logseq, Fantastical, Arc, Windsurf (14) | Weakest |
| **D (community/anecdotal only)** | None — no architectural decision rests on D-grade alone | — |

**No architectural decision in the Evidence Map rests on D-grade evidence alone.** This is the rule and it is satisfied.
