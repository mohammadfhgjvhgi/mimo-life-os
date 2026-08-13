# 🤖 MiMo Life OS — كل أكواد الذكاء الاصطناعي

> **ملف شامل لمراجعة كل أكواد الـ AI + اكتشاف المشاكل + اقتراح حلول**
> 
> تاريخ التوليد: 2026-08-10
> عدد الملفات: ~25 ملف
> إجمالي الأسطر: ~5000+ سطر

## 📋 فهرس الملفات

### 1. AI Core (ReAct Engine)
- `mini-services/ai-core/types.ts`
- `mini-services/ai-core/react-engine.ts`
- `mini-services/ai-core/orchestrator.ts`
- `mini-services/ai-core/context-assembler.ts`
- `mini-services/ai-core/message-handler.ts`
- `mini-services/ai-core/tool-registry.ts`

### 2. Memory Engine (4 طبقات)
- `src/lib/memory/types.ts`
- `src/lib/memory/memory-engine.ts`
- `src/lib/memory/short-term.ts`
- `src/lib/memory/long-term.ts`
- `src/lib/memory/episodic.ts`
- `src/lib/memory/semantic.ts`
- `src/lib/memory/auto-memorizer.ts`
- `src/lib/memory/memory-search.ts`
- `src/lib/memory/memory-consolidator.ts`

### 3. Context Engineering
- `src/lib/context/context-types.ts`
- `src/lib/context/context-budget.ts`
- `src/lib/context/context-compressor.ts`
- `src/lib/context/context-cache.ts`
- `src/lib/context/context-router.ts`
- `src/lib/context/context-engine.ts`

### 4. Knowledge Graph
- `src/lib/knowledge-graph/index.ts`

### 5. API Routes
- `src/app/api/ai-core/route.ts`
- `src/app/api/memory/route.ts`
- `src/app/api/context/assemble/route.ts`
- `src/app/api/graph/route.ts`
- `src/app/api/graph/rebuild/route.ts`
- `src/app/api/graph/expand/route.ts`
- `src/app/api/graph/stats/route.ts`

### 6. Frontend (UI)
- `src/components/ai/mimo-ai-panel.tsx`
- `src/components/ai/markdown-renderer.tsx`

### 7. Prisma Schema (AI models)
- `prisma/schema.prisma` (الجزء الخاص بالـ AI)

---


---

## 📄 `mini-services/ai-core/types.ts` (93 سطر)

```typescript
// ============================================
// AI Core — Types & Interfaces
// ============================================
// نواة الذكاء الاصطناعي — ReAct Engine
// Thought → Action → Observation → ... → Final Answer
// ============================================

/** خطوة في حلقة ReAct */
export type ReActStepType = 'thought' | 'action' | 'observation' | 'answer';

export interface ReActStep {
  type: ReActStepType;
  content: string;
  toolName?: string;
  toolArgs?: Record<string, unknown>;
  toolResult?: unknown;
  timestamp: string;
}

/** تعريف أداة للـ ReAct Engine */
export interface ToolDef {
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  /** المسار الصحيح للـ API (مثلاً /api/data/tasks) */
  apiPath?: string;
  /** method HTTP */
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** ينفّذ الأداة محلياً (بدل HTTP) */
  execute?: (args: Record<string, unknown>) => Promise<ToolExecutionResult>;
}

export interface ToolExecutionResult {
  success: boolean;
  result?: unknown;
  error?: string;
}

/** رسالة مستخدم */
export interface UserMessage {
  text: string;
  sessionId?: string;
  context?: {
    itemType?: string;
    itemId?: string;
  };
  attachments?: Array<{
    type: 'image' | 'file' | 'audio';
    base64?: string;
    url?: string;
    mimeType?: string;
    name?: string;
  }>;
}

/** سياق مُجمَّع من DB */
export interface AssembledContext {
  userContext: string;
  recentTasks: unknown[];
  recentNotes: unknown[];
  recentActivity: unknown[];
  conversationHistory: Array<{ role: string; content: string }>;
  memories: string[];
}

/** نتيجة معالجة رسالة */
export interface ProcessResult {
  answer: string;
  steps: ReActStep[];
  toolsUsed: string[];
  provider: string;
  reasoning?: string;
}

/** AsyncGenerator يبث الخطوات */
export type ReActGenerator = AsyncGenerator<ReActStep, ProcessResult, undefined>;

/** إعدادات الـ Engine */
export interface EngineConfig {
  maxIterations: number;
  temperature: number;
  systemPrompt?: string;
  preferredProvider?: string;
  enableTools: boolean;
  enableReasoning: boolean;
}

export const DEFAULT_CONFIG: EngineConfig = {
  maxIterations: 5,
  temperature: 0.7,
  enableTools: true,
  enableReasoning: false,
};

```


---

## 📄 `mini-services/ai-core/react-engine.ts` (232 سطر)

```typescript
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

        for (const tc of toolResult.toolCalls.slice(0, 3)) {
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

```


---

## 📄 `mini-services/ai-core/orchestrator.ts` (211 سطر)

```typescript
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
 */
export function detectRoute(message: UserMessage): RouteType {
  const text = message.text.toLowerCase();

  // لو فيها صورة → vision
  if (message.attachments?.some((a) => a.type === 'image')) {
    return 'vision';
  }

  // لو AI غير مهيأ
  if (!isAIConfigured()) {
    return 'no_ai';
  }

  // لو طلب تفكير عميق
  if (/فكر|حلل|خطوات|reason|لماذا|كيف يعمل|اشرح بالتفصيل/i.test(text)) {
    return 'reasoning';
  }

  // لو طلب فعل (يحتاج أداة)
  if (/اضف|سجل|احفظ|create|ضيف|خلق|انشئ|ابحث|browse|تصفح/i.test(text)) {
    return 'react';
  }

  // افتراضي: محادثة
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

```


---

## 📄 `mini-services/ai-core/context-assembler.ts` (70 سطر)

```typescript
// ============================================
// Context Assembler — Phase 3.3: مدموج مع Context Engine
// ============================================
// بقا يدعم الـ API القديم (assembleContext + formatContext)
// بس بـ باطن بيستخدم assembleContextV2 من src/lib/context/
//
// الفرق:
// - قبل: بيجمع كل شي + يرجعه (18K tokens)
// - بعد: يوجّه + يضغط + يوزع ميزانية (4K tokens)
// ============================================

import type { AssembledContext } from './types';
import { assembleContextV2 } from '../../src/lib/context';

/**
 * يجمع كل السياق المطلوب للـ ReAct Engine (Phase 3.3)
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

  // حوّل لـ AssembledContext (legacy)
  // حافظ على الـ shape القديم بـ data، بس داخل userContext الـ formatted الكامل
  return {
    userContext: ctxV2.formatted,
    recentTasks: [],          // مدموجة بـ ctxV2.formatted
    recentNotes: [],          // مدموجة بـ ctxV2.formatted
    recentActivity: [],       // مدموجة بـ ctxV2.formatted
    conversationHistory,
    memories: ctxV2.items
      .filter(i => i.source.startsWith('memory_'))
      .map(i => i.content),
  };
}

/**
 * يبني نص السياق للـ LLM (Phase 3.3: بيرجع الـ formatted من V2)
 */
export function formatContext(ctx: AssembledContext): string {
  // ctx.userContext هو بالفعل الـ formatted النهائي من V2
  return ctx.userContext;
}

/**
 * ⭐ API جديد: استخدم V2 مباشرة للحصول على بيانات وصفية كاملة
 */
export async function assembleContextV2Wrapper(
  options: Parameters<typeof assembleContextV2>[0],
) {
  return assembleContextV2(options);
}

```


---

## 📄 `mini-services/ai-core/message-handler.ts` (57 سطر)

```typescript
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

```


---

## 📄 `mini-services/ai-core/tool-registry.ts` (493 سطر)

```typescript
// ============================================
// Tool Registry — تسجيل الـ 22 أداة الموجودة
// ============================================
// يستخدم المسارات الصحيحة للـ API:
// - إنشاء/تعديل بيانات: /api/data/{section} (POST/PUT/DELETE)
// - ميزات AI: /api/ai/{section} (POST)
// - أدوات خاصة: /api/agent/*, /api/vision/*, /api/web-search, /api/second-brain/*
// ============================================

import type { ToolDef } from './types';

// ============================================
// مسارات API الصحيحة
// ============================================

const DATA_PATHS: Record<string, string> = {
  tasks: '/api/data/tasks',
  notes: '/api/data/notes',
  ideas: '/api/data/ideas',
  projects: '/api/data/projects',
  transactions: '/api/data/transactions',
  habits: '/api/data/habits',
  journalEntries: '/api/data/journalEntries',
  smartReminders: '/api/data/smartReminders',
  reminders: '/api/data/smartReminders',
  achievements: '/api/data/achievements',
  skills: '/api/data/skills',
  certificates: '/api/data/certificates',
  courses: '/api/data/courses',
  contacts: '/api/data/contacts',
  vaultItems: '/api/data/vaultItems',
  homeworks: '/api/data/homeworks',
  grades: '/api/data/grades',
};

// ============================================
// تعريف الـ 22 أداة
// ============================================

export const TOOLS: ToolDef[] = [
  // === أدوات البيانات (تستخدم /api/data/*) ===
  {
    name: 'create_task',
    description: 'إنشاء مهمة جديدة. استخدمها عندما يطلب المستخدم إضافة/إنشاء مهمة.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string', description: 'نص المهمة' },
        priority: { type: 'string', enum: ['low', 'medium', 'high'] },
        dueDate: { type: 'string', description: 'تاريخ الاستحقاق' },
        notes: { type: 'string' },
      },
      required: ['text'],
    },
    apiPath: DATA_PATHS.tasks,
    method: 'POST',
    execute: async (args) => {
      return callApi(DATA_PATHS.tasks!, 'POST', {
        text: args.text,
        priority: args.priority || 'medium',
        dueDate: args.dueDate || '',
        notes: args.notes || '',
        completed: false,
        tags: [],
        subtasks: [],
        editHistory: [],
        kanbanColumn: 'todo',
        isImportant: false,
        timeSpent: 0,
        category: '',
        difficulty: '',
        reason: '',
        recurring: 'none',
        isRecurring: false,
        recurrencePattern: '',
        recurrenceEndDate: '',
        projectId: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
  },
  {
    name: 'create_note',
    description: 'إنشاء ملاحظة جديدة.',
    parameters: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        content: { type: 'string' },
        tags: { type: 'array', items: { type: 'string' } },
      },
      required: ['title', 'content'],
    },
    apiPath: DATA_PATHS.notes,
    method: 'POST',
    execute: async (args) => {
      return callApi(DATA_PATHS.notes!, 'POST', {
        title: args.title,
        content: args.content,
        color: 'default',
        folder: '',
        isPinned: false,
        isSecret: false,
        encryptedContent: '',
        priority: 'medium',
        frontmatterDate: '',
        tags: args.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    },
  },
  {
    name: 'create_reminder',
    description: 'إنشاء تذكير/منبه.',
    parameters: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        scheduledTime: { type: 'string' },
      },
      required: ['message'],
    },
    apiPath: DATA_PATHS.smartReminders,
    method: 'POST',
    execute: async (args) => {
      return callApi(DATA_PATHS.smartReminders!, 'POST', {
        message: args.message,
        type: 'task',
        targetId: '',
        scheduledTime: args.scheduledTime || '',
        isActive: true,
        isRecurring: false,
        triggerCondition: {},
        createdAt: new Date().toISOString(),
      });
    },
  },
  {
    name: 'add_transaction',
    description: 'تسجيل مصروف أو دخل.',
    parameters: {
      type: 'object',
      properties: {
        amount: { type: 'number' },
        description: { type: 'string' },
        type: { type: 'string', enum: ['expense', 'income'] },
        category: { type: 'string' },
      },
      required: ['amount', 'description', 'type'],
    },
    apiPath: DATA_PATHS.transactions,
    method: 'POST',
    execute: async (args) => {
      return callApi(DATA_PATHS.transactions!, 'POST', {
        description: args.description,
        amount: args.amount,
        currency: 'ILS',
        exchangeRate: 1,
        type: args.type,
        category: args.category || 'general',
        isRecurring: false,
        recurringInterval: '',
        createdAt: new Date().toISOString(),
      });
    },
  },
  {
    name: 'update_task',
    description: 'تحديث مهمة موجودة.',
    parameters: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        text: { type: 'string' },
        completed: { type: 'boolean' },
        priority: { type: 'string', enum: ['low', 'medium', 'high'] },
      },
      required: ['id'],
    },
    apiPath: DATA_PATHS.tasks,
    method: 'PUT',
    execute: async (args) => {
      return callApi(`${DATA_PATHS.tasks}?id=${args.id}`, 'PUT', {
        ...(args.text && { text: args.text }),
        ...(args.completed !== undefined && { completed: args.completed }),
        ...(args.priority && { priority: args.priority }),
        updatedAt: new Date().toISOString(),
      });
    },
  },
  {
    name: 'search_data',
    description: 'البحث في بيانات المستخدم (مهام، ملاحظات، مشاريع، يوميات).',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string' },
        type: { type: 'string' },
      },
      required: ['query'],
    },
    execute: async (args) => {
      return callApi('/api/second-brain/query', 'POST', {
        question: args.query,
        limit: 5,
      });
    },
  },
  // === أدوات الويب ===
  {
    name: 'web_search',
    description: 'البحث في الإنترنت عن معلومات حديثة.',
    parameters: {
      type: 'object',
      properties: { query: { type: 'string' } },
      required: ['query'],
    },
    execute: async (args) => {
      return callApi('/api/web-search', 'POST', { query: args.query });
    },
  },
  {
    name: 'browse_website',
    description: 'تصفح موقع ويب واستخراج محتواه.',
    parameters: {
      type: 'object',
      properties: {
        url: { type: 'string' },
        task: { type: 'string' },
      },
      required: ['url'],
    },
    execute: async (args) => {
      return callApi('/api/agent/browse', 'POST', { url: args.url, task: args.task });
    },
  },
  {
    name: 'scrape_url',
    description: 'استخراج المحتوى النصي من URL.',
    parameters: {
      type: 'object',
      properties: { url: { type: 'string' } },
      required: ['url'],
    },
    execute: async (args) => {
      return callApi('/api/agent/browse', 'POST', { url: args.url });
    },
  },
  {
    name: 'search_youtube',
    description: 'البحث في YouTube عن فيديوهات.',
    parameters: {
      type: 'object',
      properties: { query: { type: 'string' } },
      required: ['query'],
    },
    execute: async (args) => {
      return callApi('/api/web-search', 'POST', { query: `site:youtube.com ${args.query}` });
    },
  },
  {
    name: 'search_github',
    description: 'البحث في GitHub عن مستودعات.',
    parameters: {
      type: 'object',
      properties: { query: { type: 'string' } },
      required: ['query'],
    },
    execute: async (args) => {
      return callApi('/api/web-search', 'POST', { query: `site:github.com ${args.query}` });
    },
  },
  // === أدوات التحليل ===
  {
    name: 'analyze_image',
    description: 'تحليل صورة — وصف، وسوم، نص.',
    parameters: {
      type: 'object',
      properties: {
        imageBase64: { type: 'string' },
        question: { type: 'string' },
      },
      required: ['imageBase64'],
    },
    execute: async (args) => {
      return callApi('/api/vision/analyze', 'POST', {
        imageBase64: args.imageBase64,
        question: args.question,
      });
    },
  },
  {
    name: 'translate',
    description: 'ترجمة نص من لغة لأخرى.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        target: { type: 'string' },
      },
      required: ['text', 'target'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/explain', 'POST', {
        concept: `ترجم لل${args.target}: ${args.text}`,
        level: 'simple',
      });
    },
  },
  {
    name: 'summarize',
    description: 'تلخيص نص طويل.',
    parameters: {
      type: 'object',
      properties: { text: { type: 'string' } },
      required: ['text'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/summarize', 'POST', { text: args.text });
    },
  },
  {
    name: 'extract_text_from_image',
    description: 'استخراج نص من صورة (OCR).',
    parameters: {
      type: 'object',
      properties: { imageBase64: { type: 'string' } },
      required: ['imageBase64'],
    },
    execute: async (args) => {
      return callApi('/api/vision/analyze', 'POST', {
        imageBase64: args.imageBase64,
        question: 'استخرج كل النص من هذه الصورة',
      });
    },
  },
  // === أدوات دراسية ===
  {
    name: 'generate_flashcards',
    description: 'توليد بطاقات تعليمية من نص.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        count: { type: 'number' },
      },
      required: ['text'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/flashcards', 'POST', {
        text: args.text,
        count: args.count || 10,
      });
    },
  },
  {
    name: 'generate_quiz',
    description: 'توليد اختبار من نص.',
    parameters: {
      type: 'object',
      properties: {
        text: { type: 'string' },
        count: { type: 'number' },
      },
      required: ['text'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/quiz', 'POST', {
        text: args.text,
        count: args.count || 5,
      });
    },
  },
  {
    name: 'summarize_lecture',
    description: 'تلخيص محاضرة + نقاط رئيسية + مفاهيم.',
    parameters: {
      type: 'object',
      properties: { text: { type: 'string' } },
      required: ['text'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/summarize', 'POST', { text: args.text });
    },
  },
  {
    name: 'explain_concept',
    description: 'شرح مفهوم دراسي.',
    parameters: {
      type: 'object',
      properties: {
        concept: { type: 'string' },
        level: { type: 'string', enum: ['simple', 'detailed', 'academic'] },
      },
      required: ['concept'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/explain', 'POST', {
        concept: args.concept,
        level: args.level || 'simple',
      });
    },
  },
  {
    name: 'create_study_plan',
    description: 'إنشاء خطة دراسية.',
    parameters: {
      type: 'object',
      properties: {
        topics: { type: 'array', items: { type: 'string' } },
        deadline: { type: 'string' },
        hoursPerDay: { type: 'number' },
      },
      required: ['topics'],
    },
    execute: async (args) => {
      return callApi('/api/ai/study/plan', 'POST', {
        topics: args.topics,
        deadline: args.deadline || '',
        hoursPerDay: args.hoursPerDay || 3,
      });
    },
  },
];

// ============================================
// Helper: استدعاء API داخلي
// ============================================

async function callApi(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: unknown,
): Promise<{ success: boolean; result?: unknown; error?: string }> {
  try {
    const baseUrl = process.env.AI_CORE_API_BASE || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}${path}`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => '');
      return { success: false, error: `API ${res.status}: ${errText.slice(0, 200)}` };
    }

    const data = await res.json();
    return { success: true, result: data };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : String(e) };
  }
}

// ============================================
// API
// ============================================

/** خريطة الأدوات بالاسم */
const TOOL_MAP = new Map(TOOLS.map((t) => [t.name, t]));

/** احصل على أداة بالاسم */
export function getTool(name: string): ToolDef | undefined {
  return TOOL_MAP.get(name);
}

/** قائمة أسماء كل الأدوات */
export function getToolNames(): string[] {
  return TOOLS.map((t) => t.name);
}

/** صيغة وصف الأدوات للـ LLM */
export function getToolsDescription(): string {
  return TOOLS.map((t) => `- ${t.name}: ${t.description}`).join('\n');
}

/** نفّذ أداة بالاسم */
export async function executeTool(
  name: string,
  args: Record<string, unknown>,
): Promise<{ success: boolean; result?: unknown; error?: string }> {
  const tool = getTool(name);
  if (!tool) {
    return { success: false, error: `أداة غير معروفة: ${name}` };
  }
  if (!tool.execute) {
    return { success: false, error: `الأداة ${name} ليس لها تنفيذ` };
  }
  return tool.execute(args);
}

```


---

## 📄 `src/lib/memory/types.ts` (351 سطر)

```typescript
/**
 * MiMo Life OS — Memory Engine Types
 * الأنواع المشتركة بين كل طبقات الذاكرة
 *
 * Task ID: 2 (المشرف)
 *
 * 4 طبقات:
 * 1. short_term  — آخر 10 رسائل (المحادثة الحالية، RAM-like)
 * 2. long_term   — كل المحادثات + بحث (disk)
 * 3. episodic    — أحداث زمنية ("متى صار هالشي")
 * 4. semantic    — حقائق ثلاثية ("شو نعرف عن محمد")
 */

// ============================================================
// الطبقات الأساسية
// ============================================================

export type MemoryLayer = 'short_term' | 'long_term' | 'episodic' | 'semantic'

export const LAYER_ORDER: MemoryLayer[] = ['short_term', 'long_term', 'episodic', 'semantic']

export const LAYER_WEIGHTS: Record<MemoryLayer, number> = {
  short_term: 1.0, // أعلى أولوية (الأحدث)
  long_term: 0.7,
  episodic: 0.85,
  semantic: 0.9,
}

export const SHORT_TERM_MAX_MESSAGES = 10
export const SHORT_TERM_TTL_HOURS = 24
export const CONSOLIDATE_AFTER_DAYS = 7

// ============================================================
// الذاكرة الموحدة (Union type لكل الطبقات)
// ============================================================

export interface BaseMemory {
  id: string
  layer: MemoryLayer
  content: string
  summary?: string
  importance: number // 0..1
  confidence: number // 0..1
  decay: number // 0..1 (يقل مع الوقت)
  accessCount: number
  lastAccessed: Date
  createdAt: Date
  tags?: string[]
  source?: MemorySource
  metadata?: Record<string, unknown>
}

export type MemorySource = 'auto' | 'manual' | 'consolidator' | 'user_edit' | 'system'

// ============================================================
// طبقة Short Term — آخر 10 رسائل
// ============================================================

export interface ShortTermMemory extends BaseMemory {
  layer: 'short_term'
  conversationId: string
  messageRole: 'user' | 'assistant' | 'system' | 'tool'
  tokens: number
  expiredAt: Date
}

// ============================================================
// طبقة Long Term — ملخصات محفوظة من المحادثات
// ============================================================

export interface LongTermMemory extends BaseMemory {
  layer: 'long_term'
  conversationId?: string
  topicTags: string[]
  embedding?: number[]
}

// ============================================================
// طبقة Episodic — أحداث زمنية
// ============================================================

export interface EpisodicMemory extends BaseMemory {
  layer: 'episodic'
  eventId: string
  occurredAt: Date
  endedAt?: Date
  duration?: number // ثواني
  location?: string
  participants: string[]
  emotion?: Emotion
}

export type Emotion = 'happy' | 'sad' | 'neutral' | 'stressed' | 'excited' | 'calm' | 'angry'

// ============================================================
// طبقة Semantic — حقائق ثلاثية (subject-predicate-object)
// ============================================================

export interface SemanticMemory extends BaseMemory {
  layer: 'semantic'
  factId: string
  subject: string
  predicate: string
  object: string
  validFrom: Date
  validUntil?: Date
}

// ============================================================
// Union type
// ============================================================

export type AnyMemory = ShortTermMemory | LongTermMemory | EpisodicMemory | SemanticMemory

// ============================================================
// المحادثة والرسالة
// ============================================================

export interface Conversation {
  id: string
  title?: string
  summary?: string
  topicTags: string[]
  messageCount: number
  tokenCount: number
  startedAt: Date
  lastActiveAt: Date
  endedAt?: Date
}

export type MessageRole = 'user' | 'assistant' | 'system' | 'tool'

export interface ChatMessage {
  id: string
  conversationId: string
  role: MessageRole
  content: string
  tokens: number
  thinking?: string
  toolCalls?: ToolCall[]
  toolCallId?: string
  createdAt: Date
}

export interface ToolCall {
  name: string
  args: Record<string, unknown>
  result?: unknown
}

// ============================================================
// نتائج البحث
// ============================================================

export interface MemorySearchResult {
  memory: AnyMemory
  score: number // 0..1
  matchedBy: 'exact' | 'semantic' | 'tag' | 'time' | 'subject'
  snippet: string // الجزء اللي طابق
}

export interface MemorySearchQuery {
  query: string
  conversationId?: string
  layers?: MemoryLayer[]
  limit?: number
  minImportance?: number
  timeRange?: {
    from?: Date
    to?: Date
  }
  tags?: string[]
  subjects?: string[] // للبحث الدلالي (عن محمد مثلاً)
}

// ============================================================
// استخراج الذاكرة التلقائي (Auto Memorizer)
// ============================================================

export interface ExtractedMemory {
  type: MemoryLayer
  content: string
  summary?: string
  importance: number
  confidence: number
  tags?: string[]
  // للـ episodic
  occurredAt?: Date
  participants?: string[]
  emotion?: Emotion
  // للـ semantic
  subject?: string
  predicate?: string
  object?: string
}

export interface MemorizeInput {
  conversationId: string
  messages: ChatMessage[]
  userId?: string
}

export interface MemorizeResult {
  extracted: ExtractedMemory[]
  stored: AnyMemory[]
  errors: string[]
  processingMs: number
}

// ============================================================
// ضغط الذاكرة (Consolidator)
// ============================================================

export interface ConsolidationReport {
  memoriesScanned: number
  memoriesMerged: number
  memoriesForgotten: number
  memoriesPromoted: number // short_term → long_term
  sizeBeforeBytes: number
  sizeAfterBytes: number
  durationMs: number
  details: ConsolidationDetail[]
}

export interface ConsolidationDetail {
  action: 'merge' | 'forget' | 'promote' | 'decay' | 'keep'
  memoryIds: string[]
  reason: string
}

// ============================================================
// السياق المجمّع (Context Assembly)
// ============================================================

export interface AssembledContext {
  shortTerm: ShortTermMemory[]
  relevantLongTerm: LongTermMemory[]
  relevantEpisodic: EpisodicMemory[]
  relevantSemantic: SemanticMemory[]
  totalTokens: number
  tokenBudget: number
  truncated: boolean
  assembledAt: Date
}

export interface ContextRequest {
  conversationId: string
  currentQuery: string
  tokenBudget?: number
  includeLayers?: MemoryLayer[]
}

// ============================================================
// الـ Engine Interface
// ============================================================

export interface MemoryEngine {
  // الكتابة
  startConversation(title?: string): Promise<Conversation>
  addMessage(input: AddMessageInput): Promise<ChatMessage>
  endConversation(conversationId: string): Promise<void>

  // الاستخراج التلقائي
  memorize(input: MemorizeInput): Promise<MemorizeResult>

