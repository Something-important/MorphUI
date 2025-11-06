// Progress.tsx
import React, { forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Progress.css';

export type ProgressSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ProgressVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type ProgressType = 'linear' | 'circular';

export interface ProgressProps {
  // Value
  value?: number; // 0-100 for determinate, undefined for indeterminate
  max?: number; // Default 100

  // Type
  type?: ProgressType;

  // Styling
  variant?: ProgressVariant;
  size?: ProgressSize;
  color?: string;
  gradient?: string;
  backgroundColor?: string;

  // Features
  label?: string;
  showValue?: boolean;
  striped?: boolean;
  animated?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,

      // Type
      type = 'linear',

      // Styling
      variant = 'primary',
      size = 'md',
      color,
      gradient,
      backgroundColor,

      // Features
      label,
      showValue = false,
      striped = false,
      animated = false,

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
    // Clamp value between 0 and max
    const clampedValue = value !== undefined ? Math.max(0, Math.min(max, value)) : undefined;
    const percentage = clampedValue !== undefined ? (clampedValue / max) * 100 : undefined;
    const isIndeterminate = value === undefined;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedBackgroundColor = resolveThemeValue(backgroundColor);

    // Check for gradients
    const isColorGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    // Classes
    const classes = [
      'progress-component',
      `progress-component--${variant}`,
      `progress-component--${size}`,
      `progress-component--${type}`,
      isIndeterminate && 'progress-component--indeterminate',
      striped && 'progress-component--striped',
      animated && 'progress-component--animated',
      isColorGradient && 'progress-component--gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      // Color: gradient > color (gradients take precedence)
      ...(resolvedGradient && {
        '--progress-custom-color': resolvedGradient,
        '--progress-color': resolvedGradient,
      }),
      ...(resolvedColor &&
        !resolvedGradient && {
          '--progress-custom-color': resolvedColor,
          '--progress-color': resolvedColor,
        }),
      ...(resolvedBackgroundColor && {
        '--progress-custom-bg': resolvedBackgroundColor,
        '--progress-bg': resolvedBackgroundColor,
      }),
      ...(percentage !== undefined && {
        '--progress-value': `${percentage}%`,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || label || (isIndeterminate ? 'Loading' : `Progress: ${clampedValue}%`),
      describedBy: ariaDescribedBy,
    });

    // Render circular progress
    if (type === 'circular') {
      const radius = 40;
      const circumference = 2 * Math.PI * radius;
      const offset = isIndeterminate
        ? undefined
        : circumference - (percentage! / 100) * circumference;

      return (
        <div ref={ref} id={id} className={classes} style={mergedStyle} {...ariaProps} {...rest}>
          <div className="progress-component__circular-wrapper">
            <svg
              className="progress-component__circular-svg"
              viewBox="0 0 100 100"
              aria-hidden="true"
            >
              {/* Background circle */}
              <circle
                className="progress-component__circular-bg"
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                className="progress-component__circular-progress"
                cx="50"
                cy="50"
                r={radius}
                fill="none"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            {(showValue || label) && (
              <div className="progress-component__circular-content">
                {showValue && !isIndeterminate && (
                  <span className="progress-component__value">{clampedValue}%</span>
                )}
                {label && <span className="progress-component__label">{label}</span>}
              </div>
            )}
          </div>
        </div>
      );
    }

    // Render linear progress
    return (
      <div ref={ref} id={id} className={classes} style={mergedStyle} {...ariaProps} {...rest}>
        {(label || showValue) && (
          <div className="progress-component__header">
            {label && <span className="progress-component__label">{label}</span>}
            {showValue && !isIndeterminate && (
              <span className="progress-component__value">{clampedValue}%</span>
            )}
          </div>
        )}
        <div className="progress-component__track">
          <div
            className="progress-component__bar"
            style={percentage !== undefined ? { width: `${percentage}%` } : undefined}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={max}
            aria-valuenow={clampedValue}
            aria-label={ariaLabel || label || 'Progress'}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = 'Progress';
