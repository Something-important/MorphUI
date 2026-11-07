# Contributing to MorphUI

Thanks for helping make MorphUI better. This guide covers the development
workflow, code conventions, and the quality gates every change must pass.

- [Architecture overview](docs/ARCHITECTURE.md)
- [Component inventory](docs/COMPONENTS.md)
- [Roadmap](docs/ROADMAP.md)
- [Release & npm publishing setup](PUBLISH_SETUP.md)

## Development setup

Requires Node.js >= 20 and npm >= 8 (see `engines` in `package.json`). CI runs
the test matrix on Node 22; publishing runs on Node 22 — see
[PUBLISH_SETUP.md](PUBLISH_SETUP.md).

```bash
git clone https://github.com/Something-important/MorphUI.git
cd MorphUI
npm install
npm run storybook   # http://localhost:6006
```

### npm scripts

| Script                                  | What it does                                          |
| --------------------------------------- | ----------------------------------------------------- |
| `npm run build`                         | Rollup build to `dist/` (ESM + extracted CSS)         |
| `npm run build:types`                   | TypeScript declarations only                          |
| `npm run build:all`                     | `build:types` + `build` — what gets published         |
| `npm test`                              | Jest suite (jsdom + React Testing Library + jest-axe) |
| `npm run test:ci`                       | Same command CI uses (`jest --ci --coverage`)         |
| `npm run type-check`                    | `tsc --noEmit`                                        |
| `npm run lint`                          | ESLint over `*.ts` / `*.tsx`                          |
| `npm run format` / `format:check`       | Prettier write / check                                |
| `npm run storybook` / `build-storybook` | Dev server / static build                             |
| `npm run tokens:generate`               | Regenerate `theme.css` from `lightTheme.ts`           |
| `npm run tokens:check`                  | Theme token single-source-of-truth gate               |
| `npm run verify`                        | Everything CI runs, in one command                    |

## Branching model

- `master` — the release branch. Merges here trigger release-please, npm
  publishing, and the Storybook deploy to GitHub Pages.
- `dev` — the integration branch. **All pull requests target `dev`.**
- Feature branches are cut from `dev` and named `feat/…`, `fix/…`, `docs/…`,
  `test/…`, `ci/…`, or `chore/…`.
- Periodic `dev` → `master` merges cut releases.

### Commit messages

This repo uses [Conventional Commits](https://www.conventionalcommits.org/),
and PR titles are linted by the Semantic PR workflow. Allowed types: `feat`,
`fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`,
`revert` — scope optional.

Format: `type(scope): imperative summary`

Examples:

- `feat(tooltip): add flip modifier support`
- `fix(slider): correct keyboard step for page keys`
- `docs(readme): document the css import path`

`feat` and `fix` commits merged to `master` become changelog entries and
version bumps via release-please; `docs`, `ci`, `chore`, and friends do not
bump the version.

## Component conventions

Every component lives in `src/components/<tier>/<Component>/` and ships four
files:

```
Button/
├── Button.tsx          implementation
├── Button.css          styles, token-driven via var(--*)
├── Button.stories.tsx  Storybook story
└── index.ts            public exports
```

`src/components/basic/Button/` is the reference implementation. The pattern:

- `forwardRef` on the root element; an `as` prop for polymorphism where it
  makes sense (Button renders `button`, or `a` when `href` is set).
- Export the props interface and every variant/size union type
  (`ButtonProps`, `ButtonVariant`, `ButtonSize`); the root barrel
  `src/components/index.ts` re-exports all of them.
- Color-ish props (`color`, `gradient`, `textColor`, `borderColor`, `shadow`)
  accept a literal (`"#ff6b6b"`), a CSS variable (`"--color-primary"`), or a
  theme key (`"color-primary"`), resolved through `resolveThemeValue` from
  `src/utils/theme.ts`.
- Accessibility props (`ariaLabel`, `ariaDescribedBy`, …) alongside a `…rest`
  pass-through; shared helpers come from `src/utils/accessibility.ts`.
- Animation helpers (`createRipple`, `animateIn`, `safeAnimate`) from
  `src/utils/animation.ts`, which respects `prefers-reduced-motion`.
- CSS class names are BEM-ish blocks scoped to the component
  (`.btn-component`, `.btn-component--danger`); values reference theme custom
  properties, never hard-coded colors.

### Theming rules

The theme presets in `src/components/theme/themes/` are the single source of
truth for design tokens. `theme.css` is generated — never edit it by hand.
When adding or changing a token:

1. Add the key to **all five** presets (`light`, `dark`, `cool`, `warm`,
   `purple`). A token missing from one preset becomes a stale variable when
   users switch themes.
2. Run `npm run tokens:generate` to regenerate `theme.css`.
3. CI enforces the gate through `test/theme-tokens.test.ts` in the Jest
   suite: preset key parity, token-count sanity, and `theme.css` ↔
   `lightTheme` equality. A hand-edited `theme.css` or preset drift fails
   the build. An explicit CI step that regenerates and diffs `theme.css`
   byte-for-byte is prepared and pending — see the
   [roadmap](docs/ROADMAP.md).

## Testing

- Tests live in `test/<Component>.test.tsx` — one behavioral suite per
  component, plus cross-cutting suites for theme tokens, animation, and
  accessibility helpers.
- Query elements the way users do: `getByRole`, `getByLabelText`,
  `getByText` — resilient to markup changes.
- Assert behavior and accessibility rather than implementation details; use
  `@testing-library/jest-dom` matchers such as `toBeVisible()` and
  `toHaveAttribute()`.
- jest-axe is wired up — use it for accessibility smoke checks on rendered
  output.
- Run everything with `npm test`; watch mode with `npm test -- --watch`.

The suite is currently 48 suites / 1,974 tests and finishes in ~33 seconds.
Coverage thresholds are 0 (informational only); raising them is on the
[roadmap](docs/ROADMAP.md).

## Definition of done

A change is complete when it includes the implementation, tests (jest-axe
where relevant), a Storybook story, exported types, and lands via a
conventional commit. CI must be green: `lint` → `format:check` →
`tsc --noEmit` → `jest --ci --coverage` (which includes the theme token
invariants) → `build:all`.
