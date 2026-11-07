# Migrating from Radix UI / shadcn-ui to MorphUI

This guide helps developers switch from [Radix UI](https://www.radix-ui.com/)
primitives or [shadcn/ui](https://ui.shadcn.com/) to MorphUI. It maps
common component patterns, explains key API differences, and shows
side-by-side code comparisons.

---

## Why switch?

| Concern           | Radix UI                  | shadcn/ui                      | MorphUI                                    |
| ----------------- | ------------------------- | ------------------------------ | ------------------------------------------ |
| **Styling**       | Headless (bring your own) | Copy-paste Tailwind components | Built-in CSS, zero config                  |
| **Theming**       | None (you build it)       | CSS variables (you wire it)    | 5 presets + ThemeProvider + 353 tokens     |
| **Bundle**        | Per-primitive packages    | Copy into your repo            | Single package, 41 tree-shakeable subpaths |
| **TypeScript**    | Yes                       | Yes                            | Yes                                        |
| **Accessibility** | Excellent (WAI-ARIA)      | Inherits Radix                 | Built-in (WAI-ARIA + jest-axe tested)      |
| **RTL support**   | Partial                   | Depends on your CSS            | Built-in logical properties (v2.0.0+)      |
| **Storybook**     | None                      | None                           | 46 live stories + Token Builder            |

**The short version:** Radix gives you headless primitives and you build
the styling/theming yourself. shadcn copies component code into your repo
so you own it entirely. MorphUI ships ready-to-use components with a
complete theming system — less flexibility, but zero setup.

---

## Installation

### Radix (per-primitive)

```bash
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu \
  @radix-ui/react-tabs @radix-ui/react-tooltip @radix-ui/react-toast \
  @radix-ui/react-popover @radix-ui/react-accordion @radix-ui/react-checkbox
```

### shadcn/ui

```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button input dialog dropdown-menu tabs \
  tooltip toast popover accordion checkbox
```

### MorphUI (single package)

```bash
npm install morphui-react
```

```tsx
// One CSS import, once at the app root
import 'morphui-react/css';
```

---

## Theming

### Radix — no built-in theming

You build your own theme system with CSS variables or a CSS-in-JS library.

### shadcn — CSS variables, you wire it

shadcn generates a `globals.css` with HSL variables:

```css
:root {
  --primary: 222 47% 11%;
  --primary-foreground: 210 40% 98%;
  /* ... you maintain all of these */
}
```

### MorphUI — 5 presets + ThemeProvider + 353 tokens

```tsx
import { ThemeProvider, lightTheme } from 'morphui-react';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

Switch presets at runtime — `lightTheme`, `darkTheme`, `warmTheme`,
`coolTheme`, `purpleTheme` — or build a custom theme:

```tsx
import { ThemeProvider, lightTheme, type Theme } from 'morphui-react';

const brandTheme: Theme = {
  ...lightTheme,
  'color-primary': '#ff0055',
  'border-radius': '12px',
};

<ThemeProvider theme={brandTheme}>
  <App />
</ThemeProvider>;
```

Use the **Token Builder** in Storybook to interactively prototype themes
and export a `.ts` file.

---

## Component mapping

| Radix / shadcn | MorphUI                   | Notes                                      |
| -------------- | ------------------------- | ------------------------------------------ |
| `Dialog`       | `Modal`                   | Single component, not a compound           |
| `DropdownMenu` | `Dropdown`                | Simpler API, built-in search               |
| `Tabs`         | `Tabs`                    | Items array instead of compound            |
| `Accordion`    | `Accordion`               | Single component, not compound             |
| `Tooltip`      | `Tooltip`                 | Single component with `content` prop       |
| `Popover`      | `Popover`                 | Single component with `content` prop       |
| `Toast`        | `Toast` + `ToastProvider` | Provider + `useToast` hook                 |
| `Checkbox`     | `Checkbox`                | Built-in label + description               |
| `Combobox`     | `Combobox`                | Built-in async, free-text, filtering       |
| `Button`       | `Button`                  | 8 variants, 5 sizes, ripple, gradient      |
| `Input`        | `Input`                   | 8 variants, 10 types, error state          |
| `Select`       | `Dropdown`                | MorphUI's Dropdown covers select use cases |
| `Switch`       | `Switch`                  | 8 variants, 4 label positions              |
| `RadioGroup`   | `RadioGroup`              | Items array, 8 variants                    |
| `Slider`       | `Slider`                  | Single + range mode, marks                 |
| `Progress`     | `Progress`                | Linear + circular, 6 variants              |
| `Avatar`       | `Avatar`                  | Image, initials, icon fallback, status     |
| `Badge`        | `Badge`                   | 8 variants, dot, removable                 |
| `Table`        | `Table`                   | Sort, filter, select, pagination built-in  |
| `Sidebar`      | `Sidebar`                 | Items array API + composed API             |
| `DatePicker`   | `DatePicker`              | Single + range mode                        |
| `ContextMenu`  | `ContextMenu`             | Right-click menu                           |
| `Drawer`       | `Drawer`                  | 4 positions, 6 sizes                       |

---

## Detailed migration: key components

### Button

**shadcn/ui:**

```tsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="default">Click me</Button>
<Button variant="destructive" size="sm">Delete</Button>
<Button variant="outline" size="lg">Cancel</Button>
```

**MorphUI:**

```tsx
import { Button } from 'morphui-react';

<Button variant="primary" size="md">Click me</Button>
<Button variant="danger" size="sm">Delete</Button>
<Button variant="outline" size="lg">Cancel</Button>
```

**Variant mapping:**

| shadcn        | MorphUI                          |
| ------------- | -------------------------------- |
| `default`     | `primary`                        |
| `destructive` | `danger`                         |
| `outline`     | `outline`                        |
| `secondary`   | `secondary`                      |
| `ghost`       | `ghost`                          |
| `link`        | \_(no equivalent — use `as="a"`) |

**Extra in MorphUI:** `success`, `warning`, `info` variants; `shadow`,
`hoverEffect` (lift/glow/scale), `ripple`, `gradient`, `rounded`,
`iconLeft`/`iconRight`, `loading`, `loadingText`, `fullWidth`.

---

### Dialog → Modal

**Radix:**

```tsx
import * as Dialog from '@radix-ui/react-dialog';

<Dialog.Root>
  <Dialog.Trigger asChild>
    <button>Open</button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="overlay" />
    <Dialog.Content className="content">
      <Dialog.Title>Title</Dialog.Title>
      <Dialog.Description>Description</Dialog.Description>
      <Dialog.Close asChild>
        <button>Close</button>
      </Dialog.Close>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>;
```

**shadcn/ui:**

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <DialogClose asChild>
        <Button>Close</Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>;
```

**MorphUI:**

```tsx
import { useState } from 'react';
import { Modal, Button } from 'morphui-react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Title"
        size="md"
        footer={
          <Button variant="primary" onClick={() => setIsOpen(false)}>
            Close
          </Button>
        }
      >
        Description
      </Modal>
    </>
  );
}
```

**Key differences:**

- MorphUI `Modal` is a **single component**, not a compound (no
  `Root`/`Trigger`/`Portal`/`Overlay`/`Content`/`Close`)
- State is **controlled** (`isOpen` + `onClose`) — no trigger pattern
- `title`, `footer`, and `children` (body) are props
- Built-in: backdrop, focus trap, Escape-to-close, scroll lock,
  animations, 8 variants, 6 sizes, 3 positions
- No need for `Dialog.Portal` — MorphUI handles portaling internally

**For headless behavior**, use the `useModal` hook:

```tsx
import { useModal } from 'morphui-react';

function CustomModal() {
  const { isOpen, open, close, modalRef } = useModal();
  return (
    <>
      <button onClick={open}>Open</button>
      {isOpen && (
        <div className="my-overlay" onClick={close}>
          <div className="my-dialog" ref={modalRef}>
            Fully custom UI — hook handles focus trap, Escape, scroll lock
          </div>
        </div>
      )}
    </>
  );
}
```

---

### DropdownMenu → Dropdown

**Radix:**

```tsx
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild>
    <button>Menu</button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Content>
      <DropdownMenu.Item onSelect={() => console.log('copy')}>Copy</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <DropdownMenu.Item onSelect={() => console.log('delete')}>Delete</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Portal>
</DropdownMenu.Root>;
```

**MorphUI:**

```tsx
import { Dropdown, type DropdownOption } from 'morphui-react';

const options: DropdownOption[] = [
  { label: 'Copy', value: 'copy' },
  { label: 'Delete', value: 'delete' },
];

<Dropdown options={options} placeholder="Menu" onChange={(value) => console.log(value)} />;
```

**Key differences:**

- MorphUI uses an **options array** instead of compound children
- `onChange` gives you the selected value — no `onSelect` per item
- Built-in: multi-select (`multiSelect`), search (`searchable`),
  grouping, icons, descriptions, disabled options, clearable
- No `Trigger`/`Portal`/`Content`/`Item`/`Separator` — one component

---

### Tabs

**Radix:**

```tsx
import * as Tabs from '@radix-ui/react-tabs';

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content 1</Tabs.Content>
  <Tabs.Content value="tab2">Content 2</Tabs.Content>
</Tabs.Root>;
```

**MorphUI:**

```tsx
import { Tabs, type TabItem } from 'morphui-react';

const items: TabItem[] = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
];

<Tabs items={items} defaultActiveTab="tab1" />;
```

**Key differences:**

- MorphUI uses an **items array** with `id`, `label`, `content`
- No compound `Root`/`List`/`Trigger`/`Content` — one component
- Built-in: 8 variants, 5 sizes, icons, badges, disabled tabs,
  controlled/uncontrolled active state

---

### Accordion

**Radix:**

```tsx
import * as Accordion from '@radix-ui/react-accordion';

<Accordion.Root type="single" defaultValue="item1">
  <Accordion.Item value="item1">
    <Accordion.Trigger>Item 1</Accordion.Trigger>
    <Accordion.Content>Content 1</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item2">
    <Accordion.Trigger>Item 2</Accordion.Trigger>
    <Accordion.Content>Content 2</Accordion.Content>
  </Accordion.Item>
</Accordion.Root>;
```

**MorphUI:**

```tsx
import { Accordion } from 'morphui-react';

<Accordion title="Item 1" defaultOpen>
  Content 1
</Accordion>

<Accordion title="Item 2">
  Content 2
</Accordion>
```

**Key differences:**

- Each `Accordion` is a **single component** with `title` + `children`
- No `Root`/`Item`/`Trigger`/`Content` — just the component
- Built-in: 8 variants, 5 sizes, shadows, hover effects, animations,
  disabled state, controlled/uncontrolled open state
- For multi-item accordions, just render multiple `<Accordion>` components

---

### Tooltip

**Radix:**

```tsx
import * as Tooltip from '@radix-ui/react-tooltip';

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger asChild>
      <button>Hover me</button>
    </Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content>
        Tooltip text
        <Tooltip.Arrow />
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip.Root>
</Tooltip.Provider>;
```

**MorphUI:**

```tsx
import { Tooltip } from 'morphui-react';

<Tooltip content="Tooltip text">
  <button>Hover me</button>
</Tooltip>;
```

**Key differences:**

- MorphUI `Tooltip` wraps the trigger as children — no `Provider`/`Root`/
  `Trigger`/`Portal`/`Content`/`Arrow`
- `content` prop accepts a string or ReactNode (for rich content)
- Built-in: 12 positions, 4 triggers (hover/focus/click/manual), arrows,
  delays, auto-positioning, 8 variants

---

### Toast

**Radix:**

```tsx
import * as Toast from '@radix-ui/react-toast';

<Toast.Provider>
  <Toast.Root>
    <Toast.Title>Title</Toast.Title>
    <Toast.Description>Description</Toast.Description>
    <Toast.Action asChild altText="Undo">
      <button>Undo</button>
    </Toast.Action>
  </Toast.Root>
</Toast.Provider>;
```

**MorphUI:**

```tsx
import { ToastProvider, useToast } from 'morphui-react';

function MyComponent() {
  const { toast } = useToast();
  return <button onClick={() => toast.success('Saved', 'Changes stored')}>Save</button>;
}

function App() {
  return (
    <ToastProvider position="bottom-right" duration={4000}>
      <MyComponent />
    </ToastProvider>
  );
}
```

**Key differences:**

- MorphUI uses a **provider + hook** pattern — call `toast.success()`,
  `toast.danger()`, `toast()` from anywhere
- No `Root`/`Title`/`Description`/`Action` — the hook manages everything
- Built-in: 4 variants, 6 positions, 5 animations, auto-dismiss with
  pause-on-hover, max toasts, queueing
- A presentational `Toast` component is also exported for standalone use

---

### Checkbox

**shadcn/ui:**

```tsx
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <Label htmlFor="terms">Accept terms</Label>
</div>;
```

**MorphUI:**

```tsx
import { Checkbox } from 'morphui-react';

<Checkbox label="Accept terms" defaultChecked />;
```

**Key differences:**

- MorphUI `Checkbox` has a built-in `label` and `description` prop —
  no need for a separate `Label` component or flex layout
- Built-in: 8 variants, 3 sizes, controlled/uncontrolled, error state

---

### Combobox

**shadcn/ui (uses Radix Popover + cmdk):**

```tsx
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Select...</Button>
  </PopoverTrigger>
  <PopoverContent>
    <Command>
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results.</CommandEmpty>
        <CommandGroup>
          <CommandItem onSelect={() => setValue('apple')}>Apple</CommandItem>
          <CommandItem onSelect={() => setValue('banana')}>Banana</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>;
```

**MorphUI:**

```tsx
import { Combobox, type ComboboxOption } from 'morphui-react';

const options: ComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

<Combobox options={options} placeholder="Search..." onChange={(value) => console.log(value)} />;
```

**Key differences:**

- MorphUI `Combobox` is a **single component** — no need to compose
  `Popover` + `Command` + `CommandInput` + `CommandList` + `CommandItem`
- Built-in: async loading (`loadOptions`), free text (`allowFreeText`),
  clearable, 4 variants, 3 sizes, controlled/uncontrolled

---

## Patterns that don't have direct equivalents

| Radix/shadcn pattern                       | MorphUI approach                                                                    |
| ------------------------------------------ | ----------------------------------------------------------------------------------- |
| `asChild` prop                             | MorphUI uses `as` prop (Button only) or composition                                 |
| Compound components (Root/Trigger/Content) | MorphUI uses single components with props                                           |
| `Portal`                                   | Handled internally by all overlay components                                        |
| `Provider` (Tooltip, Toast)                | Only `ToastProvider` needs wrapping; others are self-contained                      |
| CSS-in-JS / Tailwind styling               | MorphUI uses CSS custom properties — override via `ThemeProvider` or inline `style` |
| `forwardRef` on every component            | All MorphUI components forward refs                                                 |
| `data-[state]` attributes                  | MorphUI uses `data-*` attributes + CSS classes                                      |

---

## Migration strategy

### Option A: Big-bang (small projects)

1. Install `morphui-react`
2. Replace all Radix/shadcn imports with MorphUI
3. Wrap app in `ThemeProvider`
4. Run tests, fix visual differences

### Option B: Incremental (large projects)

1. Install `morphui-react` alongside Radix
2. Migrate one component at a time (start with `Button`, `Input`, `Checkbox`)
3. For each component:
   - Find all usages
   - Replace the import
   - Update the JSX (compound → single component)
   - Test
4. Once all components are migrated, remove Radix/shadcn dependencies

### Option C: New features only

1. Keep existing Radix/shadcn components as-is
2. Use MorphUI for new features
3. Gradually migrate old features when touching them

---

## Automated codemod (starting point)

This sed command handles the most common import replacement:

```bash
# Replace Radix imports with MorphUI
# (review each manually — APIs differ)
sed -i 's/from "@radix-ui\/react-dialog"/from "morphui-react"/g' src/**/*.tsx
sed -i 's/from "@\/components\/ui\/button"/from "morphui-react"/g' src/**/*.tsx
```

**Warning:** Import replacement is just the first step. The JSX structure
needs manual changes (compound → single component). Use the detailed
migration sections above as reference.

---

## Need help?

- **Storybook**: Browse all 39 components at
  https://something-important.github.io/MorphUI/
- **Token Builder**: Prototype a custom theme interactively
- **Issues**: https://github.com/Something-important/MorphUI/issues
- **Version migration** (0.x → 1.0 → 2.0): See [MIGRATION.md](./MIGRATION.md)
