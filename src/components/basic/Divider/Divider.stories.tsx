// Divider.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../Button';

export default {
  title: 'Components/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A divider component used to separate content sections. Supports horizontal and vertical orientations, multiple variants (solid, dashed, dotted), sizes, and optional text labels.',
      },
    },
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'dashed', 'dotted'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof Divider>;

// Default
export const Default: Story = {
  args: {
    orientation: 'horizontal',
  },
};

// Orientations
export const Orientations: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Horizontal</h3>
          <div style={{ padding: '1rem' }}>
            <p>Content above</p>
            <Divider orientation="horizontal" />
            <p>Content below</p>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Vertical</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
            <Button>Left</Button>
            <Divider orientation="vertical" style={{ height: '40px' }} />
            <Button>Right</Button>
          </div>
        </div>
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Solid (default)</h3>
          <Divider variant="solid" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Dashed</h3>
          <Divider variant="dashed" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Dotted</h3>
          <Divider variant="dotted" />
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Extra Small (xs)</h3>
          <Divider size="xs" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Small (sm)</h3>
          <Divider size="sm" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Medium (md)</h3>
          <Divider size="md" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Large (lg)</h3>
          <Divider size="lg" />
        </div>
      </div>
    );
  },
};

// With text
export const WithText: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Center (default)</h3>
          <Divider text="OR" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Left</h3>
          <Divider text="Section Title" textPosition="left" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Right</h3>
          <Divider text="Section Title" textPosition="right" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Text</h3>
          <Divider text={<strong>Custom Content</strong>} />
        </div>
      </div>
    );
  },
};

// Spacing
export const Spacing: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <p>Content above</p>
          <Divider spacing="xs" />
          <p>Content below (xs spacing)</p>
        </div>
        <div>
          <p>Content above</p>
          <Divider spacing="sm" />
          <p>Content below (sm spacing)</p>
        </div>
        <div>
          <p>Content above</p>
          <Divider spacing="md" />
          <p>Content below (md spacing)</p>
        </div>
        <div>
          <p>Content above</p>
          <Divider spacing="lg" />
          <p>Content below (lg spacing)</p>
        </div>
        <div>
          <p>Content above</p>
          <Divider spacing="xl" />
          <p>Content below (xl spacing)</p>
        </div>
      </div>
    );
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Color</h3>
          <Divider color="#8b5cf6" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Color with Text</h3>
          <Divider text="OR" color="#ef4444" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Dashed with Custom Color</h3>
          <Divider variant="dashed" color="#10b981" />
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gradient Divider</h3>
          <Divider gradient="linear-gradient(90deg, #667eea 0%, #764ba2 100%)" size="lg" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gradient with Text</h3>
          <Divider text="OR" gradient="linear-gradient(90deg, #f093fb 0%, #f5576c 100%)" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Vertical Gradient</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', height: '100px' }}>
            <Button>Left</Button>
            <Divider
              orientation="vertical"
              gradient="linear-gradient(180deg, #667eea 0%, #764ba2 100%)"
              size="lg"
            />
            <Button>Right</Button>
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
              <p>Content above</p>
              <Divider />
              <p>Content below</p>
            </div>
            <div>
              <Divider text="OR" />
            </div>
            <div>
              <Divider variant="dashed" />
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Form Section Divider</h3>
          <div style={{ padding: '1.5rem', background: '#f9fafb', borderRadius: '8px' }}>
            <h4>Personal Information</h4>
            <Divider spacing="md" />
            <p>Form fields here...</p>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Login Form Divider</h3>
          <div
            style={{
              maxWidth: '400px',
              padding: '2rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            <Button style={{ width: '100%' }}>Sign in with Google</Button>
            <Divider text="OR" spacing="md" />
            <Button variant="outline" style={{ width: '100%' }}>
              Sign in with Email
            </Button>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Vertical Navigation</h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Button>Home</Button>
            <Divider orientation="vertical" style={{ height: '30px' }} />
            <Button>About</Button>
            <Divider orientation="vertical" style={{ height: '30px' }} />
            <Button>Contact</Button>
          </div>
        </div>
      </div>
    );
  },
};
