import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, type SidebarItem } from './index';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Sidebar> = {
  title: 'Composition/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sidebar renders a vertical navigation panel with items, groups, sections, headers, footers, and collapse/toggle. Supports both legacy items-array API and composition API. 8 variants, left/right positions.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const navItems: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: <span>🏠</span> },
  { id: 'dashboard', label: 'Dashboard', icon: <span>📊</span>, badge: '3' },
  {
    id: 'projects',
    label: 'Projects',
    icon: <span>📁</span>,
    children: [
      { id: 'p1', label: 'Project A' },
      { id: 'p2', label: 'Project B' },
    ],
  },
  { id: 'settings', label: 'Settings', icon: <span>⚙️</span> },
  { id: 'disabled', label: 'Disabled', icon: <span>🚫</span>, disabled: true },
];

export const Default: Story = {
  render: () => (
    <div style={{ height: '400px', display: 'flex' }}>
      <Sidebar
        items={navItems}
        defaultActiveItem="home"
        headerContent={<div style={{ padding: '12px', fontWeight: 600 }}>My App</div>}
        footerContent={
          <div style={{ padding: '12px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
            v1.5.0
          </div>
        }
      />
      <div style={{ flex: 1, padding: '24px', background: 'var(--color-background-secondary)' }}>
        Main content area
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (legacy items API)">
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
          <div
            key={v}
            style={{ height: '200px', display: 'flex', border: '1px solid var(--color-border)' }}
          >
            <Sidebar items={navItems.slice(0, 3)} variant={v} defaultActiveItem="home" />
          </div>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Positions: Story = {
  render: () => (
    <Demo title="Left vs right position">
      <Stack gap={16}>
        <div style={{ height: '200px', display: 'flex', border: '1px solid var(--color-border)' }}>
          <Sidebar items={navItems.slice(0, 3)} position="left" defaultActiveItem="home" />
          <div style={{ flex: 1, padding: '12px' }}>Left sidebar</div>
        </div>
        <div style={{ height: '200px', display: 'flex', border: '1px solid var(--color-border)' }}>
          <div style={{ flex: 1, padding: '12px' }}>Right sidebar</div>
          <Sidebar items={navItems.slice(0, 3)} position="right" defaultActiveItem="home" />
        </div>
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Collapsed & with toggle">
      <div style={{ height: '300px', display: 'flex', border: '1px solid var(--color-border)' }}>
        <Sidebar
          items={navItems}
          defaultActiveItem="home"
          showToggle
          defaultCollapsed
          headerContent={<div style={{ padding: '12px', fontWeight: 600 }}>Collapsed</div>}
        />
        <div style={{ flex: 1, padding: '12px' }}>
          Sidebar starts collapsed — click toggle to expand
        </div>
      </div>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors, gradients, badges">
      <Stack gap={16}>
        <div style={{ height: '200px', display: 'flex', border: '1px solid var(--color-border)' }}>
          <Sidebar items={navItems} color="#ff0055" textColor="#fff" defaultActiveItem="home" />
        </div>
        <div style={{ height: '200px', display: 'flex', border: '1px solid var(--color-border)' }}>
          <Sidebar
            items={navItems}
            gradient="linear-gradient(180deg, #667eea, #764ba2)"
            textColor="#fff"
            defaultActiveItem="home"
          />
        </div>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Sidebar across all 5 preset themes">
      <ThemeGrid>
        <div style={{ height: '150px' }}>
          <Sidebar items={navItems.slice(0, 3)} defaultActiveItem="home" />
        </div>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single item, nested groups, many items">
      <Stack gap={16}>
        <div style={{ height: '200px', display: 'flex', border: '1px solid var(--color-border)' }}>
          <Sidebar items={[{ id: 'only', label: 'Only item' }]} defaultActiveItem="only" />
        </div>
        <div style={{ height: '300px', display: 'flex', border: '1px solid var(--color-border)' }}>
          <Sidebar
            items={Array.from({ length: 15 }, (_, i) => ({
              id: `item-${i}`,
              label: `Item ${i + 1}`,
            }))}
            defaultActiveItem="item-0"
          />
        </div>
      </Stack>
    </Demo>
  ),
};
