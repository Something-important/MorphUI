import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '../src/components/Modal/Modal';

test('renders modal when open and closes on overlay click', () => {
  const onClose = jest.fn();
  render(
    <Modal isOpen={true} onClose={onClose}>
      <p>Modal Content</p>
    </Modal>
  );

  expect(screen.getByText('Modal Content')).toBeInTheDocument();

  // Click overlay
  fireEvent.click(screen.getByRole('dialog').parentElement!);
  expect(onClose).toHaveBeenCalled();
});

test('does not render when closed', () => {
  render(
    <Modal isOpen={false} onClose={() => {}}>
      <p>Modal Content</p>
    </Modal>
  );
  expect(screen.queryByText('Modal Content')).toBeNull();
});
