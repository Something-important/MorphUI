const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const pkg = require('./package.json');

module.exports = {
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
    peerDepsExternal(),
    resolve(),
    commonjs(),
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
  external: Object.keys(pkg.peerDependencies || {}),
};
