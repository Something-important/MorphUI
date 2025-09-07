// Input.tsx
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { resolveThemeValue, createRipple, getAriaProps } from '../../../utils';
import './Input.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'placeholder' | 'size'> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'range';
  id?: string;
  name?: string;
  disabled?: boolean;
  autoComplete?: string;
  ariaLabel?: string;
  error?: boolean;
  errorMessage?: string;
  required?: boolean;
  loading?: boolean;
  
  // Core API - Match Button exactly
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  rounded?: boolean;
  ripple?: boolean;
  fullWidth?: boolean;
  
  // Enhanced styling
  borderRadius?: string | number;
  backdropBlur?: boolean;
  
  // Icon support
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  
  // Advanced features
  floatingLabel?: boolean;
  characterCount?: boolean;
  maxLength?: number;
  minLength?: number;
  
  // Validation
  validation?: {
    pattern?: RegExp;
    min?: number;
    max?: number;
    required?: boolean;
    custom?: (value: string) => string | null;
  };
  
  // Auto-complete
  suggestions?: string[];
  onSuggestionSelect?: (suggestion: string) => void;
  
  // Enhanced states
  success?: boolean;
  warning?: boolean;
  info?: boolean;
  
  // Interactive events
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  
  // Loading customization
  loadingText?: string;
  
  className?: string;
  style?: React.CSSProperties;
}

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
  
  // Core API - Match Button exactly
  variant = 'primary',
  color,
  gradient,
  textColor,
  borderColor,
  shadow = 'md',
  hoverEffect = 'lift',
  rounded = false,
  ripple = false,
  fullWidth = false,
  
  // Enhanced styling
  borderRadius,
  backdropBlur,
  
  // Icon support
  iconLeft,
  iconRight,
  
  // Advanced features
  floatingLabel = false,
  characterCount = false,
  maxLength,
  minLength,
  
  // Validation
  validation,
  
  // Auto-complete
  suggestions = [],
  onSuggestionSelect,
  
  // Enhanced states
  success = false,
  warning = false,
  info = false,
  
  // Interactive events
  onClick,
  
  // Loading customization
  loadingText,
  
  className = '',
  style,
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Auto-detect variant from color if it's a theme color (like Button)
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

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  
  const finalVariant = getVariantFromColor(color);

  // Detect gradients for CSS class application
  const isBackgroundGradient = (resolvedGradient || resolvedColor) && (
    (resolvedGradient && (resolvedGradient.includes('linear-gradient') || resolvedGradient.includes('radial-gradient') || resolvedGradient.includes('conic-gradient'))) ||
    (resolvedColor && (resolvedColor.includes('linear-gradient') || resolvedColor.includes('radial-gradient') || resolvedColor.includes('conic-gradient')))
  );
  
  const isTextGradient = resolvedTextColor && (
    resolvedTextColor.includes('linear-gradient') || 
    resolvedTextColor.includes('radial-gradient') || 
    resolvedTextColor.includes('conic-gradient')
  );
  
  const isBorderGradient = resolvedBorderColor && (
    resolvedBorderColor.includes('linear-gradient') || 
    resolvedBorderColor.includes('radial-gradient') || 
    resolvedBorderColor.includes('conic-gradient')
  );

  // Determine input state
  const getInputState = () => {
    if (error || validationError) return 'error';
    if (success) return 'success';
    if (warning) return 'warning';
    if (info) return 'info';
    return 'default';
  };

  const inputState = getInputState();

  // Build classes (match Button pattern exactly)
  const classes = [
    'input-component',
    // Only apply variant class if no custom color/gradient is provided
    (!resolvedColor && !resolvedGradient) && `input-component--${finalVariant}`,
    `input-component--${size}`,
    fullWidth && 'input-component--full-width',
    inputState !== 'default' && `input-component--${inputState}`,
    loading && 'input-component--loading',
    isFocused && 'input-component--focused',
    hoverEffect && `input-component--hover-${hoverEffect}`,
    rounded && 'input-component--rounded',
    `input-component--shadow-${shadow}`,
    ripple && 'input-component--ripple',
    floatingLabel && 'input-component--floating-label',
    iconLeft && 'input-component--has-left-icon',
    iconRight && 'input-component--has-right-icon',
    isBackgroundGradient && 'input-component--background-gradient',
    isTextGradient && 'input-component--text-gradient',
    isBorderGradient && 'input-component--border-gradient',
    className,
  ].filter(Boolean).join(' ');

  // Build wrapper classes for character count positioning
  const wrapperClasses = [
    'input-wrapper',
    characterCount && 'input-wrapper--has-character-count',
    (iconRight || success || warning || info || error) && 'input-wrapper--has-right-icon',
  ].filter(Boolean).join(' ');

  // Determine the final background value with proper precedence
  const finalBackground = resolvedGradient || resolvedColor;
  
  // Build styles (match Button pattern exactly)
  const inputStyle: React.CSSProperties = {
    ...(resolvedTextColor && { '--input-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--input-custom-border': resolvedBorderColor }),
    // Apply the final background value
    ...(finalBackground && { '--input-custom-bg': finalBackground }),
    ...(borderRadius && { '--input-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--input-custom-shadow': shadow }),
    ...(backdropBlur && { '--input-custom-backdrop-blur': 'blur(8px)' }),
    ...style,
  };

  // Handle focus state
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    // Show all suggestions on focus if available
    if (suggestions.length > 0) {
      setFilteredSuggestions(suggestions);
      setShowSuggestions(true);
    }
    // Call original onFocus if provided
    if (rest.onFocus) {
      rest.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 150);
    // Call original onBlur if provided
    if (rest.onBlur) {
      rest.onBlur(e);
    }
  };

  // Handle hover state
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Handle click with ripple effect (like Button)
  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    if (ripple && !disabled && !loading) {
      const removeRipple = createRipple(event, {
        color: 'rgba(59, 130, 246, 0.3)',
        duration: 600
      });
      
      // Auto-cleanup after animation
      setTimeout(removeRipple, 600);
    }
    
    // Call original onClick if provided
    onClick?.(event);
  };

  // Handle input changes with validation
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    
    // Enforce limit if specified
    if (maxLength && newValue.length > maxLength) {
      return; // Don't update if exceeding maxLength
    }
    
    // Validate input
    const validationResult = validateInput(newValue);
    setValidationError(validationResult);
    
    // Filter suggestions
    if (suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(newValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
    
    // Call onChange
    onChange(e);
  };

  // Validation function
  const validateInput = (value: string): string | null => {
    if (validation?.required && !value) {
      return 'This field is required';
    }
    
    if (validation?.min && value.length < validation.min) {
      return `Minimum ${validation.min} characters required`;
    }
    
    if (validation?.max && value.length > validation.max) {
      return `Maximum ${validation.max} characters allowed`;
    }
    
    if (validation?.pattern && !validation.pattern.test(value)) {
      return 'Invalid format';
    }
    
    if (validation?.custom) {
      return validation.custom(value);
    }
    
    return null;
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionSelect) {
      onSuggestionSelect(suggestion);
    } else {
      // Create a synthetic event
      const syntheticEvent = {
        target: { value: suggestion }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle password visibility toggle
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Character count display
  const characterCountDisplay = characterCount ? (
    <div className="input-character-count">
      {value.length}/{maxLength || '∞'}
    </div>
  ) : null;

  // Error message (combine validation and prop errors)
  const finalErrorMessage = validationError || errorMessage;

  // Generate ARIA attributes
  const ariaProps = getAriaProps({
    label: ariaLabel,
    describedBy: finalErrorMessage ? `${id}-error` : undefined,
    required: required || validation?.required,
    invalid: inputState === 'error',
  });

  return (
    <div className={wrapperClasses} style={inputStyle}>
      {/* Floating label */}
      {floatingLabel && (
        <label 
          className={`input-floating-label ${isFocused || value ? 'input-floating-label--active' : ''}`}
          htmlFor={id}
        >
          {placeholder}
        </label>
      )}
      
      {/* Left icon */}
      {iconLeft && (
        <div className="input-icon input-icon--left">
          {iconLeft}
        </div>
      )}
      
      {/* Main input */}
      <input
        ref={(node) => {
          // Handle both refs
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }
          if (inputRef.current !== node) {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }
        }}
        className={classes}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={handleChange}
        placeholder={floatingLabel ? '' : placeholder}
        id={id}
        name={name}
        disabled={disabled || loading}
        autoComplete={autoComplete ?? (type === 'password' ? 'current-password' : undefined)}
        {...ariaProps}
        required={required || validation?.required}
        maxLength={maxLength}
        minLength={minLength}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      
      {/* Right icon, password toggle, or loading spinner */}
      {loading ? (
        <div className="input-spinner" />
      ) : type === 'password' ? (
        <button
          type="button"
          className="input-icon input-icon--right input-password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </button>
      ) : iconRight ? (
        <div className="input-icon input-icon--right">
          {iconRight}
        </div>
      ) : null}
      
      {/* Validation state icons */}
      {!iconRight && !loading && type !== 'password' && (
        <>
          {success && (
            <div className="input-icon input-icon--right input-icon--validation">
              <span className="validation-icon-success">✓</span>
            </div>
          )}
          {warning && (
            <div className="input-icon input-icon--right input-icon--validation">
              <span className="validation-icon-warning">!</span>
            </div>
          )}
          {info && (
            <div className="input-icon input-icon--right input-icon--validation">
              <span className="validation-icon-info">i</span>
            </div>
          )}
          {error && (
            <div className="input-icon input-icon--right input-icon--validation">
              <span className="validation-icon-error">×</span>
            </div>
          )}
        </>
      )}
      
      {/* Character count */}
      {characterCountDisplay}
      
      {/* Error message */}
      {finalErrorMessage && (
        <div id={`${id}-error`} className="input-error-message" role="alert">
          {finalErrorMessage}
        </div>
      )}
      
      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="input-suggestions" ref={suggestionsRef}>
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className="input-suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';