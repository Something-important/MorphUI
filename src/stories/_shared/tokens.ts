/**
 * Shared token lists — single source of truth for variant/size enumerations
 * used across stories. Avoids the "what variants does Button have again?"
 * lookup pattern that resulted in inconsistent story content.
 *
 * These mirror the actual component prop types; if a component's variants
 * change, update the corresponding list here and the per-tier migration
 * stories will pick it up automatically.
 *
 * Source of truth for each component's variants: the component's TSX file
 * (its type definition). These lists are extracted manually; a future
 * improvement would be to auto-generate them from the .d.ts files.
 */

export const buttonVariants = [
  'primary',
  'secondary',
  'outline',
  'ghost',
  'danger',
  'success',
  'warning',
  'info',
] as const;

export const buttonSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const inputSizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export const badgeVariants = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
  'outline',
] as const;

export const badgeSizes = ['sm', 'md', 'lg'] as const;

export const avatarSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const;

export const avatarShapes = ['circle', 'square', 'rounded'] as const;

export const spinnerSizes = ['sm', 'md', 'lg', 'xl'] as const;

export const progressSizes = ['sm', 'md', 'lg'] as const;

export const progressVariants = ['primary', 'success', 'warning', 'danger', 'info'] as const;

export const alertVariants = ['info', 'success', 'warning', 'danger'] as const;

export const toastVariants = ['info', 'success', 'warning', 'danger'] as const;

export const tooltipPositions = ['top', 'right', 'bottom', 'left'] as const;

export const tooltipVariants = [
  'primary',
  'secondary',
  'success',
  'warning',
  'danger',
  'info',
] as const;

export const popoverPositions = ['top', 'right', 'bottom', 'left'] as const;

export const modalSizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', 'full'] as const;

export const modalVariants = ['default', 'gradient', 'glassmorphism'] as const;

export const drawerSides = ['left', 'right', 'top', 'bottom'] as const;

export const cardVariants = [
  'default',
  'outlined',
  'elevated',
  'gradient',
  'glassmorphism',
] as const;

export const cardSizes = ['sm', 'md', 'lg'] as const;

export const sidebarPositions = ['left', 'right'] as const;

export const sidebarSizes = ['sm', 'md', 'lg'] as const;

export const tableVariants = ['default', 'striped', 'bordered'] as const;

export const tabsVariants = ['default', 'pills', 'underline'] as const;

export const themeNames = ['light', 'dark', 'warm', 'cool', 'purple'] as const;
