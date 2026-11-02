import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useModal } from '../src/hooks';

const Harness = ({
  defaultOpen = false,
  ...options
}: React.ComponentProps<typeof Inner> & { defaultOpen?: boolean }) => {
  const modal = useModal({ defaultOpen, ...options });
  return <Inner {...modal} />;
};

const Inner = ({ isOpen, open, close, toggle, modalRef }: ReturnType<typeof useModal>) => (
  <>
    <button onClick={open}>Open</button>
    <button onClick={toggle}>Toggle</button>
    <button onClick={close}>Close</button>
    {isOpen && (
      <div ref={modalRef} data-testid="modal" role="dialog">
        <button>First</button>
        <button>Second</button>
      </div>
    )}
  </>
);

describe('useModal', () => {
  describe('uncontrolled state', () => {
    it('starts closed by default', () => {
      render(<Harness />);
      expect(screen.queryByTestId('modal')).toBeNull();
    });

    it('starts open with defaultOpen', () => {
      render(<Harness defaultOpen />);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('open() opens the modal', () => {
      render(<Harness />);
      fireEvent.click(screen.getByText('Open'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('close() closes the modal and calls onClose', () => {
      const onClose = jest.fn();
      render(<Harness onClose={onClose} defaultOpen />);
      fireEvent.click(screen.getByText('Close'));
      expect(screen.queryByTestId('modal')).toBeNull();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('toggle() flips the state', () => {
      render(<Harness />);
      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Toggle'));
      expect(screen.queryByTestId('modal')).toBeNull();
    });
  });

  describe('controlled mode', () => {
    it('reflects the controlled isOpen value', () => {
      const { rerender } = render(<Harness isOpen />);
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      rerender(<Harness isOpen={false} />);
      expect(screen.queryByTestId('modal')).toBeNull();
    });

    it('close() calls onClose without touching internal state', () => {
      const onClose = jest.fn();
      const { rerender } = render(<Harness isOpen onClose={onClose} />);
      fireEvent.click(screen.getByText('Close'));
      // Still open — controlled mode doesn't close internally.
      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(1);
      rerender(<Harness isOpen={false} onClose={onClose} />);
      expect(screen.queryByTestId('modal')).toBeNull();
    });
  });

  describe('Escape to close', () => {
    it('closes on Escape by default', () => {
      render(<Harness defaultOpen />);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.queryByTestId('modal')).toBeNull();
    });

    it('does not close on Escape when closeOnEsc is false', () => {
      render(<Harness defaultOpen closeOnEsc={false} />);
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });
  });

  describe('focus trap', () => {
    it('traps Tab focus within the modal (cycles from last to first)', () => {
      render(<Harness defaultOpen />);
      const [first, second] = screen
        .getAllByRole('button')
        .filter((b) => b.textContent === 'First' || b.textContent === 'Second');
      // Move focus to the last element, then Tab should wrap to the first.
      second.focus();
      expect(document.activeElement).toBe(second);
      fireEvent.keyDown(screen.getByTestId('modal'), { key: 'Tab' });
      expect(document.activeElement).toBe(first);
    });

    it('can be disabled', () => {
      render(<Harness defaultOpen trapFocus={false} />);
      // Without the trap, Tab on the last element does not wrap.
      const second = screen.getByText('Second');
      second.focus();
      fireEvent.keyDown(screen.getByTestId('modal'), { key: 'Tab' });
      // focus would move to the next focusable element in the document,
      // not back to 'First'.
      expect(document.activeElement).not.toBe(screen.getByText('First'));
    });
  });

  describe('body scroll lock', () => {
    it('locks body overflow while open and restores on close', () => {
      const original = document.body.style.overflow;
      const { rerender } = render(<Harness isOpen />);
      expect(document.body.style.overflow).toBe('hidden');
      rerender(<Harness isOpen={false} />);
      expect(document.body.style.overflow).toBe(original);
    });

    it('can be disabled', () => {
      render(<Harness isOpen lockScroll={false} />);
      expect(document.body.style.overflow).not.toBe('hidden');
    });
  });

  describe('focus loss close', () => {
    it('closes when focus leaves the modal', () => {
      const onClose = jest.fn();
      render(<Harness isOpen onClose={onClose} closeOnFocusLoss />);
      const modal = screen.getByTestId('modal');
      // Simulate focus moving outside the modal.
      fireEvent.focusIn(modal); // focus enters
      const outside = document.body;
      fireEvent.focusOut(document, { relatedTarget: outside });
      expect(onClose).toHaveBeenCalled();
    });
  });

  describe('public exports', () => {
    it('useAnchoredPosition and useModal are exported from the package root', async () => {
      const mod = await import('../src/components');
      expect(typeof mod.useAnchoredPosition).toBe('function');
      expect(typeof mod.useModal).toBe('function');
      expect(typeof mod.computeAnchoredPosition).toBe('function');
      expect(typeof mod.clampToViewport).toBe('function');
    });
  });
});
