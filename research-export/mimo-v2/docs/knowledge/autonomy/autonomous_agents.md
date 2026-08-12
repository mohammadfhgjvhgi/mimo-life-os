# Autonomous Agents

**Category:** Autonomy
**Status:** REQUIRED
**Maturity:** Mature (pattern); Emerging (in production AI safety)

## Definition
An Autonomous Agent in MiMo AI is a runtime entity that **decides to act without an explicit user turn** — triggered by schedules, events, persistent goals, or proactive signals — and runs through a gated pipeline: **trigger → should-act? → permission → plan → execute → verify → notify**. It is *not* unrestricted self-direction; every autonomous action passes through safety gates and is reversible/abortable.

## Problem Solved
- A reactive-only AI waits for the user; long-horizon goals ("keep my notes organized", "watch this repo for releases", "summarize my day at 8pm") never get done.
- Without structure, "the AI acted on its own" becomes a safety hazard (unchecked tool calls, runaway cost, unwanted side effects).
- Scheduled/event-driven work needs a consistent lifecycle, not ad-hoc `setTimeout`s scattered around.

## Why It Matters
Autonomy is the difference between a chatbot and a personal AI. But uncontrolled autonomy is dangerous. MiMo AI's autonomy is **graduated and gated** — the system may act proactively *when authorized*, must *ask before risky actions*, must *verify its own work*, and must *notify the user* of what it did. This file documents the lifecycle; the gating policy lives in the Security Layer.

## How It Works
### The 7-stage autonomous action pipeline
1. **Trigger** — one of:
   - **Scheduled** — cron-like (`runAt`, `repeat`); e.g., "every day at 8pm, summarize my notes."
   - **Event-driven** — subscribed to an Event Bus topic; e.g., "on `chunk.ingested` for a watched folder, extract action items."
   - **Background** — long-running watcher; e.g., "poll this GitHub repo for new releases."
   - **Proactive** — pattern/opportunity detected by the proactive-intelligence subsystem; e.g., "I notice you've opened this file 5 times today — want me to summarize it?"
   - **Persistent goal** — a standing goal ("keep my calendar tidy") checked periodically.
2. **Should-act? gate** — a fast, cheap policy check that decides whether the trigger *should* result in an action *right now*:
   - Is this trigger still relevant? (e.g., the user is in a meeting — defer non-urgent)
   - Is the predicted cost worth the predicted value? (cost/value heuristic)
   - Is the user asleep / at work / in focus mode? (from user state)
   - Has this trigger fired too recently? (rate limit)
   - Are there conflicting higher-priority actions running?
   - → Output: `ACT` / `DEFER` / `SKIP`.
3. **Permission gate** — what is the action allowed to do?
   - Read-only (safe; e.g., summarize) → auto-approve.
   - Side-effecting but reversible (e.g., create a draft, send a calendar invite to self) → auto-approve if in the user's pre-approved scope.
   - Side-effecting and irreversible / external (e.g., send an email, run a shell command, post to a service) → **require explicit approval** (Approval Center UI) unless pre-authorized for this exact action.
   - Dangerous (e.g., delete a file, modify code, spend money) → **always require approval**, even if pre-authorized scope covers it (defense in depth).
4. **Plan** — the Planning Layer produces a task graph (goal → strategy → tasks).
5. **Execute** — the Execution Layer runs the task graph with checkpoints, retries, recovery, deadlines, budget. State persisted continuously.
6. **Verify** — the Verification Layer checks the result. `FAIL` → Recovery → replan (bounded retries); `PASS` → proceed to notify.
7. **Notify** — the user is informed:
   - **Real-time** for actions the user is likely watching (socket.io event → toast).
   - **Batched digest** for low-urgency actions ("here's what I did today").
   - **Approval-required** path is a special notify that blocks until the user resolves it.

### Lifecycle state machine
```
TRIGGERED → SHOULD_ACT? ─ACT─▶ PERMISSION ─auto/pre─▶ PLANNING → EXECUTING ─▶ VERIFYING ─PASS─▶ NOTIFIED (done)
                │                  │                       │             │
              DEFER               DENY                   FAIL          FAIL
                │                  │                       │             │
                ▼                  ▼                       ▼             ▼
            (re-schedule)     (notify deny)         (replan ≤N)     (recovery → escalate)
```

## Architecture
```
Event Bus / Scheduler ──trigger──▶ Autonomy Runtime
                                      │
                                      ├─ should-act? (policy + user-state)
                                      │       │
                                      │     ACT / DEFER / SKIP
                                      │
                                      ├─ permission (RBAC + scope + approval gate)
                                      │
                                      ├─ plan (Planning Layer)
                                      │
                                      ├─ execute (Execution Layer + Task Queue)
                                      │
                                      ├─ verify (Verification Layer)
                                      │
                                      └─ notify (socket.io + digest + approval-center)
```

