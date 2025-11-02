import { render, screen } from '@testing-library/react';
import { Label } from '../src/components/basic/Label/Label';

describe('Label', () => {
  it('renders text and associates with control id', () => {
    render(<Label htmlFor="email">Email</Label>);
    const el = screen.getByText('Email');
    expect(el.tagName).toBe('LABEL');
    expect(el).toHaveAttribute('for', 'email');
  });

  it('shows required indicator when required', () => {
    render(<Label required>Field</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });
});
