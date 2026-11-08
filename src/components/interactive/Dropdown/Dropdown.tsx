import React, { forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import { useDropdown } from '../../../hooks';
import './Dropdown.css';

// Re-export types for backward compatibility
export type { DropdownOption, DropdownOptionGroup } from '../../../hooks/useDropdown';
import type { DropdownOption, DropdownOptionGroup } from '../../../hooks/useDropdown';

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownVariant = 'default' | 'outline' | 'ghost';

export interface DropdownProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    | 'onChange'
    | 'defaultValue'
    | 'color'
    | 'placeholder'
    | 'size'
    | 'style'
    | 'className'
    | 'disabled'
  > {
  options?: DropdownOption[];
  value?: string | number | Array<string | number>;
  defaultValue?: string | number | Array<string | number>;
  onChange?: (value: string | number | Array<string | number>) => void;
  placeholder?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  clearable?: boolean;
  size?: DropdownSize;
  variant?: DropdownVariant;
  color?: string;
  gradient?: string;
  background?: string;
  textColor?: string;
  borderColor?: string;
  labelColor?: string;
  descriptionColor?: string;
  optionBackground?: string;
  optionHoverBackground?: string;
  optionSelectedBackground?: string;
  backgroundImage?: string;
  backgroundBlend?: React.CSSProperties['backgroundBlendMode'];
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backdropBlur?: boolean;
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  optionGroups?: DropdownOptionGroup[];
  showOptionCount?: boolean;
  loading?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
  trigger?: React.ReactNode;
  position?: 'bottom' | 'top' | 'left' | 'right';
  width?: string | number;
  maxHeight?: string | number;
  onOpenChange?: (isOpen: boolean) => void;
  onSearch?: (searchTerm: string) => void;
}

export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      value,
      defaultValue,
      onChange,
      placeholder = 'Select...',
      disabled = false,
      multiSelect = false,
      maxSelections,
      searchable = false,
      clearable = false,
      size = 'md',
      variant = 'default',
      color,
      gradient,
      background,
      textColor,
      borderColor,
      labelColor,
      descriptionColor,
      optionBackground,
      optionHoverBackground,
      optionSelectedBackground,
      backgroundImage,
      backgroundBlend,
      borderRadius,
      shadow,
      backdropBlur,
      hoverEffect = 'none',
      optionGroups,
      showOptionCount,
      loading,
      error,
      className = '',
      style,
      trigger,
      position = 'bottom',
      width,
      maxHeight = '300px',
      onOpenChange,
      onSearch,
      ...rest
    }: DropdownProps,
    ref,
  ) => {
    // useDropdown handles: open/close, selection, keyboard nav, search,
    // outside-click, option group flattening, and selectedLabels.
    const {
      isOpen,
      focusedIndex,
      search,
      currentValue,
      filteredOptions,
      selectedLabels,
      containerRef: hookContainerRef,
      listRef,
      setOpen,
      toggle,
      selectOption,
      isSelected,
      clear,
      clearAll,
      selectAll,
      setSearch,
      handleKeyDown,
    } = useDropdown({
      options,
      optionGroups,
      value,
      defaultValue,
      onChange,
      placeholder,
      disabled,
      multiSelect,
      maxSelections,
      searchable,
      clearable,
      onOpenChange,
      onSearch,
    });

    // Merge the forwarded ref with the internal container ref
    const setContainerRef = (node: HTMLDivElement | null) => {
      (hookContainerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedBackground = resolveThemeValue(background);
    const resolvedLabelColor = resolveThemeValue(labelColor);
    const resolvedDescriptionColor = resolveThemeValue(descriptionColor);
    const resolvedOptionBackground = resolveThemeValue(optionBackground);
    const resolvedOptionHoverBackground = resolveThemeValue(optionHoverBackground);
    const resolvedOptionSelectedBackground = resolveThemeValue(optionSelectedBackground);

    // Detect text gradients
    const isTextGradient =
      textColor &&
      (textColor.includes('linear-gradient') ||
        textColor.includes('radial-gradient') ||
        textColor.includes('conic-gradient'));
    const isLabelGradient =
      labelColor &&
      (labelColor.includes('linear-gradient') ||
        labelColor.includes('radial-gradient') ||
        labelColor.includes('conic-gradient'));
    const isDescriptionGradient =
      descriptionColor &&
      (descriptionColor.includes('linear-gradient') ||
        descriptionColor.includes('radial-gradient') ||
        descriptionColor.includes('conic-gradient'));
    const isBorderGradient =
      borderColor &&
      (borderColor.includes('linear-gradient') ||
        borderColor.includes('radial-gradient') ||
        borderColor.includes('conic-gradient'));
    const isBackgroundGradient =
      (background || gradient || color) &&
      ((background &&
        (background.includes('linear-gradient') ||
          background.includes('radial-gradient') ||
          background.includes('conic-gradient'))) ||
        (gradient &&
          (gradient.includes('linear-gradient') ||
            gradient.includes('radial-gradient') ||
            gradient.includes('conic-gradient'))) ||
        (color &&
          (color.includes('linear-gradient') ||
            color.includes('radial-gradient') ||
            color.includes('conic-gradient'))));

    // Build classes
    const classes = [
      'dropdown-container',
      `dropdown-container--${size}`,
      `dropdown-container--${variant}`,
      shadow && `dropdown-container--shadow-${shadow}`,
      hoverEffect && `dropdown-container--hover-${hoverEffect}`,
      disabled && 'dropdown-container--disabled',
      isOpen && 'dropdown-container--open',
      isTextGradient && 'dropdown-container--text-gradient',
      isLabelGradient && 'dropdown-container--label-gradient',
      isDescriptionGradient && 'dropdown-container--description-gradient',
      isBorderGradient && 'dropdown-container--border-gradient',
      isBackgroundGradient && 'dropdown-container--background-gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedGradient && { '--dropdown-custom-bg': resolvedGradient }),
      ...(resolvedColor && !resolvedGradient && { '--dropdown-custom-bg': resolvedColor }),
      ...(resolvedBackground &&
        !resolvedGradient &&
        !resolvedColor && { '--dropdown-custom-bg': resolvedBackground }),
      ...(resolvedTextColor && { '--dropdown-custom-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--dropdown-custom-border': resolvedBorderColor }),
      ...(resolvedLabelColor && { '--dropdown-custom-label-color': resolvedLabelColor }),
      ...(resolvedDescriptionColor && {
        '--dropdown-custom-description-color': resolvedDescriptionColor,
      }),
      ...(resolvedOptionBackground && {
        '--dropdown-custom-option-bg': resolvedOptionBackground,
      }),
      ...(resolvedOptionHoverBackground && {
        '--dropdown-custom-option-hover-bg': resolvedOptionHoverBackground,
      }),
      ...(resolvedOptionSelectedBackground && {
        '--dropdown-custom-option-selected-bg': resolvedOptionSelectedBackground,
      }),
      ...(borderRadius && {
        '--dropdown-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(shadow &&
        resolveThemeValue(`shadow-${shadow}`) && {
          '--dropdown-custom-shadow': resolveThemeValue(`shadow-${shadow}`)!,
        }),
      ...(backgroundImage && { '--dropdown-custom-bg-image': `url(${backgroundImage})` }),
      ...(backgroundBlend && { '--dropdown-custom-bg-blend': backgroundBlend as string }),
      ...(backdropBlur && { '--dropdown-backdrop-blur': 'blur(8px)' }),
    };

    const containerStyle = style ? { ...componentStyle, ...style } : componentStyle;

    const listStyle: React.CSSProperties = {
      maxHeight,
      ...(position === 'top' && { bottom: '100%', top: 'auto' }),
      ...(position === 'left' && { right: '100%', left: 'auto' }),
      ...(position === 'right' && { left: '100%', right: 'auto' }),
    };

    // Random select — kept in component because it uses filteredOptions
    // and maxSelections from the hook
    const handleRandomSelect = (event: React.MouseEvent) => {
      event.stopPropagation();
      if (multiSelect && !disabled) {
        const availableOptions = filteredOptions.filter((opt) => !opt.disabled);
        const count = maxSelections || Math.min(3, availableOptions.length);
        const shuffled = [...availableOptions].sort(() => Math.random() - 0.5);
        const randomValues = shuffled.slice(0, count).map((opt) => opt.value);
        onChange?.(randomValues);
        if (value === undefined) {
          // uncontrolled — but we can't set internal state from here,
          // so we call onChange which the hook picks up if controlled
        }
      }
    };

    const handleClear = (event: React.MouseEvent) => {
      event.stopPropagation();
      clear();
    };

    const handleSelectAll = (event: React.MouseEvent) => {
      event.stopPropagation();
      selectAll();
    };

    const handleClearAll = (event: React.MouseEvent) => {
      event.stopPropagation();
      clearAll();
    };

    return (
      // role="combobox" + aria props are applied via the getAriaProps spread
      // below; jsx-a11y can't statically see the role through the spread, so
      // it flags this as a static element with interactions. The container
      // is focusable (tabIndex 0) and handles keyboard via onKeyDown.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        className={classes}
        style={containerStyle}
        tabIndex={disabled ? -1 : 0}
        onClick={() => {
          if (!disabled) toggle();
        }}
        onKeyDown={handleKeyDown}
        ref={setContainerRef}
        {...getAriaProps({
          hasPopup: 'listbox',
          expanded: isOpen,
          disabled,
          role: 'combobox',
          controls: 'dropdown-list',
          label: 'Dropdown select',
        })}
        {...rest}
      >
        {trigger || (
          <div className="dropdown-selected">
            <span>{selectedLabels || <em>{placeholder}</em>}</span>
            <div className="dropdown-actions">
              {showOptionCount && (
                <span className="dropdown-option-count">
                  {filteredOptions.length} option{filteredOptions.length !== 1 ? 's' : ''}
                </span>
              )}
              {loading && (
                <span className="dropdown-loading" aria-label="Loading options">
                  <div className="dropdown-spinner"></div>
                </span>
              )}
              {error && (
                <span className="dropdown-error" aria-label="Error loading options" title={error}>
                  ⚠️
                </span>
              )}
              {clearable && currentValue !== undefined && currentValue !== '' && (
                <button
                  type="button"
                  className="dropdown-clear"
                  onClick={handleClear}
                  aria-label="Clear selection"
                >
                  ×
                </button>
              )}
              <i className={`dropdown-chevron ${isOpen ? 'open' : ''}`}>▼</i>
            </div>
          </div>
        )}

        {isOpen && (
          <div className={`dropdown-list dropdown-list--${position}`} style={listStyle}>
            {searchable && (
              <div className="dropdown-search">
                <div className="dropdown-search-container">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search options..."
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Search options"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                  />
                </div>
              </div>
            )}

            <ul
              role="listbox"
              id="dropdown-list"
              ref={listRef as React.RefObject<HTMLUListElement>}
              aria-multiselectable={multiSelect ? 'true' : undefined}
              className="dropdown-listbox"
            >
              {filteredOptions.length === 0 ? (
                <li
                  role="option"
                  aria-disabled="true"
                  aria-selected="false"
                  className="dropdown-no-options"
                >
                  {loading
                    ? 'Loading options...'
                    : error
                      ? `Error: ${error}`
                      : 'No options available'}
                </li>
              ) : (
                <>
                  {optionGroups && optionGroups.length > 0
                    ? optionGroups.map((group) => (
                        <div
                          key={group.value}
                          role="group"
                          aria-label={group.label}
                          className="dropdown-group"
                        >
                          <div className="dropdown-group-header">
                            {group.icon && (
                              <span className="dropdown-group-icon">{group.icon}</span>
                            )}
                            <span className="dropdown-group-label">{group.label}</span>
                            {group.description && (
                              <span className="dropdown-group-description">
                                {group.description}
                              </span>
                            )}
                          </div>
                          <div className="dropdown-group-options">
                            {group.options
                              .filter(
                                (opt) =>
                                  !search || opt.label.toLowerCase().includes(search.toLowerCase()),
                              )
                              .map((opt) => {
                                const index = filteredOptions.indexOf(opt);
                                return (
                                  // Keyboard navigation is handled by the combobox
                                  // container's onKeyDown (arrow keys move the active
                                  // option); listbox options are tabIndex={-1} per the
                                  // ARIA combobox pattern.
                                  // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                                  <li
                                    key={opt.value}
                                    role="option"
                                    aria-selected={isSelected(opt.value)}
                                    tabIndex={-1}
                                    className={`dropdown-option ${
                                      isSelected(opt.value) ? 'selected' : ''
                                    } ${index === focusedIndex ? 'focused' : ''} ${
                                      opt.disabled ? 'disabled' : ''
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!opt.disabled) selectOption(opt.value);
                                    }}
                                  >
                                    {multiSelect && (
                                      <span
                                        className="dropdown-checkbox"
                                        aria-hidden="true"
                                        data-checked={isSelected(opt.value) ? 'true' : 'false'}
                                      />
                                    )}
                                    {opt.icon && (
                                      <span className="dropdown-option-icon">{opt.icon}</span>
                                    )}
                                    <span className="dropdown-option-content">
                                      <span className="dropdown-option-label">{opt.label}</span>
                                      {opt.description && (
                                        <span className="dropdown-option-description">
                                          {opt.description}
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                          </div>
                        </div>
                      ))
                    : filteredOptions.map((opt, index) => (
                        // Same ARIA listbox pattern as the searchable variant:
                        // keyboard nav lives on the combobox container; options
                        // are not independently focusable (tabIndex={-1}).
                        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                        <li
                          key={opt.value}
                          role="option"
                          aria-selected={isSelected(opt.value)}
                          tabIndex={-1}
                          className={`dropdown-option ${isSelected(opt.value) ? 'selected' : ''} ${
                            index === focusedIndex ? 'focused' : ''
                          } ${opt.disabled ? 'disabled' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!opt.disabled) selectOption(opt.value);
                          }}
                        >
                          {multiSelect && (
                            <span
                              className="dropdown-checkbox"
                              aria-hidden="true"
                              data-checked={isSelected(opt.value) ? 'true' : 'false'}
                            />
                          )}
                          {opt.icon && <span className="dropdown-option-icon">{opt.icon}</span>}
                          <span className="dropdown-option-content">
                            <span className="dropdown-option-label">{opt.label}</span>
                            {opt.description && (
                              <span className="dropdown-option-description">{opt.description}</span>
                            )}
                          </span>
                        </li>
                      ))}
                </>
              )}
            </ul>

            {multiSelect && (
              <div className="dropdown-footer">
                {(!maxSelections || filteredOptions.length <= maxSelections) && (
                  <button
                    type="button"
                    className="dropdown-footer-btn dropdown-footer-btn--select-all"
                    onClick={handleSelectAll}
                    disabled={!!(disabled || filteredOptions.length === 0)}
                    aria-label="Select all options"
                  >
                    Select All
                  </button>
                )}
                {maxSelections && filteredOptions.length > maxSelections && (
                  <button
                    type="button"
                    className="dropdown-footer-btn dropdown-footer-btn--select-top"
                    onClick={handleSelectAll}
                    disabled={!!(disabled || filteredOptions.length === 0)}
                    aria-label={`Select top ${maxSelections} options`}
                  >
                    Select Top {maxSelections}
                  </button>
                )}
                <button
                  type="button"
                  className="dropdown-footer-btn dropdown-footer-btn--random"
                  onClick={handleRandomSelect}
                  disabled={!!(disabled || filteredOptions.length === 0)}
                  aria-label={`Randomly select ${maxSelections || 3} options`}
                >
                  Random {maxSelections || 3}
                </button>
                <button
                  type="button"
                  className="dropdown-footer-btn dropdown-footer-btn--clear-all"
                  onClick={handleClearAll}
                  disabled={
                    disabled || (Array.isArray(currentValue) ? currentValue.length === 0 : false)
                  }
                  aria-label="Clear all selections"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  className="dropdown-footer-btn dropdown-footer-btn--done"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                  }}
                  disabled={disabled}
                  aria-label="Confirm selections"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

Dropdown.displayName = 'Dropdown';
