// Label.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Label, Input, Button, ThemeProvider, themes, type ThemeName } from '../../index';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible label component for form inputs with support for variants, sizes, custom colors, gradients, and theming. Perfect for creating accessible form labels with consistent styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info'],
      description: 'Visual variant of the label',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Size of the label',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the label is for a required field',
    },
    textColor: {
      control: { type: 'text' },
      description: 'Custom text color or gradient',
    },
    requiredColor: {
      control: { type: 'text' },
      description: 'Custom color for required indicator',
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

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Label
export const Default: Story = {
  args: {
    children: 'Email Address',
    htmlFor: 'email',
  },
};

// With Input
export const WithInput: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '300px' }}>
        <Label htmlFor="email-input" required>
          Email Address
        </Label>
        <Input
          id="email-input"
          type="email"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
      <div>
        <Label variant="primary" htmlFor="primary">
          Primary Label
        </Label>
      </div>
      <div>
        <Label variant="secondary" htmlFor="secondary">
          Secondary Label
        </Label>
      </div>
      <div>
        <Label variant="success" htmlFor="success">
          Success Label
        </Label>
      </div>
      <div>
        <Label variant="warning" htmlFor="warning">
          Warning Label
        </Label>
      </div>
      <div>
        <Label variant="danger" htmlFor="danger">
          Danger Label
        </Label>
      </div>
      <div>
        <Label variant="info" htmlFor="info">
          Info Label
        </Label>
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const [xsValue, setXsValue] = useState('');
    const [smValue, setSmValue] = useState('');
    const [mdValue, setMdValue] = useState('');
    const [lgValue, setLgValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '300px' }}>
        <div>
          <Label size="xs" htmlFor="xs-input">
            Extra Small Label
          </Label>
          <Input
            id="xs-input"
            size="xs"
            value={xsValue}
            onChange={(e) => setXsValue(e.target.value)}
          />
        </div>
        <div>
          <Label size="sm" htmlFor="sm-input">
            Small Label
          </Label>
          <Input
            id="sm-input"
            size="sm"
            value={smValue}
            onChange={(e) => setSmValue(e.target.value)}
          />
        </div>
        <div>
          <Label size="md" htmlFor="md-input">
            Medium Label
          </Label>
          <Input
            id="md-input"
            size="md"
            value={mdValue}
            onChange={(e) => setMdValue(e.target.value)}
          />
        </div>
        <div>
          <Label size="lg" htmlFor="lg-input">
            Large Label
          </Label>
          <Input
            id="lg-input"
            size="lg"
            value={lgValue}
            onChange={(e) => setLgValue(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

// Required
export const Required: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <div>
          <Label htmlFor="required-default" required>
            Required Field (Default)
          </Label>
          <Input
            id="required-default"
            required
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="required-custom" required requiredColor="#8b5cf6">
            Required Field (Custom Color)
          </Label>
          <Input
            id="required-custom"
            required
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="optional">Optional Field</Label>
          <Input id="optional" value={value3} onChange={(e) => setValue3(e.target.value)} />
        </div>
      </div>
    );
  },
};

// Custom Colors
export const CustomColors: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <div>
          <Label htmlFor="custom-1" textColor="#3b82f6">
            Custom Blue Label
          </Label>
          <Input id="custom-1" value={value1} onChange={(e) => setValue1(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="custom-2" textColor="#10b981">
            Custom Green Label
          </Label>
          <Input id="custom-2" value={value2} onChange={(e) => setValue2(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="custom-3" textColor="#f59e0b">
            Custom Orange Label
          </Label>
          <Input id="custom-3" value={value3} onChange={(e) => setValue3(e.target.value)} />
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '300px' }}>
        <div>
          <Label htmlFor="gradient-1" textColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)">
            Gradient Label (Purple)
          </Label>
          <Input id="gradient-1" value={value1} onChange={(e) => setValue1(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="gradient-2" textColor="linear-gradient(90deg, #f093fb 0%, #f5576c 100%)">
            Gradient Label (Pink)
          </Label>
          <Input id="gradient-2" value={value2} onChange={(e) => setValue2(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="gradient-3" textColor="linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)">
            Gradient Label (Blue)
          </Label>
          <Input id="gradient-3" value={value3} onChange={(e) => setValue3(e.target.value)} />
        </div>
      </div>
    );
  },
};

// Form Example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
    });

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '400px',
          padding: '24px',
          border: '1px solid var(--color-border, #e5e7eb)',
          borderRadius: '8px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>Sign Up Form</h3>

        <div>
          <Label htmlFor="name" required>
            Full Name
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="email" required>
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="john@example.com"
          />
        </div>

        <div>
          <Label htmlFor="password" required>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            placeholder="••••••••"
          />
        </div>

        <Button variant="primary" fullWidth>
          Sign Up
        </Button>
      </div>
    );
  },
};

// Theme Showcase
export const ThemeShowcase: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('light');

    return (
      <ThemeProvider theme={themes[currentTheme]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '500px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {Object.keys(themes).map((themeName) => (
              <Button
                key={themeName}
                variant={currentTheme === themeName ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setCurrentTheme(themeName as ThemeName)}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </Button>
            ))}
          </div>

          <div
            style={{
              padding: '20px',
              border: '1px solid var(--color-border, #e5e7eb)',
              borderRadius: '8px',
              backgroundColor: 'var(--color-background, #ffffff)',
            }}
          >
            <h4 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600' }}>
              Labels with Current Theme: {currentTheme}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <Label variant="primary" htmlFor="theme-primary">
                  Primary Label
                </Label>
              </div>
              <div>
                <Label variant="secondary" htmlFor="theme-secondary">
                  Secondary Label
                </Label>
              </div>
              <div>
                <Label variant="success" htmlFor="theme-success" required>
                  Success Label (Required)
                </Label>
              </div>
              <div>
                <Label variant="warning" htmlFor="theme-warning">
                  Warning Label
                </Label>
              </div>
              <div>
                <Label variant="danger" htmlFor="theme-danger" required>
                  Danger Label (Required)
                </Label>
              </div>
              <div>
                <Label variant="info" htmlFor="theme-info">
                  Info Label
                </Label>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// With Form Validation States
export const ValidationStates: Story = {
  render: () => {
    const [validValue, setValidValue] = useState('valid@example.com');
    const [invalidValue, setInvalidValue] = useState('invalid');
    const [warningValue, setWarningValue] = useState('warning');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '300px' }}>
        <div>
          <Label htmlFor="valid" variant="success">
            Valid Input
          </Label>
          <Input
            id="valid"
            value={validValue}
            onChange={(e) => setValidValue(e.target.value)}
            success
          />
        </div>
        <div>
          <Label htmlFor="invalid" variant="danger" required>
            Invalid Input
          </Label>
          <Input
            id="invalid"
            value={invalidValue}
            onChange={(e) => setInvalidValue(e.target.value)}
            error
            errorMessage="Invalid email format"
          />
        </div>
        <div>
          <Label htmlFor="warning" variant="warning">
            Warning Input
          </Label>
          <Input
            id="warning"
            value={warningValue}
            onChange={(e) => setWarningValue(e.target.value)}
            warning
          />
        </div>
      </div>
    );
  },
};
