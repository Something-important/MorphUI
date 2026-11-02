import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Popover } from '../src/components/composition/Popover/Popover';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { PopoverContent } from '../src/components/composition/Popover/Popover';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const renderPopover = (
  props: Record<string, unknown> = {},
  children: React.ReactNode = 'Trigger',
) =>
  renderWithTheme(
    <Popover content="Popover content" {...props}>
      <button>{children}</button>
    </Popover>,
  );

const structured: PopoverContent = {
  header: 'Header text',
  body: 'Body text',
  footer: 'Footer text',
  actions: [
    { label: 'Save', onClick: jest.fn() },
    { label: 'Cancel', onClick: jest.fn() },
  ],
};

const open = () => fireEvent.click(screen.getByText('Trigger'));

describe('Popover a11y', () => {
  it('closed: no axe violations', async () => {
    const { container } = renderPopover();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open (string content): no axe violations', async () => {
    const { container } = renderPopover();
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with structured content (header/body/footer/actions): no axe violations', async () => {
    const { container } = renderPopover({ content: structured });
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with arrow: no axe violations', async () => {
    const { container } = renderPopover({ arrow: true });
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('hover trigger (open): no axe violations', async () => {
    const { container } = renderPopover({ trigger: 'hover' });
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('focus trigger (open): no axe violations', async () => {
    const { container } = renderPopover({ trigger: 'focus' });
    fireEvent.focus(screen.getByText('Trigger'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with ariaLabel: no axe violations', async () => {
    const { container } = renderPopover({ ariaLabel: 'Details' });
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('each position (top/bottom/left/right): no axe violations', async () => {
    for (const position of ['top', 'bottom', 'left', 'right'] as const) {
      const { container, unmount } = renderPopover({ position });
      open();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });

  it('open with min/max width and height styling: no axe violations', async () => {
    const { container } = renderPopover({ minWidth: 200, maxWidth: 400, minHeight: 100 });
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with a custom trigger node: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Popover content="Info" trigger="click">
        <button>Open info</button>
      </Popover>,
    );
    fireEvent.click(screen.getByText('Open info'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
