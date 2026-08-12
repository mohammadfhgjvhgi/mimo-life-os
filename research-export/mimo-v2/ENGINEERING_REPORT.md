# MiMo Core Intelligence Foundation — Engineering Report
## Phase 2 Completion Report

> **Codename:** MiMo · **Public name:** Nova Ultra
> **Version:** v5.1 (Core Intelligence Foundation)
> **Author:** Chief Software Architect
> **Status:** Phase 2 complete — Core pipeline live and enforced

---

## 1. دورة حياة الطلب (Request Lifecycle)

كل طلب يصل من المستخدم يمر الآن **إلزامياً** عبر الدورة الكاملة. لا يمكن
لأي Component أو API Route تجاوزها:

```
┌──────────┐
│ Request  │  (POST /api/chat)
└────┬─────┘
     │
     ▼
┌──────────────────┐
│ Context Builder  │  buildContext() — يجمع: user, history, memory,
│                  │  environment, mode → ContextObject واحد immutable
└────┬─────────────┘
     │
     ▼
┌──────────────────┐
│ Reasoner         │  reason() — يقرر: execute / clarify / reject
│  (يستدعي Planner)│  لا ينفذ، فقط يقرر
└────┬─────────────┘
     │  (Decision)
     ▼
┌──────────────────┐
│ Planner          │  plan() — يحلل النية، يبني Execution Plan
│                  │  يحدد الأدوات والوكلاء المطلوبين
└────┬─────────────┘
     │  (Plan)
     ▼
┌──────────────────┐
│ Orchestrator     │  execute() — يشغل الخطوات بالترتيب، يحترم
│                  │  الـ dependencies، يجمع النتائج
└────┬─────────────┘
     │  (Run)
     ▼
┌──────────────────┐
│ Agents/Tools/    │  Writer (Model) · Research (web_search) ·
│ Models           │  Memory (recall/store)
└────┬─────────────┘
     │  (AgentResult)
     ▼
┌──────────────────┐
│ Validator        │  validateResponse() — completeness, error, format
│                  │  checks + sanitisation. البوابة الأخيرة.
└────┬─────────────┘
     │  (ValidationReport)
     ▼
┌──────────────────┐
│ Response         │  validation.sanitisedAnswer — فقط هذا يصل للمستخدم
└──────────────────┘
```

### الإثبات (من dev.log)

طلب "ما هو Arduino؟":
```
context built → planning → plan created (intent: creation, 1 step)
→ decision: execute (confidence 0.8) → run started → prompt built
→ chat invoked → answer produced (886 chars) → run completed
→ workflow done → response validated (length: 886, warnings: 0)
```

طلب "ابحث عن أنظمة التحكم PID":
```
plan created (intent: research, 3 steps) → run started
→ memory recall (0) → web search (6 results) → writer (2249 chars)
→ response validated (length: 2249, warnings: 0)
```

طلب "ابحث عن آخر مشروع... ثم أنشئ خطة":
```
plan created (intent: multi_step, 4 steps, complexity: high)
→ memory → research → summarise → plan → response validated
```

---

## 2. المكونات الجديدة والمحدّثة

### مكونات جديدة في هذه المرحلة

| المكوّن | الملف | المسؤولية |
|---|---|---|
| **Validation Layer** | `core/validator/Validator.ts` | البوابة الأخيرة: completeness, error, format, sanitisation. يُصدر `response.ready` و `error.occurred`. |
| **SearchProvider** | `core/search/SearchProvider.ts` | interface + ZAI adapter — يفصل الـ WebSearchTool عن الـ SDK مباشرة. |
| `RESPONSE_READY` event | `core/events/` | يُطلق عند جاهزية الـ response. |
| `ERROR_OCCURRED` event | `core/events/` | يُطلق عند أي فشل في أي مرحلة. |
| `context.task.mode` | `core/types.ts` | ينقل الـ UI mode عبر الـ context بدل الـ bypass. |
| `context.task.current` | `core/context/` | يخزّن الـ user input الأصلي للوكلاء. |
| `runWorkflowValidated()` | `core/workflow/` | اختصار يُعيد الـ answer الموثّق فقط. |

### مكوّنات محدّثة

| المكوّن | التغيير |
|---|---|
| `WorkflowEngine` | أضاف خطوة الـ Validator كـ gate إلزامي. كل branch (clarify/reject/execute) يمر عبر الـ validator. يُصدر events في كل خطوة. |
| `ResearchAgent` | يقرأ الـ query من `context.task.current` (الـ user input الأصلي) بدل الـ description النصي. |
| `WriterAgent` | يقرأ الـ mode من `context.task.mode` — الـ UI mode ينتشر بدون bypass. |
| `MemoryAgent` | يقرأ الـ search query من `context.task.current`. |
| `PlannerAgent` | أصلح bug: `'و'` المفردة كانت تلتقط كلمات عادية. استُبدلت بعبارات متعددة الكلمات. |
| `ContextBuilder` | يقبل `mode` و يخزّن `task.current` + `task.mode`. |
| `/api/chat` route | **أزال `directChat` bypass بالكامل**. الـ route الآن فقط: buildContext → runWorkflow → return `validation.sanitisedAnswer`. لا يستدعي model/tool/agent مباشرة. |
| `useChat` hook | أزال الـ client-side thinking/research animations (الـ server يقوم بها الآن عبر الـ pipeline). الـ client أصبح "غبي": يرسل ويتلقى stream فقط. |

