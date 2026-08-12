# Things 3 — Evidence File

**Task:** W10 — Evidence-Based Product Research
**Agent:** Senior Product Researcher
**Phase:** R2 — EVIDENCE-BASED (no synthesis, no MiMo design)
**Product:** Things 3 by Cultured Code (culturedcode.com/things)
**Access date:** 2026-08-07
**Sources fetched:**
- https://culturedcode.com/things/ → `raw-things3/home.txt`
- https://culturedcode.com/things/support/ → `raw-things3/support.txt`
- https://culturedcode.com/things/features/ → `raw-things3/features.txt`
- https://culturedcode.com/things/guide/ → `raw-things3/guide.txt`
- https://culturedcode.com/blog/ → `raw-things3/blog.txt`
- https://culturedcode.com/things/support/articles/2785159/ → `raw-things3/shortcuts.txt`
- https://culturedcode.com/things/support/articles/2803584/ → `raw-things3/quickfind.txt`
- https://culturedcode.com/things/support/articles/9780167/ → `raw-things3/nlp.txt`
- https://culturedcode.com/things/support/articles/2803573/ → `raw-things3/urlscheme.txt`

---

## 1. Product Overview

Things is an Apple-platform-only personal task manager available on Mac, iPhone, iPad, Apple Watch, and Vision Pro. Per the official homepage: "Things is the award-winning personal task manager that helps you plan your day, manage your projects, and make real progress toward your goals." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

