# PROJECT_STATUS.md — IoT Portfolio / Developer Guide

> **آخر تحديث:** مايو 2025 (تم التحقق من كل سطر)
> **الإصدار:** v2.1 (Senior Edition)

---

## 1. معلومات المستودع (Repository Info)

| الحقل | القيمة |
|-------|--------|
| **الاسم** | iot-portfolio |
| **المنصة** | GitHub Pages (Static SSG) |
| **الرابط المباشر** | `https://mohammadfhgjvhgi.github.io/iot-portfolio/` |
| **GitHub** | `https://github.com/mohammadfhgjvhgi/iot-portfolio` |
| **الفرع** | `main` |
| **basePath (إنتاج)** | `/iot-portfolio` |
| **distDir (إنتاج)** | `docs` |
| **منفذ التطوير** | `3000` |
| **مدير الحزم** | `bun` |

---

## 2. الحالة الحالية للموقع (Current Site State)

### ما الذي يعرضه الموقع الآن؟
الموقع **حالياً** عبارة عن **Developer Guide SPA** (دليل مطور صفحة واحدة) وليس بورتفوليو IoT الأصلي. الصفحة الرئيسية `page.tsx` (1454 سطر) هي ملف دليل مطور يحتوي على:

- **HomeView:** صفحة هبوط مع Hero + إحصائيات متحركة (AnimatedCounter) + 9 روابط سريعة + 4 ميزات + لوحة معلومات المشروع (Repo Info, Lighthouse, Deployment, Features, Roadmap)
- **DocsView:** قارئ وثائق كامل مع شريط جانبي (DocsSidebar via Sheet) + 17 قسم دليل + شريط تقدم القراءة
- **GuideHeader:** شريط تنقل ثابت (fixed top) مع بحث + تبديل لغة (ar/en) + تبديل سمة (dark/light) + قائمة جوال
- **SearchDialog:** بحث ⌘K عبر كل الأقسام مع تنقل لوحة المفاتيح (Arrow keys + Enter + ESC)
- **تبديل العروض:** يتم عبر Zustand store `useGuideStore()` — لا يوجد routing حقيقي

### ⚠️ مشكلة هيكلية: SPA وليس Multi-Page
- الموقع **صفحة واحدة فقط** (`/`) مع views داخلية عبر Zustand
- **لا يوجد routing حقيقي** — لا توجد صفحات `/docs/architecture` أو `/docs/security` إلخ
- كل الأقسام تُعرض في نفس الصفحة عبر تغيير state
- تم رفع PDF خطة تحويل من SPA إلى Multi-Page Documentation Site (انظر القسم 18)

### المكونات القديمة (البورتفوليو الأصلي) — 21 مكون، جميعها غير مستخدمة
المكونات التالية موجودة في `src/components/portfolio/` لكنها **غير مستخدمة حالياً** في الصفحة:

| # | المكون | الملف | سطور |
|---|--------|-------|-------|
| 1 | TeamSection | `portfolio/TeamSection.tsx` | — |
| 2 | ServicesSection | `portfolio/ServicesSection.tsx` | — |
| 3 | ProjectsShowcase | `portfolio/ProjectsShowcase.tsx` | — |
| 4 | SecurityAudit | `portfolio/SecurityAudit.tsx` | — |
| 5 | StartHereSection | `portfolio/StartHereSection.tsx` | — |
| 6 | GroupsLinksSection | `portfolio/GroupsLinksSection.tsx` | — |
| 7 | ResourceLibrarySection | `portfolio/ResourceLibrarySection.tsx` | — |
| 8 | BlogSection | `portfolio/BlogSection.tsx` | — |
| 9 | FAQSection | `portfolio/FAQSection.tsx` | — |
| 10 | ContactForm | `portfolio/ContactForm.tsx` | — |
| 11 | LiveActivitySection | `portfolio/LiveActivitySection.tsx` | — |
| 12 | LatestAdditionsSection | `portfolio/LatestAdditionsSection.tsx` | — |
| 13 | SearchDialog | `portfolio/SearchDialog.tsx` | — |
| 14 | DynamicElementsSection | `portfolio/DynamicElementsSection.tsx` | — |
| 15 | ProjectCalculator | `portfolio/ProjectCalculator.tsx` | — |
| 16 | SkillsMatrix | `portfolio/SkillsMatrix.tsx` | — |
| 17 | Timeline | `portfolio/Timeline.tsx` | — |
| 18 | Testimonials | `portfolio/Testimonials.tsx` | — |
| 19 | ESP32Simulator | `portfolio/ESP32Simulator.tsx` | — |
| 20 | BreadcrumbNav | `portfolio/BreadcrumbNav.tsx` | — |
| 21 | ProjectAbout | `portfolio/ProjectAbout.tsx` | — |

