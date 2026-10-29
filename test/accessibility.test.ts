import React from 'react';
import {
  generateId,
  getAriaProps,
  getKeyboardHandler,
  trapFocus,
  announceToScreenReader,
  isScreenReaderVisible,
  addFocusIndicator,
  validateAriaAttributes,
} from '../src/utils/accessibility';

const createKeyboardEvent = (
  key: string,
  options: { shiftKey?: boolean } = {},
): React.KeyboardEvent => {
  const event = {
    key,
    shiftKey: options.shiftKey ?? false,
    preventDefault: jest.fn(),
  };
  return event as unknown as React.KeyboardEvent;
};

describe('Accessibility Utilities', () => {
  // generateId
  describe('generateId', () => {
    it('generates an id with the default morphui prefix', () => {
      expect(generateId()).toMatch(/^morphui-[a-z0-9]+$/);
    });

    it('generates an id with a custom prefix', () => {
      expect(generateId('button')).toMatch(/^button-[a-z0-9]+$/);
    });

    it('generates unique ids', () => {
      const ids = new Set(Array.from({ length: 100 }, () => generateId()));
      expect(ids.size).toBe(100);
    });

    it('contains only lowercase alphanumeric characters after the prefix', () => {
      expect(generateId('tooltip')).toMatch(/^tooltip-[a-z0-9]{1,9}$/);
    });
  });

  // getAriaProps
  describe('getAriaProps', () => {
    it('returns an empty object when no props are provided', () => {
      expect(getAriaProps({})).toEqual({});
    });

    it('maps label to aria-label', () => {
      expect(getAriaProps({ label: 'Submit form' })).toEqual({ 'aria-label': 'Submit form' });
    });

    it('maps describedBy to aria-describedby', () => {
      expect(getAriaProps({ describedBy: 'description-id' })).toEqual({
        'aria-describedby': 'description-id',
      });
    });

    it('maps controls to aria-controls', () => {
      expect(getAriaProps({ controls: 'content-id' })).toEqual({ 'aria-controls': 'content-id' });
    });

    it('includes aria-expanded when expanded is true', () => {
      expect(getAriaProps({ expanded: true })).toEqual({ 'aria-expanded': true });
    });

    it('includes aria-expanded when expanded is false', () => {
      expect(getAriaProps({ expanded: false })).toEqual({ 'aria-expanded': false });
    });

    it('omits aria-expanded when expanded is undefined', () => {
      expect(getAriaProps({ expanded: undefined })).toEqual({});
    });

    it('includes aria-pressed when pressed is defined', () => {
      expect(getAriaProps({ pressed: true })).toEqual({ 'aria-pressed': true });
      expect(getAriaProps({ pressed: false })).toEqual({ 'aria-pressed': false });
    });

    it('includes aria-selected when selected is defined', () => {
      expect(getAriaProps({ selected: true })).toEqual({ 'aria-selected': true });
    });

    it('includes aria-required when required is defined', () => {
      expect(getAriaProps({ required: true })).toEqual({ 'aria-required': true });
    });

    it('includes aria-invalid when invalid is defined', () => {
      expect(getAriaProps({ invalid: true })).toEqual({ 'aria-invalid': true });
    });

    it('maps live to aria-live', () => {
      expect(getAriaProps({ live: 'polite' })).toEqual({ 'aria-live': 'polite' });
      expect(getAriaProps({ live: 'assertive' })).toEqual({ 'aria-live': 'assertive' });
    });

    it('includes aria-atomic when atomic is defined', () => {
      expect(getAriaProps({ atomic: true })).toEqual({ 'aria-atomic': true });
    });

    it('maps relevant to aria-relevant', () => {
      expect(getAriaProps({ relevant: 'additions' })).toEqual({ 'aria-relevant': 'additions' });
    });

    it('maps hasPopup to aria-haspopup', () => {
      expect(getAriaProps({ hasPopup: 'menu' })).toEqual({ 'aria-haspopup': 'menu' });
    });

    it('maps role directly', () => {
      expect(getAriaProps({ role: 'switch' })).toEqual({ role: 'switch' });
    });

    it('includes aria-disabled when disabled is defined', () => {
      expect(getAriaProps({ disabled: true })).toEqual({ 'aria-disabled': true });
    });

    it('builds a complete attribute set from all props', () => {
      const props = getAriaProps({
        label: 'Close',
        expanded: true,
        hasPopup: 'dialog',
        role: 'button',
      });
      expect(props).toEqual({
        'aria-label': 'Close',
        'aria-expanded': true,
        'aria-haspopup': 'dialog',
        role: 'button',
      });
    });

    it('ignores empty string values for optional string props', () => {
      expect(getAriaProps({ label: '', describedBy: '' })).toEqual({});
    });
  });

  // getKeyboardHandler
  describe('getKeyboardHandler', () => {
    it('calls onEnter when Enter is pressed', () => {
      const onEnter = jest.fn();
      const handler = getKeyboardHandler({ onEnter });
      const event = createKeyboardEvent('Enter');
      handler(event);
      expect(onEnter).toHaveBeenCalledTimes(1);
    });

    it('calls onSpace when Space is pressed', () => {
      const onSpace = jest.fn();
      const handler = getKeyboardHandler({ onSpace });
      handler(createKeyboardEvent(' '));
      expect(onSpace).toHaveBeenCalledTimes(1);
    });

    it('calls onEscape when Escape is pressed', () => {
      const onEscape = jest.fn();
      const handler = getKeyboardHandler({ onEscape });
      handler(createKeyboardEvent('Escape'));
      expect(onEscape).toHaveBeenCalledTimes(1);
    });

    it('calls onArrowUp when ArrowUp is pressed', () => {
      const onArrowUp = jest.fn();
      const handler = getKeyboardHandler({ onArrowUp });
      handler(createKeyboardEvent('ArrowUp'));
      expect(onArrowUp).toHaveBeenCalledTimes(1);
    });

    it('calls onArrowDown when ArrowDown is pressed', () => {
      const onArrowDown = jest.fn();
      const handler = getKeyboardHandler({ onArrowDown });
      handler(createKeyboardEvent('ArrowDown'));
      expect(onArrowDown).toHaveBeenCalledTimes(1);
    });

    it('calls onArrowLeft when ArrowLeft is pressed', () => {
      const onArrowLeft = jest.fn();
      const handler = getKeyboardHandler({ onArrowLeft });
      handler(createKeyboardEvent('ArrowLeft'));
      expect(onArrowLeft).toHaveBeenCalledTimes(1);
    });

    it('calls onArrowRight when ArrowRight is pressed', () => {
      const onArrowRight = jest.fn();
      const handler = getKeyboardHandler({ onArrowRight });
      handler(createKeyboardEvent('ArrowRight'));
      expect(onArrowRight).toHaveBeenCalledTimes(1);
    });

    it('calls onTab when Tab is pressed without shift', () => {
      const onTab = jest.fn();
      const handler = getKeyboardHandler({ onTab });
      handler(createKeyboardEvent('Tab'));
      expect(onTab).toHaveBeenCalledTimes(1);
    });

    it('calls onShiftTab when Tab is pressed with shift', () => {
      const onShiftTab = jest.fn();
      const handler = getKeyboardHandler({ onShiftTab });
      handler(createKeyboardEvent('Tab', { shiftKey: true }));
      expect(onShiftTab).toHaveBeenCalledTimes(1);
    });

    it('does not call onTab when shift is held', () => {
      const onTab = jest.fn();
      const handler = getKeyboardHandler({ onTab });
      handler(createKeyboardEvent('Tab', { shiftKey: true }));
      expect(onTab).not.toHaveBeenCalled();
    });

    it('prevents default for Enter', () => {
      const handler = getKeyboardHandler({ onEnter: jest.fn() });
      const event = createKeyboardEvent('Enter');
      handler(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('prevents default for Space', () => {
      const handler = getKeyboardHandler({ onSpace: jest.fn() });
      const event = createKeyboardEvent(' ');
      handler(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('prevents default for arrow keys', () => {
      const handler = getKeyboardHandler({ onArrowUp: jest.fn() });
      const event = createKeyboardEvent('ArrowUp');
      handler(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('does not prevent default for Escape', () => {
      const handler = getKeyboardHandler({ onEscape: jest.fn() });
      const event = createKeyboardEvent('Escape');
      handler(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('does not prevent default for Tab', () => {
      const handler = getKeyboardHandler({ onTab: jest.fn() });
      const event = createKeyboardEvent('Tab');
      handler(event);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('does nothing for unhandled keys', () => {
      const handler = getKeyboardHandler({
        onEnter: jest.fn(),
        onEscape: jest.fn(),
        onTab: jest.fn(),
      });
      expect(() => handler(createKeyboardEvent('a'))).not.toThrow();
    });

    it('does not throw when no callbacks are provided', () => {
      const handler = getKeyboardHandler({});
      expect(() => handler(createKeyboardEvent('Enter'))).not.toThrow();
      expect(() => handler(createKeyboardEvent('Escape'))).not.toThrow();
    });
  });

  // trapFocus
  describe('trapFocus', () => {
    let container: HTMLElement;
    let first: HTMLElement;
    let last: HTMLElement;

    beforeEach(() => {
      container = document.createElement('div');
      first = document.createElement('button');
      first.textContent = 'First';
      last = document.createElement('button');
      last.textContent = 'Last';
      container.appendChild(first);
      container.appendChild(last);
      document.body.appendChild(container);
    });

    afterEach(() => {
      container.remove();
    });

    const dispatchKey = (key: string, shiftKey = false): void => {
      container.dispatchEvent(new KeyboardEvent('keydown', { key, shiftKey, bubbles: true }));
    };

    it('focuses the first focusable element on activation', () => {
      trapFocus(container);
      expect(document.activeElement).toBe(first);
    });

    it('moves focus to the first element when Tab is pressed on the last element', () => {
      trapFocus(container);
      last.focus();
      dispatchKey('Tab');
      expect(document.activeElement).toBe(first);
    });

    it('moves focus to the last element when Shift+Tab is pressed on the first element', () => {
      trapFocus(container);
      first.focus();
      dispatchKey('Tab', true);
      expect(document.activeElement).toBe(last);
    });

    it('calls onEscape when Escape is pressed', () => {
      const onEscape = jest.fn();
      trapFocus(container, onEscape);
      dispatchKey('Escape');
      expect(onEscape).toHaveBeenCalledTimes(1);
    });

    it('does not call onEscape for other keys', () => {
      const onEscape = jest.fn();
      trapFocus(container, onEscape);
      dispatchKey('Enter');
      expect(onEscape).not.toHaveBeenCalled();
    });

    it('returns a cleanup function that removes the keydown listener', () => {
      const removeSpy = jest.spyOn(container, 'removeEventListener');
      const cleanup = trapFocus(container);
      cleanup();
      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });

    it('stops handling keys after cleanup', () => {
      const onEscape = jest.fn();
      const cleanup = trapFocus(container, onEscape);
      cleanup();
      dispatchKey('Escape');
      expect(onEscape).not.toHaveBeenCalled();
    });

    it('handles a container without focusable elements', () => {
      const empty = document.createElement('div');
      document.body.appendChild(empty);
      expect(() => trapFocus(empty)).not.toThrow();
      empty.remove();
    });
  });

  // announceToScreenReader
  describe('announceToScreenReader', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      document.getElementById('morphui-live-region')?.remove();
      jest.useRealTimers();
    });

    it('creates a live region in the document body', () => {
      announceToScreenReader('Saved successfully');
      const region = document.getElementById('morphui-live-region');
      expect(region).not.toBeNull();
      expect(document.body.contains(region)).toBe(true);
    });

    it('sets the announced message as the region text', () => {
      announceToScreenReader('Form submitted successfully');
      const region = document.getElementById('morphui-live-region');
      expect(region?.textContent).toBe('Form submitted successfully');
    });

    it('creates a polite live region by default', () => {
      announceToScreenReader('message');
      const region = document.getElementById('morphui-live-region');
      expect(region?.getAttribute('aria-live')).toBe('polite');
    });

    it('creates an assertive live region when requested', () => {
      announceToScreenReader('Critical error', 'assertive');
      const region = document.getElementById('morphui-live-region');
      expect(region?.getAttribute('aria-live')).toBe('assertive');
    });

    it('marks the region as atomic', () => {
      announceToScreenReader('message');
      const region = document.getElementById('morphui-live-region');
      expect(region?.getAttribute('aria-atomic')).toBe('true');
    });

    it('hides the live region visually', () => {
      announceToScreenReader('message');
      const region = document.getElementById('morphui-live-region') as HTMLElement;
      expect(region.style.position).toBe('absolute');
      expect(region.style.left).toBe('-10000px');
    });

    it('reuses the existing live region for subsequent announcements', () => {
      announceToScreenReader('first');
      announceToScreenReader('second');
      const regions = document.querySelectorAll('#morphui-live-region');
      expect(regions).toHaveLength(1);
      expect(regions[0].textContent).toBe('second');
    });

    it('clears the message after one second', () => {
      announceToScreenReader('temporary');
      jest.advanceTimersByTime(1000);
      const region = document.getElementById('morphui-live-region');
      expect(region?.textContent).toBe('');
    });

    it('keeps the message before the clear delay', () => {
      announceToScreenReader('temporary');
      jest.advanceTimersByTime(999);
      const region = document.getElementById('morphui-live-region');
      expect(region?.textContent).toBe('temporary');
    });
  });

  // isScreenReaderVisible
  describe('isScreenReaderVisible', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('div');
      document.body.appendChild(element);
    });

    afterEach(() => {
      element.remove();
    });

    const mockDimensions = (el: HTMLElement, width = 100, height = 100): void => {
      Object.defineProperty(el, 'offsetWidth', { value: width, configurable: true });
      Object.defineProperty(el, 'offsetHeight', { value: height, configurable: true });
    };

    it('returns true for a visible element', () => {
      mockDimensions(element);
      expect(isScreenReaderVisible(element)).toBe(true);
    });

    it('returns false when display is none', () => {
      mockDimensions(element);
      element.style.display = 'none';
      expect(isScreenReaderVisible(element)).toBe(false);
    });

    it('returns false when visibility is hidden', () => {
      mockDimensions(element);
      element.style.visibility = 'hidden';
      expect(isScreenReaderVisible(element)).toBe(false);
    });

    it('returns false when opacity is 0', () => {
      mockDimensions(element);
      element.style.opacity = '0';
      expect(isScreenReaderVisible(element)).toBe(false);
    });

    it('returns false when the element has no width', () => {
      mockDimensions(element, 0, 100);
      expect(isScreenReaderVisible(element)).toBe(false);
    });

    it('returns false when the element has no height', () => {
      mockDimensions(element, 100, 0);
      expect(isScreenReaderVisible(element)).toBe(false);
    });
  });

  // addFocusIndicator
  describe('addFocusIndicator', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('button');
      document.body.appendChild(element);
    });

    afterEach(() => {
      element.remove();
    });

    it('adds an outline on focus by default', () => {
      addFocusIndicator(element);
      element.dispatchEvent(new Event('focus'));
      expect(element.style.outline).toBe('2px solid #0070f3');
    });

    it('adds an outline offset on focus', () => {
      addFocusIndicator(element);
      element.dispatchEvent(new Event('focus'));
      expect(element.style.outlineOffset).toBe('2px');
    });

    it('uses a custom color and width', () => {
      addFocusIndicator(element, { color: '#ff0000', width: '3px' });
      element.dispatchEvent(new Event('focus'));
      expect(element.style.outline).toBe('3px solid #ff0000');
    });

    it('uses a box shadow when the box-shadow style is requested', () => {
      addFocusIndicator(element, { style: 'box-shadow' });
      element.dispatchEvent(new Event('focus'));
      expect(element.style.boxShadow).toBe('0 0 0 2px #0070f3');
    });

    it('restores the original outline on blur', () => {
      addFocusIndicator(element);
      element.dispatchEvent(new Event('focus'));
      element.dispatchEvent(new Event('blur'));
      expect(element.style.outline).toBe('');
    });

    it('preserves a pre-existing outline on blur', () => {
      element.style.outline = '1px solid red';
      addFocusIndicator(element);
      element.dispatchEvent(new Event('focus'));
      expect(element.style.outline).toBe('2px solid #0070f3');
      element.dispatchEvent(new Event('blur'));
      expect(element.style.outline).toBe('1px solid red');
    });

    it('returns a cleanup function that removes the listeners', () => {
      const removeSpy = jest.spyOn(element, 'removeEventListener');
      const cleanup = addFocusIndicator(element);
      cleanup();
      expect(removeSpy).toHaveBeenCalledWith('focus', expect.any(Function));
      expect(removeSpy).toHaveBeenCalledWith('blur', expect.any(Function));
    });

    it('stops reacting to focus after cleanup', () => {
      const cleanup = addFocusIndicator(element);
      cleanup();
      element.dispatchEvent(new Event('focus'));
      expect(element.style.outline).toBe('');
    });
  });

  // validateAriaAttributes
  describe('validateAriaAttributes', () => {
    let element: HTMLElement;

    beforeEach(() => {
      element = document.createElement('button');
      document.body.appendChild(element);
    });

    afterEach(() => {
      element.remove();
    });

    it('returns no issues for a clean element', () => {
      expect(validateAriaAttributes(element)).toEqual([]);
    });

    it('flags having both aria-label and aria-labelledby', () => {
      element.setAttribute('aria-label', 'Close');
      element.setAttribute('aria-labelledby', 'label-id');
      const issues = validateAriaAttributes(element);
      expect(issues).toHaveLength(1);
      expect(issues[0]).toContain('aria-label and aria-labelledby');
    });

    it('allows aria-label alone', () => {
      element.setAttribute('aria-label', 'Close');
      expect(validateAriaAttributes(element)).toEqual([]);
    });

    it('flags an invalid aria-expanded value', () => {
      element.setAttribute('aria-expanded', 'maybe');
      const issues = validateAriaAttributes(element);
      expect(issues).toHaveLength(1);
      expect(issues[0]).toContain('aria-expanded');
    });

    it('accepts aria-expanded true and false', () => {
      element.setAttribute('aria-expanded', 'true');
      expect(validateAriaAttributes(element)).toEqual([]);
      element.setAttribute('aria-expanded', 'false');
      expect(validateAriaAttributes(element)).toEqual([]);
    });

    it('flags an invalid aria-pressed value', () => {
      element.setAttribute('aria-pressed', 'nope');
      const issues = validateAriaAttributes(element);
      expect(issues).toHaveLength(1);
      expect(issues[0]).toContain('aria-pressed');
    });

    it('accepts aria-pressed mixed', () => {
      element.setAttribute('aria-pressed', 'mixed');
      expect(validateAriaAttributes(element)).toEqual([]);
    });

    it('flags aria-required without the required attribute', () => {
      element.setAttribute('aria-required', 'true');
      const issues = validateAriaAttributes(element);
      expect(issues).toHaveLength(1);
      expect(issues[0]).toContain('aria-required');
    });

    it('accepts aria-required together with required', () => {
      element.setAttribute('aria-required', 'true');
      element.setAttribute('required', '');
      expect(validateAriaAttributes(element)).toEqual([]);
    });

    it('collects multiple issues at once', () => {
      element.setAttribute('aria-label', 'Close');
      element.setAttribute('aria-labelledby', 'label-id');
      element.setAttribute('aria-expanded', 'maybe');
      const issues = validateAriaAttributes(element);
      expect(issues).toHaveLength(2);
    });
  });
});
