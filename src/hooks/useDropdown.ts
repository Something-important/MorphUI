import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

/**
 * Re-export DropdownOption so consumers of the hook don't need to import
 * from the component file.
 */
export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
  tags?: string[];
  metadata?: Record<string, unknown>;
}

export interface DropdownOptionGroup {
  label: string;
  value: string;
  options: DropdownOption[];
  icon?: React.ReactNode;
  description?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export interface UseDropdownOptions {
  /** Options for the dropdown. */
  options?: DropdownOption[];
  /** Option groups — when provided, flattens groups into a single options array. */
  optionGroups?: DropdownOptionGroup[];
  /** Controlled selected value (single value or array for multi-select). */
  value?: string | number | Array<string | number>;
  /** Uncontrolled initial selected value. */
  defaultValue?: string | number | Array<string | number>;
  /** Called when the selection changes. */
  onChange?: (value: string | number | Array<string | number>) => void;
  /** Placeholder text when no selection. */
  placeholder?: string;
  /** Disabled state. */
  disabled?: boolean;
  /** Multi-select mode. */
  multiSelect?: boolean;
  /** Maximum number of selections (multi-select only). */
  maxSelections?: number;
  /** Searchable mode — shows a search input. */
  searchable?: boolean;
  /** Clearable — shows a clear button. */
  clearable?: boolean;
  /** Called when the dropdown opens or closes. */
  onOpenChange?: (isOpen: boolean) => void;
  /** Called when the search term changes. */
  onSearch?: (searchTerm: string) => void;
}

export interface UseDropdownResult {
  /** Whether the dropdown is open. */
  isOpen: boolean;
  /** Currently focused option index (for keyboard nav). */
  focusedIndex: number;
  /** Current search term. */
  search: string;
  /** The currently selected value (controlled or internal). */
  currentValue: string | number | Array<string | number> | undefined;
  /** Whether the component is in controlled mode. */
  isControlled: boolean;
  /** All options (flattened from groups if provided). */
  processedOptions: DropdownOption[];
  /** Filtered options (after search). */
  filteredOptions: DropdownOption[];
  /** Comma-separated labels of selected options (or placeholder). */
  selectedLabels: string;
  /** Ref to attach to the container element (for outside-click detection). */
  containerRef: React.RefObject<HTMLDivElement | null>;
  /** Ref to attach to the list element (for keyboard focus management). */
  listRef: React.RefObject<HTMLUListElement | null>;
  /** Open or close the dropdown. */
  setOpen: (open: boolean) => void;
  /** Toggle the dropdown open/closed. */
  toggle: () => void;
  /** Select an option (handles single/multiSelect, maxSelections). */
  selectOption: (value: string | number) => void;
  /** Check if a value is selected. */
  isSelected: (value: string | number) => boolean;
  /** Clear the selection. */
  clear: () => void;
  /** Clear all selections (multi-select). */
  clearAll: () => void;
  /** Select all options (multi-select). */
  selectAll: () => void;
  /** Set the search term. */
  setSearch: (searchTerm: string) => void;
  /** Set the focused index. */
  setFocusedIndex: (index: number) => void;
  /** Handle keyboard events (ArrowUp/Down, Enter, Space, Escape, Tab). */
  handleKeyDown: (e: React.KeyboardEvent) => void;
}

/**
 * Headless dropdown behavior: open/close state, selection (single and
 * multi-select), keyboard navigation, search/filtering, outside-click
 * handling, and option group flattening.
 *
 * The component handles rendering, styling, and ARIA attributes; this
 * hook handles all the behavior.
 *
 * @example
 * const {
 *   isOpen, currentValue, filteredOptions, focusedIndex,
 *   selectedLabels, handleKeyDown, selectOption, toggle, containerRef,
 * } = useDropdown({ options, onChange, multiSelect: true });
 */
export function useDropdown({
  options,
  optionGroups,
  value: controlledValue,
  defaultValue,
  onChange,
  placeholder = 'Select...',
  disabled = false,
  multiSelect = false,
  maxSelections,
  searchable: _searchable = false,
  clearable = false,
  onOpenChange,
  onSearch,
}: UseDropdownOptions): UseDropdownResult {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [search, setSearchState] = useState('');

  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<
    string | number | Array<string | number> | undefined
  >(defaultValue);
  const currentValue = isControlled ? controlledValue : internalValue;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  // Centralized update: updates internal state in uncontrolled mode and
  // notifies the parent.
  const updateValue = useCallback(
    (newValue: string | number | Array<string | number>) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange],
  );

