import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Popover } from '../src/components/composition/Popover/Popover';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { PopoverProps, PopoverPosition } from '../src/components/composition/Popover/Popover';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

// Helper to render Popover with a default trigger button and string content
const renderPopover = (props: Partial<PopoverProps> = {}, children: React.ReactNode = 'Trigger') =>
  renderWithTheme(
    <Popover content="Popover content" {...props}>
      <button>{children}</button>
    </Popover>,
  );

describe('Popover Component', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('renders the trigger children', () => {
      renderPopover();
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('renders children inside the trigger wrapper', () => {
      const { container } = renderPopover();
      const trigger = container.querySelector('.popover-component__trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent('Trigger');
    });

    it('applies the popover-component class to the root', () => {
      const { container } = renderPopover();
      expect(container.querySelector('.popover-component')).toBeInTheDocument();
    });

    it('does not render popover content when closed (default click trigger)', () => {
      const { container } = renderPopover();
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
    });

    it('renders popover content when isOpen is true (controlled)', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
      expect(screen.getByText('Popover content')).toBeInTheDocument();
    });

    it('applies the open class when isOpen is true', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      expect(container.querySelector('.popover-component--open')).toBeInTheDocument();
    });

    it('renders an arrow by default when open', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      expect(container.querySelector('.popover-component__arrow')).toBeInTheDocument();
      expect(container.querySelector('.popover-component--with-arrow')).toBeInTheDocument();
    });

    it('does not render arrow when arrow is false', () => {
      const { container } = renderPopover({ isOpen: true, arrow: false, autoPosition: false });
      expect(container.querySelector('.popover-component__arrow')).not.toBeInTheDocument();
      expect(container.querySelector('.popover-component--with-arrow')).not.toBeInTheDocument();
    });
  });

  // Triggers
  describe('Triggers', () => {
    describe('click trigger (default)', () => {
      it('opens on click and closes on second click', () => {
        const { container } = renderPopover({ trigger: 'click' });
        const trigger = container.querySelector('.popover-component__trigger')!;
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
        fireEvent.click(trigger);
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
        fireEvent.click(trigger);
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      });

      it('opens on click via userEvent', async () => {
        const user = userEvent.setup();
        const { container } = renderPopover({ trigger: 'click' });
        await user.click(screen.getByText('Trigger'));
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
      });

      it('sets role="button" and tabIndex=0 for click trigger', () => {
        const { container } = renderPopover({ trigger: 'click' });
        const trigger = container.querySelector('.popover-component__trigger')!;
        expect(trigger).toHaveAttribute('role', 'button');
        expect(trigger).toHaveAttribute('tabindex', '0');
      });
    });

    describe('hover trigger', () => {
      it('opens immediately on mouse enter (no open delay)', () => {
        jest.useFakeTimers();
        const { container } = renderPopover({
          trigger: 'hover',
          delay: 100,
          autoPosition: false,
        });
        const trigger = container.querySelector('.popover-component__trigger')!;
        fireEvent.mouseEnter(trigger);
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
        jest.useRealTimers();
      });

      it('closes after delay on mouse leave', () => {
        jest.useFakeTimers();
        const { container } = renderPopover({
          trigger: 'hover',
          delay: 100,
          autoPosition: false,
        });
        const trigger = container.querySelector('.popover-component__trigger')!;
        fireEvent.mouseEnter(trigger);
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
        fireEvent.mouseLeave(trigger);
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
        jest.useRealTimers();
      });

      it('cancels the pending hide when re-entering before the delay elapses', () => {
        jest.useFakeTimers();
        const { container } = renderPopover({
          trigger: 'hover',
          delay: 100,
          autoPosition: false,
        });
        const trigger = container.querySelector('.popover-component__trigger')!;
        fireEvent.mouseEnter(trigger);
        fireEvent.mouseLeave(trigger);
        fireEvent.mouseEnter(trigger);
        act(() => {
          jest.advanceTimersByTime(150);
        });
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
        jest.useRealTimers();
      });

      it('does not set role or tabIndex for hover trigger', () => {
        const { container } = renderPopover({ trigger: 'hover' });
        const trigger = container.querySelector('.popover-component__trigger')!;
        expect(trigger).not.toHaveAttribute('role');
        expect(trigger).not.toHaveAttribute('tabindex');
      });
    });

    describe('focus trigger', () => {
      it('opens on focus', () => {
        jest.useFakeTimers();
        const { container } = renderPopover({
          trigger: 'focus',
          delay: 100,
          autoPosition: false,
        });
        const trigger = container.querySelector('.popover-component__trigger')!;
        fireEvent.focus(trigger);
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
        jest.useRealTimers();
      });

      it('closes after delay on blur', () => {
        jest.useFakeTimers();
        const { container } = renderPopover({
          trigger: 'focus',
          delay: 100,
          autoPosition: false,
        });
        const trigger = container.querySelector('.popover-component__trigger')!;
        fireEvent.focus(trigger);
        fireEvent.blur(trigger);
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
        jest.useRealTimers();
      });

      it('sets role="button" and tabIndex=0 for focus trigger', () => {
        const { container } = renderPopover({ trigger: 'focus' });
        const trigger = container.querySelector('.popover-component__trigger')!;
        expect(trigger).toHaveAttribute('role', 'button');
        expect(trigger).toHaveAttribute('tabindex', '0');
      });
    });

    describe('manual trigger', () => {
      it('does not open on click', () => {
        const { container } = renderPopover({ trigger: 'manual' });
        fireEvent.click(container.querySelector('.popover-component__trigger')!);
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      });

      it('does not open on hover', () => {
        const { container } = renderPopover({ trigger: 'manual' });
        fireEvent.mouseEnter(container.querySelector('.popover-component__trigger')!);
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      });

      it('does not open on focus', () => {
        const { container } = renderPopover({ trigger: 'manual' });
        fireEvent.focus(container.querySelector('.popover-component__trigger')!);
        expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      });

      it('does not set role or tabIndex for manual trigger', () => {
        const { container } = renderPopover({ trigger: 'manual' });
        const trigger = container.querySelector('.popover-component__trigger')!;
        expect(trigger).not.toHaveAttribute('role');
        expect(trigger).not.toHaveAttribute('tabindex');
      });

      it('shows content when isOpen is true (controlled)', () => {
        const { container } = renderPopover({
          trigger: 'manual',
          isOpen: true,
          autoPosition: false,
        });
        expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
      });
    });
  });

  // Positions
  describe('Positions', () => {
    const positions: PopoverPosition[] = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    positions.forEach((position) => {
      it(`applies ${position} position class to root, content, and arrow`, () => {
        const { container } = renderPopover({ isOpen: true, position, autoPosition: false });
        expect(container.querySelector(`.popover-component--${position}`)).toBeInTheDocument();
        expect(
          container.querySelector(`.popover-component__content--${position}`),
        ).toBeInTheDocument();
        expect(
          container.querySelector(`.popover-component__arrow--${position}`),
        ).toBeInTheDocument();
      });
    });

    it('uses auto position by default', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      expect(container.querySelector('.popover-component--auto')).toBeInTheDocument();
    });
  });

  // Controlled vs Uncontrolled
  describe('Controlled vs Uncontrolled', () => {
    it('respects isOpen prop in controlled mode', () => {
      const { container, rerender } = renderPopover({ isOpen: false, autoPosition: false });
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      rerender(
        <ThemeProvider>
          <Popover content="Popover content" isOpen={true} autoPosition={false}>
            <button>Trigger</button>
          </Popover>
        </ThemeProvider>,
      );
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
    });

    it('stays closed in controlled mode even when clicked (caller must update isOpen)', () => {
      const { container } = renderPopover({ isOpen: false, trigger: 'click' });
      fireEvent.click(container.querySelector('.popover-component__trigger')!);
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
    });

    it('calls onOpenChange(true) when clicked while closed (controlled)', () => {
      const onOpenChange = jest.fn();
      const { container } = renderPopover({ isOpen: false, onOpenChange, trigger: 'click' });
      fireEvent.click(container.querySelector('.popover-component__trigger')!);
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });

    it('calls onOpenChange(false) when clicked while open (controlled)', () => {
      const onOpenChange = jest.fn();
      const { container } = renderPopover({
        isOpen: true,
        onOpenChange,
        trigger: 'click',
        autoPosition: false,
      });
      fireEvent.click(container.querySelector('.popover-component__trigger')!);
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });

    it('manages internal state and calls onOpenChange in uncontrolled mode', () => {
      const onOpenChange = jest.fn();
      const { container } = renderPopover({ trigger: 'click', onOpenChange });
      const trigger = container.querySelector('.popover-component__trigger')!;
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      fireEvent.click(trigger);
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
      expect(onOpenChange).toHaveBeenCalledWith(true);
      fireEvent.click(trigger);
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  // Close on Click Outside
  describe('Close on Click Outside', () => {
    it('closes when clicking outside (mousedown on document.body)', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnClickOutside: true });
      const trigger = container.querySelector('.popover-component__trigger')!;
      fireEvent.click(trigger);
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
      fireEvent.mouseDown(document.body);
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
    });

    it('does not close when clicking inside the popover content', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnClickOutside: true });
      fireEvent.click(container.querySelector('.popover-component__trigger')!);
      const content = container.querySelector('.popover-component__content')!;
      fireEvent.mouseDown(content);
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
    });

    it('does not close on mousedown within the trigger', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnClickOutside: true });
      const trigger = container.querySelector('.popover-component__trigger')!;
      fireEvent.click(trigger);
      fireEvent.mouseDown(trigger);
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
    });

    it('does not close when closeOnClickOutside is false', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnClickOutside: false });
      fireEvent.click(container.querySelector('.popover-component__trigger')!);
      fireEvent.mouseDown(document.body);
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
    });
  });

  // Close on Escape
  describe('Close on Escape', () => {
    it('closes on Escape when closeOnEscape is true (uncontrolled)', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnEscape: true });
      const trigger = container.querySelector('.popover-component__trigger')!;
      fireEvent.click(trigger);
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(container.querySelector('.popover-component__content')).not.toBeInTheDocument();
    });

    it('does not close on Escape when closeOnEscape is false', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnEscape: false });
      const trigger = container.querySelector('.popover-component__trigger')!;
      fireEvent.click(trigger);
      fireEvent.keyDown(trigger, { key: 'Escape' });
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
    });

    it('does not close on non-Escape keys', () => {
      const { container } = renderPopover({ trigger: 'click', closeOnEscape: true });
      const trigger = container.querySelector('.popover-component__trigger')!;
      fireEvent.click(trigger);
      fireEvent.keyDown(trigger, { key: 'Enter' });
      expect(container.querySelector('.popover-component__content')).toBeInTheDocument();
    });

    it('calls onOpenChange(false) on Escape in controlled mode', () => {
      const onOpenChange = jest.fn();
      const { container } = renderPopover({
        isOpen: true,
        onOpenChange,
        closeOnEscape: true,
        autoPosition: false,
      });
      fireEvent.keyDown(container.querySelector('.popover-component__trigger')!, {
        key: 'Escape',
      });
      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('renders content with role="dialog" when open', () => {
      renderPopover({ isOpen: true, autoPosition: false });
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('sets aria-modal="true" on the content', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      expect(container.querySelector('[role="dialog"]')).toHaveAttribute('aria-modal', 'true');
    });

    it('sets aria-label="Popover" by default on content', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      expect(container.querySelector('[role="dialog"]')).toHaveAttribute('aria-label', 'Popover');
    });

    it('uses custom ariaLabel on content', () => {
      const { container } = renderPopover({
        isOpen: true,
        ariaLabel: 'Settings',
        autoPosition: false,
      });
      expect(container.querySelector('[role="dialog"]')).toHaveAttribute('aria-label', 'Settings');
    });

    it('sets aria-label on the root by default', () => {
      const { container } = renderPopover();
      expect(container.querySelector('.popover-component')).toHaveAttribute(
        'aria-label',
        'Popover',
      );
    });

    it('sets aria-describedby when provided', () => {
      const { container } = renderPopover({
        isOpen: true,
        ariaDescribedBy: 'desc-id',
        autoPosition: false,
      });
      expect(container.querySelector('[role="dialog"]')).toHaveAttribute(
        'aria-describedby',
        'desc-id',
      );
    });

    it('sets id on the content when provided', () => {
      const { container } = renderPopover({ isOpen: true, id: 'my-popover', autoPosition: false });
      expect(container.querySelector('[role="dialog"]')).toHaveAttribute('id', 'my-popover');
    });

    it('does not set aria-haspopup or aria-expanded (not implemented on the component)', () => {
      const { container } = renderPopover({ isOpen: true, autoPosition: false });
      const root = container.querySelector('.popover-component')!;
      expect(root).not.toHaveAttribute('aria-haspopup');
      expect(root).not.toHaveAttribute('aria-expanded');
    });
  });

  // Styling
  describe('Styling', () => {
    it('applies default variant and size classes to root', () => {
      const { container } = renderPopover();
      const root = container.querySelector('.popover-component')!;
      expect(root).toHaveClass('popover-component--primary', 'popover-component--md');
    });

    it('applies custom className to root', () => {
      const { container } = renderPopover({ className: 'my-popover' });
      expect(container.querySelector('.popover-component')).toHaveClass('my-popover');
    });

    it('merges custom style prop onto root', () => {
      const { container } = renderPopover({ style: { zIndex: 9999 } });
      expect(container.querySelector('.popover-component')).toHaveStyle({ zIndex: 9999 });
    });

    it('applies custom contentClassName to content', () => {
      const { container } = renderPopover({
        isOpen: true,
        contentClassName: 'my-content',
        autoPosition: false,
      });
      expect(container.querySelector('.popover-component__content')).toHaveClass('my-content');
    });

    it('applies custom contentStyle to content', () => {
      const { container } = renderPopover({
        isOpen: true,
        contentStyle: { padding: '20px' },
        autoPosition: false,
      });
      expect(container.querySelector('.popover-component__content')).toHaveStyle({
        padding: '20px',
      });
    });

    it('applies custom color via CSS variable', () => {
      const { container } = renderPopover({ color: '#ff0000' });
      expect(container.querySelector('.popover-component')).toHaveStyle({
        '--popover-custom-bg': '#ff0000',
      });
    });

    it('applies gradient classes when gradient includes "gradient"', () => {
      const { container } = renderPopover({ gradient: 'linear-gradient(to right, red, blue)' });
      expect(
        container.querySelector('.popover-component--background-gradient'),
      ).toBeInTheDocument();
    });

    it('applies glassmorphism class when enabled', () => {
      const { container } = renderPopover({ glassmorphism: true });
      expect(container.querySelector('.popover-component--glassmorphism')).toBeInTheDocument();
    });
  });

  // Content Structure
  describe('Content Structure', () => {
    it('renders string content inside the body', () => {
      renderPopover({ isOpen: true, content: 'Hello World', autoPosition: false });
      const body = screen.getByText('Hello World').closest('.popover-component__body');
      expect(body).toBeInTheDocument();
    });

    it('renders structured content with header, body, and footer', () => {
      const { container } = renderPopover({
        isOpen: true,
        autoPosition: false,
        content: { header: 'My Header', body: 'My Body', footer: 'My Footer' },
      });
      expect(screen.getByText('My Header')).toBeInTheDocument();
      expect(screen.getByText('My Body')).toBeInTheDocument();
      expect(screen.getByText('My Footer')).toBeInTheDocument();
      expect(container.querySelector('.popover-component__header')).toBeInTheDocument();
      expect(container.querySelector('.popover-component__body')).toBeInTheDocument();
      expect(container.querySelector('.popover-component__footer')).toBeInTheDocument();
    });

    it('renders actions as buttons and calls onClick', () => {
      const onClick = jest.fn();
      const { container } = renderPopover({
        isOpen: true,
        autoPosition: false,
        content: { body: 'Body', actions: [{ label: 'Confirm', onClick }] },
      });
      const actionBtn = screen.getByText('Confirm').closest('button');
      expect(actionBtn).toBeInTheDocument();
      expect(actionBtn).toHaveClass('popover-component__action');
      expect(container.querySelector('.popover-component__actions')).toBeInTheDocument();
      fireEvent.click(actionBtn!);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('renders actions as links when href is provided', () => {
      renderPopover({
        isOpen: true,
        autoPosition: false,
        content: { body: 'Body', actions: [{ label: 'Learn more', href: '/docs' }] },
      });
      const link = screen.getByText('Learn more').closest('a');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/docs');
    });

    it('renders ReactNode content directly inside the body', () => {
      renderPopover({
        isOpen: true,
        autoPosition: false,
        content: <div data-testid="custom-content">Custom</div>,
      });
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
    });
  });

  // Disabled State
  describe('Disabled State', () => {
    it('has no built-in disabled prop; forwards aria-disabled (rest props) to the root', () => {
      const { container } = renderWithTheme(
        <Popover content="Popover content" aria-disabled="true">
          <button>Trigger</button>
        </Popover>,
      );
      expect(container.querySelector('.popover-component')).toHaveAttribute(
        'aria-disabled',
        'true',
      );
    });

    it('renders when the child trigger element is disabled', () => {
      renderWithTheme(
        <Popover content="Popover content" trigger="click">
          <button disabled>Disabled Trigger</button>
        </Popover>,
      );
      expect(screen.getByText('Disabled Trigger')).toBeInTheDocument();
      expect(screen.getByText('Disabled Trigger').closest('button')).toBeDisabled();
    });
  });
});
