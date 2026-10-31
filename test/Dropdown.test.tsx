import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from '../src/components/interactive/Dropdown';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { DropdownOption } from '../src/components/interactive/Dropdown';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const fruits: DropdownOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian', disabled: true },
];

/** The root container carries role="combobox" (ARIA 1.2 pattern). */
const getRoot = () => screen.getByRole('combobox');

describe('Dropdown Component', () => {
  describe('Rendering', () => {
    it('renders a closed dropdown with a placeholder', () => {
      renderWithTheme(<Dropdown options={fruits} placeholder="Pick a fruit" />);
      expect(getRoot()).toBeInTheDocument();
      expect(getRoot()).toHaveAttribute('aria-expanded', 'false');
      expect(screen.getByText('Pick a fruit')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('applies variant and size classes', () => {
      const { container } = renderWithTheme(
        <Dropdown options={fruits} variant="outline" size="lg" />,
      );
      const root = container.querySelector('.dropdown-container');
      expect(root).toHaveClass('dropdown-container--outline', 'dropdown-container--lg');
    });

    it('applies a custom className', () => {
      const { container } = renderWithTheme(<Dropdown options={fruits} className="my-dropdown" />);
      expect(container.querySelector('.dropdown-container')).toHaveClass('my-dropdown');
    });

    it('shows the selected value label on the trigger', () => {
      renderWithTheme(<Dropdown options={fruits} value="banana" />);
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('exposes a displayName', () => {
      expect(Dropdown.displayName).toBe('Dropdown');
    });
  });

  describe('Open/close behavior', () => {
    it('opens the listbox on trigger click', () => {
      renderWithTheme(<Dropdown options={fruits} />);
      fireEvent.click(getRoot());
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      expect(getRoot()).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders all options inside the listbox', () => {
      renderWithTheme(<Dropdown options={fruits} />);
      fireEvent.click(getRoot());
      fruits.forEach((opt) => {
        expect(screen.getByText(opt.label)).toBeInTheDocument();
      });
    });

    it('does not open when disabled', () => {
      renderWithTheme(<Dropdown options={fruits} disabled />);
      fireEvent.click(getRoot());
      expect(getRoot()).toHaveAttribute('aria-disabled', 'true');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('notifies onOpenChange', () => {
      const onOpenChange = jest.fn();
      renderWithTheme(<Dropdown options={fruits} onOpenChange={onOpenChange} />);
      fireEvent.click(getRoot());
      expect(onOpenChange).toHaveBeenCalledWith(true);
    });
  });

  describe('Selection', () => {
    it('selects an option and calls onChange with the value', () => {
      const onChange = jest.fn();
      renderWithTheme(<Dropdown options={fruits} onChange={onChange} />);
      fireEvent.click(getRoot());
      fireEvent.click(screen.getByText('Apple'));
      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('marks the selected option with a selected class', () => {
      renderWithTheme(<Dropdown options={fruits} value="cherry" />);
      fireEvent.click(getRoot());
      const option = screen
        .getAllByText('Cherry')
        .map((el) => el.closest('.dropdown-option'))
        .find((el) => el !== null);
      expect(option).toHaveClass('selected');
    });

    it('supports multiSelect selection', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <Dropdown options={fruits} multiSelect value={['apple', 'cherry']} onChange={onChange} />,
      );
      fireEvent.click(getRoot());
      fireEvent.click(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith(expect.arrayContaining(['apple', 'cherry', 'banana']));
    });

    it('keeps disabled options unselectable', () => {
      const onChange = jest.fn();
      renderWithTheme(<Dropdown options={fruits} onChange={onChange} />);
      fireEvent.click(getRoot());
      fireEvent.click(screen.getByText('Durian'));
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Searchable', () => {
    it('filters options by the search term', () => {
      renderWithTheme(<Dropdown options={fruits} searchable />);
      fireEvent.click(getRoot());
      fireEvent.change(screen.getByPlaceholderText('Search options...'), {
        target: { value: 'ban' },
      });
      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('calls onSearch with the term', () => {
      const onSearch = jest.fn();
      renderWithTheme(<Dropdown options={fruits} searchable onSearch={onSearch} />);
      fireEvent.click(getRoot());
      fireEvent.change(screen.getByPlaceholderText('Search options...'), {
        target: { value: 'app' },
      });
      expect(onSearch).toHaveBeenCalledWith('app');
    });
  });

  describe('forwardRef', () => {
    it('forwards a ref to the root container', () => {
      const ref = React.createRef<HTMLDivElement>();
      const { container } = renderWithTheme(<Dropdown options={fruits} ref={ref} />);
      expect(ref.current).toBe(container.querySelector('.dropdown-container'));
    });
  });

  describe('Theming (dual-channel custom vars)', () => {
    it('writes only the custom channel for a custom color', () => {
      renderWithTheme(<Dropdown options={fruits} color="#ff0000" />);
      expect(getRoot()).toHaveStyle({ '--dropdown-custom-bg': '#ff0000' });
      expect(getRoot()).not.toHaveStyle({ '--dropdown-bg': '#ff0000' });
    });

    it('lets a gradient win over color for the background var', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      renderWithTheme(<Dropdown options={fruits} color="#ff0000" gradient={gradient} />);
      expect(getRoot()).toHaveStyle({ '--dropdown-custom-bg': gradient });
    });

    it('resolves theme keys to var() references', () => {
      renderWithTheme(<Dropdown options={fruits} textColor="color-text" />);
      expect(getRoot()).toHaveStyle({ '--dropdown-custom-color': 'var(--color-text)' });
    });

    it('writes option hover/selected background overrides', () => {
      renderWithTheme(
        <Dropdown
          options={fruits}
          optionHoverBackground="#eeeeee"
          optionSelectedBackground="#111111"
        />,
      );
      expect(getRoot()).toHaveStyle({
        '--dropdown-custom-option-hover-bg': '#eeeeee',
        '--dropdown-custom-option-selected-bg': '#111111',
      });
    });

    it('resolves shadow tokens and px border radius', () => {
      renderWithTheme(<Dropdown options={fruits} shadow="lg" borderRadius={12} />);
      expect(getRoot()).toHaveStyle({
        '--dropdown-custom-shadow': 'var(--shadow-lg)',
        '--dropdown-custom-border-radius': '12px',
      });
    });

    it('merges user style after theme props (style wins)', () => {
      renderWithTheme(
        <Dropdown
          options={fruits}
          color="#ff0000"
          style={{ '--dropdown-custom-bg': '#00ff00' } as React.CSSProperties}
        />,
      );
      expect(getRoot()).toHaveStyle({ '--dropdown-custom-bg': '#00ff00' });
    });
  });
});
