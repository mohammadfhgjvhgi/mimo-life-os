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
