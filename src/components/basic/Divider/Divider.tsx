// Divider.tsx
import React, { ReactNode, forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Divider.css';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  gradient?: string;
  text?: ReactNode;
  textPosition?: 'left' | 'center' | 'right';
  spacing?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

export const Divider = forwardRef<HTMLHRElement | HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      variant = 'solid',
      size = 'md',
      color,
      gradient,
      text,
      textPosition = 'center',
      spacing = 'md',
      className = '',
      style,
      ariaLabel,
      id,
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
      'divider-component',
      `divider-component--${orientation}`,
      `divider-component--${variant}`,
      `divider-component--${size}`,
      text && `divider-component--with-text`,
      text && `divider-component--text-${textPosition}`,
      spacing && `divider-component--spacing-${spacing}`,
      isColorGradient && 'divider-component--gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedGradient && {
        '--divider-custom-color': resolvedGradient,
        '--divider-color': resolvedGradient,
      }),
      ...(resolvedColor &&
        !resolvedGradient && {
          '--divider-custom-color': resolvedColor,
          '--divider-color': resolvedColor,
        }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel,
    });

    // If there's text, render a div wrapper with text
    if (text) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          id={id}
          className={classes}
          style={mergedStyle}
          role="separator"
          aria-label={ariaLabel || (typeof text === 'string' ? text : 'Divider')}
          {...ariaProps}
          {...rest}
        >
          <span className="divider-component__line divider-component__line--before" />
          <span className="divider-component__text">{text}</span>
          <span className="divider-component__line divider-component__line--after" />
        </div>
      );
    }

    // Simple divider without text
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          id={id}
          className={classes}
          style={mergedStyle}
          role="separator"
          aria-label={ariaLabel || 'Divider'}
          {...ariaProps}
          {...rest}
        />
      );
    }

    return (
      <hr
        ref={ref as React.Ref<HTMLHRElement>}
        id={id}
        className={classes}
        style={mergedStyle}
        aria-label={ariaLabel}
        {...ariaProps}
        {...rest}
      />
    );
  },
);

Divider.displayName = 'Divider';
