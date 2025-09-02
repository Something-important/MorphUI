import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Badge } from './Badge';
import { ThemeProvider } from '../theme/ThemeProvider';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile badge component for status indicators, labels, and notifications. Supports multiple variants, sizes, and features like icons, dots, and removable badges.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      description: 'The visual style variant of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the badge',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Whether to use fully rounded corners',
    },
    outlined: {
      control: { type: 'boolean' },
      description: 'Whether to use outlined style instead of filled',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Whether to show a colored dot indicator',
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Whether the badge can be removed',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to the text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Badge
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="light">Light</Badge>
      <Badge variant="dark">Dark</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with their default styling.',
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge sizes from extra small to large.',
      },
    },
  },
};

// Outlined Variants
export const Outlined: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" outlined>Primary</Badge>
      <Badge variant="secondary" outlined>Secondary</Badge>
      <Badge variant="success" outlined>Success</Badge>
      <Badge variant="warning" outlined>Warning</Badge>
      <Badge variant="danger" outlined>Danger</Badge>
      <Badge variant="info" outlined>Info</Badge>
      <Badge variant="light" outlined>Light</Badge>
      <Badge variant="dark" outlined>Dark</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined badge variants with transparent backgrounds and colored borders.',
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" icon="✓">Completed</Badge>
      <Badge variant="warning" icon="⚠">Pending</Badge>
      <Badge variant="danger" icon="✕">Failed</Badge>
      <Badge variant="info" icon="ℹ">Info</Badge>
      <Badge variant="primary" icon="🔔" iconPosition="right">Notifications</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with icons positioned on the left or right side.',
      },
    },
  },
};

// With Dots
export const WithDots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>Online</Badge>
      <Badge variant="danger" dot>Offline</Badge>
      <Badge variant="warning" dot>Away</Badge>
      <Badge variant="info" dot>Busy</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with colored dot indicators for status representation.',
      },
    },
  },
};

// Removable Badges
export const Removable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" removable onRemove={() => alert('Primary badge removed')}>
        Primary
      </Badge>
      <Badge variant="success" removable onRemove={() => alert('Success badge removed')}>
        Success
      </Badge>
      <Badge variant="warning" removable onRemove={() => alert('Warning badge removed')}>
        Warning
      </Badge>
      <Badge variant="danger" removable onRemove={() => alert('Danger badge removed')}>
        Danger
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Removable badges with clickable remove buttons and callback functions.',
      },
    },
  },
};

// Rounded Badges
export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" rounded>Rounded</Badge>
      <Badge variant="success" rounded>Success</Badge>
      <Badge variant="warning" rounded>Warning</Badge>
      <Badge variant="danger" rounded>Danger</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with fully rounded corners for a more modern look.',
      },
    },
  },
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>Active</Badge>
      <Badge variant="warning" dot>Pending</Badge>
      <Badge variant="danger" dot>Inactive</Badge>
      <Badge variant="info" dot>Processing</Badge>
      <Badge variant="secondary" dot>Archived</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case for badges as status indicators with dot indicators.',
      },
    },
  },
};

// Notification Badges
export const NotificationBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="danger">3</Badge>
      <Badge variant="warning">12</Badge>
      <Badge variant="info">99+</Badge>
      <Badge variant="success">New</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges commonly used for notification counts and new item indicators.',
      },
    },
  },
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge color="#8b5cf6" textColor="#ffffff">Custom Purple</Badge>
      <Badge color="#f97316" textColor="#ffffff">Custom Orange</Badge>
      <Badge color="#06b6d4" textColor="#ffffff">Custom Cyan</Badge>
      <Badge color="#ec4899" textColor="#ffffff">Custom Pink</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with custom background and text colors for brand-specific styling.',
      },
    },
  },
};

// Complex Examples
export const ComplexExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot icon="✓" size="lg">
        Task Completed
      </Badge>
      <Badge variant="warning" outlined icon="⏰" removable size="lg">
        Due Soon
      </Badge>
      <Badge variant="danger" dot icon="🚨" rounded size="lg">
        Critical Alert
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex badge examples combining multiple features for advanced use cases.',
      },
    },
  },
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg'>('md');
    const [outlined, setOutlined] = useState(false);
    const [rounded, setRounded] = useState(false);
    const [dot, setDot] = useState(false);
    const [removable, setRemovable] = useState(false);
    const [icon, setIcon] = useState('✓');
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('left');
    
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
        <p>This badge automatically adapts to the selected theme!</p>
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

          {/* Badge with Theme */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Badge</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This badge automatically adapts to the selected theme!
            </p>
            
            <Badge
              variant={variant}
              size={size}
              outlined={outlined}
              rounded={rounded}
              dot={dot}
              removable={removable}
              icon={icon}
              iconPosition={iconPosition}
              onRemove={removable ? () => alert('Badge removed!') : undefined}
            >
              Themed Badge
            </Badge>
          </div>

          {/* Badge Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Badge Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Basic Controls */}
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
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

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
                  <option value="xs">Extra Small</option>
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
                      checked={outlined} 
                      onChange={(e) => setOutlined(e.target.checked)}
                    />
                    Outlined
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={rounded} 
                      onChange={(e) => setRounded(e.target.checked)}
                    />
                    Rounded
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={dot} 
                      onChange={(e) => setDot(e.target.checked)}
                    />
                    Dot
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={removable} 
                      onChange={(e) => setRemovable(e.target.checked)}
                    />
                    Removable
                  </label>
                </div>
              </div>

              {/* Icon Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Icon:</label>
                <input 
                  type="text" 
                  value={icon} 
                  onChange={(e) => setIcon(e.target.value)}
                  placeholder="Enter icon (emoji or text)"
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                />
                <select 
                  value={iconPosition} 
                  onChange={(e) => setIconPosition(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setOutlined(false);
                  setRounded(false);
                  setDot(false);
                  setRemovable(false);
                  setIcon('✓');
                  setIconPosition('left');
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
  parameters: {
    docs: {
      description: {
        story: 'Interactive theme builder that allows you to customize all badge properties in real-time. Perfect for designers and developers to experiment with different combinations.',
      },
    },
  },
};
