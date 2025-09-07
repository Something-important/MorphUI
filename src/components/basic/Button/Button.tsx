// Button.tsx
import React, { ReactNode, ButtonHTMLAttributes, ElementType, forwardRef } from 'react';
import { resolveThemeValue, createRipple } from '../../../utils';
import './Button.css';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  rounded?: boolean;
  disabled?: boolean;
  loading?: boolean;
  ripple?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
  loadingText?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  fullWidth = false,
  disabled = false,
  as: Component = 'button',
  href,
  children,
  className = '',
  loadingText,
  rounded = false,
  color,
  gradient,
  textColor,
  borderColor,
  shadow = 'md',
  hoverEffect = 'lift',
  ripple = false,
  ...rest
}, ref) => {
  const isDisabled = disabled || loading;
  
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

  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  
  // Check if text color is a gradient
  const isTextGradient = textColor && (
    textColor.includes('linear-gradient') || 
    textColor.includes('radial-gradient') || 
    textColor.includes('conic-gradient')
  );
  
  const finalVariant = getVariantFromColor(color);

  const classes = [
    'btn-component',
    // Only apply variant class if no custom color/gradient is provided
    (!resolvedColor && !resolvedGradient) && `btn-component--${finalVariant}`,
    `btn-component--${size}`,
    fullWidth && 'btn-component--full-width',
    isDisabled && 'btn-component--disabled',
    loading && 'btn-component--loading',
    rounded && 'btn-component--rounded',
    `btn-component--shadow-${shadow}`,
    `btn-component--hover-${hoverEffect}`,
    ripple && 'btn-component--ripple',
    isTextGradient && 'btn-component--text-gradient',
    className,
  ].filter(Boolean).join(' ');

  // Style for color/gradient
  const style: React.CSSProperties = {
    ...(resolvedGradient && { 
      '--btn-custom-bg': resolvedGradient,
      '--btn-bg': resolvedGradient  // Override variant color
    }),
    ...(resolvedColor && { 
      '--btn-custom-bg': resolvedColor,
      '--btn-bg': resolvedColor  // Override variant color
    }),
    ...(resolvedTextColor && { 
      '--btn-custom-color': resolvedTextColor,
      '--btn-color': resolvedTextColor  // Override variant color
    }),
    ...(resolvedBorderColor && { 
      '--btn-custom-border': resolvedBorderColor,
      '--btn-border': resolvedBorderColor  // Override variant color
    }),
    ...rest.style,
  };

  // For anchor tag, add href and aria-disabled instead of disabled
  const componentProps = Component === 'a'
    ? { href, 'aria-disabled': isDisabled, tabIndex: isDisabled ? -1 : undefined }
    : { disabled: isDisabled };

  // Handle click with ripple effect
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple && !isDisabled) {
      const removeRipple = createRipple(event, {
        color: 'rgba(255, 255, 255, 0.3)',
        duration: 600
      });
      
      // Auto-cleanup after animation
      setTimeout(removeRipple, 600);
    }
    
    // Call original onClick if provided
    rest.onClick?.(event);
  };

  return (
    <Component 
      ref={Component === 'button' ? ref : undefined}
      className={classes} 
      style={style}
      onClick={handleClick}
      {...componentProps} 
      {...rest}
    >
      {loading && <span className="btn-component__spinner" aria-hidden="true" />}
      {iconLeft && (
        <span className="btn-component__icon btn-component__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {!loading && (
        <span className="btn-component__text">
          {children}
        </span>
      )}
      {loading && loadingText && (
        <span className="btn-component__text--loading">
          {loadingText}
        </span>
      )}
      {iconRight && (
        <span className="btn-component__icon btn-component__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Component>
  );
});

Button.displayName = 'Button';
