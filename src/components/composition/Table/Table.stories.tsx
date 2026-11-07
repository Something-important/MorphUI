import type { Meta, StoryObj } from '@storybook/react';
import { Table, type TableColumn } from './Table';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Table> = {
  title: 'Composition/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Table renders a data table with sorting, filtering, selection, pagination, and custom cell renderers. 3 variants, 4 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

interface Row {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const data: Row[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'Admin', status: 'active' },
  { id: '2', name: 'Bob', email: 'bob@example.com', role: 'Editor', status: 'active' },
  { id: '3', name: 'Carol', email: 'carol@example.com', role: 'Viewer', status: 'inactive' },
  { id: '4', name: 'Dave', email: 'dave@example.com', role: 'Editor', status: 'active' },
  { id: '5', name: 'Eve', email: 'eve@example.com', role: 'Admin', status: 'inactive' },
];

const columns: TableColumn<Row>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <span
        style={{ color: value === 'active' ? 'var(--color-success)' : 'var(--color-text-muted)' }}
      >
        {String(value)}
      </span>
    ),
  },
];

export const Default: Story = {
  render: () => <Table data={data} columns={columns} rowKey={(r) => r.id} />,
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
      <Stack gap={16}>
        {(['primary', 'secondary', 'default'] as const).map((v) => (
          <Table key={v} data={data} columns={columns} rowKey={(r) => r.id} variant={v} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes">
      <Stack gap={16}>
        {(['xs', 'sm', 'md', 'lg'] as const).map((s) => (
          <Table key={s} data={data} columns={columns} rowKey={(r) => r.id} size={s} />
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Empty state">
      <Table data={[]} columns={columns} rowKey={(r) => r.id} />
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Sorting, selection, striped, custom cell renderers">
      <Stack gap={16}>
        <Table
          data={data}
          columns={columns}
          rowKey={(r) => r.id}
          sortable
          selectable
          defaultSortColumn="name"
          defaultSortDirection="asc"
          striped
        />
        <Table
          data={data}
          columns={[
            ...columns,
            {
              key: 'actions',
              label: 'Actions',
              render: () => <button>Edit</button>,
            },
          ]}
          rowKey={(r) => r.id}
        />
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Table across all 5 preset themes">
      <ThemeGrid>
        <div style={{ overflow: 'auto' }}>
          <Table data={data.slice(0, 3)} columns={columns} rowKey={(r) => r.id} size="sm" />
        </div>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — single row, many columns, long text">
      <Stack gap={16}>
        <Table data={data.slice(0, 1)} columns={columns} rowKey={(r) => r.id} />
        <Table
          data={[
            {
              id: '1',
              name: 'A very long name that might overflow the cell width',
              email: 'a@b.com',
              role: 'X',
              status: 'active' as const,
            },
          ]}
          columns={columns}
          rowKey={(r) => r.id}
        />
      </Stack>
    </Demo>
  ),
};
