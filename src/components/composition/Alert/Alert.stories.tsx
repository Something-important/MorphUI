// Alert.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Alert, type AlertPosition } from './Alert';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../../basic/Button';

export default {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A flexible alert/notification component with positioning, auto-dismiss, animations, and full theming support. Perfect for toast notifications, inline alerts, and user feedback messages.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info', 'primary', 'secondary'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    position: {
      control: { type: 'select' },
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
    },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'slide-up', 'slide-down'],
    },
    dismissible: {
      control: { type: 'boolean' },
    },
    autoDismiss: {
      control: { type: 'boolean' },
    },
    dismissDuration: {
      control: { type: 'number' },
    },
    showIcon: {
      control: { type: 'boolean' },
    },
    glassmorphism: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story: any) => (
      <div style={{ minHeight: '100vh', padding: '20px', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

type Story = StoryObj<typeof Alert>;

// Basic variants
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success!',
    children: 'Your changes have been saved successfully.',
    position: 'top-right',
    open: true,
    dismissible: true,
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'Something went wrong. Please try again.',
    position: 'top-right',
    open: true,
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your input before submitting.',
    position: 'top-right',
    open: true,
    dismissible: true,
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'New features are now available. Check them out!',
    position: 'top-right',
    open: true,
    dismissible: true,
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const [open, setOpen] = useState({
      xs: true,
      sm: true,
      md: true,
      lg: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <Alert
          size="xs"
          variant="info"
          title="Extra Small"
          position="top-right"
          open={open.xs}
          onClose={() => setOpen({ ...open, xs: false })}
        >
          This is an extra small alert
        </Alert>
        <Alert
          size="sm"
          variant="info"
          title="Small"
          position="top-right"
          open={open.sm}
          onClose={() => setOpen({ ...open, sm: false })}
        >
          This is a small alert
        </Alert>
        <Alert
          size="md"
          variant="info"
          title="Medium"
          position="top-right"
          open={open.md}
          onClose={() => setOpen({ ...open, md: false })}
        >
          This is a medium alert (default)
        </Alert>
        <Alert
          size="lg"
          variant="info"
          title="Large"
          position="top-right"
          open={open.lg}
          onClose={() => setOpen({ ...open, lg: false })}
        >
          This is a large alert with more padding and larger text
        </Alert>
      </div>
    );
  },
};

// Positions
export const Positions: Story = {
  render: () => {
    const positions: AlertPosition[] = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ];

    const [openAlerts, setOpenAlerts] = useState<Record<string, boolean>>(
      positions.reduce((acc, pos) => ({ ...acc, [pos]: true }), {}),
    );

    return (
      <>
        {positions.map((position) => (
          <Alert
            key={position}
            variant="info"
            title={position.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            position={position}
            open={openAlerts[position]}
            onClose={() => setOpenAlerts({ ...openAlerts, [position]: false })}
          >
            Alert positioned at {position}
          </Alert>
        ))}
      </>
    );
  },
};

// Animations
export const Animations: Story = {
  render: () => {
    const animations: Array<'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down'> = [
      'fade',
      'slide',
      'scale',
      'slide-up',
      'slide-down',
    ];

    const [openAlerts, setOpenAlerts] = useState<Record<string, boolean>>(
      animations.reduce((acc, anim) => ({ ...acc, [anim]: true }), {}),
    );

    return (
      <>
        {animations.map((animation, index) => (
          <Alert
            key={animation}
            variant="success"
            title={`${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`}
            position={
              (['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-right'][index] ||
                'top-right') as AlertPosition
            }
            animation={animation}
            open={openAlerts[animation]}
            onClose={() => setOpenAlerts({ ...openAlerts, [animation]: false })}
          >
            This alert uses {animation} animation
          </Alert>
        ))}
      </>
    );
  },
};

// Auto-dismiss
export const AutoDismiss: Story = {
  render: () => {
    const [showAlert, setShowAlert] = useState(false);

    return (
      <div style={{ textAlign: 'center', paddingTop: '100px' }}>
        <Button onClick={() => setShowAlert(true)}>Show Auto-Dismiss Alert</Button>
        {showAlert && (
          <Alert
            variant="success"
            title="Auto-Dismiss"
            position="top-center"
            open={showAlert}
            autoDismiss
            dismissDuration={3000}
            onClose={() => setShowAlert(false)}
          >
            This alert will automatically dismiss in 3 seconds
          </Alert>
        )}
      </div>
    );
  },
};

// With action button
export const WithAction: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Alert
        variant="warning"
        title="Session Expiring"
        position="top-center"
        open={open}
        onClose={() => setOpen(false)}
        action="Extend Session"
        onActionClick={() => {
          alert('Session extended!');
          setOpen(false);
        }}
      >
        Your session will expire in 5 minutes. Click to extend.
      </Alert>
    );
  },
};

