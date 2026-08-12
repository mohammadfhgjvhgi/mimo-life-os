# دليل شامل لملفات مشروع LMS (Learning Management System)

## 📁 نظرة عامة على المشروع

مشروع **نظام إدارة التعلم (LMS)** متخصص في مادة "تكنولوجيا المباني الذكية" للصف الثاني عشر الصناعي (التوجيهي).

---

## 🏗️ هيكل المشروع الرئيسي

```
b_hz1bFlVx4h9-1772486888215/
├── .env                              # متغيرات البيئة (API Keys)
├── .gitignore                        # ملفات مستبعدة من Git
├── package.json                      # اعتماديات المشروع
├── tsconfig.json                     # إعدادات TypeScript
├── next.config.mjs                   # إعدادات Next.js
├── middleware.ts                     # middleware للمصادقة
│
├── app/                              # تطبيق Next.js الرئيسي
│   ├── api/chat/route.ts            # 🤖 API المساعد الذكي (Groq AI)
│   ├── globals.css                  # أنماط CSS العامة
│   ├── layout.tsx                   # تخطيط التطبيق الرئيسي
│   ├── lms-home.tsx                 # 🏠 الصفحة الرئيسية للـ LMS
│   └── page.tsx                     # الصفحة الرئيسية (Entry Point)
│
├── components/                       # مكونات React (88 مكون)
│   ├── ai-chatbot.tsx               # 🤖 المساعد الذكي (مُحدَّث)
│   ├── login-screen.tsx             # شاشة تسجيل الدخول الرئيسية
│   ├── login-screen2.tsx            # شاشة تسجيل دخول ثانوية
│   ├── header.tsx                   # رأس الصفحة والتنقل
│   ├── lms-home.tsx                 # 🏠 واجهة LMS الرئيسية
│   ├── my-students.tsx              # 👥 إدارة الطلاب
│   ├── gradebook.tsx                # 📊 دفتر الدرجات
│   ├── attendance.tsx               # 📋 الحضور والغياب
│   ├── about-page.tsx               # ℹ️ صفحة عن المنصة
│   ├── hero-section.tsx             # 🦸 القسم الرئيسي
│   ├── unit-section.tsx             # 📚 عرض الوحدات الدراسية
│   ├── terminology-hub.tsx          # 📖 مصطلحات المادة
│   ├── questions-bank.tsx           # 📝 بنك الأسئلة
│   ├── advanced-quiz-system.tsx     # 🎯 نظام الاختبارات المتقدم
│   ├── review-mode.tsx              # 🔄 وضع المراجعة
│   ├── learning-companion.tsx       # 👤 المرافق الذكي للتعلم
│   ├── search-results.tsx           # 🔍 نتائج البحث
│   ├── notification.tsx               # 🔔 الإشعارات
│   ├── admin-panel.tsx              # ⚙️ لوحة تحكم المشرف
│   ├── developer-dashboard.tsx        # 👨‍💻 لوحة المطور
│   ├── role-switcher-modal.tsx      # 🔄 مبدّل الأدوار
│   ├── simple-student-engineer-chat.tsx # 💬 دردشة الطالب-المهندس
│   ├── usage-policy.tsx             # 📋 سياسة الاستخدام
│   ├── data-table.tsx               # 📊 جدول البيانات
│   ├── theme-provider.tsx           # 🎨 موفر الثيم
│   │
│   ├── communication/               # 💬 مكونات التواصل
│   │   └── threaded-chat.tsx        # دردشة مترابطة
│   │
│   ├── content/                     # 📚 مكونات المحتوى
│   │   └── page-content.tsx         # محتوى الصفحة
│   │
│   ├── dashboards/                  # 📊 لوحات التحكم
│   │   ├── student-dashboard.tsx    # لوحة الطالب
│   │   ├── teacher-dashboard.tsx    # لوحة المعلم
│   │   └── ministry-dashboard.tsx   # لوحة الوزارة
│   │
│   ├── mobile/                      # 📱 مكونات الجوال
│   │   └── mobile-components.tsx    # مكونات الجوال
│   │
│   ├── notifications/               # 🔔 مكونات الإشعارات
│   │   └── notifications-dropdown.tsx # قائمة الإشعارات
│   │
│   └── ui/                          # 🎨 مكونات UI (57 مكون)
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── breadcrumb.tsx
│       ├── button.tsx
│       ├── calendar.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── chart.tsx
│       ├── checkbox.tsx
│       ├── collapsible.tsx
│       ├── command.tsx
│       ├── context-menu.tsx
│       ├── dialog.tsx
│       ├── drawer.tsx
│       ├── dropdown-menu.tsx
│       ├── form.tsx
│       ├── hover-card.tsx
│       ├── input.tsx
│       ├── input-otp.tsx
│       ├── label.tsx
│       ├── menubar.tsx
│       ├── navigation-menu.tsx
│       ├── pagination.tsx
│       ├── popover.tsx
│       ├── progress.tsx
│       ├── radio-group.tsx
│       ├── resizable.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── separator.tsx
│       ├── sheet.tsx
│       ├── sidebar.tsx
│       ├── skeleton.tsx
│       ├── slider.tsx
│       ├── sonner.tsx
│       ├── switch.tsx
│       ├── table.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       ├── toaster.tsx
│       ├── toggle.tsx
│       ├── toggle-group.tsx
│       ├── tooltip.tsx
│       └── use-toast.ts
│
├── lib/                             # 📚 المكتبات والوظائف المساعدة
│   ├── utils.ts                     # وظائف مساعدة (cn, formatDate)
│   ├── types.ts                     # أنواع TypeScript
│   ├── auth-context.tsx             # سياق المصادقة
│   ├── multi-tenant-context.tsx     # سياق المتعدد المستأجرين
│   ├── mock-data.ts                 # بيانات تجريبية
│   ├── data.ts                      # إدارة البيانات
│   ├── database.ts                  # قاعدة البيانات
│   ├── db.ts                        # ORM/Prisma
│   ├── use-database.ts              # hook لقاعدة البيانات
│   ├── ai.ts                        # 🤖 إعدادات AI (Groq)
│   └── activity-log.ts              # سجل النشاطات
│
├── hooks/                           # 🪝 React Hooks
│   ├── use-mobile.ts                # كشف الجوال
│   └── use-toast.ts                 # إدارة Toast notifications
│
├── data/                            # 💾 قاعدة البيانات
│   └── lms.db                       # ملف SQLite
│
└── scripts/                         # 📜 سكريبتات
    ├── seed-localstorage.js         # تهيئة LocalStorage
    ├── rbac-smoke-test.js           # اختبار RBAC
    ├── ai-smoke-test.js             # اختبار AI
    ├── ai-smoke-quiz.json           # أسئلة اختبار AI
    ├── extract_lessons_and_images.js # استخراج الدروس
    ├── extract_concepts.js          # استخراج المفاهيم
    ├── extracted_lessons.json       # الدروس المستخرجة
    ├── extracted_concepts.json      # المفاهيم المستخرجة
    ├── processed_questions.json     # الأسئلة المعالجة
    ├── print-sessions.js            # طباعة الجلسات
    └── inspect-file-bytes.js        # فحص الملفات

```

