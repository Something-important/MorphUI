import React, { ReactNode, forwardRef, useEffect, useRef } from 'react';
import { resolveThemeValue, getAriaProps, createRipple } from '../../../utils';
import './Modal.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  headerBackgroundColor?: string;
  footerBackgroundColor?: string;
  contentBackgroundColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backdrop?: 'blur' | 'dark' | 'light' | 'none';
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  animation?: 'fade' | 'slide' | 'scale' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right';
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnFocusLoss?: boolean;
  showCloseButton?: boolean;
  closeButtonText?: string;
  closeButtonIcon?: ReactNode;
  title?: string;
  description?: string;
  header?: ReactNode;
  footer?: ReactNode;
  fullscreen?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  maxWidth?: string;
  maxHeight?: string;
  minWidth?: string;
  minHeight?: string;
  zIndex?: number;
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
  className?: string;
  style?: React.CSSProperties;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
}

export const Modal = forwardRef<HTMLDivElement, ModalProps>(({
  isOpen,
  onClose,
  children,
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  backgroundColor,
  headerBackgroundColor,
  footerBackgroundColor,
  contentBackgroundColor,
  shadow = 'lg',
  backdrop = 'dark',
  position = 'center',
  animation = 'fade',
  closeOnEsc = true,
  closeOnOverlayClick = true,
  closeOnFocusLoss = false,
  showCloseButton = true,
  closeButtonText = 'Close',
  closeButtonIcon,
  title,
  description,
  header,
  footer,
  fullscreen = false,
  draggable = false,
  resizable = false,
  maxWidth,
  maxHeight,
  minWidth,
  minHeight,
  zIndex,
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend = 'normal',
  className = '',
  style,
  ariaLabelledBy,
  ariaDescribedBy,
  ...rest
}, ref) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const modalStart = useRef({ x: 0, y: 0 });

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
  const resolvedHeaderBackgroundColor = resolveThemeValue(headerBackgroundColor);
  const resolvedFooterBackgroundColor = resolveThemeValue(footerBackgroundColor);
  const resolvedContentBackgroundColor = resolveThemeValue(contentBackgroundColor);

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

  // Detect gradients for CSS class application
  const isBackgroundGradient = (resolvedGradient || resolvedColor || resolvedBackgroundColor) && (
    (resolvedGradient && (resolvedGradient.includes('linear-gradient') || resolvedGradient.includes('radial-gradient') || resolvedGradient.includes('conic-gradient'))) ||
    (resolvedColor && (resolvedColor.includes('linear-gradient') || resolvedColor.includes('radial-gradient') || resolvedColor.includes('conic-gradient'))) ||
    (resolvedBackgroundColor && (resolvedBackgroundColor.includes('linear-gradient') || resolvedBackgroundColor.includes('radial-gradient') || resolvedBackgroundColor.includes('conic-gradient')))
  );
  
  const isTextGradient = resolvedTextColor && (
    resolvedTextColor.includes('linear-gradient') || 
    resolvedTextColor.includes('radial-gradient') || 
    resolvedTextColor.includes('conic-gradient')
  );
  
  const isBorderGradient = resolvedBorderColor && (
    resolvedBorderColor.includes('linear-gradient') || 
    resolvedBorderColor.includes('radial-gradient') || 
    resolvedBorderColor.includes('conic-gradient')
  );

  const classes = [
    'modal-component',
    // Always apply variant class for CSS custom properties
    `modal-component--${finalVariant}`,
    `modal-component--${size}`,
    `modal-component--${position}`,
    `modal-component--${animation}`,
    `modal-component--backdrop-${backdrop}`,
    `modal-component--shadow-${shadow}`,
    fullscreen && 'modal-component--fullscreen',
    draggable && 'modal-component--draggable',
    resizable && 'modal-component--resizable',
    glassmorphism && 'modal-component--glassmorphism',
    backgroundPattern && 'modal-component--pattern',
    backgroundImage && 'modal-component--image-bg',
    isBackgroundGradient && 'modal-component--background-gradient',
    isTextGradient && 'modal-component--text-gradient',
    isBorderGradient && 'modal-component--border-gradient',
    className,
  ].filter(Boolean).join(' ');

  // Determine the final background value with proper precedence
  const finalBackground = resolvedGradient || resolvedColor || resolvedBackgroundColor;
  
  // Style for color/gradient and dimensions
  const componentStyle: React.CSSProperties = {
    ...(resolvedTextColor && { '--modal-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--modal-custom-border': resolvedBorderColor }),
    // Apply the final background value
    ...(finalBackground && { '--modal-custom-bg': finalBackground }),
    ...(resolvedHeaderBackgroundColor && { '--modal-custom-header-bg': resolvedHeaderBackgroundColor }),
    ...(resolvedFooterBackgroundColor && { '--modal-custom-footer-bg': resolvedFooterBackgroundColor }),
    ...(resolvedContentBackgroundColor && { '--modal-custom-content-bg': resolvedContentBackgroundColor }),
    ...(backgroundPattern && { '--modal-pattern': backgroundPattern }),
    ...(backgroundImage && { '--modal-bg-image': backgroundImage }),
    ...(backgroundBlend && { '--modal-bg-blend': backgroundBlend }),
    ...(maxWidth && { maxWidth }),
    ...(maxHeight && { maxHeight }),
    ...(minWidth && { minWidth }),
    ...(minHeight && { minHeight }),
    ...(zIndex && { zIndex }),
    ...style,
  };

  // ARIA attributes for overlay
  const overlayAriaProps = getAriaProps({
    label: title || 'Modal dialog',
    describedBy: ariaDescribedBy || (description ? 'modal-description' : undefined),
    hasPopup: 'dialog',
  });

  // Handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === overlayRef.current) {
      onClose();
    }
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (closeOnEsc && e.key === 'Escape') {
      onClose();
    }
  };

  // Handle focus loss
  useEffect(() => {
    if (!closeOnFocusLoss || !isOpen) return;

    const handleFocusLoss = (e: FocusEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('focusout', handleFocusLoss);
    return () => document.removeEventListener('focusout', handleFocusLoss);
  }, [closeOnFocusLoss, isOpen, onClose]);

  // Handle ESC key
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [closeOnEsc, isOpen, onClose]);

  // Handle draggable functionality
  useEffect(() => {
    if (!draggable || !isOpen) return;

    const modal = modalRef.current;
    if (!modal) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.target === modal.querySelector('.modal-component__header')) {
        isDragging.current = true;
        dragStart.current = { x: e.clientX, y: e.clientY };
        modalStart.current = { x: modal.offsetLeft, y: modal.offsetTop };
        document.body.style.cursor = 'grabbing';
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - dragStart.current.x;
      const deltaY = e.clientY - dragStart.current.y;

      modal.style.left = `${modalStart.current.x + deltaX}px`;
      modal.style.top = `${modalStart.current.y + deltaY}px`;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
    };

    modal.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      modal.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggable, isOpen]);

  // Handle close button click with ripple effect
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (showCloseButton) {
      const removeRipple = createRipple(e, {
        color: 'rgba(255, 255, 255, 0.3)',
        duration: 600
      });
      
      // Auto-cleanup after animation
      setTimeout(removeRipple, 600);
    }
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className={`modal-component__overlay modal-component__overlay--${backdrop} modal-component__overlay--position-${position}`}
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
      {...overlayAriaProps}
    >
      <div
        ref={ref || modalRef}
        className={classes}
        style={{ ...componentStyle, ...style }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={ariaLabelledBy || (title ? 'modal-title' : undefined)}
        aria-describedby={ariaDescribedBy || (description ? 'modal-description' : undefined)}
        {...rest}
      >
        {/* Header */}
        {(title || header) && (
          <div className="modal-component__header">
            {header || (
              <>
                {title && (
                  <h2 id="modal-title" className="modal-component__title">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-description" className="modal-component__description">
                    {description}
                  </p>
                )}
              </>
            )}
          </div>
        )}

        {/* Close Button */}
        {showCloseButton && (
          <button
            className="modal-component__close"
            onClick={handleCloseClick}
            aria-label={closeButtonText}
            type="button"
          >
            {closeButtonIcon || '×'}
          </button>
        )}

        {/* Content */}
        <div className="modal-component__content">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal-component__footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
});

Modal.displayName = 'Modal';
