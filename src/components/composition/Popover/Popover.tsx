import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Popover.css';

// Position types
export type PopoverPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'auto';

// Trigger types
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual';

// Content structure
export interface PopoverContent {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  actions?: Array<{
    label: string;
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    onClick?: () => void | Promise<void>;
    href?: string;
    target?: string;
    className?: string;
    style?: React.CSSProperties;
  }>;
}

// Main Popover Props
export interface PopoverProps {
  // Core props
  children: React.ReactNode;
  content: PopoverContent | React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  
  // Positioning
  position?: PopoverPosition;
  offset?: number;
  arrow?: boolean;
  autoPosition?: boolean;
  
  // Trigger behavior
  trigger?: PopoverTrigger;
  delay?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Advanced styling
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: string;
  
  // Content styling
  maxWidth?: string | number;
  minWidth?: string | number;
  maxHeight?: string | number;
  minHeight?: string | number;
  
  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;
  
  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
}

// Popover Component
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(({
  // Core props
  children,
  content,
  isOpen: controlledIsOpen,
  onOpenChange,
  
  // Positioning
  position = 'auto',
  offset = 8,
  arrow = true,
  autoPosition = true,
  
  // Trigger behavior
  trigger = 'click',
  delay = 0,
  closeOnClickOutside = true,
  closeOnEscape = true,
  
  // Styling
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  borderRadius,
  shadow = 'md',
  
  // Advanced styling
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend,
  
  // Content styling
  maxWidth,
  minWidth,
  maxHeight,
  minHeight,
  
  // Accessibility
  ariaLabel,
  ariaDescribedBy,
  id,
  
  // Styling overrides
  className = '',
  style,
  contentClassName = '',
  contentStyle,
  ...rest
}, ref) => {
  // Internal state
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<PopoverPosition>(position);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  
  
  // Content classes
  const contentClasses = [
    'popover-component__content',
    `popover-component__content--${variant}`,
    `popover-component__content--${size}`,
    `popover-component__content--${currentPosition}`,
    contentClassName
  ].filter(Boolean).join(' ');
  
  // Gradient detection
  const isBackgroundGradient = gradient && gradient.includes('gradient');
  const isTextGradient = textColor && textColor.includes('gradient');
  const isBorderGradient = borderColor && borderColor.includes('gradient');
  
  // Update classes with gradient modifiers
  const finalClasses = [
    'popover-component',
    `popover-component--${variant}`,
    `popover-component--${size}`,
    `popover-component--${currentPosition}`,
    isOpen && 'popover-component--open',
    isAnimating && 'popover-component--animating',
    arrow && 'popover-component--with-arrow',
    glassmorphism && 'popover-component--glassmorphism',
    isBackgroundGradient && 'popover-component--background-gradient',
    isTextGradient && 'popover-component--text-gradient',
    isBorderGradient && 'popover-component--border-gradient',
    className
  ].filter(Boolean).join(' ');
  
  // Component style object
  const componentStyle: React.CSSProperties = {
    ...(color && { '--popover-custom-color': color }),
    ...(gradient && { '--popover-custom-gradient': gradient }),
    ...(textColor && { '--popover-custom-text-color': textColor }),
    ...(textColor && isTextGradient && { '--popover-custom-text-gradient': textColor }),
    ...(borderColor && { '--popover-custom-border-color': borderColor }),
    ...(borderColor && isBorderGradient && { '--popover-custom-border-gradient': borderColor }),
    ...(borderRadius && { '--popover-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--popover-custom-shadow': resolveThemeValue(`shadow-${shadow}`) }),
    ...(backgroundPattern && { '--popover-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--popover-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--popover-custom-bg-blend': backgroundBlend }),
    ...(maxWidth && { '--popover-custom-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(minWidth && { '--popover-custom-min-width': typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(maxHeight && { '--popover-custom-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(minHeight && { '--popover-custom-min-height': typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
  } as React.CSSProperties;
  
  // Combine component style with user style
  const finalStyle: React.CSSProperties = {
    ...componentStyle,
    ...style,
  };
  
  // Content style
  const finalContentStyle: React.CSSProperties = {
    ...contentStyle,
  };
  
  // ARIA attributes
  const ariaProps = getAriaProps({
    label: ariaLabel || 'Popover',
    describedBy: ariaDescribedBy,
  });
  
  // Calculate position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !popoverRef.current || !autoPosition) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const popoverRect = popoverRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let newPosition = position;
    
    // Auto-positioning logic
    if (autoPosition && position === 'auto') {
      const space = {
        top: triggerRect.top,
        bottom: viewportHeight - triggerRect.bottom,
        left: triggerRect.left,
        right: viewportWidth - triggerRect.right,
      };
      
      if (space.bottom >= popoverRect.height + offset) {
        newPosition = 'bottom';
      } else if (space.top >= popoverRect.height + offset) {
        newPosition = 'top';
      } else if (space.right >= popoverRect.width + offset) {
        newPosition = 'right';
      } else if (space.left >= popoverRect.width + offset) {
        newPosition = 'left';
      } else {
        newPosition = 'bottom';
      }
    }
    
    if (newPosition !== currentPosition) {
      setCurrentPosition(newPosition);
    }
    
    // Apply positioning
    const styles: React.CSSProperties = {};
    
    switch (newPosition) {
      case 'top':
        styles.bottom = `${triggerRect.height + offset}px`;
        styles.left = `${triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2)}px`;
        break;
      case 'top-start':
        styles.bottom = `${triggerRect.height + offset}px`;
        styles.left = `${triggerRect.left}px`;
        break;
      case 'top-end':
        styles.bottom = `${triggerRect.height + offset}px`;
        styles.right = `${viewportWidth - triggerRect.right}px`;
        break;
      case 'bottom':
        styles.top = `${triggerRect.bottom + offset}px`;
        styles.left = `${triggerRect.left + (triggerRect.width / 2) - (popoverRect.width / 2)}px`;
        break;
      case 'bottom-start':
        styles.top = `${triggerRect.bottom + offset}px`;
        styles.left = `${triggerRect.left}px`;
        break;
      case 'bottom-end':
        styles.top = `${triggerRect.bottom + offset}px`;
        styles.right = `${viewportWidth - triggerRect.right}px`;
        break;
      case 'left':
        styles.top = `${triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2)}px`;
        styles.right = `${triggerRect.left + offset}px`;
        break;
      case 'left-start':
        styles.top = `${triggerRect.top}px`;
        styles.right = `${triggerRect.left + offset}px`;
        break;
      case 'left-end':
        styles.bottom = `${viewportHeight - triggerRect.bottom}px`;
        styles.right = `${triggerRect.left + offset}px`;
        break;
      case 'right':
        styles.top = `${triggerRect.top + (triggerRect.height / 2) - (popoverRect.height / 2)}px`;
        styles.left = `${triggerRect.right + offset}px`;
        break;
      case 'right-start':
        styles.top = `${triggerRect.top}px`;
        styles.left = `${triggerRect.right + offset}px`;
        break;
      case 'right-end':
        styles.bottom = `${viewportHeight - triggerRect.bottom}px`;
        styles.left = `${triggerRect.right + offset}px`;
        break;
    }
    
    // Ensure popover stays within viewport
    if (styles.left !== undefined && typeof styles.left === 'number' && styles.left < 0) {
      styles.left = offset;
    }
    if (styles.top !== undefined && typeof styles.top === 'number' && styles.top < 0) {
      styles.top = offset;
    }
    if (styles.right !== undefined && typeof styles.right === 'number' && styles.right < 0) {
      styles.right = offset;
    }
    if (styles.bottom !== undefined && typeof styles.bottom === 'number' && styles.bottom < 0) {
      styles.bottom = offset;
    }
    
    Object.assign(popoverRef.current.style, styles);
  }, [position, currentPosition, offset, autoPosition]);
  
  // Handle open/close
  const handleOpen = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(true);
    } else {
      setInternalIsOpen(true);
    }
    onOpenChange?.(true);
  }, [isControlled, onOpenChange]);
  
  const handleClose = useCallback(() => {
    if (isControlled) {
      onOpenChange?.(false);
    } else {
      setInternalIsOpen(false);
    }
    onOpenChange?.(false);
  }, [isControlled, onOpenChange]);
  
  // Trigger handlers
  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      if (isOpen) {
        handleClose();
      } else {
        handleOpen();
      }
    }
  }, [trigger, isOpen, handleOpen, handleClose]);
  
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      if (showTimeout) {
        clearTimeout(showTimeout);
        setShowTimeout(null);
      }
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      handleOpen();
    }
  }, [trigger, showTimeout, hideTimeout, handleOpen]);
  
  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      const timeout = setTimeout(() => {
        handleClose();
      }, delay);
      setHideTimeout(timeout);
    }
  }, [trigger, delay, handleClose]);
  
  const handleFocus = useCallback(() => {
    if (trigger === 'focus') {
      handleOpen();
    }
  }, [trigger, handleOpen]);
  
  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      const timeout = setTimeout(() => {
        handleClose();
      }, delay);
      setHideTimeout(timeout);
    }
  }, [trigger, delay, handleClose]);
  
  // Keyboard handlers
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      handleClose();
    }
  }, [closeOnEscape, handleClose]);
  
  // Click outside handler
  useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, handleClose]);
  
  // Position calculation effect
  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is ready
      const timeout = setTimeout(calculatePosition, 10);
      return () => clearTimeout(timeout);
    }
  }, [isOpen, calculatePosition]);
  
  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showTimeout, hideTimeout]);
  
  // Render content
  const renderContent = () => {
    if (content && typeof content === 'object' && 'body' in content) {
      const { header, body, footer, actions } = content as PopoverContent;
      
      return (
        <>
          {header && (
            <div className="popover-component__header">
              {header}
            </div>
          )}
          <div className="popover-component__body">
            {body}
          </div>
          {footer && (
            <div className="popover-component__footer">
              {footer}
            </div>
          )}
          {actions && (
            <div className="popover-component__actions">
              {Array.isArray(actions) ? (
                actions.map((action, index) => {
                  const isLink = action.href;
                  const Element = isLink ? 'a' : 'button';
                  
                  return (
                    <Element
                      key={index}
                      className={`popover-component__action popover-component__action--${action.variant || 'primary'} popover-component__action--${action.size || 'md'}`}
                      disabled={action.disabled}
                      onClick={action.onClick}
                      href={action.href}
                      target={action.target}
                      style={action.style}
                    >
                      {action.loading && (
                        <span className="popover-component__action-loader">
                          <svg className="popover-component__spinner" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite" />
                              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite" />
                            </circle>
                          </svg>
                        </span>
                      )}
                      {action.icon && <span className="popover-component__action-icon">{action.icon}</span>}
                      <span className="popover-component__action-label">{action.label}</span>
                    </Element>
                  );
                })
              ) : (
                actions
              )}
            </div>
          )}
        </>
      );
    }
    
    return <div className="popover-component__body">{content}</div>;
  };
  
  return (
    <div 
      ref={ref || triggerRef}
      className={finalClasses}
      style={finalStyle}
      onKeyDown={handleKeyDown}
      {...ariaProps}
      {...rest}
    >
      {/* Trigger */}
      <div
        className="popover-component__trigger"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={trigger === 'focus' ? 0 : undefined}
        role={trigger === 'focus' ? 'button' : undefined}
      >
        {children}
      </div>
      
      {/* Popover Content */}
      {isOpen && (
        <div
          ref={popoverRef}
          className={contentClasses}
          style={finalContentStyle}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel || 'Popover'}
          aria-describedby={ariaDescribedBy}
          id={id}
        >
          {/* Arrow */}
          {arrow && (
            <div
              ref={arrowRef}
              className={`popover-component__arrow popover-component__arrow--${currentPosition}`}
            />
          )}
          
          {/* Content */}
          {renderContent()}
        </div>
      )}
    </div>
  );
});

Popover.displayName = 'Popover';
