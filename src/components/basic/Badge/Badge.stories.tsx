import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';
import { Demo, Row, Stack, ThemeGrid, OnDark, OnLight } from '../../../stories/_shared';

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Badge renders a small status descriptor — variant, size, dot, removable, and full color customization.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default',
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Row gap={8} wrap>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="light">Light</Badge>
        <Badge variant="dark">Dark</Badge>
      </Row>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Row gap={8} align="center">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </Row>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Outlined, dotted, removable">
      <Row gap={8} wrap>
        <Badge variant="primary" outlined>
          Outlined
        </Badge>
        <Badge variant="success" dot>
          With Dot
        </Badge>
        <Badge variant="danger" removable onRemove={() => alert('removed')}>
          Removable
        </Badge>
        <Badge variant="warning" outlined dot>
          Outlined + Dot
        </Badge>
      </Row>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors & rounded">
      <Row gap={8} wrap>
        <Badge color="#ff0055" textColor="#fff">
          Custom BG
        </Badge>
        <Badge variant="primary" rounded>
          Rounded
        </Badge>
        <Badge color="#667eea" textColor="#fff">
          Solid color
        </Badge>
        <Badge borderColor="#10b981" textColor="#10b981" outlined>
          Custom Border
        </Badge>
      </Row>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Badge across all 5 preset themes">
      <ThemeGrid>
        <Badge variant="primary">Primary</Badge>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long text, empty, icon positions">
      <Stack gap={12}>
        <Row gap={8} wrap>
          <Badge variant="primary">A</Badge>
          <Badge variant="primary">This is a very long badge label that might wrap</Badge>
        </Row>
        <Row gap={8} wrap>
          <Badge variant="info" icon={<span>ℹ️</span>} iconPosition="left">
            Left icon
          </Badge>
          <Badge variant="info" icon={<span>ℹ️</span>} iconPosition="right">
            Right icon
          </Badge>
        </Row>
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
            <Badge variant="light">Light on dark</Badge>
            <Badge variant="warning">Warning on dark</Badge>
          </Row>
        </OnDark>
        <OnLight>
          <Row gap={8}>
            <Badge variant="dark">Dark on light</Badge>
            <Badge variant="primary">Primary on light</Badge>
          </Row>
        </OnLight>
      </Stack>
    </Demo>
  ),
};
