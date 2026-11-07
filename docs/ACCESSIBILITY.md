# Accessibility Guide

MorphUI is built with accessibility as a first-class concern. This guide
covers what's tested, how to use the a11y features, and the known
limitations.

## What's tested

Every component passes a jest-axe scan (WCAG 2.1 Level A + AA) in its
default state. The test suite includes:

| Test type                                   | Scope                                                   | Count   |
| ------------------------------------------- | ------------------------------------------------------- | ------- |
| **a11y smoke** (`test/a11y.smoke.test.tsx`) | 25 components in default state                          | 25      |
| **Dedicated a11y suites**                   | Dropdown, Sidebar, Input, Table, Popover, Modal         | 6 files |
| **SSR smoke** (`test/ssr.smoke.test.tsx`)   | All 39 components via `renderToString`                  | 37      |
| **Beyond-axe assertions**                   | aria-controls, aria-labelledby, aria-sort, keyboard nav | 9       |

Total: 37 of 39 components have a11y coverage. The two without
(ContextMenu + Sidebar sub-components) are exercised via the Sidebar
family's dedicated suite.

## Component a11y contracts

### Button, Badge, Avatar, Label, Divider, Spinner, Skeleton, Card

Standard semantics. Avatar uses `role="img"` + `aria-label`. Skeleton
uses `role="img"` + `aria-label="Loading content"`.

### Checkbox, Switch, Toggle

`role="checkbox"` / `role="switch"` with `aria-checked`, keyboard
activatable (Space/Enter).

### Input

Full ARIA **combobox** pattern when `suggestions` are provided:

- `role="combobox"` + `aria-expanded` + `aria-controls` + `aria-autocomplete="list"`
- ArrowDown/Up to navigate suggestions
- Enter to select, Escape to close
- `aria-activedescendant` tracks the active option
- Error messages linked via `aria-describedby` (unique `useId` per instance)

### Dropdown

ARIA **combobox** + **listbox** pattern:

- `role="combobox"` + `aria-expanded` + `aria-controls`
- `role="listbox"` with `role="option"` children
- `aria-selected` on the active option
- Full keyboard nav: Enter/Space (open + select), ArrowDown/Up (move focus),
  Escape/Tab (close), Home/End (first/last)
- `scope="col"` on all header cells
- Grouped options use `role="group"` (valid listbox child)

### Table

- `role="table"` with proper `<thead>`/`<tbody>`/`<th>`/`<td>` structure
- `scope="col"` on every column header
- `aria-sort` on sortable columns (`ascending`/`descending`/`none`)
- Accessible name on the `<table>` element (via `ariaLabel` prop)
- `aria-selected` on selectable rows

### Modal

- `role="dialog"` + `aria-modal="true"`
- **Focus trap** (Tab cycles within the dialog)
- **Body scroll lock** while open
- Escape to close (via `useModal`)
- `aria-labelledby` linked to the title

### Tooltip

- `aria-haspopup` + `aria-expanded` on the trigger
- Content is `position: fixed` (viewport coordinates)

### Popover

- `role="dialog"` + `aria-modal="true"` on the content
- Trigger wrapper does NOT duplicate `role="button"` when the child is
  already interactive (avoids nested-interactive)
- Non-interactive children get `role="button"` + `tabIndex={0}`

### Sidebar

- `role="navigation"` + `aria-label` on the root
- `SidebarGroup`: `role="group"` + `aria-label` (valid listbox child)
- `aria-controls` + `aria-expanded` on group toggles
- `aria-labelledby` links content regions to their titles
- ESC keyboard toggle (overlay close + collapsed open)

### Tabs

- `role="tablist"` on the direct parent of `role="tab"` buttons
- `aria-orientation` on the tablist
- `aria-selected` + `aria-controls` on each tab
- `role="tabpanel"` on each panel

### Toast

- `role="region"` + `aria-label="Notifications"` on the viewport
- `role="alert"` / `role="status"` based on variant
- FIFO queueing (no notification is silently lost)

### Combobox

- Full combobox pattern with `virtualize` support
- Arrow-key navigation through options
- `aria-activedescendant` for active option tracking

### DatePicker

- `role="combobox"` + `role="dialog"` + `role="grid"`
- Full grid keyboard navigation: ArrowUp/Down/Left/Right, Home/End

### Alert

- `role="alert"` + `aria-live` (`assertive` for `danger`, `polite` otherwise)

## Keyboard navigation summary

| Component                        | Keys                                            | Action                                  |
| -------------------------------- | ----------------------------------------------- | --------------------------------------- |
| Button, Checkbox, Switch, Toggle | Space, Enter                                    | Activate                                |
| Dropdown                         | Enter/Space, ArrowDown/Up, Escape/Tab, Home/End | Open/close/navigate                     |
| Combobox                         | ArrowDown/Up, Enter, Escape, Tab, Home/End      | Navigate/select/close                   |
| Input (suggestions)              | ArrowDown/Up, Enter, Escape                     | Navigate/select/close                   |
| Modal                            | Escape, Tab (trapped)                           | Close/navigate                          |
| Sidebar                          | Escape                                          | Toggle (overlay close / collapsed open) |
| Tabs                             | ArrowLeft/Right                                 | Switch tab                              |
| DatePicker                       | Arrows, Home/End                                | Navigate calendar                       |
| Table                            | Enter/Space (clickable rows)                    | Activate row                            |

## Beyond axe

axe catches structural violations (wrong roles, missing aria, nested
interactive). Some a11y issues axe **cannot** detect in jsdom:

- **Dangling aria references** — `aria-controls` pointing at a
  conditionally-rendered element. We guard these with explicit assertions.
- **Keyboard reachability** — `tabIndex={-1}` on a button removes it from
  tab order. We assert `tabIndex !== -1` for interactive elements.
- **Color contrast** — requires visual rendering. Use Chromatic or manual
  review for contrast checking.

## Using the hooks API for custom components

```tsx
import { useModal, useAnchoredPosition } from 'morphui-react';

function MyDialog({ isOpen, onClose }) {
  const { modalRef } = useModal({
    isOpen,
    onClose,
    closeOnEsc: true,
    trapFocus: true,
    lockScroll: true,
  });

  if (!isOpen) return null;
  return (
    <div ref={modalRef} role="dialog" aria-modal="true">
      ...
    </div>
  );
}
```

`useModal` provides: open/close state, ESC handling, Tab focus trapping,
body scroll lock, and focus-loss detection. `useAnchoredPosition`
provides viewport-correct positioning for floating elements.

## SSR

All 39 components render correctly in server-side rendering. Portal-based
components (ContextMenu, SidebarToggle) use `isMounted` guards to avoid
`document` access during SSR.
