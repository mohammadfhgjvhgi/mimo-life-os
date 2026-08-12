/**
 * MiMo Life OS — Memory Search Engine
 * ============================================================================
 * محرك البحث الذكي عبر كل طبقات الذاكرة الأربع.
 *
 * Task ID: 3-c
 * Agent: SR-3 (Memory Search Engine Developer)
 *
 * الطبقات:
 * - short_term + long_term → جدول Memory (type IN (...))
 * - episodic                → جدول EpisodicEvent
 * - semantic                → جدول SemanticFact
 *
 * الخوارزمية:
 * 1. تقسيم الاستعلام: tokenize + normalizeArabic + شيل stopwords
 * 2. بحث متوازي بـ Promise.all في الطبقات المطلوبة (limit * 2 لكل طبقة)
 * 3. تحويل كل record لـ MemorySearchResult مع matchedBy + snippet
 * 4. حساب score موحد (0..1) يجمع: base + bonuses - ثم * importance * decay * layerWeight
 * 5. دمج + ترتيب score DESC، ثم lastAccessed/createdAt DESC، ثم قطع حسب limit
 * 6. fire-and-forget: تحديث accessCount + lastAccessed للـ Memory records
 * ============================================================================
 */

import { db } from '@/lib/db'
import type { Prisma } from '@prisma/client'
import type {
  AnyMemory,
  BaseMemory,
  EpisodicMemory,
  LAYER_WEIGHTS as _LAYER_WEIGHTS_TYPE,
  LongTermMemory,
  MemoryLayer,
  MemorySearchQuery,
  MemorySearchResult,
  MemorySource,
  SemanticMemory,
  ShortTermMemory,
} from './types'
import { LAYER_WEIGHTS } from './types'

// ============================================================
// Stopwords + Constants
// ============================================================

/** Stopwords عربية — حروف الجر، أسماء الإشارة، أدوات الربط، الخ. */
const ARABIC_STOPWORDS = new Set<string>([
  'من', 'في', 'على', 'إلى', 'عن', 'مع', 'هذا', 'هذه', 'ذلك', 'التي', 'الذي',
  'كان', 'كانت', 'قد', 'لقد', 'كما', 'حيث', 'لكن', 'ان', 'او', 'أو', 'ثم', 'كل',
])

/** Stopwords انجليزية — articles, auxiliaries, conjunctions, prepositions */
const ENGLISH_STOPWORDS = new Set<string>([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'and', 'or', 'but', 'if', 'then', 'of', 'to', 'in', 'on', 'at',
])

/** Emotion values المسموحة في EpisodicEvent.emotion */
const VALID_EMOTIONS = new Set<string>([
  'happy', 'sad', 'neutral', 'stressed', 'excited', 'calm', 'angry',
])

const DEFAULT_LIMIT = 10
const LAYER_BUFFER_MULTIPLIER = 2
const SNIPPET_RADIUS = 40
const SEMANTIC_BASE_IMPORTANCE = 0.9

// ============================================================
// Text Processing Helpers
// ============================================================

/**
 * Normalize Arabic text:
 * - شيل التشكيل (ًٌٍَُِّْ + superscript alef)
 * - وحّد أل (الـ → ال): alef wasla + باقي أنواع الهمزة على ألف → ا
 * - وحّد ة → ه
 * - وحّد أ إ آ ء ؤ ئ → ا
 * - وحّد ى (alef maqsura) → ي
 * - شيل tatweel (_) + whitespace زائد
 * - lowercase (لتحسين LIKE على SQLite اللي case-insensitive للـ ASCII)
 *
 * @param text النص الخام
 * @returns النص بعد التطبيع
 */
