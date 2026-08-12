# Tool Policy Engine

**Category:** Tools
**Status:** CORE
**Maturity:** Production-ready

## Definition
The **Tool Policy Engine** is the rules-based decision system that evaluates every tool call **before execution** and decides: ALLOW, DENY, REQUIRE_APPROVAL, REQUIRE_SANDBOX, DRY_RUN_ONLY, or RATE_LIMIT_EXCEEDED. It sits between the permission check and the approval gate in the Tool Runtime pipeline, enforcing **global + per-tool + per-context policies** that no individual tool or agent can override.

It is the **policy brain** of the Tool Runtime: a declarative rules engine that encodes "what is allowed when, for whom, under what conditions."

## Problem Solved
Permissions (RBAC/ABAC) answer "is this agent allowed to call this tool at all?" That is binary and coarse. Real autonomy needs finer-grained control:
- "Allowed, but only 10 calls per minute."
- "Allowed, but only with args matching a pattern."
- "Allowed for read, denied for write."
- "Allowed in dev, requires approval in prod."
- "Allowed, but must run in a sandbox."
- "Denied because total cost today exceeds $10."

The Policy Engine encodes these **conditional, context-sensitive rules**. Without it, every policy is hardcoded into tool handlers — unmaintainable, unauditable, and bypassable.

## Why It Matters
For MiMo AI, the Policy Engine is the **centralized enforcement point** for all operational policies: rate limits, cost caps, quotas, approval triggers, sandbox requirements, dry-run modes, egress allowlists, secret-detection gates. It is what makes the system **safe enough to operate autonomously** — the agent cannot talk its way past a policy rule.

It is also the **audit surface**: every policy decision is logged, so we can answer "why was this call allowed/denied?" for any past tool invocation.

## How It Works

### Policy rule structure
```typescript
type PolicyRule = {
  ruleId: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;             // higher = evaluated first
  match: PolicyMatch;           // when does this rule apply?
  action: PolicyAction;         // what to do
  condition?: PolicyCondition;  // additional evaluation
  effect: 'allow'|'deny'|'require_approval'|'require_sandbox'|'dry_run'|'rate_limit';
};

type PolicyMatch = {
  toolName?: string | RegExp;
  callerAgentId?: string;
  callerRole?: AgentRole;
  taskType?: TaskType;
  userId?: string;
  environment?: 'dev'|'staging'|'prod';
  argsPattern?: ZodSchema;      // matches specific arg shapes
};

type PolicyAction = {
  effect: 'allow'|'deny'|'require_approval'|'require_sandbox'|'dry_run'|'rate_limit';
  reason: string;
  sandboxTier?: 'vm'|'process'|'container';
  rateLimit?: { windowMs; maxCalls };
  approvalRiskLevel?: 'medium'|'high'|'critical';
  costCap?: { maxUsdPerCall; maxUsdPerDay };
};
```

### Evaluation pipeline
```
tool_call arrives
   │
   ▼
┌──────────────────────────────────────────┐
│ 1. Load all enabled rules sorted by      │
│    priority (descending)                 │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 2. For each rule, check if `match`       │
│    applies (toolName, caller, args, etc) │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 3. For matching rules, evaluate          │
│    `condition` (e.g., cost today < $10)  │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 4. Highest-priority matching rule wins   │
│    → emit PolicyDecision                 │
└─────────────────┬────────────────────────┘
                  │
                  ▼
┌──────────────────────────────────────────┐
│ 5. If no rule matches → default policy   │
│    (deny-by-default for high-risk)       │
└──────────────────────────────────────────┘
```

### Default policies (examples)
- `shell_exec` with args matching `/^rm\s+-rf/` → DENY (always).
- `web_search` → ALLOW, rate limit 60/min.
- `python_exec` → ALLOW + require_sandbox=container.
- `http_post` to external URL → REQUIRE_APPROVAL (high).
- `git_push` to `main` branch → REQUIRE_APPROVAL (critical).
- any tool when `costToday > $10` → DENY (cost cap).
- any tool when `environment === 'prod'` and riskLevel `critical` → REQUIRE_APPROVAL + second-confirm.

