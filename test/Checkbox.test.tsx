import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Checkbox } from '../src/components/Checkbox/Checkbox';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Mock the utilities
jest.mock('../src/utils', () => ({
  resolveThemeValue: jest.fn((value) => value),
  getAriaProps: jest.fn(() => ({})),
  createRipple: jest.fn(() => jest.fn()),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Checkbox', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders with basic props', () => {
      renderWithTheme(<Checkbox label="Test checkbox" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
      expect(screen.getByText('Test checkbox')).toBeInTheDocument();
    });

    it('renders with description', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          description="This is a description" 
        />
      );
      expect(screen.getByText('This is a description')).toBeInTheDocument();
    });

    it('renders without label or description', () => {
      renderWithTheme(<Checkbox />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          className="custom-class" 
        />
      );
      expect(screen.getByRole('checkbox').closest('.custom-class')).toBeInTheDocument();
    });

    it('renders with custom style', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          style={{ backgroundColor: 'red' }} 
        />
      );
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveStyle({ 'background-color': 'rgb(255, 0, 0)' });
    });
  });

  describe('Variants', () => {
    it('renders with primary variant', () => {
      renderWithTheme(<Checkbox label="Test" variant="primary" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--primary');
    });

    it('renders with success variant', () => {
      renderWithTheme(<Checkbox label="Test" variant="success" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--success');
    });

    it('renders with warning variant', () => {
      renderWithTheme(<Checkbox label="Test" variant="warning" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--warning');
    });

    it('renders with danger variant', () => {
      renderWithTheme(<Checkbox label="Test" variant="danger" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--danger');
    });

    it('renders with ghost variant', () => {
      renderWithTheme(<Checkbox label="Test" variant="ghost" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--ghost');
    });

    it('renders with outline variant', () => {
      renderWithTheme(<Checkbox label="Test" variant="outline" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--outline');
    });
  });

  describe('Sizes', () => {
    it('renders with xs size', () => {
      renderWithTheme(<Checkbox label="Test" size="xs" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--xs');
    });

    it('renders with sm size', () => {
      renderWithTheme(<Checkbox label="Test" size="sm" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--sm');
    });

    it('renders with md size (default)', () => {
      renderWithTheme(<Checkbox label="Test" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--md');
    });

    it('renders with lg size', () => {
      renderWithTheme(<Checkbox label="Test" size="lg" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--lg');
    });

    it('renders with xl size', () => {
      renderWithTheme(<Checkbox label="Test" size="xl" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--xl');
    });
  });

  describe('States', () => {
    it('renders checked state', () => {
      renderWithTheme(<Checkbox label="Test" checked={true} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('renders unchecked state', () => {
      renderWithTheme(<Checkbox label="Test" checked={false} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
    });

    it('renders disabled state', () => {
      renderWithTheme(<Checkbox label="Test" disabled={true} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.disabled).toBe(true);
    });

    it('renders loading state', () => {
      renderWithTheme(<Checkbox label="Test" loading={true} />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--loading');
    });

    it('renders invalid state', () => {
      renderWithTheme(<Checkbox label="Test" invalid={true} />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--invalid');
    });

    it('renders indeterminate state', () => {
      renderWithTheme(<Checkbox label="Test" indeterminate={true} />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--indeterminate');
    });

    it('renders read-only state', () => {
      renderWithTheme(<Checkbox label="Test" readOnly={true} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.readOnly).toBe(true);
    });

    it('renders required state', () => {
      renderWithTheme(<Checkbox label="Test" required={true} />);
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.required).toBe(true);
    });
  });

  describe('Styling Options', () => {
    it('renders with rounded corners', () => {
      renderWithTheme(<Checkbox label="Test" rounded={true} />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--rounded');
    });

    it('renders with bordered style', () => {
      renderWithTheme(<Checkbox label="Test" bordered={true} />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--bordered');
    });

    it('renders with glassmorphism effect', () => {
      renderWithTheme(<Checkbox label="Test" glassmorphism={true} />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--glassmorphism');
    });

    it('renders with custom shadow', () => {
      renderWithTheme(<Checkbox label="Test" shadow="lg" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--shadow-lg');
    });

    it('renders with hover effect', () => {
      renderWithTheme(<Checkbox label="Test" hoverEffect="lift" />);
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveClass('checkbox-component--hover-lift');
    });
  });

  describe('Interactive Features', () => {
    it('calls onChange when clicked', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onChange={handleChange} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange when label is clicked', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onChange={handleChange} 
        />
      );
      
      const label = screen.getByText('Test checkbox');
      fireEvent.click(label);
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('toggles state when space key is pressed', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onChange={handleChange} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.keyDown(checkbox, { key: ' ' });
      
      expect(handleChange).toHaveBeenCalledWith(true);
    });

    it('does not call onChange when disabled', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          disabled={true}
          onChange={handleChange} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when loading', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          loading={true}
          onChange={handleChange} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when read-only', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          readOnly={true}
          onChange={handleChange} 
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.click(checkbox);
      
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('works as controlled component', () => {
      const handleChange = jest.fn();
      const { rerender } = renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          checked={false}
          onChange={handleChange} 
        />
      );
      
      let checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(false);
      
      rerender(
        <ThemeProvider>
          <Checkbox 
            label="Test checkbox" 
            checked={true}
            onChange={handleChange} 
          />
        </ThemeProvider>
      );
      
      checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });

    it('works as uncontrolled component', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          defaultChecked={true}
        />
      );
      
      const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
      expect(checkbox.checked).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes when required', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          required={true}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('required');
    });

    it('has proper ARIA attributes when invalid', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          invalid={true}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    });

    it('has proper ARIA attributes when disabled', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          disabled={true}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('disabled');
    });

    it('has proper ARIA attributes when checked', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          checked={true}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'true');
    });

    it('has proper ARIA attributes when indeterminate', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          indeterminate={true}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
    });
  });

  describe('Form Integration', () => {
    it('has proper name attribute', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          name="test-checkbox"
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('name', 'test-checkbox');
    });

    it('has proper value attribute', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          value="test-value"
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toHaveAttribute('value', 'test-value');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          ref={ref}
        />
      );
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe('Event Handlers', () => {
    it('calls onFocus when focused', () => {
      const handleFocus = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onFocus={handleFocus}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.focus(checkbox);
      
      expect(handleFocus).toHaveBeenCalled();
    });

    it('calls onBlur when blurred', () => {
      const handleBlur = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onBlur={handleBlur}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.focus(checkbox);
      fireEvent.blur(checkbox);
      
      expect(handleBlur).toHaveBeenCalled();
    });

    it('calls onKeyDown when key is pressed', () => {
      const handleKeyDown = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onKeyDown={handleKeyDown}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      fireEvent.keyDown(checkbox, { key: 'Enter' });
      
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom color', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          color="#ff0000"
        />
      );
      
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveStyle({ '--checkbox-custom-bg': '#ff0000' });
    });

    it('applies custom gradient', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          gradient="linear-gradient(45deg, #ff0000, #00ff00)"
        />
      );
      
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveStyle({ 
        '--checkbox-custom-bg': 'linear-gradient(45deg, #ff0000, #00ff00)' 
      });
    });

    it('applies custom text color', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          textColor="#ff0000"
        />
      );
      
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveStyle({ '--checkbox-custom-color': '#ff0000' });
    });

    it('applies custom border color', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          borderColor="#ff0000"
        />
      );
      
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveStyle({ '--checkbox-custom-border': '#ff0000' });
    });

    it('applies custom background color', () => {
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          backgroundColor="#ff0000"
        />
      );
      
      const checkbox = screen.getByRole('checkbox').closest('.checkbox-component');
      expect(checkbox).toHaveStyle({ '--checkbox-custom-bg': '#ff0000' });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty label gracefully', () => {
      renderWithTheme(<Checkbox label="" />);
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });

    it('handles undefined onChange gracefully', () => {
      renderWithTheme(<Checkbox label="Test checkbox" />);
      const checkbox = screen.getByRole('checkbox');
      
      expect(() => {
        fireEvent.click(checkbox);
      }).not.toThrow();
    });

    it('handles rapid clicks gracefully', () => {
      const handleChange = jest.fn();
      renderWithTheme(
        <Checkbox 
          label="Test checkbox" 
          onChange={handleChange}
        />
      );
      
      const checkbox = screen.getByRole('checkbox');
      
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      fireEvent.click(checkbox);
      
      expect(handleChange).toHaveBeenCalledTimes(3);
    });
  });
});
