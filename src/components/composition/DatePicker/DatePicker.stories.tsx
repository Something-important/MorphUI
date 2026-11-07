import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof DatePicker> = {
  title: 'Composition/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'DatePicker renders a calendar-based date picker with single and range modes, min/max constraints, and configurable week start. 4 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Select a date...',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8} style={{ width: '280px' }}>
        <DatePicker variant="primary" placeholder="Primary" />
        <DatePicker variant="secondary" placeholder="Secondary" />
        <DatePicker variant="ghost" placeholder="Ghost" />
        <DatePicker variant="outline" placeholder="Outline" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ width: '280px' }}>
        <DatePicker size="sm" placeholder="Small" />
        <DatePicker size="md" placeholder="Medium" />
        <DatePicker size="lg" placeholder="Large" />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, clearable, default value">
      <Stack gap={8} style={{ width: '280px' }}>
        <DatePicker disabled placeholder="Disabled" />
        <DatePicker clearable placeholder="Clearable" />
        <DatePicker defaultValue="2026-06-15" placeholder="With default" />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8} style={{ width: '280px' }}>
        <DatePicker defaultValue="2026-06-15" placeholder="Uncontrolled" />
        <DatePicker value="2026-07-04" onChange={() => {}} placeholder="Controlled" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Range mode, min/max, week starts Monday">
      <Stack gap={8} style={{ width: '280px' }}>
        <DatePicker range placeholder="Select date range..." />
        <DatePicker min="2026-06-01" max="2026-06-30" placeholder="June 2026 only" />
        <DatePicker weekStartsOn={1} placeholder="Week starts Monday" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="DatePicker across all 5 preset themes">
      <ThemeGrid>
        <DatePicker placeholder="Select..." />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long placeholder, range with defaults">
      <Stack gap={8} style={{ width: '280px' }}>
        <DatePicker placeholder="This is a very long placeholder that might truncate" />
        <DatePicker
          range
          defaultValue={['2026-06-01', '2026-06-15']}
          placeholder="Range with defaults"
        />
      </Stack>
    </Demo>
  ),
};
