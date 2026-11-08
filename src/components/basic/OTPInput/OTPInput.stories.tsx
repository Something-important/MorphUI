import type { Meta, StoryObj } from '@storybook/react';
import { OTPInput } from './OTPInput';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof OTPInput> = {
  title: 'Primitives/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'OTPInput renders a multi-cell one-time password / verification code input. Supports numeric and alphanumeric modes, paste-handling, keyboard arrow navigation, mask mode, and autoComplete for browser autofill. 8 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    length: 6,
    type: 'numeric',
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'danger',
            'info',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <OTPInput key={v} variant={v} length={6} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={16}>
        <OTPInput size="sm" length={6} />
        <OTPInput size="md" length={6} />
        <OTPInput size="lg" length={6} />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled & error states">
      <Stack gap={16}>
        <OTPInput disabled length={6} defaultValue="123" />
        <OTPInput error length={6} defaultValue="abc" />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Length, type, mask, custom colors">
      <Stack gap={16}>
        <OTPInput length={4} />
        <OTPInput length={8} />
        <OTPInput type="alphanumeric" length={6} />
        <OTPInput mask length={6} />
        <OTPInput color="#ff0055" length={6} />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={16}>
        <OTPInput defaultValue="123456" length={6} />
        <OTPInput value="654321" onChange={() => {}} length={6} />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="OTPInput across all 5 preset themes">
      <ThemeGrid>
        <OTPInput length={4} size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — length 1, length 10, masked alphanumeric">
      <Stack gap={16}>
        <OTPInput length={1} />
        <OTPInput length={10} size="sm" />
        <OTPInput type="alphanumeric" mask length={6} />
      </Stack>
    </Demo>
  ),
};