export function normalizeArabic(text: string): string {
  if (!text) return ''
  return text
    // شيل التشكيل (tanwin + fatha/damma/kasra + shadda + sukun + superscript alef)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // وحّد كل أنواع الهمزة على ألف + alef wasla → ا
    .replace(/[\u0621\u0622\u0623\u0624\u0625\u0626\u0671]/g, 'ا')
    // وحّد ة (taa marbuta) → ه
    .replace(/\u0629/g, 'ه')
    // وحّد ى (alef maqsura) → ي
    .replace(/\u0649/g, 'ي')
    // شيل tatweel (ـ)
    .replace(/\u0640/g, '')
    // whitespace زائد → space واحد
    .replace(/\s+/g, ' ')
    .toLowerCase()
    .trim()
}

/**
 * Tokenize a query string into search keywords.
 *
 * الخطوات:
 * 1. normalizeArabic على النص كامل
 * 2. split بـ whitespace
 * 3. شيل الكلمات اللي طولها < 2
 * 4. شيل stopwords عربية + انجليزية
 * 5. deduplicate مع الحفاظ على الترتيب
 *
 * @param query النص الخام
 * @returns مصفوفة كلمات مفتاحية normalized + deduped
 */
export function tokenize(query: string): string[] {
  if (!query || typeof query !== 'string') return []
  const normalized = normalizeArabic(query)
  if (!normalized) return []
  const tokens = normalized
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1)
    .filter((t) => {
      // stopwords (لأن normalizeArabic بـ lowercase، فالعربية بتضل كما هي والانجليزية lowercase)
      return !ARABIC_STOPWORDS.has(t) && !ENGLISH_STOPWORDS.has(t)
    })
  // dedup مع الحفاظ على الترتيب
  return [...new Set(tokens)]
}

/**
 * Extract a snippet from `content` around the first occurrence of `match`.
 *
 * - لو `match` مش موجود، يرجع أول 80 char من content
 * - بيضيف … على الطرفين لو في قطع
 *
 * @param content النص الكامل
 * @param match النص اللي عايزين نلفّه حوله
 * @param radius عدد الأحرف قبل وبعد (default 40)
 * @returns snippet مختصر مع … لو اتعمل truncate
 */
export function extractSnippet(content: string, match: string, radius = SNIPPET_RADIUS): string {
  if (!content) return ''
  if (!match) return content.slice(0, 80)
  const lower = content.toLowerCase()
  const idx = lower.indexOf(match.toLowerCase())
  if (idx === -1) return content.slice(0, 80)
  const start = Math.max(0, idx - radius)
  const end = Math.min(content.length, idx + match.length + radius)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < content.length ? '…' : ''
  return prefix + content.slice(start, end) + suffix
}

// ============================================================
// Score Calculation
// ============================================================

/**
 * Calculate a unified relevance score in [0, 1].
 *
 * Formula (مطابقة لتوصيف المهمة 3-c):
 * ```
 * base  = 0.5  لو فيه أي LIKE match
 * score = base
 *   + 0.15 لو exact phrase match
 *   + 0.20 لو tag match (لـ long_term عادةً)
 *   + 0.15 لو subject match (semantic layer)
 *   + 0.10 لو time match (episodic layer)
 * score *= importance   (0..1)
 * score *= decay        (0..1)
 * score *= layerWeight  (LAYER_WEIGHTS[layer])
 * score  = clamp(score, 0, 1)
 * ```
 *
 * @param params المعايير: matchedBy + importance + decay + layerWeight + flags
 * @returns score بين 0 و 1
 */
export function calculateScore(params: {
  matchedBy: string
  importance: number
  decay: number
  layerWeight: number
  hasTagMatch?: boolean
  hasSubjectMatch?: boolean
  hasTimeMatch?: boolean
  hasExactMatch?: boolean
}): number {
  // base لكل LIKE match
  let score = 0.5

  // bonuses
  if (params.hasExactMatch) score += 0.15
  if (params.hasTagMatch) score += 0.2
  if (params.hasSubjectMatch) score += 0.15
  if (params.hasTimeMatch) score += 0.1

  // multipliers (مع clamp للقيم غير الرقمية أو الخارجة عن النطاق)
  const importance = clamp01(params.importance)
  const decay = clamp01(params.decay)
  const layerWeight = clamp01(params.layerWeight)

  score *= importance
  score *= decay
  score *= layerWeight

  return clamp01(score)
}

