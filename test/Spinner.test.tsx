import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../src/components/basic/Spinner/Spinner';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Spinner Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders spinner', () => {
      render(<Spinner />);
      const spinner = screen.getByRole('status');
      expect(spinner).toBeInTheDocument();
    });

    it('renders with default animation (spin)', () => {
      const { container } = render(<Spinner />);
      expect(container.querySelector('.spinner-component--spin')).toBeInTheDocument();
      expect(container.querySelector('.spinner-component__spin')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Spinner label="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  // Animations
  describe('Animations', () => {
    it('renders spin animation', () => {
      const { container } = render(<Spinner animation="spin" />);
      expect(container.querySelector('.spinner-component__spin')).toBeInTheDocument();
    });

    it('renders pulse animation', () => {
      const { container } = render(<Spinner animation="pulse" />);
      expect(container.querySelector('.spinner-component__pulse')).toBeInTheDocument();
    });

    it('renders dots animation', () => {
      const { container } = render(<Spinner animation="dots" />);
      const dotsContainer = container.querySelector('.spinner-component__dots');
      expect(dotsContainer).toBeInTheDocument();
      expect(dotsContainer?.querySelectorAll('span').length).toBe(3);
    });

    it('renders bars animation', () => {
      const { container } = render(<Spinner animation="bars" />);
      const barsContainer = container.querySelector('.spinner-component__bars');
      expect(barsContainer).toBeInTheDocument();
      expect(barsContainer?.querySelectorAll('span').length).toBe(4);
    });

    it('renders wave animation', () => {
      const { container } = render(<Spinner animation="wave" />);
      const waveContainer = container.querySelector('.spinner-component__wave');
      expect(waveContainer).toBeInTheDocument();
      expect(waveContainer?.querySelectorAll('span').length).toBe(5);
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Spinner size={size} />);
        expect(container.querySelector(`.spinner-component--${size}`)).toBeInTheDocument();
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
        const { container } = render(<Spinner variant={variant} />);
        expect(container.querySelector(`.spinner-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom color', () => {
      const { container } = render(<Spinner color="#8b5cf6" />);
      const spinner = container.querySelector('.spinner-component');
      expect(spinner).toHaveStyle({ '--spinner-custom-color': '#8b5cf6' });
    });

    it('applies custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(<Spinner gradient={gradient} />);
      const spinner = container.querySelector('.spinner-component');
      expect(spinner).toHaveStyle({ '--spinner-custom-color': gradient });
      expect(container.querySelector('.spinner-component--gradient')).toBeInTheDocument();
    });
  });

  // Full screen
  describe('Full Screen', () => {
    it('renders full screen spinner when fullScreen is true', () => {
      const { container } = render(<Spinner fullScreen />);
      expect(container.querySelector('.spinner-component--full-screen')).toBeInTheDocument();
      expect(
        container.querySelector('.spinner-component__full-screen-wrapper'),
      ).toBeInTheDocument();
    });

    it('does not render full screen wrapper when fullScreen is false', () => {
      const { container } = render(<Spinner fullScreen={false} />);
      expect(
        container.querySelector('.spinner-component__full-screen-wrapper'),
      ).not.toBeInTheDocument();
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(<Spinner style={{ margin: '20px', padding: '10px' }} />);
      const spinner = container.querySelector('.spinner-component');
      const styleAttr = spinner?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
      expect(styleAttr).toMatch(/padding:\s*10px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Spinner color="#8b5cf6" style={{ '--spinner-custom-color': 'purple' } as any} />,
      );
      const spinner = container.querySelector('.spinner-component');
      const styleAttr = spinner?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--spinner-custom-color:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="status"', () => {
      render(<Spinner />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Spinner ariaLabel="Loading content" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Loading content');
    });

    it('uses label as aria-label when provided', () => {
      render(<Spinner label="Please wait" />);
      const spinner = screen.getByRole('status');
      expect(spinner).toHaveAttribute('aria-label', 'Please wait');
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Spinner />
        </ThemeProvider>,
      );
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });
});
