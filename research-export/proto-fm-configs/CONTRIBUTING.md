# Contributing to Engineering Identity Platform

Thank you for your interest in contributing! This document outlines the workflow.

---

## 🚀 Getting Started

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/proto-fm.git
   cd proto-fm
   ```
3. **Install** dependencies:
   ```bash
   bun install
   ```
4. **Set up** environment:
   ```bash
   cp .env.example .env
   # Edit .env with your DATABASE_URL
   ```
5. **Start** dev server:
   ```bash
   bun run dev
   ```

---

## 🔄 Development Workflow

### Branching
- `main` — production-ready code
- `feature/description` — new features
- `fix/description` — bug fixes
- `docs/description` — documentation only

### Commit Convention (Semantic Commits)
```
type(scope): description

[optional body]

[optional footer]
```

**Types:**
- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation only
- `style:` — formatting, no code change
- `refactor:` — code change that neither fixes a bug nor adds a feature
- `test:` — adding tests
- `chore:` — build process, auxiliary tools

**Examples:**
```
feat(engage): add CSRF protection to form API
fix(trajectory): correct year label for stage 3
docs(readme): update installation instructions
test(rate-limit): add edge case for IP rotation
```

### Pull Request Process
1. Create a branch from `main`
2. Make your changes
3. Run quality checks:
   ```bash
   bun run lint
   bun run typecheck
   bun run test
   ```
4. Ensure all CI checks pass
5. Create a PR with a clear description
6. Wait for review

---

## 📝 Code Style

- **TypeScript** everywhere — strict mode
- **ESLint** — must pass with 0 errors
- **Naming:**
  - Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
  - Functions: `camelCase` (e.g., `getProjects`)
  - Constants: `UPPER_CASE`
  - Types/Interfaces: `PascalCase`
- **Single Responsibility** — one component per file
- **No `any`** — use proper types
- **No `console.log`** in production code (use proper logging)

---

## 🧪 Testing

- **Unit tests:** Vitest + React Testing Library
- **E2E tests:** Playwright
- **Coverage target:** 70% for `src/lib/` and `src/app/api/`

Run tests:
```bash
bun run test              # run once
bun run test:watch        # watch mode
bun run test:coverage     # with coverage report
```

---

## 🌐 Internationalization

- All user-facing strings go in `src/lib/translations.ts`
- All structured content goes in `src/lib/content.ts`
- Both files use `{ ar: string; en: string }` bilingual format
- Arabic is RTL (default), English is LTR
- Never hardcode strings in components

---

## 🐛 Reporting Issues

Use the issue templates:
- **Bug Report:** describe the bug, steps to reproduce, expected vs actual
- **Feature Request:** describe the feature, use case, proposed solution

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
