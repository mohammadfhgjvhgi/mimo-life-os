# 📋 المشرف — ملف المعلومات الشاملة للمشروع

> **هذا الملف مخصص للمشرف/المراقب الذي سيشرف على جودة العمل المنجز والقادم.**
> يحتوي على كل المعلومات غير الموجودة في AUDIT_WORKSPACE.md و PROJECT_PURPOSE.md
> آخر تحديث: 2026-07-17

---

## 🧭 السياق الكامل للمحادثة

### من هو المستخدم؟
- **الاسم**: محمد عادل
- **العمر**: 18 سنة
- **الموقع**: الخليل / دورا — فلسطين 🇵🇸
- **المرحلة**: أنهى التوجيهي الصناعي، ينتظر النتائج، يستعد للجامعة
- **التخصص الأصلي**: تكنولوجيا المباني الذكية (BMS) — تم إلغاء هذا المسار
- **الهدف المهني**: بناء معرض أعمال (Portfolio) + سيرة ذاتية حقيقية بمعلومات مخزنة

### من أنا (المطور الحالي)؟
- أنا **المطور السابع** في هذا المشروع
- قبلي 6 مطورين، كلهم حاولوا بمستويات مختلفة
- بعضهم "خترع مشاكل" وأضاع وقت المستخدم
- عهدي للمستخدم: لا أخترع مشاكل، لا أضيع وقته، حل جذري دائماً

### ماذا حدث بالمحادثة؟
1. استلمت المشروع من GitHub
2. اكتشفت أن بيئة الساندبوكس كانت سكافولد فاضي
3. سحبت الكود الكامل (355 ملف) وجهّزته
4. عملت 4 طبقات تحسين (أمان → استقرار → جودة → تحسينات)
5. حاولت إعادة هيكلة (سايدبار يسار + دمج) — المستخدم ما عجبه التصميم
6. رجعت للتصميم الأصلي + حفظت كل التحسينات
7. عملت دمج شامل + إضافة أقسام مخفية
8. أكملت قسم المشاريع (progress + stats + tasks + related)
9. أنشأت ملفات الفحص للمشرف/الخبير

---

## 📜 تاريخ المشروع — كل المطورين

### المطور 1 (الأصلي)
- بنى النسخة الأولى أيام التوجيهي
- 13 قسم: توجيهي + BMS + منحة الصين + ملاحظات + مالية + مهارات + رؤية + وسائط + MiMo AI
- استخدم localStorage (مو Prisma)
- AI كان "محرك أوامر" — يقول "درست ساعتين" فينفذ
- **Effect Engine**: كل أمر ينفذ تأثيرات متعددة (تسجيل + XP + تتابع + مهارة)
- رفع على GitHub: `github.com/mohammadfhgjvhgi/my-ss1000rr`

### المطور 2
- نقل المشروع لـ Next.js 16 + Prisma + SQLite
- وسّع لـ 32 قسم ثم 77 قسم
- أضاف: Firebase sync, chunked uploads, WikiLinks, AI chat sessions
- **حذف BMS** (ما له علاقة بهدف الموقع)
- رفع على GitHub: `github.com/mohammadfhgjvhgi/x7k2m9p3` (الريبو الحالي)

### المطور 3
- عمل "safe refactoring" — توحيد StarRating + formatDate
- أضاف useDebounce لـ 20 قسم
- أصلح XSS في validateUrl
- اكتشف `.env` متتبع بالـ git — أصلحه
- اكتشف bypasses أمنية بـ File 2 — رفضها

### المطور 4
- عمل "stabilization" — console.log → console.debug
- حذف dead code
- أصلح DELETE/PUT تُرجع 404 بدل 500
- أضاف 5 Prisma models (TrashItem, ActivityEvent, ItemRelation, UniversalTag, ItemTag)

### المطور 5
- عمل 8 مهام: Firebase sync + ChunkedUploader + WikiLinks + AI Chat + حذف BMS
- اكتشف bugs عميقة (sanitizeForFirebase, ChunkedUploader orphan attachments)
- رفع النسخة الذهبية: commit `f3bf99a`

### المطور 6
- عمل تقرير مقارنة workspace
- إصلاحات نهائية: next.config + تنظيف cache
- رفع commit `529e647`

