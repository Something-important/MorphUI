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
    main?: string;
    exports: Record<string, Record<string, string>>;
  };

  const passthrough = new Set(['.', './css', './dist/*', './package.json']);
  // CSS subpaths (./css/*) are plain string paths to .css files, not
  // JS-module objects with import/types. Separate them from JS subpaths.
  const allSubpaths = Object.entries(pkg.exports).filter(([k]) => !passthrough.has(k));
  const jsSubpaths = allSubpaths.filter(([k]) => !k.startsWith('./css/'));
  const cssSubpaths = allSubpaths.filter(([k]) => k.startsWith('./css/'));

  it('maps at least 30 JS component/hook subpaths', () => {
    expect(jsSubpaths.length).toBeGreaterThanOrEqual(30);
  });

  it('maps at least 30 CSS subpaths', () => {
    expect(cssSubpaths.length).toBeGreaterThanOrEqual(30);
  });

  it.each(jsSubpaths.map(([k, v]) => [k, v] as const))(
    '%s has both import and types pointing into dist/',
    (_subpath, entry) => {
      expect(entry.import).toBeDefined();
      expect(entry.types).toBeDefined();
      expect(entry.import.startsWith('./dist/esm/')).toBe(true);
      expect(entry.types.startsWith('./dist/')).toBe(true);
    },
  );

  it.each(cssSubpaths.map(([k]) => [k] as const))('%s points into dist/css/', (subpath) => {
    const value = pkg.exports[subpath] as unknown;
    expect(typeof value).toBe('string');
    expect(value).toMatch(/^\.\/dist\/css\/[\w-]+\.css$/);
  });

  it.each(allSubpaths.map(([k]) => [k] as const))('%s is lowercase-hyphenated', (subpath) => {
    // ./button, ./radio-group, ./css/context-menu — no uppercase, no camelCase.
    const name = subpath.slice(2);
    expect(name).toBe(name.toLowerCase());
    expect(name).toMatch(/^[a-z][a-z0-9-/]*$/);
  });

  it('the barrel (.) resolves to the ESM single-file bundle (ESM-only since 0.14.0)', () => {
    const barrel = pkg.exports['.'];
    expect(barrel.import).toBe('./dist/index.esm.js');
    expect(barrel.types).toBe('./dist/components/index.d.ts');
    // CJS is gone — no `require` field, no `main` in package.json.
    expect(barrel.require).toBeUndefined();
    expect(pkg.main).toBeUndefined();
  });
});
