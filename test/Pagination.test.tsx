import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from '../src/components/interactive/Pagination/Pagination';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

describe('Pagination Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders pagination', () => {
      const { container } = render(<Pagination totalItems={100} />);
      expect(container.querySelector('.pagination-component')).toBeInTheDocument();
    });

    it('shows page info', () => {
      render(<Pagination totalItems={100} pageSize={10} />);
      expect(screen.getByText(/page 1 of 10/i)).toBeInTheDocument();
    });

    it('calculates total pages correctly', () => {
      render(<Pagination totalItems={100} pageSize={10} />);
      expect(screen.getByText(/page 1 of 10/i)).toBeInTheDocument();
    });

    it('shows page numbers by default', () => {
      render(<Pagination totalItems={50} pageSize={10} />);
      expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    });
  });

  // Page navigation
  describe('Page Navigation', () => {
    it('calls onPageChange when page number is clicked', () => {
      const onPageChange = jest.fn();
      render(<Pagination totalItems={50} pageSize={10} onPageChange={onPageChange} />);
      const page2Button = screen.getByRole('button', { name: /page 2/i });
      fireEvent.click(page2Button);
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when next button is clicked', () => {
      const onPageChange = jest.fn();
      render(
        <Pagination totalItems={50} pageSize={10} currentPage={1} onPageChange={onPageChange} />,
      );
      const nextButton = screen.getByRole('button', { name: /next/i });
      fireEvent.click(nextButton);
      expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it('calls onPageChange when previous button is clicked', () => {
      const onPageChange = jest.fn();
      render(
        <Pagination totalItems={50} pageSize={10} currentPage={2} onPageChange={onPageChange} />,
      );
      const prevButton = screen.getByRole('button', { name: /previous/i });
      fireEvent.click(prevButton);
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('disables previous button on first page', () => {
      render(<Pagination totalItems={50} pageSize={10} currentPage={1} />);
      const prevButton = screen.getByRole('button', { name: /previous/i });
      expect(prevButton).toBeDisabled();
    });

    it('disables next button on last page', () => {
      render(<Pagination totalItems={50} pageSize={10} currentPage={5} />);
      const nextButton = screen.getByRole('button', { name: /next/i });
      expect(nextButton).toBeDisabled();
    });
  });

  // First/Last buttons
  describe('First/Last Buttons', () => {
    it('shows first/last buttons when showFirstLast is true', () => {
      render(<Pagination totalItems={50} pageSize={10} showFirstLast currentPage={3} />);
      expect(screen.getByRole('button', { name: /first/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /last/i })).toBeInTheDocument();
    });

    it('does not show first/last buttons by default', () => {
      render(<Pagination totalItems={50} pageSize={10} />);
      expect(screen.queryByRole('button', { name: /first/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /last/i })).not.toBeInTheDocument();
    });

    it('calls onPageChange when first button is clicked', () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          totalItems={50}
          pageSize={10}
          currentPage={5}
          onPageChange={onPageChange}
          showFirstLast
        />,
      );
      const firstButton = screen.getByRole('button', { name: /first/i });
      fireEvent.click(firstButton);
      expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it('calls onPageChange when last button is clicked', () => {
      const onPageChange = jest.fn();
      render(
        <Pagination
          totalItems={50}
          pageSize={10}
          currentPage={1}
          onPageChange={onPageChange}
          showFirstLast
        />,
      );
      const lastButton = screen.getByRole('button', { name: /last/i });
      fireEvent.click(lastButton);
      expect(onPageChange).toHaveBeenCalledWith(5);
    });
  });

  // Page size selector
  describe('Page Size Selector', () => {
    it('shows page size selector when showPageSize is true', () => {
      render(<Pagination totalItems={100} showPageSize />);
      expect(screen.getByLabelText(/items per page/i)).toBeInTheDocument();
    });

    it('does not show page size selector by default', () => {
      render(<Pagination totalItems={100} />);
      expect(screen.queryByLabelText(/items per page/i)).not.toBeInTheDocument();
    });

    it('calls onPageSizeChange when page size is changed', () => {
      const onPageSizeChange = jest.fn();
      render(
        <Pagination
          totalItems={100}
          pageSize={10}
          onPageSizeChange={onPageSizeChange}
          showPageSize
        />,
      );
      const select = screen.getByLabelText(/items per page/i);
      fireEvent.change(select, { target: { value: '20' } });
      expect(onPageSizeChange).toHaveBeenCalledWith(20);
    });

    it('resets to page 1 when page size changes', () => {
      const onPageChange = jest.fn();
      const onPageSizeChange = jest.fn();
      render(
        <Pagination
          totalItems={100}
          pageSize={10}
          currentPage={5}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          showPageSize
        />,
      );
      const select = screen.getByLabelText(/items per page/i);
      fireEvent.change(select, { target: { value: '20' } });
      expect(onPageChange).toHaveBeenCalledWith(1);
    });
  });

  // Ellipsis
  describe('Ellipsis Handling', () => {
    it('shows ellipsis for large page counts', () => {
      const { container } = render(<Pagination totalItems={200} pageSize={10} currentPage={10} />);
      const ellipsis = container.querySelector('.pagination-component__ellipsis');
      expect(ellipsis).toBeInTheDocument();
    });

    it('does not show ellipsis for small page counts', () => {
      const { container } = render(<Pagination totalItems={30} pageSize={10} currentPage={2} />);
      expect(container.querySelector('.pagination-component__ellipsis')).not.toBeInTheDocument();
    });
  });

  // Sizes
  describe('Sizes', () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];

    sizes.forEach((size) => {
      it(`applies ${size} size class`, () => {
        const { container } = render(<Pagination totalItems={50} pageSize={10} size={size} />);
        expect(container.querySelector(`.pagination-component--${size}`)).toBeInTheDocument();
      });
    });
  });

  // Variants
  describe('Variants', () => {
    const variants: Array<'primary' | 'secondary' | 'outline' | 'ghost'> = [
      'primary',
      'secondary',
      'outline',
      'ghost',
    ];

    variants.forEach((variant) => {
      it(`applies ${variant} variant class`, () => {
        const { container } = render(
          <Pagination totalItems={50} pageSize={10} variant={variant} />,
        );
        expect(container.querySelector(`.pagination-component--${variant}`)).toBeInTheDocument();
      });
    });
  });

  // Active page
  describe('Active Page', () => {
    it('highlights current page', () => {
      const { container } = render(<Pagination totalItems={50} pageSize={10} currentPage={3} />);
      const activeButton = container.querySelector('.pagination-component__btn--active');
      expect(activeButton).toHaveTextContent('3');
    });

    it('has aria-current="page" on active page', () => {
      render(<Pagination totalItems={50} pageSize={10} currentPage={3} />);
      const activeButton = screen.getByRole('button', { name: /page 3/i });
      expect(activeButton).toHaveAttribute('aria-current', 'page');
    });
  });

  // Controlled vs Uncontrolled
  describe('Controlled vs Uncontrolled', () => {
    it('works as uncontrolled component with defaultPage', () => {
      const { container } = render(<Pagination totalItems={50} pageSize={10} defaultPage={2} />);
      const activeButton = container.querySelector('.pagination-component__btn--active');
      expect(activeButton).toHaveTextContent('2');
    });

    it('works as controlled component with currentPage', () => {
      const { container } = render(<Pagination totalItems={50} pageSize={10} currentPage={3} />);
      const activeButton = container.querySelector('.pagination-component__btn--active');
      expect(activeButton).toHaveTextContent('3');
    });
  });

  // Custom colors
  describe('Custom Colors', () => {
    it('applies custom color', () => {
      const { container } = render(<Pagination totalItems={50} color="#8b5cf6" />);
      const pagination = container.querySelector('.pagination-component');
      expect(pagination).toHaveStyle({ '--pagination-custom-color': '#8b5cf6' });
    });

    it('applies custom textColor', () => {
      const { container } = render(<Pagination totalItems={50} textColor="#f97316" />);
      const pagination = container.querySelector('.pagination-component');
      expect(pagination).toHaveStyle({ '--pagination-custom-text-color': '#f97316' });
    });
  });

  // Display options
  describe('Display Options', () => {
    it('hides page numbers when showPageNumbers is false', () => {
      render(<Pagination totalItems={50} showPageNumbers={false} />);
      expect(screen.queryByRole('button', { name: /page 1/i })).not.toBeInTheDocument();
    });

    it('hides prev/next buttons when showPrevNext is false', () => {
      render(<Pagination totalItems={50} showPrevNext={false} />);
      expect(screen.queryByRole('button', { name: /previous/i })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: /next/i })).not.toBeInTheDocument();
    });

    it('shows total when showTotal is true', () => {
      render(<Pagination totalItems={100} showTotal />);
      expect(screen.getByText(/total: 100/i)).toBeInTheDocument();
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has nav role', () => {
      const { container } = render(<Pagination totalItems={50} />);
      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('has default aria-label', () => {
      render(<Pagination totalItems={50} />);
      const nav = screen.getByLabelText('Pagination navigation');
      expect(nav).toBeInTheDocument();
    });

    it('uses custom aria-label when provided', () => {
      render(<Pagination totalItems={50} ariaLabel="Data table pagination" />);
      const nav = screen.getByLabelText('Data table pagination');
      expect(nav).toBeInTheDocument();
    });

    it('has proper aria-labels on navigation buttons', () => {
      render(<Pagination totalItems={50} showFirstLast />);
      expect(screen.getByRole('button', { name: /go to first page/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /go to last page/i })).toBeInTheDocument();
    });
  });

  // Edge cases
  describe('Edge Cases', () => {
    it('handles zero total items', () => {
      render(<Pagination totalItems={0} />);
      expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument();
    });

    it('clamps page to valid range', () => {
      render(<Pagination totalItems={50} pageSize={10} currentPage={10} />);
      // Should clamp to page 5 (max)
      expect(screen.getByText(/page 5 of 5/i)).toBeInTheDocument();
    });

    it('handles single page correctly', () => {
      render(<Pagination totalItems={5} pageSize={10} />);
      expect(screen.getByText(/page 1 of 1/i)).toBeInTheDocument();
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Pagination totalItems={50} />
        </ThemeProvider>,
      );
      expect(screen.getByLabelText('Pagination navigation')).toBeInTheDocument();
    });
  });
});
