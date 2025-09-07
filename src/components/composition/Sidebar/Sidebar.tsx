import React, { forwardRef, useState, useEffect, useRef, createContext, useContext } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Sidebar.css';

// Context for sidebar state management
interface SidebarContextType {
  activeItem: string;
  setActiveItem: (id: string) => void;
  expandedItems: Set<string>;
  toggleExpanded: (id: string) => void;
}

const SidebarContext = createContext<SidebarContextType | null>(null);

const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar container');
  }
  return context;
};

// Sidebar Item Interface
export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
  children?: SidebarItem[];
  onClick?: (id: string) => void;
  href?: string;
  target?: string;
}

// Main Sidebar Props
export interface SidebarProps {
  // Core props
  items: SidebarItem[];
  defaultActiveItem?: string;
  activeItem?: string;
  onChange?: (activeItem: string) => void;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Comprehensive color customization
  itemColor?: string;
  itemGradient?: string;
  activeItemColor?: string;
  activeItemGradient?: string;
  hoverItemColor?: string;
  hoverItemGradient?: string;
  backgroundColor?: string;
  backgroundGradient?: string;
  indicatorColor?: string;
  indicatorGradient?: string;
  badgeColor?: string;
  badgeGradient?: string;
  iconColor?: string;
  iconGradient?: string;
  textGradient?: string;
  borderGradient?: string;
  
  // Features
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  animated?: boolean;
  showIcons?: boolean;
  showBadges?: boolean;
  expandable?: boolean;
  defaultExpandedItems?: string[];
  
  // Advanced styling
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: string;
  
  // Layout
  width?: string | number;
  minWidth?: string | number;
  maxWidth?: string | number;
  position?: 'left' | 'right';
  overlay?: boolean;
  backdrop?: boolean;
  
