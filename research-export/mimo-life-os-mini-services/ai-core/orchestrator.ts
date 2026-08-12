// ============================================
// Orchestrator — المنسق الذي يختار المسار
// ============================================
// يحلل رسالة المستخدم ويقرر:
// 1) هل تحتاج أدوات؟ → ReAct loop
// 2) هل تحتاج تفكير عميق؟ → reasoning mode
// 3) هل هي محادثة بسيطة؟ → chat مباشر
// 4) هل فيها صورة؟ → vision
// ============================================

import { reactEngine } from './react-engine';
import { generateText, generateWithReasoning, generateVision, isAIConfigured } from '../../src/lib/ai-provider';
import { assembleContext, formatContext } from './context-assembler';
import type { UserMessage, ProcessResult, ReActStep, EngineConfig } from './types';

/** نوع المسار الذي سيختاره الـ orchestrator */
export type RouteType = 'react' | 'chat' | 'reasoning' | 'vision' | 'no_ai';

/**
 * يحلل رسالة المستخدم ويحدد المسار المناسب
 *
 * ⭐ مبسّط (النقطة 5 — 4 مستويات بدل 10):
 * 1. vision (صورة) — أولوية قصوى
 * 2. react (فعل مطلوب) — إنشاء/بحث/تحديث/ترجمة/سؤال بيانات
 * 3. reasoning (تفكير عميق) — لو فيه "حلل بالتفصيل" بدون فعل
 * 4. chat (محادثة) — افتراضي
 *
 * الاستبعادات: "كيف أضيف" → chat (مش react)
 */
export function detectRoute(message: UserMessage): RouteType {
  const text = message.text.toLowerCase().trim();

  // 1) صورة مرفقة → vision
  if (message.attachments?.some((a) => a.type === 'image')) {
    return 'vision';
  }

  // 2) AI غير مهيأ
  if (!isAIConfigured()) {
    return 'no_ai';
  }

  // 3) فعل مطلوب (إنشاء/بحث/تحديث/ترجمة/سؤال بيانات)
  // استبعاد الأسئلة التعليمية: "كيف أضيف"، "وين أضيف"
  const hasActionWord = /(?:اضف|أضف|ضيف|سجل|احفظ|انشئ|أنشئ|خلق|سوي|ابحث|دوّر|حدّث|عدّل|غيّر|احذف|امسح|ترجم|create|add|save|search|update|delete|translate|remind\s+me|flashcards|quiz\s+me|study\s+plan)/i.test(text);
  const isHowQuestion = /(?:كيف|وين|أين|how|where|why|ليش|ليه)\s+(?:اضف|أضف|ضيف|سجل|احفظ|create|add|save)/i.test(text);
  const isDataQuery = /(?:شو\s+مهامي|شو\s+ملاحظاتي|شو\s+تعرف\s+عني|كم\s+مصروف|اعرض\s+مهام|قائمة\s+مهام|آخر\s+نشاط|what\s+tasks|show\s+me\s+my)/i.test(text);

  if ((hasActionWord && !isHowQuestion) || isDataQuery) {
    return 'react';
  }

  // 4) تفكير عميق (لو ما في فعل)
  if (/(?:فكر\s+بعمق|حلل\s+بالتفصيل|اشرح\s+بالتفصيل|كيف\s+يعمل|لماذا|deep\s+dive|think\s+deeply)/i.test(text) && !hasActionWord) {
    return 'reasoning';
  }

  // 5) محادثة عادية
  return 'chat';
}

/**
 * ينفذ المسار المختار
 * @returns AsyncGenerator يبث الخطوات
 */
export async function* orchestrate(
  message: UserMessage,
  config: Partial<EngineConfig> = {},
): AsyncGenerator<ReActStep, ProcessResult, undefined> {
  const route = detectRoute(message);

  switch (route) {
    case 'vision':
      return yield* handleVision(message, config);

    case 'reasoning':
      return yield* handleReasoning(message, config);

    case 'react':
      return yield* reactEngine(message, config);

    case 'no_ai':
      return yield* handleNoAI(message);

    case 'chat':
    default:
      return yield* handleChat(message, config);
  }
}

