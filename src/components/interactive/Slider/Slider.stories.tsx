// Slider.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../../basic/Button';

export default {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile range slider component supporting single value and dual-handle range selection. Perfect for numeric input, volume controls, price ranges, and interactive value selection.',
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
    range: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Slider>;

type Story = StoryObj<typeof Slider>;

// Default
export const Default: Story = {
  args: {
    value: 50,
    min: 0,
    max: 100,
    variant: 'primary',
    size: 'md',
  },
};

// Single value
export const SingleValue: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Slider value={value} onChange={setValue} label="Volume" showValue />
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.875rem' }}>
          Current value: {value}
        </p>
      </div>
    );
  },
};

// Range slider
export const RangeSlider: Story = {
  render: () => {
    const [value, setValue] = useState<[number, number]>([25, 75]);
    return (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Slider range value={value} onChange={setValue} label="Price Range" showValue />
        <p style={{ marginTop: '1rem', color: '#666', fontSize: '0.875rem' }}>
          Range: ${value[0]} - ${value[1]}
        </p>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        {sizes.map((size) => (
          <div key={size}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {size.toUpperCase()}
            </p>
            <Slider value={50} size={size} label={`Size ${size}`} />
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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '2rem' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </p>
            <Slider value={50} variant={variant} label={`${variant} slider`} />
          </div>
        ))}
      </div>
    );
  },
};

// With marks
export const WithMarks: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Slider value={value} onChange={setValue} label="With Step Marks" marks step={10} />
        <Slider
          value={value}
          onChange={setValue}
          label="With Custom Marks"
          marks={[
            { value: 0, label: 'Min' },
            { value: 25, label: '25%' },
            { value: 50, label: '50%' },
            { value: 75, label: '75%' },
            { value: 100, label: 'Max' },
          ]}
          style={{ marginTop: '2rem' }}
        />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Slider value={50} color="#8b5cf6" label="Purple Slider" />
            <Slider value={50} color="#f97316" label="Orange Slider" />
            <Slider value={50} color="#06b6d4" label="Cyan Slider" />
            <Slider value={50} color="#ec4899" label="Pink Slider" />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Track and Thumb Colors
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Slider
              value={50}
              trackColor="#e5e7eb"
              thumbColor="#8b5cf6"
              label="Custom Track and Thumb"
            />
            <Slider value={50} trackColor="#fef3c7" thumbColor="#f59e0b" label="Warm Colors" />
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
            🌈 Gradient Sliders
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Slider
              value={50}
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              label="Purple Gradient"
            />
            <Slider
              value={50}
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              label="Pink Gradient"
            />
            <Slider
              value={50}
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              label="Blue Gradient"
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌈 Gradient Range Slider
          </h3>
          <Slider
            range
            value={[25, 75]}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            label="Gradient Range"
            showValue
          />
        </div>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const [value1, setValue1] = useState(30);
    const [value2, setValue2] = useState(70);
    const [range, setRange] = useState<[number, number]>([25, 75]);

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '500px' }}>
            <Slider
              value={value1}
              onChange={setValue1}
              variant="primary"
              label="Primary Slider"
              showValue
            />
            <Slider
              value={value2}
              onChange={setValue2}
              variant="success"
              label="Success Slider"
              showValue
            />
            <Slider
              range
              value={range}
              onChange={setRange}
              variant="warning"
              label="Range Slider"
              showValue
            />
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Interactive examples
export const InteractiveExamples: Story = {
  render: () => {
    const [volume, setVolume] = useState(50);
    const [brightness, setBrightness] = useState(75);
    const [priceRange, setPriceRange] = useState<[number, number]>([10, 90]);

    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Volume Control</h3>
          <Slider value={volume} onChange={setVolume} min={0} max={100} label="Volume" showValue />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Brightness</h3>
          <Slider
            value={brightness}
            onChange={setBrightness}
            min={0}
            max={100}
            label="Brightness (%)"
            showValue
            variant="warning"
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Price Range Filter</h3>
          <Slider
            range
            value={priceRange}
            onChange={setPriceRange}
            min={0}
            max={100}
            label="Price Range ($)"
            showValue
            marks={[
              { value: 0, label: '$0' },
              { value: 25, label: '$25' },
              { value: 50, label: '$50' },
              { value: 75, label: '$75' },
              { value: 100, label: '$100' },
            ]}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Reset Controls</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={() => setVolume(50)} size="sm">
              Reset Volume
            </Button>
            <Button onClick={() => setBrightness(75)} size="sm">
              Reset Brightness
            </Button>
            <Button onClick={() => setPriceRange([10, 90])} size="sm">
              Reset Range
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Disabled state
export const Disabled: Story = {
  render: () => {
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <Slider value={50} disabled label="Disabled Slider" />
        <Slider range value={[25, 75]} disabled label="Disabled Range" showValue />
      </div>
    );
  },
};

// Step size
export const StepSize: Story = {
  render: () => {
    const [value1, setValue1] = useState(50);
    const [value2, setValue2] = useState(5);
    return (
      <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <Slider value={value1} onChange={setValue1} step={10} marks label="Step: 10" showValue />
        </div>
        <div>
          <Slider
            value={value2}
            onChange={setValue2}
            min={0}
            max={10}
            step={0.5}
            marks
            label="Step: 0.5 (0-10)"
            showValue
          />
        </div>
      </div>
    );
  },
};
