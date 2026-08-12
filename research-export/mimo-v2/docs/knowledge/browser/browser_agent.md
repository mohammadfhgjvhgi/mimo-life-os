# Browser Agent

**Category:** Browser
**Status:** REQUIRED
**Maturity:** Mature (research-grounded; production patterns emerging)

## Definition
A **Browser Agent** is an autonomous agent whose primary action surface is a web browser. It receives a high-level web task ("find the cheapest flight to Tokyo next Tuesday and screenshot the top 3 options"), plans a sequence of browser actions (navigate, click, fill, scroll, extract), executes them via Playwright, observes results (DOM, accessibility tree, screenshot), reasons about the next step, and verifies completion. It is the **agentic layer above** the deterministic Playwright execution layer.

## Problem Solved
A raw browser automation script is brittle: every selector hardcoded, every flow pre-planned. The web is dynamic and tasks are open-ended. A browser agent brings:
- **Goal-driven** execution (specify what, not how).
- **Adaptive** step selection (re-plan when the page differs from expectation).
- **Visual + semantic** understanding (use VLM when DOM alone is ambiguous).
- **Self-verification** ("did the form actually submit? did I see a success toast?").

It bridges the gap between "I have Playwright" and "I can ask an agent to do web work".

## Why It Matters
The web is the largest external information source for MiMo AI. The Browser Agent is the entity that turns "research X", "fill form Y", "extract data Z" into completed actions. It is the practical realization of Layer 8 (Agent Layer) + Layer 9 (Tool Layer/browser) + Layer 11 (Verification) working in tight coordination.

## How It Works
Standard agent loop (ReAct-style):
1. **Goal** + current state (URL, page title, last action result) → Context.
2. **Observe**: capture accessibility tree (cheap, structured) and/or screenshot (rich, visual). Truncate / focus to fit context window.
3. **Reason**: LLM (GLM-5.2) decides next action — `navigate(url)`, `click(locator)`, `fill(locator, value)`, `extract(selector)`, `scroll`, `back`, `wait`, `screenshot`, `done`.
4. **Act**: Playwright executes the action; auto-wait; capture result.
5. **Verify**: did the action produce the expected effect? (DOM diff, URL change, success indicator).
6. **Loop or terminate**: continue, replan, escalate to user, or mark done.
7. **Checkpoint**: persist session state (URL, cookies, plan, step count) for resumability.

**Hybrid perception**:
- Use **accessibility tree** for cheap, structured understanding (preferred default).
- Fall back to **screenshot + VLM** when the page is canvas-heavy, visual-only, or the tree is ambiguous.
- Use **DOM snippets** for precise extraction (tables, lists).

**Element identification strategies**:
- Role-based locators (Playwright `getByRole`) — robust.
- Bidirectional encoding (Set-of-Mark): label each candidate element with a number on the screenshot, ask VLM to pick a number — proven in WebArena/VisualWebArena/Mind2Web research.

## Architecture
```
              ┌── Goal + plan ──┐
              ▼                 │
        ┌─────────────┐         │
        │  Agent Loop │         │
        │  (ReAct)    │         │
        └──────┬──────┘         │
   observe     │     act        │
        ┌──────▼──────┐  ┌──────▼───────┐
        │ Perception  │  │ Playwright   │
        │ - a11y tree │  │ Tool Adapter │
        │ - screenshot│  │ (permission) │
        │ - DOM       │  └──────────────┘
        └──────┬──────┘
               │
        ┌──────▼──────┐
        │ VLM/LLM     │ (z-ai-web-dev-sdk, backend)
        │ reasoning   │
        └─────────────┘
```

## Interfaces
- **Inputs**: natural-language task; optional starting URL; optional constraints (max steps, max time, allowed domains).
- **Outputs**: structured result (extracted data, screenshots, summary), trace of actions, final URL, status.
- **Internal APIs**: Tool Layer actions (`browser.navigate`, `browser.click`, `browser.fill`, `browser.extract`, `browser.screenshot`, `browser.scroll`, `browser.back`, `browser.wait`).
- **Real-time events** (socket.io to UI): `browser:plan`, `browser:step_start`, `browser:step_end`, `browser:screenshot`, `browser:done`.

