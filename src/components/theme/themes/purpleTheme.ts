import { lightTheme } from './lightTheme';
import type { Theme } from '.';

export const purpleTheme: Theme = {
  ...lightTheme,

  // Only the tokens that differ from lightTheme are listed below.
  // Everything else is inherited from the base via the spread above.

  // Base colors - Purple theme
  'color-primary': '#8b5cf6',
  'color-primary-hover': '#7c3aed',
  'color-primary-active': '#6d28d9',
  'color-secondary': '#a78bfa',
  'color-secondary-hover': '#8b5cf6',
  'color-secondary-active': '#7c3aed',
  'color-info': '#06b6d4',
  'color-info-hover': '#0891b2',
  'color-info-active': '#0e7490',
  // Light color variants
  'color-primary-light': 'rgba(139, 92, 246, 0.1)',
  'color-secondary-light': 'rgba(167, 139, 250, 0.1)',
  // Neutral colors - Purple-tinted grays
  'color-gray-50': '#faf5ff',
  'color-gray-100': '#f3e8ff',
  'color-gray-200': '#e9d5ff',
  'color-gray-300': '#d8b4fe',
  'color-gray-400': '#c084fc',
  'color-gray-500': '#a855f7',
  'color-gray-600': '#9333ea',
  'color-gray-700': '#7c3aed',
  'color-gray-800': '#6b21a8',
  'color-gray-900': '#581c87',
  // Background colors
  'color-background': '#faf5ff',
  'color-background-secondary': '#f3e8ff',
  'color-background-tertiary': '#e9d5ff',
  'color-background-hover': 'rgba(139, 92, 246, 0.05)',
  'color-background-disabled': '#f3e8ff',
  'color-background-light': '#f3e8ff',
  // Option background colors
  'color-option-background-hover': 'rgba(139, 92, 246, 0.05)',
  'color-option-background-selected': 'rgba(139, 92, 246, 0.1)',
  // Text colors
  'color-text': '#581c87',
  'color-text-primary': '#581c87',
  'color-text-secondary': '#7c3aed',
  'color-text-muted': '#a855f7',
  'color-text-disabled': '#c084fc',
  'color-text-inverse': '#faf5ff',
  // Heading colors - for better text hierarchy
  'color-heading-primary': '#581c87',
  'color-heading-secondary': '#6b21a8',
  'color-heading-tertiary': '#7c3aed',
  'color-heading-muted': '#9333ea',
  // Content text colors
  'color-content-primary': '#6b21a8',
  'color-content-secondary': '#7c3aed',
  'color-content-muted': '#9333ea',
  'color-content-light': '#a855f7',
  // Link and interactive text
  'color-link': '#8b5cf6',
  'color-link-hover': '#7c3aed',
  'color-link-active': '#6d28d9',
  'color-link-visited': '#a855f7',
  // Status text colors
  'color-text-info': '#0891b2',
  // Border colors
  'color-border': '#d8b4fe',
  'color-border-hover': '#c084fc',
  'color-border-focus': '#8b5cf6',
  'color-border-light': '#e9d5ff',
  // Gradients - Purple theme
  'gradient-primary': 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)',
  'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  'gradient-info': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
  // Shadows - Purple-tinted
  'shadow-sm': '0 1px 2px 0 rgba(139, 92, 246, 0.05)',
  'shadow-md': '0 4px 6px -1px rgba(139, 92, 246, 0.1), 0 2px 4px -1px rgba(139, 92, 246, 0.06)',
  'shadow-lg': '0 10px 15px -3px rgba(139, 92, 246, 0.1), 0 4px 6px -2px rgba(139, 92, 246, 0.05)',
  'shadow-2xl': '0 25px 50px -12px rgba(139, 92, 246, 0.25)',
  'shadow-inner': 'inset 0 2px 4px 0 rgba(139, 92, 246, 0.06)',
  'shadow-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  // Advanced Color Tokens - RGB Values (for opacity calculations)
  'color-primary-rgb': '139, 92, 246',
  'color-secondary-rgb': '167, 139, 250',
  'color-info-rgb': '6, 182, 212',
  'color-white-rgb': '255, 255, 255',
  // Advanced Color Tokens - Opacity Variants
  'color-primary-10': 'rgba(139, 92, 246, 0.1)',
  'color-primary-20': 'rgba(139, 92, 246, 0.2)',
  'color-primary-30': 'rgba(139, 92, 246, 0.3)',
  'color-primary-40': 'rgba(139, 92, 246, 0.4)',
  'color-primary-50': 'rgba(139, 92, 246, 0.5)',
  'color-primary-60': 'rgba(139, 92, 246, 0.6)',
  'color-primary-70': 'rgba(139, 92, 246, 0.7)',
  'color-primary-80': 'rgba(139, 92, 246, 0.8)',
  'color-primary-90': 'rgba(139, 92, 246, 0.9)',
  'color-secondary-10': 'rgba(167, 139, 250, 0.1)',
  'color-secondary-20': 'rgba(167, 139, 250, 0.2)',
  'color-secondary-30': 'rgba(167, 139, 250, 0.3)',
  'color-secondary-40': 'rgba(167, 139, 250, 0.4)',
  'color-secondary-50': 'rgba(167, 139, 250, 0.5)',
  'color-secondary-60': 'rgba(167, 139, 250, 0.6)',
  'color-secondary-70': 'rgba(167, 139, 250, 0.7)',
  'color-secondary-80': 'rgba(167, 139, 250, 0.8)',
  'color-secondary-90': 'rgba(167, 139, 250, 0.9)',

  // Overlay/scrim — used by Modal, Drawer, CommandPalette backdrops
  'color-scrim': 'rgba(0, 0, 0, 0.5)',
};
