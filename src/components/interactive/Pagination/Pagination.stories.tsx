// Pagination.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { Button } from '../../basic/Button';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A comprehensive pagination component with page numbers, navigation buttons, page size selector, and ellipsis handling. Supports both controlled and uncontrolled modes, perfect for data tables, lists, and any paginated content.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof Pagination>;

type Story = StoryObj<typeof Pagination>;

// Default
export const Default: Story = {
  args: {
    totalItems: 100,
    pageSize: 10,
  },
};

// Basic
export const Basic: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ padding: '2rem' }}>
        <Pagination totalItems={100} pageSize={10} currentPage={page} onPageChange={setPage} />
      </div>
    );
  },
};

// With page numbers
export const WithPageNumbers: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ padding: '2rem' }}>
        <Pagination
          totalItems={150}
          pageSize={10}
          currentPage={page}
          onPageChange={setPage}
          showPageNumbers
        />
      </div>
    );
  },
};

// With first/last buttons
export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div style={{ padding: '2rem' }}>
        <Pagination
          totalItems={200}
          pageSize={10}
          currentPage={page}
          onPageChange={setPage}
          showFirstLast
        />
      </div>
    );
  },
};

// With page size selector
export const WithPageSize: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <div style={{ padding: '2rem' }}>
        <Pagination
          totalItems={200}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          showPageSize
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    );
  },
};

// Complete features
export const Complete: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    return (
      <div style={{ padding: '2rem' }}>
        <Pagination
          totalItems={250}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          showPageNumbers
          showFirstLast
          showPrevNext
          showPageSize
          showTotal
          pageSizeOptions={[5, 10, 20, 50, 100]}
        />
      </div>
    );
  },
};

// Large dataset with ellipsis
export const LargeDataset: Story = {
  render: () => {
    const [page, setPage] = useState(10);
    return (
      <div style={{ padding: '2rem' }}>
        <Pagination
          totalItems={1000}
          pageSize={10}
          currentPage={page}
          onPageChange={setPage}
          showPageNumbers
          siblingCount={1}
        />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#666' }}>
          Navigate to see ellipsis in action
        </p>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const sizes: Array<'xs' | 'sm' | 'md' | 'lg' | 'xl'> = ['xs', 'sm', 'md', 'lg', 'xl'];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        {sizes.map((size) => (
          <div key={size}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {size.toUpperCase()}
            </p>
            <Pagination totalItems={50} pageSize={10} size={size} />
          </div>
        ))}
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const variants: Array<'primary' | 'secondary' | 'outline' | 'ghost'> = [
      'primary',
      'secondary',
      'outline',
      'ghost',
    ];
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <p style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#666' }}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </p>
            <Pagination totalItems={50} pageSize={10} variant={variant} />
          </div>
        ))}
      </div>
    );
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎨 Custom Colors
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Pagination totalItems={50} pageSize={10} color="#8b5cf6" />
            <Pagination totalItems={50} pageSize={10} color="#f97316" />
            <Pagination totalItems={50} pageSize={10} color="#06b6d4" />
          </div>
        </div>
      </div>
    );
  },
};

// Theme switching
// Interactive example
export const Interactive: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const totalItems = 150;
    const startItem = (page - 1) * pageSize + 1;
    const endItem = Math.min(page * pageSize, totalItems);

    return (
      <div style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3>
            Showing items {startItem}-{endItem} of {totalItems}
          </h3>
        </div>

        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          currentPage={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          showPageNumbers
          showFirstLast
          showPageSize
          showTotal
          pageSizeOptions={[5, 10, 20, 50]}
        />

        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <Button onClick={() => setPage(1)} size="sm">
            Go to Page 1
          </Button>
          <Button onClick={() => setPage(Math.ceil(totalItems / pageSize))} size="sm">
            Go to Last Page
          </Button>
        </div>
      </div>
    );
  },
};
