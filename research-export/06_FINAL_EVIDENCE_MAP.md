# MiMo FINAL EVIDENCE MAP
### Every major product decision mapped to evidence, confidence, alternatives, and status.

**Rule:** Every decision must cite A-grade or B-grade evidence. No decision rests on D-grade alone.

---

## Decision 1: Product Philosophy — Personal AI Operating System

**Decision:** MiMo is a Personal AI Operating System (conversation-spine + canvas-per-mode), not a chatbot, dashboard, or single-mode dev tool.

**Evidence (Grade A/B):**
- Don Syme's Copilot Workspace retrospective (corroborated via secondary): "didn't embrace chat as both output and place to give guidance" [Source: evidence/copilot-workspace.md §27, citing HN + engineering blogs — Grade B]
- Cursor wins by being editor-first [Source: evidence/cursor.md §2, citing cursor.com/docs — Grade A]
- ChatGPT/Claude are chat-first + artifact-decoration [Source: evidence/chatgpt.md §13, evidence/claude.md §13 — Grade A]
- Manus is agent-first + computer-pane [Source: evidence/manus.md §2 — Grade A]
- No product studied combines conversation-as-permanent-spine + canvas-as-adaptive-per-mode [Source: cross-product analysis of 54 products — Grade B]

**Confidence:** 85%
**Alternatives studied:** Editor-first (Cursor), chat-first (ChatGPT/Claude), agent-first (Manus), block-first (Notion), workspace-first (Lovable/v0), command-first (Linear/Raycast).
**Rejected because:** Each loses either conversational flow (Cursor, Manus) or working surface (ChatGPT, Claude).
**Status:** READY — strong evidence, no blocker.

---

## Decision 2: Mental Model — Senior Collaborator Who Never Forgets

**Decision:** MiMo is a "senior collaborator" — neutral (not tool/intern/teammate/pair), adapts depth per task.

**Evidence:**
- Mental models diverge: Devin=teammate, Aider=pair, Sweep=junior, Claude Code=tool, Cody=Swiss-army [Source: evidence/devin.md §3, evidence/aider.md §3, evidence/claude-code.md §3 — Grade A/B]
- Neutral "agent" framing avoids role-locked expectations [Source: academic/human-ai-interaction.md, citing Amershi 2019 — Grade A]
- MiMo's 8 modes (chat/research/code/writing/run/image/automation/data) require a model that adapts [Source: cross-product — Grade B]

**Confidence:** 80%
**Alternatives:** Teammate (Devin — too role-locked), Pair (Aider — too code-only), Tool (Claude Code — too passive).
**Status:** READY.

---

## Decision 3: Conversation Architecture — Permanent Spine, Inline Execution

**Decision:** Conversation is pinned tab #1, never replaced. ExecutionTrace renders inline in the streaming AI message (not a separate dock).

**Evidence:**
- Don Syme's regret: chat should be "both the output and the place to give guidance" [Source: evidence/copilot-workspace.md §27 — Grade B]
- Cursor's editor-first loses conversational flow for non-code tasks [Source: evidence/cursor.md §2 — Grade A]
- v0 static "waiting for generation" feels dead [Source: evidence/v0.md §12 — Grade B]
- Manus live runtime pane feels alive [Source: evidence/manus.md §8 — Grade A]
- Nielsen heuristic 1 (visibility of system status) [Source: academic/jakob-nielsen.md — Grade A]
- Shneiderman rule 4 (dialog closure) [Source: academic/ben-shneiderman.md — Grade A]

**Confidence:** 88%
**Alternatives:** Separate execution dock (loses inline flow); spinner (feels dead); no execution viz (no trust).
**Status:** READY.

---

## Decision 4: Workspace Architecture — One Container (Project) + One Branch (Fork)

**Decision:** Project is the ONLY container. Fork is the ONLY branch primitive. No Workspace/Repl/Remix/Branch/Template/Skill sprawl.

**Evidence:**
- Lovable has 7 container concepts → cognitive overload [Source: evidence/lovable.md §6 — Grade A]
- v0 has 8 container concepts → cognitive overload [Source: evidence/v0.md §6 — Grade A]
- Notion has 8 AI surfaces → users cannot form one predictive model [Source: evidence/notion.md §8 — Grade A]
- Linear has ONE issue list + clean sidebar → premium feel [Source: evidence/linear.md §5 — Grade A]
- CLT: cognitive overload = feature accretion without model reconciliation [Source: academic/cognitive-load-theory.md — Grade A]
- Cross-cutting insight #1: "one model applied orthogonally" is the deepest finding [Source: research-group-J.md §Cross-cutting — Grade B]

**Confidence:** 90%
**Alternatives:** Multiple containers (Lovable/v0 — rejected: overload); no containers (rejected: no organization).
**Status:** READY — strong evidence.

---

## Decision 5: Navigation — Left Rail ≤8 + Top Bar + Right Adaptive Sidebar

**Decision:** Rail = 6 nav + 1 account + conditional dev (≤8). Top bar = command + project chip + mode selector + tabs. Right sidebar = adaptive by mode.