  // البحث
  search(query: MemorySearchQuery): Promise<MemorySearchResult[]>
  recallRelevant(context: ContextRequest): Promise<AssembledContext>

  // الضغط والصيانة
  consolidate(): Promise<ConsolidationReport>
  decay(): Promise<{ updated: number }>

  // القراءة
  getConversation(id: string): Promise<Conversation | null>
  getMessages(conversationId: string, limit?: number): Promise<ChatMessage[]>
  getRecentMemories(layer: MemoryLayer, limit?: number): Promise<AnyMemory[]>

  // الإحصائيات
  stats(): Promise<MemoryStats>
}

export interface AddMessageInput {
  conversationId: string
  role: MessageRole
  content: string
  thinking?: string
  toolCalls?: ToolCall[]
  toolCallId?: string
  tokens?: number
}

export interface MemoryStats {
  totalMemories: number
  byLayer: Record<MemoryLayer, number>
  totalConversations: number
  totalMessages: number
  totalTokens: number
  oldestMemory?: Date
  newestMemory?: Date
  averageImportance: number
  storageBytes: number
}

// ============================================================
// Helper utilities
// ============================================================

export function isShortTerm(m: AnyMemory): m is ShortTermMemory {
  return m.layer === 'short_term'
}
export function isLongTerm(m: AnyMemory): m is LongTermMemory {
  return m.layer === 'long_term'
}
export function isEpisodic(m: AnyMemory): m is EpisodicMemory {
  return m.layer === 'episodic'
}
export function isSemantic(m: AnyMemory): m is SemanticMemory {
  return m.layer === 'semantic'
}

/** حساب decay بناءً على آخر access (exponential decay) */
export function computeDecay(lastAccessed: Date, halfLifeHours = 168): number {
  const hoursSince = (Date.now() - lastAccessed.getTime()) / (1000 * 60 * 60)
  if (hoursSince <= 0) return 1.0
  return Math.pow(0.5, hoursSince / halfLifeHours)
}

/** تقدير عدد الـ tokens تقريبياً (4 chars = 1 token) */
export function estimateTokens(text: string): number {
  if (!text) return 0
  return Math.ceil(text.length / 4)
}

/** تقدير الأهمية بناءً على معايير */
export function estimateImportance(criteria: {
  length?: number
  hasQuestion?: boolean
  hasDecision?: boolean
  hasFact?: boolean
  emotionalWeight?: number
}): number {
  let score = 0.3 // baseline
  if (criteria.length && criteria.length > 200) score += 0.15
  if (criteria.length && criteria.length > 500) score += 0.1
  if (criteria.hasQuestion) score += 0.1
  if (criteria.hasDecision) score += 0.25
  if (criteria.hasFact) score += 0.2
  if (criteria.emotionalWeight) score += criteria.emotionalWeight * 0.2
  return Math.min(1, score)
}

```


---

## 📄 `src/lib/memory/memory-engine.ts` (495 سطر)

```typescript
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

```


---

## 📄 `src/lib/memory/short-term.ts` (255 سطر)

```typescript
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

```


---

## 📄 `src/lib/memory/long-term.ts` (255 سطر)

```typescript
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

```


---

## 📄 `src/lib/memory/episodic.ts` (331 سطر)

```typescript
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

```


---

## 📄 `src/lib/memory/semantic.ts` (419 سطر)

```typescript
/**
 * MiMo Life OS — Memory Engine: Semantic Layer
 * طبقة الذاكرة الدلالية — حقائق ثلاثية (subject-predicate-object).
 *
 * Task ID: 3-b (EP-2)
 *
 * المسؤوليات:
 *  - حفظ الحقائق بـ SemanticFact (unique [subject, predicate, object]) + Memory record (layer=4)
 *  - Upsert مع max(old, new) على confidence
 *  - invalidate (soft delete): validUntil = now بدون حذف
 *  - search بـ LIKE على subject/predicate/object
 *  - getFactsAbout(subject): كل ما نعرفه عن entity معيّنة
 *
 * ملاحظات تقنية:
 *  - SQLite ما بدعم array → tags/metadata كـ JSON.stringify
 *  - ربط SemanticFact ↔ Memory عبر metadata.factId
 *  - Prisma upsert بـ where composite: subject_predicate_object
 *  - JSON.parse دائماً بـ try/catch (safeJsonParse)
 */

import { db } from '@/lib/db'
import type { SemanticMemory, MemorySource } from './types'

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
 * يجيب Memory records المرتبطة بـ fact IDs دفعة واحدة (batch).
 * - بحث أولي بـ OR contains على metadata (للـ IDs)
 * - فلترة دقيقة بـ JSON.parse + meta.factId === id
 */
async function findMemoriesByFactIds(factIds: string[]): Promise<Map<string, any>> {
  if (factIds.length === 0) return new Map()
  const idSet = new Set(factIds)
  const memories = await db.memory.findMany({
    where: {
      type: 'semantic',
      OR: factIds.map((id) => ({ metadata: { contains: id } })),
    },
  })
  const map = new Map<string, any>()
  for (const m of memories) {
    try {
      const meta = JSON.parse(m.metadata || '{}') as Record<string, unknown>
      const fid = meta.factId
      if (typeof fid === 'string' && idSet.has(fid)) {
        map.set(fid, m)
      }
    } catch {
      // skip malformed metadata
    }
  }
  return map
}

/** يجيب Memory المرتبط بـ fact ID واحد */
async function findMemoryByFactId(factId: string): Promise<any | null> {
  const map = await findMemoriesByFactIds([factId])
  return map.get(factId) ?? null
}

// ============================================================
// Mapping
// ============================================================

/**
 * يحوّل SemanticFact + Memory (من Prisma) لـ SemanticMemory type.
 * يفك JSON.stringify للحقول المركبة (tags, metadata).
 *
 * لو memory === null (Fact بلا Memory مرتبط)، يستخدم fallback من الـ Fact.
 */
export function mapPrismaToSemantic(fact: any, memory: any): SemanticMemory {
  const metadata = memory
    ? safeJsonParse<Record<string, unknown>>(memory.metadata, {})
    : {}
  const tags = memory
    ? safeJsonParse<string[]>(memory.tags, [])
    : safeJsonParse<string[]>(fact.tags, [])
  const sourceRaw = memory?.source ?? fact.source ?? 'auto'
  const content =
    memory?.content ?? `${fact.subject} ${fact.predicate} ${fact.object}`

  return {
    id: memory?.id ?? fact.id,
    layer: 'semantic',
    content,
    summary: memory?.summary ?? content,
    importance: memory?.importance ?? 0.9,
    confidence: memory?.confidence ?? fact.confidence ?? 0.8,
    decay: memory?.decay ?? 1.0,
    accessCount: memory?.accessCount ?? 0,
    lastAccessed: memory?.lastAccessed ?? fact.createdAt,
    createdAt: memory?.createdAt ?? fact.createdAt,
    tags,
    source: sourceRaw as MemorySource,
    metadata,
    factId: fact.id,
    subject: fact.subject,
    predicate: fact.predicate,
    object: fact.object,
    validFrom: fact.validFrom,
    validUntil: fact.validUntil ?? undefined,
  }
}

// ============================================================
// CRUD
// ============================================================

/**
 * يضيف/يحدّث حقيقة دلالية (Upsert).
 *
 * - لو الحقيقة موجودة (نفس subject+predicate+object):
 *   - confidence = max(old, new) — ما نخفضهاش
 *   - validUntil = null — إعادة تفعيل (لو كانت invalidated)
 * - لو جديدة: ينشئ SemanticFact + Memory record
 * - Memory record: layer=4, importance=0.9 (الحقائق الدلالية عالية الأهمية)
 * - لو Memory موجود لنفس factId، يحدّثه؛ غير كذلك، ينشئ واحد جديد
 *
 * @example
 * await addFact({
 *   subject: 'محمد',
 *   predicate: 'يدرس',
 *   object: 'هندسة أتمتة صناعية',
 *   confidence: 0.95,
 *   conversationId: 'cuid-...',
 * })
 */
export async function addFact(input: {
  subject: string
  predicate: string
  object: string
  confidence?: number
  conversationId?: string
  tags?: string[]
  source?: MemorySource
}): Promise<SemanticMemory> {
  const confidence = input.confidence ?? 0.8
  const source = input.source ?? 'auto'
  const tags = input.tags ?? []

  const compositeWhere = {
    subject_predicate_object: {
      subject: input.subject,
      predicate: input.predicate,
      object: input.object,
    },
  }

  // 1) اقرأ الحقيقة الموجودة (لو في) لحساب max(old, new) على confidence
  const existing = await db.semanticFact.findUnique({ where: compositeWhere })
  const finalConfidence = existing
    ? Math.max(existing.confidence, confidence)
    : confidence

  // 2) Upsert SemanticFact
  const fact = await db.semanticFact.upsert({
    where: compositeWhere,
    create: {
      subject: input.subject,
      predicate: input.predicate,
      object: input.object,
      confidence: finalConfidence,
      source,
      conversationId: input.conversationId ?? null,
      tags: JSON.stringify(tags),
      validUntil: null,
    },
    update: {
      confidence: finalConfidence,
      validUntil: null, // إعادة تفعيل
      source,
      tags: JSON.stringify(tags),
    },
  })

  // 3) تعامل مع Memory record (update لو موجود، create لو جديد)
  const content = `${input.subject} ${input.predicate} ${input.object}`
  const metadata = JSON.stringify({
    factId: fact.id,
    subject: input.subject,
    predicate: input.predicate,
    object: input.object,
  })

  const existingMemory = await findMemoryByFactId(fact.id)
  let memory
  if (existingMemory) {
    memory = await db.memory.update({
      where: { id: existingMemory.id },
      data: {
        content,
        summary: content,
        importance: 0.9,
        confidence: fact.confidence,
        source,
        tags: JSON.stringify(tags),
        metadata,
        conversationId: input.conversationId ?? existingMemory.conversationId,
      },
    })
  } else {
    memory = await db.memory.create({
      data: {
        type: 'semantic',
        layer: 4,
        content,
        summary: content,
        importance: 0.9,
        confidence: fact.confidence,
        source,
        tags: JSON.stringify(tags),
        metadata,
        conversationId: input.conversationId ?? null,
      },
    })
  }

  return mapPrismaToSemantic(fact, memory)
}

/**
 * يجيب كل الحقائق عن subject معيّن (مثال: كل ما نعرفه عن "محمد").
 *
 * @param subject اسم الـ entity (subject)
 * @param onlyValid فلتر validUntil IS NULL OR validUntil > now (default true)
 * @returns SemanticMemory[] مرتبة بـ confidence DESC
 *
 * @example
 * await getFactsAbout('محمد') // كل الحقائق الصحيحة عن محمد
 */
export async function getFactsAbout(
  subject: string,
  onlyValid = true,
): Promise<SemanticMemory[]> {
  const where: any = { subject }

  if (onlyValid) {
    where.OR = [
      { validUntil: null },
      { validUntil: { gt: new Date() } },
    ]
  }

  const facts = await db.semanticFact.findMany({
    where,
    orderBy: { confidence: 'desc' },
  })

  if (facts.length === 0) return []

  const memoryMap = await findMemoriesByFactIds(facts.map((f) => f.id))
  return facts.map((f) => mapPrismaToSemantic(f, memoryMap.get(f.id)))
}

/**
 * بحث متقدم في الحقائق الدلالية.
 *
 * - بحث بـ LIKE على subject OR predicate OR object (لو query غير فارغ)
 * - فلترة بـ subjects (لو موجودة، تطابق بأي عنصر)
 * - فلترة بـ predicates (لو موجودة، تطابق بأي عنصر)
 * - onlyValid (default true): validUntil IS NULL OR validUntil > now
 * - ترتيب: confidence DESC
 * - limit: default 20
 *
 * @example
 * await searchSemantic({
 *   query: 'هندسة',
 *   subjects: ['محمد'],
 *   predicates: ['يدرس', 'يتقن'],
 * })
 */
export async function searchSemantic(query: {
  query: string
  subjects?: string[]
  predicates?: string[]
  onlyValid?: boolean
  limit?: number
}): Promise<SemanticMemory[]> {
  const where: any = {}

  // بحث نصي على subject OR predicate OR object
  if (query.query && query.query.length > 0) {
    where.OR = [
      { subject: { contains: query.query } },
      { predicate: { contains: query.query } },
      { object: { contains: query.query } },
    ]
  }

  const andClauses: any[] = []

  // فلتر subjects (أي تطابق)
  if (query.subjects && query.subjects.length > 0) {
    andClauses.push({ subject: { in: query.subjects } })
  }

  // فلتر predicates (أي تطابق)
  if (query.predicates && query.predicates.length > 0) {
    andClauses.push({ predicate: { in: query.predicates } })
  }

  // فلتر onlyValid
  if (query.onlyValid !== false) {
    andClauses.push({
      OR: [{ validUntil: null }, { validUntil: { gt: new Date() } }],
    })
  }

  if (andClauses.length > 0) {
    where.AND = andClauses
  }

  const facts = await db.semanticFact.findMany({
    where,
    orderBy: { confidence: 'desc' },
    take: query.limit ?? 20,
  })

  if (facts.length === 0) return []

  const memoryMap = await findMemoriesByFactIds(facts.map((f) => f.id))
  return facts.map((f) => mapPrismaToSemantic(f, memoryMap.get(f.id)))
}

/**
 * يلغي صلاحية حقيقة (soft delete).
 *
 * - validUntil = now للـ SemanticFact
 * - تحديث الـ Memory المرتبط (metadata.validUntil = now.iso)
 *
 * ما يحذفش الحقيقة — تبقى بـ DB لأغراض المراجعة، لكنها ما عادش "صحيحة".
 */
export async function invalidateFact(id: string): Promise<void> {
  const now = new Date()

  await db.semanticFact.update({
    where: { id },
    data: { validUntil: now },
  })

  // حدّث metadata للـ Memory المرتبط (إشارة للقراءة لاحقاً)
  const memory = await findMemoryByFactId(id)
  if (memory) {
    try {
      const meta = JSON.parse(memory.metadata || '{}') as Record<string, unknown>
      const newMeta = { ...meta, validUntil: now.toISOString() }
      await db.memory.update({
        where: { id: memory.id },
        data: { metadata: JSON.stringify(newMeta) },
      })
    } catch {
      // skip malformed metadata
    }
  }
}

/**
 * يجيب كل الحقائق (مع فلترة onlyValid).
 *
 * @param onlyValid فلتر validUntil IS NULL OR validUntil > now (default true)
 * @param limit حد أقصى للنتائج (default 100)
 * @returns SemanticMemory[] مرتبة بـ confidence DESC
 */
export async function getAllFacts(
  onlyValid = true,
  limit = 100,
): Promise<SemanticMemory[]> {
  const where: any = {}

  if (onlyValid) {
    where.OR = [
      { validUntil: null },
      { validUntil: { gt: new Date() } },
    ]
  }

  const facts = await db.semanticFact.findMany({
    where,
    orderBy: { confidence: 'desc' },
    take: limit,
  })

  if (facts.length === 0) return []

  const memoryMap = await findMemoriesByFactIds(facts.map((f) => f.id))
  return facts.map((f) => mapPrismaToSemantic(f, memoryMap.get(f.id)))
}

/**
 * يحذف SemanticFact + Memory المرتبط (hard delete).
 *
 * لو ما فيش Memory، يحذف الـ Fact بس.
 * idempotent: ما يرمي error لو الحقيقة محذوفة مسبقاً.
 *
 * @example
 * await deleteFact('cuid-...') // حذف نهائي
 * // أو استخدم invalidateFact للحذف الناعم
 */
export async function deleteFact(id: string): Promise<void> {
  // احذف Memory المرتبط أولاً
  const memory = await findMemoryByFactId(id)
  if (memory) {
    await db.memory.deleteMany({ where: { id: memory.id } })
  }
  // ثم احذف الـ Fact (deleteMany = idempotent)
  await db.semanticFact.deleteMany({ where: { id } })
}

```


---

## 📄 `src/lib/memory/auto-memorizer.ts` (829 سطر)

```typescript
/**
 * MiMo Life OS — Auto Memorizer
 * ============================================================================
 * مُستخرج الذاكرة التلقائي — يحلل رسائل المحادثة ويستخرج ذكريات
 * من ثلاث طبقات: semantic (حقائق) + episodic (أحداث) + long_term (ملخصات)
 *
 * Algorithm:
 * 1. iterate user messages
 * 2. extractSemanticPatterns(content) — حقائق ثلاثية بـ regex عربي/انجليزي
 * 3. extractEpisodicPatterns(content, createdAt) — أحداث زمنية
 * 4. extractLongTermMemories(messages) — ملخصات للرسائل الطويلة/المهمة
 * 5. calculateImportance لكل ذاكرة
 * 6. حفظ بالـ DB (SemanticFact/EpisodicEvent/Memory) + MemoryOperation
 *
 * Fallback: لو الـ heuristics ما طلعتش ذكريات، استخدم z-ai-web-dev-sdk للـ LLM
 *
 * Task ID: 3-d (AI-4)
 * ============================================================================
 */

import { db } from '@/lib/db'
import {
  type AnyMemory,
  type ChatMessage,
  type Emotion,
  type ExtractedMemory,
  type MemorizeInput,
  type MemorizeResult,
  estimateImportance,
} from './types'

// ============================================================
// Constants & Helpers
// ============================================================

/** التشكيل العربي + Tatweel */
const TASHKIL = /[\u064B-\u0652\u0670\u0640]/g

/** نهايات الجمل العربية + الانجليزية */
const TERMINATOR = /[\u066B\u066C\u060C\u061B\u061F.!?,;:\n]/

/** تعيين رقم الطبقة */
const LAYER_NUMBER: Record<string, number> = {
  short_term: 1,
  long_term: 2,
  episodic: 3,
  semantic: 4,
}

/**
 * Normalize Arabic text:
 * - شيل التشكيل (ًٌٍَُِّْ + tatweel)
 * - وحّد أل (الـ → ال) — يحصل تلقائياً عند حذف Tatweel
 * - وحّد ة → ه
 * - وحّد أ إ آ → ا
 * - lowercase
 */
