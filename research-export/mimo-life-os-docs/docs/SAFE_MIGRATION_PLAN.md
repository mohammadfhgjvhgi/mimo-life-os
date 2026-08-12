# 📋 خطة Migration الآمنة — مشاكل 6.2 + 6.3

## ⚠️ هذه المشاكل تحتاج migration مخطط — لا تُنفّذ بدون نسخة احتياطية

## المشكلة 6.2: علاقات وهمية (Fake Relations)
الحقول مثل `courseId String @default("")` تستخدم String ID بدل Prisma relation فعلية.

### خطة الإصلاح (آمنة):
1. **نسخة احتياطية كاملة قبل أي شي**
2. إضافة Prisma relations مع `?` (optional):
```prisma
model Homework {
  courseId String?
  course   Course? @relation(fields: [courseId], references: [id])
}
```
3. `bun run db:push` (Prisma يحافظ على البيانات الموجودة)
4. اختبار: تأكد إن كل البيانات تفتح بدون مشاكل
5. حذف الـ `@@index([courseId])` القديمة لو صارت redundant

### النماذج المتأثرة:
- Homework → Course
- Lecture → Course  
- Grade → Course
- UniversityProject → Course
- AcademicResource → Course
- ScheduleEvent → Course

## المشكلة 6.3: تواريخ بنوعين مختلفين
بعض النماذج تستخدم `String` للتواريخ، وأخرى تستخدم `DateTime`.

### خطة الإصلاح (آمنة):
1. **نسخة احتياطية كاملة**
2. إضافة حقل جديد `DateTime` بجانب الحقل القديم:
```prisma
model Task {
  createdAt     String   @default("")    // القديم (للتوافق)
  createdAtDate DateTime? @default(now()) // الجديد
}
```
3. `bun run db:push`
4. Script لنسخ القيم: `UPDATE Task SET createdAtDate = datetime(createdAt) WHERE createdAt != ''`
5. اختبار: تأكد إن كل التواريخ صحيحة
6. (لاحقاً) حذف الحقل القديم بعد التأكد

### النماذج المتأثرة:
كل النماذج التي تستخدم `String` لـ `createdAt`/`updatedAt` (95 حقل)

## ⚠️ قاعدة ذهبية:
**لا تُنفّذ أي migration بدون:**
1. نسخة احتياطية مُختبَرة (restore-test)
2. `git commit` للـ schema الحالي
3. اختبار على نسخة من البيانات أولًا
