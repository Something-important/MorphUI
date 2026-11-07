import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../../basic/Button';
import { Badge } from '../../basic/Badge';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Card> = {
  title: 'Patterns/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card renders a content container with optional header, image, footer. 8 variants, 5 sizes, shadows, hover effects, image positioning.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div style={{ padding: '16px' }}>Card content</div>,
    variant: 'primary',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={12}>
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'info',
            'danger',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <Card key={v} variant={v} style={{ padding: '16px', width: '300px' }}>
            <strong>{v}</strong>
            <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)' }}>
              Card body text
            </p>
          </Card>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={12}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Card key={s} size={s} style={{ padding: '16px', width: '300px' }}>
            <strong>{s}</strong> size card
          </Card>
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="With header & footer (composition)">
      <Stack gap={12}>
        <Card
          variant="primary"
          style={{ width: '320px' }}
          header={<div style={{ padding: '12px 16px', fontWeight: 600 }}>Card title</div>}
          footer={
            <div style={{ padding: '12px 16px', display: 'flex', gap: '8px' }}>
              <Button size="sm" variant="primary">
                Action
              </Button>
            </div>
          }
        >
          <div style={{ padding: '16px' }}>Card body content with header and footer.</div>
        </Card>
        <Card variant="outline" style={{ width: '320px', padding: '16px' }}>
          <Badge variant="success">Active</Badge>
          <p style={{ margin: '8px 0 0' }}>Card with badge in body.</p>
        </Card>
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Shadows, hover effects, custom colors, gradients">
      <Stack gap={12}>
        <Card shadow="xl" style={{ padding: '16px', width: '300px' }}>
          <strong>Shadow XL</strong>
        </Card>
        <Card hoverEffect="lift" style={{ padding: '16px', width: '300px' }}>
          <strong>Hover lift</strong>
        </Card>
        <Card color="#ff0055" textColor="#fff" style={{ padding: '16px', width: '300px' }}>
          <strong>Custom color</strong>
        </Card>
        <Card
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          textColor="#fff"
          style={{ padding: '16px', width: '300px' }}
        >
          <strong>Gradient</strong>
        </Card>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Card across all 5 preset themes">
      <ThemeGrid>
        <Card variant="primary" style={{ padding: '16px' }}>
          <strong>Themed card</strong>
          <p style={{ margin: '4px 0 0', color: 'var(--color-text-secondary)' }}>Body text</p>
        </Card>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long content, empty, minimal">
      <Stack gap={12}>
        <Card style={{ padding: '16px', width: '300px' }}>
          <strong>Long content</strong>
          <p style={{ margin: '4px 0 0' }}>
            This card contains a very long body message that should wrap gracefully across multiple
            lines without breaking the card layout or alignment.
          </p>
        </Card>
        <Card style={{ width: '300px', height: '80px' }}>&nbsp;</Card>
        <Card style={{ padding: '8px', width: '300px' }}>Minimal</Card>
      </Stack>
    </Demo>
  ),
};
