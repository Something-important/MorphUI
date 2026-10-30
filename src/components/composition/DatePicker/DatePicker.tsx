// DatePicker.tsx
import React, { forwardRef, useState, useRef, useId, useMemo, useCallback, useEffect } from 'react';
import './DatePicker.css';

export type DatePickerVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type DatePickerSize = 'sm' | 'md' | 'lg';

export interface DatePickerProps {
  /** Controlled value (Date or ISO string YYYY-MM-DD). */
  value?: Date | string | null;
  /** Uncontrolled initial value. */
  defaultValue?: Date | string | null;
  /** Called when the user picks a date (or clears). */
  onChange?: (value: Date | null) => void;
  /** Format the date for the input. Default: YYYY-MM-DD. */
  format?: (date: Date) => string;
  /** Earliest selectable date. */
  min?: Date | string;
  /** Latest selectable date. */
  max?: Date | string;
  /** 0 = Sunday (default), 1 = Monday. */
  weekStartsOn?: 0 | 1;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  ariaLabel?: string;
  variant?: DatePickerVariant;
  size?: DatePickerSize;
  className?: string;
  style?: React.CSSProperties;
}

/* ---------- date helpers (no external deps) ---------- */

const toDate = (input: Date | string | null | undefined): Date | null => {
  if (input == null) return null;
  if (input instanceof Date) return isNaN(input.getTime()) ? null : input;
  const parsed = new Date(input);
  return isNaN(parsed.getTime()) ? null : parsed;
};

const toISODate = (d: Date): string =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const defaultFormat = (d: Date): string => toISODate(d);

const startOfDay = (d: Date): Date => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const isSameDay = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isSameMonth = (a: Date, b: Date): boolean =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const addDays = (d: Date, n: number): Date => {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
};

const addMonths = (d: Date, n: number): Date => {
  const x = new Date(d);
  x.setDate(1); // avoid month-length overflow (e.g. Jan 31 + 1 month)
  x.setMonth(x.getMonth() + n);
  return x;
};

/** Build a 6x7 grid of Dates for the month containing `viewDate`, respecting weekStartsOn. */
const getMonthGrid = (viewDate: Date, weekStartsOn: 0 | 1): Date[][] => {
  const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const offset = (firstOfMonth.getDay() - weekStartsOn + 7) % 7;
  const gridStart = addDays(firstOfMonth, -offset);
  const rows: Date[][] = [];
  let cursor = gridStart;
  for (let r = 0; r < 6; r++) {
    const row: Date[] = [];
    for (let c = 0; c < 7; c++) {
      row.push(cursor);
      cursor = addDays(cursor, 1);
    }
    rows.push(row);
  }
  return rows;
};

