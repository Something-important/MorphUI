import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, type RadioOption } from './RadioGroup';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof RadioGroup> = {
  title: 'Patterns/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'RadioGroup renders a set of mutually exclusive options. Supports 8 variants, 5 sizes, horizontal/vertical direction, descriptions, disabled options. Controlled/uncontrolled.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const options: RadioOption[] = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
];

export const Default: Story = {
  args: {
    name: 'default',
    options,
    defaultValue: 'a',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={12}>
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'info',
            'danger',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <RadioGroup key={v} name={v} options={options} variant={v} defaultValue="a" />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={12}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <RadioGroup key={s} name={s} options={options} size={s} defaultValue="a" />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, with descriptions, disabled options">
      <Stack gap={12}>
        <RadioGroup name="disabled" options={options} disabled defaultValue="a" />
        <RadioGroup
          name="desc"
          options={[
            { label: 'With description', value: '1', description: 'Has helper text' },
            { label: 'No description', value: '2' },
          ]}
          defaultValue="1"
        />
        <RadioGroup
          name="dis-opt"
          options={[
            { label: 'Enabled', value: 'en' },
            { label: 'Disabled', value: 'dis', disabled: true },
          ]}
          defaultValue="en"
        />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={12}>
        <RadioGroup name="unc" options={options} defaultValue="a" />
        <RadioGroup name="con" options={options} value="b" onChange={() => {}} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Direction, custom color, gradient">
      <Stack gap={12}>
        <RadioGroup name="horiz" options={options} direction="horizontal" defaultValue="a" />
        <RadioGroup name="vert" options={options} direction="vertical" defaultValue="a" />
        <RadioGroup name="color" options={options} color="#ff0055" defaultValue="a" />
        <RadioGroup
          name="grad"
          options={options}
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          defaultValue="a"
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="RadioGroup across all 5 preset themes">
      <ThemeGrid>
        <RadioGroup name="theme" options={options.slice(0, 2)} defaultValue="a" size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single option, long labels, many options">
      <Stack gap={12}>
        <RadioGroup
          name="single"
          options={[{ label: 'Only option', value: '1' }]}
          defaultValue="1"
        />
        <RadioGroup
          name="long"
          options={[
            { label: 'A very long radio option label that might wrap or truncate', value: '1' },
            { label: 'Short', value: '2' },
          ]}
          defaultValue="1"
        />
        <RadioGroup
          name="many"
          options={Array.from({ length: 8 }, (_, i) => ({
            label: `Option ${i + 1}`,
            value: String(i + 1),
          }))}
          defaultValue="1"
          size="sm"
        />
      </Stack>
    </Demo>
  ),
};
