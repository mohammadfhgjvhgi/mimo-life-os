# Pattern: Progressive Disclosure

> Task PAT-4 — Evidence-Based Pattern Synthesis. Phase R2. NO MiMo design. Synthesis of evidence from existing product research files. Every claim cited.

---

## 1. Pattern Definition

**Progressive Disclosure** is the interaction-design pattern of deferring advanced or rarely-used features to a secondary screen, sheet, or menu — making applications easier to learn and less error-prone by showing users only the most important options initially, then disclosing specialized options upon user request. The pattern was seminally articulated by **Kristina Hooper Woolsey** (Apple Human Interface Group, 1985) and codified by **Jakob Nielsen** (Nielsen Norman Group, 2006) [Source: academic/progressive-disclosure.md §1, citing https://www.nngroup.com/articles/progressive-disclosure/ + Norman & Draper 1986 *User Centered System Design* ISBN 0-89859-781-1].

The pattern decomposes into five operational forms observed across the evidence set:

1. **Layered disclosure** (Nielsen 2006): tooltips → modal → secondary screen. Used by Apple Intelligence (Layer 1 interface / Layer 2 output / Layer 3 depth), Microsoft Copilot (Interface/Output/Depth), Claude (memory silent by default → Settings > Memory; profile/project/skills layered; Agent Skills 3-level).
2. **Staged disclosure** (wizard pattern): one screen per step. Used by v0 (Getting Started → Prompt → Iterate → Integrate → Ship → Manage → Guides docs funnel), Cursor (Cmd-K → Cmd-L → Cmd-I → Plan Mode → Cloud Agents layered AI reveal).
3. **Inline expansion** ("Show more" affordances): Used by Linear (activity log "Show more"), Warp Drive (collapsible sections), Superhuman (1-line summary → expandable detail), Things 3 (closed to-do → open "clear white piece of paper").
4. **Disclosure widget / triangle-twist** (GTK Disclosure): macOS "Show Details" pattern. Used by Obsidian (foldable bullets), Notion (toggle blocks), Tana (outliner indentation as PD), Craft (slash menu).
5. **Token-budget-aware progressive disclosure** (AI-specific): Manus Skills 3-level (Metadata ~100 tokens/Skill at startup → Instructions <5k tokens when triggered → Resources on demand), Claude Agent Skills 3-level (name+description at startup → SKILL.md body → bundled files).

The **negative space** is also part of the pattern: Gemini's mode+model+source+app conflation in one text box is a *progressive disclosure failure* — one box serving 4 orthogonal modes means the disclosure event cannot be unambiguously signaled. Tana's mouse-driven outliner exposes keyboard-only PD gaps. Bolt's sparse surface underdiscloses capability.

---

## 2. Why It Matters

### Academic evidence (HCI laws/principles)

- **Nielsen (2006) Progressive Disclosure canonical article** — three usability criteria:
  1. Right split between initial and secondary features (initial = frequent; secondary = rare).
  2. Focus — initial list small enough to focus attention on truly important items.
  3. Discoverability — obvious how to progress from primary to secondary disclosure level.
  [Source: academic/progressive-disclosure.md §4, citing https://www.nngroup.com/articles/progressive-disclosure/]
- **Nielsen's empirical claim**: progressive disclosure improves 3 of usability's 5 components — learnability, efficiency of use, and error rate — and the concern that users build a "limiting mental model" is empirically groundless. [Source: academic/progressive-disclosure.md §4]
- **Cognitive Load Theory (Sweller 1988)** — progressive disclosure reduces **intrinsic load** by segmenting element interactivity, and reduces **extraneous load** by avoiding the "wall of options" presentation pattern. CLT split-attention effect (Sweller, Chandler & Tierney 1990) implies disclosure controls must be co-located with the action they reveal. [Source: academic/cognitive-load-theory.md §4-§6, citing Sweller 1988 Cognitive Science 12(2):257-285]
- **Miller's Law (7±2 / 4±1 modern Cowan 2001)** — initial surface should expose ≤7 items (≤5 per Hick's law if possible). Initial list larger than 7±2 violates working-memory span. [Source: academic/millers-law.md §4 and §10, citing Miller 1956 Psych Rev 63(2):81-97]
- **Hick's Law (T = a + b·log₂(n+1))** — decision time grows logarithmically with choice count. Initial surface should expose ≤5 primary choices for fast selection. [Source: academic/hicks-law.md §4 and §10, citing Hick 1952 Quarterly J Exp Psych 4(1):11-26]
- **Springer & Whittaker (2018, arXiv:1811.02164)** — empirical validation for AI transparency: "initially simplified feedback that hides potential system errors and assists in building working heuristics > always-on full transparency." Incremental (continuous) transparency feedback is *distracting* and undermines simple heuristics. [Source: academic/progressive-disclosure.md §5 and §7, citing https://arxiv.org/abs/1811.02164]
- **arXiv:2605.10930** (2026, false trust engendered by LLM explanations) — PD must not become "opacity theatre"; users must be able to drill down to verify. [Source: academic/progressive-disclosure.md §7, citing https://arxiv.org/abs/2605.10930]
- **arXiv:2607.19941** (2026 MuC '26 framework for human-AI agent UX) — lists progressive disclosure of agent reasoning as a core principle. [Source: academic/progressive-disclosure.md §7, citing https://arxiv.org/abs/2607.19941]
- **Recognition rather than recall (Nielsen Heuristic #6)** — progressive disclosure surfaces options (recognition) rather than requiring users to recall feature names. Slash menus (`/`) and command palettes (⌘K) are PD operationalizations of recognition. [Source: academic/recognition-vs-recall.md §3 and §6]
- **Norman's Gulf of Evaluation** — PD reduces the gulf by making state visible at the right level of detail (simplified first, drill-down on demand). [Source: academic/don-norman.md §4 and §10]
- **Shneiderman's 8th Golden Rule "Reduce short-term memory load"** — directly cited "seven plus or minus two chunks"; PD operationalizes chunking by separating initial surface from drill-down. [Source: academic/ben-shneiderman.md §4, citing https://www.cs.umd.edu/~ben/goldenrules.html]
- **Carroll & Rosson (1984–1987) "minimalist documentation"** — overlapping concept: learners prefer minimal initial instruction with progressive disclosure on demand. [Source: academic/progressive-disclosure.md §5]

### Mechanistic claim

Progressive disclosure matters because:
1. It reduces intrinsic cognitive load by segmenting element interactivity — only the currently-relevant subset of features is visible. [CLT]
2. It reduces extraneous load by avoiding search-for-relevant-info in a "wall of options." [CLT]
3. It respects working-memory capacity (≤4±1 chunks modern) by chunking the initial surface. [Miller's Law]
4. It accelerates decision time by minimizing choice count on the initial surface. [Hick's Law]
5. For AI surfaces specifically, it preserves the LLM context window by loading only the currently-needed skill metadata first, then full instructions, then resources. [Manus Skills 3-level + Claude Agent Skills 3-level]

---

## 3. Evidence Across Products

### Tier-1 (deepest documented progressive disclosure)

**Apple Intelligence (3-Layer Model — DEEP)** [Source: evidence/apple-intelligence.md §18]
- **Layer 1 — Interface surface (always visible, ambient):** Siri glow at edge of screen; Writing Tools entry in text context menu; Smart Suggestions in Mail/Messages; Summaries auto-rendered in Mail list view; Genmoji entry in emoji keyboard. Surfaces where the user is **invited** to engage with AI but can ignore it.
- **Layer 2 — Output surface (invoked, ephemeral):** Writing Tools sheet appears with Rewrite/Proofread/Summarize options; Siri sheet appears with input field + voice waveform; Image Playground sheet appears with style picker + swatches; Visual Intelligence overlay appears on screenshot. Surfaces where AI is **actively producing** output.
- **Layer 3 — Depth surface (drill-in, persistent):** Siri app conversation history (pin conversations); Foundation Models session transcript (developer-facing); Photos Clean Up shows before/after state with undo; Notes audio recording summary is stored as a typed block above the recording. Surfaces where the user **reviews and revises** AI output.
- Evidence for Layer 1: "Siri will be able to access text displayed in any app that uses our standard text systems" + auto-summarization in Mail/Messages/Notes. [WWDC24 Session 102]
- Evidence for Layer 2: Image Playground sheet, Writing Tools sheet, Visual Intelligence overlay. [https://www.apple.com/apple-intelligence/]
- Evidence for Layer 3: Siri app "brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad. You can also pin conversations for easy access." Foundation Models session transcript persistence. [WWDC25 Session 301]
- **Evidence gap**: Apple does not officially document this as a 3-layer model — researcher's evidence-grounded interpretation.

**Microsoft 365 Copilot (Interface/Output/Depth)** [Source: evidence/ms-copilot.md §18]
- **Layer 1 — Interface surface (always visible, ambient):** Copilot button in Word/Excel/PowerPoint/Outlook ribbon; Copilot pane collapsed by default in Teams; Suggested prompts visible at top of Copilot Chat; Copilot Search tab in Microsoft 365 Copilot app; in-product license labels (Premium/Basic/Chat Basic) in app UI.
- **Layer 2 — Output surface (invoked, ephemeral):** Copilot pane slides open with input field + recent prompts; Copilot Chat conversation in side panel; drafted text in Word appears inline (with rewrite/suggest alternatives); Copilot Answer card at top of search results page; Copilot Pages (new page output from chat).
- **Layer 3 — Depth surface (drill-in, persistent):** Copilot chat history (reviewable, deletable); Copilot Notebooks (organized collections of chats, files, notes); Copilot Cowork (long-running delegated tasks); Copilot Search → Chat handoff (search returns summary, user can continue in chat for depth); Agent conversations and their state; Copilot Interaction Export API (programmatic access to prompts/responses for governance).
- Evidence Layer 1: Copilot button as default entry point; in-product license labels. [learn-m365-overview.txt]
- Evidence Layer 2: Copilot pane slide-in; Copilot Answer card at top of search results. [page-67c10ae681c2.txt]
- Evidence Layer 3: "interaction is stored in the user's Copilot chat history. Users can review and reuse their previous prompts. They can also delete their chat history." [learn-architecture.txt]; Copilot Notebooks: "Bring together your Copilot chats, files, meeting notes, and project materials—then build on it." [page-9e03f8742741.txt]; Copilot Cowork: "Securely hand off complex tasks and keep multiple projects moving at once." [same]
- **Evidence gap**: Microsoft does not officially document this as a 3-layer model.

**Claude (multi-surface PD with 3-level Agent Skills)** [Source: evidence/claude.md §18]
- **Memory**: by default, Claude reads/writes memory silently; user sees entries only when navigating to `Settings > Memory`. Citations to past chats appear inline only when Claude references them.
- **Project instructions vs. profile instructions vs. skills**: layered — profile instructions apply globally; project instructions apply only within the project; skills add specific behaviors on demand.
- **Agent Skills 3-level (explicit)**: "At startup, the agent pre-loads the name and description of every installed skill into its system prompt. This metadata is the first level of progressive disclosure: it provides just enough information for Claude to know when each skill should be used without loading all of it into context. The actual body of this file is the second level of detail." Additional bundled files are a "third level (and beyond) of detail, which Claude can choose to navigate and discover only as needed" [https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills]
- **Artifacts**: content >15 lines that is "likely to want to edit, iterate on, or reuse" is hoisted into a side panel rather than left inline; multiple versions are hidden behind a version selector.
- **Beta / research preview labels**: features explicitly tagged by maturity so users know which features are still evolving.

**Manus (Skills Progressive Disclosure — explicitly named)** [Source: evidence/manus.md §18]
- **Skills Progressive Disclosure (explicitly named in Manus docs)**: "Skills are designed to be highly efficient by using a 'Progressive Disclosure' mechanism. This ensures that the agent only loads the information it needs, when it needs it, preserving the valuable context window."
  - Level 1: Metadata (name + description) — loaded at startup — ~100 tokens/Skill
  - Level 2: Instructions (SKILL.md content) — loaded when triggered via slash command — <5k tokens
  - Level 3: Resources (scripts, reference files) — loaded on demand when referenced — consumed only when used [https://manus.im/docs/features/skills]
- **Three execution environments** (Sandbox / Desktop / Cloud Computer) progressively disclosed by task type.
- **Plan Mode is opt-in / manual**: "Plan Mode is manual. It stays out of your way until you call it."
- **Approval gates as progressive disclosure of autonomy**: Allow Once vs Always Allow; one-time browser authorization; Take Over for MFA.
- **Project configuration propagation is itself progressive**: instruction updates apply next message, file updates apply next task.
- **Mobile-only features**: Design View Mark tool's press-and-hold is mobile-first.

### Tier-2 (strong PD documentation)

**Linear** [Source: evidence/linear.md §18]
- **Highly disciplined** about progressive disclosure:
  - **Command menu hides hundreds of commands** — only invoked via ⌘K.
  - **Issue properties**: 8+ properties, but each is collapsed until you hover/click to expand.
  - **Sub-issues**: nested but visually compact.
  - **Project detail**: collapsed sections for "Goals", "Scope", "Status updates" — click to expand.
  - **Sidebar**: collapsible sections (Teams, Favorites, etc.) — keep the sidebar uncluttered.
  - **Settings**: nested tree of settings categories.
  - **Filter UI**: simple "Add filter" pill → opens filter builder.
- Aligns with the Method principle "Simple first, then powerful" — Linear is usable on day 1 with minimal cognitive load, then reveals depth as the user needs it.
- [§23]: Activity log collapses older events with "Show more."

**VS Code** [Source: evidence/vscode.md §18]
- **Textbook case of progressive disclosure**:
  - **Hide-on-demand**: Side Bar (⌘B), Panel (⌘J), Activity Bar (View → Appearance → Show Activity Bar), Status Bar, Tabs (all individually togglable).
  - **Custom Layout (1.84+)**: every panel can be hidden, moved, or reordered. [https://code.visualstudio.com/docs/configure/custom-layout]
  - **Zen Mode** (⌘K Z): hides everything except editor — full-screen focus mode.
  - **Sidebar condensation**: Views can collapse into Activity Bar items (e.g., when Explorer is collapsed, the icon stays).
  - **Command palette as discovery**: Thousands of commands are hidden until you open the palette — power users discover features progressively.
- **Dense by default** compared to Notion/Linear — VS Code shows multiple panels simultaneously because developer productivity requires simultaneous terminal + editor + problems view. Deliberate tradeoff.

**Raycast** [Source: evidence/raycast.md §18]
- **Already minimal** — the default state is just a search box. Progressive disclosure happens via:
  - **Actions menu** (⌘+K) — secondary actions hidden until invoked.
  - **Detail view** — pressing ⌘+Enter opens a detail panel for the selected item (description, metadata, actions).
  - **Settings panes** — every command has its own settings accessible via ⌘+,.
  - **AI Chat hidden controls** — system instructions, attach, model picker are collapsed by default.
  - **Hover-to-reveal** — keyboard shortcuts shown on hover in result rows.
- Philosophy: "show only what's needed right now, hide everything else one keystroke away."

**Helix (mode-based PD)** [Source: evidence/helix.md §18]
- **Mode-based and minor-mode-based**:
  - **Three primary modes** (Normal/Insert/Select) — only one is active at a time, the others are hidden until entered.
  - **Six minor modes** (View/Goto/Match/Window/Space/Unimpaired) — transient, activated by a single prefix key, with a small documented table of available commands.
  - **Command palette** (`Space ?`) — discoverable through the Space mode table itself, not as a top-level surface. Key disclosure pattern: the command palette is hidden behind `Space ?` rather than being a top-level Cmd+Shift+P shortcut.
  - **Pickers** (file/buffer/symbol/diagnostics/jumplist) — each is a separate picker, all accessible from Space mode, with consistent picker keybindings (Shift-Tab/Tab/Ctrl-p/Ctrl-n to navigate, Ctrl-s/Ctrl-v to open split, Ctrl-t to toggle preview, Escape to close).
  - **Popups** for hover docs, completion, signature help — appear contextually and disappear on Escape.
- **`auto-info = true` setting** (default) controls whether Helix displays "info boxes" — contextual hints that progressively disclose command availability.

**Obsidian** [Source: evidence/obsidian.md §18]
- **Canvas**: pan/zoom (Ctrl/Cmd+scroll, Space+scroll, "Zoom to fit all cards", "Zoom to selection"). Groups can be nested.
- **Settings**: "Settings window now closes when pressing `Escape`." "Tab and Shift-Tab now move focus to the next focusable element instead of staying locked to the current row, making it easier to navigate to links." [changelog/2026-08-05-desktop-v1.13.5]
- **Mobile**: "Press-and-hold to resize splits and pinned sidebars." [changelog/2026-07-30-mobile-v1.13.4]
- Foldable bullets (outliner pattern) — standard PD.

**Craft** [Source: evidence/craft.md §18]
- **Slash menu** (`/`) — on-demand access to almost any feature: "Start with the slash command: Type / to access almost any feature without leaving your keyboard. This is often faster than remembering individual shortcuts."
- **Focus Mode** (`Cmd + .`) — hides sidebar and chrome for distraction-free writing.
- **Quick Open** — surfaces documents/views on demand.
- **Three-dot menu** for context actions — accessed via `Ctrl + Return`.
- **Cardgroup / Card components** in docs — Mintlify-rendered progressive disclosure.
- **Callouts/Info/Warning boxes** in docs.
- **Craft 101 video tutorial series** for new-user onboarding.
- **Help Agent** for in-product progressive disclosure of features.
- **Assistant Explore mode** for AI-proposed changes (reviewable before applying).
- **Strongest progressive-disclosure model in the evidence set**, covering both user onboarding (videos, Help Agent) and AI-proposed changes (Explore mode).

**Tana** [Source: evidence/tana.md §18]
- **Outliner indentation** = native progressive disclosure (Tab/Shift-Tab to nest/unnest). Cross-ref Logseq blog: "every bullet is already a node."
- **Zoom-in**: Tana supports zooming into a node (focus mode) — standard outliner feature; deep docs 404'd.
- **Views** allow projecting the same nodes different ways — progressive disclosure by changing representation. [https://tana.inc/views]
- **Search nodes** as saved queries that surface only matching items — progressive disclosure by filter. [https://tana.inc/search-nodes]

### Tier-3 (PD present, less central)

**Arc** [Source: evidence/arc.md §18]
- **Sidebar auto-collapses** to icon-only mode when window is narrow.
- **Sidebar fully hides** (Cmd+S) for distraction-free browsing.
- **URL bar hides** until Cmd+L is pressed.
- **Command Bar** is hidden until Cmd+T.
- **Boosts editor** is hidden until invoked per-site.
- **Tab context menu** (right-click) reveals site-specific actions.
- **Space switcher** is implicit — Cmd+1/2/3 switches; no visible switcher UI.
- **Today tabs auto-archive** after a delay (default 12 hours) — keeping the sidebar manageable.
- Aligns with Arc's "Clean and calm" principle — the user sees only what's needed right now.

**Cursor** [Source: evidence/cursor.md §18]
- **Layered reveal**: User starts with Cmd-K (simplest). Cmd-L chat is one level up. Cmd-I Composer is multi-file. Plan Mode is full-agent. Cloud Agents are remote autonomous. [forum.cursor.com/t/understanding-cursors-ai-feature/7204 + cursor.com/blog/plan-mode]
- **Rules system is opt-in**: "Start simple. Add rules only when you notice Agent making the same mistake repeatedly." [cursor.com/docs/rules RSC payload]
- **Visual editor sidebar reveals**: drag-and-drop → props panel → color pickers → point-and-prompt. [cursor.com/blog/browser-visual-editor]

**v0** [Source: evidence/v0.md §18]
- Docs nav groups Getting Started → Prompt → Iterate → Integrate → Ship → Manage → Guides (six-step funnel mirroring product journey). [v0.dev/docs sidebar]
- "New to Claude Code? Start with [basics] for project conventions, then add other extensions as specific triggers come up." (analogous v0 pattern: Quickstart → Instructions → Skills → Design Systems → MCP → Pre-installed Agents).
- Three terminal permission modes (Ask/Auto/Full) progressively disclose autonomy.
- Pre-installed agents (Claude Code) disabled for Enterprise by default — opt-in progressive disclosure at the org level.
- Plan-tiered disclosure: Enterprise gets SAML SSO, RBAC, training opt-out, priority access, SLAs. Business gets training opt-out by default.

**Bolt** [Source: evidence/bolt.md §18]
- `+` icon in chatbox hides Settings / Search Help Center / Enhance prompt / Attach file behind a single menu.
- Select tool has secondary "Pick from layers" toggle behind small arrow.
- Code view Target file / Lock file / Lock all revealed on right-click in Files list.
- Quick action buttons appear contextually after Plan-mode responses (not always).
- Token usage display opt-in via Settings → General → "Display token usage in chat" — off by default.
- **Project settings gear** opens "All project settings" — overflow container for less-frequent actions.
- **Evidence gap**: less extensive than Lovable's explicit progressive-disclosure pattern (activity cards expandable, More menu, preview toolbar hide/show, suggestion chips toggleable off).

**Warp** [Source: evidence/warp.md §18]
- Three-layer agentic surface, progressively disclosed:
  1. Warp Terminal (interactive local)
  2. Warp Agent CLI (terminal-native agent, available in any terminal)
  3. Oz Agent Platform (cloud orchestration at scale)
- Warp Drive permissions model is progressive: personal workspace → team workspace → direct email share → public link sharing.
- Workflows progressively disclosed: Global Workflows (community, in Workflows repo) → Repository Workflows (.warp/workflows/) → Local Workflows ($HOME/.warp/workflows/).
- Caution note: "You can continue to use YAML-based workflows, but we recommend using new workflows in Warp Drive instead for a better editing experience." — features are migrating from YAML files to Warp Drive objects.

**Zed** [Source: evidence/zed.md §18]
- **Panel-layout-based**:
  - **Welcome page** when no folder is open → disappears once a folder opens. [zed.dev/docs/getting-started]
  - **Classic vs Agentic layouts** — user toggles based on whether they are doing editor-focused work or agent-heavy work.
  - **Command palette** as the universal progressive disclosure surface — "If you forget a shortcut, search for it there."
  - **Inline AI vs Agent Panel** — two levels of AI invocation, lighter (Cmd+Enter) vs heavier (Cmd+Shift+A).
  - **Status badges** on the agent dashboard (4m, 12m, 2d) progressively disclose agent activity.

**Notion** [Source: evidence/notion.md §18]
- Built on progressive disclosure:
  - **Slash menu** hides hundreds of block types — invoked with `/`.
  - **`@` menu** hides mention types.
  - **`[[` menu** hides page-link search.
  - **Database properties**: collapsed until you click the property name.
  - **Toggle blocks**: hide content until expanded.
  - **Sub-pages**: visually nested but collapsed by default.
  - **Sidebar sections**: collapsible.
  - **In-page peek**: hover+click a database entry to peek without leaving.
  - **AI surfaces**: AI menu appears only when invoked.
- **Most discoverable** — every menu opens by typing a single character. More learnable than VS Code's chord shortcuts.

### Tier-4 (PD as anti-pattern or weak)

**Gemini** [Source: evidence/gemini.md §18]
- Primary progressive disclosure failure mode: **mode + model + source conflation in the same text box**:
  - "Add Files" exposes: Files upload, Image upload, **Deep Research**, **Canvas** — four very different feature modes behind one button.
  - "Sources" (within Deep Research) collapses source selection into the same input surface.
  - "Pro" vs "Thinking" model selection for Deep Research is reached via "Learn how to switch between models" — a secondary flow.
  - "@app" mention syntax adds Connected Apps into the prompt box, making app invocation implicit.
- **Textbook overload example**: one text box, four orthogonal toggles (mode, source, model, connected app). New users cannot infer from the surface what each affordance does.
- Help Center repeatedly uses phrases like "If you've never made a Gem before, first click Settings and help → Gems" to bridge the discoverability gap.

### Apple-platform products (PD via native iOS/macOS patterns)

**Things 3** [Source: evidence/things3.md §18]
- Multiple levels:
  - **To-do closed state**: minimal — title + checkbox + (optional) metadata badges.
  - **To-do open state**: "smoothly transforms into a clear white piece of paper" revealing notes, checklist, tags, dates.
  - **Detail fields tucked away**: "those fields are neatly tucked away in the corner until you need them."
  - **Magic Plus button**: looks like a static "+" but on drag reveals its insert-anywhere / heading / drop-to-Inbox capabilities.
  - **Jump Start popover**: hidden behind a hover-revealed calendar button — "Simply hover your mouse in front of a to-do and click the calendar button that appears."
- Continue Search expands the Quick Find scope on demand rather than indexing everything by default.
- Show/Hide later items: `⇧⌘E` toggles later items within projects and areas.

**Fantastical** [Source: evidence/fantastical.md §18]
- **Calendar Sets** as context switcher (only relevant calendars visible at a time).
- **Focus Filters** as automatic progressive disclosure (work calendars hidden when off-work).
- **Openings** reveal scheduling options progressively (auto-blocks already-booked slots).
- **Proposals** as multi-option meeting invitations: "send event proposals to your invitees with multiple times and dates."
- **Break Times, Lead Time, Date Ranges** as scheduling-detail layer (only shown when configuring Openings).
- **Interesting Calendars** browseable separately from main calendar.
- **Calendar Mirroring** (Jun 23, 2026): duplicates events across calendars to prevent conflicts.
- **Meet With** for team scheduling (Jun 30, 2026).

**Amie** [Source: evidence/amie.md §18]
- Partial evidence:
  - Calendar as primary view; action items / summaries revealed when expanding a meeting.
  - Notch overlay only visible during active recording.
  - AI Chat as an opt-in surface.
  - Auto-summarize produces a 1-line summary that expands to detailed action items, transcripts.
  - Smart Pages reveal themselves based on recurring events / domains — "auto-generated pages are the kind of thing that you don't even know you need until you see it" (Victor Fteha).
  - Custom speaker assignment revealed when expanding the transcript section (#127).
  - "discard recordings (click the arrow on stop)" (#119) — secondary action hidden behind an arrow.

**Superhuman** [Source: evidence/superhuman.md §18]
- **1-line summary → expandable detail** in Auto Summarize.
- **Split Inbox tabs** reveal only relevant email subsets.
- **Auto Labels** as custom-narrowing filter (e.g., "job applications", "requests to review work").
- **Calendar auto-update**: shown only when suggesting dates in email.
- **Custom AI Instructions**: "We log custom instructions to AI subprocessors (never email data)" — implies user-defined AI behavior hidden by default.
- **Go suggestions** are progressive ("Offers help before you even ask").
- **Agent Store** as on-demand expansion of agent capabilities.

---

## 4. Observed Variations

### Variation A: Layered (3-level) vs. staged (n-step) vs. inline ("Show more")
- **3-level layered**: Apple Intelligence (Interface/Output/Depth), Microsoft Copilot (Interface/Output/Depth), Manus Skills (Metadata/Instructions/Resources), Claude Agent Skills (name+description/SKILL.md body/bundled files).
- **Staged (wizard)**: v0 docs funnel (Getting Started → Prompt → Iterate → Integrate → Ship → Manage → Guides), Cursor layered AI reveal (Cmd-K → Cmd-L → Cmd-I → Plan Mode → Cloud Agents), Warp 3-layer agentic surface (Terminal → CLI → Oz Platform).
- **Inline ("Show more")**: Linear (activity log), Warp Drive (collapsible sections), Superhuman (1-line summary), Things 3 (closed → open to-do), Obsidian (foldable bullets), Notion (toggle blocks), Tana (outliner indentation).

### Variation B: Discovery style
- **Single-keystroke discovery**: Notion (slash, @, [[), Craft (slash), Obsidian (slash), Cursor (slash), Things 3 (Type Travel — first keystroke IS disclosure).
- **Modifier-key invocation**: Linear (⌘K), VS Code (⌘⇧P), Notion (⌘P/⌘K), Raycast (global hotkey), Arc (Cmd-T Command Bar), Obsidian (Cmd-P), Warp (CTRL-SHIFT-R).
- **Mode-prefix discovery**: Helix (Space mode → `?` command palette; g/m/z/Space/`[` `]` minor modes), Linear (G then letter), VS Code (⌘K prefix).
- **Right-click / hover-reveal**: Bolt (right-click Files list), Things 3 (hover calendar button reveals Jump Start popover), Arc (right-click tab context menu), Raycast (hover-to-reveal keyboard shortcuts in result rows).

### Variation C: AI-specific token-budget-aware PD
- **Manus Skills 3-level** (Metadata ~100 tokens/Skill at startup → Instructions <5k tokens when triggered → Resources on demand): explicit "Progressive Disclosure mechanism" naming in Manus docs. Preserves context window.
- **Claude Agent Skills 3-level** (name+description at startup → SKILL.md body → bundled files "third level and beyond"): explicitly framed as "first level of progressive disclosure."
- **Apple Foundation Models property-by-property streaming** (WWDC25-301): "if you don't want to wait until the full output is generated" — token-streaming UX pattern with progressive UI updates.
- This is the AI-era refinement of Nielsen's 2006 pattern.

### Variation D: Disclosure-of-autonomy
- **Cursor**: Three terminal permission modes (Ask/Auto/Full) progressively disclose autonomy.
- **Manus**: Approval gates (Allow Once vs Always Allow; one-time browser authorization; Take Over for MFA).
- **v0**: Pre-installed agents disabled for Enterprise by default — opt-in progressive disclosure at the org level.
- **Manus**: Three execution environments (Sandbox / Desktop / Cloud Computer) progressively disclosed by task type.
- This is the agentic-AI extension of PD: autonomy is the disclosed content.

### Variation E: Persistent depth (Layer 3) forms
- **Conversation history**: Apple Siri app (pin conversations), Microsoft Copilot chat history (reviewable/deletable), Manus Projects (persistent knowledge base).
- **Notebooks**: Microsoft Copilot Notebooks (chats + files + meeting notes + project materials).
- **Cowork/daemon**: Microsoft Copilot Cowork (long-running delegated tasks), Manus Cloud Computer (24/7 bots, scheduled scrapers).
- **Programmatic access**: Microsoft Copilot Interaction Export API (governance).
- **Version history**: Claude artifacts (version selector), v0 (sidebar hover card previews how a turn ended).

---

## 5. Premium Exemplars (BEST + WHY — evidence-based)

### BEST: **Apple Intelligence (3-Layer Model)** (ambient → invoked → persistent)

**Why evidence-based**:
- Most articulated 3-layer PD model in the evidence set, even though Apple does not officially document it as a model.
- Layer 1 (Interface surface, ambient): Siri glow at edge of screen, Writing Tools entry in text context menu, Smart Suggestions in Mail/Messages, Summaries auto-rendered in Mail list view, Genmoji entry in emoji keyboard — user is **invited** to engage but can ignore.
- Layer 2 (Output surface, invoked ephemeral): Writing Tools sheet with Rewrite/Proofread/Summarize options, Siri sheet with input field + voice waveform, Image Playground sheet with style picker + swatches, Visual Intelligence overlay.
- Layer 3 (Depth surface, drill-in persistent): Siri app conversation history (pin conversations), Foundation Models session transcript, Photos Clean Up before/after state with undo, Notes audio recording summary stored as typed block above recording.
- Maps directly to Nielsen's three PD criteria (right split / focus / discoverability), CLT (segmenting element interactivity across layers), Springer & Whittaker 2018 (initially simplified feedback that hides potential errors → user builds heuristics → drill-down on demand).
- Caveat: Apple does not officially document this as a 3-layer model — researcher's interpretation; confidence moderate.

### BEST: **Manus Skills (explicit Progressive Disclosure mechanism)**

**Why evidence-based**:
- Manus explicitly names the pattern: "Skills are designed to be highly efficient by using a 'Progressive Disclosure' mechanism."
- Token-budget-aware at each level:
  - Level 1: Metadata (name + description) loaded at startup — ~100 tokens/Skill
  - Level 2: Instructions (SKILL.md content) loaded when triggered via slash command — <5k tokens
  - Level 3: Resources (scripts, reference files) loaded on demand when referenced — consumed only when used
- Directly addresses CLT context-window limits (working-memory analog for LLMs).
- Pair with approval gates (Allow Once vs Always Allow; one-time browser authorization; Take Over for MFA) — PD of autonomy.
- Three execution environments (Sandbox / Desktop / Cloud Computer) progressively disclosed by task type.
- Maps to Springer & Whittaker 2018 (initially simplified feedback; drill-down on demand), arXiv:2607.19941 (PD of agent reasoning as core AI UX principle).
- [Source: academic/progressive-disclosure.md §7, citing https://arxiv.org/abs/1811.02164]

### BEST: **Claude Agent Skills (3-level + Artifacts + Beta labels)**

**Why evidence-based**:
- Explicit Anthropic engineering blog: "At startup, the agent pre-loads the name and description of every installed skill into its system prompt. This metadata is the first level of progressive disclosure."
- Multi-surface PD:
  - **Memory**: silent by default; visible only at `Settings > Memory`.
  - **Project instructions vs. profile instructions vs. skills**: layered scope.
  - **Agent Skills 3-level**: name+description → SKILL.md body → bundled files ("third level and beyond").
  - **Artifacts**: content >15 lines hoisted into side panel; versions hidden behind version selector.
  - **Beta / research preview labels**: features explicitly tagged by maturity.
- Maps to Nielsen's "right split" criterion (initial = frequent memory read; secondary = explicit memory navigation).
- Maps to arXiv:2605.10930 warning: PD must not become "opacity theatre"; users must be able to drill down to verify. [Source: academic/progressive-disclosure.md §7]

### BEST: **Microsoft Copilot (Interface/Output/Depth + Interaction Export API)**

**Why evidence-based**:
- 3-layer model parallel to Apple's but with stronger Layer 3 governance: Copilot Interaction Export API (programmatic access to prompts/responses for governance).
- Layer 3 persistence forms: chat history (reviewable/deletable), Copilot Notebooks (chats + files + meeting notes + project materials), Copilot Cowork (long-running delegated tasks), Copilot Search → Chat handoff (search returns summary, user continues in chat for depth), Agent conversations and their state.
- Maps to Shneiderman's 2nd Golden Rule (universal usability — license labels Premium/Basic/Chat Basic visible at Layer 1 to disclose capability tier).
- Maps to Springer & Whittaker 2018 (initially simplified Copilot Answer card → drill-down via Copilot Search → Chat handoff).

### BEST: **Linear (Simple first, then powerful)**

**Why evidence-based**:
- "Linear is **highly disciplined** about progressive disclosure" [§18]:
  - Command menu hides hundreds of commands — only invoked via ⌘K.
  - Issue properties: 8+ properties collapsed until hover/click.
  - Sub-issues: nested but visually compact.
  - Project detail: collapsed sections for "Goals", "Scope", "Status updates" — click to expand.
  - Sidebar: collapsible sections (Teams, Favorites, etc.) — keep sidebar uncluttered.
  - Settings: nested tree of settings categories.
  - Filter UI: simple "Add filter" pill → opens filter builder.
- Aligns with Linear Method principle "Simple first, then powerful" — Linear is usable on day 1 with minimal cognitive load, then reveals depth as the user needs it.
- [§23]: Activity log collapses older events with "Show more."
- Maps to Nielsen's "right split" + "focus" criteria, CLT element-interactivity segmentation, Miller's Law (8+ properties collapsed fits ≤7 visible at once per category).

### BEST: **Craft (slash + Focus Mode + Help Agent + Explore mode)**

**Why evidence-based**:
- Slash menu (`/`) — "Type / to access almost any feature without leaving your keyboard. This is often faster than remembering individual shortcuts."
- Focus Mode (`Cmd + .`) — hides sidebar and chrome for distraction-free writing.
- Quick Open — surfaces documents/views on demand.
- Three-dot menu for context actions — accessed via `Ctrl + Return`.
- Craft 101 video tutorial series for new-user onboarding.
- Help Agent for in-product progressive disclosure of features.
- Assistant Explore mode for AI-proposed changes (reviewable before applying).
- **Strongest progressive-disclosure model in the evidence set**, covering both user onboarding (videos, Help Agent) and AI-proposed changes (Explore mode).
- Maps to Carroll & Rosson (1984–1987) "minimalist documentation" theory (learners prefer minimal initial instruction with PD on demand) and Springer & Whittaker 2018 (initially simplified AI-proposed changes, drill-down via Explore mode).

### BEST: **VS Code (Custom Layout + Zen Mode + command palette)**

**Why evidence-based**:
- **Hide-on-demand**: Side Bar (⌘B), Panel (⌘J), Activity Bar, Status Bar, Tabs (all individually togglable).
- **Custom Layout (1.84+)**: every panel can be hidden, moved, or reordered. [https://code.visualstudio.com/docs/configure/custom-layout]
- **Zen Mode** (⌘K Z): hides everything except editor — full-screen focus mode.
- **Sidebar condensation**: Views can collapse into Activity Bar items (Explorer icon stays when panel collapsed).
- **Command palette as discovery**: Thousands of commands hidden until palette opens — power users discover features progressively.
- Acknowledges deliberate tradeoff: "Dense by default compared to Notion/Linear — VS Code shows multiple panels simultaneously because developer productivity requires simultaneous terminal + editor + problems view."
- Maps to Nielsen's "right split" (developer expert path = dense; novice path = palette discovery), CLT expertise-reversal (dense default hurts novices, palette mitigates).

---

## 6. Anti-Patterns (FAIL + WHY — evidence-based)

### ANTI-PATTERN: **Gemini's mode+model+source+app conflation in one text box**

**Why evidence-based**:
- "Add Files" exposes: Files upload, Image upload, **Deep Research**, **Canvas** — four very different feature modes behind one button.
- "Sources" (within Deep Research) collapses source selection into the same input surface.
- "Pro" vs "Thinking" model selection reached via "Learn how to switch between models" — a secondary flow.
- "@app" mention syntax adds Connected Apps into the prompt box, making app invocation implicit.
- "This is a textbook overload example: one text box, four orthogonal toggles (mode, source, model, connected app). New users cannot infer from the surface what each affordance does." [§18]
- Help Center repeatedly uses phrases like "If you've never made a Gem before, first click Settings and help → Gems" to bridge the discoverability gap.
- Maps to Nielsen's "right split" criterion failure (initial surface includes rare features mixed with frequent), Miller's Law violation (>7 effective choices in one surface), Hick's Law violation (decision time grows logarithmically with each orthogonal toggle), CLT extraneous load (search-for-relevant-info).

### ANTI-PATTERN: **Tana's mouse-driven outliner without keyboard PD parity**

**Why evidence-based**:
- "Tana's outliner is heavily mouse-driven (drag, hover menus); keyboard support exists but specifics not documented in marketing copy." [§19]
- Outliner indentation (Tab/Shift-Tab) IS native PD, but disclosure-of-disclosure (e.g., zoom-in to node) is "Not directly accessed but standard outliner feature; deep docs 404'd."
- Maps to Nielsen's "discoverability" criterion failure — users cannot infer how to drill down (zoom docs 404'd).

### ANTI-PATTERN: **Bolt's sparse PD surface (underdisclosure)**

**Why evidence-based**:
- "Less extensive than Lovable's explicit progressive-disclosure pattern (activity cards expandable, More menu, preview toolbar hide/show, suggestion chips toggleable off)." [§18]
- Token usage display opt-in via Settings → General — off by default. Users cannot see token consumption by default.
- Project settings gear opens "All project settings" — overflow container for less-frequent actions, but discovery is implicit.
- Maps to Nielsen's "discoverability" criterion — overflow containers are often undiscoverable.

### ANTI-PATTERN: **Arc's color-only Space differentiation + per-site Boosts editor hidden**

**Why evidence-based**:
- "Arc uses color for Spaces (per-Space themes) — color-blind users may struggle to differentiate Spaces by color alone." [§19]
- "Boosts editor is hidden until invoked per-site." [§18] — discoverability gap.
- "Tab context menu (right-click) reveals site-specific actions." [§18] — right-click is undiscoverable for novice users.
- Maps to Nielsen's "discoverability" criterion failure.

### ANTI-PATTERN: **VS Code's dense-by-default violating novice PD**

**Why evidence-based**:
- "Dense by default compared to Notion/Linear — VS Code shows multiple panels simultaneously because developer productivity requires simultaneous terminal + editor + problems view. This is a deliberate tradeoff." [§18]
- Tradeoff: expert productivity vs. novice cognitive load. CLT expertise-reversal effect (Kalyuga et al. 2003) — techniques that help experts hurt novices.
- Mitigation: Zen Mode (⌘K Z) for focus; command palette for discovery.
- Maps to CLT expertise-reversal; not strictly an anti-pattern (deliberate tradeoff), but a PD tension.

### ANTI-PATTERN: **Springer & Whittaker 2018: incremental transparency undermines heuristics**

**Why evidence-based**:
- "Incremental (continuous) transparency feedback can be distracting and undermine simple heuristics users form. Users retract positive evaluations after experience." [Source: academic/progressive-disclosure.md §5, citing arXiv:1811.02164]
- "Initially hiding AI errors helps users build heuristics, but if errors surface later, trust collapses more sharply." [§7]
- Maps to a PD-specific anti-pattern: **streaming/always-on transparency is NOT progressive disclosure**. PD is *staged* disclosure, not continuous. Manus's three concurrent live panes (Cloud Browser + Browser Operator + Desktop terminal) risk this anti-pattern.
- arXiv:2605.10930 (2026, false trust engendered by LLM explanations): PD must not become "opacity theatre"; users must be able to drill down to verify.

### ANTI-PATTERN: **v0's removal of animations as PD regression-fix**

**Why evidence-based**:
- "Removed accordion and versioned-block animations in chat." (May 15, 2026 changelog) [§15]
- Implies prior PD animations (accordions, versioned-block transitions) were producing perceptual confusion — the disclosure events themselves were too elaborate.
- Maps to Nielsen's "focus" criterion — disclosure events must be subtle enough not to distract.

---

## 7. Cognitive Load Implications

### CLT framework (Sweller 1988)

[Source: academic/cognitive-load-theory.md §4-§6, citing Sweller 1988 Cognitive Science 12(2):257-285; Chandler & Sweller 1991 Cognition and Instruction 8(4):293-332]

- **Intrinsic load (IL)**: PD reduces IL by segmenting element interactivity. Linear's collapsed issue properties (8+ properties, each expanded on demand) means at any moment the user processes ≤4 properties instead of 8+.
- **Extraneous load (EL)**: PD reduces EL by avoiding the "wall of options" presentation pattern. CLT split-attention effect (Sweller, Chandler & Tierney 1990) implies disclosure controls must be co-located with the action they reveal.
- **Germane load (GL)**: PD preserves GL by freeing working-memory capacity for schema construction. Springer & Whittaker 2018 empirically validated: "initially simplified feedback that hides potential system errors and assists in building working heuristics > always-on full transparency." [Source: academic/progressive-disclosure.md §5]
- **Expertise-reversal effect (Kalyuga, Ayres, Chandler & Sweller 2003)**: VS Code's dense-by-default + command palette mitigation is the canonical expertise-reversal design — novice path = palette discovery; expert path = dense simultaneous panels. [Source: academic/cognitive-load-theory.md §5]

### Miller's Law (7±2 / 4±1 modern Cowan 2001)

[Source: academic/millers-law.md §4, §10, citing Miller 1956 Psych Rev 63(2):81-97; Cowan 2001]

- Initial surface ≤7 items (Nielsen 2006 criterion); ≤5 if possible (Hick's law optimum).
- Linear's 8+ issue properties collapsed → ≤7 visible per category.
- Notion's slash menu search-as-you-type → reduces n to ≤5 effective after first character.
- Helix's minor modes (6 minor modes, each with ≤7 primary keys) → Miller's-Law-respecting chunking.
- Apple Intelligence Layer 1 surface (Siri glow + Writing Tools entry + Smart Suggestions + Summaries + Genmoji) → ~5 ambient AI surfaces, fitting Miller.
- Microsoft Copilot Layer 1 (Copilot button + collapsed Teams pane + Suggested prompts + Search tab + license labels) → ~5 visible surfaces.
- Bolt's chatbox `+` icon hiding Settings / Search Help Center / Enhance prompt / Attach file → 4 secondary items, fits Miller.
- Anti-pattern: Gemini's text box serving 4 orthogonal toggles (mode, source, model, connected app) → violates Miller's Law because all 4 are simultaneously active in working memory.

### Hick's Law (T = a + b·log₂(n+1))

[Source: academic/hicks-law.md §4, §10, citing Hick 1952 Quarterly J Exp Psych 4(1):11-26; Hyman 1953 J Exp Psych 45(3):188-196]

- Initial surface ≤5 primary choices for fast selection (Hick's law optimum).
- Command palette fuzzy search mitigates Hick's Law: first keystroke converts flat n-choice set into small effective set, collapsing log₂(n+1) decision time.
- Things 3's Type Travel eliminates the choice problem entirely: "simply start typing where you want to go and instantly you're transported there."
- Cursor's layered AI reveal (Cmd-K → Cmd-L → Cmd-I → Plan Mode → Cloud Agents) — 5 levels, but each level has ≤3 invocation paths, fitting Hick.
- Bolt's "Implement this plan / Show an example / Refine this idea" — 3 quick-action buttons, Hick's-law-optimal.

### Modern CLT view (embedded-emergent, Kalyuga 2011)

[Source: academic/cognitive-load-theory.md §4]

- "When EL is high, GL drops." Gemini's text-box conflation raises EL → GL drops → users form weaker heuristics of how Gemini modes interact.
- Linear's disciplined PD keeps EL low → GL preserved → users internalize "Linear feel" as a working heuristic.
- Manus's three concurrent live panes risk EL accumulation over long sessions → motion fatigue.

### Springer & Whittaker 2018 (arXiv:1811.02164) — AI-specific PD empirical evidence

[Source: academic/progressive-disclosure.md §5, citing https://arxiv.org/abs/1811.02164]

- Two empirical studies:
  - Study 1: users *anticipated* more transparent incremental systems would perform better, but *retracted* the evaluation after experience — incremental feedback was *distracting* and undermined simple heuristics users form about system operation.
  - Study 2: users benefit from *initially simplified feedback* that hides potential system errors and assists in building working heuristics — direct empirical grounding for progressive disclosure in AI transparency.
- Implication: PD for AI surfaces must be **staged**, not incremental/continuous streaming. Manus's live runtime panes risk the incremental-transparency anti-pattern.

---

## 8. Progressive Disclosure Relationship

This section is meta — Progressive Disclosure's relationship to itself and to sibling patterns.

### PD ↔ Motion UX

[Cross-ref: `motion-ux.md` §8 in this set]

- Motion is the **temporal dimension of progressive disclosure**. Panel slide-in (Arc 250ms, VS Code 200ms ease-out) signals the disclosure event.
- Streaming temporal motion (Linear "Streaming…" + "Thinking…" + "just now") = progressive disclosure of agent output.
- Spring physics = disclosure affordance (Things3 Magic Plus button "deforms its shape in response to your movements" — motion itself invites the next disclosure level).
- Anti-pattern: Gemini's text-box conflation means disclosure events cannot be unambiguously motion-signaled.

### PD ↔ Keyboard UX

[Cross-ref: `keyboard-ux.md` §8 in this set]

- Slash menus and command palettes ARE progressive disclosure (Notion `/`, Linear ⌘K, Raycast global hotkey, VS Code ⌘⇧P).
- Chord prefixes chunk PD: Linear G-then-letter, VS Code ⌘K prefix, Helix 6 minor modes.
- Type Travel (Things 3) is the most aggressive PD: zero initial surface, first keystroke is the disclosure event.
- Helix's `Space ?` hides the command palette behind Space mode — progressive disclosure of the disclosure surface itself.

### PD ↔ Accessibility

[Cross-ref: `accessibility.md` §8 in this set]

- A11y and PD are structurally paired: progressive disclosure of a11y features (VS Code Accessibility Help ⌥F1 invoked on demand).
- A11y as PD failure mode: Gemini's mode+model+source+app conflation is also an a11y failure — screen-reader users cannot disambiguate which affordance is which.
- CLT split-attention effect implies a11y help must be co-located with the action — VS Code's context-sensitive Accessibility Help is the correct pattern.
- Springer & Whittaker 2018: visually-impaired users benefit from simplified AI feedback, not from full transparency.

---

## 9. Accessibility Considerations (cite WCAG + a11y evidence + Fitts's Law)

### WCAG + PD-relevant Success Criteria

[WCAG 2.1 cited across the evidence set]

- **SC 1.4.10 Reflow** + **SC 1.4.11 Non-text Contrast**: PD's hidden-then-revealed controls must remain perceivable when disclosed — Apple's Writing Tools sheet, Microsoft's Copilot pane slide-in respect this.
- **SC 2.1.1 Keyboard**: PD controls must be keyboard-operable. Linear ⌘K, VS Code ⌘⇧P, Notion `/`, Raycast global hotkey all keyboard-only. Helix `Space ?` command palette is keyboard-only by design. Bolt's right-click-only Code view Target/Lock file disclosure — partial failure.
- **SC 2.4.7 Focus Visible**: when a disclosure event occurs, focus must move to the revealed content. VS Code focus rings; Claude marketing `--focus--width` CSS variables. Most products — undocumented.
- **SC 3.2.1 On Focus**: disclosure must not auto-trigger on focus (only on explicit user action). Apple's Smart Suggestions auto-render in Mail list view — borderline (auto-disclosure, not user-invoked); mitigated by "user can ignore it" framing.
- **SC 4.1.2 Name, Role, Value**: disclosure widgets must expose expanded/collapsed state to assistive tech. Helix (terminal) cannot reliably expose; Zed AccessKit in progress.

### Fitts's Law for disclosure controls

[Source: academic/fitts-law.md §6, citing Fitts 1954; Apple iOS HIG 44×44pt; Google Material 48×48dp]

- Disclosure controls (chevrons, "Show more" arrows, slash-menu triggers) must be ≥44pt (iOS) or ≥48dp (Android) for tap targets.
- Linear's hover-to-expand issue properties — hover is not a tap, so Fitts's Law applies differently (mouse pointer target).
- Things 3's hover-revealed Jump Start calendar button — Fitts's Law applies to the hover-revealed target.
- Apple's Siri glow at screen edge — effectively infinite target width per Fitts's Law (edge/corner target principle).
- Bolt's Quick Action buttons (3 buttons after Plan-mode response) — Fitts's Law applies; sizing not documented.

### A11y evidence per product (PD-relevant subset)

[Cross-ref: `accessibility.md` §3 in this set for full per-product a11y]

- **VS Code**: dedicated a11y page; Accessibility Help ⌥F1 context-sensitive per surface (editor, terminal, notebook, Chat view, Inline Chat) — best PD + a11y integration in the set.
- **Apple Intelligence**: VoiceOver + Magnifier + Accessibility Reader + Voice Control — Layer 1 disclosure of a11y features themselves.
- **Microsoft Copilot**: Fluent 2 "A11y – Focus Order" + "A11y – Color Contrast Checker" — PD-aware a11y tooling for designers.
- **Craft**: slash menu keyboard-only accessible via `Ctrl+Return` — keyboard bypass for right-click disclosure.
- **Helix**: command palette hidden behind `Space ?` — keyboard-only PD by design (terminal constraint).
- **Bolt**: right-click-only Code view Target/Lock file disclosure — partial WCAG 2.1.1 failure.

---

## 10. Performance Implications

### PD as performance feature

- **Linear** [§20]: command palette pre-loads commands; issue detail prefetched on hover; activity log collapses older events with "Show more" → reduces DOM weight → faster perceived performance.
- **Raycast** [§20]: native macOS Swift + window pre-render + per-command hotkeys → disclosure is sub-200ms ("Think in milliseconds").
- **Helix** [§15]: `auto-info = true` contextual hints — disclosed only when relevant → no upfront cost.
- **Zed** [§20]: GPUI 120fps + parallel agents in separate worktrees → agent dashboard status badges (4m, 12m, 2d) progressively disclose activity without blocking editor.
- **Manus Skills 3-level** [§18]: ~100 tokens/Skill at startup vs. <5k tokens when triggered vs. on-demand resources → preserves context window → preserves LLM inference performance.
- **Claude Agent Skills 3-level** [§18]: name+description at startup → SKILL.md body → bundled files "third level and beyond" → preserves context window.

### PD performance cost

- **v0's removed animations** (May 15 2026) — disclosure animations themselves were EL-increasing; removal is both PD refinement and performance fix.
- **Apple HIG Motion page is JS-rendered** (52 chars captured) — PD documentation is sometimes itself hidden behind JS rendering, creating a meta-PD gap.
- **Microsoft Copilot per-app WCAG conformance reports** auth-walled — Layer 3 depth surface (governance API) is not publicly accessible without auth.

### Token-budget-aware PD (AI-specific)

- **Manus**: ~100 tokens/Skill (Level 1) + <5k tokens (Level 2) + on-demand (Level 3) → preserves context window.
- **Claude Agent Skills**: name+description pre-loaded → SKILL.md body → bundled files "third level and beyond."
- **Apple Foundation Models** (WWDC25-301): "property-by-property, if you don't want to wait until the full output is generated" → token-streaming UX pattern.
- This is the AI-era refinement of Nielsen's 2006 pattern: PD now has a *token budget* dimension.

---

## 11. Long-Session Impact

### PD-positive long-session design

- **Linear** [§23]: "Engineered for long sessions — the perceived performance does not degrade with usage, unlike Electron apps that leak memory." Activity log collapses older events with "Show more" — limits visible PD surface over time.
- **Apple Siri app Layer 3** [§18]: "brings together all your conversations in one place, so you can ask a question on your iPhone and pick up where you left off on your iPad. You can also pin conversations for easy access." Long-session continuity via Layer 3 persistence.
- **Manus Cloud Computer** [§23]: daemon pattern — "Running a 24/7 bot (Slack, Discord, customer service) → Cloud Computer. Persistent knowledge base or live database (e.g., MySQL) → Cloud Computer. Self-hosting open-source tools (Home Assistant, Metabase) → Cloud Computer. Scheduled scrapers or reports (e.g., daily at 4 AM) → Cloud Computer." Long-session unattended workflows via Layer 3 Cloud Computer.
- **Microsoft Copilot Notebooks + Cowork** [§18]: organized collections of chats + files + meeting notes; long-running delegated tasks → Layer 3 long-session continuity.
- **Warp** [§23]: Sessions persist across directory changes + SSH remote hosts; "Push local sessions to the cloud to keep steering on the go" — Layer 3 cloud persistence.
- **Zed** [§23]: parallel agents in separate worktrees — 14+ agents working in parallel — Layer 3 agent dashboard progressively discloses status (4m, 12m, 2d badges).

### PD-specific long-session risk: PD inflation

[Source: academic/cognitive-load-theory.md §4-§5]

- As sessions accumulate, disclosed surfaces (open panels, expanded accordions, pinned conversations) pile up — EL rises.
- Mitigation observed: Linear's "Inbox Zero" workflow; VS Code's Zen Mode (⌘K Z); Arc's Today tabs auto-archive after 12 hours; Notion's toggle blocks (collapse on demand); Craft's Focus Mode (`Cmd + .`).
- Without mitigation, long sessions produce "PD inflation" — too many disclosed surfaces, exceeding Miller's 7±2 visible chunks.

### Springer & Whittaker 2018 — incremental transparency risk over long sessions

[Source: academic/progressive-disclosure.md §5, citing arXiv:1811.02164]

- Incremental (continuous) transparency feedback distracts users and undermines simple heuristics.
- Long-session risk: Manus's three concurrent live panes (Cloud Browser + Browser Operator + Desktop terminal) over 1+ hour may produce streaming-fatigue — the user retracts positive evaluation after experience.
- Mitigation: PD must be **staged**, not continuous. Apple's Layer 2 (invoked, ephemeral) sheet that dismisses on completion is the correct staged pattern.

---

## 12. Open Questions (insufficient evidence)

1. **Apple Intelligence 3-layer model official documentation** — "Apple does not officially document this as a 3-layer model in any captured primary source. The categorization above is the researcher's evidence-grounded interpretation." [§18]
2. **Microsoft Copilot 3-layer model official documentation** — "Microsoft does not officially document this as a 3-layer model." [§18]
3. **Cross-product token-budget-aware PD adoption** — Manus and Claude explicitly frame PD as token-budget-aware; other AI products (Cursor, v0, Bolt, Gemini) do not document token-budget dimensions.
4. **Tana zoom-in (focus mode) docs** — "Not directly accessed but standard outliner feature; deep docs 404'd." [§18]
5. **Bolt PD compared to Lovable** — "Less extensive than Lovable's explicit progressive-disclosure pattern." [§18]
6. **Obsidian forum-documented a11y limitations** — community forum hosts extensive discussion of focus-trap problems but was not fetched. [§19]
7. **v0 layered AI reveal specifics** — Docs nav implies Quickstart → Instructions → Skills → Design Systems → MCP → Pre-installed Agents progression, but per-step disclosure depth not documented.
8. **Arc Boosts editor discoverability** — "Boosts editor is hidden until invoked per-site" — discoverability gap not quantified.
9. **Cursor Plan Mode layered AI reveal depth** — Cmd-K → Cmd-L → Cmd-I → Plan Mode → Cloud Agents progression documented but per-level disclosure specifics sparse.
10. **Microsoft Copilot Interaction Export API completeness** — programmatic access to prompts/responses for governance — API surface not fully captured.
11. **Cross-product WCAG + PD conformance** — only Microsoft Copilot explicitly claims WCAG 2.1 AA conformance; most products lack VPAT.
12. **Apple Foundation Models property-by-property streaming UX pattern** — WWDC25-301 implies progressive UI updates, but specific timing parameters not disclosed. [§16]
13. **Manus Skills Level 3 Resources on-demand** — "consumed only when used" — quantification of token savings not documented.
14. **Claude bundled files "third level (and beyond)"** — explicit in Anthropic engineering blog but specific file-loading triggers not enumerated.
15. **Cross-product PD discoverability metrics** — no product documents disclosure-event usage analytics to inform design iteration.

---

## 13. Confidence Score

**84 / 100**

Reasoning: Strong primary-source evidence for Apple Intelligence (3-layer model with WWDC24-102 + WWDC25-301 + apple.com/apple-intelligence/ citations), Microsoft Copilot (3-layer model with learn-m365-overview.txt + learn-architecture.txt + page-67c10ae681c2.txt + page-9e03f8742741.txt citations), Claude (multi-surface PD with Anthropic engineering blog + support.claude.com articles), Manus (explicitly-named "Progressive Disclosure mechanism" with token budgets), Linear (highly disciplined PD with command menu + collapsed issue properties + collapsible sidebar + nested settings + Linear Method "Simple first, then powerful"), VS Code (Custom Layout 1.84+ + Zen Mode + command palette + deliberate dense-by-default tradeoff), Helix (mode-based PD with 3 primary + 6 minor modes + command palette hidden behind `Space ?`), Craft (slash + Focus Mode + Help Agent + Assistant Explore mode — strongest PD model in evidence set), Notion (slash + @ + [[ + toggle blocks + in-page peek — most discoverable), Raycast (already minimal + actions menu + detail view + AI Chat hidden controls), Warp (3-layer agentic surface + Warp Drive permissions + Workflows 3-level). Moderate evidence for Arc (sidebar auto-collapse + Command Bar + Boosts editor hidden + tab context menu + Today tabs auto-archive), Cursor (layered AI reveal + opt-in Rules + visual editor sidebar reveal), v0 (docs funnel + 3 terminal permission modes + plan-tiered disclosure), Zed (panel-layout-based + Welcome page + Classic/Agentic layouts + status badges), Things 3 (closed/open to-do + Magic Plus button + Jump Start popover + Continue Search), Fantastical (Calendar Sets + Focus Filters + Openings + Proposals + Break Times), Amie (partial — calendar primary + meeting expand + Smart Pages), Superhuman (1-line summary + Split Inbox tabs + Auto Labels + Go suggestions + Agent Store), Obsidian (Canvas pan/zoom + Settings + Mobile press-and-hold + foldable bullets), Tana (outliner indentation + zoom-in + Views + Search nodes — but docs 404'd). Weak evidence for Bolt (sparse PD surface; less extensive than Lovable), Gemini (textbook PD failure with mode+model+source+app conflation). Academic grounding is very strong (Nielsen 2006 verbatim principle + three usability criteria; CLT split-attention + element-interactivity + expertise-reversal; Miller 7±2/4±1; Hick decision-time; Springer & Whittaker 2018 empirical AI-transparency PD validation; arXiv:2605.10930 false-trust warning; arXiv:2607.19941 AI-agent UX framework; Carroll & Rosson minimalist documentation; Norman Gulf of Evaluation; Shneiderman 8th Golden Rule; Nielsen Heuristic #6 recognition-over-recall). Reduced from 90 due to: (a) Apple and Microsoft 3-layer models are researcher's interpretations, not officially documented; (b) Tana zoom-in docs 404'd; (c) Bolt PD underdocumented; (d) cross-product token-budget-aware PD adoption is sparse (only Manus and Claude); (e) cross-product WCAG + PD conformance is largely undocumented; (f) several Layer 3 depth surfaces (Copilot Interaction Export API, Apple Foundation Models session transcript) are not fully captured.
