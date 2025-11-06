// Avatar.tsx
import React, { useState, forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Avatar.css';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square' | 'rounded';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

export interface AvatarProps {
  // Image
  src?: string;
  alt?: string;
  name?: string; // For generating initials when image fails or not provided

  // Status
  status?: AvatarStatus;

  // Styling
  size?: AvatarSize;
  shape?: AvatarShape;
  color?: string;
  gradient?: string;
  backgroundColor?: string;
  textColor?: string;

  // Icon fallback
  icon?: React.ReactNode;

  // Badge/notification
  badge?: number | string;
  showBadge?: boolean;

  // Image error handling
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;

  // Accessibility
  ariaLabel?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

// Helper function to get initials from name
const getInitials = (name?: string): string => {
  if (!name) return '';

  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return '';

  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }

  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Helper function to get a color from a string (for consistent avatar colors)
const getColorFromString = (str: string): string => {
  const colors = [
    '#ef4444', // red
    '#f59e0b', // orange
    '#10b981', // green
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      status,
      size = 'md',
      shape = 'circle',
      color,
      gradient,
      backgroundColor,
      textColor,
      icon,
      badge,
      showBadge = false,
      onError,
      ariaLabel,
      id,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const initials = getInitials(name);
    // Show initials if: no src provided, or image failed and no icon available
    const showInitials = (!src || imageError) && !icon;
    // Show icon if: icon is provided and (no src or image failed)
    const showIcon = icon && (!src || imageError);

    // Generate background color from name if no color provided
    const defaultBackgroundColor =
      name && !color && !gradient && !backgroundColor ? getColorFromString(name) : undefined;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color || defaultBackgroundColor);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedBackgroundColor = resolveThemeValue(backgroundColor || defaultBackgroundColor);
    const resolvedTextColor = resolveThemeValue(textColor);

    // Check for gradients
    const isColorGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    // Handle image error
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setImageError(true);
      onError?.(e);
    };

    // Handle image load
    const handleImageLoad = () => {
      setImageLoaded(true);
      setImageError(false);
    };

    // Classes
    const classes = [
      'avatar-component',
      `avatar-component--${size}`,
      `avatar-component--${shape}`,
      status && `avatar-component--status-${status}`,
      showBadge && 'avatar-component--badge',
      isColorGradient && 'avatar-component--gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      // Color: gradient > color (gradients take precedence)
      ...(resolvedGradient && {
        '--avatar-custom-bg': resolvedGradient,
        '--avatar-bg': resolvedGradient,
      }),
      ...(resolvedBackgroundColor &&
        !resolvedGradient && {
          '--avatar-custom-bg': resolvedBackgroundColor,
          '--avatar-bg': resolvedBackgroundColor,
        }),
      ...(resolvedColor &&
        !resolvedGradient &&
        !resolvedBackgroundColor && {
          '--avatar-custom-bg': resolvedColor,
          '--avatar-bg': resolvedColor,
        }),
      ...(resolvedTextColor && {
        '--avatar-custom-color': resolvedTextColor,
        '--avatar-color': resolvedTextColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || alt || name || 'Avatar',
      describedBy: undefined,
    });

    return (
      <div ref={ref} id={id} className={classes} style={mergedStyle} {...ariaProps} {...rest}>
        {/* Image */}
        {src && !imageError && (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="avatar-component__image"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        )}

        {/* Initials fallback */}
        {showInitials && !showIcon && initials && (
          <span className="avatar-component__initials" aria-hidden="true">
            {initials}
          </span>
        )}

        {/* Icon fallback */}
        {showIcon && (
          <span className="avatar-component__icon" aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Status indicator */}
        {status && (
          <span
            className={`avatar-component__status avatar-component__status--${status}`}
            aria-label={`Status: ${status}`}
          />
        )}

        {/* Badge */}
        {(showBadge || badge !== undefined) && (
          <span className="avatar-component__badge" aria-label={`${badge} notifications`}>
            {typeof badge === 'number' && badge > 99 ? '99+' : badge}
          </span>
        )}
      </div>
    );
  },
);

Avatar.displayName = 'Avatar';
