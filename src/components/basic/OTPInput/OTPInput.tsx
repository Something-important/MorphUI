import React, {
  forwardRef,
  useRef,
  useState,
  useCallback,
  useEffect,
  useId,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent,
  type CSSProperties,
} from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './OTPInput.css';

export type OTPInputVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'ghost'
  | 'outline';
export type OTPInputSize = 'sm' | 'md' | 'lg';
export type OTPInputType = 'numeric' | 'alphanumeric';

export interface OTPInputProps {
  /** Controlled value (string of entered characters). */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Called when the value changes (fires on every keystroke). */
  onChange?: (value: string) => void;
  /** Called when all cells are filled. */
  onComplete?: (value: string) => void;
  /** Number of input cells. Default: 6. */
  length?: number;
  /** Input type — numeric (digits only) or alphanumeric. Default: 'numeric'. */
  type?: OTPInputType;
  /** Hide characters (password-style). Default: false. */
  mask?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Error state (adds error styling). */
  error?: boolean;
  /** Variant. Default: 'primary'. */
  variant?: OTPInputVariant;
  /** Size. Default: 'md'. */
  size?: OTPInputSize;
  /** Theme override for the active/focus border accent. */
  color?: string;
  /** Text color override. */
  textColor?: string;
  /** Border color override. */
  borderColor?: string;
  /** Focus ring color override. */
  focusColor?: string;
  /** Pass-through for browser OTP autofill (e.g. 'one-time-code'). */
  autoComplete?: string;
  /** Accessibility label. Default: 'One-time password input'. */
  ariaLabel?: string;
  /** ID of element that describes this input. */
  ariaDescribedBy?: string;
  /** ID for the root element. */
  id?: string;
  /** Styling overrides. */
  className?: string;
  style?: CSSProperties;
}

// Filter characters based on type
const filterChar = (char: string, type: OTPInputType): string => {
  if (type === 'numeric') {
    return /\d/.test(char) ? char : '';
  }
  return /[a-zA-Z0-9]/.test(char) ? char.toUpperCase() : '';
};

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = '',
      onChange,
      onComplete,
      length = 6,
      type = 'numeric',
      mask = false,
      disabled = false,
      error = false,
      variant = 'primary',
      size = 'md',
      color,
      textColor,
      borderColor,
      focusColor,
      autoComplete = 'one-time-code',
      ariaLabel = 'One-time password input',
      ariaDescribedBy,
      id,
      className = '',
      style,
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const isControlled = controlledValue !== undefined;

    // Internal state: array of single characters
    const [internalValues, setInternalValues] = useState<string[]>(() => {
      const init = defaultValue.slice(0, length).split('');
      return Array.from({ length }, (_, i) => init[i] ?? '');
    });

    // Sync controlled value to internal state
    useEffect(() => {
      if (isControlled) {
        const chars = (controlledValue ?? '').slice(0, length).split('');
        setInternalValues(Array.from({ length }, (_, i) => chars[i] ?? ''));
      }
    }, [controlledValue, length, isControlled]);

    // Internal values array is the source of truth; controlled value
    // is synced via the useEffect above.

    // Notify parent + check complete
    const notifyChange = useCallback(
      (newValues: string[]) => {
        const str = newValues.join('');
        if (!isControlled) {
          setInternalValues(newValues);
        }
        onChange?.(str);
        if (str.length === length && newValues.every((v) => v !== '')) {
          onComplete?.(str);
        }
      },
      [isControlled, length, onChange, onComplete],
    );

    // Focus a specific cell
    const focusCell = useCallback(
      (index: number) => {
        const clamped = Math.max(0, Math.min(index, length - 1));
        const input = inputRefs.current[clamped];
        if (input) {
          input.focus();
          input.select();
        }
      },
      [length],
    );

    // Handle individual cell change
    const handleCellChange = useCallback(
      (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const raw = e.target.value;
        // Take the last character typed (in case the input somehow got more)
        const char = raw.length > 0 ? raw[raw.length - 1] : '';
        const filtered = filterChar(char, type);

        const newValues = [...internalValues];
        newValues[index] = filtered;
        notifyChange(newValues);

        // Move to next cell if a character was entered
        if (filtered && index < length - 1) {
          focusCell(index + 1);
        }
      },
      [internalValues, type, length, notifyChange, focusCell],
    );

    // Handle key down (backspace, arrows)
    const handleKeyDown = useCallback(
      (index: number, e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
          e.preventDefault();
          const newValues = [...internalValues];
          if (newValues[index]) {
            // Current cell has a value — delete it
            newValues[index] = '';
            notifyChange(newValues);
          } else if (index > 0) {
            // Current cell is empty — move back and delete previous
            newValues[index - 1] = '';
            notifyChange(newValues);
            focusCell(index - 1);
          }
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          focusCell(index - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          focusCell(index + 1);
        } else if (e.key === 'Home') {
          e.preventDefault();
          focusCell(0);
        } else if (e.key === 'End') {
          e.preventDefault();
          focusCell(length - 1);
        }
      },
      [internalValues, length, notifyChange, focusCell],
    );

    // Handle paste — distribute characters across cells
    const handlePaste = useCallback(
      (index: number, e: ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text');
        const newValues = [...internalValues];

        let writeIndex = index;
        for (const char of pasted) {
          if (writeIndex >= length) break;
          const filtered = filterChar(char, type);
          if (filtered) {
            newValues[writeIndex] = filtered;
            writeIndex++;
          }
        }

        notifyChange(newValues);
        // Focus the cell after the last filled, or the last cell
        focusCell(Math.min(writeIndex, length - 1));
      },
      [internalValues, length, type, notifyChange, focusCell],
    );

    // Handle focus — select content
    const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    }, []);

    // Theme resolution
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedFocusColor = resolveThemeValue(focusColor);

    // Classes
    const classes = [
      'otp-input-component',
      `otp-input-component--${variant}`,
      `otp-input-component--${size}`,
      error && 'otp-input-component--error',
      disabled && 'otp-input-component--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Style with CSS custom properties
    const componentStyle: CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--otp-custom-accent': resolvedColor }),
      ...(resolvedTextColor && { '--otp-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--otp-custom-border': resolvedBorderColor }),
      ...(resolvedFocusColor && { '--otp-custom-focus-color': resolvedFocusColor }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    const ariaProps = getAriaProps({
      label: ariaLabel,
      describedBy: ariaDescribedBy,
    });

    return (
      <div
        ref={ref}
        id={id ?? generatedId}
        className={classes}
        style={mergedStyle}
        role="group"
        {...ariaProps}
      >
        {Array.from({ length }, (_, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type={mask ? 'password' : 'text'}
            inputMode={type === 'numeric' ? 'numeric' : 'text'}
            pattern={type === 'numeric' ? '[0-9]*' : '[A-Za-z0-9]*'}
            maxLength={1}
            value={internalValues[index] ?? ''}
            onChange={(e) => handleCellChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={(e) => handlePaste(index, e)}
            onFocus={handleFocus}
            disabled={disabled}
            autoComplete={index === 0 ? autoComplete : 'off'}
            aria-label={`Digit ${index + 1} of ${length}`}
            className="otp-input-component__cell"
            data-filled={internalValues[index] ? 'true' : 'false'}
          />
        ))}
      </div>
    );
  },
);

OTPInput.displayName = 'OTPInput';
