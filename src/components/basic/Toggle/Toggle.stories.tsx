import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toggle is an alternative binary switch with a different visual style. Supports 8 variants, 3 sizes, labels in 4 positions, icons, and disabled/loading states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: true,
    label: 'Enable feature',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8}>
        <Toggle variant="primary" label="Primary" defaultChecked />
        <Toggle variant="secondary" label="Secondary" defaultChecked />
        <Toggle variant="success" label="Success" defaultChecked />
        <Toggle variant="warning" label="Warning" defaultChecked />
        <Toggle variant="danger" label="Danger" defaultChecked />
        <Toggle variant="info" label="Info" defaultChecked />
        <Toggle variant="ghost" label="Ghost" defaultChecked />
        <Toggle variant="outline" label="Outline" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8}>
        <Toggle size="sm" label="Small" defaultChecked />
        <Toggle size="md" label="Medium" defaultChecked />
        <Toggle size="lg" label="Large" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled & loading">
      <Stack gap={8}>
        <Toggle label="Disabled unchecked" disabled />
        <Toggle label="Disabled checked" defaultChecked disabled />
        <Toggle label="Loading" loading />
        <Toggle label="Loading checked" defaultChecked loading />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Label positions, icons, custom colors, backdrop blur">
      <Stack gap={12}>
        <Toggle label="Left" labelPosition="left" defaultChecked />
        <Toggle label="Right" labelPosition="right" defaultChecked />
        <Toggle label="Top" labelPosition="top" defaultChecked />
        <Toggle label="Bottom" labelPosition="bottom" defaultChecked />
        <Toggle label="With icon" icon={<span>⚡</span>} defaultChecked />
        <Toggle color="#ff0055" label="Custom color" defaultChecked />
        <Toggle
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          label="Gradient"
          defaultChecked
        />
        <Toggle backdropBlur label="Backdrop blur" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8}>
        <Toggle label="Uncontrolled (defaultChecked)" defaultChecked />
        <Toggle label="Controlled (checked=true)" checked onChange={() => {}} />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Toggle across all 5 preset themes">
      <ThemeGrid>
        <Toggle defaultChecked label="On" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — very long label, no label">
      <Stack gap={8}>
        <Toggle
          label="This is a very long toggle label that might wrap or truncate depending on the container width"
          defaultChecked
        />
        <Toggle defaultChecked />
      </Stack>
    </Demo>
  ),
};
