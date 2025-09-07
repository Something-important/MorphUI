import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch, Button, Dropdown, ThemeProvider, themes } from '../../index';

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
    
    const availableThemes = themes;

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
                <Dropdown
                  options={[
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Success', value: 'success' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Info', value: 'info' },
                    { label: 'Danger', value: 'danger' },
                    { label: 'Ghost', value: 'ghost' },
                    { label: 'Outline', value: 'outline' }
                  ]}
                  value={variant}
                  onChange={(value) => setVariant(value as any)}
                  placeholder="Select variant"
                  size="sm"
                />
              </div>

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <Dropdown
                  options={[
                    { label: 'Extra Small', value: 'xs' },
                    { label: 'Small', value: 'sm' },
                    { label: 'Medium', value: 'md' },
                    { label: 'Large', value: 'lg' },
                    { label: 'Extra Large', value: 'xl' }
                  ]}
                  value={size}
                  onChange={(value) => setSize(value as any)}
                  placeholder="Select size"
                  size="sm"
                />
              </div>

              {/* Label Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Label Position:</label>
                <Dropdown
                  options={[
                    { label: 'Left', value: 'left' },
                    { label: 'Right', value: 'right' },
                    { label: 'Top', value: 'top' },
                    { label: 'Bottom', value: 'bottom' }
                  ]}
                  value={labelPosition}
                  onChange={(value) => setLabelPosition(value as any)}
                  placeholder="Select label position"
                  size="sm"
                />
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
              <Button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setLabelPosition('right');
                  setIcon('⚡');
                  setIconPosition('right');
                  setRipple(true);
                  setGlassmorphism(false);
                }}
                variant="primary"
                size="md"
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
