# PERSISTENCE_ARCHITECTURE.md

> **وثيقة تصميم — ليست كود.**
> كُتبت قبل البدء بتنفيذ Durable Event Store / Durable Execution State / Durable Idempotency / Checkpointing / Crash Recovery.
>
> الهدف: تحديد "ما الذي يمثل الحقيقة" و"كيف يدوم" قبل كتابة أي سطر SQL أو Prisma model.

---

## 0. المبدأ المعماري الحاكم

```text
"النقص الحالي ليس ذكاءً. النقص هو الدوام (Durability)."
```

الـ MiMo Runtime يمتلك بالفعل:

> Executive reasoning + planning + execution + verification + recovery + policy + state control + event architecture + replay.

ما ينقصه هو **القدرة على تحمّل الانهيار (Crash) وإعادة البناء (Reconstruction)**.

هذه الوثيقة تُعرّف بدقة:
- ما الذي يُحفظ (Durable) وما يبقى عابرًا (Ephemeral).
- كيف يُعاد بناء الـ Runtime من الـ Event Store بعد أي crash.
- متى نقبل أن "النتيجة غير معروفة" (UNKNOWN) ولا نعيد المحاولة تلقائيًا.

---

## 1. Source of Truth (مصدر الحقيقة)

```text
┌─────────────────────────────────────────────┐
│         Source of Truth = SQLite (Prisma)   │
│                                             │
│  ├── Durable Execution State                │
│  ├── Durable Event Store                    │
│  ├── Durable Idempotency                    │
│  └── Checkpoints                            │
└─────────────────────────────────────────────┘
```

### 1.1 القاعدة الصارمة

```text
الذاكرة العشوائية (in-memory) = cache فقط.
الذاكرة الدائمة (SQLite)     = الحقيقة.
```

أي حالة في `ExecutionContext` (in-memory) يمكن أن تُفقد في أي لحظة. الحقيقة الوحيدة الموثوقة هي ما هو مكتوب في SQLite.

### 1.2 ما الذي يبقى Ephemeral (لا يُحفظ)؟

- Context cache (LLM context window compression).
- UI state (panels, focus).
- Model output العابر (streaming tokens قبل التثبيت).
- In-flight HTTP request bodies (لا قيمة لها بعد انتهاء الطلب).

### 1.3 ما الذي يصبح Durable؟

كل شيء آخر. خصوصًا:
- Execution (هوية + state + counters + budgets).
- Event Store (السجل الزمني الكامل).
- Idempotency keys + outcomes.
- Checkpoints (snapshots للـ state).

---

## 2. Durable Execution Model

كل Execution يُمثّل دورة حياة كاملة لطلب واحد من المستخدم.

### 2.1 ما يُحفظ لكل Execution

| الحقل                    | الوصف                                              | ملاحظة                       |
| ------------------------ | ------------------------------------------------- | ---------------------------- |
| `executionId`            | مفتاح أساسي (cuid)                                 | Correlation ID anchor        |
| `requestId`               | الطلب الأصلي من المستخدم                            | قد يتكرر عبر executions (retry) |
| `userId`                 | مالك الـ Execution                                 | لتعدد المستخدمين لاحقًا       |
| `goal`                   | الهدف المستخرج من الـ Goal Engine                  | نص + JSON metadata           |
| `planId`                 | مفتاح الخطة                                        | FK → Plan                    |
| `currentState`           | آخر state وصل لها                                  | يطابق آخر state event        |
| `stateHistory`           | JSON array من `{state, timestamp, metadata}`      | مرتب زمنيًا                   |
| `budgets`                | `maxRetries`, `maxReplans`, `maxToolCalls`, `maxTokenBudget`, `maxDurationMs` | JSON |
| `counters`               | `retryCount`, `replanCount`, `toolCallCount`, `tokensUsed` | JSON                   |
| `startedAt`              | ISO timestamp                                     |                              |
| `deadline`               | ISO timestamp                                     | لحساب timeout                |
| `cancelled`              | boolean                                           | + `cancelReason`             |
| `idempotencyKey`         | لو قدّمه العميل                                    | لمنع التكرار                  |
| `lastCheckpointSeq`      | آخر sequence تم snapshot له                         | لتسريع الـ replay             |
| `terminal`               | boolean — هل وصل لـ COMPLETED/CANCELLED/ESCALATED | يمنع resume                  |
| `terminalOutcome`        | `'SUCCESS' \| 'FAILURE' \| 'UNKNOWN' \| null`     | **مفتاح الـ Unknown Outcome** |
| `recoveryState`          | `{attempt, lastStrategy, status}` JSON            | لو كان في recovery            |
| `waitingState`           | `{type: 'INPUT'|'APPROVAL', prompt, expiresAt}` JSON | لو كان في WAITING state     |
| `approvalState`          | `{required, granted, grantedBy, grantedAt}` JSON  | لـ WAITING_FOR_APPROVAL      |
| `createdAt`, `updatedAt` | timestamps                                        |                              |

