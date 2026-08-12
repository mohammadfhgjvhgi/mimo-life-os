# 📋 التقرير الفني الشامل
## منصة التعليم التقني للبناء الذكي
### الصف الثاني عشر صناعي - فلسطين/الخليل

---

# 1. الهيكلية التقنية (Tech Stack)

## 1.1 اللغات والمكتبات الأساسية

### Framework الأساسي
| التقنية | الإصدار | الوصف |
|---------|---------|-------|
| **Next.js** | 16.1.1 | إطار عمل React مع App Router |
| **React** | 19.0.0 | مكتبة واجهات المستخدم |
| **TypeScript** | 5.x | لغة البرمجة الرئيسية |
| **Tailwind CSS** | 4.x | نظام التنسيق |

### إدارة الحالة (State Management)
| المكتبة | الوصف |
|---------|-------|
| **Zustand** | إدارة الحالة العامة + Persist |
| **TanStack Query** | جلب البيانات من الـ API |
| **React Hook Form** | إدارة النماذج |

### واجهة المستخدم (UI Components)
| المكتبة | الوصف |
|---------|-------|
| **shadcn/ui** | مكتبة المكونات (New York Style) |
| **Radix UI** | المكونات الأساسية |
| **Framer Motion** | الرسوم المتحركة |
| **Lucide React** | الأيقونات |
| **Recharts** | الرسوم البيانية |

### الذكاء الاصطناعي (AI)
| المكتبة | الوصف |
|---------|-------|
| **z-ai-web-dev-sdk** | SDK للذكاء الاصطناعي (LLM, VLM, TTS) |

### قاعدة البيانات
| التقنية | الوصف |
|---------|-------|
| **Prisma ORM** | ORM للتعامل مع قاعدة البيانات |
| **SQLite** | قاعدة البيانات (محلية) |
| **Mock DB** | بيانات ثابتة للـ Production |

---

## 1.2 هيكل المجلدات (File Structure)

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # الصفحة الرئيسية (المدخل الوحيد)
│   ├── layout.tsx         # التخطيط العام
│   ├── globals.css        # الأنماط العامة
│   └── api/               # API Routes (Backend)
│       ├── schools/       # إدارة المدارس
│       ├── engineers/     # إدارة المهندسين
│       ├── user-profile/  # ملفات المستخدمين
│       ├── user-stats/    # إحصائيات المستخدمين
│       ├── content/       # إدارة المحتوى
│       ├── labs/          # المختبر التفاعلي
│       ├── ai-assistant/  # المساعد الذكي
│       ├── chat/          # المحادثات
│       ├── leaderboard/   # لوحة المتصدرين
│       └── ...            # 20+ API endpoints
│
├── components/            # مكونات React
│   ├── ui/               # مكونات shadcn/ui
│   ├── LoginScreen.tsx   # شاشة تسجيل الدخول
│   ├── HomePage.tsx      # الصفحة الرئيسية
│   ├── TopNav.tsx        # شريط التنقل العلوي
│   ├── Header.tsx        # الهيدر
│   ├── InteractiveLab.tsx # المختبر التفاعلي
│   ├── AIAssistant.tsx   # المساعد الذكي
│   ├── UnitPage.tsx      # صفحة الوحدة
│   ├── ContentManager.tsx # إدارة المحتوى
│   └── ...               # 30+ مكون
│
├── lib/                  # المكتبات المساعدة
│   ├── store.ts         # Zustand Stores (5 stores)
│   ├── db.ts            # طبقة التجريد للبيانات
│   ├── data.ts          # البيانات الثابتة
│   ├── static-data.ts   # البيانات الثابتة للـ Production
│   ├── permissions.ts   # نظام الصلاحيات RBAC
│   └── utils.ts         # دوال مساعدة
│
├── hooks/               # Custom Hooks
│   ├── useLocalStorage.ts
│   ├── use-mobile.ts
│   └── use-toast.ts
│
└── types/               # TypeScript Types
    └── index.ts         # جميع الأنواع (80+ interface)
```

---

# 2. نظام المستخدمين والأمان (Auth & RBAC)

## 2.1 نظام تسجيل الدخول

### آلية العمل:
1. **التحقق من الدور** (Student/Engineer/Admin)
2. **Admin** يتطلب كلمة مرور خاصة: `admin/dev2024!`
3. **Student/Engineer** يتطلب:
   - اختيار المدرسة (من قائمة 28 مدرسة)
   - اختيار السنة الدراسية
   - الطالب يجب أن يختار المهندس المعلم

### تخزين البيانات:
```typescript
// localStorage - Zustand Persist
// Key: 'smart-building-session'

