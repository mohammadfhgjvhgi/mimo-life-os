# Sweep.dev — Evidence File (Task W8c, Phase R2)

> Evidence-based research product file. **Honest disclosure of pivot/sunset:** the original Sweep product (open-source AI junior dev that turned GitHub issues into PRs, YC S23) has been **sunset**; the current Sweep product is a JetBrains-focused AI coding assistant plugin with Next-Edit Autocomplete, Inline Editing, AI Commit Messages, AI Code Review, and an Agent. This file documents BOTH the historical product (where evidence exists) and the current product (where the docs and home page now live). Every claim cited with `[Source: <URL>, accessed 2026-08-07]`. No synthesis, no MiMo design.

---

## 1. Product Overview

**Current product (as of 2026-08-07):** Sweep is "the fastest coding assistant for JetBrains IDEs" — a JetBrains plugin (with secondary VS Code and Zed support for Next-Edit Autocomplete only). Tagline: "Finally, AI that works in JetBrains." [Source: https://sweep.dev/, accessed 2026-08-07]

The JetBrains Marketplace listing reports "4.9 stars · 40k+ installs" and "Trusted every day by thousands of professional developers." [Source: https://sweep.dev/, accessed 2026-08-07]

The plugin exposes 6 features: **Agent (⌘ J)**, **Next-Edit Autocomplete (Tab)**, **Inline Editing (⌘ I)**, **AI Commit Messages**, **AI Code Review**, and configuration surfaces (Custom Prompts, MCP Servers, BYOK). [Source: https://docs.sweep.dev/, accessed 2026-08-07]

**Historical product (pre-pivot, ~Aug 2023 to ~2024):** Sweep was "an open-source AI-powered junior developer. You describe a feature or bugfix in a GitHub issue and Sweep writes a pull request with code." [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07] (Launch HN post by William Zeng, YC S23, 198 points.)

The original product was GitHub-bot-only — you opened an issue, Sweep read it, and opened a PR. The current sweep.dev no longer markets the GitHub-issue-to-PR workflow; the docs.sweep.dev no longer hosts a `blogs/giving-dev-tools` page (referenced in the original launch thread, returns 404 today). [Observed: curl https://docs.sweep.dev/blogs/giving-dev-tools → 404, 2026-08-07]

## 2. Product Philosophy

**Original (historical) philosophy: "AI-powered junior developer."** William Zeng (cofounder) on the YC S23 launch: "Kevin and I met while working at Roblox. We talked to our friends who were junior developers and noticed a lot of them doing grunt work. We wanted to let them focus on important work. Copilot is great, but we realized some tasks could be completely offloaded to an AI (e.g. adding a banner to your webpage)." [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

The original tagline was "spend less time writing, more time reviewing code" (per HN commenter latortuga quoting the launch video). [Source: https://news.ycombinator.com/item?id=36988200, accessed 2026-08-07]

**Current philosophy: "the fastest coding assistant for JetBrains IDEs"** — focusing on speed (sub-100ms autocomplete) and JetBrains-native integration: "It's smarter and faster than Cursor because we use the internal JetBrains static analysis tools." [Source: https://sweep.dev/, accessed 2026-08-07] [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]

This represents a **pivot from async PR-bot to inline IDE-plugin**. The "junior dev" framing is gone; the new framing is "fast autocomplete + agent inside your existing JetBrains IDE."

## 3. Core Mental Model

**Historical mental model:** Describe a task as a GitHub issue → Sweep reads the issue + codebase → Sweep opens a PR. The user reviews the PR, not the chat. Sweep was a **remote async PR generator** with no IDE surface. [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

**Current mental model:** Stay in your JetBrains IDE → Sweep autocomplete suggests your next edit (Tab to accept, Tab to jump to the next suggested location) → when you need bigger changes, open the Sweep Agent chat (⌘ J) → Sweep edits files inline; you accept/reject via ⌘ Y / ⌘ N → "Revert Changes" rolls back to a checkpoint. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07] [Source: https://docs.sweep.dev/inline-editing, accessed 2026-08-07]

The new model is **synchronous and IDE-native**, with the agent's changes tracked as session checkpoints that can be reverted wholesale. This is structurally closer to Cursor's Composer than to the original Sweep's PR-bot.

## 4. User Journey

**Current journey:**
1. Install the Sweep AI plugin from the JetBrains Marketplace (plugin ID `26860-sweep-ai`). [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
2. Sign in via "Sign In with Sweep" → redirects to https://app.sweep.dev; alternatively paste the token manually into Settings. [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
3. Autocomplete is on by default; the user starts typing and Tab-accepts suggestions. [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
4. To use the Agent: ⌘ J (Mac) / Ctrl J (Windows/Linux) opens the Sweep sidebar; type a request with `@`-mentions of files. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
5. For inline edits: select code → ⌘ I / Ctrl I → describe change → accept/reject the proposed edits. [Source: https://docs.sweep.dev/inline-editing, accessed 2026-08-07]
6. To commit: ⌘ 0 / Ctrl 0 opens the Commit window, Sweep auto-generates a commit message from staged changes. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
7. To review code: shift-shift → search "AI Code Review" → Enter → Sweep reads changes and dependencies and reports issues. [Source: https://docs.sweep.dev/ai-code-review, accessed 2026-08-07]

**Historical journey (pre-pivot):**
1. Install Sweep GitHub App on your repo.
2. Open a GitHub issue describing a feature or bugfix.
3. Sweep reads the issue, searches the codebase with chunking/ranking, plans the PR, writes code, opens a PR.
4. Reviewer reviews the PR and merges or requests changes. [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

## 5. Navigation

**Current navigation** is fully IDE-integrated:
- **Core shortcuts** (Mac / Windows-Linux): Open/Close Chat + Add Code to Context = ⌘ J / Ctrl J; New Chat = ⌘ N / Ctrl N; Inline Edit = ⌘ I / Ctrl I. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Autocomplete**: Tab to accept next-edit suggestion; Tab to jump to next suggested location. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Agent actions**: Open Agent = ⌘ J; Accept Applied Codeblock = ⌘ Y; Reject Applied Codeblock = ⌘ N; Add Selection to Chat = ⌘ shift J. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Settings**: ⌘ , (Mac) / Ctrl , (Windows/Linux); or double-press Shift then type "Sweep Settings". [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Quick Actions**: Submit Issue/Description = Ctrl Enter; Update Sweep Plugin; BYOK. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Rebinding**: Settings → Keymap → search action → rebind. "Sweep requires each action to be bound to any shortcut to avoid conflicts." [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Docs nav** (left sidebar): Getting Started, Editors (JetBrains/VS Code/Zed), Features (Agent/Next-Edit/Autocomplete/Inline Editing/AI Commit Messages/AI Code Review), Account (Privacy/Pricing), Advanced (MCP Servers/JetBrains Gateway/Custom Prompts/Configuration/Update Sweep Plugin/Keyboard Shortcuts/BYOK), About (Changelog). [Source: https://docs.sweep.dev/, accessed 2026-08-07]

## 6. Workspace

**Current workspace** is the JetBrains IDE itself — Sweep does not have its own window. The plugin adds a sidebar (Sweep icon) plus inline UI affordances (Tab suggestions, ⌘ I prompt bar, ⌘ 0 commit integration). [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]

Supported JetBrains IDEs: "IntelliJ IDEA, PyCharm, Android Studio, WebStorm, PhpStorm, Rider, Goland, CLion, RustRover, RubyMine, JetBrains Gateway, and more." Plus VS Code and Zed (Next-Edit Autocomplete only). [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07] [Source: https://docs.sweep.dev/, accessed 2026-08-07]

**Historical workspace** was GitHub itself — issues, PRs, comments. There was no IDE surface. [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

## 7. Conversation

**Current conversation model** is a chat sidebar inside the IDE (Agent mode). User types a request with `@`-mentions of files; Sweep searches the codebase, edits files, and shows diffs that the user accepts (⌘ Y) or rejects (⌘ N). [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]

Best-practice conversation patterns from the docs:
- **One chat per task** — "Otherwise, the previous messages in the thread can hurt the intelligence of the model. To create a new chat, you can press ⌘ N or Ctrl N or click '+ New Chat.'" [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Describe current and expected state**: "currently, our app does xyz. I believe this happens in foo.py and it uses utils from bar.py. please confirm you understand." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Use checkpoints**: "If your code change can be tested fairly quickly, we recommend having the AI try one of your ideas and click 'Revert Changes' if it's not working. After each attempt, you can edit your previous message or follow up." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Toggle Normal/Search mode**: ⌘ . / Ctrl . (purpose not detailed in extracted docs — likely a context-search toggle). [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]

**Historical conversation model** was GitHub issues & PR comments — no chat UI. [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

## 8. Agent Experience

The **Sweep Agent** (⌘ J) is described as: "An integrated agent that automatically searches your codebase, edits your code, and then runs tests / checks for linter errors. It's smarter and faster than Cursor because we use the internal JetBrains static analysis tools." [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]

Execution pattern: chat → Sweep searches codebase → Sweep edits files → Sweep runs tests / linter → user reviews with ⌘ Y / ⌘ N → "Revert Changes" rolls back the chat-level diff. "We track all changes since the chat was sent." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]

Bash tool compatibility note: "The bash tool functionality in Sweep depends on your IntelliJ IDE version and terminal engine configuration: IntelliJ IDE Version 2025.2+ (Reworked Terminal ✅ / Classic Terminal ✅); 2025.1 and below (Reworked Terminal ❌ / Classic Terminal ✅)." — Sweep agent's shell access is gated by IDE version. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]

Windows/Linux: "PowerShell is used instead of bash for terminal commands." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]

**Next-Edit Autocomplete** is a distinct agent experience: it predicts the user's next intent based on recent edits. "If you recently changed the behavior of a function, our autocomplete can write a unit test for those exact changes." Sweep ships its own 1.5B parameter next-edit model ("Sweep Next-Edit 1.5B" / "sweep-next-edit-7B" mentioned in evals). [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07] [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]

**Historical agent experience** was purely async PR generation — no live IDE feedback. [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

## 9. Memory

- **SWEEP.md**: a project-root file "to provide custom rules and context for Sweep. This file serves multiple purposes: Store frequently used commands (Build, test, lint commands so Sweep can run them without searching); Define code style preferences (Naming conventions, preferred libraries, formatting rules); Document codebase structure (Important architectural decisions and organization principles); Provide domain-specific context (Business logic, requirements, or constraints specific to your project). Sweep will automatically read and follow the guidelines in your SWEEP.md file when making changes to your code." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **CLAUDE.md fallback**: "A CLAUDE.md file in the project root will be used for custom rules and context if no SWEEP.md file is present." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Custom commit template**: `sweep-commit-template.md` — Sweep "will learn from your last 10 commits" to match team commit style. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **Checkpoints**: per-chat revert snapshots — "We track all changes since the chat was sent." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Codebase indexing**: "Sweep indexes your entire project for context-aware suggestions that actually make sense." [Source: https://sweep.dev/, accessed 2026-08-07]
- No documented cross-session chat history or org-level knowledge base. (Gap vs Devin.)

## 10. Knowledge

- **JetBrains program structure interface** as codebase knowledge source — Sweep uses JetBrains' internal static analysis (PSI — Program Structure Interface) for context-aware suggestions. [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07] [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07: title "Using the JetBrains program structure interface for codebase context"]
- **Adaptive-depth file outline** for large files: "We start with a greedy approach and only reduce depth when necessary: Generate the full outline with unlimited depth → check size → if under 10,000 tokens, done; else regenerate with depth capped at 10 → keep reducing depth by 1 until it fits, stopping at depth 1 (top-level symbols only)." `(N children)` markers tell the agent "there's structure it isn't seeing." Result: "90% reduction in token usage for files larger than 2,000 lines" and "Less compaction and truncation needed for large files." [Source: https://blog.sweep.dev/posts/read-file, accessed 2026-08-07]
- **Web Search & Fetch Tools** (changelog 1.24, Oct 6, 2025) — browse the web from Sweep. [Source: https://sweep.dev/, accessed 2026-08-07]
- **Remote MCP Servers** (changelog 1.27, Dec 1, 2025) with full OAuth 2.0/2.1 support. [Source: https://sweep.dev/, accessed 2026-08-07]
- No documented org-level knowledge base, DeepWiki equivalent, or cited-answer system. (Gap vs Devin.)

## 11. Search

- **Codebase indexing**: "Sweep indexes your entire project for context-aware suggestions that actually make sense." Example shown on home page: searching "payment processing" surfaces `services/PaymentService.ts`, `api/routes/payments.ts`, `models/Transaction.ts`. [Source: https://sweep.dev/, accessed 2026-08-07]
- **`@`-mentions** in chat: "If not, work with Sweep to give it the relevant files using @ -mentions." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **JetBrains PSI** for symbol/structural search (deeper than text search). [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- **Toggle Normal/Search mode** (⌘ . / Ctrl .) — exact purpose not detailed in extracted docs. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Web search**: web search & fetch tools added in changelog 1.24 (Oct 6, 2025). [Source: https://sweep.dev/, accessed 2026-08-07]
- **MCP servers** (with OAuth): added in 1.27 (Dec 1, 2025) — opens up third-party tool discovery. [Source: https://sweep.dev/, accessed 2026-08-07]

## 12. Execution

- **Auto-edit + accept/reject**: Agent (⌘ J) edits files; user reviews via ⌘ Y (accept applied codeblock) / ⌘ N (reject applied codeblock). [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Inline Editing (⌘ I)**: select code → ⌘ I → describe change → "Review the generated code edits and choose to accept or reject them. ... The AI sees the entire file you're currently editing for full context. Only the selected lines are rewritten - changes are limited to your selection." Full File Editing mode (⌘ Shift I / Ctrl Shift Enter) toggles to rewriting the whole file. [Source: https://docs.sweep.dev/inline-editing, accessed 2026-08-07]
- **Auto test/lint** after edits: "automatically searches your codebase, edits your code, and then runs tests / checks for linter errors." [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
- **Revert Changes**: bulk or one-at-a-time rollback of all changes since the chat was sent. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Output normalization** (technical blog): "We then delete these trailing spaces using our regex method. We update the messages we send back to Claude with the correct format. ... When Claude tries to edit this function later it will reference the version without trailing whitespace, preventing the state drift issue entirely." Result: "code editing error rate dropped 38% from 13% to 8%." [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- **Token healing** (technical blog): a technique to teach LLMs to spell correctly — used to improve autocomplete accuracy. [Source: https://blog.sweep.dev/posts/token-healing-autocomplete, accessed 2026-08-07]
- **Sub-100ms autocomplete**: dedicated engineering blog post on building fast autocomplete for JetBrains. [Source: https://blog.sweep.dev/posts/next-edit-jetbrains, accessed 2026-08-07]

## 13. Artifacts

- **Edited source files** on disk (immediate — IDE-native).
- **Commit messages** generated by Sweep AI Commit Messages (⌘ 0). "The plugin only updates the message when the field is empty, so your custom messages won't be overwritten." Sweep learns from the last 10 commits to match team style. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **AI Code Review reports**: "Sweep will read the relevant changes and their dependencies to provide feedback on potential issues, bugs, or improvements." Triggered via JetBrains search menu → "AI Code Review". [Source: https://docs.sweep.dev/ai-code-review, accessed 2026-08-07]
- **Diff/changeset** shown in the Sweep sidebar for accept/reject. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Historical artifact** (pre-pivot): Pull Requests on GitHub — "Sweep writes a pull request with code." [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]

## 14. Keyboard UX

Comprehensive shortcuts table (Mac / Windows-Linux):
- **Core**: Open/Close Chat + Add Code to Context = ⌘ J / Ctrl J; New Chat = ⌘ N / Ctrl N; Inline Edit = ⌘ I / Ctrl I.
- **Autocomplete**: Accept Next Edit Suggestion = Tab; Jump to Next Suggested Location = Tab.
- **Agent**: Open Agent = ⌘ J; Accept Applied Codeblock = ⌘ Y; Reject Applied Codeblock = ⌘ N; Add Selection to Chat = ⌘ shift J.
- **Settings**: Open Settings = ⌘ , / Ctrl , ; Search for Sweep Settings = Double-press Shift then type "Sweep Settings".
- **Quick Actions**: Submit Issue/Description = Ctrl Enter; Update Sweep Plugin; Bring Your Own Key (BYOK).
- **Inline editing**: Open Inline Edit Prompt = ⌘ I / Ctrl I; Toggle Editing Mode (Inline ↔ Full File) = ⌘ Shift I / Ctrl Shift Enter.
- **Commit window**: ⌘ 0 / Ctrl 0. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07] [Source: https://docs.sweep.dev/inline-editing, accessed 2026-08-07]

Rebinding: Settings → Keymap → search action → rebind. "Sweep requires each action to be bound to any shortcut to avoid conflicts." [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]

## 15. Motion

- Sweep's motion is **within the IDE**: a sidebar that opens/closes with ⌘ J, an inline prompt bar that appears with ⌘ I on a selection, autocomplete popups at the cursor.
- **Tab-to-jump**: after accepting a Next-Edit suggestion, Tab again jumps to the next suggested location — a spatial-motion pattern unique to next-edit autocomplete. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Code Review panel** opens showing the user's changes and a prompt to review them. [Source: https://docs.sweep.dev/ai-code-review, accessed 2026-08-07]
- No documented screen-to-screen transitions; motion is contained within JetBrains's own IDE chrome.

## 16. Animation

- Autocomplete suggestions appear inline with a brief fade-in (standard JetBrains LSP-style popup).
- Sweep Next-Edit predictions highlight the suggested location and use Tab to accept + Tab to jump. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- Inline Edit prompt bar appears below selection; proposed edits are shown as a diff the user accepts/rejects. [Source: https://docs.sweep.dev/inline-editing, accessed 2026-08-07]
- No specific animation documentation in extracted docs; all animation claims are inferred from feature descriptions.

## 17. Visual Hierarchy

- Sidebar (Sweep icon) → chat transcript → applied code blocks with Accept (⌘ Y) / Reject (⌘ N) buttons.
- Inline Edit prompt bar appears contextually on selection (⌘ I) below the selected code.
- Autocomplete popup appears at cursor (small, transient).
- Commit window integrates Sweep's commit message generation as a Sweep icon next to the message field. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- JetBrains-native chrome throughout (no separate Sweep window manager). [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]

## 18. Progressive Disclosure

- **Default**: autocomplete is on; the agent sidebar is hidden until ⌘ J.
- **Inline Edit (⌘ I)** appears only when a selection is active.
- **AI Code Review** is invoked via JetBrains search menu (shift-shift → "AI Code Review") — deliberately out of the way until needed. [Source: https://docs.sweep.dev/ai-code-review, accessed 2026-08-07]
- **AI Commit Messages** appear automatically when the Commit window (⌘ 0) opens with an empty message field. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **MCP Servers, JetBrains Gateway, Custom Prompts, BYOK** are under "Advanced" in docs nav. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
- **Pricing page** is separate. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]

## 19. Accessibility

No dedicated accessibility documentation. Indirect evidence:
- Full keyboard-driven workflow (all features have ⌘/Ctrl shortcuts).
- Rebinding supported for every action.
- JetBrains IDE inherits platform accessibility (JetBrains has its own screen-reader support).
- No WCAG statement, no screen-reader testing methodology documented. [Source: https://docs.sweep.dev/, accessed 2026-08-07] — gap.

## 20. Performance Perception

- **Sub-100ms autocomplete** is a headline claim — supported by a dedicated engineering blog post ("Building sub-100ms autocompletion for JetBrains IDEs"). [Source: https://blog.sweep.dev/posts/next-edit-jetbrains, accessed 2026-08-07]
- **Token healing** to "teach LLMs to spell" — improves perceived accuracy. [Source: https://blog.sweep.dev/posts/token-healing-autocomplete, accessed 2026-08-07]
- **Output normalization** reduced agent error rate from 13% to 8% — perceived reliability improvement. [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- **Adaptive-depth file outline** reduced token usage by 90% for files >2000 lines — faster agent responses. [Source: https://blog.sweep.dev/posts/read-file, accessed 2026-08-07]
- **Checkpoints + Revert Changes**: low-friction experimentation — "If your code change can be tested fairly quickly, we recommend having the AI try one of your ideas and click 'Revert Changes' if it's not working." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **One chat per task**: keeps the conversation focused so model intelligence doesn't degrade. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **JetBrains Marketplace**: "4.9 stars · 40k+ installs" — adoption signal. [Source: https://sweep.dev/, accessed 2026-08-07]
- Customer testimonial (Ashkan Aghdai, Staff Engineer at Amplitude): "Compared to every other tool and IDE I've used, it's incredibly fast - so much so that the next tab predictions and autocomplete feel instantaneous." [Source: https://sweep.dev/, accessed 2026-08-07]

## 21. Trust

- **Checkpoints + Revert Changes**: "If your code change can be tested fairly quickly, we recommend having the AI try one of your ideas and click 'Revert Changes' if it's not working." [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Accept/Reject pattern (⌘ Y / ⌘ N)** for every applied code block — explicit user gate before changes land. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **AI Code Review** as a pre-commit safety check. [Source: https://docs.sweep.dev/ai-code-review, accessed 2026-08-07]
- **SOC 2 compliance** + "zero data retention" — "Sweep uses our own LLMs for unmatched price, performance, and security. No code is retained by third parties." [Source: https://sweep.dev/, accessed 2026-08-07]
- **BYOK (Bring Your Own Key)**: users can supply their own LLM API keys, decoupling trust from Sweep-hosted models. "If you use Bring Your Own Key, the cost of the model listed above does not apply and zero data retention is based on your own API configuration." [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Recommended models** with explicit zero-data-retention markers: "Sweep-0.1, Opus 4.5, GPT-5.2, Sweep Next-Edit" all marked "Yes" for Zero Data Retention. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Original-product trust pattern** (historical): "PR validation like self-review and GitHub actions, which brings it even closer to a junior dev." [Source: https://news.ycombinator.com/item?id=36988253, accessed 2026-08-07]

## 22. Explainability

- **Applied code blocks are visible**: user sees exactly what was changed before accepting (⌘ Y) or rejecting (⌘ N). [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **Diff view** in the Sweep sidebar shows proposed changes inline. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **AI Code Review** explains bugs and improvements in plain language. [Source: https://docs.sweep.dev/ai-code-review, accessed 2026-08-07]
- **AI Commit Messages** generate a human-readable summary of staged changes. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **Output normalization** is a transparent (regex-based) explanation of how Sweep cleans up LLM output before applying. [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- No documented "why did Sweep do X" post-hoc explanation feature; the chat transcript is the only explanation surface.

## 23. Long Session Experience

- **One chat per task** is the explicit recommendation — long sessions hurt model intelligence. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Edit your previous message** to redirect Sweep rather than stacking follow-ups (cleaner long-thread behavior). [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Checkpoints + Revert Changes** let the user iterate safely without polluting git history (changes are tracked since the chat was sent, not yet committed). [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **AI Commit Messages** with "learn from your last 10 commits" — Sweep adapts to team commit style over time. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **SWEEP.md / CLAUDE.md** project-level instructions persist across sessions. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- No documented cross-session chat history, no org-level knowledge base, no parallel-agent orchestration. (Gaps vs Devin.)

## 24. Power User Features

- **JetBrains-native integration**: uses JetBrains PSI (Program Structure Interface) for context — "It's smarter and faster than Cursor because we use the internal JetBrains static analysis tools." [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
- **Next-Edit Autocomplete** with custom Sweep Next-Edit 1.5B / 7B models — beats `continuedev/instinct`, `zed-industries/zeta`, and Mercury Coder on whitespace-agnostic exact-match accuracy. [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]
- **Output normalization** reduces code editing error rate from 13% to 8%. [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- **Token healing** improves LLM spelling. [Source: https://blog.sweep.dev/posts/token-healing-autocomplete, accessed 2026-08-07]
- **Adaptive-depth file outline** reduces token usage 90% for large files. [Source: https://blog.sweep.dev/posts/read-file, accessed 2026-08-07]
- **BYOK (Bring Your Own Key)** — bring your own LLM API keys. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Custom Prompts** and **sweep-commit-template.md** for team-specific commit styles. [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **MCP Servers** with full OAuth 2.0/2.1 support (changelog 1.27, Dec 2025). [Source: https://sweep.dev/, accessed 2026-08-07]
- **JetBrains Gateway** support (remote development). [Source: https://docs.sweep.dev/, accessed 2026-08-07]
- **Multi-IDE**: IntelliJ, PyCharm, Android Studio, WebStorm, PhpStorm, Rider, Goland, CLion, RustRover, RubyMine, JetBrains Gateway. [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
- **VS Code + Zed** support for Next-Edit Autocomplete. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
- **Sweep-0.1** (their own LLM, $0.30/M input, $2.20/M output, $0.02/msg average) — "fast and great performance, best for daily coding." [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Model selection**: Opus 4.5, GPT-5.2, Sonnet 4.5, Haiku 4.5, GLM 4.6, Grok Code Fast 1, GPT-5, GPT-5-Codex, Gemini 3 Pro, Gemini 3 Flash. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Web Search & Fetch Tools** (changelog 1.24, Oct 6, 2025). [Source: https://sweep.dev/, accessed 2026-08-07]
- **AI Code Review** for diffs between branches (changelog 1.25, Oct 31, 2025). [Source: https://sweep.dev/, accessed 2026-08-07]
- **Rebinding all shortcuts** via JetBrains Keymap. [Source: https://docs.sweep.dev/shortcuts, accessed 2026-08-07]
- **5% markup on underlying LLM cost** for agent usage (transparent pricing). [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]

## 25. Developer Experience

- **JetBrains plugin install**: Settings → Plugins → search "Sweep AI" → Install → Restart. [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
- **Token-based auth**: "Sign In with Sweep" redirects to https://app.sweep.dev; or paste token into Settings. [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
- **VS Code / Zed** install paths documented. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
- **Pricing transparency**: free tier; $20 Pro plan (with $20 Sweep API Credits); Team plan with $40 credits per seat; 5% markup on LLM cost for agent usage; credits roll over for 30 days; pay-as-you-go top-up. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Open-source artifacts**: 1.5B Next-Edit model open-sourced. [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]
- **Changelog** maintained publicly (1.24, 1.25, 1.26, 1.27 visible on home page). [Source: https://sweep.dev/, accessed 2026-08-07]
- **Engineering blog** (blog.sweep.dev) with deep technical posts on autocomplete, token healing, output normalization, file reading, JetBrains PSI — high signal-to-noise. [Source: https://blog.sweep.dev/, accessed 2026-08-07]
- **Active development**: most recent blog post Feb 04, 2026 (Sweep in Zed); changelog 1.27 Dec 1, 2025. [Source: https://blog.sweep.dev/, accessed 2026-08-07]
- **No public API** documented in the docs index — only the IDE plugin and BYOK. (Gap vs Devin.)
- **No CLI / no cloud agent** — Sweep is purely IDE-plugin-shaped now (the original cloud PR-bot is gone). [Source: https://docs.sweep.dev/, accessed 2026-08-07]

## 26. Biggest Strengths (with evidence)

1. **Pivot to JetBrains-native was the right call** — JetBrains users had been underserved by AI tooling. Customer testimonial (Josiah Parappally, Tech Lead at Ramp): "Next-edit autocomplete in PyCharm is an absolute game changer. I used to have to choose between using PyCharm and good autocomplete - but with Sweep, I get both." [Source: https://sweep.dev/, accessed 2026-08-07]
2. **Engineering depth visible in blog** — output normalization (13% → 8% error rate), adaptive-depth outlines (90% token reduction for large files), token healing, sub-100ms autocomplete. These are real, measurable improvements with public methodology. [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07] [Source: https://blog.sweep.dev/posts/read-file, accessed 2026-08-07] [Source: https://blog.sweep.dev/posts/token-healing-autocomplete, accessed 2026-08-07] [Source: https://blog.sweep.dev/posts/next-edit-jetbrains, accessed 2026-08-07]
3. **Open-sourced the 1.5B Next-Edit model** with public evals beating Zeta, Instinct, and Mercury Coder on exact-match accuracy. [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]
4. **JetBrains PSI integration** is a genuine technical moat — competitors using text-based context can't match JetBrains' native structural understanding. [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07] [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07]
5. **Transparent pricing** with 5% markup on underlying LLM cost, $20 Pro plan with $20 in API credits, BYOK option. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
6. **Strong market traction signal**: "4.9 stars · 40k+ installs" on JetBrains Marketplace, "Trusted every day by thousands of professional developers." [Source: https://sweep.dev/, accessed 2026-08-07]
7. **BYOK** decouples Sweep's revenue from LLM provider lock-in. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
8. **Engineering blog as marketing** — high-quality technical posts build credibility with senior developers (the target audience). [Source: https://blog.sweep.dev/, accessed 2026-08-07]

## 27. Biggest Weaknesses (with evidence)

1. **The original Sweep product (the "AI junior dev" GitHub PR bot) has been sunset** — no longer marketed, no longer in the docs nav, the old `docs.sweep.dev/blogs/giving-dev-tools` URL returns 404. The YC S23 launch thread (198 points, Aug 2023) describes a product that no longer exists. [Observed: curl https://docs.sweep.dev/blogs/giving-dev-tools → 404, 2026-08-07] [Source: https://news.ycombinator.com/item?id=36987454, accessed 2026-08-07]
2. **Original PRs were acknowledged as low quality** — founder Kevin Lu (paraphrased from the launch thread): "The PRs we made 2 months ago were really bad. That's also been the biggest barrier to getting them merged." [Source: https://news.ycombinator.com/item?id=36988812, accessed 2026-08-07]
3. **The "junior dev" positioning was criticized even at launch** — HN commenter latortuga: "Developers already don't like reading the code, we even have a ubiquitous acronym for it. Writing is the fun part. ... I would tell them no - the whole point of having junior devs do simpler tasks is that's what level they're at. They don't get to the next level magically, by not writing code." [Source: https://news.ycombinator.com/item?id=36988200, accessed 2026-08-07]
4. **No public API, no CLI, no cloud agent** — Sweep is now IDE-plugin-only. Compared to Devin's API + CLI + Cloud + Desktop matrix, Sweep's surface is narrow. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
5. **No org-level knowledge base, no DeepWiki equivalent** — Sweep has SWEEP.md / CLAUDE.md (project-level) but no org-wide knowledge. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
6. **No stacked PRs / parallel agents** — Sweep's agent is single-threaded per chat. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
7. **Bash tool gated by IDE version** — IntelliJ 2025.1 and below requires Classic Terminal engine; IntelliJ 2025.2+ supports both Reworked and Classic. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
8. **Windows/Linux uses PowerShell instead of bash** — limits agent's terminal flexibility on those platforms. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
9. **Limited IDE coverage outside JetBrains** — VS Code and Zed get Next-Edit Autocomplete only, no Agent / Inline Editing / AI Commit Messages / AI Code Review. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
10. **Brand confusion from pivot** — the original "Sweep = junior dev PR bot" narrative is now obsolete; the new "Sweep = JetBrains autocomplete" narrative is competing in a crowded space (Cursor, GitHub Copilot, JetBrains AI Assistant, Augment Code, Windsurf). HN commenter (Sweep founder, posting as user): "Transparently I'm a founder building a plugin that's like 'Cursor for JetBrains IDEs', if you're an windsurf user you might like us: https://plugins.jetbrains.com/plugin/26860-sweep-ai" — founder self-positioning as "Cursor for JetBrains." [Source: https://news.ycombinator.com/item?id=44564943, accessed 2026-08-07]
11. **No accessibility documentation** — gap. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
12. **No published benchmarks for the Agent** (vs Devin's SWE-bench claim, Aider's leaderboards) — only Next-Edit Autocomplete is benchmarked publicly. [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]

## 28. What should MiMo learn?

- **JetBrains PSI is a real moat**. Native IDE static-analysis integration beats text-based context for accuracy. [Source: https://docs.sweep.dev/jetbrains, accessed 2026-08-07] [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- **Output normalization (modifying assistant messages to preempt IDE auto-formatting)** is a clever technique that measurably reduces agent error rate (13% → 8%). [Source: https://blog.sweep.dev/posts/jetbrains-coding-agent, accessed 2026-08-07]
- **Adaptive-depth file outline** ("`(N children)` markers + line ranges, depth capped at 10 → reduced by 1 until under 10K tokens") reduces token usage 90% for large files without losing structural fidelity. [Source: https://blog.sweep.dev/posts/read-file, accessed 2026-08-07]
- **Token healing** to fix LLM spelling errors at the token-boundary level — improves autocomplete accuracy. [Source: https://blog.sweep.dev/posts/token-healing-autocomplete, accessed 2026-08-07]
- **Sub-100ms autocomplete** as an explicit engineering target with a dedicated blog post — performance is a marketable feature. [Source: https://blog.sweep.dev/posts/next-edit-jetbrains, accessed 2026-08-07]
- **Open-sourcing the 1.5B Next-Edit model with public evals** builds technical credibility and adoption. [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]
- **Transparent 5% markup pricing with API credits** is more honest than opaque enterprise-only pricing. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **BYOK** decouples the product from any single LLM provider. [Source: https://docs.sweep.dev/pricing, accessed 2026-08-07]
- **Engineering blog as primary marketing channel** — deep technical posts attract the senior-engineer target audience. [Source: https://blog.sweep.dev/, accessed 2026-08-07]
- **Checkpoints + Revert Changes (bulk or one-at-a-time)** is a clean inline-IDE trust pattern. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **SWEEP.md / CLAUDE.md / sweep-commit-template.md** as a layered conventions system — project-level rules, commit-style learning. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07] [Source: https://docs.sweep.dev/ai-commit-message, accessed 2026-08-07]
- **One chat per task + edit-your-previous-message** is a clean conversation-management discipline that prevents model-intelligence degradation. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]

## 29. What should MiMo reject?

- **The "AI junior developer" framing was criticized even at launch** — "junior devs become mid level developers by writing code, by practicing, by building small features, by doing grunt work." MiMo should not position itself as a replacement for junior-developer learning cycles. [Source: https://news.ycombinator.com/item?id=36988200, accessed 2026-08-07]
- **Async GitHub-issue-to-PR as the primary product** was sunset by Sweep itself — the surface was too narrow and too low-quality to sustain. MiMo should not ship a PR-bot-only product. [Observed: https://docs.sweep.dev/blogs/giving-dev-tools → 404, 2026-08-07] [Source: https://news.ycombinator.com/item?id=36988812, accessed 2026-08-07]
- **Bash tool gated by IDE version** is a fragile dependency on JetBrains internals. MiMo should not couple core agent capability to a specific IDE-version's terminal engine. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **Windows/Linux uses PowerShell instead of bash** — Sweep's agent is less capable on non-Mac platforms. MiMo should standardize on a cross-platform shell abstraction. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **No org-level knowledge base** — Sweep's SWEEP.md is project-level only. MiMo should support org-wide knowledge like Devin's. [Source: https://docs.sweep.dev/agent, accessed 2026-08-07]
- **No public benchmark for the Agent itself** — only Next-Edit Autocomplete is benchmarked. MiMo should publish ongoing accuracy benchmarks for the agent, not just the autocomplete. [Source: https://blog.sweep.dev/posts/oss-next-edit, accessed 2026-08-07]
- **No documented accessibility program**. MiMo should not replicate this gap. [Source: https://docs.sweep.dev/, accessed 2026-08-07]
- **"Cursor for JetBrains" self-positioning by the founder** is a derivative frame — MiMo should not position itself as "X for Y" but as a category-defining product. [Source: https://news.ycombinator.com/item?id=44564943, accessed 2026-08-07]
- **Founder admitted original PRs were "really bad"** — quality at launch was a problem. MiMo should not ship a public PR-bot product until quality is verifiably high. [Source: https://news.ycombinator.com/item?id=36988812, accessed 2026-08-07]

## 30. Confidence Score

**Sweep: 80/100**.

Reasoning: I read the current sweep.dev home page, the docs.sweep.dev index, and 8 feature docs (agent, inline-editing, ai-commit-message, ai-code-review, pricing, jetbrains, shortcuts, docs index) plus 6 engineering blog posts (jetbrains-coding-agent, read-file, oss-next-edit, sweep-in-zed, token-healing-autocomplete, next-edit-jetbrains) and the YC S23 launch HN thread (198 points) with its first 8 top-level comments. I directly verified the sunset of the original product by confirming that `docs.sweep.dev/blogs/giving-dev-tools` (referenced in the launch thread) returns 404 today, and that the docs.sweep.dev nav no longer mentions GitHub-issue-to-PR workflow.

The 20-point gap is for: (a) I could not directly observe the live plugin (no JetBrains IDE in this environment) — all keyboard-shortcut, animation, and accept/reject-flow claims are doc-grounded, not directly observed; (b) the historical product (pre-pivot) is documented only via the YC S23 launch HN thread and one founder comment — the original docs.sweep.dev/blogs/* pages are 404, so I cannot independently verify the original product's feature set beyond the launch thread; (c) the "sunset" framing is inferred from the absence of the GitHub-bot workflow in current marketing and the 404 on the original blog URL — Sweep did not publish a formal "we are sunsetting the PR bot" announcement that I could find, so the pivot timing and formal status are not 100% confirmed; (d) benchmarks for the Agent itself are not published (only Next-Edit Autocomplete is benchmarked).

[Sources: 8 docs.sweep.dev feature pages, 6 blog.sweep.dev posts, 1 YC S23 HN launch thread, 1 HN comment in Cognition-Windsurf thread — all accessed 2026-08-07]