### Decision logging
Every `PolicyDecision` is persisted:
```typescript
type PolicyDecision = {
  decisionId: string;
  toolCallId: string;
  matchedRuleIds: string[];     // all rules that matched
  finalRuleId: string;          // the winning rule
  effect: PolicyAction['effect'];
  reason: string;
  context: { callerAgentId, taskId, userId, argsHash, timestamp };
};
```

## Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                     Tool Runtime                             │
│   ┌──────────┐   ┌──────────────┐   ┌──────────────────┐   │
│   │Permission│──▶│ Policy       │──▶│ Approval         │   │
│   │ Check    │   │ Engine       │   │ Gateway (if req) │   │
│   │ (RBAC/   │   │              │   │                  │   │
│   │  ABAC)   │   │ rules + eval │   └────────┬─────────┘   │
│   └──────────┘   └──────┬───────┘            │             │
│                         │                    ▼             │
│                         │            ┌──────────────┐      │
│                         │            │ Sandbox+Exec │      │
│                         │            └──────────────┘      │
│                         ▼                                  │
│                ┌────────────────┐                          │
│                │ Decision Log   │  → Prisma                │
│                │ (append-only)  │    PolicyDecision        │
│                └────────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

## Interfaces
- `PolicyEngine.evaluate(toolCall: ToolCall, ctx: CallContext): Promise<PolicyDecision>`
- `PolicyEngine.addRule(rule: PolicyRule): Promise<void>` (admin only)
- `PolicyEngine.updateRule(ruleId, patch): Promise<void>` (versioned)
- `PolicyEngine.disableRule(ruleId): Promise<void>`
- `PolicyEngine.listRules(filter?): PolicyRule[]`
- `PolicyEngine.getDecisions(filter?): PolicyDecision[]` (audit)

## Dependencies
- Rule Store (Prisma `PolicyRule` table — versioned, git-backed for system rules).
- Decision Log (Prisma `PolicyDecision` — append-only).
- Cost Tracker (cumulative spend per user/task/day — feeds cost-cap rules).
- Rate Limiter (sliding-window counters — Redis or in-memory).
- Quota Service (per-tool call counts, per-user, per-day).
- Permission system (RBAC/ABAC upstream).
- Secret Scanner (scans args for secrets before allow).
- Approval Gateway (downstream, when effect is `require_approval`).

## Strengths
- **Centralized** — one place to encode all operational policy; no scattered `if` statements in tool handlers.
- **Declarative** — rules are data, not code; non-engineers can review.
- **Auditable** — every decision logged with the winning rule + reason.
- **Dynamic** — rules can be added/updated/disabled at runtime (with admin auth).
- **Composable** — multiple rules can match; priority resolves conflicts.
- **Testable** — rules can be unit-tested against hypothetical calls.

## Weaknesses
- **Rule explosion** — too many rules → hard to reason about; conflicts subtle.
- **Performance** — evaluating many rules per call adds latency (mitigation: index by toolName; cache results for identical calls within a window).
- **False positives** — overly broad rules deny legitimate calls.
- **False negatives** — rule gap allows something it shouldn't.
- **Bypass risk** — if a tool handler doesn't go through the engine, rules don't apply (must enforce architecturally — single chokepoint).
- **Debugging** — "why was this denied?" requires reconstructing which rule fired (mitigation: detailed decision log).

