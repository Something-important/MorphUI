import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ContextMenu } from '../src/components/composition/ContextMenu';
import type { ContextMenuItem, ContextMenuProps } from '../src/components/composition/ContextMenu';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const items: ContextMenuItem[] = [
  { label: 'Cut', shortcut: '⌘X', onClick: jest.fn() },
  { label: 'Copy', shortcut: '⌘C', onClick: jest.fn() },
  { type: 'separator' },
  { label: 'Paste', shortcut: '⌘V', onClick: jest.fn() },
  { label: 'Delete', danger: true, onClick: jest.fn() },
  { label: 'Disabled', disabled: true, onClick: jest.fn() },
];

describe('ContextMenu Component', () => {
  describe('Triggering', () => {
    it('opens the menu on right-click (contextmenu event)', () => {
      renderWithTheme(
        <ContextMenu items={items}>
          <div data-testid="target">Right-click me</div>
        </ContextMenu>,
      );
      fireEvent.contextMenu(screen.getByTestId('target'));
      expect(screen.getByRole('menu')).toBeInTheDocument();
    });

    it('does not open the menu on a normal click', () => {
      renderWithTheme(
        <ContextMenu items={items}>
          <div data-testid="target">Right-click me</div>
        </ContextMenu>,
      );
      fireEvent.click(screen.getByTestId('target'));
      expect(screen.queryByRole('menu')).toBeNull();
    });

    it('renders the trigger children', () => {
      renderWithTheme(
        <ContextMenu items={items}>
          <span data-testid="child">target</span>
        </ContextMenu>,
      );
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });
  });

  describe('Controlled mode', () => {
    it('opens when isOpen is true', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 100, y: 100 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menu = screen.getByRole('menu');
      expect(menu).toBeInTheDocument();
      expect(menu.style.left).toBe('100px');
      expect(menu.style.top).toBe('100px');
    });

    it('calls onClose when Escape is pressed', () => {
      const onClose = jest.fn();
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 50, y: 50 }} onClose={onClose}>
          <div>target</div>
        </ContextMenu>,
      );
      fireEvent.keyDown(screen.getByRole('menu'), { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose on outside click', () => {
      const onClose = jest.fn();
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 50, y: 50 }} onClose={onClose}>
          <div>target</div>
        </ContextMenu>,
      );
      // click outside the menu (on the target wrapper)
      fireEvent.mouseDown(document.body);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Items', () => {
    it('renders menuitems and separators', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menuItems = screen.getAllByRole('menuitem');
      expect(menuItems).toHaveLength(5); // Cut, Copy, Paste, Delete, Disabled (separator excluded)
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('renders icons and shortcuts', () => {
      const iconItems: ContextMenuItem[] = [
        {
          label: 'Edit',
          icon: <span data-testid="icon">✏️</span>,
          shortcut: 'E',
          onClick: jest.fn(),
        },
      ];
      renderWithTheme(
        <ContextMenu items={iconItems} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('E')).toBeInTheDocument();
    });

    it('renders a danger item with the danger class', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const deleteItem = screen.getByText('Delete').closest('button');
      expect(deleteItem).toHaveClass('context-menu-component__item--danger');
    });

    it('disables a disabled item', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      expect(screen.getByText('Disabled').closest('button')).toBeDisabled();
    });
  });

  describe('Selection', () => {
    it('activates an item on click and closes', () => {
      const onCopy = jest.fn();
      const onClose = jest.fn();
      const testItems: ContextMenuItem[] = [{ label: 'Copy', onClick: onCopy }];
      renderWithTheme(
        <ContextMenu items={testItems} isOpen position={{ x: 10, y: 10 }} onClose={onClose}>
          <div>target</div>
        </ContextMenu>,
      );
      fireEvent.click(screen.getByText('Copy'));
      expect(onCopy).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not activate a disabled item', () => {
      const onClick = jest.fn();
      const onClose = jest.fn();
      const testItems: ContextMenuItem[] = [{ label: 'Nope', disabled: true, onClick }];
      renderWithTheme(
        <ContextMenu items={testItems} isOpen position={{ x: 10, y: 10 }} onClose={onClose}>
          <div>target</div>
        </ContextMenu>,
      );
      fireEvent.click(screen.getByText('Nope'));
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard navigation', () => {
    const navItems: ContextMenuItem[] = [
      { label: 'Alpha', onClick: jest.fn() },
      { label: 'Beta', onClick: jest.fn() },
      { type: 'separator' },
      { label: 'Gamma', onClick: jest.fn() },
    ];

    it('focuses the first enabled item when opened', () => {
      renderWithTheme(
        <ContextMenu items={navItems} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      expect(screen.getByText('Alpha').closest('button')).toHaveFocus();
    });

    it('moves focus with ArrowDown (skipping separators + disabled)', () => {
      renderWithTheme(
        <ContextMenu items={navItems} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menu = screen.getByRole('menu');
      fireEvent.keyDown(menu, { key: 'ArrowDown' }); // Alpha -> Beta
      expect(screen.getByText('Beta').closest('button')).toHaveFocus();
      fireEvent.keyDown(menu, { key: 'ArrowDown' }); // Beta -> Gamma (skip separator)
      expect(screen.getByText('Gamma').closest('button')).toHaveFocus();
    });

    it('moves focus with ArrowUp (wraps)', () => {
      renderWithTheme(
        <ContextMenu items={navItems} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menu = screen.getByRole('menu');
      fireEvent.keyDown(menu, { key: 'ArrowUp' }); // Alpha (first) -> Gamma (last, wraps)
      expect(screen.getByText('Gamma').closest('button')).toHaveFocus();
    });

    it('Home/End jump to first/last', () => {
      renderWithTheme(
        <ContextMenu items={navItems} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menu = screen.getByRole('menu');
      fireEvent.keyDown(menu, { key: 'End' });
      expect(screen.getByText('Gamma').closest('button')).toHaveFocus();
      fireEvent.keyDown(menu, { key: 'Home' });
      expect(screen.getByText('Alpha').closest('button')).toHaveFocus();
    });

    it('activates the focused item on Enter', () => {
      const onBeta = jest.fn();
      const testItems: ContextMenuItem[] = [
        { label: 'Alpha', onClick: jest.fn() },
        { label: 'Beta', onClick: onBeta },
      ];
      renderWithTheme(
        <ContextMenu items={testItems} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menu = screen.getByRole('menu');
      fireEvent.keyDown(menu, { key: 'ArrowDown' }); // focus Beta
      fireEvent.keyDown(menu, { key: 'Enter' });
      expect(onBeta).toHaveBeenCalledTimes(1);
    });
  });

  describe('Theme integration', () => {
    const renderOpen = (props: Partial<ContextMenuProps> = {}) =>
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}} {...props}>
          <div>target</div>
        </ContextMenu>,
      );

    it('writes the custom background var for a custom color', () => {
      renderOpen({ color: '#ff0000' });
      expect(screen.getByRole('menu')).toHaveStyle({ '--context-menu-custom-bg': '#ff0000' });
    });

    it('resolves a theme key to a token var for the background', () => {
      renderOpen({ color: 'color-primary' });
      expect(screen.getByRole('menu')).toHaveStyle({
        '--context-menu-custom-bg': 'var(--color-primary)',
      });
    });

    it('gradient beats color for the background var', () => {
      const gradient = 'linear-gradient(90deg, #ff0000, #0000ff)';
      renderOpen({ color: '#ff0000', gradient });
      expect(screen.getByRole('menu')).toHaveStyle({ '--context-menu-custom-bg': gradient });
    });

    it('writes the custom text color and border vars', () => {
      renderOpen({ textColor: '#ffffff', borderColor: '--color-primary' });
      expect(screen.getByRole('menu')).toHaveStyle({
        '--context-menu-custom-text-color': '#ffffff',
        '--context-menu-custom-border': 'var(--color-primary)',
      });
    });

    it('converts a numeric borderRadius to px', () => {
      renderOpen({ borderRadius: 12 });
      expect(screen.getByRole('menu')).toHaveStyle({
        '--context-menu-custom-border-radius': '12px',
      });
    });

    it('keeps a string borderRadius as-is', () => {
      renderOpen({ borderRadius: '0.5rem' });
      expect(screen.getByRole('menu')).toHaveStyle({
        '--context-menu-custom-border-radius': '0.5rem',
      });
    });

    it('resolves the shadow token to a var', () => {
      renderOpen({ shadow: 'lg' });
      expect(screen.getByRole('menu')).toHaveStyle({
        '--context-menu-custom-shadow': 'var(--shadow-lg)',
      });
    });

    it('user style wins over the theme prop for the same custom var', () => {
      renderOpen({
        color: '#ff0000',
        style: { '--context-menu-custom-bg': '#00ff00' } as React.CSSProperties,
      });
      expect(screen.getByRole('menu')).toHaveStyle({ '--context-menu-custom-bg': '#00ff00' });
    });

    it('writes no theme vars when no theme props are given', () => {
      renderOpen();
      const menu = screen.getByRole('menu') as HTMLElement;
      expect(menu.style.getPropertyValue('--context-menu-custom-bg')).toBe('');
      expect(menu.style.getPropertyValue('--context-menu-custom-shadow')).toBe('');
    });
  });

  describe('Accessibility', () => {
    it('sets role="menu" with aria-label', () => {
      renderWithTheme(
        <ContextMenu
          items={items}
          isOpen
          position={{ x: 10, y: 10 }}
          onClose={() => {}}
          ariaLabel="Actions"
        >
          <div>target</div>
        </ContextMenu>,
      );
      const menu = screen.getByRole('menu');
      expect(menu).toHaveAttribute('aria-label', 'Actions');
    });

    it('sets role="menuitem" and aria-disabled on items', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const disabledItem = screen.getByText('Disabled').closest('button');
      expect(disabledItem).toHaveAttribute('role', 'menuitem');
      expect(disabledItem).toHaveAttribute('aria-disabled', 'true');
    });

    it('sets role="separator" on separator items', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('uses roving tabindex (only focused item has tabindex 0)', () => {
      renderWithTheme(
        <ContextMenu items={items} isOpen position={{ x: 10, y: 10 }} onClose={() => {}}>
          <div>target</div>
        </ContextMenu>,
      );
      const menuItems = screen.getAllByRole('menuitem');
      // First enabled item (Cut) is focused on open
      const cut = screen.getByText('Cut').closest('button');
      expect(cut).toHaveAttribute('tabindex', '0');
      const others = menuItems.filter((m) => m !== cut);
      others.forEach((m) => expect(m).toHaveAttribute('tabindex', '-1'));
    });
  });
});
