import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Form, FormField } from '../src/components/composition/Form';
import { Input } from '../src/components/basic/Input/Input';
import { Checkbox } from '../src/components/basic/Checkbox/Checkbox';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('Form Component', () => {
  it('renders a form element with default classes', () => {
    const { container } = renderWithTheme(<Form />);
    const form = container.querySelector('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveClass('form-component', 'form-component--default', 'form-component--md');
  });

  it('renders with variant and size classes', () => {
    const { container } = renderWithTheme(<Form variant="primary" size="lg" />);
    expect(container.querySelector('form')).toHaveClass(
      'form-component--primary',
      'form-component--lg',
    );
  });

  it('calls onSubmit when the form is submitted', () => {
    const onSubmit = jest.fn((e) => e.preventDefault());
    renderWithTheme(
      <Form onSubmit={onSubmit}>
        <button type="submit">Submit</button>
      </Form>,
    );
    fireEvent.click(screen.getByText('Submit'));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it('passes through extra form attributes', () => {
    renderWithTheme(<Form aria-label="Login form" id="login-form" />);
    const form = screen.getByRole('form', { name: 'Login form' });
    expect(form).toHaveAttribute('id', 'login-form');
  });

  it('renders children', () => {
    renderWithTheme(
      <Form>
        <span data-testid="child">field</span>
      </Form>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});

describe('FormField Component', () => {
  const baseInput = <Input value="" onChange={() => {}} placeholder="Enter name" />;

  it('renders a label, the control, and helper text', () => {
    renderWithTheme(
      <FormField label="Name" helperText="Your full name">
        {baseInput}
      </FormField>,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
    expect(screen.getByText('Your full name')).toHaveClass('form-field__helper');
  });

  it('renders the error with role="alert" and hides helper text', () => {
    renderWithTheme(
      <FormField label="Name" helperText="Your full name" error="Name is required">
        {baseInput}
      </FormField>,
    );
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Name is required');
    expect(error).toHaveClass('form-field__error');
    expect(screen.queryByText('Your full name')).toBeNull();
  });

  it('injects an id into the child and links the label via htmlFor', () => {
    renderWithTheme(<FormField label="Email">{baseInput}</FormField>);
    const input = screen.getByPlaceholderText('Enter name');
    const inputId = input.getAttribute('id');
    expect(inputId).toBeTruthy();
    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', inputId);
  });

  it('preserves an existing child id and uses it for the label', () => {
    renderWithTheme(
      <FormField label="Email">
        <Input id="custom-id" value="" onChange={() => {}} placeholder="Enter email" />
      </FormField>,
    );
    expect(screen.getByPlaceholderText('Enter email')).toHaveAttribute('id', 'custom-id');
    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', 'custom-id');
  });

  it('respects an explicit htmlFor prop', () => {
    renderWithTheme(
      <FormField label="Email" htmlFor="explicit-id">
        {baseInput}
      </FormField>,
    );
    expect(screen.getByText('Email').closest('label')).toHaveAttribute('for', 'explicit-id');
  });

  it('sets aria-invalid on the control when there is an error', () => {
    renderWithTheme(
      <FormField label="Name" error="Required">
        {baseInput}
      </FormField>,
    );
    expect(screen.getByPlaceholderText('Enter name')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when there is no error', () => {
    renderWithTheme(<FormField label="Name">{baseInput}</FormField>);
    expect(screen.getByPlaceholderText('Enter name')).not.toHaveAttribute('aria-invalid');
  });

  it('links aria-describedby to the error message when erroring', () => {
    renderWithTheme(
      <FormField label="Name" error="Required">
        {baseInput}
      </FormField>,
    );
    const input = screen.getByPlaceholderText('Enter name');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const errorEl = screen.getByRole('alert');
    expect(errorEl).toHaveAttribute('id');
    expect(describedBy).toContain(errorEl.getAttribute('id'));
  });

  it('links aria-describedby to the helper text when no error', () => {
    renderWithTheme(
      <FormField label="Name" helperText="Helpful text">
        {baseInput}
      </FormField>,
    );
    const input = screen.getByPlaceholderText('Enter name');
    const describedBy = input.getAttribute('aria-describedby');
    expect(describedBy).toBeTruthy();
    const helper = screen.getByText('Helpful text');
    expect(helper).toHaveAttribute('id');
    expect(describedBy).toContain(helper.getAttribute('id'));
  });

  it('renders the required indicator on the label', () => {
    renderWithTheme(
      <FormField label="Name" required>
        {baseInput}
      </FormField>,
    );
    expect(screen.getByText('Name').closest('label')).toHaveClass('label-component--required');
  });

  it('marks the field wrapper with the error class when erroring', () => {
    const { container } = renderWithTheme(
      <FormField label="Name" error="Required">
        {baseInput}
      </FormField>,
    );
    expect(container.querySelector('.form-field')).toHaveClass('form-field--error');
  });

  it('wraps a Checkbox control and links the label to it', () => {
    renderWithTheme(
      <FormField label="Accept terms">
        <Checkbox checked={false} onChange={() => {}} />
      </FormField>,
    );
    const checkbox = screen.getByRole('checkbox');
    const checkboxId = checkbox.getAttribute('id');
    expect(checkboxId).toBeTruthy();
    expect(screen.getByText('Accept terms').closest('label')).toHaveAttribute('for', checkboxId);
  });

  it('composes inside a Form', () => {
    const { container } = renderWithTheme(
      <Form>
        <FormField label="Name">
          <Input value="" onChange={() => {}} placeholder="Name" />
        </FormField>
        <FormField label="Email" error="Invalid">
          <Input value="" onChange={() => {}} placeholder="Email" />
        </FormField>
      </Form>,
    );
    expect(container.querySelector('form')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid');
  });
});
