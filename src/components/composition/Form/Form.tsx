// Form.tsx
import React, { forwardRef } from 'react';
import './Form.css';

export type FormVariant = 'primary' | 'secondary' | 'default';
export type FormSize = 'sm' | 'md' | 'lg';

export interface FormProps extends Omit<React.FormHTMLAttributes<HTMLFormElement>, 'size'> {
  variant?: FormVariant;
  size?: FormSize;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
  ({ variant = 'default', size = 'md', className = '', children, ...rest }, ref) => {
    const classes = [
      'form-component',
      `form-component--${variant}`,
      `form-component--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <form ref={ref} className={classes} {...rest}>
        {children}
      </form>
    );
  },
);

Form.displayName = 'Form';