### المكونات النشطة حالياً
| المكون | الملف | الحالة |
|--------|-------|--------|
| GuideHeader | داخل `page.tsx` (خط 104-211) | ✅ شريط تنقل ثابت |
| SearchDialog | داخل `page.tsx` (خط 217-329) | ✅ بحث ⌘K |
| HomeView | داخل `page.tsx` (خط 335-820) | ✅ صفحة الهبوط |
| DocsSidebar | داخل `page.tsx` (خط 826+) | ✅ شريط جانبي للدليل |
| DocsView | داخل `page.tsx` | ✅ عرض المحتوى |
| ServiceWorkerRegistrar | `ServiceWorkerRegistrar.tsx` | ✅ يعمل في layout.tsx |
| GuideRenderer | `guide/GuideRenderer.tsx` (341 سطر) | ✅ يُستخدم في DocsView |
| shadcn/ui | `ui/*` (48 ملف) | ✅ مُثبّتة ومُستخدمة |
| **ChatBot** | `chat/ChatBot.tsx` (759 سطر) | ❌ **غير مُستدعى في page.tsx الحالي** |

---

## 3. البنية التقنية (Tech Stack)

### الحزمة الأساسية
| التقنية | الإصدار | الاستخدام |
|---------|--------|----------|
| Next.js | 16.1.1 | إطار العمل الرئيسي (App Router) |
| React | 19.0 | مكتبة واجهة المستخدم |
| TypeScript | 5 | لغة البرمجة |
| Tailwind CSS | 4 | إطار الأنماط |
| Framer Motion | 12.23.2 | الرسوم والانتقالات |
| Zustand | 5.0.6 | إدارة الحالة (لغة + دليل) |
| Prisma | 6.11.1 | ORM وقاعدة البيانات (SQLite) |
| shadcn/ui | أحدث | مكتبة مكونات UI (48 مكون) |
| Lucide React | 0.525.0 | أيقونات SVG |

### المكتبات الإضافية المُثبّتة والمُستخدمة فعلياً
| المكتبة | الاستخدام |
|---------|---------|
| `react-syntax-highlighter` | عرض أكواد مع syntax highlighting (GuideRenderer) |
| `react-markdown` + `remark-gfm` | عرض محتوى Markdown (GuideRenderer) |
| `sonner` | إشعارات Toast (layout.tsx) |
| `z-ai-web-dev-sdk` | AI / Web Search (API routes فقط) |
| `zod` | التحقق من البيانات |
| `react-hook-form` + `@hookform/resolvers` | نماذج |
| `recharts` | رسوم بيانية |
| `date-fns` | تواريخ |
| `sharp` | معالجة صور |
| `uuid` | معرّفات فريدة |

