# MiMo AI — Development Guide

> **دليل كامل للمطورين** — كيفية التطوير، الاختبار، والنشر

---

## 1. إعداد بيئة التطوير

### المتطلبات

| الأداة | الإصدار | السبب |
|---|---|---|
| **Bun** | 1.0+ | Runtime + Package Manager |
| **Node.js** | 18+ | مطلوب لـ Next.js |
| **Git** | أي إصدار | التحكم بالإصدارات |
| **VS Code** | مُوصى به | IDE (مع ESLint + Prettier) |

### التثبيت

```bash
# 1. استنساخ المشروع
git clone https://github.com/mohammadfhgjvhgi/mimo-ai.git
cd mimo-ai

# 2. تثبيت الحزم
bun install

# 3. إعداد قاعدة البيانات
bun run db:push
bun run db:generate

# 4. إعداد البيئة
cp .env.example .env
# DATABASE_URL="file:./db/custom.db"

# 5. تشغيل خادم التطوير
bun run dev
```

افتح: `http://localhost:3000`

---

## 2. هيكل المشروع

```
mimo-ai/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx           # الصفحة الرئيسية
│   │   ├── layout.tsx         # التخطيط العام
│   │   ├── globals.css        # التصميم
│   │   └── api/               # 49 API route
│   ├── core/                  # محرك MiMo (81 ملف)
│   │   ├── kernel/            # Kernel + boot
│   │   ├── agents/            # 4 agents + lifecycle
│   │   ├── context/           # Context Builder
│   │   ├── memory/            # Memory Engine
│   │   ├── knowledge/         # Knowledge Graph
│   │   ├── search/            # GraphRAG + HybridSearch
│   │   ├── models/            # Mock + ZAI + Local
│   │   ├── tools/             # Tools + MCP
│   │   ├── orchestrator/      # Plan execution
│   │   ├── planner/           # Plan generation
│   │   ├── reasoner/          # Intent detection (LLM)
│   │   ├── validator/         # Response validation
│   │   ├── workflow/          # Pipeline
│   │   ├── events/            # EventBus
│   │   ├── runtime/           # RuntimeGateway (sandbox)
│   │   └── ...
│   ├── components/
│   │   ├── mimo/              # OS shell + panels
│   │   ├── nova/              # Chat primitives
│   │   └── ui/                # shadcn/ui
│   ├── lib/
│   │   ├── ai/                # AI layer
│   │   ├── nova/              # Store + API
│   │   └── db.ts              # Prisma client
│   └── stores/                # Zustand
├── prisma/
│   └── schema.prisma          # 26 model
├── architecture/              # 28 ملف معماري
├── docs/                      # 29 ملف تصميم
├── research/                  # مكتبة بحثية
└── tests/                     # اختبارات
```

---

## 3. Core Pipeline — كيف يعمل

كل رسالة تمر عبر 6 مراحل:

```typescript
// src/core/workflow/WorkflowEngine.ts
export async function runWorkflow(
  userInput: string,
  context: ContextObject,
): Promise<WorkflowResult> {
  // 1. Reasoner: decide what to do
  const decision = await reason({ userInput }, context);

  // 2. If clarify, return question
  if (decision.action === 'clarify') {
    return { decision, clarificationQuestion: decision.clarificationQuestion };
  }

  // 3. Orchestrator: execute the plan
  const run = await executePlan(decision.plan!, context);

  // 4. Extract answer
  const answer = extractAnswer(run);

  // 5. Validate
  const validation = await validateResponse(answer, context);

  // 6. Return
  return { decision, run, answer, validation };
}
```

### إضافة Stage جديدة

```typescript
// 1. أضف الحدث في src/core/events/EventBus.ts
export const EVENT = {
  // ...
  MY_NEW_STAGE: 'my_new_stage',
} as const;

// 2. أضف المنطق في WorkflowEngine
const myResult = await myNewStage(input, context);
mimoEvents.emit(createEvent(EVENT.MY_NEW_STAGE, myResult, 'my-stage'));

// 3. أضف SSE event في /api/chat/route.ts
sse(controller, 'my_stage', myResult);
```

