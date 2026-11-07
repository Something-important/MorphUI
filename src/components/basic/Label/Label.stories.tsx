import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';
import { Input } from '../Input';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Label renders a form field label with optional required indicator, 6 variants, and 4 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Username',
    htmlFor: 'username',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8}>
        <Label variant="primary">Primary</Label>
        <Label variant="secondary">Secondary</Label>
        <Label variant="success">Success</Label>
        <Label variant="warning">Warning</Label>
        <Label variant="danger">Danger</Label>
        <Label variant="info">Info</Label>
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8}>
        <Label size="xs">Extra small</Label>
        <Label size="sm">Small</Label>
        <Label size="md">Medium</Label>
        <Label size="lg">Large</Label>
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Required indicator">
      <Stack gap={8}>
        <Label>Plain label</Label>
        <Label required>Required field</Label>
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors">
      <Stack gap={8}>
        <Label color="#ff0055">Custom color</Label>
        <Label textColor="#10b981">Custom text color</Label>
        <Label required requiredColor="#0070f3">
          Custom required indicator
        </Label>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Label across all 5 preset themes">
      <ThemeGrid>
        <Label required>Field label</Label>
      </ThemeGrid>
    </Demo>
  ),
};

export const Integration: Story = {
  render: () => (
    <Demo title="Label + Input composition">
      <Stack gap={8} style={{ width: '320px' }}>
        <div>
          <Label htmlFor="email" required>
            Email address
          </Label>
          <div style={{ marginTop: '4px' }}>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
        </div>
        <div>
          <Label htmlFor="pwd" required>
            Password
          </Label>
          <div style={{ marginTop: '4px' }}>
            <Input id="pwd" type="password" placeholder="••••••••" />
          </div>
        </div>
      </Stack>
    </Demo>
  ),
};
