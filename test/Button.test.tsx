import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../src/components/basic/Button/Button';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

// Simple theme for testing
const customTheme = {
  '--gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  '--color-primary': '#0070f3',
  '--color-success': '#10b981'
};

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
  // Check that the CSS custom property is set
  expect(btn).toHaveStyle({ '--btn-custom-bg': '#10b981' });
});

it('renders with a gradient background', () => {
  render(<Button gradient="linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)">Gradient</Button>);
  const btn = screen.getByRole('button', { name: /gradient/i });
  // Check that the CSS custom property is set
  expect(btn).toHaveStyle({ '--btn-custom-bg': 'linear-gradient(90deg, #f43f5e 0%, #3b82f6 100%)' });
});

it('renders with custom text color', () => {
  render(<Button color="#10b981" textColor="#ffffff">Custom Text Color</Button>);
  const btn = screen.getByRole('button', { name: /custom text color/i });
  // Check that the CSS custom properties are set
  expect(btn).toHaveStyle({ '--btn-custom-bg': '#10b981', '--btn-custom-color': '#ffffff' });
});

it('renders with custom border color', () => {
  render(<Button color="#8b5cf6" borderColor="#4c1d95">Custom Border</Button>);
  const btn = screen.getByRole('button', { name: /custom border/i });
  // Check that the CSS custom properties are set
  expect(btn).toHaveStyle({ '--btn-custom-bg': '#8b5cf6', '--btn-custom-border': '#4c1d95' });
});

