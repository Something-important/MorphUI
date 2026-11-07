// Input.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, Button, Dropdown, Checkbox } from '../../index';

// Utility function to create controlled inputs with state
const createControlledInputs = (fields: string[]) => {
  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {}),
  );

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return { values, handleChange };
};

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Enhanced Input component with gradient backgrounds, icons, floating labels, validation, and advanced styling.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Input variant style',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Input size variant',
    },
    color: {
      control: { type: 'text' },
      description: 'Custom color or theme color key',
    },
    gradient: {
      control: { type: 'text' },
      description: 'Custom gradient background',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Shadow depth variant',
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale'],
      description: 'Hover effect animation',
    },
    ripple: {
      control: { type: 'boolean' },
      description: 'Enable ripple effect on click',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Apply rounded border radius',
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Make input full width',
    },
    floatingLabel: {
      control: { type: 'boolean' },
      description: 'Enable floating label animation',
    },
    characterCount: {
      control: { type: 'boolean' },
      description: 'Show character count below input',
    },
    validation: {
      control: { type: 'object' },
      description: 'Validation rules object',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Input
export const Basic: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Input
        placeholder="Enter your text here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

// Size Variants
export const SizeVariants: Story = {
  render: () => {
    const [values, setValues] = useState({
      xs: '',
      sm: '',
      md: '',
      lg: '',
      xl: '',
    });

    const handleChange = (size: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [size]: e.target.value }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
        <Input
          placeholder="Extra small input"
          size="xs"
          value={values.xs}
          onChange={handleChange('xs')}
        />
        <Input
          placeholder="Small input"
          size="sm"
          value={values.sm}
          onChange={handleChange('sm')}
        />
        <Input
          placeholder="Medium input (default)"
          size="md"
          value={values.md}
          onChange={handleChange('md')}
        />
        <Input
          placeholder="Large input"
          size="lg"
          value={values.lg}
          onChange={handleChange('lg')}
        />
        <Input
          placeholder="Extra large input"
          size="xl"
          value={values.xl}
          onChange={handleChange('xl')}
        />
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const [values, setValues] = useState({
      primary: '',
      secondary: '',
      success: '',
      warning: '',
      info: '',
      danger: '',
      ghost: '',
      outline: '',
    });

    const handleChange = (variant: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [variant]: e.target.value }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Primary variant (default)"
          variant="primary"
          value={values.primary}
          onChange={handleChange('primary')}
        />
        <Input
          placeholder="Secondary variant"
          variant="secondary"
          value={values.secondary}
          onChange={handleChange('secondary')}
        />
        <Input
          placeholder="Success variant"
          variant="success"
          value={values.success}
          onChange={handleChange('success')}
        />
        <Input
          placeholder="Warning variant"
          variant="warning"
          value={values.warning}
          onChange={handleChange('warning')}
        />
        <Input
          placeholder="Info variant"
          variant="info"
          value={values.info}
          onChange={handleChange('info')}
        />
        <Input
          placeholder="Danger variant"
          variant="danger"
          value={values.danger}
          onChange={handleChange('danger')}
        />
        <Input
          placeholder="Ghost variant"
          variant="ghost"
          value={values.ghost}
          onChange={handleChange('ghost')}
        />
        <Input
          placeholder="Outline variant"
          variant="outline"
          value={values.outline}
          onChange={handleChange('outline')}
        />
      </div>
    );
  },
};

// Icons and Floating Labels
export const IconsAndFloatingLabels: Story = {
  render: () => {
    const [values, setValues] = useState({
      search: '',
      email: '',
      floating: '',
      both: '',
    });

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '350px' }}>
        <Input
          placeholder="Search with left icon"
          iconLeft={<span>🔍</span>}
          value={values.search}
          onChange={handleChange('search')}
          shadow="md"
        />

        <Input
          placeholder="Email with right icon"
          type="email"
          iconRight={<span>✉️</span>}
          value={values.email}
          onChange={handleChange('email')}
          shadow="md"
        />

        <Input
          placeholder="Floating label input"
          floatingLabel={true}
          value={values.floating}
          onChange={handleChange('floating')}
          shadow="lg"
          borderRadius={12}
        />

        <Input
          placeholder="Both icons + floating label"
          iconLeft={<span>👤</span>}
          iconRight={<span>✓</span>}
          floatingLabel={true}
          value={values.both}
          onChange={handleChange('both')}
          shadow="xl"
          borderRadius={16}
        />
      </div>
    );
  },
};

