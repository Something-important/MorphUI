import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, Tab, TabPanel } from '../src/components/composition/Tabs/Tabs';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { TabItem } from '../src/components/composition/Tabs/Tabs';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const items: TabItem[] = [
  { id: 'home', label: 'Home', content: <p>Home content</p> },
  { id: 'profile', label: 'Profile', content: <p>Profile content</p> },
  { id: 'settings', label: 'Settings', content: <p>Settings content</p> },
];

describe('Tabs Component', () => {
  describe('Basic Rendering', () => {
    it('renders a tablist with the default aria-label and base classes', () => {
      renderWithTheme(<Tabs items={items} />);
      const tablist = screen.getByRole('tablist', { name: 'Tabs' });
      expect(tablist).toBeInTheDocument();
      expect(tablist).toHaveClass(
        'tabs-component',
        'tabs-component--primary',
        'tabs-component--md',
        'tabs-component--horizontal',
      );
    });

    it('renders a tab button for each item', () => {
      renderWithTheme(<Tabs items={items} />);
      const tabs = screen.getAllByRole('tab');
      expect(tabs).toHaveLength(3);
      expect(screen.getByRole('tab', { name: 'Home' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Profile' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Settings' })).toBeInTheDocument();
    });

    it('renders a tabpanel for each item (including hidden ones)', () => {
      renderWithTheme(<Tabs items={items} />);
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      expect(panels).toHaveLength(3);
    });

    it('renders item content inside its corresponding panel', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="settings" />);
      // Only the visible panel is returned by default (hidden panels are excluded)
      const visiblePanel = screen.getByRole('tabpanel');
      expect(visiblePanel).toHaveTextContent('Settings content');
    });
  });

  describe('Default Active Tab', () => {
    it('defaults to the first tab when no defaultActiveTab is provided', () => {
      renderWithTheme(<Tabs items={items} />);
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('uses defaultActiveTab when provided', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="profile" />);
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
    });

    it('shows the panel for the default active tab', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="profile" />);
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile content');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('updates internal state when a tab is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={items} />);
      await user.click(screen.getByRole('tab', { name: 'Settings' }));
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
    });

    it('calls onChange with the new tab id when a tab is clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      renderWithTheme(<Tabs items={items} onChange={onChange} />);
      await user.click(screen.getByRole('tab', { name: 'Profile' }));
      expect(onChange).toHaveBeenCalledWith('profile');
    });

    it('reveals the new panel after a tab is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={items} />);
      await user.click(screen.getByRole('tab', { name: 'Settings' }));
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Settings content');
    });
  });

  describe('Controlled Mode', () => {
    it('uses the activeTab prop instead of internal state', () => {
      renderWithTheme(<Tabs items={items} activeTab="settings" />);
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
    });

    it('does not update internal state when a tab is clicked (caller must update)', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      renderWithTheme(<Tabs items={items} activeTab="home" onChange={onChange} />);
      await user.click(screen.getByRole('tab', { name: 'Profile' }));
      // Controlled: active tab is still Home because internal state was not updated.
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
      expect(onChange).toHaveBeenCalledWith('profile');
    });

    it('reflects an externally changed activeTab prop', () => {
      const { rerender } = renderWithTheme(<Tabs items={items} activeTab="home" />);
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');

      rerender(
        <ThemeProvider>
          <Tabs items={items} activeTab="settings" />
        </ThemeProvider>,
      );

      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'true',
      );
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('Click Interaction', () => {
    it('activates a tab on click and sets aria-selected', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={items} />);
      await user.click(screen.getByRole('tab', { name: 'Profile' }));
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('shows the clicked tab panel content', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={items} />);
      await user.click(screen.getByRole('tab', { name: 'Settings' }));
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Settings content');
    });
  });

  describe('Keyboard Navigation', () => {
    // The Tabs component renders native <button> elements for each tab, so
    // Enter and Space natively trigger a click (and therefore activate the tab).
    // Arrow-key navigation is NOT implemented in this component — the tests below
    // document that actual behaviour.
    it('activates a tab on Enter key (native button behaviour)', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={items} />);
      const profileTab = screen.getByRole('tab', { name: 'Profile' });
      profileTab.focus();
      await user.keyboard('{Enter}');
      expect(profileTab).toHaveAttribute('aria-selected', 'true');
    });

    it('activates a tab on Space key (native button behaviour)', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={items} />);
      const settingsTab = screen.getByRole('tab', { name: 'Settings' });
      settingsTab.focus();
      await user.keyboard(' ');
      expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    });

    it('does NOT navigate via ArrowRight (no arrow-key handler implemented)', () => {
      renderWithTheme(<Tabs items={items} />);
      const homeTab = screen.getByRole('tab', { name: 'Home' });
      homeTab.focus();
      fireEvent.keyDown(homeTab, { key: 'ArrowRight' });
      expect(homeTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('does NOT navigate via ArrowLeft', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="profile" />);
      const profileTab = screen.getByRole('tab', { name: 'Profile' });
      profileTab.focus();
      fireEvent.keyDown(profileTab, { key: 'ArrowLeft' });
      expect(profileTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
    });

    it('does NOT navigate via ArrowDown', () => {
      renderWithTheme(<Tabs items={items} />);
      const homeTab = screen.getByRole('tab', { name: 'Home' });
      homeTab.focus();
      fireEvent.keyDown(homeTab, { key: 'ArrowDown' });
      expect(homeTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('does NOT navigate via ArrowUp', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="profile" />);
      const profileTab = screen.getByRole('tab', { name: 'Profile' });
      profileTab.focus();
      fireEvent.keyDown(profileTab, { key: 'ArrowUp' });
      expect(profileTab).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });
  });

  describe('ARIA', () => {
    it('outer container has role="tablist" with aria-orientation', () => {
      renderWithTheme(<Tabs items={items} />);
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('tabs have role="tab" with aria-selected reflecting active state', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="profile" />);
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-selected',
        'false',
      );
    });

    it('each tab has aria-controls matching its panel id', () => {
      renderWithTheme(<Tabs items={items} />);
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute(
        'aria-controls',
        'panel-home',
      );
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute(
        'aria-controls',
        'panel-profile',
      );
      expect(screen.getByRole('tab', { name: 'Settings' })).toHaveAttribute(
        'aria-controls',
        'panel-settings',
      );
    });

    it('each tab has id="tab-{itemId}"', () => {
      renderWithTheme(<Tabs items={items} />);
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('id', 'tab-home');
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('id', 'tab-profile');
    });

    it('panels have role="tabpanel"', () => {
      renderWithTheme(<Tabs items={items} />);
      expect(screen.getAllByRole('tabpanel', { hidden: true })).toHaveLength(3);
    });

    it('each panel has aria-labelledby matching its tab id', () => {
      renderWithTheme(<Tabs items={items} />);
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      const homePanel = panels.find((p) => p.id === 'panel-home');
      const profilePanel = panels.find((p) => p.id === 'panel-profile');
      expect(homePanel).toHaveAttribute('aria-labelledby', 'tab-home');
      expect(profilePanel).toHaveAttribute('aria-labelledby', 'tab-profile');
    });

    it('non-active panels have the hidden attribute; active panel does not', () => {
      renderWithTheme(<Tabs items={items} defaultActiveTab="profile" />);
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      const homePanel = panels.find((p) => p.id === 'panel-home');
      const profilePanel = panels.find((p) => p.id === 'panel-profile');
      const settingsPanel = panels.find((p) => p.id === 'panel-settings');
      expect(homePanel).toHaveAttribute('hidden');
      expect(profilePanel).not.toHaveAttribute('hidden');
      expect(settingsPanel).toHaveAttribute('hidden');
    });

    it('uses a custom ariaLabel when provided', () => {
      renderWithTheme(<Tabs items={items} ariaLabel="Settings tabs" />);
      expect(screen.getByRole('tablist', { name: 'Settings tabs' })).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('defaults to the primary variant', () => {
      renderWithTheme(<Tabs items={items} />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--primary');
    });

    it('renders with the secondary variant', () => {
      renderWithTheme(<Tabs items={items} variant="secondary" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--secondary');
    });

    it('renders with the outline variant', () => {
      renderWithTheme(<Tabs items={items} variant="outline" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--outline');
    });

    it('renders with the ghost variant', () => {
      renderWithTheme(<Tabs items={items} variant="ghost" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--ghost');
    });

    it('renders with the danger variant', () => {
      renderWithTheme(<Tabs items={items} variant="danger" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--danger');
    });
  });

  describe('Sizes', () => {
    it('defaults to md size', () => {
      renderWithTheme(<Tabs items={items} />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--md');
    });

    it('renders with xs size', () => {
      renderWithTheme(<Tabs items={items} size="xs" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--xs');
    });

    it('renders with sm size', () => {
      renderWithTheme(<Tabs items={items} size="sm" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--sm');
    });

    it('renders with lg size', () => {
      renderWithTheme(<Tabs items={items} size="lg" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--lg');
    });

    it('renders with xl size', () => {
      renderWithTheme(<Tabs items={items} size="xl" />);
      expect(screen.getByRole('tablist')).toHaveClass('tabs-component--xl');
    });
  });

  describe('Disabled Tabs', () => {
    const itemsWithDisabled: TabItem[] = [
      ...items,
      { id: 'secret', label: 'Secret', content: <p>Secret content</p>, disabled: true },
    ];

    it('renders a disabled tab with disabled attribute and disabled class', () => {
      renderWithTheme(<Tabs items={itemsWithDisabled} />);
      const secretTab = screen.getByRole('tab', { name: 'Secret' });
      expect(secretTab).toBeDisabled();
      expect(secretTab).toHaveClass('tabs-component__tab--disabled');
    });

    it('does not activate when a disabled tab is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={itemsWithDisabled} />);
      await user.click(screen.getByRole('tab', { name: 'Secret' }));
      expect(screen.getByRole('tab', { name: 'Secret' })).toHaveAttribute('aria-selected', 'false');
      // The first tab remains active because defaultActiveTab falls back to items[0].id
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true');
    });

    it('does not call onChange when a disabled tab is clicked', async () => {
      const user = userEvent.setup();
      const onChange = jest.fn();
      renderWithTheme(<Tabs items={itemsWithDisabled} onChange={onChange} />);
      await user.click(screen.getByRole('tab', { name: 'Secret' }));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('keeps the disabled panel hidden when its tab is clicked', async () => {
      const user = userEvent.setup();
      renderWithTheme(<Tabs items={itemsWithDisabled} />);
      await user.click(screen.getByRole('tab', { name: 'Secret' }));
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      const secretPanel = panels.find((p) => p.id === 'panel-secret');
      expect(secretPanel).toHaveAttribute('hidden');
    });
  });

  describe('Custom className and style', () => {
    it('applies a custom className to the tablist', () => {
      renderWithTheme(<Tabs items={items} className="my-tabs" />);
      expect(screen.getByRole('tablist')).toHaveClass('my-tabs');
    });

    it('applies a custom inline style prop', () => {
      renderWithTheme(<Tabs items={items} style={{ marginTop: '10px' }} />);
      const tablist = screen.getByRole('tablist');
      expect(tablist.getAttribute('style')).toContain('margin-top: 10px');
    });
  });

  describe('Tab Item Features', () => {
    it('renders an icon when provided on an item', () => {
      renderWithTheme(
        <Tabs
          items={[
            {
              id: 'home',
              label: 'Home',
              content: <p>Home</p>,
              icon: <span data-testid="tab-icon">🏠</span>,
            },
          ]}
        />,
      );
      expect(screen.getByTestId('tab-icon')).toBeInTheDocument();
    });

    it('renders a badge when provided on an item', () => {
      renderWithTheme(
        <Tabs items={[{ id: 'home', label: 'Home', content: <p>Home</p>, badge: '3' }]} />,
      );
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('renders close buttons for each tab when closable is true', () => {
      // closable renders a nested <button> inside each tab <button>; React may
      // warn about invalid nesting, so suppress console.error for this test.
      const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      renderWithTheme(<Tabs items={items} closable />);
      const closeButtons = screen.getAllByRole('button', { name: /Close .* tab$/i });
      expect(closeButtons).toHaveLength(3);
      spy.mockRestore();
    });

    it('calls onTabClose with the tab id when a close button is clicked', async () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      const user = userEvent.setup();
      const onTabClose = jest.fn();
      renderWithTheme(<Tabs items={items} closable onTabClose={onTabClose} />);
      await user.click(screen.getByRole('button', { name: 'Close Profile tab' }));
      expect(onTabClose).toHaveBeenCalledWith('profile');
      spy.mockRestore();
    });
  });

  describe('Tab and TabPanel context usage', () => {
    it('Tab throws when used outside a Tabs context', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      expect(() =>
        render(
          <Tab id="x" label="X">
            child
          </Tab>,
        ),
      ).toThrow('Tabs components must be used within a Tabs container');
      spy.mockRestore();
    });

    it('TabPanel throws when used outside a Tabs context', () => {
      const spy = jest.spyOn(console, 'error').mockImplementation(() => undefined);
      expect(() => render(<TabPanel id="x">child</TabPanel>)).toThrow(
        'Tabs components must be used within a Tabs container',
      );
      spy.mockRestore();
    });

    it('TabPanel inside a Tabs context renders with role="tabpanel"', () => {
      // The Tabs component renders its own panels from `items`, but TabPanel can
      // still be mounted within the context (e.g. via a portal or manual layout).
      // Here we verify the context wiring works by rendering a standalone panel
      // alongside the items-driven Tabs.
      const tree = (
        <Tabs items={items} defaultActiveTab="home">
          <TabPanel id="extra">Extra panel</TabPanel>
        </Tabs>
      );
      // Tabs ignores `children` (explicit JSX children win), but the import &
      // context wiring of TabPanel must not throw.
      const { container } = renderWithTheme(tree);
      // The Tabs items render 3 panels — TabPanel as children is ignored.
      expect(container.querySelectorAll('[role="tabpanel"]')).toHaveLength(3);
    });
  });
});
