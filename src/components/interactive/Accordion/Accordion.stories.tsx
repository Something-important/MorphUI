import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, Button, Dropdown, Checkbox, ThemeProvider, themes } from '../../index';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A highly customizable accordion component with support for variants, sizes, colors, gradients, animations, and advanced theming. Perfect for collapsible content sections, FAQs, and information organization.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    color: {
      control: { type: 'color' },
    },
    gradient: {
      control: { type: 'select' },
      options: ['none', 'to-r', 'to-l', 'to-t', 'to-b', 'to-tr', 'to-tl', 'to-br', 'to-bl'],
    },
    textColor: {
      control: { type: 'color' },
    },
    borderColor: {
      control: { type: 'color' },
    },
    backgroundColor: {
      control: { type: 'color' },
    },
    headerBackgroundColor: {
      control: { type: 'color' },
    },
    contentBackgroundColor: {
      control: { type: 'color' },
    },
    titleTextColor: {
      control: { type: 'color' },
    },
    contentTextColor: {
      control: { type: 'color' },
    },
    secondaryTextColor: {
      control: { type: 'color' },
    },
    mutedTextColor: {
      control: { type: 'color' },
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
    },
    animation: {
      control: { type: 'boolean' },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
  },
} as Meta<typeof Accordion>;

type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  args: {
    title: 'Default Accordion',
    children: (
      <div style={{ padding: '16px' }}>
        <p>This is the default accordion content. It demonstrates the basic functionality and styling.</p>
      </div>
    ),
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="Primary" variant="primary">
        <div style={{ padding: '16px' }}>
          <p>Primary variant with enhanced styling and visual prominence.</p>
        </div>
      </Accordion>
      
      <Accordion title="Secondary" variant="secondary">
        <div style={{ padding: '16px' }}>
          <p>Secondary variant with subtle styling.</p>
        </div>
      </Accordion>
      
      <Accordion title="Success" variant="success">
        <div style={{ padding: '16px' }}>
          <p>Success variant with green accent colors.</p>
        </div>
      </Accordion>
      
      <Accordion title="Warning" variant="warning">
        <div style={{ padding: '16px' }}>
          <p>Warning variant with yellow accent colors.</p>
        </div>
      </Accordion>
      
      <Accordion title="Danger" variant="danger">
        <div style={{ padding: '16px' }}>
          <p>Danger variant with red accent colors.</p>
        </div>
      </Accordion>
      
      <Accordion title="Info" variant="info">
        <div style={{ padding: '16px' }}>
          <p>Info variant with blue accent colors.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="Extra Small" size="xs">
        <div style={{ padding: '8px' }}>
          <p>Extra small accordion with minimal padding and compact styling.</p>
        </div>
      </Accordion>
      
      <Accordion title="Small" size="sm">
        <div style={{ padding: '12px' }}>
          <p>Small accordion with reduced padding and compact styling.</p>
        </div>
      </Accordion>
      
      <Accordion title="Medium" size="md">
        <div style={{ padding: '16px' }}>
          <p>Medium accordion with standard padding and balanced styling.</p>
        </div>
      </Accordion>
      
      <Accordion title="Large" size="lg">
        <div style={{ padding: '20px' }}>
          <p>Large accordion with increased padding and spacious styling.</p>
        </div>
      </Accordion>
      
      <Accordion title="Extra Large" size="xl">
        <div style={{ padding: '24px' }}>
          <p>Extra large accordion with maximum padding and generous styling.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="No Shadow" shadow="none">
        <div style={{ padding: '16px' }}>
          <p>Accordion without any shadow for a flat appearance.</p>
        </div>
      </Accordion>
      
      <Accordion title="Small Shadow" shadow="sm">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a subtle small shadow for gentle depth.</p>
        </div>
      </Accordion>
      
      <Accordion title="Medium Shadow" shadow="md">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a medium shadow for balanced depth.</p>
        </div>
      </Accordion>
      
      <Accordion title="Large Shadow" shadow="lg">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a large shadow for prominent depth.</p>
        </div>
      </Accordion>
      
      <Accordion title="Extra Large Shadow" shadow="xl">
        <div style={{ padding: '16px' }}>
          <p>Accordion with an extra large shadow for dramatic depth.</p>
        </div>
      </Accordion>
      
      <Accordion title="2X Large Shadow" shadow="2xl">
        <div style={{ padding: '16px' }}>
          <p>Accordion with a 2X large shadow for maximum depth.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const IconPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <Accordion title="Icon on the Left" iconPosition="left">
        <div style={{ padding: '16px' }}>
          <p>Accordion with the expand/collapse icon positioned on the left side.</p>
        </div>
      </Accordion>
      
      <Accordion title="Icon on the Right" iconPosition="right">
        <div style={{ padding: '16px' }}>
          <p>Accordion with the expand/collapse icon positioned on the right side.</p>
        </div>
      </Accordion>
    </div>
  ),
};

