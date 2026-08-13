/**
 * MiMo Life OS — Memory Engine: Episodic Layer
 * طبقة الذاكرة الحادثية — أحداث زمنية ("متى صار هالشي")
 *
 * Task ID: 3-b (EP-2)
 *
 * المسؤوليات:
 *  - حفظ الأحداث الزمنية بـ EpisodicEvent + Memory record مرتبط (layer=3)
 *  - البحث بالوقت/العاطفة/النص
 *  - timeline لآخر الأحداث (occurredAt DESC)
 *  - update access count + last accessed للـ Memory المرتبط
 *  - delete بـ cascade (Event + Memory)
 *
 * ملاحظات تقنية:
 *  - SQLite ما بدعم array → participants/tags/metadata كـ JSON.stringify
 *  - ربط EpisodicEvent ↔ Memory عبر metadata.eventId
 *  - JSON.parse دائماً بـ try/catch (safeJsonParse)
 */

import { db } from '@/lib/db'
import type { EpisodicMemory, Emotion, MemorySource } from './types'

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
 * يجيب Memory records المرتبطة بـ event IDs دفعة واحدة (batch).
 * - بحث أولي بـ OR contains على metadata (للـ IDs)
 * - فلترة دقيقة بـ JSON.parse + meta.eventId === id
 */
async function findMemoriesByEventIds(eventIds: string[]): Promise<Map<string, any>> {
  if (eventIds.length === 0) return new Map()
  const idSet = new Set(eventIds)
  const memories = await db.memory.findMany({
    where: {
      type: 'episodic',
      OR: eventIds.map((id) => ({ metadata: { contains: id } })),
    },
  })
  const map = new Map<string, any>()
  for (const m of memories) {
    try {
      const meta = JSON.parse(m.metadata || '{}') as Record<string, unknown>
      const eid = meta.eventId
      if (typeof eid === 'string' && idSet.has(eid)) {
        map.set(eid, m)
      }
    } catch {
      // skip malformed metadata
    }
  }
  return map
}

/** يجيب Memory المرتبط بـ event ID واحد */
async function findMemoryByEventId(eventId: string): Promise<any | null> {
  const map = await findMemoriesByEventIds([eventId])
  return map.get(eventId) ?? null
}

// ============================================================
// Mapping
// ============================================================

/**
 * يحوّل EpisodicEvent + Memory (من Prisma) لـ EpisodicMemory type.
 * يفك JSON.stringify للحقول المركبة (participants, tags, metadata).
 *
 * لو memory === null (Event بلا Memory مرتبط)، يستخدم fallback من الـ Event.
 */
export function mapPrismaToEpisodic(event: any, memory: any): EpisodicMemory {
  const metadata = memory
    ? safeJsonParse<Record<string, unknown>>(memory.metadata, {})
    : {}
  const participants = safeJsonParse<string[]>(event.participants, [])
  const tags = memory
    ? safeJsonParse<string[]>(memory.tags, [])
    : safeJsonParse<string[]>(event.tags, [])
  const sourceRaw = memory?.source ?? event.source ?? 'auto'

  return {
    id: memory?.id ?? event.id,
    layer: 'episodic',
    content: memory?.content ?? `${event.title} — ${event.description}`,
    summary: memory?.summary ?? event.title,
    importance: memory?.importance ?? event.importance ?? 0.6,
    confidence: memory?.confidence ?? 1.0,
    decay: memory?.decay ?? 1.0,
    accessCount: memory?.accessCount ?? 0,
    lastAccessed: memory?.lastAccessed ?? event.createdAt,
    createdAt: memory?.createdAt ?? event.createdAt,
    tags,
    source: sourceRaw as MemorySource,
    metadata,
    eventId: event.id,
    occurredAt: event.occurredAt,
    endedAt: event.endedAt ?? undefined,
    duration: event.duration ?? undefined,
    location: event.location ?? undefined,
    participants,
    emotion: event.emotion ? (event.emotion as Emotion) : undefined,
  }
}

// ============================================================
// CRUD
// ============================================================

/**
 * يضيف حدث زمني جديد + Memory record مرتبط.
 *
 * - duration محسوبة بالثواني لو endedAt + occurredAt الاتنين موجودين
 * - importance default 0.6
 * - source default 'auto'
 * - participants/tags/metadata محفوظة كـ JSON.stringify
 *
 * @example
 * await addEpisodic({
 *   title: 'اجتماع مع فريق BMS',
 *   description: 'ناقشنا تقدم المشروع',
 *   occurredAt: new Date(),
 *   participants: ['محمد', 'أحمد'],
 *   emotion: 'happy',
 *   importance: 0.85,
 * })
 */
