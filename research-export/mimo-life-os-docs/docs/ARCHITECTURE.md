# 🏗️ Architecture Diagram — MiMo Life OS

## System Overview

```mermaid
graph TB
    subgraph "Client (Browser)"
        A[React 19 + Next.js 16] --> B[Zustand Store - 15 Slices]
        B --> C[useShallow Selectors]
        A --> D[Section Registry - 68 lazy chunks]
        A --> E[Error Boundary]
        A --> F[PWA Service Worker]
    end

    subgraph "API Layer (Next.js API Routes)"
        G[Middleware - Auth + Rate Limit]
        G --> H[Auth Routes]
        G --> I[Data Routes]
        G --> J[Device Routes]
        G --> K[Integration Routes]
        G --> L[Export Routes]
        G --> M[Public API Routes]
    end

    subgraph "Business Logic (src/lib)"
        N[Auth Server - bcrypt + HMAC]
        O[Encryption - AES-256-GCM + PBKDF2]
        P[Rate Limiter - In-Memory]
        Q[Auto Backup - ZIP + archiver]
        R[Data Integrity - 11 checks]
        S[AI Service - GLM API]
        T[GitHub/Google/Dropbox Services]
    end

    subgraph "Data Layer"
        U[(SQLite - 62 tables)]
        V[Prisma ORM]
        W[AppSetting - Key/Value]
    end

    A -->|HTTP + httpOnly Cookie| G
    H --> N
    H --> O
    I --> V
    J --> V
    K --> T
    L --> Q
    M --> P
    V --> U
    W --> U
```

## Store Architecture (15 Slices)

```mermaid
graph LR
    subgraph "Zustand Store"
        A[core.ts<br/>init + migrate + clear] 
        B[projects.ts]
        C[tasks.ts]
        D[notes.ts]
        E[finance.ts]
        F[vault.ts]
        G[university.ts<br/>410 lines - largest]
        H[career.ts]
        I[ai.ts]
        J[health.ts]
        K[goals.ts]
        L[sharing.ts]
        M[devices.ts]
        N[integrations.ts]
        O[misc.ts<br/>448 lines]
    end

    P[sync-helpers.ts<br/>syncCreate/Update/Delete] --> A
    P --> B
    P --> C
    P --> D
    A --> Q[API /api/data/*]
    B --> Q
    C --> Q
```

## Security Architecture

```mermaid
graph TB
    subgraph "Layer 1: Network"
        A[HTTPS + httpOnly Cookies]
        B[SameSite=Lax]
    end

    subgraph "Layer 2: Authentication"
        C[bcrypt 12 rounds]
        D[HMAC-SHA256 Session Tokens]
        E[Rate Limiting 5/15min]
    end

    subgraph "Layer 3: Authorization"
        F[Middleware - all /api/*]
        G[Session Verification]
        H[Trusted Device Check]
    end

    subgraph "Layer 4: Data Protection"
        I[AES-256-GCM Encryption]
        J[PBKDF2 600k iterations]
        K[Master Password]
    end

    subgraph "Layer 5: Input Validation"
        L[JSON Body Validation]
        M[URL Scheme Check]
        N[HTML Escape - XSS Prevention]
    end

    A --> C --> F --> I --> L
```

## Section Registry Pattern

```mermaid
graph LR
    A[page.tsx] --> B["renderSectionFromLib(section, skeleton)"]
    B --> C{SECTION_REGISTRY Map}
    C -->|dashboard| D[DashboardSection - direct]
    C -->|projects| E[Suspense + lazy load]
    C -->|tasks| F[Suspense + lazy load]
    C -->|...68 total| G[Suspense + lazy load]
    E --> H[ErrorBoundary]
    F --> H
    G --> H
```

## Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant C as Component
    participant S as Zustand Store
    participant A as API Route
    participant D as Database

    U->>C: Click "Add Task"
    C->>S: addTask(task)
    S->>S: Optimistic update (set state)
    S->>A: POST /api/data/tasks
    A->>A: Validate JSON body
    A->>A: Check session
    A->>D: prisma.task.create()
    D-->>A: Created task
    A-->>S: 200 OK + task object
    S-->>C: State updated (confirmed)
    C-->>U: UI shows new task
```

## Technology Stack

```
┌─────────────────────────────────────────────┐
│              Frontend                       │
├─────────────────────────────────────────────┤
│ Next.js 16 (App Router + Turbopack)         │
│ React 19 + TypeScript 5                     │
│ Tailwind CSS 4 + shadcn/ui (New York)      │
│ Framer Motion (animations)                  │
│ Recharts (charts)                           │
│ Zustand 5 (state - 15 slices)              │
│ Cairo font (Arabic RTL)                     │
├─────────────────────────────────────────────┤
│              Backend                        │
├─────────────────────────────────────────────┤
│ Next.js API Routes (55 routes)              │
│ Prisma 6 ORM + SQLite (WAL mode)           │
│ bcrypt + AES-256-GCM + PBKDF2 (600k)       │
│ HMAC-SHA256 sessions                        │
│ z-ai-web-dev-sdk (GLM AI)                   │
├─────────────────────────────────────────────┤
│              Infrastructure                 │
├─────────────────────────────────────────────┤
│ Bun (runtime + package manager)             │
│ PWA (manifest + service worker)             │
│ Web Push (VAPID)                            │
│ Startup Check + Watchdog (auto-restart)     │
└─────────────────────────────────────────────┘
```
