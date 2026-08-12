// ============================================
// Context Assembler — Phase 3.3: مدموج مع Context Engine
// ============================================
// النقطة 4 من المراجعة: ملء الحقول الفارغة
// - recentTasks, recentNotes, recentActivity بقت تستخرج من ctxV2.items
// - memories بقت تشمل كل أنواع الذاكرة (مش بس memory_*)
// ============================================

import type { AssembledContext } from './types';
import { assembleContextV2 } from '../../src/lib/context';

/**
 * يجمع كل السياق المطلوب للـ ReAct Engine (Phase 3.3)
 *
 * ⭐ محسّن (النقطة 4): يملأ كل الحقول من ctxV2.items
 *
 * @param conversationHistory - آخر الرسائل بـ المحادثة الحالية
 * @param options.conversationId - ID المحادثة بـ Memory Engine
 * @param options.currentQuery - السؤال الحالي (للبحث + التوجيه)
 * @param options.tokenBudget - حد الـ tokens (default 4000)
 */
export async function assembleContext(
  conversationHistory: Array<{ role: string; content: string }> = [],
  options: {
    conversationId?: string;
    currentQuery?: string;
    tokenBudget?: number;
  } = {},
): Promise<AssembledContext> {
  const { conversationId, currentQuery = '', tokenBudget = 4000 } = options;

  // ⭐ استخدم Context Engine V2
  const ctxV2 = await assembleContextV2({
    conversationId,
    currentQuery,
    conversationHistory,
    totalBudget: tokenBudget,
  });

  // ⭐ استخرج البيانات الخام من ctxV2.items (النقطة 4)
  const recentTasks = extractBySource(ctxV2.items, ['recent_activity', 'user_tasks', 'tasks']);
  const recentNotes = extractBySource(ctxV2.items, ['recent_activity', 'user_notes', 'notes']);
  const recentActivity = extractBySource(ctxV2.items, ['recent_activity', 'activity']);
  const memories = extractMemories(ctxV2.items);

  return {
    userContext: ctxV2.formatted,
    recentTasks,
    recentNotes,
    recentActivity,
    conversationHistory,
    memories: memories.map(m => typeof m === 'string' ? m : m.content),
  };
}

/**
 * يستخرج items من ctxV2 حسب source
 */
function extractBySource(items: any[], sources: string[]): unknown[] {
  if (!items) return [];
  return items.filter(item => {
    const source = (item.source || '').toLowerCase();
    return sources.some(s => source.includes(s));
  });
}

/**
 * يستخرج الذكريات من ctxV2.items
 * يشمل كل أنواع الذاكرة (مش بس memory_*)
 */
function extractMemories(items: any[]): Array<{ content: string; layer?: string; importance?: number }> {
  if (!items) return [];
  const memoryKeywords = ['memory', 'short_term', 'long_term', 'episodic', 'semantic', 'fact', 'event'];
  return items
    .filter(item => {
      const source = (item.source || '').toLowerCase();
      return memoryKeywords.some(k => source.includes(k));
    })
    .map(item => ({
      content: item.content || '',
      layer: item.source,
      importance: item.importance,
    }));
}

/**
 * يبني نص السياق للـ LLM
 * ⭐ محسّن: يضيف ملخصات ذكية لو البيانات متوفرة
 */
export function formatContext(ctx: AssembledContext): string {
  let text = ctx.userContext;

  const additions: string[] = [];

  // أضف ملخص المهام
  if (ctx.recentTasks && ctx.recentTasks.length > 0) {
    if (!text.includes('المهام')) {
      additions.push(`📋 مهام حديثة: ${ctx.recentTasks.length}`);
    }
  }

  // أضف ملخص الملاحظات
  if (ctx.recentNotes && ctx.recentNotes.length > 0) {
    if (!text.includes('ملاحظات')) {
      additions.push(`📝 ملاحظات حديثة: ${ctx.recentNotes.length}`);
    }
  }

  // أضف ملخص الذكريات
  if (ctx.memories && ctx.memories.length > 0) {
    additions.push(`🧠 ذكريات متعلقة: ${ctx.memories.length}`);
  }

  if (additions.length > 0) {
    text += '\n\n---\n' + additions.join('\n');
  }

  return text;
}

/**
 * ⭐ API جديد: استخدم V2 مباشرة للحصول على بيانات وصفية كاملة
 */
export async function assembleContextV2Wrapper(
  options: Parameters<typeof assembleContextV2>[0],
) {
  return assembleContextV2(options);
}