const WEEKDAYS_SUN = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const WEEKDAYS_MON = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/* ---------- component ---------- */

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: controlledValue,
      defaultValue = null,
      onChange,
      format = defaultFormat,
      min,
      max,
      weekStartsOn = 0,
      placeholder = 'YYYY-MM-DD',
      disabled = false,
      clearable = false,
      ariaLabel = 'Date picker',
      variant = 'primary',
      size = 'md',
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const dialogId = `${autoId}-dialog`;
    const inputRef = useRef<HTMLInputElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    // When we close the dialog and return focus to the input, the input's onFocus
    // would immediately reopen it. This flag suppresses that one focus event.
    const suppressOpenRef = useRef(false);

    const minDate = useMemo(() => startOfDay(toDate(min) ?? new Date(-8640000000000000)), [min]);
    const maxDate = useMemo(() => startOfDay(toDate(max) ?? new Date(8640000000000000)), [max]);

    const isControlled = controlledValue !== undefined;
    const [internalValue, setInternalValue] = useState<Date | null>(toDate(defaultValue));
    const selectedDate = isControlled ? toDate(controlledValue) : internalValue;

    const today = useMemo(() => startOfDay(new Date()), []);
    const [isOpen, setIsOpen] = useState(false);
    const [viewDate, setViewDate] = useState<Date>(() => selectedDate ?? today);
    const [focusedDate, setFocusedDate] = useState<Date>(() => selectedDate ?? today);

    const grid = useMemo(() => getMonthGrid(viewDate, weekStartsOn), [viewDate, weekStartsOn]);
    const weekdayLabels = weekStartsOn === 1 ? WEEKDAYS_MON : WEEKDAYS_SUN;

    const isDisabled = useCallback(
      (d: Date): boolean => {
        const day = startOfDay(d);
        return day < minDate || day > maxDate;
      },
      [minDate, maxDate],
    );

    // When opening, focus the selected date (or today).
    useEffect(() => {
      if (isOpen) {
        setViewDate(selectedDate ?? today);
        setFocusedDate(selectedDate ?? today);
      }
    }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps -- selectedDate/today are stable enough per open

    const commit = useCallback(
      (date: Date) => {
        if (isDisabled(date)) return;
        if (!isControlled) setInternalValue(date);
        onChange?.(date);
        setIsOpen(false);
        suppressOpenRef.current = true;
        inputRef.current?.focus();
      },
      [isControlled, onChange, isDisabled],
    );

    const clear = useCallback(() => {
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
      inputRef.current?.focus();
    }, [isControlled, onChange]);

    const open = () => {
      if (disabled) return;
      setIsOpen(true);
    };

    const moveFocus = (deltaDays: number) => {
      setFocusedDate((prev) => {
        const next = addDays(prev, deltaDays);
        if (!isSameMonth(next, viewDate))
          setViewDate(new Date(next.getFullYear(), next.getMonth(), 1));
        return next;
      });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          moveFocus(7);
          break;
        case 'ArrowUp':
          e.preventDefault();
          moveFocus(-7);
          break;
        case 'ArrowRight':
          e.preventDefault();
          moveFocus(1);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          moveFocus(-1);
          break;
        case 'Home':
          e.preventDefault();
          setFocusedDate((prev) => {
            const offset = (prev.getDay() - weekStartsOn + 7) % 7;
            return addDays(prev, -offset);
          });
          break;
        case 'End':
          e.preventDefault();
          setFocusedDate((prev) => {
            const offset = (prev.getDay() - weekStartsOn + 7) % 7;
            return addDays(prev, 6 - offset);
          });
          break;
        case 'PageUp':
          e.preventDefault();
          setViewDate((prev) => addMonths(prev, -1));
          setFocusedDate((prev) => addMonths(prev, -1));
          break;
        case 'PageDown':
          e.preventDefault();
          setViewDate((prev) => addMonths(prev, 1));
          setFocusedDate((prev) => addMonths(prev, 1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          commit(focusedDate);
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          suppressOpenRef.current = true;
          inputRef.current?.focus();
          break;
      }
    };

    // Close on outside click.
    useEffect(() => {
      if (!isOpen) return;
      const handlePointerDown = (e: MouseEvent) => {
        const target = e.target as Node;
        if (gridRef.current?.contains(target)) return;
        if (inputRef.current?.contains(target)) return;
        const root = inputRef.current?.closest('.datepicker-component') as Node | null;
        if (root?.contains(target)) return;
        setIsOpen(false);
      };
      document.addEventListener('mousedown', handlePointerDown);
      return () => document.removeEventListener('mousedown', handlePointerDown);
    }, [isOpen]);

    const classes = [
      'datepicker-component',
      `datepicker-component--${variant}`,
      `datepicker-component--${size}`,
      isOpen && 'datepicker-component--open',
      disabled && 'datepicker-component--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const inputDisplay = selectedDate ? format(selectedDate) : '';
    const showClear = clearable && !disabled && selectedDate != null;

    return (
      <div ref={ref} className={classes} style={style} {...rest}>
        <div className="datepicker-component__control">
          <input
            ref={inputRef}
            type="text"
            className="datepicker-component__input"
            placeholder={placeholder}
            value={inputDisplay}
            readOnly
            disabled={disabled}
            role="combobox"
            onFocus={() => {
              if (suppressOpenRef.current) {
                suppressOpenRef.current = false;
                return;
              }
              open();
            }}
            aria-label={ariaLabel}
            aria-haspopup="dialog"
            aria-expanded={isOpen}
            aria-controls={isOpen ? dialogId : undefined}
          />
          {showClear && (
            <button
              type="button"
              className="datepicker-component__clear"
              onClick={clear}
              aria-label="Clear date"
              tabIndex={-1}
            >
              ×
            </button>
          )}
          <button
            type="button"
            className="datepicker-component__toggle"
            onClick={() => (isOpen ? setIsOpen(false) : open())}
            tabIndex={-1}
            aria-hidden="true"
            disabled={disabled}
          >
            📅
          </button>
        </div>

        {isOpen && (
          <div
            ref={gridRef}
            id={dialogId}
            role="dialog"
            aria-label={`${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
            className="datepicker-component__dialog"
          >
            <div className="datepicker-component__header">
              <button
                type="button"
                className="datepicker-component__nav"
                onClick={() => {
                  const prev = addMonths(viewDate, -1);
                  setViewDate(prev);
                  setFocusedDate(prev);
                }}
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className="datepicker-component__title">
                {MONTH_NAMES[viewDate.getMonth()]} {viewDate.getFullYear()}
              </span>
              <button
                type="button"
                className="datepicker-component__nav"
                onClick={() => {
                  const next = addMonths(viewDate, 1);
                  setViewDate(next);
                  setFocusedDate(next);
                }}
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div
              className="datepicker-component__grid"
              role="grid"
              tabIndex={-1}
              aria-label={`${MONTH_NAMES[viewDate.getMonth()]} ${viewDate.getFullYear()}`}
              onKeyDown={handleKeyDown}
            >
              <div role="row" className="datepicker-component__weekdays">
                {weekdayLabels.map((wd) => (
                  <span key={wd} role="columnheader" className="datepicker-component__weekday">
                    {wd}
                  </span>
                ))}
              </div>
              {grid.map((row, rIdx) => (
                <div key={rIdx} role="row" className="datepicker-component__row">
                  {row.map((day) => {
                    const inMonth = isSameMonth(day, viewDate);
                    const isToday = isSameDay(day, today);
                    const isSelected = selectedDate ? isSameDay(day, selectedDate) : false;
                    const isFocused = isSameDay(day, focusedDate);
                    const disabledDay = isDisabled(day);
                    return (
                      <button
                        type="button"
                        key={toISODate(day)}
                        role="gridcell"
                        tabIndex={isFocused ? 0 : -1}
                        aria-selected={isSelected}
                        aria-disabled={disabledDay || undefined}
                        aria-current={isToday ? 'date' : undefined}
                        className={[
                          'datepicker-component__day',
                          !inMonth && 'datepicker-component__day--outside',
                          isSelected && 'datepicker-component__day--selected',
                          isToday && 'datepicker-component__day--today',
                          disabledDay && 'datepicker-component__day--disabled',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        disabled={disabledDay}
                        onClick={() => commit(day)}
                        onMouseEnter={() => setFocusedDate(day)}
                        ref={(el) => {
                          if (isFocused && el) el.focus();
                        }}
                      >
                        {day.getDate()}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