// Input Types
export const InputTypes: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs([
      'text',
      'email',
      'password',
      'number',
      'search',
      'tel',
      'url',
      'date',
      'time',
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Text input (default)"
          type="text"
          value={values.text}
          onChange={handleChange('text')}
          iconLeft={<span>📝</span>}
        />
        <Input
          placeholder="Email input"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          iconLeft={<span>✉️</span>}
        />
        <Input
          placeholder="Password input (click eye icon to toggle visibility)"
          type="password"
          value={values.password}
          onChange={handleChange('password')}
          iconLeft={<span>🔒</span>}
        />
        <Input
          placeholder="Number input"
          type="number"
          value={values.number}
          onChange={handleChange('number')}
          iconLeft={<span>🔢</span>}
        />
        <Input
          placeholder="Search input"
          type="search"
          value={values.search}
          onChange={handleChange('search')}
          iconLeft={<span>🔍</span>}
        />
        <Input
          placeholder="Tel input"
          type="tel"
          value={values.tel}
          onChange={handleChange('tel')}
          iconLeft={<span>📞</span>}
        />
        <Input
          placeholder="URL input"
          type="url"
          value={values.url}
          onChange={handleChange('url')}
          iconLeft={<span>🌐</span>}
        />
        <Input
          placeholder="Date input"
          type="date"
          value={values.date}
          onChange={handleChange('date')}
          iconLeft={<span>📅</span>}
        />
        <Input
          placeholder="Time input"
          type="time"
          value={values.time}
          onChange={handleChange('time')}
          iconLeft={<span>⏰</span>}
        />
      </div>
    );
  },
};

// Validation States
export const ValidationStates: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs([
      'basic',
      'withError',
      'withSuccess',
      'withWarning',
      'withInfo',
    ]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '500px' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
            Validation States
          </h3>
          <p
            style={{
              marginBottom: '1rem',
              color: 'var(--color-text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            Validation state icons appear automatically when you set the corresponding props.
          </p>
        </div>

        <Input
          placeholder="Basic input - no validation state"
          value={values.basic}
          onChange={handleChange('basic')}
          shadow="sm"
        />

        <Input
          placeholder="Error state - shows × icon automatically"
          error={true}
          errorMessage="This field has an error"
          value={values.withError}
          onChange={handleChange('withError')}
          shadow="sm"
        />

        <Input
          placeholder="Success state - shows ✓ icon automatically"
          success={true}
          value={values.withSuccess}
          onChange={handleChange('withSuccess')}
          shadow="sm"
        />

        <Input
          placeholder="Warning state - shows ! icon automatically"
          warning={true}
          value={values.withWarning}
          onChange={handleChange('withWarning')}
          shadow="sm"
        />

        <Input
          placeholder="Info state - shows i icon automatically"
          info={true}
          value={values.withInfo}
          onChange={handleChange('withInfo')}
          shadow="sm"
        />
      </div>
    );
  },
};

// Character Count and Validation
export const CharacterCountAndValidation: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs(['limited', 'email', 'required']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Limited to 50 characters"
          maxLength={50}
          characterCount={true}
          value={values.limited}
          onChange={handleChange('limited')}
          shadow="md"
        />

        <Input
          placeholder="Email validation"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          shadow="md"
          validation={{
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            custom: (value) =>
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0
                ? 'Invalid email format'
                : null,
          }}
        />

        <Input
          placeholder="Required field"
          value={values.required}
          onChange={handleChange('required')}
          shadow="md"
          validation={{
            required: true,
            custom: (value) => (value.length === 0 ? 'This field is required' : null),
          }}
        />
      </div>
    );
  },
};

