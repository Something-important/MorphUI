import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Combobox } from '../src/components/composition/Combobox';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { ComboboxOption } from '../src/components/composition/Combobox';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const fruits: ComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian', disabled: true },
];

describe('Combobox Component', () => {
  describe('Rendering', () => {
    it('renders an input with a placeholder', () => {
      renderWithTheme(<Combobox options={fruits} placeholder="Pick a fruit" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Pick a fruit')).toBeInTheDocument();
    });

    it('renders with variant and size classes', () => {
      const { container } = renderWithTheme(
        <Combobox options={fruits} variant="outline" size="lg" />,
      );
      expect(container.querySelector('.combobox-component')).toHaveClass(
        'combobox-component--outline',
        'combobox-component--lg',
      );
    });

    it('applies a custom className', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} className="my-combobox" />);
      expect(container.querySelector('.combobox-component')).toHaveClass('my-combobox');
    });

    it('disables the input when disabled', () => {
      renderWithTheme(<Combobox options={fruits} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  describe('Opening + filtering', () => {
    it('opens the listbox on focus', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens the listbox on ArrowDown', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('filters options as the user types (case-insensitive)', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'CH' } });
      expect(screen.getByText('Cherry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).toBeNull();
      expect(screen.queryByText('Banana')).toBeNull();
    });

    it('shows the empty message when no options match', () => {
      renderWithTheme(<Combobox options={fruits} emptyMessage="No fruit" />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'zzz' } });
      expect(screen.getByText('No fruit')).toBeInTheDocument();
    });

    it('closes the listbox on Escape', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  describe('Selection', () => {
    it('selects an option on click and calls onChange', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      fireEvent.mouseDown(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith('banana');
      expect(screen.getByRole('combobox')).toHaveValue('Banana');
    });

    it('selects the highlighted option on Enter', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input); // opens + highlights Apple (index 0)
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // highlight -> Banana (index 1)
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith('banana');
    });

    it('navigates with ArrowDown/ArrowUp (wraps)', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      // Apple -> Banana -> Cherry -> (wrap) Apple
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      // After 4 ArrowDowns on 3 enabled options (Apple, Banana, Cherry), highlight wraps.
      // Apple(0)->Banana(1)->Cherry(2)->Apple(0)
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByRole('combobox')).toHaveValue('Apple');
    });

    it('does not select a disabled option on click', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      fireEvent.click(screen.getByText('Durian'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clears the selection when clearable and Escape is pressed (list closed)', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <Combobox options={fruits} clearable onChange={onChange} defaultValue="banana" />,
      );
      const input = screen.getByRole('combobox');
      // First close if open, then Escape clears
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' }); // close list
      fireEvent.keyDown(input, { key: 'Escape' }); // clear
      expect(onChange).toHaveBeenCalledWith(null);
      expect(input).toHaveValue('');
    });

    it('renders the clear button when clearable and there is a value', () => {
      renderWithTheme(<Combobox options={fruits} clearable defaultValue="apple" />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(screen.getByLabelText('Clear')).toBeInTheDocument();
    });

    it('respects a controlled value', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} value="cherry" onChange={onChange} />);
      // The selected option label shows as placeholder when input is empty.
      expect(screen.getByPlaceholderText('Cherry')).toBeInTheDocument();
    });
  });

  describe('allowFreeText', () => {
    it('commits free text on Enter when allowFreeText is true', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} allowFreeText onChange={onChange} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Kiwi' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith('Kiwi');
    });

    it('does not commit free text when allowFreeText is false (no matching option)', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Kiwi' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Async loading', () => {
    it('calls loadOptions when opened and shows loading then results', async () => {
      const loadOptions = jest.fn((q: string) =>
        Promise.resolve([{ label: `${q}-result`, value: `${q}-result` }]),
      );
      renderWithTheme(<Combobox options={[]} loadOptions={loadOptions} />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(loadOptions).toHaveBeenCalled();
      // loading message appears (at least briefly)
      // results appear after the promise resolves
      const result = await screen.findByText('-result');
      expect(result).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('sets role="combobox" with aria-autocomplete="list"', () => {
      renderWithTheme(<Combobox options={fruits} ariaLabel="Fruit picker" />);
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-label', 'Fruit picker');
    });

    it('toggles aria-expanded with the listbox', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      fireEvent.focus(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('links aria-controls to the listbox id', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      const listbox = screen.getByRole('listbox');
      const controlsId = input.getAttribute('aria-controls');
      expect(controlsId).toBe(listbox.getAttribute('id'));
    });

    it('sets aria-activedescendant to the highlighted option', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const activeId = input.getAttribute('aria-activedescendant');
      expect(activeId).toBeTruthy();
      const highlighted = document.getElementById(activeId!);
      expect(highlighted).toBeInTheDocument();
      expect(highlighted).toHaveAttribute('role', 'option');
    });

    it('marks options with role="option" and aria-selected', () => {
      renderWithTheme(<Combobox options={fruits} defaultValue="banana" />);
      fireEvent.focus(screen.getByRole('combobox'));
      const opts = screen.getAllByRole('option');
      expect(opts.length).toBeGreaterThanOrEqual(4);
      const banana = opts.find((o) => o.textContent === 'Banana');
      expect(banana).toHaveAttribute('aria-selected', 'true');
    });
  });
});
