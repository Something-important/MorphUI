import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../basic/Button';
import { useSidebarContext } from './SidebarContext';

export interface SidebarToggleProps {
  children?: React.ReactNode;
  
  // Icons
  collapseIcon?: React.ReactNode;
  expandIcon?: React.ReactNode;
  
  // Button styling (inherits from Button component)
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  hoverEffect?: 'none' | 'lift' | 'glow' | 'scale';
  
  // Enhanced behavior
  onClick?: (collapsed: boolean, event: React.MouseEvent) => void;
  persistent?: boolean; // Always visible, even when sidebar is collapsed
  floating?: boolean; // Renders as floating toggle when collapsed in overlay mode
  position?: 'left' | 'right'; // Position of floating toggle
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(({
  children,
  collapseIcon = '←',
  expandIcon = '→',
  variant = 'ghost',
  size = 'sm',
  color,
  gradient,
  textColor,
  hoverEffect = 'lift',
  onClick,
  persistent = false,
  floating = false,
  position = 'left',
  className = '',
  style,
  ...rest
}, ref) => {
  const { collapsed, setCollapsed, collapsible } = useSidebarContext();
  const [isMounted, setIsMounted] = useState(false);

  // Ensure component is mounted before using portal
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle toggle
  const handleToggle = useCallback((event: React.MouseEvent) => {
    if (!collapsible) return;
    
    const newCollapsed = !collapsed;
    setCollapsed(newCollapsed);
    onClick?.(newCollapsed, event);
  }, [collapsed, setCollapsed, collapsible, onClick]);

  // If not collapsible, don't render
  if (!collapsible) {
    return null;
  }

  // Determine if this should render as floating portal
  const shouldFloat = floating && collapsed;
  
  // Build classes - include context-aware classes
  const toggleClasses = [
    'sidebar-toggle',
    collapsed && 'sidebar-toggle--collapsed',
    persistent && 'sidebar-toggle--persistent',
    shouldFloat && 'sidebar-toggle--floating',
    shouldFloat && `sidebar-toggle--floating-${position}`,
    className
  ].filter(Boolean).join(' ');

  // Floating toggle styles
  const floatingStyle: React.CSSProperties = shouldFloat ? {
    position: 'fixed',
    top: '1rem',
    [position]: '1rem',
    zIndex: 1001, // Above backdrop
    borderRadius: '50%',
    width: '2.5rem',
    height: '2.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    ...(style || {})
  } : (style || {});

  const toggleButton = (
    <Button
      ref={shouldFloat ? undefined : ref} // Don't pass ref to portal button
      variant={variant}
      size={shouldFloat ? 'sm' : size}
      color={color}
      gradient={gradient}
      textColor={textColor}
      hoverEffect={hoverEffect}
      className={toggleClasses}
      style={floatingStyle}
      onClick={handleToggle}
      aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!collapsed}
      {...rest}
    >
      {children || (collapsed ? expandIcon : collapseIcon)}
    </Button>
  );

  // Debug log for floating toggle
  if (process.env.NODE_ENV === 'development' && shouldFloat) {
    console.log('SidebarToggle: Rendering floating toggle', {
      collapsed,
      floating,
      shouldFloat,
      isMounted,
      hasDocument: typeof document !== 'undefined'
    });
  }

  // If should float, we're mounted, and we're in a browser environment, render as portal
  if (shouldFloat && isMounted && typeof document !== 'undefined') {
    return createPortal(toggleButton, document.body);
  }

  return toggleButton;
});

SidebarToggle.displayName = 'SidebarToggle';