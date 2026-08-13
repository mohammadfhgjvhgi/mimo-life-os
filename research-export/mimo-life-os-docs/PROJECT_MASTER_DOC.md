# 📋 MiMo Life OS — Master Project Document (Detailed Edition)

<div dir="rtl">

> **المرجع الأساسي والشامل لكل تفاصيل مشروع MiMo Life OS.**
> يحتوي على كل الأقسام، المسارات، المكتبات، النماذج، الأدوات، طرق الاستخدام، والمسارات التقنية.
> **مرجع للمطورين والخبراء للمستقبل.**

</div>

---

## 📊 الإحصائيات (مؤكدة بالفحص)

| المؤشر | العدد |
|--------|-------|
| **Git Commits** | 306+ |
| **Prisma Models** | 96 |
| **API Routes** | 158 |
| **Section Components** | 124 |
| **AI Lib Files** | 8 |
| **Total Lib Files** | 82 |
| **Test Files** | 24 (392+ tests) |
| **AI Providers** | 6 |
| **AI Tools** | 20 |
| **Hooks** | 7 |
| **@@index** | 297 |

---

## 🎯 1. الفكرة الأساسية والرؤية

- **المشروع**: نظام تشغيل حياة شخصي متكامل (Personal AI Operating System) لمحمد عادل.
- **المشكلة**: تشتت البيانات (Notion, Todoist, Excel, GitHub) وغياب أداة واحدة تفهم السياق الكامل.
- **الهدف**: نظام واحد يدير الحياة الرقمية بالكامل، خاص، آمن، مجاني، يعمل لـ 10 سنوات.
- **المستخدم**: مستخدم واحد (محمد)، طالب هندسة أتمتة صناعية (PLC, SCADA, PID).

---

## 📂 2. الأقسام (124 قسم — بالتفصيل)

### المجموعة 1: الرئيسية
1. **Dashboard**: إحصائيات شاملة، رسم بياني للنشاط، آخر الأنشطة، اختصارات سريعة، AI Insights.
2. **Now**: الحالة الحالية، مساعد صباحي/مسائي، ملخص اليوم.
3. **Inbox**: صندوق وارد لكل شيء، تصنيف AI تلقائي (مشروع/مهمة/فكرة/شهادة/كتاب).
4. **Sessions**: جلسات ذكية (تطوير/دراسة/تصميم) تفتح كل الأدوات + Dock (GitHub, ChatGPT).

### المجموعة 2: يومي
5. **Tasks**: مهام مع أولويات، تواريخ استحقاق، Kanban، DRIP Matrix، تأكيدات حذف.
6. **Ideas**: أفكار مع تصنيف حسب النوع، ربط بالمشاريع.
7. **Journal**: يوميات + يوميات تلقائية (AutoJournal) + تحليل مشاعر.
8. **Habits**: عادات + Habit Stacking (روتين صباحي/مسائي) + Heatmap سنوي.
9. **Finance**: مصاريف، دخل، ميزانيات شهرية، رسوم بيانية، اشتراكات تلقائية.

### المجموعة 3: دراستي ومهنتي
10. **Unified Academic**: فصول، مواد، واجبات، درجات، مكتبة، مشاريع جامعية، دكاترة، جدول.
11. **Unified Library**: مكتبة وسائط (صور، فيديو، ملفات)، رفع، بحث.
12. **Unified Career**: وظائف، مقابلات، خطة مهنية، علاقات، عروض عمل.

### المجموعة 4: أهدافي
13. **Vision**: أهداف شخصية + رؤية.
14. **Decision Log**: قرارات محسّنة (options + pros/cons + reason + rating).
15. **Time Tracking**: تتبع الوقت + تحليلات + Heatmap.
16. **Smart Reminders**: تذكيرات ذكية + توليد تلقائي.
17. **Focus Room**: غرفة تركيز معزولة (Fullscreen) + بومودورو (25/5/15) + AI Notes.
18. **Shutdown Ritual**: طقس إغلاق اليوم (4 خطوات: مراجعة + دقة الوقت + Brain Dump + إغلاق).
19. **Identity System**: نظام الهوية (CRUD + توكيدات + معتقدات + محظورات + ربط بالعادات).

