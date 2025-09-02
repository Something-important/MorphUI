/**
 * Accessibility Utilities
 * 
 * Shared functions for ARIA attributes, keyboard navigation, and screen reader support.
 * Used by components to ensure consistent accessibility behavior and WCAG compliance.
 */

export interface AriaProps {
  label?: string;
  describedBy?: string;
  controls?: string;
  expanded?: boolean;
  pressed?: boolean;
  selected?: boolean;
  required?: boolean;
  invalid?: boolean;
  live?: 'off' | 'polite' | 'assertive';
  atomic?: boolean;
  relevant?: 'additions' | 'removals' | 'text' | 'all';
  hasPopup?: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  role?: string;
  disabled?: boolean;
}

export interface KeyboardProps {
  onEnter?: () => void;
  onSpace?: () => void;
  onEscape?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
  onTab?: () => void;
  onShiftTab?: () => void;
}

/**
 * Generates a unique ID for ARIA relationships
 * 
 * @param prefix - Prefix for the ID
 * @returns Unique ID string
 * 
 * @example
 * const id = generateId('button');
 * // Returns: "button-12345"
 */
export const generateId = (prefix: string = 'morphui'): string => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Creates ARIA attributes object for components
 * 
 * @param props - Accessibility properties
 * @returns Object with ARIA attributes
 * 
 * @example
 * const ariaProps = getAriaProps({ 
 *   label: 'Submit form',
 *   required: true,
 *   invalid: false 
 * });
 */
export const getAriaProps = (props: AriaProps): Record<string, string | boolean> => {
  const aria: Record<string, string | boolean> = {};

  if (props.label) {
    aria['aria-label'] = props.label;
  }

  if (props.describedBy) {
    aria['aria-describedby'] = props.describedBy;
  }

  if (props.controls) {
    aria['aria-controls'] = props.controls;
  }

  if (props.expanded !== undefined) {
    aria['aria-expanded'] = props.expanded;
  }

  if (props.pressed !== undefined) {
    aria['aria-pressed'] = props.pressed;
  }

  if (props.selected !== undefined) {
    aria['aria-selected'] = props.selected;
  }

  if (props.required !== undefined) {
    aria['aria-required'] = props.required;
  }

  if (props.invalid !== undefined) {
    aria['aria-invalid'] = props.invalid;
  }

  if (props.live) {
    aria['aria-live'] = props.live;
  }

  if (props.atomic !== undefined) {
    aria['aria-atomic'] = props.atomic;
  }

  if (props.relevant) {
    aria['aria-relevant'] = props.relevant;
  }

  if (props.hasPopup) {
    aria['aria-haspopup'] = props.hasPopup;
  }

  if (props.role) {
    aria['role'] = props.role;
  }

  if (props.disabled !== undefined) {
    aria['aria-disabled'] = props.disabled;
  }

  return aria;
};

/**
 * Creates keyboard event handler for components
 * 
 * @param props - Keyboard event properties
 * @returns Keyboard event handler function
 * 
 * @example
 * const handleKeyDown = getKeyboardHandler({
 *   onEnter: () => console.log('Enter pressed'),
 *   onEscape: () => console.log('Escape pressed')
 * });
 */
export const getKeyboardHandler = (props: KeyboardProps) => {
  return (event: React.KeyboardEvent): void => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        if (event.key === 'Enter' && props.onEnter) {
          props.onEnter();
        } else if (event.key === ' ' && props.onSpace) {
          props.onSpace();
        }
        break;
      
      case 'Escape':
        if (props.onEscape) {
          props.onEscape();
        }
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        if (props.onArrowUp) {
          props.onArrowUp();
        }
        break;
      
      case 'ArrowDown':
        event.preventDefault();
        if (props.onArrowDown) {
          props.onArrowDown();
        }
        break;
      
      case 'ArrowLeft':
        event.preventDefault();
        if (props.onArrowLeft) {
          props.onArrowLeft();
        }
        break;
      
      case 'ArrowRight':
        event.preventDefault();
        if (props.onArrowRight) {
          props.onArrowRight();
        }
        break;
      
      case 'Tab':
        if (event.shiftKey && props.onShiftTab) {
          props.onShiftTab();
        } else if (!event.shiftKey && props.onTab) {
          props.onTab();
        }
        break;
    }
  };
};

/**
 * Manages focus within a container (trap focus)
 * 
 * @param container - Container element to trap focus within
 * @param onEscape - Callback when escape is pressed
 * 
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * useEffect(() => {
 *   if (containerRef.current) {
 *     return trapFocus(containerRef.current, () => setIsOpen(false));
 *   }
 * }, []);
 */
