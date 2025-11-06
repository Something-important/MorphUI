// Table.tsx
import React, { forwardRef, useState, useMemo, useCallback } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Table.css';

export type SortDirection = 'asc' | 'desc' | null;
export type TableSize = 'xs' | 'sm' | 'md' | 'lg';

export interface TableColumn<T = any> {
  key: string;
  label: string;
  dataKey?: keyof T;
  render?: (value: any, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  className?: string;
}

export interface TableProps<T = any> {
  // Data
  data: T[];
  columns: TableColumn<T>[];

  // Selection
  selectable?: boolean;
  selectedRows?: any[];
  onSelectionChange?: (selectedRows: any[]) => void;
  rowKey?: (row: any) => string | number;

  // Sorting
  sortable?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: SortDirection;
  onSort?: (column: string, direction: SortDirection) => void;

  // Filtering
  filterable?: boolean;
  filters?: Record<string, any>;
  onFilterChange?: (filters: Record<string, any>) => void;

  // Pagination
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  totalItems?: number;

  // Styling
  variant?: 'primary' | 'secondary' | 'default';
  size?: TableSize;
  striped?: boolean;
  bordered?: boolean;
  hoverable?: boolean;
  color?: string;
  gradient?: string;
  textColor?: string;
  borderColor?: string;
  headerColor?: string;
  headerGradient?: string;
  headerTextColor?: string;
  rowColor?: string;
  hoverRowColor?: string;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';

  // Features
  loading?: boolean;
  emptyMessage?: string | React.ReactNode;
  loadingMessage?: string | React.ReactNode;

  // Accessibility
  ariaLabel?: string;
  ariaDescribedBy?: string;
  id?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;

