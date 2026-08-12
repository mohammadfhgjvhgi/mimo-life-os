/**
 * MiMo Life OS — Long-Term Memory Layer
 * طبقة الذاكرة طويلة المدى — ملخصات محفوظة من المحادثات
 *
 * Task ID: 3-a
 * Agent: DB-1 (Memory Layers Developer)
 *
 * التصميم:
 * - type='long_term', layer=2
 * - importance = 0.6 افتراضياً (يُرفع عبر الـ consolidator لاحقاً)
 * - confidence = 1.0 افتراضياً (يفترض إن الملخصات موثوقة)
 * - tags/embedding/metadata متخزنة JSON.stringify (SQLite ما بدعم array/vector)
 * - metadata = { conversationId } (نخزّن conversationId بـ metadata فقط
 *   لتفادي قيد FK على Conversation لو المحادثة انحذفت)
 *
 * لاحقاً: عند تفعيل vector search (pgvector / sqlite-vec)،
 * سيتم نقل embedding لحقل مخصص مع cosine similarity search.
 */

import { db } from '@/lib/db'
import type { Memory } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { LongTermMemory, MemorySource } from './types'
import { computeDecay } from './types'

// ============================================================
// Functions
// ============================================================

/**
 * إضافة ذاكرة طويلة المدى — تحفظ Memory record بـ type='long_term'.
 *
 * @param input بيانات الذاكرة (content, summary, importance, tags, embedding, ...)
 * @returns الـ LongTermMemory object بعد الحفظ
 */
export async function addLongTerm(input: {
  content: string
  summary?: string
  importance?: number
  confidence?: number
  tags?: string[]
  conversationId?: string
  embedding?: number[]
  source?: MemorySource
}): Promise<LongTermMemory> {
  const metadata = {
    conversationId: input.conversationId ?? null,
  }

  const record = await db.memory.create({
    data: {
      type: 'long_term',
      layer: 2,
      source: input.source ?? 'auto',
      content: input.content,
      summary: input.summary ?? null,
      importance: input.importance ?? 0.6,
      confidence: input.confidence ?? 1.0,
      decay: 1.0,
      tags: JSON.stringify(input.tags ?? []),
      embedding: input.embedding ? JSON.stringify(input.embedding) : null,
      metadata: JSON.stringify(metadata),
      // conversationId FK left null — مخزّن بـ metadata فقط
    },
  })

  return mapPrismaToLongTerm(record)
}

/**
 * يجلب ذاكرة طويلة المدى واحدة بـ id.
 *
 * @param id معرّف الذاكرة
 * @returns LongTermMemory أو null لو مش موجودة
 */
export async function getLongTerm(id: string): Promise<LongTermMemory | null> {
  const record = await db.memory.findFirst({
    where: { id, type: 'long_term' },
  })

  if (!record) return null
  return mapPrismaToLongTerm(record)
}

/**
 * بحث في الذاكرة طويلة المدى.
 *
 * - فلتر: type='long_term'
 * - فلتر النص: content LIKE '%query%' OR summary LIKE '%query%'
 * - فلتر الـ tags: كل tag لازم يكون موجود في tags (AND)
 * - ترتيب: importance DESC, createdAt DESC
 * - limit: default 20
 *
 * @param query النص + tags اختيارية + limit
 * @returns مصفوفة LongTermMemory
 */
export async function searchLongTerm(query: {
  query: string
  tags?: string[]
  limit?: number
}): Promise<LongTermMemory[]> {
  const where: Prisma.MemoryWhereInput = {
    type: 'long_term',
  }

  // فلتر النص: LIKE على content أو summary
  if (query.query && query.query.trim()) {
    where.OR = [
      { content: { contains: query.query } },
      { summary: { contains: query.query } },
    ]
  }

  // فلتر الـ tags: كل tag لازم يكون موجود (AND)
  if (query.tags && query.tags.length > 0) {
    where.AND = query.tags
      .filter((t) => t && t.trim())
      .map((tag) => ({
        tags: { contains: tag },
      }))
  }

  const records = await db.memory.findMany({
    where,
    orderBy: [{ importance: 'desc' }, { createdAt: 'desc' }],
    take: query.limit ?? 20,
  })

  return records.map(mapPrismaToLongTerm)
}

/**
 * يجلب آخر `limit` ذاكرة طويلة المدى (الأحدث أولاً).
 *
 * @param limit عدد السجلات (default 20)
 * @returns مصفوفة LongTermMemory
 */
export async function listRecent(limit = 20): Promise<LongTermMemory[]> {
  const records = await db.memory.findMany({
    where: { type: 'long_term' },
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  return records.map(mapPrismaToLongTerm)
}

/**
 * يحدّث سجل الوصول لذاكرة طويلة المدى.
 *
 * - increment accessCount
 * - update lastAccessed = now
 * - recompute decay (يصير 1.0 لأن آخر access = الآن)
 *
 * @param id معرّف الذاكرة
 */
export async function updateAccess(id: string): Promise<void> {
  const now = new Date()

  // computeDecay(now) = 1.0 (hoursSince = 0)
  const newDecay = computeDecay(now)

  await db.memory.update({
    where: { id },
    data: {
      accessCount: { increment: 1 },
      lastAccessed: now,
      decay: newDecay,
    },
  })
}

/**
 * يحذف ذاكرة طويلة المدى واحدة.
 * (صامت — لا يرمي خطأ لو الـ id مش موجود)
 *
 * @param id معرّف الذاكرة
 */
export async function deleteLongTerm(id: string): Promise<void> {
  await db.memory.deleteMany({
    where: { id, type: 'long_term' },
  })
}

// ============================================================
// Mapping
// ============================================================

/**
 * تحويل Prisma Memory record إلى LongTermMemory type.
 *
 * - JSON.parse آمن لـ tags, metadata, embedding (بـ try/catch)
 * - استخراج conversationId من metadata (fallback لـ m.conversationId)
 * - topicTags = tags (alias على نفس المصفوفة)
 *
 * @param m Prisma Memory record
 * @returns LongTermMemory object
 */
export function mapPrismaToLongTerm(m: Memory): LongTermMemory {
  // parse tags
  let tags: string[] = []
  try {
    tags = m.tags ? (JSON.parse(m.tags) as string[]) : []
    if (!Array.isArray(tags)) tags = []
  } catch {
    tags = []
  }

  // parse metadata
  let metadata: Record<string, unknown> = {}
  try {
    metadata = m.metadata ? (JSON.parse(m.metadata) as Record<string, unknown>) : {}
    if (typeof metadata !== 'object' || metadata === null) metadata = {}
  } catch {
    metadata = {}
  }

  // parse embedding
  let embedding: number[] | undefined
  try {
    if (m.embedding) {
      const parsed = JSON.parse(m.embedding) as unknown
      if (Array.isArray(parsed) && parsed.every((v) => typeof v === 'number')) {
        embedding = parsed as number[]
      }
    }
  } catch {
    embedding = undefined
  }

  // استخراج conversationId (fallback لـ m.conversationId لو metadata ناقص)
  const conversationId =
    (metadata.conversationId as string | undefined) ??
    m.conversationId ??
    undefined

  return {
    id: m.id,
    layer: 'long_term',
    content: m.content,
    summary: m.summary ?? undefined,
    importance: m.importance,
    confidence: m.confidence,
    decay: m.decay,
    accessCount: m.accessCount,
    lastAccessed: m.lastAccessed,
    createdAt: m.createdAt,
    tags,
    source: (m.source as MemorySource | null) ?? 'auto',
    metadata,
    conversationId,
    topicTags: tags,
    embedding,
  }
}