// ============================================
// Route Handlers
// ============================================

async function* handleChat(
  message: UserMessage,
  config: Partial<EngineConfig>,
): AsyncGenerator<ReActStep, ProcessResult, undefined> {
  const steps: ReActStep[] = [];
  const context = await assembleContext([]);
  const formattedContext = formatContext(context);

  const systemPrompt = `أنت "ميمو"، المساعد الذكي الشخصي لمحمد عادل — طالب هندسة أتمتة صناعية.\n\n${formattedContext}\n\nكن مختصراً وعملياً. بالعربية.`;

  const messages = [
    ...context.conversationHistory.slice(-10),
    { role: 'user', content: message.text },
  ];

  const reply = await generateChat(messages, systemPrompt);

  const step: ReActStep = {
    type: 'answer',
    content: reply || 'عذراً، لم أتمكن من الرد.',
    timestamp: new Date().toISOString(),
  };
  steps.push(step);
  yield step;

  return { answer: reply, steps, toolsUsed: [], provider: 'chat' };
}

async function* handleReasoning(
  message: UserMessage,
  config: Partial<EngineConfig>,
): AsyncGenerator<ReActStep, ProcessResult, undefined> {
  const steps: ReActStep[] = [];
  const context = await assembleContext([]);
  const formattedContext = formatContext(context);

  const systemPrompt = `أنت "ميمو". ${formattedContext}`;

  // Thought step
  const thoughtStep: ReActStep = {
    type: 'thought',
    content: 'تفكير عميق في السؤال...',
    timestamp: new Date().toISOString(),
  };
  steps.push(thoughtStep);
  yield thoughtStep;

  const { answer, reasoning } = await generateWithReasoning(message.text, systemPrompt);

  // Reasoning step
  if (reasoning) {
    const reasoningStep: ReActStep = {
      type: 'thought',
      content: reasoning.slice(0, 500),
      timestamp: new Date().toISOString(),
    };
    steps.push(reasoningStep);
    yield reasoningStep;
  }

  // Answer step
  const answerStep: ReActStep = {
    type: 'answer',
    content: answer,
    timestamp: new Date().toISOString(),
  };
  steps.push(answerStep);
  yield answerStep;

  return { answer, steps, toolsUsed: [], provider: 'reasoning', reasoning };
}

async function* handleVision(
  message: UserMessage,
  config: Partial<EngineConfig>,
): AsyncGenerator<ReActStep, ProcessResult, undefined> {
  const steps: ReActStep[] = [];
  const image = message.attachments?.find((a) => a.type === 'image');

  if (!image?.base64) {
    const step: ReActStep = {
      type: 'answer',
      content: 'لم أجد صورة للتحليل.',
      timestamp: new Date().toISOString(),
    };
    steps.push(step);
    yield step;
    return { answer: step.content, steps, toolsUsed: [], provider: 'vision' };
  }

  // Action step
  const actionStep: ReActStep = {
    type: 'action',
    content: 'تحليل الصورة...',
    timestamp: new Date().toISOString(),
  };
  steps.push(actionStep);
  yield actionStep;

  const result = await generateVision(
    message.text || 'صف هذه الصورة بالتفصيل.',
    image.base64,
    image.mimeType || 'image/jpeg',
  );

  const answerStep: ReActStep = {
    type: 'answer',
    content: result,
    timestamp: new Date().toISOString(),
  };
  steps.push(answerStep);
  yield answerStep;

  return { answer: result, steps, toolsUsed: [], provider: 'vision' };
}

async function* handleNoAI(message: UserMessage): AsyncGenerator<ReActStep, ProcessResult, undefined> {
  const step: ReActStep = {
    type: 'answer',
    content: '⚠️ لا يوجد مزود AI مهيأ. أضف GROQ_API_KEY في .env',
    timestamp: new Date().toISOString(),
  };
  yield step;
  return { answer: step.content, steps: [step], toolsUsed: [], provider: 'none' };
}

// ============================================
// Helper: استيراد generateChat (لتجنب circular dependency)
// ============================================
import { generateChat } from '../../src/lib/ai-provider';
