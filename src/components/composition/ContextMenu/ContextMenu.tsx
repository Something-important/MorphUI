// ContextMenu.tsx
import React, {
  forwardRef,
  useState,
  useRef,
  useId,
  useCallback,
  useEffect,
  useLayoutEffect,
} from 'react';
import { createPortal } from 'react-dom';
import './ContextMenu.css';

export interface ContextMenuItem {
  /** 'item' (default) or 'separator' (renders a divider). */
  type?: 'item' | 'separator';
  label?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  /** Marks the item as destructive (red). */
  danger?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  /** The element(s) that trigger the menu on right-click. */
  children: React.ReactNode;
  /** Controlled mode: open the menu programmatically. */
  isOpen?: boolean;
  /** Position for controlled mode. */
  position?: { x: number; y: number };
  onClose?: () => void;
  ariaLabel?: string;
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const enabledItemIndices = (items: ContextMenuItem[]): number[] =>
  items
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => item.type !== 'separator' && !item.disabled)
    .map(({ idx }) => idx);

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  (
    {
      items,
      children,
      isOpen: controlledIsOpen,
      position: controlledPosition,
      onClose,
      ariaLabel = 'Context menu',
      variant = 'default',
      size = 'md',
      className = '',
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const menuId = `${autoId}-menu`;
    const menuRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    const isControlled = controlledIsOpen !== undefined;
    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const [internalPosition, setInternalPosition] = useState({ x: 0, y: 0 });
    const [focusedIndex, setFocusedIndex] = useState(-1);

    const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
    const position = controlledPosition ?? internalPosition;

    const close = useCallback(() => {
      if (!isControlled) setInternalIsOpen(false);
      onClose?.();
      // restore focus to the trigger element
      triggerRef.current?.focus?.();
    }, [isControlled, onClose]);

    const open = useCallback(
      (x: number, y: number) => {
        setInternalPosition({ x, y });
        if (!isControlled) setInternalIsOpen(true);
      },
      [isControlled],
    );

    const handleContextMenu = (e: React.MouseEvent) => {
      // Only handle when in uncontrolled (wrap) mode; controlled mode is opened by the parent.
      if (isControlled) return;
      e.preventDefault();
      triggerRef.current = e.currentTarget as HTMLElement;
      open(e.clientX, e.clientY);
    };

    // Focus the first enabled item when the menu opens.
    useEffect(() => {
      if (!isOpen) {
        setFocusedIndex(-1);
        return;
      }
      const enabled = enabledItemIndices(items);
      setFocusedIndex(enabled.length > 0 ? enabled[0] : -1);
    }, [isOpen, items]);

    // Close on outside click, viewport resize, or window blur.
    // (Escape is handled by the menu's own onKeyDown when a menuitem is focused.)
    useEffect(() => {
      if (!isOpen) return;
      const handlePointerDown = (e: MouseEvent) => {
        if (menuRef.current?.contains(e.target as Node)) return;
        close();
      };
      const handleResize = () => close();
      document.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('resize', handleResize);
      window.addEventListener('blur', handleResize);
      return () => {
        document.removeEventListener('mousedown', handlePointerDown);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('blur', handleResize);
      };
    }, [isOpen, close]);

    const navigate = (direction: 'next' | 'prev' | 'first' | 'last') => {
      const enabled = enabledItemIndices(items);
      if (enabled.length === 0) return;
      let nextIdx: number;
      if (direction === 'first') {
        nextIdx = enabled[0];
      } else if (direction === 'last') {
        nextIdx = enabled[enabled.length - 1];
      } else {
        const currentPos = enabled.indexOf(focusedIndex);
        if (currentPos === -1) {
          nextIdx = direction === 'next' ? enabled[0] : enabled[enabled.length - 1];
        } else {
          const offset = direction === 'next' ? 1 : -1;
          nextIdx = enabled[(currentPos + offset + enabled.length) % enabled.length];
        }
      }
      setFocusedIndex(nextIdx);
    };

    const activateItem = (item: ContextMenuItem) => {
      if (item.type === 'separator' || item.disabled) return;
      item.onClick?.();
      close();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          navigate('next');
          break;
        case 'ArrowUp':
          e.preventDefault();
          navigate('prev');
          break;
        case 'Home':
          e.preventDefault();
          navigate('first');
          break;
        case 'End':
          e.preventDefault();
          navigate('last');
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) activateItem(items[focusedIndex]);
          break;
        case 'Escape':
          e.preventDefault();
          close();
          break;
      }
    };

    // Clamp the menu within the viewport.
    const [clampedPos, setClampedPos] = useState(position);
    useLayoutEffect(() => {
      if (!isOpen) return;
      const menu = menuRef.current;
      if (!menu) {
        setClampedPos(position);
        return;
      }
      const rect = menu.getBoundingClientRect();
      const x = Math.min(position.x, window.innerWidth - rect.width - 8);
      const y = Math.min(position.y, window.innerHeight - rect.height - 8);
      setClampedPos({ x: Math.max(8, x), y: Math.max(8, y) });
    }, [isOpen, position]);

    const classes = [
      'context-menu-component',
      `context-menu-component--${variant}`,
      `context-menu-component--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <>
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className="context-menu-component__trigger"
          onContextMenu={handleContextMenu}
          {...rest}
        >
          {children}
        </div>

        {isOpen &&
          createPortal(
            <div
              ref={menuRef}
              id={menuId}
              role="menu"
              aria-label={ariaLabel}
              className={classes}
              style={{ left: clampedPos.x, top: clampedPos.y }}
              onKeyDown={handleKeyDown}
              tabIndex={-1}
            >
              {items.map((item, idx) => {
                if (item.type === 'separator') {
                  return (
                    <div key={idx} role="separator" className="context-menu-component__separator" />
                  );
                }
                const isFocused = idx === focusedIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    role="menuitem"
                    tabIndex={isFocused ? 0 : -1}
                    aria-disabled={item.disabled || undefined}
                    className={[
                      'context-menu-component__item',
                      item.danger && 'context-menu-component__item--danger',
                      item.disabled && 'context-menu-component__item--disabled',
                      isFocused && 'context-menu-component__item--focused',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    disabled={item.disabled}
                    onClick={() => activateItem(item)}
                    onMouseEnter={() => setFocusedIndex(idx)}
                    ref={(el) => {
                      if (isFocused && el) el.focus();
                    }}
                  >
                    {item.icon && (
                      <span className="context-menu-component__item-icon" aria-hidden="true">
                        {item.icon}
                      </span>
                    )}
                    <span className="context-menu-component__item-label">{item.label}</span>
                    {item.shortcut && (
                      <span className="context-menu-component__item-shortcut" aria-hidden="true">
                        {item.shortcut}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>,
            document.body,
          )}
      </>
    );
  },
);

ContextMenu.displayName = 'ContextMenu';
