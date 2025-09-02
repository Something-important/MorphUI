// Button.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Mock icons for stories
const ChevronRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9,18 15,12 9,6"></polyline>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7,10 12,15 17,10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A highly customizable button component with support for variants, sizes, colors, gradients, loading states, icons, ripple effects, and advanced theming.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
    },
    hoverEffect: {
      control: { type: 'select' },
      options: ['none', 'lift', 'glow', 'scale'],
    },
    ripple: {
      control: { type: 'boolean' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    loadingText: {
      control: { type: 'text' },
    },
    iconLeft: {
      control: { type: 'text' },
    },
    iconRight: {
      control: { type: 'text' },
    },
    fullWidth: {
      control: { type: 'boolean' },
    },
    rounded: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    color: {
      control: { type: 'text' },
    },
    gradient: {
      control: { type: 'text' },
    },
    textColor: {
      control: { type: 'text' },
    },
    borderColor: {
      control: { type: 'text' },
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
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Primary Button',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="warning">Warning</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="info">Info</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const ShadowLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button shadow="none">No Shadow</Button>
        <Button shadow="sm">Small Shadow</Button>
        <Button shadow="md">Medium Shadow</Button>
        <Button shadow="lg">Large Shadow</Button>
        <Button shadow="xl">Extra Large Shadow</Button>
      </div>
    </div>
  ),
};

export const HoverEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button hoverEffect="lift">Lift Effect</Button>
        <Button hoverEffect="glow">Glow Effect</Button>
        <Button hoverEffect="scale">Scale Effect</Button>
        <Button hoverEffect="none">No Effect</Button>
      </div>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
      <Button iconLeft={<DownloadIcon />}>Download</Button>
      <Button variant="secondary" iconRight={<ChevronRightIcon />}>Continue</Button>
      <Button variant="ghost" iconLeft={<HeartIcon />} iconRight={<ChevronRightIcon />}>
        Like & Share
      </Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Basic Loading States</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button loading>Loading...</Button>
          <Button loading variant="success">Processing</Button>
          <Button loading variant="warning">Saving</Button>
          <Button loading variant="danger">Deleting</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Loading with Custom Text</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button loading loadingText="Submitting...">Submit</Button>
          <Button loading loadingText="Uploading..." variant="success">Upload File</Button>
          <Button loading loadingText="Please wait..." variant="info">Process Data</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Loading with Icons</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button loading iconLeft="📤" loadingText="Sending...">Send Message</Button>
          <Button loading iconRight="💾" loadingText="Saving...">Save Document</Button>
          <Button loading iconLeft="🔄" iconRight="✅" loadingText="Syncing...">Sync Data</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Loading with Gradients</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Button loading gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" loadingText="Processing...">
            Gradient Loading
      </Button>
          <Button loading gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)" loadingText="Working...">
            Colorful Loading
      </Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Loading vs Normal with Effects</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Button shadow="lg" hoverEffect="glow">Normal Button (Hover me!)</Button>
            <Button loading shadow="lg" hoverEffect="glow" loadingText="Loading...">Loading Button (Effects disabled)</Button>
          </div>
          <p style={{ fontSize: '12px', color: '#666', margin: '0', fontStyle: 'italic' }}>
            Notice: Loading buttons disable hover effects and show only the spinner
          </p>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Interactive Loading Demo</h3>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <LoadingDemo />
        </div>
      </div>
    </div>
  ),
};

// Interactive loading demo component
const LoadingDemo = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Processing...');
  
  const handleClick = () => {
    setIsLoading(true);
    // Simulate async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
      <Button 
        loading={isLoading} 
        loadingText={loadingText}
        onClick={handleClick}
        disabled={isLoading}
        variant="primary"
      >
        {isLoading ? 'Working...' : 'Click to Load'}
      </Button>
      <input
        type="text"
        value={loadingText}
        onChange={(e) => setLoadingText(e.target.value)}
        placeholder="Custom loading text..."
        style={{ 
          padding: '4px 8px', 
          border: '1px solid #ddd', 
          borderRadius: '4px', 
          fontSize: '12px',
          width: '150px'
        }}
      />
    </div>
  );
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button variant="success" disabled>Disabled Success</Button>
      <Button variant="warning" disabled>Disabled Warning</Button>
      <Button variant="danger" disabled>Disabled Danger</Button>
      <Button variant="info" disabled>Disabled Info</Button>
      <Button variant="ghost" disabled>Disabled Ghost</Button>
      <Button variant="outline" disabled>Disabled Outline</Button>
    </div>
  ),
};

