import { useState, useEffect, useCallback } from 'react';

export interface UseTabsOptions {
  /** Tab items — used to validate the active tab still exists. */
  items: Array<{ id: string; disabled?: boolean }>;
  /** Uncontrolled initial active tab id. Defaults to the first item's id. */
  defaultActiveTab?: string;
  /** Controlled active tab id. When provided, the parent owns the state. */
  activeTab?: string;
  /** Called when the active tab changes. */
  onChange?: (activeTab: string) => void;
}

export interface UseTabsResult {
  /** The currently active tab id (controlled value or internal state). */
  activeTab: string;
  /** Whether the component is in controlled mode. */
  isControlled: boolean;
  /** Switch to a different tab (respects disabled items). */
  setActiveTab: (tabId: string) => void;
}

/**
 * Headless tab behavior: active-tab state (controlled/uncontrolled),
 * tab-change callback, and validation that the active tab still exists
 * in the items array (auto-resets to the first item if it disappears).
 *
 * The component handles rendering, styling, keyboard navigation, and
 * ARIA attributes; this hook handles the state management.
 *
 * @example
 * const { activeTab, setActiveTab } = useTabs({
 *   items,
 *   defaultActiveTab: 'overview',
 *   onChange: (id) => console.log('Switched to', id),
 * });
 */
export function useTabs({
  items,
  defaultActiveTab,
  activeTab: controlledActiveTab,
  onChange,
}: UseTabsOptions): UseTabsResult {
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultActiveTab || items[0]?.id || '',
  );

  const isControlled = controlledActiveTab !== undefined;
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  // Update active tab when items change — if the current active tab
  // no longer exists in the items array, reset to the first item.
  useEffect(() => {
    if (items.length > 0 && !items.find((item) => item.id === activeTab)) {
      const newActiveTab = items[0].id;
      if (!isControlled) {
        setInternalActiveTab(newActiveTab);
      }
      onChange?.(newActiveTab);
    }
  }, [items, activeTab, isControlled, onChange]);

  const setActiveTab = useCallback(
    (tabId: string) => {
      // Respect disabled tabs
      const item = items.find((i) => i.id === tabId);
      if (item?.disabled) return;

      if (!isControlled) {
        setInternalActiveTab(tabId);
      }
      onChange?.(tabId);
    },
    [isControlled, onChange, items],
  );

  return {
    activeTab,
    isControlled,
    setActiveTab,
  };
}
