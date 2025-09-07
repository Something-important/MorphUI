import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, Button, ThemeProvider, themes } from '../../index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable checkbox component with advanced theming, multiple variants, and comprehensive accessibility features.',
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
      description: 'Callback when checkbox state changes',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant of the checkbox',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the checkbox',
    },
    color: {
      control: 'color',
      description: 'Custom color for the checkbox',
    },
    gradient: {
      control: 'text',
      description: 'Custom gradient for the checkbox',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    labelColor: {
      control: 'color',
      description: 'Custom label color',
    },
    descriptionColor: {
      control: 'color',
      description: 'Custom description color',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'lift', 'glow', 'scale', 'slide'],
      description: 'Hover animation effect',
    },
    rounded: {
      control: 'boolean',
      description: 'Apply rounded corners',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark as invalid',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the checkbox read-only',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate state',
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
type Story = StoryObj<typeof Checkbox>;

// Basic Checkbox
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    description: 'Please read and accept our terms of service',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox variant="primary" label="Primary Checkbox" />
      <Checkbox variant="secondary" label="Secondary Checkbox" />
      <Checkbox variant="success" label="Success Checkbox" />
      <Checkbox variant="warning" label="Warning Checkbox" />
      <Checkbox variant="info" label="Info Checkbox" />
      <Checkbox variant="danger" label="Danger Checkbox" />
      <Checkbox variant="ghost" label="Ghost Checkbox" />
      <Checkbox variant="outline" label="Outline Checkbox" />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="xs" label="Extra Small Checkbox" />
      <Checkbox size="sm" label="Small Checkbox" />
      <Checkbox size="md" label="Medium Checkbox" />
      <Checkbox size="lg" label="Large Checkbox" />
      <Checkbox size="xl" label="Extra Large Checkbox" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Default Checkbox" />
      <Checkbox checked label="Checked Checkbox" />
      <Checkbox indeterminate label="Indeterminate Checkbox" />
      <Checkbox disabled label="Disabled Checkbox" />
      <Checkbox loading label="Loading Checkbox" />
      <Checkbox required label="Required Checkbox" />
      <Checkbox invalid label="Invalid Checkbox" />
      <Checkbox readOnly label="Read Only Checkbox" />
    </div>
  ),
};

// With Descriptions
export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        label="Email notifications"
        description="Receive email updates about your account and orders"
      />
      <Checkbox
        label="SMS notifications"
        description="Get text messages for urgent updates and delivery status"
      />
      <Checkbox
        label="Marketing communications"
        description="Receive promotional offers and product recommendations"
      />
      <Checkbox
        label="Data sharing"
        description="Allow us to share your data with trusted partners for better service"
      />
    </div>
  ),
};

