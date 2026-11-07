// Modal.stories.tsx
import React, { useState } from 'react';
import type { StoryObj } from '@storybook/react';
import { Modal, Button, Dropdown, Checkbox } from '../../index';

type ModalVariant = NonNullable<React.ComponentProps<typeof Modal>['variant']>;
type ModalSize = NonNullable<React.ComponentProps<typeof Modal>['size']>;
type ModalPosition = NonNullable<React.ComponentProps<typeof Modal>['position']>;
type ModalBackdrop = NonNullable<React.ComponentProps<typeof Modal>['backdrop']>;
type ModalAnimation = NonNullable<React.ComponentProps<typeof Modal>['animation']>;
type ModalShadow = NonNullable<React.ComponentProps<typeof Modal>['shadow']>;

export default {
  title: 'Components/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A highly customizable modal component with support for variants, sizes, colors, gradients, animations, positioning, and advanced theming.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'info', 'danger', 'ghost', 'outline'],
      description: 'Visual variant of the modal',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', 'full'],
      description: 'Size of the modal',
    },
    backdrop: {
      control: { type: 'select' },
      options: ['dark', 'light', 'blur', 'none'],
      description: 'Backdrop style',
    },
    position: {
      control: { type: 'select' },
      options: [
        'center',
        'top',
        'bottom',
        'left',
        'right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
      ],
      description: 'Position of the modal',
    },
    animation: {
      control: { type: 'select' },
      options: ['fade', 'slide', 'scale', 'slide-up', 'slide-down', 'slide-left', 'slide-right'],
      description: 'Animation type',
    },
    shadow: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Shadow size',
    },
    fullscreen: {
      control: { type: 'boolean' },
      description: 'Make modal fullscreen',
    },
    draggable: {
      control: { type: 'boolean' },
      description: 'Allow modal to be dragged',
    },
    resizable: {
      control: { type: 'boolean' },
      description: 'Allow modal to be resized',
    },
    closeOnEsc: {
      control: { type: 'boolean' },
      description: 'Close modal on Escape key',
    },
    closeOnOverlayClick: {
      control: { type: 'boolean' },
      description: 'Close modal on backdrop click',
    },
    closeOnFocusLoss: {
      control: { type: 'boolean' },
      description: 'Close modal on focus loss',
    },
    showCloseButton: {
      control: { type: 'boolean' },
      description: 'Show close button',
    },
    glassmorphism: {
      control: { type: 'boolean' },
      description: 'Apply glassmorphism effect',
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Maximum width of the modal',
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Maximum height of the modal',
    },
    minWidth: {
      control: { type: 'text' },
      description: 'Minimum width of the modal',
    },
    minHeight: {
      control: { type: 'text' },
      description: 'Minimum height of the modal',
    },
    textColor: {
      control: { type: 'text' },
      description: 'Custom text color for the modal content',
    },
    zIndex: {
      control: { type: 'number' },
      description: 'Z-index of the modal',
    },
  },
  decorators: [
    (Story: React.FC) => (
      <div style={{ padding: '20px', maxWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
};

// Default story
export const Default: StoryObj<typeof Modal> = {
  args: {
    isOpen: true,
    onClose: () => {},
    title: 'Welcome to MorphUI',
    description: 'This is a modern, customizable modal component.',
    children: (
      <div>
        <p>
          This modal demonstrates the basic functionality with a title, description, and content
          area.
        </p>
        <p>You can customize colors, sizes, animations, and more!</p>
      </div>
    ),
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Variants
export const Variants: StoryObj<typeof Modal> = {
  render: () => {
    const [openVariant, setOpenVariant] = useState<ModalVariant | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
          ).map((variant) => (
            <Button key={variant} variant={variant} onClick={() => setOpenVariant(variant)}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Modal
            </Button>
          ))}
        </div>

        {openVariant && (
          <Modal
            isOpen={true}
            onClose={() => setOpenVariant(null)}
            variant={openVariant}
            title={`${openVariant.charAt(0).toUpperCase() + openVariant.slice(1)} Modal`}
            description={`This is a ${openVariant} variant modal`}
          >
            <div>
              <p>
                This modal uses the <strong>{openVariant}</strong> variant.
              </p>
              <p>Notice how the colors and styling adapt to the selected variant.</p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

// Sizes
export const Sizes: StoryObj<typeof Modal> = {
  render: () => {
    const [openSize, setOpenSize] = useState<ModalSize | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
            <Button key={size} onClick={() => setOpenSize(size)}>
              {size.toUpperCase()} Size
            </Button>
          ))}
        </div>

        {openSize && (
          <Modal
            isOpen={true}
            onClose={() => setOpenSize(null)}
            size={openSize}
            title={`${openSize.toUpperCase()} Size Modal`}
            description={`This modal uses the ${openSize} size`}
          >
            <div>
              <p>
                This modal is sized as <strong>{openSize}</strong>.
              </p>
              <p>Try different sizes to see how the modal dimensions change.</p>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

// Positions
export const Positions: StoryObj<typeof Modal> = {
  render: () => {
    const [openPosition, setOpenPosition] = useState<ModalPosition | null>(null);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(
            [
              'center',
              'top',
              'bottom',
              'left',
              'right',
              'top-left',
              'top-right',
              'bottom-left',
              'bottom-right',
            ] as const
          ).map((position) => (
            <Button key={position} onClick={() => setOpenPosition(position)}>
              {position.charAt(0).toUpperCase() + position.slice(1)}
            </Button>
          ))}
        </div>

        <div
          style={{
            padding: '20px',
            background: '#f8fafc',
            border: '2px dashed #cbd5e1',
            borderRadius: '8px',
            textAlign: 'center',
          }}
        >
          <h4 style={{ margin: '0 0 16px 0', color: '#475569' }}>🎯 Position Testing Guide</h4>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              maxWidth: '400px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Top-Left
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Top
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Top-Right
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Left
            </div>
            <div
              style={{
                padding: '8px',
                background: '#3b82f6',
                borderRadius: '4px',
                fontSize: '12px',
                color: 'white',
              }}
            >
              Center
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Right
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Bottom-Left
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Bottom
            </div>
            <div
              style={{
                padding: '8px',
                background: '#e2e8f0',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            >
              Bottom-Right
            </div>
          </div>
          <p style={{ margin: '16px 0 0 0', fontSize: '14px', color: '#64748b' }}>
            Click a position button above to test where the modal appears. The modal should appear
            at the corresponding location.
          </p>
        </div>

        {openPosition && (
          <Modal
            isOpen={true}
            onClose={() => setOpenPosition(null)}
            position={openPosition}
            title={`${openPosition.charAt(0).toUpperCase() + openPosition.slice(1)} Position`}
            description={`This modal is positioned at ${openPosition}. Close this modal and try other positions!`}
            size="sm"
          >
            <div>
              <p>
                This modal is positioned at <strong>{openPosition}</strong>.
              </p>
              <p>Notice how the modal appears in different screen locations.</p>
              <p>
                <strong>Expected behavior:</strong>
              </p>
              <ul>
                <li>
                  <strong>Center:</strong> Modal appears in the center (default)
                </li>
                <li>
                  <strong>Top:</strong> Modal appears at the top center
                </li>
                <li>
                  <strong>Bottom:</strong> Modal appears at the bottom center
                </li>
                <li>
                  <strong>Left:</strong> Modal appears at the left center
                </li>
                <li>
                  <strong>Right:</strong> Modal appears at the right center
                </li>
                <li>
                  <strong>Top-Left:</strong> Modal appears at the top-left corner
                </li>
                <li>
                  <strong>Top-Right:</strong> Modal appears at the top-right corner
                </li>
                <li>
                  <strong>Bottom-Left:</strong> Modal appears at the bottom-left corner
                </li>
                <li>
                  <strong>Bottom-Right:</strong> Modal appears at the bottom-right corner
                </li>
              </ul>
            </div>
          </Modal>
        )}
      </div>
    );
  },
};

export const Effects: StoryObj<typeof Modal> = {
  render: () => {
    const [openModals, setOpenModals] = useState<Record<string, boolean>>({});

    const openModal = (key: string) => setOpenModals((prev) => ({ ...prev, [key]: true }));
    const closeModal = (key: string) => setOpenModals((prev) => ({ ...prev, [key]: false }));

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Animations */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎬 Animations
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Different animation effects for modal entrance and exit:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(
              [
                'fade',
                'slide',
                'scale',
                'slide-up',
                'slide-down',
                'slide-left',
                'slide-right',
              ] as const
            ).map((animation) => (
              <Button
                key={animation}
                variant="outline"
                onClick={() => openModal(`animation-${animation}`)}
              >
                {animation.charAt(0).toUpperCase() + animation.slice(1)}
              </Button>
            ))}
          </div>

          {(
            [
              'fade',
              'slide',
              'scale',
              'slide-up',
              'slide-down',
              'slide-left',
              'slide-right',
            ] as const
          ).map((animation) => (
            <Modal
              key={animation}
              isOpen={openModals[`animation-${animation}`] || false}
              onClose={() => closeModal(`animation-${animation}`)}
              animation={animation}
              title={`${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`}
              description={`Modal with ${animation} animation effect`}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>
                  ✨ {animation.charAt(0).toUpperCase() + animation.slice(1)} Effect
                </h4>
                <p style={{ color: '#666' }}>
                  This modal uses the <strong>{animation}</strong> animation. Notice how it enters
                  and exits with a smooth transition!
                </p>
              </div>
            </Modal>
          ))}
        </div>

        {/* Backdrops */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🌫️ Backdrops
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Different backdrop styles for the modal overlay:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(['dark', 'light', 'blur', 'none'] as const).map((backdrop) => (
              <Button
                key={backdrop}
                variant="outline"
                onClick={() => openModal(`backdrop-${backdrop}`)}
              >
                {backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop
              </Button>
            ))}
          </div>

          {(['dark', 'light', 'blur', 'none'] as const).map((backdrop) => (
            <Modal
              key={backdrop}
              isOpen={openModals[`backdrop-${backdrop}`] || false}
              onClose={() => closeModal(`backdrop-${backdrop}`)}
              backdrop={backdrop}
              title={`${backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop`}
              description={`Modal with ${backdrop} backdrop effect`}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>
                  🌫️ {backdrop.charAt(0).toUpperCase() + backdrop.slice(1)} Backdrop
                </h4>
                <p style={{ color: '#666' }}>
                  This modal uses a <strong>{backdrop}</strong> backdrop.
                  {backdrop === 'blur' && ' Notice the blur effect behind the modal!'}
                  {backdrop === 'none' && " Notice there's no backdrop overlay!"}
                </p>
              </div>
            </Modal>
          ))}
        </div>

        {/* Shadows */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            ✨ Shadows
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Different shadow intensities for the modal:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
              <Button key={shadow} variant="outline" onClick={() => openModal(`shadow-${shadow}`)}>
                {shadow === 'none' ? 'No Shadow' : `${shadow.toUpperCase()} Shadow`}
              </Button>
            ))}
          </div>

          {(['none', 'sm', 'md', 'lg', 'xl'] as const).map((shadow) => (
            <Modal
              key={shadow}
              isOpen={openModals[`shadow-${shadow}`] || false}
              onClose={() => closeModal(`shadow-${shadow}`)}
              shadow={shadow}
              title={`${shadow === 'none' ? 'No Shadow' : shadow.toUpperCase() + ' Shadow'}`}
              description={`Modal with ${shadow} shadow effect`}
            >
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <h4 style={{ marginBottom: '12px', color: '#333' }}>
                  ✨ {shadow === 'none' ? 'No Shadow' : shadow.toUpperCase() + ' Shadow'}
                </h4>
                <p style={{ color: '#666' }}>
                  This modal uses{' '}
                  <strong>{shadow === 'none' ? 'no shadow' : shadow + ' shadow'}</strong>.
                  {shadow !== 'none' && ' Notice the depth and elevation effect!'}
                </p>
              </div>
            </Modal>
          ))}
        </div>

        {/* Glassmorphism */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🪟 Glassmorphism
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            <strong>Glassmorphism</strong> is a modern design trend that creates a glass-like effect
            with:
          </p>
          <ul
            style={{ fontSize: '14px', color: '#666', marginBottom: '16px', paddingLeft: '20px' }}
          >
            <li>Translucent/transparent background</li>
            <li>Blur effect behind the element</li>
            <li>Subtle borders and shadows</li>
            <li>Frosted glass appearance</li>
          </ul>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button variant="outline" onClick={() => openModal('glassmorphism')}>
              🪟 Glassmorphism Modal
            </Button>
            <Button variant="outline" onClick={() => openModal('glassmorphism-blur')}>
              🌫️ Glassmorphism + Blur Backdrop
            </Button>
          </div>

          <Modal
            isOpen={openModals['glassmorphism'] || false}
            onClose={() => closeModal('glassmorphism')}
            glassmorphism
            backdrop="blur"
            title="🪟 Glassmorphism Effect"
            description="Modal with glassmorphism styling"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🪟 Glassmorphism Effect</h4>
              <p style={{ color: '#666', marginBottom: '16px' }}>
                Notice the translucent, frosted glass appearance of this modal!
              </p>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <p style={{ margin: 0, color: '#333', fontSize: '14px' }}>
                  This inner box also has glassmorphism styling to demonstrate the layered effect!
                </p>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={openModals['glassmorphism-blur'] || false}
            onClose={() => closeModal('glassmorphism-blur')}
            glassmorphism
            backdrop="blur"
            animation="scale"
            title="🌫️ Glassmorphism + Blur"
            description="Combined glassmorphism and blur backdrop effects"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🌫️ Combined Effects</h4>
              <p style={{ color: '#666' }}>
                This modal combines <strong>glassmorphism</strong> with{' '}
                <strong>blur backdrop</strong>
                for a modern, sophisticated look. Perfect for modern UI designs!
              </p>
            </div>
          </Modal>
        </div>

        {/* Combined Effects */}
        <div>
          <h3 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600', color: '#333' }}>
            🎭 Combined Effects
          </h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
            Mix and match different effects for unique modal experiences:
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Button variant="primary" onClick={() => openModal('combined-1')}>
              🌟 Premium Effect
            </Button>
            <Button variant="secondary" onClick={() => openModal('combined-2')}>
              🎨 Artistic Effect
            </Button>
          </div>

          <Modal
            isOpen={openModals['combined-1'] || false}
            onClose={() => closeModal('combined-1')}
            glassmorphism
            backdrop="blur"
            animation="scale"
            shadow="xl"
            title="🌟 Premium Modal"
            description="Combined glassmorphism, blur, scale animation, and extra large shadow"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🌟 Premium Effect</h4>
              <p style={{ color: '#666' }}>
                This modal combines <strong>glassmorphism</strong> + <strong>blur backdrop</strong>{' '}
                +<strong> scale animation</strong> + <strong>extra large shadow</strong> for a
                premium feel!
              </p>
            </div>
          </Modal>

          <Modal
            isOpen={openModals['combined-2'] || false}
            onClose={() => closeModal('combined-2')}
            animation="slide-up"
            backdrop="light"
            shadow="lg"
            title="🎨 Artistic Modal"
            description="Combined slide-up animation, light backdrop, and large shadow"
          >
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <h4 style={{ marginBottom: '12px', color: '#333' }}>🎨 Artistic Effect</h4>
              <p style={{ color: '#666' }}>
                This modal uses <strong>slide-up animation</strong> +{' '}
                <strong>light backdrop</strong> +<strong> large shadow</strong> for an artistic,
                elegant appearance!
              </p>
            </div>
          </Modal>
        </div>
      </div>
    );
  },
};

// Interactive Theme Builder