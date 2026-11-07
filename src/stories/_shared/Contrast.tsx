import type { ReactNode } from 'react';
import { ThemeProvider, themes } from '../../components/theme';

/**
 * Wrappers for contrast-checking: render children on a dark or light
 * background regardless of the toolbar's current theme. Useful for
 * verifying that components maintain contrast in both contexts.
 *
 * Unlike <ThemeGrid> (which cycles all 5 themes), <OnDark>/<OnLight>
 * lock the background to a specific theme. Use these for one-off
 * contrast checks; use <ThemeGrid> for "show me all themes".
 */

export const OnDark = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={themes.dark}>
    <div
      style={{
        background: themes.dark['color-background'] ?? '#1f2937',
        color: themes.dark['color-text'] ?? '#fff',
        padding: '16px',
        borderRadius: 'var(--border-radius-md, 8px)',
      }}
    >
      {children}
    </div>
  </ThemeProvider>
);

export const OnLight = ({ children }: { children: ReactNode }) => (
  <ThemeProvider theme={themes.light}>
    <div
      style={{
        background: themes.light['color-background'] ?? '#fff',
        color: themes.light['color-text'] ?? '#111827',
        padding: '16px',
        borderRadius: 'var(--border-radius-md, 8px)',
        border: '1px solid var(--color-border, #d1d5db)',
      }}
    >
      {children}
    </div>
  </ThemeProvider>
);