/** Clamp رقم إلى [0, 1] مع حماية من NaN/Infinity */
function clamp01(n: number): number {
  if (typeof n !== 'number' || !Number.isFinite(n)) return 0
  return Math.max(0, Math.min(1, n))
}

/**
 * يحدد الـ matchedBy label بناءً على إشارات التطابق.
 * الأولوية: exact > subject > tag > time > semantic.
 */
function determineMatchedBy(
  hasExactMatch: boolean,
  hasSubjectMatch: boolean,
  hasTagMatch: boolean,
  hasTimeMatch: boolean
): MemorySearchResult['matchedBy'] {
  if (hasExactMatch) return 'exact'
  if (hasSubjectMatch) return 'subject'
  if (hasTagMatch) return 'tag'
  if (hasTimeMatch) return 'time'
  return 'semantic'
}

// ============================================================
// Mappers — Prisma Record → MemorySearchResult
// ============================================================

/**
 * Map a Memory table record to MemorySearchResult.
 * يستخدم `layer` لتحديد إذا كان short_term أو long_term.
 *
 * - JSON.parse آمن لـ tags + metadata + embedding
 * - استخراج conversationId, messageRole, tokens من metadata للـ short_term
 * - expiredAt fallback = now + 24h لو مش موجود
 *
 * @param memory Prisma Memory record
 * @param layer 'short_term' أو 'long_term'
 * @param matchedBy نوع التطابق
 * @param snippet مقتطف النص
 * @param score الـ score المحسوب
 */
export function mapMemoryToResult(
  memory: any,
  layer: MemoryLayer,
  matchedBy: MemorySearchResult['matchedBy'],
  snippet: string,
  score: number
): MemorySearchResult {
  const tags = parseJsonArray(memory?.tags)
  const metadata = parseJsonObject(memory?.metadata)
  const embedding = parseJsonArray(memory?.embedding).map(Number).filter((n) => Number.isFinite(n))
  const source = (memory?.source ?? undefined) as MemorySource | undefined

  const base: BaseMemory = {
    id: memory?.id ?? '',
    layer,
    content: memory?.content ?? '',
    summary: memory?.summary ?? undefined,
    importance: typeof memory?.importance === 'number' ? memory.importance : 0.5,
    confidence: typeof memory?.confidence === 'number' ? memory.confidence : 1.0,
    decay: typeof memory?.decay === 'number' ? memory.decay : 1.0,
    accessCount: typeof memory?.accessCount === 'number' ? memory.accessCount : 0,
    lastAccessed: memory?.lastAccessed ?? new Date(),
    createdAt: memory?.createdAt ?? new Date(),
    tags,
    source,
    metadata,
  }

  let typed: AnyMemory
  if (layer === 'short_term') {
    typed = {
      ...base,
      layer: 'short_term',
      conversationId:
        (metadata?.conversationId as string | undefined) ??
        memory?.conversationId ??
        '',
      messageRole:
        (metadata?.messageRole as ShortTermMemory['messageRole'] | undefined) ??
        'user',
      tokens:
        typeof metadata?.tokens === 'number'
          ? metadata.tokens
          : Math.ceil((memory?.content ?? '').length / 4),
      expiredAt:
        memory?.expiredAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000),
    } as ShortTermMemory
  } else {
    typed = {
      ...base,
      layer: 'long_term',
      conversationId: memory?.conversationId ?? undefined,
      topicTags: tags,
      embedding: embedding.length > 0 ? embedding : undefined,
    } as LongTermMemory
  }

  return { memory: typed, score, matchedBy, snippet }
}

