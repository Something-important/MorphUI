import React from 'react';
import {
  createRipple,
  animateIn,
  animateOut,
  staggerAnimation,
  debounce,
  throttle,
  prefersReducedMotion,
  safeAnimate,
} from '../src/utils/animation';

// Stub requestAnimationFrame (jsdom does not implement it by default).
// Callbacks are captured but not fired, so initial state stays observable.
let rafCallbacks: FrameRequestCallback[] = [];

beforeAll(() => {
  window.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    rafCallbacks.push(cb);
    return 0;
  };
});

beforeEach(() => {
  rafCallbacks = [];
});

const createMouseEvent = (
  element: HTMLElement,
  clientX = 50,
  clientY = 50,
): React.MouseEvent<HTMLElement> =>
  ({ currentTarget: element, clientX, clientY }) as unknown as React.MouseEvent<HTMLElement>;

describe('Animation Utilities', () => {
  // createRipple
  describe('createRipple', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('button');
      document.body.appendChild(element);
    });

    afterEach(() => {
      element.remove();
    });

    it('creates a ripple element with the morphui-ripple class', () => {
      createRipple(createMouseEvent(element));
      const ripple = element.querySelector('.morphui-ripple');
      expect(ripple).not.toBeNull();
    });

    it('appends the ripple to the clicked element', () => {
      createRipple(createMouseEvent(element));
      expect(element.querySelector('.morphui-ripple')).toBeInTheDocument();
    });

    it('positions the element as relative and hides overflow', () => {
      createRipple(createMouseEvent(element));
      expect(element.style.position).toBe('relative');
      expect(element.style.overflow).toBe('hidden');
    });

    it('uses the default ripple color when no options are given', () => {
      createRipple(createMouseEvent(element));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.background).toBe('rgba(255, 255, 255, 0.3)');
    });

    it('uses a custom ripple color', () => {
      createRipple(createMouseEvent(element), { color: 'rgba(0, 0, 0, 0.5)' });
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.background).toBe('rgba(0, 0, 0, 0.5)');
    });

    it('applies the ripple as a circle', () => {
      createRipple(createMouseEvent(element));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.borderRadius).toBe('50%');
    });

    it('starts the ripple at scale(0) with full opacity', () => {
      createRipple(createMouseEvent(element));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.transform).toBe('scale(0)');
      expect(ripple.style.opacity).toBe('1');
    });

    it('does not intercept pointer events', () => {
      createRipple(createMouseEvent(element));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.pointerEvents).toBe('none');
    });

    it('animates the ripple via requestAnimationFrame', () => {
      createRipple(createMouseEvent(element));
      rafCallbacks.forEach((cb) => cb(0));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.transform).toBe('scale(4)');
      expect(ripple.style.opacity).toBe('0');
      expect(ripple.style.transition).toContain('transform 600ms');
      expect(ripple.style.transition).toContain('opacity 600ms');
    });

    it('honors custom scale and opacity options', () => {
      createRipple(createMouseEvent(element), { scale: 2, opacity: 0.5 });
      rafCallbacks.forEach((cb) => cb(0));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.transform).toBe('scale(2)');
      expect(ripple.style.opacity).toBe('0.5');
    });

    it('honors a custom duration in the transition', () => {
      createRipple(createMouseEvent(element), { duration: 300 });
      rafCallbacks.forEach((cb) => cb(0));
      const ripple = element.querySelector('.morphui-ripple') as HTMLElement;
      expect(ripple.style.transition).toContain('transform 300ms');
    });

    it('removes the ripple when the cleanup function is called', () => {
      const removeRipple = createRipple(createMouseEvent(element));
      removeRipple();
      expect(element.querySelector('.morphui-ripple')).toBeNull();
    });

    it('cleanup is safe to call more than once', () => {
      const removeRipple = createRipple(createMouseEvent(element));
      removeRipple();
      expect(() => removeRipple()).not.toThrow();
    });
  });

  // animateIn
  describe('animateIn', () => {
    let element: HTMLElement;

    beforeEach(() => {
      jest.useFakeTimers();
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      jest.useRealTimers();
      element.remove();
    });

    it('sets the initial hidden state immediately', () => {
      animateIn(element, 'fadeIn');
      expect(element.style.opacity).toBe('0');
      expect(element.style.transform).toBe('translateY(20px) scale(0.95)');
    });

    it('sets a transition with default duration and easing', () => {
      animateIn(element, 'fadeIn');
      expect(element.style.transition).toBe('all 300ms ease-out');
    });

    it('reveals the element after the delay', () => {
      animateIn(element, 'fadeIn', { delay: 100 });
      jest.advanceTimersByTime(100);
      expect(element.style.opacity).toBe('1');
      expect(element.style.transform).toBe('translateY(0) scale(1)');
    });

    it('does not reveal the element before the delay', () => {
      animateIn(element, 'fadeIn', { delay: 100 });
      jest.advanceTimersByTime(99);
      expect(element.style.opacity).toBe('0');
    });

    it('uses custom duration and easing', () => {
      animateIn(element, 'fadeIn', { duration: 500, easing: 'ease-in-out' });
      expect(element.style.transition).toBe('all 500ms ease-in-out');
    });

    it('clears the transition after the animation completes', () => {
      animateIn(element, 'fadeIn', { duration: 300, delay: 100 });
      jest.advanceTimersByTime(400);
      expect(element.style.transition).toBe('');
    });

    it('keeps the transition while the animation is still running', () => {
      animateIn(element, 'fadeIn', { duration: 300, delay: 100 });
      jest.advanceTimersByTime(399);
      expect(element.style.transition).toBe('all 300ms ease-out');
    });
  });

  // animateOut
  describe('animateOut', () => {
    let element: HTMLElement;

    beforeEach(() => {
      jest.useFakeTimers();
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      jest.useRealTimers();
      element.remove();
    });

    it('fades out by setting opacity to 0', () => {
      animateOut(element, 'fadeOut');
      expect(element.style.opacity).toBe('0');
    });

    it('slides out by moving the element left', () => {
      animateOut(element, 'slideOut');
      expect(element.style.transform).toBe('translateX(-100%)');
    });

    it('scales out while fading', () => {
      animateOut(element, 'scaleOut');
      expect(element.style.transform).toBe('scale(0.8)');
      expect(element.style.opacity).toBe('0');
    });

    it('slides down while fading', () => {
      animateOut(element, 'slideDown');
      expect(element.style.transform).toBe('translateY(20px)');
      expect(element.style.opacity).toBe('0');
    });

    it('sets a transition with default duration and easing', () => {
      animateOut(element, 'fadeOut');
      expect(element.style.transition).toBe('all 300ms ease-in');
    });

    it('uses custom duration and easing', () => {
      animateOut(element, 'fadeOut', { duration: 150, easing: 'linear' });
      expect(element.style.transition).toBe('all 150ms linear');
    });

    it('resolves the promise after the duration', async () => {
      const promise = animateOut(element, 'fadeOut', { duration: 200 });
      jest.advanceTimersByTime(200);
      await expect(promise).resolves.toBeUndefined();
    });

    it('does not resolve the promise before the duration', async () => {
      let resolved = false;
      const promise = animateOut(element, 'fadeOut', { duration: 200 });
      promise.then(() => {
        resolved = true;
      });
      jest.advanceTimersByTime(199);
      await Promise.resolve();
      expect(resolved).toBe(false);
    });
  });

  // staggerAnimation
  describe('staggerAnimation', () => {
    let elements: HTMLElement[];

    beforeEach(() => {
      jest.useFakeTimers();
      elements = [1, 2, 3].map(() => {
        const el = document.createElement('div');
        document.body.appendChild(el);
        return el;
      });
    });

    afterEach(() => {
      jest.useRealTimers();
      elements.forEach((el) => el.remove());
    });

    it('hides all elements initially', () => {
      staggerAnimation(elements, 'fadeIn');
      elements.forEach((el) => expect(el.style.opacity).toBe('0'));
    });

    it('animates the first element without delay', () => {
      staggerAnimation(elements, 'fadeIn');
      jest.advanceTimersByTime(1);
      expect(elements[0].style.opacity).toBe('1');
    });

    it('staggers subsequent elements by the delay', () => {
      staggerAnimation(elements, 'fadeIn', { staggerDelay: 100 });
      jest.advanceTimersByTime(100);
      expect(elements[0].style.opacity).toBe('1');
      expect(elements[1].style.opacity).toBe('1');
      expect(elements[2].style.opacity).toBe('0');
    });

    it('animates all elements once every stagger has elapsed', () => {
      staggerAnimation(elements, 'fadeIn', { staggerDelay: 100 });
      jest.advanceTimersByTime(200);
      elements.forEach((el) => expect(el.style.opacity).toBe('1'));
    });

    it('uses the default stagger delay of 100ms', () => {
      staggerAnimation(elements, 'fadeIn');
      jest.advanceTimersByTime(199);
      expect(elements[1].style.opacity).toBe('1');
      expect(elements[2].style.opacity).toBe('0');
    });

    it('passes animation options through to each element', () => {
      staggerAnimation(elements, 'fadeIn', { duration: 500 });
      elements.forEach((el) => expect(el.style.transition).toBe('all 500ms ease-out'));
    });

    it('handles an empty element list without error', () => {
      expect(() => staggerAnimation([], 'fadeIn')).not.toThrow();
    });
  });

  // debounce
  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('does not call the function immediately', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 250);
      debounced();
      expect(fn).not.toHaveBeenCalled();
    });

    it('calls the function after the wait time', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 250);
      debounced();
      jest.advanceTimersByTime(250);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('collapses multiple calls into one', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 250);
      debounced();
      debounced();
      debounced();
      jest.advanceTimersByTime(250);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets the timer on each subsequent call', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 250);
      debounced();
      jest.advanceTimersByTime(200);
      debounced();
      jest.advanceTimersByTime(200);
      expect(fn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('passes the latest arguments to the function', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      debounced('first');
      debounced('second');
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('second');
    });
  });

  // throttle
  describe('throttle', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('calls the function immediately on first call', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('suppresses calls within the limit', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('allows another call after the limit passes', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      throttled();
      jest.advanceTimersByTime(100);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('passes arguments through to the function', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      throttled('arg1', 'arg2');
      expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
    });

    it('continues throttling over many rapid calls', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 100);
      // Calls land at t=0, 100, 200 and are blocked in between
      for (let i = 0; i < 30; i++) {
        throttled(i);
        jest.advanceTimersByTime(10);
      }
      expect(fn).toHaveBeenCalledTimes(3);
    });
  });

  // prefersReducedMotion / safeAnimate
  describe('prefersReducedMotion and safeAnimate', () => {
    const originalMatchMedia = window.matchMedia;
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      window.matchMedia = originalMatchMedia;
      element.remove();
    });

    const mockMatchMedia = (matches: boolean): void => {
      window.matchMedia = jest.fn().mockReturnValue({
        matches,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      }) as unknown as typeof window.matchMedia;
    };

    it('returns false when reduced motion is not preferred', () => {
      mockMatchMedia(false);
      expect(prefersReducedMotion()).toBe(false);
    });

    it('returns true when reduced motion is preferred', () => {
      mockMatchMedia(true);
      expect(prefersReducedMotion()).toBe(true);
    });

    it('runs the animation when motion is allowed', () => {
      mockMatchMedia(false);
      const animation = jest.fn();
      const fallback = jest.fn();
      safeAnimate(element, animation, fallback);
      expect(animation).toHaveBeenCalledTimes(1);
      expect(fallback).not.toHaveBeenCalled();
    });

    it('runs the fallback when reduced motion is preferred', () => {
      mockMatchMedia(true);
      const animation = jest.fn();
      const fallback = jest.fn();
      safeAnimate(element, animation, fallback);
      expect(fallback).toHaveBeenCalledTimes(1);
      expect(animation).not.toHaveBeenCalled();
    });
  });
});
