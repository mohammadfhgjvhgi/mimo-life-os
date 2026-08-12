# 📘 دليل المطور الشامل — Smart Systems Lab (IoT Portfolio)

> **المرجعة:** v2.0 — يناير 2025  
> **المستهدف:** المطور الرئيسي للمشروع  
> **طبيعة المستند:** عربية/إنجليزية  
> **التحديث الأخير:** تاريخ آخر تحديث للكود

---

## 📑 جدول المحتويات

1. [نظرة عامة على المشروع](#1-نظرة-عامة-على-المشروع)
2. [الهيكل التقني والبنية](#2-الهيكل-التقني-والبنية)
3. [التقنيات والمكتبات المستخدمة](#3-التقنيات-والمكتبات-المستخدمة)
4. [التكوين والنشر](#4-التكوين-والنشر)
5. [التصميم والأنماط (UI/UX)](#5-التصميم-وأنماط)
6. [قائمة المكونات التفصيلية](#6-قائمة-المكونات-التفصيلية)
7. [إدارة الحالة واللغة (State Management)](#7-إدارة-الحالة-واللغة)
8. [قاعدة البيانات (Prisma)](#8-قاعدة-البيانات-prisma)
9. [الذكاء الاصطناعي (ChatBot)](#9-الذكاء-الاصطناعي-chatbot)
10. [الأمان والحماية](#10-الأمان-والحماية)
11. [النشر والتحسينات](#11-النشر-والتحسينات)
12. [متغيرات البيئة](#12-متغيرات-البيئة)
13. [المشاكل الشائعة والحلول](#13-المشاكل-الشائعة-والحلول)
14. [خريطة طريق التطوير المستقبلية](#14-خريطة-طريق-التطوير-المستقبلية)
15. [الجهات الخارجية والروابط](#15-الجهات-الخارجية-والروابط)

---

## 1. نظرة عامة على المشروع

### 1.1 ما هو المشروع؟

**مشاريع للأنظمة الذكية** (Smart Systems Lab) هو موقع إلكتروني بورتفوليو احترافي لفريق هندسي من فلسطين يعمل في مجال إنترنت الأشياء (IoT) والأتمتة الذكية. الموقع يعرض:

- **4 مشاريع IoT حقيقية** منفذة بأنظمة متعددة المعالجات
- **6 خدمات** رئيسية يقدمها الفريق
- **نظام ثنائي اللغة** (العربية والإنجليزية) مع دعم كامل لـ RTL
- **دردشة ذكية** بوضعين: محلي (FAQ) + ذكاء اصطناعي (NVIDIA NIM)
- **تقرير أمان** شامل مع نتيجة 92/100
- **مدونة تقنية** مع مقالات مفصلة

### 1.2 فريق العمل

| الاسم | الدور | المسؤولية |
|------|------|----------|
| **عمار مشارقة** (Ammar Masharqa) | مؤسس ومدير العمليات | الإدارة، التواصل مع العملاء، التنسيق اللوجستي |
| **محمد عقيلي** (Mohammad Aqli) | المؤسس والمهندس الرئيسي | تصميم الأنظمة المدمجة، البرمجة، التركيب، معمارية الأنظمة |

### 1.3 الرابط المباشر

- **GitHub Pages:** `https://mohammadfhgjvhgi.github.io/iot-portfolio/`
- **basePath في الإنتاج:** `/iot-portfolio`

### 1.4 الإحصائيات الحالية

| المقياس | القيمة |
|--------|--------|
| المشاريع المنفذة | 4+ |
| ساعات العمل | 100+ |
| المشاكل المُحلّة | 20+ |
| أعضاء المجتمع | 800+ |
| نتيجة الأمان | 92/100 |
| مكونات الصفحة | 20+ |
| واجهات المستخدم UI | 40+ |
| مكونات shadcn/ui | 55+ |

---

## 2. الهيكل التقني والبنية

### 2.1 بنية المجلدات

```
iot-portfolio/
├── .env.example              # متغيرات البيئة النموذجية
├── agent-ctx/                # سياق العمل (للعوامل)
├── db/                      # مجلد قاعدة البيانات SQLite
├── docs/                     # 🔥 مخرجات البناء (GitHub Pages)
├── docs/                    # ملفات ثابتة مُصدّرة
│   ├── images/               # صور المشروع
│   └── _next/                # أصول Next.js
├── docs/404/                 # صفحة 404
├── mini-services/            # الخدمات المصغرة (مثل websocket)
├── prisma/
│   └── schema.prisma           # مخطط قاعدة البيانات
├── public/
│   ├── images/               # صور (logo, hero-banner, sensors, wiring, etc.)
│   ├── logo.svg
│   ├── robots.txt
│   └── sw.js                 # Service Worker
├── src/
│   ├── app/
│   │   ├── globals.css          # 🔥 الأنماط العامة + التأثيرات
│   │   ├── layout.tsx          # التخطيط الرئيسي (خط IBM Plex Arabic، SEO)
│   │   ├── page.tsx            # 🔥🔥 الصفحة الرئيسية (الصفحة واحدة)
│   │   ├── manifest.ts         # PWA manifest
│   │   ├── sitemap.ts          # خريطة الموقع SEO
│   │   └── not-found.tsx       # صفحة 404
│   ├── components/
│   │   ├── chat/
│   │   │   └── ChatBot.tsx      # 🔥 الدردشة الذكية (FAQ + NVIDIA AI)
│   │   ├── portfolio/             # 🔥 مكونات المحتوى الرئيسية
│   │   │   ├── BreadcrumbNav.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── ContactForm.tsx
│   │   │   ├── DynamicElementsSection.tsx
│   │   │   ├── ESP32Simulator.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── GroupsLinksSection.tsx
│   │   │   ├── LatestAdditionsSection.tsx
│   │   │   ├── LiveActivitySection.tsx
│   │   │   ├── ProjectCalculator.tsx
│   │   │   ├── ProjectsShowcase.tsx  # 🔥 أكبر مكون (4 مشاريع كاملة)
│   │   │   ├── ResourceLibrarySection.tsx
│   │   │   ├── SearchDialog.tsx
   │   │   ├── SecurityAudit.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── SkillsMatrix.tsx
│   │   │   ├── StartHereSection.tsx
│   │   │   ├── TeamSection.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Timeline.tsx
│   │   ├── platform/              # مكونات إضافية (غير مفعّلة حالياً)
│   │   │   ├── AboutPage.tsx
│   │   │   ├── AnimatedBackground.tsx
│   │   │   ├── CalculatorPage.tsx
│   │   │   ├── EnvironmentsPage.tsx
│   │   │   ├── HomePage.tsx
│   │   │   ├── LearningPathPage.tsx
│   │   │   ├── MonetizationPage.tsx
│   │   │   ├── ProjectsPage.tsx
│   │   │   ├── SensorsPage.tsx
│   │   ├── ServiceWorkerRegistrar.tsx
│   │   └── ui/                  # 🔥 مكونات shadcn/ui (55+ مكون)
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── aspect-ratio.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── calendar.tsx
│   │       ├── card.tsx
│   │       ├── carousel.tsx
│   │       ├── chart.tsx
│   │       ├── checkbox.tsx
│   │       ├── collapsible.tsx
│   │       ├── command.tsx
│   │       ├── context-menu.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── drawer.tsx
│   │       ├── form.tsx
│   │       ├── hover-card.tsx
│   │       ├── input-otp.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── menubar.tsx
│   │       ├── navigation-menu.tsx
│ │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│ │       ├── resizable.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── sidebar.tsx
│   │       ├── skeleton.tsx
│ │       ├── slider.tsx
│   │       ├── sonner.tsx
│ │       ├── switch.tsx
│ │       ├── table.tsx
│ │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toaster.tsx
│   │       ├── toggle.tsx
│   │       ├── toggle-group.tsx
│ │       └── tooltip.tsx
│   ├── data/
│   │   ├── blog-posts.ts         # بيانات المدونة
│   │   ├── calculator-recommendations.json
│   │   └── faq.json           # بيانات الشات (18 سؤال)
│   ├── hooks/
│   │   ├── use-toast.ts
│   │   └── use-mobile.ts
│   └── lib/
│       ├── db.ts              # عميل Prisma
│       ├── language.ts         # 🔥 إدارة اللغة (Zustand)
│       └── utils.ts           # أدوات مساعدة (cn, etc.)
├── Caddyfile                  # إعدادات البوابة (Port 81)
├── components.json            # إعدادات shadcn/ui
├── eslint.config.mjs
├── next.config.ts             # 🔥 تكوين Next.js (dev vs prod)
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts          # إعدادات Tailwind CSS (موروث)
├── tsconfig.json
└── worklog.md               # سجل العمل
```

### 2.2 البنية المعمارية

```
┌──────────────────────────────────────────────────┐
│                   Caddy Gateway (:81)                  │
│  (Port forwarding via XTransformPort query)              │
└────────────────────┬─────────────────────────────┘
                     │
          ┌────────▼──────────┐
          │  Next.js (:3000)    │
          │                    │
          │  ┌──────────────┐  │
          │  │ page.tsx    │  │  ← صفحة واحدة تحتوي كل شيء
          │  │             │  │
          │  │  Components │  │
          │  │  ┌────────┐ │  │
          │  │  │portfolio│ │  │
          │  │  │chat    │ │  │
          │  │  │ui/     │ │  │
          │  │  └────────┘ │  │
          │  └──────────────┘  │
          │                    │
          │  ┌──────────────┐  │
          │  │ State/Store  │  │  ← Zustand (language)
          │  └──────────────┘  │
          │                    │
          │  ┌──────────────┐  │
          │  │  Data Files   │  │  ← faq.json, blog-posts.ts, etc.
          │  └──────────────┘  │
          └────────────────────┘
                     │
          ┌────────▼──────────┐
          │  External APIs     │
          │  ┌────────────┐  │
          │  │ NVIDIA NIM   │  │
          │  │ (LLM Chat) │  │
          │  └────────────┘  │
          │  ┌────────────┐  │
          │  │ Formspree    │  │
          │  │ (Contact)   │  │
          │  └────────────┘  │
          │  ┌────────────┐  │
          │  │ Plausible   │  │
          │  │ (Analytics) │  │
          │  └────────────┘  │
          └──────────────────┘
```

### 2.3 خريطة الأقسام (Scroll Spy)

الموقع صفحة واحدة (SPA) مع أقسام مرقصة عبر `id`:

| القسم | ID | المكون |
|-------|----|--------|
| الرئيسية | `#hero` | مدمج في page.tsx |
| ابدأ من هنا | `#start-here` | StartHereSection |
| الفريق | `#team` | TeamSection |
| لماذا نحن مختلفون | `#about` | WhyUsSection |
| الخدمات | `#services` | ServicesSection |
| الموارد | `#resources` | ResourceLibrarySection |
| المشاريع | `#projects` | ProjectsShowcase |
| المجتمعات | `#groups` | GroupsLinksSection |
| الأسئلة الشائعة | `#faq` | FAQSection |
| تواصل | `#contact` | ContactSection |

---

## 3. التقنيات والمكتبات المستخدمة

### 3.1 الحزمة التقنية

| التقنية | الإصدار | الاستخدام |
|---------|--------|----------|
| **Next.js** | 16.1.1 | إطار العمل الرئيسي (App Router) |
| **React** | 19.0 | مكتبة واجهة المستخدم |
| **TypeScript** | 5 | لغة البرمجة |
| **Tailwind CSS** | 4 | إطار الأنماط |
| **Framer Motion** | 12.23.2 | الرسوم والانتقالات |
| **Zustand** | 5.0.6 | إدارة الحالة (لغة) |
| **Prisma** | 6.11.1 | ORM وقاعدة البيانات |
| **shadcn/ui** | أحدث | مكتبة مكونات UI |
| **Lucide React** | 0.525.0 | أيقونات SVG |

### 3.2 المكتبات الإضافية

| المكتبة | الاستخدام |
|---------|---------|
| `react-syntax-highlighter` | عرض أكواد C++ في المشاريع |
| `sonner` | إشعارات Toast |
| `z-ai-web-dev-sdk` | ذكاء اصطناعي (في backend فقط) |
| `react-markdown` | عرض محتوى المدونة |
| `next-themes` | دعم الوضع الداكن (مُعرّف لكن لم يُفعّل) |
| `plausible` | تحليلات الزوار |
| `formspree` | نموذج الاتصال (backend proxy) |
| `cloudflare turnstile` | تحقق من الروبوتات (في نموذج الاتصال) |

### 3.3 أدوات التطوير

```bash
bun run dev        # تشغيل خادم التطوير (Port 3000)
bun run lint        # فحص الكود بـ ESLint
bun run db:push     # مزامنة مخطط Prisma
bun run db:generate # توليد عميل Prisma
```

---

## 4. التكوين والنشر

### 4.1 تكوين Next.js (`next.config.ts`)

هذا الملف **حرج** بشكل ديناميكي حسب البيئة:

```typescript
const isDev = process.env.NODE_ENV === "development";

// البيئة المشتركة (تطوير):
const devConfig = { trailingSlash: true, images: { unoptimized: true } };

// البيئة الإنتاجية (GitHub Pages):
const prodConfig = {
  ...devConfig,
  output: "export",           // تصدير ثابت (SSG)
  basePath: "/iot-portfolio",  // مسار GitHub Pages
  distDir: "docs",           // مجلد المخرجات
};
```

**النتيجة:** 
- **التطوير:** `http://localhost:3000/` (بدون basePath)
- **الإنتاج:** `https://mohammadfhgjvhgi.github.io/iot-portfolio/`

### 4.2 رؤوس الأمان (Security Headers)

مُعرّفة في `next.config.ts` لكل المسارات:

| الرأس | القيمة | الغرض |
|-------|-------|-------|
| `X-Frame-Options` | `DENY` | منع التضمين في إطارات |
| `X-Content-Type-Options` | `nosniff` | منع MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | تحكم في الإحالة |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | حصر الصلاحيات |
| `Content-Security-Policy` | شاملة (انظر الملف) | حماية المحتوى |
| `X-Powered-By` | مُزال | إخفاء بصمة الإطار |
| `strict-transport-security` | مُفعّل | HTTPS فقط |

### 4.3 Content Security Policy (CSP) المفصّل

```
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval' https://plausible.io https://challenges.cloudflare.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com;
img-src 'self' data: blob: https://*.githubusercontent.com;
connect-src 'self' https://formspree.io https://integrate.api.nvidia.com https://plausible.io https://challenges.cloudflare.com https://esm.sh;
frame-src https://challenges.cloudflare.com;
```

---

## 5. التصميم والأنماط (UI/UX)

### 5.1 نظام الألوان (Color System)

#### الألوان الأساسية
```css
--background: #0a0f1a;    /* خلفية رئيسية */
--foreground: #e8edf5;    /* نص رئيسي */
--card: #0f1628;          /* خلفية البطاقات */
--border: #1e2d4d;        /* حدود */
--muted-foreground: #7a8ba8; /* نص ثانوي */
--primary: #00ff66;         /* اللون الرئيسي (أخضر نيون) */
--primary-foreground: #0a0f1a;
```

#### ألوان النيون
| الاسم | الكود | الاستخدام |
|------|-----|---------|
| نيون أخضر | `#00ff66` | العناصر التفاعلية، الأزرار الرئيسية |
| نيون سماوي | `#00e5ff` | التبديل بين اللغات، العناصر الثانوية |
| نيون عنبري | `#ffab00` | التحذيرات، القسم الثالث |
| نيون أحمر | `#ff3d5a` | الأخطاء، الإنذارات |
| نيون بنفسجي | `#b44dff` | الميزات الخاصة، الأقسام الإبداعية |

### 5.2 التأثيرات البصرية المخصصة (CSS Classes)

| الكلاس | التأثير |
|-------|--------|
| `.glass-dark` | خلفية شفافة داكنة مع blur |
| `.glass-card-dark` | بطاقة زجاجية مع حدود خضراء خفيفة |
| `.gradient-neon` | تدرج لون أخضر→سماوي |
| `.gradient-neon-text` | نص بتدرج لون (background-clip: text) |
| `.gradient-mesh-dark` | خلفية متدرجة دائرية |
| `.neon-border` | حدود مع توهج نيون |
| `.card-hover` | تأثير hover (رفع + ظل) |
| `.neon-text` | نص مع ظل نيون أخضر |
| `.neon-text-cyan` | نص مع ظل نيون سماوي |
| `.circuit-bg` | خلفية نمط دائرة كهربائية |
| `.terminal-text` | خط مونوسب مع لون أخضر |

### 5.3 أنيميشن CSS

| الكلاس | الأنيميشن |
|-------|-----------|
| `.animate-pulse-neon` | نبض نيون متدرج |
| `.animate-float` | طفو لطيف (6s) |
| `.animate-float-delayed` | طفو متأخر (6s + 2s) |
| `.animate-shimmer` | لمعان متحرك |
| `.animate-pulse-ring` | حلقة نبض متوسعة |
| `.animate-cta-glow` | توهج CTA |

### 5.4 مؤشرات LED

| الكلاس | الشكل |
|-------|-------|
| `.led-on` | دائرة خضراء متوهجة |
| `.led-off` | دائرة رمادية معتمة |
| `.led-amber` | دائرة برتقالي متوهجة |
| `.led-red` | دائرة حمراء متوهجة |

### 5.5 نظام الاستجابة (Responsive Design)

| النقطة | xs | sm | md | lg | xl |
|-------|----|----|----|----|-----|
| النص الرئيسي H1 | 3xl | 5xl | 7xl | - | - |
| شبكة البطاقات (المشاريع) | 1 col | 1 col | 2 col | - | - |
| شبكة الخدمات | 1 col | 1 col | 2 col | 3 col | 3 col |
| شبكة المجموعات | 1 col | - | 2 col | - | 4 col |
| شبكة الموارد | 1 col | 1 col | 2 col | 3 col | 3 col |
| الأقسام الداخلية | py-12 | py-16 | py-20 | - | - |

---

## 6. قائمة المكونات التفصيلية

### 6.1 المكونات المدمجة في `page.tsx`

المكونات التالية مُعرّفة **مباشرة داخل** `src/app/page.tsx`:

| المكون | النوع | الوصف |
|--------|------|-------|
| `Navbar` | function | شريط التنقل الثابت مع Scroll Spy + تبديل اللغة |
| `HeroSection` | function | القسم الرئيسي مع تأثير طباعة + عداد متحرك + CTA |
| `WhyUsSection` | function | 6 أسباب للتمايز (الأمان، Offline-First، كود نظيف...) |
| `ProjectGuideSection` | function | دليل المشروع المختصر مع زر "اقرأ المزيد" |
| `ProjectGuideModal` | function | نافذة كاملة للدليل |
| `ArchitectureModal` | function | نافذة المعمارية والتصميم |
| `SecurityAuditSummary` | function | ملخص تقرير الأمان (92/100) |
| `SecurityAuditModal` | function | النافذة الكاملة لتقرير الأمان |
| `ContactSection` | function | معلومات الاتصال + نموذج الاتصال |
| `PortfolioFooter` | function | تذييل الصفحة |

### 6.2 المكونات المستقلة

| المكون | الملف | الوصف التفصيلي |
|--------|------|--------------|
| **TeamSection** | `portfolio/TeamSection.tsx` | بطاقتا المؤسسين مع صور SVG مخصصة، شريط إحصائيات (4+/100+/20+/800+)، رسالة المهمية |
| **ServicesSection** | `portfolio/ServicesSection.tsx` | 6 خدمات IoT مع بطاقات ألوان، قائمة مميزات، CTA سفلي |
| **ProjectsShowcase** | `portfolio/ProjectsShowcase.tsx` | أكبر مكون (~1300 سطر) — 4 مشاريع كاملة مع: |
| | | - بيانات المشاريع (متعددة اللغات) |
| | | - رمز معمارية ASCII |
| | | - عروض أكواد مع syntax highlighter |
| | | - محاكاة بيانات حية (Telemetry) |
| | | - تفاصيل: مدة، أسلاك، ساعات عمل، مشاكل مُحلّة |
| | | - قسم التحديات (Problem → Solution) |
| | | - مودال التوسيع مع معمارية + أكواد |
| **SecurityAudit** | `portfolio/SecurityAudit.tsx` | تقرير أمان شامل مع: 4 أدوات (Lighthouse, Security Headers, Nuclei, OWASP)، حلقات SVG متحركة، شريط تقدم |
| **StartHereSection** | `portfolio/StartHereSection.tsx` | 4 فئات تعلم: مبتدئ، مشاريع توجيهي، Arduino/IoT، حلول أخطاء |
| **GroupsLinksSection** | `portfolio/GroupsLinksSection.tsx` | 4 قنوات اتصال: 2 تليجرام + فيسبوك + واتساب مع أزرار انضمام |
| **ResourceLibrarySection** | `portfolio/ResourceLibrarySection.tsx` | مكتبة موارد مع بحث، تصنيف (6 فئات)، ترتيب (تحميل/اسم/أحدث)، 12 مورداً |
| **BlogSection** | `portfolio/BlogSection.tsx` | مدونة تقنية مع بطاقات مقالات، مودال قراءة كامل مع جداول وأكواد |
| **FAQSection** | `portfolio/FAQSection.tsx` | 8 أسئلة شائعة مع Accordion ثنائي اللغات |
| **ContactForm** | `portfolio/ContactForm.tsx` | نموذج اتصال مع Turnstile + Formspree |
| **LiveActivitySection** | `portfolio/LiveActivitySection.tsx` | خط زمني "نشاط حي" مع 6 أحداث + مؤشر LIVE |
| **LatestAdditionsSection** | `portfolio/LatestAdditionsSection.tsx` | 4 أقسام: ملفات، مشاريع، شرحات، تحديثات |
| **SearchDialog** | `portfolio/SearchDialog.tsx` | بحث Cmd+K مع 11 عنصر قابلة للبحث، تنقل لوحة مفاتيح |
| **DynamicElementsSection** | `portfolio/DynamicElementsSection.tsx` | عنصر تفاعلي ديناميكي (جزيئئات، عدادات، بيانات) |
| **ProjectCalculator** | `portfolio/ProjectCalculator.tsx` | حاساب تكلفة المشروع المبدئي |
| **SkillsMatrix** | `portfolio/SkillsMatrix.tsx` | مصفوف المهارات التقنية |
| **Timeline** | `portfolio/Timeline.tsx` | خط زمني للفريق |
| **Testimonials** | `portfolio/Testimonials.tsx` | آراء العملاء |
| **ESP32Simulator** | `portfolio/ESP32Simulator.tsx` | محاكي ESP32 تفاعلي |
| **BreadcrumbNav** | `portfolio/BreadcrumbNav.tsx` | مسار التنقل |

### 6.3 مكون الدردشة

**الملف:** `src/components/chat/ChatBot.tsx`

**وضعان مزدوج:**

1. **الوضع المحلي (FAQ):**
   - يطابق كلمات المستخدم مع 18 سؤال مُعرّف في `src/data/faq.json`
   - خوارزمية مطابقة تعتمد على طول الكلمة × 2 (أهمية الكلمة)
   - استجابة باللغة السؤال تلقائياً (يكتشف العربية عبر Unicode)
   - إذا لم يجد إجابة → يعرض رابط تليجرام

2. **وضع الذكاء الاصطناعي (AI):**
   - يتصل مباشرة بـ NVIDIA NIM API (`meta/llama-3.1-405b-instruct`)
   - يرسل آخر 6 رسائل من تاريخ المحادثة كـ context
   - System prompt متعد حسب اللغة (عربي/إنجليزي)
   - `max_tokens: 150` للإجابات المختصرة
   - `temperature: 0.2` للاستقرار
   - وقت انتظار: 8 ثوان

3. **المميزات:**
   - زر تبديل ⚡ بين الوضعين (يستمر نفس تاريخ المحادثة)
   - زر مسح المحادثة 🗑️
   - مؤشر كتابة "يفكر..." مع نقاط متحركة
   - رابط تليجرام تلقائي عند فشل AI
   - Fallback ذكي: إذا فشل AI → يعود للوضع المحلي

### 6.4 مكونات UI (shadcn/ui)

مُثبّت 55+ مكون من مكتبة shadcn/ui في `src/components/ui/`. تشمل:
- Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge
- Breadcrumb, Button, Calendar, Card, Carousel, Chart
- Checkbox, Collapsible, Command, ContextMenu, Dialog
- DropdownMenu, Drawer, Form, HoverCard, Input, InputOTP
- Label, Menubar, NavigationMenu, Pagination, Popover, Progress
- RadioGroup, Resizable, ScrollArea, Search (Command), Select
- Separator, Sheet, Sidebar, Skeleton, Slider, Sonner (Toast), Switch
- Table, Tabs, Textarea, Toggle, ToggleGroup, Tooltip

**ملاحظة:** لا تستخدم المكونات من `src/components/platform/` — هذه ملفات إضافية غير مُفعّلة حالياً.

---

## 7. إدارة الحالة واللغة (State Management)

### 7.1 نظام اللغة — Zustand Store

**الملف:** `src/lib/language.ts`

```typescript
interface LanguageState {
  lang: 'ar' | 'en';
  toggle: () => void;
  setLang: (l: Lang) => void;
  t: (ar: string, en: string) => string;  // دالة الترجمة
  isRTL: () => boolean;
}
```

**الاستخدام:**
```typescript
const { lang, toggle, t, isRTL } = useLang();

// الترجمة
const title = t("مرحباً", "Welcome"); // يتحدث تلقائياً مع تغيير اللغة

// RTL
const isRTL = isRTL(); // true = عربي, false = إنجليزي

// تبديل اللغة
<button onClick={toggle}>
  {lang === 'ar' ? 'EN' : 'عربي'}
</button>
```

### 7.2 الاتجاهات

| الطريقة | الكود | الوصف |
|--------|------|-------|
| `t(ar, en)` | دالة ترجمة مختصرة | تعيد النص حسب اللغة الحالية |
| `lang` | `'ar' \| 'en'` | اللغة الحالية |
| `isRTL()` | `boolean` | هل اتجاه النص من اليمين لليمين؟ |
| `toggle()` | `void` | تبديل بين العربية والإنجليزية |
| `setLang(l)` | `void` | تعيين لغة معينة |

### 7.3 دعم RTL/LTR

- **التخطيط الرئيسي** يبدأ بـ `dir="rtl"` افتراضياً
- كل مكون يستخدم `dir={isRTL() ? "rtl" : "ltr"}` للنصوص
- بعض النصوص التقنية (مثل أسماء المتحكمات) تُعرض دائماً من اليسار لليمين (`dir="ltr"`)
- CSS خاص: `[dir="rtl"] .lucide-chevron-down { transition: transform 0.2s; }`

### 7.4 الخطوط

```css
font-family: var(--font-ibm-plex-arabic), system-ui, sans-serif;
```

الخط: **IBM Plex Sans Arabic** (من Google Fonts)
- الأوزان: 400, 600, 700
- يدعم العربية والإنجليزية
- `display: swap` للأداء

---

## 8. قاعدة البيانات (Prisma)

### 8.1 المخطط (`prisma/schema.prisma`)

3 نماذج فقط (الموقع يستخدم ملفات JSON للبيانات الثابتة):

```prisma
model ContactMessage {
  id        String   @id @default(cuid())
  name      String
  email     String
  subject   String?
  message   String
  isRead    Boolean  @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model NewsletterSubscriber {
  id        String   @id @default(cuid())
  email     String   @unique
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model CourseEnrollment {
  id        String   @id @default(cuid())
  userEmail String
  courseId  String
  progress  Int      @default(0)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([userEmail, courseId])
}
```

### 8.2 الاتصال بقاعدة البيانات

```typescript
import { db } from '@/lib/db';
// db is a PrismaClient singleton

// استخدام:
const messages = await db.contactMessage.findMany();
await db.contactMessage.create({ data: {...} });
```

### 8.3 البيانات الثابتة (JSON)

| الملف | المحتوى | الاستخدام |
|------|---------|---------|
| `src/data/faq.json` | 18 سؤال مع كلمات مفتاحية | مصدر بيانات الشات |
| `src/data/blog-posts.ts` | مقالات المدونة (عنوان، محتوى، أكواد) | عرض المدونة |
| `src/data/calculator-recommendations.json` | توصيات حاساب المشروع | حاساب التكلفة |

---

## 9. الذكاء الاصطناعي (ChatBot)

### 9.1 معمارية الدردشة

```
┌──────────────┐    ┌──────────────┐
│  المستخدم     │    │  ChatBot.tsx  │
│  (input)     │───►│              │
└──────────────┘    └──────┬──────┘
                            │
                     ▼
              ┌─────────────────────┐
              │  كشف في FAQ JSON   │
              └──────┬──────────┘ │
                     │        │        │
               score > 2?     │        │
              ┌────▼────┐   │  No    │
              │ FAQ answer │    │match │
              └─────────┘   └──┬───┘
                              │
                     ▼
              ┌─────────────────────┐
              │  وضع AI مُفعّل؟    │
              │  (زر ⚡)           │
              └──────┬──────────┘ │
              Yes │              │ No
               │              │
               ▼              ▼
        ┌──────────┐  ┌──────────────┐
        │ NVIDIA   │  │ رابط تليجرام │
        │ NIM API  │  │ (fallback)    │
        └──────────┘  └──────────────┘
```

### 9.2 إعدادات NVIDIA

```typescript
const NVIDIA_DIRECT_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const NVIDIA_API_KEY = process.env.NEXT_PUBLIC_NVIDIA_API_KEY;
const MODEL = "meta/llama-3.1-405b-instruct";
```

### 9.3 System Prompts

**عربي:**
```
أنت مساعد تقني خبير في أنظمة إنترنت الأشياء (IoT). أنت تعمل لصالح فريق 
'مشاريع للأنظمة الذكية'. أجب فقط بناءً على خدمات الفريق ومشاريعهم. لا تختلق. 
إذا كان السؤال خارج نطاق الفريق، اقترح التواصل عبر تليجرام. أجب بإيجاز (أقل من 100 كلمة).
```

**إنجليزي:**
```
You are a technical expert assistant for IoT systems. You work for 'Smart Systems Lab'. 
Answer only based on the team's services and projects. Don't fabricate. 
If outside scope, suggest contacting via Telegram. Answer briefly (under 100 words).
```

---

## 10. الأمان والحماية

### 10.1 نتيجة الأمان الإجمالية: 92/100

| أداة الاختبار | النتيجة | التفاصيل |
|-------------|--------|---------|
| Lighthouse (Google) | 75/100 | أداء: 75، SEO: 100، أفضل ممارسات: 96، سهولة الوصول: 94 |
| Security Headers | 100/100 | جميع الرؤوس الأمنية مُطبّقة بنجاح |
| Nuclei (ProjectDiscovery) | 100/100 | لم يتم اكتشاف ثغرات |
| OWASP Top 10 | 100/100 | جميع الفئات آمنة أو تم إصلاحها |

### 10.2 الإصلاحات الأمنية المنفذة

- 17 إصلاح أمني تم تنفيذها
- 7 تحسينات SEO (sitemap, manifest, robots, OG tags, etc.)
- إزالة X-Powered-By
- منع إعادة التوجيه (DTR/RTS)
- كشف ملفات تعريضة مكشوفة

---

## 11. النشر والتحسينات

### 11.1 بيئة التطوير (localhost:3000)

```bash
bun run dev
```

### 11.2 البناء والنشر (GitHub Pages)

```bash
# البناء (يُنشئ ملف docs/)
NEXT_PUBLIC=true bun run build

# النسخ (مجلد docs/ يتم رفعه تلقائياً عبر git)
git add docs/
git commit -m "deploy: v2.0"
git push
```

### 11.3 SEO

- **sitemap.xml:** مُولّد تلقائياً عبر `src/app/sitemap.ts`
- **manifest.webmanifest:** PWA manifest مع أيقون + لون خلفية
- **robots.txt:** يسمح بالزحف مع رابط الخريطة
- **Open Graph:** عنوان + وصف + صورة
- **Twitter Card:** ملخص + صورة
- **metadataBase:** `https://mohammadfhgjvhgi.github.io/iot-portfolio`

### 11.4 PWA (Progressive Web App)

- **Service Worker:** `public/sw.js` — تخزين مسبق لملفات
- **Registrar:** `ServiceWorkerRegistrar.tsx` — تسجيل SW عند التحميل
- **Manifest:** `src/app/manifest.ts` — اسم التطبيق، أيقونات، لون خلفية
- **Install Prompt:** مُفعّل عبر script في `layout.tsx`

### 11.5 تحليلات (Plausible)

- مدمج في `layout.tsx` عبر `<Script>`
- تتبع أحداث Plausible مخصصة:
  - `Contact Click` (platform: telegram/whatsapp/facebook)
  - `Chat Opened` (زر الدردشة)
  - `Calculator Quote Request`
  - `Form Submit Attempt`
  - `Blog Post Viewed` (slug)

### 11.6 Cloudflare Turnstile

- مدمج في `ContactForm.tsx` لحماية من الروبوتات
- يُحمّل النموذج من الإرسال بدون رمز صالح
- المفتاح: `NEXT_PUBLIC_TURNSTILE_SITE_KEY`

---

## 12. متغيرات البيئة

### 12.1 متغيرات مطلوبة (`.env.local`)

```bash
# === الذكاء الاصطناعي ===
NEXT_PUBLIC_NVIDIA_API_KEY=nvapi-xxx  # مفتاح NVIDIA NIM

# === نموذج الاتصال ===
NEXT_PUBLIC_FORMSPREE_ID=xyzabc  # معرف Formspree

# === Cloudflare Turnstile ===
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA  # مفتاح اختبار

# === تحليلات ===
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=iot-portfolio.example.com  # نطاق Plausible
```

### 12.2 متغيرات اختيارية

```bash
# أسم النطاق (لـ metadataBase)
NEXT_PUBLIC_SITE_URL=https://mohammadfhgjvhgi.github.io/iot-portfolio

# تفعيل React Strict Mode (معطوق حالياً)
REACT_STRICT_MODE=true
```

---

## 13. المشاكل الشائعة والحلول

### 13.1 Lighthouse Performance (النتيجة: 75/100)

| المشكلة | السبب | الحل المقترح |
|--------|-------|-------------|
| JavaScript كبير | وضع التطوير | التقليل في الإنتاج (`next build`) |
| JavaScript غير مستخدم | Next.js devtools | التقليل في الإنتاج |
| وقت التفاعل بطيء (7.2s) | حجم الصفحة + JS | تقسيم الكود + Lazy Loading |
| LCP كبير (4.0s) | صورة البطل | تحسين صورة + lazy loading |

### 13.2 مشاكل DTR/RTS

**المشكلة:** إعادة ضبط DTR/RTS تقطع الاتصال التسلسلي مع Arduino Bridge.

**الحلول المُنفذ:**
- خط أنابيب `urllib` غير قابل للحجب (Non-blocking)
- منع إعادة الضبط `DTR/RTS` في اتصال USB
- استخدام جسر UART مخصص (Arduino Uno كجسر)

### 13.3 مشكلة RFID يتجمد

**المشكلة:** قارئ RFID (MFRC522) يتجمد ولا يستجيب بعد عدة محاولات فاشلة.

**الحلول المُنفذ (Anti-Freeze Algorithm):**
```c++
#define MAX_FAILS    3
#define FAIL_COOLDOWN 30000  // 30 ثانية

// بعد 3 محاولات فاشلة متتالية:
SPI.end();
delay(100);
SPI.begin();
mfrc522.PCD_Init();
consecutiveFails = 0;
```

### 13.4 مشاكل التطبيق الصغير

1. **المشكلة:** `reactStrictMode: false` — تم تعطيله لتجنب التحذيرات
2. **الحل:** ملف TypeScript مع `ignoreBuildErrors: true` في `next.config.ts`
3. **الحل البديل:** استخدام TypeScript صارم + إزالة الأكواد غير المستخدمة

---

## 14. خريطة طريق التطوير المستقبلية

### 14.1 أولوية عالية

- [ ] إصلاح Lighthouse Performance (الوصول لـ 90+)
- [ ] إضافة صور حقيقية للمشاريع والفريق
- [ ] إضافة فيديوهات قصيرة للمشاريع
- [ ] تحسين سرعة التحميل على الهاتف

### 14.2 ميزات مقترحة

- [ ] صفحة مستقلة لمحمد (`/mohammad`)
- [ ] صفحة معمارية (`/architecture`)
- [ ] صفحة أمان (`/security`)
- [ ] نظام تعليقات/مدونات حقيقية
- [ ] دعم وضع Dite (Dark/Light) كامل
- [ ] تحويل SearchDialog للبحث في المحتوى الكامل

### 14.3 تحسينات تقنية

- [ ] تحويل إلى App Router متعدد الصفحات (إضافة صفحات فرعية)
- [ ] إضافة Image Optimization (sharp)
- [ ] إضافة ISR (Incremental Static Regeneration)
- [ ] تحسين Font Loading
- [ ] تقليل bundle size

### 14.4 محتوى مقترح

- [ ] المزيد من مقالات المدونة
- [ ] دروس تفاعلية خطوة بخطوة
- [ ] صفحة أسئلة شائعة موسعة (مع إجابات تفاعلية)
- [ ] معرض تفاعلي للمشاريع (Before/After)

---

## 15. الجهات الخارجية والروابط

### 15.1 قنوات التواصل

| المنصة | الرابط | الاستخدام |
|--------|-------|---------|
| تليجرام 1 | `https://t.me/Mashari3_AI_Arduino` | المجموعة الرئيسية (500+ عضو) |
| تليجرام 2 | `https://t.me/Arsuino1` | المجموعة Arduino (300+ عضو) |
| فيسبوك | `https://www.facebook.com/share/1HnZactzYD/` | صفحة الفيسبوك |
| واتساب | `https://wa.me/972569303043` | اتصال مباشر |
| Formspree | `https://formspree.io/f/YOUR_ID` | نموذج الاتصال |

### 15.2 روابط تقنية

| المورد | الرابط | الوصف |
|--------|-------|-------|
| Next.js Docs | `https://nextjs.org/docs` | إطار العمل |
| Tailwind CSS | `https://tailwindcss.com/docs` | إطار الأنماط |
| shadcn/ui | `https://ui.shadcn.com/` | مكتبة المكونات |
| Framer Motion | `https://www.framer.com/motion/` | الرسوم |
| Lucide Icons | `https://lucide.dev/` | أيقونات |
| Zustand | `https://zustand-demo.pmnd.rs/` | إدارة الحالة |
| Prisma | `https://www.prisma.io/docs/` | ORM |

### 15.3 أدوات التطوير المستخدمة

| الأداة | الاستخدام |
|--------|---------|
| VS Code | محرر الكود الأساسي |
| bun | مدير الحزم والمتصفح |
| ESLint | فحص الكود |
| Chrome DevTools | تصحيح الأخطاء |
| GitHub Desktop | إدارة الإصدارات |
| Lighthouse | فحص الأداء والأمان |
| Plausible | تحليلات الزوار |

---

## 16. ملخص سريع للمطور

### عند العمل على المشروع:

1. **تشغيل:** `bun run dev` (Port 3000)
2. **فحص:** `bun run lint` قبل كل commit
3. **تعديل `globals.css`** إذا أردت تعديل الأنماط أو التأثيرات
4. **تعديل `page.tsx`** بحذر — الملف كبير (1000+ سطر)
5. **أضف مكون جديد:** في `src/components/portfolio/` ثم استورده في `page.tsx`
6. **اللغة:** استخدم `t("عربي", "English")` لكل نص
7. **RTL:** أضف `dir={isRTL() ? "rtl" : "ltr"}` للعناصر
8. **CSS:** استخدم الأصناف (`glass-dark`, `gradient-neon`, `card-hover`) لتوحيد موحد
9. **النشر:** `NEXT_PUBLIC=true bun run build` ثم `git push`

### اختصارات سريعة:

```bash
# إعادة إنشاء قاعدة البيانات
bun run db:push

# إعادة توليد عميل Prisma
bun run db:generate

# تشغيل lint
bun run lint
```

---

## 17. ملاحظات مهمة للمطور

### ⚠️ تحذيرات

- **لا تضف ملفات .env في git** — استخدم `.env.local` و `.gitignore`
- **لا تضف `basePath` يدوياً** في الكود — يتم تعيينه تلقائياً حسب البيئة
- **لا تستخدم `<img>` بدون `alt`** — يفشل accessibility
- **لا تستخدم `any` في TypeScript** — يجب تحديد الأنواع
- **لا تُعدّل CSS في `globals.css`** بدون سبب — ضعها في `@layer`
- **لا تُعدّل `page.tsx` مباشرة** — الملف ضخم وخطأ واحد قد يكسر الصفحة بالكامل

### ✅ أفضل الممارسات

- استخدم `useInView` من Framer Motion بدلاً من `useEffect` للكشف ظهور العناصر
- استخدم `AnimatePresence` للعناصر التي تظهر وتختفي
- استخدم `glass-card-dark` كبطاقة أساسية للبطاقات
- استخدم `text-[10px]` / `text-xs` / `text-sm` للتدرجات المتدرجة
- أضف `max-w-6xl` أو `max-w-7xl` للحد الأقصى للعرض
- استخدم `gap-3 sm:gap-4 lg:gap-6` للفواصل بين العناصر

### 🔧 نصائح للكتابة

- استخدم التعليقات `/* ═══ */` لفصل الأقسام في الكود
- استخدم `dir={isRTL() ? "rtl" : "ltr"}` للنصوص ثنائية
- استخدم التدرج اللون عبر `style={{ color: "#00ff66" }}` بدلاً من className
- استخدم `aria-label` لكل زر تفاعلي
- استخدم `type LucideIcon` لأيقونات SVG في البيانات
- استخدم `as const` للكائنات الثابتة في المتغيرات

---

## 18. تاريخ التغييرات الرئيسية

| التاريخ | التغيير |
|--------|---------|
| v1.0 | إطلاق المشروع مع الهيكل الأساسي |
| v1.1 | إضافة Start Here, Groups Links, Resource Library, Latest Additions |
| v1.2 | إضافة BlogSection, LiveActivity, DynamicElements |
| v1.3 | إضافة SearchDialog (Cmd+K), FAQ Section |
| v2.0 | تحديث الإحصائيات (92/100)، إضافة التحديات، تحسين التصميم |
| الحالي | استقرار المطورين الشامل |

---

> **ملاحظة:** هذا الملف يغطي حالة المشروع عند كتابته. للمعلومات الأحدث، راجع `worklog.md` في المشروع.
