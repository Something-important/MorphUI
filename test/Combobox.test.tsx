import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Combobox } from '../src/components/composition/Combobox';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { ComboboxOption } from '../src/components/composition/Combobox';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const fruits: ComboboxOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian', disabled: true },
];

describe('Combobox Component', () => {
  describe('Rendering', () => {
    it('renders an input with a placeholder', () => {
      renderWithTheme(<Combobox options={fruits} placeholder="Pick a fruit" />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Pick a fruit')).toBeInTheDocument();
    });

    it('renders with variant and size classes', () => {
      const { container } = renderWithTheme(
        <Combobox options={fruits} variant="outline" size="lg" />,
      );
      expect(container.querySelector('.combobox-component')).toHaveClass(
        'combobox-component--outline',
        'combobox-component--lg',
      );
    });

    it('applies a custom className', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} className="my-combobox" />);
      expect(container.querySelector('.combobox-component')).toHaveClass('my-combobox');
    });

    it('disables the input when disabled', () => {
      renderWithTheme(<Combobox options={fruits} disabled />);
      expect(screen.getByRole('combobox')).toBeDisabled();
    });
  });

  describe('Opening + filtering', () => {
    it('opens the listbox on focus', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('opens the listbox on ArrowDown', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('filters options as the user types (case-insensitive)', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'CH' } });
      expect(screen.getByText('Cherry')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).toBeNull();
      expect(screen.queryByText('Banana')).toBeNull();
    });

    it('shows the empty message when no options match', () => {
      renderWithTheme(<Combobox options={fruits} emptyMessage="No fruit" />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'zzz' } });
      expect(screen.getByText('No fruit')).toBeInTheDocument();
    });

    it('closes the listbox on Escape', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
      fireEvent.keyDown(input, { key: 'Escape' });
      expect(screen.queryByRole('listbox')).toBeNull();
    });
  });

  describe('Selection', () => {
    it('selects an option on click and calls onChange', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      fireEvent.mouseDown(screen.getByText('Banana'));
      expect(onChange).toHaveBeenCalledWith('banana');
      expect(screen.getByRole('combobox')).toHaveValue('Banana');
    });

    it('selects the highlighted option on Enter', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input); // opens + highlights Apple (index 0)
      fireEvent.keyDown(input, { key: 'ArrowDown' }); // highlight -> Banana (index 1)
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith('banana');
    });

    it('navigates with ArrowDown/ArrowUp (wraps)', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      // Apple -> Banana -> Cherry -> (wrap) Apple
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      // After 4 ArrowDowns on 3 enabled options (Apple, Banana, Cherry), highlight wraps.
      // Apple(0)->Banana(1)->Cherry(2)->Apple(0)
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(screen.getByRole('combobox')).toHaveValue('Apple');
    });

    it('does not select a disabled option on click', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      fireEvent.focus(screen.getByRole('combobox'));
      fireEvent.click(screen.getByText('Durian'));
      expect(onChange).not.toHaveBeenCalled();
    });

    it('clears the selection when clearable and Escape is pressed (list closed)', () => {
      const onChange = jest.fn();
      renderWithTheme(
        <Combobox options={fruits} clearable onChange={onChange} defaultValue="banana" />,
      );
      const input = screen.getByRole('combobox');
      // First close if open, then Escape clears
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'Escape' }); // close list
      fireEvent.keyDown(input, { key: 'Escape' }); // clear
      expect(onChange).toHaveBeenCalledWith(null);
      expect(input).toHaveValue('');
    });

    it('renders the clear button when clearable and there is a value', () => {
      renderWithTheme(<Combobox options={fruits} clearable defaultValue="apple" />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(screen.getByLabelText('Clear')).toBeInTheDocument();
    });

    it('respects a controlled value', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} value="cherry" onChange={onChange} />);
      // The selected option label shows as placeholder when input is empty.
      expect(screen.getByPlaceholderText('Cherry')).toBeInTheDocument();
    });
  });

  describe('allowFreeText', () => {
    it('commits free text on Enter when allowFreeText is true', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} allowFreeText onChange={onChange} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Kiwi' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).toHaveBeenCalledWith('Kiwi');
    });

    it('does not commit free text when allowFreeText is false (no matching option)', () => {
      const onChange = jest.fn();
      renderWithTheme(<Combobox options={fruits} onChange={onChange} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.change(input, { target: { value: 'Kiwi' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Async loading', () => {
    it('calls loadOptions when opened and shows loading then results', async () => {
      const loadOptions = jest.fn((q: string) =>
        Promise.resolve([{ label: `${q}-result`, value: `${q}-result` }]),
      );
      renderWithTheme(<Combobox options={[]} loadOptions={loadOptions} />);
      fireEvent.focus(screen.getByRole('combobox'));
      expect(loadOptions).toHaveBeenCalled();
      // loading message appears (at least briefly)
      // results appear after the promise resolves
      const result = await screen.findByText('-result');
      expect(result).toBeInTheDocument();
    });
  });

  describe('Theme integration', () => {
    const getRoot = (container: HTMLElement) =>
      container.querySelector('.combobox-component') as HTMLElement;

    it('writes the custom background var for a custom color', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} color="#ff0000" />);
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-bg': '#ff0000' });
    });

    it('resolves a theme key to a token var for the background', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} color="color-primary" />);
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-bg': 'var(--color-primary)' });
    });

    it('gradient beats color for the background var', () => {
      const gradient = 'linear-gradient(90deg, #ff0000, #0000ff)';
      const { container } = renderWithTheme(
        <Combobox options={fruits} color="#ff0000" gradient={gradient} />,
      );
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-bg': gradient });
    });

    it('writes the custom text color and border vars', () => {
      const { container } = renderWithTheme(
        <Combobox options={fruits} textColor="#ffffff" borderColor="--color-primary" />,
      );
      expect(getRoot(container)).toHaveStyle({
        '--combobox-custom-text-color': '#ffffff',
        '--combobox-custom-border': 'var(--color-primary)',
      });
    });

    it('converts a numeric borderRadius to px', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} borderRadius={12} />);
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-border-radius': '12px' });
    });

    it('keeps a string borderRadius as-is', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} borderRadius="0.5rem" />);
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-border-radius': '0.5rem' });
    });

    it('resolves the shadow token to a var', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} shadow="lg" />);
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-shadow': 'var(--shadow-lg)' });
    });

    it('user style wins over the theme prop for the same custom var', () => {
      const { container } = renderWithTheme(
        <Combobox
          options={fruits}
          color="#ff0000"
          style={{ '--combobox-custom-bg': '#00ff00' } as React.CSSProperties}
        />,
      );
      expect(getRoot(container)).toHaveStyle({ '--combobox-custom-bg': '#00ff00' });
    });

    it('writes no theme vars when no theme props are given', () => {
      const { container } = renderWithTheme(<Combobox options={fruits} />);
      const root = getRoot(container);
      expect(root.style.getPropertyValue('--combobox-custom-bg')).toBe('');
      expect(root.style.getPropertyValue('--combobox-custom-shadow')).toBe('');
    });

    it('keeps user className appended after the component classes', () => {
      const { container } = renderWithTheme(
        <Combobox options={fruits} color="#ff0000" className="my-combobox" />,
      );
      expect(getRoot(container).className.endsWith('my-combobox')).toBe(true);
    });
  });

  describe('Accessibility', () => {
    it('sets role="combobox" with aria-autocomplete="list"', () => {
      renderWithTheme(<Combobox options={fruits} ariaLabel="Fruit picker" />);
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
      expect(input).toHaveAttribute('aria-label', 'Fruit picker');
    });

    it('toggles aria-expanded with the listbox', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('aria-expanded', 'false');
      fireEvent.focus(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('links aria-controls to the listbox id', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      const listbox = screen.getByRole('listbox');
      const controlsId = input.getAttribute('aria-controls');
      expect(controlsId).toBe(listbox.getAttribute('id'));
    });

    it('sets aria-activedescendant to the highlighted option', () => {
      renderWithTheme(<Combobox options={fruits} />);
      const input = screen.getByRole('combobox');
      fireEvent.focus(input);
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      const activeId = input.getAttribute('aria-activedescendant');
      expect(activeId).toBeTruthy();
      const highlighted = document.getElementById(activeId!);
      expect(highlighted).toBeInTheDocument();
      expect(highlighted).toHaveAttribute('role', 'option');
    });

    it('marks options with role="option" and aria-selected', () => {
      renderWithTheme(<Combobox options={fruits} defaultValue="banana" />);
      fireEvent.focus(screen.getByRole('combobox'));
      const opts = screen.getAllByRole('option');
      expect(opts.length).toBeGreaterThanOrEqual(4);
      const banana = opts.find((o) => o.textContent === 'Banana');
      expect(banana).toHaveAttribute('aria-selected', 'true');
    });
  });
});