---

## 🔧 ملفات الإعداد والتهيئة

### 1. `package.json`
**الغرض**: إدارة اعتماديات المشروع
**المكتبات الرئيسية**:
- `next`: إطار عمل React
- `react` & `react-dom`: مكتبة React
- `typescript`: لغة البرمجة
- `tailwindcss`: إطار CSS
- `@ai-sdk/groq`: SDK للـ Groq AI
- `ai`: مكتبة Vercel AI
- `lucide-react`: أيقونات
- `@radix-ui/*`: مكونات UI أساسية
- `zustand`: إدارة الحالة
- `better-sqlite3`: قاعدة بيانات SQLite

### 2. `tsconfig.json`
**الغرض**: إعدادات TypeScript
- compiler options
- paths mapping
- module resolution

### 3. `next.config.mjs`
**الغرض**: إعدادات Next.js
- output: 'standalone'
- distDir: '.next'

### 4. `middleware.ts`
**الغرض**: Middleware للمصادقة والأمان
- حماية المسارات
- التحقق من الجلسات
- إعادة التوجيه

### 5. `.env`
**الغرض**: متغيرات البيئة
```
GROQ_API_KEY=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
```

---

## 📱 تطبيق Next.js (مجلد `app/`)

### 1. `layout.tsx`
**الغرض**: التخطيط الرئيسي للتطبيق
- ThemeProvider
- Header
- Toaster
- Children wrapper

