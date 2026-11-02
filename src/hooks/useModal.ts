import { useCallback, useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { trapFocus } from '../utils';

export interface UseModalOptions {
  /** Initial open state in uncontrolled mode. Default: false. */
  defaultOpen?: boolean;
  /** Controlled open state. When provided, the hook does not manage state. */
  isOpen?: boolean;
  /** Called when the modal requests to close (ESC, focus loss). */
  onClose?: () => void;
  /** Close on Escape. Default: true. */
  closeOnEsc?: boolean;
  /** Close when focus leaves the modal element. Default: false. */
  closeOnFocusLoss?: boolean;
  /** Trap Tab focus within the modal while open. Default: true. */
  trapFocus?: boolean;
  /** Lock body scroll (overflow: hidden) while open. Default: true. */
  lockScroll?: boolean;
}

export interface UseModalResult {
  /** Whether the modal is open (controlled value or internal state). */
  isOpen: boolean;
  /** Open the modal (uncontrolled mode only). */
  open: () => void;
  /** Request to close — calls `onClose` and (in uncontrolled mode) closes. */
  close: () => void;
  /** Toggle the open state (uncontrolled mode only). */
  toggle: () => void;
  /** Ref to attach to the modal dialog element (focus trap + focus loss target). */
  modalRef: RefObject<HTMLDivElement | null>;
}

/**
 * Headless modal behavior: open/close state, Escape-to-close, Tab focus
 * trapping, optional focus-loss close, and body scroll lock. Attach
 * `modalRef` to the dialog element and render conditionally on `isOpen`.
 *
 * Controlled:
 *   const { isOpen, close, modalRef } = useModal({ isOpen, onClose });
 * Uncontrolled:
 *   const { isOpen, open, close, toggle, modalRef } = useModal();
 */
export function useModal({
  defaultOpen = false,
  isOpen: controlledIsOpen,
  onClose,
  closeOnEsc = true,
  closeOnFocusLoss = false,
  trapFocus: shouldTrapFocus = true,
  lockScroll = true,
}: UseModalOptions = {}): UseModalResult {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  const modalRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const close = useCallback(() => {
    if (!isControlled) setInternalIsOpen(false);
    onClose?.();
  }, [isControlled, onClose]);

  const open = useCallback(() => {
    if (!isControlled) setInternalIsOpen(true);
  }, [isControlled]);

  const toggle = useCallback(() => {
    if (!isControlled) setInternalIsOpen((prev) => !prev);
  }, [isControlled]);

  // Escape to close.
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, close]);

  // Focus loss → close.
  useEffect(() => {
    if (!isOpen || !closeOnFocusLoss) return;
    const handleFocusOut = (e: FocusEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.relatedTarget as Node)) {
        close();
      }
    };
    document.addEventListener('focusout', handleFocusOut);
    return () => document.removeEventListener('focusout', handleFocusOut);
  }, [isOpen, closeOnFocusLoss, close]);

  // Focus trap + initial focus.
  useEffect(() => {
    if (!isOpen || !shouldTrapFocus) return;
    const modal = modalRef.current;
    if (!modal) return;
    const cleanup = trapFocus(modal, close);
    return cleanup;
  }, [isOpen, shouldTrapFocus, close]);

  // Body scroll lock.
  useEffect(() => {
    if (!isOpen || !lockScroll) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen, lockScroll]);

  return { isOpen, open, close, toggle, modalRef };
}