/**
 * Map an EpisodicEvent record to MemorySearchResult.
 *
 * - participants + relatedMemories من JSON.parse
 * - importance من event.importance
 * - content = description، summary = title
 * - matchedBy هون مش hardcoded؛ المفروض الـ caller يحدد، لكن بنرجع 'time' كـ fallback
 *   (الطبقة الحادثية بنطابقها غالباً بـ time range)
 *
 * @param event Prisma EpisodicEvent record
 * @param snippet مقتطف النص
 * @param score الـ score المحسوب
 */
export function mapEpisodicToResult(
  event: any,
  snippet: string,
  score: number
): MemorySearchResult {
  const tags = parseJsonArray(event?.tags)
  const metadata = parseJsonObject(event?.metadata)
  const participants = parseJsonArray(event?.participants)
  const relatedMemories = parseJsonArray(event?.relatedMemories)

  // ادمج relatedMemories + metadata الأصلي داخل metadata واحد
  const mergedMetadata: Record<string, unknown> = { ...(metadata ?? {}) }
  if (relatedMemories.length > 0) {
    mergedMetadata.relatedMemories = relatedMemories
  }

  const episodic: EpisodicMemory = {
    id: event?.id ?? '',
    layer: 'episodic',
    content: event?.description ?? '',
    summary: event?.title ?? undefined,
    importance: typeof event?.importance === 'number' ? event.importance : 0.5,
    confidence: 1.0,
    decay: 1.0,
    accessCount: 0,
    lastAccessed: event?.updatedAt ?? event?.createdAt ?? new Date(),
    createdAt: event?.createdAt ?? new Date(),
    tags,
    source: (event?.source ?? undefined) as MemorySource | undefined,
    metadata: Object.keys(mergedMetadata).length > 0 ? mergedMetadata : undefined,
    eventId: event?.id ?? '',
    occurredAt: event?.occurredAt ?? new Date(),
    endedAt: event?.endedAt ?? undefined,
    duration: typeof event?.duration === 'number' ? event.duration : undefined,
    location: event?.location ?? undefined,
    participants,
    emotion: (event?.emotion ?? undefined) as EpisodicMemory['emotion'],
  }

  return { memory: episodic, score, matchedBy: 'time', snippet }
}

/**
 * Map a SemanticFact record to MemorySearchResult.
 *
 * - content = "subject predicate object" (نص مدمج)
 * - importance = 0.9 (base، عالي لأن الحقائق الدلالية موثوقة)
 * - confidence من fact.confidence (يُستخدم في calculateScore لاحقاً)
 * - matchedBy = 'subject' افتراضياً
 *
 * @param fact Prisma SemanticFact record
 * @param snippet مقتطف النص
 * @param score الـ score المحسوب
 */
export function mapSemanticToResult(
  fact: any,
  snippet: string,
  score: number
): MemorySearchResult {
  const tags = parseJsonArray(fact?.tags)
  const metadata = parseJsonObject(fact?.metadata)
  const subject = fact?.subject ?? ''
  const predicate = fact?.predicate ?? ''
  const object = fact?.object ?? ''

  const semantic: SemanticMemory = {
    id: fact?.id ?? '',
    layer: 'semantic',
    content: `${subject} ${predicate} ${object}`.replace(/\s+/g, ' ').trim(),
    summary: undefined,
    importance: SEMANTIC_BASE_IMPORTANCE,
    confidence: typeof fact?.confidence === 'number' ? fact.confidence : 0.8,
    decay: 1.0,
    accessCount: 0,
    lastAccessed: fact?.updatedAt ?? fact?.createdAt ?? new Date(),
    createdAt: fact?.createdAt ?? new Date(),
    tags,
    source: (fact?.source ?? undefined) as MemorySource | undefined,
    metadata,
    factId: fact?.id ?? '',
    subject,
    predicate,
    object,
    validFrom: fact?.validFrom ?? new Date(),
    validUntil: fact?.validUntil ?? undefined,
  }

  return { memory: semantic, score, matchedBy: 'subject', snippet }
}

