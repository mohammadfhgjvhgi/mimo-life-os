# PROJECT_FILE_INVENTORY

> Phase 1 — Complete workspace inspection.
> Distinguishes: **existing scaffold** vs **future AI system** vs **research material** vs **temporary artifacts**.

## Inspection Summary

| Metric | Value |
|---|---|
| Total files inspected | 85 (tracked) + runtime/scaffold files |
| Source files (src/) | 62 (60 shadcn/ui components + 2 hooks + 2 lib + 3 app + 1 api) |
| Config files | 9 |
| Prisma schema | 1 (2 models: User, Post — placeholder) |
| Specification / research material | 2 (upload/) |
| Build/runtime scripts | 11 (.zscripts/, tests/) |
| Mini-service stubs | 1 (mini-services/.gitkeep) |
| Examples | 2 (websocket demo) |

## Categories (kept strictly separate)

### A. Existing Project (current scaffold)
A standard Next.js 16 + TypeScript + Tailwind 4 + shadcn/ui + Prisma scaffold. **Not** the MiMo AI system. It is the empty container into which the AI Runtime will be built.

### B. Future AI System (MiMo AI)
Does not exist yet. Defined in this Phase 1 documentation set (`docs/`). The scaffold's `src/` will be progressively replaced/extended in Phase 2.

### C. Research Material
`upload/` — two source documents describing the technology inventory and the immersion protocol.

### D. Temporary / Runtime Artifacts (gitignored)
`node_modules/`, `.next/`, `db/custom.db`, `dev.log`, `*.pid`, `tool-results/`, `worklog.md`.

---

## File-by-File Inventory

### Application source — `src/app/`
| Path | Type | Purpose | State | Affects future AI? | Action |
|---|---|---|---|---|---|
| `src/app/layout.tsx` | TSX | Root layout, fonts, Toaster, metadata | Active | Yes (shell) | Evolve in Phase 2 |
| `src/app/page.tsx` | TSX | Home route — placeholder logo page | Active, placeholder | Yes | Replace in Phase 2 |
| `src/app/globals.css` | CSS | Tailwind theme tokens, dark mode | Active | Yes (theming) | Preserve + extend |
| `src/app/api/route.ts` | TS | Hello-world GET endpoint | Active, placeholder | Yes (API layer) | Replace with real API |

### UI components — `src/components/ui/` (60 files)
Full shadcn/ui (New York) component set: accordion, alert, alert-dialog, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input, input-otp, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, sonner, switch, table, tabs, textarea, toast, toaster, toggle, toggle-group, tooltip.
- **State:** Active, pristine shadcn output.
- **Affects future AI?** Yes — UI shell for console/dashboard.
- **Action:** Preserve; consume from Phase 2 features.

### Hooks — `src/hooks/`
| Path | Purpose | Action |
|---|---|---|
| `src/hooks/use-mobile.ts` | Media query hook | Preserve |
| `src/hooks/use-toast.ts` | Toast state hook | Preserve |

### Lib — `src/lib/`
| Path | Purpose | Action |
|---|---|---|
| `src/lib/utils.ts` | `cn()` class merge helper | Preserve |
| `src/lib/db.ts` | Prisma singleton client | Preserve; expand with repos |

### Database — `prisma/` + `db/`
| Path | Purpose | State | Action |
|---|---|---|---|
| `prisma/schema.prisma` | SQLite datasource + 2 placeholder models (User, Post) | Placeholder | **Replace** with MiMo schema in Phase 2 |
| `db/custom.db` | SQLite file | Runtime, gitignored | Regenerate via `db:push` |

### Configuration
| Path | Purpose | Notes |
|---|---|---|
| `package.json` | Manifest + scripts (`dev`, `lint`, `db:push`...) | Deps: Next 16, React 19, Prisma 6, z-ai-web-dev-sdk, zustand, tanstack-query, framer-motion, next-auth, socket.io-ready |
| `tsconfig.json` | TS config, `@/*` path alias | Preserve |
| `next.config.ts` | Next config | Preserve |
| `tailwind.config.ts` | Tailwind theme | Preserve |
| `postcss.config.mjs` | PostCSS | Preserve |
| `eslint.config.mjs` | ESLint flat config | Preserve |
| `components.json` | shadcn config (New York) | Preserve |
| `bun.lock` | Lockfile | Preserve |

### Infrastructure / Gateway
| Path | Purpose | Notes |
|---|---|---|
| `Caddyfile` | Reverse-proxy gateway on `:81`; routes `?XTransformPort=N` to `localhost:N`, default → `:3000` | **Critical infra constraint**: only one external port; cross-service calls must use `XTransformPort` query param |
| `.zscripts/*.sh` | Build/dev/mini-service orchestration scripts | Runtime tooling |
| `tests/*.sh` | DB + python runtime build tests | Runtime tooling |

### Examples / Stubs
| Path | Purpose | Action |
|---|---|---|
| `examples/websocket/server.ts` | Socket.io server demo (port 3003 pattern) | Reference for real-time layer |
| `examples/websocket/frontend.tsx` | Socket.io client demo (`io("/?XTransformPort=3003")`) | Reference for real-time layer |
| `mini-services/.gitkeep` | Placeholder for independent bun services | Pattern for Agent/Tool runtime services |

### Public assets
| Path | Purpose |
|---|---|
| `public/logo.svg` | Z.ai logo |
| `public/robots.txt` | Crawl rules |

### Research material — `upload/`
| Path | Lines | Purpose |
|---|---|---|
| `upload/تقنيات بناء ai شهر 8 2026.txt` | 22,495 | Technology inventory — ~1,500 techniques across 34 categories |
| `upload/Pasted Content_1786280875960.txt` | 3,279 | Strategic plan + Phase 1 Immersion Protocol (the prompt being executed) |

### Phase 1 deliverables — `docs/` (this phase)
Created during Phase 1. See `KNOWLEDGE_INDEX.md` for the full map.

---

## Current State vs Target State

**CURRENT STATE:** A generic, empty Next.js scaffold. No AI runtime, no model layer, no memory, no agents, no tools, no execution engine. The Prisma schema has throwaway `User`/`Post` models. The home page shows a logo. The API returns `{ message: "Hello, world!" }`.

**TARGET STATE (MiMo AI):** A coherent autonomous AI system: GLM-5.2 as model brain behind a Model Gateway; layered Runtime (Context, Memory, Knowledge, Reasoning, Planning, Executive, Agents, Tools, Execution, Verification, Recovery, Learning, Autonomy, Security, Observability, Evaluation); long-horizon capable; resumable; observable; secure; extensible without rewrite. Detailed in `MASTER_ARCHITECTURE.md`.

## Reuse / Replace Decisions
- **Reuse:** Next.js 16 App Router, TS, Tailwind 4, shadcn/ui, Prisma, z-ai-web-dev-sdk, zustand, tanstack-query, framer-motion, socket.io pattern, Caddy gateway, mini-service pattern.
- **Replace:** `page.tsx` (→ MiMo console), `api/route.ts` (→ real API surface), `prisma/schema.prisma` (→ MiMo data model).
- **Preserve as reference:** `examples/websocket/*`, `mini-services/.gitkeep`.
