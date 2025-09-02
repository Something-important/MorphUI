/**
 * Animation Utilities
 * 
 * Shared functions for creating smooth animations, ripple effects, and transitions.
 * Used by components to ensure consistent animation behavior and performance.
 */

export interface RippleOptions {
  color?: string;
  duration?: number;
  scale?: number;
  opacity?: number;
}

export interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
}

/**
 * Creates a ripple effect on click (Material Design style)
 * 
 * @param event - Mouse click event
 * @param options - Ripple customization options
 * @returns Function to remove the ripple
 * 
 * @example
 * const removeRipple = createRipple(event, { color: 'rgba(255,255,255,0.3)' });
 * setTimeout(removeRipple, 600);
 */
export const createRipple = (
  event: React.MouseEvent<HTMLElement>,
  options: RippleOptions = {}
): (() => void) => {
  const {
    color = 'rgba(255, 255, 255, 0.3)',
    duration = 600,
    scale = 4,
    opacity = 0
  } = options;

  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  // Create ripple element
  const ripple = document.createElement('span');
  ripple.className = 'morphui-ripple';
  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: ${color};
    border-radius: 50%;
    transform: scale(0);
    opacity: 1;
    pointer-events: none;
    z-index: 1000;
  `;

  // Add to element
  element.style.position = 'relative';
  element.style.overflow = 'hidden';
  element.appendChild(ripple);

  // Animate
  requestAnimationFrame(() => {
    ripple.style.transition = `transform ${duration}ms ease-out, opacity ${duration}ms ease-out`;
    ripple.style.transform = `scale(${scale})`;
    ripple.style.opacity = opacity.toString();
  });

  // Return cleanup function
  return () => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  };
};

/**
 * Animates an element in with a specified animation
 * 
 * @param element - Element to animate
 * @param animation - Animation type
 * @param options - Animation options
 * 
 * @example
 * animateIn(element, 'fadeIn', { duration: 300, delay: 100 });
 */
export const animateIn = (
  element: HTMLElement,
  animation: 'fadeIn' | 'slideIn' | 'scaleIn' | 'slideUp',
  options: AnimationOptions = {}
): void => {
  const {
    duration = 300,
    easing = 'ease-out',
    delay = 0
  } = options;

  // Set initial state
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px) scale(0.95)';
  element.style.transition = `all ${duration}ms ${easing}`;

  // Animate after delay
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0) scale(1)';
  }, delay);

  // Clean up transition after animation
  setTimeout(() => {
    element.style.transition = '';
  }, delay + duration);
};

/**
 * Animates an element out with a specified animation
 * 
 * @param element - Element to animate
 * @param animation - Animation type
 * @param options - Animation options
 * @returns Promise that resolves when animation completes
 * 
 * @example
 * await animateOut(element, 'fadeOut', { duration: 200 });
 */
export const animateOut = (
  element: HTMLElement,
  animation: 'fadeOut' | 'slideOut' | 'scaleOut' | 'slideDown',
  options: AnimationOptions = {}
): Promise<void> => {
  const {
    duration = 300,
    easing = 'ease-in'
  } = options;

  return new Promise((resolve) => {
    // Set final state
    element.style.transition = `all ${duration}ms ${easing}`;
    
    switch (animation) {
      case 'fadeOut':
        element.style.opacity = '0';
        break;
      case 'slideOut':
        element.style.transform = 'translateX(-100%)';
        break;
      case 'scaleOut':
        element.style.transform = 'scale(0.8)';
        element.style.opacity = '0';
        break;
      case 'slideDown':
        element.style.transform = 'translateY(20px)';
        element.style.opacity = '0';
        break;
    }

    // Resolve after animation
    setTimeout(resolve, duration);
  });
};

/**
 * Creates a staggered animation for multiple elements
 * 
 * @param elements - Array of elements to animate
 * @param animation - Animation type
 * @param options - Animation options with stagger delay
 * 
 * @example
 * const elements = document.querySelectorAll('.item');
 * staggerAnimation(Array.from(elements), 'fadeIn', { staggerDelay: 100 });
 */
export const staggerAnimation = (
  elements: HTMLElement[],
  animation: 'fadeIn' | 'slideIn' | 'scaleIn',
  options: AnimationOptions & { staggerDelay?: number } = {}
): void => {
  const { staggerDelay = 100, ...animationOptions } = options;

  elements.forEach((element, index) => {
    const delay = index * staggerDelay;
    animateIn(element, animation, { ...animationOptions, delay });
  });
};

/**
 * Debounces a function to improve performance
 * 
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 * 
 * @example
 * const debouncedResize = debounce(handleResize, 250);
 * window.addEventListener('resize', debouncedResize);
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

/**
 * Throttles a function to improve performance
 * 
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 * @returns Throttled function
 * 
 * @example
 * const throttledScroll = throttle(handleScroll, 100);
 * window.addEventListener('scroll', throttledScroll);
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Checks if the user prefers reduced motion
 * 
 * @returns True if user prefers reduced motion
 * 
 * @example
 * if (!prefersReducedMotion()) {
 *   animateIn(element, 'fadeIn');
 * }
 */
export const prefersReducedMotion = (): boolean => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Safely animates an element respecting user preferences
 * 
 * @param element - Element to animate
 * @param animation - Animation function
 * @param fallback - Fallback function if motion is reduced
 * 
 * @example
 * safeAnimate(element, 
 *   () => animateIn(element, 'fadeIn'),
 *   () => element.style.opacity = '1'
 * );
 */
export const safeAnimate = (
  element: HTMLElement,
  animation: () => void,
  fallback: () => void
): void => {
  if (prefersReducedMotion()) {
    fallback();
  } else {
    animation();
  }
};
