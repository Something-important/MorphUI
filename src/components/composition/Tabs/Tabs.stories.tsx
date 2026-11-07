import React, {  } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Dropdown, ThemeProvider, themes } from '../../index';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated tabs component with advanced theming, accessibility, and smooth animations.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of tab items',
    },
    defaultActiveTab: {
      control: 'text',
      description: 'Default active tab ID',
    },
    activeTab: {
      control: 'text',
      description: 'Controlled active tab ID',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when active tab changes',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make tabs full width',
    },
    centered: {
      control: 'boolean',
      description: 'Center align tabs',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    closable: {
      control: 'boolean',
      description: 'Allow closing tabs',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={themes.light}>
        <div style={{ padding: '2rem', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample data for stories
const sampleItems = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)' }}>Overview</h3>
        <p style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>
          This is the overview tab content. Here you can see how the Tabs component works with
          custom theming.
        </p>
      </div>
    ),
    icon: '📊',
    badge: '3',
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)' }}>Analytics</h3>
        <p style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>
          Analytics data and insights go here. The tabs support rich content and custom styling.
        </p>
      </div>
    ),
    icon: '📈',
    badge: '12',
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)' }}>Settings</h3>
        <p style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>
          Configure your preferences and settings here. Each tab can have different content and
          styling.
        </p>
      </div>
    ),
    icon: '⚙️',
  },
];

export const Default: Story = {
  args: {
    items: sampleItems,
    defaultActiveTab: 'overview',
    variant: 'primary',
    size: 'md',
    animated: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3
        style={{
          color: 'var(--color-heading-primary)',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Tabs Variants
      </h3>
      <p
        style={{
          color: 'var(--color-content-primary)',
          fontSize: '16px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Different visual styles for the tabs component:
      </p>

      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
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
        ).map((variant) => (
          <div key={variant} style={{ textAlign: 'center' }}>
            <h4
              style={{
                color: 'var(--color-text)',
                fontSize: '14px',
                marginBottom: '8px',
                textTransform: 'capitalize',
              }}
            >
              {variant}
            </h4>
            <Tabs
              items={sampleItems.slice(0, 2)}
              defaultActiveTab="overview"
              variant={variant}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3
        style={{
          color: 'var(--color-heading-primary)',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Tabs Sizes
      </h3>
      <p
        style={{
          color: 'var(--color-content-primary)',
          fontSize: '16px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Different sizes for various use cases:
      </p>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
      >
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
          <div key={size} style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
            <h4
              style={{
                color: 'var(--color-text)',
                fontSize: '14px',
                marginBottom: '8px',
                textTransform: 'uppercase',
              }}
            >
              {size}
            </h4>
            <Tabs items={sampleItems} defaultActiveTab="overview" variant="primary" size={size} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Features: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3
        style={{
          color: 'var(--color-heading-primary)',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '16px',
          textAlign: 'center',
        }}
      >
        Tabs Features
      </h3>
      <p
        style={{
          color: 'var(--color-content-primary)',
          fontSize: '16px',
          marginBottom: '24px',
          textAlign: 'center',
        }}
      >
        Different features and configurations:
      </p>

      <div
        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}
      >
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px' }}>
            Full Width
          </h4>
          <Tabs items={sampleItems} defaultActiveTab="overview" variant="primary" fullWidth />
        </div>

        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px' }}>
            Centered
          </h4>
          <Tabs items={sampleItems} defaultActiveTab="overview" variant="secondary" centered />
        </div>

        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px' }}>
            Vertical Orientation
          </h4>
          <Tabs
            items={sampleItems}
            defaultActiveTab="overview"
            variant="info"
            orientation="vertical"
            size="lg"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive Theme Builder