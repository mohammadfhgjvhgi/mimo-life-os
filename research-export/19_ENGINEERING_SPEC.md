# MiMo Life OS — Engineering Specification v1.0

> **Codename:** MiMo
> **Public name:** Nova Ultra
> **Document owner:** Chief Software Architect
> **Status:** Canonical — all code must conform

---

## 1. Architecture Overview

MiMo مبني على **طبقات معزولة (Isolated Layers)**. كل طبقة تعرف ما
تحتها فقط. الاعتماد أحادي الاتجاه: للأعلى.

```
┌─────────────────────────────────────────────────────┐
│  UI Layer (src/components, src/app)                 │  ← يعرف Core فقط
│    • Components, Pages, Hooks                       │
├─────────────────────────────────────────────────────┤
│  Application Layer (src/lib/nova)                   │  ← ينسق Core
│    • Store (Zustand), API client, useChat           │
├─────────────────────────────────────────────────────┤
│  ╔═══════════════════════════════════════════════╗  │
│  ║  CORE INTELLIGENCE (src/core)                 ║  │  ← قلب النظام
│  ║                                               ║  │
│  ║  kernel → orchestrator → workflow             ║  │
│  ║    planner → reasoner                         ║  │
│  ║    context → prompts                          ║  │
│  ║    memory, registry, agents, tools, models    ║  │
│  ║    events                                     ║  │
│  ╚═══════════════════════════════════════════════╝  │
├─────────────────────────────────────────────────────┤
│  Infrastructure (z-ai-web-dev-sdk, fetch)           │  ← محdriver خارجي
└─────────────────────────────────────────────────────┘
```

### قاعدة الاعتماد الصارمة

| الطبقة | يسمح لها باستيراد من | لا يسمح لها باستيراد من |
|---|---|---|
| UI | Application, Core types | Core internals, infra |
| Application | Core public API | Core internals |
| **Core** | Core نفسه, infra | ❌ Application, ❌ UI |
| Infrastructure | لا شيء (قاع الهرم) | — |

**أي استيراد من Core إلى UI = خطأ معماري.**

---

## 2. Layers (تفصيل)

### 2.1 Core Layer (`src/core`)

النواة المعرفية. لا تعرف شيئاً عن React ولا عن الـ UI.

```
src/core/
├── index.ts                  # Public API surface (ما يُصدَّر للخارج)
├── kernel/                   # يمهّد النظام، يربط الوحدات
├── events/                   # Event Bus + تعريفات الأحداث
├── context/                  # يبني ContextObject
├── prompts/                  # يبني Prompt ديناميكياً
├── planner/                  # يفهم المهمة، يبني Plan
├── reasoner/                 # يقرر الاستراتيجية
├── orchestrator/             # يشغل الوكلاء
├── workflow/                 # ينفذ الخطوات كسلسلة
├── memory/                   # ذاكرة (RAM في v1.0)
├── registry/                 # Tool + Agent + Model registries
├── models/                   # Model interface + adapter
├── agents/                   # تطبيقات Agent interface
├── tools/                    # تطبيقات Tool interface
└── types.ts                  # كل أنواع Core المشتركة
```

### 2.2 Application Layer (`src/lib/nova`)

ينسق بين Core والـ UI. يحتوي: Store (Zustand)، API routes client،
useChat hook. **لا يحتوي منطق أعمال** — فقط يمرر.

### 2.3 UI Layer (`src/components/nova`, `src/app`)

React فقط. يستدعي Application. لا يستدعي Core مباشرة إلا عبر
Application. **لا fetch داخل Components.**

---

## 3. Naming Rules

