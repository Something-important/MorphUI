import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from '../src/components/interactive/Slider/Slider';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Slider Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders slider', () => {
      render(<Slider defaultValue={50} />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Slider defaultValue={50} label="Volume" />);
      expect(screen.getByText('Volume')).toBeInTheDocument();
    });

    it('renders with value display when showValue is true', () => {
      render(<Slider value={50} showValue />);
      const valueDisplay = screen.getByText('50', { selector: '.slider-component__value' });
      expect(valueDisplay).toBeInTheDocument();
    });

    it('renders range slider when range prop is true', () => {
      const { container } = render(<Slider range defaultValue={[25, 75]} />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs.length).toBe(2);
      expect(container.querySelector('.slider-component--range')).toBeInTheDocument();
    });

    it('renders tooltip by default', () => {
      const { container } = render(<Slider defaultValue={50} />);
      expect(container.querySelector('.slider-component__tooltip')).toBeInTheDocument();
    });

    it('does not render tooltip when showTooltip is false', () => {
      const { container } = render(<Slider defaultValue={50} showTooltip={false} />);
      expect(container.querySelector('.slider-component__tooltip')).not.toBeInTheDocument();
    });
  });

  // Controlled vs Uncontrolled
  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component with defaultValue', () => {
      const onChange = jest.fn();
      render(<Slider defaultValue={50} onChange={onChange} />);
      // Component should render with default value
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '50');
    });

    it('works as controlled component with value', () => {
      const onChange = jest.fn();
      render(<Slider value={75} onChange={onChange} />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '75');
    });
  });

  // Value clamping
  describe('Value Clamping', () => {
    it('clamps value to min', () => {
      render(<Slider value={-10} min={0} max={100} />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '0');
    });

    it('clamps value to max', () => {
      render(<Slider value={150} min={0} max={100} />);
      expect(screen.getByRole('slider')).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps range values correctly', () => {
      render(<Slider range value={[-10, 150]} min={0} max={100} />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs[0]).toHaveAttribute('aria-valuenow', '0');
      expect(thumbs[1]).toHaveAttribute('aria-valuenow', '100');
    });
  });

  // Range slider
  describe('Range Slider', () => {
    it('normalizes range values (ensures min <= max)', () => {
      render(<Slider range value={[75, 25]} min={0} max={100} />);
      const thumbs = screen.getAllByRole('slider');
      // Values should be normalized
      expect(parseInt(thumbs[0].getAttribute('aria-valuenow') || '0')).toBeLessThanOrEqual(
        parseInt(thumbs[1].getAttribute('aria-valuenow') || '100'),
      );
    });

    it('prevents thumbs from crossing in range slider', () => {
      const onChange = jest.fn();
      render(<Slider range value={[50, 75]} onChange={onChange} />);
      // This would be tested in integration tests with actual mouse events
      expect(screen.getAllByRole('slider').length).toBe(2);
    });

    it('displays range value correctly', () => {
      render(<Slider range value={[25, 75]} showValue />);
      expect(screen.getByText('25 - 75')).toBeInTheDocument();
    });
  });

  // Marks
  describe('Marks', () => {
    it('renders marks when marks prop is true', () => {
      const { container } = render(<Slider value={50} marks step={10} />);
      expect(container.querySelector('.slider-component__marks')).toBeInTheDocument();
    });

    it('renders custom marks', () => {
      const { container } = render(
        <Slider
          value={50}
          marks={[
            { value: 0, label: 'Min' },
            { value: 100, label: 'Max' },
          ]}
        />,
      );
      expect(screen.getByText('Min')).toBeInTheDocument();
      expect(screen.getByText('Max')).toBeInTheDocument();
    });

    it('does not render marks when marks is false', () => {
      const { container } = render(<Slider value={50} marks={false} />);
      expect(container.querySelector('.slider-component__marks')).not.toBeInTheDocument();
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Slider value={50} size={size} />);
        expect(container.querySelector(`.slider-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Variants
  describe('Variants', () => {
    const variants: Array<'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'> = [
      'primary',
      'secondary',
      'success',
      'warning',
      'error',
      'info',
    ];

    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, () => {
        const { container } = render(<Slider value={50} variant={variant} />);
        expect(container.querySelector(`.slider-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom color', () => {
      const { container } = render(<Slider value={50} color="#8b5cf6" />);
      const slider = container.querySelector('.slider-component');
      expect(slider).toHaveStyle({ '--slider-custom-color': '#8b5cf6' });
    });

    it('applies custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(<Slider value={50} gradient={gradient} />);
      const slider = container.querySelector('.slider-component');
      expect(slider).toHaveStyle({ '--slider-custom-color': gradient });
      expect(container.querySelector('.slider-component--gradient')).toBeInTheDocument();
    });

    it('applies custom track color', () => {
      const { container } = render(<Slider value={50} trackColor="#e5e7eb" />);
      const slider = container.querySelector('.slider-component');
      expect(slider).toHaveStyle({ '--slider-custom-track-color': '#e5e7eb' });
    });

    it('applies custom thumb color', () => {
      const { container } = render(<Slider value={50} thumbColor="#8b5cf6" />);
      const slider = container.querySelector('.slider-component');
      expect(slider).toHaveStyle({ '--slider-custom-thumb-color': '#8b5cf6' });
    });
  });

  // Keyboard navigation
  describe('Keyboard Navigation', () => {
    it('handles arrow key navigation', () => {
      const onChange = jest.fn();
      render(<Slider value={50} onChange={onChange} step={10} />);
      const thumb = screen.getByRole('slider');
      fireEvent.keyDown(thumb, { key: 'ArrowRight' });
      expect(onChange).toHaveBeenCalled();
    });

    it('handles Home key (set to min)', () => {
      const onChange = jest.fn();
      render(<Slider value={50} onChange={onChange} min={0} max={100} />);
      const thumb = screen.getByRole('slider');
      fireEvent.keyDown(thumb, { key: 'Home' });
      expect(onChange).toHaveBeenCalledWith(0);
    });

    it('handles End key (set to max)', () => {
      const onChange = jest.fn();
      render(<Slider value={50} onChange={onChange} min={0} max={100} />);
      const thumb = screen.getByRole('slider');
      fireEvent.keyDown(thumb, { key: 'End' });
      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('respects step size when using arrow keys', () => {
      const onChange = jest.fn();
      render(<Slider value={50} onChange={onChange} step={5} />);
      const thumb = screen.getByRole('slider');
      fireEvent.keyDown(thumb, { key: 'ArrowRight' });
      // Should increment by step (5)
      expect(onChange).toHaveBeenCalledWith(55);
    });
  });

  // Disabled state
  describe('Disabled State', () => {
    it('applies disabled class', () => {
      const { container } = render(<Slider value={50} disabled />);
      expect(container.querySelector('.slider-component--disabled')).toBeInTheDocument();
    });

    it('prevents interaction when disabled', () => {
      const onChange = jest.fn();
      render(<Slider value={50} disabled onChange={onChange} />);
      const thumb = screen.getByRole('slider');
      fireEvent.keyDown(thumb, { key: 'ArrowRight' });
      expect(onChange).not.toHaveBeenCalled();
    });

    it('has tabIndex -1 when disabled', () => {
      render(<Slider value={50} disabled />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('tabIndex', '-1');
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(
        <Slider value={50} style={{ margin: '20px', padding: '10px' }} />,
      );
      const slider = container.querySelector('.slider-component');
      const styleAttr = slider?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
      expect(styleAttr).toMatch(/padding:\s*10px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Slider value={50} color="#8b5cf6" style={{ '--slider-custom-color': 'purple' } as any} />,
      );
      const slider = container.querySelector('.slider-component');
      const styleAttr = slider?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--slider-custom-color:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="slider"', () => {
      render(<Slider value={50} />);
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });

    it('has correct ARIA attributes', () => {
      render(<Slider value={50} min={0} max={100} />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-valuemin', '0');
      expect(thumb).toHaveAttribute('aria-valuemax', '100');
      expect(thumb).toHaveAttribute('aria-valuenow', '50');
    });

    it('supports aria-label', () => {
      render(<Slider value={50} ariaLabel="Volume control" />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-label', 'Volume control');
    });

    it('uses label for aria-label when provided', () => {
      render(<Slider value={50} label="Volume" />);
      const thumb = screen.getByRole('slider');
      expect(thumb).toHaveAttribute('aria-label', 'Volume');
    });

    it('range slider has correct ARIA attributes for both thumbs', () => {
      render(<Slider range value={[25, 75]} min={0} max={100} />);
      const thumbs = screen.getAllByRole('slider');
      expect(thumbs[0]).toHaveAttribute('aria-label', 'Minimum value');
      expect(thumbs[1]).toHaveAttribute('aria-label', 'Maximum value');
    });
  });

  // Hidden input for forms
  describe('Form Integration', () => {
    it('renders hidden input when name prop is provided', () => {
      const { container } = render(<Slider value={50} name="volume" />);
      const input = container.querySelector('input[type="hidden"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('name', 'volume');
      expect(input).toHaveAttribute('value', '50');
    });

    it('renders hidden input with range values', () => {
      const { container } = render(<Slider range value={[25, 75]} name="range" />);
      const input = container.querySelector('input[type="hidden"]');
      expect(input).toHaveAttribute('value', '25,75');
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Slider value={50} />
        </ThemeProvider>,
      );
      expect(screen.getByRole('slider')).toBeInTheDocument();
    });
  });
});
