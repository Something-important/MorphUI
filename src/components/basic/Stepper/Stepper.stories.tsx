import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Stepper> = {
  title: 'Primitives/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Stepper renders a multi-step progress indicator. Supports horizontal/vertical orientation, 4 variants, 4 sizes, descriptions, icons, clickable steps, and error states.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const basicSteps = [
  { id: '1', label: 'Account' },
  { id: '2', label: 'Profile' },
  { id: '3', label: 'Confirm' },
  { id: '4', label: 'Done' },
];

export const Default: Story = {
  args: {
    steps: basicSteps,
    activeStep: 1,
  },
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={24}>
        <Stepper steps={basicSteps} activeStep={1} variant="primary" />
        <Stepper steps={basicSteps} activeStep={1} variant="secondary" />
        <Stepper steps={basicSteps} activeStep={1} variant="ghost" />
        <Stepper steps={basicSteps} activeStep={1} variant="outline" />
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={24}>
        <Stepper steps={basicSteps} activeStep={1} size="xs" />
        <Stepper steps={basicSteps} activeStep={1} size="sm" />
        <Stepper steps={basicSteps} activeStep={1} size="md" />
        <Stepper steps={basicSteps} activeStep={1} size="lg" />
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Completed steps & error state">
      <Stack gap={24}>
        <Stepper
          steps={[
            { id: '1', label: 'Account', completed: true },
            { id: '2', label: 'Profile', completed: true },
            { id: '3', label: 'Confirm' },
            { id: '4', label: 'Done' },
          ]}
          activeStep={2}
        />
        <Stepper
          steps={[
            { id: '1', label: 'Account', completed: true },
            { id: '2', label: 'Profile', error: true },
            { id: '3', label: 'Confirm' },
          ]}
          activeStep={1}
        />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Vertical orientation, descriptions, icons, custom colors">
      <Stack gap={32}>
        <Stepper steps={basicSteps} activeStep={1} orientation="vertical" />
        <Stepper
          steps={[
            {
              id: '1',
              label: 'Account',
              description: 'Create your account credentials',
              completed: true,
            },
            { id: '2', label: 'Profile', description: 'Tell us about yourself' },
            { id: '3', label: 'Confirm', description: 'Review and submit' },
          ]}
          activeStep={1}
          showDescriptions
        />
        <Stepper
          steps={[
            { id: '1', label: 'Cart', icon: <span>🛒</span>, completed: true },
            { id: '2', label: 'Shipping', icon: <span>📦</span> },
            { id: '3', label: 'Payment', icon: <span>💳</span> },
          ]}
          activeStep={1}
          color="#ff0055"
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Stepper across all 5 preset themes">
      <ThemeGrid>
        <Stepper steps={basicSteps} activeStep={1} />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single step, many steps, clickable">
      <Stack gap={24}>
        <Stepper steps={[{ id: '1', label: 'Only step' }]} activeStep={0} />
        <Stepper
          steps={['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l, i) => ({ id: String(i), label: l }))}
          activeStep={3}
          size="sm"
        />
        <Stepper steps={basicSteps} activeStep={1} clickable onStepClick={(_id, _index) => {}} />
      </Stack>
    </Demo>
  ),
};
