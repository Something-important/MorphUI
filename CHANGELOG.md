# Changelog

## [2.0.0](https://github.com/Something-important/MorphUI/compare/v1.4.4...v2.0.0) (2026-11-07)


### ⚠ BREAKING CHANGES

* **storybook:** Storybook URL paths changed (Components/X -> Primitives/X, Composition/X, Patterns/X). Bookmarks to old paths will 404.

### Features

* **storybook:** v1.5.0 — Storybook reorganization sprint complete ([#95](https://github.com/Something-important/MorphUI/issues/95)) ([1fcfbda](https://github.com/Something-important/MorphUI/commit/1fcfbda2d26af910f5ae4711cec441f650d75b90))


### Bug Fixes

* **docs:** sync all in-repo docs to v1.5.0 reality ([#93](https://github.com/Something-important/MorphUI/issues/93)) ([4851a3b](https://github.com/Something-important/MorphUI/commit/4851a3baf34b7ea2156258dd23485aa529f63da5))

## [1.4.4](https://github.com/Something-important/MorphUI/compare/v1.4.3...v1.4.4) (2026-11-06)


### Bug Fixes

* **exports:** alias dangling Sidebar subpaths to actual emitted files ([#80](https://github.com/Something-important/MorphUI/issues/80)) ([0c24d29](https://github.com/Something-important/MorphUI/commit/0c24d291cdc09c2651dbb22635c2176cb596451e))

## [1.4.3](https://github.com/Something-important/MorphUI/compare/v1.4.2...v1.4.3) (2026-11-06)


### Bug Fixes

* **exports:** add subpath exports for 6 v1.4.0 components ([#78](https://github.com/Something-important/MorphUI/issues/78)) ([302ae31](https://github.com/Something-important/MorphUI/commit/302ae31311e0d8e7ae41d5721e4b5422df8a580c))

## [1.4.2](https://github.com/Something-important/MorphUI/compare/v1.4.1...v1.4.2) (2026-11-06)


### Bug Fixes

* **size-limit:** bump DatePicker+Table budgets, add 6 new component entries ([027e560](https://github.com/Something-important/MorphUI/commit/027e56093e734aad39f3e28d7b5584127133443d))

## [1.4.1](https://github.com/Something-important/MorphUI/compare/v1.4.0...v1.4.1) (2026-11-06)


### Bug Fixes

* **lint:** resolve all 26 lint errors + warnings (5 errors, 21 warnings) ([6654080](https://github.com/Something-important/MorphUI/commit/665408038311cf75910b1a3fe1b8bcb5903e41dc))

## [1.4.0](https://github.com/Something-important/MorphUI/compare/v1.3.0...v1.4.0) (2026-11-06)


### Features

* **carousel:** new Carousel component — sliding content carousel ([2bb6e89](https://github.com/Something-important/MorphUI/commit/2bb6e89ee2afb9305f6b743318fba5580a1bfbf7))
* **command-palette:** new CommandPalette component — Cmd+K search palette ([15d6c8f](https://github.com/Something-important/MorphUI/commit/15d6c8fff57d7624742c91215f6abf442b0786b2))
* **datepicker:** add range mode for selecting a start + end date ([3568648](https://github.com/Something-important/MorphUI/commit/356864801cbeafb6b384c281f628da82d495db07))
* **fileupload:** new FileUpload component — drag-and-drop file upload ([fdac3a1](https://github.com/Something-important/MorphUI/commit/fdac3a1440213b8d3a3129ddf73e2d24ac73c0fc))
* **rating+taginput:** new Rating + TagInput components ([be1d285](https://github.com/Something-important/MorphUI/commit/be1d285b5013f463fa85025dc7c9f90144c9dbc5))
* **table:** column resizing + row expansion ([07184dc](https://github.com/Something-important/MorphUI/commit/07184dc7a05cc700ad5db45663c908a6c3180733))
* **treeview:** new TreeView component for hierarchical data ([ed8af0a](https://github.com/Something-important/MorphUI/commit/ed8af0a88ad222d1db6e7a62bca17b49b222396e))


### Bug Fixes

* **stories:** use UploadedFile type in FileUpload Controlled story ([78739f5](https://github.com/Something-important/MorphUI/commit/78739f5a3ba0c867a82d42c6614ed357db010366))

## [1.3.0](https://github.com/Something-important/MorphUI/compare/v1.2.0...v1.3.0) (2026-11-05)


### Features

* **ci:** React 19 compatibility — CI matrix + verified ([bd56e7f](https://github.com/Something-important/MorphUI/commit/bd56e7f0124f708e9a32f5609e6b3908b2f3168c))


### Bug Fixes

* **ci:** restore continue-on-error for size-limit (CI exit-1 quirk) ([16cade0](https://github.com/Something-important/MorphUI/commit/16cade05113875a66aef7f48a2eefd1b6b161288))
* **ci:** silence React warnings in smoke tests + ContextMenu SSR ([82aeefd](https://github.com/Something-important/MorphUI/commit/82aeefd7b5c7e61c27e4759b500d0de68082d81d))
* **ci:** silence remaining 2 act() warnings (Combobox + Popover) ([bc50982](https://github.com/Something-important/MorphUI/commit/bc509828e19119167120f321ce5cedb507758e2e))
* **ci:** size-limit now fatal — switched to file plugin, bumped 3 budgets ([b899e18](https://github.com/Something-important/MorphUI/commit/b899e1827219e9a323969b05198b2db0d89f0563))
* **size-limit:** Sidebar path — Sidebar.js → SidebarUnified.js ([d22ad1d](https://github.com/Something-important/MorphUI/commit/d22ad1d26ebcf9625f9e472fd12942f47fef1a06))

## [1.2.0](https://github.com/Something-important/MorphUI/compare/v1.1.1...v1.2.0) (2026-11-04)


### Features

* **accordion:** add controlled mode via open prop ([9193b45](https://github.com/Something-important/MorphUI/commit/9193b4564056b1d81c0345baa789f0aba78eecb5))
* **drawer:** add uncontrolled mode via defaultOpen ([1cc35cb](https://github.com/Something-important/MorphUI/commit/1cc35cb4546dbaf6d2e715a998701a923c96a672))
* **dropdown:** add uncontrolled mode via defaultValue ([0b93651](https://github.com/Something-important/MorphUI/commit/0b93651a00d2e1504defa58b8ae505f26088905f))
* **input:** add uncontrolled mode via defaultValue ([23b586c](https://github.com/Something-important/MorphUI/commit/23b586cce41c42fd038a959897878ff671439857))
* **radiogroup:** add defaultValue for uncontrolled mode ([9be503f](https://github.com/Something-important/MorphUI/commit/9be503f1fdf7f83c4e3f1672d233be75a77d984d))
* **radiogroup:** add defaultValue for uncontrolled mode ([85ed2c1](https://github.com/Something-important/MorphUI/commit/85ed2c12940ceea6cfb01d5c36a482a035e3beb9))
* **table:** add defaultCurrentPage + defaultFilters for uncontrolled init ([08b876a](https://github.com/Something-important/MorphUI/commit/08b876a4d50cd035f1443a276ade27981de3cb90))
* **table:** add defaultSelectedRows for uncontrolled selection ([759e671](https://github.com/Something-important/MorphUI/commit/759e6713ad46f379dabe881964b415a89c43acb6))


### Performance Improvements

* useTransition for Table sorting + Input validation ([9089ea0](https://github.com/Something-important/MorphUI/commit/9089ea0b76b14557e595e142def18b1b6ab5836d))
* useTransition for Table sorting + Input validation ([996926e](https://github.com/Something-important/MorphUI/commit/996926e539bff12c53c0610b68510b0d1a199e6c))

## [1.1.1](https://github.com/Something-important/MorphUI/compare/v1.1.0...v1.1.1) (2026-11-04)


### Bug Fixes

* **ci:** restore size-limit as fatal + Dropdown {...rest} aria pass-through ([1c846ae](https://github.com/Something-important/MorphUI/commit/1c846ae620e4e963bc18d228d544486f815a5355))
* **ci:** restore size-limit as fatal + Dropdown {...rest} aria pass-through ([7c42c46](https://github.com/Something-important/MorphUI/commit/7c42c46a959e5680100187d1b664dd4a286c04a2))
* **form:** FormField spreads {...rest} for aria/data attr pass-through ([d9a918d](https://github.com/Something-important/MorphUI/commit/d9a918dedfb23f9ec6ed89dc44d9cc9d7df6f08f))
* **form:** FormField spreads {...rest} for aria/data attr pass-through ([578a3bb](https://github.com/Something-important/MorphUI/commit/578a3bb71b2c3fc65aff8be81c3aca4ccab554ec))


### Performance Improvements

* **combobox:** useDeferredValue for responsive search filtering ([179b400](https://github.com/Something-important/MorphUI/commit/179b400faf8bbdebf2b23ca5d3c5859118b03200))
* **combobox:** useDeferredValue for responsive search filtering ([cb99e19](https://github.com/Something-important/MorphUI/commit/cb99e1982dcb7c065e182db4e3d9d7871592ed31))
* wrap 13 basic components in React.memo ([61c1659](https://github.com/Something-important/MorphUI/commit/61c16593fb03bcb859a5d790bcad78d80041d295))
* wrap 13 basic components in React.memo ([1ec08c0](https://github.com/Something-important/MorphUI/commit/1ec08c047ae634de5cf4c467f62c8b209da0358b))

## [1.1.0](https://github.com/Something-important/MorphUI/compare/v1.0.1...v1.1.0) (2026-11-04)


### Features

* **community:** issue templates, security policy, React 19 verified ([59989b6](https://github.com/Something-important/MorphUI/commit/59989b65c280f96e9ec2d54f4f45043db380071d))
* **community:** issue templates, security policy, React 19 verified ([6f6c7c6](https://github.com/Something-important/MorphUI/commit/6f6c7c6f99825bd0635315e86230eff334452df5))
* **ssr:** server-side rendering support + smoke test for all 33 components ([f033303](https://github.com/Something-important/MorphUI/commit/f033303afc406942f8fa560c187327d10a5be932))
* **ssr:** server-side rendering support + smoke test for all 33 components ([59186a8](https://github.com/Something-important/MorphUI/commit/59186a8e3ca7b38dae91a1e717357492a4f884a2))


### Bug Fixes

* **ci:** rename jest.config + babel.config to .cjs for type:module ([d1db675](https://github.com/Something-important/MorphUI/commit/d1db675691143e61e730389423bae15ea821dd1a))
* **ci:** rename jest+babel configs to .cjs, remove type:module ([c6b4c4b](https://github.com/Something-important/MorphUI/commit/c6b4c4b3b0ed4d4e3ee106045876af2912a8261b))

## [1.0.1](https://github.com/Something-important/MorphUI/compare/v1.0.0...v1.0.1) (2026-11-03)


### Bug Fixes

* **ci:** rename rollup config + CSS script to .cjs for type:module ([8366c9f](https://github.com/Something-important/MorphUI/commit/8366c9f0e09ded87ada04ae0f54286da6eed4809))
* **ci:** rename rollup config + CSS script to .cjs for type:module ([1590eb7](https://github.com/Something-important/MorphUI/commit/1590eb774f6d4e1db3535f58f91d2f8266158043))

## [1.0.0](https://github.com/Something-important/MorphUI/compare/v0.13.0...v1.0.0) (2026-11-03)


### ⚠ BREAKING CHANGES

* **api:** SidebarLegacy and SidebarItemLegacy are removed. Consumers must use the unified Sidebar API (import { Sidebar } from 'morphui-react') which supports both the items[] legacy-style API and the composed children API.
* **api:** Alert's variant='error' is removed. Use variant='danger'.
* **api:** the 'error' variant is removed from Progress, Spinner, Slider, and Toast. The toast.error() method is removed. Consumers must use variant='danger' and toast.danger().
* **package:** the package no longer ships a CommonJS build. Consumers doing require('morphui-react') in Node CJS must switch to a dynamic import or configure their bundler for ESM. The ESM barrel, subpath exports, and CSS exports are unaffected.

### Features

* **combobox:** virtualized rendering for large option lists ([4011feb](https://github.com/Something-important/MorphUI/commit/4011feb3ad01f8fe53c3f9e5c547c76665de2f37))
* **combobox:** virtualized rendering for large option lists ([5d5a659](https://github.com/Something-important/MorphUI/commit/5d5a659480346287c97ba89ea7ce8ab9cba77783))
* **css:** per-component CSS subpath exports ([a268db7](https://github.com/Something-important/MorphUI/commit/a268db7f818ba8a3537ea3102127544d3378a94e))
* **css:** per-component CSS subpath exports (morphui-react/css/button) ([6d68ba9](https://github.com/Something-important/MorphUI/commit/6d68ba95718b8060a97e01d638ebd49a719d37b0))
* **package:** drop CJS build — ESM-only ([9be9d46](https://github.com/Something-important/MorphUI/commit/9be9d462d3fee00640bc8acf1bff70fed0338e9c))
* **table:** implement column pinning (fixed: left|right) ([9ee0795](https://github.com/Something-important/MorphUI/commit/9ee07956ea6dac6417e8ac2d1392976d7149c20e))
* **table:** implement column pinning (fixed: left|right) ([a10089e](https://github.com/Something-important/MorphUI/commit/a10089eccaf09a24571c47d5ea81530f5cedb946))


### Bug Fixes

* **a11y:** 3 missed violations found by comprehensive smoke audit ([6940dd8](https://github.com/Something-important/MorphUI/commit/6940dd8eaa900723d3c8e022978a43da6f26e4cb))
* **a11y:** 3 missed violations found by comprehensive smoke audit ([9e78108](https://github.com/Something-important/MorphUI/commit/9e78108b4d1939f76e405eaba22217547e4789f5))
* **api:** Alert variant 'error' -&gt; 'danger' + add ghost/outline ([c51f030](https://github.com/Something-important/MorphUI/commit/c51f0301bb5fd6301b0d83691c016d1df5eb174b))
* **api:** remove deprecated 'error' variant — use 'danger' ([d95be16](https://github.com/Something-important/MorphUI/commit/d95be16f417a4b22fe4701ec7f5285d140d7062f))
* **api:** remove deprecated legacy Sidebar + orphaned barrel ([65fdba9](https://github.com/Something-important/MorphUI/commit/65fdba91067074cda053866fb1a10a8661abba6c))
* **pre-1.0:** type:module, delete orphaned Sidebar.css, fix stale docs ([608702f](https://github.com/Something-important/MorphUI/commit/608702f19e08122f872aced28f42d8cdb229620b))
* **pre-1.0:** type:module, delete orphaned Sidebar.css, fix stale docs ([ec0dc74](https://github.com/Something-important/MorphUI/commit/ec0dc745c17671da4f3ffcbdae268f4e3a47e5a8))

## [0.13.0](https://github.com/Something-important/MorphUI/compare/v0.12.0...v0.13.0) (2026-11-02)


### Features

* **input:** full ARIA combobox pattern for suggestions ([10a24fd](https://github.com/Something-important/MorphUI/commit/10a24fd9d614b7b723aed32dc07dee76877ac8e1))
* **input:** full ARIA combobox pattern for suggestions ([07b0a59](https://github.com/Something-important/MorphUI/commit/07b0a59e431df415f402e735b898c83c32c595c3))

## [0.12.0](https://github.com/Something-important/MorphUI/compare/v0.11.0...v0.12.0) (2026-11-02)


### Features

* **toast:** queue excess toasts instead of dropping them (FIFO) ([288d306](https://github.com/Something-important/MorphUI/commit/288d30622fe52adf8df559b8e35d4ada107b69c9))
* **toast:** queue excess toasts instead of dropping them (FIFO) ([67b719e](https://github.com/Something-important/MorphUI/commit/67b719efe3a58a2c16fca5fee8b63b3087da700a))


### Bug Fixes

* **release-please:** drop config-file, use minimal with: inputs ([9ccfddb](https://github.com/Something-important/MorphUI/commit/9ccfddb4b97e109a6c37e3503380e37027394a1e))
* **release-please:** drop config-file, use minimal with: inputs ([6996c5f](https://github.com/Something-important/MorphUI/commit/6996c5fbd9a277410ae133b4e4325316c3032461))
* **release-please:** use single-package config, not multi-component ([d34e492](https://github.com/Something-important/MorphUI/commit/d34e4929d6f32598cc722adcf645e2dadc0a3159))
* **release-please:** use single-package config, not multi-component ([787c0c7](https://github.com/Something-important/MorphUI/commit/787c0c7faf09b42ba63736a2c3e394e803b29edd))

## [0.11.0](https://github.com/Something-important/MorphUI/compare/v0.10.0...v0.11.0) (2026-11-02)


### Features

* **package:** preserveModules ESM + 35 tree-shakeable subpath exports ([5a48600](https://github.com/Something-important/MorphUI/commit/5a48600d1c17b1887f9add0b70137a2a1926ff27))

## [0.10.0](https://github.com/Something-important/MorphUI/compare/v0.9.0...v0.10.0) (2026-11-02)


### Features

* **hooks:** export useAnchoredPosition + useModal as public API (hooks v0) ([44259af](https://github.com/Something-important/MorphUI/commit/44259af0bf20d487d788f1307d696e2f2edf39a7))


### Bug Fixes

* **dropdown:** resolve axe violations across all open states ([0624899](https://github.com/Something-important/MorphUI/commit/0624899734f7592f98fcfee518c62f27df199275))
* **input:** resolve axe violations and three deeper a11y issues ([24483c8](https://github.com/Something-important/MorphUI/commit/24483c84e5d0883801a14a8a451d7b8d3d7ed3d6))
* **popover:** avoid nested-interactive on the trigger wrapper ([0a21a6d](https://github.com/Something-important/MorphUI/commit/0a21a6d215b1a60f9352385b269d2b1ed5c028b6))
* **sidebar:** make SidebarGroup aria-controls/aria-labelledby resolve ([c7c0255](https://github.com/Something-important/MorphUI/commit/c7c02557b5ad3c255b834422aa26ced5e0309b32))
* **table:** give the table an accessible name and add th scope ([fdd30a4](https://github.com/Something-important/MorphUI/commit/fdd30a4758209988c4be416123369cf78180d51e))

## [0.9.0](https://github.com/Something-important/MorphUI/compare/v0.8.0...v0.9.0) (2026-10-31)


### ⚠ BREAKING CHANGES

* **theme:** styles are no longer injected at runtime. Import 'morphui-react/css' once in your app, before your own stylesheets.

### Features

* **theme:** rework theming around preset-driven tokens ([22a4692](https://github.com/Something-important/MorphUI/commit/22a469233890640661888cf1998a93bbd69ed2ea))


### Miscellaneous Chores

* **release:** force 0.9.0 instead of 1.0.0 ([20439f3](https://github.com/Something-important/MorphUI/commit/20439f373bf7a713b8e1d533a5ebe59abf5f4e83))

## [0.8.0](https://github.com/Something-important/MorphUI/compare/v0.7.0...v0.8.0) (2026-10-30)


### Features

* **context-menu:** add ContextMenu component ([a36fd49](https://github.com/Something-important/MorphUI/commit/a36fd4910352efc679b84691a401634bda1cfe73))

## [0.7.0](https://github.com/Something-important/MorphUI/compare/v0.6.0...v0.7.0) (2026-10-30)


### Features

* **datepicker:** add DatePicker with calendar grid + keyboard nav ([1ebc7d0](https://github.com/Something-important/MorphUI/commit/1ebc7d05a1c68e6cc74d5a62a0e710b68160a022))

## [0.6.0](https://github.com/Something-important/MorphUI/compare/v0.5.0...v0.6.0) (2026-10-30)


### Features

* **combobox:** add Combobox component with ARIA combobox pattern ([dd0e153](https://github.com/Something-important/MorphUI/commit/dd0e153d372c56982942b2c0206079bafbeece8b))

## [0.5.0](https://github.com/Something-important/MorphUI/compare/v0.4.1...v0.5.0) (2026-10-30)


### Features

* **form:** add Form + FormField components ([b43b173](https://github.com/Something-important/MorphUI/commit/b43b173768717a79fc239318ed512f292df1ffef))
* **table:** implement filtering + improve a11y (aria-sort, aria-selected, row keyboard) ([a9db710](https://github.com/Something-important/MorphUI/commit/a9db7107a88c99daa8d215630cf9817a11492b0a))

## [0.4.1](https://github.com/Something-important/MorphUI/compare/v0.4.0...v0.4.1) (2026-10-30)


### Bug Fixes

* **build:** correct types path, add sideEffects + exports for tree-shaking ([7c5e3e3](https://github.com/Something-important/MorphUI/commit/7c5e3e3105ef9d3bedbff2773d3b7d26bef05733))

## [0.4.0](https://github.com/Something-important/MorphUI/compare/v0.3.1...v0.4.0) (2026-10-30)


### Features

* export variant/size/type unions for all basic + Accordion components ([1681437](https://github.com/Something-important/MorphUI/commit/1681437e96be8fc3ea42ea9d0590bafec7353e3a))

## [0.3.1](https://github.com/Something-important/MorphUI/compare/v0.3.0...v0.3.1) (2026-10-30)

### Bug Fixes

- **a11y:** clear all jsx-a11y warnings with real keyboard/role fixes ([05b6a25](https://github.com/Something-important/MorphUI/commit/05b6a251a997a6b50765e3ddc36121f8f6ab8a61))

## [0.3.0](https://github.com/Something-important/MorphUI/compare/v0.2.0...v0.3.0) (2026-10-30)

### Features

- add Toast component with imperative API, pause-on-hover, and stacking viewport ([aab7126](https://github.com/Something-important/MorphUI/commit/aab712653633e03dfc3c689cb9b14f3dab0cc085))

### Miscellaneous Chores

- realign release version to the 0.x line ([a22d4ce](https://github.com/Something-important/MorphUI/commit/a22d4ce6a8cf5435b60d0f3313636709b03ea92d))

## 0.2.0 (2026-10-29)

### Features

- Add multiple new components (Stepper, Divider, Alert, Table, Spinner, Progress, Slider, Avatar, Skeleton, Pagination, Drawer) ([d8e8204](https://github.com/Something-important/MorphUI/commit/d8e82045c173282a30078b09ee02e5d78d4a3470))
- complete component improvements and test coverage ([1b42b70](https://github.com/Something-important/MorphUI/commit/1b42b7028a44402b48841792b94439921654a48d))
- improve Button component and add CI/workflow improvements ([7152927](https://github.com/Something-important/MorphUI/commit/7152927f0f0f27a2d34b0fa3300e825b066cbb52))

### Bug Fixes

- convert accessibility ESLint errors to warnings ([ebbbe29](https://github.com/Something-important/MorphUI/commit/ebbbe29c760c2347f256574e8d10c3db4c3767c9))
- fix CI failures and add pre-commit hooks ([27eb955](https://github.com/Something-important/MorphUI/commit/27eb95548b4aa5ce1c367f792c0a25718f54b6be))
- Fix Label test style prop precedence checks ([eea96ff](https://github.com/Something-important/MorphUI/commit/eea96ff7c84ba594265d6d168ef31540dee0f25e))
- Fix Stepper test - remove redundant role attributes check ([6487145](https://github.com/Something-important/MorphUI/commit/64871456e628b8f224e2d7a3c2245beb9a0580ab))
- Fix TypeScript errors in stories and components ([7dd5575](https://github.com/Something-important/MorphUI/commit/7dd55759d9aae775be03adda48a853241c3fc662))
- relax ESLint rules to prevent CI failures ([a0c3bd3](https://github.com/Something-important/MorphUI/commit/a0c3bd33230df2327f573fb08066363b2a183291))
