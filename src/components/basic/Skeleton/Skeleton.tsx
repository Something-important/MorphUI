// Skeleton.tsx
import React, { forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Skeleton.css';

export type SkeletonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded';

export interface SkeletonProps {
  // Styling
  variant?: SkeletonVariant;
  size?: SkeletonSize;
  width?: string | number;
  height?: string | number;
  color?: string;
  backgroundColor?: string;
  animated?: boolean;

  // Count (for multiple skeletons)
  count?: number;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      variant = 'text',
      size = 'md',
      width,
      height,
      color,
      backgroundColor,
      animated = true,
      count = 1,
      ariaLabel,
      ariaDescribedBy,
      id,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedBackgroundColor = resolveThemeValue(backgroundColor);

    // Classes
    const classes = [
      'skeleton-component',
      `skeleton-component--${variant}`,
      `skeleton-component--${size}`,
      animated && 'skeleton-component--animated',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
      ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
      ...(resolvedColor && {
        '--skeleton-custom-color': resolvedColor,
        '--skeleton-color': resolvedColor,
      }),
      ...(resolvedBackgroundColor && {
        '--skeleton-custom-bg': resolvedBackgroundColor,
        '--skeleton-bg': resolvedBackgroundColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || 'Loading content',
      describedBy: ariaDescribedBy,
    });

    // Render multiple skeletons if count > 1
    if (count > 1) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className={classes}
              style={mergedStyle}
              aria-label={ariaLabel || 'Loading content'}
            />
          ))}
        </div>
      );
    }

    // Render single skeleton if count === 1 or count <= 0 (treat <= 0 as 1)
    if (count <= 0) {
      return null;
    }

    return (
      <div ref={ref} id={id} className={classes} style={mergedStyle} {...ariaProps} {...rest} />
    );
  },
);

Skeleton.displayName = 'Skeleton';