### 2. `page.tsx`
**الغرض**: الصفحة الرئيسية (Entry Point)
- التحقق من المستخدم
- عرض شاشة تسجيل الدخول أو LMS Home
- إدارة الحالة

### 3. `lms-home.tsx`
**الغرض**: 🏠 الواجهة الرئيسية للـ LMS
- عرض المحتوى حسب الدور
- Quick Actions
- الأقسام الرئيسية
- المكونات الديناميكية

### 4. `globals.css`
**الغرض**: أنماط CSS العامة
- Tailwind directives
- Custom CSS variables
- RTL support

### 5. `api/chat/route.ts` 🤖
**الغرض**: API المساعد الذكي
**المحرك**: Groq API (Llama 3.1 8B)
**الميزات**:
- الردود المؤكدة فقط
- تحليل الصور
- البحث عن الأسئلة المعقدة
- نظام Fallback محلي
- 13 موضوع في Knowledge Base

---

## 🧩 المكونات الرئيسية (مجلد `components/`)

### 1. `ai-chatbot.tsx` 🤖 (مُحدَّث)
**الغرض**: المساعد الذكي
**الميزات الجديدة**:
- Groq API (بدلاً من OpenAI)
- رفع الصور للتحليل 📎
- سجل المحادثات ⏱️
- حذف المحادثات 🗑️
- حفظ تلقائي في LocalStorage

### 2. `login-screen.tsx`
**الغرض**: شاشة تسجيل الدخول الرئيسية
**العناصر**:
- نموذج تسجيل الدخول
- اختيار الدور
- صور متحركة
- رسائل خطأ

### 3. `header.tsx`
**الغرض**: رأس الصفحة والتنقل
**العناصر**:
- شعار المنصة
- قائمة التنقل
- الإشعارات
- المستخدم
- مبدّل الأدوار

### 4. `my-students.tsx`
**الغرض**: إدارة الطلاب
**العناصر**:
- قائمة الطلاب
- إضافة طالب جديد
- إحصائيات

### 5. `gradebook.tsx`
**الغرض**: 📊 دفتر الدرجات
**العناصر**:
- جدول الدرجات
- إضافة درجات
- حساب المعدلات
- تصدير

### 6. `attendance.tsx`
**الغرض**: 📋 الحضور والغياب
**العناصر**:
- تسجيل الحضور
- إحصائيات
- تقارير

### 7. `terminology-hub.tsx`
**الغرض**: 📖 مصطلحات المادة
**العناصر**:
- قائمة المصطلحات
- البحث
- الفئات
- التفاصيل

### 8. `questions-bank.tsx`
**الغرض**: 📝 بنك الأسئلة
**العناصر**:
- تصفح الأسئلة
- البحث
- التصنيفات
- الصور

### 9. `advanced-quiz-system.tsx`
**الغرض**: 🎯 نظام الاختبارات المتقدم
**العناصر**:
- أنواع الأسئلة
- الاختبارات التفاعلية
- التقييم التلقائي
- النتائج

### 10. `review-mode.tsx`
**الغرض**: 🔄 وضع المراجعة
**العناصر**:
- مراجعة سريعة
- Flashcards
- اختبار ذاتي

### 11. `learning-companion.tsx`
**الغرض**: 👤 المرافق الذكي للتعلم
**العناصر**:
- تتبع التقدم
- توصيات
- دعم تعلمي

### 12. `unit-section.tsx`
**الغرض**: 📚 عرض الوحدات الدراسية
**العناصر**:
- بطاقات الوحدات
- الدروس
- التقدم
- الاختبارات

### 13. `search-results.tsx`
**الغرض**: 🔍 نتائج البحث
**العناصر**:
- شريط البحث
- الفلاتر
- النتائج
- الفئات

### 14. `admin-panel.tsx`
**الغرض**: ⚙️ لوحة تحكم المشرف
**العناصر**:
- إدارة المستخدمين
- الإعدادات
- التقارير
- النسخ الاحتياطي

