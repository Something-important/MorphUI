import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup, Button, Dropdown, ThemeProvider, themes } from '../../index';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive radio group component with extensive color customization, gradients, and theme support.',
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
    (Story: any) => (
      <ThemeProvider>
        <div style={{ padding: '20px', maxWidth: '800px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
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
    
    const variants = ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Variants</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {variants.map((variant) => (
            <div key={variant} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555', textTransform: 'capitalize' }}>
                {variant} Variant
              </h4>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues[variant]}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, [variant]: value as string }))}
                name={`variant-${variant}`}
                variant={variant as any}
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
    
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>📏 Sizes</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {sizes.map((size) => (
            <div key={size} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555', textTransform: 'uppercase' }}>
                {size} Size
              </h4>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues[size]}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, [size]: value as string }))}
                name={`size-${size}`}
                size={size as any}
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
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>📐 Directions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
              Vertical Layout
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['vertical']}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, vertical: value as string }))}
              name="direction-vertical"
              direction="vertical"
              label="Vertical Options"
              description="Options arranged vertically"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
              Horizontal Layout
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['horizontal']}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, horizontal: value as string }))}
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
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🔧 States</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
              Normal State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['normal']}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, normal: value as string }))}
              name="state-normal"
              label="Normal Radio Group"
              description="Standard radio group functionality"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
              Disabled State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['disabled']}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, disabled: value as string }))}
              name="state-disabled"
              disabled
              label="Disabled Radio Group"
              description="This radio group is disabled"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
              Required State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['required']}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, required: value as string }))}
              name="state-required"
              required
              label="Required Radio Group"
              description="This selection is required"
            />
          </div>
          <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>
              Invalid State
            </h4>
            <RadioGroup
              options={defaultOptions}
              value={selectedValues['invalid']}
              onChange={(value) => setSelectedValues(prev => ({ ...prev, invalid: value as string }))}
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
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>✨ Effects</h3>
        
        {/* Shadows */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Shadow Effects</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {['none', 'sm', 'md', 'lg', 'xl'].map((shadow) => (
              <div key={shadow} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666', textTransform: 'uppercase' }}>
                  {shadow === 'none' ? 'No Shadow' : `${shadow} Shadow`}
                </h5>
                <RadioGroup
                  options={defaultOptions}
                  value={selectedValues[`shadow-${shadow}`]}
                  onChange={(value) => setSelectedValues(prev => ({ ...prev, [`shadow-${shadow}`]: value as string }))}
                  name={`shadow-${shadow}`}
                  shadow={shadow as any}
                  label={`${shadow === 'none' ? 'No Shadow' : shadow.toUpperCase() + ' Shadow'}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Hover Effects */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Hover Effects</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            {['none', 'lift', 'glow', 'scale'].map((effect) => (
              <div key={effect} style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
                <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666', textTransform: 'capitalize' }}>
                  {effect} Effect
                </h5>
                <RadioGroup
                  options={defaultOptions}
                  value={selectedValues[`hover-${effect}`]}
                  onChange={(value) => setSelectedValues(prev => ({ ...prev, [`hover-${effect}`]: value as string }))}
                  name={`hover-${effect}`}
                  hoverEffect={effect as any}
                  label={`${effect.charAt(0).toUpperCase() + effect.slice(1)} Hover Effect`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Rounded */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>Rounded Corners</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Default Corners
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['rounded-false']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'rounded-false': value as string }))}
                name="rounded-false"
                rounded={false}
                label="Default Corners"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Rounded Corners
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['rounded-true']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'rounded-true': value as string }))}
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

export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [selectedValue, setSelectedValue] = useState('option1');
    
    // Advanced color states
    const [backgroundColor, setBackgroundColor] = useState('#ffffff');
    const [textColor, setTextColor] = useState('#111827');
    const [borderColor, setBorderColor] = useState('#d1d5db');
    const [containerColor, setContainerColor] = useState('#ffffff');
    const [optionColor, setOptionColor] = useState('transparent');
    const [radioColor, setRadioColor] = useState('#3b82f6');
    const [radioDotColor, setRadioDotColor] = useState('#ffffff');
    const [labelColor, setLabelColor] = useState('#111827');
    const [descriptionColor, setDescriptionColor] = useState('#6b7280');
    const [errorColor, setErrorColor] = useState('#ef4444');
    const [noOptionsColor, setNoOptionsColor] = useState('#6b7280');
    
    // Gradient states
    const [backgroundColorGradient, setBackgroundColorGradient] = useState('');
    const [containerColorGradient, setContainerColorGradient] = useState('');
    const [optionColorGradient, setOptionColorGradient] = useState('');
    const [radioColorGradient, setRadioColorGradient] = useState('');
    const [radioDotColorGradient, setRadioDotColorGradient] = useState('');
    const [labelColorGradient, setLabelColorGradient] = useState('');
    const [descriptionColorGradient, setDescriptionColorGradient] = useState('');
    const [errorColorGradient, setErrorColorGradient] = useState('');
    const [noOptionsColorGradient, setNoOptionsColorGradient] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [generatedGradient, setGeneratedGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    
    // Effect states
    const [rounded, setRounded] = useState(true);
    const [shadow, setShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [hoverEffect, setHoverEffect] = useState<'none' | 'lift' | 'glow' | 'scale'>('lift');
    
    // Use centralized themes from the theme system
    const availableThemes = themes;

    // Utility functions
    const applyTheme = (themeName: string) => {
      const theme = availableThemes[themeName as keyof typeof availableThemes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(`--${key}`, String(value));
        });
        setCurrentTheme(themeName);
      }
    };

    const generateGradient = () => {
      if (gradientColors.length < 2) return;
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'radial') {
        gradient = `radial-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'conic') {
        gradient = `conic-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      }
      setGeneratedGradient(gradient);
    };

    const applyGradientToTarget = (target: string) => {
      switch (target) {
        case 'background':
          setBackgroundColorGradient(generatedGradient);
          break;
        case 'text':
          setTextColor(generatedGradient);
          break;
        case 'border':
          setBorderColor(generatedGradient);
          break;
        case 'container':
          setContainerColorGradient(generatedGradient);
          break;
        case 'option':
          setOptionColorGradient(generatedGradient);
          break;
        case 'radio':
          setRadioColorGradient(generatedGradient);
          break;
        case 'radioDot':
          setRadioDotColorGradient(generatedGradient);
          break;
        case 'label':
          setLabelColorGradient(generatedGradient);
          break;
        case 'description':
          setDescriptionColorGradient(generatedGradient);
          break;
        case 'error':
          setErrorColorGradient(generatedGradient);
          break;
        case 'noOptions':
          setNoOptionsColorGradient(generatedGradient);
          break;
      }
    };

    const resetCustomStyling = () => {
      setBackgroundColor('#ffffff');
      setTextColor('#111827');
      setBorderColor('#d1d5db');
      setContainerColor('#ffffff');
      setOptionColor('transparent');
      setRadioColor('#3b82f6');
      setRadioDotColor('#ffffff');
      setLabelColor('#111827');
      setDescriptionColor('#6b7280');
      setErrorColor('#ef4444');
      setNoOptionsColor('#6b7280');
      setBackgroundColorGradient('');
      setContainerColorGradient('');
      setOptionColorGradient('');
      setRadioColorGradient('');
      setRadioDotColorGradient('');
      setLabelColorGradient('');
      setDescriptionColorGradient('');
      setErrorColorGradient('');
      setNoOptionsColorGradient('');
      // Reset effects
      setRounded(true);
      setShadow('md');
      setHoverEffect('lift');
    };

    const addColor = () => {
      setGradientColors([...gradientColors, '#000000']);
    };

    const removeColor = (index: number) => {
      setGradientColors(gradientColors.filter((_, i) => i !== index));
    };

    const updateColor = (index: number, color: string) => {
      const newColors = [...gradientColors];
      newColors[index] = color;
      setGradientColors(newColors);
    };

    const defaultOptions = [
      { label: 'Option 1', value: 'option1', description: 'First option with description' },
      { label: 'Option 2', value: 'option2', description: 'Second option with description' },
      { label: 'Option 3', value: 'option3', description: 'Third option with description' },
    ];

    return (
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: 'var(--color-text)' }}>🎨 Interactive Theme Builder</h3>
        
          {/* Theme Switcher */}
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎯 Theme Switcher</h4>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              {Object.keys(availableThemes).map((themeName) => (
                <Button
                  key={themeName}
                  onClick={() => applyTheme(themeName)}
                  variant={currentTheme === themeName ? 'primary' : 'outline'}
                  size="sm"
                  style={{ textTransform: 'capitalize' }}
                >
                  {themeName}
                </Button>
              ))}
            </div>
          </div>

          {/* Live Preview */}
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>👀 Live Preview</h4>
            <div style={{ padding: '20px', border: '1px solid #e5e7eb', borderRadius: '8px', backgroundColor: '#f9fafb' }}>
              <RadioGroup
                options={defaultOptions}
                value={selectedValue}
                onChange={(value) => setSelectedValue(value as string)}
                name="live-preview"
                label="Choose your favorite option"
                description="This is a live preview of your customizations"
                // Background colors
                containerColor={containerColor}
                containerGradient={containerColorGradient}
                optionColor={optionColor}
                optionGradient={optionColorGradient}
                // Radio colors
                radioColor={radioColor}
                radioGradient={radioColorGradient}
                radioDotColor={radioDotColor}
                radioDotGradient={radioDotColorGradient}
                // Text colors
                textColor={textColor}
                labelColor={labelColor}
                labelGradient={labelColorGradient}
                descriptionColor={descriptionColor}
                descriptionGradient={descriptionColorGradient}
                // Border and error colors
                borderColor={borderColor}
                errorColor={errorColor}
                errorGradient={errorColorGradient}
                noOptionsColor={noOptionsColor}
                noOptionsGradient={noOptionsColorGradient}
                // Effects
                rounded={rounded}
                shadow={shadow}
                hoverEffect={hoverEffect}
                size="md"
              />
            </div>
          </div>

          {/* Advanced Gradient Builder */}
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🔧 Advanced Gradient Builder</h4>
            
            {/* Gradient Type */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', minWidth: '80px' }}>Type:</label>
                <Dropdown
                  value={gradientType}
                  onChange={(value) => {
                    setGradientType(value as string);
                    // Set smart defaults for direction
                    if (value === 'linear') setGradientDirection('90deg');
                    else if (value === 'radial') setGradientDirection('circle at center');
                    else if (value === 'conic') setGradientDirection('from 0deg at center');
                  }}
                  options={[
                    { value: 'linear', label: 'Linear' },
                    { value: 'radial', label: 'Radial' },
                    { value: 'conic', label: 'Conic' }
                  ]}
                  placeholder="Select type"
                  size="sm"
                />
              </div>
            </div>

            {/* Gradient Direction */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', minWidth: '80px' }}>Direction:</label>
                <input
                  type="text"
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  style={{ width: '200px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                  placeholder={gradientType === 'linear' ? '90deg' : gradientType === 'radial' ? 'circle at center' : 'from 0deg at center'}
                />
              </div>
            </div>
            
            {/* Color Management */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', minWidth: '80px' }}>Colors:</label>
                <Button
                  onClick={addColor}
                  size="sm"
                  variant="outline"
                  style={{ fontSize: '12px' }}
                >
                  + Add Color
                </Button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
                {gradientColors.map((color, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      style={{ width: '40px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <button
                      onClick={() => removeColor(index)}
                      style={{
                        padding: '2px 6px',
                        border: '1px solid #ddd',
                        borderRadius: '4px',
                        background: '#fff',
                        cursor: 'pointer',
                        fontSize: '10px'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Generate Button */}
            <div style={{ marginBottom: '16px' }}>
              <Button
                onClick={generateGradient}
                variant="primary"
                size="sm"
              >
                Generate Gradient
              </Button>
            </div>
            
            {/* Gradient Preview */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preview:</label>
              <div 
                style={{ 
                  width: '100%', 
                  height: '60px', 
                  background: generatedGradient, 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '12px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {generatedGradient}
              </div>
            </div>
            
            {/* Apply to Target Buttons */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Apply to Target:</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('container')}>Container</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('option')}>Option</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('radio')}>Radio</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('radioDot')}>Radio Dot</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('label')}>Label</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('description')}>Description</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('text')}>Text</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('border')}>Border</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('error')}>Error</Button>
                <Button size="sm" variant="outline" onClick={() => applyGradientToTarget('noOptions')}>No Options</Button>
              </div>
            </div>
          </div>

          {/* Comprehensive Color Controls */}
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎨 Comprehensive Color Controls</h4>
            
            {/* Background Colors */}
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>Background</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Container Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={containerColor}
                      onChange={(e) => setContainerColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={containerColor}
                      onChange={(e) => setContainerColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setContainerColor('#ffffff')}>Reset</Button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Option Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={optionColor}
                      onChange={(e) => setOptionColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={optionColor}
                      onChange={(e) => setOptionColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setOptionColor('transparent')}>Reset</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Radio Colors */}
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>Radio Button</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Radio Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={radioColor}
                      onChange={(e) => setRadioColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={radioColor}
                      onChange={(e) => setRadioColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setRadioColor('#3b82f6')}>Reset</Button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Radio Dot Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={radioDotColor}
                      onChange={(e) => setRadioDotColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={radioDotColor}
                      onChange={(e) => setRadioDotColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setRadioDotColor('#ffffff')}>Reset</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>Text</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Text Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setTextColor('#111827')}>Reset</Button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Label Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={labelColor}
                      onChange={(e) => setLabelColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={labelColor}
                      onChange={(e) => setLabelColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setLabelColor('#111827')}>Reset</Button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Description Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={descriptionColor}
                      onChange={(e) => setDescriptionColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={descriptionColor}
                      onChange={(e) => setDescriptionColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setDescriptionColor('#6b7280')}>Reset</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Border and Error Colors */}
            <div style={{ marginBottom: '16px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>Border & Error</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Border Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setBorderColor('#d1d5db')}>Reset</Button>
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}>Error Color:</label>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                      type="color"
                      value={errorColor}
                      onChange={(e) => setErrorColor(e.target.value)}
                      style={{ width: '30px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
                    />
                    <input
                      type="text"
                      value={errorColor}
                      onChange={(e) => setErrorColor(e.target.value)}
                      style={{ flex: 1, padding: '6px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '12px' }}
                    />
                    <Button size="sm" variant="outline" onClick={() => setErrorColor('#ef4444')}>Reset</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset All Button */}
            <div style={{ marginBottom: '16px' }}>
              <Button
                onClick={resetCustomStyling}
                variant="outline"
                size="sm"
                style={{ color: '#ef4444', borderColor: '#ef4444' }}
              >
                Reset All Custom Styling
              </Button>
            </div>
          </div>

          {/* Effect Controls */}
          <div>
            <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>✨ Effect Controls</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Rounded Corners:</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Button
                    size="sm"
                    variant={rounded ? 'primary' : 'outline'}
                    onClick={() => setRounded(true)}
                  >
                    Rounded
                  </Button>
                  <Button
                    size="sm"
                    variant={!rounded ? 'primary' : 'outline'}
                    onClick={() => setRounded(false)}
                  >
                    Square
                  </Button>
                </div>
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Shadow:</label>
                <Dropdown
                  value={shadow}
                  onChange={(value) => setShadow(value as 'none' | 'sm' | 'md' | 'lg' | 'xl')}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'sm', label: 'Small' },
                    { value: 'md', label: 'Medium' },
                    { value: 'lg', label: 'Large' },
                    { value: 'xl', label: 'Extra Large' }
                  ]}
                  placeholder="Select shadow"
                  size="sm"
                />
              </div>
              
              <div>
                <label style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>Hover Effect:</label>
                <Dropdown
                  value={hoverEffect}
                  onChange={(value) => setHoverEffect(value as 'none' | 'lift' | 'glow' | 'scale')}
                  options={[
                    { value: 'none', label: 'None' },
                    { value: 'lift', label: 'Lift' },
                    { value: 'glow', label: 'Glow' },
                    { value: 'scale', label: 'Scale' }
                  ]}
                  placeholder="Select hover effect"
                  size="sm"
                />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