  // Events
  onRowClick?: (row: any, index: number) => void;
}

export const Table = forwardRef<HTMLDivElement, TableProps<any>>(
  (
    {
      data,
      columns,

      // Selection
      selectable = false,
      selectedRows: controlledSelectedRows,
      onSelectionChange,
      rowKey = (row: any) => (row as any).id || (row as any).key || JSON.stringify(row),

      // Sorting
      sortable: globalSortable = true,
      defaultSortColumn,
      defaultSortDirection = null,
      onSort: controlledOnSort,

      // Filtering
      filterable: globalFilterable = false,
      filters: controlledFilters,
      onFilterChange,

      // Pagination
      pagination = false,
      pageSize = 10,
      currentPage: controlledCurrentPage,
      onPageChange,
      totalItems,

      // Styling
      variant = 'default',
      size = 'md',
      striped = false,
      bordered = true,
      hoverable = true,
      color,
      gradient,
      textColor,
      borderColor,
      headerColor,
      headerGradient,
      headerTextColor,
      rowColor,
      hoverRowColor,
      shadow = 'md',

      // Features
      loading = false,
      emptyMessage = 'No data available',
      loadingMessage = 'Loading...',

      // Accessibility
      ariaLabel,
      ariaDescribedBy,
      id,

      // Styling overrides
      className = '',
      style,

      // Events
      onRowClick,
      ...rest
    }: TableProps<any>,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    // Internal state for uncontrolled mode
    const [internalSelectedRows, setInternalSelectedRows] = useState<any[]>([]);
    const [internalSortColumn, setInternalSortColumn] = useState<string | null>(
      defaultSortColumn || null,
    );
    const [internalSortDirection, setInternalSortDirection] =
      useState<SortDirection>(defaultSortDirection);
    const [internalFilters, setInternalFilters] = useState<Record<string, any>>({});
    const [internalCurrentPage, setInternalCurrentPage] = useState(1);

    // Determine if controlled
    const isControlledSelection = controlledSelectedRows !== undefined;
    const isControlledSort = controlledOnSort !== undefined;
    const isControlledFilters = controlledFilters !== undefined;
    const isControlledPagination = controlledCurrentPage !== undefined;

    // Current values
    const selectedRows = isControlledSelection ? controlledSelectedRows : internalSelectedRows;
    const sortColumn = internalSortColumn;
    const sortDirection = internalSortDirection;
    const filters = isControlledFilters ? controlledFilters : internalFilters;
    const currentPage = isControlledPagination ? controlledCurrentPage : internalCurrentPage;

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedGradient = resolveThemeValue(gradient);
    const resolvedTextColor = resolveThemeValue(textColor);
    const resolvedBorderColor = resolveThemeValue(borderColor);
    const resolvedHeaderColor = resolveThemeValue(headerColor);
    const resolvedHeaderGradient = resolveThemeValue(headerGradient);
    const resolvedHeaderTextColor = resolveThemeValue(headerTextColor);
    const resolvedRowColor = resolveThemeValue(rowColor);
    const resolvedHoverRowColor = resolveThemeValue(hoverRowColor);

    // Check for gradients
    const isBackgroundGradient =
      resolvedGradient &&
      (resolvedGradient.includes('linear-gradient') ||
        resolvedGradient.includes('radial-gradient') ||
        resolvedGradient.includes('conic-gradient'));

    const isHeaderGradient =
      resolvedHeaderGradient &&
      (resolvedHeaderGradient.includes('linear-gradient') ||
        resolvedHeaderGradient.includes('radial-gradient') ||
        resolvedHeaderGradient.includes('conic-gradient'));

    // Handle sorting
    const handleSort = useCallback(
      (columnKey: string) => {
        if (isControlledSort) {
          const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
          controlledOnSort(columnKey, newDirection);
        } else {
          const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
          setInternalSortColumn(columnKey);
          setInternalSortDirection(newDirection);
        }
      },
      [sortColumn, sortDirection, isControlledSort, controlledOnSort],
    );

    // Sort data
    const sortedData = useMemo(() => {
      if (!sortColumn || !sortDirection) return data;

      const column = columns.find((col) => col.key === sortColumn);
      if (!column || !column.sortable) return data;

      return [...data].sort((a, b) => {
        const aValue = column.dataKey ? (a as any)[column.dataKey] : (a as any)[column.key];
        const bValue = column.dataKey ? (b as any)[column.dataKey] : (b as any)[column.key];

        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return 1;
        if (bValue == null) return -1;

        const comparison =
          typeof aValue === 'string' && typeof bValue === 'string'
            ? aValue.localeCompare(bValue)
            : aValue > bValue
              ? 1
              : aValue < bValue
                ? -1
                : 0;

        return sortDirection === 'asc' ? comparison : -comparison;
      });
    }, [data, columns, sortColumn, sortDirection]);

    // Paginate data
    const paginatedData = useMemo(() => {
      if (!pagination) return sortedData;

      const start = (currentPage - 1) * pageSize;
      const end = start + pageSize;
      return sortedData.slice(start, end);
    }, [sortedData, pagination, currentPage, pageSize]);

    // Handle row selection
    const toggleRowSelection = useCallback(
      (row: any) => {
        const key = rowKey(row);
        const isSelected = selectedRows.some((r) => rowKey(r) === key);

        let newSelection: any[];
        if (isSelected) {
          newSelection = selectedRows.filter((r) => rowKey(r) !== key);
        } else {
          newSelection = [...selectedRows, row];
        }

        if (!isControlledSelection) {
          setInternalSelectedRows(newSelection);
        }
        onSelectionChange?.(newSelection);
      },
      [selectedRows, rowKey, isControlledSelection, onSelectionChange],
    );

    // Handle select all
    const toggleSelectAll = useCallback(() => {
      const allSelected = paginatedData.every((row) =>
        selectedRows.some((r) => rowKey(r) === rowKey(row)),
      );

      let newSelection: any[];
      if (allSelected) {
        newSelection = selectedRows.filter(
          (r) => !paginatedData.some((row) => rowKey(row) === rowKey(r)),
        );
      } else {
        const newRows = paginatedData.filter(
          (row) => !selectedRows.some((r) => rowKey(r) === rowKey(row)),
        );
        newSelection = [...selectedRows, ...newRows];
      }

      if (!isControlledSelection) {
        setInternalSelectedRows(newSelection);
      }
      onSelectionChange?.(newSelection);
    }, [paginatedData, selectedRows, rowKey, isControlledSelection, onSelectionChange]);

    // Handle page change
    const handlePageChange = useCallback(
      (page: number) => {
        if (!isControlledPagination) {
          setInternalCurrentPage(page);
        }
        onPageChange?.(page);
      },
      [isControlledPagination, onPageChange],
    );

    // Calculate total pages
    const totalPages = pagination
      ? Math.ceil((totalItems !== undefined ? totalItems : sortedData.length) / pageSize)
      : 1;

    // Classes
    const classes = [
      'table-component',
      `table-component--${variant}`,
      `table-component--${size}`,
      striped && 'table-component--striped',
      bordered && 'table-component--bordered',
      hoverable && 'table-component--hoverable',
      isBackgroundGradient && 'table-component--background-gradient',
      isHeaderGradient && 'table-component--header-gradient',
      loading && 'table-component--loading',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      // Background: gradient > color (gradients take precedence)
      ...(resolvedGradient && {
        '--table-custom-bg': resolvedGradient,
        '--table-bg': resolvedGradient,
      }),
      ...(resolvedColor &&
        !resolvedGradient && {
          '--table-custom-bg': resolvedColor,
          '--table-bg': resolvedColor,
        }),

      // Text and border colors
      ...(resolvedTextColor && {
        '--table-custom-color': resolvedTextColor,
        '--table-color': resolvedTextColor,
      }),
      ...(resolvedBorderColor && {
        '--table-custom-border': resolvedBorderColor,
        '--table-border': resolvedBorderColor,
      }),

      // Header colors: headerGradient > headerColor
      ...(resolvedHeaderGradient && {
        '--table-custom-header-bg': resolvedHeaderGradient,
        '--table-header-bg': resolvedHeaderGradient,
      }),
      ...(resolvedHeaderColor &&
        !resolvedHeaderGradient && {
          '--table-custom-header-bg': resolvedHeaderColor,
          '--table-header-bg': resolvedHeaderColor,
        }),
      ...(resolvedHeaderTextColor && {
        '--table-custom-header-color': resolvedHeaderTextColor,
        '--table-header-color': resolvedHeaderTextColor,
      }),

      // Row colors
      ...(resolvedRowColor && {
        '--table-custom-row-bg': resolvedRowColor,
        '--table-row-bg': resolvedRowColor,
      }),
      ...(resolvedHoverRowColor && {
        '--table-custom-hover-row-bg': resolvedHoverRowColor,
        '--table-hover-row-bg': resolvedHoverRowColor,
      }),

      // Shadow
      ...(shadow &&
        resolveThemeValue(`shadow-${shadow}`) && {
          '--table-custom-shadow': resolveThemeValue(`shadow-${shadow}`)!,
        }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || 'Data table',
      describedBy: ariaDescribedBy,
    });

    // Check if all visible rows are selected
    const allSelected =
      paginatedData.length > 0 &&
      paginatedData.every((row) => selectedRows.some((r) => rowKey(r) === rowKey(row)));
    const someSelected = paginatedData.some((row) =>
      selectedRows.some((r) => rowKey(r) === rowKey(row)),
    );

    return (
      <div
        ref={ref}
        id={id}
        className={`${classes} table-component__wrapper`}
        style={mergedStyle}
        {...ariaProps}
        {...rest}
      >
        {loading ? (
          <div className="table-component__loading">
            {typeof loadingMessage === 'string' ? <p>{loadingMessage}</p> : loadingMessage}
          </div>
        ) : (
          <>
            <table className="table-component__table" role="table">
              <thead className="table-component__thead">
                <tr className="table-component__tr">
                  {selectable && (
                    <th className="table-component__th table-component__th--checkbox">
                      <input
                        type="checkbox"
                        checked={allSelected}
                        onChange={toggleSelectAll}
                        ref={(input) => {
                          if (input) input.indeterminate = someSelected && !allSelected;
                        }}
                        aria-label="Select all rows"
                      />
                    </th>
                  )}
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={`table-component__th ${column.className || ''}`}
                      style={{
                        width: column.width,
                        textAlign: column.headerAlign || column.align || 'left',
                      }}
                    >
                      <div className="table-component__th-content">
                        <span>{column.label}</span>
                        {globalSortable && column.sortable !== false && (
                          <button
                            type="button"
                            className={`table-component__sort ${
                              sortColumn === column.key
                                ? `table-component__sort--${sortDirection}`
                                : ''
                            }`}
                            onClick={() => handleSort(column.key)}
                            aria-label={`Sort by ${column.label}`}
                          >
                            <span className="table-component__sort-icon">⇅</span>
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-component__tbody">
                {paginatedData.length === 0 ? (
                  <tr className="table-component__tr">
                    <td
                      className="table-component__td table-component__td--empty"
                      colSpan={columns.length + (selectable ? 1 : 0)}
                    >
                      {typeof emptyMessage === 'string' ? <p>{emptyMessage}</p> : emptyMessage}
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row, rowIndex) => {
                    const key = rowKey(row);
                    const isSelected = selectedRows.some((r) => rowKey(r) === key);

                    return (
                      <tr
                        key={key}
                        className={`table-component__tr ${isSelected ? 'table-component__tr--selected' : ''}`}
                        onClick={() => onRowClick?.(row, rowIndex)}
                      >
                        {selectable && (
                          <td className="table-component__td table-component__td--checkbox">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleRowSelection(row)}
                              onClick={(e) => e.stopPropagation()}
                              aria-label={`Select row ${rowIndex + 1}`}
                            />
                          </td>
                        )}
                        {columns.map((column) => {
                          const value = column.dataKey
                            ? (row as any)[column.dataKey]
                            : (row as any)[column.key];
                          const renderedValue = column.render
                            ? column.render(value, row, rowIndex)
                            : value;

                          return (
                            <td
                              key={column.key}
                              className={`table-component__td ${column.className || ''}`}
                              style={{
                                textAlign: column.align || 'left',
                              }}
                            >
                              {renderedValue}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>

            {pagination && totalPages > 1 && (
              <div className="table-component__pagination">
                <button
                  type="button"
                  className="table-component__pagination-btn"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  ‹
                </button>
                <span className="table-component__pagination-info">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  className="table-component__pagination-btn"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  ›
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  },
);

Table.displayName = 'Table';
