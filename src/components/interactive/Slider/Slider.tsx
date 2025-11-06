// Slider.tsx
import React, { forwardRef, useState, useRef, useCallback } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Slider.css';

export type SliderSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SliderVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';

export interface SliderProps {
  // Value
  value?: number | [number, number]; // Single value or [min, max] for range
  defaultValue?: number | [number, number];
  onChange?: (value: number | [number, number]) => void;
  onChangeCommitted?: (value: number | [number, number]) => void;

  // Range
  min?: number;
  max?: number;
  step?: number;

  // Type
  range?: boolean; // Dual-handle range slider

  // Styling
  variant?: SliderVariant;
  size?: SliderSize;
  color?: string;
  gradient?: string;
  trackColor?: string;
  thumbColor?: string;

  // Features
  label?: string;
  showValue?: boolean;
  showTooltip?: boolean;
  marks?: boolean | Array<{ value: number; label?: string }>;
  disabled?: boolean;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;
  name?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      onChangeCommitted,

      // Range
      min = 0,
      max = 100,
      step = 1,

      // Type
      range = false,

      // Styling
      variant = 'primary',
      size = 'md',
      color,
      gradient,
      trackColor,
      thumbColor,

      // Features
      label,
      showValue = false,
      showTooltip = true,
      marks = false,
      disabled = false,

      // Accessibility
      ariaLabel,
      ariaDescribedBy,
      id,
      name,

