import React, { useState } from 'react';
import { Dropdown } from './Dropdown';
import './Dropdown.css';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    multiSelect: { control: 'boolean' },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    maxSelections: { control: 'number' },
    className: { control: 'text' },
  },
};

// Single-select Dropdown story
export const SingleSelect = () => {
  const [value, setValue] = useState<string | number | undefined>(undefined);
  return (
    <Dropdown
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Date', value: 'date' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select a fruit"
      className="dropdown-centered"
    />
  );
};

// Multi-select Dropdown story
export const MultiSelect = () => {
  const [value, setValue] = useState<Array<string | number>>([]);
  return (
    <Dropdown
      options={[
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Cherry', value: 'cherry' },
        { label: 'Date', value: 'date' },
        { label: 'Elderberry', value: 'elderberry' },
        { label: 'Fig', value: 'fig' },
      ]}
      value={value}
      onChange={setValue}
      placeholder="Select fruits"
      multiSelect
      maxSelections={3}
      className="dropdown-centered"
    />
  );
};

// Disabled Dropdown story
export const Disabled = () => (
  <Dropdown
    options={[
      { label: 'Apple', value: 'apple' },
      { label: 'Banana', value: 'banana' },
      { label: 'Cherry', value: 'cherry' },
      { label: 'Date', value: 'date' },
    ]}
    value={undefined}
    onChange={() => {}}
    disabled
    placeholder="Select a fruit"
    className="dropdown-centered"
  />
);

// Empty Options story
export const EmptyOptions = () => (
  <Dropdown
    options={[]}
    value={[]}
    onChange={() => {}}
    placeholder="No options"
    multiSelect
    className="dropdown-centered"
  />
);