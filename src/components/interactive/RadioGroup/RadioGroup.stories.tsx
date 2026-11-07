import type { Meta, StoryObj } from '@storybook/react';
import type React from 'react';
import { useState } from 'react';
import { RadioGroup } from '../../index';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A comprehensive radio group component with extensive color customization, gradients, and theme support.',
      },
    },
  },
  argTypes: {
    options: {
      control: { type: 'object' },
      description: 'Array of radio options with label, value, and optional description',
    },
    value: {
      control: { type: 'text' },
      description: 'Currently selected value',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when selection changes',
    },
    name: {
      control: { type: 'text' },
      description: 'Name attribute for the radio group',
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant of the radio group',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the radio group',
    },
    direction: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Layout direction of options',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is disabled',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is required',
    },
    invalid: {
      control: { type: 'boolean' },
      description: 'Whether the radio group is invalid',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Whether to use rounded corners',
    },
    ripple: {
      control: { type: 'boolean' },
      description: 'Whether to show ripple effect on click',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow intensity',
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale'],
      description: 'Hover effect type',
    },
    // Color customization props
    color: {
      control: { type: 'text' },
      description: 'Main color (legacy support)',
    },
    gradient: {
      control: { type: 'text' },
      description: 'Main gradient (legacy support)',
    },
    textColor: {
      control: { type: 'text' },
      description: 'Text color',
    },
    borderColor: {
      control: { type: 'text' },
      description: 'Border color',
    },
    containerColor: {
      control: { type: 'text' },
      description: 'Container background color',
    },
    containerGradient: {
      control: { type: 'text' },
      description: 'Container background gradient',
    },
    optionColor: {
      control: { type: 'text' },
      description: 'Option background color',
    },
    optionGradient: {
      control: { type: 'text' },
      description: 'Option background gradient',
    },
    radioColor: {
      control: { type: 'text' },
      description: 'Radio button color',
    },
    radioGradient: {
      control: { type: 'text' },
      description: 'Radio button gradient',
    },
    radioDotColor: {
      control: { type: 'text' },
      description: 'Radio button dot color',
    },
    radioDotGradient: {
      control: { type: 'text' },
      description: 'Radio button dot gradient',
    },
    labelColor: {
      control: { type: 'text' },
      description: 'Label color',
    },
    labelGradient: {
      control: { type: 'text' },
      description: 'Label gradient',
    },
    descriptionColor: {
      control: { type: 'text' },
      description: 'Description color',
    },
    descriptionGradient: {
      control: { type: 'text' },
      description: 'Description gradient',
    },
    errorColor: {
      control: { type: 'text' },
      description: 'Error color',
    },
    errorGradient: {
      control: { type: 'text' },
      description: 'Error gradient',
    },
    noOptionsColor: {
      control: { type: 'text' },
      description: 'No options message color',
    },
    noOptionsGradient: {
      control: { type: 'text' },
      description: 'No options message gradient',
    },
    gradientTarget: {
      control: { type: 'select' },
      options: ['container', 'options', 'radio', 'all'],
      description: 'Target for gradient application',
    },
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ padding: '20px', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

// Default options for stories
const defaultOptions = [
  { label: 'Option 1', value: 'option1', description: 'First option with description' },
  { label: 'Option 2', value: 'option2', description: 'Second option with description' },
  { label: 'Option 3', value: 'option3', description: 'Third option with description' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    name: 'default-radio',
    label: 'Choose an option',
    description: 'Select one of the available options below',
  },
};

