import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useAnchoredPosition, type AnchoredPosition } from '../../hooks';
import { Button } from '../../components/basic/Button';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useAnchoredPosition',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Position a `position: fixed` floating element relative to an anchor element in viewport coordinates. Supports 12 placements, auto-positioning (picks the roomiest side), offset, and viewport clamping. Shared by Tooltip and Popover.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const positions: AnchoredPosition[] = [
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end',
];

const AnchoredDemo = ({ position }: { position: AnchoredPosition }) => {
  const [active, setActive] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const { position: resolved } = useAnchoredPosition({
    anchorRef,
    floatingRef,
    position,
    offset: 8,
    active,
  });

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Button
        ref={anchorRef as React.RefObject<HTMLButtonElement>}
        variant="outline"
        size="sm"
        onClick={() => setActive((v) => !v)}
      >
        {active ? 'Hide' : 'Show'} ({position})
      </Button>
      {active && (
        <div
          ref={floatingRef as React.RefObject<HTMLDivElement>}
          style={{
            position: 'fixed',
            background: 'var(--color-primary, #0070f3)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: 'var(--border-radius-sm, 4px)',
            fontSize: 'var(--font-size-xs, 10px)',
            zIndex: 1100,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {resolved} floating content
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Demo title="Default — click to toggle a positioned floating element">
        <AnchoredDemo position="bottom" />
      </Demo>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Demo title="All 12 positions (click each to toggle)">
        <Stack gap={12}>
          {positions.map((pos) => (
            <AnchoredDemo key={pos} position={pos} />
          ))}
        </Stack>
      </Demo>
    </div>
  ),
};

export const AutoPosition: Story = {
  render: () => {
    const [active, setActive] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const floatingRef = useRef<HTMLDivElement>(null);
    const { position: resolved } = useAnchoredPosition({
      anchorRef,
      floatingRef,
      position: 'auto',
      offset: 8,
      active,
    });

    return (
      <div style={{ padding: '40px' }}>
        <Demo title="Auto-positioning (picks the roomiest side)">
          <Stack gap={12}>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>
              The hook measures available space on all 4 sides and picks the one with the most room.
              Try moving the browser window to change available space.
            </p>
            <Button
              ref={anchorRef as React.RefObject<HTMLButtonElement>}
              variant="primary"
              onClick={() => setActive((v) => !v)}
            >
              {active ? 'Hide' : 'Show'} auto-positioned element
            </Button>
            {active && (
              <div
                ref={floatingRef as React.RefObject<HTMLDivElement>}
                style={{
                  position: 'fixed',
                  background: 'var(--color-success, #10b981)',
                  color: '#fff',
                  padding: '12px 16px',
                  borderRadius: 'var(--border-radius-md, 8px)',
                  zIndex: 1100,
                  pointerEvents: 'none',
                }}
              >
                Resolved to: {resolved}
              </div>
            )}
          </Stack>
        </Demo>
      </div>
    );
  },
};

export const Offset: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Demo title="Custom offset (20px gap)">
        <OffsetDemo offset={20} />
      </Demo>
    </div>
  ),
};

const OffsetDemo = ({ offset }: { offset: number }) => {
  const [active, setActive] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  useAnchoredPosition({
    anchorRef,
    floatingRef,
    position: 'bottom',
    offset,
    active,
  });

  return (
    <Stack gap={8}>
      <Button
        ref={anchorRef as React.RefObject<HTMLButtonElement>}
        variant="outline"
        onClick={() => setActive((v) => !v)}
      >
        {active ? 'Hide' : 'Show'} with {offset}px offset
      </Button>
      {active && (
        <div
          ref={floatingRef as React.RefObject<HTMLDivElement>}
          style={{
            position: 'fixed',
            background: 'var(--color-info, #3b82f6)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: 'var(--border-radius-sm, 4px)',
            zIndex: 1100,
            pointerEvents: 'none',
          }}
        >
          {offset}px gap from trigger
        </div>
      )}
    </Stack>
  );
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Trigger across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Anchor button</Button>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ padding: '40px' }}>
      <Demo title="Edge cases — inactive (no JS positioning), disabled auto-position">
        <Stack gap={12}>
          <InactiveDemo />
          <NoAutoPositionDemo />
        </Stack>
      </Demo>
    </div>
  ),
};

const InactiveDemo = () => {
  const anchorRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const { position } = useAnchoredPosition({
    anchorRef,
    floatingRef,
    position: 'bottom',
    active: false,
  });
  return (
    <Stack gap={8}>
      <strong>inactive (active=false): position stays '{position}'</strong>
      <Button ref={anchorRef as React.RefObject<HTMLButtonElement>} variant="outline">
        Anchor (no floating element shown)
      </Button>
      <div ref={floatingRef as React.RefObject<HTMLDivElement>} style={{ display: 'none' }} />
    </Stack>
  );
};

const NoAutoPositionDemo = () => {
  const [active, setActive] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const floatingRef = useRef<HTMLDivElement>(null);
  const { position } = useAnchoredPosition({
    anchorRef,
    floatingRef,
    position: 'auto',
    autoPosition: false,
    active,
  });
  return (
    <Stack gap={8}>
      <strong>autoPosition=false: position stays '{position}' (CSS default applies)</strong>
      <Button
        ref={anchorRef as React.RefObject<HTMLButtonElement>}
        variant="outline"
        onClick={() => setActive((v) => !v)}
      >
        {active ? 'Hide' : 'Show'} (no JS positioning)
      </Button>
      {active && (
        <div
          ref={floatingRef as React.RefObject<HTMLDivElement>}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            background: 'var(--color-warning, #f59e0b)',
            color: '#fff',
            padding: '8px 12px',
            borderRadius: 'var(--border-radius-sm, 4px)',
            zIndex: 1100,
            pointerEvents: 'none',
          }}
        >
          CSS default (centered) — no JS positioning
        </div>
      )}
    </Stack>
  );
};
