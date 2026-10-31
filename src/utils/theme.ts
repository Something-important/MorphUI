/**
 * Theme Utilities
 *
 * Shared functions for theme management, color resolution, and CSS custom properties.
 * Used by all components to ensure consistent theming behavior.
 */

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
  [key: string]: string;
}

export interface ThemeGradients {
  primary: string;
  success: string;
  warning: string;
  danger: string;
  [key: string]: string;
}

export interface ThemeTokens {
  colors: ThemeColors;
  gradients: ThemeGradients;
  spacing: Record<string, string>;
  shadows: Record<string, string>;
  transitions: Record<string, string>;
  typography: Record<string, string>;
}

/**
 * Extended token families accepted by createTheme.
 * Each family maps to a CSS custom-property prefix, mirroring the built-in
 * theme presets (which cover ~40 families).
 */
export interface ExtendedThemeTokens extends Partial<ThemeTokens> {
  /** -> --font-size-{key} */
  fontSizes?: Record<string, string>;
  /** -> --font-weight-{key} */
  fontWeights?: Record<string, string>;
  /** -> --line-height-{key} */
  lineHeights?: Record<string, string>;
  /** -> --letter-spacing-{key} */
  letterSpacings?: Record<string, string>;
  /** -> --border-radius-{key} */
  radii?: Record<string, string>;
  /** -> --z-{key} */
  zIndex?: Record<string, string>;
  /** -> --backdrop-blur-{key} */
  backdropBlur?: Record<string, string>;
  /** -> --duration-{key} */
  durations?: Record<string, string>;
  /** -> --ease-{key} */
  easings?: Record<string, string>;
  /** -> --opacity-{key} */
  opacities?: Record<string, string>;
  /** -> --transform-{key} */
  transforms?: Record<string, string>;
  /** -> --text-decoration-{key} */
  textDecorations?: Record<string, string>;
  /**
   * Raw CSS custom properties. Keys may be passed with or without the
   * leading `--` (e.g. `{ 'color-primary': '#0070f3' }` or
   * `{ '--color-primary': '#0070f3' }`). Highest precedence: merged last,
   * so it can override anything generated from the structured families.
   */
  vars?: Record<string, string>;
}

/**
 * Resolves a theme value to the appropriate CSS format
 *
 * @param value - The value to resolve (CSS color, CSS variable, or theme key)
 * @returns Resolved CSS value or undefined
 *
 * @example
 * resolveThemeValue('#ff0000') // returns '#ff0000'
 * resolveThemeValue('--color-primary') // returns 'var(--color-primary)'
 * resolveThemeValue('color-primary') // returns 'var(--color-primary)'
 */
export const resolveThemeValue = (value: string | undefined): string | undefined => {
  if (!value) return undefined;

  // Already a complete CSS var() reference — pass through untouched
  if (value.startsWith('var(')) {
    return value;
  }

  // Check if it's a CSS value (starts with #, rgb, hsl, or is a complete gradient)
  if (
    value.startsWith('#') ||
    value.startsWith('rgb') ||
    value.startsWith('hsl') ||
    value.startsWith('linear-gradient') ||
    value.startsWith('radial-gradient') ||
    value.startsWith('conic-gradient') ||
    value.includes('transparent') ||
    value.includes('currentColor')
  ) {
    return value;
  }

  // Check if it's a CSS variable (starts with --)
  if (value.startsWith('--')) {
    return `var(${value})`;
  }

  // Otherwise, treat it as a theme key
  return `var(--${value})`;
};

/**
 * Creates a complete theme object with CSS custom properties
 *
 * Supports every token family used by the built-in presets, plus a raw
 * `vars` escape hatch for any key the structured families don't cover.
 *
 * @param tokens - Theme tokens (colors, spacing, etc.)
 * @returns Object with CSS custom properties ready for injection
 *
 * @example
 * const theme = createTheme({
 *   colors: { primary: '#0070f3', success: '#10b981' },
 *   spacing: { sm: '0.5rem', md: '1rem' },
 *   radii: { lg: '12px' },
 *   zIndex: { modal: '1050' },
 *   vars: { 'switch-width-md': '44px' },
 * });
 */
