import { renderHook, act } from '@testing-library/react';
import { useTabs } from '../src/hooks/useTabs';

const mockItems = [
  { id: 'tab1', label: 'Tab 1' },
  { id: 'tab2', label: 'Tab 2' },
  { id: 'tab3', label: 'Tab 3' },
  { id: 'disabled', label: 'Disabled', disabled: true },
];

describe('useTabs', () => {
  describe('Initial state', () => {
    it('defaults to the first item', () => {
      const { result } = renderHook(() => useTabs({ items: mockItems }));
      expect(result.current.activeTab).toBe('tab1');
    });

    it('uses defaultActiveTab when provided', () => {
      const { result } = renderHook(() => useTabs({ items: mockItems, defaultActiveTab: 'tab2' }));
      expect(result.current.activeTab).toBe('tab2');
    });

    it('uses controlled activeTab when provided', () => {
      const { result } = renderHook(() => useTabs({ items: mockItems, activeTab: 'tab3' }));
      expect(result.current.activeTab).toBe('tab3');
      expect(result.current.isControlled).toBe(true);
    });

    it('is uncontrolled when no activeTab prop', () => {
      const { result } = renderHook(() => useTabs({ items: mockItems }));
      expect(result.current.isControlled).toBe(false);
    });

    it('defaults to empty string for empty items', () => {
      const { result } = renderHook(() => useTabs({ items: [] }));
      expect(result.current.activeTab).toBe('');
    });
  });

  describe('setActiveTab', () => {
    it('switches to a different tab (uncontrolled)', () => {
      const { result } = renderHook(() => useTabs({ items: mockItems }));
      act(() => result.current.setActiveTab('tab2'));
      expect(result.current.activeTab).toBe('tab2');
    });

    it('fires onChange callback', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useTabs({ items: mockItems, onChange }));
      act(() => result.current.setActiveTab('tab3'));
      expect(onChange).toHaveBeenCalledWith('tab3');
    });

    it('does not switch to a disabled tab', () => {
      const { result } = renderHook(() => useTabs({ items: mockItems }));
      act(() => result.current.setActiveTab('disabled'));
      expect(result.current.activeTab).toBe('tab1');
    });

    it('works in controlled mode (calls onChange but does not update internal state)', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useTabs({ items: mockItems, activeTab: 'tab1', onChange }),
      );
      act(() => result.current.setActiveTab('tab2'));
      expect(onChange).toHaveBeenCalledWith('tab2');
      // In controlled mode, the parent must update the value — the hook
      // doesn't change its own state.
      expect(result.current.activeTab).toBe('tab1');
    });
  });

  describe('Items validation', () => {
    it('resets to first item when active tab disappears', () => {
      const { result, rerender } = renderHook(
        ({ items }) => useTabs({ items, defaultActiveTab: 'tab2' }),
        { initialProps: { items: mockItems } },
      );
      expect(result.current.activeTab).toBe('tab2');

      // Remove 'tab2' from items
      const newItems = mockItems.filter((i) => i.id !== 'tab2');
      rerender({ items: newItems });

      expect(result.current.activeTab).toBe('tab1');
    });

    it('fires onChange when resetting', () => {
      const onChange = jest.fn();
      const { rerender } = renderHook(
        ({ items }) => useTabs({ items, defaultActiveTab: 'tab2', onChange }),
        { initialProps: { items: mockItems } },
      );

      const newItems = mockItems.filter((i) => i.id !== 'tab2');
      rerender({ items: newItems });

      expect(onChange).toHaveBeenCalledWith('tab1');
    });

    it('does not reset if active tab still exists', () => {
      const { result, rerender } = renderHook(
        ({ items }) => useTabs({ items, defaultActiveTab: 'tab1' }),
        { initialProps: { items: mockItems } },
      );

      // Add a new tab but keep 'tab1'
      const newItems = [...mockItems, { id: 'tab4', label: 'Tab 4' }];
      rerender({ items: newItems });

      expect(result.current.activeTab).toBe('tab1');
    });
  });
});
