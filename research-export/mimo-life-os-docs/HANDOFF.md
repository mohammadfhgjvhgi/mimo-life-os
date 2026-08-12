# 📋 HANDOFF.md — ملف التسليم الشامل للـ Cursor IDE

> **هذا الملف يوضح كل الإعدادات والخدمات الخارجية التي يحتاجها المشروع.**
> **اقرأه كاملاً قبل البدء بالتطوير في Cursor IDE.**

---

## [1] إعدادات Firebase (المزامنة بين الأجهزة)

### الحالة الحالية
Firebase Sync **اختياري** — الموقع يعمل بدون Firebase (كل البيانات على SQLite محلياً).
Firebase يُستخدم فقط لمزامنة التعديلات بين أجهزة محمد المختلفة (لابتوب + هاتف).

### المتغيرات البيئية المطلوبة في `.env`

```env
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_DATABASE_URL="https://your-project-default-rtdb.firebaseio.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="123456789"
NEXT_PUBLIC_FIREBASE_APP_ID="1:123456789:web:abcdef"
```

### كيف يتم تفعيل Firebase Sync؟

1. أنشئ مشروع Firebase جديد في [console.firebase.google.com](https://console.firebase.google.com)
2. فعّل **Realtime Database** (ابدأ بـ locked mode)
3. انسخ إعدادات الـ Web App والصقها في `.env`
4. طبّق القواعد (انظر أدناه) في تبويب Rules

### قواعد Firebase Realtime Database (JSON الصحيح)

```json
{
  "rules": {
    ".read": "false",
    ".write": "false",
    "sync": {
      "queue": {
        ".read": "true",
        ".write": "true",
        ".indexOn": ["timestamp", "section", "operation"]
      },
      "status": {
        ".read": "true",
        ".write": "true",
        ".indexOn": ["lastSeen"]
      },
      "media": {
        ".read": "true",
        ".write": "true",
        ".indexOn": ["uploadedAt"]
      }
    }
  }
}
```

### ⚠️ القيد الأمني
التطبيق **لا يستخدم Firebase Auth** — لذلك القواعد لا تستطيع تقييد بـ `auth.uid`.
هذا يعني أن أي شخص يعرف رابط Database URL يستطيع القراءة/الكتابة على مسارات `sync/`.

**التوصية**: لا تشارك Database URL علناً. اعتبره "كلمة مرور".

### كيف يعمل Firebase Sync في الكود؟

- `src/lib/firebase-sync.ts` — يرسل عمليات الإنشاء/التحديث/الحذف لـ `sync/queue`
- `src/components/firebase-sync-provider.tsx` — يستمع للتغييرات ويسحبها
- `src/app/api/sync/pull/route.ts` — يسحب العمليات من Firebase ويطبقها على SQLite
- المسارات المستخدمة: `sync/queue`, `sync/status`, `sync/media`

---

## [2] إعدادات Google Cloud (Calendar + Gmail Agent)

### الصلاحيات (Scopes) المطلوبة

```javascript
const SCOPES = [
  'https://www.googleapis.com/auth/calendar',      // قراءة + كتابة الأحداث
  'https://www.googleapis.com/auth/gmail.readonly', // قراءة الإيميلات فقط
];
```

> **ملاحظة**: الكود الحالي في `src/lib/google-calendar-service.ts` يستخدم `calendar` scope فقط.
> لإضافة Gmail، أضف `gmail.readonly` لـ SCOPES وأعد تفويض OAuth.

### الخطوات في Google Cloud Console

1. اذهب إلى [console.cloud.google.com](https://console.cloud.google.com)
2. أنشئ مشروع جديد أو اختر موجود
3. **APIs & Services → Library**:
   - فعّل **Google Calendar API**
   - فعّل **Gmail API**
4. **APIs & Services → Credentials → Create Credentials → OAuth client ID**:
   - Type: Web application
   - Authorized redirect URIs: `http://localhost:3000/api/google/callback`
   - (للإنتاج: أضف رابط الإنتاج أيضاً)
5. انسخ **Client ID** و **Client Secret**
6. **OAuth consent screen**:
   - Add scopes: `calendar` + `gmail.readonly`
   - Add test user: بريد محمد
7. أكمل OAuth flow على الموقع (زر "ربط Google Calendar" بـ قسم الإعدادات)
8. بعد الحصول على `refresh_token`، أضفه لـ `.env`

### المتغيرات البيئية المطلوبة في `.env`

```env
# Google OAuth (لـ Calendar + Gmail)
GOOGLE_CLIENT_ID="123456789-abcdef.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdef123456"
GOOGLE_REDIRECT_URI="http://localhost:3000/api/google/callback"
GOOGLE_REFRESH_TOKEN="1//0gabcdef123456..."  # يُحصل عليه بعد OAuth flow
```

### كيف يعمل OAuth Flow؟

1. المستخدم يضغط "ربط Google Calendar" بـ الإعدادات
2. يُوجَّه لـ Google consent screen
3. بعد الموافقة → Google تعيد `authorization code` لـ `/api/google/callback`
4. الـ callback يتبادل الـ code بـ `access_token` + `refresh_token`
5. الـ tokens تُخزن في `AppSetting` (key: `google_tokens`)
6. الـ Agent Service يستخدم `refresh_token` لتجديد الـ access تلقائياً

### الملفات المرجعية

- `src/lib/google-calendar-service.ts` — OAuth + calendar.events.list/create/delete
- `src/app/api/google/auth/route.ts` — بدء OAuth flow
- `src/app/api/google/callback/route.ts` — استقبال callback
- `src/app/api/google/calendar/route.ts` — جلب/إنشاء أحداث
- `mini-services/agent-service/index.ts` — يستخدم googleapis مباشرة (Calendar + Gmail agents)

---

## [3] إعدادات GitHub Agent

### الصلاحيات المطلوبة لـ PAT (Personal Access Token)

أنشئ PAT من [GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens](https://github.com/settings/tokens?type=beta):

- **Repository access**: All repositories (أو repos محددة)
- **Permissions**:
  - `Contents`: Read-only (لفحص commits)
  - `Metadata`: Read-only (إلزامي)

> PAT كلاسيكي (classic) بـ `repo` scope يعمل أيضاً.

### أين يوضع الـ Token؟

```env
# .env (في جذر المشروع)
GITHUB_TOKEN="ghp_abcdef123456789..."
```

الـ Agent Service يقرأه عبر `process.env.GITHUB_TOKEN`.

يمكن أيضاً حفظه محلياً في المتصفح: Settings → الوكيل الذكي → GitHub Token input (يُخزن في localStorage).

---

## [4] تشغيل الـ Agent Service

### المتطلبات

```bash
cd mini-services/agent-service
bun install   # يثبت googleapis + @prisma/client
```

### ملف `.env` الخاص بالـ Agent

الـ Agent يقرأ من نفس `.env` الخاص بالمشروع الرئيسي. تأكد من وجود:

```env
DATABASE_URL="file:M:/mimo_storage/db/custom.db"
GITHUB_TOKEN="ghp_..."
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REDIRECT_URI="http://localhost:3000/api/google/callback"
GOOGLE_REFRESH_TOKEN="1//0g..."
```

### التشغيل بـ PM2 (الإنتاج)

```bash
# تثبيت PM2 (مرة واحدة)
npm install -g pm2

# تشغيل
pm2 start mini-services/agent-service/index.ts --name mimo-agent --interpreter bun

# حفظ (ليبدأ تلقائياً مع Windows)
pm2 save
pm2 startup

# مراقبة
pm2 logs mimo-agent
pm2 status

# إيقاف
pm2 stop mimo-agent
pm2 delete mimo-agent
```

### التشغيل بـ Bun (تطوير)

```bash
cd mini-services/agent-service
bun run dev   # = bun --hot index.ts (hot reload)
```

### التحقق من الصحة

```bash
# Health check
curl http://localhost:3030/health
# → {"status":"ok","agents":{"github":true,"calendar":true,"gmail":false}}

# فحص يدوي
curl -X POST http://localhost:3030/trigger
# → {"success":true,"message":"Agents triggered"}
```

### Agents المُفعّلة

| Agent | التكرار | الشرط | ماذا يفعل |
|-------|---------|-------|-----------|
| GitHub | 30 دقيقة | `GITHUB_TOKEN` موجود | يفحص آخر commits وينشئ Notification |
| Calendar | كل ساعة (6-10ص) | `GOOGLE_CLIENT_ID` + `GOOGLE_REFRESH_TOKEN` | يجلب أحداث اليوم الحقيقية |
| Gmail | 30 دقيقة | `GOOGLE_REFRESH_TOKEN` | يجلب إيميلات غير مقروءة + يصنفها |
| Overdue Tasks | 30 دقيقة | دائماً | يفحص المهام المتأخرة |

---

## [5] خريطة الـ API الحالية (108 routes)

### APIs الجديدة (التي أنشأها المطور السابع)

#### الذكاء الاصطناعي + الذاكرة
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/command` | POST | Command Engine — يحلل نص طبيعي → intent → ينفذ |
| `/api/ai-memory/index` | GET | إحصائيات فهرس الذاكرة (18+ جدول) |
| `/api/ai-memory/search?q=` | GET | بحث دلالي في الذاكرة |
| `/api/ai-memory/insights` | GET | رؤى يومية (+ `?ai=true` لرؤية GLM) |
| `/api/ai-coach/chat` | POST | محادثة AI + Context Injection من الذاكرة |
| `/api/ai-coach/query` | POST | استعلام بلغة طبيعية (stalled projects, overdue, etc.) |
| `/api/decisions/analyze` | GET | AI يحلل أنماط القرارات |

#### الإشعارات
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/notifications` | GET/POST/PUT/DELETE | CRUD للإشعارات + counts per section |
| `/api/notifications/generate` | POST | يولّد إشعارات تلقائية (مهام متأخرة + inbox + تذكيرات) |

#### Focus Center + Sessions
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/focus/start` | POST | يبدأ جلسة تركيز (FocusSession) |
| `/api/focus/end` | POST | ينهي الجلسة + يحفظ + يسجل ActivityEvent |
| `/api/focus/stats` | GET | إحصائيات اليوم/الأسبوع |
| `/api/sessions` | GET/POST/PUT/DELETE | CRUD للجلسات الذكية |
| `/api/sessions/start` | POST | يبدأ جلسة (يحفظ lastSession) |
| `/api/sessions/last` | GET | آخر جلسة نشطة |

#### Inbox + Life Replay
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/inbox` | GET/POST/DELETE | صندوق الوارد |
| `/api/inbox/suggest` | POST | إعادة توليد اقتراح AI |
| `/api/inbox/classify` | POST | تطبيق اقتراح (مفرد أو جماعي) |
| `/api/life-replay` | GET | شريط زمني (`?year=&month=`) |
| `/api/life-replay/search?q=` | GET | بحث في كل التاريخ |

#### Knowledge + Graph + Wiki
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/knowledge` | GET/POST/PUT/DELETE | CRUD قاعدة المعرفة |
| `/api/graph` | GET | nodes + links للخريطة البصرية |
| `/api/wiki` | GET/PUT | wiki + عناصر مرتبطة بـ tag |

#### Self Profile + Errors + Prompts
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/me` | GET/PUT | الملف الشخصي (bio, goals, strengths) + stats |
| `/api/errors` | GET/POST/PUT/DELETE | CRUD سجل الأخطاء |
| `/api/prompts` | GET/POST/PUT/DELETE | CRUD مكتبة البرومبتات |

#### Daily Assistant + Auto Journal
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/daily-assistant?type=start` | GET | مهام اليوم + اقتراح AI (صباح) |
| `/api/daily-assistant?type=end` | GET | ملخص اليوم + خطة الغد (مساء) |
| `/api/journal/auto-generate` | GET/POST | توليد يومية تلقائية (AI summary + stats) |
| `/api/now` | GET | بيانات صفحة "الآن" (مهام + مشروع + إحصائيات) |

#### Universal Search + OCR
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/search/universal?q=` | GET | بحث شامل (9 مصادر + OCR) |
| `/api/media/ocr` | POST | استخراج نص من صورة (tesseract.js) |

#### Activity + Analytics
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/activity` | GET/POST | سجل النشاط + stats |
| `/api/analytics` | GET | تحليلات (دراسة + مهام + مالية) |
| `/api/tasks/daily-suggestions` | GET | 3 اقتراحات مهام يومية |
| `/api/reminders/auto-generate` | POST | تذكيرات ذكية تلقائية |

#### النظام العام
| Route | Method | الوصف |
|-------|--------|-------|
| `/api/data/[section]` | GET/POST/PUT/DELETE | CRUD عام لكل الأقسام (generic) |
| `/api/data/init` | GET | تحميل كل البيانات دفعة واحدة |
| `/api/backup/*` | GET/POST | نسخ احتياطي (create/list/restore/download/stats/delete) |
| `/api/trash` | GET/POST/DELETE | سلة المهملات (move/restore/permanent delete) |
| `/api/uploads` | POST | رفع ملفات (+ chunked upload) |
| `/api/media/[fileName]` | GET | خدمة ملفات الوسائط |
| `/api/auth/*` | GET/POST | مصادقة (setup/verify/status/logout/change-password) |
| `/api/devices/*` | GET/POST/PUT | إدارة الأجهزة الموثوقة |

---

## [6] التحذيرات الحرجة

### ⚠️ خدمات تحتاج إعداد يدوي من قبل محمد

| الخدمة | الحالة | المطلوب |
|--------|--------|---------|
| **Firebase** | مؤجل | إنشاء مشروع + تطبيق Rules + نسخ env vars |
| **Google OAuth** | غير مُفعّل | إنشاء OAuth credentials + إكمال consent screen + OAuth flow |
| **Gmail Agent** | غير مُفعّل | يحتاج `GOOGLE_REFRESH_TOKEN` (يُحصل عليه بعد OAuth flow) |
| **GitHub Agent** | غير مُفعّل | يحتاج `GITHUB_TOKEN` في `.env` |
| **Agent Service** | غير مشغّل | `cd mini-services/agent-service && bun install && bun run dev` |
| **Web Push** | غير مُفعّل | يحتاج VAPID keys (generate + ضع في env) |
| **Dropbox Backup** | غير مُفعّل | يحتاج Dropbox App + OAuth flow |

### ⚠️ مشاكل معروفة

1. **Firebase Rules**: القواعد الحالية تسمح بالقراءة/الكتابة بدون مصادقة (لا يوجد Firebase Auth). هذا مقبول للاستخدام الشخصي لكن **غير آمن للمشاركة العامة**.

2. **Google Refresh Token**: يُحصل عليه مرة واحدة بعد OAuth flow. لو انتهت صلاحيته، يجب إعادة الـ flow. الـ Agent Service يستخدمه تلقائياً لتجديد access_token.

3. **tesseract.js (OCR)**: يعمل بـ server-side فقط. قد يكون بطيئاً على الصور الكبيرة. النص المستخرج يُخزن بـ `MediaItem.ocrText`.

4. **Windows + Turbopack**: قد يسبب `ChunkLoadError` عابر. الحل: `lazyWithRetry` في `section-registry.tsx` (يُعيد المحاولة 3 مرات).

5. **`bun run build`**: قد يفشل على Windows لو المسارات تستخدم `\` بدل `/`. تأكد من استخدام `/` في كل المسارات.

6. **MIMO_STORAGE_PATH**: على Windows يجب أن يكون `M:/mimo_storage` (بدون `/` في النهاية). على Linux: `${HOME}/.mimo_storage`.

### ⚠️ قواعد صارمة للتطوير الجديد

- **لا تستخدم** `console.log` → استخدم `console.debug`
- **لا تستخدم** `any` → استخدم Types صحيحة أو Zod
- **لا تستخدم** `db.delete()` مباشرة → استخدم `moveToTrashClient`
- **لا تستخدم** blue/indigo/sky → استخدم emerald/teal/amber
- **كل API route** يجب أن يستدعي `verifySessionToken`
- **كل قسم ثقيل** يجب أن يُلف بـ `React.memo`
- **كل `useAppStore`** بـ 3+ members يجب أن يستخدم `useShallow`

### 📁 ملفات مهمة للمرجع

| الملف | الوصف |
|------|-------|
| `ARCHITECTURE.md` | بنية المشروع الشاملة + Quick Start Guide |
| `.cursorrules` | قواعد مختصرة يلتزم بها Cursor AI تلقائياً |
| `.env.example` | قالب المتغيرات البيئية |
| `ecosystem.config.js` | إعدادات PM2 (لو موجود) |
| `docs/FIREBASE_SECURITY.md` | تفاصيل Firebase Rules |
| `docs/BACKUP_AUTOMATION.md` | تفاصيل النسخ الاحتياطي |
| `scripts/daily-backup.mts` | سكريبت النسخ الاحتياطي اليومي |
| `mini-services/agent-service/` | الـ Agent الخلفي (Bun, port 3030) |


---

## 🔒 Security Audit (August 2026)

تم إجراء تدقيق أمني شامل وإصلاح المشاكل الحرجة:

### ✅ تم إصلاحها:
1. SSRF protection (url-guard.ts)
2. Auth bypass في proxy.ts (pathname.includes fix)
3. حذف كلمة المرور من الريبو
4. Firebase rules تتطلب auth
5. auto-sync بدون --accept-data-loss
6. Defense-in-depth (withAuth wrapper)
7. Path traversal hardening
8. XSS headers + CSP
9. AI tool approval layer
10. Agent-service auth token
11. CORS allowlist (clip route)
12. timingSafeEqual (Zapier webhook)
13. Rolling session (proxy.ts)
14. Backup encryption connected
15. Quality gates enabled (tsconfig + eslint + CI)
16. 6 orphan Foundation modules connected

### ⚠️ يحتاج migration (مؤجل):
- Rate limit دائم (Prisma model)
- API key hashing (Prisma model change)
- Session revocation (Prisma model)
- Account lockout server-side (Prisma model)
