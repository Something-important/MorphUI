import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { Demo, Row, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Progress renders a linear or circular progress indicator. Supports 6 variants, 5 sizes, indeterminate state, striped/animated modes, and labels.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 60,
    type: 'linear',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (linear)">
      <Stack gap={12} style={{ width: '320px' }}>
        <Progress value={60} variant="primary" />
        <Progress value={60} variant="secondary" />
        <Progress value={60} variant="success" />
        <Progress value={60} variant="warning" />
        <Progress value={60} variant="danger" />
        <Progress value={60} variant="info" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (linear)">
      <Stack gap={12} style={{ width: '320px' }}>
        <Progress value={60} size="xs" />
        <Progress value={60} size="sm" />
        <Progress value={60} size="md" />
        <Progress value={60} size="lg" />
        <Progress value={60} size="xl" />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Indeterminate (no value)">
      <Stack gap={12} style={{ width: '320px' }}>
        <Progress variant="primary" />
        <Progress variant="success" />
        <Progress variant="danger" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Circular type, striped, animated, labels, custom colors">
      <Stack gap={16}>
        <Row gap={24} align="center">
          <Progress value={60} type="circular" size="lg" />
          <Progress value={40} type="circular" size="md" variant="success" />
          <Progress value={80} type="circular" size="sm" variant="danger" />
        </Row>
        <Stack gap={8} style={{ width: '320px' }}>
          <Progress value={60} striped />
          <Progress value={60} striped animated />
          <Progress value={60} label="Uploading..." showValue />
          <Progress value={60} color="#ff0055" />
          <Progress value={60} gradient="linear-gradient(90deg, #667eea, #764ba2)" />
        </Stack>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Progress across all 5 preset themes">
      <ThemeGrid>
        <div style={{ width: '100%', padding: '8px' }}>
          <Progress value={60} />
        </div>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — 0%, 100%, wide container">
      <Stack gap={12} style={{ width: '320px' }}>
        <Progress value={0} showValue />
        <Progress value={100} showValue />
        <Progress value={50} />
      </Stack>
    </Demo>
  ),
};
