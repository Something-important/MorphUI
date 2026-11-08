import type { Meta, StoryObj } from '@storybook/react';
import { useDropdown, type UseDropdownOption } from '../../hooks';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useDropdown',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless dropdown behavior: open/close state, selection (single and multi-select), keyboard navigation, search/filtering, outside-click handling, and option group flattening. Extracted from the Dropdown component (PR #110).',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const options: UseDropdownOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
];

const DropdownDemo = ({ multiSelect = false }: { multiSelect?: boolean }) => {
  const {
    isOpen,
    selectedLabels,
    filteredOptions,
    toggle,
    selectOption,
    isSelected,
    clear,
    containerRef,
  } = useDropdown({
    options,
    multiSelect,
    placeholder: 'Select...',
    onChange: (v) => console.log('selected:', v),
  });

  return (
    <Demo
      title={multiSelect ? 'useDropdown — multi-select mode' : 'useDropdown — single-select mode'}
    >
      <Stack gap={12}>
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          style={{ position: 'relative', width: '200px' }}
        >
          <button
            onClick={toggle}
            style={{
              padding: '8px 12px',
              width: '100%',
              borderRadius: 'var(--border-radius-md, 8px)',
              border: '1px solid var(--color-border, #d1d5db)',
              background: 'var(--color-background, #fff)',
              cursor: 'pointer',
              textAlign: 'left',
              color: 'var(--color-text, #111827)',
            }}
          >
            {selectedLabels} <span style={{ float: 'right' }}>▾</span>
          </button>
          {isOpen && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '4px',
                border: '1px solid var(--color-border, #d1d5db)',
                borderRadius: 'var(--border-radius-md, 8px)',
                background: 'var(--color-background, #fff)',
                zIndex: 10,
              }}
            >
              {filteredOptions.map((opt) => (
                <div
                  key={opt.value}
                  role="option"
                  aria-selected={isSelected(opt.value)}
                  tabIndex={-1}
                  onClick={() => selectOption(opt.value)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    background: isSelected(opt.value)
                      ? 'var(--color-background-hover, rgba(0,0,0,0.05))'
                      : 'transparent',
                    color: 'var(--color-text, #111827)',
                  }}
                >
                  {multiSelect && (
                    <span style={{ marginRight: '8px' }}>{isSelected(opt.value) ? '☑' : '☐'}</span>
                  )}
                  {opt.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={clear}
          style={{
            padding: '4px 8px',
            fontSize: '12px',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-secondary, #6b7280)',
            cursor: 'pointer',
          }}
        >
          Clear selection
        </button>
      </Stack>
    </Demo>
  );
};

export const Default: Story = {
  render: () => <DropdownDemo />,
};

export const MultiSelect: Story = {
  render: () => <DropdownDemo multiSelect />,
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="useDropdown trigger across all 5 preset themes">
      <ThemeGrid>
        <button
          style={{
            padding: '8px 12px',
            borderRadius: 'var(--border-radius-sm, 4px)',
            border: '1px solid var(--color-border, #d1d5db)',
            background: 'var(--color-background, #fff)',
            cursor: 'pointer',
            color: 'var(--color-text, #111827)',
          }}
        >
          Select...
        </button>
      </ThemeGrid>
    </Demo>
  ),
};
