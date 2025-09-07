// Card.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, Button, Dropdown, Checkbox, ThemeProvider, themes } from '../../index';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A highly customizable card component with support for variants, sizes, colors, gradients, hover effects, images, badges, and advanced theming. Perfect for content containers, product displays, and information cards.',
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
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale', 'slide'],
    },
    color: { control: { type: 'text' } },
    gradient: { control: { type: 'text' } },
    textColor: { control: { type: 'text' } },
    borderColor: { control: { type: 'text' } },
    backgroundColor: { control: { type: 'text' } },
    headerBackgroundColor: { control: { type: 'text' } },
    titleColor: { control: { type: 'text' } },
    subtitleColor: { control: { type: 'text' } },
    contentColor: { control: { type: 'text' } },
    footerBackgroundColor: { control: { type: 'text' } },
    footerColor: { control: { type: 'text' } },
    rounded: { control: { type: 'boolean' } },
    bordered: { control: { type: 'boolean' } },
    clickable: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    maxWidth: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px', maxWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default: StoryObj<typeof Card> = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    description: 'This is a basic card with title, subtitle, and description.',
    children: (
      <p>This is the main content area of the card. You can put any content here.</p>
    ),
  },
  render: (args: any) => (
    <Card {...args} />
  ),
};



// Variants showcase
export const Variants: StoryObj<typeof Card> = {
  render: () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline'];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>
          🎨 Card Variants
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {variants.map((variant) => (
            <Card
              key={variant}
              variant={variant as any}
              title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`}
              subtitle={`${variant} variant example`}
              description={`This card demonstrates the ${variant} variant with its unique styling.`}
              badge={variant === 'new' ? 'NEW' : undefined}
              actions={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="sm" variant="outline">View</Button>
                  <Button size="sm" variant="primary">Action</Button>
                </div>
              }
              footer={`${variant.charAt(0).toUpperCase() + variant.slice(1)} variant footer`}
            >
              <p>The {variant} variant provides a distinct visual style while maintaining consistency.</p>
            </Card>
          ))}
        </div>
        </div>
    );
  },
};

// Sizes showcase
export const Sizes: StoryObj<typeof Card> = {
  render: () => {
    const sizes = [
      { key: 'xs', label: 'Extra Small', width: '280px' },
      { key: 'sm', label: 'Small', width: '320px' },
      { key: 'md', label: 'Medium', width: '400px' },
      { key: 'lg', label: 'Large', width: '480px' },
      { key: 'xl', label: 'Extra Large', width: '560px' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>
            📏 Card Sizes
          </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sizes.map((size) => (
            <Card
              key={size.key}
              size={size.key as any}
              title={`${size.label} Card`}
              subtitle={`${size.label.toLowerCase()} size variant`}
              description={`This card demonstrates the ${size.label.toLowerCase()} size with appropriate dimensions.`}
              style={{ maxWidth: size.width }}
            >
              <p>Size: {size.width}</p>
              <p>The content area adjusts automatically to fit the chosen size.</p>
            </Card>
          ))}
        </div>
        </div>
    );
  },
};

// Hover effects showcase
export const HoverEffects: StoryObj<typeof Card> = {
  render: () => {
    const effects = [
      { key: 'none', label: 'No Effect', description: 'No hover animation' },
      { key: 'lift', label: 'Lift', description: 'Card lifts up on hover' },
      { key: 'glow', label: 'Glow', description: 'Card glows on hover' },
      { key: 'scale', label: 'Scale', description: 'Card scales up on hover' },
      { key: 'slide', label: 'Slide', description: 'Card slides right on hover' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>
          ✨ Hover Effects
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {effects.map((effect) => (
            <Card
              key={effect.key}
              hoverEffect={effect.key as any}
              clickable
              title={effect.label}
              subtitle="Hover to see effect"
              description={effect.description}
              onClick={() => console.log(`${effect.label} card clicked`)}
              style={{ maxWidth: '280px' }}
            >
              <p>Hover over this card to see the <strong>{effect.label.toLowerCase()}</strong> effect in action!</p>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

// Image positioning showcase
export const ImagePositioning: StoryObj<typeof Card> = {
  render: () => {
    const positions = [
      { key: 'top', label: 'Top', description: 'Image above content' },
      { key: 'bottom', label: 'Bottom', description: 'Image below content' },
      { key: 'left', label: 'Left', description: 'Image to the left of content' },
      { key: 'right', label: 'Right', description: 'Image to the right of content' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>
          🖼️ Image Positioning
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          {positions.map((position) => (
            <Card
              key={position.key}
              imagePosition={position.key as any}
              title={`${position.label} Image Card`}
              subtitle={`Image positioned at ${position.label.toLowerCase()}`}
              description={`This card demonstrates image positioning at the ${position.label.toLowerCase()}.`}
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
              imageAlt="Mountain landscape"
              style={{ maxWidth: '400px' }}
            >
              <p>The image is positioned at the <strong>{position.label.toLowerCase()}</strong> of the card.</p>
              <p>This layout is great for showcasing visual content alongside text.</p>
            </Card>
          ))}
        </div>
      </div>
    );
  },
};

// Advanced features showcase
export const AdvancedFeatures: StoryObj<typeof Card> = {
  render: () => {
    const [loadingCard, setLoadingCard] = useState(false);
    const [clickCount, setClickCount] = useState(0);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          🚀 Advanced Features
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
          {/* Clickable Card */}
          <Card
            clickable
            title="Clickable Card"
            subtitle="Interactive card with ripple effect"
            description="This card can be clicked and shows a ripple effect."
            onClick={() => setClickCount(prev => prev + 1)}
            hoverEffect="lift"
            badge="CLICK"
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outline">Secondary</Button>
                <Button size="sm" variant="primary">Primary</Button>
              </div>
            }
            footer={`Clicked ${clickCount} times`}
          >
            <p>Click this card to see the ripple effect and increment the counter!</p>
            <p>Current clicks: <strong>{clickCount}</strong></p>
          </Card>

          {/* Loading Card */}
          <Card
            loading={loadingCard}
            title="Loading Card"
            subtitle="Card with loading state"
            description="This card shows a loading overlay when activated."
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            imageAlt="Mountain landscape"
            actions={
              <Button 
                size="sm" 
                variant="primary" 
                onClick={() => {
                  setLoadingCard(true);
                  setTimeout(() => setLoadingCard(false), 3000);
                }}
              >
                Toggle Loading
              </Button>
            }
            footer="Loading state with spinner overlay"
          >
            <p>Click the button to see the loading state for 3 seconds.</p>
            <p>The loading overlay prevents interaction while active.</p>
          </Card>

          {/* Rounded Card */}
          <Card
            rounded
            variant="success"
            title="Rounded Card"
            subtitle="Fully rounded corners"
            description="This card has fully rounded corners for a softer appearance."
            badge="ROUND"
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outline">View</Button>
                <Button size="sm" variant="success">Success</Button>
              </div>
            }
            footer="Rounded design for modern aesthetics"
          >
            <p>Rounded cards provide a softer, more modern appearance.</p>
            <p>Great for design systems that emphasize friendliness.</p>
          </Card>

          {/* Disabled Card */}
          <Card
            disabled
            title="Disabled Card"
            subtitle="Non-interactive card"
            description="This card is disabled and cannot be interacted with."
            image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
            imageAlt="Mountain landscape"
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outline" disabled>Disabled</Button>
                <Button size="sm" variant="primary" disabled>Action</Button>
              </div>
            }
            footer="Disabled state prevents all interactions"
          >
            <p>Disabled cards are useful for showing unavailable content.</p>
            <p>They maintain visual consistency while indicating non-interactivity.</p>
          </Card>
        </div>
      </div>
    );
  },
};

// Simple card
export const Simple: StoryObj<typeof Card> = {
  args: {
    children: (
      <div>
        <p>This is a simple card without a title or description.</p>
        <p>Perfect for basic content containers.</p>
      </div>
    ),
  },
  render: (args: any) => (
    <Card {...args} />
  ),
};

// Card with custom styling
export const CustomStyling: StoryObj<typeof Card> = {
  args: {
    title: 'Custom Styled Card',
    subtitle: 'With inline styles and custom colors',
    description: 'This card demonstrates custom styling capabilities.',
    children: (
      <p>You can apply custom colors, gradients, and inline styles to create unique designs.</p>
    ),
    style: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    },
    textColor: 'white',
    shadow: 'xl',
    hoverEffect: 'glow',
  },
  render: (args: any) => (
    <Card {...args} />
  ),
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: StoryObj<typeof Card> = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    
    // Simplified color states - only essential ones
    const [backgroundColor, setBackgroundColor] = useState('');
    const [textColor, setTextColor] = useState('');
    const [borderColor, setBorderColor] = useState('');
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState('');
    
    // Single gradient generator
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#ff0000', '#00ff00']);
    const [generatedGradient, setGeneratedGradient] = useState('');
    
    // Other controls
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [hoverEffect, setHoverEffect] = useState<'none' | 'lift' | 'glow' | 'scale' | 'slide'>('lift');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [rounded, setRounded] = useState(false);
    const [clickable, setClickable] = useState(false);
    
    const [clickCount, setClickCount] = useState(0);
    
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
    
    // Helper functions
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
    
    const applyGradientToTarget = (target: 'background' | 'text' | 'border' | 'header') => {
      const gradient = generateGradient();
      setGeneratedGradient(gradient);
      
      if (target === 'background') {
        setBackgroundColor(gradient);
      } else if (target === 'text') {
        setTextColor(gradient);
      } else if (target === 'border') {
        setBorderColor(gradient);
      } else if (target === 'header') {
        setHeaderBackgroundColor(gradient);
      }
    };
    
    const resetCustomStyling = () => {
      setBackgroundColor('');
      setTextColor('');
      setBorderColor('');
      setHeaderBackgroundColor('');
      setGeneratedGradient('');
      setGradientType('linear');
      setGradientDirection('90deg');
      setGradientColors(['#ff0000', '#00ff00']);
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
              {Object.keys(availableThemes).map((themeName) => (
                <Button
                  key={themeName}
                  onClick={() => applyTheme(themeName)}
                  variant={currentTheme === themeName ? 'primary' : 'outline'}
                  size="sm"
                >
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div style={{ 
            padding: '20px', 
            background: 'var(--color-background)', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
            marginBottom: '20px'
          }}>
            <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>
              🎨 Interactive Theme Builder
            </h2>
            <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
              Customize the Card appearance in real-time!
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            {/* Controls Panel */}
            <div style={{ 
              padding: '20px', 
              background: 'var(--color-background)', 
              borderRadius: '8px', 
              border: '1px solid var(--color-border)',
              height: 'fit-content'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>
                🎛️ Customization Controls
              </h3>
              
              {/* Precedence Information */}
              <div style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                backgroundColor: 'var(--color-background-secondary)', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-primary)'
              }}>
                <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)', fontSize: '1rem' }}>
                  🎯 Color Precedence
                </h4>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  Colors are applied in this order of priority:
                </p>
                <ol style={{ margin: '0', paddingLeft: '1.5rem', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  <li><strong>Gradients</strong> - Highest priority (overrides everything)</li>
                  <li><strong>Custom Colors</strong> - Overrides theme defaults</li>
                  <li><strong>Theme Colors</strong> - Default theme values</li>
                </ol>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Basic Controls */}
                <div>
                  <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Variant:</label>
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
                
                {/* Simplified Color Controls */}
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)', fontSize: '14px', fontWeight: '600' }}>🎨 Color Controls</h4>
                  
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
                        placeholder="e.g., #ffffff or gradient"
                        style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                      />
                      <button
                        onClick={() => setBackgroundColor('')}
                        style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Header Background Color */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Header Background:</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={headerBackgroundColor || '#0070f3'}
                        onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                        style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={headerBackgroundColor}
                        onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                        placeholder="e.g., #0070f3 or gradient"
                        style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                      />
                      <button
                        onClick={() => setHeaderBackgroundColor('')}
                        style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Text Color */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Text Color:</label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input
                        type="color"
                        value={textColor || '#111827'}
                        onChange={(e) => setTextColor(e.target.value)}
                        style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        placeholder="e.g., #111827 or gradient"
                        style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                      />
                      <button
                        onClick={() => setTextColor('')}
                        style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Reset
                      </button>
                    </div>
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
                        placeholder="e.g., #d1d5db or gradient"
                        style={{ flex: 1, padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', fontSize: '12px', background: 'var(--color-background)', color: 'var(--color-text)' }}
                      />
                      <button
                        onClick={() => setBorderColor('')}
                        style={{ padding: '6px 8px', border: '1px solid var(--color-border)', borderRadius: '4px', background: 'var(--color-background)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '12px' }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Advanced Gradient Builder */}
                <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
                  <h4 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)', fontSize: '14px', fontWeight: '600' }}>🎨 Advanced Gradient Builder</h4>
                  
                  <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                    {/* Gradient Type */}
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600', color: 'var(--color-text)', fontSize: '12px' }}>
                        Gradient Type:
                      </label>
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
                          width: '100%',
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      >
                        <option value="linear">Linear</option>
                        <option value="radial">Radial</option>
                        <option value="conic">Conic</option>
                      </select>
                    </div>
                    
                    {/* Gradient Direction */}
                <div>
                      <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600', color: 'var(--color-text)', fontSize: '12px' }}>
                        Direction:
                      </label>
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
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px'
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Gradient Colors */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600', color: 'var(--color-text)', fontSize: '12px' }}>
                      Colors:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      {gradientColors.map((color, index) => (
                        <div key={index} style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                          <input 
                            type="color" 
                            value={color}
                            onChange={(e) => {
                              const newColors = [...gradientColors];
                              newColors[index] = e.target.value;
                              setGradientColors(newColors);
                            }}
                            style={{ width: '28px', height: '28px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
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
                          padding: '6px 12px',
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
                  
                  {/* Gradient Preview */}
                  <div style={{ marginTop: '0.75rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600', color: 'var(--color-text)', fontSize: '12px' }}>
                      Preview:
                    </label>
                    <div 
                      style={{
                        width: '100%',
                        height: '32px',
                        background: generateGradient(),
                        borderRadius: 'var(--border-radius)',
                        border: '1px solid var(--color-border)',
                        marginBottom: '0.5rem'
                      }}
                    />
                    <code style={{ 
                      display: 'block',
                      padding: '0.5rem',
                      backgroundColor: 'var(--color-background-tertiary)',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: 'var(--color-text)',
                      wordBreak: 'break-all'
                    }}>
                      {generateGradient()}
                    </code>
                  </div>
                  
                  {/* Apply Buttons */}
                  <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => applyGradientToTarget('background')}
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
                      onClick={() => applyGradientToTarget('header')}
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
                      Apply to Header
                    </button>
                    <button
                      onClick={() => applyGradientToTarget('text')}
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
                      Apply to Text
                    </button>
                    <button
                      onClick={() => applyGradientToTarget('border')}
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
                  </div>
                </div>
                
                <div>
                  <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Shadow:</label>
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
                  <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Hover Effect:</label>
                  <Dropdown
                    options={[
                      { label: 'None', value: 'none' },
                      { label: 'Lift', value: 'lift' },
                      { label: 'Glow', value: 'glow' },
                      { label: 'Scale', value: 'scale' },
                      { label: 'Slide', value: 'slide' }
                    ]}
                    value={hoverEffect}
                    onChange={(value) => setHoverEffect(value as any)}
                    placeholder="Select hover effect"
                    size="sm"
                  />
                </div>
                
                <div>
                  <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px', color: 'var(--color-text)' }}>Size:</label>
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
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox
                    checked={rounded}
                    onChange={(checked) => setRounded(checked)}
                    label="Rounded"
                    size="sm"
                  />
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Checkbox
                    checked={clickable}
                    onChange={(checked) => setClickable(checked)}
                    label="Clickable"
                    size="sm"
                  />
                </div>
              </div>
              
              {/* Reset Button */}
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button 
                  onClick={resetCustomStyling}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  🔄 Reset All Custom Styling
                </button>
              </div>
              
              <div style={{ marginTop: '20px', padding: '16px', background: 'var(--color-info)', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <p style={{ margin: 0, fontSize: '14px', color: 'var(--color-text)' }}>
                  <strong>Tip:</strong> Try different combinations! The card updates in real-time.
                </p>
              </div>
            </div>

            {/* Preview Panel */}
            <div style={{ 
              padding: '20px', 
              background: 'var(--color-background)', 
              borderRadius: '8px', 
              border: '1px solid var(--color-border)'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>
                👀 Live Preview
              </h3>
              
              <Card
                variant={variant}
                size={size}
                color={backgroundColor.trim() || undefined}
                gradient={backgroundColor.includes('gradient') ? backgroundColor : undefined}
                textColor={textColor.trim() || undefined}
                borderColor={borderColor.trim() || undefined}
                headerBackgroundColor={headerBackgroundColor.trim() || undefined}
                shadow={shadow}
                hoverEffect={hoverEffect}
                rounded={rounded}
                clickable={clickable}
                title="Custom Themed Card"
                subtitle="Interactive Preview"
                description="This card showcases all your custom theme settings in real-time!"
                image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop"
                imageAlt="Mountain landscape"
                badge="NEW"
                actions={
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" variant="outline">Action 1</Button>
                    <Button size="sm" variant="primary">Action 2</Button>
                  </div>
                }
                footer="Card footer with additional information"
                onClick={clickable ? () => setClickCount(prev => prev + 1) : undefined}
                maxWidth="400px"
              >
                <div>
                  <p>This card demonstrates all the customization options you've selected:</p>
                  <ul style={{ marginTop: '12px', paddingLeft: '20px' }}>
                    <li>Variant: {variant}</li>
                    <li>Background: {backgroundColor.trim() || 'Theme default'}</li>
                    <li>Header background: {headerBackgroundColor.trim() || 'Theme default'}</li>
                    <li>Text color: {textColor.trim() || 'Theme default'}</li>
                    <li>Border color: {borderColor.trim() || 'Theme default'}</li>
                    <li>Shadow level: {shadow}</li>
                    <li>Hover effect: {hoverEffect}</li>
                    <li>Size: {size}</li>
                    <li>Rounded: {rounded ? 'Yes' : 'No'}</li>
                    <li>Clickable: {clickable ? 'Yes' : 'No'}</li>
                  </ul>
                  {clickable && (
                    <p style={{ marginTop: '12px', fontWeight: '600', color: 'var(--color-primary)' }}>
                      Clicks: {clickCount}
                    </p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
