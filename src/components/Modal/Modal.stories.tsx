import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal, ModalProps } from './Modal';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    isOpen: { control: 'boolean' },
    closeOnEsc: { control: 'boolean' },
    closeOnOverlayClick: { control: 'boolean' },
    ariaLabelledBy: { control: 'text' },
    ariaDescribedBy: { control: 'text' },
    onClose: { action: 'modal closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

/**
 * Wrapper component to handle ESC key close behavior based on prop
 */
const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  closeOnEsc = true,
  closeOnOverlayClick = true,
  ariaLabelledBy,
  ariaDescribedBy,
}: ModalProps & {
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
}) => {
  useEffect(() => {
    if (!closeOnEsc || !isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeOnEsc, isOpen, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabelledBy={ariaLabelledBy}
      ariaDescribedBy={ariaDescribedBy}
      closeOnOverlayClick={closeOnOverlayClick}
    >
      {children}
    </Modal>
  );
};

export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    isOpen: true,
    closeOnEsc: true,
    closeOnOverlayClick: true,
    ariaLabelledBy: 'modal-title',
    ariaDescribedBy: 'modal-desc',
    children: (
      <>
        <h2 id="modal-title">Modal Title</h2>
        <p id="modal-desc">Here is some content for the modal.</p>
      </>
    ),
  },
};
