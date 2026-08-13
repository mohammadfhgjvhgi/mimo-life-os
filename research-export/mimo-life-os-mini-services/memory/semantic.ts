/**
 * MiMo Life OS — Memory Engine: Semantic Layer
 * طبقة الذاكرة الدلالية — حقائق ثلاثية (subject-predicate-object).
 *
 * Task ID: 3-b (EP-2)
 *
 * المسؤوليات:
 *  - حفظ الحقائق بـ SemanticFact (unique [subject, predicate, object]) + Memory record (layer=4)
 *  - Upsert مع max(old, new) على confidence
 *  - invalidate (soft delete): validUntil = now بدون حذف
 *  - search بـ LIKE على subject/predicate/object
 *  - getFactsAbout(subject): كل ما نعرفه عن entity معيّنة
 *
 * ملاحظات تقنية:
 *  - SQLite ما بدعم array → tags/metadata كـ JSON.stringify
 *  - ربط SemanticFact ↔ Memory عبر metadata.factId
 *  - Prisma upsert بـ where composite: subject_predicate_object
 *  - JSON.parse دائماً بـ try/catch (safeJsonParse)
 */

import { db } from '@/lib/db'
import type { SemanticMemory, MemorySource } from './types'

// ============================================================
// Helpers
// ============================================================

