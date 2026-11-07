import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { Button } from '../../basic/Button';
import { Input } from '../../basic/Input';
import { Demo, Stack, ThemeGrid } from '../../../stories/_shared';

const meta: Meta<typeof Modal> = {
  title: 'Patterns/Modal',
  component: Modal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Modal renders a dialog overlay. Controlled via isOpen + onClose. 8 variants, 6 sizes, 3 positions, 7 animations, custom header/footer, backdrop options.',
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

// Helper: Modal is controlled, so we need a trigger + state wrapper.
// For stories we render it isOpen=true so users see the content immediately.

export const Default: Story = {
  render: () => (
    <Modal isOpen onClose={() => {}} title="Default modal">
      <div style={{ padding: '16px' }}>
        <p>This is a modal dialog. Click the X or backdrop to close.</p>
      </div>
    </Modal>
  ),
};

export const Variants: Story = {
  render: () => (
    <Demo title="All variants (each rendered open)">
      <Stack gap={12}>
        {(
          [
            'primary',
            'secondary',
            'success',
            'warning',
            'info',
            'danger',
            'ghost',
            'outline',
          ] as const
        ).map((v) => (
          <Modal key={v} isOpen onClose={() => {}} variant={v} title={`${v} modal`} size="sm">
            <div style={{ padding: '12px' }}>{v} variant body.</div>
          </Modal>
        ))}
      </Stack>
    </Demo>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Demo title="All sizes (each rendered open)">
      <Stack gap={12}>
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Modal key={s} isOpen onClose={() => {}} size={s} title={`${s} size`}>
            <div style={{ padding: '12px' }}>{s} size body.</div>
          </Modal>
        ))}
      </Stack>
    </Demo>
  ),
};

export const States: Story = {
  render: () => (
    <Demo title="With header & footer (composition)">
      <Modal
        isOpen
        onClose={() => {}}
        title="Confirm action"
        size="md"
        footer={
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', padding: '12px' }}>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button variant="primary" size="sm">
              Confirm
            </Button>
          </div>
        }
      >
        <div style={{ padding: '16px' }}>
          Are you sure you want to proceed? This action cannot be undone.
        </div>
      </Modal>
    </Demo>
  ),
};

export const Customization: Story = {
  render: () => (
    <Demo title="Positions, animations, custom colors, gradients">
      <Stack gap={12}>
        {(['center', 'top', 'bottom'] as const).map((p) => (
          <Modal key={p} isOpen onClose={() => {}} position={p} size="sm" title={`${p} position`}>
            <div style={{ padding: '12px' }}>{p} position.</div>
          </Modal>
        ))}
        <Modal
          isOpen
          onClose={() => {}}
          size="sm"
          color="#ff0055"
          textColor="#fff"
          title="Custom color"
        >
          <div style={{ padding: '12px' }}>Custom background color.</div>
        </Modal>
        <Modal
          isOpen
          onClose={() => {}}
          size="sm"
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
          textColor="#fff"
          title="Gradient"
        >
          <div style={{ padding: '12px' }}>Gradient background.</div>
        </Modal>
      </Stack>
    </Demo>
  ),
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="Modal trigger across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Open modal</Button>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <Demo title="Edge cases — full size, long content">
      <Stack gap={12}>
        <Modal isOpen onClose={() => {}} size="full" title="Full size">
          <div style={{ padding: '16px' }}>Full-size modal — nearly the entire viewport.</div>
        </Modal>
        <Modal isOpen onClose={() => {}} size="md" title="Long content">
          <div style={{ padding: '16px' }}>
            {`This modal contains a very long body message that should scroll if it exceeds the viewport height.

            `.repeat(10)}
          </div>
        </Modal>
      </Stack>
    </Demo>
  ),
};

export const Integration: Story = {
  render: () => (
    <Demo title="Sign-in form composition">
      <Modal
        isOpen
        onClose={() => {}}
        title="Sign in"
        size="sm"
        footer={
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', padding: '12px' }}>
            <Button variant="outline" size="sm">
              Cancel
            </Button>
            <Button variant="primary" size="sm">
              Sign in
            </Button>
          </div>
        }
      >
        <Stack gap={12} style={{ padding: '16px' }}>
          <Input type="email" placeholder="Email" />
          <Input type="password" placeholder="Password" />
        </Stack>
      </Modal>
    </Demo>
  ),
};