// Interactive Examples
export const InteractiveExamples: Story = {
  render: () => {
    const [checkboxes, setCheckboxes] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const handleToggle = (key: keyof typeof checkboxes) => {
      setCheckboxes(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          checked={checkboxes.notifications}
          onChange={() => handleToggle('notifications')}
          variant="primary"
          label="Push Notifications"
          description="Receive notifications for important updates"
        />
        <Checkbox
          checked={checkboxes.darkMode}
          onChange={() => handleToggle('darkMode')}
          variant="secondary"
          label="Dark Mode"
          description="Switch to dark theme"
        />
        <Checkbox
          checked={checkboxes.autoSave}
          onChange={() => handleToggle('autoSave')}
          variant="success"
          label="Auto Save"
          description="Automatically save your work"
        />
        <Checkbox
          checked={checkboxes.analytics}
          onChange={() => handleToggle('analytics')}
          variant="info"
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
    const [rounded, setRounded] = useState(false);
    const [bordered, setBordered] = useState(true);
    const [hoverEffect, setHoverEffect] = useState<'none' | 'lift' | 'glow' | 'scale' | 'slide'>('lift');
    
    // Color and gradient states
    const [color, setColor] = useState('');
    const [colorGradient, setColorGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [textColorGradient, setTextColorGradient] = useState('');
    const [borderColor, setBorderColor] = useState('');
    const [borderColorGradient, setBorderColorGradient] = useState('');
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundColorGradient, setBackgroundColorGradient] = useState('');
    const [labelColor, setLabelColor] = useState('');
    const [labelColorGradient, setLabelColorGradient] = useState('');
    const [descriptionColor, setDescriptionColor] = useState('');
    const [descriptionColorGradient, setDescriptionColorGradient] = useState('');
    
    // Advanced gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
    const availableThemes = themes;
    
    const applyTheme = (themeName: string) => {
      const theme = availableThemes[themeName as keyof typeof availableThemes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, String(value));
        });
        setCurrentTheme(themeName);
      }
    };
    
    // Helper functions
    const generateGradient = () => {
      if (gradientColors.length < 2) return '';
      const colors = gradientColors.join(', ');
      
      if (gradientType === 'linear') {
        return `linear-gradient(${gradientDirection}, ${colors})`;
      } else if (gradientType === 'radial') {
        // For radial gradients, direction should be like "circle at center" or "ellipse at top left"
        const direction = gradientDirection || 'circle at center';
        return `radial-gradient(${direction}, ${colors})`;
      } else if (gradientType === 'conic') {
        // For conic gradients, direction should be like "from 0deg at center"
        const direction = gradientDirection || 'from 0deg at center';
        return `conic-gradient(${direction}, ${colors})`;
      }
      
      return '';
    };
    
    const applyGradientToTarget = (target: 'color' | 'textColor' | 'borderColor' | 'backgroundColor' | 'labelColor' | 'descriptionColor') => {
      const gradient = generateGradient();
      if (target === 'color') {
        setColorGradient(gradient);
      } else if (target === 'textColor') {
        setTextColorGradient(gradient);
      } else if (target === 'borderColor') {
        setBorderColorGradient(gradient);
      } else if (target === 'backgroundColor') {
        setBackgroundColorGradient(gradient);
      } else if (target === 'labelColor') {
        setLabelColorGradient(gradient);
      } else if (target === 'descriptionColor') {
        setDescriptionColorGradient(gradient);
      }
    };
    
    const resetCustomStyling = () => {
      setColor('');
      setColorGradient('');
      setTextColor('');
      setTextColorGradient('');
      setBorderColor('');
      setBorderColorGradient('');
      setBackgroundColor('');
      setBackgroundColorGradient('');
      setLabelColor('');
      setLabelColorGradient('');
      setDescriptionColor('');
      setDescriptionColorGradient('');
      setGradientType('linear');
      setGradientDirection('90deg');
      setGradientColors(['#f43f5e', '#3b82f6']);
    };

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
                  onClick={() => applyTheme(name)}
                  variant={currentTheme === name ? 'primary' : 'outline'}
                  size="sm"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Themed Checkbox Preview */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Checkbox</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This checkbox automatically adapts to the selected theme!
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <Checkbox
                checked={isChecked}
                variant={variant}
                size={size}
                color={colorGradient.trim() || color.trim() || undefined}
                gradient={colorGradient.trim() || undefined}
                textColor={textColorGradient.trim() || textColor.trim() || undefined}
                borderColor={borderColorGradient.trim() || borderColor.trim() || undefined}
                backgroundColor={backgroundColorGradient.trim() || backgroundColor.trim() || undefined}
                labelColor={labelColorGradient.trim() || labelColor.trim() || undefined}
                descriptionColor={descriptionColorGradient.trim() || descriptionColor.trim() || undefined}
                label={`Customizable Checkbox (${isChecked ? 'checked' : 'unchecked'})`}
                description="Use the controls below to customize this checkbox!"
                rounded={rounded}
                bordered={bordered}
                hoverEffect={hoverEffect}
                onChange={(checked) => {
                  console.log('Customizable checkbox clicked:', checked);
                  setIsChecked(checked);
                }}
              />
            </div>
          </div>

          {/* Checkbox Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Checkbox Customization</h3>
            
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

              {/* Hover Effect Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Hover Effect:</label>
                <select 
                  value={hoverEffect} 
                  onChange={(e) => setHoverEffect(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="none">None</option>
                  <option value="lift">Lift</option>
                  <option value="glow">Glow</option>
                  <option value="scale">Scale</option>
                  <option value="slide">Slide</option>
                </select>
              </div>

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
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
                      checked={bordered} 
                      onChange={(e) => setBordered(e.target.checked)}
                    />
                    Bordered
                  </label>
                </div>
              </div>
            </div>

            {/* Color Controls */}
            <div style={{ 
              background: 'var(--color-background-secondary)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid var(--color-border)',
              marginTop: '20px'
            }}>
              <h4 style={{ margin: '0 0 16px 0', color: 'var(--color-text)', fontSize: '16px', fontWeight: '600' }}>🎨 Color Customization</h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                {/* Background Color */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Background Color:</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={backgroundColor || '#ffffff'}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="e.g., #ffffff"
                      style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                    />
                    <button
                      onClick={() => setBackgroundColor('')}
                      style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Reset
                    </button>
                  </div>
                  <input
                    type="text"
                    value={backgroundColorGradient}
                    onChange={(e) => setBackgroundColorGradient(e.target.value)}
                    placeholder="Background gradient: e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)', marginTop: '4px' }}
                  />
                </div>
                
                {/* Border Color */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Border Color:</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={borderColor || '#d1d5db'}
                      onChange={(e) => setBorderColor(e.target.value)}
                      style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      placeholder="e.g., #d1d5db"
                      style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                    />
                    <button
                      onClick={() => setBorderColor('')}
                      style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Reset
                    </button>
                  </div>
                  <input
                    type="text"
                    value={borderColorGradient}
                    onChange={(e) => setBorderColorGradient(e.target.value)}
                    placeholder="Border gradient: e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)', marginTop: '4px' }}
                  />
                </div>
                
                {/* Label Color */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Label Color:</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={labelColor || '#111827'}
                      onChange={(e) => setLabelColor(e.target.value)}
                      style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={labelColor}
                      onChange={(e) => setLabelColor(e.target.value)}
                      placeholder="e.g., #111827"
                      style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                    />
                    <button
                      onClick={() => setLabelColor('')}
                      style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Reset
                    </button>
                  </div>
                  <input
                    type="text"
                    value={labelColorGradient}
                    onChange={(e) => setLabelColorGradient(e.target.value)}
                    placeholder="Label gradient: e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)', marginTop: '4px' }}
                  />
                </div>
                
                {/* Description Color */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Description Color:</label>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={descriptionColor || '#4b5563'}
                      onChange={(e) => setDescriptionColor(e.target.value)}
                      style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={descriptionColor}
                      onChange={(e) => setDescriptionColor(e.target.value)}
                      placeholder="e.g., #4b5563"
                      style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                    />
                    <button
                      onClick={() => setDescriptionColor('')}
                      style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                    >
                      Reset
                    </button>
                  </div>
                  <input
                    type="text"
                    value={descriptionColorGradient}
                    onChange={(e) => setDescriptionColorGradient(e.target.value)}
                    placeholder="Description gradient: e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                    style={{ width: '100%', padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)', marginTop: '4px' }}
                  />
                </div>
              </div>
            </div>

            {/* Advanced Gradient Builder */}
            <div style={{ 
              background: 'var(--color-background-secondary)', 
              padding: '20px', 
              borderRadius: '12px', 
              border: '1px solid var(--color-border)',
              marginTop: '20px'
            }}>
              <h4 style={{ margin: '0 0 16px 0', color: 'var(--color-text)', fontSize: '16px', fontWeight: '600' }}>🎨 Advanced Gradient Builder</h4>
              
              {/* Gradient Type */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Gradient Type:</label>
                <select
                  value={gradientType}
                  onChange={(e) => {
                    const newType = e.target.value;
                    setGradientType(newType);
                    // Set appropriate default direction for each gradient type
                    if (newType === 'linear') {
                      setGradientDirection('90deg');
                    } else if (newType === 'radial') {
                      setGradientDirection('circle at center');
                    } else if (newType === 'conic') {
                      setGradientDirection('from 0deg at center');
                    }
                  }}
                  style={{ 
                    padding: '6px 8px', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '4px', 
                    background: 'var(--color-background)', 
                    color: 'var(--color-text)', 
                    fontSize: '12px',
                    width: '100%'
                  }}
                >
                  <option value="linear">Linear</option>
                  <option value="radial">Radial</option>
                  <option value="conic">Conic</option>
                </select>
              </div>
              
              {/* Gradient Direction */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Direction:</label>
                <input
                  type="text"
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  placeholder={
                    gradientType === 'linear' ? 'e.g., 90deg, to right, to bottom left' :
                    gradientType === 'radial' ? 'e.g., circle at center, ellipse at top left' :
                    'e.g., from 0deg at center, from 45deg at 50% 50%'
                  }
                  style={{ 
                    width: '100%', 
                    padding: '6px 8px', 
                    border: '1px solid var(--color-border)', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    background: 'var(--color-background)', 
                    color: 'var(--color-text)' 
                  }}
                />
              </div>
              
              {/* Gradient Colors */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Colors:</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  {gradientColors.map((color, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => {
                          const newColors = [...gradientColors];
                          newColors[index] = e.target.value;
                          setGradientColors(newColors);
                        }}
                        style={{ width: '24px', height: '24px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      {gradientColors.length > 2 && (
                        <button
                          onClick={() => {
                            const newColors = gradientColors.filter((_, i) => i !== index);
                            setGradientColors(newColors);
                          }}
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
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setGradientColors([...gradientColors, '#000000'])}
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
              </div>
              
              {/* Live Preview */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Live Preview:</label>
                <div
                  style={{
                    width: '100%',
                    height: '40px',
                    background: generateGradient(),
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    marginBottom: '8px'
                  }}
                />
                <code style={{ 
                  fontSize: '10px', 
                  background: 'var(--color-background-secondary)', 
                  padding: '4px 8px', 
                  borderRadius: '4px', 
                  color: 'var(--color-text)',
                  display: 'block',
                  wordBreak: 'break-all'
                }}>
                  {generateGradient()}
                </code>
              </div>
              
              {/* Apply Buttons */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => applyGradientToTarget('backgroundColor')}
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
                  Apply to Background
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
                  Apply to Border
                </button>
                <button
                  onClick={() => applyGradientToTarget('labelColor')}
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
                  Apply to Label
                </button>
                <button
                  onClick={() => applyGradientToTarget('descriptionColor')}
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
                  Apply to Description
                </button>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button 
                onClick={() => {
                  setVariant('primary');
                  setSize('md');
                  setRounded(false);
                  setBordered(true);
                  setHoverEffect('lift');
                  resetCustomStyling();
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
};