### المكتبات المُثبّتة لكن غير المُستخدمة فعلياً
| المكتبة | ملاحظة |
|---------|--------|
| `next-auth` | مُثبّت لكن لا يُستخدم |
| `@mdxeditor/editor` | مُثبّت لكن لا يُستخدم |
| `@dnd-kit/*` (3 حزم) | مُثبّت لكن لا يُستخدم |
| `@tanstack/react-query` | مُثبّت لكن لا يُستخدم |
| `@tanstack/react-table` | مُثبّت لكن لا يُستخدم |
| `embla-carousel-react` | مُثبّت لكن لا يُستخدم |
| `vaul` | مُثبّت لكن لا يُستخدم |
| `input-otp` | مُثبّت لكن لا يُستخدم |
| `next-intl` | مُثبّت لكن لا يُستخدم (اللغة تُدار يدوياً عبر Zustand) |
| `next-themes` | مُثبّت لكن لا يُستخدم (السمة تُدار يدوياً عبر guide-store.ts) |
| `@reactuses/core` | مُثبّت لكن لا يُستخدم |

---

## 4. هيكل الملفات الحقيقي (File Structure)

```
src/
├── app/
│   ├── globals.css           # 362 سطر — أنماط عامة + تأثيرات نيون + أنيميشن
│   ├── layout.tsx            # 122 سطر — Layout رئيسي (SEO, Plausible, PWA, ServiceWorker)
│   ├── page.tsx              # 1454 سطر — الصفحة الرئيسية (Developer Guide SPA حالياً)
│   │                         #   يتضمن: GuideHeader, SearchDialog, HomeView, DocsSidebar, DocsView
│   ├── manifest.ts           # PWA manifest
│   ├── sitemap.ts            # SEO sitemap
│   ├── not-found.tsx         # صفحة 404
│   └── api/
│       ├── route.ts          # 5 سطر — مسار فارغ
│       ├── ai-chat/route.ts  # 68 سطر — وكيل NVIDIA NIM API
│       ├── contact/route.ts  # 24 سطر — رسائل الاتصال (Prisma)
│       ├── newsletter/route.ts # 29 سطر — اشتراك النشرة (Prisma)
│       └── search/route.ts   # 22 سطر — بحث ويب (z-ai-web-dev-sdk)
│
├── components/
│   ├── chat/
│   │   └── ChatBot.tsx       # 759 سطر — دردشة ذكية (FAQ + NVIDIA AI) ❌ غير مُستدعى
│   ├── guide/
│   │   └── GuideRenderer.tsx  # 341 سطر — عرض Markdown مع syntax highlight ✅
│   ├── portfolio/            # 21 مكون — البورتفوليو الأصلي (جميعها ❌ غير مُستخدمة)
│   ├── platform/             # 13 ملف — مكونات إضافية (جميعها ❌ غير مُفعّلة أبداً)
│   │   ├── AnimatedBackground.tsx
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── HomePage.tsx
│   │   ├── StarterKitPage.tsx
│   │   ├── ProjectsPage.tsx
│   │   ├── LearningPathPage.tsx
│   │   ├── SupportPage.tsx
│   │   ├── CalculatorPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── EnvironmentsPage.tsx
│   │   ├── MonetizationPage.tsx
│   │   └── SensorsPage.tsx
│   ├── ServiceWorkerRegistrar.tsx  # ✅ يعمل في layout.tsx
│   └── ui/                   # 48 مكون shadcn/ui ✅
│
├── data/
│   ├── faq.json              # 110 سطر — 18 سؤال/جواب ثنائي اللغة ❌ غير مُستدعى حالياً
│   ├── guide-sections.ts     # 2278 سطر — 17 قسم دليل ثنائي اللغة ✅
│   ├── blog-posts.ts         # 494 سطر — بيانات المدونة ❌ غير مُستدعى حالياً
│   └── calculator-recommendations.json # 92 سطر ❌ غير مُستدعى حالياً
│
├── hooks/
│   ├── use-toast.ts
│   └── use-mobile.ts
│
└── lib/
    ├── db.ts                 # عميل Prisma (SQLite)
    ├── language.ts           # 19 سطر — Zustand store للغة (ar/en)
    ├── guide-store.ts        # 64 سطر — Zustand store للدليل (view/theme/sidebar/readSections)
    └── utils.ts              # cn() وغيرها
```

---

## 5. مسارات API (API Routes) — 5 مسارات

