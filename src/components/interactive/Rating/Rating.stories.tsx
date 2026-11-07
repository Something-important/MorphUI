import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Rating> = {
  title: 'Patterns/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Rating renders a star-based rating input. Supports half-star precision, custom max, readonly, disabled, 3 sizes, custom colors. Controlled/uncontrolled.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 3,
  },
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={12}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <Rating key={s} size={s} defaultValue={3} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Readonly, disabled, half stars">
      <Stack gap={12}>
        <Rating defaultValue={3} readonly />
        <Rating defaultValue={3} disabled />
        <Rating defaultValue={3.5} allowHalf />
        <Rating defaultValue={0} />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={12}>
        <Rating defaultValue={3} />
        <Rating value={4} onChange={() => {}} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom max, custom colors">
      <Stack gap={12}>
        <Rating defaultValue={7} max={10} />
        <Rating defaultValue={3} color="#ff0055" />
        <Rating defaultValue={4} allowHalf color="#10b981" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Rating across all 5 preset themes">
      <ThemeGrid>
        <Rating defaultValue={3} />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — zero, max, single star">
      <Stack gap={12}>
        <Rating defaultValue={0} />
        <Rating defaultValue={5} />
        <Rating defaultValue={1} max={1} />
        <Rating defaultValue={2.5} allowHalf max={3} />
      </Stack>
    </Demo>
  ),
};
