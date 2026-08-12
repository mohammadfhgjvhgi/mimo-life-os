# 📡 MiMo AI — API Reference

> توثيق كامل لجميع API endpoints في MiMo AI

## Base URL

```
http://localhost:3000/api
```

---

## 📋 الفهرس

| Endpoint | Method | الوصف |
|---|---|---|
| [/chat](#chat) | POST | محادثة مع AI (SSE streaming) |
| [/files](#files) | GET/POST | عمليات الملفات |
| [/code/exec](#code-exec) | POST | تنفيذ أوامر shell |
| [/tasks](#tasks) | GET/DELETE | المهام |
| [/tasks/:id](#tasks-id) | GET | تفاصيل مهمة |
| [/memory](#memory) | GET/POST | الذاكرة |
| [/memory/:id](#memory-id) | DELETE | حذف ذاكرة |
| [/knowledge](#knowledge) | GET/POST | المعرفة |
| [/approvals](#approvals) | GET/POST | الموافقات |
| [/kill-switch](#kill-switch) | GET/POST | مفتاح الطوارئ |
| [/search](#search) | GET | البحث الشامل |
| [/sessions](#sessions) | GET | الجلسات |
| [/sessions/:id](#sessions-id) | GET/PATCH/DELETE | جلسة محددة |
| [/health](#health) | GET | صحة النظام |
| [/activity](#activity) | GET | سجل النشاط |
| [/eval](#eval) | GET | تشغيل التقييم |
| [/triggers](#triggers) | GET/POST | المحفزات |

---

## chat

محادثة مع MiMo AI مع SSE streaming.

### POST `/api/chat`

**Request:**
```json
{
  "message": "What is 2+2?",
  "sessionId": "optional-session-id"
}
```

**Response:** Server-Sent Events stream

```
event: session
data: {"sessionId":"abc123"}

event: thinking
data: {"route":"fast","reasoning":"Simple query"}

event: token
data: {"token":"2"}

event: token
data: {"token":"+"}

event: token
data: {"token":"2"}

event: token
data: {"token":"="}

event: token
data: {"token":"4"}

event: done
data: {"response":"2+2=4"}
```

**Events:**
| Event | Data | الوصف |
|---|---|---|
| `session` | `{sessionId}` | معرف الجلسة |
| `thinking` | `{route, reasoning}` | المسار (fast/deep) |
| `task` | `{taskId, goal}` | مهمة جديدة (deep path) |
| `token` | `{token}` | جزء من الرد |
| `event` | `{type, data}` | حدث runtime (tool/memory/etc) |
| `done` | `{response}` | اكتمال الرد |
| `error` | `{message}` | خطأ |

---

## files

عمليات الملفات في مساحة العمل (workspace/).

### GET `/api/files?action=list`

يعرض شجرة الملفات.

**Response:**
```json
{
  "tree": [
    {
      "name": "src",
      "type": "dir",
      "path": "src",
      "children": [
        { "name": "main.py", "type": "file", "path": "src/main.py", "size": 1024 }
      ]
    }
  ]
}
```

### GET `/api/files?action=read&path=main.py`

يقرأ محتوى ملف.

**Response:**
```json
{
  "content": "print('hello')",
  "path": "main.py",
  "size": 15,
  "modified": "2024-01-01T00:00:00.000Z"
}
```

### POST `/api/files`

**Write file:**
```json
{
  "action": "write",
  "path": "main.py",
  "content": "print('hello')"
}
```

**Delete file:**
```json
{
  "action": "delete",
  "path": "main.py"
}
```

**Create directory:**
```json
{
  "action": "mkdir",
  "path": "newfolder"
}
```

---

## code/exec

تنفيذ أوامر shell في مساحة العمل.

### POST `/api/code/exec`

**Request:**
```json
{
  "command": "ls -la"
}
```

**Response:**
```json
{
  "ok": true,
  "output": "total 8\ndrwxr-xr-x 2 user user 4096 ..."
}
```

**الأمان:**
- يمنع أوامر خطرة (rm -rf /, mkfs, shutdown, curl|sh)
- يمنع الوصول لمسارات النظام (/etc, /root, /proc)
- environment معزول (بدون secrets)
- timeout 28 ثانية

---

## tasks

### GET `/api/tasks?sessionId=xxx&status=running`

يعرض المهام.

**Response:**
```json
{
  "tasks": [
    {
      "id": "task-1",
      "goal": "Search the web",
      "status": "completed",
      "spent": 0.001,
      "budget": 1.0,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### DELETE `/api/tasks`

إلغاء مهمة.

```json
{ "taskId": "task-1" }
```

---

## tasks/:id

### GET `/api/tasks/:id`

تفاصيل مهمة مع الخطوات والـ checkpoints.

---

## memory

### GET `/api/memory?type=preference`

يعرض الذكريات.

### POST `/api/memory`

إضافة ذاكرة.

```json
{
  "type": "preference",
  "content": "User loves Python",
  "importance": 0.9
}
```

**الأنواع:** `semantic` | `episodic` | `preference` | `procedural` | `skill` | `failure` | `relationship`

---

## memory/:id

### DELETE `/api/memory/:id`

حذف ذاكرة.

---

## knowledge

### GET `/api/knowledge?search=query`

بحث في قاعدة المعرفة.

### POST `/api/knowledge`

استيعاب مستند.

```json
{
  "sourceType": "manual",
  "title": "My Document",
  "content": "Document text..."
}
```

**sourceType:** `manual` | `url` | `file`

---

## approvals

### GET `/api/approvals`

عرض الموافقات المعلقة.

### POST `/api/approvals`

```json
{
  "approvalId": "apr-1",
  "decision": "approved",
  "decidedBy": "Mohamed"
}
```

---

## kill-switch

### GET `/api/kill-switch`

```json
{ "active": false }
```

### POST `/api/kill-switch`

```json
{ "active": true }
```

يوقف جميع العمليات المستقلة فوراً.

---

## search

### GET `/api/search?q=Python`

بحث شامل عبر الجلسات، المهام، الذاكرة، والمعرفة.

```json
{
  "results": [
    { "type": "memory", "title": "User loves Python", "id": "mem-1", "score": 0.95 },
    { "type": "task", "title": "Write Python script", "id": "task-1", "score": 1.0 }
  ]
}
```

---

## sessions

### GET `/api/sessions`

عرض الجلسات.

---

## sessions/:id

### GET `/api/sessions/:id`

تفاصيل جلسة مع الرسائل.

### PATCH `/api/sessions/:id`

```json
{ "title": "New title" }
```

### DELETE `/api/sessions/:id`

حذف جلسة.

---

## health

### GET `/api/health`

```json
{
  "status": "healthy",
  "components": [
    { "name": "database", "status": "healthy" },
    { "name": "model_gateway", "status": "healthy" },
    { "name": "memory", "status": "healthy" },
    { "name": "knowledge", "status": "healthy" }
  ]
}
```

---

## activity

### GET `/api/activity`

سجل الأحداث الأخيرة.

---

## eval

### GET `/api/eval`

تشغيل suite التقييم (25 اختبار).

```json
{
  "totalPass": 25,
  "totalTests": 25,
  "overallScore": 1.0,
  "categories": {
    "Conversation": { "pass": 2, "total": 2 },
    "Memory": { "pass": 4, "total": 4 }
  }
}
```

---

## triggers

### GET `/api/triggers`

عرض المحفزات المستقلة.

### POST `/api/triggers`

```json
{
  "action": "create",
  "name": "Daily summary",
  "type": "schedule",
  "config": { "goal": "Summarize today's work", "intervalMs": 86400000 }
}
```
