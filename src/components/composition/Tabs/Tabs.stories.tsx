import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, type TabItem } from './Tabs';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Tabs> = {
  title: 'Composition/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabs renders a tabbed interface with controlled/uncontrolled active state. 8 variants, 5 sizes, icons, disabled tabs.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const items: TabItem[] = [
  {
    id: 'overview',
    label: 'Overview',
    content: <div style={{ padding: '16px' }}>Overview content</div>,
  },
  {
    id: 'details',
    label: 'Details',
    content: <div style={{ padding: '16px' }}>Details content</div>,
  },
  {
    id: 'settings',
    label: 'Settings',
    content: <div style={{ padding: '16px' }}>Settings content</div>,
  },
];

export const Default: Story = {
  args: {
    items,
    defaultActiveTab: 'overview',
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
            'info',
            'danger',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <Tabs key={v} items={items} variant={v} defaultActiveTab="overview" />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={16}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Tabs key={s} items={items} size={s} defaultActiveTab="overview" />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Disabled tabs & icons">
      <Tabs
        items={[
          ...items,
          {
            id: 'disabled',
            label: 'Disabled',
            content: <div>Should not show</div>,
            disabled: true,
          },
          {
            id: 'icon',
            label: 'With icon',
            icon: <span>⚙️</span>,
            content: <div style={{ padding: '16px' }}>Icon tab content</div>,
          },
        ]}
        defaultActiveTab="overview"
      />
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled">
      <Stack gap={16}>
        <Tabs items={items} defaultActiveTab="overview" />
        <Tabs items={items} activeTab="details" onChange={() => {}} />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Tabs across all 5 preset themes">
      <ThemeGrid>
        <Tabs items={items.slice(0, 2)} defaultActiveTab="overview" size="sm" />
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single tab, long labels, many tabs">
      <Stack gap={16}>
        <Tabs items={[items[0]]} defaultActiveTab="overview" />
        <Tabs
          items={[
            {
              id: '1',
              label: 'A very long tab label that might overflow',
              content: <div>Long label content</div>,
            },
            { id: '2', label: 'Short', content: <div>Short content</div> },
          ]}
          defaultActiveTab="1"
        />
        <Tabs
          items={Array.from({ length: 8 }, (_, i) => ({
            id: `tab-${i}`,
            label: `Tab ${i + 1}`,
            content: <div style={{ padding: '12px' }}>Tab {i + 1} content</div>,
          }))}
          defaultActiveTab="tab-0"
          size="sm"
        />
      </Stack>
    </Demo>
  ),
};
