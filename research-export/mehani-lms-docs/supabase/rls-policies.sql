-- =====================================================
-- 🛡️ سياسات أمن Row Level Security (RLS) لـ Supabase
-- Security Policies for LMS Smart Building Platform
-- =====================================================
-- تشغيل هذا الملف في Supabase SQL Editor
-- Run this file in Supabase SQL Editor

-- =====================================================
-- 1. تفعيل RLS على جميع الجداول
-- =====================================================

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE lab_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_projects ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 2. دوال مساعدة للتحقق من الأدوار
-- =====================================================

-- دالة للحصول على دور المستخدم الحالي
CREATE OR REPLACE FUNCTION auth.role()
RETURNS TEXT AS $$
  SELECT role FROM user_profiles WHERE user_id = auth.uid()::text;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- دالة للحصول على معرف مدرسة المستخدم
CREATE OR REPLACE FUNCTION auth.school_id()
RETURNS TEXT AS $$
  SELECT school_id FROM user_profiles WHERE user_id = auth.uid()::text;
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- دالة للتحقق من أن المستخدم مشرف
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS BOOLEAN AS $$
  SELECT auth.role() = 'admin';
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- دالة للتحقق من أن المستخدم مهندس
CREATE OR REPLACE FUNCTION auth.is_engineer()
RETURNS BOOLEAN AS $$
  SELECT auth.role() IN ('admin', 'engineer');
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- دالة للتحقق من ملكية السجل
CREATE OR REPLACE FUNCTION auth.is_owner(user_id TEXT)
RETURNS BOOLEAN AS $$
  SELECT auth.uid()::text = user_id OR auth.is_admin();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- =====================================================
-- 3. سياسات جدول user_profiles
-- =====================================================

-- سياسة القراءة: يمكن للمستخدم رؤية ملفه فقط، والمشرف يرى الكل
CREATE POLICY "users_can_view_own_profile" ON user_profiles
  FOR SELECT USING (
    user_id = auth.uid()::text OR auth.is_admin()
  );

-- سياسة الكتابة: المستخدم يمكنه تعديل ملفه فقط (ما عدا الدور)
CREATE POLICY "users_can_update_own_profile" ON user_profiles
  FOR UPDATE USING (
    user_id = auth.uid()::text
  )
  WITH CHECK (
    user_id = auth.uid()::text 
    AND role = (SELECT role FROM user_profiles WHERE user_id = auth.uid()::text)
  );

-- سياسة الإضافة: فقط المشرف يمكنه إنشاء مستخدمين
CREATE POLICY "admin_can_insert_profiles" ON user_profiles
  FOR INSERT WITH CHECK (auth.is_admin());

-- =====================================================
-- 4. سياسات جدول schools
-- =====================================================

-- القراءة: الجميع يمكنهم رؤية المدارس
CREATE POLICY "schools_are_public" ON schools
  FOR SELECT USING (true);

-- الكتابة: فقط المشرف
CREATE POLICY "admin_can_manage_schools" ON schools
  FOR ALL USING (auth.is_admin());

-- =====================================================
-- 5. سياسات جدول lesson_contents
-- =====================================================

-- القراءة: المحتوى النشط للجميع، الكل للمشرف والمهندس
CREATE POLICY "view_active_content" ON lesson_contents
  FOR SELECT USING (
    is_active = true OR auth.is_engineer()
  );

-- الكتابة: فقط المشرف والمهندس
CREATE POLICY "engineers_can_manage_content" ON lesson_contents
  FOR ALL USING (auth.is_engineer());

-- =====================================================
-- 6. سياسات جدول lab_results
-- =====================================================

-- القراءة: الطالب يرى نتائجه، المهندس يرى نتائج مدرسته، المشرف يرى الكل
CREATE POLICY "view_own_lab_results" ON lab_results
  FOR SELECT USING (
    user_id = auth.uid()::text 
    OR auth.is_admin()
    OR (auth.is_engineer() AND auth.school_id() = (
      SELECT school_id FROM user_profiles WHERE user_id = lab_results.user_id
    ))
  );

-- الإضافة: المستخدم يمكنه إضافة نتائجه فقط
CREATE POLICY "insert_own_lab_results" ON lab_results
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- =====================================================
-- 7. سياسات جدول quiz_results
-- =====================================================

CREATE POLICY "view_own_quiz_results" ON quiz_results
  FOR SELECT USING (
    user_id = auth.uid()::text 
    OR auth.is_admin()
    OR (auth.is_engineer() AND auth.school_id() = (
      SELECT school_id FROM user_profiles WHERE user_id = quiz_results.user_id
    ))
  );

