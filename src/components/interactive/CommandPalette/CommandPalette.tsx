// CommandPalette.tsx
import React, { forwardRef, useState, useCallback, useRef, useEffect, useId, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import { useModal } from '../../../hooks';
import './CommandPalette.css';

export type CommandPaletteVariant = 'primary' | 'secondary' | 'ghost' | 'outline';

export interface CommandItem {
  /** Unique id. */
  id: string;
  /** Display label (the primary text shown). */
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  /** Optional keyboard shortcut hint (e.g. "⌘C"). */
  shortcut?: string;
  /** Optional group label — items with the same group are rendered together. */
  group?: string;
  /** Extra keywords for search (space-separated, matched alongside label). */
  keywords?: string;
  /** Whether the item is disabled (not selectable, shown grayed). */
  disabled?: boolean;
  /** Action to run when the item is selected (Enter or click). */
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  /** The list of commands to search/filter. */
  items: CommandItem[];
  /** Controlled open state. */
  isOpen?: boolean;
  /** Uncontrolled initial open state. */
  defaultIsOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Placeholder for the search input. */
  placeholder?: string;
  /** Message shown when no results match. */
  emptyMessage?: string;
  /** Variant. */
  variant?: CommandPaletteVariant;
  /** Theme override for the accent (active item highlight + focus ring). */
  color?: string;
  /** Panel text color override. */
  textColor?: string;
  /** Panel border color override. */
  borderColor?: string;
  /** Panel border radius override. */
  borderRadius?: string | number;
  /** Panel shadow level (default: xl). */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

/* ---------- helpers ---------- */

/** Filter items by a search query. Matches against label + keywords
 *  (case-insensitive substring). Returns items in their original order. */
const filterItems = (items: CommandItem[], query: string): CommandItem[] => {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter((item) => {
    const haystack = `${item.label} ${item.keywords ?? ''}`.toLowerCase();
    return haystack.includes(q);
  });
};

/** Group filtered items by their `group` field, preserving insertion order
 *  of groups. Ungrouped items go into a default group at the top. */
const groupItems = (items: CommandItem[]): Array<{ group: string; items: CommandItem[] }> => {
  const groups = new Map<string, CommandItem[]>();
  for (const item of items) {
    const g = item.group ?? '';
    if (!groups.has(g)) groups.set(g, []);
    groups.get(g)!.push(item);
  }
  return Array.from(groups.entries()).map(([group, items]) => ({ group, items }));
};

/* ---------- component ---------- */

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      items,
      isOpen: controlledOpen,
      defaultIsOpen = false,
      onOpenChange,
      placeholder = 'Search commands…',
      emptyMessage = 'No results found',
      variant = 'primary',
      color,
      textColor,
      borderColor,
      borderRadius,
      shadow = 'xl',
      className = '',
      style,
      ariaLabel = 'Command palette',
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = `${generatedId}-input`;
    const listId = `${generatedId}-list`;

    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
    }, []);

    // Adopt useModal for open/close state, Escape-to-close (document-level),
    // and body scroll lock (was missing — bug fix). trapFocus is false
    // because CommandPalette manages its own focus (focuses the search input).
    const {
      isOpen,
      close,
      open: modalOpen,
    } = useModal({
      isOpen: controlledOpen,
      defaultOpen: defaultIsOpen,
      onClose: () => {
        onOpenChange?.(false);
        setQuery('');
        setActiveIndex(0);
      },
      closeOnEsc: true,
      trapFocus: false,
      lockScroll: true,
    });

    const open = useCallback(() => {
      modalOpen();
      onOpenChange?.(true);
    }, [modalOpen, onOpenChange]);

    // Global Cmd+K / Ctrl+K listener
    useEffect(() => {
      const handler = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          if (isOpen) {
            close();
          } else {
            open();
          }
        }
      };
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    }, [isOpen, open, close]);

    // Focus input when opened (useModal handles Escape + scroll lock;
    // we focus the input manually since trapFocus is false).
    useEffect(() => {
      if (isOpen) {
        const timer = setTimeout(() => inputRef.current?.focus(), 0);
        return () => clearTimeout(timer);
      }
    }, [isOpen]);

    // Reset active index when query changes
    useEffect(() => {
      setActiveIndex(0);
    }, [query]);

    const filtered = useMemo(() => filterItems(items, query), [items, query]);
    const grouped = useMemo(() => groupItems(filtered), [filtered]);

    // Flatten for keyboard nav (only enabled items are navigable)
    const flatEnabled = useMemo(() => filtered.filter((item) => !item.disabled), [filtered]);

    const selectItem = useCallback(
      (item: CommandItem) => {
        if (item.disabled) return;
        item.onSelect?.();
        close();
      },
      [close],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setActiveIndex((prev) => Math.min(prev + 1, flatEnabled.length - 1));
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const item = flatEnabled[activeIndex];
          if (item) selectItem(item);
        }
        // Escape is handled by useModal on the document level
      },
      [flatEnabled, activeIndex, selectItem],
    );

    // Theme resolution
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedShadow = shadow !== undefined ? resolveThemeValue(`shadow-${shadow}`) : undefined;

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--cmd-custom-accent': resolvedColor }),
      ...(resolvedTextColor && { '--cmd-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--cmd-custom-border': resolvedBorderColor }),
      ...(borderRadius !== undefined && {
        '--cmd-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(resolvedShadow && { '--cmd-custom-shadow': resolvedShadow }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;
    const ariaProps = getAriaProps({ label: ariaLabel });

    const classes = ['cmd-component', `cmd-component--${variant}`, className]
      .filter(Boolean)
      .join(' ');

    if (!isOpen || !mounted) return null;

    // Build the active item id for aria-activedescendant
    let runningIndex = -1;
    let activeId: string | undefined;

    return createPortal(
      // Overlay handles click-outside-to-close and Escape/arrow key navigation.
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div className="cmd-component__overlay" onClick={close} onKeyDown={handleKeyDown}>
        {/* Dialog's onClick stops propagation so clicks inside don't close the
            modal. Keyboard nav is handled by the overlay's onKeyDown. */}
        {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          ref={ref}
          className={classes}
          style={mergedStyle}
          role="dialog"
          aria-modal="true"
          {...ariaProps}
          onClick={(e) => e.stopPropagation()}
          {...rest}
        >
          <div className="cmd-component__search">
            <span className="cmd-component__search-icon">🔍</span>
            <input
              ref={inputRef}
              id={inputId}
              type="text"
              className="cmd-component__input"
              placeholder={placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-autocomplete="list"
              aria-activedescendant={activeId}
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="cmd-component__esc">ESC</kbd>
          </div>

          <div className="cmd-component__list-wrapper">
            {filtered.length === 0 ? (
              <div className="cmd-component__empty">{emptyMessage}</div>
            ) : (
              <ul id={listId} className="cmd-component__list" role="listbox">
                {grouped.map(({ group, items: groupItems }) => (
                  <li
                    key={group || 'ungrouped'}
                    className="cmd-component__group"
                    role="presentation"
                  >
                    {group && <div className="cmd-component__group-label">{group}</div>}
                    <ul className="cmd-component__group-items">
                      {groupItems.map((item) => {
                        if (item.disabled) {
                          return (
                            <li
                              key={item.id}
                              id={`${generatedId}-${item.id}`}
                              className="cmd-component__item cmd-component__item--disabled"
                              role="option"
                              aria-selected={false}
                              aria-disabled="true"
                            >
                              <CommandRow item={item} />
                            </li>
                          );
                        }
                        runningIndex++;
                        const isActive = runningIndex === activeIndex;
                        if (isActive) activeId = `${generatedId}-${item.id}`;
                        return (
                          // The listbox (overlay) handles keyboard navigation via
                          // aria-activedescendant; the option itself is not focusable.
                          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                          <li
                            key={item.id}
                            id={`${generatedId}-${item.id}`}
                            className={`cmd-component__item ${isActive ? 'cmd-component__item--active' : ''}`}
                            role="option"
                            aria-selected={isActive}
                            onClick={() => selectItem(item)}
                            onMouseEnter={() =>
                              setActiveIndex(flatEnabled.findIndex((f) => f.id === item.id))
                            }
                          >
                            <CommandRow item={item} />
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>,
      document.body,
    );
  },
);

CommandPalette.displayName = 'CommandPalette';

/* ---------- sub-component ---------- */

const CommandRow = ({ item }: { item: CommandItem }) => (
  <>
    {item.icon && <span className="cmd-component__item-icon">{item.icon}</span>}
    <span className="cmd-component__item-label">{item.label}</span>
    {item.shortcut && <kbd className="cmd-component__item-shortcut">{item.shortcut}</kbd>}
  </>
);
