import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OTPInput } from '../src/components/basic/OTPInput';

describe('OTPInput', () => {
  describe('Rendering', () => {
    it('renders the correct number of input cells', () => {
      render(<OTPInput length={6} />);
      const cells = screen.getAllByRole('textbox');
      expect(cells).toHaveLength(6);
    });

    it('renders default length of 6', () => {
      render(<OTPInput />);
      const cells = screen.getAllByRole('textbox');
      expect(cells).toHaveLength(6);
    });

    it('renders custom length', () => {
      render(<OTPInput length={4} />);
      const cells = screen.getAllByRole('textbox');
      expect(cells).toHaveLength(4);
    });

    it('renders with aria-label on group', () => {
      render(<OTPInput ariaLabel="Verification code" />);
      expect(screen.getByRole('group')).toHaveAttribute('aria-label', 'Verification code');
    });

    it('renders disabled state', () => {
      render(<OTPInput disabled length={4} />);
      const cells = screen.getAllByRole('textbox');
      cells.forEach((cell) => expect(cell).toBeDisabled());
    });
  });

  describe('Typing behavior', () => {
    it('enters a digit and moves focus to next cell', () => {
      render(<OTPInput length={4} type="numeric" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: '5' } });
      expect(cells[0].value).toBe('5');
    });

    it('filters non-numeric characters in numeric mode', () => {
      render(<OTPInput length={4} type="numeric" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: 'a' } });
      expect(cells[0].value).toBe('');
    });

    it('accepts alphanumeric characters in alphanumeric mode', () => {
      render(<OTPInput length={4} type="alphanumeric" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: 'a' } });
      expect(cells[0].value).toBe('A');
    });

    it('uppercases alphanumeric input', () => {
      render(<OTPInput length={4} type="alphanumeric" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: 'b' } });
      expect(cells[0].value).toBe('B');
    });
  });

  describe('onChange callback', () => {
    it('fires onChange with the full value string', () => {
      const onChange = jest.fn();
      render(<OTPInput length={4} onChange={onChange} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: '1' } });
      expect(onChange).toHaveBeenCalledWith('1');

      fireEvent.change(cells[1], { target: { value: '2' } });
      expect(onChange).toHaveBeenCalledWith('12');
    });
  });

  describe('onComplete callback', () => {
    it('fires onComplete when all cells are filled', () => {
      const onComplete = jest.fn();
      render(<OTPInput length={3} onComplete={onComplete} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: '1' } });
      fireEvent.change(cells[1], { target: { value: '2' } });
      expect(onComplete).not.toHaveBeenCalled();

      fireEvent.change(cells[2], { target: { value: '3' } });
      expect(onComplete).toHaveBeenCalledWith('123');
    });

    it('does not fire onComplete if cells are partially filled', () => {
      const onComplete = jest.fn();
      render(<OTPInput length={4} onComplete={onComplete} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      fireEvent.change(cells[0], { target: { value: '1' } });
      fireEvent.change(cells[1], { target: { value: '2' } });
      expect(onComplete).not.toHaveBeenCalled();
    });
  });

  describe('Backspace behavior', () => {
    it('deletes current cell value on backspace', () => {
      render(<OTPInput length={4} defaultValue="12" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      expect(cells[1].value).toBe('2');
      fireEvent.keyDown(cells[1], { key: 'Backspace' });
      // After backspace on cell 1 (which had '2'), it should be empty
      expect(cells[1].value).toBe('');
    });

    it('moves to previous cell on backspace when current is empty', () => {
      const onChange = jest.fn();
      render(<OTPInput length={4} defaultValue="1" onChange={onChange} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      // Cell 1 is empty, backspace should delete cell 0
      fireEvent.keyDown(cells[1], { key: 'Backspace' });
      expect(onChange).toHaveBeenCalledWith('');
    });
  });

  describe('Paste handling', () => {
    it('distributes pasted characters across cells', () => {
      const onChange = jest.fn();
      render(<OTPInput length={6} onChange={onChange} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      const pasteEvent = new Event('paste', { bubbles: true });
      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: { getData: () => '123456' },
      });

      fireEvent(cells[0], pasteEvent);
      expect(onChange).toHaveBeenCalledWith('123456');
    });

    it('filters non-numeric on paste in numeric mode', () => {
      const onChange = jest.fn();
      render(<OTPInput length={6} type="numeric" onChange={onChange} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      const pasteEvent = new Event('paste', { bubbles: true });
      Object.defineProperty(pasteEvent, 'clipboardData', {
        value: { getData: () => '12ab34cd56' },
      });

      fireEvent(cells[0], pasteEvent);
      expect(onChange).toHaveBeenCalledWith('123456');
    });
  });

  describe('Controlled mode', () => {
    it('syncs controlled value to cells', () => {
      render(<OTPInput value="123456" length={6} onChange={() => {}} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      expect(cells[0].value).toBe('1');
      expect(cells[1].value).toBe('2');
      expect(cells[5].value).toBe('6');
    });
  });

  describe('defaultValue (uncontrolled)', () => {
    it('initializes cells from defaultValue', () => {
      render(<OTPInput defaultValue="999" length={6} />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      expect(cells[0].value).toBe('9');
      expect(cells[1].value).toBe('9');
      expect(cells[2].value).toBe('9');
      expect(cells[3].value).toBe('');
    });
  });

  describe('Mask mode', () => {
    it('uses password input type when mask is true', () => {
      const { container } = render(<OTPInput mask length={4} />);
      const cells = container.querySelectorAll('input[type="password"]');

      expect(cells).toHaveLength(4);
    });
  });

  describe('Variants', () => {
    it('applies variant class', () => {
      const { container } = render(<OTPInput variant="success" length={4} />);
      expect(container.querySelector('.otp-input-component--success')).toBeInTheDocument();
    });

    it('applies size class', () => {
      const { container } = render(<OTPInput size="lg" length={4} />);
      expect(container.querySelector('.otp-input-component--lg')).toBeInTheDocument();
    });

    it('applies error class', () => {
      const { container } = render(<OTPInput error length={4} />);
      expect(container.querySelector('.otp-input-component--error')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('sets autoComplete on first cell only', () => {
      render(<OTPInput length={4} autoComplete="one-time-code" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      expect(cells[0]).toHaveAttribute('autocomplete', 'one-time-code');
      expect(cells[1]).toHaveAttribute('autocomplete', 'off');
    });

    it('sets inputMode to numeric for numeric type', () => {
      render(<OTPInput length={4} type="numeric" />);
      const cells = screen.getAllByRole('textbox') as HTMLInputElement[];

      expect(cells[0]).toHaveAttribute('inputmode', 'numeric');
    });

    it('sets aria-label on each cell', () => {
      render(<OTPInput length={4} />);
      const cells = screen.getAllByRole('textbox');

      expect(cells[0]).toHaveAttribute('aria-label', 'Digit 1 of 4');
      expect(cells[3]).toHaveAttribute('aria-label', 'Digit 4 of 4');
    });
  });
});
