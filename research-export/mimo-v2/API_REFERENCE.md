# MiMo AI — API Reference

> **شرح كامل لكل الـ 49 API route** — الطلب، الاستجابة، والأمثلة

---

## الفهرس

1. [Core Routes](#core-routes)
2. [Memory Routes](#memory-routes)
3. [Knowledge Routes](#knowledge-routes)
4. [Task Routes](#task-routes)
5. [Multimodal Routes](#multimodal-routes)
6. [Observability Routes](#observability-routes)
7. [System Routes](#system-routes)
8. [Dev Workspace Routes](#dev-workspace-routes)

---

## Core Routes

### POST /api/chat

**الوصف:** المحادثة مع MiMo — يمر عبر الـ Core Pipeline الكامل (Context → Reasoner → Planner → Orchestrator → Validator) ويعيد الرد عبر SSE streaming.

**Request Body:**
```json
{
  "messages": [
    { "role": "user", "content": "مرحبا، من أنت؟" }
  ],
  "model": "ultra",
  "mode": "chat",
  "deepThink": false,
  "webSearch": false,
  "conversationId": "conv_1234567890"
}
```

**Response:** SSE Stream

```
event: action_trace
data: {"stage":"context","verb":"بناء السياق","detail":"جاري تجميع الذاكرة","status":"working"}

event: action_trace
data: {"stage":"context","verb":"بناء السياق","detail":"تم تجميع 3 مصدر","status":"done","durationMs":40}

event: plan
data: {"intent":"question","steps":1,"complexity":"low","stepDescriptions":["Answer directly"]}

event: context_recall
data: {"memories":[{"id":"...","type":"fact","content":"..."}],"entities":[]}

event: token
data: {"text":"استلمت: "}

event: token
data: {"text":"\"مرحبا\""}

event: done
data: {"durationMs":1200,"tokenCount":15,"sources":3}
```

**Event Types:**
| Event | الوصف |
|---|---|
| `action_trace` | مرحلة تنفيذ (context, reasoning, validation, response) |
| `plan` | خطة التنفيذ (intent, steps, complexity) |
| `context_recall` | ذكريات + كيانات مستدعاة |
| `token` | جزء من الرد |
| `done` | اكتمل الـ stream |
| `error` | خطأ |

---

### GET /api/conversations
**الوصف:** قائمة كل المحادثات

**Response:**
```json
{
  "conversations": [
    {
      "id": "conv_123",
      "title": "محادثة جديدة",
      "createdAt": "2026-08-09T...",
      "updatedAt": "2026-08-09T..."
    }
  ]
}
```

### POST /api/conversations
**الوصف:** حفظ رسالة في محادثة

**Request Body:**
```json
{
  "action": "save_message",
  "conversationId": "conv_123",
  "role": "user",
  "content": "مرحبا",
  "mode": "chat"
}
```

---

## Memory Routes

### GET /api/memory
**الوصف:** قائمة كل الذكريات

**Query Parameters:**
- `type` — filter by type (fact, preference, event, relation, skill, goal)
- `limit` — max results (default 50)

**Response:**
```json
{
  "memories": [
    {
      "id": "mem_123",
      "type": "fact",
      "content": "المستخدم يدرس هندسة الأتمتة",
      "scope": "global",
      "source": "conversation:conv_123",
      "confidence": 0.8,
      "createdAt": "2026-08-09T..."
    }
  ]
}
```

### POST /api/memory
**الوصف:** إنشاء ذاكرة جديدة

**Request Body:**
```json
{
  "type": "preference",
  "content": "يفضل الردود المختصرة",
  "scope": "global",
  "confidence": 0.9
}
```

### GET /api/memory/[id]
**الوصف:** ذاكرة محددة

### PATCH /api/memory/[id]
**الوصف:** تحديث ذاكرة

### DELETE /api/memory/[id]
**الوصف:** حذف ذاكرة (soft delete)

---

## Knowledge Routes

### GET /api/knowledge/graph
**الوصف:** استعلام الرسم المعرفي

**Query Parameters:**
- `action` — `full` (default) | `entity` | `subgraph` | `path`
- `entityId` — required for `entity`, `subgraph`, `path`
- `targetId` — required for `path`

**Response (action=full):**
```json
{
  "nodes": [
    { "id": "ent_1", "name": "محمد", "type": "person", "confidence": 0.9 }
  ],
  "edges": [
    { "from": "ent_1", "to": "ent_2", "type": "works_on", "confidence": 0.8 }
  ]
}
```

---

## Task Routes

### GET /api/tasks
**الوصف:** قائمة المهام

**Query Parameters:**
- `status` — pending | executing | completed | failed
- `limit` — max results

**Response:**
```json
{
  "tasks": [
    {
      "id": "task_123",
      "status": "completed",
      "intent": "research",
      "plan": { "intent": {...}, "steps": [...], "complexity": "medium" },
      "progress": 1.0,
      "createdAt": "2026-08-09T...",
      "completedAt": "2026-08-09T..."
    }
  ]
}
```

### POST /api/tasks
**الوصف:** إنشاء مهمة يدوياً

**Request Body:**
```json
{
  "intent": "ابحث عن X",
  "conversationId": "conv_123"
}
```

### GET /api/tasks/[id]
**الوصف:** مهمة محددة

### PATCH /api/tasks/[id]
**الوصف:** تحديث مهمة (status, executionMode)

---

## Multimodal Routes

### POST /api/asr
**الوصف:** تحويل الصوت لنص (Speech-to-Text)

**Request Body:** `multipart/form-data` with audio file

**Response:**
```json
{
  "text": "مرحبا كيف حالك",
  "language": "ar",
  "duration": 2.5
}
```

### POST /api/tts
**الوصف:** تحويل النص لصوت (Text-to-Speech)

**Request Body:**
```json
{
  "text": "مرحبا بك",
  "voice": "default"
}
```

**Response:** Audio stream (audio/mp3)

### POST /api/vision
**الوصف:** تحليل صورة

**Request Body:**
```json
{
  "imageBase64": "data:image/png;base64,...",
  "question": "ماذا يوجد في هذه الصورة؟"
}
```

**Response:**
```json
{
  "description": "صورة تحتوي على...",
  "labels": ["person", "indoor"],
  "text": "النص المستخرج (OCR)"
}
```

### POST /api/image
**الوصف:** توليد صورة من وصف نصي

**Request Body:**
```json
{
  "prompt": "غروب الشمس على البحر",
  "size": "1024x1024"
}
```

**Response:**
```json
{
  "success": true,
  "dataUrl": "data:image/png;base64,...",
  "prompt": "غروب الشمس على البحر"
}
```

---

## Observability Routes

### GET /api/traces
**الوصف:** قائمة سجلات التنفيذ

**Query Parameters:**
- `traceType` — agent_run | tool_chain | memory_op | kg_op
- `limit` — max results

**Response:**
```json
{
  "traces": [
    {
      "id": "trace_123",
      "traceType": "agent_run",
      "title": "Research: AI technologies",
      "status": "completed",
      "totalDurationMs": 1500,
      "totalTokens": 250,
      "steps": [...]
    }
  ]
}
```

### GET /api/traces/[id]
**الوصف:** سجل تنفيذ محدد

### GET /api/tools
**الوصف:** قائمة الأدوات المسجّلة

### POST /api/tools
**الوصف:** تنفيذ أداة

**Request Body:**
```json
{
  "toolName": "web_search",
  "input": { "query": "AI news" }
}
```

### GET /api/approvals
**الوصف:** طلبات الموافقة المعلّقة

### POST /api/approvals/[id]
**الوصف:** الموافقة أو الرفض

**Request Body:**
```json
{
  "status": "approved",
  "reason": "موافق"
}
```

### GET /api/events
**الوصف:** قائمة الأحداث (EventLog)

### GET /api/events/stream
**الوصف:** SSE stream للأحداث المباشرة

```
GET /api/events/stream
→ data: {"type":"agent.started","payload":{...}}
→ data: {"type":"memory.stored","payload":{...}}
→ (15s keepalive)
```

### GET /api/stats
**الوصف:** إحصائيات النظام

**Response:**
```json
{
  "conversations": 15,
  "memories": 42,
  "entities": 23,
  "tasks": 8,
  "traces": 156
}
```

---

## Schedule Routes

### GET /api/schedule
**الوصف:** قائمة المهام المجدولة

### POST /api/schedule
**الوصف:** إنشاء مهمة مجدولة

**Request Body:**
```json
{
  "name": "تذكير صباحي",
  "prompt": "ما هي مهام اليوم؟",
  "cronExpression": "0 8 * * *",
  "requiresApproval": false
}
```

### GET /api/schedule/[id]
### PATCH /api/schedule/[id]
### DELETE /api/schedule/[id]

---

## System Routes

### GET /api/health
**الوصف:** فحص صحة النظام

**Response:**
```json
{
  "status": "alive",
  "timestamp": 1786216438743,
  "uptime": 28.738,
  "pid": 12345
}
```

### GET /api/liveness
**الوصف:** Liveness probe (for load balancers)

### GET /api/readiness
**الوصف:** Readiness probe (checks DB + Kernel)

### GET /api/user
**الوصف:** ملف المستخدم

### POST /api/user
**الوصف:** تحديث ملف المستخدم

### POST /api/export
**الوصف:** تصدير البيانات (JSON/Markdown/CSV)

### GET /api/backup
**الوصف:** قائمة النسخ الاحتياطية

### POST /api/backup
**الوصف:** إنشاء نسخة احتياطية

### POST /api/backup/restore
**الوصف:** استعادة نسخة احتياطية

---

## Dev Workspace Routes

### GET /api/dev/projects
**الوصف:** قائمة مشاريع الـ Dev Workspace

### POST /api/dev/projects
**الوصف:** إنشاء مشروع dev جديد

### GET /api/dev/projects/[id]
### PATCH /api/dev/projects/[id]
### DELETE /api/dev/projects/[id]

### GET /api/dev/projects/[id]/files
### POST /api/dev/projects/[id]/files
### GET /api/dev/projects/[id]/files/[...path]
### PUT /api/dev/projects/[id]/files/[...path]
### DELETE /api/dev/projects/[id]/files/[...path]

### POST /api/dev/projects/[id]/build
### POST /api/dev/projects/[id]/terminal
### GET /api/dev/projects/[id]/logs
### GET /api/dev/projects/[id]/resources
### POST /api/dev/projects/[id]/snapshot
### GET /api/dev/projects/[id]/snapshot/[snapshotId]
### GET /api/dev/projects/[id]/permissions
### POST /api/dev/projects/[id]/git
### POST /api/dev/projects/[id]/agent

### POST /api/agents/recover
**الوصف:** استعادة agents المتوقفة

---

## أمثلة استخدام

### مثال: محادثة كاملة (curl)

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role":"user","content":"ابحث عن آخر تقنيات AI"}],
    "model": "ultra",
    "mode": "research",
    "deepThink": true,
    "webSearch": true
  }'
```

### مثال: إنشاء ذاكرة (JavaScript)

```javascript
await fetch('/api/memory', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'preference',
    content: 'يفضل الردود المختصرة',
    confidence: 0.9,
  }),
});
```

### مثال: استماع للأحداث (JavaScript)

```javascript
const es = new EventSource('/api/events/stream');
es.onmessage = (e) => {
  const event = JSON.parse(e.data);
  console.log(event.type, event.payload);
};
```
