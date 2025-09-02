// Card.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button/Button';

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

// Interactive Theme Builder
export const InteractiveThemeBuilder: StoryObj<typeof Card> = {
  render: () => {
    const [customColor, setCustomColor] = useState('#0070f3');
    const [customGradient, setCustomGradient] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [hoverEffect, setHoverEffect] = useState<'none' | 'lift' | 'glow' | 'scale' | 'slide'>('lift');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [rounded, setRounded] = useState(false);
    const [clickable, setClickable] = useState(false);
    
    const [clickCount, setClickCount] = useState(0);

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
            Customize the Card appearance in real-time!
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
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="rounded"
                  checked={rounded}
                  onChange={(e) => setRounded(e.target.checked)}
                />
                <label htmlFor="rounded" style={{ fontSize: '14px' }}>Rounded</label>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  id="clickable"
                  checked={clickable}
                  onChange={(e) => setClickable(e.target.checked)}
                />
                <label htmlFor="clickable" style={{ fontSize: '14px' }}>Clickable</label>
              </div>
            </div>
            
            <div style={{ marginTop: '20px', padding: '16px', background: '#e0f2fe', borderRadius: '6px', border: '1px solid #0288d1' }}>
              <p style={{ margin: 0, fontSize: '14px', color: '#01579b' }}>
                <strong>Tip:</strong> Try different combinations! The card updates in real-time.
              </p>
            </div>
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
            
            <Card
              variant={variant}
              size={size}
              color={customColor}
              gradient={customGradient}
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
                  <li>Custom color: {customColor}</li>
                  <li>Custom gradient: {customGradient}</li>
                  <li>Shadow level: {shadow}</li>
                  <li>Hover effect: {hoverEffect}</li>
                  <li>Size: {size}</li>
                  <li>Rounded: {rounded ? 'Yes' : 'No'}</li>
                  <li>Clickable: {clickable ? 'Yes' : 'No'}</li>
                </ul>
                {clickable && (
                  <p style={{ marginTop: '12px', fontWeight: '600', color: '#0070f3' }}>
                    Clicks: {clickCount}
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  },
};

// Variants showcase
export const Variants: StoryObj<typeof Card> = {
  render: () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'ghost', 'outline'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
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
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
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
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
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
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
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
