# 📊 التقرير التقني الشامل - منصة تعليم المباني الذكية (LMS Smart Building)

## نظرة عامة
منصة تعليمية متكاملة لإدارة التعلم (LMS) متخصصة في تكنولوجيا المباني الذكية - موجهة لطلاب الصف الثاني عشر الصناعي في فلسطين. تغطي المنصة 5 وحدات تعليمية: كاميرات المراقبة، إنذار الحريق، إنذار السرقة، التحكم بالدخول، والمقاسم الهاتفية.

---

## 1. الهيكل والتقنيات (Architecture & Tech Stack)

### 1.1 التقنيات الأساسية

```yaml
Framework: Next.js 16.1.3 (App Router + Turbopack)
Language: TypeScript 5
Styling: Tailwind CSS 4 + shadcn/ui (New York style)
Database: PostgreSQL (Supabase) + Prisma ORM
Authentication: Supabase Auth
State Management: Zustand (مع استمرار localStorage)
Animations: Framer Motion
Charts: Recharts
Icons: Lucide React
```

### 1.2 هيكلية المشروع

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # 27+ API Endpoints
│   │   ├── ai-assistant/         # المساعد الذكي النظري
│   │   ├── practical-ai/         # المساعد الذكي العملي
│   │   ├── ai-grade/             # التصحيح الآلي
│   │   ├── content/              # إدارة المحتوى
│   │   ├── labs/                 # أسئلة المختبر
│   │   ├── lab-results/          # نتائج المختبر
│   │   ├── quizzes/              # الاختبارات
│   │   ├── questions/            # بنك الأسئلة
│   │   ├── exams/                # الامتحانات التوجيهية
│   │   ├── user-profile/         # ملفات المستخدمين
│   │   ├── user-stats/           # إحصائيات المستخدم
│   │   ├── achievements/         # الإنجازات والشارات
│   │   ├── leaderboard/          # لوحة المتصدرين
│   │   ├── schools/              # المدارس
│   │   ├── engineers/            # المهندسين
│   │   ├── messages/             # الرسائل المباشرة
│   │   ├── channels/             # القنوات والمجموعات
│   │   ├── notifications/        # الإشعارات
│   │   ├── announcements/        # الإعلانات
│   │   ├── assignments/          # الواجبات
│   │   ├── upload/               # رفع الملفات
│   │   ├── download/             # تحميل الملفات
│   │   ├── files/                # إدارة الملفات
│   │   ├── videos/               # الفيديوهات
│   │   ├── units/                # الوحدات التعليمية
│   │   └── chat/                 # رسائل الشات
│   ├── layout.tsx                # التخطيط الرئيسي
│   └── page.tsx                  # الصفحة الرئيسية
├── components/
│   ├── ui/                       # 35+ مكون shadcn/ui
│   ├── HomePage.tsx              # الصفحة الرئيسية
│   ├── UnitPage.tsx              # صفحة الوحدة
│   ├── InteractiveLab.tsx        # المختبر التفاعلي (980+ سطر)
│   ├── AIAssistant.tsx           # المساعد الذكي العائم
│   ├── LoginScreen.tsx           # شاشة تسجيل الدخول
│   ├── ChatApp.tsx               # تطبيق المحادثة
│   ├── TeacherHubPage.tsx        # لوحة تحكم المهندس
│   ├── ProgressPage.tsx          # صفحة التقدم
│   ├── AchievementsPage.tsx      # صفحة الإنجازات
│   ├── LeaderboardPage.tsx       # لوحة المتصدرين
│   ├── ContentManager.tsx        # إدارة المحتوى
│   └── ...                       # مكونات أخرى
├── lib/
│   ├── store.ts                  # Zustand Store
│   ├── data.ts                   # البيانات الثابتة
│   ├── db.ts                     # Prisma Client
│   └── supabase/                 # Supabase Client
├── types/
│   └── index.ts                  # تعريفات TypeScript
└── prisma/
    ├── schema.prisma             # مخطط قاعدة البيانات
    ├── seed.ts                   # بيانات أولية (28 مدرسة)
    ├── seed-content.ts           # محتوى تعليمي
    ├── seed-labs.ts              # أسئلة مختبر
    └── seed-lab-questions.ts     # أسئلة تفصيلية
```

### 1.3 بنية قاعدة البيانات (Prisma Schema)

```prisma
// === النماذج الأساسية (23 جدول) ===

// المستخدمون (3 أدوار)
model UserProfile {
  id          String   @id @default(uuid())
  userId      String   @unique
  name        String
  role        String   @default("student") // student, engineer, admin
  engineerId  String?  // للمهندس المسؤول
  schoolId    String?  // المدرسة
  avatar      String?
  phone       String?
  isOnline    Boolean  @default(false)
  lastSeen    DateTime @default(now())
}

// المحتوى التعليمي
model LessonContent {
  id          String        @id @default(uuid())
  lessonId    String        // الوحدة التعليمية
  type        ContentType   // VIDEO, IMAGE, TEXT, DOCUMENT, LINK
  category    ContentCategory @default(GENERAL)
  // INSTALLATION, PROGRAMMING, EXPLANATION, MAINTENANCE, TROUBLESHOOTING
  title       String
  description String?
  content     String        // الرابط أو المحتوى
  thumbnail   String?
  order       Int           @default(0)
  isActive    Boolean       @default(true)
}

// أسئلة المختبر
model LabQuestion {
  id            String       @id @default(uuid())
  unitId        String
  questionType  QuestionType // COMPONENT_ID, WIRING, TROUBLESHOOTING, CALCULATION, SAFETY
  question      String
  imageUrl      String?
  options       String       // JSON array
  correctAnswer String
  hint          String
  explanation   String
  points        Int          @default(10)
  difficulty    Difficulty   @default(MEDIUM) // EASY, MEDIUM, HARD
}

// نتائج المختبر
model LabResult {
  id             String   @id @default(uuid())
  userId         String
  unitId         String
  totalQuestions Int
  correctAnswers Int
  score          Int
  timeSpent      Int      // بالثواني
  completedAt    DateTime @default(now())
}

// الاختبارات
model Quiz {
  id          String   @id @default(uuid())
  unitId      String?
  title       String
  timeLimit   Int      @default(10) // دقائق
  passingScore Int     @default(60)
  difficulty  Difficulty @default(MEDIUM)
  questions   QuizQuestion[]
}

model QuizResult {
  id             String   @id @default(uuid())
  userId         String
  quizId         String
  score          Int
  percentage     Int
  timeSpent      Int
  completedAt    DateTime @default(now())
}

// الامتحانات التوجيهية
model PastExam {
  id          String   @id @default(uuid())
  year        Int
  semester    String
  title       String
  pdfUrl      String?
  duration    Int      @default(60)
  totalMarks  Int      @default(100)
  questions   PastExamQuestion[]
}

// المدارس
model School {
  id          String   @id @default(uuid())
  name        String
  nameEn      String?
  city        String
  address     String?
  phone       String?
  email       String?
  logo        String?
  isActive    Boolean  @default(true)
}

// الإنجازات والنقاط (Gamification)
model UserStats {
  id              String   @id @default(uuid())
  userId          String   @unique
  totalPoints     Int      @default(0)
  level           Int      @default(1)
  streak          Int      @default(0)
  lessonsCompleted Int    @default(0)
  quizzesPassed   Int      @default(0)
  rank            String   @default("مبتدئ")
}

model Achievement {
  id          String   @id @default(uuid())
  key         String   @unique
  name        String
  description String
  icon        String   // emoji
  color       String
  points      Int
  category    String   // learning, social, special
}

model UserAchievement {
  id             String   @id @default(uuid())
  userId         String
  achievementId  String
  earnedAt       DateTime @default(now())
}

// التواصل
model DirectMessage {
  id           String   @id @default(uuid())
  senderId     String
  receiverId   String
  content      String
  attachments  String?  // JSON
  isRead       Boolean  @default(false)
}

