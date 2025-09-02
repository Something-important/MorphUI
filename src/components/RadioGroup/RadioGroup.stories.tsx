import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import { Button } from '../Button/Button';
import { ThemeProvider } from '../theme/ThemeProvider';

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
    const [customColor, setCustomColor] = useState('#10b981');
    const [customGradient, setCustomGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});
    
    // Theme definitions
    const themes = {
      default: {},
      dark: {
        '--color-background': '#1f2937',
        '--color-text': '#f9fafb',
        '--color-border': '#374151',
        '--color-primary': '#3b82f6',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#6b7280',
      },
      warm: {
        '--color-background': '#fef3c7',
        '--color-text': '#92400e',
        '--color-border': '#f59e0b',
        '--color-primary': '#ea580c',
        '--color-success': '#16a34a',
        '--color-warning': '#d97706',
        '--color-danger': '#dc2626',
        '--color-info': '#0891b2',
        '--color-secondary': '#a16207',
      },
      cool: {
        '--color-background': '#dbeafe',
        '--color-text': '#1e40af',
        '--color-border': '#3b82f6',
        '--color-primary': '#2563eb',
        '--color-success': '#059669',
        '--color-warning': '#d97706',
        '--color-danger': '#dc2626',
        '--color-info': '#0891b2',
        '--color-secondary': '#475569',
      },
    };

    // Gradient presets
    const gradientPresets = {
      'gradient-sunset': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
      'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      'gradient-forest': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      'gradient-sunrise': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      'gradient-gold': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    };

    // Utility functions
    const applyTheme = (themeName: string) => {
      const theme = themes[themeName as keyof typeof themes];
      Object.entries(theme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
      setCurrentTheme(themeName);
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

    const generateGradient = () => {
      if (gradientColors.length < 2) return;
      const gradient = `${gradientType}-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      setCustomGradient(gradient);
    };

    const defaultOptions = [
      { label: 'Option 1', value: 'option1', description: 'First option with description' },
      { label: 'Option 2', value: 'option2', description: 'Second option with description' },
      { label: 'Option 3', value: 'option3', description: 'Third option with description' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Interactive Theme Builder</h3>
        
        {/* Theme Switcher */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎯 Theme Switcher</h4>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Object.keys(themes).map((themeName) => (
              <button
                key={themeName}
                onClick={() => applyTheme(themeName)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: currentTheme === themeName ? '#0070f3' : '#fff',
                  color: currentTheme === themeName ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  textTransform: 'capitalize',
                }}
              >
                {themeName}
              </button>
            ))}
          </div>
          
          {/* Theme Component Showcase */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Theme Colors
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['theme-colors']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'theme-colors': value as string }))}
                name="theme-colors"
                variant="primary"
                label="Theme Colors"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Theme Gradients
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['theme-gradients']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'theme-gradients': value as string }))}
                name="theme-gradients"
                containerGradient="linear-gradient(135deg, var(--color-primary) 0%, var(--color-success) 100%)"
                label="Theme Gradients"
              />
            </div>
          </div>
        </div>

        {/* Advanced Gradient Builder */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🔧 Advanced Gradient Builder</h4>
          
          {/* Gradient Type */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Type:</label>
              <select
                value={gradientType}
                onChange={(e) => setGradientType(e.target.value)}
                style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
              </select>
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
                style={{ width: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
                placeholder="90deg"
              />
            </div>
          </div>
          
          {/* Color Management */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Colors:</label>
              <button
                onClick={addColor}
                style={{
                  padding: '4px 8px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                + Add Color
              </button>
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
            <button
              onClick={generateGradient}
              style={{
                padding: '8px 16px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                background: '#0070f3',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Generate Gradient
            </button>
          </div>
          
          {/* Custom Gradient Input */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Custom Gradient:</label>
            <input
              type="text"
              value={customGradient}
              onChange={(e) => setCustomGradient(e.target.value)}
              style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)"
            />
          </div>
          
          {/* Gradient Preview */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '14px', display: 'block', marginBottom: '4px' }}>Preview:</label>
            <div 
              style={{ 
                width: '100%', 
                height: '60px', 
                background: customGradient, 
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
              {customGradient}
            </div>
          </div>
          
          {/* Generated RadioGroups */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Custom Gradient
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['custom-gradient']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'custom-gradient': value as string }))}
                name="custom-gradient"
                containerGradient={customGradient}
                label="Custom Gradient"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Rounded + Shadow
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['rounded-shadow']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'rounded-shadow': value as string }))}
                name="rounded-shadow"
                containerGradient={customGradient}
                rounded
                shadow="lg"
                label="Rounded + Shadow"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                All Effects
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['all-effects']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'all-effects': value as string }))}
                name="all-effects"
                containerGradient={customGradient}
                rounded
                shadow="xl"
                hoverEffect="lift"
                label="All Effects"
              />
            </div>
          </div>
        </div>
        
        {/* Custom Color Builder */}
        <div>
          <h4 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '500', color: '#555' }}>🎨 Custom Color Builder</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px' }}>Custom Color:</label>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                style={{ width: '50px', height: '30px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
              <span style={{ fontSize: '14px', color: '#666' }}>{customColor}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Custom Color
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['custom-color']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'custom-color': value as string }))}
                name="custom-color"
                containerColor={customColor}
                label="Custom Color"
              />
            </div>
            <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '8px' }}>
              <h5 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#666' }}>
                Custom + Effects
              </h5>
              <RadioGroup
                options={defaultOptions}
                value={selectedValues['custom-effects']}
                onChange={(value) => setSelectedValues(prev => ({ ...prev, 'custom-effects': value as string }))}
                name="custom-effects"
                containerColor={customColor}
                rounded
                shadow="lg"
                label="Custom + Effects"
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
