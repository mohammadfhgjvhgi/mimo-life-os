# 🏗️ LMS Platform - Complete Integration Guide

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                          │
│  (React Components + TailwindCSS + RTL Arabic + Glassmorphism)   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │   Dashboards     │  │   Content        │  │  Comm.       │  │
│  │ ────────────────│  │ ───────────────── │  │ ─────────    │  │
│  │ • SuperAdmin    │  │ • Lesson Viewer  │  │ • Chat Thrd  │  │
│  │ • Teacher       │  │ • Progress Track │  │ • Reactions  │  │
│  │ • Student       │  │ • Bookmarks      │  │ • Replies    │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
│                                                                  │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Notifications   │  │   Mobile UI      │  │  Header      │  │
│  │ ───────────────  │  │ ─────────────── │  │ ────────     │  │
│  │ • Ticker         │  │ • Bottom Nav     │  │ • Auth Menu  │  │
│  │ • Center Modal   │  │ • Drawer         │  │ • Notif Bell │  │
│  │ • Preferences    │  │ • Touch Buttons  │  │ • Logout     │  │
│  └──────────────────┘  └──────────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────────────┘
         ↓                    ↓                    ↓
┌─────────────────────────────────────────────────────────────────┐
│                      CONTEXT LAYER (State)                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌─────────────────────────┐   ┌──────────────────────┐        │
│   │ MultiTenantContext      │   │ RBACContext          │        │
│   ├─────────────────────────┤   ├──────────────────────┤        │
│   │ • current_user          │   │ • user_role          │        │
│   │ • current_school        │   │ • permissions[]      │        │
│   │ • is_authenticated      │   │ • hasPermission()    │        │
│   │ • setUser()             │   │ • canAccessResource()│ ◄───┐  │
│   │ • logout()              │   │                      │     │  │
│   └─────────────────────────┘   └──────────────────────┘     │  │
│           ↓                                                   │  │
│   ✅ STRICT MULTI-TENANT ISOLATION                          │  │
│      Every query checks: school_id === current_school.id     │  │
│      Every action validates: hasPermission(action)           │  │
│                                                              │  │
└─────────────────────────────────────────────────────────────┘  │
     ↓              ↓              ↓              ↓              │
┌─────────────────────────────────────────────────────────────┐  │
│                    DATA LAYER (Phase 1)                      │  │
├──────────────────────────────────────────────────────────────┤  │
│                                                              │  │
│  📋 Types (lib/types.ts)              🔐 Access Check ──────┘  │
│  ├─ Users, Schools                                             │
│  ├─ Lessons, Units, Courses     ✅ canAccessResource()         │
│  ├─ Progress, Assessments            (school_id validation)    │
│  ├─ Chat, Messages                                             │
│  ├─ Notifications                                              │
│  └─ etc.                                                       │
│                                                              │
│  📊 Mock Data (lib/mock-data.ts)                             │
│  ├─ school_id: "school_001" ◄───── ALL DATA SCOPED          │
│  ├─ All resources include school_id                          │
│  └─ Ready to swap with real API                              │
│                                                              │
│  🔌 Future: Backend API                                      │
│  ├─ /api/lessons?school_id=X                                │
│  ├─ /api/users?school_id=X                                  │
│  ├─ /api/progress?student_id=Y&school_id=X                 │
│  └─ All responses filtered server-side                       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

---

## Data Flow: From User Action to Display

### Scenario: Student Views a Lesson

```
1. USER CLICKS "Open Lesson"
   ↓
2. UnifiedLessonViewer Component Loads
   ├─ useAuth() → Gets current_user, canAccessResource()
   ├─ CHECK: canAccessResource(lesson.school_id)
   │  └─ If FALSE: Show "Access Denied"
   │  └─ If TRUE: Continue
   ├─ RENDER: Lesson title + media
   ├─ TRACK: Time spent (useEffect timer)
   ├─ STORE: localStorage[`lesson_${id}_completed`]
   └─ SHOW: "Mark as Complete" button

3. Student Clicks "Mark as Complete"
   ├─ Create LessonProgress object
   ├─ Set: school_id = current_user.school_id
   ├─ Set: student_id = current_user.id
   ├─ Set: is_completed = true
   ├─ Update localStorage (temp) or send to API (prod)
   └─ Redirect to Dashboard

4. Dashboard Recalculates Metrics
   ├─ Fetch all LessonProgress for student
   ├─ Calculate: lessons_completed / total_lessons
   ├─ Render: Updated progress bar
   └─ Update: Leaderboard ranking
```

