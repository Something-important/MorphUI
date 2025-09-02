// Input.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { ThemeProvider } from '../theme/ThemeProvider';

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
      control: { type: 'select' },
      options: ['gradient-sunset', 'gradient-ocean', 'gradient-forest', 'gradient-sunrise', 'gradient-purple', 'gradient-gold'],
      description: 'Gradient background preset',
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
    mask: {
      control: { type: 'select' },
      options: ['phone', 'credit-card', 'date', 'time', 'currency'],
      description: 'Input mask for formatting',
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
        placeholder="Enter your text here... (type to see it work!)"
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
          placeholder="Primary variant (default) - type here!"
          variant="primary"
          value={values.primary}
          onChange={handleChange('primary')}
        />
        <Input
          placeholder="Secondary variant - type here!"
          variant="secondary"
          value={values.secondary}
          onChange={handleChange('secondary')}
        />
        <Input
          placeholder="Success variant - type here!"
          variant="success"
          value={values.success}
          onChange={handleChange('success')}
        />
        <Input
          placeholder="Warning variant - type here!"
          variant="warning"
          value={values.warning}
          onChange={handleChange('warning')}
        />
        <Input
          placeholder="Info variant - type here!"
          variant="info"
          value={values.info}
          onChange={handleChange('info')}
        />
        <Input
          placeholder="Danger variant - type here!"
          variant="danger"
          value={values.danger}
          onChange={handleChange('danger')}
        />
        <Input
          placeholder="Ghost variant - type here!"
          variant="ghost"
          value={values.ghost}
          onChange={handleChange('ghost')}
        />
        <Input
          placeholder="Outline variant - type here!"
          variant="outline"
          value={values.outline}
          onChange={handleChange('outline')}
        />
      </div>
    );
  },
};

// Gradient Backgrounds
export const GradientBackgrounds: Story = {
  render: () => {
    const [values, setValues] = useState({
      sunset: '',
      ocean: '',
      forest: '',
      sunrise: '',
      purple: '',
      gold: ''
    });
    
    const handleChange = (gradient: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues(prev => ({ ...prev, [gradient]: e.target.value }));
    };
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Sunset gradient - type here!"
          gradient="gradient-sunset"
          value={values.sunset}
          onChange={handleChange('sunset')}
          textColor="#ffffff"
          borderColor="transparent"
        />
        <Input
          placeholder="Ocean gradient - type here!"
          gradient="gradient-ocean"
          value={values.ocean}
          onChange={handleChange('ocean')}
          textColor="#ffffff"
          borderColor="transparent"
        />
        <Input
          placeholder="Forest gradient - type here!"
          gradient="gradient-forest"
          value={values.forest}
          onChange={handleChange('forest')}
          textColor="#ffffff"
          borderColor="transparent"
        />
        <Input
          placeholder="Sunrise gradient - type here!"
          gradient="gradient-sunrise"
          value={values.sunrise}
          onChange={handleChange('sunrise')}
          textColor="#ffffff"
          borderColor="transparent"
        />
        <Input
          placeholder="Purple gradient - type here!"
          gradient="gradient-purple"
          value={values.purple}
          onChange={handleChange('purple')}
          textColor="#ffffff"
          borderColor="transparent"
        />
        <Input
          placeholder="Gold gradient - type here!"
          gradient="gradient-gold"
          value={values.gold}
          onChange={handleChange('gold')}
          textColor="#ffffff"
          borderColor="transparent"
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
          placeholder="Search with left icon - type here!"
          iconLeft={<span>🔍</span>}
          value={values.search}
          onChange={handleChange('search')}
          shadow="md"
        />
        
        <Input
          placeholder="Email with right icon - type here!"
          type="email"
          iconRight={<span>✉️</span>}
          value={values.email}
          onChange={handleChange('email')}
          shadow="md"
        />
        
        <Input
          placeholder="Floating label input - type here!"
          floatingLabel={true}
          value={values.floating}
          onChange={handleChange('floating')}
          shadow="lg"
          borderRadius={12}
        />
        
        <Input
          placeholder="Both icons + floating label - type here!"
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
      'text', 'email', 'password', 'number', 'search', 'tel', 'url', 'date', 'time', 'month', 'week', 'color', 'range'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Text input (default) - type here!"
          type="text"
          value={values.text}
          onChange={handleChange('text')}
          iconLeft={<span>📝</span>}
        />
        <Input
          placeholder="Email input - type here!"
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
          placeholder="Number input - type here!"
          type="number"
          value={values.number}
          onChange={handleChange('number')}
          iconLeft={<span>🔢</span>}
        />
        <Input
          placeholder="Search input - type here!"
          type="search"
          value={values.search}
          onChange={handleChange('search')}
          iconLeft={<span>🔍</span>}
        />
        <Input
          placeholder="Tel input - type here!"
          type="tel"
          value={values.tel}
          onChange={handleChange('tel')}
          iconLeft={<span>📞</span>}
        />
        <Input
          placeholder="URL input - type here!"
          type="url"
          value={values.url}
          onChange={handleChange('url')}
          iconLeft={<span>🌐</span>}
        />
        <Input
          placeholder="Date input - type here!"
          type="date"
          value={values.date}
          onChange={handleChange('date')}
          iconLeft={<span>📅</span>}
        />
        <Input
          placeholder="Time input - type here!"
          type="time"
          value={values.time}
          onChange={handleChange('time')}
          iconLeft={<span>⏰</span>}
        />
        <Input
          placeholder="Month input - type here!"
          type="month"
          value={values.month}
          onChange={handleChange('month')}
          iconLeft={<span>📆</span>}
        />
        <Input
          placeholder="Week input - type here!"
          type="week"
          value={values.week}
          onChange={handleChange('week')}
          iconLeft={<span>📊</span>}
        />
        <Input
          placeholder="Color input - type here!"
          type="color"
          value={values.color}
          onChange={handleChange('color')}
          iconLeft={<span>🎨</span>}
        />
        <Input
          placeholder="Range input - type here!"
          type="range"
          min="0"
          max="100"
          value={values.range}
          onChange={handleChange('range')}
          iconLeft={<span>📊</span>}
        />
      </div>
    );
  },
};

