import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { RadioGroup } from '../src/components/RadioGroup/RadioGroup';
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

const mockOptions = [
  { label: 'Option 1', value: 'option1', description: 'First option' },
  { label: 'Option 2', value: 'option2', description: 'Second option' },
  { label: 'Option 3', value: 'option3', description: 'Third option' },
];

const mockOptionsWithDisabled = [
  { label: 'Option 1', value: 'option1', description: 'First option' },
  { label: 'Option 2', value: 'option2', description: 'Second option', disabled: true },
  { label: 'Option 3', value: 'option3', description: 'Third option' },
];

describe('RadioGroup', () => {
  describe('Basic Rendering', () => {
    it('renders radio group with options', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });

    it('renders with label and description', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            label="Test Label"
            description="Test Description"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders required indicator when required is true', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            label="Test Label"
            required
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('renders error message when invalid', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            invalid
            errorMessage="This field is required"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('renders no options message when options array is empty', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={[]}
            value={undefined}
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('No options available')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders with primary variant by default', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--primary');
    });

    it('renders with different variants', () => {
      const { rerender } = render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            variant="success"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--success');
      
      rerender(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            variant="warning"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--warning');
    });

    it('applies custom color when provided', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            color="#ff0000"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveStyle({ '--radio-group-custom-bg': '#ff0000' });
    });

    it('applies custom gradient when provided', () => {
      const gradient = 'linear-gradient(90deg, #ff0000 0%, #00ff00 100%)';
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            gradient={gradient}
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveStyle({ '--radio-group-custom-bg': gradient });
    });
  });

  describe('Sizes', () => {
    it('renders with medium size by default', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--md');
    });

    it('renders with different sizes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            size="sm"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--sm');
      
      rerender(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            size="lg"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--lg');
    });
  });

  describe('Directions', () => {
    it('renders with vertical direction by default', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--vertical');
    });

    it('renders with horizontal direction', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            direction="horizontal"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--horizontal');
    });
  });

  describe('Effects and Styling', () => {
    it('applies shadow classes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            shadow="lg"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--shadow-lg');
      
      rerender(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            shadow="xl"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--shadow-xl');
    });

    it('applies hover effect classes', () => {
      const { rerender } = render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            hoverEffect="lift"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--hover-lift');
      
      rerender(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            hoverEffect="glow"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByRole('radiogroup')).toHaveClass('radio-group-component--hover-glow');
    });

    it('applies rounded class when rounded is true', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            rounded
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--rounded');
    });
  });

  describe('States', () => {
    it('applies disabled class when disabled is true', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            disabled
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--disabled');
    });

    it('applies invalid class when invalid is true', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            invalid
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('radio-group-component--invalid');
    });

    it('disables individual options when option.disabled is true', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptionsWithDisabled}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      const disabledOption = screen.getByText('Option 2').closest('label');
      expect(disabledOption).toHaveClass('disabled');
    });
  });

  describe('Interaction', () => {
    it('calls onChange when an option is selected', () => {
      const mockOnChange = jest.fn();
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={mockOnChange}
            name="test"
          />
        </ThemeProvider>
      );
      
      const option2 = screen.getByText('Option 2').closest('label')!;
      fireEvent.click(option2);
      
      expect(mockOnChange).toHaveBeenCalledWith('option2');
    });

    it('does not call onChange when disabled', () => {
      const mockOnChange = jest.fn();
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={mockOnChange}
            name="test"
            disabled
          />
        </ThemeProvider>
      );
      
      const option2 = screen.getByText('Option 2').closest('label')!;
      fireEvent.click(option2);
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('does not call onChange when individual option is disabled', () => {
      const mockOnChange = jest.fn();
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptionsWithDisabled}
            value="option1"
            onChange={mockOnChange}
            name="test"
          />
        </ThemeProvider>
      );
      
      const disabledOption = screen.getByText('Option 2').closest('label')!;
      fireEvent.click(disabledOption);
      
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('handles keyboard navigation', () => {
      const mockOnChange = jest.fn();
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={mockOnChange}
            name="test"
          />
        </ThemeProvider>
      );
      
      const option1 = screen.getByText('Option 1').closest('label')!;
      option1.focus();
      
      // Test arrow down navigation
      fireEvent.keyDown(option1, { key: 'ArrowDown' });
      expect(mockOnChange).toHaveBeenCalledWith('option2');
      
      // Test arrow up navigation
      fireEvent.keyDown(option1, { key: 'ArrowUp' });
      expect(mockOnChange).toHaveBeenCalledWith('option3');
      
      // Test space key selection
      fireEvent.keyDown(option1, { key: ' ' });
      expect(mockOnChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            label="Test Group"
            required
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveAttribute('aria-label', 'Test Group');
      expect(radioGroup).toHaveAttribute('aria-required', 'true');
    });

    it('has proper ARIA attributes for individual options', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      const option1Input = screen.getByDisplayValue('option1');
      const option2Input = screen.getByDisplayValue('option2');
      
      expect(option1Input).toHaveAttribute('aria-checked', 'true');
      expect(option2Input).toHaveAttribute('aria-checked', 'false');
    });

    it('has proper tabindex for keyboard navigation', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      const options = screen.getAllByRole('radio');
      options.forEach(option => {
        expect(option.closest('label')).toHaveAttribute('tabindex', '0');
      });
    });
  });

  describe('Theme Integration', () => {
    it('integrates with theme system', () => {
      render(
        <ThemeProvider theme={customTheme}>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            color="color-success"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveStyle({ '--radio-group-custom-bg': 'var(--color-success)' });
    });

    it('resolves theme values correctly', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            color="--color-primary"
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveStyle({ '--radio-group-custom-bg': 'var(--color-primary)' });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty options array gracefully', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={[]}
            value={undefined}
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      expect(screen.getByText('No options available')).toBeInTheDocument();
    });

    it('handles undefined value gracefully', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value={undefined}
            onChange={() => {}}
            name="test"
          />
        </ThemeProvider>
      );
      
      // Should render without errors
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('handles custom className and style props', () => {
      render(
        <ThemeProvider>
          <RadioGroup
            options={mockOptions}
            value="option1"
            onChange={() => {}}
            name="test"
            className="custom-class"
            style={{ backgroundColor: 'red' }}
          />
        </ThemeProvider>
      );
      
      const radioGroup = screen.getByRole('radiogroup');
      expect(radioGroup).toHaveClass('custom-class');
      expect(radioGroup).toHaveStyle({ backgroundColor: 'red' });
    });
  });
});
