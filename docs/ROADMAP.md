# Roadmap

MorphUI 1.x is shipped. This file tracks what's done and what's next.

**Current release:** `morphui-react@1.1.0` on npm (OIDC trusted publishing
with Sigstore provenance). **2,005 tests** (49 suites), **95.3% statement /
84.7% branch coverage**. React 18 + 19 verified. SSR-compatible. Auto-publish
pipeline proven (5 releases, zero manual dispatch).

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

## Short-term (next ~2 weeks)

- **Chromatic visual regression** — needs a Chromatic account +
  `CHROMATIC_PROJECT_TOKEN` secret. Workflow ready to wire up; snapshots
  all 33 stories on every PR.
- **size-limit CI fix** — rolldown backend exits 1 on CI even when all
  entries are within limits (first-entry measurement quirk). Currently
  `continue-on-error`. Investigate switching to esbuild preset or
  upgrading size-limit.

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
