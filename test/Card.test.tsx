import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from '../src/components/Card/Card';

test('renders children inside the card', () => {
  render(<Card><p>Hello Card</p></Card>);
  expect(screen.getByText('Hello Card')).toBeTruthy();
});
