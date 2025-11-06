// Avatar.stories.tsx
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../Button';

export default {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile avatar component that displays user images with fallback to initials or icons. Supports status indicators, badges, multiple sizes, and full theming. Perfect for user profiles, lists, and navigation components.',
      },
    },
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: { type: 'select' },
      options: ['circle', 'square', 'rounded'],
    },
    status: {
      control: { type: 'select' },
      options: ['online', 'offline', 'away', 'busy'],
    },
  },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof Avatar>;

// Default
export const Default: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
    shape: 'circle',
  },
};

// With image
export const WithImage: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar src="https://i.pravatar.cc/150?img=1" name="Alice Johnson" alt="Alice" />
        <Avatar src="https://i.pravatar.cc/150?img=12" name="Bob Smith" alt="Bob" />
        <Avatar src="https://i.pravatar.cc/150?img=33" name="Charlie Brown" alt="Charlie" />
      </div>
    );
  },
};

// With initials (fallback)
export const WithInitials: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Alice Johnson" />
        <Avatar name="Bob" />
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    return (
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '2rem' }}>
        {sizes.map((size) => (
          <div
            key={size}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Avatar name="John Doe" size={size} />
            <span style={{ fontSize: '0.75rem', color: '#666' }}>{size.toUpperCase()}</span>
          </div>
        ))}
      </div>
    );
  },
};

// Shapes
export const Shapes: Story = {
  render: () => {
    const shapes: Array<'circle' | 'square' | 'rounded'> = ['circle', 'square', 'rounded'];
    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
        {shapes.map((shape) => (
          <div
            key={shape}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Avatar name="John Doe" shape={shape} size="lg" />
            <span style={{ fontSize: '0.875rem', color: '#666' }}>
              {shape.charAt(0).toUpperCase() + shape.slice(1)}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

// Status indicators
export const StatusIndicators: Story = {
  render: () => {
    const statuses: Array<'online' | 'offline' | 'away' | 'busy'> = [
      'online',
      'offline',
      'away',
      'busy',
    ];
    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
        {statuses.map((status) => (
          <div
            key={status}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <Avatar name="John Doe" status={status} size="lg" />
            <span style={{ fontSize: '0.875rem', color: '#666' }}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

// With badges
export const WithBadges: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', padding: '2rem' }}>
        <Avatar name="John Doe" badge={3} showBadge />
        <Avatar name="Jane Smith" badge={12} showBadge />
        <Avatar name="Alice" badge={99} showBadge />
        <Avatar name="Bob" badge={150} showBadge />
        <Avatar name="Charlie" badge="New" showBadge />
      </div>
    );
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Background Colors
          </h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar name="John Doe" color="#8b5cf6" />
            <Avatar name="Jane Smith" color="#f97316" />
            <Avatar name="Alice" color="#06b6d4" />
            <Avatar name="Bob" color="#ec4899" />
            <Avatar name="Charlie" color="#10b981" />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Text Colors
          </h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar name="John Doe" backgroundColor="#1f2937" textColor="#fbbf24" />
            <Avatar name="Jane Smith" backgroundColor="#065f46" textColor="#d1fae5" />
            <Avatar name="Alice" backgroundColor="#7c2d12" textColor="#fed7aa" />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Auto-generated Colors from Names
          </h3>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar name="Alice Johnson" />
            <Avatar name="Bob Smith" />
            <Avatar name="Charlie Brown" />
            <Avatar name="Diana Prince" />
            <Avatar name="Edward Norton" />
          </div>
          <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
            Each name generates a consistent color automatically
          </p>
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌈 Gradient Avatars
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Avatar
              name="John Doe"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              size="lg"
            />
            <Avatar
              name="Jane Smith"
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              size="lg"
            />
            <Avatar
              name="Alice"
              gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
              size="lg"
            />
            <Avatar
              name="Bob"
              gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
              size="lg"
            />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌈 Gradient with Status
          </h3>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <Avatar
              name="John Doe"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              status="online"
              size="lg"
            />
            <Avatar
              name="Jane Smith"
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              status="away"
              size="lg"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = React.useState<ThemeName>('light');

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>With Images</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar src="https://i.pravatar.cc/150?img=1" name="Alice" />
                <Avatar src="https://i.pravatar.cc/150?img=12" name="Bob" />
                <Avatar src="https://i.pravatar.cc/150?img=33" name="Charlie" />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem' }}>With Initials</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar name="John Doe" />
                <Avatar name="Jane Smith" />
                <Avatar name="Alice Johnson" />
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '1rem' }}>With Status</h3>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar name="Online User" status="online" />
                <Avatar name="Away User" status="away" />
                <Avatar name="Busy User" status="busy" />
                <Avatar name="Offline User" status="offline" />
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  },
};

// Group/Stack
export const AvatarGroup: Story = {
  render: () => {
    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Avatar Stack</h3>
          <div style={{ display: 'flex', gap: '-0.5rem', alignItems: 'center' }}>
            {['Alice', 'Bob', 'Charlie', 'Diana', 'Edward'].map((name, index) => (
              <div
                key={name}
                style={{
                  marginLeft: index > 0 ? '-0.5rem' : '0',
                  border: '2px solid white',
                  borderRadius: '50%',
                }}
              >
                <Avatar name={name} size="md" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>User List Example</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px' }}>
            {[
              { name: 'Alice Johnson', status: 'online' as const, badge: 3 },
              { name: 'Bob Smith', status: 'away' as const },
              { name: 'Charlie Brown', status: 'busy' as const, badge: 12 },
              { name: 'Diana Prince', status: 'online' as const },
            ].map((user) => (
              <div
                key={user.name}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              >
                <Avatar
                  name={user.name}
                  status={user.status}
                  badge={user.badge}
                  showBadge={!!user.badge}
                />
                <span style={{ fontWeight: '500' }}>{user.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// Image error fallback
export const ImageErrorFallback: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '2rem' }}>
        <Avatar src="https://invalid-url.com/image.jpg" name="John Doe" alt="John" />
        <Avatar src="https://invalid-url.com/image.jpg" name="Jane Smith" alt="Jane" />
        <p style={{ fontSize: '0.875rem', color: '#666' }}>
          Images fail to load → fallback to initials
        </p>
      </div>
    );
  },
};
