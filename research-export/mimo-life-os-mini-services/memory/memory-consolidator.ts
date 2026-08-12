/**
 * MiMo Life OS — Memory Consolidator
 * ============================================================================
 * مُضغّط الذاكرة — يفحص كل الذكريات ويضغطها ويحذف القديم.
 *
 * Algorithm:
 * 1. calc sizeBeforeBytes (تقديري بـ متوسط حجم content)
 * 2. promote short_term → long_term (type='short_term' AND createdAt < now - 7d
 *    AND importance > 0.6 AND accessCount > 0)
 * 3. merge similar long_term (computeSimilarity > 0.8): زود importance، حدّث lastAccessed
 * 4. forget low-value (decay < 0.1 AND importance < 0.3 AND type != 'semantic')
 * 5. decay update لكل Memory (computeDecay(lastAccessed))
 * 6. calc sizeAfterBytes
 * 7. return ConsolidationReport
 *
 * Task ID: 3-d (AI-4)
 * ============================================================================
 */

import { db } from '@/lib/db'
import {
  type ConsolidationDetail,
  type ConsolidationReport,
  computeDecay,
  CONSOLIDATE_AFTER_DAYS,
} from './types'
import { normalizeArabic } from './auto-memorizer'

// ============================================================
// Constants
// ============================================================

/** متوسط حجم content لكل ذاكرة (تقديري لحساب الـ size) */
const AVG_MEMORY_BYTES = 256

/** كلمات وقف عربية وانجليزية لـ similarity */
const STOPWORDS = new Set<string>([
  // عربي
  'في',
  'من',
  'الى',
  'على',
  'عن',
  'مع',
  'هذا',
  'هذه',
  'ذلك',
  'التي',
  'الذي',
  'و',
  'او',
  'ثم',
  'قد',
  'كان',
  'كانت',
  'يكون',
  'هي',
  'هو',
  'هم',
  'هن',
  'انا',
  'نحن',
  'انت',
  'ما',
  'لا',
  'لن',
  'لم',
  'ماذا',
  'كيف',
  'متى',
  'اين',
  'ليش',
  'ليه',
  'ان',
  'انه',
  'بس',
  'لكن',
  'بل',
  // English
  'the',
  'a',
  'an',
  'is',
  'are',
  'was',
  'were',
  'be',
  'been',
  'i',
  'you',
  'he',
  'she',
  'it',
  'we',
  'they',
  'me',
  'him',
  'her',
  'us',
  'them',
  'my',
  'your',
  'his',
  'our',
  'their',
  'of',
  'in',
  'on',
  'at',
  'to',
  'for',
  'with',
  'by',
  'from',
  'up',
  'down',
  'as',
  'and',
  'or',
  'but',
  'not',
  'this',
  'that',
])

// ============================================================
// computeSimilarity (Jaccard on word sets)
// ============================================================

/**
 * يحسب التشابه بين نصين بـ Jaccard similarity على word sets.
 *
 * - normalize النصين (trim, lowercase, normalizeArabic)
 * - شيل stopwords
 * - احسب |intersection| / |union|
 *
 * @returns رقم بين 0 و 1 (0 = مختلف، 1 = متطابق)
 */
export function computeSimilarity(a: string, b: string): number {
  if (!a && !b) return 1
  if (!a || !b) return 0

  const na = normalizeArabic(a)
  const nb = normalizeArabic(b)
  if (!na || !nb) return 0
  if (na === nb) return 1

  const setA = new Set(
    na
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w)),
  )
  const setB = new Set(
    nb
      .split(/\s+/)
      .filter((w) => w.length > 1 && !STOPWORDS.has(w)),
  )

  if (setA.size === 0 || setB.size === 0) return 0

  let intersection = 0
  for (const w of setA) {
    if (setB.has(w)) intersection++
  }
  const union = setA.size + setB.size - intersection
  if (union === 0) return 0
  return intersection / union
}

// ============================================================
// decayAll
// ============================================================

/**
 * يحدّث decay لكل Memory records بناءً على lastAccessed.
 * - decay = computeDecay(lastAccessed)
 * - لو decay < 0.05: importance = importance * 0.95 (تنعم النسيان)
 *
 * @returns عدد الذكريات المحدّثة
 */
export async function decayAll(): Promise<{ updated: number }> {
  let updated = 0

  try {
    // اجلب كل الذكريات (نحتاج lastAccessed + importance + decay لكل واحد)
    const memories = await db.memory.findMany({
      select: { id: true, lastAccessed: true, importance: true, decay: true },
    })

    for (const m of memories) {
      const newDecay = computeDecay(m.lastAccessed)
      // لو الفرق ضئيل، skip
      if (Math.abs(newDecay - m.decay) < 0.001) continue

      const updateData: { decay: number; importance?: number } = { decay: newDecay }

      // تنعيم النسيان: لو decay منخفض جداً، قلل importance تدريجياً
      if (newDecay < 0.05) {
        const newImportance = Math.max(0, m.importance * 0.95)
        if (Math.abs(newImportance - m.importance) > 0.001) {
          updateData.importance = newImportance
        }
      }

      await db.memory.update({
        where: { id: m.id },
        data: updateData,
      })
      updated++
    }

    // سجل العملية
    if (updated > 0) {
      await db.memoryOperation.create({
        data: {
          operation: 'decay',
          memoryType: 'all',
          details: JSON.stringify({ updated }),
        },
      })
    }
  } catch (err) {
    console.error('[memory-consolidator] decayAll failed:', err)
  }

  return { updated }
}