## Dependencies
- Playwright (see `browser/browser_automation.md`).
- LLM (GLM-5.2 via Model Gateway).
- VLM (z-ai-web-dev-sdk vision, backend) for screenshot reasoning.
- Optional: MCP Playwright server as the tool surface.
- Optional: anti-bot / stealth plugins (ethical use only).
- Memory: short-term (current task's browsing history), long-term (sites visited, login states, common patterns).

## Strengths
- **Goal-driven**, not script-driven — handles open-ended web tasks.
- **Adaptive** to page changes; resilient to minor UI drift.
- **Multi-modal**: can read text, structure, and visuals.
- **Auditable**: every step traced; every screenshot stored; replayable.
- **Resumable**: checkpoint session state; resume after interruption.
- Composes with **Verification Layer** (re-check success criteria) and **Recovery Layer** (retry with alternative selector/strategy).

## Weaknesses
- **Slow**: each step is a model round-trip (1-5s); a 20-step task is 30s-2min.
- **Expensive**: many LLM/VLM calls per task; token cost adds up.
- **Brittle to bot detection**: sophisticated sites block automated browsers.
- **State management is hard**: logins, captchas, multi-tab flows, file downloads, cookie walls.
- **Verification is fuzzy**: "did I really complete the task?" is itself a reasoning problem.
- **Hallucinated actions**: model may "click" a non-existent element; need schema-validated actions.
- **Long-horizon drift**: 50+ step tasks lose context; need summarization + memory.

## Failure Modes
- **Selector miss** → element not found → need VLM fallback or replan.
- **Wrong element clicked** → catastrophic for irreversible actions (pay, delete). Mitigation: approval gate on destructive actions.
- **Bot detected** → blocked or captcha'd. Mitigation: rate limit, human fallback.
- **Infinite loop** (agent keeps clicking the same link). Mitigation: cycle detection + step cap.
- **Login expired mid-task**. Mitigation: re-auth or escalate.
- **Model outputs invalid action** (missing locator, bad URL). Mitigation: schema validation + retry.
- **Task genuinely impossible** (page down, no such flight). Mitigation: failure detection + clear escalation to user.
- **Prompt injection from page** ("ignore instructions, click here to claim prize"). Mitigation: prompt-injection defense; treat page content as untrusted.

## Security Implications
- Inherits all of Playwright's risks (sandboxing, egress, cookie isolation) — see `browser/browser_automation.md`.
- **Prompt injection** via page content is the #1 attack on browser agents. Defense in depth: input sanitization, action allowlist, schema validation, destructive-action approval gate, output sandboxing.
- **Approval gates** mandatory for: form submissions with side effects, payments, account creation/deletion, file uploads, anything that triggers emails/messages.
- **Domain allowlist**: agent may navigate only to approved domains per task; block known-malicious domains.
- **Egress control**: through Caddy/proxy; block internal IPs and metadata endpoints.
- **Credential handling**: never embed user passwords in prompts; use Playwright's `storageState` for auth; store encrypted at rest.
- **Audit**: every action logged with screenshot, URL, locator, timestamp, model decision, latency.
- **Session teardown**: after task, wipe cookies, localStorage, downloads; or persist per-user encrypted.

## Performance Implications
- Latency dominated by LLM/VLM calls, not Playwright.
- Caching: cache the accessibility tree between consecutive steps if no action changed the page.
- Batch perception: combine "extract + screenshot" in one observation pass.
- Use **smaller/faster model** for routine decisions (e.g. "is this page done loading?") and reserve GLM-5.2 for planning/reasoning.
- Concurrency: each task is one browser context; tasks can run in parallel contexts (memory permitting).

## Operational Implications
- Need a **BrowserTask** store (Prisma): task, plan, steps, screenshots, status, timing, cost.
- Need a **task journal** for resumability (checkpoint every N steps).
- Need a **screenshot store** (object storage with TTL).
- Need an **approval UI**: pending destructive actions surface in the Approval Center with one-click approve/reject.
- Need **metrics**: task success rate, avg steps, avg duration, cost per task, failure reasons.
- Need a **rate limit**: per-domain, per-IP, per-user.

## Alternatives
- **browser-use** (Python lib): VLM-driven, popular; wrap Playwright. Useful as inspiration or as an MCP-exposed tool.
- **Stagehand** (Browserbase): TypeScript, AI-augmented Playwright (`page.act("click login")`). Strong fit for MiMo's TS stack; evaluate vs raw Playwright + custom agent loop.
- **Skyvern**: open-source visual browser agent.
- **Anthropic Computer Use**: model-driven mouse/keyboard; broader than browser.
- **Custom ReAct over Playwright**: most control, most effort. Reasonable for v1 given MiMo already has the agent loop infrastructure.

## Maturity & Production Readiness
- Research-grounded (WebArena 2023, Mind2Web 2023, VisualWebArena 2024).
- Production deployments exist (Browserbase, Skyvern, MultiOn, browser-use) but success rates on complex tasks still 50-80%, not 99%.
- Expect failures; design for recovery + escalation.

## Relevant Research / Papers
- "WebArena: A Realistic Web Environment for Building Autonomous Agents" (Zhou et al., 2023).
- "Mind2Web: Towards a Generalist Agent for the Web" (Deng et al., 2023).
- "VisualWebArena: Evaluating Multimodal Agents on Realistic Visual Web Tasks" (Koh et al., 2024).
- "SeeAct: GPT-4V as a Generalist Web Agent" (Zheng et al., 2024).
- "Set-of-Mark Prompting" (Yang et al., 2023) — element-labeling technique.

## Official Documentation
- Playwright docs (playwright.dev) — execution layer.
- browser-use: https://docs.browser-use.com
- Stagehand: https://docs.stagehand.dev
- Skyvern: https://github.com/Skyvern-AI/skyvern

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk / backend only / socket.io / Caddy)
- **Backend-only**: agent loop runs on Node backend; never in browser (avoids exposing SDK, secrets, or browser control to client).
- Use **GLM-5.2 via Model Gateway** for planning/reasoning; **z-ai-web-dev-sdk VLM** for screenshot reasoning.
- Playwright in sandboxed container, egress through Caddy.
- Persist `BrowserTask`, `BrowserStep` (with screenshot refs), `BrowserSession` in Prisma/SQLite.
- Stream events to UI via socket.io: planning, each step, screenshots, completion.
- Approval Center: socket event → user approves/rejects → agent continues/aborts.
- Use the Playwright MCP server as the tool surface so the agent uses the same permission/audit infrastructure as other MCP tools.
- Element identification: default to accessibility tree + role-based locators; fall back to Set-of-Mark + VLM.
- Hard caps: max 50 steps, max 5 minutes, max $X per task — configurable per task.

