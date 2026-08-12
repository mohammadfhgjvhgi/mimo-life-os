# 🛠️ MiMo AI — دليل التثبيت والإعداد

## المتطلبات | Prerequisites

| الأداة | الإصدار | السبب |
|---|---|---|
| Node.js | 18+ | تشغيل Next.js |
| Bun | 1.0+ | package manager + runtime |
| Git | أي إصدار | التحكم بالإصدار |

## 1️⃣ استنساخ المشروع | Clone

```bash
git clone https://github.com/mohammadfhgjvhgi/my-nextjs-project.git
cd my-nextjs-project
```

## 2️⃣ تثبيت التبعيات | Install Dependencies

```bash
bun install
```

هذا يثبت:
- Next.js 16 + React 19
- Prisma 6 + @prisma/client
- z-ai-web-dev-sdk (GLM-5.2)
- @huggingface/transformers (embeddings محلية)
- shadcn/ui components
- Tailwind CSS 4
- جميع الـ Radix UI primitives

## 3️⃣ إعداد قاعدة البيانات | Database Setup

```bash
# إنشاء قاعدة البيانات + الجداول
bun run db:push
```

هذا ينشئ ملف `db/custom.db` (SQLite) مع 17 جدول:

| الجدول | الوصف |
|---|---|
| Session | الجلسات |
| Turn | رسائل المحادثة |
| Task | المهام |
| Step | خطوات المهمة |
| Checkpoint | نقاط الحفظ |
| Artifact | الملفات المُنتجة |
| Memory | الذكريات (7 أنواع) |
| KnowledgeDoc | المستندات |
| Chunk | أجزاء المستندات (مع embeddings) |
| Entity | الكيانات (Knowledge Graph) |
| Relation | العلاقات |
| AgentState | حالة الـ agent |
| ToolCall | استدعاءات الأدوات |
| VerificationResult | نتائج التحقق |
| Approval | الموافقات |
| Trace | آثار التشغيل |
| AuditLog | سجل التدقيق |
| Lesson | الدروس المستفادة |
| Trigger | المحفزات |
| Setting | الإعدادات |

## 4️⃣ التشغيل | Run

```bash
bun run dev
```

الخادم يعمل على `http://localhost:3000`

## 5️⃣ التحقق | Verify

```bash
# فحص صحة النظام
curl http://localhost:3000/api/health

# تشغيل التقييم
curl http://localhost:3000/api/eval
```

---

## ⚙️ الإعدادات | Configuration

### متغيرات البيئة | Environment Variables

أنشئ ملف `.env` في جذر المشروع:

```env
# قاعدة البيانات
DATABASE_URL="file:/home/z/my-project/db/custom.db"

# مفتاح الطوارئ (اختياري)
MIMO_KILL_SWITCH=false

# مساحة العمل (اختياري - افتراضي: ./workspace)
MIMO_WORKSPACE=/home/z/my-project/workspace

# تصحيح الأخطاء
DEBUG=false
```

### ملف Caddyfile

الـ Gateway يعمل على المنفذ 81 مع توجيه `XTransformPort`:

```caddy
:81 {
    @transform_port_query {
        query XTransformPort=*
    }
    handle @transform_port_query {
        reverse_proxy localhost:{query.XTransformPort}
    }
    handle {
        reverse_proxy localhost:3000
    }
}
```

---

## 🧑‍💻 للتطوير | For Development

### تشغيل lint

```bash
bun run lint
```

### إعادة إنشاء قاعدة البيانات

```bash
bun run db:reset
```

### تحديث مخطط Prisma

```bash
# عدّل prisma/schema.prisma ثم:
bun run db:push
```

---

## 🔧 استكشاف الأخطاء | Troubleshooting

### المشكلة: المنفذ 3000 مستخدم

```bash
# ابحث عن العملية
lsof -i :3000
# اقتلها
kill -9 <PID>
```

### المشكلة: قاعدة البيانات تالفة

```bash
rm db/custom.db
bun run db:push
```

### المشكلة: embeddings لا تعمل

النظام يستخدم fallback تلقائي (hash-based) إذا فشل تحميل transformers.js.

### المشكلة: GLM API rate limit (429)

انتظر 30-60 ثانية ثم أعد المحاولة. النظام يتعامل مع هذا بأناقة.
