#!/usr/bin/env node
/**
 * Generate per-component CSS files in dist/css/.
 *
 * Each component's source CSS (src/components/<tier>/<Component>/<Component>.css)
 * is minified and written to dist/css/<component-name>.css, so consumers can
 * import only the CSS they need:
 *
 *   import 'morphui-react/css/theme';   // :root tokens (required once)
 *   import 'morphui-react/css/button';  // Button CSS only
 *
 * The full bundle (dist/morphui.css) is still produced by the rollup build
 * and remains the default via `import 'morphui-react/css'`.
 */
const fs = require('fs');
const path = require('path');
const postcss = require('postcss');
const cssnano = require('cssnano');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'components');
const OUT = path.join(ROOT, 'dist', 'css');

// CamelCase -> lowercase-hyphenated, acronym-aware.
// Button -> button, RadioGroup -> radio-group, OTPInput -> otp-input.
// A naive split-on-every-capital turns OTPInput into o-t-p-input, which
// breaks the `morphui-react/css/otp-input` export (shipped as v2.1.0 bug,
// fixed in v2.1.1).
function toKebab(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2') // lower/digit followed by Capital: aB -> a-B
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2') // acronym followed by word: OTPInput -> OTP-Input
    .toLowerCase();
}

async function minifyCss(filePath) {
  const css = fs.readFileSync(filePath, 'utf8');
  const result = await postcss([cssnano({ preset: 'default' })]).process(css, {
    from: filePath,
  });
  return result.css;
}

async function main() {
  if (!fs.existsSync(OUT)) {
    fs.mkdirSync(OUT, { recursive: true });
  }

  const entries = {};

  // 1. Theme tokens (:root) — required by every component via var(--color-*).
  const themeCss = path.join(SRC, 'theme', 'theme.css');
  if (fs.existsSync(themeCss)) {
    const minified = await minifyCss(themeCss);
    fs.writeFileSync(path.join(OUT, 'theme.css'), minified);
    entries.theme = './dist/css/theme.css';
    console.log(`  theme.css (tokens)`);
  }

  // 2. Each component's CSS.
  const componentCssFiles = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.endsWith('.css') && !full.includes('/theme/')) {
        componentCssFiles.push(full);
      }
    }
  }
  walk(SRC);

  for (const cssFile of componentCssFiles) {
    const baseName = path.basename(cssFile, '.css'); // e.g., Button
    const kebab = toKebab(baseName); // e.g., button
    const minified = await minifyCss(cssFile);
    const outFile = path.join(OUT, `${kebab}.css`);
    fs.writeFileSync(outFile, minified);
    entries[kebab] = `./dist/css/${kebab}.css`;
  }

  console.log(`Wrote ${Object.keys(entries).length} CSS files to dist/css/`);

  // 3. Validate against package.json: every `./css/*` export must resolve to
  //    a file this script just wrote, and every written file must be exported.
  //    This is the guard that would have caught the otp-input casing bug.
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const cssExports = Object.entries(pkg.exports || {})
    .filter(([key]) => key.startsWith('./css/'))
    .map(([key, target]) => ({ key, file: path.basename(target) }));

  const written = new Set(Object.keys(entries));
  const problems = [];

  for (const { key, file } of cssExports) {
    if (!written.has(file.replace(/\.css$/, ''))) {
      problems.push(`export ${key} -> ${file}, but that file was not generated`);
    }
  }
  for (const name of written) {
    const isExported = cssExports.some(({ file }) => file.replace(/\.css$/, '') === name);
    if (!isExported) {
      problems.push(`generated ${name}.css, but no ./css/* export points at it`);
    }
  }

  if (problems.length > 0) {
    console.error(
      `\nCSS export validation FAILED (${problems.length} problem${problems.length > 1 ? 's' : ''}):`,
    );
    for (const p of problems) {
      console.error(`  - ${p}`);
    }
    console.error('\npackage.json exports and scripts/generate_component_css.cjs are out of sync.');
    process.exit(1);
  }
  console.log(`  exports validated: ${cssExports.length} ./css/* subpaths all resolve`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
