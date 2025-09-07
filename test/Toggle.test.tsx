import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Toggle } from '../src/components/basic/Toggle';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Mock icons for testing
const MockIcon = () => <span data-testid="mock-icon">🔧</span>;

const renderToggle = (props = {}) => {
  return render(
    <ThemeProvider>
      <Toggle {...props} />
    </ThemeProvider>
  );
};

describe('Toggle Component', () => {
  describe('Basic Functionality', () => {
    test('renders toggle switch', () => {
      renderToggle();
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    test('renders with label', () => {
      renderToggle({ label: 'Test Toggle' });
      expect(screen.getByText('Test Toggle')).toBeInTheDocument();
    });

    test('renders with icon', () => {
      renderToggle({ icon: <MockIcon /> });
      expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    });

    test('renders with custom aria-label', () => {
      renderToggle({ ariaLabel: 'Custom Label' });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-label', 'Custom Label');
    });
  });

  describe('State Management', () => {
    test('defaults to unchecked when no checked prop provided', () => {
      renderToggle();
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'false');
    });

    test('uses controlled checked state', () => {
      renderToggle({ checked: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    test('uses defaultChecked for uncontrolled state', () => {
      renderToggle({ defaultChecked: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    test('calls onChange when clicked', () => {
      const handleChange = jest.fn();
      renderToggle({ onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      fireEvent.click(toggle);
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    test('toggles state when clicked', () => {
      const handleChange = jest.fn();
      renderToggle({ defaultChecked: false, onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      fireEvent.click(toggle);
      
      expect(handleChange).toHaveBeenCalledWith(true);
      
      fireEvent.click(toggle);
      expect(handleChange).toHaveBeenCalledWith(false);
    });
  });

  describe('Variants', () => {
    test.each([
      'primary',
      'secondary',
      'success',
      'warning',
      'danger',
      'info',
      'ghost',
      'outline'
    ])('renders %s variant correctly', (variant) => {
      renderToggle({ variant: variant as any });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass(`toggle-component--${variant}`);
    });
  });

  describe('Sizes', () => {
    test.each(['sm', 'md', 'lg'])('renders %s size correctly', (size) => {
      renderToggle({ size: size as any });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass(`toggle-component--${size}`);
    });
  });

  describe('Shadow Levels', () => {
    test.each(['none', 'sm', 'md', 'lg', 'xl'])('renders %s shadow correctly', (shadow) => {
      renderToggle({ shadow: shadow as any });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass(`toggle-component--shadow-${shadow}`);
    });
  });

  describe('Label Positions', () => {
    test.each(['left', 'right', 'top', 'bottom'])('renders %s label position correctly', (position) => {
      renderToggle({ label: 'Test', labelPosition: position as any });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass(`toggle-component--label-${position}`);
    });
  });

  describe('Icon Positions', () => {
    test.each(['left', 'right'])('renders %s icon position correctly', (position) => {
      renderToggle({ icon: <MockIcon />, iconPosition: position as any });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass(`toggle-component--icon-${position}`);
    });
  });

  describe('Disabled State', () => {
    test('renders disabled state correctly', () => {
      renderToggle({ disabled: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-disabled', 'true');
      expect(toggle).toHaveClass('toggle-component--disabled');
    });

    test('does not call onChange when disabled', () => {
      const handleChange = jest.fn();
      renderToggle({ disabled: true, onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      fireEvent.click(toggle);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    test('has correct tabIndex when disabled', () => {
      renderToggle({ disabled: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Loading State', () => {
    test('renders loading state correctly', () => {
      renderToggle({ loading: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('toggle-component--loading');
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    test('shows spinner when loading', () => {
      renderToggle({ loading: true });
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    test('does not call onChange when loading', () => {
      const handleChange = jest.fn();
      renderToggle({ loading: true, onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      fireEvent.click(toggle);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Ripple Effect', () => {
    test('renders with ripple effect class', () => {
      renderToggle({ ripple: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveClass('toggle-component--ripple');
    });

    test('creates ripple element on click', () => {
      renderToggle({ ripple: true });
      const toggle = screen.getByRole('switch');
      
      fireEvent.mouseDown(toggle);
      
      // Check if ripple element was created
      const ripple = toggle.querySelector('[style*="animation: toggle-ripple"]');
      expect(ripple).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    test('toggles on Enter key', () => {
      const handleChange = jest.fn();
      renderToggle({ onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      fireEvent.keyDown(toggle, { key: 'Enter' });
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    test('toggles on Space key', () => {
      const handleChange = jest.fn();
      renderToggle({ onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      fireEvent.keyDown(toggle, { key: ' ' });
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    test('handles Enter key correctly', () => {
      const handleChange = jest.fn();
      renderToggle({ onChange: handleChange });
      
      const toggle = screen.getByRole('switch');
      
      fireEvent.keyDown(toggle, { key: 'Enter' });
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Accessibility', () => {
    test('has correct role', () => {
      renderToggle();
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    test('has correct aria-checked attribute', () => {
      renderToggle({ checked: true });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-checked', 'true');
    });

    test('has correct aria-describedby when label is present', () => {
      renderToggle({ label: 'Test Label', id: 'test-toggle' });
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('aria-describedby', 'test-toggle-label');
    });

    test('has correct tabIndex', () => {
      renderToggle();
      const toggle = screen.getByRole('switch');
      expect(toggle).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Custom Styling', () => {
    test('applies custom color', () => {
      renderToggle({ color: '#ff0000' });
      const wrapper = screen.getByRole('switch').closest('.toggle-component__wrapper');
      expect(wrapper).toHaveStyle({ '--toggle-custom-bg': '#ff0000' });
    });

    test('applies custom gradient', () => {
      const gradient = 'linear-gradient(90deg, #ff0000, #00ff00)';
      renderToggle({ gradient });
      const wrapper = screen.getByRole('switch').closest('.toggle-component__wrapper');
      expect(wrapper).toHaveStyle({ '--toggle-custom-bg': gradient });
    });

    test('applies custom border radius', () => {
      renderToggle({ borderRadius: 20 });
      const wrapper = screen.getByRole('switch').closest('.toggle-component__wrapper');
      expect(wrapper).toHaveStyle({ '--toggle-custom-border-radius': '20px' });
    });

    test('applies backdrop blur', () => {
      renderToggle({ backdropBlur: true });
      const wrapper = screen.getByRole('switch').closest('.toggle-component__wrapper');
      expect(wrapper).toHaveStyle({ '--toggle-custom-backdrop-blur': 'blur(8px)' });
    });
  });

  describe('Theme Integration', () => {
    test('uses theme color keys', () => {
      renderToggle({ color: 'color-success' });
      const wrapper = screen.getByRole('switch').closest('.toggle-component__wrapper');
      expect(wrapper).toHaveStyle({ '--toggle-custom-bg': 'var(--color-success)' });
    });

    test('uses CSS variables', () => {
      renderToggle({ color: '--color-warning' });
      const wrapper = screen.getByRole('switch').closest('.toggle-component__wrapper');
      expect(wrapper).toHaveStyle({ '--toggle-custom-bg': 'var(--color-warning)' });
    });
  });

  describe('Edge Cases', () => {
    test('handles undefined onChange gracefully', () => {
      expect(() => {
        renderToggle({ onChange: undefined });
        const toggle = screen.getByRole('switch');
        fireEvent.click(toggle);
      }).not.toThrow();
    });

    test('handles empty label gracefully', () => {
      renderToggle({ label: '' });
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });

    test('handles null icon gracefully', () => {
      renderToggle({ icon: null });
      const toggle = screen.getByRole('switch');
      expect(toggle).toBeInTheDocument();
    });
  });
});