| المسار | الطريقة | السطور | الوظيفة | الحالة |
|--------|---------|--------|---------|--------|
| `/api/ai-chat` | POST | 68 | وكيل NVIDIA NIM API (`meta/llama-3.1-405b-instruct`) | ✅ موجود |
| `/api/contact` | POST/GET | 24 | حفظ/استرجاع رسائل الاتصال (Prisma) | ✅ موجود |
| `/api/newsletter` | POST | 29 | اشتراك في النشرة البريدية (Prisma) | ✅ موجود |
| `/api/search` | GET | 22 | بحث ويب عبر z-ai-web-dev-sdk | ✅ موجود |
| `/api` | — | 5 | مسار فارغ (root) | موجود |

### ⚠️ ملاحظة أمنية حرجة: مفتاح NVIDIA API
- **في `/api/ai-chat/route.ts` (خط 4):** المفتاح مكتوب **hardcoded مباشرة في الكود المصدر**:
  ```
  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
  ```
- **في `ChatBot.tsx`:** المفتاح يُقرأ من `process.env.NEXT_PUBLIC_NVIDIA_API_KEY` — في builds ثابتة (GitHub Pages) يُرسل للعميل
- **المشكلة:** يوجد مساران للوصول للمفتاح — أحدهما hardcoded في source code

---

## 6. قاعدة البيانات (Database)

### المحرك: SQLite (via Prisma)
### المسار: `db/` (الافتراضي من env)

| الجدول | الحقول | الوظيفة |
|--------|--------|---------|
| `ContactMessage` | id, name, email, subject?, message, isRead, createdAt, updatedAt | رسائل نموذج الاتصال |
| `NewsletterSubscriber` | id, email (unique), isActive, createdAt, updatedAt | مشتركون النشرة |
| `CourseEnrollment` | id, userEmail, courseId, progress, isActive, createdAt, updatedAt | تسجيلات الدورات |

### ملاحظة: قاعدة البيانات لا تعمل في الإنتاج
- في الإنتاج (GitHub Pages) الموقع static export — لا يوجد خادم
- API routes تعمل فقط في بيئة التطوير (dev server)
- في الإنتاج ChatBot يستدعي NVIDIA API مباشرة (client-side) دون استخدام `/api/ai-chat`

---

## 7. نظام الدليل (Guide System)

### 17 قسم دليل (guide-sections.ts — 2278 سطر):

| # | ID | العنوان (EN) | العنوان (AR) |
|---|----|----|----|
| 1 | overview | Project Overview | نظرة عامة على المشروع |
| 2 | architecture | Technical Structure | الهيكل التقني |
| 3 | technologies | Tech Stack | التقنيات والمكتبات |
| 4 | configuration | Configuration & Deployment | التكوين والنشر |
| 5 | design | UI/UX Design | التصميم والأنماط |
| 6 | components | Components | قائمة المكونات |
| 7 | state-management | State Management | إدارة الحالة |
| 8 | database | Database & Data | قاعدة البيانات |
| 9 | ai-chatbot | AI Chatbot | الذكاء الاصطناعي |
| 10 | security | Security | الأمان والحماية |
| 11 | deployment | Deployment & DevOps | النشر والتحسينات |
| 12 | environment-vars | Environment Variables | متغيرات البيئة |
| 13 | troubleshooting | Troubleshooting | المشاكل والحلول |
| 14 | roadmap | Future Roadmap | خريطة الطريق |
| 15 | external-links | External Links | الروابط الخارجية |
| 16 | quick-reference | Quick Reference | ملخص سريع |
| 17 | project-info | Project Info | معلومات المشروع |

كل قسم يحتوي على:
- `title` (ar/en) + `description` (ar/en) + `icon`
- `content` (ar/en) بتنسيق Markdown مع جداول وأكواد
- `subsections` مع عناوين فرعية

### هيكل البيانات:
```typescript
// من guide-sections.ts
interface GuideSection {
  id: string;
  icon: string;
  title: { ar: string; en: string };
  description: { ar: string; en: string };
  content: { ar: string; en: string };
  subsections: Array<{
    id: string;
    title: { ar: string; en: string };
  }>;
}
```