| النوع | القاعدة | مثال |
|---|---|---|
| ملف | `PascalCase.ts` للأصناف، `camelCase.ts` للدوال | `EventBus.ts`, `contextBuilder.ts` |
| دالة | `camelCase` | `buildContext()`, `planTask()` |
| interface | `PascalCase`، لا prefix `I` | `Agent`, `Tool`, `Model` |
| type | `PascalCase` | `ContextObject`, `PlanStep` |
| enum | `PascalCase` + `PascalCase` members | `AgentStatus.Idle` |
| const | `UPPER_SNAKE` للثوابت، `camelCase` للقيم | `MAX_TOKENS`, `defaultModel` |
| ملف واجهة | `types.ts` في كل وحدة | `core/events/types.ts` |
| ملف فهرس | `index.ts` يصدِّر الـ public API فقط | كل وحدة |

### قاعدة المُسماة الداخلية
- اسم الـ codename الداخلي: **MiMo** (يظهر في الأنواع والأحداث: `MiMoEvent`, `MIMO_TZ`).
- اسم العرض العام: **Nova Ultra** (يظهر في الـ UI فقط).
- **لا** يخلط بينهما في نفس الملف.

---

## 4. Folder Rules

### 4.1 كل وحدة في Core تتبع نفس الهيكل:

```
module/
├── types.ts        # الأنواع الخاصة بالوحدة (interfaces, types)
├── <Implementation>.ts   # التنفيذ
└── index.ts        # يصدِّر فقط ما هو public
```

### 4.2 قواعد الـ index.ts
- يصدِّر **فقط** الـ public API.
- لا يصدِّر الأنواع الداخلية المساعدة.
- ترتيب: types → implementations → instances.

### 4.3 لا ملفات عمومية مشتركة خارج `types.ts`
- كل وحدة تملك `types.ts` خاصاً بها.
- الأنواع المشتركة بين وحدتين+ تذهب إلى `src/core/types.ts`.

---

## 5. Interfaces (العقود)

### 5.1 Model Interface

```typescript
interface Model {
  readonly id: string;
  readonly name: string;
  readonly capabilities: ModelCapability[];
  chat(request: ModelRequest): Promise<ModelResponse>;
  stream?(request: ModelRequest): AsyncIterable<string>;
}
```

الـ UI لا يعرف أي Model موجود. يعرف فقط أن هناك `Model.chat()`.

### 5.2 Agent Interface

```typescript
interface Agent {
  readonly id: string;
  readonly name: string;
  readonly capabilities: string[];
  readonly requiredTools: string[];
  execute(task: AgentTask, context: ContextObject): Promise<AgentResult>;
}
```

أي وكيل جديد = تطبيق هذا الـ interface + تسجيل في `AgentRegistry`.

### 5.3 Tool Interface

```typescript
interface Tool {
  readonly id: string;
  readonly name: string;
  readonly category: string;
  readonly inputSchema: Schema;
  readonly outputSchema: Schema;
  execute(input: unknown, context: ContextObject): Promise<unknown>;
}
```

أي أداة جديدة = تطبيق + تسجيل. لا hardcoding.

### 5.4 EventBus Interface

```typescript
interface EventBus {
  emit(event: MiMoEvent): void;
  on<T>(type: string, handler: EventHandler<T>): Unsubscribe;
  off(type: string, handler: EventHandler): void;
}
```

### 5.5 Planner / Reasoner / Orchestrator

كلها interfaces، كلها قابلة للاستبدال دون لمس بقية النظام.

---

## 6. Events

### 6.1 كل حدث يمر عبر Event Bus. لا استدعاءات مباشرة بين الوحدات الأساسية.

### 6.2 شكل الحدث الموحد

```typescript
interface MiMoEvent<T = unknown> {
  readonly type: string;          // namespace.action (مثل "memory.stored")
  readonly payload: T;
  readonly timestamp: number;
  readonly source: string;        // اسم الوحدة المُصدِرة
  readonly correlationId?: string; // لتتبع سلسلة الأحداث
}
```

### 6.3 قواعد تسمية الأحداث

- الصيغة: `<namespace>.<action>`.
- الـ namespace = اسم الوحدة (`memory`, `agent`, `tool`, `plan`, `run`).
- الـ action = فعل ماضي (`stored`, `started`, `completed`, `failed`).

### 6.4 الأحداث المعيارية في v1.0