### المجموعة 5: ذكاء
20. **Unified AI**: مساعد ذكي موحد (6 نماذج + streaming + artifacts + voice + vision).
21. **Universal Capture**: التقاط ذكي (Ctrl+Shift+U) — اكتب أي شي، AI يصنفه ويحفظه.
22. **Unified Knowledge**: ملاحظات + ذاكرة ذكية + خريطة معرفة + Wiki.
23. **AI Reports**: تقارير أداء أسبوعية/شهرية (5 أبعاد: self-perception + emotions + energy + focus→revenue + recommendations).
24. **Analytics**: إحصائيات + رسوم بيانية + Radar + Heatmap.
25. **Health Tracker**: صحة + سجلات طبية + اكتشاف علاقات (نوم→مزاج).
26. **Timeline**: شريط زمني + ذاكرة الأيام + Heatmap.
27. **Vision Discovery**: استخراج الرؤية من 30 دقيقة تفكير عشوائي.
28. **Second Brain (RAG)**: بحث ذكي في 12+ جدول (مهام، ملاحظات، مشاريع، إلخ).
29. **Priority Engine**: ترتيب ICE (Impact × Confidence × Ease) + مصفوفة DRIP (4 مربعات).
30. **Brain Dump**: تحليل تفريغ العقل المسائي (مشاعر + مهام + shutdown message).
31. **Unified Integrations**: GitHub + Google Calendar + Dropbox.

### المجموعة 6: النظام
32. **System Health**: صحة النظام (DB + تخزين + backup + integrity).
33. **Vault**: خزنة كلمات مرور (AES-256-GCM).
34. **Archive / Trash**: أرشيف + محذوفات (30 يوم قبل الحذف النهائي).
35. **Unified Sharing**: مشاركة انتقائية + Portfolio عام + QR Codes.
36. **Unified Backup**: نسخ احتياطي (ZIP مشفر) + استعادة + لقطات سنوية.
37. **Settings**: إعدادات + أجهزة موثوقة + سجل دخول + API keys.
38. **Errors**: سجل أخطاء + سبب + حل.
39. **Prompts**: مكتبة برومبتات + متغيرات.

*(باقي الأقسام هي أقسام فرعية أو مدموجة ضمن المجموعات أعلاه، مثل: courses, homework, grades, professors, skills, certificates, languages, resume, linkedin-export, open-format-export, selective-sharing, qr-codes, public-portfolio, data-integrity, restore-wizard, yearly-snapshots، إلخ.)*

---

## 🛣️ 3. مسارات الـ API (158 Route — بالتفصيل)

### المصادقة (Auth)
- `POST /api/auth/setup` — إعداد كلمة المرور لأول مرة
- `POST /api/auth/verify` — تسجيل الدخول (إنشاء HMAC session)
- `GET /api/auth/status` — فحص حالة كلمة المرور
- `POST /api/auth/change-password` — تغيير كلمة المرور
- `POST /api/auth/logout` — تسجيل الخروج
- `POST /api/master-password/setup` — إعداد Master Password للخزنة
- `GET /api/master-password/status` — حالة Master Password
- `POST /api/master-password/verify` — التحقق من Master Password

### البيانات (Data CRUD)
- `GET /api/data/[section]` — جلب بيانات أي قسم (مع pagination + search + caching)
- `POST /api/data/[section]` — إنشاء عنصر
- `PUT /api/data/[section]` — تحديث عنصر
- `DELETE /api/data/[section]` — حذف عنصر (يذهب لـ Trash)
- `POST /api/data/[section]/batch` — إنشاء/حذف متعدد
- `GET /api/data/init` — تحميل كل البيانات دفعة واحدة (Promise.all)
- `POST /api/data/db-backup` — نسخة احتياطية DB