export const Variants: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    const variants = [
      'primary',
      'secondary',
      'success',
      'warning',
      'info',
      'danger',
      'ghost',
      'outline',
    ] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          🎨 Variants
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {variants.map((variant) => (
            <div
              key={variant}
              style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            >
              <h4
                style={{
                  marginBottom: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#555',
                  textTransform: 'capitalize',
                }}
              >
                {variant} Variant
              </h4>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues[variant]}
                onChange={(value) =>
                  setSelectedValues((prev) => ({ ...prev, [variant]: value as string }))
                }
                name={`variant-${variant}`}
                variant={variant}
                label={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Options`}
                description={`This is the ${variant} variant`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          📏 Sizes
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {sizes.map((size) => (
            <div
              key={size}
              style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            >
              <h4
                style={{
                  marginBottom: '12px',
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#555',
                  textTransform: 'uppercase',
                }}
              >
                {size} Size
              </h4>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues[size]}
                onChange={(value) =>
                  setSelectedValues((prev) => ({ ...prev, [size]: value as string }))
                }
                name={`size-${size}`}
                size={size}
                label={`${size.toUpperCase()} Size Options`}
                description={`This is the ${size} size variant`}
              />
            </div>
          ))}
        </div>
      </div>
    );
  },
};

export const Directions: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          📐 Directions
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '20px',
          }}
        >
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4
              style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}
            >
              Vertical Layout
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['vertical']}
              onChange={(value) =>
                setSelectedValues((prev) => ({ ...prev, vertical: value as string }))
              }
              name="direction-vertical"
              direction="vertical"
              label="Vertical Options"
              description="Options arranged vertically"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4
              style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}
            >
              Horizontal Layout
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['horizontal']}
              onChange={(value) =>
                setSelectedValues((prev) => ({ ...prev, horizontal: value as string }))
              }
              name="direction-horizontal"
              direction="horizontal"
              label="Horizontal Options"
              description="Options arranged horizontally"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const States: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          🔧 States
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4
              style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}
            >
              Normal State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['normal']}
              onChange={(value) =>
                setSelectedValues((prev) => ({ ...prev, normal: value as string }))
              }
              name="state-normal"
              label="Normal Radio Group"
              description="Standard radio group functionality"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4
              style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}
            >
              Disabled State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['disabled']}
              onChange={(value) =>
                setSelectedValues((prev) => ({ ...prev, disabled: value as string }))
              }
              name="state-disabled"
              disabled
              label="Disabled Radio Group"
              description="This radio group is disabled"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4
              style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}
            >
              Required State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['required']}
              onChange={(value) =>
                setSelectedValues((prev) => ({ ...prev, required: value as string }))
              }
              name="state-required"
              required
              label="Required Radio Group"
              description="This selection is required"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4
              style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}
            >
              Invalid State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['invalid']}
              onChange={(value) =>
                setSelectedValues((prev) => ({ ...prev, invalid: value as string }))
              }
              name="state-invalid"
              invalid
              errorMessage="Please select a valid option"
              label="Invalid Radio Group"
              description="This radio group has validation errors"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const Effects: Story = {
  render: () => {
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
          ✨ Effects
        </h3>

        {/* Shadows */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
            Shadow Effects
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
              <div
                key={shadow}
                style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              >
                <h5
                  style={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    textTransform: 'uppercase',
                  }}
                >
                  {shadow === 'none' ? 'No Shadow' : `${shadow} Shadow`}
                </h5>
                <RadioGroup
                  options={defaultOptions}
                  value={selectedValues[`shadow-${shadow}`]}
                  onChange={(value) =>
                    setSelectedValues((prev) => ({
                      ...prev,
                      [`shadow-${shadow}`]: value as string,
                    }))
                  }
                  name={`shadow-${shadow}`}
                  shadow={shadow}
                  label={`${shadow === 'none' ? 'No Shadow' : shadow.toUpperCase() + ' Shadow'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hover Effects */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
            Hover Effects
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            {(['none', 'lift', 'glow', 'scale'] as const).map((effect) => (
              <div
                key={effect}
                style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              >
                <h5
                  style={{
                    marginBottom: '8px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#666',
                    textTransform: 'capitalize',
                  }}
                >
                  {effect} Effect
                </h5>
                <RadioGroup
                  options={defaultOptions}
                  value={selectedValues[`hover-${effect}`]}
                  onChange={(value) =>
                    setSelectedValues((prev) => ({ ...prev, [`hover-${effect}`]: value as string }))
                  }
                  name={`hover-${effect}`}
                  hoverEffect={effect}
                  label={`${effect.charAt(0).toUpperCase() + effect.slice(1)} Hover Effect`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rounded */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
            Rounded Corners
          </h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5
                style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}
              >
                Default Corners
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['rounded-false']}
                onChange={(value) =>
                  setSelectedValues((prev) => ({ ...prev, 'rounded-false': value as string }))
                }
                name="rounded-false"
                rounded={false}
                label="Default Corners"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5
                style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}
              >
                Rounded Corners
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['rounded-true']}
                onChange={(value) =>
                  setSelectedValues((prev) => ({ ...prev, 'rounded-true': value as string }))
                }
                name="rounded-true"
                rounded={true}
                label="Rounded Corners"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