export function normalizeArabic(text: string): string {
  if (!text) return ''
  return text
    .replace(TASHKIL, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .toLowerCase()
    .trim()
}

/**
 * يقطع النص عند أول نهاية جملة
 * ("هندسة أتمتة صناعية. وأحب" → "هندسة أتمتة صناعية")
 */
function cleanCapture(raw: string): string {
  if (!raw) return ''
  const i = raw.search(TERMINATOR)
  const chunk = i >= 0 ? raw.slice(0, i) : raw
  return chunk.trim()
}

/**
 * يبني RegExp جديد من pattern source مع تطبيع النص العربي
 * (يشيل التشكيل ويوحّد أ→ا ة→ه) عشان يطابق النص المعروف.
 * الـ regex الأصلي يُستخدم كمصدر فقط — الـ flags دائماً 'gi'.
 */
function buildNormalizedRegex(source: string): RegExp {
  const normalized = normalizeArabic(source)
  // استخدم try/catch عشان regex invalid ما يكسرش الـ pipeline
  try {
    return new RegExp(normalized, 'gi')
  } catch {
    try {
      return new RegExp(source, 'gi')
    } catch {
      return /$^/gi // match nothing
    }
  }
}

// ============================================================
// Semantic Patterns (subject-predicate-object)
// ============================================================

interface SemanticPattern {
  /** regex pattern مع مجموعة capture واحدة للـ object */
  regex: RegExp
  /** subject الفعلي (غالباً "محمد") */
  subject: string
  /** predicate (مثل "يدرس") */
  predicate: string
  /** لو true، الـ capture هو رقم (مبلغ) — ينحفظ كـ "X شيكل" */
  extractAmount?: boolean
}

/** أنماط عربية — subject implicit = "محمد" */
const SEMANTIC_PATTERNS_AR: SemanticPattern[] = [
  { regex: /انا اسمي\s+([^\s.!؟?,؛:\n]+)/gi, subject: 'محمد', predicate: 'اسمه' },
  { regex: /اسمي\s+([^\s.!؟?,؛:\n]+)/gi, subject: 'محمد', predicate: 'اسمه' },
  { regex: /ادرس\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يدرس' },
  { regex: /انا طالب\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يدرس' },
  { regex: /بدرس\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يدرس' },
  { regex: /احب\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يحب' },
  { regex: /بحب\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يحب' },
  { regex: /يعجبني\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يحب' },
  { regex: /اشتغل\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يعمل' },
  { regex: /اعمل\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يعمل' },
  { regex: /بشتغل\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يعمل' },
  { regex: /اسكن\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يسكن' },
  { regex: /انا من\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يسكن' },
  { regex: /ساكن\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يسكن' },
  { regex: /عندي\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يملك' },
  { regex: /املك\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يملك' },
  { regex: /اتعلم\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يتعلم' },
  { regex: /بتعلم\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يتعلم' },
  { regex: /احتاج\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يحتاج' },
  { regex: /محتاج\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يحتاج' },
  { regex: /مشروعي\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يعمل على مشروع' },
  { regex: /مشروع\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يعمل على مشروع' },
  // ⭐ Phase 3.3+: أنماط فرص العمل + الأموال
  { regex: /بدي\s+(?:اشتغل|اشغل)\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يبحث عن عمل' },
  { regex: /ببدأ\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يبدأ' },
  { regex: /راح\s+(?:اشتغل|اشغل)\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'سيعمل' },
  { regex: /رح\s+(?:اشتغل|اشغل)\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'سيعمل' },
  // salary / wage patterns
  { regex: /(\d+)\s*(?:شيكل|شواقل|دولار|دينار|ريال|يورو)\s*(?:أجر|راتب|مقابل)?/gi,
    subject: 'محمد', predicate: 'راتب متوقع', extractAmount: true },
  { regex: /(?:أجر|راتب|مقابل|حساب)\s*(\d+)\s*(?:شيكل|شواقل|دولار|دينار|ريال|يورو)?/gi,
    subject: 'محمد', predicate: 'راتب متوقع', extractAmount: true },
  { regex: /يعطيني\s+(\d+)\s*(?:شيكل|شواقل|دولار|دينار|ريال|يورو)?/gi,
    subject: 'محمد', predicate: 'راتب متوقع', extractAmount: true },
  // عمل/وظيفة
  { regex: /وظيفة\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'يبحث عن وظيفة' },
  { regex: /فرصة\s+(?:عمل|وظيفة)\s*(.+?)(?=[.!؟?,؛:\n]|$)/gi, subject: 'محمد', predicate: 'لديه فرصة عمل' },
]

/** أنماط انجليزية — subject implicit = "محمد" */
const SEMANTIC_PATTERNS_EN: SemanticPattern[] = [
  { regex: /my name is\s+([^\s.!؟?,;:\n]+)/gi, subject: 'محمد', predicate: 'name' },
  { regex: /i study\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'studies' },
  { regex: /i'?m studying\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'studies' },
  { regex: /i love\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'loves' },
  { regex: /i like\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'loves' },
  { regex: /i work\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'works' },
  { regex: /i'?m working\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'works' },
  { regex: /i live in\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'lives in' },
  { regex: /i have\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'has' },
  { regex: /i own\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'has' },
  { regex: /i'?m learning\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, subject: 'محمد', predicate: 'learning' },
]

/** importance ثابت للحقائق الدلالية — عالية جداً */
const SEMANTIC_IMPORTANCE = 0.9

/**
 * استخراج الحقائق الدلالية (subject-predicate-object) من نص.
 * يستخدم أنماط Regex عربية + انجليزية.
 * importance = 0.9 لكل الحقائق الدلالية.
 *
 * @example
 * extractSemanticPatterns("اسمي محمد وأدرس هندسة الأتمتة")
 * // → [{type:'semantic', subject:'محمد', predicate:'اسمه', object:'محمد', ...},
 * //    {type:'semantic', subject:'محمد', predicate:'يدرس', object:'هندسة الأتمتة', ...}]
 */
export function extractSemanticPatterns(text: string): ExtractedMemory[] {
  if (!text || typeof text !== 'string') return []

  const normalized = normalizeArabic(text)
  const results: ExtractedMemory[] = []

  const allPatterns = [...SEMANTIC_PATTERNS_AR, ...SEMANTIC_PATTERNS_EN]

  for (const pattern of allPatterns) {
    // fresh regex instance per call to avoid stale lastIndex
    // وطّب المصدر عشان يطابق النص المعروف (أ→ا، ة→ه، بدون تشكيل)
    const re = buildNormalizedRegex(pattern.regex.source)
    const matches = normalized.matchAll(re)
    for (const m of matches) {
      if (!m[1]) continue
      let object = cleanCapture(m[1])
      if (!object || object.length < 1) continue

      // لو extractAmount=true، الـ capture رقم — اضبط الـ object لـ "X شيكل"
      if (pattern.extractAmount) {
        const num = parseInt(object, 10)
        if (isNaN(num)) continue
        // حدد العملة من النص الأصلي
        let currency = 'شيكل'
        if (text.includes('دولار')) currency = 'دولار'
        else if (text.includes('دينار')) currency = 'دينار'
        else if (text.includes('ريال')) currency = 'ريال'
        else if (text.includes('يورو')) currency = 'يورو'
        object = `${num} ${currency}`
      }

      results.push({
        type: 'semantic',
        content: `${pattern.subject} ${pattern.predicate} ${object}`,
        summary: `${pattern.predicate} ${object}`,
        importance: SEMANTIC_IMPORTANCE,
        confidence: 0.85,
        tags: ['auto', 'semantic', pattern.predicate],
        subject: pattern.subject,
        predicate: pattern.predicate,
        object,
      })
    }
  }

  return results
}

// ============================================================
// Episodic Patterns (temporal events)
// ============================================================

interface EpisodicPattern {
  regex: RegExp
  /** دالة تحسب الوقت من now */
  timeFn: (now: Date) => Date
}

/** أنماط زمنية عربية */
const EPISODIC_PATTERNS_AR: EpisodicPattern[] = [
  { regex: /اليوم\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => startOfDay(n) },
  { regex: /امس\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => addDays(startOfDay(n), -1) },
  { regex: /بالامس\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => addDays(startOfDay(n), -1) },
  { regex: /مبارح\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => addDays(startOfDay(n), -1) },
  { regex: /قبل ساعة\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => new Date(n.getTime() - 60 * 60 * 1000) },
  { regex: /قبل يومين\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => addDays(n, -2) },
  { regex: /الاسبوع الماضي\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => addDays(n, -7) },
  { regex: /صار\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => n },
  { regex: /حصل\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => n },
  { regex: /حدث\s+(.+?)(?=[.!؟?,؛:\n]|$)/gi, timeFn: (n) => n },
]

/** أنماط زمنية انجليزية */
const EPISODIC_PATTERNS_EN: EpisodicPattern[] = [
  { regex: /today i\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, timeFn: (n) => startOfDay(n) },
  { regex: /yesterday i\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, timeFn: (n) => addDays(startOfDay(n), -1) },
  { regex: /last week i\s+(.+?)(?=[.!؟?,;:\n]|$)/gi, timeFn: (n) => addDays(n, -7) },
]

/** كلمات المشاعر بالعربي والانجليزي */
const EMOTION_KEYWORDS: Record<Emotion, RegExp[]> = {
  happy: [/سعيد|مبسوط|مبهوج|مبهج|فرحان|فرح|happy|glad|joy/i],
  sad: [/حزين|زعلان|تعبان نفسيا|sad|down|depressed/i],
  excited: [/متحمس|متحمسة|منفعل|excited|thrilled|pumped/i],
  stressed: [/متوتر|مرهق|متخوف|stressed|anxious|overwhelmed/i],
  angry: [/غاضب|زعلان|معصب|angry|furious|mad/i],
  calm: [/هادئ|مرتاح|calm|relaxed|peaceful/i],
  neutral: [],
}

/**
 * كشف المشاعر من نص
 */
function detectEmotion(text: string): Emotion | undefined {
  if (!text) return undefined
  const normalized = normalizeArabic(text)
  for (const emo of ['happy', 'sad', 'excited', 'stressed', 'angry', 'calm'] as Emotion[]) {
    for (const re of EMOTION_KEYWORDS[emo]) {
      if (re.test(normalized)) return emo
    }
  }
  return undefined
}

/** أهمية افتراضية للـ events */
const EPISODIC_IMPORTANCE = 0.6

/**
 * استخراج الأحداث الزمنية من نص.
 * يستخدم أنماط regex لليوم/أمس/الأسبوع الماضي + صار/حصل/حدث.
 *
 * @example
 * extractEpisodicPatterns("أمس أنهيت مشروع التخرج", message.createdAt)
 * // → [{type:'episodic', content:'أنهيت مشروع التخرج', occurredAt: <yesterday>, ...}]
 */
export function extractEpisodicPatterns(text: string, occurredAt?: Date): ExtractedMemory[] {
  if (!text || typeof text !== 'string') return []

  const normalized = normalizeArabic(text)
  const now = occurredAt ?? new Date()
  const results: ExtractedMemory[] = []

  const allPatterns = [...EPISODIC_PATTERNS_AR, ...EPISODIC_PATTERNS_EN]

  for (const pattern of allPatterns) {
    const re = buildNormalizedRegex(pattern.regex.source)
    const matches = normalized.matchAll(re)
    for (const m of matches) {
      if (!m[1]) continue
      const eventText = cleanCapture(m[1])
      if (!eventText || eventText.length < 2) continue

      const emotion = detectEmotion(eventText)
      results.push({
        type: 'episodic',
        content: eventText,
        summary: eventText.slice(0, 80),
        importance: EPISODIC_IMPORTANCE,
        confidence: 0.7,
        tags: ['auto', 'episodic'],
        occurredAt: pattern.timeFn(now),
        participants: [],
        emotion,
      })
    }
  }

  return results
}

// ============================================================
// Long-Term Memory Extraction
// ============================================================

/** كلمات تدل على قرار */
const DECISION_KEYWORDS =
  /قرار|decided|سأختار|ساختار|اخترت|اخترنا|أنصح|recommendation|recommended|سأبدأ|سأمضي|سأقوم|قررت/gi

/**
 * استخراج الذكريات طويلة الأمد من المحادثة:
 * - رسائل user أطول من 200 حرف → long_term
 * - رسائل assistant تحتوي على كلمات قرار/توصية → long_term
 *
 * importance محسوبة بـ calculateImportance
 */
export function extractLongTermMemories(messages: ChatMessage[]): ExtractedMemory[] {
  if (!messages || messages.length === 0) return []

  const results: ExtractedMemory[] = []

  for (const msg of messages) {
    if (!msg.content) continue

    if (msg.role === 'user' && msg.content.length > 200) {
      const importance = calculateImportance(msg.content, msg.role)
      results.push({
        type: 'long_term',
        content: msg.content,
        summary: msg.content.slice(0, 100),
        importance,
        confidence: 0.7,
        tags: ['auto', 'long_term', 'conversation'],
      })
    } else if (msg.role === 'assistant' && DECISION_KEYWORDS.test(msg.content)) {
      // reset lastIndex for global regex
      DECISION_KEYWORDS.lastIndex = 0
      const importance = calculateImportance(msg.content, msg.role)
      results.push({
        type: 'long_term',
        content: msg.content,
        summary: msg.content.slice(0, 100),
        importance,
        confidence: 0.8,
        tags: ['auto', 'long_term', 'decision'],
      })
    }
  }

  return results
}

// ============================================================
// Importance Calculation
// ============================================================

/**
 * حساب أهمية النص بناءً على معايير:
 * - length > 200 → +0.15
 * - length > 500 → +0.1
 * - hasQuestion (؟, ?, how, what, why, شنو, كيف, ليش) → +0.1
 * - hasDecision (قرار, decided, سأختار, اخترت) → +0.25
 * - hasFact (يعني, is, =, يعرف, is defined as) → +0.2
 * - baseline = 0.3
 *
 * يستخدم estimateImportance من types.ts داخلياً.
 */
export function calculateImportance(text: string, role: string): number {
  if (!text) return 0.3

  const normalized = normalizeArabic(text)
  const length = text.length
  const hasQuestion = /[؟?]|\bhow\b|\bwhat\b|\bwhy\b|شنو|كيف|ليش|ليه|متى|وين|where|when|why\b/i.test(
    normalized,
  )
  const hasDecision = /قرار|decided|سأختار|ساختار|اخترت|اخترنا|أنصح|recommendation|قررت/i.test(
    normalized,
  )
  const hasFact = /يعني|is|=|يعرف|is defined as|means|defined as/i.test(normalized)

  return estimateImportance({
    length,
    hasQuestion,
    hasDecision,
    hasFact,
  })
}

// ============================================================
// LLM Fallback (z-ai-web-dev-sdk)
// ============================================================

/**
 * استدعاء LLM كـ fallback لـ استخراج ذكريات أعمق من المحادثات المعقدة.
 * يُستدعى فقط لو الـ heuristics ما طلعتش ذكريات.
 *
 * آمن: لو الـ SDK غير متاح أو فشل، يرجع [] بدون استثناء.
 */
async function llmFallbackExtract(messages: ChatMessage[]): Promise<ExtractedMemory[]> {
  try {
    const sdkModule = (await import('z-ai-web-dev-sdk').catch(() => null)) as
      | { default?: { create: () => Promise<unknown> } }
      | null
    if (!sdkModule?.default) return []

    const ZAI = sdkModule.default
    const client = (await ZAI.create()) as {
      chat: {
        completions: {
          create: (body: {
            messages: { role: string; content: string }[]
            stream?: boolean
          }) => Promise<{
            choices?: { message?: { content?: string } }[]
          }>
        }
      }
    }

    const transcript = messages
      .slice(-12) // آخر 12 رسالة فقط لتقليل الـ context
      .map((m) => `${m.role}: ${m.content}`)
      .join('\n')

    const systemPrompt = `أنت مُستخرج ذكريات. حلل المحادثة التالية واستخرج الحقائق المهمة عن المستخدم "محمد".
أرجع JSON array فقط بدون شرح. كل عنصر:
{
  "type": "semantic" | "episodic" | "long_term",
  "subject": "محمد" (للـ semantic فقط),
  "predicate": "يدرس|يحب|يعمل|...",
  "object": "قيمة",
  "content": "نص الذكرى",
  "importance": 0..1,
  "emotion": "happy|sad|excited|stressed|calm|neutral" (للـ episodic فقط)
}

استخرج فقط الذكريات الجوهرية. تجاهل التحيات والكلام العام.`

    const response = await client.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: transcript },
      ],
      stream: false,
    })

    const raw = response?.choices?.[0]?.message?.content ?? ''
    // extract JSON from possible markdown fences
    const jsonMatch = raw.match(/\[[\s\S]*\]/)
    if (!jsonMatch) return []

    const parsed = JSON.parse(jsonMatch[0]) as Array<{
      type?: string
      subject?: string
      predicate?: string
      object?: string
      content?: string
      importance?: number
      emotion?: Emotion
    }>

    const valid: ExtractedMemory[] = []
    for (const item of parsed) {
      if (!item.content || !item.type) continue
      const type = (
        ['semantic', 'episodic', 'long_term'].includes(item.type) ? item.type : 'long_term'
      ) as ExtractedMemory['type']
      valid.push({
        type,
        content: String(item.content).slice(0, 2000),
        summary: String(item.content).slice(0, 100),
        importance: typeof item.importance === 'number' ? Math.min(1, Math.max(0, item.importance)) : 0.7,
        confidence: 0.6,
        tags: ['auto', 'llm', type],
        subject: type === 'semantic' ? (item.subject ?? 'محمد') : undefined,
        predicate: type === 'semantic' ? item.predicate : undefined,
        object: type === 'semantic' ? item.object : undefined,
        emotion: type === 'episodic' ? item.emotion : undefined,
        occurredAt: type === 'episodic' ? new Date() : undefined,
      })
    }

    return valid
  } catch {
    return []
  }
}

// ============================================================
// Storage Helpers
// ============================================================

/**
 * حفظ ذاكرة دلالية (semantic) في قاعدة البيانات:
 * - يُنشئ SemanticFact record (مع unique constraint subject+predicate+object)
 * - يُنشئ Memory record (type='semantic', layer=4)
 * - يُنشئ MemoryOperation (operation='add')
 *
 * لو الحقيقة موجودة من قبل (unique violation)، يتجاوزها بدون خطأ.
 */
async function saveSemanticMemory(
  extracted: ExtractedMemory,
  conversationId?: string,
): Promise<AnyMemory | null> {
  try {
    if (!extracted.subject || !extracted.predicate || !extracted.object) return null

    // upsert على SemanticFact (unique constraint)
    const fact = await db.semanticFact.upsert({
      where: {
        subject_predicate_object: {
          subject: extracted.subject,
          predicate: extracted.predicate,
          object: extracted.object,
        },
      },
      update: {
        confidence: extracted.confidence,
        updatedAt: new Date(),
      },
      create: {
        subject: extracted.subject,
        predicate: extracted.predicate,
        object: extracted.object,
        confidence: extracted.confidence,
        validFrom: new Date(),
        source: 'auto',
        conversationId: conversationId ?? null,
        tags: JSON.stringify(extracted.tags ?? []),
        metadata: JSON.stringify({ source: 'auto-memorizer' }),
      },
    })

    // create Memory record
    const memory = await db.memory.create({
      data: {
        type: 'semantic',
        layer: LAYER_NUMBER.semantic,
        content: extracted.content,
        summary: extracted.summary,
        importance: extracted.importance,
        confidence: extracted.confidence,
        decay: 1.0,
        accessCount: 0,
        lastAccessed: new Date(),
        conversationId: conversationId ?? null,
        source: 'auto',
        tags: JSON.stringify(extracted.tags ?? []),
        metadata: JSON.stringify({
          factId: fact.id,
          subject: extracted.subject,
          predicate: extracted.predicate,
          object: extracted.object,
        }),
      },
    })

    await db.memoryOperation.create({
      data: {
        operation: 'add',
        memoryId: memory.id,
        memoryType: 'semantic',
        details: JSON.stringify({
          factId: fact.id,
          subject: extracted.subject,
          predicate: extracted.predicate,
          object: extracted.object,
        }),
      },
    })

    return memory as unknown as AnyMemory
  } catch (err) {
    // silent skip على unique violations
    return null
  }
}

/**
 * حفظ ذاكرة حادثية (episodic) في قاعدة البيانات:
 * - يُنشئ EpisodicEvent record
 * - يُنشئ Memory record (type='episodic', layer=3)
 * - يُنشئ MemoryOperation (operation='add')
 */
async function saveEpisodicMemory(
  extracted: ExtractedMemory,
  conversationId?: string,
): Promise<AnyMemory | null> {
  try {
    if (!extracted.occurredAt) return null

    const event = await db.episodicEvent.create({
      data: {
        title: extracted.summary ?? extracted.content.slice(0, 80),
        description: extracted.content,
        occurredAt: extracted.occurredAt,
        participants: JSON.stringify(extracted.participants ?? []),
        emotion: extracted.emotion ?? null,
        importance: extracted.importance,
        tags: JSON.stringify(extracted.tags ?? []),
        metadata: JSON.stringify({ source: 'auto-memorizer' }),
        source: 'auto',
      },
    })

    const memory = await db.memory.create({
      data: {
        type: 'episodic',
        layer: LAYER_NUMBER.episodic,
        content: extracted.content,
        summary: extracted.summary,
        importance: extracted.importance,
        confidence: extracted.confidence,
        decay: 1.0,
        accessCount: 0,
        lastAccessed: new Date(),
        conversationId: conversationId ?? null,
        source: 'auto',
        tags: JSON.stringify(extracted.tags ?? []),
        metadata: JSON.stringify({
          eventId: event.id,
          occurredAt: extracted.occurredAt.toISOString(),
          emotion: extracted.emotion,
        }),
      },
    })

    await db.memoryOperation.create({
      data: {
        operation: 'add',
        memoryId: memory.id,
        memoryType: 'episodic',
        details: JSON.stringify({ eventId: event.id, occurredAt: extracted.occurredAt }),
      },
    })

    return memory as unknown as AnyMemory
  } catch {
    return null
  }
}

/**
 * حفظ ذاكرة طويلة الأمد (long_term) في قاعدة البيانات:
 * - يُنشئ Memory record (type='long_term', layer=2)
 * - يُنشئ MemoryOperation (operation='add')
 */
async function saveLongTermMemory(
  extracted: ExtractedMemory,
  conversationId?: string,
): Promise<AnyMemory | null> {
  try {
    const memory = await db.memory.create({
      data: {
        type: 'long_term',
        layer: LAYER_NUMBER.long_term,
        content: extracted.content,
        summary: extracted.summary,
        importance: extracted.importance,
        confidence: extracted.confidence,
        decay: 1.0,
        accessCount: 0,
        lastAccessed: new Date(),
        conversationId: conversationId ?? null,
        source: 'auto',
        tags: JSON.stringify(extracted.tags ?? []),
        metadata: JSON.stringify({ source: 'auto-memorizer' }),
      },
    })

    await db.memoryOperation.create({
      data: {
        operation: 'add',
        memoryId: memory.id,
        memoryType: 'long_term',
        details: JSON.stringify({
          importance: extracted.importance,
          contentLength: extracted.content.length,
        }),
      },
    })

    return memory as unknown as AnyMemory
  } catch {
    return null
  }
}

// ============================================================
// Date Helpers
// ============================================================

function startOfDay(date: Date): Date {
  const d = new Date(date)
  d.setHours(0, 0, 0, 0)
  return d
}

function addDays(date: Date, days: number): Date {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

// ============================================================
// Main Entry Point
// ============================================================

/**
 * memorize — الـ entry point الرئيسي لـ auto-memorizer.
 *
 * يأخذ رسائل المحادثة، يستخرج ذكريات (semantic + episodic + long_term) بـ regex،
 * ويحفظها بقاعدة البيانات. لو الـ heuristics ما طلعتش ذكريات، يستدعي LLM fallback.
 *
 * @returns MemorizeResult بـ extracted, stored, errors, processingMs
 *
 * @example
 * const result = await memorize({
 *   conversationId: 'conv-1',
 *   messages: [{ id: 'm1', role: 'user', content: 'اسمي محمد وأدرس هندسة', ... }]
 * })
 */
export async function memorize(input: MemorizeInput): Promise<MemorizeResult> {
  const startTime = Date.now()
  const errors: string[] = []
  const extracted: ExtractedMemory[] = []
  const stored: AnyMemory[] = []

  if (!input?.messages || input.messages.length === 0) {
    return {
      extracted: [],
      stored: [],
      errors: ['no messages provided'],
      processingMs: Date.now() - startTime,
    }
  }

  try {
    // 1. استخراج semantic + episodic من كل user message
    for (const msg of input.messages) {
      if (msg.role !== 'user') continue
      if (!msg.content) continue

      try {
        const semantic = extractSemanticPatterns(msg.content)
        extracted.push(...semantic)

        const episodic = extractEpisodicPatterns(msg.content, msg.createdAt)
        extracted.push(...episodic)
      } catch (err) {
        errors.push(`extract msg ${msg.id}: ${(err as Error).message}`)
      }
    }

    // 2. استخراج long_term من كل الرسائل
    try {
      const longTerm = extractLongTermMemories(input.messages)
      extracted.push(...longTerm)
    } catch (err) {
      errors.push(`extract long-term: ${(err as Error).message}`)
    }

    // 3. Fallback: لو الـ heuristics ما طلعتش ذكريات، استخدم LLM
    if (extracted.length === 0 && input.messages.length >= 3) {
      try {
        const llmMemories = await llmFallbackExtract(input.messages)
        extracted.push(...llmMemories)
      } catch (err) {
        errors.push(`llm fallback: ${(err as Error).message}`)
      }
    }

    // 4. حفظ كل ذاكرة بالـ DB
    for (const mem of extracted) {
      try {
        let saved: AnyMemory | null = null
        if (mem.type === 'semantic') {
          saved = await saveSemanticMemory(mem, input.conversationId)
        } else if (mem.type === 'episodic') {
          saved = await saveEpisodicMemory(mem, input.conversationId)
        } else if (mem.type === 'long_term') {
          saved = await saveLongTermMemory(mem, input.conversationId)
        }
        if (saved) stored.push(saved)
      } catch (err) {
        errors.push(`save ${mem.type}: ${(err as Error).message}`)
      }
    }
  } catch (err) {
    errors.push(`memorize fatal: ${(err as Error).message}`)
  }

  return {
    extracted,
    stored,
    errors,
    processingMs: Date.now() - startTime,
  }
}

```


---

## 📄 `src/lib/memory/memory-search.ts` (877 سطر)

```typescript
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

```


---

## 📄 `src/lib/memory/memory-consolidator.ts` (540 سطر)

```typescript
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

```


---

## 📄 `src/lib/context/context-types.ts` (136 سطر)

```typescript
// ============================================
// Context Engineering — Types & Interfaces
// ============================================
// Phase 3.3: ضغط + ميزانية + توجيه السياق
//
// - context-types.ts: الأنواع المشتركة
// - context-budget.ts: ميزانية tokens لكل قسم
// - context-compressor.ts: ضغط النصوص القديمة
// - context-cache.ts: cache للسياق المتشابه
// - context-router.ts: توجيه السياق حسب نوع السؤال
// - context-engine.ts: المنسق الرئيسي
// ============================================

// ============================================================
// أنواع المصادر
// ============================================================

export type ContextSource =
  | 'system'          // system prompt أساسي
  | 'user_profile'    // نبذة عن محمد
  | 'recent_activity' // آخر النشاط
  | 'memory_short'    // آخر محادثة
  | 'memory_long'     // ذكريات طويلة المدى
  | 'memory_episodic' // أحداث
  | 'memory_semantic' // حقائق عن محمد
  | 'knowledge_graph' // كيانات KG ذات صلة
  | 'conversation'    // تاريخ المحادثة الحالية
  | 'tool_results'    // نتائج الأدوات السابقة
  | 'attachments';    // مرفقات المستخدم

export type QueryIntent =
  | 'question'        // سؤال عن شيء
  | 'task_creation'   // إنشاء مهمة/مشروع/فكرة
  | 'recall'         // استرجاع ذاكرة (شو صار قبل كده)
  | 'analysis'       // تحليل بيانات
  | 'planning'       // تخطيط
  | 'casual'         // محادثة عادية
  | 'code'           // كتابة كود
  | 'translation'    // ترجمة
  | 'summary'        // تلخيص
  | 'unknown';

export type ContextPriority = 'critical' | 'high' | 'medium' | 'low' | 'optional';

// ============================================================
// سياق مُجمَّع
// ============================================================

export interface ContextItem {
  source: ContextSource;
  content: string;
  tokens: number;
  priority: ContextPriority;
  relevance: number; // 0..1 — مدى صلة العنصر بالسؤال
  metadata?: {
    memoryId?: string;
    entityId?: string;
    factId?: string;
    occurredAt?: Date;
    confidence?: number;
    importance?: number;
  };
}

export interface AssembledContextV2 {
  items: ContextItem[];
  totalTokens: number;
  budget: number;
  truncated: boolean;
  truncatedItems: string[]; // أسماء المصادر المقطوعة
  intent: QueryIntent;
  formatted: string;        // النص النهائي للـ LLM
  assembledAt: Date;
  cacheHit?: boolean;
  cacheKey?: string;
}

// ============================================================
// ميزانية السياق
// ============================================================

export interface ContextBudget {
  total: number;
  bySource: Record<ContextSource, number>;
  reservedForResponse: number;
}

// ============================================================
// نتيجة التوجيه
// ============================================================

export interface RouterResult {
  intent: QueryIntent;
  relevantSources: ContextSource[];
  weights: Record<ContextSource, number>;
  confidence: number;
}

// ============================================================
// Helpers
// ============================================================

export const SOURCE_LABELS: Record<ContextSource, string> = {
  system: 'System',
  user_profile: 'نبذة',
  recent_activity: 'نشاط',
  memory_short: 'محادثة',
  memory_long: 'ذاكرة طويلة',
  memory_episodic: 'أحداث',
  memory_semantic: 'حقائق',
  knowledge_graph: 'معرفة',
  conversation: 'محادثة',
  tool_results: 'أدوات',
  attachments: 'مرفقات',
};

export const INTENT_LABELS: Record<QueryIntent, string> = {
  question: 'سؤال',
  task_creation: 'إنشاء',
  recall: 'استرجاع',
  analysis: 'تحليل',
  planning: 'تخطيط',
  casual: 'محادثة',
  code: 'كود',
  translation: 'ترجمة',
  summary: 'تلخيص',
  unknown: 'غير محدد',
};

export const PRIORITY_WEIGHTS: Record<ContextPriority, number> = {
  critical: 1.0,
  high: 0.8,
  medium: 0.6,
  low: 0.3,
  optional: 0.1,
};

```


---

## 📄 `src/lib/context/context-budget.ts` (136 سطر)

```typescript
// ============================================
// Context Budget — ميزانية الـ tokens لكل مصدر
// ============================================
// يوزع الميزانية حسب نوع السؤال + المصدر المهم
// مثال: لو سؤال recall → ذاكرة 60% من الميزانية
//       لو code → مرفقات + history 70%
// ============================================

import type { ContextBudget, ContextSource, QueryIntent } from './context-types';

// متوسط الـ tokens (4 chars = 1 token تقريباً)
export function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

// الميزانية الافتراضية حسب نوع السؤال
const BUDGET_BY_INTENT: Record<QueryIntent, Partial<Record<ContextSource, number>>> = {
  question: {
    memory_semantic: 800,
    memory_episodic: 600,
    memory_long: 500,
    knowledge_graph: 600,
    recent_activity: 300,
    conversation: 400,
    user_profile: 200,
  },
  recall: {
    memory_semantic: 1000,
    memory_episodic: 1000,
    memory_long: 800,
    memory_short: 600,
    conversation: 400,
    recent_activity: 200,
  },
  task_creation: {
    user_profile: 300,
    recent_activity: 400,
    conversation: 600,
    memory_semantic: 300,
  },
  analysis: {
    recent_activity: 800,
    memory_episodic: 500,
    memory_semantic: 400,
    knowledge_graph: 500,
  },
  planning: {
    memory_semantic: 600,
    memory_episodic: 400,
    knowledge_graph: 500,
    recent_activity: 400,
    conversation: 300,
  },
  casual: {
    conversation: 600,
    memory_semantic: 200,
    user_profile: 200,
  },
  code: {
    conversation: 1000,
    tool_results: 600,
    attachments: 400,
  },
  translation: {
    conversation: 500,
    attachments: 500,
  },
  summary: {
    conversation: 1000,
    memory_episodic: 400,
  },
  unknown: {
    memory_semantic: 400,
    memory_long: 400,
    conversation: 400,
    recent_activity: 300,
  },
};

// ميزانية ثابتة لكل مصدر (fallback)
const DEFAULT_BUDGET: Record<ContextSource, number> = {
  system: 500,
  user_profile: 200,
  recent_activity: 300,
  memory_short: 400,
  memory_long: 500,
  memory_episodic: 500,
  memory_semantic: 600,
  knowledge_graph: 500,
  conversation: 600,
  tool_results: 400,
  attachments: 400,
};

/**
 * يبني ميزانية tokens حسب نوع السؤال
 */
export function buildBudget(
  intent: QueryIntent,
  totalBudget = 4000,
  reservedForResponse = 1500,
): ContextBudget {
  const usable = totalBudget - reservedForResponse;
  const intentConfig = BUDGET_BY_INTENT[intent] ?? BUDGET_BY_INTENT.unknown;

  // ابدأ بـ default
  const bySource = { ...DEFAULT_BUDGET };

  // override بـ الـ intent config
  for (const [src, weight] of Object.entries(intentConfig)) {
    bySource[src as ContextSource] = weight as number;
  }

  // اضبط النسب لـ ما تتعدى الـ usable budget
  const totalRequested = Object.values(bySource).reduce((a, b) => a + b, 0);
  if (totalRequested > usable) {
    const ratio = usable / totalRequested;
    for (const src of Object.keys(bySource) as ContextSource[]) {
      bySource[src] = Math.floor(bySource[src] * ratio);
    }
  }

  return {
    total: usable,
    bySource,
    reservedForResponse,
  };
}

/**
 * يحسب الـ tokens الإجمالية لمجموعة items
 */
export function sumTokens(items: { tokens: number }[]): number {
  return items.reduce((sum, i) => sum + i.tokens, 0);
}

```


---

## 📄 `src/lib/context/context-compressor.ts` (156 سطر)

```typescript
// ============================================
// Context Compressor — ضغط النصوص القديمة
// ============================================
// يضغط السياق القديم لـ ملخصات قصيرة
// مثال: 10 رسائل قديمة → 1 ملخص بـ 100 token
// ============================================

import { estimateTokens } from './context-budget';

/**
 * يضغط قائمة رسائل لـ ملخص قصير
 */
export function compressConversation(
  messages: Array<{ role: string; content: string }>,
  maxTokens = 200,
): string {
  if (messages.length === 0) return '';
  if (messages.length <= 3) {
    return messages.map(m => `[${m.role}] ${m.content.slice(0, 100)}`).join(' | ');
  }

  // اضغط كل رسالة لأول 50 char + آخر 20 char
  const compressed = messages.map(m => {
    const content = m.content;
    if (content.length <= 70) return content;
    return content.slice(0, 50) + '...' + content.slice(-20);
  });

  const summary = compressed.join(' | ');
  const tokens = estimateTokens(summary);

  if (tokens <= maxTokens) return summary;

  // لو لسه طويل، اضغط أكثر — خد آخر 5 بس
  const last5 = messages.slice(-5);
  const compressed5 = last5.map(m => `[${m.role}] ${m.content.slice(0, 60)}`).join(' | ');
  return compressed5;
}

/**
 * يضغط قائمة ذكريات لـ ملخص قصير
 */
export function compressMemories(
  memories: Array<{ content: string; importance?: number }>,
  maxTokens = 300,
): string[] {
  if (memories.length === 0) return [];

  // رتب بـ importance (لو موجود) وحدة الأهمية
  const sorted = [...memories].sort((a, b) => {
    const ia = a.importance ?? 0.5;
    const ib = b.importance ?? 0.5;
    return ib - ia;
  });

  const result: string[] = [];
  let totalTokens = 0;

  for (const m of sorted) {
    const compressed = m.content.length > 100
      ? m.content.slice(0, 80) + '...' + m.content.slice(-20)
      : m.content;
    const tokens = estimateTokens(compressed);
    if (totalTokens + tokens > maxTokens) break;
    result.push(compressed);
    totalTokens += tokens;
  }

  return result;
}

/**
 * يضغط قائمة كيانات KG لـ نص قصير
 */
export function compressEntities(
  entities: Array<{ name: string; type: string; description?: string }>,
  maxTokens = 200,
): string[] {
  if (entities.length === 0) return [];

  const result: string[] = [];
  let totalTokens = 0;

  for (const e of entities) {
    let line = `[${e.type}] ${e.name}`;
    if (e.description) {
      const desc = e.description.length > 60
        ? e.description.slice(0, 60) + '...'
        : e.description;
      line += `: ${desc}`;
    }
    const tokens = estimateTokens(line);
    if (totalTokens + tokens > maxTokens) break;
    result.push(line);
    totalTokens += tokens;
  }

  return result;
}

/**
 * يضغط نتائج الأدوات لـ ملخص
 */
export function compressToolResults(
  results: Array<{ name: string; result: unknown; success: boolean }>,
  maxTokens = 200,
): string[] {
  if (results.length === 0) return [];

  const out: string[] = [];
  let totalTokens = 0;

  for (const r of results) {
    const status = r.success ? '✓' : '✗';
    let summary: string;
    if (typeof r.result === 'string') {
      summary = r.result.slice(0, 80);
    } else if (Array.isArray(r.result)) {
      summary = `[${r.result.length} items]`;
    } else if (typeof r.result === 'object' && r.result) {
      const keys = Object.keys(r.result as object).slice(0, 3).join(',');
      summary = `{${keys}}`;
    } else {
      summary = String(r.result).slice(0, 80);
    }
    const line = `${status} ${r.name}: ${summary}`;
    const tokens = estimateTokens(line);
    if (totalTokens + tokens > maxTokens) break;
    out.push(line);
    totalTokens += tokens;
  }

  return out;
}

/**
 * يضغط system prompt لـ أهم ما فيه
 */
export function compressSystemPrompt(
  fullPrompt: string,
  maxTokens = 300,
): string {
  if (estimateTokens(fullPrompt) <= maxTokens) return fullPrompt;

  // خد أول 200 + آخر 100 char
  const head = fullPrompt.slice(0, 800);
  const tail = fullPrompt.slice(-400);
  const compressed = head + '\n...\n' + tail;

  // لو لسه طويل، خد الأول بس
  if (estimateTokens(compressed) > maxTokens) {
    return fullPrompt.slice(0, maxTokens * 4);
  }

  return compressed;
}

```


---

## 📄 `src/lib/context/context-cache.ts` (135 سطر)

```typescript
// ============================================
// Context Cache — يحفظ السياق المتشابه
// ============================================
// لو سؤال مشابه لـ سؤال سابق، نرجع نفس السياق (لو ما تغيرت الـ DB)
// ============================================

import { estimateTokens } from './context-budget';

interface CacheEntry {
  key: string;
  formatted: string;
  items: Array<{ source: string; tokens: number }>;
  totalTokens: number;
  createdAt: number;
  hits: number;
}

const MAX_ENTRIES = 50;
const TTL_MS = 5 * 60 * 1000; // 5 دقائق

class ContextCache {
  private cache = new Map<string, CacheEntry>();

  /**
   * يبني cache key من السؤال + conversationId + intent
   */
  buildKey(query: string, conversationId: string | undefined, intent: string): string {
    // normalize السؤال (lowercase + trim + collapse whitespace)
    const normalized = query.toLowerCase().trim().replace(/\s+/g, ' ');
    return `${intent}:${conversationId ?? 'none'}:${normalized.slice(0, 100)}`;
  }

  /**
   * يجيب سياق من cache لو موجود و valid
   */
  get(key: string): CacheEntry | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    // تحقق TTL
    if (Date.now() - entry.createdAt > TTL_MS) {
      this.cache.delete(key);
      return null;
    }

    entry.hits++;
    return entry;
  }

  /**
   * يحفظ سياق جديد
   */
  set(key: string, formatted: string, items: Array<{ source: string; tokens: number }>): void {
    // لو الـ cache ممتلئ، احذف الأقدم
    if (this.cache.size >= MAX_ENTRIES) {
      const oldest = Array.from(this.cache.entries())
        .sort((a, b) => a[1].createdAt - b[1].createdAt)
        .map(([k]) => k);
      if (oldest[0]) this.cache.delete(oldest[0]);
    }

    this.cache.set(key, {
      key,
      formatted,
      items,
      totalTokens: items.reduce((sum, i) => sum + i.tokens, 0),
      createdAt: Date.now(),
      hits: 0,
    });
  }

  /**
   * يبطل الـ cache كله
   */
  invalidate(): void {
    this.cache.clear();
  }

  /**
   * يبطل entries قديمة
   */
  cleanup(): number {
    let removed = 0;
    const now = Date.now();
    for (const [key, entry] of this.cache) {
      if (now - entry.createdAt > TTL_MS) {
        this.cache.delete(key);
        removed++;
      }
    }
    return removed;
  }

  /**
   * إحصائيات
   */
  stats(): {
    size: number;
    hits: number;
    misses: number;
    hitRate: number;
  } {
    let hits = 0;
    for (const entry of this.cache.values()) {
      hits += entry.hits;
    }
    return {
      size: this.cache.size,
      hits,
      misses: 0, // ميتتركش خارجياً
      hitRate: 0,
    };
  }
}

export const contextCache = new ContextCache();

/**
 * يحسب تشابه سؤالين (0..1)
 * يستخدم Jaccard على word sets
 */
export function querySimilarity(a: string, b: string): number {
  const wordsA = new Set(a.toLowerCase().split(/\s+/).filter(w => w.length > 2));
  const wordsB = new Set(b.toLowerCase().split(/\s+/).filter(w => w.length > 2));

  if (wordsA.size === 0 || wordsB.size === 0) return 0;

  let intersection = 0;
  for (const w of wordsA) {
    if (wordsB.has(w)) intersection++;
  }

  const union = wordsA.size + wordsB.size - intersection;
  return union > 0 ? intersection / union : 0;
}

```


---

## 📄 `src/lib/context/context-router.ts` (242 سطر)

```typescript
// ============================================
// Context Router — توجيه السياق حسب نوع السؤال
// ============================================
// يحلل السؤال + يحدد intent + يرجع المصادر المهمة
// ============================================

import type { ContextSource, QueryIntent, RouterResult } from './context-types';

// ============================================================
// Intent Detection
// ============================================================

interface IntentPattern {
  intent: QueryIntent;
  patterns: RegExp[];
  sources: ContextSource[];
  weights: Partial<Record<ContextSource, number>>;
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: 'recall',
    patterns: [
      /شو.*(تكلمنا|صار|عملت|درست|شفت)/i,
      /آخر.*(شي|مرة|محادثة)/i,
      /متى.*(صار|عملت|درست)/i,
      /قبل.*(كم|يوم|أسبوع|شهر|سنة)/i,
      /محادثتنا.*(السابقة|الأخيرة)/i,
      /what.*(did|said|did we talk)/i,
      /when.*(did|was)/i,
      /last.*(time|conversation|message)/i,
      /remember/i,
      /تذكر/i,
    ],
    sources: ['memory_semantic', 'memory_episodic', 'memory_long', 'memory_short', 'conversation'],
    weights: {
      memory_semantic: 1.0,
      memory_episodic: 1.0,
      memory_long: 0.8,
      memory_short: 0.7,
      conversation: 0.5,
    },
  },
  {
    intent: 'task_creation',
    patterns: [
      /أضف|ضيف|انشئ|أنشئ|اعمل|سوي|أعمل|أسوي/i,
      /create|add|new|make/i,
      /مهمة|مشروع|فكرة|ملاحظة/i,
      /task|project|idea|note/i,
    ],
    sources: ['user_profile', 'recent_activity', 'conversation', 'memory_semantic'],
    weights: {
      user_profile: 0.7,
      recent_activity: 0.8,
      conversation: 0.9,
      memory_semantic: 0.5,
    },
  },
  {
    intent: 'analysis',
    patterns: [
      /حلل|analyze|إحصائيات|statistics/i,
      /كم.*(مهمة|مشروع|مهارة)/i,
      /how.*many/i,
      /تقرير|report/i,
      /progress|تقدم/i,
      /pattern|نمط/i,
    ],
    sources: ['recent_activity', 'memory_episodic', 'memory_semantic', 'knowledge_graph'],
    weights: {
      recent_activity: 1.0,
      memory_episodic: 0.6,
      memory_semantic: 0.5,
      knowledge_graph: 0.6,
    },
  },
  {
    intent: 'planning',
    patterns: [
      /خطط|خطة|plan|schedule/i,
      /بكرة|بعد بكرة|الأسبوع الجاي|الشهر الجاي/i,
      /tomorrow|next week|next month/i,
      /جدول|روتين|نظام/i,
      /organize|رتّب/i,
    ],
    sources: ['memory_semantic', 'memory_episodic', 'knowledge_graph', 'recent_activity', 'conversation'],
    weights: {
      memory_semantic: 0.8,
      memory_episodic: 0.5,
      knowledge_graph: 0.7,
      recent_activity: 0.6,
      conversation: 0.4,
    },
  },
  {
    intent: 'code',
    patterns: [
      /اكتب كود|كود|برمج|function|class/i,
      /code|program|script/i,
      /debug|fix bug|error/i,
      /typescript|javascript|python|react/i,
      /arduino|plc|scada|esp32/i,
    ],
    sources: ['conversation', 'tool_results', 'attachments'],
    weights: {
      conversation: 1.0,
      tool_results: 0.7,
      attachments: 0.6,
    },
  },
  {
    intent: 'translation',
    patterns: [
      /ترجم|translate/i,
      /إلى (عربي|انجليزي|فرنسي)/i,
      /to (arabic|english|french)/i,
    ],
    sources: ['conversation', 'attachments'],
    weights: {
      conversation: 0.6,
      attachments: 0.9,
    },
  },
  {
    intent: 'summary',
    patterns: [
      /لخّص|lخّص|لخص|summarize|summary/i,
      /أوجز|brief/i,
      /key points|النقاط/i,
    ],
    sources: ['conversation', 'memory_episodic'],
    weights: {
      conversation: 1.0,
      memory_episodic: 0.4,
    },
  },
  {
    intent: 'question',
    patterns: [
      /شنو|شو|ماذا|what|who|when|where|why|how/i,
      /كيف|ليش|ليه|why/i,
      /هل|is|are|do|does/i,
      /\?/,
    ],
    sources: ['memory_semantic', 'memory_episodic', 'memory_long', 'knowledge_graph', 'recent_activity', 'conversation'],
    weights: {
      memory_semantic: 0.8,
      memory_episodic: 0.6,
      memory_long: 0.5,
      knowledge_graph: 0.6,
      recent_activity: 0.3,
      conversation: 0.4,
    },
  },
  {
    intent: 'casual',
    patterns: [
      /أهلاً|مرحبا|hello|hi|hey/i,
      /شكرا|thanks|thank you/i,
      /كيف حالك|how are you/i,
      /صباح|مساء|good morning|good evening/i,
    ],
    sources: ['conversation', 'memory_semantic'],
    weights: {
      conversation: 0.9,
      memory_semantic: 0.3,
    },
  },
];

/**
 * يحلل السؤال + يرجع intent + المصادر المهمة
 */
export function routeQuery(query: string): RouterResult {
  const matches: Array<{ pattern: IntentPattern; score: number }> = [];

  for (const pattern of INTENT_PATTERNS) {
    let score = 0;
    for (const re of pattern.patterns) {
      if (re.test(query)) {
        score += 1;
      }
    }
    if (score > 0) {
      matches.push({ pattern, score });
    }
  }

  if (matches.length === 0) {
    return {
      intent: 'unknown',
      relevantSources: ['memory_semantic', 'memory_long', 'conversation', 'recent_activity'],
      weights: {
        memory_semantic: 0.5,
        memory_long: 0.5,
        conversation: 0.6,
        recent_activity: 0.3,
        user_profile: 0.2,
        memory_episodic: 0.4,
        memory_short: 0.3,
        knowledge_graph: 0.4,
        system: 0.5,
        tool_results: 0.2,
        attachments: 0.2,
      },
      confidence: 0,
    };
  }

  // رتب بـ score (أعلى = الأنسب)
  matches.sort((a, b) => b.score - a.score);
  const best = matches[0]!;

  // املأ الـ weights لكل المصادر (0 لو مش مهم)
  const allSources: ContextSource[] = [
    'system', 'user_profile', 'recent_activity',
    'memory_short', 'memory_long', 'memory_episodic', 'memory_semantic',
    'knowledge_graph', 'conversation', 'tool_results', 'attachments',
  ];
  const weights: Record<ContextSource, number> = {} as Record<ContextSource, number>;
  for (const src of allSources) {
    weights[src] = best.pattern.weights[src] ?? 0;
  }

  // أضف المصادر الـ default (system دائماً)
  if (weights.system === 0) weights.system = 0.5;

  return {
    intent: best.pattern.intent,
    relevantSources: best.pattern.sources,
    weights,
    confidence: Math.min(1, best.score / 3), // normalize (3 patterns match = 1.0)
  };
}

/**
 * يرجع أسماء intents المتاحة
 */
export function getIntents(): QueryIntent[] {
  return INTENT_PATTERNS.map(p => p.intent);
}

```


---

## 📄 `src/lib/context/context-engine.ts` (524 سطر)

```typescript
// ============================================
// Context Engine — المنسق الرئيسي للسياق
// ============================================
// Phase 3.3: يجمع + يضغط + يوزع ميزانية + يكاش + يوجّه
//
// Workflow:
//   1. routeQuery(query) → intent + weights
//   2. buildBudget(intent, totalBudget) → ميزانية لكل مصدر
//   3. اجمع items من كل مصدر (بـ التوازي)
//   4. رتب + اقتطع حسب الميزانية
//   5. اضغط (compressor) لو ضروري
//   6. cache النتيجة
//   7. format النص النهائي
// ============================================

import { db } from '@/lib/db';
import { getUserContext } from '@/lib/ai-service';
import { memoryEngine } from '@/lib/memory/memory-engine';
import { getNeighbors, searchEntities, getFullGraph } from '@/lib/knowledge-graph';

import { routeQuery } from './context-router';
import { buildBudget, estimateTokens } from './context-budget';
import {
  compressConversation,
  compressMemories,
  compressEntities,
  compressToolResults,
  compressSystemPrompt,
} from './context-compressor';
import { contextCache } from './context-cache';
import type {
  AssembledContextV2,
  ContextItem,
  ContextSource,
  QueryIntent,
} from './context-types';

// ============================================================
// Main API — assembleContextV2
// ============================================================

export interface AssembleOptions {
  conversationId?: string;
  currentQuery: string;
  conversationHistory?: Array<{ role: string; content: string }>;
  totalBudget?: number;
  toolResults?: Array<{ name: string; result: unknown; success: boolean }>;
  attachments?: Array<{ name: string; type: string; summary?: string }>;
  useCache?: boolean;
}

/**
 * يجمع سياق ذكي + مضغوط للسؤال الحالي
 */
export async function assembleContextV2(options: AssembleOptions): Promise<AssembledContextV2> {
  const {
    conversationId,
    currentQuery,
    conversationHistory = [],
    totalBudget = 4000,
    toolResults = [],
    attachments = [],
    useCache = true,
  } = options;

  const assembledAt = new Date();

  // 1) cache check
  const intent = routeQuery(currentQuery);
  const cacheKey = contextCache.buildKey(currentQuery, conversationId, intent.intent);

  if (useCache) {
    const cached = contextCache.get(cacheKey);
    if (cached) {
      return {
        items: cached.items.map(i => ({ source: i.source as ContextSource, content: '', tokens: i.tokens, priority: 'medium', relevance: 0.5 })),
        totalTokens: cached.totalTokens,
        budget: totalBudget,
        truncated: false,
        truncatedItems: [],
        intent: intent.intent,
        formatted: cached.formatted,
        assembledAt,
        cacheHit: true,
        cacheKey,
      };
    }
  }

  // 2) build budget
  const budget = buildBudget(intent.intent, totalBudget);

  // 3) اجمع items من كل مصدر بـ التوازي
  const items: ContextItem[] = [];

  const [
    systemItem,
    userProfileItem,
    recentActivityItems,
    memoryItems,
    kgItems,
    conversationItem,
    toolResultsItem,
    attachmentsItem,
  ] = await Promise.all([
    gatherSystem(budget.bySource.system),
    gatherUserProfile(budget.bySource.user_profile),
    gatherRecentActivity(budget.bySource.recent_activity),
    gatherMemory(conversationId, currentQuery, budget, intent.weights),
    gatherKnowledgeGraph(currentQuery, budget.bySource.knowledge_graph),
    Promise.resolve(gatherConversation(conversationHistory, budget.bySource.conversation)),
    Promise.resolve(gatherToolResults(toolResults, budget.bySource.tool_results)),
    Promise.resolve(gatherAttachments(attachments, budget.bySource.attachments)),
  ]);

  if (systemItem) items.push(systemItem);
  if (userProfileItem) items.push(userProfileItem);
  items.push(...recentActivityItems);
  items.push(...memoryItems);
  items.push(...kgItems);
  if (conversationItem) items.push(conversationItem);
  if (toolResultsItem) items.push(toolResultsItem);
  if (attachmentsItem) items.push(attachmentsItem);

  // 4) رتب + اقتطع حسب الأولوية + الميزانية
  const sortedItems = items.sort((a, b) => {
    // priority * relevance * weight
    const scoreA = priorityScore(a) * a.relevance * (intent.weights[a.source] ?? 0.5);
    const scoreB = priorityScore(b) * b.relevance * (intent.weights[b.source] ?? 0.5);
    return scoreB - scoreA;
  });

  let totalTokens = 0;
  const keptItems: ContextItem[] = [];
  const truncatedItems: string[] = [];

  for (const item of sortedItems) {
    const sourceBudget = budget.bySource[item.source] ?? 200;
    if (item.tokens > sourceBudget) {
      // اضغط العنصر
      const compressed = compressItem(item, sourceBudget);
      if (totalTokens + compressed.tokens <= budget.total) {
        keptItems.push(compressed);
        totalTokens += compressed.tokens;
      } else {
        truncatedItems.push(item.source);
      }
    } else if (totalTokens + item.tokens <= budget.total) {
      keptItems.push(item);
      totalTokens += item.tokens;
    } else {
      truncatedItems.push(item.source);
    }
  }

  // 5) format النص النهائي
  const formatted = formatContext(keptItems);

  const result: AssembledContextV2 = {
    items: keptItems,
    totalTokens,
    budget: totalBudget,
    truncated: truncatedItems.length > 0,
    truncatedItems,
    intent: intent.intent,
    formatted,
    assembledAt,
    cacheHit: false,
    cacheKey,
  };

  // 6) cache
  if (useCache) {
    contextCache.set(cacheKey, formatted, keptItems.map(i => ({ source: i.source, tokens: i.tokens })));
  }

  return result;
}

// ============================================================
// Gatherers — تجمع items من كل مصدر
// ============================================================

async function gatherSystem(budget: number): Promise<ContextItem | null> {
  const fullPrompt = `أنت "ميمو" — المساعد الذكي الشخصي لمحمد عادل (18 سنة، الخليل، فلسطين).
محمد طالب هندسة أتمتة صناعية (PLC + SCADA + Arduino + Siemens S7-1200).
ساعد محمد بأسلوب شخصي واضح + عربي فصيح + تقني عند الحاجة.
استخدم السياق المُجمَّع لتقديم ردود دقيقة.`;
  const compressed = compressSystemPrompt(fullPrompt, budget);
  return {
    source: 'system',
    content: compressed,
    tokens: estimateTokens(compressed),
    priority: 'critical',
    relevance: 1.0,
  };
}

async function gatherUserProfile(budget: number): Promise<ContextItem | null> {
  try {
    const userContext = await getUserContext();
    const compressed = userContext.slice(0, budget * 4);
    return {
      source: 'user_profile',
      content: compressed,
      tokens: estimateTokens(compressed),
      priority: 'high',
      relevance: 0.7,
    };
  } catch {
    return null;
  }
}

async function gatherRecentActivity(budget: number): Promise<ContextItem[]> {
  const items: ContextItem[] = [];

  const [tasks, notes, activity] = await Promise.all([
    db.task.findMany({ take: 5, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.note.findMany({ take: 5, orderBy: { createdAt: 'desc' } }).catch(() => []),
    db.activityEvent.findMany({ take: 5, orderBy: { createdAt: 'desc' } }).catch(() => []),
  ]);

  if (tasks.length > 0) {
    const content = tasks.map(t => `- ${t.text} [${t.completed ? '✓' : '○'}] (${t.priority})`).join('\n');
    items.push({
      source: 'recent_activity',
      content: `آخر المهام:\n${content}`,
      tokens: estimateTokens(content),
      priority: 'medium',
      relevance: 0.5,
    });
  }

  if (notes.length > 0) {
    const content = notes.map(n => `- ${n.title}: ${(n.content || '').slice(0, 80)}`).join('\n');
    items.push({
      source: 'recent_activity',
      content: `آخر الملاحظات:\n${content}`,
      tokens: estimateTokens(content),
      priority: 'low',
      relevance: 0.4,
    });
  }

  if (activity.length > 0) {
    const content = activity.map(a => `- ${a.itemTitle} (${a.section})`).join('\n');
    items.push({
      source: 'recent_activity',
      content: `آخر النشاط:\n${content}`,
      tokens: estimateTokens(content),
      priority: 'low',
      relevance: 0.3,
    });
  }

  return items;
}

async function gatherMemory(
  conversationId: string | undefined,
  currentQuery: string,
  budget: Record<ContextSource, number>,
  weights: Record<ContextSource, number>,
): Promise<ContextItem[]> {
  const items: ContextItem[] = [];

  if (!currentQuery.trim()) return items;

  try {
    const convId = conversationId || `temp-${Date.now()}`;
    const result = await memoryEngine.recallRelevant({
      conversationId: convId,
      currentQuery,
      tokenBudget: budget.memory_long + budget.memory_episodic + budget.memory_semantic,
    });

    // semantic facts (أعلى أولوية)
    for (const fact of result.relevantSemantic.slice(0, 6)) {
      const content = `📌 ${fact.subject} ${fact.predicate} ${fact.object}`;
      items.push({
        source: 'memory_semantic',
        content,
        tokens: estimateTokens(content),
        priority: 'critical',
        relevance: 0.9 * (weights.memory_semantic ?? 0.5),
        metadata: { factId: fact.factId, confidence: fact.confidence },
      });
    }

    // episodic events
    for (const event of result.relevantEpisodic.slice(0, 3)) {
      const date = event.occurredAt ? new Date(event.occurredAt).toLocaleDateString('ar-EG') : '';
      const content = `🗓️ ${event.title} (${date})${event.description ? ': ' + event.description.slice(0, 80) : ''}`;
      items.push({
        source: 'memory_episodic',
        content,
        tokens: estimateTokens(content),
        priority: 'high',
        relevance: 0.7 * (weights.memory_episodic ?? 0.5),
        metadata: { occurredAt: event.occurredAt, importance: event.importance },
      });
    }

    // long-term memories
    for (const mem of result.relevantLongTerm.slice(0, 3)) {
      const content = `📚 ${mem.content.slice(0, 150)}`;
      items.push({
        source: 'memory_long',
        content,
        tokens: estimateTokens(content),
        priority: 'medium',
        relevance: 0.6 * (weights.memory_long ?? 0.5),
        metadata: { memoryId: mem.id, importance: mem.importance },
      });
    }

    // short-term (آخر الرسائل)
    if (result.shortTerm.length > 0) {
      const compressed = compressConversation(
        result.shortTerm.map(m => ({
          role: m.messageRole ?? 'user',
          content: m.content,
        })),
        budget.memory_short,
      );
      items.push({
        source: 'memory_short',
        content: `آخر محادثة:\n${compressed}`,
        tokens: estimateTokens(compressed),
        priority: 'medium',
        relevance: 0.5 * (weights.memory_short ?? 0.5),
      });
    }
  } catch (err) {
    console.error('[Context Engine] gatherMemory failed:', err);
  }

  return items;
}

async function gatherKnowledgeGraph(currentQuery: string, budget: number): Promise<ContextItem[]> {
  if (budget <= 0) return [];

  const items: ContextItem[] = [];

  try {
    // ابحث بـ entities بـ keywords من السؤال
    const keywords = currentQuery
      .split(/\s+/)
      .filter(w => w.length > 2)
      .slice(0, 3);

    const entities: any[] = [];
    for (const kw of keywords) {
      const results = await searchEntities(kw, 5).catch(() => []);
      entities.push(...results);
    }

    // dedup
    const seen = new Set<string>();
    const uniqueEntities = entities.filter(e => {
      if (seen.has(e.id)) return false;
      seen.add(e.id);
      return true;
    });

    if (uniqueEntities.length === 0) return [];

    // خد أقرب 5 + neighbors
    const expandedEntities: any[] = [...uniqueEntities.slice(0, 5)];
    for (const e of uniqueEntities.slice(0, 3)) {
      const neighbors = await getNeighbors(e.id, 3).catch(() => []);
      for (const n of neighbors) {
        if (!seen.has(n.node.id)) {
          seen.add(n.node.id);
          expandedEntities.push(n.node);
        }
      }
    }

    const compressed = compressEntities(expandedEntities, budget);
    if (compressed.length === 0) return [];

    const content = `كيانات ذات صلة:\n${compressed.join('\n')}`;
    items.push({
      source: 'knowledge_graph',
      content,
      tokens: estimateTokens(content),
      priority: 'medium',
      relevance: 0.6,
    });
  } catch (err) {
    console.error('[Context Engine] gatherKnowledgeGraph failed:', err);
  }

  return items;
}

function gatherConversation(
  history: Array<{ role: string; content: string }>,
  budget: number,
): ContextItem | null {
  if (history.length === 0) return null;

  const compressed = compressConversation(history, budget);
  return {
    source: 'conversation',
    content: `المحادثة:\n${compressed}`,
    tokens: estimateTokens(compressed),
    priority: 'high',
    relevance: 0.8,
  };
}

function gatherToolResults(
  toolResults: Array<{ name: string; result: unknown; success: boolean }>,
  budget: number,
): ContextItem | null {
  if (toolResults.length === 0) return null;

  const compressed = compressToolResults(toolResults, budget);
  if (compressed.length === 0) return null;

  return {
    source: 'tool_results',
    content: `نتائج الأدوات:\n${compressed.join('\n')}`,
    tokens: estimateTokens(compressed.join('\n')),
    priority: 'medium',
    relevance: 0.7,
  };
}

function gatherAttachments(
  attachments: Array<{ name: string; type: string; summary?: string }>,
  budget: number,
): ContextItem | null {
  if (attachments.length === 0) return null;

  const lines = attachments.map(a => `- [${a.type}] ${a.name}${a.summary ? ': ' + a.summary.slice(0, 80) : ''}`);
  const content = `مرفقات:\n${lines.join('\n')}`.slice(0, budget * 4);
  return {
    source: 'attachments',
    content,
    tokens: estimateTokens(content),
    priority: 'high',
    relevance: 0.8,
  };
}

// ============================================================
// Helpers
// ============================================================

function priorityScore(item: ContextItem): number {
  const weights: Record<string, number> = {
    critical: 1.0,
    high: 0.8,
    medium: 0.6,
    low: 0.3,
    optional: 0.1,
  };
  return weights[item.priority] ?? 0.5;
}

function compressItem(item: ContextItem, maxTokens: number): ContextItem {
  if (item.tokens <= maxTokens) return item;

  // اضغط النص
  const content = item.content.slice(0, maxTokens * 4);
  return {
    ...item,
    content,
    tokens: estimateTokens(content),
  };
}

function formatContext(items: ContextItem[]): string {
  const sections: string[] = [];

  for (const item of items) {
    const label = getSourceLabel(item.source);
    sections.push(`--- ${label} ---\n${item.content}`);
  }

  return sections.join('\n\n');
}

function getSourceLabel(source: ContextSource): string {
  const labels: Record<ContextSource, string> = {
    system: 'السياق',
    user_profile: 'نبذة',
    recent_activity: 'النشاط',
    memory_short: 'المحادثة الأخيرة',
    memory_long: 'الذاكرة',
    memory_episodic: 'الأحداث',
    memory_semantic: 'حقائق',
    knowledge_graph: 'المعرفة',
    conversation: 'المحادثة',
    tool_results: 'الأدوات',
    attachments: 'المرفقات',
  };
  return labels[source] || source;
}

// ============================================================
// Cache management
// ============================================================

export function invalidateContextCache(): void {
  contextCache.invalidate();
}

export function getContextCacheStats() {
  return contextCache.stats();
}

// ============================================================
// Route only (for testing)
// ============================================================

export function routeQueryOnly(query: string) {
  return routeQuery(query);
}

```


---

## 📄 `src/lib/context/index.ts` (25 سطر)

```typescript
// ============================================
// Context Engineering — re-exports
// ============================================

export { assembleContextV2, invalidateContextCache, getContextCacheStats, routeQueryOnly } from './context-engine';
export { buildBudget, estimateTokens, sumTokens } from './context-budget';
export { routeQuery, getIntents } from './context-router';
export {
  compressConversation,
  compressMemories,
  compressEntities,
  compressToolResults,
  compressSystemPrompt,
} from './context-compressor';
export { contextCache, querySimilarity } from './context-cache';

export type {
  ContextSource,
  QueryIntent,
  ContextPriority,
  ContextItem,
  AssembledContextV2,
  ContextBudget,
  RouterResult,
} from './context-types';

```


---

## 📄 `src/lib/knowledge-graph/index.ts` (549 سطر)

```typescript
// ============================================
// Knowledge Graph — Entity Extraction + Relations
// ============================================
// Phase 3.2: محرك خريطة المعرفة الحقيقي
//
// - EntityNode: كيان (شخص، مشروع، تقنية، مفهوم، مكان، حدث، مهارة، موضوع)
// - EntityRelation: علاقة (related_to, depends_on, part_of, used_in, ...)
//
// المصادر:
// 1. من DB مباشرة (projects, tasks, notes, ideas, skills, knowledge)
// 2. من Memory Engine (semantic facts → entities + relations)
// 3. من tags مطابقة (shared tags → relations)
// 4. يدوي من المستخدم
//
// ============================================

import 'server-only';
import { db } from '@/lib/db';

// ============================================================
// Types
// ============================================================

export type EntityType =
  | 'person'
  | 'project'
  | 'technology'
  | 'concept'
  | 'place'
  | 'event'
  | 'skill'
  | 'topic';

export type RelationType =
  | 'related_to'
  | 'depends_on'
  | 'part_of'
  | 'used_in'
  | 'learned_from'
  | 'created_by'
  | 'belongs_to'
  | 'shared_tag'
  | 'mentioned_in';

export interface EntityNodeData {
  id: string;
  type: EntityType;
  name: string;
  description?: string;
  sourceType?: string;
  sourceId?: string;
  factId?: string;
  aliases?: string[];
  properties?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

export interface EntityRelationData {
  id: string;
  sourceId: string;
  targetId: string;
  type: RelationType;
  weight: number;
  source?: string;
  properties?: Record<string, unknown>;
  createdAt: Date;
}

export interface GraphData {
  nodes: EntityNodeData[];
  edges: EntityRelationData[];
  byType: Record<string, number>;
  byRelationType: Record<string, number>;
}

// ============================================================
// Entity Upsert
// ============================================================

/** يضيف كيان جديد أو يحدّث الموجود (upsert بـ type+name) */
export async function upsertEntity(input: {
  type: EntityType;
  name: string;
  description?: string;
  sourceType?: string;
  sourceId?: string;
  factId?: string;
  aliases?: string[];
  properties?: Record<string, unknown>;
}): Promise<EntityNodeData> {
  const node = await db.entityNode.upsert({
    where: {
      type_name: { type: input.type, name: input.name },
    },
    create: {
      type: input.type,
      name: input.name,
      description: input.description ?? null,
      sourceType: input.sourceType ?? null,
      sourceId: input.sourceId ?? null,
      factId: input.factId ?? null,
      aliases: input.aliases ? JSON.stringify(input.aliases) : null,
      properties: input.properties ? JSON.stringify(input.properties) : null,
    },
    update: {
      description: input.description ?? undefined,
      sourceType: input.sourceType ?? undefined,
      sourceId: input.sourceId ?? undefined,
      factId: input.factId ?? undefined,
      aliases: input.aliases ? JSON.stringify(input.aliases) : undefined,
      properties: input.properties ? JSON.stringify(input.properties) : undefined,
    },
  });

  return mapPrismaToEntityNode(node);
}

/** يجيب كيان بـ ID */
export async function getEntity(id: string): Promise<EntityNodeData | null> {
  const node = await db.entityNode.findUnique({ where: { id } });
  return node ? mapPrismaToEntityNode(node) : null;
}

/** يجيب كيان بـ type+name */
export async function getEntityByTypeAndName(type: EntityType, name: string): Promise<EntityNodeData | null> {
  const node = await db.entityNode.findUnique({
    where: { type_name: { type, name } },
  });
  return node ? mapPrismaToEntityNode(node) : null;
}

/** يبحث بـ entities بـ name */
export async function searchEntities(query: string, limit = 20): Promise<EntityNodeData[]> {
  const nodes = await db.entityNode.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
      ],
    },
    take: limit,
    orderBy: { updatedAt: 'desc' },
  });
  return nodes.map(mapPrismaToEntityNode);
}

/** يجيب كل الكيانات بـ filter */
export async function listEntities(filter: {
  type?: EntityType;
  sourceType?: string;
  limit?: number;
} = {}): Promise<EntityNodeData[]> {
  const where: Record<string, unknown> = {};
  if (filter.type) where.type = filter.type;
  if (filter.sourceType) where.sourceType = filter.sourceType;

  const nodes = await db.entityNode.findMany({
    where,
    take: filter.limit ?? 100,
    orderBy: { updatedAt: 'desc' },
  });
  return nodes.map(mapPrismaToEntityNode);
}

// ============================================================
// Relation Upsert
// ============================================================

/** يضيف علاقة أو يحدّث الموجودة (upsert بـ sourceId+targetId+type) */
export async function upsertRelation(input: {
  sourceId: string;
  targetId: string;
  type: RelationType;
  weight?: number;
  source?: string;
  properties?: Record<string, unknown>;
}): Promise<EntityRelationData | null> {
  // تأكد إن الـ source != target
  if (input.sourceId === input.targetId) return null;

  const relation = await db.entityRelation.upsert({
    where: {
      sourceId_targetId_type: {
        sourceId: input.sourceId,
        targetId: input.targetId,
        type: input.type,
      },
    },
    create: {
      sourceId: input.sourceId,
      targetId: input.targetId,
      type: input.type,
      weight: input.weight ?? 1.0,
      source: input.source ?? 'auto',
      properties: input.properties ? JSON.stringify(input.properties) : null,
    },
    update: {
      weight: input.weight ?? undefined,
      source: input.source ?? undefined,
      properties: input.properties ? JSON.stringify(input.properties) : undefined,
    },
  });

  return mapPrismaToEntityRelation(relation);
}

/** يجيب علاقات كيان (outgoing + incoming) */
export async function getEntityRelations(
  entityId: string,
  options: { direction?: 'outgoing' | 'incoming' | 'both'; limit?: number } = {}
): Promise<EntityRelationData[]> {
  const { direction = 'both', limit = 50 } = options;

  const where: Record<string, unknown> = {
    OR: [] as Array<Record<string, unknown>>,
  };
  if (direction === 'outgoing' || direction === 'both') {
    (where.OR as Array<Record<string, unknown>>).push({ sourceId: entityId });
  }
  if (direction === 'incoming' || direction === 'both') {
    (where.OR as Array<Record<string, unknown>>).push({ targetId: entityId });
  }

  const relations = await db.entityRelation.findMany({
    where,
    take: limit,
    orderBy: { weight: 'desc' },
  });

  return relations.map(mapPrismaToEntityRelation);
}

/** يجيب جيران كيان مباشرة (1-hop) */
export async function getNeighbors(
  entityId: string,
  limit = 20
): Promise<{ node: EntityNodeData; relation: EntityRelationData; direction: 'outgoing' | 'incoming' }[]> {
  const relations = await getEntityRelations(entityId, { limit });

  const neighborIds = new Set<string>();
  for (const r of relations) {
    if (r.sourceId === entityId) neighborIds.add(r.targetId);
    else neighborIds.add(r.sourceId);
  }

  const nodes = await db.entityNode.findMany({
    where: { id: { in: Array.from(neighborIds) } },
  });
  const nodeMap = new Map(nodes.map((n) => [n.id, mapPrismaToEntityNode(n)]));

  return relations
    .map((r) => {
      const neighborId = r.sourceId === entityId ? r.targetId : r.sourceId;
      const node = nodeMap.get(neighborId);
      if (!node) return null;
      return {
        node,
        relation: r,
        direction: (r.sourceId === entityId ? 'outgoing' : 'incoming') as 'outgoing' | 'incoming',
      };
    })
    .filter((x): x is { node: EntityNodeData; relation: EntityRelationData; direction: 'outgoing' | 'incoming' } => x !== null);
}

/** يجيب كل الـ graph (nodes + edges) */
export async function getFullGraph(limit = 200): Promise<GraphData> {
  const [nodes, edges] = await Promise.all([
    db.entityNode.findMany({ take: limit, orderBy: { updatedAt: 'desc' } }),
    db.entityRelation.findMany({ take: limit * 2, orderBy: { weight: 'desc' } }),
  ]);

  const byType: Record<string, number> = {};
  for (const n of nodes) {
    byType[n.type] = (byType[n.type] || 0) + 1;
  }
  const byRelationType: Record<string, number> = {};
  for (const e of edges) {
    byRelationType[e.type] = (byRelationType[e.type] || 0) + 1;
  }

  return {
    nodes: nodes.map(mapPrismaToEntityNode),
    edges: edges.map(mapPrismaToEntityRelation),
    byType,
    byRelationType,
  };
}

// ============================================================
// Auto-Extraction من DB
// ============================================================

/** يستخرج entities من كل الـ DB + يبني relations */
export async function autoBuildGraph(): Promise<{ nodesCreated: number; relationsCreated: number }> {
  let nodesCreated = 0;
  let relationsCreated = 0;

  // 1) من المشاريع
  const projects = await db.project.findMany({ take: 100 }).catch(() => []);
  for (const p of projects) {
    const node = await upsertEntity({
      type: 'project',
      name: p.title || 'Untitled Project',
      description: p.description ?? undefined,
      sourceType: 'project',
      sourceId: p.id,
      aliases: p.technologies ? JSON.parse(p.technologies || '[]') : undefined,
    }).catch(() => null);
    if (node) nodesCreated++;

    // technologies → technology entities
    if (p.technologies) {
      try {
        const techs: string[] = JSON.parse(p.technologies);
        for (const tech of techs) {
          if (!tech || typeof tech !== 'string') continue;
          const techNode = await upsertEntity({
            type: 'technology',
            name: tech,
            sourceType: 'project',
          }).catch(() => null);
          if (techNode && node) {
            const rel = await upsertRelation({
              sourceId: node.id,
              targetId: techNode.id,
              type: 'used_in',
              weight: 0.8,
              source: 'auto_project_tech',
            }).catch(() => null);
            if (rel) relationsCreated++;
          }
        }
      } catch { /* ignore JSON parse errors */ }
    }
  }

  // 2) من المهام
  const tasks = await db.task.findMany({ take: 200 }).catch(() => []);
  for (const t of tasks) {
    const node = await upsertEntity({
      type: 'event',
      name: t.text || 'Untitled Task',
      description: t.notes ?? undefined,
      sourceType: 'task',
      sourceId: t.id,
    }).catch(() => null);
    if (node) nodesCreated++;
  }

  // 3) من المهارات
  const skills = await db.skill.findMany({ take: 100 }).catch(() => []);
  for (const s of skills) {
    const node = await upsertEntity({
      type: 'skill',
      name: s.name || 'Untitled Skill',
      description: s.description ?? undefined,
      sourceType: 'skill',
      sourceId: s.id,
    }).catch(() => null);
    if (node) nodesCreated++;
  }

  // 4) من قاعدة المعرفة
  const knowledge = await db.knowledgeEntry.findMany({ take: 100 }).catch(() => []);
  for (const k of knowledge) {
    const node = await upsertEntity({
      type: 'topic',
      name: k.topic || k.title || 'Untitled Topic',
      description: k.content ?? undefined,
      sourceType: 'knowledge',
      sourceId: k.id,
    }).catch(() => null);
    if (node) nodesCreated++;
  }

  // 5) من الملاحظات (notes بـ tags)
  const notes = await db.note.findMany({ take: 200 }).catch(() => []);
  const tagToNodes = new Map<string, string[]>();

  for (const n of notes) {
    let tags: string[] = [];
    try {
      tags = JSON.parse(n.tags || '[]');
    } catch { /* ignore */ }

    for (const tag of tags) {
      if (!tag || typeof tag !== 'string') continue;
      const tagNode = await upsertEntity({
        type: 'concept',
        name: tag,
        sourceType: 'tag',
      }).catch(() => null);
      if (tagNode) {
        nodesCreated++;
        if (!tagToNodes.has(tag)) tagToNodes.set(tag, []);
        tagToNodes.get(tag)!.push(tagNode.id);
      }
    }
  }

  // 6) اربط الـ nodes اللي تشترك بـ tags
  for (const [tag, ids] of tagToNodes) {
    if (ids.length < 2) continue;
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const rel = await upsertRelation({
          sourceId: ids[i],
          targetId: ids[j],
          type: 'shared_tag',
          weight: 0.5,
          source: 'auto_tag_match',
          properties: { tag },
        }).catch(() => null);
        if (rel) relationsCreated++;
      }
    }
  }

  // 7) من Memory Engine (semantic facts)
  const facts = await db.semanticFact.findMany({ take: 100 }).catch(() => []);
  for (const fact of facts) {
    // subject → entity
    const subjectNode = await upsertEntity({
      type: 'person',
      name: fact.subject,
      sourceType: 'semantic_fact',
      sourceId: fact.id,
      factId: fact.id,
    }).catch(() => null);
    if (subjectNode) nodesCreated++;

    // object → entity (loosely)
    const objectNode = await upsertEntity({
      type: guessObjectType(fact.predicate, fact.object),
      name: fact.object,
      sourceType: 'semantic_fact',
      sourceId: fact.id,
      factId: fact.id,
    }).catch(() => null);
    if (objectNode) nodesCreated++;

    // relation
    if (subjectNode && objectNode) {
      const rel = await upsertRelation({
        sourceId: subjectNode.id,
        targetId: objectNode.id,
        type: guessRelationType(fact.predicate),
        weight: fact.confidence,
        source: 'auto_semantic_fact',
        properties: { predicate: fact.predicate },
      }).catch(() => null);
      if (rel) relationsCreated++;
    }
  }

  return { nodesCreated, relationsCreated };
}

// ============================================================
// Helpers
// ============================================================

function guessObjectType(predicate: string, object: string): EntityType {
  const p = predicate.toLowerCase();
  if (p.includes('يعيش') || p.includes('يسكن') || p.includes('lives')) return 'place';
  if (p.includes('يدرس') || p.includes('يتعلم') || p.includes('studies')) return 'topic';
  if (p.includes('يحب') || p.includes('loves') || p.includes('likes')) return 'concept';
  if (p.includes('يعمل') || p.includes('works')) return 'project';
  return 'concept';
}

function guessRelationType(predicate: string): RelationType {
  const p = predicate.toLowerCase();
  if (p.includes('يعمل') || p.includes('works')) return 'created_by';
  if (p.includes('يدرس') || p.includes('يتعلم') || p.includes('studies') || p.includes('learns')) return 'learned_from';
  if (p.includes('يملك') || p.includes('has') || p.includes('owns')) return 'belongs_to';
  if (p.includes('جزء') || p.includes('part')) return 'part_of';
  if (p.includes('يحب') || p.includes('loves') || p.includes('likes')) return 'related_to';
  return 'related_to';
}

function mapPrismaToEntityNode(n: any): EntityNodeData {
  let aliases: string[] | undefined;
  try { aliases = n.aliases ? JSON.parse(n.aliases) : undefined; } catch { /* ignore */ }
  let properties: Record<string, unknown> | undefined;
  try { properties = n.properties ? JSON.parse(n.properties) : undefined; } catch { /* ignore */ }
  return {
    id: n.id,
    type: n.type as EntityType,
    name: n.name,
    description: n.description ?? undefined,
    sourceType: n.sourceType ?? undefined,
    sourceId: n.sourceId ?? undefined,
    factId: n.factId ?? undefined,
    aliases,
    properties,
    createdAt: n.createdAt,
    updatedAt: n.updatedAt,
  };
}

function mapPrismaToEntityRelation(r: any): EntityRelationData {
  let properties: Record<string, unknown> | undefined;
  try { properties = r.properties ? JSON.parse(r.properties) : undefined; } catch { /* ignore */ }
  return {
    id: r.id,
    sourceId: r.sourceId,
    targetId: r.targetId,
    type: r.type as RelationType,
    weight: r.weight,
    source: r.source ?? undefined,
    properties,
    createdAt: r.createdAt,
  };
}

// ============================================================
// Stats
// ============================================================

export async function getGraphStats(): Promise<{
  totalNodes: number;
  totalEdges: number;
  byType: Record<string, number>;
  byRelationType: Record<string, number>;
  bySource: Record<string, number>;
}> {
  const [totalNodes, totalEdges, byTypeRows, byRelTypeRows, bySourceRows] = await Promise.all([
    db.entityNode.count(),
    db.entityRelation.count(),
    db.entityNode.groupBy({ by: ['type'], _count: true }),
    db.entityRelation.groupBy({ by: ['type'], _count: true }),
    db.entityNode.groupBy({ by: ['sourceType'], _count: true }),
  ]);

  const byType: Record<string, number> = {};
  for (const r of byTypeRows) byType[r.type] = r._count;

  const byRelationType: Record<string, number> = {};
  for (const r of byRelTypeRows) byRelationType[r.type] = r._count;

  const bySource: Record<string, number> = {};
  for (const r of bySourceRows) {
    bySource[r.sourceType ?? 'unknown'] = r._count;
  }

  return { totalNodes, totalEdges, byType, byRelationType, bySource };
}

```


---

## 📄 `src/app/api/ai-core/route.ts` (303 سطر)

```typescript
// ============================================
// /api/ai-core — Bridge بين الواجهة وخدمة الـ AI Core
// ============================================
// POST { message, userId?, stream?, sessionId? }
//
// يتحقق من الجلسة عبر verifySessionToken أولاً، ثم يستدعي MessageHandler
// من mini-services/ai-core/ (الـ ReAct Engine اللي بناه AI-5) ويحوّل
// ReActStep[] إلى SSE (text/event-stream).
//
// SSE event types المُصدَرة:
//   data: {"type":"step","step":"thought|action|observation|answer",...}
//   data: {"type":"answer","content":"الرد الكامل"}
//   data: {"type":"error","message":"...","code":"..."}
//   data: {"type":"done"}
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import {
  handleMessage,
  handleMessageStream,
  type UserMessage,
  type ReActStep,
} from '../../../../mini-services/ai-core/message-handler';
import { memoryEngine } from '@/lib/memory/memory-engine';

// ============================================
// Auth helper
// ============================================
async function requireSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  return session !== null;
}

// ============================================
// تحويل ReActStep → SSE line
// ============================================
function toSSE(ev: ReActStep | { type: string; [k: string]: unknown }): string {
  return `data: ${JSON.stringify(ev)}\n\n`;
}

function errorSSE(message: string, code: string): string {
  return `data: ${JSON.stringify({ type: 'error', message, code })}\n\n`;
}

function doneSSE(): string {
  return `data: ${JSON.stringify({ type: 'done' })}\n\n`;
}

// ============================================
// POST — الـ bridge الأساسي
// ============================================
export async function POST(req: NextRequest) {
  // 1) الأمان أولاً
  if (!(await requireSession())) {
    return NextResponse.json(
      { error: 'غير مصرح — يجب تسجيل الدخول أولاً', code: 'UNAUTHORIZED' },
      { status: 401 },
    );
  }

  // 2) قراءة + التحقق من الـ body
  let body: { message?: string; userId?: string; stream?: boolean; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: 'جسم الطلب ليس JSON صالح', code: 'INVALID_JSON' },
      { status: 400 },
    );
  }

  const messageText = typeof body.message === 'string' ? body.message.trim() : '';
  if (!messageText) {
    return NextResponse.json(
      { error: 'الحقل "message" مطلوب', code: 'MISSING_MESSAGE' },
      { status: 400 },
    );
  }

  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : undefined;
  const wantsStream = body.stream === true
    || req.headers.get('accept') === 'text/event-stream';

  // بناء UserMessage المتوقع من AI-5 message-handler
  const userMessage: UserMessage = {
    text: messageText,
    sessionId,
  };

  // ⭐ Phase 3.1: احفظ رسالة المستخدم بـ Memory Engine (auto-memory)
  let conversationId = sessionId;
  try {
    if (!conversationId) {
      // ابدأ محادثة جديدة بـ Memory Engine
      const conv = await memoryEngine.startConversation(messageText.slice(0, 60));
      conversationId = conv.id;
    }
    if (conversationId) {
      await memoryEngine.addMessage({
        conversationId,
        role: 'user',
        content: messageText,
      });
    }
  } catch (e) {
    console.error('[ai-core] Memory Engine save user msg failed:', e);
    // ما نكسر الـ request لو الذاكرة فشلت
  }

  // 3) وضع غير متدفق (JSON response عادي)
  if (!wantsStream) {
    try {
      const result = await handleMessage(userMessage);

      // ⭐ Phase 3.1: احفظ رد الـ AI بـ Memory Engine
      try {
        if (conversationId && result.answer) {
          await memoryEngine.addMessage({
            conversationId,
            role: 'assistant',
            content: result.answer,
            thinking: result.steps
              .filter((s) => s.type === 'thought')
              .map((s) => s.content)
              .join(' → ') || undefined,
          });
        }

        // ⭐ Phase 3.3+: استخرج ذكريات تلقائياً بعد كل رد (مو بس عند endConversation)
        // — عشان "بدي اشتغل لواحد" تتحفظ كـ episodic event + semantic fact فوراً
        if (conversationId) {
          const messages = await memoryEngine.getMessages(conversationId, 50);
          // استدعِ memorize بـ fire-and-forget (ما نوقف الـ response)
          memoryEngine.memorize({
            conversationId,
            messages,
          }).catch((err) => {
            console.error('[ai-core] auto-memorize (non-stream) failed:', err);
          });
        }
      } catch (e) {
        console.error('[ai-core] Memory Engine save AI msg failed:', e);
      }

      return NextResponse.json({
        success: true,
        answer: result.answer,
        steps: result.steps,
        toolsUsed: result.toolsUsed,
        provider: result.provider,
        conversationId, // ⭐ رجّع conversationId للـ frontend
      });
    } catch (e) {
      return NextResponse.json(
        {
          error: 'فشل معالجة الرسالة',
          code: 'PROCESSING_FAILED',
          detail: e instanceof Error ? e.message : String(e),
        },
        { status: 500 },
      );
    }
  }

  // 4) وضع SSE streaming — استهلك handleMessageStream (ReAct generator)
  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      req.signal.addEventListener('abort', () => {
        closed = true;
        try { controller.close(); } catch { /* already closed */ }
      });

      try {
        const generator = handleMessageStream(userMessage);
        let finalResult = null;

        // استهلك الـ generator — كل yield هو ReActStep، return هو ProcessResult
        while (true) {
          if (closed) break;
          const { value, done } = await generator.next();
          if (done) {
            finalResult = value;
            break;
          }
          // value = ReActStep (thought/action/observation/answer)
          if (value) {
            controller.enqueue(encoder.encode(toSSE(value)));
            // لو الـ step هو answer، أرسله كـ final answer event أيضاً
            if (value.type === 'answer' && value.content) {
              controller.enqueue(encoder.encode(
                `data: ${JSON.stringify({ type: 'final_answer', content: value.content })}\n\n`,
              ));
            }
          }
        }

        // أرسل metadata نهائية (toolsUsed + provider) لو متوفرة
        if (finalResult && !closed) {
          controller.enqueue(encoder.encode(
            `data: ${JSON.stringify({
              type: 'metadata',
              toolsUsed: finalResult.toolsUsed,
              provider: finalResult.provider,
              stepsCount: finalResult.steps.length,
              conversationId, // ⭐ رجّع conversationId للـ frontend
            })}\n\n`,
          ));
        }

        // ⭐ Phase 3.3+: احفظ رد الـ AI بـ Memory Engine + استخرج ذكريات تلقائياً
        if (finalResult?.answer && conversationId && !closed) {
          try {
            await memoryEngine.addMessage({
              conversationId,
              role: 'assistant',
              content: finalResult.answer,
              thinking: finalResult.steps
                .filter((s) => s.type === 'thought')
                .map((s) => s.content)
                .join(' → ') || undefined,
            });
          } catch (e) {
            console.error('[ai-core] save AI msg (stream) failed:', e);
          }

          // ⭐ استخرج ذكريات تلقائياً بعد كل رد
          try {
            const messages = await memoryEngine.getMessages(conversationId, 50);
            memoryEngine.memorize({
              conversationId,
              messages,
            }).catch((err) => {
              console.error('[ai-core] auto-memorize (stream) failed:', err);
            });
          } catch (e) {
            console.error('[ai-core] getMessages failed:', e);
          }
        }

        if (!closed) {
          controller.enqueue(encoder.encode(doneSSE()));
        }
      } catch (e) {
        if (!closed) {
          controller.enqueue(encoder.encode(errorSSE(
            'حدث خطأ غير متوقع أثناء المعالجة',
            'INTERNAL_ERROR',
          )));
          // أضف تفاصيل الخطأ للمساعدة في الـ debug
          controller.enqueue(encoder.encode(`data: ${JSON.stringify({
            type: 'error_detail',
            detail: e instanceof Error ? e.message : String(e),
          })}\n\n`));
          controller.enqueue(encoder.encode(doneSSE()));
        }
      } finally {
        if (!closed) {
          try { controller.close(); } catch { /* already closed */ }
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
      // تعطيل buffering في proxies (nginx/Caddy)
      'X-Accel-Buffering': 'no',
    },
  });
}

// ============================================
// GET — معلومات الـ endpoint (health/discovery)
// ============================================
export async function GET(req: NextRequest) {
  if (!(await requireSession())) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }
  return NextResponse.json({
    endpoint: '/api/ai-core',
    methods: ['POST'],
    contract: {
      request: {
        message: 'string (required)',
        userId: 'string?',
        stream: 'boolean?',
        sessionId: 'string?',
      },
      sse: ['step (thought|action|observation|answer)', 'final_answer', 'metadata', 'error', 'done'],
    },
    poweredBy: 'AI-5 ReAct Engine (mini-services/ai-core/message-handler.ts)',
    note: 'أرسل POST بـ stream:true واحصل على text/event-stream',
  });
}

```


---

## 📄 `src/app/api/memory/route.ts` (537 سطر)

```typescript
/**
 * MiMo Life OS — Memory Engine API
 * ============================================================
 * Task ID: 5 (المشرف)
 *
 * نقطة وحدة (Single Endpoint) لكل عمليات الذاكرة.
 * كل الأكشنز تمر من هنا — يسهل الـ debugging والإضافة لاحقاً.
 *
 * GET /api/memory?action=stats
 * GET /api/memory?action=search&q=<query>&limit=10&layers=short_term,long_term
 * GET /api/memory?action=recent&layer=long_term&limit=20
 * GET /api/memory?action=conversations&limit=20
 * GET /api/memory?action=conversation&id=<id>
 *
 * POST /api/memory { action: 'start_conversation', title?: string }
 * POST /api/memory { action: 'add_message', conversationId, role, content, thinking?, toolCalls?, tokens? }
 * POST /api/memory { action: 'end_conversation', conversationId }
 * POST /api/memory { action: 'memorize', conversationId, messages? }
 * POST /api/memory { action: 'recall', conversationId, currentQuery, tokenBudget?, includeLayers? }
 * POST /api/memory { action: 'search', query, layers?, limit?, minImportance?, tags?, subjects? }
 * POST /api/memory { action: 'consolidate' }
 * POST /api/memory { action: 'decay' }
 * POST /api/memory { action: 'cleanup' }
 */

import { NextRequest, NextResponse } from 'next/server'
import { memoryEngine } from '@/lib/memory/memory-engine'
import type { MemoryLayer } from '@/lib/memory/types'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

// ============================================================
// GET — استعلامات
// ============================================================

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const action = searchParams.get('action') ?? 'stats'

  try {
    switch (action) {
      case 'stats': {
        const stats = await memoryEngine.stats()
        return NextResponse.json({ success: true, stats })
      }

      case 'search': {
        const q = searchParams.get('q') ?? ''
        const limit = parseInt(searchParams.get('limit') ?? '10', 10)
        const layersParam = searchParams.get('layers')
        const layers = layersParam
          ? (layersParam.split(',').filter(Boolean) as MemoryLayer[])
          : undefined
        const minImportance = searchParams.get('minImportance')
          ? parseFloat(searchParams.get('minImportance')!)
          : undefined
        const tagsParam = searchParams.get('tags')
        const tags = tagsParam ? tagsParam.split(',').filter(Boolean) : undefined

        const results = await memoryEngine.search({
          query: q,
          layers,
          limit,
          minImportance,
          tags,
        })
        return NextResponse.json({ success: true, results, count: results.length })
      }

      case 'recent': {
        const layer = (searchParams.get('layer') ?? 'long_term') as MemoryLayer
        const limit = parseInt(searchParams.get('limit') ?? '20', 10)
        const memories = await memoryEngine.getRecentMemories(layer, limit)
        return NextResponse.json({ success: true, memories, layer, count: memories.length })
      }

      case 'conversations': {
        const limit = parseInt(searchParams.get('limit') ?? '20', 10)
        // direct DB access for list (with message count)
        const { db } = await import('@/lib/db')
        const conversations = await db.conversation.findMany({
          orderBy: { lastActiveAt: 'desc' },
          take: limit,
        })
        return NextResponse.json({
          success: true,
          conversations,
          count: conversations.length,
        })
      }

      case 'conversation': {
        const id = searchParams.get('id')
        if (!id) {
          return NextResponse.json(
            { success: false, error: 'id is required' },
            { status: 400 }
          )
        }
        const conv = await memoryEngine.getConversation(id)
        if (!conv) {
          return NextResponse.json(
            { success: false, error: 'conversation not found' },
            { status: 404 }
          )
        }
        const messages = await memoryEngine.getMessages(id, 100)
        return NextResponse.json({ success: true, conversation: conv, messages })
      }

      case 'semantic': {
        // all semantic facts (about محمد)
        const subject = searchParams.get('subject') ?? 'محمد'
        const { getFactsAbout } = await import('@/lib/memory/semantic')
        const facts = await getFactsAbout(subject, true)
        return NextResponse.json({ success: true, facts, subject, count: facts.length })
      }

      case 'episodic': {
        const limit = parseInt(searchParams.get('limit') ?? '20', 10)
        const { getTimeline } = await import('@/lib/memory/episodic')
        const events = await getTimeline(limit)
        return NextResponse.json({ success: true, events, count: events.length })
      }

      case 'long_term': {
        const limit = parseInt(searchParams.get('limit') ?? '20', 10)
        const { listRecent } = await import('@/lib/memory/long-term')
        const memories = await listRecent(limit)
        return NextResponse.json({ success: true, memories, count: memories.length })
      }

      default:
        return NextResponse.json(
          { success: false, error: `unknown action: ${action}` },
          { status: 400 }
        )
    }
  } catch (err) {
    console.error('[/api/memory] GET error:', err)
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'internal error',
        action,
      },
      { status: 500 }
    )
  }
}

// ============================================================
// POST — كتابة وعمليات
// ============================================================

export async function POST(req: NextRequest) {
  let body: any
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'invalid JSON body' },
      { status: 400 }
    )
  }

  const action = body.action as string
  if (!action) {
    return NextResponse.json(
      { success: false, error: 'action is required' },
      { status: 400 }
    )
  }

  try {
    switch (action) {
      // --- إدارة المحادثات ---

      case 'start_conversation': {
        const conv = await memoryEngine.startConversation(body.title)
        return NextResponse.json({ success: true, conversation: conv })
      }

      case 'add_message': {
        if (!body.conversationId || !body.role || !body.content) {
          return NextResponse.json(
            { success: false, error: 'conversationId, role, content are required' },
            { status: 400 }
          )
        }
        const msg = await memoryEngine.addMessage({
          conversationId: body.conversationId,
          role: body.role,
          content: body.content,
          thinking: body.thinking,
          toolCalls: body.toolCalls,
          toolCallId: body.toolCallId,
          tokens: body.tokens,
        })
        return NextResponse.json({ success: true, message: msg })
      }

      case 'end_conversation': {
        if (!body.conversationId) {
          return NextResponse.json(
            { success: false, error: 'conversationId is required' },
            { status: 400 }
          )
        }
        await memoryEngine.endConversation(body.conversationId)
        return NextResponse.json({
          success: true,
          message: 'conversation ended + memorized',
        })
      }

      // --- استخراج ذكريات ---

      case 'memorize': {
        if (!body.conversationId) {
          return NextResponse.json(
            { success: false, error: 'conversationId is required' },
            { status: 400 }
          )
        }
        // لو ما فيه messages، اجيبهم من الـ DB
        let messages = body.messages
        if (!messages?.length) {
          messages = await memoryEngine.getMessages(body.conversationId, 200)
        }
        const result = await memoryEngine.memorize({
          conversationId: body.conversationId,
          messages,
        })
        return NextResponse.json({ success: true, result })
      }

      // --- استدعاء سياق (للـ AI قبل الرد) ---

      case 'recall': {
        if (!body.conversationId) {
          return NextResponse.json(
            { success: false, error: 'conversationId is required' },
            { status: 400 }
          )
        }
        const context = await memoryEngine.recallRelevant({
          conversationId: body.conversationId,
          currentQuery: body.currentQuery ?? '',
          tokenBudget: body.tokenBudget,
          includeLayers: body.includeLayers,
        })
        return NextResponse.json({ success: true, context })
      }

      // --- بحث ---

      case 'search': {
        if (!body.query) {
          return NextResponse.json(
            { success: false, error: 'query is required' },
            { status: 400 }
          )
        }
        const results = await memoryEngine.search({
          query: body.query,
          layers: body.layers,
          limit: body.limit,
          minImportance: body.minImportance,
          tags: body.tags,
          subjects: body.subjects,
        })
        return NextResponse.json({ success: true, results, count: results.length })
      }

      // --- صيانة ---

      case 'consolidate': {
        const report = await memoryEngine.consolidate()
        return NextResponse.json({ success: true, report })
      }

      case 'decay': {
        const result = await memoryEngine.decay()
        return NextResponse.json({ success: true, decayed: result.updated })
      }

      case 'cleanup': {
        const { cleanupExpired } = await import('@/lib/memory/short-term')
        const { deleted } = await cleanupExpired()
        return NextResponse.json({ success: true, deleted })
      }

      // --- إدارة المحادثات (delete + rename) ---

      case 'delete_conversation': {
        if (!body.conversationId) {
          return NextResponse.json(
            { success: false, error: 'conversationId is required' },
            { status: 400 }
          )
        }
        try {
          const { db } = await import('@/lib/db');
          const convId = body.conversationId;
          // ⚠️ الترتيب مهم بسبب FK constraints:
          // 1) اضبط conversationId = null للـ Memory + SemanticFact (onDelete: SetNull)
          await db.memory.updateMany({
            where: { conversationId: convId },
            data: { conversationId: null },
          });
          await db.semanticFact.updateMany({
            where: { conversationId: convId },
            data: { conversationId: null },
          });
          // 2) احذف الـ Conversation (الـ messages بتتمسح تلقائياً بـ Cascade)
          await db.conversation.delete({
            where: { id: convId },
          });
          return NextResponse.json({ success: true, deleted: true })
        } catch (err) {
          console.error('[/api/memory] delete_conversation error:', err)
          return NextResponse.json(
            { success: false, error: 'فشل الحذف', detail: err instanceof Error ? err.message : String(err) },
            { status: 500 }
          )
        }
      }

      case 'rename_conversation': {
        if (!body.conversationId || !body.title) {
          return NextResponse.json(
            { success: false, error: 'conversationId + title required' },
            { status: 400 }
          )
        }
        try {
          const { db } = await import('@/lib/db');
          const updated = await db.conversation.update({
            where: { id: body.conversationId },
            data: { title: body.title.slice(0, 100) },
          })
          return NextResponse.json({ success: true, conversation: updated })
        } catch (err) {
          console.error('[/api/memory] rename_conversation error:', err)
          return NextResponse.json(
            { success: false, error: 'فشل التعديل' },
            { status: 500 }
          )
        }
      }

      // --- إضافة يدوية (للـ testing / admin) ---

      case 'add_semantic_fact': {
        const { addFact } = await import('@/lib/memory/semantic')
        if (!body.subject || !body.predicate || !body.object) {
          return NextResponse.json(
            { success: false, error: 'subject, predicate, object are required' },
            { status: 400 }
          )
        }
        const fact = await addFact({
          subject: body.subject,
          predicate: body.predicate,
          object: body.object,
          confidence: body.confidence,
          conversationId: body.conversationId,
          tags: body.tags,
          source: 'manual',
        })
        return NextResponse.json({ success: true, fact })
      }

      case 'add_episodic_event': {
        const { addEpisodic } = await import('@/lib/memory/episodic')
        if (!body.title || !body.description) {
          return NextResponse.json(
            { success: false, error: 'title, description are required' },
            { status: 400 }
          )
        }
        const event = await addEpisodic({
          title: body.title,
          description: body.description,
          occurredAt: body.occurredAt ? new Date(body.occurredAt) : new Date(),
          endedAt: body.endedAt ? new Date(body.endedAt) : undefined,
          location: body.location,
          participants: body.participants,
          emotion: body.emotion,
          importance: body.importance,
          tags: body.tags,
          source: 'manual',
        })
        return NextResponse.json({ success: true, event })
      }

      case 'add_long_term': {
        const { addLongTerm } = await import('@/lib/memory/long-term')
        if (!body.content) {
          return NextResponse.json(
            { success: false, error: 'content is required' },
            { status: 400 }
          )
        }
        const mem = await addLongTerm({
          content: body.content,
          summary: body.summary,
          importance: body.importance,
          tags: body.tags,
          conversationId: body.conversationId,
          source: 'manual',
        })
        return NextResponse.json({ success: true, memory: mem })
      }

      case 'seed_demo': {
        // يضيف بيانات تجريبية للاختبار السريع
        return await seedDemoMemories()
      }

      default:
        return NextResponse.json(
          { success: false, error: `unknown action: ${action}` },
          { status: 400 }
        )
    }
  } catch (err) {
    console.error('[/api/memory] POST error:', err)
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : 'internal error',
        action,
        stack: process.env.NODE_ENV === 'development' && err instanceof Error ? err.stack : undefined,
      },
      { status: 500 }
    )
  }
}

// ============================================================
// Helper: بيانات تجريبية للاختبار السريع
// ============================================================

async function seedDemoMemories() {
  const results: string[] = []

  // 1) محادثة جديدة
  const conv = await memoryEngine.startConversation('محادثة تجريبية - تعارف')

  // 2) رسائل المحادثة
  await memoryEngine.addMessage({
    conversationId: conv.id,
    role: 'user',
    content: 'أهلاً، أنا محمد. أدرس هندسة الأتمتة الصناعية في جامعة بوليتكنك فلسطين.',
  })
  await memoryEngine.addMessage({
    conversationId: conv.id,
    role: 'assistant',
    content: 'أهلاً محمد! يسعدني التعرف عليك. هندسة الأتمتة مجال رائع. شو بتدرس بالتحديد؟',
  })
  await memoryEngine.addMessage({
    conversationId: conv.id,
    role: 'user',
    content: 'أشتغل على مشروع تخرج بـ PLC و SCADA. أحتاج Siemens S7-1200. التقدم 65٪.',
  })
  await memoryEngine.addMessage({
    conversationId: conv.id,
    role: 'assistant',
    content: 'ممتاز! مشروع تخرج بـ PLC و SCADA يتطلب تخطيط دقيق. Siemens S7-1200 خيار قوي. كيف يمكنني مساعدتك؟',
  })
  await memoryEngine.addMessage({
    conversationId: conv.id,
    role: 'user',
    content: 'أحب Arduino كمان. عندي كذا مشروع صغير فيه. أسكن في فلسطين، مدينة الخليل.',
  })
  results.push(`محادثة تجريبية: ${conv.id} بـ 5 رسائل`)

  // 3) شغّل auto-memorizer
  const memorizeResult = await memoryEngine.memorize({
    conversationId: conv.id,
    messages: await memoryEngine.getMessages(conv.id, 100),
  })
  results.push(`استخرج ${memorizeResult.stored.length} ذاكرة تلقائياً`)

  // 4) أحداث تجريبية
  const { addEpisodic } = await import('@/lib/memory/episodic')
  await addEpisodic({
    title: 'بدء مشروع التخرج',
    description: 'محمد بدأ مشروع تخرجه بـ PLC و SCADA، يحتاج Siemens S7-1200',
    occurredAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    emotion: 'excited',
    importance: 0.8,
    tags: ['تخرج', 'PLC', 'SCADA'],
    source: 'manual',
  })
  results.push('حدث تجريبي: بدء مشروع التخرج')

  // 5) حقائق دلالية يدوية
  const { addFact } = await import('@/lib/memory/semantic')
  await addFact({
    subject: 'محمد',
    predicate: 'بعمر',
    object: '18 سنة',
    confidence: 1.0,
    source: 'manual',
  })
  await addFact({
    subject: 'محمد',
    predicate: 'بلد',
    object: 'فلسطين',
    confidence: 1.0,
    source: 'manual',
  })
  results.push('حقائق دلالية: العمر + البلد')

  // 6) long-term تجريبية
  const { addLongTerm } = await import('@/lib/memory/long-term')
  await addLongTerm({
    content: 'محمد طالب هندسة أتمتة صناعية، يعمل على مشروع تخرج بـ PLC و SCADA. يحتاج Siemens S7-1200. التقدم 65٪. يعيش في الخليل، فلسطين. عمره 18 سنة.',
    summary: 'نبذة عن محمد',
    importance: 0.95,
    tags: ['نبذة', 'محمد'],
    source: 'manual',
  })
  results.push('ذاكرة long-term: نبذة عن محمد')

  return NextResponse.json({
    success: true,
    message: 'تم إضافة بيانات تجريبية',
    results,
    conversationId: conv.id,
    memorized: memorizeResult.stored.length,
  })
}

```


---

## 📄 `src/app/api/context/assemble/route.ts` (93 سطر)

```typescript
// ============================================
// /api/context/assemble — تجميع سياق ذكي للسؤال
// ============================================
// POST { query, conversationId?, conversationHistory?, totalBudget?, toolResults?, attachments? }
// GET ?q=<query> — تجربة سريعة بـ query واحد
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { assembleContextV2, invalidateContextCache, getContextCacheStats, routeQueryOnly } from '@/lib/context';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'جسم غير صالح' }, { status: 400 });
  }

  const query = typeof body.query === 'string' ? body.query.trim() : '';
  if (!query) {
    return NextResponse.json({ error: 'query مطلوب' }, { status: 400 });
  }

  try {
    const result = await assembleContextV2({
      conversationId: body.conversationId,
      currentQuery: query,
      conversationHistory: body.conversationHistory ?? [],
      totalBudget: body.totalBudget ?? 4000,
      toolResults: body.toolResults ?? [],
      attachments: body.attachments ?? [],
      useCache: body.useCache !== false,
    });

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (e) {
    console.error('[/api/context/assemble Error]', e);
    return NextResponse.json(
      { error: 'فشل تجميع السياق', detail: e instanceof Error ? e.message : String(e) },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const action = searchParams.get('action') ?? 'route';

  try {
    if (action === 'route') {
      const q = searchParams.get('q') ?? '';
      const result = routeQueryOnly(q);
      return NextResponse.json({ success: true, query: q, ...result });
    }

    if (action === 'cache_stats') {
      const stats = getContextCacheStats();
      return NextResponse.json({ success: true, ...stats });
    }

    if (action === 'invalidate') {
      invalidateContextCache();
      return NextResponse.json({ success: true, message: 'cache invalidated' });
    }

    return NextResponse.json({ error: `unknown action: ${action}` }, { status: 400 });
  } catch (e) {
    console.error('[/api/context/assemble GET Error]', e);
    return NextResponse.json(
      { error: 'فشل' },
      { status: 500 },
    );
  }
}

```


---

## 📄 `src/app/api/graph/route.ts` (131 سطر)

```typescript
// ============================================
// GET /api/graph — خريطة معرفة بصرية
// ============================================
// يرجع { nodes: [{id, label, type, section}], links: [{source, target, type}] }
// nodes من: projects, tasks, notes, ideas, certificates, knowledge, skills, decisions
// links: تلقائية بين الكيانات اللي تشترك بـ tags
// ============================================

import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { TYPE_COLORS, TYPE_LABELS } from '@/lib/constants';

interface GraphNode {
  id: string;
  label: string;
  type: string;
  section: string;
  color: string;
}

interface GraphLink {
  source: string;
  target: string;
  type: string;
}

function parseTags(val: unknown): string[] {
  if (Array.isArray(val)) return val.filter((x): x is string => typeof x === 'string');
  if (typeof val === 'string') {
    try {
      const p = JSON.parse(val);
      if (Array.isArray(p)) return parseTags(p);
    } catch { /* ignore */ }
  }
  return [];
}

function getColor(type: string): string {
  const c = TYPE_COLORS[type];
  if (!c) return 'bg-muted text-muted-foreground';
  return c.split(' ')[0]?.replace('text-', '') || 'emerald';
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // اجمع كل الكيانات كـ nodes
    const [projects, tasks, notes, ideas, certificates, knowledge, skills, decisions] = await Promise.all([
      db.project.findMany({ take: 50 }).catch(() => []),
      db.task.findMany({ take: 50 }).catch(() => []),
      db.note.findMany({ take: 50 }).catch(() => []),
      db.idea.findMany({ take: 50 }).catch(() => []),
      db.certificate.findMany({ take: 50 }).catch(() => []),
      db.knowledgeEntry.findMany({ take: 50 }).catch(() => []),
      db.skill.findMany({ take: 50 }).catch(() => []),
      db.decision.findMany({ take: 50 }).catch(() => []),
    ]);

    // خريطة tag → [nodeIds] لبناء روابط تلقائية
    const tagMap = new Map<string, string[]>();

    function addNode(id: string, label: string, type: string, section: string, tags: string[]) {
      nodes.push({ id, label, type, section, color: getColor(type) });
      for (const tag of tags) {
        const normalized = tag.toLowerCase().trim();
        if (!normalized) continue;
        if (!tagMap.has(normalized)) tagMap.set(normalized, []);
        tagMap.get(normalized)!.push(id);
      }
    }

    for (const p of projects) addNode(`project:${p.id}`, p.title || 'مشروع', 'project', 'projects', parseTags(p.tags));
    for (const t of tasks) addNode(`task:${t.id}`, (t.text || 'مهمة').slice(0, 40), 'task', 'tasks', parseTags(t.tags));
    for (const n of notes) addNode(`note:${n.id}`, n.title || 'ملاحظة', 'note', 'notes', parseTags(n.tags));
    for (const i of ideas) addNode(`idea:${i.id}`, i.title || 'فكرة', 'idea', 'ideas', parseTags(i.tags));
    for (const c of certificates) addNode(`certificate:${c.id}`, c.title || 'شهادة', 'certificate', 'certificates', parseTags(c.skills));
    for (const k of knowledge) addNode(`knowledge:${k.id}`, k.topic || 'معرفة', 'knowledge', 'knowledge', parseTags(k.tags));
    for (const s of skills) addNode(`skill:${s.id}`, s.name || 'مهارة', 'skill', 'skills', parseTags(s.tags));
    for (const d of decisions) addNode(`decision:${d.id}`, d.title || 'قرار', 'decision', 'decision-log', parseTags(d.tags));

    // بناء روابط تلقائية بين الكيانات اللي تشترك بـ نفس tag
    for (const [tag, nodeIds] of tagMap.entries()) {
      if (nodeIds.length < 2) continue; // لا رابط لعنصر واحد
      // اربط كل زوج (نحدد max 5 روابط لكل tag لتجنب الازدحام)
      let count = 0;
      for (let i = 0; i < nodeIds.length && count < 5; i++) {
        for (let j = i + 1; j < nodeIds.length && count < 5; j++) {
          links.push({ source: nodeIds[i], target: nodeIds[j], type: `shared:${tag}` });
          count++;
        }
      }
    }

    return NextResponse.json({
      success: true,
      nodes,
      links,
      stats: {
        totalNodes: nodes.length,
        totalLinks: links.length,
        byType: nodes.reduce((acc, n) => { acc[n.type] = (acc[n.type] || 0) + 1; return acc; }, {} as Record<string, number>),
      },
      // ⭐ Phase 3.2: Knowledge Graph الجديد (لو فيه entities بـ DB)
      knowledgeGraph: await getKnowledgeGraphStats().catch(() => null),
    });
  } catch (e) {
    console.error('[/api/graph Error]', e);
    return NextResponse.json({ error: 'فشل جلب الخريطة' }, { status: 500 });
  }
}

// جيب إحصائيات Knowledge Graph الجديد (لو موجود)
async function getKnowledgeGraphStats() {
  try {
    const { getGraphStats } = await import('@/lib/knowledge-graph');
    return await getGraphStats();
  } catch {
    return null;
  }
}

```


---

## 📄 `src/app/api/graph/rebuild/route.ts` (36 سطر)

```typescript
// ============================================
// /api/graph/rebuild — إعادة بناء Knowledge Graph كامل من DB
// ============================================
// POST: يستخرج كل الكيانات + العلاقات من DB + Memory Engine
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { autoBuildGraph, getGraphStats } from '@/lib/knowledge-graph';

export async function POST(_req: NextRequest) {
  // auth
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  try {
    const result = await autoBuildGraph();
    const stats = await getGraphStats();
    return NextResponse.json({
      success: true,
      ...result,
      stats,
    });
  } catch (e) {
    console.error('[/api/graph/rebuild Error]', e);
    return NextResponse.json(
      { error: 'فشل بناء الـ graph' },
      { status: 500 }
    );
  }
}

```


---

## 📄 `src/app/api/graph/expand/route.ts` (48 سطر)

```typescript
// ============================================
// /api/graph/expand — جيب جيران كيان (neighbors + relations)
// ============================================
// GET ?id=<entityId>&limit=20
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { getNeighbors, getEntity } from '@/lib/knowledge-graph';

export async function GET(req: NextRequest) {
  // auth
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'id is required' }, { status: 400 });
  }
  const limit = parseInt(searchParams.get('limit') ?? '20', 10);

  try {
    const entity = await getEntity(id);
    if (!entity) {
      return NextResponse.json({ error: 'الكيان غير موجود' }, { status: 404 });
    }

    const neighbors = await getNeighbors(id, limit);
    return NextResponse.json({
      success: true,
      entity,
      neighbors,
      count: neighbors.length,
    });
  } catch (e) {
    console.error('[/api/graph/expand Error]', e);
    return NextResponse.json(
      { error: 'فشل جلب الجيران' },
      { status: 500 }
    );
  }
}