### الذكاء الاصطناعي (AI)
- `POST /api/ai-chat/quick` — محادثة ذكية (Streaming SSE + tools + reasoning)
- `GET/POST /api/ai-chat/sessions` — إدارة جلسات المحادثة
- `POST /api/ai-coach/chat` — دردشة مع المدرب
- `POST /api/ai-coach/query` — استعلام بلغة طبيعية
- `GET /api/ai-coach/patterns` — تحليل أنماط الإنتاجية
- `POST /api/ai-coach/insight` — توليد رؤية ذكية
- `GET/POST /api/ai-memory/search` — بحث بالذاكرة
- `GET /api/ai-memory/index` — فهرس الذاكرة
- `GET /api/ai-memory/insights` — رؤى الذاكرة
- `POST /api/ai/tasks` — AI اقتراح مهام
- `POST /api/ai/notes` — AI تحليل ملاحظات
- `POST /api/ai/finance` — AI تحليل مالي
- `POST /api/ai/habits` — AI تحليل عادات
- `POST /api/ai/journal` — AI تحليل يوميات
- `POST /api/ai/projects` — AI تخطيط مشاريع
- `GET /api/ai/dashboard` — AI ملخص اليوم
- `POST /api/ai/study/explain` — شرح مفهوم دراسي
- `POST /api/ai/study/flashcards` — توليد بطاقات مراجعة
- `POST /api/ai/study/plan` — خطة دراسية
- `POST /api/ai/study/quiz` — اختبار قصير
- `POST /api/ai/study/summarize` — تلخيص محاضرة

### الوكيل (Agent)
- `POST /api/agent/browse` — تصفح موقع ويب (Web Agent)
- `POST /api/agent/calendar` — إدارة التقويم
- `POST /api/agent/email` — إدارة الإيميل

### الرؤى (Insights)
- `GET /api/insights/daily` — رؤى يومية
- `GET /api/insights/weekly` — رؤى أسبوعية
- `GET /api/insights/notifications` — إشعارات ذكية
- `POST /api/insights/classify` — تصنيف نص
- `POST /api/insights/suggest-links` — اقتراح روابط بين الكيانات
- `POST /api/insights/suggest-tags` — اقتراح وسوم

### العقل الثاني (RAG)
- `POST /api/second-brain/query` — بحث ذكي بـ 12+ جدول

### الرؤية (Vision)
- `POST /api/vision/analyze` — تحليل صورة (Gemini / Llama 4 Scout)
- `POST /api/vision/discover` — استخراج رؤية من تفكير عشوائي

### الأولويات (Priority)
- `POST /api/priority/ice` — ترتيب ICE (Impact × Confidence × Ease)
- `POST /api/priority/drip` — تصنيف DRIP Matrix

### تفريغ العقل (Brain Dump)
- `POST /api/brain-dump/analyze` — تحليل (مشاعر + مهام + shutdown message)

### البحث (Search)
- `POST /api/search/universal` — بحث شامل بـ OCR
- `POST /api/web-search` — بحث DuckDuckGo

### الملفات والرفع (Uploads)
- `POST /api/uploads` — رفع ملف
- `POST /api/uploads/chunk` — رفع ملف كبير (chunked)
- `GET /api/media/[fileName]` — جلب ملف
- `GET /api/media/ocr` — OCR على صورة
- `GET /api/media/storage-info` — معلومات التخزين
- `GET /api/files/index` — فهرس الملفات

### النسخ الاحتياطي (Backup)
- `POST /api/backup/create` — إنشاء نسخة ZIP
- `GET /api/backup/list` — قائمة النسخ
- `GET /api/backup/download` — تحميل نسخة
- `POST /api/backup/restore` — استعادة نسخة
- `DELETE /api/backup/delete` — حذف نسخة
- `GET /api/backup/stats` — إحصائيات النسخ
- `POST /api/snapshots/create` — لقطة يدوية
- `GET /api/snapshots/yearly` — لقطات سنوية تلقائية

### التكاملات (Integrations)
- `GET/POST /api/github/repos` — سحب repos
- `POST /api/github/sync` — مزامنة GitHub
- `POST /api/github/archive` — أرشفة شهرية
- `GET/POST /api/google/auth` — OAuth Google Calendar
- `GET /api/google/callback` — OAuth callback
- `GET/POST /api/google/calendar` — مزامنة التقويم
- `GET/POST /api/dropbox/auth` — OAuth Dropbox
- `GET /api/dropbox/callback` — OAuth callback
- `POST /api/dropbox/upload` — رفع لـ Dropbox

### الأمان والأجهزة (Security & Devices)
- `POST /api/devices/register` — تسجيل جهاز
- `GET /api/devices/pending` — أجهزة بانتظار الموافقة
- `POST /api/devices/approve` — الموافقة على جهاز
- `POST /api/devices/reject` — رفض جهاز
- `POST /api/devices/cleanup` — تنظيف أجهزة قديمة
- `GET /api/login-history` — سجل الدخول
- `GET/POST /api/trusted-devices` — الأجهزة الموثوقة

