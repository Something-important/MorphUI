import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from './Accordion';
import { Button } from '../Button/Button';
import { ThemeProvider } from '../theme/ThemeProvider';

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
    descriptionTextColor: {
      control: { type: 'color' },
    },
    iconColor: {
      control: { type: 'color' },
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale', 'slide'],
    },
    rounded: {
      control: { type: 'boolean' },
    },
    bordered: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    icon: {
      control: { type: 'text' },
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
    },
    animation: {
      control: { type: 'select' },
      options: ['slide', 'fade', 'scale', 'none'],
    },
    animationDuration: {
      control: { type: 'range', min: 100, max: 1000, step: 50 },
    },
    maxHeight: {
      control: { type: 'text' },
    },
    glassmorphism: {
      control: { type: 'boolean' },
    },
    backgroundPattern: {
      control: { type: 'text' },
    },
    backgroundImage: {
      control: { type: 'text' },
    },
    backgroundBlend: {
      control: { type: 'select' },
      options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],
    },
    className: {
      control: { type: 'text' },
    },
    style: {
      control: { type: 'object' },
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ padding: '20px', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default: StoryObj<typeof Accordion> = {
  args: {
    title: 'Click to expand',
    children: (
      <div>
        <p>This is the hidden content that shows when expanded.</p>
        <p>You can put any content here - text, images, forms, or other components.</p>
      </div>
    ),
  },
  render: (args: any) => {
    const [isOpen, setIsOpen] = useState(args.defaultOpen);
    return (
      <Accordion
        {...args}
        defaultOpen={isOpen}
        onToggle={setIsOpen}
      />
    );
  },
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: StoryObj<typeof Accordion> = {
  render: () => {
    const [customColor, setCustomColor] = useState('#0070f3');
    const [customGradient, setCustomGradient] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [headerBackgroundColor, setHeaderBackgroundColor] = useState('#f8fafc');
    const [contentBackgroundColor, setContentBackgroundColor] = useState('transparent');
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [hoverEffect, setHoverEffect] = useState<'none' | 'lift' | 'glow' | 'scale' | 'slide'>('lift');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [rounded, setRounded] = useState(false);
    const [bordered, setBordered] = useState(true);
    const [animation, setAnimation] = useState<'slide' | 'fade' | 'scale' | 'none'>('slide');
    const [iconPosition, setIconPosition] = useState<'left' | 'right'>('right');
    const [animationDuration, setAnimationDuration] = useState(300);
    
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ 
          padding: '20px', 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          borderRadius: '12px', 
          color: 'white',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '700' }}>
            🎨 Interactive Theme Builder
          </h2>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
            Customize the Accordion appearance in real-time!
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Controls Panel */}
          <div style={{ 
            padding: '20px', 
            background: '#f8fafc', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0',
            height: 'fit-content'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
              🎛️ Customization Controls
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Variant:</label>
                <select
                  value={variant}
                  onChange={(e) => setVariant(e.target.value as any)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
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
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Size:</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value as any)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Custom Color:</label>
                <input
                  type="color"
                  value={customColor}
                  onChange={(e) => setCustomColor(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Custom Gradient:</label>
                <input
                  type="text"
                  value={customGradient}
                  onChange={(e) => setCustomGradient(e.target.value)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                  placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Background Color:</label>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Header Background:</label>
                <input
                  type="color"
                  value={headerBackgroundColor}
                  onChange={(e) => setHeaderBackgroundColor(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Content Background:</label>
                <input
                  type="color"
                  value={contentBackgroundColor}
                  onChange={(e) => setContentBackgroundColor(e.target.value)}
                  style={{ width: '100%', height: '40px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Shadow:</label>
                <select
                  value={shadow}
                  onChange={(e) => setShadow(e.target.value as any)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="none">None</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Hover Effect:</label>
                <select
                  value={hoverEffect}
                  onChange={(e) => setHoverEffect(e.target.value as any)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="none">None</option>
                  <option value="lift">Lift</option>
                  <option value="glow">Glow</option>
                  <option value="scale">Scale</option>
                  <option value="slide">Slide</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Animation:</label>
                <select
                  value={animation}
                  onChange={(e) => setAnimation(e.target.value as any)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="slide">Slide</option>
                  <option value="fade">Fade</option>
                  <option value="scale">Scale</option>
                  <option value="none">None</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Icon Position:</label>
                <select
                  value={iconPosition}
                  onChange={(e) => setIconPosition(e.target.value as any)}
                  style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
                >
                  <option value="left">Left</option>
                  <option value="right">Right</option>
                </select>
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Animation Duration (ms):</label>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={animationDuration}
                  onChange={(e) => setAnimationDuration(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
                <span style={{ fontSize: '12px', color: '#666' }}>{animationDuration}ms</span>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="rounded"
                  checked={rounded}
                  onChange={(e) => setRounded(e.target.checked)}
                />
                <label htmlFor="rounded" style={{ fontSize: '14px' }}>Rounded</label>
              </div>
              
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id="bordered"
                  checked={bordered}
                  onChange={(e) => setBordered(e.target.checked)}
                />
                <label htmlFor="bordered" style={{ fontSize: '14px' }}>Bordered</label>
              </div>
            </div>
            
            <Button onClick={() => setIsOpen(!isOpen)} variant="primary" fullWidth style={{ marginTop: '20px' }}>
              Toggle Accordion
            </Button>
          </div>

          {/* Preview Panel */}
          <div style={{ 
            padding: '20px', 
            background: '#ffffff', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
              👀 Live Preview
            </h3>
            
            <Accordion
              defaultOpen={isOpen}
              onToggle={setIsOpen}
              variant={variant}
              size={size}
              color={customColor}
              gradient={customGradient}
              backgroundColor={backgroundColor}
              headerBackgroundColor={headerBackgroundColor}
              contentBackgroundColor={contentBackgroundColor}
              shadow={shadow}
              hoverEffect={hoverEffect}
              rounded={rounded}
              bordered={bordered}
              animation={animation}
              iconPosition={iconPosition}
              animationDuration={animationDuration}
              title="🎨 Interactive Theme Builder Accordion"
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '16px', color: 'inherit' }}>✨ Enhanced Theming Capabilities</h4>
                <p style={{ marginBottom: '16px', color: 'inherit' }}>
                  This accordion demonstrates all the new theming capabilities:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', textAlign: 'left' }}>
                  <div>
                    <h5 style={{ color: 'inherit', marginBottom: '8px' }}>🎨 Visual Features</h5>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                      <li>8 variant styles</li>
                      <li>5 size options</li>
                      <li>Custom colors & gradients</li>
                      <li>5 shadow levels</li>
                      <li>5 hover effects</li>
                    </ul>
                  </div>
                  <div>
                    <h5 style={{ color: 'inherit', marginBottom: '8px' }}>🌟 Advanced Features</h5>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px' }}>
                      <li>4 animation types</li>
                      <li>Icon positioning</li>
                      <li>Loading states</li>
                      <li>Disabled states</li>
                      <li>Rounded corners</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    );
  },
};

// Variants showcase
export const Variants: StoryObj<typeof Accordion> = {
  render: () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>🎨 Accordion Variants</h3>
        {variants.map((variant) => (
          <Accordion
            key={variant}
            variant={variant as any}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
            defaultOpen={variant === 'primary'}
          >
            <p>This is the <strong>{variant}</strong> variant of the accordion component.</p>
            <p>Each variant has its own color scheme and styling that integrates with the design system.</p>
          </Accordion>
        ))}
      </div>
    );
  },
};

// Sizes showcase
export const Sizes: StoryObj<typeof Accordion> = {
  render: () => {
    const sizes = [
      { size: 'xs', label: 'Extra Small', content: 'Compact accordion for tight spaces.' },
      { size: 'sm', label: 'Small', content: 'Small accordion for secondary content.' },
      { size: 'md', label: 'Medium', content: 'Standard accordion size for most use cases.' },
      { size: 'lg', label: 'Large', content: 'Large accordion for prominent content.' },
      { size: 'xl', label: 'Extra Large', content: 'Extra large accordion for maximum visibility.' },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>📏 Accordion Sizes</h3>
        {sizes.map(({ size, label, content }) => (
          <Accordion
            key={size}
            size={size as any}
            title={`${label} Accordion`}
            defaultOpen={size === 'md'}
          >
            <p>{content}</p>
            <p>This accordion uses the <code>{size}</code> size variant.</p>
          </Accordion>
        ))}
      </div>
    );
  },
};

// Hover effects showcase
export const HoverEffects: StoryObj<typeof Accordion> = {
  render: () => {
    const effects = [
      { effect: 'none', label: 'No Effect', description: 'No hover animation' },
      { effect: 'lift', label: 'Lift', description: 'Lifts up on hover' },
      { effect: 'glow', label: 'Glow', description: 'Glows with theme color' },
      { effect: 'scale', label: 'Scale', description: 'Scales up slightly' },
      { effect: 'slide', label: 'Slide', description: 'Slides to the right' },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>🌟 Hover Effects</h3>
        <p style={{ marginBottom: '16px', color: '#666' }}>Hover over each accordion to see the different effects:</p>
        {effects.map(({ effect, label, description }) => (
          <Accordion
            key={effect}
            hoverEffect={effect as any}
            title={`${label} Effect`}
            defaultOpen={effect === 'none'}
          >
            <p><strong>{description}</strong></p>
            <p>This accordion uses the <code>{effect}</code> hover effect.</p>
          </Accordion>
        ))}
      </div>
    );
  },
};

// Animations showcase
export const Animations: StoryObj<typeof Accordion> = {
  render: () => {
    const animations = [
      { animation: 'slide', label: 'Slide', description: 'Smooth slide animation' },
      { animation: 'fade', label: 'Fade', description: 'Fade in/out effect' },
      { animation: 'scale', label: 'Scale', description: 'Scale animation' },
      { animation: 'none', label: 'None', description: 'No animation' },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>🎭 Animation Types</h3>
        <p style={{ marginBottom: '16px', color: '#666' }}>Click each accordion to see the different animations:</p>
        {animations.map(({ animation, label, description }) => (
          <Accordion
            key={animation}
            animation={animation as any}
            title={`${label} Animation`}
            defaultOpen={animation === 'slide'}
          >
            <p><strong>{description}</strong></p>
            <p>This accordion uses the <code>{animation}</code> animation type.</p>
          </Accordion>
        ))}
      </div>
    );
  },
};

// Advanced features showcase
export const AdvancedFeatures: StoryObj<typeof Accordion> = {
  render: () => {
    const [loadingAccordion, setLoadingAccordion] = useState(false);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>🚀 Advanced Features</h3>
        
        {/* Custom Icon */}
        <Accordion
          title="🎯 Custom Icon Accordion"
          icon="⭐"
          iconPosition="left"
          defaultOpen={true}
        >
          <p>This accordion uses a custom star icon positioned on the left.</p>
          <p>You can use any React node as an icon, including emojis, SVGs, or custom components.</p>
        </Accordion>
        
        {/* Loading State */}
        <Accordion
          title="⏳ Loading State Accordion"
          loading={loadingAccordion}
          defaultOpen={true}
        >
          <p>This accordion demonstrates the loading state with a spinner.</p>
          <Button 
            size="sm" 
            variant="primary" 
            onClick={() => {
              setLoadingAccordion(true);
              setTimeout(() => setLoadingAccordion(false), 3000);
            }}
          >
            Toggle Loading
          </Button>
        </Accordion>
        
        {/* Disabled State */}
        <Accordion
          title="🚫 Disabled Accordion"
          disabled={true}
          defaultOpen={true}
        >
          <p>This content cannot be accessed because the accordion is disabled.</p>
        </Accordion>
        
        {/* Rounded Variant */}
        <Accordion
          title="🔵 Rounded Accordion"
          rounded={true}
          variant="info"
          defaultOpen={true}
        >
          <p>This accordion has fully rounded corners for a softer appearance.</p>
          <p>Great for design systems that emphasize friendliness.</p>
        </Accordion>
        
        {/* Custom Colors */}
        <Accordion
          title="🌈 Custom Colored Accordion"
          backgroundColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          headerBackgroundColor="rgba(255, 255, 255, 0.1)"
          contentBackgroundColor="rgba(255, 255, 255, 0.05)"
          textColor="white"
          shadow="xl"
          defaultOpen={true}
        >
          <p>This accordion uses custom background colors and gradients.</p>
          <p>Perfect for creating unique visual designs that match your brand.</p>
        </Accordion>
      </div>
    );
  },
};

// Simple accordion
export const Simple: StoryObj<typeof Accordion> = {
  args: {
    title: 'Simple Accordion',
    children: (
      <div>
        <p>This is a simple accordion without any special styling.</p>
        <p>Perfect for basic content organization.</p>
      </div>
    ),
  },
  render: (args: any) => (
    <Accordion {...args} />
  ),
};

// Multiple accordions
export const MultipleAccordions: StoryObj<typeof Accordion> = {
  render: () => {
    const accordions = [
      {
        title: 'Getting Started',
        content: 'Learn the basics of our platform and how to get up and running quickly.',
        variant: 'primary' as const,
      },
      {
        title: 'Advanced Features',
        content: 'Explore advanced features and customization options for power users.',
        variant: 'success' as const,
      },
      {
        title: 'Troubleshooting',
        content: 'Common issues and their solutions to help you resolve problems quickly.',
        variant: 'warning' as const,
      },
      {
        title: 'API Reference',
        content: 'Complete API documentation with examples and code snippets.',
        variant: 'info' as const,
      },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '20px', fontWeight: '600' }}>📚 Multiple Accordions</h3>
        <p style={{ marginBottom: '16px', color: '#666' }}>A collection of accordions for organizing related content:</p>
        
        {accordions.map((accordion, index) => (
          <Accordion
            key={index}
            title={accordion.title}
            variant={accordion.variant}
            defaultOpen={index === 0}
          >
            <p>{accordion.content}</p>
            <div style={{ marginTop: '12px' }}>
              <Button size="sm" variant="outline">Learn More</Button>
              <Button size="sm" variant="primary" style={{ marginLeft: '8px' }}>Get Started</Button>
            </div>
          </Accordion>
        ))}
      </div>
    );
  },
};

export const AdvancedTheming: StoryObj<typeof Accordion> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Accordion
        title="Glassmorphism Accordion"
        glassmorphism={true}
        backgroundColor="rgba(59, 130, 246, 0.3)"
        titleTextColor="#1e40af"
        iconColor="#1e40af"
      >
        <p>This accordion uses glassmorphism effect with custom colors.</p>
      </Accordion>

      <Accordion
        title="Red Background Accordion"
        backgroundColor="#fee2e2"
        titleTextColor="#dc2626"
        iconColor="#dc2626"
        borderColor="#fecaca"
      >
        <p>This accordion has a light red background with red text and border.</p>
      </Accordion>

      <Accordion
        title="Green Background Accordion"
        backgroundColor="#dcfce7"
        titleTextColor="#166534"
        iconColor="#166534"
        borderColor="#bbf7d0"
      >
        <p>This accordion has a light green background with dark green text.</p>
      </Accordion>

      <Accordion
        title="Purple Pattern Accordion"
        backgroundPattern="radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.4) 0%, rgba(255, 255, 255, 0) 50%)"
        backgroundColor="rgba(147, 51, 234, 0.1)"
        titleTextColor="#7c3aed"
        iconColor="#7c3aed"
      >
        <p>This accordion uses a custom background pattern with radial gradient.</p>
      </Accordion>
    </div>
  ),
};

export const TextColorTest: StoryObj<typeof Accordion> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Accordion
        title="BLUE TEXT ACCORDION"
        titleTextColor="#0000FF"
        iconColor="#0000FF"
        backgroundColor="#ffffff"
      >
        <p>This accordion should have BLUE text and icon.</p>
      </Accordion>

      <Accordion
        title="RED TEXT ACCORDION"
        titleTextColor="#FF0000"
        iconColor="#FF0000"
        backgroundColor="#ffffff"
      >
        <p>This accordion should have RED text and icon.</p>
      </Accordion>

      <Accordion
        title="GREEN TEXT ACCORDION"
        titleTextColor="#00FF00"
        iconColor="#00FF00"
        backgroundColor="#ffffff"
      >
        <p>This accordion should have GREEN text and icon.</p>
      </Accordion>

      <Accordion
        title="PURPLE TEXT ACCORDION"
        titleTextColor="#800080"
        iconColor="#800080"
        backgroundColor="#ffffff"
      >
        <p>This accordion should have PURPLE text and icon.</p>
      </Accordion>
    </div>
  ),
};

export const DebugTheming: StoryObj<typeof Accordion> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1rem', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
        <h3>Debug Info - Check Browser Dev Tools</h3>
        <p>Open browser dev tools and inspect the accordion elements to see the CSS custom properties.</p>
      </div>
      
      <Accordion
        title="RED BACKGROUND TEST"
        backgroundColor="#ff0000"
        titleTextColor="#ffffff"
        iconColor="#ffffff"
      >
        <p>This should have a RED background with WHITE text.</p>
      </Accordion>

      <Accordion
        title="BLUE BACKGROUND TEST"
        backgroundColor="#0000ff"
        titleTextColor="#ffffff"
        iconColor="#ffffff"
      >
        <p>This should have a BLUE background with WHITE text.</p>
      </Accordion>

      <Accordion
        title="GREEN BACKGROUND TEST"
        backgroundColor="#00ff00"
        titleTextColor="#000000"
        iconColor="#000000"
      >
        <p>This should have a GREEN background with BLACK text.</p>
      </Accordion>
    </div>
  ),
};
