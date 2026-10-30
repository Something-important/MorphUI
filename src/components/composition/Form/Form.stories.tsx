import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Form } from './Form';
import { FormField } from './FormField';
import { Input } from '../../basic/Input/Input';
import { Checkbox } from '../../basic/Checkbox/Checkbox';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof Form> = {
  title: 'Components/Form',
  component: Form,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Form>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <Form style={{ maxWidth: 400 }} onSubmit={(e) => e.preventDefault()}>
        <FormField label="Name" helperText="Your full name" required>
          <Input value="" onChange={() => {}} placeholder="Jane Doe" />
        </FormField>
        <FormField label="Email" error="Please enter a valid email">
          <Input value="" onChange={() => {}} placeholder="jane@example.com" />
        </FormField>
        <FormField label="Accept terms" helperText="You agree to the terms">
          <Checkbox checked={false} onChange={() => {}} />
        </FormField>
        <button type="submit" className="storybook-submit">
          Submit
        </button>
      </Form>
    </ThemeProvider>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const error = email && !email.includes('@') ? 'Please enter a valid email' : undefined;
    return (
      <ThemeProvider>
        <Form style={{ maxWidth: 400 }} onSubmit={(e) => e.preventDefault()}>
          <FormField label="Email" error={error} helperText="We never share your email">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </FormField>
        </Form>
      </ThemeProvider>
    );
  },
};
