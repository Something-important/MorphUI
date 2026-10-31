// FormField.tsx
import React, { forwardRef, useId, isValidElement } from 'react';
import { resolveThemeValue } from '../../../utils';
import { Label } from '../../basic/Label/Label';
import './Form.css';

export interface FormFieldProps {
  /** Label text (or node) for the field. */
  label?: React.ReactNode;
  /** Explicit id to link Label <-> control. Defaults to the child's id or an auto-generated one. */
  htmlFor?: string;
  /** Error message. When present, marks the control aria-invalid and replaces helperText. */
  error?: React.ReactNode;
  /** Helper text shown when there is no error. */
  helperText?: React.ReactNode;
  /** Marks the label as required (adds the required indicator). */
  required?: boolean;
  /** Accent for the wrapped control's focus ring / active state (overrides the Form-level accent). */
  color?: string;
  /** Text color for the wrapped control. */
  textColor?: string;
  /** Border color for the wrapped control. */
  borderColor?: string;
  /** Border radius for the wrapped control (numbers are treated as px). */
  borderRadius?: string | number;
  /** Shadow level for the wrapped control. */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  style?: React.CSSProperties;
  /** The single input control this field wraps. */
  children: React.ReactElement;
}

type ChildLike = React.ReactElement<{
  id?: string;
  'aria-describedby'?: string;
  'aria-invalid'?: boolean | 'true' | 'false';
}>;

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      htmlFor,
      error,
      helperText,
      required = false,
      color,
      textColor,
      borderColor,
      borderRadius,
      shadow,
      className = '',
      style,
      children,
    },
    ref,
  ) => {
    const autoId = useId();
    const helperId = `${autoId}-helper`;
    const errorId = `${autoId}-error`;

    // ---- Theme resolution (design model) ----
    // Field-level --form-custom-* writes sit closer to the control than the
    // Form root's, so they win the inheritance ladder for this field only.
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedShadow = shadow !== undefined ? resolveThemeValue(`shadow-${shadow}`) : undefined;

    // Component style: ONLY the --form-custom-* channel is written here.
    const componentStyle: React.CSSProperties & Record<string, string> = {
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

    const child = React.Children.only(children) as ChildLike;
    const childId = child.props?.id;
    const fieldId = htmlFor || childId || autoId;

    // Only reference the ids of elements that actually render.
    const describedByParts: string[] = [];
    if (helperText && !error) describedByParts.push(helperId);
    if (error) describedByParts.push(errorId);
    const existingDescribedBy = child.props?.['aria-describedby'];
    if (existingDescribedBy) describedByParts.unshift(existingDescribedBy);
    const describedBy = describedByParts.join(' ') || undefined;

    const enhancedChild = isValidElement(child)
      ? React.cloneElement(child, {
          id: childId ?? fieldId,
          'aria-describedby': describedBy,
          'aria-invalid': error ? true : child.props?.['aria-invalid'],
        })
      : child;

    const classes = [
      'form-field',
      error && 'form-field--error',
      required && 'form-field--required',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} style={mergedStyle}>
        {label && (
          <Label htmlFor={fieldId} required={required}>
            {label}
          </Label>
        )}
        {enhancedChild}
        {helperText && !error && (
          <div id={helperId} className="form-field__helper">
            {helperText}
          </div>
        )}
        {error && (
          <div id={errorId} className="form-field__error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