// Input Masks
export const InputMasks: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs([
      'phone', 'creditCard', 'date', 'time', 'currency'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <Input
          placeholder="Phone number - type here!"
          mask="phone"
          value={values.phone}
          onChange={handleChange('phone')}
          iconLeft={<span>📞</span>}
          shadow="md"
        />
        
        <Input
          placeholder="Credit card - type here!"
          mask="credit-card"
          value={values.creditCard}
          onChange={handleChange('creditCard')}
          iconLeft={<span>💳</span>}
          shadow="md"
        />
        
        <Input
          placeholder="Date (MM/DD/YYYY) - type here!"
          mask="date"
          value={values.date}
          onChange={handleChange('date')}
          iconLeft={<span>📅</span>}
          shadow="md"
        />
        
        <Input
          placeholder="Time (HH:MM) - type here!"
          mask="time"
          value={values.time}
          onChange={handleChange('time')}
          iconLeft={<span>⏰</span>}
          shadow="md"
        />
        
        <Input
          placeholder="Currency - type here!"
          mask="currency"
          value={values.currency}
          onChange={handleChange('currency')}
          iconLeft={<span>💰</span>}
          shadow="md"
        />
      </div>
    );
  },
};

// Validation States with Icons
export const ValidationStatesWithIcons: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs([
      'basic', 'withError', 'withSuccess', 'withWarning', 'withInfo'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '500px' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--color-text-primary)' }}>
            Automatic Validation Icons
          </h3>
          <p style={{ marginBottom: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Validation state icons appear automatically when you set the corresponding props. 
            Icons are properly centered and use theme colors.
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
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates how validation state icons appear automatically. Set `success={true}`, `warning={true}`, `info={true}`, or `error={true}` to show the corresponding icon. Icons are automatically centered and positioned on the right side of the input.'
      }
    }
  }
};

