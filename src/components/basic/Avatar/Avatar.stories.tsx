import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { Demo, Row, Stack, ThemeGrid, OnDark, OnLight } from '../../../stories/_shared';

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Avatar renders a user image, initials fallback, or icon. Supports status indicators, sizes, shapes, and full color customization.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Jane Doe',
    size: 'md',
    shape: 'circle',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="Image / Initials / Icon fallback">
      <Row gap={16}>
        <Avatar src="https://i.pravatar.cc/80?img=1" name="With Image" size="lg" />
        <Avatar name="Initials Only" size="lg" />
        <Avatar name="JD" size="lg" />
        <Avatar icon={<span>👤</span>} size="lg" />
      </Row>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (xs → xl)">
      <Row gap={12} align="end">
        <Avatar name="XS" size="xs" />
        <Avatar name="SM" size="sm" />
        <Avatar name="MD" size="md" />
        <Avatar name="LG" size="lg" />
        <Avatar name="XL" size="xl" />
      </Row>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Status indicators">
      <Row gap={16}>
        <Avatar name="Online" size="lg" status="online" />
        <Avatar name="Away" size="lg" status="away" />
        <Avatar name="Busy" size="lg" status="busy" />
        <Avatar name="Offline" size="lg" status="offline" />
      </Row>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Shapes & custom colors">
      <Stack gap={16}>
        <Row gap={12}>
          <Avatar name="Circle" size="lg" shape="circle" />
          <Avatar name="Square" size="lg" shape="square" />
          <Avatar name="Rounded" size="lg" shape="rounded" />
        </Row>
        <Row gap={12}>
          <Avatar name="Custom" size="lg" color="#ff0055" textColor="#fff" />
          <Avatar
            name="Gradient"
            size="lg"
            gradient="linear-gradient(135deg, #667eea, #764ba2)"
            textColor="#fff"
          />
          <Avatar name="BG" size="lg" backgroundColor="#10b981" textColor="#fff" />
        </Row>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Avatar across all 5 preset themes">
      <ThemeGrid>
        <Avatar name="Jane Doe" size="lg" status="online" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long names, single char, empty">
      <Stack gap={16}>
        <Row gap={12} align="center">
          <Avatar name="Alexander Maximilian Worthington III" size="lg" />
          <Avatar name="A" size="lg" />
          <Avatar name="" size="lg" icon={<span>?</span>} />
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
          <Row gap={12}>
            <Avatar name="Dark BG" size="lg" />
            <Avatar name="Status" size="lg" status="online" />
          </Row>
        </OnDark>
        <OnLight>
          <Row gap={12}>
            <Avatar name="Light BG" size="lg" />
            <Avatar name="Status" size="lg" status="busy" />
          </Row>
        </OnLight>
      </Stack>
    </Demo>
  ),
};

export const Integration: Story = {
  render: () => (
    <Demo title="Avatar group (composition example)">
      <Row gap={-8} align="center">
        {['Alice', 'Bob', 'Carol', 'Dave'].map((n) => (
          <Avatar
            key={n}
            name={n}
            size="md"
            style={{ border: '2px solid var(--color-background, #fff)' }}
          />
        ))}
        <Avatar name="+5" size="md" backgroundColor="var(--color-gray-200, #e5e7eb)" />
      </Row>
    </Demo>
  ),
};