**Evidence:**
- Miller's Law (7±2) [Source: academic/millers-law.md — Grade A]
- Hick's Law (choice overload) [Source: academic/hicks-law.md — Grade A]
- Linear rail never exceeds a handful of icons [Source: evidence/linear.md §5 — Grade A]
- Arc sidebar congestion (bookmarks+tabs+folders+spaces in one rail) [Source: evidence/arc.md §5 — Grade B]
- Notion sidebar with 30+ favorited items [Source: evidence/notion.md §5 — Grade A]
- VS Code 2-sidebar trap [Source: evidence/vscode.md §5 — Grade A]

**Confidence:** 88%
**Alternatives:** 12+ icons (Notion — rejected: overload); no rail (rejected: too steep); 2 sidebars (VS Code — rejected: trap).
**Note:** Cowan's 2001 critique (4±1) suggests 4-6 may be more accurate than 7-8. MiMo's 6 nav + 1 account = 7 is within both ranges. ACCEPTED LIMITATION — conservative either way.
**Status:** READY.

---

## Decision 6: Projects — First-class with Accent + MIMO.md + Layout Persistence

**Decision:** Each project has: accent color (per-Space Arc pattern), MIMO.md grounding file (AGENTS.md convergence), scoped memory with hard toggle (ChatGPT Aug 2025), layout persistence (VS Code).

**Evidence:**
- Arc per-Space accent [Source: evidence/arc.md §5 — Grade B]
- AGENTS.md convergence: Cursor (.cursorrules), Codex (AGENTS.md 32KiB), Claude Code (CLAUDE.md 5-tier), Windsurf (.windsurfrules) [Source: evidence/cursor.md §9, evidence/codex.md §9, evidence/claude-code.md §9, evidence/windsurf.md §9 — Grade A]
- ChatGPT Project-only memory Aug 2025 [Source: evidence/chatgpt.md §9 — Grade A]
- VS Code layout persistence [Source: evidence/vscode.md §6 — Grade A]

**Confidence:** 90%
**Alternatives:** No project scoping (rejected: context bleed); no accent (rejected: no visual context reinforcement); no grounding file (rejected: re-stating preferences).
**Status:** READY.

---

## Decision 7: Tabs — Pinned Conversation + Spawnable + Ephemeral

**Decision:** Conversation is pinned #1. Artifacts/files/memory/knowledge/projects/dashboard spawn as tabs. Ephemeral tabs auto-archive with one-search recovery.

**Evidence:**
- Arc Pinned/Today + auto-archive [Source: evidence/arc.md §6 — Grade B]
- VS Code layout persistence [Source: evidence/vscode.md §6 — Grade A]
- Linear single-issue-list [Source: evidence/linear.md §5 — Grade A]
- Claude Artifacts as tab-able objects [Source: evidence/claude.md §13 — Grade A]
- ChatGPT Canvas (no named versions — weakness) [Source: evidence/chatgpt.md §13 — Grade B]

**Confidence:** 85%
**Alternatives:** No tabs (rejected: no multi-tasking); tab groups (deferred to v2: adds second model).
**Status:** READY.

---

## Decision 8: Agents — Living Workflow Pipeline (Not Static Cards)

**Decision:** Agents hidden when idle. When working: horizontal pipeline stepper (Context→Reason→Plan→Execute→Validate→Done) with real runtime motion per stage. Sequential, not parallel.

**Evidence:**
- Manus static agent cards = cognitive noise; live runtime pane = alive [Source: evidence/manus.md §8 — Grade A]
- Cursor per-hunk accept/reject on staged diffs [Source: evidence/cursor.md §8 — Grade A]
- OpenHands event-stream (12 types) [Source: evidence/openhands.md §8 — Grade A]
- LangGraph animated graph traversal + time-travel [Source: evidence/langgraph-studio.md §8 — Grade A]
- Z.ai defends single-agent-with-search-loop over multi-agent decomposition [Source: evidence/glm.md §8 — Grade B]
- Manus parallel-execution-confuses-users [Source: evidence/manus.md §27 — Grade A]
- Genspark 9+ named agents = overload [Source: evidence/genspark.md §27 — Grade B]

**Confidence:** 88%
**Alternatives:** Static agent cards (rejected: noise); parallel agents default (rejected: confusion); no agent viz (rejected: feels dead).
**Status:** READY.

---

## Decision 9: Agent Autonomy — Per-Task-Type Trust, Not Per-Instance

**Decision:** MiMo learns trust per task type. "Always allow this kind" after 3 approvals. Per-task-type + per-project + per-scope trust ledger.

**Evidence:**
- Codex per-instance approval storms = #1 complaint [Source: evidence/codex.md §27 — Grade A]
- Manus per-command approval fatigue [Source: evidence/manus.md §27 — Grade A]
- Claude Code 6 permission modes + hooks [Source: evidence/claude-code.md §8 — Grade A]
- Codex named approval policies (untrusted/on-request/never) [Source: evidence/codex.md §8 — Grade A]
- Amershi G14 "scale from low to high autonomy" [Source: academic/human-ai-interaction.md — Grade A]
- Trust in AI: calibrated trust (not over-trust) [Source: academic/trust-in-ai.md — Grade A]

**Confidence:** 90%
**Alternatives:** Per-instance approval (rejected: fatigue); blanket trust (rejected: unsafe); no approval (rejected: no trust).
**Status:** READY.

---

## Decision 10: Execution — Inline ExecutionTrace + Per-Hunk Accept/Reject

**Decision:** ExecutionTrace renders inline in the streaming AI message with real runtime motion. Code artifacts show per-hunk accept/reject on staged diffs. State-edit-and-continue for long tasks.