## Interfaces
```ts
interface AutonomousAction {
  id: string;
  triggerId: string;
  triggerType: 'schedule'|'event'|'background'|'proactive'|'persistent-goal';
  goal: string;
  predictedCostUsd: number;
  predictedValue: number;            // 0..1 heuristic
  permissionScope: PermissionScope;  // read-only | reversible | external | dangerous
  requiresApproval: boolean;
  state: 'triggered'|'shouldAct'|'approved'|'planning'|'executing'|'verifying'|'done'|'failed'|'escalated'|'denied'|'deferred';
  budget: { maxCostUsd: number; maxDurationMs: number; maxSteps: number };
  traceId: string;
  createdAt: Date;
}

interface AutonomyRuntime {
  registerTrigger(t: Trigger): void;
  evaluateShouldAct(action: AutonomousAction): Promise<'ACT'|'DEFER'|'SKIP'>;
  requestPermission(action: AutonomousAction): Promise<'approved'|'denied'|'deferred'>;
  run(action: AutonomousAction): Promise<ActionResult>;
}

interface Trigger {
  id: string;
  type: TriggerType;
  predicate: (event?: Event) => boolean;
  buildAction: (event?: Event) => AutonomousAction;
  rateLimit?: { per: number; max: number };
}
```

## Dependencies
- Event Bus (triggers).
- Task Queue (execute).
- Planning Layer, Execution Layer, Verification Layer, Recovery Layer.
- Security Layer (permission, approval, sandbox).
- User State (mode: focus/work/sleep; location; calendar) for should-act? decisions.
- Memory Layer (preferences: "do I auto-approve this kind of action?").
- socket.io + Approval Center UI (notify).

## Strengths
- **Structured** — every autonomous action follows the same lifecycle; no ad-hoc "the AI just did X."
- **Safe by construction** — should-act? + permission + verification gates every action.
- **Observable** — every stage emits events; full audit trail.
- **Reversible** — most actions are read-only or reversible; irreversible ones require explicit approval.
- **Cost-bounded** — every action has a budget; runaway loops cut off.
- **Resumable** — execution checkpoints let long-horizon autonomous actions survive restarts.

## Weaknesses
- **Should-act? is hard** — a cheap heuristic may defer important work or act on trivial triggers. Needs tuning + user feedback.
- **Permission fatigue** — too many approval prompts → user clicks "approve all" → defeats the gate. Mitigation: pre-authorization scopes with clearly displayed scope.
- **Proactive false-positives** — annoying ("you opened this file 5 times!") erode trust. Mitigation: conservative thresholds; allow user to mute proactive triggers per-pattern.
- **Verification on autonomous work is harder** — there's no user in the loop to catch a wrong intermediate result. Mitigation: stricter verification thresholds for autonomous vs. interactive work.
- **Coordination** — multiple autonomous actions running simultaneously may conflict (e.g., two consolidations on the same memory). Mitigation: per-entity locks.

## Failure Modes
- **Bypassed gate** — a developer adds a shortcut "just run this" without the pipeline → untracked autonomous action. Mitigation: no public API to execute tools/agents without going through the Autonomy Runtime (architectural enforcement).
- **Should-act? misfire** — acts during a meeting, at 3am, etc. Mitigation: user-state signals; "do not disturb" mode.
- **Approval never resolves** — user is offline; action blocks forever. Mitigation: timeouts → defer or escalate.
- **Runaway loop** — autonomous action triggers another autonomous action triggers another... Mitigation: traceId chain depth limit; if exceeded, abort + alert.
- **Stale persistent goal** — goal no longer relevant but keeps firing. Mitigation: goal expiry + periodic user review.
- **Verification FAIL loops** — action keeps replanning and failing. Mitigation: bounded retries → escalate to user.

## Security Implications
- **Kill switch** — must exist: a global "pause all autonomous actions" toggle, surfaced in the UI, wired into the Autonomy Runtime. Activated instantly, blocks new triggers, gracefully stops in-flight actions.
- **Approval gates** are the primary safety mechanism for irreversible/external actions — they must not be bypassable by code.
- **Pre-authorization scopes** must be narrow ("summarize files in `~/Notes`", not "read all files"); displayed and revocable in the UI.
- **Audit log** — every autonomous action (trigger → outcome) persisted; the user can review "what did MiMo do today."
- **Prompt-injection defense** — autonomous actions read external content (emails, web pages); a malicious payload could try to trick the planner into an undesired action. Mitigation: external content is untrusted; planner instructions are privileged; tool-arg validation at the Gateway.

## Performance Implications
- Should-act? gate: cheap (in-memory policy + user-state lookup).
- Permission gate: cheap for read-only; blocking for approval-required (latency = user response time).
- Execution: dominates cost; bounded by `budget`.
- Verification: adds latency but catches expensive mistakes early.

## Operational Implications
- Need an **Autonomy Settings UI**: triggers, schedules, pre-authorization scopes, kill switch, "what did MiMo do today" log.
- Need a **digest channel** (daily summary of autonomous actions).
- Need a **monitor** for runaway actions (depth, cost, duration).
- Need a **trigger registry** (Prisma `Trigger` table) so triggers persist across restarts.

