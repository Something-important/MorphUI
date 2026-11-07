import type { Meta, StoryObj } from '@storybook/react';
import { Combobox, type ComboboxOption } from './Combobox';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Combobox> = {
  title: 'Composition/Combobox',
  component: Combobox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Combobox is a searchable dropdown with filtering, async loading, free-text input, and clearable selection. 4 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const options: ComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
  { label: 'Elderberry', value: 'elderberry' },
  { label: 'Fig', value: 'fig' },
  { label: 'Grape', value: 'grape' },
  { label: 'Honeydew', value: 'honeydew' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select a fruit...',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8} style={{ width: '320px' }}>
        <Combobox options={options} variant="primary" placeholder="Primary" />
        <Combobox options={options} variant="secondary" placeholder="Secondary" />
        <Combobox options={options} variant="ghost" placeholder="Ghost" />
        <Combobox options={options} variant="outline" placeholder="Outline" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ width: '320px' }}>
        <Combobox options={options} size="sm" placeholder="Small" />
        <Combobox options={options} size="md" placeholder="Medium" />
        <Combobox options={options} size="lg" placeholder="Large" />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, clearable, default value">
      <Stack gap={8} style={{ width: '320px' }}>
        <Combobox options={options} disabled placeholder="Disabled" />
        <Combobox options={options} clearable placeholder="Clearable" />
        <Combobox options={options} defaultValue="cherry" placeholder="With default" />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8} style={{ width: '320px' }}>
        <Combobox options={options} defaultValue="apple" placeholder="Uncontrolled" />
        <Combobox options={options} value="banana" onChange={() => {}} placeholder="Controlled" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Free text, async loading, disabled options">
      <Stack gap={8} style={{ width: '320px' }}>
        <Combobox options={options} allowFreeText placeholder="Type to add custom value..." />
        <Combobox
          options={[...options, { label: 'Disabled fruit', value: 'disabled', disabled: true }]}
          placeholder="One option is disabled"
        />
        <Combobox
          options={[]}
          loadOptions={async (q) => [
            { label: `${q} result 1`, value: `${q}-1` },
            { label: `${q} result 2`, value: `${q}-2` },
          ]}
          placeholder="Async search (type something)..."
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Combobox across all 5 preset themes">
      <ThemeGrid>
        <Combobox options={options} placeholder="Select..." />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — empty options, long labels">
      <Stack gap={8} style={{ width: '320px' }}>
        <Combobox options={[]} placeholder="No options" />
        <Combobox
          options={[
            { label: 'A very long option label that might overflow', value: 'long' },
            { label: 'Short', value: 'short' },
          ]}
          placeholder="Mixed label lengths"
        />
      </Stack>
    </Demo>
  ),
};