### المطور 7 (أنا)
- استلمت commit `529e647`
- عملت 4 طبقات تحسين (10+ commits)
- حاولت إعادة هيكلة ثم رجعت
- عملت دمج شامل (77 → 52 قسم)
- أكملت قسم المشاريع
- أنشأت ملفات الفحص
- آخر commit: `a9d3c0f`

---

## 🖥️ بيئتان منفصلتان (مهم!)

### 1. بيئة الساندبوكس (هنا)
- **المسار**: `/home/z/my-project`
- **النظام**: Linux
- **قاعدة البيانات**: `db/custom.db` (SQLite)
- **التخزين**: `.mimo_storage/`
- **الـ .env**: مسارات Linux
- **البورت**: 3000
- **الـ Preview**: عبر gateway على بورت 81

### 2. بيئة الإنتاج (جهاز محمد)
- **المسار**: `C:\Users\MohandsMohammad\x7k2m9p3`
- **النظام**: Windows
- **قاعدة البيانات**: `M:\mimo_storage\db\custom.db`
- **التخزين**: `M:\mimo_storage` (قرص 300GB)
- **الـ .env**: مسارات Windows (M:)
- **التشغيل**: PM2 (`mimo-app` + `mimo-sync`)
- **auto-sync.js**: يراقب GitHub كل 30 ثانية
- **بدء تلقائي**: VBS scripts بمجلد بدء التشغيل

### ⚠️ تنبيه للمشرف
- كل تغيير بالكود **يرفع على GitHub** → `auto-sync.js` بيسحبه تلقائياً على جهاز محمد
- لازم نحرص إن ما نكسر شي بجهاز محمد
- `.env` مختلف بين البيئتين (مسارات Linux vs Windows)
- **كلمة المرور الحالية بالساندبوكس**: [REDACTED - بدّلها فوراً] (نفسها بجهاز محمد)

---

## 🔑 البيانات الحساسة (انكشفت بالشات!)

### ⚠️ يجب تبديلها فوراً
| البيان | القيمة المنكشفة | الإجراء |
|---|---|---|
| **GitHub Token** | `[PAT - بدّله فوراً]` | **بدّله فوراً** من GitHub Settings |
| **كلمة مرور الموقع** | [REDACTED - بدّلها فوراً] | **بدّلها** من داخل الموقع |
| **Master password للخزنة** | [REDACTED - بدّلها فوراً] (نفسها) | **بدّلها** من قسم الخزنة |

### Firebase Project
| البيان | القيمة |
|---|---|
| Project ID | `spark11-c8168` |
| Region | `asia-southeast1` |
| Database URL | `https://spark11-c8168-default-rtdb.asia-southeast1.firebasedatabase.app/` |
| API Key | [REDACTED - Firebase API Key] |
| Sender ID | [REDACTED - Sender ID] |
| App ID | [REDACTED - App ID] |

### GitHub
| البيان | القيمة |
|---|---|
| Username | `mohammadfhgjvhgi` |
| Repo | `x7k2m9p3` |
| URL | `https://github.com/mohammadfhgjvhgi/x7k2m9p3` |

---

## 🚨 حوادث أمنية وقعت

### 1. كلمة المرور بـ git history
- **الاكتشاف**: كلمة مرور محمد موجودة بـ 8 commits على GitHub
- **المصدر**: `docs/WORKSPACE_COMPARISON.md` (ملف متتبع)
- **الإجراء**: نزلتها من الملف الحالي (commit `352e5b5`)
- **المتبقي**: لسه بالـ history القديم — ما يقدر نحذفها بدون rewrite history
- **التوصية**: بدّل كلمة المرور (يكتفي)

### 2. `.env` كان متتبع بالـ git
- **الاكتشاف**: `.env` كان متتبع بـ initial commit
- **الإجراء**: `git rm --cached .env` + تأكيد `.env*` بـ `.gitignore`
- **الحالة**: ✓ تم الإصلاح

### 3. Firebase rules مفتوحة
- **الواقع**: `sync/*` مفتوحة (`read: true, write: true`)
- **المشكلة**: أي حد معه رابط Firebase يقدر يقرأ/يكتب
- **الحل المقترح**: إضافة Firebase Auth + `auth.uid != null`
- **الحالة**: ⚠️ لم يُنفذ بعد