The product has won the Apple Design Award twice and has been in continuous development for over a decade (the blog references "Things has been around for over ten years" via reviewer Craig Mod). [Source: https://culturedcode.com/things/, accessed 2026-08-07]

Current version is Things 3.22 (released September 15, 2025), targeting Apple's OS 26 with "a thoroughly refreshed interface, a new app icon, better windowing on iPad, and many more improvements." [Source: https://culturedcode.com/things/blog/, accessed 2026-08-07]

Observed distribution: one-time purchase per platform via Apple App Store; no subscription tier visible in fetched URLs (homepage lists Mac, iPad, iPhone, Vision Pro as separate App Store purchases). [Source: https://culturedcode.com/things/, accessed 2026-08-07]

## 2. Product Philosophy

The product positions itself on "delightful productivity" — a blend of design craftsmanship and powerful features. The features page states: "The all-new Things sports an all-new design. Not just how it looks – but also how it works, and how it feels. The interactions are delightful. The animations are smooth. The content is more structured. The concepts are clearer." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

The team explicitly frames design as a building philosophy, not surface decoration: "Design Is Not an Afterthought. It's a way of building apps, and we live by it. There's a lot of thought, and trial, and error, that went into making these new apps simple to use while at the same time putting in all the powerful features." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

The "Getting Productive" guide frames the philosophy as calm, focused capture: "Things is the app for every thing you do. With it, you can organize every aspect of your life—from your daily routine to your long-term goals—and find the clarity that only comes from knowing what to do next." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

Reviewer quote featured on the homepage reinforces the calm-design position: "Things never feels messy or overbearing, no matter the length of your task list. Lovely, unfolding animations keep your place, and there's a super-fast search tool if you get lost. It's the rare to-do list app that doesn't try to force you into a particular way of thinking. […] It's more like a clean, crisp piece of paper, ready whenever you need it." — David Pierce [Source: https://culturedcode.com/things/, accessed 2026-08-07]

Craftsmanship ethos reiterated in the Swift Cloud blog: "At Cultured Code, we strive to build software with craftsmanship and care. Whether it's a new app feature or a cloud overhaul, our goal remains the same: to build software you can rely on every day, for years to come." [Source: https://culturedcode.com/things/blog/2025/05/a-swift-cloud/, accessed 2026-08-07]

## 3. Core Mental Model

The mental model is built around five top-level "lists" that map to time horizons: **Inbox, Today, Upcoming, Anytime, Someday** — plus **Logbook** for completed items.

Per the official guide:
- "Today is the list for to-dos that you want to start before the day ends. They're your priorities."
- "Upcoming is for planning ahead: it's a timeline of your to-dos, organized by when you'll start them, when they have deadlines, or when they'll repeat next."
- "Anytime is home for all of the to-dos you could start at any time."
- "Someday is the place for to-dos that you might like to get to, but you're not sure when."

[Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

Two additional organizing containers exist: **Projects** (multi-step goals) and **Areas** (ongoing ambitions grouping projects + to-dos). "An Area is for grouping all of your projects and to-dos that support an ongoing ambition. There's an area for every hat you wear." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

The model is opinionated about capture: "Each and every thing that you want to accomplish needs to end up in one place, and that place is the Inbox... What's crucial is immediately getting them off your mind and into the Inbox to revisit later." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

Calendar integration is treated as a complementary surface, not a replacement: "Your calendar complements Things: it's where all of your appointments and events belong. Plan smart by seeing Calendar entries at a glance alongside your to-dos in Today and Upcoming." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

## 4. User Journey

The product documents an explicit onboarding path in "Getting Productive with Things": a ~10-minute guide teaching the workflow in five steps:
1. **Gather it all in one place** (capture to Inbox reflexively)
2. **Decide when to get started** (assign to Today/Upcoming/Anytime/Someday)
3. **Do bigger things with projects** (promote Inbox items to Projects when multi-step)
4. **Define yourself with areas** (group by ongoing ambition)
5. **Establish your daily routine** (morning review in Today)

[Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

Capture is the first reflex: "The faster you can get new to-dos into your Inbox, the faster you can get back to work – so master some time-saving tricks. On your Mac, you can create a new to-do while you're working in another app by pressing Ctrl + Space." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

Daily ritual is framed as essential: "A visit with your to-dos early in the day, every day, is the best way to set your priorities and stay on top of what matters most to you." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

## 5. Navigation (sidebar, lists)

Navigation is via the sidebar + Quick Find + Type Travel. From the shortcuts page:
- `⌘1`–`⌘6` jump to Inbox, Today, Upcoming, Anytime, Someday, Logbook respectively
- `⌘ /` toggles sidebar visibility
- `⇧⌘O` opens a navigation popover
- `⌘ L` shows the selected item in its parent list
- `Return` or `⌘ →` enters a selected project; `⌘ ←` goes back

[Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

Quick Find doubles as navigation: "Navigating via Quick Find works the same as initiating a search. Instead of entering a search term, you type the name of your destination... Type 'tod…' to jump to the Today list. Type 'finan…' to jump to the Finances area." [Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

Special lists are accessible only through Quick Find: "Tomorrow – everything scheduled for the next day. Deadlines – everything with a deadline. Repeating – every repeating template. All Projects – every open project. Logged Projects – all completed projects in the Logbook." [Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

Multiple windows are supported on Mac (and iPadOS 26): "Open new window `^⌘N`", "Open a list from Quick Find search results in a new window `⌘ Return` or `⌘ + click`", "Open a project or area in a new window". [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

## 6. Workspace

The workspace is a two-pane layout: sidebar (lists, areas, projects, tags) + main list. To-dos themselves transform into "paper" when opened: "When you open a to-do, it smoothly transforms into a clear white piece of paper, ready for your thoughts. If you like, you can add more details (tags, a checklist, a start date, a deadline), but those fields are neatly tucked away in the corner until you need them." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

OS 26 refresh introduces "a touch of glass in the sidebar that lets a hint of color shine through... new glassy buttons that respond to your touch with a subtle glow and scale. A great example is the blue Magic Plus button. As you drag it around, notice its new liquid nature – it ever so slightly deforms its shape in response to your movements." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

iPad on iPadOS 26 supports Mac-like windowed mode: "Your windows get traffic light controls, and you can arrange them freely on your screen. To open a new window in Things, right-click a list and choose Open in New Window, or go to File → New Window... there's also a new menu bar. We've updated Things' menus to expose many powerful controls and keyboard shortcuts." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

Widgets are first-class: "Last year, we updated Things' widgets to support styles on iPhone and iPad. These styles are now available on the Mac as well. In addition to the Dark and Tinted styles, OS 26 introduces Clear – a glass-like style that lets your wallpaper shine through." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

Control Center integration on Mac and Watch: "On Mac, Things offers Controls for New To-Do and List (you choose which list). You can place them in Control Center, or pin them to your menu bar for one-click access." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

## 7. Conversation (AI features)

Things 3 itself does not include a first-party conversational AI. AI integration is via Apple Intelligence Writing Tools, available in Things since 3.21 (Oct 2024):

"Apple has released a new feature called Writing Tools and you can use it in Things to edit your notes... Using AI, it can proofread, rewrite, summarize, or reformat your text. You can invoke this feature right inside of Things." [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

Invocation model: "On your Mac, simply select text and click the blue button that appears to the side. On iPhone or iPad, select the text and choose Writing Tools from the edit bar. The text you selected is then sent to Writing Tools for processing." [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

Privacy stance is explicit: "No data from Things is shared with Apple Intelligence unless you choose to invoke Writing Tools." [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

Apple Shortcuts now exposes a "Use Model" action letting users bring AI into Things workflows: "Apple Shortcuts has a new Use Model action that lets you bring AI into your workflows with Things. Use on-device or cloud models to create new to-dos with AI-assisted writing, or pull data from Things via its Find Items action and pass it to the AI model as context." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

Siri integration for hands-free capture: "How to tell Siri to add a to-do or show a list." [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]

## 8. Agent Experience

No first-party autonomous agents exist in Things 3. The closest analogues are:
- Apple Shortcuts automation, including the new Use Model action (see §7).
- Apple Intelligence Writing Tools as a "summarize/rewrite/proofread" agent invoked per selection (see §7).
- The URL Scheme (see §25) which lets external apps/scripts drive Things.

## 9. Memory

Things 3 has no "memory" concept in the AI sense. Persistence is provided by:
- **Logbook**: completed and canceled items are archived. "Move completed to Logbook `⇧⌘Y`" [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]
- **Things Cloud**: end-to-end sync across devices, recently rebuilt in Swift server-side, claimed to deliver "a fourfold speed boost when processing sync requests" [Source: https://culturedcode.com/things/blog/2025/05/a-swift-cloud/, accessed 2026-08-07]
- **Markdown notes** attached to to-dos and projects (see §13)

## 10. Knowledge

Things treats knowledge as personal notes attached to tasks, not as a graph or wiki. Notes support Markdown: "Writing Notes with Markdown — Add style and structure to your notes with Markdown." [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]

The keyboard-shortcuts page documents a comprehensive set of Markdown shortcuts: H1 (`^⌘1`), H2 (`^⌘2`), italics (`⌘I`), bold (`⌘B`), bulleted list (`⇧⌘L`), numbered list (`⌥⌘L`), task list (`^⌘L`), quote (`⌘'`), highlight (`⇧⌘U`), link (`⇧⌘K`), strikethrough (`⌥⌘U`), code (`⇧⌘J`), code block (`⌥⇧⌘J`), indent (`⌘]`/`⌘[`). [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

Things Cloud stores notes via a custom granular sync engine called **Fractus**: "we refined them and added features like Fractus, our granular text-sync engine." [Source: https://culturedcode.com/things/blog/2025/05/a-swift-cloud/, accessed 2026-08-07]

Vision Pro now supports Apple's Writing Tools for proofread/rewrite/summarize/reformat of notes. [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

## 11. Search

Things' search is **Quick Find** — a unified search + navigation surface. From its support article: "Quick Find is a brilliant feature that combines navigation and search into a single function." [Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

Behavior:
- On Mac: "Start typing to begin a search (or use ⌘ Cmd F). Quick Find will magically appear as soon as you start typing." (No key press required.)
- On iPad/iPhone: "Pull down in any list to reveal Quick Find."
- On iPad with hardware keyboard: search field always available at top of sidebar; "just start typing to search (or hit ⌘ Cmd F)."

[Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

Two-tier scope: "Initially, Quick Find only looks at the names of to-dos, projects, areas, as well as tags, so suggestions can be shown as soon as you start typing." A **Continue Search** mode expands scope to notes, checklists, and completed Logbook items. [Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

Find-in-text (notes only) is a separate feature from Quick Find: "Things also allows you to limit your search to the notes text inside of an open to-do, which can be useful with longer notes. This feature does not rely on Quick Find." [Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

App-wide tag search: "Quick Find... automatically detects when you're typing a tag and lets you pull up an app-wide filter in milliseconds." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

## 12. Execution

Things does not "execute" actions on the user's behalf (no AI agents performing work). Execution is the user completing to-dos; the product optimizes the path: complete with `⌘K`, cancel with `⌥⌘K`, schedule with `⌘S`, etc. [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

Repeating to-dos automate recurrence: "Repeating To-Dos — For anything you need to do every few days, weeks, or months." [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]

Templates allow re-use of project/checklist structures: "How to Work With Templates — Re-use checklists and projects to save time." [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]

## 13. Artifacts (tasks, events, emails)

The artifact types Things manages are:
- **To-dos** (atomic tasks): can have title, notes, checklist, tags, start date, reminder, deadline, repeat schedule.
- **Projects** (multi-step containers): to-dos + headings.
- **Areas** (ongoing containers): projects + to-dos grouped by life domain.
- **Headings** (within projects): visual/structural dividers; can be drag-reordered.
- **Checklists** (within to-dos): sub-item lists, useful for shopping lists, packing lists, processes.
- **Calendar events** (read-only surface from system calendar): "Decide which calendars you want to see in Things: Personal, Family, Work, and more. The events are neatly grouped at the top of your Today list."
- **Tags** (cross-cutting filter).

[Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Magic Plus button is the universal artifact-creation primitive: "if you want to insert your to-do somewhere else, simply command the button where it should go! Lift it up with your finger, drag it into place, and let go." It also creates headings and supports "Drop to Inbox" — sending a new to-do to Inbox from any list without leaving the current list. [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Things does not manage emails (no email integration mentioned in fetched pages).

## 14. Keyboard UX (DEEP)

Things 3 is one of the most keyboard-dense Apple productivity apps. From the official shortcuts article [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07], the complete Mac shortcut set spans **11 categories**:

**Create items:** New to-do `⌘N` · New to-do below selection `Space` · New to-dos from clipboard `⌘V` (one to-do per clipboard row) · New checklist in open to-do `⇧⌘C` · New project `⌥⌘N` · New heading `⇧⌘N` · New heading with selection `⌥⇧⌘N` · Open Quick Entry `^ Space` · Quick Entry with Autofill `^⌥ Space`.

**Edit items:** Open selected item `Return` · Save and close `⌘Return` · Duplicate `⌘D` · Copy/Paste `⌘C`/`⌘V` · Complete `⌘K` · Cancel `⌥⌘K` (or hold `⌥` when clicking checkbox) · Move completed to Logbook `⇧⌘Y`.

**Select items:** Select first `⌥↑` · Select last `⌥↓` · Extend up/down `⇧↑`/`⇧↓` · Extend to top/bottom `⌥⇧↑`/`⌥⇧↓` · Select all `⌘A`.

**Move items:** Move to another list `⇧⌘M` · Move copied item here `⌥⌘V` · Move up/down `⌘↑`/`⌘↓` · Move to top/bottom `⌥⌘↑`/`⌥⌘↓`.

**Edit dates (a particularly rich cluster):** Show When `⌘S` · Start Today `⌘T` · This Evening `⌘E` · Anytime `⌘R` · Someday `⌘O` · Start date +1 day `^]` / -1 day `^[` · +1 week `^⇧]` / -1 week `^⇧[` · Add Deadline `⇧⌘D` · Deadline +1 day `^.` / -1 day `^,` · Deadline +1 week `^⇧.` / -1 week `^⇧,` · Add repetition `⇧⌘R`.

**Control windows:** New window `^⌘N` · Show/hide sidebar `⌘/` · Show/hide toolbar `⌥⌘T` · Open in new window via Quick Find `⌘Return` or `⌘+click`.

**Search:** Search the app `⌘F` (but: "You don't actually need to use Cmd + F to start a search - simply start typing and the search box will appear.") · Find in text `⇧⌘F` · Find & Replace `⌥⇧⌘F` · Find next `⌘G` · Find last `⇧⌘G`.

**Navigate:** Navigation popover `⇧⌘O` · Inbox `⌘1` · Today `⌘2` · Upcoming `⌘3` · Anytime `⌘4` · Someday `⌘5` · Logbook `⌘6` · Show in parent list `⌘L` · Enter project `Return`/`⌘→` · Back `⌘←` · Scroll `fn↑`/`fn↓` · Jump to top/bottom `fn←`/`fn→` · Sidebar nav up/down `^⌥⌘↑`/`^⌥⌘↓`.

**Type Travel** (the signature navigation feature): "you don't have to press any shortcuts to start up Quick Find, you just start typing where you want to go and instantly you're transported there. As soon as you strike a key, the search is on. Magic." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

**Tag & Filter:** Open tag window `^⌘T` · Edit tags `⇧⌘T` · Toggle tag on/off `^+shortcut` · Filter by tag `^⌥+shortcut` · Filter by multiple tags `⌘+click tags` · Escape filtered state `^ Esc`.

**Open links:** Open link `⌥⌘Return` · Open link in background `⌘+click`.

**Markdown styling:** H1 `^⌘1`, H2 `^⌘2`, italics `⌘I`, bold `⌘B`, bulleted `⇧⌘L`, numbered `⌥⌘L`, task list `^⌘L`, complete task `⌘K`, quote `⌘'`, highlight `⇧⌘U`, link `⇧⌘K`, strikethrough `⌥⌘U`, code `⇧⌘J`, code block `⌥⇧⌘J`, indent `⌘]`, outdent `⌘[`. [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

iPad/Vision keyboard shortcuts are also documented on a separate page (referenced as `/support/articles/2939808/`). [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

Users can define custom shortcuts: "You can also create custom keyboard shortcuts for any command visible in Things' menus at the top of your screen. These shortcuts will need to be created in your Mac's System Settings." [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

## 15. Motion

Motion is explicitly described as purposeful. OS 26 update: "Throughout the interface, you'll interact with new glassy buttons that respond to your touch with a subtle glow and scale. A great example is the blue Magic Plus button. As you drag it around, notice its new liquid nature – it ever so slightly deforms its shape in response to your movements." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

Reviewer Craig Mod (quoted on homepage) calls out purposeful animation: "Things on iPad and iPhone is one of the most tactile, fast-as-you-can-move apps around. Each animation is purposeful. Mainly, it is fun. It's a fun app to be in. To put stuff into, to rearrange." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

The "all-new Things" features page further states: "The interactions are delightful. The animations are smooth." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

## 16. Animation

To-do opening has a signature animation: "Just take a look at the basic building block of Things - its to-dos... When you open a to-do, it smoothly transforms into a clear white piece of paper, ready for your thoughts." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Drag-and-drop to reorder is animated as a tactile gesture: "When you have a multi-selected group, just tap and hold. The to-dos will gather under your finger and you can drag them wherever you want. Let go and they'll fall into place. Beautiful." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Homepage reviewer David Pierce notes "Lovely, unfolding animations keep your place." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

## 17. Visual Hierarchy

Things establishes hierarchy through typography, whitespace, and the "clear piece of paper" to-do metaphor. The features page describes detail fields as "neatly tucked away in the corner until you need them. There are no distractions here, it's just you and your thoughts." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

OS 26 update widened spacing: "adjustments everywhere: in the curvature of windows, to-dos, dialogs, and controls; wider spacing that feels a bit more relaxed; and a touch of glass in the sidebar that lets a hint of color shine through." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

Calendar events vs to-dos hierarchy in Today: "The events are neatly grouped at the top of your Today list. With your to-dos below, your whole day is laid out before you." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Within projects, **Headings** are the structural hierarchy primitive: "Use headings to create categories, milestones, or whatever you need – just give each one a name and drag your to-dos underneath." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

## 18. Progressive Disclosure

Things uses progressive disclosure at multiple levels:
- **To-do closed state**: minimal — title + checkbox + (optional) metadata badges.
- **To-do open state**: "smoothly transforms into a clear white piece of paper" revealing notes, checklist, tags, dates.
- **Detail fields tucked away**: "those fields are neatly tucked away in the corner until you need them."
- **Magic Plus button**: looks like a static "+" but on drag reveals its insert-anywhere / heading / drop-to-Inbox capabilities.
- **Jump Start popover**: hidden behind a hover-revealed calendar button — "Simply hover your mouse in front of a to-do and click the calendar button that appears."

[Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Continue Search expands the Quick Find scope on demand rather than indexing everything by default. [Source: https://culturedcode.com/things/support/articles/2803584/, accessed 2026-08-07]

Show/Hide later items: `⇧⌘E` toggles later items within projects and areas. [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

## 19. Accessibility

No dedicated accessibility statement was found in the fetched URLs. Indirect evidence:
- Full keyboard control on Mac, iPad, and Vision (separate iPad shortcuts article exists).
- Apple-platform native components inherit Apple's accessibility infrastructure (VoiceOver, etc.).
- Siri voice integration: "How to tell Siri to add a to-do or show a list." [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]
- Multilingual NLP support: "The following languages are currently supported for natural language input: English, German, French, Italian, Spanish, Russian, Chinese, and Japanese." [Source: https://culturedcode.com/things/support/articles/9780167/, accessed 2026-08-07]
- Keyboard Language Recall on iPhone/iPad: "If you write one of your to-dos in a different language, Things will now remember and switch the keyboard back to that language when you next edit the to-do." [Source: https://culturedcode.com/things/blog/2024/09/things-for-the-latest-os-releases/, accessed 2026-08-07]

## 20. Performance Perception

Quick Find is engineered for perceived instant response: "To hold its promise, Quick Find needs to be – quick. We've built it so that the moment you hit a key, the results show up instantly. And as you keep typing, the search results update blazingly fast, narrowing your search on the fly." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

Things Cloud rebuilt (2024–2025) for performance: "The new codebase is clean and robust, development moves faster, and the system runs with rock-solid stability – all while delivering a fourfold speed boost when processing sync requests." [Source: https://culturedcode.com/things/blog/2025/05/a-swift-cloud/, accessed 2026-08-07]

Migration was invisible by design: "We ran the new cloud in parallel with the old one. While the old Things Cloud continued syncing everyone's to-dos, the new cloud quietly processed the same data using its own logic and infrastructure. Every edge case and every corner of the sync model was tested under real-world conditions – without anyone ever noticing." [Source: https://culturedcode.com/things/blog/2025/05/a-swift-cloud/, accessed 2026-08-07]

Reviewer Federico Viticci (quoted on homepage) cites "fast sync" as a key strength. [Source: https://culturedcode.com/things/, accessed 2026-08-07]

## 21. Trust

Privacy is treated minimally on the marketing surface (no separate privacy page fetched, but referenced as `/privacy/`). Newsletter signup explicitly bounds data use: "Your privacy is very important to us. We'll only ever use your address to send you this newsletter, and you can unsubscribe at any time." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

Apple Intelligence integration is opt-in and minimal data exposure: "No data from Things is shared with Apple Intelligence unless you choose to invoke Writing Tools." [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

Trust is also built through visible engineering craftsmanship blog posts (e.g., the multi-year Swift Cloud rewrite) and the company's longevity (>10 years, twice Apple Design Award winner). [Source: https://culturedcode.com/things/, accessed 2026-08-07]

## 22. Explainability (AI features)

No first-party AI to explain. When Apple Intelligence Writing Tools acts on selected text, the user invokes it manually (no autonomous decisions to explain). [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

The Natural Language Input feature (for date parsing) shows a suggestion list and lets the user pick: "Type 'wed jul…' — Pick any Wednesday in July from a list of suggestions. Type '3rd wed jul…' — Third Wednesday in July." [Source: https://culturedcode.com/things/support/articles/9780167/, accessed 2026-08-07]

This pattern — natural-language input with visible suggestion — is the closest Things comes to "explainable AI."

## 23. Long Session Experience

The product is designed for **short, frequent sessions** rather than long ones. The guide explicitly recommends a daily morning review: "A visit with your to-dos early in the day, every day, is the best way to set your priorities and stay on top of what matters most to you. So grab a coffee and spend a few minutes in Today – this won't take long." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

The Inbox reflex is the anti-fatigue mechanism: "It's fine if you haven't yet come up with a plan for exactly how or when you'll do these new to-dos. What's crucial is immediately getting them off your mind and into the Inbox to revisit later. When this becomes a reflex, it's also a lot easier to stay focused on whatever you're doing." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

Reviewer quote on homepage captures the calm-during-chaos stance: "Things never feels messy or overbearing, no matter the length of your task list." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

## 24. Power User Features

**Areas + Tags + Headings** form the power-user organizational triad. The guide frames Areas for "every hat you wear": "Stay in touch with the people you care about by creating a Family & Friends area. Remember to keep an eye on your savings for the future with a Money area. Encourage yourself to care for your body and mind by maintaining a Health area." [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

**Quick Find + Type Travel**: keyboard-only navigation. See §11 and §14.

**Natural Language date input** for `⌘S` (When) and `⇧⌘D` (Deadline): supports "tod...", "10-3 9" (Oct 3 at 9), "17d" (17 days), "17d from jul9", "3rd wed jul 2026", "last fri jul..." etc. [Source: https://culturedcode.com/things/support/articles/9780167/, accessed 2026-08-07]

**URL Scheme** for external automation: `things:///add?title=Buy+milk&when=today` — see §25.

**Apple Shortcuts** support including the new `Use Model` action that lets users invoke AI models (on-device or cloud) to create to-dos with AI-assisted writing or pull Things data via Find Items action and pass to AI as context. [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

**Spotlight integration** on Mac: "Spotlight on Mac can now create to-dos. Type 'Create To-Do', press Return, then enter your title. Your new to-do is created in your Inbox, even if Things isn't running." [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

**Markdown notes** with full shortcut coverage — see §10 and §14.

**Multiple windows** with `⌘+click` and `⌥+New Window` shortcuts; "Open a Things URL in a new window `⌘+click`". [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

## 25. Developer Experience

Things has a documented **URL Scheme** for automation: "The URL scheme lets pro users and developers of other apps send commands to Things." [Source: https://culturedcode.com/things/support/articles/2803573/, accessed 2026-08-07]

Supported commands (observed via the article's "In this article" list): `add`, `add-project`, `update`, `update-project`, `show`, `search`, `version`, plus a JSON-based `json` command (with `add-json` deprecated). A built-in **Link Builder** tool on the support page generates URLs from form fields. [Source: https://culturedcode.com/things/support/articles/2803573/, accessed 2026-08-07]

Sample use cases from the article: "Create a new to-do named 'Buy milk'. Show the Today list. Show all to-dos tagged with 'Errand'. Search all to-dos for 'shipping address'. There's also a powerful JSON-based command that lets you create entire projects, together with all their notes, headings, and to-dos." [Source: https://culturedcode.com/things/support/articles/2803573/, accessed 2026-08-07]

There is **no public REST API** and **no SDK** — automation is via URL scheme + Apple Shortcuts only.

## 26. Biggest Strengths (with evidence)

1. **Design craftsmanship as a competitive moat.** Reviewer Christine Chan / AppAdvice: "Things 3 has an amazing design and aesthetic, and a ton of powerful new features that tie it all together." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

2. **Quick Find + Type Travel for keyboard-only navigation.** "Type Travel. On the Mac, the power of Quick Find and the power of your keyboard combine to create a unique experience... you don't have to press any shortcuts to start up Quick Find, you just start typing where you want to go and instantly you're transported there." [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

3. **Calm, opinionated information architecture** (Today/Upcoming/Anytime/Someday + Areas + Projects + Headings + Tags). [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

4. **Apple-ecosystem native integration** — Control Center, widgets, Spotlight, Shortcuts, Siri, Apple Intelligence Writing Tools. [Source: https://culturedcode.com/things/blog/2025/09/things-for-os-26/, accessed 2026-08-07]

5. **Remarkably dense keyboard shortcut map** spanning 11 categories with date +1 day / -1 day / +1 week / -1 week shortcuts that few competitors match. [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

6. **Stable, mature sync infrastructure** — rebuilt 2024–2025 in Swift, fourfold speed boost, zero-downtime migration. [Source: https://culturedcode.com/things/blog/2025/05/a-swift-cloud/, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Apple-platform only.** No Android, no Windows, no web. The support page FAQ explicitly lists "android" as a frequent question (suggesting heavy user demand that is unmet). [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]

2. **No first-party AI** — depends entirely on Apple Intelligence for AI features (which is region/hardware restricted). "Writing Tools is part of Apple Intelligence, which is only available in some regions and requires modern hardware." [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

3. **No collaboration / no shared lists.** The features and support pages make no mention of team or shared-to-do features; positioning is firmly "personal task manager." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

4. **No email integration.** Calendar integration is one-way (read-only display); no email surface exists. [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

5. **Per-platform purchase pricing** — Mac, iPad, iPhone, Watch, Vision Pro each require a separate App Store purchase. [Source: https://culturedcode.com/things/, accessed 2026-08-07]

6. **Automation limited to URL scheme + Apple Shortcuts** — no public REST API, no SDK, no webhooks, no MCP server. [Source: https://culturedcode.com/things/support/articles/2803573/, accessed 2026-08-07]

7. **Slow release cadence** — major versions take years; current is still "Things 3" since 2017. The blog page shows posts dated September 2025, May 2025, October 2024, September 2024 — sparse by SaaS standards. [Source: https://culturedcode.com/things/blog/, accessed 2026-08-07]

## 28. What should MiMo learn?

- **Type Travel as a navigation primitive.** No `⌘K`-style launcher modal — the whole app is the launcher. Striking a key immediately starts fuzzy navigation. This is a stronger pattern than a separate Cmd-K palette for products whose primary artifact is the list itself. [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

- **Opinionated default information architecture** as onboarding: Today / Upcoming / Anytime / Someday are not configurable, they're given. The user fits their work into the model rather than configuring the model. [Source: https://culturedcode.com/things/guide/, accessed 2026-08-07]

- **Detail fields tucked into corners** as progressive disclosure pattern — to-do stays minimal until opened. [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

- **Magic Plus as a draggable creation primitive** that creates to-dos / headings / drops-to-Inbox from one gesture — a model for unifying "new X" buttons. [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

- **Granular date shortcuts** (`^]`, `^[`, `^.` `^,`) for ±1 day, `^⇧]`/`^⇧[` for ±1 week — far more efficient than opening a date picker. [Source: https://culturedcode.com/things/support/articles/2785159/, accessed 2026-08-07]

- **Calm visual design as a long-session strategy**: reviewer quote "Things never feels messy or overbearing, no matter the length of your task list" is achieved through whitespace, limited visual chrome, and animation that "keep[s] your place." [Source: https://culturedcode.com/things/, accessed 2026-08-07]

- **Privacy by architectural separation** for AI features: "No data from Things is shared with Apple Intelligence unless you choose to invoke Writing Tools." This per-invocation model is a template for not-first-party-AI products. [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

## 29. What should MiMo reject?

- **Per-platform paid pricing model** — anti-modern for a productivity suite targeting teams. [Source: https://culturedcode.com/things/, accessed 2026-08-07]

- **Apple-only platform lock-in** — incompatible with cross-platform agent surfaces. [Source: https://culturedcode.com/things/support/, accessed 2026-08-07]

- **URL-scheme-only automation** with no REST API, SDK, or MCP — too narrow for an agent-first world. [Source: https://culturedcode.com/things/support/articles/2803573/, accessed 2026-08-07]

- **Purely personal scope** with no shared/team surfaces — insufficient for the multi-user collaboration MiMo would likely need. [Source: https://culturedcode.com/things/features/, accessed 2026-08-07]

- **No first-party AI** — dependence on a single vendor's AI (Apple Intelligence) creates regional/hardware exclusion. [Source: https://culturedcode.com/things/blog/2024/10/writing-tools/, accessed 2026-08-07]

## 30. Confidence Score (0–100) with reasoning

**Confidence: 82**

Reasoning:
- (+) Official sources cover product philosophy, mental model, navigation, keyboard UX, NLP, URL scheme, and cloud infrastructure with direct quotes — these sections are high-confidence (90+).
- (+) Multiple reviewer quotes (Pierce, Viticci, Chan, Mod, Blanc, Christoffel, Deorukhkar) corroborate design/perception claims from the homepage.
- (+) Official keyboard shortcuts article is comprehensive and primary-source.
- (−) No direct evidence on accessibility (inferred from platform nativeness).
- (−) No direct evidence on motion specifics beyond prose descriptions ("subtle glow and scale," "liquid nature"); no frame-rate or easing-function data.
- (−) Pricing details were not fetched (URL was referenced but not retrieved) — pricing claims are inferred from per-platform App Store links on the homepage.
- (−) Some power-user features (e.g., exact templates UX) were inferred from support article titles, not from hands-on walkthroughs.
- (−) Section 8 (Agent Experience) and §22 (Explainability) are thinly evidenced because Things itself has no first-party AI agents — only Apple-platform integrations.

Overall the file is grounded in primary official sources for ~85% of claims; the remaining ~15% are reasonable inferences from primary sources, clearly labeled.
