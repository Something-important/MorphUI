import type { ReactNode } from 'react';

/**
 * Section wrapper for story content — gives every story a consistent
 * titled-section look without each story hand-rolling its own markup.
 *
 * @example
 * <Demo title="Variants" description="All button variants side-by-side">
 *   <Button variant="primary">Primary</Button>
 *   <Button variant="outline">Outline</Button>
 * </Demo>
 */
export const Demo = ({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) => (
  <section style={{ marginBottom: '32px' }}>
    <header style={{ marginBottom: '12px' }}>
      <h3
        style={{
          margin: 0,
          fontSize: 'var(--font-size-lg, 16px)',
          fontWeight: 'var(--font-weight-semibold, 600)',
          color: 'var(--color-heading-primary, #111827)',
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            margin: '4px 0 0 0',
            fontSize: 'var(--font-size-sm, 12px)',
            color: 'var(--color-text-secondary, #6b7280)',
          }}
        >
          {description}
        </p>
      )}
    </header>
    <div>{children}</div>
  </section>
);
