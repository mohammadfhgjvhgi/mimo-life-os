/**
 * Script to add schools directly
 */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Adding schools...');

  const schools = [
    // === محافظة الخليل ===
    { id: 'school-hebron-1', name: 'مدرسة الخليل الثانوية الصناعية', nameEn: 'Hebron Industrial Secondary School', city: 'الخليل' },
    { id: 'school-hebron-2', name: 'مدرسة العروب الزراعية الثانوية', nameEn: 'Al-Arroub Agricultural Secondary School', city: 'الخليل' },
    { id: 'school-hebron-3', name: 'مدرسة عبد القادر القاضي الثانوية الصناعية', nameEn: 'Abdel Qader Al-Qadi Industrial Secondary School', city: 'الخليل' },
    { id: 'school-hebron-4', name: 'مدرسة حلحول الثانوية الصناعية', nameEn: 'Halhul Industrial Secondary School', city: 'الخليل' },
    { id: 'school-hebron-5', name: 'مدرسة يطا الثانوية الصناعية', nameEn: 'Yatta Industrial Secondary School', city: 'الخليل' },
    { id: 'school-hebron-6', name: 'مدرسة دورا الثانوية الصناعية', nameEn: 'Dura Industrial Secondary School', city: 'الخليل' },
    
    // === محافظة القدس ===
    { id: 'school-jerusalem-1', name: 'مدرسة المطران الصناعية - القدس', nameEn: "Bishop's Industrial School - Jerusalem", city: 'القدس' },
    { id: 'school-jerusalem-2', name: 'مدرسة السلطان إبراهيم الصناعية', nameEn: 'Sultan Ibrahim Industrial School', city: 'القدس' },
    { id: 'school-jerusalem-3', name: 'مدرسة القدس الثانوية الصناعية', nameEn: 'Jerusalem Industrial Secondary School', city: 'القدس' },
    
    // === محافظة رام الله ===
    { id: 'school-ramallah-1', name: 'مدرسة دير دبوان الثانوية الصناعية', nameEn: 'Deir Dibwan Industrial Secondary School', city: 'رام الله' },
    { id: 'school-ramallah-2', name: 'مدرسة البيرة الثانوية الصناعية', nameEn: 'Al-Bireh Industrial Secondary School', city: 'رام الله' },
    
    // === محافظة نابلس ===
    { id: 'school-nablus-1', name: 'مدرسة نابلس الثانوية الصناعية المختلطة', nameEn: 'Nablus Industrial Secondary School', city: 'نابلس' },
    
    // === محافظة جنين ===
    { id: 'school-jenin-1', name: 'مدرسة جنين الثانوية الصناعية', nameEn: 'Jenin Industrial Secondary School', city: 'جنين' },
    { id: 'school-jenin-2', name: 'مدرسة سيلة الظهر الثانوية الصناعية', nameEn: 'Seilet Al-Thahr Industrial Secondary School', city: 'جنين' },
    
    // === محافظة بيت لحم ===
    { id: 'school-bethlehem-1', name: 'مدرسة السالزيان الصناعية - بيت لحم', nameEn: 'Salesian Industrial School - Bethlehem', city: 'بيت لحم' },
    { id: 'school-bethlehem-2', name: 'مدرسة بيت لحم الثانوية الصناعية', nameEn: 'Bethlehem Industrial Secondary School', city: 'بيت لحم' },
    
    // === باقي المحافظات ===
    { id: 'school-tulkarem-1', name: 'مدرسة طولكرم الثانوية الصناعية', nameEn: 'Tulkarem Industrial Secondary School', city: 'طولكرم' },
    { id: 'school-qalqilya-1', name: 'مدرسة قلقيلية الثانوية الصناعية', nameEn: 'Qalqilya Industrial Secondary School', city: 'قلقيلية' },
    { id: 'school-tubas-1', name: 'مدرسة طوباس الثانوية الصناعية', nameEn: 'Tubas Industrial Secondary School', city: 'طوباس' },
    { id: 'school-salfit-1', name: 'مدرسة سلفيت الثانوية الصناعية', nameEn: 'Salfit Industrial Secondary School', city: 'سلفيت' },
    { id: 'school-jericho-1', name: 'مدرسة أريحا الثانوية الصناعية', nameEn: 'Jericho Industrial Secondary School', city: 'أريحا' },
  ];

  for (const school of schools) {
    await prisma.school.upsert({
      where: { id: school.id },
      update: {},
      create: {
        ...school,
        isActive: true,
      }
    });
  }

  console.log(`✅ Added ${schools.length} schools`);

  // Add some engineers
  const engineers = [
    { id: 'eng-001', name: 'م. أحمد الخليلي', schoolId: 'school-hebron-1' },
    { id: 'eng-002', name: 'م. محمود الدرويش', schoolId: 'school-hebron-2' },
    { id: 'eng-003', name: 'م. خليل الرفاعي', schoolId: 'school-hebron-3' },
    { id: 'eng-004', name: 'م. يوسف النتشة', schoolId: 'school-ramallah-1' },
    { id: 'eng-005', name: 'م. عبدالله عودة', schoolId: 'school-nablus-1' },
  ];

  for (const eng of engineers) {
    await prisma.user.upsert({
      where: { id: eng.id },
      update: {},
      create: {
        id: eng.id,
        name: eng.name,
        password: '$2b$10$dummyHashForEngineer',
        role: 'ENGINEER',
        schoolId: eng.schoolId,
        isActive: true,
      }
    });
  }

  console.log(`✅ Added ${engineers.length} engineers`);

  // Count schools
  const count = await prisma.school.count();
  console.log(`Total schools in DB: ${count}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
