import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Click to expand',
    children: <p>This is the hidden content that shows when expanded.</p>,
  },
};

export const OpenByDefault: Story = {
  args: {
    title: 'Open by default',
    defaultOpen: true,
    children: <p>This accordion starts open.</p>,
  },
};

export const MultipleParagraphs: Story = {
  args: {
    title: 'Multiple children',
    children: (
      <>
        <p>First paragraph of content.</p>
        <p>Second paragraph with more info.</p>
      </>
    ),
  },
};
