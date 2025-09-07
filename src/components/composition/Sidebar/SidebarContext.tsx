import React, { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';

// Sidebar Context Types
export interface SidebarContextType {
  // Core state
  collapsed: boolean;
  activeItem: string | null;
  expandedGroups: Set<string>;
  
  // Actions
  setCollapsed: (collapsed: boolean) => void;
  setActiveItem: (id: string | null) => void;
  toggleGroup: (id: string) => void;
  
  // Configuration
  collapsible: boolean;
  animated: boolean;
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

// Create Context
const SidebarContext = createContext<SidebarContextType | null>(null);

// Hook to use Sidebar Context
export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('Sidebar components must be used within a Sidebar.Root component');
  }
  return context;
};

// Context Provider Props
export interface SidebarProviderProps {
  children: ReactNode;
  defaultCollapsed?: boolean;
  defaultActiveItem?: string | null;
  defaultExpandedGroups?: string[];
  collapsible?: boolean;
  animated?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  onCollapseChange?: (collapsed: boolean) => void;
  onActiveItemChange?: (itemId: string | null) => void;
  keyboardNavigation?: boolean; // Enable keyboard navigation (ESC to toggle)
  overlay?: boolean; // Needed for keyboard context
}

// Context Provider Component
export const SidebarProvider: React.FC<SidebarProviderProps> = ({
  children,
  defaultCollapsed = false,
  defaultActiveItem = null,
  defaultExpandedGroups = [],
  collapsible = true,
  animated = true,
  size = 'md',
  onCollapseChange,
  onActiveItemChange,
  keyboardNavigation = false,
  overlay = false,
}) => {
  // Internal state
  const [collapsed, setCollapsedInternal] = useState(defaultCollapsed);
  const [activeItem, setActiveItemInternal] = useState<string | null>(defaultActiveItem);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(defaultExpandedGroups)
  );

  // Wrapped setters that call external callbacks
  const setCollapsed = useCallback((newCollapsed: boolean) => {
    setCollapsedInternal(newCollapsed);
    onCollapseChange?.(newCollapsed);
  }, [onCollapseChange]);

  const setActiveItem = useCallback((itemId: string | null) => {
    setActiveItemInternal(itemId);
    onActiveItemChange?.(itemId);
  }, [onActiveItemChange]);

  // Toggle group expansion
  const toggleGroup = useCallback((groupId: string) => {
    setExpandedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  }, []);

  // Keyboard navigation effect
  useEffect(() => {
    if (!keyboardNavigation || !collapsible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // ESC key toggles sidebar when in overlay mode or when collapsed
      if (event.key === 'Escape') {
        if (overlay && !collapsed) {
          // Close overlay when ESC is pressed
          setCollapsed(true);
          event.preventDefault();
        } else if (collapsed) {
          // Open sidebar when collapsed and ESC is pressed
          setCollapsed(false);
          event.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [keyboardNavigation, collapsible, overlay, collapsed, setCollapsed]);

  // Context value
  const contextValue: SidebarContextType = {
    collapsed,
    activeItem,
    expandedGroups,
    setCollapsed,
    setActiveItem,
    toggleGroup,
    collapsible,
    animated,
    size,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
};