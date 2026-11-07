/**
 * Shared demo kit for MorphUI stories.
 *
 * Replaces the ~2,702 inline `style={{}}` objects and ~757 hand-rolled
 * flex wrapper divs across the story suite (audit finding from
 * 10-COMPONENT-COVERAGE.md). Every story should use these primitives
 * instead of building its own layout.
 *
 * Excluded from the rollup build (tsconfig.build.json ignores src/stories)
 * — nothing here ships to dist.
 *
 * See agent-ctx/11-STORYBOOK-PLAN.md (Part 3) for the design.
 */

export { Demo } from './Demo';
export { Row, Stack, Grid, Center } from './Layout';
export { ThemeGrid } from './ThemeGrid';
export { OnDark, OnLight } from './Contrast';
export {
  buttonVariants,
  buttonSizes,
  inputSizes,
  badgeVariants,
  badgeSizes,
  avatarSizes,
  avatarShapes,
  spinnerSizes,
  progressSizes,
  progressVariants,
  alertVariants,
  toastVariants,
  tooltipPositions,
  tooltipVariants,
  popoverPositions,
  modalSizes,
  modalVariants,
  drawerSides,
  cardVariants,
  cardSizes,
  sidebarPositions,
  sidebarSizes,
  tableVariants,
  tabsVariants,
  themeNames,
} from './tokens';