interface SessionState {
  user: User | null;
  isAuthenticated: boolean;
  isDeveloper: boolean;
  isGhostMode: boolean;
  permissions: Permission[];
}
```

### بيانات المستخدم (User Object):
```typescript
interface User {
  id: string;           // معرف فريد
  name: string;         // الاسم الكامل
  role: UserRole;       // 'admin' | 'engineer' | 'student'
  schoolId: string;     // معرف المدرسة
  schoolName: string;   // اسم المدرسة
  engineerId?: string;  // معرف المهندس (للطالب)
  engineerName?: string;
  academicYear: string; // السنة الدراسية
  createdAt: string;
  lastLogin?: string;
}
```

---

## 2.2 نظام الصلاحيات (RBAC)

### جدول الصلاحيات:

| الصلاحية | Admin | Engineer | Student |
|----------|:-----:|:--------:|:-------:|
| manage_schools | ✅ | ❌ | ❌ |
| manage_all_users | ✅ | ❌ | ❌ |
| manage_school_users | ✅ | ✅ | ❌ |
| create_content | ✅ | ✅ | ❌ |
| edit_content | ✅ | ✅ | ❌ |
| delete_content | ✅ | ❌ | ❌ |
| view_all_progress | ✅ | ❌ | ❌ |
| view_school_progress | ✅ | ✅ | ❌ |
| view_own_progress | ✅ | ✅ | ✅ |
| manage_question_bank | ✅ | ✅ | ❌ |
| access_chat | ✅ | ✅ | ✅ |
| ghost_login | ✅ | ❌ | ❌ |

### حماية المسارات (Route Protection):
```typescript
// src/lib/permissions.ts
export const routePermissions = {
  'schools': { allowedRoles: ['admin'] },
  'announcements': { allowedRoles: ['admin', 'engineer'] },
  'content-manager': { allowedRoles: ['admin', 'engineer'] },
  'teacher-hub': { allowedRoles: ['admin', 'engineer'] },
  // ... باقي الصفحات متاحة للجميع
};
```

### التنفيذ في `page.tsx`:
```typescript
const checkAccess = (page: string): boolean => {
  // Admin only routes
  if (adminOnlyRoutes.includes(page)) {
    return userRole === 'admin';
  }
  
  // Engineer and Admin routes
  if (engineerAdminRoutes.includes(page)) {
    return userRole === 'admin' || userRole === 'engineer';
  }
  
  return true; // All authenticated users
};
```

---

## 2.3 الفروقات بين الواجهات حسب الدور

### واجهة الطالب (Student):
- ✅ عرض المحتوى التعليمي
- ✅ الاختبارات والبنك
- ✅ المختبر التفاعلي
- ✅ المساعد الذكي
- ✅ لوحة الإنجازات والمتصدرين
- ❌ لا يرى: المدارس، الإعلانات، إدارة المحتوى

### واجهة المهندس (Engineer):
- ✅ كل صلاحيات الطالب
- ✅ إدارة المحتوى (رفع فيديوهات، ملفات)
- ✅ الإعلانات والتعاميم
- ✅ متابعة طلابه
- ❌ لا يرى: إدارة المدارس

### واجهة المشرف (Admin):
- ✅ كل الصلاحيات
- ✅ إدارة المدارس
- ✅ إدارة المستخدمين
- ✅ وضع المطور (Ghost Mode)
- ✅ لوحة التحكم الشاملة

---

# 3. خريطة الصفحات (Sitemap & Routing)

## 3.1 جميع الصفحات

| المسار | المكون | الوصف | الأدوار المسموحة |
|--------|--------|-------|-----------------|
| `home` | `HomePage` | الصفحة الرئيسية + الوحدات | الجميع |
| `unit-1` إلى `unit-5` | `UnitPage` | صفحات الوحدات الخمس | الجميع |
| `lab` | `InteractiveLab` | المختبر التفاعلي | الجميع |
| `test` / `test-center` | `ComprehensiveTestCenter` | مركز الاختبارات | الجميع |
| `questions-bank` | `QuestionsBankPage` | بنك الأسئلة | الجميع |
| `progress` | `ProgressPage` | صفحة التقدم | الجميع |
| `chat` | `ChatPage` | المحادثة مع المساعد | الجميع |
| `terminology` | `TerminologyHub` | المصطلحات الفنية | الجميع |
| `downloads` | `DownloadsPage` | مركز التحميلات | الجميع |
| `achievements` | `AchievementsPage` | الإنجازات | الجميع |
| `leaderboard` | `LeaderboardPage` | لوحة المتصدرين | الجميع |
| `flashcards` | `FlashcardsSection` | البطاقات التعليمية | الجميع |
| `quick-review` | `QuickReviewSection` | المراجعة السريعة | الجميع |
| `diagrams` | `InteractiveDiagrams` | المخططات التفاعلية | الجميع |
| `schools` | `SchoolsPage` | إدارة المدارس | Admin فقط |
| `announcements` | `AnnouncementsPage` | الإعلانات | Admin, Engineer |
| `content-manager` | `ContentManager` | إدارة المحتوى | Admin, Engineer |
| `teacher-hub` / `community` | `ChatApp` | مركز المهندسين | Admin, Engineer |

---

## 3.2 الوحدات الدراسية الخمس

| الوحدة | الموضوع | الأيقونة | اللون |
|--------|---------|----------|-------|
| Unit 1 | كاميرات المراقبة | `Video` | أزرق سماوي |
| Unit 2 | إنذار الحريق | `Flame` | أحمر برتقالي |
| Unit 3 | إنذار السرقة | `ShieldAlert` | أصفر ذهبي |
| Unit 4 | التحكم بالدخول | `Key` | أخضر زمردي |
| Unit 5 | المقاسم الهاتفية | `Phone` | بنفسجي |

---

# 4. المكونات الذكية (Interactive Components)

## 4.1 المساعد الذكي (AI Assistant)

### آلية العمل:
```
User Input → API Route → z-ai-web-dev-sdk → LLM Response
```

### المكونات:
1. **AIAssistantButton** - زر عائم في الزاوية
2. **AIAssistant** - نافذة المحادثة

### API Endpoint:
```typescript
// /api/ai-assistant/route.ts
POST /api/ai-assistant
Body: { message, userId, userName, history }
Response: { success, response, pointsEarned }
```

### الميزات:
- 🤖 ردود ذكية متخصصة في المباني الذكية
- 💾 حفظ سجل المحادثة
- ⭐ نظام النقاط (+5 نقاط لكل سؤال)
- 📝 أسئلة مقترحة جاهزة

---

## 4.2 المختبر التفاعلي (Interactive Lab)

### الأقسام:
1. **المحتوى المرفوع** - فيديوهات وصور من إدارة المحتوى
2. **ملفات PDF** - أدلة PDF للتحميل
3. **التدريبات** - أسئلة تفاعلية لكل وحدة
4. **المساعد الذكي** - للأسئلة العملية

### أنواع الأسئلة:
```typescript
type LabType = 
  | 'COMPONENT_ID'    // تعرف على المكون
  | 'WIRING'          // التوصيلات
  | 'TROUBLESHOOTING' // استكشاف الأعطال
  | 'CALCULATION'     // الحسابات
  | 'SAFETY';         // السلامة