// Custom icons
export const CustomIcons: Story = {
  render: () => {
    const [open, setOpen] = useState(true);

    return (
      <Alert
        variant="info"
        title="Custom Icon"
        position="top-right"
        open={open}
        onClose={() => setOpen(false)}
        customIcon={
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        }
      >
        This alert uses a custom icon
      </Alert>
    );
  },
};

// Without icon
export const WithoutIcon: Story = {
  args: {
    variant: 'info',
    title: 'No Icon',
    children: 'This alert does not display an icon',
    position: 'top-right',
    open: true,
    showIcon: false,
    dismissible: true,
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [open5, setOpen5] = useState(true);
    const [open6, setOpen6] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Background Colors
          </h3>
          <Alert
            variant="primary"
            title="Purple Alert"
            position="top-right"
            open={open1}
            onClose={() => setOpen1(false)}
            color="#8b5cf6"
            textColor="#ffffff"
          >
            Alert with custom purple background color
          </Alert>
          <Alert
            variant="primary"
            title="Orange Alert"
            position="top-center"
            open={open2}
            onClose={() => setOpen2(false)}
            color="#f97316"
            textColor="#ffffff"
          >
            Alert with custom orange background color
          </Alert>
          <Alert
            variant="primary"
            title="Cyan Alert"
            position="top-left"
            open={open3}
            onClose={() => setOpen3(false)}
            color="#06b6d4"
            textColor="#ffffff"
          >
            Alert with custom cyan background color
          </Alert>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Text and Border Colors
          </h3>
          <Alert
            variant="primary"
            title="Custom Text Color"
            position="bottom-right"
            open={open4}
            onClose={() => setOpen4(false)}
            backgroundColor="#fff"
            textColor="#8b5cf6"
            borderColor="#8b5cf6"
          >
            Alert with custom purple text and border
          </Alert>
          <Alert
            variant="primary"
            title="Dark Background, Light Text"
            position="bottom-center"
            open={open5}
            onClose={() => setOpen5(false)}
            backgroundColor="#1f2937"
            textColor="#f3f4f6"
            borderColor="#374151"
          >
            Alert with dark theme colors
          </Alert>
          <Alert
            variant="primary"
            title="Custom Border Only"
            position="bottom-left"
            open={open6}
            onClose={() => setOpen6(false)}
            backgroundColor="#fff"
            textColor="#111827"
            borderColor="#f97316"
          >
            Alert with custom orange border
          </Alert>
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);
    const [open5, setOpen5] = useState(true);
    const [open6, setOpen6] = useState(true);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌈 Background Gradients
          </h3>
          <Alert
            variant="primary"
            title="Purple to Blue Gradient"
            position="top-right"
            open={open1}
            onClose={() => setOpen1(false)}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            textColor="#ffffff"
          >
            Alert with purple to blue gradient background
          </Alert>
          <Alert
            variant="primary"
            title="Pink to Orange Gradient"
            position="top-center"
            open={open2}
            onClose={() => setOpen2(false)}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            textColor="#ffffff"
          >
            Alert with pink to orange gradient background
          </Alert>
          <Alert
            variant="primary"
            title="Blue to Cyan Gradient"
            position="top-left"
            open={open3}
            onClose={() => setOpen3(false)}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            textColor="#ffffff"
          >
            Alert with blue to cyan gradient background
          </Alert>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            ✨ Text Gradient
          </h3>
          <Alert
            variant="primary"
            title="Gradient Text"
            position="bottom-right"
            open={open4}
            onClose={() => setOpen4(false)}
            textColor="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            backgroundColor="#ffffff"
            borderColor="#e5e7eb"
          >
            Alert with gradient text color
          </Alert>
        </div>

        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Gradient Variations
          </h3>
          <Alert
            variant="primary"
            title="Radial Gradient"
            position="bottom-center"
            open={open5}
            onClose={() => setOpen5(false)}
            gradient="radial-gradient(circle at 30% 20%, #ff6b6b, #4ecdc4)"
            textColor="#ffffff"
          >
            Alert with radial gradient background
          </Alert>
          <Alert
            variant="primary"
            title="Multi-Color Gradient"
            position="bottom-left"
            open={open6}
            onClose={() => setOpen6(false)}
            gradient="linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4)"
            textColor="#ffffff"
          >
            Alert with multi-color gradient background
          </Alert>
        </div>
      </div>
    );
  },
};

