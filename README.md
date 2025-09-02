# MorphUI

A flexible, adaptable React + TypeScript UI component library for modern web applications. Built with accessibility, theming, and developer experience in mind.

## ✨ Features

- ⚡ **Reusable Components**: Button, Accordion, Card, Dropdown, Input, Modal, RadioGroup, and more
- 🎨 **Flexible Theming**: CSS custom properties with runtime theme switching
- 🧪 **Type Safe**: Full TypeScript support with comprehensive type definitions
- ♿ **Accessible**: Built following WCAG guidelines and accessibility best practices
- 📚 **Storybook**: Interactive documentation and component playground
- 🛠️ **Modern Build**: Rollup-based bundling with tree-shaking support

## 🚀 Installation

```bash
npm install morphui-react
```

Or with yarn:
```bash
yarn add morphui-react
```

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
import { ThemeProvider } from 'morphui';

const customTheme = {
  'color-primary': '#ff6b6b',
  'color-success': '#51cf66',
  'border-radius': '12px'
};

<ThemeProvider theme={customTheme}>
  {/* Your app components */}
</ThemeProvider>
```

## 📚 Documentation

- **Design System**: See `DESIGN_SYSTEM.md` for comprehensive design tokens and guidelines
- **Documentation Strategy**: See `DOCUMENTATION_STRATEGY.md` for our approach to documentation
- **Storybook**: Run `npm run storybook` for interactive component examples

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/yourusername/MorphUI)
- [Issue Tracker](https://github.com/yourusername/MorphUI/issues)
- [Documentation](https://github.com/yourusername/MorphUI#readme) 