model GroupChannel {
  id            String   @id @default(uuid())
  name          String
  type          String   // class, unit, general
  engineerId    String?
  members       String   @default("[]") // JSON array
}

model Notification {
  id          String   @id @default(uuid())
  userId      String
  type        String   // message, grade, announcement, assignment
  title       String
  content     String
  link        String?
  isRead      Boolean  @default(false)
}

// الواجبات
model Assignment {
  id          String   @id @default(uuid())
  title       String
  description String
  unitId      String?
  dueDate     DateTime?
  createdBy   String
}

model AssignmentSubmission {
  id           String   @id @default(uuid())
  assignmentId String
  studentId    String
  content      String?
  attachments  String
  grade        Int?
  feedback     String?
  status       String   @default("submitted")
}
```

---

## 2. منطق الواجهة الخلفية (Backend Logic & APIs)

### 2.1 نقاط النهاية (30 Endpoints)

| # | Endpoint | Method | الوصف |
|---|----------|--------|-------|
| 1 | `/api/content` | GET, POST, PUT, DELETE | إدارة المحتوى التعليمي |
| 2 | `/api/units` | GET | جلب الوحدات التعليمية |
| 3 | `/api/labs` | GET, POST | أسئلة المختبر |
| 4 | `/api/lab-results` | GET, POST | نتائج المختبر |
| 5 | `/api/quizzes` | GET, POST | الاختبارات |
| 6 | `/api/questions` | GET, POST | بنك الأسئلة |
| 7 | `/api/exams` | GET, POST | الامتحانات التوجيهية |
| 8 | `/api/user-profile` | GET, PUT | ملف المستخدم |
| 9 | `/api/user-stats` | GET, PUT | إحصائيات المستخدم |
| 10 | `/api/achievements` | GET, POST | الإنجازات |
| 11 | `/api/leaderboard` | GET | لوحة المتصدرين |
| 12 | `/api/schools` | GET, POST | المدارس |
| 13 | `/api/engineers` | GET | المهندسين |
| 14 | `/api/messages` | GET, POST | الرسائل المباشرة |
| 15 | `/api/channels` | GET, POST | القنوات |
| 16 | `/api/notifications` | GET, POST, PUT | الإشعارات |
| 17 | `/api/announcements` | GET, POST | الإعلانات |
| 18 | `/api/assignments` | GET, POST | الواجبات |
| 19 | `/api/upload` | POST | رفع الملفات |
| 20 | `/api/download` | GET | تحميل الملفات |
| 21 | `/api/files` | GET, DELETE | إدارة الملفات |
| 22 | `/api/videos` | GET | الفيديوهات |
| 23 | `/api/ai-assistant` | GET, POST | المساعد الذكي النظري |
| 24 | `/api/practical-ai` | POST | المساعد الذكي العملي |
| 25 | `/api/ai-grade` | POST | التصحيح الآلي |
| 26 | `/api/chat` | GET, POST | رسائل الشات |

### 2.2 أمثلة على كود API

#### API تتبع وقت الدراسة:
```typescript
// src/app/api/study-time/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { userId, unitId, duration, contentType } = await request.json();
    
    // حفظ وقت الدراسة
    const studySession = await db.studySession.create({
      data: {
        userId,
        unitId,
        duration, // بالثواني
        contentType, // VIDEO, TEXT, QUIZ
        completedAt: new Date(),
      },
    });
    
    // تحديث إحصائيات المستخدم
    await db.userStats.update({
      where: { userId },
      data: {
        totalStudyTime: { increment: duration },
        lastActivity: new Date(),
      },
    });
    
    return NextResponse.json({ success: true, session: studySession });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const unitId = searchParams.get('unitId');
  
  const sessions = await db.studySession.findMany({
    where: { userId, ...(unitId && { unitId }) },
    orderBy: { completedAt: 'desc' },
  });
  
  const totalTime = sessions.reduce((sum, s) => sum + s.duration, 0);
  
  return NextResponse.json({ sessions, totalTime });
}
```

#### API حفظ المفضلات:
```typescript
// src/app/api/favorites/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const { userId, contentId, type } = await request.json();
  
  const favorite = await db.favorite.upsert({
    where: { userId_contentId: { userId, contentId } },
    update: {},
    create: { userId, contentId, type },
  });
  
  return NextResponse.json({ success: true, favorite });
}

export async function DELETE(request: NextRequest) {
  const { userId, contentId } = await request.json();
  
  await db.favorite.delete({
    where: { userId_contentId: { userId, contentId } },
  });
  
  return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  
  const favorites = await db.favorite.findMany({
    where: { userId },
    include: { content: true },
  });
  
  return NextResponse.json({ favorites });
}
```

#### API تقارير الطلاب للمهندسين:
```typescript
// src/app/api/reports/students/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const engineerId = searchParams.get('engineerId');
  const schoolId = searchParams.get('schoolId');
  
  // جلب طلاب المهندس
  const students = await db.userProfile.findMany({
    where: { 
      engineerId,
      schoolId,
      role: 'student',
    },
    include: {
      stats: true,
      quizResults: true,
      labResults: true,
    },
  });
  
  // حساب الإحصائيات
  const report = students.map(student => ({
    id: student.userId,
    name: student.name,
    totalPoints: student.stats?.totalPoints || 0,
    level: student.stats?.level || 1,
    quizzesCompleted: student.quizResults?.length || 0,
    avgQuizScore: student.quizResults?.length 
      ? student.quizResults.reduce((sum, q) => sum + q.percentage, 0) / student.quizResults.length 
      : 0,
    labsCompleted: student.labResults?.length || 0,
    avgLabScore: student.labResults?.length
      ? student.labResults.reduce((sum, l) => sum + l.score, 0) / student.labResults.length
      : 0,
    streak: student.stats?.streak || 0,
    lastActivity: student.stats?.lastActivity,
  }));
  
  // ترتيب حسب النقاط
  report.sort((a, b) => b.totalPoints - a.totalPoints);
  
  return NextResponse.json({ students: report });
}
```

#### API توليد شهادات الإنجاز:
```typescript
// src/app/api/certificates/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
  const { userId, unitId } = await request.json();
  
  // التحقق من إكمال الوحدة
  const results = await db.labResult.findMany({
    where: { userId, unitId },
  });
  
  const quizzes = await db.quizResult.findMany({
    where: { userId, quiz: { unitId } },
  });
  
  // حساب النتيجة الإجمالية
  const avgLabScore = results.length 
    ? results.reduce((sum, r) => sum + r.score, 0) / results.length 
    : 0;
  
  const avgQuizScore = quizzes.length
    ? quizzes.reduce((sum, q) => sum + q.percentage, 0) / quizzes.length
    : 0;
  
  const overallScore = (avgLabScore + avgQuizScore) / 2;
  
  if (overallScore < 60) {
    return NextResponse.json({ 
      error: 'النتيجة غير كافية للحصول على الشهادة' 
    }, { status: 400 });
  }
  
  // إنشاء الشهادة
  const certificate = await db.certificate.create({
    data: {
      userId,
      unitId,
      score: overallScore,
      issuedAt: new Date(),
      certificateId: `CERT-${Date.now()}-${userId.slice(0, 8)}`,
    },
  });
  
  return NextResponse.json({ 
    success: true, 
    certificate,
    downloadUrl: `/api/certificates/${certificate.id}/download`,
  });
}
```

---

## 3. هندسة المحاكيات (Simulator Engineering)

### 3.1 محاكي CCTV

```typescript
// src/components/simulators/CCTVSimulator.tsx
'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface CameraConfig {
  id: string;
  name: string;
  ip: string;
  port: number;
  protocol: 'RTSP' | 'ONVIF' | 'HTTP';
  resolution: '720p' | '1080p' | '4K';
  fps: number;
  recording: boolean;
}

