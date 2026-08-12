-- ============================================
-- Schools Data for Supabase (SIMPLE VERSION)
-- Run this in Supabase SQL Editor
-- ============================================

-- First, Let's check if schools table exists and has data
SELECT COUNT(*) FROM schools;

-- If empty, insert schools one by one
INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة جنين الثانوية الصناعية', 'Jenin Industrial Secondary School', 'جنين', 'سيلة الظهر', '04-2501234', 'jenin@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة طوباس الثانوية الصناعية', 'Tubas Industrial Secondary School', 'طوباس', 'مدينة طوباس', '09-2595678', 'tubas@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة طولكرم الثانوية الصناعية', 'Tulkarem Industrial Secondary School', 'طولكرم', 'شارع يافا', '09-2671234', 'tulkarem@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة نابلس الثانوية الصناعية', 'Nablus Industrial Secondary School', 'نابلس', 'مدينة نابلس', '09-2381234', 'nablus@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة الخليل الثانوية الصناعية', 'Hebron Industrial Secondary School', 'الخليل', 'مدينة الخليل', '02-2221234', 'hebron@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة بيت لحم الثانوية الصناعية', 'Bethlehem Industrial Secondary School', 'بيت لحم', 'مدينة بيت لحم', '02-2765678', 'bethlehem@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة القدس الثانوية الصناعية', 'Jerusalem Industrial Secondary School', 'القدس', 'العيزرية', '02-2781234', 'jerusalem@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة أريحا الثانوية الصناعية', 'Jericho Industrial Secondary School', 'أريحا', 'مدينة أريحا', '02-2321234', 'jericho@mehani.ps', true);

INSERT INTO schools (name, name_en, city, address, phone, email, is_active)
VALUES ('مدرسة البيرة الثانوية الصناعية', 'Al-Bireh Industrial Secondary School', 'البيرة', 'مدينة البيرة', '02-2401234', 'albireh@mehani.ps', true);
