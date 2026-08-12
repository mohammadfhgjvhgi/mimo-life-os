# أتمتة النسخ الاحتياطي اليومي

## النسخة الحالية تعمل

السكربت `scripts/daily-backup.mts` مستقل تماماً (لا يحتاج فتح الموقع) وينشئ:
- ZIP يحتوي على ملف SQLite كامل + مجلد uploads
- يحفظه في `MIMO_STORAGE_PATH/backups/` (على ويندوز: `M:\mimo_storage\backups\`)
- يحتفظ بآخر 7 نسخ فقط (يحذف الأقدم تلقائياً)
- يحدّث سجل النسخ في `backup-history.log`

## التشغيل اليدوي (اختبار)

```bash
bun run scripts/daily-backup.mts
```

## الجدولة التلقائية

### 🖥️ ويندوز (بيئة الإنتاج لديك)

#### الخيار 1: PM2 (موصى به — لديك PM2 مثبت)

أنشئ ملف `ecosystem.backup.config.cjs`:

```js
module.exports = {
  apps: [{
    name: 'mimo-backup',
    script: 'scripts/daily-backup.mts',
    interpreter: 'bun',
    cron_restart: '0 3 * * *',   // كل يوم 3:00 ص
    autorestart: false,            // لا يعيد التشغيل — يكفي مرة يومياً
    max_memory_restart: '500M',
  }],
};
```

ثم:
```cmd
pm2 start ecosystem.backup.config.cjs
pm2 save
```

#### الخيار 2: Windows Task Scheduler

```cmd
schtasks /create /tn "MiMo Daily Backup" /tr "cmd /c cd /d C:\Users\MohandsMohammad\x7k2m9p3 && bun run scripts\daily-backup.mts >> M:\mimo_storage\backups\cron.log 2>&1" /sc daily /st 03:00
```

### 🐧 لينكس / Mac (cron)

```bash
crontab -e
# أضف السطر:
0 3 * * *  cd /path/to/project && bun run scripts/daily-backup.mts >> .mimo_storage/backups/cron.log 2>&1
```

## التحقق من عمل النسخ

```bash
# قائمة النسخ
ls -la M:\mimo_storage\backups\

# سجل النسخ
type M:\mimo_storage\backups\backup-history.log
```

## الاستعادة من نسخة احتياطية

1. أوقف التطبيق: `pm2 stop mimo-app`
2. فك ضغط الـ ZIP
3. انسخ ملف `db-*.db` إلى `M:\mimo_storage\db\custom.db`
4. انسخ مجلد `uploads/` إلى `M:\mimo_storage\uploads\`
5. أعد التشغيل: `pm2 start mimo-app`

## ملاحظات

- النسخة لا تشفّر المحتوى (البيانات على قرصك المحلي)
- لو أردت نسخاً خارجية (offsite): استخدم قسم Dropbox Backup بالموقع لرفع ZIP يدوياً
- السكربت يستخدم `zip` على لينكس و `Compress-Archive` (PowerShell) على ويندوز
