import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { ThemeProvider } from '../theme/ThemeProvider';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated tooltip component with advanced positioning, theming, and accessibility features.',
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
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end', 'auto'],
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
      options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],
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
      <ThemeProvider>
        <div style={{ padding: '2rem', maxWidth: '1200px', width: '100%', minHeight: '600px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content
const simpleContent = "This is a simple tooltip with basic text content.";
const richContent = (
  <div>
    <h4>🎯 Rich Content Tooltip</h4>
    <p>This tooltip supports <strong>HTML content</strong> and <em>formatting</em>!</p>
    <ul>
      <li>✅ Lists and bullets</li>
      <li>✅ Headers and paragraphs</li>
      <li>✅ <code>Code snippets</code></li>
      <li>✅ <a href="#" style={{ color: 'inherit', textDecoration: 'underline' }}>Links</a></li>
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
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}>
          Hover me!
        </button>
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
          <button style={{ 
            padding: '0.75rem 1.5rem', 
            borderRadius: '8px', 
            border: 'none', 
            background: 'var(--color-primary)', 
            color: 'white', 
            cursor: 'pointer',
            fontSize: '16px'
          }}>
            Hover for Tooltip
          </button>
        </Tooltip>
        
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '8px', display: 'inline-block' }}>
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
        <button style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', border: 'none', background: 'var(--color-success)', color: 'white', cursor: 'pointer' }}>
          Rich Content Tooltip
        </button>
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
        <h3>Position Variants</h3>
        <p>Hover over each button to see different tooltip positions:</p>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '2rem', 
          maxWidth: '600px', 
          margin: '0 auto',
          position: 'relative',
          minHeight: '400px'
        }}>
          {positions.map(({ pos, label, color }) => (
            <div key={pos} style={{ textAlign: 'center' }}>
              <Tooltip 
                content={`This tooltip appears ${pos} of the trigger button. Position: ${pos}`}
                position={pos as any}
                variant="primary"
              >
                <button style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  background: color, 
                  color: 'white', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  {label}
                </button>
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
        <h3>Trigger Types</h3>
        <p>Different ways to trigger the tooltip:</p>
        
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {triggers.map(({ type, label, color, description }) => (
            <div key={type} style={{ textAlign: 'center' }}>
              <Tooltip 
                content={`${description}\nTrigger type: ${type}`}
                trigger={type as any}
                position="bottom"
                variant="primary"
                multiline
              >
                <button style={{ 
                  padding: '0.75rem 1.5rem', 
                  borderRadius: '8px', 
                  border: 'none', 
                  background: color, 
                  color: 'white', 
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  {label}
                </button>
              </Tooltip>
              <p style={{ marginTop: '0.5rem', fontSize: '14px', color: 'var(--color-text-muted)' }}>
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
        <h3>Visual Variants</h3>
        <p>Different visual styles for the tooltip:</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {variants.map(({ variant, label, color }) => (
            <Tooltip 
              key={variant}
              content={`This tooltip uses the ${variant} variant with custom colors and styling.`}
              variant={variant as any}
              position="bottom"
            >
              <button style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                border: variant === 'outline' ? `2px solid ${color}` : 'none', 
                background: variant === 'outline' ? 'transparent' : color, 
                color: variant === 'outline' ? color : 'white', 
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                {label}
              </button>
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
        <h3>Size Variants</h3>
        <p>Different sizes for the tooltip:</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {sizes.map(({ size, label, color }) => (
            <Tooltip 
              key={size}
              content={`Size: ${size}\nThis tooltip is sized accordingly.`}
              size={size as any}
              position="bottom"
              variant="primary"
              multiline
            >
              <button style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: color, 
                color: 'white', 
                cursor: 'pointer',
                fontSize: '14px'
              }}>
                {label}
              </button>
            </Tooltip>
          ))}
        </div>
      </div>
    );
  },
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('lg');
    const [glassmorphism, setGlassmorphism] = useState(true);
    const [arrow, setArrow] = useState(true);
    
    const themes = {
      default: {
        'color-primary': '#0070f3',
        'color-success': '#10b981',
        'color-warning': '#f59e0b',
        'color-danger': '#ef4444',
        'color-info': '#3b82f6',
        'color-secondary': '#6b7280',
        'color-background': '#ffffff',
        'color-text': '#111827',
        'color-border': '#d1d5db',
      },
      dark: {
        'color-primary': '#3b82f6',
        'color-success': '#10b981',
        'color-warning': '#f59e0b',
        'color-danger': '#ef4444',
        'color-info': '#06b6d4',
        'color-secondary': '#9ca3af',
        'color-background': '#1f2937',
        'color-text': '#f9fafb',
        'color-border': '#374151',
      },
      warm: {
        'color-primary': '#f97316',
        'color-success': '#f59e0b',
        'color-warning': '#dc2626',
        'color-danger': '#b91c1c',
        'color-info': '#f97316',
        'color-secondary': '#f59e0b',
        'color-background': '#fef3c7',
        'color-text': '#92400e',
        'color-border': '#fbbf24',
      },
      cool: {
        'color-primary': '#06b6d4',
        'color-success': '#059669',
        'color-warning': '#d97706',
        'color-danger': '#dc2626',
        'color-info': '#06b6d4',
        'color-secondary': '#3b82f6',
        'color-background': '#ecfeff',
        'color-text': '#0e7490',
        'color-border': '#22d3ee',
      }
    };
    
    const themeContent = (
      <div>
        <h4>🎨 Theme Preview</h4>
        <p>Current theme: <strong>{currentTheme}</strong></p>
        <p>This tooltip automatically adapts to the selected theme!</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
          gap: '0.5rem',
          marginTop: '1rem'
        }}>
          {Object.entries(themes).map(([name, theme]) => (
            <div
              key={name}
              style={{
                padding: '0.5rem',
                background: theme['color-background'],
                border: `2px solid ${theme['color-border']}`,
                borderRadius: '6px',
                textAlign: 'center',
                color: theme['color-text'],
                fontSize: '12px',
              }}
            >
              <div style={{ 
                width: '20px', 
                height: '20px', 
                background: theme['color-primary'], 
                borderRadius: '50%',
                margin: '0 auto 0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '10px'
              }}>
                {name.charAt(0).toUpperCase()}
              </div>
              <strong>{name}</strong>
            </div>
          ))}
        </div>
      </div>
    );
    
    return (
      <ThemeProvider theme={themes[currentTheme as keyof typeof themes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Theme Switcher */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎨 Theme Switcher</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              Current theme: <strong style={{ color: 'var(--color-primary)' }}>{currentTheme}</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.entries(themes).map(([name, theme]) => (
                <button
                  key={name}
                  onClick={() => {
                    console.log('Switching to theme:', name, theme);
                    setCurrentTheme(name);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${currentTheme === name ? theme['color-primary'] : theme['color-border']}`,
                    background: currentTheme === name ? theme['color-primary'] : 'transparent',
                    color: currentTheme === name ? 'white' : theme['color-text'],
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: currentTheme === name ? '600' : '400',
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tooltip with Theme */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Tooltip</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This tooltip automatically adapts to the selected theme!
            </p>
            
            <Tooltip
              content={themeContent}
              position={position}
              variant={variant}
              glassmorphism={glassmorphism}
              arrow={arrow}
              size={size}
            >
              <button style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: 'var(--color-primary)', 
                color: 'white', 
                cursor: 'pointer',
                fontSize: '16px'
              }}>
                Hover for Themed Tooltip
              </button>
            </Tooltip>
          </div>

          {/* Tooltip Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Tooltip Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Position:</label>
                <select 
                  value={position} 
                  onChange={(e) => setPosition(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>

              {/* Variant Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Variant:</label>
                <select 
                  value={variant} 
                  onChange={(e) => setVariant(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                  <option value="success">Success</option>
                  <option value="warning">Warning</option>
                  <option value="danger">Danger</option>
                  <option value="info">Info</option>
                </select>
              </div>

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={glassmorphism} 
                      onChange={(e) => setGlassmorphism(e.target.checked)}
                    />
                    Glassmorphism
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={arrow} 
                      onChange={(e) => setArrow(e.target.checked)}
                    />
                    Arrow
                  </label>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  setPosition('bottom');
                  setVariant('primary');
                  setSize('lg');
                  setGlassmorphism(true);
                  setArrow(true);
                }}
                style={{
                  padding: '12px 24px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