export function CCTVSimulator() {
  const [cameras, setCameras] = useState<CameraConfig[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<CameraConfig | null>(null);
  const [dvrConfig, setDvrConfig] = useState({
    channels: 8,
    storage: 2000, // GB
    recordingMode: 'continuous',
    retentionDays: 30,
  });
  
  // محاكاة إضافة كاميرا
  const addCamera = useCallback(() => {
    const newCamera: CameraConfig = {
      id: `cam-${Date.now()}`,
      name: `كاميرا ${cameras.length + 1}`,
      ip: `192.168.1.${100 + cameras.length}`,
      port: 554,
      protocol: 'RTSP',
      resolution: '1080p',
      fps: 25,
      recording: false,
    };
    setCameras(prev => [...prev, newCamera]);
  }, [cameras.length]);
  
  // حساب التخزين المطلوب
  const calculateStorage = useCallback(() => {
    // معادلة حساب التخزين
    // Storage (GB) = (Bitrate Mbps × 3600 × 24 × Days) / (8 × 1024)
    const avgBitrate = 4; // Mbps لكل كاميرا 1080p
    
    const totalBitrate = cameras.reduce((sum, cam) => {
      const resMultiplier = cam.resolution === '4K' ? 4 : cam.resolution === '1080p' ? 2 : 1;
      return sum + (avgBitrate * resMultiplier);
    }, 0);
    
    const dailyStorage = (totalBitrate * 3600 * 24) / (8 * 1024);
    const totalStorage = dailyStorage * dvrConfig.retentionDays;
    
    return {
      daily: dailyStorage.toFixed(2),
      total: totalStorage.toFixed(2),
      required: totalStorage > dvrConfig.storage,
    };
  }, [cameras, dvrConfig]);
  
  // محاكاة توصيل الكاميرا
  const connectCamera = useCallback((cameraId: string) => {
    // محاكاة عملية الاتصال
    const steps = [
      { step: 1, message: 'جاري البحث عن الكاميرا...', delay: 500 },
      { step: 2, message: 'تم العثور على الكاميرا', delay: 1000 },
      { step: 3, message: 'جاري الاتصال بالبروتوكول...', delay: 1500 },
      { step: 4, message: 'تم الاتصال بنجاح!', delay: 2000 },
    ];
    
    // تنفيذ الخطوات
    return new Promise((resolve) => {
      steps.forEach(({ message, delay }) => {
        setTimeout(() => console.log(message), delay);
      });
      setTimeout(() => resolve(true), 2500);
    });
  }, []);
  
  // حفظ نتيجة المحاكاة
  const saveSimulationResult = useCallback(async (result: {
    camerasConfigured: number;
    storageCalculated: number;
    errors: string[];
  }) => {
    const response = await fetch('/api/simulation-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'current-user',
        simulatorType: 'CCTV',
        result,
        completedAt: new Date(),
      }),
    });
    return response.json();
  }, []);
  
  return (
    <div className="space-y-6">
      {/* واجهة المحاكي */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* لوحة إضافة الكاميرات */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-bold mb-4">إضافة كاميرات</h3>
          <button onClick={addCamera} className="btn-primary">
            إضافة كاميرا جديدة
          </button>
          
          <div className="mt-4 space-y-2">
            {cameras.map(cam => (
              <div key={cam.id} className="p-3 bg-secondary rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-medium">{cam.name}</p>
                  <p className="text-sm text-muted-foreground">{cam.ip}:{cam.port}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${cam.recording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
                  <button onClick={() => setSelectedCamera(cam)} className="text-primary">
                    إعدادات
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* لوحة حساب التخزين */}
        <div className="bg-card rounded-xl p-4 border border-border">
          <h3 className="font-bold mb-4">حساب التخزين</h3>
          <div className="space-y-4">
            <div>
              <label>عدد القنوات</label>
              <input 
                type="number" 
                value={dvrConfig.channels}
                onChange={(e) => setDvrConfig(prev => ({ ...prev, channels: +e.target.value }))}
                className="input-field"
              />
            </div>
            <div>
              <label>مدة الحفظ (أيام)</label>
              <input 
                type="number" 
                value={dvrConfig.retentionDays}
                onChange={(e) => setDvrConfig(prev => ({ ...prev, retentionDays: +e.target.value }))}
                className="input-field"
              />
            </div>
            
            {cameras.length > 0 && (
              <div className="p-4 bg-secondary rounded-lg">
                <p>التخزين اليومي: {calculateStorage().daily} GB</p>
                <p>التخزين الكلي: {calculateStorage().total} GB</p>
                {calculateStorage().required && (
                  <p className="text-red-500">⚠️ التخزين غير كافٍ!</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 3.2 محاكي إنذار الحريق

```typescript
// src/components/simulators/FireAlarmSimulator.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';

type DetectorType = 'SMOKE' | 'HEAT' | 'MANUAL' | 'BEAM';
type ZoneStatus = 'normal' | 'alarm' | 'fault' | 'disabled';

interface Zone {
  id: string;
  name: string;
  detectors: Detector[];
  status: ZoneStatus;
}

interface Detector {
  id: string;
  type: DetectorType;
  location: string;
  status: 'normal' | 'alarm' | 'fault';
}

export function FireAlarmSimulator() {
  const [zones, setZones] = useState<Zone[]>([]);
  const [panelStatus, setPanelStatus] = useState({
    power: 'normal',
    battery: 'normal',
    faults: [],
    activeAlarms: 0,
  });
  
  // إضافة منطقة جديدة
  const addZone = useCallback((name: string) => {
    const newZone: Zone = {
      id: `zone-${Date.now()}`,
      name,
      detectors: [],
      status: 'normal',
    };
    setZones(prev => [...prev, newZone]);
  }, []);
  
  // إضافة كاشف للمنطقة
  const addDetector = useCallback((zoneId: string, type: DetectorType, location: string) => {
    const newDetector: Detector = {
      id: `det-${Date.now()}`,
      type,
      location,
      status: 'normal',
    };
    
    setZones(prev => prev.map(zone => 
      zone.id === zoneId 
        ? { ...zone, detectors: [...zone.detectors, newDetector] }
        : zone
    ));
  }, []);
  
  // محاكاة حالة إنذار
  const simulateAlarm = useCallback((zoneId: string, detectorId: string) => {
    // تحديث حالة الكاشف
    setZones(prev => prev.map(zone => {
      if (zone.id === zoneId) {
        const updatedDetectors = zone.detectors.map(det => 
          det.id === detectorId ? { ...det, status: 'alarm' as const } : det
        );
        return { 
          ...zone, 
          detectors: updatedDetectors,
          status: 'alarm' as const,
        };
      }
      return zone;
    }));
    
    // تحديث لوحة التحكم
    setPanelStatus(prev => ({
      ...prev,
      activeAlarms: prev.activeAlarms + 1,
    }));
    
    // حفظ نتيجة المحاكاة
    saveSimulationAction('alarm_triggered', {
      zoneId,
      detectorId,
      timestamp: new Date(),
    });
  }, []);
  
  // محاكاة EOL (End of Line Resistor)
  const testEOL = useCallback((zoneId: string) => {
    const zone = zones.find(z => z.id === zoneId);
    if (!zone) return;
    
    // فحص مقاومة EOL
    const eolResistance = 4.7; // kΩ
    const measuredResistance = 4.5 + Math.random() * 0.4; // محاكاة قياس
    
    const isWithinTolerance = Math.abs(measuredResistance - eolResistance) < 0.5;
    
    return {
      expected: eolResistance,
      measured: measuredResistance.toFixed(2),
      status: isWithinTolerance ? 'normal' : 'fault',
      message: isWithinTolerance 
        ? 'مقاومة EOL ضمن الحدود المقبولة' 
        : 'تحذير: مقاومة EOL خارج الحدود!',
    };
  }, [zones]);
  
  // إعادة تعيين الإنذار
  const resetAlarm = useCallback((zoneId: string) => {
    setZones(prev => prev.map(zone => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          status: 'normal',
          detectors: zone.detectors.map(d => ({ ...d, status: 'normal' as const })),
        };
      }
      return zone;
    }));
    
    setPanelStatus(prev => ({
      ...prev,
      activeAlarms: Math.max(0, prev.activeAlarms - 1),
    }));
  }, []);
  
  // حفظ إجراء المحاكاة
  const saveSimulationAction = async (actionType: string, data: object) => {
    await fetch('/api/simulation-actions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: 'current-user',
        simulatorType: 'FIRE_ALARM',
        actionType,
        data,
      }),
    });
  };
  
  return (
    <div className="space-y-6">
      {/* لوحة التحكم */}
      <div className={`p-4 rounded-xl ${panelStatus.activeAlarms > 0 ? 'bg-red-500/20 border-red-500' : 'bg-green-500/20 border-green-500'} border`}>
        <div className="flex items-center justify-between">
          <h3 className="font-bold">لوحة التحكم FACP</h3>
          <div className="flex items-center gap-4">
            <span className={`w-3 h-3 rounded-full ${panelStatus.power === 'normal' ? 'bg-green-500' : 'bg-red-500'}`} />
            <span>الطاقة: {panelStatus.power}</span>
            <span className={`w-3 h-3 rounded-full ${panelStatus.battery === 'normal' ? 'bg-green-500' : 'bg-yellow-500'}`} />
            <span>البطارية: {panelStatus.battery}</span>
            {panelStatus.activeAlarms > 0 && (
              <span className="text-red-500 animate-pulse">
                ⚠️ {panelStatus.activeAlarms} إنذار نشط!
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* المناطق */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map(zone => (
          <div 
            key={zone.id} 
            className={`p-4 rounded-xl border ${
              zone.status === 'alarm' ? 'border-red-500 bg-red-500/10' :
              zone.status === 'fault' ? 'border-yellow-500 bg-yellow-500/10' :
              'border-border bg-card'
            }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-bold">{zone.name}</h4>
              <span className={`px-2 py-1 rounded text-xs ${
                zone.status === 'alarm' ? 'bg-red-500 text-white' :
                zone.status === 'fault' ? 'bg-yellow-500 text-black' :
                'bg-green-500/20 text-green-400'
              }`}>
                {zone.status === 'alarm' ? 'إنذار' : zone.status === 'fault' ? 'عطل' : 'عادي'}
              </span>
            </div>
            
            <div className="space-y-2">
              {zone.detectors.map(det => (
                <div key={det.id} className="flex justify-between items-center text-sm">
                  <span>{det.location}</span>
                  <span className={det.status === 'alarm' ? 'text-red-500' : 'text-green-500'}>
                    {det.type === 'SMOKE' ? '💨' : det.type === 'HEAT' ? '🌡️' : det.type === 'MANUAL' ? '🔴' : '📡'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 flex gap-2">
              <button 
                onClick={() => simulateAlarm(zone.id, zone.detectors[0]?.id)}
                className="btn-danger text-xs"
              >
                محاكاة إنذار
              </button>
              <button 
                onClick={() => resetAlarm(zone.id)}
                className="btn-secondary text-xs"
              >
                إعادة تعيين
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 3.3 محاكي التحكم بالدخول

```typescript
// src/components/simulators/AccessControlSimulator.tsx
'use client';

import { useState, useCallback } from 'react';

type AccessLevel = 'PUBLIC' | 'RESTRICTED' | 'CONFIDENTIAL' | 'TOP_SECRET';
type DeviceType = 'CARD_READER' | 'BIOMETRIC' | 'KEYPAD' | 'MIXED';

interface AccessCard {
  id: string;
  cardNumber: string;
  holderName: string;
  accessLevel: AccessLevel;
  validFrom: Date;
  validUntil: Date;
  zones: string[];
  isActive: boolean;
}

interface AccessPoint {
  id: string;
  name: string;
  deviceType: DeviceType;
  requiredLevel: AccessLevel;
  status: 'locked' | 'unlocked' | 'alarm';
  lastAccess: Date | null;
}

export function AccessControlSimulator() {
  const [cards, setCards] = useState<AccessCard[]>([]);
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([]);
  const [accessLog, setAccessLog] = useState<Array<{
    timestamp: Date;
    cardId: string;
    accessPointId: string;
    granted: boolean;
    reason: string;
  }>>([]);
  
  // إنشاء بطاقة جديدة
  const createCard = useCallback((holderName: string, accessLevel: AccessLevel, zones: string[]) => {
    const newCard: AccessCard = {
      id: `card-${Date.now()}`,
      cardNumber: Math.random().toString(16).substr(2, 8).toUpperCase(),
      holderName,
      accessLevel,
      validFrom: new Date(),
      validUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // سنة
      zones,
      isActive: true,
    };
    setCards(prev => [...prev, newCard]);
    return newCard;
  }, []);
  
  // محاكاة محاولة دخول
  const simulateAccessAttempt = useCallback((cardId: string, accessPointId: string) => {
    const card = cards.find(c => c.id === cardId);
    const accessPoint = accessPoints.find(ap => ap.id === accessPointId);
    
    if (!card || !accessPoint) {
      return { granted: false, reason: 'بيانات غير صحيحة' };
    }
    
    let granted = false;
    let reason = '';
    
    // فحص صلاحية البطاقة
    if (!card.isActive) {
      reason = 'البطاقة غير نشطة';
    } else if (new Date() > card.validUntil) {
      reason = 'البطاقة منتهية الصلاحية';
    } else if (new Date() < card.validFrom) {
      reason = 'البطاقة لم تبدأ صلاحيتها بعد';
    }
    // فحص مستوى الوصول
    else if (!card.zones.includes(accessPointId)) {
      reason = 'لا توجد صلاحية لهذه المنطقة';
    } else {
      // فحص المستوى المطلوب
      const levelOrder = ['PUBLIC', 'RESTRICTED', 'CONFIDENTIAL', 'TOP_SECRET'];
      const cardLevelIndex = levelOrder.indexOf(card.accessLevel);
      const requiredLevelIndex = levelOrder.indexOf(accessPoint.requiredLevel);
      
      if (cardLevelIndex < requiredLevelIndex) {
        reason = 'مستوى الوصول غير كافٍ';
      } else {
        granted = true;
        reason = 'تم السماح بالدخول';
        
        // تحديث حالة نقطة الدخول
        setAccessPoints(prev => prev.map(ap => 
          ap.id === accessPointId 
            ? { ...ap, status: 'unlocked' as const, lastAccess: new Date() }
            : ap
        ));
        
        // إغلاق تلقائي بعد 5 ثوان
        setTimeout(() => {
          setAccessPoints(prev => prev.map(ap => 
            ap.id === accessPointId 
              ? { ...ap, status: 'locked' as const }
              : ap
          ));
        }, 5000);
      }
    }
    
    // تسجيل المحاولة
    const logEntry = {
      timestamp: new Date(),
      cardId,
      accessPointId,
      granted,
      reason,
    };
    setAccessLog(prev => [logEntry, ...prev].slice(0, 100));
    
    // حفظ في قاعدة البيانات
    saveAccessLog(logEntry);
    
    return { granted, reason };
  }, [cards, accessPoints]);
  
  // حفظ سجل الوصول
  const saveAccessLog = async (logEntry: typeof accessLog[0]) => {
    await fetch('/api/access-logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...logEntry,
        userId: 'current-user',
      }),
    });
  };
  
  return (
    <div className="space-y-6">
      {/* نقاط الوصول */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accessPoints.map(ap => (
          <div 
            key={ap.id} 
            className={`p-4 rounded-xl border ${
              ap.status === 'unlocked' ? 'border-green-500 bg-green-500/10' :
              ap.status === 'alarm' ? 'border-red-500 bg-red-500/10' :
              'border-border bg-card'
            }`}
          >
            <div className="flex justify-between items-center">
              <h4>{ap.name}</h4>
              <span className={`w-4 h-4 rounded-full ${
                ap.status === 'unlocked' ? 'bg-green-500' :
                ap.status === 'alarm' ? 'bg-red-500 animate-pulse' :
                'bg-red-500'
              }`} />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              الجهاز: {ap.deviceType} | المستوى: {ap.requiredLevel}
            </p>
            {ap.lastAccess && (
              <p className="text-xs text-muted-foreground mt-1">
                آخر دخول: {ap.lastAccess.toLocaleString('ar')}
              </p>
            )}
          </div>
        ))}
      </div>
      
      {/* سجل الوصول */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h3 className="font-bold mb-4">سجل الوصول</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {accessLog.map((log, i) => (
            <div key={i} className={`p-2 rounded ${log.granted ? 'bg-green-500/10' : 'bg-red-500/10'}`}>
              <span className="text-xs text-muted-foreground">
                {log.timestamp.toLocaleString('ar')}
              </span>
              <span className={`mx-2 ${log.granted ? 'text-green-500' : 'text-red-500'}`}>
                {log.granted ? '✅' : '❌'}
              </span>
              <span>{log.reason}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 4. تجربة المستخدم والواجهات (UI/UX)

### 4.1 لوحة تحكم الطالب

```tsx
// src/components/StudentDashboard.tsx
'use client';

import { motion } from 'framer-motion';
import { Video, Flame, ShieldAlert, Key, Phone, Trophy, Clock, TrendingUp } from 'lucide-react';

export function StudentDashboard() {
  const userStats = {
    totalPoints: 1250,
    level: 5,
    rank: 'خبير',
    streak: 7,
    completedLessons: 18,
    totalLessons: 24,
  };

  const units = [
    { id: 'unit-1', name: 'كاميرات المراقبة', progress: 85, icon: Video, color: 'from-blue-500 to-cyan-500' },
    { id: 'unit-2', name: 'إنذار الحريق', progress: 60, icon: Flame, color: 'from-red-500 to-orange-500' },
    { id: 'unit-3', name: 'إنذار السرقة', progress: 40, icon: ShieldAlert, color: 'from-yellow-500 to-amber-500' },
    { id: 'unit-4', name: 'التحكم بالدخول', progress: 25, icon: Key, color: 'from-green-500 to-emerald-500' },
    { id: 'unit-5', name: 'المقاسم الهاتفية', progress: 10, icon: Phone, color: 'from-purple-500 to-violet-500' },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header Stats */}
      <div className="bg-gradient-to-l from-blue-600 to-cyan-600 p-6 rounded-b-3xl">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">مرحباً، الطالب! 👋</h1>
              <p className="text-white/80">استمر في التعلم والتفوق</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-300" />
                  <span className="text-white font-bold">{userStats.totalPoints} نقطة</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-xl px-4 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-white font-bold">{userStats.streak} يوم</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6 bg-white/20 rounded-full h-3 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${(userStats.completedLessons / userStats.totalLessons) * 100}%` }}
              className="h-full bg-white rounded-full"
            />
          </div>
          <p className="text-white/80 text-sm mt-2">
            أكملت {userStats.completedLessons} من {userStats.totalLessons} درس
          </p>
        </div>
      </div>

      {/* Units Grid */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4">الوحدات التعليمية</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit, index) => {
            const Icon = unit.icon;
            return (
              <motion.div
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className={`bg-gradient-to-l ${unit.color} p-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{unit.name}</h3>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-muted-foreground mb-1">
                      <span>التقدم</span>
                      <span>{unit.progress}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${unit.progress}%` }}
                        className={`h-full bg-gradient-to-l ${unit.color}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
```

### 4.2 لوحة تقارير المهندس

```tsx
// src/components/TeacherReportsPage.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Trophy, Clock, TrendingUp, FileText, Download } from 'lucide-react';

interface StudentReport {
  id: string;
  name: string;
  totalPoints: number;
  level: number;
  quizzesCompleted: number;
  avgQuizScore: number;
  labsCompleted: number;
  avgLabScore: number;
  streak: number;
  lastActivity: string;
}

export function TeacherReportsPage() {
  const [students, setStudents] = useState<StudentReport[]>([]);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'points' | 'quizzes' | 'labs'>('points');

  useEffect(() => {
    fetch('/api/reports/students?engineerId=current')
      .then(res => res.json())
      .then(data => setStudents(data.students));
  }, []);

  const sortedStudents = [...students].sort((a, b) => {
    if (sortBy === 'points') return b.totalPoints - a.totalPoints;
    if (sortBy === 'quizzes') return b.avgQuizScore - a.avgQuizScore;
    return b.avgLabScore - a.avgLabScore;
  });

  const exportReport = () => {
    // تصدير إلى CSV
    const headers = ['الاسم', 'النقاط', 'المستوى', 'الاختبارات', 'متوسط الاختبارات', 'المختبر', 'متوسط المختبر'];
    const rows = students.map(s => [s.name, s.totalPoints, s.level, s.quizzesCompleted, s.avgQuizScore, s.labsCompleted, s.avgLabScore]);
    
    const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `تقرير-الطلاب-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">تقارير الطلاب</h1>
            <p className="text-muted-foreground">متابعة أداء طلابك</p>
          </div>
          <button onClick={exportReport} className="btn-primary flex items-center gap-2">
            <Download className="w-4 h-4" />
            تصدير التقرير
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">عدد الطلاب</p>
                <p className="text-2xl font-bold">{students.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">متوسط النقاط</p>
                <p className="text-2xl font-bold">
                  {students.length ? Math.round(students.reduce((sum, s) => sum + s.totalPoints, 0) / students.length) : 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">متوسط الاختبارات</p>
                <p className="text-2xl font-bold">
                  {students.length ? Math.round(students.reduce((sum, s) => sum + s.avgQuizScore, 0) / students.length) : 0}%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl p-4 border border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">نشط اليوم</p>
                <p className="text-2xl font-bold">
                  {students.filter(s => new Date(s.lastActivity) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex gap-2">
              <button 
                onClick={() => setSortBy('points')}
                className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'points' ? 'bg-primary text-white' : 'bg-secondary'}`}
              >
                ترتيب حسب النقاط
              </button>
              <button 
                onClick={() => setSortBy('quizzes')}
                className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'quizzes' ? 'bg-primary text-white' : 'bg-secondary'}`}
              >
                ترتيب حسب الاختبارات
              </button>
              <button 
                onClick={() => setSortBy('labs')}
                className={`px-3 py-1 rounded-lg text-sm ${sortBy === 'labs' ? 'bg-primary text-white' : 'bg-secondary'}`}
              >
                ترتيب حسب المختبر
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-right p-4">#</th>
                  <th className="text-right p-4">الاسم</th>
                  <th className="text-right p-4">النقاط</th>
                  <th className="text-right p-4">المستوى</th>
                  <th className="text-right p-4">الاختبارات</th>
                  <th className="text-right p-4">المختبر</th>
                  <th className="text-right p-4">النشاط الأخير</th>
                </tr>
              </thead>
              <tbody>
                {sortedStudents.map((student, index) => (
                  <motion.tr 
                    key={student.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border hover:bg-secondary/50"
                  >
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4">
                      <span className="text-yellow-500 font-bold">{student.totalPoints}</span>
                    </td>
                    <td className="p-4">المستوى {student.level}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <span>{student.quizzesCompleted} اختبار</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          student.avgQuizScore >= 80 ? 'bg-green-500/20 text-green-400' :
                          student.avgQuizScore >= 60 ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {student.avgQuizScore}%
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span>{student.labsCompleted} تمرين</span>
                    </td>
                    <td className="p-4 text-muted-foreground text-sm">
                      {new Date(student.lastActivity).toLocaleDateString('ar')}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 4.3 الوضع الداكن و RTL

```css
/* src/app/globals.css - التكوين الأساسي */

@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700&display=swap');

:root {
  /* الألوان الأساسية - الوضع الفاتح */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --border: 214.3 31.8% 91.4%;
}

.dark {
  /* الوضع الداكن */
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --card: 222.2 84% 4.9%;
  --card-foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  --primary-foreground: 222.2 47.4% 11.2%;
  --secondary: 217.2 32.6% 17.5%;
  --muted: 217.2 32.6% 17.5%;
  --muted-foreground: 215 20.2% 65.1%;
  --border: 217.2 32.6% 17.5%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Cairo', sans-serif;
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}

/* RTL Support */
[dir="rtl"] {
  text-align: right;
}

[dir="rtl"] .ml-2 { margin-right: 0.5rem; margin-left: 0; }
[dir="rtl"] .mr-2 { margin-left: 0.5rem; margin-right: 0; }
[dir="rtl"] .pl-4 { padding-right: 1rem; padding-left: 0; }
[dir="rtl"] .pr-4 { padding-left: 1rem; padding-right: 0; }

/* Dark Mode Transitions */
* {
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--secondary));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--muted-foreground));
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--foreground) / 0.5);
}
```

---

## 5. ميزات الذكاء الاصطناعي (AI Integration)

### 5.1 ربط RAG مع ملفات PDF

```typescript
// src/lib/rag-service.ts
import { createClient } from '@/lib/supabase/server';

interface DocumentChunk {
  id: string;
  content: string;
  embedding?: number[];
  metadata: {
    source: string;
    page: number;
    unitId: string;
  };
}

// تقسيم النص إلى أجزاء
export function splitTextIntoChunks(text: string, chunkSize = 1000, overlap = 200): string[] {
  const chunks: string[] = [];
  let start = 0;
  
  while (start < text.length) {
    const end = start + chunkSize;
    const chunk = text.slice(start, end);
    
    // محاولة إنهاء عند جملة كاملة
    const lastPeriod = chunk.lastIndexOf('۔');
    const lastQuestion = chunk.lastIndexOf('؟');
    const lastNewline = chunk.lastIndexOf('\n');
    
    const breakPoint = Math.max(lastPeriod, lastQuestion, lastNewline);
    
    if (breakPoint > chunkSize * 0.5) {
      chunks.push(chunk.slice(0, breakPoint + 1));
      start = start + breakPoint + 1 - overlap;
    } else {
      chunks.push(chunk);
      start = end - overlap;
    }
  }
  
  return chunks;
}

// إنشاء الـ Embeddings
export async function createEmbedding(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-small',
    }),
  });
  
  const data = await response.json();
  return data.data[0].embedding;
}

// البحث في الـ Embeddings
export async function searchSimilarChunks(query: string, topK = 5): Promise<DocumentChunk[]> {
  const queryEmbedding = await createEmbedding(query);
  
  const supabase = createClient();
  
  // البحث باستخدام pgvector
  const { data, error } = await supabase.rpc('match_documents', {
    query_embedding: queryEmbedding,
    match_threshold: 0.7,
    match_count: topK,
  });
  
  if (error) {
    console.error('Error searching chunks:', error);
    return [];
  }
  
  return data;
}

// RAG Response Generation
export async function generateRAGResponse(
  query: string,
  context: DocumentChunk[]
): Promise<string> {
  // بناء السياق من الأجزاء المسترجعة
  const contextText = context
    .map((chunk, i) => `[${i + 1}] ${chunk.content}`)
    .join('\n\n');
  
  const systemPrompt = `أنت مساعد ذكي متخصص في تكنولوجيا المباني الذكية.
استخدم المعلومات التالية من الكتاب الدراسي للإجابة على سؤال الطالب.
إذا لم تجد الإجابة في السياق، أخبر الطالب بذلك.

السياق من الكتاب:
${contextText}

تعليمات:
- أجب باللغة العربية
- كن دقيقاً وموجزاً
- استخدم الأمثلة العملية
- إذا كان السؤال يتعلق بتركيب أو صيانة، اذكر خطوات السلامة`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: query },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    }),
  });
  
  const data = await response.json();
  return data.choices[0].message.content;
}

// API Endpoint
// src/app/api/ai-assistant/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { searchSimilarChunks, generateRAGResponse } from '@/lib/rag-service';

export async function POST(request: NextRequest) {
  try {
    const { message, unitId } = await request.json();
    
    // البحث في قاعدة المعرفة
    const relevantChunks = await searchSimilarChunks(message, 5);
    
    // توليد الرد باستخدام RAG
    const response = await generateRAGResponse(message, relevantChunks);
    
    // حفظ المحادثة
    await saveConversation(message, response);
    
    return NextResponse.json({ response, sources: relevantChunks });
  } catch (error) {
    return NextResponse.json({ error: 'حدث خطأ' }, { status: 500 });
  }
}
```

### 5.2 معالجة ملفات PDF

```typescript
// src/lib/pdf-processor.ts
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { createClient } from '@/lib/supabase/server';
import { createEmbedding, splitTextIntoChunks } from './rag-service';

export async function processPDFDocument(
  fileUrl: string,
  metadata: { source: string; unitId: string }
) {
  // تحميل PDF
  const loader = new PDFLoader(fileUrl);
  const docs = await loader.load();
  
  // استخراج النص
  const fullText = docs.map(doc => doc.pageContent).join('\n');
  
  // تقسيم النص
  const chunks = splitTextIntoChunks(fullText);
  
  // حفظ في قاعدة البيانات
  const supabase = createClient();
  
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    const embedding = await createEmbedding(chunk);
    
    await supabase.from('document_chunks').insert({
      content: chunk,
      embedding,
      metadata: {
        ...metadata,
        page: Math.floor(i / 3) + 1, // تقدير الصفحة
        chunkIndex: i,
      },
    });
  }
  
  return { success: true, chunksCount: chunks.length };
}

// SQL for pgvector table
/*
CREATE TABLE document_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  embedding VECTOR(1536),
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX ON document_chunks USING ivfflat (embedding vector_cosine_ops);
*/
```

---

## 6. سكريبتات التشغيل (Setup Scripts)

### 6.1 سكريبت seed.ts كامل

```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إضافة البيانات...');

  // === المدارس الصناعية الفلسطينية (28 مدرسة) ===
  const schools = [
    // محافظة جنين
    { id: 'school-jenin-1', name: 'مدرسة جنين الثانوية الصناعية', nameEn: 'Jenin Industrial Secondary School', city: 'جنين', address: 'سيلة الظهر - الشارع العام', phone: '04-2501234', email: 'jenin@mehani.ps' },
    { id: 'school-jenin-2', name: 'مدرسة سيلة الظهر الثانوية الصناعية', nameEn: 'Seilet Al-Thahr Industrial Secondary School', city: 'جنين', address: 'سيلة الظهر', phone: '04-2512345', email: 'sila@mehani.ps' },
    { id: 'school-jenin-3', name: 'مدرسة قباطية الثانوية الصناعية', nameEn: 'Qabatiya Industrial Secondary School', city: 'جنين', address: 'بلدة قباطية', phone: '04-2521234', email: 'qabatiya@mehani.ps' },
    { id: 'school-jenin-4', name: 'مدرسة يعبد الثانوية الصناعية', nameEn: "Ya'bad Industrial Secondary School", city: 'جنين', address: 'بلدة يعبد', phone: '04-2531234', email: 'yabad@mehani.ps' },
    
    // محافظة طوباس
    { id: 'school-tubas-1', name: 'مدرسة طوباس الثانوية الصناعية', nameEn: 'Tubas Industrial Secondary School', city: 'طوباس', address: 'مدينة طوباس', phone: '09-2595678', email: 'tubas@mehani.ps' },
    { id: 'school-tubas-2', name: 'مدرسة طمون الثانوية الصناعية', nameEn: 'Tammoun Industrial Secondary School', city: 'طوباس', address: 'بلدة طمون', phone: '09-2592345', email: 'tammon@mehani.ps' },
    
    // محافظة طولكرم
    { id: 'school-tulkarem-1', name: 'مدرسة طولكرم الثانوية الصناعية', nameEn: 'Tulkarem Industrial Secondary School', city: 'طولكرم', address: 'شارع يافا', phone: '09-2671234', email: 'tulkarem@mehani.ps' },
    
    // محافظة قلقيلية
    { id: 'school-qalqilya-1', name: 'مدرسة قلقيلية الثانوية الصناعية', nameEn: 'Qalqilya Industrial Secondary School', city: 'قلقيلية', address: 'مدينة قلقيلية', phone: '09-2941234', email: 'qalqilya@mehani.ps' },
    
    // محافظة نابلس
    { id: 'school-nablus-1', name: 'مدرسة نابلس الثانوية الصناعية المختلطة', nameEn: 'Nablus Industrial Secondary School', city: 'نابلس', address: 'مدينة نابلس', phone: '09-2381234', email: 'nablus@mehani.ps' },
    
    // محافظة سلفيت
    { id: 'school-salfit-1', name: 'مدرسة سلفيت الثانوية الصناعية', nameEn: 'Salfit Industrial Secondary School', city: 'سلفيت', address: 'المدخل الشرقي', phone: '09-2871234', email: 'salfit@mehani.ps' },
    
    // محافظة رام الله
    { id: 'school-ramallah-1', name: 'مدرسة دير دبوان الثانوية الصناعية', nameEn: 'Deir Dibwan Industrial Secondary School', city: 'رام الله', address: 'قرية دير دبوان', phone: '02-2896210', email: 'deirdibwan@mehani.ps' },
    { id: 'school-ramallah-2', name: 'مدرسة البيرة الثانوية الصناعية', nameEn: 'Al-Bireh Industrial Secondary School', city: 'رام الله', address: 'مدينة البيرة', phone: '02-2401234', email: 'albireh@mehani.ps' },
    { id: 'school-ramallah-3', name: 'مدرسة عابود الثانوية المختلطة', nameEn: 'Aboud Secondary School', city: 'رام الله', address: 'قرية عابود', phone: '02-2851234', email: 'aboud@mehani.ps' },
    { id: 'school-ramallah-4', name: 'مدرسة عين يبرود الثانوية الصناعية', nameEn: 'Ein Yabrud Industrial Secondary School', city: 'رام الله', address: 'قرية عين يبرود', phone: '02-2861234', email: 'einyabrud@mehani.ps' },
    { id: 'school-ramallah-5', name: 'مدرسة بيتونيا الثانوية الصناعية', nameEn: 'Beituniya Industrial Secondary School', city: 'رام الله', address: 'مدينة بيتونيا', phone: '02-2871234', email: 'beitunia@mehani.ps' },
    { id: 'school-ramallah-6', name: 'مدرسة سلواد الثانوية الصناعية', nameEn: 'Silwad Industrial Secondary School', city: 'رام الله', address: 'بلدة سلواد', phone: '02-2881234', email: 'silwad@mehani.ps' },
    
    // محافظة أريحا
    { id: 'school-jericho-1', name: 'مدرسة أريحا الثانوية الصناعية', nameEn: 'Jericho Industrial Secondary School', city: 'أريحا', address: 'مدينة أريحا', phone: '02-2321234', email: 'jericho@mehani.ps' },
    
    // محافظة بيت لحم
    { id: 'school-bethlehem-1', name: 'مدرسة السالزيان الصناعية - بيت لحم', nameEn: 'Salesian Industrial School - Bethlehem', city: 'بيت لحم', address: 'مدينة بيت لحم', phone: '02-2761234', email: 'salesian@mehani.ps' },
    { id: 'school-bethlehem-2', name: 'مدرسة بيت لحم الثانوية الصناعية', nameEn: 'Bethlehem Industrial Secondary School', city: 'بيت لحم', address: 'مدينة بيت لحم', phone: '02-2765678', email: 'bethlehem@mehani.ps' },
    
    // محافظة الخليل
    { id: 'school-hebron-1', name: 'مدرسة الخليل الثانوية الصناعية', nameEn: 'Hebron Industrial Secondary School', city: 'الخليل', address: 'مدينة الخليل', phone: '02-2221234', email: 'hebron@mehani.ps' },
    { id: 'school-hebron-2', name: 'مدرسة العروب الزراعية الثانوية', nameEn: 'Al-Arroub Agricultural Secondary School', city: 'الخليل', address: 'طريق بيت لحم - الخليل', phone: '02-2251234', email: 'arroub@mehani.ps' },
    { id: 'school-hebron-3', name: 'مدرسة عبد القادر القاضي الثانوية الصناعية', nameEn: 'Abdel Qader Al-Qadi Industrial Secondary School', city: 'الخليل', address: 'شمال الخليل', phone: '02-2234567', email: 'abdalqader@mehani.ps' },
    { id: 'school-hebron-4', name: 'مدرسة حلحول الثانوية الصناعية', nameEn: 'Halhul Industrial Secondary School', city: 'الخليل', address: 'مدينة حلحول', phone: '02-2271234', email: 'halhul@mehani.ps' },
    { id: 'school-hebron-5', name: 'مدرسة يطا الثانوية الصناعية', nameEn: 'Yatta Industrial Secondary School', city: 'الخليل', address: 'مدينة يطا', phone: '02-2291234', email: 'yatta@mehani.ps' },
    { id: 'school-hebron-6', name: 'مدرسة دورا الثانوية الصناعية', nameEn: 'Dura Industrial Secondary School', city: 'الخليل', address: 'مدينة دورا', phone: '02-2311234', email: 'dura@mehani.ps' },
    
    // محافظة القدس
    { id: 'school-jerusalem-1', name: 'مدرسة المطران الصناعية - القدس', nameEn: "Bishop's Industrial School - Jerusalem", city: 'القدس', address: 'القدس الشرقية', phone: '02-6281234', email: 'jerusalem@mehani.ps' },
    { id: 'school-jerusalem-2', name: 'مدرسة السلطان إبراهيم الصناعية', nameEn: 'Sultan Ibrahim Industrial School', city: 'القدس', address: 'أبو ديس', phone: '02-2791234', email: 'sultan@mehani.ps' },
    { id: 'school-jerusalem-3', name: 'مدرسة القدس الثانوية الصناعية', nameEn: 'Jerusalem Industrial Secondary School', city: 'القدس', address: 'العيزرية', phone: '02-2781234', email: 'quds@mehani.ps' },
  ];

  for (const school of schools) {
    await prisma.school.upsert({
      where: { id: school.id },
      update: {},
      create: school,
    });
  }
  console.log(`✅ تم إضافة ${schools.length} مدرسة`);

  // === الإنجازات والشارات (15 إنجاز) ===
  const achievements = [
    { id: 'ach-first-question', key: 'first_question', name: 'المستكشف', description: 'طرحت سؤالك الأول على المساعد الذكي', icon: '🎯', color: '#3B82F6', points: 10, category: 'learning' },
    { id: 'ach-first-quiz', key: 'first_quiz', name: 'المختبر', description: 'أكملت اختبارك الأول', icon: '🧪', color: '#10B981', points: 20, category: 'learning' },
    { id: 'ach-perfect-quiz', key: 'perfect_quiz', name: 'المثالي', description: 'حققت 100% في اختبار', icon: '⭐', color: '#F59E0B', points: 30, category: 'learning' },
    { id: 'ach-streak-3', key: 'streak_3', name: 'المواظب', description: 'سجلت دخول 3 أيام متتالية', icon: '🔥', color: '#EF4444', points: 15, category: 'learning' },
    { id: 'ach-streak-7', key: 'streak_7', name: 'المثابر', description: 'سجلت دخول 7 أيام متتالية', icon: '💪', color: '#EF4444', points: 50, category: 'learning' },
    { id: 'ach-streak-30', key: 'streak_30', name: 'الملتزم', description: 'سجلت دخول 30 يوم متتالي', icon: '🏆', color: '#FFD700', points: 200, category: 'learning' },
    { id: 'ach-all-units', key: 'all_units', name: 'الشمولي', description: 'أكملت جميع وحدات المنهاج', icon: '📚', color: '#8B5CF6', points: 100, category: 'learning' },
    { id: 'ach-questions-10', key: 'questions_10', name: 'الفضولي', description: 'طرحت 10 أسئلة', icon: '❓', color: '#06B6D4', points: 25, category: 'learning' },
    { id: 'ach-questions-50', key: 'questions_50', name: 'الباحث', description: 'طرحت 50 سؤالاً', icon: '🔍', color: '#06B6D4', points: 75, category: 'learning' },
    { id: 'ach-first-project', key: 'first_project', name: 'المبدع', description: 'أضفت مشروعك الأول', icon: '💡', color: '#EC4899', points: 30, category: 'social' },
    { id: 'ach-first-comment', key: 'first_comment', name: 'المتفاعل', description: 'علقت للمرة الأولى', icon: '💬', color: '#14B8A6', points: 10, category: 'social' },
    { id: 'ach-level-5', key: 'level_5', name: 'الخبير', description: 'وصلت للمستوى 5', icon: '🎖️', color: '#FFD700', points: 50, category: 'special' },
    { id: 'ach-level-10', key: 'level_10', name: 'المحترف', description: 'وصلت للمستوى 10', icon: '👑', color: '#FFD700', points: 100, category: 'special' },
    { id: 'ach-top-10', key: 'top_10', name: 'القيادي', description: 'دخلت قائمة أفضل 10', icon: '🥇', color: '#FFD700', points: 75, category: 'special' },
    { id: 'ach-points-1000', key: 'points_1000', name: 'النجم اللامع', description: 'جمعت 1000 نقطة', icon: '🌟', color: '#FFD700', points: 100, category: 'special' },
  ];

  for (const achievement of achievements) {
    await prisma.achievement.upsert({
      where: { id: achievement.id },
      update: {},
      create: achievement,
    });
  }
  console.log(`✅ تم إضافة ${achievements.length} إنجاز`);

  // === الوحدات التعليمية (5 وحدات) ===
  const units = [
    { id: 'unit-1', name: 'كاميرات المراقبة', nameEn: 'CCTV Surveillance', order: 1 },
    { id: 'unit-2', name: 'إنذار الحريق', nameEn: 'Fire Alarm Systems', order: 2 },
    { id: 'unit-3', name: 'إنذار السرقة', nameEn: 'Intrusion Alarm Systems', order: 3 },
    { id: 'unit-4', name: 'التحكم بالدخول', nameEn: 'Access Control Systems', order: 4 },
    { id: 'unit-5', name: 'المقاسم الهاتفية', nameEn: 'PBX Telephone Systems', order: 5 },
  ];

  console.log(`✅ تم تعريف ${units.length} وحدات تعليمية`);

  // === أسئلة المختبر (نماذج) ===
  const labQuestions = [
    // CCTV Questions
    { id: 'lab-1-1', unitId: 'unit-1', questionType: 'COMPONENT_ID', question: 'ما هو الجهاز الموجود في الصورة؟', options: JSON.stringify([{id: 'a', label: 'كاميرا IP'}, {id: 'b', label: 'DVR'}, {id: 'c', label: 'شاشة مراقبة'}, {id: 'd', label: 'كابل coaxial'}]), correctAnswer: 'a', hint: 'جهاز يلتقط الفيديو ويرسله عبر الشبكة', explanation: 'كاميرا IP هي كاميرا رقمية ترسل الفيديو عبر شبكة IP', points: 10, difficulty: 'EASY' },
    { id: 'lab-1-2', unitId: 'unit-1', questionType: 'CALCULATION', question: 'كم جيجابايت تحتاج لتخزين 8 كاميرات 1080p لمدة 30 يوم؟ (معدل 4 Mbps لكل كاميرا)', options: JSON.stringify([{id: 'a', label: '1 TB'}, {id: 'b', label: '2 TB'}, {id: 'c', label: '3 TB'}, {id: 'd', label: '4 TB'}]), correctAnswer: 'd', hint: 'استخدم معادلة: Storage = Bitrate × Time', explanation: '8 كاميرات × 4 Mbps × 30 يوم × 24 ساعة × 3600 ثانية ÷ 8 ÷ 1024 ÷ 1024 ≈ 4 TB', points: 15, difficulty: 'HARD' },
    
    // Fire Alarm Questions
    { id: 'lab-2-1', unitId: 'unit-2', questionType: 'COMPONENT_ID', question: 'ما نوع هذا الكاشف؟', options: JSON.stringify([{id: 'a', label: 'كاشف دخان'}, {id: 'b', label: 'كاشف حرارة'}, {id: 'c', label: 'كاشف لهب'}, {id: 'd', label: 'كاشف غاز'}]), correctAnswer: 'a', hint: 'يستخدم تقنية التأين أو الضوئي', explanation: 'كاشف الدخان يكتشف جزيئات الدخان في الهواء', points: 10, difficulty: 'EASY' },
    { id: 'lab-2-2', unitId: 'unit-2', questionType: 'WIRING', question: 'ما هي قيمة مقاومة EOL المستخدمة في أنظمة إنذار الحريق؟', options: JSON.stringify([{id: 'a', label: '1 kΩ'}, {id: 'b', label: '2.2 kΩ'}, {id: 'c', label: '4.7 kΩ'}, {id: 'd', label: '10 kΩ'}]), correctAnswer: 'c', hint: 'القيمة القياسية في معظم الأنظمة', explanation: 'مقاومة 4.7 kΩ هي القيمة القياسية لمقاومة نهاية الخط', points: 10, difficulty: 'MEDIUM' },
    
    // Access Control Questions
    { id: 'lab-4-1', unitId: 'unit-4', questionType: 'TROUBLESHOOTING', question: 'بطاقة الوصول لا تعمل، ما هو السبب المحتمل؟', options: JSON.stringify([{id: 'a', label: 'بطارية القارئ ضعيفة'}, {id: 'b', label: 'البطاقة غير مسجلة'}, {id: 'c', label: 'كلاهما محتمل'}, {id: 'd', label: 'لا شيء مما سبق'}]), correctAnswer: 'c', hint: 'فكر في جميع الاحتمالات', explanation: 'يجب فحص البطارية والتأكد من تسجيل البطاقة في النظام', points: 10, difficulty: 'MEDIUM' },
  ];

  for (const question of labQuestions) {
    await prisma.labQuestion.upsert({
      where: { id: question.id },
      update: {},
      create: question,
    });
  }
  console.log(`✅ تم إضافة ${labQuestions.length} سؤال مختبر`);

  console.log('🎉 تم إضافة جميع البيانات بنجاح!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### 6.2 تشغيل السكريبت

```bash
# إضافة البيانات الأولية
bun run prisma db seed

# أو يدوياً
bun run tsx prisma/seed.ts
```

---

## ملخص المشروع

| المكون | العدد |
|--------|-------|
| API Endpoints | 27+ |
| Database Models | 23 |
| UI Components | 65+ |
| المدارس | 28 |
| الإنجازات | 15 |
| الوحدات التعليمية | 5 |
| أنواع الأسئلة | 5 |
| تصنيفات المحتوى | 6 |

---

**تم إعداد هذا التقرير التقني الشامل ليكون مرجعاً كاملاً لبناء وتطوير منصة تعليم المباني الذكية.**
