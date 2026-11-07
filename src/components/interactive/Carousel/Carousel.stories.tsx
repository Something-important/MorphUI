import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Carousel } from './Carousel';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Carousel>;

const slides = [
  <div
    key="1"
    style={{
      height: 200,
      background: '#3b82f6',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      borderRadius: 8,
    }}
  >
    Slide 1
  </div>,
  <div
    key="2"
    style={{
      height: 200,
      background: '#10b981',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      borderRadius: 8,
    }}
  >
    Slide 2
  </div>,
  <div
    key="3"
    style={{
      height: 200,
      background: '#f59e0b',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      borderRadius: 8,
    }}
  >
    Slide 3
  </div>,
  <div
    key="4"
    style={{
      height: 200,
      background: '#ef4444',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 24,
      borderRadius: 8,
    }}
  >
    Slide 4
  </div>,
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Carousel slides={slides} shadow="lg" />
    </div>
  ),
};

export const Autoplay: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Carousel slides={slides} autoplay autoplayInterval={2000} shadow="md" />
    </div>
  ),
};

export const NoLoop: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Carousel slides={slides} loop={false} />
    </div>
  ),
};

export const Minimal: Story = {
  render: () => (
    <div style={{ width: 500 }}>
      <Carousel slides={slides} showArrows={false} showDots={false} />
    </div>
  ),
};
