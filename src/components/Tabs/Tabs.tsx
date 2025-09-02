import React, { forwardRef, useState, useEffect, useRef, createContext, useContext } from 'react';
import { resolveThemeValue, getAriaProps } from '../../utils';
import './Tabs.css';

// Context for tab state management
interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
  registerTab: (id: string, label: string) => void;
  unregisterTab: (id: string) => void;
  tabs: Array<{ id: string; label: string }>;
}

const TabsContext = createContext<TabsContextType | null>(null);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs container');
  }
  return context;
};

// Tab Item Interface
export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
}

// Main Tabs Props
export interface TabsProps {
  // Core props
  items: TabItem[];
  defaultActiveTab?: string;
  activeTab?: string;
  onChange?: (activeTab: string) => void;
  
  // Styling
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: string | number;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  
  // Features
  orientation?: 'horizontal' | 'vertical';
  fullWidth?: boolean;
  centered?: boolean;
  animated?: boolean;
  closable?: boolean;
  onTabClose?: (tabId: string) => void;
  
  // Advanced styling
  glassmorphism?: boolean;
  backgroundPattern?: string;
  backgroundImage?: string;
  backgroundBlend?: string;
  
  // Accessibility
  ariaLabel?: string;
  id?: string;
  
  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

// Tab Props
export interface TabProps {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  badge?: string | number;
  children: React.ReactNode;
}

// Tab Panel Props
export interface TabPanelProps {
  id: string;
  children: React.ReactNode;
}

// Main Tabs Component
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(({
  // Core props
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
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
  
  // Features
  orientation = 'horizontal',
  fullWidth = false,
  centered = false,
  animated = true,
  closable = false,
  onTabClose,
  
  // Advanced styling
  glassmorphism = false,
  backgroundPattern,
  backgroundImage,
  backgroundBlend,
  
  // Accessibility
  ariaLabel,
  id,
  
  // Styling overrides
  className = '',
  style,
  ...rest
}, ref) => {
  // Internal state
  const [internalActiveTab, setInternalActiveTab] = useState(defaultActiveTab || items[0]?.id || '');
  const [tabs, setTabs] = useState<Array<{ id: string; label: string }>>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Determine if this is a controlled or uncontrolled component
  const isControlled = controlledActiveTab !== undefined;
  const currentActiveTab = isControlled ? controlledActiveTab : internalActiveTab;
  
  // Refs
  const tabsRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  
  // Generate CSS classes
  const classes = [
    'tabs-component',
    `tabs-component--${variant}`,
    `tabs-component--${size}`,
    `tabs-component--${orientation}`,
    fullWidth && 'tabs-component--full-width',
    centered && 'tabs-component--centered',
    animated && 'tabs-component--animated',
    closable && 'tabs-component--closable',
    isAnimating && 'tabs-component--animating',
    glassmorphism && 'tabs-component--glassmorphism',
    className
  ].filter(Boolean).join(' ');
  
  // Component style object
  const componentStyle: React.CSSProperties = {
    ...(color && { '--tabs-custom-color': color }),
    ...(gradient && { '--tabs-custom-gradient': gradient }),
    ...(textColor && { '--tabs-custom-text-color': textColor }),
    ...(borderColor && { '--tabs-custom-border-color': borderColor }),
    ...(borderRadius && { '--tabs-custom-border-radius': typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius }),
    ...(shadow && { '--tabs-custom-shadow': resolveThemeValue(`shadow-${shadow}`) }),
    ...(backgroundPattern && { '--tabs-custom-bg-pattern': backgroundPattern }),
    ...(backgroundImage && { '--tabs-custom-bg-image': `url(${backgroundImage})` }),
    ...(backgroundBlend && { '--tabs-custom-bg-blend': backgroundBlend }),
  } as React.CSSProperties;
  
  // Combine component style with user style
  const finalStyle: React.CSSProperties = {
    ...componentStyle,
    ...style,
  };
  
  // ARIA attributes
  const ariaProps = getAriaProps({
    label: ariaLabel || 'Tabs',
  });
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    if (isControlled) {
      onChange?.(tabId);
    } else {
      setInternalActiveTab(tabId);
      onChange?.(tabId);
    }
    
    // Trigger animation
    if (animated) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };
  
  // Handle tab close
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    onTabClose?.(tabId);
  };
  