export const FullWidthButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="outline" fullWidth iconLeft={<DownloadIcon />}>
        Full Width with Icon
      </Button>
    </div>
  ),
};

export const RoundedButtons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
      <Button rounded>Rounded Primary</Button>
      <Button variant="secondary" rounded>Rounded Secondary</Button>
      <Button variant="outline" rounded iconLeft={<HeartIcon />}>
        Rounded with Icon
      </Button>
    </div>
  ),
};

export const AsAnchorTag: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Button as="a" href="#" variant="primary">
        Link Button
      </Button>
      <Button as="a" href="#" variant="outline" iconRight={<ChevronRightIcon />}>
        External Link
      </Button>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button color="#10b981">Custom Green</Button>
        <Button color="#f59e0b">Custom Orange</Button>
        <Button color="#8b5cf6">Custom Purple</Button>
        <Button color="#ec4899">Custom Pink</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button color="#10b981" textColor="#ffffff">Green with White Text</Button>
        <Button color="#f59e0b" textColor="#000000">Orange with Black Text</Button>
        <Button color="#8b5cf6" borderColor="#4c1d95">Purple with Dark Border</Button>
      </div>
    </div>
  ),
};

export const Gradients: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button gradient="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)">Red to Blue</Button>
        <Button gradient="linear-gradient(90deg, #10b981 0%, #3b82f6 100%)">Green to Blue</Button>
        <Button gradient="linear-gradient(90deg, #f59e0b 0%, #ec4899 100%)">Orange to Pink</Button>
        <Button gradient="linear-gradient(90deg, #8b5cf6 0%, #06b6d4 100%)">Purple to Cyan</Button>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Diagonal Blue</Button>
        <Button gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">Diagonal Pink</Button>
        <Button gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)">Diagonal Cyan</Button>
      </div>
    </div>
  ),
};

export const ThemeIntegration: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Using Theme Keys</h3>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button color="color-success">Theme Success</Button>
        <Button color="color-warning">Theme Warning</Button>
        <Button color="color-info">Theme Info</Button>
        <Button gradient="gradient-primary">Theme Gradient</Button>
      </div>
      <h3 style={{ margin: '16px 0 12px 0', fontSize: '16px', fontWeight: '600' }}>Using CSS Variables</h3>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <Button color="--color-success">CSS Variable Success</Button>
        <Button color="--color-warning">CSS Variable Warning</Button>
        <Button gradient="--gradient-primary">CSS Variable Gradient</Button>
      </div>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Interactive Button',
    loading: false,
    disabled: false,
    fullWidth: false,
    rounded: false,
    loadingText: 'Loading...',
    shadow: 'md',
    hoverEffect: 'lift',
  },
};

export const ButtonGroups: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Action Group</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button size="sm">Edit</Button>
          <Button variant="secondary" size="sm">Duplicate</Button>
          <Button variant="danger" size="sm">Delete</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Form Actions</h3>
        <div style={{ 
          border: '1px solid #e5e7eb', 
          borderRadius: '8px', 
          padding: '20px',
          maxWidth: '400px'
        }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Title:</label>
            <input 
              type="text" 
              placeholder="Enter title"
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px'
              }}
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description:</label>
            <textarea 
              placeholder="Enter description"
              rows={3}
              style={{
                width: '100%',
                padding: '8px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                resize: 'vertical'
              }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            justifyContent: 'flex-start',
            borderTop: '1px solid #e5e7eb',
            paddingTop: '16px',
            marginTop: '16px'
          }}>
          <Button variant="ghost">Cancel</Button>
          <Button variant="outline">Save Draft</Button>
          <Button>Publish</Button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Status Buttons</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="success" size="sm">✓ Approved</Button>
          <Button variant="warning" size="sm">⚠ Pending</Button>
          <Button variant="danger" size="sm">✗ Rejected</Button>
          <Button variant="info" size="sm">ℹ Info</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '12px', fontSize: '16px', fontWeight: '600' }}>Navigation</h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="outline" size="sm">← Previous</Button>
          <Button size="sm">Next →</Button>
        </div>
      </div>
    </div>
  ),
};