  // Accessibility
  ariaLabel?: string;
  id?: string;
  
  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

// Sidebar Item Props
export interface SidebarItemProps {
  item: SidebarItem;
  level?: number;
  isActive?: boolean;
  isExpanded?: boolean;
  hasChildren?: boolean;
  onClick?: (id: string) => void;
  onToggle?: (id: string) => void;
}

// Main Sidebar Component
export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(({
  // Core props
  items,
  defaultActiveItem,
  activeItem: controlledActiveItem,
  onChange,
  
  // Styling
  variant = 'primary',
  size = 'md',
  color,
  gradient,
  textColor,
  borderColor,
  borderRadius,
  shadow = 'md',
  
  // Comprehensive color customization
  itemColor,
  itemGradient,
  activeItemColor,
  activeItemGradient,
  hoverItemColor,
  hoverItemGradient,
  backgroundColor,
  backgroundGradient,
  indicatorColor,
  indicatorGradient,
  badgeColor,
  badgeGradient,
  iconColor,
  iconGradient,
  textGradient,
  borderGradient,
  
  // Features
  collapsible = false,
  defaultCollapsed = false,
  animated = true,
  showIcons = true,
  showBadges = true,
  expandable = true,
  defaultExpandedItems = [],
  
  // Advanced styling
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend,
  
  // Layout
  width = 'sidebar-width-lg',
  minWidth = 'sidebar-width-sm',
  maxWidth = 'sidebar-width-lg',
  position = 'left',
  overlay = false,
  backdrop = true,
  
  // Accessibility
  ariaLabel,
  id,
  
  // Styling overrides
  className = '',
  style,
  ...rest
}, ref) => {
  // Internal state
  const [internalActiveItem, setInternalActiveItem] = useState(defaultActiveItem || items[0]?.id || '');
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(defaultExpandedItems));
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = controlledActiveItem !== undefined;
  const currentActiveItem = isControlled ? controlledActiveItem : internalActiveItem;
  
  // Refs
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Resolve theme values for all color props
  const resolvedColor = resolveThemeValue(color);
  const resolvedGradient = resolveThemeValue(gradient);
  const resolvedTextColor = resolveThemeValue(textColor);
  const resolvedBorderColor = resolveThemeValue(borderColor);
  const resolvedItemColor = resolveThemeValue(itemColor);
  const resolvedItemGradient = resolveThemeValue(itemGradient);
  const resolvedActiveItemColor = resolveThemeValue(activeItemColor);
  const resolvedActiveItemGradient = resolveThemeValue(activeItemGradient);
  const resolvedHoverItemColor = resolveThemeValue(hoverItemColor);
  const resolvedHoverItemGradient = resolveThemeValue(hoverItemGradient);
  const resolvedBackgroundColor = resolveThemeValue(backgroundColor);
  const resolvedBackgroundGradient = resolveThemeValue(backgroundGradient);
  const resolvedIndicatorColor = resolveThemeValue(indicatorColor);
  const resolvedIndicatorGradient = resolveThemeValue(indicatorGradient);
  const resolvedBadgeColor = resolveThemeValue(badgeColor);
  const resolvedBadgeGradient = resolveThemeValue(badgeGradient);
  const resolvedIconColor = resolveThemeValue(iconColor);
  const resolvedIconGradient = resolveThemeValue(iconGradient);
  const resolvedTextGradient = resolveThemeValue(textGradient);
  const resolvedBorderGradient = resolveThemeValue(borderGradient);

  // Determine final values with proper precedence (gradients override colors)
  const finalItemColor = resolvedItemGradient || resolvedItemColor;
  const finalActiveItemColor = resolvedActiveItemGradient || resolvedActiveItemColor;
  const finalHoverItemColor = resolvedHoverItemGradient || resolvedHoverItemColor;
  const finalBackgroundColor = resolvedBackgroundGradient || resolvedBackgroundColor;
  const finalIndicatorColor = resolvedIndicatorGradient || resolvedIndicatorColor;
  const finalBadgeColor = resolvedBadgeGradient || resolvedBadgeColor;
  const finalIconColor = resolvedIconGradient || resolvedIconColor;
  const finalTextColor = resolvedTextGradient || resolvedTextColor;
  const finalBorderColor = resolvedBorderGradient || resolvedBorderColor;
  
  // Gradient detection for CSS class application
  const isItemGradient = finalItemColor && (
    finalItemColor.includes('linear-gradient') || 
    finalItemColor.includes('radial-gradient') || 
    finalItemColor.includes('conic-gradient')
  );
  const isActiveItemGradient = finalActiveItemColor && (
    finalActiveItemColor.includes('linear-gradient') || 
    finalActiveItemColor.includes('radial-gradient') || 
    finalActiveItemColor.includes('conic-gradient')
  );
  const isHoverItemGradient = finalHoverItemColor && (
    finalHoverItemColor.includes('linear-gradient') || 
    finalHoverItemColor.includes('radial-gradient') || 
    finalHoverItemColor.includes('conic-gradient')
  );
  const isBackgroundGradient = finalBackgroundColor && (
    finalBackgroundColor.includes('linear-gradient') || 
    finalBackgroundColor.includes('radial-gradient') || 
    finalBackgroundColor.includes('conic-gradient')
  );
  const isIndicatorGradient = finalIndicatorColor && (
    finalIndicatorColor.includes('linear-gradient') || 
    finalIndicatorColor.includes('radial-gradient') || 
    finalIndicatorColor.includes('conic-gradient')
  );
  const isBadgeGradient = finalBadgeColor && (
    finalBadgeColor.includes('linear-gradient') || 
    finalBadgeColor.includes('radial-gradient') || 
    finalBadgeColor.includes('conic-gradient')
  );
  const isIconGradient = finalIconColor && (
    finalIconColor.includes('linear-gradient') || 
    finalIconColor.includes('radial-gradient') || 
    finalIconColor.includes('conic-gradient')
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
    'sidebar-component',
    `sidebar-component--${variant}`,
    `sidebar-component--${size}`,
    `sidebar-component--${position}`,
    collapsed && 'sidebar-component--collapsed',
    animated && 'sidebar-component--animated',
    collapsible && 'sidebar-component--collapsible',
    expandable && 'sidebar-component--expandable',
    glassmorphism && 'sidebar-component--glassmorphism',
    overlay && 'sidebar-component--overlay',
    // Gradient detection classes
    isItemGradient && 'sidebar-component--item-gradient',
    isActiveItemGradient && 'sidebar-component--active-item-gradient',
    isHoverItemGradient && 'sidebar-component--hover-item-gradient',
    isBackgroundGradient && 'sidebar-component--background-gradient',
    isIndicatorGradient && 'sidebar-component--indicator-gradient',
    isBadgeGradient && 'sidebar-component--badge-gradient',
    isIconGradient && 'sidebar-component--icon-gradient',
    isTextGradient && 'sidebar-component--text-gradient',
    isBorderGradient && 'sidebar-component--border-gradient',
    className
  ].filter(Boolean).join(' ');
  
  // Component style object
  const componentStyle: React.CSSProperties = {
    // Layout - use theme tokens or fallback to pixel values
    width: collapsed ? '60px' : (typeof width === 'number' ? `${width}px` : resolveThemeValue(width) || width),
    minWidth: collapsed ? '60px' : (typeof minWidth === 'number' ? `${minWidth}px` : resolveThemeValue(minWidth) || minWidth),
    maxWidth: collapsed ? '60px' : (typeof maxWidth === 'number' ? `${maxWidth}px` : resolveThemeValue(maxWidth) || maxWidth),
    
    // Legacy support
    ...(resolvedColor && { '--sidebar-custom-color': resolvedColor }),
    ...(resolvedGradient && { '--sidebar-custom-gradient': resolvedGradient }),
    
    // Comprehensive color customization using unified variables
    ...(finalItemColor && { '--sidebar-custom-item-color': finalItemColor }),
    ...(finalActiveItemColor && { '--sidebar-custom-active-item-color': finalActiveItemColor }),
    ...(finalHoverItemColor && { '--sidebar-custom-hover-item-color': finalHoverItemColor }),
    ...(finalBackgroundColor && { '--sidebar-custom-background-color': finalBackgroundColor }),
    ...(finalIndicatorColor && { '--sidebar-custom-indicator-color': finalIndicatorColor }),
    ...(finalBadgeColor && { '--sidebar-custom-badge-color': finalBadgeColor }),
    ...(finalIconColor && { '--sidebar-custom-icon-color': finalIconColor }),
    ...(finalTextColor && { '--sidebar-custom-text-color': finalTextColor }),
    ...(finalBorderColor && { '--sidebar-custom-border-color': finalBorderColor }),
    
    // Other styling
    ...(borderRadius && { '--sidebar-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--sidebar-custom-shadow': resolveThemeValue(`shadow-${shadow}`) }),
    ...(backgroundPattern && { '--sidebar-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--sidebar-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--sidebar-custom-bg-blend': backgroundBlend }),
    ...style,
  } as React.CSSProperties;
  
  // ARIA attributes
  const ariaProps = getAriaProps({
    label: ariaLabel || 'Sidebar navigation',
  });
  
  // Handle item click
  const handleItemClick = React.useCallback((itemId: string) => {
    if (isControlled) {
      onChange?.(itemId);
    } else {
      setInternalActiveItem(itemId);
      onChange?.(itemId);
    }
  }, [isControlled, onChange]);
  
  // Handle item toggle (for expandable items)
  const handleItemToggle = React.useCallback((itemId: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  }, []);
  
  // Handle sidebar toggle
  const handleSidebarToggle = React.useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);
  
