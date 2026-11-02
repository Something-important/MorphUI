import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Table, type TableColumn } from '../src/components/composition/Table/Table';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const data: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const columns: TableColumn<TestUser>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
];

describe('Table a11y', () => {
  it('basic table: no axe violations', async () => {
    const { container } = renderWithTheme(<Table data={data} columns={columns} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('selectable: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={data} columns={columns} selectable onSelectionChange={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('selectable with controlled selection: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table
        data={data}
        columns={columns}
        selectable
        selectedRows={[data[0]]}
        onSelectionChange={jest.fn()}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('sortable (after a sort click): no axe violations', async () => {
    const { container } = renderWithTheme(<Table data={data} columns={columns} sortable />);
    // Click the first sort button to exercise the aria-sort 'ascending' state.
    fireEvent.click(container.querySelector('.table-component__sort')!);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('filterable: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={data} columns={columns} filterable onFilterChange={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('pagination: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={data} columns={columns} pagination pageSize={2} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('empty state: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={[]} columns={columns} emptyMessage="No records" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('loading state: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={[]} columns={columns} loading loadingMessage="Loading rows" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('clickable rows (onRowClick): no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={data} columns={columns} onRowClick={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with ariaLabel: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table data={data} columns={columns} ariaLabel="Users" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('selectable + sortable + filterable + pagination combined: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Table
        data={data}
        columns={columns}
        selectable
        sortable
        filterable
        pagination
        pageSize={2}
        onSelectionChange={jest.fn()}
        onFilterChange={jest.fn()}
      />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // axe does not require a table accessible name or th scope in its default
  // rule set; guard both explicitly.
  describe('beyond axe', () => {
    it('the <table> carries the accessible name (not the inert wrapper div)', () => {
      const { container } = renderWithTheme(
        <Table data={data} columns={columns} ariaLabel="Users" />,
      );
      const table = container.querySelector('table')!;
      expect(table.getAttribute('aria-label')).toBe('Users');
      // The wrapper div has no role, so an aria-label there would be inert.
      const wrapper = container.querySelector('.table-component__wrapper')!;
      expect(wrapper.getAttribute('role')).toBeNull();
      expect(wrapper.getAttribute('aria-label')).toBeNull();
    });

    it('every column header has scope="col"', () => {
      const { container } = renderWithTheme(
        <Table data={data} columns={columns} selectable onSelectionChange={jest.fn()} />,
      );
      const headers = container.querySelectorAll('thead th');
      expect(headers.length).toBe(columns.length + 1); // +1 for the select-all cell
      headers.forEach((th) => {
        expect(th.getAttribute('scope')).toBe('col');
      });
    });

    it('aria-sort reflects the current sort direction on the sorted column', () => {
      const { container } = renderWithTheme(<Table data={data} columns={columns} sortable />);
      // Before sorting: every sortable column is 'none'.
      const ths = container.querySelectorAll('thead th[aria-sort]');
      ths.forEach((th) => expect(th.getAttribute('aria-sort')).toBe('none'));

      // After clicking the first sort button: that column is 'ascending'.
      fireEvent.click(container.querySelector('.table-component__sort')!);
      const firstTh = container.querySelectorAll('thead th[aria-sort]')[0];
      expect(firstTh.getAttribute('aria-sort')).toBe('ascending');
    });
  });
});
