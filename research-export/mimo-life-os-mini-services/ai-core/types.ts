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
  // ⭐ النقطة 6: إعدادات الأدوات القابلة للتكوين
  maxToolsPerTurn: number;       // أقصى عدد أدوات في كل تبادل (default 3)
  toolTimeoutMs: number;         // timeout لكل أداة بالـ ms (default 15000)
  totalToolTimeoutMs: number;    // timeout إجمالي لكل الأدوات (default 45000)
}

export const DEFAULT_CONFIG: EngineConfig = {
  maxIterations: 5,
  temperature: 0.7,
  enableTools: true,
  enableReasoning: false,
  maxToolsPerTurn: 3,
  toolTimeoutMs: 15_000,
  totalToolTimeoutMs: 45_000,
};
