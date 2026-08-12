# MiMo Life OS — V1 Architecture Documentation

> **MiMo V1 — University Ready**
>
> Personal Digital Operating System

---

## 1. Overview

MiMo is not a website with features. MiMo is a **Personal Digital Operating System** that serves as the central repository for your digital life.

```text
                    MiMo OS
                  Personal Brain
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     DATA           LIFE            AI
        │              │              │
   Files/Media    Goals/Tasks     Memory
   Documents      Projects        Context
   Conversations  University      Reasoning
   Images         Calendar        Agents
   Videos         Knowledge       Decisions
   Archives       Timeline        Automation
```

---

## 2. Foundation Layer (20 Modules)

```text
src/lib/foundation/
├── life-event-store.ts          # Unified append-only event log
├── memory-engine-v2.ts          # Memory CRUD + decay + consolidation
├── life-graph-engine.ts         # Unified Life Graph (nodes + edges)
├── persistence-health.ts        # Health State + Reconciliation
├── memory-recall-engine.ts      # 10-factor multi-factor ranking
├── context-assembly-engine.ts   # Personal Context Package
├── personal-model-engine.ts     # Personal Model + Contradiction + Auto-Link
├── memory-formation-pipeline.ts # Selective storage (prevents junkyard)
├── file-integrity-engine.ts     # SHA-256 + atomic writes + recovery bin
├── disaster-recovery-engine.ts  # Backup + Restore + Verify
├── multimodal-ingestion.ts      # File → Text/OCR/Memory/Graph
├── life-graph-v2.ts             # Auto-populate + Path Finding + Integrity
├── executive-engine.ts          # Daily Planner + Priority Scoring
├── university-engine.ts         # Dashboard + Study Planner
├── agent-engine.ts              # Executive + Study + Research Agents
├── unified-environment.ts       # Global Search + Command Palette
├── audit-engine.ts              # Security + Observability + Reliability
├── temporal-truth-engine.ts     # Identity Timeline + Context Rehydration
├── section-audit-engine.ts      # Existing Sections Audit
└── index.ts                     # Unified exports
```

---

## 3. API Layer

```text
/api/foundation/
├── dashboard    # Unified Dashboard (Daily + University + Health + Stats)
├── search       # Global Search + Command Palette
├── memory       # Memory Recall + Personal Model
├── graph        # Graph Stats + Subgraph + Auto-populate
├── agents       # Executive + Study + Research Agents
└── health       # System Health (GREEN/YELLOW/RED)
```

---

## 4. Data Safety Guarantees

```text
✅ Private data never enters Git (.gitignore hardened)
✅ Every file has SHA-256 hash (corruption detection)
✅ Atomic writes (no half-written files)
✅ Soft delete + Recovery bin (30-day recovery)
✅ Full backup with verification (DB + files + manifest)
✅ DB ↔ Disk reconciliation (orphan + missing detection)
✅ Prompt injection defense (file content = UNTRUSTED)
✅ Original files immutable (AI never modifies originals)
✅ Temporal truth (old facts preserved, not overwritten)
```

---

## 5. Memory Architecture

```text
Memory Lifecycle:
  CREATE → ACCESS → UPDATE → REINFORCE → CONSOLIDATE → DECAY → FORGET

Memory Formation Pipeline (selective):
  Conversation → Candidate → Classify → Importance → Confidence
  → Duplicate Check → Contradiction Check → Decision → Store/Reject

Memory Recall (10-factor ranking):
  Semantic (25%) + Keyword (20%) + Importance (15%) + Confidence (10%)
  + Recency (10%) + Goal Relevance (10%) + Entity (5%) + Usage (5%)
  - Contradiction Penalty (-15%) - Stale Penalty (-10%)

Temporal Truth:
  Old facts get validUntil (not deleted)
  New facts get validFrom
  AI can answer: "what was true at date X?"
```

---

## 6. Agent Architecture

```text
Executive Agent (coordinator)
  ├── assembles personal context
  ├── analyzes daily plan + university dashboard
  ├── detects overdue tasks + assignments
  └── generates priority-based recommendations

Study Agent
  ├── generates study plans per course
  ├── tracks pending assignments
  └── recommends study sessions

Research Agent
  ├── searches memories (recall engine)
  ├── suggests web search when no memories
  └── returns relevant context
```

---

## 7. University OS

```text
University Dashboard:
  - Current semester (week number)
  - Courses (with pending assignments + exam counts)
  - Upcoming assignments (sorted by deadline, overdue detection)
  - Grades summary (total, average, highest, lowest)
  - Study stats (sessions, minutes, weekly)
  - AI recommendations

Study Plan Generator:
  - 3 sessions/week per course
  - Based on lectures + assignments
  - Focus areas identification
  - Links to Life Graph
```

---

## 8. Testing

```text
1050 tests (0 failures, 11 skipped)
54 test suites

Coverage:
  - Foundation CRUD + lifecycle
  - Persistence failure + reconciliation
  - Idempotency
  - Memory lifecycle + provenance + ranking + contradiction
  - Life Graph integrity (cascade, BFS, self-reference)
  - Crash recovery (zombie detection)
  - File integrity (corruption, missing, orphan, duplicate)
  - Disaster recovery (backup + verify + restore)
  - Multimodal ingestion (text, image, document)
  - Prompt injection defense
  - Executive planning (priorities, deadlines, recommendations)
  - University dashboard + study planner
  - Agent intelligence (executive, study, research)
  - Global search + command palette
  - Security + observability + reliability audit
  - Temporal truth + context rehydration
  - Section audit + database integrity
  - Full E2E integration (PLC Course scenario + Tawjihi files scenario)
```

---

## 9. Quality Metrics

```text
Tests:        1050 pass, 0 fail
Test Suites:  54
Lint:         0 errors
Typecheck:    127 (decreased from 128 baseline)
Foundation:   20 modules
API Routes:   177 total (6 new Foundation + 171 existing)
```

---

## 10. What's Next (V1.1+)

```text
V1 (Current):
  ✅ Foundation complete
  ✅ University OS
  ✅ Executive OS
  ✅ AI Agents
  ✅ Data reliability
  ✅ Global search
  ✅ E2E integration

V1.1 (After first month of university):
  - Real-world bug fixes
  - Performance optimization (10K+ memories)
  - Semantic embeddings (true semantic search)
  - Voice input
  - Mobile responsive improvements

V2 (Future):
  - Browser Agent
  - Computer Use
  - Learning Engine
  - Prediction + Simulation
  - Multi-device sync
```

— end of document —
