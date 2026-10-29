import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../src/components/basic/Switch/Switch';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderSwitch = (props = {}) => {
  return render(<Switch {...props} />);
};

describe('Switch Component', () => {
  // Basic Rendering
  describe('Basic Rendering', () => {
    it('renders the switch component', () => {
      const { container } = renderSwitch();
      expect(container.querySelector('.switch-component')).toBeInTheDocument();
    });

    it('renders the input element', () => {
      const { container } = renderSwitch();
      expect(container.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    });

    it('renders the switch visual elements (track and thumb)', () => {
      const { container } = renderSwitch();
      expect(container.querySelector('.switch-component__switch')).toBeInTheDocument();
      expect(container.querySelector('.switch-component__track')).toBeInTheDocument();
      expect(container.querySelector('.switch-component__thumb')).toBeInTheDocument();
    });

    it('renders label wrapper', () => {
      const { container } = renderSwitch();
      expect(container.querySelector('.switch-component__label')).toBeInTheDocument();
    });

    it('does not render label text when not provided', () => {
      const { container } = renderSwitch();
      expect(container.querySelector('.switch-component__label-text')).not.toBeInTheDocument();
    });

    it('renders label text when provided', () => {
      renderSwitch({ label: 'Enable feature' });
      expect(screen.getByText('Enable feature')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      renderSwitch({ description: 'This controls the feature' });
      expect(screen.getByText('This controls the feature')).toBeInTheDocument();
    });
  });

  // Controlled vs Uncontrolled
  describe('Visibility Control', () => {
    it('respects checked prop in controlled mode', () => {
      const { container } = renderSwitch({ checked: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('calls onChange when switch is toggled via input', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.click(input);
      // Clicking a controlled checkbox fires a change event
      // The component calls onChange with the new checked value
      expect(onChange).toHaveBeenCalled();
    });

    it('manages internal state in uncontrolled mode', () => {
      const { container } = renderSwitch({ defaultChecked: false });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(false);
      fireEvent.change(input, { target: { checked: true } });
      expect(input.checked).toBe(true);
    });

    it('uses defaultChecked in uncontrolled mode', () => {
      const { container } = renderSwitch({ defaultChecked: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input.checked).toBe(true);
    });

    it('does not call onChange when disabled', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, disabled: true });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { checked: true } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when loading', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, loading: true });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { checked: true } });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when readOnly', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, readOnly: true });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.change(input, { target: { checked: true } });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // States
  describe('States', () => {
    it('applies checked class when checked', () => {
      const { container } = renderSwitch({ checked: true });
      expect(container.querySelector('.switch-component--checked')).toBeInTheDocument();
    });

    it('applies disabled class when disabled', () => {
      const { container } = renderSwitch({ disabled: true });
      expect(container.querySelector('.switch-component--disabled')).toBeInTheDocument();
    });

    it('applies loading class when loading', () => {
      const { container } = renderSwitch({ loading: true });
      expect(container.querySelector('.switch-component--loading')).toBeInTheDocument();
    });

    it('renders loading spinner when loading', () => {
      const { container } = renderSwitch({ loading: true });
      expect(container.querySelector('.switch-component__loading-spinner')).toBeInTheDocument();
      expect(container.querySelector('.switch-component__spinner')).toBeInTheDocument();
    });

    it('disables input when disabled', () => {
      const { container } = renderSwitch({ disabled: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('disables input when loading', () => {
      const { container } = renderSwitch({ loading: true });
      const input = container.querySelector('input') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('applies readonly class when readOnly', () => {
      const { container } = renderSwitch({ readOnly: true });
      expect(container.querySelector('.switch-component--readonly')).toBeInTheDocument();
    });

    it('applies invalid class when invalid', () => {
      const { container } = renderSwitch({ invalid: true });
      expect(container.querySelector('.switch-component--invalid')).toBeInTheDocument();
    });

    it('sets aria-invalid when invalid', () => {
      const { container } = renderSwitch({ invalid: true });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  // Variants
  describe('Variants', () => {
    const variants: Array<
      'primary' | 'secondary' | 'success' | 'warning' | 'info' | 'danger' | 'ghost' | 'outline'
    > = ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'];

    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, () => {
        const { container } = renderSwitch({ variant });
        expect(container.querySelector(`.switch-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = renderSwitch({ size });
        expect(container.querySelector(`.switch-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Label Positions
  describe('Label Positions', () => {
    const positions: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'left',
      'right',
      'top',
      'bottom',
    ];

    positions.forEach((position) => {
      it(`applies label-${position} position class`, () => {
        const { container } = renderSwitch({ label: 'Test', labelPosition: position });
        expect(container.querySelector(`.switch-component--label-${position}`)).toBeInTheDocument();
      });
    });

    it('renders label on the left when labelPosition is left', () => {
      const { container } = renderSwitch({ label: 'Left Label', labelPosition: 'left' });
      const content = container.querySelector('.switch-component__content');
      expect(content).toBeInTheDocument();
      expect(content?.textContent).toBe('Left Label');
    });

    it('renders label on the right when labelPosition is right (default)', () => {
      const { container } = renderSwitch({ label: 'Right Label' });
      const content = container.querySelector('.switch-component__content');
      expect(content).toBeInTheDocument();
      expect(content?.textContent).toBe('Right Label');
    });
  });

  // Icons
  describe('Icons', () => {
    it('renders icon at left position by default', () => {
      const { container } = renderSwitch({
        icon: <span data-testid="test-icon">Icon</span>,
      });
      expect(container.querySelector('.switch-component__icon--left')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="test-icon"]')).toBeInTheDocument();
      expect(container.querySelector('.switch-component--icon-left')).toBeInTheDocument();
    });

    it('renders icon at right position', () => {
      const { container } = renderSwitch({
        icon: <span data-testid="test-icon">Icon</span>,
        iconPosition: 'right',
      });
      expect(container.querySelector('.switch-component__icon--right')).toBeInTheDocument();
      expect(container.querySelector('[data-testid="test-icon"]')).toBeInTheDocument();
      expect(container.querySelector('.switch-component--icon-right')).toBeInTheDocument();
    });

    it('applies with-icon class when icon provided', () => {
      const { container } = renderSwitch({
        icon: <span>Icon</span>,
      });
      expect(container.querySelector('.switch-component--with-icon')).toBeInTheDocument();
    });
  });

  // Custom Colors and Gradients
  describe('Custom Colors and Gradients', () => {
    it('applies custom color via CSS variable', () => {
      const { container } = renderSwitch({ color: '#ff0000' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-bg': '#ff0000', '--switch-bg': '#ff0000' });
    });

    it('applies custom gradient over color', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = renderSwitch({
        color: '#ff0000',
        gradient,
      });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-bg': gradient });
    });

    it('applies custom textColor', () => {
      const { container } = renderSwitch({ textColor: '#ffffff' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({
        '--switch-custom-text-color': '#ffffff',
        '--switch-color': '#ffffff',
      });
    });

    it('applies custom borderColor', () => {
      const { container } = renderSwitch({ borderColor: '#000000' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-border-color': '#000000' });
    });

    it('applies custom borderRadius as number', () => {
      const { container } = renderSwitch({ borderRadius: 12 });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-border-radius': '12px' });
    });

    it('applies custom borderRadius as string', () => {
      const { container } = renderSwitch({ borderRadius: '50%' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-border-radius': '50%' });
    });

    it('applies backgroundPattern', () => {
      const { container } = renderSwitch({ backgroundPattern: 'dots' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-bg-pattern': 'dots' });
    });

    it('applies backgroundImage as url()', () => {
      const { container } = renderSwitch({ backgroundImage: '/bg.png' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-bg-image': 'url(/bg.png)' });
    });

    it('applies backgroundBlend', () => {
      const { container } = renderSwitch({ backgroundBlend: 'multiply' });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-bg-blend': 'multiply' });
    });
  });

  // Keyboard Events
  describe('Keyboard Events', () => {
    it('toggles on Space key in uncontrolled mode', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ defaultChecked: false, onChange });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: ' ' });
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles on Space key when unchecked to checked', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: ' ' });
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles on Space key when checked to unchecked', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: true, onChange });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: ' ' });
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not toggle on other keys', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle on Space when disabled', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, disabled: true });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: ' ' });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle on Space when loading', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, loading: true });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: ' ' });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle on Space when readOnly', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, readOnly: true });
      const input = container.querySelector('input') as HTMLInputElement;
      fireEvent.keyDown(input, { key: ' ' });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  // Click Events
  describe('Click Events', () => {
    it('toggles when switch visual is clicked', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange });
      const switchVisual = container.querySelector('.switch-component__switch')!;
      fireEvent.click(switchVisual);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('toggles when switch visual is clicked (checked to unchecked)', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: true, onChange });
      const switchVisual = container.querySelector('.switch-component__switch')!;
      fireEvent.click(switchVisual);
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not toggle when switch visual clicked and disabled', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, disabled: true });
      const switchVisual = container.querySelector('.switch-component__switch')!;
      fireEvent.click(switchVisual);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle when switch visual clicked and loading', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, loading: true });
      const switchVisual = container.querySelector('.switch-component__switch')!;
      fireEvent.click(switchVisual);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle when switch visual clicked and readOnly', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, readOnly: true });
      const switchVisual = container.querySelector('.switch-component__switch')!;
      fireEvent.click(switchVisual);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('toggles when label is clicked', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange });
      const label = container.querySelector('.switch-component__label')!;
      fireEvent.click(label);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('does not toggle when label clicked and disabled', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, disabled: true });
      const label = container.querySelector('.switch-component__label')!;
      fireEvent.click(label);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('does not toggle when label clicked and loading', () => {
      const onChange = jest.fn();
      const { container } = renderSwitch({ checked: false, onChange, loading: true });
      const label = container.querySelector('.switch-component__label')!;
      fireEvent.click(label);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('sets cursor to not-allowed when disabled', () => {
      const { container } = renderSwitch({ disabled: true });
      const switchVisual = container.querySelector('.switch-component__switch') as HTMLElement;
      expect(switchVisual.style.cursor).toBe('not-allowed');
    });

    it('sets cursor to not-allowed when loading', () => {
      const { container } = renderSwitch({ loading: true });
      const switchVisual = container.querySelector('.switch-component__switch') as HTMLElement;
      expect(switchVisual.style.cursor).toBe('not-allowed');
    });

    it('sets cursor to pointer when enabled', () => {
      const { container } = renderSwitch({ disabled: false, loading: false });
      const switchVisual = container.querySelector('.switch-component__switch') as HTMLElement;
      expect(switchVisual.style.cursor).toBe('pointer');
    });
  });

  // Focus and Blur
  describe('Focus and Blur', () => {
    it('applies focused class on focus', () => {
      const { container } = renderSwitch();
      const input = container.querySelector('input')!;
      fireEvent.focus(input);
      expect(container.querySelector('.switch-component--focused')).toBeInTheDocument();
    });

    it('removes focused class on blur', () => {
      const { container } = renderSwitch();
      const input = container.querySelector('input')!;
      fireEvent.focus(input);
      expect(container.querySelector('.switch-component--focused')).toBeInTheDocument();
      fireEvent.blur(input);
      expect(container.querySelector('.switch-component--focused')).not.toBeInTheDocument();
    });
  });

  // Animation
  describe('Animation', () => {
    it('applies animating class when controlled checked state changes', () => {
      jest.useFakeTimers();
      const { container, rerender } = render(<Switch checked={false} onChange={() => {}} />);
      // In controlled mode, when the parent changes checked prop,
      // checked !== internalChecked triggers animation
      rerender(<Switch checked={true} onChange={() => {}} />);
      expect(container.querySelector('.switch-component--animating')).toBeInTheDocument();
      // After 150ms, animation class should be removed
      jest.advanceTimersByTime(200);
      jest.useRealTimers();
    });
  });

  // Advanced Styling
  describe('Advanced Styling', () => {
    it('applies glassmorphism class when enabled', () => {
      const { container } = renderSwitch({ glassmorphism: true });
      expect(container.querySelector('.switch-component--glassmorphism')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      const { container } = renderSwitch({ className: 'custom-switch' });
      expect(container.querySelector('.custom-switch')).toBeInTheDocument();
    });

    it('merges custom style with component style', () => {
      const { container } = renderSwitch({
        color: '#ff0000',
        style: { margin: '10px' },
      });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ '--switch-custom-bg': '#ff0000', margin: '10px' });
    });

    it('user style takes precedence', () => {
      const { container } = renderSwitch({
        style: { position: 'relative' },
      });
      const sw = container.querySelector('.switch-component');
      expect(sw).toHaveStyle({ position: 'relative' });
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('sets aria-checked when checked', () => {
      const { container } = renderSwitch({ checked: true });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-checked', 'true');
    });

    it('sets aria-checked when unchecked', () => {
      const { container } = renderSwitch({ checked: false });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-checked', 'false');
    });

    it('sets aria-label to "Switch" by default', () => {
      const { container } = renderSwitch();
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Switch');
    });

    it('uses custom ariaLabel when provided', () => {
      const { container } = renderSwitch({ ariaLabel: 'Toggle dark mode' });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Toggle dark mode');
    });

    it('prefers ariaLabel over label when both are provided', () => {
      const { container } = renderSwitch({
        ariaLabel: 'Accessibility name',
        label: 'Visible label',
      });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Accessibility name');
    });

    it('uses label as aria-label when no ariaLabel provided', () => {
      const { container } = renderSwitch({ label: 'Enable notifications' });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('aria-label', 'Enable notifications');
    });

    it('sets id when provided', () => {
      const { container } = renderSwitch({ id: 'my-switch' });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('id', 'my-switch');
    });

    it('sets name when provided', () => {
      const { container } = renderSwitch({ name: 'feature-toggle' });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('name', 'feature-toggle');
    });

    it('sets required when provided', () => {
      const { container } = renderSwitch({ required: true });
      const input = container.querySelector('input');
      expect(input).toHaveAttribute('required', '');
    });
  });

  // Theme Integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      const { container } = render(
        <ThemeProvider>
          <Switch checked={true} />
        </ThemeProvider>,
      );
      expect(container.querySelector('.switch-component')).toBeInTheDocument();
      expect(container.querySelector('.switch-component--checked')).toBeInTheDocument();
    });
  });
});
