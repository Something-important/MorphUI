import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
  type RefObject,
} from 'react';
import { mergeThemes, type Theme } from './themes';
import './theme.css';

/**
 * Context carrying the fully-merged theme so nested components (and app code
 * via useTheme()) can read the active tokens.
 */
const ThemeContext = createContext<Theme | null>(null);

export interface ThemeProviderProps {
  /**
   * Theme overrides — flat CSS custom property keys without the leading `--`
   * (e.g. `{ 'color-primary': '#ff0055' }`), matching the built-in presets.
   */
  theme?: Theme;
  /**
   * Optional base theme merged underneath `theme` (overrides win).
   * Defaults to nothing, so only the keys you pass are set and everything
   * else falls back to the CSS token defaults from theme.css.
   */
  baseTheme?: Theme;
  /** Attribute value written to the target element (`data-theme="dark"`). */
  dataTheme?: string;
  /**
   * Where the variables are applied. Defaults to `document.documentElement`,
   * so themes are global. Pass an element (or a ref to one) to scope a theme
   * to a subtree — CSS custom properties inherit, so only that subtree sees
   * the overridden tokens.
   */
  target?: HTMLElement | RefObject<HTMLElement>;
  children: ReactNode;
}

const resolveTarget = (target?: HTMLElement | RefObject<HTMLElement>): HTMLElement => {
  if (!target) return document.documentElement;
  if ('current' in target) return target.current ?? document.documentElement;
  return target;
};

export const ThemeProvider = ({
  theme,
  baseTheme,
  dataTheme,
  target,
  children,
}: ThemeProviderProps) => {
  // Fully merged theme (base underneath, overrides on top).
  const mergedTheme = useMemo(() => mergeThemes(baseTheme ?? {}, theme ?? {}), [baseTheme, theme]);

  const mergedKeys = useMemo(() => Object.keys(mergedTheme), [mergedTheme]);

  // Track the keys applied by the previous run so switching to a theme with
  // fewer/different keys removes the stale ones instead of leaking them.
  const appliedKeysRef = useRef<string[]>([]);

  useEffect(() => {
    const el = resolveTarget(target);
    const prevKeys = appliedKeysRef.current;
    const nextKeys = mergedKeys;

    // Remove keys that are no longer part of the theme (stale-var cleanup).
    prevKeys.forEach((key) => {
      if (!nextKeys.includes(key)) {
        el.style.removeProperty(`--${key}`);
      }
    });

    // Apply the current theme.
    Object.entries(mergedTheme).forEach(([key, value]) => {
      el.style.setProperty(`--${key}`, value);
    });

    appliedKeysRef.current = nextKeys;

    // Optional data-theme attribute for consumer CSS hooks.
    if (dataTheme !== undefined) {
      el.setAttribute('data-theme', dataTheme);
    }
  }, [mergedTheme, mergedKeys, dataTheme, target]);

  // On unmount, clean up every var this provider applied.
  useEffect(() => {
    const applied = appliedKeysRef.current;
    return () => {
      const el = resolveTarget(target);
      applied.forEach((key) => el.style.removeProperty(`--${key}`));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ThemeContext.Provider value={mergedTheme}>{children}</ThemeContext.Provider>;
};

/**
 * Reads the active (merged) theme from the nearest ThemeProvider.
 *
 * @returns The merged theme object (base + overrides) as flat token keys.
 * @throws If used outside a ThemeProvider.
 *
 * @example
 * const theme = useTheme();
 * theme['color-primary']; // '#0070f3'
 */
export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  if (ctx === null) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
};

/**
 * Returns the active theme or `undefined` when no ThemeProvider is mounted.
 * Useful for optional theming where a fallback is acceptable.
 */
export const useThemeOptional = (): Theme | undefined => {
  return useContext(ThemeContext) ?? undefined;
};
