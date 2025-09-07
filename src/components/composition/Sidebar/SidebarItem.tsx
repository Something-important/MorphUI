import React, { forwardRef, useCallback } from 'react';
import { Button } from '../../basic/Button';
import { Badge } from '../../basic/Badge';
import { useSidebarContext } from './SidebarContext';

export interface SidebarItemProps {
  // Content
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger';
  
  // Behavior
  id?: string;
  active?: boolean;
  disabled?: boolean;
  href?: string;
  target?: string;
  onClick?: (event: React.MouseEvent) => void;
  
  // Button styling (inherits from Button component)
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarItem = forwardRef<HTMLDivElement, SidebarItemProps>(({
  children,
  label,
  icon,
  badge,
  badgeVariant = 'primary',
  id,
  active: propActive,
  disabled = false,
  href,
  target,
  onClick,
  variant = 'ghost',
  size: itemSize,
  color,
  gradient,
  textColor,
  hoverEffect = 'none',
  className = '',
  style,
  ...rest
}, ref) => {
  const { activeItem, setActiveItem, collapsed, size: contextSize } = useSidebarContext();

  // Use item size or context size
  const finalSize = itemSize || contextSize;

  // Determine if this item is active
  const isActive = propActive !== undefined ? propActive : (id ? activeItem === id : false);

  // Handle click
  const handleClick = useCallback((event: React.MouseEvent) => {
    if (disabled) return;
    
    // Set as active item if id is provided
    if (id) {
      setActiveItem(id);
    }
    
    // Call custom onClick
    onClick?.(event);
  }, [disabled, id, setActiveItem, onClick]);

  // Generate CSS classes for the container
  const classes = [
    'sidebar-item',
    `sidebar-item--${finalSize}`,
    isActive && 'sidebar-item--active',
    collapsed && 'sidebar-item--collapsed',
    className
  ].filter(Boolean).join(' ');

  // Content JSX
  const content = (
    <>
      {/* Icon */}
      {icon && !collapsed && (
        <span className="sidebar-item__icon">
          {icon}
        </span>
      )}
      
      {/* Icon only when collapsed */}
      {icon && collapsed && icon}
      
      {/* Label */}
      {(label || children) && !collapsed && (
        <span className="sidebar-item__label">
          {label || children}
        </span>
      )}
      
      {/* Badge */}
      {badge && !collapsed && (
        <Badge variant={badgeVariant} size="xs">
          {badge}
        </Badge>
      )}
    </>
  );

  // Render as link if href is provided
  if (href && !disabled) {
    return (
      <div ref={ref} className={classes} style={style} {...rest}>
        <Button
          as="a"
          href={href}
          variant={isActive ? variant : 'ghost'}
          size={finalSize}
          color={color}
          gradient={gradient}
          textColor={textColor}
          hoverEffect={hoverEffect}
          disabled={disabled}
          className="sidebar-item__button"
          onClick={handleClick}
          style={{ 
            width: '100%', 
            justifyContent: collapsed ? 'center' : 'flex-start',
            minHeight: collapsed ? '44px' : undefined,
            ...(target && { target })
          }}
        >
          {content}
        </Button>
      </div>
    );
  }

  // Render as button
  return (
    <div ref={ref} className={classes} style={style} {...rest}>
      <Button
        variant={isActive ? variant : 'ghost'}
        size={finalSize}
        color={color}
        gradient={gradient}
        textColor={textColor}
        hoverEffect={hoverEffect}
        disabled={disabled}
        className="sidebar-item__button"
        onClick={handleClick}
        aria-pressed={isActive}
        style={{ 
          width: '100%', 
          justifyContent: collapsed ? 'center' : 'flex-start',
          minHeight: collapsed ? '44px' : undefined
        }}
      >
        {content}
      </Button>
    </div>
  );
});

SidebarItem.displayName = 'SidebarItem';