```


---

## 📄 `src/app/api/graph/stats/route.ts` (28 سطر)

```typescript
// ============================================
// /api/graph/stats — إحصائيات Knowledge Graph
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { getGraphStats } from '@/lib/knowledge-graph';

export async function GET(_req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) {
    return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  }

  try {
    const stats = await getGraphStats();
    return NextResponse.json({ success: true, ...stats });
  } catch (e) {
    console.error('[/api/graph/stats Error]', e);
    return NextResponse.json(
      { error: 'فشل جلب الإحصائيات' },
      { status: 500 }
    );
  }
}

```


---

## 📄 `src/components/ai/mimo-ai-panel.tsx` (1358 سطر)

```typescript
'use client';

// ============================================
// MimoAIPanel — Floating AI Panel (محسن + متوافق مع الموقع)
// ============================================
// مبني على تصميم محمد + متوافق مع:
// - .cursorrules (ألوان emerald/teal/amber/orange/purple/pink — لا blue/indigo/sky)
// - dark/light mode (bg-card بدل bg-neutral-950)
// - rose بدل red
// - Context Engine بـ /api/context/assemble
// - Memory Engine بـ /api/memory
// - AI Core بـ /api/ai-core (SSE)
// ============================================

import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageSquare, X, Maximize2, Minimize2, Send, Mic, MicOff,
  Brain, Database, Network, ChevronDown, Copy, Check,
  Sparkles, Loader2, Square, Clock, Zap, Target, Eye,
  BarChart3, BookOpen, History, ChevronLeft, Wrench, Trash2, Edit2,
} from 'lucide-react';
import { MarkdownRenderer } from './markdown-renderer';

