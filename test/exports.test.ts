import { readFileSync } from 'fs';
import { resolve } from 'path';

/**
 * Guards the package.json subpath exports mapping. CI runs this before the
 * build step, so it checks structural validity (every subpath has both
 * `import` and `types`, paths follow the expected conventions) rather than
 * file existence. A component rename that forgets to update the mapping
 * shows up here.
 */
describe('package.json exports', () => {
  const pkg = JSON.parse(readFileSync(resolve(__dirname, '..', 'package.json'), 'utf8')) as {
    exports: Record<string, Record<string, string>>;
  };

  const passthrough = new Set(['.', './css', './dist/*', './package.json']);
  const subpaths = Object.entries(pkg.exports).filter(([k]) => !passthrough.has(k));

  it('maps at least 30 component/hook subpaths', () => {
    expect(subpaths.length).toBeGreaterThanOrEqual(30);
  });

  it.each(subpaths.map(([k, v]) => [k, v] as const))(
    '%s has both import and types pointing into dist/',
    (_subpath, entry) => {
      expect(entry.import).toBeDefined();
      expect(entry.types).toBeDefined();
      expect(entry.import.startsWith('./dist/esm/')).toBe(true);
      expect(entry.types.startsWith('./dist/')).toBe(true);
    },
  );

  it.each(subpaths.map(([k]) => [k] as const))('%s is lowercase-hyphenated', (subpath) => {
    // ./button, ./radio-group, ./use-anchored-position — no uppercase, no camelCase.
    const name = subpath.slice(2);
    expect(name).toBe(name.toLowerCase());
    expect(name).toMatch(/^[a-z][a-z0-9-]*$/);
  });

  it('the barrel (.) still resolves to the single-file bundle for backward compat', () => {
    const barrel = pkg.exports['.'];
    expect(barrel.import).toBe('./dist/index.esm.js');
    expect(barrel.require).toBe('./dist/index.js');
    expect(barrel.types).toBe('./dist/components/index.d.ts');
  });
});