export const ThemeVariations: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Theme Color Buttons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="info">Info</Button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
          💡 These buttons use theme colors - they change when you switch themes in the Interactive Theme Builder!
        </p>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🌈 Theme Gradient Buttons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button gradient="gradient-primary">Primary Gradient</Button>
          <Button gradient="gradient-success">Success Gradient</Button>
          <Button gradient="gradient-warning">Warning Gradient</Button>
          <Button gradient="gradient-danger">Danger Gradient</Button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
          💡 These buttons use theme gradients - they also change with themes!
        </p>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎭 Mixed Examples</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button rounded>Rounded Button</Button>
          <Button shadow="lg">Shadow Button</Button>
          <Button hoverEffect="glow">Glow Button</Button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
          💡 These show different button styles that work with any theme!
        </p>
      </div>
      
      <div style={{ 
        padding: '16px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How to Use Themes
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>1. Switch Themes:</strong> Go to the Interactive Theme Builder above and click different theme buttons.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>2. Watch Changes:</strong> All theme-based buttons above will instantly change colors!
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>3. Custom Colors:</strong> Use the color picker and gradient builder to create your own styles.
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>4. Integration:</strong> Copy working colors/gradients to use in your own Button components.
          </p>
        </div>
      </div>
    </div>
  ),
};

