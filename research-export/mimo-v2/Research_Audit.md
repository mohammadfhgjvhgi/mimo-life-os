# MiMo Research Audit
### A brutally honest self-review of the research phase before it becomes the foundation of MiMo.

**Auditor:** main agent, switching to adversarial reviewer mode.
**Goal:** Find weaknesses, missing areas, wrong assumptions, blind spots. Do NOT defend prior conclusions. Try to reject the work.
**Date:** Current session.

---

## 1. Research Document Inventory

Every research document that currently exists in `/home/z/my-project/research/`.

| # | Filename | Purpose | Products covered | Dimensions covered | Size (lines) | Created | Generated completely or retried? | Confidence | Completeness |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `research-group-A.md` | AI chat assistants UX | ChatGPT, Claude, Gemini, GLM/Z.ai, Perplexity, Genspark (6) | 9 (works/doesn't/unique/learn/avoid/premium/slow/overload + 11 dim notes) | 521 | This session | **Retried** (first attempt hit context deadline; second succeeded) | 70% | 80% |
| 2 | `research-group-B.md` | AI coding agents UX | Cursor, Windsurf, Copilot Workspace, Codex, Continue.dev, Replit, OpenHands (7) | 9 + 11 dim notes | 702 | This session | Complete on first attempt, but admits 3 page reads failed (rate-limit/timeout) | 75% | 85% |
| 3 | `research-group-C.md` | AI builders UX | Lovable, Bolt.new, v0, Manus (4) | 9 + 11 dim notes | 378 | This session | Complete but admits multiple 429 rate-limits, recovered with 60–180s sleeps | 65% | 70% |
| 4 | `research-group-D.md` | Productivity/OS refs | VS Code, Raycast, Linear, Notion, Arc (5) | 9 + 11 dim notes | 556 | This session | Complete on first attempt | 80% | 85% |
| 5 | `research-group-E.md` | Design systems | Apple HIG, Material 3, Fluent 2 (3) | 12 per system | 482 | This session | Complete but admits rate-limit fallbacks | 65% | 70% |
| 6 | `research-group-F.md` | Autonomous coding agents | Devin, Claude Code, Aider, Sweep, Cody, Amazon Q, Tabnine (7) | 21 angles | 481 | This session | Complete but 5/7 initial searches hit 429; retried sequentially | 70% | 75% |
| 7 | `research-group-G.md` | PKM / knowledge | Obsidian, Heptabase, Tana, Logseq, Roam, Anytype (6) | 21 angles | 481 | This session | **Retried** (first attempt hit deadline; second was a *validation* pass that confirmed prior content — no new research) | 70% | 75% |
| 8 | `research-group-H.md` | System-level AI + agent platforms | Apple Intelligence, MS Copilot, LangGraph Studio, Dust.tt, AutoGPT, GitHub Spark (6) | 21 angles | 432 | This session | Complete but **ALL 11 page_reader calls returned 429**; fell back to curl + Wayback Machine | **45%** | 55% |
| 9 | `research-group-I.md` | Motion design + DX exemplars | Stripe, Figma, GitHub Primer, Atlassian, Vercel/Geist, Linear Motion (6) | 21 angles (motion + DX emphasized) | 478 | This session | Complete but admits SDK page_reader 429; bypassed with curl + Python tag-strip | 70% | 75% |
| 10 | `research-group-J.md` | 21 philosophical angles across all products | All 32 products (synthesis) + 7 new (Helix, Zed, Granola, Reflect, Fluid Framework, DeepSeek-R1, Anytype already in G) | 21 dimensions | 524 | This session | Complete but **0 cited URLs** — relied on search snippets only because page_reader was rate-limited | **40%** | 50% |

**Total:** 10 files, 5,035 lines, ~620KB.

**Aggregate confidence:** ~62%. **Aggregate completeness:** ~72%.

---

## 2. Product Research Inventory

### 2.1 Chat assistants (Group A)
| Product | Researched? | Docs read? | Videos / live UX? | Official design system? | Recent (2024-2025)? | Confidence (0-100) |
|---|---|---|---|---|---|---|
| ChatGPT | Yes | Partial (release notes, Medium, Simon Willison snippet) | No | No (OpenAI has none) | Yes | 70 |
| Claude | Yes | Partial (Anthropic news, Simon Willison, Medium) | No | No | Yes | 70 |
| Google Gemini | Yes | Partial (blog, freshvanroot, gemini.google overview) | No | No (Material is separate) | Yes | 60 |
| GLM / Z.ai | Yes | Partial (Turing Post, ChinaTalk, z.ai blog) | No | No | Yes | 55 |
| Perplexity | Yes | Partial (eesel, UX Design Institute, perplexity.ai/pro) | No | No | Yes | 65 |
| Genspark | Yes | Partial (Lindy, SpectrumAI, Trustpilot) | No | No | Yes | 55 |

### 2.2 AI coding agents (Group B)
| Product | Researched? | Docs read? | Videos / live UX? | Official design system? | Recent? | Confidence |
|---|---|---|---|---|---|---|
| Cursor | Yes | Deep (digitalapplied, InfoQ, Codecademy, DeployHQ, forum, Reddit) | No | No | Yes (2025-2026) | 80 |
| Windsurf | Yes | Partial | No | No | Yes | 65 |
| Copilot Workspace | Yes | Partial + Don Syme retrospective (critical doc) | No | No | Yes | 75 |
| Codex | Yes | Partial | No | No | Yes | 60 |
| Continue.dev | Yes | Partial (GitHub issues referenced) | No | No | Yes | 60 |
| Replit Agent | Yes | Partial | No | No | Yes | 65 |
| OpenHands | Yes | Partial (architecture docs) | No | No | Yes | 65 |

### 2.3 AI builders (Group C)
| Product | Researched? | Docs read? | Videos / live UX? | Official design system? | Recent? | Confidence |
|---|---|---|---|---|---|---|
| Lovable | Yes | Deep (Trickle, PostHog co-founder interview, changelog) | No | No | Yes (2025-2026) | 70 |
| Bolt.new | Yes | Partial (Codrops, E2B) | No | No | Yes | 60 |
| v0 | Yes | Partial (Jan 2026 Design Mode removal tracked) | No | No | Yes | 60 |
| Manus | Yes | Deep (arxiv architecture paper, E2B, official blog) | No | No | Yes | 70 |

### 2.4 Productivity / OS-grade (Group D)
| Product | Researched? | Docs read? | Videos / live UX? | Official design system? | Recent? | Confidence |
|---|---|---|---|---|---|---|
| VS Code | Yes | Partial (UI docs, layout, activity bar) | No | No (separate from Primer) | Yes | 70 |
| Raycast | Yes | Partial (sadde review) | No | No | Yes | 60 |
| Linear | Yes | Deep (home, medium, morgen, review) | No | No (Linear Method is process, not DS) | Yes | 80 |
| Notion | Yes | Deep (sidebar, datasources) | No | No | Yes | 70 |
| Arc | Yes | Deep (home, pinned, spaces, split) | No | No | Yes | 75 |