// ============================================================
// Main Search Entry Point
// ============================================================

/**
 * البحث الذكي عبر كل طبقات الذاكرة الأربع (بالتوازي).
 *
 * الخطوات:
 * 1. tokenize query → keywords (مع fallback لـ fullQuery لو keywords فاضي)
 * 2. Promise.all للطبقات المطلوبة (query.layers ?? الكل)
 * 3. دمج + ترتيب score DESC، ثم lastAccessed/createdAt DESC
 * 4. قطع حسب query.limit (default 10)
 * 5. fire-and-forget: تحديث accessCount للـ Memory records
 *
 * @param query معايير البحث (نص + فلاتر اختيارية)
 * @returns نتائج مرتبة بـ score DESC
 */
export async function search(query: MemorySearchQuery): Promise<MemorySearchResult[]> {
  const limit = query.limit ?? DEFAULT_LIMIT
  const layerLimit = limit * LAYER_BUFFER_MULTIPLIER
  const fullQuery = (query.query ?? '').trim()

  // tokenization مع fallback للنص الكامل
  let keywords = tokenize(fullQuery)
  if (keywords.length === 0 && fullQuery) {
    keywords = [normalizeArabic(fullQuery)]
  }

  const useFullAsLike = fullQuery.length > 50
  const layers = query.layers ??
    (['short_term', 'long_term', 'episodic', 'semantic'] as MemoryLayer[])

  // بناء الـ tasks حسب الطبقات المطلوبة
  const tasks: Promise<MemorySearchResult[]>[] = []

  if (layers.includes('short_term') || layers.includes('long_term')) {
    tasks.push(
      searchMemoryLayer(query, keywords, fullQuery, useFullAsLike, layerLimit, layers)
    )
  }
  if (layers.includes('episodic')) {
    tasks.push(
      searchEpisodicLayer(query, keywords, fullQuery, useFullAsLike, layerLimit)
    )
  }
  if (layers.includes('semantic')) {
    tasks.push(
      searchSemanticLayer(query, keywords, fullQuery, useFullAsLike, layerLimit)
    )
  }

  // بالتوازي
  const perLayer = await Promise.all(tasks)
  const allResults = perLayer.flat()

  // ترتيب: score DESC، ثم lastAccessed/createdAt DESC
  allResults.sort((a, b) => {
    if (Math.abs(a.score - b.score) > 0.0001) {
      return b.score - a.score
    }
    const aDate = a.memory.lastAccessed ?? a.memory.createdAt
    const bDate = b.memory.lastAccessed ?? b.memory.createdAt
    return bDate.getTime() - aDate.getTime()
  })

  const finalResults = allResults.slice(0, limit)

  // fire-and-forget: تحديث accessCount + lastAccessed (للـ Memory records بس)
  void updateAccessCounts(finalResults).catch(() => {
    // swallow — الـ access tracking مش critical
  })

  return finalResults
}

// ============================================================
// Layer-specific Search Helpers (private)
// ============================================================

/**
 * Search short_term + long_term in the Memory table.
 *
 * where:
 * - type IN ('short_term', 'long_term') (حسب layers المطلوبة)
 * - AND (OR of content/summary LIKE %kw%)
 * - AND filters: tags LIKE, importance >= min, createdAt range, metadata LIKE conversationId
 */
