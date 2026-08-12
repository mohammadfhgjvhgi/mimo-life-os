# Approval Workflow

**Category:** Tools
**Status:** CORE
**Maturity:** Production-ready

## Definition
An **approval workflow** is the mechanism by which the Tool Runtime, before executing a high-risk tool call, **pauses and requests explicit user authorization**. The user reviews the proposed action (tool name, arguments, risk classification, estimated impact) and responds with APPROVE / DENY / MODIFY. The tool executes only on APPROVE; otherwise it is skipped or cancelled.

It is the **human-in-the-loop gate** that converts "the agent wants to do X" into "the agent is permitted to do X" for actions that carry irreversible, costly, or sensitive consequences.

## Problem Solved
Autonomous agents that execute high-risk tools without approval can:
- Send emails / messages on the user's behalf.
- Make payments.
- Modify or delete files.
- Push code to production.
- Make API calls with side effects (POST/PUT/DELETE).
- Spend real money (cloud resources, paid APIs).

Even with sandboxing + policy + permissions, some actions are **consequential enough** that the user must explicitly consent each time (or via a pre-authorized rule). Approval workflow provides the structured channel for this consent.

## Why It Matters
For MiMo AI, approval workflow is the **trust dial** between full autonomy and full manual control. It enables graduated autonomy:
- **Low-risk tools** (read, search) — auto-approved.
- **Medium-risk** (file write in workspace) — auto-approved with audit.
- **High-risk** (shell, network POST, code-exec) — require approval.
- **Critical** (payments, external messages, production deploys) — require approval + second confirmation.

This is essential for a personal AI: the user wants the agent to act autonomously on routine work but be asked before doing anything that touches the outside world meaningfully.

## How It Works

### Approval decision flow
```
tool_call emitted by agent
         │
         ▼
┌─────────────────────────────┐
│ ToolRuntime.call()          │
│  - registry lookup          │
│  - permission check         │
│  - policy evaluation        │
└────────────┬────────────────┘
             │
             ▼
┌─────────────────────────────┐
│ ApprovalPolicy.check(tool,  │
│   args, ctx)                │
│  → 'auto' | 'request' |     │
│    'request+confirm'        │
└────────────┬────────────────┘
             │
   ┌─────────┴──────────┐
   │ auto               │ request
   ▼                    ▼
execute          ┌──────────────────────┐
                 │ ApprovalGateway     │
                 │  - create Approval  │
                 │    Request (DB)     │
                 │  - emit socket.io   │
                 │    'approval:needed'│
                 │  - block (await)    │
                 └──────────┬───────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          APPROVE        DENY          MODIFY
              │             │             │
              ▼             ▼             ▼
        execute       cancel         re-validate
        (audit)       (audit)        modified args
                                       │
                                       ▼
                                  execute
```

### Approval request structure
```typescript
type ApprovalRequest = {
  requestId: string;
  taskId: string;
  agentId: string;
  toolName: string;
  args: unknown;              // the proposed arguments
  riskLevel: 'low'|'medium'|'high'|'critical';
  rationale: string;          // agent's justification
  estimatedImpact: string;    // human-readable summary
  preview?: {                 // for write/exec tools
    diff?: string;            // file diff
    command?: string;         // shell command
    requestBody?: unknown;    // HTTP body
  };
  requestedAt: ISO8601;
  expiresAt: ISO8601;         // request TTL
  status: 'pending'|'approved'|'denied'|'modified'|'expired'|'cancelled';
  decidedBy?: string;         // user id
  decidedAt?: ISO8601;
  modifiedArgs?: unknown;     // if MODIFY
};
```

### Pre-authorization rules
To avoid approval fatigue, users can pre-authorize:
- "Always allow `git_commit` in workspace `/projects/mimo`."
- "Allow `web_search` always."
- "Allow `python_exec` for files matching `*.ipynb`."
- "Deny `shell_exec` with `rm -rf` always."

These are **policy rules** evaluated before the approval gate; if a rule matches and says ALLOW, no approval request is created.

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Tool Runtime                             │
│   ┌────────────┐   ┌──────────────┐   ┌──────────────────┐  │
│   │ Policy     │──▶│ Approval     │──▶│ Sandbox+Executor │  │
│   │ Engine     │   │ Gateway      │   │                  │  │
│   └────────────┘   └──────┬───────┘   └──────────────────┘  │
│                           │                                  │
└───────────────────────────┼──────────────────────────────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │  Approval Store       │
                │  (Prisma + SQLite)    │
                │  ApprovalRequest      │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │  socket.io room       │
                │  'user:<userId>'      │
                │  → emits              │
                │    approval:needed    │
                │    approval:decided   │
                └───────────┬───────────┘
                            │
                            ▼
                ┌───────────────────────┐
                │  Next.js UI           │
                │  Approval Center      │
                │  (zustand store)      │
                └───────────────────────┘
