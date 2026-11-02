import { useCallback, useEffect, useState } from 'react';
import type { CSSProperties, RefObject } from 'react';

/**
 * Anchor placements for a `position: fixed` floating element (viewport
 * coordinates). The `-start` / `-end` suffixes align to the trigger's
 * leading / trailing edge instead of centering.
 */
export type AnchoredPosition =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

/** Placement as requested by the consumer; `'auto'` lets the hook choose. */
export type AnchoredPositionInput = AnchoredPosition | 'auto';

/** Rect shape used by the positioning math (subset of `DOMRect`). */
export interface AnchorRect {
  top: number;
  bottom: number;
  left: number;
  right: number;
  width: number;
  height: number;
}

export interface ViewportSize {
  width: number;
  height: number;
}

export interface AnchoredPositionResult {
  /** The placement actually in effect. Stays `'auto'` when JS positioning is off. */
  position: AnchoredPositionInput;
  /** Inline styles for the fixed floating element (viewport coordinates). */
  style: CSSProperties;
}

/**
 * Compute the placement and inline style for a `position: fixed` floating
 * element relative to its anchor (trigger) rect. Pure — no DOM access —
 * so every formula is unit-testable.
 *
 * Coordinate convention (matching the CSS `position: fixed` containing
 * block, i.e. the viewport):
 * - `top` / `left` measure from the viewport's top-left corner;
 * - `bottom` / `right` measure from the viewport's bottom-right corner.
 */
export function computeAnchoredPosition(
  trigger: AnchorRect,
  floating: AnchorRect,
  viewport: ViewportSize,
  position: AnchoredPositionInput,
  offset = 8,
  autoPosition = true,
): AnchoredPositionResult {
  let resolved: AnchoredPositionInput = position;

  if (position === 'auto' && autoPosition) {
    const space = {
      top: trigger.top,
      bottom: viewport.height - trigger.bottom,
      left: trigger.left,
      right: viewport.width - trigger.right,
    };
    if (space.bottom >= floating.height + offset) {
      resolved = 'bottom';
    } else if (space.top >= floating.height + offset) {
      resolved = 'top';
    } else if (space.right >= floating.width + offset) {
      resolved = 'right';
    } else if (space.left >= floating.width + offset) {
      resolved = 'left';
    } else {
      resolved = 'bottom';
    }
  }

  // 'auto' with autoPosition disabled: no JS positioning at all — the CSS
  // default placement applies (empty style).
  if (resolved === 'auto') {
    return { position: 'auto', style: {} };
  }

  // Numeric values first so the viewport clamp can reason about them.
  let top: number | undefined;
  let bottom: number | undefined;
  let left: number | undefined;
  let right: number | undefined;

  switch (resolved) {
    case 'top':
      bottom = viewport.height - trigger.top + offset;
      left = trigger.left + trigger.width / 2 - floating.width / 2;
      break;
    case 'top-start':
      bottom = viewport.height - trigger.top + offset;
      left = trigger.left;
      break;
    case 'top-end':
      bottom = viewport.height - trigger.top + offset;
      right = viewport.width - trigger.right;
      break;
    case 'bottom':
      top = trigger.bottom + offset;
      left = trigger.left + trigger.width / 2 - floating.width / 2;
      break;
    case 'bottom-start':
      top = trigger.bottom + offset;
      left = trigger.left;
      break;
    case 'bottom-end':
      top = trigger.bottom + offset;
      right = viewport.width - trigger.right;
      break;
    case 'left':
      right = viewport.width - trigger.left + offset;
      top = trigger.top + trigger.height / 2 - floating.height / 2;
      break;
    case 'left-start':
      right = viewport.width - trigger.left + offset;
      top = trigger.top;
      break;
    case 'left-end':
      right = viewport.width - trigger.left + offset;
      bottom = viewport.height - trigger.bottom;
      break;
    case 'right':
      left = trigger.right + offset;
      top = trigger.top + trigger.height / 2 - floating.height / 2;
      break;
    case 'right-start':
      left = trigger.right + offset;
      top = trigger.top;
      break;
    case 'right-end':
      left = trigger.right + offset;
      bottom = viewport.height - trigger.bottom;
      break;
  }

  // Keep the floating element inside the viewport: never let any edge
  // cross the opposite side (negative `top`/`left` would place it above /
  // left of the viewport; negative `right`/`bottom` below / right of it).
  if (top !== undefined && top < 0) top = offset;
  if (left !== undefined && left < 0) left = offset;
  if (right !== undefined && right < 0) right = offset;
  if (bottom !== undefined && bottom < 0) bottom = offset;

  const style: CSSProperties = {};
  if (top !== undefined) style.top = `${top}px`;
  if (bottom !== undefined) style.bottom = `${bottom}px`;
  if (left !== undefined) style.left = `${left}px`;
  if (right !== undefined) style.right = `${right}px`;

  return { position: resolved, style };
}