async function searchMemoryLayer(
  query: MemorySearchQuery,
  keywords: string[],
  fullQuery: string,
  useFullAsLike: boolean,
  layerLimit: number,
  layers: MemoryLayer[]
): Promise<MemorySearchResult[]> {
  const types: string[] = []
  if (layers.includes('short_term')) types.push('short_term')
  if (layers.includes('long_term')) types.push('long_term')
  if (types.length === 0) return []

  // OR conditions لكل كلمة مفتاحية
  const orConditions: Prisma.MemoryWhereInput['OR'] = []
  for (const kw of keywords) {
    orConditions!.push({ content: { contains: kw } })
    orConditions!.push({ summary: { contains: kw } })
  }
  if (useFullAsLike && fullQuery) {
    orConditions!.push({ content: { contains: fullQuery } })
    orConditions!.push({ summary: { contains: fullQuery } })
  }
  if (orConditions!.length === 0) return []

  const where: Prisma.MemoryWhereInput = {
    type: { in: types },
    OR: orConditions,
  }

  // AND filters إضافية
  const andFilters: Prisma.MemoryWhereInput[] = []

  if (query.tags && query.tags.length > 0) {
    // أي tag من المطلوبين (OR)
    andFilters.push({
      OR: query.tags.map((tag) => ({ tags: { contains: tag } })),
    })
  }
  if (query.minImportance != null) {
    andFilters.push({ importance: { gte: query.minImportance } })
  }
  if (query.timeRange) {
    const createdAtFilter: Prisma.DateTimeFilter = {}
    if (query.timeRange.from) createdAtFilter.gte = query.timeRange.from
    if (query.timeRange.to) createdAtFilter.lte = query.timeRange.to
    andFilters.push({ createdAt: createdAtFilter })
  }
  if (query.conversationId) {
    andFilters.push({ metadata: { contains: query.conversationId } })
  }
  if (andFilters.length > 0) {
    where.AND = andFilters
  }

  const records = await db.memory.findMany({
    where,
    orderBy: [{ importance: 'desc' }, { lastAccessed: 'desc' }],
    take: layerLimit,
  })

  return records.map((record) => {
    const layer = record.type as MemoryLayer
    const content: string = record.content ?? ''
    const summary: string = record.summary ?? ''

    // detect match signals
    const hasExactMatch =
      fullQuery.length > 0 &&
      (content.includes(fullQuery) || summary.includes(fullQuery))

    const recordTags = parseJsonArray(record.tags)
    const hasTagMatch = !!(
      query.tags &&
      query.tags.length > 0 &&
      recordTags.length > 0 &&
      query.tags.some((t) => recordTags.includes(t))
    )

    const hasTimeMatch = !!(
      query.timeRange && inTimeRange(record.createdAt, query.timeRange)
    )

    const matchedBy = determineMatchedBy(hasExactMatch, false, hasTagMatch, hasTimeMatch)

    // extract snippet
    const matchStr =
      hasExactMatch
        ? fullQuery
        : (firstMatch(content, keywords) ??
          firstMatch(summary, keywords) ??
          keywords[0] ??
          '')
    const snippet = extractSnippet(content || summary, matchStr)

    const score = calculateScore({
      matchedBy,
      importance: record.importance,
      decay: record.decay,
      layerWeight: LAYER_WEIGHTS[layer] ?? 1.0,
      hasTagMatch,
      hasTimeMatch,
      hasExactMatch,
    })

    return mapMemoryToResult(record, layer, matchedBy, snippet, score)
  })
}

/**
 * Search episodic layer in EpisodicEvent table.
 *
 * where:
 * - OR of (title LIKE %kw% OR description LIKE %kw%) لكل كلمة
 * - لو query.tags يحوي emotion محتمل: OR emotion IN emotions
 * - AND filter: occurredAt range, importance >= min
 */
