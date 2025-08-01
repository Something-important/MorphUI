import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardProps } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'], // enables docs generation
  argTypes: {
    shadow: {
      control: { type: 'select' },
      options: ['none', 'small', 'large'],
    },
    borderColor: { control: 'color' },
    padding: { control: 'text' },
    className: { control: 'text' },
    style: { control: 'object' },
    children: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'This is a card.',
    shadow: 'small',
    borderColor: '#ddd',
    padding: '1rem',
    className: '',
    style: {},
  },
};

export const NoShadow: Story = {
  args: {
    ...Default.args,
    shadow: 'none',
  },
};

export const LargeShadow: Story = {
  args: {
    ...Default.args,
    shadow: 'large',
  },
};

export const CustomBorderAndPadding: Story = {
  args: {
    children: 'Custom border color and padding',
    borderColor: '#4caf50',
    padding: '2rem',
  },
};

export const WithInlineStyle: Story = {
  args: {
    children: 'Card with inline style',
    style: {
      backgroundColor: '#f0f8ff',
      borderRadius: '12px',
    },
  },
};
