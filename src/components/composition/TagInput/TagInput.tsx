// TagInput.tsx
import React, { forwardRef, useState, useCallback, useRef, useId, type KeyboardEvent } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './TagInput.css';

export type TagInputVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
export type TagInputSize = 'sm' | 'md' | 'lg';

export interface TagInputProps {
  /** Controlled tag list. */
  tags?: string[];
  /** Uncontrolled initial tags. */
  defaultTags?: string[];
  onTagsChange?: (tags: string[]) => void;
  /** Placeholder for the input. */
  placeholder?: string;
  /** Maximum number of tags. */
  maxTags?: number;
  /** Allow duplicate tags. Default: false. */
  allowDuplicates?: boolean;
  /** Delimiters that add a tag (key codes). Default: Enter, Comma. */
  delimiters?: string[];
  /** Disabled state. */
  disabled?: boolean;
  /** Variant. */
  variant?: TagInputVariant;
  /** Size. */
  size?: TagInputSize;
  /** Theme override for tag background accent. */
  color?: string;
  /** Text color override. */
  textColor?: string;
  /** Border color override. */
  borderColor?: string;
  /** Border radius override. */
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      tags: controlledTags,
      defaultTags = [],
      onTagsChange,
      placeholder = 'Add tag…',
      maxTags,
      allowDuplicates = false,
      delimiters = ['Enter', ','],
      disabled = false,
      variant = 'primary',
      size = 'md',
      color,
      textColor,
      borderColor,
      borderRadius,
      className = '',
      style,
      ariaLabel = 'Tag input',
      id,
      ...rest
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = `${generatedId}-input`;
    const isControlled = controlledTags !== undefined;
    const [internalTags, setInternalTags] = useState<string[]>(defaultTags);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const tags = isControlled ? controlledTags : internalTags;

    const updateTags = useCallback(
      (newTags: string[]) => {
        if (!isControlled) setInternalTags(newTags);
        onTagsChange?.(newTags);
      },
      [isControlled, onTagsChange],
    );

    const addTag = useCallback(
      (rawValue: string) => {
        const value = rawValue.trim();
        if (!value || disabled) return;
        if (maxTags && tags.length >= maxTags) return;
        if (!allowDuplicates && tags.includes(value)) return;
        updateTags([...tags, value]);
        setInputValue('');
      },
      [tags, disabled, maxTags, allowDuplicates, updateTags],
    );

    const removeTag = useCallback(
      (index: number) => {
        if (disabled) return;
        updateTags(tags.filter((_, i) => i !== index));
      },
      [tags, disabled, updateTags],
    );

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;
        // Backspace on empty input removes the last tag
        if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
          e.preventDefault();
          removeTag(tags.length - 1);
          return;
        }
        // Check delimiters
        if (delimiters.includes(e.key)) {
          e.preventDefault();
          addTag(inputValue);
        }
      },
      [disabled, inputValue, tags, delimiters, addTag, removeTag],
    );

    const handleBlur = useCallback(() => {
      if (inputValue.trim()) addTag(inputValue);
    }, [inputValue, addTag]);

    // Theme
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedBorderRadius =
      borderRadius !== undefined
        ? typeof borderRadius === 'number'
          ? `${borderRadius}px`
          : borderRadius
        : undefined;

    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && { '--taginput-custom-accent': resolvedColor }),
      ...(resolvedTextColor && { '--taginput-custom-text-color': resolvedTextColor }),
      ...(resolvedBorderColor && { '--taginput-custom-border': resolvedBorderColor }),
      ...(resolvedBorderRadius && { '--taginput-custom-border-radius': resolvedBorderRadius }),
    };

    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;
    const ariaProps = getAriaProps({ label: ariaLabel });

    const classes = [
      'taginput-component',
      `taginput-component--${variant}`,
      `taginput-component--${size}`,
      disabled && 'taginput-component--disabled',
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
        onClick={() => !disabled && inputRef.current?.focus()}
        {...ariaProps}
        {...rest}
      >
        {tags.map((tag, index) => (
          <span key={`${tag}-${index}`} className="taginput-component__tag">
            <span className="taginput-component__tag-label">{tag}</span>
            {!disabled && (
              <button
                type="button"
                className="taginput-component__tag-remove"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
                aria-label={`Remove ${tag}`}
                tabIndex={-1}
              >
                ×
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          className="taginput-component__input"
          placeholder={tags.length === 0 ? placeholder : ''}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          disabled={disabled}
          aria-label={ariaLabel}
          autoComplete="off"
        />
      </div>
    );
  },
);

TagInput.displayName = 'TagInput';
