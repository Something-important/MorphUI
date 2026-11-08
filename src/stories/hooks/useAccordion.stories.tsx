import type { Meta, StoryObj } from '@storybook/react';
import { useAccordion } from '../../hooks';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useAccordion',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless accordion behavior: open/close state (controlled/uncontrolled), toggle with callback fan-out (onToggle/onOpen/onClose), and disabled/loading guards. Extracted from the Accordion component (PR #109).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const AccordionDemo = ({ disabled = false }: { disabled?: boolean }) => {
  const { isOpen, toggle } = useAccordion({
    defaultOpen: false,
    disabled,
    onToggle: (open) => console.log('Accordion', open ? 'opened' : 'closed'),
  });

  return (
    <Demo title="useAccordion — click to toggle the open state">
      <Stack gap={12}>
        <button
          onClick={toggle}
          disabled={disabled}
          style={{
            padding: '12px 16px',
            borderRadius: 'var(--border-radius-md, 8px)',
            border: '1px solid var(--color-border, #d1d5db)',
            background: 'var(--color-background, #fff)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            width: '300px',
            textAlign: 'left',
            fontWeight: 600,
            color: 'var(--color-text, #111827)',
            opacity: disabled ? 0.5 : 1,
          }}
        >
          {isOpen ? '▾' : '▸'} Accordion header
        </button>
        {isOpen && (
          <div
            style={{
              padding: '12px 16px',
              border: '1px solid var(--color-border-light, #eee)',
              borderRadius: 'var(--border-radius-md, 8px)',
              background: 'var(--color-background-secondary, #f9fafb)',
              color: 'var(--color-text, #111827)',
            }}
          >
            Accordion content — the hook manages open/close state, callbacks, and guards.
          </div>
        )}
      </Stack>
    </Demo>
  );
};

export const Default: Story = {
  render: () => <AccordionDemo />,
};

export const Disabled: Story = {
  render: () => <AccordionDemo disabled />,
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="useAccordion trigger across all 5 preset themes">
      <ThemeGrid>
        <button
          style={{
            padding: '10px 14px',
            borderRadius: 'var(--border-radius-sm, 4px)',
            border: '1px solid var(--color-border, #d1d5db)',
            background: 'var(--color-background, #fff)',
            cursor: 'pointer',
            color: 'var(--color-text, #111827)',
          }}
        >
          Toggle
        </button>
      </ThemeGrid>
    </Demo>
  ),
};