```

## Interfaces
- `ApprovalGateway.request(req: ApprovalRequest): Promise<ApprovalDecision>`
- `ApprovalGateway.decide(requestId, decision: { verdict, modifiedArgs? }): Promise<void>`
- `ApprovalGateway.listPending(userId): ApprovalRequest[]`
- `ApprovalPolicy.check(tool, args, ctx): 'auto' | 'request' | 'request+confirm'`
- `ApprovalDecision = { verdict: 'APPROVE'|'DENY'|'MODIFY'; modifiedArgs?: unknown; decidedBy; decidedAt }`

## Dependencies
- Tool Runtime (gateway sits in the executor pipeline).
- Policy Engine (pre-authorization rules).
- Persistence (Prisma `ApprovalRequest` table — append-only audit).
- Event Bus (socket.io for real-time push to user UI).
- Authentication (decisions must be authenticated to a user).
- Notifications (push notification / email for long-running tasks where user isn't watching the UI).

## Strengths
- **Trust calibration** — enables graduated autonomy; user dials up/down per tool.
- **Audit trail** — every high-risk action has a recorded decision with rationale.
- **Modify capability** — user can correct args rather than reject+restart (saves a round-trip).
- **Pre-authorization** — reduces approval fatigue for routine high-risk actions.
- **Asynchronous** — request persists in DB; user can decide minutes later; agent waits or moves to other work.

## Weaknesses
- **Latency** — agent blocks until user decides; can be minutes/hours.
- **Approval fatigue** — too many requests → user rubber-stamps → loses safety value.
- **Bottleneck for long tasks** — task stalls if user is offline.
- **Bypass risk** — if policy engine has a bug, a high-risk tool could skip the gate.
- **Modified-args validation** — user-modified args must still pass Zod validation; UI must enforce.

## Failure Modes
- **Request expires** — user didn't respond in TTL; request marked `expired`; tool call cancelled. Mitigation: configurable TTL per risk level; notification escalation.
- **User offline** — request sits pending; task stalls. Mitigation: notification (email/push); task can pause + resume later.
- **Approval fatigue** — user auto-approves everything. Mitigation: batch approvals; per-tool cooldown; expose "approval fatigue" metric.
- **Modified args invalid** — user enters args that fail Zod. Mitigation: UI validates before submit.
- **Concurrent decisions** — two clients both decide. Mitigation: optimistic locking; first decision wins.
- **Stuck pending** — request never decided and never expires. Mitigation: watchdog scans for stale requests.
- **Policy bypass** — bug in policy engine skips gate. Mitigation: defense in depth (sandbox still applies; audit logs reveal misses).

## Security Implications
- Decisions must be **authenticated** — only the user (or delegated approver) can decide.
- Approval requests are **immutable** once created (only status transitions); audit log is append-only.
- Pre-authorization rules are **code** (git-tracked) or **user settings** (versioned in DB); changes logged.
- Critical tools require **second confirmation** (re-enter password / 2FA) — defends against accidental approval.
- Deny-by-default: if the gateway is unreachable, high-risk tools are not executed (fail-closed).

## Performance Implications
- Adds round-trip latency for high-risk tools: seconds to hours depending on user responsiveness.
- For batch tasks, multiple approval requests can be batched into one decision ("approve all 5 file writes in this task").
- Pre-authorization rules eliminate the round-trip for routine cases.

## Operational Implications
- Approval Center UI: real-time list of pending requests; one-click approve/deny/modify.
- Notifications: socket.io push for online users; email/push for offline.
- Audit dashboard: approval history per tool / per task / per user.
- Approval fatigue metric: % of approvals within 5s (low = rubber-stamping).
- Pre-auth rule management UI: user can view/edit rules; changes versioned.

## Alternatives
- **No approval** — fully autonomous; rejected for high-risk tools (unsafe).
- **Always approve** — manual mode; rejected (defeats autonomy).
- **Time-based autonomy windows** — agent autonomous for N minutes, then requires check-in. Variant of approval workflow.
- **Reputation-based** — agent earns autonomy by passing approvals; loses it on denials. Research-stage.

## Maturity & Production Readiness
**Production-ready.** Cursor, Devin, Claude Code, GitHub Copilot Workspace all implement approval workflows for code changes / shell commands. The pattern is well-established; the engineering quality varies.

## Relevant Research / Papers
- Anthropic — *Computer Use* (2024) — approval prompts for high-risk computer actions.
- OpenAI — *Operator* (2025) — human-in-the-loop for browser actions.
- Shinn et al. 2023 — *Reflexion* (related: agent self-critique; complementary to human approval).
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (human-in-the-loop taxonomy).

## Official Documentation
- Vercel AI SDK — `execute` callback can be async + await user input (pattern documented in community examples).
- OpenAI Agents SDK — `human_approval` tool wrapper.
- LangGraph — `interrupt` primitive for human-in-the-loop.
- Anthropic — Computer Use approval guidance.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Approval Gateway lives in the `tool-runtime-service` mini-service** (port 4030). When a tool call needs approval, the gateway creates an `ApprovalRequest` in Prisma, emits `approval:needed` via socket.io to room `user:<userId>`, and **awaits** a decision (Promise that resolves on `approval:decided` socket event or DB polling fallback).
- **Prisma schema**:
  - `ApprovalRequest` (id, taskId, agentId, toolName, args JSON, riskLevel, rationale, estimatedImpact, preview JSON, status enum, requestedAt, expiresAt, decidedBy, decidedAt, modifiedArgs JSON, parentCallId) — append-only except status transition.
  - `ApprovalRule` (id, userId, toolName, argsPattern, decision enum, createdAt, updatedAt) — pre-authorization rules.
  - Indexed on `(userId, status)` for "pending approvals for user".
- **socket.io**: server emits `approval:needed` (with full request payload); client (Next.js UI) renders in Approval Center. Client emits `approval:decide` with `{ requestId, verdict, modifiedArgs? }`. Server validates + updates DB + resolves the waiting Promise + emits `approval:decided` to confirm.
- **zustand store** `useApprovalStore`: `{ pending: ApprovalRequest[], history: ApprovalRequest[], decide(requestId, verdict) }`. UI: toast notification + sidebar list; click → expand → approve/deny/modify.
- **TTL**: per risk level — `medium: 5min`, `high: 30min`, `critical: 2h`. On expiry, status → `expired`, tool call cancelled, agent notified (can re-request or skip).
- **Notifications**: socket.io for online; for offline users, push to an email/push notification mini-service (future). v1: just socket.io + UI badge.
- **Pre-auth rules**: stored in Prisma `ApprovalRule`; evaluated by Policy Engine *before* the gateway; if rule says ALLOW → skip gateway; if DENY → reject immediately.
- **Modify flow**: UI shows args as editable form (Zod-driven); on submit, server re-validates with Zod, then executes with modified args.
- **Critical tools**: require re-entering user password or 2FA code in the UI before APPROVE is accepted.
- **Audit**: every decision logged with `{ requestId, verdict, decidedBy, decidedAt, modifiedArgsDiff }`.
- **Caddy**: approval endpoints (`/api/approvals/*`) on the main Next.js port (user-facing); internal gateway calls from tool-runtime-service go via the socket.io bus, not HTTP.

## Relevance To Our Project (MiMo AI layered runtime)
Approval workflow is the **human-in-the-loop gate at Layer 15 (Security)**, invoked by Layer 9 (Tool Runtime) when the Policy Engine determines a tool call exceeds auto-approval threshold. It is the **trust dial** that lets MiMo AI operate autonomously on routine work while keeping the user in control of consequential actions.

It also feeds Layer 13 (Learning): approval decisions (approve/deny/modify patterns) become training signal for the Policy Engine — over time, the system learns which actions the user routinely approves and can pre-authorize them (with user consent).

## Recommended Usage
- Every high-risk tool call goes through the Approval Gateway.
- Use pre-authorization rules to reduce fatigue for routine high-risk actions.
- TTL per risk level; expire stale requests.
- Modify capability to save round-trips.
- Critical tools require second confirmation (password/2FA).
- Audit every decision; track approval fatigue metric.
- Notifications for offline users (v1.x).

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** Approval Gateway in tool-runtime-service + Prisma persistence + socket.io push + Approval Center UI. **ADOPT** pre-authorization rules + modify capability + TTL expiry. **ADOPT** second-confirmation for critical tools. **DEFER** email/push notifications to v1.x (socket.io + UI badge for v1). **REJECT** fully-autonomous high-risk tools without approval.

## Sources
- Anthropic — Computer Use (anthropic.com/news/claude-computer-use)
- OpenAI — Operator (openai.com/index/introducing-operator)
- LangGraph — Human-in-the-loop (langchain-ai.github.io/langgraph/concepts/human_in_the_loop)
- Vercel AI SDK — community patterns for human approval
- Shinn et al. 2023 — Reflexion (arxiv.org/abs/2303.11366)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 15 Security), §5 (Tool components: approval workflow)
- MiMo AI `CAPABILITY_MAP.md` §7 (approval workflow = C), §16 (approval gates = C)
