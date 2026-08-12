# Preference Memory

**Category:** Memory
**Status:** CORE
**Maturity:** Mature (production: profile stores)

## Definition
A typed long-term memory store of **what the user likes, dislikes, and expects** — durable preferences about response style, tone, formatting, tool usage, communication channels, working hours, languages, dietary/coding/editorial preferences, etc. Each preference has a dimension, value, strength, source, and confidence.

## Problem Solved
Without preference memory, the agent asks "how do you want this?" every time, or worse, ignores user style entirely. Preferences are distinct from facts: a fact is "user lives in Berlin" (semantic); a preference is "user prefers replies in German" (preference). Conflating them weakens retrieval and update policies.

## Why It Matters
MiMo AI is a *personal* assistant — personalization is a first-class requirement. Preference memory shapes every response (tone, length, language, format), every tool choice (preferred browser, preferred editor), and every proactive action (working hours, do-not-disturb).

## How It Works
1. **Capture**: preferences are captured explicitly (user says "always reply in bullets") or implicitly (LLM infers from repeated behavior — "user accepted terse replies 5× → prefers terse").
2. **Schema**: each preference is a `(dimension, value, strength 0..1, source explicit|inferred, confidence, validFrom, validTo?, provenance)`.
3. **Conflict resolution**: contradictory preferences (explicit overrides inferred; latest explicit overrides earlier; ambiguous → escalate to user).
4. **Application**: the Context Layer injects a compact "active preferences" block into every prompt; the Executive/Reasoning layers consume it.
5. **Decay/reinforcement**: implicit preferences decay if not observed; explicit ones persist until retracted.

## Architecture
```
User statement (explicit) / Behavior pattern (inferred)
   → Preference Extractor (LLM)
   → Preference: {dimension, value, strength, source, confidence, validFrom, validTo, provenance}
   → Conflict Resolver
   → Preference Store (SQLite + sqlite-vec)
Context Layer ← (active preferences) ← Preference Store
```

## Interfaces
- `setPreference({dimension, value, strength, source, provenance}) → prefId | conflictId`
- `getActivePreferences({dimensions?}) → Preference[]`
- `inferPreferences(episodeWindow) → inferredPreferenceIds[]`
- `retractPreference(prefId, reason)`
- `resolveConflict(conflictId, decision)`

## Dependencies
- LLM extractor (GLM-5.2).
- sqlite-vec (similarity for "similar dimension" dedup).
- Conflict-resolution policy.
- Context Layer (consumer).

## Strengths
- Direct lever for personalization quality.
- Explicit vs. inferred distinction enables trust (user can audit inferred prefs).
- Compact active-preference block keeps prompt cost low.
- Decoupled from semantic store → own lifecycle.

## Weaknesses
- Implicit inference can be wrong and feel creepy ("why did the AI assume I want X?").
- Dimensions can proliferate (schema sprawl).
- Conflicting preferences across dimensions are common (terse + detailed — needs precedence rules).

## Failure Modes
- Stale preferences persisting after the user changed their mind.
- Inferred preferences stated as facts → overstepping.
- Conflicting preferences not flagged → inconsistent behavior.
- Prompt bloat if all preferences injected (need active-selection).

## Security Implications
- Preferences can reveal sensitive info (religion, health, politics) — treat as PII.
- Implicit inference needs transparency log (provenance + reasoning) for audit.
- Allow export + purge.

## Performance Implications
- Read path: cheap (small table, indexed by dimension).
- Write path: extractor runs async, batched.
- Active-preference block kept small (top N by strength × recency).

## Operational Implications
- Preferences admin UI: list, edit, retract, "why was this inferred?" provenance view.
- Periodic inference pass over recent episodes.
- Telemetry: preference hit-rate (how often a preference shaped a response).

## Alternatives
- **Stuffed into semantic store** (loses explicit/inferred distinction and lifecycle).
- **Hardcoded system prompt** (not personalizable at runtime).
- **User profile JSON** (simple but no conflict resolution, no inference).

## Maturity & Production Readiness
- Production preference stores: mature (ChatGPT custom instructions, Mem0 preferences, Letta persona blocks).
- Implicit inference with audit: emerging.

## Relevant Research / Papers
- Mem0 (2024) — preference add/update path.
- Packer et al. (2023) — MemGPT persona blocks.
- Chen et al. (2023) — *Sensus* / preference learning surveys.

## Official Documentation
- Mem0: https://docs.mem0.ai/
- Letta: https://docs.letta.com/

## Implementation Considerations (Next.js/TS/Prisma+SQLite/z-ai-web-dev-sdk/zustand/socket.io/Caddy)
- **Prisma model `Preference`**: `id, dimension String, value String, strength Float, source Enum(EXPLICIT, INFERRED), confidence Float, validFrom DateTime, validTo DateTime?, provenance Json, createdAt`.
- **sqlite-vec** for similarity dedup (`dimension` near-duplicates).
- **Extractor**: GLM-5.2 (z-ai-web-dev-sdk) on episode batches → JSON preferences.
- **Conflict resolver**: same-dimension newer-wins; explicit > inferred; both explicit → flag for UI.
- **Context Layer hook**: Next.js server action returns "active preferences" compact JSON injected into system prompt.
- **socket.io**: `preference.inferred` event → UI notification ("MiMo inferred: you prefer terse replies — accept?").
- **Zustand**: client-side cache for the preferences editor.
- **Caddy**: single-port proxy.

## Relevance To Our Project (MiMo AI layered runtime)
Layer 3 (Memory) + Layer 2 (Context). CAPABILITY_MAP §3 lists Preference Memory as CORE; §2 lists User context (preferences) as CORE. Directly drives personalization quality and is the cleanest lever for "this feels like *my* AI."

## Recommended Usage
- Explicit preferences always override inferred.
- Default active-preference block: top 10–15 by strength × recency; rest available on retrieval.
- Show inferred-preference notifications with accept/reject — never silently apply inferred prefs to sensitive dimensions (e.g., political, religious, health).
- Periodic re-inference (weekly) + decay pass.

## Decision (ADOPT / DEFER / REJECT)
**ADOPT** — CORE. SQLite + sqlite-vec; GLM-5.2 extractor; explicit > inferred policy; UI-confirmed inferred preferences.

## Sources
- Packer et al. (2023). *MemGPT.* arXiv:2310.08560.
- Mem0 (2024). arXiv:2504.19413.
- MiMo AI `docs/CAPABILITY_MAP.md` §2, §3.
- Inventory lines 381–389 (Preference Memory, P0).
