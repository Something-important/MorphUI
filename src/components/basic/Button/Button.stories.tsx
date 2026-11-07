import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Demo, Row, Stack, ThemeGrid, OnDark, OnLight } from '../../../stories/_shared';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Button is the primary action trigger. Supports 8 variants, 5 sizes, shadows, hover effects, gradients, ripple, loading state, and full color customization.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Row gap={8} wrap>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="success">Success</Button>
        <Button variant="warning">Warning</Button>
        <Button variant="info">Info</Button>
      </Row>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Row gap={8} align="center">
        <Button size="xs">XS</Button>
        <Button size="sm">SM</Button>
        <Button size="md">MD</Button>
        <Button size="lg">LG</Button>
        <Button size="xl">XL</Button>
      </Row>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled & loading states">
      <Row gap={8} wrap>
        <Button variant="primary" disabled>
          Disabled
        </Button>
        <Button variant="primary" loading>
          Loading
        </Button>
        <Button variant="outline" loading loadingText="Saving...">
          Save
        </Button>
        <Button variant="ghost" disabled>
          Disabled Ghost
        </Button>
      </Row>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Shadows, hover effects, gradients, icons, ripple, rounded">
      <Stack gap={12}>
        <Row gap={8} wrap>
          <Button shadow="sm">Shadow SM</Button>
          <Button shadow="md">Shadow MD</Button>
          <Button shadow="lg">Shadow LG</Button>
          <Button shadow="xl">Shadow XL</Button>
        </Row>
        <Row gap={8} wrap>
          <Button hoverEffect="lift">Lift</Button>
          <Button hoverEffect="glow">Glow</Button>
          <Button hoverEffect="scale">Scale</Button>
        </Row>
        <Row gap={8} wrap>
          <Button gradient="linear-gradient(135deg, #667eea, #764ba2)">Gradient</Button>
          <Button rounded>Rounded</Button>
          <Button ripple>Ripple (click me)</Button>
          <Button iconLeft={<span>←</span>}>Left icon</Button>
          <Button iconRight={<span>→</span>}>Right icon</Button>
        </Row>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Button across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Primary</Button>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — full width, long text, link button">
      <Stack gap={12}>
        <Button fullWidth>Full width button</Button>
        <Button>
          This button has a very long label that might wrap or truncate depending on container width
        </Button>
        <Button as="a" href="#">
          Link button
        </Button>
      </Stack>
    </Demo>
  ),
};

export const Contrast: Story = {
  render: () => (
    <Demo title="On dark / on light backgrounds">
      <Stack gap={12}>
        <OnDark>
          <Row gap={8}>
            <Button variant="primary">Primary</Button>
            <Button variant="outline">Outline</Button>
          </Row>
        </OnDark>
        <OnLight>
          <Row gap={8}>
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
          </Row>
        </OnLight>
      </Stack>
    </Demo>
  ),
};
