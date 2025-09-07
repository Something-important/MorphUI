import React, { forwardRef, useCallback } from 'react';
import { Button } from '../../basic/Button';
import { resolveThemeValue } from '../../../utils';
import { useSidebarContext } from './SidebarContext';

export interface SidebarGroupProps {
  children?: React.ReactNode;
  
  // Group behavior
  id: string;
  title?: string;
  icon?: React.ReactNode;
  defaultExpanded?: boolean;
  collapsible?: boolean;
  
  // Styling
  color?: string;
  gradient?: string;
  textColor?: string;
  backgroundColor?: string;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(({
  children,
  id,
  title,
  icon,
  defaultExpanded = false,
  collapsible = true,
  color,
  gradient,
  textColor,
  backgroundColor,
  className = '',
  style,
  ...rest
}, ref) => {
  const { expandedGroups, toggleGroup, collapsed, animated, size } = useSidebarContext();

  // Determine if this group is expanded
  const isExpanded = expandedGroups.has(id) || defaultExpanded;

  // Handle toggle
  const handleToggle = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    if (collapsible) {
      toggleGroup(id);
    }
  }, [collapsible, id, toggleGroup]);

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);

  // Precedence: gradient > color > inherited
  const finalBackgroundColor = resolvedGradient || resolvedColor || resolvedBackgroundColor;
  const finalTextColor = resolvedTextColor;

  // Gradient detection
  const isBackgroundGradient = finalBackgroundColor && (
    finalBackgroundColor.includes('linear-gradient') || 
    finalBackgroundColor.includes('radial-gradient') || 
    finalBackgroundColor.includes('conic-gradient')
  );
  
  const isTextGradient = finalTextColor && (
    finalTextColor.includes('linear-gradient') || 
    finalTextColor.includes('radial-gradient') || 
    finalTextColor.includes('conic-gradient')
  );

  // Generate CSS classes
  const classes = [
    'sidebar-group',
    `sidebar-group--${size}`,
    isExpanded && 'sidebar-group--expanded',
    collapsed && 'sidebar-group--collapsed',
    collapsible && 'sidebar-group--collapsible',
    animated && 'sidebar-group--animated',
    isBackgroundGradient && 'sidebar-group--background-gradient',
    isTextGradient && 'sidebar-group--text-gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object
  const componentStyle: React.CSSProperties = {
    // Custom properties for this group
    ...(finalBackgroundColor && { 
      '--sidebar-group-custom-bg': finalBackgroundColor,
      '--sidebar-group-bg': finalBackgroundColor 
    }),
    ...(finalTextColor && { 
      '--sidebar-group-custom-text': finalTextColor,
      '--sidebar-group-text': finalTextColor 
    }),
    ...style,
  };

  return (
    <div ref={ref} className={classes} style={componentStyle} {...rest}>
      {/* Group Header */}
      {title && (
        <div className="sidebar-group__header">
          {collapsible ? (
            <button
              className="sidebar-group__toggle"
              onClick={handleToggle}
              aria-expanded={isExpanded}
              aria-controls={`${id}-content`}
            >
              {/* Icon */}
              {icon && (
                <span className="sidebar-group__icon">
                  {icon}
                </span>
              )}
              
              {/* Title */}
              <span className="sidebar-group__title">
                {title}
              </span>
              
              {/* Expand/Collapse Indicator */}
              <span className="sidebar-group__indicator">
                {isExpanded ? '▼' : '▶'}
              </span>
            </button>
          ) : (
            <div className="sidebar-group__header-static">
              {/* Icon */}
              {icon && (
                <span className="sidebar-group__icon">
                  {icon}
                </span>
              )}
              
              {/* Title */}
              <span className="sidebar-group__title">
                {title}
              </span>
            </div>
          )}
        </div>
      )}
      
      {/* Group Content */}
      {isExpanded && (
        <div
          id={`${id}-content`}
          className="sidebar-group__content"
          role="group"
          aria-labelledby={title ? `${id}-header` : undefined}
        >
          {children}
        </div>
      )}
    </div>
  );
});

SidebarGroup.displayName = 'SidebarGroup';