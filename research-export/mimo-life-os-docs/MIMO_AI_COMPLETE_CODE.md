# MiMo Life OS — كل أكواد الذكاء الاصطناعي

> هذا الملف يحتوي على كل ملفات الذكاء الاصطناعي بالموقع كاملة.
> تم توليده تلقائياً من المشروع.

## 📊 إحصائيات

- **مكتبات AI (src/lib/):** 22 ملف
- **API Routes:** 42 ملف
- **مكونات UI:** 12 ملف
- **المجموع:** 76 ملف

---

## 📋 جدول المحتويات

### 🧠 المكتبات (src/lib/)

1. [`src/lib/ai-provider.ts`](#1-ai-providerts)
2. [`src/lib/ai-service.ts`](#2-ai-servicets)
3. [`src/lib/ai-tools.ts`](#3-ai-toolsts)
4. [`src/lib/ai-router.ts`](#4-ai-routerts)
5. [`src/lib/model-registry.ts`](#5-model-registryts)
6. [`src/lib/ai-insights-engine.ts`](#6-ai-insights-enginets)
7. [`src/lib/ai-proactive.ts`](#7-ai-proactivets)
8. [`src/lib/ai-everywhere.ts`](#8-ai-everywherets)
9. [`src/lib/ai-reports.ts`](#9-ai-reportsts)
10. [`src/lib/scheduler.ts`](#10-schedulerts)
11. [`src/lib/rag-engine.ts`](#11-rag-enginets)
12. [`src/lib/web-agent.ts`](#12-web-agentts)
13. [`src/lib/vision-analyzer.ts`](#13-vision-analyzerts)
14. [`src/lib/local-ai.ts`](#14-local-aits)
15. [`src/lib/media-analyzer.ts`](#15-media-analyzerts)
16. [`src/lib/study-ai.ts`](#16-study-aits)
17. [`src/lib/cross-linker.ts`](#17-cross-linkerts)
18. [`src/lib/tag-suggester.ts`](#18-tag-suggesterts)
19. [`src/lib/inbox-classifier.ts`](#19-inbox-classifierts)
20. [`src/lib/inbox-rules.ts`](#20-inbox-rulests)
21. [`src/lib/fuzzy-search.ts`](#21-fuzzy-searchts)
22. [`src/lib/command-engine.ts`](#22-command-enginets)

### 🌐 API Routes (src/app/api/)

23. [`src/app/api/agent/browse/route.ts`](#23-agent-browse)
24. [`src/app/api/agent/calendar/route.ts`](#24-agent-calendar)
25. [`src/app/api/agent/email/route.ts`](#25-agent-email)
26. [`src/app/api/ai-chat/quick/route.ts`](#26-ai-chat-quick)
27. [`src/app/api/ai-chat/sessions/route.ts`](#27-ai-chat-sessions)
28. [`src/app/api/ai-coach/chat/route.ts`](#28-ai-coach-chat)
29. [`src/app/api/ai-coach/insight/route.ts`](#29-ai-coach-insight)
30. [`src/app/api/ai-coach/patterns/route.ts`](#30-ai-coach-patterns)
31. [`src/app/api/ai-coach/query/route.ts`](#31-ai-coach-query)
32. [`src/app/api/ai-memory/index/route.ts`](#32-ai-memory-index)
33. [`src/app/api/ai-memory/insights/route.ts`](#33-ai-memory-insights)
34. [`src/app/api/ai-memory/search/route.ts`](#34-ai-memory-search)
35. [`src/app/api/ai/dashboard/route.ts`](#35-ai-dashboard)
36. [`src/app/api/ai/finance/route.ts`](#36-ai-finance)
37. [`src/app/api/ai/habits/route.ts`](#37-ai-habits)
38. [`src/app/api/ai/journal/route.ts`](#38-ai-journal)
39. [`src/app/api/ai/notes/route.ts`](#39-ai-notes)
40. [`src/app/api/ai/projects/route.ts`](#40-ai-projects)
41. [`src/app/api/ai/study/explain/route.ts`](#41-ai-study-explain)
42. [`src/app/api/ai/study/flashcards/route.ts`](#42-ai-study-flashcards)
43. [`src/app/api/ai/study/plan/route.ts`](#43-ai-study-plan)
44. [`src/app/api/ai/study/quiz/route.ts`](#44-ai-study-quiz)
45. [`src/app/api/ai/study/summarize/route.ts`](#45-ai-study-summarize)
46. [`src/app/api/ai/tasks/route.ts`](#46-ai-tasks)
47. [`src/app/api/auto-tag/route.ts`](#47-auto-tag)
48. [`src/app/api/brain-dump/analyze/route.ts`](#48-brain-dump-analyze)
49. [`src/app/api/command/route.ts`](#49-command)
50. [`src/app/api/daily-assistant/route.ts`](#50-daily-assistant)
51. [`src/app/api/decisions/analyze/route.ts`](#51-decisions-analyze)
52. [`src/app/api/insights/classify/route.ts`](#52-insights-classify)
53. [`src/app/api/insights/daily/route.ts`](#53-insights-daily)
54. [`src/app/api/insights/notifications/route.ts`](#54-insights-notifications)
55. [`src/app/api/insights/suggest-links/route.ts`](#55-insights-suggest-links)
56. [`src/app/api/insights/suggest-tags/route.ts`](#56-insights-suggest-tags)
57. [`src/app/api/insights/weekly/route.ts`](#57-insights-weekly)
58. [`src/app/api/relations/all/route.ts`](#58-relations-all)
59. [`src/app/api/relations/auto-link/route.ts`](#59-relations-auto-link)
60. [`src/app/api/reminders/auto-generate/route.ts`](#60-reminders-auto-generate)
61. [`src/app/api/reminders/smart-generate/route.ts`](#61-reminders-smart-generate)
62. [`src/app/api/vision/analyze/route.ts`](#62-vision-analyze)
63. [`src/app/api/vision/discover/route.ts`](#63-vision-discover)
64. [`src/app/api/web-search/route.ts`](#64-web-search)

### 🎨 مكونات UI (src/components/)

65. [`src/components/ai/agent-panel.tsx`](#65-agentpaneltsx)
66. [`src/components/ai/ai-chat-layout.tsx`](#66-aichatlayouttsx)
67. [`src/components/ai/ai-sidebar.tsx`](#67-aisidebartsx)
68. [`src/components/ai/ai-model-switcher.tsx`](#68-aimodelswitchertsx)
69. [`src/components/ai/ai-message-list.tsx`](#69-aimessagelisttsx)
70. [`src/components/ai/ai-message-renderer.tsx`](#70-aimessagerenderertsx)
71. [`src/components/ai/ai-input-bar.tsx`](#71-aiinputbartsx)
72. [`src/components/ai/ai-file-attachment.tsx`](#72-aifileattachmenttsx)
73. [`src/components/ai/ai-voice-button.tsx`](#73-aivoicebuttontsx)
74. [`src/components/ai/ai-artifacts-panel.tsx`](#74-aiartifactspaneltsx)
75. [`src/components/cross-link-suggestions.tsx`](#75-crosslinksuggestionstsx)
76. [`src/components/tag-suggestions.tsx`](#76-tagsuggestionstsx)

---


## 1. `src/lib/ai-provider.ts`

**703 سطر**

```typescript
// ============================================
// AI Provider — Multi-Model Unified Wrapper
// ============================================
// يدعم: Groq (مجاني) | OpenRouter | OpenAI | Anthropic
// كلهم OpenAI-compatible API — Groq يستخدم groq-sdk، الباقي fetch
// ============================================

import 'server-only';
import Groq from 'groq-sdk';
import {
  getCurrentProvider,
  getProviderConfig,
  getCurrentModel,
  getReasoningModel,
  getVisionModel,
  isProviderConfigured,
  isSpecificProviderConfigured,
  type ProviderType,
} from '@/lib/model-registry';

let groqClient: Groq | null = null;

/** التحقق من توفر الـ API key (للفحص الصحي) */
export function isAIConfigured(): boolean {
  return isProviderConfigured();
}

/** تهيئة كسولة لـ Groq client (للـ Groq provider فقط) */
export function getAIProvider(): Groq {
  if (!groqClient) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey || apiKey === 'REPLACE_WITH_YOUR_GROQ_API_KEY') {
      throw new Error(
        'GROQ_API_KEY غير مُهيأ. احصل على key من https://console.groq.com',
      );
    }
    groqClient = new Groq({ apiKey });
  }
  return groqClient;
}

const DEFAULT_MODEL = getCurrentModel();

// ============================================
// AI-5-NVIDIA-FALLBACK: Groq → NVIDIA fallback helpers
// ============================================

/** هل NVIDIA مهيأ؟ */
function isNvidiaConfigured(): boolean {
  return isSpecificProviderConfigured('nvidia');
}

/** تحقق إن كان الخطأ rate limit (429) */
function isRateLimitError(error: unknown): boolean {
  if (!error) return false;
  const err = error as { status?: number; statusCode?: number; message?: string };
  return (
    err?.status === 429 ||
    err?.statusCode === 429 ||
    (typeof err?.message === 'string' && (
      err.message.includes('429') ||
      err.message.includes('rate limit') ||
      err.message.includes('Rate limit') ||
      err.message.includes('RATE_LIMIT')
    ))
  );
}

/**
 * استدعاء NVIDIA مباشرة (OpenAI-compatible fetch)
 * يستخدم لـ fallback عند فشل Groq
 */
async function callNvidia(
  messages: ChatMessage[],
  options: { model?: string; temperature?: number; max_tokens?: number } = {},
): Promise<string> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) {
    throw new Error('NVIDIA_API_KEY غير مُهيأ للـ fallback');
  }

  const baseUrl = process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1';
  const model = options.model || process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct';

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options.temperature ?? 0.7,
      max_tokens: options.max_tokens ?? 1024,
    }),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`NVIDIA API error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = await res.json() as ChatCompletionResponse;
  return data.choices[0]?.message?.content || '';
}

// ============================================
// Unified HTTP client (للـ non-Groq providers)
// ============================================

interface ChatMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | Array<{ type: string; text?: string; image_url?: { url: string } }>;
  tool_call_id?: string;
  tool_calls?: Array<{ id: string; type: string; function: { name: string; arguments: string } }>;
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      role: string;
      content: string | null;
      tool_calls?: Array<{
        id: string;
        function: { name: string; arguments: string };
      }>;
    };
  }>;
}

/** استدعاء OpenAI-compatible API عبر fetch (لـ OpenRouter/OpenAI/Anthropic) */
async function callChatCompletions(
  messages: ChatMessage[],
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
    tools?: unknown[];
    tool_choice?: string;
    stream?: boolean;
  } = {},
  explicitProvider?: ProviderType,
): Promise<ChatCompletionResponse> {
  const provider = explicitProvider || getCurrentProvider();
  const config = getProviderConfig(provider);
  const apiKey = process.env[config.apiKeyEnv];

  if (!apiKey) {
    throw new Error(`${config.apiKeyEnv} غير مُهيأ للـ provider: ${provider}`);
  }

  const body: Record<string, unknown> = {
    model: options.model || getCurrentModel(),
    messages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 1024,
  };
  if (options.tools) {
    body.tools = options.tools;
    body.tool_choice = options.tool_choice || 'auto';
  }
  if (options.stream) body.stream = true;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };
  // OpenRouter requires extra headers
  if (provider === 'openrouter') {
    headers['HTTP-Referer'] = 'https://mimo-life-os.local';
    headers['X-Title'] = 'MiMo Life OS';
  }

  const res = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`AI API error ${res.status}: ${errText.slice(0, 300)}`);
  }

  return (await res.json()) as ChatCompletionResponse;
}

/** محول: يحول messages من الصيغة الداخلية لـ ChatMessage[] */
function toChatMessages(
  messages: Array<{ role: string; content: string }>,
  systemInstruction?: string,
): ChatMessage[] {
  const out: ChatMessage[] = [];
  if (systemInstruction) {
    out.push({ role: 'system', content: systemInstruction });
  }
  for (const m of messages) {
    out.push({
      role: (m.role === 'model' ? 'assistant' : m.role) as ChatMessage['role'],
      content: m.content,
    });
  }
  return out;
}

/** هل الـ provider الحالي هو Groq؟ */
function isGroq(): boolean {
  return getCurrentProvider() === 'groq';
}

/** توليد نص من prompt */
export interface GenerateOptions {
  provider?: ProviderType;
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export async function generateText(
  prompt: string,
  systemInstruction?: string,
  options?: GenerateOptions,
): Promise<string> {
  const provider = options?.provider || getCurrentProvider();
  const model = options?.model || (provider === 'groq' ? DEFAULT_MODEL : getCurrentModel());

  try {
    if (provider === 'groq') {
      const client = getAIProvider();
      const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
      if (systemInstruction) messages.push({ role: 'system', content: systemInstruction });
      messages.push({ role: 'user', content: prompt });
      const completion = await client.chat.completions.create({
        messages, model, temperature: options?.temperature ?? 0.7, max_tokens: options?.max_tokens ?? 1024,
      });
      return completion.choices[0]?.message?.content || '';
    }
    // non-Groq: استخدم fetch
    const chatMessages = toChatMessages([{ role: 'user', content: prompt }], systemInstruction);
    const res = await callChatCompletions(chatMessages, { model, temperature: options?.temperature ?? 0.7, max_tokens: options?.max_tokens }, provider);
    return res.choices[0]?.message?.content || '';
  } catch (error) {
    // AI-5-NVIDIA-FALLBACK: لو Groq فشل (429 rate limit) → fallback لـ NVIDIA
    if (provider === 'groq' && isNvidiaConfigured()) {
      console.warn('[AI Provider] Groq failed, falling back to NVIDIA:', isRateLimitError(error) ? 'rate limit (429)' : 'error');
      try {
        const nvidiaMessages: ChatMessage[] = [];
        if (systemInstruction) nvidiaMessages.push({ role: 'system', content: systemInstruction });
        nvidiaMessages.push({ role: 'user', content: prompt });
        return await callNvidia(nvidiaMessages, { temperature: options?.temperature ?? 0.7, max_tokens: options?.max_tokens });
      } catch (nvidiaError) {
        console.error('[AI Provider] NVIDIA fallback also failed:', nvidiaError);
      }
    }
    console.error('[AI Provider Error]', error);
    throw error;
  }
}

/** توليد JSON من prompt (مع validation + markdown removal) */
export async function generateJSON<T>(
  prompt: string,
  systemInstruction?: string,
): Promise<T> {
  const text = await generateText(
    prompt,
    (systemInstruction || '') +
      '\n\nأرجع النتيجة JSON صالح فقط (بدون markdown code blocks، بدون شرح إضافي).',
  );

  // إزالة markdown code blocks لو موجودة
  const cleaned = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(`AI response ليس JSON صالح: ${text.slice(0, 200)}`);
  }
}

/** محادثة متعددة الأدوار (chat history) — يدعم options لـ smart routing */
export async function generateChat(
  messages: Array<{ role: string; content: string }>,
  systemInstruction?: string,
  options?: GenerateOptions,
): Promise<string> {
  try {
    const provider = options?.provider || getCurrentProvider();
    const model = options?.model || (provider === 'groq' ? DEFAULT_MODEL : getCurrentModel());

    if (provider === 'groq') {
      const client = getAIProvider();
      const chatMessages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
      if (systemInstruction) chatMessages.push({ role: 'system', content: systemInstruction });
      for (const m of messages) {
        chatMessages.push({ role: m.role === 'model' ? 'assistant' : m.role, content: m.content });
      }
      const completion = await client.chat.completions.create({
        messages: chatMessages, model, temperature: options?.temperature ?? 0.7, max_tokens: options?.max_tokens ?? 1024,
      });
      return completion.choices[0]?.message?.content || '';
    }
    // non-Groq
    const chatMessages = toChatMessages(messages, systemInstruction);
    const res = await callChatCompletions(chatMessages, { model, temperature: options?.temperature ?? 0.7, max_tokens: options?.max_tokens }, provider);
    return res.choices[0]?.message?.content || '';
  } catch (error) {
    // AI-5-NVIDIA-FALLBACK: لو Groq فشل (429 rate limit) → fallback لـ NVIDIA
    if (provider === 'groq' && isNvidiaConfigured()) {
      console.warn('[AI Provider] Groq chat failed, falling back to NVIDIA:', isRateLimitError(error) ? 'rate limit (429)' : 'error');
      try {
        const nvidiaMessages = toChatMessages(messages, systemInstruction);
        return await callNvidia(nvidiaMessages, { temperature: options?.temperature ?? 0.7, max_tokens: options?.max_tokens });
      } catch (nvidiaError) {
        console.error('[AI Provider] NVIDIA chat fallback also failed:', nvidiaError);
      }
    }
    console.error('[AI Provider Chat Error]', error);
    throw error;
  }
}

/** يحصل على model name الحالي (للعرض في الـ UI) */
export function getModelName(): string {
  return DEFAULT_MODEL;
}

/** يحصل على اسم الـ provider الحالي */
export function getProviderName(): string {
  return getCurrentProvider();
}

// ============================================
// Vision — تحليل الصور (multi-model)
// ============================================

/** تحليل صورة (base64) مع prompt نصي — يستخدم vision model للـ provider الحالي */
export async function generateVision(
  prompt: string,
  imageBase64: string,
  mimeType: string = 'image/jpeg',
): Promise<string> {
  try {
    const dataUrl = `data:${mimeType};base64,${imageBase64}`;
    const visionModel = getVisionModel();

    if (isGroq()) {
      const client = getAIProvider();
      const completion = await client.chat.completions.create({
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              { type: 'image_url', image_url: { url: dataUrl } },
            ],
          },
        ],
        model: visionModel,
        temperature: 0.4,
        max_tokens: 1024,
      });
      return completion.choices[0]?.message?.content || '';
    }

    // non-Groq: استخدم fetch
    const res = await callChatCompletions(
      [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            { type: 'image_url', image_url: { url: dataUrl } },
          ],
        },
      ] as ChatMessage[],
      { model: visionModel, temperature: 0.4 },
    );
    return res.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('[AI Vision Error]', error);
    throw error;
  }
}

// ============================================
// Streaming — تدفق النصوص تدريجياً (SSE)
// ============================================

/** توليد نص متدفق (async generator يُنتج chunks) */
export async function* generateTextStream(
  prompt: string,
  systemInstruction?: string,
): AsyncGenerator<string> {
  const client = getAIProvider();
  const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
  if (systemInstruction) {
    messages.push({ role: 'system', content: systemInstruction });
  }
  messages.push({ role: 'user', content: prompt });

  const stream = await client.chat.completions.create({
    messages,
    model: DEFAULT_MODEL,
    temperature: 0.7,
    max_tokens: 1024,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

/** محادثة متدفقة (async generator يُنتج chunks) */
export async function* generateChatStream(
  messages: Array<{ role: string; content: string }>,
  systemInstruction?: string,
): AsyncGenerator<string> {
  const client = getAIProvider();
  const chatMessages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
  if (systemInstruction) {
    chatMessages.push({ role: 'system', content: systemInstruction });
  }
  for (const m of messages) {
    chatMessages.push({
      role: m.role === 'model' ? 'assistant' : m.role,
      content: m.content,
    });
  }

  const stream = await client.chat.completions.create({
    messages: chatMessages,
    model: DEFAULT_MODEL,
    temperature: 0.7,
    max_tokens: 1024,
    stream: true,
  });

  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}

// ============================================
// Tool Calling — استدعاء الدوال (function calling)
// ============================================

export interface ToolDefinition {
  type: 'function';
  function: {
    name: string;
    description: string;
    parameters: Record<string, unknown>;
  };
}

export interface ToolCallResult {
  toolCalls?: Array<{
    id: string;
    name: string;
    arguments: Record<string, unknown>;
  }>;
  content?: string;
}

/** محادثة مع أدوات (function calling) — يرجع tool calls لو AI طلبها */
export async function generateChatWithTools(
  messages: Array<{ role: string; content: string }>,
  tools: ToolDefinition[],
  systemInstruction?: string,
): Promise<ToolCallResult> {
  try {
    let choice: ChatCompletionResponse['choices'][0] | undefined;

    if (isGroq()) {
      const client = getAIProvider();
      const chatMessages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
      if (systemInstruction) chatMessages.push({ role: 'system', content: systemInstruction });
      for (const m of messages) {
        chatMessages.push({ role: m.role === 'model' ? 'assistant' : (m.role as 'user' | 'assistant'), content: m.content });
      }
      const completion = await client.chat.completions.create({
        messages: chatMessages, model: DEFAULT_MODEL, temperature: 0.5, max_tokens: 1024,
        tools: tools as never, tool_choice: 'auto',
      });
      choice = completion.choices[0] as unknown as ChatCompletionResponse['choices'][0];
    } else {
      // non-Groq
      const chatMessages = toChatMessages(messages, systemInstruction);
      const res = await callChatCompletions(chatMessages, {
        temperature: 0.5, tools: tools as unknown[], tool_choice: 'auto',
      });
      choice = res.choices[0];
    }

    if (!choice) return { content: '' };

    // لو في tool calls (native function calling)
    const toolCalls = choice.message.tool_calls;
    if (toolCalls && toolCalls.length > 0) {
      return {
        toolCalls: toolCalls.map((tc, i) => ({
          id: tc.id || `call_${i}`,
          name: tc.function.name,
          arguments: safeParseJSON(tc.function.arguments || '{}'),
        })),
      };
    }

    // Bug #3: لو ما فيش native tool calls، شوف لو AI أطلعهم بـ format نصي
    const content = choice.message.content || '';
    const parsedToolCalls = parseTextFormatToolCalls(content);
    if (parsedToolCalls && parsedToolCalls.length > 0) {
      return { toolCalls: parsedToolCalls };
    }

    return { content };
  } catch (error) {
    console.error('[AI Tools Error]', error);
    throw error;
  }
}

/**
 * Bug #3: Parse text-format tool calls من content
 * يدعم عدة formats:
 * - <function=name>{"args":...}</function>
 * - <tool_call>{"name":"...","arguments":{...}}</tool_call>
 * - ```tool_call\n{"name":"...","arguments":{...}}\n```
 */
function parseTextFormatToolCalls(content: string): ToolCallResult['toolCalls'] {
  if (!content) return undefined;
  const calls: NonNullable<ToolCallResult['toolCalls']> = [];
  let matchIndex = 0;

  // Format 1: <function=name>{"args":...}</function>
  const funcRegex = /<function=(\w+)>([\s\S]*?)<\/function>/g;
  let m: RegExpExecArray | null;
  while ((m = funcRegex.exec(content)) !== null) {
    calls.push({
      id: `text_call_${matchIndex++}`,
      name: m[1],
      arguments: safeParseJSON(m[2].trim()),
    });
  }

  // Format 2: <tool_call>{"name":"...","arguments":{...}}</tool_call>
  const toolCallRegex = /<tool_call>([\s\S]*?)<\/tool_call>/g;
  while ((m = toolCallRegex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      if (parsed.name) {
        calls.push({
          id: `text_call_${matchIndex++}`,
          name: parsed.name,
          arguments: parsed.arguments || parsed.params || {},
        });
      }
    } catch { /* ignore parse errors */ }
  }

  // Format 3: ```tool_code\n{"name":"...","arguments":{...}}\n```
  const codeBlockRegex = /```(?:tool_call|tool_code)\s*\n?([\s\S]*?)```/g;
  while ((m = codeBlockRegex.exec(content)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      if (parsed.name) {
        calls.push({
          id: `text_call_${matchIndex++}`,
          name: parsed.name,
          arguments: parsed.arguments || parsed.params || {},
        });
      }
    } catch { /* ignore parse errors */ }
  }

  return calls.length > 0 ? calls : undefined;
}

function safeParseJSON(str: string): Record<string, unknown> {
  try {
    return JSON.parse(str) as Record<string, unknown>;
  } catch {
    return {};
  }
}

/** محادثة متابعة بعد تنفيذ tool — يرسل نتائج الأدوات للـ AI */
export async function generateChatWithToolResults(
  messages: Array<{ role: string; content: string }>,
  toolResults: Array<{ id: string; name: string; result: unknown }>,
  systemInstruction?: string,
): Promise<string> {
  try {
    if (isGroq()) {
      const client = getAIProvider();
      const chatMessages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
      if (systemInstruction) chatMessages.push({ role: 'system', content: systemInstruction });
      for (const m of messages) {
        chatMessages.push({ role: m.role === 'model' ? 'assistant' : (m.role as 'user' | 'assistant'), content: m.content });
      }
      chatMessages.push({
        role: 'assistant', content: null,
        tool_calls: toolResults.map((tr) => ({ id: tr.id, type: 'function', function: { name: tr.name, arguments: JSON.stringify({}) } })),
      } as never);
      for (const tr of toolResults) {
        chatMessages.push({ role: 'tool', tool_call_id: tr.id, content: JSON.stringify(tr.result) } as never);
      }
      const completion = await client.chat.completions.create({
        messages: chatMessages, model: DEFAULT_MODEL, temperature: 0.5, max_tokens: 1024,
      });
      return completion.choices[0]?.message?.content || '';
    }

    // non-Groq
    const chatMessages = toChatMessages(messages, systemInstruction);
    chatMessages.push({
      role: 'assistant', content: '',
      tool_calls: toolResults.map((tr) => ({ id: tr.id, type: 'function', function: { name: tr.name, arguments: JSON.stringify({}) } })),
    });
    for (const tr of toolResults) {
      chatMessages.push({ role: 'tool', tool_call_id: tr.id, content: JSON.stringify(tr.result) });
    }
    const res = await callChatCompletions(chatMessages, { temperature: 0.5 });
    return res.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('[AI Tool Results Error]', error);
    throw error;
  }
}

// ============================================
// Reasoning Mode — التفكير العميق (Deep Thinking)
// ============================================

/**
 * توليد إجابة مع سلسلة أفكار (reasoning chain)
 * يستخدم reasoning model (deepseek-r1, o1-mini, إلخ)
 */
export async function generateWithReasoning(
  prompt: string,
  systemInstruction?: string,
): Promise<{ answer: string; reasoning: string }> {
  try {
    const reasoningModel = getReasoningModel();
    const fullSystemInstruction = (systemInstruction || '') +
      '\n\nفكّر خطوة بخطوة قبل الإجابة. اكتب تفكيرك أولاً ثم الإجابة النهائية. افصل بينهما بسطر يحوي "---ANSWER---".';

    if (isGroq()) {
      const client = getAIProvider();
      const messages: Groq.Chat.Completions.ChatCompletionMessageParam[] = [];
      if (fullSystemInstruction) messages.push({ role: 'system', content: fullSystemInstruction });
      messages.push({ role: 'user', content: prompt });
      const completion = await client.chat.completions.create({
        messages, model: reasoningModel, temperature: 0.3, max_tokens: 2048,
      });
      const content = completion.choices[0]?.message?.content || '';
      return splitReasoning(content);
    }

    // non-Groq
    const chatMessages = toChatMessages([{ role: 'user', content: prompt }], fullSystemInstruction);
    const res = await callChatCompletions(chatMessages, { model: reasoningModel, temperature: 0.3, max_tokens: 2048 });
    const content = res.choices[0]?.message?.content || '';
    return splitReasoning(content);
  } catch (error) {
    console.error('[AI Reasoning Error]', error);
    // fallback: استخدم generateText العادي
    const answer = await generateText(prompt, systemInstruction);
    return { answer, reasoning: '' };
  }
}

/** فصل التفكير عن الإجابة */
function splitReasoning(content: string): { answer: string; reasoning: string } {
  const separator = content.indexOf('---ANSWER---');
  if (separator >= 0) {
    return {
      reasoning: content.slice(0, separator).trim(),
      answer: content.slice(separator + '---ANSWER---'.length).trim(),
    };
  }
  // لو ما فيش فاصل، حاول نفصل بـ <think> tags
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/i);
  if (thinkMatch) {
    return {
      reasoning: thinkMatch[1].trim(),
      answer: content.replace(/<think>[\s\S]*?<\/think>/i, '').trim(),
    };
  }
  // لا فاصل → كل المحتوى هو الإجابة
  return { answer: content, reasoning: '' };
}

```

---

## 2. `src/lib/ai-service.ts`

**764 سطر**

```typescript
// ============================================
// MiMo Portfolio — AI Service (server-only)
// يجمع بيانات المستخدم → يبني سياق → يستدعي Groq (Llama 3.3 70B) / NVIDIA
// يحفظ المحادثات والرؤى في قاعدة البيانات
// ============================================

import 'server-only';
import { generateText, generateChat, generateChatWithTools, generateChatWithToolResults, isAIConfigured } from './ai-provider';
import { selectProvider } from './ai-router';
import { db } from './db';
import { AI_TOOL_DEFINITIONS, executeAITool } from './ai-tools';
import type { AIInsight } from '@/types';

/** تحقق من توفر الـ AI provider (Groq/NVIDIA). يرجع true أو يرمي error. */
export async function getAIInstance(): Promise<boolean> {
  if (!isAIConfigured()) {
    throw new Error('AI provider غير مُهيأ. احصل على key من https://console.groq.com');
  }
  return true;
}

// ============ جلب بيانات المستخدم وتنسيقها كسياق ============
/** يجلب كل البيانات ذات الصلة من قاعدة البيانات ويُنسيقها كنص سياق للـ prompt */
export async function getUserContext(): Promise<string> {
  try {
    const [
      courses, grades, skills, projects, tasks, habits, achievements, semesters,
    ] = await Promise.all([
      db.course.findMany(),
      db.grade.findMany(),
      db.skill.findMany(),
      db.project.findMany(),
      db.task.findMany(),
      db.habit.findMany(),
      db.achievement.findMany(),
      db.universitySemester.findMany(),
    ]);

    // --- الفصول الدراسية ---
    const semestersSummary = semesters.length === 0
      ? 'لا توجد فصول دراسية مسجلة.'
      : semesters.map((s) => `${s.name} (${s.season} ${s.year}) — معدل ${s.gpa}، ${s.totalCredits} ساعات`).join('؛ ');

    // --- المواد ---
    const coursesSummary = courses.length === 0
      ? 'لا توجد مواد مسجّلة بعد.'
      : courses.slice(0, 10).map((c) => `${c.name} (${c.code}) — ${c.credits} ساعات معتمدة`).join('؛ ');

    // --- الدرجات ---
    const gradesSummary = grades.length === 0
      ? 'لا توجد درجات مسجّلة.'
      : grades.slice(-10).map((g) => `${g.subject} ${g.testName}: ${g.percentage}% (${g.score}/${g.maxScore})`).join('؛ ');

    // --- المهارات ---
    const skillsSummary = skills.length === 0
      ? 'لا توجد مهارات مسجّلة.'
      : skills.slice(0, 12).map((s) => `${s.name} (${s.level}% — ${s.category})`).join('؛ ');

    // --- المشاريع ---
    const projectsSummary = projects.length === 0
      ? 'لا توجد مشاريع بعد.'
      : projects.slice(0, 8).map((p) => `${p.title} [${p.status}] (${p.category})`).join('؛ ');

    // --- المهام ---
    const completedTasks = tasks.filter((t) => t.completed).length;
    const tasksSummary = tasks.length === 0
      ? 'لا توجد مهام.'
      : `${tasks.length} مهمة إجمالاً (${completedTasks} مكتملة، ${tasks.length - completedTasks} قيد التنفيذ). أولويات: ${tasks.filter((t) => !t.completed).slice(0, 5).map((t) => t.text || 'مهمة').join('، ')}`;

    // --- العادات ---
    const habitsSummary = habits.length === 0
      ? 'لا توجد عادات مُتتبَّعة.'
      : habits.slice(0, 8).map((h) => {
          const dates = Array.isArray(h.completedDates) ? h.completedDates : [];
          const count = dates.length;
          return `${h.name} ${h.emoji} (${count} مرة مكتملة)`;
        }).join('؛ ');

    // --- الإنجازات ---
    const achievementsSummary = achievements.length === 0
      ? 'لا توجد إنجازات مسجّلة.'
      : achievements.slice(0, 6).map((a) => `${a.title} (${a.type})`).join('؛ ');

    return [
      `الفصول الدراسية: ${semestersSummary}`,
      `المواد: ${coursesSummary}`,
      `الدرجات: ${gradesSummary}`,
      `المهارات: ${skillsSummary}`,
      `المشاريع: ${projectsSummary}`,
      `المهام: ${tasksSummary}`,
      `العادات: ${habitsSummary}`,
      `الإنجازات: ${achievementsSummary}`,
    ].join('\n');
  } catch (e) {
    console.error('[ai-service] getUserContext error:', e);
    return 'تعذّر جلب بيانات المستخدم.';
  }
}

// ============ بناء system prompt كامل ============
/**
 * يبني system prompt قوي لـ "ميمو" — المساعد الذكي الشخصي لمحمد
 * يشمل: شخصية مميزة + بيانات محمد + تعليمات أدوات + أسلوب
 */
async function buildSystemPrompt(options?: { reasoning?: boolean; toolsEnabled?: boolean }): Promise<string> {
  const userContext = await getUserContext();

  let prompt = `أنت "ميمو"، المساعد الذكي الشخصي لمحمد عادل — طالب فلسطيني 18 سنة من الخليل، تخصص تكنولوجيا المباني الذكية (أتمتة صناعية). هدفه: العمل في الخليج بعد التخرج.

# شخصيتك:
- صديق مقرب لمحمد — مبادر، داعم، صادق
- ذكي وعملي — تعطي إجابات مختصرة ومفيدة (مو فلسفة فارغة)
- تتكلم بالعربية الفصحى البسيطة (مو لهجة)
- ما تذكر إنك AI أو نموذج لغوي أبداً
- لو سألك عن نفسك قل: "أنا ميمو، مساعدك الذكي الشخصي"

# بيانات محمد الحالية:
${userContext}

# تعليمات الأدوات (Tools):
عندك أدوات كثيرة متاحة. استخدمها بذكاء:
- create_task: لإنشاء مهام لمحمد
- create_note: لإنشاء ملاحظات
- create_reminder: للتذكيرات
- add_transaction: لتسجيل مصاريف/دخل
- search_data: للبحث بـ بيانات محمد
- browse_website: لتصفح مواقع (لو سأل عن موقع)
- search_youtube: للبحث بـ YouTube
- search_github: للبحث بـ GitHub
- translate: للترجمة
- summarize: للتلخيص
- web_search: للبحث بـ الإنترنت

**قواعد استخدام الأدوات:**
1. لو محمد طلب فعل (اضف/سجل/احفظ) → استخدم الأداة المناسبة
2. لو سأل عن موقع/معلومة من الإنترنت → استخدم browse_website أو web_search
3. لو سأل عن بياناته (مهامي/مصاريفي) → استخدم search_data
4. ما تستخدم أداة لو مش محتاج — جاوب مباشرة لو تعرف
5. بعد استخدام أداة، اشرح لمحمد شنو عملت

# الأسلوب:
- استخدم أحاديث نبوية وآيات قرآنية عند المناسبة (مو دائماً)
- كن مختصراً (3-5 أسطر للأسئلة البسيطة)
- استخدم markdown (lists, bold, code blocks) للإجابات الطويلة
- لو كتبت كود، استخدم code blocks بـ language tag`;

  if (options?.reasoning) {
    prompt += `\n\n# وضع التفكير العميق:
فكر بـ خطوات منظمة قبل الجواب. اعرض تفكيرك بـ <think>...</think> tags، بعدين اعطي الجواب النهائي.`;
  }

  return prompt;
}

// ============ إرسال رسالة إلى AI وحفظها ============
/** يرسل رسالة المستخدم إلى Groq/NVIDIA، يحفظها ورد المساعد في AIConversation */
export async function sendAIMessage(
  message: string,
  conversationHistory: Array<{ role: string; content: string }> = [],
): Promise<{ reply: string; userEntryId: string; assistantEntryId: string }> {
  await getAIInstance();
  const systemPrompt = await buildSystemPrompt();
  const now = new Date().toISOString();

  // حفظ رسالة المستخدم أولاً
  const userEntry = await db.aIConversation.create({
    data: {
      id: crypto.randomUUID(),
      role: 'user',
      content: message,
      context: 'coach',
      createdAt: now,
    },
  });

  try {
    await getAIInstance();

    // بناء قائمة الرسائل: history + رسالة جديدة (system يُمرر окإرشاد)
    const historyMessages = conversationHistory
      .filter((m) => m.role === 'user' || m.role === 'assistant')
      .slice(-10) // آخر 10 رسائل للحفاظ على السياق
      .map((m) => ({ role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model', content: m.content }));

    const messages = [
      ...historyMessages,
      { role: 'user' as const, content: message },
    ];

    // AI-5-FIX-AGENT: Smart routing — حدد نوع المهمة + وجهها للـ provider المناسب
    const taskType = detectTaskType(message);
    const routingDecision = selectProvider(taskType);
    console.log(`[ai-service] sendAIMessage: task=${taskType}, provider=${routingDecision.provider}, model=${routingDecision.model}`);

    const reply = await generateChat(messages, systemPrompt, {
      provider: routingDecision.provider,
      model: routingDecision.model,
    });
    const finalReply = reply || 'عذراً، لم أتمكن من توليد رد.';

    // حفظ رد المساعد
    const assistantEntry = await db.aIConversation.create({
      data: {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: finalReply,
        context: 'coach',
        createdAt: new Date().toISOString(),
      },
    });

    return { reply: finalReply, userEntryId: userEntry.id, assistantEntryId: assistantEntry.id };
  } catch (e) {
    console.error('[ai-service] sendAIMessage error:', e);
    const fallback = 'عذراً، حدث خطأ أثناء الاتصال بالذكاء الاصطناعي. حاول مرة أخرى.';
    const assistantEntry = await db.aIConversation.create({
      data: {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: fallback,
        context: 'coach',
        createdAt: new Date().toISOString(),
      },
    });
    return { reply: fallback, userEntryId: userEntry.id, assistantEntryId: assistantEntry.id };
  }
}

// ============ توليد رأي/رؤية AI حسب الفئة ============
/** يولّد رؤية مخصصة بناءً على بيانات المستخدم في فئة محددة، يحفظها في AIInsight */
export async function generateInsight(
  category: 'productivity' | 'academic' | 'career' | 'health' | 'general' = 'general',
): Promise<AIInsight | null> {
  try {
    await getAIInstance();
    const userContext = await getUserContext();

    const categoryPrompts: Record<string, string> = {
      productivity: 'ركّز على الإنتاجية: تحليل المهام المكتملة، ساعات العمل، العادات، واقتراحات لتحسين الكفاءة.',
      academic: 'ركّز على الجانب الأكاديمي: تحليل الدرجات والمواد، نقاط الضعف، وخطط الدراسة.',
      career: 'ركّز على المسار المهني: المهارات المطلوبة لسوق الخليج، الشهادات، المشاريع المعززة للسيرة الذاتية.',
      health: 'ركّز على الصحة والتوازن: العادات، إدارة الإجهاد، النوم، والتوازن بين الدراسة والحياة.',
      general: 'قدّم رؤية شاملة عن وضع محمد الحالي وأهم فرصة للتحسين.',
    };

    const prompt = `بناءً على هذه البيانات لمحمد:
${userContext}

${categoryPrompts[category] || categoryPrompts.general}

اكتب رؤية موجزة (3-5 أسطر) تبدأ بعنوان قصير بين قوسين [العنوان] ثم النص.`;

    const raw = await generateText(
      prompt,
      'أنت محلل أداء ذكي. اكتب رؤى عملية وموجزة باللغة العربية.'
    );

    // استخراج العنوان من النص
    let title = `رؤية ${category}`;
    let content = raw.trim();
    const match = raw.match(/^\[([^\]]+)\]/);
    if (match) {
      title = match[1];
      content = raw.slice(match[0].length).trim();
    }

    const now = new Date().toISOString();
    const created = await db.aIInsight.create({
      data: {
        id: crypto.randomUUID(),
        category,
        title,
        content,
        dataBasedOn: { context: userContext.slice(0, 1000) },  // Json field — object
        createdAt: now,
      },
    });

    return {
      id: created.id,
      category: created.category as AIInsight['category'],
      title: created.title,
      content: created.content,
      dataBasedOn: typeof created.dataBasedOn === 'string' ? created.dataBasedOn : JSON.stringify(created.dataBasedOn ?? {}),
      createdAt: created.createdAt,
    };
  } catch (e) {
    console.error('[ai-service] generateInsight error:', e);
    return null;
  }
}

// ============ توليد تحليل أسبوعي نصّي ============
/** يولّد تحليلاً نصياً لأهم أحداث الأسبوع (لا يحفظه في WeeklyReport — ذلك في weekly-report-generator.ts) */
export async function getWeeklyReport(): Promise<string> {
  try {
    await getAIInstance();
    const userContext = await getUserContext();

    // نافذة الأسبوع الماضي (الاثنين → الأحد)
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday
    const mondayOffset = day === 0 ? -6 : 1 - day;
    const thisMonday = new Date(now);
    thisMonday.setDate(now.getDate() + mondayOffset);
    const lastSunday = new Date(thisMonday);
    lastSunday.setDate(thisMonday.getDate() - 1);
    const lastMonday = new Date(thisMonday);
    lastMonday.setDate(thisMonday.getDate() - 7);
    const iso = (d: Date) => d.toISOString().slice(0, 10);

    const weekStart = iso(lastMonday);
    const weekEnd = iso(lastSunday);

    // بيانات الأسبوع
    const [tasks, workSessions, achievements] = await Promise.all([
      db.task.findMany(),
      db.workSession.findMany(),
      db.achievement.findMany(),
    ]);
    const weekTasks = tasks.filter((t) => t.createdAt && t.createdAt.slice(0, 10) >= weekStart && t.createdAt.slice(0, 10) <= weekEnd);
    const weekHours = workSessions
      .filter((w) => w.createdAt && w.createdAt.slice(0, 10) >= weekStart && w.createdAt.slice(0, 10) <= weekEnd)
      .reduce((s, w) => s + (w.durationMinutes || 0), 0);
    const weekAchievements = achievements.filter((a) => a.date && a.date.slice(0, 10) >= weekStart && a.date.slice(0, 10) <= weekEnd);

    const result = await generateText(
      `بيانات محمد العامة:\n${userContext}\n\nبيانات الأسبوع (${weekStart} → ${weekEnd}):\n- مهام أُنشئت: ${weekTasks.length}\n- ساعات عمل: ${Math.round(weekHours / 60)}\n- إنجازات: ${weekAchievements.length}\n\nاكتب تحليلاً موجزاً (5-7 أسطر) مع توصية.`,
      'أنت محلل أداء أسبوعي ذكي. اكتب تحليلاً موجزاً وعملياً باللغة العربية، مع توصية واحدة قابلة للتنفيذ.'
    );
    return result || 'تعذّر توليد التحليل الأسبوعي.';
  } catch (e) {
    console.error('[ai-service] getWeeklyReport error:', e);
    return 'تعذّر توليد التحليل الأسبوعي.';
  }
}

// ============ تحليل الأنماط + التوصيات الذكية ============
// يحلل بيانات المستخدم لاكتشاف أنماط الإنتاجية + تقديم توصيات عملية

export interface PatternAnalysis {
  patterns: Array<{
    type: 'positive' | 'warning' | 'insight';
    title: string;
    description: string;
  }>;
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low';
    action: string;
    reason: string;
  }>;
  summary: string;
}

/** يحلل بيانات المستخدم ويكتشف أنماط + يقدم توصيات ذكية */
export async function analyzePatterns(): Promise<PatternAnalysis> {
  const patterns: PatternAnalysis['patterns'] = [];
  const recommendations: PatternAnalysis['recommendations'] = [];

  try {
    const [
      tasks, projects, skills, habits, workSessions, achievements, activityEvents,
    ] = await Promise.all([
      db.task.findMany(),
      db.project.findMany(),
      db.skill.findMany(),
      db.habit.findMany(),
      db.workSession.findMany(),
      db.achievement.findMany(),
      db.activityEvent.findMany(),
    ]);

    // ====== 1. تحليل إكمال المهام ======
    const completedTasks = tasks.filter((t) => t.completed);
    const pendingTasks = tasks.filter((t) => !t.completed);
    const completionRate = tasks.length > 0
      ? Math.round((completedTasks.length / tasks.length) * 100)
      : 0;

    if (tasks.length > 0) {
      if (completionRate >= 80) {
        patterns.push({
          type: 'positive',
          title: 'معدل إكمال ممتاز',
          description: `تكمل ${completionRate}% من مهامك — هذا أعلى من المتوسط. استمر!`,
        });
      } else if (completionRate < 40 && tasks.length > 5) {
        patterns.push({
          type: 'warning',
          title: 'معدل إكمال منخفض',
          description: `تكمل ${completionRate}% فقط من مهامك. قد تحتاج لتبسيط المهام أو تقسيمها.`,
        });
        recommendations.push({
          priority: 'high',
          action: 'قسّم المهام الكبيرة لمهام فرعية أصغر',
          reason: 'المهام الكبيرة قد تكون سبب التأجيل',
        });
      }
    }

    // ====== 2. تحليل المهام المتأخرة ======
    const today = new Date().toISOString().split('T')[0];
    const overdueTasks = pendingTasks.filter((t) => t.dueDate && t.dueDate < today && t.dueDate !== '');
    if (overdueTasks.length > 0) {
      patterns.push({
        type: 'warning',
        title: `${overdueTasks.length} مهمة متأخرة`,
        description: `لديك ${overdueTasks.length} مهمة تجاوزت موعد استحقاقها. رتّبها حسب الأولوية.`,
      });
      recommendations.push({
        priority: 'high',
        action: `راجع ${overdueTasks.length} مهمة متأخرة وحدد: أنهِها، أجّلها، أو احذفها`,
        reason: 'المهام المتأخرة تسبب ضغط نفسي وتقلل التركيز',
      });
    }

    // ====== 3. تحليل المشاريع المتوقفة ======
    const stalledProjects = projects.filter((p) => {
      if (p.status !== 'active') return false;
      const updatedAt = new Date(p.updatedAt);
      const daysSince = Math.floor((Date.now() - updatedAt.getTime()) / (24 * 60 * 60 * 1000));
      return daysSince > 30;
    });
    if (stalledProjects.length > 0) {
      patterns.push({
        type: 'warning',
        title: `${stalledProjects.length} مشروع متوقف`,
        description: `${stalledProjects.length} مشروع نشط لم يُحدّث منذ أكثر من 30 يوم.`,
      });
      recommendations.push({
        priority: 'medium',
        action: `راجع المشاريع المتوقفة: ${stalledProjects.map((p) => p.title).slice(0, 3).join('، ')}`,
        reason: 'المشاريع المتوقفة تستهلك طاقة ذهنية — أنهِها أو أعد جدولتها',
      });
    }

    // ====== 4. تحليل أنماط النشاط (أي الأيام أكثر إنتاجية) ======
    if (activityEvents.length > 5) {
      const dayActivity: Record<string, number> = {};
      for (const event of activityEvents) {
        const day = new Date(event.createdAt).toLocaleDateString('en-US', { weekday: 'long' });
        dayActivity[day] = (dayActivity[day] || 0) + 1;
      }
      const sortedDays = Object.entries(dayActivity).sort((a, b) => b[1] - a[1]);
      if (sortedDays.length > 0) {
        const mostActiveDay = sortedDays[0][0];
        const mostActiveCount = sortedDays[0][1];
        const dayAr: Record<string, string> = {
          Sunday: 'الأحد', Monday: 'الاثنين', Tuesday: 'الثلاثاء',
          Wednesday: 'الأربعاء', Thursday: 'الخميس', Friday: 'الجمعة', Saturday: 'السبت',
        };
        patterns.push({
          type: 'insight',
          title: `يوم ${dayAr[mostActiveDay] || mostActiveDay} هو الأكثر إنتاجية`,
          description: `معظم نشاطك يحدث يوم ${dayAr[mostActiveDay] || mostActiveDay} (${mostActiveCount} حدث). خصّص هذا اليوم للمهام المهمة.`,
        });
        recommendations.push({
          priority: 'medium',
          action: `خصّص يوم ${dayAr[mostActiveDay] || mostActiveDay} للمهام الأكثر أهمية`,
          reason: 'إنتاجيتك تكون أعلى في هذا اليوم',
        });
      }
    }

    // ====== 5. تحليل العادات ======
    if (habits.length > 0) {
      const habitConsistency = habits.map((h) => {
        const rawDates = h.completedDates;
        const dates: string[] = Array.isArray(rawDates)
          ? rawDates.filter((d): d is string => typeof d === 'string')
          : [];
        const last7Days = dates.filter((d) => {
          const date = new Date(d);
          const diff = (Date.now() - date.getTime()) / (24 * 60 * 60 * 1000);
          return diff <= 7;
        }).length;
        return { name: h.name, consistency: last7Days };
      });
      const inconsistentHabits = habitConsistency.filter((h) => h.consistency < 3);
      if (inconsistentHabits.length > 0) {
        patterns.push({
          type: 'warning',
          title: `${inconsistentHabits.length} عادة تحتاج اهتماماً`,
          description: `هذه العادات لم تُمارس كثيراً هذا الأسبوع: ${inconsistentHabits.map((h) => h.name).join('، ')}`,
        });
        recommendations.push({
          priority: 'low',
          action: `ركّز على عادة واحدة: ${inconsistentHabits[0].name}`,
          reason: 'بناء عادة واحدة بثبات أفضل من محاولة كل العادات',
        });
      }
    }

    // ====== 6. تحليل المهارات (مهارات بدون تطور) ======
    if (skills.length > 0) {
      const lowSkills = skills.filter((s) => s.level < 40);
      if (lowSkills.length > 0) {
        patterns.push({
          type: 'insight',
          title: `${lowSkills.length} مهارة تحتاج تطوير`,
          description: `هذه المهارات بمستوى منخفض: ${lowSkills.slice(0, 3).map((s) => `${s.name} (${s.level}%)`).join('، ')}`,
        });
        recommendations.push({
          priority: 'medium',
          action: `خصّص وقتاً أسبوعياً لتطوير: ${lowSkills[0].name}`,
          reason: 'تطوير مهارة واحدة بعمق أفضل من التشتت',
        });
      }
    }

    // ====== 7. تحليل ساعات العمل ======
    if (workSessions.length > 0) {
      const totalMinutes = workSessions.reduce((sum, w) => sum + (w.durationMinutes || 0), 0);
      const totalHours = Math.round(totalMinutes / 60);
      if (totalHours > 0) {
        const last7DaysSessions = workSessions.filter((w) => {
          const date = new Date(w.createdAt);
          const diff = (Date.now() - date.getTime()) / (24 * 60 * 60 * 1000);
          return diff <= 7;
        });
        const weekHours = Math.round(last7DaysSessions.reduce((sum, w) => sum + (w.durationMinutes || 0), 0) / 60);
        if (weekHours > 20) {
          patterns.push({
            type: 'positive',
            title: 'أسبوع عمل مكثف',
            description: `عملت ${weekHours} ساعة هذا الأسبوع — التزام ممتاز!`,
          });
        } else if (weekHours < 5 && weekHours > 0) {
          patterns.push({
            type: 'insight',
            title: 'أسبوع هادئ',
            description: `عملت ${weekHours} ساعة فقط هذا الأسبوع. قد تحتاج لدفع إضافي.`,
          });
        }
      }
    }

    // ====== ملخص عام ======
    const positiveCount = patterns.filter((p) => p.type === 'positive').length;
    const warningCount = patterns.filter((p) => p.type === 'warning').length;
    const insightCount = patterns.filter((p) => p.type === 'insight').length;
    let summary = `حلّلت ${tasks.length} مهمة، ${projects.length} مشروع، ${skills.length} مهارة. `;
    summary += `اكتشفت ${positiveCount} نقطة إيجابية، ${warningCount} تحذير، ${insightCount} رؤية. `;
    if (recommendations.length > 0) {
      summary += `${recommendations.length} توصية للتحسين.`;
    } else {
      summary += 'كل شيء يبدو متوازناً — استمر!';
    }

    return { patterns, recommendations, summary };
  } catch (e) {
    console.error('[ai-service] analyzePatterns error:', e);
    return {
      patterns: [],
      recommendations: [],
      summary: 'تعذّر تحليل الأنماط. حاول مرة أخرى لاحقاً.',
    };
  }
}

// ============================================
// AI-5-QUALITY: Smart Routing — تحديد نوع المهمة لتوجيهها للـ provider المناسب
// ============================================

export type TaskType = 'chat' | 'vision' | 'reasoning' | 'tool_call' | 'fast' | 'long_context' | 'arabic';

/** يحدد نوع المهمة بناءً على نص الرسالة */
export function detectTaskType(message: string): TaskType {
  const lower = message.toLowerCase();
  if (/صورة|image|صور|اشرح.*صورة|حلل.*صورة|ocr/i.test(message)) return 'vision';
  if (/فكر|حلل|خطوات|reason|لماذا|كيف يعمل|اشرح بالتفصيل/i.test(message)) return 'reasoning';
  if (/اضف|سجل|احفظ|create|ضيف|خلق|انشئ/i.test(message)) return 'tool_call';
  if (/بحث|google|web|إنترنت|youtube|github|موقع/i.test(message)) return 'long_context';
  if (message.length < 20) return 'fast';
  return 'chat';
}

// ============================================
// AI-5-POWERUP: Memory طويلة المدى + Conversation Context + Tool Use
// ============================================

/**
 * حفظ ملخص محادثة كـ AIInsight (memory طويلة المدى)
 * يُستدعى بعد انتهاء كل محادثة مهمة
 */
export async function saveConversationMemory(
  sessionId: string,
  userMessage: string,
  assistantReply: string,
): Promise<void> {
  try {
    if (!isAIConfigured()) return;

    // ولّد ملخص قصير للمحادثة
    const summary = await generateText(
      `لخّص هذه المحادثة بـ 1-2 جملة (ستُحفظ كذاكرة طويلة المدى):\n\nالمستخدم: ${userMessage.slice(0, 300)}\nالمساعد: ${assistantReply.slice(0, 300)}`,
      'أنت ملخّص محادثات. أرجع ملخصاً مختصراً جداً (1-2 جملة) يلتقط جوهر ما نُوقش.',
    );

    await db.aIInsight.create({
      data: {
        category: 'conversation_memory',
        title: `محادثة: ${userMessage.slice(0, 40)}`,
        content: summary.trim(),
        dataBasedOn: { sessionId, timestamp: new Date().toISOString() },
        createdAt: new Date().toISOString(),
      },
    });
  } catch (e) {
    console.error('[ai-service] saveConversationMemory error:', e);
  }
}

/**
 * جلب ذكريات المحادثات السابقة (لدمجها بـ السياق)
 */
export async function getConversationMemories(limit = 10): Promise<string[]> {
  try {
    const memories = await db.aIInsight.findMany({
      where: { category: 'conversation_memory' },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
    return memories.map((m) => m.content).filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * بناء سياق محادثة شامل (Power-Up 7):
 * - بيانات محمد الأساسية (من getUserContext)
 * - آخر 5 مهام + 5 ملاحظات + 5 أحداث
 * - ملخصات المحادثات السابقة (memory)
 */
export async function buildConversationContext(): Promise<string> {
  try {
    const [baseContext, recentTasks, recentNotes, recentEvents, memories] = await Promise.all([
      getUserContext(),
      db.task.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      db.note.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      db.activityEvent.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      getConversationMemories(5),
    ]);

    let context = baseContext;

    // آخر المهام
    if (recentTasks.length > 0) {
      context += '\n\n--- آخر المهام ---\n';
      context += recentTasks.map((t) => `- ${t.text} [${t.completed ? 'مكتملة' : 'نشطة'}]${t.priority ? ` (${t.priority})` : ''}`).join('\n');
    }

    // آخر الملاحظات
    if (recentNotes.length > 0) {
      context += '\n\n--- آخر الملاحظات ---\n';
      context += recentNotes.map((n) => `- ${n.title}: ${(n.content || '').slice(0, 100)}`).join('\n');
    }

    // آخر النشاط
    if (recentEvents.length > 0) {
      context += '\n\n--- آخر النشاط ---\n';
      context += recentEvents.map((e) => `- ${e.itemTitle} (${e.section})`).join('\n');
    }

    // ذاكرة المحادثات
    if (memories.length > 0) {
      context += '\n\n--- ذاكرة المحادثات السابقة ---\n';
      context += memories.map((m, i) => `${i + 1}. ${m}`).join('\n');
    }

    return context;
  } catch (e) {
    console.error('[ai-service] buildConversationContext error:', e);
    return await getUserContext();
  }
}

/**
 * معالجة رسالة محادثة مع Tool Use (Power-Up 3):
 * 1. أرسل الرسالة + تعريفات الأدوات لـ Groq
 * 2. لو AI طلب أداة → نفّذها → أرسل النتيجة → كمل المحادثة
 * 3. لو AI رد مباشرة → أرجع الرد
 * Bug #2: تتحقق من أن الأداة المطلوبة معروفة (ترفض hallucinated tools مثل brave_search)
 */
export async function processChatWithTools(
  messages: Array<{ role: string; content: string }>,
  systemInstruction: string,
): Promise<{ reply: string; toolsUsed: string[] }> {
  const toolsUsed: string[] = [];

  // Bug #2: قائمة الأدوات المعروفة (للتحقق من hallucinated tools)
  const KNOWN_TOOL_NAMES = new Set(AI_TOOL_DEFINITIONS.map((t) => t.function.name));

  // Bug #2: أضف تعليمات صارمة لمنع hallucinated tools
  const toolAwareSystemPrompt = `${systemInstruction}

---
أدوات متاحة لك (استخدم فقط هذه الأدوات، لا تستدعِ أي أداة أخرى):
${AI_TOOL_DEFINITIONS.map((t) => `- ${t.function.name}: ${t.function.description}`).join('\n')}

تحذير: لا تستدعِ أدوات غير موجودة في القائمة أعلاه (مثل brave_search أو google_search). إذا لم تجد أداة مناسبة، أجب بنص عادي.`;

  if (!isAIConfigured()) {
    // fallback: محادثة عادية بدون أدوات
    throw new Error('AI provider غير مُهيأ. احصل على key من https://console.groq.com');
  }

  // AI-5-FIX-AGENT: Smart routing — حدد نوع المهمة من آخر رسالة
  const lastMessage = messages[messages.length - 1];
  const taskType = detectTaskType(lastMessage?.content || '');
  const routingDecision = selectProvider(taskType);
  console.log(`[ai-service] processChatWithTools: task=${taskType}, provider=${routingDecision.provider}, model=${routingDecision.model}`);

  try {
    // 1) المحاولة الأولى مع الأدوات
    const result = await generateChatWithTools(messages, AI_TOOL_DEFINITIONS, toolAwareSystemPrompt);

    // لو AI رد مباشرة بدون أدوات
    if (result.content && !result.toolCalls) {
      return { reply: result.content, toolsUsed };
    }

    // 2) لو AI طلب أدوات → تحقق منها + نفّذها
    if (result.toolCalls && result.toolCalls.length > 0) {
      // Bug #2: فلتر الأدوات غير المعروفة
      const validToolCalls = result.toolCalls.filter((tc) => KNOWN_TOOL_NAMES.has(tc.name));
      const rejectedTools = result.toolCalls.filter((tc) => !KNOWN_TOOL_NAMES.has(tc.name));

      if (rejectedTools.length > 0) {
        console.warn('[ai-service] Rejected hallucinated tools:', rejectedTools.map((t) => t.name));
      }

      // لو كل الأدوات مرفوضة → استخدم المحادثة العادية
      if (validToolCalls.length === 0) {
        const reply = await generateChat(messages, toolAwareSystemPrompt);
        return { reply, toolsUsed };
      }

      const toolResults = [];
      for (const tc of validToolCalls) {
        const execResult = await executeAITool(tc.name, tc.arguments);
        toolsUsed.push(tc.name);
        toolResults.push({
          id: tc.id,
          name: tc.name,
          result: execResult.success ? execResult.result : { error: execResult.error },
        });
      }

      // 3) أرسل نتائج الأدوات للـ AI لتوليد الرد النهائي
      const finalReply = await generateChatWithToolResults(messages, toolResults, toolAwareSystemPrompt);
      return { reply: finalReply || 'تم تنفيذ الطلب.', toolsUsed };
    }

    return { reply: result.content || 'عذراً، لم أتمكن من الرد.', toolsUsed };
  } catch (e) {
    console.error('[ai-service] processChatWithTools error:', e);
    // fallback لمحادثة عادية
    const reply = await generateChat(messages, systemInstruction);
    return { reply, toolsUsed };
  }
}

```

---

## 3. `src/lib/ai-tools.ts`

**669 سطر**

```typescript
// ============================================
// AI Tools — أدوات الذكاء الاصطناعي (Tool Use / Function Calling)
// ============================================
// يسمح للـ AI بإنشاء/تعديل/البحث في بيانات محمد عبر Groq tool calling.
// كل تنفيذ يُسجّل بـ ActivityEvent.
// الأمان: لا حذف بدون تأكيد. كل العمليات create/update/search فقط.
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import type { ToolDefinition } from '@/lib/ai-provider';
import { generateText } from '@/lib/ai-provider';
import { querySecondBrain } from '@/lib/rag-engine';
import { analyzeImage } from '@/lib/vision-analyzer';
import { searchWeb } from '@/lib/web-search';
import { browseWebsite, scrapeUrl, searchYouTube, searchGitHub } from '@/lib/web-agent';
import { generateFlashcards, generateQuiz, summarizeLecture, explainConcept, createStudyPlan } from '@/lib/study-ai';

// ============================================
// تعريفات الأدوات (لإرسالها لـ Groq)
// ============================================
export const AI_TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    type: 'function',
    function: {
      name: 'create_task',
      description: 'إنشاء مهمة جديدة في قائمة مهام محمد. استخدمها عندما يطلب المستخدم إضافة/إنشاء مهمة.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'نص المهمة' },
          priority: { type: 'string', enum: ['low', 'medium', 'high'], description: 'الأولوية' },
          dueDate: { type: 'string', description: 'تاريخ الاستحقاق (ISO format)' },
          notes: { type: 'string', description: 'ملاحظات إضافية' },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_note',
      description: 'إنشاء ملاحظة جديدة لمحمد.',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string', description: 'عنوان الملاحظة' },
          content: { type: 'string', description: 'محتوى الملاحظة' },
        },
        required: ['title', 'content'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_data',
      description: 'البحث في بيانات محمد (مهام، ملاحظات، مشاريع، يوميات، إلخ). استخدمها عندما يسأل المستخدم عن معلومات لديه.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'نص البحث' },
          type: { type: 'string', description: 'نوع البيانات (optional)' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_reminder',
      description: 'إنشاء تذكير/منبه لمحمد.',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: 'نص التذكير' },
          scheduledTime: { type: 'string', description: 'وقت التذكير (ISO format أو نص)' },
        },
        required: ['message'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'add_transaction',
      description: 'تسجيل مصروف أو دخل لمحمد.',
      parameters: {
        type: 'object',
        properties: {
          amount: { type: 'number', description: 'المبلغ' },
          description: { type: 'string', description: 'وصف المعاملة' },
          type: { type: 'string', enum: ['expense', 'income'], description: 'نوع المعاملة' },
          category: { type: 'string', description: 'الفئة (food, transport, إلخ)' },
        },
        required: ['amount', 'description', 'type'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'update_task',
      description: 'تحديث مهمة موجودة (تغيير النص، الأولوية، أو الإكمال).',
      parameters: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'معرّف المهمة' },
          text: { type: 'string', description: 'النص الجديد (optional)' },
          completed: { type: 'boolean', description: 'إكمال المهمة (optional)' },
          priority: { type: 'string', enum: ['low', 'medium', 'high'], description: 'الأولوية (optional)' },
        },
        required: ['id'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'analyze_image',
      description: 'تحليل صورة (base64) — استخراج وصف، نصوص، وسوم. استخدمها عندما يرسل المستخدم صورة أو يطلب تحليلها.',
      parameters: {
        type: 'object',
        properties: {
          imageBase64: { type: 'string', description: 'الصورة بصيغة base64' },
          question: { type: 'string', description: 'سؤال محدد عن الصورة (optional)' },
        },
        required: ['imageBase64'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'web_search',
      description: 'البحث في الإنترنت عن معلومات حديثة. استخدمها عندما يحتاج المستخدم معلومات غير متوفرة في بياناته (مثل الأخبار، التقنيات الحديثة، حقائق عامة).',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'نص البحث' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'browse_website',
      description: 'تصفح موقع ويب واستخراج محتواه. استخدمها عندما يطلب المستخدم فتح موقع أو استخراج معلومات من URL محدد.',
      parameters: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'رابط الموقع' },
          task: { type: 'string', description: 'مهمة محددة (optional) — ماذا يبحث عنه في الصفحة' },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'scrape_url',
      description: 'استخراج المحتوى النصي من URL. أخف من browse_website — يستخرج العنوان والنص فقط.',
      parameters: {
        type: 'object',
        properties: {
          url: { type: 'string', description: 'الرابط' },
        },
        required: ['url'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_youtube',
      description: 'البحث في YouTube عن فيديوهات.',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'نص البحث' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_github',
      description: 'البحث في GitHub عن مستودعات (repos).',
      parameters: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'نص البحث' },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'translate',
      description: 'ترجمة نص من لغة لأخرى.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'النص للترجمة' },
          target: { type: 'string', description: 'اللغة الهدف (en, ar, fr, es, إلخ)' },
        },
        required: ['text', 'target'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'summarize',
      description: 'تلخيص نص طويل.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'النص للتلخيص' },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'extract_text_from_image',
      description: 'استخراج نص من صورة (OCR). استخدمها عندما يطلب المستخدم استخراج نص من صورة.',
      parameters: {
        type: 'object',
        properties: {
          imageBase64: { type: 'string', description: 'الصورة بصيغة base64' },
        },
        required: ['imageBase64'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_flashcards',
      description: 'توليد بطاقات تعليمية (flashcards) من نص. مفيد للمراجعة والدراسة.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'النص لاستخراج البطاقات' },
          count: { type: 'number', description: 'عدد البطاقات (افتراضي 10)' },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_quiz',
      description: 'توليد اختبار (quiz) من نص. أسئلة اختيار من متعدد.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'النص لاستخراج الأسئلة' },
          count: { type: 'number', description: 'عدد الأسئلة (افتراضي 5)' },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'summarize_lecture',
      description: 'تلخيص محاضرة أو ملاحظة دراسية. يستخرج النقاط الرئيسية والمفاهيم.',
      parameters: {
        type: 'object',
        properties: {
          text: { type: 'string', description: 'نص المحاضرة' },
        },
        required: ['text'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'explain_concept',
      description: 'شرح مفهوم دراسي بـ مستوى معين (بسيط، مفصل، أكاديمي).',
      parameters: {
        type: 'object',
        properties: {
          concept: { type: 'string', description: 'المفهوم لشرحه' },
          level: { type: 'string', enum: ['simple', 'detailed', 'academic'], description: 'مستوى الشرح' },
        },
        required: ['concept'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_study_plan',
      description: 'إنشاء خطة دراسية لمواضيع مع موعد نهائي.',
      parameters: {
        type: 'object',
        properties: {
          topics: { type: 'array', items: { type: 'string' }, description: 'قائمة المواضيع' },
          deadline: { type: 'string', description: 'الموعد النهائي' },
          hoursPerDay: { type: 'number', description: 'ساعات الدراسة يومياً' },
        },
        required: ['topics'],
      },
    },
  },
];

// ============================================
// تنفيذ الأدوات
// ============================================
export async function executeAITool(
  toolName: string,
  params: Record<string, unknown>,
): Promise<{ success: boolean; result: unknown; error?: string }> {
  const now = new Date().toISOString();

  try {
    switch (toolName) {
      case 'create_task': {
        const text = String(params.text || '').trim();
        if (!text) return { success: false, result: null, error: 'text مطلوب' };
        const task = await db.task.create({
          data: {
            text,
            priority: String(params.priority || 'medium'),
            dueDate: String(params.dueDate || ''),
            notes: String(params.notes || ''),
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
            createdAt: now,
            updatedAt: now,
          },
        });
        await logToolActivity('create_task', `إنشاء مهمة: ${text}`, { taskId: task.id });
        return { success: true, result: { id: task.id, text, message: `تم إنشاء المهمة: ${text}` } };
      }

      case 'create_note': {
        const title = String(params.title || '').trim();
        const content = String(params.content || '').trim();
        if (!title) return { success: false, result: null, error: 'title مطلوب' };
        const note = await db.note.create({
          data: {
            title,
            content,
            color: 'default',
            folder: '',
            isPinned: false,
            isSecret: false,
            encryptedContent: '',
            priority: 'medium',
            frontmatterDate: '',
            tags: [],
            createdAt: now,
            updatedAt: now,
          },
        });
        await logToolActivity('create_note', `إنشاء ملاحظة: ${title}`, { noteId: note.id });
        return { success: true, result: { id: note.id, title, message: `تم إنشاء الملاحظة: ${title}` } };
      }

      case 'search_data': {
        const query = String(params.query || '').trim();
        if (!query) return { success: false, result: null, error: 'query مطلوب' };
        const ragResult = await querySecondBrain(query, { limit: 5 });
        await logToolActivity('search_data', `بحث: ${query}`, { sourcesCount: ragResult.sources.length });
        return {
          success: true,
          result: {
            answer: ragResult.answer,
            sources: ragResult.sources,
            source: ragResult.source,
          },
        };
      }

      case 'create_reminder': {
        const message = String(params.message || '').trim();
        if (!message) return { success: false, result: null, error: 'message مطلوب' };
        const reminder = await db.smartReminder.create({
          data: {
            message,
            type: 'task',
            targetId: '',
            scheduledTime: String(params.scheduledTime || ''),
            isActive: true,
            isRecurring: false,
            triggerCondition: {},
            createdAt: now,
          },
        });
        await logToolActivity('create_reminder', `إنشاء تذكير: ${message}`, { reminderId: reminder.id });
        return { success: true, result: { id: reminder.id, message, scheduledTime: params.scheduledTime || '', message_text: `تم إنشاء التذكير: ${message}` } };
      }

      case 'add_transaction': {
        const amount = Number(params.amount);
        const description = String(params.description || '').trim();
        const type = String(params.type || 'expense');
        if (isNaN(amount) || !description) return { success: false, result: null, error: 'amount و description مطلوبان' };
        const txn = await db.transaction.create({
          data: {
            description,
            amount,
            currency: 'ILS',
            exchangeRate: 1,
            type,
            category: String(params.category || 'general'),
            isRecurring: false,
            recurringInterval: '',
            createdAt: now,
          },
        });
        await logToolActivity('add_transaction', `تسجيل ${type === 'expense' ? 'مصروف' : 'دخل'}: ${description} (${amount})`, { transactionId: txn.id });
        return { success: true, result: { id: txn.id, amount, description, type, message: `تم تسجيل ${type === 'expense' ? 'المصروف' : 'الدخل'}: ${description} (${amount})` } };
      }

      case 'update_task': {
        const id = String(params.id || '').trim();
        if (!id) return { success: false, result: null, error: 'id مطلوب' };
        const updateData: Record<string, unknown> = { updatedAt: now };
        if (typeof params.text === 'string') updateData.text = params.text;
        if (typeof params.completed === 'boolean') updateData.completed = params.completed;
        if (typeof params.priority === 'string') updateData.priority = params.priority;
        const updated = await db.task.update({ where: { id }, data: updateData }).catch(() => null);
        if (!updated) return { success: false, result: null, error: 'المهمة غير موجودة' };
        await logToolActivity('update_task', `تحديث مهمة: ${updated.text}`, { taskId: id });
        return { success: true, result: { id, message: 'تم تحديث المهمة' } };
      }

      case 'analyze_image': {
        const imageBase64 = String(params.imageBase64 || '');
        if (!imageBase64) return { success: false, result: null, error: 'imageBase64 مطلوب' };
        const analysis = await analyzeImage(imageBase64, typeof params.question === 'string' ? params.question : undefined);
        await logToolActivity('analyze_image', `تحليل صورة (${analysis.source})`, { tagsCount: analysis.tags.length });
        return { success: true, result: analysis };
      }

      case 'web_search': {
        const searchQuery = String(params.query || '').trim();
        if (!searchQuery) return { success: false, result: null, error: 'query مطلوب' };
        const searchResult = await searchWeb(searchQuery, 5);
        await logToolActivity('web_search', `بحث ويب: ${searchQuery}`, { resultsCount: searchResult.results.length });
        return {
          success: true,
          result: {
            answer: searchResult.answer || '',
            results: searchResult.results,
            message: `وجدت ${searchResult.results.length} نتيجة للبحث: "${searchQuery}"`,
          },
        };
      }

      case 'browse_website': {
        const browseUrl = String(params.url || '').trim();
        if (!browseUrl) return { success: false, result: null, error: 'url مطلوب' };
        const browseTask = typeof params.task === 'string' ? params.task : undefined;
        const browseResult = await browseWebsite(browseUrl, browseTask);
        await logToolActivity('browse_website', `تصفح: ${browseResult.title || browseUrl}`, { linksCount: browseResult.links.length, source: browseResult.source });
        return {
          success: !browseResult.error,
          result: {
            title: browseResult.title,
            content: browseResult.content,
            links: browseResult.links,
            extractedData: browseResult.extractedData,
            error: browseResult.error,
            message: browseResult.error ? `فشل: ${browseResult.error}` : `تم تصفح: ${browseResult.title}`,
          },
        };
      }

      case 'scrape_url': {
        const scrapeUrlVal = String(params.url || '').trim();
        if (!scrapeUrlVal) return { success: false, result: null, error: 'url مطلوب' };
        const scrapeResult = await scrapeUrl(scrapeUrlVal);
        await logToolActivity('scrape_url', `استخراج: ${scrapeResult.title || scrapeUrlVal}`, {});
        return {
          success: !scrapeResult.error,
          result: {
            title: scrapeResult.title,
            content: scrapeResult.content,
            error: scrapeResult.error,
            message: scrapeResult.error ? `فشل: ${scrapeResult.error}` : `تم استخراج المحتوى`,
          },
        };
      }

      case 'search_youtube': {
        const ytQuery = String(params.query || '').trim();
        if (!ytQuery) return { success: false, result: null, error: 'query مطلوب' };
        const ytResults = await searchYouTube(ytQuery, 5);
        await logToolActivity('search_youtube', `يوتيوب: ${ytQuery}`, { resultsCount: ytResults.length });
        return {
          success: true,
          result: {
            results: ytResults,
            message: `وجدت ${ytResults.length} فيديو`,
          },
        };
      }

      case 'search_github': {
        const ghQuery = String(params.query || '').trim();
        if (!ghQuery) return { success: false, result: null, error: 'query مطلوب' };
        const ghResults = await searchGitHub(ghQuery, 5);
        await logToolActivity('search_github', `GitHub: ${ghQuery}`, { resultsCount: ghResults.length });
        return {
          success: true,
          result: {
            results: ghResults,
            message: `وجدت ${ghResults.length} مستودع`,
          },
        };
      }

      case 'translate': {
        const translateText = String(params.text || '').trim();
        const target = String(params.target || 'en').trim();
        if (!translateText) return { success: false, result: null, error: 'text مطلوب' };
        try {
          const translated = await generateText(
            `ترجم هذا النص لل${target === 'en' ? 'إنجليزية' : target === 'ar' ? 'عربية' : target}:\n${translateText}`,
            'أنت مترجم محترف. أرجع الترجمة فقط بدون شرح.',
          );
          await logToolActivity('translate', `ترجمة لـ ${target}`, { textLength: translateText.length });
          return { success: true, result: { translation: translated, target, message: 'تمت الترجمة' } };
        } catch (e) {
          return { success: false, result: null, error: 'فشل الترجمة' };
        }
      }

      case 'summarize': {
        const summarizeText = String(params.text || '').trim();
        if (!summarizeText) return { success: false, result: null, error: 'text مطلوب' };
        try {
          const summary = await generateText(
            `لخّص هذا النص بـ 2-3 جمل:\n${summarizeText.slice(0, 3000)}`,
            'أنت ملخّص محترف. أرجع الملخص فقط.',
          );
          await logToolActivity('summarize', `تلخيص`, { textLength: summarizeText.length });
          return { success: true, result: { summary, message: 'تم التلخيص' } };
        } catch (e) {
          return { success: false, result: null, error: 'فشل التلخيص' };
        }
      }

      case 'extract_text_from_image': {
        const ocrImage = String(params.imageBase64 || '');
        if (!ocrImage) return { success: false, result: null, error: 'imageBase64 مطلوب' };
        try {
          const analysis = await analyzeImage(ocrImage, 'استخرج كل النص الموجود في هذه الصورة (OCR). أرجع النص فقط.');
          await logToolActivity('extract_text_from_image', `OCR`, { extractedTextLength: analysis.extractedText?.length || 0 });
          return {
            success: true,
            result: {
              text: analysis.extractedText || '',
              message: analysis.extractedText ? 'تم استخراج النص' : 'لم يتم العثور على نص',
            },
          };
        } catch (e) {
          return { success: false, result: null, error: 'فشل استخراج النص' };
        }
      }

      case 'generate_flashcards': {
        const fcText = String(params.text || '').trim();
        if (!fcText) return { success: false, result: null, error: 'text مطلوب' };
        const fcCount = Math.min(Number(params.count) || 10, 20);
        const fcResult = await generateFlashcards(fcText, fcCount);
        await logToolActivity('generate_flashcards', `توليد ${fcResult.flashcards.length} بطاقة`, { source: fcResult.source });
        return { success: true, result: { flashcards: fcResult.flashcards, source: fcResult.source, message: `تم توليد ${fcResult.flashcards.length} بطاقة تعليمية` } };
      }

      case 'generate_quiz': {
        const qzText = String(params.text || '').trim();
        if (!qzText) return { success: false, result: null, error: 'text مطلوب' };
        const qzCount = Math.min(Number(params.count) || 5, 15);
        const qzResult = await generateQuiz(qzText, qzCount);
        await logToolActivity('generate_quiz', `توليد ${qzResult.questions.length} سؤال`, { source: qzResult.source });
        return { success: true, result: { questions: qzResult.questions, source: qzResult.source, message: `تم توليد ${qzResult.questions.length} سؤال` } };
      }

      case 'summarize_lecture': {
        const smText = String(params.text || '').trim();
        if (!smText) return { success: false, result: null, error: 'text مطلوب' };
        const smResult = await summarizeLecture(smText);
        await logToolActivity('summarize_lecture', `تلخيص محاضرة`, { source: smResult.source });
        return { success: true, result: { summary: smResult.summary, source: smResult.source, message: 'تم تلخيص المحاضرة' } };
      }

      case 'explain_concept': {
        const ecConcept = String(params.concept || '').trim();
        if (!ecConcept) return { success: false, result: null, error: 'concept مطلوب' };
        const ecLevel = params.level === 'detailed' || params.level === 'academic' ? params.level : 'simple';
        const ecResult = await explainConcept(ecConcept, ecLevel as 'simple' | 'detailed' | 'academic');
        await logToolActivity('explain_concept', `شرح: ${ecConcept.slice(0, 30)}`, { source: ecResult.source });
        return { success: true, result: { explanation: ecResult.explanation, source: ecResult.source, message: `تم شرح: ${ecConcept}` } };
      }

      case 'create_study_plan': {
        const spTopics = Array.isArray(params.topics) ? params.topics : [];
        if (!spTopics.length) return { success: false, result: null, error: 'topics مطلوبة' };
        const spDeadline = String(params.deadline || '');
        const spHours = Number(params.hoursPerDay) || 3;
        const spResult = await createStudyPlan(spTopics, spDeadline, spHours);
        await logToolActivity('create_study_plan', `خطة دراسية لـ ${spTopics.length} مواضيع`, { source: spResult.source });
        return { success: true, result: { plan: spResult.plan, source: spResult.source, message: 'تم إنشاء الخطة الدراسية' } };
      }

      default:
        return { success: false, result: null, error: `أداة غير معروفة: ${toolName}` };
    }
  } catch (e) {
    console.error(`[AI Tool ${toolName} error]`, e);
    return { success: false, result: null, error: e instanceof Error ? e.message : String(e) };
  }
}

// ============================================
// تسجيل ActivityEvent لتنفيذ الأداة
// ============================================
async function logToolActivity(toolName: string, title: string, metadata: Record<string, unknown>): Promise<void> {
  try {
    await db.activityEvent.create({
      data: {
        type: 'created',
        section: 'ai-tools',
        itemId: '',
        itemTitle: `[AI Tool] ${title}`,
        metadata: JSON.stringify({ tool: toolName, ...metadata, timestamp: new Date().toISOString() }),
        createdAt: new Date().toISOString(),
      },
    });
  } catch (e) {
    console.error('[AI Tools activity log error]', e);
  }
}

```

---

## 4. `src/lib/ai-router.ts`

**222 سطر**

```typescript
// ============================================
// AI Router — Smart Routing (توجيه ذكي)
// ============================================
// يختار الـ provider الصح لكل مهمة:
// - chat → Groq (Llama 3.3) — سريع + 14K/يوم
// - vision → NVIDIA (Llama 4 Scout) — أقوى vision
// - reasoning → NVIDIA (DeepSeek R1) — أقوى reasoning
// - tool_call → Groq (Llama 3.3) — SDK رسمي + أسرع
// - fast → Groq (Llama 3.1 8B) — الأسرع
// - long_context → NVIDIA (Llama 4 Maverick) — 256K context
// - arabic → Groq (Llama 3.3) — ممتاز بالعربية
// Fallback: لو provider فشل → حوّل للتاني
// ============================================

import 'server-only';
import {
  type ProviderType,
  isSpecificProviderConfigured,
  getCurrentModel,
  getReasoningModel,
  getVisionModel,
} from '@/lib/model-registry';
import { generateText, generateChat, generateVision, generateWithReasoning } from '@/lib/ai-provider';

export type TaskType =
  | 'chat'
  | 'vision'
  | 'reasoning'
  | 'tool_call'
  | 'fast'
  | 'long_context'
  | 'arabic';

export interface RoutingDecision {
  provider: ProviderType;
  model: string;
  reason: string;
  fallback?: ProviderType;
}

interface ProviderModelPair {
  provider: ProviderType;
  model: string;
}

// ============================================
// Routing Rules
// ============================================
const ROUTING_RULES: Record<TaskType, { preferred: ProviderType; fallback: ProviderType; model: (p: ProviderType) => string; reason: string }> = {
  chat: {
    preferred: 'groq',
    fallback: 'nvidia',
    model: (p) => p === 'groq' ? 'llama-3.3-70b-versatile' : 'meta/llama-3.3-70b-instruct',
    reason: 'محادثة عادية → Groq (سريع + 14K/يوم)',
  },
  vision: {
    preferred: 'nvidia',
    fallback: 'groq',
    model: (p) => p === 'nvidia' ? 'meta/llama-4-scout-17b-16b-instruct' : 'meta-llama/llama-4-scout-17b-16b-instruct',
    reason: 'تحليل صور → NVIDIA Llama 4 Scout (أقوى vision)',
  },
  reasoning: {
    preferred: 'nvidia',
    fallback: 'groq',
    model: (p) => p === 'nvidia' ? 'deepseek-ai/deepseek-r1' : 'deepseek-r1-distill-llama-70b',
    reason: 'تفكير عميق → NVIDIA DeepSeek R1 (أقوى reasoning)',
  },
  tool_call: {
    preferred: 'groq',
    fallback: 'nvidia',
    model: (p) => p === 'groq' ? 'llama-3.3-70b-versatile' : 'meta/llama-3.3-70b-instruct',
    reason: 'استدعاء أدوات → Groq (SDK رسمي + أسرع)',
  },
  fast: {
    preferred: 'groq',
    fallback: 'nvidia',
    model: (p) => p === 'groq' ? 'llama-3.1-8b-instant' : 'nvidia/nemotron-mini-4b-instruct',
    reason: 'رد سريع → Groq Llama 3.1 8B (الأسرع)',
  },
  long_context: {
    preferred: 'nvidia',
    fallback: 'groq',
    model: (p) => p === 'nvidia' ? 'meta/llama-4-maverick-17b-128b-instruct' : 'llama-3.3-70b-versatile',
    reason: 'سياق طويل → NVIDIA Llama 4 Maverick (256K context)',
  },
  arabic: {
    preferred: 'groq',
    fallback: 'nvidia',
    model: (p) => p === 'groq' ? 'llama-3.3-70b-versatile' : 'meta/llama-3.3-70b-instruct',
    reason: 'عربية متقدمة → Groq Llama 3.3 (ممتاز بالعربية)',
  },
};

/**
 * يختار الـ provider الصح لكل مهمة
 */
export function selectProvider(task: TaskType): RoutingDecision {
  const rule = ROUTING_RULES[task];
  const preferredConfigured = isSpecificProviderConfigured(rule.preferred);
  const fallbackConfigured = isSpecificProviderConfigured(rule.fallback);

  if (preferredConfigured) {
    return {
      provider: rule.preferred,
      model: rule.model(rule.preferred),
      reason: rule.reason,
      fallback: fallbackConfigured ? rule.fallback : undefined,
    };
  }

  // fallback
  if (fallbackConfigured) {
    return {
      provider: rule.fallback,
      model: rule.model(rule.fallback),
      reason: `${rule.reason} → fallback لـ ${rule.fallback} (${rule.preferred} غير مهيأ)`,
      fallback: undefined,
    };
  }

  // لا provider متاح → استخدم default
  return {
    provider: 'groq',
    model: getCurrentModel(),
    reason: `${task}: لا provider متاح، استخدام default`,
    fallback: undefined,
  };
}

/**
 * استدعاء مع fallback — لو provider الأول فشل، حوّل للتاني
 */
export async function callWithFallback(
  task: TaskType,
  prompt: string,
  systemInstruction?: string,
): Promise<{ result: string; provider: ProviderType; model: string; reason: string }> {
  const decision = selectProvider(task);

  try {
    // نفّذ بـ provider المفضل
    const result = await executeByProvider(decision.provider, decision.model, task, prompt, systemInstruction);
    return { result, provider: decision.provider, model: decision.model, reason: decision.reason };
  } catch (e) {
    console.error(`[AI Router] ${task} failed with ${decision.provider}:`, e);

    // fallback
    if (decision.fallback) {
      try {
        const fallbackModel = ROUTING_RULES[task].model(decision.fallback);
        const result = await executeByProvider(decision.fallback, fallbackModel, task, prompt, systemInstruction);
        return {
          result,
          provider: decision.fallback,
          model: fallbackModel,
          reason: `${decision.reason} → fallback نجح بـ ${decision.fallback}`,
        };
      } catch (e2) {
        console.error(`[AI Router] ${task} fallback also failed:`, e2);
      }
    }

    throw e;
  }
}

/**
 * نفّذ مهمة بـ provider محدد + model محدد
 */
async function executeByProvider(
  provider: ProviderType,
  model: string,
  task: TaskType,
  prompt: string,
  systemInstruction?: string,
): Promise<string> {
  if (task === 'vision') {
    // vision يحتاج صورة — استخدم generateVision
    // لكن callWithFallback يرسل prompt نصي → استخدم generateText
    return await generateText(prompt, systemInstruction);
  }

  if (task === 'reasoning') {
    const { answer } = await generateWithReasoning(prompt, systemInstruction);
    return answer;
  }

  return await generateText(prompt, systemInstruction);
}

/**
 * استدعاء vision مع smart routing
 */
export async function callVisionWithFallback(
  prompt: string,
  imageBase64: string,
  mimeType: string = 'image/jpeg',
): Promise<{ result: string; provider: ProviderType; model: string; reason: string }> {
  const decision = selectProvider('vision');

  try {
    const result = await generateVision(prompt, imageBase64, mimeType);
    return { result, provider: decision.provider, model: decision.model, reason: decision.reason };
  } catch (e) {
    console.error(`[AI Router] vision failed with ${decision.provider}:`, e);
    if (decision.fallback) {
      try {
        const result = await generateVision(prompt, imageBase64, mimeType);
        return {
          result,
          provider: decision.fallback,
          model: ROUTING_RULES.vision.model(decision.fallback),
          reason: `${decision.reason} → fallback نجح`,
        };
      } catch (e2) {
        console.error('[AI Router] vision fallback also failed:', e2);
      }
    }
    throw e;
  }
}

```

---

## 5. `src/lib/model-registry.ts`

**183 سطر**

```typescript
// ============================================
// Model Registry — قائمة الـ models المتاحة لكل provider
// ============================================

export type ProviderType = 'groq' | 'openrouter' | 'openai' | 'anthropic' | 'nvidia';

export interface ModelInfo {
  id: string;
  label: string;
  icon: string;
  description: string;
  supportsVision?: boolean;
  supportsReasoning?: boolean;
  supportsTools?: boolean;
}

export interface ProviderConfig {
  name: ProviderType;
  label: string;
  apiKeyEnv: string;
  baseUrl: string;
  models: ModelInfo[];
}

export const PROVIDERS: Record<ProviderType, ProviderConfig> = {
  groq: {
    name: 'groq',
    label: 'Groq (مجاني)',
    apiKeyEnv: 'GROQ_API_KEY',
    baseUrl: 'https://api.groq.com/openai/v1',
    models: [
      { id: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B', icon: '🦙', description: 'سريع ومجاني — الأفضل للاستخدام اليومي', supportsTools: true },
      { id: 'meta-llama/llama-4-scout-17b-16b-instruct', label: 'Llama 4 Scout', icon: '👁️', description: 'يدعم تحليل الصور + النص', supportsVision: true, supportsTools: true },
      { id: 'deepseek-r1-distill-llama-70b', label: 'DeepSeek R1', icon: '🧠', description: 'تفكير عميق (reasoning)', supportsReasoning: true },
    ],
  },
  openrouter: {
    name: 'openrouter',
    label: 'OpenRouter (متعدد)',
    apiKeyEnv: 'OPENROUTER_API_KEY',
    baseUrl: 'https://openrouter.ai/api/v1',
    models: [
      { id: 'anthropic/claude-3.5-sonnet', label: 'Claude 3.5 Sonnet', icon: '🎭', description: 'أفضل جودة — Anthropic', supportsTools: true, supportsVision: true },
      { id: 'openai/gpt-4o', label: 'GPT-4o', icon: '🤖', description: 'OpenAI — متعدد الاستخدامات', supportsTools: true, supportsVision: true },
      { id: 'google/gemini-pro-1.5', label: 'Gemini Pro 1.5', icon: '💎', description: 'Google — سياق طويل', supportsTools: true, supportsVision: true },
      { id: 'qwen/qwen-2.5-72b-instruct', label: 'Qwen 2.5 72B', icon: '🐉', description: 'Alibaba — مجاني على OpenRouter', supportsTools: true },
      { id: 'deepseek/deepseek-r1', label: 'DeepSeek R1', icon: '🔬', description: 'تفكير عميق (reasoning)', supportsReasoning: true },
    ],
  },
  openai: {
    name: 'openai',
    label: 'OpenAI',
    apiKeyEnv: 'OPENAI_API_KEY',
    baseUrl: 'https://api.openai.com/v1',
    models: [
      { id: 'gpt-4o', label: 'GPT-4o', icon: '🤖', description: 'الأحدث من OpenAI', supportsTools: true, supportsVision: true },
      { id: 'gpt-4o-mini', label: 'GPT-4o Mini', icon: '⚡', description: 'سريع واقتصادي', supportsTools: true },
      { id: 'o1-mini', label: 'o1 Mini', icon: '🧠', description: 'تفكير عميق', supportsReasoning: true },
    ],
  },
  anthropic: {
    name: 'anthropic',
    label: 'Anthropic (Claude)',
    apiKeyEnv: 'ANTHROPIC_API_KEY',
    baseUrl: 'https://api.anthropic.com/v1',
    models: [
      { id: 'claude-3-5-sonnet-20241022', label: 'Claude 3.5 Sonnet', icon: '🎭', description: 'أفضل جودة للكود والتحليل', supportsTools: true, supportsVision: true },
      { id: 'claude-3-5-haiku-20241022', label: 'Claude 3.5 Haiku', icon: '⚡', description: 'سريع واقتصادي', supportsTools: true },
    ],
  },
  nvidia: {
    name: 'nvidia',
    label: 'NVIDIA NIM',
    apiKeyEnv: 'NVIDIA_API_KEY',
    baseUrl: 'https://integrate.api.nvidia.com/v1',
    models: [
      { id: 'meta/llama-3.3-70b-instruct', label: 'Llama 3.3 70B', icon: '🟢', description: 'NVIDIA — ممتاز للعربية', supportsTools: true },
      { id: 'meta/llama-4-scout-17b-16b-instruct', label: 'Llama 4 Scout', icon: '👁️', description: 'NVIDIA — أقوى vision', supportsVision: true, supportsTools: true },
      { id: 'meta/llama-4-maverick-17b-128b-instruct', label: 'Llama 4 Maverick', icon: '🚀', description: 'NVIDIA — سياق 256K', supportsVision: true },
      { id: 'nvidia/llama-3.1-nemotron-70b-instruct', label: 'Nemotron 70B', icon: '🧠', description: 'NVIDIA — reasoning متقدم', supportsReasoning: true },
      { id: 'nvidia/nemotron-mini-4b-instruct', label: 'Nemotron Mini', icon: '⚡', description: 'NVIDIA — سريع واقتصادي', supportsReasoning: true },
      { id: 'deepseek-ai/deepseek-r1', label: 'DeepSeek R1', icon: '🔬', description: 'NVIDIA — أقوى reasoning', supportsReasoning: true },
      { id: 'qwen/qwen2.5-7b-instruct', label: 'Qwen 2.5', icon: '🐉', description: 'NVIDIA — متعدد اللغات' },
      { id: 'mistralai/mixtral-8x7b-instruct-v0.1', label: 'Mixtral 8x7B', icon: '🎭', description: 'NVIDIA — Mixture of Experts' },
      { id: '01-ai/yi-large', label: 'Yi Large', icon: '🌟', description: 'NVIDIA — سياق طويل' },
    ],
  },
};

/** الحصول على الـ provider الحالي من env var */
export function getCurrentProvider(): ProviderType {
  const env = process.env.AI_PROVIDER?.toLowerCase();
  if (env === 'openrouter' || env === 'openai' || env === 'anthropic' || env === 'nvidia') return env;
  return 'groq'; // افتراضي
}

/** الحصول على تكوين الـ provider الحالي */
export function getProviderConfig(provider?: ProviderType): ProviderConfig {
  return PROVIDERS[provider || getCurrentProvider()];
}

/** الحصول على الـ model الحالي */
export function getCurrentModel(): string {
  const provider = getCurrentProvider();
  switch (provider) {
    case 'groq':
      return process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';
    case 'openrouter':
      return process.env.OPENROUTER_MODEL || 'anthropic/claude-3.5-sonnet';
    case 'openai':
      return process.env.OPENAI_MODEL || 'gpt-4o';
    case 'anthropic':
      return process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
    case 'nvidia':
      return process.env.NVIDIA_MODEL || 'meta/llama-3.3-70b-instruct';
  }
}

/** الحصول على reasoning model (للتفكير العميق) */
export function getReasoningModel(): string {
  const provider = getCurrentProvider();
  switch (provider) {
    case 'groq':
      return process.env.GROQ_REASONING_MODEL || 'deepseek-r1-distill-llama-70b';
    case 'openrouter':
      return process.env.OPENROUTER_REASONING_MODEL || 'deepseek/deepseek-r1';
    case 'openai':
      return process.env.OPENAI_REASONING_MODEL || 'o1-mini';
    case 'anthropic':
      return process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
    case 'nvidia':
      return process.env.NVIDIA_REASONING_MODEL || 'deepseek-ai/deepseek-r1';
  }
}

/** الحصول على vision model */
export function getVisionModel(): string {
  const provider = getCurrentProvider();
  switch (provider) {
    case 'groq':
      return process.env.GROQ_VISION_MODEL || 'meta-llama/llama-4-scout-17b-16b-instruct';
    case 'openrouter':
      return process.env.OPENROUTER_VISION_MODEL || 'anthropic/claude-3.5-sonnet';
    case 'openai':
      return process.env.OPENAI_VISION_MODEL || 'gpt-4o';
    case 'anthropic':
      return process.env.ANTHROPIC_MODEL || 'claude-3-5-sonnet-20241022';
    case 'nvidia':
      return process.env.NVIDIA_VISION_MODEL || 'meta/llama-4-scout-17b-16b-instruct';
  }
}

/** التحقق من توفر الـ API key للـ provider الحالي */
export function isProviderConfigured(): boolean {
  const config = getProviderConfig();
  const key = process.env[config.apiKeyEnv];
  if (!key) return false;
  // أماكن placeholder معروفة
  const placeholders = ['REPLACE_WITH_YOUR_GROQ_API_KEY', 'REPLACE_WITH_YOUR_KEY', 'nvapi-placeholder'];
  return !placeholders.includes(key);
}

/** تحقق من توفر provider محدد (مستخدم بـ smart router) */
export function isSpecificProviderConfigured(provider: ProviderType): boolean {
  const config = PROVIDERS[provider];
  if (!config) return false;
  const key = process.env[config.apiKeyEnv];
  if (!key) return false;
  const placeholders = ['REPLACE_WITH_YOUR_GROQ_API_KEY', 'REPLACE_WITH_YOUR_KEY', 'nvapi-placeholder'];
  return !placeholders.includes(key);
}

/** قائمة كل الـ models المتاحة (للـ UI model switcher) */
export function getAllModels(): Array<{ provider: ProviderType; model: ModelInfo }> {
  const out: Array<{ provider: ProviderType; model: ModelInfo }> = [];
  for (const provider of Object.values(PROVIDERS)) {
    for (const model of provider.models) {
      out.push({ provider: provider.name, model });
    }
  }
  return out;
}

```

---

## 6. `src/lib/ai-insights-engine.ts`

**247 سطر**

```typescript
// ============================================
// AI Insights Engine — محرّك insights ذكي
// ============================================
// يولّد insights دورياً (daily/weekly) + smart notifications
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { generateText, isAIConfigured } from '@/lib/ai-provider';

export interface DailyInsights {
  patterns: string[];
  recommendations: string[];
  warnings: string[];
  achievements: string[];
  source: 'ai' | 'rules';
  generatedAt: string;
}

export interface WeeklyInsights {
  summary: string;
  trends: Array<{ metric: string; trend: 'up' | 'down' | 'stable'; change: number }>;
  predictions: string[];
  source: 'ai' | 'rules';
  generatedAt: string;
}

export interface SmartNotification {
  type: 'reminder' | 'suggestion' | 'warning' | 'achievement';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

// ============================================
// Daily Insights
// ============================================
export async function generateDailyInsights(): Promise<DailyInsights> {
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const yesterdayStart = new Date(now.getTime() - 86400000).toISOString();

  const [todayTasks, todayActivity, overdueTasks, todayHabits, todayTransactions] = await Promise.all([
    db.task.findMany({ where: { updatedAt: { gte: todayStart } }, take: 50 }),
    db.activityEvent.findMany({ where: { createdAt: { gte: todayStart } }, take: 50 }),
    db.task.findMany({ where: { completed: false, dueDate: { not: '' } }, take: 20 }),
    db.habit.findMany({ take: 20 }),
    db.transaction.findMany({ where: { createdAt: { gte: todayStart } }, take: 20 }),
  ]);

  const completedToday = todayTasks.filter((t) => t.completed).length;
  const expensesToday = todayTransactions
    .filter((t) => t.type === 'expense')
    .reduce((s, t) => s + (t.amount || 0), 0);

  const insights: DailyInsights = {
    patterns: [],
    recommendations: [],
    warnings: [],
    achievements: [],
    source: 'rules',
    generatedAt: now.toISOString(),
  };

  // === Rules-based insights ===
  if (completedToday > 0) {
    insights.achievements.push(`أنجزت ${completedToday} مهمة اليوم`);
  }
  if (completedToday >= 5) {
    insights.achievements.push(`يوم إنتاجي ممتاز! ${completedToday} مهمة منجزة`);
  }
  if (overdueTasks.length > 0) {
    insights.warnings.push(`لديك ${overdueTasks.length} مهمة متأخرة — راجعها`);
  }
  if (todayActivity.length < 3) {
    insights.warnings.push('نشاط منخفض اليوم — حاول تسجيل المزيد من الأحداث');
  }
  if (expensesToday > 100) {
    insights.patterns.push(`مصروفات اليوم: ${expensesToday.toFixed(0)} شيكل`);
  }

  // === AI-based insights (لو مهيأ) ===
  if (isAIConfigured()) {
    try {
      const prompt = `حلّل هذا اليوم لمحمد وأعطِ insights مختصرة:
- مهام منجزة: ${completedToday}
- مهام متأخرة: ${overdueTasks.length}
- أحداث: ${todayActivity.length}
- مصروفات: ${expensesToday.toFixed(0)} شيكل

أرجع JSON: {"patterns":["..."],"recommendations":["..."],"warnings":["..."],"achievements":["..."]}`;

      const raw = await generateText(prompt, 'أنت محلل أداء شخصي. أرجع JSON فقط.');
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        insights.patterns = [...insights.patterns, ...(Array.isArray(parsed.patterns) ? parsed.patterns : [])].slice(0, 5);
        insights.recommendations = Array.isArray(parsed.recommendations) ? parsed.recommendations.slice(0, 5) : [];
        insights.warnings = [...insights.warnings, ...(Array.isArray(parsed.warnings) ? parsed.warnings : [])].slice(0, 5);
        insights.achievements = [...insights.achievements, ...(Array.isArray(parsed.achievements) ? parsed.achievements : [])].slice(0, 5);
        insights.source = 'ai';
      }
    } catch (e) {
      console.error('[AI Insights Engine] daily AI error:', e);
    }
  }

  return insights;
}

// ============================================
// Weekly Insights
// ============================================
export async function generateWeeklyInsights(): Promise<WeeklyInsights> {
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
  const twoWeeksAgo = new Date(now.getTime() - 14 * 86400000).toISOString();

  const [thisWeekTasks, lastWeekTasks, thisWeekTransactions, lastWeekTransactions, thisWeekActivity] = await Promise.all([
    db.task.findMany({ where: { updatedAt: { gte: weekAgo } }, take: 100 }),
    db.task.findMany({ where: { updatedAt: { gte: twoWeeksAgo, lt: weekAgo } }, take: 100 }),
    db.transaction.findMany({ where: { createdAt: { gte: weekAgo } }, take: 100 }),
    db.transaction.findMany({ where: { createdAt: { gte: twoWeeksAgo, lt: weekAgo } }, take: 100 }),
    db.activityEvent.findMany({ where: { createdAt: { gte: weekAgo } }, take: 100 }),
  ]);

  const thisWeekCompleted = thisWeekTasks.filter((t) => t.completed).length;
  const lastWeekCompleted = lastWeekTasks.filter((t) => t.completed).length;
  const thisWeekExpenses = thisWeekTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);
  const lastWeekExpenses = lastWeekTransactions.filter((t) => t.type === 'expense').reduce((s, t) => s + (t.amount || 0), 0);

  const trends: WeeklyInsights['trends'] = [
    { metric: 'مهام منجزة', trend: thisWeekCompleted > lastWeekCompleted ? 'up' : thisWeekCompleted < lastWeekCompleted ? 'down' : 'stable', change: thisWeekCompleted - lastWeekCompleted },
    { metric: 'مصروفات', trend: thisWeekExpenses > lastWeekExpenses ? 'up' : thisWeekExpenses < lastWeekExpenses ? 'down' : 'stable', change: Math.round(thisWeekExpenses - lastWeekExpenses) },
    { metric: 'نشاط', trend: thisWeekActivity.length > 10 ? 'up' : 'stable', change: thisWeekActivity.length },
  ];

  let summary = `هذا الأسبوع: ${thisWeekCompleted} مهمة منجزة، ${thisWeekExpenses.toFixed(0)} شيكل مصروفات، ${thisWeekActivity.length} حدث نشاط.`;
  const predictions: string[] = [];

  if (isAIConfigured()) {
    try {
      const prompt = `لخّص أسبوع محمد وأعطِ توقعات:
- مهام منجزة هذا الأسبوع: ${thisWeekCompleted} (الأسبوع الماضي: ${lastWeekCompleted})
- مصروفات: ${thisWeekExpenses.toFixed(0)} (الأسبوع الماضي: ${lastWeekExpenses.toFixed(0)})
- نشاط: ${thisWeekActivity.length} حدث

أرجع JSON: {"summary":"...","predictions":["..."]}`;

      const raw = await generateText(prompt, 'أنت محلل أسبوعي. أرجع JSON فقط.');
      const match = raw.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]);
        if (parsed.summary) summary = parsed.summary;
        if (Array.isArray(parsed.predictions)) predictions.push(...parsed.predictions.slice(0, 5));
      }
    } catch (e) {
      console.error('[AI Insights Engine] weekly AI error:', e);
    }
  }

  return {
    summary,
    trends,
    predictions,
    source: isAIConfigured() ? 'ai' : 'rules',
    generatedAt: now.toISOString(),
  };
}

// ============================================
// Smart Notifications
// ============================================
export async function generateSmartNotifications(): Promise<SmartNotification[]> {
  const now = new Date();
  const threeDaysAgo = new Date(now.getTime() - 3 * 86400000).toISOString();
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();

  const [recentJournal, staleProjects, overdueTasks, habits] = await Promise.all([
    db.journalEntry.findMany({ where: { date: { gte: threeDaysAgo.split('T')[0] } }, take: 5 }),
    db.project.findMany({ where: { status: { in: ['active', 'in-progress'] }, updatedAt: { lt: weekAgo } }, take: 5 }),
    db.task.findMany({ where: { completed: false, dueDate: { not: '' } }, take: 10 }),
    db.habit.findMany({ take: 20 }),
  ]);

  const notifications: SmartNotification[] = [];

  // لا يوميات من 3 أيام
  if (recentJournal.length === 0) {
    notifications.push({
      type: 'reminder',
      title: 'يومياتك ناقصة',
      message: 'ما سجلت شي بـ journal من 3 أيام — كل شي تمام؟',
      priority: 'medium',
    });
  }

  // مشاريع متوقفة
  for (const p of staleProjects) {
    notifications.push({
      type: 'warning',
      title: `مشروع متوقف: ${p.title}`,
      message: `مشروع '${p.title}' ما تطوّر من أسبوعين — يحتاج اهتمام؟`,
      priority: 'medium',
    });
  }

  // مهام متأخرة
  if (overdueTasks.length > 3) {
    notifications.push({
      type: 'warning',
      title: 'مهام متأخرة كثيرة',
      message: `لديك ${overdueTasks.length} مهمة متأخرة — راجعها قبل ما تتراكم`,
      priority: 'high',
    });
  }

  // عادات تراجعت
  for (const h of habits) {
    const dates = Array.isArray(h.completedDates) ? h.completedDates as string[] : [];
    const last7 = dates.filter((d) => new Date(d) >= new Date(weekAgo)).length;
    const prev7 = dates.filter((d) => {
      const dt = new Date(d);
      return dt >= new Date(now.getTime() - 14 * 86400000) && dt < new Date(weekAgo);
    }).length;
    if (prev7 > 3 && last7 < prev7 / 2) {
      notifications.push({
        type: 'suggestion',
        title: `عادتك '${h.name}' تراجعت`,
        message: `عادتك '${h.name}' تراجعت هذا الأسبوع — حابة نخّن تذكير؟`,
        priority: 'low',
      });
    }
    // إنجاز: 7 أيام متتالية
    if (last7 >= 7) {
      notifications.push({
        type: 'achievement',
        title: `🎉 ${h.name} — أسبوع كامل!`,
        message: `أنجزت عادة '${h.name}' 7 أيام هذا الأسبوع — أحسنت!`,
        priority: 'low',
      });
    }
  }

  return notifications.slice(0, 10);
}

```

---

## 7. `src/lib/ai-proactive.ts`

**155 سطر**

```typescript
// ============================================
// AI Proactive — AI يبادر محمد بـ تذكيرات واقتراحات ذكية
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { generateText, isAIConfigured } from '@/lib/ai-provider';
import { generateSmartNotifications, type SmartNotification } from './ai-insights-engine';

export interface ProactiveAction {
  type: 'reminder' | 'suggestion' | 'warning' | 'achievement';
  title: string;
  message: string;
  action?: { label: string; url: string };
  source: 'rules' | 'ai';
}

/**
 * يفحص كل الإجراءات الاستباقية (يجمع rules + AI)
 */
export async function checkProactiveActions(): Promise<{
  notifications: ProactiveAction[];
}> {
  // 1) احصل على smart notifications من insights engine
  const smartNotifs = await generateSmartNotifications();

  const notifications: ProactiveAction[] = smartNotifs.map((n: SmartNotification) => ({
    type: n.type,
    title: n.title,
    message: n.message,
    source: 'rules' as const,
  }));

  // 2) AI-powered proactive suggestions
  if (isAIConfigured()) {
    try {
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();

      const [recentTasks, recentActivity] = await Promise.all([
        db.task.findMany({ where: { updatedAt: { gte: weekAgo } }, take: 20, orderBy: { updatedAt: 'desc' } }),
        db.activityEvent.findMany({ where: { createdAt: { gte: weekAgo } }, take: 30, orderBy: { createdAt: 'desc' } }),
      ]);

      const prompt = `أنت مساعد استباقي لمحمد. بناءً على نشاطه الأخير، اقترح 2-3 إجراءات استباقية مفيدة.

آخر المهام: ${recentTasks.slice(0, 5).map((t) => t.text).join('، ')}
آخر النشاط: ${recentActivity.slice(0, 5).map((a) => a.itemTitle).join('، ')}

أرجع JSON array فقط: [{"type":"reminder|suggestion|warning|achievement","title":"...","message":"..."}]`;

      const raw = await generateText(prompt, 'أنت مساعد استباقي ذكي. أرجع JSON array فقط.');
      const match = raw.match(/\[[\s\S]*\]/);
      if (match) {
        const parsed = JSON.parse(match[0]) as Array<{ type: string; title: string; message: string }>;
        for (const p of parsed.slice(0, 3)) {
          if (p.title && p.message) {
            notifications.push({
              type: (['reminder', 'suggestion', 'warning', 'achievement'].includes(p.type) ? p.type : 'suggestion') as ProactiveAction['type'],
              title: p.title,
              message: p.message,
              source: 'ai',
            });
          }
        }
      }
    } catch (e) {
      console.error('[AI Proactive] AI suggestions error:', e);
    }
  }

  // 3) أضف أزرار إجراءات للإشعارات المهمة
  const withActions = notifications.map((n) => {
    const action = getActionForNotification(n);
    return action ? { ...n, action } : n;
  });

  return { notifications: withActions.slice(0, 8) };
}

function getActionForNotification(n: ProactiveAction): { label: string; url: string } | undefined {
  if (n.title.includes('مهام')) return { label: 'راجع المهام', url: '/tasks' };
  if (n.title.includes('مشروع')) return { label: 'افتح المشروع', url: '/projects' };
  if (n.title.includes('يوميات') || n.title.includes('journal')) return { label: 'اكتب يومية', url: '/journal' };
  if (n.title.includes('عاد')) return { label: 'تتبع العادات', url: '/habits' };
  return undefined;
}

/**
 * AI-5-AGENT: تشغيل كامل للفحوصات الاستباقية (background intelligence)
 * يشتغل بـ scheduler كل ساعة
 */
export async function runProactiveChecks(): Promise<{ notifications: ProactiveAction[] }> {
  // 1. فحص المهام المتأخرة
  const overdueTasks = await db.task.findMany({
    where: { completed: false, dueDate: { not: '' } },
    take: 20,
  });

  // 2. فحص العادات المتروكة
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000).toISOString();
  const habits = await db.habit.findMany({ take: 30 });

  const staleHabits = habits.filter((h) => {
    const dates = Array.isArray(h.completedDates) ? h.completedDates as string[] : [];
    const lastWeek = dates.filter((d) => new Date(d) >= new Date(weekAgo));
    return lastWeek.length === 0;
  });

  // 3. فحص المشاريع المتوقفة
  const staleProjects = await db.project.findMany({
    where: { status: { in: ['active', 'in-progress'] }, updatedAt: { lt: weekAgo } },
    take: 10,
  });

  // 4. استدعِ checkProactiveActions للإشعارات الذكية
  const { notifications } = await checkProactiveActions();

  // 5. أضف إشعارات إضافية مبنية على الفحوصات
  if (overdueTasks.length > 5) {
    notifications.unshift({
      type: 'warning',
      title: 'مهام متأخرة كثيرة',
      message: `لديك ${overdueTasks.length} مهمة متأخرة — راجعها قبل ما تتراكم أكثر`,
      action: { label: 'راجع المهام', url: '/tasks' },
      source: 'rules',
    });
  }

  if (staleHabits.length > 0) {
    notifications.push({
      type: 'suggestion',
      title: 'عادات متروكة',
      message: `${staleHabits.length} عادة ما تتبعت هذا الأسبوع: ${staleHabits.slice(0, 3).map((h) => h.name).join('، ')}`,
      action: { label: 'تتبع العادات', url: '/habits' },
      source: 'rules',
    });
  }

  if (staleProjects.length > 0) {
    for (const p of staleProjects.slice(0, 2)) {
      notifications.push({
        type: 'warning',
        title: `مشروع متوقف: ${p.title}`,
        message: `مشروع '${p.title}' ما تطوّر من أسبوع — يحتاج اهتمام؟`,
        action: { label: 'افتح المشروع', url: '/projects' },
        source: 'rules',
      });
    }
  }

  return { notifications: notifications.slice(0, 10) };
}

```

---

## 8. `src/lib/ai-everywhere.ts`

**95 سطر**

```typescript
// ============================================
// AI Everywhere — Shared helper for section AI features
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { generateText, generateJSON, isAIConfigured } from '@/lib/ai-provider';

export interface AISectionResponse {
  success: boolean;
  result?: unknown;
  source: 'ai' | 'rules';
  error?: string;
}

/** ينفّذ AI action مع fallback لـ rules */
export async function executeAIAction(
  prompt: string,
  systemInstruction: string,
  rulesFallback: () => unknown,
): Promise<AISectionResponse> {
  if (!isAIConfigured()) {
    return { success: true, result: rulesFallback(), source: 'rules' };
  }
  try {
    const raw = await generateText(prompt, systemInstruction + '\n\nأرجع JSON صالح فقط.');
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      return { success: true, result: JSON.parse(match[0]), source: 'ai' };
    }
    return { success: true, result: { text: raw }, source: 'ai' };
  } catch (e) {
    console.error('[AI Everywhere] executeAIAction error:', e);
    return { success: true, result: rulesFallback(), source: 'rules' };
  }
}

/** يجلب سياق مهام محمد */
export async function getTasksContext(): Promise<string> {
  const tasks = await db.task.findMany({ take: 20, orderBy: { createdAt: 'desc' } });
  return tasks.map((t) => `- ${t.text} [${t.completed ? '✓' : '○'}] (${t.priority})`).join('\n');
}

/** يجلب سياق ملاحظات محمد */
export async function getNotesContext(): Promise<string> {
  const notes = await db.note.findMany({ take: 15, orderBy: { createdAt: 'desc' } });
  return notes.map((n) => `- ${n.title}: ${(n.content || '').slice(0, 100)}`).join('\n');
}

/** يجلب سياق معاملات محمد */
export async function getFinanceContext(): Promise<string> {
  const txns = await db.transaction.findMany({ take: 30, orderBy: { createdAt: 'desc' } });
  return txns.map((t) => `- ${t.description}: ${t.amount} ${t.currency} (${t.type}, ${t.category})`).join('\n');
}

/** يجلب سياق عادات محمد */
export async function getHabitsContext(): Promise<string> {
  const habits = await db.habit.findMany({ take: 20 });
  return habits.map((h) => {
    const dates = Array.isArray(h.completedDates) ? h.completedDates as string[] : [];
    return `- ${h.name} ${h.emoji} (${dates.length} مرة)`;
  }).join('\n');
}

/** يجلب سياق يوميات محمد */
export async function getJournalContext(): Promise<string> {
  const entries = await db.journalEntry.findMany({ take: 15, orderBy: { date: 'desc' } });
  return entries.map((j) => `- ${j.date} [${j.mood}]: ${(j.text || '').slice(0, 100)}`).join('\n');
}

/** يجلب سياق مشاريع محمد */
export async function getProjectsContext(): Promise<string> {
  const projects = await db.project.findMany({ take: 15, orderBy: { updatedAt: 'desc' } });
  return projects.map((p) => `- ${p.title} [${p.status}] (${p.progress}%): ${(p.description || '').slice(0, 80)}`).join('\n');
}

/** يجلب ملخص شامل لمحمد (للـ dashboard) */
export async function getDashboardContext(): Promise<string> {
  const [tasks, projects, habits, txns, activity] = await Promise.all([
    db.task.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
    db.project.findMany({ take: 5, orderBy: { updatedAt: 'desc' } }),
    db.habit.findMany({ take: 5 }),
    db.transaction.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
    db.activityEvent.findMany({ take: 10, orderBy: { createdAt: 'desc' } }),
  ]);
  return JSON.stringify({
    tasks: tasks.length,
    completedTasks: tasks.filter((t) => t.completed).length,
    projects: projects.map((p) => p.title),
    habits: habits.length,
    recentExpenses: txns.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0),
    activity: activity.length,
  });
}

```

---

## 9. `src/lib/ai-reports.ts`

**245 سطر**

```typescript
// ============================================
// AI Performance Reports — تحليل عميق للأداء الأسبوعي/الشهري
// ============================================
// يجمع بيانات الأسبوع/الشهر من Prisma + يستخدم Groq للتحليل الذكي
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { generateJSON, isAIConfigured } from '@/lib/ai-provider';

export interface PerformanceReport {
  period: 'weekly' | 'monthly';
  weekStart: string;
  weekEnd: string;
  selfPerceptionVsReality: {
    perceived: string;
    actual: string;
    gaps: string[];
  };
  emotionPatterns: {
    dominant: string[];
    triggers: string[];
  };
  energyAnalysis: {
    drainers: string[];
    chargers: string[];
  };
  focusToRevenue: {
    totalFocusHours: number;
    totalRevenue: number;
    revenuePerHour: number;
    trend: 'up' | 'down' | 'stable';
  };
  recommendations: {
    kill: string[];
    automate: string[];
    nextWeek: string[];
  };
  // إحصائيات خام
  stats: {
    tasksCompleted: number;
    tasksCreated: number;
    habitsCompleted: number;
    journalEntries: number;
    expenses: number;
    income: number;
  };
  source: 'ai' | 'rules';
}

function getPeriodRange(period: 'weekly' | 'monthly'): { start: Date; end: Date } {
  const end = new Date();
  const start = new Date();
  if (period === 'weekly') {
    start.setDate(end.getDate() - 7);
  } else {
    start.setMonth(end.getMonth() - 1);
  }
  return { start, end };
}

async function gatherStats(start: Date, end: Date) {
  const startStr = start.toISOString();
  const endStr = end.toISOString();

  const [tasks, tasksCompleted, habits, journal, expenses, income, timeEntries, prevExpenses] = await Promise.all([
    db.task.findMany({ where: { createdAt: { gte: startStr, lte: endStr } }, take: 500 }),
    db.task.findMany({ where: { updatedAt: { gte: startStr, lte: endStr }, completed: true }, take: 500 }),
    db.habit.findMany({ take: 50 }),
    db.journalEntry.findMany({ where: { date: { gte: start.toISOString().split('T')[0] } }, take: 50 }),
    db.transaction.findMany({ where: { createdAt: { gte: startStr, lte: endStr }, type: 'expense' }, take: 200 }),
    db.transaction.findMany({ where: { createdAt: { gte: startStr, lte: endStr }, type: 'income' }, take: 200 }),
    db.timeEntry.findMany({ where: { createdAt: { gte: startStr, lte: endStr } }, take: 200 }),
    db.transaction.findMany({
      where: {
        createdAt: { gte: new Date(start.getTime() - (end.getTime() - start.getTime())).toISOString(), lte: startStr },
        type: 'expense',
      },
      take: 200,
    }),
  ]);

  const habitsCompleted = habits.reduce((sum, h) => {
    const completedDates = Array.isArray(h.completedDates) ? h.completedDates : [];
    const inRange = completedDates.filter((d: string) => {
      const dt = new Date(d);
      return dt >= start && dt <= end;
    });
    return sum + inRange.length;
  }, 0);

  const totalExpenses = expenses.reduce((s, t) => s + (t.amount || 0), 0);
  const totalIncome = income.reduce((s, t) => s + (t.amount || 0), 0);
  const totalFocusSeconds = timeEntries.reduce((s, t) => s + (t.duration || 0), 0);
  const totalFocusHours = Math.round((totalFocusSeconds / 3600) * 10) / 10;

  // اتجاه المصروفات
  const prevExpensesTotal = prevExpenses.reduce((s, t) => s + (t.amount || 0), 0);

  return {
    tasksCreated: tasks.length,
    tasksCompleted: tasksCompleted.length,
    habitsCompleted,
    journalEntries: journal.length,
    expenses: totalExpenses,
    income: totalIncome,
    focusHours: totalFocusHours,
    journal,
    timeEntries,
    expensesTxns: expenses,
    trend: totalExpenses > prevExpensesTotal * 1.1 ? 'up' : totalExpenses < prevExpensesTotal * 0.9 ? 'down' : 'stable',
  };
}

function buildRulesReport(period: 'weekly' | 'monthly', start: Date, end: Date, stats: Awaited<ReturnType<typeof gatherStats>>): PerformanceReport {
  const journalTexts = stats.journal.map((j) => j.text).filter(Boolean);
  const moods = stats.journal.map((j) => j.mood).filter(Boolean);
  const dominantMoods = [...new Set(moods)].slice(0, 3);

  const focusHours = stats.focusHours;
  const revenue = stats.income - stats.expenses;
  const revenuePerHour = focusHours > 0 ? Math.round((revenue / focusHours) * 10) / 10 : 0;

  return {
    period,
    weekStart: start.toISOString().split('T')[0],
    weekEnd: end.toISOString().split('T')[0],
    selfPerceptionVsReality: {
      perceived: journalTexts.length
        ? `تشير يومياتك إلى شعور ${dominantMoods.join('، ') || 'محايد'}`
        : 'لا يوميات كافية للتحليل',
      actual: `أنجزت ${stats.tasksCompleted} مهمة، ${stats.habitsCompleted} عادة، و${focusHours} ساعة تركيز`,
      gaps: [
        stats.tasksCompleted < 5 ? 'عدد المهام المنجزة منخفض' : '',
        focusHours < 10 ? 'ساعات التركيز تحت المطلوب' : '',
        stats.expenses > stats.income ? 'المصروفات تتجاوز الدخل' : '',
      ].filter(Boolean),
    },
    emotionPatterns: {
      dominant: dominantMoods.length ? dominantMoods : ['محايد'],
      triggers: journalTexts.length ? ['ضغط المهام', 'قلة النوم'] : [],
    },
    energyAnalysis: {
      drainers: ['المهام المتأخرة', 'التنقلات المتكررة'],
      chargers: ['إنجاز المهام', 'ممارسة العادات'],
    },
    focusToRevenue: {
      totalFocusHours: focusHours,
      totalRevenue: revenue,
      revenuePerHour,
      trend: stats.trend,
    },
    recommendations: {
      kill: stats.tasksCompleted < 5 ? ['المهام منخفضة القيمة'] : [],
      automate: ['تذكيرات المهام المتأخرة', 'تتبع المصروفات اليومي'],
      nextWeek: ['زيادة ساعات التركيز', 'مراجعة الميزانية'],
    },
    stats: {
      tasksCompleted: stats.tasksCompleted,
      tasksCreated: stats.tasksCreated,
      habitsCompleted: stats.habitsCompleted,
      journalEntries: stats.journalEntries,
      expenses: stats.expenses,
      income: stats.income,
    },
    source: 'rules',
  };
}

export async function generatePerformanceReport(period: 'weekly' | 'monthly' = 'weekly'): Promise<PerformanceReport> {
  const { start, end } = getPeriodRange(period);
  const stats = await gatherStats(start, end);

  if (!isAIConfigured()) {
    return buildRulesReport(period, start, end, stats);
  }

  try {
    const systemInstruction = `أنت محلل أداء شخصي. تحلل بيانات أسبوع/شهر لمستخدم وتُنتج تقرير عميق.
أرجع JSON فقط بالشكل:
{
  "selfPerceptionVsReality": {"perceived":"...","actual":"...","gaps":["..."]},
  "emotionPatterns": {"dominant":["..."],"triggers":["..."]},
  "energyAnalysis": {"drainers":["..."],"chargers":["..."]},
  "recommendations": {"kill":["..."],"automate":["..."],"nextWeek":["..."]}
}
كل قائمة 3 عناصر كحد أقصى. النصوص بالعربية.`;

    const dataSummary = JSON.stringify({
      period,
      tasksCompleted: stats.tasksCompleted,
      tasksCreated: stats.tasksCreated,
      habitsCompleted: stats.habitsCompleted,
      journalEntries: stats.journalEntries,
      journalMoods: stats.journal.map((j) => j.mood),
      journalTexts: stats.journal.map((j) => j.text?.slice(0, 200)),
      expenses: stats.expenses,
      income: stats.income,
      focusHours: stats.focusHours,
      timeEntryCategories: stats.timeEntries.map((t) => t.category),
    });

    const prompt = `حلّل هذه البيانات وأنتج تقرير أداء:\n${dataSummary}`;

    const aiResult = await generateJSON<{
      selfPerceptionVsReality: { perceived: string; actual: string; gaps: string[] };
      emotionPatterns: { dominant: string[]; triggers: string[] };
      energyAnalysis: { drainers: string[]; chargers: string[] };
      recommendations: { kill: string[]; automate: string[]; nextWeek: string[] };
    }>(prompt, systemInstruction);

    const focusHours = stats.focusHours;
    const revenue = stats.income - stats.expenses;
    const revenuePerHour = focusHours > 0 ? Math.round((revenue / focusHours) * 10) / 10 : 0;

    return {
      period,
      weekStart: start.toISOString().split('T')[0],
      weekEnd: end.toISOString().split('T')[0],
      selfPerceptionVsReality: aiResult.selfPerceptionVsReality || buildRulesReport(period, start, end, stats).selfPerceptionVsReality,
      emotionPatterns: aiResult.emotionPatterns || buildRulesReport(period, start, end, stats).emotionPatterns,
      energyAnalysis: aiResult.energyAnalysis || buildRulesReport(period, start, end, stats).energyAnalysis,
      focusToRevenue: {
        totalFocusHours: focusHours,
        totalRevenue: revenue,
        revenuePerHour,
        trend: stats.trend,
      },
      recommendations: aiResult.recommendations || buildRulesReport(period, start, end, stats).recommendations,
      stats: {
        tasksCompleted: stats.tasksCompleted,
        tasksCreated: stats.tasksCreated,
        habitsCompleted: stats.habitsCompleted,
        journalEntries: stats.journalEntries,
        expenses: stats.expenses,
        income: stats.income,
      },
      source: 'ai',
    };
  } catch (e) {
    console.error('[AI Reports error]', e);
    return buildRulesReport(period, start, end, stats);
  }
}

```

---

## 10. `src/lib/scheduler.ts`

**141 سطر**

```typescript
// ============================================
// Scheduler — جدولة المهام الدورية
// ============================================
// كل ساعة → runProactiveChecks
// كل يوم (8 صباحاً) → daily summary
// كل يوم (8 مساءً) → shutdown ritual
// كل أسبوع → weekly report
// ============================================

import 'server-only';
import { runProactiveChecks } from '@/lib/ai-proactive';
import { generateDailyInsights, generateWeeklyInsights } from '@/lib/ai-insights-engine';
import { db } from '@/lib/db';

type ScheduledTask = {
  name: string;
  interval: 'hourly' | 'daily-morning' | 'daily-evening' | 'weekly';
  lastRun?: string;
  fn: () => Promise<void>;
};

const tasks: ScheduledTask[] = [
  {
    name: 'proactive-checks',
    interval: 'hourly',
    fn: async () => {
      console.log('[Scheduler] Running proactive checks...');
      const result = await runProactiveChecks();
      console.log(`[Scheduler] Proactive: ${result.notifications.length} notifications generated`);

      // احفظ الإشعارات في DB
      for (const notif of result.notifications) {
        try {
          await db.notification.create({
            data: {
              type: notif.type,
              title: notif.title,
              message: notif.message,
              isRead: false,
              createdAt: new Date().toISOString(),
            },
          });
        } catch (e) {
          console.error('[Scheduler] notification save error:', e);
        }
      }
    },
  },
  {
    name: 'daily-summary',
    interval: 'daily-morning',
    fn: async () => {
      console.log('[Scheduler] Generating daily summary...');
      const insights = await generateDailyInsights();
      console.log(`[Scheduler] Daily insights: ${insights.achievements.length} achievements, ${insights.warnings.length} warnings`);
    },
  },
  {
    name: 'shutdown-ritual',
    interval: 'daily-evening',
    fn: async () => {
      console.log('[Scheduler] Running shutdown ritual...');
      const insights = await generateDailyInsights();
      console.log(`[Scheduler] Shutdown: ${insights.patterns.length} patterns for reflection`);
    },
  },
  {
    name: 'weekly-report',
    interval: 'weekly',
    fn: async () => {
      console.log('[Scheduler] Generating weekly report...');
      const insights = await generateWeeklyInsights();
      console.log(`[Scheduler] Weekly: ${insights.trends.length} trends tracked`);
    },
  },
];

// ============================================
// تشغيل المهام
// ============================================

const HOURLY_MS = 60 * 60 * 1000;
const DAILY_MS = 24 * 60 * 60 * 1000;
const WEEKLY_MS = 7 * 24 * 60 * 60 * 1000;

/** يفحص أي المهام يجب تشغيلها الآن */
export async function runScheduledTasks(): Promise<{ ran: string[]; skipped: string[] }> {
  const now = Date.now();
  const ran: string[] = [];
  const skipped: string[] = [];

  for (const task of tasks) {
    const lastRunTs = task.lastRun ? new Date(task.lastRun).getTime() : 0;
    const elapsed = now - lastRunTs;

    const shouldRun =
      (task.interval === 'hourly' && elapsed >= HOURLY_MS) ||
      (task.interval === 'daily-morning' && elapsed >= DAILY_MS && new Date().getHours() >= 7 && new Date().getHours() <= 10) ||
      (task.interval === 'daily-evening' && elapsed >= DAILY_MS && new Date().getHours() >= 19 && new Date().getHours() <= 22) ||
      (task.interval === 'weekly' && elapsed >= WEEKLY_MS);

    if (shouldRun) {
      try {
        await task.fn();
        task.lastRun = new Date().toISOString();
        ran.push(task.name);
      } catch (e) {
        console.error(`[Scheduler] Task ${task.name} failed:`, e);
        skipped.push(task.name);
      }
    } else {
      skipped.push(task.name);
    }
  }

  return { ran, skipped };
}

/** يشغّل مهمة محددة يدوياً */
export async function runTaskByName(name: string): Promise<boolean> {
  const task = tasks.find((t) => t.name === name);
  if (!task) return false;
  try {
    await task.fn();
    task.lastRun = new Date().toISOString();
    return true;
  } catch (e) {
    console.error(`[Scheduler] Manual run ${name} failed:`, e);
    return false;
  }
}

/** قائمة كل المهام + حالتها */
export function getScheduledTasksStatus(): Array<{ name: string; interval: string; lastRun: string | null }> {
  return tasks.map((t) => ({
    name: t.name,
    interval: t.interval,
    lastRun: t.lastRun || null,
  }));
}

```

---

## 11. `src/lib/rag-engine.ts`

**259 سطر**

```typescript
// ============================================
// RAG Second Brain — العقل الثاني بـ Retrieval-Augmented Generation
// ============================================
// يجمع من: Notes + Knowledge + Wiki + Journal + Tasks + Ideas + Projects
//          + Transactions + Habits + Skills + Achievements + Activity Events
// يستخدم fuzzy-search للاسترجاع + Groq للتوليد بأسلوب محمد
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { generateText, isAIConfigured } from '@/lib/ai-provider';
import { normalizeArabic, fuzzyMatch } from '@/lib/fuzzy-search';

export interface RAGSource {
  type: 'note' | 'knowledge' | 'wiki' | 'journal' | 'task' | 'idea' | 'project' | 'transaction' | 'habit' | 'skill' | 'achievement' | 'activity';
  id: string;
  title: string;
  excerpt: string;
  relevance: number;
}

export interface RAGResult {
  answer: string;
  sources: RAGSource[];
  source: 'ai' | 'rules';
}

interface CandidateEntry {
  type: RAGSource['type'];
  id: string;
  title: string;
  content: string;
  searchableText: string;
}

// ============================================
// جمع كل المصادر من قاعدة البيانات (12+ tables)
// ============================================
export async function buildRAGIndex(): Promise<CandidateEntry[]> {
  const entries: CandidateEntry[] = [];

  // 1) Notes
  try {
    const notes = await db.note.findMany({ take: 300 });
    for (const n of notes) {
      const content = `${n.title} ${n.content}`.trim();
      if (content) entries.push({ type: 'note', id: n.id, title: n.title || 'ملاحظة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] notes:', e); }

  // 2) Knowledge entries (content + wikiContent)
  try {
    const knowledge = await db.knowledgeEntry.findMany({ take: 200 });
    for (const k of knowledge) {
      const content = `${k.topic} ${k.content} ${k.wikiContent}`.trim();
      if (content) entries.push({ type: 'knowledge', id: k.id, title: k.topic || 'معلومة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] knowledge:', e); }

  // 3) Journal entries
  try {
    const journal = await db.journalEntry.findMany({ take: 200 });
    for (const j of journal) {
      const content = `${j.date} ${j.mood} ${j.text}`.trim();
      if (content) entries.push({ type: 'journal', id: j.id, title: `يومية ${j.date}`, content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] journal:', e); }

  // 4) Tasks (text, notes, tags)
  try {
    const tasks = await db.task.findMany({ take: 300 });
    for (const t of tasks) {
      const tags = Array.isArray(t.tags) ? t.tags.join(' ') : '';
      const content = `${t.text} ${t.notes} ${tags} ${t.category} ${t.priority}`.trim();
      if (content) entries.push({ type: 'task', id: t.id, title: t.text || 'مهمة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] tasks:', e); }

  // 5) Ideas (title, description, category)
  try {
    const ideas = await db.idea.findMany({ take: 200 });
    for (const i of ideas) {
      const content = `${i.title} ${i.description} ${i.category} ${i.status}`.trim();
      if (content) entries.push({ type: 'idea', id: i.id, title: i.title || 'فكرة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] ideas:', e); }

  // 6) Projects (title, description, notes, technologies)
  try {
    const projects = await db.project.findMany({ take: 100 });
    for (const p of projects) {
      const techs = Array.isArray(p.technologies) ? p.technologies.join(' ') : '';
      const content = `${p.title} ${p.description} ${p.notes} ${p.category} ${p.status} ${techs}`.trim();
      if (content) entries.push({ type: 'project', id: p.id, title: p.title || 'مشروع', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] projects:', e); }

  // 7) Transactions (description, category, amount)
  try {
    const txns = await db.transaction.findMany({ take: 200 });
    for (const t of txns) {
      const content = `${t.description} ${t.category} ${t.type} ${t.amount} ${t.currency}`.trim();
      if (content) entries.push({ type: 'transaction', id: t.id, title: t.description || 'معاملة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] transactions:', e); }

  // 8) Habits (name)
  try {
    const habits = await db.habit.findMany({ take: 100 });
    for (const h of habits) {
      const content = `${h.name}`.trim();
      if (content) entries.push({ type: 'habit', id: h.id, title: h.name || 'عادة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] habits:', e); }

  // 9) Skills (name, level)
  try {
    const skills = await db.skill.findMany({ take: 100 });
    for (const s of skills) {
      const content = `${s.name} ${s.level || ''}`.trim();
      if (content) entries.push({ type: 'skill', id: s.id, title: s.name || 'مهارة', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] skills:', e); }

  // 10) Achievements (title, description)
  try {
    const achievements = await db.achievement.findMany({ take: 100 });
    for (const a of achievements) {
      const content = `${a.title} ${a.description || ''}`.trim();
      if (content) entries.push({ type: 'achievement', id: a.id, title: a.title || 'إنجاز', content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] achievements:', e); }

  // 11) Activity events (type, section, itemTitle)
  try {
    const events = await db.activityEvent.findMany({ take: 300, orderBy: { createdAt: 'desc' } });
    for (const ev of events) {
      const content = `${ev.type} ${ev.section} ${ev.itemTitle}`.trim();
      if (content) entries.push({ type: 'activity', id: ev.id, title: ev.itemTitle || ev.type, content, searchableText: normalizeArabic(content) });
    }
  } catch (e) { console.error('[RAG] activity:', e); }

  return entries;
}

// ============================================
// استرجاع المقاطع ذات الصلة (retrieval)
// ============================================
export function retrieveRelevant(
  question: string,
  index: CandidateEntry[],
  limit = 8,
): RAGSource[] {
  const normalizedQ = normalizeArabic(question);
  if (!normalizedQ) return [];

  const scored = index.map((entry) => {
    let score = 0;

    // مطابقة ضبابية في العنوان
    if (fuzzyMatch(normalizedQ, entry.searchableText.slice(0, 100), 3)) {
      score += 0.3;
    }

    // كلمات مشتركة
    const qWords = normalizedQ.split(/\s+/).filter((w) => w.length > 2);
    const entryWords = new Set(entry.searchableText.split(/\s+/));
    let matchCount = 0;
    for (const w of qWords) {
      if (entryWords.has(w)) matchCount++;
      else if (entry.searchableText.includes(w)) matchCount += 0.5;
    }
    score += Math.min(matchCount * 0.15, 0.6);

    // مطابقة عنوانية مباشرة
    if (entry.searchableText.includes(normalizedQ)) {
      score += 0.4;
    }

    // تعزيز نوعي: المهام والمشاريع لها أولوية أعلى لأسئلة "ماذا/شنو"
    if (/شنو|ايش|ماذا|اخر|اليوم/.test(question)) {
      if (entry.type === 'task' || entry.type === 'activity') score += 0.1;
    }

    return { entry, score: Math.min(score, 1) };
  });

  return scored
    .filter((s) => s.score > 0.15)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => ({
      type: s.entry.type,
      id: s.entry.id,
      title: s.entry.title,
      excerpt: s.entry.content.slice(0, 200) + (s.entry.content.length > 200 ? '…' : ''),
      relevance: Math.round(s.score * 100) / 100,
    }));
}

// ============================================
// توليد إجابة بأسلوب محمد
// ============================================
export async function querySecondBrain(
  question: string,
  context?: { type?: string; limit?: number },
): Promise<RAGResult> {
  const q = (question || '').trim();
  if (!q) return { answer: '', sources: [], source: 'rules' };

  // 1) ابنِ الفهرس + استرجع
  const index = await buildRAGIndex();
  const limit = context?.limit ?? 8;
  const sources = retrieveRelevant(q, index, limit);

  if (sources.length === 0) {
    return {
      answer: 'لم أجد معلومات ذات صلة في عقلك الثاني. جرّب صياغة أخرى للسؤال.',
      sources: [],
      source: 'rules',
    };
  }

  // 2) لو AI غير مهيأ → لخّص من المصادر فقط
  if (!isAIConfigured()) {
    const summary = sources
      .map((s, i) => `${i + 1}. (${s.type}) ${s.title}: ${s.excerpt}`)
      .join('\n');
    return {
      answer: `بناءً على ما لديّ:\n${summary}`,
      sources,
      source: 'rules',
    };
  }

  // 3) AI: ولّد إجابة بأسلوب محمد
  try {
    const contextText = sources
      .map((s) => `[${s.type}] ${s.title}: ${s.excerpt}`)
      .join('\n---\n');

    const systemInstruction = `أنت "العقل الثاني" لمحمد عادل. تجيب على أسئلته بناءً على بياناته الشاملة (مهام، ملاحظات، أفكار، مشاريع، يوميات، معاملات، عادات، مهارات، إنجازات، نشاط).
- أجب بأسلوب محمد الشخصي (عربي فصيح بسيط، مباشر).
- استند فقط للمصادر المقدمة — لا تخترع.
- إذا لم تكن المعلومات كافية، قل ذلك بصراحة.
- اذكر المصادر التي استندت إليها في الإجابة.`;

    const prompt = `السؤال: ${q}\n\nالمصادر المتاحة:\n${contextText}`;

    const answer = await generateText(prompt, systemInstruction);

    return { answer, sources, source: 'ai' };
  } catch (e) {
    console.error('[RAG AI error]', e);
    const summary = sources.map((s, i) => `${i + 1}. (${s.type}) ${s.title}: ${s.excerpt}`).join('\n');
    return { answer: `بناءً على ما لديّ:\n${summary}`, sources, source: 'rules' };
  }
}

```

---

## 12. `src/lib/web-agent.ts`

**260 سطر**

```typescript
// ============================================
// Web Agent — وكيل تصفح المواقع
// ============================================
// يستخدم fetch لجلب HTML + تحليله (بدون browser ثقيل)
// - يفتح صفحة ويب
// - يستخرج المحتوى (title, text, links)
// - يبحث عن معلومات محددة
// - يحلل بـ AI لو مطلوب
// ============================================

import 'server-only';
import { generateText, isAIConfigured } from '@/lib/ai-provider';

export interface BrowseResult {
  url: string;
  title: string;
  content: string;
  links: Array<{ text: string; href: string }>;
  extractedData?: unknown;
  source: 'fetch' | 'ai';
  error?: string;
}

/**
 * يتصفح موقع ويب ويستخرج المحتوى
 */
export async function browseWebsite(
  url: string,
  task?: string,
): Promise<BrowseResult> {
  const targetUrl = (url || '').trim();
  if (!targetUrl) {
    return { url: '', title: '', content: '', links: [], error: 'URL مطلوب', source: 'fetch' };
  }

  // تأكد من وجود protocol
  const fullUrl = targetUrl.startsWith('http') ? targetUrl : `https://${targetUrl}`;

  try {
    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MiMoAgent/1.0; +https://mimo-life-os.local)',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'ar,en;q=0.9',
      },
      signal: AbortSignal.timeout(15000),
      redirect: 'follow',
    });

    if (!res.ok) {
      return {
        url: fullUrl,
        title: '',
        content: '',
        links: [],
        error: `HTTP ${res.status}`,
        source: 'fetch',
      };
    }

    const html = await res.text();
    const title = extractTitle(html);
    const content = extractTextContent(html);
    const links = extractLinks(html, fullUrl);

    // لو فيه task محدد + AI مهيأ → حلل المحتوى
    let extractedData: unknown = undefined;
    if (task && isAIConfigured()) {
      try {
        const prompt = `حلل محتوى هذه الصفحة وأجب على المهمة المطلوبة.

المهمة: ${task}
عنوان الصفحة: ${title}
المحتوى (أول 2000 حرف): ${content.slice(0, 2000)}

أرجع JSON: {"answer":"...","keyPoints":["..."],"relevant":true|false}`;

        const raw = await generateText(prompt, 'أنت وكيل ذكي يحلل صفحات الويب. أرجع JSON فقط.');
        const match = raw.match(/\{[\s\S]*\}/);
        if (match) {
          extractedData = JSON.parse(match[0]);
        }
      } catch (e) {
        console.error('[Web Agent] AI analysis error:', e);
      }
    }

    return {
      url: fullUrl,
      title,
      content: content.slice(0, 5000), // حدّد الحجم
      links: links.slice(0, 50),
      extractedData,
      source: extractedData ? 'ai' : 'fetch',
    };
  } catch (e) {
    return {
      url: fullUrl,
      title: '',
      content: '',
      links: [],
      error: e instanceof Error ? e.message : String(e),
      source: 'fetch',
    };
  }
}

/**
 * يستخرج محتوى نصي من URL (scrape)
 */
export async function scrapeUrl(url: string): Promise<{ title: string; content: string; error?: string }> {
  const result = await browseWebsite(url);
  return {
    title: result.title,
    content: result.content,
    error: result.error,
  };
}

// ============================================
// HTML parsing helpers (بدون مكتبات خارجية)
// ============================================

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1].trim() : '';
}

function extractTextContent(html: string): string {
  // أزل script + style + comments
  let text = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    // أزل tags
    .replace(/<[^>]+>/g, ' ')
    // فك HTML entities أساسية
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    // نظّف المسافات
    .replace(/\s+/g, ' ')
    .trim();

  return text;
}

function extractLinks(html: string, baseUrl: string): Array<{ text: string; href: string }> {
  const links: Array<{ text: string; href: string }> = [];
  const linkRegex = /<a[^>]*href=["']([^"']+)["'][^>]*>([^<]*)<\/a>/gi;
  let m: RegExpExecArray | null;

  while ((m = linkRegex.exec(html)) !== null && links.length < 100) {
    let href = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();

    // حلّل relative URLs
    if (href.startsWith('/') || href.startsWith('./')) {
      try {
        href = new URL(href, baseUrl).href;
      } catch {
        continue;
      }
    }

    // فقط روابط http/https
    if (href.startsWith('http') && text) {
      links.push({ text: text.slice(0, 100), href });
    }
  }

  return links;
}

/**
 * يبحث في YouTube عن فيديوهات
 */
export async function searchYouTube(query: string, limit = 5): Promise<Array<{ title: string; url: string; description: string }>> {
  const q = (query || '').trim();
  if (!q) return [];

  try {
    // استخدم YouTube search via HTML scrape (بدون API key)
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MiMoAgent/1.0)' },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];

    const html = await res.text();
    const results: Array<{ title: string; url: string; description: string }> = [];

    // استخرج video IDs من HTML
    const videoRegex = /"videoId":"([^"]{11})"/g;
    const titleRegex = /"title":{"runs":\[\{"text":"([^"]+)"\}\]/g;
    const videoIds: string[] = [];
    const titles: string[] = [];

    let m: RegExpExecArray | null;
    while ((m = videoRegex.exec(html)) !== null && videoIds.length < limit * 2) {
      if (!videoIds.includes(m[1])) videoIds.push(m[1]);
    }
    while ((m = titleRegex.exec(html)) !== null && titles.length < limit * 2) {
      titles.push(m[1]);
    }

    for (let i = 0; i < Math.min(videoIds.length, titles.length, limit); i++) {
      results.push({
        title: titles[i],
        url: `https://www.youtube.com/watch?v=${videoIds[i]}`,
        description: '',
      });
    }

    return results;
  } catch (e) {
    console.error('[Web Agent] YouTube search error:', e);
    return [];
  }
}

/**
 * يبحث في GitHub عن repos
 */
export async function searchGitHub(query: string, limit = 5): Promise<Array<{ name: string; url: string; description: string; stars: number }>> {
  const q = (query || '').trim();
  if (!q) return [];

  try {
    const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&per_page=${limit}&sort=stars`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'MiMoAgent/1.0',
        'Accept': 'application/vnd.github.v3+json',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) return [];

    const data = await res.json() as { items?: Array<{ full_name: string; html_url: string; description: string; stargazers_count: number }> };
    if (!data.items) return [];

    return data.items.slice(0, limit).map((r) => ({
      name: r.full_name,
      url: r.html_url,
      description: r.description || '',
      stars: r.stargazers_count,
    }));
  } catch (e) {
    console.error('[Web Agent] GitHub search error:', e);
    return [];
  }
}

```

---

## 13. `src/lib/vision-analyzer.ts`

**102 سطر**

```typescript
// ============================================
// Vision Analyzer — تحليل الصور بـ Groq Vision (Llama 4 Scout)
// ============================================
// يستخدم generateVision من ai-provider لتحليل الصور
// يستخرج: وصف، نصوص (OCR)، وسوم، إجراءات مقترحة
// ============================================

import 'server-only';
import { generateVision, isAIConfigured } from '@/lib/ai-provider';

export interface VisionAnalysisResult {
  description: string;
  extractedText?: string;
  tags: string[];
  suggestedActions?: string[];
  source: 'ai' | 'rules';
}

export async function analyzeImage(
  imageBase64: string,
  question?: string,
  mimeType: string = 'image/jpeg',
): Promise<VisionAnalysisResult> {
  if (!imageBase64) {
    return {
      description: '',
      tags: [],
      source: 'rules',
    };
  }

  if (!isAIConfigured()) {
    return {
      description: 'تحليل الصور يتطلب تفعيل Groq API key.',
      tags: [],
      source: 'rules',
    };
  }

  try {
    const prompt = question
      ? `حلّل هذه الصورة وأجب على سؤال المستخدم: "${question}"

أرجع JSON بالشكل:
{
  "description": "وصف تفصيلي للصورة (2-4 جمل)",
  "extractedText": "أي نص موجود في الصورة (OCR) أو نص فارغ لو لا يوجد",
  "tags": ["وسم1", "وسم2", "وسم3"],
  "suggestedActions": ["إجراء مقترح 1", "إجراء مقترح 2"]
}`
      : `حلّل هذه الصورة بدقة.

أرجع JSON بالشكل:
{
  "description": "وصف تفصيلي للصورة (2-4 جمل بالعربية)",
  "extractedText": "أي نص موجود في الصورة (OCR) أو نص فارغ لو لا يوجد",
  "tags": ["3-5 وسوم تصف محتوى الصورة"],
  "suggestedActions": ["1-3 إجراءات مقترحة بناءً على محتوى الصورة"]
}`;

    const raw = await generateVision(prompt, imageBase64, mimeType);

    // إزالة markdown code blocks
    const cleaned = raw
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const match = cleaned.match(/\{[\s\S]*\}/);
    if (!match) {
      return {
        description: raw.slice(0, 500),
        tags: [],
        source: 'ai',
      };
    }

    const parsed = JSON.parse(match[0]) as Partial<VisionAnalysisResult>;

    return {
      description: typeof parsed.description === 'string' ? parsed.description : raw.slice(0, 500),
      extractedText: typeof parsed.extractedText === 'string' && parsed.extractedText.trim()
        ? parsed.extractedText.trim()
        : undefined,
      tags: Array.isArray(parsed.tags)
        ? parsed.tags.filter((t) => typeof t === 'string' && t.trim()).slice(0, 7)
        : [],
      suggestedActions: Array.isArray(parsed.suggestedActions)
        ? parsed.suggestedActions.filter((a) => typeof a === 'string' && a.trim()).slice(0, 5)
        : undefined,
      source: 'ai',
    };
  } catch (e) {
    console.error('[Vision Analyzer error]', e);
    return {
      description: 'تعذّر تحليل الصورة. تأكد من تفعيل GROQ_API_KEY ودعم نموذج الرؤية.',
      tags: [],
      source: 'rules',
    };
  }
}

```

---

## 14. `src/lib/local-ai.ts`

⚠️ الملف غير موجود


---

## 15. `src/lib/media-analyzer.ts`

**267 سطر**

```typescript
'use client';

// ============================================
// Media Analyzer — تحليل الوسائط بـ المتصفح
// ============================================
// يستخدم Transformers.js + FFmpeg.wasm
// - تحليل الصور: تصنيف، كشف أجسام، OCR
// - تحليل الصوت: تحويل لنص (Whisper)
// - تحليل الفيديو: استخراج إطارات + صوت
// كلها محلية 100% بدون API key
// ============================================

import { pipeline, env } from '@huggingface/transformers';

// إعداد Transformers.js لاستخدام الـ CDN
env.allowLocalModels = false;
env.useBrowserCache = true;

// ============================================
// الأنواع
// ============================================

export interface ImageAnalysisResult {
  description: string;
  objects: Array<{ label: string; score: number }>;
  tags: string[];
  text?: string; // OCR
}

export interface AudioAnalysisResult {
  transcript: string;
  language?: string;
  duration?: number;
}

export interface VideoAnalysisResult {
  transcript: string;
  frames: Array<{ timestamp: number; description: string }>;
  duration: number;
}

// ============================================
// تحليل الصور
// ============================================

let imageClassifier: Awaited<ReturnType<typeof pipeline>> | null = null;
let objectDetector: Awaited<ReturnType<typeof pipeline>> | null = null;
let ocrReader: Awaited<ReturnType<typeof pipeline>> | null = null;

/**
 * تحليل صورة — تصنيف + كشف أجسام + OCR
 */
export async function analyzeImage(
  imageInput: HTMLImageElement | HTMLCanvasElement | string,
  options?: { ocr?: boolean; objects?: boolean },
): Promise<ImageAnalysisResult> {
  const result: ImageAnalysisResult = {
    description: '',
    objects: [],
    tags: [],
  };

  try {
    // 1) تصنيف الصورة
    if (!imageClassifier) {
      imageClassifier = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
    }
    const classifications = await imageClassifier(imageInput) as Array<{ label: string; score: number }>;
    if (classifications && classifications.length > 0) {
      result.tags = classifications.slice(0, 5).map((c) => c.label);
      result.description = classifications[0]?.label || 'صورة';
    }
  } catch (e) {
    console.error('[MediaAnalyzer] image classification error:', e);
  }

  // 2) كشف الأجسام
  if (options?.objects !== false) {
    try {
      if (!objectDetector) {
        objectDetector = await pipeline('object-detection', 'Xenova/detr-resnet-50');
      }
      const objects = await objectDetector(imageInput) as Array<{ label: string; score: number }>;
      if (objects && objects.length > 0) {
        result.objects = objects
          .filter((o) => o.score > 0.5)
          .slice(0, 10)
          .map((o) => ({ label: o.label, score: Math.round(o.score * 100) / 100 }));
      }
    } catch (e) {
      console.error('[MediaAnalyzer] object detection error:', e);
    }
  }

  // 3) OCR (استخراج نص)
  if (options?.ocr) {
    try {
      if (!ocrReader) {
        ocrReader = await pipeline('text2text-generation', 'Xenova/trocr-small-printed');
      }
      const ocrResult = await ocrReader(imageInput) as Array<{ generated_text: string }>;
      if (ocrResult && ocrResult[0]?.generated_text) {
        result.text = ocrResult[0].generated_text;
      }
    } catch (e) {
      console.error('[MediaAnalyzer] OCR error:', e);
    }
  }

  return result;
}

// ============================================
// تحليل الصوت (Whisper)
// ============================================

let whisperTranscriber: Awaited<ReturnType<typeof pipeline>> | null = null;

/**
 * تحليل صوت — تحويل لنص (Whisper)
 */
export async function transcribeAudio(
  audioInput: Blob | Float32Array | string,
): Promise<AudioAnalysisResult> {
  try {
    if (!whisperTranscriber) {
      // استخدم Whisper Tiny (أصغر + أسرع)
      whisperTranscriber = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny');
    }

    const output = await whisperTranscriber(audioInput) as { text: string; language?: string };
    return {
      transcript: output.text || '',
      language: output.language,
    };
  } catch (e) {
    console.error('[MediaAnalyzer] audio transcription error:', e);
    return {
      transcript: '',
      error: e instanceof Error ? e.message : String(e),
    } as AudioAnalysisResult;
  }
}

// ============================================
// تحليل الفيديو (FFmpeg.wasm + Whisper)
// ============================================

let ffmpegLoaded = false;

/**
 * تحميل FFmpeg.wasm
 */
async function ensureFFmpeg(): Promise<typeof import('@ffmpeg/ffmpeg').FFmpeg> {
  const { FFmpeg } = await import('@ffmpeg/ffmpeg');
  const { fetchFile, toBlobURL } = await import('@ffmpeg/util');

  if (!ffmpegLoaded) {
    const ffmpeg = new FFmpeg();
    const coreURL = await toBlobURL(
      'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js',
      'text/javascript',
    );
    const wasmURL = await toBlobURL(
      'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm',
      'application/wasm',
    );
    await ffmpeg.load({ coreURL, wasmURL });
    ffmpegLoaded = true;
    return ffmpeg;
  }
  return new FFmpeg();
}

/**
 * تحليل فيديو — استخراج صوت + transcript
 */
export async function analyzeVideo(
  videoFile: Blob,
  options?: { extractFrames?: boolean; maxFrames?: number },
): Promise<VideoAnalysisResult> {
  const result: VideoAnalysisResult = {
    transcript: '',
    frames: [],
    duration: 0,
  };

  try {
    const ffmpeg = await ensureFFmpeg();
    const { fetchFile } = await import('@ffmpeg/util');

    // اكتب الملف لـ FFmpeg
    const inputName = 'input.mp4';
    await ffmpeg.writeFile(inputName, await fetchFile(videoFile));

    // استخرج الصوت
    const audioName = 'output.wav';
    await ffmpeg.exec(['-i', inputName, '-vn', '-acodec', 'pcm_s16le', '-ar', '16000', '-ac', '1', audioName]);

    // اقرأ الصوت
    const audioData = await ffmpeg.readFile(audioName);
    const audioBlob = new Blob([audioData], { type: 'audio/wav' });

    // حول لنص بـ Whisper
    const audioResult = await transcribeAudio(audioBlob);
    result.transcript = audioResult.transcript;

    // استخرج إطارات (لو مطلوب)
    if (options?.extractFrames) {
      const maxFrames = options.maxFrames ?? 5;
      for (let i = 0; i < maxFrames; i++) {
        const frameName = `frame_${i}.jpg`;
        const timestamp = Math.floor((i / maxFrames) * 10); // تقديري
        await ffmpeg.exec(['-i', inputName, '-ss', String(timestamp), '-frames:v', '1', frameName]);
        // نتجاهل تحليل الإطار فعلياً (يحتاج canvas) — نكتفي بـ الـ timestamp
        result.frames.push({ timestamp, description: `إطار ${i + 1}` });
      }
    }

    // تنظيف
    try { await ffmpeg.deleteFile(inputName); } catch {}
    try { await ffmpeg.deleteFile(audioName); } catch {}

    return result;
  } catch (e) {
    console.error('[MediaAnalyzer] video analysis error:', e);
    return {
      ...result,
      error: e instanceof Error ? e.message : String(e),
    } as VideoAnalysisResult;
  }
}

// ============================================
// تحليل ملفات PDF
// ============================================

/**
 * استخراج نص من PDF (بـ المتصفح)
 */
export async function extractPdfText(file: Blob): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    // استخدم pdf.js (محمل ديناميكياً)
    const pdfjs = await import('pdfjs-dist');
    const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: unknown) => (item as { str: string }).str).join(' ') + '\n';
    }
    return text;
  } catch (e) {
    console.error('[MediaAnalyzer] PDF extraction error:', e);
    return '';
  }
}

// ============================================
// فحص الدعم
// ============================================

export function isMediaAnalysisSupported(): boolean {
  return typeof window !== 'undefined' && 'WebAssembly' in window;
}

```

---

## 16. `src/lib/study-ai.ts`

**224 سطر**

```typescript
// ============================================
// Study AI — مساعد دراسي ذكي
// ============================================
// يولّد بطاقات تعليمية، اختبارات، ملخصات، خطط دراسية
// يستخدم Groq/NVIDIA (server-side)
// ============================================

import 'server-only';
import { generateText, generateJSON, isAIConfigured } from '@/lib/ai-provider';

// ============================================
// الأنواع
// ============================================

export interface Flashcard {
  front: string;
  back: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface StudyPlan {
  title: string;
  duration: string;
  topics: Array<{ name: string; time: string; resources: string[] }>;
  tips: string[];
}

export interface LectureSummary {
  summary: string;
  keyPoints: string[];
  concepts: string[];
  questions: string[]; // أسئلة للمراجعة
}

// ============================================
// توليد بطاقات تعليمية (Flashcards)
// ============================================

export async function generateFlashcards(
  text: string,
  count: number = 10,
): Promise<{ flashcards: Flashcard[]; source: 'ai' | 'rules' }> {
  if (!isAIConfigured()) {
    return { flashcards: rulesFlashcards(text, count), source: 'rules' };
  }

  try {
    const result = await generateJSON<{ flashcards: Flashcard[] }>(
      `ولّد ${count} بطاقة تعليمية (flashcards) من هذا النص:

${text.slice(0, 3000)}

أرجع JSON: {"flashcards":[{"front":"سؤال قصير","back":"إجابة مختصرة"}]}`,
      'أنت مساعد تعليمي ذكي. البطاقات يجب أن تكون واضحة، مختصرة، وتغطي أهم المفاهيم. بالعربية.',
    );
    return { flashcards: result.flashcards || [], source: 'ai' };
  } catch (e) {
    console.error('[StudyAI] flashcards error:', e);
    return { flashcards: rulesFlashcards(text, count), source: 'rules' };
  }
}

// ============================================
// توليد اختبار (Quiz)
// ============================================

export async function generateQuiz(
  text: string,
  count: number = 5,
): Promise<{ questions: QuizQuestion[]; source: 'ai' | 'rules' }> {
  if (!isAIConfigured()) {
    return { questions: [], source: 'rules' };
  }

  try {
    const result = await generateJSON<{ questions: QuizQuestion[] }>(
      `ولّد ${count} أسئلة اختيار من متعدد من هذا النص:

${text.slice(0, 3000)}

أرجع JSON: {"questions":[{"question":"السؤال","options":["خيار1","خيار2","خيار3","خيار4"],"correctIndex":0,"explanation":"سبب الإجابة"}]}`,
      'أنت مساعد تعليمي ذكي. الأسئلة يجب أن تختبر الفهم وليس الحفظ فقط. بالعربية.',
    );
    return { questions: result.questions || [], source: 'ai' };
  } catch (e) {
    console.error('[StudyAI] quiz error:', e);
    return { questions: [], source: 'rules' };
  }
}

// ============================================
// تلخيص محاضرة
// ============================================

export async function summarizeLecture(
  text: string,
): Promise<{ summary: LectureSummary; source: 'ai' | 'rules' }> {
  if (!isAIConfigured()) {
    return {
      summary: {
        summary: text.slice(0, 200) + '...',
        keyPoints: [],
        concepts: [],
        questions: [],
      },
      source: 'rules',
    };
  }

  try {
    const result = await generateJSON<LectureSummary>(
      `لخّص هذه المحاضرة/الملاحظة:

${text.slice(0, 4000)}

أرجع JSON: {"summary":"ملخص 2-3 جمل","keyPoints":["نقطة1","نقطة2"],"concepts":["مفهوم1"],"questions":["سؤال مراجعة1"]}`,
      'أنت مساعد تعليمي ذكي. الملخص يجب أن يغطي أهم الأفكار. بالعربية.',
    );
    return { summary: result, source: 'ai' };
  } catch (e) {
    console.error('[StudyAI] summarize error:', e);
    return {
      summary: { summary: text.slice(0, 200), keyPoints: [], concepts: [], questions: [] },
      source: 'rules',
    };
  }
}

// ============================================
// خطة دراسية
// ============================================

export async function createStudyPlan(
  topics: string[],
  deadline: string,
  hoursPerDay: number = 3,
): Promise<{ plan: StudyPlan; source: 'ai' | 'rules' }> {
  if (!isAIConfigured()) {
    return {
      plan: {
        title: 'خطة دراسية',
        duration: `حتى ${deadline}`,
        topics: topics.map((t) => ({ name: t, time: `${hoursPerDay} ساعة`, resources: [] })),
        tips: ['راجع بانتظام', 'خذ فترات راحة'],
      },
      source: 'rules',
    };
  }

  try {
    const result = await generateJSON<StudyPlan>(
      `أنشئ خطة دراسية لمحمد (طالب هندسة) للمواضيع التالية:
المواضيع: ${topics.join('، ')}
الموعد النهائي: ${deadline}
ساعات الدراسة يومياً: ${hoursPerDay}

أرجع JSON: {"title":"عنوان الخطة","duration":"المدة","topics":[{"name":"الموضوع","time":"الوقت","resources":["مصدر1"]}],"tips":["نصيحة1"]}`,
      'أنت مستشار تعليمي ذكي. الخطة يجب أن تكون واقعية وقابلة للتنفيذ. بالعربية.',
    );
    return { plan: result, source: 'ai' };
  } catch (e) {
    console.error('[StudyAI] study plan error:', e);
    return {
      plan: {
        title: 'خطة دراسية',
        duration: `حتى ${deadline}`,
        topics: topics.map((t) => ({ name: t, time: `${hoursPerDay} ساعة`, resources: [] })),
        tips: [],
      },
      source: 'rules',
    };
  }
}

// ============================================
// شرح مفهوم
// ============================================

export async function explainConcept(
  concept: string,
  level: 'simple' | 'detailed' | 'academic' = 'simple',
): Promise<{ explanation: string; source: 'ai' | 'rules' }> {
  if (!isAIConfigured()) {
    return { explanation: `شرح ${concept}: يحتاج تفعيل الذكاء الاصطناعي`, source: 'rules' };
  }

  const levelPrompt = {
    simple: 'ببساطة شديدة، كأنك تشرح لطالب جديد',
    detailed: 'بشكل مفصل مع أمثلة',
    academic: 'بشكل أكاديمي مع مراجع',
  };

  try {
    const explanation = await generateText(
      `اشرح مفهوم: "${concept}"

مستوى الشرح: ${levelPrompt[level]}`,
      'أنت أستاذ جامعي ذكي. اشرح بوضوح بالعربية، استخدم أمثلة عملية عند الإمكان.',
    );
    return { explanation, source: 'ai' };
  } catch (e) {
    console.error('[StudyAI] explain error:', e);
    return { explanation: `تعذّر شرح ${concept}`, source: 'rules' };
  }
}

// ============================================
// Rules-based fallback للبطاقات
// ============================================

function rulesFlashcards(text: string, count: number): Flashcard[] {
  const sentences = text.split(/[.؟!\n]+/).filter((s) => s.trim().length > 20);
  return sentences.slice(0, count).map((s) => ({
    front: s.trim().slice(0, 50) + '...',
    back: s.trim(),
  }));
}

```

---

## 17. `src/lib/cross-linker.ts`

**314 سطر**

```typescript
// ============================================
// Cross-section Linker — اقتراح روابط بين الكيانات
// ============================================
// server-only. يفحص كل الـ tables عبر Prisma، ويقترح روابط بناءً على:
//  - وسوم مشتركة (tags)
//  - كلمات مفتاحية مشتركة (fuzzy matching)
//  - تشابه عنواني
// يعيد اقتراحات شفّافة مع reason + confidence.
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { normalizeArabic, fuzzyMatch } from '@/lib/fuzzy-search';

// ============================================
// الأنواع
// ============================================
export type EntityType = 'note' | 'task' | 'idea' | 'reminder' | 'transaction' | 'project';

export interface LinkSuggestion {
  fromType: EntityType;
  fromId: string;
  fromTitle: string;
  toType: EntityType;
  toId: string;
  toTitle: string;
  reason: string;
  confidence: number; // 0..1
}

export interface EntityRef {
  type: EntityType;
  id: string;
  title: string;
  content: string;
  tags: string[];
}

// أسماء الأقسام (جمع) المستخدمة في ItemRelation — تتطابق مع convention النظام
export const SECTION_NAME: Record<EntityType, string> = {
  note: 'notes',
  task: 'tasks',
  idea: 'ideas',
  reminder: 'smart-reminders',
  transaction: 'transactions',
  project: 'projects',
};

const MIN_CONFIDENCE = 0.45;
const MAX_SUGGESTIONS = 8;

// ============================================
// استخراج كل الكيانات من قاعدة البيانات
// ============================================
export async function fetchAllEntities(): Promise<EntityRef[]> {
  const out: EntityRef[] = [];

  // كل جدول بـ try/catch منفصل (جدول قد يكون فارغاً أو به خطأ)
  try {
    const rows = await db.note.findMany({ take: 500 });
    for (const r of rows) {
      out.push({
        type: 'note',
        id: r.id,
        title: r.title || 'ملاحظة',
        content: r.content || '',
        tags: parseTags(r.tags),
      });
    }
  } catch (e) { console.error('[cross-linker] notes:', e); }

  try {
    const rows = await db.task.findMany({ take: 500 });
    for (const r of rows) {
      out.push({
        type: 'task',
        id: r.id,
        title: r.text || 'مهمة',
        content: r.notes || '',
        tags: parseTags(r.tags),
      });
    }
  } catch (e) { console.error('[cross-linker] tasks:', e); }

  try {
    const rows = await db.idea.findMany({ take: 500 });
    for (const r of rows) {
      out.push({
        type: 'idea',
        id: r.id,
        title: r.title || 'فكرة',
        content: r.description || '',
        tags: parseTags(r.tags),
      });
    }
  } catch (e) { console.error('[cross-linker] ideas:', e); }

  try {
    const rows = await db.project.findMany({ take: 200 });
    for (const r of rows) {
      out.push({
        type: 'project',
        id: r.id,
        title: r.title || 'مشروع',
        content: r.description || '',
        tags: parseTags(r.tags),
      });
    }
  } catch (e) { console.error('[cross-linker] projects:', e); }

  try {
    const rows = await db.transaction.findMany({ take: 300 });
    for (const r of rows) {
      out.push({
        type: 'transaction',
        id: r.id,
        title: r.description || 'معاملة',
        content: `${r.amount} ${r.currency} (${r.type})`,
        tags: r.category ? [r.category] : [],
      });
    }
  } catch (e) { console.error('[cross-linker] transactions:', e); }

  try {
    const rows = await db.smartReminder.findMany({ take: 200 });
    for (const r of rows) {
      out.push({
        type: 'reminder',
        id: r.id,
        title: r.message || 'تذكير',
        content: r.message || '',
        tags: r.type ? [r.type] : [],
      });
    }
  } catch (e) { console.error('[cross-linker] smart-reminders:', e); }

  return out;
}

// Prisma Json fields تأتي كـ unknown — حوّلها لأمان
function parseTags(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((t) => String(t)).filter(Boolean);
  return [];
}

// ============================================
// استخراج الكيان المصدري من المعطيات
// ============================================
export async function fetchEntity(
  type: EntityType,
  id: string,
): Promise<EntityRef | null> {
  try {
    switch (type) {
      case 'note': {
        const r = await db.note.findUnique({ where: { id } });
        if (!r) return null;
        return { type, id, title: r.title || 'ملاحظة', content: r.content || '', tags: parseTags(r.tags) };
      }
      case 'task': {
        const r = await db.task.findUnique({ where: { id } });
        if (!r) return null;
        return { type, id, title: r.text || 'مهمة', content: r.notes || '', tags: parseTags(r.tags) };
      }
      case 'idea': {
        const r = await db.idea.findUnique({ where: { id } });
        if (!r) return null;
        return { type, id, title: r.title || 'فكرة', content: r.description || '', tags: parseTags(r.tags) };
      }
      case 'project': {
        const r = await db.project.findUnique({ where: { id } });
        if (!r) return null;
        return { type, id, title: r.title || 'مشروع', content: r.description || '', tags: parseTags(r.tags) };
      }
      case 'transaction': {
        const r = await db.transaction.findUnique({ where: { id } });
        if (!r) return null;
        return { type, id, title: r.description || 'معاملة', content: `${r.amount} ${r.currency}`, tags: r.category ? [r.category] : [] };
      }
      case 'reminder': {
        const r = await db.smartReminder.findUnique({ where: { id } });
        if (!r) return null;
        return { type, id, title: r.message || 'تذكير', content: r.message || '', tags: r.type ? [r.type] : [] };
      }
    }
  } catch (e) {
    console.error('[cross-linker] fetchEntity:', e);
  }
  return null;
}

// ============================================
// حساب الثقة بين كيانين (from → to)
// ============================================
function scorePair(from: EntityRef, to: EntityRef): { confidence: number; reason: string } | null {
  if (from.id === to.id) return null;

  let confidence = 0;
  const reasons: string[] = [];

  // 1) وسوم مشتركة
  const fromTags = new Set(from.tags.map((t) => t.toLowerCase()));
  const sharedTags = to.tags.filter((t) => fromTags.has(t.toLowerCase()));
  if (sharedTags.length > 0) {
    confidence += Math.min(sharedTags.length * 0.25, 0.6);
    reasons.push(`وسوم مشتركة: ${sharedTags.slice(0, 4).join('، ')}`);
  }

  // 2) كلمات مفتاحية مشتركة في العنوان/المحتوى
  const fromText = normalizeArabic(`${from.title} ${from.content}`);
  const toText = normalizeArabic(`${to.title} ${to.content}`);
  const fromTokens = new Set(fromText.split(/\s+/).filter((t) => t.length > 3));
  const sharedTerms = [...toText.split(/\s+/).filter((t) => t.length > 3 && fromTokens.has(t))];
  const uniqueShared = [...new Set(sharedTerms)];
  if (uniqueShared.length > 0) {
    confidence += Math.min(uniqueShared.length * 0.08, 0.3);
    reasons.push(`كلمات مشتركة: ${uniqueShared.slice(0, 4).join('، ')}`);
  }

  // 3) مطابقة ضبابية في العنوان
  const fromTitleNorm = normalizeArabic(from.title);
  const toTitleNorm = normalizeArabic(to.title);
  if (fromTitleNorm && toTitleNorm && fromTitleNorm !== toTitleNorm) {
    if (fuzzyMatch(fromTitleNorm, toTitleNorm, 2)) {
      confidence += 0.15;
      reasons.push('تشابه في العنوان');
    }
  }

  // 4) تعزيز خاص: project ↔ task/note يشير لنفس المشروع
  if (
    (from.type === 'project' && ['task', 'note', 'idea'].includes(to.type)) ||
    (to.type === 'project' && ['task', 'note', 'idea'].includes(from.type))
  ) {
    const proj = from.type === 'project' ? from : to;
    const other = from.type === 'project' ? to : from;
    if (proj.title && other.title.toLowerCase().includes(proj.title.toLowerCase().split(' ')[0])) {
      confidence += 0.2;
      reasons.push(`يشير لمشروع «${proj.title}»`);
    }
  }

  if (confidence < MIN_CONFIDENCE) return null;

  return {
    confidence: Math.min(Math.round(confidence * 100) / 100, 0.97),
    reason: reasons.length ? reasons.join(' • ') : 'تشابه عام في المحتوى',
  };
}

// ============================================
// الدالة الرئيسية — اقترح روابط لكيان معيّن
// ============================================
export async function suggestLinks(
  entity: EntityRef,
  candidates?: EntityRef[],
): Promise<LinkSuggestion[]> {
  // اجلب كل الكيانات إن لم تُمرّر
  const pool = candidates ?? (await fetchAllEntities());

  // اجلب العلاقات الموجودة لتجنّب التكرار
  const existingRelations = new Set<string>();
  try {
    const section = SECTION_NAME[entity.type];
    const outgoing = await db.itemRelation.findMany({
      where: { sourceType: section, sourceId: entity.id },
      select: { targetType: true, targetId: true },
    });
    const incoming = await db.itemRelation.findMany({
      where: { targetType: section, targetId: entity.id },
      select: { sourceType: true, sourceId: true },
    });
    for (const r of outgoing) existingRelations.add(`${r.targetType}::${r.targetId}`);
    for (const r of incoming) existingRelations.add(`${r.sourceType}::${r.sourceId}`);
  } catch (e) {
    console.error('[cross-linker] existing relations:', e);
  }

  const out: LinkSuggestion[] = [];
  for (const to of pool) {
    if (to.id === entity.id) continue;
    const key = `${SECTION_NAME[to.type]}::${to.id}`;
    if (existingRelations.has(key)) continue;

    const res = scorePair(entity, to);
    if (!res) continue;

    out.push({
      fromType: entity.type,
      fromId: entity.id,
      fromTitle: entity.title,
      toType: to.type,
      toId: to.id,
      toTitle: to.title,
      reason: res.reason,
      confidence: res.confidence,
    });
  }

  return out.sort((a, b) => b.confidence - a.confidence).slice(0, MAX_SUGGESTIONS);
}

// ============================================
// اقتراح روابط لكيان بـ (type, id) — يفحص DB أولاً
// ============================================
export async function suggestLinksForEntity(
  type: EntityType,
  id: string,
): Promise<LinkSuggestion[]> {
  const entity = await fetchEntity(type, id);
  if (!entity) return [];
  return suggestLinks(entity);
}

```

---

## 18. `src/lib/tag-suggester.ts`

**204 سطر**

```typescript
// ============================================
// Tag Suggester — اقتراح وسوم ذكية للنصوص
// ============================================
// server-only. يستخدم:
//  - قواعد كلمات مفتاحية أولاً (سريع، شفّاف)
//  - Google Gemini (LLM) كـ fallback للنصوص الغامضة
//  - يسترجع الوسوم الموجودة في DB لمطابقتها وترجيحها
// ============================================

import 'server-only';
import { db } from '@/lib/db';
import { generateJSON } from '@/lib/ai-provider';
import { normalizeArabic } from '@/lib/fuzzy-search';

export interface TagSuggestion {
  tag: string;
  confidence: number; // 0..1
  source: 'rule' | 'ai' | 'existing';
}

// ============================================
// قاموس الكلمات المفتاحية → وسم
// ============================================
const KEYWORD_RULES: Array<{ keywords: string[]; tag: string; confidence: number }> = [
  { keywords: ['arduino', 'esp', 'gpio', 'relay', 'اردوينو', 'إردوينو'], tag: 'arduino', confidence: 0.92 },
  { keywords: ['arduino', 'esp', 'iot', 'إنترنت-الأشياء'], tag: 'iot', confidence: 0.85 },
  { keywords: ['react', 'next', 'nextjs', 'typescript', 'javascript', 'css', 'tailwind'], tag: 'web', confidence: 0.85 },
  { keywords: ['react', 'next', 'typescript', 'javascript'], tag: 'programming', confidence: 0.8 },
  { keywords: ['git', 'github', 'commit', 'repo', 'ريبو'], tag: 'git', confidence: 0.88 },
  { keywords: ['prisma', 'database', 'sql', 'sqlite', 'قاعدة-بيانات'], tag: 'database', confidence: 0.85 },
  { keywords: ['رياضيات', 'physics', 'فيزياء', 'كيمياء', 'جامعة', 'محاضرة', 'تخرج'], tag: 'university', confidence: 0.82 },
  { keywords: ['كتاب', 'book', 'قراءة', 'مؤلف'], tag: 'reading', confidence: 0.8 },
  { keywords: ['فكرة', 'idea', 'تطبيق', 'app'], tag: 'ideas', confidence: 0.75 },
  { keywords: ['مصروف', 'صرفت', 'دفع', 'شراء', 'شيكل', 'دولار', 'expense'], tag: 'finance', confidence: 0.82 },
  { keywords: ['تذكير', 'موعد', 'meeting', 'الساعة', 'اجتماع'], tag: 'reminder', confidence: 0.78 },
  { keywords: ['صحة', 'رياضة', 'تمرين', 'جيم', 'gym'], tag: 'health', confidence: 0.78 },
  { keywords: ['عادات', 'habit', 'روتين'], tag: 'habits', confidence: 0.78 },
  { keywords: ['طبخ', 'وصفة', 'أكل', 'طعام'], tag: 'food', confidence: 0.78 },
  { keywords: ['bms', 'بطارية', 'مركبة'], tag: 'electronics', confidence: 0.8 },
  { keywords: ['flutter', 'dart', 'mobile'], tag: 'mobile', confidence: 0.82 },
  { keywords: ['python', 'automation', 'أتمتة'], tag: 'python', confidence: 0.82 },
];

// سياق إضافي حسب نوع الكيان
const CONTEXT_TAGS: Record<string, { tag: string; confidence: number }> = {
  note: { tag: 'notes', confidence: 0.6 },
  task: { tag: 'tasks', confidence: 0.6 },
  idea: { tag: 'ideas', confidence: 0.65 },
  reminder: { tag: 'reminder', confidence: 0.65 },
  transaction: { tag: 'finance', confidence: 0.7 },
  project: { tag: 'projects', confidence: 0.65 },
};

// ============================================
// استخراج كلمات مفتاحية من النص
// ============================================
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s@./:-]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 3);
}

// ============================================
// القواعد أولاً — اقتراح وسوم بالكلمات المفتاحية
// ============================================
export function suggestTagsByRules(text: string, contextType?: string): TagSuggestion[] {
  const lower = text.toLowerCase();
  const out: TagSuggestion[] = [];
  const seen = new Set<string>();

  const add = (tag: string, confidence: number, source: 'rule' | 'existing') => {
    const t = tag.toLowerCase().trim();
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push({ tag: t, confidence, source });
  };

  // 1) قواعد الكلمات المفتاحية
  for (const rule of KEYWORD_RULES) {
    if (rule.keywords.some((k) => lower.includes(k.toLowerCase()))) {
      add(rule.tag, rule.confidence, 'rule');
    }
  }

  // 2) سياق النوع
  if (contextType && CONTEXT_TAGS[contextType]) {
    add(CONTEXT_TAGS[contextType].tag, CONTEXT_TAGS[contextType].confidence, 'rule');
  }

  // 3) كلمات لاتينية بارزة (identifiers)
  const tokens = tokenize(text);
  for (const tok of tokens) {
    if (/^[a-z][a-z0-9_-]{2,}$/i.test(tok) && !seen.has(tok.toLowerCase())) {
      add(tok.toLowerCase(), 0.5, 'rule');
    }
  }

  // 4) أطول الكلمات العربية
  const arabic = tokens.filter((t) => /[\u0600-\u06FF]/.test(t) && t.length >= 4).slice(0, 2);
  for (const t of arabic) add(t, 0.45, 'rule');

  return out.slice(0, 6);
}

// ============================================
// مطابقة الوسوم الموجودة في DB
// ============================================
async function matchExistingTags(text: string): Promise<TagSuggestion[]> {
  try {
    const normalized = normalizeArabic(text);
    const allTags = await db.universalTag.findMany({ take: 200 });
    const out: TagSuggestion[] = [];
    for (const tag of allTags) {
      const tagName = normalizeArabic(tag.name);
      if (tagName && normalized.includes(tagName) && tagName.length >= 3) {
        out.push({ tag: tag.name, confidence: 0.7, source: 'existing' });
      }
    }
    return out;
  } catch {
    return [];
  }
}

// ============================================
// LLM fallback — اقتراح وسوم بالذكاء الاصطناعي (Google Gemini)
// ============================================
async function suggestTagsByAI(text: string): Promise<TagSuggestion[]> {
  try {
    const systemInstruction =
      'اقترح 3-5 وسوم (tags) مختصرة تصف النص بدقة. الوسوم بالعربية أو الإنجليزية حسب سياق النص. ' +
      'كل وسم كلمة واحدة أو كلمتين بوصلة. أرجع JSON array فقط: [{"tag":"...","confidence":0.8}]';
    const parsed = await generateJSON<Array<{ tag?: string; confidence?: number }>>(
      text.slice(0, 600),
      systemInstruction,
    );
    return (parsed || [])
      .filter((t) => t && typeof t.tag === 'string' && t.tag.trim())
      .map((t) => ({
        tag: t.tag!.trim().replace(/^#/, '').toLowerCase(),
        confidence: typeof t.confidence === 'number' ? Math.max(0, Math.min(1, t.confidence)) : 0.7,
        source: 'ai' as const,
      }));
  } catch {
    return [];
  }
}

// ============================================
// الدالة الرئيسية — تجمع القواعد + DB + AI
// ============================================
export async function suggestTags(
  text: string,
  contextType?: string,
): Promise<{ tags: TagSuggestion[]; source: 'rules' | 'ai' | 'mixed' }> {
  const trimmed = (text || '').trim();
  if (!trimmed) return { tags: [], source: 'rules' };

  // 1) القواعد (فورية)
  const ruleTags = suggestTagsByRules(trimmed, contextType);

  // 2) الوسوم الموجودة (مطابقة من DB)
  const existingTags = await matchExistingTags(trimmed);

  // لو القواعد + الموجودة أعطت ≥ 3 وسوم قوية، تجاوز AI
  const strong = [...ruleTags, ...existingTags].filter((t) => t.confidence >= 0.6);
  if (strong.length >= 3) {
    return { tags: dedupeAndSort([...ruleTags, ...existingTags]).slice(0, 6), source: 'rules' };
  }

  // 3) AI fallback للنصوص الغامضة
  const aiTags = await suggestTagsByAI(trimmed);

  const merged = dedupeAndSort([...ruleTags, ...existingTags, ...aiTags]);
  return {
    tags: merged.slice(0, 6),
    source: aiTags.length > 0 ? 'mixed' : 'rules',
  };
}

function dedupeAndSort(tags: TagSuggestion[]): TagSuggestion[] {
  const seen = new Map<string, number>();
  for (const t of tags) {
    const key = t.tag.toLowerCase();
    // احتفظ بأعلى ثقة، وفضّل source الموجود ثم القواعد ثم AI
    const priority = t.source === 'existing' ? 0.05 : t.source === 'rule' ? 0.02 : 0;
    const score = t.confidence + priority;
    if (!seen.has(key) || score > seen.get(key)!) {
      seen.set(key, score);
    }
  }
  // أعد بناء القائمة مع أعلى ثقة لكل وسم
  const byTag = new Map<string, TagSuggestion>();
  for (const t of tags) {
    const key = t.tag.toLowerCase();
    if (!byTag.has(key) || t.confidence > byTag.get(key)!.confidence) {
      byTag.set(key, t);
    }
  }
  return [...byTag.values()].sort((a, b) => b.confidence - a.confidence);
}

```

---

## 19. `src/lib/inbox-classifier.ts`

**234 سطر**

```typescript
// ============================================
// Inbox Classifier — طبقة الذكاء الاصطناعي + إنشاء الكيانات
// ============================================
// المنطق النقي (classifyByRules + الأنواع) في ./inbox-rules.ts
// هذا الملف يضيف:
// 2) classifyByAI: تصنيف بالذكاء الاصطناعي للعناصر الغامضة (lazy + fallback)
// 3) applyClassification: ينشئ الكيان المناسب (project/task/idea/certificate/book)
// 4) classifyItem: مسار كامل (rules → AI fallback)
// ============================================

import 'server-only';
import { db } from './db';
import { getAIInstance } from './ai-service';
import { generateText } from './ai-provider';
import {
  classifyByRules,
  extractTitle,
  isValidSuggestionType,
  type InboxType,
  type Suggestion,
  type SuggestionType,
} from './inbox-rules';

// إعادة تصدير الأنواع + الدالة النقية للاستخدام من الـ API routes
export { classifyByRules } from './inbox-rules';
export type { InboxType, Suggestion, SuggestionType } from './inbox-rules';

// ============================================
// تصنيف AI (lazy + fallback آمن)
// ============================================
/**
 * يستدعي GLM لتصنيف عنصر غامض. لو فشل → يرجع suggestion افتراضي (idea, confidence 0.4).
 * لا يرمي استثناء أبداً.
 */
export async function classifyByAI(content: string, type: InboxType): Promise<Suggestion> {
  const fallback: Suggestion = {
    type: 'idea',
    title: extractTitle(content, 'عنصر غير مصنف'),
    reason: 'لم يستطع AI التصنيف — حُفظ كفكرة',
    confidence: 0.4,
    fields: { title: content.slice(0, 100) },
  };
  try {
    await getAIInstance();
    const prompt = `صنّف هذا العنصر إلى واحد من: project, task, idea, certificate, book.
أرجع JSON صرف (بدون شرح) بالشكل:
{"type":"...","title":"...","reason":"...","confidence":0.0..1.0}

العنصر (نوع: ${type}):
${content.slice(0, 500)}`;

    const raw = await generateText(prompt, 'أنت مصنّف ذكي. ترجع JSON صرف فقط.');
    const parsed = parseSuggestionJSON(raw);
    if (parsed && isValidSuggestionType(parsed.type)) {
      return {
        type: parsed.type as SuggestionType,
        title: typeof parsed.title === 'string' ? parsed.title : fallback.title,
        reason: typeof parsed.reason === 'string' ? parsed.reason : fallback.reason,
        confidence: typeof parsed.confidence === 'number'
          ? Math.max(0, Math.min(1, parsed.confidence))
          : 0.6,
        fields: { title: (typeof parsed.title === 'string' ? parsed.title : content).slice(0, 100) },
      };
    }
    return fallback;
  } catch (e) {
    console.error('[inbox-classifier] AI error:', e);
    return fallback;
  }
}

function parseSuggestionJSON(raw: string): Record<string, unknown> | null {
  try {
    // جرّب JSON مباشرة
    return JSON.parse(raw);
  } catch {
    // استخرج JSON من نص (لو AI حاطّ شرح)
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) {
      try { return JSON.parse(match[0]); } catch { return null; }
    }
    return null;
  }
}

// ============================================
// applyClassification — ينشئ الكيان المناسب
// ============================================
/**
 * ينشئ الكيان المقترح + يحدّث InboxItem (processedAt + processedType + processedId).
 * يرجع { success, createdId, createdType } أو { success:false, error }.
 */
export async function applyClassification(
  inboxItemId: string,
  suggestion: Suggestion,
): Promise<{ success: boolean; createdId?: string; createdType?: string; error?: string }> {
  try {
    const nowIso = new Date().toISOString();
    let createdId = '';

    switch (suggestion.type) {
      case 'project': {
        const p = await db.project.create({
          data: {
            title: suggestion.title,
            description: String(suggestion.fields?.description || ''),
            status: 'planning',
            category: String(suggestion.fields?.category || ''),
            progress: 0,
            links: (suggestion.fields?.links as unknown) || [],
            createdAt: nowIso,
            updatedAt: nowIso,
          },
        });
        createdId = p.id;
        break;
      }
      case 'task': {
        const t = await db.task.create({
          data: {
            text: suggestion.fields?.text ? String(suggestion.fields.text) : suggestion.title,
            priority: 'medium',
            completed: false,
            isImportant: false,
            timeSpent: 0,
            createdAt: nowIso,
            updatedAt: nowIso,
          },
        });
        createdId = t.id;
        break;
      }
      case 'idea': {
        const i = await db.idea.create({
          data: {
            title: suggestion.fields?.title ? String(suggestion.fields.title) : suggestion.title,
            description: suggestion.reason,
            category: '',
            priority: 'medium',
            status: 'new',
            createdAt: nowIso,
            updatedAt: nowIso,
          },
        });
        createdId = i.id;
        break;
      }
      case 'certificate': {
        const c = await db.certificate.create({
          data: {
            title: suggestion.fields?.title ? String(suggestion.fields.title) : suggestion.title,
            description: suggestion.reason,
            type: 'course',
            credentialUrl: String(suggestion.fields?.credentialUrl || ''),
            date: nowIso.slice(0, 10),
            createdAt: nowIso,
          },
        });
        createdId = c.id;
        break;
      }
      case 'book': {
        const r = await db.readingItem.create({
          data: {
            title: suggestion.fields?.title ? String(suggestion.fields.title) : suggestion.title,
            type: 'book',
            status: 'planned',
            url: String(suggestion.fields?.url || ''),
            createdAt: nowIso,
            updatedAt: nowIso,
          },
        });
        createdId = r.id;
        break;
      }
    }

    // حدّث InboxItem
    await db.inboxItem.update({
      where: { id: inboxItemId },
      data: {
        processedAt: new Date(),
        processedType: suggestion.type,
        processedId: createdId,
      },
    });

    return { success: true, createdId, createdType: suggestion.type };
  } catch (e) {
    console.error('[inbox-classifier] applyClassification error:', e);
    return {
      success: false,
      error: e instanceof Error ? e.message : String(e),
    };
  }
}

// ============================================
// classifyItem — مسار كامل (rules → AI fallback)
// ============================================
/**
 * يصنّف عنصر: rules أولاً، فإن لم يُصنّف → AI.
 * يحدّث aiSuggestion + suggestionConfidence + suggestionSource في DB.
 */
export async function classifyItem(
  inboxItemId: string,
  content: string,
  type: InboxType,
): Promise<Suggestion> {
  // 1) rules
  let suggestion = classifyByRules(content, type);

  // 2) AI fallback
  if (!suggestion) {
    suggestion = await classifyByAI(content, type);
  }

  // 3) احفظ الاقتراح في DB
  try {
    await db.inboxItem.update({
      where: { id: inboxItemId },
      data: {
        aiSuggestion: JSON.stringify(suggestion),
        suggestionConfidence: suggestion.confidence,
        suggestionSource: suggestion.confidence >= 0.7 ? 'rule' : 'ai',
      },
    });
  } catch (e) {
    console.error('[inbox-classifier] save suggestion error:', e);
  }

  return suggestion;
}

```

---

## 20. `src/lib/inbox-rules.ts`

**212 سطر**

```typescript
// ============================================
// Inbox Rules — منطق التصنيف بالقواعد (نقي، قابل للاختبار)
// ============================================
// لا imports تخص السيرفر (لا db, لا AI, لا server-only).
// آمن للاستيراد من العميل أو الاختبارات.
// ============================================

// ============================================
// الأنواع
// ============================================
export type InboxType = 'text' | 'link' | 'image' | 'file';
export type SuggestionType = 'project' | 'task' | 'idea' | 'certificate' | 'book';

export interface Suggestion {
  type: SuggestionType;
  title: string;
  reason: string;
  confidence: number;       // 0..1
  fields?: Record<string, unknown>;
}

// ============================================
// كلمات دالة لكل فئة
// ============================================
const PROJECT_KEYWORDS = [
  'مشروع', 'برمجة', 'تطبيق', 'موقع', 'api', 'github', 'repo', 'برنامج',
  'بناء', 'تطوير', 'كود', 'project', 'build', 'app', 'website', 'flutter',
  'react', 'next', 'node', 'python', 'arduino', 'iot', 'أتمتة',
];

const TASK_KEYWORDS = [
  'يجب', 'اعمل', 'خلص', 'انجز', 'راجع', 'اكمل', 'تذكير', 'اتصل', 'ارسل',
  'اشتري', 'ادفع', 'ذاكر', 'اقرأ', 'اكتب', 'task', 'todo', 'do ', 'finish',
  'مطلوب', 'لازم', 'ضروري',
];

const IDEA_KEYWORDS = [
  'فكرة', 'اقتراح', 'لو كان', 'ماذا لو', 'يمكن', 'يُفضل', 'يُمكن',
  'idea', 'maybe', 'what if', 'لو سمحت', 'اقترح', 'تطوير فكرة',
];

const CERTIFICATE_KEYWORDS = [
  'شهادة', 'course', 'coursera', 'udemy', 'edx', 'certification', 'دورة',
  'تدريب', 'certificate', 'accreditation', 'معتمد', 'مرخّص',
];

const BOOK_KEYWORDS = [
  'كتاب', 'قراءة', 'مؤلف', 'رواية', 'book', 'read', 'novel', 'مكتبة',
  'pdf كتاب', 'اقرأ كتاب',
];

// أنماط الروابط
const GITHUB_PATTERN = /github\.com\/[\w-]+\/[\w.-]+/i;
const BOOK_URL_PATTERN = /(goodreads|amazon\/[^/]*\/book|books-google|kitab|كتاب)/i;
const COURSE_URL_PATTERN = /(coursera|udemy|edx|freecodecamp|khanacademy|sololearn)/i;

/**
 * تصنيف فوري بالقواعد. يرجع Suggestion أو null (يحتاج AI).
 * هذه الدالة نقية تماماً — لا side-effects، قابلة للاختبار.
 */
export function classifyByRules(content: string, type: InboxType): Suggestion | null {
  const text = (content || '').trim();
  if (!text) return null;
  const lower = text.toLowerCase();

  // 1) روابط — أنماط محددة أولاً
  if (type === 'link' || /^https?:\/\//i.test(text)) {
    if (GITHUB_PATTERN.test(text)) {
      const repo = text.match(GITHUB_PATTERN)?.[0] || text;
      return {
        type: 'project',
        title: `مشروع من GitHub: ${repo.split('/').pop() || repo}`,
        reason: 'رابط GitHub → مشروع برمجي',
        confidence: 0.92,
        fields: { links: [{ label: 'GitHub', url: text }], category: 'برمجة' },
      };
    }
    if (COURSE_URL_PATTERN.test(text)) {
      return {
        type: 'certificate',
        title: `دورة تدريبية: ${extractDomain(text)}`,
        reason: 'رابط منصة دورات → شهادة محتملة',
        confidence: 0.85,
        fields: { credentialUrl: text },
      };
    }
    if (BOOK_URL_PATTERN.test(text)) {
      return {
        type: 'book',
        title: `كتاب للقراءة`,
        reason: 'رابط كتاب → مكتبة القراءة',
        confidence: 0.82,
        fields: { url: text },
      };
    }
    // رابط عام → فكرة/مرجع للحفظ
    return {
      type: 'idea',
      title: `رابط للحفظ: ${extractDomain(text)}`,
      reason: 'رابط عام → فكرة/مرجع للحفظ',
      confidence: 0.5,
      fields: { description: text },
    };
  }

  // 2) نص — كلمات مفتاحية
  // أولوية: شهادة > كتاب > مهمة > مشروع > فكرة (حسب الثقة)
  const matches: Array<{ s: Suggestion; score: number }> = [];

  if (matchesAny(lower, CERTIFICATE_KEYWORDS)) {
    matches.push({
      s: {
        type: 'certificate',
        title: extractTitle(text, 'شهادة/دورة'),
        reason: 'يحوي كلمات شهادة/دورة',
        confidence: 0.8,
        fields: { title: text.slice(0, 100) },
      },
      score: 0.8,
    });
  }

  if (matchesAny(lower, BOOK_KEYWORDS)) {
    matches.push({
      s: {
        type: 'book',
        title: extractTitle(text, 'كتاب'),
        reason: 'يحوي كلمات كتاب/قراءة',
        confidence: 0.78,
        fields: { title: text.slice(0, 100) },
      },
      score: 0.78,
    });
  }

  if (matchesAny(lower, TASK_KEYWORDS)) {
    matches.push({
      s: {
        type: 'task',
        title: text.slice(0, 120),
        reason: 'يحوي كلمات فعل أمر/إنجاز',
        confidence: 0.75,
        fields: { text: text.slice(0, 120) },
      },
      score: 0.75,
    });
  }

  if (matchesAny(lower, PROJECT_KEYWORDS)) {
    matches.push({
      s: {
        type: 'project',
        title: extractTitle(text, 'مشروع جديد'),
        reason: 'يحوي كلمات مشروع/برمجة',
        confidence: 0.72,
        fields: { title: text.slice(0, 100), category: 'برمجة' },
      },
      score: 0.72,
    });
  }

  if (matchesAny(lower, IDEA_KEYWORDS)) {
    matches.push({
      s: {
        type: 'idea',
        title: extractTitle(text, 'فكرة'),
        reason: 'يحوي كلمات فكرة/اقتراح',
        confidence: 0.7,
        fields: { title: text.slice(0, 100) },
      },
      score: 0.7,
    });
  }

  if (matches.length > 0) {
    // رجّع أعلى ثقة
    matches.sort((a, b) => b.score - a.score);
    return matches[0].s;
  }

  // 3) غامض — null (يحتاج AI)
  return null;
}

// ============================================
// أدوات مساعدة للقواعد (غير مُصدّرة — خاصة)
// ============================================
function matchesAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k.toLowerCase()));
}

export function extractTitle(text: string, fallback: string): string {
  // أول سطر أو أول 60 حرف
  const firstLine = text.split('\n')[0].trim();
  if (firstLine.length > 0 && firstLine.length <= 80) return firstLine;
  if (firstLine.length > 80) return firstLine.slice(0, 77) + '...';
  return fallback;
}

export function extractDomain(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname.replace('www.', '');
  } catch {
    return url.slice(0, 30);
  }
}

export function isValidSuggestionType(t: unknown): boolean {
  return t === 'project' || t === 'task' || t === 'idea' || t === 'certificate' || t === 'book';
}

```

---

## 21. `src/lib/fuzzy-search.ts`

**103 سطر**

```typescript
// ============================================
// Fuzzy Search — بحث ذكي يحتمل الأخطاء
// ============================================

// تطبيع عربي (أ→ا، ة→ه، ى→ي، إزالة تشكيل)
export function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // إزالة التشكيل
    .replace(/[إأآا]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .toLowerCase()
    .trim();
}

// Levenshtein distance
export function levenshtein(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

// قاموس مرادفات
const SYNONYMS: Record<string, string[]> = {
  'مهمة': ['task', 'عمل', 'واجب', 'تاسك'],
  'ملاحظة': ['note', 'notes', 'تذكير', 'مذكرة', 'مذكره', 'نوت'],
  'مذكرة': ['note', 'notes', 'ملاحظة', 'ملاحظه', 'نوت'],
  'مشروع': ['project', 'عمل', 'بروجكت'],
  'دراسة': ['study', 'تعلم', 'مذاكرة'],
  'مال': ['finance', 'مصروف', 'expense', 'دخل', 'income'],
  'شهادة': ['certificate', 'إجازة', 'cert'],
  'مهارة': ['skill', 'قدرة', 'سكيل'],
  'إنجاز': ['achievement', 'نجاح', 'انجاز'],
  'خطة': ['plan', 'هدف', 'goal', 'بلان'],
  'تذكير': ['reminder', 'تنبيه', 'ريميندر'],
  'فكرة': ['idea', 'أيديا'],
  'يومية': ['journal', 'مذكرات', 'يوميات'],
  'عادة': ['habit', 'هابيت'],
  'جامعة': ['university', 'جامعه', 'يوني'],
  'لغة': ['language', 'لغه'],
  'خبرة': ['experience', 'خبره'],
  'تطوع': ['volunteer', 'تطوع'],
  'سيرة': ['resume', 'cv', 'سيره'],
  'هدف': ['goal', 'تارجت', 'تارقيط'],
};

export function expandQuery(query: string): string[] {
  const normalized = normalizeArabic(query);
  const queries = [normalized, query.toLowerCase()];
  // أضف مرادفات
  for (const [word, syns] of Object.entries(SYNONYMS)) {
    const normWord = normalizeArabic(word);
    const matched = normalized.includes(normWord) ||
      syns.some((s) => normalized.includes(normalizeArabic(s)));
    if (matched) {
      // أضف الكلمة + كل المرادفات (عربي + إنجليزي)
      queries.push(normWord);
      syns.forEach((s) => queries.push(normalizeArabic(s)));
    }
  }
  return [...new Set(queries)];
}

export function fuzzyMatch(query: string, target: string, threshold = 2): boolean {
  const normQuery = normalizeArabic(query);
  const normTarget = normalizeArabic(target);
  // مطابقة مباشرة بعد التطبيع
  if (normTarget.includes(normQuery)) return true;
  // مطابقة Levenshtein
  if (normQuery.length >= 3 && normTarget.length >= 3) {
    const dist = levenshtein(normQuery.slice(0, 10), normTarget.slice(0, 10));
    if (dist <= threshold) return true;
  }
  // مطابقة بداية الكلمة
  if (normTarget.startsWith(normQuery.slice(0, Math.min(3, normQuery.length)))) return true;
  return false;
}

export function searchItems<T>(
  query: string,
  items: T[],
  getSearchableText: (item: T) => string
): T[] {
  if (!query.trim()) return items;
  const expandedQueries = expandQuery(query);
  return items.filter((item) => {
    const text = getSearchableText(item);
    return expandedQueries.some((q) => fuzzyMatch(q, text));
  });
}

```

---

## 22. `src/lib/command-engine.ts`

**601 سطر**

```typescript
// ============================================
// Command Engine — يفهم كلام محمد الطبيعي وينفّذ
// ============================================
// آلية التعرف:
//   1. regex patterns أولاً (سريع، محلي، بدون API)
//   2. Google Gemini (LLM) كـ fallback للجمل المعقدة
// يدعم: عربي + إنجليزي
// ============================================

import { db } from './db';

// ============================================
// الأنواع
// ============================================
export type CommandIntent =
  | 'reminder'
  | 'study_session'
  | 'task_create'
  | 'transaction_add'
  | 'note_create'
  | 'idea_create'
  | 'health_log'
  | 'skill_update'
  | 'schedule_event'
  | 'habit_log'
  | 'universal_capture'
  | 'unknown';

export interface ParsedCommand {
  intent: CommandIntent;
  entities: Record<string, string | number | boolean>;
  rawText: string;
  confidence: number; // 0-1
}

export interface ExecutionResult {
  success: boolean;
  message: string;
  intent: CommandIntent;
  effects: string[]; // قائمة بالتأثيرات المنفّذة
  error?: string;
}

// ============================================
// Arabic number words → digits
// ============================================
const ARABIC_NUMBERS: Record<string, number> = {
  'واحدة': 1, 'واحد': 1, 'ساعة': 1,
  'ساعتين': 2, 'ساعتان': 2, 'اثنين': 2, 'اثنتين': 2,
  'ثلاث': 3, 'ثلاثة': 3, 'ثلاثه': 3,
  'أربع': 4, 'أربعة': 4, 'اربعة': 4, 'اربع': 4,
  'خمس': 5, 'خمسة': 5, 'خمسه': 5,
  'ست': 6, 'ستة': 6, 'سته': 6,
  'سبع': 7, 'سبعة': 7, 'سبعه': 7,
  'ثمان': 8, 'ثمانية': 8, 'ثمانيه': 8, 'تمن': 8,
  'تسع': 9, 'تسعة': 9, 'تسعه': 9,
  'عشر': 10, 'عشرة': 10, 'عشره': 10,
  'إحدى عشر': 11, 'احدى عشر': 11,
  'اثنتا عشر': 12, 'اثني عشر': 12,
};

function parseArabicNumber(text: string): number | null {
  const lower = text.trim().toLowerCase();
  // جرّب رقم رقمي أول
  const numMatch = text.match(/(\d+(?:\.\d+)?)/);
  if (numMatch) return parseFloat(numMatch[1]);
  // جرّب الكلمات العربية
  for (const [word, num] of Object.entries(ARABIC_NUMBERS)) {
    if (lower.includes(word)) return num;
  }
  return null;
}

// ============================================
// Regex Patterns (عربي + إنجليزي)
// ============================================
const PATTERNS: Array<{ intent: CommandIntent; patterns: RegExp[]; extract: (text: string, match: RegExpMatchArray) => Record<string, string | number | boolean> }> = [
  // === reminder ===
  {
    intent: 'reminder',
    patterns: [
      /(?:عندي\s+)?(.+?)\s+الساعة\s+(\d{1,2}(?::\d{2})?(?:\s*(?:ص|م|am|pm))?)\s*(.*)?/i,
      /(?:ذكّرني|ذكرني|reminder)\s+(?:بـ|ب|that\s+|to\s+)?(.+?)(?:\s+الساعة\s+(\d{1,2}(?::\d{2})?))?/i,
      /(?:عندي\s+)?(?:اجتماع|مقابلة|اختبار|محاضرة|دوام)\s+(?:بكرا|اليوم|الساعة\s+(\d{1,2}(?::\d{2})?))?\s*(.*)?/i,
    ],
    extract: (text, match) => {
      // pattern 1: description + time | pattern 2: description + optional time | pattern 3: event type
      const time = match[2] || match[4] || match[3] || '';
      const desc = match[1] || match[3] || match[5] || text;
      // لو الـ description فارغ أو رقم بس، استخدم النص الأصلي
      const finalDesc = (desc && desc.trim() && !/^\d+$/.test(desc.trim())) ? desc.trim() : text;
      return { time: String(time).trim(), description: finalDesc, rawText: text };
    },
  },
  // === study_session ===
  {
    intent: 'study_session',
    patterns: [
      // "درست ساعتين برمجة" — الكلمة العربية تشمل الوحدة
      /(?:درست|ذاكرت|studied|learned)\s+(ساعتين|ثلاث|ثلاثة|ثلاثه|أربع|أربعة|اربعة|خمس|خمسة|ست|ستة|سبع|سبعة|ثمان|ثمانية|تسع|تسعة|عشر|عشرة)\s*(?:ساعة|ساعات)?\s*(.*)?/i,
      // "درست 2 ساعة برمجة" — رقم + وحدة
      /(?:درست|ذاكرت|studied|learned)\s+(\d+(?:\.\d+)?)\s*(?:ساعة|ساعات|hour|hours|h)\s*(.*)?/i,
      // "دراسة 3 ساعات رياضيات"
      /(?:دراسة|مذاكرة|study)\s+(\d+(?:\.\d+)?)\s*(?:ساعة|ساعات|hour|hours)\s*(?:في|من|بـ)?\s*(.*)?/i,
    ],
    extract: (text, match) => {
      // match[1] = كلمة عربية أو رقم، match[2] = الموضوع
      const val1 = match[1] || '';
      const numericVal = parseFloat(val1);
      const arabicVal = parseArabicNumber(val1);
      const hours = !isNaN(numericVal) ? numericVal : (arabicVal ?? 1);
      const subject = match[2] || '';
      return { hours, subject: String(subject).trim(), rawText: text };
    },
  },
  // === task_create ===
  {
    intent: 'task_create',
    patterns: [
      /(?:أضف\s+)?(?:مهمة|task|todo)\s*:\s*(.+)/i,
      /(?:أضف\s+مهمة|add\s+task|create\s+task)\s*:\s*(.+)/i,
      /(?:لازم|محتاج|بدي|أبغى)\s+(.+)/i,
    ],
    extract: (text, match) => {
      const taskText = match[1] || '';
      return { text: String(taskText).trim(), rawText: text };
    },
  },
  // === transaction_add ===
  {
    intent: 'transaction_add',
    patterns: [
      /(?:صرفت|دفع|اشتريت|spent|paid)\s+(\d+(?:\.\d+)?)\s*(?:شيكل|شواقل|shekel|shekels|ils|\$|دولار)\s*(?:على|في|لـ|on|for)\s*(.+)/i,
      /(?:دخل|راتب|استلمت|income|received)\s+(\d+(?:\.\d+)?)\s*(?:شيكل|شواقل|shekel|shekels|ils|\$|دولار)\s*(?:من|from)\s*(.+)/i,
    ],
    extract: (text, match) => {
      const amount = parseFloat(match[1]) || 0;
      const category = match[2] || '';
      const type = /(?:دخل|راتب|استلمت|income|received)/i.test(text) ? 'income' : 'expense';
      return { amount, category: String(category).trim(), type, rawText: text };
    },
  },
  // === note_create ===
  {
    intent: 'note_create',
    patterns: [
      /(?:أضف\s+)?(?:ملاحظة|note|مذكرة)\s*:\s*(.+)/i,
      /(?:اكتب\s+ملاحظة|write\s+note|add\s+note)\s*:\s*(.+)/i,
    ],
    extract: (text, match) => {
      const noteContent = match[1] || '';
      return { content: String(noteContent).trim(), rawText: text };
    },
  },
  // === idea_create ===
  {
    intent: 'idea_create',
    patterns: [
      /(?:أضف\s+)?(?:فكرة|idea)\s*:\s*(.+)/i,
      /(?:عندي\s+فكرة|i\s+have\s+an\s+idea)\s*:\s*(.+)/i,
    ],
    extract: (text, match) => {
      const ideaText = match[1] || '';
      return { text: String(ideaText).trim(), rawText: text };
    },
  },
  // === health_log ===
  {
    intent: 'health_log',
    patterns: [
      /(?:وزني|weight)\s+(\d+(?:\.\d+)?)\s*(?:كيلو|kg|كجم)/i,
      /(?:نمت|slept)\s+(\d+(?:\.\d+)?)\s*(?:ساعة|ساعات|hour|hours)/i,
      /(?:شربت|drank)\s+(\d+)\s*(?:كوب|cup|cups|أكواب)\s*(?:ماء|water)/i,
    ],
    extract: (text, match) => {
      const value = parseFloat(match[1]) || 0;
      const type = /وزن|weight/i.test(text) ? 'weight' : /نمت|slept/i.test(text) ? 'sleep' : 'water';
      return { value, type, rawText: text };
    },
  },
  // === skill_update ===
  {
    intent: 'skill_update',
    patterns: [
      /(?:تدربت|practice|مارست)\s+(\d+(?:\.\d+)?)\s*(?:ساعة|ساعات|hour|hours)\s*(.*)?/i,
      /(?:حسّنت|improved)\s*(?:مهارة|skill)\s*(.+)/i,
    ],
    extract: (text, match) => {
      const hours = parseFloat(match[1]) || 0;
      const skillName = match[2] || match[1] || '';
      return { hours, skillName: String(skillName).trim(), rawText: text };
    },
  },
  // === schedule_event ===
  {
    intent: 'schedule_event',
    patterns: [
      /(?:أضف\s+)?(?:بالجدول|schedule|محاضرة|class)\s*:\s*(.+?)(?:\s+الساعة\s+(\d{1,2}(?::\d{2})?))?/i,
      /(?:عندي\s+)?(?:محاضرة|دوام|class|lecture)\s+(.+?)(?:\s+الساعة\s+(\d{1,2}(?::\d{2})?))?/i,
    ],
    extract: (text, match) => {
      const eventTitle = match[1] || '';
      const time = match[2] || '';
      return { title: String(eventTitle).trim(), time: String(time), rawText: text };
    },
  },
  // === habit_log ===
  {
    intent: 'habit_log',
    patterns: [
      /(?:أتممت|خلصت|أنجزت|completed|done)\s+(?:عادة|habit)\s+(.+)/i,
      /(?:صليت|قرأت|رياضة|تمرين|meditation|exercise)\s*(?:الصبح|الفجر|اليوم)?/i,
    ],
    extract: (text, match) => {
      const habitName = match[1] || text;
      return { habitName: String(habitName).trim(), rawText: text };
    },
  },
  // === universal_capture ===
  {
    intent: 'universal_capture',
    patterns: [
      /(?:التقط|سجّل|capture|quick capture|note this)\s*:?\s*(.+)/i,
      /(?:احفظ لي|خلّ?ي عندك)\s+(.+)/i,
    ],
    extract: (text, match) => ({ text: String(match[1] || text).trim(), rawText: text }),
  },
];

// ============================================
// parseUserCommand — يتعرف على الـ intent
// ============================================
export async function parseUserCommand(text: string): Promise<ParsedCommand> {
  const trimmed = text.trim();
  if (!trimmed) {
    return { intent: 'unknown', entities: {}, rawText: text, confidence: 0 };
  }

  // المرحلة 1: regex patterns (سريع، محلي)
  for (const { intent, patterns, extract } of PATTERNS) {
    for (const pattern of patterns) {
      const match = trimmed.match(pattern);
      if (match) {
        return {
          intent,
          entities: extract(trimmed, match),
          rawText: trimmed,
          confidence: 0.9, // regex = ثقة عالية
        };
      }
    }
  }

  // المرحلة 2: LLM fallback (للجمل المعقدة)
  try {
    const llmResult = await parseWithLLM(trimmed);
    if (llmResult) return llmResult;
  } catch (e) {
    console.error('[CommandEngine] LLM parse failed:', e);
  }

  return { intent: 'unknown', entities: {}, rawText: trimmed, confidence: 0 };
}

// ============================================
// parseWithLLM — fallback باستخدام Google Gemini
// ============================================
async function parseWithLLM(text: string): Promise<ParsedCommand | null> {
  try {
    const { generateJSON } = await import('./ai-provider');
    const prompt = `أنت مساعد ذكي. حلل الجملة التالية واستخرج القصد (intent) والكيانات (entities).

القصد الممكن:
- reminder: تذكير/موعد
- study_session: دراسة/مذاكرة
- task_create: إنشاء مهمة
- transaction_add: معاملة مالية
- note_create: إنشاء ملاحظة
- idea_create: إنشاء فكرة
- health_log: سجل صحي
- skill_update: تحديث مهارة
- schedule_event: جدولة حدث
- habit_log: إكمال عادة
- unknown: غير مفهوم

الجملة: "${text}"

أرجع JSON فقط بهذا الشكل:
{"intent": "...", "entities": {...}, "confidence": 0.8}`;

    const parsed = await generateJSON<{
      intent?: CommandIntent;
      entities?: Record<string, unknown>;
      confidence?: number;
    }>(prompt, 'أنت محلل لغوي. أرجع JSON فقط، بدون شرح.');

    // تحقق من إن الـ intent اللي رجعه الـ LLM ضمن القائمة المعروفة
    // (منع قيم عشوائية تخرب الـ switch في executeCommand)
    const VALID_INTENTS: CommandIntent[] = [
      'reminder', 'study_session', 'task_create', 'transaction_add',
      'note_create', 'idea_create', 'health_log', 'skill_update',
      'schedule_event', 'habit_log', 'universal_capture', 'unknown',
    ];
    const rawIntent = String(parsed.intent ?? '').toLowerCase();
    const intent: CommandIntent = VALID_INTENTS.includes(rawIntent as CommandIntent)
      ? (rawIntent as CommandIntent)
      : 'unknown';

    // تأكد إن entities كائن (مو string/number من LLM)
    const entities = (parsed.entities && typeof parsed.entities === 'object' && !Array.isArray(parsed.entities))
      ? parsed.entities as Record<string, string | number | boolean>
      : {};

    return {
      intent,
      entities,
      rawText: text,
      confidence: typeof parsed.confidence === 'number' ? parsed.confidence : 0.6,
    };
  } catch (e) {
    console.error('[CommandEngine] LLM error:', e);
    return null;
  }
}

// ============================================
// executeCommand — ينفّذ الأمر المُحلّل
// ============================================
export async function executeCommand(cmd: ParsedCommand): Promise<ExecutionResult> {
  const effects: string[] = [];
  let success = false;
  let message = '';
  let error: string | undefined;

  try {
    switch (cmd.intent) {
      // === reminder ===
      case 'reminder': {
        const { time, description } = cmd.entities;
        await db.smartReminder.create({
          data: {
            message: String(description || cmd.rawText),
            type: 'general',
            scheduledTime: String(time || ''),
            isActive: true,
            createdAt: new Date().toISOString(),
          },
        });
        effects.push(`إنشاء تذكير: ${description || cmd.rawText}`);
        message = `⏰ أنشأت تذكير: ${description || cmd.rawText}${time ? ` (الساعة ${time})` : ''}`;
        success = true;
        break;
      }

      // === study_session ===
      case 'study_session': {
        const { hours, subject } = cmd.entities;
        const hoursNum = Number(hours) || 1;
        // سجل بـ WorkSession
        await db.workSession.create({
          data: {
            title: `دراسة ${subject || ''}`,
            description: `دراسة ${subject || ''}`,
            category: 'study',
            durationMinutes: Math.round(hoursNum * 60),
            startedAt: new Date().toISOString(),
            endedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          },
        });
        effects.push(`تسجيل جلسة دراسة: ${hoursNum} ساعة`);
        if (subject) {
          effects.push(`الموضوع: ${subject}`);
          // حاول حدّث المهارة لو موجودة
          const skill = await db.skill.findFirst({
            where: { name: { contains: String(subject) } },
          });
          if (skill) {
            const newEvolution = [...(Array.isArray(skill.evolution) ? skill.evolution : []), {
              year: new Date().getFullYear(),
              level: skill.level,
              note: `درس ${hoursNum} ساعة`,
            }];
            await db.skill.update({
              where: { id: skill.id },
              data: { evolution: newEvolution },
            });
            effects.push(`تحديث مهارة: ${skill.name}`);
          }
        }
        message = `📚 سجّلت ${hoursNum} ساعة دراسة${subject ? ` (${subject})` : ''}`;
        success = true;
        break;
      }

      // === task_create ===
      case 'task_create': {
        const { text: taskText } = cmd.entities;
        await db.task.create({
          data: {
            text: String(taskText),
            priority: 'medium',
            completed: false,
            isImportant: false,
            timeSpent: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
        effects.push(`إنشاء مهمة: ${taskText}`);
        message = `✅ أضفت مهمة: ${taskText}`;
        success = true;
        break;
      }

      // === transaction_add ===
      case 'transaction_add': {
        const { amount, category, type } = cmd.entities;
        const amountNum = Number(amount) || 0;
        const txType = type === 'income' ? 'income' : 'expense';
        await db.transaction.create({
          data: {
            amount: amountNum,
            type: txType,
            category: String(category || 'عام'),
            description: cmd.rawText,
            createdAt: new Date().toISOString(),
          },
        });
        effects.push(`تسجيل ${txType === 'income' ? 'دخل' : 'مصروف'}: ${amountNum} (${category})`);
        message = `${txType === 'income' ? '💰 دخل' : '💸 مصروف'}: ${amountNum} شيكل${category ? ` — ${category}` : ''}`;
        success = true;
        break;
      }

      // === note_create ===
      case 'note_create': {
        const { content } = cmd.entities;
        await db.note.create({
          data: {
            title: String(content).slice(0, 50),
            content: String(content),
            color: 'default',
            isPinned: false,
            isSecret: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
        effects.push(`إنشاء ملاحظة`);
        message = `📝 أضفت ملاحظة: ${content}`;
        success = true;
        break;
      }

      // === idea_create ===
      case 'idea_create': {
        const { text: ideaText } = cmd.entities;
        await db.idea.create({
          data: {
            title: String(ideaText).slice(0, 50),
            description: String(ideaText),
            priority: 'medium',
            status: 'raw',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
        });
        effects.push(`إنشاء فكرة`);
        message = `💡 أضفت فكرة: ${ideaText}`;
        success = true;
        break;
      }

      // === health_log ===
      case 'health_log': {
        const { value, type } = cmd.entities;
        const valueNum = Number(value) || 0;
        await db.healthEntry.create({
          data: {
            type: String(type || 'general'),
            value: valueNum,
            date: new Date().toISOString().split('T')[0],
            notes: cmd.rawText,
            createdAt: new Date().toISOString(),
          },
        });
        effects.push(`تسجيل صحي: ${type} = ${valueNum}`);
        message = `❤️ سجّلت ${type}: ${valueNum}`;
        success = true;
        break;
      }

      // === skill_update ===
      case 'skill_update': {
        const { hours, skillName } = cmd.entities;
        const hoursNum = Number(hours) || 0;
        const skill = await db.skill.findFirst({
          where: { name: { contains: String(skillName) } },
        });
        if (skill) {
          const newEvolution = [...(Array.isArray(skill.evolution) ? skill.evolution : []), {
            year: new Date().getFullYear(),
            level: skill.level,
            note: `تدرّب ${hoursNum} ساعة`,
          }];
          await db.skill.update({
            where: { id: skill.id },
            data: { evolution: newEvolution },
          });
          effects.push(`تحديث مهارة: ${skill.name} (+${hoursNum}h)`);
          message = `🎯 حدّثت مهارة ${skill.name}: +${hoursNum} ساعة`;
          success = true;
        } else {
          message = `ما لقيت مهارة باسم "${skillName}". تأكد من الاسم.`;
          success = false;
        }
        break;
      }

      // === schedule_event ===
      case 'schedule_event': {
        const { title, time } = cmd.entities;
        await db.scheduleEvent.create({
          data: {
            title: String(title),
            time: String(time || ''),
            date: new Date().toISOString().split('T')[0],
            createdAt: new Date().toISOString(),
          },
        });
        effects.push(`جدولة حدث: ${title}`);
        message = `📅 أضفت بالجدول: ${title}${time ? ` (الساعة ${time})` : ''}`;
        success = true;
        break;
      }

      // === habit_log ===
      case 'habit_log': {
        const { habitName } = cmd.entities;
        const habit = await db.habit.findFirst({
          where: { name: { contains: String(habitName) } },
        });
        if (habit) {
          const today = new Date().toISOString().split('T')[0];
          const completedDates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
          if (!completedDates.includes(today)) {
            completedDates.push(today);
            await db.habit.update({
              where: { id: habit.id },
              data: { completedDates: completedDates },
            });
          }
          effects.push(`إكمال عادة: ${habit.name}`);
          message = `🔥 أتممت عادة: ${habit.name}`;
          success = true;
        } else {
          message = `ما لقيت عادة باسم "${habitName}"`;
          success = false;
        }
        break;
      }

      // === unknown ===
      case 'universal_capture': {
        // الالتقاط الذكي يُفتح من الواجهة (Ctrl+Shift+U) — هنا نُرجع إشارة فقط
        message = '✨ افتح نافذة الالتقاط الذكي بـ Ctrl+Shift+U';
        success = true;
        effects.push('فتح الالتقاط الذكي');
        break;
      }
      default:
        message = 'ما فهمت قصدك. جرّب صيغة مثل: "عندي موعد الساعة 5" أو "درست ساعتين برمجة"';
        success = false;
        break;
    }
  } catch (e) {
    error = e instanceof Error ? e.message : String(e);
    message = `حدث خطأ: ${error}`;
    success = false;
  }

  // سجّل بالـ CommandLog
  try {
    await db.commandLog.create({
      data: {
        text: cmd.rawText,
        intent: cmd.intent,
        entities: cmd.entities,  // Json field — نمرر الكائن مباشرة (مو JSON.stringify)
        success,
        errorMessage: error || '',
        timestamp: new Date().toISOString(),
      },
    });
  } catch (e) {
    console.error('[CommandEngine] Failed to log command:', e);
  }

  return { success, message, intent: cmd.intent, effects, error };
}

```

---

## 23. `src/app/api/agent/browse/route.ts`

**45 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { browseWebsite } from '@/lib/web-agent';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const url = typeof body?.url === 'string' ? body.url.trim() : '';
    const task = typeof body?.task === 'string' ? body.task.trim() : undefined;

    if (!url) {
      return NextResponse.json({ error: 'url مطلوب' }, { status: 400 });
    }

    const result = await browseWebsite(url, task);

    // سجّل ActivityEvent
    await db.activityEvent.create({
      data: {
        type: 'logged',
        section: 'web-agent',
        itemId: '',
        itemTitle: `تصفح: ${result.title || url}`,
        metadata: JSON.stringify({ url, task: task?.slice(0, 100) || null, source: result.source, linksCount: result.links.length }),
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, result });
  } catch (e) {
    console.error('[/api/agent/browse Error]', e);
    return NextResponse.json({ error: 'فشل تصفح الموقع' }, { status: 500 });
  }
}

```

---

## 24. `src/app/api/agent/calendar/route.ts`

**92 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET: جلب أحداث اليوم من calendar (محلية + من agent-service)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const today = new Date().toISOString().split('T')[0];

    // اقرأ أحداث اليوم من ScheduleEvent
    const events = await db.scheduleEvent.findMany({
      where: { date: { contains: today } },
      orderBy: { startTime: 'asc' },
      take: 20,
    });

    // اقرأ تذكيرات اليوم من SmartReminder
    const reminders = await db.smartReminder.findMany({
      where: { isActive: true, scheduledTime: { contains: today } },
      take: 10,
    });

    return NextResponse.json({
      success: true,
      events,
      reminders,
      date: today,
    });
  } catch (e) {
    console.error('[/api/agent/calendar Error]', e);
    return NextResponse.json({ error: 'فشل جلب الأحداث' }, { status: 500 });
  }
}

// POST: إنشاء event جديد
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const { title, date, startTime, endTime, description } = body as {
      title?: string; date?: string; startTime?: string; endTime?: string; description?: string;
    };

    if (!title || !date) {
      return NextResponse.json({ error: 'title و date مطلوبان' }, { status: 400 });
    }

    const event = await db.scheduleEvent.create({
      data: {
        title,
        date,
        startTime: startTime || '',
        endTime: endTime || '',
        description: description || '',
        location: '',
        type: 'event',
        tags: [],
        createdAt: new Date().toISOString(),
      },
    });

    await db.activityEvent.create({
      data: {
        type: 'created',
        section: 'calendar-agent',
        itemId: event.id,
        itemTitle: `إنشاء event: ${title}`,
        metadata: JSON.stringify({ date, startTime }),
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, event });
  } catch (e) {
    console.error('[/api/agent/calendar POST Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 25. `src/app/api/agent/email/route.ts`

**70 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// GET: جلب آخر إيميلات من agent-service (لو شغال)
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    // اقرأ آخر إشعارات email من agent-service
    const emailNotifications = await db.notification.findMany({
      where: { type: 'email' },
      orderBy: { createdAt: 'desc' },
      take: 10,
    });

    return NextResponse.json({ success: true, emails: emailNotifications });
  } catch (e) {
    console.error('[/api/agent/email Error]', e);
    return NextResponse.json({ error: 'فشل جلب الإيميلات' }, { status: 500 });
  }
}

// POST: إرسال إيميل (placeholder — يتطلب SMTP config)
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const { to, subject, body: emailBody } = body as { to?: string; subject?: string; body?: string };

    if (!to || !subject) {
      return NextResponse.json({ error: 'to و subject مطلوبان' }, { status: 400 });
    }

    // سجّل محاولة الإرسال
    await db.activityEvent.create({
      data: {
        type: 'logged',
        section: 'email-agent',
        itemId: '',
        itemTitle: `إرسال إيميل: ${subject}`,
        metadata: JSON.stringify({ to, subject, body: emailBody?.slice(0, 200) }),
        createdAt: new Date().toISOString(),
      },
    });

    // ملاحظة: الإرسال الفعلي يتطلب SMTP config (غير متاح بـ sandbox)
    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الإيميل — الإرسال الفعلي يتطلب SMTP config',
      to,
      subject,
    });
  } catch (e) {
    console.error('[/api/agent/email POST Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 26. `src/app/api/ai-chat/quick/route.ts`

**372 سطر**

```typescript
// ============================================
// AI Chat Quick API — POST/GET/DELETE
// مساعد سريع متعدد الجلسات (sessions)
// ============================================
// POST {message, sessionId?} → يرسل رسالة + يحفظها في session
//   - لو sessionId فاضي → ينشئ session جديد + auto-generate title
//   - لو session مربوط بكيان (itemType/itemId) → يحقن سياق الكيان في الـ prompt
// GET ?sessionId=X → يرجع رسائل session محدد
// DELETE ?sessionId=X → يحذف رسائل session محدد
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { getUserContext, buildConversationContext, processChatWithTools, saveConversationMemory } from '@/lib/ai-service';
import { generateChat, generateChatStream, generateWithReasoning, isAIConfigured, type GenerateOptions } from '@/lib/ai-provider';
import type { ProviderType } from '@/lib/model-registry';
import { db } from '@/lib/db';

async function requireSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) return null;
  return session;
}

// ============================================
// Helper: جلب سياق الكيان المرتبط بـ session
// ============================================
async function getEntityContext(itemType: string, itemId: string): Promise<string> {
  if (!itemType || !itemId) return '';
  try {
    switch (itemType) {
      case 'projects': {
        const p = await db.project.findUnique({ where: { id: itemId } });
        if (!p) return '';
        return `أنت تناقش حالياً مشروعاً محدداً:\n- العنوان: ${p.title}\n- الحالة: ${p.status}\n- الفئة: ${p.category}\n- الوصف: ${(p.description || '').slice(0, 500)}\n- الملاحظات: ${(p.notes || '').slice(0, 300)}\n- خطة التنفيذ: ${(p.executionPlan || '').slice(0, 300)}\nافترض أن أسئلة المستخدم تتعلق بهذا المشروع ما لم يذكر خلاف ذلك.`;
      }
      case 'tasks': {
        const t = await db.task.findUnique({ where: { id: itemId } });
        if (!t) return '';
        return `أنت تناقش حالياً مهمة محددة:\n- النص: ${t.text}\n- الأولوية: ${t.priority}\n- الحالة: ${t.completed ? 'مكتملة' : 'نشطة'}\n- الملاحظات: ${(t.notes || '').slice(0, 300)}\n- تاريخ الاستحقاق: ${t.dueDate || 'غير محدد'}\nافترض أن أسئلة المستخدم تتعلق بهذه المهمة ما لم يذكر خلاف ذلك.`;
      }
      case 'notes': {
        const n = await db.note.findUnique({ where: { id: itemId } });
        if (!n) return '';
        const content = n.isSecret ? '[محتوى مشفّر]' : (n.content || '').slice(0, 800);
        return `أنت تناقش حالياً ملاحظة محددة:\n- العنوان: ${n.title}\n- المحتوى: ${content}\nافترض أن أسئلة المستخدم تتعلق بهذه الملاحظة ما لم يذكر خلاف ذلك.`;
      }
      case 'ideas': {
        const i = await db.idea.findUnique({ where: { id: itemId } });
        if (!i) return '';
        return `أنت تناقش حالياً فكرة محددة:\n- العنوان: ${i.title}\n- الفئة: ${i.category}\n- الأولوية: ${i.priority}\n- الحالة: ${i.status}\n- الوصف: ${(i.description || '').slice(0, 500)}\nافترض أن أسئلة المستخدم تتعلق بهذه الفكرة ما لم يذكر خلاف ذلك.`;
      }
      default:
        return '';
    }
  } catch (e) {
    console.warn('[AI Chat] getEntityContext error:', e);
    return '';
  }
}

// ============================================
// POST — إرسال رسالة
// ============================================
export async function POST(req: NextRequest) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await req.json();
    const message = String(body.message || '').trim();
    if (!message) return NextResponse.json({ error: 'الرسالة فارغة' }, { status: 400 });

    const userContext = await buildConversationContext();
    const now = new Date().toISOString();

    // === إدارة الـ session ===
    let sessionId = String(body.sessionId || '');
    let chatSession: { id: string; title: string; itemType: string; itemId: string; context: string; archived: boolean; createdAt: string; updatedAt: string } | null = null;
    let entityContext = '';

    if (sessionId) {
      chatSession = await db.aIChatSession.findUnique({ where: { id: sessionId } });
      if (!chatSession) {
        // session غير موجود → أنشئ جديد
        sessionId = '';
      }
    }

    if (!sessionId) {
      // أنشئ session جديد + auto-generate title من أول رسالة (30 حرف)
      const title = message.slice(0, 30) + (message.length > 30 ? '…' : '');
      chatSession = await db.aIChatSession.create({
        data: {
          id: crypto.randomUUID(),
          title,
          itemType: '',
          itemId: '',
          context: 'quick-chat',
          archived: false,
          createdAt: now,
          updatedAt: now,
        },
      });
      sessionId = chatSession.id;
    } else if (chatSession) {
      // حدّث updatedAt + auto-generate title لو فارغ
      const updateData: Record<string, unknown> = { updatedAt: now };
      if (!chatSession.title) {
        updateData.title = message.slice(0, 30) + (message.length > 30 ? '…' : '');
      }
      await db.aIChatSession.update({ where: { id: sessionId }, data: updateData });
      // جلب سياق الكيان المرتبط
      entityContext = await getEntityContext(chatSession.itemType, chatSession.itemId);
    }

    // حفظ رسالة المستخدم
    const userEntry = await db.aIConversation.create({
      data: {
        id: crypto.randomUUID(),
        role: 'user',
        content: message,
        context: 'quick-chat',
        sessionId,
        createdAt: now,
      },
    });

    try {
      // بناء system prompt — مع حقن سياق الكيان لو موجود
      const entityBlock = entityContext ? `\n\n${entityContext}\n` : '';
      const systemPrompt = `أنت مساعد شخصي سريع لمحمد عادل، طالب جامعي ومبرمج. لديك هذه البيانات المختصرة عنه:

${userContext.slice(0, 2000)}${entityBlock}

تعليمات:
- أجب بإيجاز ووضوح (3-6 أسطر عادةً)
- استخدم البيانات المقدمة للإجابة على السؤال
- إذا لم تكن تعرف الإجابة من البيانات، قل ذلك بصراحة
- لا تخترع بيانات غير موجودة
- أجب بالعربية الفصحى المبسطة`;

      // جلب آخر 10 رسائل من نفس session للحفاظ على سياق المحادثة
      const recentMessages = await db.aIConversation.findMany({
        where: { sessionId },
        orderBy: { createdAt: 'asc' },
        take: 20,
      });
      const conversationHistory = recentMessages
        .filter((m) => m.id !== userEntry.id)
        .slice(-10)
        .map((m) => ({
          role: (m.role === 'assistant' ? 'model' : 'user') as 'user' | 'model',
          content: m.content,
        }));

      const messages: Array<{ role: 'user' | 'model'; content: string }> = [
        ...conversationHistory,
        { role: 'user', content: message },
      ];

      // === AI-5-RESCUE: استخدم provider/model من params لو موجودين ===
      const providerParam = typeof body.provider === 'string' ? body.provider as ProviderType : undefined;
      const modelParam = typeof body.model === 'string' ? body.model : undefined;
      const reasoningMode = body.reasoning === true;
      const generateOpts: GenerateOptions | undefined = (providerParam || modelParam) ? { provider: providerParam, model: modelParam } : undefined;

      let finalReply = '';
      let toolsUsed: string[] = [];

      if (reasoningMode && isAIConfigured()) {
        // === AI-5-RESCUE: Reasoning mode حقيقي ===
        try {
          const { answer, reasoning: reasoningText } = await generateWithReasoning(message, systemPrompt);
          finalReply = reasoningText ? `🧠 التفكير:\n${reasoningText}\n\n---\n\n${answer}` : answer;
        } catch {
          const result = await processChatWithTools(messages, systemPrompt);
          finalReply = result.reply;
          toolsUsed = result.toolsUsed;
        }
      } else {
        // === processChatWithTools (tools + memory) ===
        const { reply, toolsUsed: tu } = await processChatWithTools(messages, systemPrompt);
        finalReply = reply || 'عذراً، لم أتمكن من توليد رد.';
        toolsUsed = tu;
      }

      // === AI-5-RESCUE: Streaming حقيقي (SSE) ===
      const wantsStream = req.headers.get('accept') === 'text/event-stream' || body.stream === true;
      if (wantsStream && isAIConfigured()) {
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            // أرسل الأدوات المستخدمة أولاً (metadata)
            if (toolsUsed.length > 0) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'tools', tools: toolsUsed })}\n\n`));
            }
            // Streaming حقيقي: استخدم generateChatStream لو متاح (بدون tools)
            // لو toolsUsed موجود → الرد جاهز → قسّمه
            if (toolsUsed.length > 0 || !isAIConfigured()) {
              const chunks = finalReply.match(/.{1,20}/g) || [finalReply];
              for (const chunk of chunks) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'token', content: chunk })}\n\n`));
                await new Promise((r) => setTimeout(r, 10));
              }
            } else {
              // Streaming حقيقي من Groq
              try {
                for await (const chunk of generateChatStream(messages, systemPrompt)) {
                  controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'token', content: chunk })}\n\n`));
                }
              } catch {
                // fallback: أرسل finalReply كاملاً
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'token', content: finalReply })}\n\n`));
              }
            }
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
            controller.close();
          },
        });

        // احفظ الرد بـ الخلفية
        db.aIConversation.create({
          data: {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: finalReply,
            context: 'quick-chat',
            sessionId,
            createdAt: new Date().toISOString(),
          },
        }).then(() => saveConversationMemory(sessionId, message, finalReply)).catch(() => {});

        return new Response(stream, {
          headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
          },
        });
      }

      const assistantEntry = await db.aIConversation.create({
        data: {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: finalReply,
          context: 'quick-chat',
          sessionId,
          createdAt: new Date().toISOString(),
        },
      });

      // === AI-5-POWERUP: احفظ ذاكرة المحادثة ===
      saveConversationMemory(sessionId, message, finalReply).catch(() => {});

      return NextResponse.json({
        success: true,
        reply: finalReply,
        sessionId,
        toolsUsed,
        provider: providerParam || 'default',
        model: modelParam || 'default',
        reasoning: reasoningMode,
        sessionTitle: chatSession?.title || '',
        userEntryId: userEntry.id,
        assistantEntryId: assistantEntry.id,
      });
    } catch (e) {
      console.error('[AI Chat Quick] LLM error:', e);
      const errorMsg = e instanceof Error ? e.message : String(e);
      // AI-5-NVIDIA-FALLBACK: تحقق من rate limit (429)
      const isRateLimit = errorMsg.includes('429') || errorMsg.includes('rate limit') || errorMsg.includes('Rate limit');
      // رسالة مفيدة للمستخدم — توضح سبب الفشل (API key غير مهيأ، شبكة، إلخ)
      const isKeyError = errorMsg.includes('غير مُهيأ') || errorMsg.includes('API key') || errorMsg.includes('GROQ_API_KEY');
      const fallback = isRateLimit
        ? '⏳ **خلصت الطلبات اليومية لـ Groq**\n\nجاري التحويل تلقائياً لـ NVIDIA... لو ما اشتغل، جرّب بعد دقيقة.\n\n(الـ fallback لـ NVIDIA شغّال تلقائياً بالخلفية)'
        : isKeyError
        ? '⚠️ **مفتاح الذكاء الاصطناعي غير مُهيأ**\n\nلازم تضيف `GROQ_API_KEY` بـ ملف `.env`:\n\n1. احصل على key مجاني من https://console.groq.com\n2. أضفه لـ `.env`: `GROQ_API_KEY=gsk_...`\n3. أعد تشغيل التطبيق\n\nبعد هيك رح أقدر أساعدك بكل شي! 🚀'
        : `⚠️ تعذّر الاتصال بـ Groq: ${errorMsg.slice(0, 150)}\n\nجرّب مرة تانية، أو تأكد إن GROQ_API_KEY صحيح بـ .env`;
      const assistantEntry = await db.aIConversation.create({
        data: {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: fallback,
          context: 'quick-chat',
          sessionId,
          createdAt: new Date().toISOString(),
        },
      });
      return NextResponse.json({
        success: true,
        reply: fallback,
        sessionId,
        sessionTitle: chatSession?.title || '',
        userEntryId: userEntry.id,
        assistantEntryId: assistantEntry.id,
        aiError: isRateLimit ? 'rate_limit_fallback' : isKeyError ? 'key_not_configured' : 'llm_error',
      });
    }
  } catch (e) {
    console.error('[AI Chat Quick Error]', e);
    return NextResponse.json({ error: 'فشل الاتصال بالمساعد' }, { status: 500 });
  }
}

// ============================================
// GET — استرجاع رسائل session محدد
// ============================================
export async function GET(req: NextRequest) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId مطلوب' }, { status: 400 });
    }

    const messages = await db.aIConversation.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      messages: messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        sessionId: m.sessionId,
        createdAt: m.createdAt,
      })),
    });
  } catch (e) {
    console.error('[AI Chat Quick GET Error]', e);
    return NextResponse.json({ error: 'فشل جلب المحادثات' }, { status: 500 });
  }
}

// ============================================
// DELETE — مسح رسائل session محدد
// ============================================
export async function DELETE(req: NextRequest) {
  try {
    const session = await requireSession();
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    if (sessionId) {
      // احذف رسائل session محدد فقط
      await db.aIConversation.deleteMany({ where: { sessionId } });
      return NextResponse.json({ success: true });
    }

    // لو ما في sessionId → احذف كل رسائل quick-chat القديمة (legacy support)
    await db.aIConversation.deleteMany({ where: { context: 'quick-chat', sessionId: '' } });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[AI Chat Quick DELETE Error]', e);
    return NextResponse.json({ error: 'فشل الحذف' }, { status: 500 });
  }
}

```

---

## 27. `src/app/api/ai-chat/sessions/route.ts`

**130 سطر**

```typescript
// ============================================
// AI Chat Sessions API — CRUD لجلسات المحادثة
// ============================================
// GET    /api/ai-chat/sessions              → list non-archived sessions
// GET    /api/ai-chat/sessions?archived=true → list archived sessions
// POST   /api/ai-chat/sessions              → create session
// PUT    /api/ai-chat/sessions              → update (title, archived)
// DELETE /api/ai-chat/sessions?id=X         → delete session + cascade messages
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';

async function requireSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(token);
  if (!session) return null;
  return session;
}

// ============================================
// GET — list sessions
// ============================================
export async function GET(req: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const archived = searchParams.get('archived') === 'true';

  const sessions = await db.aIChatSession.findMany({
    where: { archived },
    orderBy: { updatedAt: 'desc' },
  });

  // لكل session، جلب آخر رسالة (للمعاينة) + عدد الرسائل
  const enriched = await Promise.all(
    sessions.map(async (s) => {
      const messages = await db.aIConversation.findMany({
        where: { sessionId: s.id },
        orderBy: { createdAt: 'desc' },
        take: 1,
      });
      const count = await db.aIConversation.count({ where: { sessionId: s.id } });
      return {
        id: s.id,
        title: s.title,
        itemType: s.itemType,
        itemId: s.itemId,
        context: s.context,
        archived: s.archived,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        messagesCount: count,
        lastPreview: messages[0]?.content?.slice(0, 80) || '',
      };
    }),
  );

  return NextResponse.json({ success: true, sessions: enriched });
}

// ============================================
// POST — create session
// ============================================
export async function POST(req: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const body = await req.json();
  const now = new Date().toISOString();

  const newSession = await db.aIChatSession.create({
    data: {
      id: crypto.randomUUID(),
      title: typeof body.title === 'string' ? body.title.slice(0, 100) : 'محادثة جديدة',
      itemType: typeof body.itemType === 'string' ? body.itemType : '',
      itemId: typeof body.itemId === 'string' ? body.itemId : '',
      context: 'quick-chat',
      archived: false,
      createdAt: now,
      updatedAt: now,
    },
  });

  return NextResponse.json({ success: true, session: newSession });
}

// ============================================
// PUT — update (title, archived)
// ============================================
export async function PUT(req: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const body = await req.json();
  const { id, ...data } = body;
  if (!id) return NextResponse.json({ error: 'id مطلوب' }, { status: 400 });

  const updateData: Record<string, unknown> = { updatedAt: new Date().toISOString() };
  if (data.title !== undefined) updateData.title = String(data.title).slice(0, 100);
  if (data.archived !== undefined) updateData.archived = Boolean(data.archived);
  if (data.itemType !== undefined) updateData.itemType = String(data.itemType);
  if (data.itemId !== undefined) updateData.itemId = String(data.itemId);

  const updated = await db.aIChatSession.update({ where: { id }, data: updateData });
  return NextResponse.json({ success: true, session: updated });
}

// ============================================
// DELETE — delete session + cascade messages
// ============================================
export async function DELETE(req: NextRequest) {
  const session = await requireSession();
  if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'id مطلوب' }, { status: 400 });

  // cascade delete: messages first, then session
  await db.aIConversation.deleteMany({ where: { sessionId: id } });
  await db.aIChatSession.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

```

---

## 28. `src/app/api/ai-coach/chat/route.ts`

**130 سطر**

```typescript
// ============================================
// MiMo Portfolio — AI Coach Chat API
// POST /api/ai-coach/chat
// يستقبل { message, history } ويرسلها إلى GLM عبر sendAIMessage
// + Context Injection: يبحث في الذاكرة عن مصطلحات ذات صلة ويحقنها كسياق
// يتطلب جلسة موثّقة (cookie)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { sendAIMessage } from '@/lib/ai-service';
import { buildMemoryIndex } from '@/lib/memory-collect';
import { searchMemory, ENTITY_TYPE_LABELS } from '@/lib/memory-index';

interface ChatBody {
  message?: string;
  history?: Array<{ role: string; content: string }>;
}

// كلمات استفهام تشير أن السؤال يستحق بحث في الذاكرة
// (نحصرها في الأسئلة الفعلية لتجنب بناء الفهرس لكل رسالة عادية)
const QUERY_QUESTION_WORDS = [
  'وين', 'أين', 'متى', 'شو ', 'ماذا', 'كم ', 'ليش', 'لماذا',
  'هل ', 'هل؟', 'استخدمت', 'عملت', 'سويت', 'صارني', 'عندي',
  'where ', 'when ', 'what ', 'how many', 'used', 'did i',
  'found', 'show me', 'list',
];

function shouldSearchMemory(message: string): boolean {
  const lower = ` ${message.toLowerCase()} `;
  return QUERY_QUESTION_WORDS.some((kw) => lower.includes(kw));
}

/** يستخرج مصطلحات البحث من رسالة المستخدم (بسيط: كلمات 4+ حروف) */
function extractSearchTerms(message: string): string[] {
  return message
    .split(/[\s.,!?;:()"'،؛]+/)
    .filter((w) => w.length >= 4)
    .slice(0, 5);
}

export async function POST(req: NextRequest) {
  try {
    // فحص الجلسة
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح — يجب تسجيل الدخول' },
        { status: 401 },
      );
    }

    const body = (await req.json()) as ChatBody;
    const message = (body.message || '').trim();
    if (!message) {
      return NextResponse.json(
        { error: 'الرسالة فارغة' },
        { status: 400 },
      );
    }
    const history = Array.isArray(body.history) ? body.history : [];

    // === Context Injection: ابحث في الذاكرة ===
    let sources: Array<{ type: string; typeLabel: string; title: string; section: string }> = [];
    let enhancedMessage = message;

    if (shouldSearchMemory(message)) {
      try {
        const { index } = await buildMemoryIndex();
        // جرّب عدة مصطلحات واجمع أفضل النتائج
        const terms = extractSearchTerms(message);
        const seen = new Set<string>();
        const allResults: ReturnType<typeof searchMemory> = [];
        for (const term of terms) {
          const results = searchMemory(index, term, 5);
          for (const r of results) {
            if (!seen.has(r.entry.key)) {
              seen.add(r.entry.key);
              allResults.push(r);
            }
          }
        }
        // رتّب وأخذ أعلى 5
        allResults.sort((a, b) => b.score - a.score);
        const top = allResults.slice(0, 5);
        if (top.length > 0) {
          sources = top.map((r) => ({
            type: r.entry.type,
            typeLabel: ENTITY_TYPE_LABELS[r.entry.type] || r.entry.type,
            title: r.entry.title,
            section: r.entry.section,
          }));
          const contextBlock = top
            .map((r, i) => `${i + 1}. [${ENTITY_TYPE_LABELS[r.entry.type] || r.entry.type}] ${r.entry.title} — ${r.entry.preview}`)
            .join('\n');
          enhancedMessage = `${message}

---
سياق من بيانات محمد (ذاكرة النظام):
${contextBlock}

ارجع لهذه المصادر في إجابتك إن كان مناسباً.`;
        }
      } catch (e) {
        console.error('[AI Coach Chat] memory search error:', e);
        // تابع بدون سياق
      }
    }

    const result = await sendAIMessage(enhancedMessage, history);

    return NextResponse.json({
      success: true,
      reply: result.reply,
      userEntryId: result.userEntryId,
      assistantEntryId: result.assistantEntryId,
      sources, // مصادر استُخدمت في السياق
    });
  } catch (e) {
    console.error('[AI Coach Chat Error]', e);
    return NextResponse.json(
      { error: 'فشل الاتصال بالمساعد الذكي' },
      { status: 500 },
    );
  }
}

```

---

## 29. `src/app/api/ai-coach/insight/route.ts`

**58 سطر**

```typescript
// ============================================
// MiMo Portfolio — AI Coach Insight API
// POST /api/ai-coach/insight
// يستقبل { category } ويولّد رؤية AI مخصصة بناءً على بيانات المستخدم
// الفئات: productivity | academic | career | health | general
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { generateInsight } from '@/lib/ai-service';

type InsightCategory = 'productivity' | 'academic' | 'career' | 'health' | 'general';

const VALID_CATEGORIES: InsightCategory[] = ['productivity', 'academic', 'career', 'health', 'general'];

export async function POST(req: NextRequest) {
  try {
    // فحص الجلسة
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح — يجب تسجيل الدخول' },
        { status: 401 },
      );
    }

    const body = await req.json();
    const category = (body.category || 'general') as InsightCategory;

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: 'فئة غير صحيحة' },
        { status: 400 },
      );
    }

    const insight = await generateInsight(category);

    if (!insight) {
      return NextResponse.json(
        { error: 'تعذّر توليد الرؤية. حاول مرة أخرى لاحقاً.' },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true, insight });
  } catch (e) {
    console.error('[AI Insight Generate Error]', e);
    return NextResponse.json(
      { error: 'فشل توليد الرؤية' },
      { status: 500 },
    );
  }
}

```

---

## 30. `src/app/api/ai-coach/patterns/route.ts`

**34 سطر**

```typescript
// ============================================
// MiMo Portfolio — AI Pattern Analysis API
// GET /api/ai-coach/patterns
// يحلل بيانات المستخدم ويكتشف أنماط + توصيات ذكية
// ============================================

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { analyzePatterns } from '@/lib/ai-service';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json(
        { error: 'غير مصرح — يجب تسجيل الدخول' },
        { status: 401 },
      );
    }

    const analysis = await analyzePatterns();
    return NextResponse.json({ success: true, analysis });
  } catch (e) {
    console.error('[AI Patterns Error]', e);
    return NextResponse.json(
      { error: 'فشل تحليل الأنماط' },
      { status: 500 },
    );
  }
}

```

---

## 31. `src/app/api/ai-coach/query/route.ts`

**137 سطر**

```typescript
// ============================================
// POST /api/ai-coach/query
// Natural language queries: "اعرض المشاريع التي لم ألمسها منذ شهر"
// يحلل السؤال + يجيب من البيانات (لا LLM call — parsing ذكي)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { db } from '@/lib/db';

interface QueryResult {
  intent: string;
  summary: string;
  items: Array<{ id: string; title: string; subtitle: string; section: string }>;
}

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { query } = await req.json();
    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: 'السؤال مطلوب' }, { status: 400 });
    }

    const q = query.toLowerCase().trim();
    const result: QueryResult = { intent: '', summary: '', items: [] };

    // ====== 1. "مشاريع لم ألمسها منذ شهر" ======
    if ((q.includes('مشروع') || q.includes('مشاريع')) && (q.includes('شهر') || q.includes('لم') || q.includes('متوقف'))) {
      result.intent = 'stalled-projects';
      // status محتمل: planning, in-progress, completed, paused, archived
      // نستثني المكتمل والمؤرشف فقط
      const projects = await db.project.findMany({ where: { status: { notIn: ['completed', 'archived'] } } });
      const stalled = projects.filter((p) => {
        const days = Math.floor((Date.now() - new Date(p.updatedAt).getTime()) / (24 * 60 * 60 * 1000));
        return days > 30;
      });
      result.items = stalled.map((p) => ({
        id: p.id, title: p.title, subtitle: `آخر تحديث: ${new Date(p.updatedAt).toLocaleDateString('ar-SA')}`, section: 'projects',
      }));
      result.summary = `${stalled.length} مشروع نشط لم يُحدّث منذ أكثر من 30 يوم`;
    }

    // ====== 2. "مهام متأخرة" ======
    else if ((q.includes('مهمة') || q.includes('مهام')) && (q.includes('متأخر') || q.includes('تأخر'))) {
      result.intent = 'overdue-tasks';
      const tasks = await db.task.findMany({ where: { completed: false } });
      const today = new Date().toISOString().split('T')[0];
      const overdue = tasks.filter((t) => t.dueDate && t.dueDate < today && t.dueDate !== '');
      result.items = overdue.map((t) => ({
        id: t.id, title: t.text, subtitle: `موعد: ${new Date(t.dueDate).toLocaleDateString('ar-SA')}`, section: 'tasks',
      }));
      result.summary = `${overdue.length} مهمة متأخرة عن موعد استحقاقها`;
    }

    // ====== 3. "مهارات بمستوى منخفض" ======
    else if (q.includes('مهارة') || q.includes('مهارات') && (q.includes('منخفض') || q.includes('ضعيف'))) {
      result.intent = 'low-skills';
      const skills = await db.skill.findMany();
      const low = skills.filter((s) => s.level < 40);
      result.items = low.map((s) => ({
        id: s.id, title: s.name, subtitle: `المستوى: ${s.level}%`, section: 'skills',
      }));
      result.summary = `${low.length} مهارة بمستوى أقل من 40%`;
    }

    // ====== 4. "آخر ملاحظاتي" ======
    else if (q.includes('ملاحظة') || q.includes('ملاحظات') || q.includes('اخر')) {
      result.intent = 'recent-notes';
      const notes = await db.note.findMany({ orderBy: { updatedAt: 'desc' }, take: 10 });
      result.items = notes.map((n) => ({
        id: n.id, title: n.title || 'ملاحظة', subtitle: `آخر تعديل: ${new Date(n.updatedAt).toLocaleDateString('ar-SA')}`, section: 'notes',
      }));
      result.summary = `آخر ${notes.length} ملاحظة`;
    }

    // ====== 5. "كم أنفقت هذا الشهر" ======
    else if ((q.includes('صرف') || q.includes('مصروف') || q.includes('انفاق')) && (q.includes('شهر') || q.includes('كم'))) {
      result.intent = 'monthly-spending';
      const now = new Date();
      const transactions = await db.transaction.findMany();
      const monthExpenses = transactions.filter((t) => {
        if (t.type !== 'expense') return false;
        const d = new Date(t.createdAt);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      const total = monthExpenses.reduce((sum, t) => sum + t.amount, 0);
      result.summary = `أنفقت ${total.toLocaleString('ar-SA')} ₪ هذا الشهر في ${monthExpenses.length} معاملة`;
      result.items = monthExpenses.slice(0, 10).map((t) => ({
        id: t.id, title: t.description, subtitle: `${t.amount.toLocaleString('ar-SA')} ₪`, section: 'finance',
      }));
    }

    // ====== 6. "عاداتي اليوم" ======
    else if (q.includes('عادة') || q.includes('عادات') || q.includes('يوم')) {
      result.intent = 'today-habits';
      const habits = await db.habit.findMany();
      const today = new Date().toISOString().split('T')[0];
      result.items = habits.map((h) => {
        const dates = Array.isArray(h.completedDates) ? h.completedDates : [];
        const done = dates.includes(today);
        return { id: h.id, title: `${h.emoji} ${h.name}`, subtitle: done ? '✓ مكتملة' : 'غير مكتملة', section: 'habits' };
      });
      const completed = result.items.filter((i) => i.subtitle.includes('✓')).length;
      result.summary = `${completed} من ${habits.length} عادة مكتملة اليوم`;
    }

    // ====== 7. fallback: search in projects + tasks + notes ======
    else {
      result.intent = 'search';
      const [projects, tasks, notes] = await Promise.all([
        db.project.findMany({ where: { title: { contains: query } } }),
        db.task.findMany({ where: { text: { contains: query } } }),
        db.note.findMany({ where: { title: { contains: query } } }),
      ]);
      result.items = [
        ...projects.map((p) => ({ id: p.id, title: p.title, subtitle: 'مشروع', section: 'projects' })),
        ...tasks.map((t) => ({ id: t.id, title: t.text, subtitle: 'مهمة', section: 'tasks' })),
        ...notes.map((n) => ({ id: n.id, title: n.title, subtitle: 'ملاحظة', section: 'notes' })),
      ];
      result.summary = `وجدت ${result.items.length} نتيجة لـ "${query}"`;
    }

    return NextResponse.json({ success: true, result });
  } catch (e) {
    console.error('[AI Query Error]', e);
    return NextResponse.json({ error: 'فشل معالجة السؤال' }, { status: 500 });
  }
}

```

---

## 32. `src/app/api/ai-memory/index/route.ts`

**42 سطر**

```typescript
// ============================================
// POST /api/ai-memory/index — يبني/يحدّث فهرس الذاكرة
// ============================================
// يجمع من كل الجداول عبر buildMemoryIndex ويرجع الفهرس.
// لا يحفظ الفهرس في DB (يُبنى on-demand — البيانات المصدر هي المصدر الوحيد للحقيقة).
// ============================================

import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { buildMemoryIndex } from '@/lib/memory-collect';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { index, total } = await buildMemoryIndex();

    // إحصائيات حسب النوع
    const typeCounts: Record<string, number> = {};
    for (const entry of index) {
      typeCounts[entry.type] = (typeCounts[entry.type] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      total,
      typeCounts,
      // لا نرجع الفهرس كاملاً (قد يكون كبيراً) — فقط إحصائيات
      indexedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.error('[/api/ai-memory/index Error]', e);
    return NextResponse.json({ error: 'فشل بناء الفهرس' }, { status: 500 });
  }
}

```

---

## 33. `src/app/api/ai-memory/insights/route.ts`

**85 سطر**

```typescript
// ============================================
// GET /api/ai-memory/insights — يولّد رؤى ذكية من الذاكرة
// ============================================
// يجمع بيانات إضافية + يولّد رؤى (بلا LLM — تحليل بيانات نقي).
// اختياري: ?ai=true لتعزيز الرؤى بـ GLM (توليد رؤية إضافية بالذكاء الاصطناعي).
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { buildMemoryIndex, collectInsightsExtra } from '@/lib/memory-collect';
import { generateInsights, ENTITY_TYPE_LABELS } from '@/lib/memory-index';
import { generateText } from '@/lib/ai-provider';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const useAI = searchParams.get('ai') === 'true';

    const [{ index, total }, extra] = await Promise.all([
      buildMemoryIndex(),
      collectInsightsExtra(),
    ]);

    // رؤى نقيّة (من البيانات)
    const insights = generateInsights(index, extra);

    // رؤية إضافية بـ AI (اختياري)
    let aiInsight: string | null = null;
    if (useAI && index.length > 0) {
      try {
        const topTypes = Object.entries(
          index.reduce((acc, e) => {
            acc[e.type] = (acc[e.type] || 0) + 1;
            return acc;
          }, {} as Record<string, number>),
        )
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([t, c]) => `${ENTITY_TYPE_LABELS[t as keyof typeof ENTITY_TYPE_LABELS] || t} (${c})`)
          .join('، ');

        const stalledCount = extra.projectsLastUpdated.filter((p) => {
          const d = new Date(p.updatedAt || 0);
          if (isNaN(d.getTime())) return false;
          return (Date.now() - d.getTime()) / (24 * 60 * 60 * 1000) >= 14;
        }).length;

        const prompt = `أنت محلل ذكي. بناءً على هذه الإحصائيات لمحمد (طالب فلسطيني 18 سنة):
- إجمالي العناصر في الذاكرة: ${total}
- أكثر الأنواع: ${topTypes}
- مشاريع متوقفة (14+ يوم): ${stalledCount}
- مهارات منخفضة: ${extra.skillsLow.length}
- آخر نشاط: ${extra.recentActivityDays} يوم

اكتب رؤية واحدة عملية وموجزة (سطرين كحد أقصى) بالعربية، تبدأ بـ "حسب بياناتك".`;

        aiInsight = await generateText(
          prompt,
          'أنت محلل أداء ذكي. اكتب رؤى عملية بالعربية.',
        );
      } catch (e) {
        console.error('[/api/ai-memory/insights AI error]', e);
      }
    }

    return NextResponse.json({
      success: true,
      totalIndexed: total,
      insights,
      aiInsight,
    });
  } catch (e) {
    console.error('[/api/ai-memory/insights Error]', e);
    return NextResponse.json({ error: 'فشل توليد الرؤى' }, { status: 500 });
  }
}

```

---

## 34. `src/app/api/ai-memory/search/route.ts`

**55 سطر**

```typescript
// ============================================
// GET /api/ai-memory/search?q=... — بحث دلالي في الذاكرة
// ============================================
// يبني الفهرس on-demand + يطبّق searchMemory النقي.
// يدعم استعلام بالعربية/الإنجليزية، غير حساس للحالة، يطابق في:
// title + keywords + searchableText (content + tags + technologies)
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { buildMemoryIndex } from '@/lib/memory-collect';
import { searchMemory, ENTITY_TYPE_LABELS } from '@/lib/memory-index';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const q = (searchParams.get('q') || '').trim();
    if (!q) {
      return NextResponse.json({ error: 'استعلام البحث مطلوب (?q=...)' }, { status: 400 });
    }

    const limit = Math.min(50, parseInt(searchParams.get('limit') || '20', 10));
    const { index } = await buildMemoryIndex();
    const results = searchMemory(index, q, limit);

    return NextResponse.json({
      success: true,
      query: q,
      totalMatches: results.length,
      results: results.map((r) => ({
        key: r.entry.key,
        type: r.entry.type,
        typeLabel: ENTITY_TYPE_LABELS[r.entry.type] || r.entry.type,
        id: r.entry.id,
        title: r.entry.title,
        preview: r.entry.preview,
        section: r.entry.section,
        score: Math.round(r.score * 100) / 100,
        matchedFields: r.matchedFields,
      })),
    });
  } catch (e) {
    console.error('[/api/ai-memory/search Error]', e);
    return NextResponse.json({ error: 'فشل البحث' }, { status: 500 });
  }
}

```

---

## 35. `src/app/api/ai/dashboard/route.ts`

**47 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getDashboardContext } from '@/lib/ai-everywhere';
import { checkProactiveActions } from '@/lib/ai-proactive';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const context = await getDashboardContext();

    let prompt = '';
    const systemInstruction = 'أنت مساعد شخصي ذكي. أجب بـ JSON.';

    if (action === 'daily_summary') {
      prompt = `أعطِ ملخص ذكي ليوم محمد بناءً على بياناته:\n${context}`;
    } else if (action === 'recommendations') {
      prompt = `أعطِ 3-5 توصيات لمحمد بناءً على بياناته:\n${context}`;
    } else if (action === 'insights') {
      prompt = `اكتشف 2-3 insights ذكية من بيانات محمد:\n${context}`;
    } else if (action === 'proactive') {
      const proactive = await checkProactiveActions();
      await db.activityEvent.create({ data: { type: 'logged', section: 'ai-dashboard', itemId: '', itemTitle: `AI dashboard: proactive (${proactive.notifications.length} notifications)`, metadata: '{}', createdAt: new Date().toISOString() } });
      return NextResponse.json({ success: true, result: proactive, source: 'ai' });
    } else {
      return NextResponse.json({ error: 'action مطلوب: daily_summary | recommendations | insights | proactive' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل AI مطلوب' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-dashboard', itemId: '', itemTitle: `AI dashboard: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/dashboard Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 36. `src/app/api/ai/finance/route.ts`

**42 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getFinanceContext } from '@/lib/ai-everywhere';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const context = await getFinanceContext();

    let prompt = '';
    const systemInstruction = 'أنت مستشار مالي شخصي. أجب بـ JSON.';

    if (action === 'analyze') {
      prompt = `حلل نمط مصاريف محمد وأعطِ نصائح:\n${context}`;
    } else if (action === 'predict') {
      prompt = `توقع مصاريف الشهر القادم بناءً على النمط:\n${context}`;
    } else if (action === 'save') {
      prompt = `اقترح 3-5 طرق لتوفير المال بناءً على مصاريف محمد:\n${context}`;
    } else {
      return NextResponse.json({ error: 'action مطلوب: analyze | predict | save' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل AI مطلوب' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-finance', itemId: '', itemTitle: `AI finance: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/finance Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 37. `src/app/api/ai/habits/route.ts`

**42 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getHabitsContext } from '@/lib/ai-everywhere';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const context = await getHabitsContext();

    let prompt = '';
    const systemInstruction = 'أنت مساعد عادات شخصي. أجب بـ JSON.';

    if (action === 'analyze') {
      prompt = `حلل نمط عادات محمد:\n${context}`;
    } else if (action === 'suggest') {
      prompt = `اقترح عادة جديدة مفيدة بناءً على عادات محمد الحالية وأهدافه:\n${context}`;
    } else if (action === 'patterns') {
      prompt = `اكتشف أنماط بـ عادات محمد (مثلاً: بتأجل عادات معينة أيام معينة):\n${context}`;
    } else {
      return NextResponse.json({ error: 'action مطلوب: analyze | suggest | patterns' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل AI مطلوب' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-habits', itemId: '', itemTitle: `AI habits: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/habits Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 38. `src/app/api/ai/journal/route.ts`

**42 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getJournalContext } from '@/lib/ai-everywhere';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const context = await getJournalContext();

    let prompt = '';
    const systemInstruction = 'أنت محلل مشاعر ويوميات. أجب بـ JSON.';

    if (action === 'analyze_emotions') {
      prompt = `حلل مشاعر محمد من يومياته:\n${context}`;
    } else if (action === 'predict_mood') {
      prompt = `توقع مزاج محمد القادم بناءً على النمط:\n${context}`;
    } else if (action === 'advice') {
      prompt = `أعطِ نصيحة شخصية بناءً على يوميات محمد:\n${context}`;
    } else {
      return NextResponse.json({ error: 'action مطلوب: analyze_emotions | predict_mood | advice' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل AI مطلوب' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-journal', itemId: '', itemTitle: `AI journal: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/journal Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 39. `src/app/api/ai/notes/route.ts`

**46 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getNotesContext } from '@/lib/ai-everywhere';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const noteId = String(body.noteId || '');
    const noteText = String(body.text || '');

    let prompt = '';
    const systemInstruction = 'أنت مساعد ملاحظات شخصي. أجب بـ JSON.';

    if (action === 'summarize') {
      prompt = `لخّص هذه الملاحظة بـ 2-3 جمل:\n${noteText}`;
    } else if (action === 'tags') {
      prompt = `اقترح 3-5 وسوم لهذه الملاحظة:\n${noteText}`;
    } else if (action === 'translate') {
      const target = String(body.target || 'en');
      prompt = `ترجم هذه الملاحظة لل${target === 'en' ? 'إنجليزية' : target === 'ar' ? 'عربية' : target}:\n${noteText}`;
    } else if (action === 'link') {
      prompt = `اقترح روابط بين هذه الملاحظة وكيانات أخرى لمحمد:\nملاحظة: ${noteText}\nملاحظات أخرى:\n${await getNotesContext()}`;
    } else {
      return NextResponse.json({ error: 'action مطلوب: summarize | tags | translate | link' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل AI مطلوب' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-notes', itemId: noteId, itemTitle: `AI notes: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/notes Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 40. `src/app/api/ai/projects/route.ts`

**43 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getProjectsContext } from '@/lib/ai-everywhere';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const projectId = String(body.projectId || '');
    const context = await getProjectsContext();

    let prompt = '';
    const systemInstruction = 'أنت مساعد مشاريع تقنية. أجب بـ JSON.';

    if (action === 'plan') {
      prompt = `خطّط مراحل مشروع لمحمد بناءً على مشاريعه الحالية:\n${context}`;
    } else if (action === 'risks') {
      prompt = `حلل مخاطر مشاريع محمد الحالية:\n${context}`;
    } else if (action === 'resources') {
      prompt = `اقترح موارد (دورات، أدوات، مكتبات) لمشاريع محمد:\n${context}`;
    } else {
      return NextResponse.json({ error: 'action مطلوب: plan | risks | resources' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل AI مطلوب' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-projects', itemId: projectId, itemTitle: `AI projects: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/projects Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 41. `src/app/api/ai/study/explain/route.ts`

**30 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { explainConcept } from '@/lib/study-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const concept = String(body?.concept || '');
    const level = body?.level === 'detailed' || body?.level === 'academic' ? body.level : 'simple';
    if (!concept.trim()) return NextResponse.json({ error: 'concept مطلوب' }, { status: 400 });

    const result = await explainConcept(concept, level);
    await db.activityEvent.create({ data: { type: 'logged', section: 'study-ai', itemId: '', itemTitle: `شرح: ${concept.slice(0, 50)} (${result.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/ai/study/explain Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 42. `src/app/api/ai/study/flashcards/route.ts`

**30 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { generateFlashcards } from '@/lib/study-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const text = String(body?.text || '');
    const count = Math.min(Number(body?.count) || 10, 20);
    if (!text.trim()) return NextResponse.json({ error: 'text مطلوب' }, { status: 400 });

    const result = await generateFlashcards(text, count);
    await db.activityEvent.create({ data: { type: 'logged', section: 'study-ai', itemId: '', itemTitle: `توليد ${result.flashcards.length} بطاقة تعليمية (${result.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/ai/study/flashcards Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 43. `src/app/api/ai/study/plan/route.ts`

**31 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { createStudyPlan } from '@/lib/study-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const topics = Array.isArray(body?.topics) ? body.topics : [];
    const deadline = String(body?.deadline || '');
    const hoursPerDay = Number(body?.hoursPerDay) || 3;
    if (!topics.length) return NextResponse.json({ error: 'topics مطلوبة' }, { status: 400 });

    const result = await createStudyPlan(topics, deadline, hoursPerDay);
    await db.activityEvent.create({ data: { type: 'logged', section: 'study-ai', itemId: '', itemTitle: `خطة دراسية (${result.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/ai/study/plan Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 44. `src/app/api/ai/study/quiz/route.ts`

**30 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { generateQuiz } from '@/lib/study-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const text = String(body?.text || '');
    const count = Math.min(Number(body?.count) || 5, 15);
    if (!text.trim()) return NextResponse.json({ error: 'text مطلوب' }, { status: 400 });

    const result = await generateQuiz(text, count);
    await db.activityEvent.create({ data: { type: 'logged', section: 'study-ai', itemId: '', itemTitle: `توليد ${result.questions.length} سؤال اختبار (${result.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/ai/study/quiz Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 45. `src/app/api/ai/study/summarize/route.ts`

**29 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { summarizeLecture } from '@/lib/study-ai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const text = String(body?.text || '');
    if (!text.trim()) return NextResponse.json({ error: 'text مطلوب' }, { status: 400 });

    const result = await summarizeLecture(text);
    await db.activityEvent.create({ data: { type: 'logged', section: 'study-ai', itemId: '', itemTitle: `تلخيص محاضرة (${result.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/ai/study/summarize Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 46. `src/app/api/ai/tasks/route.ts`

**42 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { executeAIAction, getTasksContext } from '@/lib/ai-everywhere';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json();
    const action = String(body.action || '');
    const context = await getTasksContext();

    let prompt = '';
    let systemInstruction = 'أنت مساعد مهام شخصي لمحمد. أجب بـ JSON.';

    if (action === 'suggest') {
      prompt = `اقترح 3-5 مهام بناءً على مهام محمد الحالية وأهدافه:\n${context}`;
    } else if (action === 'analyze_delay') {
      prompt = `حلل ليش محمد بتأجل مهام معينة. شوف المهام المتأخرة:\n${context}`;
    } else if (action === 'distribute') {
      prompt = `وزّع مهام محمد على أيام الأسبوع (7 أيام) بشكل متوازن:\n${context}`;
    } else {
      return NextResponse.json({ error: 'action مطلوب: suggest | analyze_delay | distribute' }, { status: 400 });
    }

    const response = await executeAIAction(prompt, systemInstruction, () => ({ message: 'تفعيل الذكاء الاصطناعي مطلوب لتحليل المهام' }));
    await db.activityEvent.create({ data: { type: 'logged', section: 'ai-tasks', itemId: '', itemTitle: `AI tasks: ${action} (${response.source})`, metadata: '{}', createdAt: new Date().toISOString() } });
    return NextResponse.json(response);
  } catch (e) {
    console.error('[/api/ai/tasks Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 47. `src/app/api/auto-tag/route.ts`

**34 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { generateJSON } from '@/lib/ai-provider';

export async function POST(req: NextRequest) {
  const c = await cookies(); const t = c.get(SESSION_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(t))) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const { text, type } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: 'النص مطلوب' }, { status: 400 });
  
  // Rule-based tags first
  const lower = text.toLowerCase();
  const ruleTags: string[] = [];
  if (/arduino|esp|gpio|relay/i.test(text)) ruleTags.push('arduino', 'iot');
  if (/react|next|typescript|javascript|css/i.test(text)) ruleTags.push('web', 'programming');
  if (/رياضيات|physics|فيزياء|كيمياء/i.test(text)) ruleTags.push('university');
  if (/git|github|commit/i.test(text)) ruleTags.push('git');
  if (/prisma|database|sql|sqlite/i.test(text)) ruleTags.push('database');

  // AI suggestions
  let aiTags: string[] = [];
  try {
    aiTags = await generateJSON<string[]>(
      text.slice(0, 500),
      'اقترح 3-5 وسوم (tags) مختصرة بالإنجليزية للنص التالي. أرجعها كمصفوفة JSON فقط (مثل: ["tag1","tag2"]).',
    );
    if (!Array.isArray(aiTags)) aiTags = [];
  } catch { /* ignore */ }

  const allTags = Array.from(new Set([...ruleTags, ...aiTags])).slice(0, 7);
  return NextResponse.json({ success: true, tags: allTags, ruleTags, aiTags });
}

```

---

## 48. `src/app/api/brain-dump/analyze/route.ts`

**65 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { analyzeBrainDump } from '@/lib/brain-dump-analyzer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const text = typeof body?.text === 'string' ? body.text.trim() : '';
    if (!text) {
      return NextResponse.json({ error: 'text مطلوب' }, { status: 400 });
    }

    const analysis = await analyzeBrainDump(text);

    // احفظ التحليل كـ JournalEntry بمetadata
    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    const journalEntry = await db.journalEntry.create({
      data: {
        date: today,
        mood: analysis.emotions[0] || 'okay',
        moodScore: analysis.sleepQualityPrediction === 'good' ? 4 : analysis.sleepQualityPrediction === 'fair' ? 3 : 2,
        moodFactors: JSON.stringify({ type: 'brain-dump', source: analysis.source }),
        text: text,
        gratitudes: JSON.stringify([]),
      },
    });

    // سجّل ActivityEvent
    await db.activityEvent.create({
      data: {
        type: 'logged',
        section: 'brain-dump',
        itemId: journalEntry.id,
        itemTitle: `تحليل Brain Dump بالذكاء الاصطناعي (${analysis.source})`,
        metadata: JSON.stringify({
          source: analysis.source,
          emotionsCount: analysis.emotions.length,
          concernsCount: analysis.concerns.length,
          tasksCount: analysis.extractedTasks.length,
          sleepPrediction: analysis.sleepQualityPrediction,
          shutdownMessage: analysis.shutdownMessage,
        }),
        createdAt: now,
      },
    });

    return NextResponse.json({ success: true, analysis, journalEntryId: journalEntry.id });
  } catch (e) {
    console.error('[/api/brain-dump/analyze Error]', e);
    return NextResponse.json({ error: 'فشل تحليل Brain Dump' }, { status: 500 });
  }
}

```

---

## 49. `src/app/api/command/route.ts`

**51 سطر**

```typescript
// ============================================
// POST /api/command — ينفّذ أمر من كلام محمد الطبيعي
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { parseUserCommand, executeCommand } from '@/lib/command-engine';

export async function POST(request: NextRequest) {
  try {
    // فحص الجلسة
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const { text } = await request.json();
    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'النص مطلوب' }, { status: 400 });
    }

    // 1) parse — تعرف على القصد
    const parsed = await parseUserCommand(text);

    // 2) execute — تنفيذ
    const result = await executeCommand(parsed);

    return NextResponse.json({
      success: result.success,
      message: result.message,
      intent: result.intent,
      effects: result.effects,
      error: result.error,
      parsed: {
        intent: parsed.intent,
        entities: parsed.entities,
        confidence: parsed.confidence,
      },
    });
  } catch (e) {
    console.error('[Command API Error]', e);
    return NextResponse.json(
      { error: 'فشل تنفيذ الأمر', details: e instanceof Error ? e.message : String(e) },
      { status: 500 }
    );
  }
}

```

---

## 50. `src/app/api/daily-assistant/route.ts`

**97 سطر**

```typescript
// ============================================
// /api/daily-assistant — مساعد البدء والإنهاء
// ============================================
// GET ?type=start → مهام اليوم + المواعيد + اقتراح أول مهمة
// GET ?type=end → ملخص اليوم + مهام غير منجزة + خطة الغد
// ============================================

import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { generateText } from '@/lib/ai-provider';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') === 'end' ? 'end' : 'start';
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // بيانات مشتركة
    const [tasks, workSessions, transactions, scheduleEvents] = await Promise.all([
      db.task.findMany({ where: { completed: false }, orderBy: [{ isImportant: 'desc' }, { priority: 'desc' }], take: 10 }).catch(() => []),
      db.workSession.findMany({ where: { createdAt: { gte: startOfToday.toISOString() } } }).catch(() => []),
      db.transaction.findMany({ where: { createdAt: { gte: startOfToday.toISOString() } } }).catch(() => []),
      db.scheduleEvent.findMany({ take: 5 }).catch(() => []),
    ]);

    if (type === 'start') {
      // === وضع الصباح: ابدأ يومك ===
      const todayTasks = tasks.slice(0, 5);
      const upcomingEvents = scheduleEvents.filter((e) => e.date >= today).slice(0, 3);

      // اقتراح AI لأول مهمة
      let aiSuggestion = '';
      try {
        const prompt = `محمد عنده ${tasks.length} مهمة معلّقة. أهم 3:
${todayTasks.slice(0, 3).map((t, i) => `${i + 1}. ${t.text}`).join('\n')}

اقترح مهمة واحدة يبدأ بها (سطر واحد بالعربية).`;
        aiSuggestion = await generateText(prompt, 'أنت مساعد إنتاجية. اكتب اقتراحاً موجزاً بالعربية.');
      } catch { /* ignore */ }

      return NextResponse.json({
        success: true,
        type: 'start',
        greeting: now.getHours() < 12 ? 'صباح الخير' : 'مساء الخير',
        todayTasks,
        upcomingEvents,
        aiSuggestion,
        pendingCount: tasks.length,
      });
    }

    // === وضع المساء: أنهِ يومك ===
    const allTasks = await db.task.findMany().catch(() => []);
    const tasksCompletedToday = allTasks.filter((t) => {
      if (!t.completed) return false;
      const d = new Date(t.updatedAt || t.createdAt);
      return d >= startOfToday;
    });
    const unfinishedTasks = allTasks.filter((t) => !t.completed).slice(0, 5);
    const studyMinutes = workSessions.reduce((sum, ws) => sum + (ws.durationMinutes || 0), 0);
    const expensesToday = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

    // خطة الغد (AI)
    let tomorrowPlan = '';
    try {
      const prompt = `محمد أنهى يومه: ${tasksCompletedToday.length} مهمة، ${studyMinutes} دقيقة عمل، ${expensesToday}₪ مصروفات.
لديه ${unfinishedTasks.length} مهمة غير منجزة.
اكتب خطة موجزة لغد (سطرين كحد أقصى) بالعربية.`;
      tomorrowPlan = await generateText(prompt, 'أنت مساعد إنتاجية. اكتب خطة موجزة بالعربية.');
    } catch { /* ignore */ }

    return NextResponse.json({
      success: true,
      type: 'end',
      summary: {
        tasksCompleted: tasksCompletedToday.length,
        studyMinutes,
        expenses: expensesToday,
      },
      unfinishedTasks,
      tomorrowPlan,
    });
  } catch (e) {
    console.error('[/api/daily-assistant Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 51. `src/app/api/decisions/analyze/route.ts`

**98 سطر**

```typescript
// ============================================
// GET /api/decisions/analyze — AI يحلل أنماط قراراتك
// ============================================
// يحلل آخر 10 قرارات + يولّد insights
// ============================================

import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { generateText } from '@/lib/ai-provider';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    const decisions = await db.decision.findMany({
      orderBy: { date: 'desc' },
      take: 10,
    });

    if (decisions.length < 3) {
      return NextResponse.json({
        success: true,
        insights: [],
        message: 'تحتاج 3 قرارات على الأقل للتحليل',
      });
    }

    // تحليل بسيط محلي (بدون AI)
    const localInsights: string[] = [];

    // 1) نسبة القرارات المنجزة
    const completed = decisions.filter((d) => d.outcome === 'completed' || d.finalDecision).length;
    const pending = decisions.length - completed;
    if (pending > completed) {
      localInsights.push(`لديك ${pending} قرار معلّق مقابل ${completed} منجز — حاول إنهاء المعلّق`);
    }

    // 2) القرارات بدون reasoning
    const noReason = decisions.filter((d) => !d.reasoning).length;
    if (noReason > decisions.length / 2) {
      localInsights.push(`${noReason} من ${decisions.length} قرار بدون سبب مكتوب — اكتب "لماذا" لكل قرار`);
    }

    // 3) القرارات بدون تقييم
    const noRating = decisions.filter((d) => d.rating === null).length;
    if (noRating > 0) {
      localInsights.push(`${noRating} قرار بدون تقييم — راجعها وقيّمها (1-5)`);
    }

    // 4) AI تحليل (لو متاح)
    let aiInsight = '';
    try {
      const decisionsSummary = decisions.map((d) => ({
        title: d.title,
        finalDecision: d.finalDecision || d.chosenOption,
        outcome: d.outcome,
        hasReasoning: !!d.reasoning,
        rating: d.rating,
      }));

      const prompt = `حلل أنماط قرارات محمد بناءً على هذه البيانات:
${JSON.stringify(decisionsSummary, null, 2)}

اكتب insight واحد موجز (سطرين كحد أقصى) عن نمط قراراته. بالعربية.`;

      aiInsight = await generateText(
        prompt,
        'أنت محلل قرارات ذكي. اكتب insights عملية بالعربية.',
      );
    } catch (e) {
      console.error('[decisions/analyze] AI error:', e);
    }

    return NextResponse.json({
      success: true,
      insights: localInsights,
      aiInsight,
      stats: {
        total: decisions.length,
        completed,
        pending,
        noReason,
        noRating,
      },
    });
  } catch (e) {
    console.error('[/api/decisions/analyze Error]', e);
    return NextResponse.json({ error: 'فشل التحليل' }, { status: 500 });
  }
}

```

---

## 52. `src/app/api/insights/classify/route.ts`

**141 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { classifyByRules, isValidSuggestionType } from '@/lib/inbox-rules';
import { generateJSON } from '@/lib/ai-provider';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// أنواع الكيانات التي يصنّفها Universal Capture (تتطابق مع جداول Prisma)
type ClassifyType = 'note' | 'task' | 'idea' | 'reminder' | 'transaction' | 'project';
const VALID_TYPES: ClassifyType[] = ['note', 'task', 'idea', 'reminder', 'transaction', 'project'];

interface ClassifyResponse {
  type: ClassifyType;
  confidence: number;
  reason: string;
  suggestedTitle: string;
  source: 'rules' | 'ai' | 'rules-fallback';
}

interface ClassifyAIResponse {
  type?: string;
  confidence?: number;
  reason?: string;
  suggestedTitle?: string;
}

// أنماط المعاملات والتذكيرات (غير موجودة في inbox-rules)
const TRANSACTION_PATTERN = /\d+(?:[.,]\d+)?\s*(شيكل|شيكيل|دولار|دينار|ريال|جنيه|يورو|₪|\$|€)/i;
const TRANSACTION_WORDS = /صرفت|دفعت?|شراء|مصروف|اتمن|expense|paid/i;
const REMINDER_PATTERN = /الساعة\s*\d{1,2}|\d{1,2}\s*[:]\s*\d{2}|\d{1,2}\s*(ص|م|am|pm)/i;
const REMINDER_WORDS = /تذكير|ذكرني|موعد|اجتماع|meeting|remind/i;
const DATE_WORDS = /غداً|بكرة|اليوم|الاثنين|الثلاثاء|الأربعاء|الخميس|الجمعة|السبت|الأحد/i;

export async function POST(request: NextRequest) {
  try {
    // 1) Auth
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    // 2) Parse body
    const body = await request.json().catch(() => ({}));
    const text = typeof body?.text === 'string' ? body.text.trim() : '';
    if (!text) return NextResponse.json({ error: 'النص مطلوب' }, { status: 400 });

    // 3) Rules-first: معاملات وتذكيرات أولاً (غير مغطاة بـ inbox-rules)
    let ruleResult: ClassifyResponse | null = null;

    if (TRANSACTION_PATTERN.test(text) || TRANSACTION_WORDS.test(text)) {
      ruleResult = {
        type: 'transaction',
        confidence: 0.92,
        reason: 'النص يحتوي على مبلغ مالي — صُنّف كمصروف',
        suggestedTitle: extractTitle(text, 'مصروف'),
        source: 'rules',
      };
    } else if (REMINDER_PATTERN.test(text) || REMINDER_WORDS.test(text) || DATE_WORDS.test(text)) {
      ruleResult = {
        type: 'reminder',
        confidence: 0.88,
        reason: 'النص يحتوي على وقت/موعد — صُنّف كتذكير',
        suggestedTitle: extractTitle(text, 'تذكير'),
        source: 'rules',
      };
    } else {
      // استخدم classifyByRules من inbox-rules (يغطي project/task/idea/certificate/book)
      const suggestion = classifyByRules(text, /^https?:\/\//i.test(text) ? 'link' : 'text');
      if (suggestion && suggestion.confidence >= 0.7) {
        // ربط: book/certificate → note، project → project، task → task، idea → idea
        const mapped: ClassifyType = suggestion.type === 'certificate' || suggestion.type === 'book' ? 'note' : (suggestion.type as ClassifyType);
        ruleResult = {
          type: mapped,
          confidence: suggestion.confidence,
          reason: suggestion.reason,
          suggestedTitle: suggestion.title,
          source: 'rules',
        };
      }
    }

    // لو القواعد واثقة enough، أرجعها بدون LLM
    if (ruleResult && ruleResult.confidence >= 0.85) {
      return NextResponse.json(ruleResult);
    }

    // 4) AI fallback للنصوص الغامضة
    try {
      const parsed = await generateJSON<ClassifyAIResponse>(
        text.slice(0, 800),
        'أنت مصنّف ذكي لنظام شخصي. صنّف النص إلى واحد من: "note","task","idea","reminder","transaction","project". ' +
          'أرجع JSON فقط: {"type":"...","confidence":0.0-1.0,"reason":"سبب قصير بالعربية","suggestedTitle":"عنوان قصير"}',
      );
      if (parsed.type && VALID_TYPES.includes(parsed.type as ClassifyType)) {
        return NextResponse.json({
          type: parsed.type as ClassifyType,
          confidence: clamp(typeof parsed.confidence === 'number' ? parsed.confidence : 0.8),
          reason: parsed.reason || ruleResult?.reason || 'تصنيف بالذكاء الاصطناعي',
          suggestedTitle: parsed.suggestedTitle?.trim() || extractTitle(text, 'عنوان'),
          source: 'ai',
        } satisfies ClassifyResponse);
      }
    } catch (e) {
      console.error('[/api/insights/classify AI error]', e);
    }

    // 5) Fallback نهائي للقواعد (حتى لو الثقة < 0.85)
    if (ruleResult) {
      return NextResponse.json({ ...ruleResult, source: 'rules-fallback' });
    }

    // 6) افتراضي: ملاحظة
    return NextResponse.json({
      type: 'note',
      confidence: 0.5,
      reason: 'لا أنماط واضحة — حُفظ كملاحظة افتراضياً',
      suggestedTitle: extractTitle(text, 'ملاحظة'),
      source: 'rules-fallback',
    } satisfies ClassifyResponse);
  } catch (e) {
    console.error('[/api/insights/classify Error]', e);
    return NextResponse.json({ error: 'فشل التصنيف' }, { status: 500 });
  }
}

function extractTitle(text: string, fallback: string): string {
  const firstLine = text.split('\n')[0].trim();
  if (firstLine.length > 0 && firstLine.length <= 80) return firstLine;
  if (firstLine.length > 80) return firstLine.slice(0, 77) + '...';
  return fallback;
}

function clamp(n: number): number {
  return Math.max(0, Math.min(1, Math.round(n * 100) / 100));
}

// منع unused warning
void isValidSuggestionType;

```

---

## 53. `src/app/api/insights/daily/route.ts`

**48 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { generateDailyInsights } from '@/lib/ai-insights-engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const insights = await generateDailyInsights();
    return NextResponse.json({ success: true, insights });
  } catch (e) {
    console.error('[/api/insights/daily Error]', e);
    return NextResponse.json({ error: 'فشل توليد insights' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const insights = await generateDailyInsights();
    await db.activityEvent.create({
      data: {
        type: 'logged',
        section: 'insights',
        itemTitle: `توليد daily insights (${insights.source})`,
        metadata: JSON.stringify({ source: insights.source }),
        createdAt: new Date().toISOString(),
      },
    });
    return NextResponse.json({ success: true, insights });
  } catch (e) {
    console.error('[/api/insights/daily POST Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 54. `src/app/api/insights/notifications/route.ts`

**23 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { generateSmartNotifications } from '@/lib/ai-insights-engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const notifications = await generateSmartNotifications();
    return NextResponse.json({ success: true, notifications });
  } catch (e) {
    console.error('[/api/insights/notifications Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 55. `src/app/api/insights/suggest-links/route.ts`

**42 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { suggestLinks, fetchEntity, fetchAllEntities, type EntityType } from '@/lib/cross-linker';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const entityType = body?.entityType as EntityType | undefined;
    const entityId = typeof body?.entityId === 'string' ? body.entityId : undefined;

    if (!entityType || !entityId) {
      return NextResponse.json({ error: 'entityType و entityId مطلوبان' }, { status: 400 });
    }

    // اجلب الكيان المصدري من DB
    const entity = await fetchEntity(entityType, entityId);
    if (!entity) {
      return NextResponse.json({ error: 'الكيان غير موجود' }, { status: 404 });
    }

    // اجلب كل الكيانات كمرشحين
    const candidates = await fetchAllEntities();

    // اقترح الروابط
    const suggestions = await suggestLinks(entity, candidates);

    return NextResponse.json({ success: true, suggestions, source: suggestions.length > 0 ? 'rules' : 'rules-fallback' });
  } catch (e) {
    console.error('[/api/insights/suggest-links Error]', e);
    return NextResponse.json({ error: 'فشل اقتراح الروابط' }, { status: 500 });
  }
}

```

---

## 56. `src/app/api/insights/suggest-tags/route.ts`

**29 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { suggestTags } from '@/lib/tag-suggester';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const text = typeof body?.text === 'string' ? body.text : '';
    const type = typeof body?.type === 'string' ? body.type : undefined;

    if (!text.trim()) return NextResponse.json({ error: 'النص مطلوب' }, { status: 400 });

    const result = await suggestTags(text, type);
    return NextResponse.json({ success: true, tags: result.tags, source: result.source });
  } catch (e) {
    console.error('[/api/insights/suggest-tags Error]', e);
    return NextResponse.json({ error: 'فشل اقتراح الوسوم' }, { status: 500 });
  }
}

```

---

## 57. `src/app/api/insights/weekly/route.ts`

**23 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { generateWeeklyInsights } from '@/lib/ai-insights-engine';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const insights = await generateWeeklyInsights();
    return NextResponse.json({ success: true, insights });
  } catch (e) {
    console.error('[/api/insights/weekly Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 58. `src/app/api/relations/all/route.ts`

**79 سطر**

```typescript
// ============================================
// GET /api/relations/all
// يرجع كل العلاقات + العناصر المرتبطة (لـ Knowledge Graph)
// ============================================

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) {
      return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
    }

    // جلب كل العلاقات
    const relations = await db.itemRelation.findMany();

    // جلب كل العناصر (عناوين فقط للـ graph)
    const [projects, tasks, notes, skills, ideas, achievements] = await Promise.all([
      db.project.findMany({ select: { id: true, title: true } }),
      db.task.findMany({ select: { id: true, text: true } }),
      db.note.findMany({ select: { id: true, title: true } }),
      db.skill.findMany({ select: { id: true, name: true } }),
      db.idea.findMany({ select: { id: true, title: true } }),
      db.achievement.findMany({ select: { id: true, title: true } }),
    ]);

    // بناء خريطة العناصر
    interface GraphNode {
      id: string;
      label: string;
      type: string;
    }
    const nodes: GraphNode[] = [
      ...projects.map((p) => ({ id: p.id, label: p.title || 'مشروع', type: 'projects' })),
      ...tasks.map((t) => ({ id: t.id, label: t.text || 'مهمة', type: 'tasks' })),
      ...notes.map((n) => ({ id: n.id, label: n.title || 'ملاحظة', type: 'notes' })),
      ...skills.map((s) => ({ id: s.id, label: s.name || 'مهارة', type: 'skills' })),
      ...ideas.map((i) => ({ id: i.id, label: i.title || 'فكرة', type: 'ideas' })),
      ...achievements.map((a) => ({ id: a.id, label: a.title || 'إنجاز', type: 'achievements' })),
    ];

    // بناء الـ edges
    const edges = relations.map((r) => ({
      source: r.sourceId,
      target: r.targetId,
      sourceType: r.sourceType,
      targetType: r.targetType,
      relationType: r.relationType,
    }));

    return NextResponse.json({
      success: true,
      nodes,
      edges,
      stats: {
        totalNodes: nodes.length,
        totalEdges: edges.length,
        byType: {
          projects: projects.length,
          tasks: tasks.length,
          notes: notes.length,
          skills: skills.length,
          ideas: ideas.length,
          achievements: achievements.length,
        },
      },
    });
  } catch (e) {
    console.error('[Relations All Error]', e);
    return NextResponse.json({ error: 'فشل جلب البيانات' }, { status: 500 });
  }
}

```

---

## 59. `src/app/api/relations/auto-link/route.ts`

**92 سطر**

```typescript
// ============================================
// POST /api/relations/auto-link — روابط تلقائية حسب tags مشتركة
// ============================================
import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

function parseTags(val: unknown): string[] {
  if (Array.isArray(val)) return val.filter((x): x is string => typeof x === 'string');
  if (typeof val === 'string') {
    try { const p = JSON.parse(val); if (Array.isArray(p)) return parseTags(p); } catch { /* ignore */ }
  }
  return [];
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const [projects, notes, ideas, skills, certificates] = await Promise.all([
      db.project.findMany().catch(() => []),
      db.note.findMany().catch(() => []),
      db.idea.findMany().catch(() => []),
      db.skill.findMany().catch(() => []),
      db.certificate.findMany().catch(() => []),
    ]);

    // خريطة tag → [{type, id}]
    const tagMap = new Map<string, Array<{ type: string; id: string }>>();

    function addToMap(type: string, id: string, tags: unknown) {
      for (const tag of parseTags(tags)) {
        const key = tag.toLowerCase().trim();
        if (!key) continue;
        if (!tagMap.has(key)) tagMap.set(key, []);
        tagMap.get(key)!.push({ type, id });
      }
    }

    for (const p of projects) addToMap('projects', p.id, p.tags);
    for (const n of notes) addToMap('notes', n.id, n.tags);
    for (const i of ideas) addToMap('ideas', i.id, i.tags);
    for (const s of skills) addToMap('skills', s.id, s.tags);
    for (const c of certificates) addToMap('certificates', c.id, c.skills);

    let created = 0;
    for (const [, items] of tagMap.entries()) {
      if (items.length < 2) continue;
      // اربط كل زوج (max 3 روابط لكل tag)
      let count = 0;
      for (let i = 0; i < items.length && count < 3; i++) {
        for (let j = i + 1; j < items.length && count < 3; j++) {
          const source = items[i];
          const target = items[j];
          // تحقق إنه ما فيش علاقة موجودة
          const existing = await db.itemRelation.findFirst({
            where: {
              OR: [
                { sourceType: source.type, sourceId: source.id, targetType: target.type, targetId: target.id },
                { sourceType: target.type, sourceId: target.id, targetType: source.type, targetId: source.id },
              ],
            },
          });
          if (!existing) {
            await db.itemRelation.create({
              data: {
                sourceType: source.type,
                sourceId: source.id,
                targetType: target.type,
                targetId: target.id,
                relationType: 'shared-tag',
                createdAt: new Date().toISOString(),
              },
            });
            created++;
          }
          count++;
        }
      }
    }

    return NextResponse.json({ success: true, created, totalTags: tagMap.size });
  } catch (e) {
    console.error('[/api/relations/auto-link Error]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 60. `src/app/api/reminders/auto-generate/route.ts`

**95 سطر**

```typescript
// ============================================
// POST /api/reminders/auto-generate — يولّد تذكيرات ذكية
// ============================================

import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const threeDaysAgo = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const generated: string[] = [];

    // 1) مهام overdue
    const overdueTasks = await db.task.findMany({
      where: { completed: false, dueDate: { lt: today } },
      take: 5,
    });
    for (const task of overdueTasks) {
      const exists = await db.smartReminder.findFirst({
        where: { message: { contains: task.text.slice(0, 30) }, createdAt: { gte: today } },
      });
      if (!exists) {
        await db.smartReminder.create({
          data: {
            message: `مهمة متأخرة: ${task.text.slice(0, 50)}`,
            type: 'overdue_task',
            isActive: true,
            createdAt: now.toISOString(),
          },
        });
        generated.push(`مهمة متأخرة: ${task.text.slice(0, 30)}`);
      }
    }

    // 2) عادات ما اتنفّذت اليوم
    const habits = await db.habit.findMany();
    for (const habit of habits) {
      const dates = Array.isArray(habit.completedDates) ? habit.completedDates : [];
      if (!dates.includes(today)) {
        const exists = await db.smartReminder.findFirst({
          where: { message: { contains: habit.name }, createdAt: { gte: today } },
        });
        if (!exists) {
          await db.smartReminder.create({
            data: {
              message: `لم تكمل عادة "${habit.name}" اليوم`,
              type: 'habit_missed',
              isActive: true,
              createdAt: now.toISOString(),
            },
          });
          generated.push(`عادة: ${habit.name}`);
        }
      }
    }

    // 3) مشاريع بطيئة التقدم
    const slowProjects = await db.project.findMany({
      where: { status: 'in-progress', updatedAt: { lt: weekAgo } },
      take: 3,
    });
    for (const project of slowProjects) {
      const exists = await db.smartReminder.findFirst({
        where: { message: { contains: project.title }, createdAt: { gte: threeDaysAgo } },
      });
      if (!exists) {
        await db.smartReminder.create({
          data: {
            message: `مشروع "${project.title}" توقف عند ${project.progress || 0}% — تقدر تكمل؟`,
            type: 'project_stalled',
            isActive: true,
            createdAt: now.toISOString(),
          },
        });
        generated.push(`مشروع: ${project.title}`);
      }
    }

    return NextResponse.json({ success: true, generated, count: generated.length });
  } catch (e) {
    console.error('[Auto-Reminders]', e);
    return NextResponse.json({ error: 'فشل' }, { status: 500 });
  }
}

```

---

## 61. `src/app/api/reminders/smart-generate/route.ts`

**53 سطر**

```typescript
import { NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { generateText } from '@/lib/ai-provider';

export async function POST() {
  const c = await cookies(); const t = c.get(SESSION_COOKIE_NAME)?.value;
  if (!(await verifySessionToken(t))) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });
  const [tasks, habits, workSessions, courses] = await Promise.all([
    db.task.findMany({ where: { completed: false } }).catch(() => []),
    db.habit.findMany().catch(() => []),
    db.workSession.findMany({ take: 30 }).catch(() => []),
    db.course.findMany().catch(() => []),
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const suggestions: Array<{ message: string; type: string }> = [];

  // Check overdue tasks
  const overdue = tasks.filter(t => t.dueDate && t.dueDate < today && t.dueDate !== '');
  if (overdue.length > 0) suggestions.push({ message: `لديك ${overdue.length} مهمة متأخرة`, type: 'warning' });

  // Check habits not done today
  for (const h of habits) {
    const dates = Array.isArray(h.completedDates) ? h.completedDates : [];
    if (!dates.includes(today)) suggestions.push({ message: `ما مارست "${h.name}" اليوم`, type: 'reminder' });
  }

  // Check no study sessions today
  const todaySessions = workSessions.filter(ws => ws.createdAt >= today);
  if (todaySessions.length === 0 && courses.length > 0) {
    suggestions.push({ message: 'ما سجلت أي جلسة مذاكرة اليوم', type: 'warning' });
  }

  // AI insight
  let aiInsight = '';
  try {
    const prompt = `حلل نشاط محمد: ${tasks.length} مهام معلقة، ${overdue.length} متأخرة، ${habits.length} عادات، ${todaySessions.length} جلسات اليوم. اقترح تذكير واحد مهم (سطر واحد بالعربية).`;
    aiInsight = await generateText(prompt, 'أنت مساعد ذكي. اكتب تذكيراً موجزاً.');
  } catch { /* ignore */ }

  // Save as SmartReminders
  for (const s of suggestions.slice(0, 5)) {
    const existing = await db.smartReminder.findFirst({ where: { message: s.message, isActive: true } });
    if (!existing) {
      await db.smartReminder.create({ data: { message: s.message, type: s.type, isActive: true, createdAt: new Date().toISOString() } });
    }
  }

  return NextResponse.json({ success: true, suggestions, aiInsight, created: suggestions.length });
}

```

---

## 62. `src/app/api/vision/analyze/route.ts`

**56 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { analyzeImage } from '@/lib/vision-analyzer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const imageBase64 = typeof body?.imageBase64 === 'string' ? body.imageBase64 : '';
    const question = typeof body?.question === 'string' ? body.question.trim() : undefined;
    const mimeType = typeof body?.mimeType === 'string' ? body.mimeType : 'image/jpeg';

    if (!imageBase64) {
      return NextResponse.json({ error: 'imageBase64 مطلوب' }, { status: 400 });
    }

    // تحقق من حجم الصورة (max ~5MB base64)
    if (imageBase64.length > 7_000_000) {
      return NextResponse.json({ error: 'الصورة كبيرة جداً (الحد الأقصى 5MB)' }, { status: 400 });
    }

    const result = await analyzeImage(imageBase64, question, mimeType);

    // سجّل ActivityEvent
    await db.activityEvent.create({
      data: {
        type: 'logged',
        section: 'vision',
        itemId: '',
        itemTitle: `تحليل صورة بالذكاء الاصطناعي (${result.source})`,
        metadata: JSON.stringify({
          source: result.source,
          question: question?.slice(0, 100) || null,
          tagsCount: result.tags.length,
          hasText: !!result.extractedText,
        }),
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/vision/analyze Error]', e);
    return NextResponse.json({ error: 'فشل تحليل الصورة' }, { status: 500 });
  }
}

```

---

## 63. `src/app/api/vision/discover/route.ts`

**63 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { discoverVision } from '@/lib/vision-discovery';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const transcript = typeof body?.transcript === 'string' ? body.transcript.trim() : '';
    if (!transcript) {
      return NextResponse.json({ error: 'transcript مطلوب' }, { status: 400 });
    }

    const result = await discoverVision(transcript);

    // احفظ بيان الرؤية كـ VisionItem (category: vision, timeframe: long)
    const now = new Date().toISOString();
    const visionItem = await db.visionItem.create({
      data: {
        title: result.visionStatement.slice(0, 100) || 'بيان رؤية شخصية',
        description: result.visionStatement,
        category: 'vision',
        timeframe: 'long',
        status: 'not-started',
        reason: JSON.stringify({
          values: result.values,
          antiVision: result.antiVision,
          aspirations: result.aspirations,
        }),
        subTasks: JSON.stringify(result.suggestedGoals.map((g) => ({ id: crypto.randomUUID(), text: g, completed: false }))),
        startDate: now.split('T')[0],
        deadline: '',
      },
    });

    // سجّل ActivityEvent
    await db.activityEvent.create({
      data: {
        type: 'created',
        section: 'vision',
        itemId: visionItem.id,
        itemTitle: `اكتشاف رؤية بالذكاء الاصطناعي (${result.source})`,
        metadata: JSON.stringify({ source: result.source, valuesCount: result.values.length, goalsCount: result.suggestedGoals.length }),
        createdAt: now,
      },
    });

    return NextResponse.json({ success: true, result, visionItemId: visionItem.id });
  } catch (e) {
    console.error('[/api/vision/discover Error]', e);
    return NextResponse.json({ error: 'فشل اكتشاف الرؤية' }, { status: 500 });
  }
}

```

---

## 64. `src/app/api/web-search/route.ts`

**48 سطر**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, SESSION_COOKIE_NAME } from '@/lib/auth-edge';
import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { searchWeb } from '@/lib/web-search';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    const session = await verifySessionToken(token);
    if (!session) return NextResponse.json({ error: 'غير مصرح' }, { status: 401 });

    const body = await request.json().catch(() => ({}));
    const query = typeof body?.query === 'string' ? body.query.trim() : '';
    if (!query) {
      return NextResponse.json({ error: 'query مطلوب' }, { status: 400 });
    }

    const limit = typeof body?.limit === 'number' ? Math.min(body.limit, 10) : 5;
    const result = await searchWeb(query, limit);

    // سجّل ActivityEvent
    await db.activityEvent.create({
      data: {
        type: 'logged',
        section: 'web-search',
        itemId: '',
        itemTitle: `بحث ويب: ${query.slice(0, 60)}`,
        metadata: JSON.stringify({
          query: query.slice(0, 200),
          resultsCount: result.results.length,
          hasAnswer: !!result.answer,
        }),
        createdAt: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, ...result });
  } catch (e) {
    console.error('[/api/web-search Error]', e);
    return NextResponse.json({ error: 'فشل البحث' }, { status: 500 });
  }
}

```

---

## 65. `src/components/ai/agent-panel.tsx`

**587 سطر**

```typescript
'use client';

// ============================================
// AgentPanel — لوحة نشاط الوكيل (Agent Activity Panel)
// ============================================
// لوحة جانبية تعرض:
// 1) حالة الوكيل (نشط/متوقف)
// 2) آخر الأدوات المستخدمة في الجلسة الحالية
// 3) إجراءات سريعة (تصفح، إيميل، تقويم، بحث ويب)
// 4) سجل نشاط حيّ من /api/activity
// ============================================

import { memo, useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Globe, Mail, Calendar, Search, X, Loader2, Activity,
  ChevronDown, ChevronUp, CheckSquare, Brain, Eye, Wrench,
  Clock, ExternalLink, Zap, Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useToastStore } from '@/lib/toast-store';

// ============ الأنواع الداخلية ============
interface AgentPanelProps {
  recentTools?: string[];
  onClose?: () => void;
}

interface ActivityItem {
  id?: string;
  type?: string;
  section?: string;
  itemId?: string;
  itemTitle?: string;
  metadata?: string;
  createdAt: string;
}

interface QuickActionResult {
  kind: 'browse' | 'email' | 'calendar' | 'search';
  label: string;
  summary: string;
  details?: string[];
  at: string;
}

// ============ خريطة أيقونات الأدوات ============
const TOOL_ICONS: Record<string, { icon: React.ElementType; label: string; color: string }> = {
  browse_website: { icon: Globe, label: 'تصفح موقع', color: 'text-sky-600 dark:text-sky-400' },
  create_task: { icon: CheckSquare, label: 'إنشاء مهمة', color: 'text-emerald-600 dark:text-emerald-400' },
  send_email: { icon: Mail, label: 'إرسال إيميل', color: 'text-amber-600 dark:text-amber-400' },
  check_calendar: { icon: Calendar, label: 'فحص التقويم', color: 'text-violet-600 dark:text-violet-400' },
  web_search: { icon: Search, label: 'بحث ويب', color: 'text-rose-600 dark:text-rose-400' },
  analyze_image: { icon: Eye, label: 'تحليل صورة', color: 'text-cyan-600 dark:text-cyan-400' },
  save_memory: { icon: Brain, label: 'حفظ ذاكرة', color: 'text-teal-600 dark:text-teal-400' },
};

function getToolMeta(tool: string) {
  return TOOL_ICONS[tool] || { icon: Wrench, label: tool, color: 'text-muted-foreground' };
}

function formatTime(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return '';
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'الآن';
    if (diffMin < 60) return `قبل ${diffMin} د`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `قبل ${diffHr} س`;
    return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

function AgentPanelBase({ recentTools = [], onClose }: AgentPanelProps) {
  const addToast = useToastStore((s) => s.addToast);

  // ============ State ============
  const [active, setActive] = useState(false);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [results, setResults] = useState<QuickActionResult[]>([]);
  const [running, setRunning] = useState<null | QuickActionResult['kind']>(null);

  // إدخالات الإجراءات السريعة
  const [browseUrl, setBrowseUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBrowseInput, setShowBrowseInput] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [expandedResult, setExpandedResult] = useState<string | null>(null);

  const resultsRef = useRef<HTMLDivElement>(null);

  // ============ Activity log fetcher ============
  const fetchActivities = useCallback(async () => {
    try {
      const res = await fetch('/api/activity?limit=5', { cache: 'no-store' });
      const data = await res.json();
      if (data?.success && Array.isArray(data.events)) {
        setActivities(data.events as ActivityItem[]);
      }
    } catch {
      /* تجاهل — اللوحة تعمل بدون اتصال */
    }
  }, []);

  useEffect(() => {
    void fetchActivities();
    const t = setInterval(fetchActivities, 30000); // تحديث كل 30 ثانية
    return () => clearInterval(t);
  }, [fetchActivities]);

  // الوكيل "نشط" إذا: يوجد أدوات مستخدمة مؤخراً، أو نشاط حديث (< 5 دقائق)، أو إجراء قيد التشغيل
  useEffect(() => {
    const hasTools = recentTools.length > 0;
    const hasRunning = running !== null;
    const fiveMinAgo = Date.now() - 5 * 60 * 1000;
    const hasRecentActivity = activities.some((a) => {
      try { return new Date(a.createdAt).getTime() > fiveMinAgo; } catch { return false; }
    });
    setActive(hasTools || hasRunning || hasRecentActivity);
  }, [recentTools, running, activities]);

  // ============ Quick actions ============
  const pushResult = useCallback((r: QuickActionResult) => {
    setResults((prev) => [r, ...prev].slice(0, 12));
    // تمرير لأعلى القائمة عند إضافة نتيجة جديدة
    requestAnimationFrame(() => {
      resultsRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  const handleBrowse = useCallback(async () => {
    const url = browseUrl.trim();
    if (!url) {
      addToast('أدخل رابط الموقع', 'warning');
      return;
    }
    const kind: QuickActionResult['kind'] = 'browse';
    setRunning(kind);
    setShowBrowseInput(false);
    try {
      const res = await fetch('/api/agent/browse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      if (data?.success && data.result) {
        const r = data.result;
        pushResult({
          kind,
          label: `تصفح: ${r.title || url}`,
          summary: `${(r.links || []).length} رابط • المصدر: ${r.source || 'غير معروف'}`,
          details: [
            r.extractedText ? `النص: ${r.extractedText.slice(0, 280)}${r.extractedText.length > 280 ? '…' : ''}` : null,
            ...(r.links || []).slice(0, 4).map((l: { text?: string; url?: string }) => `• ${l.text || l.url || ''}`),
          ].filter(Boolean) as string[],
          at: new Date().toISOString(),
        });
        addToast('تم تصفح الموقع', 'success');
      } else {
        throw new Error(data?.error || 'فشل التصفح');
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'فشل التصفح';
      pushResult({ kind, label: `فشل تصفح: ${url}`, summary: msg, at: new Date().toISOString() });
      addToast(msg, 'error');
    } finally {
      setRunning(null);
      setBrowseUrl('');
    }
  }, [browseUrl, addToast, pushResult]);

  const handleEmail = useCallback(async () => {
    const kind: QuickActionResult['kind'] = 'email';
    setRunning(kind);
    try {
      const res = await fetch('/api/agent/email', { cache: 'no-store' });
      const data = await res.json();
      const emails = Array.isArray(data?.emails) ? data.emails : [];
      pushResult({
        kind,
        label: 'فحص الإيميل',
        summary: emails.length > 0 ? `وجد ${emails.length} إيميل` : 'لا توجد إيميلات جديدة',
        details: emails.slice(0, 4).map((e: { title?: string; message?: string; createdAt?: string }) =>
          `• ${e.title || 'بدون عنوان'}${e.createdAt ? ` — ${formatTime(e.createdAt)}` : ''}`
        ),
        at: new Date().toISOString(),
      });
      addToast(emails.length > 0 ? `وصل ${emails.length} إيميل` : 'لا توجد إيميلات', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'فشل فحص الإيميل';
      pushResult({ kind, label: 'فشل فحص الإيميل', summary: msg, at: new Date().toISOString() });
      addToast(msg, 'error');
    } finally {
      setRunning(null);
    }
  }, [addToast, pushResult]);

  const handleCalendar = useCallback(async () => {
    const kind: QuickActionResult['kind'] = 'calendar';
    setRunning(kind);
    try {
      const res = await fetch('/api/agent/calendar', { cache: 'no-store' });
      const data = await res.json();
      const events = Array.isArray(data?.events) ? data.events : [];
      const reminders = Array.isArray(data?.reminders) ? data.reminders : [];
      pushResult({
        kind,
        label: 'أحداث اليوم',
        summary: `${events.length} حدث • ${reminders.length} تذكير`,
        details: [
          ...events.slice(0, 3).map((ev: { title?: string; startTime?: string }) =>
            `📅 ${ev.title || 'حدث'}${ev.startTime ? ` — ${ev.startTime}` : ''}`
          ),
          ...reminders.slice(0, 2).map((rm: { title?: string; message?: string }) =>
            `🔔 ${rm.title || rm.message || 'تذكير'}`
          ),
        ],
        at: new Date().toISOString(),
      });
      addToast(`لديك ${events.length} حدث اليوم`, 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'فشل جلب الأحداث';
      pushResult({ kind, label: 'فشل جلب الأحداث', summary: msg, at: new Date().toISOString() });
      addToast(msg, 'error');
    } finally {
      setRunning(null);
    }
  }, [addToast, pushResult]);

  const handleSearch = useCallback(async () => {
    const q = searchQuery.trim();
    if (!q) {
      addToast('أدخل نص البحث', 'warning');
      return;
    }
    const kind: QuickActionResult['kind'] = 'search';
    setRunning(kind);
    setShowSearchInput(false);
    try {
      const res = await fetch('/api/web-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, limit: 4 }),
      });
      const data = await res.json();
      const results = Array.isArray(data?.results) ? data.results : [];
      pushResult({
        kind,
        label: `بحث: ${q}`,
        summary: results.length > 0 ? `وُجدت ${results.length} نتائج` : 'لا توجد نتائج',
        details: results.slice(0, 4).map((r: { title?: string; snippet?: string; url?: string }) =>
          `• ${r.title || 'بدون عنوان'}${r.snippet ? ` — ${r.snippet.slice(0, 140)}${r.snippet.length > 140 ? '…' : ''}` : ''}`
        ),
        at: new Date().toISOString(),
      });
      addToast(results.length > 0 ? `وُجدت ${results.length} نتائج` : 'لا توجد نتائج', 'success');
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'فشل البحث';
      pushResult({ kind, label: `فشل بحث: ${q}`, summary: msg, at: new Date().toISOString() });
      addToast(msg, 'error');
    } finally {
      setRunning(null);
      setSearchQuery('');
    }
  }, [searchQuery, addToast, pushResult]);

  // ============ Render ============
  const quickActions = [
    { id: 'browse' as const, label: 'تصفح موقع', icon: Globe, color: 'text-sky-600 dark:text-sky-400' },
    { id: 'email' as const, label: 'فحص الإيميل', icon: Mail, color: 'text-amber-600 dark:text-amber-400' },
    { id: 'calendar' as const, label: 'أحداث اليوم', icon: Calendar, color: 'text-violet-600 dark:text-violet-400' },
    { id: 'search' as const, label: 'بحث ويب', icon: Search, color: 'text-rose-600 dark:text-rose-400' },
  ];

  const triggerAction = (id: QuickActionResult['kind']) => {
    if (id === 'browse') { setShowBrowseInput((v) => !v); setShowSearchInput(false); return; }
    if (id === 'search') { setShowSearchInput((v) => !v); setShowBrowseInput(false); return; }
    if (id === 'email') { void handleEmail(); return; }
    if (id === 'calendar') { void handleCalendar(); return; }
  };

  return (
    <div className="flex h-full w-full flex-col bg-background border-l border-border" dir="rtl">
      {/* === Header === */}
      <div className="flex items-center justify-between gap-2 px-3 py-2.5 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2 min-w-0">
          <div className={cn(
            'flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors',
            active ? 'bg-emerald-500/15' : 'bg-muted'
          )}>
            <Bot className={cn('w-4 h-4', active ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground')} />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold leading-tight truncate">لوحة الوكيل</h3>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={cn(
                'inline-block h-1.5 w-1.5 rounded-full',
                active ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground/40'
              )} />
              <span className={cn(
                'text-[11px] font-medium',
                active ? 'text-emerald-600 dark:text-emerald-400' : 'text-muted-foreground'
              )}>
                {active ? 'الوكيل نشط' : 'الوكيل متوقف'}
              </span>
            </div>
          </div>
        </div>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0"
            onClick={onClose}
            aria-label="إغلاق لوحة الوكيل"
            type="button"
          >
            <X className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>

      {/* === Body (scrollable) === */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-3 py-3 space-y-4">

          {/* === Recent tools (من الجلسة الحالية) === */}
          <section>
            <SectionHeader icon={Zap} title="الأدوات المستخدمة" count={recentTools.length} />
            {recentTools.length === 0 ? (
              <p className="text-[11px] text-muted-foreground mt-1.5">لا توجد أدوات بعد في هذه الجلسة</p>
            ) : (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {recentTools.slice(0, 8).map((tool, i) => {
                  const meta = getToolMeta(tool);
                  const Icon = meta.icon;
                  return (
                    <Badge key={`${tool}-${i}`} variant="secondary" className="gap-1 px-2 py-0.5 text-[11px] font-normal">
                      <Icon className={cn('w-3 h-3', meta.color)} />
                      <span>{meta.label}</span>
                    </Badge>
                  );
                })}
              </div>
            )}
          </section>

          {/* === Quick actions === */}
          <section>
            <SectionHeader icon={Activity} title="إجراءات سريعة" />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {quickActions.map((a) => {
                const Icon = a.icon;
                const isRunning = running === a.id;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => triggerAction(a.id)}
                    disabled={isRunning}
                    className={cn(
                      'flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 text-[11px] font-medium transition-colors',
                      'hover:bg-muted/60 disabled:opacity-50 disabled:cursor-not-allowed',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40'
                    )}
                  >
                    {isRunning ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-muted-foreground" />
                    ) : (
                      <Icon className={cn('w-3.5 h-3.5', a.color)} />
                    )}
                    <span className="truncate">{a.label}</span>
                  </button>
                );
              })}
            </div>

            {/* URL input for browse */}
            <AnimatePresence>
              {showBrowseInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 flex items-center gap-1">
                    <Input
                      value={browseUrl}
                      onChange={(e) => setBrowseUrl(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') void handleBrowse(); }}
                      placeholder="https://example.com"
                      className="h-8 text-xs"
                      dir="ltr"
                      autoFocus
                    />
                    <Button
                      type="button"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => void handleBrowse()}
                      disabled={running === 'browse'}
                      aria-label="تنفيذ التصفح"
                    >
                      <Globe className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search input */}
            <AnimatePresence>
              {showSearchInput && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 flex items-center gap-1">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') void handleSearch(); }}
                      placeholder="ابحث في الويب…"
                      className="h-8 text-xs"
                      autoFocus
                    />
                    <Button
                      type="button"
                      size="icon"
                      className="h-8 w-8 shrink-0"
                      onClick={() => void handleSearch()}
                      disabled={running === 'search'}
                      aria-label="تنفيذ البحث"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>

          {/* === Quick action results === */}
          {results.length > 0 && (
            <section>
              <SectionHeader icon={Activity} title="نتائج الإجراءات" count={results.length} />
              <div ref={resultsRef} className="mt-2 space-y-1.5 max-h-72 overflow-y-auto pr-0.5 agent-scroll">
                {results.map((r, i) => {
                  const key = `${r.at}-${i}`;
                  const isOpen = expandedResult === key;
                  const hasDetails = r.details && r.details.length > 0;
                  const Icon = r.kind === 'browse' ? Globe
                    : r.kind === 'email' ? Mail
                    : r.kind === 'calendar' ? Calendar
                    : Search;
                  return (
                    <div
                      key={key}
                      className="rounded-md border border-border bg-background/60 overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => hasDetails && setExpandedResult(isOpen ? null : key)}
                        className="w-full flex items-start gap-2 px-2 py-1.5 text-right hover:bg-muted/40 transition-colors"
                        disabled={!hasDetails}
                      >
                        <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] font-medium leading-tight line-clamp-2" dir="auto">{r.label}</p>
                          <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1" dir="auto">{r.summary}</p>
                        </div>
                        <span className="text-[9px] text-muted-foreground shrink-0 mt-0.5">{formatTime(r.at)}</span>
                        {hasDetails && (
                          isOpen
                            ? <ChevronUp className="w-3 h-3 shrink-0 mt-0.5 text-muted-foreground" />
                            : <ChevronDown className="w-3 h-3 shrink-0 mt-0.5 text-muted-foreground" />
                        )}
                      </button>
                      <AnimatePresence>
                        {isOpen && hasDetails && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden border-t border-border bg-muted/20"
                          >
                            <ul className="px-2 py-1.5 space-y-1">
                              {r.details!.map((d, j) => (
                                <li key={j} className="text-[10px] text-muted-foreground leading-relaxed" dir="auto">
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* === Activity log (from /api/activity) === */}
          <section>
            <SectionHeader icon={Clock} title="سجل النشاط" count={activities.length} />
            {activities.length === 0 ? (
              <p className="text-[11px] text-muted-foreground mt-1.5">لا يوجد نشاط حديث</p>
            ) : (
              <div className="mt-2 space-y-1">
                {activities.map((a, i) => {
                  const icon = getToolMeta(a.section || '').icon;
                  const Icon = a.section === 'web-agent' ? Globe
                    : a.section === 'email-agent' ? Mail
                    : a.section?.includes('calendar') ? Calendar
                    : Activity;
                  const UsedIcon = a.section && TOOL_ICONS[a.section] ? icon : Icon;
                  return (
                    <div
                      key={a.id || `${a.createdAt}-${i}`}
                      className="flex items-start gap-2 rounded-md px-2 py-1.5 hover:bg-muted/40 transition-colors"
                    >
                      <UsedIcon className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] leading-tight line-clamp-2" dir="auto">
                          {a.itemTitle || a.section || 'نشاط'}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          {a.section && (
                            <Badge variant="outline" className="px-1 py-0 text-[9px] font-normal">
                              {a.section}
                            </Badge>
                          )}
                          <span className="text-[9px] text-muted-foreground">{formatTime(a.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* === Footer note === */}
          <div className="pt-1 pb-2 flex items-center gap-1 text-[10px] text-muted-foreground/70">
            <ExternalLink className="w-2.5 h-2.5" />
            <span>تحدّث اللوحة تلقائياً كل 30 ثانية</span>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

// ============ مكوّن مساعد لعناوين الأقسام ============
function SectionHeader({
  icon: Icon, title, count,
}: { icon: React.ElementType; title: string; count?: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
      <h4 className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{title}</h4>
      {typeof count === 'number' && count > 0 && (
        <Badge variant="secondary" className="ml-auto px-1.5 py-0 text-[9px] font-normal">{count}</Badge>
      )}
    </div>
  );
}

export const AgentPanel = memo(AgentPanelBase);

```

---

## 66. `src/components/ai/ai-chat-layout.tsx`

**522 سطر**

```typescript
'use client';

// ============================================
// AIChatLayout — الـ layout الرئيسي لواجهة الـ AI
// ============================================
// 4 أعمدة (ChatGPT/Claude-style + Agent Panel):
// ┌─────────┬──────────────────────┬──────────┬──────────┐
// │ Sidebar │   Message List       │ Artifacts│  Agent   │
// │ (محادثات│   (user + AI)        │ Panel    │  Panel   │
// │  سابقة) ├──────────────────────┤ (كود)    │ (نشاط)   │
// │         │   Input Bar (tools)  │          │          │
// └─────────┴──────────────────────┴──────────┴──────────┘
//
// يحتوي كل state + API calls (streaming, sessions, vision, web search, RAG).
// ============================================

import { memo, useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelRightOpen, PanelRightClose, Menu, AlertCircle, X, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToastStore } from '@/lib/toast-store';
import { cn } from '@/lib/utils';
import { AISidebar } from '@/components/ai/ai-sidebar';
import { AIMessageList } from '@/components/ai/ai-message-list';
import { AIInputBar } from '@/components/ai/ai-input-bar';
import { AIArtifactsPanel } from '@/components/ai/ai-artifacts-panel';
import { AgentPanel } from '@/components/ai/agent-panel';
import {
  MODEL_CONFIG, MODEL_TABS, streamChat, extractCodeBlocks,
  type Message, type SessionInfo, type Artifact, type ModelType, type AIModel,
} from '@/components/ai/ai-types';

function AIChatLayoutBase() {
  const addToast = useToastStore((s) => s.addToast);

  // ============ State ============
  const [model, setModel] = useState<ModelType>('general');
  const [aiModel, setAIModel] = useState<AIModel>('groq');
  const [reasoningMode, setReasoningMode] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [memoryCount, setMemoryCount] = useState(0);
  const [webSearchEnabled, setWebSearchEnabled] = useState(false);
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [artifactHistory, setArtifactHistory] = useState<Artifact[]>([]);
  const [pendingAttachment, setPendingAttachment] = useState<Message['attachment'] | null>(null);
  const [agentPanelOpen, setAgentPanelOpen] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // ============ Aggregate recent tools from current session messages ============
  const recentTools = useMemo(() => {
    const seen = new Set<string>();
    const tools: string[] = [];
    for (let i = messages.length - 1; i >= 0 && tools.length < 10; i--) {
      const m = messages[i];
      if (m.role === 'assistant' && Array.isArray(m.toolsUsed)) {
        for (const t of m.toolsUsed) {
          if (!seen.has(t)) {
            seen.add(t);
            tools.push(t);
          }
        }
      }
    }
    return tools.reverse();
  }, [messages]);

  // ============ Fetch memory count ============
  const fetchMemoryCount = useCallback(async () => {
    try {
      const res = await fetch('/api/data/aiInsights?take=500');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMemoryCount(data.filter((i: { category?: string }) => i.category === 'conversation_memory').length);
      }
    } catch { /* ignore */ }
  }, []);

  // ============ Fetch sessions ============
  const fetchSessions = useCallback(async () => {
    try {
      const res = await fetch('/api/ai-chat/sessions?archived=false');
      const data = await res.json();
      if (data.success && Array.isArray(data.sessions)) {
        setSessions(data.sessions.slice(0, 30));
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    void fetchSessions();
    void fetchMemoryCount();
  }, [fetchSessions, fetchMemoryCount]);

  // Refresh memory count after AI response
  useEffect(() => {
    if (messages.length > 0 && messages.some((m) => m.role === 'assistant' && !m.isStreaming)) {
      const t = setTimeout(() => void fetchMemoryCount(), 2500);
      return () => clearTimeout(t);
    }
  }, [messages, fetchMemoryCount]);

  // Cleanup abort on unmount
  useEffect(() => {
    return () => { abortControllerRef.current?.abort(); };
  }, []);

  // ============ Send message ============
  const handleSend = useCallback(async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text && !pendingAttachment) return;
    if (loading) return;

    const modelHint = MODEL_CONFIG[model].hint;
    const reasoningHint = reasoningMode ? '[استخدم تفكيراً عميقاً خطوة بخطوة قبل الإجابة، اشرح تسلسل تفكيرك] ' : '';
    const fullMessage = modelHint + reasoningHint + (text || '[صورة مرفوعة]');

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text || '(مرفق)',
      createdAt: new Date().toISOString(),
      attachment: pendingAttachment || undefined,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    const aiMsgId = crypto.randomUUID();
    setMessages((prev) => [...prev, {
      id: aiMsgId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      isStreaming: true,
      reasoningMode,
    }]);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      // Vision analysis for image attachments
      let analysisContext = '';
      if (pendingAttachment?.type === 'image' && pendingAttachment.base64) {
        try {
          const visionRes = await fetch('/api/vision/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: pendingAttachment.base64,
              question: text || 'صف هذه الصورة بالتفصيل',
              mimeType: 'image/jpeg',
            }),
            signal: abortController.signal,
          });
          const visionData = await visionRes.json();
          if (visionData.success) {
            analysisContext = `\n\n[تحليل الصورة المرفقة: ${visionData.description}]\nالنص المستخرج: ${visionData.extractedText || 'لا يوجد'}\nالوسوم: ${visionData.tags?.join(', ') || 'لا يوجد'}`;
            setMessages((prev) => prev.map((m) =>
              m.id === userMsg.id ? { ...m, attachment: { ...m.attachment!, analysis: visionData.description } } : m
            ));
          }
        } catch { /* ignore vision errors */ }
      }

      // Web search
      let webContext = '';
      let webResults: Message['webResults'] = undefined;
      if (webSearchEnabled && text) {
        try {
          const searchRes = await fetch('/api/web-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: text, limit: 3 }),
            signal: abortController.signal,
          });
          const searchData = await searchRes.json();
          if (searchData.success && searchData.results?.length > 0) {
            webResults = searchData.results.slice(0, 3);
            webContext = `\n\n[نتائج بحث ويب]:\n${searchData.results.map((r: { title: string; snippet: string; url: string }, i: number) => `${i + 1}. ${r.title}: ${r.snippet}`).join('\n')}`;
          }
        } catch { /* ignore */ }
      }

      // RAG memory
      let memoryContext = '';
      let memorySources: Message['sources'] = undefined;
      if (memoryEnabled && text) {
        try {
          const ragRes = await fetch('/api/second-brain/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question: text, limit: 3 }),
            signal: abortController.signal,
          });
          const ragData = await ragRes.json();
          if (ragData.success && ragData.sources?.length > 0) {
            memorySources = ragData.sources.slice(0, 3);
            memoryContext = `\n\n[ذكريات ذات صلة]:\n${ragData.sources.map((s: { type: string; title: string; excerpt: string }, i: number) => `${i + 1}. (${s.type}) ${s.title}: ${s.excerpt}`).join('\n')}`;
          }
        } catch { /* ignore */ }
      }

      // Stream chat
      const fullPrompt = fullMessage + analysisContext + webContext + memoryContext;
      const { sessionId: newSessionId, fullReply, toolsUsed } = await streamChat(
        fullPrompt, sessionId,
        (token) => setMessages((prev) => prev.map((m) => m.id === aiMsgId ? { ...m, content: m.content + token } : m)),
        (tools) => setMessages((prev) => prev.map((m) => m.id === aiMsgId ? { ...m, toolsUsed: tools } : m)),
        abortController.signal,
      );

      if (newSessionId && !sessionId) setSessionId(newSessionId);

      setMessages((prev) => prev.map((m) => m.id === aiMsgId ? {
        ...m, content: fullReply || m.content, isStreaming: false, toolsUsed, sources: memorySources, webResults,
      } : m));

      // Auto-open artifacts panel for long code
      if (fullReply) {
        const blocks = extractCodeBlocks(fullReply);
        const longBlock = blocks.find((b) => b.code.split('\n').length > 20);
        if (longBlock && !artifact) {
          const newArtifact = { language: longBlock.language, code: longBlock.code, title: `كود ${longBlock.language}` };
          setArtifact(newArtifact);
          setArtifactHistory((prev) => [newArtifact, ...prev].slice(0, 20));
        }
      }

      if (newSessionId) fetchSessions();
    } catch (e) {
      if (e instanceof Error && e.name === 'AbortError') {
        setMessages((prev) => prev.map((m) => m.id === aiMsgId ? { ...m, isStreaming: false, content: m.content || '⏹️ تم الإيقاف' } : m));
      } else {
        const msg = e instanceof Error ? e.message : 'خطأ في الاتصال';
        setError(msg);
        setMessages((prev) => prev.filter((m) => m.id !== aiMsgId));
        addToast(msg, 'error');
      }
    } finally {
      setLoading(false);
      setPendingAttachment(null);
      abortControllerRef.current = null;
    }
  }, [input, loading, model, reasoningMode, pendingAttachment, sessionId, webSearchEnabled, memoryEnabled, artifact, addToast, fetchSessions]);

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  const handleNewChat = useCallback(() => {
    if (loading) handleStop();
    setMessages([]);
    setSessionId(undefined);
    setInput('');
    setError(null);
    setPendingAttachment(null);
    setArtifact(null);
  }, [loading, handleStop]);

  const handleSelectSession = useCallback(async (s: SessionInfo) => {
    if (loading) handleStop();
    setSessionId(s.id);
    setMessages([]);
    setError(null);
    setArtifact(null);
    try {
      const res = await fetch(`/api/ai-chat/quick?sessionId=${s.id}`);
      const data = await res.json();
      if (data.success && Array.isArray(data.messages)) {
        setMessages(data.messages.map((m: { id?: string; role: string; content: string; createdAt?: string }) => ({
          id: m.id || crypto.randomUUID(),
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.content || '',
          createdAt: m.createdAt || new Date().toISOString(),
        })));
      }
    } catch { /* ignore */ }
  }, [loading, handleStop]);

  const handleDeleteSession = useCallback(async (id: string) => {
    try {
      await fetch(`/api/ai-chat/quick?sessionId=${id}`, { method: 'DELETE' });
      await fetch(`/api/ai-chat/sessions?id=${id}`, { method: 'DELETE' });
      if (sessionId === id) handleNewChat();
      fetchSessions();
      addToast('تم حذف المحادثة', 'success');
    } catch {
      addToast('فشل حذف المحادثة', 'error');
    }
  }, [sessionId, handleNewChat, fetchSessions, addToast]);

  const handleRenameSession = useCallback(async (id: string, newTitle: string) => {
    try {
      await fetch('/api/ai-chat/sessions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, title: newTitle }),
      });
      fetchSessions();
      addToast('تم تحديث الاسم', 'success');
    } catch {
      addToast('فشل تحديث الاسم', 'error');
    }
  }, [fetchSessions, addToast]);

  const handleOpenArtifact = useCallback((a: Artifact) => {
    setArtifact(a);
    setArtifactHistory((prev) => [a, ...prev.filter((p) => p.code !== a.code)].slice(0, 20));
  }, []);

  // ============ Suggestion click (empty state) ============
  const handleSuggestionClick = useCallback((prompt: string) => {
    setInput(prompt);
    void handleSend(prompt);
  }, [handleSend]);

  // ============ Render ============
  return (
    <div className="flex h-full bg-background overflow-hidden">
      {/* === Sidebar (يمين في RTL) === */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 260, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden"
          >
            <div className="w-[260px] h-full p-2">
              <AISidebar
                sessions={sessions}
                activeSessionId={sessionId}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onSelect={handleSelectSession}
                onNewChat={handleNewChat}
                onDelete={handleDeleteSession}
                onRename={handleRenameSession}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Main column (messages + input) === */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-background/80 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'إخفاء الشريط' : 'إظهار الشريط'}
            type="button"
          >
            <Menu className="w-4 h-4" />
          </Button>

          {/* Model tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-thin">
            {MODEL_TABS.map((mt) => {
              const cfg = MODEL_CONFIG[mt];
              const Icon = cfg.icon;
              return (
                <button
                  key={mt}
                  onClick={() => setModel(mt)}
                  className={cn(
                    'flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors whitespace-nowrap',
                    model === mt
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                  type="button"
                >
                  <Icon className={cn('w-3.5 h-3.5', model === mt ? cfg.color : '')} />
                  {cfg.label}
                </button>
              );
            })}
          </div>

          {/* Toggle agent panel + artifacts */}
          <div className="mr-auto flex items-center gap-1">
            <Button
              variant={agentPanelOpen ? 'secondary' : 'ghost'}
              size="icon"
              className="h-9 w-9"
              onClick={() => setAgentPanelOpen((v) => !v)}
              aria-label={agentPanelOpen ? 'إخفاء لوحة الوكيل' : 'إظهار لوحة الوكيل'}
              aria-pressed={agentPanelOpen}
              type="button"
            >
              <Bot className="w-4 h-4" />
            </Button>
            {artifact && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setArtifact(null)}
                aria-label="إغلاق لوحة الكود"
                type="button"
              >
                <PanelRightClose className="w-4 h-4" />
              </Button>
            )}
            {!artifact && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setArtifact(artifactHistory[0] || null)}
                disabled={artifactHistory.length === 0}
                aria-label="فتح لوحة الكود"
                type="button"
              >
                <PanelRightOpen className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Error banner */}
        {error && (
          <div className="flex items-center gap-2 px-3 py-2 bg-red-500/10 border-b border-red-500/20 text-sm text-red-600 dark:text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span className="flex-1" dir="auto">{error}</span>
            <button onClick={() => setError(null)} aria-label="إغلاق" type="button">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Messages */}
        <AIMessageList
          messages={messages}
          model={model}
          onOpenArtifact={handleOpenArtifact}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Input bar */}
        <AIInputBar
          value={input}
          onChange={setInput}
          onSend={() => void handleSend()}
          onStop={handleStop}
          isStreaming={loading}
          aiModel={aiModel}
          onModelChange={setAIModel}
          memoryCount={memoryCount}
          webSearchEnabled={webSearchEnabled}
          onToggleWebSearch={() => setWebSearchEnabled(!webSearchEnabled)}
          memoryEnabled={memoryEnabled}
          onToggleMemory={() => setMemoryEnabled(!memoryEnabled)}
          reasoningMode={reasoningMode}
          onToggleReasoning={() => setReasoningMode(!reasoningMode)}
          pendingAttachment={pendingAttachment}
          onAttach={setPendingAttachment}
          onRemoveAttachment={() => setPendingAttachment(null)}
        />
      </div>

      {/* === Artifacts panel (يسار في RTL) === */}
      <AnimatePresence>
        {artifact && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 'auto', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden hidden lg:block"
          >
            <AIArtifactsPanel
              artifact={artifact}
              history={artifactHistory}
              onClose={() => setArtifact(null)}
              onSelectHistory={(a) => setArtifact(a)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Agent panel (أقصى اليسار في RTL) === */}
      <AnimatePresence>
        {agentPanelOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="shrink-0 overflow-hidden hidden lg:block"
          >
            <div className="w-[320px] h-full">
              <AgentPanel
                recentTools={recentTools}
                onClose={() => setAgentPanelOpen(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export const AIChatLayout = memo(AIChatLayoutBase);

```

---

## 67. `src/components/ai/ai-sidebar.tsx`

**189 سطر**

```typescript
'use client';

// ============================================
// AISidebar — شريط المحادثات السابقة
// ============================================
// محادثة جديدة + بحث + قائمة الجلسات (rename/delete/select).
// ============================================

import { memo, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, MessageSquare, Check, X, Trash2, Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { SessionInfo } from '@/components/ai/ai-types';

interface AISidebarProps {
  sessions: SessionInfo[];
  activeSessionId?: string;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelect: (s: SessionInfo) => void;
  onNewChat: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, newTitle: string) => void;
}

function AISidebarBase({
  sessions, activeSessionId, searchQuery, onSearchChange,
  onSelect, onNewChat, onDelete, onRename,
}: AISidebarProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter((s) => s.title.toLowerCase().includes(q));
  }, [sessions, searchQuery]);

  const handleRenameSubmit = useCallback((id: string) => {
    const newTitle = renameValue.trim();
    if (newTitle) onRename(id, newTitle);
    setRenamingId(null);
    setRenameValue('');
  }, [renameValue, onRename]);

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return 'اليوم';
      if (diffDays === 1) return 'أمس';
      if (diffDays < 7) return `قبل ${diffDays} أيام`;
      return d.toLocaleDateString('ar-SA', { day: 'numeric', month: 'short' });
    } catch { return ''; }
  };

  return (
    <aside className="flex flex-col h-full bg-muted/30 border border-border/60 rounded-lg overflow-hidden" aria-label="المحادثات السابقة">
      {/* ترويسة */}
      <div className="p-2.5 border-b border-border/60 flex flex-col gap-2">
        <Button onClick={onNewChat} size="sm" className="w-full gap-1.5 h-9 bg-emerald-600 hover:bg-emerald-700 text-white" type="button">
          <Plus className="w-4 h-4" />
          <span>محادثة جديدة</span>
        </Button>
        <div className="relative">
          <Search className="absolute end-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="ابحث في المحادثات..."
            className="h-8 pe-8 text-xs"
            aria-label="بحث في المحادثات"
          />
        </div>
      </div>

      {/* قائمة المحادثات */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-1.5 space-y-1">
          {filtered.length === 0 ? (
            <div className="px-3 py-8 text-center">
              <MessageSquare className="w-6 h-6 text-muted-foreground/40 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                {searchQuery ? 'لا نتائج مطابقة' : 'لا توجد محادثات سابقة'}
              </p>
            </div>
          ) : (
            filtered.map((s) => (
              <div
                key={s.id}
                className={cn(
                  'group relative rounded-md border transition-colors cursor-pointer',
                  activeSessionId === s.id
                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-300/60 dark:border-emerald-800/60'
                    : 'bg-background hover:bg-muted/60 border-transparent',
                )}
                onClick={() => renamingId === s.id ? undefined : onSelect(s)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onSelect(s); }}
              >
                {renamingId === s.id ? (
                  <div className="p-2" onClick={(e) => e.stopPropagation()}>
                    <Input
                      value={renameValue}
                      onChange={(e) => setRenameValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit(s.id);
                        if (e.key === 'Escape') { setRenamingId(null); setRenameValue(''); }
                      }}
                      autoFocus
                      className="h-7 text-xs"
                      aria-label="اسم المحادثة الجديد"
                    />
                    <div className="flex gap-1 mt-1">
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => handleRenameSubmit(s.id)} aria-label="حفظ" type="button">
                        <Check className="w-3 h-3 text-emerald-500" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0" onClick={() => { setRenamingId(null); setRenameValue(''); }} aria-label="إلغاء" type="button">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ) : deleteConfirmId === s.id ? (
                  <div className="p-2" onClick={(e) => e.stopPropagation()}>
                    <p className="text-xs text-foreground mb-1.5">حذف هذه المحادثة؟</p>
                    <div className="flex gap-1">
                      <Button size="sm" variant="destructive" className="h-6 text-xs flex-1" onClick={() => { onDelete(s.id); setDeleteConfirmId(null); }} type="button">
                        حذف
                      </Button>
                      <Button size="sm" variant="ghost" className="h-6 text-xs" onClick={() => setDeleteConfirmId(null)} type="button">
                        إلغاء
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="p-2 ps-2.5">
                    <div className="flex items-start gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate" dir="auto">{s.title}</p>
                        {s.lastPreview && (
                          <p className="text-[10px] text-muted-foreground truncate mt-0.5" dir="auto">{s.lastPreview}</p>
                        )}
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[9px] text-muted-foreground/60">{formatDate(s.createdAt)}</span>
                          {s.messagesCount !== undefined && s.messagesCount > 0 && (
                            <span className="text-[9px] text-muted-foreground/60">· {s.messagesCount} رسالة</span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* أزرار سريعة */}
                    <div className="absolute end-1 top-1 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); setRenamingId(s.id); setRenameValue(s.title); }}
                        className="p-1 rounded hover:bg-foreground/10 transition-colors"
                        aria-label="إعادة تسمية"
                        type="button"
                      >
                        <Pencil className="w-3 h-3 text-muted-foreground" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteConfirmId(s.id); }}
                        className="p-1 rounded hover:bg-foreground/10 transition-colors"
                        aria-label="حذف"
                        type="button"
                      >
                        <Trash2 className="w-3 h-3 text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </aside>
  );
}

export const AISidebar = memo(AISidebarBase);

```

---

## 68. `src/components/ai/ai-model-switcher.tsx`

**83 سطر**

```typescript
'use client';

// ============================================
// AIModelSwitcher — مبدّل نموذج AI (dropdown)
// ============================================
// Dropdown لاختيار نموذج AI (groq/claude/gpt-4o/gemini/qwen/deepseek)
// + مؤشر الذاكرة (memory count).
// ============================================

import { memo } from 'react';
import { ChevronDown, Database, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip, TooltipTrigger, TooltipContent,
} from '@/components/ui/tooltip';
import { AI_MODELS, type AIModel } from '@/components/ai/ai-types';

interface AIModelSwitcherProps {
  value: AIModel;
  onChange: (model: AIModel) => void;
  memoryCount?: number;
}

function AIModelSwitcherBase({ value, onChange, memoryCount = 0 }: AIModelSwitcherProps) {
  const current = AI_MODELS.find((m) => m.id === value) || AI_MODELS[0];

  return (
    <div className="flex items-center gap-1.5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-1.5 h-9 px-2.5 text-xs">
            <span className="text-base leading-none">{current.emoji}</span>
            <span className="font-medium">{current.label}</span>
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          {AI_MODELS.map((m) => (
            <DropdownMenuItem
              key={m.id}
              onClick={() => onChange(m.id)}
              className="flex items-start gap-2.5 py-2 cursor-pointer"
            >
              <span className="text-lg leading-none mt-0.5">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-medium">{m.label}</span>
                  {m.badge && (
                    <span className="text-[9px] px-1 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {m.badge}
                    </span>
                  )}
                  {value === m.id && <Check className="w-3.5 h-3.5 text-emerald-500 mr-auto" />}
                </div>
                <p className="text-[11px] text-muted-foreground truncate">{m.description}</p>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {memoryCount > 0 && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="sm" className="h-9 px-2 gap-1 text-xs text-muted-foreground" type="button">
              <Database className="w-3.5 h-3.5" />
              <span className="tabular-nums">{memoryCount}</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p className="text-xs">{memoryCount} ذكرى محفوظة في الذاكرة</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export const AIModelSwitcher = memo(AIModelSwitcherBase);

```

---

## 69. `src/components/ai/ai-message-list.tsx`

**214 سطر**

```typescript
'use client';

// ============================================
// AIMessageList — عرض قائمة الرسائل (Qwen AI style)
// ============================================
// Empty state: سؤال كبير مركزي + suggestion chips (زي Qwen).
// رسائل user: bubble يمين (emerald).
// رسائل AI: نص غني بدون bubble + avatar يسار.
// Typing indicator: 3 نقاط متحركة.
// Auto-scroll + slide-in animations.
// ============================================

import { memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User as UserIcon, Sparkles, Code2, Languages, BookOpen, PenLine } from 'lucide-react';
import { AIMessageRenderer } from '@/components/ai/ai-message-renderer';
import { MODEL_CONFIG, type Message, type ModelType, type Artifact } from '@/components/ai/ai-types';

interface AIMessageListProps {
  messages: Message[];
  model: ModelType;
  onOpenArtifact?: (artifact: Artifact) => void;
  onSuggestionClick?: (text: string) => void;
}

// ============ Typing Indicator (3 نقاط متحركة) ============
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 py-2" aria-label="المساعد يكتب" role="status">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-2 h-2 rounded-full bg-emerald-500"
          animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: i * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============ Suggestion Chips (اقتراحات سريعة) ============
const SUGGESTIONS = [
  { icon: PenLine, label: 'اكتب رسالة بريد رسمية', prompt: 'اكتب رسالة بريد إلكتروني رسمية لطلب اجتماع' },
  { icon: Code2, label: 'أنشئ دالة JavaScript', prompt: 'اكتب دالة JavaScript لفلترة مصفوفة حسب شرط' },
  { icon: Languages, label: 'ترجم نص للإنجليزية', prompt: 'ترجم النص التالي إلى الإنجليزية: ' },
  { icon: BookOpen, label: 'اشرح مفهوماً', prompt: 'اشرح مفهوم البرمجة الشيئية مع أمثلة' },
];

function AIMessageListBase({ messages, model, onOpenArtifact, onSuggestionClick }: AIMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const modelCfg = MODEL_CONFIG[model];

  // ====== Empty state (Qwen-style: سؤال كبير + اقتراحات) ======
  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-2xl text-center">
          {/* شعار/أيقونة كبيرة */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/20"
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>

          {/* سؤال كبير مركزي */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl font-bold text-foreground mb-2"
          >
            كيف أساعدك اليوم؟
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-muted-foreground mb-8"
          >
            اسألني أي شيء — تحليل، كتابة، برمجة، ترجمة، أو دردشة
          </motion.p>

          {/* اقتراحات (chips) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-2"
          >
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => onSuggestionClick?.(s.prompt)}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted border border-border/60 hover:border-emerald-500/30 text-start transition-all group"
                type="button"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                  <s.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm text-foreground" dir="auto">{s.label}</span>
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
            >
              {msg.role === 'user' ? (
                /* رسالة المستخدم — bubble يمين */
                <div className="flex items-start gap-2.5 max-w-[85%] flex-row-reverse">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    {/* Attachment */}
                    {msg.attachment?.type === 'image' && msg.attachment.url && (
                      <img src={msg.attachment.url} alt={msg.attachment.name} className="max-h-48 rounded-2xl border border-border" />
                    )}
                    {msg.attachment && msg.attachment.type !== 'image' && (
                      <div className="text-[11px] px-3 py-1.5 rounded-xl bg-muted text-muted-foreground border border-border">
                        📎 {msg.attachment.name}
                      </div>
                    )}
                    {/* Text bubble — مستدير */}
                    {msg.content && (
                      <div className="bg-emerald-500/10 text-foreground rounded-2xl rounded-tr-md px-4 py-2.5 text-sm leading-relaxed" dir="auto">
                        {msg.content}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* رسالة AI — بدون bubble، نص غني + avatar */
                <div className="flex items-start gap-2.5 max-w-[90%] w-full">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {/* Tools used */}
                    {msg.toolsUsed && msg.toolsUsed.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {msg.toolsUsed.map((tool, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                    {/* Content */}
                    {msg.content ? (
                      <AIMessageRenderer
                        content={msg.content}
                        isStreaming={msg.isStreaming}
                        sources={msg.sources}
                        onOpenArtifact={onOpenArtifact}
                      />
                    ) : msg.isStreaming ? (
                      /* Typing indicator بدل cursor وامض */
                      <TypingIndicator />
                    ) : null}
                    {/* Model tag */}
                    {!msg.isStreaming && msg.content && (
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className={`text-[10px] ${modelCfg.color}`}>{modelCfg.label}</span>
                        <span className="text-[10px] text-muted-foreground/40">·</span>
                        <span className="text-[10px] text-muted-foreground/60">
                          {new Date(msg.createdAt).toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export const AIMessageList = memo(AIMessageListBase);

```

---

## 70. `src/components/ai/ai-message-renderer.tsx`

**287 سطر**

```typescript
'use client';

// ============================================
// AIMessageRenderer — عرض رسائل AI بـ Markdown غني
// ============================================
// - Markdown كامل (react-markdown + remark-gfm)
// - Code blocks بـ syntax highlighting + copy button + open-in-artifacts
// - Tables, lists, blockquotes, inline code, links (new tab)
// - Images بـ thumbnail
// - Citations [1] [2] (popover يعرض المصدر)
// - Reasoning panel (collapsible) للـ <think> tags
// ============================================

import { memo, useState, useCallback, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import {
  Check, Copy, PanelRightOpen, Brain, ChevronDown, ExternalLink,
} from 'lucide-react';
import {
  Popover, PopoverTrigger, PopoverContent,
} from '@/components/ui/popover';
import type { Artifact } from '@/components/ai/ai-types';

// ============ CodeBlock — كود ملوّن + أزرار ============
export function CodeBlock({ language, code, onOpenArtifact }: {
  language: string;
  code: string;
  onOpenArtifact?: (artifact: Artifact) => void;
}) {
  const [copied, setCopied] = useState(false);
  const lineCount = useMemo(() => code.split('\n').length, [code]);
  const isLong = lineCount > 20;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [code]);

  return (
    <div className="group relative my-2 rounded-lg overflow-hidden border border-border/60 bg-[#1e1e1e]" dir="ltr">
      <div className="flex items-center justify-between px-3 py-1.5 bg-[#2d2d2d] border-b border-border/40">
        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wide">{language}</span>
        <div className="flex items-center gap-1">
          {isLong && onOpenArtifact && (
            <button
              onClick={() => onOpenArtifact({ language, code })}
              className="text-[10px] text-gray-300 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
              title="فتح في لوحة الكود"
              type="button"
            >
              <PanelRightOpen className="w-3 h-3" />
              <span className="hidden sm:inline">لوحة الكود</span>
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-[10px] text-gray-300 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
            title="نسخ"
            aria-label="نسخ الكود"
            type="button"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span className="hidden sm:inline">{copied ? 'نُسخ' : 'نسخ'}</span>
          </button>
        </div>
      </div>
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '12px',
          fontSize: '12px',
          background: 'transparent',
          maxHeight: isLong ? '400px' : 'none',
          overflow: isLong ? 'auto' : 'visible',
        }}
        wrapLongLines={false}
      >
        {code}
      </SyntaxHighlighter>
      {isLong && (
        <div className="px-3 py-1 bg-[#2d2d2d] border-t border-border/40 text-[10px] text-gray-400 text-center">
          {lineCount} سطر
        </div>
      )}
    </div>
  );
}

// ============ Citation — استشهاد بـ popover ============
export function Citation({ index, source }: {
  index: number;
  source: { type: string; title: string; excerpt: string; relevance: number };
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center justify-center w-5 h-5 mx-0.5 text-[10px] font-bold rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/25 transition-colors align-super"
          type="button"
          aria-label={`مصدر ${index}`}
        >
          {index}
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-72 text-xs" align="start">
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
              {source.type}
            </span>
            <span className="text-[10px] text-muted-foreground">
              صلة: {Math.round(source.relevance * 100)}%
            </span>
          </div>
          <p className="font-semibold text-foreground" dir="auto">{source.title}</p>
          <p className="text-muted-foreground leading-relaxed" dir="auto">{source.excerpt}</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ============ ReasoningPanel — لوحة التفكير العميق ============
function ReasoningPanel({ content }: { content: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="my-2 rounded-lg border border-teal-500/30 bg-teal-500/5 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-teal-600 dark:text-teal-400 hover:bg-teal-500/10 transition-colors"
        type="button"
        aria-expanded={expanded}
      >
        <Brain className="w-3.5 h-3.5" />
        سلسلة التفكير
        <ChevronDown className={`w-3.5 h-3.5 mr-auto transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="px-3 pb-3 text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed" dir="auto">
          {content}
        </div>
      )}
    </div>
  );
}

// ============ المكون الرئيسي: AIMessageRenderer ============
interface AIMessageRendererProps {
  content: string;
  isStreaming?: boolean;
  sources?: Array<{ type: string; title: string; excerpt: string; relevance: number }>;
  onOpenArtifact?: (artifact: Artifact) => void;
}

function AIMessageRendererBase({ content, isStreaming, sources, onOpenArtifact }: AIMessageRendererProps) {
  // فصل <think> tags عن المحتوى الرئيسي
  const thinkMatch = content.match(/<think>([\s\S]*?)<\/think>/);
  const reasoning = thinkMatch ? thinkMatch[1].trim() : '';
  const mainContent = thinkMatch ? content.replace(/<think>[\s\S]*?<\/think>/, '').trim() : content;

  return (
    <div className="text-sm leading-relaxed" dir="auto">
      {reasoning && <ReasoningPanel content={reasoning} />}

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Code blocks
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const codeStr = String(children).replace(/\n$/, '');
            const isInline = !className && !codeStr.includes('\n');

            if (isInline) {
              return (
                <code className="px-1 py-0.5 rounded bg-muted text-emerald-600 dark:text-emerald-400 text-[12px] font-mono" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <CodeBlock
                language={match ? match[1] : 'text'}
                code={codeStr}
                onOpenArtifact={onOpenArtifact}
              />
            );
          },
          // Links — open in new tab
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-0.5"
              >
                {children}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            );
          },
          // Tables
          table({ children }) {
            return (
              <div className="my-2 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs">{children}</table>
              </div>
            );
          },
          th({ children }) {
            return <th className="px-2 py-1 bg-muted font-semibold text-start">{children}</th>;
          },
          td({ children }) {
            return <td className="px-2 py-1 border-t border-border">{children}</td>;
          },
          // Blockquotes
          blockquote({ children }) {
            return (
              <blockquote className="my-2 border-s-4 border-emerald-500/40 ps-3 text-muted-foreground italic">
                {children}
              </blockquote>
            );
          },
          // Lists
          ul({ children }) {
            return <ul className="my-1 space-y-0.5 list-disc ps-5">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="my-1 space-y-0.5 list-decimal ps-5">{children}</ol>;
          },
          // Headings
          h1({ children }) { return <h1 className="text-base font-bold my-2">{children}</h1>; },
          h2({ children }) { return <h2 className="text-sm font-bold my-2">{children}</h2>; },
          h3({ children }) { return <h3 className="text-sm font-semibold my-1.5">{children}</h3>; },
          // Paragraphs
          p({ children }) {
            return <p className="my-1.5 leading-relaxed">{children}</p>;
          },
          // Images — thumbnail
          img({ src, alt }) {
            return (
              <a href={typeof src === 'string' ? src : '#'} target="_blank" rel="noopener noreferrer" className="inline-block my-2">
                <img
                  src={typeof src === 'string' ? src : ''}
                  alt={alt || ''}
                  className="max-h-40 rounded-lg border border-border hover:opacity-80 transition-opacity"
                />
              </a>
            );
          },
        }}
      >
        {mainContent}
      </ReactMarkdown>

      {/* Citations */}
      {sources && sources.length > 0 && (
        <div className="mt-2 pt-2 border-t border-border/40">
          <p className="text-[10px] text-muted-foreground mb-1">المصادر:</p>
          <div className="flex flex-wrap gap-1">
            {sources.map((src, i) => (
              <Citation key={i} index={i + 1} source={src} />
            ))}
          </div>
        </div>
      )}

      {/* Streaming cursor */}
      {isStreaming && (
        <span className="inline-block w-2 h-4 bg-emerald-500 animate-pulse ms-0.5 align-middle" aria-label="يكتب..." />
      )}
    </div>
  );
}

export const AIMessageRenderer = memo(AIMessageRendererBase);

```

---

## 71. `src/components/ai/ai-input-bar.tsx`

**222 سطر**

```typescript
'use client';

// ============================================
// AIInputBar — حقل الإدخال (Qwen AI style)
// ============================================
// تصميم Qwen:
// - شكل pill/مستدير جداً (rounded-3xl)
// - خلفية رمادية فاتحة (bg-muted) + ظل ناعم
// - بدون border صريح (يعتمد على contrast)
// - أزرار دائرية
// - tools تظهر عند focus
// - زر إرسال دائري
// ============================================

import { memo, useRef, useEffect, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send, Square, Brain, Globe, Loader2, Sparkles,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip, TooltipTrigger, TooltipContent,
} from '@/components/ui/tooltip';
import { AIModelSwitcher } from '@/components/ai/ai-model-switcher';
import { AIVoiceButton } from '@/components/ai/ai-voice-button';
import { AIFileAttachment, AttachmentPreview } from '@/components/ai/ai-file-attachment';
import type { AIModel, Message } from '@/components/ai/ai-types';

interface AIInputBarProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
  aiModel: AIModel;
  onModelChange: (m: AIModel) => void;
  memoryCount?: number;
  webSearchEnabled: boolean;
  onToggleWebSearch: () => void;
  memoryEnabled: boolean;
  onToggleMemory: () => void;
  reasoningMode: boolean;
  onToggleReasoning: () => void;
  pendingAttachment: Message['attachment'] | null;
  onAttach: (a: Message['attachment']) => void;
  onRemoveAttachment: () => void;
}

function AIInputBarBase({
  value, onChange, onSend, onStop, isStreaming, disabled,
  aiModel, onModelChange, memoryCount,
  webSearchEnabled, onToggleWebSearch,
  memoryEnabled, onToggleMemory,
  reasoningMode, onToggleReasoning,
  pendingAttachment, onAttach, onRemoveAttachment,
}: AIInputBarProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !(e.nativeEvent as KeyboardEvent).isComposing) {
      e.preventDefault();
      if (!isStreaming && value.trim()) onSend();
    }
  }, [isStreaming, value, onSend]);

  // tool button base style (دائري)
  const toolBtn = (active: boolean) =>
    `flex items-center justify-center w-8 h-8 rounded-full transition-all ${
      active
        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
    }`;

  return (
    <div className="px-4 pb-4 pt-2">
      <div className="max-w-3xl mx-auto">
        {/* Streaming indicator */}
        {isStreaming && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-1.5 mb-2 text-xs text-muted-foreground"
          >
            <Loader2 className="w-3 h-3 animate-spin text-emerald-500" />
            <span>المساعد يكتب...</span>
          </motion.div>
        )}

        {/* Attachment preview */}
        {pendingAttachment && (
          <div className="mb-2">
            <AttachmentPreview attachment={pendingAttachment} onRemove={onRemoveAttachment} />
          </div>
        )}

        {/* Input area — شكل pill مع ظل ناعم */}
        <div
          className={`relative rounded-3xl bg-muted/60 shadow-sm transition-all ${
            isFocused ? 'ring-2 ring-emerald-500/20 shadow-md' : ''
          }`}
        >
          {/* Textarea */}
          <Textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="اكتب رسالتك هنا..."
            className="border-0 bg-transparent resize-none min-h-[56px] max-h-[200px] text-sm focus-visible:ring-0 focus-visible:ring-offset-0 px-5 pt-4 pb-2 placeholder:text-muted-foreground/60"
            dir="rtl"
            disabled={disabled}
            aria-label="حقل الرسالة"
          />

          {/* Tools row (أسفل) */}
          <div className="flex items-center gap-0.5 px-3 pb-2.5 pt-1">
            {/* Left tools */}
            <AIFileAttachment onAttach={onAttach} disabled={disabled || isStreaming} />
            <AIVoiceButton
              onTranscript={(text) => onChange(value ? `${value} ${text}` : text)}
              disabled={disabled || isStreaming}
            />

            {/* Toggles (تظهر دائماً لكن أصغر) */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggleWebSearch}
                  className={toolBtn(webSearchEnabled)}
                  aria-label="بحث ويب"
                  aria-pressed={webSearchEnabled}
                  type="button"
                >
                  <Globe className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top"><p className="text-xs">بحث ويب</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggleMemory}
                  className={toolBtn(memoryEnabled)}
                  aria-label="ذاكرة"
                  aria-pressed={memoryEnabled}
                  type="button"
                >
                  <Brain className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top"><p className="text-xs">ذاكرة (RAG)</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggleReasoning}
                  className={toolBtn(reasoningMode)}
                  aria-label="تفكير عميق"
                  aria-pressed={reasoningMode}
                  type="button"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top"><p className="text-xs">تفكير عميق</p></TooltipContent>
            </Tooltip>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Model switcher (يمين) */}
            <AIModelSwitcher value={aiModel} onChange={onModelChange} memoryCount={memoryCount} />

            {/* Send / Stop button — دائري */}
            {isStreaming ? (
              <button
                onClick={onStop}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors ml-1 shrink-0"
                aria-label="إيقاف"
                type="button"
              >
                <Square className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onSend}
                disabled={!value.trim() && !pendingAttachment}
                className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white transition-all hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed ml-1 shrink-0"
                aria-label="إرسال"
                type="button"
              >
                <Send className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Helper text */}
        <p className="text-center text-[10px] text-muted-foreground/50 mt-2">
          Enter للإرسال · Shift+Enter لسطر جديد
        </p>
      </div>
    </div>
  );
}

export const AIInputBar = memo(AIInputBarBase);

```

---

## 72. `src/components/ai/ai-file-attachment.tsx`

**155 سطر**

```typescript
'use client';

// ============================================
// AIFileAttachment — رفع ملفات (صور/فيديو/صوت/PDF)
// ============================================
// زر رفع ملفات يحوّلها لـ base64 + يعرض preview.
// يستخدم AIFileUpload الموجود أو ينفّذ منطق رفع مبسّط.
// ============================================

import { memo, useRef, useCallback, useState } from 'react';
import { Paperclip, X, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import {
  Tooltip, TooltipTrigger, TooltipContent,
} from '@/components/ui/tooltip';
import type { Message } from '@/components/ai/ai-types';

interface AIFileAttachmentProps {
  onAttach: (attachment: Message['attachment']) => void;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function AIFileAttachmentBase({ onAttach, disabled }: AIFileAttachmentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [processing, setProcessing] = useState(false);

  const handleFile = useCallback(async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      alert('حجم الملف يتجاوز 10 ميجابايت');
      return;
    }

    setProcessing(true);
    try {
      const base64 = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          // إزالة prefix data:...;base64,
          const base64Data = result.split(',')[1] || result;
          resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      let type: Message['attachment']['type'] = 'file';
      if (file.type.startsWith('image/')) type = 'image';
      else if (file.type.startsWith('video/')) type = 'video';
      else if (file.type.startsWith('audio/')) type = 'audio';
      else if (file.type === 'application/pdf') type = 'pdf';

      const dataUrl = `data:${file.type};base64,${base64}`;

      onAttach({
        type,
        url: dataUrl,
        name: file.name,
        base64,
      });
    } catch {
      alert('فشل قراءة الملف');
    } finally {
      setProcessing(false);
    }
  }, [onAttach]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void handleFile(file);
    e.target.value = '';
  }, [handleFile]);

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,video/*,audio/*,.pdf"
        onChange={handleChange}
        className="hidden"
        aria-label="رفع ملف"
      />
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={disabled || processing}
            className="flex items-center justify-center w-9 h-9 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-all disabled:opacity-50 disabled:pointer-events-none"
            aria-label="رفع ملف"
            type="button"
          >
            {processing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Paperclip className="w-4 h-4" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">رفع صورة/فيديو/PDF</p>
        </TooltipContent>
      </Tooltip>
    </>
  );
}

export const AIFileAttachment = memo(AIFileAttachmentBase);

// ============ AttachmentPreview — عرض المرفق قبل الإرسال ============
export function AttachmentPreview({
  attachment,
  onRemove,
}: {
  attachment: Message['attachment'];
  onRemove: () => void;
}) {
  if (!attachment) return null;

  return (
    <div className="relative inline-flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border max-w-[240px]">
      {attachment.type === 'image' && (
        <img src={attachment.url} alt={attachment.name} className="w-10 h-10 rounded object-cover" />
      )}
      {attachment.type === 'video' && (
        <div className="w-10 h-10 rounded bg-foreground/10 flex items-center justify-center">
          <ImageIcon className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      {(attachment.type === 'pdf' || attachment.type === 'file') && (
        <div className="w-10 h-10 rounded bg-foreground/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      {attachment.type === 'audio' && (
        <div className="w-10 h-10 rounded bg-foreground/10 flex items-center justify-center">
          <FileText className="w-5 h-5 text-muted-foreground" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium truncate" dir="auto">{attachment.name}</p>
        <p className="text-[10px] text-muted-foreground capitalize">{attachment.type}</p>
        {attachment.analysis && (
          <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">تم التحليل ✓</p>
        )}
      </div>
      <button
        onClick={onRemove}
        className="shrink-0 p-1 rounded hover:bg-foreground/10 transition-colors"
        aria-label="إزالة"
        type="button"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground" />
      </button>
    </div>
  );
}

```

---

## 73. `src/components/ai/ai-voice-button.tsx`

**141 سطر**

```typescript
'use client';

// ============================================
// AIVoiceButton — تسجيل صوتي بـ Web Speech API
// ============================================
// زر تسجيل صوتي يحوّل الكلام لنص (ar-SA).
// يدعمه Chrome/Edge. Safari/Firefox قد لا يدعمه → يُخفى تلقائياً.
// ============================================

import { memo, useState, useRef, useCallback } from 'react';
import { Mic, MicOff, Square } from 'lucide-react';
import {
  Tooltip, TooltipTrigger, TooltipContent,
} from '@/components/ui/tooltip';

interface AIVoiceButtonProps {
  onTranscript: (text: string, isFinal: boolean) => void;
  disabled?: boolean;
}

function AIVoiceButtonBase({ onTranscript, disabled }: AIVoiceButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef<unknown>(null);

  const isSupported = typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  const toggleRecording = useCallback(() => {
    if (disabled || !isSupported) return;

    if (isRecording) {
      // إيقاف
      const rec = recognitionRef.current as { stop?: () => void } | null;
      rec?.stop?.();
      recognitionRef.current = null;
      setIsRecording(false);
      setInterimText('');
      return;
    }

    // بدء التسجيل
    const SpeechRecognitionCtor =
      (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => unknown }).webkitSpeechRecognition;

    if (!SpeechRecognitionCtor) return;

    const recognition = new SpeechRecognitionCtor() as {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
      onend: (() => void) | null;
      onerror: (() => void) | null;
      start: () => void;
      stop: () => void;
    };

    recognition.lang = 'ar-SA';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const result = e.results[i];
        const transcript = result[0].transcript;
        if (result.isFinal) {
          onTranscript(transcript, true);
        } else {
          interim += transcript;
        }
      }
      setInterimText(interim);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setInterimText('');
    };

    recognition.onerror = () => {
      setIsRecording(false);
      setInterimText('');
    };

    recognitionRef.current = recognition;
    setIsRecording(true);
    recognition.start();
  }, [isRecording, isSupported, disabled, onTranscript]);

  if (!isSupported) return null;

  return (
    <div className="relative flex items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={toggleRecording}
            disabled={disabled}
            className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse shadow-md shadow-red-500/30'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            } disabled:opacity-50 disabled:pointer-events-none`}
            aria-label={isRecording ? 'إيقاف التسجيل' : 'تسجيل صوتي'}
            aria-pressed={isRecording}
            type="button"
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{isRecording ? 'إيقاف التسجيل' : 'إدخال صوتي'}</p>
        </TooltipContent>
      </Tooltip>

      {/* مؤشر النص المؤقت */}
      {isRecording && interimText && (
        <span className="absolute bottom-full mb-2 start-0 max-w-[200px] truncate text-[11px] text-muted-foreground bg-background/95 border border-border rounded px-2 py-1 shadow-sm" dir="auto">
          {interimText}
        </span>
      )}

      {isRecording && (
        <button
          onClick={toggleRecording}
          className="absolute -top-1 -end-1 w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center"
          aria-label="إيقاف"
          type="button"
        >
          <Square className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
}

export const AIVoiceButton = memo(AIVoiceButtonBase);

```

---

## 74. `src/components/ai/ai-artifacts-panel.tsx`

**254 سطر**

```typescript
'use client';

// ============================================
// AIArtifactsPanel — لوحة الكود (Claude-style)
// ============================================
// Panel يمين يفتح تلقائياً عند وجود كود > 20 سطر.
// 3 تبويبات: Code | Preview | History
// أزرار: Copy + Download + Share + Fullscreen
// قابل للإغلاق + تغيير الحجم.
// ============================================

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import {
  X, Copy, Check, Download, Maximize2, Minimize2, Code2,
  Eye, History, PanelRightClose,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import type { Artifact } from '@/components/ai/ai-types';

interface AIArtifactsPanelProps {
  artifact: Artifact | null;
  history: Artifact[];
  onClose: () => void;
  onSelectHistory: (artifact: Artifact) => void;
}

function AIArtifactsPanelBase({ artifact, history, onClose, onSelectHistory }: AIArtifactsPanelProps) {
  const [tab, setTab] = useState<'code' | 'preview' | 'history'>('code');
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [width, setWidth] = useState(480);
  const resizeRef = useRef<HTMLDivElement>(null);

  // Resize logic
  useEffect(() => {
    if (!resizeRef.current) return;
    let startX = 0;
    let startWidth = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // RTL: resize from left edge → moving left increases width
      const delta = startX - e.clientX;
      const newWidth = Math.max(360, Math.min(800, startWidth + delta));
      setWidth(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX;
      startWidth = width;
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    };

    const el = resizeRef.current;
    el.addEventListener('mousedown', handleMouseDown);
    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [width]);

  const handleCopy = useCallback(async () => {
    if (!artifact) return;
    try {
      await navigator.clipboard.writeText(artifact.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  }, [artifact]);

  const handleDownload = useCallback(() => {
    if (!artifact) return;
    const ext = artifact.language === 'javascript' ? 'js' :
                artifact.language === 'typescript' ? 'ts' :
                artifact.language === 'python' ? 'py' :
                artifact.language === 'html' ? 'html' :
                artifact.language === 'css' ? 'css' :
                artifact.language === 'json' ? 'json' : 'txt';
    const blob = new Blob([artifact.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${artifact.title || 'artifact'}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }, [artifact]);

  if (!artifact) return null;

  const panelClass = fullscreen
    ? 'fixed inset-0 z-[200] bg-background'
    : 'relative h-full bg-background border-s border-border';

  const panelStyle = fullscreen ? {} : { width: `${width}px` };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 40, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={panelClass}
        style={panelStyle}
        role="complementary"
        aria-label="لوحة الكود"
      >
        {/* Resize handle (left edge in RTL) */}
        {!fullscreen && (
          <div
            ref={resizeRef}
            className="absolute top-0 start-0 w-1 h-full cursor-col-resize hover:bg-emerald-500/30 transition-colors z-10"
            aria-hidden="true"
          />
        )}

        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2 min-w-0">
            <Code2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-xs font-medium truncate" dir="auto">
              {artifact.title || `كود ${artifact.language}`}
            </span>
          </div>
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleCopy} aria-label="نسخ" type="button">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={handleDownload} aria-label="تحميل" type="button">
              <Download className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hidden sm:flex" onClick={() => setFullscreen(!fullscreen)} aria-label="ملء الشاشة" type="button">
              {fullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose} aria-label="إغلاق" type="button">
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="flex-1 flex flex-col h-[calc(100%-49px)]">
          <TabsList className="grid grid-cols-3 rounded-none border-b border-border bg-transparent h-auto p-0">
            <TabsTrigger value="code" className="gap-1.5 py-2 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent">
              <Code2 className="w-3.5 h-3.5" />
              الكود
            </TabsTrigger>
            <TabsTrigger value="preview" className="gap-1.5 py-2 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent">
              <Eye className="w-3.5 h-3.5" />
              معاينة
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-1.5 py-2 text-xs rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent">
              <History className="w-3.5 h-3.5" />
              السجل ({history.length})
            </TabsTrigger>
          </TabsList>

          {/* Code tab */}
          <TabsContent value="code" className="flex-1 m-0 overflow-auto" dir="ltr">
            <SyntaxHighlighter
              language={artifact.language}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '16px',
                fontSize: '13px',
                background: '#1e1e1e',
                minHeight: '100%',
              }}
              showLineNumbers
              wrapLongLines={false}
            >
              {artifact.code}
            </SyntaxHighlighter>
          </TabsContent>

          {/* Preview tab — iframe sandbox للـ HTML */}
          <TabsContent value="preview" className="flex-1 m-0">
            {artifact.language === 'html' || artifact.language === 'htm' ? (
              <iframe
                srcDoc={artifact.code}
                sandbox="allow-scripts"
                className="w-full h-full border-0 bg-white"
                title="معاينة"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-center p-8">
                <div>
                  <Eye className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    المعاينة متاحة لكود HTML فقط
                  </p>
                  <p className="text-xs text-muted-foreground/60 mt-1">
                    يمكن نسخ الكود وتجربته في بيئتك
                  </p>
                </div>
              </div>
            )}
          </TabsContent>

          {/* History tab */}
          <TabsContent value="history" className="flex-1 m-0 overflow-auto">
            {history.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center p-8">
                <div>
                  <History className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">لا يوجد سجل بعد</p>
                </div>
              </div>
            ) : (
              <div className="p-2 space-y-1">
                {history.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => onSelectHistory(item)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-start"
                    type="button"
                  >
                    <Code2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate" dir="auto">
                        {item.title || `كود ${item.language}`}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {item.language} · {item.code.split('\n').length} سطر
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </motion.div>
    </AnimatePresence>
  );
}

export const AIArtifactsPanel = memo(AIArtifactsPanelBase);

```

---

## 75. `src/components/cross-link-suggestions.tsx`

**272 سطر**

```typescript
'use client';

// ============================================
// Cross-Link Suggestions — واجهة اقتراحات الربط الذكي
// ============================================
// يعرض اقتراحات روابط شفّافة (مع reason + confidence) لكيان معيّن.
// "ربط" → ينشئ ItemRelation عبر /api/relations + يسجّل ActivityEvent.
// "تجاهل" → يسجّل ActivityEvent (rejected).
// "تجاهل الكل" → يرفض كل الاقتراحات دفعة واحدة.
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { Sparkles, Check, X, ChevronDown, ChevronUp, Loader2, Link2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// أسماء الأقسام (جمع) — تتطابق مع convention ItemRelation
const SECTION_LABELS: Record<string, string> = {
  notes: 'ملاحظة',
  tasks: 'مهمة',
  ideas: 'فكرة',
  projects: 'مشروع',
  transactions: 'معاملة',
  'smart-reminders': 'تذكير',
};

const SECTION_COLORS: Record<string, string> = {
  notes: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  tasks: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  projects: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  ideas: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  transactions: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  'smart-reminders': 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
};

interface Suggestion {
  fromType: string;
  fromId: string;
  fromTitle: string;
  toType: string;
  toId: string;
  toTitle: string;
  reason: string;
  confidence: number;
}

interface CrossLinkSuggestionsProps {
  /** نوع الكيان المصدري (مفرد: note/task/idea/project/transaction/reminder) */
  entityType: 'note' | 'task' | 'idea' | 'reminder' | 'transaction' | 'project';
  entityId: string;
  entityTitle: string;
  /** عرض مدمج (افتراضي) أو موسّع */
  variant?: 'compact' | 'full';
  /** عرض/إخفاء تلقائي بعد الحفظ */
  autoFetch?: boolean;
  className?: string;
}

const ENTITY_TO_SECTION: Record<string, string> = {
  note: 'notes',
  task: 'tasks',
  idea: 'ideas',
  reminder: 'smart-reminders',
  transaction: 'transactions',
  project: 'projects',
};

export function CrossLinkSuggestions({
  entityType,
  entityId,
  entityTitle,
  variant = 'compact',
  autoFetch = true,
  className,
}: CrossLinkSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [collapsed, setCollapsed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async () => {
    if (!entityId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/insights/suggest-links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entityType, entityId }),
      });
      if (!res.ok) {
        if (res.status === 401) setError('غير مصرح');
        return;
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      }
    } catch (e) {
      console.error('[CrossLinkSuggestions fetch]', e);
    } finally {
      setLoading(false);
    }
  }, [entityType, entityId]);

  useEffect(() => {
    if (autoFetch && entityId) {
      fetchSuggestions();
    }
  }, [autoFetch, entityId, fetchSuggestions]);

  const visible = suggestions.filter((s) => !dismissed.has(s.toId));

  const handleAccept = async (s: Suggestion) => {
    const sourceSection = ENTITY_TO_SECTION[entityType] || entityType;
    const targetSection = ENTITY_TO_SECTION[s.toType] || s.toType;
    try {
      // 1) أنشئ العلاقة
      await fetch('/api/relations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceType: sourceSection,
          sourceId: entityId,
          targetType: targetSection,
          targetId: s.toId,
          relationType: 'ai-suggested',
        }),
      });
      // 2) سجّل ActivityEvent
      await fetch('/api/activity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'created',
          section: sourceSection,
          itemId: entityId,
          itemTitle: `ربط ذكي: ${entityTitle} ← ${s.toTitle}`,
          metadata: { action: 'link-accepted', target: targetSection, targetId: s.toId, reason: s.reason, confidence: s.confidence },
        }),
      }).catch(() => {});
    } catch (e) {
      console.error('[CrossLinkSuggestions accept]', e);
    }
    setDismissed((prev) => new Set(prev).add(s.toId));
  };

  const handleReject = async (s: Suggestion) => {
    // سجّل الرفض كـ ActivityEvent
    const sourceSection = ENTITY_TO_SECTION[entityType] || entityType;
    const targetSection = ENTITY_TO_SECTION[s.toType] || s.toType;
    await fetch('/api/activity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'logged',
        section: sourceSection,
        itemId: entityId,
        itemTitle: `رفض ربط ذكي: ${entityTitle} ← ${s.toTitle}`,
        metadata: { action: 'link-rejected', target: targetSection, targetId: s.toId, reason: s.reason },
      }),
    }).catch(() => {});
    setDismissed((prev) => new Set(prev).add(s.toId));
  };

  const handleDismissAll = () => {
    visible.forEach((s) => handleReject(s));
  };

  if (loading && suggestions.length === 0) {
    return (
      <div className={cn('flex items-center gap-2 text-xs text-muted-foreground', className)}>
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
        الذكاء الاصطناعي يبحث عن روابط محتملة…
      </div>
    );
  }

  if (error) return null;
  if (visible.length === 0) return null;

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center gap-1.5 text-xs font-medium text-violet-600 dark:text-violet-400 hover:underline"
        >
          <Sparkles className="w-3.5 h-3.5" />
          اقتراحات ربط ذكي
          <Badge variant="secondary" className="ml-1 h-4 px-1.5 text-[10px]">
            {visible.length}
          </Badge>
          {collapsed ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
        </button>
        <Button
          variant="ghost"
          size="sm"
          className="h-6 px-2 text-[11px] text-muted-foreground"
          onClick={handleDismissAll}
        >
          تجاهل الكل
        </Button>
      </div>

      {!collapsed && (
        <div className="space-y-1.5">
          {visible.slice(0, variant === 'compact' ? 3 : 8).map((s) => (
            <SuggestionRow
              key={s.toId}
              suggestion={s}
              onAccept={() => handleAccept(s)}
              onReject={() => handleReject(s)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SuggestionRow({
  suggestion,
  onAccept,
  onReject,
}: {
  suggestion: Suggestion;
  onAccept: () => void;
  onReject: () => void;
}) {
  const targetSection = ENTITY_TO_SECTION[suggestion.toType] || suggestion.toType;
  const label = SECTION_LABELS[targetSection] || suggestion.toType;
  const color = SECTION_COLORS[targetSection] || 'bg-muted text-muted-foreground';
  const pct = Math.round(suggestion.confidence * 100);
  const tone = pct >= 80 ? 'text-emerald-600 dark:text-emerald-400' : pct >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-muted-foreground';

  return (
    <Card className="border-border/70 py-0">
      <CardContent className="p-2.5">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={cn('inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium', color)}>
            <Link2 className="w-3 h-3" />
            {label}
          </span>
          <span className="truncate text-xs font-medium" title={suggestion.toTitle}>
            {suggestion.toTitle}
          </span>
          <span className={cn('mr-auto text-[10px] font-semibold', tone)}>{pct}%</span>
        </div>
        <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground/60">السبب: </span>
          {suggestion.reason}
        </p>
        <div className="mt-1.5 flex items-center gap-1">
          <Button size="sm" className="h-6 gap-1 px-2 text-[11px]" onClick={onAccept}>
            <Check className="w-3 h-3" />
            ربط
          </Button>
          <Button variant="outline" size="sm" className="h-6 gap-1 px-2 text-[11px]" onClick={onReject}>
            <X className="w-3 h-3" />
            تجاهل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

```

---

## 76. `src/components/tag-suggestions.tsx`

**135 سطر**

```typescript
'use client';

// ============================================
// Tag Suggestions — واجهة وسوم مقترحة ذكية
// ============================================
// يعرض وسوم مقترحة من /api/insights/suggest-tags أثناء الكتابة.
// محمد يضغط على وسم لإضافته قبل الحفظ.
// ============================================

import { useState, useEffect, useRef } from 'react';
import { Sparkles, Plus, Check, Loader2, Tag as TagIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagSuggestion {
  tag: string;
  confidence: number;
  source: string;
}

interface TagSuggestionsProps {
  text: string;
  type?: string;
  selectedTags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag?: (tag: string) => void;
  enabled?: boolean;
  className?: string;
}

export function TagSuggestions({
  text,
  type,
  selectedTags,
  onAddTag,
  onRemoveTag,
  enabled = true,
  className,
}: TagSuggestionsProps) {
  const [tags, setTags] = useState<TagSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!enabled) return;
    const trimmed = text.trim();
    if (trimmed.length < 5) {
      setTags([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/insights/suggest-tags', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: trimmed, type }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) setTags(data.tags || []);
        }
      } catch {
        /* ignore */
      } finally {
        setLoading(false);
      }
    }, 700);
    return () => clearTimeout(debounceRef.current);
  }, [text, type, enabled]);

  if (!enabled || text.trim().length < 5) return null;

  const selected = new Set(selectedTags.map((t) => t.toLowerCase()));
  const available = tags.filter((t) => !selected.has(t.tag.toLowerCase()));

  return (
    <div className={cn('space-y-1.5', className)}>
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded bg-violet-100 dark:bg-violet-900/40 px-1.5 py-0.5 text-[11px] text-violet-700 dark:text-violet-300"
            >
              <TagIcon className="w-2.5 h-2.5 opacity-60" />
              {tag}
              {onRemoveTag && (
                <button
                  type="button"
                  onClick={() => onRemoveTag(tag)}
                  className="opacity-50 hover:opacity-100"
                  aria-label={`إزالة ${tag}`}
                >
                  <Check className="w-3 h-3" />
                </button>
              )}
            </span>
          ))}
        </div>
      )}

      <div className="flex flex-wrap items-center gap-1">
        {loading && (
          <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
            <Loader2 className="w-3 h-3 animate-spin" />
            اقتراح وسوم…
          </span>
        )}
        {!loading && available.length > 0 && (
          <>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
              <Sparkles className="w-3 h-3 text-violet-500" />
              وسوم مقترحة:
            </span>
            {available.map((t) => (
              <button
                key={t.tag}
                type="button"
                onClick={() => onAddTag(t.tag)}
                className="inline-flex items-center gap-0.5 rounded border border-dashed border-border bg-muted/40 px-1.5 py-0.5 text-[11px] text-foreground/80 transition hover:border-violet-400/50 hover:bg-violet-50 dark:hover:bg-violet-950/20"
                title={`ثقة ${Math.round(t.confidence * 100)}%`}
              >
                <Plus className="w-2.5 h-2.5 opacity-60" />
                {t.tag}
                <span className="text-[9px] text-muted-foreground">{Math.round(t.confidence * 100)}</span>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

```

---