---

## 3. كيف تتواصل المكونات

### 3.1 الاعتماد أحادي الاتجاه

```
UI Layer ──► Application (useChat, api.ts) ──► Core public API
                                                  │
                    ┌─────────────────────────────┤
                    │                             │
                    ▼                             ▼
              workflow ──► reasoner ──► planner   events
                    │                             ▲
                    ▼                             │
              orchestrator ──► agents ──► tools ──┘
                    │                             │
                    ▼                             │
              validator ──────────────────────────┘
```

- Core **لا** يستورد من UI أو Application.
- Application يستورد من Core public API فقط (`@/core`).
- UI لا يعرف شيئاً عن Core internals.

### 3.2 قنوات التواصل

| القناة | الاستخدام |
|---|---|
| **Interfaces** | `Model`, `Agent`, `Tool`, `SearchProvider` — عقود برمجية موحدة. |
| **Registries** | `toolRegistry`, `agentRegistry`, `modelRegistry` — تسجيل وlookup. |
| **Event Bus** | `mimoEvents` — 17 نوع حدث، fire-and-forget، أخطاء الـ handlers معزولة. |
| **ContextObject** | يُمرر بالقيمة عبر الـ pipeline — immutable. |
| **Return values** | كل دالة تُعيد نوعاً صريحاً (Plan, Decision, Run, ValidationReport). |

### 3.3 الـ Events المعيارية (17 نوعاً)

```
user.input          → Request وصل
context.built       → ContextObject جُمع
plan.created        → Planner أنتج خطة
decision.made       → Reasoner قرر
run.started         → Orchestrator بدأ
run.completed       → Run اكتمل بنجاح
run.failed          → Run فشل
agent.started       → وكيل بدأ مهمة
agent.completed     → وكيل أنهى مهمة
agent.failed        → وكيل فشل
tool.invoked        → أداة استُدعيت
tool.result         → أداة أعادت نتيجة
memory.stored       → ذاكرة حُفظت
memory.recalled     → ذاكرة استُدعيت
model.invoked       → نموذج استُدعي
response.ready      → Validator صدّق الـ response  ← جديد
error.occurred      → خطأ في أي مرحلة          ← جديد
```

كل حدث يحمل: `type`, `payload`, `timestamp`, `source`, `correlationId` —
قابل للتتبع الكامل.

---

## 4. ما الذي أصبح جاهزاً للمرحلة التالية

### 4.1 قابلية الاستبدال الكاملة

| الاستبدال | المطلوب |
|---|---|
| مزود AI جديد (Claude/Gemini/Local) | adapter واحد في `models/` + تسجيل في kernel |
| مزود بحث جديد | adapter في `search/` + `registerSearchProvider()` |
| وكيل جديد | تطبيق `Agent` interface + `agentRegistry.register()` |
| أداة جديدة | تطبيق `Tool` interface + `toolRegistry.register()` |
| تخزين ذاكرة دائم (Prisma) | adapter خلف نفس `MemoryEngine` interface |
| Validator أقوى (AI-based) | استبدال `validateResponse()` بدالة أقوى |

### 4.2 قابلية التوسعة

- إضافة مزود محلي (Ollama) = adapter واحد فقط.
- إضافة وكلاء متخصصين (Code Agent, IoT Agent) = interface + تسجيل.
- إضافة Knowledge Graph = توسيع `MemoryEngine` بـ relations (الـ interface جاهز).
- إضافة Workflow Engine متقدم (DAG) = استبدال `execute()` بمنفّذ أقوى.
- إضافة Developer Mode = الـ events + الـ logger جاهزان للتتبع المباشر.

### 4.3 قابلية الاختبار

كل وحدة في Core خالصة (لا React، لا DOM):
- `EventBus`: emit/on/off، handler isolation.
- `MemoryEngine`: store/recall/relate/forget.
- `ContextBuilder`: يبني سياقاً صحيحاً من مصادر متعددة.
- `PromptEngine`: pure function.
- `Planner`: intent detection + plan building.
- `Reasoner`: decision logic.
- `Orchestrator`: dependency resolution + parallel/sequential execution.
- `Validator`: pure function.

---

## 5. القيود الحالية وما أُجّل عمداً

### 5.1 قيود مقصودة (حسب المواصفات)

