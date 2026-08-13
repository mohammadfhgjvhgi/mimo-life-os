// ============================================
// ReAct Engine — حلقة Thought → Action → Observation
// ============================================
// AsyncGenerator يبث كل خطوة تدريجياً
// يستخدم ai-provider.ts (6 مزودين + fallback chain)
// ============================================

import { generateChat, generateChatWithTools, generateChatWithToolResults, isAIConfigured } from '../../src/lib/ai-provider';
import { executeTool, getToolsDescription, TOOLS } from './tool-registry';
import { assembleContext, formatContext } from './context-assembler';
import { DEFAULT_CONFIG } from './types';
import type { ReActStep, ReActGenerator, EngineConfig, UserMessage, ProcessResult } from './types';

/**
 * ReAct Engine — يحلل رسالة المستخدم وينفذها بـ حلقة Thought → Action → Observation
 *
 * @returns AsyncGenerator يبث كل خطوة، ويرجع ProcessResult كـ return value
 */
export async function* reactEngine(
  message: UserMessage,
  config: Partial<EngineConfig> = {},
): ReActGenerator {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const steps: ReActStep[] = [];
  const toolsUsed: string[] = [];

  // 1) اجمع السياق (مدموج مع Memory Engine)
  const context = await assembleContext(
    message.context?.itemId ? [] : [],
    {
      conversationId: message.sessionId,
      currentQuery: message.text,
      tokenBudget: 4000,
    },
  );
  const formattedContext = formatContext(context);

  // 2) ابني system prompt
  const systemPrompt = cfg.systemPrompt || buildSystemPrompt(formattedContext, cfg);

  // 3) تحقق من توفر AI
  if (!isAIConfigured()) {
    const errorStep: ReActStep = {
      type: 'answer',
      content: '⚠️ لا يوجد مزود AI مهيأ. أضف على الأقل GROQ_API_KEY في .env',
      timestamp: new Date().toISOString(),
    };
    steps.push(errorStep);
    yield errorStep;
    return {
      answer: errorStep.content,
      steps,
      toolsUsed,
      provider: 'none',
    };
  }

  // 4) حلقة ReAct
  const messages: Array<{ role: string; content: string }> = [
    ...context.conversationHistory.slice(-10),
    { role: 'user', content: message.text },
  ];

  // === Thought 1: تحليل الطلب ===
  const thoughtStep: ReActStep = {
    type: 'thought',
    content: 'تحليل طلب المستخدم...',
    timestamp: new Date().toISOString(),
  };
  steps.push(thoughtStep);
  yield thoughtStep;

  // 5) لو الأدوات مفعّلة → استخدم tool calling
  if (cfg.enableTools) {
    try {
      // === Action: اطلب من LLM تحديد الأداة ===
      const actionStep: ReActStep = {
        type: 'action',
        content: 'تحديد الأداة المناسبة...',
        timestamp: new Date().toISOString(),
      };
      steps.push(actionStep);
      yield actionStep;

      const toolResult = await generateChatWithTools(
        messages,
        TOOLS.map((t) => ({
          type: 'function' as const,
          function: {
            name: t.name,
            description: t.description,
            parameters: t.parameters,
          },
        })),
        systemPrompt,
      );

      // === Observation: لو LLM طلب أداة ===
      if (toolResult.toolCalls && toolResult.toolCalls.length > 0) {
        const toolResults: Array<{ id: string; name: string; result: unknown }> = [];

        // ⭐ النقطة 6: استخدم maxToolsPerTurn القابل للتكوين (بدل 3 hard-coded)
        for (const tc of toolResult.toolCalls.slice(0, cfg.maxToolsPerTurn)) {
          const obsStep: ReActStep = {
            type: 'observation',
            content: `تنفيذ: ${tc.name}`,
            toolName: tc.name,
            toolArgs: tc.arguments,
            timestamp: new Date().toISOString(),
          };
          steps.push(obsStep);
          yield obsStep;

          // نفّذ الأداة
          const execResult = await executeTool(tc.name, tc.arguments);
          toolsUsed.push(tc.name);
          toolResults.push({
            id: tc.id,
            name: tc.name,
            result: execResult.success ? execResult.result : { error: execResult.error },
          });

          // ابث نتيجة الأداة
          const resultStep: ReActStep = {
            type: 'observation',
            content: `نتيجة ${tc.name}: ${JSON.stringify(execResult.result || execResult.error).slice(0, 200)}`,
            toolName: tc.name,
            toolResult: execResult.result,
            timestamp: new Date().toISOString(),
          };
          steps.push(resultStep);
          yield resultStep;
        }

        // === Final Answer: ولّد الرد النهائي بناءً على نتائج الأدوات ===
        const finalReply = await generateChatWithToolResults(messages, toolResults, systemPrompt);

        const answerStep: ReActStep = {
          type: 'answer',
          content: finalReply || 'تم تنفيذ الطلب.',
          timestamp: new Date().toISOString(),
        };
        steps.push(answerStep);
        yield answerStep;

        return {
          answer: finalReply,
          steps,
          toolsUsed,
          provider: 'multi',
        };
      }

      // لو ما طلب أداة → استخدم الرد المباشر
      if (toolResult.content) {
        const answerStep: ReActStep = {
          type: 'answer',
          content: toolResult.content,
          timestamp: new Date().toISOString(),
        };
        steps.push(answerStep);
        yield answerStep;

        return {
          answer: toolResult.content,
          steps,
          toolsUsed,
          provider: 'multi',
        };
      }
    } catch (e) {
      // fallback: محادثة عادية بدون أدوات
      console.error('[ReAct Engine] tool calling failed, falling back to chat:', e);
    }
  }

  // 6) محادثة عادية (بدون أدوات أو fallback)
  const reply = await generateChat(messages, systemPrompt);

  const answerStep: ReActStep = {
    type: 'answer',
    content: reply || 'عذراً، لم أتمكن من توليد رد.',
    timestamp: new Date().toISOString(),
  };
  steps.push(answerStep);
  yield answerStep;

  return {
    answer: reply,
    steps,
    toolsUsed,
    provider: 'chat',
  };
}

