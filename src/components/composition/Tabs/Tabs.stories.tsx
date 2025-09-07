import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, TabPanel, Button, Dropdown, ThemeProvider, themes } from '../../index';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated tabs component with advanced theming, accessibility, and smooth animations.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of tab items',
    },
    defaultActiveTab: {
      control: 'text',
      description: 'Default active tab ID',
    },
    activeTab: {
      control: 'text',
      description: 'Controlled active tab ID',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when active tab changes',
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
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make tabs full width',
    },
    centered: {
      control: 'boolean',
      description: 'Center align tabs',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    closable: {
      control: 'boolean',
      description: 'Allow closing tabs',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={themes.light}>
        <div style={{ padding: '2rem', minHeight: '400px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

// Sample data for stories
const sampleItems = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)' }}>Overview</h3>
        <p style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>
          This is the overview tab content. Here you can see how the Tabs component works with custom theming.
        </p>
      </div>
    ),
    icon: '📊',
    badge: '3'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    content: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)' }}>Analytics</h3>
        <p style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>
          Analytics data and insights go here. The tabs support rich content and custom styling.
        </p>
      </div>
    ),
    icon: '📈',
    badge: '12'
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)' }}>Settings</h3>
        <p style={{ color: 'var(--color-text)', lineHeight: '1.6' }}>
          Configure your preferences and settings here. Each tab can have different content and styling.
        </p>
      </div>
    ),
    icon: '⚙️'
  }
];

