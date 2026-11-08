import type { Meta, StoryObj } from '@storybook/react';
import { useCombobox, type UseComboboxOption } from '../../hooks';
import { Button } from '../../components/basic/Button';
import { Demo, Stack, ThemeGrid } from '../_shared';

const meta: Meta = {
  title: 'Hooks/useCombobox',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Headless combobox behavior: filtering, keyboard navigation, selection, async loading, open/close state, and outside-click handling. Extracted from the Combobox component (PR #107). Attach `inputRef` and `listboxRef` to the DOM elements, wire `handleKeyDown` to the input.',
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const options: UseComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
];

const ComboboxDemo = () => {
  const {
    isOpen,
    inputValue,
    filteredOptions,
    highlightedIndex,
    selectedValue,
    handleKeyDown,
    handleInputChange,
    commitSelection,
    clear,
    open,
    inputRef,
    listboxRef,
    optionId,
    listboxId,
  } = useCombobox({ options, onChange: (v) => console.log('selected:', v) });

  return (
    <Demo title="useCombobox — type to filter, arrow keys to navigate, Enter to select">
      <Stack gap={12}>
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          placeholder="Type to search..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={open}
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-activedescendant={highlightedIndex >= 0 ? optionId(highlightedIndex) : undefined}
          style={{
            padding: '8px 12px',
            borderRadius: 'var(--border-radius-md, 8px)',
            border: '1px solid var(--color-border, #d1d5db)',
            fontSize: '14px',
            width: '250px',
            background: 'var(--color-background, #fff)',
            color: 'var(--color-text, #111827)',
          }}
        />
        <div>Selected: {String(selectedValue ?? 'none')}</div>
        {isOpen && (
          <div
            ref={listboxRef as React.RefObject<HTMLDivElement>}
            id={listboxId}
            role="listbox"
            style={{
              border: '1px solid var(--color-border, #d1d5db)',
              borderRadius: 'var(--border-radius-md, 8px)',
              width: '250px',
              maxHeight: '150px',
              overflowY: 'auto',
              background: 'var(--color-background, #fff)',
            }}
          >
            {filteredOptions.length === 0 ? (
              <div style={{ padding: '8px 12px', color: 'var(--color-text-muted, #9ca3af)' }}>
                No results
              </div>
            ) : (
              filteredOptions.map((opt, i) => (
                <div
                  key={opt.value}
                  id={optionId(i)}
                  role="option"
                  aria-selected={i === highlightedIndex}
                  tabIndex={-1}
                  onClick={() => commitSelection(opt)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    background:
                      i === highlightedIndex
                        ? 'var(--color-background-hover, rgba(0,0,0,0.05))'
                        : 'transparent',
                    color: 'var(--color-text, #111827)',
                  }}
                >
                  {opt.label}
                </div>
              ))
            )}
          </div>
        )}
        <Button variant="outline" size="sm" onClick={clear}>
          Clear
        </Button>
      </Stack>
    </Demo>
  );
};

export const Default: Story = {
  render: () => <ComboboxDemo />,
};

export const AllThemes: Story = {
  render: () => (
    <Demo title="useCombobox trigger across all 5 preset themes">
      <ThemeGrid>
        <input placeholder="Type to search..." style={{ padding: 8, borderRadius: 4 }} />
      </ThemeGrid>
    </Demo>
  ),
};
