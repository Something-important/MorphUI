# Roadmap

Prioritized goals for MorphUI. The housekeeping section was completed on
2026-11-02.

## Done (2026-11-02 housekeeping)

- Synced `dev` from `master` (fast-forward — dev had zero unique commits).
- Landed the in-repo knowledge base: `CONTRIBUTING.md`, `PUBLISH_SETUP.md`,
  `docs/ARCHITECTURE.md`, `docs/COMPONENTS.md`, this file.
- Cleaned 14 stale local branches — `ci/npm-publish` was superseded and
  deleted; `ci/token-gate` was reviewed, verified green against the current
  tree, and preserved as a patch (see the first short-term item).

## Short-term (next ~2 weeks) — quality + consistency

- **Apply the theme token gate to `ci.yml`** — insert a step between the
  Prettier check and Typecheck that runs `python3
scripts/generate_theme_css.py`, fails on `git diff --exit-code --
src/components/theme/theme.css`, then runs `npm run tokens:check`. Verified
  green against the current tree; needs a web-UI edit or a PR because the
  automation token cannot push workflow-file changes.
- **CI Node 20 → 22** — one-line change in `ci.yml`; aligns with the publish
  workflow.
- **Coverage thresholds 0 → 70%** in `jest.config.js`, tighten later. Current
  soft spots visible in the coverage report: Slider (~54% statements) and
  ThemeProvider (~76%).
- **Extract `useAnchoredPosition`** shared by Tooltip / Popover / Dropdown /
  ContextMenu — removes three re-implementations and shrinks the biggest
  files.
- **A11y polish pass per component** — one component per branch, gated by the
  existing jest-axe harness. Start with the size outliers: Dropdown (689
  LOC), the Sidebar family (~2.5k), Input (644), Popover (642), Table (625).

## Medium-term (this month) — package ergonomics

- **Per-component ESM exports + `preserveModules`**: subpath exports
  (`morphui-react/button`), per-component CSS (`morphui-react/css/button`),
  optional sourcemap exclusion (~1.8 MB of the 3.2 MB unpacked size is
  source maps). Ship as 0.10.0 with a size-comparison table in the
  changelog.
- **`size-limit` budgets in CI** once subpath exports land.
- **Headless hooks API v0**: export `useAnchoredPosition`, `useModal`,
  `useToast` as public API.
- **Theme presets from base + semantic overrides** instead of five ~442-line
  hand-maintained files (the token gate already proves key parity; collapse
  the duplication it polices).
- **Feature parity checks** for Toast / Combobox / Table — queueing,
  virtualization hooks, and column pinning are the usual asks.

## Long-term (1–3 months) — v1.0.0 readiness

- **API stability audit → freeze → 1.0.0**: consistent `size`/`variant`
  everywhere, controlled + uncontrolled parity, `aria-*` pass-through, and a
  public deprecation policy.
- **Visual regression testing** — Chromatic on the 33 component stories, or
  Playwright screenshot tests in CI.
- **Documentation site** — Storybook as the docs portal: theming guide,
  per-component a11y notes, migration guides per breaking release.
- Optional: React 19-only optimizations behind a peer-dep range bump at
  1.0.0.
- Community: issue templates; this file stays the living roadmap.

## Non-goals

- No CSS-in-JS runtime — the 0.9.0 single-CSS design is deliberate.
- No component-count expansion before the size/hooks work lands — polish the
  33 existing components first.
- No history rewrites of `master` (decided 2026-11-02: the debug-iteration
  commits stay as plain history).

## Definition of done

Every feature lands with: component + tests (jest-axe where relevant) + a
story + exported types + a CHANGELOG entry via conventional commit. CI green
on `master` and `dev`.
