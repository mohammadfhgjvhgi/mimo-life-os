/**
 * MiMo Life OS — Memory Engine (المنسق الرئيسي)
 * ===================================================
 * Task ID: 4 (المشرف)
 *
 * الـ Engine هو الـ entry point الوحيد للتعامل مع الذاكرة.
 * react-engine.ts (Phase 1) حيستدعي `recallRelevant()` قبل كل رد،
 * و `addMessage()` + `memorize()` بعد كل تبادل.
 *
 * البنية:
 *   ┌─────────────────────────────────────┐
 *   │        MemoryEngine (هذا الملف)     │
 *   └────────────┬────────────────────────┘
 *                │
 *    ┌───────────┼───────────┬───────────┐
 *    ▼           ▼           ▼           ▼
 *  short-term  long-term   episodic    semantic
 *    │           │           │           │
 *    └─────┬─────┴─────┬─────┘
 *          ▼           ▼
 *    auto-memorizer  memory-search
 *          │           │
 *          └─────┬─────┘
 *                ▼
 *       memory-consolidator
 */

import { db } from '@/lib/db'
import {
  type MemoryEngine,
  type AddMessageInput,
  type ChatMessage,
  type Conversation,
  type MemoryLayer,
  type MemorySearchQuery,
  type MemorySearchResult,
  type MemorizeInput,
  type MemorizeResult,
  type AssembledContext,
  type ContextRequest,
  type ConsolidationReport,
  type MemoryStats,
  type AnyMemory,
  type ShortTermMemory,
  type LongTermMemory,
  type EpisodicMemory,
  type SemanticMemory,
  LAYER_ORDER,
  SHORT_TERM_MAX_MESSAGES,
  estimateTokens,
  computeDecay,
} from './types'

// طبقات الذاكرة
import { addShortTerm, getRecentMessages, cleanupExpired } from './short-term'
import { addLongTerm, searchLongTerm, listRecent, updateAccess as updateLongTermAccess } from './long-term'
import { addEpisodic, getTimeline, searchEpisodic, updateAccess as updateEpisodicAccess } from './episodic'
import { addFact, getFactsAbout, searchSemantic } from './semantic'
import { search as memorySearch } from './memory-search'
import { memorize as autoMemorize } from './auto-memorizer'
import { consolidate as runConsolidate, decayAll, getStats as getConsolidatorStats } from './memory-consolidator'

// ============================================================
// Engine Implementation
// ============================================================

class MemoryEngineImpl implements MemoryEngine {
  // ============================================================
  // 1) إدارة المحادثات
  // ============================================================

  async startConversation(title?: string): Promise<Conversation> {
    const conv = await db.conversation.create({
      data: {
        title: title ?? null,
        topicTags: '[]',
        messageCount: 0,
        tokenCount: 0,
      },
    })
    return mapPrismaToConversation(conv)
  }

  async addMessage(input: AddMessageInput): Promise<ChatMessage> {
    const tokens = input.tokens ?? estimateTokens(input.content)

    // 1) احفظ الـ Message record
    const msg = await db.message.create({
      data: {
        conversationId: input.conversationId,
        role: input.role,
        content: input.content,
        tokens,
        thinking: input.thinking ?? null,
        toolCalls: input.toolCalls ? JSON.stringify(input.toolCalls) : null,
        toolCallId: input.toolCallId ?? null,
      },
    })

    // 2) حدّث Conversation (messageCount, tokenCount, lastActiveAt)
    await db.conversation.update({
      where: { id: input.conversationId },
      data: {
        messageCount: { increment: 1 },
        tokenCount: { increment: tokens },
        lastActiveAt: new Date(),
      },
    })

    // 3) أضف للـ short-term memory (آخر 10 رسائل)
    //    importance أعلى لـ user و assistant (الحوار الفعلي)
    const importance =
      input.role === 'user' ? 0.85 :
      input.role === 'assistant' ? 0.8 :
      0.5

    try {
      await addShortTerm({
        conversationId: input.conversationId,
        messageId: msg.id,
        messageRole: input.role as 'user' | 'assistant' | 'system' | 'tool',
        content: input.content,
        tokens,
        importance,
      })
    } catch (err) {
      console.error('[memory-engine] addShortTerm failed:', err)
      // ما نوقف العملية — الـ Message محفوظة بالفعل
    }

    return mapPrismaToMessage(msg)
  }

