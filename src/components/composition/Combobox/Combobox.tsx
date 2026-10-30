// Combobox.tsx
import React, { forwardRef, useState, useRef, useId, useMemo, useCallback, useEffect } from 'react';
import './Combobox.css';

export interface ComboboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

export type ComboboxVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type ComboboxSize = 'sm' | 'md' | 'lg';

export interface ComboboxProps {
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
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  ariaLabel?: string;
  loadingMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  variant?: ComboboxVariant;
  size?: ComboboxSize;
  className?: string;
  style?: React.CSSProperties;
}

const defaultFilter = (option: ComboboxOption, inputValue: string): boolean => {
  if (!inputValue) return true;
  return option.label.toLowerCase().includes(inputValue.toLowerCase());
};

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = null,
      onChange,
      onInputChange,
      filterOption = defaultFilter,
      loadOptions,
      allowFreeText = false,
      placeholder = 'Search...',
      disabled = false,
      clearable = false,
      ariaLabel = 'Combobox',
      loadingMessage = 'Loading...',
      emptyMessage = 'No options',
      variant = 'primary',
      size = 'md',
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
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
    const filteredOptions = useMemo(() => {
      if (loadOptions) return sourceOptions; // async: loadOptions already filtered
      return sourceOptions.filter((opt) => filterOption(opt, inputValue));
    }, [sourceOptions, loadOptions, inputValue, filterOption]);

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

    const open = () => {
      if (disabled) return;
      setIsOpen(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = e.target.value;
      setInputValue(next);
      onInputChange?.(next);
      if (!isOpen) setIsOpen(true);
      // free-text: if the user is typing and the text doesn't match the selected option,
      // the selection is conceptually in flux; we don't clear the value unless they commit
      // a different option or clear.
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    };

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

    const optionId = (index: number) => `${autoId}-option-${index}`;

    const classes = [
      'combobox-component',
      `combobox-component--${variant}`,
      `combobox-component--${size}`,
      isOpen && 'combobox-component--open',
      disabled && 'combobox-component--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const showClear = clearable && !disabled && (inputValue || selectedValue != null);

    return (
      <div ref={ref} className={classes} style={style} {...rest}>
        <div className="combobox-component__control">
          <input
            ref={inputRef}
            type="text"
            className="combobox-component__input"
            placeholder={selectedOption && !inputValue ? selectedOption.label : placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={open}
            disabled={disabled}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={
              isOpen && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined
            }
            aria-label={ariaLabel}
            aria-busy={isLoading}
          />
          {showClear && (
            <button
              type="button"
              className="combobox-component__clear"
              onClick={clear}
              aria-label="Clear"
              tabIndex={-1}
            >
              ×
            </button>
          )}
          <button
            type="button"
            className="combobox-component__toggle"
            onClick={() => (isOpen ? setIsOpen(false) : open())}
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
          >
            ▾
          </button>
        </div>

        {isOpen && (
          <div
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            className="combobox-component__listbox"
            aria-label={ariaLabel}
          >
            {isLoading ? (
              <div className="combobox-component__message" role="status">
                {loadingMessage}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="combobox-component__message">{emptyMessage}</div>
            ) : (
              filteredOptions.map((option, index) => {
                const isHighlighted = index === highlightedIndex;
                const isSelected = option.value === selectedValue;
                return (
                  <div
                    key={`${option.value}-${index}`}
                    id={optionId(index)}
                    role="option"
                    tabIndex={-1}
                    aria-selected={isSelected || isHighlighted}
                    aria-disabled={option.disabled || undefined}
                    className={[
                      'combobox-component__option',
                      isHighlighted && 'combobox-component__option--highlighted',
                      isSelected && 'combobox-component__option--selected',
                      option.disabled && 'combobox-component__option--disabled',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (!option.disabled) commitSelection(option);
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                  >
                    {option.icon && (
                      <span className="combobox-component__option-icon">{option.icon}</span>
                    )}
                    <span className="combobox-component__option-label">{option.label}</span>
                    {option.description && (
                      <span className="combobox-component__option-description">
                        {option.description}
                      </span>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