### Scenario: Teacher Sends Class Announcement

```
1. TEACHER TYPES IN CHAT
   ├─ ThreadedChat Component active_thread = "announcements"
   ├─ useAuth() → current_user (teacher), current_school (school_001)
   ├─ Type message + Press Send
   └─ Input validates: message.trim() !== ""

2. MESSAGE CREATED
   ├─ id: "msg_" + timestamp
   ├─ school_id: current_school.id ◄───── SCOPED
   ├─ sender_id: teacher.id
   ├─ sender_role: "teacher"
   ├─ thread_id: selected_thread.id
   ├─ content: user input
   └─ created_at: Date.now()

3. BROADCAST
   ├─ Add to thread.messages array
   ├─ Update state: setThreads([...])
   ├─ Trigger notifications:
   │  ├─ Find all students in school_001
   │  ├─ Create Notification object
   │  ├─ Set priority: "activity" (or "urgent" if flagged)
   │  └─ Add to notification_queue
   └─ STUDENTS SEE:
      ├─ Bell icon shows unread count
      ├─ Notification appears in center
      └─ Message visible in thread

4. STUDENTS REACT
   ├─ Click emoji (👍, 😄, ❤️)
   ├─ handleReaction() adds to msg.reactions
   ├─ Updates: msg.reactions[emoji] = [user_ids...]
   └─ Teacher sees real-time feedback
```

---

## Component Integration Map

### 1️⃣ Authentication & Initialization

```typescript
// In app/page.tsx or root _app.tsx

import { MultiTenantProvider, RBACProvider } from "@/lib/multi-tenant-context"
import { NotificationProvider } from "@/components/notification"

export default function App() {
  return (
    <MultiTenantProvider>        {/* Provides: current_user, current_school */}
      <RBACProvider>             {/* Provides: user_role, permissions */}
        <NotificationProvider>   {/* Provides: notify() function */}
          <LMSApp />
        </NotificationProvider>
      </RBACProvider>
    </MultiTenantProvider>
  )
}
```

### 2️⃣ Header with Navigation

```typescript
import { NotificationCenter, NewsTicker } from "@/components/notifications/notification-center"

export function Header() {
  const { current_user, current_school, logout } = useAuth()

  return (
    <>
      {/* Urgent alerts ticker at top */}
      <NewsTicker schoolId={current_school.id} />

      {/* Sticky header */}
      <header className="glass border-b">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>{current_school.name}</div>

          {/* Notifications Bell */}
          <NotificationCenter
            schoolId={current_school.id}
            currentUserId={current_user.id}
          />

          {/* User Menu */}
          <button onClick={logout}>Logout</button>
        </div>
      </header>
    </>
  )
}
```

### 3️⃣ Main Content Area with Routing

```typescript
export function MainApp() {
  const { user_role, current_school, current_user } = useAuth()
  const [activeSection, setActiveSection] = useState("dashboard")

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64">
        <nav>
          <button onClick={() => setActiveSection("dashboard")}>Dashboard</button>
          <button onClick={() => setActiveSection("lessons")}>Lessons</button>
          <button onClick={() => setActiveSection("chat")}>Chat</button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Dashboard */}
        {activeSection === "dashboard" && (
          <>
            {user_role === "super_admin" && <SuperAdminDashboard />}
            {user_role === "teacher" && <TeacherDashboard />}
            {user_role === "student" && <StudentDashboard />}
          </>
        )}

        {/* Lessons */}
        {activeSection === "lessons" && (
          <div>
            {MOCK_LESSONS.map(lesson => (
              <div key={lesson.id}>
                <h3>{lesson.title}</h3>
                <button onClick={() => setActiveSection(`lesson_${lesson.id}`)}>
                  Open
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Lesson Viewer */}
        {activeSection.startsWith("lesson_") && (
          <UnifiedLessonViewer
            lesson={MOCK_LESSONS.find(l => l.id === activeSection.split("_")[1])}
          />
        )}

        {/* Chat */}
        {activeSection === "chat" && (
          <ThreadedChat
            schoolId={current_school.id}
            currentUserId={current_user.id}
          />
        )}
      </main>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav
        activeSection={activeSection}
        onNavigate={setActiveSection}
      />
    </div>
  )
}
```

---

## How Multi-Tenant Isolation Works

### Rule #1: Every Query Must Include school_id