      // Styling overrides
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    // Internal state
    const [internalValue, setInternalValue] = useState<number | [number, number]>(
      defaultValue || (range ? [min, max] : min),
    );
    const [isDragging, setIsDragging] = useState<number | null>(null); // Track which thumb is dragging (0 or 1 for range)
    const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);

    const trackRef = useRef<HTMLDivElement>(null);
    const thumb0Ref = useRef<HTMLDivElement>(null);
    const thumb1Ref = useRef<HTMLDivElement>(null);

    // Determine if controlled
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    // Normalize value to array format for easier handling
    const values: [number, number] = Array.isArray(currentValue)
      ? currentValue
      : [currentValue, currentValue];

    // Clamp values to min/max
    const clampedValues: [number, number] = [
      Math.max(min, Math.min(max, values[0])),
      Math.max(min, Math.min(max, values[1])),
    ];

    // Ensure min <= max for range sliders
    const normalizedValues: [number, number] = range
      ? [Math.min(clampedValues[0], clampedValues[1]), Math.max(clampedValues[0], clampedValues[1])]
      : clampedValues;

    // Calculate percentages
    const percentage0 = ((normalizedValues[0] - min) / (max - min)) * 100;
    const percentage1 = ((normalizedValues[1] - min) / (max - min)) * 100;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTrackColor = resolveThemeValue(trackColor);
    const resolvedThumbColor = resolveThemeValue(thumbColor);

    // Check for gradients
    const isColorGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    // Get value from mouse/touch position
    const getValueFromPosition = useCallback(
      (clientX: number): number => {
        if (!trackRef.current) return min;

        const rect = trackRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        const rawValue = min + (percentage / 100) * (max - min);

        // Snap to step
        const steppedValue = Math.round(rawValue / step) * step;
        return Math.max(min, Math.min(max, steppedValue));
      },
      [min, max, step],
    );

    // Update value
    const updateValue = useCallback(
      (newValue: number, thumbIndex: number) => {
        if (disabled) return;

        let updatedValue: number | [number, number];

        if (range) {
          const newValues: [number, number] = [...normalizedValues];
          newValues[thumbIndex] = newValue;
          // Ensure order for range slider
          if (thumbIndex === 0) {
            newValues[0] = Math.min(newValue, normalizedValues[1]);
          } else {
            newValues[1] = Math.max(newValue, normalizedValues[0]);
          }
          updatedValue = newValues;
        } else {
          updatedValue = newValue;
        }

        if (!isControlled) {
          setInternalValue(updatedValue);
        }
        onChange?.(updatedValue);
      },
      [disabled, range, normalizedValues, isControlled, onChange],
    );

    // Handle mouse down
    const handleMouseDown = useCallback(
      (e: React.MouseEvent, thumbIndex: number) => {
        if (disabled) return;
        e.preventDefault();
        setIsDragging(thumbIndex);

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const newValue = getValueFromPosition(moveEvent.clientX);
          updateValue(newValue, thumbIndex);
        };

        const handleMouseUp = () => {
          setIsDragging(null);
          if (onChangeCommitted) {
            const current = isControlled ? controlledValue : internalValue;
            onChangeCommitted(current);
          }
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      },
      [
        disabled,
        getValueFromPosition,
        updateValue,
        isControlled,
        controlledValue,
        internalValue,
        onChangeCommitted,
      ],
    );

    // Handle track click
    const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
        if (disabled || isDragging !== null) return;

        const newValue = getValueFromPosition(e.clientX);

        if (range) {
          // Find closest thumb
          const dist0 = Math.abs(newValue - normalizedValues[0]);
          const dist1 = Math.abs(newValue - normalizedValues[1]);
          const thumbIndex = dist0 < dist1 ? 0 : 1;
          updateValue(newValue, thumbIndex);
        } else {
          updateValue(newValue, 0);
        }
      },
      [disabled, isDragging, getValueFromPosition, range, normalizedValues, updateValue],
    );

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, thumbIndex: number) => {
        if (disabled) return;

        let delta = 0;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          delta = step;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          delta = -step;
        } else if (e.key === 'PageUp') {
          delta = step * 10;
        } else if (e.key === 'PageDown') {
          delta = -step * 10;
        } else if (e.key === 'Home') {
          updateValue(min, thumbIndex);
          return;
        } else if (e.key === 'End') {
          updateValue(max, thumbIndex);
          return;
        } else {
          return;
        }

        e.preventDefault();
        const newValue = Math.max(min, Math.min(max, normalizedValues[thumbIndex] + delta));
        updateValue(newValue, thumbIndex);

        if (onChangeCommitted) {
          setTimeout(() => {
            const current = isControlled ? controlledValue : internalValue;
            onChangeCommitted(current);
          }, 0);
        }
      },
      [
        disabled,
        step,
        min,
        max,
        normalizedValues,
        updateValue,
        isControlled,
        controlledValue,
        internalValue,
        onChangeCommitted,
      ],
    );

    // Generate marks
    const marksArray = Array.isArray(marks) ? marks : marks ? [] : [];

    // Classes
    const classes = [
      'slider-component',
      `slider-component--${variant}`,
      `slider-component--${size}`,
      range && 'slider-component--range',
      disabled && 'slider-component--disabled',
      isColorGradient && 'slider-component--gradient',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      // Color: gradient > color (gradients take precedence)
      ...(resolvedGradient && {
        '--slider-custom-color': resolvedGradient,
        '--slider-color': resolvedGradient,
      }),
      ...(resolvedColor &&
        !resolvedGradient && {
          '--slider-custom-color': resolvedColor,
          '--slider-color': resolvedColor,
        }),
      ...(resolvedTrackColor && {
        '--slider-custom-track-color': resolvedTrackColor,
        '--slider-track-color': resolvedTrackColor,
      }),
      ...(resolvedThumbColor && {
        '--slider-custom-thumb-color': resolvedThumbColor,
        '--slider-thumb-color': resolvedThumbColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || label || 'Slider',
      describedBy: ariaDescribedBy,
    });

    return (
      <div ref={ref} id={id} className={classes} style={mergedStyle} {...ariaProps} {...rest}>
        {(label || showValue) && (
          <div className="slider-component__header">
            {label && <label className="slider-component__label">{label}</label>}
            {showValue && (
              <span className="slider-component__value">
                {range ? `${normalizedValues[0]} - ${normalizedValues[1]}` : normalizedValues[0]}
              </span>
            )}
          </div>
        )}

        <div className="slider-component__container">
          {/* Track */}
          <div
            ref={trackRef}
            className="slider-component__track"
            onClick={handleTrackClick}
            role="presentation"
          >
            {/* Active track (filled portion) */}
            <div
              className="slider-component__track-active"
              style={{
                left: `${percentage0}%`,
                width: `${percentage1 - percentage0}%`,
              }}
            />

            {/* Marks */}
            {marks && (
              <div className="slider-component__marks">
                {marksArray.length > 0
                  ? marksArray.map((mark, index) => {
                      const markPercentage = ((mark.value - min) / (max - min)) * 100;
                      return (
                        <div
                          key={index}
                          className="slider-component__mark"
                          style={{ left: `${markPercentage}%` }}
                        >
                          <span className="slider-component__mark-dot" />
                          {mark.label && (
                            <span className="slider-component__mark-label">{mark.label}</span>
                          )}
                        </div>
                      );
                    })
                  : // Generate marks based on step
                    Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => {
                      const markValue = min + i * step;
                      const markPercentage = ((markValue - min) / (max - min)) * 100;
                      return (
                        <div
                          key={i}
                          className="slider-component__mark"
                          style={{ left: `${markPercentage}%` }}
                        >
                          <span className="slider-component__mark-dot" />
                        </div>
                      );
                    })}
              </div>
            )}
          </div>

          {/* Thumb 0 (always visible) */}
          <div
            ref={thumb0Ref}
            className={`slider-component__thumb ${hoveredThumb === 0 || isDragging === 0 ? 'slider-component__thumb--active' : ''}`}
            style={{ left: `${percentage0}%` }}
            onMouseDown={(e) => handleMouseDown(e, 0)}
            onMouseEnter={() => setHoveredThumb(0)}
            onMouseLeave={() => setHoveredThumb(null)}
            onKeyDown={(e) => handleKeyDown(e, 0)}
            tabIndex={disabled ? -1 : 0}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={range ? normalizedValues[1] : max}
            aria-valuenow={normalizedValues[0]}
            aria-label={ariaLabel || (range ? 'Minimum value' : label || 'Slider')}
          >
            {showTooltip && <div className="slider-component__tooltip">{normalizedValues[0]}</div>}
          </div>

          {/* Thumb 1 (only for range slider) */}
          {range && (
            <div
              ref={thumb1Ref}
              className={`slider-component__thumb ${hoveredThumb === 1 || isDragging === 1 ? 'slider-component__thumb--active' : ''}`}
              style={{ left: `${percentage1}%` }}
              onMouseDown={(e) => handleMouseDown(e, 1)}
              onMouseEnter={() => setHoveredThumb(1)}
              onMouseLeave={() => setHoveredThumb(null)}
              onKeyDown={(e) => handleKeyDown(e, 1)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuemin={normalizedValues[0]}
              aria-valuemax={max}
              aria-valuenow={normalizedValues[1]}
              aria-label="Maximum value"
            >
              {showTooltip && (
                <div className="slider-component__tooltip">{normalizedValues[1]}</div>
              )}
            </div>
          )}
        </div>

        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={Array.isArray(currentValue) ? currentValue.join(',') : currentValue}
          />
        )}
      </div>
    );
  },
);

Slider.displayName = 'Slider';