---

## 8. نظام اللغة (Language System)

| الخاصية | التفاصيل |
|---------|---------|
| **الإدارة** | Zustand store في `lib/language.ts` (19 سطر) |
| **اللغات** | العربية (ar) + الإنجليزية (en) |
| **الافتراضي** | العربية |
| **التبديل** | زر Globe في GuideHeader |
| **RTL/LTR** | يدعم عبر `isRTL()` + `dir` attribute على `<html>` |
| **الدالة** | `t(ar, en)` — تُرجع النص حسب اللغة الحالية |
| **الخط** | IBM Plex Sans Arabic (Google Fonts, weights: 400/600/700) |
| **التخزين** | `localStorage` |
| **ملاحظة** | `next-intl` مُثبّت لكن لا يُستخدم |

---

## 9. نظام السمة (Theme System)

| الخاصية | التفاصيل |
|---------|---------|
| **الإدارة** | Zustand store في `lib/guide-store.ts` (64 سطر) |
| **السمات** | dark (افتراضي) + light |
| **التخزين** | `localStorage.setItem('guide-theme', next)` |
| **التبديل** | زر Sun/Moon في GuideHeader |
| **CSS** | يدعم dark mode عبر `theme` state (ليس class-based — يُمرّر كـ prop) |
| **ملاحظة** | `next-themes` مُثبّت لكن لا يُستخدم |

### كيف يعمل في page.tsx:
- كل مكون يقرأ `theme` من `useGuideStore()` ويتحقق `const isLight = theme === "light"`
- يُطبّق أنماط مختلفة حسب القيمة: `theme === "light" ? "bg-white" : "glass-card-dark"`

---

## 10. التصميم (Design System)

### ألوان النيون
| اللون | الكود | الاستخدام |
|-------|-------|----------|
| أخضر نيون | `#00ff66` | العناصر التفاعلية، الأزرار الرئيسية، gradient-neon |
| سماوي نيون | `#00e5ff` | تبديل اللغة، العناصر الثانوية، neon-border-cyan |
| عنبري نيون | `#ffab00` | التحذيرات، الأقسام الثالثة، led-amber |
| أحمر نيون | `#ff3d5a` | الأخطاء، الإنذارات، led-red |
| بنفسجي نيون | `#b44dff` | الميزات الإبداعية |

### ألوان الخلفية (Dark Mode)
| المتغير | القيمة |
|---------|--------|
| `--background` | `#0a0f1a` |
| `--card` | `#0f1628` |
| `--border` | `#1e2d4d` |
| `--muted-foreground` | `#7a8ba8` |
| `--foreground` | `#e8edf5` |
| `--primary` | `#00ff66` |

### CSS Classes مخصصة (في globals.css — 362 سطر):
- **خلفيات:** `glass-dark` · `glass-card-dark` · `gradient-mesh-dark` · `circuit-bg`
- **تدرجات:** `gradient-neon` · `gradient-neon-text`
- **حدود:** `neon-border` · `neon-border-cyan`
- **تفاعل:** `card-hover` · `neon-text` · `terminal-text`
- **مؤشرات LED:** `led-on` · `led-off` · `led-amber` · `led-red`
- **حركات:** `animate-pulse-neon` · `animate-float` · `animate-float-delayed` · `animate-shimmer` · `animate-cta-glow`

---

## 11. مكون الدردشة (ChatBot) — غير مُستدعى حالياً

### الملف: `src/components/chat/ChatBot.tsx` (759 سطر)

### الوضع المحلي (FAQ):
- يطابق كلمات المستخدم مع 18 سؤال في `faq.json` (110 سطر)
- خوارزمية: `keyword.length * 3` (تطابق كامل) + `word.length * 2` (تطبيق جزئي)
- يكتشف اللغة تلقائياً (Unicode Arabic range)
- عتبة النتيجة: `score > 2`

