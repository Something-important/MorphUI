import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProvider, useToast } from './Toast';
import { Button } from '../../basic/Button';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Toast> = {
  title: 'Composition/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toast renders a transient notification. Use ToastProvider + useToast hook for managed queuing, or render Toast standalone with open/onClose. 4 variants, 4 sizes, 6 positions, 5 animations.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// Standalone (presentational) toast — no provider needed
export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Toast
        open
        variant="info"
        title="Default toast"
        description="This is a standalone toast rendered with open=true."
      />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (standalone)">
      <Stack gap={8}>
        <Toast open variant="info" title="Info" description="Informational message" />
        <Toast open variant="success" title="Success" description="Operation completed" />
        <Toast open variant="warning" title="Warning" description="Please review" />
        <Toast open variant="danger" title="Error" description="Something went wrong" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8}>
        <Toast open size="xs" variant="info" description="Extra small" />
        <Toast open size="sm" variant="info" description="Small" />
        <Toast open size="md" variant="info" description="Medium" />
        <Toast open size="lg" variant="info" description="Large" />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Dismissible & auto-dismiss">
      <Stack gap={8}>
        <Toast
          open
          variant="info"
          title="Dismissible"
          description="Click X to dismiss"
          dismissible
        />
        <Toast
          open
          variant="success"
          title="Auto-dismiss"
          description="Dismisses after 4s"
          autoDismiss
          duration={4000}
        />
      </Stack>
    </Demo>
  ),
};

// Managed toasts via ToastProvider + useToast
const ToastLauncher = () => {
  const { toast } = useToast();
  return (
    <Demo title="Managed toasts (ToastProvider + useToast)">
      <Stack gap={8}>
        <Button
          variant="primary"
          onClick={() => toast.success('Saved', 'Changes saved successfully')}
        >
          Show success toast
        </Button>
        <Button
          variant="danger"
          onClick={() =>
            toast({ variant: 'danger', title: 'Failed', description: 'Could not save changes' })
          }
        >
          Show error toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({ variant: 'info', title: 'Info', description: 'Here is some info' })
          }
        >
          Show info toast
        </Button>
      </Stack>
    </Demo>
  );
};

export const Controlled: Story = {
  render: () => (
    <ToastProvider position="top-right">
      <ToastLauncher />
    </ToastProvider>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Positions & animations (standalone)">
      <Stack gap={8}>
        <Toast
          open
          variant="info"
          title="Slide-up"
          description="slide-up animation"
          animation="slide-up"
        />
        <Toast open variant="info" title="Scale" description="scale animation" animation="scale" />
        <Toast open variant="info" title="Fade" description="fade animation" animation="fade" />
        <Toast
          open
          variant="info"
          title="Custom color"
          description="custom background"
          color="#ff0055"
          textColor="#fff"
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Toast across all 5 preset themes">
      <ThemeGrid>
        <Toast open variant="info" title="Theme" description="Themed toast" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long text, body-only, no title">
      <Stack gap={8}>
        <Toast
          open
          variant="info"
          title="Long title that might wrap or truncate"
          description="This toast contains a very long body message that should wrap gracefully across multiple lines without breaking the toast layout."
        />
        <Toast open variant="info" description="Body only, no title" />
      </Stack>
    </Demo>
  ),
};
