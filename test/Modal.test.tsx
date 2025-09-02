import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Modal } from '../src/components/Modal/Modal';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Simple theme for testing
const customTheme = {
  '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '--color-primary': '#0070f3',
  '--color-success': '#10b981',
  '--color-warning': '#f59e0b',
  '--color-danger': '#ef4444',
  '--color-secondary': '#6b7280',
  '--color-info': '#3b82f6'
};

describe('Modal', () => {
  describe('Basic Rendering', () => {
    it('renders modal when open', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
      expect(screen.getByText('Test Modal')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={false}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
      expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    it('renders with title and description', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Title"
            description="Test Description"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders without title and description', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    it('renders close button by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByLabelText('Close')).toBeInTheDocument();
    });

    it('does not render close button when showCloseButton is false', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            showCloseButton={false}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.queryByLabelText('Close')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with primary variant by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--primary');
    });

    it('renders with different variants', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            variant="success"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--success');
      
      rerender(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            variant="warning"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--warning');
    });

    it('applies custom color when provided', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            color="#ff0000"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ '--modal-custom-bg': '#ff0000' });
    });

    it('applies custom gradient when provided', () => {
      const gradient = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)';
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            gradient={gradient}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ '--modal-custom-bg': gradient });
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--md');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            size="sm"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--sm');
      
      rerender(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            size="lg"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--lg');
    });

    it('applies fullscreen class when fullscreen is true', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            fullscreen
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--fullscreen');
    });
  });

  describe('Backdrop and Animation', () => {
    it('renders with dark backdrop by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const overlay = screen.getByRole('dialog').parentElement;
      expect(overlay).toHaveClass('modal-component__overlay--dark');
    });

    it('renders with different backdrop styles', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            backdrop="light"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const overlay = screen.getByRole('dialog').parentElement;
      expect(overlay).toHaveClass('modal-component__overlay--light');
      
      rerender(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            backdrop="blur"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(overlay).toHaveClass('modal-component__overlay--blur');
    });

    it('renders with fade animation by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--fade');
    });

    it('renders with different animations', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            animation="slide"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--slide');
      
      rerender(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            animation="scale"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--scale');
    });
  });

  describe('Positioning', () => {
    it('renders with center position by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--center');
    });

    it('renders with different positions', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            position="top"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--top');
      
      rerender(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            position="bottom-right"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--bottom-right');
    });
  });

  describe('Shadow and Effects', () => {
    it('renders with large shadow by default', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--shadow-lg');
    });

    it('renders with different shadow levels', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            shadow="none"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--shadow-none');
      
      rerender(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            shadow="xl"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByRole('dialog')).toHaveClass('modal-component--shadow-xl');
    });
  });

  describe('Advanced Features', () => {
    it('applies draggable class when draggable is true', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            draggable
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--draggable');
    });

    it('applies resizable class when resizable is true', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            resizable
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--resizable');
    });

    it('applies custom dimensions when provided', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            maxWidth="800px"
            minHeight="400px"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ maxWidth: '800px', minHeight: '400px' });
    });

    it('applies custom z-index when provided', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            zIndex={2000}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ zIndex: 2000 });
    });
  });

  describe('Interaction', () => {
    it('calls onClose when close button is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const closeButton = screen.getByLabelText('Close');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when overlay is clicked', () => {
      const mockOnClose = jest.fn();
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            closeOnOverlayClick={true}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const overlay = screen.getByRole('dialog').parentElement;
      fireEvent.click(overlay!);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when overlay is clicked and closeOnOverlayClick is false', () => {
      const mockOnClose = jest.fn();
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            closeOnOverlayClick={false}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const overlay = screen.getByRole('dialog').parentElement;
      fireEvent.click(overlay!);
      
      expect(mockOnClose).not.toHaveBeenCalled();
    });

    it('calls onClose when ESC key is pressed', async () => {
      const mockOnClose = jest.fn();
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            closeOnEsc={true}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    it('does not call onClose when ESC key is pressed and closeOnEsc is false', async () => {
      const mockOnClose = jest.fn();
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={mockOnClose}
            title="Test Modal"
            closeOnEsc={false}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      fireEvent.keyDown(document, { key: 'Escape' });
      
      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            description="Test Description"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
      expect(modal).toHaveAttribute('aria-describedby', 'modal-description');
    });

    it('has proper role and aria-modal attributes', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('role', 'dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
    });

    it('has proper focus management', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const overlay = screen.getByRole('dialog').parentElement;
      expect(overlay).toHaveAttribute('tabIndex', '-1');
    });
  });

  describe('Theme Integration', () => {
    it('integrates with theme system', () => {
      render(
        <ThemeProvider theme={customTheme}>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            color="color-success"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ '--modal-custom-bg': 'var(--color-success)' });
    });

    it('resolves theme values correctly', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            color="--color-primary"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ '--modal-custom-bg': 'var(--color-primary)' });
    });
  });

  describe('Edge Cases', () => {
    it('handles custom className and style props', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            className="custom-class"
            style={{ backgroundColor: 'red' }}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('custom-class');
      // Check that the style is applied to the modal element
      // Note: CSS custom properties may override inline styles, so we check the style attribute
      expect(modal).toHaveAttribute('style');
      expect(modal.getAttribute('style')).toContain('background-color: red');
    });

    it('handles custom close button text and icon', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            title="Test Modal"
            closeButtonText="Close Modal"
            closeButtonIcon="✕"
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const closeButton = screen.getByLabelText('Close Modal');
      expect(closeButton).toBeInTheDocument();
      expect(closeButton).toHaveTextContent('✕');
    });

    it('renders with custom header and footer', () => {
      const customHeader = <div data-testid="custom-header">Custom Header</div>;
      const customFooter = <div data-testid="custom-footer">Custom Footer</div>;
      
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            header={customHeader}
            footer={customFooter}
          >
            <p>Modal Content</p>
          </Modal>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
      expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    });

    it('applies glassmorphism effect when enabled', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            glassmorphism={true}
          >
            <p>Modal content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--glassmorphism');
    });

    it('applies background pattern when provided', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            backgroundPattern="radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)"
          >
            <p>Modal content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--pattern');
    });

    it('applies background image when provided', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            backgroundImage="https://example.com/image.jpg"
          >
            <p>Modal content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('modal-component--image-bg');
    });

    it('applies custom background colors for different sections', () => {
      render(
        <ThemeProvider>
          <Modal
            isOpen={true}
            onClose={() => {}}
            backgroundColor="#ff0000"
            headerBackgroundColor="#00ff00"
            footerBackgroundColor="#0000ff"
            contentBackgroundColor="#ffff00"
          >
            <p>Modal content</p>
          </Modal>
        </ThemeProvider>
      );
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveStyle({ '--modal-custom-bg': '#ff0000' });
      expect(modal).toHaveStyle({ '--modal-custom-bg': '#ff0000' }); // This will be the last one applied
      expect(modal).toHaveStyle({ '--modal-custom-header-bg': '#00ff00' });
      expect(modal).toHaveStyle({ '--modal-custom-footer-bg': '#0000ff' });
      expect(modal).toHaveStyle({ '--modal-custom-content-bg': '#ffff00' });
    });
  });
});
