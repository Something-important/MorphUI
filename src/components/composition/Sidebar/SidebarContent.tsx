import React, { forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import { useSidebarContext } from './SidebarContext';

export interface SidebarContentProps {
  children?: React.ReactNode;
  
  // Styling
  color?: string;
  gradient?: string;
  textColor?: string;
  backgroundColor?: string;
  
  // Layout
  padding?: string;
  gap?: string;
  scrollable?: boolean;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(({
  children,
  color,
  gradient,
  textColor,
  backgroundColor,
  padding,
  gap,
  scrollable = true,
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
    'sidebar-content',
    `sidebar-content--${size}`,
    scrollable && 'sidebar-content--scrollable',
    isBackgroundGradient && 'sidebar-content--background-gradient',
    isTextGradient && 'sidebar-content--text-gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object
  const componentStyle: React.CSSProperties = {
    // Custom properties for this content area
    ...(finalBackgroundColor && { 
      '--sidebar-content-custom-bg': finalBackgroundColor,
      '--sidebar-content-bg': finalBackgroundColor 
    }),
    ...(finalTextColor && { 
      '--sidebar-content-custom-text': finalTextColor,
      '--sidebar-content-text': finalTextColor 
    }),
    ...(padding && { 
      '--sidebar-content-custom-padding': padding 
    }),
    ...(gap && { 
      '--sidebar-content-custom-gap': gap 
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

SidebarContent.displayName = 'SidebarContent';