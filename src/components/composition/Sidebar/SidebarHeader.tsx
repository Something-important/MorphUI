import React, { forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import { useSidebarContext } from './SidebarContext';

export interface SidebarHeaderProps {
  children?: React.ReactNode;
  
  // Styling
  color?: string;
  gradient?: string;
  textColor?: string;
  backgroundColor?: string;
  borderColor?: string;
  
  // Layout
  padding?: string;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(({
  children,
  color,
  gradient,
  textColor,
  backgroundColor,
  borderColor,
  padding,
  className = '',
  style,
  ...rest
}, ref) => {
  const { size } = useSidebarContext();

  // Resolve theme values
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);

  // Precedence: gradient > color > inherited
  const finalBackgroundColor = resolvedGradient || resolvedColor || resolvedBackgroundColor;
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

  // Generate CSS classes
  const classes = [
    'sidebar-header',
    `sidebar-header--${size}`,
    isBackgroundGradient && 'sidebar-header--background-gradient',
    isTextGradient && 'sidebar-header--text-gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object
  const componentStyle: React.CSSProperties = {
    // Custom properties for this header
    ...(finalBackgroundColor && { 
      '--sidebar-header-custom-bg': finalBackgroundColor,
      '--sidebar-header-bg': finalBackgroundColor 
    }),
    ...(finalTextColor && { 
      '--sidebar-header-custom-text': finalTextColor,
      '--sidebar-header-text': finalTextColor 
    }),
    ...(finalBorderColor && { 
      '--sidebar-header-custom-border': finalBorderColor,
      '--sidebar-header-border': finalBorderColor 
    }),
    ...(padding && { 
      '--sidebar-header-custom-padding': padding 
    }),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={componentStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

SidebarHeader.displayName = 'SidebarHeader';