/**
 * Clamp a point (e.g. a mouse position) so an element of `size` placed at
 * that point stays inside the viewport with a `margin` gap. Used by
 * point-anchored components such as ContextMenu.
 */
export function clampToViewport(
  point: { x: number; y: number },
  size: { width: number; height: number },
  viewport: ViewportSize,
  margin = 8,
): { x: number; y: number } {
  const x = Math.min(point.x, viewport.width - size.width - margin);
  const y = Math.min(point.y, viewport.height - size.height - margin);
  return { x: Math.max(margin, x), y: Math.max(margin, y) };
}

export interface UseAnchoredPositionOptions {
  /** The element the floating content is anchored to (the trigger). */
  anchorRef: RefObject<HTMLElement | null>;
  /** The floating element; styles are applied to it imperatively. */
  floatingRef: RefObject<HTMLElement | null>;
  /** Requested placement (`'auto'` picks the roomiest side). */
  position: AnchoredPositionInput;
  /** Gap between trigger and floating content, in px. */
  offset?: number;
  /**
   * Master switch for JS positioning. When false, no measurement runs and
   * no inline styles are applied — the CSS default placement is used.
   */
  autoPosition?: boolean;
  /** Only measure while the floating element is mounted / visible. */
  active?: boolean;
}

export interface UseAnchoredPositionResult {
  /**
   * The placement in effect. Equals the raw `position` input (including
   * `'auto'`) until the first measurement resolves it, so CSS classes and
   * arrows keep rendering the requested value meanwhile.
   */
  position: AnchoredPositionInput;
}

/**
 * Position a `position: fixed` floating element relative to an anchor
 * element in viewport coordinates. Measures both elements ~10ms after the
 * element becomes active (so it is mounted and laid out), applies the
 * computed inline styles imperatively, and reports the resolved placement
 * (for CSS classes / arrows) via `position`.
 *
 * Shared by Tooltip and Popover; the pure helpers above are also reused by
 * ContextMenu (point clamping).
 */
export function useAnchoredPosition({
  anchorRef,
  floatingRef,
  position,
  offset = 8,
  autoPosition = true,
  active = true,
}: UseAnchoredPositionOptions): UseAnchoredPositionResult {
  const [resolved, setResolved] = useState<AnchoredPositionInput>(position);

  // While inactive, track the requested position so a changed prop is
  // reflected immediately on the next open instead of after measuring.
  useEffect(() => {
    if (!active) setResolved(position);
  }, [position, active]);

  const measure = useCallback(() => {
    const anchor = anchorRef.current;
    const floating = floatingRef.current;
    if (!anchor || !floating || !autoPosition) return;

    const triggerRect = anchor.getBoundingClientRect();
    const floatingRect = floating.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };

    const result = computeAnchoredPosition(
      triggerRect,
      floatingRect,
      viewport,
      position,
      offset,
      autoPosition,
    );

    setResolved((prev) => (prev === result.position ? prev : result.position));
    Object.assign(floating.style, result.style);
  }, [anchorRef, floatingRef, position, offset, autoPosition]);

  useEffect(() => {
    if (!active) return;
    // Small delay to ensure the floating element is mounted and laid out.
    const timeout = setTimeout(measure, 10);
    return () => clearTimeout(timeout);
  }, [active, measure]);

  return { position: resolved };
}