// Auto-complete with Suggestions
export const AutoCompleteWithSuggestions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const suggestions = [
      'React',
      'TypeScript',
      'JavaScript',
      'Node.js',
      'Python',
      'Java',
      'C++',
      'Go',
      'Rust',
      'Swift',
    ];

    return (
      <div style={{ width: '350px' }}>
        <Input
          placeholder="Search programming languages..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          suggestions={suggestions}
          onSuggestionSelect={(suggestion) => setValue(suggestion)}
          iconLeft={<span>🔍</span>}
          shadow="lg"
          borderRadius={12}
        />
      </div>
    );
  },
};

// Hover Effects and Ripple
export const HoverEffectsAndRipple: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs(['lift', 'glow', 'scale', 'ripple']);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Lift effect on hover"
          hoverEffect="lift"
          value={values.lift}
          onChange={handleChange('lift')}
          shadow="md"
        />
        <Input
          placeholder="Glow effect on hover"
          hoverEffect="glow"
          value={values.glow}
          onChange={handleChange('glow')}
          shadow="md"
        />
        <Input
          placeholder="Scale effect on hover"
          hoverEffect="scale"
          value={values.scale}
          onChange={handleChange('scale')}
          shadow="md"
        />
        <Input
          placeholder="Ripple effect on click"
          ripple={true}
          value={values.ripple}
          onChange={handleChange('ripple')}
          shadow="md"
        />
      </div>
    );
  },
};

// Advanced Styling
export const AdvancedStyling: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <Input
        placeholder="Custom border radius and shadow"
        borderRadius={20}
        shadow="2xl"
        value=""
        onChange={() => {}}
        iconLeft={<span>✨</span>}
      />

      <Input
        placeholder="Backdrop blur effect"
        backdropBlur={true}
        color="rgba(255, 255, 255, 0.1)"
        borderColor="rgba(255, 255, 255, 0.2)"
        textColor="#ffffff"
        shadow="xl"
        borderRadius={16}
        value=""
        onChange={() => {}}
        iconLeft={<span>🌟</span>}
      />

      <Input
        placeholder="Custom gradient background"
        gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)"
        textColor="#ffffff"
        borderColor="transparent"
        shadow="lg"
        borderRadius={12}
        value=""
        onChange={() => {}}
        iconLeft={<span>🎨</span>}
      />
    </div>
  ),
};

// Loading and Interactive States
export const LoadingAndInteractiveStates: Story = {
  render: () => {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');

    const simulateLoading = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <Input
          placeholder="Loading state (click to simulate)"
          loading={loading}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClick={simulateLoading}
          shadow="md"
        />

        <Input
          placeholder="Disabled state"
          disabled={true}
          value="Cannot edit this"
          onChange={() => {}}
          shadow="sm"
        />

        <Input
          placeholder="Read-only state"
          readOnly={true}
          value="This is read-only"
          onChange={() => {}}
          shadow="sm"
        />
      </div>
    );
  },
};

// Form Integration Example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phone: '',
      message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
    };

    return (
      <form onSubmit={handleSubmit} style={{ width: '400px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Input
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            iconLeft={<span>👤</span>}
            floatingLabel={true}
            required={true}
            shadow="md"
          />

          <Input
            placeholder="Email Address"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            iconLeft={<span>✉️</span>}
            floatingLabel={true}
            required={true}
            validation={{
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              custom: (value) =>
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0
                  ? 'Invalid email format'
                  : null,
            }}
            shadow="md"
          />

          <Input
            placeholder="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            iconLeft={<span>📞</span>}
            floatingLabel={true}
            shadow="md"
          />

          <Input
            placeholder="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            iconLeft={<span>💬</span>}
            floatingLabel={true}
            maxLength={200}
            characterCount={true}
            shadow="md"
          />

          <button
            type="submit"
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '1rem',
            }}
          >
            Submit Form
          </button>
        </div>
      </form>
    );
  },
};

// Interactive Theme Builder (Required Standard)