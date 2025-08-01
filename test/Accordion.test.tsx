import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Accordion } from '../src/components/Accordion/Accordion';

test('Accordion toggles content visibility', () => {
  render(<Accordion title="Test Accordion">Hidden Content</Accordion>);

  const button = screen.getByText('Test Accordion');

  // Initially content should not be visible
  expect(screen.queryByText('Hidden Content')).toBeNull();

  // Click to open
  fireEvent.click(button);
  expect(screen.getByText('Hidden Content')).toBeInTheDocument();

  // Click to close
  fireEvent.click(button);
  expect(screen.queryByText('Hidden Content')).toBeNull();
});
