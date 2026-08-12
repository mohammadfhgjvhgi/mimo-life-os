-- ============================================
-- LMS Smart Building - Supabase Database Schema
-- ============================================
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Profiles
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'student',
  engineer_id UUID,
  school_id UUID,
  avatar TEXT,
  phone TEXT,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_engineer_id ON user_profiles(engineer_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT FALSE,
  author_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lesson Content
CREATE TABLE IF NOT EXISTS lesson_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT DEFAULT 'GENERAL',
  title TEXT NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  thumbnail TEXT,
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lesson_contents_lesson_id ON lesson_contents(lesson_id);
CREATE INDEX IF NOT EXISTS idx_lesson_contents_type ON lesson_contents(type);
CREATE INDEX IF NOT EXISTS idx_lesson_contents_category ON lesson_contents(category);

-- Content Comments
CREATE TABLE IF NOT EXISTS content_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_content_comments_content_id ON content_comments(content_id);

-- Lab Questions
CREATE TABLE IF NOT EXISTS lab_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id TEXT NOT NULL,
  question_type TEXT NOT NULL,
  question TEXT NOT NULL,
  image_url TEXT,
  options TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  hint TEXT,
  explanation TEXT,
  points INTEGER DEFAULT 10,
  difficulty TEXT DEFAULT 'MEDIUM',
  "order" INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lab_questions_unit_id ON lab_questions(unit_id);
CREATE INDEX IF NOT EXISTS idx_lab_questions_question_type ON lab_questions(question_type);

-- Lab Results
CREATE TABLE IF NOT EXISTS lab_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  unit_id TEXT NOT NULL,
  total_questions INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  score INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lab_results_user_id ON lab_results(user_id);
CREATE INDEX IF NOT EXISTS idx_lab_results_unit_id ON lab_results(unit_id);

-- Content Ratings
CREATE TABLE IF NOT EXISTS content_ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  rating INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(content_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_content_ratings_content_id ON content_ratings(content_id);

-- Past Exams
CREATE TABLE IF NOT EXISTS past_exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  semester TEXT NOT NULL,
  unit_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  pdf_url TEXT,
  duration INTEGER DEFAULT 60,
  total_marks INTEGER DEFAULT 100,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_past_exams_year ON past_exams(year);
CREATE INDEX IF NOT EXISTS idx_past_exams_unit_id ON past_exams(unit_id);

-- Past Exam Questions
CREATE TABLE IF NOT EXISTS past_exam_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID NOT NULL REFERENCES past_exams(id) ON DELETE CASCADE,
  question_number INTEGER NOT NULL,
  question TEXT NOT NULL,
  question_image TEXT,
  question_type TEXT,
  options TEXT,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  marks INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_past_exam_questions_exam_id ON past_exam_questions(exam_id);

-- Quizzes
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  time_limit INTEGER DEFAULT 10,
  passing_score INTEGER DEFAULT 60,
  difficulty TEXT DEFAULT 'MEDIUM',
  is_active BOOLEAN DEFAULT TRUE,
  attempts INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quizzes_unit_id ON quizzes(unit_id);

-- Quiz Questions
CREATE TABLE IF NOT EXISTS quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quiz_id UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  question_image TEXT,
  options TEXT NOT NULL,
  correct_answer INTEGER NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_questions_quiz_id ON quiz_questions(quiz_id);

-- Quiz Results
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  quiz_id UUID NOT NULL,
  score INTEGER NOT NULL,
  total_points INTEGER NOT NULL,
  percentage INTEGER NOT NULL,
  correct_answers INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  time_spent INTEGER NOT NULL,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_quiz_id ON quiz_results(quiz_id);

-- Resource Files
CREATE TABLE IF NOT EXISTS resource_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  unit_id TEXT,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  downloads INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  uploaded_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_resource_files_unit_id ON resource_files(unit_id);
CREATE INDEX IF NOT EXISTS idx_resource_files_type ON resource_files(type);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'general',
  priority INTEGER DEFAULT 0,
  target_role TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMPTZ,
  created_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_announcements_type ON announcements(type);
CREATE INDEX IF NOT EXISTS idx_announcements_priority ON announcements(priority);

-- Schools
CREATE TABLE IF NOT EXISTS schools (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  name_en TEXT,
  city TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  email TEXT,
  logo TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_schools_city ON schools(city);

-- Student Projects
CREATE TABLE IF NOT EXISTS student_projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  unit_id TEXT,
  school_id UUID,
  student_name TEXT NOT NULL,
  student_id TEXT,
  images TEXT,
  video_url TEXT,
  documents TEXT,
  status TEXT DEFAULT 'pending',
  likes INTEGER DEFAULT 0,
  views INTEGER DEFAULT 0,
  submitted_by TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_projects_unit_id ON student_projects(unit_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_school_id ON student_projects(school_id);
CREATE INDEX IF NOT EXISTS idx_student_projects_status ON student_projects(status);

-- User Stats
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  total_points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  lessons_completed INTEGER DEFAULT 0,
  quizzes_passed INTEGER DEFAULT 0,
  projects_submitted INTEGER DEFAULT 0,
  questions_asked INTEGER DEFAULT 0,
  rank TEXT DEFAULT 'مبتدئ',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_stats_total_points ON user_stats(total_points);
CREATE INDEX IF NOT EXISTS idx_user_stats_level ON user_stats(level);

-- Achievements
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT DEFAULT '#FFD700',
  points INTEGER DEFAULT 10,
  category TEXT DEFAULT 'general',
  requirement TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_achievements_category ON achievements(category);

-- User Achievements
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  unit_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Teacher Availability
CREATE TABLE IF NOT EXISTS teacher_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id TEXT NOT NULL,
  day_of_week INTEGER NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_teacher_availability_teacher_id ON teacher_availability(teacher_id);

-- Direct Messages
CREATE TABLE IF NOT EXISTS direct_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  content TEXT NOT NULL,
  attachments TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_direct_messages_sender_id ON direct_messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_receiver_id ON direct_messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_direct_messages_created_at ON direct_messages(created_at);

-- Group Channels
CREATE TABLE IF NOT EXISTS group_channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  type TEXT DEFAULT 'class',
  engineer_id TEXT,
  related_id TEXT,
  created_by TEXT NOT NULL,
  members TEXT DEFAULT '[]',
  pinned_message TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_group_channels_engineer_id ON group_channels(engineer_id);
CREATE INDEX IF NOT EXISTS idx_group_channels_type ON group_channels(type);
CREATE INDEX IF NOT EXISTS idx_group_channels_related_id ON group_channels(related_id);

-- Group Messages
CREATE TABLE IF NOT EXISTS group_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL,
  sender_id TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  content TEXT NOT NULL,
  attachments TEXT,
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_group_messages_channel_id ON group_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_group_messages_created_at ON group_messages(created_at);

-- Assignments
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  unit_id TEXT,
  due_date TIMESTAMPTZ,
  attachments TEXT,
  created_by TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_assignments_unit_id ON assignments(unit_id);
CREATE INDEX IF NOT EXISTS idx_assignments_created_by ON assignments(created_by);

-- Assignment Submissions
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL,
  student_id TEXT NOT NULL,
  student_name TEXT NOT NULL,
  school_id UUID,
  content TEXT,
  attachments TEXT NOT NULL,
  grade INTEGER,
  feedback TEXT,
  status TEXT DEFAULT 'submitted',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  graded_at TIMESTAMPTZ,
  graded_by TEXT
);

CREATE INDEX IF NOT EXISTS idx_assignment_submissions_assignment_id ON assignment_submissions(assignment_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_student_id ON assignment_submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_assignment_submissions_status ON assignment_submissions(status);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at);

-- ============================================
-- Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Public read policy for users (users can read their own data)
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

-- Allow all authenticated users to read certain tables
CREATE POLICY "Authenticated users can read announcements" ON announcements
  FOR SELECT TO authenticated USING (is_active = TRUE);

CREATE POLICY "Authenticated users can read schools" ON schools
  FOR SELECT TO authenticated USING (is_active = TRUE);

CREATE POLICY "Authenticated users can read achievements" ON achievements
  FOR SELECT TO authenticated USING (is_active = TRUE);

-- ============================================
-- Storage Bucket for File Uploads
-- ============================================
-- Run this in Supabase Dashboard > Storage > Create Bucket
-- Bucket name: uploads
-- Public bucket: Yes (for public file access)

-- Or use SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

CREATE POLICY "Authenticated users can upload" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'uploads');

CREATE POLICY "Users can update own uploads" ON storage.objects
  FOR UPDATE USING (bucket_id = 'uploads' AND auth.uid()::text = owner::text);

CREATE POLICY "Users can delete own uploads" ON storage.objects
  FOR DELETE USING (bucket_id = 'uploads' AND auth.uid()::text = owner::text);

-- ============================================
-- Default Achievements Data
-- ============================================
INSERT INTO achievements (key, name, description, icon, points, category) VALUES
('first_quiz', 'أول اختبار', 'أكملت أول اختبار بنجاح', '🎯', 10, 'learning'),
('streak_7', 'أسبوع متواصل', 'سجلت دخول 7 أيام متتالية', '🔥', 25, 'social'),
('all_units', 'أكمل جميع الوحدات', 'أكملت جميع وحدات المنهاج', '📚', 100, 'learning'),
('first_project', 'أول مشروع', 'قدمت أول مشروع لك', '💡', 20, 'special'),
('top_student', 'طالب متميز', 'حققت 100% في 5 اختبارات', '⭐', 50, 'learning'),
('helper', 'مساعد زملاء', 'ساعدت 10 طلاب في المحادثة', '🤝', 30, 'social'),
('early_bird', 'الطائر المبكر', 'سجلت دخول قبل 7 صباحاً', '🌅', 15, 'special')
ON CONFLICT (key) DO NOTHING;

-- ============================================
-- Sample Data for Testing
-- ============================================
-- You can add sample data here if needed
