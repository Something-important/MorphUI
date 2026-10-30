import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from '../src/components/composition/Sidebar/SidebarUnified';
import { Sidebar as SidebarLegacy } from '../src/components/composition/Sidebar/Sidebar';
import type { SidebarItem } from '../src/components/composition/Sidebar/SidebarUnified';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const items: SidebarItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'products', label: 'Products' },
  { id: 'settings', label: 'Settings' },
];

const nestedItems: SidebarItem[] = [
  {
    id: 'files',
    label: 'Files',
    children: [
      { id: 'docs', label: 'Documents' },
      { id: 'images', label: 'Images' },
    ],
  },
  { id: 'home', label: 'Home' },
];

describe('Sidebar Component', () => {
  describe('Rendering', () => {
    it('renders all item labels', () => {
      renderWithTheme(<Sidebar items={items} />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Products')).toBeInTheDocument();
      expect(screen.getByText('Settings')).toBeInTheDocument();
    });

    it('renders a navigation landmark with the default aria-label', () => {
      renderWithTheme(<Sidebar items={items} />);
      const nav = screen.getByRole('navigation', { name: 'Sidebar navigation' });
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveClass('sidebar-root');
    });

    it('renders a navigation landmark with a custom aria-label', () => {
      renderWithTheme(<Sidebar items={items} ariaLabel="Main menu" />);
      expect(screen.getByRole('navigation', { name: 'Main menu' })).toBeInTheDocument();
    });

    it('applies a custom className to the root container', () => {
      renderWithTheme(<Sidebar items={items} className="my-sidebar" />);
      expect(screen.getByRole('navigation')).toHaveClass('my-sidebar');
    });
  });

  describe('Active Item (uncontrolled)', () => {
    it('marks defaultActiveItem as active on initial render', () => {
      renderWithTheme(<Sidebar items={items} defaultActiveItem="products" />);
      expect(screen.getByText('Products').closest('.sidebar-item')).toHaveClass(
        'sidebar-item--active',
      );
      expect(screen.getByText('Home').closest('.sidebar-item')).not.toHaveClass(
        'sidebar-item--active',
      );
    });

    it('marks no item active when defaultActiveItem is not provided', () => {
      const { container } = renderWithTheme(<Sidebar items={items} />);
      expect(container.querySelector('.sidebar-item--active')).toBeNull();
    });

    it('activates an item when clicked (uncontrolled state update)', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Sidebar items={items} />);
      expect(screen.getByText('Products').closest('.sidebar-item')).not.toHaveClass(
        'sidebar-item--active',
      );
      await user.click(screen.getByText('Products'));
      expect(screen.getByText('Products').closest('.sidebar-item')).toHaveClass(
        'sidebar-item--active',
      );
      expect(screen.getByText('Home').closest('.sidebar-item')).not.toHaveClass(
        'sidebar-item--active',
      );
    });

    it('calls onChange with the new active item id when an item is clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      renderWithTheme(<Sidebar items={items} onChange={onChange} />);
      await user.click(screen.getByText('Settings'));
      expect(onChange).toHaveBeenCalledWith('settings');
    });
  });

  describe('Controlled active item (legacy API)', () => {
    it('uses the activeItem prop as the active item', () => {
      renderWithTheme(<SidebarLegacy items={items} activeItem="products" onChange={() => {}} />);
      expect(screen.getByText('Products').closest('.sidebar-component__item')).toHaveClass(
        'sidebar-component__item--active',
      );
      expect(screen.getByText('Home').closest('.sidebar-component__item')).not.toHaveClass(
        'sidebar-component__item--active',
      );
    });

    it('does not mutate internal state when controlled (only notifies via onChange)', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      renderWithTheme(<SidebarLegacy items={items} activeItem="home" onChange={onChange} />);
      // Initial active is 'home' (controlled)
      expect(screen.getByText('Home').closest('.sidebar-component__item')).toHaveClass(
        'sidebar-component__item--active',
      );
      await user.click(screen.getByText('Products'));
      // Parent was notified
      expect(onChange).toHaveBeenCalledWith('products');
      // But internal state is unchanged because activeItem is controlled
      expect(screen.getByText('Home').closest('.sidebar-component__item')).toHaveClass(
        'sidebar-component__item--active',
      );
      expect(screen.getByText('Products').closest('.sidebar-component__item')).not.toHaveClass(
        'sidebar-component__item--active',
      );
    });
  });

  describe('Nested Items', () => {
    it('renders a parent group and hides its children by default', () => {
      renderWithTheme(<Sidebar items={nestedItems} />);
      expect(screen.getByText('Files')).toBeInTheDocument();
      expect(screen.queryByText('Documents')).not.toBeInTheDocument();
      expect(screen.queryByText('Images')).not.toBeInTheDocument();
    });

    it('expands nested children when the group toggle is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Sidebar items={nestedItems} />);
      const groupToggle = screen.getByText('Files').closest('button');
      expect(groupToggle).toHaveAttribute('aria-expanded', 'false');
      await user.click(screen.getByText('Files'));
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Images')).toBeInTheDocument();
      expect(screen.getByText('Files').closest('button')).toHaveAttribute('aria-expanded', 'true');
    });

    it('collapses nested children when the group toggle is clicked again', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Sidebar items={nestedItems} />);
      await user.click(screen.getByText('Files'));
      expect(screen.getByText('Documents')).toBeInTheDocument();
      await user.click(screen.getByText('Files'));
      expect(screen.queryByText('Documents')).not.toBeInTheDocument();
      expect(screen.queryByText('Images')).not.toBeInTheDocument();
    });

    it('renders expanded groups when defaultExpandedGroups is provided', () => {
      renderWithTheme(<Sidebar items={nestedItems} defaultExpandedGroups={['files']} />);
      expect(screen.getByText('Documents')).toBeInTheDocument();
      expect(screen.getByText('Images')).toBeInTheDocument();
    });

    it('activates a nested child when clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Sidebar items={nestedItems} />);
      await user.click(screen.getByText('Files'));
      await user.click(screen.getByText('Documents'));
      expect(screen.getByText('Documents').closest('.sidebar-item')).toHaveClass(
        'sidebar-item--active',
      );
    });
  });

  describe('Collapsible Sidebar', () => {
    it('renders a collapse toggle by default', () => {
      renderWithTheme(<Sidebar items={items} />);
      expect(screen.getByLabelText('Collapse sidebar')).toBeInTheDocument();
    });

    it('collapses the sidebar when the toggle is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Sidebar items={items} />);
      const root = screen.getByRole('navigation');
      expect(root).not.toHaveClass('sidebar-root--collapsed');
      await user.click(screen.getByLabelText('Collapse sidebar'));
      expect(root).toHaveClass('sidebar-root--collapsed');
      expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument();
    });

    it('expands the sidebar when the toggle is clicked again', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Sidebar items={items} />);
      await user.click(screen.getByLabelText('Collapse sidebar'));
      expect(screen.getByRole('navigation')).toHaveClass('sidebar-root--collapsed');
      await user.click(screen.getByLabelText('Expand sidebar'));
      expect(screen.getByRole('navigation')).not.toHaveClass('sidebar-root--collapsed');
    });

    it('calls onCollapseChange when the toggle is clicked', async () => {
      const user = userEvent.setup();
      const onCollapseChange = jest.fn();
      renderWithTheme(<Sidebar items={items} onCollapseChange={onCollapseChange} />);
      await user.click(screen.getByLabelText('Collapse sidebar'));
      expect(onCollapseChange).toHaveBeenCalledWith(true);
      await user.click(screen.getByLabelText('Expand sidebar'));
      expect(onCollapseChange).toHaveBeenCalledWith(false);
    });

    it('starts collapsed when defaultCollapsed is true', () => {
      renderWithTheme(<Sidebar items={items} defaultCollapsed />);
      expect(screen.getByRole('navigation')).toHaveClass('sidebar-root--collapsed');
      expect(screen.getByLabelText('Expand sidebar')).toBeInTheDocument();
    });

    it('hides the collapse toggle when collapsible is false', () => {
      renderWithTheme(<Sidebar items={items} collapsible={false} />);
      expect(screen.queryByLabelText('Collapse sidebar')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Expand sidebar')).not.toBeInTheDocument();
    });
  });

  describe('Overlay Mode', () => {
    it('renders a backdrop in overlay mode when not collapsed', () => {
      const { container } = renderWithTheme(<Sidebar items={items} overlay />);
      expect(container.querySelector('.sidebar-root__backdrop')).toBeInTheDocument();
    });

    it('does not render a backdrop when overlay is false', () => {
      const { container } = renderWithTheme(<Sidebar items={items} />);
      expect(container.querySelector('.sidebar-root__backdrop')).not.toBeInTheDocument();
    });

    it('does not render a backdrop when backdrop is disabled', () => {
      const { container } = renderWithTheme(<Sidebar items={items} overlay backdrop={false} />);
      expect(container.querySelector('.sidebar-root__backdrop')).not.toBeInTheDocument();
    });

    it('collapses the sidebar when the backdrop is clicked', async () => {
      const user = userEvent.setup();
      const onCollapseChange = jest.fn();
      const { container } = renderWithTheme(
        <Sidebar items={items} overlay onCollapseChange={onCollapseChange} />,
      );
      const root = screen.getByRole('navigation');
      expect(root).not.toHaveClass('sidebar-root--collapsed');
      const backdrop = container.querySelector('.sidebar-root__backdrop');
      expect(backdrop).not.toBeNull();
      await user.click(backdrop as HTMLElement);
      expect(onCollapseChange).toHaveBeenCalledWith(true);
      expect(root).toHaveClass('sidebar-root--collapsed');
    });
  });

  describe('Item Features', () => {
    it('does not activate when a disabled item is clicked', async () => {
      const user = userEvent.setup();
      const disabledItems: SidebarItem[] = [
        { id: 'home', label: 'Home' },
        { id: 'locked', label: 'Locked', disabled: true },
      ];
      renderWithTheme(<Sidebar items={disabledItems} />);
      await user.click(screen.getByText('Locked'));
      expect(screen.getByText('Locked').closest('.sidebar-item')).not.toHaveClass(
        'sidebar-item--active',
      );
    });

    it('calls item-level onClick when an item is clicked', async () => {
      const user = userEvent.setup();
      const itemOnClick = jest.fn();
      renderWithTheme(<Sidebar items={[{ id: 'home', label: 'Home', onClick: itemOnClick }]} />);
      await user.click(screen.getByText('Home'));
      expect(itemOnClick).toHaveBeenCalledWith('home');
    });

    it('renders badges for items that have them', () => {
      renderWithTheme(<Sidebar items={[{ id: 'home', label: 'Home', badge: 'New' }]} />);
      expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('renders icons for items that have them', () => {
      renderWithTheme(
        <Sidebar
          items={[{ id: 'home', label: 'Home', icon: <span data-testid="home-icon">🏠</span> }]}
        />,
      );
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });
  });
});
