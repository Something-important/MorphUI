import React, { useState } from 'react';
import { RadioGroup } from './RadioGroup';
import './RadioGroup.css';

export default {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'radio' },
      options: ['vertical', 'horizontal'],
    },
    disabled: { control: 'boolean' },
    className: { control: 'text' },
  },
};

const radioOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
];

const dropdownOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Date', value: 'date' },
];

// Default vertical RadioGroup
export const Default = () => {
  const [value, setValue] = useState<string | number>('red');
  return (
    <RadioGroup
      options={radioOptions}
      value={value}
      onChange={setValue}
      name="colors"
      className="radio-centered"
    />
  );
};

// Horizontal RadioGroup
export const Horizontal = () => {
  const [value, setValue] = useState<string | number>('red');
  return (
    <RadioGroup
      options={radioOptions}
      value={value}
      onChange={setValue}
      name="colors"
      direction="horizontal"
      className="radio-centered"
    />
  );
};

// Disabled RadioGroup
export const Disabled = () => (
  <RadioGroup
    options={radioOptions}
    value={'red'}
    onChange={() => {}}
    name="colors"
    disabled
    className="radio-centered"
  />
);

// Empty Options
export const EmptyOptions = () => (
  <RadioGroup
    options={[]}
    value={undefined}
    onChange={() => {}}
    name="colors"
    className="radio-centered"
  />
);