### 4. PAT منكشف بالشات
- **الإجراء**: محمد لازم يبدّله من GitHub Settings
- **الحالة**: ⚠️ بانتظار محمد

---

## 📊 الحالة التقنية الحالية (مُتحقّق منها)

### Build
```
✓ Compiled successfully in 51s
Exit code: 0
```

### Lint
```
0 errors, 0 warnings
Exit code: 0
```

### Tests
```
8 suites, 67 passed, 0 failed
Exit code: 0
```

### dev.log
```
ZERO warnings (لا DEP0169، لا middleware deprecated، لا errors)
```

### الأرقام
| المؤشر | القيمة |
|---|---|
| Prisma models | 69 |
| API routes | 76 |
| Section files | 91 (76 أصلي + 15 unified) |
| Sidebar sections | 52 |
| Sidebar groups | 7 |
| Store slices | 15 |
| Test files | 9 |
| Tests | 67 |
| shadcn/ui components | 48 |
| Commits (شغلي) | 15+ |

---

## 🏗️ البنية المعمارية بالتفصيل

### التقنيات
```
Next.js 16.1.3 (App Router, Turbopack)
TypeScript 5 (strict)
Bun (runtime + package manager)
Prisma 6.19 + SQLite
Zustand 5 (15 slice)
Tailwind CSS 4 + shadcn/ui (New York)
Framer Motion 12
Firebase 12 (Realtime Database)
z-ai-web-dev-sdk 0.0.18 (backend only)
bcryptjs 3 + AES-256-GCM (Web Crypto API)
recharts 2.15 (charts)
@dnd-kit (drag & drop)
@mdxeditor/editor (markdown)
react-syntax-highlighter (code blocks)
react-hook-form + zod (forms)
date-fns 4 (dates)
```