// Lazy load AI tool sections
const UniversalCaptureSection = lazy(() => import('@/components/sections/universal-capture').then(m => ({ default: m.UniversalCaptureSection })));
const VisionDiscoverySection = lazy(() => import('@/components/sections/vision-discovery').then(m => ({ default: m.VisionDiscoverySection })));
const AIReportsSection = lazy(() => import('@/components/sections/ai-reports').then(m => ({ default: m.AIReportsSection })));
const PriorityEngineSection = lazy(() => import('@/components/sections/priority-engine').then(m => ({ default: m.PriorityEngineSection })));
const UnifiedKnowledgeSection = lazy(() => import('@/components/sections/unified-knowledge').then(m => ({ default: m.UnifiedKnowledgeSection })));
const AnalyticsSection = lazy(() => import('@/components/sections/analytics').then(m => ({ default: m.AnalyticsSection })));
const TimelineSection = lazy(() => import('@/components/sections/timeline').then(m => ({ default: m.TimelineSection })));

// ═══════════════════════════════════════════════
// Types
// ═══════════════════════════════════════════════

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  steps?: ReActStep[];
  isStreaming?: boolean;
  provider?: string;
  toolsUsed?: string[];
  conversationId?: string;
}

interface ReActStep {
  thought: string;
  action?: string;
  actionInput?: string;
  observation?: string;
  duration?: number;
}

