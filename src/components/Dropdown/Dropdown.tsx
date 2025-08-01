import React, { useState, useRef, useEffect, useMemo } from 'react';
import './Dropdown.css';

type Option = {
  label: string;
  value: string | number;
};

type BaseProps = {
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

type SingleSelectProps = BaseProps & {
  value?: string | number;
  onChange: (value: string | number) => void;
  multiSelect?: false;
};

type MultiSelectProps = BaseProps & {
  value: Array<string | number>;
  onChange: (value: Array<string | number>) => void;
  multiSelect: true;
  maxSelections?: number;
};

export type DropdownProps = SingleSelectProps | MultiSelectProps;

export const Dropdown = (props: DropdownProps) => {
  const {
    options,
    value,
    onChange,
    placeholder = 'Select...',
    disabled = false,
    multiSelect = false,
    className = '',
    style,
  } = props;
  // Safely access maxSelections only for multiSelect
  const maxSelections = multiSelect ? (props as MultiSelectProps).maxSelections : undefined;

  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation focus
  useEffect(() => {
    if (isOpen && listRef.current && focusedIndex >= 0) {
      const optionEls = listRef.current.querySelectorAll('.dropdown-option');
      (optionEls[focusedIndex] as HTMLElement)?.focus();
    }
  }, [focusedIndex, isOpen]);

  const filteredOptions = useMemo(
    () =>
      search
        ? options.filter((opt) =>
            opt.label.toLowerCase().includes(search.toLowerCase())
          )
        : options,
    [options, search]
  );

  const isSelected = (val: string | number) => {
    if (multiSelect) {
      return (value as Array<string | number>).includes(val);
    }
    return value === val;
  };

  const handleOptionClick = (val: string | number, event: React.MouseEvent) => {
    event.stopPropagation();
    if (disabled) return;

    if (multiSelect) {
      const selected = value as Array<string | number>;
      if (selected.includes(val)) {
        (onChange as (v: Array<string | number>) => void)(
          selected.filter((v) => v !== val)
        );
      } else if (!maxSelections || selected.length < maxSelections) {
        (onChange as (v: Array<string | number>) => void)([...selected, val]);
      }
    } else {
      (onChange as (v: string | number) => void)(val);
      setIsOpen(false);
      setFocusedIndex(-1);
    }
  };

  const handleSelectAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (multiSelect && !disabled) {
      const newValues = filteredOptions
        .map((opt) => opt.value)
        .slice(0, maxSelections || filteredOptions.length);
      (onChange as (v: Array<string | number>) => void)(newValues);
    }
  };

  const handleClearAll = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (multiSelect && !disabled) {
      (onChange as (v: Array<string | number>) => void)([]);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        if (isOpen && focusedIndex >= 0) {
          event.preventDefault();
          handleOptionClick(filteredOptions[focusedIndex].value, event as any);
        } else {
          event.preventDefault();
          setIsOpen((open) => !open);
        }
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(filteredOptions.length - 1);
        } else {
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        break;
      case 'Escape':
        event.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearch('');
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        setSearch('');
        break;
      default:
        break;
    }
  };

  const selectedLabels = useMemo(() => {
    if (multiSelect) {
      const selected = value as Array<string | number>;
      if (selected.length > 0) {
        return options
          .filter((opt) => selected.includes(opt.value))
          .map((opt) => opt.label)
          .join(', ');
      }
      return placeholder;
    } else {
      const selectedOption = options.find((opt) => opt.value === value);
      return selectedOption ? selectedOption.label : placeholder;
    }
  }, [options, value, placeholder, multiSelect]);

  return (
    <div
      className={`dropdown-container ${disabled ? 'disabled' : ''} ${className}`}
      style={style}
      tabIndex={disabled ? -1 : 0}
      onClick={() => !disabled && setIsOpen((open) => !open)}
      onKeyDown={handleKeyDown}
      ref={containerRef}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-disabled={disabled}
      role="combobox"
      aria-controls="dropdown-list"
      aria-label="Dropdown select"
    >
      <div className="dropdown-selected">
        <span>{selectedLabels || <em>{placeholder}</em>}</span>
        <i className={`fas fa-chevron-down dropdown-chevron ${isOpen ? 'open' : ''}`}></i>
      </div>
      {isOpen && (
        <ul
          className={`dropdown-list ${isOpen ? 'visible' : 'hidden'}`}
          role="listbox"
          id="dropdown-list"
          ref={listRef}
          aria-multiselectable={multiSelect}
        >
          {multiSelect && (
            <li className="dropdown-search">
              <div className="dropdown-search-container">
                <i className="fas fa-search dropdown-search-icon"></i>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search options..."
                  onClick={(e) => e.stopPropagation()}
                  aria-label="Search options"
                />
              </div>
            </li>
          )}
          {filteredOptions.length === 0 ? (
            <li className="dropdown-no-options">No options available</li>
          ) : (
            filteredOptions.map((opt, index) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected(opt.value)}
                tabIndex={-1}
                className={`dropdown-option ${isSelected(opt.value) ? 'selected' : ''} ${
                  index === focusedIndex ? 'focused' : ''
                }`}
                onClick={(e) => handleOptionClick(opt.value, e)}
              >
                {multiSelect && (
                  <input
                    type="checkbox"
                    checked={isSelected(opt.value)}
                    readOnly
                    tabIndex={-1}
                  />
                )}
                <span>{opt.label}</span>
              </li>
            ))
          )}
          {multiSelect && (
            <li className="dropdown-footer">
              <button
                type="button"
                className="select-all"
                onClick={handleSelectAll}
                disabled={!!(disabled || (maxSelections && filteredOptions.length > maxSelections))}
                aria-label="Select all options"
              >
                Select All
              </button>
              <button
                type="button"
                className="clear-all"
                onClick={handleClearAll}
                disabled={disabled || (value as Array<string | number>).length === 0}
                aria-label="Clear all selections"
              >
                Clear All
              </button>
              <button
                type="button"
                className="done"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setFocusedIndex(-1);
                  setSearch('');
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