export async function addEpisodic(input: {
  title: string
  description: string
  occurredAt: Date
  endedAt?: Date
  location?: string
  participants?: string[]
  emotion?: Emotion
  importance?: number
  tags?: string[]
  source?: MemorySource
  conversationId?: string
}): Promise<EpisodicMemory> {
  const importance = input.importance ?? 0.6
  const source = input.source ?? 'auto'
  const tags = input.tags ?? []
  const participants = input.participants ?? []
  const duration =
    input.endedAt && input.occurredAt
      ? Math.max(
          0,
          Math.floor((input.endedAt.getTime() - input.occurredAt.getTime()) / 1000),
        )
      : null

  // 1) حفظ الـ EpisodicEvent
  const event = await db.episodicEvent.create({
    data: {
      title: input.title,
      description: input.description,
      occurredAt: input.occurredAt,
      endedAt: input.endedAt ?? null,
      duration,
      location: input.location ?? null,
      participants: JSON.stringify(participants),
      emotion: input.emotion ?? null,
      importance,
      tags: JSON.stringify(tags),
      source,
    },
  })

  // 2) حفظ Memory record مرتبط (layer=3, type='episodic')
  const memory = await db.memory.create({
    data: {
      type: 'episodic',
      layer: 3,
      content: `${input.title} — ${input.description}`,
      summary: input.title,
      importance,
      confidence: 1.0,
      decay: 1.0,
      source,
      tags: JSON.stringify(tags),
      metadata: JSON.stringify({
        eventId: event.id,
        location: input.location ?? null,
        participants,
        emotion: input.emotion ?? null,
        duration,
      }),
      conversationId: input.conversationId ?? null,
    },
  })

  return mapPrismaToEpisodic(event, memory)
}

/**
 * يجيب EpisodicEvent + Memory المرتبط (بـ metadata.eventId === id).
 *
 * @returns EpisodicMemory أو null لو الحدث مش موجود
 */
export async function getEpisodic(id: string): Promise<EpisodicMemory | null> {
  const event = await db.episodicEvent.findUnique({ where: { id } })
  if (!event) return null

  const memory = await findMemoryByEventId(id)
  return mapPrismaToEpisodic(event, memory)
}

/**
 * بحث متقدم في الأحداث الزمنية.
 *
 * - بحث بـ LIKE على title OR description (لو query غير فارغ)
 * - فلترة بـ occurredAt بين from/to (timeRange)
 * - فلترة بـ emotion (تطابق تام)
 * - ترتيب: occurredAt DESC
 * - limit: default 20
 *
 * @example
 * await searchEpisodic({
 *   query: 'اجتماع',
 *   timeRange: { from: new Date('2024-01-01') },
 *   emotion: 'happy',
 *   limit: 10,
 * })
 */
export async function searchEpisodic(query: {
  query: string
  timeRange?: { from?: Date; to?: Date }
  emotion?: Emotion
  limit?: number
}): Promise<EpisodicMemory[]> {
  const where: any = {}

  // بحث نصي على title OR description
  if (query.query && query.query.length > 0) {
    where.OR = [
      { title: { contains: query.query } },
      { description: { contains: query.query } },
    ]
  }

  // فلاتر إضافية
  const andClauses: any[] = []

  if (query.timeRange?.from) {
    andClauses.push({ occurredAt: { gte: query.timeRange.from } })
  }
  if (query.timeRange?.to) {
    andClauses.push({ occurredAt: { lte: query.timeRange.to } })
  }
  if (query.emotion) {
    andClauses.push({ emotion: query.emotion })
  }

  if (andClauses.length > 0) {
    where.AND = andClauses
  }

  const events = await db.episodicEvent.findMany({
    where,
    orderBy: { occurredAt: 'desc' },
    take: query.limit ?? 20,
  })

  if (events.length === 0) return []

  const memoryMap = await findMemoriesByEventIds(events.map((e) => e.id))
  return events.map((e) => mapPrismaToEpisodic(e, memoryMap.get(e.id)))
}

/**
 * يجيب آخر `limit` حدث زمنياً (occurredAt DESC).
 * مفيد لبناء timeline UI.
 *
 * @param limit عدد الأحداث المطلوبة (default 20)
 */
export async function getTimeline(limit = 20): Promise<EpisodicMemory[]> {
  const events = await db.episodicEvent.findMany({
    orderBy: { occurredAt: 'desc' },
    take: limit,
  })

  if (events.length === 0) return []

  const memoryMap = await findMemoriesByEventIds(events.map((e) => e.id))
  return events.map((e) => mapPrismaToEpisodic(e, memoryMap.get(e.id)))
}

/**
 * يحدّث accessCount (increment +1) + lastAccessed = now للـ Memory المرتبط بـ event ID.
 * مفيد لتتبع وشو يستخدم محمد من ذكرياته.
 *
 * لو ما فيش Memory مرتبط، ما يعمل شي (silent no-op).
 */
export async function updateAccess(id: string): Promise<void> {
  const memory = await findMemoryByEventId(id)
  if (!memory) return

  await db.memory.update({
    where: { id: memory.id },
    data: {
      accessCount: { increment: 1 },
      lastAccessed: new Date(),
    },
  })
}

/**
 * يحذف EpisodicEvent + Memory المرتبط (hard delete).
 * لو ما فيش Memory، يحذف الـ Event بس.
 * idempotent: ما يرمي error لو الحدث محذوف مسبقاً.
 */
export async function deleteEpisodic(id: string): Promise<void> {
  // احذف Memory المرتبط أولاً
  const memory = await findMemoryByEventId(id)
  if (memory) {
    await db.memory.deleteMany({ where: { id: memory.id } })
  }
  // ثم احذف الـ Event (deleteMany = idempotent)
  await db.episodicEvent.deleteMany({ where: { id } })
}