### 2.2 Plan Model (منفصلة عن Execution)

| الحقل            | الوصف                              |
| ---------------- | --------------------------------- |
| `planId`         | PK                                |
| `executionId`    | FK → Execution                    |
| `version`        | integer — 1, 2, 3 (replans)       |
| `steps`          | JSON: `[{stepId, action, args, dependsOn, status, result}]` |
| `dagHash`        | hash للـ DAG لمنع التغيير الخفي    |
| `createdAt`      | timestamp                          |

### 2.3 Policy Decision Model

| الحقل              | الوصف                                |
| ------------------ | ----------------------------------- |
| `decisionId`       | PK                                  |
| `executionId`      | FK                                  |
| `action`           | اسم الإجراء (مثل `delete_task`)      |
| `decision`         | `'ALLOW' \| 'BLOCK' \| 'REQUIRE_APPROVAL'` |
| `reason`           | نص توضيحي                            |
| `barrierHit`       | boolean                             |
| `riskScore`        | 0-100                               |
| `decidedAt`        | timestamp                           |

### 2.4 Verification Model

| الحقل             | الوصف                                |
| ----------------- | ----------------------------------- |
| `verificationId`  | PK                                  |
| `executionId`     | FK                                  |
| `stepId`          | أي step تم التحقق منه                 |
| `result`          | `'PASS' \| 'FAIL' \| 'UNCERTAIN'`   |
| `evidence`        | JSON                                |
| `verifiedAt`      | timestamp                           |

### 2.5 Recovery Model

| الحقل            | الوصف                                       |
| ---------------- | ------------------------------------------ |
| `recoveryId`     | PK                                         |
| `executionId`    | FK                                         |
| `attemptNumber`  | 1, 2, ...                                  |
| `strategy`       | `'RETRY' \| 'REPLAN' \| 'ASK_USER' \| 'ESCALATE'` |
| `reason`         | نص                                         |
| `status`         | `'IN_PROGRESS' \| 'SUCCEEDED' \| 'FAILED'` |
| `startedAt`, `endedAt` | timestamps                          |

---

## 3. Event Store

الـ Event Store هو **السجل الزمني الرسمي** لكل ما حدث في الـ Runtime. يُكتب append-only (لا تعديل، لا حذف).

### 3.1 Schema

| الحقل           | النوع        | الوصف                                       |
| --------------- | ----------- | ------------------------------------------ |
| `eventId`       | string (PK) | معرف فريد عالميًا (cuid أو UUIDv7)           |
| `executionId`   | string (FK) | أي execution ينتمي له                        |
| `requestId`     | string      | للربط مع الطلب الأصلي                        |
| `sequence`      | integer     | ترتيب داخل الـ execution (1, 2, 3, ...)      |
| `eventType`     | string      | مثل `state.executing`, `tool.completed`     |
| `version`       | string      | إصدار schema للحدث (`"1.0.0"`)              |
| `timestamp`     | ISO string  | وقت الحدث                                   |
| `source`        | string      | `cognitive-runtime`, `policy-engine`, ...   |
| `payload`       | JSON        | كل البيانات النوعية                          |
| `causationId`   | string?     | أي حدث **سبب** هذا الحدث                     |
| `correlationId` | string?     | للربط عبر executions (مثل propagation)       |

### 3.2 Indexes

```text
PK: eventId (unique)
INDEX: (executionId, sequence)   — للترتيب الزمني
INDEX: (executionId, eventType)  — للبحث بالنوع
INDEX: (requestId)               — للربط بالطلب الأصلي
INDEX: (timestamp)               — للحذف حسب العمر
INDEX: (causationId)             — لتتبّع السببية
```

### 3.3 Uniqueness & Integrity Rules

