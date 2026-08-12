# Worklog

## F1 — Split `src/lib/content.ts` into `src/content/` modules

**Goal:** Split the 1283-line monolithic `src/lib/content.ts` into focused modules
under `src/content/` while preserving every existing `@/lib/content` import.

### Files created

| File                          | Purpose                                                                                 |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| `src/content/types.ts`        | `Bilingual` type + re-export of `Lang` from `../lib/translations`                       |
| `src/content/project.ts`      | Smart Building deep-dive: featuredProject, projectSections/Problem/Constraints/Architecture/Components, codeSnippets, testProtocol, projectResults, lessons, verification + their interfaces |
| `src/content/proof.ts`        | claims, capabilities, recognition, problemsSolutions + Claim/Capability/ProblemSolution interfaces |
| `src/content/philosophy.ts`   | principles, howThink, theWhy, dontDo + Principle/HowThink/TheWhy interfaces             |
| `src/content/trajectory.ts`   | trajectory, skillsLearned + TimelineEntry/Skill interfaces                              |
| `src/content/academic.ts`     | academicSubjects, academicSummary, universityPlan, professionalGoals, marketInsight, additionalProjects + AcademicSubject/MiniProject interfaces |
| `src/content/market.ts`       | marketAnalysis, knxCertificate, tenMountains, lifePhilosophy + Mountain interface       |
| `src/content/misc.ts`         | techStack, channels, projectGallery, solarSpecs, costBreakdown, dipSwitchModes, futureDevelopments + GalleryImage interface |

### Barrel file (`src/lib/content.ts`)

- `export * from "../content/{project,proof,philosophy,trajectory,academic,market,misc}"`
- `export type { Bilingual, Lang } from "../content/types"` — backward compat
- `pick<T>(item, lang)` helper kept here (it needs `Lang` from `./translations`)

### Import-path rules honored

- Every content module imports `Bilingual` from `./types`.
- Every content module needing `Lang` would import it from `../lib/translations`
  (none actually need it; only `pick` in the barrel uses `Lang`).
- No data values were changed. No exports renamed.

### Verification

- `bunx tsc --noEmit` → exit 0 (clean)
- `bun run lint` → exit 0 (clean)
- `bun run test` → **56 / 56 tests passed** across 5 test files
  (`content.test.ts` 30, `translations.test.ts` 10, `rate-limit.test.ts` 9,
  `store.test.ts` 5, `email.test.ts` 2)

### Status

Complete — all callers (`@/lib/content` imports in `src/app/**` and
`src/components/site/**`) continue to work without any change.
