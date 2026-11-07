import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useModal } from '../../hooks';
import { Button } from '../../components/basic/Button';
import { Input } from '../../components/basic/Input';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useModal',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless modal behavior: open/close state, Escape-to-close, Tab focus trapping, optional focus-loss close, and body scroll lock. Attach `modalRef` to the dialog element and render conditionally on `isOpen`. Controlled and uncontrolled modes.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const ModalShell = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1050,
    }}
    onClick={onClose}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        background: 'var(--color-background, #fff)',
        color: 'var(--color-text, #111827)',
        borderRadius: 'var(--border-radius-lg, 12px)',
        padding: '24px',
        minWidth: '320px',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-xl, 0 20px 25px -5px rgba(0,0,0,0.1))',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <h3 style={{ margin: 0, fontSize: 'var(--font-size-xl, 18px)' }}>{title}</h3>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}
        >
          ×
        </button>
      </div>
      {children}
    </div>
  </div>
);

export const Default: Story = {
  render: () => {
    const { isOpen, open, close, modalRef } = useModal();
    return (
      <Demo title="Uncontrolled modal (defaultOpen=false)">
        <Button variant="primary" onClick={open}>
          Open modal
        </Button>
        {isOpen && (
          <ModalShell title="Default modal" onClose={close}>
            <div ref={modalRef as React.RefObject<HTMLDivElement>}>
              <p style={{ margin: '0 0 16px' }}>
                This modal traps Tab focus, closes on Escape, and locks body scroll. Click the
                backdrop or × to close.
              </p>
              <Button variant="primary" size="sm" onClick={close}>
                Close
              </Button>
            </div>
          </ModalShell>
        )}
      </Demo>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [controlledOpen, setControlledOpen] = useState(false);
    const { isOpen, close, modalRef } = useModal({
      isOpen: controlledOpen,
      onClose: () => setControlledOpen(false),
    });
    return (
      <Demo title="Controlled modal (parent owns state)">
        <Button variant="primary" onClick={() => setControlledOpen(true)}>
          Open controlled modal
        </Button>
        {isOpen && (
          <ModalShell title="Controlled modal" onClose={close}>
            <div ref={modalRef as React.RefObject<HTMLDivElement>}>
              <p style={{ margin: '0 0 16px' }}>
                The parent owns the open state. The hook still handles Escape, focus trap, and
                scroll lock.
              </p>
              <Button variant="outline" size="sm" onClick={close}>
                Close
              </Button>
            </div>
          </ModalShell>
        )}
      </Demo>
    );
  },
};

export const Options: Story = {
  render: () => {
    const { isOpen, open, close, modalRef } = useModal({
      closeOnEsc: true,
      closeOnFocusLoss: true,
      trapFocus: true,
      lockScroll: true,
    });
    return (
      <Demo title="All options enabled (focus-loss close)">
        <Button variant="primary" onClick={open}>
          Open modal (focus-loss close)
        </Button>
        {isOpen && (
          <ModalShell title="Options demo" onClose={close}>
            <div ref={modalRef as React.RefObject<HTMLDivElement>}>
              <p style={{ margin: '0 0 16px' }}>
                This modal closes when focus leaves it (Tab past the last focusable element). Try
                Tabbing through — focus stays trapped until you close.
              </p>
              <Input placeholder="Focus me, then Tab away" />
            </div>
          </ModalShell>
        )}
      </Demo>
    );
  },
};

export const Integration: Story = {
  render: () => {
    const { isOpen, open, close, modalRef } = useModal();
    return (
      <Demo title="Sign-in form composition">
        <Button variant="primary" onClick={open}>
          Open sign-in modal
        </Button>
        {isOpen && (
          <ModalShell title="Sign in" onClose={close}>
            <div ref={modalRef as React.RefObject<HTMLDivElement>}>
              <Stack gap={12}>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Button variant="primary" fullWidth onClick={close}>
                  Sign in
                </Button>
              </Stack>
            </div>
          </ModalShell>
        )}
      </Demo>
    );
  },
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="useModal trigger across all 5 preset themes">
      <ThemeGrid>
        <Button variant="primary">Open modal</Button>
      </ThemeGrid>
    </Demo>
  ),
};

export const EdgeCases: Story = {
  render: () => {
    const { isOpen, open, close, toggle, modalRef } = useModal();
    return (
      <Demo title="Edge cases — toggle, defaultOpen">
        <Stack gap={8}>
          <Button variant="primary" onClick={open}>
            Open
          </Button>
          <Button variant="outline" onClick={toggle}>
            Toggle (open or close)
          </Button>
          {isOpen && (
            <ModalShell title="Edge cases" onClose={close}>
              <div ref={modalRef as React.RefObject<HTMLDivElement>}>
                <p style={{ margin: 0 }}>
                  The toggle() function works in uncontrolled mode. The modal has focus trap +
                  scroll lock active.
                </p>
              </div>
            </ModalShell>
          )}
        </Stack>
      </Demo>
    );
  },
};
