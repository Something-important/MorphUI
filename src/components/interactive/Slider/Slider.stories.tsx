import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Slider> = {
  title: 'Patterns/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Slider renders a range input with single or dual-handle (range) mode. Supports marks, steps, min/max, 6 variants, 5 sizes, custom colors. Controlled/uncontrolled.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 40,
    style: { width: '300px' },
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((v) => (
          <Slider key={v} variant={v} defaultValue={40} style={{ width: '300px' }} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={16}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Slider key={s} size={s} defaultValue={40} style={{ width: '300px' }} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, range mode, with marks">
      <Stack gap={16}>
        <Slider defaultValue={40} disabled style={{ width: '300px' }} />
        <Slider range defaultValue={[20, 70]} style={{ width: '300px' }} />
        <Slider defaultValue={50} marks min={0} max={100} step={25} style={{ width: '300px' }} />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={16}>
        <Slider defaultValue={40} style={{ width: '300px' }} />
        <Slider value={60} onChange={() => {}} style={{ width: '300px' }} />
        <Slider range defaultValue={[20, 70]} style={{ width: '300px' }} />
        <Slider range value={[30, 80]} onChange={() => {}} style={{ width: '300px' }} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom min/max/step, custom colors, custom marks">
      <Stack gap={16}>
        <Slider defaultValue={5} min={0} max={10} step={1} style={{ width: '300px' }} />
        <Slider defaultValue={-50} min={-100} max={100} style={{ width: '300px' }} />
        <Slider defaultValue={40} color="#ff0055" style={{ width: '300px' }} />
        <Slider
          defaultValue={50}
          marks={[
            { value: 0, label: 'Min' },
            { value: 50, label: 'Mid' },
            { value: 100, label: 'Max' },
          ]}
          style={{ width: '300px' }}
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Slider across all 5 preset themes">
      <ThemeGrid>
        <Slider defaultValue={40} style={{ width: '100%' }} size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — min=value, max=value, single step">
      <Stack gap={16}>
        <Slider defaultValue={0} min={0} max={100} style={{ width: '300px' }} />
        <Slider defaultValue={100} min={0} max={100} style={{ width: '300px' }} />
        <Slider defaultValue={50} min={0} max={50} step={50} style={{ width: '300px' }} />
        <Slider range defaultValue={[0, 100]} min={0} max={100} style={{ width: '300px' }} />
      </Stack>
    </Demo>
  ),
};
