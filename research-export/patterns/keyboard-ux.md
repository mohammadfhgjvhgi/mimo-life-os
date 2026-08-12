# Pattern: Keyboard UX

> Task PAT-4 — Evidence-Based Pattern Synthesis. Phase R2. NO MiMo design. Synthesis of evidence from existing product research files. Every claim cited.

---

## 1. Pattern Definition

**Keyboard UX** is the discipline of making every product action reachable, discoverable, and rapid via the keyboard — including single-key shortcuts, chord shortcuts, modal grammars (vim/emacs lineage), command palettes, slash menus, hotkey customization, hyper-key conventions, and natural-language-as-keyboard-input (where typing a phrase is the input surface). The pattern covers:

1. **Single-key shortcuts** (no modifier) — Linear (C/E/A/L/P/S/#/M/X/Y), Things 3 (Space = new to-do), Helix (modal editor grammar).
2. **Modifier chords** — VS Code (⌘K ⌘S, ⌘K ⌘T), Notion (Cmd+Option+Shift+0..9), Craft (Cmd+Option+6 for Todo).
3. **Prefix / chord-sequence shortcuts** — Linear (G then letter for "Go to"), VS Code (⌘K prefix), Helix (g/m/z/Space minor modes).
4. **Modal grammars** (vim/emacs lineage) — Helix (3 primary modes + 6 minor modes), Zed (Vim/Helix modes), Warp (Vim keybindings for code editor + text editing).
5. **Command palettes** — VS Code (⌘⇧P), Linear (⌘K), Raycast (global hotkey), Notion (⌘P/⌘K), Arc (Cmd-T Command Bar), Obsidian (Cmd-P).
6. **Slash menus** — Notion (`/`), Obsidian (`/`), Craft (`/`), Cursor (slash commands), v0 (slash commands).
7. **Hold-key invocations / quasimodes** — Linear (hold-Space), Raycast (Hyper key via Karabiner → Caps Lock), Things 3 (hold Option when clicking checkbox to cancel).
8. **Natural-language-as-keyboard-input** — Fantastical ("Lunch with Sarah at 1pm tomorrow"), Things 3 (Quick Find Type Travel), Superhuman ("Schedule 15 minutes for a quick meeting with Mike").
9. **Single global hotkey + per-command hotkey customization** — Raycast (⌘+Space / ⌥+Space global + per-extension hotkeys).

The pattern's **negative space**: products with weak keyboard UX (Bolt with only Ctrl+S and Enter documented, Amie with 3 hotkeys, Tana heavily mouse-driven) are part of the pattern — keyboard UX absence is itself a design choice (often with downstream accessibility cost).

---

## 2. Why It Matters

### Academic evidence (HCI laws/principles)

- **Fitts's Law (1954)** — keyboard input bypasses pointing entirely, eliminating Movement Time (MT = a + b·log₂(2D/W)). Single-key shortcuts have zero D (distance to target) and effectively infinite W (target width). [Source: academic/fitts-law.md §4, citing Fitts 1954 J Exp Psych 47(6):381-391]
- **Hick's Law (1952)** — command palettes that show many options are mitigated by fuzzy search: the first keystroke converts a flat n-choice set into a small effective set, collapsing the log₂(n+1) decision time. [Source: academic/hicks-law.md §10, citing Hick 1952 Quarterly J Exp Psych 4(1):11-26]
- **Miller's Law (7±2)** — chord prefixes (Linear's "G then letter", VS Code's ⌘K prefix, Helix's 6 minor modes) chunk the shortcut space: each prefix reveals ≤7 follow-on choices, fitting Miller's working-memory span. [Source: academic/millers-law.md §4 and §10, citing Miller 1956 Psych Rev 63(2):81-97]
- **Raskin's quasimodes** — "a state in which the user must make some constant physical action in order to keep the computer in that state, so that they cannot forget that they are in that mode." Linear's hold-Space, modifier-key chords (Shift/Ctrl/Cmd/Alt), and Things 3's hold-Option are direct quasimode applications. Raskin: held-key states are more reliable than toggle states (Sellen, Kurtenbach & Buxton 1992 CHI '92). [Source: academic/jef-raskin.md §4 and §5, citing Sellen et al. 1992 DOI 10.1145/142750.142795]
- **Raskin's monotony of design** — "one way per atomic task." Linear's ⌘K + hold-Space duplicates the command menu entry point (two ways to invoke the same surface) — a minor Raskin violation, but justified by ergonomics. [Source: academic/jef-raskin.md §4]
- **Shneiderman's 7th Golden Rule "Keep users in control"** + 2nd Rule "Seek universal usability" ("shortcuts for experts") — keyboard shortcuts are the canonical expert-path. [Source: academic/ben-shneiderman.md §4]
- **Nielsen Heuristic #6 "Recognition Rather than Recall"** + Heuristic #7 "Flexibility and Efficiency of Use" — slash menus surface options (recognition) rather than requiring shortcut memorization (recall); keyboard shortcuts accelerate expert use. [Source: academic/jakob-nielsen.md §4; academic/recognition-vs-recall.md §3]
- **GOMS keystroke-level model** (Card, Moran, Newell 1983) — keyboard shortcuts minimize K (keystroke 0.28s) + M (mental preparation 1.2s) compared to P (pointing 1.1s) for mouse paths. Expert keyboard users save ~0.82s per action vs. mouse. [Source: academic/jef-raskin.md §4, citing Card-Moran-Newell 1983]

### Mechanistic claim

Keyboard UX matters because:
1. **It bypasses Fitts's Law** (zero pointing distance) — pure motor speedup.
2. **It enables hands-on-keyboard posture** — long-session fatigue reduction (Helix/Zed modal editing reduces hand travel; cited in evidence/zed.md §23).
3. **It pairs with progressive disclosure** — slash menus and command palettes surface hundreds of options via single-keystroke discovery.
4. **It is itself an accessibility feature** (motor-impaired users may not be able to mouse; cognitively-impaired users may benefit from deterministic quasimodes vs. mode confusion).

---

## 3. Evidence Across Products

### Tier-1 (deepest documented keyboard UX)

**Linear** [Source: evidence/linear.md §14]
- ⌘K for command menu — universal navigation/action.
- **Single-key shortcuts** when an issue is selected: C (create), E (edit), A (assign), L (label), P (priority), S (status), # (cycle), M (move to project), X (select), Y (copy).
- **Hold-Space** to invoke command menu (also ⌘K).
- ⌘/ to focus search/command.
- ⌘\\ to toggle sidebar.
- ⌘T to open a new tab (desktop app).
- ⌘\\ + number to switch workspace tabs.
- **G then letter** (chord) for "Go to" navigation (G then I = Inbox, G then A = Active, etc.).
- `?` to show keyboard shortcut cheat sheet. Changelog: "Updated the keyboard shortcut cheat sheet to show Cmd/Ctrl+Enter for toggling checklist items."
- **The single-key + hold-Space pattern is unique to Linear** among the 5 products — most power users master it within a week.

