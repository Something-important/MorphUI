import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover, Button, Dropdown } from '../../index';

type PopoverPosition = NonNullable<React.ComponentProps<typeof Popover>['position']>;
type PopoverTrigger = NonNullable<React.ComponentProps<typeof Popover>['trigger']>;
type PopoverVariant = NonNullable<React.ComponentProps<typeof Popover>['variant']>;
type PopoverSize = NonNullable<React.ComponentProps<typeof Popover>['size']>;

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sophisticated popover component with advanced positioning, theming, and accessibility features.',
      },
    },
  },
  argTypes: {
    content: {
      control: 'object',
      description: 'Popover content or structured content object',
    },
    isOpen: {
      control: 'boolean',
      description: 'Controlled open state',
    },
    onOpenChange: {
      action: 'open changed',
      description: 'Callback when open state changes',
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
      description: 'Popover position',
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
      options: ['click', 'hover', 'focus', 'manual'],
      description: 'Trigger behavior',
    },
    delay: {
      control: 'number',
      description: 'Delay for hover/focus triggers',
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
const simpleContent = (
  <div>
    <p>This is a simple popover with basic content.</p>
    <p>You can put any React components here!</p>
  </div>
);

const structuredContent = {
  header: <h3>🎯 Popover Header</h3>,
  body: (
    <div>
      <p>This is a structured popover with organized sections.</p>
      <ul>
        <li>Header section with title</li>
        <li>Body section with main content</li>
        <li>Footer section with additional info</li>
        <li>Actions section with interactive buttons</li>
      </ul>
    </div>
  ),
  footer: <p>📝 Footer: Additional information or metadata</p>,
  actions: [
    {
      label: 'Cancel',
      variant: 'ghost' as const,
      icon: '❌',
      onClick: () => console.log('Cancel clicked!'),
    },
    {
      label: 'Confirm',
      variant: 'primary' as const,
      icon: '✅',
      onClick: () => console.log('Confirm clicked!'),
    },
  ],
};

// Basic Usage
export const Basic: Story = {
  render: () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Popover content={simpleContent}>
        <button
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--color-primary)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Click me!
        </button>
      </Popover>
    </div>
  ),
};

// Simple Interactive Popover
export const SimpleInteractive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h3>Simple Interactive Popover</h3>
        <p>Click the button below to see the popover in action:</p>

        <Popover content={simpleContent} isOpen={isOpen} onOpenChange={setIsOpen} position="bottom">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--color-primary)',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
            }}
          >
            {isOpen ? 'Close Popover' : 'Open Popover'}
          </button>
        </Popover>

        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            background: '#f0f0f0',
            borderRadius: '8px',
            display: 'inline-block',
          }}
        >
          <strong>Popover state:</strong> {isOpen ? 'Open' : 'Closed'}
        </div>
      </div>
    );
  },
};

// Structured Content
export const StructuredContent: Story = {
  render: () => (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Popover content={structuredContent} position="bottom">
        <button
          style={{
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--color-success)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Show Structured Popover
        </button>
      </Popover>
    </div>
  ),
};

// Enhanced Actions
export const EnhancedActions: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const enhancedContent = {
      header: <h3>🚀 Enhanced Actions Demo</h3>,
      body: (
        <div>
          <p>This popover showcases the new enhanced action system:</p>
          <ul>
            <li>✅ Multiple variants (primary, success, warning, danger)</li>
            <li>✅ Different sizes (xs, sm, md, lg, xl)</li>
            <li>✅ Icons and loading states</li>
            <li>✅ Click handlers and links</li>
            <li>✅ Disabled states</li>
          </ul>
        </div>
      ),
      footer: <p>💡 Try clicking different action buttons!</p>,
      actions: [
        {
          label: 'Save',
          variant: 'primary' as const,
          icon: '💾',
          size: 'lg' as const,
          onClick: () => console.log('Save clicked!'),
        },
        {
          label: 'Preview',
          variant: 'success' as const,
          icon: '👁️',
          size: 'md' as const,
          onClick: () => console.log('Preview clicked!'),
        },
        {
          label: 'Delete',
          variant: 'danger' as const,
          icon: '🗑️',
          size: 'sm' as const,
          onClick: () => console.log('Delete clicked!'),
        },
        {
          label: isLoading ? 'Processing...' : 'Process',
          variant: 'warning' as const,
          icon: '⚡',
          size: 'md' as const,
          loading: isLoading,
          onClick: async () => {
            setIsLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
            console.log('Process completed!');
          },
        },
        {
          label: 'Documentation',
          variant: 'info' as const,
          icon: '📚',
          href: 'https://example.com/docs',
          target: '_blank',
        },
        {
          label: 'Cancel',
          variant: 'ghost' as const,
          icon: '❌',
          size: 'sm' as const,
          onClick: () => console.log('Cancel clicked!'),
        },
      ],
    };

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Popover content={enhancedContent} position="bottom" size="lg">
          <button
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--color-warning)',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            Show Enhanced Actions
          </button>
        </Popover>
      </div>
    );
  },
};

