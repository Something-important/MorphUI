// Toggle.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toggle, Button, Dropdown, ThemeProvider, themes } from '../../index';

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
              <Dropdown
                options={[
                  { label: 'Primary', value: 'primary' },
                  { label: 'Secondary', value: 'secondary' },
                  { label: 'Success', value: 'success' },
                  { label: 'Warning', value: 'warning' },
                  { label: 'Danger', value: 'danger' },
                  { label: 'Info', value: 'info' },
                  { label: 'Ghost', value: 'ghost' },
                  { label: 'Outline', value: 'outline' }
                ]}
                value={variant}
                onChange={(value) => setVariant(value as any)}
                placeholder="Select variant"
                size="sm"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Size:</label>
              <Dropdown
                options={[
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
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Shadow:</label>
              <Dropdown
                options={[
                  { label: 'None', value: 'none' },
                  { label: 'Small', value: 'sm' },
                  { label: 'Medium', value: 'md' },
                  { label: 'Large', value: 'lg' },
                  { label: 'Extra Large', value: 'xl' }
                ]}
                value={shadow}
                onChange={(value) => setShadow(value as any)}
                placeholder="Select shadow"
                size="sm"
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Label Position:</label>
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
            
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500' }}>Icon Position:</label>
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
            <Button
              onClick={simulateLoading}
              disabled={loading}
              variant="primary"
              size="sm"
            >
              {loading ? 'Loading...' : 'Simulate Loading'}
            </Button>
            
            <Button
              onClick={() => setChecked(!checked)}
              variant="outline"
              size="sm"
            >
              Toggle State
            </Button>
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
    // Theme management
    const [currentTheme, setCurrentTheme] = useState('default');
    const availableThemes = themes;
    
    // Comprehensive color state management
    const [trackColor, setTrackColor] = useState('');
    const [trackGradient, setTrackGradient] = useState('');
    const [activeTrackColor, setActiveTrackColor] = useState('');
    const [activeTrackGradient, setActiveTrackGradient] = useState('');
    const [thumbColor, setThumbColor] = useState('');
    const [thumbGradient, setThumbGradient] = useState('');
    const [activeThumbColor, setActiveThumbColor] = useState('');
    const [activeThumbGradient, setActiveThumbGradient] = useState('');
    const [labelColor, setLabelColor] = useState('');
    const [labelGradient, setLabelGradient] = useState('');
    const [iconColor, setIconColor] = useState('');
    const [iconGradient, setIconGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [borderColor, setBorderColor] = useState('');
    
    // Effect states
    const [animated, setAnimated] = useState(false);
    const [glassmorphism, setGlassmorphism] = useState(false);
    const [ripple, setRipple] = useState(false);
    
    // Gradient builder state
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [generatedGradient, setGeneratedGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    
    // Collapsible sections
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
    
    const handleThemeChange = (themeName: string) => {
      setCurrentTheme(themeName);
    };

    const toggleSection = (section: string) => {
      setCollapsedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };

    const generateGradient = () => {
      if (gradientColors.length < 2) return;
      const colors = gradientColors.join(', ');
      
      if (gradientType === 'linear') {
        setGeneratedGradient(`linear-gradient(${gradientDirection}, ${colors})`);
      } else if (gradientType === 'radial') {
        const direction = gradientDirection || 'circle at center';
        setGeneratedGradient(`radial-gradient(${direction}, ${colors})`);
      } else if (gradientType === 'conic') {
        const direction = gradientDirection || 'from 0deg at center';
        setGeneratedGradient(`conic-gradient(${direction}, ${colors})`);
      }
    };

    const applyGradientToTarget = (target: string) => {
      switch (target) {
        case 'track':
          setTrackGradient(generatedGradient);
          break;
        case 'activeTrack':
          setActiveTrackGradient(generatedGradient);
          break;
        case 'thumb':
          setThumbGradient(generatedGradient);
          break;
        case 'activeThumb':
          setActiveThumbGradient(generatedGradient);
          break;
        case 'label':
          setLabelGradient(generatedGradient);
          break;
        case 'icon':
          setIconGradient(generatedGradient);
          break;
        case 'text':
          setTextColor(generatedGradient);
          break;
        case 'border':
          setBorderColor(generatedGradient);
          break;
      }
    };

    const resetCustomStyling = () => {
      setTrackColor('');
      setTrackGradient('');
      setActiveTrackColor('');
      setActiveTrackGradient('');
      setThumbColor('');
      setThumbGradient('');
      setActiveThumbColor('');
      setActiveThumbGradient('');
      setLabelColor('');
      setLabelGradient('');
      setIconColor('');
      setIconGradient('');
      setTextColor('');
      setBorderColor('');
      setAnimated(false);
      setGlassmorphism(false);
      setRipple(false);
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

    const getGradientPlaceholder = (type: string) => {
      switch (type) {
        case 'linear': return 'e.g., 90deg, to right, to bottom left';
        case 'radial': return 'e.g., circle at center, ellipse at top left';
        case 'conic': return 'e.g., from 0deg at center, from 45deg at 50% 50%';
        default: return 'e.g., 90deg, to right, circle at center';
      }
    };
    
    return (
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Theme Switcher - Always at the top */}
          <div>
            <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>🎨 Theme Switcher</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {Object.keys(availableThemes).map(themeName => (
                <Button
                  key={themeName}
                  onClick={() => handleThemeChange(themeName)}
                  variant={currentTheme === themeName ? 'primary' : 'outline'}
                  size="sm"
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </Button>
              ))}
            </div>
            <p style={{ fontSize: '14px', color: 'var(--color-text-secondary, #6b7280)', margin: 0 }}>
              Current theme: <strong style={{ color: 'var(--color-primary, #0070f3)' }}>{currentTheme}</strong> - Click theme buttons to see all toggles change colors!
            </p>
          </div>

          {/* Main Interactive Theme Builder - Collapsible */}
          <div style={{ border: '1px solid var(--color-border, #d1d5db)', borderRadius: '8px', padding: '16px' }}>
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                cursor: 'pointer',
                marginBottom: collapsedSections.main ? '0' : '16px'
              }}
              onClick={() => toggleSection('main')}
            >
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>
                🎯 Interactive Theme Builder
              </h3>
              <span style={{ fontSize: '20px', color: 'var(--color-text-secondary, #6b7280)' }}>
                {collapsedSections.main ? '▼' : '▲'}
              </span>
            </div>
            
            {!collapsedSections.main && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Live Preview Section */}
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>
                    🎯 Theme Toggles (These Change with Theme!)
                  </h4>
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
                  <p style={{ fontSize: '12px', color: 'var(--color-text-secondary, #6b7280)', margin: '8px 0 0 0', fontStyle: 'italic' }}>
                    💡 Try switching themes above - these toggles will change colors automatically!
                  </p>
                </div>

                {/* Custom Styled Toggle */}
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>
                    🎨 Custom Styled Toggle
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                    <Toggle
                      trackColor={trackColor}
                      trackGradient={trackGradient}
                      activeTrackColor={activeTrackColor}
                      activeTrackGradient={activeTrackGradient}
                      thumbColor={thumbColor}
                      thumbGradient={thumbGradient}
                      activeThumbColor={activeThumbColor}
                      activeThumbGradient={activeThumbGradient}
                      labelColor={labelColor}
                      labelGradient={labelGradient}
                      iconColor={iconColor}
                      iconGradient={iconGradient}
                      textColor={textColor}
                      borderColor={borderColor}
                      ripple={ripple}
                      label="Custom Styled Toggle"
                      icon={<PowerIcon />}
                    />
                    <Toggle
                      trackColor={trackColor}
                      trackGradient={trackGradient}
                      activeTrackColor={activeTrackColor}
                      activeTrackGradient={activeTrackGradient}
                      thumbColor={thumbColor}
                      thumbGradient={thumbGradient}
                      activeThumbColor={activeThumbColor}
                      activeThumbGradient={activeThumbGradient}
                      labelColor={labelColor}
                      labelGradient={labelGradient}
                      iconColor={iconColor}
                      iconGradient={iconGradient}
                      textColor={textColor}
                      borderColor={borderColor}
                      ripple={ripple}
                      shadow="lg"
                      label="With Shadow"
                      icon={<BellIcon />}
                    />
                  </div>
                </div>

                {/* Advanced Gradient Builder */}
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>
                    🔧 Advanced Gradient Builder
                  </h4>
                  
                  {/* Gradient Type Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text, #111827)' }}>Type:</label>
                    <Dropdown
                      options={[
                        { label: 'Linear', value: 'linear' },
                        { label: 'Radial', value: 'radial' },
                        { label: 'Conic', value: 'conic' }
                      ]}
                      value={gradientType}
                      onChange={(value) => {
                        setGradientType(String(value));
                        if (value === 'linear') setGradientDirection('90deg');
                        else if (value === 'radial') setGradientDirection('circle at center');
                        else if (value === 'conic') setGradientDirection('from 0deg at center');
                      }}
                      placeholder="Select type"
                      size="sm"
                    />
                    
                    <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text, #111827)' }}>Direction:</label>
                    <input
                      type="text"
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value)}
                      style={{ width: '120px', padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      placeholder={getGradientPlaceholder(gradientType)}
                    />
                  </div>
                  
                  {/* Color Management */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text, #111827)' }}>Colors:</label>
                      <Button
                        onClick={addColor}
                        variant="outline"
                        size="xs"
                      >
                        + Add Color
                      </Button>
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
                          <Button
                            onClick={() => removeColor(index)}
                            variant="outline"
                            size="xs"
                          >
                            ×
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Generate Button */}
                  <div style={{ marginBottom: '16px' }}>
                    <Button
                      onClick={generateGradient}
                      variant="primary"
                      size="sm"
                    >
                      Generate Gradient
                    </Button>
                  </div>
                  
                  {/* Gradient Preview */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text, #111827)' }}>Preview:</label>
                    <div 
                      style={{ 
                        width: '100%', 
                        height: '60px', 
                        background: generatedGradient, 
                        border: '1px solid var(--color-border, #d1d5db)', 
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontSize: '12px',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                      }}
                    >
                      {generatedGradient}
                    </div>
                  </div>
                  
                  {/* Apply to Target Buttons */}
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px', color: 'var(--color-text, #111827)' }}>Apply to Target:</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {['track', 'activeTrack', 'thumb', 'activeThumb', 'label', 'icon', 'text', 'border'].map(target => (
                        <Button
                          key={target}
                          onClick={() => applyGradientToTarget(target)}
                          variant="outline"
                          size="xs"
                        >
                          {target}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Individual Color Controls */}
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>
                    🎨 Individual Color Controls
                  </h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                    {/* Track Colors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Track Color:</label>
                      <input
                        type="color"
                        value={trackColor || '#e5e7eb'}
                        onChange={(e) => setTrackColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={trackColor}
                        onChange={(e) => setTrackColor(e.target.value)}
                        placeholder="Track gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Active Track Color:</label>
                      <input
                        type="color"
                        value={activeTrackColor || '#0070f3'}
                        onChange={(e) => setActiveTrackColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={activeTrackColor}
                        onChange={(e) => setActiveTrackColor(e.target.value)}
                        placeholder="Active track gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    {/* Thumb Colors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Thumb Color:</label>
                      <input
                        type="color"
                        value={thumbColor || '#ffffff'}
                        onChange={(e) => setThumbColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={thumbColor}
                        onChange={(e) => setThumbColor(e.target.value)}
                        placeholder="Thumb gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Active Thumb Color:</label>
                      <input
                        type="color"
                        value={activeThumbColor || '#ffffff'}
                        onChange={(e) => setActiveThumbColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={activeThumbColor}
                        onChange={(e) => setActiveThumbColor(e.target.value)}
                        placeholder="Active thumb gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    {/* Label and Icon Colors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Label Color:</label>
                      <input
                        type="color"
                        value={labelColor || '#111827'}
                        onChange={(e) => setLabelColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={labelColor}
                        onChange={(e) => setLabelColor(e.target.value)}
                        placeholder="Label gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Icon Color:</label>
                      <input
                        type="color"
                        value={iconColor || '#6b7280'}
                        onChange={(e) => setIconColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value)}
                        placeholder="Icon gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    {/* Text and Border Colors */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Text Color:</label>
                      <input
                        type="color"
                        value={textColor || '#111827'}
                        onChange={(e) => setTextColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="Text gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text, #111827)' }}>Border Color:</label>
                      <input
                        type="color"
                        value={borderColor || '#d1d5db'}
                        onChange={(e) => setBorderColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px' }}
                      />
                      <input
                        type="text"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        placeholder="Border gradient or color"
                        style={{ padding: '8px', border: '1px solid var(--color-border, #d1d5db)', borderRadius: '4px', fontSize: '14px', backgroundColor: 'var(--color-background, #ffffff)', color: 'var(--color-text, #111827)' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Effect Controls */}
                <div>
                  <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text, #111827)' }}>
                    ✨ Effect Controls
                  </h4>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text, #111827)' }}>
                      <input
                        type="checkbox"
                        checked={ripple}
                        onChange={(e) => setRipple(e.target.checked)}
                      />
                      Ripple Effect
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text, #111827)' }}>
                      <input
                        type="checkbox"
                        checked={animated}
                        onChange={(e) => setAnimated(e.target.checked)}
                      />
                      Animated Transitions
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text, #111827)' }}>
                      <input
                        type="checkbox"
                        checked={glassmorphism}
                        onChange={(e) => setGlassmorphism(e.target.checked)}
                      />
                      Glassmorphism Effect
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Reset Button */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={resetCustomStyling}
              variant="outline"
              size="sm"
            >
              🔄 Reset All Custom Styling
            </Button>
          </div>
        </div>
      </ThemeProvider>
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
