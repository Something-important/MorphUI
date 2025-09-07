import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Card } from '../src/components/interactive/Card/Card';
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

describe('Card', () => {
  describe('Basic Rendering', () => {
    it('renders children inside the card', () => {
      render(
        <ThemeProvider>
          <Card>
            <p>Hello Card</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Hello Card')).toBeInTheDocument();
    });

    it('renders with title and subtitle', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Title"
            subtitle="Test Subtitle"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with description', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Title"
            description="Test Description"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toHaveAttribute('id', 'card-description');
    });

    it('renders without title and subtitle', () => {
      render(
        <ThemeProvider>
          <Card>
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.queryByRole('heading')).not.toBeInTheDocument();
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('renders with custom header', () => {
      const customHeader = <div data-testid="custom-header">Custom Header</div>;
      
      render(
        <ThemeProvider>
          <Card header={customHeader}>
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('custom-header')).toBeInTheDocument();
    });

    it('renders with custom footer', () => {
      const customFooter = <div data-testid="custom-footer">Custom Footer</div>;
      
      render(
        <ThemeProvider>
          <Card footer={customFooter}>
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('custom-footer')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with primary variant by default', () => {
      render(
        <ThemeProvider>
          <Card title="Test Card">
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--primary');
    });

    it('renders with different variants', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Card
            title="Test Card"
            variant="success"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--success');
      
      rerender(
        <ThemeProvider>
          <Card
            title="Test Card"
            variant="warning"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--warning');
    });

    it('applies custom color when provided', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            color="#ff0000"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveStyle({ '--card-custom-bg': '#ff0000' });
    });

    it('applies custom gradient when provided', () => {
      const gradient = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)';
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            gradient={gradient}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveStyle({ '--card-custom-bg': gradient });
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      render(
        <ThemeProvider>
          <Card title="Test Card">
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--md');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Card
            title="Test Card"
            size="sm"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--sm');
      
      rerender(
        <ThemeProvider>
          <Card
            title="Test Card"
            size="lg"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--lg');
    });
  });

  describe('Shadow and Hover Effects', () => {
    it('renders with medium shadow by default', () => {
      render(
        <ThemeProvider>
          <Card title="Test Card">
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--shadow-md');
    });

    it('renders with different shadow levels', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Card
            title="Test Card"
            shadow="none"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--shadow-none');
      
      rerender(
        <ThemeProvider>
          <Card
            title="Test Card"
            shadow="xl"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--shadow-xl');
    });

    it('renders with different hover effects', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Card
            title="Test Card"
            hoverEffect="lift"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--hover-lift');
      
      rerender(
        <ThemeProvider>
          <Card
            title="Test Card"
            hoverEffect="glow"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--hover-glow');
    });
  });

  describe('State Variants', () => {
    it('applies rounded class when rounded is true', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            rounded
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--rounded');
    });

    it('applies bordered class when bordered is true', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            bordered
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--bordered');
    });

    it('applies clickable class when clickable is true', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            clickable
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--clickable');
    });

    it('applies loading class when loading is true', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            loading
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--loading');
    });

    it('applies disabled class when disabled is true', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            disabled
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveClass('card-component--disabled');
    });
  });

  describe('Image and Badge', () => {
    it('renders image when provided', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            image="test-image.jpg"
            imageAlt="Test Image"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const image = screen.getByAltText('Test Image');
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    it('renders badge when provided', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            badge="NEW"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('NEW')).toBeInTheDocument();
    });

    it('applies image position classes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <Card
            title="Test Card"
            image="test-image.jpg"
            imagePosition="left"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--image-left');
      
      rerender(
        <ThemeProvider>
          <Card
            title="Test Card"
            image="test-image.jpg"
            imagePosition="right"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content').closest('.card-component')).toHaveClass('card-component--image-right');
    });
  });

  describe('Actions', () => {
    it('renders actions when provided', () => {
      const actions = <div data-testid="card-actions">Action Buttons</div>;
      
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            actions={actions}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByTestId('card-actions')).toBeInTheDocument();
    });
  });

  describe('Interaction', () => {
    it('calls onClick when clickable and clicked', () => {
      const mockOnClick = jest.fn();
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            clickable
            onClick={mockOnClick}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      fireEvent.click(card!);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when not clickable', () => {
      const mockOnClick = jest.fn();
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            onClick={mockOnClick}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      fireEvent.click(card!);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when disabled', () => {
      const mockOnClick = jest.fn();
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            clickable
            disabled
            onClick={mockOnClick}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      fireEvent.click(card!);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
      const mockOnClick = jest.fn();
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            clickable
            loading
            onClick={mockOnClick}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      fireEvent.click(card!);
      
      expect(mockOnClick).not.toHaveBeenCalled();
    });

    it('calls onMouseEnter and onMouseLeave when provided', () => {
      const mockOnMouseEnter = jest.fn();
      const mockOnMouseLeave = jest.fn();
      
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            onMouseEnter={mockOnMouseEnter}
            onMouseLeave={mockOnMouseLeave}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      fireEvent.mouseEnter(card!);
      fireEvent.mouseLeave(card!);
      
      expect(mockOnMouseEnter).toHaveBeenCalledTimes(1);
      expect(mockOnMouseLeave).toHaveBeenCalledTimes(1);
    });

    it('does not call mouse events when disabled', () => {
      const mockOnMouseEnter = jest.fn();
      const mockOnMouseLeave = jest.fn();
      
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            disabled
            onMouseEnter={mockOnMouseEnter}
            onMouseLeave={mockOnMouseLeave}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      fireEvent.mouseEnter(card!);
      fireEvent.mouseLeave(card!);
      
      expect(mockOnMouseEnter).not.toHaveBeenCalled();
      expect(mockOnMouseLeave).not.toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when clickable', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            clickable
            onClick={() => {}}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveAttribute('role', 'button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('has proper ARIA attributes when not clickable', () => {
      render(
        <ThemeProvider>
          <Card title="Test Card">
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).not.toHaveAttribute('role');
      expect(card).not.toHaveAttribute('tabIndex');
    });

    it('has proper ARIA attributes when disabled', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            clickable
            disabled
            onClick={() => {}}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveAttribute('aria-disabled', 'true');
    });
  });

  describe('Theme Integration', () => {
    it('integrates with theme system', () => {
      render(
        <ThemeProvider theme={customTheme}>
          <Card
            title="Test Card"
            color="color-success"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveStyle({ '--card-custom-bg': 'var(--color-success)' });
    });

    it('resolves theme values correctly', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            color="--color-primary"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveStyle({ '--card-custom-bg': 'var(--color-primary)' });
    });
  });

  describe('Edge Cases', () => {
    it('handles custom className and style props', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            className="custom-class"
            style={{ backgroundColor: 'red' }}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveAttribute('style');
      expect(card!.getAttribute('style')).toContain('background-color: red');
    });

    it('handles custom dimensions when provided', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            maxWidth="800px"
            minHeight="400px"
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      const card = screen.getByText('Card Content').closest('.card-component');
      expect(card).toHaveStyle({ maxWidth: '800px', minHeight: '400px' });
    });

    it('handles empty children', () => {
      render(
        <ThemeProvider>
          <Card title="Test Card">
            <div>Empty content</div>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Card')).toBeInTheDocument();
    });

    it('handles undefined optional props gracefully', () => {
      render(
        <ThemeProvider>
          <Card
            title="Test Card"
            onClick={undefined}
            onMouseEnter={undefined}
            onMouseLeave={undefined}
          >
            <p>Card Content</p>
          </Card>
        </ThemeProvider>
      );
      
      expect(screen.getByText('Card Content')).toBeInTheDocument();
    });
  });
});
