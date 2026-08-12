# Proactive Intelligence

**Category:** Autonomy
**Status:** IMPORTANT
**Maturity:** Emerging

## Definition
Proactive Intelligence is the subsystem that lets MiMo AI **notice things and suggest/act before the user asks**. Unlike scheduled or event-driven triggers (which fire on explicit rules), proactive triggers fire on **detected patterns**: recurring behavior, anomalies, opportunities, predictable needs, contextual suggestions. It sits on top of the Autonomous Agents pipeline (every proactive signal becomes a `proactive` trigger that must still pass should-act? → permission → ... → notify).

## Problem Solved
- A purely reactive AI waits to be asked — but many user needs are implicit ("you've opened this file 5 times, want a summary?").
- Scheduled/event triggers only fire on pre-configured rules — they can't detect *new* patterns.
- Without proactive intelligence, the AI misses opportunities to add value between explicit requests.

## Why It Matters
Proactivity is the difference between a tool and an assistant. But it is also the easiest way to annoy a user ("stop bothering me"). MiMo AI treats proactive intelligence as **IMPORTANT but default-conservative**: patterns are detected, suggestions are surfaced, but most proactive actions require user opt-in per pattern, and all pass through the autonomy gates.

## How It Works
### Pattern detectors (each emits a proactive trigger candidate)
1. **Routine detection** — "user opens Slack at 9am every weekday" → suggest a daily Slack summary at 8:55.
2. **Anomaly detection** — "user got an unusual email" / "build is failing more than usual" → surface it.
3. **Opportunity detection** — "this paper is highly cited by the ones you saved" → suggest reading.
4. **Predictive assistance** — "user is preparing a trip; here are the docs they likely need."
5. **Behavioral prediction** — "user usually replies to this person within an hour; flag if not."
6. **Context-aware suggestions** — "you're editing a function I have notes on; want them?"
7. **Smart reminders** — "you said you'd follow up on X; today's the day."
8. **Recurring error detection** — "this same tool failure has happened 3× this week; want me to fix the underlying cause?"

### Pipeline
```
Pattern Detectors ──▶ candidate trigger ──▶ should-act? (proactive-specific)
                                                  │
                                          ACT / DEFER / SKIP
                                                  │ ACT
                                                  ▼
                              (rest of the autonomous-agents pipeline)
                              permission → plan → execute → verify → notify (as suggestion)
```

### Proactive-specific should-act? heuristics
- **Signal strength** — how confident is the pattern? (require ≥N observations)
- **Novelty** — has this suggestion been made before? (avoid nagging)
- **User state** — focus mode / sleep / meeting → defer.
- **User preference** — has the user muted this pattern? (per-pattern opt-out)
- **Cost/value** — is the predicted value worth the predicted cost (LLM call, tool calls)?
- **Time since last suggestion** — rate-limit per pattern.

### Notification style
Most proactive signals surface as **suggestions**, not actions: "I noticed X — want me to Y?" The user accepts or dismisses. Only pre-approved patterns auto-act.

## Architecture
```
                            ┌──────────────────────────────────┐
Observation sources ───────▶│  Pattern Detectors               │
  - user activity logs      │   - routine / anomaly /          │
  - tool results            │     opportunity / predictive /   │
  - memory writes           │     behavioral / contextual /    │
  - external events         │     smart-reminder / recurring   │
                            │     -error                       │
                            └────────────┬─────────────────────┘
                                         │ candidate trigger
                                         ▼
                            Proactive Should-Act? Gate
                                         │ ACT
                                         ▼
                            Autonomy Runtime (rest of pipeline)
                                         │
                                         ▼
                            Notify (suggestion or auto-act)
```

