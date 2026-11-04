# Theming Guide

MorphUI uses a CSS custom property (CSS variable) token system. Every
color, spacing, radius, shadow, and animation is a token. This guide
covers the built-in themes, creating custom themes, and the base +
overrides architecture.

## How theming works

1. **Tokens** are CSS custom properties (`--color-primary`,
   `--spacing-md`, `--shadow-lg`, etc.) defined on `:root`.
2. **`theme.css`** is generated from `lightTheme.ts` by
   `scripts/generate_theme_css.py` — it sets the `:root` defaults.
3. **`ThemeProvider`** merges your overrides onto the base and writes
   them to the DOM (either `document.documentElement` for global themes,
   or a scoped element for subtree themes).
4. **Components** consume tokens via `var(--color-primary)` in their CSS.
   User stylesheets can override any token without `!important`.

## Built-in themes

Five presets ship with the package:

| Theme             | Use case                                      |
| ----------------- | --------------------------------------------- |
| `light` (default) | Light backgrounds, dark text                  |
| `dark`            | Dark backgrounds, light text                  |
| `warm`            | Warm color temperature (amber/orange accents) |
| `cool`            | Cool color temperature (blue/teal accents)    |
| `purple`          | Purple accent palette                         |

### Using a built-in theme

```tsx
import { ThemeProvider } from 'morphui-react';

// Wrap your app — the theme is applied to document.documentElement
function App() {
  return (
    <ThemeProvider theme="dark">
      <YourApp />
    </ThemeProvider>
  );
}
```

### Theme presets architecture (base + overrides)

Since 1.0, each preset is `{ ...lightTheme, ...overrides }` — only the
tokens that differ from the light base are listed. This makes adding a
new theme trivial (~85 lines instead of ~442):

```ts
// src/components/theme/themes/myTheme.ts
import { lightTheme } from './lightTheme';
import type { Theme } from '../themes';

export const myTheme: Theme = {
  ...lightTheme,
  // Only override what differs:
  'color-primary': '#ff6b6b',
  'color-primary-hover': '#ff5252',
  'color-background': '#1a1a2e',
  'color-text': '#e0e0e0',
  // ... ~80 more overrides
};
```

## Custom themes

### Inline overrides

Pass a flat object of token overrides to `ThemeProvider`:

```tsx
<ThemeProvider theme={{ 'color-primary': '#ff0055', 'color-background': '#0d1117' }}>
  <App />
  // 'color-primary-hover', 'color-text', etc. fall back to the // CSS :root defaults from theme.css
</ThemeProvider>
```

### Base + overrides

Use `baseTheme` for a foundation and `theme` for overrides on top:

```tsx
<ThemeProvider
  baseTheme={{ 'color-primary': '#0070f3', 'color-background': '#fff' }}
  theme={{ 'color-primary': '#ff0000' }} // wins over baseTheme
>
  <App />
</ThemeProvider>
```

### Scoped themes

Theme a subtree without affecting the rest of the page:

```tsx
const sidebarRef = useRef<HTMLDivElement>(null);

<div ref={sidebarRef}>
  <ThemeProvider theme={{ 'color-primary': '#ff6b6b' }} target={sidebarRef}>
    <Sidebar />
    // Only this subtree sees the overridden --color-primary
  </ThemeProvider>
</div>;
```

### The `data-theme` attribute

Set a `data-theme` attribute on the target element for consumer CSS hooks:

```tsx
<ThemeProvider theme={darkTheme} dataTheme="dark">
  // document.documentElement now has data-theme="dark"
  // Your CSS can target: [data-theme="dark"] .my-component { ... }
</ThemeProvider>
```

## Reading the active theme

```tsx
import { useTheme, useThemeOptional } from 'morphui-react';

// Throws if used outside a ThemeProvider
const theme = useTheme();
console.log(theme['color-primary']); // '#0070f3'

// Returns undefined if no ThemeProvider is mounted (no throw)
const theme = useThemeOptional();
```

## CSS-only usage (no React)

If you're using the CSS without the React components:

```css
/* Import the token defaults */
@import 'morphui-react/css/theme';

/* Override any token */
:root {
  --color-primary: #ff0055;
  --color-background: #0d1117;
}

/* Use the component CSS */
@import 'morphui-react/css/button';
@import 'morphui-react/css/input';
```

Per-component CSS files live in `dist/css/`. The full bundle is
`morphui-react/css` (`dist/morphui.css`).

## Token reference

353 tokens across 49 families. The full list is in
`src/components/theme/themes/lightTheme.ts`. Key families:

| Family        | Examples                                                         | Count |
| ------------- | ---------------------------------------------------------------- | ----- |
| Colors        | `--color-primary`, `--color-danger`, `--color-gray-500`          | ~80   |
| Backgrounds   | `--color-background`, `--color-background-hover`                 | ~10   |
| Text          | `--color-text`, `--color-text-muted`, `--color-text-secondary`   | ~8    |
| Spacing       | `--spacing-xs`, `--spacing-sm`, `--spacing-md`, `--spacing-lg`   | ~8    |
| Shadows       | `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`       | ~5    |
| Border radius | `--border-radius-sm`, `--border-radius-md`, `--border-radius-lg` | ~5    |
| Typography    | `--font-size-sm`, `--font-weight-medium`, `--line-height-normal` | ~20   |
| Transitions   | `--transition-fast`, `--ease-out`, `--duration-150`              | ~10   |
| Z-index       | `--z-dropdown`, `--z-modal`, `--z-tooltip`                       | ~5    |

## CI token gate

The theme system is protected by a CI gate (`npm run tokens:check`) that
verifies:

1. No preset introduces a token the base (`lightTheme`) doesn't define.
2. `theme.css` matches `lightTheme` exactly (values + keys).
3. No duplicate keys within a preset.

This prevents stale-variable bugs when switching themes at runtime.

## Creating a new preset

1. Add `src/components/theme/themes/myTheme.ts`:
   ```ts
   import { lightTheme } from './lightTheme';
   import type { Theme } from '../themes';
   export const myTheme: Theme = { ...lightTheme /* overrides */ };
   ```
2. Register it in `src/components/theme/themes/index.ts`.
3. Run `npm run tokens:generate` (regenerates `theme.css`).
4. Run `npm run tokens:check` (verifies key parity).

The token gate ensures the new preset has all 353 keys.