---

## 4. إضافة Agent جديد

```typescript
// src/core/agents/MyAgent.ts
import type { AgentResult, AgentTask, ContextObject } from '../types';
import type { Agent } from '../registry/types';

export const MY_AGENT_ID = 'my_agent';

export const MyAgent: Agent = {
  id: MY_AGENT_ID,
  name: 'My Agent',
  description: 'Does something specific',
  capabilities: ['my_capability'],
  requiredTools: [],

  async execute(
    task: AgentTask,
    context: ContextObject,
  ): Promise<AgentResult> {
    // Your logic here
    return {
      success: true,
      output: { /* ... */ },
      reasoning: 'Did X because Y',
    };
  },
};

// سجّل الـ agent في Kernel
// src/core/kernel/Kernel.ts
agentRegistry.register(MyAgent);
```

---

## 5. إضافة Tool جديد

```typescript
// src/core/tools/MyTool.ts
import type { Tool } from '../registry/types';

export const MY_TOOL_ID = 'my_tool';

export const MyTool: Tool = {
  id: MY_TOOL_ID,
  name: 'My Tool',
  description: 'Does something useful',
  category: 'custom',
  inputSchema: {
    type: 'object',
    properties: {
      input: { type: 'string' },
    },
    required: ['input'],
  },
  riskLevel: 'low',
  requiresConfirmation: false,

  async execute(input: unknown, context: ContextObject): Promise<unknown> {
    const { input: text } = input as { input: string };
    // Your logic here
    return { result: `Processed: ${text}` };
  },
};

// سجّل الأداة في Kernel
toolRegistry.register(MyTool);
```

---

## 6. إضافة Model Provider جديد

```typescript
// src/core/models/MyModel.ts
import type { ModelRequest, ModelResponse } from '../types';
import type { Model } from '../registry/types';

export const MY_MODEL_ID = 'my-model';

export function createMyModel(): Model {
  return {
    id: MY_MODEL_ID,
    name: 'My Model',
    capabilities: ['chat', 'streaming'],

    async chat(request: ModelRequest): Promise<ModelResponse> {
      // Call your provider API
      const response = await fetch('https://api.my-provider.com/v1/chat', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.MY_API_KEY}` },
        body: JSON.stringify({
          messages: request.messages,
          temperature: request.temperature,
        }),
      });
      const data = await response.json();
      return {
        content: data.choices[0].message.content,
        model: MY_MODEL_ID,
        usage: {
          promptTokens: data.usage.prompt_tokens,
          completionTokens: data.usage.completion_tokens,
        },
      };
    },

    async *stream(request: ModelRequest): AsyncIterable<string> {
      // Streaming implementation
    },
  };
}

// سجّل الـ model في Kernel (lazy — لا تستورد الـ SDK في الأعلى)
try {
  const myModel = createMyModel();
  modelRegistry.register(myModel, { default: true });
} catch (err) {
  log.warn('My model not registered', { error: err });
}
```

---

## 7. إضافة API Route جديد

```typescript
// src/app/api/my-route/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { mimoKernel } from '@/core';
import { db } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  await mimoKernel.boot();

  try {
    const data = await db.myModel.findMany();
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'unknown' },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  await mimoKernel.boot();
  const body = await req.json();

  const item = await db.myModel.create({ data: body });
  return NextResponse.json(item);
}
```

---

## 8. إضافة Panel جديد

```typescript
// src/components/mimo/panels/my-panel.tsx
'use client';

import { useAppStore } from '@/stores/app-store';

