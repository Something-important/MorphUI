// Combobox.tsx
import React, { forwardRef, useState, useMemo } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import { useCombobox } from '../../../hooks';
import './Combobox.css';

// Re-export ComboboxOption for backward compatibility (was originally
// defined here; now lives in the hook so consumers of either can use it)
export type { ComboboxOption } from '../../../hooks/useCombobox';

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
  /** ID of the element that describes the combobox input. */
  ariaDescribedBy?: string;
  loadingMessage?: React.ReactNode;
  emptyMessage?: React.ReactNode;
  variant?: ComboboxVariant;
  size?: ComboboxSize;
  /** Theme overrides — literal CSS value, "var(--x)", or a theme key like "color-primary" */
  color?: string;
  /** Gradient override for the background — wins over `color` for the background slot. */
  gradient?: string;
  /** Text color override for the control. */
  textColor?: string;
  /** Border color override for the control and listbox popup. */
  borderColor?: string;
  /** Border radius override (numbers are treated as px). */
  borderRadius?: string | number;
  /** Shadow token level applied to the listbox popup. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Enable windowed rendering for large option lists (1000+). When true,
   *  only the visible slice of options is rendered, with a fixed
   *  `itemHeight` per option. Requires `itemHeight`. */
  virtualize?: boolean;
  /** Fixed height per option in px — required when `virtualize` is true.
   *  Used to compute the total scroll height and the visible window. */
  itemHeight?: number;
  /** Max height of the listbox popup in px (default 320). */
  listboxMaxHeight?: number;
  className?: string;
  style?: React.CSSProperties;
}

import type { ComboboxOption } from '../../../hooks/useCombobox';

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value: controlledValue,
      defaultValue = null,
      onChange,
      onInputChange,
      filterOption,
      loadOptions,
      allowFreeText = false,
      placeholder = 'Search...',
      disabled = false,
      clearable = false,
      ariaLabel = 'Combobox',
      ariaDescribedBy,
      loadingMessage = 'Loading...',
      emptyMessage = 'No options',
      variant = 'primary',
      size = 'md',
      color,
      gradient,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      virtualize = false,
      itemHeight = 40,
      listboxMaxHeight = 320,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    // The hook handles all behavior: filtering, keyboard nav, selection,
    // open/close, async loading, outside-click. The component is the UI layer.
    const {
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
      setHighlightedIndex,
      commitSelection,
      clear,
      toggle,
      handleKeyDown,
      handleInputChange,
    } = useCombobox({
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      onInputChange,
      filterOption,
      loadOptions,
      allowFreeText,
      disabled,
      clearable,
    });

    // Virtualization: when enabled, render only the visible window of
    // options. This stays in the component because it's a rendering concern.
    const [scrollTop, setScrollTop] = useState(0);
    const virtualWindow = useMemo(() => {
      if (!virtualize || filteredOptions.length === 0) return null;
      const viewportItems = Math.ceil(listboxMaxHeight / itemHeight);
      const buffer = Math.max(3, Math.ceil(viewportItems / 2));
      const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - buffer);
      const endIndex = Math.min(filteredOptions.length, startIndex + viewportItems + buffer * 2);
      return {
        startIndex,
        endIndex,
        totalHeight: filteredOptions.length * itemHeight,
        offsetTop: startIndex * itemHeight,
      };
    }, [virtualize, filteredOptions.length, scrollTop, itemHeight, listboxMaxHeight]);

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

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedGradient && { '--combobox-custom-bg': resolvedGradient }),
      ...(resolvedColor && !resolvedGradient && { '--combobox-custom-bg': resolvedColor }),
      ...(resolvedTextColor && { '--combobox-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--combobox-custom-border': resolvedBorderColor }),
      ...(borderRadius && {
        '--combobox-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(shadow &&
        resolveThemeValue(`shadow-${shadow}`) && {
          '--combobox-custom-shadow': resolveThemeValue(`shadow-${shadow}`)!,
        }),
    };

    const mergedStyle = { ...componentStyle, ...style };
    const ariaProps = getAriaProps({ label: ariaLabel, describedBy: ariaDescribedBy });

    const renderOption = (option: ComboboxOption, index: number, virtualItemHeight?: number) => {
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
          style={virtualItemHeight ? { height: virtualItemHeight } : undefined}
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
          {option.icon && <span className="combobox-component__option-icon">{option.icon}</span>}
          <span className="combobox-component__option-label">{option.label}</span>
          {option.description && (
            <span className="combobox-component__option-description">{option.description}</span>
          )}
        </div>
      );
    };

    return (
      <div ref={ref} className={classes} style={mergedStyle} {...rest}>
        <div className="combobox-component__control">
          <input
            ref={inputRef as React.RefObject<HTMLInputElement>}
            type="text"
            className="combobox-component__input"
            placeholder={selectedOption && !inputValue ? selectedOption.label : placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (!disabled) toggle();
            }}
            disabled={disabled}
            role="combobox"
            aria-autocomplete="list"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            aria-controls={listboxId}
            aria-activedescendant={
              isOpen && highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined
            }
            {...ariaProps}
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
            onClick={toggle}
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
          >
            ▾
          </button>
        </div>

        {isOpen && (
          <div
            ref={listboxRef as React.RefObject<HTMLDivElement>}
            id={listboxId}
            role="listbox"
            className={`combobox-component__listbox${isFiltering ? ' combobox-component__listbox--filtering' : ''}`}
            aria-busy={isFiltering || undefined}
            aria-label={ariaLabel}
            style={virtualize ? { maxHeight: listboxMaxHeight, overflowY: 'auto' } : undefined}
            onScroll={
              virtualize ? (e) => setScrollTop((e.target as HTMLDivElement).scrollTop) : undefined
            }
          >
            {isLoading ? (
              <div className="combobox-component__message" role="status">
                {loadingMessage}
              </div>
            ) : filteredOptions.length === 0 ? (
              <div className="combobox-component__message">{emptyMessage}</div>
            ) : virtualize && virtualWindow ? (
              <div style={{ height: virtualWindow.totalHeight, position: 'relative' }}>
                <div style={{ paddingTop: virtualWindow.offsetTop }}>
                  {filteredOptions
                    .slice(virtualWindow.startIndex, virtualWindow.endIndex)
                    .map((option, i) =>
                      renderOption(option, virtualWindow.startIndex + i, itemHeight),
                    )}
                </div>
              </div>
            ) : (
              filteredOptions.map((option, index) => renderOption(option, index))
            )}
          </div>
        )}
      </div>
    );
  },
);

Combobox.displayName = 'Combobox';
