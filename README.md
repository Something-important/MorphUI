# MorphUI

A flexible, adaptable React + TypeScript UI component library for modern web applications. Built with accessibility, theming, and developer experience in mind.

**Live Storybook**: <https://something-important.github.io/MorphUI/>

## ✨ Features

- ⚡ **Reusable Components**: Button, Accordion, Card, Dropdown, Input, Modal, RadioGroup, Sidebar, Table, Tabs, Toast, Tooltip, and more
- 🎨 **Flexible Theming**: CSS custom properties with runtime theme switching across 5 built-in themes (light, dark, cool, warm, purple)
- 🧪 **Type Safe**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessible**: Built following WCAG guidelines and accessibility best practices
- 📚 **Storybook**: Interactive documentation and component playground
- 🛠️ **Modern Build**: Rollup-based ESM/CJS builds — the JS is tree-shakeable (`sideEffects` is limited to CSS), and all styles ship as one extracted stylesheet (`morphui-react/css`)

## 🚀 Installation

MorphUI is currently distributed via GitHub (not yet published to npm as a stable release).

```bash
# Install directly from GitHub
npm install github:Something-important/MorphUI
```

Or with yarn:

```bash
yarn add github:Something-important/MorphUI
```

The package is in active pre-1.0 development — APIs may change between versions. Pin to a specific commit or tag if you need stability.

## 📖 Quick Start

```tsx
import { Button, ThemeProvider, lightTheme } from 'morphui-react';
// Component styles — import once, and load it BEFORE your own stylesheets
// so your CSS can override ours without !important.
import 'morphui-react/dist/morphui.css';

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

See the [Theme Showcase story](https://something-important.github.io/MorphUI/?path=/story/theme-theme-showcase--theme-showcase) for a live preview of all built-in themes.

### Token single source of truth

The theme presets (`src/components/theme/themes/*.ts`) are the **only** place tokens are defined. `theme.css` is generated from `lightTheme` and is never edited by hand. To add or change a token:

1. Add the key to **all five** presets (`light`, `dark`, `cool`, `warm`, `purple`) — a token missing from one preset becomes a stale variable when users switch themes
2. Regenerate: `npm run tokens:generate`
3. CI enforces both rules with `npm run tokens:check` (preset alignment + CSS↔preset equality) and a regeneration diff — a PR that hand-edits `theme.css` or forgets to regenerate will fail

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

## 🧪 Testing

MorphUI uses [Jest](https://jestjs.io/) + [React Testing Library](https://testing-library.com/) + [jest-axe](https://github.com/nickcolley/jest-axe) to keep every component reliable and accessible. The suite currently covers **37 test suites / 1,600+ tests**: one behavioral suite per component, an accessibility smoke suite, and full unit coverage of the `utils` modules (theme, animation, accessibility).

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

- **ESM**: `dist/index.esm.js` - Modern ES modules
- **CommonJS**: `dist/index.js` - Node.js compatibility
- **Types**: `dist/index.d.ts` - TypeScript declarations
- **Styles**: `dist/morphui.css` - all component styles (also reachable as `morphui-react/css`)
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

All pull requests should target the `dev` branch. Merges to `master` are released to GitHub Pages automatically.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/Something-important/MorphUI)
- [Live Storybook](https://something-important.github.io/MorphUI/)
- [Issue Tracker](https://github.com/Something-important/MorphUI/issues)
