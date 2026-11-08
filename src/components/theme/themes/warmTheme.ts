import { lightTheme } from './lightTheme';
import type { Theme } from '.';

export const warmTheme: Theme = {
  ...lightTheme,

  // Only the tokens that differ from lightTheme are listed below.
  // Everything else is inherited from the base via the spread above.

  // Base colors
  'color-primary': '#f97316',
  'color-primary-hover': '#ea580c',
  'color-primary-active': '#c2410c',
  'color-secondary': '#f59e0b',
  'color-secondary-hover': '#d97706',
  'color-secondary-active': '#b45309',
  'color-danger': '#dc2626',
  'color-danger-hover': '#b91c1c',
  'color-danger-active': '#991b1b',
  'color-success': '#16a34a',
  'color-success-hover': '#15803d',
  'color-success-active': '#166534',
  'color-warning': '#ea580c',
  'color-warning-hover': '#dc2626',
  'color-warning-active': '#c2410c',
  'color-info': '#0ea5e9',
  'color-info-hover': '#0284c7',
  'color-info-active': '#0369a1',
  // Light color variants (for backgrounds, highlights)
  'color-primary-light': 'rgba(239, 68, 68, 0.1)',
  'color-secondary-light': 'rgba(156, 163, 175, 0.1)',
  'color-success-light': 'rgba(22, 163, 74, 0.1)',
  'color-warning-light': 'rgba(234, 88, 12, 0.1)',
  'color-info-light': 'rgba(14, 165, 233, 0.1)',
  // Neutral colors (subtle warm undertones)
  'color-gray-50': '#faf9f7',
  'color-gray-100': '#f5f3f0',
  'color-gray-200': '#e7e4e0',
  'color-gray-300': '#d6d1cc',
  'color-gray-400': '#a8a29e',
  'color-gray-500': '#78716c',
  'color-gray-600': '#57534e',
  'color-gray-700': '#44403c',
  'color-gray-800': '#292524',
  'color-gray-900': '#1c1917',
  // Background colors
  'color-background': '#fef3c7',
  'color-background-secondary': '#fde68a',
  'color-background-tertiary': '#fcd34d',
  'color-background-disabled': '#fde68a',
  'color-background-light': '#fde68a',
  // Option background colors
  'color-option-background-selected': 'rgba(245, 158, 11, 0.15)',
  // Text colors
  'color-text': '#92400e',
  'color-text-secondary': '#b45309',
  'color-text-muted': '#d97706',
  'color-text-primary': '#92400e',
  'color-text-disabled': '#a16207',
  'color-text-inverse': '#fef3c7',
  // Heading colors - for better text hierarchy
  'color-heading-primary': '#451a03',
  'color-heading-secondary': '#78350f',
  'color-heading-tertiary': '#92400e',
  'color-heading-muted': '#b45309',
  // Content text colors
  'color-content-primary': '#78350f',
  'color-content-secondary': '#92400e',
  'color-content-muted': '#b45309',
  'color-content-light': '#d97706',
  // Link and interactive text
  'color-link': '#f97316',
  'color-link-hover': '#ea580c',
  'color-link-active': '#c2410c',
  'color-link-visited': '#dc2626',
  // Status text colors
  'color-text-success': '#b45309',
  'color-text-warning': '#dc2626',
  'color-text-error': '#b91c1c',
  'color-text-info': '#f97316',
  // Border colors
  'color-border': '#fbbf24',
  'color-border-hover': '#f59e0b',
  'color-border-focus': '#f97316',
  'color-border-light': '#fcd34d',
  // Gradients
  'gradient-primary': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  'gradient-success': 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
  'gradient-warning': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
  'gradient-danger': 'linear-gradient(135deg, #b91c1c 0%, #991b1b 100%)',
  'gradient-info': 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
  // Border radius
  'border-radius': '8px',
  'border-radius-sm': '6px',
  'border-radius-md': '10px',
  'border-radius-lg': '14px',
  'border-radius-xl': '18px',
  // Shadows
  'shadow-sm': '0 1px 2px 0 rgba(146, 64, 14, 0.1)',
  'shadow-md': '0 4px 6px -1px rgba(146, 64, 14, 0.2), 0 2px 4px -1px rgba(146, 64, 14, 0.1)',
  'shadow-lg': '0 10px 15px -3px rgba(146, 64, 14, 0.2), 0 4px 6px -2px rgba(146, 64, 14, 0.1)',
  'shadow-xl': '0 20px 25px -5px rgba(146, 64, 14, 0.2), 0 10px 10px -5px rgba(146, 64, 14, 0.1)',
  'shadow-2xl': '0 25px 50px -12px rgba(146, 64, 14, 0.3)',
  'shadow-inner': 'inset 0 2px 4px 0 rgba(146, 64, 14, 0.1)',
  'shadow-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  // Advanced Color Tokens - RGB Values (for opacity calculations)
  'color-primary-rgb': '249, 115, 22',
  'color-secondary-rgb': '245, 158, 11',
  'color-success-rgb': '22, 163, 74',
  'color-warning-rgb': '234, 88, 12',
  'color-danger-rgb': '220, 38, 38',
  'color-info-rgb': '14, 165, 233',
  'color-white-rgb': '255, 255, 255',
  // Advanced Color Tokens - Opacity Variants
  'color-primary-10': 'rgba(249, 115, 22, 0.1)',
  'color-primary-20': 'rgba(249, 115, 22, 0.2)',
  'color-primary-30': 'rgba(249, 115, 22, 0.3)',
  'color-primary-40': 'rgba(249, 115, 22, 0.4)',
  'color-primary-50': 'rgba(249, 115, 22, 0.5)',
  'color-primary-60': 'rgba(249, 115, 22, 0.6)',
  'color-primary-70': 'rgba(249, 115, 22, 0.7)',
  'color-primary-80': 'rgba(249, 115, 22, 0.8)',
  'color-primary-90': 'rgba(249, 115, 22, 0.9)',
  'color-secondary-10': 'rgba(245, 158, 11, 0.1)',
  'color-secondary-20': 'rgba(245, 158, 11, 0.2)',
  'color-secondary-30': 'rgba(245, 158, 11, 0.3)',
  'color-secondary-40': 'rgba(245, 158, 11, 0.4)',
  'color-secondary-50': 'rgba(245, 158, 11, 0.5)',
  'color-secondary-60': 'rgba(245, 158, 11, 0.6)',
  'color-secondary-70': 'rgba(245, 158, 11, 0.7)',
  'color-secondary-80': 'rgba(245, 158, 11, 0.8)',
  'color-secondary-90': 'rgba(245, 158, 11, 0.9)',

  // Overlay/scrim — used by Modal, Drawer, CommandPalette backdrops
  'color-scrim': 'rgba(0, 0, 0, 0.5)',
};
