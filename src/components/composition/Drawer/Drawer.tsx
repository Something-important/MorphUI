// Drawer.tsx
import React, { ReactNode, forwardRef, useEffect, useRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Drawer.css';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';
export type DrawerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;

  // Position
  position?: DrawerPosition;

  // Size
  size?: DrawerSize;
  width?: string | number; // Custom width for left/right
  height?: string | number; // Custom height for top/bottom

  // Styling
  color?: string;
  gradient?: string;
  textColor?: string;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

  // Backdrop
  backdrop?: boolean;
  backdropColor?: string;
  backdropBlur?: boolean;
  closeOnBackdropClick?: boolean;

  // Behavior
  closeOnEsc?: boolean;
  closeButton?: boolean;
  closeButtonIcon?: ReactNode;

  // Content
  title?: string;
  description?: string;
  header?: ReactNode;
  footer?: ReactNode;

  // Animation
  animated?: boolean;

  // Glassmorphism
  glassmorphism?: boolean;

  // Z-index
  zIndex?: number;

  // Accessibility
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      isOpen,
      onClose,
      children,
      position = 'right',
      size = 'md',
      width,
      height,
      color,
      gradient,
      textColor,
      backgroundColor,
      headerBackgroundColor,
      footerBackgroundColor,
      shadow = 'xl',
      backdrop = true,
      backdropColor,
      backdropBlur = false,
      closeOnBackdropClick = true,
      closeOnEsc = true,
      closeButton = true,
      closeButtonIcon,
      title,
      description,
      header,
      footer,
      animated = true,
      glassmorphism = false,
      zIndex = 1000,
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      id,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null);
    const previousActiveElement = useRef<HTMLElement | null>(null);

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
    const resolvedHeaderBackgroundColor = resolveThemeValue(headerBackgroundColor);
    const resolvedFooterBackgroundColor = resolveThemeValue(footerBackgroundColor);
    const resolvedBackdropColor = resolveThemeValue(backdropColor);

    // Check for gradients
    const isColorGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    // Handle ESC key
    useEffect(() => {
      if (!isOpen || !closeOnEsc) return;

      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, [isOpen, closeOnEsc, onClose]);

    // Focus management
    useEffect(() => {
      if (isOpen) {
        // Store previous active element
        previousActiveElement.current = document.activeElement as HTMLElement;

        // Focus drawer when opened
        if (drawerRef.current) {
          drawerRef.current.focus();
        }
      } else {
        // Restore focus when closed
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      }
    }, [isOpen]);

    // Prevent body scroll when drawer is open
    useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }

      return () => {
        document.body.style.overflow = '';
      };
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
      if (closeOnBackdropClick && e.target === e.currentTarget) {
        onClose();
      }
    };

    // Handle close button click
    const handleCloseClick = () => {
      onClose();
    };

    if (!isOpen) return null;

    // Classes
    const classes = [
      'drawer-component',
      `drawer-component--${position}`,
      `drawer-component--${size}`,
      shadow && `drawer-component--shadow-${shadow}`,
      animated && 'drawer-component--animated',
      glassmorphism && 'drawer-component--glassmorphism',
      isColorGradient && 'drawer-component--gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      zIndex,
      ...(position === 'left' || position === 'right'
        ? {
            width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
          }
        : {}),
      ...(position === 'top' || position === 'bottom'
        ? {
            height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
          }
        : {}),
      ...(resolvedGradient && {
        '--drawer-custom-bg': resolvedGradient,
        '--drawer-bg': resolvedGradient,
      }),
      ...(resolvedBackgroundColor &&
        !resolvedGradient && {
          '--drawer-custom-bg': resolvedBackgroundColor,
          '--drawer-bg': resolvedBackgroundColor,
        }),
      ...(resolvedColor &&
        !resolvedGradient &&
        !resolvedBackgroundColor && {
          '--drawer-custom-color': resolvedColor,
          '--drawer-color': resolvedColor,
        }),
      ...(resolvedTextColor && {
        '--drawer-custom-text-color': resolvedTextColor,
        '--drawer-text-color': resolvedTextColor,
      }),
      ...(resolvedHeaderBackgroundColor && {
        '--drawer-custom-header-bg': resolvedHeaderBackgroundColor,
        '--drawer-header-bg': resolvedHeaderBackgroundColor,
      }),
      ...(resolvedFooterBackgroundColor && {
        '--drawer-custom-footer-bg': resolvedFooterBackgroundColor,
        '--drawer-footer-bg': resolvedFooterBackgroundColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // Backdrop style
    const backdropStyle: React.CSSProperties = {
      backgroundColor: resolvedBackdropColor || 'rgba(0, 0, 0, 0.5)',
      backdropFilter: backdropBlur ? 'blur(8px)' : undefined,
    };

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || title || 'Drawer',
      describedBy: ariaDescribedBy || (description ? 'drawer-description' : undefined),
    });

    return (
      <>
        {/* Backdrop */}
        {backdrop && (
          <div
            className={`drawer-component__backdrop ${animated ? 'drawer-component__backdrop--animated' : ''}`}
            style={backdropStyle}
            onClick={handleBackdropClick}
            aria-hidden="true"
          />
        )}

        {/* Drawer */}
        <div
          ref={ref || drawerRef}
          id={id}
          className={classes}
          style={mergedStyle}
          role="dialog"
          aria-modal="true"
          aria-labelledby={ariaLabelledBy || (title ? 'drawer-title' : undefined)}
          aria-describedby={ariaDescribedBy || (description ? 'drawer-description' : undefined)}
          tabIndex={-1}
          {...ariaProps}
          {...rest}
        >
          {/* Close Button */}
          {closeButton && (
            <button
              type="button"
              className="drawer-component__close"
              onClick={handleCloseClick}
              aria-label="Close drawer"
            >
              {closeButtonIcon || '×'}
            </button>
          )}

          {/* Header */}
          {(title || header || description) && (
            <div className="drawer-component__header">
              {header || (
                <>
                  {title && (
                    <h2 id="drawer-title" className="drawer-component__title">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p id="drawer-description" className="drawer-component__description">
                      {description}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Content */}
          <div className="drawer-component__content">{children}</div>

          {/* Footer */}
          {footer && <div className="drawer-component__footer">{footer}</div>}
        </div>
      </>
    );
  },
);

Drawer.displayName = 'Drawer';
