// Pagination.tsx
import React, { forwardRef, useState, useMemo } from 'react';
import { resolveThemeValue, getAriaProps } from '../../../utils';
import './Pagination.css';

export type PaginationSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type PaginationVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

export interface PaginationProps {
  // Pagination data
  totalItems: number;
  pageSize?: number;
  currentPage?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;

  // Display options
  showPageNumbers?: boolean;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
  showPageSize?: boolean;
  showTotal?: boolean;
  siblingCount?: number; // Number of siblings to show on each side of current page

  // Page size options
  pageSizeOptions?: number[];

  // Styling
  variant?: PaginationVariant;
  size?: PaginationSize;
  color?: string;
  textColor?: string;

  // Accessibility
  ariaLabel?: string;
  id?: string;

  // Labels
  previousLabel?: string;
  nextLabel?: string;
  firstLabel?: string;
  lastLabel?: string;
  pageSizeLabel?: string;
  totalLabel?: string;

  // Styling overrides
  className?: string;
  style?: React.CSSProperties;
}

// Helper function to generate page numbers with ellipsis
const generatePageNumbers = (
  currentPage: number,
  totalPages: number,
  siblingCount: number = 1,
): (number | 'ellipsis')[] => {
  const totalNumbers = siblingCount * 2 + 5; // current + 2 siblings + first + last + 2 ellipsis
  const totalBlocks = totalNumbers + 2; // +2 for prev/next buttons

  if (totalPages <= totalBlocks) {
    // Show all pages if total pages is less than blocks
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftEllipsis = leftSiblingIndex > 2;
  const shouldShowRightEllipsis = rightSiblingIndex < totalPages - 2;

  if (!shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
    return [...leftRange, 'ellipsis', totalPages];
  }

  if (shouldShowLeftEllipsis && !shouldShowRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = Array.from(
      { length: rightItemCount },
      (_, i) => totalPages - rightItemCount + i + 1,
    );
    return [1, 'ellipsis', ...rightRange];
  }

  if (shouldShowLeftEllipsis && shouldShowRightEllipsis) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );
    return [1, 'ellipsis', ...middleRange, 'ellipsis', totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      totalItems,
      pageSize = 10,
      currentPage: controlledCurrentPage,
      defaultPage = 1,
      onPageChange,
      onPageSizeChange,

      // Display options
      showPageNumbers = true,
      showFirstLast = false,
      showPrevNext = true,
      showPageSize = false,
      showTotal = false,
      siblingCount = 1,

      // Page size options
      pageSizeOptions = [10, 20, 50, 100],

      // Styling
      variant = 'primary',
      size = 'md',
      color,
      textColor,

      // Accessibility
      ariaLabel,
      id,

      // Labels
      previousLabel = 'Previous',
      nextLabel = 'Next',
      firstLabel = 'First',
      lastLabel = 'Last',
      pageSizeLabel = 'Items per page',
      totalLabel = 'Total',

      // Styling overrides
      className = '',
      style,
      ...rest
    },
    ref,
  ) => {
    // Internal state for uncontrolled mode
    const [internalCurrentPage, setInternalCurrentPage] = useState(defaultPage);
    const [internalPageSize, setInternalPageSize] = useState(pageSize);

    // Determine if controlled
    const isPageControlled = controlledCurrentPage !== undefined;
    const currentPage = isPageControlled ? controlledCurrentPage : internalCurrentPage;
    const currentPageSize = onPageSizeChange ? pageSize : internalPageSize;

    // Calculate total pages
    const totalPages = Math.max(1, Math.ceil(totalItems / currentPageSize));

    // Clamp current page to valid range
    const clampedPage = Math.max(1, Math.min(currentPage, totalPages));

    // Generate page numbers
    const pageNumbers = useMemo(
      () => generatePageNumbers(clampedPage, totalPages, siblingCount),
      [clampedPage, totalPages, siblingCount],
    );

    // Resolve theme values
    const resolvedColor = resolveThemeValue(color);
    const resolvedTextColor = resolveThemeValue(textColor);

    // Handle page change
    const handlePageChange = (newPage: number) => {
      if (newPage < 1 || newPage > totalPages || newPage === clampedPage) return;

      if (!isPageControlled) {
        setInternalCurrentPage(newPage);
      }
      onPageChange?.(newPage);
    };

    // Handle page size change
    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newPageSize = parseInt(e.target.value, 10);

      if (!onPageSizeChange) {
        setInternalPageSize(newPageSize);
      }
      onPageSizeChange?.(newPageSize);

      // Reset to first page when page size changes
      handlePageChange(1);
    };

    // Classes
    const classes = [
      'pagination-component',
      `pagination-component--${variant}`,
      `pagination-component--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // Build component style object with CSS custom properties (match Button pattern)
    const componentStyle: React.CSSProperties & Record<string, string> = {
      ...(resolvedColor && {
        '--pagination-custom-color': resolvedColor,
        '--pagination-color': resolvedColor,
      }),
      ...(resolvedTextColor && {
        '--pagination-custom-text-color': resolvedTextColor,
        '--pagination-text-color': resolvedTextColor,
      }),
    };

    // Explicitly merge with user's style prop (user style takes precedence)
    const mergedStyle = style ? { ...componentStyle, ...style } : componentStyle;

    // ARIA attributes
    const ariaProps = getAriaProps({
      label: ariaLabel || 'Pagination navigation',
      describedBy: undefined,
    });

    return (
      <nav ref={ref} id={id} className={classes} style={mergedStyle} {...ariaProps} {...rest}>
        <div className="pagination-component__container">
          {/* Total items */}
          {showTotal && (
            <span className="pagination-component__total">
              {totalLabel}: {totalItems}
            </span>
          )}

          {/* Page size selector */}
          {showPageSize && (
            <div className="pagination-component__page-size">
              <label
                htmlFor={`${id || 'pagination'}-page-size`}
                className="pagination-component__page-size-label"
              >
                {pageSizeLabel}:
              </label>
              <select
                id={`${id || 'pagination'}-page-size`}
                className="pagination-component__page-size-select"
                value={currentPageSize}
                onChange={handlePageSizeChange}
              >
                {pageSizeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="pagination-component__navigation">
            {/* First button */}
            {showFirstLast && (
              <button
                type="button"
                className="pagination-component__btn pagination-component__btn--first"
                onClick={() => handlePageChange(1)}
                disabled={clampedPage === 1}
                aria-label={`Go to ${firstLabel} page`}
              >
                {firstLabel}
              </button>
            )}

            {/* Previous button */}
            {showPrevNext && (
              <button
                type="button"
                className="pagination-component__btn pagination-component__btn--prev"
                onClick={() => handlePageChange(clampedPage - 1)}
                disabled={clampedPage === 1}
                aria-label={`Go to ${previousLabel} page`}
              >
                {previousLabel}
              </button>
            )}

            {/* Page numbers */}
            {showPageNumbers && (
              <div className="pagination-component__pages">
                {pageNumbers.map((page, index) => {
                  if (page === 'ellipsis') {
                    return (
                      <span key={`ellipsis-${index}`} className="pagination-component__ellipsis">
                        ...
                      </span>
                    );
                  }

                  return (
                    <button
                      key={page}
                      type="button"
                      className={`pagination-component__btn pagination-component__btn--page ${
                        page === clampedPage ? 'pagination-component__btn--active' : ''
                      }`}
                      onClick={() => handlePageChange(page)}
                      aria-label={`Go to page ${page}`}
                      aria-current={page === clampedPage ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Next button */}
            {showPrevNext && (
              <button
                type="button"
                className="pagination-component__btn pagination-component__btn--next"
                onClick={() => handlePageChange(clampedPage + 1)}
                disabled={clampedPage === totalPages}
                aria-label={`Go to ${nextLabel} page`}
              >
                {nextLabel}
              </button>
            )}

            {/* Last button */}
            {showFirstLast && (
              <button
                type="button"
                className="pagination-component__btn pagination-component__btn--last"
                onClick={() => handlePageChange(totalPages)}
                disabled={clampedPage === totalPages}
                aria-label={`Go to ${lastLabel} page`}
              >
                {lastLabel}
              </button>
            )}
          </div>

          {/* Page info */}
          <span className="pagination-component__info">
            Page {clampedPage} of {totalPages}
          </span>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
