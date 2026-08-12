// ============================================
// MiMo Agent Service — وكيل شخصي يعمل بالخلفية
// ============================================
// Port: 3030
// Agents:
//   1. GitHub — يفحص commits كل 30 دقيقة
//   2. Google Calendar — يجلب أحداث اليوم الحقيقية (googleapis)
//   3. Gmail — يجلب الإيميلات الجديدة + يصنفها
//   4. Overdue Tasks — يفحص المهام المتأخرة
// ينشئ Notifications بـ DB الموقع مباشرة
// ============================================

import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';

const PORT = 3030;
const DB_PATH = process.env.DATABASE_URL || 'file:../../db/custom.db';

const db = new PrismaClient({
  datasources: { db: { url: DB_PATH } },
});

// ============================================
// Helpers
// ============================================

/** retry wrapper للـ fetch calls — يعيد المحاولة على transient failures */
async function fetchWithRetry(url: string, opts: RequestInit, retries = 2): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, opts);
      // أعد المحاولة فقط على 5xx (server errors) أو 429 (rate limited)
      if (res.status >= 500 || res.status === 429) {
        if (attempt < retries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 5000); // exponential backoff
          console.warn(`[Agent] fetch ${res.status}, retrying in ${delay}ms (attempt ${attempt + 1}/${retries})`);
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }
      }
      return res;
    } catch (e) {
      lastError = e;
      if (attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        console.warn(`[Agent] fetch error, retrying in ${delay}ms (attempt ${attempt + 1}/${retries}):`, e);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
    }
  }
  throw lastError;
}

/**
 * generic retry wrapper للـ async operations (يشتغل على أي Promise).
 * يستخدم للـ googleapis SDK calls + Prisma queries اللي ما تستخدم fetch مباشرة.
 * يعيد المحاولة على أي throw (network errors, transient DB locks, rate limits).
 */
async function withRetry<T>(fn: () => Promise<T>, label: string, retries = 2): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (e) {
      lastError = e;
      if (attempt < retries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 5000);
        console.warn(`[Agent] ${label} failed, retrying in ${delay}ms (attempt ${attempt + 1}/${retries}):`, e);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
    }
  }
  throw lastError;
}

async function createNotification(opts: {
  type?: string;
  section: string;
  title: string;
  message: string;
  relatedItemId?: string;
}) {
  try {
    const existing = await db.notification.findFirst({
      where: {
        section: opts.section,
        title: opts.title,
        isRead: false,
        createdAt: { gte: new Date(Date.now() - 60 * 60 * 1000).toISOString() },
      },
    });
    if (existing) return;

    await db.notification.create({
      data: {
        type: opts.type || 'info',
        section: opts.section,
        title: opts.title,
        message: opts.message,
        relatedItemId: opts.relatedItemId || null,
      },
    });
    console.log(`[Agent] Notification: ${opts.title}`);
  } catch (e) {
    console.error('[Agent] createNotification error:', e);
  }
}

// ============================================
// Google OAuth helper
// ============================================

function getGoogleAuthClient() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI;
  if (!clientId || !clientSecret || !redirectUri) return null;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

  // اقرأ tokens من AppSetting
  // (في الإنتاج، هذه تُخزن بعد OAuth flow)
  // هنا نفترض إن tokens محفوظة بـ env مؤقتاً
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;
  if (refreshToken) {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
  }
  return oauth2Client;
}

// ============================================
// GitHub Agent — يفحص commits كل 30 دقيقة
// ============================================

async function githubAgent() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return;

  try {
    const res = await fetchWithRetry('https://api.github.com/user/repos?sort=updated&per_page=5', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github.v3+json' },
    });
    if (!res.ok) {
      console.warn(`[Agent] GitHub API returned ${res.status}`);
      return;
    }
    const repos = await res.json() as Array<{ name: string; pushed_at: string }>;

    for (const repo of repos.slice(0, 3)) {
      const lastPush = new Date(repo.pushed_at);
      const hoursSince = (Date.now() - lastPush.getTime()) / (60 * 60 * 1000);
      if (hoursSince < 1) {
        await createNotification({
          type: 'info',
          section: 'projects',
          title: `Commit جديد بـ ${repo.name}`,
          message: `تم تحديث ${repo.name} — راجع التغييرات`,
        });
      }
    }
  } catch (e) {
    console.error('[Agent] GitHub error:', e);
  }
}

// ============================================
// Google Calendar Agent — أحداث اليوم الحقيقية (googleapis)
// ============================================