### الإشعارات (Notifications)
- `GET /api/notifications` — جلب الإشعارات
- `POST /api/notifications/generate` — توليد إشعارات ذكية
- `POST /api/notifications/process-smart` — معالجة الإشعارات الذكية
- `POST /api/notifications/send` — إرسال Push Notification
- `POST /api/notifications/subscribe` — اشتراك Push
- `POST /api/notifications/unsubscribe` — إلغاء اشتراك
- `GET /api/notifications/vapid-key` — مفتاح VAPID

### العلاقات والوسوم (Relations & Tags)
- `GET/POST /api/relations` — روابط بين الكيانات
- `GET /api/relations/all` — كل الروابط
- `POST /api/relations/auto-link` — ربط تلقائي (AI)
- `GET/POST /api/tags` — وسوم عامة
- `POST /api/auto-tag` — وسم تلقائي (AI)

### أدوات مساعدة
- `POST /api/command` — تنفيذ أمر نصي (Command Engine)
- `GET /api/now` — الحالة الحالية
- `POST /api/daily-assistant` — مساعد صباحي/مسائي
- `GET /api/life-replay` — ذاكرة الأيام
- `POST /api/life-replay/search` — بحث بالشريط الزمني
- `GET /api/graph` — خريطة معرفة بصرية
- `GET /api/wiki` — Wiki شخصي
- `GET /api/knowledge` — قاعدة المعرفة
- `POST /api/inbox/classify` — تصنيف AI للـ Inbox
- `POST /api/inbox/suggest` — اقتراحات للـ Inbox
- `POST /api/decisions/analyze` — تحليل قرارات
- `POST /api/reminders/smart-generate` — توليد تذكيرات
- `GET /api/tasks/daily-suggestions` — اقتراحات مهام يومية
- `GET /api/analytics` — تحليلات
- `POST /api/finance/forecast` — توقع مالي
- `POST /api/flashcards/review` — مراجعة بطاقات
- `POST /api/focus/start` — بدء جلسة تركيز
- `POST /api/focus/end` — إنهاء جلسة
- `GET /api/focus/stats` — إحصائيات التركيز
- `POST /api/screenshot` — التقاط شاشة
- `POST /api/clip` — حفظ مقطع
- `GET/POST /api/prompts` — مكتبة البرومبتات
- `GET/POST /api/templates` — القوالب
- `GET/POST /api/snippets` — مقتطفات كود
- `GET/POST /api/glossary` — مسرد مصطلحات
- `GET/POST /api/inventory` — مخزون
- `GET/POST /api/wish-list` — قائمة أمنيات
- `GET /api/me` — بيانات شخصية
- `POST /api/sync/pull` — مزامنة Firebase
- `POST /api/sync/pull-images` — مزامنة الصور
- `GET/POST /api/integrity/check` — فحص سلامة البيانات
- `POST /api/integrity/fix` — إصلاح تلقائي
- `POST /api/integrity/auto-check` — فحص تلقائي
- `GET/POST /api/export/markdown` — تصدير Markdown
- `GET/POST /api/export/csv` — تصدير CSV
- `GET/POST /api/export/all-formats` — تصدير شامل
- `GET/POST /api/export/ical` — تصدير iCalendar
- `GET/POST /api/export/linkedin` — تصدير LinkedIn
- `GET/POST /api/api-keys` — إدارة API keys
- `GET/POST /api/versions` — إصدارات
- `POST /api/webhooks/zapier` — Webhook Zapier

---

## 📚 4. المكتبات (82 Lib File — بالتفصيل)

### الذكاء الاصطناعي (AI)
1. `ai-provider.ts` (29KB) — 6 مزودين (Groq, Cerebras, Cloudflare, Gemini, NVIDIA, OpenRouter) + Fallback Chain + Streaming + Reasoning + Vision
2. `ai-service.ts` (34KB) — منطق الـ AI + شخصية "ميمو" + سياق + ذاكرة + محادثة + أدوات
3. `ai-tools.ts` (28KB) — 20 أداة (create_task, browse_website, search_youtube, إلخ)
4. `ai-router.ts` (7KB) — Smart Routing (7 أنواع مهام → أفضل مزود)
5. `ai-insights-engine.ts` (10KB) — توليد رؤى يومية/أسبوعية
6. `ai-proactive.ts` (6KB) — إشعارات استباقية (مهام متأخرة، عادات متروكة)
7. `ai-reports.ts` (10KB) — تقارير أداء (5 أبعاد)
8. `ai-everywhere.ts` (4KB) — ربط AI بـ 7 أقسام