```text
RULE 1: (executionId, sequence) يجب أن يكون فريدًا.
        → INSERT لا succeeds إلا بـ sequence جديد.
        → يمنع Duplicate Event فيزيائيًا على مستوى الـ DB.

RULE 2: eventId فريد عالميًا.
        → لو محاولة insert بنفس eventId → رفض.

RULE 3: eventType يجب أن يكون في الـ schema المعروف.
        → تُرفض الأنواع غير المعروفة (future-proofing).

RULE 4: version يجب أن يكون معروف للـ runtime.
        → إدخال version "3.0.0" غير معروف → رفض.
```

### 3.4 Append-Only Contract

```text
✅ ALLOWED:   INSERT
❌ FORBIDDEN: UPDATE, DELETE (إلا بواسطة retention policy)
```

الـ Retention policy (تلقائي):
- بعد `terminal=true` + 30 يومًا → archive.
- بعد 90 يومًا → حذف نهائي (مع snapshot نهائي محفوظ).

### 3.5 Event Ordering Guarantees

```text
لكل execution:
  - sequence 1, 2, 3, ... (لا gaps، لا تكرار)
  - timestamp رتيب تصاعدي (تساوي مسموح لو events متزامنة)
  - causationId يجب أن يشير لـ eventId سابق في نفس execution
```

---

## 4. Checkpoint Model

الـ Checkpoint = snapshot للحالة في لحظة معينة، لتفادي replay كامل من sequence=1.

### 4.1 لماذا Checkpoints؟

```text
بدون checkpoint:
  restart → load events 1..10000 → replay → state
  ⟂ بطيء جدًا للـ executions الطويلة

مع checkpoint كل 100 events:
  restart → load checkpoint@100 → replay events 101..120 → state
  ⟂ أسرع بـ 100x
```

### 4.2 ما الذي يُحفظ في Checkpoint

```text
checkpointId          — PK
executionId           — FK
sequence              — آخر sequence تم checkpoint له
snapshot              — JSON يحوي:
  ├── currentState
  ├── stateHistory (مختصر: آخر 10 transitions فقط)
  ├── counters: retryCount, replanCount, toolCallCount, tokensUsed
  ├── budgets: المتبقي من كل حد
  ├── recoveryState
  ├── waitingState
  ├── approvalState
  └── planId + dagHash
createdAt             — timestamp
```

### 4.3 متى يُؤخذ Checkpoint

```text
TRIGGER 1: كل N events (N=100 افتراضيًا، قابل للضبط)
TRIGGER 2: عند انتقال state حرج:
  - WAITING_FOR_APPROVAL (قبل ما يدخل)
  - WAITING_FOR_INPUT
  - EXECUTING (لأول مرة)
  - قبل أي tool call له side effects
TRIGGER 3: عند terminal state (snapshot نهائي)
TRIGGER 4: قبل أي عملية قد تُسبب crash (مثل tool طويل)
```

### 4.4 Recovery باستخدام Checkpoint

```text
restart:
  1. اقرأ آخر checkpoint لكل execution غير terminal
  2. اقرأ events بعد checkpoint.sequence
  3. replay هذه الـ events فقط على الـ snapshot
  4. النتيجة = currentState الحالي
```

### 4.5 Checkpoint Integrity

```text
INVARIANT: checkpoint.snapshot.currentState
          يجب أن يطابق reconstructState(events[1..checkpoint.sequence])

لو لم يطابق → checkpoint corrupted → تجاهل + replay كامل
```

---

## 5. Idempotency Persistence

### 5.1 المشكلة

```text
قبل Persistence:
  Map<operationId, result>  — في الذاكرة فقط.

بعد crash:
  الـ Map تختفي.
  لو العميل أعاد الطلب بنفس idempotencyKey:
    → الـ runtime لا يعرف أن العملية تمت.
    → يُعيد تنفيذها.
    → 💥 side effect مكرر (إرسال إيميلين، خصم مرتين، ...)
```

### 5.2 Durable Idempotency Schema