interface ContextItem {
  source: string;
  content: string;
  relevance: number;
  tokens: number;
  priority?: string;
}

type Tab = 'chat' | 'context' | 'history' | 'tools';

// ⭐ AI tools list (الأقسام اللي اتمسحت من السايدبار)
const AI_TOOLS = [
  { id: 'universal-capture', label: 'التقاط ذكي', icon: Sparkles, desc: 'التقاط سريع + AI يصنف تلقائياً' },
  { id: 'vision-discovery', label: 'اكتشاف الرؤية', icon: Eye, desc: 'اكتب تفكير → AI يستخرج رؤيتك' },
  { id: 'ai-reports', label: 'تقارير الأداء', icon: BarChart3, desc: 'تقارير 5 أبعاد + توصيات' },
  { id: 'priority-engine', label: 'محرك الأولويات', icon: Target, desc: 'ICE scoring + DRIP matrix' },
  { id: 'unified-knowledge', label: 'المعرفة + Graph', icon: BookOpen, desc: 'Knowledge entries + Wiki + Graph' },
  { id: 'analytics', label: 'الإحصائيات', icon: BarChart3, desc: 'إحصائيات شاملة + رسوم بيانية' },
  { id: 'timeline', label: 'النشاط وذاكرة الأيام', icon: History, desc: 'شريط زمني + heatmap' },
] as const;

