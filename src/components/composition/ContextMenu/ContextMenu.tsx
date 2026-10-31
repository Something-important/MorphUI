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
import { resolveThemeValue, getAriaProps } from '../../../utils';
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
  /** ID of the element that describes the menu panel. */
  ariaDescribedBy?: string;
  variant?: 'primary' | 'secondary' | 'default';
  size?: 'sm' | 'md' | 'lg';
  /** Theme overrides — literal CSS value, "var(--x)", or a theme key like "color-primary" */
  color?: string;
  /** Gradient override for the background — wins over `color` for the background slot. */
  gradient?: string;
  /** Text color override for the menu items. */
  textColor?: string;
  /** Border color override for the menu panel. */
  borderColor?: string;
  /** Border radius override (numbers are treated as px). */
  borderRadius?: string | number;
  /** Shadow token level applied to the menu panel. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Inline style override — merged last, wins over component-generated styles. */
  style?: React.CSSProperties;
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
      ariaDescribedBy,
      variant = 'default',
      size = 'md',
      color,
      gradient,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      className = '',
      style,
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

    // Resolve theme values (literal CSS value, "var(--x)", or theme key like "color-primary")
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);

    // Component style object writing the --context-menu-custom-* channel on the
    // menu panel. Gradient wins over color for the background slot; unset slots
    // are skipped.
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedGradient && { '--context-menu-custom-bg': resolvedGradient }),
      ...(resolvedColor && !resolvedGradient && { '--context-menu-custom-bg': resolvedColor }),
      ...(resolvedTextColor && {
        '--context-menu-custom-text-color': resolvedTextColor,
      }),
      ...(resolvedBorderColor && { '--context-menu-custom-border': resolvedBorderColor }),
      ...(borderRadius && {
        '--context-menu-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(shadow &&
        resolveThemeValue(`shadow-${shadow}`) && {
          '--context-menu-custom-shadow': resolveThemeValue(`shadow-${shadow}`)!,
        }),
    };

    // Explicitly merge with the user's style prop (user style takes precedence).
    // Positioning stays first so an explicit `left`/`top` in `style` still wins.
    const menuStyle = { left: clampedPos.x, top: clampedPos.y, ...componentStyle, ...style };

    // ARIA attributes for the menu panel
    const ariaProps = getAriaProps({ label: ariaLabel, describedBy: ariaDescribedBy });

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
              {...ariaProps}
              className={classes}
              style={menuStyle}
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
