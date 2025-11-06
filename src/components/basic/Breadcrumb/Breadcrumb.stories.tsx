// Breadcrumb.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';
import { Button } from '../Button';
import { ThemeProvider, themes, type ThemeName } from '../../theme';

export default {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A navigation component that displays the current page location within a hierarchy. Perfect for showing users where they are and allowing them to navigate back through the path.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Breadcrumb>;

type Story = StoryObj<typeof Breadcrumb>;

// Basic
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Team' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Primary</h3>
          <Breadcrumb items={items} variant="primary" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Secondary</h3>
          <Breadcrumb items={items} variant="secondary" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Ghost</h3>
          <Breadcrumb items={items} variant="ghost" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Outline</h3>
          <Breadcrumb items={items} variant="outline" />
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Extra Small (xs)</h3>
          <Breadcrumb items={items} size="xs" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Small (sm)</h3>
          <Breadcrumb items={items} size="sm" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Medium (md)</h3>
          <Breadcrumb items={items} size="md" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Large (lg)</h3>
          <Breadcrumb items={items} size="lg" />
        </div>
      </div>
    );
  },
};

// Custom separators
export const CustomSeparators: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Default (/)</h3>
          <Breadcrumb items={items} />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Arrow (→)</h3>
          <Breadcrumb items={items} separator="→" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Chevron (›)</h3>
          <Breadcrumb items={items} separator="›" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Custom Icon</h3>
          <Breadcrumb items={items} separator={<span style={{ color: '#9ca3af' }}>•</span>} />
        </div>
      </div>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/', icon: '🏠' },
      { label: 'Documents', href: '/documents', icon: '📄' },
      { label: 'Reports', href: '/documents/reports', icon: '📊' },
      { label: 'Q4 Report', icon: '📈' },
    ];

    return <Breadcrumb items={items} />;
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Current' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Custom Text Color</h3>
          <Breadcrumb items={items} textColor="#8b5cf6" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Custom Active Color</h3>
          <Breadcrumb items={items} activeColor="#ef4444" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Custom Separator Color</h3>
          <Breadcrumb items={items} separatorColor="#f59e0b" />
        </div>
        <div>
          <h3 style={{ marginBottom: '0.5rem' }}>Multiple Custom Colors</h3>
          <Breadcrumb
            items={items}
            textColor="#6366f1"
            activeColor="#ec4899"
            separatorColor="#14b8a6"
          />
        </div>
      </div>
    );
  },
};

// Interactive
export const Interactive: Story = {
  render: () => {
    const [currentPath, setCurrentPath] = React.useState(['Home', 'Products', 'Electronics']);

    const items = currentPath.map((label, index) => ({
      label,
      onClick:
        index < currentPath.length - 1
          ? () => setCurrentPath(currentPath.slice(0, index + 1))
          : undefined,
    }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Breadcrumb items={items} />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Button size="sm" onClick={() => setCurrentPath([...currentPath, 'New Item'])}>
            Add Level
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setCurrentPath(currentPath.slice(0, -1))}
            disabled={currentPath.length <= 1}
          >
            Remove Level
          </Button>
          <Button size="sm" variant="outline" onClick={() => setCurrentPath(['Home'])}>
            Reset
          </Button>
        </div>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = React.useState<ThemeName>('light');
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ];

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

          <Breadcrumb items={items} />
        </div>
      </ThemeProvider>
    );
  },
};

// Long paths
export const LongPaths: Story = {
  render: () => {
    const items = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Computers', href: '/products/electronics/computers' },
      { label: 'Laptops', href: '/products/electronics/computers/laptops' },
      { label: 'Gaming Laptops', href: '/products/electronics/computers/laptops/gaming' },
      { label: 'High Performance' },
    ];

    return (
      <div style={{ maxWidth: '800px' }}>
        <Breadcrumb items={items} />
      </div>
    );
  },
};
