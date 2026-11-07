import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Alert> = {
  title: 'Composition/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Alert renders a prominent message with optional title, dismiss button, and auto-dismiss. 8 variants, 4 sizes, 12 positions.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert.',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Alert variant="primary" title="Primary">
          Primary alert message
        </Alert>
        <Alert variant="secondary" title="Secondary">
          Secondary alert message
        </Alert>
        <Alert variant="success" title="Success">
          Operation completed successfully
        </Alert>
        <Alert variant="warning" title="Warning">
          Please review before continuing
        </Alert>
        <Alert variant="info" title="Information">
          Here is some helpful context
        </Alert>
        <Alert variant="danger" title="Error">
          Something went wrong
        </Alert>
        <Alert variant="ghost" title="Ghost">
          Subtle ghost alert
        </Alert>
        <Alert variant="outline" title="Outline">
          Outlined alert
        </Alert>
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Alert variant="info" size="xs">
          Extra small alert
        </Alert>
        <Alert variant="info" size="sm">
          Small alert
        </Alert>
        <Alert variant="info" size="md">
          Medium alert (default)
        </Alert>
        <Alert variant="info" size="lg">
          Large alert
        </Alert>
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Dismissible & auto-dismiss">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Alert variant="info" title="Dismissible" dismissible>
          This alert can be dismissed
        </Alert>
        <Alert variant="success" title="Auto-dismiss" autoDismiss dismissDuration={5000}>
          This alert auto-dismisses after 5 seconds
        </Alert>
        <Alert variant="warning" title="No title">
          Alerts can have body text only
        </Alert>
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Alert variant="primary" title="Custom" color="#ff0055">
          Custom background color
        </Alert>
        <Alert
          variant="primary"
          title="Gradient"
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
        >
          Gradient background
        </Alert>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Alert across all 5 preset themes">
      <ThemeGrid>
        <Alert variant="info" title="Info">
          Themed alert
        </Alert>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long text, body-only, no children">
      <Stack gap={8} style={{ maxWidth: '500px' }}>
        <Alert variant="info" title="Long content">
          This alert contains a very long body message that should wrap gracefully across multiple
          lines without breaking the alert's layout or alignment.
        </Alert>
        <Alert variant="success" title="Title only">
          &nbsp;
        </Alert>
        <Alert variant="warning">Body only, no title — just the message text</Alert>
      </Stack>
    </Demo>
  ),
};
