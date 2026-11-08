import { renderHook, act } from '@testing-library/react';
import { useAccordion } from '../src/hooks/useAccordion';

describe('useAccordion', () => {
  describe('Initial state', () => {
    it('defaults to closed', () => {
      const { result } = renderHook(() => useAccordion());
      expect(result.current.isOpen).toBe(false);
      expect(result.current.isControlled).toBe(false);
    });

    it('uses defaultOpen when provided', () => {
      const { result } = renderHook(() => useAccordion({ defaultOpen: true }));
      expect(result.current.isOpen).toBe(true);
    });

    it('uses controlled open when provided', () => {
      const { result } = renderHook(() => useAccordion({ open: true }));
      expect(result.current.isOpen).toBe(true);
      expect(result.current.isControlled).toBe(true);
    });
  });

  describe('toggle', () => {
    it('toggles from closed to open (uncontrolled)', () => {
      const { result } = renderHook(() => useAccordion());
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(true);
    });

    it('toggles from open to closed (uncontrolled)', () => {
      const { result } = renderHook(() => useAccordion({ defaultOpen: true }));
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
    });

    it('fires onToggle callback', () => {
      const onToggle = jest.fn();
      const { result } = renderHook(() => useAccordion({ onToggle }));
      act(() => result.current.toggle());
      expect(onToggle).toHaveBeenCalledWith(true);
      act(() => result.current.toggle());
      expect(onToggle).toHaveBeenCalledWith(false);
    });

    it('fires onOpen callback when opening', () => {
      const onOpen = jest.fn();
      const { result } = renderHook(() => useAccordion({ onOpen }));
      act(() => result.current.toggle());
      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('fires onClose callback when closing', () => {
      const onClose = jest.fn();
      const { result } = renderHook(() => useAccordion({ defaultOpen: true, onClose }));
      act(() => result.current.toggle());
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not fire onOpen when closing', () => {
      const onOpen = jest.fn();
      const { result } = renderHook(() => useAccordion({ defaultOpen: true, onOpen }));
      act(() => result.current.toggle()); // close
      expect(onOpen).not.toHaveBeenCalled();
    });

    it('does not toggle when disabled', () => {
      const onToggle = jest.fn();
      const { result } = renderHook(() => useAccordion({ disabled: true, onToggle }));
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('does not toggle when loading', () => {
      const onToggle = jest.fn();
      const { result } = renderHook(() => useAccordion({ loading: true, onToggle }));
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('works in controlled mode (calls callbacks but does not change internal state)', () => {
      const onToggle = jest.fn();
      const { result } = renderHook(() => useAccordion({ open: false, onToggle }));
      act(() => result.current.toggle());
      expect(onToggle).toHaveBeenCalledWith(true);
      // In controlled mode, the parent must update the value
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('openAccordion / closeAccordion', () => {
    it('opens when closed', () => {
      const { result } = renderHook(() => useAccordion());
      act(() => result.current.openAccordion());
      expect(result.current.isOpen).toBe(true);
    });

    it('does nothing when already open', () => {
      const onToggle = jest.fn();
      const { result } = renderHook(() => useAccordion({ defaultOpen: true, onToggle }));
      act(() => result.current.openAccordion());
      expect(result.current.isOpen).toBe(true);
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('closes when open', () => {
      const { result } = renderHook(() => useAccordion({ defaultOpen: true }));
      act(() => result.current.closeAccordion());
      expect(result.current.isOpen).toBe(false);
    });

    it('does nothing when already closed', () => {
      const onToggle = jest.fn();
      const { result } = renderHook(() => useAccordion({ onToggle }));
      act(() => result.current.closeAccordion());
      expect(result.current.isOpen).toBe(false);
      expect(onToggle).not.toHaveBeenCalled();
    });

    it('respects disabled state', () => {
      const { result } = renderHook(() => useAccordion({ disabled: true }));
      act(() => result.current.openAccordion());
      expect(result.current.isOpen).toBe(false);
    });
  });
});