async function searchEpisodicLayer(
  query: MemorySearchQuery,
  keywords: string[],
  fullQuery: string,
  useFullAsLike: boolean,
  layerLimit: number
): Promise<MemorySearchResult[]> {
  const orConditions: Prisma.EpisodicEventWhereInput['OR'] = []

  for (const kw of keywords) {
    orConditions!.push({ title: { contains: kw } })
    orConditions!.push({ description: { contains: kw } })
  }
  if (useFullAsLike && fullQuery) {
    orConditions!.push({ title: { contains: fullQuery } })
    orConditions!.push({ description: { contains: fullQuery } })
  }

  // لو query.tags يحوي emotion محتمل، ضيف OR على emotion
  if (query.tags && query.tags.length > 0) {
    const emotionTags = query.tags
      .map((t) => t.toLowerCase())
      .filter((t) => VALID_EMOTIONS.has(t))
    for (const emo of emotionTags) {
      orConditions!.push({ emotion: emo })
    }
  }

  if (orConditions!.length === 0) return []

  const where: Prisma.EpisodicEventWhereInput = {
    OR: orConditions,
  }

  const andFilters: Prisma.EpisodicEventWhereInput[] = []

  if (query.timeRange) {
    const occurredAtFilter: Prisma.DateTimeFilter = {}
    if (query.timeRange.from) occurredAtFilter.gte = query.timeRange.from
    if (query.timeRange.to) occurredAtFilter.lte = query.timeRange.to
    andFilters.push({ occurredAt: occurredAtFilter })
  }
  if (query.minImportance != null) {
    andFilters.push({ importance: { gte: query.minImportance } })
  }
  if (andFilters.length > 0) {
    where.AND = andFilters
  }

  const records = await db.episodicEvent.findMany({
    where,
    orderBy: [{ importance: 'desc' }, { occurredAt: 'desc' }],
    take: layerLimit,
  })

  return records.map((record) => {
    const content: string = record.description ?? ''
    const title: string = record.title ?? ''

    const hasExactMatch =
      fullQuery.length > 0 &&
      (title.includes(fullQuery) || content.includes(fullQuery))

    const hasTimeMatch = !!(
      query.timeRange && inTimeRange(record.occurredAt, query.timeRange)
    )

    const matchedBy = determineMatchedBy(hasExactMatch, false, false, hasTimeMatch)

    const matchStr =
      hasExactMatch
        ? fullQuery
        : (firstMatch(content, keywords) ??
          firstMatch(title, keywords) ??
          keywords[0] ??
          '')
    const snippet = extractSnippet(content || title, matchStr)

    const score = calculateScore({
      matchedBy,
      importance: record.importance,
      decay: 1.0, // episodic ما عنده decay
      layerWeight: LAYER_WEIGHTS.episodic,
      hasTimeMatch,
      hasExactMatch,
    })

    return mapEpisodicToResult(record, snippet, score)
  })
}

/**
 * Search semantic layer in SemanticFact table.
 *
 * where:
 * - AND[0]: OR of (subject/predicate/object LIKE %kw%) لكل كلمة
 * - AND[1]: (لو onlyValid) validUntil IS NULL OR > now
 * - AND[2]: (لو query.subjects) subject IN subjects
 */