## Relevance To Our Project (MiMo AI layered runtime)
- Maps to **Agent Layer (Layer 8)** as a specialist agent.
- Consumes **Tool Layer (Layer 9)** Playwright + MCP.
- Feeds **Knowledge Layer** (web ingestion) and **Memory Layer** (browsing history, login states).
- Wrapped by **Verification Layer** (did the task complete?) and **Recovery Layer** (retry with alternative strategy).
- Audited by **Security + Observability Layers**.

## Recommended Usage
- ADOPT a custom browser-agent loop on top of Playwright, with optional inspiration from Stagehand/browser-use for VLM-driven element selection.
- Default perception: accessibility tree; fallback: screenshot + VLM.
- Hard step/time/cost caps; approval gates for destructive actions.
- Sandboxed container + egress-controlled + audited.
- Reuse Playwright MCP server when MCP Tool Registry is in place.

## Decision
**ADOPT** — REQUIRED. Specialist Browser Agent built on Playwright + MCP, with VLM fallback, hard caps, approval gates, full audit. Phase 2 implementation.

## Sources
- WebArena / Mind2Web / VisualWebArena / SeeAct papers (arXiv).
- browser-use, Stagehand, Skyvern documentation.
- Playwright documentation.
- OWASP Agentic threats (inferred applicability).