export const RichContent: Story = {
  args: {
    title: 'Rich Content Accordion',
    children: (
      <div style={{ padding: '20px' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '18px', fontWeight: '600' }}>
          Welcome to Rich Content
        </h3>
        <p style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          This accordion demonstrates how to include rich content with multiple elements,
          including headings, paragraphs, lists, and interactive components.
        </p>
        
        <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
          <li>Feature 1: Comprehensive theming support</li>
          <li>Feature 2: Multiple size variants</li>
          <li>Feature 3: Customizable animations</li>
          <li>Feature 4: Icon position control</li>
        </ul>
        
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <Button size="sm" variant="primary">Learn More</Button>
          <Button size="sm" variant="outline">Documentation</Button>
        </div>
      </div>
    ),
  },
};

export const GradientShowcase: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🌈 Background Gradients</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            title="🎨 Linear Gradient Background"
            headerBackgroundColor="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
            contentBackgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '12px', color: '#fff' }}>Beautiful Linear Gradients</h4>
              <p style={{ color: '#fff', lineHeight: '1.6' }}>
                This accordion uses linear gradients for both header and content backgrounds, creating a stunning visual effect!
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🌊 Radial Gradient Background"
            headerBackgroundColor="radial-gradient(circle at 30% 20%, #ff6b6b, #4ecdc4, #45b7d1)"
            contentBackgroundColor="radial-gradient(circle at 70% 80%, #96ceb4, #feca57, #ff9ff3)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '12px', color: '#fff' }}>Radial Gradient Magic</h4>
              <p style={{ color: '#fff', lineHeight: '1.6' }}>
                Radial gradients create beautiful circular color transitions that draw the eye naturally!
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🌀 Conic Gradient Background"
            headerBackgroundColor="conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b)"
            contentBackgroundColor="conic-gradient(from 180deg, #667eea, #764ba2, #f093fb, #667eea)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ marginBottom: '12px', color: '#fff' }}>Conic Gradient Wonder</h4>
              <p style={{ color: '#fff', lineHeight: '1.6' }}>
                Conic gradients create stunning rainbow-like effects that rotate around a center point!
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>✨ Text Gradients</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            title="🎭 Gradient Text Title"
            titleTextColor="linear-gradient(45deg, #ff0000, #00ff00, #0000ff)"
            descriptionTextColor="linear-gradient(90deg, #8b5cf6, #ec4899)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ 
                marginBottom: '12px', 
                background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Rainbow Text Magic
              </h4>
              <p style={{ 
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.6'
              }}>
                Text gradients create eye-catching effects that make content pop! Perfect for headings and special text.
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🔥 Fire Gradient Text"
            titleTextColor="linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f)"
            descriptionTextColor="linear-gradient(135deg, #ff416c, #ff4b2b)"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ 
                marginBottom: '12px', 
                background: 'linear-gradient(45deg, #ff6b35, #f7931e, #ffd23f)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Fire & Energy
              </h4>
              <p style={{ 
                background: 'linear-gradient(135deg, #ff416c, #ff4b2b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.6'
              }}>
                Warm gradient colors create energy and excitement, perfect for call-to-action content!
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Combined Effects</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Accordion
            title="🌟 Ultimate Gradient Experience"
            headerBackgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            contentBackgroundColor="linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)"
            titleTextColor="linear-gradient(90deg, #ffffff, #f0f0f0)"
            descriptionTextColor="linear-gradient(45deg, #ffffff, #e0e0e0)"
            shadow="xl"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ 
                marginBottom: '12px', 
                background: 'linear-gradient(90deg, #ffffff, #f0f0f0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Complete Gradient Package
              </h4>
              <p style={{ 
                background: 'linear-gradient(45deg, #ffffff, #e0e0e0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.6'
              }}>
                When you combine background gradients with text gradients and shadows, you get truly spectacular results!
              </p>
            </div>
          </Accordion>

          <Accordion
            title="🌙 Dark Theme Gradients"
            headerBackgroundColor="linear-gradient(135deg, #1e293b 0%, #475569 100%)"
            contentBackgroundColor="linear-gradient(45deg, #0f172a, #1e293b, #334155)"
            titleTextColor="linear-gradient(90deg, #f1f5f9, #cbd5e1)"
            descriptionTextColor="linear-gradient(45deg, #e2e8f0, #94a3b8)"
            shadow="lg"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h4 style={{ 
                marginBottom: '12px', 
                background: 'linear-gradient(90deg, #f1f5f9, #cbd5e1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Dark & Mysterious
              </h4>
              <p style={{ 
                background: 'linear-gradient(45deg, #e2e8f0, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: '1.6'
              }}>
                Dark gradients create sophisticated, modern looks perfect for professional applications!
              </p>
            </div>
          </Accordion>
        </div>
      </div>

      <div style={{ 
        padding: '20px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How to Use Gradients
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Background Gradients:</strong> Use <code>headerBackgroundColor</code> and <code>contentBackgroundColor</code> props with CSS gradient syntax.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>Text Gradients:</strong> Use <code>titleTextColor</code> and <code>descriptionTextColor</code> props with gradient values.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>CSS Syntax:</strong> <code>linear-gradient(direction, color1, color2, ...)</code>
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>Precedence:</strong> Gradients override solid colors, which override theme defaults.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveThemeBuilder: StoryObj<typeof Accordion> = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('light');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
    const [animation, setAnimation] = useState<'slide' | 'fade' | 'scale' | 'none'>('slide');
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');
    const [animationDuration, setAnimationDuration] = useState(300);
    
    // Background color controls
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundColorGradient, setBackgroundColorGradient] = useState('');
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState('');
    const [headerBackgroundColorGradient, setHeaderBackgroundColorGradient] = useState('');
    const [contentBackgroundColor, setContentBackgroundColor] = useState('');
    const [contentBackgroundColorGradient, setContentBackgroundColorGradient] = useState('');
    
    // Text color controls
    const [titleTextColor, setTitleTextColor] = useState('');
    const [titleTextColorGradient, setTitleTextColorGradient] = useState('');
    const [contentTextColor, setContentTextColor] = useState('');
    const [contentTextColorGradient, setContentTextColorGradient] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [activeGradientBuilder, setActiveGradientBuilder] = useState<string | null>(null);
    
    // Use centralized themes from the theme system
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
        case 'backgroundColor':
          setBackgroundColorGradient(gradient);
          break;
        case 'headerBackgroundColor':
          setHeaderBackgroundColorGradient(gradient);
          break;
        case 'contentBackgroundColor':
          setContentBackgroundColorGradient(gradient);
          break;
        case 'titleTextColor':
          setTitleTextColorGradient(gradient);
          break;
        case 'contentTextColor':
          setContentTextColorGradient(gradient);
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
              {Object.keys(availableThemes).map(themeName => (
                <button
                  key={themeName}
                  onClick={() => applyTheme(themeName)}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '6px',
                    background: currentTheme === themeName ? 'var(--color-primary)' : 'var(--color-background)',
                    color: currentTheme === themeName ? 'var(--color-background)' : 'var(--color-text)',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Themed Accordion Preview */}
          <div style={{ 
            background: backgroundColorGradient.trim() || backgroundColor.trim() || 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            transition: 'background 0.3s ease'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Accordion</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This accordion automatically adapts to the selected theme!
            </p>
            
                          <Accordion
                variant={variant}
                size={size}
                shadow={shadow}
                animation={animation}
                iconPosition={iconPosition}
                animationDuration={animationDuration}
                headerBackgroundColor={headerBackgroundColorGradient.trim() || headerBackgroundColor.trim() || undefined}
                contentBackgroundColor={contentBackgroundColorGradient.trim() || contentBackgroundColor.trim() || undefined}
                titleTextColor={titleTextColorGradient.trim() || titleTextColor.trim() || undefined}
                descriptionTextColor={contentTextColorGradient.trim() || contentTextColor.trim() || undefined}
                title="🎨 Themed Accordion"
              >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h3 style={{ marginBottom: '16px', color: 'var(--color-text)' }}>✨ Theme Features</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🎨 Colors</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <li>Primary colors</li>
                      <li>Background colors</li>
                      <li>Text colors</li>
                      <li>Border colors</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: 'var(--color-primary)', marginBottom: '8px' }}>🌟 Effects</h4>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text)' }}>
                      <li>Shadows</li>
                      <li>Animations</li>
                      <li>Typography</li>
                      <li>Spacing</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>

          {/* Accordion Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Accordion Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Variant Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Variant:</label>
                <Dropdown
                  value={variant}
                  onChange={(value) => setVariant(value as any)}
                  options={[
                    { value: 'primary', label: 'Primary' },
                    { value: 'secondary', label: 'Secondary' },
                    { value: 'success', label: 'Success' },
                    { value: 'warning', label: 'Warning' },
                    { value: 'info', label: 'Info' },
                    { value: 'danger', label: 'Danger' },
                    { value: 'ghost', label: 'Ghost' },
                    { value: 'outline', label: 'Outline' }
                  ]}
                  placeholder="Select variant"
                  size="sm"
                />
              </div>

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <Dropdown
                  value={size}
                  onChange={(value) => setSize(value as any)}
                  options={[
                    { value: 'xs', label: 'Extra Small' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' }
                  ]}
                  placeholder="Select size"
                  size="sm"
                />
              </div>

              {/* Shadow Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Shadow:</label>
                <Dropdown
                  value={shadow}
                  onChange={(value) => setShadow(value as any)}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' },
                    { value: '2xl', label: '2X Large' }
                  ]}
                  placeholder="Select shadow"
                  size="sm"
                />
              </div>

              {/* Icon Position Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Icon Position:</label>
                <Dropdown
                  value={iconPosition}
                  onChange={(value) => setIconPosition(value as any)}
                  options={[
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' }
                  ]}
                  placeholder="Select position"
                  size="sm"
                />
              </div>

              {/* Animation Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Animation:</label>
                <Dropdown
                  value={animation}
                  onChange={(value) => setAnimation(value as any)}
                  options={[
                    { value: 'slide', label: 'Slide' },
                    { value: 'fade', label: 'Fade' },
                    { value: 'scale', label: 'Scale' },
                    { value: 'none', label: 'None' }
                  ]}
                  placeholder="Select animation"
                  size="sm"
                />
              </div>

              {/* Animation Duration */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>
                  Animation Duration: {animationDuration}ms
                </label>
                <input 
                  type="range" 
                  min="100" 
                  max="1000" 
                  step="50" 
                  value={animationDuration} 
                  onChange={(e) => setAnimationDuration(Number(e.target.value))}
                  style={{
                    width: '100%',
                    accentColor: 'var(--color-primary)'
                  }}
                />
              </div>
            </div>

            {/* Background Color Controls */}
            <div style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🎨 Background Colors
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {/* Main Background Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Main Background Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={backgroundColor || '#ffffff'} 
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={backgroundColor} 
                      onChange={(e) => setBackgroundColor(e.target.value)}
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
                      onClick={() => setBackgroundColor('')}
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

                {/* Main Background Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Main Background Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={backgroundColorGradient} 
                      onChange={(e) => setBackgroundColorGradient(e.target.value)}
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
                      onClick={() => setBackgroundColorGradient('')}
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

                {/* Header Background Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Header Background Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={headerBackgroundColor || '#f8f9fa'} 
                      onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={headerBackgroundColor} 
                      onChange={(e) => setHeaderBackgroundColor(e.target.value)}
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
                      onClick={() => setHeaderBackgroundColor('')}
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

                {/* Header Background Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Header Background Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={headerBackgroundColorGradient} 
                      onChange={(e) => setHeaderBackgroundColorGradient(e.target.value)}
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
                      onClick={() => setHeaderBackgroundColorGradient('')}
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

                {/* Content Background Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content Background Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={contentBackgroundColor || '#ffffff'} 
                      onChange={(e) => setContentBackgroundColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={contentBackgroundColor} 
                      onChange={(e) => setContentBackgroundColor(e.target.value)}
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
                      onClick={() => setContentBackgroundColor('')}
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

                {/* Content Background Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content Background Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={contentBackgroundColorGradient} 
                      onChange={(e) => setContentBackgroundColorGradient(e.target.value)}
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
                      onClick={() => setContentBackgroundColorGradient('')}
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
                    Main Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('headerBackgroundColor')}
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
                    Header Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('contentBackgroundColor')}
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
                    Content Background
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('titleTextColor')}
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
                    Title Text
                  </button>
                  <button
                    onClick={() => applyGradientToTarget('contentTextColor')}
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
                    Content Text
                  </button>
                </div>
              </div>
            </div>

            {/* Text Colors Section */}
            <div style={{ 
              background: 'var(--color-background)', 
              border: '1px solid var(--color-border)', 
              borderRadius: '8px', 
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
                🎨 Text Colors
              </h4>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                {/* Title Text Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Title Text Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={titleTextColor || '#000000'} 
                      onChange={(e) => setTitleTextColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={titleTextColor} 
                      onChange={(e) => setTitleTextColor(e.target.value)}
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
                      onClick={() => setTitleTextColor('')}
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

                {/* Title Text Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Title Text Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={titleTextColorGradient} 
                      onChange={(e) => setTitleTextColorGradient(e.target.value)}
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
                      onClick={() => setTitleTextColorGradient('')}
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

                {/* Content Text Color */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content Text Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={contentTextColor || '#000000'} 
                      onChange={(e) => setContentTextColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input 
                      type="text" 
                      value={contentTextColor} 
                      onChange={(e) => setContentTextColor(e.target.value)}
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
                      onClick={() => setContentTextColor('')}
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

                {/* Content Text Gradient */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Content Text Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      value={contentTextColorGradient} 
                      onChange={(e) => setContentTextColorGradient(e.target.value)}
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
                      onClick={() => setContentTextColorGradient('')}
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
                  setShadow('md');
                  setAnimation('slide');
                  setIconPosition('right');
                  setAnimationDuration(300);
                  setBackgroundColor('');
                  setBackgroundColorGradient('');
                  setHeaderBackgroundColor('');
                  setHeaderBackgroundColorGradient('');
                  setContentBackgroundColor('');
                  setContentBackgroundColorGradient('');
                  setTitleTextColor('');
                  setTitleTextColorGradient('');
                  setContentTextColor('');
                  setContentTextColorGradient('');
                  setGradientType('linear');
                  setGradientDirection('90deg');
                  setGradientColors(['#f43f5e', '#3b82f6']);
                  setActiveGradientBuilder(null);
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

