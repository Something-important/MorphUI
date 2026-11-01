import React from 'react';
import { render, screen, act } from '@testing-library/react';
import {
  computeAnchoredPosition,
  clampToViewport,
  useAnchoredPosition,
  type AnchorRect,
} from '../src/hooks';

// A trigger sitting at (100,100)-(200,200) in a 1024x768 viewport, and a
// 200x80 floating element. Numbers chosen so every formula has a distinct,
// hand-checkable result.
const TRIGGER: AnchorRect = {
  top: 100,
  bottom: 200,
  left: 100,
  right: 200,
  width: 100,
  height: 100,
};
const FLOATING: AnchorRect = {
  top: 300,
  bottom: 380,
  left: 150,
  right: 350,
  width: 200,
  height: 80,
};
const VIEWPORT = { width: 1024, height: 768 };
const OFFSET = 8;

// Same mock shape the component tests use.
const mockRect = (rect: Partial<DOMRect> = {}): DOMRect => ({
  top: 100,
  bottom: 200,
  left: 100,
  right: 200,
  width: 100,
  height: 100,
  x: 100,
  y: 100,
  toJSON: () => ({}),
  ...rect,
});

const compute = (position: Parameters<typeof computeAnchoredPosition>[3]) =>
  computeAnchoredPosition(TRIGGER, FLOATING, VIEWPORT, position, OFFSET, true);

describe('computeAnchoredPosition', () => {
  describe('explicit placements (viewport / fixed coordinates)', () => {
    // Centered horizontally: trigger.center 150 minus floating half-width 100.
    const CENTERED_LEFT = '50px';
    // Centered vertically: trigger.middle 150 minus floating half-height 40.
    const CENTERED_TOP = '110px';

    it.each([
      // top family: bottom edge sits OFFSET above the trigger's top edge.
      ['top', { bottom: '676px', left: CENTERED_LEFT }],
      ['top-start', { bottom: '676px', left: '100px' }],
      ['top-end', { bottom: '676px', right: '824px' }],
      // bottom family: top edge sits OFFSET below the trigger's bottom edge.
      ['bottom', { top: '208px', left: CENTERED_LEFT }],
      ['bottom-start', { top: '208px', left: '100px' }],
      ['bottom-end', { top: '208px', right: '824px' }],
      // left family: right edge sits OFFSET left of the trigger's left edge,
      // measured from the viewport's right edge (1024 - 100 + 8).
      ['left', { right: '932px', top: CENTERED_TOP }],
      ['left-start', { right: '932px', top: '100px' }],
      ['left-end', { right: '932px', bottom: '568px' }],
      // right family: left edge sits OFFSET right of the trigger's right edge.
      ['right', { left: '208px', top: CENTERED_TOP }],
      ['right-start', { left: '208px', top: '100px' }],
      ['right-end', { left: '208px', bottom: '568px' }],
    ] as const)('places %s correctly', (position, expected) => {
      const { position: resolved, style } = compute(position);
      expect(resolved).toBe(position);
      expect(style).toEqual(expected);
    });

    it('regression: Popover top/left math now matches Tooltip (viewport basis)', () => {
      // The pre-refactor Popover computed bottom = trigger.height + offset
      // and right = trigger.left + offset — coordinate bases that detach the
      // popover from the trigger. The shared hook pins the correct math.
      const top = compute('top');
      expect(top.style.bottom).toBe(`${768 - TRIGGER.top + OFFSET}px`);

      const left = compute('left');
      expect(left.style.right).toBe(`${1024 - TRIGGER.left + OFFSET}px`);
    });
  });

  describe("position 'auto'", () => {
    it('prefers bottom when there is room below', () => {
      const { position } = compute('auto');
      expect(position).toBe('bottom');
    });

    it('flips to top when the trigger is at the bottom of the viewport', () => {
      const trigger = { ...TRIGGER, top: 700, bottom: 750 };
      const { position } = computeAnchoredPosition(
        trigger,
        FLOATING,
        VIEWPORT,
        'auto',
        OFFSET,
        true,
      );
      expect(position).toBe('top');
    });

    it('falls back to bottom when nothing fits', () => {
      const tiny = { width: 400, height: 300 };
      const centered = { top: 150, bottom: 150, left: 200, right: 200, width: 0, height: 0 };
      const { position } = computeAnchoredPosition(centered, FLOATING, tiny, 'auto', OFFSET, true);
      expect(position).toBe('bottom');
    });

    it("stays 'auto' with no styles when autoPosition is disabled", () => {
      const { position, style } = computeAnchoredPosition(
        TRIGGER,
        FLOATING,
        VIEWPORT,
        'auto',
        OFFSET,
        false,
      );
      expect(position).toBe('auto');
      expect(style).toEqual({});
    });
  });

  describe('viewport clamp', () => {
    it('clamps a negative left to the offset', () => {
      const offscreen = { ...TRIGGER, left: -50, right: 50 };
      const { style } = computeAnchoredPosition(
        offscreen,
        FLOATING,
        VIEWPORT,
        'bottom-start',
        OFFSET,
        true,
      );
      expect(style.left).toBe('8px');
      expect(style.top).toBe('208px');
    });

    it('clamps a negative top to the offset', () => {
      // 'bottom' derives top from the trigger's bottom edge — push that
      // above the viewport to force a negative result.
      const offscreen = { ...TRIGGER, top: -160, bottom: -60 };
      const { style } = computeAnchoredPosition(
        offscreen,
        FLOATING,
        VIEWPORT,
        'bottom',
        OFFSET,
        true,
      );
      // raw top = -60 + 8 = -52 -> clamped to the offset
      expect(style.top).toBe('8px');
    });

    it('clamps a negative right to the offset', () => {
      // 'top-end' derives right from the trigger's right edge — push the
      // trigger past the viewport's right edge to force a negative result.
      const offscreen = { ...TRIGGER, left: 1000, right: 1100 };
      const { style } = computeAnchoredPosition(
        offscreen,
        FLOATING,
        VIEWPORT,
        'top-end',
        OFFSET,
        true,
      );
      // raw right = 1024 - 1100 = -76 -> clamped to the offset
      expect(style.right).toBe('8px');
      expect(style.bottom).toBe('676px');
    });
  });
});