## Failure Modes
- **Conflicting rules** — two rules match with opposite effects. Mitigation: strict priority ordering; reject ambiguous configurations at rule-load time.
- **Rule gap** — no rule matches a call; default policy must be safe (deny-by-default for high-risk, allow for low-risk read).
- **Stale rules** — rule references a tool that no longer exists. Mitigation: rule validation at load time.
- **Performance regression** — too many rules → slow evaluation. Mitigation: index rules by toolName; short-circuit on first match.
- **Bypass via direct call** — code calls tool handler directly, skipping the engine. Mitigation: architecturally enforce — only the Tool Runtime can call handlers; handlers are not exported.
- **Cost-cap race** — two concurrent calls both pass the cap check before either's cost is recorded. Mitigation: atomic increment + re-check after reservation.

## Security Implications
- Rules are **immutable history** — every version retained; changes auditable.
- Admin actions (add/update/disable rule) require admin auth + are logged.
- **Deny-by-default** for unmatched high-risk tools — fail-closed.
- Secret scanner runs as a rule: if args contain a known secret pattern, DENY + alert.
- Egress allowlist (for sandboxed network tools) is a policy rule, not a tool-handler concern.
- Cost caps prevent runaway spend even if an agent goes rogue.

## Performance Implications
- Rule evaluation: ~1–5ms for 50 rules with indexing.
- Rate limiter check: ~1ms (in-memory sliding window).
- Cost cap check: ~2ms (Prisma aggregate or cached counter).
- Secret scan: ~5–20ms depending on args size.
- Total overhead per call: ~10–30ms (acceptable vs. tool execution time).

## Operational Implications
- Rule management UI: admin can view/add/edit/disable rules; changes versioned.
- Decision log dashboard: filter by tool/user/effect/time; export for compliance.
- Policy regression tests: rules tested against a corpus of hypothetical calls (CI-enforced).
- Rule review cadence: monthly audit of rules for relevance + correctness.
- Cost-cap monitoring: alert when daily spend approaches cap.

## Alternatives
- **Hardcoded policy in tool handlers** — rejected; unmaintainable, bypassable.
- **ABAC-only (no rules engine)** — covers some cases but not rate limits, cost caps, dry-run modes.
- **OPA (Open Policy Agent)** — general-purpose policy engine (Rego language); powerful but adds a dependency + learning curve. Consider for v1.x if rule complexity grows.
- **Cedar (AWS)** — similar; TS-native bindings available.

## Maturity & Production Readiness
**Production-ready.** Policy engines are standard in API gateways (Kong, AWS API Gateway) and enterprise systems. For AI agents, the pattern is newer but well-understood (OpenAI Agents SDK has guardrails; LangGraph has policy nodes). The rigor of implementation is the differentiator.

## Relevant Research / Papers
- AWS — *Cedar: A New Language for Expressive, Fast, Safe, and Analyzable Access-Control Policies* (2022).
- OPA — *The Open Policy Agent* (openpolicyagent.org).
- OpenAI Agents SDK — *Guardrails* documentation.
- Wang et al. 2024 — *Survey on LLM-based Autonomous Agents* (governance/policy sections).

## Official Documentation
- Open Policy Agent — openpolicyagent.org/docs.
- AWS Cedar — cedarpolicy.dev.
- OpenAI Agents SDK — Guardrails (github.com/openai/openai-agents-python).
- LangGraph — policy/guardrail nodes.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy/mini-services pattern)
- **Policy Engine lives in the `tool-runtime-service` mini-service** (port 4030). Every tool call passes through `PolicyEngine.evaluate()` before reaching the executor. No bypass path.
- **Prisma schema**:
  - `PolicyRule` (id, name, description, enabled, priority, match JSON, action JSON, condition JSON, version, createdAt, updatedAt, createdBy) — versioned; system rules seeded from a git-tracked JSON file at startup.
  - `PolicyDecision` (id, toolCallId, matchedRuleIds JSON, finalRuleId, effect, reason, context JSON, timestamp) — append-only audit log; indexed on `(toolCallId, timestamp)`.
  - `CostCounter` (id, userId, taskId, day, cumulativeUsd) — for cost-cap rules; updated atomically after each paid tool call.
