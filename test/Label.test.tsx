import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from '../src/components/basic/Label/Label';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Label Component', () => {
  const defaultProps = {
    children: 'Test Label',
  };

  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      renderWithTheme(<Label {...defaultProps} />);
      expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('renders with htmlFor attribute', () => {
      renderWithTheme(<Label {...defaultProps} htmlFor="test-input" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'test-input');
      expect(label.tagName).toBe('LABEL');
    });

    it('renders required indicator when required is true', () => {
      renderWithTheme(<Label {...defaultProps} required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not render required indicator when required is false', () => {
      renderWithTheme(<Label {...defaultProps} required={false} />);
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies primary variant class', () => {
      renderWithTheme(<Label {...defaultProps} variant="primary" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--primary');
    });

    it('applies secondary variant class', () => {
      renderWithTheme(<Label {...defaultProps} variant="secondary" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--secondary');
    });

    it('applies success variant class', () => {
      renderWithTheme(<Label {...defaultProps} variant="success" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--success');
    });

    it('applies warning variant class', () => {
      renderWithTheme(<Label {...defaultProps} variant="warning" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--warning');
    });

    it('applies danger variant class', () => {
      renderWithTheme(<Label {...defaultProps} variant="danger" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--danger');
    });

    it('applies info variant class', () => {
      renderWithTheme(<Label {...defaultProps} variant="info" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--info');
    });
  });

  describe('Sizes', () => {
    it('applies xs size class', () => {
      renderWithTheme(<Label {...defaultProps} size="xs" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--xs');
    });

    it('applies sm size class', () => {
      renderWithTheme(<Label {...defaultProps} size="sm" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--sm');
    });

    it('applies md size class by default', () => {
      renderWithTheme(<Label {...defaultProps} />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--md');
    });

    it('applies lg size class', () => {
      renderWithTheme(<Label {...defaultProps} size="lg" />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--lg');
    });
  });

  describe('Custom Colors', () => {
    it('applies custom text color via CSS custom property', () => {
      renderWithTheme(<Label {...defaultProps} textColor="#3b82f6" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveStyle({ '--label-custom-color': '#3b82f6' });
    });

    it('applies custom required color via CSS custom property', () => {
      renderWithTheme(<Label {...defaultProps} required requiredColor="#ef4444" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveStyle({ '--label-custom-required-color': '#ef4444' });
    });
  });

  describe('Gradients', () => {
    it('applies text gradient class when textColor is a gradient', () => {
      renderWithTheme(
        <Label {...defaultProps} textColor="linear-gradient(90deg, #667eea 0%, #764ba2 100%)" />,
      );
      expect(screen.getByText('Test Label')).toHaveClass('label-component--text-gradient');
    });

    it('applies gradient via CSS custom property', () => {
      const gradient = 'linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)';
      renderWithTheme(<Label {...defaultProps} textColor={gradient} />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveStyle({ '--label-custom-color': gradient });
    });
  });

  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      renderWithTheme(
        <Label {...defaultProps} textColor="#10b981" style={{ fontSize: '20px', color: 'red' }} />,
      );
      const label = screen.getByText('Test Label');
      // User style should take precedence
      expect(label).toHaveStyle({ fontSize: '20px' });
      // Check style attribute directly for color (inline styles override CSS)
      const styleAttr = label.getAttribute('style') || '';
      expect(styleAttr).toMatch(/color:\s*red/i);
      // Component custom property should still be set
      expect(label.style.getPropertyValue('--label-custom-color')).toBe('#10b981');
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      renderWithTheme(
        <Label
          {...defaultProps}
          textColor="#3b82f6"
          style={{ '--label-custom-color': 'purple', color: 'orange' }}
        />,
      );
      const label = screen.getByText('Test Label');
      // Check style attribute directly for color (inline styles override CSS)
      const styleAttr = label.getAttribute('style') || '';
      expect(styleAttr).toMatch(/color:\s*orange/i);
      // Custom property from style should override component prop
      expect(label.style.getPropertyValue('--label-custom-color')).toBe('purple');
    });
  });

  describe('Accessibility', () => {
    it('associates label with form control via htmlFor', () => {
      renderWithTheme(<Label {...defaultProps} htmlFor="email-input" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveAttribute('for', 'email-input');
    });

    it('required indicator has aria-hidden attribute', () => {
      renderWithTheme(<Label {...defaultProps} required />);
      const requiredSpan = screen.getByText('*');
      expect(requiredSpan).toHaveAttribute('aria-hidden', 'true');
    });

    it('label element is accessible', () => {
      renderWithTheme(<Label {...defaultProps} htmlFor="test" />);
      const label = screen.getByText('Test Label');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });
  });

  describe('ClassName', () => {
    it('applies custom className', () => {
      renderWithTheme(<Label {...defaultProps} className="custom-class" />);
      expect(screen.getByText('Test Label')).toHaveClass('custom-class');
    });

    it('combines default classes with custom className', () => {
      renderWithTheme(<Label {...defaultProps} className="custom-class" variant="primary" />);
      const label = screen.getByText('Test Label');
      expect(label).toHaveClass('label-component');
      expect(label).toHaveClass('label-component--primary');
      expect(label).toHaveClass('custom-class');
    });
  });

  describe('Required State', () => {
    it('applies required class when required is true', () => {
      renderWithTheme(<Label {...defaultProps} required />);
      expect(screen.getByText('Test Label')).toHaveClass('label-component--required');
    });

    it('shows required indicator with proper styling', () => {
      renderWithTheme(<Label {...defaultProps} required />);
      const requiredSpan = screen.getByText('*');
      expect(requiredSpan).toHaveClass('label-component__required');
    });
  });
});