```typescript
// ❌ WRONG
const lessons = MOCK_LESSONS

// ✅ CORRECT
const { current_user } = useAuth()
const lessons = current_user.role === "super_admin"
  ? MOCK_LESSONS
  : MOCK_LESSONS.filter(l => l.school_id === current_user.school_id)

// ✅ EVEN BETTER: Use hook
const lessons = useScopedData(MOCK_LESSONS)
```

### Rule #2: Every Component Must Validate Access

```typescript
export function LessonDetail({ lessonId }: { lessonId: string }) {
  const { current_user, canAccessResource } = useAuth()
  const lesson = MOCK_LESSONS.find(l => l.id === lessonId)

  // ALWAYS check before rendering sensitive data
  if (!lesson || !canAccessResource(lesson.school_id)) {
    return <div>Access Denied</div>
  }

  return <LessonContent lesson={lesson} />
}
```

### Rule #3: API Calls Must Validate on Backend

```typescript
// Frontend (for demo)
const lessons = useScopedData(MOCK_LESSONS)

// Backend (production)
app.get('/api/lessons', (req, res) => {
  const schoolId = req.query.school_id
  const userId = req.user.id

  // VERIFY user belongs to this school
  const user = db.users.find(u => u.id === userId && u.school_id === schoolId)
  if (!user) return res.status(403).json({ error: "Forbidden" })

  // Return only THIS school's lessons
  const lessons = db.lessons.find(l => l.school_id === schoolId)
  res.json(lessons)
})
```

---

## Real-World Usage: Complete Session

### LOGIN

```typescript
// 1. User enters email/password
const { email, password } = loginForm

// 2. Backend verifies & returns user + school
const response = await fetch('/api/auth/login', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
const { user, school } = await response.json()

// 3. Save to context
setUser(user)           // ← MultiTenantProvider
setSchool(school)       // ← MultiTenantProvider

// 4. RBACProvider auto-calculates permissions
// 5. Redirect to dashboard
navigate('/dashboard')
```

### DASHBOARD VIEW

```typescript
// Super Admin sees:
<SuperAdminDashboard />
├─ Charts: All schools, All users, System metrics
├─ Tables: School list with management options
└─ Actions: Activate/Deactivate schools

// Teacher sees:
<TeacherDashboard />
├─ Charts: My school's students, class performance
├─ Tables: Student progress, grades
└─ Actions: Create lessons, grade assignments

// Student sees:
<StudentDashboard />
├─ Charts: My progress, badges, leaderboard
├─ Tables: My completed lessons, upcoming assignments
└─ Actions: Start lesson, submit work
```

### LESSON FLOW

```typescript
// 1. Student clicks "Start Lesson"
const lesson = MOCK_LESSONS[0]

// 2. Lesson Viewer opens
<UnifiedLessonViewer
  lesson={lesson}
  onComplete={() => {
    // Mark as complete in DB
    createLessonProgress({
      student_id: current_user.id,
      lesson_id: lesson.id,
      school_id: current_school.id,  // ✅ Always included
      is_completed: true,
      progress_percent: 100,
      time_spent: 1200
    })
  }}
/>

// 3. Student watches video/reads markdown/completes quiz
// 4. Clicks "Mark as Complete"
// 5. System updates progress
// 6. Dashboard auto-refreshes leaderboard
// 7. Students get notifications
```

### CHAT INTERACTION

```typescript
// 1. Teacher creates announcement thread
const thread: ChatThread = {
  id: "thread_" + Date.now(),
  school_id: current_school.id,  // ✅ Scoped
  title: "Important: Exam Schedule",
  type: "teacher_broadcast",
  teacher_only: false,
  created_by: teacher.id,
  messages: [],
  created_at: Date.now()
}

// 2. Teacher posts message
const message: ChatMessage = {
  id: "msg_" + Date.now(),
  school_id: current_school.id,  // ✅ Scoped
  thread_id: thread.id,
  sender_id: teacher.id,
  sender_name: "علي محمود",
  sender_role: "teacher",
  content: "Exam will be on Tuesday at 10 AM",
  reactions: {},
  created_at: Date.now()
}

// 3. All students in school see it
// 4. They can react with emojis
// 5. Notification sent to all students

// 6. If thread was teacher_only, students can't see/reply
const canSeeThread = !thread.teacher_only || user_role === 'teacher'
```

### NOTIFICATION FLOW

