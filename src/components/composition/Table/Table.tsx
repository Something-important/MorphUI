// Table.tsx
import React, { forwardRef, useState, useMemo, useCallback, useTransition, useRef } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Table.css';

export type SortDirection = 'asc' | 'desc' | null;
export type TableSize = 'xs' | 'sm' | 'md' | 'lg';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  dataKey?: keyof T;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string | number;
  align?: 'left' | 'center' | 'right';
  headerAlign?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  className?: string;
  /** Allow the user to resize this column by dragging its right edge. */
  resizable?: boolean;
}

export interface TableProps<T = Record<string, unknown>> {
  // Data
  data: T[];
  columns: TableColumn<T>[];

  // Selection
  selectable?: boolean;
  /** Controlled selected rows. */
  selectedRows?: T[];
  /** Uncontrolled initial selected rows. Ignored when `selectedRows` is provided. */
  defaultSelectedRows?: T[];
  onSelectionChange?: (selectedRows: T[]) => void;
  rowKey?: (row: T) => string | number;

  // Sorting
  sortable?: boolean;
  defaultSortColumn?: string;
  defaultSortDirection?: SortDirection;
  onSort?: (column: string, direction: SortDirection) => void;

  // Filtering
  filterable?: boolean;
  /** Controlled filter values. */
  filters?: Record<string, unknown>;
  /** Uncontrolled initial filter values. Ignored when `filters` is provided. */
  defaultFilters?: Record<string, unknown>;
  onFilterChange?: (filters: Record<string, unknown>) => void;

  // Pagination
  pagination?: boolean;
  pageSize?: number;
  /** Controlled current page (1-indexed). */
  currentPage?: number;
  /** Uncontrolled initial current page. Ignored when `currentPage` is provided. */
  defaultCurrentPage?: number;
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
  onRowClick?: (row: T, index: number) => void;

  // Row expansion
  /** Enable expandable rows (adds an expand/collapse toggle column). */
  expandable?: boolean;
  /** Render the expanded content for a row. Required when `expandable` is true. */
  renderExpandedRow?: (row: T, index: number) => React.ReactNode;
  /** Controlled expanded rows. */
  expandedRows?: T[];
  /** Uncontrolled initial expanded rows. Ignored when `expandedRows` is provided. */
  defaultExpandedRows?: T[];
  onExpandChange?: (expandedRows: T[]) => void;
}