export const Default: Story = {
  args: {
    items: sampleItems,
    defaultActiveTab: 'overview',
    variant: 'primary',
    size: 'md',
    animated: true,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Tabs Variants</h3>
      <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Different visual styles for the tabs component:</p>
      
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'].map((variant) => (
          <div key={variant} style={{ textAlign: 'center' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px', textTransform: 'capitalize' }}>{variant}</h4>
            <Tabs 
              items={sampleItems.slice(0, 2)}
              defaultActiveTab="overview"
              variant={variant as any}
              size="sm"
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Tabs Sizes</h3>
      <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Different sizes for various use cases:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
          <div key={size} style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
            <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px', textTransform: 'uppercase' }}>{size}</h4>
            <Tabs 
              items={sampleItems}
              defaultActiveTab="overview"
              variant="primary"
              size={size as any}
            />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Features: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Tabs Features</h3>
      <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Different features and configurations:</p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px' }}>Full Width</h4>
          <Tabs 
            items={sampleItems}
            defaultActiveTab="overview"
            variant="primary"
            fullWidth
          />
        </div>
        
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px' }}>Centered</h4>
          <Tabs 
            items={sampleItems}
            defaultActiveTab="overview"
            variant="secondary"
            centered
          />
        </div>
        
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '600px' }}>
          <h4 style={{ color: 'var(--color-text)', fontSize: '14px', marginBottom: '8px' }}>Vertical Orientation</h4>
          <Tabs 
            items={sampleItems}
            defaultActiveTab="overview"
            variant="info"
            orientation="vertical"
            size="lg"
          />
        </div>
      </div>
    </div>
  ),
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [collapsedSections, setCollapsedSections] = useState({
      preview: false,
      gradient: false,
      colors: false,
      effects: false
    });

    // Color states
    const [tabColor, setTabColor] = useState('#ffffff');
    const [activeTabColor, setActiveTabColor] = useState('#3b82f6');
    const [hoverTabColor, setHoverTabColor] = useState('#f3f4f6');
    const [contentColor, setContentColor] = useState('#ffffff');
    const [indicatorColor, setIndicatorColor] = useState('#3b82f6');
    const [badgeColor, setBadgeColor] = useState('#ef4444');
    const [iconColor, setIconColor] = useState('#6b7280');
    const [textColor, setTextColor] = useState('#111827');
    const [borderColor, setBorderColor] = useState('#d1d5db');
    
    // Gradient states
    const [tabGradient, setTabGradient] = useState('');
    const [activeTabGradient, setActiveTabGradient] = useState('');
    const [hoverTabGradient, setHoverTabGradient] = useState('');
    const [contentGradient, setContentGradient] = useState('');
    const [indicatorGradient, setIndicatorGradient] = useState('');
    const [badgeGradient, setBadgeGradient] = useState('');
    const [iconGradient, setIconGradient] = useState('');
    const [textGradient, setTextGradient] = useState('');
    const [borderGradient, setBorderGradient] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [generatedGradient, setGeneratedGradient] = useState('');
    
    // Effect states
    const [animated, setAnimated] = useState(true);
    const [glassmorphism, setGlassmorphism] = useState(false);
    const [fullWidth, setFullWidth] = useState(false);

    const toggleSection = (section: string) => {
      setCollapsedSections(prev => ({
        ...prev,
        [section]: !prev[section as keyof typeof prev]
      }));
    };

    const getGradientPlaceholder = (type: string) => {
      switch (type) {
        case 'linear': return '90deg, 45deg, to right, etc.';
        case 'radial': return 'circle at center, ellipse at top left, etc.';
        case 'conic': return 'from 0deg at center, from 45deg at 50% 50%, etc.';
        default: return 'Enter direction';
      }
    };

    const generateGradient = () => {
      if (gradientColors.length < 2) return;
      const colors = gradientColors.join(', ');
      let gradient = '';
      
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${colors})`;
      } else if (gradientType === 'radial') {
        const direction = gradientDirection || 'circle at center';
        gradient = `radial-gradient(${direction}, ${colors})`;
      } else if (gradientType === 'conic') {
        const direction = gradientDirection || 'from 0deg at center';
        gradient = `conic-gradient(${direction}, ${colors})`;
      }
      
      setGeneratedGradient(gradient);
    };

    const applyGradientToTarget = (target: string) => {
      switch (target) {
        case 'tab':
          setTabColor(generatedGradient);
          setTabGradient('');
          break;
        case 'activeTab':
          setActiveTabColor(generatedGradient);
          setActiveTabGradient('');
          break;
        case 'hoverTab':
          setHoverTabColor(generatedGradient);
          setHoverTabGradient('');
          break;
        case 'content':
          setContentColor(generatedGradient);
          setContentGradient('');
          break;
        case 'indicator':
          setIndicatorColor(generatedGradient);
          setIndicatorGradient('');
          break;
        case 'badge':
          setBadgeColor(generatedGradient);
          setBadgeGradient('');
          break;
        case 'icon':
          setIconColor(generatedGradient);
          setIconGradient('');
          break;
        case 'text':
          setTextColor(generatedGradient);
          setTextGradient('');
          break;
        case 'border':
          setBorderColor(generatedGradient);
          setBorderGradient('');
          break;
      }
    };

    const resetCustomStyling = () => {
      setTabColor('#ffffff');
      setActiveTabColor('#3b82f6');
      setHoverTabColor('#f3f4f6');
      setContentColor('#ffffff');
      setIndicatorColor('#3b82f6');
      setBadgeColor('#ef4444');
      setIconColor('#6b7280');
      setTextColor('#111827');
      setBorderColor('#d1d5db');
      setTabGradient('');
      setActiveTabGradient('');
      setHoverTabGradient('');
      setContentGradient('');
      setIndicatorGradient('');
      setBadgeGradient('');
      setIconGradient('');
      setTextGradient('');
      setBorderGradient('');
    };

    const addColor = () => {
      setGradientColors([...gradientColors, '#000000']);
    };

    const removeColor = (index: number) => {
      if (gradientColors.length > 2) {
        setGradientColors(gradientColors.filter((_, i) => i !== index));
      }
    };

    const updateColor = (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
    };

    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ color: 'var(--color-heading-primary)', fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
            🎭 Tabs Interactive Theme Builder
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '18px', marginBottom: '24px' }}>
            Create stunning tab designs with advanced theming, gradients, and effects
          </p>
          
          {/* Theme Switcher */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '24px',
            flexWrap: 'wrap'
          }}>
            {Object.entries(themes).map(([name, theme]) => (
              <button
                key={name}
                onClick={() => setCurrentTheme(name)}
                style={{
                  background: currentTheme === name ? 'var(--color-primary)' : 'var(--color-background)',
                  color: currentTheme === name ? 'white' : 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <ThemeProvider theme={themes[currentTheme as keyof typeof themes]}>
          {/* Interactive Theme Builder */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)', fontSize: '20px', fontWeight: '700' }}>🎭 Interactive Theme Builder</h3>
            
            {/* Live Preview */}
            <div style={{ marginBottom: '24px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer',
                  padding: '12px',
                  background: 'var(--color-background-subtle)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)'
                }}
                onClick={() => toggleSection('preview')}
              >
                <h4 style={{ margin: 0, color: 'var(--color-heading-primary)', fontSize: '16px', fontWeight: '600' }}>
                  🎯 Live Preview
                </h4>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  {collapsedSections.preview ? '▼' : '▲'}
                </span>
              </div>
              
              {!collapsedSections.preview && (
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px' }}>
                  <Tabs
                    items={sampleItems}
                    defaultActiveTab="overview"
                    tabColor={tabColor}
                    activeTabColor={activeTabColor}
                    hoverTabColor={hoverTabColor}
                    contentColor={contentColor}
                    indicatorColor={indicatorColor}
                    badgeColor={badgeColor}
                    iconColor={iconColor}
                    textColor={textColor}
                    textGradient={textGradient}
                    borderColor={borderColor}
                    borderGradient={borderGradient}
                    animated={animated}
                    glassmorphism={glassmorphism}
                    fullWidth={fullWidth}
                  />
                </div>
              )}
            </div>

            {/* Gradient Builder */}
            <div style={{ marginBottom: '24px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer',
                  padding: '12px',
                  background: 'var(--color-background-subtle)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)'
                }}
                onClick={() => toggleSection('gradient')}
              >
                <h4 style={{ margin: 0, color: 'var(--color-heading-primary)', fontSize: '16px', fontWeight: '600' }}>
                  🌈 Advanced Gradient Builder
                </h4>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  {collapsedSections.gradient ? '▼' : '▲'}
                </span>
              </div>
              
              {!collapsedSections.gradient && (
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px' }}>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Gradient Type:</label>
                    <Dropdown
                      options={[
                        { value: 'linear', label: 'Linear' },
                        { value: 'radial', label: 'Radial' },
                        { value: 'conic', label: 'Conic' }
                      ]}
                      value={gradientType}
                      onChange={(value) => setGradientType(value as string)}
                      size="sm"
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Direction:</label>
                    <input
                      type="text"
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value)}
                      placeholder={getGradientPlaceholder(gradientType)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '6px',
                        fontSize: '14px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)'
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Colors:</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {gradientColors.map((color, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            style={{ width: '40px', height: '32px', border: 'none', borderRadius: '4px' }}
                          />
                          {gradientColors.length > 2 && (
                            <button
                              onClick={() => removeColor(index)}
                              style={{
                                background: 'var(--color-danger)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                                fontSize: '12px'
                              }}
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addColor}
                        style={{
                          background: 'var(--color-primary)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          padding: '8px 12px',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        + Add Color
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <button
                      onClick={generateGradient}
                      style={{
                        background: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 16px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%'
                      }}
                    >
                      Generate Gradient
                    </button>
                  </div>

                  {generatedGradient && (
                    <div style={{ marginBottom: '16px' }}>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Generated Gradient:</label>
                      <div style={{ 
                        padding: '12px', 
                        background: 'var(--color-background-subtle)', 
                        borderRadius: '6px', 
                        border: '1px solid var(--color-border)',
                        fontFamily: 'monospace',
                        fontSize: '12px',
                        color: 'var(--color-text)',
                        wordBreak: 'break-all'
                      }}>
                        {generatedGradient}
                      </div>
                    </div>
                  )}

                  <div>
                    <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Apply to Target:</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {['tab', 'activeTab', 'hoverTab', 'content', 'indicator', 'badge', 'icon', 'text', 'border'].map((target) => (
                        <button
                          key={target}
                          onClick={() => applyGradientToTarget(target)}
                          style={{
                            background: 'var(--color-secondary)',
                            color: 'var(--color-text)',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            padding: '8px 12px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            textTransform: 'capitalize'
                          }}
                        >
                          {target}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Individual Color Controls */}
            <div style={{ marginBottom: '24px' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer',
                  padding: '12px',
                  background: 'var(--color-background-subtle)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)'
                }}
                onClick={() => toggleSection('colors')}
              >
                <h4 style={{ margin: 0, color: 'var(--color-heading-primary)', fontSize: '16px', fontWeight: '600' }}>
                  🎨 Individual Color Controls
                </h4>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  {collapsedSections.colors ? '▼' : '▲'}
                </span>
              </div>
              
              {!collapsedSections.colors && (
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Tab Color:</label>
                      <input
                        type="color"
                        value={tabColor}
                        onChange={(e) => setTabColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Active Tab Color:</label>
                      <input
                        type="color"
                        value={activeTabColor}
                        onChange={(e) => setActiveTabColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Hover Tab Color:</label>
                      <input
                        type="color"
                        value={hoverTabColor}
                        onChange={(e) => setHoverTabColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Content Color:</label>
                      <input
                        type="color"
                        value={contentColor}
                        onChange={(e) => setContentColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Indicator Color:</label>
                      <input
                        type="color"
                        value={indicatorColor}
                        onChange={(e) => setIndicatorColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Badge Color:</label>
                      <input
                        type="color"
                        value={badgeColor}
                        onChange={(e) => setBadgeColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Icon Color:</label>
                      <input
                        type="color"
                        value={iconColor}
                        onChange={(e) => setIconColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Text Color:</label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Border Color:</label>
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => setBorderColor(e.target.value)}
                        style={{ width: '100%', height: '40px', border: 'none', borderRadius: '6px' }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Effect Controls */}
            <div>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  cursor: 'pointer',
                  padding: '12px',
                  background: 'var(--color-background-subtle)',
                  borderRadius: '8px',
                  border: '1px solid var(--color-border)'
                }}
                onClick={() => toggleSection('effects')}
              >
                <h4 style={{ margin: 0, color: 'var(--color-heading-primary)', fontSize: '16px', fontWeight: '600' }}>
                  ⚡ Effect Controls
                </h4>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  {collapsedSections.effects ? '▼' : '▲'}
                </span>
              </div>
              
              {!collapsedSections.effects && (
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Animated:</label>
                      <input
                        type="checkbox"
                        checked={animated}
                        onChange={(e) => setAnimated(e.target.checked)}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Glassmorphism:</label>
                      <input
                        type="checkbox"
                        checked={glassmorphism}
                        onChange={(e) => setGlassmorphism(e.target.checked)}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                    <div>
                      <label style={{ fontWeight: '600', color: 'var(--color-text)', display: 'block', marginBottom: '8px' }}>Full Width:</label>
                      <input
                        type="checkbox"
                        checked={fullWidth}
                        onChange={(e) => setFullWidth(e.target.checked)}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid var(--color-border)' }}>
                    <button
                      onClick={resetCustomStyling}
                      style={{
                        background: 'var(--color-danger)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 20px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: '600',
                        width: '100%'
                      }}
                    >
                      🔄 Reset All Styling
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </ThemeProvider>
      </div>
    );
  },
};