import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './ContextMenu';
import type { ContextMenuItem } from './ContextMenu';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof ContextMenu> = {
  title: 'Components/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ContextMenu>;

const items: ContextMenuItem[] = [
  { label: 'Cut', shortcut: '⌘X', onClick: () => alert('Cut') },
  { label: 'Copy', shortcut: '⌘C', onClick: () => alert('Copy') },
  { type: 'separator' },
  { label: 'Paste', shortcut: '⌘V', onClick: () => alert('Paste') },
  { type: 'separator' },
  { label: 'Delete', danger: true, onClick: () => alert('Delete') },
  { label: 'Rename (disabled)', disabled: true, onClick: () => {} },
];

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <ContextMenu items={items}>
        <div
          style={{
            padding: 40,
            border: '2px dashed #cbd5e1',
            borderRadius: 8,
            textAlign: 'center',
            color: '#64748b',
          }}
        >
          Right-click here
        </div>
      </ContextMenu>
    </ThemeProvider>
  ),
};
