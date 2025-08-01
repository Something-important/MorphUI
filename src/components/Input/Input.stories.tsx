// Input.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'text' },
    placeholder: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number', 'search', 'tel', 'url', 'date', 'time', 'datetime-local'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    loading: { control: 'boolean' },
    required: { control: 'boolean' },
    errorMessage: { control: 'text' },
    id: { control: 'text' },
    name: { control: 'text' },
    autoComplete: { control: 'text' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'changed' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

const ControlledInput = (args: InputProps) => {
  const [value, setValue] = useState(args.value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (args.onChange) args.onChange(e);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    value: '',
    placeholder: 'Enter your text here...',
    type: 'text',
    size: 'md',
    disabled: false,
    error: false,
    loading: false,
    required: false,
    id: 'input-default',
    name: 'inputDefault',
    ariaLabel: 'Default text input',
  },
};

export const PasswordInput: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    value: '',
    placeholder: 'Enter your password',
    type: 'password',
    size: 'md',
    autoComplete: 'current-password',
    ariaLabel: 'Password input field',
    required: true,
    id: 'password-input',
    name: 'password',
  },
};

export const ErrorState: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    value: 'invalid@email',
    placeholder: 'Enter valid email',
    type: 'email',
    size: 'md',
    error: true,
    errorMessage: 'Please enter a valid email address',
    ariaLabel: 'Email input with error',
    id: 'email-error',
    name: 'emailError',
  },
};

export const LoadingState: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    value: 'Validating...',
    placeholder: 'Enter username',
    type: 'text',
    size: 'md',
    loading: true,
    ariaLabel: 'Username input loading',
    id: 'username-loading',
    name: 'usernameLoading',
  },
};

export const SizeVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ControlledInput
        value=""
        placeholder="Small input"
        size="sm"
        ariaLabel="Small input"
        onChange={() => {}}
      />
      <ControlledInput
        value=""
        placeholder="Medium input (default)"
        size="md"
        ariaLabel="Medium input"
        onChange={() => {}}
      />
      <ControlledInput
        value=""
        placeholder="Large input"
        size="lg"
        ariaLabel="Large input"
        onChange={() => {}}
      />
    </div>
  ),
};

export const DisabledInput: Story = {
  render: (args) => <ControlledInput {...args} />,
  args: {
    value: 'Cannot edit this field',
    disabled: true,
    placeholder: 'This field is disabled',
    ariaLabel: 'Disabled input field',
    id: 'disabled-input',
    name: 'disabledInput',
  },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
          Normal State
        </label>
        <ControlledInput
          value=""
          placeholder="Normal input"
          ariaLabel="Normal input"
          onChange={() => {}}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
          Error State
        </label>
        <ControlledInput
          value="invalid input"
          placeholder="Error input"
          error={true}
          errorMessage="This field has an error"
          ariaLabel="Error input"
          onChange={() => {}}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
          Loading State
        </label>
        <ControlledInput
          value="Processing..."
          placeholder="Loading input"
          loading={true}
          ariaLabel="Loading input"
          onChange={() => {}}
        />
      </div>
      
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
          Disabled State
        </label>
        <ControlledInput
          value="Disabled field"
          placeholder="Disabled input"
          disabled={true}
          ariaLabel="Disabled input"
          onChange={() => {}}
        />
      </div>
    </div>
  ),
};