it('renders with different variants', () => {
  const { rerender } = render(<Button variant="primary">Primary</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--primary');
  
  rerender(<Button variant="success">Success</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--success');
  
  rerender(<Button variant="warning">Warning</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--warning');
  
  rerender(<Button variant="info">Info</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--info');
});

it('renders with different shadow levels', () => {
  const { rerender } = render(<Button shadow="none">No Shadow</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--shadow-none');
  
  rerender(<Button shadow="lg">Large Shadow</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--shadow-lg');
  
  rerender(<Button shadow="xl">Extra Large Shadow</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--shadow-xl');
});

it('renders with different hover effects', () => {
  const { rerender } = render(<Button hoverEffect="lift">Lift Effect</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--hover-lift');
  
  rerender(<Button hoverEffect="glow">Glow Effect</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--hover-glow');
  
  rerender(<Button hoverEffect="scale">Scale Effect</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--hover-scale');
  
  rerender(<Button hoverEffect="none">No Effect</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--hover-none');
});

it('renders with theme integration', () => {
  render(
    <ThemeProvider>
      <Button color="color-success">Theme Success</Button>
    </ThemeProvider>
  );
  const btn = screen.getByRole('button', { name: /theme success/i });
  // When custom color is provided, no variant class should be applied
  // The button should have the custom color applied via CSS custom property
  expect(btn).not.toHaveClass('btn-component--success');
  // Check that the CSS custom property is set
  expect(btn).toHaveStyle({ '--btn-custom-bg': 'var(--color-success)' });
});

it('renders with CSS variable integration', () => {
  render(<Button color="--color-warning">CSS Variable Warning</Button>);
  const btn = screen.getByRole('button', { name: /css variable warning/i });
  // The button should have the CSS variable applied as background
  expect(btn).toHaveStyle({ '--btn-custom-bg': 'var(--color-warning)' });
});

test('renders with theme gradient', () => {
  render(
    <ThemeProvider theme={customTheme}>
      <Button gradient="gradient-primary">Theme Gradient</Button>
    </ThemeProvider>
  );
  
  const btn = screen.getByRole('button', { name: /theme gradient/i });
  
  // The utility resolves 'gradient-primary' to 'var(--gradient-primary)'
  expect(btn).toHaveStyle({ '--btn-custom-bg': 'var(--gradient-primary)' });
});

it('renders with all size variants', () => {
  const { rerender } = render(<Button size="xs">Extra Small</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--xs');
  
  rerender(<Button size="sm">Small</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--sm');
  
  rerender(<Button size="md">Medium</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--md');
  
  rerender(<Button size="lg">Large</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--lg');
  
  rerender(<Button size="xl">Extra Large</Button>);
  expect(screen.getByRole('button')).toHaveClass('btn-component--xl');
});

it('renders with additional props', () => {
  render(<Button fullWidth rounded>Full Width Rounded</Button>);
  const btn = screen.getByRole('button', { name: /full width rounded/i });
  expect(btn).toHaveClass('btn-component--full-width', 'btn-component--rounded');
});

it('renders loading state correctly', () => {
  render(<Button loading loadingText="Loading...">Button</Button>);
  const btn = screen.getByRole('button', { name: /loading/i });
  expect(btn).toHaveClass('btn-component--disabled');
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('renders as anchor tag when specified', () => {
  render(<Button as="a" href="#" variant="primary">Link Button</Button>);
  const link = screen.getByRole('link', { name: /link button/i });
  expect(link).toHaveAttribute('href', '#');
  expect(link).toHaveClass('btn-component--primary');
});

test('renders with loading state', () => {
  render(<Button loading>Loading Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--loading');
  expect(button).toBeDisabled();
  expect(document.querySelector('.btn-component__spinner')).toBeInTheDocument();
});

test('renders with custom loading text', () => {
  render(<Button loading loadingText="Processing...">Submit</Button>);
  
  expect(screen.getByText('Processing...')).toBeInTheDocument();
  expect(screen.queryByText('Submit')).not.toBeInTheDocument();
});

test('renders with loading spinner', () => {
  render(<Button loading>Loading</Button>);
  
  const spinner = document.querySelector('.btn-component__spinner');
  expect(spinner).toBeInTheDocument();
});

test('renders with left icon', () => {
  render(<Button iconLeft="🚀">Launch</Button>);
  
  const icon = document.querySelector('.btn-component__icon--left');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveTextContent('🚀');
});

test('renders with right icon', () => {
  render(<Button iconRight="✅">Done</Button>);
  
  const icon = document.querySelector('.btn-component__icon--right');
  expect(icon).toBeInTheDocument();
  expect(icon).toHaveTextContent('✅');
});

test('renders with both icons', () => {
  render(<Button iconLeft="📤" iconRight="📥">Transfer</Button>);
  
  const leftIcon = document.querySelector('.btn-component__icon--left');
  const rightIcon = document.querySelector('.btn-component__icon--right');
  
  expect(leftIcon).toHaveTextContent('📤');
  expect(rightIcon).toHaveTextContent('📥');
});

test('shows icons when loading', () => {
  render(<Button loading iconLeft="📤" iconRight="📥">Loading</Button>);
  
  const leftIcon = document.querySelector('.btn-component__icon--left');
  const rightIcon = document.querySelector('.btn-component__icon--right');
  
  expect(leftIcon).toBeInTheDocument();
  expect(rightIcon).toBeInTheDocument();
});

test('renders ghost variant', () => {
  render(<Button variant="ghost">Ghost Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--ghost');
});

test('renders outline variant', () => {
  render(<Button variant="outline">Outline Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--outline');
});

test('renders extra small size', () => {
  render(<Button size="xs">Small Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--xs');
});

test('renders extra large size', () => {
  render(<Button size="xl">Large Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--xl');
});

test('renders full width', () => {
  render(<Button fullWidth>Full Width Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--full-width');
});

test('renders as anchor tag', () => {
  render(<Button as="a" href="/test">Link Button</Button>);
  
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('href', '/test');
  expect(link).toHaveClass('btn-component');
});

test('renders disabled anchor tag', () => {
  render(<Button as="a" href="/test" disabled>Disabled Link</Button>);
  
  const link = screen.getByRole('link');
  expect(link).toHaveAttribute('aria-disabled', 'true');
  expect(link).toHaveAttribute('tabIndex', '-1');
});

test('renders with ripple effect', () => {
  render(<Button ripple>Ripple Button</Button>);
  const button = screen.getByRole('button');
  
  expect(button).toHaveClass('btn-component--ripple');
});

test('creates ripple element on click', () => {
  render(<Button ripple>Ripple Button</Button>);
  const button = screen.getByRole('button');
  
  // Click the button
  fireEvent.click(button);
  
  // Check if ripple element was created by the utility
  const ripple = document.querySelector('.morphui-ripple');
  expect(ripple).toBeInTheDocument();
});

test('ripple effect respects disabled state', () => {
  render(<Button ripple disabled>Disabled Ripple</Button>);
  const button = screen.getByRole('button');
  
  // Click the disabled button
  fireEvent.click(button);
  
  // Check that no ripple was created
  const ripple = document.querySelector('.morphui-ripple');
  expect(ripple).not.toBeInTheDocument();
});

test('ripple effect respects loading state', () => {
  render(<Button ripple loading>Loading Ripple</Button>);
  const button = screen.getByRole('button');
  
  // Click the loading button
  fireEvent.click(button);
  
  // Check that no ripple was created
  const ripple = document.querySelector('.morphui-ripple');
  expect(ripple).not.toBeInTheDocument();
});
