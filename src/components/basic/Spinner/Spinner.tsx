// Spinner.tsx
import React, { forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Spinner.css';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type SpinnerAnimation = 'spin' | 'pulse' | 'dots' | 'bars' | 'wave';

export interface SpinnerProps {
  // Styling
  variant?: SpinnerVariant;
  size?: SpinnerSize;
  color?: string;
  gradient?: string;
  animation?: SpinnerAnimation;

  // Features
  label?: string;
  fullScreen?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      color,
      gradient,
      animation = 'spin',

      // Features
      label,
      fullScreen = false,

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
    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);

    // Check for gradients
    const isColorGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    // Classes
    const classes = [
      'spinner-component',
      `spinner-component--${variant}`,
      `spinner-component--${size}`,
      `spinner-component--${animation}`,
      isColorGradient && 'spinner-component--gradient',
      fullScreen && 'spinner-component--full-screen',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      // Color: gradient > color (gradients take precedence)
      ...(resolvedGradient && {
        '--spinner-custom-color': resolvedGradient,
        '--spinner-color': resolvedGradient,
      }),
      ...(resolvedColor &&
        !resolvedGradient && {
          '--spinner-custom-color': resolvedColor,
          '--spinner-color': resolvedColor,
        }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || label || 'Loading',
      describedBy: ariaDescribedBy,
    });

    // Render spinner based on animation type
    const renderSpinner = () => {
      switch (animation) {
        case 'spin':
          return <div className="spinner-component__spin" aria-hidden="true" />;
        case 'pulse':
          return <div className="spinner-component__pulse" aria-hidden="true" />;
        case 'dots':
          return (
            <div className="spinner-component__dots" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
          );
        case 'bars':
          return (
            <div className="spinner-component__bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          );
        case 'wave':
          return (
            <div className="spinner-component__wave" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          );
        default:
          return <div className="spinner-component__spin" aria-hidden="true" />;
      }
    };

    const spinnerContent = (
      <div
        ref={ref}
        id={id}
        className={classes}
        style={mergedStyle}
        role="status"
        {...ariaProps}
        {...rest}
      >
        {renderSpinner()}
        {label && <span className="spinner-component__label">{label}</span>}
      </div>
    );

    if (fullScreen) {
      return (
        <div className="spinner-component__full-screen-wrapper" aria-hidden="false">
          {spinnerContent}
        </div>
      );
    }

    return spinnerContent;
  },
);

Spinner.displayName = 'Spinner';
