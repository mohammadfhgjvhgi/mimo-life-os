# FOUNDATION_FAILURE_MODEL.md

> **وثيقة تصميم — Phase C Hardening**
>
> تصف كيف يتعامل MiMo Foundation مع فشل Persistence، وكيف يكتشف ويعيد مزامنة البيانات المفقودة.

---

## 1. Source of Truth

```text
SQLite (Prisma) = Source of Truth للحالة الدائمة
In-Memory (ExecutionContext) = Source of Truth للحالة المؤقتة (أثناء التنفيذ)

عند التناقض:
  - أثناء التنفيذ: In-Memory يفوز (Runtime لا يتوقف)
  - بعد التنفيذ: Persistence يفوز (عبر Reconciliation)
```

## 2. Persistence Health State

```text
HEALTHY     → كل العمليات تنجح
DEGRADED    → 2-4 أخطاء متتالية (تحذير)
FAILED      → 5+ أخطاء متتالية (حرج)
RECOVERING  → أثناء محاولة Reconciliation
```

## 3. Failure Behavior

```text
Runtime succeeds + Persistence fails:
  1. safePersist يسجّل الفشل (recordPersistenceFailure)
  2. يضيف execution لـ pendingSyncs (addPendingSync)
  3. Health state تتحول لـ DEGRADED/FAILED
  4. Runtime يكمل بدون توقف (non-blocking)
  5. لاحقًا: Reconciliation Engine يكتشف + يصلح

Reconciliation:
  1. reconcilePendingSyncs() — يفحص كل pending
  2. لو state mismatch → يحدّث
  3. لو terminal لم يُسجّل → يعلّم terminal
  4. لو execution مفقود → يسجّل failure (لا يمكن recreate بدون context)
  5. reconcileZombieExecutions() — يكتشف executions قديمة بدون terminal
```

## 4. Idempotency

| العملية | Idempotent? | الآلية |
|---|---|---|
| createMemory | ✅ نعم | contentHash (duplicate detection) |
| upsertNode | ✅ نعم | unique(entityType, entityId) |
| linkNodes | ✅ نعم | unique(sourceId, targetId, edgeType) |
| appendLifeEvent | ❌ لا (by design) | كل حدث فريد (append-only) |
| syncExecutionFromContext | ✅ نعم | update by executionId |
| markTerminal | ✅ نعم | update by executionId |

## 5. Transaction Boundaries

```text
Atomic (يجب أن تنجح معًا أو تفشل معًا):
  - لا شيء حاليًا (كل عملية مستقلة)

Eventual Consistency (يمكن أن تتأخر):
  - syncExecutionFromContext (safePersist)
  - appendLifeEvent (safePersist)
  - Memory creation (separate from event logging)

Retry-safe:
  - createMemory (idempotent via contentHash)
  - upsertNode (idempotent via unique constraint)
  - linkNodes (idempotent via unique constraint)

No-retry:
  - appendLifeEvent (كل حدث فريد — retry يُنشئ duplicate)
```

## 6. Consistency Model

```text
Eventual Consistency:
  - Runtime state → قد يتقدم على Persistence state
  - Reconciliation يضبط لاحقًا (eventual)

Strong Consistency (ضمن نفس العملية):
  - createMemory + LifeEvent logging → fire-and-forget (eventual)
  - Memory recall → reads from DB (strong)

Crash Recovery:
  - Zombie detection: executions > 5min old + terminal-ish state + terminal=false
  - Reconciliation: pending syncs → check + fix
```

## 7. Data Ownership

```text
LifeEvent:      append-only (لا تعديل، لا حذف)
MemoryV2:       قابل للتعديل (importance, confidence, verifiedAt)
LifeGraphNode:  قابل للتعديل (label, description, status)
LifeGraphEdge:  قابل للتعديل (weight, metadata)
Execution:      قابل للتعديل (currentState, terminal)
```

---

## Definition of Done

```text
✅ Phase C type errors = 0 (128 = baseline, 0 new)
✅ Persistence failure tested (37 hardening tests)
✅ Reconciliation exists (reconcilePendingSyncs + reconcileZombieExecutions)
✅ Idempotency tested (4 tests)
✅ Transactions documented (this file)
✅ Event Store adversarial tests pass (3 tests)
✅ Memory lifecycle tested (7 tests)
✅ Memory provenance tested (source tracking)
✅ Contradiction handling tested (markContradiction)
✅ Recall ranking tested (importance-based ordering)
✅ Life Graph integrity tested (cascade, BFS, self-reference)
✅ Runtime ↔ Persistence fully tested (4 terminal state tests)
✅ Crash recovery tested (zombie detection + reconciliation)
```
