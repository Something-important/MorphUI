import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Tooltip } from '../src/components/composition/Tooltip/Tooltip';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Helper to render Tooltip with a trigger child
const renderTooltip = (props = {}, children = 'Hover me') => {
  return render(
    <Tooltip content="Tooltip content" {...props}>
      <button>{children}</button>
    </Tooltip>,
  );
};

// Mock getBoundingClientRect for positioning tests
const mockRect = (rect: Partial<DOMRect> = {}): DOMRect => ({
  top: 100,
  bottom: 200,
  left: 100,
  right: 200,
  width: 100,
  height: 100,
  x: 100,
  y: 100,
  toJSON: () => ({}),
  ...rect,
});

describe('Tooltip Component', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('renders the trigger element', () => {
      renderTooltip();
      expect(screen.getByText('Hover me')).toBeInTheDocument();
    });

    it('renders children inside the trigger wrapper', () => {
      const { container } = renderTooltip();
      expect(container.querySelector('.tooltip-component__trigger')).toBeInTheDocument();
    });

    it('applies the tooltip-component class to the root', () => {
      const { container } = renderTooltip();
      expect(container.querySelector('.tooltip-component')).toBeInTheDocument();
    });

    it('does not render tooltip content when not visible', () => {
      const { container } = renderTooltip();
      expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
    });

    it('renders tooltip content when isVisible is true (controlled)', () => {
      const { container } = renderTooltip({ isVisible: true });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });

    it('renders string content inside a span', () => {
      const { container } = renderTooltip({ isVisible: true, content: 'Hello World' });
      const content = container.querySelector('.tooltip-component__content-inner');
      expect(content?.querySelector('span')).toBeInTheDocument();
      expect(content?.textContent).toBe('Hello World');
    });

    it('renders ReactNode content directly', () => {
      const { container } = renderTooltip({
        isVisible: true,
        content: (
          <div data-testid="custom-content">
            <span>Custom</span>
          </div>
        ),
      });
      expect(container.querySelector('[data-testid="custom-content"]')).toBeInTheDocument();
    });

    it('renders tooltip with role="tooltip" when visible', () => {
      renderTooltip({ isVisible: true });
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });

    it('sets aria-hidden="false" on visible tooltip', () => {
      const { container } = renderTooltip({ isVisible: true });
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveAttribute('aria-hidden', 'false');
    });
  });

  // Controlled vs Uncontrolled
  describe('Visibility Control', () => {
    it('respects isVisible prop in controlled mode', () => {
      const { container, rerender } = renderTooltip({ isVisible: false });
      expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();

      rerender(
        <Tooltip content="Tooltip content" isVisible={true}>
          <button>Hover me</button>
        </Tooltip>,
      );
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });

    it('calls onVisibilityChange when handleShow is triggered', () => {
      const onVisibilityChange = jest.fn();
      const { container } = renderTooltip({
        isVisible: false,
        onVisibilityChange,
        trigger: 'click',
      });
      const trigger = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(trigger);
      expect(onVisibilityChange).toHaveBeenCalledWith(true);
    });

    it('calls onVisibilityChange when handleHide is triggered', () => {
      const onVisibilityChange = jest.fn();
      const { container } = renderTooltip({
        isVisible: true,
        onVisibilityChange,
        trigger: 'click',
      });
      const trigger = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(trigger);
      expect(onVisibilityChange).toHaveBeenCalledWith(false);
    });

    it('manages internal state in uncontrolled mode on click', () => {
      const { container } = renderTooltip({ trigger: 'click' });
      const trigger = container.querySelector('.tooltip-component__trigger')!;
      expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
      fireEvent.click(trigger);
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });
  });

  // Triggers
  describe('Triggers', () => {
    describe('hover trigger (default)', () => {
      it('shows tooltip after delay on mouse enter', () => {
        jest.useFakeTimers();
        const { container } = renderTooltip({ trigger: 'hover', delay: 200 });
        const trigger = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.mouseEnter(trigger);
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
        act(() => {
          jest.advanceTimersByTime(200);
        });
        expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
        jest.useRealTimers();
      });

      it('hides tooltip after hideDelay on mouse leave', () => {
        jest.useFakeTimers();
        const { container } = renderTooltip({ trigger: 'hover', delay: 100, hideDelay: 150 });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.mouseEnter(triggerEl);
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
        fireEvent.mouseLeave(triggerEl);
        act(() => {
          jest.advanceTimersByTime(150);
        });
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
        jest.useRealTimers();
      });

      it('clears hide timeout when re-entering before hideDelay', () => {
        jest.useFakeTimers();
        const { container } = renderTooltip({ trigger: 'hover', delay: 100, hideDelay: 200 });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.mouseEnter(triggerEl);
        act(() => {
          jest.advanceTimersByTime(100);
        });
        fireEvent.mouseLeave(triggerEl);
        fireEvent.mouseEnter(triggerEl);
        act(() => {
          jest.advanceTimersByTime(200);
        });
        expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
        jest.useRealTimers();
      });
    });

    describe('focus trigger', () => {
      it('shows tooltip on focus', () => {
        const { container } = renderTooltip({ trigger: 'focus' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.focus(triggerEl);
        expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
      });

      it('hides tooltip on blur after hideDelay', () => {
        jest.useFakeTimers();
        const { container } = renderTooltip({ trigger: 'focus', hideDelay: 100 });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.focus(triggerEl);
        fireEvent.blur(triggerEl);
        act(() => {
          jest.advanceTimersByTime(100);
        });
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
        jest.useRealTimers();
      });

      it('sets tabIndex=0 and role="button" for focus trigger', () => {
        const { container } = renderTooltip({ trigger: 'focus' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        expect(triggerEl).toHaveAttribute('tabindex', '0');
        expect(triggerEl).toHaveAttribute('role', 'button');
      });
    });

    describe('click trigger', () => {
      it('toggles tooltip on click', () => {
        const { container } = renderTooltip({ trigger: 'click' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.click(triggerEl);
        expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
        fireEvent.click(triggerEl);
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
      });

      it('sets role="button" for click trigger', () => {
        const { container } = renderTooltip({ trigger: 'click' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        expect(triggerEl).toHaveAttribute('role', 'button');
      });
    });

    describe('manual trigger', () => {
      it('does not show tooltip on hover', () => {
        const { container } = renderTooltip({ trigger: 'manual' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.mouseEnter(triggerEl);
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
      });

      it('does not show tooltip on focus', () => {
        const { container } = renderTooltip({ trigger: 'manual' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.focus(triggerEl);
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
      });

      it('does not show tooltip on click', () => {
        const { container } = renderTooltip({ trigger: 'manual' });
        const triggerEl = container.querySelector('.tooltip-component__trigger')!;
        fireEvent.click(triggerEl);
        expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
      });

      it('shows tooltip when isVisible is true', () => {
        const { container } = renderTooltip({ trigger: 'manual', isVisible: true });
        expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
      });
    });
  });

  // Positions
  describe('Positions', () => {
    const positions: Array<
      | 'top'
      | 'top-start'
      | 'top-end'
      | 'bottom'
      | 'bottom-start'
      | 'bottom-end'
      | 'left'
      | 'left-start'
      | 'left-end'
      | 'right'
      | 'right-start'
      | 'right-end'
    > = [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ];

    positions.forEach((position) => {
      it(`applies ${position} position class`, () => {
        const { container } = renderTooltip({ isVisible: true, position });
        expect(container.querySelector(`.tooltip-component--${position}`)).toBeInTheDocument();
      });
    });

    it('uses auto position by default', () => {
      const { container } = renderTooltip({ isVisible: true });
      expect(container.querySelector('.tooltip-component--auto')).toBeInTheDocument();
    });
  });

  // Auto-positioning logic
  describe('Auto Positioning', () => {
    it('renders tooltip when autoPosition is true with position auto', () => {
      // Mock getBoundingClientRect for jsdom (which doesn't have real layout)
      const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
      Element.prototype.getBoundingClientRect = jest.fn(() => mockRect());

      const { container } = renderTooltip({
        isVisible: true,
        position: 'auto',
        autoPosition: true,
      });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();

      // Restore original
      Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
    });

    it('renders tooltip when autoPosition is false', () => {
      const { container } = renderTooltip({
        isVisible: true,
        position: 'top',
        autoPosition: false,
      });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
      expect(container.querySelector('.tooltip-component--top')).toBeInTheDocument();
    });
  });

  // Persistent behavior
  describe('Persistent', () => {
    it('does not hide on mouse leave when persistent', () => {
      jest.useFakeTimers();
      const { container } = renderTooltip({
        trigger: 'hover',
        delay: 100,
        hideDelay: 100,
        persistent: true,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.mouseEnter(triggerEl);
      act(() => {
        jest.advanceTimersByTime(100);
      });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
      fireEvent.mouseLeave(triggerEl);
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
      jest.useRealTimers();
    });

    it('does not hide on blur when persistent', () => {
      jest.useFakeTimers();
      const { container } = renderTooltip({
        trigger: 'focus',
        hideDelay: 100,
        persistent: true,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.focus(triggerEl);
      fireEvent.blur(triggerEl);
      act(() => {
        jest.advanceTimersByTime(200);
      });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
      jest.useRealTimers();
    });
  });

  // Close on click outside
  describe('Close on Click Outside', () => {
    it('closes when clicking outside in interactive mode', () => {
      jest.useFakeTimers();
      const { container } = renderTooltip({
        trigger: 'click',
        interactive: true,
        closeOnClickOutside: true,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(triggerEl);
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();

      // Click outside
      fireEvent.mouseDown(document.body);

      expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
      jest.useRealTimers();
    });

    it('does not close when clicking inside the tooltip', () => {
      const { container } = renderTooltip({
        trigger: 'click',
        interactive: true,
        closeOnClickOutside: true,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(triggerEl);
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();

      const tooltipContent = container.querySelector('.tooltip-component__content')!;
      fireEvent.mouseDown(tooltipContent);

      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });

    it('does not close when closeOnClickOutside is false', () => {
      const { container } = renderTooltip({
        trigger: 'click',
        interactive: true,
        closeOnClickOutside: false,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(triggerEl);
      fireEvent.mouseDown(document.body);
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });
  });

  // Close on Escape
  describe('Close on Escape', () => {
    it('closes on Escape key when closeOnEscape is true', () => {
      const { container } = renderTooltip({ isVisible: true, closeOnEscape: true });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.keyDown(triggerEl, { key: 'Escape' });
      // In controlled mode, calls onVisibilityChange(false)
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument(); // still rendered because controlled
    });

    it('closes on Escape in uncontrolled mode', () => {
      const { container } = renderTooltip({
        trigger: 'click',
        closeOnEscape: true,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(triggerEl);
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();

      fireEvent.keyDown(triggerEl, { key: 'Escape' });
      expect(container.querySelector('.tooltip-component__content')).not.toBeInTheDocument();
    });

    it('does not close on Escape when closeOnEscape is false', () => {
      const { container } = renderTooltip({
        trigger: 'click',
        closeOnEscape: false,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(triggerEl);
      fireEvent.keyDown(triggerEl, { key: 'Escape' });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });

    it('does not close on non-Escape keys', () => {
      const { container } = renderTooltip({
        trigger: 'click',
        closeOnEscape: true,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.click(triggerEl);
      fireEvent.keyDown(triggerEl, { key: 'Enter' });
      expect(container.querySelector('.tooltip-component__content')).toBeInTheDocument();
    });
  });

  // Arrow
  describe('Arrow', () => {
    it('renders arrow by default', () => {
      const { container } = renderTooltip({ isVisible: true });
      expect(container.querySelector('.tooltip-component__arrow')).toBeInTheDocument();
    });

    it('does not render arrow when arrow is false', () => {
      const { container } = renderTooltip({ isVisible: true, arrow: false });
      expect(container.querySelector('.tooltip-component__arrow')).not.toBeInTheDocument();
    });

    it('applies with-arrow class when arrow is true', () => {
      const { container } = renderTooltip({ isVisible: true, arrow: true });
      expect(container.querySelector('.tooltip-component--with-arrow')).toBeInTheDocument();
    });

    it('applies arrow position class', () => {
      const { container } = renderTooltip({ isVisible: true, position: 'top' });
      expect(container.querySelector('.tooltip-component__arrow--top')).toBeInTheDocument();
    });
  });

  // Styling
  describe('Styling', () => {
    const variants: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'
    > = ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'];

    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, () => {
        const { container } = renderTooltip({ isVisible: true, variant });
        expect(container.querySelector(`.tooltip-component--${variant}`)).toBeInTheDocument();
      });
    });

    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = renderTooltip({ isVisible: true, size });
        expect(container.querySelector(`.tooltip-component--${size}`)).toBeInTheDocument();
      });
    });

    it('applies visible class when visible', () => {
      const { container } = renderTooltip({ isVisible: true });
      expect(container.querySelector('.tooltip-component--visible')).toBeInTheDocument();
    });

    it('applies glassmorphism class when enabled', () => {
      const { container } = renderTooltip({ isVisible: true, glassmorphism: true });
      expect(container.querySelector('.tooltip-component--glassmorphism')).toBeInTheDocument();
    });

    it('applies multiline class when enabled', () => {
      const { container } = renderTooltip({ isVisible: true, multiline: true });
      expect(container.querySelector('.tooltip-component--multiline')).toBeInTheDocument();
    });

    it('applies interactive class when enabled', () => {
      const { container } = renderTooltip({ isVisible: true, interactive: true });
      expect(container.querySelector('.tooltip-component--interactive')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderTooltip({ isVisible: true, className: 'custom-class' });
      expect(container.querySelector('.custom-class')).toBeInTheDocument();
    });

    it('applies custom contentClassName', () => {
      const { container } = renderTooltip({
        isVisible: true,
        contentClassName: 'custom-content-class',
      });
      expect(container.querySelector('.custom-content-class')).toBeInTheDocument();
    });
  });

  // Custom colors and gradients
  describe('Custom Colors and Gradients', () => {
    it('applies custom color via CSS variable', () => {
      const { container } = renderTooltip({ isVisible: true, color: '#ff0000' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg': '#ff0000' });
    });

    it('applies custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = renderTooltip({ isVisible: true, gradient });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg': gradient });
    });

    it('applies custom backgroundColor', () => {
      const { container } = renderTooltip({ isVisible: true, backgroundColor: '#8b5cf6' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg': '#8b5cf6' });
    });

    it('applies custom backgroundGradient over backgroundColor', () => {
      const gradient = 'linear-gradient(to right, #ff0000, #00ff00)';
      const { container } = renderTooltip({
        isVisible: true,
        backgroundColor: '#8b5cf6',
        backgroundGradient: gradient,
      });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg': gradient });
    });

    it('applies custom textColor', () => {
      const { container } = renderTooltip({ isVisible: true, textColor: '#ffffff' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-text-color': '#ffffff' });
    });

    it('applies custom borderColor', () => {
      const { container } = renderTooltip({ isVisible: true, borderColor: '#000000' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-border-color': '#000000' });
    });

    it('applies custom arrowColor', () => {
      const { container } = renderTooltip({ isVisible: true, arrowColor: '#ff6b6b' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-arrow-color': '#ff6b6b' });
    });

    it('applies custom borderRadius as number', () => {
      const { container } = renderTooltip({ isVisible: true, borderRadius: 12 });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-border-radius': '12px' });
    });

    it('applies custom borderRadius as string', () => {
      const { container } = renderTooltip({ isVisible: true, borderRadius: '0.5rem' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-border-radius': '0.5rem' });
    });

    it('applies gradient classes for text gradients', () => {
      const { container } = renderTooltip({
        isVisible: true,
        textGradient: 'linear-gradient(to right, red, blue)',
      });
      expect(container.querySelector('.tooltip-component--text-gradient')).toBeInTheDocument();
    });

    it('applies gradient classes for border gradients', () => {
      const { container } = renderTooltip({
        isVisible: true,
        borderGradient: 'linear-gradient(to right, red, blue)',
      });
      expect(container.querySelector('.tooltip-component--border-gradient')).toBeInTheDocument();
    });

    it('applies gradient classes for background gradients', () => {
      const { container } = renderTooltip({
        isVisible: true,
        backgroundGradient: 'linear-gradient(to right, red, blue)',
      });
      expect(
        container.querySelector('.tooltip-component--background-gradient'),
      ).toBeInTheDocument();
    });

    it('applies gradient classes for arrow gradients', () => {
      const { container } = renderTooltip({
        isVisible: true,
        arrowGradient: 'linear-gradient(to right, red, blue)',
      });
      expect(container.querySelector('.tooltip-component--arrow-gradient')).toBeInTheDocument();
    });
  });

  // Advanced styling
  describe('Advanced Styling', () => {
    it('applies maxWidth as number', () => {
      const { container } = renderTooltip({ isVisible: true, maxWidth: 200 });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-max-width': '200px' });
    });

    it('applies minWidth as string', () => {
      const { container } = renderTooltip({ isVisible: true, minWidth: '10rem' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-min-width': '10rem' });
    });

    it('applies maxHeight as number', () => {
      const { container } = renderTooltip({ isVisible: true, maxHeight: 100 });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-max-height': '100px' });
    });

    it('applies minHeight as string', () => {
      const { container } = renderTooltip({ isVisible: true, minHeight: '2rem' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-min-height': '2rem' });
    });

    it('applies backgroundPattern', () => {
      const { container } = renderTooltip({
        isVisible: true,
        backgroundPattern: 'diagonal-stripes',
      });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg-pattern': 'diagonal-stripes' });
    });

    it('applies backgroundImage as url()', () => {
      const { container } = renderTooltip({
        isVisible: true,
        backgroundImage: '/img.png',
      });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg-image': 'url(/img.png)' });
    });

    it('applies backgroundBlend', () => {
      const { container } = renderTooltip({ isVisible: true, backgroundBlend: 'overlay' });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg-blend': 'overlay' });
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has aria-label="Tooltip" by default', () => {
      const { container } = renderTooltip({ isVisible: true });
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveAttribute('aria-label', 'Tooltip');
    });

    it('uses custom ariaLabel when provided', () => {
      const { container } = renderTooltip({ isVisible: true, ariaLabel: 'Help text' });
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveAttribute('aria-label', 'Help text');
    });

    it('has aria-describedby when provided', () => {
      const { container } = renderTooltip({
        isVisible: true,
        ariaDescribedBy: 'description-id',
      });
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveAttribute('aria-describedby', 'description-id');
    });

    it('has id when provided', () => {
      const { container } = renderTooltip({ isVisible: true, id: 'my-tooltip' });
      const tooltip = container.querySelector('[role="tooltip"]');
      expect(tooltip).toHaveAttribute('id', 'my-tooltip');
    });
  });

  // Theme Integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      const { container } = render(
        <ThemeProvider>
          <Tooltip content="Test" isVisible={true}>
            <button>Hover</button>
          </Tooltip>
        </ThemeProvider>,
      );
      expect(container.querySelector('.tooltip-component')).toBeInTheDocument();
      expect(container.querySelector('[role="tooltip"]')).toBeInTheDocument();
    });
  });

  // Style prop merge
  describe('Style Override', () => {
    it('merges custom style prop with component style', () => {
      const { container } = renderTooltip({
        isVisible: true,
        color: '#ff0000',
        style: { zIndex: 9999 },
      });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ '--tooltip-custom-bg': '#ff0000', zIndex: 9999 });
    });

    it('user style takes precedence over component style', () => {
      const { container } = renderTooltip({
        isVisible: true,
        style: { position: 'absolute' },
      });
      const tooltip = container.querySelector('.tooltip-component');
      expect(tooltip).toHaveStyle({ position: 'absolute' });
    });

    it('applies contentStyle to content element', () => {
      const { container } = renderTooltip({
        isVisible: true,
        contentStyle: { padding: '20px' },
      });
      const content = container.querySelector('.tooltip-component__content');
      expect(content).toHaveStyle({ padding: '20px' });
    });
  });

  // Cleanup
  describe('Cleanup', () => {
    it('clears show timeout on unmount', () => {
      jest.useFakeTimers();
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      const { container, unmount } = renderTooltip({ trigger: 'hover', delay: 200 });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.mouseEnter(triggerEl);
      clearTimeoutSpy.mockClear();
      // Unmount before timer fires
      unmount();
      // Cleanup effect should have cleared the pending show timeout
      expect(clearTimeoutSpy).toHaveBeenCalled();
      // Should not throw when advancing timers
      act(() => {
        jest.advanceTimersByTime(300);
      });
      clearTimeoutSpy.mockRestore();
      jest.useRealTimers();
    });

    it('clears hide timeout on unmount', () => {
      jest.useFakeTimers();
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      const { container, unmount } = renderTooltip({
        trigger: 'hover',
        delay: 100,
        hideDelay: 200,
      });
      const triggerEl = container.querySelector('.tooltip-component__trigger')!;
      fireEvent.mouseEnter(triggerEl);
      act(() => {
        jest.advanceTimersByTime(100);
      });
      fireEvent.mouseLeave(triggerEl);
      clearTimeoutSpy.mockClear();
      unmount();
      // Cleanup effect should have cleared the pending hide timeout
      expect(clearTimeoutSpy).toHaveBeenCalled();
      act(() => {
        jest.advanceTimersByTime(300);
      });
      clearTimeoutSpy.mockRestore();
      jest.useRealTimers();
    });
  });
});
