# MorphUI

A flexible, adaptable React + TypeScript UI component library for modern web applications. Built with accessibility, theming, and developer experience in mind.

**Live Storybook**: <https://something-important.github.io/MorphUI/>

## ✨ Features

- ⚡ **39 Components**: Button, Input, Modal, Sidebar, Table, Tabs, Toast, Tooltip, Combobox, DatePicker, Dropdown, Carousel, CommandPalette, FileUpload, Rating, Slider, TreeView, and more — organized into Primitives (14), Composition (13), and Patterns (12) tiers
- 🎨 **Flexible Theming**: CSS custom properties with runtime theme switching across 5 built-in themes (light, dark, cool, warm, purple)
- 🧪 **Type Safe**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessible**: Built following WCAG guidelines and accessibility best practices
- 📚 **Storybook**: Interactive documentation with a global theme toolbar, Design Tokens page, and Token Builder
- 🛠️ **Modern Build**: ESM-only, Rollup-based, tree-shakeable (`sideEffects` is limited to CSS), with 41 per-component subpath exports for granular imports
- 🌐 **RTL Support**: Logical CSS properties throughout — toggle RTL via the Storybook toolbar to see layouts flip correctly

## 🚀 Installation

```bash
npm install morphui-react
```

Or with yarn:

```bash
yarn add morphui-react
```

Or with pnpm:

```bash
pnpm add morphui-react
```

MorphUI requires React 18 or 19 as a peer dependency. The package is ESM-only and tree-shakeable.

## 📖 Quick Start

```tsx
import { Button, ThemeProvider, lightTheme } from 'morphui-react';
// Component styles — import once, and load it BEFORE your own stylesheets
// so your CSS can override ours without !important.
import 'morphui-react/css';

function App() {
  return (
    <ThemeProvider theme={lightTheme} dataTheme="light">
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

The built-in presets are exported as `lightTheme`, `darkTheme`, `warmTheme`, `coolTheme` and `purpleTheme` (also grouped in the `themes` object).

## 🎨 Theming

MorphUI uses CSS custom properties for flexible theming. Every component reads tokens (`--color-*`, `--spacing-*`, `--z-*`, …) with sensible fallbacks, so three override layers are available, in increasing precedence:

1. **Global tokens** — override via `ThemeProvider` (or plain CSS on `:root`)
2. **Per-instance props** — `color`, `gradient`, `textColor`, `borderColor`, `shadow`… accept a literal (`"#ff6b6b"`), a CSS var (`"--color-primary"`) or a theme key (`"color-primary"`)
3. **Escape hatches** — `style` (always wins) and `className` (component styles live in `@layer`s, so your unlayered CSS always wins — we never ship `!important` against you)

```tsx
import { ThemeProvider, createTheme } from 'morphui-react';

// Structured tokens (hover/active shades are derived automatically)
const brand = createTheme({
  colors: { primary: '#ff6b6b', success: '#51cf66' },
  radii: { lg: '12px' },
  zIndex: { modal: '1050' },
  // raw vars for anything else
  vars: { 'switch-width-md': '44px' },
});

// Or a flat partial override on top of a preset:
const customTheme = {
  'color-primary': '#ff6b6b',
  'color-success': '#51cf66',
  'border-radius': '12px',
};

<ThemeProvider theme={customTheme} baseTheme={brand}>
  {/* Your app components */}
