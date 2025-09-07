/**
 * MorphUI Theme System
 * 
 * Complete theming solution for MorphUI components.
 * Provides built-in themes, theme utilities, and theme provider.
 */

// Theme Provider
export { ThemeProvider } from './ThemeProvider';

// Built-in Themes
export { 
  lightTheme,
  darkTheme,
  warmTheme,
  coolTheme,
  purpleTheme,
  themes,
  type ThemeName,
  type Theme,
  getTheme,
  getAvailableThemes,
  isValidThemeName,
  mergeThemes,
  createThemeVariant,
  getThemeInfo
} from './themes';

// Theme Utilities (re-export from utils)
export {
  resolveThemeValue,
  createTheme,
  applyTheme,
  removeTheme,
  getThemeValues,
  adjustColor,
  isValidColor,
  isValidGradient,
  type ThemeColors,
  type ThemeGradients,
  type ThemeTokens
} from '../../utils/theme';
