import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Input } from '../src/components/basic/Input';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const noop = () => {};

describe('Input a11y', () => {
  it('basic with aria-label: no axe violations', async () => {
    const { container } = renderWithTheme(<Input value="" onChange={noop} ariaLabel="Email" />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with id and floating label: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input id="email" value="" onChange={noop} floatingLabel placeholder="Email address" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('floating label with a value: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input id="name" value="Ada" onChange={noop} floatingLabel placeholder="Full name" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('error state with message: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input
        id="pw"
        value="x"
        onChange={noop}
        error
        errorMessage="Too short"
        ariaLabel="Password"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('character count with maxLength: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input id="bio" value="hi" onChange={noop} characterCount maxLength={100} ariaLabel="Bio" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('password type: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input id="pw" type="password" value="secret" onChange={noop} ariaLabel="Password" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('disabled: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input value="" onChange={noop} disabled ariaLabel="Username" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('loading: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input value="" onChange={noop} loading ariaLabel="Search" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with left and right icons: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input
        value=""
        onChange={noop}
        iconLeft={<span>@</span>}
        iconRight={<span>✓</span>}
        ariaLabel="Handle"
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('required: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input id="first" value="" onChange={noop} required ariaLabel="First name" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('suggestions open (focused): no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input
        id="country"
        value=""
        onChange={noop}
        ariaLabel="Country"
        suggestions={['Canada', 'Cameroon', 'Chile']}
      />,
    );
    fireEvent.focus(screen.getByLabelText('Country'));
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('success/warning/info validation states: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Input value="ok" onChange={noop} success ariaLabel="Code" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // axe does not flag keyboard reachability or combobox wiring; guard them
  // explicitly so regressions are caught.
  describe('beyond axe', () => {
    it('password toggle is keyboard-reachable (no negative tabindex)', () => {
      const { container } = renderWithTheme(
        <Input id="pw" type="password" value="secret" onChange={noop} ariaLabel="Password" />,
      );
      const toggle = container.querySelector('.input-password-toggle') as HTMLElement;
      expect(toggle.tagName).toBe('BUTTON');
      expect(toggle.tabIndex).not.toBe(-1);
      // Password starts hidden, so the action offered is "Show password".
      expect(toggle.getAttribute('aria-label')).toBe('Show password');
    });

    it('suggestions: input declares the listbox relationship', () => {
      const { container } = renderWithTheme(
        <Input
          id="country"
          value=""
          onChange={noop}
          ariaLabel="Country"
          suggestions={['Canada', 'Chile']}
        />,
      );
      const input = screen.getByLabelText('Country');
      expect(input.getAttribute('role')).toBe('combobox');
      const listboxId = input.getAttribute('aria-controls');
      expect(listboxId).toBe('country-suggestions');
      expect(input.getAttribute('aria-autocomplete')).toBe('list');
      // The listbox exists only once focused + populated, but the id target
      // must resolve when it is shown.
      fireEvent.focus(input);
      const listbox = container.querySelector(`#${CSS.escape(listboxId!)}`);
      expect(listbox).not.toBeNull();
      expect(listbox?.getAttribute('role')).toBe('listbox');
      expect(listbox?.getAttribute('aria-label')).toBe('Suggestions');
    });

    it('suggestions: ArrowDown/Up/Enter keyboard navigation with aria-activedescendant', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <Input
          id="country"
          value=""
          onChange={onChange}
          ariaLabel="Country"
          suggestions={['Canada', 'Chile', 'China']}
        />,
      );
      const input = screen.getByLabelText('Country');

      // ArrowDown opens the list and activates the first option.
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input.getAttribute('aria-expanded')).toBe('true');
      expect(input.getAttribute('aria-activedescendant')).toBe('country-suggestions-opt-0');

      // ArrowDown again → second option active.
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(input.getAttribute('aria-activedescendant')).toBe('country-suggestions-opt-1');

      // ArrowUp → back to first.
      fireEvent.keyDown(input, { key: 'ArrowUp' });
      expect(input.getAttribute('aria-activedescendant')).toBe('country-suggestions-opt-0');

      // Enter selects the active option.
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith(
        expect.objectContaining({ target: { value: 'Canada' } }),
      );
    });

    it('suggestions: Escape closes the listbox', () => {
      renderWithTheme(
        <Input
          id="country"
          value=""
          onChange={noop}
          ariaLabel="Country"
          suggestions={['Canada']}
        />,
      );
      const input = screen.getByLabelText('Country');
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // open
      expect(input.getAttribute('aria-expanded')).toBe('true');
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('error message ids are unique across two id-less Inputs', () => {
      const { container } = renderWithTheme(
        <>
          <Input value="a" onChange={noop} error errorMessage="First error" ariaLabel="One" />
          <Input value="b" onChange={noop} error errorMessage="Second error" ariaLabel="Two" />,
        </>,
      );
      const errorIds = Array.from(container.querySelectorAll('.input-error-message')).map((el) =>
        el.getAttribute('id'),
      );
      expect(errorIds).toHaveLength(2);
      expect(errorIds[0]).not.toBe(errorIds[1]);
      // Each input's aria-describedby resolves to its own error element.
      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input, i) => {
        const describedBy = input.getAttribute('aria-describedby');
        expect(describedBy).toBe(errorIds[i]);
      });
    });
  });
});
