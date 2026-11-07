import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../../index';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toggle switch component with advanced theming and accessibility features.',
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
      description: 'Callback when switch state changes',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the switch',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    readOnly: {
      control: 'boolean',
      description: 'Make the switch read-only',
    },
    required: {
      control: 'boolean',
      description: 'Mark as required',
    },
    invalid: {
      control: 'boolean',
      description: 'Mark as invalid',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size variant',
    },
    label: {
      control: 'text',
      description: 'Switch label',
    },
    description: {
      control: 'text',
      description: 'Additional description',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Label position relative to switch',
    },
    icon: {
      control: 'text',
      description: 'Icon to display',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Icon position',
    },
    ripple: {
      control: 'boolean',
      description: 'Enable ripple effect',
    },
    backgroundPattern: {
      control: 'text',
      description: 'CSS background pattern',
    },
    backgroundImage: {
      control: 'text',
      description: 'URL for background image',
    },
    backgroundBlend: {
      control: 'select',
      options: [
        'normal',
        'multiply',
        'screen',
        'overlay',
        'darken',
        'lighten',
        'color-dodge',
        'color-burn',
        'hard-light',
        'soft-light',
        'difference',
        'exclusion',
        'hue',
        'saturation',
        'color',
        'luminosity',
      ],
      description: 'Background blend mode',
    },
    color: {
      control: 'color',
      description: 'Custom color',
    },
    gradient: {
      control: 'text',
      description: 'Custom gradient',
    },
    textColor: {
      control: 'color',
      description: 'Custom text color',
    },
    borderColor: {
      control: 'color',
      description: 'Custom border color',
    },
    borderRadius: {
      control: 'number',
      description: 'Custom border radius',
    },
    shadow: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
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
type Story = StoryObj<typeof Switch>;

// Basic Switch
export const Default: Story = {
  args: {
    label: 'Toggle me',
    description: 'A simple toggle switch',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch variant="primary" label="Primary Switch" />
      <Switch variant="secondary" label="Secondary Switch" />
      <Switch variant="success" label="Success Switch" />
      <Switch variant="warning" label="Warning Switch" />
      <Switch variant="info" label="Info Switch" />
      <Switch variant="danger" label="Danger Switch" />
      <Switch variant="ghost" label="Ghost Switch" />
      <Switch variant="outline" label="Outline Switch" />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch size="xs" label="Extra Small Switch" />
      <Switch size="sm" label="Small Switch" />
      <Switch size="md" label="Medium Switch" />
      <Switch size="lg" label="Large Switch" />
      <Switch size="xl" label="Extra Large Switch" />
    </div>
  ),
};

// Label Positions
export const LabelPositions: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch labelPosition="left" label="Left Label" />
      <Switch labelPosition="right" label="Right Label" />
      <Switch labelPosition="top" label="Top Label" />
      <Switch labelPosition="bottom" label="Bottom Label" />
    </div>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch icon="⚡" iconPosition="left" label="Left Icon Switch" />
      <Switch icon="🔒" iconPosition="right" label="Right Icon Switch" />
      <Switch icon="🌟" iconPosition="left" label="Star Icon Switch" />
      <Switch icon="💡" iconPosition="right" label="Lightbulb Switch" />
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Switch label="Default Switch" />
      <Switch checked label="Checked Switch" />
      <Switch disabled label="Disabled Switch" />
      <Switch loading label="Loading Switch" />
      <Switch readOnly label="Read Only Switch" />
      <Switch required label="Required Switch" />
      <Switch invalid label="Invalid Switch" />
    </div>
  ),
};

// Interactive Examples
export const InteractiveExamples: Story = {
  render: () => {
    const [switches, setSwitches] = useState({
      notifications: true,
      darkMode: false,
      autoSave: true,
      analytics: false,
    });

    const handleToggle = (key: keyof typeof switches) => {
      setSwitches((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Switch
          checked={switches.notifications}
          onChange={() => handleToggle('notifications')}
          variant="primary"
          icon="🔔"
          label="Push Notifications"
          description="Receive notifications for important updates"
        />
        <Switch
          checked={switches.darkMode}
          onChange={() => handleToggle('darkMode')}
          variant="secondary"
          icon="🌙"
          label="Dark Mode"
          description="Switch to dark theme"
        />
        <Switch
          checked={switches.autoSave}
          onChange={() => handleToggle('autoSave')}
          variant="success"
          icon="💾"
          label="Auto Save"
          description="Automatically save your work"
        />
        <Switch
          checked={switches.analytics}
          onChange={() => handleToggle('analytics')}
          variant="info"
          icon="📊"
          label="Analytics"
          description="Help us improve by sharing usage data"
        />
      </div>
    );
  },
};

// Interactive Theme Builder
