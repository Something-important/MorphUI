// Alert.tsx
import React, { forwardRef, useEffect, useState, useRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Alert.css';

export type AlertPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface AlertProps {
  children: React.ReactNode;
  title?: React.ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  position?: AlertPosition;

  // Visibility
  open?: boolean;
  defaultOpen?: boolean;
  onClose?: () => void;

  // Auto-dismiss
  dismissible?: boolean;
  autoDismiss?: boolean;
  dismissDuration?: number; // milliseconds

  // Styling
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  // Icon
  icon?: React.ReactNode;
  showIcon?: boolean;
  customIcon?: React.ReactNode;

  // Animation
  animation?: 'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down';

  // Actions
  action?: React.ReactNode;
  onActionClick?: () => void;

  // Advanced styling
  glassmorphism?: boolean;
  fullWidth?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      children,
      title,
      variant = 'info',
      size = 'md',
      position = 'top-right',

      // Visibility
      open: controlledOpen,
      defaultOpen = true,
      onClose,

      // Auto-dismiss
      dismissible = true,
      autoDismiss = false,
      dismissDuration = 5000,

      // Styling
      color,
      gradient,
      textColor,
      borderColor,
      backgroundColor,
      backgroundGradient,
      borderRadius,
      shadow = 'md',

      // Icon
      icon,
      showIcon = true,
      customIcon,

      // Animation
      animation = 'fade',

      // Actions
      action,
      onActionClick,

      // Advanced styling
      glassmorphism = false,
      fullWidth = false,

      // Accessibility
      ariaLabel,
      ariaDescribedBy,
      id,

      // Styling overrides
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const [isAnimating, setIsAnimating] = useState(false);
    const dismissTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const alertRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
    const resolvedBackgroundGradient = resolveThemeValue(backgroundGradient);

    // Determine background (gradient > backgroundColor > color)
    const finalBackground =
      resolvedBackgroundGradient || resolvedGradient || resolvedBackgroundColor || resolvedColor;

    // Check for gradients
    const isBackgroundGradient =
      finalBackground &&
      (finalBackground.includes('linear-gradient') ||
        finalBackground.includes('radial-gradient') ||
        finalBackground.includes('conic-gradient'));

    const isTextGradient =
      resolvedTextColor &&
      (resolvedTextColor.includes('linear-gradient') ||
        resolvedTextColor.includes('radial-gradient') ||
        resolvedTextColor.includes('conic-gradient'));

    // Handle close
    const handleClose = () => {
      if (isAnimating) return;

      setIsAnimating(true);
      // Wait for animation to complete
      setTimeout(() => {
        if (!isControlled) {
          setInternalOpen(false);
        }
        setIsAnimating(false);
        onClose?.();
      }, 300); // Animation duration
    };

    // Auto-dismiss effect
    useEffect(() => {
      if (autoDismiss && isOpen && !isAnimating) {
        dismissTimeoutRef.current = setTimeout(() => {
          handleClose();
        }, dismissDuration);

        return () => {
          if (dismissTimeoutRef.current) {
            clearTimeout(dismissTimeoutRef.current);
          }
        };
      }
    }, [autoDismiss, isOpen, dismissDuration, isAnimating, handleClose]);

    // Default icons by variant
    const getDefaultIcon = () => {
      if (customIcon) return customIcon;
      if (!showIcon) return null;

      const icons = {
        success: '✓',
        error: '×',
        warning: '!',
        info: 'i',
        primary: '•',
        secondary: '•',
      };

      return icon || icons[variant] || null;
    };

    const defaultIcon = getDefaultIcon();

    // Classes
    const classes = [
      'alert-component',
      `alert-component--${variant}`,
      `alert-component--${size}`,
      `alert-component--${position}`,
      `alert-component--${animation}`,
      isOpen && !isAnimating && 'alert-component--open',
      isAnimating && 'alert-component--animating',
      isBackgroundGradient && 'alert-component--background-gradient',
      isTextGradient && 'alert-component--text-gradient',
      glassmorphism && 'alert-component--glassmorphism',
      fullWidth && 'alert-component--full-width',
      dismissible && 'alert-component--dismissible',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      // Background: backgroundGradient > gradient > backgroundColor > color (gradients take precedence)
      ...(resolvedBackgroundGradient && {
        '--alert-custom-bg': resolvedBackgroundGradient,
        '--alert-bg': resolvedBackgroundGradient,
      }),
      ...(resolvedGradient &&
        !resolvedBackgroundGradient && {
          '--alert-custom-bg': resolvedGradient,
          '--alert-bg': resolvedGradient,
        }),
      ...(resolvedBackgroundColor &&
        !resolvedBackgroundGradient &&
        !resolvedGradient && {
          '--alert-custom-bg': resolvedBackgroundColor,
          '--alert-bg': resolvedBackgroundColor,
        }),
      ...(resolvedColor &&
        !resolvedBackgroundGradient &&
        !resolvedGradient &&
        !resolvedBackgroundColor && {
          '--alert-custom-bg': resolvedColor,
          '--alert-bg': resolvedColor,
        }),

      // Text and border colors
      ...(resolvedTextColor && {
        '--alert-custom-color': resolvedTextColor,
        '--alert-color': resolvedTextColor,
      }),
      ...(resolvedBorderColor && {
        '--alert-custom-border': resolvedBorderColor,
        '--alert-border': resolvedBorderColor,
      }),

      // Other styling
      ...(borderRadius && {
        '--alert-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(shadow &&
        resolveThemeValue(`shadow-${shadow}`) && {
          '--alert-custom-shadow': resolveThemeValue(`shadow-${shadow}`)!,
        }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || (title ? String(title) : 'Alert'),
      describedBy: ariaDescribedBy,
    });

    // Don't render if not open
    if (!isOpen && !isAnimating) {
      return null;
    }

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
          if (alertRef.current !== node) {
            (alertRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }
        }}
        id={id}
        className={classes}
        style={mergedStyle}
        role="alert"
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
        {...ariaProps}
        {...rest}
      >
        {/* Icon */}
        {defaultIcon && (
          <div className="alert-component__icon" aria-hidden="true">
            {defaultIcon}
          </div>
        )}

        {/* Content */}
        <div className="alert-component__content">
          {title && (
            <div className="alert-component__title" role="heading" aria-level={2}>
              {title}
            </div>
          )}
          <div className="alert-component__message">{children}</div>
        </div>

        {/* Action */}
        {action && (
          <div className="alert-component__action">
            <button
              type="button"
              className="alert-component__action-button"
              onClick={onActionClick}
              aria-label="Alert action"
            >
              {action}
            </button>
          </div>
        )}

        {/* Dismiss button */}
        {dismissible && (
          <button
            type="button"
            className="alert-component__dismiss"
            onClick={handleClose}
            aria-label="Close alert"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = 'Alert';