| الحقل            | النوع        | الوصف                                       |
| ---------------- | ----------- | ------------------------------------------ |
| `operationId`    | string (PK) | hash للعملية (action + args + idempotencyKey) |
| `executionId`   | string (FK) | أي execution نفّذها                          |
| `status`         | string      | `'IN_PROGRESS' \| 'COMPLETED' \| 'FAILED' \| 'UNKNOWN'` |
| `result`         | JSON?       | النتيجة (لو COMPLETED أو FAILED)            |
| `sideEffect`    | boolean     | هل للعملية آثار جانبية؟ (يحكم UNKNOWN handling) |
| `startedAt`      | timestamp   |                                             |
| `completedAt`    | timestamp?  | null لو IN_PROGRESS                          |
| `ttl`            | timestamp   | متى يمكن حذف السجل (افتراضيًا +24h)          |

### 5.3 Idempotency Resolution Flow

```text
operation request comes in:
  1. hash → operationId
  2. SELECT * FROM Idempotency WHERE operationId = ?
  3. IF NOT FOUND:
       INSERT (status=IN_PROGRESS, sideEffect=...)
       EXECUTE operation
       UPDATE (status=COMPLETED|FAILED|UNKNOWN, result=...)
       RETURN result
  4. IF FOUND AND status=COMPLETED:
       RETURN result (لا تنفذ!)
  5. IF FOUND AND status=FAILED:
       → قرار: هل نعيد؟ (يحكم Policy Engine، ليس تلقائيًا)
  6. IF FOUND AND status=IN_PROGRESS:
       → execution آخر يعالجها → انتظر + poll
       → أو: العملية معلقة بعد crash → استفسر
  7. IF FOUND AND status=UNKNOWN:
       → ⚠️ انظر القسم 7 (Unknown Outcome)
```

---

## 6. Crash Recovery — Full Flow

```text
restart (process boot):
  │
  ├─ 1. افتح DB
  │
  ├─ 2. ابحث عن Executions غير terminal:
  │     SELECT * FROM Execution
  │     WHERE terminal = false
  │     AND cancelled = false
  │
  ├─ 3. لكل execution:
  │     ├─ اقرأ آخر checkpoint
  │     ├─ اقرأ events بعد checkpoint.sequence
  │     ├─ replay (مع Replay Validation Layer)
  │     │
  │     ├─ switch (currentState):
  │     │   case 'CREATED'...'POLICY_CHECKED':
  │     │     → Resume من عند currentState
  │     │   case 'EXECUTING':
  │     │     → فحص آخر tool call
  │     │     → لو UNKNOWN outcome → لا تُعد (انظر قسم 7)
  │     │     → لو SUCCESS → تابع
  │     │     → لو FAILURE → recovery
  │     │   case 'WAITING_FOR_INPUT':
  │     │     → ابقَ waiting (لا تستأنف)
  │     │   case 'WAITING_FOR_APPROVAL':
  │     │     → ابقَ waiting (الـ approval محفوظ durable)
  │     │   case 'RECOVERING':
  │     │     → استأنف recovery
  │     │   case 'CANCELLED' / 'COMPLETED' / 'ESCALATED':
  │     │     → لا تستأنف (terminal)
  │     │
  │     └─ حدّث currentState في DB
  │
  └─ 4. ابدأ استقبال الطلبات الجديدة
```

### 6.1 Crash Matrix — نقاط الانهيار الـ 12

| #  | Crash Point                       | ماذا يجب أن يحدث                                  |
| -- | --------------------------------- | ------------------------------------------------ |
| 1  | قبل execution                     | لا شيء — لم يُكتب شيء بعد                         |
| 2  | بعد policy check                  | Resume safely من POLICY_CHECKED                   |
| 3  | قبل tool                          | Execute (الـ tool لم يبدأ)                        |
| 4  | **أثناء tool** (external API)     | **UNKNOWN outcome — لا retry تلقائي**             |
| 5  | بعد tool وقبل idempotency commit  | Idempotency resolution (قسم 5.3 حالة 3)          |
| 6  | بعد idempotency commit            | لا يُعيد العملية (status=COMPLETED)               |
| 7  | أثناء verification                | Resume verification (قد يعيد التحقق)              |
| 8  | أثناء recovery                    | Resume recovery (من عند آخر attempt)              |
| 9  | أثناء replan                      | Validate الـ plan الجديد ثم resume                |
| 10 | WAITING_FOR_INPUT                 | يبقى waiting (لا يستأنف)                         |
| 11 | WAITING_FOR_APPROVAL              | يبقى waiting (approval durable)                  |
| 12 | CANCELLED / COMPLETED / ESCALATED | لا يستأنف (terminal)                             |