CREATE POLICY "insert_own_quiz_results" ON quiz_results
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- =====================================================
-- 8. سياسات جدول chat_messages (المساعد الذكي)
-- =====================================================

CREATE POLICY "view_own_chat_messages" ON chat_messages
  FOR SELECT USING (user_id = auth.uid()::text OR auth.is_admin());

CREATE POLICY "insert_own_chat_messages" ON chat_messages
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- =====================================================
-- 9. سياسات جدول direct_messages
-- =====================================================

CREATE POLICY "view_own_direct_messages" ON direct_messages
  FOR SELECT USING (
    sender_id = auth.uid()::text 
    OR receiver_id = auth.uid()::text
    OR auth.is_admin()
  );

CREATE POLICY "insert_direct_messages" ON direct_messages
  FOR INSERT WITH CHECK (sender_id = auth.uid()::text);

-- =====================================================
-- 10. سياسات جدول notifications
-- =====================================================

CREATE POLICY "view_own_notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid()::text OR auth.is_admin());

CREATE POLICY "update_own_notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid()::text);

CREATE POLICY "insert_notifications" ON notifications
  FOR INSERT WITH CHECK (auth.is_admin() OR auth.is_engineer());

-- =====================================================
-- 11. سياسات جدول assignments
-- =====================================================

CREATE POLICY "view_assignments" ON assignments
  FOR SELECT USING (true);

CREATE POLICY "manage_assignments" ON assignments
  FOR ALL USING (auth.is_engineer());

-- =====================================================
-- 12. سياسات جدول assignment_submissions
-- =====================================================

CREATE POLICY "view_own_submissions" ON assignment_submissions
  FOR SELECT USING (
    student_id = auth.uid()::text 
    OR auth.is_admin()
    OR (auth.is_engineer() AND auth.school_id() = school_id)
  );

CREATE POLICY "insert_submissions" ON assignment_submissions
  FOR INSERT WITH CHECK (student_id = auth.uid()::text);

CREATE POLICY "grade_submissions" ON assignment_submissions
  FOR UPDATE USING (auth.is_engineer());

-- =====================================================
-- 13. سياسات جدول user_stats
-- =====================================================

CREATE POLICY "view_own_stats" ON user_stats
  FOR SELECT USING (
    user_id = auth.uid()::text 
    OR auth.is_admin()
    OR (auth.is_engineer() AND auth.school_id() = (
      SELECT school_id FROM user_profiles WHERE user_id = user_stats.user_id
    ))
  );

CREATE POLICY "update_own_stats" ON user_stats
  FOR UPDATE USING (user_id = auth.uid()::text);

-- =====================================================
-- 14. سياسات جدول user_achievements
-- =====================================================

CREATE POLICY "view_own_achievements" ON user_achievements
  FOR SELECT USING (
    user_id = auth.uid()::text 
    OR auth.is_admin()
    OR (auth.is_engineer() AND auth.school_id() = (
      SELECT school_id FROM user_profiles WHERE user_id = user_achievements.user_id
    ))
  );

CREATE POLICY "insert_achievements" ON user_achievements
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

-- =====================================================
-- 15. سياسات جدول content_comments
-- =====================================================

CREATE POLICY "view_comments" ON content_comments
  FOR SELECT USING (true);

CREATE POLICY "insert_comments" ON content_comments
  FOR INSERT WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "delete_own_comments" ON content_comments
  FOR DELETE USING (user_id = auth.uid()::text OR auth.is_admin());

-- =====================================================
-- 16. سياسات جدول student_projects
-- =====================================================

CREATE POLICY "view_approved_projects" ON student_projects
  FOR SELECT USING (status = 'approved' OR auth.is_admin());

CREATE POLICY "submit_projects" ON student_projects
  FOR INSERT WITH CHECK (student_id = auth.uid()::text OR auth.is_engineer());

CREATE POLICY "manage_projects" ON student_projects
  FOR UPDATE USING (auth.is_admin() OR auth.is_engineer());

-- =====================================================
-- 17. فهرسة للأداء الأفضل
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_school_id ON user_profiles(school_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_lab_results_user_id ON lab_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_participants ON direct_messages(sender_id, receiver_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- =====================================================
-- ملاحظات هامة:
-- 1. تأكد من تفعيل RLS على أي جدول جديد
-- 2. اختبر السياسات قبل النشر في الإنتاج
-- 3. راقب أداء الاستعلامات بعد تطبيق RLS
-- =====================================================
