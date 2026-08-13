# 🏗️ MiMo AI — دليل المعمارية والكود

## الطبقات الـ 15 | The 15 Layers

كل طبقة لها مسؤولية واحدة واضحة:

### 1. Model Layer
**الملف:** `src/lib/ai/gateway.ts`

Model Gateway يبعد النظام عن مزود الـ AI. كل استدعاء للنموذج يمر من هنا.

```typescript
// استخدام
const gateway = await getModelGateway()
const response = await gateway.chat({ messages, system })
const stream = gateway.chatStream({ messages })  // AsyncGenerator
const structured = await gateway.generateStructured(req, schemaDescription)
```

**الميزات:**
- Provider abstraction (GLM-5.2 قابل للاستبدال)
- Streaming (SSE parsing من z-ai-web-dev-sdk)
- ReAct tool-calling protocol (JSON-based)
- Structured output (JSON extraction)
- Fallback provider support
- Cost tracking لكل استدعاء

### 2. Context Layer
**الملف:** `src/lib/context/engine.ts`

يقرر ما يدخل الـ prompt. ADR-007: إدارة السياق إلزامية.

```typescript
const ctx = await assembleContext(conversation, userMessage, {
  sessionId, goal, skipKnowledge: isSimple
})
// ctx.system, ctx.messages, ctx.memories, ctx.evidence, ctx.tokenEstimate
```

**المنطق:**
- الذاكرة تُسترجع دائماً (cheap, critical)
- المعرفة تُسترجع فقط للأسئلة المعقدة
- ضغط المحادثة إذا تجاوزت 60k chars
- أولوية الذاكرة: preference > semantic > procedural > episodic

### 3. Memory Layer
**الملفات:** `src/lib/memory/store.ts`, `retrieval.ts`, `consolidation.ts`

7 أنواع ذاكرة مع عمليات كاملة:

```typescript
// كتابة (مع dedup تلقائي)
const mem = await writeMemory({ type: 'preference', content: '...', importance: 0.9 })

// بحث هجين (vector + keyword)
const results = await retrieveMemories({ query: '...', limit: 5 })

// تحديث مع optimistic concurrency
await updateMemory(id, patch, expectedVersion)

// تعزيز (short-term → long-term)
await consolidateShortTerm(sessionId)
```

**الأنواع:** working, short_term, long_term, episodic, semantic, procedural, preference, failure, skill, relationship

### 4. Knowledge Layer
**الملفات:** `src/lib/knowledge/ingestion.ts`, `chunking.ts`, `retrieval.ts`, `graph.ts`

```typescript
// استيعاب
const doc = await ingestDocument(source, sourceType, title, content)
const doc = await ingestUrl('https://...')

// بحث هجين + reranking
const results = await retrieveKnowledge('query', { limit: 5 })

// Knowledge Graph
const entities = await extractEntities(text)
const relations = await extractRelations(text, entities)
await buildGraph(docId, content)
const subgraph = await queryGraph('entity name', depth: 2)
```

### 5. Reasoning Layer
مدموج في Model Gateway — CoT, ReAct, Plan-and-Solve, structured reasoning.

### 6. Planning Layer
**الملف:** `src/lib/brain/executive.ts` (داخل `planTask`)

```typescript
const plan = await planTask(task)
// plan.steps = [{ description, stepType, toolName }]
```

### 7. Executive Layer
**الملف:** `src/lib/brain/executive.ts`

```typescript
const decision = await classify(userMessage)
// decision.route = 'fast' | 'deep'
// decision.needsTools, needsMemory, needsKnowledge, needsPlanning
```

### 8. Agent Layer
**الملف:** `src/lib/agents/loop.ts`

ReAct loop — قلب النظام:

```typescript
const result = await runAgent(task, conversation, { sessionId, onToken })
```

**الدورة:**
1. تجميع السياق
2. استدعاء النموذج مع tools
3. إذا أداة → تنفيذ + feed result
4. إذا جواب نهائي → تحقق → احفظ → تعلم
5. كرر (max 25 iterations)

### 9. Tool Layer
**الملفات:** `src/lib/tools/runtime.ts`, `builtin.ts`

```typescript
// تسجيل أداة
registerTool(spec, handler)

// تنفيذ (مع policy + sandbox + audit)
const result = await executeTool('shell_exec', { command: 'ls' }, ctx)
```

