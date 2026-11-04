import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
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

// Open the Popover and let the useAnchoredPosition setTimeout(10ms) fire
// within act's scope. Without this, the positioning measurement fires
// after the test's act scope ends, producing an act() warning.
const openAndSettle = async () => {
  open();
  await act(async () => {
    await new Promise((r) => setTimeout(r, 20));
  });
};

describe('Popover a11y', () => {
  it('closed: no axe violations', async () => {
    const { container } = renderPopover();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open (string content): no axe violations', async () => {
    const { container } = renderPopover();
    await openAndSettle();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with structured content (header/body/footer/actions): no axe violations', async () => {
    const { container } = renderPopover({ content: structured });
    await openAndSettle();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with arrow: no axe violations', async () => {
    const { container } = renderPopover({ arrow: true });
    await openAndSettle();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('hover trigger (open): no axe violations', async () => {
    const { container } = renderPopover({ trigger: 'hover' });
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('focus trigger (open): no axe violations', async () => {
    const { container } = renderPopover({ trigger: 'focus' });
    fireEvent.focus(screen.getByText('Trigger'));
    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with ariaLabel: no axe violations', async () => {
    const { container } = renderPopover({ ariaLabel: 'Details' });
    await openAndSettle();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('each position (top/bottom/left/right): no axe violations', async () => {
    for (const position of ['top', 'bottom', 'left', 'right'] as const) {
      const { container, unmount } = renderPopover({ position });
      await openAndSettle();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
      unmount();
    }
  });

  it('open with min/max width and height styling: no axe violations', async () => {
    const { container } = renderPopover({ minWidth: 200, maxWidth: 400, minHeight: 100 });
    await openAndSettle();
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
    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