describe('clampToViewport', () => {
  it('passes through an on-screen point unchanged', () => {
    expect(clampToViewport({ x: 100, y: 100 }, { width: 200, height: 100 }, VIEWPORT, 8)).toEqual({
      x: 100,
      y: 100,
    });
  });

  it('pulls a near-bottom-right point back inside', () => {
    const { x, y } = clampToViewport({ x: 900, y: 700 }, { width: 200, height: 100 }, VIEWPORT, 8);
    expect(x).toBe(1024 - 200 - 8);
    expect(y).toBe(768 - 100 - 8);
  });

  it('enforces the minimum margin', () => {
    expect(clampToViewport({ x: 0, y: 0 }, { width: 200, height: 100 }, VIEWPORT, 8)).toEqual({
      x: 8,
      y: 8,
    });
  });
});

describe('useAnchoredPosition', () => {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;

  afterEach(() => {
    Element.prototype.getBoundingClientRect = originalGetBoundingClientRect;
  });

  const Harness = ({ active, position }: { active: boolean; position: 'top' | 'auto' }) => {
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const floatingRef = React.useRef<HTMLDivElement>(null);
    const { position: resolved } = useAnchoredPosition({
      anchorRef,
      floatingRef,
      position,
      offset: 8,
      autoPosition: true,
      active,
    });
    return (
      <>
        <div ref={anchorRef}>anchor</div>
        {active && <div ref={floatingRef} data-testid="floating" className={`pos-${resolved}`} />}
      </>
    );
  };

  it('reports the raw position before measuring and applies styles after', () => {
    Element.prototype.getBoundingClientRect = jest.fn(() =>
      mockRect({ top: 100, bottom: 200, left: 100, right: 200, width: 100, height: 100 }),
    ) as unknown as () => DOMRect;

    jest.useFakeTimers();
    const { rerender } = render(<Harness active={false} position="auto" />);
    // Inactive: nothing mounted, position stays the raw input.
    expect(() => screen.getByTestId('floating')).toThrow();

    rerender(<Harness active position="auto" />);
    // Mounted with the raw 'auto' before the 10ms measurement fires…
    expect(screen.getByTestId('floating').className).toBe('pos-auto');

    act(() => {
      jest.advanceTimersByTime(11);
    });
    // …and resolved + styled afterwards. Trigger at (100,100)-(200,200):
    // plenty of room below, so 'auto' resolves to 'bottom' with
    // top = 200 + 8 and left = 100 + 50 - 50 (100x100 floating mock).
    expect(screen.getByTestId('floating').className).toBe('pos-bottom');
    expect(screen.getByTestId('floating').style.top).toBe('208px');
    expect(screen.getByTestId('floating').style.left).toBe('100px');
    jest.useRealTimers();
  });

  it('resolves a requested explicit placement', () => {
    Element.prototype.getBoundingClientRect = jest.fn(() =>
      mockRect({ top: 100, bottom: 200, left: 100, right: 200, width: 100, height: 100 }),
    ) as unknown as () => DOMRect;

    jest.useFakeTimers();
    render(<Harness active position="top" />);
    act(() => {
      jest.advanceTimersByTime(11);
    });
    expect(screen.getByTestId('floating').className).toBe('pos-top');
    // bottom = viewport 768 - trigger.top 100 + offset 8
    expect(screen.getByTestId('floating').style.bottom).toBe('676px');
    jest.useRealTimers();
  });
});
