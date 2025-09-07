import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Switch.css';

export interface SwitchProps {
  // Core props
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  readOnly?: boolean;
  required?: boolean;
  invalid?: boolean;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Features
  label?: string;
  description?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ripple?: boolean;
  
  // Advanced styling
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: string;
  
  // Accessibility
  ariaLabel?: string;
  id?: string;
  name?: string;
  
  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(({
  // Core props
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  loading = false,
  readOnly = false,
  required = false,
  invalid = false,
  
  // Styling
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  borderRadius,
  shadow = 'md',
  
  // Features
  label,
  description,
  labelPosition = 'right',
  icon,
  iconPosition = 'left',
  ripple = false,
  
  // Advanced styling
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend,
  
  // Accessibility
  ariaLabel,
  id,
  name,
  
  // Styling overrides
  className = '',
  style,
  ...rest
}, ref) => {
  // Internal state
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [isFocused, setIsFocused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  
  // Generate CSS classes
  const classes = [
    'switch-component',
    `switch-component--${variant}`,
    `switch-component--${size}`,
    checked && 'switch-component--checked',
    disabled && 'switch-component--disabled',
    loading && 'switch-component--loading',
    invalid && 'switch-component--invalid',
    readOnly && 'switch-component--readonly',
    isFocused && 'switch-component--focused',
    isPressed && 'switch-component--pressed',
    isAnimating && 'switch-component--animating',
    glassmorphism && 'switch-component--glassmorphism',
    labelPosition && `switch-component--label-${labelPosition}`,
    icon && `switch-component--with-icon`,
    iconPosition && `switch-component--icon-${iconPosition}`,
    className
  ].filter(Boolean).join(' ');
  
  // Component style object
  const componentStyle: React.CSSProperties = {
    ...(color && { '--switch-custom-color': color }),
    ...(gradient && { '--switch-custom-gradient': gradient }),
    ...(textColor && { '--switch-custom-text-color': textColor }),
    ...(borderColor && { '--switch-custom-border-color': borderColor }),
    ...(borderRadius && { '--switch-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--switch-custom-shadow': resolveThemeValue(`shadow-${shadow}`) }),
    ...(backgroundPattern && { '--switch-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--switch-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--switch-custom-bg-blend': backgroundBlend }),
  } as React.CSSProperties;
  
  // Combine component style with user style
  const finalStyle: React.CSSProperties = {
    ...componentStyle,
    ...style,
  };
  
  // ARIA attributes
  const ariaProps = getAriaProps({
    label: label || 'Switch',
    required,
    invalid,
    disabled,
  });
  
  // Handle switch change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled || loading || readOnly) return;
    
    const newChecked = e.target.checked;
    
    // Note: Ripple effect removed for simplicity in switch component
    
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
  };
  
  // Handle blur
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
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
  
  // Handle switch visual click
  const handleSwitchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || loading || readOnly) return;
    
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };
  
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
        className="switch-component__label"
        onClick={handleLabelClick}
      >
        {/* Icon (left position) */}
        {icon && iconPosition === 'left' && (
          <span className="switch-component__icon switch-component__icon--left">
            {icon}
          </span>
        )}
        
        {/* Label and description (left position) */}
        {(label || description) && labelPosition === 'left' && (
          <div className="switch-component__content">
            {label && (
              <span className="switch-component__label-text">{label}</span>
            )}
            {description && (
              <span className="switch-component__description">{description}</span>
            )}
          </div>
        )}
        
        {/* Switch Input Wrapper */}
        <div className="switch-component__input-wrapper">
          <input
            ref={ref || inputRef}
            type="checkbox"
            className="switch-component__input"
            checked={checked}
            disabled={disabled || loading}
            readOnly={readOnly}
            required={required}
            name={name}
            id={id}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            aria-invalid={invalid}
            aria-checked={checked}
            {...ariaProps}
            {...rest}
          />
          
          {/* Switch Visual */}
          <div 
            className="switch-component__switch"
            onClick={handleSwitchClick}
            style={{ cursor: disabled || loading ? 'not-allowed' : 'pointer' }}
          >
            {/* Switch Track */}
            <div className="switch-component__track">
              {/* Switch Thumb */}
              <div className="switch-component__thumb">
                {/* Loading spinner */}
                {loading && (
                  <div className="switch-component__loading-spinner">
                    <div className="switch-component__spinner"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Label and description (right position) */}
        {(label || description) && labelPosition === 'right' && (
          <div className="switch-component__content">
            {label && (
              <span className="switch-component__label-text">{label}</span>
            )}
            {description && (
              <span className="switch-component__description">{description}</span>
            )}
          </div>
        )}
        
        {/* Icon (right position) */}
        {icon && iconPosition === 'right' && (
          <span className="switch-component__icon switch-component__icon--right">
            {icon}
          </span>
        )}
      </label>
    </div>
  );
});

Switch.displayName = 'Switch';
