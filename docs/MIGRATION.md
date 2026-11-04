# Migration Guide: 0.x → 1.0

MorphUI 1.0 stabilizes the API with four breaking changes. This guide
walks through each and shows the replacement.

## Summary

| Breaking change                      | What to do                                     |
| ------------------------------------ | ---------------------------------------------- |
| CJS build dropped                    | Use ESM imports (bundler or dynamic import)    |
| `variant="error"` removed            | Use `variant="danger"`                         |
| `toast.error()` removed              | Use `toast.danger()`                           |
| Alert `variant="error"` → `"danger"` | Same rename + `ghost`/`outline` added          |
| `SidebarLegacy` removed              | Use the unified `Sidebar` (same `items[]` API) |

---

## 1. ESM-only (no CommonJS build)

**Before (0.x):** The package shipped both CJS (`dist/index.js`) and ESM
(`dist/index.esm.js`). Node `require()` worked.

**After (1.0):** Only ESM. The `main` field and `require` export are removed.
The `exports` field maps `.` → `import` (ESM) + `types`.

**If you use a bundler** (webpack, vite, esbuild, rollup, Turbopack):
no change needed — bundlers already resolve ESM via the `exports` field.

**If you use Node `require()` directly:**

```js
// Before — works in 0.x
const { Button } = require('morphui-react');

// After — use dynamic import in 1.0
const { Button } = await import('morphui-react');
```

**TypeScript:** no change — `import { Button } from 'morphui-react'` works
in both versions.

---

## 2. `variant="error"` → `variant="danger"`

The `error` variant was a deprecated alias of `danger` since 0.9.0. In 1.0
it is removed from **Progress, Spinner, Slider, and Toast**.

```tsx
// Before
<Progress value={50} variant="error" />
<Spinner variant="error" />
<Slider value={50} variant="error" />
<Toast variant="error" title="Failed" />

// After
<Progress value={50} variant="danger" />
<Spinner variant="danger" />
<Slider value={50} variant="danger" />
<Toast variant="danger" title="Failed" />
```

The visual appearance is identical — `error` was always mapped to the
`danger` CSS class internally.

---

## 3. `toast.error()` → `toast.danger()`

The imperative toast API had a deprecated `error()` method aliased to
`danger()`. In 1.0 it is removed.

```tsx
// Before
const { toast } = useToast();
toast.error('Upload failed');

// After
toast.danger('Upload failed');
```

---

## 4. Alert `variant="error"` → `"danger"` + new variants

Alert was the only component using `error` as a first-class variant (not a
deprecated alias). In 1.0 it is renamed to `danger` for API uniformity.
Two new variants are also added: `ghost` and `outline`.

```tsx
// Before
<Alert variant="error">Something went wrong</Alert>

// After
<Alert variant="danger">Something went wrong</Alert>

// New in 1.0
<Alert variant="ghost">Subtle message</Alert>
<Alert variant="outline">Bordered message</Alert>
```

The `aria-live="assertive"` behavior (previously keyed on `error`) now
fires for `variant="danger"`.

---

## 5. `SidebarLegacy` removed

The old single-component `Sidebar` API (`SidebarLegacy` /
`SidebarItemLegacy`) is removed. It was superseded by the unified
`Sidebar` component (exported as `Sidebar` since 0.9.0) which supports
both the `items[]` array API and the composed children API.

```tsx
// Before (legacy — removed in 1.0)
import { SidebarLegacy } from 'morphui-react';
<SidebarLegacy items={items} activeItem="home" onChange={setActive} />;

// After (unified — works the same way)
import { Sidebar } from 'morphui-react';
<Sidebar items={items} defaultActiveItem="home" onChange={setActive} />;
```

If you used the composed API (`Sidebar.Root`, `Sidebar.Header`, etc.),
no change — those are unchanged.

---

## New in 1.0 (non-breaking additions)

These are new features available in 1.0 that don't require migration:

- **Headless hooks**: `useAnchoredPosition`, `useModal`, `useToast` exported
  as public API.
- **ESM subpath exports**: `import { Button } from 'morphui-react/button'`
  for tree-shakeable per-component imports.
- **Per-component CSS**: `import 'morphui-react/css/button'` (plus
  `morphui-react/css/theme` for the `:root` tokens).
- **Combobox virtualization**: `virtualize` + `itemHeight` props for
  1000+ option lists.
- **Table column pinning**: `fixed: 'left' | 'right'` on `TableColumn`.
- **Input combobox pattern**: full ARIA combobox with arrow-key navigation.
- **SSR support**: all components render correctly in server-side rendering.
- **Toast queueing**: excess toasts queue (FIFO) instead of being dropped.

---

## Automated migration

Search-and-replace for the variant renames:

```bash
# variant="error" → variant="danger"
grep -rn 'variant="error"' src/ | sed -i 's/variant="error"/variant="danger"/g'

# variant='error' → variant='danger'
sed -i "s/variant='error'/variant='danger'/g" $(find src -name '*.tsx')

# toast.error( → toast.danger(
sed -i 's/toast\.error(/toast.danger(/g' $(find src -name '*.tsx' -o -name '*.ts')
```

The CJS → ESM and SidebarLegacy changes require manual review.

---

## Questions?

Open an issue at [github.com/Something-important/MorphUI/issues](https://github.com/Something-important/MorphUI/issues).
