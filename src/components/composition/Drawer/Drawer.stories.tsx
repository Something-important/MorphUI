// Drawer.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../../basic/Button';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Input } from '../../basic/Input';
import { Label } from '../../basic/Label';

export default {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A slide-in panel component that can appear from any edge of the screen. Perfect for navigation menus, filters, settings panels, and secondary content. Supports animations, custom styling, and full accessibility.',
      },
    },
  },
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['left', 'right', 'top', 'bottom'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
    },
  },
} satisfies Meta<typeof Drawer>;

type Story = StoryObj<typeof Drawer>;

// Default
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <p>This is the drawer content.</p>
        </Drawer>
      </div>
    );
  },
};

// Positions
export const Positions: Story = {
  render: () => {
    const positions: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'left',
      'right',
      'top',
      'bottom',
    ];
    const [openPosition, setOpenPosition] = useState<string | null>(null);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {positions.map((position) => (
            <Button key={position} onClick={() => setOpenPosition(position)}>
              Open {position.charAt(0).toUpperCase() + position.slice(1)}
            </Button>
          ))}
        </div>

        {positions.map((position) => (
          <Drawer
            key={position}
            isOpen={openPosition === position}
            onClose={() => setOpenPosition(null)}
            position={position}
            title={`Drawer from ${position}`}
          >
            <p>This drawer slides in from the {position} side.</p>
          </Drawer>
        ))}
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    const [openSize, setOpenSize] = useState<string | null>(null);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {sizes.map((size) => (
            <Button key={size} onClick={() => setOpenSize(size)}>
              Open {size.toUpperCase()}
            </Button>
          ))}
        </div>

        {sizes.map((size) => (
          <Drawer
            key={size}
            isOpen={openSize === size}
            onClose={() => setOpenSize(null)}
            size={size}
            position="right"
            title={`${size.toUpperCase()} Drawer`}
          >
            <p>This is a {size} sized drawer.</p>
          </Drawer>
        ))}
      </div>
    );
  },
};

// With header and footer
export const WithHeaderFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Drawer with Header/Footer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Settings"
          description="Manage your application settings"
          footer={
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)}>Save Changes</Button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value="" onChange={() => {}} placeholder="Enter name" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" value="" onChange={() => {}} placeholder="Enter email" />
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Custom Colored Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          backgroundColor="#1f2937"
          textColor="#ffffff"
          headerBackgroundColor="#111827"
          title="Dark Drawer"
        >
          <p style={{ color: '#e5e7eb' }}>This drawer has a custom dark theme.</p>
        </Drawer>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Gradient Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
          textColor="#ffffff"
          title="Gradient Drawer"
        >
          <p style={{ color: '#ffffff' }}>This drawer has a beautiful gradient background.</p>
        </Drawer>
      </div>
    );
  },
};

// Glassmorphism
export const Glassmorphism: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        style={{
          padding: '2rem',
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Button onClick={() => setIsOpen(true)}>Open Glassmorphism Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          glassmorphism
          backdropBlur
          title="Glassmorphism Drawer"
        >
          <p>This drawer has a frosted glass effect.</p>
        </Drawer>
      </div>
    );
  },
};

// Without backdrop
export const WithoutBackdrop: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Drawer Without Backdrop</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          backdrop={false}
          title="No Backdrop"
        >
          <p>This drawer doesn't have a backdrop overlay.</p>
        </Drawer>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <ThemeProvider theme={themes[theme]}>
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ marginBottom: '15px' }}>Theme Switching Demo</h2>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              style={{
                padding: '10px 15px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #d1d5db',
                cursor: 'pointer',
              }}
            >
              {Object.keys(themes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)} Theme
                </option>
              ))}
            </select>
            <p style={{ marginTop: '10px', color: '#6b7280' }}>
              Current theme: <strong>{theme}</strong>
            </p>
          </div>

          <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
          <Drawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            title="Theme Switched Drawer"
            description="This drawer adapts to the selected theme"
          >
            <p>Drawer content that respects the theme settings.</p>
          </Drawer>
        </div>
      </ThemeProvider>
    );
  },
};

// Full-width drawer
export const FullWidth: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div style={{ padding: '2rem' }}>
        <Button onClick={() => setIsOpen(true)}>Open Full-Width Drawer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="full"
          position="left"
          title="Full-Width Drawer"
        >
          <p>This drawer takes up the full height of the viewport.</p>
        </Drawer>
      </div>
    );
  },
};
