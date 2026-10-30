import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Combobox } from './Combobox';
import type { ComboboxOption } from './Combobox';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof Combobox> = {
  title: 'Components/Combobox',
  component: Combobox,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Combobox>;

const fruits: ComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian' },
  { label: 'Elderberry', value: 'elderberry' },
];

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ maxWidth: 320 }}>
        <Combobox options={fruits} placeholder="Pick a fruit" />
      </div>
    </ThemeProvider>
  ),
};

export const Clearable: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ maxWidth: 320 }}>
        <Combobox options={fruits} clearable defaultValue="banana" placeholder="Pick a fruit" />
      </div>
    </ThemeProvider>
  ),
};

export const FreeText: Story = {
  render: () => {
    const [value, setValue] = useState<string | number | null>(null);
    return (
      <ThemeProvider>
        <div style={{ maxWidth: 320 }}>
          <Combobox options={fruits} allowFreeText placeholder="Type or pick" onChange={setValue} />
          <p style={{ marginTop: 12 }}>Selected: {String(value ?? '(none)')}</p>
        </div>
      </ThemeProvider>
    );
  },
};

export const Async: Story = {
  render: () => {
    const loadOptions = (q: string) =>
      new Promise<ComboboxOption[]>((resolve) =>
        setTimeout(
          () => resolve(fruits.filter((f) => f.label.toLowerCase().includes(q.toLowerCase()))),
          500,
        ),
      );
    return (
      <ThemeProvider>
        <div style={{ maxWidth: 320 }}>
          <Combobox options={[]} loadOptions={loadOptions} placeholder="Search (async)..." />
        </div>
      </ThemeProvider>
    );
  },
};
