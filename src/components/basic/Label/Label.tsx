import React from 'react';
import './Label.css';

export type LabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
};

export function Label({ children, htmlFor, required = false, className }: LabelProps) {
  const classes = ['morphui-label', className].filter(Boolean).join(' ');
  return (
    <label htmlFor={htmlFor} className={classes}>
      {children}
      {required ? (
        <span aria-hidden="true" className="morphui-label-required">
          *
        </span>
      ) : null}
    </label>
  );
}
