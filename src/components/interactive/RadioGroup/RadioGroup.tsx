import React, { forwardRef, ReactNode } from 'react';
import { resolveThemeValue, getAriaProps, createRipple } from '../../../utils';
import './RadioGroup.css';

export interface RadioOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  name: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  // New comprehensive color customization
  containerColor?: string;
  containerGradient?: string;
  optionColor?: string;
  optionGradient?: string;
  radioColor?: string;
  radioGradient?: string;
  radioDotColor?: string;
  radioDotGradient?: string;
  labelColor?: string;
  labelGradient?: string;
  descriptionColor?: string;
  descriptionGradient?: string;
  errorColor?: string;
  errorGradient?: string;
  noOptionsColor?: string;
  noOptionsGradient?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  rounded?: boolean;
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  ripple?: boolean;
  required?: boolean;
  invalid?: boolean;
  label?: string;
  description?: string;
  errorMessage?: string;
  className?: string;
  style?: React.CSSProperties;
  gradientTarget?: 'container' | 'options' | 'radio' | 'all';
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(({
  options,
  value,
  onChange,
  name,
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  // New comprehensive color customization
  containerColor,
  containerGradient,
  optionColor,
  optionGradient,
  radioColor,
  radioGradient,
  radioDotColor,
  radioDotGradient,
  labelColor,
  labelGradient,
  descriptionColor,
  descriptionGradient,
  errorColor,
  errorGradient,
  noOptionsColor,
  noOptionsGradient,
  shadow = 'none',
  hoverEffect = 'none',
  rounded = false,
  disabled = false,
  direction = 'vertical',
  ripple = false,
  required = false,
  invalid = false,
  label,
  description,
  errorMessage,
  className = '',
  style,
  gradientTarget = 'options',
  ...rest
}, ref) => {
  const isDisabled = disabled;
  
  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  
  // Resolve comprehensive color customization
  const resolvedContainerColor = resolveThemeValue(containerColor);
  const resolvedContainerGradient = resolveThemeValue(containerGradient);
  const resolvedOptionColor = resolveThemeValue(optionColor);
  const resolvedOptionGradient = resolveThemeValue(optionGradient);
  const resolvedRadioColor = resolveThemeValue(radioColor);
  const resolvedRadioGradient = resolveThemeValue(radioGradient);
  const resolvedRadioDotColor = resolveThemeValue(radioDotColor);
  const resolvedRadioDotGradient = resolveThemeValue(radioDotGradient);
  const resolvedLabelColor = resolveThemeValue(labelColor);
  const resolvedLabelGradient = resolveThemeValue(labelGradient);
  const resolvedDescriptionColor = resolveThemeValue(descriptionColor);
  const resolvedDescriptionGradient = resolveThemeValue(descriptionGradient);
  const resolvedErrorColor = resolveThemeValue(errorColor);
  const resolvedErrorGradient = resolveThemeValue(errorGradient);
  const resolvedNoOptionsColor = resolveThemeValue(noOptionsColor);
  const resolvedNoOptionsGradient = resolveThemeValue(noOptionsGradient);
  
  // Gradient detection for CSS class application
  const isContainerGradient = containerGradient && containerGradient.includes('gradient');
  const isOptionGradient = optionGradient && optionGradient.includes('gradient');
  const isRadioGradient = radioGradient && radioGradient.includes('gradient');
  const isRadioDotGradient = radioDotGradient && radioDotGradient.includes('gradient');
  const isLabelGradient = labelGradient && labelGradient.includes('gradient');
  const isDescriptionGradient = descriptionGradient && descriptionGradient.includes('gradient');
  const isErrorGradient = errorGradient && errorGradient.includes('gradient');
  const isNoOptionsGradient = noOptionsGradient && noOptionsGradient.includes('gradient');
  const isTextGradient = textColor && textColor.includes('gradient');
  const isBorderGradient = borderColor && borderColor.includes('gradient');
  
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
    'radio-group-component',
    // Always apply variant class for CSS custom properties, even with custom colors
    `radio-group-component--${finalVariant}`,
    `radio-group-component--${size}`,
    `radio-group-component--${direction}`,
    `radio-group-component--shadow-${shadow}`,
    `radio-group-component--hover-${hoverEffect}`,
    rounded && 'radio-group-component--rounded',
    isDisabled && 'radio-group-component--disabled',
    invalid && 'radio-group-component--invalid',
    // Gradient detection classes
    isContainerGradient && 'radio-group-component--container-gradient',
    isOptionGradient && 'radio-group-component--option-gradient',
    isRadioGradient && 'radio-group-component--radio-gradient',
    isRadioDotGradient && 'radio-group-component--radio-dot-gradient',
    isLabelGradient && 'radio-group-component--label-gradient',
    isDescriptionGradient && 'radio-group-component--description-gradient',
    isErrorGradient && 'radio-group-component--error-gradient',
    isNoOptionsGradient && 'radio-group-component--no-options-gradient',
    isTextGradient && 'radio-group-component--text-gradient',
    isBorderGradient && 'radio-group-component--border-gradient',
    className,
  ].filter(Boolean).join(' ');

  // Clean style application - prioritize gradients over colors, specific over general
  const componentStyle: React.CSSProperties = {
    // Container level
    ...(resolvedContainerGradient && { '--radio-group-container-bg': resolvedContainerGradient }),
    ...(resolvedContainerColor && !resolvedContainerGradient && { '--radio-group-container-bg': resolvedContainerColor }),
    
    // Option level
    ...(resolvedOptionGradient && { '--radio-group-option-bg': resolvedOptionGradient }),
    ...(resolvedOptionColor && !resolvedOptionGradient && { '--radio-group-option-bg': resolvedOptionColor }),
    
    // Radio button level
    ...(resolvedRadioGradient && { '--radio-group-radio-bg': resolvedRadioGradient }),
    ...(resolvedRadioColor && !resolvedRadioGradient && { '--radio-group-radio-bg': resolvedRadioColor }),
    
    // Radio dot level
    ...(resolvedRadioDotGradient && { '--radio-group-radio-dot-bg': resolvedRadioDotGradient }),
    ...(resolvedRadioDotColor && !resolvedRadioDotGradient && { '--radio-group-radio-dot-bg': resolvedRadioDotColor }),
    
    // Label level
    ...(resolvedLabelGradient && { '--radio-group-label-bg': resolvedLabelGradient }),
    ...(resolvedLabelColor && !resolvedLabelGradient && { '--radio-group-label-color': resolvedLabelColor }),
    
    // Description level
    ...(resolvedDescriptionGradient && { '--radio-group-description-bg': resolvedDescriptionGradient }),
    ...(resolvedDescriptionColor && !resolvedDescriptionGradient && { '--radio-group-description-color': resolvedDescriptionColor }),
    
    // Error level
    ...(resolvedErrorGradient && { '--radio-group-error-bg': resolvedErrorGradient }),
    ...(resolvedErrorColor && !resolvedErrorGradient && { '--radio-group-error-color': resolvedErrorColor }),
    
    // No options level
    ...(resolvedNoOptionsGradient && { '--radio-group-no-options-bg': resolvedNoOptionsGradient }),
    ...(resolvedNoOptionsColor && !resolvedNoOptionsGradient && { '--radio-group-no-options-color': resolvedNoOptionsColor }),
    
    // Text and border gradients
    ...(resolvedTextColor && isTextGradient && { '--radio-group-custom-text-gradient': resolvedTextColor }),
    ...(resolvedBorderColor && isBorderGradient && { '--radio-group-custom-border-gradient': resolvedBorderColor }),
    
    // Legacy support (only if specific props aren't provided)
    ...(resolvedGradient && !resolvedContainerGradient && !resolvedOptionGradient && !resolvedRadioGradient && gradientTarget === 'container' && { '--radio-group-custom-bg': resolvedGradient }),
    ...(resolvedColor && !resolvedContainerColor && !resolvedOptionColor && !resolvedRadioColor && gradientTarget === 'container' && { '--radio-group-custom-bg': resolvedColor }),
    ...(resolvedGradient && !resolvedOptionGradient && (gradientTarget === 'options' || gradientTarget === 'all') && { '--radio-group-option-bg': resolvedGradient }),
    ...(resolvedColor && !resolvedOptionColor && (gradientTarget === 'options' || gradientTarget === 'all') && { '--radio-group-option-bg': resolvedColor }),
    ...(resolvedGradient && !resolvedRadioGradient && (gradientTarget === 'radio' || gradientTarget === 'all') && { '--radio-group-radio-bg': resolvedGradient }),
    ...(resolvedColor && !resolvedRadioColor && (gradientTarget === 'radio' || gradientTarget === 'all') && { '--radio-group-radio-bg': resolvedColor }),
    
    // Text and border colors (always applied)
    ...(resolvedTextColor && { '--radio-group-text-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--radio-group-border-color': resolvedBorderColor }),
    
    // Apply custom style prop last to allow overrides
    ...style,
  };

  // Debug logging for theme builder
  if (process.env.NODE_ENV === 'development') {
    console.log('RadioGroup Props:', {
      color,
      gradient,
      textColor,
      borderColor,
      resolvedColor,
      resolvedGradient,
      resolvedTextColor,
      resolvedBorderColor,
      componentStyle
    });
  }

  // ARIA attributes
  const ariaProps = getAriaProps({
    label: label || 'Radio group',
    required,
    invalid,
    disabled: isDisabled,
    role: 'radiogroup',
  });

  // Handle radio change with ripple effect
  const handleRadioChange = (optionValue: string | number, event: React.MouseEvent<HTMLSpanElement>) => {
    if (isDisabled || options.find(opt => opt.value === optionValue)?.disabled) return;
    
    if (ripple) {
      const removeRipple = createRipple(event, {
        color: 'rgba(59, 130, 246, 0.3)',
        duration: 600
      });
      
      // Auto-cleanup after animation
      setTimeout(removeRipple, 600);
    }
    
    onChange(optionValue);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, currentValue: string | number) => {
    if (isDisabled) return;
    
    const currentIndex = options.findIndex(opt => opt.value === currentValue);
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex;
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        nextIndex = (currentIndex + 1) % options.length;
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        nextIndex = currentIndex === 0 ? options.length - 1 : currentIndex - 1;
        break;
      case ' ':
      case 'Enter':
        event.preventDefault();
        onChange(currentValue);
        return;
    }
    
    // Find next enabled option
    let attempts = 0;
    while (attempts < options.length) {
      const option = options[nextIndex];
      if (!option.disabled) {
        onChange(option.value);
        break;
      }
      nextIndex = (nextIndex + 1) % options.length;
      attempts++;
    }
  };

  if (options.length === 0) {
    return (
      <div className="radio-group-component__no-options">
        <span className="radio-group-component__no-options-text">No options available</span>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={classes}
      style={componentStyle}
      {...ariaProps}
      {...rest}
    >
      {/* Label */}
      {label && (
        <div className="radio-group-component__label">
          <span className="radio-group-component__label-text">
            {label}
            {required && <span className="radio-group-component__required" aria-hidden="true"> *</span>}
          </span>
        </div>
      )}
      
      {/* Description */}
      {description && (
        <div className="radio-group-component__description">
          {description}
        </div>
      )}
      
      {/* Radio Options */}
      <div className="radio-group-component__options">
        {options.map((option) => {
          const isOptionDisabled = isDisabled || option.disabled;
          const isChecked = option.value === value;
          
          return (
            <label
              key={option.value}
              className={`radio-group-component__option ${isOptionDisabled ? 'disabled' : ''} ${isChecked ? 'checked' : ''}`}
              tabIndex={isOptionDisabled ? -1 : 0}
              onKeyDown={(e) => handleKeyDown(e, option.value)}
              htmlFor={`${name}-${option.value}`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isChecked}
                onChange={() => !isOptionDisabled && onChange(option.value)}
                disabled={isOptionDisabled}
                required={required}
                aria-checked={isChecked}
                aria-disabled={isOptionDisabled}
                className="radio-group-component__input"
                id={`${name}-${option.value}`}
              />
              <span 
                className="radio-group-component__radio"
                onClick={(e) => handleRadioChange(option.value, e)}
              />
              <div className="radio-group-component__content">
                <span className="radio-group-component__option-label">
                  {option.label}
                </span>
                {option.description && (
                  <span className="radio-group-component__option-description">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
      
      {/* Error Message */}
      {errorMessage && (
        <div className="radio-group-component__error" role="alert">
          {errorMessage}
        </div>
      )}
    </div>
  );
});

RadioGroup.displayName = 'RadioGroup';