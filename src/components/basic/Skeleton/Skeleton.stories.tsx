// Skeleton.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Card } from '../../interactive/Card';
import { Avatar } from '../Avatar';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Animated loading placeholder component for better UX during content loading. Supports multiple variants, sizes, and can be combined to create skeleton screens. Perfect for improving perceived performance and reducing layout shift.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['text', 'circular', 'rectangular', 'rounded'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    animated: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Skeleton>;

type Story = StoryObj<typeof Skeleton>;

// Default
export const Default: Story = {
  args: {
    variant: 'text',
    size: 'md',
    animated: true,
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const variants: Array<'text' | 'circular' | 'rectangular' | 'rounded'> = [
      'text',
      'circular',
      'rectangular',
      'rounded',
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        {variants.map((variant) => (
          <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </p>
            <Skeleton variant={variant} size="lg" />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
        {sizes.map((size) => (
          <div key={size} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#666', minWidth: '60px' }}>
              {size.toUpperCase()}
            </span>
            <Skeleton variant="text" size={size} width="200px" />
          </div>
        ))}
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
            🎨 Custom Background Colors
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Skeleton variant="text" backgroundColor="#8b5cf6" width="300px" />
            <Skeleton variant="text" backgroundColor="#f97316" width="250px" />
            <Skeleton variant="text" backgroundColor="#06b6d4" width="280px" />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Circular with Custom Colors
          </h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Skeleton variant="circular" size="lg" backgroundColor="#8b5cf6" />
            <Skeleton variant="circular" size="lg" backgroundColor="#f97316" />
            <Skeleton variant="circular" size="lg" backgroundColor="#06b6d4" />
          </div>
        </div>
      </div>
    );
  },
};

// Custom dimensions
export const CustomDimensions: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
        <Skeleton variant="rectangular" width="100%" height="120px" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="90%" />
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Skeleton variant="circular" width={60} height={60} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </div>
        </div>
      </div>
    );
  },
};

// Multiple skeletons
export const Multiple: Story = {
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <Skeleton variant="text" count={3} />
        <div style={{ marginTop: '2rem' }}>
          <Skeleton variant="text" count={5} width="80%" />
        </div>
      </div>
    );
  },
};

// Animated vs static
export const AnimatedVsStatic: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Animated</p>
          <Skeleton variant="text" animated width="300px" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>Static</p>
          <Skeleton variant="text" animated={false} width="300px" />
        </div>
      </div>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        <h2 style={{ marginBottom: '2rem' }}>Skeleton Screen Examples</h2>

        {/* Card skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Card Skeleton</h3>
          <Card>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <Skeleton variant="circular" size="lg" />
              <div style={{ flex: 1 }}>
                <Skeleton variant="text" width="60%" style={{ marginBottom: '0.5rem' }} />
                <Skeleton variant="text" width="40%" />
              </div>
            </div>
            <Skeleton variant="rectangular" height="200px" style={{ marginBottom: '1rem' }} />
            <Skeleton variant="text" count={3} />
          </Card>
        </div>

        {/* List skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>List Skeleton</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Skeleton variant="circular" size="md" />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="70%" style={{ marginBottom: '0.25rem' }} />
                  <Skeleton variant="text" width="50%" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile skeleton */}
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Profile Skeleton</h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
          >
            <Skeleton variant="circular" size="xl" />
            <Skeleton variant="text" width="200px" />
            <Skeleton variant="text" width="150px" />
            <div style={{ width: '100%', marginTop: '1rem' }}>
              <Skeleton variant="text" count={4} />
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = React.useState<ThemeName>('light');

    return (
      <ThemeProvider theme={themes[theme]}>
        <div style={{ padding: '20px' }}>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Text Skeletons</h3>
              <Skeleton variant="text" count={3} />
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem' }}>Circular Skeleton</h3>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Skeleton variant="circular" size="lg" />
                <Skeleton variant="circular" size="md" />
                <Skeleton variant="circular" size="sm" />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem' }}>Rectangular Skeleton</h3>
              <Skeleton variant="rectangular" height="120px" />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
