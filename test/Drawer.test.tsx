import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Drawer } from '../src/components/composition/Drawer/Drawer';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Drawer Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('does not render when isOpen is false', () => {
      const { container } = render(
        <Drawer isOpen={false} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component')).not.toBeInTheDocument();
    });

    it('renders when isOpen is true', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component')).toBeInTheDocument();
    });

    it('renders children content', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          <div>Test Content</div>
        </Drawer>,
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  // Positions
  describe('Positions', () => {
    const positions: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'left',
      'right',
      'top',
      'bottom',
    ];

    positions.forEach((position) => {
      it(`applies ${position} position class`, () => {
        const { container } = render(
          <Drawer isOpen={true} onClose={() => {}} position={position}>
            Content
          </Drawer>,
        );
        expect(container.querySelector(`.drawer-component--${position}`)).toBeInTheDocument();
      });
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'> = [
      'xs',
      'sm',
      'md',
      'lg',
      'xl',
      'full',
    ];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(
          <Drawer isOpen={true} onClose={() => {}} size={size}>
            Content
          </Drawer>,
        );
        expect(container.querySelector(`.drawer-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Header and footer
  describe('Header and Footer', () => {
    it('renders title when provided', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} title="Test Title">
          Content
        </Drawer>,
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders description when provided', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} description="Test Description">
          Content
        </Drawer>,
      );
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders custom header when provided', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} header={<div>Custom Header</div>}>
          Content
        </Drawer>,
      );
      expect(screen.getByText('Custom Header')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} footer={<div>Footer Content</div>}>
          Content
        </Drawer>,
      );
      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });
  });

  // Close button
  describe('Close Button', () => {
    it('renders close button by default', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(screen.getByLabelText('Close drawer')).toBeInTheDocument();
    });

    it('does not render close button when closeButton is false', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}} closeButton={false}>
          Content
        </Drawer>,
      );
      expect(screen.queryByLabelText('Close drawer')).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <Drawer isOpen={true} onClose={onClose}>
          Content
        </Drawer>,
      );
      const closeButton = screen.getByLabelText('Close drawer');
      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  // Backdrop
  describe('Backdrop', () => {
    it('renders backdrop by default', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component__backdrop')).toBeInTheDocument();
    });

    it('does not render backdrop when backdrop is false', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} backdrop={false}>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component__backdrop')).not.toBeInTheDocument();
    });

    it('calls onClose when backdrop is clicked and closeOnBackdropClick is true', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Drawer isOpen={true} onClose={onClose} closeOnBackdropClick={true}>
          Content
        </Drawer>,
      );
      const backdrop = container.querySelector('.drawer-component__backdrop');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).toHaveBeenCalledTimes(1);
      }
    });

    it('does not call onClose when backdrop is clicked and closeOnBackdropClick is false', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Drawer isOpen={true} onClose={onClose} closeOnBackdropClick={false}>
          Content
        </Drawer>,
      );
      const backdrop = container.querySelector('.drawer-component__backdrop');
      if (backdrop) {
        fireEvent.click(backdrop);
        expect(onClose).not.toHaveBeenCalled();
      }
    });
  });

  // Keyboard events
  describe('Keyboard Events', () => {
    it('calls onClose when Escape key is pressed', () => {
      const onClose = jest.fn();
      render(
        <Drawer isOpen={true} onClose={onClose} closeOnEsc={true}>
          Content
        </Drawer>,
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when Escape key is pressed and closeOnEsc is false', () => {
      const onClose = jest.fn();
      render(
        <Drawer isOpen={true} onClose={onClose} closeOnEsc={false}>
          Content
        </Drawer>,
      );
      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  // Custom dimensions
  describe('Custom Dimensions', () => {
    it('applies custom width for left/right drawers', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} position="left" width={400}>
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('.drawer-component');
      expect(drawer).toHaveStyle({ width: '400px' });
    });

    it('applies custom height for top/bottom drawers', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} position="top" height={300}>
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('.drawer-component');
      expect(drawer).toHaveStyle({ height: '300px' });
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom backgroundColor', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} backgroundColor="#8b5cf6">
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('.drawer-component');
      expect(drawer).toHaveStyle({ '--drawer-custom-bg': '#8b5cf6' });
    });

    it('applies custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} gradient={gradient}>
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('.drawer-component');
      expect(drawer).toHaveStyle({ '--drawer-custom-bg': gradient });
      expect(container.querySelector('.drawer-component--gradient')).toBeInTheDocument();
    });
  });

  // Glassmorphism
  describe('Glassmorphism', () => {
    it('applies glassmorphism class when enabled', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} glassmorphism>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component--glassmorphism')).toBeInTheDocument();
    });
  });

  // Animation
  describe('Animation', () => {
    it('applies animated class when animated is true', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} animated>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component--animated')).toBeInTheDocument();
    });

    it('does not apply animated class when animated is false', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} animated={false}>
          Content
        </Drawer>,
      );
      expect(container.querySelector('.drawer-component--animated')).not.toBeInTheDocument();
    });
  });

  // Body scroll lock
  describe('Body Scroll Lock', () => {
    it('locks body scroll when drawer is open', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(document.body.style.overflow).toBe('hidden');
    });

    it('unlocks body scroll when drawer is closed', () => {
      const { rerender } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(document.body.style.overflow).toBe('hidden');

      rerender(
        <Drawer isOpen={false} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(document.body.style.overflow).toBe('');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="dialog"', () => {
      render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('has aria-modal="true"', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}}>
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-modal', 'true');
    });

    it('has aria-labelledby when title is provided', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} title="Test Title">
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-labelledby', 'drawer-title');
    });

    it('has aria-describedby when description is provided', () => {
      const { container } = render(
        <Drawer isOpen={true} onClose={() => {}} description="Test Description">
          Content
        </Drawer>,
      );
      const drawer = container.querySelector('[role="dialog"]');
      expect(drawer).toHaveAttribute('aria-describedby', 'drawer-description');
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Drawer isOpen={true} onClose={() => {}}>
            Content
          </Drawer>
        </ThemeProvider>,
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});
