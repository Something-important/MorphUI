import { lightTheme } from './lightTheme';
import type { Theme } from '.';

export const darkTheme: Theme = {
  ...lightTheme,

  // Only the tokens that differ from lightTheme are listed below.
  // Everything else is inherited from the base via the spread above.

  // Base colors
  'color-primary': '#3b82f6',
  'color-primary-hover': '#2563eb',
  'color-primary-active': '#1d4ed8',
  'color-secondary': '#9ca3af',
  'color-secondary-hover': '#6b7280',
  'color-secondary-active': '#4b5563',
  'color-danger': '#dc2626',
  'color-danger-hover': '#b91c1c',
  'color-danger-active': '#991b1b',
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
  'color-secondary-light': 'rgba(156, 163, 175, 0.1)',
  'color-success-light': 'rgba(5, 150, 105, 0.1)',
  'color-warning-light': 'rgba(217, 119, 6, 0.1)',
  'color-danger-light': 'rgba(220, 38, 38, 0.1)',
  // Neutral colors
  'color-gray-50': '#1f2937',
  'color-gray-100': '#374151',
  'color-gray-200': '#4b5563',
  'color-gray-300': '#6b7280',
  'color-gray-500': '#d1d5db',
  'color-gray-600': '#e5e7eb',
  'color-gray-700': '#f3f4f6',
  'color-gray-800': '#f9fafb',
  'color-gray-900': '#ffffff',
  // Background colors
  'color-background': '#1f2937',
  'color-background-secondary': '#374151',
  'color-background-tertiary': '#4b5563',
  'color-background-hover': 'rgba(255, 255, 255, 0.05)',
  'color-background-disabled': '#374151',
  'color-background-light': '#374151',
  // Option background colors
  'color-option-background-hover': 'rgba(255, 255, 255, 0.05)',
  'color-option-background-selected': 'rgba(0, 112, 243, 0.2)',
  // Text colors
  'color-text': '#f9fafb',
  'color-text-primary': '#f9fafb',
  'color-text-secondary': '#d1d5db',
  'color-text-disabled': '#6b7280',
  'color-text-inverse': '#1f2937',
  // Heading colors - for better text hierarchy
  'color-heading-primary': '#ffffff',
  'color-heading-secondary': '#f9fafb',
  'color-heading-tertiary': '#e5e7eb',
  'color-heading-muted': '#d1d5db',
  // Content text colors
  'color-content-primary': '#f3f4f6',
  'color-content-secondary': '#e5e7eb',
  'color-content-muted': '#d1d5db',
  // Link and interactive text
  'color-link': '#60a5fa',
  'color-link-hover': '#93c5fd',
  'color-link-active': '#3b82f6',
  'color-link-visited': '#a78bfa',
  // Status text colors
  'color-text-success': '#34d399',
  'color-text-warning': '#fbbf24',
  'color-text-error': '#f87171',
  'color-text-info': '#22d3ee',
  // Border colors
  'color-border': '#374151',
  'color-border-hover': '#4b5563',
  'color-border-light': '#4b5563',
  // Gradients
  'gradient-primary': 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
  'gradient-secondary': 'linear-gradient(135deg, #374151 0%, #6b7280 100%)',
  'gradient-success': 'linear-gradient(135deg, #065f46 0%, #047857 100%)',
  'gradient-warning': 'linear-gradient(135deg, #92400e 0%, #b45309 100%)',
  'gradient-danger': 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)',
  'gradient-info': 'linear-gradient(135deg, #0c4a6e 0%, #0891b2 100%)',
  // Shadows
  'shadow-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  'shadow-md': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  'shadow-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
  'shadow-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.3)',
  'shadow-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
  'shadow-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  'shadow-glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  // Advanced Color Tokens - RGB Values (for opacity calculations)
  'color-primary-rgb': '59, 130, 246',
  'color-secondary-rgb': '156, 163, 175',
  'color-success-rgb': '5, 150, 105',
  'color-warning-rgb': '217, 119, 6',
  'color-danger-rgb': '220, 38, 38',
  'color-info-rgb': '6, 182, 212',
  'color-white-rgb': '255, 255, 255',
  // Advanced Color Tokens - Opacity Variants
  'color-primary-10': 'rgba(59, 130, 246, 0.1)',
  'color-primary-20': 'rgba(59, 130, 246, 0.2)',
  'color-primary-30': 'rgba(59, 130, 246, 0.3)',
  'color-primary-40': 'rgba(59, 130, 246, 0.4)',
  'color-primary-50': 'rgba(59, 130, 246, 0.5)',
  'color-primary-60': 'rgba(59, 130, 246, 0.6)',
  'color-primary-70': 'rgba(59, 130, 246, 0.7)',
  'color-primary-80': 'rgba(59, 130, 246, 0.8)',
  'color-primary-90': 'rgba(59, 130, 246, 0.9)',
  'color-secondary-10': 'rgba(156, 163, 175, 0.1)',
  'color-secondary-20': 'rgba(156, 163, 175, 0.2)',
  'color-secondary-30': 'rgba(156, 163, 175, 0.3)',
  'color-secondary-40': 'rgba(156, 163, 175, 0.4)',
  'color-secondary-50': 'rgba(156, 163, 175, 0.5)',
  'color-secondary-60': 'rgba(156, 163, 175, 0.6)',
  'color-secondary-70': 'rgba(156, 163, 175, 0.7)',
  'color-secondary-80': 'rgba(156, 163, 175, 0.8)',
  'color-secondary-90': 'rgba(156, 163, 175, 0.9)',

  // Overlay/scrim — used by Modal, Drawer, CommandPalette backdrops
  'color-scrim': 'rgba(0, 0, 0, 0.7)',
};
