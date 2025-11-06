// Progress.stories.tsx
import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../Button';

export default {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile progress indicator component supporting both linear and circular styles, determinate and indeterminate states, with full theming support. Perfect for showing task completion, file uploads, and loading states.',
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
    type: {
      control: { type: 'select' },
      options: ['linear', 'circular'],
    },
    striped: {
      control: { type: 'boolean' },
    },
    animated: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Progress>;

type Story = StoryObj<typeof Progress>;

// Default
export const Default: Story = {
  args: {
    value: 50,
    variant: 'primary',
    size: 'md',
    type: 'linear',
  },
};

// Types
export const Types: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'center' }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Linear Progress</h3>
          <Progress value={65} type="linear" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Circular Progress</h3>
          <Progress value={65} type="circular" showValue />
        </div>
      </div>
    );
  },
};

// Sizes - Linear
export const SizesLinear: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        {sizes.map((size) => (
          <div key={size}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {size.toUpperCase()}
            </p>
            <Progress value={60} size={size} type="linear" />
          </div>
        ))}
      </div>
    );
  },
};

// Sizes - Circular
export const SizesCircular: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {sizes.map((size) => (
          <div key={size} style={{ textAlign: 'center' }}>
            <Progress value={60} size={size} type="circular" showValue />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </p>
            <Progress value={65} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
};

// Determinate vs Indeterminate
export const DeterminateIndeterminate: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Determinate (with value)</h3>
          <Progress value={45} label="Upload Progress" showValue />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Indeterminate (loading)</h3>
          <Progress label="Processing..." />
        </div>
      </div>
    );
  },
};

// With labels and values
export const WithLabels: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <Progress value={75} label="Storage Used" showValue />
        <Progress value={50} label="Bandwidth" showValue />
        <Progress value={90} label="CPU Usage" showValue variant="warning" />
      </div>
    );
  },
};

// Striped and animated
export const StripedAnimated: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
        <div>
          <p style={{ marginBottom: '0.5rem' }}>Striped</p>
          <Progress value={60} striped />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem' }}>Animated Striped</p>
          <Progress value={60} striped animated />
        </div>
      </div>
    );
  },
};

// Animated progress (simulated)
export const AnimatedProgress: Story = {
  render: () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setValue((prev) => {
          if (prev >= 100) return 0;
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Animated Linear Progress</h3>
          <Progress value={value} label="Loading..." showValue />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Animated Circular Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Progress value={value} type="circular" showValue />
          </div>
        </div>
        <Button onClick={() => setValue(0)} size="sm">
          Reset
        </Button>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <Progress value={60} color="#8b5cf6" label="Purple Progress" />
            <Progress value={60} color="#f97316" label="Orange Progress" />
            <Progress value={60} color="#06b6d4" label="Cyan Progress" />
            <Progress value={60} color="#ec4899" label="Pink Progress" />
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
            🌈 Gradient Progress
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            <Progress
              value={60}
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              label="Purple Gradient"
            />
            <Progress
              value={60}
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              label="Pink Gradient"
            />
            <Progress
              value={60}
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              label="Blue Gradient"
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌈 Gradient Circular
          </h3>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Progress
              value={60}
              type="circular"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              showValue
              size="lg"
            />
            <Progress
              value={60}
              type="circular"
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              showValue
              size="lg"
            />
            <Progress
              value={60}
              type="circular"
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              showValue
              size="lg"
            />
          </div>
        </div>
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
            <Progress value={65} variant="primary" label="Primary Progress" showValue />
            <Progress value={65} variant="success" label="Success Progress" showValue />
            <Progress value={65} variant="warning" label="Warning Progress" showValue />
            <Progress value={65} variant="error" label="Error Progress" showValue />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Usage examples
export const UsageExamples: Story = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>File Upload Progress</h3>
          <Progress
            value={uploadProgress}
            label="Uploading file..."
            showValue
            variant="primary"
            striped
            animated
          />
          <Button onClick={startUpload} disabled={isUploading} style={{ marginTop: '1rem' }}>
            {isUploading ? 'Uploading...' : 'Start Upload'}
          </Button>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>System Stats</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Progress value={45} label="CPU Usage" showValue variant="success" />
            <Progress value={78} label="Memory Usage" showValue variant="warning" />
            <Progress value={92} label="Disk Usage" showValue variant="error" />
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem', textAlign: 'center' }}>Circular Progress Cards</h3>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <Progress value={75} type="circular" showValue size="lg" variant="success" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Success</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Progress value={50} type="circular" showValue size="lg" variant="warning" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Warning</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Progress value={25} type="circular" showValue size="lg" variant="error" />
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Error</p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
