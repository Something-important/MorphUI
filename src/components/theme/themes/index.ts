/**
 * Theme Registry
 * 
 * Centralized theme definitions for MorphUI.
 * Provides built-in themes and utilities for theme management.
 */

import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';
import { warmTheme } from './warmTheme';
import { coolTheme } from './coolTheme';
import { purpleTheme } from './purpleTheme';

export { lightTheme, darkTheme, warmTheme, coolTheme, purpleTheme };

/**
 * Built-in theme registry
 * 
 * Contains all available themes that users can use out of the box.
 * Users can also create their own themes and combine them with these.
 */
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  warm: warmTheme,
  cool: coolTheme,
  purple: purpleTheme,
} as const;

/**
 * Theme name type for TypeScript support
 */
export type ThemeName = keyof typeof themes;

/**
 * Theme object type
 */
export type Theme = Record<string, string>;

/**
 * Gets a theme by name
 * 
 * @param themeName - Name of the theme to retrieve
 * @returns Theme object or undefined if not found
 * 
 * @example
 * const darkTheme = getTheme('dark');
 * const customTheme = getTheme('my-custom-theme');
 */
export const getTheme = (themeName: string): Theme | undefined => {
  return themes[themeName as ThemeName];
};

/**
 * Gets all available built-in theme names
 * 
 * @returns Array of theme names
 * 
 * @example
 * const availableThemes = getAvailableThemes();
 * // Returns: ['default', 'dark', 'warm', 'cool']
 */
export const getAvailableThemes = (): ThemeName[] => {
  return Object.keys(themes) as ThemeName[];
};

/**
 * Validates if a theme name exists in built-in themes
 * 
 * @param themeName - Theme name to validate
 * @returns True if theme exists
 * 
 * @example
 * isValidThemeName('dark') // true
 * isValidThemeName('custom') // false
 */
export const isValidThemeName = (themeName: string): themeName is ThemeName => {
  return themeName in themes;
};

/**
 * Merges multiple themes into one
 * 
 * @param themeObjects - Array of theme objects to merge
 * @returns Merged theme object
 * 
 * @example
 * const combinedTheme = mergeThemes(lightTheme, { 'color-primary': '#ff0000' });
 */
export const mergeThemes = (...themeObjects: Theme[]): Theme => {
  return Object.assign({}, ...themeObjects);
};

/**
 * Creates a theme variant by extending a base theme
 * 
 * @param baseTheme - Base theme to extend
 * @param overrides - Theme overrides
 * @returns New theme object
 * 
 * @example
 * const myTheme = createThemeVariant(lightTheme, { 'color-primary': '#ff0000' });
 */
export const createThemeVariant = (baseTheme: Theme, overrides: Theme): Theme => {
  return { ...baseTheme, ...overrides };
};

/**
 * Gets theme metadata
 * 
 * @param themeName - Name of the theme
 * @param theme - Theme object
 * @returns Theme metadata
 * 
 * @example
 * const info = getThemeInfo('dark', darkTheme);
 */
export const getThemeInfo = (themeName: string, theme: Theme) => {
  return {
    name: themeName,
    primaryColor: theme['color-primary'],
    backgroundColor: theme['color-background'],
    textColor: theme['color-text'],
    isBuiltIn: isValidThemeName(themeName),
    isCustom: !isValidThemeName(themeName),
    tokenCount: Object.keys(theme).length,
  };
};