export const trapFocus = (
  container: HTMLElement,
  onEscape?: () => void
): (() => void) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  const handleKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    } else if (event.key === 'Escape' && onEscape) {
      onEscape();
    }
  };
  
  container.addEventListener('keydown', handleKeyDown);
  
  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }
  
  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
  };
};

/**
 * Announces a message to screen readers
 * 
 * @param message - Message to announce
 * @param priority - Priority level for the announcement
 * 
 * @example
 * announceToScreenReader('Form submitted successfully', 'polite');
 */
export const announceToScreenReader = (
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
): void => {
  // Create or get existing live region
  let liveRegion = document.getElementById('morphui-live-region');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'morphui-live-region';
    liveRegion.setAttribute('aria-live', priority);
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
  }
  
  // Update live region
  liveRegion.textContent = message;
  
  // Clear after a short delay
  setTimeout(() => {
    if (liveRegion) {
      liveRegion.textContent = '';
    }
  }, 1000);
};

/**
 * Checks if an element is visible to screen readers
 * 
 * @param element - Element to check
 * @returns True if element is visible to screen readers
 * 
 * @example
 * const isVisible = isScreenReaderVisible(element);
 */
export const isScreenReaderVisible = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  
  return (
    style.display !== 'none' &&
    style.visibility !== 'hidden' &&
    style.opacity !== '0' &&
    element.offsetWidth > 0 &&
    element.offsetHeight > 0
  );
};

/**
 * Creates a focus indicator for keyboard navigation
 * 
 * @param element - Element to add focus indicator to
 * @param options - Focus indicator options
 * @returns Function to remove the focus indicator
 * 
 * @example
 * const removeFocusIndicator = addFocusIndicator(element, {
 *   color: '#0070f3',
 *   width: '2px'
 * });
 */
export const addFocusIndicator = (
  element: HTMLElement,
  options: {
    color?: string;
    width?: string;
    style?: 'outline' | 'box-shadow';
  } = {}
): (() => void) => {
  const {
    color = '#0070f3',
    width = '2px',
    style = 'outline'
  } = options;
  
  const originalOutline = element.style.outline;
  const originalBoxShadow = element.style.boxShadow;
  
  const handleFocus = (): void => {
    if (style === 'outline') {
      element.style.outline = `${width} solid ${color}`;
      element.style.outlineOffset = '2px';
    } else {
      element.style.boxShadow = `0 0 0 ${width} ${color}`;
    }
  };
  
  const handleBlur = (): void => {
    element.style.outline = originalOutline;
    element.style.boxShadow = originalBoxShadow;
  };
  
  element.addEventListener('focus', handleFocus);
  element.addEventListener('blur', handleBlur);
  
  // Return cleanup function
  return () => {
    element.removeEventListener('focus', handleFocus);
    element.removeEventListener('blur', handleBlur);
    element.style.outline = originalOutline;
    element.style.boxShadow = originalBoxShadow;
  };
};

/**
 * Validates ARIA attributes for common issues
 * 
 * @param element - Element to validate
 * @returns Array of validation issues
 * 
 * @example
 * const issues = validateAriaAttributes(element);
 * if (issues.length > 0) {
 *   console.warn('ARIA validation issues:', issues);
 * }
 */
export const validateAriaAttributes = (element: HTMLElement): string[] => {
  const issues: string[] = [];
  
  // Check for missing labels
  if (element.hasAttribute('aria-label') && element.hasAttribute('aria-labelledby')) {
    issues.push('Element has both aria-label and aria-labelledby (use only one)');
  }
  
  // Check for invalid aria-expanded values
  const expanded = element.getAttribute('aria-expanded');
  if (expanded && !['true', 'false'].includes(expanded)) {
    issues.push('aria-expanded must be "true" or "false"');
  }
  
  // Check for invalid aria-pressed values
  const pressed = element.getAttribute('aria-pressed');
  if (pressed && !['true', 'false', 'mixed'].includes(pressed)) {
    issues.push('aria-pressed must be "true", "false", or "mixed"');
  }
  
  // Check for missing required attributes
  if (element.hasAttribute('aria-required') && element.getAttribute('aria-required') === 'true') {
    if (!element.hasAttribute('required')) {
      issues.push('Element with aria-required="true" should also have required attribute');
    }
  }
  
  return issues;
};