function TableInner<T>(
  {
    data,
    columns,

    // Selection
    selectable = false,
    selectedRows: controlledSelectedRows,
    defaultSelectedRows,
    onSelectionChange,
    rowKey = (row) => {
      const record = row as Record<string, unknown>;
      const id = record['id'] || record['key'];
      return typeof id === 'string' || typeof id === 'number' ? id : JSON.stringify(row);
    },

    // Sorting
    sortable: globalSortable = true,
    defaultSortColumn,
    defaultSortDirection = null,
    onSort: controlledOnSort,

    // Filtering
    filterable = false,
    filters: controlledFilters,
    defaultFilters,
    onFilterChange,

    // Pagination
    pagination = false,
    pageSize = 10,
    currentPage: controlledCurrentPage,
    defaultCurrentPage,
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

    // Row expansion
    expandable = false,
    renderExpandedRow,
    expandedRows: controlledExpandedRows,
    defaultExpandedRows,
    onExpandChange,

    ...rest
  }: TableProps<T>,
  ref: React.Ref<HTMLDivElement>,
) {
  // Internal state for uncontrolled mode
  const [, startTransition] = useTransition();
  const [internalSelectedRows, setInternalSelectedRows] = useState<T[]>(defaultSelectedRows ?? []);

  // Column resizing (uncontrolled — internal state per column key)
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ key: string; startX: number; startWidth: number } | null>(null);

  const handleResizeStart = useCallback((e: React.MouseEvent, columnKey: string) => {
    e.stopPropagation();
    e.preventDefault();
    const th = (e.currentTarget as HTMLElement).closest('th');
    const startWidth = th?.getBoundingClientRect().width ?? 0;
    resizingRef.current = { key: columnKey, startX: e.clientX, startWidth };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!resizingRef.current) return;
      const { key, startX, startWidth } = resizingRef.current;
      const newWidth = Math.max(40, startWidth + (ev.clientX - startX));
      setColumnWidths((prev) => ({ ...prev, [key]: newWidth }));
    };

    const handleMouseUp = () => {
      resizingRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, []);

  // Resolve the effective width for a column (resized width takes precedence)
  const getColumnWidth = useCallback(
    (column: TableColumn<T>): string | number | undefined => {
      const resized = columnWidths[column.key];
      return resized !== undefined ? `${resized}px` : column.width;
    },
    [columnWidths],
  );
  const [internalSortColumn, setInternalSortColumn] = useState<string | null>(
    defaultSortColumn || null,
  );
  const [internalSortDirection, setInternalSortDirection] =
    useState<SortDirection>(defaultSortDirection);
  const [internalCurrentPage, setInternalCurrentPage] = useState(defaultCurrentPage ?? 1);
  const [internalFilters, setInternalFilters] = useState<Record<string, string>>(
    (defaultFilters as Record<string, string>) ?? {},
  );
  const [internalExpandedRows, setInternalExpandedRows] = useState<T[]>(defaultExpandedRows ?? []);

  // Determine if controlled
  const isControlledSelection = controlledSelectedRows !== undefined;
  const isControlledSort = controlledOnSort !== undefined;
  const isControlledPagination = controlledCurrentPage !== undefined;
  const isControlledExpanded = controlledExpandedRows !== undefined;

  // Current values
  const selectedRows = isControlledSelection ? controlledSelectedRows : internalSelectedRows;
  const sortColumn = internalSortColumn;
  const sortDirection = internalSortDirection;
  const currentPage = isControlledPagination ? controlledCurrentPage : internalCurrentPage;
  const expandedRows = isControlledExpanded ? controlledExpandedRows! : internalExpandedRows;

  const isControlledFilters = controlledFilters !== undefined;
  const filters = isControlledFilters
    ? (controlledFilters as Record<string, string>)
    : internalFilters;

  // Row expansion toggle
  const toggleRowExpanded = useCallback(
    (row: T) => {
      const key = rowKey(row);
      const isExpanded = expandedRows.some((r) => rowKey(r) === key);
      const newExpanded = isExpanded
        ? expandedRows.filter((r) => rowKey(r) !== key)
        : [...expandedRows, row];
      if (!isControlledExpanded) {
        setInternalExpandedRows(newExpanded);
      }
      onExpandChange?.(newExpanded);
    },
    [expandedRows, rowKey, isControlledExpanded, onExpandChange],
  );

  const isRowExpanded = useCallback(
    (row: T) => expandedRows.some((r) => rowKey(r) === rowKey(row)),
    [expandedRows, rowKey],
  );

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

  // Handle sorting — wrapped in useTransition so sorting large tables
  // doesn't block the UI. The sort button responds immediately; the
  // row reordering happens at lower priority.
  const handleSort = useCallback(
    (columnKey: string) => {
      const newDirection = sortColumn === columnKey && sortDirection === 'asc' ? 'desc' : 'asc';
      if (isControlledSort) {
        controlledOnSort(columnKey, newDirection);
      } else {
        startTransition(() => {
          setInternalSortColumn(columnKey);
          setInternalSortDirection(newDirection);
        });
      }
    },
    [sortColumn, sortDirection, isControlledSort, controlledOnSort, startTransition],
  );

  // Resolve a cell value for a row by column key (dataKey takes precedence)
  const getCellValue = useCallback((row: T, column: TableColumn<T>): unknown => {
    const record = row as Record<string, unknown>;
    return column.dataKey
      ? record[column.dataKey as string]
      : record[column.key as keyof T & string];
  }, []);

  // Handle filter changes (controlled + uncontrolled)
  const handleFilterChange = useCallback(
    (columnKey: string, value: string) => {
      const newFilters = { ...filters, [columnKey]: value };
      if (!isControlledFilters) {
        setInternalFilters(newFilters);
      }
      onFilterChange?.(newFilters);
    },
    [filters, isControlledFilters, onFilterChange],
  );

  // Filter data (per-column case-insensitive text search)
  const filteredData = useMemo(() => {
    const activeFilters = Object.entries(filters).filter(([, v]) => v);
    if (activeFilters.length === 0) return data;
    return data.filter((row) =>
      activeFilters.every(([key, value]) => {
        const column = columns.find((col) => col.key === key);
        if (!column) return true;
        const cellValue = getCellValue(row, column);
        if (cellValue == null) return false;
        return String(cellValue).toLowerCase().includes(String(value).toLowerCase());
      }),
    );
  }, [data, columns, filters, getCellValue]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;

    const column = columns.find((col) => col.key === sortColumn);
    if (!column || !column.sortable) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = getCellValue(a, column);
      const bValue = getCellValue(b, column);

      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const av = aValue as string | number;
      const bv = bValue as string | number;
      const comparison =
        typeof aValue === 'string' && typeof bValue === 'string'
          ? aValue.localeCompare(bValue)
          : av > bv
            ? 1
            : av < bv
              ? -1
              : 0;

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [filteredData, columns, sortColumn, sortDirection, getCellValue]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return sortedData.slice(start, end);
  }, [sortedData, pagination, currentPage, pageSize]);

  // Handle row selection
  const toggleRowSelection = useCallback(
    (row: T) => {
      const key = rowKey(row);
      const isSelected = selectedRows.some((r) => rowKey(r) === key);

      let newSelection: T[];
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

    let newSelection: T[];
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
    }),
    ...(resolvedColor &&
      !resolvedGradient && {
        '--table-custom-bg': resolvedColor,
      }),

    // Text and border colors
    ...(resolvedTextColor && {
      '--table-custom-color': resolvedTextColor,
    }),
    ...(resolvedBorderColor && {
      '--table-custom-border': resolvedBorderColor,
    }),

    // Header colors: headerGradient > headerColor
    ...(resolvedHeaderGradient && {
      '--table-custom-header-bg': resolvedHeaderGradient,
    }),
    ...(resolvedHeaderColor &&
      !resolvedHeaderGradient && {
        '--table-custom-header-bg': resolvedHeaderColor,
      }),
    ...(resolvedHeaderTextColor && {
      '--table-custom-header-color': resolvedHeaderTextColor,
    }),

    // Row colors
    ...(resolvedRowColor && {
      '--table-custom-row-bg': resolvedRowColor,
    }),
    ...(resolvedHoverRowColor && {
      '--table-custom-hover-row-bg': resolvedHoverRowColor,
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
      {...rest}
    >
      {loading ? (
        <div className="table-component__loading">
          {typeof loadingMessage === 'string' ? <p>{loadingMessage}</p> : loadingMessage}
        </div>
      ) : (
        <>
          <table className="table-component__table" role="table" {...ariaProps}>
            <thead className="table-component__thead">
              <tr className="table-component__tr">
                {expandable && (
                  <th
                    scope="col"
                    className="table-component__th table-component__th--expand-toggle"
                  >
                    <span className="table-component__expand-toggle-header" />
                  </th>
                )}
                {selectable && (
                  <th scope="col" className="table-component__th table-component__th--checkbox">
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
                {columns.map((column) => {
                  const isSortable = globalSortable && column.sortable !== false;
                  const fixedClass = column.fixed
                    ? ` table-component__th--fixed-${column.fixed}`
                    : '';
                  return (
                    <th
                      key={column.key}
                      scope="col"
                      className={`table-component__th${fixedClass} ${column.className || ''}`}
                      style={{
                        width: getColumnWidth(column),
                        textAlign: column.headerAlign || column.align || 'left',
                      }}
                      aria-sort={
                        isSortable
                          ? sortColumn === column.key
                            ? sortDirection === 'asc'
                              ? 'ascending'
                              : 'descending'
                            : 'none'
                          : undefined
                      }
                    >
                      <div className="table-component__th-content">
                        <span>{column.label}</span>
                        {isSortable && (
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
                        {filterable && column.filterable !== false && (
                          <input
                            type="text"
                            className="table-component__filter-input"
                            placeholder={`Filter`}
                            value={filters[column.key] || ''}
                            onChange={(e) => handleFilterChange(column.key, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`Filter by ${column.label}`}
                          />
                        )}
                      </div>
                      {column.resizable && (
                        <div
                          className="table-component__resize-handle"
                          onMouseDown={(e) => handleResizeStart(e, column.key)}
                          aria-hidden="true"
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="table-component__tbody">
              {paginatedData.length === 0 ? (
                <tr className="table-component__tr">
                  <td
                    className="table-component__td table-component__td--empty"
                    colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0)}
                  >
                    {typeof emptyMessage === 'string' ? <p>{emptyMessage}</p> : emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const key = rowKey(row);
                  const isSelected = selectedRows.some((r) => rowKey(r) === key);
                  const isExpanded = expandable && isRowExpanded(row);
                  const colSpan = columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0);

                  return (
                    <React.Fragment key={key}>
                      <tr
                        className={`table-component__tr ${isSelected ? 'table-component__tr--selected' : ''} ${isExpanded ? 'table-component__tr--expanded-parent' : ''}`}
                        onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                        tabIndex={onRowClick ? 0 : undefined}
                        onKeyDown={
                          onRowClick
                            ? (e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  onRowClick(row, rowIndex);
                                }
                              }
                            : undefined
                        }
                        aria-selected={selectable ? isSelected : undefined}
                      >
                        {expandable && (
                          <td className="table-component__td table-component__td--expand-toggle">
                            <button
                              type="button"
                              className="table-component__expand-toggle"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleRowExpanded(row);
                              }}
                              aria-expanded={isExpanded}
                              aria-label={
                                isExpanded
                                  ? `Collapse row ${rowIndex + 1}`
                                  : `Expand row ${rowIndex + 1}`
                              }
                            >
                              <span className="table-component__expand-icon">
                                {isExpanded ? '▼' : '▶'}
                              </span>
                            </button>
                          </td>
                        )}
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
                          const value = getCellValue(row, column);
                          const renderedValue = column.render
                            ? column.render(value, row, rowIndex)
                            : (value as React.ReactNode);

                          return (
                            <td
                              key={column.key}
                              className={`table-component__td${column.fixed ? ` table-component__td--fixed-${column.fixed}` : ''} ${column.className || ''}`}
                              style={{
                                width: getColumnWidth(column),
                                textAlign: column.align || 'left',
                              }}
                            >
                              {renderedValue}
                            </td>
                          );
                        })}
                      </tr>
                      {isExpanded && renderExpandedRow && (
                        <tr className="table-component__tr table-component__tr--expanded">
                          <td
                            colSpan={colSpan}
                            className="table-component__td table-component__td--expanded-content"
                          >
                            {renderExpandedRow(row, rowIndex)}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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
}

// Re-export with full generic support (forwardRef erases generics on its own)
export const Table = forwardRef(TableInner) as (<T = Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => ReturnType<typeof TableInner>) & { displayName?: string };

Table.displayName = 'Table';