| الحدث | متى يُطلق |
|---|---|
| `user.input` | المستخدم أرسل طلباً |
| `context.built` | بُني Context Object |
| `plan.created` | Planner أنتج خطة |
| `run.started` | Orchestrator بدأ تنفيذاً |
| `agent.started` | وكيل بدأ مهمة |
| `agent.completed` | وكيل أنهى مهمة |
| `agent.failed` | وكيل فشل |
| `tool.invoked` | أداة استُدعيت |
| `tool.result` | أداة أعادت نتيجة |
| `memory.stored` | ذاكرة حُفظت |
| `memory.recalled` | ذاكرة استُدعيت |
| `run.completed` | تنفيذ اكتمل |
| `run.failed` | تنفيذ فشل |
| `model.invoked` | نموذج استُدعي |

### 6.5 قواعد الـ Handlers
- الـ handler قد يكون async.
- خطأ في handler **لا** يسقط الـ emit. يُسجَّل ويُستكمل.
- لا handler يعدّل الـ payload (immutable).

---

## 7. Testing

### 7.1 القاعدة
- Core خالص (لا React) → **قابل للاختبار 100% بدون DOM**.

### 7.2 ما يُختبر
- EventBus: emit/on/off، handler errors معزولة.
- MemoryEngine: store/recall/relate/forget.
- ContextBuilder: يبني سياقاً صحيحاً من مصادر متعددة.
- PromptEngine: يدمج الأجزاء بالترتيب الصحيح.
- Planner: ينتج خطة من نية واضحة.
- Orchestrator: يشغل وكلاء بالترتيب الصحيح ويجمع النتائج.
- Registries: register/get/list، رفض التكرار.

### 7.3 ما لا يُختبر في v1.0
- UI components (مؤجل).
- E2E (مؤجل).

### 7.4 لا test code في هذه المرحلة
حسب قواعد البيئة: لا نكتب tests الآن. لكن البنية **تسمح** بها لاحقاً
دون إعادة هيكلة.

---

## 8. Error Handling

### 8.1 هرم الأخطاء

```
MiMoError (base)
├── CoreError        # خطأ داخلي في Core
├── AgentError       # خطأ في وكيل
├── ToolError        # خطأ في أداة
├── ModelError       # خطأ في نموذج AI
├── MemoryError      # خطأ في الذاكرة
└── ValidationError  # input غير صالح
```

### 8.2 القواعد
- كل خطأ يحمل: `code`, `message`, `cause?`, `context?`.
- لا `throw new Error('...')` عاري. استخدم الفئات المخصصة.
- الـ Orchestrator يلتقط أخطاء الوكلاء ولا يسقط الـ run كله (إلا إذا
  كان الوكيل حاسماً).
- الـ UI لا يرى أبداً stack trace خام. يرى رسالة مترجمة.

### 8.3 Recovery
- فشل أداة → الوكيل يبلغ → Orchestrator يقرر: إعادة محاولة أو تخطي.
- فشل نموذج → Orchestrator يعيد المحاولة مرة واحدة، ثم يبلّغ.
- فشل وكيل حاسم → الـ run يفشل بأكمله مع تقرير واضح.

---

## 9. Logging

### 9.1 Logger مركزي (لا `console.log` مبعثر)

```typescript
interface Logger {
  debug(message: string, meta?: object): void;
  info(message: string, meta?: object): void;
  warn(message: string, meta?: object): void;
  error(message: string, meta?: object): void;
}
```

### 9.2 المستويات
- `debug`: تفاصيل داخلية (تُطفأ في الإنتاج).
- `info`: أحداث دورة الحياة (run started, agent completed).
- `warn`: حالات غير متوقعة لكن مستمرة.
- `error`: فشل يتطلب انتباهاً.

### 9.3 كل سجل يحمل
- `module`: اسم الوحدة المُصدِّرة.
- `correlationId`: لربط سجلات نفس الـ run.
- `timestamp`.

