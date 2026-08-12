# 🧠 MiMo AI — Personal AI Operating System

> نظام ذكاء اصطناعي شخصي مستقل — مبني حول GLM-5.2 مع ذاكرة دائمة، معرفة، أدوات، تنفيذ طويل الأمد، تحقق، استعادة، واستقلالية محكومة.

[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 📋 نظرة عامة | Overview

**MiMo AI** ليس مجرد chatbot. هو **نظام تشغيل ذكاء اصطناعي شخصي** يدمج:

- 🧠 **عقل ذكي** — GLM-5.2 عبر Model Gateway قابل للاستبدال
- 💾 **ذاكرة دائمة** — 7 أنواع (تفضيلات، حقائق، أحداث، مهارات...)
- 📚 **قاعدة معرفة** — استيعاب المستندات + بحث هجين + رسم بياني معرفي
- 🔧 **أدوات** — 10 أدوات (ملفات، shell، ويب، ذاكرة، معرفة)
- ⚡ **تنفيذ طويل الأمد** — checkpoints + استعادة بعد الأعطال
- ✅ **تحقق** — 4 أوضاع للتأكد من النتائج
- 🛡️ **أمان** — Policy Engine غير قابل للتجاوز + sandbox
- 🤖 **استقلالية محكومة** — triggers + kill-switch
- 📊 **مراقبة** — traces + metrics + audit
- 🎓 **تعلم آمن** — استخلاص الدروس مع بوابة نشر محكومة

---

## 🚀 التشغيل السريع | Quick Start

```bash
# تثبيت التبعيات
bun install

# تشغيل قاعدة البيانات
bun run db:push

# تشغيل المشروع
bun run dev
```

ثم افتح المتصفح على `http://localhost:3000`

---

## 🏗️ البنية المعمارية | Architecture

```
┌─────────────────────────────────────────────┐
│              USER INTERFACE                 │
│  Home · Chat · Code · Work · Memory ·       │
│  Knowledge · Activity · Settings            │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│              API LAYER                       │
│  /api/chat · /api/files · /api/code/exec    │
│  /api/tasks · /api/memory · /api/knowledge  │
│  /api/approvals · /api/kill-switch · ...    │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│           LAYERED RUNTIME (15 layers)       │
│                                              │
│  Model Gateway → Context → Memory →         │
│  Knowledge → Reasoning → Planning →         │
│  Executive → Agent → Tools → Execution →    │
│  Verification → Recovery → Learning →       │
│  Autonomy                                    │
│                                              │
│  Cross-cutting: Security · Observability ·  │
│  Evaluation                                  │
└───────────────────┬─────────────────────────┘
                    │
┌───────────────────▼─────────────────────────┐
│            INFRASTRUCTURE                    │
│  Prisma + SQLite · sqlite-vec · Event Bus   │
│  Task Queue · Socket.io · Caddy Gateway     │
└─────────────────────────────────────────────┘
```

للتفاصيل الكاملة: [`docs/MASTER_ARCHITECTURE.md`](docs/MASTER_ARCHITECTURE.md)

---

## 📁 هيكل المشروع | Project Structure

```
my-nextjs-project/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # الصفحة الرئيسية (Product UI)
│   │   ├── layout.tsx          # Root layout
│   │   ├── api/                # API routes (15 endpoint)
│   │   │   ├── chat/           # محادثة SSE streaming
│   │   │   ├── files/          # عمليات الملفات
│   │   │   ├── code/exec/      # تنفيذ أوامر
│   │   │   ├── tasks/          # المهام
│   │   │   ├── memory/         # الذاكرة
│   │   │   ├── knowledge/      # المعرفة
│   │   │   ├── approvals/      # الموافقات
│   │   │   ├── kill-switch/    # مفتاح الطوارئ
│   │   │   ├── search/         # البحث الشامل
│   │   │   ├── sessions/       # الجلسات
│   │   │   ├── health/         # صحة النظام
│   │   │   ├── activity/       # النشاط
│   │   │   ├── eval/           # تقييم
│   │   │   └── triggers/       # المحفزات
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── console/            # واجهات المنتج (8 مكونات)
│   │   │   ├── home-view.tsx       # مركز القيادة
│   │   │   ├── chat-view.tsx       # محادثة workspace
│   │   │   ├── code-view.tsx       # محرر الكود
│   │   │   ├── work-view.tsx       # المهام
│   │   │   ├── memory-view.tsx     # الذاكرة
│   │   │   ├── knowledge-view.tsx  # المعرفة
│   │   │   ├── activity-view.tsx   # النشاط
│   │   │   ├── settings-view.tsx   # الإعدادات
│   │   │   └── command-palette.tsx # لوحة الأوامر (⌘K)
│   │   └── ui/                 # shadcn/ui (60+ مكون)
│   │
│   ├── lib/                    # منطق الأعمال (29 ملف)
│   │   ├── ai/
│   │   │   ├── gateway.ts      # Model Gateway (GLM-5.2)
│   │   │   └── embeddings.ts   # Local embeddings
│   │   ├── context/
│   │   │   └── engine.ts       # Context Engine
│   │   ├── memory/
│   │   │   ├── store.ts        # كتابة + dedup
│   │   │   ├── retrieval.ts    # بحث هجين
│   │   │   └── consolidation.ts # تعزيز + نسيان
│   │   ├── knowledge/
│   │   │   ├── ingestion.ts    # استيعاب المستندات
│   │   │   ├── chunking.ts     # تقسيم النص
│   │   │   ├── retrieval.ts    # بحث هجين + reranking
│   │   │   └── graph.ts        # رسم بياني معرفي
│   │   ├── brain/
│   │   │   └── executive.ts    # Executive + Planner
│   │   ├── agents/
│   │   │   └── loop.ts         # ReAct Agent Loop
│   │   ├── tools/
│   │   │   ├── runtime.ts      # Tool Runtime + policy
│   │   │   └── builtin.ts      # 10 أدوات مدمجة
│   │   ├── verification/
│   │   │   └── verifier.ts     # 4 أوضاع تحقق
│   │   ├── security/
│   │   │   ├── policy.ts       # Policy Engine (RBAC+ABAC)
│   │   │   ├── audit.ts        # سجل التدقيق
│   │   │   └── sanitizer.ts    # حماية من prompt injection
│   │   ├── observability/
│   │   │   ├── traces.ts       # تتبع
│   │   │   ├── metrics.ts      # مقاييس
│   │   │   └── system-health.ts # صحة النظام
│   │   ├── learning/
│   │   │   └── engine.ts       # استخلاص الدروس (gated)
│   │   ├── autonomy/
│   │   │   └── triggers.ts     # محفزات + kill-switch
│   │   ├── evaluation/
│   │   │   └── suite.ts        # 25 اختبار
│   │   ├── runtime/
│   │   │   ├── event-bus.ts    # ناقل الأحداث
│   │   │   └── logger.ts       # مسجل
│   │   ├── types.ts            # العقود (contracts)
│   │   ├── db.ts               # Prisma client
│   │   └── utils.ts            # أدوات مساعدة
│   │
│   └── instrumentation.ts      # تهيئة وقت التشغيل
│
├── prisma/
│   └── schema.prisma           # مخطط قاعدة البيانات (17 موديل)
│
├── docs/                       # التوثيق (90 ملف)
│   ├── MASTER_ARCHITECTURE.md  # المعمارية النهائية
│   ├── FINAL_PRODUCT_MODEL.md  # نموذج المنتج
│   ├── CAPABILITY_MAP.md       # خريطة القدرات
│   ├── SYSTEM_DEPENDENCY_GRAPH.md
│   ├── SYSTEM_DATA_FLOW.md
│   ├── SYSTEM_STATE_MODEL.md
│   ├── TECHNOLOGY_CLASSIFICATION.md
│   ├── KNOWLEDGE_INDEX.md
│   ├── IMPLEMENTATION_READINESS.md
│   ├── ARCHITECTURAL_CONFLICTS.md
│   ├── MISSING_CAPABILITIES.md
│   ├── decisions/              # 10 ADRs
│   └── knowledge/              # 66 ملف معرفة تقنية
│
├── workspace/                  # مساحة عمل الـ Code editor
├── Caddyfile                   # Gateway
├── package.json
└── tsconfig.json
```

---

## 🔧 التقنيات المستخدمة | Tech Stack

| الفئة | التقنية | السبب |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | React 19 + Server Components |
| **Language** | TypeScript 5 | Type safety |
| **Styling** | Tailwind CSS 4 | Design system |
| **UI** | shadcn/ui (New York) | 60+ مكون جاهز |
| **Database** | Prisma + SQLite | مصدر واحد للحقيقة |
| **AI Model** | GLM-5.2 (Z.ai API) | سياق 1M + أدوات |
| **Embeddings** | @huggingface/transformers | محلي (all-MiniLM-L6-v2) |
| **State** | Zustand + TanStack Query | Client + server state |
| **Real-time** | SSE (Server-Sent Events) | Streaming |
| **Gateway** | Caddy | منفذ واحد خارجي |

---

## 🧪 الاختبارات | Tests

```bash
# تشغيل suite التقييم
curl http://localhost:3000/api/eval
```

**25 اختبار عبر 12 فئة:**

| الفئة | الاختبارات |
|---|---|
| Conversation | 2 (basic + streaming) |
| Context | 3 (fast-path + compression + tokens) |
| Memory | 4 (write/read + dedup + provenance + concurrency) |
| Knowledge | 2 (ingest+retrieve + hybrid) |
| Tools | 3 (availability + fs roundtrip + timeout) |
| Security | 4 (policy + injection + sandbox + deny-default) |
| Verification | 1 (result mode) |
| Observability | 1 (trace creation) |
| Persistence | 1 (survival) |
| Autonomy | 2 (kill-switch blocks + persists) |
| Recovery | 1 (retry limit) |
| Idempotency | 1 (replay prevention) |

---

## 📚 التوثيق | Documentation

| الملف | الوصف |
|---|---|
| [docs/MASTER_ARCHITECTURE.md](docs/MASTER_ARCHITECTURE.md) | المعمارية الكاملة (38 قسم) |
| [docs/FINAL_PRODUCT_MODEL.md](docs/FINAL_PRODUCT_MODEL.md) | نموذج المنتج النهائي |
| [docs/CAPABILITY_MAP.md](docs/CAPABILITY_MAP.md) | خريطة القدرات (~230 قدرة) |
| [docs/SYSTEM_DATA_FLOW.md](docs/SYSTEM_DATA_FLOW.md) | تدفق البيانات (16 مرحلة) |
| [docs/SYSTEM_STATE_MODEL.md](docs/SYSTEM_STATE_MODEL.md) | نموذج الحالة (14 حالة) |
| [docs/SYSTEM_DEPENDENCY_GRAPH.md](docs/SYSTEM_DEPENDENCY_GRAPH.md) | رسم الاعتماديات |
| [docs/TECHNOLOGY_CLASSIFICATION.md](docs/TECHNOLOGY_CLASSIFICATION.md) | تصنيف التقنيات |
| [docs/KNOWLEDGE_INDEX.md](docs/KNOWLEDGE_INDEX.md) | فهرس قاعدة المعرفة (66 ملف) |
| [docs/IMPLEMENTATION_READINESS.md](docs/IMPLEMENTATION_READINESS.md) | درجة الجاهزية |
| [docs/decisions/](docs/decisions/) | 10 سجلات قرارات معمارية (ADRs) |

---

## 🔐 الأمان | Security

- **Policy Engine غير قابل للتجاوز** — كل عملية تمر عبره (RBAC + ABAC)
- **Deny-by-default** — كل ما هو غير مسموح مرفوض
- **Sandbox** — تصفية regex + عزل environment + مسارات محمية
- **Kill-switch** — مفتاح طوارئ يوقف كل العمليات المستقلة
- **Audit trails** — سجل تدقيق غير قابل للتعديل
- **Prompt injection defense** — كشف + تعقيم + عزل

---

## 📄 الترخيص | License

MIT
