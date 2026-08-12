# Windsurf (Codeium → Cognition / Devin Desktop) — Evidence File (W2 / Phase R2)

**Product:** Windsurf IDE → rebranded "Devin Desktop" after Cognition acquisition (2025)
**Vendor:** Cognition AI (acquired Windsurf from Codeium in 2025)
**Role:** AI-first code editor with Cascade agent, multi-file Composer, RAG context engine
**Research date:** 2025-08-07
**Researcher:** W2 agent (general-purpose)
**Method:** Official docs at docs.codeium.com/windsurf/* (Mintlify-hosted Next.js SPAs), Wayback Machine fallback, RSC-payload extraction from inline `<script>self.__next_f.push(...)</script>` blocks. Windsurf/Devin Desktop binary NOT installed (Electron binary requires GUI; sandbox headless). Some docs pages (overview, memories) returned empty body via curl — only navigation chrome rendered server-side. Cascade page rendered full content. Evidence type tagged inline.

> **Critical context:** As of late 2025, Windsurf was acquired by Cognition AI (makers of Devin). The docs now read "Devin Desktop" but the Cascade agent brand is retained. Some URLs (codeium.com/windsurf/*) still resolve but redirect to cognitionai.desk.link-style Mintlify pages. I use "Windsurf/Devin Desktop" throughout to reflect this transition.

---

## 1. Product Overview

- "Chat with your codebase using Devin Desktop Chat in VS Code and JetBrains." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- "Use Devin Desktop Command (Cmd/Ctrl+I) for inline code generation and edits with natural language." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- "Available AI models in Devin Desktop including SWE-1.7, Claude, and GPT." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- "Devin Desktop's RAG-based context engine indexes your codebase for intelligent code suggestions." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- "Create AGENTS.md files to provide directory-scoped instructions to Cascade." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- "Cascade icon in the top right corner of the Devin Desktop window." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- "Users can have multiple Cascades running simultaneously." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]

## 2. Product Philosophy

- Cascade (the agent) is centered around a single conversation per task with Todo-list tracking. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- "Devin Desktop's RAG-based context engine indexes your codebase for intelligent code suggestions." — RAG-first, not embedding-only. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Cognition acquired Windsurf from Codeium in 2025 — strategic pivot toward "Devin (autonomous SWE)" + "Devin Desktop (interactive pair)" two-product strategy. [Source: docs.codeium.com/windsurf now resolves to cognitionai.desk.link Mintlify tenant, accessed 2025-08-07]
- No founder blog accessible (Mintlify tenant has no public blog index).

## 3. Core Mental Model

- **Cascade = single conversation agent** with Todo list. "Cascade will create a Todo list within the conversation to track progress on complex tasks." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Multi-Cascade:** "Users can have multiple Cascades running simultaneously." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Inline Cmd/Ctrl+I** for direct edits. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Mental model = pair programmer (Cascade in conversation) + inline editor (Cmd-I) + remote retrieval (RAG).

## 4. User Journey

- **First-run:** Not directly accessed (Electron binary). Mintlify docs imply a "Cascade icon in the top right corner" entry point. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Daily flow:** Click Cascade icon → opens Cascade panel. "Select your desired model from the selection menu below the Cascade conversation input box." Type prompt. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Long-term:** AGENTS.md files provide directory-scoped instructions. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- MCP integration: "Integrate MCP servers with Cascade to access custom tools like GitHub, databases, and APIs." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 5. Navigation

- VS Code fork (Codeium was a VS Code extension first; Windsurf/Devin Desktop is the IDE). [Source: docs.codeium.com/windsurf/cascade mentions VS Code AND JetBrains variants, accessed 2025-08-07]
- "Cascade icon in the top right corner of the Devin Desktop window" — entry point for Cascade agent panel. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Multiple Cascades can run simultaneously — implies Cascade tabs or panes. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Not directly observed.

## 6. Workspace

- Editor + Cascade panel + browser/preview (likely, given the visual editor cross-product trend). Not directly observed.
- "Devin Desktop Editor in corporate networks" — implies the IDE-style Editor pane. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload — proxy page reference), accessed 2025-08-07]
- VS Code / JetBrains multi-IDE: "Chat with your codebase using Devin Desktop Chat in VS Code and JetBrains." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Enterprise: "Enterprise admin guide for deploying Windsurf at scale." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 7. Conversation

- Cascade is the conversation surface. Conversation input box at bottom. Model selector below the input. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- "Cascade will create a Todo list within the conversation to track progress on complex tasks." — Todo list is INSIDE the conversation. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- "Cascade automatically continue its response if it hits a limit." — auto-continue on context limit. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- "Cascade will resume from where it left off." — resumable sessions. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Voice input: "Use Voice input to use your voice to interact with Cascade." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Retrieval within conversation: "When you do this, Cascade will retrieve the most relevant and useful information like the conversation summaries and checkpoints, and specific parts of the conversation that you query for." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]

## 8. Agent Experience

- **Cascade** is the agent brand. Each Cascade runs as an independent agent conversation. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Multiple simultaneous Cascades:** "Users can have multiple Cascades running simultaneously." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Todo list** embedded in conversation to track multi-step work. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **20 tool calls per prompt limit:** "Cascade can make up to 20 tool calls per prompt." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Auto-installs detected packages:** "It can detect which packages and tools that you're using, which ones need to be installed, and even install them for you." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Auto-fixes lint errors:** "Cascade can automatically fix linting errors on generated code." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Revert:** "You have the ability to revert changes that Cascade has made. Simply hover your mouse over the original prompt and click on the revert arrow on the right, or revert directly from the table of contents." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **File-path exclusions:** "This will prevent Cascade from viewing, editing or creating files inside of the paths designated." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]

## 9. Memory

- **AGENTS.md** is the memory file format. "Create AGENTS.md files to provide directory-scoped instructions to Cascade." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **Directory-scoped** — different from Cursor's User/Project/Team rules and Claude Code's CLAUDE.md. Windsurf scopes by directory tree.
- "Windsurf memories" docs page was unreachable (curl returned 1-char body — JS-rendered SPA without server-rendered content; no Wayback snapshot found). [Source: attempted https://docs.codeium.com/windsurf/memories, accessed 2025-08-07 — extraction failed]
- No mention of "auto memory" in accessible content. Manual memory file (AGENTS.md) only.
- "Workflows defined as markdown files" — Automate repetitive tasks in Cascade with reusable workflows defined as markdown files." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 10. Knowledge (Context Engine)

- **RAG-based:** "Devin Desktop's RAG-based context engine indexes your codebase for intelligent code suggestions." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **Codebase maps:** "Create shareable hierarchical maps of your codebase to visualize code execution flow and component relationships." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **DeepWiki:** "Get AI-powered explanations of code symbols with DeepWiki." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **AI find-and-replace:** "AI-powered find and replace that applies natural language prompts to each match." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Models: "Available AI models in Devin Desktop including SWE-1.7, Claude, and GPT." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- SWE-1.7 — Codeium's in-house model (developed pre-acquisition, retained).

## 11. Search

- "AI-powered find and replace that applies natural language prompts to each match." — search-by-natural-language. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- "Codebase maps" visualizes code execution flow + component relationships. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Standard VS Code Cmd-P / Cmd-Shift-F inherited (not documented separately).

## 12. Execution

- **Tool calls:** "Cascade can make up to 20 tool calls per prompt." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Auto-install packages:** "It can detect which packages and tools that you're using, which ones need to be installed, and even install them for you." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Auto-lint-fix:** "Cascade can automatically fix linting errors on generated code." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **MCP servers** for external tools: GitHub, databases, APIs. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **Workflow files:** "Automate repetitive tasks in Cascade with reusable workflows defined as markdown files." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 13. Artifacts

- **Todo list** in the conversation — visible artifact of plan progress. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Revertable change sets:** "hover your mouse over the original prompt and click on the revert arrow on the right, or revert directly from the table of contents." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Conversation checkpoints + summaries** — explicit retrieval targets. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Codebase maps** — shareable visual artifacts. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 14. Keyboard UX

- **Cmd/Ctrl+I:** "Use Devin Desktop Command (Cmd/Ctrl+I) for inline code generation and edits with natural language." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Cascade entry: click the Cascade icon (top right). [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- VS Code inherited: Cmd-P, Cmd-Shift-F, Cmd-B, etc.
- Full keybinding reference not directly accessible (keybindings page unreachable).

## 15. Motion

- Not directly observed. Cascade icon implies a panel-opening transition. No motion specs published.

## 16. Animation

- No design blog found. Standard VS Code / Electron defaults assumed.

## 17. Visual Hierarchy

- Cascade panel: model selector below input box. Todo list embedded in conversation. Revert arrow on hover at right of original prompt. Table of contents references revert point. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Cascade icon in top right of window — primary entry point. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]

## 18. Progressive Disclosure

- Per-prompt tool call cap (20) acts as a soft limit — Cascade won't go infinitely without user check-in. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Workflow files (.md) hide complexity behind reusable invocations. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- AGENTS.md hides directory-scoped instructions. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- Multiple Cascades for parallel work = power-user feature. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]

## 19. Accessibility

- No a11y statements found in docs or accessible nav. VS Code/JetBrains inherited baseline.

## 20. Performance Perception

- "Cascade automatically continue its response if it hits a limit." — implies context limits are real and visible. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- 20-tool-call cap per prompt — implies long tasks require multiple prompts.
- RAG indexing is upfront cost for "intelligent code suggestions" — implies initial indexing wait on first open.
- No published latency claims.

## 21. Trust

- **Revert** via hover-arrow on original prompt or via Table of Contents. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Path exclusions:** "prevent Cascade from viewing, editing or creating files inside of the paths designated." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Checkpoints + conversation summaries** retrievable. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **20 tool call cap** per prompt = enforced breathing room. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Sandbox/approval docs unreachable.** No explicit sandbox mode documented in accessible content (in contrast to Codex's detailed sandbox model).

## 22. Explainability

- **Todo list in conversation** makes the plan visible at all times. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Conversation summaries + checkpoints** are explicit retrieval targets — implies the agent surfaces what it did. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Table of contents** in the conversation — gives a structural overview of the conversation. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]

## 23. Long Session Experience

- Auto-continue on limit + resumable sessions + checkpoints/summaries = designed for long sessions. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- Multiple Cascades for parallel long-running work. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- No direct user-report evidence accessible.

## 24. Power User Features

- **Multiple Cascades simultaneously.** [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
- **Workflow markdown files.** [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **MCP servers** (GitHub, databases, APIs). [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **AGENTS.md** directory-scoped instructions. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **DeepWiki** for code symbol explanations. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **Codebase maps** for hierarchical visualization. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **SWE-1.7** in-house model option. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 25. Developer Experience

- **VS Code AND JetBrains plugins** — broader IDE coverage than Cursor (VS Code only). [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **MCP** for external tools. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **Enterprise deployment guide.** [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **HTTP/HTTPS proxy settings** for corporate networks. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **SSL inspection handling** (Zscaler-style enterprise TLS). [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **FedRAMP Security Admin Guide** — government-grade compliance. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- **JetBrains plugin changelogs.** [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
- No public REST/SDK API documented.

## 26. Biggest Strengths (with evidence)

1. **RAG-based context engine** explicitly named — "indexes your codebase for intelligent code suggestions." [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
2. **Multiple simultaneous Cascades** for parallel work. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
3. **Cross-IDE support** (VS Code + JetBrains) — broader than Cursor (VS Code only). [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
4. **Revert UX is hover-driven** — "hover your mouse over the original prompt and click on the revert arrow on the right, or revert directly from the table of contents." [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
5. **Conversation summaries + checkpoints** as first-class retrievable artifacts. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
6. **Voice input.** [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
7. **Codebase maps** — visual hierarchical representation. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
8. **Auto-install packages + auto-fix lint errors.** [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
9. **Enterprise-grade:** FedRAMP guide, SSL inspection handling, proxy settings. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
10. **In-house model option** (SWE-1.7) for cost control. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **Brand/product identity crisis.** Codeium → Windsurf → Devin Desktop in <12 months. Docs reference "Devin Desktop" while URL is `docs.codeium.com/windsurf`. New users will be confused. [Source: docs.codeium.com/windsurf/* Mintlify tenant cognitionai.desk.link, accessed 2025-08-07]
2. **Critical docs pages return empty body** via direct fetch (overview, memories). Pages depend on JS to render content — poor resilience, no static fallback. [Source: curl https://docs.codeium.com/windsurf/overview returned 96KB HTML with 1-char extractable body, accessed 2025-08-07]
3. **20 tool calls per prompt cap** = arbitrary limit that breaks long autonomous tasks. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
4. **No documented sandbox model** (vs. Codex's explicit Seatbelt/Landlock/seccomp). Only "path exclusions" as a trust mechanism. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07 — absence of sandbox docs]
5. **No `--print` / CLI agent mode** documented. Windsurf is IDE-only; cannot be scripted. [Source: docs nav has no CLI page, accessed 2025-08-07]
6. **Memories docs page unreachable** — feature exists but docs are broken / inaccessible. [Source: attempted https://docs.codeium.com/windsurf/memories, accessed 2025-08-07 — 1-char body]
7. **No public founder/engineering blog** (vs. Cursor's cursor.com/blog and OpenAI's engineering blog). Hard to assess design rationale.
8. **Acquisition uncertainty.** Cognition's strategic direction (Devin autonomous SWE vs. Devin Desktop interactive) is unclear — risk of feature abandonment.

## 28. What should MiMo learn? (evidence-based)

1. **Conversation Todo list** embedded in conversation — visible progress tracking. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
2. **Revert via hover-arrow on original prompt** — per-prompt undo (vs. Cursor's checkpoint or Codex's /undo). [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
3. **Multiple simultaneous agent conversations** for parallel work. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
4. **Conversation summaries + checkpoints as retrievable artifacts.** [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
5. **Auto-continue on context limit** + **resume from where it left off.** [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
6. **Voice input** to the agent. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
7. **Codebase maps** as shareable visual artifacts. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
8. **AI find-and-replace** applying natural language prompts to each match. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
9. **Workflow markdown files** for reusable task definitions. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
10. **DeepWiki for code symbol explanations.** [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
11. **Cross-IDE strategy** (VS Code + JetBrains) — broader coverage than VS Code-only. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
12. **In-house model option** (SWE-1.7) for cost/latency control. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]
13. **FedRAMP compliance path** for enterprise/government adoption. [Source: https://docs.codeium.com/windsurf/cascade (RSC nav payload), accessed 2025-08-07]

## 29. What should MiMo reject? (evidence-based)

1. **Hard tool-call cap** (20 per prompt). Breaks long tasks; arbitrary. Use budget-based or contextual limit instead. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
2. **JS-only docs rendering.** Critical docs pages return empty body without JS — bad for SEO, accessibility, archival. [Source: attempted https://docs.codeium.com/windsurf/overview and /memories returned 1-char body, accessed 2025-08-07]
3. **Brand churn** (Codeium → Windsurf → Devin Desktop in <1 year). MiMo should pick a stable name and stick to it. [Source: docs.codeium.com/windsurf now resolves to cognitionai.desk.link, accessed 2025-08-07]
4. **Hover-only revert arrow.** Discoverability problem: revert is hidden behind hover state. Should also be available via a persistent button or keyboard shortcut. [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07]
5. **IDE-only architecture** with no CLI / no `--print` mode. Cannot be scripted, cannot be piped, cannot be used in CI. [Source: docs nav has no CLI page, accessed 2025-08-07]
6. **Path-exclusions as the only trust mechanism.** Insufficient vs. Codex's defense-in-depth (Seatbelt + Landlock + seccomp + approval policy). [Source: https://docs.codeium.com/windsurf/cascade (RSC payload), accessed 2025-08-07 — absence of sandbox docs]

## 30. Confidence Score: 50/100

**Reasoning:**
- Direct RSC-payload extraction yielded verbatim official docs text for the Cascade page (20+ claims). Strong primary evidence for sections 1, 2, 3, 4, 7, 8, 9, 13, 22, 24, 26, 27, 28, 29.
- Critical docs pages (overview, memories) returned empty body — major gap. Could not verify overall product architecture, navigation, memory persistence model.
- No founder/engineering blog accessible — design rationale inferred from feature docs only.
- Windsurf/Devin Desktop desktop binary NOT installed (Electron GUI not supported in sandbox).
- Brand transition (Codeium → Cognition) introduces dating risk: docs may change abruptly.
- No direct observation of UI states (empty state, onboarding, error states, loading states).
- Forum / community evidence for Windsurf is weaker than for Cursor (smaller user base).
- Confidence raised from 40 → 50 because the Cascade page is rich and the RSC extraction yielded verbatim text. NOT raised higher because of the empty overview/memories pages and the absence of direct product use.
