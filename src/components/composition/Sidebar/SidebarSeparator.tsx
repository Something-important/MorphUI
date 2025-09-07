import React, { forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import { useSidebarContext } from './SidebarContext';

export interface SidebarSeparatorProps {
  // Styling
  color?: string;
  gradient?: string;
  thickness?: string | number;
  spacing?: string;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarSeparator = forwardRef<HTMLDivElement, SidebarSeparatorProps>(({
  color,
  gradient,
  thickness,
  spacing,
  className = '',
  style,
  ...rest
}, ref) => {
  const { size } = useSidebarContext();

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);

  // Precedence: gradient > color > default
  const finalColor = resolvedGradient || resolvedColor;

  // Gradient detection
  const isGradient = finalColor && (
    finalColor.includes('linear-gradient') || 
    finalColor.includes('radial-gradient') || 
    finalColor.includes('conic-gradient')
  );

  // Generate CSS classes
  const classes = [
    'sidebar-separator',
    `sidebar-separator--${size}`,
    isGradient && 'sidebar-separator--gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object
  const componentStyle: React.CSSProperties = {
    // Custom properties for this separator
    ...(finalColor && { 
      '--sidebar-separator-custom-color': finalColor,
      '--sidebar-separator-color': finalColor 
    }),
    ...(thickness && { 
      '--sidebar-separator-custom-thickness': typeof thickness === 'number' ? `${thickness}px` : thickness 
    }),
    ...(spacing && { 
      '--sidebar-separator-custom-spacing': spacing 
    }),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={componentStyle}
      role="separator"
      {...rest}
    />
  );
});

SidebarSeparator.displayName = 'SidebarSeparator';