// Virtualization — windowed rendering for large option lists
describe('Virtualization', () => {
  const manyOptions = Array.from({ length: 1000 }, (_, i) => ({
    label: `Option ${i}`,
    value: `opt-${i}`,
  }));

  it('renders only a window of options, not all 1000', () => {
    const { container } = render(
      <ThemeProvider>
        <Combobox options={manyOptions} virtualize itemHeight={40} />
      </ThemeProvider>,
    );
    // Open the listbox.
    fireEvent.click(container.querySelector('.combobox-component__toggle')!);
    const options = container.querySelectorAll('[role="option"]');
    // Should render far fewer than 1000 (viewport + buffer, ~20-25).
    expect(options.length).toBeLessThan(50);
    expect(options.length).toBeGreaterThan(0);
  });

  it('creates a spacer with the full scroll height', () => {
    const { container } = render(
      <ThemeProvider>
        <Combobox options={manyOptions} virtualize itemHeight={40} />
      </ThemeProvider>,
    );
    fireEvent.click(container.querySelector('.combobox-component__toggle')!);
    // The spacer div (listbox's direct child) has height = 1000 * 40 = 40000px.
    const spacer = container.querySelector('[role="listbox"] > div') as HTMLElement;
    expect(spacer.style.height).toBe('40000px');
  });

  it('shifts the visible window on scroll', () => {
    const { container } = render(
      <ThemeProvider>
        <Combobox options={manyOptions} virtualize itemHeight={40} listboxMaxHeight={320} />
      </ThemeProvider>,
    );
    fireEvent.click(container.querySelector('.combobox-component__toggle')!);
    const listbox = container.querySelector('[role="listbox"]') as HTMLElement;

    // Initial window: first option is "Option 0" (or near it).
    const firstBatch = Array.from(container.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent,
    );
    expect(firstBatch).toContain('Option 0');

    // Scroll down 400px (10 items). The window should shift — Option 0
    // should no longer be rendered, but Option 10+ should be.
    fireEvent.scroll(listbox, { target: { scrollTop: 400 } });
    const secondBatch = Array.from(container.querySelectorAll('[role="option"]')).map(
      (o) => o.textContent,
    );
    expect(secondBatch).not.toContain('Option 0');
    expect(secondBatch.some((t) => t?.includes('Option 1'))).toBe(true);
  });

  it('renders all options when virtualize is off', () => {
    const { container } = render(
      <ThemeProvider>
        <Combobox options={manyOptions.slice(0, 50)} />
      </ThemeProvider>,
    );
    fireEvent.click(container.querySelector('.combobox-component__toggle')!);
    expect(container.querySelectorAll('[role="option"]').length).toBe(50);
  });
});