## Interfaces
```ts
interface ProactiveSignal {
  id: string;
  detectorId: string;             // 'routine' | 'anomaly' | ...
  pattern: string;                // human-readable description
  evidence: Evidence[];           // supporting observations
  confidence: number;             // 0..1
  suggestedAction: AutonomousAction;
  userImpactEstimate: 'low'|'medium'|'high';
  createdAt: Date;
}

interface PatternDetector {
  id: string;
  ingest(observation: Observation): void;          // streaming ingest
  evaluate(): ProactiveSignal[];                    // periodic poll
  // OR
  onTick(): ProactiveSignal[];                      // time-driven
}

interface ProactiveRuntime {
  registerDetector(d: PatternDetector): void;
  shouldAct(signal: ProactiveSignal): Promise<'ACT'|'DEFER'|'SKIP'>;
  suggest(signal: ProactiveSignal): Promise<void>;   // surfaces to UI as suggestion
}
```

## Dependencies
- Autonomous Agents runtime (every proactive signal flows through it).
- Memory Layer (preferences, behavior history).
- Observability (user activity logs feed detectors).
- Event Bus (observations).
- LLM Gateway (some detectors use a model call to classify "is this an anomaly?").
- socket.io (suggestions surface in the UI).

## Strengths
- **Anticipates needs** — true assistant behavior, not just reactive tool use.
- **Personalized** — patterns are *this user's* patterns.
- **Self-correcting** — user dismissals feed back as negative signal (don't suggest this again).
- **Bounded by autonomy gates** — never acts unilaterally; passes through should-act? → permission.

## Weaknesses
- **False positives are annoying** — proactive suggestions are high-trust-cost; one bad suggestion can outweigh ten good ones.
- **Privacy sensitivity** — observing user behavior to detect patterns is itself a privacy concern; must be transparent.
- **Cold-start** — patterns need observations; a new user gets few proactive signals.
- **Drift** — patterns change; detectors must age out stale routines.
- **LLM cost** — some detectors (anomaly classification, opportunity scoring) need model calls; can be expensive if run frequently.

## Failure Modes
- **Nagging** — same suggestion repeated. Mitigation: novelty check + per-pattern rate limit + mute.
- **Spurious anomaly** — detector flags a one-off as an anomaly. Mitigation: require ≥N observations + confidence threshold.
- **Privacy creep** — detector observes something the user didn't realize was being watched. Mitigation: transparent observation log; user can inspect + purge.
- **Pattern hallucination** — LLM-based detector "invents" a pattern. Mitigation: detector output must cite specific evidence (observations with timestamps).
- **Cascade** — proactive action triggers another proactive signal triggers another... Mitigation: traceId depth limit; mute cascading signals.

## Security Implications
- **Observation data is sensitive** — user activity logs are highly personal; encrypt at rest, restrict access.
- **External content in detectors** — anomaly/opportunity detectors may read external content (emails, web pages); prompt-injection could manipulate detection. Mitigation: external content is untrusted; detector prompts treat it as data, not instructions.
- **Suggestion as prompt-injection vector** — a malicious suggestion could try to trick the user into approving a harmful action. Mitigation: suggestions are surfaced as plain text, not executed; approval is a deliberate UI action.
- **Audit** — every proactive signal (fired or skipped) logged; user can review.

## Performance Implications
- Detectors run on a slow loop (every N minutes) — not per-event. Cheap overall.
- LLM-based detectors bounded by `budget.maxCostUsd` per evaluation cycle.
- Suggestion surfacing is cheap (one socket.io event).

## Operational Implications
- Need a **Proactive Settings UI**: list of detectors, per-detector enable/disable, per-pattern mute, observation log viewer, "what patterns has MiMo detected?" page.
- Need a **pattern review** flow — the user periodically reviews detected patterns and confirms/dismisses.
- Need a **suggestion digest** — daily summary of proactive signals (fired + skipped).
- Need a **budget** for LLM-based detectors.

## Alternatives
- **No proactive intelligence (reactive-only):** simplest; fails the "personal AI" goal.
- **Fully autonomous proactive (no suggestion gate):** rejected — too risky / annoying.
- **External proactive engine (e.g., a hosted "AI assistant" SaaS):** rejected — privacy + offline + lock-in.
- **Hand-written rules (no learning):** viable for the simplest patterns (smart reminders); complement to learned detectors, not a replacement.

## Maturity & Production Readiness
- Pattern-detection (routine/anomaly) is mature in classical ML/monitoring.
- LLM-driven proactive intelligence is emerging — quality and cost are still moving targets.
- Suitable for v1 with: **smart reminders** + **context-aware suggestions** + **recurring-error detection** ON by default; **routine/anomaly/opportunity/predictive/behavioral** detectors OFF by default, user opts in.

## Relevant Research / Papers
- Predictive assistance literature (e.g., Looking Glass, Sunrise calendar intelligence).
- Anomaly detection classics (Hawkins, *Outlier Analysis*).
- "Anticipatory Computing" — *survey reference, verify at integration*.
- LLM-as-anomaly-detector — emerging practice; *no canonical citation yet*.

## Official Documentation
- No single canonical doc; this is an integration pattern over the autonomous-agents pipeline.
- Related: Anthropic's "Computer Use" demos and OpenAI's "Operator" — proactive pattern surfacing.

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk backend only/zustand/socket.io/Caddy/mini-services)
- **Backend only.** Detectors run as a slow-loop mini-service (every 5–15 min).
- **Module layout:**
  - `src/server/autonomy/proactive/runtime.ts` — `ProactiveRuntime` + should-act? heuristics.
  - `src/server/autonomy/proactive/detectors/` — one file per detector (routine, anomaly, opportunity, predictive, behavioral, contextual, smart-reminder, recurring-error).
  - `src/server/autonomy/proactive/observations.ts` — observation log ingest.
