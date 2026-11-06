// Rating.tsx
import React, { forwardRef, useState, useCallback, useId } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Rating.css';

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps {
  /** Controlled rating value (0 to max). */
  value?: number;
  /** Uncontrolled initial rating. */
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Number of stars. Default: 5. */
  max?: number;
  /** Read-only (no interaction). */
  readonly?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Allow half-star precision. Default: false. */
  allowHalf?: boolean;
  /** Size. */
  size?: RatingSize;
  /** Theme override for the star accent color. */
  color?: string;
  /** Inactive star color override. */
  inactiveColor?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

const Star = ({ filled, half, active }: { filled: boolean; half?: boolean; active?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    className={`rating-component__star ${filled ? 'rating-component__star--filled' : ''} ${
      half ? 'rating-component__star--half' : ''
    } ${active ? 'rating-component__star--active' : ''}`}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="half-grad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={half ? 'url(#half-grad)' : filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value: controlled,
      defaultValue = 0,
      onChange,
      max = 5,
      readonly = false,
      disabled = false,
      allowHalf = false,
      size = 'md',
      color,
      inactiveColor,
      className = '',
      style,
      ariaLabel = 'Rating',
      id,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const isControlled = controlled !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const value = isControlled ? controlled! : internalValue;
    const displayValue = hoverValue ?? value;

    const handleClick = useCallback(
      (starValue: number) => {
        if (readonly || disabled) return;
        if (!isControlled) setInternalValue(starValue);
        onChange?.(starValue);
      },
      [readonly, disabled, isControlled, onChange],
    );

    const handleMouseMove = useCallback(
      (e: React.MouseEvent, starIndex: number) => {
        if (readonly || disabled || !allowHalf) return;
        const target = e.currentTarget as HTMLElement;
        const rect = target.getBoundingClientRect();
        const isLeftHalf = e.clientX - rect.left < rect.width / 2;
        setHoverValue(starIndex - (isLeftHalf ? 0.5 : 0));
      },
      [readonly, disabled, allowHalf],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (readonly || disabled) return;
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault();
          const step = allowHalf ? 0.5 : 1;
          const next = Math.min(value + step, max);
          if (!isControlled) setInternalValue(next);
          onChange?.(next);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault();
          const step = allowHalf ? 0.5 : 1;
          const next = Math.max(value - step, 0);
          if (!isControlled) setInternalValue(next);
          onChange?.(next);
        }
      },
      [readonly, disabled, allowHalf, value, max, isControlled, onChange],
    );

    const resolvedColor = resolveThemeValue(color);
    const resolvedInactive = resolveThemeValue(inactiveColor);

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--rating-custom-accent': resolvedColor }),
      ...(resolvedInactive && { '--rating-custom-inactive': resolvedInactive }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;
    const ariaProps = getAriaProps({ label: ariaLabel });

    const classes = [
      'rating-component',
      `rating-component--${size}`,
      (readonly || disabled) && 'rating-component--readonly',
      disabled && 'rating-component--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div
        ref={ref}
        id={id || generatedId}
        className={classes}
        style={mergedStyle}
        role="slider"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuetext={`${value} out of ${max}`}
        aria-readonly={readonly || undefined}
        aria-disabled={disabled || undefined}
        tabIndex={readonly || disabled ? -1 : 0}
        onKeyDown={handleKeyDown}
        onMouseLeave={() => setHoverValue(null)}
        {...ariaProps}
        {...rest}
      >
        {Array.from({ length: max }, (_, i) => {
          const starIndex = i + 1;
          const filled = displayValue >= starIndex;
          const half = allowHalf && !filled && displayValue >= starIndex - 0.5;
          return (
            <span
              key={i}
              className="rating-component__star-wrapper"
              onClick={() =>
                handleClick(
                  allowHalf ? starIndex - (displayValue === starIndex - 0.5 ? 0.5 : 0) : starIndex,
                )
              }
              onMouseMove={(e) => handleMouseMove(e, starIndex)}
            >
              <Star filled={filled} half={half} active={hoverValue !== null} />
            </span>
          );
        })}
      </div>
    );
  },
);

Rating.displayName = 'Rating';
