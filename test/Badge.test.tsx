import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Badge } from '../src/components/Badge/Badge';

describe('Badge Component', () => {
  it('renders with default props', () => {
    render(<Badge>Test Badge</Badge>);
    const badge = screen.getByText('Test Badge').parentElement;
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('badge-component', 'badge-component--primary', 'badge-component--md');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    expect(screen.getByText('Success').parentElement).toHaveClass('badge-component--success');

    rerender(<Badge variant="danger">Danger</Badge>);
    expect(screen.getByText('Danger').parentElement).toHaveClass('badge-component--danger');

    rerender(<Badge variant="warning">Warning</Badge>);
    expect(screen.getByText('Warning').parentElement).toHaveClass('badge-component--warning');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Badge size="xs">Extra Small</Badge>);
    expect(screen.getByText('Extra Small').parentElement).toHaveClass('badge-component--xs');

    rerender(<Badge size="lg">Large</Badge>);
    expect(screen.getByText('Large').parentElement).toHaveClass('badge-component--lg');
  });

  it('renders with outlined style', () => {
    render(<Badge outlined>Outlined</Badge>);
    expect(screen.getByText('Outlined').parentElement).toHaveClass('badge-component--outlined');
  });

  it('renders with rounded corners', () => {
    render(<Badge rounded>Rounded</Badge>);
    expect(screen.getByText('Rounded').parentElement).toHaveClass('badge-component--rounded');
  });

  it('renders with dot indicator', () => {
    render(<Badge dot>With Dot</Badge>);
    const badge = screen.getByText('With Dot').parentElement;
    expect(badge).toHaveClass('badge-component--dot');
  });

  it('renders with icon on left', () => {
    render(<Badge icon="✓" iconPosition="left">With Icon</Badge>);
    const badge = screen.getByText('With Icon').parentElement;
    expect(badge).toHaveClass('badge-component--icon-left');
  });

  it('renders with icon on right', () => {
    render(<Badge icon="✓" iconPosition="right">With Icon</Badge>);
    const badge = screen.getByText('With Icon').parentElement;
    expect(badge).toHaveClass('badge-component--icon-right');
  });

  it('renders as removable badge', () => {
    render(<Badge removable>Removable</Badge>);
    const badge = screen.getByText('Removable').parentElement;
    expect(badge).toHaveClass('badge-component--removable');
    expect(screen.getByLabelText('Remove badge')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', () => {
    const handleRemove = jest.fn();
    render(
      <Badge removable onRemove={handleRemove}>
        Removable
      </Badge>
    );
    
    const removeButton = screen.getByLabelText('Remove badge');
    fireEvent.click(removeButton);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  it('applies custom colors via CSS custom properties', () => {
    render(
      <Badge color="#ff0000" textColor="#ffffff">
        Custom Colors
      </Badge>
    );
    
    const badge = screen.getByText('Custom Colors').parentElement;
    expect(badge).toHaveStyle({
      '--badge-custom-bg': '#ff0000',
      '--badge-custom-color': '#ffffff',
    });
  });

  it('applies custom border color', () => {
    render(
      <Badge borderColor="#00ff00">
        Custom Border
      </Badge>
    );
    
    const badge = screen.getByText('Custom Border').parentElement;
    expect(badge).toHaveStyle({
      '--badge-custom-border': '#00ff00',
    });
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<Badge ref={ref}>Ref Test</Badge>);
    expect(ref.current).toBeInTheDocument();
    expect(ref.current).toHaveTextContent('Ref Test');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Class</Badge>);
    expect(screen.getByText('Custom Class').parentElement).toHaveClass('custom-class');
  });

  it('applies custom style', () => {
    const customStyle = { backgroundColor: 'purple' };
    render(<Badge style={customStyle}>Custom Style</Badge>);
    const badge = screen.getByText('Custom Style').parentElement;
    
    // Check that the custom style is applied (CSS converts purple to rgb)
    expect(badge).toHaveStyle('background-color: rgb(128, 0, 128)');
    
    // Also verify that other badge styles are still present
    expect(badge).toHaveClass('badge-component');
  });

  it('prevents event propagation on remove button click', () => {
    const handleRemove = jest.fn();
    const handleBadgeClick = jest.fn();
    
    render(
      <div onClick={handleBadgeClick}>
        <Badge removable onRemove={handleRemove}>
          Test
        </Badge>
      </div>
    );
    
    const removeButton = screen.getByLabelText('Remove badge');
    fireEvent.click(removeButton);
    
    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleBadgeClick).not.toHaveBeenCalled();
  });

  it('renders all variant combinations correctly', () => {
    const variants = ['primary', 'secondary', 'success', 'warning', 'danger', 'info', 'light', 'dark'];
    
    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant as any}>{variant}</Badge>);
      expect(screen.getByText(variant).parentElement).toHaveClass(`badge-component--${variant}`);
      unmount();
    });
  });

  it('renders all size combinations correctly', () => {
    const sizes = ['xs', 'sm', 'md', 'lg'];
    
    sizes.forEach(size => {
      const { unmount } = render(<Badge size={size as any}>{size}</Badge>);
      expect(screen.getByText(size).parentElement).toHaveClass(`badge-component--${size}`);
      unmount();
    });
  });
});