async function calendarAgent() {
  const hour = new Date().getHours();
  if (hour < 6 || hour > 10) return; // فقط 6-10 صباحاً

  const authClient = getGoogleAuthClient();
  if (!authClient) {
    console.log('[Agent] Google Calendar: OAuth not configured');
    return;
  }

  try {
    const calendar = google.calendar({ version: 'v3', auth: authClient });
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // retry wrapper للـ googleapis SDK call (transient network/rate-limit errors)
    const res = await withRetry(
      () => calendar.events.list({
        calendarId: 'primary',
        timeMin: todayStart.toISOString(),
        timeMax: todayEnd.toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
      }),
      'Calendar events.list',
    );

    const events = (res.data.items ?? []) as Array<{
      id: string;
      summary: string;
      start?: { dateTime?: string; date?: string };
      location?: string;
    }>;

    for (const event of events.slice(0, 5)) {
      const startTime = event.start?.dateTime || event.start?.date || '';
      const timeLabel = startTime ? new Date(startTime).toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }) : '';
      await createNotification({
        type: 'reminder',
        section: 'smart-schedule',
        title: `موعد اليوم: ${event.summary || 'حدث'}`,
        message: timeLabel ? `الساعة ${timeLabel}${event.location ? ` — ${event.location}` : ''}` : 'موعد اليوم',
        relatedItemId: event.id,
      });
    }

    console.log(`[Agent] Calendar: found ${events.length} events for today`);
  } catch (e) {
    console.error('[Agent] Calendar error:', e);
  }
}

// ============================================
// Gmail Agent — يجلب الإيميلات الجديدة + يصنفها
// ============================================

async function gmailAgent() {
  const authClient = getGoogleAuthClient();
  if (!authClient) return;

  try {
    const gmail = google.gmail({ version: 'v1', auth: authClient });

    // ابحث عن إيميلات آخر 24 ساعة
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const query = `after:${Math.floor(yesterday.getTime() / 1000)} is:unread`;

    // retry wrapper للـ googleapis SDK call
    const res = await withRetry(
      () => gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 10,
      }),
      'Gmail messages.list',
    );

    const messages = (res.data.messages ?? []) as Array<{ id: string }>;
    if (messages.length === 0) {
      console.log('[Agent] Gmail: no new unread messages');
      return;
    }

    let importantCount = 0;
    for (const msg of messages.slice(0, 5)) {
      try {
        // retry wrapper لكل رسالة على حدة (تفشل بمعدل 1-2%)
        const detail = await withRetry(
          () => gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
            format: 'metadata',
            metadataHeaders: ['Subject', 'From'],
          }),
          `Gmail messages.get(${msg.id})`,
        );

        const headers = (detail.data.payload?.headers ?? []) as Array<{ name: string; value: string }>;
        const subject = headers.find((h) => h.name === 'Subject')?.value || '(بدون موضوع)';
        const from = headers.find((h) => h.name === 'From')?.value || '';

        // تصنيف بسيط (يمكن تحسينه بـ AI لاحقاً)
        const isImportant = /مهم|urgent|deadline|موعد|واجب|exam|محاضرة/i.test(subject) ||
                           /no-reply|noreply|notification/i.test(from) === false;
        const isReceipt = /إيصال|receipt|invoice|فاتورة|payment|دفع/i.test(subject);

        if (isImportant) {
          importantCount++;
          await createNotification({
            type: 'info',
            section: 'inbox',
            title: `إيميل جديد: ${subject.slice(0, 50)}`,
            message: `من: ${from.slice(0, 50)}`,
            relatedItemId: msg.id,
          });
        }

        if (isReceipt) {
          await createNotification({
            type: 'info',
            section: 'finance',
            title: `إيصال جديد: ${subject.slice(0, 40)}`,
            message: `تحقق من المعاملات — قد تحتاج لتسجيله`,
          });
        }
      } catch { /* ignore individual message errors */ }
    }

    console.log(`[Agent] Gmail: ${messages.length} unread, ${importantCount} important`);
  } catch (e) {
    console.error('[Agent] Gmail error:', e);
  }
}

// ============================================
// Overdue Tasks Agent
// ============================================

async function overdueTasksAgent() {
  try {
    const today = new Date().toISOString().split('T')[0];
    // retry wrapper للـ Prisma query (transient SQLite locks)
    const overdue = await withRetry(
      () => db.task.findMany({
        where: { completed: false, dueDate: { lt: today, not: '' } },
        take: 5,
      }),
      'Overdue tasks findMany',
    );

    for (const task of overdue.slice(0, 3)) {
      await createNotification({
        type: 'warning',
        section: 'tasks',
        title: `مهمة متأخرة: ${task.text.slice(0, 40)}`,
        message: `موعد ${task.dueDate} تجاوز`,
        relatedItemId: task.id,
      });
    }
  } catch (e) {
    console.error('[Agent] Overdue tasks error:', e);
  }
}

// ============================================
// Background Intelligence Worker — يولّد insights تلقائية
// ============================================

