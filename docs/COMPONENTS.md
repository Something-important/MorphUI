# Component Inventory

Verified 2026-11-02. LOC counts implementation `.tsx` (stories excluded);
CSS LOC counts the component stylesheet. Every component ships matching
tests, a story, and exported types.

## Basic — `src/components/basic/` (15)

| Component  | LOC | CSS LOC | Notes                                                             |
| ---------- | --: | ------: | ----------------------------------------------------------------- |
| Input      | 644 |     737 | Largest basic component; variant/type/size unions                 |
| Checkbox   | 401 |     560 |                                                                   |
| Toggle     | 383 |     514 | Overlaps Switch — candidate for a shared base                     |
| Switch     | 361 |     479 | Overlaps Toggle — candidate for a shared base                     |
| Stepper    | 236 |     359 |                                                                   |
| Avatar     | 233 |     232 | size / shape / status                                             |
| Button     | 223 |     430 | Reference implementation: forwardRef, `as`, ripple, hover effects |
| Progress   | 217 |     285 |                                                                   |
| Spinner    | 177 |     335 |                                                                   |
| Breadcrumb | 161 |     161 |                                                                   |
| Badge      | 148 |     369 |                                                                   |
| Divider    | 135 |     322 |                                                                   |
| Skeleton   | 112 |     171 |                                                                   |
| Label      |  87 |     108 |                                                                   |
| OTPInput   | 200 |     120 | Multi-cell one-time password input (v2.1.0)                       |

## Interactive — `src/components/interactive/` (12)

| Component      | LOC | CSS LOC | Notes                                                  |
| -------------- | --: | ------: | ------------------------------------------------------ |
| Dropdown       | 689 |     671 | Largest single file in the library                     |
| Slider         | 475 |     327 |                                                        |
| Modal          | 457 |     700 | Focus trap / escape / scroll lock — extract `useModal` |
| RadioGroup     | 448 |     816 |                                                        |
| Accordion      | 391 |     481 |                                                        |
| Pagination     | 363 |     281 |                                                        |
| TreeView       | 350 |     200 | Recursive tree with expand/collapse + selection        |
| Card           | 312 |     603 |                                                        |
| Carousel       | 280 |     150 | Slide viewer with autoplay, loop, arrows/dots          |
| FileUpload     | 250 |     120 | Drag-and-drop with file list, size/type limits         |
| Rating         | 220 |      90 | Star rating with half-star precision                   |
| CommandPalette | 200 |     100 | Cmd+K search-driven command menu                       |

## Composition — `src/components/composition/` (13)

| Component        |                   LOC | CSS LOC | Notes                                                                    |
| ---------------- | --------------------: | ------: | ------------------------------------------------------------------------ |
| Sidebar          | 2,303 across 13 files |   1,389 | Two APIs: legacy `Sidebar` + composed `SidebarRoot/Item/…` — consolidate |
| Table            |                   625 |     309 | Filtering + a11y (aria-sort, row keyboard nav) since 0.5.0               |
| Toast            |                   616 |     394 | `ToastProvider` + `useToast()`; extract queueing next                    |
| Tooltip          |                   508 |     837 | Uses the shared `useAnchoredPosition` hook (0.9.x)                       |
| Tabs             |                   554 |     660 | Tabs / Tab / TabPanel                                                    |
| DatePicker       |                   494 |     247 | Calendar grid + keyboard nav (0.7.0)                                     |
| Combobox         |                   403 |     178 | ARIA combobox pattern (0.6.0)                                            |
| Alert            |                   362 |     409 |                                                                          |
| ContextMenu      |                   345 |     126 | Added in 0.8.0; viewport clamp via `clampToViewport`                     |
| Drawer           |                   315 |     349 |                                                                          |
| Form + FormField |                   239 |     114 | Two files                                                                |
| Popover          |                   538 |     920 | Biggest stylesheet; uses the shared `useAnchoredPosition` hook (0.9.x)   |

## Theme & utils

| File                            |      LOC | Notes                                                                              |
| ------------------------------- | -------: | ---------------------------------------------------------------------------------- |
| `theme/ThemeProvider.tsx`       |      127 | Token merge → CSS custom props; stale-var cleanup; `useTheme` / `useThemeOptional` |
| `theme/theme.css`               |      464 | Generated from `lightTheme.ts` — never hand-edit                                   |
| 5 presets (`theme/themes/*.ts`) | 442 each | 353 tokens across 49 families; key parity enforced by the token gate               |
| `utils/theme.ts`                |      347 | `resolveThemeValue` — runtime token resolution used by every component             |
| `utils/accessibility.ts`        |      404 | `getAriaProps`, `trapFocus`, `announceToScreenReader`, …                           |
| `utils/animation.ts`            |      269 | Ripple, enter/exit animations, stagger, reduced-motion helpers                     |

## Refactor candidates (size outliers)

1. Dropdown 689 · 2. Sidebar family ~2.5k total · 3. Input 644 · 4. Table
   625 · 5. Toast 616 · 6. Tabs 554

The recurring plays: extract shared hooks (anchored positioning is now
done — `src/hooks/useAnchoredPosition.ts`; still open: modal focus
management, toast queueing), split large files into subcomponents, and
share a Toggle/Switch base. See [ROADMAP.md](./ROADMAP.md).

## Test suite

47 suites / 1,926 tests / ~17–33 seconds / all passing. Largest suites:
Tooltip (818 tests), Accordion (726), RadioGroup (704), Modal (701).
Cross-cutting suites: `theme.test.ts`, `theme-tokens.test.ts`,
`animation.test.ts`, `accessibility.test.ts`, `a11y.smoke.test.tsx`,
`useAnchoredPosition.test.tsx`, plus per-component a11y suites for
Dropdown / Sidebar / Input / Table / Popover.