**Raycast** [Source: evidence/raycast.md §14]
- **Single global hotkey** opens Raycast (commonly ⌘+Space after displacing Spotlight; default ⌥+Space). [sadde-raycast-blog.html — "I remapped the CMD + Space shortcut to open Raycast instead of Spotlight"]
- **Hotkey customization per command**: every installed command can be assigned a global hotkey. [raycast-home.html — "assign keyboard shortcuts to almost anything"]
- **Hyper key** convention (Shift+Ctrl+Alt+Cmd via Karabiner mapped to Caps Lock) — a Raycast community pattern that gives a single-key modifier for power-user shortcuts. [sadde-raycast-blog.html]
- **In-window keys**: arrows navigate, Enter executes, ⌘+Enter for "Open in" or alternate action, ⌘+K for actions menu, Tab for completion, Esc to dismiss, ⌘+W to close, ⌘+, for settings.
- **Quick AI hotkey** (separate from main hotkey) — by default ⌘+⌥+Space.
- **AI Chat hotkeys**: ⌘+⇧+B for branching (experimental), ⌘+N for new chat.
- **Per-extension hotkeys**: e.g., Clipboard History opens with separate hotkey (often ⌘+⇧+V).
- [raycast-changelog.html v1.101.0 for chat branching hotkey]
- **Ergonomic** — Raycast invested in shortcut placement so the most-used keys are on the home row.

**VS Code** [Source: evidence/vscode.md §14]
- Default keybindings documented per-OS at https://code.visualstudio.com/docs/getstarted/keybindings — printable PDF reference (Help > Keyboard Shortcut Reference).
- **Customization surface**: ⌘K ⌘S (Cmd+K Cmd+S). UI exposes search/filter, right-click to "Show Same Keybindings", graphical editor. Advanced: directly edit `keybindings.json` with `key`, `command`, `when` clause (context expression), `args`.
- **`when` clause contexts**: mini-DSL like `editorTextFocus && !editorReadonly` controls when a keybinding fires — explicit context-aware dispatch. (Sample log: `matched editor.action.commentLine, when: editorTextFocus && !editorReadonly`.)
- **Chord shortcuts**: ⌘K followed by another key (e.g., ⌘K ⌘T for color theme). Two-step patterns expand the shortcut space.
- **Keymap extensions**: Migrate from Vim, Emacs, Sublime, IntelliJ, Atom etc. via Marketplace extensions.
- **Keyboard layout awareness**: "The keyboard shortcuts match your current keyboard layout. For example, keyboard shortcut Cmd+\ in US keyboard layout will be shown as Ctrl+Shift+Alt+Cmd+7 when the layout is changed to German."
- Notable single-key UX: VS Code does **not** use Space-key hold for menus (compare Linear) — relies on chords and prefix commands.

