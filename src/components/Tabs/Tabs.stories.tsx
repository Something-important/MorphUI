import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, Tab, TabPanel } from './Tabs';
import { ThemeProvider } from '../theme/ThemeProvider';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A sophisticated tabs component with advanced theming, accessibility, and smooth animations.',
      },
    },
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of tab items',
    },
    defaultActiveTab: {
      control: 'text',
      description: 'Default active tab ID',
    },
    activeTab: {
      control: 'text',
      description: 'Controlled active tab ID',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when active tab changes',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Tab orientation',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make tabs full width',
    },
    centered: {
      control: 'boolean',
      description: 'Center align tabs',
    },
    animated: {
      control: 'boolean',
      description: 'Enable animations',
    },
    closable: {
      control: 'boolean',
      description: 'Enable tab closing',
    },
    onTabClose: {
      action: 'tab closed',
      description: 'Callback when tab is closed',
    },
    glassmorphism: {
      control: 'boolean',
      description: 'Apply glassmorphism effect',
    },
    backgroundPattern: {
      control: 'text',
      description: 'CSS background pattern',
    },
    backgroundImage: {
      control: 'text',
      description: 'URL for background image',
    },
    backgroundBlend: {
      control: 'select',
      options: ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'],
      description: 'Background blend mode',
    },
    color: {
      control: 'color',
      description: 'Custom color',
    },
    gradient: {
      control: 'text',
      description: 'Custom gradient',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    borderRadius: {
      control: 'number',
      description: 'Custom border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    ariaLabel: {
      control: 'text',
      description: 'ARIA label for accessibility',
    },
    id: {
      control: 'text',
      description: 'Unique identifier',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Inline styles',
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem', maxWidth: '1000px', width: '100%' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tab items
const sampleItems = [
  {
    id: 'overview',
    label: 'Overview',
    content: (
      <div>
        <h3>Overview</h3>
        <p>This is the overview tab content. Here you can see a summary of all the important information.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
    ),
  },
  {
    id: 'details',
    label: 'Details',
    content: (
      <div>
        <h3>Details</h3>
        <p>This tab contains detailed information about the selected item.</p>
        <ul>
          <li>Feature 1: Advanced functionality</li>
          <li>Feature 2: Customizable options</li>
          <li>Feature 3: Performance optimized</li>
        </ul>
      </div>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    content: (
      <div>
        <h3>Settings</h3>
        <p>Configure your preferences and options here.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label>
            <input type="checkbox" /> Enable notifications
          </label>
          <label>
            <input type="checkbox" /> Auto-save changes
          </label>
          <label>
            <input type="checkbox" /> Dark mode
          </label>
        </div>
      </div>
    ),
  },
  {
    id: 'help',
    label: 'Help',
    content: (
      <div>
        <h3>Help & Support</h3>
        <p>Need assistance? Check out our documentation and support resources.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a href="#" style={{ color: 'var(--color-primary)' }}>📚 Documentation</a>
          <a href="#" style={{ color: 'var(--color-primary)' }}>❓ FAQ</a>
          <a href="#" style={{ color: 'var(--color-primary)' }}>💬 Contact Support</a>
        </div>
      </div>
    ),
  },
];

// Basic Usage
export const Basic: Story = {
  args: {
    items: sampleItems,
    defaultActiveTab: 'overview',
  },
};

// Simple Interactive Tabs
export const SimpleInteractive: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
      <div style={{ padding: '20px' }}>
        <h3>Simple Interactive Tabs</h3>
        <p>Click the tabs below to see them work:</p>
        
        <Tabs
          items={sampleItems}
          activeTab={activeTab}
          onChange={setActiveTab}
          variant="primary"
        />
        
        <div style={{ marginTop: '16px', padding: '12px', background: '#f0f0f0', borderRadius: '8px' }}>
          <strong>Current active tab:</strong> {activeTab}
        </div>
      </div>
    );
  },
};

// Controlled Tabs
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
              <Tabs
          items={sampleItems}
          activeTab={activeTab}
          onChange={setActiveTab}
          ariaLabel="Controlled tabs"
        />
    );
  },
};

// Tab Variants
export const Variants: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h3>Tab Variants</h3>
        
        <div>
          <h4>Primary Variant</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="primary"
          />
        </div>
        
        <div>
          <h4>Success Variant</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="success"
          />
        </div>
        
        <div>
          <h4>Warning Variant</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="warning"
          />
        </div>
        
        <div>
          <h4>Outline Variant</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="outline"
          />
        </div>
      </div>
    );
  },
};