### بنية المجلدات
```
src/
├── app/
│   ├── page.tsx              ← الصفحة الوحيدة (1053 سطر)
│   ├── layout.tsx            ← التخطيط العام
│   ├── globals.css           ← الـ styles العامة
│   ├── proxy.ts              ← Middleware (Next.js 16)
│   └── api/                  ← 76 API route
│       ├── auth/             ← setup, verify, status, logout, change-password
│       ├── data/             ← [section] CRUD + init + migrate
│       ├── devices/          ← register, pending, approve, reject, cleanup
│       ├── uploads/          ← chunked uploads + regular
│       ├── sync/             ← pull, pull-images (Firebase)
│       ├── ai-coach/         ← chat, insight, patterns, query
│       ├── ai-chat/          ← quick, sessions
│       ├── backup/           ← create, list, stats, restore, download
│       ├── monitoring/       ← errors (runtime error tracking)
│       ├── integrity/        ← check, fix, auto-check
│       ├── snapshots/        ← create, yearly
│       ├── versions/         ← version history
│       ├── entity/           ← entity card data
│       ├── relations/        ← item relations
│       ├── tags/             ← universal tags
│       ├── trash/            ← soft delete
│       ├── master-password/  ← setup, status, verify
│       ├── login-history/    ← login logs
│       ├── notifications/    ← web push
│       ├── review/           ← daily review
│       ├── activity/         ← activity feed
│       ├── export/           ← all-formats, csv, ical, markdown
│       ├── public/           ← public portfolio API
│       ├── google/           ← Google Calendar OAuth
│       ├── dropbox/          ← Dropbox OAuth
│       ├── github/           ← GitHub sync
│       └── webhooks/         ← Zapier
├── components/
│   ├── sections/             ← 91 ملف (76 قسم + 15 unified)
│   ├── ui/                   ← 48 shadcn/ui component
│   ├── shared/               ← مكوّنات مشتركة (star-rating, etc.)
│   ├── login-screen.tsx
│   ├── toast-container.tsx
│   ├── global-search.tsx
│   ├── quick-capture.tsx
│   ├── loading-bar.tsx
│   ├── connection-status.tsx
│   ├── back-to-top.tsx
│   ├── quick-actions-fab.tsx
│   ├── integrity-scheduler.tsx
│   ├── backup-scheduler.tsx
│   ├── daily-review-modal.tsx
│   ├── firebase-sync-provider.tsx
│   ├── shortcuts-overlay.tsx
│   ├── error-boundary.tsx    ← مع auto-retry
│   ├── error-monitor.tsx     ← runtime error tracking
│   ├── chunked-uploader.tsx
│   ├── attachments-panel.tsx
│   ├── encrypted-attachments-panel.tsx
│   ├── entity-card.tsx
│   ├── wiki-links/           ← MultiWikiLinksRenderer, Editor, Backlinks
│   ├── section-tabs.tsx      ← للدمج بتبويبات
│   └── pwa-register.tsx
├── lib/
│   ├── store/                ← 15 slice
│   │   ├── index.ts          ← combines all slices
│   │   ├── core.ts           ← initialization + data loading
│   │   ├── projects.ts
│   │   ├── tasks.ts
│   │   ├── notes.ts
│   │   ├── vault.ts          ← VaultItem + SecureDocument
│   │   ├── finance.ts
│   │   ├── career.ts         ← jobs, interviews, offers
│   │   ├── university.ts
│   │   ├── goals.ts          ← vision, personal-goals, okrs, decisions, reminders
│   │   ├── health.ts         ← health + medical records
│   │   ├── ai.ts             ← AI conversations + sessions
│   │   ├── devices.ts        ← trusted devices
│   │   ├── integrations.ts   ← GitHub, Google, Dropbox
│   │   ├── sharing.ts        ← sharing + export
│   │   └── misc.ts           ← timeline, archive, trash
│   ├── db.ts                 ← Prisma client (WAL mode)
│   ├── auth.ts               ← client-side auth helpers
│   ├── auth-edge.ts          ← JWT tokens (Edge compatible)
│   ├── auth-server.ts        ← bcrypt + password management
│   ├── encryption.ts         ← AES-256-GCM (client-side, PBKDF2 600k)
│   ├── backup-encryption.ts  ← AES-256-GCM (server-side, PBKDF2 100k)
│   ├── lazy-with-retry.ts    ← ChunkLoadError retry logic
│   ├── wiki-links.ts         ← WikiLinks multi-type
│   ├── ai-service.ts         ← z-ai-web-dev-sdk wrapper
│   ├── rate-limit.ts         ← rate limiting
│   ├── format.ts             ← date/number/currency formatting
│   ├── relations-tags.ts     ← universal relations + tags
│   ├── auto-backup.ts        ← backup creation + restore
│   ├── firebase-sync.ts      ← Firebase sync queue
│   ├── image-sync.ts         ← image sync via Firebase
│   ├── section-registry.tsx  ← section → component mapping
│   └── navigation-context.tsx ← navigation hook
├── hooks/
│   ├── use-mobile.ts
│   ├── use-toast.ts
│   ├── use-debounce.ts
│   └── use-error-monitor.ts  ← runtime error tracking
└── types/
    └── index.ts              ← كل الـ TypeScript types

prisma/
└── schema.prisma             ← 69 model

public/
├── sw.js                     ← Service Worker (offline support)
├── manifest.json             ← PWA manifest
├── offline.html              ← offline fallback
└── icons/                    ← PWA icons

tests/
├── unit/
│   ├── store-slices.test.ts
│   ├── auth-edge.test.ts
│   ├── api-auth.test.ts
│   ├── format.test.ts
│   ├── validators.test.ts
│   ├── rate-limit.test.ts
│   ├── device-fingerprint.test.ts
│   └── empty-state.test.tsx
└── e2e/
    └── app.test.ts           ← Playwright (مستثنى من Jest)

.github/
└── workflows/
    └── ci.yml                ← CI pipeline

scripts/
├── pre-commit.sh             ← secret scan + lint
├── daily-backup.mts          ← standalone backup script
└── reset-password.mts        ← password reset utility

docs/
├── DESIGN_SYSTEM.md          ← design tokens + patterns
├── FIREBASE_SECURITY.md      ← Firebase rules guide
├── BACKUP_AUTOMATION.md      ← backup setup guide
└── WORKSPACE_COMPARISON.md   ← version comparison
```

---

## 📋 كل الأقسام بالتفصيل

### المجموعات الـ 7 + الأقسام

#### 1. (الرئيسية)
- `dashboard` — لوحة تحكم بإحصائيات + تقويم + وسوم + رؤى

