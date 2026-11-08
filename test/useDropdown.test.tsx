import { renderHook, act } from '@testing-library/react';
import { useDropdown } from '../src/hooks/useDropdown';

const mockOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date', disabled: true },
];

describe('useDropdown', () => {
  describe('Initial state', () => {
    it('starts closed with no selection', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions }));
      expect(result.current.isOpen).toBe(false);
      expect(result.current.focusedIndex).toBe(-1);
      expect(result.current.search).toBe('');
      expect(result.current.currentValue).toBeUndefined();
    });

    it('uses defaultValue (uncontrolled)', () => {
      const { result } = renderHook(() =>
        useDropdown({ options: mockOptions, defaultValue: 'apple' }),
      );
      expect(result.current.currentValue).toBe('apple');
    });

    it('uses value (controlled)', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions, value: 'banana' }));
      expect(result.current.currentValue).toBe('banana');
      expect(result.current.isControlled).toBe(true);
    });
  });

  describe('Open/close', () => {
    it('opens the dropdown', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions }));
      act(() => result.current.setOpen(true));
      expect(result.current.isOpen).toBe(true);
    });

    it('toggles open/closed', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions }));
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(true);
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
    });

    it('resets focus and search on close', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions }));
      act(() => {
        result.current.setOpen(true);
        result.current.setFocusedIndex(2);
        result.current.setSearch('app');
      });
      expect(result.current.focusedIndex).toBe(2);
      expect(result.current.search).toBe('app');
      act(() => result.current.setOpen(false));
      expect(result.current.focusedIndex).toBe(-1);
      expect(result.current.search).toBe('');
    });

    it('fires onOpenChange callback', () => {
      const onOpenChange = jest.fn();
      const { result } = renderHook(() => useDropdown({ options: mockOptions, onOpenChange }));
      act(() => result.current.setOpen(true));
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Selection (single-select)', () => {
    it('selects an option (uncontrolled)', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useDropdown({ options: mockOptions, onChange }));
      act(() => result.current.selectOption('apple'));
      expect(result.current.currentValue).toBe('apple');
      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('closes the dropdown on selection (single-select)', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions }));
      act(() => {
        result.current.setOpen(true);
        result.current.selectOption('apple');
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('does not select disabled options', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useDropdown({ options: mockOptions, onChange }));
      act(() => result.current.selectOption('date'));
      expect(result.current.currentValue).toBeUndefined();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('isSelected returns true for selected value', () => {
      const { result } = renderHook(() =>
        useDropdown({ options: mockOptions, defaultValue: 'apple' }),
      );
      expect(result.current.isSelected('apple')).toBe(true);
      expect(result.current.isSelected('banana')).toBe(false);
    });
  });

  describe('Selection (multi-select)', () => {
    it('adds to selection array', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useDropdown({ options: mockOptions, multiSelect: true, onChange }),
      );
      act(() => result.current.selectOption('apple'));
      act(() => result.current.selectOption('banana'));
      expect(result.current.currentValue).toEqual(['apple', 'banana']);
    });

    it('removes from selection when toggled', () => {
      const { result } = renderHook(() =>
        useDropdown({
          options: mockOptions,
          multiSelect: true,
          defaultValue: ['apple', 'banana'],
        }),
      );
      act(() => result.current.selectOption('apple'));
      expect(result.current.currentValue).toEqual(['banana']);
    });

    it('does not close on selection (multi-select)', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions, multiSelect: true }));
      act(() => {
        result.current.setOpen(true);
        result.current.selectOption('apple');
      });
      expect(result.current.isOpen).toBe(true);
    });

    it('respects maxSelections', () => {
      const { result } = renderHook(() =>
        useDropdown({ options: mockOptions, multiSelect: true, maxSelections: 2 }),
      );
      act(() => result.current.selectOption('apple'));
      act(() => result.current.selectOption('banana'));
      act(() => result.current.selectOption('cherry'));
      expect(result.current.currentValue).toEqual(['apple', 'banana']);
    });

    it('selectAll selects all filtered options', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions, multiSelect: true }));
      act(() => result.current.selectAll());
      expect(result.current.currentValue).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    it('clearAll empties the selection', () => {
      const { result } = renderHook(() =>
        useDropdown({
          options: mockOptions,
          multiSelect: true,
          defaultValue: ['apple', 'banana'],
        }),
      );
      act(() => result.current.clearAll());
      expect(result.current.currentValue).toEqual([]);
    });
  });

  describe('Search/filter', () => {
    it('filters options by search term', () => {
      const { result } = renderHook(() => useDropdown({ options: mockOptions }));
      act(() => result.current.setSearch('an'));
      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0].label).toBe('Banana');
    });

    it('fires onSearch callback', () => {
      const onSearch = jest.fn();
      const { result } = renderHook(() => useDropdown({ options: mockOptions, onSearch }));
      act(() => result.current.setSearch('app'));
      expect(onSearch).toHaveBeenCalledWith('app');
    });
  });

  describe('selectedLabels', () => {
    it('returns placeholder when no selection', () => {
      const { result } = renderHook(() =>
        useDropdown({ options: mockOptions, placeholder: 'Choose...' }),
      );
      expect(result.current.selectedLabels).toBe('Choose...');
    });

    it('returns selected label (single-select)', () => {
      const { result } = renderHook(() =>
        useDropdown({ options: mockOptions, defaultValue: 'apple' }),
      );
      expect(result.current.selectedLabels).toBe('Apple');
    });

    it('returns comma-separated labels (multi-select)', () => {
      const { result } = renderHook(() =>
        useDropdown({
          options: mockOptions,
          multiSelect: true,
          defaultValue: ['apple', 'banana'],
        }),
      );
      expect(result.current.selectedLabels).toBe('Apple, Banana');
    });
  });

  describe('Option groups', () => {
    it('flattens option groups into processedOptions', () => {
      const { result } = renderHook(() =>
        useDropdown({
          optionGroups: [
            { label: 'Fruits', value: 'fruits', options: mockOptions.slice(0, 2) },
            { label: 'More', value: 'more', options: mockOptions.slice(2) },
          ],
        }),
      );
      expect(result.current.processedOptions).toHaveLength(4);
      expect(result.current.processedOptions[0].label).toBe('Apple');
    });
  });
});