// Tab Sizes
export const Sizes: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h3>Tab Sizes</h3>
        
        <div>
          <h4>Extra Small (xs)</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="xs"
          />
        </div>
        
        <div>
          <h4>Small (sm)</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="sm"
          />
        </div>
        
        <div>
          <h4>Medium (md) - Default</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="md"
          />
        </div>
        
        <div>
          <h4>Large (lg)</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="lg"
          />
        </div>
        
        <div>
          <h4>Extra Large (xl)</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            size="xl"
          />
        </div>
      </div>
    );
  },
};

// Tab Orientations
export const Orientations: Story = {
  render: () => {
    const [horizontalTab, setHorizontalTab] = useState('overview');
    const [verticalTab, setVerticalTab] = useState('overview');
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h3>Tab Orientations</h3>
        
        <div>
          <h4>Horizontal (Default)</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={horizontalTab}
            onChange={setHorizontalTab}
            orientation="horizontal"
          />
        </div>
        
        <div>
          <h4>Vertical</h4>
          <div style={{ height: '400px' }}>
            <Tabs
              items={sampleItems.slice(0, 3)}
              activeTab={verticalTab}
              onChange={setVerticalTab}
              orientation="vertical"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Tab Features
export const Features: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('overview');
    
    const itemsWithFeatures = [
      {
        id: 'overview',
        label: 'Overview',
        icon: '📊',
        badge: '3',
        content: <div><h3>Overview</h3><p>Content with icon and badge</p></div>,
      },
      {
        id: 'details',
        label: 'Details',
        icon: '⚙️',
        content: <div><h3>Details</h3><p>Content with icon</p></div>,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: '🔧',
        badge: 'New',
        content: <div><h3>Settings</h3><p>Content with icon and badge</p></div>,
      },
    ];
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <h3>Tab Features</h3>
        
        <div>
          <h4>With Icons and Badges</h4>
          <Tabs
            items={itemsWithFeatures}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="primary"
          />
        </div>
        
        <div>
          <h4>Full Width</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            fullWidth
          />
        </div>
        
        <div>
          <h4>Centered</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            centered
          />
        </div>
        
        <div>
          <h4>Closable Tabs</h4>
          <Tabs
            items={sampleItems.slice(0, 3)}
            activeTab={activeTab}
            onChange={setActiveTab}
            closable
            onTabClose={(tabId) => console.log('Closing tab:', tabId)}
          />
        </div>
      </div>
    );
  },
};