export const AdvancedGradients: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🌈 Complex Custom Gradients</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)">
            Multi-Color Gradient
          </Button>
          <Button gradient="radial-gradient(circle at 30% 20%, #ff6b6b, #4ecdc4, #45b7d1)">
            Radial Gradient
          </Button>
          <Button gradient="conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1, #ff6b6b)">
            Conic Gradient
          </Button>
          <Button gradient="linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)">
            Three-Stop Gradient
          </Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>✨ Gradients with Effects</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button gradient="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)" shadow="lg">
            Gradient + Shadow
          </Button>
          <Button gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" hoverEffect="glow">
            Gradient + Glow (Hover me!)
          </Button>
          <Button gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)" rounded shadow="xl">
            Gradient + Rounded + Shadow
          </Button>
          <Button gradient="conic-gradient(from 45deg, #ff6b6b, #4ecdc4, #45b7d1)" hoverEffect="scale">
            Gradient + Scale (Hover me!)
          </Button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
          💡 Hover over the buttons to see the effects in action!
        </p>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Custom Color Combinations</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button gradient="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)" textColor="#ffffff">
            Gradient + White Text
          </Button>
          <Button gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" borderColor="#4c1d95">
            Gradient + Custom Border
          </Button>
          <Button gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4)" textColor="#ffffff" borderColor="#dc2626">
            Gradient + White Text + Red Border
          </Button>
        </div>
      </div>
      
      <div style={{ 
        padding: '16px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How to Create Amazing Gradients
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>1. Linear Gradients:</strong> Use <code>linear-gradient(direction, color1, color2, ...)</code>
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>2. Radial Gradients:</strong> Use <code>radial-gradient(shape at position, color1, color2, ...)</code>
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>3. Conic Gradients:</strong> Use <code>conic-gradient(from angle, color1, color2, ...)</code>
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>4. Combine with Effects:</strong> Add shadows, hover effects, and rounded corners for amazing results!
          </p>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveThemeBuilder: Story = {
  render: () => {
    const [currentTheme, setCurrentTheme] = useState('default');
    const [customColor, setCustomColor] = useState('#10b981');
    const [customGradient, setCustomGradient] = useState('linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)');
    const [gradientType, setGradientType] = useState('linear');
    const [gradientDirection, setGradientDirection] = useState('90deg');
    const [gradientColors, setGradientColors] = useState(['#f43f5e', '#3b82f6']);
    
    const themes: Record<string, Record<string, string>> = {
      default: {
        '--color-primary': '#0070f3',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#6b7280',
        '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        '--gradient-success': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      },
      dark: {
        '--color-primary': '#3b82f6',
        '--color-success': '#10b981',
        '--color-warning': '#f59e0b',
        '--color-danger': '#ef4444',
        '--color-info': '#06b6d4',
        '--color-secondary': '#9ca3af',
        '--gradient-primary': 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
        '--gradient-success': 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
      },
      warm: {
        '--color-primary': '#f97316',
        '--color-success': '#f59e0b',
        '--color-warning': '#dc2626',
        '--color-danger': '#b91c1c',
        '--color-info': '#f97316',
        '--color-secondary': '#f59e0b',
        '--gradient-primary': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        '--gradient-success': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
      },
      cool: {
        '--color-primary': '#06b6d4',
        '--color-success': '#3b82f6',
        '--color-warning': '#8b5cf6',
        '--color-danger': '#ec4899',
        '--color-info': '#06b6d4',
        '--color-secondary': '#3b82f6',
        '--gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        '--gradient-success': 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
      }
    };
    
    const applyTheme = (themeName: string) => {
      const theme = themes[themeName as keyof typeof themes];
      if (theme) {
        Object.entries(theme).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value);
        });
        setCurrentTheme(themeName);
      }
    };

    const generateGradient = () => {
      let gradient = '';
      if (gradientType === 'linear') {
        gradient = `linear-gradient(${gradientDirection}, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'radial') {
        gradient = `radial-gradient(circle, ${gradientColors.join(', ')})`;
      } else if (gradientType === 'conic') {
        gradient = `conic-gradient(from ${gradientDirection}, ${gradientColors.join(', ')})`;
      }
      setCustomGradient(gradient);
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
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Theme Switcher</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Object.keys(themes).map(themeName => (
              <button
                key={themeName}
                onClick={() => applyTheme(themeName)}
                style={{
                  padding: '8px 16px',
                  border: '1px solid #ddd',
                  borderRadius: '6px',
                  background: currentTheme === themeName ? '#0070f3' : '#fff',
                  color: currentTheme === themeName ? '#fff' : '#333',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
              </button>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
            Current theme: <strong>{currentTheme}</strong> - Click theme buttons to see all buttons change colors!
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎯 Theme Buttons (These Change with Theme!)</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="info">Info</Button>
            <Button gradient="gradient-primary">Primary Gradient</Button>
            <Button gradient="gradient-success">Success Gradient</Button>
          </div>
          <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
            💡 Try switching themes above - these buttons will change colors automatically!
          </p>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🔧 Advanced Gradient Builder</h3>
          
          {/* Gradient Type Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
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
            
            <label style={{ fontSize: '14px', minWidth: '80px' }}>Direction:</label>
            <input
              type="text"
              value={gradientDirection}
              onChange={(e) => setGradientDirection(e.target.value)}
              style={{ width: '80px', padding: '8px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
              placeholder="90deg"
            />
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
          
          {/* Generated Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Button gradient={customGradient}>Custom Gradient</Button>
            <Button gradient={customGradient} rounded>Rounded</Button>
            <Button gradient={customGradient} shadow="lg">With Shadow</Button>
            <Button gradient={customGradient} hoverEffect="glow">With Glow</Button>
            <Button gradient={customGradient} rounded shadow="xl" hoverEffect="lift">All Effects</Button>
          </div>
        </div>
        
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Custom Color Builder</h3>
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            <Button color={customColor}>Custom Color</Button>
            <Button color={customColor} textColor="#ffffff">Custom + White Text</Button>
            <Button color={customColor} rounded shadow="lg">Custom + Effects</Button>
          </div>
        </div>
      </div>
    );
  },
};

export const RippleEffects: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>✨ Ripple Effects</h3>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px', lineHeight: '1.5' }}>
          Click any button below to see the Material Design-style ripple effect! The ripple appears where you click and spreads outward.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button ripple>Click Me!</Button>
          <Button ripple variant="success">Success Ripple</Button>
          <Button ripple variant="warning">Warning Ripple</Button>
          <Button ripple variant="danger">Danger Ripple</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🎨 Ripple with Different Styles</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button ripple rounded>Rounded Ripple</Button>
          <Button ripple shadow="lg">Shadow + Ripple</Button>
          <Button ripple hoverEffect="glow">Glow + Ripple</Button>
          <Button ripple gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">Gradient Ripple</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>🔄 Ripple with Icons</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button ripple iconLeft="🚀">Launch with Ripple</Button>
          <Button ripple iconRight="💾" variant="success">Save with Ripple</Button>
          <Button ripple iconLeft="📤" iconRight="📥">Transfer with Ripple</Button>
        </div>
      </div>
      
      <div>
        <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>⚡ Ripple vs No Ripple</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <Button>No Ripple</Button>
          <Button ripple>With Ripple</Button>
          <Button variant="outline">No Ripple</Button>
          <Button variant="outline" ripple>With Ripple</Button>
        </div>
        <p style={{ fontSize: '12px', color: '#666', margin: '8px 0 0 0', fontStyle: 'italic' }}>
          💡 Notice the difference? Ripple adds a satisfying click feedback!
        </p>
      </div>
      
      <div style={{ 
        padding: '16px', 
        background: '#f8fafc', 
        borderRadius: '8px', 
        border: '1px solid #e2e8f0' 
      }}>
        <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#334155' }}>
          🚀 How Ripple Effects Work
        </h4>
        <div style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>1. Click Detection:</strong> Ripple appears exactly where you click on the button.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>2. Animation:</strong> Smooth scale and fade animation that spreads outward.
          </p>
          <p style={{ margin: '0 0 8px 0' }}>
            <strong>3. Auto-Cleanup:</strong> Ripple elements are automatically removed after animation.
          </p>
          <p style={{ margin: '0 0 0 0' }}>
            <strong>4. Performance:</strong> Lightweight DOM manipulation with CSS animations.
          </p>
        </div>
      </div>
    </div>
  ),
};