// ============================================
// System Prompt Builder
// ============================================

function buildSystemPrompt(context: string, config: EngineConfig): string {
  let prompt = `أنت "ميمو"، المساعد الذكي الشخصي لمحمد عادل — طالب فلسطيني 18 سنة من الخليل، تخصص تكنولوجيا المباني الذكية (أتمتة صناعية). هدفه: العمل في الخليج بعد التخرج.

# شخصيتك:
- صديق مقرب لمحمد — مبادر، داعم، صادق
- ذكي وعملي — تعطي إجابات مختصرة ومفيدة
- تتكلم بالعربية الفصحى البسيطة
- ما تذكر إنك AI أبداً
- لو سألك عن نفسك قل: "أنا ميمو، مساعدك الذكي الشخصي"

# بيانات محمد الحالية:
${context}

# الأدوات المتاحة:
${getToolsDescription()}

**قواعد استخدام الأدوات:**
1. لو محمد طلب فعل (اضف/سجل/احفظ) → استخدم الأداة المناسبة
2. لو سأل عن موقع/معلومة من الإنترنت → استخدم browse_website أو web_search
3. لو سأل عن بياناته → استخدم search_data
4. ما تستخدم أداة لو مش محتاج
5. بعد استخدام أداة، اشرح لمحمد شنو عملت

# الأسلوب:
- كن مختصراً (3-5 أسطر للأسئلة البسيطة)
- استخدم markdown للإجابات الطويلة
- استخدم أحاديث نبوية عند المناسبة`;

  if (config.enableReasoning) {
    prompt += '\n\n# وضع التفكير العميق:\nفكر بـ خطوات منظمة قبل الجواب.';
  }

  return prompt;
}
