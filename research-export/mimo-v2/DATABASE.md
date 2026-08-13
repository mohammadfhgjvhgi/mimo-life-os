# MiMo AI — Database Schema Documentation

> **شرح كامل لـ 26 Prisma model** — البنية، العلاقات، والاستخدام

---

## نظرة عامة

MiMo AI يستخدم **Prisma 6 + SQLite** — local-first, single-user, single-file database.

```
db/custom.db (SQLite, ~2MB)
└── 26 models
    ├── Core (Project, Conversation, Message)
    ├── Memory (Memory)
    ├── Knowledge (KnowledgeEntity, KnowledgeRelationship)
    ├── Tasks (Task, Schedule)
    ├── Artifacts (Artifact)
    ├── Observability (Trace, ToolCall, EventLog)
    ├── Self-Improvement (FailureMemory, Skill)
    ├── Security (ApprovalRequest)
    ├── Dev Workspace (8 models)
    └── Settings (Preference, ProjectSetting, File)
```

---

## 1. Core Domain Models

### Project
**الوصف:** الحاوية الوحيدة في MiMo — واحد لكل جهد طويل الأمد.

```prisma
model Project {
  id          String   @id @default(cuid())
  name        String
  description String?
  accent      String   @default("#7c3aed")  // لون المشروع
  mimoMdPath  String?  // path to MIMO.md grounding file
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  conversations  Conversation[]
  memories       Memory[]
  artifacts      Artifact[]
  files          File[]
  tasks          Task[]
  settings       ProjectSetting[]
}
```

### Conversation
**الوصف:** المحادثة الدائمة — العمود الفقري لـ MiMo.

```prisma
model Conversation {
  id        String   @id @default(cuid())
  projectId String?
  title     String   @default("محادثة جديدة")
  pinned    Boolean  @default(false)
  forkedFrom String?  // parent conversation ID if forked
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  project  Project?  @relation(fields: [projectId], references: [id], onDelete: SetNull)
  messages Message[]
}
```

### Message
**الوصف:** رسالة في محادثة (user أو ai).

```prisma
model Message {
  id             String   @id @default(cuid())
  conversationId String
  role           String   // 'user' | 'ai'
  content        String
  mode           String?  // chat/research/code/etc
  model          String?  // which model was used
  thinking       Boolean  @default(false)
  research       Boolean  @default(false)
  streaming      Boolean  @default(false)
  error          String?
  tokenCount     Int?
  createdAt      DateTime @default(now())
}
```

---

## 2. Memory System

### Memory
**الوصف:** ذاكرة MiMo — 7 أنواع، مع provenance + decay + confidence.

```prisma
model Memory {
  id          String   @id @default(cuid())
  type        String   // fact | preference | event | relation | skill | goal
  content     String
  scope       String   @default("global") // global | project | conversation | temporary
  projectId   String?
  source      String   // 'user' | 'agent:<id>' | 'tool:<id>' | 'conversation:<id>'
  confidence  Float    @default(0.5)
  metadata    String?  // JSON-encoded Record<string, unknown>
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  deletedAt   DateTime? // soft delete

  @@unique([type, content, scope])
  @@index([type])
  @@index([projectId])
  @@index([scope])
  @@index([deletedAt])
  @@index([createdAt])
}
```

#### أنواع الذاكرة

| Type | الوصف | مثال |
|---|---|---|
| `fact` | حقيقة عن المستخدم | "يدرس هندسة الأتمتة" |
| `preference` | تفضيل | "يفضل الردود المختصرة" |
| `event` | حدث | "بدأ الجامعة في سبتمبر" |
| `relation` | علاقة | "محمد يعرف Python" |
| `skill` | مهارة | "يتقن SCADA" |
| `goal` | هدف | "العمل في الخليج بعد التخرج" |

#### Scopes

| Scope | الوصف |
|---|---|
| `global` | تنطبق على كل المشروعات |
| `project` | مشروع محدد |
| `conversation` | محادثة محددة |
| `temporary` | مؤقتة (تنتهي صلاحيتها) |

---

## 3. Knowledge Graph

### KnowledgeEntity
**الوصف:** كيان في الرسم المعرفي — عقدة (node).

```prisma
model KnowledgeEntity {
  id            String   @id @default(cuid())
  name          String
  type          String   // identity | skill | interest | project | goal | person | memory | decision | artifact
  description   String?
  confidence    Float    @default(0.5)
  evidenceCount Int      @default(1)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  @@index([type])
  @@index([name])
}
```