  // Context value
  const contextValue: SidebarContextType = React.useMemo(() => ({
    activeItem: currentActiveItem,
    setActiveItem: handleItemClick,
    expandedItems,
    toggleExpanded: handleItemToggle,
  }), [currentActiveItem, handleItemClick, expandedItems, handleItemToggle]);
  
  // Update active item when items change
  useEffect(() => {
    if (items.length > 0 && !items.find(item => item.id === currentActiveItem)) {
      const newActiveItem = items[0].id;
      if (!isControlled) {
        setInternalActiveItem(newActiveItem);
      }
      // Only call onChange if it's provided and not in the dependency array
      if (onChange) {
        onChange(newActiveItem);
      }
    }
  }, [items, currentActiveItem, isControlled]);
  
  // Render sidebar items recursively
  const renderItems = React.useCallback((items: SidebarItem[], level: number = 0): React.ReactNode => {
    return items.map((item) => {
      const isActive = currentActiveItem === item.id;
      const isExpanded = expandedItems.has(item.id);
      const hasChildren = item.children && item.children.length > 0;
      
      return (
        <SidebarItemComponent
          key={item.id}
          item={item}
          level={level}
          isActive={isActive}
          isExpanded={isExpanded}
          hasChildren={hasChildren}
          onClick={handleItemClick}
          onToggle={handleItemToggle}
        />
      );
    });
  }, [currentActiveItem, expandedItems, handleItemClick, handleItemToggle]);
  
