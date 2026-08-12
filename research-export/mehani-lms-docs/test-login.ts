import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
})

async function test() {
  console.log('🔍 اختبار شامل...\n')
  
  // 1. فحص المستخدم
  const result = await client.execute({
    sql: 'SELECT * FROM User WHERE email = ?',
    args: ['admin@mehani.ps']
  })
  
  if (result.rows.length === 0) {
    console.log('❌ المستخدم غير موجود!')
    return
  }
  
  const user = result.rows[0]
  console.log('📋 بيانات المستخدم:')
  console.log('  ID:', user.id)
  console.log('  Email:', user.email)
  console.log('  Name:', user.name)
  console.log('  Role:', user.role)
  console.log('  passwordHash:', user.passwordHash ? 'موجود (' + (user.passwordHash as string).length + ' حرف)' : 'NULL')
  console.log('  Hash value:', user.passwordHash)
  
  // 2. اختبار bcrypt
  if (user.passwordHash) {
    const testPasswords = ['admin123', 'Admin123', 'ADMIN123', 'admin']
    console.log('\n🔐 اختبار كلمات المرور:')
    for (const pwd of testPasswords) {
      const match = await bcrypt.compare(pwd, user.passwordHash as string)
      console.log(`  "${pwd}": ${match ? '✅ صحيحة' : '❌ خاطئة'}`)
    }
  }
  
  // 3. إنشاء hash جديد واختباره
  console.log('\n🆕 إنشاء hash جديد:')
  const newHash = await bcrypt.hash('admin123', 12)
  console.log('  New hash:', newHash)
  
  const newMatch = await bcrypt.compare('admin123', newHash)
  console.log('  اختبار الـ hash الجديد:', newMatch ? '✅' : '❌')
  
  // 4. تحديث قاعدة البيانات
  console.log('\n💾 تحديث قاعدة البيانات...')
  await client.execute({
    sql: 'UPDATE User SET passwordHash = ? WHERE email = ?',
    args: [newHash, 'admin@mehani.ps']
  })
  
  // 5. التحقق من التحديث
  const updated = await client.execute({
    sql: 'SELECT passwordHash FROM User WHERE email = ?',
    args: ['admin@mehani.ps']
  })
  
  const finalMatch = await bcrypt.compare('admin123', updated.rows[0]?.passwordHash as string)
  console.log('  النتيجة النهائية:', finalMatch ? '✅ صحيحة' : '❌ خاطئة')
}

test().catch(console.error)
