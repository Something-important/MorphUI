import React, { forwardRef, useState, useEffect, useRef, useCallback } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Tooltip.css';

// Position types
export type TooltipPosition = 
  | 'top' | 'top-start' | 'top-end'
  | 'bottom' | 'bottom-start' | 'bottom-end'
  | 'left' | 'left-start' | 'left-end'
  | 'right' | 'right-start' | 'right-end'
  | 'auto';

// Trigger types
export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'manual';

// Content types
export type TooltipContent = string | React.ReactNode;

// Main Tooltip Props
export interface TooltipProps {
  // Core props
  children: React.ReactNode;
  content: TooltipContent;
  isVisible?: boolean;
  onVisibilityChange?: (isVisible: boolean) => void;
  
  // Positioning
  position?: TooltipPosition;
  offset?: number;
  arrow?: boolean;
  autoPosition?: boolean;
  
  // Trigger behavior
  trigger?: TooltipTrigger;
  delay?: number;
  hideDelay?: number;
  closeOnClickOutside?: boolean;
  closeOnEscape?: boolean;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  textGradient?: string;
  borderColor?: string;
  borderGradient?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  arrowColor?: string;
  arrowGradient?: string;
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
  
  // Behavior
  persistent?: boolean;
  interactive?: boolean;
  multiline?: boolean;
  
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

// Tooltip Component
export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(({
  // Core props
  children,
  content,
  isVisible: controlledIsVisible,
  onVisibilityChange,
  
  // Positioning
  position = 'auto',
  offset = 8,
  arrow = true,
  autoPosition = true,
  
  // Trigger behavior
  trigger = 'hover',
  delay = 200,
  hideDelay = 0,
  closeOnClickOutside = true,
  closeOnEscape = true,
  
  // Styling
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  textGradient,
  borderColor,
  borderGradient,
  backgroundColor,
  backgroundGradient,
  arrowColor,
  arrowGradient,
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
  
  // Behavior
  persistent = false,
  interactive = false,
  multiline = false,
  
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
  const [internalIsVisible, setInternalIsVisible] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<TooltipPosition>(position);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTimeout, setShowTimeout] = useState<NodeJS.Timeout | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = controlledIsVisible !== undefined;
  const isVisible = isControlled ? controlledIsVisible : internalIsVisible;
  
  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedTextGradient = resolveThemeValue(textGradient);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedBorderGradient = resolveThemeValue(borderGradient);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
  const resolvedBackgroundGradient = resolveThemeValue(backgroundGradient);
  const resolvedArrowColor = resolveThemeValue(arrowColor);
  const resolvedArrowGradient = resolveThemeValue(arrowGradient);
  
  // Determine final values with proper precedence (gradients override colors)
  const finalBackground = resolvedBackgroundGradient || resolvedBackgroundColor;
  const finalTextColor = resolvedTextGradient || resolvedTextColor;
  const finalBorderColor = resolvedBorderGradient || resolvedBorderColor;
  const finalArrowColor = resolvedArrowGradient || resolvedArrowColor;
  
  // Gradient detection
  const isTextGradient = finalTextColor && (
    finalTextColor.includes('linear-gradient') || 
    finalTextColor.includes('radial-gradient') || 
    finalTextColor.includes('conic-gradient')
  );
  const isBorderGradient = finalBorderColor && (
    finalBorderColor.includes('linear-gradient') || 
    finalBorderColor.includes('radial-gradient') || 
    finalBorderColor.includes('conic-gradient')
  );
  const isBackgroundGradient = finalBackground && (
    finalBackground.includes('linear-gradient') || 
    finalBackground.includes('radial-gradient') || 
    finalBackground.includes('conic-gradient')
  );
  const isArrowGradient = finalArrowColor && (
    finalArrowColor.includes('linear-gradient') || 
    finalArrowColor.includes('radial-gradient') || 
    finalArrowColor.includes('conic-gradient')
  );
  
  // Generate CSS classes
  const classes = [
    'tooltip-component',
    `tooltip-component--${variant}`,
    `tooltip-component--${size}`,
    `tooltip-component--${currentPosition}`,
    isVisible && 'tooltip-component--visible',
    isAnimating && 'tooltip-component--animating',
    arrow && 'tooltip-component--with-arrow',
    glassmorphism && 'tooltip-component--glassmorphism',
    interactive && 'tooltip-component--interactive',
    multiline && 'tooltip-component--multiline',
    isTextGradient && 'tooltip-component--text-gradient',
    isBorderGradient && 'tooltip-component--border-gradient',
    isBackgroundGradient && 'tooltip-component--background-gradient',
    isArrowGradient && 'tooltip-component--arrow-gradient',
    className
  ].filter(Boolean).join(' ');
  
  // Content classes
  const contentClasses = [
    'tooltip-component__content',
    `tooltip-component__content--${variant}`,
    `tooltip-component__content--${size}`,
    `tooltip-component__content--${currentPosition}`,
    contentClassName
  ].filter(Boolean).join(' ');
  
  // Component style object
  const componentStyle: React.CSSProperties = {
    // Legacy color support (for backward compatibility)
    ...(resolvedColor && { '--tooltip-custom-color': resolvedColor }),
    ...(resolvedGradient && { '--tooltip-custom-gradient': resolvedGradient }),
    
    // Background colors and gradients
    ...(finalBackground && { '--tooltip-custom-bg': finalBackground }),
    
    // Text colors and gradients
    ...(finalTextColor && { '--tooltip-custom-text-color': finalTextColor }),
    
    // Border colors and gradients
    ...(finalBorderColor && { '--tooltip-custom-border-color': finalBorderColor }),
    
    // Arrow colors and gradients
    ...(finalArrowColor && { '--tooltip-custom-arrow-color': finalArrowColor }),
    
    // Other styling properties
    ...(borderRadius && { '--tooltip-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--tooltip-custom-shadow': resolveThemeValue(`shadow-${shadow}`) }),
    ...(backgroundPattern && { '--tooltip-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--tooltip-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--tooltip-custom-bg-blend': backgroundBlend }),
    ...(maxWidth && { '--tooltip-custom-max-width': typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth }),
    ...(minWidth && { '--tooltip-custom-min-width': typeof minWidth === 'number' ? `${minWidth}px` : minWidth }),
    ...(maxHeight && { '--tooltip-custom-max-height': typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight }),
    ...(minHeight && { '--tooltip-custom-min-height': typeof minHeight === 'number' ? `${minHeight}px` : minHeight }),
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
    label: ariaLabel || 'Tooltip',
    describedBy: ariaDescribedBy,
  });
  
  // Calculate position
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current || !autoPosition) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
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
      