async function insightsWorker() {
  const hour = new Date().getHours();
  if (hour !== 3) return; // فقط 3 صباحاً

  try {
    const events = await db.activityEvent.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() } },
      take: 200,
    });

    if (events.length < 10) return;

    // تحليل بسيط: أكثر قسم نشط
    const sectionCounts: Record<string, number> = {};
    const hourCounts: Record<number, number> = {};
    for (const e of events) {
      sectionCounts[e.section] = (sectionCounts[e.section] || 0) + 1;
      const h = new Date(e.createdAt).getHours();
      hourCounts[h] = (hourCounts[h] || 0) + 1;
    }
    const topSection = Object.entries(sectionCounts).sort((a, b) => b[1] - a[1])[0];
    const topHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];

    let insightText = '';
    if (topSection) insightText += `أكثر نشاطك بـ "${topSection[0]}" (${topSection[1]} مرة). `;
    if (topHour) insightText += `ذروة إنتاجيتك الساعة ${topHour[0]} (${topHour[1]} حدث).`;

    if (insightText) {
      // حفظ AIInsight
      await db.aIInsight.create({
        data: {
          id: crypto.randomUUID(),
          category: 'productivity',
          title: 'رؤية تلقائية',
          content: insightText,
          dataBasedOn: { eventsAnalyzed: events.length },
          createdAt: new Date().toISOString(),
        },
      });
      // Notification
      await createNotification({
        type: 'info',
        section: 'ai-coach',
        title: 'رؤية جديدة',
        message: insightText,
      });
      console.debug('[Agent] Insight created:', insightText);
    }
  } catch (e) {
    console.error('[Agent] Insights worker error:', e);
  }
}

// ============================================
// Main Loop
// ============================================

async function runAllAgents() {
  console.log('[Agent] Running all agents at', new Date().toISOString());
  await Promise.allSettled([
    githubAgent(),
    calendarAgent(),
    gmailAgent(),
    overdueTasksAgent(),
    insightsWorker(),
  ]);
  console.log('[Agent] All agents completed');
}

async function main() {
  console.log(`[Agent] MiMo Agent Service starting on port ${PORT}...`);
  console.log(`[Agent] DB: ${DB_PATH}`);
  console.log(`[Agent] GitHub: ${process.env.GITHUB_TOKEN ? 'configured' : 'NOT set'}`);
  console.log(`[Agent] Google: ${process.env.GOOGLE_CLIENT_ID ? 'configured' : 'NOT set'}`);
  console.log(`[Agent] Gmail: ${process.env.GOOGLE_REFRESH_TOKEN ? 'refresh token set' : 'NO refresh token'}`);
  await db.$connect();
  console.log('[Agent] DB connected');

  await runAllAgents();

  // Schedules
  setInterval(githubAgent, 30 * 60 * 1000);       // 30 min
  setInterval(calendarAgent, 60 * 60 * 1000);      // 1 hour
  setInterval(gmailAgent, 30 * 60 * 1000);         // 30 min
  setInterval(overdueTasksAgent, 30 * 60 * 1000);  // 30 min
  setInterval(insightsWorker, 60 * 60 * 1000);     // 1 hour (checks if 3 AM inside)

  // Health endpoint
  const AGENT_AUTH_TOKEN = process.env.AGENT_SERVICE_TOKEN;
  if (!AGENT_AUTH_TOKEN) {
    console.warn('[Agent] ⚠️ AGENT_SERVICE_TOKEN not set — /trigger endpoint disabled for security');
  }

  Bun.serve({
    port: PORT,
    async fetch(req) {
      const url = new URL(req.url);

      // /health公开 (يعرض الحالة فقط، لا يطلق agents)
      if (url.pathname === '/health') {
        return Response.json({
          status: 'ok',
          timestamp: new Date().toISOString(),
          authRequired: !!AGENT_AUTH_TOKEN,
          agents: {
            github: !!process.env.GITHUB_TOKEN,
            calendar: !!process.env.GOOGLE_CLIENT_ID,
            gmail: !!process.env.GOOGLE_REFRESH_TOKEN,
          },
        });
      }

      // /trigger محمي — يتطلب AGENT_SERVICE_TOKEN في header
      if (url.pathname === '/trigger') {
        if (!AGENT_AUTH_TOKEN) {
          return Response.json({ error: 'AGENT_SERVICE_TOKEN not configured' }, { status: 503 });
        }
        const authHeader = req.headers.get('authorization') || '';
        const providedToken = authHeader.replace('Bearer ', '');
        if (providedToken !== AGENT_AUTH_TOKEN) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
        await runAllAgents();
        return Response.json({ success: true, message: 'Agents triggered' });
      }

      return new Response('MiMo Agent Service', { status: 200 });
    },
  });

  console.log(`[Agent] Health: http://localhost:${PORT}/health`);
  console.log('[Agent] Running. Press Ctrl+C to stop.');
}

main().catch(console.error);
