import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DatePicker } from '../src/components/composition/DatePicker';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

describe('DatePicker Component', () => {
  describe('Rendering', () => {
    it('renders an input with a placeholder', () => {
      renderWithTheme(<DatePicker placeholder="Pick a date" />);
      expect(screen.getByPlaceholderText('Pick a date')).toBeInTheDocument();
    });

    it('renders with variant and size classes', () => {
      const { container } = renderWithTheme(<DatePicker variant="outline" size="lg" />);
      expect(container.querySelector('.datepicker-component')).toHaveClass(
        'datepicker-component--outline',
        'datepicker-component--lg',
      );
    });

    it('disables the input when disabled', () => {
      renderWithTheme(<DatePicker disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });

    it('displays a controlled value formatted as YYYY-MM-DD', () => {
      renderWithTheme(<DatePicker value="2026-03-15" />);
      expect(screen.getByRole('combobox')).toHaveValue('2026-03-15');
    });

    it('accepts a Date object as value', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 0, 5)} />);
      expect(screen.getByRole('combobox')).toHaveValue('2026-01-05');
    });

    it('uses a custom format function', () => {
      const format = (d: Date) => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
      renderWithTheme(<DatePicker value={new Date(2026, 2, 9)} format={format} />);
      expect(screen.getByRole('combobox')).toHaveValue('9/3/2026');
    });
  });

  describe('Opening + navigation', () => {
    it('opens the dialog on focus', () => {
      renderWithTheme(<DatePicker />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('opens the dialog via the toggle button', () => {
      const { container } = renderWithTheme(<DatePicker />);
      const toggle = container.querySelector('.datepicker-component__toggle') as HTMLButtonElement;
      fireEvent.click(toggle);
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('shows the current month and year in the header', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 5, 10)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(screen.getByText('June 2026')).toBeInTheDocument();
    });

    it('navigates to the previous month', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 5, 10)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      fireEvent.click(screen.getByLabelText('Previous month'));
      expect(screen.getByText('May 2026')).toBeInTheDocument();
    });

    it('navigates to the next month', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 5, 10)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      fireEvent.click(screen.getByLabelText('Next month'));
      expect(screen.getByText('July 2026')).toBeInTheDocument();
    });

    it('closes the dialog on Escape', () => {
      renderWithTheme(<DatePicker />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      fireEvent.keyDown(screen.getByRole('grid'), { key: 'Escape' });
      expect(screen.queryByRole('dialog')).toBeNull();
    });
  });

  describe('Selection', () => {
    it('selects a day on click and calls onChange', () => {
      const onChange = jest.fn();
      renderWithTheme(<DatePicker onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const day = screen.getByText('15');
      fireEvent.click(day);
      expect(onChange).toHaveBeenCalledTimes(1);
      const selected = onChange.mock.calls[0][0] as Date;
      expect(selected.getDate()).toBe(15);
    });

    it('updates the input display after selecting (uncontrolled)', () => {
      renderWithTheme(<DatePicker defaultValue={new Date(2026, 0, 1)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      // January 2026 is shown; click the 20th
      fireEvent.click(screen.getByText('20'));
      expect(screen.getByRole('combobox')).toHaveValue('2026-01-20');
    });

    it('clears the value when clearable', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <DatePicker clearable defaultValue={new Date(2026, 0, 1)} onChange={onChange} />,
      );
      fireEvent.click(screen.getByLabelText('Clear date'));
      expect(onChange).toHaveBeenCalledWith(null);
      expect(screen.getByRole('combobox')).toHaveValue('');
    });

    it('does not select a disabled (out-of-range) day', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <DatePicker
          onChange={onChange}
          min={new Date(2026, 2, 10)}
          defaultValue={new Date(2026, 2, 15)}
        />,
      );
      fireEvent.focus(screen.getByRole('combobox'));
      // March 1 is before min (March 10) -> disabled. Target the in-month day 1
      // (the grid also contains April 1 from the trailing week).
      const cells = screen.getAllByRole('gridcell');
      const day1 = cells.find(
        (c) => c.textContent === '1' && !c.className.includes('--outside'),
      ) as HTMLElement;
      expect(day1).toBeDisabled();
      fireEvent.click(day1);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('respects the max date', () => {
      renderWithTheme(
        <DatePicker max={new Date(2026, 2, 20)} defaultValue={new Date(2026, 2, 15)} />,
      );
      fireEvent.focus(screen.getByRole('combobox'));
      const day25 = screen.getByText('25');
      expect(day25).toBeDisabled();
    });
  });

  describe('Keyboard navigation', () => {
    it('moves focus with ArrowRight and selects on Enter', () => {
      const onChange = jest.fn();
      renderWithTheme(<DatePicker defaultValue={new Date(2026, 2, 10)} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowRight' }); // focus Mar 11
      fireEvent.keyDown(grid, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith(expect.any(Date));
      const selected = onChange.mock.calls[0][0] as Date;
      expect(selected.getDate()).toBe(11);
    });

    it('moves focus with ArrowDown (one week)', () => {
      const onChange = jest.fn();
      renderWithTheme(<DatePicker defaultValue={new Date(2026, 2, 10)} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowDown' }); // focus Mar 17
      fireEvent.keyDown(grid, { key: 'Enter' });
      const selected = onChange.mock.calls[0][0] as Date;
      expect(selected.getDate()).toBe(17);
    });

    it('moves to the next month when ArrowRight crosses the month boundary', () => {
      const onChange = jest.fn();
      renderWithTheme(<DatePicker defaultValue={new Date(2026, 2, 31)} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'ArrowRight' }); // focus Apr 1
      fireEvent.keyDown(grid, { key: 'Enter' });
      const selected = onChange.mock.calls[0][0] as Date;
      expect(selected.getMonth()).toBe(3); // April
      expect(selected.getDate()).toBe(1);
    });

    it('PageUp moves to the previous month', () => {
      renderWithTheme(<DatePicker defaultValue={new Date(2026, 2, 15)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'PageUp' });
      expect(screen.getByText('February 2026')).toBeInTheDocument();
    });

    it('PageDown moves to the next month', () => {
      renderWithTheme(<DatePicker defaultValue={new Date(2026, 2, 15)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const grid = screen.getByRole('grid');
      fireEvent.keyDown(grid, { key: 'PageDown' });
      expect(screen.getByText('April 2026')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('sets aria-haspopup="dialog" and toggles aria-expanded', () => {
      renderWithTheme(<DatePicker ariaLabel="Birth date" />);
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-haspopup', 'dialog');
      expect(input).toHaveAttribute('aria-label', 'Birth date');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      fireEvent.focus(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('renders a grid with weekday columnheaders and day gridcells', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 2, 10)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const grid = screen.getByRole('grid');
      expect(grid).toBeInTheDocument();
      const headers = screen.getAllByRole('columnheader');
      expect(headers).toHaveLength(7);
      const cells = screen.getAllByRole('gridcell');
      // 6 rows * 7 days = 42 gridcells
      expect(cells).toHaveLength(42);
    });

    it('marks the selected day with aria-selected', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 2, 10)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const cells = screen.getAllByRole('gridcell');
      const selected = cells.find((c) => c.textContent === '10');
      expect(selected).toHaveAttribute('aria-selected', 'true');
    });

    it('marks disabled days with aria-disabled', () => {
      renderWithTheme(<DatePicker min={new Date(2026, 2, 10)} value={new Date(2026, 2, 15)} />);
      fireEvent.focus(screen.getByRole('combobox'));
      const cells = screen.getAllByRole('gridcell');
      const day1 = cells.find((c) => c.textContent === '1');
      expect(day1).toHaveAttribute('aria-disabled', 'true');
    });

    it('supports weekStartsOn Monday', () => {
      renderWithTheme(<DatePicker value={new Date(2026, 2, 10)} weekStartsOn={1} />);
      fireEvent.focus(screen.getByRole('combobox'));
      // First weekday label should be 'Mo'
      const headers = screen.getAllByRole('columnheader');
      expect(headers[0]).toHaveTextContent('Mo');
    });
  });
});
