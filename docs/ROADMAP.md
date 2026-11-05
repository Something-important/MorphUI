# Roadmap

MorphUI 1.x is shipped. This file tracks what's done and what's next.

**Current release:** `morphui-react@1.2.0` on npm (2026-11-04, OIDC trusted
publishing with Sigstore provenance, logIndex 3691602716). **2,038 tests**
(49 suites), **95.3% statement / 84.7% branch coverage**. React 18 + 19
verified. SSR-compatible. Auto-publish pipeline proven (7 releases, zero
manual dispatch).

**dev + master in sync @ `997c436`** (2026-11-04): v1.2.0 released. The
controlled/uncontrolled parity audit is complete — all 33 components are
consistent. Chromatic CI is live. Ready for the next round of feature work.

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

## Chromatic — baseline published + CI live 2026-11-04 ✅

- **Baseline:** published from `dev` @ `9089ea0` — 34 components / 343 stories /
  343 snapshots, Build 1 auto-accepted. Published Storybook at
  `https://6aeb04452c6b25165db46b30-ueaqzjhpry.chromatic.com/`.
- **CI workflow:** merged to dev (`b37fab0`) — `.github/workflows/chromatic.yml`
  using `chromaui/action@latest` with TurboSnap (`onlyChanged: true`),
  `exitZeroOnChanges`, `exitOnceUploaded`, Node 22, `fetch-depth: 0`. No
  package.json/lockfile changes (the action bundles its own CLI; avoids the
  chromatic↔storybook vite peer conflict).
- **First CI run:** verified success on the merged dev push (`7672f37`, run
  41814507601). TurboSnap re-snapshotted the Table + Input stories; no
  regressions flagged; the uncontrolled-parity changes are now part of the
  baseline.
- **Secret:** `CHROMATIC_PROJECT_TOKEN` added to GitHub Secrets by the user.
  The PAT cannot manage Actions secrets (Gotcha #10 — separate scope from
  Workflows), so this was a manual one-paste step.
- **What it catches:** pixel-diff regressions across all 343 stories on every
  PR — the class of bug jest/jest-axe structurally cannot see (CSS token
  drift, layout shifts, color changes). Free for OSS repos (Chrome-only;
  cross-browser is a paid tier).

## API consistency audit — complete 2026-11-04 ✅

Swept all 33 components for controlled/uncontrolled parity gaps. Three
real gaps found and fixed (all merged to dev):

- **Dropdown** — was controlled-only (`onChange` required, no `defaultValue`).
  Added full uncontrolled mode via `defaultValue`. (+8 tests)
- **Accordion** — was uncontrolled-only (`defaultOpen` but no controlled
  `open`). Added controlled `open?` prop + isControlled pattern. (+5 tests)
- **Drawer** — was controlled-only (`isOpen` + `onClose` both required).
  Added uncontrolled mode via `defaultOpen?`; `isOpen`/`onClose` now
  optional. (+5 tests)
- **Table** — `defaultCurrentPage` + `defaultFilters` added (pagination
  and filtering were already uncontrolled-capable but had no initial-value
  seed). (+4 tests)

Modal left as-is — controlled-only is the overlay convention (Radix/shadcn/
MUI all do this); the focus-trap/scroll-lock side effects make uncontrolled
mode an a11y risk.

All 33 components are now consistent: every stateful component supports
both controlled and uncontrolled modes (except Modal, by design).

## Storybook MDX docs — complete 2026-11-04 ✅

All 32 components have co-located `.mdx` documentation files with:

- Overview + usage code blocks (controlled + uncontrolled where applicable)
- Accessibility notes (ARIA roles, keyboard nav, focus management)
- Auto-generated props table (`<Controls />` from TypeScript types)
- All stories rendered in canvases (`<Stories />`)

The Storybook config already loaded `**/*.mdx`; no config changes were
needed. Removed `tags: ['autodocs']` from all 32 `.stories.tsx` files —
the MDX files create the docs page, so the autodocs tag was creating
redundant second pages.

Deployed via GitHub Pages (on master push) + Chromatic published
Storybook (live per-PR review URL).

## Short-term (next ~2 weeks)

- **Rotate the Chromatic project token** — was shared in plaintext during
  setup; reset in Chromatic Manage → update the GitHub Secret value. No
  code changes needed (workflow references the secret by name).
- **FormField rest spread audit** — verify no other components have the
  same `{...rest}` pass-through gap that Dropdown had (now fixed).
- **v1.3.0 release** — when there are enough `feat:` commits to warrant
  a minor bump. Currently dev has only `fix:`/`docs:`/`ci:` commits since
  v1.2.0, so release-please won't bump.

## Medium-term (this quarter)

- **React 19 API adoption** — `useTransition` (Table sorting, Input
  validation) and `useDeferredValue` (Combobox filter) are already in
  place. React 19 compatibility is verified (all 2,038 tests pass
  against React 19.3.1) and a CI matrix job runs the suite against both
  React 18 and 19 on every PR. The remaining React 19 APIs — `use()` for
  promise unwrapping, `useOptimistic` for optimistic updates,
  `useActionState`/`useFormStatus` for form actions — are designed for
  server components / server actions, which a pure client-side UI
  library doesn't directly benefit from without a consumer-side pattern
  shift (Suspense boundaries, form actions). These will be adopted when
  there's a concrete consumer pattern that clearly benefits.
- **FormField rest spread** — same gap as Dropdown (now fixed). Verify no
  other components have the same `{...rest}` pass-through gap.

## Long-term (1–3 months)

- **Documentation site** — Storybook as the docs portal: theming guide,
  per-component a11y notes, migration guides per breaking release.
  Chromatic published Storybook is already live; MDX docs are the next
  step (see short-term).
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
