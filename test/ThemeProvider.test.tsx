import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme, useThemeOptional } from '../src/components/theme/ThemeProvider';

describe('ThemeProvider', () => {
  it('applies theme tokens to document.documentElement by default', () => {
    const { unmount } = render(
      <ThemeProvider theme={{ 'color-primary': '#ff0000' }}>test</ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#ff0000');
    unmount();
  });

  it('cleans up applied tokens on unmount', () => {
    const { unmount } = render(
      <ThemeProvider theme={{ 'color-primary': '#ff0000' }}>test</ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#ff0000');
    unmount();
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('');
  });

  it('removes stale vars when switching to a theme with fewer keys', () => {
    const { rerender, unmount } = render(
      <ThemeProvider theme={{ 'color-primary': '#ff0000', 'color-secondary': '#00ff00' }}>
        test
      </ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--color-secondary')).toBe('#00ff00');
    // Switch to a theme that drops color-secondary.
    rerender(<ThemeProvider theme={{ 'color-primary': '#0000ff' }}>test</ThemeProvider>);
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#0000ff');
    expect(document.documentElement.style.getPropertyValue('--color-secondary')).toBe('');
    unmount();
  });

  it('merges baseTheme underneath theme (overrides win)', () => {
    const { unmount } = render(
      <ThemeProvider
        baseTheme={{ 'color-primary': '#base', 'color-secondary': '#keep' }}
        theme={{ 'color-primary': '#override' }}
      >
        test
      </ThemeProvider>,
    );
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('#override');
    expect(document.documentElement.style.getPropertyValue('--color-secondary')).toBe('#keep');
    unmount();
  });

  it('applies tokens to a target HTMLElement', () => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    const { unmount } = render(
      <ThemeProvider theme={{ 'color-primary': '#ff0000' }} target={div}>
        test
      </ThemeProvider>,
    );
    expect(div.style.getPropertyValue('--color-primary')).toBe('#ff0000');
    expect(document.documentElement.style.getPropertyValue('--color-primary')).toBe('');
    unmount();
    div.remove();
  });

  it('applies tokens to a ref target', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { unmount } = render(
      <div ref={ref}>
        <ThemeProvider theme={{ 'color-primary': '#ff0000' }} target={ref}>
          test
        </ThemeProvider>
      </div>,
    );
    expect(ref.current?.style.getPropertyValue('--color-primary')).toBe('#ff0000');
    unmount();
  });

  it('writes a data-theme attribute when dataTheme is provided', () => {
    const { unmount } = render(
      <ThemeProvider theme={{ 'color-primary': '#ff0000' }} dataTheme="dark">
        test
      </ThemeProvider>,
    );
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    unmount();
  });

  it('does not write data-theme when not provided', () => {
    const { unmount } = render(
      <ThemeProvider theme={{ 'color-primary': '#ff0000' }}>test</ThemeProvider>,
    );
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
    unmount();
  });
});

describe('useTheme', () => {
  it('returns the merged theme inside a provider', () => {
    const Consumer = () => {
      const theme = useTheme();
      return <span data-testid="primary">{theme['color-primary']}</span>;
    };
    render(
      <ThemeProvider theme={{ 'color-primary': '#test' }}>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('primary').textContent).toBe('#test');
  });

  it('throws when used outside a provider', () => {
    const Consumer = () => {
      useTheme();
      return null;
    };
    // Suppress the error boundary console noise.
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Consumer />)).toThrow('useTheme must be used within a ThemeProvider');
    spy.mockRestore();
  });
});

describe('useThemeOptional', () => {
  it('returns undefined outside a provider', () => {
    const Consumer = () => {
      const theme = useThemeOptional();
      return <span data-testid="result">{theme === undefined ? 'none' : 'has'}</span>;
    };
    render(<Consumer />);
    expect(screen.getByTestId('result').textContent).toBe('none');
  });

  it('returns the merged theme inside a provider', () => {
    const Consumer = () => {
      const theme = useThemeOptional();
      return <span data-testid="result">{theme?.['color-primary'] ?? 'none'}</span>;
    };
    render(
      <ThemeProvider theme={{ 'color-primary': '#test' }}>
        <Consumer />
      </ThemeProvider>,
    );
    expect(screen.getByTestId('result').textContent).toBe('#test');
  });
});
