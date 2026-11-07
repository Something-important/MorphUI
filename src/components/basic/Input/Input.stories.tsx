import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Input is a text field with 8 variants, 5 sizes, error states, and full type support (text, password, email, number, search, tel, url, date, time, datetime-local).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    size: 'md',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={8} style={{ width: '320px' }}>
        <Input variant="primary" placeholder="Primary" />
        <Input variant="secondary" placeholder="Secondary" />
        <Input variant="outline" placeholder="Outline" />
        <Input variant="ghost" placeholder="Ghost" />
        <Input variant="success" placeholder="Success" />
        <Input variant="warning" placeholder="Warning" />
        <Input variant="danger" placeholder="Danger" />
        <Input variant="info" placeholder="Info" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={8} style={{ width: '320px' }}>
        <Input size="xs" placeholder="Extra small" />
        <Input size="sm" placeholder="Small" />
        <Input size="md" placeholder="Medium" />
        <Input size="lg" placeholder="Large" />
        <Input size="xl" placeholder="Extra large" />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled, error, required">
      <Stack gap={8} style={{ width: '320px' }}>
        <Input placeholder="Disabled" disabled />
        <Input placeholder="Error state" error errorMessage="This field is required" />
        <Input placeholder="Required" required />
        <Input defaultValue="Read-only value" readOnly />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={8} style={{ width: '320px' }}>
        <Input placeholder="Uncontrolled (defaultValue)" defaultValue="hello" />
        <Input placeholder="Controlled (value)" value="controlled" onChange={() => {}} />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Input types">
      <Stack gap={8} style={{ width: '320px' }}>
        <Input type="text" placeholder="Text" />
        <Input type="password" placeholder="Password" />
        <Input type="email" placeholder="Email" />
        <Input type="number" placeholder="Number" />
        <Input type="search" placeholder="Search" />
        <Input type="tel" placeholder="Telephone" />
        <Input type="url" placeholder="URL" />
        <Input type="date" />
        <Input type="time" />
        <Input type="datetime-local" />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Input across all 5 preset themes">
      <ThemeGrid>
        <Input placeholder="Type here..." style={{ width: '100%' }} />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long placeholder, empty, full width">
      <Stack gap={8} style={{ width: '320px' }}>
        <Input placeholder="This is a very long placeholder that might truncate or overflow depending on the input width" />
        <Input placeholder="" />
        <Input placeholder="Full width" fullWidth />
      </Stack>
    </Demo>
  ),
};
