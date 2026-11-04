# Roadmap

MorphUI 1.x is shipped. This file tracks what's done and what's next.

**Current release:** `morphui-react@1.1.1` on npm (OIDC trusted publishing
with Sigstore provenance). **2,005 tests** (49 suites), **95.3% statement /
84.7% branch coverage**. React 18 + 19 verified. SSR-compatible. Auto-publish
pipeline proven (6 releases, zero manual dispatch).

**Pending merge to dev (3 feature branches, 2026-11-04):**

- `feat/table-default-selected-rows` — `defaultSelectedRows` for uncontrolled
  selection init (+3 tests).
- `feat/input-uncontrolled` — full uncontrolled mode via `defaultValue`,
  mirroring RadioGroup #71 (+8 tests).
- `feat/chromatic-ci` — `.github/workflows/chromatic.yml` (visual regression
  CI).

Once all three merge → 2,016 tests and the "uncontrolled parity" trio is
complete → ready to cut 1.2.0.

## Done (1.0 → 1.1)

### Foundation (0.9 → 0.13)

- Theme token gate in CI (regenerate + diff `theme.css`).
- CI Node 20 → 22.
- Coverage thresholds 0 → 75%.
- `useAnchoredPosition` extraction (shared hook + pure helpers).
- A11y polish pass on all 5 size-outlier components (62 axe scans).
- Headless hooks API v0 (`useAnchoredPosition`, `useModal`, `useToast`).
- Theme presets as base + overrides (−52% LOC).
- ESM subpath exports (35 tree-shakeable entries).
- Toast queueing (FIFO, no silent loss).
- Size-limit budgets (35 per-component brotli budgets in CI).
- Coverage tightening: Slider 55%→93%, Dropdown 64%→88%, ThemeProvider
  73%→100%, SidebarContext 69%→97%, Input 88%→97%, Combobox 85%→97%,
  DatePicker 87%→99%, Modal 82%→96%.
- Per-component CSS (`morphui-react/css/button`, 35 files).
- Combobox virtualization (`virtualize` + `itemHeight`).
- ESM-only (CJS build dropped).
- Table column pinning (`fixed: 'left' | 'right'`).
- Input full ARIA combobox pattern (arrow-key nav + `aria-activedescendant`).
- Modal adopts `useModal` (focus trap + scroll lock).

### 1.0 breaking changes

- ESM-only — CJS build dropped.
- Deprecated `error` variant removed → use `danger`.
- Alert `error` → `danger` + added `ghost`/`outline`.
- Legacy Sidebar removed (652 + 920 LOC deleted).

### Pre-1.0 audit (7 bugs found + fixed)

- Avatar/Skeleton: `aria-label` on role-less div → `role="img"`.
- Tabs: `tablist` not direct parent of tabs → moved role.
- ThemeProvider: `data-theme` attribute leaked on unmount → fixed.
- Dropdown: `role="group"` on `<li>` → `<div>`.
- Dropdown: false-pass a11y test (wrong prop name) → fixed.
- ContextMenu: `createPortal` unguarded for SSR → added `isMounted`.
- Dropdown: `{...rest}` not spread → aria/data attrs now pass through.

### 1.1 features

- SSR support: all 33 components verified via `renderToString`.
- Documentation: migration guide, theming guide, accessibility guide.
- Community: issue templates, security policy, React 19 verified.
- `React.memo` on 13 basic leaf components.
- Auto-publish pipeline: inlined publish job in `release-please.yml`,
  OIDC trusted publishing with `release-please.yml` as the workflow
  filename on npm.

## Chromatic — baseline published 2026-11-04 ✅ (CI workflow pending merge)

- **Baseline:** published from `dev` @ `9089ea0` — 34 components / 343 stories /
  343 snapshots, Build 1 auto-accepted. Published Storybook at
  `https://6aeb04452c6b25165db46b30-ueaqzjhpry.chromatic.com/`.
- **CI workflow:** `feat/chromatic-ci` branch (commit `918dbe0`) —
  `.github/workflows/chromatic.yml` using `chromaui/action@latest` with
  TurboSnap (`onlyChanged: true`), `exitZeroOnChanges`, `exitOnceUploaded`,
  Node 22, `fetch-depth: 0`. No package.json/lockfile changes (the action
  bundles its own CLI; avoids the chromatic↔storybook vite peer conflict).
- **Secret:** `CHROMATIC_PROJECT_TOKEN` added to GitHub Secrets by the user.
  The PAT cannot manage Actions secrets (Gotcha #10 — separate scope from
  Workflows), so this was a manual one-paste step.
- **What it catches:** pixel-diff regressions across all 343 stories on every
  PR — the class of bug jest/jest-axe structurally cannot see (CSS token
  drift, layout shifts, color changes). Free for OSS repos (Chrome-only;
  cross-browser is a paid tier).

## Short-term (next ~2 weeks)

- **Merge the 3 pending feature branches** above, then cut 1.2.0.
- **size-limit CI fix** — rolldown backend exits 1 on CI even when all
  entries are within limits (first-entry measurement quirk). Currently
  `continue-on-error`. Investigate switching to esbuild preset or
  upgrading size-limit.
- **API consistency audit round 2, continued** — `defaultCurrentPage` and
  `defaultFilters` on Table (same uncontrolled-initial-value pattern as the
  `defaultSelectedRows` fix). `defaultSelectedRows` itself landed on
  `feat/table-default-selected-rows`.
- **Storybook MDX docs** — per-component documentation pages (theming
  examples, a11y notes, migration callouts). No version impact.
- **Rotate the Chromatic project token** — was shared in plaintext during
  setup; reset in Chromatic Manage → update the GitHub Secret value. No
  code changes needed (workflow references the secret by name).

## Medium-term (this quarter)

- **React 19 optimizations** — `use()` for async Combobox loading,
  `useOptimistic` for Toast/selection feedback, `useTransition` for
  expensive filtering. Position for the React 19 transition.
- **FormField rest spread** — same gap as Dropdown (now fixed).
  FormField doesn't spread `{...rest}` on its root.
- **Storybook MDX docs** — per-component documentation pages in the
  Storybook deploy (theming examples, a11y notes, migration callouts).
- **API consistency audit (round 2)** — verify controlled/uncontrolled
  parity across all 33 components; document any gaps.

## Long-term (1–3 months)

- **Visual regression testing** — Chromatic on the 33 component stories,
  or Playwright screenshot tests in CI.
- **Documentation site** — Storybook as the docs portal: theming guide,
  per-component a11y notes, migration guides per breaking release.
- **Community growth** — issue templates (done), demo site, blog posts,
  contribution guide polish.
- **Feature expansion** — DataGrid (Table + filtering + sorting +
  pagination integrated), TreeView, FileUpload. Only after the
  stability + docs work lands.

## Non-goals

- No CSS-in-JS runtime — the single-CSS design is deliberate.
- No component-count expansion before the docs + visual regression
  work lands — polish the 33 existing components first.
- No history rewrites of `master`.

## Definition of done

Every feature lands with: component + tests (jest-axe where relevant) + a
story + exported types + a CHANGELOG entry via conventional commit. CI green
on `master` and `dev`.
