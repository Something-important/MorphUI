import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <Rating defaultValue={3} />
    </ThemeProvider>
  ),
};

export const HalfStars: Story = {
  render: () => (
    <ThemeProvider>
      <Rating defaultValue={3.5} allowHalf />
    </ThemeProvider>
  ),
};

export const Readonly: Story = {
  render: () => (
    <ThemeProvider>
      <Rating value={4} readonly size="lg" />
    </ThemeProvider>
  ),
};

export const TenStars: Story = {
  render: () => (
    <ThemeProvider>
      <Rating defaultValue={7} max={10} />
    </ThemeProvider>
  ),
};
