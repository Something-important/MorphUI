import {
  resolveThemeValue,
  createTheme,
  applyTheme,
  removeTheme,
  getThemeValues,
  adjustColor,
  isValidColor,
  isValidGradient,
} from '../src/utils/theme';

describe('Theme Utilities', () => {
  // resolveThemeValue
  describe('resolveThemeValue', () => {
    it('returns undefined for undefined input', () => {
      expect(resolveThemeValue(undefined)).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      expect(resolveThemeValue('')).toBeUndefined();
    });

    it('passes through hex colors', () => {
      expect(resolveThemeValue('#ff0000')).toBe('#ff0000');
    });

    it('passes through short hex colors', () => {
      expect(resolveThemeValue('#f00')).toBe('#f00');
    });

    it('passes through rgb colors', () => {
      expect(resolveThemeValue('rgb(255, 0, 0)')).toBe('rgb(255, 0, 0)');
    });

    it('passes through rgba colors', () => {
      expect(resolveThemeValue('rgba(255, 0, 0, 0.5)')).toBe('rgba(255, 0, 0, 0.5)');
    });

    it('passes through hsl colors', () => {
      expect(resolveThemeValue('hsl(120, 100%, 50%)')).toBe('hsl(120, 100%, 50%)');
    });

    it('passes through linear gradients', () => {
      const gradient = 'linear-gradient(90deg, #ff0000, #00ff00)';
      expect(resolveThemeValue(gradient)).toBe(gradient);
    });

    it('passes through radial gradients', () => {
      const gradient = 'radial-gradient(circle, #ff0000, #00ff00)';
      expect(resolveThemeValue(gradient)).toBe(gradient);
    });

    it('passes through conic gradients', () => {
      const gradient = 'conic-gradient(from 0deg, #ff0000, #00ff00)';
      expect(resolveThemeValue(gradient)).toBe(gradient);
    });

    it('passes through transparent values', () => {
      expect(resolveThemeValue('transparent')).toBe('transparent');
    });

    it('passes through values containing transparent', () => {
      expect(resolveThemeValue('rgba(0, 0, 0, transparent)')).toBe('rgba(0, 0, 0, transparent)');
    });

    it('passes through currentColor values', () => {
      expect(resolveThemeValue('currentColor')).toBe('currentColor');
    });

    it('wraps CSS variables in var()', () => {
      expect(resolveThemeValue('--color-primary')).toBe('var(--color-primary)');
    });

    it('wraps theme keys with double dash prefix', () => {
      expect(resolveThemeValue('color-primary')).toBe('var(--color-primary)');
    });

    it('wraps bare theme keys like primary', () => {
      expect(resolveThemeValue('primary')).toBe('var(--primary)');
    });
  });

  // createTheme
  describe('createTheme', () => {
    it('returns empty object for empty tokens', () => {
      expect(createTheme({})).toEqual({});
    });

    it('creates color custom properties', () => {
      const theme = createTheme({ colors: { primary: '#0070f3' } });
      expect(theme['--color-primary']).toBe('#0070f3');
    });

    it('creates hover and active variants for colors', () => {
      const theme = createTheme({ colors: { primary: '#0070f3' } });
      expect(theme['--color-primary-hover']).toBe(adjustColor('#0070f3', -10));
      expect(theme['--color-primary-active']).toBe(adjustColor('#0070f3', -20));
    });

    it('creates variants for every color key', () => {
      const theme = createTheme({
        colors: { primary: '#0070f3', success: '#10b981', danger: '#ef4444' },
      });
      expect(Object.keys(theme).filter((k) => k.startsWith('--color-'))).toHaveLength(9);
    });

    it('creates gradient custom properties', () => {
      const theme = createTheme({
        gradients: { primary: 'linear-gradient(90deg, #ff0000, #00ff00)' },
      });
      expect(theme['--gradient-primary']).toBe('linear-gradient(90deg, #ff0000, #00ff00)');
    });

    it('creates spacing custom properties', () => {
      const theme = createTheme({ spacing: { sm: '0.5rem', md: '1rem' } });
      expect(theme['--spacing-sm']).toBe('0.5rem');
      expect(theme['--spacing-md']).toBe('1rem');
    });

    it('creates shadow custom properties', () => {
      const theme = createTheme({ shadows: { md: '0 4px 6px rgba(0,0,0,0.1)' } });
      expect(theme['--shadow-md']).toBe('0 4px 6px rgba(0,0,0,0.1)');
    });

    it('creates transition custom properties', () => {
      const theme = createTheme({ transitions: { fast: '150ms ease-in' } });
      expect(theme['--transition-fast']).toBe('150ms ease-in');
    });

    it('creates typography custom properties', () => {
      const theme = createTheme({ typography: { heading: '2rem bold' } });
      expect(theme['--font-heading']).toBe('2rem bold');
    });

    it('combines all token types in one theme', () => {
      const theme = createTheme({
        colors: { primary: '#0070f3' },
        gradients: { primary: 'linear-gradient(#fff, #000)' },
        spacing: { sm: '0.5rem' },
        shadows: { sm: '0 1px 2px rgba(0,0,0,0.1)' },
        transitions: { fast: '150ms' },
        typography: { mono: '1rem monospace' },
      });
      expect(Object.keys(theme)).toHaveLength(8);
    });
  });

  // applyTheme / removeTheme
  describe('applyTheme and removeTheme', () => {
    let target: HTMLElement;

    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);
    });

    afterEach(() => {
      target.remove();
    });

    it('applies theme properties to a target element', () => {
      applyTheme({ '--color-primary': '#0070f3' }, target);
      expect(target.style.getPropertyValue('--color-primary')).toBe('#0070f3');
    });

    it('applies to the document root by default', () => {
      applyTheme({ '--doc-root-test': 'ok' });
      expect(document.documentElement.style.getPropertyValue('--doc-root-test')).toBe('ok');
      removeTheme(['--doc-root-test']);
      expect(document.documentElement.style.getPropertyValue('--doc-root-test')).toBe('');
    });

    it('reads values from the document root by default', () => {
      applyTheme({ '--doc-root-read': 'yes' });
      expect(getThemeValues(['--doc-root-read'])['--doc-root-read']).toBe('yes');
      removeTheme(['--doc-root-read']);
    });

    it('applies multiple properties', () => {
      applyTheme({ '--a': '1', '--b': '2', '--c': '3' }, target);
      expect(target.style.getPropertyValue('--a')).toBe('1');
      expect(target.style.getPropertyValue('--b')).toBe('2');
      expect(target.style.getPropertyValue('--c')).toBe('3');
    });

    it('removes theme properties from a target element', () => {
      applyTheme({ '--color-primary': '#0070f3' }, target);
      removeTheme(['--color-primary'], target);
      expect(target.style.getPropertyValue('--color-primary')).toBe('');
    });

    it('removes only the specified keys', () => {
      applyTheme({ '--keep': 'yes', '--drop': 'no' }, target);
      removeTheme(['--drop'], target);
      expect(target.style.getPropertyValue('--keep')).toBe('yes');
      expect(target.style.getPropertyValue('--drop')).toBe('');
    });
  });

  // getThemeValues
  describe('getThemeValues', () => {
    let target: HTMLElement;

    beforeEach(() => {
      target = document.createElement('div');
      document.body.appendChild(target);
    });

    afterEach(() => {
      target.remove();
    });

    it('retrieves applied theme values', () => {
      applyTheme({ '--color-primary': '#0070f3' }, target);
      const values = getThemeValues(['--color-primary'], target);
      expect(values['--color-primary']).toBe('#0070f3');
    });

    it('omits keys that are not set', () => {
      const values = getThemeValues(['--missing'], target);
      expect(values).toEqual({});
    });

    it('retrieves multiple values at once', () => {
      applyTheme({ '--a': '1', '--b': '2' }, target);
      const values = getThemeValues(['--a', '--b', '--c'], target);
      expect(Object.keys(values)).toEqual(['--a', '--b']);
    });

    it('trims whitespace from retrieved values', () => {
      applyTheme({ '--padded': '  padded  ' }, target);
      const values = getThemeValues(['--padded'], target);
      expect(values['--padded']).toBe('padded');
    });
  });

  // adjustColor
  describe('adjustColor', () => {
    it('darkens a color with a negative amount', () => {
      expect(adjustColor('#0070f3', -10)).toBe('#0057da');
    });

    it('lightens a color with a positive amount', () => {
      expect(adjustColor('#0070f3', 10)).toBe('#1a8aff');
    });

    it('clamps channels at 255 on large positive amounts', () => {
      expect(adjustColor('#ffffff', 50)).toBe('#ffffff');
    });

    it('clamps channels at 0 on large negative amounts', () => {
      expect(adjustColor('#000000', -50)).toBe('#000000');
    });

    it('adjusts all three channels evenly', () => {
      expect(adjustColor('#808080', 25)).toBe('#c0c0c0');
    });

    it('passes through non-hex colors unchanged', () => {
      expect(adjustColor('rgb(0, 112, 243)', 10)).toBe('rgb(0, 112, 243)');
    });

    it('passes through named colors unchanged', () => {
      expect(adjustColor('red', -10)).toBe('red');
    });

    it('returns a 7-character hex string', () => {
      expect(adjustColor('#123456', 5)).toMatch(/^#[0-9a-f]{6}$/);
    });
  });

  // isValidColor
  describe('isValidColor', () => {
    it('accepts hex colors', () => {
      expect(isValidColor('#ff0000')).toBe(true);
    });

    it('accepts named colors', () => {
      expect(isValidColor('red')).toBe(true);
    });

    it('accepts rgb colors', () => {
      expect(isValidColor('rgb(0, 0, 255)')).toBe(true);
    });

    it('rejects invalid color strings', () => {
      expect(isValidColor('not-a-color')).toBe(false);
    });

    it('rejects random words', () => {
      expect(isValidColor('blueish')).toBe(false);
    });
  });

  // isValidGradient
  describe('isValidGradient', () => {
    it('accepts linear gradients', () => {
      expect(isValidGradient('linear-gradient(90deg, #ff0000, #00ff00)')).toBe(true);
    });

    it('accepts radial gradients', () => {
      expect(isValidGradient('radial-gradient(circle, #ff0000)')).toBe(true);
    });

    it('accepts conic gradients', () => {
      expect(isValidGradient('conic-gradient(from 0deg, #ff0000)')).toBe(true);
    });

    it('rejects invalid gradient strings', () => {
      expect(isValidGradient('invalid')).toBe(false);
    });

    it('rejects the bare word gradient without a type', () => {
      expect(isValidGradient('gradient')).toBe(false);
    });
  });
});
