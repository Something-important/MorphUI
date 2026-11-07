import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { Demo, Row, Stack, ThemeGrid, OnDark, OnLight } from '../../../stories/_shared';

const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Spinner renders a loading indicator with 6 variants, 5 sizes, and 5 animation types (spin, pulse, dots, bars, wave).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    animation: 'spin',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Row gap={16} align="center">
        <Spinner variant="primary" />
        <Spinner variant="secondary" />
        <Spinner variant="success" />
        <Spinner variant="warning" />
        <Spinner variant="danger" />
        <Spinner variant="info" />
      </Row>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Row gap={16} align="center">
        <Spinner size="xs" />
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </Row>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Animation types & custom colors">
      <Stack gap={16}>
        <Row gap={16} align="center">
          <Spinner animation="spin" />
          <Spinner animation="pulse" />
          <Spinner animation="dots" />
          <Spinner animation="bars" />
          <Spinner animation="wave" />
        </Row>
        <Row gap={16} align="center">
          <Spinner color="#ff0055" />
          <Spinner gradient="linear-gradient(135deg, #667eea, #764ba2)" />
        </Row>
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="With label & full screen">
      <Stack gap={24}>
        <Spinner label="Loading data..." />
        <div
          style={{
            position: 'relative',
            height: '120px',
            border: '1px solid var(--color-border, #d1d5db)',
            borderRadius: 'var(--border-radius-md, 8px)',
            overflow: 'hidden',
          }}
        >
          <Spinner fullScreen />
        </div>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Spinner across all 5 preset themes">
      <ThemeGrid>
        <Spinner size="lg" />
      </ThemeGrid>
    </Demo>
  ),
};

export const Contrast: Story = {
  render: () => (
    <Demo title="On dark / on light backgrounds">
      <Stack gap={12}>
        <OnDark>
          <Row gap={16}>
            <Spinner variant="info" />
            <Spinner variant="warning" />
          </Row>
        </OnDark>
        <OnLight>
          <Row gap={16}>
            <Spinner variant="primary" />
            <Spinner variant="danger" />
          </Row>
        </OnLight>
      </Stack>
    </Demo>
  ),
};