### 6.2 لكل نقطة: الحالة المتوقعة بعد Restart

```text
Crash #4 (أثناء tool) — أخطر سيناريو:
  قبل:
    runtime ──→ External API (HTTP request sent)
    API ينجح على الـ server البعيد
    💥 crash قبل ما يصل الـ response
  بعد restart:
    آخر event = tool.started (لا tool.completed)
    → status = UNKNOWN
    → ✅ لا retry تلقائي
    → ❌ اسأل المستخدم أو استفسر من الـ API (GET /status/{id})
    → لو الـ API ما يدعم idempotent query → ESCALATE
```

---

## 7. Unknown Outcome Handling (الأخطر)

### 7.1 متى يحدث UNKNOWN

```text
TRIGGER 1: tool.started تم تسجيله
            tool.completed أو tool.failed لم يُسجلا
            + الـ process أُعيد تشغيله

TRIGGER 2: HTTP request أُرسل (عميل)
            لا response (timeout, network drop, crash)

TRIGGER 3: DB write بدأ (DB transaction)
            لم يُؤكد commit
            (هذا مستحيل نظريًا في SQLite لو استخدمنا transactions بشكل صحيح،
             لكن يحدث في services خارجية)
```

### 7.2 قاعدة UNKNOWN الصارمة

```text
RULE: UNKNOWN لا يُعامل كـ SUCCESS ولا كـ FAILURE.

  ❌ WRONG:  UNKNOWN → retry تلقائي (يكرر side effect!)
  ❌ WRONG:  UNKNOWN → اعتبره success (قد يضلّع العميل)
  ❌ WRONG:  UNKNOWN → اعتبره failure (قد يضيع نتيجة نجحت)

  ✅ CORRECT: UNKNOWN → استفسر + اسأل + لا تتخذ قرارًا منفردًا
```

### 7.3 Unknown Resolution Flow

```text
status=UNKNOWN detected:
  │
  ├─ هل للعملية query endpoint؟
  │   (مثل: GET /payments/{id} للتحقق من status)
  │   ├─ YES → query
  │   │        ├─ found + completed → UPDATE status=COMPLETED
  │   │        ├─ found + failed    → UPDATE status=FAILED
  │   │        └─ not found         → العملية لم تصل → آمن لـ retry
  │   │
  │   └─ NO  → لا يمكن التحقق
  │            → ESCALATE للمستخدم
  │            → علامة الـ execution كـ terminalOutcome=UNKNOWN
  │            → لا retry
```

### 7.4 قاعدة الـ Side Effects

```text
لكل operation، يُسجل عند planning time:
  sideEffect: boolean
  reversible: boolean
  queryableAfter: boolean

قرار retry تلقائي بعد UNKNOWN:
  sideEffect=false       → retry آمن
  sideEffect=true
    reversible=true       → retry آمن (سيُلغى القديم)
    reversible=false
      queryableAfter=true → استفسر قبل retry
      queryableAfter=false → ❌ لا retry تلقائيًا (ESCALATE)
```

### 7.5 Terminal Outcome Values

```text
Execution.terminalOutcome:
  'SUCCESS'   — انتهى بنجاح موثّق
  'FAILURE'   — انتهى بفشل موثّق
  'UNKNOWN'   — انتهى لكن النتيجة غير معروفة (لا SUCCESS ولا FAILURE)
  'CANCELLED' — أُلغي من المستخدم
  'ESCALATED' — صُعّد للمستخدم
  null        — لم ينتهِ بعد
```

---

## 8. Concurrency & Race Conditions

### 8.1 الأخطار

```text
HAZARD 1: نفس الـ execution يُعالج من processين
          (لأن الـ runtime بدأ مرتين بالخطأ)

HAZARD 2: نفس الـ operationId يُنافس
          (طلبان متزامنان بنفس idempotencyKey)

HAZARD 3: checkpoint يُكتب بينما event يُكتب
          (race بين الكتابتين)

HAZARD 4: replay أثناء كتابة events جديدة
          (restart + new events تصل)
```

### 8.2 الحلول