export function MyPanel() {
  const { setActiveSection } = useAppStore();

  return (
    <div className="flex-1 flex flex-col">
      <header className="h-14 border-b border-border flex items-center px-4">
        <h1 className="text-lg font-bold">لوحتي</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4">
        {/* content */}
      </div>
    </div>
  );
}
```

```typescript
// src/app/page.tsx — أضف القسم
{activeSection === 'my-panel' && <MyPanel />}
```

```typescript
// src/lib/constants.ts — أضف للقائمة
export const APP_SECTIONS = [
  // ...
  { id: 'my-panel', ar: 'لوحتي', icon: 'MyIcon' },
];
```

---

## 9. التعامل مع الذاكرة (Memory)

### تخزين ذاكرة
```typescript
import { memoryEngine } from '@/core';

await memoryEngine.store({
  type: 'fact',
  content: 'المستخدم يدرس هندسة الأتمتة',
  scope: 'global',
  source: 'conversation:conv_123',
  confidence: 0.8,
});
```

### استرجاع الذكريات
```typescript
const memories = await memoryEngine.recall({
  search: 'ماذا تعرف عني؟',
  limit: 5,
});
```

### تجميع الذكريات
```typescript
import { consolidateMemories } from '@/core';

// يُستدعى تلقائياً على boot، لكن يمكن استدعاؤه يدوياً
const result = await consolidateMemories();
// { merged: 2, archived: 1, promoted: 3 }
```

---

## 10. التعامل مع Knowledge Graph

### إضافة كيان
```typescript
import { KnowledgeGraph } from '@/core';

await KnowledgeGraph.upsertEntity({
  name: 'محمد',
  type: 'person',
  description: 'المستخدم',
  confidence: 0.9,
});
```

### إضافة علاقة
```typescript
await KnowledgeGraph.addRelation({
  fromEntityId: 'ent_1',
  toEntityId: 'ent_2',
  type: 'works_on',
  confidence: 0.8,
});
```

### GraphRAG Retrieval
```typescript
import { graphRagRetrieve } from '@/core';

const result = await graphRagRetrieve('ماذا تعرف عن مشاريعي؟', {
  budget: 4000,
});
// result.entities, result.relatedEntities, result.citations
```

---

## 11. Style Guide

### الألوان
```css
/* ممنوع: blue, indigo, sky */
/* مسموح: emerald, teal, amber */

--primary: oklch(0.55 0.13 160);   /* emerald */
--accent: oklch(0.7 0.15 160);     /* teal */
--background: oklch(0.15 0.01 145); /* dark warm */
```

### TypeScript
```typescript
// ✅ صحيح — strict types
interface MyData {
  readonly id: string;
  readonly name: string;
}

// ❌ خطأ — any
const data: any = await fetch(...);

// ✅ استخدم Readonly للـ immutable
export interface ContextObject {
  readonly user: UserProfile;
  readonly conversation: ConversationContext;
}
```

### React Components
```typescript
// ✅ استخدم shadcn/ui
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// ✅ استخدم Lucide icons
import { Brain, MessageSquare } from 'lucide-react';

// ✅ RTL Arabic-first
<html lang="ar" dir="rtl">
```

---

## 12. الاختبار

```bash
# تشغيل كل الاختبارات
bun run test

# تشغيل ملف محدد
bun test tests/unit/memory.test.ts
```

### مثال اختبار
```typescript
// tests/unit/my-test.test.ts
import { describe, it, expect } from 'bun:test';
import { memoryEngine } from '@/core';

describe('Memory Engine', () => {
  it('should store and recall a memory', async () => {
    await memoryEngine.store({
      type: 'fact',
      content: 'test fact',
      scope: 'temporary',
      source: 'test',
    });

    const memories = await memoryEngine.recall({
      search: 'test',
      limit: 1,
    });

    expect(memories.length).toBeGreaterThan(0);
    expect(memories[0].content).toBe('test fact');
  });
});
```

---

## 13. Lint + Type Check

```bash
# ESLint
bun run lint

