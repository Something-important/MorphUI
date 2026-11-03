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

// CamelCase -> lowercase-hyphenated (Button -> button, RadioGroup -> radio-group)
function toKebab(name) {
  return name.replace(/(?<!^)(?=[A-Z])/g, '-').toLowerCase();
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
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
