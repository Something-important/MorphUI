import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Badge, Button, Dropdown, Checkbox, ThemeProvider, themes } from '../../index';

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
    
    // Color controls
    const [color, setColor] = useState('');
    const [colorGradient, setColorGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [textColorGradient, setTextColorGradient] = useState('');
    const [borderColor, setBorderColor] = useState('');
    const [borderColorGradient, setBorderColorGradient] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [activeGradientBuilder, setActiveGradientBuilder] = useState<string | null>(null);
    
    const availableThemes = themes;
    
    // Gradient builder functions
    const generateGradient = () => {
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'radial') {
        gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'conic') {
        gradient = `conic-gradient(from ${gradientDirection}, ${gradientColors.join(', ')})`;
      }
      return gradient;
    };

    const applyGradientToTarget = (target: string) => {
      const gradient = generateGradient();
      switch (target) {
        case 'color':
          setColorGradient(gradient);
          break;
        case 'textColor':
          setTextColorGradient(gradient);
          break;
        case 'borderColor':
          setBorderColorGradient(gradient);
          break;
      }
      setActiveGradientBuilder(null);
    };

    const addColor = () => {
      setGradientColors([...gradientColors, '#000000']);
    };

    const removeColor = (index: number) => {
      setGradientColors(gradientColors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
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
          {Object.entries(availableThemes).map(([name, theme]) => (
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
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
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
              {Object.entries(availableThemes).map(([name, theme]) => (
                <Button
                  key={name}
                  onClick={() => {
                    console.log('Switching to theme:', name, theme);
                    setCurrentTheme(name);
                  }}
                  variant={currentTheme === name ? 'primary' : 'outline'}
                  size="sm"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Button>
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
              color={colorGradient.trim() || color.trim() || undefined}
              textColor={textColorGradient.trim() || textColor.trim() || undefined}
              borderColor={borderColorGradient.trim() || borderColor.trim() || undefined}
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
                <Dropdown
                  options={[
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Success', value: 'success' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Danger', value: 'danger' },
                    { label: 'Info', value: 'info' },
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' }
                  ]}
                  value={variant}
                  onChange={(value) => setVariant(value as any)}
                  placeholder="Select variant"
                  size="sm"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <Dropdown
                  options={[
                    { label: 'Extra Small', value: 'xs' },
                    { label: 'Small', value: 'sm' },
                    { label: 'Medium', value: 'md' },
                    { label: 'Large', value: 'lg' }
                  ]}
                  value={size}
                  onChange={(value) => setSize(value as any)}
                  placeholder="Select size"
                  size="sm"
                />
              </div>

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Checkbox
                    checked={outlined}
                    onChange={(checked) => setOutlined(checked)}
                    label="Outlined"
                    size="sm"
                  />
                  <Checkbox
                    checked={rounded}
                    onChange={(checked) => setRounded(checked)}
                    label="Rounded"
                    size="sm"
                  />
                  <Checkbox
                    checked={dot}
                    onChange={(checked) => setDot(checked)}
                    label="Dot"
                    size="sm"
                  />
                  <Checkbox
                    checked={removable}
                    onChange={(checked) => setRemovable(checked)}
                    label="Removable"
                    size="sm"
                  />
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
                <Dropdown
                  options={[
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' }
                  ]}
                  value={iconPosition}
                  onChange={(value) => setIconPosition(value as any)}
                  placeholder="Select icon position"
                  size="sm"
                />
              </div>
            </div>

            {/* Gradient Builder Section */}
            <div style={{ 
              background: 'var(--color-background)', 
              border: '1px solid var(--color-border)', 
              borderRadius: '8px', 
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🌈 Advanced Gradient Builder
              </h4>
              
              {/* Gradient Type Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Type:</label>
                <select 
                  value={gradientType} 
                  onChange={(e) => setGradientType(e.target.value)}
                  style={{ 
                    padding: '8px', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)'
                  }}
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                  <option value="conic">Conic</option>
                </select>
                
                <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Direction:</label>
                <input
                  type="text"
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  style={{ 
                    width: '80px', 
                    padding: '8px', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '4px', 
                    fontSize: '14px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)'
                  }}
                  placeholder="90deg"
                />
              </div>
              
              {/* Color Management */}
              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Colors:</label>
                  <button
                    onClick={addColor}
                    style={{
                      padding: '4px 8px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    + Add Color
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                  {gradientColors.map((color, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => updateColor(index, e.target.value)}
                        style={{ width: '40px', height: '30px', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                      />
                      <button
                        onClick={() => removeColor(index)}
                        style={{
                          padding: '2px 6px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '10px'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Gradient Preview */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Preview:</label>
                <div 
                  style={{ 
                    width: '100%', 
                    height: '60px', 
                    background: generateGradient(), 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {generateGradient()}
                </div>
              </div>
              
              {/* Apply to Target */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', color: 'var(--color-text)' }}>Apply to:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  <button
                    onClick={() => applyGradientToTarget('color')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Badge Color
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('textColor')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Text Color
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('borderColor')}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--color-border)',
                      borderRadius: '4px',
                      background: 'var(--color-background)',
                      color: 'var(--color-text)',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    Border Color
                  </button>
                </div>
              </div>
            </div>

            {/* Color Controls Section */}
            <div style={{ 
              background: 'var(--color-background)', 
              border: '1px solid var(--color-border)', 
              borderRadius: '8px', 
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🎨 Color Controls
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {/* Badge Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Badge Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={color || '#0070f3'} 
                      onChange={(e) => setColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={color} 
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g., #ff0000 or red"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      onClick={() => setColor('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Badge Color Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Badge Color Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={colorGradient} 
                      onChange={(e) => setColorGradient(e.target.value)}
                      placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      onClick={() => setColorGradient('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Text Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={textColor || '#ffffff'} 
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={textColor} 
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="e.g., #ff0000 or red"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      onClick={() => setTextColor('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Text Color Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={textColorGradient} 
                      onChange={(e) => setTextColorGradient(e.target.value)}
                      placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      onClick={() => setTextColorGradient('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Border Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={borderColor || '#e5e7eb'} 
                      onChange={(e) => setBorderColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={borderColor} 
                      onChange={(e) => setBorderColor(e.target.value)}
                      placeholder="e.g., #ff0000 or red"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      onClick={() => setBorderColor('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Border Color Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={borderColorGradient} 
                      onChange={(e) => setBorderColorGradient(e.target.value)}
                      placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button 
                      onClick={() => setBorderColorGradient('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setOutlined(false);
                  setRounded(false);
                  setDot(false);
                  setRemovable(false);
                  setIcon('✓');
                  setIconPosition('left');
                  setColor('');
                  setColorGradient('');
                  setTextColor('');
                  setTextColorGradient('');
                  setBorderColor('');
                  setBorderColorGradient('');
                  setGradientType('linear');
                  setGradientDirection('90deg');
                  setGradientColors(['#f43f5e', '#3b82f6']);
                  setActiveGradientBuilder(null);
                }}
                variant="primary"
              >
                Reset to Defaults
              </Button>
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