### 9.4 في v1.0
Logger يكتب إلى console منسّقاً. لاحقاً يمكن استبداله بـ file/remote
دون تغيير الاستدعاءات.

---

## 10. Feature Flags

### 10.1 كل ميزة تجريبية خلف flag

```typescript
interface FeatureFlags {
  readonly deepThinking: boolean;
  readonly webSearch: boolean;
  readonly multiAgent: boolean;
  readonly knowledgeGraph: boolean;
  // ...
}
```

### 10.2 القواعد
- الـ flags ثوابت في `src/core/kernel/flags.ts`.
- قراءة فقط (readonly) من باقي النظام.
- تبديلها لا يتطلب إعادة بناء — تُقرأ وقت التشغيل.
- ميزة معطّلة = الكود موجود لكن لا يُستدعى.

---

## 11. Architecture Rules (القواعد الصارمة)

### ممنوع

- ❌ `fetch` داخل Components.
- ❌ `any` في أي مكان.
- ❌ منطق أعمال داخل JSX.
- ❌ Component أكبر من 300 سطر.
- ❌ أكثر من مسؤولية في الملف.
- ❌ Component يستدعي Model مباشرة.
- ❌ Core يستورد من UI أو Application.
- ❌ `Date.now()` / `Math.random()` في render path.
- ❌ `console.log` مبعثر (استخدم Logger).

### واجب

- ✅ كل طلب AI يمر: Planner → Context → Prompt → Model.
- ✅ كل حدث يمر عبر EventBus.
- ✅ كل Tool/Agent/Model يطبق interface ويسجل نفسه.
- ✅ كل دالة عامة لها نوع return صريح.
- ✅ كل خطأ يُلقى عبر فئة MiMoError.
- ✅ كل ملف يبدأ بـ docblock يشرح غايته.

---

## 12. Dependency Direction (مخطط الاعتماد)

```
UI ──► Application ──► Core public API
                         │
                         ├──► kernel
                         ├──► orchestrator ──► agents ──► models
                         ├──► planner ──► context ──► memory
                         ├──► reasoner ──► planner
                         ├──► workflow ──► orchestrator
                         ├──► registry (tools, agents, models)
                         └──► events (يستخدمه الجميع)
```

**events** هو البنية التحتية المشتركة. الكل يعتمد عليه، لا يعتمد على
أحد.

---

## 13. Public API Surface

`src/core/index.ts` يصدِّر **فقط**:

```typescript
// Kernel (entry point)
export { mimoKernel } from './kernel';

// Types (for Application layer typing)
export type { Model, Agent, Tool, MiMoEvent, ContextObject,
             Plan, Decision, Run, AgentResult } from './types';

// Event bus (for advanced consumers)
export { mimoEvents } from './events';
```

**لا** يصدِّر تنفيذات داخلية. Application لا يستطيع استيراد `Planner`
مباشرة — يمر عبر kernel.

---

## 14. Versioning

- **v1.0** — Core Intelligence Foundation (هذه المرحلة).
- **v1.1** — Memory persistence (Prisma).
- **v1.2** — Knowledge Graph.
- **v2.0** — Multi-user + Auth.
- **v3.0** — Voice / Desktop / Mobile.

كل إصدار له changelog. Breaking changes تتطلب major bump.

---

## 15. Compliance

أي PR لا يلتزم بهذه الوثيقة **يُرفض**. لا استثناءات لـ "السرعة".

المراجعة تتحقق من:
- [ ] الاعتماد في الاتجاه الصحيح.
- [ ] لا `any`.
- [ ] لا `fetch` في Components.
- [ ] لا `console.log` (استخدم Logger).
- [ ] الأنواع صريحة.
- [ ] interface مطبق قبل التنفيذ.
- [ ] حدث يُطلق عند كل فعل جوهري.
- [ ] خطأ يُلقى عبر فئة MiMoError.

---

*هذه الوثيقة هي العقد. أي تعارض بينها وبين أي قراءة أخرى — هذه تغلب.*