// Glassmorphism
export const Glassmorphism: Story = {
  render: () => {
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);

    return (
      <>
        <Alert
          variant="info"
          title="White Glassmorphism"
          position="top-right"
          open={open1}
          onClose={() => setOpen1(false)}
          glassmorphism={true}
          backgroundColor="rgba(255, 255, 255, 0.95)"
          textColor="#111827"
          borderColor="rgba(255, 255, 255, 0.2)"
        >
          White glassmorphism effect with backdrop blur
        </Alert>
        <Alert
          variant="info"
          title="Colored Glassmorphism"
          position="top-center"
          open={open2}
          onClose={() => setOpen2(false)}
          glassmorphism={true}
          backgroundColor="rgba(59, 130, 246, 0.95)"
          textColor="#ffffff"
          borderColor="rgba(59, 130, 246, 0.3)"
        >
          Colored glassmorphism with blue tint
        </Alert>
        <Alert
          variant="success"
          title="Success Glassmorphism"
          position="bottom-right"
          open={open3}
          onClose={() => setOpen3(false)}
          glassmorphism={true}
          backgroundColor="rgba(16, 185, 129, 0.95)"
          textColor="#ffffff"
        >
          Success variant with glassmorphism
        </Alert>
        <Alert
          variant="warning"
          title="Warning Glassmorphism"
          position="bottom-left"
          open={open4}
          onClose={() => setOpen4(false)}
          glassmorphism={true}
          backgroundColor="rgba(245, 158, 11, 0.95)"
          textColor="#ffffff"
        >
          Warning variant with glassmorphism
        </Alert>
      </>
    );
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    variant: 'warning',
    title: 'Full Width Alert',
    children: 'This alert spans the full width of the container',
    position: 'top-center',
    open: true,
    fullWidth: true,
    dismissible: true,
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [alerts, setAlerts] = useState<
      Array<{
        id: number;
        variant: 'success' | 'warning' | 'error' | 'info';
        title: string;
        message: string;
        position: AlertPosition;
      }>
    >([]);

    const addAlert = (
      variant: 'success' | 'warning' | 'error' | 'info',
      title: string,
      message: string,
      position: AlertPosition,
    ) => {
      const id = Date.now();
      setAlerts([
        ...alerts,
        {
          id,
          variant,
          title,
          message,
          position,
        },
      ]);

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
      }, 5000);
    };

    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="success"
            onClick={() =>
              addAlert('success', 'Success!', 'Operation completed successfully', 'top-right')
            }
          >
            Success
          </Button>
          <Button
            variant="warning"
            onClick={() => addAlert('warning', 'Warning', 'Please review your input', 'top-center')}
          >
            Warning
          </Button>
          <Button
            variant="danger"
            onClick={() => addAlert('error', 'Error', 'Something went wrong', 'top-left')}
          >
            Error
          </Button>
          <Button
            variant="info"
            onClick={() => addAlert('info', 'Info', 'New features available', 'bottom-right')}
          >
            Info
          </Button>
        </div>

        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            variant={alert.variant}
            title={alert.title}
            position={alert.position}
            open={true}
            animation="slide"
            onClose={() => {
              setAlerts((prev) => prev.filter((a) => a.id !== alert.id));
            }}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const [open1, setOpen1] = useState(true);
    const [open2, setOpen2] = useState(true);
    const [open3, setOpen3] = useState(true);
    const [open4, setOpen4] = useState(true);

    return (
      <ThemeProvider theme={themes[theme]}>
        <div style={{ padding: '20px', textAlign: 'center', minHeight: '100vh' }}>
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

          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '20px',
            }}
          >
            <Button onClick={() => setOpen1(!open1)} size="sm">
              {open1 ? 'Hide' : 'Show'} Success
            </Button>
            <Button onClick={() => setOpen2(!open2)} size="sm">
              {open2 ? 'Hide' : 'Show'} Warning
            </Button>
            <Button onClick={() => setOpen3(!open3)} size="sm">
              {open3 ? 'Hide' : 'Show'} Error
            </Button>
            <Button onClick={() => setOpen4(!open4)} size="sm">
              {open4 ? 'Hide' : 'Show'} Info
            </Button>
          </div>

          <Alert
            variant="success"
            title="Success Alert"
            position="top-right"
            open={open1}
            onClose={() => setOpen1(false)}
          >
            This success alert adapts to the {theme} theme
          </Alert>

          <Alert
            variant="warning"
            title="Warning Alert"
            position="top-center"
            open={open2}
            onClose={() => setOpen2(false)}
          >
            This warning alert adapts to the {theme} theme
          </Alert>

          <Alert
            variant="error"
            title="Error Alert"
            position="top-left"
            open={open3}
            onClose={() => setOpen3(false)}
          >
            This error alert adapts to the {theme} theme
          </Alert>

          <Alert
            variant="info"
            title="Info Alert"
            position="bottom-right"
            open={open4}
            onClose={() => setOpen4(false)}
          >
            This info alert adapts to the {theme} theme
          </Alert>
        </div>
      </ThemeProvider>
    );
  },
};

// Long content
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    children:
      'This is a longer alert message that contains more detailed information. It demonstrates how the alert component handles multi-line content and ensures that the text is properly wrapped and readable. The alert maintains its structure and styling even with extended content.',
    position: 'top-right',
    open: true,
    dismissible: true,
  },
};

// No dismiss button
export const NonDismissible: Story = {
  args: {
    variant: 'info',
    title: 'Persistent Alert',
    children: 'This alert cannot be dismissed manually',
    position: 'top-right',
    open: true,
    dismissible: false,
    autoDismiss: false,
  },
};
