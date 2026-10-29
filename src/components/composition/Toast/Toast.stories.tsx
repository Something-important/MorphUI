// Toast.stories.tsx
import React, { useCallback } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast, type ToastOptions, type ToastPosition } from './Toast';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../../basic/Button';

/** Helper that fires toasts via the imperative API. */
const ToastLauncher: React.FC = () => {
  const { toast } = useToast();

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button size="sm" onClick={() => toast.success('Saved', 'Your changes were saved.')}>
        Success
      </Button>
      <Button size="sm" onClick={() => toast.error('Upload failed', 'Please try again.')}>
        Error
      </Button>
      <Button size="sm" onClick={() => toast.warning('Storage almost full', '83% used.')}>
        Warning
      </Button>
      <Button size="sm" onClick={() => toast.info('New version available')}>
        Info
      </Button>
      <Button
        size="sm"
        onClick={() =>
          toast({
            title: 'File deleted',
            description: 'Recover it from the trash within 30 days.',
            variant: 'warning',
            action: 'Undo',
            onActionClick: () => toast.success('File restored'),
          })
        }
      >
        With action
      </Button>
      <Button size="sm" onClick={() => toast({ title: 'Sticky toast', duration: 0 })}>
        Sticky
      </Button>
    </div>
  );
};

/** Theme wrapper for stories. */
const ThemedToastStory: React.FC<{
  themeName: ThemeName;
  position: ToastPosition;
  duration?: number;
  maxToasts?: number;
  autoDismiss?: boolean;
  pauseOnHover?: boolean;
}> = ({
  themeName,
  position,
  duration = 4000,
  maxToasts = 3,
  autoDismiss = true,
  pauseOnHover = true,
}) => (
  <ThemeProvider theme={themes[themeName]}>
    <ToastProvider
      position={position}
      duration={duration}
      maxToasts={maxToasts}
      autoDismiss={autoDismiss}
      pauseOnHover={pauseOnHover}
    >
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          background: 'var(--color-background-secondary)',
          flexWrap: 'wrap',
          padding: '24px',
        }}
      >
        <ToastLauncher />
      </div>
    </ToastProvider>
  </ThemeProvider>
);

export default {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A toast notification system with an imperative API. Wrap your app in `<ToastProvider>` and fire notifications with `useToast()`. Supports variants, six screen positions, auto-dismiss with pause-on-hover, stacked viewports, actions, and full theming.',
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
    animation: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'slide-up', 'slide-down'],
    },
    dismissible: { control: { type: 'boolean' } },
    autoDismiss: { control: { type: 'boolean' } },
    duration: { control: { type: 'number' } },
    pauseOnHover: { control: { type: 'boolean' } },
    glassmorphism: { control: { type: 'boolean' } },
  },
} satisfies Meta<typeof Toast>;

type Story = StoryObj<typeof Toast>;

// Playground: all variants via the imperative API (dark theme, default position)
export const Playground: Story = {
  render: () => <ThemedToastStory themeName="dark" position="bottom-right" />,
};

// Light theme
export const LightTheme: Story = {
  render: () => <ThemedToastStory themeName="light" position="bottom-right" />,
};

// Dark theme
export const DarkTheme: Story = {
  render: () => <ThemedToastStory themeName="dark" position="bottom-right" />,
};

// Positions
export const TopRight: Story = {
  render: () => <ThemedToastStory themeName="dark" position="top-right" />,
};

export const TopCenter: Story = {
  render: () => <ThemedToastStory themeName="dark" position="top-center" />,
};

export const BottomCenter: Story = {
  render: () => <ThemedToastStory themeName="dark" position="bottom-center" />,
};

export const BottomLeft: Story = {
  render: () => <ThemedToastStory themeName="dark" position="bottom-left" />,
};

// Long duration to demo pause-on-hover
export const PauseOnHover: Story = {
  render: () => <ThemedToastStory themeName="dark" position="bottom-right" duration={6000} />,
  parameters: {
    docs: {
      description: {
        story: 'Hover a toast to pause its auto-dismiss countdown; move away to resume.',
      },
    },
  },
};

// Unlimited simultaneous toasts
export const UnlimitedStack: Story = {
  render: () => (
    <ThemedToastStory themeName="dark" position="bottom-right" maxToasts={0} duration={0} />
  ),
  parameters: {
    docs: {
      description: {
        story: 'maxToasts=0 disables the stack limit and duration=0 keeps toasts until dismissed.',
      },
    },
  },
};

// Dismissible-only (no auto dismiss)
export const ManualDismissOnly: Story = {
  render: () => <ThemedToastStory themeName="dark" position="bottom-right" autoDismiss={false} />,
};

// Standalone presentational usage (no provider)
export const Standalone: Story = {
  render: () => (
    <ThemeProvider theme={themes.light}>
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          background: 'var(--color-background-secondary)',
          padding: '24px',
        }}
      >
        {(['success', 'error', 'warning', 'info'] as const).map((variant) => (
          <Toast
            key={variant}
            open
            variant={variant}
            animation="slide-up"
            title={`${variant[0].toUpperCase()}${variant.slice(1)}`}
            description="A standalone toast placed inline in the layout."
            style={{ position: 'static', pointerEvents: 'auto' }}
          />
        ))}
      </div>
    </ThemeProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'The presentational `Toast` can also be used directly without a provider — position it yourself in the layout.',
      },
    },
  },
};

// Custom icons and styling
export const CustomStyling: Story = {
  render: () => (
    <ThemeProvider theme={themes.dark}>
      <ToastProvider position="bottom-right" duration={0}>
        <CustomStylingLauncher />
      </ToastProvider>
    </ThemeProvider>
  ),
};

const CustomStylingLauncher: React.FC = () => {
  const { toast } = useToast();

  const fire = useCallback((options: ToastOptions) => toast(options), [toast]);

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: 'var(--color-background-secondary)',
        flexWrap: 'wrap',
        padding: '24px',
      }}
    >
      <Button
        size="sm"
        onClick={() =>
          fire({
            title: 'Accent override',
            description: 'Custom accent color and radius.',
            color: '#a855f7',
            borderRadius: 16,
          })
        }
      >
        Purple accent
      </Button>
      <Button
        size="sm"
        onClick={() =>
          fire({
            title: 'No icon',
            description: 'Icon hidden via showIcon={false}.',
            showIcon: false,
            variant: 'secondary',
          })
        }
      >
        No icon
      </Button>
      <Button
        size="sm"
        onClick={() =>
          fire({
            title: 'Custom icon',
            description: 'Emoji icon passed inline.',
            customIcon: '🚀',
            variant: 'primary',
          })
        }
      >
        Rocket icon
      </Button>
      <Button
        size="sm"
        onClick={() =>
          fire({
            title: 'Glass toast',
            description: 'Glassmorphism styling.',
            glassmorphism: true,
            variant: 'info',
          })
        }
      >
        Glassmorphism
      </Button>
      <Button
        size="sm"
        onClick={() =>
          fire({
            title: 'Large toast',
            description: 'size="lg" with a longer message body.',
            variant: 'success',
            size: 'lg',
          })
        }
      >
        Large
      </Button>
    </div>
  );
};
