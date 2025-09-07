import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Accordion } from '../src/components/interactive/Accordion/Accordion';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Accordion', () => {
  describe('Basic Rendering', () => {
    it('renders accordion with title', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Accordion content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Accordion')).toBeInTheDocument();
      expect(screen.getByText('Accordion content')).not.toBeVisible();
    });

    it('renders with default closed state', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Accordion content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const content = screen.getByText('Accordion content');
      expect(content).not.toBeVisible();
    });

    it('renders with default open state when defaultOpen is true', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" defaultOpen={true}>
            <p>Accordion content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const content = screen.getByText('Accordion content');
      expect(content).toBeVisible();
    });

    it('renders children content', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <div data-testid="custom-content">
              <h3>Custom Header</h3>
              <p>Custom paragraph</p>
              <button>Custom button</button>
            </div>
          </Accordion>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('custom-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Header')).toBeInTheDocument();
      expect(screen.getByText('Custom paragraph')).toBeInTheDocument();
      expect(screen.getByText('Custom button')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with primary variant by default', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--primary');
    });

    it('renders with different variants', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Accordion title="Test Accordion" variant="success">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      let accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--success');
      
      rerender(
        <ThemeProvider>
          <Accordion title="Test Accordion" variant="danger">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--danger');
    });

    it('applies custom color when provided', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" color="#ff0000">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveStyle({ '--accordion-custom-bg': '#ff0000' });
    });

    it('applies custom gradient when provided', () => {
      const gradient = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)';
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" gradient={gradient}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveStyle({ '--accordion-custom-bg': gradient });
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--md');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Accordion title="Test Accordion" size="sm">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      let accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--sm');
      
      rerender(
        <ThemeProvider>
          <Accordion title="Test Accordion" size="lg">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--lg');
    });
  });

  describe('Shadow and Effects', () => {
    it('renders with small shadow by default', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--shadow-sm');
    });

    it('renders with different shadow levels', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Accordion title="Test Accordion" shadow="lg">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      let accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--shadow-lg');
      
      rerender(
        <ThemeProvider>
          <Accordion title="Test Accordion" shadow="none">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--shadow-none');
    });

    it('applies hover effects', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Accordion title="Test Accordion" hoverEffect="lift">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      let accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--hover-lift');
      
      rerender(
        <ThemeProvider>
          <Accordion title="Test Accordion" hoverEffect="glow">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--hover-glow');
    });
  });

  describe('State Variants', () => {
    it('applies rounded class when rounded is true', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" rounded={true}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--rounded');
    });

    it('applies bordered class when bordered is true', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" bordered={true}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--bordered');
    });

    it('applies disabled class when disabled is true', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" disabled={true}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--disabled');
    });

    it('applies loading class when loading is true', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" loading={true}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--loading');
    });
  });

  describe('Icon and Positioning', () => {
    it('renders with default icon', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const defaultIcon = screen.getByRole('button').querySelector('.accordion-component__default-icon');
      expect(defaultIcon).toBeInTheDocument();
    });

    it('applies icon position classes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Accordion title="Test Accordion" iconPosition="left">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      let accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--icon-left');
      
      rerender(
        <ThemeProvider>
          <Accordion title="Test Accordion" iconPosition="right">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--icon-right');
    });

    it('renders custom icon when provided', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" icon="⭐">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      expect(screen.getByText('⭐')).toBeInTheDocument();
    });
  });

  describe('Animation', () => {
    it('renders with slide animation by default', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--animation-slide');
    });

    it('applies different animation types', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Accordion title="Test Accordion" animation="fade">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      let accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--animation-fade');
      
      rerender(
        <ThemeProvider>
          <Accordion title="Test Accordion" animation="scale">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('accordion-component--animation-scale');
    });

    it('applies custom animation duration', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" animationDuration={500}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveStyle({ '--accordion-animation-duration': '500ms' });
    });
  });

  describe('Interaction', () => {
    it('toggles content visibility when clicked', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Accordion content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      const content = screen.getByText('Accordion content');
      
      // Initially closed
      expect(content).not.toBeVisible();
      
      // Click to open
      fireEvent.click(button);
      expect(content).toBeVisible();
      
      // Click to close
      fireEvent.click(button);
      expect(content).not.toBeVisible();
    });

    it('calls onToggle callback when clicked', () => {
      const mockOnToggle = jest.fn();
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" onToggle={mockOnToggle}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      
      fireEvent.click(button);
      expect(mockOnToggle).toHaveBeenCalledWith(true);
      
      fireEvent.click(button);
      expect(mockOnToggle).toHaveBeenCalledWith(false);
    });

    it('calls onOpen callback when opened', () => {
      const mockOnOpen = jest.fn();
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" onOpen={mockOnOpen}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      fireEvent.click(button);
      
      expect(mockOnOpen).toHaveBeenCalled();
    });

    it('calls onClose callback when closed', () => {
      const mockOnClose = jest.fn();
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" defaultOpen={true} onClose={mockOnClose}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      fireEvent.click(button);
      
      expect(mockOnClose).toHaveBeenCalled();
    });

    it('does not toggle when disabled', () => {
      const mockOnToggle = jest.fn();
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" disabled={true} onToggle={mockOnToggle}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      fireEvent.click(button);
      
      expect(mockOnToggle).not.toHaveBeenCalled();
    });

    it('does not toggle when loading', () => {
      const mockOnToggle = jest.fn();
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" loading={true} onToggle={mockOnToggle}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      fireEvent.click(button);
      
      expect(mockOnToggle).not.toHaveBeenCalled();
    });
  });

  describe('Keyboard Navigation', () => {
    it('toggles on Enter key', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      const content = screen.getByText('Content');
      
      expect(content).not.toBeVisible();
      
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(content).toBeVisible();
    });

    it('toggles on Space key', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      const content = screen.getByText('Content');
      
      expect(content).not.toBeVisible();
      
      fireEvent.keyDown(button, { key: ' ' });
      expect(content).toBeVisible();
    });

    it('opens on ArrowDown when closed', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      const content = screen.getByText('Content');
      
      expect(content).not.toBeVisible();
      
      fireEvent.keyDown(button, { key: 'ArrowDown' });
      expect(content).toBeVisible();
    });

    it('closes on ArrowUp when open', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" defaultOpen={true}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      const content = screen.getByText('Content');
      
      expect(content).toBeVisible();
      
      fireEvent.keyDown(button, { key: 'ArrowUp' });
      expect(content).not.toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('has proper role and disabled state', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" disabled={true}>
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('disabled');
      expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('has proper focus management', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Theme Integration', () => {
    it('integrates with theme system', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" color="color-success">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveStyle({ '--accordion-custom-bg': 'var(--color-success)' });
    });

    it('resolves theme values correctly', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion" color="--color-primary">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveStyle({ '--accordion-custom-bg': 'var(--color-primary)' });
    });
  });

  describe('Edge Cases', () => {
    it('handles custom className and style props', () => {
      render(
        <ThemeProvider>
          <Accordion 
            title="Test Accordion" 
            className="custom-class"
            style={{ backgroundColor: 'red' }}
          >
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const accordion = screen.getByRole('button').closest('.accordion-component');
      expect(accordion).toHaveClass('custom-class');
      expect(accordion).toHaveAttribute('style');
      expect(accordion!.getAttribute('style')).toContain('background-color: red');
    });

    it('handles empty children', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            {null}
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      expect(button).toBeInTheDocument();
    });

    it('handles complex children structure', () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <div>
              <h3>Section Header</h3>
              <p>Section content</p>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </Accordion>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Section Header')).toBeInTheDocument();
      expect(screen.getByText('Section content')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });

    it('handles rapid clicking', async () => {
      render(
        <ThemeProvider>
          <Accordion title="Test Accordion">
            <p>Content</p>
          </Accordion>
        </ThemeProvider>
      );
      
      const button = screen.getByText('Test Accordion');
      const content = screen.getByText('Content');
      
      // Rapid clicks
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);
      
      // Should end up in a consistent state
      await waitFor(() => {
        expect(content).toBeVisible();
      });
    });
  });
});