## Alternatives
- **No autonomy (reactive-only):** rejected — fails the project goal of a personal AI.
- **Unrestricted autonomy (no gates):** rejected — unsafe; explicitly forbidden by the project source material.
- **Cron + scripts (no runtime):** rejected — no should-act?, no permission, no verification, no audit; ad-hoc and dangerous.
- **External orchestration (Temporal/Airflow):** overkill for personal scale; rejected for v1.

## Maturity & Production Readiness
- The lifecycle pattern is mature (well-understood in agent-systems literature).
- Production AI safety around autonomous agents is still emerging — the gating policy needs iteration based on real use.
- Suitable for v1 with conservative defaults (most proactive triggers OFF by default; user opts in per-pattern).

## Relevant Research / Papers
- AutoGPT, BabyAGI (2023) — early autonomous-agent prototypes; lessons on runaway cost and lack of verification.
- "SWE-agent: Agent-Computer Interfaces Enable Software Engineering" (Yang et al., 2024) — structured agent lifecycle.
- Anthropic / OpenAI agent safety guidelines — approval gates, kill switches.
- Reflexion (Shinn et al., 2023) — verifier-in-the-loop pattern.
- *Verify exact citations at integration time.*

## Official Documentation
- node-cron / `croner` for scheduling: `https://github.com/hexagon/croner`.
- Temporal (future scale path, not v1): `https://docs.temporal.io/`.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Autonomy Runtime is a server-side module; triggers fire from the Event Bus or the scheduler mini-service.
- **Module layout:**
  - `src/server/autonomy/runtime.ts` — the `AutonomyRuntime` class + 7-stage pipeline.
  - `src/server/autonomy/triggers/` — trigger definitions (schedule, event, background, proactive, persistent-goal).
  - `src/server/autonomy/should-act.ts` — should-act? policy engine (reads user state + memory preferences).
  - `src/server/autonomy/permission.ts` — permission resolver + approval-gate client.
  - `src/server/autonomy/kill-switch.ts` — global pause toggle.
- **Prisma schema:** `Trigger { id, type, enabled, config Json, rateLimit Json?, createdAt }`, `AutonomousAction { id, triggerId, goal, state, predictedCostUsd, permissionScope, requiresApproval, budget Json, traceId, createdAt, ...transitions }`, `ApprovalRequest { id, actionId, scope, requestedAt, resolvedAt?, decision? }`.
- **Scheduler mini-service:** uses `croner` for cron triggers; persists `nextRunAt`; survives restarts.
- **socket.io:** `approval-requested` event → Approval Center UI (zustand store); `autonomy-acted` event → toast + digest.
- **Caddy:** irrelevant directly; approval UI served through Caddy.
- **Kill switch:** a `Settings.autonomyPaused = true` Prisma row checked at the should-act? gate; UI button toggles it.

## Relevance To Our Project (MiMo AI layered runtime)
This is **Layer 14 (Autonomy Layer)** of the 15-layer Runtime OS. It depends on Layers 6 (Planning), 10 (Execution), 11 (Verification), 12 (Recovery), 15 (Security/Observability). It is what makes MiMo a personal AI rather than a chatbot — but its safety depends entirely on the gates never being bypassed.

## Recommended Usage
- **Default OFF for proactive triggers** — user opts in per-pattern.
- **Default ON for scheduled/event triggers** the user explicitly configures.
- **Pre-authorization scopes must be narrow and revocable.**
- **Approval-required** for any irreversible / external / dangerous action.
- **Kill switch** always one click away.
- **Conservative should-act? thresholds** initially; loosen based on user feedback.
- **Always notify** — never silent autonomous actions.

## Decision
**ADOPT** — Autonomous Agents with the 7-stage gated pipeline (trigger → should-act? → permission → plan → execute → verify → notify). Hard requirement: kill switch + approval gates + audit log + conservative defaults. Unrestricted autonomy **REJECTED**.

## Sources
- Technology inventory category 15 (Proactive Intelligence) lines 2755–2926 — esp. #259 Proactive Agents (P1), #260 Event-Driven Agents (P0), #261 Background Agents (P1), #262 Scheduled Agents (P0), #263 Trigger Systems (P0), #271 Smart Reminders (P0), #273 Supervisor Agents (P1), #274 Dead Letter Queue (P1).
- `docs/PROJECT_UNDERSTANDING.md` §3 (graduated controlled autonomy), §5 (Autonomy components), §8.8 (controlled self-improvement).
- `docs/CAPABILITY_MAP.md` §13 (Autonomy — should-act? gating C, notify C, background C, scheduled R, event R, proactive I, persistent goals I).
- Shinn et al., "Reflexion: Language Agents with Verbal Reinforcement Learning," 2023 (arXiv:2303.11366) — *verify citation*.
- Yang et al., "SWE-agent," 2024 (arXiv:2405.15793) — *verify citation*.
- croner: `https://github.com/hexagon/croner`.
- *Inferred:* 7-stage pipeline, should-act? heuristics, permission tiers, kill-switch wiring — designed for this stack.
