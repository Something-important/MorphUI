// Button.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Mock icons for stories
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    rounded: { control: 'boolean' },
    loadingText: { control: 'text' },
    onClick: { action: 'clicked' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Button iconLeft={<DownloadIcon />}>Download</Button>
      <Button variant="secondary" iconRight={<ChevronRightIcon />}>Continue</Button>
      <Button variant="ghost" iconLeft={<HeartIcon />} iconRight={<ChevronRightIcon />}>
        Like & Share
      </Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Button loading>Loading...</Button>
      <Button variant="secondary" loading loadingText="Saving...">
        Save Changes
      </Button>
      <Button variant="outline" loading loadingText="Processing your request">
        Submit
      </Button>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button variant="danger" disabled>Disabled Danger</Button>
      <Button variant="ghost" disabled>Disabled Ghost</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </div>
  ),
};

export const FullWidthButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="outline" fullWidth iconLeft={<DownloadIcon />}>
        Full Width with Icon
      </Button>
    </div>
  ),
};

export const RoundedButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button rounded>Rounded Primary</Button>
      <Button variant="secondary" rounded>Rounded Secondary</Button>
      <Button variant="outline" rounded iconLeft={<HeartIcon />}>
        Rounded with Icon
      </Button>
    </div>
  ),
};

export const AsAnchorTag: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button as="a" href="#" variant="primary">
        Link Button
      </Button>
      <Button as="a" href="#" variant="outline" iconRight={<ChevronRightIcon />}>
        External Link
      </Button>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Interactive Button',
    loading: false,
    disabled: false,
    fullWidth: false,
    rounded: false,
    loadingText: 'Loading...',
  },
};

export const ButtonGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Action Group</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm">Edit</Button>
          <Button variant="secondary" size="sm">Duplicate</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Form Actions</h3>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="outline">Save Draft</Button>
          <Button>Publish</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Navigation</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm">← Previous</Button>
          <Button size="sm">Next →</Button>
        </div>
      </div>
    </div>
  ),
};

export const CustomColor: Story = {
  args: {
    children: 'Custom Color',
    color: '#10b981',
  },
};

export const Gradient: Story = {
  args: {
    children: 'Gradient',
    gradient: 'linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)',
  },
};