- **Prisma schema:** `Observation { id, source, type, payload Json, observedAt }`, `ProactiveSignal { id, detectorId, pattern, evidence Json, confidence, suggestedActionId, state, createdAt, dismissedAt? }`, `Pattern { id, detectorId, fingerprint, muted, confidence, lastSeenAt }`.
- **Settings UI:** detector list + per-detector toggle + per-pattern mute + observation log.
- **socket.io:** `proactive-suggestion` event → UI toast with "accept / dismiss / mute this pattern" actions.
- **Mini-service:** a slow-loop worker (croner) runs detectors every N min, bounded by `budget.maxCostUsd` per cycle.
- **Caddy:** irrelevant directly.

## Relevance To Our Project (MiMo AI layered runtime)
Proactive Intelligence is a sub-component of **Layer 14 (Autonomy Layer)**. It feeds the autonomous-agents pipeline with proactive triggers; the pipeline's gates (should-act?, permission, verify, notify) bound what proactive signals can actually do. Without proactive intelligence, MiMo is reactive-only; without the gates, proactive intelligence is unsafe.

## Recommended Usage
- **Adopt the framework** with **conservative defaults** — most detectors OFF, user opts in.
- **Default ON:** smart reminders, context-aware suggestions, recurring-error detection (low annoyance, high value).
- **Default OFF:** routine/anomaly/opportunity/predictive/behavioral — user enables per-detector.
- **Always surface as suggestions first**, never auto-act on a freshly detected pattern (require N confirmations before offering auto-act).
- **Per-pattern mute** — one click kills an annoying pattern forever.
- **Transparent observation log** — user can see what MiMo is watching.

## Decision
**ADOPT** — Proactive Intelligence framework with conservative defaults. Specific detectors: smart reminders, context-aware suggestions, recurring-error detection **ADOPT** (default ON); routine/anomaly/opportunity/predictive/behavioral **ADOPT** as opt-in (default OFF). Unrestricted proactive action **REJECTED**.

## Sources
- Technology inventory category 15 (Proactive Intelligence) lines 2755–2926 — esp. #259 Proactive Agents (P1), #264 Anomaly Detection (P1), #265 Opportunity Detection (P2), #266 Predictive Assistance (P2), #267 Context-Aware Suggestions (P1), #268 Behavioral Prediction (P2), #269 Routine Detection (P2), #270 Automatic Planning (P2), #271 Smart Reminders (P0), #272 Daily Auto-Tasks (P1).
- `docs/PROJECT_UNDERSTANDING.md` §3 (controlled autonomy), §5 (Autonomy components), §8.8.
- `docs/CAPABILITY_MAP.md` §13 (Proactive tasks — I).
- *Inferred:* 8-detector taxonomy, should-act? heuristics, suggestion-first surfacing — designed for this stack; no single canonical source.