### وضع AI (NVIDIA NIM):
- **النموذج:** `meta/llama-3.1-405b-instruct`
- **الإتصال:** يُحاول `/api/ai-chat` أولاً (server proxy)، ثم يلجأ لـ NVIDIA API مباشرة (client-side) كـ fallback
- **Context:** آخر 6 رسائل من تاريخ المحادثة
- **الإعدادات:** `max_tokens: 150`, `temperature: 0.2`, timeout: 8 ثوان
- **System Prompt:** ثنائي اللغة (ar/en)، يحدد دور المساعد كخبير IoT لـ "Smart Systems Lab"
- **Fallback:** إذا فشل AI ← يعود للوضع المحلي (FAQ)

### المميزات:
- زر تبديل ⚡ بين الوضعين (FAQ / AI)
- زر مسح المحادثة 🗑️
- مؤشر كتابة متحرك (typing indicator)
- رابط تليجرام تلقائي عند فشل الإجابة
- **حالياً غير مُستدعى** في page.tsx الحالي ❌

---

## 12. تكوين Next.js (next.config.ts — 43 سطر)

### التكوين الأساسي (مشترك dev + prod):
```typescript
{
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },  // ⚠️ لا يفحص أخطاء TS
  reactStrictMode: false,                    // ⚠️ Strict Mode مُعطّل
  poweredByHeader: false,
  allowedDevOrigins: ["preview-chat-518fa825-...space-z.ai"],
}
```

### تكوين الإنتاج فقط:
```typescript
{
  output: "export",           // Static SSG — لا يوجد خادم في الإنتاج
  basePath: "/iot-portfolio",
  distDir: "docs",
}
```

### رؤوس الأمان المُفعّلة (عبر `async headers()`):
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy: (شاملة — تشمل plausible, cloudflare, nvidia, fonts, esm.sh)`

---

## 13. SEO و PWA

### SEO:
- ✅ `sitemap.ts` — خريطة الموقع
- ✅ `robots.txt` — ملف الروبوتات
- ✅ `<meta>` شاملة في `layout.tsx` (title, description, OG, Twitter)
- ✅ `metadataBase` = `https://mohammadfhgjvhgi.github.io/iot-portfolio`
- ✅ Open Graph + Twitter Card
- ✅ `lang="ar" dir="rtl"` على `<html>`

### PWA:
- ✅ `manifest.ts` — Web App Manifest
- ✅ `public/sw.js` — Service Worker (network-first caching)
- ✅ `ServiceWorkerRegistrar.tsx` — تسجيل SW تلقائي في layout.tsx

### التحليلات:
- ✅ Plausible Analytics (script في layout.tsx, `data-domain` من env)
- ✅ Custom Events: Contact Click, Chat Opened, Calculator Quote, Form Submit, Blog Post View
- ⚠️ Domain fallback: `iot-portfolio.example.com` (ليس domain حقيقي)

---

## 14. الملفات غير المُستخدمة / القابلة للحذف

### مكونات غير مُستخدمة:
| الملف/المجلد | عدد الملفات | السبب |
|-------------|-------|-------|
| `src/components/platform/*` | 13 ملف | مكونات غير مُفعّلة أبداً |
| `src/components/portfolio/*` | 21 ملف | غير مُستدعاة في page.tsx الحالي |
| `src/components/chat/ChatBot.tsx` | 1 ملف | غير مُستدعى حالياً |

### بيانات غير مُستخدمة:
| الملف | السبب |
|-------|--------|
| `src/data/blog-posts.ts` (494 سطر) | غير مُستدعى — BlogSection غير مُستخدم |
| `src/data/calculator-recommendations.json` (92 سطر) | غير مُستدعى — ProjectCalculator غير مُستخدم |
| `src/data/faq.json` (110 سطر) | غير مُستدعى — ChatBot غير مُستخدم |

