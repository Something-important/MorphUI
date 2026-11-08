import { useState, useRef, useMemo, useCallback, useEffect, useDeferredValue, useId } from 'react';

/**
 * Re-export ComboboxOption so consumers of the hook don't need to import
 * from the component file.
 */
export interface ComboboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

const defaultFilter = (option: ComboboxOption, inputValue: string): boolean => {
  if (!inputValue) return true;
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

export interface UseComboboxOptions {
  /** Options for the listbox. */
  options: ComboboxOption[];
  /** Controlled selected value. */
  value?: string | number | null;
  /** Uncontrolled initial selected value. */
  defaultValue?: string | number | null;
  /** Called when the user selects an option (or clears). */
  onChange?: (value: string | number | null) => void;
  /** Called when the input text changes (useful for async loading). */
  onInputChange?: (inputValue: string) => void;
  /** Custom filter; default is case-insensitive substring match on label. */
  filterOption?: (option: ComboboxOption, inputValue: string) => boolean;
  /** Async option loader. When provided, the combobox calls it on input change. */
  loadOptions?: (inputValue: string) => Promise<ComboboxOption[]>;
  /** Allow submitting a free-text value not present in options. */
  allowFreeText?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Clearable. */
  clearable?: boolean;
}

export interface UseComboboxResult {
  /** Currently selected value (controlled or internal). */
  selectedValue: string | number | null;
  /** The currently selected option object (or null). */
  selectedOption: ComboboxOption | null;
  /** Current input text. */
  inputValue: string;
  /** Whether the listbox is open. */
  isOpen: boolean;
  /** Index of the highlighted (keyboard-active) option. */
  highlightedIndex: number;
  /** Filtered options (after applying filterOption or async load). */
  filteredOptions: ComboboxOption[];
  /** Whether async options are loading. */
  isLoading: boolean;
  /** Whether filtering is deferred (input is ahead of the filtered list). */
  isFiltering: boolean;
  /** Auto-generated unique id for ARIA relationships. */
  listboxId: string;
  /** Generate an option id for aria-activedescendant. */
  optionId: (index: number) => string;
  /** Ref to attach to the input element. */
  inputRef: React.RefObject<HTMLInputElement | null>;
  /** Ref to attach to the listbox element. */
  listboxRef: React.RefObject<HTMLDivElement | null>;
  /** Set input text. */
  setInputValue: (value: string) => void;
  /** Open the listbox. */
  open: () => void;
  /** Close the listbox. */
  close: () => void;
  /** Toggle the listbox open/closed. */
  toggle: () => void;
  /** Commit a selection (selects an option, closes the listbox, focuses input). */
  commitSelection: (option: ComboboxOption) => void;
  /** Clear the selection and input. */
  clear: () => void;
  /** Highlight a specific index. */
  setHighlightedIndex: (index: number) => void;
  /** Handle keyboard events (ArrowDown/Up, Enter, Escape, Tab, Home, End). */
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  /** Handle input change events. */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Headless combobox behavior: filtering, keyboard navigation, selection,
 * async loading, open/close state, and outside-click handling. Attach
 * `inputRef` and `listboxRef` to the DOM elements, wire `handleKeyDown`
 * to the input, and call `commitSelection` on option click.
 *
 * The component handles rendering; this hook handles all the behavior.
 *
 * @example
 * const {
 *   isOpen, inputValue, filteredOptions, highlightedIndex,
 *   handleKeyDown, handleInputChange, commitSelection, inputRef, listboxRef,
 * } = useCombobox({ options, onChange });
 */
export function useCombobox({
  options,
  value: controlledValue,
  defaultValue = null,
  onChange,
  onInputChange,
  filterOption = defaultFilter,
  loadOptions,
  allowFreeText = false,
  disabled = false,
  clearable = false,
}: UseComboboxOptions): UseComboboxResult {
  const autoId = useId();
  const listboxId = `${autoId}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxRef = useRef<HTMLDivElement>(null);

  const [internalValue, setInternalValue] = useState<string | number | null>(defaultValue);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [asyncOptions, setAsyncOptions] = useState<ComboboxOption[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const isControlled = controlledValue !== undefined;
  const selectedValue = isControlled ? controlledValue : internalValue;

  // The effective options: async (if loading) or the static options filtered.
  const sourceOptions = asyncOptions ?? options;
  const deferredInput = useDeferredValue(inputValue);
  const isFiltering = deferredInput !== inputValue;
  const filteredOptions = useMemo(() => {
    if (loadOptions) return sourceOptions;
    return sourceOptions.filter((opt) => filterOption(opt, deferredInput));
  }, [sourceOptions, loadOptions, deferredInput, filterOption]);

  const selectedOption = options.find((opt) => opt.value === selectedValue) ?? null;

  // Reset highlight when the list opens or the filtered set changes.
  useEffect(() => {
    if (isOpen) {
      setHighlightedIndex(filteredOptions.length > 0 ? 0 : -1);
    }
  }, [isOpen, filteredOptions]);

  // Async loader.
  useEffect(() => {
    if (!loadOptions || !isOpen) return;
    let cancelled = false;
    setIsLoading(true);
    loadOptions(inputValue)
      .then((result) => {
        if (!cancelled) {
          setAsyncOptions(result);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [loadOptions, isOpen, inputValue]);

  // Close on outside click.
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (listboxRef.current?.contains(target)) return;
      if (inputRef.current?.contains(target)) return;
      setIsOpen(false);
    };
    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  const commitSelection = useCallback(
    (option: ComboboxOption) => {
      if (option.disabled) return;
      if (!isControlled) setInternalValue(option.value);
      setInputValue(option.label);
      onChange?.(option.value);
      setIsOpen(false);
      inputRef.current?.focus();
    },
    [isControlled, onChange],
  );

  const clear = useCallback(() => {
    if (!isControlled) setInternalValue(null);
    setInputValue('');
    onChange?.(null);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  }, [isControlled, onChange]);

  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  }, [disabled]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setInputValue(next);
      onInputChange?.(next);
      if (!isOpen) setIsOpen(true);
    },
    [isOpen, onInputChange],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            open();
          } else if (filteredOptions.length > 0) {
            setHighlightedIndex((prev) => (prev === -1 ? 0 : (prev + 1) % filteredOptions.length));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (isOpen && filteredOptions.length > 0) {
            setHighlightedIndex((prev) => (prev <= 0 ? filteredOptions.length - 1 : prev - 1));
          }
          break;
        case 'Enter':
          if (isOpen && highlightedIndex >= 0) {
            e.preventDefault();
            const option = filteredOptions[highlightedIndex];
            if (option) commitSelection(option);
          } else if (isOpen && allowFreeText && inputValue) {
            e.preventDefault();
            if (!isControlled) setInternalValue(inputValue as string | number);
            onChange?.(inputValue as string | number);
            setIsOpen(false);
          }
          break;
        case 'Escape':
          if (isOpen) {
            e.preventDefault();
            setIsOpen(false);
          } else if (clearable && (inputValue || selectedValue != null)) {
            e.preventDefault();
            clear();
          }
          break;
        case 'Tab':
          if (isOpen) setIsOpen(false);
          break;
        case 'Home':
          if (isOpen && filteredOptions.length > 0) {
            e.preventDefault();
            setHighlightedIndex(0);
          }
          break;
        case 'End':
          if (isOpen && filteredOptions.length > 0) {
            e.preventDefault();
            setHighlightedIndex(filteredOptions.length - 1);
          }
          break;
      }
    },
    [
      disabled,
      isOpen,
      filteredOptions,
      highlightedIndex,
      allowFreeText,
      inputValue,
      isControlled,
      clearable,
      selectedValue,
      open,
      commitSelection,
      clear,
      onChange,
    ],
  );

  const optionId = useCallback((index: number) => `${autoId}-option-${index}`, [autoId]);

  return {
    selectedValue,
    selectedOption,
    inputValue,
    isOpen,
    highlightedIndex,
    filteredOptions,
    isLoading,
    isFiltering,
    listboxId,
    optionId,
    inputRef,
    listboxRef,
    setInputValue,
    open,
    close,
    toggle,
    commitSelection,
    clear,
    setHighlightedIndex,
    handleKeyDown,
    handleInputChange,
  };
}
