# Firebase Security — ملاحظات وتطبيق

## الحالة الحالية

قواعد Firebase Realtime Database الحالية في `firebase-database-rules.json`:

```json
{
  "rules": {
    ".read": "false",
    ".write": "false",
    "sync": {
      "queue":  { ".read": "true", ".write": "true", ".indexOn": ["timestamp","section","operation"] },
      "status": { ".read": "true", ".write": "true", ".indexOn": ["lastSeen"] },
      "media":  { ".read": "true", ".write": "true", ".indexOn": ["uploadedAt"] }
    }
  }
}
```

### ما الذي تحسّن؟
1. **default-deny على الجذر**: أي مسار خارج `sync/` ممنوع (سابقاً كان كل شي مفتوح ضمنياً)
2. **indexOn**: فهارس على الحقول المستخدمة بالاستعلامات → أداء أفضل + يختفي تحذير "Using unspecified index"
3. **تقييد المسارات**: فقط `sync/queue`, `sync/status`, `sync/media` مسموحة (وهي المسارات التي يستخدمها الكود فعلاً)

## ⚠️ القيد الأمني المتبقي

التطبيق **لا يستخدم Firebase Auth**. هذا يعني:
- القواعد ما تقدر تقيد بالـ `auth.uid` (مفيش مستخدم مسجّل)
- `.read: "true"` على مسارات sync = أي حد عنده رابط DB URL يقدر يقرأ/يكتب

### تقييم المخاطرة (LOW-MEDIUM)
- Firebase هنا **طبقة نقل فقط** (sync queue) — البيانات الحقيقية في SQLite محلياً
- البيانات في Firebase **عابرة** (تُحذف بعد الـ pull)
- رابط DB URL غير منشور علنياً

## 🔧 الحل الكامل (مهمة مستقبلية A2.1)

للأمان الكامل، لازم نضيف **Firebase Auth (email/password)**:

1. تفعيل Email/Password auth في Firebase Console
2. تعديل `src/lib/firebase-sync.ts`:
   - إضافة `getAuth`, `signInWithEmailAndPassword`
   - تسجيل دخول قبل أي عملية sync
3. تحديث القواعد:
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null",
    "sync": {
      "queue":  { ".indexOn": ["timestamp","section","operation"] },
      "status": { ".indexOn": ["lastSeen"] },
      "media":  { ".indexOn": ["uploadedAt"] }
    }
  }
}
```
4. بذلك فقط من يملك بيانات Firebase Auth يقدر يصل للبيانات

## 📋 كيفية تطبيق القواعد الحالية على Firebase

1. افتح: https://console.firebase.google.com/project/spark11-c8168/database/spark11-c8168-default-rtdb/rules
2. الصق محتوى `firebase-database-rules.json`
3. اضغط "Publish"

> **ملاحظة**: تطبيق القواعد لا يؤثر على عمل التطبيق لأن المسارات المستخدمة (`sync/*`) ما زالت مسموحة.
