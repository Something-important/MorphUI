import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CommandPalette, type CommandItem } from './CommandPalette';
import { ThemeProvider } from '../../theme';

const commands: CommandItem[] = [
  {
    id: 'home',
    label: 'Go to Home',
    group: 'Navigation',
    shortcut: '⌘H',
    icon: '🏠',
    keywords: 'dashboard start',
  },
  {
    id: 'settings',
    label: 'Settings',
    group: 'Navigation',
    icon: '⚙️',
    keywords: 'preferences config',
  },
  {
    id: 'copy',
    label: 'Copy',
    group: 'Actions',
    shortcut: '⌘C',
    icon: '📋',
    keywords: 'clipboard',
  },
  { id: 'paste', label: 'Paste', group: 'Actions', shortcut: '⌘V', icon: '📥' },
  { id: 'delete', label: 'Delete', group: 'Actions', icon: '🗑️', disabled: true },
  { id: 'profile', label: 'View Profile', group: 'Account', icon: '👤' },
  { id: 'logout', label: 'Log Out', group: 'Account', icon: '🚪' },
];

const meta: Meta<typeof CommandPalette> = {
  title: 'Components/CommandPalette',
  component: CommandPalette,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof CommandPalette>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(true);
    return (
      <ThemeProvider>
        <button onClick={() => setIsOpen(true)}>Open palette (or press ⌘K)</button>
        <CommandPalette items={commands} isOpen={isOpen} onOpenChange={setIsOpen} />
      </ThemeProvider>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [lastAction, setLastAction] = React.useState('(none)');
    return (
      <ThemeProvider>
        <button onClick={() => setIsOpen(true)}>Open palette</button>
        <p>Last action: {lastAction}</p>
        <CommandPalette
          items={commands.map((c) => ({
            ...c,
            onSelect: () => setLastAction(c.label),
          }))}
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        />
      </ThemeProvider>
    );
  },
};
