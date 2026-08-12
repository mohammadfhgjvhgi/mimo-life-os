# MEMORY_ARCHITECTURE.md

> **وثيقة تصميم — Phase 1: Memory Brain**
>
> تصف بنية ذاكرة MiMo، وكيف يعمل Recall Engine، وكيف تترابط الذاكرة مع Life Graph و Cognitive Runtime.

---

## 1. Purpose

تحويل MiMo من "قاعدة بيانات تحفظ نصوص" إلى **نظام ذاكرة شخصي** يفهم المستخدم عبر الزمن.

## 2. Architecture

```text
                    Personal Context Package
                              ↑
                    Context Assembly Engine
                              ↑
           ┌──────────────────┼──────────────────┐
           ↓                  ↓                  ↓
     Memory Recall      Life Graph          Recent Events
     Engine             Neighbors           (LifeEvent)
           ↓                  ↓                  ↓
     MemoryV2          LifeGraphNode        LifeEvent
     (importance,      (entities +          (append-only
      confidence,       relations)           event log)
      source,
      provenance)
```

## 3. Source of Truth

| النظام | Role | Notes |
|---|---|---|
| MemoryV2 | **Source of Truth** للذاكرة | importance/confidence/source/provenance |
| LifeEvent | **Source of Truth** للأحداث | append-only (لا تعديل/حذف) |
| LifeGraphNode | **Source of Truth** للكيانات | unified entity model |
| Memory (legacy) | **Legacy** | سيُهاجر لـ MemoryV2 لاحقًا |
| EpisodicEvent | **Specialized** | events محددة (قد تُهاجر) |
| SemanticFact | **Specialized** | facts محددة (قد تُهاجر) |
| ContextSnapshot | **Cache** | snapshot للـ context |

## 4. Memory Lifecycle

```text
CREATE (user/AI/system)
  ↓
ACCESS (recallMemory — increment accessCount)
  ↓
UPDATE (importance, confidence, verification)
  ↓
REINFORCE (repeated access → importance boost)
  ↓
CONSOLIDATE (merge similar → semantic memory)
  ↓
DECAY (old + unused → importance decrease)
  ↓
FORGET (importance < 10 → delete)
```

## 5. Memory Recall Pipeline

```text
query
  ↓
Candidate Retrieval (keyword + type filters)
  ↓
Score Each Candidate:
  - Semantic Relevance (25%)
  - Keyword Relevance (20%)
  - Importance (15%)
  - Confidence (10%)
  - Recency (10%)
  - Goal Relevance (10%)
  - Entity Relevance (5%)
  - Usage Frequency (5%)
  - Contradiction Penalty (-15%)
  - Stale Penalty (-10%)
  ↓
Contradiction Filtering (exclude weaker of conflicting pair)
  ↓
Sort by Score (desc)
  ↓
Token Budget (limit total chars)
  ↓
Final Memories
```

## 6. Provenance

```text
USER_EXPLICIT      → highest authority (confidence boost)
USER_CONVERSATION  → high authority
USER_IMPORT        → medium authority
AI_INFERENCE       → lower authority (must be marked)
AI_SUMMARY         → derived (provenance required)
SYSTEM_EVENT       → factual
DERIVED_MEMORY     → from consolidation (provenance required)
```

## 7. Contradiction Resolution

```text
Detect: "A says X" vs "B says not-X"
  ↓
Score: recency + source authority + confidence + verification
  ↓
Winner: higher score
  ↓
Loser: markContradiction (flagged, not deleted)
  ↓
Both kept (provenance preserved)
```

## 8. Consolidation

```text
N episodic memories (similar topic)
  ↓
Consolidation Engine
  ↓
1 semantic memory (summary)
  ↓
Provenance preserved (source IDs in metadata)
  ↓
Source memories NOT deleted
```

## 9. Context Assembly

```text
User Message
  ↓
assemblePersonalContext()
  ↓
├── Memory Recall (60% of token budget)
├── Recent Life Events (15%)
├── Life Graph Neighbors (10%)
├── Current Goal/Project (5%)
├── Active Tasks (5%)
├── User Profile (5%)
  ↓
Formatted Context (for LLM)
  ↓
Cognitive Runtime (uses context before planning)
```

## 10. Cognitive Runtime Integration

```text
User Message
  ↓
createExecution (persistence)
  ↓
assemblePersonalContext (memory brain) ← NEW
  ↓
INTENT → GOAL → PLAN → POLICY → EXECUTE → VERIFY → RECOVER
  ↓
Auto-memorize (episodic memory of Q&A) ← NEW
  ↓
Auto-link (Life Graph edges) ← NEW
  ↓
Response
```

## 11. Failure Behavior

```text
Memory recall fails → Runtime continues with empty context (non-fatal)
Auto-memorize fails → Runtime continues (non-fatal)
Auto-link fails → Runtime continues (non-fatal)
Persistence fails → safePersist tracks + Reconciliation fixes later
```

## 12. Known Limitations

- Semantic similarity uses word overlap (no embeddings yet)
- Contradiction detection is keyword-based (no NLP yet)
- Personal Model extraction is pattern-based (no LLM inference yet)
- No cross-request idempotency (needs session tracking)
- Performance not benchmarked at scale (10K+ memories)

## 13. Testing

```text
27 foundation tests (CRUD + lifecycle + consolidation + decay)
37 hardening tests (persistence failure + reconciliation + idempotency + crash recovery)
+ Recall Engine ranking tests (planned)
+ Context Assembly tests (planned)
+ Adversarial tests (planned)
```