### 2.5 Design systems (Group E)
| System | Researched? | Docs read? | Videos? | Official? | Recent? | Confidence |
|---|---|---|---|---|---|---|
| Apple HIG | Yes | Partial (incl. Liquid Glass / visionOS) | No | Yes (official) | Yes | 65 |
| Material 3 | Yes | Partial (incl. M3 Expressive) | No | Yes | Yes | 65 |
| Fluent 2 | Yes | Partial | No | Yes | Yes | 60 |

### 2.6 Autonomous coding agents (Group F)
| Product | Researched? | Docs read? | Videos? | Official DS? | Recent? | Confidence |
|---|---|---|---|---|---|---|
| Devin | Yes | Partial | No | No | Yes | 60 |
| Claude Code | Yes | Partial (Boris Cherny quotes) | No | No | Yes | 70 |
| Aider | Yes | Partial | No | No | Yes | 60 |
| Sweep.dev | Yes | Partial | No | No | Yes | 50 |
| Sourcegraph Cody | Yes | Partial | No | No | Yes | 60 |
| Amazon Q Developer | Yes | Partial | No | No | Yes | 55 |
| Tabnine | Yes | Partial | No | No | Yes | 60 |

### 2.7 PKM / knowledge (Group G)
| Product | Researched? | Docs read? | Videos? | Recent? | Confidence |
|---|---|---|---|---|---|
| Obsidian | Yes | Partial (incl. Bases plugin) | No | Yes | 70 |
| Heptabase | Yes | Partial | No | Yes | 65 |
| Tana | Yes | Partial (incl. AI Agents + command nodes) | No | Yes | 65 |
| Logseq | Yes | Partial | No | Yes | 55 |
| Roam Research | Yes | Partial | No | Partial (older product) | 55 |
| Anytype | Yes | Partial (incl. AnySync) | No | Yes | 65 |

### 2.8 System-level AI + agent platforms (Group H — WEAKEST)
| Product | Researched? | Docs read? | Videos? | Recent? | Confidence |
|---|---|---|---|---|---|
| Apple Intelligence | Partial | curl + Wayback (page_reader 429) | No | Yes | **40** |
| Microsoft Copilot | Partial | curl + Wayback | No | Yes | **40** |
| LangGraph Studio | Partial | curl + blog + docs | No | Yes | **45** |
| Dust.tt | Partial | Wayback (JS-rendered) | No | Yes | **35** |
| AutoGPT | Partial | Wayback (2023 article) | No | Stale | **30** |
| GitHub Spark | Partial | curl | No | Yes (deprecated Aug 2026) | **40** |

### 2.9 Motion / DX exemplars (Group I)
| Product | Researched? | Docs read? | Videos? | Recent? | Confidence |
|---|---|---|---|---|---|
| Stripe | Yes | Deep (Connect blog 2017, Moesif teardown) | No | Partial | 75 |
| Figma | Yes | Partial | No | Yes | 60 |
| GitHub Primer | Yes | Deep (motion tokens, MUST/SHOULD/NEVER) | No | Yes | 75 |
| Atlassian DS | Yes | Partial | No | Yes | 60 |
| Vercel Geist | Yes | Partial | No | Yes | 60 |
| Linear Motion | Yes | Partial (Medium articles) | No | Yes | 70 |

### 2.10 Additional products (Group J — WEAKEST, 0 URLs)
| Product | Researched? | Docs read? | Videos? | Recent? | Confidence |
|---|---|---|---|---|---|
| Helix | Snippets only | No (page_reader 429) | No | Yes | **30** |
| Zed | Snippets only | No | No | Yes | **30** |
| Granola | Snippets only | No | No | Yes | **30** |
| Reflect | Snippets only | No | No | Yes | **25** |
| Microsoft Fluid Framework | Snippets only | No | No | Yes | **25** |
| DeepSeek-R1 | Snippets only | No | No | Yes | **35** |

### Aggregate per-product confidence average: ~57/100.

---

## 3. What Is Still Missing

### 3.1 Products not researched deeply enough (or at all)