#### 2. يومي
- `tasks` — مهام مع Kanban + أولويات + تكرار + مهام فرعية
- `notes` — ملاحظات بألوان + مجلدات + تثبيت + سرية
- `ideas` ← unified-ideas (أفكار عامة + مستقبلية)
- `journal` ← unified-journal (يوميات + تحليل مزاج)
- `habits` — عادات بـ heatmap + سلاسل
- `finance` ← unified-finance (معاملات + تحليلات متقدمة)

#### 3. دراستي
- `university` — فصول + مواد + GPA
- `courses` — مواد الجامعة
- `homework` ← unified-academic (واجبات + درجات متقدمة)
- `library` ← unified-library (مكتبة عامة + أكاديمية + قراءة + وسائط)
- `university-projects` — مشاريع جامعية
- `smart-schedule` — جدول أسبوعي
- `professors` — الدكاترة
- `workhours` — ساعات العمل
- `places` — أماكن
- `scholarship` — منح دراسية
- `tawjihi` — درجات التوجيهي (محفوظة للمراجعة)

#### 4. مهنتي
- `projects` — مشاريع مع progress bar + stats + tasks + related + cover
- `skills` — مهارات مع تطور + أدلة
- `job-applications` ← unified-career (وظائف + مقابلات + عروض)
- `career-plan` — خطة مهنية
- `networking` — علاقات مهنية
- `certificates` — شهادات مع تنبيهات انتهاء
- `experience` — خبرات عملية
- `activities` — تطوع
- `achievements` — إنجازات
- `failures` — إخفاقات + دروس مستفادة
- `languages` — لغات بمستويات CEFR
- `resume` — سيرة ذاتية تلقائية

#### 5. أهدافي
- `vision` ← unified-goals (رؤية + شخصية + OKRs)
- `decision-log` — سجل القرارات
- `time-tracking` — تتبع الوقت
- `smart-reminders` — تذكيرات (يدوي حالياً)

#### 6. ذكاء
- `ai-coach` ← unified-ai (AI Coach + مساعد سريع + Q&A)
- `weekly-reports` — تقارير أسبوعية
- `analytics` — إحصائيات شاملة
- `health-tracker` ← unified-health (صحة + سجلات طبية)
- `timeline` — النشاط

#### 7. النظام
- `vault` — خزنة مشفّرة AES-256-GCM
- `secure-documents` — وثائق حساسة مشفّرة
- `login-history` ← unified-security (سجل دخول + أجهزة موثوقة)
- `archive` ← unified-deleted (أرشيف + سلة مهملات)
- `selective-sharing` ← unified-sharing (مشاركة + Portfolio + QR)
- `selective-export` ← unified-export (تصدير انتقائي + صيغ مفتوحة + LinkedIn)
- `dropbox-backup` ← unified-backup (Dropbox + لقطات سنوية)
- `data-integrity` ← unified-restore (سلامة + استعادة)
- `github-integration` — GitHub sync
- `google-calendar` — Google Calendar sync
- `public-api` — Public API keys
- `advanced-charts` — رسوم بيانية متقدمة
- `settings` — إعدادات + تصدير/استيراد + مسح

---

## 🔬 آلية العمل التقنية

### دورة حياة البيانات
1. المستخدم يفتح الموقع → شاشة تسجيل الدخول
2. بعد الدخول → `GET /api/data/init` يحمّل كل البيانات دفعة واحدة
3. البيانات تُخزّن في Zustand store (15 slice)
4. أي تعديل (إضافة/حذف/تحديث):
   - يُحدّث الـ store فوراً (optimistic)
   - يُرسل طلب API بالخلفية (fire-and-forget)
   - `pushSyncOperation` يرسل لـ Firebase للأجهزة الأخرى
5. `FirebaseSyncProvider` يستمع للتغييرات من أجهزة أخرى

### المصادقة
1. كلمة المرور تُخزّن بـ bcrypt (12 rounds) بـ `AppSetting` table
2. عند الدخول: `POST /api/auth/verify` → bcrypt.compare → HMAC-SHA256 token
3. الـ token يُخزّن بـ httpOnly cookie (30 يوم)
4. كل طلب `/api/*` (ما عدا public routes) يمر بـ `proxy.ts` للتحقق
5. قفل تلقائي بعد 15 دقيقة عدم نشاط

### الـ Proxy (Next.js 16)
- كان `middleware.ts` — تمت ترقيته لـ `proxy.ts`
- يحمي كل `/api/*` ما عدا public routes
- يضيف `Cache-Control: no-cache, no-store, must-revalidate` للصفحات

