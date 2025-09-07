import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, themes, type ThemeName } from '../components/theme';
import { Button } from '../components/basic/Button/Button';
import { Badge } from '../components/basic/Badge/Badge';
import { Card } from '../components/interactive/Card/Card';
import { Input } from '../components/basic/Input/Input';
import { Checkbox } from '../components/basic/Checkbox/Checkbox';
import { Switch } from '../components/basic/Switch/Switch';
import { Toggle } from '../components/basic/Toggle/Toggle';

// Custom Theme Example - Shows how users can create their own themes
const customOrangeTheme = {
  // Base colors - Orange theme
  'color-primary': '#ea580c',
  'color-primary-hover': '#c2410c',
  'color-primary-active': '#9a3412',
  'color-secondary': '#f97316',
  'color-secondary-hover': '#ea580c',
  'color-secondary-active': '#c2410c',
  'color-danger': '#ef4444',
  'color-danger-hover': '#dc2626',
  'color-danger-active': '#b91c1c',
  'color-success': '#10b981',
  'color-success-hover': '#059669',
  'color-success-active': '#047857',
  'color-warning': '#f59e0b',
  'color-warning-hover': '#d97706',
  'color-warning-active': '#b45309',
  'color-info': '#06b6d4',
  'color-info-hover': '#0891b2',
  'color-info-active': '#0e7490',
  
  // Light color variants
  'color-primary-light': 'rgba(234, 88, 12, 0.1)',
  'color-secondary-light': 'rgba(249, 115, 22, 0.1)',
  'color-success-light': 'rgba(16, 185, 129, 0.1)',
  'color-warning-light': 'rgba(245, 158, 11, 0.1)',
  'color-danger-light': 'rgba(239, 68, 68, 0.1)',
  'color-info-light': 'rgba(6, 182, 212, 0.1)',
  
  // Neutral colors - Orange-tinted grays
  'color-white': '#ffffff',
  'color-black': '#000000',
  'color-gray-50': '#fff7ed',
  'color-gray-100': '#ffedd5',
  'color-gray-200': '#fed7aa',
  'color-gray-300': '#fdba74',
  'color-gray-400': '#fb923c',
  'color-gray-500': '#f97316',
  'color-gray-600': '#ea580c',
  'color-gray-700': '#c2410c',
  'color-gray-800': '#9a3412',
  'color-gray-900': '#7c2d12',
  
  // Background colors
  'color-background': '#fff7ed',
  'color-background-secondary': '#ffedd5',
  'color-background-tertiary': '#fed7aa',
  'color-background-hover': 'rgba(234, 88, 12, 0.05)',
  'color-background-disabled': '#ffedd5',
  'color-background-light': '#ffedd5',
  
  // Text colors
  'color-text': '#7c2d12',
  'color-text-primary': '#7c2d12',
  'color-text-secondary': '#9a3412',
  'color-text-muted': '#c2410c',
  'color-text-disabled': '#fb923c',
  'color-text-inverse': '#fff7ed',
  
  // Border colors
  'color-border': '#fdba74',
  'color-border-hover': '#fb923c',
  'color-border-focus': '#ea580c',
  'color-border-light': '#fed7aa',
  
  // Gradients - Orange theme
  'gradient-primary': 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  'gradient-info': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  
  // Typography
  'font-family': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  'font-family-mono': 'JetBrains Mono, Fira Code, Consolas, monospace',
  'font-size-sm': '12px',
  'font-size-md': '14px',
  'font-size-lg': '16px',
  'line-height-md': '1.5',
  
  // Spacing
  'spacing-xs': '0.25rem',
  'spacing-sm': '0.5rem',
  'spacing-md': '1rem',
  'spacing-lg': '1.5rem',
  'spacing-xl': '2rem',
  'spacing-2xl': '3rem',
  
  // Border radius
  'border-radius': '6px',
  'border-radius-sm': '4px',
  'border-radius-md': '8px',
  'border-radius-lg': '12px',
  'border-radius-xl': '16px',
  'border-radius-full': '9999px',
  
  // Shadows
  'shadow-sm': '0 1px 2px 0 rgba(234, 88, 12, 0.05)',
  'shadow-md': '0 4px 6px -1px rgba(234, 88, 12, 0.1), 0 2px 4px -1px rgba(234, 88, 12, 0.06)',
  'shadow-lg': '0 10px 15px -3px rgba(234, 88, 12, 0.1), 0 4px 6px -2px rgba(234, 88, 12, 0.05)',
  'shadow-xl': '0 20px 25px -5px rgba(234, 88, 12, 0.1), 0 10px 10px -5px rgba(234, 88, 12, 0.04)',
  
  // Transitions
  'transition-fast': '0.15s ease-in-out',
  'transition-normal': '0.2s ease-in-out',
  'transition-slow': '0.3s ease-in-out',
  
  // Z-index
  'z-dropdown': '1000',
  'z-modal': '1050',
  'z-tooltip': '1100',
  'z-toast': '1150',
};

