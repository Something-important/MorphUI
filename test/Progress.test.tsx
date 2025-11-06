import React from 'react';
import { render, screen } from '@testing-library/react';
import { Progress } from '../src/components/basic/Progress/Progress';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Progress Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders linear progress', () => {
      render(<Progress value={50} />);
      const progress = screen.getByRole('progressbar');
      expect(progress).toBeInTheDocument();
    });

    it('renders circular progress', () => {
      const { container } = render(<Progress value={50} type="circular" />);
      expect(container.querySelector('.progress-component--circular')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Progress value={50} label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('renders with value when showValue is true', () => {
      render(<Progress value={50} showValue />);
      expect(screen.getByText('50%')).toBeInTheDocument();
    });
  });

  // Types
  describe('Types', () => {
    it('renders linear type', () => {
      const { container } = render(<Progress value={50} type="linear" />);
      expect(container.querySelector('.progress-component--linear')).toBeInTheDocument();
      expect(container.querySelector('.progress-component__track')).toBeInTheDocument();
    });

    it('renders circular type', () => {
      const { container } = render(<Progress value={50} type="circular" />);
      expect(container.querySelector('.progress-component--circular')).toBeInTheDocument();
      expect(container.querySelector('.progress-component__circular-svg')).toBeInTheDocument();
    });
  });

  // Determinate vs Indeterminate
  describe('Determinate vs Indeterminate', () => {
    it('renders determinate progress with value', () => {
      render(<Progress value={75} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '75');
      expect(bar).toHaveAttribute('aria-valuemin', '0');
      expect(bar).toHaveAttribute('aria-valuemax', '100');
    });

    it('renders indeterminate progress without value', () => {
      const { container } = render(<Progress />);
      expect(container.querySelector('.progress-component--indeterminate')).toBeInTheDocument();
    });

    it('clamps value to max', () => {
      render(<Progress value={150} max={100} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '100');
    });

    it('clamps value to min (0)', () => {
      render(<Progress value={-10} />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-valuenow', '0');
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class for linear`, () => {
        const { container } = render(<Progress value={50} size={size} type="linear" />);
        expect(container.querySelector(`.progress-component--${size}`)).toBeInTheDocument();
      });

      it(`applies ${size} size class for circular`, () => {
        const { container } = render(<Progress value={50} size={size} type="circular" />);
        expect(container.querySelector(`.progress-component--${size}`)).toBeInTheDocument();
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
        const { container } = render(<Progress value={50} variant={variant} />);
        expect(container.querySelector(`.progress-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Features
  describe('Features', () => {
    it('renders striped progress', () => {
      const { container } = render(<Progress value={50} striped />);
      expect(container.querySelector('.progress-component--striped')).toBeInTheDocument();
    });

    it('renders animated striped progress', () => {
      const { container } = render(<Progress value={50} striped animated />);
      expect(container.querySelector('.progress-component--animated')).toBeInTheDocument();
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom color', () => {
      const { container } = render(<Progress value={50} color="#8b5cf6" />);
      const progress = container.querySelector('.progress-component');
      expect(progress).toHaveStyle({ '--progress-custom-color': '#8b5cf6' });
    });

    it('applies custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(<Progress value={50} gradient={gradient} />);
      const progress = container.querySelector('.progress-component');
      expect(progress).toHaveStyle({ '--progress-custom-color': gradient });
      expect(container.querySelector('.progress-component--gradient')).toBeInTheDocument();
    });

    it('applies custom background color', () => {
      const { container } = render(<Progress value={50} backgroundColor="#f3f4f6" />);
      const progress = container.querySelector('.progress-component');
      expect(progress).toHaveStyle({ '--progress-custom-bg': '#f3f4f6' });
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(
        <Progress value={50} style={{ margin: '20px', padding: '10px' }} />,
      );
      const progress = container.querySelector('.progress-component');
      const styleAttr = progress?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
      expect(styleAttr).toMatch(/padding:\s*10px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Progress
          value={50}
          color="#8b5cf6"
          style={{ '--progress-custom-color': 'purple' } as any}
        />,
      );
      const progress = container.querySelector('.progress-component');
      const styleAttr = progress?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--progress-custom-color:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="progressbar" for linear', () => {
      render(<Progress value={50} />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Progress value={50} ariaLabel="Upload progress" />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-label', 'Upload progress');
    });

    it('uses label for aria-label when provided', () => {
      render(<Progress value={50} label="Loading" />);
      const bar = screen.getByRole('progressbar');
      expect(bar).toHaveAttribute('aria-label', 'Loading');
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Progress value={50} />
        </ThemeProvider>,
      );
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });
  });
});
