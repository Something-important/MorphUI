import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button, Dropdown } from '../../index';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated tooltip component with advanced positioning, theming, and accessibility features.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Tooltip content (string or React node)',
    },
    isVisible: {
      control: 'boolean',
      description: 'Controlled visibility state',
    },
    onVisibilityChange: {
      action: 'visibility changed',
      description: 'Callback when visibility changes',
    },
    position: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'auto',
      ],
      description: 'Tooltip position',
    },
    offset: {
      control: 'number',
      description: 'Distance from trigger',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow indicator',
    },
    autoPosition: {
      control: 'boolean',
      description: 'Enable auto-positioning',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'focus', 'click', 'manual'],
      description: 'Trigger behavior',
    },
    delay: {
      control: 'number',
      description: 'Show delay for hover/focus triggers',
    },
    hideDelay: {
      control: 'number',
      description: 'Hide delay for hover/focus triggers',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Close when clicking outside',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on Escape key',
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
    color: {
      control: 'color',
      description: 'Custom color',
    },
    gradient: {
      control: 'text',
      description: 'Custom gradient',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    borderRadius: {
      control: 'number',
      description: 'Custom border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    glassmorphism: {
      control: 'boolean',
      description: 'Apply glassmorphism effect',
    },
    backgroundPattern: {
      control: 'text',
      description: 'CSS background pattern',
    },
    backgroundImage: {
      control: 'text',
      description: 'URL for background image',
    },
    backgroundBlend: {
      control: 'select',
      options: [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      description: 'Background blend mode',
    },
    maxWidth: {
      control: 'number',
      description: 'Maximum width',
    },
    minWidth: {
      control: 'number',
      description: 'Minimum width',
    },
    maxHeight: {
      control: 'number',
      description: 'Maximum height',
    },
    minHeight: {
      control: 'number',
      description: 'Minimum height',
    },
    persistent: {
      control: 'boolean',
      description: 'Keep tooltip visible until manually closed',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow interaction with tooltip content',
    },
    multiline: {
      control: 'boolean',
      description: 'Support multiline content',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
    ariaDescribedBy: {
      control: 'text',
      description: 'ARIA described by reference',
    },
    id: {
      control: 'text',
      description: 'Unique identifier',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Inline styles',
    },
    contentClassName: {
      control: 'text',
      description: 'Additional CSS classes for content',
    },
    contentStyle: {
      control: 'object',
      description: 'Inline styles for content',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%', minHeight: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content
const simpleContent = 'This is a simple tooltip with basic text content.';
const richContent = (
  <div>
    <h4>🎯 Rich Content Tooltip</h4>
    <p>
      This tooltip supports <strong>HTML content</strong> and <em>formatting</em>!
    </p>
    <ul>
      <li>✅ Lists and bullets</li>
      <li>✅ Headers and paragraphs</li>
      <li>
        ✅ <code>Code snippets</code>
      </li>
      <li>
        ✅{' '}
        <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>
          Links
        </a>
      </li>
    </ul>
  </div>
);

// Basic Usage
export const Basic: Story = {
  args: {
    content: simpleContent,
  },
  render: (args) => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Tooltip {...args}>
        <Button variant="primary">Hover me!</Button>
      </Tooltip>
    </div>
  ),
};

// Simple Interactive Tooltip
export const SimpleInteractive: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Simple Interactive Tooltip</h3>
        <p>Hover over the button below to see the tooltip in action:</p>

        <Tooltip
          content={simpleContent}
          isVisible={isVisible}
          onVisibilityChange={setIsVisible}
          position="bottom"
        >
          <Button variant="primary">Hover for Tooltip</Button>
        </Tooltip>

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: '#f0f0f0',
            borderRadius: '8px',
            display: 'inline-block',
          }}
        >
          <strong>Tooltip state:</strong> {isVisible ? 'Visible' : 'Hidden'}
        </div>
      </div>
    );
  },
};

// Rich Content
export const RichContent: Story = {
  render: () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Tooltip content={richContent} position="bottom" size="lg">
        <Button variant="success">Rich Content Tooltip</Button>
      </Tooltip>
    </div>
  ),
};

