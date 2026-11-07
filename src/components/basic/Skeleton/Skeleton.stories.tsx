import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { Demo, Row, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Skeleton renders a placeholder shimmer while content loads. Supports 4 variants (text/circular/rectangular/rounded), 5 sizes, custom dimensions, and animation toggle.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'text',
    size: 'md',
    animated: true,
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        <Skeleton variant="text" width={200} />
        <Row gap={12} align="center">
          <Skeleton variant="circular" size="lg" />
          <Stack gap={8}>
            <Skeleton variant="text" width={120} />
            <Skeleton variant="text" width={80} />
          </Stack>
        </Row>
        <Skeleton variant="rectangular" width={300} height={100} />
        <Skeleton variant="rounded" width={300} height={60} />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (rectangular)">
      <Stack gap={12}>
        <Skeleton variant="rectangular" size="xs" width={200} />
        <Skeleton variant="rectangular" size="sm" width={200} />
        <Skeleton variant="rectangular" size="md" width={200} />
        <Skeleton variant="rectangular" size="lg" width={200} />
        <Skeleton variant="rectangular" size="xl" width={200} />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Animated vs static">
      <Stack gap={12}>
        <Skeleton variant="text" width={200} animated />
        <Skeleton variant="text" width={200} animated={false} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom dimensions & colors">
      <Stack gap={16}>
        <Skeleton variant="text" width={400} height={20} />
        <Skeleton variant="text" width={300} height={16} />
        <Skeleton variant="text" width={200} height={12} />
        <Skeleton variant="rounded" width={120} height={120} color="#ff0055" />
        <Skeleton variant="rectangular" width={200} height={40} backgroundColor="#e5e7eb" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Skeleton across all 5 preset themes">
      <ThemeGrid>
        <Stack gap={8}>
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={80} />
        </Stack>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — count, very small, very large">
      <Stack gap={16}>
        <Stack gap={4}>
          <Skeleton variant="text" width={250} count={3} />
        </Stack>
        <Skeleton variant="circular" size="xs" />
        <Skeleton variant="rectangular" width={500} height={200} />
      </Stack>
    </Demo>
  ),
};

export const Integration: Story = {
  render: () => (
    <Demo title="Card loading skeleton (composition example)">
      <div
        style={{
          width: '300px',
          padding: '16px',
          border: '1px solid var(--color-border, #d1d5db)',
          borderRadius: 'var(--border-radius-md, 8px)',
        }}
      >
        <Stack gap={12}>
          <Row gap={12} align="center">
            <Skeleton variant="circular" size="md" />
            <Stack gap={4}>
              <Skeleton variant="text" width={120} />
              <Skeleton variant="text" width={80} />
            </Stack>
          </Row>
          <Skeleton variant="rectangular" width="100%" height={120} />
          <Skeleton variant="text" width="100%" />
          <Skeleton variant="text" width="60%" />
        </Stack>
      </div>
    </Demo>
  ),
};
