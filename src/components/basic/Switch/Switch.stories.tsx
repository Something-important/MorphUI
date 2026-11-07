import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Switch is a toggle for binary on/off state. Supports 8 variants, 5 sizes, labels in 4 positions, icons, and disabled/loading states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultChecked: true,
    label: 'Enable notifications',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8}>
        <Switch variant="primary" label="Primary" defaultChecked />
        <Switch variant="secondary" label="Secondary" defaultChecked />
        <Switch variant="success" label="Success" defaultChecked />
        <Switch variant="warning" label="Warning" defaultChecked />
        <Switch variant="danger" label="Danger" defaultChecked />
        <Switch variant="info" label="Info" defaultChecked />
        <Switch variant="ghost" label="Ghost" defaultChecked />
        <Switch variant="outline" label="Outline" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8}>
        <Switch size="xs" label="Extra small" defaultChecked />
        <Switch size="sm" label="Small" defaultChecked />
        <Switch size="md" label="Medium" defaultChecked />
        <Switch size="lg" label="Large" defaultChecked />
        <Switch size="xl" label="Extra large" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, loading, readonly, invalid">
      <Stack gap={8}>
        <Switch label="Disabled unchecked" disabled />
        <Switch label="Disabled checked" defaultChecked disabled />
        <Switch label="Loading" loading />
        <Switch label="Read-only" defaultChecked readOnly />
        <Switch label="Invalid" invalid />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Label positions, icons, custom colors">
      <Stack gap={12}>
        <Switch label="Left" labelPosition="left" defaultChecked />
        <Switch label="Right" labelPosition="right" defaultChecked />
        <Switch label="Top" labelPosition="top" defaultChecked />
        <Switch label="Bottom" labelPosition="bottom" defaultChecked />
        <Switch label="With icon" icon={<span>🔔</span>} defaultChecked />
        <Switch color="#ff0055" label="Custom color" defaultChecked />
        <Switch
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          label="Gradient"
          defaultChecked
        />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8}>
        <Switch label="Uncontrolled (defaultChecked)" defaultChecked />
        <Switch label="Controlled (checked=true)" checked onChange={() => {}} />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Switch across all 5 preset themes">
      <ThemeGrid>
        <Switch defaultChecked label="On" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — very long label, no label">
      <Stack gap={8}>
        <Switch
          label="This is a very long switch label that might wrap or truncate depending on the container width"
          defaultChecked
        />
        <Switch defaultChecked />
      </Stack>
    </Demo>
  ),
};
