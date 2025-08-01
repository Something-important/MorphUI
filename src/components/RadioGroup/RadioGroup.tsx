import React from 'react';
import './RadioGroup.css';

type RadioOption = {
  label: string;
  value: string | number;
};

type RadioGroupProps = {
  options: RadioOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  name: string;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  className?: string;
  style?: React.CSSProperties;
};

export const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  disabled = false,
  direction = 'vertical',
  className = '',
  style,
}: RadioGroupProps) => {
  if (options.length === 0) {
    return <div className="radio-no-options">No options available</div>;
  }

  return (
    <div
      className={`radio-group radio-group--${direction} ${className}`}
      style={style}
      role="radiogroup"
      aria-label="Radio group"
      aria-disabled={disabled}
    >
      {options.map((opt) => (
        <label
          key={opt.value}
          className={`radio-label ${disabled ? 'disabled' : ''}`}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={opt.value === value}
            onChange={() => !disabled && onChange(opt.value)}
            disabled={disabled}
            aria-checked={opt.value === value}
          />
          <span className="custom-radio"></span>
          {opt.label}
        </label>
      ))}
    </div>
  );
};