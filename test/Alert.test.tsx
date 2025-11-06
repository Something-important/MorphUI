import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Alert } from '../src/components/composition/Alert/Alert';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Mock timers for auto-dismiss tests
jest.useFakeTimers();

describe('Alert Component', () => {
  beforeEach(() => {
    jest.clearAllTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
  });

  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders alert with text', () => {
      render(
        <Alert open={true} position="top-right">
          Test alert message
        </Alert>,
      );
      expect(screen.getByText('Test alert message')).toBeInTheDocument();
    });

    it('renders alert with title', () => {
      render(
        <Alert open={true} position="top-right" title="Alert Title">
          Alert message
        </Alert>,
      );
      expect(screen.getByText('Alert Title')).toBeInTheDocument();
      expect(screen.getByText('Alert message')).toBeInTheDocument();
    });

    it('does not render when open is false', () => {
      render(
        <Alert open={false} position="top-right">
          Hidden alert
        </Alert>,
      );
      expect(screen.queryByText('Hidden alert')).not.toBeInTheDocument();
    });

    it('renders with defaultOpen', () => {
      render(
        <Alert defaultOpen={true} position="top-right">
          Default open alert
        </Alert>,
      );
      expect(screen.getByText('Default open alert')).toBeInTheDocument();
    });
  });

  // Variants
  describe('Variants', () => {
    const variants = ['success', 'warning', 'error', 'info', 'primary', 'secondary'] as const;

    variants.forEach((variant) => {
      it(`renders ${variant} variant`, () => {
        render(
          <Alert open={true} variant={variant} position="top-right">
            {variant} alert
          </Alert>,
        );
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass(`alert-component--${variant}`);
      });
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'] as const;

    sizes.forEach((size) => {
      it(`renders ${size} size`, () => {
        render(
          <Alert open={true} size={size} position="top-right">
            {size} alert
          </Alert>,
        );
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass(`alert-component--${size}`);
      });
    });
  });

  // Positions
  describe('Positions', () => {
    const positions = [
      'top-left',
      'top-center',
      'top-right',
      'bottom-left',
      'bottom-center',
      'bottom-right',
    ] as const;

    positions.forEach((position) => {
      it(`renders at ${position} position`, () => {
        render(
          <Alert open={true} position={position}>
            Positioned alert
          </Alert>,
        );
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass(`alert-component--${position}`);
      });
    });
  });

  // Animations
  describe('Animations', () => {
    const animations = ['fade', 'slide', 'scale', 'slide-up', 'slide-down'] as const;

    animations.forEach((animation) => {
      it(`renders with ${animation} animation`, () => {
        render(
          <Alert open={true} animation={animation} position="top-right">
            Animated alert
          </Alert>,
        );
        const alert = screen.getByRole('alert');
        expect(alert).toHaveClass(`alert-component--${animation}`);
      });
    });
  });

  // Dismissible
  describe('Dismissible', () => {
    it('shows dismiss button when dismissible is true', () => {
      const onClose = jest.fn();
      render(
        <Alert open={true} dismissible={true} onClose={onClose} position="top-right">
          Dismissible alert
        </Alert>,
      );
      const dismissButton = screen.getByLabelText('Close alert');
      expect(dismissButton).toBeInTheDocument();
    });

    it('does not show dismiss button when dismissible is false', () => {
      render(
        <Alert open={true} dismissible={false} position="top-right">
          Non-dismissible alert
        </Alert>,
      );
      expect(screen.queryByLabelText('Close alert')).not.toBeInTheDocument();
    });

    it('calls onClose when dismiss button is clicked', async () => {
      const onClose = jest.fn();
      render(
        <Alert open={true} dismissible={true} onClose={onClose} position="top-right">
          Dismissible alert
        </Alert>,
      );
      const dismissButton = screen.getByLabelText('Close alert');
      fireEvent.click(dismissButton);

      // Wait for animation timeout
      act(() => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  // Auto-dismiss
  describe('Auto-dismiss', () => {
    it('auto-dismisses after specified duration', async () => {
      const onClose = jest.fn();
      render(
        <Alert
          open={true}
          autoDismiss={true}
          dismissDuration={1000}
          onClose={onClose}
          position="top-right"
        >
          Auto-dismiss alert
        </Alert>,
      );

      act(() => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalledTimes(1);
      });
    });

    it('does not auto-dismiss when autoDismiss is false', async () => {
      const onClose = jest.fn();
      render(
        <Alert
          open={true}
          autoDismiss={false}
          dismissDuration={1000}
          onClose={onClose}
          position="top-right"
        >
          Persistent alert
        </Alert>,
      );

      act(() => {
        jest.advanceTimersByTime(2000);
      });

      await waitFor(() => {
        expect(onClose).not.toHaveBeenCalled();
      });
    });
  });

  // Icons
  describe('Icons', () => {
    it('shows default icon by variant when showIcon is true', () => {
      render(
        <Alert open={true} variant="success" showIcon={true} position="top-right">
          Alert with icon
        </Alert>,
      );
      const icon = screen.getByText('✓');
      expect(icon).toBeInTheDocument();
    });

    it('does not show icon when showIcon is false', () => {
      render(
        <Alert open={true} showIcon={false} position="top-right">
          Alert without icon
        </Alert>,
      );
      expect(screen.queryByText('✓')).not.toBeInTheDocument();
      expect(screen.queryByText('×')).not.toBeInTheDocument();
      expect(screen.queryByText('!')).not.toBeInTheDocument();
    });

    it('renders custom icon', () => {
      render(
        <Alert
          open={true}
          customIcon={<span data-testid="custom-icon">★</span>}
          position="top-right"
        >
          Alert with custom icon
        </Alert>,
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders provided icon prop', () => {
      render(
        <Alert open={true} icon={<span data-testid="icon-prop">🔔</span>} position="top-right">
          Alert with icon prop
        </Alert>,
      );
      expect(screen.getByTestId('icon-prop')).toBeInTheDocument();
    });
  });

  // Action button
  describe('Action Button', () => {
    it('renders action button when action prop is provided', () => {
      render(
        <Alert open={true} action="Retry" position="top-right">
          Error occurred
        </Alert>,
      );
      expect(screen.getByText('Retry')).toBeInTheDocument();
    });

    it('calls onActionClick when action button is clicked', () => {
      const onActionClick = jest.fn();
      render(
        <Alert open={true} action="Retry" onActionClick={onActionClick} position="top-right">
          Error occurred
        </Alert>,
      );
      const actionButton = screen.getByText('Retry');
      fireEvent.click(actionButton);
      expect(onActionClick).toHaveBeenCalledTimes(1);
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('renders with custom color', () => {
      render(
        <Alert open={true} color="#8b5cf6" position="top-right">
          Custom color alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ '--alert-custom-bg': '#8b5cf6' });
    });

    it('renders with custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      render(
        <Alert open={true} gradient={gradient} position="top-right">
          Gradient alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ '--alert-custom-bg': gradient });
      expect(alert).toHaveClass('alert-component--background-gradient');
    });

    it('renders with custom text color', () => {
      render(
        <Alert open={true} textColor="#ffffff" position="top-right">
          Custom text color alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ '--alert-custom-color': '#ffffff' });
    });

    it('renders with custom border color', () => {
      render(
        <Alert open={true} borderColor="#e5e7eb" position="top-right">
          Custom border alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ '--alert-custom-border': '#e5e7eb' });
    });

    it('gradient takes precedence over color', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      render(
        <Alert open={true} color="#8b5cf6" gradient={gradient} position="top-right">
          Gradient precedence alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveStyle({ '--alert-custom-bg': gradient });
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      render(
        <Alert open={true} style={{ backgroundColor: 'red', padding: '20px' }} position="top-right">
          Styled alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      // Check style attribute directly since inline styles override CSS
      const styleAttr = alert.getAttribute('style') || '';
      expect(styleAttr).toMatch(/background-color:\s*(red|rgb\(255,\s*0,\s*0\)|#ff0000)/i);
      expect(styleAttr).toMatch(/padding:\s*20px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      render(
        <Alert
          open={true}
          color="#8b5cf6"
          style={{ backgroundColor: 'purple' }}
          position="top-right"
        >
          Style precedence alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      // Inline style should override CSS custom property
      expect(alert.getAttribute('style')).toMatch(
        /background-color:\s*(purple|rgb\(128,\s*0,\s*128\)|#800080)/i,
      );
    });
  });

  // Glassmorphism
  describe('Glassmorphism', () => {
    it('applies glassmorphism class when enabled', () => {
      render(
        <Alert open={true} glassmorphism={true} position="top-right">
          Glassmorphism alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('alert-component--glassmorphism');
    });
  });

  // Full width
  describe('Full Width', () => {
    it('applies full-width class when enabled', () => {
      render(
        <Alert open={true} fullWidth={true} position="top-center">
          Full width alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveClass('alert-component--full-width');
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="alert"', () => {
      render(
        <Alert open={true} position="top-right">
          Accessible alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('has aria-live="assertive" for error variant', () => {
      render(
        <Alert open={true} variant="error" position="top-right">
          Error alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'assertive');
    });

    it('has aria-live="polite" for non-error variants', () => {
      render(
        <Alert open={true} variant="success" position="top-right">
          Success alert
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('supports aria-label', () => {
      render(
        <Alert open={true} ariaLabel="Custom alert label" position="top-right">
          Alert content
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-label', 'Custom alert label');
    });

    it('supports aria-describedby', () => {
      render(
        <Alert open={true} ariaDescribedBy="description-id" position="top-right">
          Alert content
        </Alert>,
      );
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-describedby', 'description-id');
    });
  });

  // Controlled vs Uncontrolled
  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const { rerender } = render(
        <Alert open={true} position="top-right">
          Controlled alert
        </Alert>,
      );
      expect(screen.getByText('Controlled alert')).toBeInTheDocument();

      rerender(
        <Alert open={false} position="top-right">
          Controlled alert
        </Alert>,
      );
      expect(screen.queryByText('Controlled alert')).not.toBeInTheDocument();
    });

    it('works as uncontrolled component', async () => {
      const onClose = jest.fn();
      render(
        <Alert defaultOpen={true} onClose={onClose} position="top-right">
          Uncontrolled alert
        </Alert>,
      );
      expect(screen.getByText('Uncontrolled alert')).toBeInTheDocument();

      const dismissButton = screen.getByLabelText('Close alert');
      fireEvent.click(dismissButton);

      // Wait for animation to complete
      act(() => {
        jest.advanceTimersByTime(300);
      });

      await waitFor(() => {
        expect(onClose).toHaveBeenCalled();
      });
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Alert open={true} variant="success" position="top-right">
            Themed alert
          </Alert>
        </ThemeProvider>,
      );
      expect(screen.getByText('Themed alert')).toBeInTheDocument();
    });
  });
});