      if (space.bottom >= tooltipRect.height + offset) {
        newPosition = 'bottom';
      } else if (space.top >= tooltipRect.height + offset) {
        newPosition = 'top';
      } else if (space.right >= tooltipRect.width + offset) {
        newPosition = 'right';
      } else if (space.left >= tooltipRect.width + offset) {
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
        styles.bottom = `${viewportHeight - triggerRect.top + offset}px`;
        styles.left = `${triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)}px`;
        break;
      case 'top-start':
        styles.bottom = `${viewportHeight - triggerRect.top + offset}px`;
        styles.left = `${triggerRect.left}px`;
        break;
      case 'top-end':
        styles.bottom = `${viewportHeight - triggerRect.top + offset}px`;
        styles.right = `${viewportWidth - triggerRect.right}px`;
        break;
      case 'bottom':
        styles.top = `${triggerRect.bottom + offset}px`;
        styles.left = `${triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2)}px`;
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
        styles.top = `${triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)}px`;
        styles.right = `${viewportWidth - triggerRect.left + offset}px`;
        break;
      case 'left-start':
        styles.top = `${triggerRect.top}px`;
        styles.right = `${viewportWidth - triggerRect.left + offset}px`;
        break;
      case 'left-end':
        styles.bottom = `${viewportHeight - triggerRect.bottom}px`;
        styles.right = `${viewportWidth - triggerRect.left + offset}px`;
        break;
      case 'right':
        styles.top = `${triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2)}px`;
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
    
    // Ensure tooltip stays within viewport
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
    
    Object.assign(tooltipRef.current.style, styles);
  }, [position, currentPosition, offset, autoPosition]);
  
  // Handle show/hide
  const handleShow = useCallback(() => {
    if (isControlled) {
      onVisibilityChange?.(true);
    } else {
      setInternalIsVisible(true);
    }
    onVisibilityChange?.(true);
  }, [isControlled, onVisibilityChange]);
  
  const handleHide = useCallback(() => {
    if (isControlled) {
      onVisibilityChange?.(false);
    } else {
      setInternalIsVisible(false);
    }
    onVisibilityChange?.(false);
  }, [isControlled, onVisibilityChange]);
  
  // Trigger handlers
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
        setHideTimeout(null);
      }
      const timeout = setTimeout(() => {
        handleShow();
      }, delay);
      setShowTimeout(timeout);
    }
  }, [trigger, hideTimeout, delay, handleShow]);
  
  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') {
      if (showTimeout) {
        clearTimeout(showTimeout);
        setShowTimeout(null);
      }
      if (!persistent) {
        const timeout = setTimeout(() => {
          handleHide();
        }, hideDelay);
        setHideTimeout(timeout);
      }
    }
  }, [trigger, showTimeout, hideDelay, persistent, handleHide]);
  
  const handleFocus = useCallback(() => {
    if (trigger === 'focus') {
      handleShow();
    }
  }, [trigger, handleShow]);
  
  const handleBlur = useCallback(() => {
    if (trigger === 'focus') {
      if (!persistent) {
        const timeout = setTimeout(() => {
          handleHide();
        }, hideDelay);
        setHideTimeout(timeout);
      }
    }
  }, [trigger, hideDelay, persistent, handleHide]);
  
  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      if (isVisible) {
        handleHide();
      } else {
        handleShow();
      }
    }
  }, [trigger, isVisible, handleShow, handleHide]);
  
  // Keyboard handlers
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && closeOnEscape) {
      handleHide();
    }
  }, [closeOnEscape, handleHide]);
  
  // Click outside handler
  useEffect(() => {
    if (!isVisible || !closeOnClickOutside || !interactive) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        handleHide();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isVisible, closeOnClickOutside, interactive, handleHide]);
  
  // Position calculation effect
  useEffect(() => {
    if (isVisible) {
      // Small delay to ensure DOM is ready
      const timeout = setTimeout(calculatePosition, 10);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, calculatePosition]);
  
  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
    };
  }, [showTimeout, hideTimeout]);
  
  // Render content
  const renderContent = () => {
    if (typeof content === 'string') {
      return <span>{content}</span>;
    }
    return content;
  };
  
  return (
    <div 
      ref={ref || triggerRef}
      className={classes}
      style={finalStyle}
      onKeyDown={handleKeyDown}
      {...ariaProps}
      {...rest}
    >
      {/* Trigger */}
      <div
        className="tooltip-component__trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onClick={handleClick}
        tabIndex={trigger === 'focus' ? 0 : undefined}
        role={trigger === 'focus' || trigger === 'click' ? 'button' : undefined}
      >
        {children}
      </div>
      
      {/* Tooltip Content */}
      {isVisible && (
        <div
          ref={tooltipRef}
          className={contentClasses}
          style={finalContentStyle}
          role="tooltip"
          aria-hidden="false"
          aria-label={ariaLabel || 'Tooltip'}
          aria-describedby={ariaDescribedBy}
          id={id}
        >
          {/* Arrow */}
          {arrow && (
            <div
              ref={arrowRef}
              className={`tooltip-component__arrow tooltip-component__arrow--${currentPosition}`}
            />
          )}
          
          {/* Content */}
          <div className="tooltip-component__content-inner">
            {renderContent()}
          </div>
        </div>
      )}
    </div>
  );
});

Tooltip.displayName = 'Tooltip';
