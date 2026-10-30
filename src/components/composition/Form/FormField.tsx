// FormField.tsx
import React, { forwardRef, useId, isValidElement } from 'react';
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
    { label, htmlFor, error, helperText, required = false, className = '', style, children },
    ref,
  ) => {
    const autoId = useId();
    const helperId = `${autoId}-helper`;
    const errorId = `${autoId}-error`;

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
      <div ref={ref} className={classes} style={style}>
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
