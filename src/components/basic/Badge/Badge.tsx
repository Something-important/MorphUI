// Badge.tsx
import React, { ReactNode, forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'light' | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  textColor?: string;
  borderColor?: string;
  rounded?: boolean;
  outlined?: boolean;
  dot?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  removable?: boolean;
  onRemove?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      color,
      textColor,
      borderColor,
      rounded = false,
      outlined = false,
      dot = false,
      icon,
      iconPosition = 'left',
      removable = false,
      onRemove,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);

    // Check if text color is a gradient
    const isTextGradient =
      textColor &&
      (textColor.includes('linear-gradient') ||
        textColor.includes('radial-gradient') ||
        textColor.includes('conic-gradient'));

    const classes = [
      'badge-component',
      `badge-component--${variant}`,
      `badge-component--${size}`,
      rounded && 'badge-component--rounded',
      outlined && 'badge-component--outlined',
      dot && 'badge-component--dot',
      removable && 'badge-component--removable',
      icon && `badge-component--icon-${iconPosition}`,
      isTextGradient && 'badge-component--text-gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && {
        '--badge-custom-bg': resolvedColor,
        '--badge-bg': resolvedColor, // Override variant color
      }),
      ...(resolvedTextColor && {
        '--badge-custom-color': resolvedTextColor,
        '--badge-color': resolvedTextColor, // Override variant color
      }),
      ...(resolvedBorderColor && {
        '--badge-custom-border': resolvedBorderColor,
        '--badge-border': resolvedBorderColor, // Override variant color
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    const handleRemove = (event: React.MouseEvent) => {
      event.stopPropagation();
      onRemove?.();
    };

    return (
      <span ref={ref} className={classes} style={mergedStyle} {...rest}>
        {dot && <span className="badge-component__dot" aria-hidden="true" />}
        {icon && iconPosition === 'left' && (
          <span className="badge-component__icon badge-component__icon--left" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="badge-component__content">{children}</span>
        {icon && iconPosition === 'right' && (
          <span className="badge-component__icon badge-component__icon--right" aria-hidden="true">
            {icon}
          </span>
        )}
        {removable && (
          <button
            type="button"
            className="badge-component__remove"
            onClick={handleRemove}
            aria-label="Remove badge"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M9 3L3 9M3 3L9 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </span>
    );
  },
);

Badge.displayName = 'Badge';
