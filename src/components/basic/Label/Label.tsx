// Label.tsx
import React, { forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import './Label.css';

export type LabelVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
export type LabelSize = 'xs' | 'sm' | 'md' | 'lg';

export interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  variant?: LabelVariant;
  size?: LabelSize;
  color?: string;
  textColor?: string;
  requiredColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      htmlFor,
      required = false,
      variant,
      size = 'md',
      color,
      textColor,
      requiredColor,
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    // Resolve theme values
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedRequiredColor = resolveThemeValue(requiredColor);

    // Check if text color is a gradient
    const isTextGradient =
      textColor &&
      (textColor.includes('linear-gradient') ||
        textColor.includes('radial-gradient') ||
        textColor.includes('conic-gradient'));

    const classes = [
      'label-component',
      variant && `label-component--${variant}`,
      `label-component--${size}`,
      required && 'label-component--required',
      isTextGradient && 'label-component--text-gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedTextColor && {
        '--label-custom-color': resolvedTextColor,
      }),
      ...(resolvedRequiredColor && {
        '--label-custom-required-color': resolvedRequiredColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    return (
      <label ref={ref} htmlFor={htmlFor} className={classes} style={mergedStyle} {...rest}>
        {children}
        {required && (
          <span aria-hidden="true" className="label-component__required">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