  return (
    <SidebarContext.Provider value={contextValue}>
      {overlay && backdrop && (
        <div 
          className="sidebar-component__backdrop"
          onClick={() => overlay && setCollapsed(true)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
            display: overlay && !collapsed ? 'block' : 'none'
          }}
        />
      )}
      <div 
        ref={ref || sidebarRef}
        className={classes}
        style={componentStyle}
        role="navigation"
        {...ariaProps}
        {...rest}
      >
        {/* Sidebar Header */}
        {collapsible && (
          <div className="sidebar-component__header">
            <button
              className="sidebar-component__toggle"
              onClick={handleSidebarToggle}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? '→' : '←'}
            </button>
          </div>
        )}
        
        {/* Sidebar Content */}
        <div className="sidebar-component__content">
          <nav className="sidebar-component__nav" role="navigation">
            {renderItems(items)}
          </nav>
        </div>
      </div>
    </SidebarContext.Provider>
  );
});

Sidebar.displayName = 'Sidebar';

// Individual Sidebar Item Component
export const SidebarItemComponent = forwardRef<HTMLDivElement, SidebarItemProps>(({
  item,
  level = 0,
  isActive: propIsActive,
  isExpanded: propIsExpanded,
  hasChildren: propHasChildren,
  onClick,
  onToggle,
  ...rest
}, ref) => {
  const { activeItem, expandedItems } = useSidebarContext();
  
  // Get states from context or props
  const isActive = propIsActive !== undefined ? propIsActive : activeItem === item.id;
  const isExpanded = propIsExpanded !== undefined ? propIsExpanded : expandedItems.has(item.id);
  const hasChildren = propHasChildren !== undefined ? propHasChildren : (item.children && item.children.length > 0);
  
  const handleClick = React.useCallback(() => {
    if (item.disabled) return;
    
    if (hasChildren && onToggle) {
      onToggle(item.id);
    } else if (onClick) {
      onClick(item.id);
    }
    
    // Call custom onClick if provided
    item.onClick?.(item.id);
  }, [item.disabled, item.id, item.onClick, hasChildren, onToggle, onClick]);
  
  const handleToggle = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren && onToggle) {
      onToggle(item.id);
    }
  }, [hasChildren, onToggle, item.id]);
  
  const itemClasses = [
    'sidebar-component__item',
    `sidebar-component__item--level-${level}`,
    isActive && 'sidebar-component__item--active',
    isExpanded && 'sidebar-component__item--expanded',
    hasChildren && 'sidebar-component__item--has-children',
    item.disabled && 'sidebar-component__item--disabled',
  ].filter(Boolean).join(' ');
  
  const content = (
    <>
      {/* Item Icon */}
      {item.icon && (
        <span className="sidebar-component__item-icon">
          {item.icon}
        </span>
      )}
      
      {/* Item Label */}
      <span className="sidebar-component__item-label">
        {item.label}
      </span>
      
      {/* Item Badge */}
      {item.badge && (
        <span className="sidebar-component__item-badge">
          {item.badge}
        </span>
      )}
      
      {/* Expand/Collapse Toggle */}
      {hasChildren && (
        <button
          className="sidebar-component__item-toggle"
          onClick={handleToggle}
          aria-label={isExpanded ? 'Collapse' : 'Expand'}
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      )}
    </>
  );
  
  if (item.href) {
    return (
      <div ref={ref} className={itemClasses} {...rest}>
        <a
          href={item.href}
          target={item.target}
          className="sidebar-component__item-link"
          onClick={handleClick}
        >
          {content}
        </a>
        {hasChildren && isExpanded && item.children && (
          <div className="sidebar-component__item-children">
            {item.children.map((child) => (
              <SidebarItemComponent
                key={child.id}
                item={child}
                level={level + 1}
                onClick={onClick}
                onToggle={onToggle}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div ref={ref} className={itemClasses} {...rest}>
      <button
        className="sidebar-component__item-button"
        onClick={handleClick}
        disabled={item.disabled}
      >
        {content}
      </button>
      {hasChildren && isExpanded && item.children && (
        <div className="sidebar-component__item-children">
          {item.children.map((child) => (
            <SidebarItemComponent
              key={child.id}
              item={child}
              level={level + 1}
              onClick={onClick}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
});

SidebarItemComponent.displayName = 'SidebarItemComponent';
