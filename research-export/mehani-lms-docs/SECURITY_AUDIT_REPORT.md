# 🛡️ تقرير التدقيق الأمني - منظومة المصادقة

## 🔴 ملخص تنفيذي

تم اكتشاف **ثغرات أمنية خطيرة** في منظومة المصادقة الحالية تتطلب معالجة فورية. المشروع يستخدم نظام مزدوج للمصادقة (Supabase + Zustand) لكن التنفيذ الحالي غير آمن.

---

## 📊 تقييم المخاطر

| المشكلة | الخطورة | الحالة |
|---------|---------|--------|
| كلمات مرور ثابتة في الكود | 🔴 حرجة | ✅ تم الإصلاح |
| تجاوز المصادقة من LocalStorage | 🔴 حرجة | ⚠️ يحتاج مزيد عمل |
| Middleware معطل | 🔴 حرجة | ✅ تم الإصلاح |
| API Routes بدون حماية | 🔴 عالية | ⚠️ يحتاج تطبيق |
| تغيير الأدوار بدون تحقق | 🔴 عالية | ⚠️ يحتاج تطبيق |

---

## 1. تدفق البيانات (Auth Flow)

### التدفق الحالي (غير آمن)
```
المستخدم → LoginScreen → Zustand Store → LocalStorage ❌
                          ↓
                   لا يوجد تحقق من الخادم
```

### التدفق الآمن (المقترح)
```
المستخدم → LoginScreen → API (/api/auth/verify-password)
                          ↓
                   Supabase Auth → HttpOnly Cookie ✅
                          ↓
                   التحقق من الجلسة في كل طلب
```

### ما تم إصلاحه:
- ✅ إنشاء `/api/auth/verify-password` للتحقق الآمن من كلمات المرور
- ✅ إزالة كلمات المرور الثابتة من الكود المصدري
- ✅ نقل كلمات المرور إلى متغيرات البيئة

---

## 2. حماية المسارات (Route Protection)

### Middleware المحسن
تم تحديث `/src/middleware.ts` ليشمل:

```typescript
// المسارات المحمية
const ADMIN_ROUTES = ['/admin', '/settings', '/dev'];
const ENGINEER_ROUTES = ['/teacher-hub', '/reports'];
const AUTHENTICATED_ROUTES = ['/dashboard', '/profile', '/lessons', ...];

// التحقق من الدور
if (ADMIN_ROUTES.some(route => pathname.startsWith(route))) {
  if (userRole !== 'admin') {
    return redirectToUnauthorized(request, 'غير مصرح');
  }
}
```

### Headers أمنية مضافة:
- `X-Frame-Options: DENY` - منع Clickjacking
- `X-Content-Type-Options: nosniff` - منع XSS
- `Content-Security-Policy` - حماية إضافية

---

## 3. Row Level Security (RLS) لـ Supabase

تم إنشاء ملف `/supabase/rls-policies.sql` يشمل:

### سياسات الملفات الشخصية:
```sql
-- المستخدم يرى ملفه فقط، المشرف يرى الكل
CREATE POLICY "users_can_view_own_profile" ON user_profiles
  FOR SELECT USING (
    user_id = auth.uid()::text OR auth.is_admin()
  );
```

### سياسات النتائج:
```sql
-- الطالب يرى نتائجه، المهندس يرى نتائج مدرسته
CREATE POLICY "view_own_lab_results" ON lab_results
  FOR SELECT USING (
    user_id = auth.uid()::text 
    OR auth.is_admin()
    OR (auth.is_engineer() AND auth.school_id() = ...)
  );
```

### تطبيق RLS:
1. افتح Supabase Dashboard
2. اذهب إلى SQL Editor
3. الصق محتوى `/supabase/rls-policies.sql`
4. اضغط Run

---

## 4. التعامل مع الأخطاء