### الـ Agent والـ Web
9. `web-agent.ts` — تصفح المواقع (fetch + HTML parsing)
10. `web-search.ts` — بحث DuckDuckGo
11. `auto-organizer.ts` — تصنيف وربط الكيانات تلقائياً
12. `rag-engine.ts` — RAG (بحث ذكي بـ 12+ جدول)
13. `vision-analyzer.ts` — تحليل الصور
14. `vision-discovery.ts` — استخراج الرؤية
15. `brain-dump-analyzer.ts` — تحليل تفريغ العقل
16. `priority-engine.ts` — ICE + DRIP
17. `tag-suggester.ts` — اقتراح وسوم
18. `cross-linker.ts` — اقتراح روابط
19. `command-engine.ts` — 10 intents + LLM fallback
20. `command-parser.ts` — تحليل الأوامر النصية
21. `study-ai.ts` — أدوات دراسية (شرح، بطاقات، اختبارات، تلخيص)
22. `media-analyzer.ts` — تحليل الوسائط
23. `video-extractor.ts` — استخراج frames من فيديو

### الأمان
24. `auth-server.ts` — bcrypt + sessions
25. `auth-edge.ts` — HMAC verification (Edge runtime)
26. `auth.ts` — Client auth helpers
27. `encryption.ts` — AES-256-GCM
28. `device-fingerprint.ts` — بصمة الجهاز
29. `rate-limit.ts` — Rate limiting
30. `validators.ts` — Zod validation
31. `public-api.ts` — Public API auth

### البيانات
32. `db.ts` — Prisma client
33. `section-factory.ts` — CRUD موحد (createCrudApiHandler)
34. `cache.ts` — In-memory TTL cache
35. `data-integrity.ts` — فحص سلامة البيانات (11 فحص)
36. `integrity-checker.ts` — فحص الـ orphan records
37. `relations-tags.ts` — روابط + وسوم
38. `constants.ts` — مسارات API + ألوان + أحجام

### الذاكرة
39. `memory-collect.ts` — جمع بيانات من 18+ جدول
40. `memory-index.ts` — فهرس الذاكرة
41. `life-replay.ts` — ذاكرة الأيام
42. `life-replay-collect.ts` — جمع بيانات Life Replay

### النسخ الاحتياطي
43. `auto-backup.ts` — ZIP backup (50 جدول)
44. `backup-scheduler.ts` — backup يومي + integrity أسبوعي
45. `backup-encryption.ts` — تشفير النسخ (AES-256-GCM)

### التكاملات
46. `github-service.ts` — GitHub API
47. `google-calendar-service.ts` — Google Calendar API
48. `dropbox-service.ts` — Dropbox API
49. `firebase-sync.ts` — Firebase sync
50. `image-sync.ts` — مزامنة الصور

### الأدوات المساعدة
51. `activity-engine.ts` — تسجيل النشاطات
52. `activity-tracker.ts` — تتبع النشاط (Client)
53. `inbox-classifier.ts` — تصنيف Inbox
54. `inbox-rules.ts` — قواعد التصنيف
55. `notifications.ts` — نظام الإشعارات
56. `notifications-client.ts` — Client notifications
57. `ocr-service.ts` — OCR (tesseract.js)
58. `receipt-ocr.ts` — OCR للفواتير
59. `pdf-generator.ts` — توليد PDF
60. `voice-service.ts` — Web Speech API
61. `pomodoro.ts` — مؤقت بومودورو
62. `focus-store.ts` — Zustand store للتركيز
63. `weekly-report-generator.ts` — تقارير أسبوعية
64. `scheduler.ts` — جدولة المهام
65. `subscription-helper.ts` — حساب الاشتراكات
66. `fuzzy-search.ts` — بحث ضبابي + Arabic normalization
67. `wiki-links.ts` — WikiLinks (`[[note:]]`)
68. `lazy-with-retry.ts` — Lazy loading مع retry
69. `format.ts` — تنسيق التواريخ والأرقام
70. `date-utils.ts` — أدوات التواريخ
71. `export-utils.ts` — أدوات التصدير
72. `frontmatter.ts` — YAML frontmatter
73. `frontmatter-client.ts` — Client frontmatter
74. `receipt-ocr.ts` — OCR للفواتير
75. `model-registry.ts` — قائمة الـ 6 مزودين + models
76. `quick-capture-store.ts` — Zustand للـ QuickCapture
77. `universal-capture-store.ts` — Zustand للـ Universal Capture
78. `sessions-store.ts` — Zustand للجلسات
79. `toast-store.ts` — Zustand للـ Toasts
80. `loading-store.ts` — Zustand للـ Loading states
81. `notification-counts-store.ts` — Zustand لعدد الإشعارات
82. `utils.ts` — cn() + أدوات عامة

