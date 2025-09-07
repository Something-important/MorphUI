import React, { forwardRef } from 'react';
import { SidebarRoot, type SidebarRootProps } from './SidebarRoot';
import { SidebarHeader } from './SidebarHeader';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { SidebarSection } from './SidebarSection';
import { SidebarSeparator } from './SidebarSeparator';
import { SidebarToggle } from './SidebarToggle';

// Legacy item interface (for backward compatibility)
export interface SidebarItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger';
  disabled?: boolean;
  children?: SidebarItem[];
  onClick?: (id: string) => void;
  href?: string;
  target?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
}

// Unified Sidebar Props - supports both composition and legacy approaches
export interface SidebarProps extends Omit<SidebarRootProps, 'children'> {
  children?: React.ReactNode;
  
  // Legacy API support (items array)
  items?: SidebarItem[];
  defaultActiveItem?: string;
  activeItem?: string;
  onChange?: (activeItem: string | null) => void;
  
  // Header/Footer content for legacy mode
  headerContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  
  // Legacy styling (maps to composition equivalents)
  showToggle?: boolean;
}

// Component that renders legacy items as composition components
const LegacyItemRenderer: React.FC<{
  items: SidebarItem[];
  level?: number;
}> = ({ items, level = 0 }) => {
  return (
    <>
      {items.map((item) => {
        // If item has children, render as a group
        if (item.children && item.children.length > 0) {
          return (
            <SidebarGroup
              key={item.id}
              id={item.id}
              title={item.label}
              icon={item.icon}
            >
              <LegacyItemRenderer items={item.children} level={level + 1} />
            </SidebarGroup>
          );
        }
        
        // Regular item
        return (
          <SidebarItem
            key={item.id}
            id={item.id}
            label={item.label}
            icon={item.icon}
            badge={item.badge}
            badgeVariant={item.badgeVariant}
            disabled={item.disabled}
            href={item.href}
            target={item.target}
            variant={item.variant}
            onClick={item.onClick ? () => item.onClick!(item.id) : undefined}
          />
        );
      })}
    </>
  );
};

// Main unified Sidebar component with attached composition components  
const SidebarComponent = forwardRef<HTMLDivElement, SidebarProps>(({
  children,
  items,
  headerContent,
  footerContent,
  showToggle = true,
  // Legacy props that map to new system
  defaultActiveItem,
  activeItem,
  onChange,
  ...rootProps
}, ref) => {
  // If children are provided, use composition mode
  if (children) {
    return (
      <SidebarRoot 
        ref={ref} 
        defaultActiveItem={defaultActiveItem}
        onActiveItemChange={onChange}
        {...rootProps}
      >
        {children}
      </SidebarRoot>
    );
  }
  
  // Legacy mode: render using items array
  return (
    <SidebarRoot 
      ref={ref}
      defaultActiveItem={defaultActiveItem}
      onActiveItemChange={onChange}
      {...rootProps}
    >
      {/* Header */}
      {(headerContent || showToggle) && (
        <SidebarHeader>
          {headerContent}
          {showToggle && <SidebarToggle />}
        </SidebarHeader>
      )}
      
      {/* Content */}
      <SidebarContent>
        {items && <LegacyItemRenderer items={items} />}
      </SidebarContent>
      
      {/* Footer */}
      {footerContent && (
        <SidebarFooter>
          {footerContent}
        </SidebarFooter>
      )}
    </SidebarRoot>
  );
});

SidebarComponent.displayName = 'Sidebar';

// Create a compound component with attached composition components
const Sidebar = SidebarComponent as typeof SidebarComponent & {
  Root: typeof SidebarRoot;
  Header: typeof SidebarHeader;
  Content: typeof SidebarContent;
  Footer: typeof SidebarFooter;
  Item: typeof SidebarItem;
  Group: typeof SidebarGroup;
  Section: typeof SidebarSection;
  Separator: typeof SidebarSeparator;
  Toggle: typeof SidebarToggle;
};

// Attach composition components as static properties
Sidebar.Root = SidebarRoot;
Sidebar.Header = SidebarHeader;
Sidebar.Content = SidebarContent;
Sidebar.Footer = SidebarFooter;
Sidebar.Item = SidebarItem;
Sidebar.Group = SidebarGroup;
Sidebar.Section = SidebarSection;
Sidebar.Separator = SidebarSeparator;
Sidebar.Toggle = SidebarToggle;

// Export main component
export { Sidebar };

export {
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem,
  SidebarGroup,
  SidebarSection,
  SidebarSeparator,
  SidebarToggle,
};