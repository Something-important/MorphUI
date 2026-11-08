import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useTabs } from '../../hooks';
import { Button } from '../../components/basic/Button';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useTabs',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless tab behavior: active-tab state (controlled/uncontrolled), tab-change callback, and validation that the active tab still exists in the items array. Extracted from the Tabs component (PR #108).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'details', label: 'Details' },
  { id: 'settings', label: 'Settings' },
];

const TabsDemo = () => {
  const { activeTab, setActiveTab } = useTabs({
    items: tabs,
    defaultActiveTab: 'overview',
    onChange: (id) => console.log('Switched to', id),
  });

  return (
    <Demo title="useTabs — click tabs to switch, hooks manages the active state">
      <Stack gap={12}>
        <div
          style={{
            display: 'flex',
            gap: '4px',
            borderBottom: '2px solid var(--color-border, #d1d5db)',
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 16px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab.id ? 600 : 400,
                color:
                  activeTab === tab.id
                    ? 'var(--color-primary, #0070f3)'
                    : 'var(--color-text-secondary, #6b7280)',
                borderBottom: `2px solid ${activeTab === tab.id ? 'var(--color-primary, #0070f3)' : 'transparent'}`,
                marginBottom: '-2px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div
          style={{
            padding: '16px',
            background: 'var(--color-background-secondary, #f9fafb)',
            borderRadius: '8px',
          }}
        >
          Active tab: <strong>{activeTab}</strong>
        </div>
      </Stack>
    </Demo>
  );
};

export const Default: Story = {
  render: () => <TabsDemo />,
};

export const ItemValidation: Story = {
  render: () => <ItemValidationDemo />,
};

const ItemValidationDemo = () => {
  const [items, setItems] = useState(tabs);
  const { activeTab } = useTabs({
    items,
    defaultActiveTab: 'details',
    onChange: (id) => console.log('Switched to', id),
  });

  return (
    <Demo title="Item validation — remove the active tab and the hook resets to the first item">
      <Stack gap={12}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setItems(tabs.filter((t) => t.id !== 'details'))}
        >
          Remove "Details" tab
        </Button>
        <div>
          Active tab: <strong>{activeTab}</strong> (auto-resets if removed)
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {items.map((tab) => (
            <span
              key={tab.id}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                background:
                  activeTab === tab.id
                    ? 'var(--color-primary, #0070f3)'
                    : 'var(--color-background-secondary, #f9fafb)',
                color: activeTab === tab.id ? '#fff' : 'var(--color-text, #111827)',
              }}
            >
              {tab.label}
            </span>
          ))}
        </div>
      </Stack>
    </Demo>
  );
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="useTabs trigger across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Tab Button</Button>
      </ThemeGrid>
    </Demo>
  ),
};