```

### نظام النقاط:
```typescript
interface DbLabQuestion {
  points: number;        // نقاط السؤال
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  hint: string;          // تلميح
  explanation: string;   // شرح الحل
}
```

---

# 5. إدارة الحالة والأداء (Performance)

## 5.1 نقل البيانات بين الصفحات

### Zustand Stores (5 متاجر):

#### 1. SessionStore - الجلسة والمصادقة:
```typescript
// المفتاح: 'smart-building-session'
{
  user: User | null,
  isAuthenticated: boolean,
  permissions: Permission[],
  login: (user) => void,
  logout: () => void,
  hasPermission: (permission) => boolean
}
```

#### 2. QuizStore - تقدم الاختبارات:
```typescript
// المفتاح: 'smart-building-quiz'
{
  progress: Record<string, QuizProgress>,
  saveAnswer: (quizId, userId, questionId, answer) => void,
  completeQuiz: (quizId, score, passed) => void
}
```

#### 3. ChatStore - سجل المحادثات:
```typescript
// المفتاح: 'smart-building-chat'
{
  messages: Record<string, ChatMessage[]>,
  drafts: Record<string, ChatDraft>,
  addMessage: (userId, message) => void
}
```

#### 4. UserProgressStore - تقدم المستخدم:
```typescript
// المفتاح: 'smart-building-progress'
{
  completedLessons: string[],
  completedQuizzes: string[],
  totalScore: number,
  streak: number,
  badges: string[]
}
```

#### 5. NotificationStore - الإشعارات:
```typescript
// المفتاح: 'smart-building-notifications'
{
  notifications: Notification[],
  unreadCount: number,
  addNotification: (notification) => void
}
```

---

## 5.2 تحسين الأداء

### Lazy Loading للفيديوهات:
```typescript
// InteractiveLab.tsx
const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

