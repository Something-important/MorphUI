import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { FormField } from './FormField';
import { Input } from '../../basic/Input';
import { Button } from '../../basic/Button';
import { Checkbox } from '../../basic/Checkbox';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Form> = {
  title: 'Composition/Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Form wraps form fields with consistent styling, validation display, and theming. FormField pairs a Label + control + error/helper text. 3 variants, 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Form style={{ width: '360px', padding: '16px' }}>
      <Stack gap={12}>
        <FormField label="Email" required>
          <Input type="email" placeholder="you@example.com" />
        </FormField>
        <FormField label="Password" required helperText="At least 8 characters">
          <Input type="password" placeholder="••••••••" />
        </FormField>
        <Button variant="primary">Sign in</Button>
      </Stack>
    </Form>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        {(['primary', 'secondary', 'default'] as const).map((v) => (
          <Form key={v} variant={v} style={{ width: '360px', padding: '16px' }}>
            <Stack gap={8}>
              <FormField label={`${v} form`}>
                <Input placeholder="Input field" />
              </FormField>
            </Stack>
          </Form>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={16}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <Form key={s} size={s} style={{ width: '360px', padding: '16px' }}>
            <Stack gap={8}>
              <FormField label={`${s} size`}>
                <Input placeholder="Input field" />
              </FormField>
            </Stack>
          </Form>
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Error & helper text states">
      <Form style={{ width: '360px', padding: '16px' }}>
        <Stack gap={12}>
          <FormField label="Username" error="This username is taken">
            <Input defaultValue="taken" error />
          </FormField>
          <FormField label="Email" error="Invalid email format">
            <Input defaultValue="not-an-email" error />
          </FormField>
          <FormField label="Bio" helperText="Tell us about yourself (optional)">
            <Input placeholder="I'm a..." />
          </FormField>
          <FormField label="Required field" required error="This field is required">
            <Input placeholder="Cannot be empty" error />
          </FormField>
        </Stack>
      </Form>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors & gradients">
      <Stack gap={16}>
        <Form style={{ width: '360px', padding: '16px' }} color="#ff0055">
          <FormField label="Custom accent">
            <Input placeholder="Pink accent" />
          </FormField>
        </Form>
        <Form
          style={{ width: '360px', padding: '16px' }}
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          textColor="#fff"
        >
          <FormField label="Gradient form" textColor="#fff">
            <Input placeholder="Gradient bg" />
          </FormField>
        </Form>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Form across all 5 preset themes">
      <ThemeGrid>
        <Form style={{ padding: '12px' }}>
          <Stack gap={8}>
            <FormField label="Field">
              <Input placeholder="Input" />
            </FormField>
          </Stack>
        </Form>
      </ThemeGrid>
    </Demo>
  ),
};

export const Integration: Story = {
  render: () => (
    <Demo title="Complete sign-up form composition">
      <Form
        variant="primary"
        size="md"
        style={{ width: '400px', padding: '24px' }}
        onSubmit={(e) => {
          e.preventDefault();
          alert('Form submitted (demo)');
        }}
      >
        <Stack gap={16}>
          <h3 style={{ margin: 0 }}>Create account</h3>
          <FormField label="Full name" required>
            <Input placeholder="Jane Doe" />
          </FormField>
          <FormField label="Email" required error="">
            <Input type="email" placeholder="you@example.com" />
          </FormField>
          <FormField label="Password" required helperText="At least 8 characters">
            <Input type="password" placeholder="••••••••" />
          </FormField>
          <FormField>
            <Checkbox label="I agree to the Terms of Service" required />
          </FormField>
          <Button variant="primary" fullWidth>
            Sign up
          </Button>
        </Stack>
      </Form>
    </Demo>
  ),
};