async function searchSemanticLayer(
  query: MemorySearchQuery,
  keywords: string[],
  fullQuery: string,
  useFullAsLike: boolean,
  layerLimit: number
): Promise<MemorySearchResult[]> {
  const onlyValid = true // default per task

  const orConditions: Prisma.SemanticFactWhereInput['OR'] = []
  for (const kw of keywords) {
    orConditions!.push({ subject: { contains: kw } })
    orConditions!.push({ predicate: { contains: kw } })
    orConditions!.push({ object: { contains: kw } })
  }
  if (useFullAsLike && fullQuery) {
    orConditions!.push({ subject: { contains: fullQuery } })
    orConditions!.push({ predicate: { contains: fullQuery } })
    orConditions!.push({ object: { contains: fullQuery } })
  }
  if (orConditions!.length === 0) return []

  const andConditions: Prisma.SemanticFactWhereInput[] = [{ OR: orConditions }]

  // فلترة بـ subjects
  if (query.subjects && query.subjects.length > 0) {
    andConditions.push({ subject: { in: query.subjects } })
  }

  // onlyValid: validUntil IS NULL OR > now
  if (onlyValid) {
    andConditions.push({
      OR: [{ validUntil: null }, { validUntil: { gt: new Date() } }],
    })
  }

  const where: Prisma.SemanticFactWhereInput = {
    AND: andConditions,
  }

  const records = await db.semanticFact.findMany({
    where,
    orderBy: [{ confidence: 'desc' }, { createdAt: 'desc' }],
    take: layerLimit,
  })

  return records.map((record) => {
    const content: string =
      `${record.subject ?? ''} ${record.predicate ?? ''} ${record.object ?? ''}`
        .replace(/\s+/g, ' ')
        .trim()

    const hasExactMatch = fullQuery.length > 0 && content.includes(fullQuery)
    const hasSubjectMatch = !!(
      query.subjects &&
      query.subjects.length > 0 &&
      query.subjects.includes(record.subject)
    )

    const matchedBy = determineMatchedBy(hasExactMatch, hasSubjectMatch, false, false)

    const matchStr =
      hasExactMatch
        ? fullQuery
        : (firstMatch(record.subject ?? '', keywords) ??
          firstMatch(record.predicate ?? '', keywords) ??
          firstMatch(record.object ?? '', keywords) ??
          keywords[0] ??
          '')
    const snippet = extractSnippet(content, matchStr)

    // importance = 0.9 * confidence (نضرب الـ base importance بـ confidence
    // عشان الحقائق الموثوقة تظهر أعلى من الضعيفة)
    const confidence = typeof record.confidence === 'number' ? record.confidence : 0.8
    const effectiveImportance = SEMANTIC_BASE_IMPORTANCE * confidence

    const score = calculateScore({
      matchedBy,
      importance: effectiveImportance,
      decay: 1.0,
      layerWeight: LAYER_WEIGHTS.semantic,
      hasSubjectMatch,
      hasExactMatch,
    })

    return mapSemanticToResult(record, snippet, score)
  })
}

// ============================================================
// Misc Utilities (private)
// ============================================================

/** يجيب أول كلمة من keywords موجودة كـ substring في content (case-insensitive) */
function firstMatch(content: string, keywords: string[]): string | undefined {
  if (!content || keywords.length === 0) return undefined
  const lower = content.toLowerCase()
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) return kw
  }
  return undefined
}

/** يتحقق إن date ضمن range (from/to اختياريين) */
function inTimeRange(date: Date, range: { from?: Date; to?: Date }): boolean {
  if (!date) return false
  if (range.from && date < range.from) return false
  if (range.to && date > range.to) return false
  return true
}

/** JSON.parse آمن لمصفوفة (يرجع [] لو فشل أو مش array) */
function parseJsonArray(raw: unknown): string[] {
  if (raw == null) return []
  if (Array.isArray(raw)) return raw.map((x) => String(x))
  if (typeof raw !== 'string') return []
  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.map((x) => String(x)) : []
  } catch {
    return []
  }
}

/** JSON.parse آمن لـ object (يرجع undefined لو فشل أو مش object) */
function parseJsonObject(raw: unknown): Record<string, unknown> | undefined {
  if (raw == null) return undefined
  if (typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as Record<string, unknown>
  }
  if (typeof raw !== 'string') return undefined
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
      ? (parsed as Record<string, unknown>)
      : undefined
  } catch {
    return undefined
  }
}

/**
 * يحدّث accessCount + lastAccessed لكل Memory records اللي ظهرت في النتائج.
 * Fire-and-forget — ما يوقف الـ response.
 */
async function updateAccessCounts(results: MemorySearchResult[]): Promise<void> {
  const memoryIds = results
    .filter((r) => r.memory.layer === 'short_term' || r.memory.layer === 'long_term')
    .map((r) => r.memory.id)

  if (memoryIds.length === 0) return

  await db.memory.updateMany({
    where: { id: { in: memoryIds } },
    data: {
      accessCount: { increment: 1 },
      lastAccessed: new Date(),
    },
  })
}
