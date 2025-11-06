// Breadcrumb.tsx
import React, { ReactNode, forwardRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Breadcrumb.css';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  id?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  textColor?: string;
  activeColor?: string;
  separatorColor?: string;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
  id?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator = '/',
      variant = 'primary',
      size = 'md',
      color,
      textColor,
      activeColor,
      separatorColor,
      className = '',
      style,
      ariaLabel = 'Breadcrumb navigation',
      id,
      ...rest
    },
    ref,
  ) => {
    if (!items || items.length === 0) return null;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedActiveColor = resolveThemeValue(activeColor);
    const resolvedSeparatorColor = resolveThemeValue(separatorColor);

    // Classes
    const classes = [
      'breadcrumb-component',
      `breadcrumb-component--${variant}`,
      `breadcrumb-component--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && {
        '--breadcrumb-custom-color': resolvedColor,
        '--breadcrumb-color': resolvedColor,
      }),
      ...(resolvedTextColor && {
        '--breadcrumb-custom-text-color': resolvedTextColor,
        '--breadcrumb-text-color': resolvedTextColor,
      }),
      ...(resolvedActiveColor && {
        '--breadcrumb-custom-active-color': resolvedActiveColor,
        '--breadcrumb-active-color': resolvedActiveColor,
      }),
      ...(resolvedSeparatorColor && {
        '--breadcrumb-custom-separator-color': resolvedSeparatorColor,
        '--breadcrumb-separator-color': resolvedSeparatorColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel,
    });

    return (
      <nav
        ref={ref as React.Ref<HTMLElement>}
        id={id}
        className={classes}
        style={mergedStyle}
        aria-label={ariaLabel}
        {...ariaProps}
        {...rest}
      >
        <ol className="breadcrumb-component__list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const itemId = item.id || `breadcrumb-item-${index}`;

            return (
              <li key={itemId} className="breadcrumb-component__item">
                {isLast ? (
                  <span
                    className="breadcrumb-component__link breadcrumb-component__link--current"
                    aria-current="page"
                  >
                    {item.icon && <span className="breadcrumb-component__icon">{item.icon}</span>}
                    <span className="breadcrumb-component__label">{item.label}</span>
                  </span>
                ) : (
                  <>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="breadcrumb-component__link"
                        onClick={(e) => {
                          if (item.onClick) {
                            e.preventDefault();
                            item.onClick();
                          }
                        }}
                      >
                        {item.icon && (
                          <span className="breadcrumb-component__icon">{item.icon}</span>
                        )}
                        <span className="breadcrumb-component__label">{item.label}</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="breadcrumb-component__link breadcrumb-component__link--button"
                        onClick={item.onClick}
                      >
                        {item.icon && (
                          <span className="breadcrumb-component__icon">{item.icon}</span>
                        )}
                        <span className="breadcrumb-component__label">{item.label}</span>
                      </button>
                    )}
                  </>
                )}
                {!isLast && (
                  <span className="breadcrumb-component__separator" aria-hidden="true">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
