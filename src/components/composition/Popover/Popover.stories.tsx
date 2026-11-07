import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../../basic/Button';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Popover> = {
  title: 'Composition/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Popover renders floating content anchored to a trigger. Supports 12 positions, 4 triggers (click/hover/focus/manual), arrows, auto-positioning, and structured content (header/body/footer/actions).',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover content={{ body: 'This is a popover with body content.' }}>
      <Button variant="primary">Hover or click me</Button>
    </Popover>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants">
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
          <Popover key={v} variant={v} content={{ body: `${v} variant popover` }}>
            <Button variant="outline">{v}</Button>
          </Popover>
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
          <Popover key={pos} position={pos} content={{ body: `${pos} position` }}>
            <Button variant="outline">{pos}</Button>
          </Popover>
        ))}
      </div>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Controlled open state">
      <Popover
        isOpen
        onOpenChange={() => {}}
        content={{ body: 'Controlled popover (always open)' }}
      >
        <Button variant="primary">Controlled</Button>
      </Popover>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Structured content, arrows, triggers">
      <Stack gap={12}>
        <Popover
          arrow
          content={{
            header: 'Popover title',
            body: 'Body content with header and footer.',
            footer: 'Footer text',
          }}
        >
          <Button variant="primary">Structured content</Button>
        </Popover>
        <Popover trigger="click" content={{ body: 'Click trigger popover' }}>
          <Button variant="outline">Click trigger</Button>
        </Popover>
        <Popover trigger="focus" content={{ body: 'Focus trigger popover' }}>
          <Button variant="outline">Focus trigger</Button>
        </Popover>
        <Popover color="#ff0055" textColor="#fff" content={{ body: 'Custom color popover' }}>
          <Button variant="outline">Custom color</Button>
        </Popover>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Popover trigger across all 5 preset themes">
      <ThemeGrid>
        <Popover content={{ body: 'Themed popover' }}>
          <Button variant="primary">Open popover</Button>
        </Popover>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — long content, no arrow, offset">
      <Stack gap={12}>
        <Popover
          content={{
            body: 'This popover contains a very long body message that should wrap gracefully across multiple lines without breaking the popover layout or alignment.',
          }}
        >
          <Button variant="outline">Long content</Button>
        </Popover>
        <Popover arrow={false} content={{ body: 'No arrow' }}>
          <Button variant="outline">No arrow</Button>
        </Popover>
        <Popover offset={20} content={{ body: '20px offset' }}>
          <Button variant="outline">Large offset</Button>
        </Popover>
      </Stack>
    </Demo>
  ),
};
