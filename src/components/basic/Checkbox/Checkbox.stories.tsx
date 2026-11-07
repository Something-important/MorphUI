import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox, Button } from '../../index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A customizable checkbox component with advanced theming, multiple variants, and comprehensive accessibility features.',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state for uncontrolled usage',
    },
    onChange: {
      action: 'changed',
      description: 'Callback when checkbox state changes',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant of the checkbox',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the checkbox',
    },
    color: {
      control: 'color',
      description: 'Custom color for the checkbox',
    },
    gradient: {
      control: 'text',
      description: 'Custom gradient for the checkbox',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    backgroundColor: {
      control: 'color',
      description: 'Custom background color',
    },
    labelColor: {
      control: 'color',
      description: 'Custom label color',
    },
    descriptionColor: {
      control: 'color',
      description: 'Custom description color',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    hoverEffect: {
      control: 'select',
      options: ['none', 'lift', 'glow', 'scale', 'slide'],
      description: 'Hover animation effect',
    },
    rounded: {
      control: 'boolean',
      description: 'Apply rounded corners',
    },
    bordered: {
      control: 'boolean',
      description: 'Show border',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the checkbox',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark as invalid',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the checkbox read-only',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Show indeterminate state',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    style: {
      control: 'object',
      description: 'Inline styles',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// Basic Checkbox
export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
    description: 'Please read and accept our terms of service',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox variant="primary" label="Primary Checkbox" />
      <Checkbox variant="secondary" label="Secondary Checkbox" />
      <Checkbox variant="success" label="Success Checkbox" />
      <Checkbox variant="warning" label="Warning Checkbox" />
      <Checkbox variant="info" label="Info Checkbox" />
      <Checkbox variant="danger" label="Danger Checkbox" />
      <Checkbox variant="ghost" label="Ghost Checkbox" />
      <Checkbox variant="outline" label="Outline Checkbox" />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox size="xs" label="Extra Small Checkbox" />
      <Checkbox size="sm" label="Small Checkbox" />
      <Checkbox size="md" label="Medium Checkbox" />
      <Checkbox size="lg" label="Large Checkbox" />
      <Checkbox size="xl" label="Extra Large Checkbox" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox label="Default Checkbox" />
      <Checkbox checked label="Checked Checkbox" />
      <Checkbox indeterminate label="Indeterminate Checkbox" />
      <Checkbox disabled label="Disabled Checkbox" />
      <Checkbox loading label="Loading Checkbox" />
      <Checkbox required label="Required Checkbox" />
      <Checkbox invalid label="Invalid Checkbox" />
      <Checkbox readOnly label="Read Only Checkbox" />
    </div>
  ),
};

// With Descriptions
export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Checkbox
        label="Email notifications"
        description="Receive email updates about your account and orders"
      />
      <Checkbox
        label="SMS notifications"
        description="Get text messages for urgent updates and delivery status"
      />
      <Checkbox
        label="Marketing communications"
        description="Receive promotional offers and product recommendations"
      />
      <Checkbox
        label="Data sharing"
        description="Allow us to share your data with trusted partners for better service"
      />
    </div>
  ),
};

// Interactive Examples
export const InteractiveExamples: Story = {
  render: () => {
    const [checkboxes, setCheckboxes] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const handleToggle = (key: keyof typeof checkboxes) => {
      setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          checked={checkboxes.notifications}
          onChange={() => handleToggle('notifications')}
          variant="primary"
          label="Push Notifications"
          description="Receive notifications for important updates"
        />
        <Checkbox
          checked={checkboxes.darkMode}
          onChange={() => handleToggle('darkMode')}
          variant="secondary"
          label="Dark Mode"
          description="Switch to dark theme"
        />
        <Checkbox
          checked={checkboxes.autoSave}
          onChange={() => handleToggle('autoSave')}
          variant="success"
          label="Auto Save"
          description="Automatically save your work"
        />
        <Checkbox
          checked={checkboxes.analytics}
          onChange={() => handleToggle('analytics')}
          variant="info"
          label="Analytics"
          description="Help us improve by sharing usage data"
        />
      </div>
    );
  },
};

// Interactive Theme Builder