**Evidence:**
- Gemini Deep Research "shows thoughts while browsing" [Source: evidence/gemini.md §12 — Grade A]
- Manus live Computer pane [Source: evidence/manus.md §12 — Grade A]
- Cursor per-hunk accept/reject = "single biggest regression-risk reducer" [Source: evidence/cursor.md §13 — Grade A]
- Continue.dev 100% diff overwrites = anti-pattern [Source: evidence/continue.md §27 — Grade A]
- LangGraph state-edit-and-continue + time-travel [Source: evidence/langgraph-studio.md §24 — Grade A]
- Replit plan-approval gate [Source: evidence/replit.md §12 — Grade A]
- v0 static "waiting" feels dead [Source: evidence/v0.md §12 — Grade B]

**Confidence:** 92%
**Alternatives:** Spinner (rejected: dead); separate dock (rejected: loses inline flow); 100% overwrites (rejected: regression risk).
**Status:** READY — strong evidence.

---

## Decision 11: Artifacts — First-class Tab-able Runtime Objects

**Decision:** Artifacts are first-class objects (not chat attachments). Each opens as a tab. ArtifactViewer is a runtime (gVisor-style sandbox + Pyodide/WASM for Python + CSP-locked iframe for React). Per-hunk accept/reject. WYSIWYG. Versioned. Share URL.

**Evidence:**
- Claude Artifacts: gVisor container (VERIFIED, not Pyodide as R1 claimed) [Source: evidence/claude.md §13 — Grade A]
- Claude share URL `claude.site/public/artifacts/<uuid>` [Source: evidence/claude.md §13 — Grade A]
- ChatGPT Canvas being sunset = trust erosion [Source: evidence/chatgpt.md §13 — Grade A]
- Cursor per-hunk accept/reject [Source: evidence/cursor.md §13 — Grade A]
- Lovable Visual Edits (WYSIWYG, no LLM cost) [Source: evidence/lovable.md §13 — Grade A]
- v0 Design Mode (AST-based direct manipulation) [Source: evidence/v0.md §13 — Grade A]
- Lovable Edit History thumbnails [Source: evidence/lovable.md §13 — Grade A]
- Replit live preview + video replay [Source: evidence/replit.md §13 — Grade A]

**Confidence:** 88%
**Alternatives:** Chat attachments (rejected: not first-class); preview-only (rejected: not runtime); 100% overwrite (rejected: no control).
**Status:** READY.

---

## Decision 12: Memory — Two-Layer + Project-Scoped + Source/Timestamp/Delete

**Decision:** Two-layer (saved + reference). Project-scoped with hard toggle. Every memory item shows source + timestamp + type + confidence + delete. Auto-extraction + consolidation + evolution.

**Evidence:**
- ChatGPT two-layer memory [Source: evidence/chatgpt.md §9 — Grade A]
- ChatGPT Project-only memory Aug 2025 [Source: evidence/chatgpt.md §9 — Grade A]
- ChatGPT opacity (5 states, no clear source) = anti-pattern [Source: evidence/chatgpt.md §27 — Grade A]
- Claude persistent memory Sep 2025 + citations + delete [Source: evidence/claude.md §9 — Grade A]
- Claude Code auto-memory (Claude-authored — UNIQUE) [Source: evidence/claude-code.md §9 — Grade A]
- Codex AGENTS.md 32KiB cap [Source: evidence/codex.md §9 — Grade A]
- Obsidian file-over-app (local-first trust) [Source: evidence/obsidian.md §9 — Grade A]
- Amershi G3 "remember recent interactions" [Source: academic/human-ai-interaction.md — Grade A]

**Confidence:** 90%
**Alternatives:** Context-only (rejected: no persistence); single-layer (rejected: no control); opaque (rejected: trust risk).
**Status:** READY.

---

## Decision 13: Knowledge — Derived from Memory + Per-Claim Citations

**Decision:** Knowledge entities derived from memory via consolidation engine. Per-claim source-to-quote citation (NotebookLM gold standard). Confidence decay per type. Semantic retrieval (5-factor scoring).

**Evidence:**
- NotebookLM per-claim source-to-quote = gold standard [Source: evidence/notebooklm.md §10 — Grade A]
- Heptabase per-paragraph AI citations [Source: evidence/heptabase.md §22 — Grade A]
- Tana graph-grounded AI [Source: evidence/tana.md §10 — Grade B]
- Perplexity inline `[1]` citations [Source: evidence/perplexity.md §10 — Grade A]
- Obsidian graph view [Source: evidence/obsidian.md §10 — Grade A]
- Roam linked + unlinked references [Source: evidence/roam.md §10 — Grade B]
- XAI: explainable decisions [Source: academic/explainable-ai.md — Grade A]

**Confidence:** 88%
**Alternatives:** No knowledge graph (rejected: no accumulating value); manual graph (rejected: user burden); no citations (rejected: no trust).
**Status:** READY.

---

## Decision 14: Personal Model — Living Digital Twin

**Decision:** MiMo maintains a HumanModel (identity, goals, skills, preferences, habits, relationships, predictions, recommendations). Accumulates value over time.