### الأخطاء المُدارة:
| الخطأ | الرسالة | رمز HTTP |
|-------|---------|----------|
| كلمة مرور خاطئة | "كلمة المرور غير صحيحة" | 401 |
| دور غير مصرح | "غير مصرح لك بالقيام بهذا الإجراء" | 403 |
| جلسة منتهية | "انتهت الجلسة، سجل دخولك مجدداً" | 401 |
| محاولات كثيرة | "تم حظر المحاولات..." | 429 |

### Rate Limiting المُطبق:
```typescript
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 دقيقة
```

---

## 5. استعادة الحساب (Forgot Password)

### التدفق المقترح:
```
1. المستخدم يضغط "نسيت كلمة المرور"
2. يُدخل بريده الإلكتروني
3. Supabase يرسل رابط إعادة تعيين
4. الرابط صالح لمدة ساعة واحدة
5. المستخدم يدخل كلمة مرور جديدة
```

### التنفيذ مع Supabase:
```typescript
// إرسال رابط إعادة التعيين
const { error } = await supabase.auth.resetPasswordForEmail(email, {
  redirectTo: `${window.location.origin}/reset-password`,
});

// تحديث كلمة المرور
const { error } = await supabase.auth.updateUser({
  password: newPassword,
});
```

---

## 6. الملفات المُنشأة/المُحدّثة

### ملفات جديدة:
```
/src/lib/auth/security-config.ts    - تكوين الأمان
/src/lib/auth/api-auth.ts           - أدوات المصادقة للـ API
/src/app/api/auth/verify-password/  - نقطة نهاية التحقق
/supabase/rls-policies.sql          - سياسات RLS
/.env.example                       - مثال للبيئة
```

### ملفات مُحدّثة:
```
/src/middleware.ts                  - حماية المسارات
/src/lib/data.ts                    - إزالة كلمات المرور الثابتة
/src/components/LoginScreen.tsx     - استخدام API للتحقق
```

---

## 7. خطوات التطبيق

### فوري (تم):
1. ✅ نقل كلمات المرور إلى `.env`
2. ✅ إنشاء API للتحقق من كلمات المرور
3. ✅ تحديث Middleware
4. ✅ إنشاء سياسات RLS

### قصير المدى:
1. ⚠️ تطبيق `withAuth` على جميع API routes
2. ⚠️ تفعيل التحقق من الجلسة مع Supabase
3. ⚠️ إضافة صفحة استعادة كلمة المرور

### طويل المدى:
1. إضافة المصادقة الثنائية (2FA)
2. سجل تدقيق للأعمال الحساسة
3. تشفير البيانات الحساسة في قاعدة البيانات

---

## 8. اختبار الأمان

### اختبارات يجب إجراؤها:

```bash
# 1. اختبار Rate Limiting
for i in {1..10}; do
  curl -X POST http://localhost:3000/api/auth/verify-password \
    -H "Content-Type: application/json" \
    -d '{"password":"wrong","role":"admin"}'
done

# 2. اختبار RLS في Supabase
# قم بإنشاء مستخدمين بأدوار مختلفة وتحقق من عدم القدرة على رؤية بيانات الآخرين

# 3. اختبار Middleware
curl http://localhost:3000/admin -I  # يجب أن يعيد redirect
curl http://localhost:3000/ -I       # يجب أن يعيد 200
```

---

## 9. تقييم نهائي

### قبل الإصلاح: 🔴 **خطر حرج**
- كلمات المرور مكشوفة
- يمكن تجاوز المصادقة بسهولة
- لا حماية للمسارات

### بعد الإصلاح: 🟡 **يحتاج مزيد عمل**
- ✅ كلمات المرور آمنة
- ✅ Middleware يعمل
- ⚠️ RLS يحتاج تفعيل
- ⚠️ API Routes تحتاج حماية

### الهدف: 🟢 **آمن**
- جميع الثغرات مغلقة
- RLS مفعّل
- جميع APIs محمية
- اختبارات أمنية دورية

---

## 10. المراجع

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware)

---

**تم إعداد هذا التقرير بتاريخ:** $(date +%Y-%m-%d)

**المسؤول عن الأمان:** فريق التطوير
