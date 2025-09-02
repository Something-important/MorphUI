import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { ThemeProvider } from '../theme/ThemeProvider';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component with advanced theming and accessibility features.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled usage',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when switch state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the switch read-only',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark as invalid',
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
    label: {
      control: 'text',
      description: 'Switch label',
    },
    description: {
      control: 'text',
      description: 'Additional description',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Label position relative to switch',
    },
    icon: {
      control: 'text',
      description: 'Icon to display',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect',
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
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Inline styles',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

// Basic Switch
export const Default: Story = {
  args: {
    label: 'Toggle me',
    description: 'A simple toggle switch',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch variant="primary" label="Primary Switch" />
      <Switch variant="secondary" label="Secondary Switch" />
      <Switch variant="success" label="Success Switch" />
      <Switch variant="warning" label="Warning Switch" />
      <Switch variant="info" label="Info Switch" />
      <Switch variant="danger" label="Danger Switch" />
      <Switch variant="ghost" label="Ghost Switch" />
      <Switch variant="outline" label="Outline Switch" />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch size="xs" label="Extra Small Switch" />
      <Switch size="sm" label="Small Switch" />
      <Switch size="md" label="Medium Switch" />
      <Switch size="lg" label="Large Switch" />
      <Switch size="xl" label="Extra Large Switch" />
    </div>
  ),
};

// Label Positions
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch labelPosition="left" label="Left Label" />
      <Switch labelPosition="right" label="Right Label" />
      <Switch labelPosition="top" label="Top Label" />
      <Switch labelPosition="bottom" label="Bottom Label" />
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch icon="⚡" iconPosition="left" label="Left Icon Switch" />
      <Switch icon="🔒" iconPosition="right" label="Right Icon Switch" />
      <Switch icon="🌟" iconPosition="left" label="Star Icon Switch" />
      <Switch icon="💡" iconPosition="right" label="Lightbulb Switch" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Default Switch" />
      <Switch checked label="Checked Switch" />
      <Switch disabled label="Disabled Switch" />
      <Switch loading label="Loading Switch" />
      <Switch readOnly label="Read Only Switch" />
      <Switch required label="Required Switch" />
      <Switch invalid label="Invalid Switch" />
    </div>
  ),
};

// Interactive Examples
export const InteractiveExamples: Story = {
  render: () => {
    const [switches, setSwitches] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const handleToggle = (key: keyof typeof switches) => {
      setSwitches(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          checked={switches.notifications}
          onChange={() => handleToggle('notifications')}
          variant="primary"
          icon="🔔"
          label="Push Notifications"
          description="Receive notifications for important updates"
        />
        <Switch
          checked={switches.darkMode}
          onChange={() => handleToggle('darkMode')}
          variant="secondary"
          icon="🌙"
          label="Dark Mode"
          description="Switch to dark theme"
        />
        <Switch
          checked={switches.autoSave}
          onChange={() => handleToggle('autoSave')}
          variant="success"
          icon="💾"
          label="Auto Save"
          description="Automatically save your work"
        />
        <Switch
          checked={switches.analytics}
          onChange={() => handleToggle('analytics')}
          variant="info"
          icon="📊"
          label="Analytics"
          description="Help us improve by sharing usage data"
        />
      </div>
    );
  },
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [isChecked, setIsChecked] = useState(false);
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [labelPosition, setLabelPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
    const [icon, setIcon] = useState('⚡');
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');
    const [ripple, setRipple] = useState(true);
    const [glassmorphism, setGlassmorphism] = useState(false);
    
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

          {/* Themed Switch Preview */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Switch</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This switch automatically adapts to the selected theme!
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <Switch
                checked={isChecked}
                variant={variant}
                size={size}
                label={`Customizable Switch (${isChecked ? 'on' : 'off'})`}
                description="Use the controls below to customize this switch!"
                labelPosition={labelPosition}
                icon={icon}
                iconPosition={iconPosition}
                ripple={ripple}
                glassmorphism={glassmorphism}
                onChange={(checked) => {
                  console.log('Customizable switch clicked:', checked);
                  setIsChecked(checked);
                }}
              />
            </div>
          </div>

          {/* Switch Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Switch Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
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
                  <option value="info">Info</option>
                  <option value="danger">Danger</option>
                  <option value="ghost">Ghost</option>
                  <option value="outline">Outline</option>
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
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>

              {/* Label Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Label Position:</label>
                <select 
                  value={labelPosition} 
                  onChange={(e) => setLabelPosition(e.target.value as any)}
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
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                </select>
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

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={ripple} 
                      onChange={(e) => setRipple(e.target.checked)}
                    />
                    Ripple Effect
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={glassmorphism} 
                      onChange={(e) => setGlassmorphism(e.target.checked)}
                    />
                    Glassmorphism
                  </label>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setLabelPosition('right');
                  setIcon('⚡');
                  setIconPosition('right');
                  setRipple(true);
                  setGlassmorphism(false);
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
