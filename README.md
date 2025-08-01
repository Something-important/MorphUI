# MorphUI

A flexible, adaptable React + TypeScript UI component library. Includes reusable components such as Button, Accordion, Card, Dropdown, Input, Modal, and RadioGroup, with built-in theming, Storybook documentation, and tests.

## Features
- ⚡ Reusable, accessible React components
- 🎨 Theming support
- 🧪 Unit tests for reliability
- 📚 Storybook for documentation and visual testing
- 🛠️ TypeScript for type safety

## Components
- Button
- Accordion
- Card
- Dropdown
- Input
- Modal
- RadioGroup

## Getting Started

### Installation

Clone the repository:
```bash
git clone https://github.com/Something-important/MorphUI.git
cd MorphUI
```
Install dependencies:
```bash
npm install
```

### Running Storybook
```bash
npm run storybook
```

### Running Tests
```bash
npm test
```

## Usage
Import components in your React project:
```tsx
import { Button, Input, Modal } from 'morphui';

function App() {
  return <Button variant="primary">Click me</Button>;
}
```

## Development
- Components are in `src/components/`
- Stories are in `src/components/*/*.stories.tsx` and `src/stories/`
- Tests are in `test/`

### Build the library
```bash
npm run build
```

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Add tests and update documentation as needed
5. Commit and push (`git commit -m 'Add feature' && git push`)
6. Open a pull request

## License
MIT 