/** Parse JSON بـ أمان — يرجع fallback لو فشل أو null */
function safeJsonParse<T>(raw: string | null | undefined, fallback: T): T {
  if (!raw) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

/**
 * يجيب Memory records المرتبطة بـ fact IDs دفعة واحدة (batch).
 * - بحث أولي بـ OR contains على metadata (للـ IDs)
 * - فلترة دقيقة بـ JSON.parse + meta.factId === id
 */
async function findMemoriesByFactIds(factIds: string[]): Promise<Map<string, any>> {
  if (factIds.length === 0) return new Map()
  const idSet = new Set(factIds)
  const memories = await db.memory.findMany({
    where: {
      type: 'semantic',
      OR: factIds.map((id) => ({ metadata: { contains: id } })),
    },
  })
  const map = new Map<string, any>()
  for (const m of memories) {
    try {
      const meta = JSON.parse(m.metadata || '{}') as Record<string, unknown>
      const fid = meta.factId
      if (typeof fid === 'string' && idSet.has(fid)) {
        map.set(fid, m)
      }
    } catch {
      // skip malformed metadata
    }
  }
  return map
}

/** يجيب Memory المرتبط بـ fact ID واحد */
async function findMemoryByFactId(factId: string): Promise<any | null> {
  const map = await findMemoriesByFactIds([factId])
  return map.get(factId) ?? null
}

// ============================================================
// Mapping
// ============================================================

/**
 * يحوّل SemanticFact + Memory (من Prisma) لـ SemanticMemory type.
 * يفك JSON.stringify للحقول المركبة (tags, metadata).
 *
 * لو memory === null (Fact بلا Memory مرتبط)، يستخدم fallback من الـ Fact.
 */
export function mapPrismaToSemantic(fact: any, memory: any): SemanticMemory {
  const metadata = memory
    ? safeJsonParse<Record<string, unknown>>(memory.metadata, {})
    : {}
  const tags = memory
    ? safeJsonParse<string[]>(memory.tags, [])
    : safeJsonParse<string[]>(fact.tags, [])
  const sourceRaw = memory?.source ?? fact.source ?? 'auto'
  const content =
    memory?.content ?? `${fact.subject} ${fact.predicate} ${fact.object}`

  return {
    id: memory?.id ?? fact.id,
    layer: 'semantic',
    content,
    summary: memory?.summary ?? content,
    importance: memory?.importance ?? 0.9,
    confidence: memory?.confidence ?? fact.confidence ?? 0.8,
    decay: memory?.decay ?? 1.0,
    accessCount: memory?.accessCount ?? 0,
    lastAccessed: memory?.lastAccessed ?? fact.createdAt,
    createdAt: memory?.createdAt ?? fact.createdAt,
    tags,
    source: sourceRaw as MemorySource,
    metadata,
    factId: fact.id,
    subject: fact.subject,
    predicate: fact.predicate,
    object: fact.object,
    validFrom: fact.validFrom,
    validUntil: fact.validUntil ?? undefined,
  }
}

// ============================================================
// CRUD
// ============================================================

/**
 * يضيف/يحدّث حقيقة دلالية (Upsert).
 *
 * - لو الحقيقة موجودة (نفس subject+predicate+object):
 *   - confidence = max(old, new) — ما نخفضهاش
 *   - validUntil = null — إعادة تفعيل (لو كانت invalidated)
 * - لو جديدة: ينشئ SemanticFact + Memory record
 * - Memory record: layer=4, importance=0.9 (الحقائق الدلالية عالية الأهمية)
 * - لو Memory موجود لنفس factId، يحدّثه؛ غير كذلك، ينشئ واحد جديد
 *
 * @example
 * await addFact({
 *   subject: 'محمد',
 *   predicate: 'يدرس',
 *   object: 'هندسة أتمتة صناعية',
 *   confidence: 0.95,
 *   conversationId: 'cuid-...',
 * })
 */
export async function addFact(input: {
  subject: string
  predicate: string
  object: string
  confidence?: number
  conversationId?: string
  tags?: string[]
  source?: MemorySource
}): Promise<SemanticMemory> {
  const confidence = input.confidence ?? 0.8
  const source = input.source ?? 'auto'
  const tags = input.tags ?? []

  const compositeWhere = {
    subject_predicate_object: {
      subject: input.subject,
      predicate: input.predicate,
      object: input.object,
    },
  }

  // 1) اقرأ الحقيقة الموجودة (لو في) لحساب max(old, new) على confidence
  const existing = await db.semanticFact.findUnique({ where: compositeWhere })
  const finalConfidence = existing
    ? Math.max(existing.confidence, confidence)
    : confidence

  // 2) Upsert SemanticFact
  const fact = await db.semanticFact.upsert({
    where: compositeWhere,
    create: {
      subject: input.subject,
      predicate: input.predicate,
      object: input.object,
      confidence: finalConfidence,
      source,
      conversationId: input.conversationId ?? null,
      tags: JSON.stringify(tags),
      validUntil: null,
    },
    update: {
      confidence: finalConfidence,
      validUntil: null, // إعادة تفعيل
      source,
      tags: JSON.stringify(tags),
    },
  })

  // 3) تعامل مع Memory record (update لو موجود، create لو جديد)
  const content = `${input.subject} ${input.predicate} ${input.object}`
  const metadata = JSON.stringify({
    factId: fact.id,
    subject: input.subject,
    predicate: input.predicate,
    object: input.object,
  })

  const existingMemory = await findMemoryByFactId(fact.id)
  let memory
  if (existingMemory) {
    memory = await db.memory.update({
      where: { id: existingMemory.id },
      data: {
        content,
        summary: content,
        importance: 0.9,
        confidence: fact.confidence,
        source,
        tags: JSON.stringify(tags),
        metadata,
        conversationId: input.conversationId ?? existingMemory.conversationId,
      },
    })
  } else {
    memory = await db.memory.create({
      data: {
        type: 'semantic',
        layer: 4,
        content,
        summary: content,
        importance: 0.9,
        confidence: fact.confidence,
        source,
        tags: JSON.stringify(tags),
        metadata,
        conversationId: input.conversationId ?? null,
      },
    })
  }

  return mapPrismaToSemantic(fact, memory)
}

/**
 * يجيب كل الحقائق عن subject معيّن (مثال: كل ما نعرفه عن "محمد").
 *
 * @param subject اسم الـ entity (subject)
 * @param onlyValid فلتر validUntil IS NULL OR validUntil > now (default true)
 * @returns SemanticMemory[] مرتبة بـ confidence DESC
 *
 * @example
 * await getFactsAbout('محمد') // كل الحقائق الصحيحة عن محمد
 */
export async function getFactsAbout(
  subject: string,
  onlyValid = true,
): Promise<SemanticMemory[]> {
  const where: any = { subject }

  if (onlyValid) {
    where.OR = [
      { validUntil: null },
      { validUntil: { gt: new Date() } },
    ]
  }

  const facts = await db.semanticFact.findMany({
    where,
    orderBy: { confidence: 'desc' },
  })

  if (facts.length === 0) return []

  const memoryMap = await findMemoriesByFactIds(facts.map((f) => f.id))
  return facts.map((f) => mapPrismaToSemantic(f, memoryMap.get(f.id)))
}

/**
 * بحث متقدم في الحقائق الدلالية.
 *
 * - بحث بـ LIKE على subject OR predicate OR object (لو query غير فارغ)
 * - فلترة بـ subjects (لو موجودة، تطابق بأي عنصر)
 * - فلترة بـ predicates (لو موجودة، تطابق بأي عنصر)
 * - onlyValid (default true): validUntil IS NULL OR validUntil > now
 * - ترتيب: confidence DESC
 * - limit: default 20
 *
 * @example
 * await searchSemantic({
 *   query: 'هندسة',
 *   subjects: ['محمد'],
 *   predicates: ['يدرس', 'يتقن'],
 * })
 */
export async function searchSemantic(query: {
  query: string
  subjects?: string[]
  predicates?: string[]
  onlyValid?: boolean
  limit?: number
}): Promise<SemanticMemory[]> {
  const where: any = {}

  // بحث نصي على subject OR predicate OR object
  if (query.query && query.query.length > 0) {
    where.OR = [
      { subject: { contains: query.query } },
      { predicate: { contains: query.query } },
      { object: { contains: query.query } },
    ]
  }

  const andClauses: any[] = []

  // فلتر subjects (أي تطابق)
  if (query.subjects && query.subjects.length > 0) {
    andClauses.push({ subject: { in: query.subjects } })
  }

  // فلتر predicates (أي تطابق)
  if (query.predicates && query.predicates.length > 0) {
    andClauses.push({ predicate: { in: query.predicates } })
  }

  // فلتر onlyValid
  if (query.onlyValid !== false) {
    andClauses.push({
      OR: [{ validUntil: null }, { validUntil: { gt: new Date() } }],
    })
  }

  if (andClauses.length > 0) {
    where.AND = andClauses
  }

  const facts = await db.semanticFact.findMany({
    where,
    orderBy: { confidence: 'desc' },
    take: query.limit ?? 20,
  })

  if (facts.length === 0) return []

  const memoryMap = await findMemoriesByFactIds(facts.map((f) => f.id))
  return facts.map((f) => mapPrismaToSemantic(f, memoryMap.get(f.id)))
}

/**
 * يلغي صلاحية حقيقة (soft delete).
 *
 * - validUntil = now للـ SemanticFact
 * - تحديث الـ Memory المرتبط (metadata.validUntil = now.iso)
 *
 * ما يحذفش الحقيقة — تبقى بـ DB لأغراض المراجعة، لكنها ما عادش "صحيحة".
 */
export async function invalidateFact(id: string): Promise<void> {
  const now = new Date()

  await db.semanticFact.update({
    where: { id },
    data: { validUntil: now },
  })

  // حدّث metadata للـ Memory المرتبط (إشارة للقراءة لاحقاً)
  const memory = await findMemoryByFactId(id)
  if (memory) {
    try {
      const meta = JSON.parse(memory.metadata || '{}') as Record<string, unknown>
      const newMeta = { ...meta, validUntil: now.toISOString() }
      await db.memory.update({
        where: { id: memory.id },
        data: { metadata: JSON.stringify(newMeta) },
      })
    } catch {
      // skip malformed metadata
    }
  }
}

/**
 * يجيب كل الحقائق (مع فلترة onlyValid).
 *
 * @param onlyValid فلتر validUntil IS NULL OR validUntil > now (default true)
 * @param limit حد أقصى للنتائج (default 100)
 * @returns SemanticMemory[] مرتبة بـ confidence DESC
 */
export async function getAllFacts(
  onlyValid = true,
  limit = 100,
): Promise<SemanticMemory[]> {
  const where: any = {}

  if (onlyValid) {
    where.OR = [
      { validUntil: null },
      { validUntil: { gt: new Date() } },
    ]
  }

  const facts = await db.semanticFact.findMany({
    where,
    orderBy: { confidence: 'desc' },
    take: limit,
  })

  if (facts.length === 0) return []

  const memoryMap = await findMemoriesByFactIds(facts.map((f) => f.id))
  return facts.map((f) => mapPrismaToSemantic(f, memoryMap.get(f.id)))
}

/**
 * يحذف SemanticFact + Memory المرتبط (hard delete).
 *
 * لو ما فيش Memory، يحذف الـ Fact بس.
 * idempotent: ما يرمي error لو الحقيقة محذوفة مسبقاً.
 *
 * @example
 * await deleteFact('cuid-...') // حذف نهائي
 * // أو استخدم invalidateFact للحذف الناعم
 */
export async function deleteFact(id: string): Promise<void> {
  // احذف Memory المرتبط أولاً
  const memory = await findMemoryByFactId(id)
  if (memory) {
    await db.memory.deleteMany({ where: { id: memory.id } })
  }
  // ثم احذف الـ Fact (deleteMany = idempotent)
  await db.semanticFact.deleteMany({ where: { id } })
}