// Interactive Theme Builder
export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTab] = useState('default');
    const [activeTab, setActiveTab] = useState('overview');
    const [variant, setVariant] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'>('primary');
    const [size, setSize] = useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('lg');
    const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
    const [fullWidth, setFullWidth] = useState(false);
    const [centered, setCentered] = useState(false);
    const [animated, setAnimated] = useState(true);
    const [glassmorphism, setGlassmorphism] = useState(true);
    
    const themes = {
      default: {
        'color-primary': '#0070f3',
        'color-success': '#10b981',
        'color-warning': '#f59e0b',
        'color-danger': '#ef4444',
        'color-info': '#3b82f6',
        'color-secondary': '#6b7280',
        'color-background': '#ffffff',
        'color-text': '#111827',
        'color-border': '#d1d5db',
      },
      dark: {
        'color-primary': '#3b82f6',
        'color-success': '#10b981',
        'color-warning': '#f59e0b',
        'color-danger': '#ef4444',
        'color-info': '#06b6d4',
        'color-secondary': '#9ca3af',
        'color-background': '#1f2937',
        'color-text': '#f9fafb',
        'color-border': '#374151',
      },
      warm: {
        'color-primary': '#f97316',
        'color-success': '#f59e0b',
        'color-warning': '#dc2626',
        'color-danger': '#b91c1c',
        'color-info': '#f97316',
        'color-secondary': '#f59e0b',
        'color-background': '#fef3c7',
        'color-text': '#92400e',
        'color-border': '#fbbf24',
      },
      cool: {
        'color-primary': '#06b6d4',
        'color-success': '#059669',
        'color-warning': '#d97706',
        'color-danger': '#dc2626',
        'color-info': '#06b6d4',
        'color-secondary': '#3b82f6',
        'color-background': '#ecfeff',
        'color-text': '#0e7490',
        'color-border': '#22d3ee',
      }
    };
    
    const themeItems = [
      {
        id: 'overview',
        label: 'Overview',
        icon: '📊',
        content: (
          <div>
            <h3>Theme Overview</h3>
            <p>Current theme: <strong>{currentTheme}</strong></p>
            <p>This tab shows the current theme configuration and allows you to switch between different themes.</p>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', 
              gap: '1rem',
              marginTop: '1rem'
            }}>
              {Object.entries(themes).map(([name, theme]) => (
                <div
                  key={name}
                  style={{
                    padding: '1rem',
                    background: theme['color-background'],
                    border: `2px solid ${theme['color-border']}`,
                    borderRadius: '8px',
                    textAlign: 'center',
                    color: theme['color-text'],
                  }}
                >
                  <div style={{ 
                    width: '40px', 
                    height: '40px', 
                    background: theme['color-primary'], 
                    borderRadius: '50%',
                    margin: '0 auto 0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '20px'
                  }}>
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <strong>{name}</strong>
                </div>
              ))}
            </div>
          </div>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        icon: '⚙️',
        content: (
          <div>
            <h3>Theme Details</h3>
            <p>Detailed information about the current theme configuration.</p>
            <div style={{ 
              background: 'var(--color-background)', 
              padding: '1rem', 
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              marginTop: '1rem'
            }}>
              <h4>CSS Variables</h4>
              <div style={{ fontFamily: 'monospace', fontSize: '14px' }}>
                <div>--color-primary: <span style={{ color: 'var(--color-primary)' }}>{getComputedStyle(document.documentElement).getPropertyValue('--color-primary') || 'not set'}</span></div>
                <div>--color-background: <span style={{ color: 'var(--color-background)' }}>{getComputedStyle(document.documentElement).getPropertyValue('--color-background') || 'not set'}</span></div>
                <div>--color-text: <span style={{ color: 'var(--color-text)' }}>{getComputedStyle(document.documentElement).getPropertyValue('--color-text') || 'not set'}</span></div>
              </div>
            </div>
          </div>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: '🔧',
        content: (
          <div>
            <h3>Theme Settings</h3>
            <p>Customize your theme preferences here.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
              <label>
                <input type="checkbox" /> Enable animations
              </label>
              <label>
                <input type="checkbox" /> High contrast mode
              </label>
              <label>
                <input type="checkbox" /> Reduced motion
              </label>
            </div>
          </div>
        ),
      },
    ];
    
    return (
      <ThemeProvider theme={themes[currentTheme as keyof typeof themes]}>
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
              {Object.entries(themes).map(([name, theme]) => (
                <button
                  key={name}
                  onClick={() => {
                    console.log('Switching to theme:', name, theme);
                    setCurrentTab(name);
                  }}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${currentTheme === name ? theme['color-primary'] : theme['color-border']}`,
                    background: currentTheme === name ? theme['color-primary'] : 'transparent',
                    color: currentTheme === name ? 'white' : theme['color-text'],
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: currentTheme === name ? '600' : '400',
                  }}
                >
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs with Theme */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🎭 Themed Tabs</h3>
            <p style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>
              These tabs automatically adapt to the selected theme!
            </p>
            
            <Tabs
              items={themeItems}
              activeTab={activeTab}
              onChange={setActiveTab}
              variant={variant}
              size={size}
              orientation={orientation}
              fullWidth={fullWidth}
              centered={centered}
              animated={animated}
              glassmorphism={glassmorphism}
            />
          </div>

          {/* Tabs Customization Controls */}
          <div style={{ 
            background: 'var(--color-background)', 
            padding: '20px', 
            borderRadius: '12px', 
            border: '1px solid var(--color-border)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-text)' }}>🔧 Tabs Customization</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {/* Variant Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Variant:</label>
                <select 
                  value={variant} 
                  onChange={(e) => setVariant(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
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

              {/* Size Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Size:</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="xs">Extra Small</option>
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>

              {/* Orientation Control */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Orientation:</label>
                <select 
                  value={orientation} 
                  onChange={(e) => setOrientation(e.target.value as any)}
                  style={{ 
                    padding: '8px', 
                    borderRadius: '6px', 
                    border: '1px solid var(--color-border)',
                    background: 'var(--color-background)',
                    color: 'var(--color-text)',
                    fontSize: '14px'
                  }}
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                </select>
              </div>

              {/* Style Controls */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontWeight: '600', color: 'var(--color-text)' }}>Style Options:</label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={fullWidth} 
                      onChange={(e) => setFullWidth(e.target.checked)}
                    />
                    Full Width
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={centered} 
                      onChange={(e) => setCentered(e.target.checked)}
                    />
                    Centered
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={animated} 
                      onChange={(e) => setAnimated(e.target.checked)}
                    />
                    Animated
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text)' }}>
                    <input 
                      type="checkbox" 
                      checked={glassmorphism} 
                      onChange={(e) => setGlassmorphism(e.target.checked)}
                    />
                    Glassmorphism
                  </label>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => {
                  setVariant('primary');
                  setSize('lg');
                  setOrientation('horizontal');
                  setFullWidth(false);
                  setCentered(false);
                  setAnimated(true);
                  setGlassmorphism(true);
                }}
                style={{
                  padding: '12px 24px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};
