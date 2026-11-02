const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const pkg = require('./package.json');

const sharedPlugins = () => [peerDepsExternal(), resolve(), commonjs()];

const external = Object.keys(pkg.peerDependencies || {});

// Config 1 — the existing single-file build: CJS + ESM barrels, type
// declarations, and the single extracted CSS. Backward-compatible with
// `import { Button } from 'morphui-react'` and `import 'morphui-react/css'`.
const singleFileBuild = {
  input: 'src/components/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    ...sharedPlugins(),
    typescript({
      // Scoped config: excludes *.stories.tsx and src/stories so no
      // Storybook declarations leak into dist.
      tsconfig: './tsconfig.build.json',
      declaration: true,
      declarationDir: 'dist',
    }),
    // Extract all component CSS into a single dist CSS file instead of
    // runtime <style> injection. Consumers then control load order:
    //   import 'morphui-react/dist/morphui.css';
    // This keeps user stylesheets able to override ours without !important.
    postcss({
      extract: 'morphui.css',
      minimize: true,
    }),
  ],
  external,
};

// Config 2 — preserveModules ESM for tree-shakeable subpath imports
// (`morphui-react/button`). One output file per source module, so consumers
// importing a single component pull only its code (and its shared
// dependencies). Declarations come from config 1; CSS comes from config 1's
// single extract. @rollup/plugin-typescript cannot mix `file` and `dir`
// outputs in one config, so this is a separate build pass.
const preserveModulesBuild = {
  input: 'src/components/index.ts',
  output: {
    dir: 'dist/esm',
    format: 'esm',
    sourcemap: true,
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
  },
  plugins: [
    ...sharedPlugins(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: false,
      declarationDir: undefined,
      // Override the base outDir so it sits inside this config's dir
      // (required by @rollup/plugin-typescript's path validation).
      outDir: 'dist/esm',
    }),
    // Handle CSS imports without extracting or injecting — the single
    // morphui.css is produced by config 1. This just strips the
    // `import './X.css'` statements so rollup doesn't try to parse CSS
    // as JavaScript.
    postcss({
      extract: false,
      inject: false,
      minimize: true,
    }),
  ],
  external,
};

module.exports = [singleFileBuild, preserveModulesBuild];
