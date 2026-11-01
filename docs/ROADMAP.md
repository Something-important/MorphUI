# Roadmap

Prioritized goals for MorphUI. The housekeeping section was completed on
2026-11-02.

## Done (2026-11-02 housekeeping)

- Synced `dev` from `master` (fast-forward — dev had zero unique commits).
- Landed the in-repo knowledge base: `CONTRIBUTING.md`, `PUBLISH_SETUP.md`,
  `docs/ARCHITECTURE.md`, `docs/COMPONENTS.md`, this file.
- Cleaned 14 stale local branches — `ci/npm-publish` was superseded and
  deleted; `ci/token-gate` was reviewed, verified green against the current
  tree, and preserved as a patch (landed the same day, below).
- **Applied the theme token gate to `ci.yml`** (`a42c2a5`) — between the
  Prettier check and Typecheck, CI regenerates `theme.css` and fails on
  any diff, then runs `npm run tokens:check`. First CI run green;
  unblocked by granting the automation token workflow-file push access.
- **CI Node 20 → 22** (`22f8ff1`) — aligns with the publish workflow;
  green on the first run.
- **Coverage thresholds 0 → 70%** (PR #18) — global floor on all four
  metrics; current coverage has 7–16 points of headroom.
- **Extracted `useAnchoredPosition`** (PR #19) — new `src/hooks/` module
  (pure `computeAnchoredPosition` / `clampToViewport` + the hook) shared by
  Tooltip (615 → 509 LOC), Popover (643 → 539), and ContextMenu; fixed
  Popover's detached `top`/`left` coordinate math and the never-firing
  viewport clamp; 25 new tests (1,631 total). Internal for now — public
  export lands with the hooks API v0 milestone. Dropdown keeps its
  pure-CSS relative positioning; it never shared this math.

## Short-term (next ~2 weeks) — quality + consistency

- **A11y polish pass per component** — one component per branch, gated by the
  existing jest-axe harness. **Dropdown done** (PR #20: restructured the open
  listbox so only `role="option"`/`role="group"` children sit inside it,
  replaced nested checkboxes with decorative `aria-hidden` spans, 10 new
  axe tests across all states). **Sidebar family done** (PR #21: fixed two
  dangling ARIA references in `SidebarGroup` that axe does not catch in
  jsdom — `aria-controls` pointed at a conditionally-rendered region,
  `aria-labelledby` at an element with no id; the content region is now
  always mounted + hidden when collapsed, the title span carries the label
  id; 13 axe tests + 3 explicit relationship assertions). Remaining: Input
  (644), Table (625), Popover (539).

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
