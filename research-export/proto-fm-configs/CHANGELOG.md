# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- GitHub Actions CI pipeline (lint + typecheck + build on every PR)
- Weekly security audit workflow (bun audit --severity=high)
- Vitest + React Testing Library test setup
- 54 unit tests (rate-limit, language store, translations, content)
- Dockerfile multi-stage (node:22-alpine + non-root user + healthcheck)
- CONTRIBUTING.md with development workflow
- CHANGELOG.md
- Issue and PR templates

### Changed
- Package.json: added test, test:watch, test:coverage, typecheck scripts

---

## [0.2.0] — 2026-07-07

### Added — Phase 1 Security Fixes (per Legendary Audit)
- Caddyfile: SSRF fix — port whitelist (3000, 3003 only) replacing `{query.XTransformPort}`
- next.config.ts: 6 Security Headers (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
- next.config.ts: removed `ignoreBuildErrors: true`, added `reactStrictMode: true`
- `/api/engage`: IP-based rate limiting (5 req/hour) with cleanup + Retry-After headers
- `/api/engage`: honeypot field for bot protection (silent trap)
- engage form: hidden honeypot input + i18n error messages (rate limit, validation)
- LICENSE file (MIT, full text, signed by Mohammed Adil Alakaly, 2026)
- .env.example with all env vars (DATABASE_URL, NEXTAUTH_SECRET, Formspree, Resend)
- .gitignore: added `!.env.example` exception

### Removed
- 11 unused dependencies (next-auth, react-query, react-table, dnd-kit×3, mdxeditor, react-markdown, react-syntax-highlighter, z-ai-sdk, uuid)
- 46 unused shadcn/ui components (kept only toast + toaster)
- worklog.md from public repo (contained sensitive info: admin PIN, AI internals)
- README misleading claims ("ESLint: 0 errors", "MIT License" without file, "cp .env.example")

### Fixed
- git history: redacted admin PIN 1474 → REDACTED via `git filter-repo --replace-text`
- db.ts: disabled `log: ['query']` in production (only dev logging)
- README: corrected claims to be accurate

---

## [0.1.0] — 2026-07-07

### Added — Initial Release
- Multi-page Next.js 16 portfolio (7 routes)
- Arabic RTL + English LTR with full layout switch
- 2026 dark-first design (electric lime + violet accents, glassmorphism, bento grids)
- Real project data: Smart Building Management System (Arduino Mega + ESP8266 + Firebase + Android)
- 8-stage trajectory timeline (1st secondary → future aspirations)
- 9-section case study with real code (Arduino C++ + ESP8266 + Kotlin)
- 6 claims map + 6 capabilities matrix + jury review
- 6 operating principles + 5 how-I-think + 4 the-why + 6 what-I-don't-do
- Engage form API (Zod validated, 4 paths)
- 14 documented problems & solutions
- Market analysis, KNX certificate, 10 mountains, life philosophy
- Self-hosted fonts (Inter, Space Grotesk, JetBrains Mono, Noto Sans Arabic)
- Zustand language store with localStorage persistence
- Scroll-reveal animations + count-up stats (respects prefers-reduced-motion)
- Accessibility: skip-link, focus indicators, ARIA labels, semantic HTML
