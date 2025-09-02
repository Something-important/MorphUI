// Toggle.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle } from './Toggle';
import { ThemeProvider } from '../theme/ThemeProvider';

// Mock icons for stories
const PowerIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path>
    <line x1="12" y1="2" x2="12" y2="12"></line>
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const WifiIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
    <line x1="12" y1="20" x2="12.01" y2="20"></line>
  </svg>
);

const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

export default {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A customizable toggle/switch component with support for variants, sizes, colors, gradients, loading states, icons, ripple effects, and advanced theming.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    labelPosition: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    ripple: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'text' },
    },
    gradient: {
      control: { type: 'text' },
    },
    textColor: {
      control: { type: 'text' },
    },
    borderColor: {
      control: { type: 'text' },
    },
    borderRadius: {
      control: { type: 'text' },
    },
    backdropBlur: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider>
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

type Story = StoryObj<typeof Toggle>;

export const Basic: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Toggle
        checked={checked}
        onChange={setChecked}
        label="Basic Toggle"
      />
    );
  },
};

export const AllVariants: Story = {
  render: () => {
    const [states, setStates] = useState({
      primary: false,
      secondary: false,
      success: false,
      warning: false,
      danger: false,
      info: false,
      ghost: false,
      outline: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>All Variants</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            variant="primary"
            checked={states.primary}
            onChange={handleChange('primary')}
            label="Primary"
          />
          <Toggle
            variant="secondary"
            checked={states.secondary}
            onChange={handleChange('secondary')}
            label="Secondary"
          />
          <Toggle
            variant="success"
            checked={states.success}
            onChange={handleChange('success')}
            label="Success"
          />
          <Toggle
            variant="warning"
            checked={states.warning}
            onChange={handleChange('warning')}
            label="Warning"
          />
          <Toggle
            variant="danger"
            checked={states.danger}
            onChange={handleChange('danger')}
            label="Danger"
          />
          <Toggle
            variant="info"
            checked={states.info}
            onChange={handleChange('info')}
            label="Info"
          />
          <Toggle
            variant="ghost"
            checked={states.ghost}
            onChange={handleChange('ghost')}
            label="Ghost"
          />
          <Toggle
            variant="outline"
            checked={states.outline}
            onChange={handleChange('outline')}
            label="Outline"
          />
        </div>
      </div>
    );
  },
};

export const AllSizes: Story = {
  render: () => {
    const [states, setStates] = useState({
      sm: false,
      md: false,
      lg: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>All Sizes</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            size="sm"
            checked={states.sm}
            onChange={handleChange('sm')}
            label="Small"
          />
          <Toggle
            size="md"
            checked={states.md}
            onChange={handleChange('md')}
            label="Medium"
          />
          <Toggle
            size="lg"
            checked={states.lg}
            onChange={handleChange('lg')}
            label="Large"
          />
        </div>
      </div>
    );
  },
};

export const LabelPositions: Story = {
  render: () => {
    const [states, setStates] = useState({
      left: false,
      right: false,
      top: false,
      bottom: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Label Positions</h3>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Toggle
            labelPosition="left"
            checked={states.left}
            onChange={handleChange('left')}
            label="Left Label"
          />
          <Toggle
            labelPosition="right"
            checked={states.right}
            onChange={handleChange('right')}
            label="Right Label"
          />
        </div>
        
        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Toggle
            labelPosition="top"
            checked={states.top}
            onChange={handleChange('top')}
            label="Top Label"
          />
          <Toggle
            labelPosition="bottom"
            checked={states.bottom}
            onChange={handleChange('bottom')}
            label="Bottom Label"
          />
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  render: () => {
    const [states, setStates] = useState({
      power: false,
      bell: false,
      wifi: false,
      moon: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>With Icons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            icon={<PowerIcon />}
            iconPosition="left"
            checked={states.power}
            onChange={handleChange('power')}
            label="Power"
          />
          <Toggle
            icon={<BellIcon />}
            iconPosition="right"
            checked={states.bell}
            onChange={handleChange('bell')}
            label="Notifications"
          />
          <Toggle
            icon={<WifiIcon />}
            iconPosition="left"
            checked={states.wifi}
            onChange={handleChange('wifi')}
            label="WiFi"
          />
          <Toggle
            icon={<MoonIcon />}
            iconPosition="right"
            checked={states.moon}
            onChange={handleChange('moon')}
            label="Dark Mode"
          />
        </div>
      </div>
    );
  },
};

export const ShadowLevels: Story = {
  render: () => {
    const [states, setStates] = useState({
      none: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Shadow Levels</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            shadow="none"
            checked={states.none}
            onChange={handleChange('none')}
            label="No Shadow"
          />
          <Toggle
            shadow="sm"
            checked={states.sm}
            onChange={handleChange('sm')}
            label="Small Shadow"
          />
          <Toggle
            shadow="md"
            checked={states.md}
            onChange={handleChange('md')}
            label="Medium Shadow"
          />
          <Toggle
            shadow="lg"
            checked={states.lg}
            onChange={handleChange('lg')}
            label="Large Shadow"
          />
          <Toggle
            shadow="xl"
            checked={states.xl}
            onChange={handleChange('xl')}
            label="Extra Large Shadow"
          />
        </div>
      </div>
    );
  },
};

export const LoadingStates: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = useState({
      primary: false,
      success: false,
      warning: false,
      danger: false,
    });

    const handleToggle = (key: string) => () => {
      setLoadingStates(prev => ({ ...prev, [key]: true }));
      // Simulate async operation
      setTimeout(() => {
        setLoadingStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Loading States</h3>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            variant="primary"
            loading={loadingStates.primary}
            label="Primary Loading"
          />
          <Toggle
            variant="success"
            loading={loadingStates.success}
            label="Success Loading"
          />
          <Toggle
            variant="warning"
            loading={loadingStates.warning}
            label="Warning Loading"
          />
          <Toggle
            variant="danger"
            loading={loadingStates.danger}
            label="Danger Loading"
          />
        </div>
        
        <p style={{ fontSize: '12px', color: '#666', margin: '0', fontStyle: 'italic' }}>
          💡 Click any toggle to see the loading state for 2 seconds
        </p>
      </div>
    );
  },
};

export const DisabledStates: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Disabled States</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            disabled
            label="Disabled Primary"
          />
          <Toggle
            variant="secondary"
            disabled
            label="Disabled Secondary"
          />
          <Toggle
            variant="success"
            disabled
            label="Disabled Success"
          />
          <Toggle
            variant="warning"
            disabled
            label="Disabled Warning"
          />
          <Toggle
            variant="danger"
            disabled
            label="Disabled Danger"
          />
          <Toggle
            variant="info"
            disabled
            label="Disabled Info"
          />
        </div>
      </div>
    );
  },
};

export const CustomColors: Story = {
  render: () => {
    const [states, setStates] = useState({
      custom1: false,
      custom2: false,
      custom3: false,
      custom4: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Custom Colors</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            color="#10b981"
            checked={states.custom1}
            onChange={handleChange('custom1')}
            label="Custom Green"
          />
          <Toggle
            color="#f59e0b"
            checked={states.custom2}
            onChange={handleChange('custom2')}
            label="Custom Orange"
          />
          <Toggle
            color="#8b5cf6"
            checked={states.custom3}
            onChange={handleChange('custom3')}
            label="Custom Purple"
          />
          <Toggle
            color="#ec4899"
            checked={states.custom4}
            onChange={handleChange('custom4')}
            label="Custom Pink"
          />
        </div>
      </div>
    );
  },
};

export const Gradients: Story = {
  render: () => {
    const [states, setStates] = useState({
      gradient1: false,
      gradient2: false,
      gradient3: false,
      gradient4: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Gradients</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            gradient="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
            checked={states.gradient1}
            onChange={handleChange('gradient1')}
            label="Red to Blue"
          />
          <Toggle
            gradient="linear-gradient(90deg, #10b981 0%, #3b82f6 100%)"
            checked={states.gradient2}
            onChange={handleChange('gradient2')}
            label="Green to Blue"
          />
          <Toggle
            gradient="linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)"
            checked={states.gradient3}
            onChange={handleChange('gradient3')}
            label="Orange to Pink"
          />
          <Toggle
            gradient="linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)"
            checked={states.gradient4}
            onChange={handleChange('gradient4')}
            label="Purple to Cyan"
          />
        </div>
      </div>
    );
  },
};

export const ThemeIntegration: Story = {
  render: () => {
    const [states, setStates] = useState({
      theme1: false,
      theme2: false,
      theme3: false,
      theme4: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Theme Integration</h3>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Using Theme Keys</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <Toggle
              color="color-success"
              checked={states.theme1}
              onChange={handleChange('theme1')}
              label="Theme Success"
            />
            <Toggle
              color="color-warning"
              checked={states.theme2}
              onChange={handleChange('theme2')}
              label="Theme Warning"
            />
            <Toggle
              color="color-info"
              checked={states.theme3}
              onChange={handleChange('theme3')}
              label="Theme Info"
            />
            <Toggle
              gradient="gradient-primary"
              checked={states.theme4}
              onChange={handleChange('theme4')}
              label="Theme Gradient"
            />
          </div>
        </div>
        
        <div>
          <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>Using CSS Variables</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <Toggle
              color="--color-success"
              checked={states.theme1}
              onChange={handleChange('theme1')}
              label="CSS Variable Success"
            />
            <Toggle
              color="--color-warning"
              checked={states.theme2}
              onChange={handleChange('theme2')}
              label="CSS Variable Warning"
            />
            <Toggle
              gradient="--gradient-primary"
              checked={states.theme4}
              onChange={handleChange('theme4')}
              label="CSS Variable Gradient"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const RippleEffects: Story = {
  render: () => {
    const [states, setStates] = useState({
      ripple1: false,
      ripple2: false,
      ripple3: false,
      ripple4: false,
    });

    const handleChange = (key: string) => (checked: boolean) => {
      setStates(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Ripple Effects</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>
          Click any toggle below to see the Material Design-style ripple effect! The ripple appears where you click and spreads outward.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            ripple
            checked={states.ripple1}
            onChange={handleChange('ripple1')}
            label="Primary Ripple"
          />
          <Toggle
            ripple
            variant="success"
            checked={states.ripple2}
            onChange={handleChange('ripple2')}
            label="Success Ripple"
          />
          <Toggle
            ripple
            variant="warning"
            checked={states.ripple3}
            onChange={handleChange('ripple3')}
            label="Warning Ripple"
          />
          <Toggle
            ripple
            variant="danger"
            checked={states.ripple4}
            onChange={handleChange('ripple4')}
            label="Danger Ripple"
          />
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
          <Toggle
            ripple
            checked={states.ripple1}
            onChange={handleChange('ripple1')}
            label="Rounded Ripple"
          />
          <Toggle
            ripple
            shadow="lg"
            checked={states.ripple2}
            onChange={handleChange('ripple2')}
            label="Shadow + Ripple"
          />
          <Toggle
            ripple
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            checked={states.ripple3}
            onChange={handleChange('ripple3')}
            label="Gradient Ripple"
          />
        </div>
      </div>
    );
  },
};

export const InteractivePlayground: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [ripple, setRipple] = useState(false);
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [label, setLabel] = useState('Interactive Toggle');
    const [labelPosition, setLabelPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
    const [icon, setIcon] = useState<boolean>(false);
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('left');

    const handleToggle = () => {
      if (loading) return;
      setChecked(!checked);
    };

    const simulateLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>🎮 Interactive Playground</h3>
          
          {/* Controls */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '16px',
            marginBottom: '24px',
            padding: '16px',
            background: '#f8fafc',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Variant:</label>
              <select 
                value={variant} 
                onChange={(e) => setVariant(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
                <option value="info">Info</option>
                <option value="ghost">Ghost</option>
                <option value="outline">Outline</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Size:</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Shadow:</label>
              <select 
                value={shadow} 
                onChange={(e) => setShadow(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Label Position:</label>
              <select 
                value={labelPosition} 
                onChange={(e) => setLabelPosition(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Icon Position:</label>
              <select 
                value={iconPosition} 
                onChange={(e) => setIconPosition(e.target.value as any)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Label Text:</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                placeholder="Enter label text..."
              />
            </div>
          </div>
          
          {/* Checkboxes */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
            gap: '12px',
            marginBottom: '24px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={ripple}
                onChange={(e) => setRipple(e.target.checked)}
              />
              Ripple Effect
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={loading}
                onChange={(e) => setLoading(e.target.checked)}
              />
              Loading State
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={disabled}
                onChange={(e) => setDisabled(e.target.checked)}
              />
              Disabled
            </label>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={icon}
                onChange={(e) => setIcon(e.target.checked)}
              />
              Show Icon
            </label>
          </div>
          
          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button
              onClick={simulateLoading}
              disabled={loading}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#0070f3',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              {loading ? 'Loading...' : 'Simulate Loading'}
            </button>
            
            <button
              onClick={() => setChecked(!checked)}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#fff',
                color: '#333',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Toggle State
            </button>
          </div>
        </div>
        
        {/* Preview */}
        <div style={{ 
          padding: '24px', 
          background: '#fff', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Preview</h4>
          <Toggle
            variant={variant}
            size={size}
            shadow={shadow}
            ripple={ripple}
            loading={loading}
            disabled={disabled}
            label={label}
            labelPosition={labelPosition}
            icon={icon ? (iconPosition === 'left' ? <PowerIcon /> : <BellIcon />) : undefined}
            iconPosition={iconPosition}
            checked={checked}
            onChange={handleToggle}
          />
          
          <div style={{ marginTop: '16px', fontSize: '14px', color: '#666' }}>
            Current State: <strong>{checked ? 'ON' : 'OFF'}</strong>
          </div>
        </div>
      </div>
    );
  },
};

export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [customColor, setCustomColor] = useState('#10b981');
    const [customGradient, setCustomGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
    const themes: Record<string, Record<string, string>> = {
      default: {
        '--color-primary': '#0070f3',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#6b7280',
        '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '--gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      dark: {
        '--color-primary': '#3b82f6',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#9ca3af',
        '--gradient-primary': 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
        '--gradient-success': 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
      },
      warm: {
        '--color-primary': '#f97316',
        '--color-success': '#f59e0b',
        '--color-warning': '#dc2626',
        '--color-danger': '#b91c1c',
        '--color-info': '#f97316',
        '--color-secondary': '#f59e0b',
        '--gradient-primary': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        '--gradient-success': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      },
      cool: {
        '--color-primary': '#06b6d4',
        '--color-success': '#3b82f6',
        '--color-warning': '#8b5cf6',
        '--color-danger': '#ec4899',
        '--color-info': '#06b6d4',
        '--color-secondary': '#3b82f6',
        '--gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        '--gradient-success': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      }
    };
    
    const applyTheme = (themeName: string) => {
      const theme = themes[themeName as keyof typeof themes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        setCurrentTheme(themeName);
      }
    };

    const generateGradient = () => {
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'radial') {
        gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'conic') {
        gradient = `conic-gradient(from ${gradientDirection}, ${gradientColors.join(', ')})`;
      }
      setCustomGradient(gradient);
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
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Theme Switcher</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Object.keys(themes).map(themeName => (
              <button
                key={themeName}
                onClick={() => applyTheme(themeName)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  background: currentTheme === themeName ? '#0070f3' : '#fff',
                  color: currentTheme === themeName ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            Current theme: <strong>{currentTheme}</strong> - Click theme buttons to see all toggles change colors!
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎯 Theme Toggles (These Change with Theme!)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <Toggle variant="primary" label="Primary" />
            <Toggle variant="secondary" label="Secondary" />
            <Toggle variant="success" label="Success" />
            <Toggle variant="warning" label="Warning" />
            <Toggle variant="danger" label="Danger" />
            <Toggle variant="info" label="Info" />
            <Toggle gradient="gradient-primary" label="Primary Gradient" />
            <Toggle gradient="gradient-success" label="Success Gradient" />
          </div>
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
            💡 Try switching themes above - these toggles will change colors automatically!
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🔧 Advanced Gradient Builder</h3>
          
          {/* Gradient Type Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', minWidth: '80px' }}>Type:</label>
            <select 
              value={gradientType} 
              onChange={(e) => setGradientType(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
              <option value="conic">Conic</option>
            </select>
            
            <label style={{ fontSize: '14px', minWidth: '80px' }}>Direction:</label>
            <input
              type="text"
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
              style={{ width: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="90deg"
            />
          </div>
          
          {/* Color Management */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Colors:</label>
              <button
                onClick={addColor}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#fff',
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
                    style={{ width: '40px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                  />
                  <button
                    onClick={() => removeColor(index)}
                    style={{
                      padding: '2px 6px',
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      background: '#fff',
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
          
          {/* Generate Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={generateGradient}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#0070f3',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Generate Gradient
            </button>
          </div>
          
          {/* Custom Gradient Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Custom Gradient:</label>
            <input
              type="text"
              value={customGradient}
              onChange={(e) => setCustomGradient(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
            />
          </div>
          
          {/* Gradient Preview */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preview:</label>
            <div 
              style={{ 
                width: '100%', 
                height: '60px', 
                background: customGradient, 
                border: '1px solid #ddd', 
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontSize: '12px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
              }}
            >
              {customGradient}
            </div>
          </div>
          
          {/* Generated Toggles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Toggle gradient={customGradient} label="Custom Gradient" />
            <Toggle gradient={customGradient} shadow="lg" label="With Shadow" />
            <Toggle gradient={customGradient} ripple label="With Ripple" />
            <Toggle gradient={customGradient} shadow="xl" ripple label="All Effects" />
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Custom Color Builder</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Custom Color:</label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ width: '50px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>{customColor}</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Toggle color={customColor} label="Custom Color" />
            <Toggle color={customColor} textColor="#ffffff" label="Custom + White Text" />
            <Toggle color={customColor} shadow="lg" label="Custom + Effects" />
          </div>
        </div>
      </div>
    );
  },
};

export const RealWorldExamples: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      darkMode: false,
      wifi: true,
      bluetooth: false,
      location: true,
      autoUpdate: false,
    });

    const handleSettingChange = (key: string) => (checked: boolean) => {
      setSettings(prev => ({ ...prev, [key]: checked }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>🌍 Real-World Examples</h3>
        
        {/* Settings Panel */}
        <div style={{ 
          padding: '20px', 
          background: '#f8fafc', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          maxWidth: '400px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Device Settings</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Push Notifications</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Receive alerts and updates</div>
              </div>
              <Toggle
                checked={settings.notifications}
                onChange={handleSettingChange('notifications')}
                variant="primary"
                size="sm"
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Dark Mode</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Use dark theme</div>
              </div>
              <Toggle
                checked={settings.darkMode}
                onChange={handleSettingChange('darkMode')}
                variant="secondary"
                size="sm"
                icon={<MoonIcon />}
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>WiFi</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Connect to wireless networks</div>
              </div>
              <Toggle
                checked={settings.wifi}
                onChange={handleSettingChange('wifi')}
                variant="success"
                size="sm"
                icon={<WifiIcon />}
                label=""
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Bluetooth</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Connect to nearby devices</div>
              </div>
              <Toggle
                checked={settings.bluetooth}
                onChange={handleSettingChange('bluetooth')}
                variant="info"
                size="sm"
                label=""
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Location Services</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Allow apps to access location</div>
              </div>
              <Toggle
                checked={settings.location}
                onChange={handleSettingChange('location')}
                variant="warning"
                size="sm"
                label=""
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>Auto Updates</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Automatically install updates</div>
              </div>
              <Toggle
                checked={settings.autoUpdate}
                onChange={handleSettingChange('autoUpdate')}
                variant="danger"
                size="sm"
                label=""
              />
            </div>
          </div>
        </div>
        
        {/* Feature Toggles */}
        <div style={{ 
          padding: '20px', 
          background: '#f8fafc', 
          borderRadius: '8px', 
          border: '1px solid #e2e8f0',
          maxWidth: '400px'
        }}>
          <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>Feature Flags</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Toggle
              label="Beta Features"
              labelPosition="left"
              variant="outline"
              size="sm"
            />
            <Toggle
              label="Analytics"
              labelPosition="left"
              variant="outline"
              size="sm"
            />
            <Toggle
              label="Debug Mode"
              labelPosition="left"
              variant="outline"
              size="sm"
            />
            <Toggle
              label="Experimental UI"
              labelPosition="left"
              variant="outline"
              size="sm"
            />
          </div>
        </div>
      </div>
    );
  },
};
