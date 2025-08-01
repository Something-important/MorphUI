// Button.tsx
import React, { ReactNode, ButtonHTMLAttributes, ElementType, forwardRef } from 'react';
import './Button.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  fullWidth?: boolean;
  as?: ElementType;
  href?: string;
  loadingText?: string;
  rounded?: boolean;
  color?: string; // Accepts CSS color, CSS variable, or theme key
  gradient?: string; // Accepts CSS gradient string or theme key
};

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
  ...rest
}, ref) => {
  const isDisabled = disabled || loading;
  const classes = [
    'btn-component',
    `btn-component--${variant}`,
    `btn-component--${size}`,
    fullWidth && 'btn-component--full-width',
    isDisabled && 'btn-component--disabled',
    rounded && 'btn-component--rounded',
    className,
  ].filter(Boolean).join(' ');

  // Style for color/gradient
  const style: React.CSSProperties = {
    ...(gradient
      ? { background: gradient, color: color || undefined }
      : color
      ? { background: color, color: '#fff' }
      : {}),
    ...rest.style,
  };

  // For anchor tag, add href and aria-disabled instead of disabled
  const componentProps = Component === 'a'
    ? { href, 'aria-disabled': isDisabled, tabIndex: isDisabled ? -1 : undefined }
    : { disabled: isDisabled };

  const displayText = loading && loadingText ? loadingText : children;

  return (
    <Component 
      ref={Component === 'button' ? ref : undefined}
      className={classes} 
      style={style}
      {...componentProps} 
      {...rest}
    >
      {loading && <span className="btn-component__spinner" aria-hidden="true" />}
      {iconLeft && !loading && (
        <span className="btn-component__icon btn-component__icon--left" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      <span className={loading ? 'btn-component__text--loading' : 'btn-component__text'}>
        {displayText}
      </span>
      {iconRight && !loading && (
        <span className="btn-component__icon btn-component__icon--right" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </Component>
  );
});

Button.displayName = 'Button';