---

## 🗄️ 5. نماذج قاعدة البيانات (96 Prisma Model)

### المهام والمشاريع
1. Task — مهام (text, priority, difficulty, dueDate, recurring, kanbanColumn, tags, subtasks, editHistory)
2. Project — مشاريع (title, description, status, technologies, links, images, ICE scoring)
3. Idea — أفكار (title, description, type, tags)
4. Note — ملاحظات (title, content, tags, encrypted)
5. Homework — واجبات (title, description, attachments, dueDate)

### الدراسة
6. UniversitySemester — فصول (courses JSON)
7. Course — مواد (name, description, schedule, links)
8. Lecture — محاضرات (title, description, date)
9. Professor — دكاترة (name, email, phone)
10. Grade — درجات (title, score, maxScore)
11. AcademicResource — موارد أكاديمية (title, type, url)
12. UniversityProject — مشاريع جامعية (title, description)
13. Scholarship — منح (name, description, requirements)
14. Tawjihi — توجيهي (subjects, grades)
15. Flashcard — بطاقات مراجعة (front, back, deck)

### المهنة
16. JobApplication — طلبات توظيف (company, position, status)
17. JobOffer — عروض عمل (company, position, salary)
18. InterviewRecord — مقابلات (date, notes)
19. Contact — علاقات مهنية (name, email, phone, company)
20. WorkExperience — خبرات (company, position, description, skills)
21. VolunteerActivity — تطوع (title, description, skills)
22. Certificate — شهادات (name, issuer, date)
23. Skill — مهارات (name, level, evolution)
24. Language — لغات (name, level)
25. Achievement — إنجازات (title, description)
26. Failure — إخفاقات (title, description)
27. CareerGoal — أهداف مهنية (title, description)

### المالية
28. Transaction — معاملات (amount, type, description, category)
29. Budget — ميزانيات (name, amount, period)
30. Subscription — اشتراكات (name, amount, billingCycle, nextPaymentDate)
31. Meal — وجبات (name, calories, protein, carbs, fat)
32. Ingredient — مكونات (name, calories, protein, carbs, fat)

### الإنتاجية
33. Habit — عادات (name, routine, sequenceOrder, repeatDays, identityId)
34. JournalEntry — يوميات (title, content, mood, gratitudes)
35. AutoJournalEntry — يوميات تلقائية (summary, stats)
36. Decision — قرارات (title, description, options, pros, cons, rating)
37. OKR — أهداف ونتائج (title, description, keyResults)
38. PersonalGoal — أهداف شخصية (title, description)
39. TimeEntry — تتبع الوقت (description, duration, category)
40. FocusSession — جلسات تركيز (taskId, projectId, durations)
41. WorkSession — جلسات عمل (description, duration)
42. SmartReminder — تذكيرات ذكية (title, description, time)
43. SmartSession — جلسات ذكية (type, config)
44. Identity — هويات (title, affirmations, beliefsToRemove, offLimit)

### الذكاء الاصطناعي
45. AIConversation — محادثات AI (role, content, context)
46. AIChatSession — جلسات محادثة (title, messages)
47. AIInsight — رؤى AI (type, title, content, source, category)
48. AgentTask — مهام الوكيل (type, status, input, output)
49. ScrapeResult — نتائج التصفح (url, title, content, screenshot)
50. EmailLog — سجل الإيميل (from, to, subject, body)
51. CalendarEvent — أحداث التقويم (title, startTime, endTime, source)
52. PromptEntry — مكتبة البرومبتات (title, content, variables)
53. Template — قوالب (name, content)
54. CodeSnippetEntry — مقتطفات كود (title, code, language)