**Missing entirely:**
- **xAI Grok** — not researched at all. Different interaction model (real-time X data).
- **Meta AI** — not researched. Massive distribution; different UX constraints.
- **Mistral Le Chat** — not researched. European alternative; Le Chat Pro has a different canvas model.
- **DeepSeek (the product, not just the model)** — only the model was snippet-researched.
- **Amazon Q (consumer + business)** — only Q Developer researched; Q Business (the agent builder) not researched.
- **Google NotebookLM** — NOT researched. This is a major gap: it's the canonical "AI + your documents" product with source-grounded citations — directly relevant to MiMo's memory + knowledge model.
- **Google AI Studio / Gemini Advanced canvas** — only surface-researched.
- **Microsoft Loop** — not researched (Fluid Framework was, but Loop the product wasn't).
- **Apple Notes AI / Reflect.ai / Granola / Mem.ai / Notion AI** — AI note-taking only snippet-researched. This is a gap because MiMo's Personal Model + Memory overlaps heavily with this category.
- **Cursor's competitor: Zed AI** — only snippet-researched.
- **Replit Ghostwriter** (predecessor to Agent) — not researched (historical context).
- **Vim / Emacs / Neovim** — not researched (power-user editor lineage, relevant to keyboard UX).
- **JetBrains AI Assistant** — not researched (different IDE UX tradition).
- **Warp / Wave terminal** — not researched (AI-native terminals, relevant to runtime UX).
- **Raycast AI vs. Alfred** — Alfred not researched (historical context for launcher UX).
- **Superhuman AI** — not researched (email-AI, relevant to notification + keyboard UX).
- **Dify / Flowise / Langflow** — visual agent builders, not researched (relevant to agent visualization).
- **OpenAI GPTs / GPT Store** — not researched (custom agent model).
- **Anthropic Claude for Work / Enterprise** — not researched (enterprise agent patterns).
- **Hugging Face Chat / Assistants** — not researched.
- **Perplexity Labs / Comet (browser)** — not researched. Perplexity's browser is a major new surface.
- **Arc Search / Arc Max** — Arc browser researched, but Arc Search (mobile) not separately.
- **SigmaOS / Sidekick browser** — other "browser as OS" attempts, not researched.

### 3.2 Products that have changed recently (may have stale data)
- **ChatGPT** — GPT-5 launch changed the surface (Canvas sunset). Research captured this but not the post-GPT-5 state.
- **Claude** — Claude 4 + Projects evolution. Research captured Projects but not the latest agent mode.
- **Gemini 3** — launched recently; research may be pre-Gemini-3.
- **Cursor 3** — research captured v3 (May 2026) but the agent-first interface is still new; consensus may shift.
- **Replit Agent** — rapidly iterating (v4); research may lag.
- **Apple Intelligence** — iOS 19 / macOS 26 may have changed the surface; research used 2024-2025 sources.
- **Notion AI** — Notion's AI surfaces are in flux; the "8 AI surfaces" claim may be outdated.
- **Linear** — Linear's Agents feature (launched 2025) was mentioned but not deeply studied.

### 3.3 Missing interaction models
- **Voice-first interaction** (beyond VoiceMode) — not researched. Whisper, Alexa, Siri voice UX patterns.
- **Multimodal interaction** (voice + touch + gesture) — not researched.
- **Pen / stylus input** (Apple Pencil, Samsung S-Pen) — not researched. Relevant to canvas/artifact UX.
- **Eye tracking** (Apple Vision Pro) — not researched. Relevant to focus + accessibility.
- **Spatial computing** (visionOS) — only Liquid Glass aesthetics researched, not spatial interaction patterns.
- **Drag-and-drop semantics** across surfaces — not deeply studied.
- **Context menus / right-click** — not researched (vs. keyboard-first).
- **Undo / redo patterns** — not researched beyond Aider auto-commit.
- **Multi-window / multi-monitor** — not researched. MiMo assumes single-window; multi-window is a gap.

### 3.4 Missing AI UX trends
- **Speculative execution** (AI predicts your next action) — not researched.
- **Streaming UI patterns** (beyond text streaming) — partial.
- **Tool-use visualization** (MCP tool calls) — partial.
- **Memory editing UX** (how users correct AI memory) — not researched.
- **Hallucination surfacing** (how products show uncertainty) — partial (Primer's `/* check-token */` only).
- **Model routing UX** (how users pick models) — partial.
- **Cost / token transparency** (when users care) — partial.
- **On-device vs cloud AI UX** — partial (Apple Intelligence).
- **Agentic browser / computer-use** — partial (Manus, CogAgent).
- **AI-generated UI** (UI that the AI builds on the fly) — not researched.

### 3.5 Missing workspace paradigms
- **Tiling window managers** (i3, sway, Hyprland) — not researched. Relevant to panel system.
- **Spaces / virtual desktops** (macOS Spaces, Linux workspaces) — Arc was researched; OS-level spaces weren't.
- **Stage Manager** (macOS) — not researched.
- **Mission Control / Exposé** — not researched. Relevant to tab overview.
- **Multi-monitor ergonomics** — not researched.

### 3.6 Missing desktop application patterns
- **Electron vs native** performance patterns — not researched.
- **Crash recovery** (auto-restore) — not researched beyond Aider.
- **Deep linking** (URL schemes) — not researched.
- **System tray / menu bar** presence — not researched.
- **Global hotkeys** (system-wide) — not researched.
- **File system integration** (drag from Finder/Explorer) — not researched.
- **Clipboard management** — not researched.

### 3.7 Missing operating-system metaphors
- **Process / task model** (Unix processes) — not researched as a metaphor.
- **File system semantics** (files, folders, permissions) — partial.
- **Daemons / services** — mentioned but not deeply researched.
- **Pipes / IPC** — not researched (relevant to agent-to-agent communication).
- **Permissions / ACLs** — partial (Codex sandbox modes).
- **Scheduling** (cron, systemd timers) — mentioned (daemon mode) but not deeply researched.

### 3.8 Missing accessibility research
- **Screen reader UX for AI** (how NVDA/JAWS/VoiceOver handle streaming AI) — not researched.
- **Switch control / eye gaze** — not researched.
- **Cognitive accessibility** (ADHD, autism-friendly UX) — not researched.
- **Dyslexia-friendly typography** — not researched.
- **Color blindness** (beyond WCAG AA) — not deeply researched.
- **Motor accessibility** (beyond 44px tap targets) — not researched.
- **Seizure safety** (photosensitive) — not researched.
- **Internationalization** (RTL is covered; other locales not) — partial.

### 3.9 Missing keyboard workflow research
- **Vim modal editing** — Helix was snippet-researched; Vim/Neovim not.
- **Emacs keybindings** — not researched.
- **Read-the-line editors** (nano, micro) — not relevant.
- **Modal vs chord shortcuts** — not researched.
- **Keyboard layout differences** (QWERTY, AZERTY, Dvorak, Colemak, Arabic) — not researched.
- **Mac vs Windows vs Linux key conventions** (Cmd vs Ctrl) — partial.

### 3.10 Missing motion research
- **Lottie / Rive** patterns — not researched.
- **Web Animations API** vs Framer Motion — not researched.
- **Physics-based motion** (beyond springs) — partial.
- **Choreography** (multi-element animation) — not researched.
- **Reduced-motion alternatives** — partial.
- **Motion sickness triggers** — not researched.

### 3.11 Missing AI agent interaction research
- **Agent handoff** (human → agent → human) — partial.
- **Agent delegation** (parent → child) — partial (OpenHands).
- **Agent conflict resolution** — not researched.
- **Multi-agent UI** (when multiple agents work simultaneously) — partial.
- **Agent personality / tone** — not researched.
- **Agent memory of past interactions** — partial.

### 3.12 Missing multi-window research
- Not researched at all. MiMo assumes single-window. This is a gap for power users.

### 3.13 Missing productivity software research
- **Things 3 / Todoist / TickTick** — not researched (task UX).
- **Calendar apps** (Fantastical, Notion Calendar, Cron) — not researched.
- **Email clients** (Superhuman, Hey, Spark) — not researched.
- **Read-later** (Readwise, Pocket, Instapaper) — not researched.
- **Bookmark managers** (Raindrop, Pinboard) — not researched.
- **Time tracking** (Toggl, RescueTime) — not researched.

### 3.14 Missing HCI literature
- **Don Norman's Design of Everyday Things** — referenced conceptually, not cited.
- **Alan Cooper's About Face** — not cited.
- **Jef Raskin's The Humane Interface** — not cited.
- **Jakob Nielsen's heuristics** — not cited.
- **Ben Shneiderman's direct manipulation** — not cited.
- **HCI research on cognitive load** (Sweller's CLT) — not cited.
- **Fitts's Law** — not cited (relevant to tap targets).
- **Hick's Law** — not cited (relevant to choice overload).
- **Miller's Law (7±2)** — not cited (relevant to rail ≤8 icons — the rule was justified by research but not by the underlying law).
- **KLM / GOMS** keystroke models — not cited.
- **Distributed cognition** (Hutchins) — not cited.

### 3.15 Anything else
- **User testing / interviews** — none conducted. This is all secondary research.
- **Quantitative data** — none. All qualitative.
- **Longitudinal studies** — none. We don't know how these products perform over months of use.
- **Competitive teardown videos** — none watched.
- **Live UX observation** — none. All from articles/snippets.
- **Official design system code** — partial (Primer, Geist docs; not code repos).
- **Open-source code review** — none (e.g., we didn't read Cursor's / Linear's source if available).
- **Patent research** — none (Apple's spatial interaction patents, etc.).
- **Academic papers** — only the Manus arxiv paper. No CHI / UIST / CSCW papers.
- **Error / failure case studies** — partial (Continue.dev issues).
- **Onboarding research** — none (we decided "no onboarding" without studying onboarding patterns).
- **Pricing / business model impact on UX** — partial (credit counters).
- **Trust / safety research** — partial.
- **Privacy regulation impact** (GDPR, CCPA) on UX — none.

---

## 4. RESEARCH GAPS

Every gap that still exists, even if small.

### Critical gaps (would change design decisions)

1. **No live UX observation.** Every claim is from articles or search snippets. We never actually used ChatGPT, Claude, Cursor, Linear, Notion, Arc, etc. and recorded the interaction. This is the single biggest gap. A senior architect would reject research that didn't include hands-on use.

2. **No NotebookLM research.** Google NotebookLM is the canonical "AI + your documents" product with source-grounded citations — directly competitive with MiMo's Memory + Knowledge model. Omitting it is a serious blind spot.

3. **No voice-first interaction research.** MiMo has a VoiceMode but we didn't study how voice-AI products (Alexa, Siri, ChatGPT Voice, Claude Voice) handle long sessions, interruptions, privacy.

4. **No multi-window / multi-monitor research.** MiMo assumes single-window. Power users (the target audience) often use multiple monitors. This is a significant assumption left unexamined.

5. **No HCI literature grounding.** The "rail ≤ 8 icons" rule is justified by research observations but NOT by Miller's Law (7±2), which is the actual cognitive-science basis. Several other rules similarly lack theoretical grounding.

6. **No quantitative data.** All research is qualitative. We have no data on: actual task completion times, error rates, user satisfaction scores, retention, etc. for any product.

7. **No longitudinal data.** We don't know how these products perform after 6+ months of daily use. Our "long session" claims are inferred, not observed.

8. **No user testing.** No users (even the owner) were tested on the proposed MiMo design. The spec is a hypothesis, not a validated design.

9. **No accessibility user research.** We cited WCAG AA and 44px tap targets but didn't research how actual screen-reader users, motor-impaired users, or cognitively-impaired users experience AI products.

10. **No internationalization beyond RTL.** Arabic + English is covered. Other RTL languages (Hebrew, Persian), CJK (Chinese, Japanese, Korean) layout, Indic scripts — not researched.

### Significant gaps (would refine design decisions)

11. **Group J (21 philosophical angles) has 0 cited URLs.** It relied entirely on search snippets because page_reader was rate-limited. This is the foundational philosophical document and it's the weakest. A senior architect would reject it.

12. **Group H (system-level AI) is the weakest product research.** All 11 page_reader calls returned 429; fell back to curl + Wayback. Apple Intelligence, MS Copilot, LangGraph, Dust.tt, AutoGPT, GitHub Spark are all under-researched. Confidence: 30-45%.

13. **No videos watched.** Modern product UX is often best understood through video demos (YouTube, Loom). None were watched.

14. **No official design system code reviewed.** Primer, Geist, Atlassian have open-source design systems. We read docs but didn't review the code (component APIs, token implementations).

15. **No open-source product code reviewed.** Continue.dev, OpenHands, Aider are open-source. We didn't read their source to verify UX claims.

16. **No academic papers** beyond the Manus arxiv paper. No CHI, UIST, CSCW, DIS research on AI assistants, agent UX, or cognitive load in AI tools.

17. **No competitive teardown videos.** Linear's design process videos, Figma's Config talks, Apple's WWDC sessions — none watched.

18. **No pricing/business-model impact research beyond credit counters.** How does freemium vs paid vs enterprise affect UX? Not studied.

19. **No error / failure case studies beyond Continue.dev.** How do products handle model failures, network failures, agent loops? Partial.

20. **No onboarding research.** We decided "no onboarding wizard" without studying onboarding patterns (Slack, Notion, Linear, Figma all have distinct onboarding).

21. **No mobile companion research.** We decided "mobile is for review/approve only" without studying mobile companion patterns (v0 iOS, Manus phone dispatch, Linear mobile).

22. **No tablet research.** Size-class model mentioned but tablet-specific UX (split view, slide over, drag-and-drop) not researched.

23. **No stylus / pen research.** Apple Pencil, Samsung S-Pen — relevant to canvas/artifact UX.

24. **No spatial computing research.** visionOS interaction patterns (eyes + pinch) not researched.

25. **No drag-and-drop semantics research.** How do products handle cross-surface drag? Not studied.

26. **No clipboard management research.** Power users live in the clipboard. Not studied.

27. **No global hotkey research.** System-wide hotkeys (Raycast, Alfred) — partial.

28. **No deep-linking / URL scheme research.** How do desktop apps integrate with URLs? Not studied.

29. **No system tray / menu bar research.** Background presence patterns — not studied.

30. **No crash recovery research.** How do products auto-restore? Partial (Aider).

31. **No process / task model research.** Unix process model as a metaphor for agents — not studied.

32. **No IPC / pipes research.** Agent-to-agent communication patterns — not studied.

33. **No scheduling research.** Cron/systemd patterns for daemon mode — mentioned, not studied.

34. **No speculative execution research.** AI predicting next action — not studied.

35. **No AI-generated UI research.** UI that the AI builds on the fly — not studied.

36. **No multimodal interaction research.** Voice + touch + gesture combined — not studied.

37. **No eye-tracking research.** Vision Pro eye interaction — not studied.

38. **No motion-sickness research.** VR/AR motion patterns — not studied.

39. **No Lottie / Rive research.** Animation format patterns — not studied.

40. **No Web Animations API research.** vs Framer Motion — not studied.

41. **No choreography research.** Multi-element animation — not studied.

42. **No tiling window manager research.** i3, sway, Hyprland — not studied.

43. **No OS spaces / virtual desktop research.** macOS Spaces, Linux workspaces — not studied (Arc was, OS-level wasn't).

44. **No Stage Manager research.** macOS — not studied.

45. **No Mission Control / Exposé research.** Tab overview patterns — not studied.

46. **No productivity software research.** Things 3, Todoist, Fantastical, Superhuman, Readwise — none studied.

47. **No patent research.** Apple's interaction patents — not studied.

48. **No privacy regulation research.** GDPR / CCPA impact on UX — not studied.

49. **No trust / safety empirical research.** How trust is built/broken empirically — not studied.

50. **No cognitive-load empirical research.** Sweller's CLT applied to AI tools — not studied.

### Minor gaps

51. **No research on color psychology** (how accent colors affect mood over long sessions).
52. **No research on sound design** (interface sounds, AI "thinking" sounds).
53. **No research on haptics** (trackpad force touch, phone haptics).
54. **No research on dark mode vs light mode long-session impact.**
55. **No research on font rendering** across platforms (beyond the system-font stack decision).
56. **No research on scroll behavior** (momentum, snap, infinite scroll patterns).
57. **No research on zoom / scale** patterns.
58. **No research on fullscreen / focus mode.**
59. **No research on notifications across platforms** (macOS Notification Center, Windows toast).
60. **No research on file dialogs** (open/save patterns).

---

## 5. INVALID ASSUMPTIONS

Every assumption made without strong evidence. If inferred rather than verified, stated clearly.

1. **ASSUMPTION: "Conversation-spine + canvas-per-mode is unique."**
   - **Status:** INFERRED, not verified. We didn't survey every AI product exhaustively. There may be a lesser-known product that already does this.
   - **Risk:** If a product already does this, MiMo's "unique recombination" claim collapses.

2. **ASSUMPTION: "Single-user local-first is the right architecture."**
   - **Status:** INFERRED from trust research (Anytype, Granola, Bolt, Linear). But MiMo's target user (a developer in Palestine/Gulf region) may have different connectivity, hardware, and sync needs that we didn't research.
   - **Risk:** Local-first may not fit the user's actual environment.

3. **ASSUMPTION: "The owner is developer + operator + user."**
   - **Status:** Given by the user. NOT independently verified.
   - **Risk:** If the owner's role or skill level changes, the design may not adapt.

4. **ASSUMPTION: "No credit counters" is always right.**
   - **Status:** INFERRED from Genspark/Lovable/v0 anti-patterns. But we didn't research whether counters can be motivating (Tabnine's "% AI-generated" was noted as potentially motivating).
   - **Risk:** Total removal of progress metrics may reduce motivation for some users.

5. **ASSUMPTION: "Rail ≤ 8 icons" is the right limit.**
   - **Status:** INFERRED from Linear/Raycast/Apple observations. NOT grounded in Miller's Law (7±2) explicitly. 8 is arbitrary within the 7±2 range.
   - **Risk:** The limit may be too strict (some users want more) or too loose (cognitive research suggests 4-6 for working memory).

6. **ASSUMPTION: "Hold-Space peek" is universally desirable.**
   - **Status:** INFERRED from Linear only. We didn't verify this pattern works in other contexts or for other users.
   - **Risk:** Space is a common key; hold-Space may conflict with scrolling or other uses.

7. **ASSUMPTION: "⌘⇧Tab for Quick AI" is discoverable and ergonomic.**
   - **Status:** COPIED from Raycast. NOT verified for MiMo's context.
   - **Risk:** Three-key chord (even if 2 modifiers) may be hard for some users; Tab key has other uses (focus navigation).

8. **ASSUMPTION: "Sequential pipeline is better than parallel agents."**
   - **Status:** INFERRED from Manus's parallel-execution-confuses-users claim. But we didn't deeply research when parallelism IS beneficial.
   - **Risk:** MiMo may be artificially limited by sequential-only.

9. **ASSUMPTION: "Per-task-type trust" is the right approval model.**
   - **Status:** INFERRED from Codex/Manus approval-fatigue complaints. NOT verified that per-task-type is better than per-instance in practice.
   - **Risk:** Per-task-type may be too coarse or too fine.

10. **ASSUMPTION: "44px tap targets" are sufficient.**
    - **Status:** COPIED from Apple HIG. NOT verified for MiMo's specific UI density.
    - **Risk:** May be too small for some users or too large for dense UIs.

11. **ASSUMPTION: "WCAG AA" is the right accessibility standard.**
    - **Status:** COPIED as industry default. NOT researched whether AAA is needed for long-session AI use.
    - **Risk:** AA may be insufficient for multi-hour reading.

12. **ASSUMPTION: "4px base spacing scale" is correct.**
    - **Status:** COPIED from Material + Fluent convergence. NOT verified for MiMo's specific layout needs.
    - **Risk:** May be too dense or too sparse for MiMo's content.

13. **ASSUMPTION: "9 type roles" is the right number.**
    - **Status:** INFERRED from Apple + Material + Fluent convergence. NOT verified for MiMo.
    - **Risk:** May be too many (cognitive load for designers) or too few (insufficient hierarchy).

14. **ASSUMPTION: "5 elevation levels" is correct.**
    - **Status:** INFERRED from Material (6) + Fluent (6) convergence to 5. NOT verified.
    - **Risk:** May be insufficient for complex UIs.

15. **ASSUMPTION: "Mobile is companion, not primary."**
    - **Status:** INFERRED from v0/Manus. NOT researched for MiMo's actual user behavior.
    - **Risk:** The owner may actually prefer mobile for some tasks.

16. **ASSUMPTION: "No onboarding wizard" is right.**
    - **Status:** INFERRED from Apple's calm deference. NOT researched (we didn't study onboarding patterns).
    - **Risk:** New users (even the owner, after a break) may struggle without onboarding.

17. **ASSUMPTION: "One AI surface (conversation)" is always right.**
    - **Status:** INFERRED from Notion's 8 AI surfaces anti-pattern. NOT verified that one surface scales to all use cases.
    - **Risk:** Some tasks (e.g., bulk operations) may need a second surface.

18. **ASSUMPTION: "Fork is the only branch primitive."**
    - **Status:** INFERRED from Lovable/v0 container sprawl. NOT verified that fork alone is sufficient.
    - **Risk:** May be too limited for complex project structures.

19. **ASSUMPTION: "Project is the only container."**
    - **Status:** INFERRED. NOT verified.
    - **Risk:** May be too coarse for organizing work.

20. **ASSUMPTION: "Inline ExecutionTrace" is better than a separate dock.**
    - **Status:** INFERRED from Don Syme's regret. NOT verified that inline is always better (it may clutter long conversations).
    - **Risk:** Inline traces may bloat the conversation history.

21. **ASSUMPTION: "Per-hunk accept/reject" is the right granularity.**
    - **Status:** COPIED from Cursor. NOT verified for non-code artifacts.
    - **Risk:** Per-hunk may not translate to markdown, images, etc.

22. **ASSUMPTION: "Emphasized cubic-bezier (0.05, 0.7, 0.1, 1.0)" is the right default.**
    - **Status:** COPIED from Material. NOT verified for MiMo's motion needs.
    - **Risk:** May feel too slow or too fast.

23. **ASSUMPTION: "Instant-enter, 150ms-exit" is the right asymmetry.**
    - **Status:** COPIED from Linear. NOT verified for MiMo.
    - **Risk:** Instant enter may feel jarring for some transitions.

24. **ASSUMPTION: "500ms hard ceiling" on motion duration.**
    - **Status:** COPIED from Stripe/Primer. NOT verified.
    - **Risk:** Some complex transitions may need more.

25. **ASSUMPTION: "Local-first + E2E" builds trust.**
    - **Status:** INFERRED from Anytype/Granola. NOT empirically tested on MiMo's target user.
    - **Risk:** The user may not care about E2E; or may need cloud features.

26. **ASSUMPTION: "The owner wants Arabic + English."**
    - **Status:** Given. NOT independently verified.
    - **Risk:** The owner's language needs may change.

27. **ASSUMPTION: "Desktop-first" is correct.**
    - **Status:** INFERRED from the spec. NOT researched against actual usage patterns.
    - **Risk:** The owner may work more on laptop/tablet than desktop.

28. **ASSUMPTION: "Zustand + Prisma + Next.js" is the right stack.**
    - **Status:** Given by the project setup. NOT researched against alternatives.
    - **Risk:** May not be optimal for MiMo's specific needs (e.g., local-first may need a CRDT, not just Prisma).

29. **ASSUMPTION: "Framer Motion" is the right animation library.**
    - **Status:** Given by the project setup. NOT researched against Motion One, GSAP, or Web Animations API.
    - **Risk:** May have performance or capability limits.

30. **ASSUMPTION: "shadcn/ui (New York)" is the right component library.**
    - **Status:** Given. NOT researched against Radix directly, Headless UI, or Park UI.
    - **Risk:** May impose constraints that conflict with the spec.

31. **ASSUMPTION: "The 6-stage Core pipeline (Context → Reason → Plan → Execute → Validate → Done)" is correct.**
    - **Status:** Inherited from the existing MiMo Core. NOT re-validated against the new research.
    - **Risk:** The pipeline may need a 7th stage (e.g., Reflect, or Consolidate) or fewer.

32. **ASSUMPTION: "The owner has the technical skill to use a Developer Mode."**
    - **Status:** INFERRED from "owner = developer." NOT verified.
    - **Risk:** If the owner is not always in a developer mindset, devMode may be underused.

33. **ASSUMPTION: "Daemon mode" (scheduled agent runs) is desirable.**
    - **Status:** INFERRED from Manus + Granola. NOT verified the owner wants autonomous background work.
    - **Risk:** May feel invasive or uncontrollable.

34. **ASSUMPTION: "MCP integration" is the right plugin architecture.**
    - **Status:** COPIED from industry trend. NOT deeply researched.
    - **Risk:** MCP may not be the right model for a single-user OS.

35. **ASSUMPTION: "No videos watched" is acceptable.**
    - **Status:** Methodological gap. Product UX is often best understood through demos.
    - **Risk:** We may have missed interaction details only visible in motion.

---

## 6. HIGH-RISK DESIGN DECISIONS

Every important design decision that depends on weak evidence.

### HR-01: Conversation-spine + canvas-per-mode (the central thesis)
- **Risk level:** CRITICAL.
- **Why risky:** This is MiMo's defining bet, and it rests on:
  - Don Syme's retrospective (one person's regret, not empirical).
  - Research insight #5 (an inference that no product combines these — but we didn't survey every product).
  - No user testing.
- **If wrong:** The entire product is wrong. There's no fallback.
- **Evidence strength:** 4/10.

### HR-02: One AI surface (the conversation)
- **Risk level:** HIGH.
- **Why risky:** Notion's 8 AI surfaces is the anti-pattern, but we didn't verify that ONE surface scales to every use case (bulk operations, ambient AI, agent monitoring may need a second surface).
- **If wrong:** Some tasks become impossible or awkward.
- **Evidence strength:** 5/10.

### HR-03: Hold-Space peek as a defining interaction
- **Risk level:** HIGH.
- **Why risky:** Only Linear does this. We didn't verify it works in other contexts or for other users. Space is a common key with other uses (scrolling, page-down).
- **If wrong:** The keyboard language is broken.
- **Evidence strength:** 3/10.

### HR-04: ⌘⇧Tab Quick AI on selection
- **Risk level:** HIGH.
- **Why risky:** Copied from Raycast. We didn't test ergonomics or discoverability. Tab key has other uses (focus navigation).
- **If wrong:** The killer feature is unusable.
- **Evidence strength:** 4/10.

### HR-05: Rail ≤ 8 icons hard cap
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from observations, not grounded in Miller's Law explicitly. 8 is arbitrary within 7±2.
- **If wrong:** Either too strict (limits features) or too loose (cognitive overload).
- **Evidence strength:** 6/10.

### HR-06: Sequential pipeline only (no parallel agents by default)
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from Manus's parallel-confuses-users. But we didn't research when parallelism IS beneficial.
- **If wrong:** MiMo is artificially slow for independent sub-tasks.
- **Evidence strength:** 5/10.

### HR-07: Per-task-type trust (not per-instance)
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from Codex/Manus approval-fatigue. Not empirically tested.
- **If wrong:** Either too much friction or too much risk.
- **Evidence strength:** 5/10.

### HR-08: No onboarding wizard
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from Apple's calm deference. We didn't study onboarding patterns.
- **If wrong:** New/returning users struggle.
- **Evidence strength:** 4/10.

### HR-09: Inline ExecutionTrace (not a separate dock)
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from Don Syme's regret. But inline may clutter long conversations.
- **If wrong:** Conversation history becomes bloated with trace artifacts.
- **Evidence strength:** 5/10.

### HR-10: Local-first + E2E as the trust foundation
- **Risk level:** HIGH.
- **Why risky:** Inferred from Anytype/Granola. But MiMo's target user (Palestine/Gulf region) may have different connectivity, hardware, and sync needs that we didn't research.
- **If wrong:** Trust features may not actually build trust for this user; or may block needed cloud features.
- **Evidence strength:** 5/10.

### HR-11: No credit/quota counters (ever)
- **Risk level:** LOW-MEDIUM.
- **Why risky:** Inferred from Genspark/Lovable/v0. But we noted Tabnine's "% AI-generated" could be motivating.
- **If wrong:** Removing all progress metrics may reduce motivation.
- **Evidence strength:** 6/10.

### HR-12: Mobile is companion only
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from v0/Manus. Not researched against actual user behavior.
- **If wrong:** Mobile features are under-built.
- **Evidence strength:** 4/10.

### HR-13: 9 type roles / 5 elevation levels / 4px spacing / Emphasized bezier / 500ms ceiling
- **Risk level:** LOW.
- **Why risky:** Copied from industry convergence. Not verified for MiMo.
- **If wrong:** Minor aesthetic/ergonomic issues.
- **Evidence strength:** 7/10.

### HR-14: Fork as the only branch primitive
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from Lovable/v0 sprawl. Not verified fork alone is sufficient.
- **If wrong:** Complex project structures can't be represented.
- **Evidence strength:** 5/10.

### HR-15: Project as the only container
- **Risk level:** MEDIUM.
- **Why risky:** Inferred. Not verified.
- **If wrong:** Organization is too coarse.
- **Evidence strength:** 5/10.

### HR-16: Zustand + Prisma + Next.js + Framer Motion + shadcn/ui stack
- **Risk level:** LOW (given by project).
- **Why risky:** Not researched against alternatives (CRDT for local-first, Motion One for perf, etc.).
- **If wrong:** Performance or capability limits.
- **Evidence strength:** 6/10.

### HR-17: 6-stage Core pipeline
- **Risk level:** MEDIUM.
- **Why risky:** Inherited from existing MiMo. NOT re-validated against new research.
- **If wrong:** Pipeline may need a Reflect/Consolidate stage or fewer stages.
- **Evidence strength:** 5/10.

### HR-18: Developer Mode hidden by default
- **Risk level:** LOW.
- **Why risky:** Inferred from spec. Not researched.
- **If wrong:** Power users (the target) may want it always visible.
- **Evidence strength:** 6/10.

### HR-19: No multi-window / split-view in v1
- **Risk level:** MEDIUM.
- **Why risky:** Assumes single-window. Power users often use multi-monitor.
- **If wrong:** Power users are frustrated.
- **Evidence strength:** 4/10.

### HR-20: Daemon mode (scheduled agent runs)
- **Risk level:** MEDIUM.
- **Why risky:** Inferred from Manus + Granola. Not verified the owner wants autonomous background work.
- **If wrong:** Feels invasive.
- **Evidence strength:** 4/10.

---

## 7. RESEARCH CONFIDENCE MATRIX

| Domain | Score (0-100) | Why |
|---|---|---|
| **Product Research** | 55 | 32 products covered, but depth varies wildly. Group H (system-level AI) and Group J (philosophical) are weak. Several major products missing (NotebookLM, Grok, Meta AI, Mistral Le Chat, JetBrains AI, Warp, etc.). No live UX observation, no videos. |
| **UX** | 60 | General UX patterns captured, but no empirical testing, no user research, no HCI literature grounding. |
| **Interaction** | 55 | Interaction patterns captured from articles, but no hands-on verification. Multi-window, voice, pen, eye-tracking missing. |
| **Information Architecture** | 65 | Container/tab/sidebar philosophy well-argued, but rests on inferences (one container, one branch). Not validated. |
| **Motion** | 70 | Group I is strong (Primer, Linear, Stripe well-researched). But no Lottie/Rive, no choreography, no motion-sickness. |
| **Accessibility** | 40 | WCAG AA + 44px + reduced-motion cited. But no screen-reader research, no cognitive accessibility, no motor accessibility, no empirical testing. |
| **Design Systems** | 65 | Apple/Material/Fluent covered. But official code repos not reviewed. Material 3 is in flux (M3 Expressive). |
| **AI Interfaces** | 55 | Chat + coding + builder + agent platforms covered. But system-level (Apple Intelligence, MS Copilot) weak. NotebookLM missing. Voice AI missing. |
| **Developer UX** | 60 | Cursor, Claude Code, Codex covered. But JetBrains, Vim/Emacs, Warp terminal missing. No open-source code review. |
| **Workspace UX** | 55 | VS Code, Linear, Arc covered. But multi-window, tiling WMs, OS spaces, Stage Manager missing. |
| **Keyboard UX** | 50 | Linear, Raycast, VS Code covered. But Vim/Emacs/Helix only snippet-researched. Keyboard layout differences missing. |
| **Agent UX** | 55 | Cursor, Manus, Claude Code, OpenHands covered. But multi-agent UI, agent handoff, conflict resolution weak. |
| **Execution UX** | 60 | Gemini Deep Research, Manus computer, Cursor diffs covered. But speculative execution, tool-use visualization partial. |
| **Mental Models** | 50 | Metaphors discussed (collaborator, not tool/intern). But not grounded in HCI literature (Norman, Raskin). |
| **Performance Perception** | 65 | Linear local-first well-researched. But no Electron vs native, no crash recovery, no quantitative data. |
| **Trust** | 55 | Architectural trust (local-first, E2E) well-argued. But no empirical trust research, no privacy regulation impact. |
| **Explainability** | 50 | Perplexity/Heptabase/Tana citations covered. But LangGraph was weakly researched (Group H 429s). DeepSeek-R1 only snippet. |
| **Visual Hierarchy** | 60 | Eye-flow rules established. But no color psychology, no dark/light long-session impact, no font rendering research. |
| **Human Factors** | 30 | Almost no HCI literature grounding. Fitts's Law, Hick's Law, Miller's Law, Sweller's CLT, KLM/GOMS all uncited. Major gap. |
| **Power User UX** | 50 | Linear/Raycast/Helix covered. But Vim/Emacs, multi-window, global hotkeys, clipboard management missing. |

**Overall average confidence: ~55/100.**

---

## 8. Final Answer

### "Is the research mature enough to become the permanent foundation of MiMo?"

## **NO.**

---

## 9. Required Additional Research Plan

Before the Product Bible can begin, the following additional research must be completed. Estimated effort: 3-5 days of focused research.

### Phase R2-1: Fill critical product gaps (1 day)

**Must research deeply (live UX + docs + recent):**
1. **Google NotebookLM** — the canonical "AI + your documents" product. Directly competitive with MiMo's Memory + Knowledge model. HIGH PRIORITY.
2. **Cursor** hands-on — actually use Cursor for 2 hours; record the interaction; verify the "editor-first" + "per-file accept/reject" claims.
3. **Linear** hands-on — actually use Linear for 2 hours; verify the "hold-Space peek," local-first performance, and keyboard claims.
4. **Claude (with Projects + Artifacts)** hands-on — verify the artifact runtime + CSP sandbox claims.
5. **ChatGPT (GPT-5 post-Canvas)** hands-on — verify the post-Canvas state.
6. **Manus** hands-on (if accessible) — verify the "live computer" pane claims.
7. **Obsidian + Heptabase + Tana** hands-on — verify the PKM claims (block refs, supertags, whiteboard).
8. **Raycast** hands-on — verify the ⌘⇧Tab Quick AI ergonomics.

**Must research via docs/videos (if hands-on impossible):**
9. **xAI Grok** — interaction model with real-time X data.
10. **Meta AI** — distribution + UX constraints.
11. **Mistral Le Chat Pro** — canvas model.
12. **JetBrains AI Assistant** — different IDE UX tradition.
13. **Warp / Wave terminal** — AI-native terminal UX.
14. **Perplexity Comet (browser)** — Perplexity's new browser surface.
15. **Apple Notes AI / Reflect.ai / Mem.ai / Granola** — AI note-taking (for Personal Model + Memory overlap).
16. **Superhuman AI** — email-AI keyboard + notification UX.
17. **Fantastical / Notion Calendar / Cron** — calendar UX (for Personal Model planning).
18. **Things 3 / Todoist** — task UX.
19. **Dify / Flowise / Langflow** — visual agent builders (for agent visualization).

### Phase R2-2: Fill interaction model gaps (0.5 day)

**Must research:**
20. **Voice-first interaction** — ChatGPT Voice, Claude Voice, Alexa, Siri. How long sessions, interruptions, privacy are handled.
21. **Multi-window / multi-monitor patterns** — how power users actually work across windows. Implications for MiMo.
22. **Pen / stylus input** — Apple Pencil, S-Pen. Canvas/artifact UX implications.
23. **Spatial computing (visionOS)** — eyes + pinch interaction. Future-relevance.
24. **Drag-and-drop semantics** across surfaces.
25. **Context menus / right-click** patterns vs. keyboard-first.
26. **Undo / redo patterns** beyond Aider.

### Phase R2-3: HCI literature grounding (0.5 day)

**Must cite and apply:**
27. **Miller's Law (7±2)** — ground the "rail ≤ 8 icons" rule.
28. **Hick's Law** — ground the "one command palette" rule.
29. **Fitts's Law** — ground the 44px tap target rule.
30. **Sweller's Cognitive Load Theory** — ground the "progressive disclosure" + "one model per dimension" rules.
31. **Jakob Nielsen's 10 heuristics** — audit MiMo's design against them.
32. **Don Norman's principles** — map MiMo's mental model to them.
33. **Ben Shneiderman's direct manipulation** — verify MiMo's canvas-per-mode aligns.
34. **KLM / GOMS** — model MiMo's keyboard workflows.
35. **Distributed cognition (Hutchins)** — ground the agent collaboration model.

### Phase R2-4: Accessibility deep research (0.5 day)

**Must research:**
36. **Screen reader UX for streaming AI** — how NVDA/JAWS/VoiceOver handle streaming text, ExecutionTrace, agent work.
37. **Cognitive accessibility** — ADHD/autism-friendly UX patterns for AI tools.
38. **Motor accessibility** — beyond 44px; switch control, eye gaze.
39. **Color blindness** — beyond WCAG AA; actual palette testing.
40. **Seizure safety** — photosensitive patterns to avoid.
41. **Internationalization beyond RTL** — CJK, Indic scripts.

### Phase R2-5: Motion + performance deep research (0.5 day)

**Must research:**
42. **Lottie / Rive** patterns — when to use which.
43. **Web Animations API vs Framer Motion** — performance comparison.
44. **Choreography** — multi-element animation patterns.
45. **Motion sickness triggers** — patterns to avoid.
46. **Electron vs native** performance — implications for MiMo's web stack.
47. **Crash recovery** patterns — auto-restore across products.
48. **Long-session performance data** — seek any published benchmarks (Linear, Notion, Figma) on 1000+ item performance.

### Phase R2-6: Re-do Group H and Group J properly (0.5 day)

**Must re-research with rate-limit mitigation (sequential, sleeps, or alternative SDK):**
49. **Apple Intelligence** — actual hands-on or deep docs; not Wayback snippets.
50. **Microsoft Copilot** — same.
51. **LangGraph Studio** — the agent-graph visualization is critical; verify the "state-edit-and-continue" + "time-travel debugging" claims.
52. **Dust.tt** — verify the trigger + per-agent observability claims.
53. **AutoGPT** — find recent (not 2023) assessments.
54. **GitHub Spark / Extensions** — verify the "Spaces as context bundles" + "@-mention" claims.
55. **Group J rewrite with cited URLs** — the 21 philosophical angles must be grounded in sources, not search snippets.

### Phase R2-7: Validate assumptions with the user (0.5 day)

**Must ask the user (the owner):**
56. **Connectivity / hardware** — what's the actual environment? (local-first fit)
57. **Multi-monitor usage** — does the owner use multiple monitors? (multi-window gap)
58. **Mobile usage patterns** — what does the owner actually do on mobile?
59. **Language needs** — Arabic + English only? Other locales?
60. **Voice usage** — does the owner want voice interaction?
61. **Daemon mode** — does the owner want autonomous background agent work?
62. **Developer mode frequency** — how often will the owner actually use devMode?
63. **Trust priorities** — what actually builds trust for this specific user?
64. **Onboarding need** — does the owner need onboarding after a break?
65. **Stack constraints** — is the Next.js + Prisma + Zustand stack fixed, or can we consider CRDT/Motion One/etc.?

### Phase R2-8: Open-source code review (0.5 day)

**Must read source code of:**
66. **Continue.dev** — verify the UX claims (sidebar, inline editor, context attach).
67. **OpenHands** — verify the event-stream + AgentDelegateAction claims.
68. **Aider** — verify the auto-commit + revert + repo-map claims.
69. **Primer** (design system repo) — verify the token + motion MUST/SHOULD/NEVER implementation.
70. **Geist** (design system repo) — verify the restraint claims.

### Phase R2-9: Academic literature (0.5 day)

**Must find and cite:**
71. **CHI / UIST / CSCW papers on AI assistants** — at least 5 recent papers.
72. **Papers on agent UX** — at least 3.
73. **Papers on cognitive load in AI tools** — at least 2.
74. **Papers on trust in AI** — at least 2.
75. **Papers on explainability in AI** — at least 2.

### Phase R2-10: Synthesis + re-audit (0.5 day)

76. **Update research archive** with all new findings.
77. **Re-write Group J** with cited URLs.
78. **Re-write Group H** with proper depth.
79. **Re-audit** against this document's framework.
80. **Only then** begin the Product Bible.

---

## Summary

The research phase is **NOT** mature enough to become the permanent foundation of MiMo. The current research is breadth-heavy but depth-uneven, with critical gaps in:

- Live UX observation (zero hands-on).
- HCI literature grounding (zero citations).
- NotebookLM and ~15 other relevant products.
- Multi-window / voice / pen / spatial interaction.
- Accessibility (beyond surface WCAG).
- Empirical validation (no user testing, no quantitative data).
- Group H (system-level AI) and Group J (philosophical) are weak.

The central thesis (conversation-spine + canvas-per-mode) is a 4/10 evidence-strength bet resting on inferences, not verification. Before it becomes the permanent foundation, the 10-phase R2 plan above must be completed (~3-5 days).

**Brutal honesty:** The current research is a good *starting point*, but it is not the "complete research" I previously claimed. A senior product architect would reject it as a foundation and demand the gaps be filled first.
