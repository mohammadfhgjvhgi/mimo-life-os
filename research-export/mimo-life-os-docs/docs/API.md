# 📡 API Documentation — MiMo Life OS

## Base URL
```
http://localhost:3000/api  (development)
https://your-domain.com/api  (production)
```

## Authentication
All protected endpoints require a session cookie (`mimo-session`) obtained via `POST /api/auth/verify`.

Public endpoints (no auth required):
- `GET /api/auth/status`
- `POST /api/auth/verify`
- `POST /api/auth/setup`
- `POST /api/auth/logout`
- `GET /api/public/*` (requires API key instead)
- `POST /api/webhooks/zapier` (requires secret header)

---

## Auth Endpoints

### POST /api/auth/verify
Login with password.

**Request:**
```json
{
  "password": "string",
  "fingerprint": "string (optional)"
}
```

**Response 200:**
```json
{
  "success": true,
  "deviceStatus": "trusted | new | primary-setup",
  "deviceWarning": "string | null"
}
```

**Response 401:** `{ "error": "كلمة السر غير صحيحة" }`
**Response 429:** `{ "error": "تم تجاوز عدد المحاولات..." }` (5 attempts / 15 min)

### GET /api/auth/status
Check if password is set.

**Response:** `{ "passwordSet": true | false }`

### POST /api/auth/setup
First-time password setup.

**Request:** `{ "password": "string" }`
**Response:** `{ "success": true }` or `{ "error": "already set" }`

### POST /api/auth/change-password
Change password (requires auth).

**Request:** `{ "currentPassword": "string", "newPassword": "string" }`
**Response:** `{ "success": true }`

---

## Data Endpoints

### GET /api/data/init
Load all data (50+ tables in parallel via Promise.all).

**Response:** JSON object with all sections.

### GET /api/data/[section]
Get all items in a section (projects, skills, tasks, notes, etc.).

### POST /api/data/[section]
Create a new item. Validates JSON body format.

### PUT /api/data/[section]
Update an item. Requires `id` in body.

### DELETE /api/data/[section]?id=xxx
Delete an item by ID.

### POST /api/data/migrate
Import all data (transactional with 50MB size limit).

### POST /api/data/settings
Save settings only (non-destructive — doesn't wipe data).

### DELETE /api/data/clear
Clear all data (preserves passwordHash + masterPasswordHash).

---

## Device Endpoints

### GET /api/devices
List all trusted devices.

### POST /api/devices/register
Register or update a device fingerprint.

### POST /api/devices/request-approval
Request approval (sends push notification, rate limited 3/hour).

### POST /api/devices/approve
Approve with 6-digit code (constant-time comparison).

### POST /api/devices/reject
Reject approval request.

### GET /api/devices/pending
List pending requests (auto-expires old ones).

### POST /api/devices/cleanup
Deactivate devices inactive 90+ days.

---

## Integration Endpoints

### GitHub
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/github/repos | List repos + sync records |
| POST | /api/github/repos | Import repo as project |
| POST | /api/github/sync | Sync commits |
| POST | /api/github/archive | Monthly archive to GitHub |

### Google Calendar
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/google/auth | Start OAuth |
| GET | /api/google/callback | OAuth callback |
| GET | /api/google/calendar | List events |
| POST | /api/google/calendar | Create event |

### Dropbox
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/dropbox/auth | Check config |
| GET | /api/dropbox/callback | OAuth callback |
| GET | /api/dropbox/upload | List backups |
| POST | /api/dropbox/upload | Create + upload ZIP backup |

---

## Public API (API Key Auth)

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/public/projects | Portfolio projects |
| GET | /api/public/skills | Skills list |
| GET | /api/public/achievements | Achievements |

**Auth:** `x-api-key` header
**Rate Limit:** 60 req/min per IP

---

## Export Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/export/markdown | Notes + journal as MD |
| GET | /api/export/csv?section=tasks | Section as CSV |
| GET | /api/export/all-formats | ZIP (JSON + MD + CSV + PDF) |

---

## Data Protection

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/snapshots/yearly | List snapshots |
| POST | /api/snapshots/yearly | Create snapshot |
| POST | /api/snapshots/create | Create current year |
| GET | /api/integrity/check | Run 11 integrity checks |
| POST | /api/integrity/fix | Auto-fix issues |
| GET | /api/versions | List version history |
| POST | /api/versions | Create version |

---

## API Keys

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/api-keys | List (masked) |
| POST | /api/api-keys | Create key |
| PUT | /api/api-keys?id=xxx | Regenerate |
| DELETE | /api/api-keys?id=xxx | Revoke |

---

## Rate Limiting

| Endpoint | Limit | Window |
|----------|-------|--------|
| /api/auth/verify | 5 attempts | 15 min |
| /api/master-password/verify | 5 attempts | 15 min |
| /api/devices/request-approval | 3 requests | 1 hour |
| /api/public/* | 60 requests | 1 min |

---

## Webhooks

### POST /api/webhooks/zapier
Receive webhook from Zapier.

**Headers:** `x-webhook-secret: YOUR_SECRET`
**Body:** `{ "section": "tasks", "data": {...} }`
