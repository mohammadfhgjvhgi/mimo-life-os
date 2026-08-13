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

// ⭐ النقطة 8: Retry mechanism بـ exponential backoff
const RETRYABLE_STATUS_CODES = [408, 429, 500, 502, 503, 504];
const RETRYABLE_ERRORS = ['ECONNRESET', 'ECONNREFUSED', 'ETIMEDOUT', 'fetch failed', 'network error', 'socket hang up'];

function isRetryableError(error: string, statusCode?: number): boolean {
  if (statusCode && RETRYABLE_STATUS_CODES.includes(statusCode)) return true;
  const lower = error.toLowerCase();
  return RETRYABLE_ERRORS.some(r => lower.includes(r.toLowerCase()));
}

async function callApi(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  body?: unknown,
  options?: { timeoutMs?: number; maxRetries?: number },
): Promise<{ success: boolean; result?: unknown; error?: string; retries?: number }> {
  const timeoutMs = options?.timeoutMs ?? 15000;
  const maxRetries = options?.maxRetries ?? 2;
  const baseUrl = process.env.AI_CORE_API_BASE || 'http://localhost:3000';

  let lastError = '';
  let lastStatusCode: number | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`${baseUrl}${path}`, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(timeoutMs),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => '');
        lastError = `API ${res.status}: ${errText.slice(0, 200)}`;
        lastStatusCode = res.status;

        // ⭐ retry لو الخطأ قابل للتعافي
        if (attempt < maxRetries && isRetryableError(lastError, lastStatusCode)) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
          await new Promise(r => setTimeout(r, delay));
          continue;
        }

        return { success: false, error: lastError, retries: attempt };
      }

      const data = await res.json();
      return { success: true, result: data, retries: attempt };
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);

      // ⭐ retry لو الخطأ شبكي
      if (attempt < maxRetries && isRetryableError(lastError)) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        await new Promise(r => setTimeout(r, delay));
        continue;
      }

      return { success: false, error: lastError, retries: attempt };
    }
  }

  return { success: false, error: lastError, retries: maxRetries };
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
