import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../../index';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile badge component for status indicators, labels, and notifications. Supports multiple variants, sizes, and features like icons, dots, and removable badges.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'],
      description: 'The visual style variant of the badge',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'The size of the badge',
    },
    rounded: {
      control: { type: 'boolean' },
      description: 'Whether to use fully rounded corners',
    },
    outlined: {
      control: { type: 'boolean' },
      description: 'Whether to use outlined style instead of filled',
    },
    dot: {
      control: { type: 'boolean' },
      description: 'Whether to show a colored dot indicator',
    },
    removable: {
      control: { type: 'boolean' },
      description: 'Whether the badge can be removed',
    },
    iconPosition: {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Position of the icon relative to the text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Badge
export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

// Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="light">Light</Badge>
      <Badge variant="dark">Dark</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with their default styling.',
      },
    },
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Badge size="xs">Extra Small</Badge>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge sizes from extra small to large.',
      },
    },
  },
};

// Outlined Variants
export const Outlined: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" outlined>
        Primary
      </Badge>
      <Badge variant="secondary" outlined>
        Secondary
      </Badge>
      <Badge variant="success" outlined>
        Success
      </Badge>
      <Badge variant="warning" outlined>
        Warning
      </Badge>
      <Badge variant="danger" outlined>
        Danger
      </Badge>
      <Badge variant="info" outlined>
        Info
      </Badge>
      <Badge variant="light" outlined>
        Light
      </Badge>
      <Badge variant="dark" outlined>
        Dark
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Outlined badge variants with transparent backgrounds and colored borders.',
      },
    },
  },
};

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" icon="✓">
        Completed
      </Badge>
      <Badge variant="warning" icon="⚠">
        Pending
      </Badge>
      <Badge variant="danger" icon="✕">
        Failed
      </Badge>
      <Badge variant="info" icon="ℹ">
        Info
      </Badge>
      <Badge variant="primary" icon="🔔" iconPosition="right">
        Notifications
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with icons positioned on the left or right side.',
      },
    },
  },
};

// With Dots
export const WithDots: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>
        Online
      </Badge>
      <Badge variant="danger" dot>
        Offline
      </Badge>
      <Badge variant="warning" dot>
        Away
      </Badge>
      <Badge variant="info" dot>
        Busy
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with colored dot indicators for status representation.',
      },
    },
  },
};

// Removable Badges
export const Removable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" removable onRemove={() => alert('Primary badge removed')}>
        Primary
      </Badge>
      <Badge variant="success" removable onRemove={() => alert('Success badge removed')}>
        Success
      </Badge>
      <Badge variant="warning" removable onRemove={() => alert('Warning badge removed')}>
        Warning
      </Badge>
      <Badge variant="danger" removable onRemove={() => alert('Danger badge removed')}>
        Danger
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Removable badges with clickable remove buttons and callback functions.',
      },
    },
  },
};

// Rounded Badges
export const Rounded: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="primary" rounded>
        Rounded
      </Badge>
      <Badge variant="success" rounded>
        Success
      </Badge>
      <Badge variant="warning" rounded>
        Warning
      </Badge>
      <Badge variant="danger" rounded>
        Danger
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with fully rounded corners for a more modern look.',
      },
    },
  },
};

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot>
        Active
      </Badge>
      <Badge variant="warning" dot>
        Pending
      </Badge>
      <Badge variant="danger" dot>
        Inactive
      </Badge>
      <Badge variant="info" dot>
        Processing
      </Badge>
      <Badge variant="secondary" dot>
        Archived
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common use case for badges as status indicators with dot indicators.',
      },
    },
  },
};

// Notification Badges
export const NotificationBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="danger">3</Badge>
      <Badge variant="warning">12</Badge>
      <Badge variant="info">99+</Badge>
      <Badge variant="success">New</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges commonly used for notification counts and new item indicators.',
      },
    },
  },
};

// Custom Colors
export const CustomColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge color="#8b5cf6" textColor="#ffffff">
        Custom Purple
      </Badge>
      <Badge color="#f97316" textColor="#ffffff">
        Custom Orange
      </Badge>
      <Badge color="#06b6d4" textColor="#ffffff">
        Custom Cyan
      </Badge>
      <Badge color="#ec4899" textColor="#ffffff">
        Custom Pink
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with custom background and text colors for brand-specific styling.',
      },
    },
  },
};

// Complex Examples
export const ComplexExamples: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="success" dot icon="✓" size="lg">
        Task Completed
      </Badge>
      <Badge variant="warning" outlined icon="⏰" removable size="lg">
        Due Soon
      </Badge>
      <Badge variant="danger" dot icon="🚨" rounded size="lg">
        Critical Alert
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complex badge examples combining multiple features for advanced use cases.',
      },
    },
  },
};

// Interactive Theme Builder
