import React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from '../src/components/basic/Divider/Divider';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Divider Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders horizontal divider by default', () => {
      const { container } = render(<Divider />);
      const divider = container.querySelector('hr.divider-component--horizontal');
      expect(divider).toBeInTheDocument();
    });

    it('renders horizontal divider when orientation is horizontal', () => {
      const { container } = render(<Divider orientation="horizontal" />);
      const divider = container.querySelector('hr.divider-component--horizontal');
      expect(divider).toBeInTheDocument();
    });

    it('renders vertical divider when orientation is vertical', () => {
      const { container } = render(<Divider orientation="vertical" />);
      const divider = container.querySelector('.divider-component--vertical');
      expect(divider).toBeInTheDocument();
    });
  });

  // Variants
  describe('Variants', () => {
    const variants: Array<'solid' | 'dashed' | 'dotted'> = ['solid', 'dashed', 'dotted'];

    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, () => {
        const { container } = render(<Divider variant={variant} />);
        expect(container.querySelector(`.divider-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg'> = ['xs', 'sm', 'md', 'lg'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Divider size={size} />);
        expect(container.querySelector(`.divider-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // With text
  describe('With Text', () => {
    it('renders divider with text', () => {
      render(<Divider text="OR" />);
      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('renders divider with custom text element', () => {
      render(<Divider text={<strong>Custom</strong>} />);
      expect(screen.getByText('Custom')).toBeInTheDocument();
    });

    it('applies with-text class when text is provided', () => {
      const { container } = render(<Divider text="OR" />);
      expect(container.querySelector('.divider-component--with-text')).toBeInTheDocument();
    });

    it('renders lines before and after text', () => {
      const { container } = render(<Divider text="OR" />);
      expect(container.querySelector('.divider-component__line--before')).toBeInTheDocument();
      expect(container.querySelector('.divider-component__line--after')).toBeInTheDocument();
    });
  });

  // Text position
  describe('Text Position', () => {
    const positions: Array<'left' | 'center' | 'right'> = ['left', 'center', 'right'];

    positions.forEach((position) => {
      it(`applies text-${position} class when textPosition is ${position}`, () => {
        const { container } = render(<Divider text="OR" textPosition={position} />);
        expect(container.querySelector(`.divider-component--text-${position}`)).toBeInTheDocument();
      });
    });
  });

  // Spacing
  describe('Spacing', () => {
    const spacings: Array<'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'> = [
      'none',
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
    ];

    spacings.forEach((spacing) => {
      it(`applies spacing-${spacing} class`, () => {
        const { container } = render(<Divider spacing={spacing} />);
        expect(
          container.querySelector(`.divider-component--spacing-${spacing}`),
        ).toBeInTheDocument();
      });
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom color', () => {
      const { container } = render(<Divider color="#8b5cf6" />);
      const divider = container.querySelector('.divider-component');
      expect(divider).toHaveStyle({ '--divider-custom-color': '#8b5cf6' });
    });

    it('applies custom color to text divider', () => {
      const { container } = render(<Divider text="OR" color="#ef4444" />);
      const divider = container.querySelector('.divider-component');
      expect(divider).toHaveStyle({ '--divider-custom-color': '#ef4444' });
    });
  });

  // Gradients
  describe('Gradients', () => {
    it('applies gradient and adds gradient class', () => {
      const gradient = 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(<Divider gradient={gradient} />);
      const divider = container.querySelector('.divider-component');
      expect(divider).toHaveStyle({ '--divider-custom-color': gradient });
      expect(container.querySelector('.divider-component--gradient')).toBeInTheDocument();
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(<Divider style={{ margin: '20px', padding: '10px' }} />);
      const divider = container.querySelector('.divider-component');
      const styleAttr = divider?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Divider color="#8b5cf6" style={{ '--divider-custom-color': 'purple' } as any} />,
      );
      const divider = container.querySelector('.divider-component');
      const styleAttr = divider?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--divider-custom-color:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="separator"', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('has aria-label when provided', () => {
      render(<Divider ariaLabel="Section divider" />);
      expect(screen.getByLabelText('Section divider')).toBeInTheDocument();
    });

    it('uses text as aria-label when text is provided and no ariaLabel', () => {
      render(<Divider text="OR" />);
      expect(screen.getByLabelText('OR')).toBeInTheDocument();
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Divider />
        </ThemeProvider>,
      );
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });
  });
});
