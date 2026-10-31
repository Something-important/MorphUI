// Form.tsx
import React, { forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Form.css';

export type FormVariant = 'primary' | 'secondary' | 'default';
export type FormSize = 'sm' | 'md' | 'lg';

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'size'> {
  variant?: FormVariant;
  size?: FormSize;
  /** Accent for focus rings / active states of nested fields. */
  color?: string;
  /** Opt-in gradient panel background for the form root (wins over `color` for background). */
  gradient?: string;
  /** Text color inherited by the form contents and field controls. */
  textColor?: string;
  /** Border color for nested field controls. */
  borderColor?: string;
  /** Border radius for nested field controls (numbers are treated as px). */
  borderRadius?: string | number;
  /** Shadow level for the form root panel. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Accessibility helpers (in addition to native aria-* attributes). */
  ariaLabel?: string;
  ariaDescribedBy?: string;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  (
    {
      variant = 'default',
      size = 'md',
      color,
      gradient,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      ariaLabel,
      ariaDescribedBy,
      className = '',
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    // ---- Theme resolution (design model) ----
    // resolveThemeValue: literal '#hex' -> value, '--x'/'var(--x)' -> var(--x),
    // theme key 'color-primary' -> var(--color-primary).
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedShadow = shadow !== undefined ? resolveThemeValue(`shadow-${shadow}`) : undefined;

    // Component style: ONLY the --form-custom-* channel is written here.
    // Variant classes in Form.css own the --form-* default channel (never
    // written from TSX). `gradient` wins the background slot; `color` is the
    // accent channel only. The vars live on the root <form> so nested
    // .form-field controls read them through inheritance chains.
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedGradient && { '--form-custom-bg': resolvedGradient }),
      ...(resolvedColor && { '--form-custom-accent': resolvedColor }),
      ...(resolvedTextColor && { '--form-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--form-custom-border': resolvedBorderColor }),
      ...(borderRadius !== undefined && {
        '--form-custom-border-radius':
          typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
      }),
      ...(resolvedShadow && { '--form-custom-shadow': resolvedShadow }),
    };

    // User style wins over the theme channel (merged last).
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes (native aria-* attributes in `rest` still win).
    const ariaProps = getAriaProps({
      label: ariaLabel,
      describedBy: ariaDescribedBy,
    });

    const classes = [
      'form-component',
      `form-component--${variant}`,
      `form-component--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <form ref={ref} className={classes} style={mergedStyle} {...ariaProps} {...rest}>
        {children}
      </form>
    );
  },
);

Form.displayName = 'Form';
