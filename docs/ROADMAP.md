# Roadmap

MorphUI 1.x is shipped. This file tracks what's done and what's next.

**Current release:** `morphui-react@2.1.0` on npm (2026-11-08, OIDC trusted
publishing with Sigstore provenance). **2,296 tests** (61 suites), **91.8%
statement / 83.2% branch coverage**. **40 components** + **7 headless
hooks**. React 18 + 19 verified. SSR-compatible. Auto-publish pipeline
proven (27 tagged releases, zero manual dispatch).

**master @ `e1f9dff`** (2026-11-08): v2.0.0 Storybook sprint (12 phases,
PRs #82–#92) and the v2.1.0 roadmap sprint (Radix migration guide,
OTPInput, token consolidation, 5 extracted headless hooks, utility
adoption) both shipped. 52 sidebar entries across 6 sections (Getting
Started, Foundations, Primitives, Composition, Patterns, Hooks), ~26k→~5k
story LOC (-81%), 240 logical CSS properties (RTL functional), 354 design
tokens, build 17.33s→~11s. Chromatic CI is live. Lint passes
(0 errors, 4 pre-existing jsx-a11y warnings in Dropdown/TreeView). All 40
components have MDX docs. Ready for the
next round of feature work.

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

All 39 components are now consistent: every stateful component supports
both controlled and uncontrolled modes (except Modal, by design).

## Storybook MDX docs — complete 2026-11-04 ✅

All 39 components have co-located `.mdx` documentation files with:

- Overview + usage code blocks (controlled + uncontrolled where applicable)
- Accessibility notes (ARIA roles, keyboard nav, focus management)
- Auto-generated props table (`<Controls />` from TypeScript types)
- All stories rendered in canvases (`<Stories />`)

The Storybook config already loaded `**/*.mdx`; no config changes were
needed. Removed `tags: ['autodocs']` from all 39 `.stories.tsx` files —
the MDX files create the docs page, so the autodocs tag was creating
redundant second pages.

Deployed via GitHub Pages (on master push) + Chromatic published
Storybook (live per-PR review URL).

## v1.4.0 — shipped 2026-11-06 ✅

6 new components (33 → 39):

- **TreeView** (#34) — hierarchical data display with expand/collapse, keyboard nav
- **FileUpload** (#35) — drag-and-drop with validation, file list, controlled/uncontrolled
- **CommandPalette** (#36) — Cmd+K search palette with fuzzy search, grouped results
- **Carousel** (#37) — sliding content with autoplay, arrows, dots, touch/swipe
- **Rating** (#38) — star rating with half-star precision, keyboard nav
- **TagInput** (#39) — tag/chip input with Enter/comma to add, Backspace to remove

2 feature enhancements:

- **Table** — column resizing (drag handle) + row expansion (expandable + renderExpandedRow)
- **DatePicker** — range mode (select start + end date with visual highlighting)

+115 tests (2,038 → 2,153).

## Short-term (next ~2 weeks)

- **Ship v2.1.1 patch** — `morphui-react/css/otp-input` resolves to
  `dist/css/otp-input.css`, but the kebab-casing in
  `scripts/generate_component_css.cjs` wrote `o-t-p-input.css` (consecutive
  capitals), so the published v2.1.0 subpath import is broken. Fix landed
  locally (acronym-aware casing + a build-time export validator); push,
  merge, then merge the pending release-please v2.1.1 PR. Also sync `dev`.
- **Rotate the Chromatic project token** — was shared in plaintext during
  setup; reset in Chromatic Manage → update the GitHub Secret value. No
  code changes needed (workflow references the secret by name).
- **FormField rest spread audit** — verify no other components have the
  same `{...rest}` pass-through gap that Dropdown had (now fixed).
- **Next minor (v2.2.0)** — when there are enough `feat:` commits.
  Remaining candidates: SegmentedControl, ColorPicker, DataGrid,
  MentionInput. (OTPInput and the migration guide shipped in v2.1.0.)

## Medium-term (this quarter)

- **React 19 API adoption** — `useTransition` (Table sorting, Input
  validation) and `useDeferredValue` (Combobox filter) are already in
  place. React 19 compatibility is verified (all 2,153 tests pass
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
  Chromatic published Storybook is already live; MDX docs are complete
  (all 40 components).
- **Community growth** — issue templates (done), demo site, blog posts,
  contribution guide polish.
- **Feature expansion** — DataGrid (Table + filtering + sorting +
  pagination integrated), SegmentedControl, ColorPicker,
  MentionInput. Only after the stability + docs work lands.

## Non-goals

- No CSS-in-JS runtime — the single-CSS design is deliberate.
- No history rewrites of `master`.

## Definition of done

Every feature lands with: component + tests (jest-axe where relevant) + a
story + exported types + a CHANGELOG entry via conventional commit. CI green
on `master` and `dev`.
