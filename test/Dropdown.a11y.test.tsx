import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Dropdown } from '../src/components/interactive/Dropdown';
import { ThemeProvider } from '../src/components/theme/ThemeProvider';
import type { DropdownOption, DropdownOptionGroup } from '../src/components/interactive/Dropdown';

const renderWithTheme = (ui: React.ReactElement) => render(<ThemeProvider>{ui}</ThemeProvider>);

const fruits: DropdownOption[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Durian', value: 'durian', disabled: true },
];

const grouped: DropdownOptionGroup[] = [
  {
    label: 'Citrus',
    value: 'citrus',
    options: [
      { label: 'Orange', value: 'orange' },
      { label: 'Lemon', value: 'lemon' },
    ],
  },
  {
    label: 'Stone fruit',
    value: 'stone',
    options: [
      { label: 'Peach', value: 'peach' },
      { label: 'Plum', value: 'plum' },
    ],
  },
];

const open = () => fireEvent.click(screen.getByRole('combobox'));

describe('Dropdown a11y', () => {
  it('closed: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} onChange={jest.fn()} placeholder="Pick a fruit" />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open: no axe violations', async () => {
    const { container } = renderWithTheme(<Dropdown options={fruits} onChange={jest.fn()} />);
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('with a selected value: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} value="banana" onChange={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('disabled: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} disabled onChange={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('multi-select open: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} multiSelect value={['apple']} onChange={jest.fn()} />,
    );
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('searchable open: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} searchable onChange={jest.fn()} />,
    );
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('grouped options open: no axe violations', async () => {
    const { container } = renderWithTheme(<Dropdown groups={grouped} onChange={jest.fn()} />);
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('clearable with selection: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} value="banana" clearable onChange={jest.fn()} />,
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('open with no options: no axe violations', async () => {
    const { container } = renderWithTheme(<Dropdown options={[]} onChange={jest.fn()} />);
    open();
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('search filtered to no matches: no axe violations', async () => {
    const { container } = renderWithTheme(
      <Dropdown options={fruits} searchable onChange={jest.fn()} />,
    );
    open();
    fireEvent.change(screen.getByPlaceholderText('Search options...'), {
      target: { value: 'zzz' },
    });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