// ============================================================
// getStats
// ============================================================

/**
 * إحصائيات الذاكرة:
 * - totalMemories
 * - byLayer: { short_term: n, long_term: n, episodic: n, semantic: n }
 * - avgImportance, avgDecay
 * - oldestMemory, newestMemory
 */
export async function getStats(): Promise<{
  totalMemories: number
  byLayer: Record<string, number>
  avgImportance: number
  avgDecay: number
  oldestMemory?: Date
  newestMemory?: Date
}> {
  const [total, layerAgg, importanceAgg, decayAgg, dateAgg] = await Promise.all([
    db.memory.count(),
    db.memory.groupBy({
      by: ['type'],
      _count: { type: true },
    }),
    db.memory.aggregate({ _avg: { importance: true } }),
    db.memory.aggregate({ _avg: { decay: true } }),
    db.memory.aggregate({ _min: { createdAt: true }, _max: { createdAt: true } }),
  ])

  const byLayer: Record<string, number> = {
    short_term: 0,
    long_term: 0,
    episodic: 0,
    semantic: 0,
  }
  for (const row of layerAgg) {
    if (row.type && row.type in byLayer) {
      byLayer[row.type] = row._count.type
    }
  }

  return {
    totalMemories: total,
    byLayer,
    avgImportance: importanceAgg._avg.importance ?? 0,
    avgDecay: decayAgg._avg.decay ?? 0,
    oldestMemory: dateAgg._min.createdAt ?? undefined,
    newestMemory: dateAgg._max.createdAt ?? undefined,
  }
}

// ============================================================
// consolidate (main entry)
// ============================================================

/**
 * consolidate — الـ entry point الرئيسي لـ consolidator.
 *
 * 1. promote short_term → long_term (مهمة، مُستخدمة، عمرها > 7 أيام)
 * 2. merge similar long_term (similarity > 0.8)
 * 3. forget low-value (decay < 0.1 AND importance < 0.3 AND type != 'semantic')
 * 4. decay update لكل الذكريات
 *
 * @returns ConsolidationReport بـ memoriesScanned, memoriesMerged,
 *          memoriesForgotten, memoriesPromoted, sizes, durationMs, details
 */
