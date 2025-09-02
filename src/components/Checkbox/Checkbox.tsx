import React, { forwardRef, useState, useRef, useEffect } from 'react';
import { resolveThemeValue, getAriaProps, createRipple } from '../../utils';
import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale' | 'slide';
  rounded?: boolean;
  bordered?: boolean;
  disabled?: boolean;
  loading?: boolean;
  required?: boolean;
  invalid?: boolean;
  indeterminate?: boolean;
  readOnly?: boolean;
  name?: string;
  value?: string | number;
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten' | 'color-dodge' | 'color-burn' | 'hard-light' | 'soft-light' | 'difference' | 'exclusion' | 'hue' | 'saturation' | 'color' | 'luminosity';
  className?: string;
  style?: React.CSSProperties;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  label,
  description,
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  backgroundColor,
  shadow = 'sm',
  hoverEffect = 'none',
  rounded = false,
  bordered = true,
  disabled = false,
  loading = false,
  required = false,
  invalid = false,
  indeterminate = false,
  readOnly = false,
  name,
  value,
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend = 'normal',
  className = '',
  style,
  onFocus,
  onBlur,
  onKeyDown,
  ...rest
}, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  // Use controlled or uncontrolled state
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);

  // Auto-detect variant from color if it's a theme color
  const getVariantFromColor = (colorValue: string | undefined) => {
    if (!colorValue) return variant;
    
    // Check if it's a CSS value (starts with #, rgb, hsl, or linear-gradient)
    if (colorValue.startsWith('#') || colorValue.startsWith('rgb') || colorValue.startsWith('hsl') || colorValue.startsWith('linear-gradient')) {
      return variant;
    }
    
    // Check if it's a CSS variable (starts with --)
    if (colorValue.startsWith('--')) {
      return variant;
    }
    
    // Map theme color keys to variants
    const colorToVariant: Record<string, string> = {
      'color-success': 'success',
      'color-warning': 'warning',
      'color-danger': 'danger',
      'color-info': 'info',
      'color-secondary': 'secondary',
    };
    
    return colorToVariant[colorValue] || variant;
  };

  const finalVariant = getVariantFromColor(color);

  const classes = [
    'checkbox-component',
    `checkbox-component--${finalVariant}`,
    `checkbox-component--${size}`,
    `checkbox-component--shadow-${shadow}`,
    `checkbox-component--hover-${hoverEffect}`,
    rounded && 'checkbox-component--rounded',
    bordered && 'checkbox-component--bordered',
    disabled && 'checkbox-component--disabled',
    loading && 'checkbox-component--loading',
    invalid && 'checkbox-component--invalid',
    checked && 'checkbox-component--checked',
    indeterminate && 'checkbox-component--indeterminate',
    isFocused && 'checkbox-component--focused',
    isAnimating && 'checkbox-component--animating',
    glassmorphism && 'checkbox-component--glassmorphism',
    className,
  ].filter(Boolean).join(' ');

  // Style for color/gradient and dimensions
  const componentStyle = {
    // Background color takes precedence over color and gradient
    ...(resolvedBackgroundColor && { '--checkbox-custom-bg': resolvedBackgroundColor }),
    ...(resolvedBackgroundColor ? {} : resolvedGradient && { '--checkbox-custom-bg': resolvedGradient }),
    ...(resolvedBackgroundColor ? {} : resolvedColor && { '--checkbox-custom-bg': resolvedColor }),
    ...(resolvedTextColor && { '--checkbox-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--checkbox-custom-border': resolvedBorderColor }),
    ...(backgroundPattern && { '--checkbox-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--checkbox-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--checkbox-custom-bg-blend': backgroundBlend }),
  };

  // Combine component style with user style
  const finalStyle: React.CSSProperties = {
    ...componentStyle,
    ...style,
  };

  // ARIA attributes
  const ariaProps = getAriaProps({
    label: label || 'Checkbox',
    required,
    invalid,
    disabled,
  });

  // Handle checkbox change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading || readOnly) return;

    const newChecked = e.target.checked;
    
    // Note: Ripple effect removed for simplicity in checkbox component

    // Update state
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    // Call onChange callback
    onChange?.(newChecked);
  };

  // Handle focus
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  // Handle keyboard events
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || loading) return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        if (!readOnly) {
          const newChecked = !checked;
          if (!isControlled) {
            setInternalChecked(newChecked);
          }
          onChange?.(newChecked);
        }
        break;
    }
    
    onKeyDown?.(e);
  };

  // Handle label click
  const handleLabelClick = (e: React.MouseEvent) => {
    if (disabled || loading) return;
    
    // Prevent double-triggering if clicking directly on the input
    if (e.target === inputRef.current) return;
    
    // Focus and trigger the input
    inputRef.current?.focus();
    if (!readOnly) {
      const newChecked = !checked;
      if (!isControlled) {
        setInternalChecked(newChecked);
      }
      onChange?.(newChecked);
    }
  };

  // Handle checkbox visual click
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || loading || readOnly) return;
    
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  // Set indeterminate state on the input element
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  // Handle animation
  useEffect(() => {
    if (checked !== internalChecked) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 150);
      return () => clearTimeout(timer);
    }
  }, [checked, internalChecked]);

  return (
    <div className={classes} style={finalStyle}>
      <label
        ref={labelRef}
        className="checkbox-component__label"
        onClick={handleLabelClick}
      >
        <div className="checkbox-component__input-wrapper">
          <input
            ref={ref || inputRef}
            type="checkbox"
            className="checkbox-component__input"
            checked={checked}
            disabled={disabled || loading}
            readOnly={readOnly}
            required={required}
            name={name}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-invalid={invalid}
            aria-checked={indeterminate ? 'mixed' : checked}
            {...ariaProps}
            {...rest}
          />
          
          <div 
            className="checkbox-component__checkbox"
            onClick={handleCheckboxClick}
            style={{ cursor: disabled || loading ? 'not-allowed' : 'pointer' }}
          >
            {/* Checkmark icon */}
            {checked && !indeterminate && (
              <svg
                className="checkbox-component__checkmark"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6L5 9L10 2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            
            {/* Indeterminate icon */}
            {indeterminate && (
              <svg
                className="checkbox-component__indeterminate"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6H10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            
            {/* Loading spinner */}
            {loading && (
              <div className="checkbox-component__loading-spinner">
                <div className="checkbox-component__spinner"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Label and description */}
        {(label || description) && (
          <div className="checkbox-component__content">
            {label && (
              <span className="checkbox-component__label-text">{label}</span>
            )}
            {description && (
              <span className="checkbox-component__description">{description}</span>
            )}
          </div>
        )}
      </label>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

