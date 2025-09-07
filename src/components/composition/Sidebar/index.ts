// Unified Sidebar API (supports both legacy and composition)
export { Sidebar, type SidebarProps, type SidebarItem } from './SidebarUnified';

// Legacy components (still available for direct import if needed)
export { Sidebar as SidebarLegacy, SidebarItemComponent as SidebarItemLegacy } from './Sidebar';
export type { SidebarProps as SidebarLegacyProps, SidebarItemProps } from './Sidebar';

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