### مكتبات غير مُستخدمة (تزيد حجم build):
`next-auth` · `@mdxeditor/editor` · `@dnd-kit/*` · `@tanstack/react-query` · `@tanstack/react-table` · `embla-carousel-react` · `vaul` · `input-otp` · `next-intl` · `next-themes` · `@reactuses/core`

---

## 15. إحصائيات المشروع الحقيقية (تم التحقق)

| المقياس | القيمة (حقيقي — تم التحقق بالأمر) |
|---------|----------------|
| **إجمالي ملفات `.ts` / `.tsx`** | **103** |
| **إجمالي سطور في `src/`** | **27,014** |
| مكونات portfolio | 21 |
| مكونات platform | 13 |
| مكونات UI (shadcn) | 48 |
| مكون ChatBot | 1 |
| مكون GuideRenderer | 1 |
| مكون ServiceWorkerRegistrar | 1 |
| أقسام الدليل | 17 |
| أسئلة FAQ | 18 |
| مسارات API | 5 (ai-chat, contact, newsletter, search, root) |
| جداول DB (Prisma) | 3 |
| Zustand stores | 2 (language + guide-store) |
| سطور `page.tsx` | 1,454 |
| سطور `ChatBot.tsx` | 759 |
| سطور `guide-sections.ts` | 2,278 |
| سطور `globals.css` | 362 |
| سطور `GuideRenderer.tsx` | 341 |
| سطور `layout.tsx` | 122 |
| سطور `guide-store.ts` | 64 |
| سطور `blog-posts.ts` | 494 |
| سطور `faq.json` | 110 |
| سطور `calculator-recommendations.json` | 92 |

---

## 16. ملاحظات مهمة (Issues & Warnings)

### 🔴 مشاكل حرجة:
1. **مفتاح NVIDIA API مكشوف في source code** — مكتوب hardcoded في `/api/ai-chat/route.ts` خط 4. يجب نقله إلى `.env` واستخدام `process.env.NVIDIA_API_KEY`.

2. **الموقع SPA وليس Multi-Page** — كل الـ 17 قسم في صفحة واحدة. لا يوجد routing حقيقي. الروابط لا تعمل بدون JavaScript.

### 🟡 مشاكل متوسطة:
3. **`ChatBot` لا يعمل** — غير مُستدعى في page.tsx الحالي.

4. **`typescript: { ignoreBuildErrors: true }`** — أخطاء TypeScript لا تمنع البناء. يمكن أن تتراكم أخطاء صامتة.

5. **`reactStrictMode: false`** — React Strict Mode مُعطّل. قد يخفي مشاكل rendering.

6. **API routes لا تعمل في الإنتاج** — في GitHub Pages (static export) لا يوجد خادم. `/api/*` ستعطي 404.

7. **35+ ملف غير مُستخدم** — 35 ملف مكونات + بيانات + مكتبات npm تزيد حجم build بدون فائدة.

### 🟢 ملاحظات:
8. **`next-themes` مُثبّت لكن لا يُستخدم** — السمة تُدار يدوياً عبر `guide-store.ts`.

9. **Plausible domain** — يستخدم `iot-portfolio.example.com` كـ fallback (ليس domain حقيقي). يجب تعيين `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` في env.

10. **لا يوجد اختبارات** — لا ملفات test في المشروع.

11. **`docs/` مجلد build موجود** — يحتوي على مخرجات build سابقة + cache. حجمه كبير.

---

## 17. أوامر التطوير

```bash
bun run dev          # تشغيل خادم التطوير (:3000)
bun run lint         # فحص ESLint
bun run db:push      # مزامنة Prisma مع DB
bun run db:generate  # توليد Prisma Client
bun run db:migrate   # تشغيل Prisma migrations
bun run db:reset     # إعادة تعيين DB
bun run build        # بناء الإنتاج (output: export → docs/)
```

---

## 18. الخطة المستقبلية: تحويل SPA إلى Multi-Page Documentation Site

### تم رفع ملف PDF يحتوي على خطة شاملة:
📄 `upload/📘_برومت_شامل__تحويل_موقع_الدليل_من_SPA_إلى_Multi-.pdf`