  async endConversation(conversationId: string): Promise<void> {
    // 1) حدّث endedAt
    await db.conversation.update({
      where: { id: conversationId },
      data: { endedAt: new Date() },
    })

    // 2) شغّل auto-memorizer تلقائياً (استخراج ذكريات من المحادثة)
    try {
      const messages = await this.getMessages(conversationId, 100)
      if (messages.length > 0) {
        await autoMemorize({
          conversationId,
          messages,
        })
      }
    } catch (err) {
      console.error('[memory-engine] auto-memorize failed:', err)
    }

    // 3) اعمل title تلقائياً لو مش موجود
    const conv = await db.conversation.findUnique({ where: { id: conversationId } })
    if (conv && !conv.title) {
      const firstUserMsg = await db.message.findFirst({
        where: { conversationId, role: 'user' },
        orderBy: { createdAt: 'asc' },
      })
      if (firstUserMsg) {
        const autoTitle = firstUserMsg.content.slice(0, 60).trim()
        await db.conversation.update({
          where: { id: conversationId },
          data: { title: autoTitle },
        })
      }
    }
  }

  // ============================================================
  // 2) الاستخراج التلقائي (Auto-Memorize)
  // ============================================================

  async memorize(input: MemorizeInput): Promise<MemorizeResult> {
    return autoMemorize(input)
  }

  // ============================================================
  // 3) البحث
  // ============================================================

  async search(query: MemorySearchQuery): Promise<MemorySearchResult[]> {
    return memorySearch(query)
  }

  /**
   * يجمع السياق المناسب لـ query الحالية — يستدعى قبل كل رد من الـ AI.
   * يرجع:
   *  - shortTerm: آخر 10 رسائل من المحادثة الحالية
   *  - relevantLongTerm: ذكريات long_term مطابقة للـ query
   *  - relevantEpisodic: أحداث مطابقة
   *  - relevantSemantic: حقائق دلالية عن محمد + مطابقة للـ query
   */
  async recallRelevant(context: ContextRequest): Promise<AssembledContext> {
    const tokenBudget = context.tokenBudget ?? 4000
    const includeLayers = context.includeLayers ?? LAYER_ORDER
    const startedAt = new Date()

    // 1) Short-term: آخر 10 رسائل من المحادثة الحالية
    let shortTerm: ShortTermMemory[] = []
    if (includeLayers.includes('short_term')) {
      shortTerm = await getRecentMessages(context.conversationId, SHORT_TERM_MAX_MESSAGES)
    }

    // 2) Long-term: بحث بالـ query الحالية
    let relevantLongTerm: LongTermMemory[] = []
    if (includeLayers.includes('long_term') && context.currentQuery.trim()) {
      const results = await searchLongTerm({
        query: context.currentQuery,
        limit: 5,
      })
      relevantLongTerm = results
      // حدّث access للنتائج (fire-and-forget)
      void Promise.all(results.map(r => updateLongTermAccess(r.id).catch(() => {})))
    }

    // 3) Episodic: أحداث مطابقة
    let relevantEpisodic: EpisodicMemory[] = []
    if (includeLayers.includes('episodic') && context.currentQuery.trim()) {
      const events = await searchEpisodic({
        query: context.currentQuery,
        limit: 3,
      })
      relevantEpisodic = events
      void Promise.all(events.map(e => updateEpisodicAccess(e.eventId).catch(() => {})))
    }

    // 4) Semantic: حقائق عن محمد + مطابقة للـ query
    let relevantSemantic: SemanticMemory[] = []
    if (includeLayers.includes('semantic')) {
      // كل الحقائق عن "محمد" (حتى 10)
      const factsAboutMohammad = await getFactsAbout('محمد', true).catch(() => [])
      // + حقائق مطابقة للـ query (لو فيه query)
      let queryFacts: SemanticMemory[] = []
      if (context.currentQuery.trim()) {
        queryFacts = await searchSemantic({
          query: context.currentQuery,
          limit: 5,
        }).catch(() => [])
      }
      // ادمج و dedup بـ factId
      const seen = new Set<string>()
      for (const f of [...factsAboutMohammad, ...queryFacts]) {
        if (!seen.has(f.factId)) {
          seen.add(f.factId)
          relevantSemantic.push(f)
        }
        if (relevantSemantic.length >= 15) break
      }
    }

    // 5) احسب الـ tokens واقطع لو ضروري
    let totalTokens = 0
    const truncatedSections: string[] = []
    const truncated = false

    const sumTokens = (memos: { content: string; summary?: string }[]) =>
      memos.reduce((sum, m) => sum + estimateTokens(m.content) + (m.summary ? estimateTokens(m.summary) : 0), 0)

    totalTokens += sumTokens(shortTerm)
    totalTokens += sumTokens(relevantLongTerm)
    totalTokens += sumTokens(relevantEpisodic)
    totalTokens += sumTokens(relevantSemantic)

    // لو تجاوز budget، قلّل long_term (الأقل أولوية)
    while (totalTokens > tokenBudget && relevantLongTerm.length > 0) {
      const removed = relevantLongTerm.pop()!
      totalTokens -= estimateTokens(removed.content) + (removed.summary ? estimateTokens(removed.summary) : 0)
      truncatedSections.push('long_term')
    }
    // لو لسه فوق، قلّل episodic
    while (totalTokens > tokenBudget && relevantEpisodic.length > 0) {
      const removed = relevantEpisodic.pop()!
      totalTokens -= estimateTokens(removed.content)
      truncatedSections.push('episodic')
    }

    return {
      shortTerm,
      relevantLongTerm,
      relevantEpisodic,
      relevantSemantic,
      totalTokens,
      tokenBudget,
      truncated: truncatedSections.length > 0,
      assembledAt: startedAt,
    }
  }

