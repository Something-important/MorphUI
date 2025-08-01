import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../src/components/Button/Button';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

test('renders button with text', () => {
  render(
    <ThemeProvider>
      <Button>Click Me</Button>
    </ThemeProvider>
  );
  expect(screen.getByText('Click Me')).toBeInTheDocument();
});

it('renders with a custom color', () => {
  render(<Button color="#10b981">Custom Color</Button>);
  const btn = screen.getByRole('button', { name: /custom color/i });
  expect(btn).toHaveStyle({ background: '#10b981' });
});

it('renders with a gradient background', () => {
  render(<Button gradient="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)">Gradient</Button>);
  const btn = screen.getByRole('button', { name: /gradient/i });
  expect(btn).toHaveStyle({ background: 'linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)' });
});
