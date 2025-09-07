// Composition API - Main export for the new sidebar composition system
export { SidebarRoot as Root } from './SidebarRoot';
export { SidebarHeader as Header } from './SidebarHeader';
export { SidebarContent as Content } from './SidebarContent';
export { SidebarFooter as Footer } from './SidebarFooter';
export { SidebarItem as Item } from './SidebarItem';
export { SidebarGroup as Group } from './SidebarGroup';
export { SidebarSection as Section } from './SidebarSection';
export { SidebarSeparator as Separator } from './SidebarSeparator';
export { SidebarToggle as Toggle } from './SidebarToggle';

// Context and utilities
export { useSidebarContext } from './SidebarContext';

// Types
export type { SidebarRootProps } from './SidebarRoot';
export type { SidebarHeaderProps } from './SidebarHeader';
export type { SidebarContentProps } from './SidebarContent';
export type { SidebarFooterProps } from './SidebarFooter';
export type { SidebarItemProps } from './SidebarItem';
export type { SidebarGroupProps } from './SidebarGroup';
export type { SidebarSectionProps } from './SidebarSection';
export type { SidebarSeparatorProps } from './SidebarSeparator';
export type { SidebarToggleProps } from './SidebarToggle';
export type { SidebarContextType } from './SidebarContext';

// Compound component object for dot notation
import { SidebarRoot } from './SidebarRoot';
import { SidebarHeader } from './SidebarHeader';
import { SidebarContent } from './SidebarContent';
import { SidebarFooter } from './SidebarFooter';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { SidebarSection } from './SidebarSection';
import { SidebarSeparator } from './SidebarSeparator';
import { SidebarToggle } from './SidebarToggle';

// Create the compound component with dot notation
const SidebarCompound = Object.assign(SidebarRoot, {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Item: SidebarItem,
  Group: SidebarGroup,
  Section: SidebarSection,
  Separator: SidebarSeparator,
  Toggle: SidebarToggle,
});

export default SidebarCompound;