  // Handle open state changes
  const setOpen = useCallback(
    (newOpen: boolean) => {
      setIsOpen(newOpen);
      onOpenChange?.(newOpen);
      if (!newOpen) {
        setFocusedIndex(-1);
        setSearchState('');
      }
    },
    [onOpenChange],
  );

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen, setOpen]);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setOpen]);

  // Keyboard focus management
  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const optionEls = listRef.current.querySelectorAll('.dropdown-option');
      (optionEls[focusedIndex] as HTMLElement)?.focus();
    }
  }, [focusedIndex, isOpen]);

  // Process options with groups
  const processedOptions = useMemo(() => {
    if (optionGroups && optionGroups.length > 0) {
      return optionGroups.flatMap((group) => group.options);
    }
    return options || [];
  }, [options, optionGroups]);

  const filteredOptions = useMemo(
    () =>
      search
        ? processedOptions.filter((opt) => opt.label.toLowerCase().includes(search.toLowerCase()))
        : processedOptions,
    [processedOptions, search],
  );

  const isSelected = useCallback(
    (val: string | number) => {
      if (multiSelect) {
        return Array.isArray(currentValue) && currentValue.includes(val);
      }
      return currentValue === val;
    },
    [multiSelect, currentValue],
  );

  const selectOption = useCallback(
    (val: string | number) => {
      if (disabled) return;

      // Check if the option is disabled at the option level
      const option = processedOptions.find((opt) => opt.value === val);
      if (option?.disabled) return;

      if (multiSelect) {
        const selected = Array.isArray(currentValue) ? currentValue : [];
        if (selected.includes(val)) {
          updateValue(selected.filter((v) => v !== val));
        } else if (!maxSelections || selected.length < maxSelections) {
          updateValue([...selected, val]);
        }
      } else {
        updateValue(val);
        setOpen(false);
      }
    },
    [disabled, multiSelect, currentValue, maxSelections, updateValue, setOpen, processedOptions],
  );

  const clearAll = useCallback(() => {
    if (multiSelect && !disabled) {
      updateValue([]);
    }
  }, [multiSelect, disabled, updateValue]);

  const clear = useCallback(() => {
    if (clearable && !disabled) {
      updateValue(multiSelect ? [] : '');
    }
  }, [clearable, disabled, multiSelect, updateValue]);

  const selectAll = useCallback(() => {
    if (multiSelect && !disabled) {
      const allValues = filteredOptions.map((opt) => opt.value);
      const newValues = maxSelections ? allValues.slice(0, maxSelections) : allValues;
      updateValue(newValues);
    }
  }, [multiSelect, disabled, filteredOptions, maxSelections, updateValue]);

  const setSearch = useCallback(
    (searchTerm: string) => {
      setSearchState(searchTerm);
      onSearch?.(searchTerm);
    },
    [onSearch],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (isOpen && focusedIndex >= 0) {
            selectOption(filteredOptions[focusedIndex].value);
          } else {
            toggle();
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setOpen(true);
            setFocusedIndex(0);
          } else {
            setFocusedIndex((prev) => (prev < filteredOptions.length - 1 ? prev + 1 : prev));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (!isOpen) {
            setOpen(true);
            setFocusedIndex(filteredOptions.length - 1);
          } else {
            setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;
        case 'Escape':
          e.preventDefault();
          setOpen(false);
          break;
        case 'Tab':
          if (isOpen) setOpen(false);
          break;
      }
    },
    [isOpen, focusedIndex, filteredOptions, selectOption, toggle, setOpen],
  );

  const selectedLabels = useMemo(() => {
    if (multiSelect) {
      const selected = Array.isArray(currentValue) ? currentValue : [];
      if (selected.length > 0) {
        return processedOptions
          .filter((opt) => selected.includes(opt.value))
          .map((opt) => opt.label)
          .join(', ');
      }
      return placeholder;
    } else {
      const selectedOption = processedOptions.find((opt) => opt.value === currentValue);
      return selectedOption ? selectedOption.label : placeholder;
    }
  }, [processedOptions, currentValue, placeholder, multiSelect]);

  return {
    isOpen,
    focusedIndex,
    search,
    currentValue,
    isControlled,
    processedOptions,
    filteredOptions,
    selectedLabels,
    containerRef,
    listRef,
    setOpen,
    toggle,
    selectOption,
    isSelected,
    clear,
    clearAll,
    selectAll,
    setSearch,
    setFocusedIndex,
    handleKeyDown,
  };
}