const meta: Meta = {
  title: 'Theme/Theme Showcase',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive showcase of all available themes in MorphUI. Users can switch between built-in themes, see how components look with different color schemes, and experiment with custom colors and gradients using the interactive controls.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj;

export const ThemeShowcase: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState<ThemeName | 'custom'>('light');
    
    // Custom styling state
    const [customColors, setCustomColors] = useState({
      primary: '',
      text: '',
      border: ''
    });
    
    const [customGradients, setCustomGradients] = useState({
      primary: '',
      text: '',
      border: ''
    });
    
    // Advanced gradient builder state
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#ff0000', '#00ff00']);
    
    // Helper functions
    const generateGradient = () => {
      if (gradientColors.length < 2) return '';
      const colors = gradientColors.join(', ');
      return `${gradientType}-gradient(${gradientDirection}, ${colors})`;
    };
    
    const applyGradientToTarget = (target: 'primary' | 'text' | 'border') => {
      const gradient = generateGradient();
      if (target === 'primary') {
        setCustomGradients({...customGradients, primary: gradient});
      } else if (target === 'text') {
        setCustomGradients({...customGradients, text: gradient});
      } else if (target === 'border') {
        setCustomGradients({...customGradients, border: gradient});
      }
    };
    
    const resetCustomStyling = () => {
      setCustomColors({ primary: '', text: '', border: '' });
      setCustomGradients({ primary: '', text: '', border: '' });
      setGradientType('linear');
      setGradientDirection('90deg');
      setGradientColors(['#ff0000', '#00ff00']);
    };
    
    // Combine built-in themes with custom theme
    const allThemes = {
      ...themes,
      custom: customOrangeTheme
    };
    
    return (
      <ThemeProvider theme={allThemes[currentTheme]}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'var(--color-text)'
            }}>
              MorphUI Theme Showcase
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--color-text-secondary)',
              marginBottom: '2rem'
            }}>
              Switch between built-in themes to see how components adapt to different color schemes, or use the interactive controls below to experiment with custom colors and gradients
            </p>
            
            {/* Theme Switcher */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem', 
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}>
              {Object.keys(allThemes).map(themeName => (
                <Button 
                  key={themeName}
                  variant={currentTheme === themeName ? 'primary' : 'secondary'}
                  onClick={() => setCurrentTheme(themeName as ThemeName | 'custom')}
                  style={{ 
                    textTransform: 'capitalize',
                    minWidth: '100px'
                  }}
                >
                  {themeName}
                </Button>
              ))}
            </div>
            
            {/* Current Theme Info */}
            <div style={{ 
              padding: '1rem', 
              backgroundColor: 'var(--color-background-secondary)',
              borderRadius: 'var(--border-radius)',
              border: '1px solid var(--color-border)'
            }}>
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>
                Current Theme: <span style={{ textTransform: 'capitalize' }}>{currentTheme}</span>
              </h3>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                Primary: <code style={{ 
                  backgroundColor: 'var(--color-background-tertiary)',
                  padding: '0.2rem 0.4rem',
                  borderRadius: '4px',
                  fontSize: '0.9rem'
                }}>{allThemes[currentTheme]['color-primary']}</code>
              </p>
            </div>
          </div>
          
          {/* Component Showcase */}
          <div style={{ display: 'grid', gap: '2rem' }}>
            
            {/* Buttons Section */}
            <Card>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Buttons</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="success">Success</Button>
                <Button variant="warning">Warning</Button>
                <Button variant="danger">Danger</Button>
                <Button variant="info">Info</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </Card>

            {/* Custom Button - Shows theme adaptation */}
            <div style={{
              backgroundColor: 'var(--color-background-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--border-radius)',
              padding: 'var(--spacing-lg)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>
                🎨 Custom Button
              </h2>
              <p style={{ 
                margin: '0 0 1rem 0', 
                fontSize: '14px', 
                color: 'var(--color-text-secondary)',
                lineHeight: '1.5'
              }}>
                Custom button using HTML &lt;button&gt; tags that automatically adapts to theme changes.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button
                  style={{
                    backgroundColor: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                    border: 'none',
                    padding: 'var(--spacing-sm) var(--spacing-md)',
                    borderRadius: 'var(--border-radius)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: '500',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-family)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'var(--transition-normal)',
                  }}
                >
                  Custom Button
                </button>
              </div>
            </div>
            
            {/* Form Controls Section */}
            <Card>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Form Controls</h2>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    Input Field
                  </label>
                  <Input 
                    placeholder="Enter text..." 
                    value=""
                    onChange={() => {}}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    Checkbox
                  </label>
                  <Checkbox label="Check this option" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    Switch
                  </label>
                  <Switch label="Toggle switch" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text)' }}>
                    Toggle
                  </label>
                  <Toggle label="Toggle button" />
                </div>
              </div>
            </Card>
            
            {/* Badges Section */}
            <Card>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Badges</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </Card>
            
            {/* Color Palette Section */}
            <Card>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Color Palette</h2>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>Primary Colors</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-primary)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Primary" />
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-success)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Success" />
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-warning)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Warning" />
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-danger)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Danger" />
                  </div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>Background Colors</h4>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-background)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Background" />
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-background-secondary)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Secondary Background" />
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      backgroundColor: 'var(--color-background-tertiary)',
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)'
                    }} title="Tertiary Background" />
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Usage Examples Section */}
            <Card>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Usage Examples</h2>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>Using Built-in Themes</h4>
                  <pre style={{ 
                    backgroundColor: 'var(--color-background-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.9rem',
                    overflow: 'auto',
                    border: '1px solid var(--color-border)'
                  }}>
{`import { ThemeProvider, themes } from 'morphui-react';

<ThemeProvider theme={themes.dark}>
  <Button>Dark Theme Button</Button>
</ThemeProvider>`}
                  </pre>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)' }}>Creating Custom Themes</h4>
                  <pre style={{ 
                    backgroundColor: 'var(--color-background-secondary)',
                    padding: '1rem',
                    borderRadius: 'var(--border-radius)',
                    fontSize: '0.9rem',
                    overflow: 'auto',
                    border: '1px solid var(--color-border)'
                  }}>
{`const myTheme = {
  'color-primary': '#ff6b6b',
  'color-success': '#51cf66',
  'color-background': '#f8f9fa'
};

<ThemeProvider theme={myTheme}>
  <Button>Custom Theme</Button>
</ThemeProvider>`}
                  </pre>
                </div>
              </div>
            </Card>
            
            {/* Custom Styling Controls */}
            <Card style={{ marginTop: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>
                🎨 Custom Styling Controls
              </h2>
              
              {/* Precedence Information */}
              <div style={{ 
                marginBottom: '1.5rem', 
                padding: '1rem', 
                backgroundColor: 'var(--color-background-secondary)', 
                borderRadius: 'var(--border-radius)', 
                border: '1px solid var(--color-border)',
                borderLeft: '4px solid var(--color-primary)'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-text)', fontSize: '1rem' }}>
                  🎯 Color Precedence
                </h3>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  Colors are applied in this order of priority:
                </p>
                <ol style={{ margin: '0', paddingLeft: '1.5rem', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
                  <li><strong>Gradients</strong> - Highest priority (overrides everything)</li>
                  <li><strong>Custom Colors</strong> - Overrides theme defaults</li>
                  <li><strong>Theme Colors</strong> - Default theme values</li>
                </ol>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '12px', color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  💡 Tip: Use gradients for eye-catching effects, solid colors for consistency, or leave empty to use theme defaults.
                </p>
              </div>
              
              <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                
                {/* Custom Colors Section */}
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Custom Colors</h3>
                  
                  {/* Primary Color */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Primary Color:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={customColors.primary || '#3b82f6'} 
                        onChange={(e) => setCustomColors({...customColors, primary: e.target.value})}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={customColors.primary} 
                        onChange={(e) => setCustomColors({...customColors, primary: e.target.value})}
                        placeholder="e.g., #ff0000"
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
                        onClick={() => setCustomColors({...customColors, primary: ''})}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Text Color */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Text Color:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={customColors.text || '#ffffff'} 
                        onChange={(e) => setCustomColors({...customColors, text: e.target.value})}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={customColors.text} 
                        onChange={(e) => setCustomColors({...customColors, text: e.target.value})}
                        placeholder="e.g., #ffffff"
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
                        onClick={() => setCustomColors({...customColors, text: ''})}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Border Color */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Border Color:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="color" 
                        value={customColors.border || '#e5e7eb'} 
                        onChange={(e) => setCustomColors({...customColors, border: e.target.value})}
                        style={{ width: '40px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                      />
                      <input 
                        type="text" 
                        value={customColors.border} 
                        onChange={(e) => setCustomColors({...customColors, border: e.target.value})}
                        placeholder="e.g., #e5e7eb"
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
                        onClick={() => setCustomColors({...customColors, border: ''})}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Custom Gradients Section */}
                <div>
                  <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>Custom Gradients</h3>
                  
                  {/* Primary Gradient */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Primary Gradient:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={customGradients.primary} 
                        onChange={(e) => setCustomGradients({...customGradients, primary: e.target.value})}
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
                        onClick={() => setCustomGradients({...customGradients, primary: ''})}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Text Gradient */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Text Gradient:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={customGradients.text} 
                        onChange={(e) => setCustomGradients({...customGradients, text: e.target.value})}
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
                        onClick={() => setCustomGradients({...customGradients, text: ''})}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                  
                  {/* Border Gradient */}
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Border Gradient:
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="text" 
                        value={customGradients.border} 
                        onChange={(e) => setCustomGradients({...customGradients, border: e.target.value})}
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
                        onClick={() => setCustomGradients({...customGradients, border: ''})}
                        style={{
                          padding: '6px 8px',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          background: 'var(--color-background)',
                          color: 'var(--color-text)',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Advanced Gradient Builder */}
              <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--color-background-secondary)', borderRadius: 'var(--border-radius)', border: '1px solid var(--color-border)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>🎨 Advanced Gradient Builder</h3>
                
                <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  {/* Gradient Type */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Gradient Type:
                    </label>
                    <select 
                      value={gradientType}
                      onChange={(e) => setGradientType(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    >
                      <option value="linear">Linear</option>
                      <option value="radial">Radial</option>
                      <option value="conic">Conic</option>
                    </select>
                  </div>
                  
                  {/* Gradient Direction */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                      Direction:
                    </label>
                    <input 
                      type="text" 
                      value={gradientDirection}
                      onChange={(e) => setGradientDirection(e.target.value)}
                      placeholder="e.g., 90deg, to right, circle"
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        background: 'var(--color-background)',
                        color: 'var(--color-text)',
                        fontSize: '12px'
                      }}
                    />
                  </div>
                </div>
                
                {/* Gradient Colors */}
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                    Colors:
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {gradientColors.map((color, index) => (
                      <div key={index} style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                        <input 
                          type="color" 
                          value={color}
                          onChange={(e) => {
                            const newColors = [...gradientColors];
                            newColors[index] = e.target.value;
                            setGradientColors(newColors);
                          }}
                          style={{ width: '32px', height: '32px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                        />
                        {gradientColors.length > 2 && (
                          <button 
                            onClick={() => {
                              const newColors = gradientColors.filter((_, i) => i !== index);
                              setGradientColors(newColors);
                            }}
                            style={{
                              padding: '2px 6px',
                              border: '1px solid var(--color-border)',
                              borderRadius: '4px',
                              background: 'var(--color-background)',
                              color: 'var(--color-text)',
                              cursor: 'pointer',
                              fontSize: '10px'
                            }}
                          >
                            ×
                          </button>
                        )}
                      </div>
                    ))}
                    <button 
                      onClick={() => setGradientColors([...gradientColors, '#000000'])}
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
                      + Add Color
                    </button>
                  </div>
                </div>
                
                {/* Gradient Preview */}
                <div style={{ marginTop: '1rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--color-text)' }}>
                    Preview:
                  </label>
                  <div 
                    style={{
                      width: '100%',
                      height: '40px',
                      background: generateGradient(),
                      borderRadius: 'var(--border-radius)',
                      border: '1px solid var(--color-border)',
                      marginBottom: '1rem'
                    }}
                  />
                  <code style={{ 
                    display: 'block',
                    padding: '0.5rem',
                    backgroundColor: 'var(--color-background-tertiary)',
                    borderRadius: '4px',
                    fontSize: '11px',
                    color: 'var(--color-text)',
                    wordBreak: 'break-all'
                  }}>
                    {generateGradient()}
                  </code>
                </div>
                
                {/* Apply Buttons */}
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => applyGradientToTarget('primary')}
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
                    Apply to Primary
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
                    Apply to Text
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
                    Apply to Border
                  </button>
                </div>
              </div>
              
              {/* Reset All Button */}
              <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                <button 
                  onClick={resetCustomStyling}
                  style={{
                    padding: '8px 16px',
                    border: '1px solid var(--color-border)',
                    borderRadius: '4px',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  🔄 Reset All Custom Styling
                </button>
              </div>
            </Card>
            
            {/* Custom Button */}
            <Card style={{ marginTop: '2rem' }}>
              <h2 style={{ margin: '0 0 1rem 0', color: 'var(--color-text)' }}>
                🎨 Custom Button
              </h2>
              <p style={{ 
                margin: '0 0 1.5rem 0', 
                fontSize: '14px', 
                color: 'var(--color-text-secondary)',
                lineHeight: '1.5'
              }}>
                This button uses your custom colors and gradients. Use the controls above to customize it!
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <Button 
                  color={customGradients.primary.trim() || customColors.primary.trim() || undefined}
                  textColor={customGradients.text.trim() || customColors.text.trim() || undefined}
                  borderColor={customGradients.border.trim() || customColors.border.trim() || undefined}
                >
                  Custom Button
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};


