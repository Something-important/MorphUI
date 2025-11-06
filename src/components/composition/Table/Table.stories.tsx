// Table.stories.tsx
import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Table, type TableColumn } from './Table';
import { ThemeProvider, themes, type ThemeName } from '../../theme';
import { Button } from '../../basic/Button';

// Sample data types
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinDate: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-02-20',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Editor',
    status: 'inactive',
    joinDate: '2023-03-10',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-04-05',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'Admin',
    status: 'active',
    joinDate: '2023-05-12',
  },
  {
    id: 6,
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Editor',
    status: 'active',
    joinDate: '2023-06-18',
  },
  {
    id: 7,
    name: 'Eve Adams',
    email: 'eve@example.com',
    role: 'User',
    status: 'inactive',
    joinDate: '2023-07-22',
  },
  {
    id: 8,
    name: 'Frank Miller',
    email: 'frank@example.com',
    role: 'User',
    status: 'active',
    joinDate: '2023-08-30',
  },
];

const sampleProducts: Product[] = [
  { id: 'p1', name: 'Laptop', category: 'Electronics', price: 999.99, stock: 45, rating: 4.5 },
  { id: 'p2', name: 'Mouse', category: 'Electronics', price: 29.99, stock: 120, rating: 4.2 },
  { id: 'p3', name: 'Keyboard', category: 'Electronics', price: 79.99, stock: 80, rating: 4.7 },
  { id: 'p4', name: 'Monitor', category: 'Electronics', price: 299.99, stock: 35, rating: 4.8 },
  { id: 'p5', name: 'Desk Chair', category: 'Furniture', price: 199.99, stock: 25, rating: 4.3 },
];

export default {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A powerful data table component with sorting, pagination, selection, and full theming support. Perfect for displaying structured data in admin panels and dashboards.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'default'],
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg'],
    },
    striped: {
      control: { type: 'boolean' },
    },
    bordered: {
      control: { type: 'boolean' },
    },
    hoverable: {
      control: { type: 'boolean' },
    },
    pagination: {
      control: { type: 'boolean' },
    },
    selectable: {
      control: { type: 'boolean' },
    },
    sortable: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

// Basic table
export const Default: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
      { key: 'joinDate', label: 'Join Date', sortable: true },
    ];

    return <Table data={sampleUsers} columns={columns} />;
  },
};

// With pagination
export const WithPagination: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
    ];

    return <Table data={sampleUsers} columns={columns} pagination pageSize={3} />;
  },
};

// With selection
export const WithSelection: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ];

    return (
      <div>
        <Table
          data={sampleUsers}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
        {selectedRows.length > 0 && (
          <p style={{ marginTop: '1rem', color: '#666' }}>Selected: {selectedRows.length} row(s)</p>
        )}
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Extra Small</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} size="xs" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Small</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} size="sm" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Medium (Default)</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} size="md" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Large</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} size="lg" />
        </div>
      </div>
    );
  },
};

// Variants
export const Variants: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Default</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} variant="default" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Primary</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} variant="primary" />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Secondary</h3>
          <Table data={sampleUsers.slice(0, 3)} columns={columns} variant="secondary" />
        </div>
      </div>
    );
  },
};

// Striped
export const Striped: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ];

    return <Table data={sampleUsers} columns={columns} striped />;
  },
};

// Custom columns with render
export const CustomRendering: Story = {
  render: () => {
    const columns: TableColumn<Product>[] = [
      { key: 'name', label: 'Product', sortable: true },
      {
        key: 'price',
        label: 'Price',
        sortable: true,
        render: (value) => `$${value.toFixed(2)}`,
        align: 'right',
      },
      {
        key: 'stock',
        label: 'Stock',
        render: (value) => (
          <span style={{ color: value < 50 ? '#ef4444' : '#10b981' }}>{value} units</span>
        ),
        align: 'center',
      },
      {
        key: 'rating',
        label: 'Rating',
        render: (value) => '⭐'.repeat(Math.round(value)),
        align: 'center',
      },
    ];

    return <Table data={sampleProducts} columns={columns} />;
  },
};

// Loading state
export const Loading: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ];

    return <Table data={sampleUsers} columns={columns} loading />;
  },
};

// Empty state
export const Empty: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'role', label: 'Role' },
    ];

    return <Table data={[]} columns={columns} emptyMessage="No users found" />;
  },
};

// Custom colors
export const CustomColors: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Header Color</h3>
          <Table
            data={sampleUsers.slice(0, 5)}
            columns={columns}
            headerColor="#8b5cf6"
            headerTextColor="#ffffff"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Custom Row Colors</h3>
          <Table
            data={sampleUsers.slice(0, 5)}
            columns={columns}
            rowColor="#f3f4f6"
            hoverRowColor="#e5e7eb"
          />
        </div>
      </div>
    );
  },
};

// Gradients
export const Gradients: Story = {
  render: () => {
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gradient Header</h3>
          <Table
            data={sampleUsers.slice(0, 5)}
            columns={columns}
            headerGradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            headerTextColor="#ffffff"
          />
        </div>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Gradient Background</h3>
          <Table
            data={sampleUsers.slice(0, 3)}
            columns={columns}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            textColor="#ffffff"
          />
        </div>
      </div>
    );
  },
};

// Theme switching
export const ThemeSwitching: Story = {
  render: () => {
    const [theme, setTheme] = useState<ThemeName>('light');
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      { key: 'status', label: 'Status', sortable: true },
    ];

    return (
      <ThemeProvider theme={themes[theme]}>
        <div style={{ padding: '20px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ marginRight: '10px' }}>Theme:</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as ThemeName)}
              style={{ padding: '8px', fontSize: '16px' }}
            >
              {Object.keys(themes).map((themeName) => (
                <option key={themeName} value={themeName}>
                  {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <Table data={sampleUsers} columns={columns} pagination pageSize={5} />
        </div>
      </ThemeProvider>
    );
  },
};

// Interactive example
export const Interactive: Story = {
  render: () => {
    const [selectedRows, setSelectedRows] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const columns: TableColumn<User>[] = [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'email', label: 'Email', sortable: true },
      { key: 'role', label: 'Role', sortable: true },
      {
        key: 'status',
        label: 'Status',
        render: (value) => (
          <span
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: value === 'active' ? '#10b981' : '#ef4444',
              color: '#fff',
              fontSize: '0.875rem',
            }}
          >
            {value}
          </span>
        ),
      },
    ];

    return (
      <div>
        <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button
            onClick={() => setSelectedRows([])}
            disabled={selectedRows.length === 0}
            size="sm"
          >
            Clear Selection ({selectedRows.length})
          </Button>
          <span style={{ color: '#666' }}>
            Page {page} of {Math.ceil(sampleUsers.length / 5)}
          </span>
        </div>
        <Table
          data={sampleUsers}
          columns={columns}
          selectable
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
          pagination
          pageSize={5}
          currentPage={page}
          onPageChange={setPage}
          hoverable
        />
      </div>
    );
  },
};
