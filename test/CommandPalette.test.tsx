import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CommandPalette, type CommandItem } from '../src/components/interactive/CommandPalette';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const items: CommandItem[] = [
  {
    id: 'home',
    label: 'Go to Home',
    group: 'Navigation',
    shortcut: '⌘H',
    keywords: 'dashboard start',
  },
  { id: 'settings', label: 'Settings', group: 'Navigation', keywords: 'preferences config' },
  { id: 'copy', label: 'Copy', group: 'Actions', shortcut: '⌘C', keywords: 'clipboard' },
  { id: 'delete', label: 'Delete', group: 'Actions', disabled: true },
  { id: 'profile', label: 'View Profile', group: 'Account' },
];

describe('CommandPalette Component', () => {
  describe('Basic Rendering', () => {
    it('renders nothing when closed (default)', () => {
      renderWithTheme(<CommandPalette items={items} />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('renders all items when open with no query', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      expect(screen.getByText('Go to Home')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.getByText('Copy')).toBeInTheDocument();
      expect(screen.getByText('View Profile')).toBeInTheDocument();
    });

    it('renders group labels', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      expect(screen.getByText('Navigation')).toBeInTheDocument();
      expect(screen.getByText('Actions')).toBeInTheDocument();
      expect(screen.getByText('Account')).toBeInTheDocument();
    });
  });

  describe('Filtering', () => {
    it('filters items by label', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      const input = screen.getByRole('combobox');
      fireEvent.change(input, { target: { value: 'settings' } });
      expect(screen.getByText('Settings')).toBeInTheDocument();
      expect(screen.queryByText('Go to Home')).not.toBeInTheDocument();
    });

    it('filters items by keywords', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      const input = screen.getByRole('combobox');
      fireEvent.change(input, { target: { value: 'config' } });
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('shows empty message when no results', () => {
      renderWithTheme(<CommandPalette items={items} isOpen emptyMessage="Nothing here" />);
      const input = screen.getByRole('combobox');
      fireEvent.change(input, { target: { value: 'nonexistent' } });
      expect(screen.getByText('Nothing here')).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('closes on Escape', () => {
      const onOpenChange = jest.fn();
      renderWithTheme(<CommandPalette items={items} isOpen onOpenChange={onOpenChange} />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('moves active index on ArrowDown', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      // Initially first enabled item is active
      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveAttribute('aria-selected', 'true');
      // Arrow down
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowDown' });
      const updated = screen.getAllByRole('option');
      expect(updated[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('selects on Enter and calls onSelect', () => {
      const onSelect = jest.fn();
      const itemsWithAction: CommandItem[] = [{ id: 'test', label: 'Test Action', onSelect }];
      renderWithTheme(<CommandPalette items={itemsWithAction} isOpen />);
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Enter' });
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe('Click Selection', () => {
    it('calls onSelect when an item is clicked', () => {
      const onSelect = jest.fn();
      const itemsWithAction: CommandItem[] = [{ id: 'test', label: 'Test Action', onSelect }];
      renderWithTheme(<CommandPalette items={itemsWithAction} isOpen />);
      fireEvent.click(screen.getByText('Test Action'));
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('does not call onSelect for disabled items', () => {
      const onSelect = jest.fn();
      const disabledItem: CommandItem[] = [
        { id: 'disabled', label: 'Disabled Action', disabled: true, onSelect },
      ];
      renderWithTheme(<CommandPalette items={disabledItem} isOpen />);
      fireEvent.click(screen.getByText('Disabled Action'));
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Open/Close', () => {
    it('opens with defaultIsOpen', () => {
      renderWithTheme(<CommandPalette items={items} defaultIsOpen />);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('controlled isOpen wins over defaultIsOpen', () => {
      renderWithTheme(<CommandPalette items={items} isOpen={false} defaultIsOpen />);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Shortcuts + Icons', () => {
    it('renders shortcut hint', () => {
      renderWithTheme(<CommandPalette items={items} isOpen />);
      expect(screen.getByText('⌘H')).toBeInTheDocument();
      expect(screen.getByText('⌘C')).toBeInTheDocument();
    });

    it('renders icon when provided', () => {
      const itemsWithIcon: CommandItem[] = [
        { id: 'test', label: 'Test', icon: <span data-testid="icon">🏠</span> },
      ];
      renderWithTheme(<CommandPalette items={itemsWithIcon} isOpen />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });
});
