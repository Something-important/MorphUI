# Architecture

The current state of MorphUI as of 0.9.0. For where it is headed, see
[ROADMAP.md](./ROADMAP.md).

## Source layout

```
src/
├── components/
│   ├── basic/         14 components — Button, Input, Checkbox, Toggle, Switch, …
│   ├── interactive/    7 components — Modal, Dropdown, Slider, Accordion, …
│   ├── composition/   12 components — Table, Tabs, Toast, Sidebar, Form, …
│   ├── theme/         ThemeProvider, theme.css (generated), 5 preset themes
│   └── index.ts       the public export surface
├── utils/             theme.ts (347 LOC), animation.ts (269), accessibility.ts (404)
└── stories/           Storybook assets + Configure.mdx
test/                  38 Jest suites (one per component + cross-cutting)
scripts/               theme token tooling in Python (generate + check)
```

The tiers encode complexity: `basic` holds leaf presentational and input
components, `interactive` holds stateful single-purpose widgets, and
`composition` holds multi-part or provider-based components.

### Component anatomy

Each component folder contains `Component.tsx`, `Component.css`,
`Component.stories.tsx`, and `index.ts`, re-exported through the tier and the
root barrel. Implementation conventions, with `basic/Button` as the reference:

- `forwardRef` on the root element; an `as` prop for polymorphism where useful
  (Button renders `button`, or `a` when `href` is set).
- Exported props interface plus variant/size union types (`ButtonProps`,
  `ButtonVariant`, `ButtonSize`), all re-exported from
  `src/components/index.ts`.
- Color-ish props (`color`, `gradient`, `textColor`, `borderColor`, `shadow`)
  accept a literal, a CSS variable, or a theme key, resolved through
  `resolveThemeValue` (`src/utils/theme.ts`).
- A11y props (`ariaLabel`, `ariaDescribedBy`, …) plus `…rest` pass-through;
  helpers from `src/utils/accessibility.ts` (`getAriaProps`, `trapFocus`,
  `announceToScreenReader`, …).
- Animation helpers (`createRipple`, `animateIn`, `safeAnimate`) from
  `src/utils/animation.ts`, with `prefers-reduced-motion` respected.

### Notable export-surface details

- `Toast` ships both a presentational component and a provider:
  `ToastProvider` + `useToast()` (the hook throws outside the provider).
- `Sidebar` exposes two APIs — the legacy single component and the composed
  `SidebarRoot` / `SidebarHeader` / `SidebarContent` / `SidebarItem` / …
  family. `SidebarItemProps` is deliberately **not** re-exported: two distinct
  interfaces carry that name (legacy vs. composition), so only one can own
  the public symbol.
- The theme system (`export * from './theme'`) contributes `ThemeProvider`,
  `useTheme`, `useThemeOptional`, the five presets plus the `themes` map,
  `createTheme`, `mergeThemes`, `resolveThemeValue`, and friends.
- Utility functions (`createRipple`, `debounce`, `generateId`, `trapFocus`,
  …) are public API, re-exported from the root barrel.

## Theming

Theming is token-driven with **flat token maps**:

- Five presets — `lightTheme`, `darkTheme`, `coolTheme`, `warmTheme`,
  `purpleTheme` — each defining the identical set of **353 tokens across 49
  families** (color, radius, spacing, shadow, animation, z-index, …). Preset
  files are ~442 lines each.
- `ThemeProvider` merges `baseTheme` + `theme` overrides and applies the
  tokens as inline CSS custom properties on a target element (default
  `document.documentElement`; scope to a subtree with the `target` prop). It
  cleans up stale variables when the theme changes or on unmount, sets an
  optional `data-theme` attribute, and exposes the active theme through
  `useTheme()` (throws outside a provider) and `useThemeOptional()`.
- `theme.css` (464 lines) holds the no-provider `:root` defaults. It is
  **generated from `lightTheme.ts`** by `scripts/generate_theme_css.py` and
  never hand-edited.
- Single-source-of-truth gate: `scripts/check_theme_tokens.py`
  (`npm run tokens:check`) verifies that all five presets define the
  identical key set and that `theme.css` matches `lightTheme`.
  `test/theme-tokens.test.ts` enforces the same guarantees inside the Jest
  suite that CI runs: preset key parity, token-count sanity, `createTheme`
  round-trip coverage, z-index stacking order, and `theme.css` ↔
  `lightTheme` equality. An explicit regenerate-and-diff CI step is prepared
  and pending application — see [ROADMAP.md](./ROADMAP.md).

Since 0.9.0 there is **no runtime style injection**: consumers import
`morphui-react/css` (the single extracted stylesheet) once, before their own
stylesheets, so user CSS can override component CSS without `!important`.

## CSS strategy

- Hand-written per-component CSS (~14.9k lines) referencing theme custom
  properties (`var(--color-primary)`).
- Class naming: BEM-ish blocks scoped per component (`.btn-component`,
  `.btn-component--danger`, `.btn-component--hover-glow`). There is no
  universal `morphui-` prefix.
- Component styles live in `@layer`s, so unlayered user CSS wins specificity
  fights.
- Build-time extraction: `rollup-plugin-postcss` concatenates and minifies
  everything into a single `dist/morphui.css` (~300 kB).
- `package.json` declares `sideEffects: ["**/*.css"]`, so the JS stays
  tree-shakeable while CSS imports are preserved.

## Build & package

Rollup 4, single entry `src/components/index.ts`:

| Output                               | Size                                        |
| ------------------------------------ | ------------------------------------------- |
| `dist/index.js` (CJS)                | 457 kB                                      |
| `dist/index.esm.js` (ESM)            | 449 kB                                      |
| Source maps (shipped in the tarball) | ~908 kB each                                |
| `dist/morphui.css` (minified)        | ~300 kB                                     |
| npm tarball                          | 99 files, 487.7 kB packed / 3.2 MB unpacked |

- Peer dependencies (react, react-dom) are externalized; TypeScript
  declarations are emitted via `tsconfig.build.json`, which excludes
  `*.stories.tsx` and `src/stories` so no Storybook declarations leak into
  `dist`.
- `exports` map: `.` (types/import/require), `./css`, `./dist/*`,
  `./package.json`.
- **Single-bundle architecture**: there are no per-component subpath exports
  yet — any import pulls the full JS bundle (tree-shaking helps ESM
  consumers; CSS is all-or-nothing). Changing this is the top roadmap item.

## Quality infrastructure

- **Jest 29 + React Testing Library + jest-axe**, jsdom environment, CSS
  mocked via `identity-obj-proxy`. 38 suites / 1,606 tests, ~33 seconds, all
  green. Coverage thresholds are currently 0 (informational only).
- **CI** (`.github/workflows/ci.yml`): lint → prettier check →
  `tsc --noEmit` → `jest --ci --coverage` → `build:all`, on pushes and PRs
  to `master` and `dev`. Node 20. The theme token invariants run inside the
  Jest step; an explicit gate step is pending — see [ROADMAP.md](./ROADMAP.md).
- **Storybook 9** (react-vite) with 33 component stories plus a Theme
  Showcase; `deploy-storybook.yml` publishes to GitHub Pages on `master`.
- **release-please** (node, `bump-minor-pre-major`) plus **semantic-pr**
  title linting; `publish.yml` performs OIDC trusted publishing on `v*` tags
  — see [PUBLISH_SETUP.md](../PUBLISH_SETUP.md).
