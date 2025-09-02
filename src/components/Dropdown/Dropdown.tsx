import React, { useState, useRef, useEffect, useMemo } from 'react';
import { resolveThemeValue, createRipple, getAriaProps, getKeyboardHandler } from '../../utils';
import './Dropdown.css';

export interface DropdownOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
  group?: string;
  tags?: string[];
  metadata?: Record<string, any>;
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

export interface DropdownProps {
  options?: DropdownOption[];
  value?: string | number | Array<string | number>;
  onChange: (value: string | number | Array<string | number>) => void;
  placeholder?: string;
  disabled?: boolean;
  multiSelect?: boolean;
  maxSelections?: number;
  searchable?: boolean;
  clearable?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'ghost';
  color?: string;
  gradient?: string;
  background?: string; // Add missing background prop
  textColor?: string;
  borderColor?: string;
  // Enhanced background options
  backgroundImage?: string;
  backgroundBlend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
  // Enhanced styling
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  backdropBlur?: boolean;
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  // New features
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

export const Dropdown = ({
  options,
  value,
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
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Gradient presets
  const gradientPresets = {
    'gradient-sunset': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
    'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'gradient-forest': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'gradient-sunrise': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'gradient-gold': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  };

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedBackground = resolveThemeValue(background); // Add background resolution

  // Handle open state changes
  const handleOpenChange = (newOpen: boolean) => {
    console.log('Dropdown open state changing to:', newOpen);
    setIsOpen(newOpen);
    onOpenChange?.(newOpen);
    if (!newOpen) {
      setFocusedIndex(-1);
      setSearch('');
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        console.log('Click outside detected, closing dropdown');
        handleOpenChange(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  // Handle keyboard navigation focus
  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const optionEls = listRef.current.querySelectorAll('.dropdown-option');
      (optionEls[focusedIndex] as HTMLElement)?.focus();
    }
  }, [focusedIndex, isOpen]);

  // Process options with groups
  const processedOptions = useMemo(() => {
    if (optionGroups && optionGroups.length > 0) {
      return optionGroups.flatMap(group => group.options);
    }
    return options || [];
  }, [options, optionGroups]);

  const filteredOptions = useMemo(
    () =>
      search
        ? processedOptions.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
          )
        : processedOptions,
    [processedOptions, search]
  );

  const isSelected = (val: string | number) => {
    if (multiSelect) {
      return Array.isArray(value) && value.includes(val);
    }
    return value === val;
  };

  const handleOptionClick = (val: string | number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (disabled) return;

    console.log('Option clicked:', val, 'multiSelect:', multiSelect, 'current value:', value);

    if (multiSelect) {
      const selected = Array.isArray(value) ? value : [];
      console.log('Multi select - current selected:', selected);
      if (selected.includes(val)) {
        const newSelected = selected.filter((v) => v !== val);
        console.log('Removing value, new selected:', newSelected);
        onChange(newSelected);
      } else if (!maxSelections || selected.length < maxSelections) {
        const newSelected = [...selected, val];
        console.log('Adding value, new selected:', newSelected);
        onChange(newSelected);
      }
    } else {
      console.log('Single select - setting value to:', val);
      onChange(val);
      handleOpenChange(false);
    }
  };

  const handleSelectAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log('Select all clicked, multiSelect:', multiSelect, 'disabled:', disabled);
    if (multiSelect && !disabled) {
      const allValues = filteredOptions.map((opt) => opt.value);
      const newValues = maxSelections 
        ? allValues.slice(0, maxSelections)
        : allValues;
      
      console.log('Select all - new values:', newValues, 'filtered options:', filteredOptions);
      
      // If we're limited by maxSelections, log a helpful message
      if (maxSelections && allValues.length > maxSelections) {
        console.log(`Select All: Limited to ${maxSelections} selections out of ${allValues.length} available options`);
      }
      
      onChange(newValues);
    }
  };

  const handleRandomSelect = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (multiSelect && !disabled) {
      const availableOptions = filteredOptions.filter(opt => !opt.disabled);
      const count = maxSelections || Math.min(3, availableOptions.length); // Default to 3 if no max
      
      // Shuffle array and take first N items
      const shuffled = [...availableOptions].sort(() => Math.random() - 0.5);
      const randomValues = shuffled.slice(0, count).map(opt => opt.value);
      
      console.log('Random select - selected values:', randomValues, 'count:', count);
      onChange(randomValues);
    }
  };

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (multiSelect && !disabled) {
      onChange([]);
    }
  };

  const handleClear = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (clearable && !disabled) {
      onChange(multiSelect ? [] : '');
    }
  };

  const handleSearch = (searchTerm: string) => {
    setSearch(searchTerm);
    onSearch?.(searchTerm);
  };

  const handleKeyDown = getKeyboardHandler({
    onEnter: () => {
      if (isOpen && focusedIndex >= 0) {
        handleOptionClick(filteredOptions[focusedIndex].value, {} as React.MouseEvent);
      } else {
        handleOpenChange(!isOpen);
      }
    },
    onSpace: () => {
      if (isOpen && focusedIndex >= 0) {
        handleOptionClick(filteredOptions[focusedIndex].value, {} as React.MouseEvent);
      } else {
        handleOpenChange(!isOpen);
      }
    },
    onArrowDown: () => {
      if (!isOpen) {
        handleOpenChange(true);
        setFocusedIndex(0);
      } else {
        setFocusedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      }
    },
    onArrowUp: () => {
      if (!isOpen) {
        handleOpenChange(true);
        setFocusedIndex(filteredOptions.length - 1);
      } else {
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      }
    },
    onEscape: () => handleOpenChange(false),
    onTab: () => handleOpenChange(false),
  });

  const selectedLabels = useMemo(() => {
    if (multiSelect) {
      const selected = Array.isArray(value) ? value : [];
      if (selected.length > 0) {
        return processedOptions
          .filter((opt) => selected.includes(opt.value))
          .map((opt) => opt.label)
          .join(', ');
      }
      return placeholder;
    } else {
      const selectedOption = processedOptions.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }
  }, [processedOptions, value, placeholder, multiSelect]);

  // Build classes
  const classes = [
    'dropdown-container',
    `dropdown-container--${size}`,
    `dropdown-container--${variant}`,
    shadow && `dropdown-container--shadow-${shadow}`,
    hoverEffect && `dropdown-container--hover-${hoverEffect}`,
    disabled && 'dropdown-container--disabled',
    isOpen && 'dropdown-container--open',
    className,
  ].filter(Boolean).join(' ');

  // Build styles
  const containerStyle: React.CSSProperties = {
    ...(resolvedTextColor && { '--dropdown-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--dropdown-custom-border': resolvedBorderColor }),
    // Apply gradient first, then color can override (same as Button and RadioGroup)
    ...(resolvedGradient && { '--dropdown-custom-bg': resolvedGradient }),
    ...(resolvedColor && { '--dropdown-custom-bg': resolvedColor }),
    ...(backgroundImage && { '--dropdown-custom-background-image': backgroundImage }),
    ...(backgroundBlend && { '--dropdown-custom-background-blend': backgroundBlend }),
    ...(borderRadius && { '--dropdown-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--dropdown-custom-shadow': shadow }),
    ...(backdropBlur && { '--dropdown-custom-backdrop-blur': 'blur(8px)' }),
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...style,
  };

  // Build list styles
  const listStyle: React.CSSProperties = {
    maxHeight,
    ...(position === 'top' && { bottom: '100%', top: 'auto' }),
    ...(position === 'left' && { right: '100%', left: 'auto' }),
    ...(position === 'right' && { left: '100%', right: 'auto' }),
  };

  return (
    <div
      className={classes}
      style={containerStyle}
      tabIndex={disabled ? -1 : 0}
      onClick={() => {
        console.log('Dropdown main container clicked');
        if (!disabled) handleOpenChange(!isOpen);
      }}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      {...getAriaProps({
        hasPopup: 'listbox',
        expanded: isOpen,
        disabled,
        role: 'combobox',
        controls: 'dropdown-list',
        label: 'Dropdown select',
      })}
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
            {clearable && value && (
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
        <ul
          className={`dropdown-list dropdown-list--${position}`}
          style={listStyle}
          role="listbox"
          id="dropdown-list"
          ref={listRef}
          aria-multiselectable={multiSelect}
        >
          {searchable && (
            <li className="dropdown-search">
              <div className="dropdown-search-container">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search options..."
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Search options"
                  autoFocus
                />
              </div>
            </li>
          )}
          
          {filteredOptions.length === 0 ? (
            <li className="dropdown-no-options">
              {loading ? 'Loading options...' : error ? `Error: ${error}` : 'No options available'}
            </li>
          ) : (
            <>
              {optionGroups && optionGroups.length > 0 ? (
                // Render grouped options
                optionGroups.map((group) => (
                  <li key={group.value} className="dropdown-group">
                    <div className="dropdown-group-header">
                      {group.icon && <span className="dropdown-group-icon">{group.icon}</span>}
                      <span className="dropdown-group-label">{group.label}</span>
                      {group.description && (
                        <span className="dropdown-group-description">{group.description}</span>
                      )}
                    </div>
                    <ul className="dropdown-group-options">
                      {group.options
                        .filter(opt => 
                          !search || opt.label.toLowerCase().includes(search.toLowerCase())
                        )
                        .map((opt, index) => (
                          <li
                            key={opt.value}
                            role="option"
                            aria-selected={isSelected(opt.value)}
                            tabIndex={-1}
                            className={`                              dropdown-option ${isSelected(opt.value) ? 'selected' : ''} ${
                                index === focusedIndex ? 'focused' : ''} ${opt.disabled ? 'disabled' : ''}`}
                            onClick={(e) => !opt.disabled && handleOptionClick(opt.value, e)}
                          >
                            {multiSelect && (
                              <input
                                type="checkbox"
                                checked={isSelected(opt.value)}
                                readOnly
                                tabIndex={-1}
                                disabled={opt.disabled}
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
                    </ul>
                  </li>
                ))
              ) : (
                // Render regular options
                filteredOptions.map((opt, index) => (
                  <li
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected(opt.value)}
                    tabIndex={-1}
                    className={`dropdown-option ${isSelected(opt.value) ? 'selected' : ''} ${
                      index === focusedIndex ? 'focused' : ''} ${opt.disabled ? 'disabled' : ''}`}
                    onClick={(e) => !opt.disabled && handleOptionClick(opt.value, e)}
                  >
                    {multiSelect && (
                      <input
                        type="checkbox"
                        checked={isSelected(opt.value)}
                        readOnly
                        tabIndex={-1}
                        disabled={opt.disabled}
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
                ))
              )}
            </>
          )}
          
          {multiSelect && (
            <li className="dropdown-footer">
              {/* Only show Select All when it's actually selecting all available options */}
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
              
              {/* Show Select Top N when there's a selection limit */}
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
              
              {/* Random Selector */}
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
                disabled={disabled || (Array.isArray(value) ? value.length === 0 : false)}
                aria-label="Clear all selections"
              >
                Clear All
              </button>
              <button
                type="button"
                className="dropdown-footer-btn dropdown-footer-btn--done"
                onClick={(e) => {
                  e.stopPropagation();
                  handleOpenChange(false);
                }}
                disabled={disabled}
                aria-label="Confirm selections"
              >
                Done
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
};