  // Context value
  const contextValue: TabsContextType = {
    activeTab: currentActiveTab,
    setActiveTab: handleTabChange,
    registerTab: (id: string, label: string) => {
      setTabs(prev => [...prev.filter(tab => tab.id !== id), { id, label }]);
    },
    unregisterTab: (id: string) => {
      setTabs(prev => prev.filter(tab => tab.id !== id));
    },
    tabs,
  };
  
  // Update active tab when items change
  useEffect(() => {
    if (items.length > 0 && !items.find(item => item.id === currentActiveTab)) {
      const newActiveTab = items[0].id;
      if (!isControlled) {
        setInternalActiveTab(newActiveTab);
      }
      onChange?.(newActiveTab);
    }
  }, [items, currentActiveTab, isControlled, onChange]);
  
  return (
    <TabsContext.Provider value={contextValue}>
      <div 
        ref={ref || tabsRef}
        className={classes}
        style={finalStyle}
        role="tablist"
        aria-orientation={orientation}
        {...ariaProps}
        {...rest}
      >
        {/* Tab Navigation */}
        <div className="tabs-component__navigation">
          {items.map((item) => (
            <button
              key={item.id}
              className={`tabs-component__tab ${
                currentActiveTab === item.id ? 'tabs-component__tab--active' : ''
              } ${item.disabled ? 'tabs-component__tab--disabled' : ''}`}
              onClick={() => !item.disabled && handleTabChange(item.id)}
              disabled={item.disabled}
              role="tab"
              aria-selected={currentActiveTab === item.id}
              aria-controls={`panel-${item.id}`}
              id={`tab-${item.id}`}
            >
              {/* Tab Icon */}
              {item.icon && (
                <span className="tabs-component__tab-icon">
                  {item.icon}
                </span>
              )}
              
              {/* Tab Label */}
              <span className="tabs-component__tab-label">
                {item.label}
              </span>
              
              {/* Tab Badge */}
              {item.badge && (
                <span className="tabs-component__tab-badge">
                  {item.badge}
                </span>
              )}
              
              {/* Close Button */}
              {closable && (
                <button
                  className="tabs-component__tab-close"
                  onClick={(e) => handleTabClose(e, item.id)}
                  aria-label={`Close ${item.label} tab`}
                >
                  ×
                </button>
              )}
            </button>
          ))}
        </div>
        
        {/* Tab Panels */}
        <div 
          ref={panelsRef}
          className="tabs-component__panels"
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={`tabs-component__panel ${
                currentActiveTab === item.id ? 'tabs-component__panel--active' : ''
              }`}
              role="tabpanel"
              aria-labelledby={`tab-${item.id}`}
              id={`panel-${item.id}`}
              hidden={currentActiveTab !== item.id}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </TabsContext.Provider>
  );
});

Tabs.displayName = 'Tabs';

// Individual Tab Component (for more complex usage)
export const Tab = forwardRef<HTMLDivElement, TabProps>(({
  id,
  label,
  disabled = false,
  icon,
  badge,
  children,
  ...rest
}, ref) => {
  const { registerTab, unregisterTab } = useTabsContext();
  
  useEffect(() => {
    registerTab(id, label);
    return () => unregisterTab(id);
  }, [id, label, registerTab, unregisterTab]);
  
  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
});

Tab.displayName = 'Tab';

// Tab Panel Component (for more complex usage)
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(({
  id,
  children,
  ...rest
}, ref) => {
  const { activeTab } = useTabsContext();
  
  return (
    <div
      ref={ref}
      className={`tabs-component__panel ${
        activeTab === id ? 'tabs-component__panel--active' : ''
      }`}
      role="tabpanel"
      aria-labelledby={`tab-${id}`}
      id={`panel-${id}`}
      hidden={activeTab !== id}
      {...rest}
    >
      {children}
    </div>
  );
});

TabPanel.displayName = 'TabPanel';
