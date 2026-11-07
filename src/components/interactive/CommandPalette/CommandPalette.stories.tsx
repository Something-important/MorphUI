import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette, type CommandItem } from './CommandPalette';
import { Button } from '../../basic/Button';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof CommandPalette> = {
  title: 'Patterns/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CommandPalette renders a search-driven command menu (Cmd+K pattern). Supports groups, shortcuts, icons, controlled/uncontrolled open state. 4 variants.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const commands: CommandItem[] = [
  { id: 'home', label: 'Go to Home', group: 'Navigation', shortcut: '⌘H', icon: <span>🏠</span> },
  { id: 'settings', label: 'Settings', group: 'Navigation', icon: <span>⚙️</span> },
  { id: 'copy', label: 'Copy', group: 'Actions', shortcut: '⌘C', icon: <span>📋</span> },
  { id: 'paste', label: 'Paste', group: 'Actions', shortcut: '⌘V', icon: <span>📥</span> },
  {
    id: 'delete',
    label: 'Delete',
    group: 'Actions',
    shortcut: '⌫',
    icon: <span>🗑️</span>,
    disabled: true,
  },
  { id: 'profile', label: 'View Profile', group: 'Account', icon: <span>👤</span> },
  { id: 'logout', label: 'Log Out', group: 'Account', icon: <span>🚪</span> },
];

export const Default: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <CommandPalette items={commands} defaultIsOpen placeholder="Search commands..." />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (each open by default)">
      <Stack gap={16}>
        {(['primary', 'secondary', 'ghost', 'outline'] as const).map((v) => (
          <div key={v}>
            <strong>{v}</strong>
            <CommandPalette
              items={commands}
              variant={v}
              defaultIsOpen
              placeholder={`Search (${v})...`}
            />
          </div>
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Empty state & custom message">
      <Stack gap={16}>
        <CommandPalette items={[]} defaultIsOpen placeholder="No commands..." />
        <CommandPalette
          items={[]}
          defaultIsOpen
          emptyMessage="No matching commands found"
          placeholder="Search..."
        />
      </Stack>
    </Demo>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Demo title="Controlled vs uncontrolled open state">
      <Stack gap={16}>
        <CommandPalette items={commands} defaultIsOpen placeholder="Uncontrolled (defaultIsOpen)" />
        <CommandPalette
          items={commands}
          isOpen
          onOpenChange={() => {}}
          placeholder="Controlled (isOpen)"
        />
      </Stack>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Custom color & shortcuts">
      <Stack gap={16}>
        <CommandPalette
          items={commands}
          defaultIsOpen
          color="#ff0055"
          placeholder="Custom accent..."
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="CommandPalette trigger across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Press ⌘K</Button>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single command, long labels, many groups">
      <Stack gap={16}>
        <CommandPalette
          items={[{ id: 'only', label: 'Only command' }]}
          defaultIsOpen
          placeholder="Single..."
        />
        <CommandPalette
          items={[
            {
              id: 'long',
              label: 'A very long command label that might overflow the palette width',
              group: 'Test',
            },
            { id: 'short', label: 'Short', group: 'Test' },
          ]}
          defaultIsOpen
          placeholder="Long labels..."
        />
      </Stack>
    </Demo>
  ),
};

export const Integration: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <Demo title="Button trigger integration">
        <Stack gap={8}>
          <Button variant="primary" onClick={() => setOpen(true)}>
            Open command palette
          </Button>
          <CommandPalette
            items={commands}
            isOpen={open}
            onOpenChange={setOpen}
            placeholder="Type to search..."
          />
        </Stack>
      </Demo>
    );
  },
};
