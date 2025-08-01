// Input.tsx
import React, { forwardRef, InputHTMLAttributes } from 'react';
import './Input.css';

export type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local';
  id?: string;
  name?: string;
  disabled?: boolean;
  autoComplete?: string;
  ariaLabel?: string;
  error?: boolean;
  errorMessage?: string;
  size?: 'sm' | 'md' | 'lg';
  required?: boolean;
  loading?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'placeholder' | 'size'>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  id,
  name,
  disabled = false,
  autoComplete,
  ariaLabel,
  error = false,
  errorMessage,
  size = 'md',
  required = false,
  loading = false,
  ...rest
}, ref) => {
  // sensible default for autoComplete if not passed
  const autoCompleteValue = autoComplete ?? (type === 'password' ? 'current-password' : undefined);

  const classNames = [
    'input-component',
    `input-component--${size}`,
    error && 'input-component--error',
    loading && 'input-component--loading'
  ].filter(Boolean).join(' ');

  return (
    <div className="input-wrapper">
      <input
        ref={ref}
        className={classNames}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        name={name}
        disabled={disabled || loading}
        autoComplete={autoCompleteValue}
        aria-label={ariaLabel}
        aria-invalid={error}
        aria-describedby={errorMessage ? `${id}-error` : undefined}
        required={required}
        {...rest}
      />
      {loading && <div className="input-spinner" />}
      {error && errorMessage && (
        <div id={`${id}-error`} className="input-error-message" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';