**الأدوات المدمجة (10):**
- `fs_read`, `fs_write`, `fs_list` — ملفات
- `shell_exec` — أوامر shell (high-risk → approval)
- `web_search`, `web_read` — ويب
- `memory_write`, `memory_search` — ذاكرة
- `knowledge_search`, `knowledge_ingest` — معرفة

### 10. Execution Layer
مدموج في `agents/loop.ts` — checkpoints, resume, budget enforcement.

### 11. Verification Layer
**الملف:** `src/lib/verification/verifier.ts`

```typescript
const result = await verify({
  targetType: 'task', targetId, mode: 'result',
  content: answer, expected: goal
})
// result.verdict = 'pass' | 'fail' | 'inconclusive'
```

### 12. Recovery Layer
مدموج في `agents/loop.ts` — `attemptRecovery` يعيد تشغيل الـ agent من آخر checkpoint.

### 13. Learning Layer
**الملف:** `src/lib/learning/engine.ts`

```typescript
const lesson = await extractLesson(task)  // يكتب للذاكرة
const candidate = await suggestImprovement(task)
const deploy = await deployImprovement(candidate)  // gated — لا auto-deploy
```

### 14. Autonomy Layer
**الملف:** `src/lib/autonomy/triggers.ts`

```typescript
const trigger = await createTrigger('name', 'schedule', { goal, intervalMs })
await fireTrigger(trigger.id)
setKillSwitch(true)  // يوقف كل شيء
```

### 15. Security + Observability + Evaluation
**Security:** `src/lib/security/policy.ts` — Policy Engine غير قابل للتجاوز
**Observability:** `src/lib/observability/traces.ts` — تتبع كل عملية
**Evaluation:** `src/lib/evaluation/suite.ts` — 25 اختبار

---

## 🔄 تدفق البيانات | Data Flow

```
USER INPUT
  → INTENT CLASSIFICATION (fast/deep)
  → CONTEXT ASSEMBLY (memory + knowledge retrieval)
  → MODEL CALL (via Gateway)
  → IF TOOL CALL:
      → POLICY CHECK
      → SANDBOX EXECUTION
      → RESULT → BACK TO MODEL
  → IF FINAL ANSWER:
      → VERIFICATION
      → MEMORY WRITE (episodic)
      → LESSON EXTRACTION
      → RESPONSE TO USER
```

---

## 🗄️ قاعدة البيانات | Database Schema

```prisma
// 17 موديل في ملف واحد (SQLite)
Session → Turn, Task, Memory, Approval
Task → Step, Checkpoint, Artifact, Trace, Lesson
Memory → Lesson
KnowledgeDoc → Chunk, Entity
Entity → Relation (source/target)
AgentState (1:1 with Task)
ToolCall, VerificationResult, Approval, Trace, AuditLog, Lesson, Trigger, Setting
```

---

## 🎯 القرارات المعمارية | Architecture Decisions

| ADR | القرار | السبب |
|---|---|---|
| 001 | GLM-5.2 عبر Model Gateway | قابل للاستبدال بدون إعادة كتابة |
| 002 | Runtime TypeScript على Vercel AI SDK | لا Python sidecar |
| 003 | Hybrid agents (single افتراضي) | استمرارية السياق |
| 004 | تخزين مضمّن (SQLite + sqlite-vec) | بساطة + مقياس شخصي |
| 005 | Sandbox متدرّج + Tool Runtime كـ mini-service | عزل + أمان |
| 006 | Controlled self-improvement (gated) | أمان الإنتاج |
| 007 | إدارة السياق إلزامية | 1M ≠ استراتيجية |
| 008 | Policy Engine غير قابل للتجاوز | الأمان أولاً |
| 009 | Mini-services + Caddy | منفذ واحد خارجي |
| 010 | socket.io للزمن الحقيقي |Bidirectional + reconnect |

---

## 📊 مقاييس الأداء | Performance

| المقياس | القيمة |
|---|---|
| زمن استجابة الـ fast path | ~1-3 ثانية |
| زمن استجابة الـ deep path | 10-60 ثانية (حسب المهمة) |
| حجم قاعدة البيانات | ~500KB (شخصي) |
| استهلاك الذاكرة | ~250MB (مع embeddings) |
| عدد الأدوات | 10 |
| عدد الاختبارات | 25 |
| نسبة النجاح | 100% (25/25) |
