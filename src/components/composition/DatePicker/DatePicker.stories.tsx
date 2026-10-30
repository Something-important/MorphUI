import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { ThemeProvider } from '../../theme';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ maxWidth: 280 }}>
        <DatePicker placeholder="Pick a date" />
      </div>
    </ThemeProvider>
  ),
};

export const WithValue: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ maxWidth: 280 }}>
        <DatePicker defaultValue={new Date(2026, 5, 15)} clearable />
      </div>
    </ThemeProvider>
  ),
};

export const MinMax: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ maxWidth: 280 }}>
        <DatePicker
          defaultValue={new Date(2026, 2, 15)}
          min={new Date(2026, 2, 1)}
          max={new Date(2026, 2, 28)}
        />
      </div>
    </ThemeProvider>
  ),
};

export const WeekStartsMonday: Story = {
  render: () => (
    <ThemeProvider>
      <div style={{ maxWidth: 280 }}>
        <DatePicker weekStartsOn={1} />
      </div>
    </ThemeProvider>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<Date | null>(new Date(2026, 0, 1));
    return (
      <ThemeProvider>
        <div style={{ maxWidth: 280 }}>
          <DatePicker value={value} onChange={setValue} clearable />
          <p style={{ marginTop: 12 }}>Selected: {value ? value.toDateString() : '(none)'}</p>
        </div>
      </ThemeProvider>
    );
  },
};