```text
SOLUTION 1: Single-Writer per Execution
  كل execution له owner-process (مكتوب في DB).
  لو process آخر حاول استئنافه → wait أو reject.
  → SQL: UPDATE Execution SET owner=? WHERE executionId=? AND owner IS NULL

SOLUTION 2: Idempotency UNIQUE constraint
  operationId فريد في الـ DB.
  SELECT FOR UPDATE (SQLite: BEGIN IMMEDIATE).
  لو INSERT فشل بسبب duplicate → اقرأ الموجود.

SOLUTION 3: Checkpoint + Events atomic
  نأخذ checkpoint داخل نفس transaction التي تكتب آخر event.
  → BEGIN; INSERT event; INSERT checkpoint; COMMIT;

SOLUTION 4: Replay snapshot is immutable
  عند restart، نأخذ snapshot للـ events حتى لحظة معينة.
  أي events جديدة تُكتب بعد ذلك لا تؤثر على الـ replay الجاري.
```

### 8.3 SQLite-Specific Notes

```text
SQLite يدعم:
  - BEGIN IMMEDIATE (يحجز write lock مبكرًا)
  - WAL mode (قراء متزامنة مع كتاب)
  - SERIALIZABLE default

لكن SQLite لا يدعم:
  - SELECT FOR UPDATE صريح
  - row-level locking

لذلك:
  - استخدم BEGIN IMMEDIATE للـ writes الحرجة
  - استخدم UNIQUE constraints لمنع الـ duplicates فيزيائيًا
  - استخدم version乐观 (optimistic) للـ state updates
```

---

## 9. Data Lifecycle & Retention

### 9.1 مراحل حياة البيانات

```text
ACTIVE:
  execution غير terminal
  → كل البيانات محفوظة + قابلة للوصول

TERMINAL:
  execution.terminal = true
  → تُحفظ 30 يومًا للمراجعة

ARCHIVED:
  بعد 30 يوم من terminal
  → تُنقل لـ archive table (أو JSON file)
  → الـ events تبقى لكن compacted

PURGED:
  بعد 90 يوم من terminal
  → تُحذف الـ events نهائيًا
  → يبقى snapshot نهائي + summary فقط
```

### 9.2 ما لا يُحذف أبدًا

```text
- Terminal snapshot (currentState النهائي + counters)
- terminalOutcome
- مدة الـ execution
- سبب الإنهاء (cancel reason, failure reason)
- audit log مختصر
```

هذا يسمح بـ Learning Engine لاحقًا بقراءة "ما الذي نجح وما فشل" دون قراءة كل event.

---

## 10. Testing Strategy (ما سيُختبر بعد التنفيذ)

### 10.1 Crash Recovery Tests

لكل نقطة في الـ Crash Matrix (القسم 6.1):

```text
1. ابدأ execution حتى نقطة الـ crash
2. احقن crash (kill process / throw exception / drop connection)
3. أعد تشغيل الـ runtime
4. تحقق:
   - currentState الصحيح بعد resume
   - لا duplication في events
   - لا duplication في side effects
   - terminalOutcome الصحيح
```

### 10.2 Replay Determinism Tests (موجودة بالفعل ✅)

```text
نفس events → replay مرتين → state متطابق
```

### 10.3 Unknown Outcome Tests

```text
1. ابدأ tool call
2. اعمل crash قبل response
3. أعد التشغيل
4. تحقق:
   - status = UNKNOWN
   - لا retry تلقائي
   - الـ execution يدخل WAITING أو ESCALATED
   - المستخدم يمكنه الحل يدويًا
```

### 10.4 Concurrency Tests

```text
1. شغّل executionId من processين متزامنين
2. تحقق:
   - process واحد فقط يملك ownership
   - الآخر ينتظر أو يرفض
3. شغّل نفس operationId من طلبين متزامنين
4. تحقق:
   - عملية واحدة فقط تُنفذ
   - الأخرى تحصل على النتيجة المخزّنة
```

### 10.5 Performance Tests

```text
1. أنشئ execution بـ 10,000 events
2. قسّس وقت replay:
   - بدون checkpoint (من sequence=1)
   - مع checkpoint كل 100 events
3. تحقق:
   - checkpoint يسرّع replay بـ ≥50x
   - الـ replay دقيق (state متطابق)
```

---

## 11. Implementation Phases (الترتيب التنفيذي)

