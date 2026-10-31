import { readFileSync } from 'fs';
import { resolve } from 'path';

import { createTheme, ExtendedThemeTokens } from '../src/utils/theme';
import {
  lightTheme,
  darkTheme,
  coolTheme,
  warmTheme,
  purpleTheme,
} from '../src/components/theme/themes';

/**
 * Theme token invariants — Jest mirror of the CI gate
 * (scripts/check_theme_tokens.py). These tests make `npm test` alone catch
 * the drift modes the Python gate guards in CI:
 *
 *   1. preset key-set alignment (stale variables on theme switch)
 *   2. createTheme can express the full preset token surface
 *   3. z-index stacking order sanity
 *   4. theme.css :root parity with lightTheme (single source of truth)
 */

const presets: Record<string, Record<string, string>> = {
  lightTheme,
  darkTheme,
  coolTheme,
  warmTheme,
  purpleTheme,
};

// ---------------------------------------------------------------------------
// 1. Preset key-set alignment
// ---------------------------------------------------------------------------
describe('theme preset token alignment', () => {
  const lightKeys = Object.keys(lightTheme).sort();

  Object.entries(presets).forEach(([name, preset]) => {
    it(`${name} defines the same ${lightKeys.length} tokens as lightTheme`, () => {
      expect(Object.keys(preset).sort()).toEqual(lightKeys);
    });
  });

  it('presets carry a substantial token set (guards accidental mass deletion)', () => {
    Object.values(presets).forEach((preset) => {
      expect(Object.keys(preset).length).toBeGreaterThanOrEqual(350);
    });
  });
});

// ---------------------------------------------------------------------------
// 2. createTheme preset coverage (round-trip)
// ---------------------------------------------------------------------------
// Ordered specific-first: 'font-' must come last so it does not swallow
// 'font-size-' / 'font-weight-' / 'font-family-*'.
const FAMILY_RULES: Array<{ prefix: string; family: string }> = [
  { prefix: 'font-size-', family: 'fontSizes' },
  { prefix: 'font-weight-', family: 'fontWeights' },
  { prefix: 'line-height-', family: 'lineHeights' },
  { prefix: 'letter-spacing-', family: 'letterSpacings' },
  { prefix: 'border-radius-', family: 'radii' },
  { prefix: 'text-decoration-', family: 'textDecorations' },
  { prefix: 'backdrop-blur-', family: 'backdropBlur' },
  { prefix: 'z-', family: 'zIndex' },
  { prefix: 'duration-', family: 'durations' },
  { prefix: 'ease-', family: 'easings' },
  { prefix: 'opacity-', family: 'opacities' },
  { prefix: 'transform-', family: 'transforms' },
  { prefix: 'color-', family: 'colors' },
  { prefix: 'gradient-', family: 'gradients' },
  { prefix: 'spacing-', family: 'spacing' },
  { prefix: 'shadow-', family: 'shadows' },
  { prefix: 'transition-', family: 'transitions' },
  { prefix: 'font-', family: 'typography' },
];

describe('createTheme preset coverage', () => {
  it('generates every lightTheme token with the exact preset value', () => {
    const structured: Record<string, Record<string, string>> = {};
    const vars: Record<string, string> = {};

    Object.entries(lightTheme).forEach(([key, value]) => {
      const rule = FAMILY_RULES.find((r) => key.startsWith(r.prefix));
      if (rule) {
        (structured[rule.family] ??= {})[key.slice(rule.prefix.length)] = value;
      } else {
        vars[key] = value;
      }
    });

    const tokens = { ...structured, vars } as ExtendedThemeTokens;
    const theme = createTheme(tokens);

    Object.entries(lightTheme).forEach(([key, value]) => {
      expect(theme[`--${key}`]).toBe(value);
    });
  });

  it('only resorts to the vars escape hatch for keys without a family', () => {
    const prefixes = FAMILY_RULES.map((r) => r.prefix);
    const rawKeys = Object.keys(lightTheme).filter((k) => !prefixes.some((p) => k.startsWith(p)));
    // sizing tokens (input-height-*, modal-max-width-*, …) have no family yet
    expect(rawKeys.length).toBeGreaterThan(0);
    expect(rawKeys).toContain('input-height-md');
    expect(rawKeys).toContain('modal-max-width-md');
  });
});

// ---------------------------------------------------------------------------
// 3. z-index stacking invariant
// ---------------------------------------------------------------------------
describe('z-index tokens', () => {
  const STACKING = ['z-dropdown', 'z-modal', 'z-tooltip', 'z-toast'];

  Object.entries(presets).forEach(([name, preset]) => {
    it(`${name} stacks dropdown < modal < tooltip < toast`, () => {
      const values = STACKING.map((k) => parseInt(preset[k], 10));
      values.forEach((v) => expect(Number.isInteger(v)).toBe(true));
      expect(values).toEqual([...values].sort((a, b) => a - b));
    });
  });
});

// ---------------------------------------------------------------------------
// 4. theme.css parity with lightTheme (generated file, single source of truth)
// ---------------------------------------------------------------------------
describe('theme.css generated output', () => {
  const css = readFileSync(resolve(__dirname, '../src/components/theme/theme.css'), 'utf8');
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  const cssVars: Record<string, string> = {};
  for (const m of rootMatch?.[1].matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g) ?? []) {
    cssVars[m[1]] = m[2].trim();
  }

  it('parses a non-empty :root block', () => {
    expect(Object.keys(cssVars).length).toBeGreaterThan(300);
  });

  it('defines exactly the lightTheme token set (no extras, none missing)', () => {
    expect(Object.keys(cssVars).sort()).toEqual(
      Object.keys(lightTheme)
        .map((k) => `--${k}`)
        .sort(),
    );
  });

  it('matches every lightTheme value (quote style normalized)', () => {
    Object.entries(lightTheme).forEach(([key, value]) => {
      const cssValue = cssVars[`--${key}`]?.replace(/"/g, "'");
      expect(cssValue).toBe(value.replace(/"/g, "'"));
    });
  });
});
