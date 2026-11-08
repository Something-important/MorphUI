import { useState, useCallback } from 'react';

export interface UseAccordionOptions {
  /** Uncontrolled initial open state. Default: false. */
  defaultOpen?: boolean;
  /** Controlled open state. When provided, the parent owns the state. */
  open?: boolean;
  /** Called every time the accordion toggles (open or close). */
  onToggle?: (isOpen: boolean) => void;
  /** Called when the accordion opens. */
  onOpen?: () => void;
  /** Called when the accordion closes. */
  onClose?: () => void;
  /** Disabled state — toggle is a no-op when true. */
  disabled?: boolean;
  /** Loading state — toggle is a no-op when true. */
  loading?: boolean;
}

export interface UseAccordionResult {
  /** Whether the accordion is currently open. */
  isOpen: boolean;
  /** Whether the accordion is in controlled mode. */
  isControlled: boolean;
  /** Toggle the open/close state. Respects disabled/loading. Calls onToggle/onOpen/onClose. */
  toggle: () => void;
  /** Explicitly open the accordion. */
  openAccordion: () => void;
  /** Explicitly close the accordion. */
  closeAccordion: () => void;
}

/**
 * Headless accordion behavior: open/close state (controlled/uncontrolled),
 * toggle with callback fan-out (onToggle/onOpen/onClose), and disabled/
 * loading guards.
 *
 * The component handles rendering, styling, animation, keyboard
 * navigation, focus management, and ripple effects; this hook handles
 * the state management.
 *
 * @example
 * const { isOpen, toggle } = useAccordion({
 *   defaultOpen: true,
 *   onToggle: (open) => console.log('Accordion', open ? 'opened' : 'closed'),
 * });
 */
export function useAccordion({
  defaultOpen = false,
  open: controlledOpen,
  onToggle,
  onOpen,
  onClose,
  disabled = false,
  loading = false,
}: UseAccordionOptions = {}): UseAccordionResult {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalIsOpen;

  const toggle = useCallback(() => {
    if (disabled || loading) return;

    const newIsOpen = !isOpen;
    if (!isControlled) {
      setInternalIsOpen(newIsOpen);
    }

    onToggle?.(newIsOpen);
    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }
  }, [disabled, loading, isOpen, isControlled, onToggle, onOpen, onClose]);

  const openAccordion = useCallback(() => {
    if (disabled || loading || isOpen) return;
    toggle();
  }, [disabled, loading, isOpen, toggle]);

  const closeAccordion = useCallback(() => {
    if (disabled || loading || !isOpen) return;
    toggle();
  }, [disabled, loading, isOpen, toggle]);

  return {
    isOpen,
    isControlled,
    toggle,
    openAccordion,
    closeAccordion,
  };
}