### المعرفة
55. KnowledgeEntry — قاعدة المعرفة (title, content, tags)
56. CanvasNode — عقد Canvas (type, position, data)
57. CanvasEdge — روابط Canvas (source, target)
58. GlossaryEntry — مسرد مصطلحات (term, definition)
59. ReadingItem — قراءة (title, author, status)
60. WishlistItem — أمنيات (title, description)

### الوسائط والملفات
61. MediaItem — وسائط (name, type, url, description, tags)
62. MediaFolder — مجلدات وسائط (name, parentId)
63. Attachment — مرفقات (fileName, fileType, fileSize, url)

### الأمان
64. VaultItem — خزنة (title, content, type, encrypted)
65. SecureDocument — وثائق مشفرة (title, content, encrypted)
66. TrustedDevice — أجهزة موثوقة (fingerprint, name, approved)
67. DeviceApprovalRequest — طلبات موافقة (fingerprint, name)
68. DeviceInventoryItem — مخزون أجهزة (name, type, specs)
69. LoginHistory — سجل الدخول (ip, userAgent, success)
70. ApiKey — مفاتيح API (name, key, permissions)
71. SharedLink — روابط مشاركة (section, itemId, token)

### النظام
72. AppSetting — إعدادات (key, value)
73. ActivityEvent — سجل النشاط (type, section, itemId, metadata)
74. TrashItem — سلة المهملات (section, itemData, deletedAt)
75. VersionHistory — إصدارات (entityType, entityId, version, data)
76. ErrorLog — سجل الأخطاء (error, stack, context)
77. DataIntegrityLog — سجل سلامة البيانات (check, result)
78. Notification — إشعارات (title, message, type, read)
79. NotificationSubscription — اشتراكات Push (endpoint, keys)
80. CloudBackup — نسخ سحابية (provider, url, date)
81. YearlySnapshot — لقطات سنوية (year, data)
82. GitHubSync — مزامنة GitHub (repo, date, status)
83. GoogleCalendarSync — مزامنة التقويم (eventId, syncStatus)
84. PortfolioConfig — إعدادات Portfolio (bio, goals, strengths)

### العلاقات والوسوم
85. ItemRelation — روابط بين الكيانات (fromType, fromId, toType, toId, type, reason)
86. ItemTag — وسوم على الكيانات (section, itemId, tag)
87. UniversalTag — وسوم عامة (name, color)

### الـ Vision
88. VisionItem — عناصر الرؤية (title, type, subTasks)

### الصحة
89. HealthEntry — صحة (type, value, notes, date)
90. MedicalRecord — سجلات طبية (title, description, date)

### أخرى
91. Place — أماكن (name, address, description, images)
92. ScheduleEvent — جدول (title, startTime, endTime, location)
93. Inventory — مخزون (name, quantity, unit, category)
94. WeeklyReport — تقارير أسبوعية (summary, stats, date)
95. WeeklyReviewEntry — مراجعات أسبوعية (content, date)
96. CommandLog — سجل الأوامر (command, result, date)

---

## 🪝 6. الـ Hooks (7 hooks)

1. `use-crud.ts` — إنشاء/تحديث/حذف + optimistic + toast
2. `use-debounce.ts` — Debounce للبحث
3. `use-error-monitor.ts` — مراقبة الأخطاء
4. `use-mobile.ts` — كشف الموبايل
5. `use-pagination.ts` — Pagination
6. `use-section-data.ts` — جلب بيانات قسم + cache + reload
7. `use-toast.ts` — Toast notifications

---

## 🤖 7. الذكاء الاصطناعي بالتفصيل

### المزودون الـ 6:
| المزود | الحصة | الـ SDK | الاستخدام |
|--------|-------|---------|-----------|
| Groq | 14K/يوم | groq-sdk | محادثة + عربية + tools |
| Cerebras | 1M tokens/يوم | fetch | أسرع 20x + reasoning |
| Cloudflare | 100K/يوم | fetch | سياق طويل |
| Gemini | 1,500/يوم | @google/generative-ai | Vision + سياق طويل |
| NVIDIA | 1,000/شهر | fetch | backup + reasoning |
| OpenRouter | free models | fetch | backup أخير |

