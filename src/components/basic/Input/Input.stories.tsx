// Input.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, Button, Dropdown, Checkbox, ThemeProvider, themes } from '../../index';

// Utility function to create controlled inputs with state
const createControlledInputs = (fields: string[]) => {
  const [values, setValues] = useState<Record<string, string>>(
    fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {})
  );
  
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
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
        component: 'Enhanced Input component with gradient backgrounds, icons, floating labels, validation, and advanced styling.',
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
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', maxWidth: '800px' }}>
          <Story />
        </div>
      </ThemeProvider>
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
      xl: ''
    });
    
    const handleChange = (size: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, [size]: e.target.value }));
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
      outline: ''
    });
    
    const handleChange = (variant: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, [variant]: e.target.value }));
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
      both: ''
    });
    
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, [field]: e.target.value }));
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
      'text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date', 'time'
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
      'basic', 'withError', 'withSuccess', 'withWarning', 'withInfo'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '500px' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
            Validation States
          </h3>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
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
    const { values, handleChange } = createControlledInputs([
      'limited', 'email', 'required'
    ]);
    
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
            custom: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0 ? 'Invalid email format' : null
          }}
        />
        
        <Input
          placeholder="Required field"
          value={values.required}
          onChange={handleChange('required')}
          shadow="md"
          validation={{
            required: true,
            custom: (value) => value.length === 0 ? 'This field is required' : null
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
      'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'C++', 'Go', 'Rust', 'Swift'
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
    const { values, handleChange } = createControlledInputs([
      'lift', 'glow', 'scale', 'ripple'
    ]);
    
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
      message: ''
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
              custom: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 0 ? 'Invalid email format' : null
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
              marginTop: '1rem'
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
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [inputValue, setInputValue] = useState('');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [floatingLabel, setFloatingLabel] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const [characterCount, setCharacterCount] = useState(false);
    
    // Advanced color states
    const [backgroundColor, setBackgroundColor] = useState('');
    const [backgroundColorGradient, setBackgroundColorGradient] = useState('');
    const [textColor, setTextColor] = useState('');
    const [textColorGradient, setTextColorGradient] = useState('');
    const [borderColor, setBorderColor] = useState('');
    const [borderColorGradient, setBorderColorGradient] = useState('');
    
    // Gradient builder states
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
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
      if (gradientColors.length < 2) return '';
      const colors = gradientColors.join(', ');
      
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${colors})`;
      } else if (gradientType === 'radial') {
        const direction = gradientDirection || 'circle at center';
        gradient = `radial-gradient(${direction}, ${colors})`;
      } else if (gradientType === 'conic') {
        const direction = gradientDirection || 'from 0deg at center';
        gradient = `conic-gradient(${direction}, ${colors})`;
      }
      
      return gradient;
    };

    const applyGradientToTarget = (target: string) => {
      const gradient = generateGradient();
      if (!gradient) return;
      
      switch (target) {
        case 'background':
          setBackgroundColorGradient(gradient);
          setBackgroundColor('');
          break;
        case 'text':
          setTextColorGradient(gradient);
          setTextColor('');
          break;
        case 'border':
          setBorderColorGradient(gradient);
          setBorderColor('');
          break;
      }
    };

    const resetCustomStyling = () => {
      setBackgroundColor('');
      setBackgroundColorGradient('');
      setTextColor('');
      setTextColorGradient('');
      setBorderColor('');
      setBorderColorGradient('');
    };
    
    return (
      <ThemeProvider theme={availableThemes[currentTheme as keyof typeof availableThemes]}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Theme Switcher */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎨 Theme Switcher</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              Current theme: <strong style={{ color: 'var(--color-primary)' }}>{currentTheme}</strong>
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.entries(availableThemes).map(([name, theme]) => (
                <Button
                  key={name}
                  onClick={() => {
                    setCurrentTheme(name);
                  }}
                  variant={currentTheme === name ? 'primary' : 'outline'}
                  size="sm"
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Input with Theme */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Input</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This input automatically adapts to the selected theme!
            </p>
            
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
              <Input
                placeholder={floatingLabel ? "Advanced themed input with floating label" : "🚀 Advanced Input - Try custom colors and gradients!"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant={variant}
                size={size}
                floatingLabel={floatingLabel}
                iconLeft={showIcons ? <span>🎛️</span> : undefined}
                iconRight={showIcons ? <span>✨</span> : undefined}
                characterCount={characterCount}
                maxLength={characterCount ? 50 : undefined}
                color={backgroundColorGradient.trim() || backgroundColor.trim() || undefined}
                gradient={backgroundColorGradient.trim() || undefined}
                textColor={textColorGradient.trim() || textColor.trim() || undefined}
                borderColor={borderColorGradient.trim() || borderColor.trim() || undefined}
                shadow="md"
                borderRadius={8}
              />
            </div>
          </div>

          {/* Input Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Input Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Basic Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Variant:</label>
                <Dropdown
                  options={[
                    { label: 'Primary', value: 'primary' },
                    { label: 'Secondary', value: 'secondary' },
                    { label: 'Success', value: 'success' },
                    { label: 'Warning', value: 'warning' },
                    { label: 'Info', value: 'info' },
                    { label: 'Danger', value: 'danger' },
                    { label: 'Ghost', value: 'ghost' },
                    { label: 'Outline', value: 'outline' }
                  ]}
                  value={variant}
                  onChange={(value) => setVariant(value as any)}
                  placeholder="Select variant"
                  size="sm"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <Dropdown
                  options={[
                    { label: 'Extra Small', value: 'xs' },
                    { label: 'Small', value: 'sm' },
                    { label: 'Medium', value: 'md' },
                    { label: 'Large', value: 'lg' },
                    { label: 'Extra Large', value: 'xl' }
                  ]}
                  value={size}
                  onChange={(value) => setSize(value as any)}
                  placeholder="Select size"
                  size="sm"
                />
              </div>

              {/* Feature Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Features:</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Checkbox
                    checked={floatingLabel}
                    onChange={(checked) => setFloatingLabel(checked)}
                    label="Floating Label"
                    size="sm"
                  />
                  <Checkbox
                    checked={showIcons}
                    onChange={(checked) => setShowIcons(checked)}
                    label="Show Icons"
                    size="sm"
                  />
                  <Checkbox
                    checked={characterCount}
                    onChange={(checked) => setCharacterCount(checked)}
                    label="Character Count"
                    size="sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Comprehensive Color Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-border)', 
            borderRadius: '8px', 
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
              🎨 Comprehensive Color Controls
            </h4>
            
            {/* Background Colors */}
            <div style={{ marginBottom: '24px' }}>
              <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>🎨 Background Colors</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Background Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={backgroundColor || '#ffffff'}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      placeholder="e.g., #ff0000 or red"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={() => { setBackgroundColor(''); setBackgroundColorGradient(''); }}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Background Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={backgroundColorGradient}
                      onChange={(e) => setBackgroundColorGradient(e.target.value)}
                      placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={() => setBackgroundColorGradient('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Text Colors */}
            <div style={{ marginBottom: '24px' }}>
              <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>📝 Text Colors</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={textColor || '#333333'}
                      onChange={(e) => setTextColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      placeholder="e.g., #ff0000 or red"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={() => { setTextColor(''); setTextColorGradient(''); }}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Text Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={textColorGradient}
                      onChange={(e) => setTextColorGradient(e.target.value)}
                      placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={() => setTextColorGradient('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Border Colors */}
            <div style={{ marginBottom: '24px' }}>
              <h5 style={{ marginBottom: '16px', fontSize: '14px', fontWeight: '600', color: 'var(--color-text)' }}>🔲 Border Colors</h5>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Color:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={borderColor || '#dddddd'}
                      onChange={(e) => setBorderColor(e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={borderColor}
                      onChange={(e) => setBorderColor(e.target.value)}
                      placeholder="e.g., #ff0000 or red"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={() => { setBorderColor(''); setBorderColorGradient(''); }}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Border Gradient:</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={borderColorGradient}
                      onChange={(e) => setBorderColorGradient(e.target.value)}
                      placeholder="e.g., linear-gradient(45deg, #ff0000, #00ff00)"
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    <button
                      onClick={() => setBorderColorGradient('')}
                      style={{
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Reset All Button */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button
                onClick={resetCustomStyling}
                style={{
                  padding: '8px 16px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Reset All Custom Colors
              </button>
            </div>
          </div>

          {/* Advanced Gradient Builder */}
          <div style={{ 
            background: 'var(--color-background)', 
            border: '1px solid var(--color-border)', 
            borderRadius: '8px', 
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '600', color: 'var(--color-text)' }}>
              🌈 Advanced Gradient Builder
            </h4>
            
            {/* Gradient Type Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Type:</label>
              <select 
                value={gradientType} 
                onChange={(e) => {
                  const newType = e.target.value;
                  setGradientType(newType);
                  if (newType === 'linear') {
                    setGradientDirection('90deg');
                  } else if (newType === 'radial') {
                    setGradientDirection('circle at center');
                  } else if (newType === 'conic') {
                    setGradientDirection('from 0deg at center');
                  }
                }}
                style={{ 
                  padding: '8px', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '4px', 
                  fontSize: '14px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)'
                }}
              >
                <option value="linear">Linear</option>
                <option value="radial">Radial</option>
                <option value="conic">Conic</option>
              </select>
              
              <label style={{ fontSize: '14px', minWidth: '80px', color: 'var(--color-text)' }}>Direction:</label>
              <input
                type="text"
                value={gradientDirection}
                onChange={(e) => setGradientDirection(e.target.value)}
                style={{ 
                  width: '120px', 
                  padding: '8px', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '4px', 
                  fontSize: '14px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)'
                }}
                placeholder={
                  gradientType === 'linear' ? '90deg' :
                  gradientType === 'radial' ? 'circle at center' :
                  'from 0deg at center'
                }
              />
            </div>
            
            {/* Color Picker Grid */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', color: 'var(--color-text)', marginBottom: '8px', display: 'block' }}>Colors:</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '8px' }}>
                {gradientColors.map((color, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="color"
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                    />
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => updateColor(index, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                    {gradientColors.length > 2 && (
                      <button
                        onClick={() => removeColor(index)}
                        style={{
                          padding: '4px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addColor}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                + Add Color
              </button>
            </div>
            
            {/* Gradient Preview */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '14px', color: 'var(--color-text)', marginBottom: '8px', display: 'block' }}>Preview:</label>
              <div
                style={{
                  width: '100%',
                  height: '40px',
                  background: generateGradient() || 'linear-gradient(90deg, #f43f5e, #3b82f6)',
                  borderRadius: '4px',
                  border: '1px solid var(--color-border)'
                }}
              />
            </div>
            
            {/* Apply Gradient Buttons */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button
                onClick={() => applyGradientToTarget('background')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Background
              </button>
              <button
                onClick={() => applyGradientToTarget('text')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Text
              </button>
              <button
                onClick={() => applyGradientToTarget('border')}
                style={{
                  padding: '6px 12px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  background: 'var(--color-background)',
                  color: 'var(--color-text)',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Border
              </button>
            </div>
          </div>

          {/* Theme Preview */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎨 Theme Preview</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              Current theme: <strong>{currentTheme}</strong>
            </p>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              This input automatically adapts to the selected theme!
            </p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              {Object.entries(availableThemes).map(([name, theme]) => (
                <div
                  key={name}
                  style={{
                    padding: '0.5rem',
                    background: theme['color-background'],
                    border: `2px solid ${theme['color-border']}`,
                    borderRadius: '6px',
                    textAlign: 'center',
                    color: theme['color-text'],
                    fontSize: '12px',
                  }}
                >
                  <div style={{ 
                    width: '20px', 
                    height: '20px', 
                    background: theme['color-primary'], 
                    borderRadius: '50%',
                    margin: '0 auto 0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '10px'
                  }}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <strong>{name}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive Theme Builder demonstrates how the Input component automatically adapts to different themes. Switch between themes to see how the component styling changes while maintaining its functionality.',
      },
    },
  },
};