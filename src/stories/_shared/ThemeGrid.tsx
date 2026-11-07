import { useRef, type ReactNode } from 'react';
import { ThemeProvider, themes, type Theme, type ThemeName } from '../../components/theme';

/**
 * Renders children once per preset theme (5 themes), each scoped to its
 * own subtree via ThemeProvider's `target` prop. One story demonstrates
 * all 5 themes side-by-side — replaces both the per-story switcher and
 * the "cycle all 5 themes" stories deleted in PR #83.
 *
 * Verified: ThemeProvider's `target` prop accepts an HTMLElement or
 * RefObject<HTMLElement> (ThemeProvider.tsx:39, 43-47) and scopes CSS
 * vars to that subtree via inline style on the target element.
 *
 * @example
 * <ThemeGrid>
 *   <Button>Go</Button>
 * </ThemeGrid>
 * → 5 labeled boxes, each rendering the button in its theme
 */
export const ThemeGrid = ({
  children,
  themes: themeNames = ['light', 'dark', 'warm', 'cool', 'purple'],
}: {
  children: ReactNode;
  themes?: ThemeName[];
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${themeNames.length}, minmax(0, 1fr))`,
      gap: '12px',
    }}
  >
    {themeNames.map((name) => (
      <ThemeCell key={name} name={name}>
        {children}
      </ThemeCell>
    ))}
  </div>
);

const ThemeCell = ({ name, children }: { name: ThemeName; children: ReactNode }) => {
  // Each cell gets its own ref so ThemeProvider can scope CSS vars to
  // this subtree only (not :root). This is what makes side-by-side theme
  // comparison work — verified in ThemeProvider.tsx:66-80.
  const ref = useRef<HTMLDivElement>(null);
  const theme: Theme = themes[name];

  return (
    <div
      style={{
        border: '1px solid var(--color-border, #d1d5db)',
        borderRadius: 'var(--border-radius-md, 8px)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: '6px 10px',
          fontSize: 'var(--font-size-xs, 10px)',
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-text-inverse, #fff)',
          background: name === 'light' ? '#6b7280' : (theme['color-primary'] ?? '#0070f3'),
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}
      >
        {name}
      </div>
      <ThemeProvider theme={theme} target={ref}>
        <div
          ref={ref}
          style={{
            padding: '16px',
            background: theme['color-background'] ?? '#fff',
            color: theme['color-text'] ?? '#111827',
            minHeight: '80px',
          }}
        >
          {children}
        </div>
      </ThemeProvider>
    </div>
  );
};
