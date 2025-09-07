import React, { forwardRef } from 'react';
import { resolveThemeValue } from '../../../utils';
import { useSidebarContext } from './SidebarContext';

export interface SidebarSectionProps {
  children?: React.ReactNode;
  
  // Section styling
  title?: string;
  color?: string;
  gradient?: string;
  textColor?: string;
  backgroundColor?: string;
  
  // Layout
  padding?: string;
  gap?: string;
  
  // Standard props
  className?: string;
  style?: React.CSSProperties;
}

export const SidebarSection = forwardRef<HTMLDivElement, SidebarSectionProps>(({
  children,
  title,
  color,
  gradient,
  textColor,
  backgroundColor,
  padding,
  gap,
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
    'sidebar-section',
    `sidebar-section--${size}`,
    isBackgroundGradient && 'sidebar-section--background-gradient',
    isTextGradient && 'sidebar-section--text-gradient',
    className
  ].filter(Boolean).join(' ');

  // Component style object
  const componentStyle: React.CSSProperties = {
    // Custom properties for this section
    ...(finalBackgroundColor && { 
      '--sidebar-section-custom-bg': finalBackgroundColor,
      '--sidebar-section-bg': finalBackgroundColor 
    }),
    ...(finalTextColor && { 
      '--sidebar-section-custom-text': finalTextColor,
      '--sidebar-section-text': finalTextColor 
    }),
    ...(padding && { 
      '--sidebar-section-custom-padding': padding 
    }),
    ...(gap && { 
      '--sidebar-section-custom-gap': gap 
    }),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={classes}
      style={componentStyle}
      role="region"
      aria-label={title}
      {...rest}
    >
      {/* Section Title */}
      {title && (
        <div className="sidebar-section__title">
          {title}
        </div>
      )}
      
      {/* Section Content */}
      <div className="sidebar-section__content">
        {children}
      </div>
    </div>
  );
});

SidebarSection.displayName = 'SidebarSection';