// Edge cases for coverage: async error, keyboard wrap, click-outside, mouse
describe('Edge cases', () => {
  const opts = [
    { label: 'Apple', value: 'apple' },
    { label: 'Banana', value: 'banana' },
    { label: 'Cherry', value: 'cherry' },
  ];

  it('ArrowUp wraps from first to last option', () => {
    render(
      <ThemeProvider>
        <Combobox options={opts} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    // Open + ArrowDown to highlight first.
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    // ArrowUp from first should wrap to last.
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    const options = screen.getAllByRole('option');
    expect(options[options.length - 1]).toHaveClass('combobox-component__option--highlighted');
  });

  it('Tab closes the open listbox', () => {
    render(
      <ThemeProvider>
        <Combobox options={opts} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // open
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(input, { key: 'Tab' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('Home highlights the first option', () => {
    render(
      <ThemeProvider>
        <Combobox options={opts} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // open, highlight 0
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // highlight 1
    fireEvent.keyDown(input, { key: 'Home' }); // back to 0
    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveClass('combobox-component__option--highlighted');
  });

  it('End highlights the last option', () => {
    render(
      <ThemeProvider>
        <Combobox options={opts} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // open
    fireEvent.keyDown(input, { key: 'End' });
    const options = screen.getAllByRole('option');
    expect(options[options.length - 1]).toHaveClass('combobox-component__option--highlighted');
  });

  it('click outside closes the listbox', () => {
    const { container } = render(
      <ThemeProvider>
        <Combobox options={opts} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // open
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    // Click outside (on the container background).
    fireEvent.mouseDown(container.ownerDocument.body);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('selects an option via mouseDown', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <Combobox options={opts} onChange={onChange} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' }); // open
    const options = screen.getAllByRole('option');
    fireEvent.mouseDown(options[1]); // select Banana
    expect(onChange).toHaveBeenCalledWith('banana');
  });

  it('handles async loadOptions rejection (clears loading state)', async () => {
    const loadOptions = jest.fn().mockRejectedValue(new Error('fetch failed'));
    const { container } = render(
      <ThemeProvider>
        <Combobox options={[]} loadOptions={loadOptions} />
      </ThemeProvider>,
    );
    const input = screen.getByRole('combobox');
    // Type to trigger loadOptions.
    fireEvent.change(input, { target: { value: 'test' } });
    // Wait for the rejection to settle.
    await new Promise((r) => setTimeout(r, 50));
    // Loading state should be cleared after rejection.
    expect(container.querySelector('.combobox-component--loading')).not.toBeInTheDocument();
  });
});