// لا يتم تحميل iframe إلا عند النقر
<button onClick={() => handleVideoClick(content.id)}>
  <img src={thumbnail} /> // صورة مصغرة فقط
  <Play /> // زر التشغيل
</button>
```

### الصفحات (Pagination):
```typescript
const itemsPerPage = 12;
const getPaginatedContent = (content) => {
  const start = (currentPage - 1) * itemsPerPage;
  return content.slice(start, start + itemsPerPage);
};
```

### استخدام useCallback و useMemo:
```typescript
const fetchQuestions = useCallback(async (unitId: string) => {
  // جلب الأسئلة
}, []);

const filteredContent = useMemo(() => {
  return allContent.filter(c => c.unitId === selectedUnit);
}, [allContent, selectedUnit]);
```

---

# 6. الربط الخارجي (Deployment)

## 6.1 GitHub Repository

```bash
# Repository URL
https://github.com/mohammadfhgjvhgi/lms-smart-building

# أوامر Git الأساسية
git add .
git commit -m "message"
git push origin main
```

---

## 6.2 Render Deployment

### الإعدادات المطلوبة:
```yaml
# render.yaml
services:
  - type: web
    name: lms-smart-building
    env: node
    buildCommand: bun install && bun run build
    startCommand: bun run start
    envVars:
      - key: NODE_ENV
        value: production
```

### متغيرات البيئة:
```
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_API_URL="https://lms-smart-building.onrender.com"
```

---

## 6.3 عملية التحديث التلقائي

```
GitHub Push → Render Webhook → Auto Build → Auto Deploy
```

### الخطوات:
1. `git push` إلى GitHub
2. Render يستقبل الإشعار
3. `bun install` - تثبيت الحزم
4. `bun run build` - بناء المشروع
5. `bun run start` - تشغيل الخادم

---

# 7. API Routes Reference

| Endpoint | Method | الوصف |
|----------|--------|-------|
| `/api/schools` | GET/POST | قائمة المدارس |
| `/api/engineers` | GET | المهندسين حسب المدرسة |
| `/api/user-profile` | GET/POST | ملف المستخدم |
| `/api/user-stats` | GET/POST | إحصائيات المستخدم |
| `/api/content` | GET/POST | المحتوى المرفوع |
| `/api/labs` | GET | أسئلة المختبر |
| `/api/ai-assistant` | GET/POST | المساعد الذكي |
| `/api/leaderboard` | GET | لوحة المتصدرين |
| `/api/chat` | GET/POST | المحادثات |
| `/api/announcements` | GET | الإعلانات |

---

# 8. كلمات المرور والوصول

| الدور | كلمة المرور |
|-------|-------------|
| **Admin** | `admin/dev2024!` |
| **Developer (Ghost)** | `abd123443211` |

---

# 9. ملاحظات مهمة

## 9.1 نقاط القوة:
- ✅ نظام صلاحيات قوي ومرن
- ✅ واجهة عربية كاملة RTL
- ✅ تصميم متجاوب (Responsive)
- ✅ مساعد ذكي متخصص
- ✅ نظام نقاط وإنجازات

## 9.2 التحسينات المستقبلية:
- 🔄 إضافة قاعدة بيانات حقيقية (PostgreSQL)
- 🔄 نظام تسجيل دخول آمن (JWT)
- 🔄 WebSocket للمحادثات الحية
- 🔄 PWA للعمل بدون إنترنت

---

**تم إعداد هذا التقرير بواسطة المطور الرئيسي**
**التاريخ: مارس 2025**