export async function consolidate(): Promise<ConsolidationReport> {
  const startTime = Date.now()
  const details: ConsolidationDetail[] = []
  let memoriesScanned = 0
  let memoriesMerged = 0
  let memoriesForgotten = 0
  let memoriesPromoted = 0

  // 1. size before (تقديري)
  const totalBefore = await db.memory.count()
  const sizeBeforeBytes = totalBefore * AVG_MEMORY_BYTES
  memoriesScanned = totalBefore

  // ------------------------------------------------------------
  // 2. Promote short_term → long_term
  // ------------------------------------------------------------
  try {
    const promotionThreshold = new Date(
      Date.now() - CONSOLIDATE_AFTER_DAYS * 24 * 60 * 60 * 1000,
    )

    const candidates = await db.memory.findMany({
      where: {
        type: 'short_term',
        createdAt: { lt: promotionThreshold },
        importance: { gt: 0.6 },
        accessCount: { gt: 0 },
      },
    })

    for (const mem of candidates) {
      try {
        // أنشئ Memory record بـ type='long_term', layer=2
        const promoted = await db.memory.create({
          data: {
            type: 'long_term',
            layer: 2,
            content: mem.content,
            summary: mem.summary,
            importance: mem.importance,
            confidence: mem.confidence,
            decay: 1.0, // reset decay
            accessCount: mem.accessCount,
            lastAccessed: mem.lastAccessed,
            conversationId: mem.conversationId,
            source: 'consolidator',
            tags: mem.tags,
            metadata: JSON.stringify({
              ...(mem.metadata ? JSON.parse(mem.metadata) : {}),
              promotedFrom: mem.id,
              promotedAt: new Date().toISOString(),
            }),
          },
        })

        // سجل العملية
        await db.memoryOperation.create({
          data: {
            operation: 'promote',
            memoryId: promoted.id,
            memoryType: 'long_term',
            details: JSON.stringify({
              fromId: mem.id,
              fromType: 'short_term',
              toId: promoted.id,
              importance: mem.importance,
            }),
          },
        })

        // احذف الأصلي
        await db.memory.delete({ where: { id: mem.id } })

        memoriesPromoted++
        details.push({
          action: 'promote',
          memoryIds: [mem.id, promoted.id],
          reason: `short_term→long_term (importance=${mem.importance.toFixed(2)}, accessCount=${mem.accessCount})`,
        })
      } catch (err) {
        console.error(
          `[memory-consolidator] promote failed for ${mem.id}:`,
          err,
        )
      }
    }
  } catch (err) {
    console.error('[memory-consolidator] promote phase failed:', err)
  }

  // ------------------------------------------------------------
  // 3. Merge similar long_term memories (similarity > 0.8)
  // ------------------------------------------------------------
  try {
    const longTermMemories = await db.memory.findMany({
      where: { type: 'long_term' },
      orderBy: { importance: 'desc' },
    })

    const mergedIds = new Set<string>()

    for (let i = 0; i < longTermMemories.length; i++) {
      const a = longTermMemories[i]
      if (mergedIds.has(a.id)) continue

      for (let j = i + 1; j < longTermMemories.length; j++) {
        const b = longTermMemories[j]
        if (mergedIds.has(b.id)) continue

        const sim = computeSimilarity(a.content, b.content)

        if (sim > 0.8) {
          try {
            // ادمج: زود importance، حدّث lastAccessed على a
            const newImportance = Math.min(1, a.importance + 0.05 + b.importance * 0.1)
            const newLastAccessed = a.lastAccessed > b.lastAccessed ? a.lastAccessed : b.lastAccessed
            const newAccessCount = a.accessCount + b.accessCount

            await db.memory.update({
              where: { id: a.id },
              data: {
                importance: newImportance,
                lastAccessed: newLastAccessed,
                accessCount: newAccessCount,
              },
            })

            // احذف b
            await db.memory.delete({ where: { id: b.id } })

            // سجل العملية
            await db.memoryOperation.create({
              data: {
                operation: 'merge',
                memoryId: a.id,
                memoryType: 'long_term',
                details: JSON.stringify({
                  keptId: a.id,
                  deletedId: b.id,
                  similarity: sim,
                  newImportance,
                }),
              },
            })

            mergedIds.add(b.id)
            memoriesMerged++
            details.push({
              action: 'merge',
              memoryIds: [a.id, b.id],
              reason: `similarity=${sim.toFixed(2)} (>0.8) — merged into ${a.id}`,
            })
          } catch (err) {
            console.error(
              `[memory-consolidator] merge failed for ${a.id}+${b.id}:`,
              err,
            )
          }
        }
      }
    }
  } catch (err) {
    console.error('[memory-consolidator] merge phase failed:', err)
  }

  // ------------------------------------------------------------
  // 4. Forget low-value memories
  // ------------------------------------------------------------
  try {
    const toForget = await db.memory.findMany({
      where: {
        decay: { lt: 0.1 },
        importance: { lt: 0.3 },
        NOT: { type: 'semantic' },
      },
      select: { id: true, type: true, content: true, decay: true, importance: true },
    })

    for (const mem of toForget) {
      try {
        // سجل العملية قبل الحذف
        await db.memoryOperation.create({
          data: {
            operation: 'forget',
            memoryId: mem.id,
            memoryType: mem.type,
            details: JSON.stringify({
              decay: mem.decay,
              importance: mem.importance,
              contentPreview: mem.content.slice(0, 100),
            }),
          },
        })

        await db.memory.delete({ where: { id: mem.id } })
        memoriesForgotten++
        details.push({
          action: 'forget',
          memoryIds: [mem.id],
          reason: `decay=${mem.decay.toFixed(2)} (<0.1) AND importance=${mem.importance.toFixed(2)} (<0.3) AND type=${mem.type} (!=semantic)`,
        })
      } catch (err) {
        console.error(
          `[memory-consolidator] forget failed for ${mem.id}:`,
          err,
        )
      }
    }
  } catch (err) {
    console.error('[memory-consolidator] forget phase failed:', err)
  }

  // ------------------------------------------------------------
  // 5. Decay update (لكل الذكريات)
  // ------------------------------------------------------------
  try {
    const decayResult = await decayAll()
    if (decayResult.updated > 0) {
      details.push({
        action: 'decay',
        memoryIds: [],
        reason: `updated ${decayResult.updated} memories (decay=computeDecay(lastAccessed))`,
      })
    }
  } catch (err) {
    console.error('[memory-consolidator] decay phase failed:', err)
  }

  // ------------------------------------------------------------
  // 6. size after
  // ------------------------------------------------------------
  const totalAfter = await db.memory.count()
  const sizeAfterBytes = totalAfter * AVG_MEMORY_BYTES

  return {
    memoriesScanned,
    memoriesMerged,
    memoriesForgotten,
    memoriesPromoted,
    sizeBeforeBytes,
    sizeAfterBytes,
    durationMs: Date.now() - startTime,
    details,
  }
}
