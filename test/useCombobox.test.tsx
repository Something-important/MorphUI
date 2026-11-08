import { renderHook, act } from '@testing-library/react';
import { useCombobox } from '../src/hooks/useCombobox';

const mockOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date', disabled: true },
];

describe('useCombobox', () => {
  describe('Initial state', () => {
    it('returns default values', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      expect(result.current.selectedValue).toBeNull();
      expect(result.current.inputValue).toBe('');
      expect(result.current.isOpen).toBe(false);
      expect(result.current.highlightedIndex).toBe(-1);
      expect(result.current.isLoading).toBe(false);
    });

    it('initializes with defaultValue', () => {
      const { result } = renderHook(() =>
        useCombobox({ options: mockOptions, defaultValue: 'apple' }),
      );
      expect(result.current.selectedValue).toBe('apple');
      expect(result.current.selectedOption?.label).toBe('Apple');
    });

    it('uses controlled value when provided', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions, value: 'banana' }));
      expect(result.current.selectedValue).toBe('banana');
    });
  });

  describe('Filtering', () => {
    it('filters options by input value', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      act(() => {
        result.current.setInputValue('an');
      });
      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0].label).toBe('Banana');
    });

    it('returns all options when input is empty', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      expect(result.current.filteredOptions).toHaveLength(4);
    });

    it('uses custom filter function', () => {
      const customFilter = (opt: { label: string }, input: string) => opt.label.endsWith(input);
      const { result } = renderHook(() =>
        useCombobox({ options: mockOptions, filterOption: customFilter }),
      );
      act(() => {
        result.current.setInputValue('a');
      });
      // Only "Banana" ends with 'a'
      expect(result.current.filteredOptions).toHaveLength(1);
      expect(result.current.filteredOptions[0].label).toBe('Banana');
    });
  });

  describe('Open/close', () => {
    it('opens the listbox', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      act(() => result.current.open());
      expect(result.current.isOpen).toBe(true);
    });

    it('closes the listbox', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      act(() => {
        result.current.open();
        result.current.close();
      });
      expect(result.current.isOpen).toBe(false);
    });

    it('toggles the listbox', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(true);
      act(() => result.current.toggle());
      expect(result.current.isOpen).toBe(false);
    });

    it('does not open when disabled', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions, disabled: true }));
      act(() => result.current.open());
      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('Selection', () => {
    it('commits a selection', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useCombobox({ options: mockOptions, onChange }));
      act(() => {
        result.current.commitSelection(mockOptions[0]);
      });
      expect(result.current.selectedValue).toBe('apple');
      expect(result.current.inputValue).toBe('Apple');
      expect(result.current.isOpen).toBe(false);
      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('does not commit disabled options', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() => useCombobox({ options: mockOptions, onChange }));
      act(() => {
        result.current.commitSelection(mockOptions[3]); // Date (disabled)
      });
      expect(result.current.selectedValue).toBeNull();
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clears the selection', () => {
      const onChange = jest.fn();
      const { result } = renderHook(() =>
        useCombobox({ options: mockOptions, defaultValue: 'apple', onChange }),
      );
      act(() => result.current.clear());
      expect(result.current.selectedValue).toBeNull();
      expect(result.current.inputValue).toBe('');
      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Highlight', () => {
    it('resets highlight to 0 when opened', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      act(() => result.current.open());
      expect(result.current.highlightedIndex).toBe(0);
    });

    it('sets highlight to -1 when opened with no options', () => {
      const { result } = renderHook(() => useCombobox({ options: [] }));
      act(() => result.current.open());
      expect(result.current.highlightedIndex).toBe(-1);
    });

    it('manually sets highlighted index', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      act(() => {
        result.current.open();
      });
      // Wait for the highlight-reset effect to run
      act(() => {
        result.current.setHighlightedIndex(2);
      });
      // The effect from [isOpen, filteredOptions] may fire and reset to 0,
      // but after our manual set it should be 2 unless the effect re-runs
      // (it only runs when isOpen or filteredOptions changes, not on every render)
      expect(result.current.highlightedIndex).toBe(2);
    });
  });

  describe('ARIA IDs', () => {
    it('generates a listbox id', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      expect(result.current.listboxId).toBeTruthy();
      expect(result.current.listboxId).toContain('-listbox');
    });

    it('generates option ids', () => {
      const { result } = renderHook(() => useCombobox({ options: mockOptions }));
      const id = result.current.optionId(0);
      expect(id).toContain('-option-0');
    });
  });
});
