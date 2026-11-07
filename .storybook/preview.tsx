import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { ThemeProvider, themes, type ThemeName } from '../src/components/theme';

/**
 * Storybook global config for MorphUI.
 *
 * Adds two toolbar toggles:
 *   - Theme (light / dark / warm / cool / purple) — drives a global
 *     <ThemeProvider> decorator so every story is theme-aware.
 *   - Direction (LTR / RTL) — sets `dir` on the wrapper. RTL is cosmetic
 *     until Phase 12 (physical→logical CSS migration) lands; the toolbar
 *     description says so honestly.
 *
 * Also enforces a canonical story sort order (section → importPath →
 * canonical story name → alphabetical for extras). The comparator is
 * inlined inside `parameters.options.storySort` because Storybook's CSF
 * indexer serializes the function and evaluates it isolated from module
 * scope — external refs would be `undefined` at runtime, and TS type
 * annotations break the JS-only parser.
 *
 * See agent-ctx/11-STORYBOOK-PLAN.md (Part 1, Part 2) for the design.
 */

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for all stories',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
          { value: 'warm', icon: 'heat', title: 'Warm' },
          { value: 'cool', icon: 'snowflake', title: 'Cool' },
          { value: 'purple', icon: 'circle', title: 'Purple' },
        ],
      },
    },
    direction: {
      name: 'Direction',
      description:
        'Text direction. RTL is cosmetic until Phase 12 (physical→logical CSS migration) lands — only text flips, not physical layout.',
      defaultValue: 'ltr',
      toolbar: {
        icon: 'transfer',
        items: [
          { value: 'ltr', title: 'LTR' },
          { value: 'rtl', title: 'RTL' },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const themeName = context.globals.theme as ThemeName;
      const theme = themes[themeName];
      const bg = theme?.['color-background'] ?? '#ffffff';
      return (
        <ThemeProvider theme={theme}>
          {/*
            Paint body so dark/warm/cool/purple themes don't show a white
            canvas behind dark components. Inline <style> is the simplest
            cross-iframe approach; the value re-renders when the toolbar
            theme changes.
          */}
          <style>{`body { background: ${bg}; }`}</style>
          <div dir={context.globals.direction} style={{ minHeight: '100%' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // Inline comparator with inline constants — Storybook's CSF indexer
      // serializes this function and evaluates it isolated from module
      // scope, so external refs (SECTION_ORDER, CANONICAL_STORY_ORDER)
      // would be undefined at runtime. Sort: section → importPath →
      // canonical story order → alphabetical for extras.
      storySort: (a, b) => {
        const SECTION_ORDER = [
          'Getting Started',
          'Foundations',
          'Primitives',
          'Composition',
          'Patterns',
          'Hooks',
        ];
        const CANONICAL_STORY_ORDER = [
          'Default',
          'Variants',
          'Sizes',
          'States',
          'Customization',
          'Controlled',
          'AllThemes',
          'EdgeCases',
          'Accessibility',
          'Integration',
        ];
        const sa = SECTION_ORDER.findIndex((s) => a.title.startsWith(s));
        const sb = SECTION_ORDER.findIndex((s) => b.title.startsWith(s));
        if (sa !== sb) return sa - sb;
        if (a.importPath !== b.importPath) return a.importPath.localeCompare(b.importPath);
        const ia = CANONICAL_STORY_ORDER.indexOf(a.name);
        const ib = CANONICAL_STORY_ORDER.indexOf(b.name);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1; // canonical before extras
        if (ib !== -1) return 1;
        return a.name.localeCompare(b.name); // extras alphabetical
      },
    },
  },
};

export default preview;