**Evidence:**
- Reflect "second brain" accumulating value [Source: evidence/reflect.md §9 — Grade A]
- ChatGPT Memory (identity + preferences) [Source: evidence/chatgpt.md §9 — Grade A]
- Apple Memory + Siri context [Source: evidence/apple-intelligence.md §9 — Grade A]
- Anytype typed-object graph [Source: evidence/anytype.md §10 — Grade A]
- Amershi G3 "remember recent interactions" [Source: academic/human-ai-interaction.md — Grade A]

**Confidence:** 82%
**Alternatives:** No personal model (rejected: no personalization); manual profile (rejected: user burden).
**Status:** READY.

---

## Decision 15: Search — One Universal Search + Command Palette with Prefix Grammar

**Decision:** `⌘/` Universal Search (one input, searches everything). `⌘K` Command Palette with prefix grammar (`>cmd /search @mem #file !ai`).

**Evidence:**
- VS Code prefix grammar (`>`, `/`, `@`, `#`) [Source: evidence/vscode.md §11 — Grade A]
- Arc `⌘T` command bar [Source: evidence/arc.md §11 — Grade B]
- Notion `/` slash [Source: evidence/notion.md §14 — Grade A]
- Linear `⌘K` searches local MobX pool [Source: evidence/linear.md §11 — Grade A]
- Raycast ONE launcher [Source: evidence/raycast.md §11 — Grade A]
- Hick's Law (one input < multiple) [Source: academic/hicks-law.md — Grade A]
- Information Scent (rich previews) [Source: academic/information-scent.md — Grade A]

**Confidence:** 88%
**Alternatives:** Multiple search surfaces (rejected: overload — Notion 8 AI surfaces); search only (rejected: no commands).
**Status:** READY.

---

## Decision 16: Command System — Single Palette with Prefix Grammar

**Decision:** ONE command palette with prefix grammar. No separate ⌘K + ⌘/ split (they coexist but ⌘K handles prefix search too).

**Evidence:**
- 5 products converged on ONE palette with prefix grammar (VS Code, Arc, Notion, Linear, Raycast) [Source: evidence/vscode.md §11, evidence/arc.md §11, evidence/notion.md §11, evidence/linear.md §11, evidence/raycast.md §11 — Grade A]
- Raycast Quick AI `⌘⇧Tab` on selection [Source: evidence/raycast.md §14 — Grade A]
- Linear hold-Space peek [Source: evidence/linear.md §14 — Grade A]
- Recognition vs Recall (palette > memorizing) [Source: academic/recognition-vs-recall.md — Grade A]

**Confidence:** 88%
**Alternatives:** Two separate overlays (rejected: adds second model); no palette (rejected: too steep).
**Status:** READY.

---

## Decision 17: Context System — One Source of Truth (Composer Mode)

**Decision:** Composer `mode` drives right sidebar + canvas + agent prompt mode + default tools/scope. All from ONE state.

**Evidence:**
- ChatGPT model+mode conflation = overload [Source: evidence/chatgpt.md §18 — Grade A]
- Gemini 4-axis choice = overload [Source: evidence/gemini.md §18 — Grade A]
- Linear ONE issue list [Source: evidence/linear.md §5 — Grade A]
- CLT: one model per dimension [Source: academic/cognitive-load-theory.md — Grade A]

**Confidence:** 88%
**Alternatives:** Multiple context states (rejected: overload); user-configurable context (rejected: config = cognitive load).
**Status:** READY.

---

## Decision 18: Trust — Architectural First, Interactional Second

**Decision:** Trust is built through what MiMo structurally cannot do (local-first, E2E, no-counters, no-deprecations) BEFORE interactional features (per-hunk accept/reject, source/timestamp/delete).

**Evidence:**
- Anytype E2E + local-first [Source: evidence/anytype.md §21 — Grade A]
- Granola no-bot-joins-calls [Source: evidence/granola.md §21 — Grade A]
- Bolt local WebContainer [Source: evidence/bolt.md §21 — Grade A]
- Linear local-cache-render [Source: evidence/linear.md §21 — Grade A]
- ChatGPT Canvas sunset = trust erosion [Source: evidence/chatgpt.md §21 — Grade A]
- Genspark failed-task-still-charges [Source: evidence/genspark.md §21 — Grade B]
- Apple Private Cloud Compute (stateless + non-targetable + verifiable) [Source: evidence/apple-intelligence.md §21 — Grade A]
- Trust in AI: architectural > interactional [Source: academic/trust-in-ai.md — Grade A]

**Confidence:** 92%
**Alternatives:** Interactional trust only (rejected: insufficient — ChatGPT has features but lost trust); no trust features (rejected: unsafe).
**Status:** READY — strongest evidence in the map.

---

## Decision 19: Explainability — Inline Citations + Exposed Reasoning + Decision Explainer

**Decision:** Inline numbered citations (Perplexity). Per-paragraph AI citations (Heptabase). Exposed chain-of-thought when "deep reasoning" toggled (DeepSeek-R1/GLM-4.7). Decision explainer (executive layer). `/* check-token */` hallucination-guard (Primer).

