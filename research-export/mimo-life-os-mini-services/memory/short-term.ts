/**
 * MiMo Life OS — Short-Term Memory Layer
 * طبقة الذاكرة قصيرة المدى — آخر 10 رسائل من المحادثة الحالية
 *
 * Task ID: 3-a
 * Agent: DB-1 (Memory Layers Developer)
 *
 * التصميم:
 * - type='short_term', layer=1, source='auto'
 * - importance = 0.8 افتراضياً (الأحدث = الأهم)
 * - confidence=1.0, decay=1.0 (ذاكرة حية)
 * - expiredAt = now + 24h (TTL يوم كامل)
 * - tags = ['recent', conversationId] (للفلترة السريعة)
 * - metadata = { messageId, messageRole, conversationId, tokens }
 *   (نخزّن conversationId داخل metadata فقط بدون FK لتفادي قيد
 *    Prisma على Conversation — حتى لو ما فيش Conversation مسجّل)
 */

import { db } from '@/lib/db'
import type { Memory } from '@prisma/client'
import type { Prisma } from '@prisma/client'
import type { ShortTermMemory, MemorySource, MessageRole } from './types'
import { estimateTokens } from './types'

// ============================================================
// Constants
// ============================================================

/** TTL للذاكرة قصيرة المدى = 24 ساعة (مطابق لـ SHORT_TERM_TTL_HOURS في types.ts) */
const SHORT_TERM_TTL_MS = 24 * 60 * 60 * 1000

/** الدورات المسموحة في metadata.messageRole */
const ALLOWED_ROLES: MessageRole[] = ['user', 'assistant', 'system', 'tool']

// ============================================================
// Functions
// ============================================================

/**
 * إضافة ذاكرة قصيرة المدى — تحفظ Memory record بـ type='short_term'.
 *
 * @param input بيانات الرسالة (conversationId, messageId, role, content, ...)
 * @returns الـ ShortTermMemory object بعد الحفظ
 */
export async function addShortTerm(input: {
  conversationId: string
  messageId: string
  messageRole: 'user' | 'assistant' | 'system' | 'tool'
  content: string
  tokens?: number
  importance?: number
}): Promise<ShortTermMemory> {
  const now = new Date()
  const expiredAt = new Date(now.getTime() + SHORT_TERM_TTL_MS)

  // تقدير الـ tokens لو مش موجود
  const tokens = input.tokens ?? estimateTokens(input.content)

  // metadata تحوي المرجع الكامل للرسالة الأصلية
  const metadata = {
    messageId: input.messageId,
    messageRole: input.messageRole,
    conversationId: input.conversationId,
    tokens,
    createdAt: now.toISOString(),
  }

  // tags متضمنة conversationId للفلترة السريعة بـ LIKE
  const tags = ['recent', input.conversationId]

  const record = await db.memory.create({
    data: {
      type: 'short_term',
      layer: 1,
      source: 'auto',
      content: input.content,
      importance: input.importance ?? 0.8,
      confidence: 1.0,
      decay: 1.0,
      expiredAt,
      tags: JSON.stringify(tags),
      metadata: JSON.stringify(metadata),
      // conversationId FK left null — conversationId مخزّن بـ metadata فقط
      // (تفادي قيد FK لو الـ Conversation مش متسجّل بعد)
    },
  })

  return mapPrismaToShortTerm(record)
}

/**
 * يجلب آخر `limit` ذاكرة short_term للمحادثة الحالية.
 *
 * - فلتر: type='short_term' AND expiredAt > now
 * - فلتر على conversationId: metadata LIKE '%conversationId%'
 *   (مع fallback على tags لو metadata مش موجود)
 * - ترتيب: createdAt DESC
 *
 * @param conversationId معرّف المحادثة
 * @param limit عدد الرسائل (default 10)
 * @returns مصفوفة ShortTermMemory مرتبة من الأحدث للأقدم
 */
export async function getRecentMessages(
  conversationId: string,
  limit = 10
): Promise<ShortTermMemory[]> {
  if (!conversationId) return []

  const now = new Date()

  // فلترة على conversationId داخل metadata (JSON string LIKE)
  // كذلك tags يحوي conversationId كـ fallback
  const where: Prisma.MemoryWhereInput = {
    type: 'short_term',
    expiredAt: { gt: now },
    OR: [
      { metadata: { contains: conversationId } },
      { tags: { contains: conversationId } },
    ],
  }

  const records = await db.memory.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: limit,
  })

  // فلترة نهائية بـ TypeScript للتأكد إن conversationId موجود فعلاً
  // (تفادي false positives من LIKE)
  return records
    .map(mapPrismaToShortTerm)
    .filter((m) => m.conversationId === conversationId)
}

/**
 * يحذف كل ذاكرة short_term اللي expiredAt < now (انتهت صلاحيتها).
 *
 * @returns عدد السجلات المحذوفة
 */
export async function cleanupExpired(): Promise<{ deleted: number }> {
  const now = new Date()
  const result = await db.memory.deleteMany({
    where: {
      type: 'short_term',
      expiredAt: { lt: now },
    },
  })

  return { deleted: result.count }
}

/**
 * يحذف كل ذاكرة short_term لمحادثة معينة.
 * (يستخدم عند إنهاء/حذف المحادثة)
 *
 * @param conversationId معرّف المحادثة
 * @returns عدد السجلات المحذوفة
 */
export async function deleteByConversation(
  conversationId: string
): Promise<{ deleted: number }> {
  if (!conversationId) return { deleted: 0 }

  // نفس منطق getRecentMessages: فلترة بـ LIKE على metadata/tags
  // لأن conversationId مش مخزّن كـ Prisma column
  const result = await db.memory.deleteMany({
    where: {
      type: 'short_term',
      OR: [
        { metadata: { contains: conversationId } },
        { tags: { contains: conversationId } },
      ],
    },
  })

  return { deleted: result.count }
}

// ============================================================
// Mapping
// ============================================================

/**
 * تحويل Prisma Memory record إلى ShortTermMemory type.
 *
 * - JSON.parse آمن لـ tags و metadata (بـ try/catch)
 * - استخراج messageId, messageRole, conversationId, tokens من metadata
 * - fallback لـ m.conversationId لو metadata ناقص
 * - tokens محسوب من content لو مش موجود في metadata
 *
 * @param m Prisma Memory record
 * @returns ShortTermMemory object
 */
export function mapPrismaToShortTerm(m: Memory): ShortTermMemory {
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

  // استخراج conversationId
  const conversationId =
    (metadata.conversationId as string | undefined) ??
    m.conversationId ??
    ''

  // استخراج + التحقق من messageRole (fallback لـ 'user')
  const rawRole = metadata.messageRole as string | undefined
  const messageRole: ShortTermMemory['messageRole'] = ALLOWED_ROLES.includes(
    rawRole as MessageRole
  )
    ? (rawRole as MessageRole)
    : 'user'

  // استخراج tokens (لو مش موجود، احسب من content)
  const tokens =
    typeof metadata.tokens === 'number'
      ? metadata.tokens
      : estimateTokens(m.content)

  // استخراج expiredAt (fallback لـ epoch لو null = منتهي)
  const expiredAt = m.expiredAt ?? new Date(0)

  return {
    id: m.id,
    layer: 'short_term',
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
    messageRole,
    tokens,
    expiredAt,
  }
}
