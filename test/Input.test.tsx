import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../src/components/basic/Input/Input';
import { createRipple, getAriaProps } from '../src/utils';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Mock the utilities
jest.mock('../src/utils', () => ({
  resolveThemeValue: jest.fn((value) => value),
  createRipple: jest.fn(() => jest.fn()),
  getAriaProps: jest.fn((props) => {
    const aria: Record<string, string | boolean> = {};
    if (props.label) aria['aria-label'] = props.label;
    if (props.describedBy) aria['aria-describedby'] = props.describedBy;
    if (props.required !== undefined) aria['aria-required'] = props.required;
    if (props.invalid !== undefined) aria['aria-invalid'] = props.invalid;
    return aria;
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Input Component', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
    placeholder: 'Test placeholder',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic Rendering', () => {
    it('renders with basic props', () => {
      renderWithTheme(<Input {...defaultProps} />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeInTheDocument();
    });

    it('renders with custom id and name', () => {
      renderWithTheme(<Input {...defaultProps} id="test-id" name="test-name" />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toHaveAttribute('id', 'test-id');
      expect(input).toHaveAttribute('name', 'test-name');
    });

    it('renders with different input types', () => {
      const { rerender } = renderWithTheme(<Input {...defaultProps} type="email" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'email');

      rerender(<Input {...defaultProps} type="password" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'password');

      rerender(<Input {...defaultProps} type="number" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveAttribute('type', 'number');
    });
  });

  describe('Variants and Sizes', () => {
    it('applies variant classes correctly', () => {
      const { rerender } = renderWithTheme(<Input {...defaultProps} variant="primary" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--primary',
      );

      rerender(<Input {...defaultProps} variant="success" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--success',
      );
    });

    it('applies size classes correctly', () => {
      const { rerender } = renderWithTheme(<Input {...defaultProps} size="sm" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass('input-component--sm');

      rerender(<Input {...defaultProps} size="lg" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass('input-component--lg');
    });

    it('applies fullWidth class when specified', () => {
      renderWithTheme(<Input {...defaultProps} fullWidth />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--full-width',
      );
    });

    it('applies rounded class when specified', () => {
      renderWithTheme(<Input {...defaultProps} rounded />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--rounded',
      );
    });
  });

  describe('Icons', () => {
    it('renders left icon', () => {
      renderWithTheme(<Input {...defaultProps} iconLeft={<span>🔍</span>} />);
      expect(screen.getByText('🔍')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--has-left-icon',
      );
    });

    it('renders right icon', () => {
      renderWithTheme(<Input {...defaultProps} iconRight={<span>✓</span>} />);
      expect(screen.getByText('✓')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--has-right-icon',
      );
    });

    it('renders both icons', () => {
      renderWithTheme(
        <Input {...defaultProps} iconLeft={<span>🔍</span>} iconRight={<span>✓</span>} />,
      );
      expect(screen.getByText('🔍')).toBeInTheDocument();
      expect(screen.getByText('✓')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--has-left-icon',
      );
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--has-right-icon',
      );
    });
  });

  describe('Floating Labels', () => {
    it('renders floating label when enabled', () => {
      renderWithTheme(<Input {...defaultProps} floatingLabel />);
      expect(screen.getByText('Test placeholder')).toBeInTheDocument();
      // When floating label is enabled, the input has no placeholder
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('input-component--floating-label');
    });

    it('activates floating label when focused', async () => {
      renderWithTheme(<Input {...defaultProps} floatingLabel />);
      const input = screen.getByRole('textbox');
      const label = screen.getByText('Test placeholder');

      fireEvent.focus(input);
      await waitFor(() => {
        expect(label).toHaveClass('input-floating-label--active');
      });
    });

    it('activates floating label when has value', () => {
      renderWithTheme(<Input {...defaultProps} floatingLabel value="test value" />);
      const label = screen.getByText('Test placeholder');
      expect(label).toHaveClass('input-floating-label--active');
    });
  });

  describe('Password Input', () => {
    it('renders password toggle button', () => {
      renderWithTheme(<Input {...defaultProps} type="password" />);
      const toggleButton = screen.getByLabelText('Show password');
      expect(toggleButton).toBeInTheDocument();
    });

    it('toggles password visibility', async () => {
      renderWithTheme(<Input {...defaultProps} type="password" />);
      const input = screen.getByPlaceholderText('Test placeholder');
      const toggleButton = screen.getByLabelText('Show password');

      expect(input).toHaveAttribute('type', 'password');

      fireEvent.click(toggleButton);
      await waitFor(() => expect(input).toHaveAttribute('type', 'text'));
      await waitFor(() => expect(toggleButton).toHaveAttribute('aria-label', 'Hide password'));
    });
  });

  describe('Input Masks', () => {
    it('applies phone mask', async () => {
      const onChange = jest.fn();
      renderWithTheme(<Input {...defaultProps} mask="phone" onChange={onChange} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      // Simulate typing the full phone number
      fireEvent.change(input, { target: { value: '1234567890' } });

      // The mask should be applied in the onChange handler
      expect(onChange).toHaveBeenCalled();
      // Check that the input value was modified by the mask
      const calls = onChange.mock.calls;
      const lastCall = calls[calls.length - 1];
      expect(lastCall[0].target.value).toBe('(123) 456-7890');
    });

    it('applies credit card mask', async () => {
      const onChange = jest.fn();
      renderWithTheme(<Input {...defaultProps} mask="credit-card" onChange={onChange} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      // Simulate typing the full credit card number
      fireEvent.change(input, { target: { value: '1234567890123456' } });

      // The mask should be applied in the onChange handler
      expect(onChange).toHaveBeenCalled();
      // Check that the input value was modified by the mask
      const calls = onChange.mock.calls;
      const lastCall = calls[calls.length - 1];
      expect(lastCall[0].target.value).toBe('1234 5678 9012 3456');
    });
  });

  describe('Validation', () => {
    it('shows validation error message', () => {
      renderWithTheme(
        <Input {...defaultProps} error={true} errorMessage="This field is required" />,
      );
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('applies error state class', () => {
      renderWithTheme(<Input {...defaultProps} error={true} />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toHaveClass('input-component--error');
    });

    it('applies success state class', () => {
      renderWithTheme(<Input {...defaultProps} success={true} />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toHaveClass('input-component--success');
    });

    it('applies warning state class', () => {
      renderWithTheme(<Input {...defaultProps} warning={true} />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toHaveClass('input-component--warning');
    });

    it('applies info state class', () => {
      renderWithTheme(<Input {...defaultProps} info={true} />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toHaveClass('input-component--info');
    });

    it('shows validation state icons', () => {
      renderWithTheme(<Input {...defaultProps} success={true} />);
      expect(screen.getByText('✓')).toBeInTheDocument();
    });

    it('shows warning icon when warning state is active', () => {
      renderWithTheme(<Input {...defaultProps} warning={true} />);
      expect(screen.getByText('!')).toBeInTheDocument();
    });

    it('shows info icon when info state is active', () => {
      renderWithTheme(<Input {...defaultProps} info={true} />);
      expect(screen.getByText('i')).toBeInTheDocument();
    });

    it('shows error icon when error state is active', () => {
      renderWithTheme(<Input {...defaultProps} error={true} />);
      expect(screen.getByText('×')).toBeInTheDocument();
    });

    it('applies wrapper classes for validation icons', () => {
      renderWithTheme(<Input {...defaultProps} success={true} />);
      const wrapper = screen.getByPlaceholderText('Test placeholder').closest('.input-wrapper');
      expect(wrapper).toHaveClass('input-wrapper--has-right-icon');
    });

    it('applies validation icon CSS classes', () => {
      renderWithTheme(<Input {...defaultProps} error={true} />);
      const errorIcon = screen.getByText('×');
      expect(errorIcon).toHaveClass('validation-icon-error');
    });
  });

  describe('Character Count', () => {
    it('shows character count when enabled', () => {
      renderWithTheme(<Input {...defaultProps} value="test" maxLength={50} characterCount />);
      expect(screen.getByText('4/50')).toBeInTheDocument();
    });

    it('does not show character count when disabled', () => {
      renderWithTheme(
        <Input {...defaultProps} value="test" maxLength={50} characterCount={false} />,
      );
      expect(screen.queryByText('4/50')).not.toBeInTheDocument();
    });

    it('applies wrapper classes for character count positioning', () => {
      renderWithTheme(<Input {...defaultProps} characterCount maxLength={50} />);
      const wrapper = screen.getByPlaceholderText('Test placeholder').closest('.input-wrapper');
      expect(wrapper).toHaveClass('input-wrapper--has-character-count');
    });

    it('shows custom character count limit', () => {
      renderWithTheme(
        <Input {...defaultProps} value="test" characterCount characterCountLimit={25} />,
      );
      expect(screen.getByText('4/25')).toBeInTheDocument();
    });

    it('enforces maxLength when typing', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <Input {...defaultProps} value="test" maxLength={5} characterCount onChange={onChange} />,
      );
      const input = screen.getByPlaceholderText('Test placeholder');

      // Verify initial state
      expect(input).toHaveValue('test');
      expect(screen.getByText('4/5')).toBeInTheDocument();

      // Verify that maxLength attribute is set
      expect(input).toHaveAttribute('maxLength', '5');
    });

    it('enforces characterCountLimit when typing', async () => {
      const onChange = jest.fn();
      renderWithTheme(
        <Input
          {...defaultProps}
          value="test"
          maxLength={100}
          characterCountLimit={25}
          characterCount
          onChange={onChange}
        />,
      );
      const input = screen.getByPlaceholderText('Test placeholder');

      // Verify initial state
      expect(input).toHaveValue('test');
      expect(screen.getByText('4/25')).toBeInTheDocument();

      // Verify that characterCountLimit takes precedence over maxLength
      expect(input).toHaveAttribute('maxLength', '25');
    });
  });

  describe('Suggestions', () => {
    const suggestions = ['React', 'TypeScript', 'JavaScript'];

    it('shows suggestions dropdown on focus', async () => {
      renderWithTheme(<Input {...defaultProps} suggestions={suggestions} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.focus(input);
      expect(await screen.findByText('React')).toBeInTheDocument();
      expect(await screen.findByText('TypeScript')).toBeInTheDocument();
      expect(await screen.findByText('JavaScript')).toBeInTheDocument();
    });

    it('filters suggestions based on input', async () => {
      renderWithTheme(<Input {...defaultProps} suggestions={suggestions} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.focus(input);
      // Wait for suggestions to appear
      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
      });

      // Type to filter
      fireEvent.change(input, { target: { value: 'Re' } });

      await screen.findByText('React');
      await waitFor(() => expect(screen.queryByText('TypeScript')).not.toBeInTheDocument());
      await waitFor(() => expect(screen.queryByText('JavaScript')).not.toBeInTheDocument());
    });

    it('calls onSuggestionSelect when suggestion is clicked', async () => {
      const onSuggestionSelect = jest.fn();
      renderWithTheme(
        <Input
          {...defaultProps}
          suggestions={suggestions}
          onSuggestionSelect={onSuggestionSelect}
        />,
      );
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.focus(input);
      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('React'));
      expect(onSuggestionSelect).toHaveBeenCalledWith('React');
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner', () => {
      renderWithTheme(<Input {...defaultProps} loading />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--loading',
      );
      expect(document.querySelector('.input-spinner')).toBeInTheDocument();
    });

    it('disables input when loading', () => {
      renderWithTheme(<Input {...defaultProps} loading />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeDisabled();
    });
  });

  describe('Disabled State', () => {
    it('disables input when disabled prop is true', () => {
      renderWithTheme(<Input {...defaultProps} disabled />);
      expect(screen.getByPlaceholderText('Test placeholder')).toBeDisabled();
    });

    it('applies disabled styling', () => {
      renderWithTheme(<Input {...defaultProps} disabled />);
      const input = screen.getByPlaceholderText('Test placeholder');
      expect(input).toBeDisabled();
      // The disabled class is applied via CSS, but the element is actually disabled
      expect(input).toHaveAttribute('disabled');
    });
  });

  describe('Hover Effects', () => {
    it('applies lift hover effect', () => {
      renderWithTheme(<Input {...defaultProps} hoverEffect="lift" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--hover-lift',
      );
    });

    it('applies glow hover effect', () => {
      renderWithTheme(<Input {...defaultProps} hoverEffect="glow" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--hover-glow',
      );
    });

    it('applies scale hover effect', () => {
      renderWithTheme(<Input {...defaultProps} hoverEffect="scale" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--hover-scale',
      );
    });
  });

  describe('Shadows', () => {
    it('applies different shadow classes', () => {
      const { rerender } = renderWithTheme(<Input {...defaultProps} shadow="sm" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--shadow-sm',
      );

      rerender(<Input {...defaultProps} shadow="lg" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--shadow-lg',
      );

      rerender(<Input {...defaultProps} shadow="2xl" />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--shadow-2xl',
      );
    });
  });

  describe('Ripple Effect', () => {
    it('applies ripple class when enabled', () => {
      renderWithTheme(<Input {...defaultProps} ripple />);
      expect(screen.getByPlaceholderText('Test placeholder')).toHaveClass(
        'input-component--ripple',
      );
    });

    it('creates ripple effect on click', async () => {
      renderWithTheme(<Input {...defaultProps} ripple />);
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.click(input);
      expect(createRipple).toHaveBeenCalled();
    });
  });

  describe('Custom Styling', () => {
    it('applies custom border radius', () => {
      renderWithTheme(<Input {...defaultProps} borderRadius={16} />);
      const wrapper = screen.getByPlaceholderText('Test placeholder').closest('.input-wrapper');
      expect(wrapper).toHaveStyle({ '--input-custom-border-radius': '16px' });
    });

    it('applies backdrop blur', () => {
      renderWithTheme(<Input {...defaultProps} backdropBlur />);
      const wrapper = screen.getByPlaceholderText('Test placeholder').closest('.input-wrapper');
      expect(wrapper).toHaveStyle({ '--input-custom-backdrop-blur': 'blur(8px)' });
    });
  });

  describe('Event Handling', () => {
    it('calls onChange when input value changes', async () => {
      const onChange = jest.fn();
      renderWithTheme(<Input {...defaultProps} onChange={onChange} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      await userEvent.type(input, 'test');
      expect(onChange).toHaveBeenCalled();
    });

    it('calls onClick when input is clicked', () => {
      const onClick = jest.fn();
      renderWithTheme(<Input {...defaultProps} onClick={onClick} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.click(input);
      expect(onClick).toHaveBeenCalled();
    });

    it('calls onFocus when input is focused', () => {
      const onFocus = jest.fn();
      renderWithTheme(<Input {...defaultProps} onFocus={onFocus} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.focus(input);
      expect(onFocus).toHaveBeenCalled();
    });

    it('calls onBlur when input loses focus', () => {
      const onBlur = jest.fn();
      renderWithTheme(<Input {...defaultProps} onBlur={onBlur} />);
      const input = screen.getByPlaceholderText('Test placeholder');

      fireEvent.blur(input);
      expect(onBlur).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('applies proper ARIA attributes', () => {
      renderWithTheme(<Input {...defaultProps} ariaLabel="Test input" required error />);

      expect(getAriaProps).toHaveBeenCalledWith({
        label: 'Test input',
        describedBy: undefined,
        required: true,
        invalid: true,
      });
    });

    it('associates error message with input', () => {
      renderWithTheme(
        <Input {...defaultProps} id="test-input" error errorMessage="This field is required" />,
      );

      const input = screen.getByPlaceholderText('Test placeholder');
      const errorMessage = screen.getByText('This field is required');

      expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
      expect(errorMessage).toHaveAttribute('id', 'test-input-error');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      renderWithTheme(<Input {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current).toHaveAttribute('placeholder', 'Test placeholder');
    });
  });
});

// Coverage edge cases: color mapping, mask, limit, validation, ref, suggestions
describe('Coverage edge cases', () => {
  it('applies phone mask to the value', () => {
    const onChange = jest.fn();
    renderWithTheme(<Input value="" onChange={onChange} mask="phone" ariaLabel="Phone" />);
    const input = screen.getByLabelText('Phone');
    fireEvent.change(input, { target: { value: '1234567890' } });
    expect(onChange.mock.calls[0][0].target.value).toBe('(123) 456-7890');
  });

  it('applies credit-card mask to the value', () => {
    const onChange = jest.fn();
    renderWithTheme(<Input value="" onChange={onChange} mask="credit-card" ariaLabel="Card" />);
    const input = screen.getByLabelText('Card');
    fireEvent.change(input, { target: { value: '1234567890123456' } });
    expect(onChange.mock.calls[0][0].target.value).toBe('1234 5678 9012 3456');
  });

  it('enforces characterCountLimit (blocks input over the limit)', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <Input value="abc" onChange={onChange} characterCountLimit={5} ariaLabel="Limited" />,
    );
    const input = screen.getByLabelText('Limited');
    // Type to exceed the limit (6 chars) — should be blocked.
    fireEvent.change(input, { target: { value: 'abcdef' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('shows validation error for required field', () => {
    const { container } = renderWithTheme(
      <Input
        value="initial"
        onChange={jest.fn()}
        validation={{ required: true }}
        ariaLabel="Required"
      />,
    );
    const input = screen.getByLabelText('Required');
    fireEvent.change(input, { target: { value: '' } });
    expect(container.querySelector('.input-error-message')).toHaveTextContent(
      'This field is required',
    );
  });

  it('shows validation error for min length', () => {
    const { container } = renderWithTheme(
      <Input value="initial" onChange={jest.fn()} validation={{ min: 5 }} ariaLabel="Min" />,
    );
    const input = screen.getByLabelText('Min');
    fireEvent.change(input, { target: { value: 'ab' } });
    expect(container.querySelector('.input-error-message')).toHaveTextContent(
      'Minimum 5 characters required',
    );
  });

  it('shows validation error for pattern mismatch', () => {
    const { container } = renderWithTheme(
      <Input
        value="initial"
        onChange={jest.fn()}
        validation={{ pattern: /^\d+$/ }}
        ariaLabel="Digits"
      />,
    );
    const input = screen.getByLabelText('Digits');
    fireEvent.change(input, { target: { value: 'abc' } });
    expect(container.querySelector('.input-error-message')).toHaveTextContent('Invalid format');
  });

  it('shows validation error from custom validator', () => {
    const { container } = renderWithTheme(
      <Input
        value="initial"
        onChange={jest.fn()}
        validation={{ custom: () => 'Custom error' }}
        ariaLabel="Custom"
      />,
    );
    const input = screen.getByLabelText('Custom');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(container.querySelector('.input-error-message')).toHaveTextContent('Custom error');
  });

  it('click outside closes the suggestions', () => {
    renderWithTheme(
      <Input value="" onChange={jest.fn()} suggestions={['A', 'B']} ariaLabel="Search" />,
    );
    const input = screen.getByLabelText('Search');
    fireEvent.focus(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('forwards a ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>();
    renderWithTheme(<Input ref={ref} value="" onChange={jest.fn()} ariaLabel="Ref" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('selects a suggestion via click', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <Input value="" onChange={onChange} suggestions={['Apple', 'Banana']} ariaLabel="Fruit" />,
    );
    fireEvent.focus(screen.getByLabelText('Fruit'));
    fireEvent.click(screen.getByText('Apple'));
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'Apple' } }));
  });

  it('selects a suggestion via Enter keyDown', () => {
    const onChange = jest.fn();
    renderWithTheme(
      <Input value="" onChange={onChange} suggestions={['Apple', 'Banana']} ariaLabel="Fruit" />,
    );
    fireEvent.focus(screen.getByLabelText('Fruit'));
    const option = screen.getByText('Banana');
    fireEvent.keyDown(option, { key: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ target: { value: 'Banana' } }));
  });
});