### Smart Routing (7 أنواع):
1. `chat` → Groq (سريع)
2. `reasoning` → Cerebras (تفكير عميق)
3. `vision` → Gemini (صور)
4. `tool_call` → Groq (أدوات)
5. `long_context` → Gemini (سياق طويل)
6. `fast` → Groq (الأسرع)
7. `arabic` → Groq (عربية)

### الـ 20 أداة:
create_task, create_note, search_data, create_reminder, add_transaction, update_task, analyze_image, browse_website, scrape_url, search_youtube, search_github, translate, summarize, extract_text_from_image, web_search, create_vision_item, create_brain_dump, generate_insight, create_goal, create_habit

### ميزات AI:
- Fallback Chain (6 مستويات)
- Streaming SSE (ردود تدريجية)
- Reasoning Mode (DeepSeek R1)
- Vision (Gemini / Llama 4 Scout)
- RAG (12+ جدول)
- Web Agent (تصفح مواقع)
- Auto-Organizer (تصنيف + ربط)
- Proactive AI (إشعارات)
- AI Insights (daily + weekly)
- AI Everywhere (7 أقسام)
- شخصية "ميمو" + تخصص هندسة أتمتة

---

## 🔐 8. الأمان بالتفصيل

### طبقات الحماية:
1. **bcrypt** (12 rounds) + ترقية تلقائية من SHA-256
2. **HMAC-SHA256** session tokens + httpOnly cookies
3. **AES-256-GCM** (Web Crypto API) للبيانات الحساسة
4. **Master Password** + PBKDF2 (100k iterations) للخزنة
5. **Trusted Devices** (بصمة SHA-256 + تأصيل 6 أرقام)
6. **verifySessionToken** على كل الـ 158 routes
7. **Rate Limiting** على AI + uploads + public API
8. **Zapier webhook** secret إجباري (16+ chars)
9. **Google OAuth** state validation (CSRF)
10. **Path traversal** protection
11. **SSRF** protection
12. **Input validation** (Zod)

---

## 💾 9. البيانات والتخزين

### مصدر الحقيقة: SQLite (عبر Prisma)
- المسار: `M:/mimo_storage/db/custom.db`
- النماذج: 96
- الـ indexes: 297

### الملفات:
- المسار: `M:/mimo_storage/uploads/`
- الرفع: `/api/uploads` + chunked uploader
- الأنواع: صور، فيديو، صوت، PDF، مستندات

### النسخ الاحتياطي:
- تلقائي يومي (backup-scheduler)
- ZIP مشفر (AES-256-GCM)
- يغطي 50 جدول
- لقطات سنوية (31 ديسمبر)
- استعادة (Restore Wizard)

### سياسة الاحتفاظ:
- نشط (0-30 يوم) → مؤجل (30-90) → أرشيف (90+) → نسخة سنوية → حذف يدوي

---

## 🎨 10. التصميم والواجهة

- **الألوان**: emerald / teal / amber (ممنوع blue/indigo)
- **الخط**: Cairo (عربي) + RTL كامل
- **الأسلوب**: Awwwards-inspired (soft shadows, warm gradients, organic layouts)
- **Dark/Light Mode**: مدعوم
- **Responsive**: موبايل + تابلت + كمبيوتر
- **PWA**: Service Worker + manifest + offline
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 11. التشغيل

```bash
git clone https://github.com/mohammadfhgjvhgi/x7k2m9p3.git
cd x7k2m9p3
bun install
bun run db:push
cp .env.example .env
# أضف Groq key على الأقل
bun run dev
```

---

## 📝 12. ملاحظات للمطورين

1. **Z.ai مرفوض نهائياً** — تمت إزالته 3 مرات
2. **الـ AI شخصية "ميمو"** — تخصص هندسة أتمتة صناعية (PLC, SCADA, PID)
3. **392+ tests تمر** + **0 lint errors**
4. **الـ fallback chain شغّال**: Groq → Cerebras → Cloudflare → Gemini → NVIDIA → OpenRouter
5. **ما تحذف بيانات أبداً** — أي bug بحذف = كارثة
6. **الـ section-factory.ts** هو قلب الـ CRUD — `createCrudApiHandler`
7. **البيانات على قرص M: 300GB**

---

<div dir="rtl" align="center">

**MiMo Life OS — Master Project Document v2.0 (Detailed)**  
صُنع بـ ❤️ لمحمد عادل 🇵🇸

</div>
