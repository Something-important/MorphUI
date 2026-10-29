# MorphUI

A flexible, adaptable React + TypeScript UI component library for modern web applications. Built with accessibility, theming, and developer experience in mind.

**Live Storybook**: <https://something-important.github.io/MorphUI/>

## ✨ Features

- ⚡ **Reusable Components**: Button, Accordion, Card, Dropdown, Input, Modal, RadioGroup, Sidebar, Table, Tabs, Toast, Tooltip, and more
- 🎨 **Flexible Theming**: CSS custom properties with runtime theme switching across 5 built-in themes (light, dark, cool, warm, purple)
- 🧪 **Type Safe**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessible**: Built following WCAG guidelines and accessibility best practices
- 📚 **Storybook**: Interactive documentation and component playground
- 🛠️ **Modern Build**: Rollup-based bundling with tree-shaking support

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
import { Button, ThemeProvider, defaultTheme } from 'morphui-react';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
    </ThemeProvider>
  );
}
```

## 🎨 Theming

MorphUI uses CSS custom properties for flexible theming:

```tsx
import { ThemeProvider } from 'morphui-react';

const customTheme = {
  'color-primary': '#ff6b6b',
  'color-success': '#51cf66',
  'border-radius': '12px',
};

<ThemeProvider theme={customTheme}>{/* Your app components */}</ThemeProvider>;
```

See the [Theme Showcase story](https://something-important.github.io/MorphUI/?path=/story/theme-theme-showcase--theme-showcase) for a live preview of all built-in themes.

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

Features: six variants (`success` / `error` / `warning` / `info` / `primary` / `secondary`), six screen positions, auto-dismiss with **pause-on-hover**, stacked viewport with `maxToasts`, optional action buttons, `duration: 0` for sticky toasts, and full theming support. A presentational `Toast` component is also exported for direct use without a provider.

## 📚 Documentation

- **Live Storybook**: Browse all components and interact with them at <https://something-important.github.io/MorphUI/>
- **Run locally**: `npm run storybook` opens Storybook at `http://localhost:6006/`
- **Build a static copy**: `npm run build-storybook` produces a `storybook-static/` folder you can deploy anywhere

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

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
