import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu, type ContextMenuItem } from './ContextMenu';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof ContextMenu> = {
  title: 'Composition/ContextMenu',
  component: ContextMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ContextMenu renders a right-click menu. Supports items, separators, icons, shortcuts, disabled/destructive items, and 3 variants × 3 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const items: ContextMenuItem[] = [
  { label: 'Copy', icon: <span>📋</span>, shortcut: '⌘C' },
  { label: 'Paste', icon: <span>📥</span>, shortcut: '⌘V' },
  { type: 'separator' },
  { label: 'Rename', icon: <span>✏️</span> },
  { label: 'Delete', icon: <span>🗑️</span>, danger: true, shortcut: '⌫' },
  { type: 'separator' },
  { label: 'Properties', icon: <span>⚙️</span> },
  { label: 'Disabled item', disabled: true },
];

export const Default: Story = {
  render: () => (
    <ContextMenu items={items}>
      <div
        style={{
          padding: '40px 60px',
          border: '2px dashed var(--color-border, #d1d5db)',
          borderRadius: 'var(--border-radius-md, 8px)',
          background: 'var(--color-background-secondary, #f9fafb)',
          textAlign: 'center',
          color: 'var(--color-text-secondary, #6b7280)',
        }}
      >
        Right-click me
      </div>
    </ContextMenu>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (right-click each)">
      <Stack gap={12}>
        {(['primary', 'secondary', 'default'] as const).map((v) => (
          <ContextMenu key={v} items={items} variant={v}>
            <div
              style={{
                padding: '24px 40px',
                border: '2px dashed var(--color-border, #d1d5db)',
                borderRadius: 'var(--border-radius-md, 8px)',
                textAlign: 'center',
              }}
            >
              {v} variant — right-click
            </div>
          </ContextMenu>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (right-click each)">
      <Stack gap={12}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <ContextMenu key={s} items={items} size={s}>
            <div
              style={{
                padding: '24px 40px',
                border: '2px dashed var(--color-border, #d1d5db)',
                borderRadius: 'var(--border-radius-md, 8px)',
                textAlign: 'center',
              }}
            >
              {s} size — right-click
            </div>
          </ContextMenu>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors">
      <ContextMenu items={items} color="#ff0055" textColor="#fff">
        <div
          style={{
            padding: '24px 40px',
            border: '2px dashed var(--color-border, #d1d5db)',
            borderRadius: 'var(--border-radius-md, 8px)',
            textAlign: 'center',
          }}
        >
          Custom color menu — right-click
        </div>
      </ContextMenu>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="ContextMenu trigger across all 5 preset themes">
      <ThemeGrid>
        <ContextMenu items={items}>
          <div
            style={{
              padding: '16px',
              textAlign: 'center',
              border: '1px dashed currentColor',
              borderRadius: '4px',
            }}
          >
            Right-click
          </div>
        </ContextMenu>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single item, separators only, long labels">
      <Stack gap={12}>
        <ContextMenu items={[{ label: 'Only item' }]}>
          <div
            style={{
              padding: '16px',
              border: '2px dashed var(--color-border)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            Single item — right-click
          </div>
        </ContextMenu>
        <ContextMenu
          items={[
            { label: 'A very long context menu item label that might overflow' },
            { type: 'separator' },
            { label: 'Short' },
          ]}
        >
          <div
            style={{
              padding: '16px',
              border: '2px dashed var(--color-border)',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            Long labels — right-click
          </div>
        </ContextMenu>
      </Stack>
    </Demo>
  ),
};