// Position Variants
export const Positions: Story = {
  render: () => {
    const positions = [
      { pos: 'top', label: 'Top', color: '#0070f3' },
      { pos: 'bottom', label: 'Bottom', color: '#10b981' },
      { pos: 'left', label: 'Left', color: '#f59e0b' },
      { pos: 'right', label: 'Right', color: '#ef4444' },
    ];

    return (
      <div style={{ padding: '2rem' }}>
        <h3
          style={{
            color: 'var(--color-heading-primary)',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Position Variants
        </h3>
        <p
          style={{
            color: 'var(--color-content-primary)',
            fontSize: '16px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Hover over each button to see different tooltip positions:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '2rem',
            maxWidth: '600px',
            margin: '0 auto',
            position: 'relative',
            minHeight: '400px',
          }}
        >
          {positions.map(({ pos, label, color }) => (
            <div key={pos} style={{ textAlign: 'center' }}>
              <Tooltip
                content={`This tooltip appears ${pos} of the trigger button. Position: ${pos}`}
                position={pos as React.ComponentProps<typeof Tooltip>['position']}
                variant="primary"
              >
                <Button style={{ background: color, borderColor: color }} variant="primary">
                  {label}
                </Button>
              </Tooltip>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Trigger Types
export const TriggerTypes: Story = {
  render: () => {
    const triggers = [
      { type: 'hover', label: 'Hover Trigger', color: '#0070f3', description: 'Shows on hover' },
      { type: 'focus', label: 'Focus Trigger', color: '#10b981', description: 'Shows on focus' },
      { type: 'click', label: 'Click Trigger', color: '#f59e0b', description: 'Shows on click' },
    ];

    return (
      <div style={{ padding: '2rem' }}>
        <h3
          style={{
            color: 'var(--color-heading-primary)',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Trigger Types
        </h3>
        <p
          style={{
            color: 'var(--color-content-primary)',
            fontSize: '16px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Different ways to trigger the tooltip:
        </p>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {triggers.map(({ type, label, color, description }) => (
            <div key={type} style={{ textAlign: 'center' }}>
              <Tooltip
                content={`${description}\nTrigger type: ${type}`}
                trigger={type as React.ComponentProps<typeof Tooltip>['trigger']}
                position="bottom"
                variant="primary"
                multiline
              >
                <Button style={{ background: color, borderColor: color }} variant="primary">
                  {label}
                </Button>
              </Tooltip>
              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '14px',
                  color: 'var(--color-content-muted)',
                }}
              >
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const variants = [
      { variant: 'primary', label: 'Primary', color: '#0070f3' },
      { variant: 'success', label: 'Success', color: '#10b981' },
      { variant: 'warning', label: 'Warning', color: '#f59e0b' },
      { variant: 'danger', label: 'Danger', color: '#ef4444' },
      { variant: 'outline', label: 'Outline', color: '#6b7280' },
    ];

    return (
      <div style={{ padding: '2rem' }}>
        <h3
          style={{
            color: 'var(--color-heading-primary)',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Visual Variants
        </h3>
        <p
          style={{
            color: 'var(--color-content-primary)',
            fontSize: '16px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Different visual styles for the tooltip:
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {variants.map(({ variant, label, color }) => (
            <Tooltip
              key={variant}
              content={`This tooltip uses the ${variant} variant with custom colors and styling.`}
              variant={variant as React.ComponentProps<typeof Tooltip>['variant']}
              position="bottom"
            >
              <Button
                style={{
                  background: variant === 'outline' ? 'transparent' : color,
                  borderColor: variant === 'outline' ? color : color,
                  color: variant === 'outline' ? color : 'white',
                }}
                variant={variant === 'outline' ? 'outline' : 'primary'}
              >
                {label}
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const sizes = [
      { size: 'xs', label: 'Extra Small', color: '#0070f3' },
      { size: 'sm', label: 'Small', color: '#10b981' },
      { size: 'md', label: 'Medium', color: '#f59e0b' },
      { size: 'lg', label: 'Large', color: '#ef4444' },
      { size: 'xl', label: 'Extra Large', color: '#8b5cf6' },
    ];

    return (
      <div style={{ padding: '2rem' }}>
        <h3
          style={{
            color: 'var(--color-heading-primary)',
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '16px',
            textAlign: 'center',
          }}
        >
          Size Variants
        </h3>
        <p
          style={{
            color: 'var(--color-content-primary)',
            fontSize: '16px',
            marginBottom: '24px',
            textAlign: 'center',
          }}
        >
          Different sizes for the tooltip:
        </p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {sizes.map(({ size, label, color }) => (
            <Tooltip
              key={size}
              content={`Size: ${size}\nThis tooltip is sized accordingly.`}
              size={size as React.ComponentProps<typeof Tooltip>['size']}
              position="bottom"
              variant="primary"
              multiline
            >
              <Button style={{ background: color, borderColor: color }} variant="primary">
                {label}
              </Button>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  },
};

// Interactive Theme Builder