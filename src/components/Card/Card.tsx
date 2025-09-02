import React, { ReactNode, forwardRef } from 'react';
import { resolveThemeValue, getAriaProps, createRipple } from '../../utils';
import './Card.css';

export interface CardProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale' | 'slide';
  rounded?: boolean;
  bordered?: boolean;
  clickable?: boolean;
  loading?: boolean;
  disabled?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: 'top' | 'bottom' | 'left' | 'right';
  badge?: ReactNode;
  actions?: ReactNode;
  maxWidth?: string;
  minHeight?: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({
  children,
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  backgroundColor,
  shadow = 'md',
  hoverEffect = 'none',
  rounded = false,
  bordered = true,
  clickable = false,
  loading = false,
  disabled = false,
  header,
  footer,
  title,
  subtitle,
  description,
  image,
  imageAlt,
  imagePosition = 'top',
  badge,
  actions,
  maxWidth,
  minHeight,
  className = '',
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  ...rest
}, ref) => {
  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);

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
    'card-component',
    // Always apply variant class for CSS custom properties
    `card-component--${finalVariant}`,
    `card-component--${size}`,
    `card-component--shadow-${shadow}`,
    `card-component--hover-${hoverEffect}`,
    `card-component--image-${imagePosition}`,
    rounded && 'card-component--rounded',
    bordered && 'card-component--bordered',
    clickable && 'card-component--clickable',
    loading && 'card-component--loading',
    disabled && 'card-component--disabled',
    className,
  ].filter(Boolean).join(' ');

  // Style for color/gradient and dimensions
  const componentStyle: React.CSSProperties = {
    ...(resolvedGradient && { '--card-custom-bg': resolvedGradient }),
    ...(resolvedColor && { '--card-custom-bg': resolvedColor }),
    ...(resolvedTextColor && { '--card-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--card-custom-border': resolvedBorderColor }),
    ...(resolvedBackgroundColor && { '--card-custom-bg': resolvedBackgroundColor }),
    ...(maxWidth && { maxWidth }),
    ...(minHeight && { minHeight }),
    ...style,
  };

  // ARIA attributes
  const ariaProps = getAriaProps({
    label: title || 'Card',
    describedBy: description ? 'card-description' : undefined,
    role: clickable ? 'button' : undefined,
    disabled,
    hasPopup: clickable ? 'dialog' : undefined,
  });

  // Handle click with ripple effect
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || loading || !clickable || !onClick) return;

    if (clickable) {
      const removeRipple = createRipple(e, {
        color: 'rgba(59, 130, 246, 0.3)',
        duration: 600
      });
      
      // Auto-cleanup after animation
      setTimeout(removeRipple, 600);
    }
    
    onClick();
  };

  // Handle mouse events
  const handleMouseEnter = () => {
    if (disabled || loading) return;
    onMouseEnter?.();
  };

  const handleMouseLeave = () => {
    if (disabled || loading) return;
    onMouseLeave?.();
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={componentStyle}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={clickable && !disabled ? 0 : undefined}
      {...ariaProps}
      {...rest}
    >
      {/* Badge */}
      {badge && (
        <div className="card-component__badge">
          {badge}
        </div>
      )}

      {/* Image */}
      {image && (
        <div className="card-component__image">
          <img src={image} alt={imageAlt || 'Card image'} />
        </div>
      )}

      {/* Header */}
      {(header || title || subtitle) && (
        <div className="card-component__header">
          {header || (
            <>
              {title && (
                <h3 className="card-component__title">
                  {title}
                </h3>
              )}
              {subtitle && (
                <h4 className="card-component__subtitle">
                  {subtitle}
                </h4>
              )}
            </>
          )}
        </div>
      )}

      {/* Description */}
      {description && (
        <div className="card-component__description" id="card-description">
          {description}
        </div>
      )}

      {/* Content */}
      <div className="card-component__content">
        {children}
      </div>

      {/* Actions */}
      {actions && (
        <div className="card-component__actions">
          {actions}
        </div>
      )}

      {/* Footer */}
      {footer && (
        <div className="card-component__footer">
          {footer}
        </div>
      )}

      {/* Loading overlay */}
      {loading && (
        <div className="card-component__loading-overlay">
          <div className="card-component__loading-spinner"></div>
        </div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