### 15. `simple-student-engineer-chat.tsx`
**الغرض**: 💬 دردشة الطالب-المهندس
**العناصر**:
- واجهة الدردشة
- الرسائل
- المهندسون

### 16. `role-switcher-modal.tsx`
**الغرض**: 🔄 مبدّل الأدوار
**العناصر**:
- اختيار الدور
- الصلاحيات
- التبديل السريع

### 17. `notification.tsx`
**الغرض**: 🔔 الإشعارات
**العناصر**: Badge, قائمة منسدلة

### 18. `usage-policy.tsx`
**الغرض**: 📋 سياسة الاستخدام
**العناصر**: شروط الاستخدام, قبول/رفض

---

## 📚 المكتبات والوظائف المساعدة (مجلد `lib/`)

### 1. `utils.ts`
**الغرض**: وظائف مساعدة عامة
**الدوال**:
- `cn()`: دمج classes
- `formatDate()`: تنسيق التاريخ
- `formatRelativeTime()`: الوقت النسبي

### 2. `types.ts`
**الغرض**: أنواع TypeScript
**الأنواع**:
- `User`: بيانات المستخدم
- `Lesson`: الدرس
- `Unit`: الوحدة
- `Question`: السؤال
- `Quiz`: الاختبار
- `Notification`: الإشعار
- `ChatMessage`: رسالة الدردشة

### 3. `auth-context.tsx`
**الغرض**: سياق المصادقة
**الميزات**:
- تسجيل الدخول
- تسجيل الخروج
- التحقق من الدور
- حالة المستخدم

### 4. `mock-data.ts`
**الغرض**: بيانات تجريبية
**البيانات**:
- المستخدمون
- الوحدات
- الدروس
- الأسئلة
- المصطلحات

### 5. `data.ts`
**الغرض**: إدارة البيانات
**الوظائف**:
- CRUD operations
- التخزين المحلي
- التزامن

### 6. `database.ts`
**الغرض**: قاعدة البيانات
**الميزات**:
- SQLite
- الجداول
- الاستعلامات

### 7. `ai.ts`
**الغرض**: 🤖 إعدادات AI (Groq)
**الميزات**:
- إعداد Groq client
- System prompts
- Models

### 8. `activity-log.ts`
**الغرض**: سجل النشاطات
**الميزات**:
- تتبع الأحداث
- التقارير
- التحليلات

---

## 🎨 مكونات UI (مجلد `components/ui/`)

57 مكون من `shadcn/ui`:
- **الإدخال**: `input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`, `radio-group.tsx`, `switch.tsx`
- **الأزرار**: `button.tsx`, `toggle.tsx`, `toggle-group.tsx`
- **القوائم**: `dropdown-menu.tsx`, `context-menu.tsx`, `menubar.tsx`, `navigation-menu.tsx`
- **النوافذ**: `dialog.tsx`, `alert-dialog.tsx`, `popover.tsx`, `tooltip.tsx`, `hover-card.tsx`
- **العرض**: `card.tsx`, `badge.tsx`, `avatar.tsx`, `separator.tsx`, `skeleton.tsx`
- **النماذج**: `form.tsx`, `label.tsx`, `input-otp.tsx`
- **التنقل**: `tabs.tsx`, `accordion.tsx`, `breadcrumb.tsx`, `pagination.tsx`
- **الأقسام**: `collapsible.tsx`, `scroll-area.tsx`, `resizable.tsx`, `sheet.tsx`, `sidebar.tsx`
- **الإشعارات**: `toast.tsx`, `toaster.tsx`, `sonner.tsx`, `alert.tsx`
- **التحديد**: `calendar.tsx`, `slider.tsx`, `progress.tsx`
- **متقدم**: `carousel.tsx`, `chart.tsx`, `command.tsx`, `drawer.tsx`
- **الجداول**: `table.tsx`

---

## 📜 السكريبتات (مجلد `scripts/`)

### 1. `seed-localstorage.js`
**الغرض**: تهيئة LocalStorage بالبيانات الأولية

### 2. `ai-smoke-test.js`
**الغرض**: اختبار AI Smoke

### 3. `rbac-smoke-test.js`
**الغرض**: اختبار Role-Based Access Control

