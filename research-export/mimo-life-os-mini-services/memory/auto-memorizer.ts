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
      const object = cleanCapture(m[1])
      if (!object || object.length < 1) continue

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
