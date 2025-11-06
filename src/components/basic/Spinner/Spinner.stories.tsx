// Spinner.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../Button';

export default {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile loading spinner component with multiple animation styles, sizes, and full theming support. Perfect for indicating loading states throughout your application.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'error', 'info'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    animation: {
      control: { type: 'select' },
      options: ['spin', 'pulse', 'dots', 'bars', 'wave'],
    },
    fullScreen: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof Spinner>;

// Default
export const Default: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    animation: 'spin',
  },
};

// Animations
export const Animations: Story = {
  render: () => {
    const animations: Array<'spin' | 'pulse' | 'dots' | 'bars' | 'wave'> = [
      'spin',
      'pulse',
      'dots',
      'bars',
      'wave',
    ];

    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {animations.map((animation) => (
          <div key={animation} style={{ textAlign: 'center' }}>
            <Spinner animation={animation} size="lg" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {animation.charAt(0).toUpperCase() + animation.slice(1)}
            </p>
          </div>
        ))}
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <Spinner size={size} />
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {size.toUpperCase()}
            </p>
          </div>
        ))}
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const variants: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info',
    ];

    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {variants.map((variant) => (
          <div key={variant} style={{ textAlign: 'center' }}>
            <Spinner variant={variant} size="lg" />
            <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </p>
          </div>
        ))}
      </div>
    );
  },
};

// With label
export const WithLabel: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
        <Spinner label="Loading..." />
        <Spinner label="Processing..." variant="success" />
        <Spinner label="Please wait..." variant="warning" size="lg" />
      </div>
    );
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Colors
          </h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Spinner color="#8b5cf6" size="lg" />
            <Spinner color="#f97316" size="lg" />
            <Spinner color="#06b6d4" size="lg" />
            <Spinner color="#ec4899" size="lg" />
          </div>
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌈 Gradient Spinners
          </h3>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Spinner
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              size="lg"
              animation="spin"
            />
            <Spinner
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              size="lg"
              animation="pulse"
            />
            <Spinner
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              size="lg"
              animation="dots"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Full screen
export const FullScreen: Story = {
  render: () => {
    const [showFullScreen, setShowFullScreen] = useState(false);

    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <Button onClick={() => setShowFullScreen(!showFullScreen)}>
          {showFullScreen ? 'Hide' : 'Show'} Full Screen Spinner
        </Button>
        {showFullScreen && <Spinner fullScreen label="Loading..." variant="primary" size="lg" />}
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>('light');

    return (
      <ThemeProvider theme={themes[theme]}>
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>Theme Switching Demo</h2>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              style={{
                padding: '10px 15px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
              }}
            >
              {Object.keys(themes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
                </option>
              ))}
            </select>
            <p style={{ marginTop: '10px', color: '#6b7280' }}>
              Current theme: <strong>{theme}</strong>
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '3rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="primary" size="lg" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Primary</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="success" size="lg" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Success</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="warning" size="lg" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Warning</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Spinner variant="error" size="lg" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Error</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Usage examples
export const UsageExamples: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Inline with Text</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Spinner size="sm" />
            <span>Loading data...</span>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Button Loading State</h3>
          <Button disabled>
            <Spinner size="xs" variant="primary" />
            Processing...
          </Button>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Card Loading Overlay</h3>
          <div
            style={{
              position: 'relative',
              padding: '2rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              minHeight: '200px',
            }}
          >
            <Spinner size="lg" label="Loading content..." />
          </div>
        </div>
      </div>
    );
  },
};
