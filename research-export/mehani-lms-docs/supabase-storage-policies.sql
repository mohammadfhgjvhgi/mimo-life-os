-- ============================================
-- Supabase Storage Policies
-- Run this in Supabase SQL Editor
-- ============================================

-- Create uploads bucket if not exists
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to view public uploads
CREATE POLICY "Public can view uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'uploads');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'uploads');

-- Allow users to update their own uploads
CREATE POLICY "Users can update own uploads"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'uploads' AND auth.uid()::text = owner::text);

-- Allow users to delete their own uploads
CREATE POLICY "Users can delete own uploads"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'uploads' AND auth.uid()::text = owner::text);

-- ============================================
-- Additional RLS Policies for Tables
-- ============================================

-- Quiz Results: Users can only see their own results
CREATE POLICY "Users can view own quiz results"
ON quiz_results FOR SELECT
TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own quiz results"
ON quiz_results FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid()::text);

-- User Stats: Users can only see and update their own stats
CREATE POLICY "Users can view own stats"
ON user_stats FOR SELECT
TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own stats"
ON user_stats FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid()::text);

CREATE POLICY "Users can update own stats"
ON user_stats FOR UPDATE
TO authenticated
USING (user_id = auth.uid()::text);

-- Chat Messages: Users can only see their own messages
CREATE POLICY "Users can view own messages"
ON chat_messages FOR SELECT
TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own messages"
ON chat_messages FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid()::text);

-- User Achievements: Users can see their own achievements
CREATE POLICY "Users can view own achievements"
ON user_achievements FOR SELECT
TO authenticated
USING (user_id = auth.uid()::text);

CREATE POLICY "Users can insert own achievements"
ON user_achievements FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid()::text);

-- Announcements: All authenticated users can read active announcements
CREATE POLICY "Authenticated can read active announcements"
ON announcements FOR SELECT
TO authenticated
USING (is_active = TRUE);

-- Schools: All authenticated users can read active schools
CREATE POLICY "Authenticated can read active schools"
ON schools FOR SELECT
TO authenticated
USING (is_active = TRUE);

-- Achievements: All authenticated users can read achievements
CREATE POLICY "Authenticated can read achievements"
ON achievements FOR SELECT
TO authenticated
USING (is_active = TRUE);

-- ============================================
-- Functions for automatic profile creation
-- ============================================

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (userId, name, avatar, isOnline, lastSeen)
  VALUES (
    NEW.id::text,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    '👤',
    TRUE,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