</ThemeProvider>;
```

`ThemeProvider` merges `baseTheme` + `theme`, cleans up stale variables when the theme changes, can scope to a subtree via the `target` prop, sets a `data-theme` attribute, and exposes the active theme through `useTheme()`.

See the [Theme Showcase](https://something-important.github.io/MorphUI/?path=/story/foundations-theme-showcase--all-themes) story for a live preview of all built-in themes.

### Token single source of truth

The theme presets (`src/components/theme/themes/*.ts`) are the **only** place tokens are defined. `theme.css` is generated from `lightTheme` and is never edited by hand. To add or change a token:

1. Add the key to **all five** presets (`light`, `dark`, `cool`, `warm`, `purple`) — a token missing from one preset becomes a stale variable when users switch themes
2. Regenerate: `npm run tokens:generate`
3. CI enforces both rules through the mirrored Jest suite (`test/theme-tokens.test.ts`: preset alignment + CSS↔preset equality) — a PR that hand-edits `theme.css` or lets the presets drift will fail

## 🔔 Toast Notifications

Wrap your app in a `ToastProvider` and fire notifications from anywhere with the `useToast()` hook:

```tsx
import { ToastProvider, useToast, Button } from 'morphui-react';

function SaveButton() {
  const { toast } = useToast();

  return <Button onClick={() => toast.success('Saved', 'Your changes were stored.')}>Save</Button>;
}

function App() {
  return (
    <ToastProvider position="bottom-right" duration={4000} maxToasts={3}>
      <SaveButton />
    </ToastProvider>
  );
}
```

Features: six variants (`success` / `danger` / `warning` / `info` / `primary` / `secondary`; `error` still works as a deprecated alias of `danger`), six screen positions, auto-dismiss with **pause-on-hover**, stacked viewport with `maxToasts`, optional action buttons, `duration: 0` for sticky toasts, and full theming support. A presentational `Toast` component is also exported for direct use without a provider.

## 📚 Documentation

- **Live Storybook**: Browse all components and interact with them at <https://something-important.github.io/MorphUI/>
- **Run locally**: `npm run storybook` opens Storybook at `http://localhost:6006/`
- **Build a static copy**: `npm run build-storybook` produces a `storybook-static/` folder you can deploy anywhere
- **Migrating from Radix/shadcn?** See the [Radix → MorphUI migration guide](./docs/MIGRATION-FROM-RADIX.md)
- **Engineering docs**: architecture, theming guide, a11y guide, migration
  guide, component inventory, roadmap, and the publish pipeline live in
  [`docs/`](./docs) — start at [`docs/README.md`](./docs/README.md); the
  contribution workflow is in [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## 🧪 Testing

MorphUI uses [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) + [jest-axe](https://github.com/nickcolley/jest-axe) to keep every component reliable and accessible. The suite currently covers **55 test suites / 2,177 tests**: one behavioral suite per component, an accessibility smoke suite, and full unit coverage of the `utils` modules (theme, animation, accessibility).

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run a single test file
npm test -- Toast

# Same command CI uses (adds --ci and coverage thresholds)
npm run test:ci
```

### Writing tests for components

- Tests live in the top-level [`test/`](./test) folder as `<Component>.test.tsx`.
- Query elements the way users do: by role, label, and text (`getByRole`, `getByLabelText`) — this keeps tests resilient to markup changes.
- Assert behavior and accessibility rather than implementation details; use `@testing-library/jest-dom` matchers such as `toBeVisible()` and `toHaveAttribute()`.
- For pure helpers (like the `utils/` modules), plain unit tests are enough — no rendering required.

Pull requests that add or change a component should include or update its test suite; CI runs the full suite on every push to `dev` and `master`.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build the library
npm run build

# Build with TypeScript declarations
npm run build:all

# Run all pre-push checks (type-check, lint, format, test, build)
npm run verify
```

## 📦 Package Contents

- **ESM**: `dist/index.esm.js` + `dist/esm/` — Modern ES modules (tree-shakeable)
- **Types**: `dist/` — TypeScript declarations (`.d.ts`)
- **Styles**: `dist/morphui.css` — all component styles (also reachable as `morphui-react/css`, or per-component as `morphui-react/css/<name>`)
- **Per-component subpaths**: 41 JS + 41 CSS subpath exports (e.g. `morphui-react/button`, `morphui-react/css/button`)
- **Source Maps**: For debugging and development

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests and update documentation
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

All pull requests should target the `master` branch. Merges to `master` trigger CI (tests, lint, size budgets, Chromatic) and the Storybook deploy workflow.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/Something-important/MorphUI)
- [Live Storybook](https://something-important.github.io/MorphUI/)
- [Issue Tracker](https://github.com/Something-important/MorphUI/issues)
