import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown, type DropdownOption } from './Dropdown';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Dropdown> = {
  title: 'Patterns/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Dropdown renders a select menu with single/multi-select, search, grouping, icons, and custom rendering. 8 variants, 5 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const options: DropdownOption[] = [
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
        {(['default', 'outline', 'ghost'] as const).map((v) => (
          <Dropdown key={v} options={options} variant={v} placeholder={v} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ width: '320px' }}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <Dropdown key={s} options={options} size={s} placeholder={s} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, default value, clearable">
      <Stack gap={8} style={{ width: '320px' }}>
        <Dropdown options={options} disabled placeholder="Disabled" />
        <Dropdown options={options} defaultValue="cherry" placeholder="With default" />
        <Dropdown options={options} clearable placeholder="Clearable" />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8} style={{ width: '320px' }}>
        <Dropdown options={options} defaultValue="apple" placeholder="Uncontrolled" />
        <Dropdown options={options} value="banana" onChange={() => {}} placeholder="Controlled" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Multi-select, searchable, grouped, icons, disabled options">
      <Stack gap={8} style={{ width: '320px' }}>
        <Dropdown options={options} multiSelect placeholder="Multi-select..." />
        <Dropdown options={options} searchable placeholder="Searchable..." />
        <Dropdown
          options={[
            { label: 'With icon', value: 'icon', icon: <span>🍎</span> },
            { label: 'With description', value: 'desc', description: 'Has a description' },
            { label: 'Disabled', value: 'dis', disabled: true },
          ]}
          placeholder="Custom options"
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Dropdown across all 5 preset themes">
      <ThemeGrid>
        <Dropdown options={options.slice(0, 4)} placeholder="Select..." />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — empty, single option, long labels">
      <Stack gap={8} style={{ width: '320px' }}>
        <Dropdown options={[]} placeholder="No options" />
        <Dropdown options={[{ label: 'Only one', value: '1' }]} placeholder="Single option" />
        <Dropdown
          options={[
            { label: 'A very long option label that might overflow the dropdown', value: 'long' },
            { label: 'Short', value: 'short' },
          ]}
          placeholder="Mixed lengths"
        />
      </Stack>
    </Demo>
  ),
};
