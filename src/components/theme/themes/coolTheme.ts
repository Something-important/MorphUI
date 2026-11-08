import { lightTheme } from './lightTheme';
import type { Theme } from '.';

export const coolTheme: Theme = {
  ...lightTheme,

  // Only the tokens that differ from lightTheme are listed below.
  // Everything else is inherited from the base via the spread above.

  // Base colors
  'color-primary': '#06b6d4',
  'color-primary-hover': '#0891b2',
  'color-primary-active': '#0e7490',
  'color-secondary': '#3b82f6',
  'color-secondary-hover': '#2563eb',
  'color-secondary-active': '#1d4ed8',
  'color-danger': '#ec4899',
  'color-danger-hover': '#db2777',
  'color-danger-active': '#be185d',
  'color-success': '#059669',
  'color-success-hover': '#047857',
  'color-success-active': '#065f46',
  'color-warning': '#d97706',
  'color-warning-hover': '#b45309',
  'color-warning-active': '#92400e',
  'color-info': '#06b6d4',
  'color-info-hover': '#0891b2',
  'color-info-active': '#0e7490',
  // Light color variants (for backgrounds, highlights)
  'color-primary-light': 'rgba(59, 130, 246, 0.1)',
  'color-warning-light': 'rgba(217, 119, 6, 0.1)',
  // Neutral colors
  'color-gray-50': '#dbeafe',
  'color-gray-100': '#bfdbfe',
  'color-gray-200': '#93c5fd',
  'color-gray-300': '#60a5fa',
  'color-gray-400': '#3b82f6',
  'color-gray-500': '#2563eb',
  'color-gray-600': '#1d4ed8',
  'color-gray-700': '#1e40af',
  'color-gray-800': '#1e3a8a',
  'color-gray-900': '#172554',
  // Background colors
  'color-background': '#dbeafe',
  'color-background-secondary': '#bfdbfe',
  'color-background-tertiary': '#93c5fd',
  'color-background-disabled': '#bfdbfe',
  'color-background-light': '#bfdbfe',
  // Option background colors
  'color-option-background-selected': 'rgba(0, 112, 243, 0.15)',
  // Text colors
  'color-text': '#1e40af',
  'color-text-secondary': '#1d4ed8',
  'color-text-muted': '#2563eb',
  'color-text-primary': '#1e40af',
  'color-text-disabled': '#1e3a8a',
  'color-text-inverse': '#dbeafe',
  // Heading colors - for better text hierarchy
  'color-heading-primary': '#172554',
  'color-heading-secondary': '#1e3a8a',
  'color-heading-tertiary': '#1e40af',
  'color-heading-muted': '#1d4ed8',
  // Content text colors
  'color-content-primary': '#1e3a8a',
  'color-content-secondary': '#1e40af',
  'color-content-muted': '#1d4ed8',
  'color-content-light': '#2563eb',
  // Link and interactive text
  'color-link': '#06b6d4',
  'color-link-hover': '#0891b2',
  'color-link-active': '#0e7490',
  'color-link-visited': '#8b5cf6',
  // Status text colors
  'color-text-error': '#ec4899',
  'color-text-info': '#06b6d4',
  // Border colors
  'color-border': '#3b82f6',
  'color-border-hover': '#2563eb',
  'color-border-focus': '#06b6d4',
  'color-border-light': '#93c5fd',
  // Gradients
  'gradient-primary': 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
  'gradient-success': 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)',
  'gradient-warning': 'linear-gradient(135deg, #d97706 0%, #ec4899 100%)',
  'gradient-danger': 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  'gradient-info': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  // Border radius
  'border-radius': '10px',
  'border-radius-sm': '8px',
  'border-radius-md': '12px',
  'border-radius-lg': '16px',
  'border-radius-xl': '20px',
  // Shadows
  'shadow-sm': '0 1px 2px 0 rgba(30, 64, 175, 0.1)',
  'shadow-md': '0 4px 6px -1px rgba(30, 64, 175, 0.2), 0 2px 4px -1px rgba(30, 64, 175, 0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(30, 64, 175, 0.2), 0 4px 6px -2px rgba(30, 64, 175, 0.1)',
  'shadow-xl': '0 20px 25px -5px rgba(30, 64, 175, 0.2), 0 10px 10px -5px rgba(30, 64, 175, 0.1)',
  'shadow-2xl': '0 25px 50px -12px rgba(30, 64, 175, 0.3)',
  'shadow-inner': 'inset 0 2px 4px 0 rgba(30, 64, 175, 0.1)',
  // Advanced Color Tokens - RGB Values (for opacity calculations)
  'color-primary-rgb': '6, 182, 212',
  'color-secondary-rgb': '59, 130, 246',
  'color-success-rgb': '5, 150, 105',
  'color-warning-rgb': '217, 119, 6',
  'color-danger-rgb': '236, 72, 153',
  'color-info-rgb': '6, 182, 212',
  // Advanced Color Tokens - Opacity Variants
  'color-primary-10': 'rgba(6, 182, 212, 0.1)',
  'color-primary-20': 'rgba(6, 182, 212, 0.2)',
  'color-primary-30': 'rgba(6, 182, 212, 0.3)',
  'color-primary-40': 'rgba(6, 182, 212, 0.4)',
  'color-primary-50': 'rgba(6, 182, 212, 0.5)',
  'color-primary-60': 'rgba(6, 182, 212, 0.6)',
  'color-primary-70': 'rgba(6, 182, 212, 0.7)',
  'color-primary-80': 'rgba(6, 182, 212, 0.8)',
  'color-primary-90': 'rgba(6, 182, 212, 0.9)',
  'color-secondary-10': 'rgba(59, 130, 246, 0.1)',
  'color-secondary-20': 'rgba(59, 130, 246, 0.2)',
  'color-secondary-30': 'rgba(59, 130, 246, 0.3)',
  'color-secondary-40': 'rgba(59, 130, 246, 0.4)',
  'color-secondary-50': 'rgba(59, 130, 246, 0.5)',
  'color-secondary-60': 'rgba(59, 130, 246, 0.6)',
  'color-secondary-70': 'rgba(59, 130, 246, 0.7)',
  'color-secondary-80': 'rgba(59, 130, 246, 0.8)',
  'color-secondary-90': 'rgba(59, 130, 246, 0.9)',

  // Overlay/scrim — used by Modal, Drawer, CommandPalette backdrops
  'color-scrim': 'rgba(0, 0, 0, 0.5)',
};
