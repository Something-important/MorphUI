// Card.stories.tsx
import React, { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { Card, Button } from '../../index';

export default {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A highly customizable card component with support for variants, sizes, colors, gradients, hover effects, images, badges, and advanced theming. Perfect for content containers, product displays, and information cards.',
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
    (Story: React.FC) => (
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
    children: <p>This is the main content area of the card. You can put any content here.</p>,
  },
  render: (args) => <Card {...args} />,
};

// Variants showcase
export const Variants: StoryObj<typeof Card> = {
  render: () => {
    const variants = [
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'ghost',
      'outline',
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          🎨 Card Variants
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {variants.map((variant) => (
            <Card
              key={variant}
              variant={variant}
              title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Card`}
              subtitle={`${variant} variant example`}
              description={`This card demonstrates the ${variant} variant with its unique styling.`}
              actions={
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                  <Button size="sm" variant="primary">
                    Action
                  </Button>
                </div>
              }
              footer={`${variant.charAt(0).toUpperCase() + variant.slice(1)} variant footer`}
            >
              <p>
                The {variant} variant provides a distinct visual style while maintaining
                consistency.
              </p>
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
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          📏 Card Sizes
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sizes.map((size) => (
            <Card
              key={size.key}
              size={size.key}
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
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          ✨ Hover Effects
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {effects.map((effect) => (
            <Card
              key={effect.key}
              hoverEffect={effect.key}
              clickable
              title={effect.label}
              subtitle="Hover to see effect"
              description={effect.description}
              onClick={() => console.log(`${effect.label} card clicked`)}
              style={{ maxWidth: '280px' }}
            >
              <p>
                Hover over this card to see the <strong>{effect.label.toLowerCase()}</strong> effect
                in action!
              </p>
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
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3
          style={{
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
            color: 'var(--color-text)',
          }}
        >
          🖼️ Image Positioning
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
          }}
        >
          {positions.map((position) => (
            <Card
              key={position.key}
              imagePosition={position.key}
              title={`${position.label} Image Card`}
              subtitle={`Image positioned at ${position.label.toLowerCase()}`}
              description={`This card demonstrates image positioning at the ${position.label.toLowerCase()}.`}
              image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
              imageAlt="Mountain landscape"
              style={{ maxWidth: '400px' }}
            >
              <p>
                The image is positioned at the <strong>{position.label.toLowerCase()}</strong> of
                the card.
              </p>
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

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px',
          }}
        >
          {/* Clickable Card */}
          <Card
            clickable
            title="Clickable Card"
            subtitle="Interactive card with ripple effect"
            description="This card can be clicked and shows a ripple effect."
            onClick={() => setClickCount((prev) => prev + 1)}
            hoverEffect="lift"
            badge="CLICK"
            actions={
              <div style={{ display: 'flex', gap: '8px' }}>
                <Button size="sm" variant="outline">
                  Secondary
                </Button>
                <Button size="sm" variant="primary">
                  Primary
                </Button>
              </div>
            }
            footer={`Clicked ${clickCount} times`}
          >
            <p>Click this card to see the ripple effect and increment the counter!</p>
            <p>
              Current clicks: <strong>{clickCount}</strong>
            </p>
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
                <Button size="sm" variant="outline">
                  View
                </Button>
                <Button size="sm" variant="success">
                  Success
                </Button>
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
                <Button size="sm" variant="outline" disabled>
                  Disabled
                </Button>
                <Button size="sm" variant="primary" disabled>
                  Action
                </Button>
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
  render: (args) => <Card {...args} />,
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
  render: (args) => <Card {...args} />,
};

// Interactive Theme Builder