### ملخص الخطة:
تحويل الموقع من صفحة واحدة (SPA) إلى موقع توثيق متعدد الصفحات:

| الصفحة الحالية | الصفحة المقترحة |
|---------------|----------------|
| صفحة واحدة `/` مع 17 قسم داخلي | `/docs/overview` · `/docs/architecture` · `/docs/security` ... |

### المكونات الجديدة المطلوبة:
- `src/app/docs/layout.tsx` — Layout خاص بالدليل
- `src/app/docs/page.tsx` — صفحة فهرس الدليل
- `src/app/docs/[slug]/page.tsx` — صفحات الأقسام الديناميكية
- `src/components/docs/DocsHeader.tsx` — Header مع Breadcrumbs
- `src/components/docs/DocsSidebar.tsx` — Sidebar مع TOC
- `src/components/docs/DocsContent.tsx` — عرض المحتوى
- `src/components/docs/DocsPagination.tsx` — Prev/Next buttons
- `src/components/docs/DocsSearch.tsx` — بحث شامل
- `src/components/docs/TableOfContents.tsx` — جدول محتويات ديناميكي
- `src/data/docs-structure.ts` — هيكل الدليل
- `src/hooks/useDocs.ts` — Hook للدليل

### الميزات المطلوبة:
1. Dynamic Routing حقيقي (`/docs/[slug]`)
2. Breadcrumbs في أعلى كل صفحة
3. Sidebar مع جدول محتويات
4. Prev/Next navigation
5. بحث ⌘K يعمل على جميع الصفحات
6. Progress tracking في localStorage
7. Responsive design (Desktop/Tablet/Mobile)
8. Accessibility (keyboard nav, screen reader)
9. SEO metadata لكل صفحة
10. Lighthouse Score 90+

### ⚠️ تحدي الإنتاج:
- GitHub Pages يدعم static files فقط
- `/docs/[slug]` يتطلب إما:
  - `output: "export"` مع `generateStaticParams()` لكل الأقسام
  - أو استضافة مع server (Vercel/Netlify)

### ملاحظات من البرومت:
- الصفحة الرئيسية `/` تبقى كما هي (بدون تغيير)
- جميع المكونات الحالية تبقى كما هي
- استخدام Next.js App Router مع dynamic routes و layouts
- حفظ Progress في localStorage
- كل قسم يحتوي على metadata SEO منفصل

---

## 19. تاريخ التطوير (من worklog.md)

| المرحلة | الوصف |
|---------|--------|
| Task 1 | إعداد GitHub Pages + بناء ChatBot بـ 18 FAQ |
| Task 2 | إنشاء ContactForm مع Formspree |
| Task 3 | قسم Testimonials + Plausible Analytics |
| Task 4 | ترقية ChatBot بوضع AI (NVIDIA NIM) |
| Task 5 | حاسبة المشاريع (4-step wizard) |
| Task 1 (fix) | إصلاح GitHub Pages + حذف API routes + conditional config |
| Task 6 | إصلاح ChatBot dead API call + dead code |
| Task 7 | تقرير فني PDF (14 صفحة) |
| Task 8 | Security headers + Blog + PWA + Plausible events |
| Task 9 | إصلاح ESLint + صور + basePath + Service Worker |
| Task 10 | تحقق نهائي + تنظيف repo + push لـ GitHub |
| Task 2-a | إنشاء StartHereSection + GroupsLinksSection |
| Task 2-c | إنشاء ResourceLibrarySection + FAQSection |
| Task 2-e | إنشاء SearchDialog + BreadcrumbNav |
| Task 2-d | إنشاء LatestAdditions + LiveActivity + DynamicElements |
| Task 3 | إعادة كتابة page.tsx كاملة — 12 تعديل |
| Task 4 | 10 تعديلات إلزامية (مودالات + أزرار + إحصائيات) |
| Task 5 | بناء Developer Guide Documentation Website (الحالة الحالية) |
