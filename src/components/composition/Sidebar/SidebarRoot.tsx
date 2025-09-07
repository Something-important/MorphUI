import React, { forwardRef, CSSProperties } from 'react';
import { resolveThemeValue } from '../../../utils';
import { SidebarProvider, SidebarProviderProps, useSidebarContext } from './SidebarContext';
import './SidebarComposition.css';

// Sidebar Root Props (styling and layout)
export interface SidebarRootProps extends Omit<SidebarProviderProps, 'children' | 'overlay'> {
  children: React.ReactNode;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  
  // Visual effects
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: boolean;
  glassmorphism?: boolean;
  
  // Layout
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  position?: 'left' | 'right';
  overlay?: boolean;
  backdrop?: boolean;
  
  // Advanced styling
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: string;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  
  // Accessibility
  ariaLabel?: string;
}

// Internal Sidebar Container (after context is established)
const SidebarContainer = forwardRef<HTMLDivElement, Omit<SidebarRootProps, keyof SidebarProviderProps | 'children'> & { children: React.ReactNode; overlay?: boolean }>(({
  // Styling
  variant = 'primary',
  color,
  gradient,
  textColor,
  borderColor,
  backgroundColor,
  backgroundGradient,
  
  // Visual effects
  shadow = 'md',
  rounded = false,
  glassmorphism = false,
  
  // Layout
  width = 'sidebar-width-md',
  minWidth = 'sidebar-width-sm', 
  maxWidth = 'sidebar-width-lg',
  position = 'left',
  overlay = false,
  backdrop = true,
  
  // Advanced styling
  backgroundPattern,
  backgroundImage,
  backgroundBlend,
  
  // Standard props
  className = '',
  style,
  id,
  ariaLabel,
  children,
  ...rest
}, ref) => {
  const { collapsed, animated, size, setCollapsed } = useSidebarContext();

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
  const resolvedBackgroundGradient = resolveThemeValue(backgroundGradient);

  // Precedence: gradient > color > variant
  const finalBackgroundColor = resolvedBackgroundGradient || resolvedBackgroundColor || resolvedGradient || resolvedColor;
  const finalTextColor = resolvedTextColor;
  const finalBorderColor = resolvedBorderColor;

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
  
  const isBorderGradient = finalBorderColor && (
    finalBorderColor.includes('linear-gradient') || 
    finalBorderColor.includes('radial-gradient') || 
    finalBorderColor.includes('conic-gradient')
  );

  // Generate CSS classes
  const classes = [
    'sidebar-root',
    `sidebar-root--${variant}`,
    `sidebar-root--${size}`,
    `sidebar-root--${position}`,
    collapsed && 'sidebar-root--collapsed',
    animated && 'sidebar-root--animated',
    rounded && 'sidebar-root--rounded',
    glassmorphism && 'sidebar-root--glassmorphism',
    overlay && 'sidebar-root--overlay',
    isBackgroundGradient && 'sidebar-root--background-gradient',
    isTextGradient && 'sidebar-root--text-gradient',
    isBorderGradient && 'sidebar-root--border-gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object with CSS custom properties
  const componentStyle: CSSProperties = {
    // Layout - dynamic width based on collapsed state and theme tokens
    width: collapsed && !overlay ? '60px' : (typeof width === 'number' ? `${width}px` : resolveThemeValue(width) || width),
    minWidth: collapsed && !overlay ? '60px' : (typeof minWidth === 'number' ? `${minWidth}px` : resolveThemeValue(minWidth) || minWidth),
    maxWidth: collapsed && !overlay ? '60px' : (typeof maxWidth === 'number' ? `${maxWidth}px` : resolveThemeValue(maxWidth) || maxWidth),
    
    // Theme variables for child components to inherit
    ...(finalBackgroundColor && { 
      '--sidebar-custom-bg': finalBackgroundColor,
      '--sidebar-bg': finalBackgroundColor 
    }),
    ...(finalTextColor && { 
      '--sidebar-custom-text': finalTextColor,
      '--sidebar-text': finalTextColor 
    }),
    ...(finalBorderColor && { 
      '--sidebar-custom-border': finalBorderColor,
      '--sidebar-border': finalBorderColor 
    }),
    
    // Visual effects
    ...(shadow && shadow !== 'none' && { 
      '--sidebar-custom-shadow': resolveThemeValue(`shadow-${shadow}`) 
    }),
    
    // Advanced styling
    ...(backgroundPattern && { '--sidebar-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--sidebar-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--sidebar-custom-bg-blend': backgroundBlend }),
    
    ...style,
  };

  return (
    <>
      {/* Backdrop for overlay mode */}
      {overlay && backdrop && !collapsed && (
        <div 
          className="sidebar-root__backdrop"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            transition: animated ? 'opacity var(--transition-normal)' : 'none'
          }}
          onClick={() => !collapsed && setCollapsed(true)}
        />
      )}
      
      {/* Main sidebar container */}
      <div
        ref={ref}
        id={id}
        className={classes}
        style={componentStyle}
        role="navigation"
        aria-label={ariaLabel || 'Sidebar navigation'}
        {...rest}
      >
        {children}
      </div>
    </>
  );
});

SidebarContainer.displayName = 'SidebarContainer';

// Main Sidebar Root component that provides context and renders container
export const SidebarRoot = forwardRef<HTMLDivElement, SidebarRootProps>(({
  children,
  // Context props
  defaultCollapsed,
  defaultActiveItem,
  defaultExpandedGroups,
  collapsible,
  animated,
  size,
  onCollapseChange,
  onActiveItemChange,
  keyboardNavigation,
  // Layout props that need to be passed to context
  overlay,
  // Container props
  ...containerProps
}, ref) => {
  return (
    <SidebarProvider
      defaultCollapsed={defaultCollapsed}
      defaultActiveItem={defaultActiveItem}
      defaultExpandedGroups={defaultExpandedGroups}
      collapsible={collapsible}
      animated={animated}
      size={size}
      onCollapseChange={onCollapseChange}
      onActiveItemChange={onActiveItemChange}
      keyboardNavigation={keyboardNavigation}
      overlay={overlay}
    >
      <SidebarContainer ref={ref} overlay={overlay} {...containerProps}>
        {children}
      </SidebarContainer>
    </SidebarProvider>
  );
});

SidebarRoot.displayName = 'SidebarRoot';