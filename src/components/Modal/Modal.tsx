import React, { ReactNode } from 'react';
import './Modal.css';

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  closeOnEsc?: boolean; // optional, default true
  closeOnOverlayClick?: boolean; // optional, default true
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  ariaLabelledBy,
  ariaDescribedBy,
  closeOnOverlayClick = true,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
