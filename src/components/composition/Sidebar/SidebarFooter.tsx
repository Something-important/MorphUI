import React, { forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import { useSidebarContext } from './SidebarContext';

export interface SidebarFooterProps {
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

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(({
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
    'sidebar-footer',
    `sidebar-footer--${size}`,
    isBackgroundGradient && 'sidebar-footer--background-gradient',
    isTextGradient && 'sidebar-footer--text-gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object
  const componentStyle: React.CSSProperties = {
    // Custom properties for this footer
    ...(finalBackgroundColor && { 
      '--sidebar-footer-custom-bg': finalBackgroundColor,
      '--sidebar-footer-bg': finalBackgroundColor 
    }),
    ...(finalTextColor && { 
      '--sidebar-footer-custom-text': finalTextColor,
      '--sidebar-footer-text': finalTextColor 
    }),
    ...(finalBorderColor && { 
      '--sidebar-footer-custom-border': finalBorderColor,
      '--sidebar-footer-border': finalBorderColor 
    }),
    ...(padding && { 
      '--sidebar-footer-custom-padding': padding 
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

SidebarFooter.displayName = 'SidebarFooter';