export const createTheme = (tokens: ExtendedThemeTokens): Record<string, string> => {
  const theme: Record<string, string> = {};

  // Add colors
  if (tokens.colors) {
    Object.entries(tokens.colors).forEach(([key, value]) => {
      theme[`--color-${key}`] = value;
      // Add hover and active variants
      theme[`--color-${key}-hover`] = adjustColor(value, -10);
      theme[`--color-${key}-active`] = adjustColor(value, -20);
    });
  }

  // Add gradients
  if (tokens.gradients) {
    Object.entries(tokens.gradients).forEach(([key, value]) => {
      theme[`--gradient-${key}`] = value;
    });
  }

  // Add spacing
  if (tokens.spacing) {
    Object.entries(tokens.spacing).forEach(([key, value]) => {
      theme[`--spacing-${key}`] = value;
    });
  }

  // Add shadows
  if (tokens.shadows) {
    Object.entries(tokens.shadows).forEach(([key, value]) => {
      theme[`--shadow-${key}`] = value;
    });
  }

  // Add transitions
  if (tokens.transitions) {
    Object.entries(tokens.transitions).forEach(([key, value]) => {
      theme[`--transition-${key}`] = value;
    });
  }

  // Add typography
  if (tokens.typography) {
    Object.entries(tokens.typography).forEach(([key, value]) => {
      theme[`--font-${key}`] = value;
    });
  }

  // Extended families (mirroring the built-in presets)
  const families: Array<[Record<string, string> | undefined, string]> = [
    [tokens.fontSizes, '--font-size-'],
    [tokens.fontWeights, '--font-weight-'],
    [tokens.lineHeights, '--line-height-'],
    [tokens.letterSpacings, '--letter-spacing-'],
    [tokens.radii, '--border-radius-'],
    [tokens.zIndex, '--z-'],
    [tokens.backdropBlur, '--backdrop-blur-'],
    [tokens.durations, '--duration-'],
    [tokens.easings, '--ease-'],
    [tokens.opacities, '--opacity-'],
    [tokens.transforms, '--transform-'],
    [tokens.textDecorations, '--text-decoration-'],
  ];

  families.forEach(([family, prefix]) => {
    if (family) {
      Object.entries(family).forEach(([key, value]) => {
        theme[`${prefix}${key}`] = value;
      });
    }
  });

  // Raw vars escape hatch — merged last so it wins over the families above
  if (tokens.vars) {
    Object.entries(tokens.vars).forEach(([key, value]) => {
      const name = key.startsWith('--') ? key : `--${key}`;
      theme[name] = value;
    });
  }

  return theme;
};

/**
 * Applies a theme to the document root
 *
 * @param theme - Theme object with CSS custom properties
 * @param target - Target element (defaults to document.documentElement)
 *
 * @example
 * const theme = createTheme({ colors: { primary: '#0070f3' } });
 * applyTheme(theme);
 */
export const applyTheme = (
  theme: Record<string, string>,
  target: HTMLElement = document.documentElement,
): void => {
  Object.entries(theme).forEach(([key, value]) => {
    target.style.setProperty(key, value);
  });
};

/**
 * Removes a theme from the document root
 *
 * @param themeKeys - Array of CSS custom property keys to remove
 * @param target - Target element (defaults to document.documentElement)
 *
 * @example
 * removeTheme(['--color-primary', '--color-success']);
 */
export const removeTheme = (
  themeKeys: string[],
  target: HTMLElement = document.documentElement,
): void => {
  themeKeys.forEach((key) => {
    target.style.removeProperty(key);
  });
};

/**
 * Gets the current theme values from CSS custom properties
 *
 * @param keys - Array of CSS custom property keys to retrieve
 * @param target - Target element (defaults to document.documentElement)
 * @returns Object with current theme values
 *
 * @example
 * const currentColors = getThemeValues(['--color-primary', '--color-success']);
 */
export const getThemeValues = (
  keys: string[],
  target: HTMLElement = document.documentElement,
): Record<string, string> => {
  const values: Record<string, string> = {};

  keys.forEach((key) => {
    const value = getComputedStyle(target).getPropertyValue(key);
    if (value) {
      values[key] = value.trim();
    }
  });

  return values;
};

/**
 * Simple color adjustment utility (lighten/darken)
 *
 * @param color - Hex color string
 * @param amount - Amount to adjust (-100 to 100, negative = darker, positive = lighter)
 * @returns Adjusted hex color
 *
 * @example
 * adjustColor('#0070f3', -10) // Darker blue
 * adjustColor('#0070f3', 10)  // Lighter blue
 */
export const adjustColor = (color: string, amount: number): string => {
  // This is a simplified version - in production you might want a more robust color library
  if (!color.startsWith('#')) return color;

  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * amount);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;

  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

/**
 * Validates if a string is a valid CSS color
 *
 * @param color - Color string to validate
 * @returns True if valid CSS color
 *
 * @example
 * isValidColor('#ff0000') // true
 * isValidColor('invalid') // false
 */
export const isValidColor = (color: string): boolean => {
  const s = new Option().style;
  s.color = color;
  return s.color !== '';
};

/**
 * Validates if a string is a valid CSS gradient
 *
 * @param gradient - Gradient string to validate
 * @returns True if valid CSS gradient
 *
 * @example
 * isValidGradient('linear-gradient(90deg, #ff0000, #00ff00)') // true
 * isValidGradient('invalid') // false
 */
export const isValidGradient = (gradient: string): boolean => {
  return (
    gradient.includes('gradient') &&
    (gradient.includes('linear-gradient') ||
      gradient.includes('radial-gradient') ||
      gradient.includes('conic-gradient'))
  );
};
