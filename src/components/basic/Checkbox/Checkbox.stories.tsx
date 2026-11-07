import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Checkbox is a binary toggle with label, description, and 8 variants. Supports controlled and uncontrolled usage.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms',
    defaultChecked: true,
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8}>
        <Checkbox variant="primary" label="Primary" defaultChecked />
        <Checkbox variant="secondary" label="Secondary" defaultChecked />
        <Checkbox variant="success" label="Success" defaultChecked />
        <Checkbox variant="warning" label="Warning" defaultChecked />
        <Checkbox variant="danger" label="Danger" defaultChecked />
        <Checkbox variant="info" label="Info" defaultChecked />
        <Checkbox variant="ghost" label="Ghost" defaultChecked />
        <Checkbox variant="outline" label="Outline" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8}>
        <Checkbox size="sm" label="Small" defaultChecked />
        <Checkbox size="md" label="Medium" defaultChecked />
        <Checkbox size="lg" label="Large" defaultChecked />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, with description">
      <Stack gap={8}>
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" defaultChecked disabled />
        <Checkbox
          label="Subscribe to newsletter"
          description="Get notified about product updates and releases"
          defaultChecked
        />
        <Checkbox
          label="Disabled with description"
          description="This option is unavailable"
          defaultChecked
          disabled
        />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => {
    return (
      <Demo title="Controlled vs uncontrolled">
        <Stack gap={8}>
          <Checkbox label="Uncontrolled (defaultChecked)" defaultChecked />
          <Checkbox label="Controlled (checked=true)" checked onChange={() => {}} />
        </Stack>
      </Demo>
    );
  },
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Checkbox across all 5 preset themes">
      <ThemeGrid>
        <Checkbox label="Theme" defaultChecked />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long label, no label, multiline description">
      <Stack gap={8}>
        <Checkbox
          label="This is a very long checkbox label that might wrap or truncate depending on the container width and layout"
          defaultChecked
        />
        <Checkbox defaultChecked />
        <Checkbox
          label="Multiline"
          description="This description spans multiple lines and should wrap gracefully without breaking the layout or alignment of the checkbox itself"
          defaultChecked
        />
      </Stack>
    </Demo>
  ),
};