### KnowledgeRelationship
**الوصف:** علاقة بين كيانين — حافة (edge).

```prisma
model KnowledgeRelationship {
  id          String   @id @default(cuid())
  fromEntityId String
  toEntityId   String
  type        String   // related_to | depends_on | created | uses | part_of | knows
  confidence  Float    @default(0.5)
  createdAt   DateTime @default(now())

  @@unique([fromEntityId, toEntityId, type])
  @@index([fromEntityId])
  @@index([toEntityId])
  @@index([type])
}
```

#### أمثلة على العلاقات

```
محمد ──works_on──→ مشروع BMS
محمد ──knows────→ Python
محمد ──lives_in──→ الخليل
مشروع BMS ──uses──→ Arduino
```

---

## 4. Tasks & Planning

### Task
**الوصف:** وحدة عمل وكيل — lifecycle كامل مع plan persistence.

```prisma
model Task {
  id             String   @id @default(cuid())
  projectId      String?
  conversationId String?
  status         String   @default("pending") // pending|planning|executing|validating|done|error|cancelled
  intent         String?
  plan           String?  // JSON: {intent, steps[], complexity}
  progress       Float    @default(0)
  agentId        String?
  error          String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  completedAt    DateTime?
}
```

### Schedule
**الوصف:** مهمة مجدولة (cron-based).

```prisma
model Schedule {
  id          String   @id @default(cuid())
  name        String
  description String?
  prompt      String   // the prompt to execute
  cronExpression String? // e.g. "0 8 * * *" for daily at 8am
  nextRunAt   DateTime?
  lastRunAt   DateTime?
  isActive    Boolean  @default(true)
  maxRuns     Int?     // null = unlimited
  runsCount   Int      @default(0)
  requiresApproval Boolean @default(false)
}
```

---

## 5. Artifacts

### Artifact
**الوصف:** مُنتج first-class — code, markdown, image, diagram, etc.

