// ============================================
// Message Handler — نقطة الدخول للـ API
// ============================================
// يستقبل رسالة المستخدم → يمررها للـ orchestrator → يرجع النتيجة
// يمكن استخدامه من Next.js API route أو مباشرة
// ============================================

import { orchestrate } from './orchestrator';
import type { UserMessage, ProcessResult, ReActStep, EngineConfig } from './types';

/**
 * يعالج رسالة مستخدم ويرجع النتيجة كاملة (بدون streaming)
 */
export async function handleMessage(
  message: UserMessage,
  config: Partial<EngineConfig> = {},
): Promise<ProcessResult> {
  const generator = orchestrate(message, config);
  let result: ProcessResult | undefined;

  while (true) {
    const { value, done } = await generator.next();
    if (done) {
      result = value;
      break;
    }
  }

  return result ?? {
    answer: 'عذراً، لم أتمكن من معالجة الرسالة.',
    steps: [],
    toolsUsed: [],
    provider: 'none',
  };
}

/**
 * يعالج رسالة مستخدم بـ streaming (يبث الخطوات تدريجياً)
 * يستخدم من SSE endpoint
 */
export async function* handleMessageStream(
  message: UserMessage,
  config: Partial<EngineConfig> = {},
): AsyncGenerator<ReActStep, ProcessResult, undefined> {
  yield* orchestrate(message, config);
}

/**
 * يعالج رسالة بسيطة (نص فقط) — helper سريع
 */
export async function handleTextMessage(
  text: string,
  config?: Partial<EngineConfig>,
): Promise<string> {
  const result = await handleMessage({ text }, config);
  return result.answer;
}
