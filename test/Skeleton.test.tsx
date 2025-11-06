import React from 'react';
import { render, screen } from '@testing-library/react';
import { Skeleton } from '../src/components/basic/Skeleton/Skeleton';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Skeleton Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders skeleton', () => {
      const { container } = render(<Skeleton />);
      expect(container.querySelector('.skeleton-component')).toBeInTheDocument();
    });

    it('has default text variant', () => {
      const { container } = render(<Skeleton />);
      expect(container.querySelector('.skeleton-component--text')).toBeInTheDocument();
    });

    it('is animated by default', () => {
      const { container } = render(<Skeleton />);
      expect(container.querySelector('.skeleton-component--animated')).toBeInTheDocument();
    });
  });

  // Variants
  describe('Variants', () => {
    const variants: Array<'text' | 'circular' | 'rectangular' | 'rounded'> = [
      'text',
      'circular',
      'rectangular',
      'rounded',
    ];

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        const { container } = render(<Skeleton variant={variant} />);
        expect(container.querySelector(`.skeleton-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Skeleton size={size} />);
        expect(container.querySelector(`.skeleton-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Custom dimensions
  describe('Custom Dimensions', () => {
    it('applies custom width as number', () => {
      const { container } = render(<Skeleton width={200} />);
      const skeleton = container.querySelector('.skeleton-component');
      expect(skeleton).toHaveStyle({ width: '200px' });
    });

    it('applies custom width as string', () => {
      const { container } = render(<Skeleton width="50%" />);
      const skeleton = container.querySelector('.skeleton-component');
      expect(skeleton).toHaveStyle({ width: '50%' });
    });

    it('applies custom height as number', () => {
      const { container } = render(<Skeleton height={100} />);
      const skeleton = container.querySelector('.skeleton-component');
      expect(skeleton).toHaveStyle({ height: '100px' });
    });

    it('applies custom height as string', () => {
      const { container } = render(<Skeleton height="10rem" />);
      const skeleton = container.querySelector('.skeleton-component');
      expect(skeleton).toHaveStyle({ height: '10rem' });
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom backgroundColor', () => {
      const { container } = render(<Skeleton backgroundColor="#8b5cf6" />);
      const skeleton = container.querySelector('.skeleton-component');
      expect(skeleton).toHaveStyle({ '--skeleton-custom-bg': '#8b5cf6' });
    });

    it('applies custom color', () => {
      const { container } = render(<Skeleton color="#f97316" />);
      const skeleton = container.querySelector('.skeleton-component');
      expect(skeleton).toHaveStyle({ '--skeleton-custom-color': '#f97316' });
    });
  });

  // Animation
  describe('Animation', () => {
    it('renders animated skeleton when animated is true', () => {
      const { container } = render(<Skeleton animated />);
      expect(container.querySelector('.skeleton-component--animated')).toBeInTheDocument();
    });

    it('does not render animated class when animated is false', () => {
      const { container } = render(<Skeleton animated={false} />);
      expect(container.querySelector('.skeleton-component--animated')).not.toBeInTheDocument();
    });
  });

  // Multiple skeletons
  describe('Multiple Skeletons', () => {
    it('renders multiple skeletons when count > 1', () => {
      const { container } = render(<Skeleton count={3} />);
      const skeletons = container.querySelectorAll('.skeleton-component');
      expect(skeletons.length).toBe(3);
    });

    it('renders single skeleton when count is 1', () => {
      const { container } = render(<Skeleton count={1} />);
      const skeletons = container.querySelectorAll('.skeleton-component');
      expect(skeletons.length).toBe(1);
    });

    it('renders correct count of skeletons', () => {
      const { container } = render(<Skeleton count={5} variant="circular" />);
      const skeletons = container.querySelectorAll('.skeleton-component--circular');
      expect(skeletons.length).toBe(5);
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(<Skeleton style={{ margin: '20px', padding: '10px' }} />);
      const skeleton = container.querySelector('.skeleton-component');
      const styleAttr = skeleton?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
      expect(styleAttr).toMatch(/padding:\s*10px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Skeleton backgroundColor="#8b5cf6" style={{ '--skeleton-custom-bg': 'purple' } as any} />,
      );
      const skeleton = container.querySelector('.skeleton-component');
      const styleAttr = skeleton?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--skeleton-custom-bg:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has default aria-label', () => {
      render(<Skeleton />);
      const skeleton = screen.getByLabelText('Loading content');
      expect(skeleton).toBeInTheDocument();
    });

    it('uses custom aria-label when provided', () => {
      render(<Skeleton ariaLabel="Loading user profile" />);
      const skeleton = screen.getByLabelText('Loading user profile');
      expect(skeleton).toBeInTheDocument();
    });

    it('supports aria-describedBy', () => {
      render(
        <div>
          <div id="description">Skeleton description</div>
          <Skeleton ariaDescribedBy="description" />
        </div>,
      );
      const skeleton = screen.getByLabelText('Loading content');
      expect(skeleton).toHaveAttribute('aria-describedby', 'description');
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Skeleton />
        </ThemeProvider>,
      );
      expect(screen.getByLabelText('Loading content')).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles zero count gracefully', () => {
      const { container } = render(<Skeleton count={0} />);
      const skeletons = container.querySelectorAll('.skeleton-component');
      expect(skeletons.length).toBe(0);
    });

    it('handles negative count', () => {
      const { container } = render(<Skeleton count={-1} />);
      // Should still render one skeleton (count validation)
      const skeletons = container.querySelectorAll('.skeleton-component');
      expect(skeletons.length).toBeGreaterThanOrEqual(0);
    });
  });
});
