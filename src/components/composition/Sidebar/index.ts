// Unified Sidebar API (supports both legacy and composition)

export { Sidebar, type SidebarProps, type SidebarItem } from './SidebarUnified';

// Individual composition components (for advanced use cases)
export {
  SidebarRoot,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarItem as SidebarItemComponent,
  SidebarGroup,
  SidebarSection,
  SidebarSeparator,
  SidebarToggle,
} from './SidebarUnified';

// Props types for the composition sub-components (for wrapper typing)
export type { SidebarRootProps } from './SidebarRoot';
export type { SidebarHeaderProps } from './SidebarHeader';
export type { SidebarContentProps } from './SidebarContent';
export type { SidebarFooterProps } from './SidebarFooter';
export type { SidebarGroupProps } from './SidebarGroup';
export type { SidebarSectionProps } from './SidebarSection';
export type { SidebarSeparatorProps } from './SidebarSeparator';
export type { SidebarToggleProps } from './SidebarToggle';
export type { SidebarProviderProps } from './SidebarContext';
