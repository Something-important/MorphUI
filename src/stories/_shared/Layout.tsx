import type { CSSProperties, ReactNode } from 'react';

/**
 * Flex-gap layout primitives. Replace the ~757 hand-rolled flex wrapper
 * divs across the story suite (audit finding from 10-COMPONENT-COVERAGE.md).
 *
 * All primitives use `gap` (modern flexbox) — no negative margins, no
 * inline `style={{ display: 'flex', gap: '8px' }}` boilerplate.
 */

const baseFlex = (gap: number): CSSProperties => ({
  display: 'flex',
  gap: `${gap}px`,
});

/**
 * Horizontal row of items with consistent gap.
 *
 * @example
 * <Row><Button>A</Button><Button>B</Button></Row>
 */
export const Row = ({
  children,
  gap = 8,
  align = 'center',
  wrap = false,
  style,
}: {
  children: ReactNode;
  gap?: number;
  align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
  wrap?: boolean;
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...baseFlex(gap),
      flexDirection: 'row',
      alignItems: align,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Vertical stack of items with consistent gap.
 *
 * @example
 * <Stack gap={16}>
 *   <Demo title="A">...</Demo>
 *   <Demo title="B">...</Demo>
 * </Stack>
 */
export const Stack = ({
  children,
  gap = 16,
  align = 'stretch',
  style,
}: {
  children: ReactNode;
  gap?: number;
  align?: 'center' | 'start' | 'end' | 'baseline' | 'stretch';
  style?: CSSProperties;
}) => (
  <div
    style={{
      ...baseFlex(gap),
      flexDirection: 'column',
      alignItems: align,
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * CSS grid with N columns. Used for showing many variants/sizes at once.
 *
 * @example
 * <Grid cols={3}>
 *   <Button variant="primary">Primary</Button>
 *   <Button variant="outline">Outline</Button>
 *   <Button variant="ghost">Ghost</Button>
 * </Grid>
 */
export const Grid = ({
  children,
  cols = 3,
  gap = 12,
  style,
}: {
  children: ReactNode;
  cols?: number;
  gap?: number;
  style?: CSSProperties;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: `${gap}px`,
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Centered content — useful for single-component demos.
 *
 * @example
 * <Center><Spinner size="lg" /></Center>
 */
export const Center = ({
  children,
  minHeight = 'auto',
}: {
  children: ReactNode;
  minHeight?: string | number;
}) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: typeof minHeight === 'number' ? `${minHeight}px` : minHeight,
      padding: '24px',
    }}
  >
    {children}
  </div>
);
