import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../../basic/Button';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Tooltip> = {
  title: 'Composition/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tooltip renders a small floating label on hover/focus/click. Supports 12 positions, 4 triggers, arrows, delays, and rich content. 8 variants, 5 sizes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="This is a tooltip">
      <Button variant="primary">Hover me</Button>
    </Tooltip>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (hover each)">
      <Stack gap={12}>
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'danger',
            'info',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <Tooltip key={v} variant={v} content={`${v} tooltip`}>
            <Button variant="outline">{v}</Button>
          </Tooltip>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Positions: Story = {
  render: () => (
    <Demo title="All positions (hover each)">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '24px',
          padding: '60px',
        }}
      >
        {(
          [
            'top',
            'top-start',
            'top-end',
            'left',
            'right',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left-start',
          ] as const
        ).map((pos) => (
          <Tooltip key={pos} position={pos} content={`${pos} position`}>
            <Button variant="outline">{pos}</Button>
          </Tooltip>
        ))}
      </div>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Controlled visibility">
      <Tooltip
        isVisible
        onVisibilityChange={() => {}}
        content="Controlled tooltip (always visible)"
      >
        <Button variant="primary">Controlled</Button>
      </Tooltip>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Triggers, arrows, delays, rich content">
      <Stack gap={12}>
        <Tooltip trigger="click" content="Click trigger tooltip">
          <Button variant="outline">Click trigger</Button>
        </Tooltip>
        <Tooltip trigger="focus" content="Focus trigger tooltip">
          <Button variant="outline">Focus trigger</Button>
        </Tooltip>
        <Tooltip arrow={false} content="No arrow tooltip">
          <Button variant="outline">No arrow</Button>
        </Tooltip>
        <Tooltip delay={1000} content="1s delay before showing">
          <Button variant="outline">1s delay</Button>
        </Tooltip>
        <Tooltip
          content={
            <div>
              <strong>Rich content</strong>
              <p style={{ margin: '4px 0 0' }}>Tooltips can contain JSX.</p>
            </div>
          }
        >
          <Button variant="outline">Rich content</Button>
        </Tooltip>
        <Tooltip color="#ff0055" textColor="#fff" content="Custom color">
          <Button variant="outline">Custom color</Button>
        </Tooltip>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Tooltip trigger across all 5 preset themes">
      <ThemeGrid>
        <Tooltip content="Themed tooltip">
          <Button variant="primary">Hover</Button>
        </Tooltip>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long content, no trigger text">
      <Stack gap={12}>
        <Tooltip content="This is a very long tooltip message that should wrap gracefully across multiple lines without breaking the tooltip layout or alignment">
          <Button variant="outline">Long content</Button>
        </Tooltip>
        <Tooltip content="Short">
          <button>•</button>
        </Tooltip>
      </Stack>
    </Demo>
  ),
};