  // ============================================================
  // 4) الضغط والصيانة
  // ============================================================

  async consolidate(): Promise<ConsolidationReport> {
    return runConsolidate()
  }

  async decay(): Promise<{ updated: number }> {
    return decayAll()
  }

  // ============================================================
  // 5) القراءة
  // ============================================================

  async getConversation(id: string): Promise<Conversation | null> {
    const conv = await db.conversation.findUnique({ where: { id } })
    return conv ? mapPrismaToConversation(conv) : null
  }

  async getMessages(conversationId: string, limit = 50): Promise<ChatMessage[]> {
    const msgs = await db.message.findMany({
      where: { conversationId },
      orderBy: { createdAt: 'asc' },
      take: limit,
    })
    return msgs.map(mapPrismaToMessage)
  }

  async getRecentMemories(layer: MemoryLayer, limit = 20): Promise<AnyMemory[]> {
    if (layer === 'short_term') {
      const mems = await db.memory.findMany({
        where: { type: 'short_term', expiredAt: { gt: new Date() } },
        orderBy: { createdAt: 'desc' },
        take: limit,
      })
      // lazy import to avoid circular dep
      const { mapPrismaToShortTerm } = await import('./short-term')
      return mems.map(mapPrismaToShortTerm)
    }
    if (layer === 'long_term') {
      const results = await listRecent(limit)
      return results
    }
    if (layer === 'episodic') {
      const results = await getTimeline(limit)
      return results
    }
    // semantic
    const { getAllFacts } = await import('./semantic')
    return getAllFacts(true, limit)
  }

  // ============================================================
  // 6) الإحصائيات
  // ============================================================

