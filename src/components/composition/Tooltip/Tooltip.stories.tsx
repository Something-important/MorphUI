import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button, Dropdown, Checkbox, ThemeProvider, themes } from '../../index';

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
        <Button variant="primary">
          Hover me!
        </Button>
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
          <Button variant="primary">
            Hover for Tooltip
          </Button>
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
        <Button variant="success">
          Rich Content Tooltip
        </Button>
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
        <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Position Variants</h3>
        <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Hover over each button to see different tooltip positions:</p>
        
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
                <Button 
                  style={{ background: color, borderColor: color }}
                  variant="primary"
                >
                  {label}
                </Button>
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
        <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Trigger Types</h3>
        <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Different ways to trigger the tooltip:</p>
        
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
                <Button 
                  style={{ background: color, borderColor: color }}
                  variant="primary"
                >
                  {label}
                </Button>
              </Tooltip>
              <p style={{ marginTop: '0.5rem', fontSize: '14px', color: 'var(--color-content-muted)' }}>
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
        <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Visual Variants</h3>
        <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Different visual styles for the tooltip:</p>
        
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {variants.map(({ variant, label, color }) => (
            <Tooltip 
              key={variant}
              content={`This tooltip uses the ${variant} variant with custom colors and styling.`}
              variant={variant as any}
              position="bottom"
            >
              <Button 
                style={{ 
                  background: variant === 'outline' ? 'transparent' : color,
                  borderColor: variant === 'outline' ? color : color,
                  color: variant === 'outline' ? color : 'white'
                }}
                variant={variant === 'outline' ? 'outline' : 'primary'}
              >
                {label}
              </Button>
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
        <h3 style={{ color: 'var(--color-heading-primary)', fontSize: '24px', fontWeight: '700', marginBottom: '16px', textAlign: 'center' }}>Size Variants</h3>
        <p style={{ color: 'var(--color-content-primary)', fontSize: '16px', marginBottom: '24px', textAlign: 'center' }}>Different sizes for the tooltip:</p>
        
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
              <Button 
                style={{ background: color, borderColor: color }}
                variant="primary"
              >
                {label}
              </Button>
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
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
    
    // Color states
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundGradient, setBackgroundGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [textGradient, setTextGradient] = useState('');
    const [borderColor, setBorderColor] = useState('');
    const [borderGradient, setBorderGradient] = useState('');
    const [arrowColor, setArrowColor] = useState('');
    const [arrowGradient, setArrowGradient] = useState('');
    
    // Effect states
    const [glassmorphism, setGlassmorphism] = useState(false);
    const [arrow, setArrow] = useState(true);
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
    const availableThemes = themes;
    
    const toggleSection = (section: string) => {
      setCollapsedSections(prev => ({
        ...prev,
        [section]: !prev[section]
      }));
    };
    
    // Utility functions
    const generateGradient = () => {
      if (gradientColors.length < 2) return '';
      const colors = gradientColors.join(', ');
      
      if (gradientType === 'linear') {
        return `linear-gradient(${gradientDirection}, ${colors})`;
      } else if (gradientType === 'radial') {
        const direction = gradientDirection || 'circle at center';
        return `radial-gradient(${direction}, ${colors})`;
      } else if (gradientType === 'conic') {
        const direction = gradientDirection || 'from 0deg at center';
        return `conic-gradient(${direction}, ${colors})`;
      }
      
      return '';
    };
    
    const applyGradientToTarget = (target: string) => {
      const gradient = generateGradient();
      if (!gradient) return;
      
      switch (target) {
        case 'background':
          setBackgroundColor(gradient);
          setBackgroundGradient('');
          break;
        case 'text':
          setTextColor(gradient);
          setTextGradient('');
          break;
        case 'border':
          setBorderColor(gradient);
          setBorderGradient('');
          break;
        case 'arrow':
          setArrowColor(gradient);
          setArrowGradient('');
          break;
      }
    };
    
    const resetCustomStyling = () => {
      setBackgroundColor('');
      setBackgroundGradient('');
      setTextColor('');
      setTextGradient('');
      setBorderColor('');
      setBorderGradient('');
      setArrowColor('');
      setArrowGradient('');
      setGlassmorphism(false);
      setArrow(true);
    };
    
    const addColor = () => {
      setGradientColors(prev => [...prev, '#000000']);
    };
    
    const removeColor = (index: number) => {
      setGradientColors(prev => prev.filter((_, i) => i !== index));
    };
    
    const updateColor = (index: number, color: string) => {
      setGradientColors(prev => prev.map((c, i) => i === index ? color : c));
    };
    
    const getGradientPlaceholder = (type: string) => {
      switch (type) {
        case 'linear': return 'e.g., 90deg, to right, to bottom left';
        case 'radial': return 'e.g., circle at center, ellipse at top left';
        case 'conic': return 'e.g., from 0deg at center, from 45deg at 50% 50%';
        default: return 'e.g., 90deg, to right, circle at center';
      }
    };
    
    const tooltipContent = (
      <div style={{ padding: '8px' }}>
        <h4 style={{ 
          margin: '0 0 12px 0', 
          color: 'var(--color-heading-primary)', 
          fontSize: '16px', 
          fontWeight: '700',
          textAlign: 'center'
        }}>
          🎨 Custom Tooltip
        </h4>
        <p style={{ 
          margin: '0 0 8px 0', 
          color: 'var(--color-content-primary)', 
          fontSize: '14px',
          textAlign: 'center'
        }}>
          This tooltip uses custom colors and gradients!
        </p>
        <p style={{ 
          margin: '0 0 16px 0', 
          color: 'var(--color-content-secondary)', 
          fontSize: '13px',
          textAlign: 'center'
        }}>
          Hover over the button to see the custom styling in action.
        </p>
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
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-heading-primary)', fontSize: '20px', fontWeight: '700' }}>🎨 Theme Switcher</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-content-primary)' }}>
              Current theme: <strong style={{ color: 'var(--color-primary)' }}>{currentTheme}</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.entries(availableThemes).map(([name, theme]) => (
                <Button
                  key={name}
                  onClick={() => setCurrentTheme(name)}
                  variant={currentTheme === name ? 'primary' : 'outline'}
                  size="sm"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Button>
              ))}
            </div>
          </div>

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
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px', textAlign: 'center' }}>
                  <Tooltip
                    content={tooltipContent}
                    position="bottom"
                    backgroundColor={backgroundColor.trim() || undefined}
                    textColor={textColor.trim() || undefined}
                    borderColor={borderColor.trim() || undefined}
                    arrowColor={arrowColor.trim() || undefined}
                    glassmorphism={glassmorphism}
                    arrow={arrow}
                    size="lg"
                  >
                    <Button variant="primary">
                      Hover for Custom Tooltip
                    </Button>
                  </Tooltip>
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
                  🌈 Gradient Builder
                </h4>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  {collapsedSections.gradient ? '▼' : '▲'}
                </span>
              </div>
              
              {!collapsedSections.gradient && (
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                        Gradient Type:
                      </label>
                      <Dropdown
                        options={[
                          { label: 'Linear', value: 'linear' },
                          { label: 'Radial', value: 'radial' },
                          { label: 'Conic', value: 'conic' }
                        ]}
                        value={gradientType}
                        onChange={(value) => {
                          setGradientType(String(value));
                          if (String(value) === 'linear') {
                            setGradientDirection('90deg');
                          } else if (String(value) === 'radial') {
                            setGradientDirection('circle at center');
                          } else if (String(value) === 'conic') {
                            setGradientDirection('from 0deg at center');
                          }
                        }}
                        placeholder="Select type"
                        size="sm"
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                        Direction:
                      </label>
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
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-text)'
                        }}
                      />
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                      Colors:
                    </label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      {gradientColors.map((color, index) => (
                        <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => updateColor(index, e.target.value)}
                            style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
                          width: '32px',
                          height: '32px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                      Preview:
                    </label>
                    <div
                      style={{
                        width: '100%',
                        height: '60px',
                        background: generateGradient() || 'var(--color-background-subtle)',
                        borderRadius: '8px',
                        border: '1px solid var(--color-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-text)',
                        fontSize: '14px',
                        fontWeight: '500'
                      }}
                    >
                      {generateGradient() ? 'Gradient Preview' : 'Add colors to see preview'}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <Button
                      onClick={() => applyGradientToTarget('background')}
                      variant="outline"
                      size="sm"
                      disabled={!generateGradient()}
                    >
                      Apply to Background
                    </Button>
                    <Button
                      onClick={() => applyGradientToTarget('text')}
                      variant="outline"
                      size="sm"
                      disabled={!generateGradient()}
                    >
                      Apply to Text
                    </Button>
                    <Button
                      onClick={() => applyGradientToTarget('border')}
                      variant="outline"
                      size="sm"
                      disabled={!generateGradient()}
                    >
                      Apply to Border
                    </Button>
                    <Button
                      onClick={() => applyGradientToTarget('arrow')}
                      variant="outline"
                      size="sm"
                      disabled={!generateGradient()}
                    >
                      Apply to Arrow
                    </Button>
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
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                        Background Color:
                      </label>
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => {
                          setBackgroundColor(e.target.value);
                          setBackgroundGradient('');
                        }}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={backgroundGradient}
                        onChange={(e) => {
                          setBackgroundGradient(e.target.value);
                          setBackgroundColor('');
                        }}
                        placeholder="Or enter gradient (e.g., linear-gradient(45deg, #ff0000, #00ff00))"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-text)',
                          marginTop: '8px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                        Text Color:
                      </label>
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => {
                          setTextColor(e.target.value);
                          setTextGradient('');
                        }}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={textGradient}
                        onChange={(e) => {
                          setTextGradient(e.target.value);
                          setTextColor('');
                        }}
                        placeholder="Or enter gradient"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-text)',
                          marginTop: '8px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                        Border Color:
                      </label>
                      <input
                        type="color"
                        value={borderColor}
                        onChange={(e) => {
                          setBorderColor(e.target.value);
                          setBorderGradient('');
                        }}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={borderGradient}
                        onChange={(e) => {
                          setBorderGradient(e.target.value);
                          setBorderColor('');
                        }}
                        placeholder="Or enter gradient"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-text)',
                          marginTop: '8px'
                        }}
                      />
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: 'var(--color-text)', fontSize: '14px' }}>
                        Arrow Color:
                      </label>
                      <input
                        type="color"
                        value={arrowColor}
                        onChange={(e) => {
                          setArrowColor(e.target.value);
                          setArrowGradient('');
                        }}
                        style={{ width: '100%', height: '40px', border: '1px solid var(--color-border)', borderRadius: '6px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={arrowGradient}
                        onChange={(e) => {
                          setArrowGradient(e.target.value);
                          setArrowColor('');
                        }}
                        placeholder="Or enter gradient"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '6px',
                          fontSize: '14px',
                          backgroundColor: 'var(--color-background)',
                          color: 'var(--color-text)',
                          marginTop: '8px'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Effect Controls */}
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
                onClick={() => toggleSection('effects')}
              >
                <h4 style={{ margin: 0, color: 'var(--color-heading-primary)', fontSize: '16px', fontWeight: '600' }}>
                  ✨ Effect Controls
                </h4>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                  {collapsedSections.effects ? '▼' : '▲'}
                </span>
              </div>
              
              {!collapsedSections.effects && (
                <div style={{ padding: '16px', background: 'var(--color-background)', borderRadius: '8px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <input
                        type="checkbox"
                        checked={glassmorphism}
                        onChange={(e) => setGlassmorphism(e.target.checked)}
                      />
                      Glassmorphism Effect
                    </label>
                    
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <input
                        type="checkbox"
                        checked={arrow}
                        onChange={(e) => setArrow(e.target.checked)}
                      />
                      Show Arrow
                    </label>
                  </div>
                </div>
              )}
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center' }}>
              <Button 
                onClick={resetCustomStyling}
                variant="primary"
              >
                Reset All Custom Styling
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