```prisma
model Artifact {
  id          String   @id @default(cuid())
  type        String   // code | markdown | image | diagram | research | plan | etc
  title       String
  content     String   // or path to external content
  projectId   String?
  provenance  String?  // conversation:agent:model that produced it
  version     Int      @default(1)
  parentId    String?  // previous version
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

#### أنواع المُنتجات

| Type | الوصف |
|---|---|
| `code` | كود (Python, JS, etc.) |
| `markdown` | مستند |
| `image` | صورة مُولّدة |
| `diagram` | رسم بياني |
| `research` | تقرير بحثي |
| `plan` | خطة تنفيذ |
| `architecture` | مخطط معماري |
| `presentation` | عرض تقديمي |

---

## 6. Observability

### Trace
**الوصف:** سجل تنفيذ كامل — agent_run, tool_chain, memory_op.

```prisma
model Trace {
  id          String   @id @default(cuid())
  conversationId String?
  traceType   String   // agent_run | tool_chain | memory_op | kg_op
  title       String
  description String?
  status      String   @default("pending") // pending | running | completed | failed
  steps       String?  // JSON array of {step, action, result, duration, status}
  totalDurationMs Int  @default(0)
  totalTokens Int      @default(0)
  totalCostUsd Float   @default(0)
  errorMessage String?
  metadata    String?
  createdAt   DateTime @default(now())
}
```

### ToolCall
**الوصف:** سجل استدعاء أداة — input, output, duration, cost.

```prisma
model ToolCall {
  id          String   @id @default(cuid())
  traceId     String?
  toolName    String   // "web_search", "file_read", etc.
  input       String   // JSON input args
  output      String?  // JSON output
  status      String   @default("pending") // pending | running | success | error | cancelled
  errorMessage String?
  durationMs  Int      @default(0)
  tokensUsed  Int      @default(0)
  costUsd     Float    @default(0)
  requiresApproval Boolean @default(false)
  approved    Boolean  @default(false)
}
```

### EventLog
**الوصف:** سجل أحداث append-only — audit trail، لا يُحذف أبداً.

```prisma
model EventLog {
  id            String   @id @default(cuid())
  type          String   // USER_MESSAGE_CREATED | AGENT_STARTED | etc
  source        String   // which module emitted
  payload       String   // JSON
  correlationId String?
  timestamp     DateTime @default(now())
}
```

---

## 7. Self-Improvement

### FailureMemory
**الوصف:** ذاكرة الأخطاء — Reflexion pattern للتحسين الذاتي.

```prisma
model FailureMemory {
  id              String   @id @default(cuid())
  traceId         String?
  conversationId  String?
  taskDescription String   // what was the user trying to do
  attemptedPlan   String?  // JSON: steps the agent tried
  failurePoint    String?  // which step failed
  errorType       String?  // arithmetic | logical | hallucination | plan_omission | tool_error
  errorMessage    String?
  rootCauseAnalysis String? // LLM-generated root cause
  proposedFix     String?  // LLM-generated fix
  appliedFix      Boolean  @default(false)
  embedding       String?  // for semantic retrieval
}
```

### Skill
**الوصف:** مهارة قابلة لإعادة الاستخدام — procedural memory.

```prisma
model Skill {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String?  // coding | research | writing | automation
  triggerPattern String? // regex or keyword
  procedure   String   // JSON workflow steps
  examples    String?  // JSON array of usage examples
  successCount Int     @default(0)
  failureCount Int     @default(0)
  lastUsedAt  DateTime?
}
```

---

## 8. Security

### ApprovalRequest
**الوصف:** طلب موافقة — Human-in-the-Loop للإجراءات الخطيرة.

```prisma
model ApprovalRequest {
  id          String   @id @default(cuid())
  taskId      String?
  traceId     String?
  action      String   // description of action to approve
  actionType  String   // file_delete | send_email | execute_code | external_call
  payload     String?  // JSON details
  status      String   @default("pending") // pending | approved | rejected | expired
  reason      String?
  decidedAt   DateTime?
  decidedBy   String?
  expiresAt   DateTime?
}
```

---

## 9. Dev Workspace (8 models)

### DevProject
**الوصف:** مشروع تطوير معزول مع sandbox.

```prisma
model DevProject {
  id          String   @id @default(cuid())
  name        String
  description String?
  type        String   @default("generic") // nextjs | node | python | static | generic
  rootPath    String   // absolute path inside sandbox root
  profile     String   @default("standard") // safe | standard | development | networked | restricted
  runtime     String   @default("node") // node | bun | python | static
  status      String   @default("idle") // idle | building | running | testing | error | archived
  previewPort Int?
  // ... (files, builds, testRuns, logs, snapshots, permissions, processes)
}
```

### DevFile, DevBuild, DevTestRun, DevLog, DevProcess, DevSnapshot, DevPermission
كلها مرتبطة بـ DevProject وتوفر بيئة تطوير كاملة معزولة.

---

## 10. Settings

### Preference
**الوصف:** تفضيلات المستخدم العامة.

```prisma
model Preference {
  id    String   @id @default(cuid())
  key   String   // e.g. "tone", "response_length", "language_style"
  value String   // JSON-encoded value

  @@unique([key])
}
```

### ProjectSetting
**الوصف:** إعدادات مشروع محدد.

```prisma
model ProjectSetting {
  id        String   @id @default(cuid())
  projectId String
  key       String
  value     String

  @@unique([projectId, key])
}
```

### File
**الوصف:** ملف في نظام الملفات الافتراضي.

```prisma
model File {
  id        String   @id @default(cuid())
  projectId String?
  name      String
  path      String
  size      Int?
  mimeType  String?
  content   String?  // text content (for small files)
}
```

---

## العلاقات (Relations Map)

```
Project ──┬── Conversation ── Message
          ├── Memory
          ├── Artifact
          ├── Task ── ApprovalRequest
          ├── File
          └── ProjectSetting

Conversation ── Task
            ── Trace
            ── FailureMemory

Trace ── ToolCall

DevProject ──┬── DevFile
             ├── DevBuild
             ├── DevTestRun
             ├── DevLog
             ├── DevProcess
             ├── DevSnapshot
             └── DevPermission
```

---

## الأوامر

```bash
# دفع schema لقاعدة البيانات
bun run db:push

# توليد Prisma Client
bun run db:generate

# إنشاء migration
bun run db:migrate

# إعادة تعيين قاعدة البيانات
bun run db:reset
```

---

## الفهارس (Indexes)

كل الـ models محسّنة بالفهارس المناسبة:

- `@@index([type])` — للبحث حسب النوع
- `@@index([createdAt])` — للترتيب الزمني
- `@@index([status])` — للفلترة حسب الحالة
- `@@index([projectId])` — للربط بالمشروع
- `@@unique([...])` — لمنع التكرار