### الـ ChunkedUpload
- ملفات كبيرة تُقسم لـ chunks (10MB كل واحد)
- init → upload chunks → complete
- يدعم ملفات حتى 10GB
- موجود بـ: tasks, notes, projects, vault

### الـ WikiLinks
- `[[note:عنوان]]` → ربط بملاحظة
- `[[project:عنوان]]` → ربط بمشروع
- `[[idea:عنوان]]` → ربط بفكرة
- `[[task:عنوان]]` → ربط بمهمة
- auto-complete عند كتابة `[[`
- Backlinks + Forward Links

---

## ⚠️ مشاكل معروفة (لكن ما تكسر الموقع)

| # | المشكلة | الأثر | الحل المقترح |
|---|---|---|---|
| 1 | `media.tsx` stub فارغ | ما تقدر ترفع ملفات منفصلة | إعادة بناء كاملة |
| 2 | AI chat ما بينفذ أوامر | AI بيحاكي بس | بناء command engine |
| 3 | ما في Effect Engine | كل أمر = تأثير واحد | بناء multi-effect system |
| 4 | ما في XP system | ما في تحفيز | إضافة XP + levels |
| 5 | smart-reminders يدوي | ما في توليد تلقائي | ربط بـ cron job |
| 6 | ما في daily auto-tasks | ما في مهام تلقائية | بناء auto-generator |
| 7 | Firebase rules مفتوحة | أي حد يقدر يقرأ | Firebase Auth |
| 8 | 8 ملفات blue/indigo | مخالفة design system | استبدال الألوان |
| 9 | LICENSE غير موجود | README بيقول MIT | إضافة ملف |
| 10 | design tokens بالتوثيق فقط | ما مطبّقة بـ CSS | تطبيق بـ globals.css |
| 11 | ما في fuzzy search | بحث بدائي | Levenshtein + مرادفات |
| 12 | ما في export مشروع فردي | ما تقدر تصدر مشروع واحد | إضافة API route |

---

## 🚫 ميزات ادّعاها مطورون سابقون بس **غير موجودة**

| الميزة | الادعاء | الواقع |
|---|---|---|
| AI Guardrails / Proposal system | "40 اختبار Jest يضمنون guardrails" | ❌ غير موجود — grep فارغ |
| Health Score (0-100%) | "8 فحوصات + رقم" | ❌ غير موجود |
| Offline Queue | "طابور عمليات offline" | ❌ غير موجود (cache fallback فقط) |
| Sandbox (SandboxItem) | "صندوق تجارب مستقل" | ❌ غير موجود |
| EntityChangeLog (Git-like) | "diff للحقول" | ❌ غير موجود (VersionHistory موجود بس لنسخ الإصدارات) |
| Feature Flags (25 ميزة) | "Switch لكل ميزة" | ❌ غير موجود |
| 146 اختبار | "146 اختبار Jest" | ❌ الواقع: 67 فقط |
| Migration Assistant | "تصدير/استيراد كامل" | ❌ ميزة CRUD عادية فقط |

---

## 📦 الـ Commits الرئيسية (شغلي)

| Commit | التاريخ | الوصف |
|---|---|---|
| `529e647` | قبل استلامي | النسخة اللي استلمتها |
| `352e5b5` | Layer 1 | أمان + بيانات (Firebase rules + نسخ احتياطي) |
| `74fa66b` | Layer 2 | استقرار (ChunkLoadError + proxy + lint) |
| `f6f9fb8` | Layer 3 | جودة (67 test + DialogDescription + PWA) |
| `bbf67a1` | Layer 4 | تحسينات (CI + hooks + monitoring) |
| `9174433` | Redesign Phase 0+1a | Design system + sidebar left (تم إرجاعه) |
| `4f19eaf` | Revert | إرجاع التصميم الأصلي |
| `eca4eac` | Merge | دمج شامل + إضافة مخفي (77 → 52 قسم) |
| `de380ee` | Projects | إكمال قسم المشاريع (progress + stats + tasks) |
| `487a7c1` | HMR fix | إزالة unused imports |
| `eef50d7` | Cache fix | cache-busting headers |
| `c1cf34b` | Audit | ملف فحص شامل |
| `a9d3c0f` | Purpose | ملف أسباب بناء المشروع |

