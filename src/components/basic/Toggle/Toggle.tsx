// Toggle.tsx
import React, { forwardRef, useState, useEffect } from 'react';
import { resolveThemeValue } from '../../../utils';
import './Toggle.css';

export interface ToggleProps {
  // Core props
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  backdropBlur?: boolean;
  
  // Comprehensive color customization
  trackColor?: string;
  trackGradient?: string;
  activeTrackColor?: string;
  activeTrackGradient?: string;
  thumbColor?: string;
  thumbGradient?: string;
  activeThumbColor?: string;
  activeThumbGradient?: string;
  labelColor?: string;
  labelGradient?: string;
  iconColor?: string;
  iconGradient?: string;
  
  // Features
  label?: string;
  labelPosition?: 'left' | 'right' | 'top' | 'bottom';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  ripple?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  id?: string;
  name?: string;
  
  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(({
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  loading = false,
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  borderRadius,
  shadow = 'md',
  backdropBlur = false,
  
  // Comprehensive color customization
  trackColor,
  trackGradient,
  activeTrackColor,
  activeTrackGradient,
  thumbColor,
  thumbGradient,
  activeThumbColor,
  activeThumbGradient,
  labelColor,
  labelGradient,
  iconColor,
  iconGradient,
  label,
  labelPosition = 'right',
  icon,
  iconPosition = 'left',
  ripple = false,
  ariaLabel,
  id,
  name,
  className = '',
  style,
  ...rest
}, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;
  
  // Handle state changes
  const handleToggle = () => {
    if (disabled || loading) return;
    
    const newChecked = !checked;
    
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    
    onChange?.(newChecked);
  };
  
  // Handle keyboard events
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  };
  
  // Handle mouse events for ripple effect
  const handleMouseDown = (event: React.MouseEvent) => {
    if (ripple && !disabled && !loading) {
      setIsPressed(true);
      
      // Create ripple effect
      const button = event.currentTarget;
      const ripple = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: toggle-ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      button.appendChild(ripple);
      
      // Auto-cleanup after animation
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 600);
    }
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  // Resolve theme values for all color props
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedTrackColor = resolveThemeValue(trackColor);
  const resolvedTrackGradient = resolveThemeValue(trackGradient);
  const resolvedActiveTrackColor = resolveThemeValue(activeTrackColor);
  const resolvedActiveTrackGradient = resolveThemeValue(activeTrackGradient);
  const resolvedThumbColor = resolveThemeValue(thumbColor);
  const resolvedThumbGradient = resolveThemeValue(thumbGradient);
  const resolvedActiveThumbColor = resolveThemeValue(activeThumbColor);
  const resolvedActiveThumbGradient = resolveThemeValue(activeThumbGradient);
  const resolvedLabelColor = resolveThemeValue(labelColor);
  const resolvedLabelGradient = resolveThemeValue(labelGradient);
  const resolvedIconColor = resolveThemeValue(iconColor);
  const resolvedIconGradient = resolveThemeValue(iconGradient);

  // Gradient detection for CSS class application
  const isTrackGradient = trackGradient && trackGradient.includes('gradient');
  const isActiveTrackGradient = activeTrackGradient && activeTrackGradient.includes('gradient');
  const isThumbGradient = thumbGradient && thumbGradient.includes('gradient');
  const isActiveThumbGradient = activeThumbGradient && activeThumbGradient.includes('gradient');
  const isLabelGradient = labelGradient && labelGradient.includes('gradient');
  const isIconGradient = iconGradient && iconGradient.includes('gradient');
  const isTextGradient = textColor && textColor.includes('gradient');
  const isBorderGradient = borderColor && borderColor.includes('gradient');
  
  // Create style object with CSS custom properties
  const toggleStyle: React.CSSProperties = {
    // Legacy support
    ...(resolvedGradient && { '--toggle-custom-bg': resolvedGradient }),
    ...(resolvedColor && { '--toggle-custom-bg': resolvedColor }),
    ...(resolvedTextColor && { '--toggle-custom-color': resolvedTextColor }),
    ...(resolvedBorderColor && { '--toggle-custom-border': resolvedBorderColor }),
    
    // Comprehensive color customization
    ...(resolvedTrackGradient && { '--toggle-custom-track-gradient': resolvedTrackGradient }),
    ...(resolvedTrackColor && !resolvedTrackGradient && { '--toggle-custom-track-color': resolvedTrackColor }),
    ...(resolvedActiveTrackGradient && { '--toggle-custom-active-track-gradient': resolvedActiveTrackGradient }),
    ...(resolvedActiveTrackColor && !resolvedActiveTrackGradient && { '--toggle-custom-active-track-color': resolvedActiveTrackColor }),
    ...(resolvedThumbGradient && { '--toggle-custom-thumb-gradient': resolvedThumbGradient }),
    ...(resolvedThumbColor && !resolvedThumbGradient && { '--toggle-custom-thumb-color': resolvedThumbColor }),
    ...(resolvedActiveThumbGradient && { '--toggle-custom-active-thumb-gradient': resolvedActiveThumbGradient }),
    ...(resolvedActiveThumbColor && !resolvedActiveThumbGradient && { '--toggle-custom-active-thumb-color': resolvedActiveThumbColor }),
    ...(resolvedLabelGradient && { '--toggle-custom-label-gradient': resolvedLabelGradient }),
    ...(resolvedLabelColor && !resolvedLabelGradient && { '--toggle-custom-label-color': resolvedLabelColor }),
    ...(resolvedIconGradient && { '--toggle-custom-icon-gradient': resolvedIconGradient }),
    ...(resolvedIconColor && !resolvedIconGradient && { '--toggle-custom-icon-color': resolvedIconColor }),
    
    // Text and border gradients
    ...(resolvedTextColor && isTextGradient && { '--toggle-custom-text-gradient': resolvedTextColor }),
    ...(resolvedBorderColor && isBorderGradient && { '--toggle-custom-border-gradient': resolvedBorderColor }),
    
    // Other styling
    ...(borderRadius && { '--toggle-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--toggle-custom-shadow': shadow }),
    ...(backdropBlur && { '--toggle-custom-backdrop-blur': 'blur(8px)' }),
    ...style,
  };
  
  // Build CSS classes
  const classes = [
    'toggle-component',
    `toggle-component--${variant}`,
    `toggle-component--${size}`,
    checked && 'toggle-component--checked',
    disabled && 'toggle-component--disabled',
    loading && 'toggle-component--loading',
    `toggle-component--shadow-${shadow}`,
    ripple && 'toggle-component--ripple',
    label && `toggle-component--has-label`,
    label && `toggle-component--label-${labelPosition}`,
    icon && `toggle-component--has-icon`,
    icon && `toggle-component--icon-${iconPosition}`,
    // Gradient detection classes
    isTrackGradient && 'toggle-component--track-gradient',
    isActiveTrackGradient && 'toggle-component--active-track-gradient',
    isThumbGradient && 'toggle-component--thumb-gradient',
    isActiveThumbGradient && 'toggle-component--active-thumb-gradient',
    isLabelGradient && 'toggle-component--label-gradient',
    isIconGradient && 'toggle-component--icon-gradient',
    isTextGradient && 'toggle-component--text-gradient',
    isBorderGradient && 'toggle-component--border-gradient',
    className,
  ].filter(Boolean).join(' ');
  
  // Accessibility props
  const accessibilityProps = {
    'aria-label': ariaLabel || label || 'Toggle',
    'aria-checked': checked,
    'aria-disabled': disabled || loading,
    'aria-describedby': label ? `${id || 'toggle'}-label` : undefined,
    role: 'switch',
    tabIndex: disabled || loading ? -1 : 0,
    id,
    name,
  };
  
  // Render label based on position
  const renderLabel = () => {
    if (!label) return null;
    
    const labelElement = (
      <span 
        id={`${id || 'toggle'}-label`}
        className="toggle-component__label"
      >
        {label}
      </span>
    );
    
    if (labelPosition === 'left' || labelPosition === 'top') {
      return labelElement;
    }
    return null;
  };
  
  const renderLabelAfter = () => {
    if (!label || labelPosition === 'left' || labelPosition === 'top') return null;
    
    return (
      <span 
        id={`${id || 'toggle'}-label`}
        className="toggle-component__label"
      >
        {label}
      </span>
    );
  };
  
  // Render icon
  const renderIcon = () => {
    if (!icon) return null;
    
    return (
      <span className={`toggle-component__icon toggle-component__icon--${iconPosition}`} aria-hidden="true">
        {icon}
      </span>
    );
  };
  
  return (
    <div className="toggle-component__wrapper" style={toggleStyle}>
      {renderLabel()}
      
      <button
        ref={ref}
        className={classes}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        disabled={disabled || loading}
        {...accessibilityProps}
        {...rest}
      >
        {renderIcon()}
        
        <div className="toggle-component__track">
          <div className="toggle-component__thumb" />
        </div>
        
        {loading && (
          <span className="toggle-component__spinner" aria-hidden="true" />
        )}
      </button>
      
      {renderLabelAfter()}
    </div>
  );
});

Toggle.displayName = 'Toggle';
