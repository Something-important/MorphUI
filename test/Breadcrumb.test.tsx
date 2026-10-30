import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Breadcrumb } from '../src/components/basic/Breadcrumb/Breadcrumb';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { BreadcrumbItem } from '../src/components/basic/Breadcrumb/Breadcrumb';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Current' },
];

describe('Breadcrumb Component', () => {
  it('renders a nav with the default aria-label', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    const nav = screen.getByRole('navigation', { name: 'Breadcrumb navigation' });
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveClass(
      'breadcrumb-component',
      'breadcrumb-component--primary',
      'breadcrumb-component--md',
    );
  });

  it('renders nothing when items is empty', () => {
    const { container } = renderWithTheme(<Breadcrumb items={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when items is undefined', () => {
    const { container } = renderWithTheme(
      <Breadcrumb items={undefined as unknown as BreadcrumbItem[]} />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders all item labels', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Current')).toBeInTheDocument();
  });

  it('marks the last item as the current page (aria-current)', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    const current = screen.getByText('Current');
    expect(current.closest('.breadcrumb-component__link--current')).toBeInTheDocument();
    expect(current.closest('[aria-current="page"]')).toBeInTheDocument();
  });

  it('renders an anchor for items with href', () => {
    renderWithTheme(<Breadcrumb items={items} />);
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).not.toHaveAttribute('aria-current');
  });

  it('renders a button for items without href', () => {
    renderWithTheme(
      <Breadcrumb items={[{ label: 'Click me', onClick: jest.fn() }, { label: 'Last' }]} />,
    );
    const btn = screen.getByText('Click me').closest('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveAttribute('type', 'button');
  });

  it('renders separators between items (not after the last)', () => {
    const { container } = renderWithTheme(<Breadcrumb items={items} />);
    const separators = container.querySelectorAll('.breadcrumb-component__separator');
    expect(separators).toHaveLength(items.length - 1);
    separators.forEach((s) => expect(s).toHaveAttribute('aria-hidden', 'true'));
    expect(separators[0]).toHaveTextContent('/');
  });

  it('renders a custom separator', () => {
    const { container } = renderWithTheme(<Breadcrumb items={items} separator=">" />);
    const separators = container.querySelectorAll('.breadcrumb-component__separator');
    expect(separators[0]).toHaveTextContent('>');
  });

  it('renders a React element separator', () => {
    const { container } = renderWithTheme(
      <Breadcrumb items={items} separator={<span data-testid="sep">→</span>} />,
    );
    expect(screen.getAllByTestId('sep')).toHaveLength(items.length - 1);
    expect(container.querySelectorAll('.breadcrumb-component__separator')).toHaveLength(
      items.length - 1,
    );
  });

  it('calls onClick and prevents default when a link item is clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderWithTheme(
      <Breadcrumb items={[{ label: 'Home', href: '/', onClick }, { label: 'Current' }]} />,
    );
    await user.click(screen.getByText('Home'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick when a button item is clicked', async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();
    renderWithTheme(<Breadcrumb items={[{ label: 'Click me', onClick }, { label: 'Current' }]} />);
    await user.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const { rerender } = renderWithTheme(<Breadcrumb items={items} variant="secondary" />);
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb-component--secondary');
    rerender(
      <ThemeProvider>
        <Breadcrumb items={items} variant="ghost" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb-component--ghost');
    rerender(
      <ThemeProvider>
        <Breadcrumb items={items} variant="outline" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb-component--outline');
  });

  it('renders with different sizes', () => {
    const { rerender } = renderWithTheme(<Breadcrumb items={items} size="xs" />);
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb-component--xs');
    rerender(
      <ThemeProvider>
        <Breadcrumb items={items} size="lg" />
      </ThemeProvider>,
    );
    expect(screen.getByRole('navigation')).toHaveClass('breadcrumb-component--lg');
  });

  it('renders a custom aria-label', () => {
    renderWithTheme(<Breadcrumb items={items} ariaLabel="Trail" />);
    expect(screen.getByRole('navigation', { name: 'Trail' })).toBeInTheDocument();
  });

  it('renders icons for items', () => {
    renderWithTheme(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/', icon: <span data-testid="icon">🏠</span> },
          { label: 'Current' },
        ]}
      />,
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('applies custom className and id', () => {
    renderWithTheme(<Breadcrumb items={items} className="my-breadcrumb" id="bc-1" />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('my-breadcrumb');
    expect(nav).toHaveAttribute('id', 'bc-1');
  });
});