---

## 🎯 الخطة القادمة (8 مراحل)

### المرحلة 1: تخزين الـ 50GB (الأولوية القصوى)
- إعادة بناء `media.tsx` كاملة
- رفع جماعي (drag & drop)
- تنظيم بمجلدات + تصنيفات
- معاينة فيديو/صورة/كود
- ربط كل ملف بقسم

### المرحلة 2: AI Command Engine + Effect Engine
- بناء `src/lib/command-engine.ts`
- بناء `src/lib/effect-engine.ts`
- أوامر: record_study, complete_task, add_transaction, record_health, update_skill
- كل أمر → تسجيل + XP + تتابع + مهارة + سجل

### المرحلة 3: XP System + Achievements
- إضافة XP و level للـ user model
- XP من كل فعل
- 8 إنجازات قابلة للفتح
- شريط تقدم للمستوى

### المرحلة 4: Smart Reminders + Daily Auto-Tasks
- توليد 3 مهام يومية تلقائية
- تنبيهات ذكية
- ربط بـ web push notifications

### المرحلة 5: البحث الشامل المحسّن
- fuzzy search (Levenshtein)
- تطبيع عربي
- مرادفات (35+)
- بحث في الوسوم + الملفات

### المرحلة 6: تصدير + مشاركة
- تصدير مشروع فردي (PDF/Markdown)
- portfolio عام
- QR codes

### المرحلة 7: Firebase Auth + قواعد آمنة
- Firebase Email/Password Auth
- قواعد `auth.uid != null`
- إزالة `read: true` المفتوحة

### المرحلة 8: التحسينات النهائية
- استبدال blue/indigo
- تطبيق design tokens
- إضافة LICENSE
- mobile responsiveness
- performance optimization

---

## ⚠️ إرشادات للمشرف

### عند مراجعة أي عمل قادم:
1. **تحقق من Build**: `bun run build` لازم exit 0
2. **تحقق من Lint**: `bun run lint` لازم 0 errors
3. **تحقق من Tests**: `bun run jest` لازم كلها pass
4. **تحقق من Agent Browser**: الموقع لازم يفتح + login + تنقل بدون أخطاء
5. **تحقق من dev.log**: ZERO warnings
6. **تحقق من secrets**: `git diff --cached | grep -iE "password|secret|token"` لازم فارغ
7. **تحقق من GitHub**: آخر commit مرفوع

### علامات إنذار (إذا ظهرت = خطأ):
- `ChunkLoadError` — لازم 0
- `module factory is not available` — HMR مشكلة
- `MIMO_SESSION_SECRET not set` — `.env` ناقص
- `blue-` أو `indigo-` بـ classes — مخالفة design system
- hardcoded secrets — خطر أمني
- claims بدون grep proof — ادعاءات فارغة

### مبادئ العمل المطلوبة من أي مطور:
1. **لا تخترع مشاكل** — فحص فعلي قبل أي كلام
2. **لا حلول سطحية** — حل جذري دائماً
3. **اختبار بعد كل خطوة** — Agent Browser إجباري
4. **رفع لـ GitHub** بعد كل مهمة ناجحة
5. **لا كسر ما يعمل** — preserve working features
6. **دقة على السرعة** — جودة على الوقت
7. **صدق مع المستخدم** — لا ادعاءات بدون دليل

---

## 📞 معلومات الاتصال بالريبو

```
GitHub: https://github.com/mohammadfhgjvhgi/x7k2m9p3
Clone:  git clone https://github.com/mohammadfhgjvhgi/x7k2m9p3.git
ZIP:    https://github.com/mohammadfhgjvhgi/x7k2m9p3/raw/main/download/mimo-life-os.zip
Audit:  https://github.com/mohammadfhgjvhgi/x7k2m9p3/blob/main/AUDIT_WORKSPACE.md
Purpose: https://github.com/mohammadfhgjvhgi/x7k2m9p3/blob/main/PROJECT_PURPOSE.md
```

---

*هذا الملف يجمع كل المعلومات غير الموجودة بالملفين السابقين. للمشرف: اقرأ هذا الملف + AUDIT_WORKSPACE.md + PROJECT_PURPOSE.md لفهم كامل للمشروع.*
