import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { Button } from '../../basic/Button';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Drawer> = {
  title: 'Composition/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Drawer renders a sliding panel from any screen edge. Supports controlled/uncontrolled open state, 4 positions, 6 sizes, custom dimensions, and header/footer content.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <Drawer defaultOpen position="right" size="md">
        <div style={{ padding: '16px' }}>
          <h3>Drawer content</h3>
          <p>This drawer slides in from the right.</p>
        </div>
      </Drawer>
      <p>The drawer is open by default — click the X to close it.</p>
    </div>
  ),
};

export const Positions: Story = {
  render: () => (
    <Demo title="All positions (each drawer opens by default)">
      <Stack gap={12}>
        {(['left', 'right', 'top', 'bottom'] as const).map((pos) => (
          <Drawer key={pos} defaultOpen position={pos} size="sm">
            <div style={{ padding: '12px' }}>
              <strong>{pos}</strong> drawer
            </div>
          </Drawer>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (left/right drawers)">
      <Stack gap={12}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((sz) => (
          <Drawer key={sz} defaultOpen position="right" size={sz}>
            <div style={{ padding: '12px' }}>
              <strong>{sz}</strong> size
            </div>
          </Drawer>
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="Controlled open/close">
      <DrawerTriggerExample />
    </Demo>
  ),
};

const DrawerTriggerExample = () => (
  <Stack gap={8}>
    <Drawer isOpen onClose={() => {}} position="right" size="md">
      <div style={{ padding: '16px' }}>
        <h3>Controlled drawer</h3>
        <p>This drawer is controlled (isOpen=true).</p>
      </div>
    </Drawer>
    <Button variant="primary">Drawer is open →</Button>
  </Stack>
);

export const Customization: Story = {
  render: () => (
    <Demo title="Custom colors, gradients, header/footer">
      <Stack gap={12}>
        <Drawer defaultOpen position="right" size="md" color="#ff0055" textColor="#fff">
          <div style={{ padding: '16px' }}>
            <strong>Custom color drawer</strong>
          </div>
        </Drawer>
        <Drawer
          defaultOpen
          position="right"
          size="md"
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          textColor="#fff"
        >
          <div style={{ padding: '16px' }}>
            <strong>Gradient drawer</strong>
          </div>
        </Drawer>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Drawer trigger across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Open drawer</Button>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — full size, custom dimensions">
      <Stack gap={12}>
        <Drawer defaultOpen position="right" size="full">
          <div style={{ padding: '16px' }}>
            <strong>Full size</strong> — nearly the entire viewport
          </div>
        </Drawer>
        <Drawer defaultOpen position="right" width="600px">
          <div style={{ padding: '16px' }}>
            <strong>Custom width</strong> — 600px
          </div>
        </Drawer>
      </Stack>
    </Demo>
  ),
};
