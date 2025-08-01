import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../src/components/Input/Input';

test('renders input and handles typing', () => {
  const handleChange = jest.fn();
  render(<Input value="" onChange={handleChange} placeholder="Type here" />);
  
  const input = screen.getByPlaceholderText('Type here');
  fireEvent.change(input, { target: { value: 'hello' } });
  
  expect(handleChange).toHaveBeenCalled();
});