type ToolId = typeof AI_TOOLS[number]['id'];

// ═══════════════════════════════════════════════
// MimoAIPanel — المكون الرئيسي
// ═══════════════════════════════════════════════

export function MimoAIPanel() {
  // ── State ──
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [panelWidth, setPanelWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 450;
    const saved = parseInt(localStorage.getItem('mimo-panel-width') || '450');
    return isNaN(saved) ? 450 : saved;
  });
  const [contextItems, setContextItems] = useState<ContextItem[]>([]);
  const [totalTokens, setTotalTokens] = useState(0);
  const [tokenBudget, setTokenBudget] = useState(4000);
  const [conversations, setConversations] = useState<any[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSteps, setShowSteps] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolId | null>(null);
  const [editingConvId, setEditingConvId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const resizeRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const recognitionRef = useRef<any>(null);

  // ── Keyboard Shortcuts ──
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ctrl+Shift+A: toggle panel
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      // Esc: close
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      // Tab switching: Ctrl+1/2/3/4 (only when panel is open)
      if ((e.ctrlKey || e.metaKey) && isOpen && !e.shiftKey) {
        if (e.key === '1') { e.preventDefault(); setActiveTab('chat'); }
        if (e.key === '2') { e.preventDefault(); setActiveTab('context'); }
        if (e.key === '3') { e.preventDefault(); setActiveTab('history'); }
        if (e.key === '4') { e.preventDefault(); setActiveTab('tools'); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen]);

  // ── Custom events from page.tsx (sidebar button + Ctrl+Shift+A) ──
  useEffect(() => {
    const openHandler = () => setIsOpen(true);
    const toggleHandler = () => setIsOpen(prev => !prev);
    window.addEventListener('mimo-ai-open', openHandler as EventListener);
    window.addEventListener('mimo-ai-toggle', toggleHandler as EventListener);
    return () => {
      window.removeEventListener('mimo-ai-open', openHandler as EventListener);
      window.removeEventListener('mimo-ai-toggle', toggleHandler as EventListener);
    };
  }, []);

  // ── Auto-scroll ──
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages]);

  // ── Auto-resize textarea ──
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  // ── Load conversations on open ──
  useEffect(() => {
    if (isOpen) loadConversations();
  }, [isOpen]);

  // ── Voice input setup ──
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SR) {
      const rec = new SR();
      rec.lang = 'ar-SA';
      rec.continuous = false;
      rec.interimResults = true;
      rec.onresult = (event: any) => {
        let transcript = '';
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setInput(transcript);
      };
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);
      recognitionRef.current = rec;
    }
  }, []);

  const loadConversations = useCallback(async () => {
    try {
      const res = await fetch('/api/memory?action=conversations&limit=20', {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) setConversations(data.conversations || []);
    } catch {}
  }, []);

  // ⭐ Load messages from an old conversation (when user clicks one)
  const loadConversationMessages = useCallback(async (convId: string) => {
    try {
      console.log('[MimoAI] Loading conversation:', convId);
      const res = await fetch(`/api/memory?action=conversation&id=${convId}`, {
        credentials: 'include'
      });
      const data = await res.json();
      console.log('[MimoAI] API response:', { success: data.success, msgCount: data.messages?.length });
      if (data.success && data.messages) {
        // Map API messages to local Message format
        const loadedMessages: Message[] = data.messages.map((m: any) => ({
          id: m.id,
          role: m.role,
          content: m.content,
          timestamp: new Date(m.createdAt),
          steps: m.thinking ? [{ thought: m.thinking }] : [],
        }));
        console.log('[MimoAI] Loaded messages:', loadedMessages.length);
        setMessages(loadedMessages);
        setConversationId(convId);
        setActiveTab('chat');
      } else {
        console.warn('[MimoAI] No messages in response:', data);
      }
    } catch (e) {
      console.error('[MimoAI] loadConversationMessages failed:', e);
    }
  }, []);

  // ⭐ Delete a conversation (يحذف من DB فعلياً)
  const deleteConversation = useCallback(async (e: React.MouseEvent, convId: string) => {
    e.stopPropagation();
    // Remove from local list immediately (optimistic)
    setConversations(prev => prev.filter(c => c.id !== convId));
    // If it was the active conversation, clear it
    if (conversationId === convId) {
      setMessages([]);
      setConversationId(null);
    }
    // ⭐ احذف من DB فعلياً
    try {
      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'delete_conversation',
          conversationId: convId,
        }),
      });
      console.log('[MimoAI] Conversation deleted:', convId);
    } catch (e) {
      console.error('[MimoAI] delete failed:', e);
      // لو فشل، ارجع المحادثة للقائمة
      loadConversations();
    }
  }, [conversationId, loadConversations]);

  // ⭐ Rename a conversation
  const renameConversation = useCallback(async (convId: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    // optimistic
    setConversations(prev => prev.map(c =>
      c.id === convId ? { ...c, title: newTitle } : c
    ));
    try {
      await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          action: 'rename_conversation',
          conversationId: convId,
          title: newTitle.trim(),
        }),
      });
      console.log('[MimoAI] Conversation renamed:', convId, '→', newTitle);
    } catch (e) {
      console.error('[MimoAI] rename failed:', e);
      loadConversations();
    }
  }, [loadConversations]);

  // ⭐ Auto-refresh conversations list after sending a message (when new conversation is created)
  const refreshConversations = useCallback(() => {
    loadConversations();
  }, [loadConversations]);

  // ── Panel Resize ──
  const startResize = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = panelRef.current?.offsetWidth || 450;

    const onMouseMove = (e: MouseEvent) => {
      const diff = startX - e.clientX; // RTL: drag left = wider
      const newWidth = Math.max(320, Math.min(720, startWidth + diff));
      setPanelWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      try {
        localStorage.setItem('mimo-panel-width', String(panelRef.current?.offsetWidth || 450));
      } catch {}
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
  }, []);

  // ── Fetch Context Preview (Context Engine) ──
  const fetchContext = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 3) return;
    try {
      const res = await fetch('/api/context/assemble', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          query,
          conversationId,
          totalBudget: 4000,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setContextItems(data.items || []);
        setTotalTokens(data.totalTokens || 0);
        setTokenBudget(data.budget || 4000);
      }
    } catch {}
  }, [conversationId]);

  // ── Debounced context fetch on input ──
  useEffect(() => {
    const t = setTimeout(() => {
      if (input.trim().length > 3) {
        fetchContext(input);
      }
    }, 800);
    return () => clearTimeout(t);
  }, [input, fetchContext]);

  // ── Send Message (Streaming) ──
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userContent = input.trim();
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: userContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setError(null);

    const assistantMsgId = `ai-${Date.now()}`;
    const assistantMsg: Message = {
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      steps: [],
      isStreaming: true,
    };

    setMessages(prev => [...prev, assistantMsg]);

    try {
      abortRef.current = new AbortController();

      const res = await fetch('/api/ai-core', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'text/event-stream',
        },
        credentials: 'include',
        body: JSON.stringify({
          message: userContent,
          stream: true,
          sessionId: conversationId,
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6).trim();
            if (!data) continue;

            try {
              const ev = JSON.parse(data);

              // Handle SSE event types (matching /api/ai-core)
              if (ev.type === 'thought' || ev.step === 'thought') {
                const content = ev.content || '';
                setMessages(prev => prev.map(m =>
                  m.id === assistantMsgId
                    ? { ...m, steps: [...(m.steps || []), { thought: content }] }
                    : m
                ));
              } else if (ev.type === 'action' || ev.step === 'action' || ev.type === 'tool_call') {
                const content = ev.content || '';
                const toolName = ev.toolName || ev.name;
                setMessages(prev => prev.map(m =>
                  m.id === assistantMsgId
                    ? { ...m, steps: [...(m.steps || []), {
                        thought: '',
                        action: toolName,
                        actionInput: ev.args ? JSON.stringify(ev.args) : content,
                      }] }
                    : m
                ));
              } else if (ev.type === 'observation' || ev.step === 'observation') {
                const content = ev.content || (typeof ev.result === 'string' ? ev.result : JSON.stringify(ev.result || ''));
                setMessages(prev => prev.map(m =>
                  m.id === assistantMsgId
                    ? { ...m, steps: [...(m.steps || []), { thought: '', observation: content.slice(0, 500) }] }
                    : m
                ));
              } else if (ev.type === 'token' || ev.type === 'answer') {
                const content = ev.content || '';
                setMessages(prev => prev.map(m =>
                  m.id === assistantMsgId
                    ? { ...m, content: m.content + content }
                    : m
                ));
              } else if (ev.type === 'final_answer') {
                setMessages(prev => prev.map(m =>
                  m.id === assistantMsgId
                    ? { ...m, content: ev.content || m.content }
                    : m
                ));
              } else if (ev.type === 'metadata') {
                if (ev.conversationId) {
                  setConversationId(ev.conversationId);
                  setMessages(prev => prev.map(m =>
                    m.id === assistantMsgId
                      ? { ...m, conversationId: ev.conversationId, provider: ev.provider, toolsUsed: ev.toolsUsed }
                      : m
                  ));
                }
              } else if (ev.type === 'error') {
                setError(ev.message || 'خطأ');
              }
            } catch {}
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        setMessages(prev => prev.map(m =>
          m.id === assistantMsgId ? { ...m, content: m.content || 'تم الإيقاف', isStreaming: false } : m
        ));
      } else {
        setError(err.message);
        setMessages(prev => prev.map(m =>
          m.id === assistantMsgId ? {
            ...m,
            content: `عذراً، حدث خطأ: ${err.message}. تأكد من تشغيل السيرفر + GROQ_API_KEY.`,
            isStreaming: false
          } : m
        ));
      }
    } finally {
      setMessages(prev => prev.map(m =>
        m.id === assistantMsgId ? { ...m, isStreaming: false } : m
      ));
      setIsLoading(false);
      abortRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 100);
      // ⭐ Refresh conversations list (in case a new conversation was created)
      setTimeout(() => refreshConversations(), 500);
    }
  }, [input, isLoading, conversationId, refreshConversations]);

  // ── Stop Generation ──
  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
  }, []);

  // ── Voice Input ──
  const toggleVoice = useCallback(() => {
    if (!recognitionRef.current) {
      alert('المتصفح لا يدعم التعرف على الصوت');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInput('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, [isListening]);

  // ── Copy Message ──
  const copyMessage = useCallback((id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  // ── New Conversation ──
  const newConversation = useCallback(() => {
    setMessages([]);
    setContextItems([]);
    setTotalTokens(0);
    setShowSteps(null);
    setConversationId(null);
    setError(null);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // ── Suggestion Cards ──
  const suggestions = [
    { icon: '📋', text: 'شو مهامي اليوم؟', color: 'from-emerald-500/20 to-teal-500/20' },
    { icon: '💰', text: 'كم مصروفاتي هذا الشهر؟', color: 'from-amber-500/20 to-orange-500/20' },
    { icon: '📊', text: 'حلل تقدمي بالدراسة', color: 'from-teal-500/20 to-emerald-500/20' },
    { icon: '🧠', text: 'شو آخر شي تعلمناه؟', color: 'from-purple-500/20 to-pink-500/20' },
  ];

  const budgetPct = tokenBudget > 0 ? Math.min(100, (totalTokens / tokenBudget) * 100) : 0;
  const savings = tokenBudget > 0 ? Math.round((1 - totalTokens / tokenBudget) * 100) : 0;

  // ═══════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════

  return (
    <>
      {/* ── FAB (Floating Action Button) ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-2xl
                       bg-gradient-to-br from-emerald-500 to-teal-600
                       shadow-lg shadow-emerald-500/30
                       flex items-center justify-center text-white
                       hover:shadow-xl hover:shadow-emerald-500/40
                       transition-shadow duration-300"
            title="ميمو AI (Ctrl+Shift+A)"
          >
            <Sparkles className="w-6 h-6" />
            {/* Pulse Ring */}
            <span className="absolute inset-0 rounded-2xl animate-ping bg-emerald-400/20" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Overlay ── */}
      <AnimatePresence>
        {isOpen && !isMaximized && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* ── AI Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-[9999] bg-card/95 dark:bg-neutral-950/95 backdrop-blur-xl
                        border-l border-border shadow-2xl shadow-black/50
                        flex flex-col overflow-hidden
                        ${isMaximized
                          ? 'inset-0'
                          : 'top-0 bottom-0 right-0'
                        }`}
            style={!isMaximized ? { width: panelWidth } : undefined}
            dir="rtl"
          >
            {/* ── Resize Handle ── */}
            {!isMaximized && (
              <div
                ref={resizeRef}
                onMouseDown={startResize}
                className="absolute left-0 top-0 bottom-0 w-1.5 cursor-col-resize
                           hover:bg-emerald-500/50 transition-colors z-10 group"
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-12 bg-border group-hover:bg-emerald-500 rounded-full transition-colors" />
              </div>
            )}

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3
                            border-b border-border bg-muted/30 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600
                                  flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  {isLoading && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-card animate-pulse" />
                  )}
                </div>
                <div>
                  <h2 className="text-sm font-bold text-foreground">
                    ميمو AI
                  </h2>
                  <p className="text-[10px] text-emerald-600 dark:text-emerald-400">
                    ReAct Engine · 4 طبقات ذاكرة · KG
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={newConversation}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground
                             hover:text-foreground transition-colors"
                  title="محادثة جديدة"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsMaximized(prev => !prev)}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground
                             hover:text-foreground transition-colors"
                  title={isMaximized ? 'تصغير' : 'تكبير'}
                >
                  {isMaximized
                    ? <Minimize2 className="w-4 h-4" />
                    : <Maximize2 className="w-4 h-4" />
                  }
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-rose-500/10 text-muted-foreground
                             hover:text-rose-500 transition-colors"
                  title="إغلاق (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* ── Tabs ── */}
            <div className="flex border-b border-border bg-muted/20">
              {([
                { key: 'chat' as Tab, label: 'محادثة', icon: MessageSquare },
                { key: 'context' as Tab, label: 'السياق', icon: Database, badge: contextItems.length },
                { key: 'history' as Tab, label: 'المحادثات', icon: Clock },
                { key: 'tools' as Tab, label: 'أدوات', icon: Wrench },
              ]).map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5
                             text-xs font-medium transition-all relative
                             ${activeTab === tab.key
                               ? 'text-emerald-600 dark:text-emerald-400 border-b-2 border-emerald-500 bg-emerald-500/5'
                               : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                             }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="px-1 py-0 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* ── Content ── */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {/* Chat Tab */}
                {activeTab === 'chat' && (
                  <motion.div
                    key="chat"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex flex-col h-full"
                  >
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                      {messages.length === 0 ? (
                        /* Empty State */
                        <div className="flex flex-col items-center justify-center h-full text-center px-6">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20
                                       flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10"
                          >
                            <Sparkles className="w-8 h-8 text-emerald-500" />
                          </motion.div>
                          <h3 className="text-lg font-bold text-foreground mb-2">
                            أهلاً محمد 👋
                          </h3>
                          <p className="text-sm text-muted-foreground mb-6 max-w-[280px]">
                            أنا ميمو، مساعدك الذكي. عندي ذاكرة 4 طبقات + خريطة معرفة + محرك تفكير ReAct.
                          </p>

                          {/* Feature Badges */}
                          <div className="flex flex-wrap justify-center gap-2 mb-6">
                            {[
                              { icon: Brain, label: 'ReAct Engine', color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' },
                              { icon: Database, label: '4 طبقات ذاكرة', color: 'text-teal-600 dark:text-teal-400 bg-teal-500/10' },
                              { icon: Network, label: 'Knowledge Graph', color: 'text-purple-600 dark:text-purple-400 bg-purple-500/10' },
                            ].map(badge => (
                              <span key={badge.label}
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                               text-[10px] font-medium ${badge.color}`}>
                                <badge.icon className="w-3 h-3" />
                                {badge.label}
                              </span>
                            ))}
                          </div>

                          {/* Suggestion Cards */}
                          <div className="grid grid-cols-2 gap-2 w-full max-w-[320px]">
                            {suggestions.map((s, i) => (
                              <motion.button
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + i * 0.05 }}
                                onClick={() => { setInput(s.text); setActiveTab('chat'); }}
                                className={`p-3 rounded-xl bg-gradient-to-br ${s.color}
                                           border border-border hover:border-emerald-500/30
                                           text-right transition-all hover:scale-[1.02]
                                           hover:shadow-lg group`}
                              >
                                <span className="text-lg mb-1 block">{s.icon}</span>
                                <span className="text-[11px] text-muted-foreground group-hover:text-foreground
                                               transition-colors">
                                  {s.text}
                                </span>
                              </motion.button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Messages List */
                        messages.map(msg => (
                          <motion.div
                            key={msg.id}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}
                          >
                            <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                              {/* Message Bubble */}
                              <div
                                className={`rounded-2xl px-4 py-3 text-sm leading-relaxed
                                           whitespace-pre-wrap break-words
                                           ${msg.role === 'user'
                                             ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-br-md shadow-lg shadow-emerald-500/20'
                                             : 'bg-muted text-foreground rounded-bl-md border border-border'
                                           }`}
                              >
                                {msg.content ? (
                                  // ⭐ Markdown rendering for AI messages, plain text for user
                                  msg.role === 'assistant' ? (
                                    <MarkdownRenderer content={msg.content} />
                                  ) : (
                                    <span className="whitespace-pre-wrap">{msg.content}</span>
                                  )
                                ) : msg.isStreaming ? (
                                  <span className="inline-flex items-center gap-1 text-muted-foreground">
                                    <Loader2 className="w-3 h-3 animate-spin" />
                                    يفكر...
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground italic">(فارغ)</span>
                                )}
                                {msg.isStreaming && msg.content && (
                                  <span className="inline-block w-2 h-4 bg-emerald-500 ml-1 animate-pulse align-middle" />
                                )}
                              </div>

                              {/* Actions */}
                              <div className={`flex items-center gap-2 mt-1 px-1
                                              ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                                <span className="text-[10px] text-muted-foreground">
                                  {msg.timestamp.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                                </span>

                                {msg.role === 'assistant' && (
                                  <>
                                    <button
                                      onClick={() => copyMessage(msg.id, msg.content)}
                                      className="p-1 rounded hover:bg-muted text-muted-foreground
                                                 hover:text-foreground transition-colors"
                                      title="نسخ"
                                    >
                                      {copiedId === msg.id
                                        ? <Check className="w-3 h-3 text-emerald-500" />
                                        : <Copy className="w-3 h-3" />
                                      }
                                    </button>

                                    {msg.steps && msg.steps.length > 0 && (
                                      <button
                                        onClick={() => setShowSteps(showSteps === msg.id ? null : msg.id)}
                                        className="flex items-center gap-1 px-2 py-0.5 rounded-full
                                                   text-[10px] text-amber-600 dark:text-amber-400 bg-amber-500/10
                                                   hover:bg-amber-500/20 transition-colors"
                                      >
                                        <Brain className="w-3 h-3" />
                                        {msg.steps.length} خطوات تفكير
                                        <ChevronDown className={`w-3 h-3 transition-transform
                                              ${showSteps === msg.id ? 'rotate-180' : ''}`} />
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>

                              {/* ReAct Steps */}
                              <AnimatePresence>
                                {showSteps === msg.id && msg.steps && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden mt-2"
                                  >
                                    <div className="bg-muted/50 rounded-xl border border-border p-3 space-y-2">
                                      <p className="text-[10px] text-amber-600 dark:text-amber-400 font-bold mb-2">
                                        خطوات التفكير:
                                      </p>
                                      {msg.steps.map((step, i) => (
                                        <div key={i} className="text-[11px] space-y-1">
                                          {step.thought && (
                                            <div className="flex items-start gap-2">
                                              <span className="text-teal-500 shrink-0">💭</span>
                                              <span className="text-foreground/80">{step.thought}</span>
                                            </div>
                                          )}
                                          {step.action && (
                                            <div className="flex items-start gap-2 mr-4">
                                              <span className="text-amber-500 shrink-0">🔧</span>
                                              <span className="text-amber-600 dark:text-amber-400 font-mono text-[10px]">
                                                {step.action}
                                                {step.actionInput && `(${step.actionInput.slice(0, 100)})`}
                                              </span>
                                            </div>
                                          )}
                                          {step.observation && (
                                            <div className="flex items-start gap-2 mr-4">
                                              <span className="text-emerald-500 shrink-0">👁️</span>
                                              <span className="text-muted-foreground text-[10px]">
                                                {step.observation.slice(0, 200)}
                                                {step.observation.length > 200 && '...'}
                                              </span>
                                            </div>
                                          )}
                                          {step.duration && (
                                            <span className="text-[9px] text-muted-foreground mr-6">
                                              ⏱️ {step.duration}ms
                                            </span>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.div>
                        ))
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Error */}
                    {error && (
                      <div className="px-4 py-2 bg-rose-50 dark:bg-rose-950/20 border-t border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-300">
                        {error}
                      </div>
                    )}

                    {/* Input Bar */}
                    <div className="px-4 py-3 border-t border-border bg-muted/20">
                      <div className="flex items-end gap-2">
                        {/* Voice Button */}
                        <button
                          onClick={toggleVoice}
                          className={`p-2.5 rounded-xl transition-all shrink-0
                                     ${isListening
                                       ? 'bg-rose-500/20 text-rose-500 animate-pulse'
                                       : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                                     }`}
                          title="تسجيل صوتي"
                        >
                          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                        </button>

                        {/* Textarea */}
                        <div className="flex-1 relative">
                          <textarea
                            ref={inputRef}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                              }
                            }}
                            placeholder={isListening ? '🎙️ يستمع...' : 'اسأل ميمو...'}
                            rows={1}
                            className="w-full bg-background border border-border rounded-xl
                                       px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground
                                       focus:outline-none focus:border-emerald-500/50 focus:ring-1
                                       focus:ring-emerald-500/20 resize-none
                                       transition-all"
                            disabled={isLoading}
                          />
                        </div>

                        {/* Send / Stop Button */}
                        {isLoading ? (
                          <button
                            onClick={stopGeneration}
                            className="p-2.5 rounded-xl bg-rose-500/20 text-rose-500
                                       hover:bg-rose-500/30 transition-colors shrink-0"
                            title="إيقاف"
                          >
                            <Square className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={sendMessage}
                            disabled={!input.trim()}
                            className="p-2.5 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600
                                       text-white hover:shadow-lg hover:shadow-emerald-500/20
                                       disabled:opacity-30 disabled:cursor-not-allowed
                                       transition-all shrink-0"
                            title="إرسال (Enter)"
                          >
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Context Tab */}
                {activeTab === 'context' && (
                  <motion.div
                    key="context"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex flex-col h-full overflow-y-auto px-4 py-4"
                  >
                    {/* Token Budget */}
                    <div className="bg-muted/50 rounded-xl p-4 mb-4 border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-muted-foreground">ميزانية Tokens</span>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
                          {totalTokens} / {tokenBudget}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all"
                          style={{ width: `${budgetPct}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        توفير: {savings}%
                      </p>
                    </div>

                    {/* Context Items */}
                    {contextItems.length > 0 ? (
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground font-bold mb-2">
                          عناصر السياق ({contextItems.length})
                        </p>
                        {contextItems.map((item, i) => (
                          <div key={i}
                               className="bg-muted/50 rounded-lg p-3 border border-border">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                                {item.source}
                              </span>
                              <span className="text-[10px] text-muted-foreground">
                                {item.tokens} tok
                              </span>
                            </div>
                            <p className="text-xs text-foreground/80 line-clamp-2">
                              {item.content}
                            </p>
                            <div className="mt-1 h-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500/50 rounded-full"
                                style={{ width: `${item.relevance * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-center">
                        <div>
                          <Database className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">
                            ابدأ محادثة لترى عناصر السياق
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                  <motion.div
                    key="history"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex flex-col h-full overflow-y-auto px-4 py-4"
                  >
                    {conversations.length > 0 ? (
                      <div className="space-y-2">
                        {/* Header with refresh + count */}
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs text-muted-foreground">
                            {conversations.length} محادثة
                          </p>
                          <button
                            onClick={() => loadConversations()}
                            className="text-[10px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                            title="تحديث"
                          >
                            <Sparkles className="w-3 h-3" />
                            تحديث
                          </button>
                        </div>
                        {conversations.map((conv: any, i: number) => {
                          const isActive = conv.id === conversationId;
                          return (
                            <div
                              key={conv.id || i}
                              role="button"
                              tabIndex={0}
                              onClick={() => loadConversationMessages(conv.id)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  loadConversationMessages(conv.id);
                                }
                              }}
                              className={`w-full text-right p-3 rounded-xl border transition-all group cursor-pointer relative
                                          ${isActive
                                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30'
                                            : 'bg-muted/50 border-border hover:border-emerald-500/30 hover:bg-muted'
                                          }`}
                            >
                              <div className="flex items-start justify-between gap-2">
                                {/* Inline rename or title */}
                                {editingConvId === conv.id ? (
                                  <input
                                    autoFocus
                                    defaultValue={conv.title || ''}
                                    onBlur={(e) => {
                                      const newTitle = e.target.value.trim();
                                      if (newTitle && newTitle !== conv.title) {
                                        renameConversation(conv.id, newTitle);
                                      }
                                      setEditingConvId(null);
                                    }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        e.currentTarget.blur();
                                      } else if (e.key === 'Escape') {
                                        setEditingConvId(null);
                                      }
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="flex-1 text-sm bg-background border border-emerald-500/50 rounded px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-emerald-500/30"
                                    placeholder="اسم المحادثة..."
                                  />
                                ) : (
                                  <p className={`text-sm line-clamp-1 flex-1 transition-colors cursor-text
                                                ${isActive
                                                  ? 'text-emerald-700 dark:text-emerald-300 font-medium'
                                                  : 'text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
                                                }`}
                                     onDoubleClick={(e) => {
                                       e.stopPropagation();
                                       setEditingConvId(conv.id);
                                     }}
                                  >
                                    {conv.title || '(بدون عنوان)'}
                                  </p>
                                )}
                                {/* Action buttons (hover) */}
                                <div className="flex items-center gap-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingConvId(conv.id);
                                    }}
                                    className="p-1 rounded text-muted-foreground hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                                    title="تعديل الاسم"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={(e) => deleteConversation(e, conv.id)}
                                    className="p-1 rounded text-muted-foreground hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                                    title="حذف"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                                <span>
                                  {conv.lastActiveAt
                                    ? new Date(conv.lastActiveAt).toLocaleDateString('ar-EG', {
                                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                      })
                                    : ''
                                  }
                                </span>
                                <span>·</span>
                                <span>{conv.messageCount || 0} رسالة</span>
                                {conv.endedAt && (
                                  <>
                                    <span>·</span>
                                    <span className="text-emerald-600 dark:text-emerald-400">مكتملة</span>
                                  </>
                                )}
                                {isActive && (
                                  <>
                                    <span>·</span>
                                    <span className="flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      نشطة
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-center">
                        <div>
                          <MessageSquare className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                          <p className="text-xs text-muted-foreground">
                            لا توجد محادثات سابقة
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Tools Tab */}
                {activeTab === 'tools' && (
                  <motion.div
                    key="tools"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 flex flex-col h-full overflow-hidden"
                  >
                    {activeTool ? (
                      // ⭐ Active tool — lazy load the section component
                      <div className="flex flex-col h-full">
                        {/* Tool header (back button) */}
                        <div className="flex items-center justify-between p-2 border-b border-border bg-muted/30 shrink-0">
                          <button
                            onClick={() => setActiveTool(null)}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5" />
                            رجوع للأدوات
                          </button>
                          <span className="text-xs font-medium text-foreground">
                            {AI_TOOLS.find(t => t.id === activeTool)?.label}
                          </span>
                          <button
                            onClick={() => setIsMaximized(prev => !prev)}
                            className="text-muted-foreground hover:text-foreground"
                            title={isMaximized ? 'تصغير' : 'تكبير'}
                          >
                            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        {/* Tool content */}
                        <div className="flex-1 overflow-y-auto bg-background">
                          <Suspense fallback={
                            <div className="flex items-center justify-center h-full">
                              <Loader2 className="w-6 h-6 animate-spin text-emerald-500" />
                            </div>
                          }>
                            {activeTool === 'universal-capture' && <UniversalCaptureSection />}
                            {activeTool === 'vision-discovery' && <VisionDiscoverySection />}
                            {activeTool === 'ai-reports' && <AIReportsSection />}
                            {activeTool === 'priority-engine' && <PriorityEngineSection />}
                            {activeTool === 'unified-knowledge' && <UnifiedKnowledgeSection />}
                            {activeTool === 'analytics' && <AnalyticsSection />}
                            {activeTool === 'timeline' && <TimelineSection />}
                          </Suspense>
                        </div>
                      </div>
                    ) : (
                      // ⭐ Tools grid
                      <div className="flex-1 overflow-y-auto px-4 py-4">
                        <p className="text-xs text-muted-foreground mb-3">
                          اختر أداة ذكاء اصطناعي:
                        </p>
                        <div className="grid grid-cols-1 gap-2">
                          {AI_TOOLS.map(tool => {
                            const Icon = tool.icon;
                            return (
                              <motion.button
                                key={tool.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: AI_TOOLS.indexOf(tool) * 0.05 }}
                                onClick={() => setActiveTool(tool.id)}
                                className="flex items-start gap-3 p-3 rounded-xl bg-muted/40
                                           border border-border hover:border-emerald-500/30
                                           hover:bg-muted transition-all text-right group"
                              >
                                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500/15 to-teal-500/15
                                                flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0
                                                group-hover:from-emerald-500/25 group-hover:to-teal-500/25 transition-all">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                    {tool.label}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2">
                                    {tool.desc}
                                  </p>
                                </div>
                                <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors mt-1 shrink-0" />
                              </motion.button>
                            );
                          })}
                        </div>

                        {/* Tip */}
                        <div className="mt-4 p-3 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-500/20">
                          <p className="text-[10px] text-emerald-700 dark:text-emerald-300 flex items-start gap-1.5">
                            <Sparkles className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>
                              كل أدوات الذكاء الاصطناعي دلوقتي جوا هاد الـ panel.
                              تقدر تفتح أي أداة + تشتغل بـ باقي الموقع من السايدبار.
                              لتكبير الأداة اضغط زر التكبير بـ الأعلى.
                            </span>
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Status Bar ── */}
            <div className="flex items-center justify-between px-4 py-1.5
                            border-t border-border bg-muted/20 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  متصل
                </span>
                <span className="flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5" />
                  {totalTokens}/{tokenBudget} tok
                </span>
                {contextItems.length > 0 && (
                  <span className="flex items-center gap-0.5">
                    <Database className="w-2.5 h-2.5" />
                    {contextItems.length} عنصر
                  </span>
                )}
                {conversationId && (
                  <span className="font-mono opacity-60">
                    ID: {conversationId.slice(-8)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-60">
                <span>Ctrl+1·2·3·4</span>
                <span>·</span>
                <span>Esc</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

```


---

## 📄 `src/components/ai/markdown-renderer.tsx` (162 سطر)

```typescript
'use client';

// ============================================
// Markdown Renderer — مع rendering ذكي للكود
// ============================================
// يستخدم react-markdown + remark-gfm + react-syntax-highlighter
// يدعم: code blocks, tables, lists, links, etc.
// ألوان emerald/teal/amber فقط (لا blue/indigo)
// ============================================

import { memo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface Props {
  content: string;
  className?: string;
}

export const MarkdownRenderer = memo(function MarkdownRenderer({ content, className }: Props) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div
      className={cn(
        'prose prose-sm dark:prose-invert max-w-none break-words',
        '[&_p]:my-1.5 [&_p]:leading-relaxed',
        '[&_ul]:my-1.5 [&_ul]:ps-4',
        '[&_ol]:my-1.5 [&_ol]:ps-4',
        '[&_li]:my-0.5',
        '[&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-3 [&_h1]:mb-1.5',
        '[&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-2.5 [&_h2]:mb-1',
        '[&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1',
        '[&_blockquote]:border-s-2 [&_blockquote]:border-emerald-500/40 [&_blockquote]:ps-3 [&_blockquote]:text-muted-foreground [&_blockquote]:my-2',
        '[&_a]:text-emerald-600 dark:[&_a]:text-emerald-400 [&_a]:underline [&_a]:underline-offset-2',
        '[&_strong]:font-semibold [&_strong]:text-foreground',
        '[&_table]:my-2 [&_table]:w-full [&_table]:border-collapse',
        '[&_th]:border [&_th]:border-border [&_th]:px-2 [&_th]:py-1 [&_th]:bg-muted/50 [&_th]:text-xs [&_th]:font-semibold',
        '[&_td]:border [&_td]:border-border [&_td]:px-2 [&_td]:py-1 [&_td]:text-xs',
        '[&_hr]:my-3 [&_hr]:border-border',
        '[&_code]:bg-muted [&_code]:text-emerald-700 dark:[&_code]:text-emerald-300 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[0.85em] [&_code]:font-mono',
        className
      )}
      dir="auto"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code blocks (multi-line)
          code({ inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const code = String(children).replace(/\n$/, '');
            const codeId = `code-${code.slice(0, 20).replace(/\s/g, '')}-${code.length}`;

            // Inline code (single line, no language)
            if (inline || !match) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            // Multi-line code block
            return (
              <div className="relative my-2 rounded-lg overflow-hidden border border-border bg-muted/30">
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted/60 border-b border-border">
                  <span className="text-[10px] font-mono text-muted-foreground uppercase">
                    {match[1]}
                  </span>
                  <button
                    onClick={() => handleCopy(code, codeId)}
                    className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    title="نسخ الكود"
                  >
                    {copiedCode === codeId ? (
                      <>
                        <Check className="w-2.5 h-2.5 text-emerald-500" />
                        <span className="text-emerald-600 dark:text-emerald-400">تم</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-2.5 h-2.5" />
                        نسخ
                      </>
                    )}
                  </button>
                </div>
                {/* Code */}
                <SyntaxHighlighter
                  language={match[1]}
                  style={isDark ? oneDark : oneLight}
                  customStyle={{
                    margin: 0,
                    padding: '0.75rem 1rem',
                    fontSize: '0.8rem',
                    background: 'transparent',
                  }}
                  wrapLongLines
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            );
          },
          // Links — open in new tab
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-700 dark:hover:text-emerald-300"
              >
                {children}
              </a>
            );
          },
          // Lists
          ul({ children }) {
            return <ul className="list-disc list-inside my-1.5 space-y-0.5">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal list-inside my-1.5 space-y-0.5">{children}</ol>;
          },
          // Blockquote
          blockquote({ children }) {
            return (
              <blockquote className="border-s-2 border-emerald-500/40 ps-3 italic text-muted-foreground my-2">
                {children}
              </blockquote>
            );
          },
          // Tables
          table({ children }) {
            return (
              <div className="my-2 overflow-x-auto rounded-lg border border-border">
                <table className="w-full border-collapse">{children}</table>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

```


---

## 📄 `prisma/schema.prisma` (AI Models فقط)

```prisma
model Conversation {
  id          String    @id @default(cuid())
  title       String?
  summary     String?
  topicTags   String?
  messageCount Int      @default(0)
  tokenCount  Int      @default(0)
  startedAt   DateTime @default(now())
  lastActiveAt DateTime @default(now())
  endedAt     DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  messages    Message[]
  memories    Memory[]   @relation("MemoryFromConversation")
  facts       SemanticFact[]

  @@index([lastActiveAt])
  @@index([startedAt])
}
model Message {
  id              String   @id @default(cuid())
  conversationId  String
  role            String
  content         String
  tokens          Int      @default(0)
  toolCalls       String?
  toolCallId      String?
  thinking        String?
  createdAt       DateTime @default(now())
  conversation    Conversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)

  @@index([conversationId, createdAt])
  @@index([role, createdAt])
}
model Memory {
  id            String   @id @default(cuid())
  type          String
  layer         Int
  content       String
  summary       String?
  importance    Float    @default(0.5)
  confidence    Float    @default(1.0)
  decay         Float    @default(1.0)
  accessCount   Int      @default(0)
  lastAccessed  DateTime @default(now())
  conversationId String?
  conversation   Conversation? @relation("MemoryFromConversation", fields: [conversationId], references: [id], onDelete: SetNull)
  source         String?
  tags           String?
  metadata       String?
  embedding      String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  expiredAt      DateTime?

  @@index([type, createdAt])
  @@index([layer, importance])
  @@index([importance, decay])
  @@index([lastAccessed])
  @@index([conversationId])
}
model EpisodicEvent {
  id           String    @id @default(cuid())
  title        String
  description  String
  occurredAt   DateTime
  endedAt      DateTime?
  duration     Int?
  location     String?
  participants String?
  emotion      String?
  importance   Float     @default(0.5)
  tags         String?
  relatedMemories String?
  metadata     String?
  source       String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([occurredAt])
  @@index([importance])
  @@index([emotion])
}
model SemanticFact {
  id           String    @id @default(cuid())
  subject      String
  predicate    String
  object       String
  confidence   Float     @default(0.8)
  validFrom    DateTime  @default(now())
  validUntil   DateTime?
  source       String?
  conversationId String?
  conversation Conversation? @relation(fields: [conversationId], references: [id], onDelete: SetNull)
  tags         String?
  metadata     String?
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt

  @@index([subject])
  @@index([predicate])
  @@index([subject, predicate])
  @@unique([subject, predicate, object])
}
model MemoryOperation {
  id           String   @id @default(cuid())
  operation    String
  memoryId     String?
  memoryType   String?
  details      String?
  createdAt    DateTime @default(now())

  @@index([operation, createdAt])
  @@index([memoryId])
}
model EntityNode {
  id          String   @id @default(cuid())
  type        String   // person | project | technology | concept | place | event | skill | topic
  name        String
  description String?
  // مصدر الكيان (nullable لو مُستخرج تلقائياً)
  sourceType  String?  // project | task | note | idea | knowledge | skill | conversation
  sourceId    String?  // ID الكيان الأصلي
  // metadata إضافية
  aliases     String?  // JSON array of alternative names
  properties  String?  // JSON object of extra properties
  // ربط بـ Memory Engine (لو الكيان من semantic fact)
  factId      String?
  // توقيت
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  // علاقات
  outgoing    EntityRelation[] @relation("RelationSource")
  incoming    EntityRelation[] @relation("RelationTarget")

  @@unique([type, name])
  @@index([type])
  @@index([name])
  @@index([sourceType, sourceId])
  @@index([factId])
}
model EntityRelation {
  id          String   @id @default(cuid())
  sourceId    String
  targetId    String
  type        String   // related_to | depends_on | part_of | used_in | learned_from | created_by | belongs_to
  weight      Float    @default(1.0)  // 0..1 قوة العلاقة
  // مصدر العلاقة
  source      String?  // auto | manual | cross_link | tag_match
  // metadata إضافية
  properties  String?  // JSON object
  createdAt   DateTime @default(now())
  // علاقات
  sourceNode EntityNode @relation("RelationSource", fields: [sourceId], references: [id], onDelete: Cascade)
  targetNode EntityNode @relation("RelationTarget", fields: [targetId], references: [id], onDelete: Cascade)

  @@unique([sourceId, targetId, type])
  @@index([sourceId])
  @@index([targetId])
  @@index([type])
  @@index([weight])
}
model AgentThought {
  id          String   @id @default(cuid())
  userId      String
  stepId      String // معرّف الخطوة ضمن الجلسة (مثلاً: "step-1", "step-2")
  thought     String // تفكير الـ AI بـ هذه الخطوة (Reasoning)
  action      String? // الإجراء المتخذ (tool call، إلخ) — nullable لو خطوة تفكير فقط
  observation String? // نتيجة الإجراء (output من tool) — nullable لو ما فيه action
  isComplete  Boolean  @default(false) // هل الخطوة اكتملت؟
  createdAt   DateTime @default(now())

  @@index([userId]) // فلترة: كل أفكار user معيّن
  @@index([userId, createdAt]) // فلترة + ترتيب زمني
}
model ContextSnapshot {
  id        String   @id @default(cuid())
  userId    String
  context   String // JSON string — الـ context الكامل المُرسل للـ AI
  createdAt DateTime @default(now())

  @@index([userId]) // فلترة: كل لقطات user معيّن
  @@index([userId, createdAt]) // فلترة + ترتيب زمني
}
```

---

## 🔍 المشاكل المحتملة + اقتراحات الحلول

### 🚨 مشاكل حرجة (P0)

#### 1. auto-sync.js بيقتل نفسه
**المشكلة:** `taskkill /F /IM bun.exe` بيقتل كل عمليات bun بما فيها auto-sync نفسه
**الحل:** استخدم `taskkill /F /PID <specific_pid> /T` بدل /IM
**الحالة:** ✅ تم الإصلاح (commit `7f6ccc7`)

#### 2. delete_conversation كان TODO
**المشكلة:** زر الحذف ما بيشتغل فعلياً — ما فيش endpoint
**الحل:** أضف `delete_conversation` endpoint بـ ترتيب صحيح (Memory → SemanticFact → Conversation)
**الحالة:** ✅ تم الإصلاح (commit `01b1883`)

#### 3. rename_conversation غير موجود
**المشكلة:** ما فيش طريقة لتعديل اسم المحادثة
**الحل:** أضف `rename_conversation` endpoint + inline edit بـ UI
**الحالة:** ✅ تم الإصلاح (commit `01b1883`)

#### 4. FK constraint conflict بـ delete
**المشكلة:** `db.message.deleteMany` بيرجع 500 بسبب Cascade conflict
**الحل:** استخدم `updateMany` لـ SetNull الأول، ثم `delete` للـ Conversation
**الحالة:** ✅ تم الإصلاح

### ⚠️ مشاكل متوسطة (P1)

#### 5. الـ AI Core ما بيرتبطش بـ Memory Engine فعلياً
**المشكلة:** `context-assembler.ts` بـ المفروض يستدعي `memoryEngine.recallRelevant()` بس الـ API path غلط
**الحل:** تأكد إن `import { memoryEngine } from '@/lib/memory/memory-engine'` موجود + المسار صحيح
**الحالة:** ⚠️ يحتاج مراجعة

#### 6. SSE event types غير متطابقة
**المشكلة:** الـ frontend بيتوقع `ev.type === 'thought'` بس الـ backend بيبعت `ev.step === 'thought'`
**الحل:** وحّد الـ event types (استخدم `type` دائماً)
**الحالة:** ⚠️ يحتاج مراجعة

#### 7. auto-memorizer ما بيشتغل inline
**المشكلة:** الـ auto-memorizer بيشتغل بس لما `endConversation` يتسدعى — مو بعد كل رسالة
**الحل:** استدعِ `memorize()` بعد كل رد AI (fire-and-forget)
**الحالة:** ✅ تم الإصلاح (commit `30e41b7`)

#### 8. الـ regex patterns محدودة
**المشكلة:** ما بتلتقطش "بدي اشتغل" + "200 شيكل" بشكل صحيح
**الحل:** أضف patterns خاصة لـ فرص العمل + الأموال
**الحالة:** ✅ تم الإصلاح (commit `30e41b7`)

### 📝 مشاكل بسيطة (P2)

#### 9. ما فيش AI Observability
**المشكلة:** ما فيش تتبع token usage + latency + tool success rate
**الحل:** أضف Prisma model `AiTrace` + API `/api/ai-observability`
**الحالة:** ⬜ Phase 3.4

#### 10. الـ Knowledge Graph بسيط
**المشكلة:** بس tags matching، ما فيش semantic relations حقيقية
**الحل:** أضف entity extraction + semantic relations
**الحالة:** ✅ تم الإصلاح (commit `61a942e`)

#### 11. الـ Context Engine ما بيتكاملش مع الـ AI Core
**المشكلة:** الـ context-assembler.ts بـ AI Core ما بيستخدمش `assembleContextV2`
**الحل:** عدّل `context-assembler.ts` لـ يستخدم `assembleContextV2` من `@/lib/context`
**الحالة:** ✅ تم الإصلاح (commit `35ec587`)

---

## 📊 إحصائيات الكود

| المكون | الملفات | الأسطر | الحالة |
|---|---|---|---|
| AI Core (ReAct) | 6 | ~800 | ✅ شغّال |
| Memory Engine | 9 | ~2500 | ✅ شغّال |
| Context Engine | 7 | ~1200 | ✅ شغّال |
| Knowledge Graph | 1 | ~450 | ✅ شغّال |
| API Routes | 7 | ~800 | ✅ شغّال |
| Frontend (UI) | 2 | ~900 | ✅ شغّال |
| Prisma Models | 10 | ~200 | ✅ شغّال |
| **الإجمالي** | **42** | **~6850** | **✅** |

---

## 🎯 خطة العمل القادمة

### المرحلة 4: MCP + Sub-Agents + Personality
- [ ] MCP Protocol للـ external tools
- [ ] Sub-Agents (ميمو يقدر يطلع وكلاء فرعيين)
- [ ] Personality Engine (شخصية "ميمو" محددة)

### المرحلة 5: Production Hardening
- [ ] AI Observability (token + latency + traces)
- [ ] Rate limiting للـ AI calls
- [ ] Cost tracking (كم تكلفة لكل محادثة)
- [ ] A/B testing للـ prompts

---

*هذا الملف اتولّد تلقائياً من الكود الفعلي بـ المشروع.*
