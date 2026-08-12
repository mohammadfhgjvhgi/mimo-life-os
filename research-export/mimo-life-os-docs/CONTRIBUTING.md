# 🤝 دليل المساهمة — MiMo Life OS

> هذا الدليل مخصص للوكلاء (AI Agents) الذين سيعملون على المشروع بالتوازي.

---

## [1] الإعداد الأولي (Clone + PAT)

### استنساخ المستودع

```bash
git clone https://github.com/mohammadfhgjvhgi/x7k2m9p3.git
cd x7k2m9p3
bun install
```

### إعداد GitHub PAT (Fine-grained)

1. اذهب إلى: GitHub → Settings → Developer settings → Fine-grained tokens
2. أنشئ token جديد:
   - **Name**: `mimo-agent-<your-name>`
   - **Expiration**: 90 يوم
   - **Repository access**: Only select repositories → `x7k2m9p3`
   - **Permissions**:
     - Contents: Read and Write
     - Pull requests: Read and Write
3. انسخ الـ token (يبدأ بـ `github_pat_`)

### حفظ الـ PAT محلياً

```bash
# طريقة 1: حفظ بـ git credential helper
git config credential.helper store
# عند أول push، أدخل:
# Username: mohammadfhgjvhgi
# Password: <الصق الـ PAT هنا>

# طريقة 2: استخدام الـ PAT بـ URL مباشرة (مؤقت)
git remote set-url origin https://<token>@github.com/mohammadfhgjvhgi/x7k2m9p3.git
```

> ⚠️ **لا تضع الـ PAT في ملفات الكود** — استخدم `git credential helper` فقط.

---

## [2] الرفع (Push) — قواعد صارمة

### قبل كل رفع:

```bash
# 1. اسحب آخر تحديثات (لتجنب التعارض)
git pull origin main --rebase

# 2. شغّل lint
bun run lint

# 3. شغّل build (لو الذاكرة تسمح)
bun run build

# 4. شغّل tests
bun run test
```

### الرفع:

```bash
git add -A
git commit -m "<emoji> <TASK-ID>: <description>"
git push origin main
```

> ⚠️ **لا تستخدم `--force` أبداً** — هذا يلغي commits الوكلاء الآخرين.
> لو فيه تعارض: `git pull --rebase origin main` ثم احلّ التعارض يدوياً.

---

## [3] قواعد الـ Commits

### الصيغة:
```
<emoji> <TASK-ID>: <short description>

<optional longer description>
```

### Emojis المعتمدة:
| Emoji | المعنى |
|-------|--------|
| 📋 | ميزة جديدة (feature) |
| 🐛 | إصلاح خطأ (bug fix) |
| 🎨 | تحسين تصميم (UI/UX) |
| ⚡ | تحسين أداء (performance) |
| 🛡️ | تحسين موثوقية (reliability) |
| 🔒 | تحسين أمان (security) |
| 📚 | توثيق (documentation) |
| ♻️ | إعادة هيكلة (refactor) |
| 🧪 | اختبارات (tests) |

### أمثلة:
```
✅ GOOD:
🐛 FIX: notification badge button-in-button HTML violation
⚡ UX-1: simplify quick capture + verify voice
🎨 UI-3: typography + spacing + RTL verified

❌ BAD:
fix
update
asdf
WIP
```

### قاعدة ذهبية:
> **كل مهمة = commit منفصل.** لا تدمج مهام متعددة في commit واحد.

---

## [4] الملفات المحظورة (Protected Files)

> ⚠️ **لا تعدّل هذه الملفات إلا بإذن صريح من المشرف.**

| الملف | السبب |
|-------|-------|
| `src/app/page.tsx` | نقطة الدخول الوحيدة — تعديلها يكسر الموقع كاملاً |
| `src/lib/store/index.ts` | الـ Zustand store الرئيسي — تعديلها يكسر كل الأقسام |
| `prisma/schema.prisma` | تعديل الـ schema بدون `db:push` يسبب drift |
| `src/lib/auth-edge.ts` | نظام المصادقة — تعديله يكسر كل الـ APIs |
| `src/lib/auth.ts` | نظام كلمات المرور |
| `src/lib/db.ts` | Prisma client singleton |
| `.env` | يحتوي أسرار (لا ترفعه أبداً) |
| `ecosystem.config.js` | إعدادات PM2 — تعديلها يوقف الخدمات |

### ملفات حساسة (تعديلها بحذر):
- `src/lib/store/slices/*.ts` — الـ Zustand slices
- `src/lib/section-factory.ts` — مصنع CRUD APIs
- `src/lib/sync-helpers.ts` — helpers الـ sync
- `src/app/api/data/[section]/route.ts` — الـ API العام

---

## [5] قبل كل Commit — Checklist

- [ ] `bun run lint` → 0 errors
- [ ] `bun run build` → exit 0 (أو dev server HTTP 200 لو الذاكرة محدودة)
- [ ] `bun run test` → 0 failures
- [ ] لا `console.log` (استخدم `console.debug` بدلاً منها)
- [ ] لا `any` types
- [ ] لا `eslint-disable`
- [ ] لا ألوان `blue`/`indigo`/`sky` (استخدم `teal`/`emerald`/`purple`)
- [ ] كل الأزرار تستخدم `confirm()` قبل الحذف
- [ ] كل الـ API routes محمية بـ `verifySessionToken`

---

## [6] الـ Sync التعاوني

### المشكلة:
عندما يرفع 15 وكيل commits بالتوازي، التعارضات حتمية.

### الحل:
1. **اسحب قبل الرفع**: `git pull --rebase origin main`
2. **ارفع فوراً**: لا تترك commits محلية لفترة طويلة
3. **لو تعارض**: احلّه بـ `git rebase --continue` بعد حلّ التعارض
4. **لا force push**: `git push --force` يلغي عمل الآخرين

### تسلسل العمل الموصى به:
```bash
# 1. اسحب
git pull origin main --rebase

# 2. شغّل
bun run dev

# 3. عدّل الكود
# (حرّك الملفات، اكتب الكود)

# 4. تحقق
bun run lint && bun run test

# 5. اسحب مرة ثانية (لو فيه commits جديدة)
git pull origin main --rebase

# 6. ارفع
git add -A
git commit -m "🐛 FIX: <description>"
git push origin main
```

---

## [7] تقرير الأخطاء

لو اكتشفت خطأ:
1. اقرأ سببه الجذري (root cause)
2. أصلحه
3. ارفع commit بـ رسالة واضحة
4. لو الخطأ حرج → ارفع فوراً بدون انتظار

### مستويات الخطورة:
| المستوى | المعنى | الوقت |
|---------|--------|------|
| 🔴 Critical | يكسر الموقع كاملاً | فوري |
| 🟠 High | يكسر ميزة مهمة | خلال ساعة |
| 🟡 Medium | يكسر ميزة ثانوية | خلال يوم |
| 🟢 Low | تحسين بسيط | عندما تتاح الفرصة |

---

## [8] المراجع

- **ARCHITECTURE.md** — البنية المعمارية الكاملة
- **HANDOFF.md** — تسليم المشروع (Firebase, Google Cloud, إلخ)
- **.cursorrules** — قواعد مختصرة لـ Cursor IDE
- **README.md** — نظرة عامة على المشروع

---

## ملخص سريع

```
1. git pull --rebase origin main
2. عدّل الكود
3. bun run lint && bun run test
4. git add -A && git commit -m "🐛 FIX: <desc>"
5. git push origin main
```

**لا force push. لا تعديل ملفات محظورة. لا رفع بدون lint.**
