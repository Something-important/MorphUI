import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Sidebar } from '../src/components/composition/Sidebar/SidebarUnified';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { SidebarItem } from '../src/components/composition/Sidebar/SidebarUnified';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const flat: SidebarItem[] = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'products', label: 'Products', icon: '📦', badge: 3 },
  { id: 'settings', label: 'Settings', icon: '⚙️' },
];

const nested: SidebarItem[] = [
  {
    id: 'files',
    label: 'Files',
    icon: '📁',
    children: [
      { id: 'docs', label: 'Documents' },
      { id: 'images', label: 'Images' },
    ],
  },
  { id: 'home', label: 'Home' },
  { id: 'disabled', label: 'Disabled', disabled: true },
  { id: 'link', label: 'External', href: 'https://example.com', target: '_blank' },
];

describe('Sidebar a11y', () => {
  it('flat items: no axe violations', async () => {
    const { container } = renderWithTheme(<Sidebar items={flat} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('collapsed: no axe violations', async () => {
    const { container } = renderWithTheme(<Sidebar items={flat} defaultCollapsed />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('nested items (groups): no axe violations', async () => {
    const { container } = renderWithTheme(<Sidebar items={nested} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with header and footer content: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Sidebar items={flat} headerContent={<div>Brand</div>} footerContent={<div>© 2026</div>} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('overlay mode: no axe violations', async () => {
    const { container } = renderWithTheme(<Sidebar items={flat} overlay />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('disabled item: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Sidebar items={[{ id: 'a', label: 'A', disabled: true }]} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('link item: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Sidebar items={[{ id: 'a', label: 'A', href: 'https://example.com' }]} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('composed API (Root/Header/Content/Item/Footer): no axe violations', async () => {
    const { container } = renderWithTheme(
      <Sidebar ariaLabel="Main menu">
        <Sidebar.Header>
          <span>Brand</span>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Item id="home" label="Home" />
          <Sidebar.Item id="about" label="About" />
        </Sidebar.Content>
        <Sidebar.Footer>
          <span>Footer</span>
        </Sidebar.Footer>
      </Sidebar>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('composed API with Group, Section, Separator: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Group id="grp" title="Group One">
            <Sidebar.Item id="a" label="Item A" />
            <Sidebar.Item id="b" label="Item B" />
          </Sidebar.Group>
          <Sidebar.Separator />
          <Sidebar.Section title="Section">
            <Sidebar.Item id="c" label="Item C" />
          </Sidebar.Section>
        </Sidebar.Content>
      </Sidebar>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('RTL: no axe violations', async () => {
    const { container } = renderWithTheme(
      <div dir="rtl">
        <Sidebar items={flat} position="right" />
      </div>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // axe does not flag dangling aria-controls / aria-labelledby references in
  // jsdom, so guard the SidebarGroup relationships explicitly — in both the
  // collapsed and expanded states.
  describe('SidebarGroup aria relationships (beyond axe)', () => {
    it('collapsed: aria-controls resolves and aria-expanded is false', () => {
      const { container } = renderWithTheme(
        <Sidebar
          items={[{ id: 'files', label: 'Files', children: [{ id: 'docs', label: 'Docs' }] }]}
        />,
      );
      const toggle = container.querySelector('.sidebar-group__toggle') as HTMLElement;
      const controlledId = toggle.getAttribute('aria-controls');
      expect(controlledId).toBe('files-content');
      // The controlled region is always mounted (hidden when collapsed) so
      // the reference resolves for AT that jump to it.
      expect(container.querySelector(`#${CSS.escape(controlledId!)}`)).not.toBeNull();
      expect(toggle.getAttribute('aria-expanded')).toBe('false');
      expect(container.querySelector('#files-content')?.hasAttribute('hidden')).toBe(true);
    });

    it('expanded: aria-labelledby resolves to the title element', () => {
      const { container } = renderWithTheme(
        <Sidebar
          items={[{ id: 'files', label: 'Files', children: [{ id: 'docs', label: 'Docs' }] }]}
          defaultExpandedGroups={['files']}
        />,
      );
      const content = container.querySelector('#files-content') as HTMLElement;
      expect(content.hasAttribute('hidden')).toBe(false);
      const labelledBy = content.getAttribute('aria-labelledby');
      expect(labelledBy).toBe('files-title');
      // The labelledby target exists and contains the group title.
      const title = container.querySelector(`#${CSS.escape(labelledBy!)}`);
      expect(title).not.toBeNull();
      expect(title?.textContent).toBe('Files');
    });

    it('expanded: no axe violations', async () => {
      const { container } = renderWithTheme(
        <Sidebar
          items={[
            {
              id: 'files',
              label: 'Files',
              children: [
                { id: 'docs', label: 'Documents' },
                { id: 'images', label: 'Images' },
              ],
            },
          ]}
          defaultExpandedGroups={['files']}
        />,
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