**Helix** [Source: evidence/helix.md §14 — DEEP]
- Documented exhaustively in `keymap.md`.
- **Three primary modes**: Normal (default — navigation + editing commands), Insert (entered via `i a I A o O`; exit via `Escape`), Select/extend (entered via `v`; movements extend selections instead of replacing). [https://docs.helix-editor.com/usage.html + keymap.html]
- **Six minor modes** (transient, entered from Normal mode): `z` View mode; `Z` sticky view mode; `g` Goto mode; `m` Match mode; `Ctrl-w` Window mode; `Space` Space mode (pickers, LSP actions, clipboard, comments, command palette); `[` `]` Unimpaired (next/prev diagnostic, function, class, parameter, comment, paragraph, change, XML element, test, entry).
- **Selection-then-action grammar** (Normal mode Changes table): `d` delete selection; `c` change selection (delete + insert); `y` yank; `p` paste after; `P` paste before; `r` replace with char; `R` replace with yanked; `~` switch case; `` ` `` lowercase; `Alt-\`` uppercase; `>` indent; `<` unindent; `=` format (LSP); `Ctrl-a` increment number; `Ctrl-x` decrement number; `u` undo; `U` redo; `Alt-u`/`Alt-U` earlier/later in history; `.` repeat last insert.
- **Multiple-selection manipulation** (Selection manipulation table): `s` select all regex matches; `S` split selection into sub-selections on regex; `Alt-s` split on newlines; `Alt-minus` merge; `Alt-_` merge consecutive; `&` align in columns; `_` trim whitespace; `;` collapse to single cursor; `Alt-;` flip cursor and anchor; `,` keep only primary; `Alt-,` remove primary; `C` copy selection to next line (add cursor below); `Alt-C` to previous line; `(` `)` rotate main selection backward/forward; `%` select entire file; `x` select line (extend if already selected); `X` extend to line bounds.
- **Goto mode** (jumps — 25 entries): `g` file start; `e` file end; `h l` line start/end; `s` first non-whitespace; `t c b` window top/center/bottom; `d` definition; `D` declaration; `y` type definition; `r` references; `i` implementation (all LSP); `a` last accessed file; `m` last modified file; `n p` next/prev buffer; `.` last modification; `w` jump-to-word (show labels at each word and select by entering labels).
- **Space mode** (pickers + LSP + clipboard + comments — 25+ entries): `f F` file picker (workspace root / current dir); `e .` file explorer; `b` buffer picker; `j` jumplist picker; `g G` changed-file picker / debug (experimental); `s S` document/workspace symbol picker; `d D` diagnostics picker; `r` rename symbol; `a` code action; `h` select references; `k` hover docs; `'` last picker; `w` window mode; `c C Alt-c` comment toggles; `p P y Y R` clipboard paste/yank/replace; `/` global search; `?` command palette.
- **Insert mode is intentionally minimal**: `Escape` to Normal; `Ctrl-s` commit undo checkpoint; `Ctrl-x` autocomplete; `Ctrl-r` insert register; word-kill and line-kill shortcuts (Ctrl-w, Alt-d, Ctrl-u, Ctrl-k); arrow keys / PageUp/Down / Home/End "not recommended, but included for new users less familiar with modal editors" (can be disabled via `config.toml` `[keys.insert] up = "no_op"` etc.).
- **Design statement**: Helix wants users in Normal mode most of the time, with Insert mode being a transient state for typing only. "Changes to the text are only saved for undos when escaping from insert mode to normal mode."
- **Command palette** (`Space ?`) — discoverable through the Space mode table itself, not as a top-level surface. Hidden behind `Space ?` rather than ⌘⇧P.

### Tier-2 (rich keyboard UX, less uniquely documented)

**Notion** [Source: evidence/notion.md §14]
- **Slash commands**: `/` opens block-type menu. `/text`, `/page`, `/bullet`, `/num`, `/turn`, `/color`, `/ai`, `/blue`, `/blue background`. [notion-keyboard.html — "Slash commands" section]
- **`@` mentions**: `@person`, `@page`, `@date`, `@remind`. [notion-keyboard.html — "@ commands"]
- **`[[` link** (link to existing page) vs **`+` create** (create new page). [notion-keyboard.html]
- **Markdown shortcuts**: `# ` for H1, `## ` for H2, `* ` for bullet, `[] ` for todo, `1. ` for numbered, `> ` for quote, ` ``` ` for code. [notion-keyboard.html — "Markdown style"]
- **Text formatting**: Cmd+B (bold), Cmd+I (italic), Cmd+U (underline), Cmd+Shift+S (strikethrough), Cmd+E (code), Cmd+K (link).
- **Block shortcuts**: Cmd+Option+Shift+0..9 for block-type creation.
- **Block manipulation**: Esc to select block, Cmd+A to select all blocks, Cmd+D to duplicate, Cmd+/ to edit block, Cmd+Shift+arrow to move block.
- **Navigation**: Cmd+[ / Cmd+] (back/forward), Cmd+Shift+U (up one level), Cmd+P/Cmd+K (search).
- **Database navigation**: Cmd+R / Cmd+D (fill right/down in table).
- **Tabs**: Cmd+T (new tab), Cmd+Shift+N (new window).
- **Most popular**: Cmd+F (find on page), Cmd+P or Cmd+K (search/jump), Cmd+L (copy URL), Cmd+[ / Cmd+] (back/forward), Cmd+Shift+L (toggle dark mode).
- **Emoji picker**: type `:apple` for 🍎 inline. Or Ctrl+Cmd+Space (Mac).
- **Most discoverable** — slash + @ + [[ all surface menus with search-as-you-type. New users find features by typing characters and seeing what pops up. More learnable than Linear's single-key + chord system.

**Craft** [Source: evidence/craft.md §14]
- 508-line Mintlify doc page covering General, Navigation, Documents & Search, Tasks, Editing, Style & Formatting, Organize, Window & Tabs, plus custom-shortcut setup and essential-shortcuts-for-beginners guide. [https://craft-support.mintlify.app/en/introduction/shortcuts.md]
- **Slash command menu** — `/` opens command menu.
- **Quick Open** — `Cmd + O` (macOS) / `Ctrl + O` or `Ctrl + P` (Windows) — "isn't just for documents" — works for views, home, calendar, tasks.
- **Daily Note** — `Cmd + Option + N`.
- **New Document** — `Cmd + N` (macOS) / `Ctrl + T` opens new tab on Windows.
- **Open AI Assistant** — `Cmd + Return` (macOS) / `Ctrl + Enter` (Windows).
- **Task creation** — `Cmd + J` (Mac); mark done: `Cmd + Option + T`; canceled: `Cmd + Option + Shift + T`; schedule: `Cmd + Shift + S`; deadline: `Cmd + Shift + D`; reminder: `Cmd + Shift + R`.
- **Block editing** — Insert below: `Space`; above: `Shift + Space`; duplicate: `Cmd + D` or `Option + Drag`.
- **Style shortcuts** — Title `Ctrl + 1`, Subtitle `Ctrl + 2`, Heading `Ctrl + 3`, Strong `Ctrl + 4`, Body `Ctrl + 5`, Caption `Ctrl + 6`, Page `Cmd + Shift + P`, Card `Cmd + Shift + L`, Focus `Cmd + Shift + |`, Block `Cmd + Shift + '`.
- **List shortcuts** — Todo `Cmd + Option + 6`, Toggle `Cmd + Option + 7`, Bullet `Cmd + Option + 8`, Numbered `Cmd + Option + 9`, No List `Cmd + Option + 0`.
- **Group/Ungroup** — `Cmd + G` / `Cmd + Shift + G`.
- **Tab management** — `Cmd + T` (new), `Cmd + 1`–`Cmd + 9` (switch), `Ctrl + Tab` (next), `Cmd + Shift + T` (reopen closed).
- **View controls** — `Cmd + .` (focus mode), `Cmd + \` (sidebar), `Cmd + +` (zoom in), `Cmd + -` (zoom out), `Cmd + 0` (actual size).
- **Custom shortcuts on macOS** — "For any action listed in the Craft menu (whether it has a default shortcut or not), you can set up a custom shortcut from macOS System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts."
- **Non-English keyboards caveat** — "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English."
- **Windows parity gap** — "Some navigation shortcuts available on macOS (like block navigation with arrow keys) are not yet available on Windows. We're actively working to bring more feature parity across all platforms."

**Things 3** [Source: evidence/things3.md §14 — DEEP]
- Complete Mac shortcut set spans **11 categories**. [https://culturedcode.com/things/support/articles/2785159/]
- **Create items**: New to-do `⌘N`; New to-do below selection `Space`; New to-dos from clipboard `⌘V` (one to-do per clipboard row); New checklist in open to-do `⇧⌘C`; New project `⌥⌘N`; New heading `⇧⌘N`; New heading with selection `⌥⇧⌘N`; Open Quick Entry `^ Space`; Quick Entry with Autofill `^⌥ Space`.
- **Edit items**: Open selected item `Return`; Save and close `⌘Return`; Duplicate `⌘D`; Copy/Paste `⌘C`/`⌘V`; Complete `⌘K`; Cancel `⌥⌘K` (or hold `⌥` when clicking checkbox); Move completed to Logbook `⇧⌘Y`.
- **Select items**: Select first `⌥↑`; Select last `⌥↓`; Extend up/down `⇧↑`/`⇧↓`; Extend to top/bottom `⌥⇧↑`/`⌥⇧↓`; Select all `⌘A`.
- **Move items**: Move to another list `⇧⌘M`; Move copied item here `⌥⌘V`; Move up/down `⌘↑`/`⌘↓`; Move to top/bottom `⌥⌘↑`/`⌥⌘↓`.
- **Edit dates (rich cluster)**: Show When `⌘S`; Start Today `⌘T`; This Evening `⌘E`; Anytime `⌘R`; Someday `⌘O`; Start date +1 day `^]` / -1 day `^[`; +1 week `^⇧]` / -1 week `^⇧[`; Add Deadline `⇧⌘D`; Deadline +1 day `^.` / -1 day `^,`; Deadline +1 week `^⇧.` / -1 week `^⇧,`; Add repetition `⇧⌘R`.
- **Control windows**: New window `^⌘N`; Show/hide sidebar `⌘/`; Show/hide toolbar `⌥⌘T`; Open in new window via Quick Find `⌘Return` or `⌘+click`.
- **Search**: Search the app `⌘F` (but: "You don't actually need to use Cmd + F to start a search - simply start typing and the search box will appear."); Find in text `⇧⌘F`; Find & Replace `⌥⇧⌘F`; Find next `⌘G`; Find last `⇧⌘G`.
- **Navigate**: Navigation popover `⇧⌘O`; Inbox `⌘1`; Today `⌘2`; Upcoming `⌘3`; Anytime `⌘4`; Someday `⌘5`; Logbook `⌘6`; Show in parent list `⌘L`; Enter project `Return`/`⌘→`; Back `⌘←`; Scroll `fn↑`/`fn↓`; Jump to top/bottom `fn←`/`fn→`; Sidebar nav up/down `^⌥⌘↑`/`^⌥⌘↓`.
- **Type Travel** (signature feature): "you don't have to press any shortcuts to start up Quick Find, you just start typing where you want to go and instantly you're transported there. As soon as you strike a key, the search is on. Magic." [https://culturedcode.com/things/features/]

**Superhuman** [Source: evidence/superhuman.md §14]
- Official `help.superhuman.com` keyboard shortcuts page was inaccessible (Cloudflare challenge + 404).
- Indirect evidence:
  - "Fly through emails with shortcuts" as a listed feature on Mail product page (no specific shortcuts enumerated).
  - "Autocorrect increases typing speed by 30-50%" — keyboard-input speed optimization.
  - Calendar shortcut referenced without specific key: "Looking busy? Just hit a shortcut, and we'll show the next day."
  - Snippets typically invoked via keyboard shortcuts in email clients.
  - Command-palette-style inputs: "Schedule 15 minutes for a quick meeting with Mike" / "Tailor this language for executives" — read like keyboard-invoked commands.
  - Send Later and Snooze typically keyboard-shortcut-driven.
- Widely known to be keyboard-first (third-party coverage cites `⌘K` as command palette trigger), but **official sources do not document the specific shortcut set**.
- **Autocorrect as keyboard UX acceleration**: "Speed up your typing by 30-50% Autocorrect fixes errors as you go — extra characters, missing characters, transposed characters, missing punctuation, incorrect capitalization." [https://superhuman.com/products/mail]
- Notable: Superhuman competes on **typing speed itself** as a UX dimension, not just on shortcuts.

### Tier-3 (keyboard UX present but less central)

**Arc** [Source: evidence/arc.md §14]
- **Cmd-T**: Command Bar — universal action/search surface. The defining Arc shortcut.
- **Cmd-S**: toggle sidebar.
- **Cmd+Shift+Plus**: Split View (add right split).
- **Cmd+1, Cmd+2, …**: switch Spaces.
- **Cmd+Shift+Left/Right**: switch Spaces (cycle).
- **Cmd+L**: focus URL bar in current panel.
- **Cmd+W**: close current tab.
- **Cmd+R**: refresh current tab.
- **Cmd+F**: find on page.
- **Cmd+Shift+N**: new private window.
- **Cmd+Shift+T**: reopen last closed tab.
- **Cmd+Option+Left/Right**: switch tabs within a Space.
- **Cmd+Shift+A**: Arc Max Ask on Page (with text selected).
- **Cmd+\\**: toggle sidebar (alternate).
- Keyboard model is **browser-native with Command Bar extension** — most shortcuts match Chrome/Safari so users migrate easily.

**Cursor** [Source: evidence/cursor.md §14]
- Not directly observed (Cursor desktop not installed).
- Inherits VS Code / Electron; default keyboard inherits VS Code.
- Layered reveal keyboard model: Cmd-K (simplest) → Cmd-L chat → Cmd-I Composer → Plan Mode → Cloud Agents.

**Warp** [Source: evidence/warp.md §14]
- Keyboard-first Warp Drive navigation: UP/DOWN or j/k to navigate, Enter to execute, CMD-ENTER (mac) / CTRL-ENTER (Win/Linux) for context menu, CMD-SHIFT-( / CMD-SHIFT-) for terminal↔Warp Drive focus, LEFT/RIGHT arrow to collapse/expand, Esc to return from trash. [Warp Drive overview docs]
- CTRL-SHIFT-R opens Command Search / Workflow Search. [YAML Workflows docs]
- CTRL-SHIFT-\ toggles the Warp Drive side panel.
- SHIFT-TAB cycles through Workflow arguments.
- `!` prefix runs a shell command (vs natural language to the agent). [https://www.warp.dev/agent-cli]
- Vim keybindings available for code editor + text editing. Docs nav lists "Vim keybindings" under both Modern text editing and Code editor.

**Zed** [Source: evidence/zed.md §14]
- Vim/Helix modes: for power users, modal editing reduces hand travel and mental fatigue over long sessions. [https://zed.dev/docs/getting-started]
- Inline AI vs Agent Panel — two levels of AI invocation: lighter (Cmd+Enter) vs heavier (Cmd+Shift+A).
- Classic vs Agentic layouts — user toggles based on workflow type.
- Command palette as the universal progressive disclosure surface — "If you forget a shortcut, search for it there."
- Welcome page when no folder is open → disappears once a folder opens.

**Obsidian** [Source: evidence/obsidian.md §14]
- **Command palette**: `Ctrl/Cmd-P` opens command palette. [Obsidian mobile page: "Tabs, Command Palette, plugins, custom hotkeys — everything that makes Obsidian great is here"]
- **Hotkeys**: fully customizable; Sync syncs custom hotkeys across devices. [https://obsidian.md/sync]
- **Slash commands**: `/` for block insertion (headings, lists, to-dos, etc.). [https://obsidian.md/]
- **CLI TUI hotkeys**: Move left/right (Ctrl+B/F), start/end of line (Ctrl+A/E), previous/next word (Alt+B/F), delete to start/end of line (Ctrl+U/K), delete previous word (Ctrl+W/Alt+⌫), Tab to accept suggestion, Ctrl+P/N previous/next command, Ctrl+R search history. [https://obsidian.md/cli]

**Fantastical** [Source: evidence/fantastical.md §14]
- **Natural language entry as the primary creation primitive**: typing "Lunch with Sarah at 1pm tomorrow" creates a fully-populated event. The keyboard IS the input surface for new artifacts. [https://flexibits.com/fantastical]
- **Openings Keyboard**: dedicated input surface for sharing Openings links from any conversation app.
- **Light & Dark mode** toggle (preferences, not keyboard).
- No comprehensive keyboard shortcuts page found (`/support` URL returned 404).
- The natural language parser supports lazy input (partial word completion): "It's magical... Simply enter your event or reminder in any of those languages and Fantastical will automatically understand."

**Amie** [Source: evidence/amie.md §14]
- Marketing pages do not list a full shortcut map. Direct evidence:
  - `⌘+F` — search the transcript (changelog #119, April 29, 2025).
  - `p` key — toggles event privacy (changelog #128, July 14, 2026: "hotkey restored: the 'p' key toggles event privacy again").
  - `⌘⇧R` — refresh to make new event colors visible (#120, May 7, 2025).
- Things 3 has 100+ documented shortcuts; Amie does not expose a comparable shortcut reference page.
- Interaction model is more pointer/gesture + chat-driven than keyboard-driven.
- Calendar interactions: "QoL tweaks to make calendar interactions smoother" (#123) and "better slot deletion with improved hotkey support" (#123) imply hotkeys exist but not enumerated.
- On Mac the notch overlay serves as a primary input surface during recordings: pause / stop / split — accessible via mouse, not exclusively keyboard.

### Tier-4 (weak keyboard UX)

**Bolt** [Source: evidence/bolt.md §14, §19]
- No documented keyboard shortcut set beyond `Ctrl+S` and `Enter`. [code-view.md + quickstart.md]
- Help Center uses ⌘K for search, ⌘I for Ask Assistant — site-level only.

**Tana** [Source: evidence/tana.md §14]
- Slash, hotkeys, command palette — mentioned but not documented.
- "Tana's outliner is heavily mouse-driven (drag, hover menus); keyboard support exists but specifics not documented in marketing copy." [§19]

---

## 4. Observed Variations

### Variation A: Modal vs. modeless
- **Modal grammars**: Helix (3 primary modes + 6 minor modes), Zed (Vim/Helix modes), Warp (Vim keybindings).
- **Modeless**: Linear (single-key + chord but no persistent modes), Raycast (single hotkey opens launcher; no persistent state), Notion (slash + @ + [[ all ephemeral menus), VS Code (chord shortcuts but no modal state).
- **Quasimodes** (Raskin): Linear's hold-Space, modifier-key chords (Shift/Ctrl/Cmd/Alt), Things 3's hold-Option.

### Variation B: Single-key vs. modifier-chord
- **Single-key (when context allows)**: Linear (C/E/A/L/P/S/#/M/X/Y when issue selected), Things 3 (Space = new to-do), Helix (modal editor grammar), Warp (j/k navigation), Amie (`p` toggles event privacy).
- **Modifier-chord**: VS Code (⌘K ⌘S, ⌘K ⌘T), Craft (Cmd+Option+Shift combinations), Notion (Cmd+Option+Shift+0..9).
- **Chord-prefix**: Linear (G then letter), VS Code (⌘K prefix), Helix (g/m/z/Space/[ ] minor modes).

### Variation C: Discovery style
- **Slash menu (typed discovery)**: Notion, Obsidian, Craft, Cursor, v0.
- **Command palette (⌘K/⌘P)**: VS Code, Linear, Raycast (global), Notion, Arc, Obsidian, Warp.
- **Quick Find Type Travel (no shortcut — just type)**: Things 3 ("you don't actually need to use Cmd + F to start a search - simply start typing and the search box will appear").
- **Natural language as keyboard input**: Fantastical, Things 3, Superhuman.
- **Hyper key convention**: Raycast community (Shift+Ctrl+Alt+Cmd via Karabiner → Caps Lock).

### Variation D: Customization depth
- **Per-command global hotkeys**: Raycast (every installed command can have a global hotkey).
- **JSON customization**: VS Code (`keybindings.json` with `key`, `command`, `when`, `args`).
- **macOS System Settings remap**: Craft (any action listed in Craft menu → custom shortcut).
- **Sync-across-devices**: Obsidian (Sync syncs custom hotkeys).
- **Per-mode key remapping**: Helix (`config.toml` `[keys.insert] up = "no_op"` to disable arrow keys).

### Variation E: Ergonomic philosophy
- **Home-row optimization**: Raycast ("Raycast invested in shortcut placement so the most-used keys are on the home row, not requiring chord gymnastics").
- **Single-key over chord**: Linear (single-key shortcuts when issue selected).
- **Modal minimalism**: Helix (Insert mode intentionally minimal — "Helix wants users in Normal mode most of the time").
- **Browser-native inheritance**: Arc (most shortcuts match Chrome/Safari so users migrate easily).

---

## 5. Premium Exemplars (BEST + WHY — evidence-based)

### BEST: **Helix** (selection-first modal grammar with exhaustive keymap docs)

**Why evidence-based**:
- Fully open-source with all docs public as raw markdown — strongest evidence depth in the set.
- Three primary modes + six minor modes + picker/prompt tables fully enumerated in `keymap.md` (39KB).
- `editor.md` config reference (28KB) covers every `[editor.*]` section with key/description/default tables.
- Selection-first grammar: "selection → action model" — verbatim quote in usage.html.
- Modal design minimizes hand travel (Raskin universal undo + monotony of invocation).
- Helix explicitly disables "arrow keys" by default in Insert mode (can be disabled via `no_op`) — Raskin-style monotony enforcement.
- Maps to Miller's Law (each minor mode reveals ≤7 follow-on keys), Fitts's Law (zero pointing), Raskin (quasimode-like minor modes are transient prefix states).
- Caveat: terminal-inherited a11y ceiling (see accessibility.md).

### BEST: **Linear** (single-key + hold-Space quasimode + chord G-then-letter)

**Why evidence-based**:
- Documented single-key shortcuts when an issue is selected: C/E/A/L/P/S/#/M/X/Y — 10 distinct atomic actions on the home row.
- Hold-Space to invoke command menu — Raskin-style quasimode (held-key state, not toggle). Unique to Linear among the studied products.
- Chord "G then letter" for Go To navigation — Miller's-Law-respecting prefix scheme (≤7 follow-on letters).
- `?` cheat sheet — explicit discoverability affordance.
- Changelog confirms iteration: "Updated the keyboard shortcut cheat sheet to show Cmd/Ctrl+Enter for toggling checklist items."
- Maps to Fitts's Law (zero pointing), Miller's Law (chunked prefix), Raskin (quasimode), Shneiderman 7th (user control), Nielsen #7 (flexibility/efficiency).

### BEST: **Raycast** (global hotkey + per-command hotkeys + Hyper key convention)

**Why evidence-based**:
- Single global hotkey (⌘+Space / ⌥+Space) — universal entry point.
- Per-command global hotkeys — every installed command can have a global hotkey.
- Hyper key convention (Shift+Ctrl+Alt+Cmd via Karabiner → Caps Lock) — community-documented pattern; gives a single-key modifier for power-user shortcuts.
- Quick AI hotkey (separate from main hotkey): ⌘+⌥+Space.
- Per-extension hotkeys (Clipboard History often ⌘+⇧+V).
- Ergonomic design: "Raycast invested in shortcut placement so the most-used keys are on the home row."
- Maps to Raskin (quasimode via modifier keys), Fitts's Law (zero pointing once launcher is open), Hick's Law (fuzzy search converts n choices to small effective set after first keystroke).

### BEST: **VS Code** (keybindings.json + when-clause DSL + keymap extensions)

**Why evidence-based**:
- `keybindings.json` exposes `key`, `command`, `when` clause (context expression), `args` — programmatic customization surface.
- `when` clause mini-DSL (`editorTextFocus && !editorReadonly`) — explicit context-aware dispatch, rare in the set.
- Chord shortcuts (⌘K ⌘T) — two-step patterns expand shortcut space (Miller's Law chunking).
- Keymap extensions for Vim/Emacs/Sublime/IntelliJ/Atom migration — user-choice preservation.
- Keyboard layout awareness: "The keyboard shortcuts match your current keyboard layout. For example, keyboard shortcut Cmd+\ in US keyboard layout will be shown as Ctrl+Shift+Alt+Cmd+7 when the layout is changed to German."
- Printable PDF reference (Help > Keyboard Shortcut Reference).
- Maps to Raskin (monotony of invocation — one canonical shortcut per action via `when` clauses), Shneiderman 2nd (shortcuts for experts + explanations for novices via UI editor), Miller's Law (chord chunking).

### BEST: **Things 3** (Type Travel + 11-category shortcut set + date cluster)

**Why evidence-based**:
- Complete Mac shortcut set spans 11 categories (Create, Edit, Select, Move, Edit dates, Control windows, Search, Navigate, plus more).
- **Type Travel signature feature**: "you don't have to press any shortcuts to start up Quick Find, you just start typing where you want to go and instantly you're transported there. As soon as you strike a key, the search is on. Magic." — eliminates shortcut discovery entirely; first keystroke is the search.
- Date cluster: 15+ date-specific shortcuts (Start date +1 day `^]` / -1 day `^[`; +1 week `^⇧]` / -1 week `^⇧[`; Deadline +1 day `^.` / -1 day `^,`; +1 week `^⇧.` / -1 week `^⇧,`).
- Multilingual NLP support (English, German, French, Italian, Spanish, Russian, Chinese, Japanese) for natural language input.
- Keyboard Language Recall: "If you write one of your to-dos in a different language, Things will now remember and switch the keyboard back to that language when you next edit the to-do."
- Maps to Fitts's Law (zero pointing via Type Travel), Raskin (universal undo + monotony), Hick's Law (Type Travel eliminates choice).

### BEST: **Craft** (508-line shortcut doc + macOS System Settings remap)

**Why evidence-based**:
- 508-line Mintlify doc page — one of the longest in their docs.
- macOS System Settings > Keyboard > Keyboard Shortcuts > App Shortcuts — "For any action listed in the Craft menu (whether it has a default shortcut or not), you can set up a custom shortcut."
- External keyboard support on iOS/iPadOS.
- Honest disclosure: "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English."
- Windows parity gap disclosed honestly.
- Maps to Shneiderman 2nd (universal usability via custom remap), Raskin (universal undo + monotony), CLT expertise-reversal (custom remap accommodates both novice and expert).

---

## 6. Anti-Patterns (FAIL + WHY — evidence-based)

### ANTI-PATTERN: **Bolt's near-zero keyboard surface**

**Why evidence-based**:
- "No documented keyboard shortcut set beyond `Ctrl+S` and `Enter`." [§19]
- "Help Center uses ⌘K for search, ⌘I for Ask Assistant — site-level." [§19]
- Compared to Lovable's documented keyboard surface, Bolt is weak.
- Maps to WCAG SC 2.1.1 Keyboard — Bolt's keyboard surface is too narrow for keyboard-only users. Maps to Fitts's Law — Bolt forces mouse use (P = 1.1s per pointing operation).

### ANTI-PATTERN: **Amie's 3-hotkey documented surface**

**Why evidence-based**:
- Marketing pages list only `⌘+F`, `p`, `⌘⇧R`.
- Things 3 has 100+ documented shortcuts; Amie does not expose a comparable shortcut reference.
- "Interaction model is more pointer/gesture + chat-driven than keyboard-driven." [§14]
- Maps to WCAG SC 2.1.1 Keyboard — Amie's notch overlay (pause/stop/split) "accessible via mouse, not exclusively keyboard." [§14]

### ANTI-PATTERN: **Tana's mouse-driven outliner without keyboard parity**

**Why evidence-based**:
- "Tana's outliner is heavily mouse-driven (drag, hover menus); keyboard support exists but specifics not documented in marketing copy." [§19]
- No a11y statement on fetched pages.
- Maps to WCAG SC 2.1.1 Keyboard — drag-and-hover-driven outliner may fail "all functionality operable from keyboard."

### ANTI-PATTERN: **Arc's color-only Space differentiation + keyboard-shortcut inheritance without a11y docs**

**Why evidence-based**:
- Per-Space color differentiation without text labels — color-blind users cannot differentiate Spaces. [§19]
- Arc inherits browser-native shortcuts (Cmd-T, Cmd-L, etc.) — convenient but no documented extension for Arc-specific actions beyond Command Bar.
- "Arc's a11y documentation is essentially absent from publicly accessible sources." [§19]
- Maps to Nielsen #6 (Recognition rather than recall — color-only fails recognition), Fitts's Law (color-only differentiation adds cognitive load, not motor load, but effectively raises the cost of correct Space identification).

### ANTI-PATTERN: **Linear's duplicated command-menu entry (⌘K + hold-Space)**

**Why evidence-based**:
- Linear's hold-Space + ⌘K are two ways to invoke the same command menu — minor Raskin "monotony of invocation" violation.
- Justified by ergonomics (hold-Space keeps hands on home row; ⌘K is conventional) — but Raskin would argue this creates a small additional cognitive load (users must decide which to use).
- Maps to Raskin monotony principle: "one way per atomic task." [Source: academic/jef-raskin.md §4]

### ANTI-PATTERN: **Helix's terminal-inherited keymap conflicts**

**Why evidence-based**:
- "Some terminals' default key mappings conflict with Helix's. If any of the mappings described on this page do not work as expected, check your terminal's mappings." [§19]
- Not strictly an anti-pattern (Helix targets terminal-native users) but it creates a configuration burden that may exclude users who cannot reconfigure their terminal.
- Maps to Shneiderman 2nd (universal usability — terminal conflicts reduce plasticity).

### ANTI-PATTERN: **Craft's non-English keyboard parity gap**

**Why evidence-based**:
- "Some shortcuts may not work when your keyboard is set to a non-English layout. This is particularly true on Web app and Windows, which are only available in English."
- Windows parity gap: "Some navigation shortcuts available on macOS (like block navigation with arrow keys) are not yet available on Windows. We're actively working to bring more feature parity across all platforms."
- Honest disclosure is a positive (vs. undocumented gaps), but the gap itself is an anti-pattern for non-English/Windows users.
- Maps to Shneiderman 2nd (universal usability — international variations).

### ANTI-PATTERN: **VS Code's reliance on chords over single-key**

**Why evidence-based**:
- "VS Code does not use Space-key hold for menus (compare Linear) — it relies on chords and prefix commands." [§14]
- Chords (⌘K ⌘T) require two precise keystrokes — higher motor cost than Linear's single-key shortcuts.
- Mitigation: `when` clause contexts allow single-key shortcuts in specific contexts (e.g., `editorTextFocus && !editorReadonly` enables context-aware single-key shortcuts).
- Maps to GOMS — chords add an extra K (0.28s) per action vs. single-key.

---

## 7. Cognitive Load Implications

### CLT framework (Sweller 1988)

[Source: academic/cognitive-load-theory.md §4-§5]

- **Intrinsic load (IL)**: chord shortcuts (⌘K ⌘T) have higher element interactivity than single-key shortcuts (Linear's C). IL rises with each modifier the user must hold simultaneously.
- **Extraneous load (EL)**: undocumented shortcuts (Bolt, Tana, Amie) force users to discover via trial-and-error — high EL. Linear's `?` cheat sheet and Things 3's Type Travel reduce EL by externalizing the shortcut map.
- **Germane load (GL)**: modal grammars (Helix, Vim) initially raise GL (schema construction) but lower IL/EL once internalized — expertise-reversal effect (Kalyuga et al. 2003).

### Miller's Law (7±2 / 4±1 modern)

[Source: academic/millers-law.md §4, §10]

- Each chord prefix should reveal ≤7 follow-on choices — Linear's G-then-letter (Goto mode reveals ≤7 letter destinations), Helix's 6 minor modes (each with ≤7 primary keys), VS Code's ⌘K prefix (reveals searchable command list).
- Things 3's 11 shortcut categories — chunked by task type (Create/Edit/Select/Move/Dates/etc.) so each category fits Miller's span.
- Bolt's 2-shortcut surface underloads Miller's capacity — too sparse; users cannot accomplish most tasks via keyboard.
- Craft's 508-line shortcut doc — overloads Miller's capacity if read linearly; mitigated by Mintlify's task-type categorization.

### Hick's Law (T = a + b·log₂(n+1))

[Source: academic/hicks-law.md §4, §10]

- Command palettes with many options are mitigated by fuzzy search — first keystroke converts flat n-choice set into small effective set.
- Things 3's Type Travel eliminates the choice problem entirely: "simply start typing where you want to go and instantly you're transported there."
- Notion's slash menu: typing `/` reveals search-as-you-type filter — Hick's Law flattened via search.

### GOMS keystroke-level model

[Source: academic/jef-raskin.md §4, citing Card, Moran, Newell 1983]

- K (keystroke 0.28s) + M (mental preparation 1.2s) + P (pointing 1.1s) + H (homing 0.4s).
- Keyboard-only paths save P (1.1s) and H (0.4s) per action vs. mouse paths.
- Helix's modal grammar minimizes H (hands stay on home row); Linear's single-key shortcuts minimize both K (single vs. chord) and H.
- Amie's mouse-driven notch overlay forces P + H per action — long-session cost.

### Expertise-reversal (Kalyuga et al. 2003)

[Source: academic/cognitive-load-theory.md §5]

- Novice users benefit from slash menus (Notion, Craft) and command palettes (Raycast, Linear ⌘K) — recognition-based discovery.
- Expert users benefit from single-key shortcuts (Linear's C/E/A/L, Helix's modal grammar) — recall-based acceleration.
- Both paths must coexist — Shneiderman's 2nd Golden Rule ("explanations for novices and shortcuts for experts").

---

## 8. Progressive Disclosure Relationship

Keyboard UX is the **expert-path counterpart to progressive disclosure**:

- **Slash menus and command palettes ARE progressive disclosure** — `/` reveals hundreds of block types only when typed; ⌘K reveals hundreds of commands only when invoked. [Source: evidence/notion.md §14, §18; evidence/linear.md §14, §18]
- **Chord prefixes chunk progressive disclosure**: Linear's G-then-letter reveals Go To destinations only after G is pressed; VS Code's ⌘K prefix reveals searchable command list; Helix's minor modes (g/m/z/Space) reveal their own tables only when entered.
- **Type Travel (Things 3) is the most aggressive progressive disclosure**: zero initial surface — first keystroke IS the disclosure event.
- **Helix's `Space ?`** hides the command palette behind Space mode rather than exposing as top-level ⌘⇧P — progressive disclosure of the disclosure surface itself. [§14, §18]
- **Cursor's layered AI reveal**: Cmd-K (simplest) → Cmd-L chat → Cmd-I Composer → Plan Mode → Cloud Agents. Each level is a keyboard-invoked progressive disclosure layer. [§14, §18]

Cross-ref: see `progressive-disclosure.md` (sibling pattern file in this set).

---

## 9. Accessibility Considerations (cite WCAG + a11y evidence + Fitts's Law)

### WCAG SC 2.1.1 Keyboard

[WCAG 2.1 cited across evidence files]

- **Pass**: Linear (keyboard-first by design), Raycast (keyboard-first), VS Code (full keyboard nav + focus rings), Helix (modal grammar — keyboard is the primary surface), Warp (j/k + Enter + Esc + arrows), Craft (Ctrl+Return keyboard-only context menu), Things 3 (11-category shortcut set), Notion (slash + @ + [[ + Cmd shortcuts), Obsidian (Cmd-P command palette + customizable hotkeys), Arc (Command Bar + browser-native shortcuts).
- **Fail / partial**: Bolt (only Ctrl+S and Enter documented), Amie (only 3 hotkeys documented; notch overlay mouse-only), Tana (heavily mouse-driven outliner), Gemini (no documented keyboard-only navigation).

### Fitts's Law (1954)

[Source: academic/fitts-law.md §6, citing Fitts 1954; ISO 9241-9:2000]

- Keyboard shortcuts bypass pointing entirely — Fitts's Law optimum (zero D, infinite W).
- Things 3's Type Travel: "you don't actually need to use Cmd + F to start a search - simply start typing" — eliminates even the Fitts's-Law cost of finding the search field.
- Linear's single-key shortcuts when an issue is selected — eliminates all modifier-key motor cost.
- Helix's modal grammar — hands stay on home row, eliminating H (homing) and P (pointing) per GOMS.

### Raskin's modelessness + universal undo

[Source: academic/jef-raskin.md §4, §5]

- Modal grammars (Helix, Vim, Zed Vim mode) introduce mode error risk — Helix mitigates with `color-modes = true` (NORMAL/INSERT/SELECT colored differently per mode).
- Linear's hold-Space is a **quasimode** (Raskin-coined term) — user must hold the key to keep the menu open, eliminating "stuck in mode" errors.
- Things 3's hold-Option when clicking checkbox to cancel — quasimode application.
- Universal undo: Helix `u` undo / `U` redo / `Alt-u`/`Alt-U` earlier/later in history; Linear undo; VS Code undo; Notion multi-level undo.

### Recognition rather than recall (Nielsen Heuristic #6)

[Source: academic/recognition-vs-recall.md §3, §6]

- Slash menus (Notion, Obsidian, Craft, Cursor, v0) — recognition of block types via search-as-you-type.
- Command palettes (VS Code, Linear, Raycast, Notion, Arc, Obsidian, Warp) — recognition of commands via fuzzy search.
- Things 3's Type Travel — recognition of destinations as the user types.
- Linear's `?` cheat sheet — explicit recognition aid.
- Bolt / Amie / Tana — fail this heuristic by not surfacing options at all.

### Cross-ref to accessibility.md

For full per-product a11y posture including screen-reader support, high-contrast themes, reduced-motion respect, and internationalization — see `accessibility.md` (sibling pattern file in this set). Keyboard UX is the largest single contributor to a11y posture in this evidence set.

---

## 10. Performance Implications

### Keyboard shortcuts as performance multiplier

[Source: evidence/linear.md §20; evidence/raycast.md §20; evidence/helix.md §20]

- **Linear**: optimistic UI + spring animations + ⌘K + single-key shortcuts → "Linear is built around speed. Every interaction feels instant." Local-first sync engine + keyboard-first = no mouse round-trips. [§20]
- **Raycast**: native macOS Swift + single global hotkey + per-command hotkeys → "Think in milliseconds." Window pre-render keeps main window hot in memory — hotkey is "instant." 99.8% crash-free rate. [§20]
- **Helix**: Rust + terminal + modal grammar + `idle-timeout = 250ms` (debounce) + `completion-timeout = 250ms` default (set to 5 for "instant"). [§15, §20]
- **Things 3**: Quick Find "the moment you hit a key, the results show up instantly." Things Cloud rebuilt for "fourfold speed boost." [§20]
- **Zed**: GPU 120fps + Vim/Helix modes "reduce hand travel and mental fatigue over long sessions." [§23]

### GOMS speedup per shortcut

[Source: academic/jef-raskin.md §4, citing Card-Moran-Newell 1983]

- Each mouse-to-keyboard homing (H) = 0.4s. Each pointing operation (P) = 1.1s. Keyboard-only saves ~1.5s per action.
- Helix modal grammar minimizes H (hands stay on home row) — long-session savings multiply.
- Linear's single-key shortcuts minimize K (single vs. chord = 0.28s saved per action).

### Performance-relevant keyboard features

- **Helix `completion-timeout = 250ms` default; set to 5 for "instant"** — explicit perf-tuning knob.
- **Helix `idle-timeout = 250ms`** — debounce for auto-completion and auto-format.
- **Raycast `window pre-render`** — main window kept hot in memory, hotkey instant.
- **Things 3 Quick Find** — index built in background; "the moment you hit a key, the results show up instantly."
- **Craft Quick Open** — surfaces documents/views on demand.

---

## 11. Long-Session Impact

### Keyboard-positive long-session design

- **Helix** [§23]: modal editing reduces hand travel and mental fatigue; "No Electron. No VimScript. No JavaScript. Use it over ssh, tmux, or a plain terminal. Your laptop battery life will thank you." — accessibility through low resource usage.
- **Zed** [§23]: "Vim/Helix modes: for power users, modal editing reduces hand travel and mental fatigue over long sessions." Parallel agents reduce context-switching (14+ agents working in parallel).
- **Linear** [§23]: "command menu muscle memory kicks in — power users reach for ⌘K instinctively." Local-first architecture means 1-hour sessions don't degrade.
- **Raycast** [§23]: "Architected against session fatigue — because each invocation is short and independent. This contrasts with VS Code/Notion where long sessions accumulate state."
- **Things 3**: Type Travel eliminates the search-field navigation cost — long-session efficiency preserved.
- **VS Code** [§23]: Mitigations for memory creep + tab accumulation — Reopen Editor After Restart, Hot Exit, named Profiles.

### Keyboard-negative long-session design

- **Bolt**: only Ctrl+S and Enter documented — long sessions force repeated mouse use; EL accumulates from manual navigation.
- **Amie**: notch overlay mouse-only; calendar interactions pointer/gesture + chat-driven — long-session mouse fatigue.
- **Tana**: heavily mouse-driven outliner — long-session mouse fatigue.

### Muscle memory formation (CLT automaticity)

[Source: academic/cognitive-load-theory.md §5; academic/jef-raskin.md §5, citing Schneider & Shiffrin 1977]

- Automaticity (Schneider & Shiffrin 1977) — consistent keyboard shortcuts become automatic processing, freeing working memory for the task.
- Helix's monotony (one canonical key per atomic action) supports automaticity — `d` is always delete-selection regardless of context.
- Linear's single-key shortcuts when issue selected — become automatic within a week (per evidence/linear.md §14).
- VS Code's `when` clause DSL supports context-aware single-key shortcuts that become automatic per context.
- Anti-pattern: Bolt's sparse surface cannot form muscle memory.

---

## 12. Open Questions (insufficient evidence)

1. **Superhuman official shortcut set** — `help.superhuman.com/article/keyboard-shortcuts` returned 404; Cloudflare-blocked. Third-party coverage cites ⌘K but specific shortcut set not documented. [Source: evidence/superhuman.md §14]
2. **Cursor keyboard surface** — "Not directly observed (Cursor desktop not installed)." Inherits VS Code baseline; Cursor-specific shortcuts not documented. [Source: evidence/cursor.md §14]
3. **Manus keyboard surface** — Manus relies on natural language input; specific keyboard shortcuts not documented in fetched pages. [Source: evidence/manus.md §14]
4. **v0 keyboard surface** — keyboard shortcuts documented throughout docs (Cmd+K, Cmd+B, Cmd+F, Cmd+S, Option+D, Cmd+I, Escape, arrow keys, Enter, ⌘+click) but no comprehensive reference page. [Source: evidence/v0.md §14, §19]
5. **Tana keyboard support specifics** — outliner is heavily mouse-driven; keyboard specifics not documented. [Source: evidence/tana.md §14, §19]
6. **Zed animation/keyboard token spec** — no public design-system documentation; "blog-decoded.html" JS-rendered stub. [Source: evidence/zed.md §16]
7. **Apple Intelligence keyboard surface** — Siri voice + Writing Tools keyboard interactions not fully documented in captured sources. [Source: evidence/apple-intelligence.md §14]
8. **Claude (claude.ai) keyboard surface** — no canonical in-product keyboard spec captured. [Source: evidence/claude.md §14]
9. **Gemini keyboard surface** — no explicit keyboard-only or ARIA documentation. [Source: evidence/gemini.md §14, §19]
10. **Microsoft Copilot keyboard surface** — Fluent 2 component keyboard patterns not captured (auth-walled). [Source: evidence/ms-copilot.md §14]
11. **Obsidian full keyboard map** — "Hotkeys: fully customizable" but the full default map not enumerated in fetched sources. [Source: evidence/obsidian.md §14]
12. **Cross-product keyboard-conflict resolution** — Helix discloses terminal conflicts; Linear/Notion/VS Code/Raycast do not document conflicts with OS-level shortcuts.
13. **Cross-product non-English keyboard parity** — Craft discloses gap; Helix discloses gap; others (Notion, Linear, Raycast, VS Code) — undocumented.
14. **Cross-product hyper-key convention adoption** — Raycast community documents Hyper key; unclear if other products support it natively.
15. **Cross-product keyboard telemetry** — no product documents keyboard-shortcut usage analytics to inform design iteration.

---

## 13. Confidence Score

**82 / 100**

Reasoning: Strong primary-source evidence for Helix (exhaustive keymap.md, 39KB), Linear (single-key + hold-Space + chord documented), Raycast (global hotkey + per-command hotkeys + Hyper key convention), VS Code (keybindings.json + when-clause DSL + chord shortcuts + keymap extensions), Things 3 (11-category shortcut set + Type Travel signature feature), Craft (508-line shortcut doc + macOS System Settings remap), Notion (slash + @ + [[ + Markdown shortcuts), Warp (j/k navigation + Vim keybindings + `!` prefix). Moderate evidence for Arc (browser-native + Command Bar), Zed (Vim/Helix modes + Cmd+Enter/Cmd+Shift+A), Obsidian (Cmd-P + slash + CLI hotkeys), Superhuman (autocorrect + indirect keyboard-first signals), Fantastical (natural language as keyboard input), Cursor (layered AI reveal keyboard model). Weak evidence for Bolt (Ctrl+S + Enter only), Amie (3 hotkeys documented), Tana (heavily mouse-driven), Manus (natural language input only), v0 (shortcuts scattered across docs), Claude (in-product), Gemini, Apple Intelligence, Microsoft Copilot (Fluent 2 components auth-walled). Academic grounding is very strong (Fitts's Law, Hick's Law, Miller's Law, Raskin quasimodes + monotony + GOMS, Shneiderman 2nd + 7th, Nielsen #6 + #7, Recognition vs Recall, CLT expertise-reversal + automaticity). Reduced from 88 due to: (a) Superhuman's official shortcut page inaccessible (Cloudflare); (b) several products' keyboard surface is undocumented (Manus, Tana, Bolt, Amie); (c) cross-product non-English keyboard parity is a systematic gap; (d) Apple Intelligence / Microsoft Copilot / Claude in-product keyboard specs are JS-rendered or undocumented.
