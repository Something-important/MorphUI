import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Modal } from '../src/components/interactive/Modal';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Modal a11y', () => {
  it('open: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen onClose={jest.fn()} title="Confirm" description="Are you sure?">
        <p>Body content</p>
        <button>OK</button>
        <button>Cancel</button>
      </Modal>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with header and footer: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Modal
        isOpen
        onClose={jest.fn()}
        title="Settings"
        footer={
          <>
            <button>Save</button>
            <button>Discard</button>
          </>
        }
      >
        <p>Settings content</p>
      </Modal>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('closed: renders nothing (no axe violations)', async () => {
    const { container } = renderWithTheme(
      <Modal isOpen={false} onClose={jest.fn()} title="Hidden">
        <p>Not rendered</p>
      </Modal>,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Behaviors provided by useModal (adopted in this PR).
  describe('via useModal', () => {
    it('locks body scroll while open', () => {
      renderWithTheme(
        <Modal isOpen onClose={jest.fn()} title="Scroll locked">
          <p>Content</p>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('restores body scroll on close', () => {
      const original = document.body.style.overflow;
      const { rerender } = renderWithTheme(
        <Modal isOpen onClose={jest.fn()} title="Scroll">
          <p>Content</p>
        </Modal>,
      );
      expect(document.body.style.overflow).toBe('hidden');
      rerender(
        <ThemeProvider>
          <Modal isOpen={false} onClose={jest.fn()} title="Scroll">
            <p>Content</p>
          </Modal>
        </ThemeProvider>,
      );
      expect(document.body.style.overflow).toBe(original);
    });

    it('traps Tab focus within the modal (cycles last → first)', () => {
      renderWithTheme(
        <Modal isOpen onClose={jest.fn()} title="Trap" showCloseButton={false}>
          <button>First</button>
          <button>Second</button>
        </Modal>,
      );
      // With the close button hidden, the only focusable elements are the
      // two content buttons, so the trap's first/last are predictable.
      const dialog = screen.getByRole('dialog');
      const first = screen.getByText('First');
      const second = screen.getByText('Second');
      second.focus();
      expect(document.activeElement).toBe(second);
      fireEvent.keyDown(dialog, { key: 'Tab' });
      expect(document.activeElement).toBe(first);
    });

    it('closes on Escape by default', () => {
      const onClose = jest.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} title="Esc">
          <p>Content</p>
        </Modal>,
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalled();
    });

    it('does not close on Escape when closeOnEsc is false', () => {
      const onClose = jest.fn();
      renderWithTheme(
        <Modal isOpen onClose={onClose} closeOnEsc={false} title="No esc">
          <p>Content</p>
        </Modal>,
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });
});