  async stats(): Promise<MemoryStats> {
    const [
      totalMemories,
      byLayerRows,
      totalConversations,
      totalMessagesAgg,
      totalTokensAgg,
      importanceAgg,
      oldestNewest,
      consolidatorStats,
    ] = await Promise.all([
      db.memory.count(),
      db.memory.groupBy({ by: ['type'], _count: true }),
      db.conversation.count(),
      db.message.aggregate({ _sum: { tokens: true }, _count: true }),
      db.conversation.aggregate({ _sum: { tokenCount: true } }),
      db.memory.aggregate({ _avg: { importance: true } }),
      db.memory.aggregate({ _min: { createdAt: true }, _max: { createdAt: true } }),
      getConsolidatorStats().catch(() => null),
    ])

    const byLayer: Record<MemoryLayer, number> = {
      short_term: 0,
      long_term: 0,
      episodic: 0,
      semantic: 0,
    }
    for (const row of byLayerRows) {
      if (row.type in byLayer) byLayer[row.type as MemoryLayer] = row._count
    }

    // تقدير حجم التخزين (متوسط 200 bytes per memory + 500 per message)
    const storageBytes = (totalMemories * 200) + ((totalMessagesAgg._count ?? 0) * 500)

    return {
      totalMemories,
      byLayer,
      totalConversations,
      totalMessages: totalMessagesAgg._count ?? 0,
      totalTokens: totalTokensAgg._sum?.tokenCount ?? 0,
      oldestMemory: oldestNewest._min?.createdAt ?? undefined,
      newestMemory: oldestNewest._max?.createdAt ?? undefined,
      averageImportance: importanceAgg._avg?.importance ?? 0,
      storageBytes,
    }
  }

  // ============================================================
  // 7) تنظيف دوري
  // ============================================================

  async cleanup(): Promise<{ expiredShortTerm: number }> {
    const { deleted } = await cleanupExpired()
    return { expiredShortTerm: deleted }
  }
}

// ============================================================
// Mappers
// ============================================================

function mapPrismaToConversation(c: any): Conversation {
  let topicTags: string[] = []
  try {
    topicTags = c.topicTags ? JSON.parse(c.topicTags) : []
  } catch {
    topicTags = []
  }
  return {
    id: c.id,
    title: c.title ?? undefined,
    summary: c.summary ?? undefined,
    topicTags,
    messageCount: c.messageCount ?? 0,
    tokenCount: c.tokenCount ?? 0,
    startedAt: c.startedAt,
    lastActiveAt: c.lastActiveAt,
    endedAt: c.endedAt ?? undefined,
  }
}

function mapPrismaToMessage(m: any): ChatMessage {
  let toolCalls: any[] | undefined
  try {
    toolCalls = m.toolCalls ? JSON.parse(m.toolCalls) : undefined
  } catch {
    toolCalls = undefined
  }
  return {
    id: m.id,
    conversationId: m.conversationId,
    role: m.role,
    content: m.content,
    tokens: m.tokens ?? 0,
    thinking: m.thinking ?? undefined,
    toolCalls,
    toolCallId: m.toolCallId ?? undefined,
    createdAt: m.createdAt,
  }
}

// ============================================================
// Singleton Export
// ============================================================

export const memoryEngine: MemoryEngine = new MemoryEngineImpl()

// تصدير منفرد لكل function (للاستخدام المباشر لو محتاج)
export const memory = {
  startConversation: (title?: string) => memoryEngine.startConversation(title),
  addMessage: (input: AddMessageInput) => memoryEngine.addMessage(input),
  endConversation: (id: string) => memoryEngine.endConversation(id),
  memorize: (input: MemorizeInput) => memoryEngine.memorize(input),
  search: (q: MemorySearchQuery) => memoryEngine.search(q),
  recallRelevant: (ctx: ContextRequest) => memoryEngine.recallRelevant(ctx),
  consolidate: () => memoryEngine.consolidate(),
  decay: () => memoryEngine.decay(),
  getConversation: (id: string) => memoryEngine.getConversation(id),
  getMessages: (id: string, limit?: number) => memoryEngine.getMessages(id, limit),
  getRecentMemories: (layer: MemoryLayer, limit?: number) => memoryEngine.getRecentMemories(layer, limit),
  stats: () => memoryEngine.stats(),
  cleanup: () => (memoryEngine as MemoryEngineImpl).cleanup(),
}

// re-export types
export type {
  MemoryEngine,
  AddMessageInput,
  ChatMessage,
  Conversation,
  MemoryLayer,
  MemorySearchQuery,
  MemorySearchResult,
  MemorizeInput,
  MemorizeResult,
  AssembledContext,
  ContextRequest,
  ConsolidationReport,
  MemoryStats,
  AnyMemory,
  ShortTermMemory,
  LongTermMemory,
  EpisodicMemory,
  SemanticMemory,
} from './types'

export { LAYER_ORDER, SHORT_TERM_MAX_MESSAGES, estimateTokens, computeDecay } from './types'