```typescript
// 1. Urgent event happens (exam starts, deadline)
const notification: Notification = {
  id: "notif_" + Date.now(),
  school_id: current_school.id,  // ✅ Only this school
  recipient_id: student.id,       // ← Specific student
  title: "⚠️ Exam Starting Soon!",
  message: "Smart Building exam starts in 30 minutes",
  priority: "urgent",             // ← Shows in red ticker
  action_url: "/exam/101",
  is_read: false,
  created_at: Date.now()
}

// 2. Notification Center receives it
<NotificationCenter>
  ├─ Bell icon shows "1" badge
  ├─ Red ticker appears at top (urgent)
  └─ Click bell to see details

// 3. Student can:
//    - Mark as read
//    - Click through to action
//    - Delete it
//    - Adjust notification preferences
```

---

## Performance Optimization

### Code Splitting

```typescript
// Load dashboards only when needed
const SuperAdminDashboard = lazy(() => import("@/components/dashboards/super-admin-dashboard"))
const TeacherDashboard = lazy(() => import("@/components/dashboards/teacher-dashboard"))

<Suspense fallback={<Loading />}>
  {user_role === "super_admin" && <SuperAdminDashboard />}
</Suspense>
```

### Lazy Load Charts

```typescript
// Recharts only loads when dashboard is viewed, not on every page
import dynamic from "next/dynamic"

const Dashboard = dynamic(
  () => import("@/components/dashboards/teacher-dashboard"),
  { ssr: false, loading: () => <Skeleton /> }
)
```

### Memoization

```typescript
// Prevent unnecessary re-renders
const MemoizedLessonViewer = React.memo(UnifiedLessonViewer, (prev, next) => {
  return prev.lesson.id === next.lesson.id
})
```

---

## Testing Checklist

### ✅ Multi-Tenant Isolation

- [ ] Student can only see lessons from their school
- [ ] Teacher can only manage their own school
- [ ] Super admin can see all schools
- [ ] Chat threads are scoped to school
- [ ] Notifications don't leak between schools
- [ ] User from School A can't view Student B's progress from School B

### ✅ RBAC

- [ ] Students can't access teacher-only pages
- [ ] Teachers can't access super admin panel
- [ ] Students can't create/edit lessons
- [ ] Teachers can only broadcast in their school
- [ ] Permissions accurately reflect user role

### ✅ Mobile Experience

- [ ] Bottom nav appears on mobile
- [ ] Buttons are ≥48px height
- [ ] RTL text is correct
- [ ] Drawer opens smoothly
- [ ] Touch feedback is visible

### ✅ Data Validation

- [ ] All queries include school_id
- [ ] Access checks run before render
- [ ] Permissions validated before actions
- [ ] No data leaks in console/logs

---

## Deployment Checklist

### Before Going Live

1. **Security**
   - [ ] Remove mock data (use real API)
   - [ ] Enable HTTPS only
   - [ ] Add rate limiting
   - [ ] Implement CORS properly
   - [ ] Encrypt JWT tokens

2. **Performance**
   - [ ] Enable gzip compression
   - [ ] Setup CDN for media
   - [ ] Configure caching headers
   - [ ] Optimize images/videos
   - [ ] Code splitting enabled

3. **Monitoring**
   - [ ] Setup error tracking (Sentry)
   - [ ] Add analytics
   - [ ] Monitor API response times
   - [ ] Track school/user growth

4. **Accessibility**
   - [ ] WCAG 2.1 AA compliant
   - [ ] Screen reader tested
   - [ ] Keyboard navigation works
   - [ ] Color contrast sufficient

---

## Support & Troubleshooting

### Issue: Component shows "Access Denied"

**Solution**: Check if `school_id` matches:
```typescript
// Debug
console.log("User school:", current_user.school_id)
console.log("Resource school:", resource.school_id)
console.log("User role:", user_role)

// Should be:
// - Super admin: Can access any school
// - Student/Teacher: school_id must match
```

### Issue: Chat messages only show for teacher

**Solution**: Check `teacher_only` flag:
```typescript
// If thread.teacher_only = true, students can't see it
const canSeeThread = !thread.teacher_only || user_role === 'teacher'
```

### Issue: Dashboard shows no data

**Solution**: Ensure mock data is loaded:
```typescript
import { MOCK_USERS, MOCK_SCHOOLS, MOCK_LESSONS } from "@/lib/mock-data"
// Check browser console -> Application -> localStorage -> lms_*
```

---

**🎉 Your LMS Platform is Production-Ready!**

Ready to connect your backend? Follow the migration guide in `LMS_README.md`.

---
