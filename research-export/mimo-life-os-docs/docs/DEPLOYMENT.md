# 🚀 Deployment Guide — MiMo Life OS

## Prerequisites

- [Bun](https://bun.sh/) 1.0+ (runtime + package manager)
- [Git](https://git-scm.com/)
- OpenSSL (for generating secrets)

## Quick Start (Local Development)

```bash
# 1. Clone the repository
git clone https://github.com/mohammadfhgjvhgi/x7k2m9p3.git
cd x7k2m9p3

# 2. Install dependencies
bun install

# 3. Set up environment variables
cp .env.example .env  # or create .env manually

# 4. Generate session secret
echo "MIMO_SESSION_SECRET=$(openssl rand -hex 32)" >> .env

# 5. Push database schema
bun run db:push

# 6. Start development server
bun run dev

# 7. Open http://localhost:3000
# First visit will prompt for password setup
```

## Environment Variables

Create a `.env` file in the project root:

```env
# Required
DATABASE_URL=file:./db/custom.db
MIMO_SESSION_SECRET=<32+ char random hex>

# Optional: GitHub Integration
GITHUB_TOKEN=ghp_xxx
GITHUB_USERNAME=your-username
GITHUB_ARCHIVE_REPO=mimo-archive

# Optional: Google Calendar
GOOGLE_CLIENT_ID=xxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxx
GOOGLE_REDIRECT_URI=http://localhost:3000/api/google/callback

# Optional: Dropbox
DROPBOX_APP_KEY=xxx
DROPBOX_APP_SECRET=xxx
DROPBOX_ACCESS_TOKEN=sl.xxx
DROPBOX_REDIRECT_URI=http://localhost:3000/api/dropbox/callback

# Optional: Web Push
VAPID_PUBLIC_KEY=xxx
VAPID_PRIVATE_KEY=xxx
VAPID_SUBJECT=mailto:you@example.com
```

## Production Deployment

### Option 1: VPS (Recommended)

```bash
# 1. SSH into your server
ssh user@your-server

# 2. Clone + install
git clone https://github.com/mohammadfhgjvhgi/x7k2m9p3.git
cd x7k2m9p3
bun install

# 3. Set up .env (IMPORTANT: set MIMO_SESSION_SECRET!)
cp .env.example .env
nano .env  # edit with production values

# 4. Build for production
bun run build

# 5. Push database schema
bun run db:push

# 6. Start production server
bun run start

# 7. Set up reverse proxy (Nginx/Caddy)
# Example Caddyfile:
# yourdomain.com {
#   reverse_proxy localhost:3000
# }
```

### Option 2: PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start with PM2
pm2 start "bun run start" --name mimo-life-os

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Option 3: Docker

```dockerfile
FROM oven/bun:1

WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "start"]
```

```bash
docker build -t mimo-life-os .
docker run -p 3000:3000 -v $(pwd)/db:/app/db -v $(pwd)/.env:/app/.env mimo-life-os
```

## Post-Deployment Checklist

- [ ] `.env` has `MIMO_SESSION_SECRET` (32+ chars)
- [ ] Database schema pushed (`bun run db:push`)
- [ ] Password set (first visit prompts setup)
- [ ] HTTPS enabled (via Caddy/Nginx/Let's Encrypt)
- [ ] Firewall allows port 3000 (or your proxy port)
- [ ] Backups directory exists (`mkdir -p backups`)
- [ ] Uploads directory exists (`mkdir -p public/uploads`)
- [ ] Watchdog running (optional: `bun run dev:safe`)

## Backup Strategy

### Automatic Backups
The app creates automatic ZIP backups:
- Stored in `backups/` directory
- Keeps last 7 backups
- Runs daily (BackupScheduler component)

### Manual Backup
```bash
# Via API
curl -X POST -b cookies.txt http://localhost:3000/api/backup/create

# Via file system
cp db/custom.db backups/custom-$(date +%Y%m%d).db
```

### Cloud Backup (Dropbox)
1. Set up Dropbox tokens in `.env`
2. Navigate to Dropbox section in app
3. Click "رفع الآن" to upload backup

## Updating

```bash
# Pull latest changes
git pull origin main

# Install any new dependencies
bun install

# Push any schema changes
bun run db:push

# Rebuild
bun run build

# Restart server
pm2 restart mimo-life-os  # if using PM2
# or
bun run start
```

## Troubleshooting

### Server won't start
```bash
# Run startup check
bun run check

# Check .env exists and has MIMO_SESSION_SECRET
cat .env | grep MIMO_SESSION_SECRET

# Clear cache
rm -rf .next
bun run dev
```

### Login fails (401)
```bash
# Check if password hash exists
bun -e "import {PrismaClient} from '@prisma/client'; const p = new PrismaClient(); p.appSetting.findUnique({where:{key:'passwordHash'}}).then(r => console.log(r ? 'EXISTS' : 'MISSING'))"

# If missing, reset password
bun run scripts/ensure-password.ts
```

### Database locked (SQLITE_BUSY)
```bash
# WAL mode should prevent this. Check:
bun -e "import {PrismaClient} from '@prisma/client'; const p = new PrismaClient(); p.\$queryRaw\`PRAGMA journal_mode\`.then(r => console.log(r))"
# Should return: [{"journal_mode":"wal"}]
```

### Rate limit triggered
- Login: 5 attempts / 15 minutes per IP
- Wait 15 minutes or restart server (clears in-memory rate limiter)

## Security Notes

- **NEVER** commit `.env` to Git (it's in `.gitignore`)
- **NEVER** use the fallback session secret in production
- **ALWAYS** use HTTPS in production
- **ALWAYS** set `MIMO_SESSION_SECRET` before first run
- The `startup-check.ts` script verifies these on every server start