// Character Count and Limits
export const CharacterCountAndLimits: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs([
      'limited', 'minLength', 'email', 'customLimit', 'styledCount'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Limited to 50 characters - type here!"
          maxLength={50}
          characterCount={true}
          value={values.limited}
          onChange={handleChange('limited')}
          shadow="md"
        />
        
        <Input
          placeholder="Custom limit of 25 characters - type here!"
          characterCount={true}
          characterCountLimit={25}
          characterCountStyle="custom"
          value={values.customLimit}
          onChange={handleChange('customLimit')}
          shadow="md"
        />
        
        <Input
          placeholder="Warning style at 80% - type here!"
          maxLength={100}
          characterCount={true}
          characterCountStyle="warning"
          value={values.styledCount}
          onChange={handleChange('styledCount')}
          shadow="md"
        />
        
        <Input
          placeholder="Minimum 5 characters - type here!"
          minLength={5}
          value={values.minLength}
          onChange={handleChange('minLength')}
          shadow="md"
          validation={{
            min: 5,
            custom: (value) => value.length < 5 ? 'Minimum 5 characters required' : null
          }}
        />
        
        <Input
          placeholder="Pattern validation (email) - type here!"
          type="email"
          value={values.email}
          onChange={handleChange('email')}
          shadow="md"
          validation={{
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            custom: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null
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
      'lift', 'glow', 'scale', 'ripple', 'combination'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Lift effect on hover - type here!"
          hoverEffect="lift"
          value={values.lift}
          onChange={handleChange('lift')}
          shadow="md"
        />
        <Input
          placeholder="Glow effect on hover - type here!"
          hoverEffect="glow"
          value={values.glow}
          onChange={handleChange('glow')}
          shadow="md"
        />
        <Input
          placeholder="Scale effect on hover - type here!"
          hoverEffect="scale"
          value={values.scale}
          onChange={handleChange('scale')}
          shadow="md"
        />
        <Input
          placeholder="Ripple effect on click - type here!"
          ripple={true}
          value={values.ripple}
          onChange={handleChange('ripple')}
          shadow="md"
        />
        <Input
          placeholder="Lift + Ripple combination - type here!"
          hoverEffect="lift"
          ripple={true}
          value={values.combination}
          onChange={handleChange('combination')}
          shadow="lg"
        />
      </div>
    );
  },
};

// Layout Variants
export const LayoutVariants: Story = {
  render: () => {
    const { values, handleChange } = createControlledInputs([
      'fullWidth', 'rounded', 'combination'
    ]);
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
        <Input
          placeholder="Full width input - type here!"
          fullWidth={true}
          value={values.fullWidth}
          onChange={handleChange('fullWidth')}
          shadow="md"
        />
        <Input
          placeholder="Rounded input - type here!"
          rounded={true}
          value={values.rounded}
          onChange={handleChange('rounded')}
          shadow="md"
        />
        <Input
          placeholder="Full width + Rounded - type here!"
          fullWidth={true}
          rounded={true}
          value={values.combination}
          onChange={handleChange('combination')}
          shadow="lg"
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
        placeholder="Custom colors and styling"
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
      console.log('Form submitted:', formData);
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
              custom: (value) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Invalid email format' : null
            }}
            shadow="md"
          />
          
          <Input
            placeholder="Phone Number"
            mask="phone"
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

// Interactive Theme Builder (Required Standard) - Must be at the bottom
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [inputValue, setInputValue] = useState('');
    const [selectedVariant, setSelectedVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [selectedSize, setSelectedSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [selectedShadow, setSelectedShadow] = useState<'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'>('md');
    const [selectedHoverEffect, setSelectedHoverEffect] = useState<'none' | 'lift' | 'glow' | 'scale'>('lift');
    const [customColor, setCustomColor] = useState('');
    const [customGradient, setCustomGradient] = useState('');
    const [customTextColor, setCustomTextColor] = useState('');
    const [customBorderColor, setCustomBorderColor] = useState('');
    const [borderRadius, setBorderRadius] = useState(8);
    const [rounded, setRounded] = useState(false);
    const [ripple, setRipple] = useState(false);
    const [fullWidth, setFullWidth] = useState(false);
    const [floatingLabel, setFloatingLabel] = useState(false);
    const [showIcons, setShowIcons] = useState(false);
    const [backdropBlur, setBackdropBlur] = useState(false);
    const [characterCount, setCharacterCount] = useState(false);
    const [characterCountLimit, setCharacterCountLimit] = useState(50);
    const [characterCountStyle, setCharacterCountStyle] = useState<'default' | 'custom' | 'warning' | 'danger'>('default');
    const [validationState, setValidationState] = useState<'none' | 'success' | 'warning' | 'info' | 'error'>('none');
    const [errorMessage, setErrorMessage] = useState('');
    
    return (
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <div style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          backgroundColor: '#f8fafc', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0'
        }}>
          <h3 style={{ margin: '0 0 1.5rem 0', color: '#1e293b' }}>🎨 Interactive Theme Builder</h3>
          <p style={{ margin: '0 0 1.5rem 0', color: '#64748b', fontSize: '0.875rem' }}>
            Customize the Input component in real-time. All changes are applied instantly to the preview below.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            {/* Variant Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Variant:
              </label>
              <select 
                value={selectedVariant} 
                onChange={(e) => setSelectedVariant(e.target.value as any)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="danger">Danger</option>
                <option value="ghost">Ghost</option>
                <option value="outline">Outline</option>
              </select>
            </div>

            {/* Size Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Size:
              </label>
              <select 
                value={selectedSize} 
                onChange={(e) => setSelectedSize(e.target.value as any)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              >
                <option value="xs">Extra Small</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
              </select>
            </div>

            {/* Shadow Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Shadow:
              </label>
              <select 
                value={selectedShadow} 
                onChange={(e) => setSelectedShadow(e.target.value as 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl')}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              >
                <option value="none">None</option>
                <option value="sm">Small</option>
                <option value="md">Medium</option>
                <option value="lg">Large</option>
                <option value="xl">Extra Large</option>
                <option value="2xl">2XL</option>
              </select>
            </div>

            {/* Hover Effect Selection */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Hover Effect:
              </label>
              <select 
                value={selectedHoverEffect} 
                onChange={(e) => setSelectedHoverEffect(e.target.value as any)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              >
                <option value="none">None</option>
                <option value="lift">Lift</option>
                <option value="glow">Glow</option>
                <option value="scale">Scale</option>
              </select>
            </div>

            {/* Custom Color */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Custom Color:
              </label>
              <input
                type="text"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                placeholder="e.g., #ff6b6b, --color-success"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            {/* Custom Gradient */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Custom Gradient:
              </label>
              <input
                type="text"
                value={customGradient}
                onChange={(e) => setCustomGradient(e.target.value)}
                placeholder="e.g., linear-gradient(45deg, #ff6b6b, #4ecdc4)"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            {/* Custom Text Color */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Text Color:
              </label>
              <input
                type="text"
                value={customTextColor}
                onChange={(e) => setCustomTextColor(e.target.value)}
                placeholder="e.g., #ffffff, --color-text"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            {/* Custom Border Color */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Border Color:
              </label>
              <input
                type="text"
                value={customBorderColor}
                onChange={(e) => setCustomBorderColor(e.target.value)}
                placeholder="e.g., transparent, --color-primary"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            {/* Border Radius */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Border Radius: {borderRadius}px
              </label>
              <input
                type="range"
                min="0"
                max="24"
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {/* Character Count Limit */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Character Count Limit: {characterCountLimit}
              </label>
              <input
                type="range"
                min="10"
                max="200"
                value={characterCountLimit}
                onChange={(e) => setCharacterCountLimit(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            {/* Character Count Style */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Character Count Style:
              </label>
              <select 
                value={characterCountStyle} 
                onChange={(e) => setCharacterCountStyle(e.target.value as any)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              >
                <option value="default">Default</option>
                <option value="custom">Custom</option>
                <option value="warning">Warning</option>
                <option value="danger">Danger</option>
              </select>
            </div>

            {/* Validation State */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Validation State:
              </label>
              <select 
                value={validationState} 
                onChange={(e) => setValidationState(e.target.value as any)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              >
                <option value="none">None</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
                <option value="info">Info</option>
                <option value="error">Error</option>
              </select>
            </div>

            {/* Error Message */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Error Message:
              </label>
              <input
                type="text"
                value={errorMessage}
                onChange={(e) => setErrorMessage(e.target.value)}
                placeholder="e.g., This field is required"
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '0.875rem'
                }}
              />
            </div>

            {/* Checkboxes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={rounded} 
                  onChange={(e) => setRounded(e.target.checked)}
                />
                Rounded
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={ripple} 
                  onChange={(e) => setRipple(e.target.checked)}
                />
                Ripple Effect
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={fullWidth} 
                  onChange={(e) => setFullWidth(e.target.checked)}
                />
                Full Width
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={floatingLabel} 
                  onChange={(e) => setFloatingLabel(e.target.checked)}
                />
                Floating Label
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={showIcons} 
                  onChange={(e) => setShowIcons(e.target.checked)}
                />
                Show Icons
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={backdropBlur} 
                  onChange={(e) => setBackdropBlur(e.target.checked)}
                />
                Backdrop Blur
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '500', color: '#374151' }}>
                <input 
                  type="checkbox" 
                  checked={characterCount} 
                  onChange={(e) => setCharacterCount(e.target.checked)}
                />
                Character Count
              </label>
            </div>
          </div>
        </div>
        
        {/* Preview Section */}
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#ffffff', 
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#1e293b' }}>🎯 Live Preview</h4>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: fullWidth ? '100%' : '400px' }}>
              <Input
                placeholder={floatingLabel ? "Interactive demo - customize above!" : "Interactive demo - customize above!"}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                variant={selectedVariant}
                size={selectedSize}
                shadow={selectedShadow}
                hoverEffect={selectedHoverEffect}
                color={customColor || undefined}
                gradient={customGradient || undefined}
                textColor={customTextColor || undefined}
                borderColor={customBorderColor || undefined}
                borderRadius={borderRadius}
                rounded={rounded}
                ripple={ripple}
                fullWidth={fullWidth}
                floatingLabel={floatingLabel}
                iconLeft={showIcons ? <span>🎛️</span> : undefined}
                iconRight={showIcons ? <span>✨</span> : undefined}
                backdropBlur={backdropBlur}
                characterCount={characterCount}
                characterCountLimit={characterCountLimit}
                characterCountStyle={characterCountStyle}
                success={validationState === 'success'}
                warning={validationState === 'warning'}
                info={validationState === 'info'}
                error={validationState === 'error'}
                errorMessage={errorMessage}
              />
            </div>
          </div>
        </div>

        {/* Code Output */}
        <div style={{ 
          padding: '1.5rem', 
          backgroundColor: '#1e293b', 
          borderRadius: '12px',
          color: '#e2e8f0',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          overflow: 'auto'
        }}>
          <h4 style={{ margin: '0 0 1rem 0', color: '#f1f5f9' }}>📋 Generated Code</h4>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
{`<Input
  placeholder="${floatingLabel ? "Interactive demo - customize above!" : "Interactive demo - customize above!"}"
  value={inputValue}
  onChange={(e) => setInputValue(e.target.value)}
  variant="${selectedVariant}"
  size="${selectedSize}"
  shadow="${selectedShadow}"
  hoverEffect="${selectedHoverEffect}"
  ${customColor ? `color="${customColor}"` : ''}
  ${customGradient ? `gradient="${customGradient}"` : ''}
  ${customTextColor ? `textColor="${customTextColor}"` : ''}
  ${customBorderColor ? `borderColor="${customBorderColor}"` : ''}
  borderRadius={${borderRadius}}
  rounded={${rounded}}
  ripple={${ripple}}
  fullWidth={${fullWidth}}
  floatingLabel={${floatingLabel}}
  ${showIcons ? `iconLeft={<span>🎛️</span>}` : ''}
  ${showIcons ? `iconRight={<span>✨</span>}` : ''}
  backdropBlur={${backdropBlur}}
  ${characterCount ? `characterCount={${characterCount}}` : ''}
  ${characterCount ? `characterCountLimit={${characterCountLimit}}` : ''}
  ${characterCount && characterCountStyle !== 'default' ? `characterCountStyle="${characterCountStyle}"` : ''}
  ${validationState === 'success' ? `success={true}` : ''}
  ${validationState === 'warning' ? `warning={true}` : ''}
  ${validationState === 'info' ? `info={true}` : ''}
  ${validationState === 'error' ? `error={true}` : ''}
  ${errorMessage ? `errorMessage="${errorMessage}"` : ''}
/>`}
          </pre>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive Theme Builder allows you to customize all Input properties in real-time. Use this to experiment with different combinations and generate the exact code you need.',
      },
    },
  },
};
