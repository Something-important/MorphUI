import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Table, type TableColumn } from '../src/components/composition/Table/Table';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';

interface TestUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

const testData: TestUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Editor' },
];

const testColumns: TableColumn<TestUser>[] = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'role', label: 'Role', sortable: true },
];

describe('Table Component', () => {
  // Basic rendering
  describe('Basic Rendering', () => {
    it('renders table with data', () => {
      render(<Table data={testData} columns={testColumns} />);
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });

    it('renders table headers', () => {
      render(<Table data={testData} columns={testColumns} />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('renders empty message when no data', () => {
      render(<Table data={[]} columns={testColumns} emptyMessage="No data" />);
      expect(screen.getByText('No data')).toBeInTheDocument();
    });

    it('renders loading message when loading', () => {
      render(<Table data={testData} columns={testColumns} loading loadingMessage="Loading..." />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).not.toBeInTheDocument();
    });
  });

  // Sorting
  describe('Sorting', () => {
    it('sorts data when sort button is clicked', () => {
      render(<Table data={testData} columns={testColumns} />);
      const sortButton = screen.getAllByLabelText(/sort by/i)[0];
      fireEvent.click(sortButton);

      const rows = screen.getAllByRole('row');
      // First data row should be sorted
      expect(rows[1]).toHaveTextContent('Bob Johnson'); // B comes before J
    });

    it('sorts in descending order on second click', () => {
      render(<Table data={testData} columns={testColumns} />);
      const sortButton = screen.getAllByLabelText(/sort by/i)[0];
      fireEvent.click(sortButton); // Asc
      fireEvent.click(sortButton); // Desc

      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent('John Doe'); // J comes after B in desc
    });

    it('does not show sort button when column is not sortable', () => {
      const columns: TableColumn<TestUser>[] = [
        { key: 'name', label: 'Name', sortable: false },
        { key: 'email', label: 'Email', sortable: false },
      ];
      render(<Table data={testData} columns={columns} sortable={false} />);
      const sortButtons = screen.queryAllByLabelText(/sort by/i);
      expect(sortButtons.length).toBe(0);
    });
  });

  // Selection
  describe('Selection', () => {
    it('shows checkboxes when selectable is true', () => {
      render(<Table data={testData} columns={testColumns} selectable />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBeGreaterThan(0);
    });

    it('does not show checkboxes when selectable is false', () => {
      render(<Table data={testData} columns={testColumns} selectable={false} />);
      const checkboxes = screen.queryAllByRole('checkbox');
      expect(checkboxes.length).toBe(0);
    });

    it('toggles row selection when checkbox is clicked', () => {
      const onSelectionChange = jest.fn();
      render(
        <Table
          data={testData}
          columns={testColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // First data row checkbox

      expect(onSelectionChange).toHaveBeenCalled();
      const selectedRows = onSelectionChange.mock.calls[0][0];
      expect(selectedRows.length).toBe(1);
    });

    it('selects all rows when header checkbox is clicked', () => {
      const onSelectionChange = jest.fn();
      render(
        <Table
          data={testData}
          columns={testColumns}
          selectable
          onSelectionChange={onSelectionChange}
        />,
      );
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]); // Header checkbox

      expect(onSelectionChange).toHaveBeenCalled();
      const selectedRows = onSelectionChange.mock.calls[0][0];
      expect(selectedRows.length).toBe(testData.length);
    });
  });

  // Pagination
  describe('Pagination', () => {
    it('shows pagination controls when pagination is enabled', () => {
      render(<Table data={testData} columns={testColumns} pagination pageSize={2} />);
      expect(screen.getByText(/page 1 of/i)).toBeInTheDocument();
    });

    it('does not show pagination when pagination is disabled', () => {
      render(<Table data={testData} columns={testColumns} pagination={false} />);
      expect(screen.queryByText(/page/i)).not.toBeInTheDocument();
    });

    it('paginates data correctly', () => {
      render(<Table data={testData} columns={testColumns} pagination pageSize={2} />);
      // Should show only 2 rows per page
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('Bob Johnson')).not.toBeInTheDocument();
    });

    it('changes page when next button is clicked', () => {
      render(<Table data={testData} columns={testColumns} pagination pageSize={2} />);
      const nextButton = screen.getByLabelText('Next page');
      fireEvent.click(nextButton);

      expect(screen.getByText(/page 2 of/i)).toBeInTheDocument();
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
    });
  });

  // Custom rendering
  describe('Custom Rendering', () => {
    it('renders custom cell content using render function', () => {
      const columns: TableColumn<TestUser>[] = [
        {
          key: 'name',
          label: 'Name',
          render: (value) => <strong>{value}</strong>,
        },
      ];
      render(<Table data={testData} columns={columns} />);
      const strongElement = screen.getByText('John Doe').closest('strong');
      expect(strongElement).toBeInTheDocument();
    });
  });

  // Row click
  describe('Row Click', () => {
    it('calls onRowClick when row is clicked', () => {
      const onRowClick = jest.fn();
      render(<Table data={testData} columns={testColumns} onRowClick={onRowClick} />);
      const row = screen.getByText('John Doe').closest('tr');
      expect(row).not.toBeNull();
      fireEvent.click(row!);
      expect(onRowClick).toHaveBeenCalledWith(testData[0], 0);
    });
  });

  // Styling
  describe('Styling', () => {
    it('applies striped class when striped is true', () => {
      const { container } = render(<Table data={testData} columns={testColumns} striped />);
      expect(container.querySelector('.table-component--striped')).toBeInTheDocument();
    });

    it('applies bordered class when bordered is true', () => {
      const { container } = render(<Table data={testData} columns={testColumns} bordered />);
      expect(container.querySelector('.table-component--bordered')).toBeInTheDocument();
    });

    it('applies hoverable class when hoverable is true', () => {
      const { container } = render(<Table data={testData} columns={testColumns} hoverable />);
      expect(container.querySelector('.table-component--hoverable')).toBeInTheDocument();
    });

    it('applies size classes', () => {
      const { container, rerender } = render(
        <Table data={testData} columns={testColumns} size="sm" />,
      );
      expect(container.querySelector('.table-component--sm')).toBeInTheDocument();

      rerender(<Table data={testData} columns={testColumns} size="lg" />);
      expect(container.querySelector('.table-component--lg')).toBeInTheDocument();
    });

    it('applies variant classes', () => {
      const { container, rerender } = render(
        <Table data={testData} columns={testColumns} variant="primary" />,
      );
      expect(container.querySelector('.table-component--primary')).toBeInTheDocument();

      rerender(<Table data={testData} columns={testColumns} variant="secondary" />);
      expect(container.querySelector('.table-component--secondary')).toBeInTheDocument();
    });
  });

  // Style prop precedence
  describe('Style Prop Precedence', () => {
    it('merges user style prop with component styles', () => {
      const { container } = render(
        <Table
          data={testData}
          columns={testColumns}
          style={{ backgroundColor: 'red', padding: '20px' }}
        />,
      );
      const wrapper = container.querySelector('.table-component__wrapper');
      const styleAttr = wrapper?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/background-color:\s*(red|rgb\(255,\s*0,\s*0\)|#ff0000)/i);
      expect(styleAttr).toMatch(/padding:\s*20px/i);
    });

    it('user style prop takes precedence over CSS custom properties', () => {
      const { container } = render(
        <Table
          data={testData}
          columns={testColumns}
          color="#8b5cf6"
          style={{ backgroundColor: 'purple' }}
        />,
      );
      const wrapper = container.querySelector('.table-component__wrapper');
      const styleAttr = wrapper?.getAttribute('style') || '';
      expect(styleAttr).toMatch(/background-color:\s*(purple|rgb\(128,\s*0,\s*128\)|#800080)/i);
    });
  });

  // Accessibility
  describe('Accessibility', () => {
    it('has role="table"', () => {
      render(<Table data={testData} columns={testColumns} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(<Table data={testData} columns={testColumns} ariaLabel="User data table" />);
      const wrapper = screen.getByRole('table').closest('.table-component__wrapper');
      expect(wrapper).toHaveAttribute('aria-label', 'User data table');
    });

    it('sets aria-sort="none" on sortable columns by default', () => {
      render(<Table data={testData} columns={testColumns} />);
      const headers = screen.getAllByRole('columnheader');
      // sortable columns get aria-sort="none"; the first header is the checkbox column-less
      expect(headers[0]).toHaveAttribute('aria-sort', 'none');
    });

    it('sets aria-sort="ascending" then "descending" when sorted', () => {
      render(<Table data={testData} columns={testColumns} />);
      const sortButton = screen.getByLabelText('Sort by Name');
      fireEvent.click(sortButton);
      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
      fireEvent.click(sortButton);
      expect(nameHeader).toHaveAttribute('aria-sort', 'descending');
    });

    it('sets aria-selected on rows when selectable', () => {
      render(<Table data={testData} columns={testColumns} selectable rowKey={(r) => r.id} />);
      const rows = screen.getAllByRole('row');
      // rows[0] is the header row; body rows start at index 1
      expect(rows[1]).toHaveAttribute('aria-selected', 'false');
      const checkbox = rows[1].querySelector('input[type="checkbox"]') as HTMLElement;
      fireEvent.click(checkbox);
      expect(rows[1]).toHaveAttribute('aria-selected', 'true');
    });

    it('makes rows focusable and keyboard-activatable when onRowClick is set', () => {
      const onRowClick = jest.fn();
      render(<Table data={testData} columns={testColumns} onRowClick={onRowClick} />);
      const rows = screen.getAllByRole('row');
      const bodyRow = rows[1];
      expect(bodyRow).toHaveAttribute('tabindex', '0');
      bodyRow.focus();
      fireEvent.keyDown(bodyRow, { key: 'Enter' });
      expect(onRowClick).toHaveBeenCalledWith(testData[0], 0);
    });

    it('does not make rows focusable when onRowClick is not set', () => {
      render(<Table data={testData} columns={testColumns} />);
      const rows = screen.getAllByRole('row');
      expect(rows[1]).not.toHaveAttribute('tabindex');
    });
  });

  // Filtering
  describe('Filtering', () => {
    it('renders filter inputs when filterable is true', () => {
      render(<Table data={testData} columns={testColumns} filterable />);
      const filterInputs = screen
        .getAllByRole('textbox')
        .filter((el) => el.classList.contains('table-component__filter-input'));
      expect(filterInputs).toHaveLength(testColumns.length);
    });

    it('does not render filter inputs when filterable is false', () => {
      render(<Table data={testData} columns={testColumns} />);
      expect(screen.queryAllByLabelText(/Filter by/)).toHaveLength(0);
    });

    it('hides the filter for a column when column.filterable is false', () => {
      const columns: TableColumn<TestUser>[] = [
        { key: 'name', label: 'Name', filterable: false },
        { key: 'role', label: 'Role' },
      ];
      render(<Table data={testData} columns={columns} filterable />);
      expect(screen.queryByLabelText('Filter by Name')).toBeNull();
      expect(screen.getByLabelText('Filter by Role')).toBeInTheDocument();
    });

    it('filters rows by name (case-insensitive)', () => {
      render(<Table data={testData} columns={testColumns} filterable />);
      const nameFilter = screen.getByLabelText('Filter by Name');
      fireEvent.change(nameFilter, { target: { value: 'jane' } });
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).toBeNull();
      expect(screen.queryByText('Bob Johnson')).toBeNull();
    });

    it('filters rows by role', () => {
      render(<Table data={testData} columns={testColumns} filterable />);
      const roleFilter = screen.getByLabelText('Filter by Role');
      fireEvent.change(roleFilter, { target: { value: 'admin' } });
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.queryByText('Jane Smith')).toBeNull();
    });

    it('calls onFilterChange with the new filters', () => {
      const onFilterChange = jest.fn();
      render(
        <Table data={testData} columns={testColumns} filterable onFilterChange={onFilterChange} />,
      );
      fireEvent.change(screen.getByLabelText('Filter by Email'), {
        target: { value: 'example.com' },
      });
      expect(onFilterChange).toHaveBeenCalledWith({ email: 'example.com' });
    });

    it('respects controlled filters prop', () => {
      render(<Table data={testData} columns={testColumns} filterable filters={{ name: 'bob' }} />);
      expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
      expect(screen.queryByText('John Doe')).toBeNull();
      // the filter input reflects the controlled value
      expect(screen.getByLabelText('Filter by Name')).toHaveValue('bob');
    });

    it('shows empty message when no rows match the filter', () => {
      render(<Table data={testData} columns={testColumns} filterable emptyMessage="No matches" />);
      fireEvent.change(screen.getByLabelText('Filter by Name'), {
        target: { value: 'nonexistent' },
      });
      expect(screen.getByText('No matches')).toBeInTheDocument();
    });
  });

  // Theme integration
  describe('Theme Integration', () => {
    it('renders with theme provider', () => {
      render(
        <ThemeProvider>
          <Table data={testData} columns={testColumns} />
        </ThemeProvider>,
      );
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });
});
