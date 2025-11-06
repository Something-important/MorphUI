import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Avatar } from '../src/components/basic/Avatar/Avatar';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Avatar Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders avatar with initials', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders avatar with single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('renders avatar with image', () => {
      render(<Avatar src="https://example.com/image.jpg" name="John Doe" />);
      const img = screen.getByAltText('John Doe');
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('falls back to initials when image fails to load', async () => {
      render(<Avatar src="https://invalid-url.com/image.jpg" name="John Doe" />);
      const img = screen.getByAltText('John Doe');

      // Simulate image error
      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Avatar name="John Doe" size={size} />);
        expect(container.querySelector(`.avatar-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Shapes
  describe('Shapes', () => {
    const shapes: Array<'circle' | 'square' | 'rounded'> = ['circle', 'square', 'rounded'];

    shapes.forEach((shape) => {
      it(`applies ${shape} shape class`, () => {
        const { container } = render(<Avatar name="John Doe" shape={shape} />);
        expect(container.querySelector(`.avatar-component--${shape}`)).toBeInTheDocument();
      });
    });
  });

  // Status indicators
  describe('Status Indicators', () => {
    const statuses: Array<'online' | 'offline' | 'away' | 'busy'> = [
      'online',
      'offline',
      'away',
      'busy',
    ];

    statuses.forEach((status) => {
      it(`renders ${status} status indicator`, () => {
        const { container } = render(<Avatar name="John Doe" status={status} />);
        const statusEl = container.querySelector(`.avatar-component__status--${status}`);
        expect(statusEl).toBeInTheDocument();
        expect(statusEl).toHaveAttribute('aria-label', `Status: ${status}`);
      });
    });
  });

  // Badges
  describe('Badges', () => {
    it('renders numeric badge', () => {
      const { container } = render(<Avatar name="John Doe" badge={5} showBadge />);
      const badge = container.querySelector('.avatar-component__badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent('5');
    });

    it('renders string badge', () => {
      const { container } = render(<Avatar name="John Doe" badge="New" showBadge />);
      const badge = container.querySelector('.avatar-component__badge');
      expect(badge).toHaveTextContent('New');
    });

    it('displays 99+ for numbers over 99', () => {
      const { container } = render(<Avatar name="John Doe" badge={150} showBadge />);
      const badge = container.querySelector('.avatar-component__badge');
      expect(badge).toHaveTextContent('99+');
    });

    it('does not render badge when showBadge is false and badge is undefined', () => {
      const { container } = render(<Avatar name="John Doe" />);
      expect(container.querySelector('.avatar-component__badge')).not.toBeInTheDocument();
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom background color', () => {
      const { container } = render(<Avatar name="John Doe" color="#8b5cf6" />);
      const avatar = container.querySelector('.avatar-component');
      expect(avatar).toHaveStyle({ '--avatar-custom-bg': '#8b5cf6' });
    });

    it('applies custom backgroundColor', () => {
      const { container } = render(<Avatar name="John Doe" backgroundColor="#f97316" />);
      const avatar = container.querySelector('.avatar-component');
      expect(avatar).toHaveStyle({ '--avatar-custom-bg': '#f97316' });
    });

    it('applies custom text color', () => {
      const { container } = render(<Avatar name="John Doe" textColor="#ffffff" />);
      const avatar = container.querySelector('.avatar-component');
      expect(avatar).toHaveStyle({ '--avatar-custom-color': '#ffffff' });
    });

    it('applies custom gradient', () => {
      const gradient = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      const { container } = render(<Avatar name="John Doe" gradient={gradient} />);
      const avatar = container.querySelector('.avatar-component');
      expect(avatar).toHaveStyle({ '--avatar-custom-bg': gradient });
      expect(container.querySelector('.avatar-component--gradient')).toBeInTheDocument();
    });
  });

  // Initials generation
  describe('Initials Generation', () => {
    it('generates initials from full name', () => {
      render(<Avatar name="John Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('generates single initial from single name', () => {
      render(<Avatar name="John" />);
      expect(screen.getByText('J')).toBeInTheDocument();
    });

    it('generates initials from multiple words', () => {
      render(<Avatar name="John Michael Doe" />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles empty name gracefully', () => {
      const { container } = render(<Avatar name="" />);
      expect(container.querySelector('.avatar-component__initials')).not.toBeInTheDocument();
    });

    it('generates consistent color from name', () => {
      const { container: container1 } = render(<Avatar name="John Doe" />);
      const { container: container2 } = render(<Avatar name="John Doe" />);

      const avatar1 = container1.querySelector('.avatar-component');
      const avatar2 = container2.querySelector('.avatar-component');

      // Both should have the same background color (from name hash)
      const style1 = avatar1?.getAttribute('style') || '';
      const style2 = avatar2?.getAttribute('style') || '';

      // Extract background color values (they should match)
      const color1 = style1.match(/--avatar-custom-bg:\s*([^;]+)/)?.[1];
      const color2 = style2.match(/--avatar-custom-bg:\s*([^;]+)/)?.[1];

      expect(color1).toBeTruthy();
      expect(color2).toBeTruthy();
      expect(color1).toBe(color2);
    });
  });

  // Icon fallback
  describe('Icon Fallback', () => {
    it('renders icon when image fails and icon is provided', async () => {
      const icon = <span data-testid="avatar-icon">👤</span>;
      const { container } = render(
        <Avatar src="https://invalid-url.com/image.jpg" name="John Doe" icon={icon} />,
      );
      const img = screen.getByAltText('John Doe');

      fireEvent.error(img);

      await waitFor(() => {
        const iconEl = container.querySelector('.avatar-component__icon');
        expect(iconEl).toBeInTheDocument();
      });
    });

    it('renders initials when image fails and no icon is provided', async () => {
      render(<Avatar src="https://invalid-url.com/image.jpg" name="John Doe" />);
      const img = screen.getByAltText('John Doe');

      fireEvent.error(img);

      await waitFor(() => {
        expect(screen.getByText('JD')).toBeInTheDocument();
      });
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(
        <Avatar name="John Doe" style={{ margin: '20px', padding: '10px' }} />,
      );
      const avatar = container.querySelector('.avatar-component');
      const styleAttr = avatar?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/margin:\s*20px/i);
      expect(styleAttr).toMatch(/padding:\s*10px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Avatar
          name="John Doe"
          color="#8b5cf6"
          style={{ '--avatar-custom-bg': 'purple' } as any}
        />,
      );
      const avatar = container.querySelector('.avatar-component');
      const styleAttr = avatar?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/--avatar-custom-bg:\s*purple/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('uses aria-label when provided', () => {
      render(<Avatar name="John Doe" ariaLabel="User avatar" />);
      const avatar = screen.getByLabelText('User avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('uses name for aria-label when ariaLabel not provided', () => {
      render(<Avatar name="John Doe" />);
      const avatar = screen.getByLabelText('John Doe');
      expect(avatar).toBeInTheDocument();
    });

    it('uses alt for aria-label when name and ariaLabel not provided', () => {
      render(<Avatar src="https://example.com/image.jpg" alt="User photo" />);
      const avatar = screen.getByLabelText('User photo');
      expect(avatar).toBeInTheDocument();
    });

    it('has default aria-label when no label provided', () => {
      render(<Avatar src="https://example.com/image.jpg" />);
      const avatar = screen.getByLabelText('Avatar');
      expect(avatar).toBeInTheDocument();
    });

    it('marks initials as aria-hidden', () => {
      const { container } = render(<Avatar name="John Doe" />);
      const initials = container.querySelector('.avatar-component__initials');
      expect(initials).toHaveAttribute('aria-hidden', 'true');
    });

    it('marks icon as aria-hidden', async () => {
      const icon = <span>👤</span>;
      const { container } = render(
        <Avatar src="https://invalid-url.com/image.jpg" name="John Doe" icon={icon} />,
      );
      const img = screen.getByAltText('John Doe');
      fireEvent.error(img);

      await waitFor(() => {
        const iconEl = container.querySelector('.avatar-component__icon');
        expect(iconEl).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  // Image handling
  describe('Image Handling', () => {
    it('calls onError callback when image fails', () => {
      const onError = jest.fn();
      render(<Avatar src="https://invalid-url.com/image.jpg" name="John Doe" onError={onError} />);
      const img = screen.getByAltText('John Doe');

      fireEvent.error(img);

      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('handles image load event', () => {
      render(<Avatar src="https://example.com/image.jpg" name="John Doe" />);
      const img = screen.getByAltText('John Doe');

      fireEvent.load(img);

      expect(img).toHaveStyle({ display: 'block' });
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Avatar name="John Doe" />
        </ThemeProvider>,
      );
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles name with extra whitespace', () => {
      render(<Avatar name="  John   Doe  " />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('handles name with special characters', () => {
      render(<Avatar name="John O'Brien" />);
      expect(screen.getByText('JO')).toBeInTheDocument();
    });

    it('handles very long name', () => {
      render(<Avatar name="John Michael Edward Smith Johnson" />);
      expect(screen.getByText('JJ')).toBeInTheDocument();
    });
  });
});

// Helper function for fireEvent
import { fireEvent } from '@testing-library/react';