# TypeScript check (no build)
npx tsc --noEmit
```

### قواعد ESLint مهمة
- لا `any` — استخدم `unknown` + type guard
- لا `console.log` في الإنتاج (استخدم `createLogger`)
- لا unused imports
- لا `react/no-unescaped-entities`

---

## 14. التعامل مع OOM (4GB RAM)

إذا واجهت OOM في بيئة محدودة الذاكرة:

### 1. استخدم `--webpack` (ليس Turbopack)
```json
// package.json
"dev": "next dev -p 3000 --webpack"
```

### 2. زِد `--max-old-space-size`
```bash
NODE_OPTIONS="--max-old-space-size=3072" bun run dev
```

### 3. Lazy load المكوّنات الثقيلة
```typescript
// ✅ lazy
const Sidebar = dynamic(() => import('./Sidebar'), { ssr: false });

// ❌ eager (يسبب OOM)
import Sidebar from './Sidebar';
```

### 4. Lazy import للـ SDKs الضخمة
```typescript
// ✅ lazy — لا تستورد في الأعلى
async function getClient() {
  const ZAI = (await import('z-ai-web-dev-sdk')).default;
  return await ZAI.create();
}

// ❌ eager — يسبب OOM
import ZAI from 'z-ai-web-dev-sdk';
```

### 5. أزِل `output: standalone` في dev
```typescript
// next.config.ts
const nextConfig = {
  // output: "standalone",  // ← علّق هذا في dev
  reactStrictMode: false,
};
```

---

## 15. النشر (Deployment)

### Build للإنتاج
```bash
bun run build
```

### التشغيل
```bash
bun run start
```

### المتغيرات البيئية للإنتاج
```env
DATABASE_URL="file:./db/custom.db"
NODE_ENV=production
```

---

## 16. استكشاف الأخطاء

### المشكلة: Turbopack يكسر CSS
```
Error: Parsing CSS source code failed
```
**الحل:** استخدم `--webpack` flag

### المشكلة: OOM (Out of Memory)
```
Error: JavaScript heap out of memory
```
**الحل:** `NODE_OPTIONS="--max-old-space-size=3072"` + lazy loading

### المشكلة: Kernel boot race condition
```
Error: model already registered with different instance
```
**الحل:** الـ Kernel يستخدم promise-based singleton (مُصلّح)

### المشكلة: ZAI SDK يسبب OOM
**الحل:** Lazy dynamic import (مُصلّح في `ZAIModel.ts`)

### المشكلة: API route 500
```bash
# تحقق من الـ logs
tail -f dev.log
```

---

## 17. المساهمة

### قبل الـ commit
```bash
# 1. تأكد من lint
bun run lint

# 2. تأكد من tests
bun run test

# 3. تأكد من type check
npx tsc --noEmit
```

### Commit Message Format
```
feat: add new feature
fix: fix a bug
chore: maintenance
docs: documentation
refactor: code refactoring
test: add tests
```

---

## 18. موارد إضافية

| المورد | الموقع |
|---|---|
| **Architecture docs** | `architecture/` (28 ملف) |
| **Design docs** | `docs/design/` (28 ملف) |
| **Research library** | `research/` (80+ ملف) |
| **API Reference** | `API_REFERENCE.md` |
| **Database docs** | `DATABASE.md` |
| **Architecture overview** | `ARCHITECTURE.md` |

---

## 19. الأسئلة الشائعة

### س: هل أحتاج API key؟
**ج:** لا — Mock Provider يعمل offline بدون أي key. لتفعيل AI حقيقي، اضبط ZAI أو أي provider آخر.

### س: هل يعمل بدون إنترنت؟
**ج:** نعم — Mock Provider + Local Memory + Local Knowledge Graph. فقط WebSearch و Image Generation تحتاجان إنترنت.

### س: كيف أضيف مزود AI جديد؟
**ج:** أنشئ adapter في `src/core/models/` يحقق `Model` interface، ثم سجّله في `Kernel.ts`.

### س: كيف أغيّر الـ accent color؟
**ج:** عدّل `--primary` في `src/app/globals.css` (oklch format).

### س: كيف أضيف لغة جديدة؟
**ج:** المشروع RTL Arabic-first. للإضافة:
1. أضف اللغة في `layout.tsx`
2. استخدم `next-intl` للترجمة
3. عدّل `dir` حسب اللغة