**Evidence:**
- NotebookLM per-claim source-to-quote [Source: evidence/notebooklm.md §22 — Grade A]
- Heptabase per-paragraph citations [Source: evidence/heptabase.md §22 — Grade A]
- Perplexity inline `[1]` [Source: evidence/perplexity.md §22 — Grade A]
- DeepSeek-R1 exposed chain-of-thought [Source: evidence/deepseek.md §22 — Grade A]
- GLM-4.7 turn-level Thinking toggle [Source: evidence/glm.md §22 — Grade A]
- LangGraph state inspection [Source: evidence/langgraph-studio.md §22 — Grade A]
- Primer `/* check-token */` hallucination-guard [Source: research-group-I.md §9 — Grade A]
- XAI: explainable decisions [Source: academic/explainable-ai.md — Grade A]

**Confidence:** 90%
**Alternatives:** No explainability (rejected: no trust — Apple/MS/Dust under-deliver here = MiMo's moat).
**Status:** READY — MiMo's moat opportunity.

---

## Decision 20: Errors — Inline + Actionable + Explainable

**Decision:** Errors are inline (not modal), actionable (retry/alternative), explainable (what/why/how-to-fix). No silent failures.

**Evidence:**
- Continue.dev silent failures (100% overwrites) [Source: evidence/continue.md §27 — Grade A]
- Nielsen heuristic 9 (error recovery) [Source: academic/jakob-nielsen.md — Grade A]
- Shneiderman rule 5 (easy reversal) [Source: academic/ben-shneiderman.md — Grade A]
- Amershi G7 (efficiently recover from errors) [Source: academic/human-ai-interaction.md — Grade A]
- Claude Code `Esc Esc` rewind [Source: evidence/claude-code.md §14 — Grade A]
- Aider auto-commit + revert [Source: evidence/aider.md §12 — Grade A]

**Confidence:** 85%
**Note:** Amershi G7 challenges MiMo's current weak error-recovery spec. **STRENGTHEN REQUIRED** — add one-keystroke rewind (Aider/Claude Code pattern). This is a refinement, not a blocker.
**Status:** READY — with strengthening required.

---

## Decision 21: Recovery — Conversation Rewind + State-Edit-and-Continue + Fork

**Decision:** One-keystroke rewind (Claude Code `Esc Esc`). State-edit-and-continue (LangGraph). Fork as alternative exploration. Auto-save + layout persistence.

**Evidence:**
- Claude Code `Esc Esc` rewind [Source: evidence/claude-code.md §14 — Grade A]
- Aider auto-commit + revert [Source: evidence/aider.md §12 — Grade A]
- LangGraph state-edit-and-continue + time-travel [Source: evidence/langgraph-studio.md §24 — Grade A]
- Cursor Checkpoints (Git-independent) [Source: evidence/cursor.md §13 — Grade A]
- v0 Fork [Source: evidence/v0.md §13 — Grade A]
- Shneiderman rule 6 (easy reversal) [Source: academic/ben-shneiderman.md — Grade A]

**Confidence:** 88%
**Alternatives:** No rewind (rejected: no recovery); abort+restart (rejected: loses progress).
**Status:** READY.

---

## Decision 22: Notifications — Inline Status for Conversation + Snackbar for System

**Decision:** No native toasts for conversation flow (Apple pattern — inline ExecutionTrace). Material Snackbar for transient system confirmations only (2.6s auto-dismiss). Fluent Message-bar for persistent errors.

**Evidence:**
- Apple no-toast (inline status) [Source: evidence/apple-intelligence.md §15 — Grade A]
- Material Snackbar [Source: research-group-E.md §Material — Grade A]
- Fluent Message-bar/Toast split [Source: research-group-E.md §Fluent — Grade A]
- Nielsen heuristic 1 (visibility) [Source: academic/jakob-nielsen.md — Grade A]

**Confidence:** 85%
**Alternatives:** Toasts everywhere (rejected: noise); no notifications (rejected: no visibility).
**Status:** READY.

---

## Decision 23: Long-Running Tasks — Approvable Plans + Visible Progress + Background + Recovery

**Decision:** Approvable plan before execution (Replit/Lovable). Visible progress (ExecutionTrace + weighted progress + ETA). Background execution. Pause/resume (Manus). Failure recovery (LangGraph).

**Evidence:**
- Replit plan-approval gate [Source: evidence/replit.md §12 — Grade A]
- Lovable `.lovable/plan.md` [Source: evidence/lovable.md §9 — Grade A]
- Manus Plan Mode + pause/resume + Scheduled Tasks [Source: evidence/manus.md §12, §24 — Grade A]
- LangGraph state-edit-and-continue + time-travel [Source: evidence/langgraph-studio.md §24 — Grade A]
- Dust triggers (schedule + webhook + event) [Source: evidence/dust.md §24 — Grade A]
- Granola ambient-agent (daemon pattern) [Source: evidence/granola.md §8 — Grade A]
- Amershi G14 (scale autonomy) [Source: academic/human-ai-interaction.md — Grade A]

**Confidence:** 88%
**Alternatives:** No plan approval (rejected: wasted runs); blocking modals (rejected: blocks conversation); no background (rejected: no multi-tasking).
**Status:** READY.

---

## Decision 24: Keyboard — Hold-Space Peek + ⌘K Act + ⌘⇧Tab Quick AI + Single-Key Daily-5

**Decision:** Hold `Space` to peek (Linear). `⌘K` command palette with prefix grammar (VS Code). `⌘⇧Tab` Quick AI on selection (Raycast). Single-key daily-5: C/M/A/R/S (Linear). Cap at 2 modifiers. Alt+1..9 tabs.

**Evidence:**
- Linear hold-Space peek [Source: evidence/linear.md §14 — Grade A]
- VS Code prefix grammar [Source: evidence/vscode.md §14 — Grade A]
- Raycast `⌘⇧Tab` Quick AI [Source: evidence/raycast.md §14 — Grade A]
- Linear single-key C/S/A/P/L [Source: evidence/linear.md §14 — Grade A]
- Notion `/` slash [Source: evidence/notion.md §14 — Grade A]
- Helix selection-first (noun→verb) [Source: evidence/helix.md §14 — Grade A]
- Fitts's Law (target acquisition) [Source: academic/fitts-law.md — Grade A]
- Hick's Law (choice time) [Source: academic/hicks-law.md — Grade A]
- Raskin quasimodes (hold-Space) [Source: academic/jef-raskin.md — Grade B]
- Recognition vs Recall [Source: academic/recognition-vs-recall.md — Grade A]

**Confidence:** 90%
**Alternatives:** 3-modifier hotkeys (Raycast — rejected: too hard); no peek (rejected: commitment friction); no Quick AI (rejected: loses killer feature).
**Status:** READY — strong evidence.

---

## Decision 25: Accessibility — WCAG AA + 44px + Reduced-Motion + ARIA Live Regions

**Decision:** WCAG AA via paired foregrounds. 44px tap targets (Apple/Fitts's). `prefers-reduced-motion` with ARIA live regions for ExecutionTrace. Focus rings. Screen reader. RTL. High-contrast.

**Evidence:**
- Apple 44pt tap targets [Source: research-group-E.md §Apple — Grade A]
- Fitts's Law (target size) [Source: academic/fitts-law.md — Grade A]
- WCAG AA [Source: patterns/accessibility.md — Grade B]
- Primer MUST rule for reduced-motion [Source: research-group-I.md §Primer — Grade A]
- VS Code ⌥F1 a11y context [Source: evidence/vscode.md §19 — Grade A]
- Apple Intelligence 5 a11y features [Source: evidence/apple-intelligence.md §19 — Grade A]
- Nielsen heuristic 5 (error prevention) + 6 (recognition) [Source: academic/jakob-nielsen.md — Grade A]

**Confidence:** 80% (lowest — no axe-core/VPAT testing)
**Alternatives:** WCAG AAA (rejected: too strict for now); no reduced-motion (rejected: a11y failure).
**Status:** READY — with ACCEPTED LIMITATION (no axe-core testing; will validate in implementation).

---

## Decision 26: Performance — Local-First + <80ms Palette + <1s First Token + ≥50fps

**Decision:** Local-first (render from cache, sync in background). ⌘K <80ms. Hold-Space <100ms. Project switch <200ms. First token <1s. ≥50fps on 1000+ messages. No network in critical path. Virtualization. Memoization.

**Evidence:**
- Linear local-cache-render ("no spinners because nothing to wait for") [Source: evidence/linear.md §20 — Grade A]
- Linear ⌘K searches local MobX pool [Source: evidence/linear.md §11 — Grade A]
- Bolt local WebContainer [Source: evidence/bolt.md §20 — Grade A]
- Linear cause-and-effect threshold (<100ms = response, ≥100ms = delay) [Source: evidence/linear.md §20 — Grade B]
- Stripe 500ms hard ceiling [Source: research-group-I.md §Stripe — Grade A]
- Primer duration tiers [Source: research-group-I.md §Primer — Grade A]

**Confidence:** 85%
**Alternatives:** Cloud-first (rejected: latency + trust); no targets (rejected: no discipline).
**Status:** READY — with ACCEPTED LIMITATION (no quantitative benchmarks; targets grounded in Linear/Stripe/Primer docs).

---

## Decision 27: Privacy / Security — Local-First + E2E + No-Counters + Sandbox Modes

**Decision:** Local-first (SQLite via Prisma). E2E for opt-in cloud sync. No credit counters. Named sandbox modes (read-only/workspace-write/danger). Named approval policies. No remote code execution. Audit log.

**Evidence:**
- Anytype E2E + local-first [Source: evidence/anytype.md §21 — Grade A]
- Bolt local WebContainer [Source: evidence/bolt.md §21 — Grade A]
- Codex OS-level sandbox (Seatbelt/Landlock/seccomp) [Source: evidence/codex.md §21 — Grade A]
- Codex 3 sandbox × 4 approval modes [Source: evidence/codex.md §8 — Grade A]
- Claude Code 6 permission modes + hooks [Source: evidence/claude-code.md §8 — Grade A]
- Apple Private Cloud Compute [Source: evidence/apple-intelligence.md §21 — Grade A]
- Genspark failed-task-still-charges = anti-pattern [Source: evidence/genspark.md §21 — Grade B]
- Trust in AI: architectural trust [Source: academic/trust-in-ai.md — Grade A]

**Confidence:** 90%
**Alternatives:** Cloud-first (rejected: trust + latency); per-instance approval (rejected: fatigue); no sandbox (rejected: unsafe).
**Status:** READY.

---

## Decision 28: Offline / Online — Offline-First + Graceful Degradation

**Decision:** MiMo works fully offline. Web search + cloud model + cloud sync require internet. Graceful degradation. Local model support.

**Evidence:**
- Anytype local-first P2P [Source: evidence/anytype.md §21 — Grade A]
- Bolt local WebContainer [Source: evidence/bolt.md §12 — Grade A]
- Aider local LLM support [Source: evidence/aider.md §25 — Grade A]
- Codex `--oss` local models [Source: evidence/codex.md §25 — Grade A]

**Confidence:** 82%
**Alternatives:** Cloud-only (rejected: no offline); always-online (rejected: trust + latency).
**Status:** READY.

---

## Decision 29: Agent Collaboration — SharedWorkspace + Event-Stream + Quality Layer

**Decision:** Agents collaborate through SharedWorkspace. Event-stream (OpenHands pattern). QualityLayer (peer review + critique + verification + consensus). Sub-agents (Claude Code). Hierarchical delegation (OpenHands TaskToolSet).

**Evidence:**
- OpenHands event-stream (12 types) [Source: evidence/openhands.md §8 — Grade A]
- OpenHands TaskToolSet (hierarchical delegation) [Source: evidence/openhands.md §8 — Grade A]
- Claude Code subagents + agent teams [Source: evidence/claude-code.md §8 — Grade A]
- Dust up to 6 parallel sub-agents + Temporal durability [Source: evidence/dust.md §8 — Grade A]
- LangGraph Fork + replay-from-node [Source: evidence/langgraph-studio.md §24 — Grade A]
- Manus parallel-execution-confuses-users (sequential default) [Source: evidence/manus.md §27 — Grade A]

**Confidence:** 85%
**Alternatives:** Parallel default (rejected: confusion); no collaboration (rejected: limited capability).
**Status:** READY.

---

## Decision 30: Developer Mode — Hidden by Default + Floating Panel

**Decision:** devMode hidden by default. When ON: conditional rail icon + floating DeveloperPanel (Overview/Memory/Agents/Tools/Events). Always one shortcut away.

**Evidence:**
- Apple 3-layer PD (interface/output/depth) — dev tools at depth [Source: evidence/apple-intelligence.md §18 — Grade A]
- MS Copilot 3-layer PD + governance API [Source: evidence/ms-copilot.md §18 — Grade A]
- Linear "simple first, then powerful" [Source: evidence/linear.md §18 — Grade B]
- v0 "stuck with no terminal access" complaint [Source: evidence/v0.md §27 — Grade B]
- Bolt in-browser terminal [Source: evidence/bolt.md §14 — Grade A]
- Progressive Disclosure principle [Source: academic/progressive-disclosure.md — Grade A]

**Confidence:** 85%
**Alternatives:** Always-visible runtime (rejected: cognitive overload); no dev mode (rejected: no power-user depth).
**Status:** READY.

---

## Decision 31: Extensibility / Plugins — MCP + Slash Blocks + Hooks + Personal Registry

**Decision:** MCP integration (Tana/Amie/Superhuman pattern). Slash blocks as user-facing plugin primitive (Notion). Hooks as developer-facing primitive (Claude Code). Personal extension registry (no marketplace).

**Evidence:**
- GitHub `@`-mention tool invocation [Source: evidence/github-spark.md §11 — Grade A]
- Tana MCP-first [Source: evidence/tana.md §25 — Grade B]
- Amie MCP server [Source: evidence/amie.md §25 — Grade A]
- Superhuman Mail MCP + Docs MCP [Source: evidence/superhuman.md §25 — Grade B]
- Claude Code hooks [Source: evidence/claude-code.md §8 — Grade A]
- Notion `/` slash blocks [Source: evidence/notion.md §14 — Grade A]
- Obsidian plugin fragmentation = anti-pattern [Source: evidence/obsidian.md §27 — Grade A]

**Confidence:** 82%
**Alternatives:** Public marketplace (rejected: single-user); no extensions (rejected: no extensibility); fragmented plugins (rejected: Obsidian anti-pattern).
**Status:** READY.

---

## Decision 32: API Philosophy — One Public Surface + No Bypass + Streaming

**Decision:** Core public API (`@/core/index.ts`) is the ONLY entry point. No bypass of the pipeline. Streaming (chat + agent + artifacts). Idempotent kernel boot. Defensive APIs (safe() wrapper).

**Evidence:**
- LangGraph SDK [Source: evidence/langgraph-studio.md §25 — Grade A]
- Codex SDK + GitHub Action [Source: evidence/codex.md §25 — Grade A]
- OpenHands API [Source: evidence/openhands.md §25 — Grade A]
- NotebookLM API [Source: evidence/notebooklm.md §25 — Grade B]
- Perplexity API (per-token pricing) [Source: evidence/perplexity.md §25 — Grade A]
- Stripe API (developer-facing copy) [Source: research-group-I.md §Stripe — Grade A]

**Confidence:** 85%
**Alternatives:** Multiple API surfaces (rejected: fragmentation); bypass paths (rejected: safety); no streaming (rejected: feels dead).
**Status:** READY.

---

## Decision 33: Scalability — Single-User Scale (10k+ conversations, 10k+ memory, 1000+ messages)

**Decision:** Virtualization (message list, memory browser, knowledge grid). Indexed retrieval. Caching (UserModel, retrieval, workspace API). Lazy loading (overlays, browsers, heavy components). Background sync (no blocking). Prisma + SQLite local.

**Evidence:**
- Linear IndexedDB + MobX + sync engine [Source: evidence/linear.md §20 — Grade A]
- Notion long-page lag (drop frames below 50fps) = anti-pattern [Source: evidence/notion.md §27 — Grade A]
- Zed GPU rendering (120fps aspiration) [Source: evidence/zed.md §15 — Grade A]
- VS Code lazy loading [Source: evidence/vscode.md §20 — Grade A]

**Confidence:** 82%
**Alternatives:** No virtualization (rejected: scroll jank); cloud scaling (rejected: single-user).
**Status:** READY.

---

## Decision 34: Motion — 5 Tiers + Emphasized Bezier + Asymmetric Timing + Springs

**Decision:** 5 tiers (instant 0 / micro 100 / short 200 / medium 300 / long 500 ceiling). Emphasized `cubic-bezier(0.05, 0.7, 0.1, 1.0)`. Asymmetric (instant enter, 150ms exit). Springs for direct manipulation. Animate only composited properties. `prefers-reduced-motion` mandatory.

**Evidence:**
- Primer 100/200/300/500ms [Source: research-group-I.md §Primer — Grade A]
- Linear 0/100/250/350ms [Source: evidence/linear.md §16 — Grade B (inferred)]
- Stripe 500ms ceiling [Source: research-group-I.md §Stripe — Grade A]
- Linear instant-enter/150ms-exit [Source: evidence/linear.md §16 — Grade B (inferred)]
- Material Emphasized bezier [Source: research-group-E.md §Material — Grade A]
- Primer MUST/NEVER rules [Source: research-group-I.md §Primer — Grade A]
- Reduced-motion mandatory [Source: academic/progressive-disclosure.md, research-group-I.md §Primer — Grade A]

**Confidence:** 82% (Linear tokens inferred, not directly accessed — ACCEPTED LIMITATION)
**Alternatives:** Material defaults (rejected: too slow); no motion (rejected: loses state communication); symmetric timing (rejected: less premium feel).
**Status:** READY — with ACCEPTED LIMITATION (Linear `--speed-*` tokens inferred from community references, not directly accessed due to Cloudflare block).

---

## Decision 35: Visual Language — Calm Depth + One Accent + 5-Level Elevation + 9 Type Roles + 4px Spacing

**Decision:** Calm material depth (1px hairlines + tonal separation; shadows for floating only). One user-pickable accent per project. 5 elevation levels (base/hairline/container/floating/modal). 9 type roles on system-font stack. 4px base spacing.

**Evidence:**
- Apple calm deference [Source: research-group-E.md §Apple — Grade A]
- Material token rigor [Source: research-group-E.md §Material — Grade A]
- Fluent prescriptive component-depth [Source: research-group-E.md §Fluent — Grade A]
- Geist restraint (one accent, no second) [Source: research-group-I.md §Geist — Grade A]
- Arc per-Space accent [Source: evidence/arc.md §5 — Grade B]
- Fitts's Law (tap targets) [Source: academic/fitts-law.md — Grade A]
- Miller's Law (rail icons) [Source: academic/millers-law.md — Grade A]
- Nielsen heuristic 8 (minimalist) [Source: academic/jakob-nielsen.md — Grade A]

**Confidence:** 88%
**Alternatives:** Material shadow-heavy (rejected: fatigues); Apple over-glass (rejected: noise); Fluent enterprise chrome (rejected: corporate).
**Status:** READY.

---

## Summary

| Decision | Confidence | Status |
|---|---|---|
| 1. Product Philosophy | 85% | READY |
| 2. Mental Model | 80% | READY |
| 3. Conversation | 88% | READY |
| 4. Workspace (one container) | 90% | READY |
| 5. Navigation (rail ≤8) | 88% | READY |
| 6. Projects | 90% | READY |
| 7. Tabs | 85% | READY |
| 8. Agents (living workflow) | 88% | READY |
| 9. Agent Autonomy | 90% | READY |
| 10. Execution (inline + per-hunk) | 92% | READY |
| 11. Artifacts | 88% | READY |
| 12. Memory | 90% | READY |
| 13. Knowledge | 88% | READY |
| 14. Personal Model | 82% | READY |
| 15. Search | 88% | READY |
| 16. Command System | 88% | READY |
| 17. Context System | 88% | READY |
| 18. Trust (architectural first) | 92% | READY |
| 19. Explainability | 90% | READY |
| 20. Errors | 85% | READY (strengthen error recovery) |
| 21. Recovery | 88% | READY |
| 22. Notifications | 85% | READY |
| 23. Long-Running Tasks | 88% | READY |
| 24. Keyboard | 90% | READY |
| 25. Accessibility | 80% | READY (ACCEPTED LIMITATION: no axe-core yet) |
| 26. Performance | 85% | READY (ACCEPTED LIMITATION: no benchmarks) |
| 27. Privacy / Security | 90% | READY |
| 28. Offline / Online | 82% | READY |
| 29. Agent Collaboration | 85% | READY |
| 30. Developer Mode | 85% | READY |
| 31. Extensibility / Plugins | 82% | READY |
| 32. API Philosophy | 85% | READY |
| 33. Scalability | 82% | READY |
| 34. Motion | 82% | READY (ACCEPTED LIMITATION: Linear tokens inferred) |
| 35. Visual Language | 88% | READY |

**Average confidence across 35 decisions: 86.5%**
**All decisions READY. No BLOCKERS. One strengthening required (error recovery — refinement, not blocker).**
