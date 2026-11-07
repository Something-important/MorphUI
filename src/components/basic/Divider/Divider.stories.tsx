import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { Demo, Stack, Row, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Divider> = {
  title: 'Primitives/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Divider separates content with a horizontal or vertical line. Supports variants (solid/dashed/dotted), sizes, text labels, and custom colors.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <p>Content above</p>
      <Divider />
      <p>Content below</p>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16} style={{ width: '400px' }}>
        <Divider variant="solid" />
        <Divider variant="dashed" />
        <Divider variant="dotted" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (thickness)">
      <Stack gap={16} style={{ width: '400px' }}>
        <Divider size="xs" />
        <Divider size="sm" />
        <Divider size="md" />
        <Divider size="lg" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="With text, custom colors, gradients">
      <Stack gap={16} style={{ width: '400px' }}>
        <Divider text="OR" textPosition="center" />
        <Divider text="Left" textPosition="left" />
        <Divider text="Right" textPosition="right" />
        <Divider color="#ff0055" />
        <Divider gradient="linear-gradient(90deg, transparent, #0070f3, transparent)" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Divider across all 5 preset themes">
      <ThemeGrid>
        <div style={{ width: '100%', padding: '8px 0' }}>
          <Divider text="OR" />
        </div>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Vertical orientation, spacing options">
      <Stack gap={24}>
        <Row gap={12} align="center" style={{ height: '80px' }}>
          <span>Left</span>
          <Divider orientation="vertical" />
          <span>Middle</span>
          <Divider orientation="vertical" />
          <span>Right</span>
        </Row>
        <Stack gap={8} style={{ width: '400px' }}>
          <Divider spacing="none" />
          <Divider spacing="xs" />
          <Divider spacing="lg" />
        </Stack>
      </Stack>
    </Demo>
  ),
};
