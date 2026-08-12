import { createClient } from '@libsql/client';

const libsql = createClient({
  url: 'libsql://mehani-db-mohammedalakaly.aws-us-west-2.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NzQyMDg0MTgsImlkIjoiMDE5ZDE3MGYtY2UwMS03MDAyLWE3ZmMtY2EzMGY0MzljZTVlIiwicmlkIjoiMjE1OGJkOTYtYWU4Yy00YjM0LThhZTEtYTkwMzI1ZjE5N2JmIn0.eQyXmu-K3CXLJfY4pp638Z6ErYzErxq9zhesVc-iqdCkAYMSvk7vj-Rw63W0VXtnlWZaygfQKZArZ-yAVZwSDQ'
});

async function checkAllAdmins() {
  console.log('=== جميع حسابات المشرف ===\n');
  
  const result = await libsql.execute({
    sql: 'SELECT id, name, email, role, passwordHash FROM User WHERE role = ?',
    args: ['admin']
  });
  
  console.log('عدد حسابات المشرف:', result.rows.length);
  
  for (const row of result.rows) {
    console.log('\n--- حساب مشرف ---');
    console.log('ID:', row.id);
    console.log('Name:', row.name);
    console.log('Email:', row.email);
    console.log('Password Hash:', row.passwordHash);
  }
  
  // Check all users
  console.log('\n\n=== جميع المستخدمين ===\n');
  const allUsers = await libsql.execute('SELECT id, name, email, role FROM User');
  console.log('عدد المستخدمين:', allUsers.rows.length);
  for (const row of allUsers.rows) {
    console.log(`${row.name} (${row.role}) - ${row.email || 'no email'}`);
  }
}

checkAllAdmins().catch(console.error);