### 4. `extract_lessons_and_images.js`
**الغرض**: استخراج الدروس والصور من ملفات PDF

### 5. `extract_concepts.js`
**الغرض**: استخراج المفاهيم التقنية

---

## 🗂️ قاعدة البيانات (مجلد `data/`)

### `lms.db`
**النوع**: SQLite
**الجداول**:
- users
- lessons
- questions
- quizzes
- grades
- attendance
- notifications
- chat_messages

---

## 📄 ملفات التوثيق

### 1. `LMS_README.md`
**الغرض**: دليل المستخدم العام

### 2. `PROJECT_STRUCTURE.md`
**الغرض**: هيكل المشروع التفصيلي

### 3. `ARCHITECTURE.md`
**الغرض**: معمارية النظام

### 4. `BUILD_SUMMARY.md`
**الغرض**: ملخص البناء والنشر

### 5. `INTEGRATION_GUIDE.md`
**الغرض**: دليل التكامل

### 6. `AI_CHATBOT_SETUP.md`
**الغرض**: إعدادات المساعد الذكي (مُنشأ حديثاً)

---

## 🎯 الأدوار المدعومة

| الدور | الوصف | المكونات الرئيسية |
|-------|-------|------------------|
| **student** | طالب | student-dashboard, unit-section, ai-chatbot |
| **teacher** | معلم | teacher-dashboard, my-students, gradebook |
| **school_admin** | إدارة مدرسة | admin-panel, dashboards |
| **ministry_admin** | إدارة وزارة | ministry-dashboard |
| **developer** | مطور | developer-dashboard |
| **engineer** | مهندس | chat, terminology-hub |
| **parent** | ولي أمر | محدود (متابعة) |

---

## 🔐 نظام المصادقة

### Auth Context (`lib/auth-context.tsx`)
**الميزات**:
- JWT tokens
- Role-based access
- Session management
- Login/Logout

### Middleware (`middleware.ts`)
**الحماية**:
- Route protection
- Role verification
- Session validation

---

## 🤖 المساعد الذكي (الجديد)

### الملفات المعنية:
- `app/api/chat/route.ts` - API
- `components/ai-chatbot.tsx` - UI
- `.env` - API Key

### الميزات:
- Groq API (Llama 3.1 8B)
- صور 📎
- سجل محادثات ⏱️
- حذف 🗑️
- دقة مؤكدة ✅

---

## 📊 إحصائيات المشروع

| الفئة | العدد |
|-------|-------|
| إجمالي الملفات | 150+ |
| مكونات React | 88 |
| مكونات UI | 57 |
| ملفات `lib/` | 11 |
| ملفات `hooks/` | 2 |
| السكريبتات | 11 |
| صفحات التطبيق | 5 |

---

## 🚀 كيفية البدء

### 1. تثبيت الاعتماديات
```bash
npm install
# أو
pnpm install
```

### 2. إعداد البيئة
```bash
# .env
GROQ_API_KEY=your_key_here
```

### 3. تشغيل التطوير
```bash
npm run dev
```

### 4. البناء للإنتاج
```bash
npm run build
```

---

## 🔧 التحديثات الأخيرة (3 مارس 2025)

### 1. AI Chatbot Upgrade
- ✅ التحويل من OpenAI إلى Groq
- ✅ إضافة دعم الصور
- ✅ إضافة سجل المحادثات
- ✅ إضافة زر الحذف
- ✅ تحسين دقة الإجابات

### 2. System Prompts
- ✅ قواعد صارمة للدقة
- ✅ منع الإجابات الخاطئة
- ✅ تحديد المواضيع المسموح بها

### 3. Knowledge Base
- ✅ 13 موضوع رئيسي
- ✅ إجابات مؤكدة للامتحان
- ✅ مصطلحات فنية

---

## 📞 الدعم والمساعدة

- **المساعد الذكي**: اضغط 🤖 في الواجهة
- **الدردشة**: تواصل مع المهندس
- **الإشعارات**: تحقق من 🔔
- **الإعدادات**: لوحة التحكم ⚙️

---

**تم التحديث**: 3 مارس 2025
**الإصدار**: 1.0
**المطور**: Cascade AI Assistant