| القيد | السبب | متى يُرفع |
|---|---|---|
| **لا Prisma / قاعدة بيانات** | الذاكرة في RAM. تُفقد عند الـ refresh. | المرحلة التالية (v1.1). |
| **لا Authentication** | فردي (مستخدم واحد). | v2.0 (Multi-user). |
| **مزود AI واحد** | ZAI فقط. الـ interface جاهز للمزودات الأخرى. | عند توفّر adapters. |
| **لا Knowledge Graph** | `MemoryEngine.relate()` موجود لكن بدائي. | v1.2. |
| **Planner rule-based** | لا يستخدم model للتخطيط. | عند الحاجة لتخطيط معقد. |
| **Validator rule-based** | checks ثابتة (length, fences). | يمكن إضافة AI-based check. |
| **لا Streaming من الـ Core** | الـ route يchunk النص بعد اكتمال الـ pipeline. | يحتاج Model.stream() adapter. |

### 5.2 قيود تشغيلية ملاحظة

| القيد | التأثير | الحل المستقبلي |
|---|---|---|
| **زمن الاستجابة** | الـ pipeline الكامل يستغرق 10-60 ثانية (الـ model call هو bottleneck). | streaming حقيقي من الـ model عبر `Model.stream()` adapter. |
| **لا تتبع مباشر في الـ UI** | الـ events تُسجَّل في console لكن الـ UI لا يعرضها. | Developer Mode view (مرحلة لاحقة). |
| **الذاكرة فارغة** | لا seeding تلقائي. الـ Memory Agent يُرجع 0 دائماً حالياً. | seeding من بيانات المستخدم + Prisma. |

### 5.3 ما لم يُبنَ (مؤجل بوعي)

- **Plugin SDK عام** — الـ interfaces موجودة لكن لا API عام للتسجيل الخارجي.
- **Workflow DAG معقد** — الـ Orchestrator الحالي خطي مع dependencies بسيطة.
- **Prompt Engine ديناميكي بـ AI** — حالياً rule-based layering.
- **Context Engine بـ embeddings** — حالياً naive substring matching.
- **Multi-agent parallel execution** — حالياً sequential.
- **Tool permissions enforcement** — الـ permissions معرّفة لكن لا enforcement.

---

## 6. معايير النجاح — تحقق

| المعيار | الحالة |
|---|---|
| يصل طلب → يبنى Context → يوضع Plan → يتخذ Reasoner القرار → يدير Orchestrator التنفيذ → يستدعي Agent/Tool/Model → يراجع Validator → تعاد الإجابة | ✅ مُتحقق (مُثبت في dev.log) |
| دون أن يعرف الـ UI أي تفاصيل عن هذه الدورة | ✅ الـ UI يستدعي `/api/chat` فقط، يستقبل stream |
| لا ميزة مرئية جديدة | ✅ الـ UI لم يتغير |
| لا صفحات جديدة | ✅ |
| لا Authentication | ✅ |
| لا Prisma | ✅ |
| لا قاعدة بيانات دائمة | ✅ |
| لا Providers إضافيون | ✅ |
| لا ربط مباشر بالواجهة | ✅ |
| لا منطق Hardcoded قابل للـ Interface | ✅ كل شيء خلف interfaces |

---

## 7. الإحصائيات

| المقياس | القيمة |
|---|---|
| ملفات Core | 32 ملف |
| أسطر Core (تقريبياً) | ~2,700 |
| Interfaces | 5 (Model, Agent, Tool, SearchProvider, EventBus) |
| Agents | 4 (Planner, Research, Memory, Writer) |
| Tools | 3 (WebSearch, MemoryRecall, MemoryStore) |
| Event types | 17 |
| Error classes | 8 |
| Public API exports | 30+ |
| Lint errors | 0 |
| Bypass paths في الـ route | 0 (الـ directChat أُزيل بالكامل) |

---

## 8. الخلاصة

النواة الذكية (Core Intelligence) مبنية بشكل صحيح ومُطبّقة إلزامياً. كل
طلب يمر عبر الدورة الكاملة، والـ UI لا يعرف شيئاً عنها. الـ Validator
يضمن أن لا إجابة غير موثّقة تصل للمستخدم.

البنية جاهزة لـ:
- استبدال أي مزود بحث/نموذج بـ adapter واحد.
- إضافة أي وكيل/أداة بـ interface + تسجيل.
- إضافة تخزين دائم خلف نفس الـ interfaces.
- إضافة Developer Mode فوق الـ events + الـ logger الموجودين.

**ما يحتاجه المشروع في المرحلة التالية:** تخزين دائم للذاكرة (Prisma) +
seeding من بيانات المستخدم، حتى تصبح التجربة الأساسية ("تذكّر آخر مشروع")
تعمل بياناتها الفعلية بدل الـ RAM الفارغة.

---

*هذا التقرير هو المرجع التنفيذي للمرحلة الثانية. أي تعارض مع
MIMO_PRODUCT_SPEC.md أو MIMO_ENGINEERING_SPEC.md — الوثيقتان تغلبان.*
