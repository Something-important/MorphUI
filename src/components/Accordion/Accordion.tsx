import React, { ReactNode, forwardRef, useState, useRef, useEffect } from 'react';
import { resolveThemeValue, getAriaProps, createRipple } from '../../utils';
import './Accordion.css';

export interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  contentBackgroundColor?: string;
  titleTextColor?: string;
  descriptionTextColor?: string;
  iconColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale' | 'slide';
  rounded?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  animation?: 'slide' | 'fade' | 'scale' | 'none';
  animationDuration?: number;
  maxHeight?: string;
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
  className?: string;
  style?: React.CSSProperties;
  onToggle?: (isOpen: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(({
  title,
  children,
  defaultOpen = false,
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  backgroundColor,
  headerBackgroundColor,
  contentBackgroundColor,
  titleTextColor,
  descriptionTextColor,
  iconColor,
  shadow = 'sm',
  hoverEffect = 'none',
  rounded = false,
  bordered = true,
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'right',
  animation = 'slide',
  animationDuration = 300,
  maxHeight,
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend = 'normal',
  className = '',
  style,
  onToggle,
  onOpen,
  onClose,
  ...rest
}, ref) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
  const resolvedHeaderBackgroundColor = resolveThemeValue(headerBackgroundColor);
  const resolvedContentBackgroundColor = resolveThemeValue(contentBackgroundColor);
  const resolvedTitleTextColor = resolveThemeValue(titleTextColor);
  const resolvedDescriptionTextColor = resolveThemeValue(descriptionTextColor);
  const resolvedIconColor = resolveThemeValue(iconColor);

  // Auto-detect variant from color if it's a theme color
  const getVariantFromColor = (colorValue: string | undefined) => {
    if (!colorValue) return variant;
    
    // Check if it's a CSS value (starts with #, rgb, hsl, or linear-gradient)
    if (colorValue.startsWith('#') || colorValue.startsWith('rgb') || colorValue.startsWith('hsl') || colorValue.startsWith('linear-gradient')) {
      return variant;
    }
    
    // Check if it's a CSS variable (starts with --)
    if (colorValue.startsWith('--')) {
      return variant;
    }
    
    // Map theme color keys to variants
    const colorToVariant: Record<string, string> = {
      'color-success': 'success',
      'color-warning': 'warning',
      'color-danger': 'danger',
      'color-info': 'info',
      'color-secondary': 'secondary',
    };
    
    return colorToVariant[colorValue] || variant;
  };

  const finalVariant = getVariantFromColor(color);

  const classes = [
    'accordion-component',
    // Always apply variant class for CSS custom properties
    `accordion-component--${finalVariant}`,
    `accordion-component--${size}`,
    `accordion-component--shadow-${shadow}`,
    `accordion-component--hover-${hoverEffect}`,
    `accordion-component--icon-${iconPosition}`,
    `accordion-component--animation-${animation}`,
    rounded && 'accordion-component--rounded',
    bordered && 'accordion-component--bordered',
    disabled && 'accordion-component--disabled',
    loading && 'accordion-component--loading',
    isOpen && 'accordion-component--open',
    isAnimating && 'accordion-component--animating',
    glassmorphism && 'accordion-component--glassmorphism',
    className,
  ].filter(Boolean).join(' ');

  // Style for color/gradient and dimensions
  const componentStyle = {
    // Background color takes precedence over color and gradient
    ...(resolvedBackgroundColor && { '--accordion-custom-bg': resolvedBackgroundColor }),
    ...(resolvedBackgroundColor ? {} : resolvedGradient && { '--accordion-custom-bg': resolvedGradient }),
    ...(resolvedBackgroundColor ? {} : resolvedColor && { '--accordion-custom-bg': resolvedColor }),
    ...(resolvedTextColor && { '--accordion-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--accordion-custom-border': resolvedBorderColor }),
    ...(resolvedHeaderBackgroundColor && { '--accordion-custom-header-bg': resolvedHeaderBackgroundColor }),
    ...(resolvedContentBackgroundColor && { '--accordion-custom-content-bg': resolvedContentBackgroundColor }),
    ...(resolvedTitleTextColor && { '--accordion-custom-title-color': resolvedTitleTextColor }),
    ...(resolvedDescriptionTextColor && { '--accordion-custom-description-color': resolvedDescriptionTextColor }),
    ...(resolvedIconColor && { '--accordion-custom-icon-color': resolvedIconColor }),
    ...(maxHeight && { '--accordion-max-height': maxHeight }),
    ...(animationDuration && { '--accordion-animation-duration': `${animationDuration}ms` }),
    ...(backgroundPattern && { '--accordion-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--accordion-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--accordion-custom-bg-blend': backgroundBlend }),
  };

  // Combine component style with user style
  const finalStyle: React.CSSProperties = {
    ...componentStyle,
    ...style,
  };

  // Generate unique ID for content if not exists
  useEffect(() => {
    if (contentRef.current && !contentRef.current.id) {
      contentRef.current.id = `accordion-content-${Math.random().toString(36).substr(2, 9)}`;
    }
  }, []);

  // ARIA attributes
  const ariaProps = getAriaProps({
    label: title,
    expanded: isOpen,
    disabled,
    hasPopup: 'dialog',
  });

  // Handle toggle with animation
  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;

    // Create ripple effect
    const removeRipple = createRipple(e, {
      color: 'rgba(59, 130, 246, 0.3)',
      duration: 600
    });

    // Auto-cleanup after animation
    setTimeout(removeRipple, 600);

    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
    
    // Call callbacks
    onToggle?.(newIsOpen);
    if (newIsOpen) {
      onOpen?.();
    } else {
      onClose?.();
    }

    // Handle animation
    if (animation !== 'none') {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), animationDuration);
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || loading) return;

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleToggle(e as any);
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          handleToggle(e as any);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          handleToggle(e as any);
        }
        break;
    }
  };

  // Focus management
  useEffect(() => {
    if (isOpen && contentRef.current) {
      // Focus first focusable element in content when opening
      const firstFocusable = contentRef.current.querySelector(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
      }
    }
  }, [isOpen]);

  // Default icon
  const defaultIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="accordion-component__default-icon"
    >
      {isOpen ? (
        <path d="M4 10L8 6L12 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      ) : (
        <path d="M6 8L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      )}
    </svg>
  );

  const displayIcon = icon || defaultIcon;

  return (
    <div
      ref={ref}
      className={classes}
      style={finalStyle}
      {...rest}
    >
      {/* Header/Button */}
      <button
        ref={buttonRef}
        className="accordion-component__header"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentRef.current?.id || `accordion-content-${Math.random().toString(36).substr(2, 9)}`}
        disabled={disabled || loading}
        tabIndex={disabled || loading ? -1 : 0}
      >
        <div className="accordion-component__title">
          {iconPosition === 'left' && displayIcon}
          <span className="accordion-component__title-text">{title}</span>
          {iconPosition === 'right' && displayIcon}
        </div>
        
        {/* Loading spinner */}
        {loading && (
          <div className="accordion-component__loading-spinner">
            <div className="accordion-component__spinner"></div>
          </div>
        )}
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        className="accordion-component__content"
        aria-hidden={!isOpen}
        style={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <div className="accordion-component__content-inner">
          {children}
        </div>
      </div>
    </div>
  );
});

Accordion.displayName = 'Accordion';