- **Rule loading**: system rules loaded from `policies/system-rules.json` (git-tracked) at startup; user rules from DB. Merge by priority; system rules cannot be disabled by users (admin only).
- **Evaluation**: TypeScript rules engine (custom or OPA/Cedar if adopted). For v1, custom engine is sufficient — rules are data (JSON), evaluated by a small TS interpreter. Avoid regex/Rego complexity until rule count justifies.
- **Rate limiter**: in-memory sliding-window counter (Map<key, {windowStart, count}>) per process; for multi-process (mini-services), use a shared store (Redis) or accept per-process limits (acceptable for v1 single-instance).
- **Cost cap**: `CostCounter` row per user per day; atomic increment via `prisma.$executeRaw` `UPDATE ... SET cumulativeUsd = cumulativeUsd + ? RETURNING cumulativeUsd`; if returned value > cap, DENY.
- **Secret scanner**: a TS module that scans args (recursively) against a regex set (API keys, AWS keys, JWTs, etc.); on match, DENY + emit alert event.
- **Default policy**: low-risk read tools → ALLOW; medium-risk → ALLOW with sandbox; high-risk → REQUIRE_APPROVAL; critical → REQUIRE_APPROVAL + second-confirm. Unmatched → DENY for anything with side-effects.
- **socket.io**: emit `policy:evaluated` event with decision (for UI observability); `policy:denied` for rejected calls (visible in agent trajectory as a "blocked" step).
- **zustand** `usePolicyStore`: lists rules + recent decisions for admin UI.
- **Audit endpoint**: `/api/policies/decisions?filter=...` returns paginated decisions for compliance review.
- **Caddy**: policy admin endpoints (`/api/policies/*`) on main Next.js port with admin auth; evaluation is internal to tool-runtime-service.

## Relevance To Our Project (MiMo AI layered runtime)
The Tool Policy Engine is the **rule-enforcement core at Layer 15 (Security) for Layer 9 (Tool)**. It encodes every operational constraint that makes autonomous operation safe: rate limits, cost caps, approval triggers, sandbox requirements, egress allowlists, secret detection. It is the **architectural answer** to "how do we trust an autonomous agent with high-risk tools?" — by enforcing that every call passes a centralized, audited policy gate that the agent cannot bypass.

It also feeds Layer 13 (Learning): policy decisions (especially DENYs) become training signal — over time, the agent learns which actions are policy-violating and stops attempting them.

## Recommended Usage
- Every tool call passes through the Policy Engine — no exceptions, no bypass paths.
- Default-deny for unmatched high-risk tools; default-allow for low-risk read.
- System rules git-tracked + seeded at startup; user rules in DB.
- Cost caps + rate limits per user/day; atomic updates.
- Secret scanner as a rule.
- Audit every decision; retention per policy.
- Monthly rule review for relevance + correctness.
- CI-enforced policy regression tests.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** custom TS policy engine in tool-runtime-service + Prisma persistence + audit log + secret scanner + cost caps + rate limits. **DEFER** OPA/Cedar adoption to v1.x if rule complexity grows beyond what custom engine handles cleanly. **REJECT** hardcoded policy in tool handlers (unmaintainable, bypassable). **REJECT** fully-autonomous high-risk tools without policy gates.

## Sources
- AWS Cedar (cedarpolicy.dev)
- Open Policy Agent (openpolicyagent.org/docs)
- OpenAI Agents SDK Guardrails (github.com/openai/openai-agents-python)
- LangGraph guardrails (langchain-ai.github.io/langgraph)
- Wang et al. 2024 — Agent survey (arxiv.org/abs/2308.11432)
- MiMo AI `PROJECT_UNDERSTANDING.md` §4 (Layer 15 Security), §5 (Tool components: policy engine)
- MiMo AI `CAPABILITY_MAP.md` §7 (tool policy engine = C, tool permissions = C), §16 (audit logs = C, kill switch = C)
