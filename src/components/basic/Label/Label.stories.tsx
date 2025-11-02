import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Basic/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Email',
    htmlFor: 'email',
    required: false,
  },
  argTypes: {
    htmlFor: { control: 'text' },
    required: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Default: Story = {};

export const Required: Story = {
  args: { required: true },
};