// Position Variants
export const Positions: Story = {
  render: () => {
    const positions = [
      { pos: 'top', label: 'Top', color: '#0070f3' },
      { pos: 'bottom', label: 'Bottom', color: '#10b981' },
      { pos: 'left', label: 'Left', color: '#f59e0b' },
      { pos: 'right', label: 'Right', color: '#ef4444' },
    ] as const;

    return (
      <div style={{ padding: '2rem' }}>
        <h3>Position Variants</h3>
        <p>Click each button to see different popover positions:</p>

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
              <Popover
                content={
                  <div>
                    <h4>🎯 {label} Position</h4>
                    <p>This popover appears {pos} of the trigger button.</p>
                    <p>
                      Position: <strong>{pos}</strong>
                    </p>
                  </div>
                }
                position={pos}
                variant="primary"
              >
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: color,
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  {label}
                </button>
              </Popover>
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
      { type: 'click', label: 'Click Trigger', color: '#0070f3', description: 'Opens on click' },
      { type: 'hover', label: 'Hover Trigger', color: '#10b981', description: 'Opens on hover' },
      { type: 'focus', label: 'Focus Trigger', color: '#f59e0b', description: 'Opens on focus' },
    ] as const;

    return (
      <div style={{ padding: '2rem' }}>
        <h3>Trigger Types</h3>
        <p>Different ways to trigger the popover:</p>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {triggers.map(({ type, label, color, description }) => (
            <div key={type} style={{ textAlign: 'center' }}>
              <Popover
                content={
                  <div>
                    <h4>🎯 {label}</h4>
                    <p>{description}</p>
                    <p>
                      Trigger type: <strong>{type}</strong>
                    </p>
                  </div>
                }
                trigger={type}
                position="bottom"
                variant="primary"
              >
                <button
                  style={{
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: color,
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '14px',
                  }}
                >
                  {label}
                </button>
              </Popover>
              <p
                style={{ marginTop: '0.5rem', fontSize: '14px', color: 'var(--color-text-muted)' }}
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
    ] as const;

    return (
      <div style={{ padding: '2rem' }}>
        <h3>Visual Variants</h3>
        <p>Different visual styles for the popover:</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {variants.map(({ variant, label, color }) => (
            <Popover
              key={variant}
              content={
                <div>
                  <h4>🎨 {label} Variant</h4>
                  <p>
                    This popover uses the <strong>{variant}</strong> variant.
                  </p>
                  <p>It has custom colors and styling.</p>
                </div>
              }
              variant={variant}
              position="bottom"
            >
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: variant === 'outline' ? `2px solid ${color}` : 'none',
                  background: variant === 'outline' ? 'transparent' : color,
                  color: variant === 'outline' ? color : 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {label}
              </button>
            </Popover>
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
    ] as const;

    return (
      <div style={{ padding: '2rem' }}>
        <h3>Size Variants</h3>
        <p>Different sizes for the popover:</p>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {sizes.map(({ size, label, color }) => (
            <Popover
              key={size}
              content={
                <div>
                  <h4>📏 {label}</h4>
                  <p>
                    Size: <strong>{size}</strong>
                  </p>
                  <p>This popover is sized accordingly.</p>
                </div>
              }
              size={size}
              position="bottom"
              variant="primary"
            >
              <button
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: color,
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                }}
              >
                {label}
              </button>
            </Popover>
          ))}
        </div>
      </div>
    );
  },
};

// Interactive Theme Builder