```text
PHASE 1 — Durable Event Store (P0)
  - Prisma model: ExecutionEvent
  - append-only writer
  - reader by executionId + sequence
  - integrity constraints (UNIQUE)
  - tests: write/read/duplicate-reject/ordering

PHASE 2 — Durable Execution State (P0)
  - Prisma model: Execution + Plan + PolicyDecision + Verification + Recovery
  - write-on-transition (sync with event store)
  - load-on-restart
  - tests: persist + reload + match

PHASE 3 — Durable Idempotency (P0)
  - Prisma model: IdempotencyRecord
  - resolve-or-execute flow
  - tests: same operation twice → one execution

PHASE 4 — Checkpointing (P1)
  - Prisma model: Checkpoint
  - trigger logic (every N events + critical states)
  - load checkpoint + replay-after
  - tests: 1000 events + crash + fast resume

PHASE 5 — Crash Recovery (P1)
  - boot-time recovery routine
  - crash matrix tests (12 نقطة)
  - tests: each crash point

PHASE 6 — Unknown Outcome (P1)
  - UNKNOWN status in idempotency
  - resolution flow (query / escalate)
  - tests: crash during tool + no auto-retry

PHASE 7 — Concurrency Hardening (P2)
  - single-writer per execution
  - optimistic versioning
  - tests: parallel processes + race conditions

PHASE 8 — Performance (P2)
  - checkpoint frequency tuning
  - WAL mode + indexes
  - tests: 10k events replay performance

🔒 Core Stability Release ← بعد PHASE 8

🧠 Learning Engine ← بعد Stability
```

---

## 12. الأهداف القابلة للقياس (Definition of Done)

عند انتهاء كل هذا، يجب أن يحقق الـ Runtime:

```text
✅ CRASH RECOVERY
  - بعد crash في أي نقطة من الـ 12، الـ runtime يستعيد الحالة الصحيحة
  - لا فقدان بيانات (events + state محفوظة durable)
  - لا تكرار side effects

✅ EVENT REPLAY
  - State المعاد بناؤه = State الأصلي (مُختبَر في replay-determinism.test.ts)
  - الـ Replay Validation Layer يكتشف كل أنواع الفساد السبعة
  - UNKNOWN لا يؤدي لـ retry تلقائي

✅ PERFORMANCE
  - استعادة execution بـ 1000 events في < 500ms (مع checkpoint)
  - استعادة execution بـ 1000 events في < 5s (بدون checkpoint)

✅ CONCURRENCY
  - process واحد فقط يملك ownership لكل execution
  - عملية idempotent تعيد نفس النتيجة مهما تكررت

✅ OBSERVABILITY
  - كل transition مكتوب في event store
  - كل checkpoint قابل للتحقق (snapshot = reconstructState(events[1..seq]))
  - كل unknown outcome موثّق مع سبب
```

---

## 13. ما الذي لا تفعله هذه الوثيقة

```text
❌ لا تضيف Learning Engine
❌ لا تضيف Multi-Agent
❌ لا تضيف Browser/Computer Use
❌ لا تضيف ميزات AI جديدة
❌ لا تُغير الـ Cognitive Runtime الـ 13-step pipeline
❌ لا تستخدم DB إضافية (Redis/Postgres) — Prisma + SQLite فقط
```

الهدف الوحيد: **تحويل الـ Runtime من "قوي أثناء التشغيل" إلى "موثوق بعد الانهيار"**.

---

## 14. القرارات المعمارية المؤكّدة

| القرار                              | الاختيار                          | السبب                           |
| ---------------------------------- | -------------------------------- | ------------------------------ |
| Source of Truth                    | SQLite + Prisma                  | متطلب المشروع، لا DB إضافية     |
| Event Store writes                 | Append-only                      | يحفظ التاريخ الكامل             |
| Idempotency storage                | Durable (DB)                     | يبقى بعد crash                 |
| Checkpoint frequency               | كل 100 events + critical states  | توازن أداء/تخزين                |
| UNKNOWN handling                   | لا retry تلقائي                  | يحمي من تكرار side effects      |
| Concurrency model                  | Single-writer per execution      | بسيط + آمن مع SQLite            |
| Retention                          | 30d active → 60d archive → purge  | يحدّ من نمو الـ DB              |
| Crash recovery scope               | Non-terminal executions only     | terminal = لا يُستأنف           |

---

**هذه الوثيقة ستكون العقد المرجعي لكتابة الكود في الـ Phases 1-8.**
**أي تنفيذ يجب أن يثبت أنه يحقق أهداف القسم 12 (Definition of Done).**

— نهاية الوثيقة —
