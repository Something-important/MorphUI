// Enhanced Input.tsx - Full API Consistency with Button
import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { resolveThemeValue, createRipple, getAriaProps } from '../../utils';
import './Input.css';

export type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'search' | 'tel' | 'url' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'color' | 'file' | 'range' | 'textarea';
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
  characterCountLimit?: number; // Custom limit for character count display
  characterCountStyle?: 'default' | 'custom' | 'warning' | 'danger'; // Styling for character count
  
  // Input masks
  mask?: 'phone' | 'credit-card' | 'date' | 'time' | 'currency';
  
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
  
  // Polymorphic support
  as?: React.ElementType;
  
  // Interactive events
  onClick?: (event: React.MouseEvent<HTMLInputElement>) => void;
  
  // Loading customization
  loadingText?: string;
  
  className?: string;
  style?: React.CSSProperties;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type' | 'placeholder' | 'size'>;

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
  characterCountLimit,
  characterCountStyle = 'default',
  
  // Input masks
  mask,
  
  // Validation
  validation,
  
  // Auto-complete
  suggestions = [],
  onSuggestionSelect,
  
  // Enhanced states
  success = false,
  warning = false,
  info = false,
  
  // Polymorphic support
  as,
  
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

  // Gradient presets
  const gradientPresets = {
    'gradient-sunset': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
    'gradient-ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'gradient-forest': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'gradient-sunrise': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'gradient-purple': 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'gradient-gold': 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  };

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
  const resolvedGradient = gradientPresets[gradient as keyof typeof gradientPresets] || resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  
  const finalVariant = getVariantFromColor(color);

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
    className,
  ].filter(Boolean).join(' ');

  // Build wrapper classes for character count positioning
  const wrapperClasses = [
    'input-wrapper',
    characterCount && 'input-wrapper--has-character-count',
    (iconRight || success || warning || info || error) && 'input-wrapper--has-right-icon',
  ].filter(Boolean).join(' ');

  // Build styles (match Button pattern exactly)
  const inputStyle: React.CSSProperties = {
    ...(resolvedGradient && { '--input-custom-bg': resolvedGradient }),
    ...(resolvedColor && { '--input-custom-bg': resolvedColor }),
    ...(resolvedTextColor && { '--input-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--input-custom-border': resolvedBorderColor }),
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
    rest.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), 150);
    rest.onBlur?.(e);
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
    
    // Determine the actual limit (characterCountLimit takes precedence over maxLength)
    const actualLimit = characterCountLimit || maxLength;
    
    // Enforce limit if specified
    if (actualLimit && newValue.length > actualLimit) {
      // Truncate the value to the actual limit
      const truncatedValue = newValue.slice(0, actualLimit);
      e.target.value = truncatedValue;
      
      // Create a new event with the truncated value
      const truncatedEvent = {
        ...e,
        target: {
          ...e.target,
          value: truncatedValue
        }
      } as React.ChangeEvent<HTMLInputElement>;
      
      // Call onChange with the truncated event
      onChange(truncatedEvent);
      return;
    }
    
    // Apply input mask if specified
    let processedValue = newValue;
    if (mask) {
      processedValue = applyInputMask(newValue, mask);
    }
    
    // Validate input
    const validationResult = validateInput(processedValue);
    setValidationError(validationResult);
    
    // Filter suggestions
    if (suggestions.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(processedValue.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    }
    
    // Create a new event with the processed value for onChange
    const processedEvent = {
      ...e,
      target: {
        ...e.target,
        value: processedValue
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    // Call onChange with the processed event
    onChange(processedEvent);
  };

  // Input mask functions
  const applyInputMask = (value: string, maskType: string): string => {
    switch (maskType) {
      case 'phone':
        // Remove all non-digits and apply phone format
        const phoneDigits = value.replace(/\D/g, '');
        if (phoneDigits.length >= 10) {
          const formatted = phoneDigits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
          return formatted;
        }
        return phoneDigits;
      case 'credit-card':
        // Remove all non-digits and apply credit card format
        const cardDigits = value.replace(/\D/g, '');
        if (cardDigits.length >= 16) {
          const formatted = cardDigits.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
          return formatted;
        }
        return cardDigits;
      case 'date':
        // Remove all non-digits and apply date format
        const dateDigits = value.replace(/\D/g, '');
        if (dateDigits.length >= 8) {
          return dateDigits.replace(/(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
        }
        return dateDigits;
      case 'time':
        // Remove all non-digits and apply time format
        const timeDigits = value.replace(/\D/g, '');
        if (timeDigits.length >= 4) {
          return timeDigits.replace(/(\d{2})(\d{2})/, '$1:$2');
        }
        return timeDigits;
      case 'currency':
        // Remove all non-digits and apply currency format
        const currencyDigits = value.replace(/\D/g, '');
        if (currencyDigits.length >= 3) {
          return currencyDigits.replace(/(\d+)(\d{2})$/, '$$$1.$2');
        }
        return currencyDigits;
      default:
        return value;
    }
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

  // Character count display with custom limit support
  const characterCountDisplay = characterCount ? (
    <div className={`input-character-count ${characterCountStyle !== 'default' ? `input-character-count--${characterCountStyle}` : ''}`}>
      {value.length}/{characterCountLimit || maxLength || '∞'}
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
        type={type === 'password' || mask ? (showPassword ? 'text' : 'password') : type}
        value={value}
        onChange={handleChange}
        placeholder={floatingLabel ? '' : placeholder}
        id={id}
        name={name}
        disabled={disabled || loading}
        autoComplete={autoComplete ?? (type === 'password' ? 'current-password' : undefined)}
        {...ariaProps}
        required={required || validation?.required}
        maxLength={characterCountLimit || maxLength}
        minLength={minLength}
        {...rest}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      />
      
      {/* Right icon, password toggle, input mask toggle, or loading spinner */}
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
      ) : mask ? (
        <button
          type="button"
          className="input-icon input-icon--right input-mask-toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? 'Hide input' : 'Show input'}
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
      {!iconRight && !loading && !type?.includes('password') && !mask && (
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
              <span className="validation-icon-error">X</span>
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